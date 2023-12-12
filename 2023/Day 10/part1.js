const day = 10;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 1
// Wrong Answers: 6818 (Too High), 6817 (Too High)
// Right Answer: 6812
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
  | is a vertical pipe connecting north and south. Has to touch L below or J below or 7 above or F above.
  - is a horizontal pipe connecting east and west. Has to touch L left or F left or J right or 7 right.
  L is a 90-degree bend connecting north and east. Has to touch | above or 7 above or F above or J right or 7 right or - right.
  J is a 90-degree bend connecting north and west. Has to touch
  7 is a 90-degree bend connecting south and west.
  F is a 90-degree bend connecting south and east.

  . is ground; there is no pipe in this tile.
  S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
 */
let map = {
  "|": { north: true, south: true },
  "-": { east: true, west: true },
  "L": { north: true, east: true },
  "J": { north: true, west: true },
  "7": { south: true, west: true },
  "F": { south: true, east: true },
  "S": { north: true, east: true, south: true, west: true },
  ".": {}
}

function isValid(gridVal, r, c) {
  let valid = true;
  if (map[gridVal].north) {
    if (r - 1 < 0 || !map[grid[r-1][c]].south) valid = false;
  }
  if (map[gridVal].south) {
    if (r + 1 >= grid.length || !map[grid[r+1][c]].north) valid = false;
  }
  if (map[gridVal].east) {
    if (c + 1 >= grid[0].length || !map[grid[r][c+1]].west) valid = false;
  }
  if (map[gridVal].west) {
    if (c - 1 < 0 || !map[grid[r][c-1]].east) valid = false;
  }
  return valid;
}

let changesMade = true;
while (changesMade) {
changesMade = false;
total = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let gridVal = grid[r][c];
      if (gridVal === "." || gridVal === "S") continue;
      if (!isValid(gridVal, r, c)) {
        grid[r][c] = ".";
        changesMade = true;
      } else {
        total++;
      }
    }
  }
}

// d 0 north
// d 1 east
// d 2 south
// d 3 west
let steps = 1;
let finishedLoop = false;
let node = { r: s.r, c: s.c, v: grid[s.r][s.c] };
steps = 1;
if (s.r - 1 >= 0 && map[grid[s.r-1][s.c]].south) { // Go North
  node = { r: s.r - 1, c: s.c, v: grid[s.r-1][s.c], d: 0 };
} else if (s.c + 1 < grid[0].length && map[grid[s.r][s.c+1]].west) { // Go East
  node = { r: s.r, c: s.c + 1, v: grid[s.r][s.c+1], d: 1 };
} else if (s.r + 1 < grid.length && map[grid[s.r+1][s.c]].noth) { // Go South
  node = { r: s.r + 1, c: s.c, v: grid[s.r+1][s.c], d: 2 };
} else if (s.c - 1 >= 0 && map[grid[s.r][s.c-1]].east) { // Go West
  node = { r: s.r, c: s.c - 1, v: grid[s.r][s.c-1], d: 3 };
}
while (!finishedLoop) {
  // console.log("NODE", node);
  if (node.v === "S") {
    finishedLoop = true;
  } else {
    let newNode = { r: node.r, c: node.c, v: node.v, d: node.d };
    if (node.v === "|") {
      newNode.r = node.d === 0 ? node.r - 1 : node.r + 1;
      newNode.d = node.d;
    } else if (node.v === "-") {
      newNode.c = node.d === 1 ? node.c + 1 : node.c - 1;
      newNode.d = node.d;
    } else if (node.v === "L") {
      newNode.r = node.d === 2 ? node.r : node.r - 1;
      newNode.c = node.d === 2 ? node.c + 1 : node.c;
      newNode.d = node.d === 2 ? 1 : 0;
    } else if (node.v === "J") {
      newNode.r = node.d === 2 ? node.r : node.r - 1;
      newNode.c = node.d === 2 ? node.c - 1 : node.c;
      newNode.d = node.d === 2 ? 3 : 0;
    } else if (node.v === "7") {
      newNode.r = node.d === 0 ? node.r : node.r + 1;
      newNode.c = node.d === 0 ? node.c - 1 : node.c;
      newNode.d = node.d === 0 ? 3 : 2;
    } else if (node.v === "F") {
      newNode.r = node.d === 0 ? node.r : node.r + 1;
      newNode.c = node.d === 0 ? node.c + 1 : node.c;
      newNode.d = node.d === 0 ? 1 : 2;
    }
    newNode.v = grid[newNode.r][newNode.c];
    node = newNode;
    steps++;
  }
}
console.log("STEPS IN CORRECT LOOP", steps);

let outputStr = '';
for (let r = 0; r < grid.length; r++) {
  outputStr += grid[r].join("") + "\n";
}
const outputFile = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'output' : 'input') + '.txt';
let output = fs.writeFileSync(outputFile, outputStr, 'utf-8');

total = steps / 2;

// console.log("Modified grid", grid);
console.log("ANSWER", total);