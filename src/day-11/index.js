const input = require('./input').split('\n');

const ve = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const g = (a, i, j, k, l) => a[i + k] && a[i + k][j + l];

const ns = (s, n, t) => (s === '#' && n >= t && 'L') || (s === 'L' && n === 0 && '#') || s;
const rfn = (fn, t) => (a, r, i, l) => a.concat([...r].reduce((b, s, j) => b + ns(s, fn(l, i, j), t), ''));
const doIter = (inp, t, fn) => ((cinp) => (inp.join('\n') === cinp.join('\n')
  ? inp.reduce((a, r) => a + r.split('').filter((s) => s === '#').length, 0)
  : doIter(cinp, t, fn)))(inp.reduce(rfn(fn, t), []));

const adj = (l, i, j) => ve.map(([di, dj]) => g(l, i, j, di, dj)).filter((s) => s === '#').length;
const resultA = doIter(input, 4, adj);

const w = (a, i, j, k, l) => ((c) => (c === '.' ? w(a, i + k, j + l, k, l) : c === '#'))(g(a, i, j, k, l));
const los = (l, i, j) => ve.reduce((a, [di, dj]) => a + (w(l, i, j, di, dj) ? 1 : 0), 0);
const resultB = doIter(input, 5, los);

module.exports = [resultA, resultB];
