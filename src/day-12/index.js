const input = require('./input.json');

const t = {
  N: ([x, y, r], v) => [x, y + v, r],
  S: ([x, y, r], v) => [x, y - v, r],
  E: ([x, y, r], v) => [x + v, y, r],
  W: ([x, y, r], v) => [x - v, y, r],
  L: ([x, y, r], v) => [x, y, (r + 4 - v / 90) % 4],
  R: ([x, y, r], v) => [x, y, (r + 4 + v / 90) % 4],
  F: ([x, y, r], v) => [
    x - v * ((r + 1) % 2) * (r - 1),
    y - v * (r % 2) * (r - 2),
    r,
  ],
};

const mh = ([x, y]) => Math.abs(x) + Math.abs(y);

const resultA = mh(
  input.reduce((a, v) => t[v[0]](a, parseInt(v.slice(1), 10)), [0, 0, 0]),
);

const rotate = (i, j, v) => [
  (v === 90 ? 1 : -1) * (v === 180 ? i : j),
  (v === 270 ? 1 : -1) * (v === 180 ? j : i),
];

const t2 = {
  N: ([x, y, i, j], v) => [x, y, i, j + v],
  S: ([x, y, i, j], v) => [x, y, i, j - v],
  E: ([x, y, i, j], v) => [x, y, i + v, j],
  W: ([x, y, i, j], v) => [x, y, i - v, j],
  L: ([x, y, i, j], v) => [x, y, ...rotate(i, j, 360 - v)],
  R: ([x, y, i, j], v) => [x, y, ...rotate(i, j, v)],
  F: ([x, y, i, j], v) => [x + v * i, y + v * j, i, j],
};

const resultB = mh(
  input.reduce((a, v) => t2[v[0]](a, parseInt(v.slice(1), 10)), [0, 0, 10, 1]),
);

module.exports = [resultA, resultB];
