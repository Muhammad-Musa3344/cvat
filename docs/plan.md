\# Plan



CVAT base commit: 8d7ae755c5b8de82e8711756b35c0207655ef1ae

Machine: <CPU>, <RAM>, Windows <version>, Docker Desktop (WSL2)



\## Approach

Add a Django app `cvat/apps/test` with an endpoint returning annotation counts

per label for a task, plus a React page in cvat-ui that charts them.



\## Order and time budget (of 8h)

1\. Docs (plan, definition of done, objectives): 30 min

2\. Backend endpoint + auth (items 1, 5): 1 h

3\. Type filter (item 7): 20 min

4\. UI page, chart, empty/error states (items 2-4): 1 h 15 min

5\. Measure speed, 5 runs (item 6): 30 min

6\. Final docs, decision record, Loom, submit: 45 min



\## Deliberately skipped

Items 8 and 9 (live WebSocket updates and reconnect). CVAT has no WebSocket

layer, so they would need new infrastructure. I prefer finishing 1-7 with

evidence over a rushed, broken extension.


## Decision record
- Taken: per-request database aggregate (values + annotate Count) on LabeledShape.
- Rejected: cached counters, because they must be invalidated on every annotation save.
- Cost of rejecting: every request rescans the shapes. Fine at 131 shapes, slower on large tasks.

## What changed from the plan
- A CRLF line-ending problem crashed the import worker and cost time.
- Items 8 and 9 (WebSocket) were skipped.
