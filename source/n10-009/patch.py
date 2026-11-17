import sys, glob, os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', '..', 'index.html')        # the deployed page at the repo root
ORIG = os.path.join(HERE, 'index.orig.html')              # the pre-restructure page (question banks, simulator, engine)
s = open(ORIG).read()

def rep(a, b, count=1):
    global s
    n = s.count(a)
    assert n == count, (n, a[:120])
    s = s.replace(a, b)

# 1) content + restructure scripts go right before the generator wiring (i.e. before the engine)
files = sorted(glob.glob(os.path.join(HERE, '*.js')))
order = [f for f in files if '00-base' in f] + [f for f in files if '01-assign' in f] + \
        [f for f in files if os.path.basename(f)[0] in 'de'] + [f for f in files if 'rk-base' in f] + [f for f in files if os.path.basename(f)[0] in 'fg'] + [f for f in files if '99-build' in f]
blob = '\n;\n'.join(open(f).read() for f in order)
rep('/* Wire Net+ generators and tools into the course. */', blob + '\n;\n/* Wire Net+ generators and tools into the course. */')

# 2) storage version + carry-over + global lab completion
rep("'<span class=\"chip lock\">Pass = over ' + PASS + '% on the gate test</span></div>';", "'<span class=\"chip lock\">Pass = ' + PASS + '% or better on each test</span></div>';")
rep("  var KEY = C.id + ':v1';", "  var KEY = C.id + ':' + (C.store || 'v1');")
rep("""  var S = load(KEY, null) || { device: null, stages: {}, cards: {}, missed: {}, history: [], created: Date.now() };
  function persist() { save(KEY, S); }""",
"""  var S = load(KEY, null);
  if (!S) {
    S = { device: null, stages: {}, cards: {}, missed: {}, history: [], created: Date.now() };
    var OLD = C.store && C.carry ? load(C.id + ':v1', null) : null;
    if (OLD) { S.device = OLD.device || null; S.carry = C.carry(OLD); S.history = OLD.history || []; save(KEY, S); }
  }
  S.labx = S.labx || {};
  function persist() { save(KEY, S); }""")
rep("""  function unlocked(s) { return s.idx === 0 || st(STAGES[s.idx - 1].id).passed; }
  function current() { for (var i = 0; i < STAGES.length; i++) if (!st(STAGES[i].id).passed) return STAGES[i]; return null; }
  function labsDone(s) { return (s.labs || []).filter(function (l) { return st(s.id).labs[l]; }).length; }""",
"""  function carried(s) { return !!(s.dom && S.carry && S.carry.indexOf(s.dom) >= 0); }
  function cleared(s) { return st(s.id).passed || carried(s); }
  function unlocked(s) {
    if (s.idx === 0 || cleared(STAGES[s.idx - 1]) || carried(s)) return true;
    var p = STAGES[s.idx - 1];
    return !!(s.dom && p.dom && p.dom !== s.dom && S.carry && S.carry.indexOf(p.dom) >= 0);
  }
  function current() { for (var i = 0; i < STAGES.length; i++) if (!cleared(STAGES[i])) return STAGES[i]; return null; }
  function labDone(s, l) { return !!(st(s.id).labs[l] || S.labx[l]); }
  function labsDone(s) { return (s.labs || []).filter(function (l) { return labDone(s, l); }).length; }""")

# 3) path map: domain tiers, parts with minutes and lab/check chips
rep("""    var coreS = STAGES.filter(function (s) { return s.tier !== 'pro'; });
    var examReady = coreS.length && coreS.every(function (s) { return st(s.id).passed; });""",
"""    var coreS = STAGES.filter(function (s) { return s.dom; });
    var examReady = coreS.length && coreS.every(function (s) { return cleared(s); });""")
rep("""        var x = st(s.id), un = unlocked(s), cls = x.passed ? 'done' : (cur && cur.id === s.id ? 'cur' : (un ? '' : 'locked'));
        var sub = x.passed ? 'Passed · best ' + x.best + '%' : (un ? (s.goal || '') : 'Locked — pass step ' + s.idx + ' first');""",
"""        var x = st(s.id), un = unlocked(s), cls = cleared(s) ? 'done' : (cur && cur.id === s.id ? 'cur' : (un ? '' : 'locked'));
        var tm = s.parts ? stageMins(s) : 0;
        var sub = x.passed ? 'Passed · best ' + x.best + '%' : (carried(s) ? 'Carried over from your old progress · ' + (s.goal || '') : (un ? (s.parts ? s.parts.length + ' parts · ~' + tm + ' min · ' : '') + (s.goal || '') : 'Locked — pass ' + esc(STAGES[s.idx - 1].title) + ' first'));""")
