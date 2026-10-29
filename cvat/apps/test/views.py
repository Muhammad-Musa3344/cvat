# Copyright (C) CVAT.ai Corporation
#
# SPDX-License-Identifier: MIT

from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cvat.apps.engine.models import LabeledShape, Task
from cvat.apps.engine.permissions import TaskPermission


class AnnotationStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        task = get_object_or_404(Task, pk=task_id)
        if not TaskPermission.create_scope_view(request, task).check_access().allow:
            raise PermissionDenied()

        rows = (
            LabeledShape.objects.filter(job__segment__task_id=task.id, parent__isnull=True)
            .values("label__name")
            .annotate(shape_count=Count("id"))
            .order_by("-shape_count", "label__name")
        )
        counts = [{"label": row["label__name"], "count": row["shape_count"]} for row in rows]

        return Response(
            {
                "task_id": task.id,
                "total": sum(c["count"] for c in counts),
                "counts": counts,
            }
        )