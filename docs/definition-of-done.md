\# Definition of Done (written before implementation, ticked with evidence)



\- \[x] 1. Endpoint returns correct counts, checked against a known value. Evidence: `docs/evidence/item5-owner.txt` returns total 3953 and person 1217, chair 227, car 195, bottle 120, book 113, matching the SQL query on `engine\_labeledshape` joined to `engine\_label` run in the database container.

\- \[x] 2-3. Page calls the endpoint and draws a bar chart (top 15 labels). Evidence: `docs/evidence/item3-chart.png`.

\- \[x] 4. Failed-request state shown. Evidence: `docs/evidence/item4-error-403.png` (logged in as a user with no access). The empty state is implemented but I have no evidence of it, so it is not claimed.

\- \[x] 5. 401 without login, 403 without task access, 200 for the owner. Evidence: `docs/evidence/item5-no-login.txt`, `item5-no-access.txt`, `item5-owner.txt`.

\- \[x] 6. Objective measured 5 times, raw output saved, target met. Evidence: `docs/evidence/item6-timings.txt`, `item6-baseline-about.txt`; median 657 ms against a 700 ms target (set after the first run, see objectives).

\- \[x] 7. Extra filter works, reason written. Evidence: `docs/evidence/item7-mask.txt` (37), `item7-polygon.txt` (3916), `item7-invalid.txt` (400). Chosen because polygons and masks cost annotators different effort and the totals are checkable against the database.

\- \[ ] 8-9. Live updates and reconnect: \*\*not reached\*\* (reason in the Plan, "Not reached").

\- \[x] 10. Decision record written at the end of `docs/plan.md`.

\- \[x] Everything not finished is listed, with why: Plan, "Not reached".

\- \[ ] Loom 5 minutes or less, K1 to K4 answered, answers match the repo. Link: <paste when recorded>

