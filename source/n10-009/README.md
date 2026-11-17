# N10-009 sources

Net+ Range is built by `patch.py`, which injects these files into `index.orig.html` (the original engine, simulator and question banks) and writes `../../index.html`.

- `d1a.js` … `d5.js` — objectives, parts, quick checks, paired labs (official N10-009 order)
- `e-wraps.js`, `e-extra.js` — combined wrap-up labs, extra test questions
- `rk-base.js`, `f-term.js` — terminal lab kind and the terminal labs
- `g-depth.js` — one "On the job" and one "Exam trap" callout per part
- `01-assign.js` — maps the old question bank to objectives (made by `classify.py`)
- `99-build.js` — turns objectives into stages

```
python3 source/n10-009/patch.py                       # rebuild index.html
node source/tools/rk-check.js index.html              # must print "all checks passed"
node source/tools/coverage-check.js                   # every official bullet should appear (table rows show as false misses)
```
Rules and rubric: see `console-upgrade-playbook.md` (A+ repo: `source/rangekit/PLAYBOOK.md`).
