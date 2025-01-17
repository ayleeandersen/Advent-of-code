const day = 8;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n').filter(line => line !== "");

let steps = input_array[0].split("").map(step => step == "L" ? 0 : 1);

// PART 1
let total = 0;
let map = {};
for (let i = 1; i < input_array.length; i++) {
  let key = input_array[i].slice(0, 3);
  let left = input_array[i].slice(7, 10);
  let right = input_array[i].slice(12, 15);
  map[key] = [left, right];
}
// console.log("MAP", map);

let found = false;
let index = 0;
let location = 'AAA';
while (!found) {
  location = map[location][steps[index]];
  index = (index + 1) % steps.length;
  total++;
  if (location === 'ZZZ') {
    found = true;
  }
}

console.log("ANSWER", total);