const input = require('./input.json');

const hSum = (n) => (n2, i, l) => l.slice(i + 1).reduce((a, n3) => a || n2 + n3 === n, false);
const resA = input.find((n, i, l) => i >= 25 && !l.slice(i - 25, i).some(hSum));

const addSL = (a) => a[0] + a[a.length - 1];
const srt = (n, l, i) => [n, ...l.slice(0, i + 1)].sort((a, b) => (a > b ? -1 : 1));

const fn = (n, t) => ([s, r], n2, i, l) => [
  r || s + n2,
  r || (s + n2 === t && addSL(srt(n, l, i))),
];

const prepL = (l, i) => l.slice(0, i).reverse();
const rFn = (a, n, i, l) => a || prepL(l, i).reduce(fn(n, resA), [n, false])[1];
const resultB = input.reduce(rFn, false);

module.exports = [resA, resultB];
