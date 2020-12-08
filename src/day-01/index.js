const resultA = require('./input.json').reduce(
  (a, v, i, input) => a
    || input
      .slice(i + 1)
      .reduce((a2, v2) => a2 || (v + v2 === 2020 && v * v2) || 0, 0)
    || 0,
  0,
);

const resultB = require('./input.json').reduce(
  (a, v, i, n) => a
    || n
      .slice(i + 1)
      .reduce(
        (a2, v2, i2) => a2
          || n
            .filter((_, i3) => i3 !== i && i3 !== i2 + i + 1)
            .reduce(
              (a3, v3) => a3 || (v + v2 + v3 === 2020 && v * v2 * v3) || 0,
              0,
            )
          || 0,
        0,
      )
    || 0,
  0,
);

console.log(resultA);
console.log(resultB);

module.exports = [resultA, resultB];
