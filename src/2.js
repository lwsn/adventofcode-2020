const resultA = require('./2-input.json').reduce((a, v) => {
  const [, f, t, m, s] = /^(\d+)-(\d+) ([a-z]): (\w+)$/g.exec(v);
  const count = s.split('').filter((c) => c === m).length;

  return count > t || count < f ? a : a + 1;
}, 0);

const resultB = require('./2-input.json').reduce((a, v) => {
  const [, f, t, m, s] = /^(\d+)-(\d+) ([a-z]): (\w+)$/g.exec(v);

  return s
    .split('')
    .filter((_, i) => `${i + 1}` === f || `${i + 1}` === t)
    .reduce((a2, c) => (c === m ? !a2 : a2), false)
    ? a + 1
    : a;
}, 0);

const resultAUgly = require('./2-input.json')
  .map((v) => ((l) => /(\d+)-/.exec(v)[1] <= l && /-(\d+)/.exec(v)[1] >= l)(
    [.../(\w+)$/.exec(v)[1]].filter((c) => c === /(\w):/.exec(v)[1]).length,
  ))
  .filter(Boolean).length;

const resultBUgly = require('./2-input.json')
  .map((v) => [.../: (\w+)/.exec(v)[1]]
    .filter((_, i) => /(\d+)-(\d+)/.exec(v).some((k) => k - 1 === i))
    .reduce((a, c) => (c === /(\w):/.exec(v)[1] ? !a : a), false))
  .filter(Boolean).length;

console.log(resultA);
console.log(resultAUgly);
console.log(resultB);
console.log(resultBUgly);

module.exports = [resultA, resultB];