rep("""        var parts = s.lesson || [], rd = x.lesson ? parts.length : (x.pread || 0);
        if (un && parts.length) {""",
"""        if (s.parts) { if (un && cur && cur.id === s.id) html += partList(s); return; }
        var parts = s.lesson || [], rd = x.lesson ? parts.length : (x.pread || 0);
        if (un && parts.length) {""")
rep("""          '<span class="num">' + (x.passed ? '✓' : (un ? (s.idx + 1) : '🔒')) + '</span><span class="grow"><span class="t">' + (s.idx + 1) + '. ' + esc(s.title) + '</span>""",
"""          '<span class="num">' + (cleared(s) ? '✓' : (un ? (s.obj ? s.obj : (s.domWrap ? '🏁' : s.idx + 1)) : '🔒')) + '</span><span class="grow"><span class="t">' + (s.parts && s.dom ? '' : (s.idx + 1) + '. ') + esc(s.title) + '</span>""")
rep("""  function stageDomains(s) { var ds = {};""", """  function stageDomains(s) { if (s.dom) return [String(s.dom)]; var ds = {};""")

# 4) stage header + learn pane for part-based stages
rep("""    var tabs = [['learn', 'Learn'], ['cards', 'Cards (' + s.cards.length + ')'], ['practice', 'Practice'], ['labs', 'Labs (' + labsDone(s) + '/' + (s.labs || []).length + ')'], ['gate', x.passed ? 'Gate ✓' : 'Gate 🔒']];
    if (!(s.labs || []).length) tabs.splice(3, 1);""",
"""    var gname = s.domWrap ? 'Domain test' : (s.obj ? 'Objective test' : 'Gate');
    var tabs = [['learn', 'Learn'], ['cards', 'Cards (' + s.cards.length + ')'], ['practice', 'Practice'], ['labs', 'Labs (' + labsDone(s) + '/' + (s.labs || []).length + ')'], ['gate', x.passed ? gname + ' ✓' : gname + ' 🔒']];
    if (!(s.labs || []).length) tabs.splice(3, 1);
    if (!s.cards.length) tabs.splice(1, 1);""")
rep("""    m.innerHTML = '<div class="tag">' + esc((C.tiers.filter(function (t) { return t.id === s.tier; })[0] || {}).name) + ' · Step ' + (s.idx + 1) + ' of ' + STAGES.length + '</div>' +
      '<h1 style="margin:4px 0 6px">' + esc(s.title) + '</h1>""",
"""    m.innerHTML = '<div class="tag">' + esc((C.tiers.filter(function (t) { return t.id === s.tier; })[0] || {}).name) + (s.obj ? ' · Objective ' + esc(s.obj) : (s.domWrap ? ' · Wrap-up' : ' · Step ' + (s.idx + 1) + ' of ' + STAGES.length)) + '</div>' +
      '<h1 style="margin:4px 0 6px">' + esc(s.title) + '</h1>' + (s.long && s.obj ? '<p class="small" style="margin:0 0 4px;color:var(--acc)">CompTIA: ' + esc(s.long) + '</p>' : '') + '""")
rep("""      (stageDomains(s).length ? '<div style="margin:0 0 8px">' + stageDomains(s).map(function (d) { return '<span class="chip" title="' + esc((C.domains && C.domains[d]) || '') + '" style="margin:0 6px 4px 0">Domain '""",
"""      (stageDomains(s).length && !s.dom ? '<div style="margin:0 0 8px">' + stageDomains(s).map(function (d) { return '<span class="chip" title="' + esc((C.domains && C.domains[d]) || '') + '" style="margin:0 6px 4px 0">Domain '""")
rep("""    ({ learn: pLearn, cards: pCards, practice: pPractice, labs: pLabs, gate: pGate })[tab](pane, s);""",
"""    if (tab === 'cards' && !s.cards.length) tab = 'learn';
    ({ learn: s.parts ? pParts : pLearn, cards: pCards, practice: pPractice, labs: pLabs, gate: pGate })[tab](pane, s);""")

