const re = /mem\[(\d+)\] = (\d+)/;
const input = require('./input')
  .split('mask = ')
  .slice(1)
  .map((s) => s.split('\n').slice(0, -1))
  .map(([m, ...a]) => ({
    m,
    a: a
      .map((s) => re.exec(s).slice(1))
      .map(([i, j]) => [parseInt(i, 10), parseInt(j, 10)]),
  }));

const mask = (m, v) => v
  .toString(2)
  .padStart(m.length, '0')
  .split('')
  .map((b, i) => (m[i] === 'X' ? b : m[i]))
  .join('');

const resultA = Object.values(
  input.reduce(
    (b, { m, a }) => ({
      ...b,
      ...a.reduce((c, [d, v]) => ({ ...c, [d]: parseInt(mask(m, v), 2) }), {}),
    }),
    {},
  ),
).reduce((a, v) => a + v, 0);

const gn = (m) => new Array(2 ** m.split('').filter((v) => v === 'X').length)
  .fill(m.split('').filter((v) => v === 'X').length)
  .map((v, i) => i.toString(2).padStart(v, '0'))
  .map((b) => m
    .split('X')
    .map((v, i) => `${v}${b[i] || ''}`)
    .join(''));

const ms = (m, n) => ((s) => gn(m).map((t) => t
  .split('')
  .map((c, i) => (m[i] === '0' ? s[i] : c))
  .join('')))(
  n
    .toString(2)
    .padStart(m.length, '0')
    .split(''),
);

const fn = (l, v) => l.reduce((a, d) => ({ ...a, [parseInt(d, 2)]: v }), {});

const resultB = Object.values(
  input.reduce(
    (b, { m, a }) => ({
      ...b,
      ...a.reduce((c, [d, v]) => ({ ...c, ...fn(ms(m, d), v) }), {}),
    }),
    {},
  ),
).reduce((a, v) => a + v, 0);

module.exports = [resultA, resultB];
