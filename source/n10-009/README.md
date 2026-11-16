# N10-009 restructure sources

Content and build scripts for the Domain → Objective → Part layout.
- `d1a.js`…`d5.js`: objectives, parts, quick checks, paired labs
- `e-wraps.js`, `e-extra.js`: combined wrap labs, extra test questions
- `99-build.js`: turns objectives into stages
- `patch.py`: injects these into index.html and patches the engine (expects the pre-restructure index as index.orig.html)
