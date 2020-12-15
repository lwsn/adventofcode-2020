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

const G = (a, i, j, k, l) => a[i + k] && a[i + k][j + l];

const N = (s, n, t) => (s === '#' && n >= t && 'L') || (s === 'L' && n === 0 && '#') || s;
const rfn = (f, t) => (a, r, i, l) => a.concat([...r].reduce((b, s, j) => b + N(s, f(l, i, j), t), ''));
const doIter = (inp, t, fn) => ((cinp) => (inp.join('\n') === cinp.join('\n')
  ? inp.reduce((a, r) => a + r.split('').filter((s) => s === '#').length, 0)
  : doIter(cinp, t, fn)))(inp.reduce(rfn(fn, t), []));

const adj = (l, i, j) => ve.map(([di, dj]) => G(l, i, j, di, dj)).filter((s) => s === '#').length;
const resultA = doIter(input, 4, adj);

const W = (a, i, j, k, l) => ((c) => (c === '.' ? W(a, i + k, j + l, k, l) : c === '#'))(G(a, i, j, k, l));
const los = (l, i, j) => ve.reduce((a, [di, dj]) => a + (W(l, i, j, di, dj) ? 1 : 0), 0);
const resultB = doIter(input, 5, los);

module.exports = [resultA, resultB];
