document.querySelector('#solution').addEventListener('input', update);
document.querySelector('#width').addEventListener('input', update);

update();

function update() {
  const input = document.querySelector('#solution').value;
  const width = document.querySelector('#width').value;
  const solution = makeTable(input, width);

  printTable(solution);
  printSolution(solution);
  validate(solution);
}

function makeTable(input, W) {
  return input.split(',').map(x => parseInt(x.trim())).map(x => -x).reduce(
    (ret, x, i) => i % W == 0 ? [...ret, [x]] : [...ret.slice(0, -1), [...ret[ret.length - 1], x]],
    []
  ).map(
    (row, i, arr) => row.map(
      (x, j) => x == 0 ? sumBox(arr, i, j) : x
    )
  );
}

function validate(solution) {
  const errors = [];

  for (let i=0; i<solution.length; i++) {
    for (let j=0; j<solution[i].length; j++) {
      const box = makeBox(solution, i, j);
      if (!validBox(box)) {
        errors.push(`Invalid box at ${i},${j}: ${box}`);
      }
    }
  }

  for (let i = 0; i < 25; i ++) {
    if (solution.flat().indexOf(i) == -1) {
      errors.push(`Missing number: ${i}`);
    }
  }

  printError(errors.join('<br />'));
}

function sumBox(arr, i, j) {
  const values = [
    arr[i][j - 1] || 0,
    arr[i][j + 1] || 0,
    arr[i - 1]?.[j] || 0,
    arr[i + 1]?.[j] || 0,
    arr[i + 1]?.[j + 1] || 0,
    arr[i + 1]?.[j - 1] || 0,
    arr[i - 1]?.[j + 1] || 0,
    arr[i - 1]?.[j - 1] || 0,
  ]
  return -values.reduce((ret, x) => x && x < 0 ? ret + x : ret);
}

function makeBox(arr, midy, midx) {
  const box = [];
  for (let i=midy-1; i<midy+2; i++) {
    box.push([]);
    for (let j=midx-1; j<midx+2; j++) {
      if (j >= 0 && i >= 0 && i < arr.length && j < arr[i].length) {
        box[box.length - 1].push(arr[i][j]);
      } else {
        box[box.length - 1].push(null);
      }
    }
  }
  return box;
}

function validBox(box) {
  const sum = -box.flat().filter(x => x && x < 0).reduce((ret, x) => ret + x, 0);
  return box[1][1] < 0 || box[1][1] == sum;
}

function printError(msg) {
  const elm = document.querySelector('#error');
  elm.innerHTML = msg;
}

function printTable(rows) {
  const elm = document.querySelector('#field');

  elm.innerHTML = '<tr>' + rows.map(
    nums => nums.map(x => `<td${x < 0 ? ' class="mine"' : ''}>${Math.abs(x)}</td>`).join('')
  ).join('</tr><tr>') + '</tr>';
}

function printSolution(solution) {
  const nums = solution.map(
    row => row.map(
      x => x < 0 ? -x : 0
    ).join('')
  ).join('\n');
  const count = -solution.flat().filter(x => x < 0).reduce((r, x) => r + x, 0);
  const top = [solution.length, solution[0].length, count].join(' ');
  document.querySelector('#print').innerHTML = top + '\n' + nums;
}

function iterable(n) {
  return [...(new Array(n))];
}
