# Net+ Range

CompTIA Network+ (N10-009) from zero → exam-ready → 10-year network engineer.
A self-contained, offline-capable PWA built for iPhone and laptop.

## What's inside
- **Domain → objective path, in official N10-009 order** (like TryHackMe rooms / Professor Messer's objective-by-objective videos):
  Domain 1 (1.1–1.8) → Domain 2 (2.1–2.4) → Domain 3 (3.1–3.5) → Domain 4 (4.1–4.3) → Domain 5 (5.1–5.5) → Exam Ready → Pro Track.
  Domains never mix until the final practice exam.
- **Every objective = short parts (~2–5 min)**. Each part opens with "🎯 Objective for this part",
  teaches one idea, ends with a ✎ quick check, and is paired with a 🧪 lab that practices only what that part taught.
  One tap flips between the part and its lab ("Flip to the lab →" / "⇄ Flip back to Learn").
- **Objective wrap-up** (recap + combined lab + 15-question objective test) and a **Domain wrap-up**
  (recap of every objective + combined lab + 30-question domain test). 90% or better unlocks the next one.
- **Checkpoint phrases**: every passed objective gives you a phrase (e.g. `N11-COPPER-…`).
  Type your latest one into **Save → Restore** on any device to pick up where you left off.
  Progress from the old topic-based layout carries over by domain.
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
