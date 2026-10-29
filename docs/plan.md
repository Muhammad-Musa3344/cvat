\# Plan



Base: cvat-ai/cvat develop, commit b36a49bd5cc7e5fe3fc36ecb6036659c8136b780

Branch: dev-test01. Started: 11:00 PKT on 29 Oct 2026 (time of my "Acknowledged" email, verify). Deadline: 19:00 PKT.

Machine: AMD Ryzen 5 4500U, 15.3 GB RAM, Windows 11 Pro, Docker Desktop.



\## Order and time budget (original, committed before any code)

| # | Work | Items | Budget |

|---|------|-------|--------|

| 1 | Read models, TaskViewSet, permissions | - | 45 min |

| 2 | Django app `test`: endpoint, CVAT auth, per-class count | 1, 5 | 1h 15m |

| 3 | One extra grouping (by shape type) | 7 | 30 min |

| 4 | UI page, chart, empty and error states | 2, 3, 4 | 2h |

| 5 | Benchmark, 5 runs, median and spread | 6 | 45 min |

| 6 | WebSocket and reconnect, only if 2h remain | 8, 9 | 1h 30m |

| 7 | Evidence, decision record, Loom, PR | 10 | 1h 15m |



\## Already decided

\- Items 1 to 4 are finished and checked before anything else starts.

\- Dataset: first 500 images of COCO val2017 in sorted filename order, downloaded individually; the official annotation file was verified as 5000 images, 36781 annotations, 80 categories.

\- Items 8 and 9 are attempted only if two hours remain; otherwise listed as not reached, with the reason.

\- Counting scope: shapes only (`LabeledShape`, top-level, skeleton children excluded). The sample data is images with polygon and mask shapes, and the verified baseline is the shape table. Tags (`LabeledImage`) and tracks (`LabeledTrack`) are not counted.



\## Changes during the work

\- The official `instances\_val2017.json` failed to import with "Could not match item id ... with any task frame", because it lists 5000 images and the task has 500. I filtered it to the 500 uploaded images (500 images, 3541 annotations, same 80 categories) and imported that.

\- The import produced 3953 shapes (polygon 3916, mask 37) from 3541 annotations. I believe multi-part COCO polygons become several shapes, but I have not verified this.

\- The task has 80 labels; 78 have at least one shape. The chart shows the top 15 only (hard-coded).

\- The CVAT UI dev server does not proxy `/api`, so I ran a small proxy script outside the repository (not committed) to view the page at http://localhost:3001.

\- The time budget changed: the WebSocket items were not reached (see below).



\## Not reached

\- Item 8 (live updates over WebSocket) and item 9 (reconnect). I started a prototype socket server but did not finish, test or commit it, because the page side and its evidence did not fit in the remaining time. Nothing from it is in the branch.

\- The empty state is implemented in the page but I did not capture evidence of it.



\## Decision record

\*\*Taken:\*\* a new DRF `APIView` in the `test` app that runs one grouped database query (`LabeledShape` filtered by `job\_\_segment\_\_task\_id`, grouped by `label\_\_name`, `Count("id")`). Login is enforced by `IsAuthenticated`; task access is enforced by asking CVAT's own `TaskPermission.create\_scope\_view(request, task).check\_access()`, the same policy class `TaskViewSet` uses.



\*\*Rejected (1):\*\* adding an `@action` to `TaskViewSet`. `TaskPermission.\_get\_scopes` maps `(view.action, method)` through a fixed dictionary, so a new action name would need an edit inside `cvat/apps/engine/permissions.py`. That is core CVAT code, and the task asked for a contained change in a new app.

\- Cost: the permission call is written by hand in my view instead of coming for free from the enforcer, and my view must stay correct on its own.



\*\*Rejected (2):\*\* counting in the browser from the existing task annotations endpoint. It would avoid backend code, but it transfers every shape with its point arrays (3953 here) just to count labels, and the task asks for a count read from the database.

\- Cost: I wrote and maintain a backend endpoint and a permission check.



\*\*Cost of the choices overall:\*\* the response time is dominated by fixed server overhead (see objectives), so the query itself is not what I optimised.

