const day = 3;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 2
let sum = 0;
for (let i = 0; i < rows.length; i++) {
  let cols = rows[i].split('');
  for (let j = 0; j < cols.length; j++) {
    let e = cols[j];
    if (e === "*") {
      let touches = getTouches(i, j);
      console.log("TOUCHES", touches);
      if (touches.length === 2) {
        // console.log("Multiplied", parseInt(touches[0]) * parseInt(touches[1]));
        sum += parseInt(touches[0]) * parseInt(touches[1]);
        // console.log("New Sum", sum);
      }
    }
  }
}

function getTouches(i, j) {
  let touches = [];
  let prevRow = i > 0 ? rows[i-1] : null;
  let row = rows[i];
  let nextRow = i < row.length - 1 ? rows[i + 1] : null;
  // Check top left
  if (prevRow && j > 0 && !isNaN(prevRow[j-1])) {
    let number = '';
    let numStartIndex = j-1;
    // console.log("Original starting index", numStartIndex);
    while (numStartIndex > 0 && !isNaN(prevRow[numStartIndex])) {
      numStartIndex--;
      // console.log("New starting Index", numStartIndex, prevRow[numStartIndex]);
    }
    if (isNaN(prevRow[numStartIndex])) numStartIndex++;
    // console.log("Final starting index", numStartIndex);
    while (!isNaN(prevRow[numStartIndex]) && j < prevRow.length - 1) {
      number += prevRow[numStartIndex];
      numStartIndex++;
    }
    // console.log("Number (top left)", number);
    if (touches[touches.length - 1] !== number) {
      touches.push(number);
    }
  }
  // Check top
  if (prevRow && !isNaN(prevRow[j])) {
    let number = '';
    let numStartIndex = j;
    while (numStartIndex > 0 && !isNaN(prevRow[numStartIndex])) {
      numStartIndex--;
    }
    if (isNaN(prevRow[numStartIndex])) numStartIndex++;
    while (!isNaN(prevRow[numStartIndex]) && j < prevRow.length - 1) {
      number += prevRow[numStartIndex];
      numStartIndex++;
    }
    if (touches[touches.length - 1] !== number) {
      touches.push(number);
    }
  }
  // Check top right
  if (prevRow && j < prevRow.length - 1 && !isNaN(prevRow[j+1])) {
    let number = '';
    let numStartIndex = j+1;
    // console.log("Original starting index", numStartIndex);
    while (numStartIndex > 0 && !isNaN(prevRow[numStartIndex])) {
      numStartIndex--;
      // console.log("New starting Index", numStartIndex, prevRow[numStartIndex]);
    }
    if (isNaN(prevRow[numStartIndex])) numStartIndex++;
    // console.log("Final starting index", numStartIndex);
    while (!isNaN(prevRow[numStartIndex]) && j < prevRow.length - 1) {
      number += prevRow[numStartIndex];
      numStartIndex++;
    }
    // console.log("Number (top right)", number);
    if (touches[touches.length - 1] !== number) {
      touches.push(number);
    }
  }
  // Check left
  if (j > 0 && !isNaN(row[j-1])) {
    let number = '';
    let numStartIndex = j-1;
    while (numStartIndex > 0 && !isNaN(row[numStartIndex])) {
      numStartIndex--;
    }
    if (isNaN(row[numStartIndex])) numStartIndex++;
    while (!isNaN(row[numStartIndex]) && j < row.length - 1) {
      number += row[numStartIndex];
      numStartIndex++;
    }
    if (touches[touches.length - 1] !== number) {
      touches.push(number);
    }
  }
  // Check right
  if (j < row.length - 1 && !isNaN(row[j+1])) {
    let number = '';
    let numStartIndex = j+1;
    while (numStartIndex > 0 && !isNaN(row[numStartIndex])) {
      numStartIndex--;
    }
    if (isNaN(row[numStartIndex])) numStartIndex++;
    while (!isNaN(row[numStartIndex]) && j < row.length - 1) {
      number += row[numStartIndex];
      numStartIndex++;
    }
    if (touches[touches.length - 1] !== number) {
      touches.push(number);
    }
  }
  // Check bottom left
  if (nextRow && j > 0 && !isNaN(nextRow[j-1])) {
    let number = '';
    let numStartIndex = j-1;
    while (numStartIndex > 0 && !isNaN(nextRow[numStartIndex])) {
      numStartIndex--;
    }
    if (isNaN(nextRow[numStartIndex])) numStartIndex++;
    while (!isNaN(nextRow[numStartIndex]) && j < nextRow.length - 1) {
      number += nextRow[numStartIndex];
      numStartIndex++;
    }
    if (touches[touches.length - 1] !== number) {
      touches.push(number);
    }
  }
  // Check bottom
  if (nextRow && !isNaN(nextRow[j])) {
    let number = '';
    let numStartIndex = j;
    while (numStartIndex > 0 && !isNaN(nextRow[numStartIndex])) {
      numStartIndex--;
    }
    if (isNaN(nextRow[numStartIndex])) numStartIndex++;
    while (!isNaN(nextRow[numStartIndex]) && j < nextRow.length - 1) {
      number += nextRow[numStartIndex];
      numStartIndex++;
    }
    if (touches[touches.length - 1] !== number) {
      touches.push(number);
    }
  }
  // Check bottom right
  if (nextRow && j < nextRow.length - 1 && !isNaN(nextRow[j+1])) {
    let number = '';
    let numStartIndex = j+1;
    while (numStartIndex > 0 && !isNaN(nextRow[numStartIndex])) {
      numStartIndex--;
    }
    if (isNaN(nextRow[numStartIndex])) numStartIndex++;
    while (!isNaN(nextRow[numStartIndex]) && j < nextRow.length - 1) {
      number += nextRow[numStartIndex];
      numStartIndex++;
    }
    if (touches[touches.length - 1] !== number) {
      touches.push(number);
    }
  }
  return touches;
}

console.log("ANSWER", sum);