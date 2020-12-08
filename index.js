const { readdirSync } = require('fs');

const all = readdirSync('./src', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const [, , ...toRun] = process.argv;
const fallback = new Array(all.length).fill(1).map((v, i) => v + i);
const getResult = i => require(`./src/day-${`${i}`.padStart(2, "0")}`); // eslint-disable-line
// TODO: Something useful
(toRun.length ? toRun : fallback).forEach((i) => console.log(`Day ${i}:`, getResult(i)));
// console.log(results);
