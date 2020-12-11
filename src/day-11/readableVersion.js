const input = require('./input');

const dArr = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const adj = (l, i, j) => dArr.map(([di, dj]) => l[i + di] && l[i + di][j + dj]).filter((s) => s === '#')
  .length;

const doIter = (inp, t, fn) => inp
  .split('\n')
  .reduce(
    (a, r, i, l) => [
      ...a,
      r
        .split('')
        .reduce(
          (b, s, j) => [
            ...b,
            ((n) => (s === '#' && n >= t && 'L')
                || (s === 'L' && n === 0 && '#')
                || s)(fn(l, i, j)),
          ],
          [],
        )
        .join(''),
    ],
    [],
  )
  .join('\n');

const resultA = (() => {
  let prevIter = input;
  let iter = input;

  do {
    prevIter = iter;
    iter = doIter(prevIter, 4, adj);
  } while (prevIter !== iter);

  return iter.split('').filter((s) => s === '#').length;
})();

const walk = (l, i, j, di, dj) => ((c) => (c === '.' ? walk(l, i + di, j + dj, di, dj) : c === '#'))(
  l[i + di] && l[i + di][j + dj],
);

const los = (l, i, j) => dArr.reduce((a, [di, dj]) => a + (walk(l, i, j, di, dj) ? 1 : 0), 0);

const resultB = (() => {
  let prevIter = input;
  let iter = input;

  do {
    prevIter = iter;
    iter = doIter(prevIter, 5, los);
  } while (prevIter !== iter);

  return iter.split('').filter((s) => s === '#').length;
})();

module.exports = [resultA, resultB];
