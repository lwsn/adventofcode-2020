const [rules, ticket, tickets] = require('./input').split('\n\n');

const re = / (\d+)-(\d+) or (\d+)-(\d+)/;

const fTickets = tickets
  .split('\n')
  .slice(1)
  .map((s) => s.split(',').map((v) => parseInt(v, 10)));

const fmt = (s) => s.slice(1).map((v) => parseInt(v, 10));

const vr = rules
  .split('\n')
  .flatMap((s) => (([f, t, f2, t2]) => [[f, t], [f2, t2]])(fmt(re.exec(s))))
  .sort(([f1, t], [f2]) => (f2 < t && f2 < f1 ? 1 : -1))
  .reduce(
    ([a, ...l], [f, t]) => (a
      ? (a[1] >= f && [[a[0], Math.max(a[1], t)], ...l]) || [[f, t], a, ...l]
      : [[f, t]]),
    [],
  );

const ivr = (v) => vr.reduce((c, [f, t]) => c || (v >= f && v <= t), false);

const resultA = fTickets.reduce(
  (a, s) => a + s.reduce((b, v) => b + (ivr(v) ? 0 : v), 0),
  0,
);

const validTickets = fTickets.filter((s) => s.reduce((b, v) => b && ivr(v), true));

const formattedRules = rules
  .split('\n')
  .map((s, i) => (([f, t, f2, t2]) => [[f, t], [f2, t2], i])(fmt(re.exec(s))));

const columns = formattedRules.map((_, i) => [validTickets.map((r) => r[i]), i]);

const resultB = (() => {
  let availableRules = formattedRules;
  const assignedRules = {};
  let availableCols = columns;
  while (availableRules.length > 1) {
    const ar = availableRules;
    const [found] = availableCols
      .map(([c, j]) => ({
        j,
        r: c.reduce(
          (a, v) => a.filter(
            ([[f, t], [f2, t2]]) => (v >= f && v <= t) || (v >= f2 && v <= t2),
          ),
          ar,
        ),
      }))
      .filter(({ r }) => r.length === 1);

    availableRules = availableRules.filter(([, , j]) => j !== found.r[0][2]);
    assignedRules[found.r[0][2]] = found.j;
    availableCols = availableCols.filter(([, j]) => j !== found.j);
  }

  return rules
    .split('\n')
    .map((s, i) => [s, i])
    .filter(([s]) => s.includes('departure'))
    .map(([, i]) => assignedRules[i])
    .map((i) => parseInt(ticket.split('\n')[1].split(',')[i], 10))
    .reduce((a, v) => a * v, 1);
})();

module.exports = [resultA, resultB];