PARTS = r"""
  // ---------- part-based stages (domain → objective → part) ----------
  var LABMIN = { net: 10, drill: 4, match: 3, order: 3, calc: 4, acl: 6 };
  function labMin(id) { var L = C.labs[id] || {}; return L.min || LABMIN[L.kind || 'net'] || 5; }
  function words(h) { return String(h || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length; }
  function partMin(p) { return Math.max(2, Math.round(words(p.html) / 150 + (p.qi || []).length * 0.6 + 0.5)); }
  function allParts(s) { var a = s.parts.slice(); if (s.wrap && (s.wrap.recap && s.wrap.recap.length || s.wrap.lab)) a.push({ wrap: true, h: s.domWrap ? 'Domain lab & test' : 'Objective wrap-up', obj: s.domWrap ? 'Combine everything in this domain, then pass the domain test.' : 'Recall every part of ' + s.obj + ', run the combined lab, then take the objective test.', html: '', qi: [] }); return a; }
  function stageMins(s) { return allParts(s).reduce(function (t, p) { return t + (p.wrap ? 3 : partMin(p)) + (p.lab ? labMin(p.lab) : 0); }, 0) + (s.wrap && s.wrap.lab ? labMin(s.wrap.lab) : 0); }
  function partDone(s, i) { var x = st(s.id); return x.lesson || i < (x.pread || 0); }
  function partList(s) {
    var ps = allParts(s);
    return '<div style="margin:1px 0 12px 22px;border-left:2px solid var(--line);padding-left:12px;display:flex;flex-direction:column;gap:5px">' +
      ps.map(function (p, i) {
        var done = partDone(s, i), lab = p.wrap ? s.wrap.lab : p.lab;
        var tg = (p.qi && p.qi.length ? '<span class="chip" style="padding:0 6px;font-size:10px">✎ check</span>' : '') + (lab && C.labs[lab] ? '<span class="chip" style="padding:0 6px;font-size:10px">🧪 lab' + (labDone(s, lab) ? ' ✓' : '') + '</span>' : '');
        return '<button data-go="#stage/' + s.id + '/learn/' + i + '" style="display:flex;align-items:center;gap:8px;background:none;border:0;padding:3px 2px;cursor:pointer;text-align:left;font:inherit;color:' + (done ? 'var(--ok)' : 'var(--muted)') + '">' +
          '<span style="flex:0 0 18px;height:18px;border-radius:50%;border:1px solid currentColor;display:inline-flex;align-items:center;justify-content:center;font-size:11px">' + (done ? '✓' : (p.wrap ? '🏁' : i + 1)) + '</span>' +
          '<span style="flex:1;min-width:0">' + esc(p.h) + ' <span class="dim small">· ~' + (p.wrap ? 3 : partMin(p)) + ' min</span></span>' + tg + '</button>';
      }).join('') + '</div>';
  }
  var PAIR = {};
  STAGES.forEach(function (s) { if (!s.parts) return; allParts(s).forEach(function (p, i) { var l = p.wrap ? s.wrap.lab : p.lab; if (l && !PAIR[l]) PAIR[l] = { s: s, i: i, p: p }; }); });
  function labPanel(s, id, i, wrap) {
    var L = C.labs[id]; if (!L) return '';
    var d = labDone(s, id);
    return '<div class="panel" style="border-color:' + (wrap ? 'var(--lock)' : 'var(--acc2)') + ';margin-top:12px"><div class="tag">' + (wrap ? '🏁 Combined lab' : '🧪 Paired lab for this part') + ' · ~' + labMin(id) + ' min</div>' +
      '<b style="display:block;margin:4px 0">' + esc(L.title) + '</b><div class="muted small">' + esc(L.sum || '') + '</div>' +
      '<div class="row" style="margin-top:8px;gap:8px"><button class="btn ' + (d ? '' : 'pri') + '" data-go="#lab/' + id + '/' + s.id + '/' + i + '">' + (d ? 'Revisit lab' : 'Flip to the lab →') + '</button>' + (d ? '<span class="chip ok">✓ Done</span>' : '') + '</div></div>';
  }
  function pParts(p, s) {
    var x = st(s.id), ps = allParts(s), N = ps.length;
    var read = x.lesson ? N : (x.pread || 0);
    var idx = view.part[s.id]; if (idx == null) idx = Math.min(read, N - 1);
    idx = Math.max(0, Math.min(idx, N - 1)); view.part[s.id] = idx;
    var part = ps[idx], isLast = idx === N - 1;
    var body = '';
    if (part.wrap) {
      if (!s.domWrap) body = '<div class="panel lesson"><h3>🏁 ' + esc(s.obj) + ' wrap-up</h3><p class="muted small">Say each line out loud before you read it. If one feels shaky, tap its part below to flip back.</p><ul>' + (s.wrap.recap || []).map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>' +
        '<div class="row" style="gap:6px;flex-wrap:wrap">' + s.parts.map(function (pp, k) { return '<button class="btn sm ghost" data-go="#stage/' + s.id + '/learn/' + k + '">' + (k + 1) + '. ' + esc(pp.h) + '</button>'; }).join('') + '</div></div>';
      else body = '<div class="panel lesson"><h3>🏁 Domain ' + s.dom + ' — put it all together</h3><p>You have recapped every objective. Run the combined lab, then take the <b>30-question domain test</b>. ' + PASS + '% or better opens the next domain.</p></div>';
      if (s.wrap.lab) body += labPanel(s, s.wrap.lab, idx, true);
      body += '<div class="panel" style="margin-top:12px"><div class="tag">' + (s.domWrap ? 'Domain test' : 'Objective test') + '</div><p class="small">' + Math.min(s.gateN || 15, s.qs.length) + ' questions from ' + (s.domWrap ? 'Domain ' + s.dom + ' only' : 'objective ' + esc(s.obj) + ' only') + '. Pass with ' + PASS + '% or better.</p><button class="btn pri" data-go="#stage/' + s.id + '/gate">Go to the test →</button></div>';
    } else {
      body = '<div class="panel" style="border-color:var(--acc);margin-bottom:10px;padding:10px 12px"><div class="tag">🎯 Objective for this part</div><div style="margin-top:4px">' + esc(part.obj) + '</div></div>' +
        '<div class="panel lesson"><h3>' + esc(part.h) + '</h3>' + part.html + '</div>';
      if (part.qi && part.qi.length) body += '<div class="panel" style="border-color:var(--acc2);margin-top:12px"><div class="tag">✎ Quick check</div><div id="sq"></div></div>';
      if (part.lab) body += labPanel(s, part.lab, idx, false);
    }
    var html = '<div class="row" style="justify-content:space-between;align-items:center;margin-bottom:8px">' +
      '<span class="tag">Part ' + (idx + 1) + ' of ' + N + ' · ~' + (part.wrap ? 3 : partMin(part)) + ' min</span>' +
      '<span class="chip ' + (read >= N ? 'ok' : '') + '">' + Math.min(read, N) + '/' + N + ' parts</span></div>' +
      '<div class="bar" style="margin-bottom:12px"><i style="width:' + Math.round(100 * Math.min(read, N) / N) + '%"></i></div>' + body +
      '<div class="row small" style="margin-top:8px;align-items:center;gap:8px"><span class="muted">Resume code for this part:</span><span class="mono" style="color:var(--acc)">' + esc(partCode(s, idx)) + '</span><button class="btn sm ghost" data-cp="' + esc(partCode(s, idx)) + '">Copy</button></div>' +
      '<div class="row" style="margin-top:12px;justify-content:space-between">' +
      '<button class="btn" id="pv"' + (idx === 0 ? ' disabled' : '') + '>← Back</button>' +
      (!isLast ? '<button class="btn pri" id="nx">' + (idx < read ? 'Next part →' : 'Got it — next part →') + '</button>'
        : (read >= N ? '<button class="btn" data-go="#stage/' + s.id + '/gate">Go to the test →</button>' : '<button class="btn pri" id="fin">Finish the parts ✓</button>')) + '</div>';
    p.innerHTML = html;
    p.querySelectorAll('[data-cp]').forEach(function (b) { b.onclick = function () { copy(b.dataset.cp); }; });
    var pv = $('#pv', p); if (pv) pv.onclick = function () { view.part[s.id] = idx - 1; route(); };
    var nx = $('#nx', p); if (nx) nx.onclick = function () { if (!x.lesson && idx + 1 > (x.pread || 0)) x.pread = idx + 1; if ((x.pread || 0) >= N) x.lesson = true; view.part[s.id] = idx + 1; persist(); route(); };
    var fin = $('#fin', p); if (fin) fin.onclick = function () { x.pread = N; x.lesson = true; persist(); route(); };
    if (part.qi && part.qi.length) {
      var sq = $('#sq', p), qi = 0, key = 'p' + idx;
      var draw = function () {
        if ((x.seg && x.seg[key]) || qi >= part.qi.length) { sq.innerHTML = '<span class="chip ok">✓ Check complete</span> <button class="btn sm ghost" id="sqr">Redo</button>'; if (!x.seg) x.seg = {}; x.seg[key] = true; persist(); $('#sqr', sq).onclick = function () { x.seg[key] = false; qi = 0; draw(); }; return; }
        var q = prep(s.qs[part.qi[qi]]);
        sq.innerHTML = '<div class="small muted" style="margin-bottom:6px">Q' + (qi + 1) + ' / ' + part.qi.length + '</div><div id="sqp">' + renderQ(q) + '</div>';
        wire($('#sqp', sq), q, function () {
          var r = document.createElement('div'); r.className = 'row'; r.style.marginTop = '8px';
          r.innerHTML = '<button class="btn pri" id="sqn">' + (qi + 1 >= part.qi.length ? 'Finish check ✓' : 'Next →') + '</button>';
          $('#sqp', sq).appendChild(r); $('#sqn', sq).onclick = function () { qi++; draw(); };
        }, true);
      };
      draw();
    }
  }
"""
rep("""  // ---------- flashcards (Leitner) ----------""", PARTS + """
  // ---------- flashcards (Leitner) ----------""")

