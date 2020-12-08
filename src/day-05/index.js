const input = require('./input.json');

const fn = (a, b) => Math.ceil((b - a) / 2);

const hFn = (lc, hc) => ([a, b], c) => (c === lc && [a, b - fn(a, b)]) || (c === hc && [a + fn(a, b), b]) || [a, b];

const sFn = (v, lc, hc, l, h) => v.split('').reduce(hFn(lc, hc), [l, h])[0];

const resultA = input
  .map((v) => sFn(v, 'F', 'B', 0, 127) * 8 + sFn(v, 'L', 'R', 0, 7))
  .sort((a, b) => (a < b ? 1 : -1));

const resultB = resultA.reverse().find((v, i, [f]) => v - f !== i) - 1;

console.log(resultA[0]);
console.log(resultB);

module.exports = [resultA[0], resultB];
