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


## MO-1 result
- Machine: AMD Ryzen 5 4500U, 15.3 GB RAM, Windows 11 Pro, Docker Desktop.
- Base commit: 8d7ae755c5b8de82e8711756b35c0207655ef1ae
- 5 runs (seconds): 0.077154, 0.066340, 0.066883, 0.066088, 0.065427
- Median 66.3 ms, min 65.4 ms, max 77.2 ms. Target of 200 ms met. Raw output: docs/evidence/mo1-runs.txt
- The target was easy to clear on 131 shapes, so it says little about large tasks. Server was warm. The first run was the slowest, probably warm-up (a guess, not verified).