# 5) labs: pairing banner + flip back to the exact part, global completion
rep("""  function labStage(id) { return STAGES.filter(function (s) { return (s.labs || []).indexOf(id) >= 0; })[0]; }""",
"""  function labStage(id) { return PAIR[id] ? PAIR[id].s : STAGES.filter(function (s) { return (s.labs || []).indexOf(id) >= 0; })[0]; }""")
rep("""    var id = args[0], L = C.labs[id], s = labStage(id);""",
"""    var id = args[0], L = C.labs[id], s = (args[1] && stageById(args[1])) || labStage(id), pi = args[2] != null && args[2] !== '' ? +args[2] : (PAIR[id] && PAIR[id].s === s ? PAIR[id].i : null);""")
rep("""        if (!st(s.id).labs[id]) { st(s.id).labs[id] = true; persist(); toast('✓ Lab complete: ' + esc(L.title), 2600); }
      },
      done: function () { return !!st(s.id).labs[id]; },
      back: '#stage/' + s.id + '/labs',""",
"""        if (!labDone(s, id)) { st(s.id).labs[id] = true; S.labx[id] = true; persist(); toast('✓ Lab complete: ' + esc(L.title), 2600); var fb = document.getElementById('flipback'); if (fb) fb.classList.add('pri'); }
        else { st(s.id).labs[id] = true; S.labx[id] = true; persist(); }
      },
      done: function () { return labDone(s, id); },
      back: pi != null && s.parts ? '#stage/' + s.id + '/learn/' + pi : '#stage/' + s.id + '/labs',""")
