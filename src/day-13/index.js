const input = require('./input');

const dt = parseInt(input.split('\n')[0], 10);
const bs = input
  .split('\n')[1]
  .split(',')
  .map((v) => (v === 'x' ? v : parseInt(v, 10)));

const resultA = bs
  .filter((b) => b !== 'x')
  .sort((a, b) => (a - (dt % a) > b - (dt % b) ? 1 : -1))
  .map((b) => b * (b - (dt % b)))[0];

const m = (i, [a]) => !((i + a[1]) % a[0]);
const f = (i, a, s) => (m(i, a) ? [i + s * a[0][0], a.slice(1), s * a[0][0]] : [i + s, a, s]);
const iter = (i, a, s) => (a.length ? iter(...f(i, a, s)) : i - s);

module.exports = [
  resultA,
  iter(0, bs.map((x, o) => [x, o]).filter(([v]) => v !== 'x'), 1),
];
