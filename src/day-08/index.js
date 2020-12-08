const input = require('./input.json')
  .map((r) => /(\w{3}) ([+-]\d+)/.exec(r).slice(1))
  .map(([op, arg]) => ({ op, arg: parseInt(arg, 10) }));

const execute = (instructions, onlyValidTermination) => {
  const done = [];
  let i = 0;
  let a = 0;

  while (!done.includes(i) && i !== instructions.length) {
    done.push(i);
    const { op, arg } = instructions[i];
    a += op === 'acc' ? arg : 0;
    i += op === 'jmp' ? arg : 1;
  }

  return onlyValidTermination ? i === instructions.length && a : a;
};

const resultA = execute(input);

const swapOp = (i) => [
  ...input.slice(0, i),
  { op: input[i].op === 'jmp' ? 'nop' : 'jmp', arg: input[i].arg },
  ...input.slice(i + 1),
];

const resultB = input
  .map((_, i) => i)
  .filter((i) => input[i].op !== 'acc')
  .reduce((a, i) => (a === false ? execute(swapOp(i), true) : a), false);

console.log(resultA);
console.log(resultB);

module.exports = [resultA, resultB];
