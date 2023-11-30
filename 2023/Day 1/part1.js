const day = 1;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

//part 1
for (let i = 0; i < input_array.length; i++){
  let item = input_array[i] == "" ? "" : parseInt(input_array[i]);
}