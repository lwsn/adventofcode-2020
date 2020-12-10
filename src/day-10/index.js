const input = require('./input.json').sort((a, b) => (a > b ? 1 : -1));

const it = (n, i, l) => n - (l[i - 1] || 0) === 3;
const resultA = input
  .reduce(([o, t], n, i, l) => (it(n, i, l) ? [o, t + 1] : [o + 1, t]), [0, 1])
  .reduce((a, n) => a * n, 1);

const mkGrps = (a, n) => (n - a[0][0] === 3 ? [[n], ...a] : [[n, ...a[0]], ...a.slice(1)]);
const fn = (l) => l.slice(1).filter((n) => l[0] - n <= 3);
const count = (l) => (l.length > 1 ? fn(l).reduce((a, n, i) => a + count(l.slice(i + 1)), 0) : 1);
const resultB = [...input, input[input.length - 1] + 3]
  .reduce(mkGrps, [[0]])
  .reduce((a, l) => a * count(l), 1);

module.exports = [resultA, resultB];
