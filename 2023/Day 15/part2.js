const day = 15;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let characterSets = og_input.split(",");

// PART 1
let total = 0;
let boxes = {}; // { 0: { rn: 1, qp: 3 }}
for (let i = 0; i < 256; i++) {
  boxes[i] = {};
}
for (let s = 0; s < characterSets.length; s++) {
  let characters = characterSets[s];
  let subTotal = 0;
  let label = '';
  let c;
  for (c = 0; characters[c] !== "=" && characters[c] !== "-"; c++) {
    let newValue = characters[c].charCodeAt(0) + subTotal;
    newValue = newValue * 17;
    subTotal = newValue % 256;
    label += characters[c];
  }
  if (characters[c] === "-") {
    if (boxes[subTotal][label]) {
      delete boxes[subTotal][label];
    }
  } else {
    boxes[subTotal][label] = parseInt(characters.substring(c + 1));
  }
  // console.log("After '" + characterSets[s] + "':");
  // console.log("Box 0:", boxes["0"]);
  // console.log("Box 1:", boxes["1"]);
  // console.log("Box 2:", boxes["2"]);
  // console.log("Box 3:", boxes["3"]);
}

for (let box in boxes) {
  let labels = Object.keys(boxes[box]);
  for (let l = 0; l < labels.length; l++) {
    let label = labels[l];
    let lens = boxes[box][label];
    let addition = (1 + parseInt(box)) * (l + 1) * lens;
    total += addition;
  }
}

// let outputStr = '';
// for (let r = 0; r < grid.length; r++) {
//   outputStr += grid[r].join("") + "\n";
// }
// const outputFile = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'output' : 'input') + '.txt';
// let output = fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);