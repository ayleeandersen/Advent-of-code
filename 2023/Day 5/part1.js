const day = 5;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');
input_array = input_array.filter(val => val.length > 0);

let seedsLine = input_array[0].replace("seeds: ", "");
let seedVals = seedsLine.split(" ");
let seeds = {};
seedVals.forEach(val => seeds[val] = val);

// PART 1 23414971
let lowest = 99999999999999999n;
let changedValues = {};
for (let i = 2; i < input_array.length; i++) {
  if (!isNaN(input_array[i][0])) {
    let mapVals = input_array[i].split(" ");
    let sourceStart = parseInt(mapVals[1]); 
    let destStart = parseInt(mapVals[0]);
    let range = parseInt(mapVals[2]);
    for (let sKey in seeds) {
      console.log("SEED", sKey, seeds[sKey]);
      if (seeds[sKey] >= sourceStart && seeds[sKey] <= sourceStart + range - 1) {
        console.log("IS IN RANGE");
        let diff = range - ((sourceStart + range) - seeds[sKey]);
        console.log("DIFF", diff);
        changedValues[sKey] = destStart + diff;
        console.log("NEW SEED VAL", changedValues[sKey]);
      }
    }
  } else {
    for (let sKey in changedValues) {
      seeds[sKey] = changedValues[sKey];
    }
    changedValues = {};
    for (let sKey in seeds) {
      console.log("Seed " + sKey + " converted to " + seeds[sKey]);
    }
  }
}
for (let sKey in changedValues) {
  seeds[sKey] = changedValues[sKey];
}

for (let val in seeds) {
  if (seeds[val] < lowest) {
    lowest = seeds[val];
  }
}

console.log("ANSWER", lowest);