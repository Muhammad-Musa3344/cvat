# Copyright (C) CVAT.ai Corporation
#
# SPDX-License-Identifier: MIT

from django.urls import path

from cvat.apps.test import views

urlpatterns = [
    path(
        "tasks/<int:task_id>/annotation-stats",
        views.AnnotationStatsView.as_view(),
        name="annotation-stats",
    ),
]