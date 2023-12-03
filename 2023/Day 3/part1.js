const day = 3;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 1
let sum = 0;
for (let i = 0; i < rows.length; i++) {
  let cols = rows[i].split('');
  let num = []; // [{ val: '5', touches: false }, { val: '7', touches: true }, { val: '7', touches: true }]
  for (let j = 0; j < cols.length; j++) {
    let e = cols[j];
    if (!isNaN(e)) {
      let touches = checkSurroundings(i, j);
      // console.log("e touches", e, touches);
      num.push({ val: e, touches: touches });
    }
    if ((isNaN(e) && num.length > 0) || (!isNaN(e) && j == cols.length - 1)) {
      // console.log("NUM", num);
      if (num.filter(val => val.touches).length > 0) {
        // console.log("TOUCHES", num);
        let smallSum = 0;
        num.forEach(val => { smallSum += val.val.toString() });
        // console.log("SMALL SUM", smallSum);
        sum += parseInt(smallSum);
        // console.log("SUM", sum);
      }
      num = [];
    }
  }
}

function checkSurroundings(i, j) {
  let touches = false;
  let symbols = ["*","/","&","#","@","%","=","+","$","-"];
  let prevRow = i > 0 ? rows[i-1] : null;
  let row = rows[i];
  let nextRow = i < row.length - 1 ? rows[i + 1] : null;
  // Check top left
  if (prevRow && j > 0 && symbols.indexOf(prevRow[j-1]) != -1) {
    touches = true;
    return touches;
  }
  // Check top
  if (prevRow && symbols.indexOf(prevRow[j]) != -1) {
    touches = true;
    return touches;
  }
  // Check top right
  if (prevRow && j < prevRow.length - 1 && symbols.indexOf(prevRow[j+1]) != -1) {
    touches = true;
    return touches;
  }
  // Check left
  if (j > 0 && symbols.indexOf(row[j-1]) != -1) {
    touches = true;
    return touches;
  }
  // Check right
  if (j < row.length - 1 && symbols.indexOf(row[j+1]) != -1) {
    touches = true;
    return touches;
  }
  // Check bottom left
  if (nextRow && j > 0 && symbols.indexOf(nextRow[j-1]) != -1) {
    touches = true;
    return touches;
  }
  // Check bottom
  if (nextRow && symbols.indexOf(nextRow[j]) != -1) {
    touches = true;
    return touches;
  }
  // Check bottom right
  if (nextRow && j < nextRow.length - 1 && symbols.indexOf(nextRow[j+1]) != -1) {
    touches = true;
    return touches;
  }
  return touches;
}

console.log("ANSWER", sum);