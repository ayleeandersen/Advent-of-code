const day = 10;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 1
let total = 0;

// Read in grid
let grid = [];
let s = { r: 0, c: 0 };
for (let r = 0; r < rows.length; r++) {
  let row = rows[r];
  let cols = row.split("");
  grid.push(cols);
  let sIndex = cols.indexOf("S");
  if (sIndex !== -1) {
    s = { r: r, c: sIndex };
  }
}

/**!SECTION
  | is a vertical pipe connecting north and south.
  - is a horizontal pipe connecting east and west.
  L is a 90-degree bend connecting north and east.
  J is a 90-degree bend connecting north and west.
  7 is a 90-degree bend connecting south and west.
  F is a 90-degree bend connecting south and east.
  . is ground; there is no pipe in this tile.
  S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
 */
// Check up and follow till stops or repeats
// Check right and follow till stops or repeats
// etc for down and left
// Keep track of number of steps so that if it repeats, we stop and divide in half
let steps = 0;
for (let d = 0; d < 4; d++) {
  steps = 0;
  let end = false;
  let solved = false;
  let nextRow = s.r;
  let nextCol = s.c;
  if (d === 0) { // top
    if (nextRow === 0) continue;
    nextRow = nextRow - 1;
    nextCol = nextCol;
  } else if (d === 1) { // right
    if (nextCol === grid[0].length - 1) continue;
    nextRow = nextRow;
    nextCol = nextCol + 1;
  } else if (d === 2) { // bottom
    if (nextRow === grid.length - 1) continue;
    nextRow = nextRow + 1;
    nextCol = nextCol;
  } else if (d === 3) { // left
    if (nextCol === 0) continue;
    nextRow = nextRow;
    nextCol = nextCol - 1;
  }
  let row = s.r;
  let col = s.c;
  let prevRow = s.r;
  let prevCol = s.r;
  while (!end && !solved) {
    steps++;
    prevRow = row;
    prevCol = col;
    row = nextRow;
    col = nextCol;
    let nextGridVal = grid[row][col];
    if (nextGridVal === "S") {
      end = true;
      solved = true;
    } else if (nextGridVal === ".") {
      end = true;
    } else if (nextGridVal === "|") {
      if (prevRow < row) {
        if (row === 0) end = true;
        else nextRow = row - 1;
      } else {
        if (row === grid.length - 1) end = true;
        else nextRow = row + 1;
      }
    } else if (nextGridVal === "-") {
      if (prevCol < col) {
        if (col === 0) end = true;
        else nextCol = col - 1;
      } else {
        if (col === grid[row].length - 1) end = true;
        else nextCol = col + 1;
      }
    } else if (nextGridVal === "L") {
      if ()
    } else if (nextGridVal === "J") {

    } else if (nextGridVal === "7") {

    } else if (nextGridVal === "F") {

    }
  }
  if (solved) break;
}
total = steps / 2;
console.log("ANSWER", total);