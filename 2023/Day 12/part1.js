const day = 12;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 1
// WRONG ANSWERS: 7444 (Too High), 7091 (Too High)
// RIGHT ANSWER: 7084
let total = 0;
function getNextSubPattern(remainingPattern, patternLengths, patternLengthIndex) {
  if (patternLengthIndex === patternLengths.length) {
    return;
  }
  let length = patternLengths[patternLengthIndex];
  for (let i = 0; i < remainingPattern.length; i++) {
    let value = remainingPattern[i];
    if (value !== "." && (i + length) <= remainingPattern.length) {
      let substring = remainingPattern.substring(i, i + length);
      let endingIndex = i + length === remainingPattern.length ? i + length : i + length + 1;
      // if (substring.indexOf(".") === -1 && (i + length === remainingPattern.length || remainingPattern[i+length] === "." || !isNaN(remainingPattern[i+length]))) {
      if (substring.indexOf(".") === -1 && (i + length === remainingPattern.length || remainingPattern[i+length] === "." || remainingPattern[i+length] === "?")) {
        // console.log("valid arrangement", remainingPattern.substring(i, endingIndex), "for length", length); // GOLD DEBUGGING LINE
        // if (patternLengthIndex === patternLengths.length - 1 && remainingPattern.substring(endingIndex).indexOf("#") !== -1) console.log("Actually invalid");
        if (patternLengthIndex === patternLengths.length - 1 && remainingPattern.substring(endingIndex).indexOf("#") === -1) {
          total++;
          // console.log("increased total", total); // GOLD DEBUGGING LINE
        } else {
          getNextSubPattern(remainingPattern.slice(endingIndex), patternLengths, patternLengthIndex + 1);
        }
      }
    }
    if (value === "#") break;
  }
}

let outputStr = '';

for (let r = 0; r < rows.length; r++) {
  let row = rows[r].split(" ");
  let pattern = row[0];
  let numbers = row[1].split(",").map(n => parseInt(n));
  let totalPrior = total;
  getNextSubPattern(pattern, numbers, 0);
  let totalAfter = total;
  console.log(pattern, totalAfter - totalPrior);
  outputStr += pattern + " " + (totalAfter - totalPrior) + "\n";
}

const outputFile = 'Advent-of-code/2023/Day ' + day + '/output.txt';
fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);