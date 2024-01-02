const day = 13;

const filename = 'Advent-of-code/2023/Day ' + day + '/example.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let patterns = og_input.split('\n\n');

// PART 1
// WRONG ANSWERS: 37972 (Too Low), 37860 (Too Low)
// RIGHT ANSWER: 37982
let total = 0;
for (let pattern of patterns) {
  let mirrorFound = false;
  // Check Rows First
  let rows = pattern.split("\n");
  let mirrorTopIndex = null;
  for (let r = 0; r < rows.length - 1; r++) {
    // if they're not exactly the same, are they one off? If they're one off, assume they're the same.
    let usedSmudge = false;
    if (rows[r] === rows[r+1] || rows[r].split("").filter((c,i) => c !== rows[r+1][i]).length === 1) {
      if (rows[r] !== rows[r+1]) usedSmudge = true;
      mirrorTopIndex = r;
      let isValidMirror = true;
      for (let i = r - 1; i >= 0 && (r + 1) + (r - i) < rows.length; i--) {
        let reflectionTop = rows[i]
        let reflectionBottom = rows[(r + 1) + (r - i)]
        if ((reflectionTop !== reflectionBottom && usedSmudge) || reflectionTop.split("").filter((c,i) => c !== reflectionBottom[i]).length > 1) {
          isValidMirror = false;
          break;
        } else if (reflectionTop !== reflectionBottom) {
          usedSmudge = true;
        }
      }
      if (isValidMirror && usedSmudge) {
        total += 100 * (mirrorTopIndex + 1);
        mirrorFound = true;
        break;
      }
    }
  }
  if (mirrorFound) continue;
  // Rotate array
  let rotatedPattern = [];
  for (let c = 0; c < rows[0].length; c++) {
    let newRow = [];
    for (let r = 0; r < rows.length; r++) {
      newRow.push(rows[r][c]);
    }
    rotatedPattern.push(newRow.join(""));
  }
  // Check Cols Last
  let mirrorLeftIndex = null;
  for (let r = 0; r < rotatedPattern.length - 1; r++) {
    // if they're not exactly the same, are they one off? If they're one off, assume they're the same.
    let usedSmudge = false;
    if (rotatedPattern[r] === rotatedPattern[r+1] || rotatedPattern[r].split("").filter((c,i) => c !== rotatedPattern[r+1][i]).length === 1) {
      if (rotatedPattern[r] !== rotatedPattern[r+1]) usedSmudge = true;
      mirrorLeftIndex = r;
      let isValidMirror = true;
      for (let i = r - 1; i >= 0 && (r + 1) + (r - i) < rotatedPattern.length; i--) {
        let reflectionLeft = rotatedPattern[i]
        let reflectionRight = rotatedPattern[(r + 1) + (r - i)]
        if ((reflectionLeft !== reflectionRight && usedSmudge) || reflectionLeft.split("").filter((c,i) => c !== reflectionRight[i]).length > 1) {
          isValidMirror = false;
          break;
        } else if (reflectionLeft !== reflectionRight) {
          usedSmudge = true;
        }
      }
      if (isValidMirror && usedSmudge) {
        total += (mirrorLeftIndex + 1);
        mirrorFound = true;
        break;
      }
    }
  }
  if (!mirrorFound) {
    console.log("COULDN'T FIND MIRROR\n", pattern);
  }
}

// let outputStr = '';
// rows.forEach(r => { outputStr += r + "\n" });
// const outputFile = 'Advent-of-code/2023/Day ' + day + '/output.txt';
// fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);