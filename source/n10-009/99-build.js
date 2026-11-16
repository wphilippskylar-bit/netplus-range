/* N10-009 restructure: replace the topic stages with Domain → Objective stages. Runs after every content file, before the engine. */
(function () {
  var C = window.COURSE, N = window.N9, A = window.N9_ASSIGN || { q: {}, c: {} }, Q = window.Q;
  Object.keys(N.labs).forEach(function (k) { C.labs[k] = N.labs[k]; });
  var old = {}; C.stages.forEach(function (s) { old[s.id] = s; });
  var byObj = {}, cardsByObj = {};
  C.stages.forEach(function (s) {
    if (s.tier === 'pro' || s.capstone) return;
    var qa = A.q[s.id] || [], ca = A.c[s.id] || [];
    (s.qs || []).forEach(function (q, i) { var k = qa[i]; if (k) (byObj[k] = byObj[k] || []).push(q); });
    (s.cards || []).forEach(function (c, i) { var k = ca[i]; if (k) (cardsByObj[k] = cardsByObj[k] || []).push(c); });
  });
  function setD(q, d) {
    if (Array.isArray(q)) { q = q.slice(); q[4] = d; return q; }
    var o = {}; for (var k in q) o[k] = q[k]; o.d = d; return o;
  }
  var W1 = ['COPPER', 'SIGNAL', 'PACKET', 'BEACON', 'SWITCH', 'CIPHER', 'ROUTER', 'MATRIX', 'VECTOR', 'TOKEN', 'PRISM', 'ORBIT', 'RELAY', 'FALCON', 'HARBOR', 'ANCHOR', 'COMET', 'GLACIER', 'EMBER', 'TUNDRA', 'CANYON', 'MERIDIAN', 'QUASAR', 'NEBULA', 'SUMMIT', 'ZENITH', 'BASALT', 'CEDAR', 'MAGNET', 'PILOT'];
  var W2 = ['LANTERN', 'RIVER', 'KESTREL', 'FORGE', 'HORIZON', 'GRANITE', 'BEARING', 'VALLEY', 'SPARROW', 'COMPASS', 'THUNDER', 'MARBLE', 'WILLOW', 'ARCHER', 'BRIDGE', 'CASCADE', 'DRIFT', 'FRONTIER', 'GARNET', 'HELIX', 'IVORY', 'JUNIPER', 'KEYSTONE', 'LOTUS', 'MOSAIC', 'NORTH', 'OASIS', 'PEBBLE', 'QUILL', 'RAVEN'];
  var DN = { 1: 'Networking Concepts', 2: 'Network Implementation', 3: 'Network Operations', 4: 'Network Security', 5: 'Network Troubleshooting' };
  var DWLAB = { 1: 'n9-d1-wrap', 2: 'l-ospf', 3: 'n9-d3-wrap', 4: 'n9-d4-wrap', 5: 'n9-d5-wrap' };
  var out = [], tiers = [], ci = 0;
  [1, 2, 3, 4, 5].forEach(function (d) {
    tiers.push({ id: 'd' + d, name: 'Domain ' + d + '.0 · ' + DN[d], desc: (C.weights[d] || '') + '% of the exam. Objectives in exam order — no mixing with other domains.' });
    var objs = N.objs.filter(function (o) { return o.dom === d; });
    var domQs = [], domCards = [], recapParts = [];
    objs.forEach(function (o) {
      var qs = [];
      o.parts.forEach(function (p) { p.qi = []; p.q.forEach(function (qq) { p.qi.push(qs.length); qs.push(Q(qq[0], qq[1], qq[2], qq[3], d)); }); });
      var nPart = qs.length;
      (o.extra || []).forEach(function (qq) { qs.push(Q(qq[0], qq[1], qq[2], qq[3], d)); });
      qs = qs.concat((byObj[o.id] || []).map(function (q) { return setD(q, d); }));
      var labs = [];
      o.parts.forEach(function (p) { if (p.lab && C.labs[p.lab] && labs.indexOf(p.lab) < 0) labs.push(p.lab); });
      if (o.wrap && o.wrap.lab && C.labs[o.wrap.lab] && labs.indexOf(o.wrap.lab) < 0) labs.push(o.wrap.lab);
      var num = o.id.replace('.', '');
      out.push({ id: 'o' + num, tier: 'd' + d, dom: d, obj: o.id, title: o.id + ' ' + o.short, long: o.title, goal: o.goal,
        code: 'N' + num + '-' + W1[ci % W1.length] + '-' + W2[(ci * 7 + 3) % W2.length],
        parts: o.parts, wrap: o.wrap, qs: qs, cards: cardsByObj[o.id] || [], labs: labs, gateN: Math.min(15, qs.length), partQ: nPart });
      ci++;
      var off = domQs.length;
      domQs = domQs.concat(qs); domCards = domCards.concat(cardsByObj[o.id] || []);
      recapParts.push({ h: o.id + ' ' + o.short + ' — recap', obj: 'Recall the key points of objective ' + o.id + ' without looking.', recapOf: o.id,
        html: '<ul>' + (o.wrap.recap || []).map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>', q: [], qi: nPart >= 2 ? [off, off + 1] : [], lab: null });
    });
    out.push({ id: 'dw' + d, tier: 'd' + d, dom: d, domWrap: true, title: 'Domain ' + d + ' wrap-up', long: 'Domain ' + d + '.0 ' + DN[d] + ' — wrap-up',
      goal: 'Recap every objective in Domain ' + d + ', run the combined lab, then pass the domain test (30 questions) to open Domain ' + (d < 5 ? d + 1 : 'exam prep') + '.',
      code: 'D' + d + 'W-' + W1[(ci + 11) % W1.length] + '-' + W2[(ci * 5 + 1) % W2.length],
      parts: recapParts, wrap: { recap: [], lab: DWLAB[d] }, qs: domQs, cards: [], labs: C.labs[DWLAB[d]] ? [DWLAB[d]] : [], gateN: 30 });
  });
  var cap = old.s15; if (cap) { cap.tier = 'x'; cap.parts = (cap.lesson || []).map(function (l) { return { h: l.h, obj: 'Get ready for exam day.', html: l.html, q: [], qi: [], lab: null }; }); cap.wrap = { recap: [], lab: null }; out.push(cap); }
  C.stages.forEach(function (s) { if (s.tier === 'pro') out.push(s); });
  tiers.push({ id: 'x', name: 'Exam Ready', desc: 'Every domain cleared. Full weighted practice exam under a timer.' });
  tiers.push(C.tiers.filter(function (t) { return t.id === 'pro'; })[0]);
  C.tiers = tiers;
  C.stages.length = 0; out.forEach(function (s) { C.stages.push(s); });
  C.store = 'v2';
  // carry-over from the old topic layout: a domain counts as cleared if every old stage that fed it was passed
  var REQ = { 1: ['s01', 's02', 's03', 's04', 's05', 's06', 's09', 's11'], 2: ['s07', 's08', 's10'], 3: ['s11', 's12'], 4: ['s13'], 5: ['s14'] };
  C.carry = function (oldS) {
    var res = [];
    for (var d = 1; d <= 5; d++) {
      if (REQ[d].every(function (id) { return oldS.stages && oldS.stages[id] && oldS.stages[id].passed; })) res.push(d); else break;
    }
    return res;
  };
})();
