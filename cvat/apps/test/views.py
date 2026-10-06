from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cvat.apps.engine.models import LabeledShape, Task
from cvat.apps.engine.permissions import TaskPermission


class ClassCountView(APIView):
    # replaces the project-wide default, which requires an iam_permission_class
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        task = get_object_or_404(Task, pk=task_id)

        visible_tasks = TaskPermission.create_scope_list(request).filter(Task.objects.all())
        if not visible_tasks.filter(pk=task.pk).exists():
            raise PermissionDenied("You do not have access to this task")

        shapes = LabeledShape.objects.filter(job__segment__task_id=task.pk)
        if shape_type := request.query_params.get("type"):
            shapes = shapes.filter(type=shape_type)

        rows = shapes.values("label__name").annotate(count=Count("id")).order_by("-count")
        return Response([{"label": row["label__name"], "count": row["count"]} for row in rows])