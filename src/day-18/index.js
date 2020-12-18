const formatV = (v) => v
  .split('')
  .filter((c) => c !== ' ')
  .map((s) => (Number.isNaN(parseInt(s, 10)) ? s : parseInt(s, 10)));

const input = require('./input')
  .split('\n')
  .map(formatV);

const t = { '+': (n, v) => n + v, '*': (n, v) => n * v };
const io = (l) => l.reduce(([n, o], v) => (!o ? [n, v] : [t[o](n, v)]), [1, '*'])[0];

const da = ([o]) => o === '+';
const am = (l) => l
  .reduce((a, v) => (da(a) ? [a[1] + v, ...a.slice(2)] : [v, ...a]), [])
  .reduce((a, v) => (v === '*' ? a : v * a), 1);

const cl = (a, fn) => ((i) => [...a.slice(0, i), fn(a.slice(i + 1))])(a.lastIndexOf('('));
const ex = (l, fn) => [...l, ')'].reduce((a, v) => (v === ')' ? cl(a, fn) : [...a, v]), ['(']);
const sum = (l, fn) => l.reduce((a, v) => a + ex(v, fn)[0], 0);

const resultA = sum(input, io);
const resultB = sum(input, am);

module.exports = [resultA, resultB];
