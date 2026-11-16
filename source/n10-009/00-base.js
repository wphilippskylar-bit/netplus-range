/* N10-009 restructure — domain → objective → part. Helpers used by the d1–d5 content files. */
window.N9 = { objs: [], labs: {} };
(function () {
  var N = window.N9;
  // match lab: options = one list of choices; items = [text, answer, why]
  N.M = function (id, title, sum, brief, options, items, debrief, hints) {
    N.labs[id] = { kind: 'match', title: title, sum: sum, brief: brief, options: options, min: 3,
      items: items.map(function (i) { return { t: i[0], a: i[1], why: i[2] || '' }; }), debrief: debrief || '', hints: hints || [] };
  };
  // order lab: items in the CORRECT order = [text, why]
  N.O = function (id, title, sum, brief, items, debrief, hints) {
    N.labs[id] = { kind: 'order', title: title, sum: sum, brief: brief, min: 3,
      items: items.map(function (i) { return { t: i[0], why: i[1] || '' }; }), debrief: debrief || '', hints: hints || [] };
  };
  // calc lab: fields = [label, numeric answer, shown answer, why]
  N.C = function (id, title, sum, brief, fields, debrief, hints, tol) {
    N.labs[id] = { kind: 'calc', title: title, sum: sum, brief: brief, tolPct: tol || 0, min: 4,
      fields: fields.map(function (f) { return { label: f[0], a: f[1], show: f[2], why: f[3] || '' }; }), debrief: debrief || '', hints: hints || [] };
  };
  // part: h = title, obj = what you will be able to do, html = lesson, q = [[question, right, [wrong...], why], ...], lab = paired lab id
  N.P = function (h, obj, html, q, lab) { return { h: h, obj: obj, html: html, q: q || [], lab: lab || null }; };
  N.add = function (o) { N.objs.push(o); };
})();
