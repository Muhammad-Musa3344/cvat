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

