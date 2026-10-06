\# Definition of Done



Written before any code. Evidence is added at the end. A box without evidence stays unticked.



| Done? | Check | Evidence |

|---|---|---|

| \[ ] | Endpoint returns per-class counts for a task, read from the DB | |

| \[ ] | Counts verified against a known task (compare with the COCO annotation file) | |

| \[ ] | Page calls the endpoint and renders the counts as a graph | |

| \[ ] | Page handles the empty case (no annotations) | |

| \[ ] | Page handles the failed-request case | |

| \[ ] | Request with no login is refused (401), raw curl output saved | |

| \[ ] | Logged-in user without access to the task is refused (403), raw output saved | |

| \[ ] | Objective MO-1 measured, 5 runs, raw output saved | |

| \[ ] | MO-1 target met, or missed with the reason written down | |

| \[ ] | Type filter works, and the reason I chose it is written down | |

| \[ ] | Decision record added to the Plan | |

| \[ ] | Items 8 and 9 (WebSocket, reconnect) listed as not reached, with the reason | |

| \[ ] | No stray files, dead code, or commented-out blocks (`git status` clean) | |

| \[ ] | Loom recorded, 5 minutes or less | |


## Evidence
- [x] Endpoint returns counts from the DB: docs/evidence/counts-200.txt
- [x] Filter by shape type (item 7): docs/evidence/counts-polygon.txt, counts-rectangle-empty.txt
- [x] 401 without login: docs/evidence/no-login-401.txt
- [x] 403 for user without access: docs/evidence/no-access-403.txt
- [x] Page with chart and error state (error shown for task 999): screenshots in docs/evidence
- [ ] Empty state: coded but NOT tested in the browser
- [x] Speed target measured, 5 runs: docs/evidence/mo1-runs.txt
- [ ] Items 8 and 9 (WebSocket live updates, reconnect): not reached. CVAT has no WebSocket layer to build on and I chose to spend the time on evidence and docs.

## Counts differ from the COCO file
The endpoint counts CVAT shapes, not COCO annotations. 7 person and 1 car annotations have multi-part segmentation (17 parts), giving 9 extra shapes (8 person, 1 car). The 3 crowd annotations import as masks. So person is 96 (93 polygons + 3 masks) and car is 35, against 88 and 34 in the COCO file. Tracks are not counted.
