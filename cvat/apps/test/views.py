# Copyright (C) CVAT.ai Corporation
#
# SPDX-License-Identifier: MIT

from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cvat.apps.engine.models import LabeledShape, ShapeType, Task
from cvat.apps.engine.permissions import TaskPermission


class AnnotationStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        task = get_object_or_404(Task, pk=task_id)
        if not TaskPermission.create_scope_view(request, task).check_access().allow:
            raise PermissionDenied()

        shapes = LabeledShape.objects.filter(job__segment__task_id=task.id, parent__isnull=True)

        shape_type = request.query_params.get("shape_type")
        if shape_type is not None:
            if shape_type not in {member.value for member in ShapeType}:
                raise ValidationError({"shape_type": f"Unknown shape type: {shape_type}"})
            shapes = shapes.filter(type=shape_type)

        rows = (
            shapes.values("label__name")
            .annotate(shape_count=Count("id"))
            .order_by("-shape_count", "label__name")
        )
        counts = [{"label": row["label__name"], "count": row["shape_count"]} for row in rows]

        return Response(
            {
                "task_id": task.id,
                "shape_type": shape_type,
                "total": sum(c["count"] for c in counts),
                "counts": counts,
            }
        )