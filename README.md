# Net+ Range

CompTIA Network+ (N10-009) from zero → exam-ready → 10-year network engineer.
A self-contained, offline-capable PWA built for iPhone and laptop.

## What's inside
- **20-step locked path**: Foundations → Exam Core → Capstone → Pro Track.
  Each step = lesson, flashcards, explained practice questions, labs, and a **gate test**.
  You must finish the labs and score **over 90%** on the gate to unlock the next step.
- **Checkpoint phrases**: every passed step gives you a phrase (e.g. `NET01-COPPER-LANTERN`).
  Type your latest one into **Save → Restore** on any device to pick up where you left off.
- **Network simulator labs**: PCs, switches and routers with IOS-style CLI — VLANs, trunks,
  router-on-a-stick, static/floating routes, OSPF, DHCP + relay, ACLs, hardening, and
  broken-network troubleshooting tickets. Tasks are checked live by the simulator.
- **Capstone**: 90 questions weighted to the official domain percentages, 90-minute timer.
- **Tools**: endless subnet/port/binary/OSI/IPv6 drills, subnet calculator, port table.
- **Phone or laptop mode** picked on first launch (switch any time under Save).

## Deploy to GitHub Pages (laptop recommended)
1. Create a new public repo, e.g. `netplus-range`.
2. **Add file → Upload files**. Drag in everything from the zip **so the files sit at the repo root**:
   `index.html`, `manifest.json`, `sw.js`, `.nojekyll`, `README.md`, and the `icons` folder.
3. Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)` → Save.
4. Wait ~1 minute, open `https://wphilippskylar-bit.github.io/netplus-range/`.

## Install on iPhone
Open the URL in **Safari** → Share → **Add to Home Screen**. It runs full-screen and works offline.

## Backups
Save → Export backup downloads a JSON file with everything (card schedules, missed questions,
lab configs). Import it on another device. Checkpoint phrases are the lightweight fallback.
