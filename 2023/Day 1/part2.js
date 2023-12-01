const day = 1;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const digitMap = {
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7", 
  "eight": "8",
  "nine": "9"
};
let sum = 0;
for (let i = 0; i < input_array.length; i++) {
  let item = input_array[i];
  let smallSum = "";

  let firstIndex = item.length - 1;
  let firstVal = '';
  let replace = false;
  // First digit
  for (let j = 0; j < digits.length; j++) {
    let digit = digits[j];
    let index = item.indexOf(digit);
    if (index != -1 && index < firstIndex) {
      firstIndex = index;
      firstVal = digit;
      replace = true;
    }
  }
  if (replace && firstVal.length > 1) {
    item = item.replace(firstVal, "x" + firstVal.substring(1, -1));
  } else if (replace && firstVal.length === 1) {
    item = item.replace(firstVal, "x");
  }
  // Last digit
  let lastIndex = 0;
  let lastVal = '';
  for (let j = 0; j < digits.length; j++) {
    let digit = digits[j];
    let index = item.indexOf(digit);
    while (index != -1) {
      if (item.indexOf(digit, index + 1) !== -1) {
        index = item.indexOf(digit, index + 1);
      } else {
        break;
      }
    }
    if (index != -1 && index > lastIndex) {
      lastIndex = index;
      lastVal = digit;
    }
  }

  // Sum
  smallSum = (digitMap[firstVal] ? digitMap[firstVal] : firstVal) + (digitMap[lastVal] ? digitMap[lastVal] : lastVal);
  if (smallSum.length === 1) {
    smallSum = smallSum + smallSum;
  }
  sum += parseInt(smallSum);
}

console.log("SUM", sum);