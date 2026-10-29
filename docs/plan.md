\# Plan



Base: cvat-ai/cvat develop, commit b36a49bd5cc7e5fe3fc36ecb6036659c8136b780

Branch: dev-test01. Started: <time>. Deadline: <time + 8h>.



\## Order and time budget

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

\- Dataset: first 500 images of COCO val2017 in sorted filename order, downloaded individually; annotation file verified as 5000 images, 36781 annotations, 80 categories.

\- Items 8 and 9 are attempted only if two hours remain; otherwise listed as not reached, with the reason.

\- Counting scope: <shapes only, or shapes + tracks + tags>, because <reason>.

(500 images, 3541 annotations in the file, 3953 shapes imported). In the same file fill the counting-scope blank: shapes only (LabeledShape), because the sample data is images with polygons and masks and the verified baseline is the shape table; tags and tracks are not counted and this is stated in the response

\## Decision record

(written at the end)

