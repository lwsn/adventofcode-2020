const input = require('./6-input').split('\n\n');

const resultA = input.reduce(
  (a, s) => a
    + s
      .replace(/\n/g, '')
      .split('')
      .filter((c, i, r) => r.indexOf(c) === i).length,
  0,
);

const resultB = input.reduce(
  (a, s) => a
    + Object.values(
      s
        .replace(/\n/g, '')
        .split('')
        .reduce((a2, c) => ({ ...a2, [c]: (a2[c] || 0) + 1 }), {}),
    ).filter(((len) => (v) => v === len)(s.split('\n').length)).length,
  0,
);

console.log(resultA);
console.log(resultB);

module.exports = [resultA, resultB];
