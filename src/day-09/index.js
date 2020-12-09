const input = require('./input.json');

const resultA = input.find(
  (n, i) => i >= 25
    && !input
      .slice(i - 25, i)
      .some((n2, i2, l) => l.slice(i2 + 1).reduce((a, n3) => a || n2 + n3 === n, false)),
);

const aFn = (n, l, i) => ((arr2) => arr2[0] + arr2[arr2.length - 1])(
  [n, ...l.slice(0, i + 1)].sort((a, b) => (a > b ? -1 : 1)),
);

const fn = (n, t) => ([s, r], n2, i, l) => [
  r || s + n2,
  r || (s + n2 === t && aFn(n, l, i)),
];

const resultB = input.reduce(
  (a, n, i, l) => a
    || l
      .slice(0, i)
      .reverse()
      .reduce(fn(n, resultA), [n, false])[1],
  false,
);

module.exports = [resultA, resultB];
