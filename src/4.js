const data = require('./4-input')
  .split('\n\n')
  .map((s) => s.replace(/\n/g, ' '));

const keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const toKeys = (s) => s.split(' ').map((kv) => kv.split(':')[0]);
const vFn = (s) => keys.every((k) => s.includes(k));
const resultA = data.reduce((a, v) => (vFn(toKeys(v)) ? a + 1 : a), 0);

const vRng = (v, l, h) => v >= l && v <= h;
const vHgt = (_, h, s) => (s === 'cm' && vRng(h, 150, 193)) || (s === 'in' && vRng(h, 59, 76));
const vObj = {
  byr: (v) => vRng(v, 1920, 2002),
  iyr: (v) => vRng(v, 2010, 2020),
  eyr: (v) => vRng(v, 2020, 2030),
  hgt: (v) => vHgt(...(/(\d+)(\w+)/g.exec(v) || [])),
  hcl: (v) => /#[0-9a-f]{6}/gi.exec(v),
  ecl: (v) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some((c) => c === v),
  pid: (v) => v.length === 9,
  cid: () => true,
};

const val = (o) => Object.keys(vObj).every((k) => vObj[k](o[k] || ''));
const mkv = (s) => s.reduce((a, p) => ((k, v) => ({ ...a, [k]: v }))(...p.split(':')), {});
const resultB = data.reduce((a, s) => (val(mkv(s.split(' '))) ? a + 1 : a), 0);

console.log(resultA);
console.log(resultB);

module.exports = [resultA, resultB];
