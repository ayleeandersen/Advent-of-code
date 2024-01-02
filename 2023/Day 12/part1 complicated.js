const day = 12;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let rows = og_input.split('\n');

// PART 1
// Any ? next to a COMPLETE # grouping MUST be a . and can be converted as such
// 1 => #. or ?. or ?? and must be on an end or preceeded by .
// 2 => ##. # or ? followed by 1's setup and must be on an end or preceeded by .
// 3 => ###. # or ? followed by 2's setup
let total = 0;
// for (let r = 0; r < 1; r++) {
for (let r = 0; r < rows.length; r++) {
  let row = rows[r].split(" ");
  let pattern = row[0];
  let numbers = row[1].split(",").map(n => parseInt(n));
  let foundHashAt = null;
  let lastHashAt = null;
  let newPattern = [...pattern];
  // TODO: May need to handle pattern[0] being #
  for (let i = pattern.length - 1; i >= 0; i--) {
    let value = pattern[i];
    if (value === "#" && foundHashAt === null) {
      foundHashAt = i;
    } else if (value !== "#" && foundHashAt !== null) {
      lastHashAt = i + 1;
      for (let j = numbers.length - 1; j >= 0; j--) {
        let splice = false;
        console.log("numbers[j]", numbers[j], pattern.substring((foundHashAt - numbers[j]) + 1, foundHashAt + 1));
        if (numbers[j] === (foundHashAt - lastHashAt) + 1) {
          splice = true;
        } else if (pattern[lastHashAt - 1] === "?" && pattern.substring((foundHashAt - numbers[j]) + 1, foundHashAt + 1).indexOf(".") === -1) {
          splice = true;
        }
        if (splice) {
          console.log("SPLICING");
          let numToDelete = numbers[j];
          if (foundHashAt !== pattern.length - 1) {
            foundHashAt += 1;
            numToDelete += 1;
          }
          console.log("found at", foundHashAt, "last hash at", lastHashAt);
          console.log("size", numbers[j]);
          console.log("start index", foundHashAt - numToDelete, "delete", numToDelete);
          newPattern.splice(foundHashAt - numToDelete, numToDelete);
          numbers.pop();
          foundHashAt = null;
          lastHashAt = null;
          break;
        }
      }
    }
    rows[r] = newPattern.join("") + " " + numbers.join(",");
  }
}

let outputStr = '';
rows.forEach(r => { outputStr += r + "\n" });
const outputFile = 'Advent-of-code/2023/Day ' + day + '/output.txt';
fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);