\# Objectives



Machine: AMD Ryzen 5 4500U, 15.3 GB RAM, Windows 11 Pro. CVAT commit: b36a49bd5cc7e5fe3fc36ecb6036659c8136b780.



| ID | Field | Entry |

|----|-------|-------|

| MO-1 | What is measured | Total response time of `GET /api/tasks/2/annotation-stats` |

| | How | 5 authenticated requests, total time per request, raw output in `docs/evidence/item6-timings.txt` |

| | Target | Median of 5 runs at or below 700 ms |

| | Conditions | Local Docker stack, 500 images, task 2 (3953 shapes), owner login, nothing else running |

| | Not included | First request after a cold start, video tasks, the browser rendering time |



\## Why this target

I set the target after my first measurement, not before it, so meeting it is weak evidence about the code. I chose 700 ms because the first runs were around 650 ms and I wanted a bound with some room for noise on this laptop. I also measured a baseline endpoint that does almost nothing (`/api/server/about`) to see how much of the time is my code.



\## Result

Raw values (seconds): 0.643, 0.649, 0.657, 0.698, 0.739.

\- Median 657 ms, minimum 643 ms, maximum 739 ms, spread 96 ms. \*\*Target met.\*\*

\- Baseline `/api/server/about`, 5 runs (raw output in `docs/evidence/item6-baseline-about.txt`): 0.607, 0.626, 0.630, 0.633, 0.762, median 630 ms.

\- My endpoint is about 27 ms slower than the baseline at the median, which is within the noise of both sets. Most of the time is fixed server overhead (authentication, middleware, request handling), not the database query. I did not profile where the overhead comes from, so that is a likely explanation, not a verified one.

\- With only 5 runs, the statistics are rough. A slower first request or a different machine would change the numbers.

