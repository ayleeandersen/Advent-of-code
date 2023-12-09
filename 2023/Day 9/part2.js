const day = 9;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

// PART 2
let total = 0;
for (let i = 0; i < input_array.length; i++) {
  let history = input_array[i].split(" ").map(h => parseInt(h));
  let differences = [history];
  for (let j = 0; j < differences.length; j++) {
    let difference = differences[j];
    let newDifference = [];
    let allZero = true;
    for (let k = 0; k < difference.length - 1; k++) {
      let diff = parseInt(difference[k+1]) - parseInt(difference[k]);
      newDifference.push(diff);
      if (diff !== 0) allZero = false;
    }
    differences.push(newDifference);
    if (allZero) break;
  }
  // console.log("DIFFERENCES", differences);

  for (let j = differences.length - 1; j >= 1; j--) {
    let lastDifference = differences[j][0];
    let nextLastDifference = differences[j-1][0];
    differences[j-1].unshift(nextLastDifference - lastDifference);
  }
  let nextNum = differences[0][0];
  // console.log("Next Num", nextNum);
  total += nextNum;
}

console.log("ANSWER", total);