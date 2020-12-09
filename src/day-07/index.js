const re = /(\d+) (.*) bag/;

const mkRule = (s) => ((p) => (p ? { [p[2]]: parseInt(p[1], 10) } : {}))(re.exec(s));
const mkRules = (s) => s.split(', ').reduce((a, v) => ({ ...a, ...mkRule(v) }), {});
const mkE = (s) => (([k, v]) => ({ [k]: mkRules(v) }))(s.split(' bags contain '));

const inp = require('./input.json').reduce((a, r) => ({ ...a, ...mkE(r) }), {});

const fb = (b, ex) => Object.keys(inp).filter((k) => inp[k][b] && !ex.includes(k));
const dig = (b, c) => ((l) => l.reduce((a, b2) => [...a, ...dig(b2, [...c, ...a])], l))(fb(b, c));

const count = (b) => Object.entries(inp[b]).reduce((a, [k, v]) => a + v * count(k), 1);

const resultA = dig('shiny gold', []).length;
const resultB = count('shiny gold') - 1;

module.exports = [resultA, resultB];
