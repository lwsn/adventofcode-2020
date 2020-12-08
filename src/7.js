const re = /(\d+) (.*) bag/;

const mkRule = (s) => ((p) => (p ? { [p[2]]: parseInt(p[1], 10) } : {}))(re.exec(s));
const mkRules = (s) => s.split(', ').reduce((a, v) => ({ ...a, ...mkRule(v) }), {});
const mkEntry = (s) => (([k, v]) => ({ [k]: mkRules(v) }))(s.split(' bags contain '));

const rules = require('./7-input')
  .split('\n')
  .reduce((a, r) => ({ ...a, ...mkEntry(r) }), {});

const fb = (b, ex) => Object.keys(rules).filter((k) => rules[k][b] && !ex.includes(k));
const dig = (b, c) => ((l) => l.reduce((a, b2) => [...a, ...dig(b2, [...c, ...a])], l))(fb(b, c));

const count = (b) => Object.entries(rules[b]).reduce((a, [k, v]) => a + v * count(k), 1);

const resultA = dig('shiny gold', []).length;
const resultB = count('shiny gold') - 1;

console.log(resultA);
console.log(resultB);

module.exports = [resultA, resultB];
