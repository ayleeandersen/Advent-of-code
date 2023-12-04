const day = 4;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

// PART 1
let sum = 0;
for (let i = 0; i < input_array.length; i++) {
  let both = input_array[i].replace(/Card.*\: /g, "");
  let bothArr = both.split("|");
  let winningValues = bothArr[0].split(" ").filter(val => val.length > 0);
  let yourValues = bothArr[1].split(" ").filter(val => val.length > 0);
  let rowScore = 0;
  for (let j = 0; j < yourValues.length; j++) {
    let yourValue = yourValues[j];
    if (winningValues.indexOf(yourValue) !== -1) {
      if (rowScore == 0) rowScore = 1;
      else rowScore = rowScore * 2;
    }
  }
  sum += rowScore;
}

console.log("ANSWER", sum);