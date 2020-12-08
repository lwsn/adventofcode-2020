const input = require('./input.json');

const fn = (k) => (a, v, i) => (v[(i * k) % v.length] === '#' ? a + 1 : a);
const resA = input.reduce(fn(3), 0);
const resB = [1, 3, 5, 7, 0.5].reduce((a, k) => a * input.reduce(fn(k), 0), 1);

module.exports = [resA, resB];
