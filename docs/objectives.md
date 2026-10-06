\# Objectives



\## Machine

\- CPU: <paste from command>

\- RAM: <total> GB (Docker/WSL2 limit: 8 GB)

\- OS: <paste from command>, Docker Desktop (WSL2)

\- CVAT commit SHA: 8d7ae755c5b8de82e8711756b35c0207655ef1ae

\- Dataset: COCO 2017 val, <N> images imported (fill in the real number)



\## MO-1



| Field | Entry |

|---|---|

| What is measured | Total response time of `GET /api/test/tasks/<id>/class-counts` |

| How | `curl.exe -w "%{time\_total}"` with an auth token, run 5 times, raw output saved in `docs/` |

| Target | Median of 5 runs at or below 200 ms |

| Conditions | Local Docker stack, the sample data above, warm server (one discarded warm-up request), nothing else running |

| Not included | First request after a cold start, video tasks |



\## Why this target

<Write 2 or 3 sentences of your own: why 200 ms? For example, it is a single indexed aggregate over a few thousand rows, so I expect it to be well under this. I will report the real result even if I miss it.>

