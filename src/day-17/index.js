const input = `.##...#.
.#.###..
..##.#.#
##...#.#
#..#...#
#..###..
.##.####
..#####.`.split('\n');

const incD = (l, d) => (d === 2 ? l : [incD(l, d - 1)]);

const nbt = {};

// Generates array of relative coords for all n-dimensional neighbours
const nb = (d) => {
  if (nbt[d]) return nbt[d];
  const t = new Array(3 ** d)
    .fill(0)
    .map((_, i) => i
      .toString(3)
      .padStart(d, '0')
      .split('')
      .map((v) => v - 1))
    .filter((r) => r.reduce((a, v) => a || v, false))
    .map((r) => (l, c) => r.reduce((a, v, i) => a?.[c[i] - v], l));

  nbt[d] = t;

  return t;
};

// Finds number of active neighbours in list l at position [c1, c2, ...]
const ac = (l, c) => nb(c.length).reduce((a, fn) => a + (fn(l, c) === '#' ? 1 : 0), 0);

// Creates an n-dimensional field filled with inactive elements
const cEmp = (s, d) => (d === 1 ? '.'.repeat(s) : new Array(s).fill(cEmp(s, d - 1)));

// Surrounds the input with '.' in all dimensions
const pad = (l, d) => ((s) => (d === 1
  ? `.${l}.`
  : [cEmp(s, d - 1), ...l.map((m) => pad(m, d - 1)), cEmp(s, d - 1)]))(
  (d === 1 ? l : new Array(d - 1).fill().reduce((a) => a[0], l)).length + 2,
);

// Next value for a given state and number of active neighbours
const nxt = (n, v) => ((v === '#' && (n === 2 || n === 3)) || (v === '.' && n === 3) ? '#' : '.');

// Recursively sets state for nodes at every coordinate in n-dimensional field
const red = (l, p, c) => (typeof p === 'string'
  ? p.split('').reduce((a, v, x) => `${a}${nxt(ac(l, [...c, x]), v)}`, '')
  : p.reduce((a, v, i) => [...a, red(l, v, [...c, i])], []));

// Recursively removes everything outside of active field
const pruner = (l, [[min, max], ...p]) => (typeof l === 'string'
  ? l.slice(min, max + 1)
  : l.map((m) => pruner(m, p)).slice(min, max + 1));

const flatc = (l, c) => (typeof l === 'string'
  ? l.split('').map((s, x) => [s, ...c, x])
  : l.flatMap((m, i) => flatc(m, [...c, i])));

const bounds = (l) => l.reduce(
  (a, [, ...v]) => a.reduce(
    (b, [min, max], i) => [
      ...b,
      [v[i] < min ? v[i] : min, v[i] > max ? v[i] : max],
    ],
    [],
  ),
  new Array(l[0].length - 1).fill([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ]),
);

// Finds outer bounds of '#', and removes anything outside of it as it's irrelevant
const prune = (l) => ((c) => pruner(l, c))(bounds(flatc(l, []).filter(([s]) => s === '#')));

// Finds number of active cubes after n cycles in d dimensions
const calc = (l, d, n = 6) => new Array(n)
  .fill()
  .reduce((a) => pad(prune(red(a, a, [])), d), pad(incD(l, d), d))
  .flat(d - 2)
  .join('')
  .replace(/\./g, '').length;

const resultA = calc(input, 3, 6);
const resultB = calc(input, 4, 6);
// Works for any >= 2 dimension
// const resultC = calc(input, 5, 6);

module.exports = [resultA, resultB];