rep("""    kind.render(m, L, api);
  }""",
"""    kind.render(m, L, api);
    if (pi != null && s.parts) {
      var pp = allParts(s)[pi] || {}, bn = document.createElement('div');
      bn.className = 'panel'; bn.style.cssText = 'border-color:var(--acc);margin-bottom:10px;padding:10px 12px';
      bn.innerHTML = '<div class="row" style="gap:8px;align-items:center"><span class="grow"><span class="tag">📖 Paired with ' + esc(s.obj || s.title) + ' · Part ' + (pi + 1) + '</span><b style="display:block;margin-top:2px">' + esc(pp.h || '') + '</b>' +
        '<span class="small muted">🎯 ' + esc(pp.obj || '') + '</span></span><button class="btn sm" id="flipback" data-go="#stage/' + s.id + '/learn/' + pi + '">⇄ Flip back to Learn</button></div>';
      m.insertBefore(bn, m.firstChild);
    }
  }""")

# 6) practice exam pool: dedupe (domain wraps reuse objective questions)
rep("""      STAGES.forEach(function (o) { if (o.idx <= s.idx && o.tier !== 'pro') o.qs.forEach(function (q) { if (q.d) pool.push(q); }); });""",
"""      var seenQ = {};
      STAGES.forEach(function (o) { if (o.idx <= s.idx && o.tier !== 'pro' && !o.domWrap) o.qs.forEach(function (q) { var k = q.gen ? null : String(q.q); if (q.d && (!k || !seenQ[k])) { if (k) seenQ[k] = 1; pool.push(q); } }); });""")

open(SRC, 'w').write(s)
print('ok', len(s))
