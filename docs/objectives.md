\# Objectives



Machine: <CPU>, <RAM> GB, <OS>. CVAT commit: b36a49bd5cc7e5fe3fc36ecb6036659c8136b780.



| ID | Field | Entry |

|----|-------|-------|

| MO-1 | What is measured | Server response time of the per-class count endpoint for the sample task |

| | How | Script sends 5 authenticated requests, records time per request, raw output saved in docs/ |

| | Target | Median of 5 runs at or below <X> ms (set after a baseline run, justified below) |

| | Conditions | Local Docker stack, 500 images, task <ID>, nothing else running |

| | Not included | First request after a cold start, video tasks |



\## Why this target

(after the baseline run)



\## Result

(raw output, median, spread, met or missed and why)

