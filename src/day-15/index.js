const input = [0, 5, 4, 1, 10, 14, 7];

const iter = (inp, m) => {
  const u = new Array(m);

  inp.forEach((v, i) => {
    u[v] = i + 1;
  });
  let prev;
  let i = inp.length + 1;

  prev = 0;

  while (i < m) {
    if (!u[prev]) {
      u[prev] = i;
      prev = 0;
    } else {
      const cur = i - u[prev];
      u[prev] = i;
      prev = cur;
    }
    i += 1;
  }

  return prev;
};

const resultA = iter(input, 2020);
const resultB = iter(input, 30000000);

module.exports = [resultA, resultB];
