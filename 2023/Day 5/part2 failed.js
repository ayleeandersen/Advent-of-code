const day = 5;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');
input_array = input_array.filter(val => val.length > 0);

// PART 2
let seedsLine = input_array[0].replace("seeds: ", "");
let seedVals = seedsLine.split(" ");
const CHUNK_SIZE = 1000000;
let chunks = [];
for (let i = 0; i < seedVals.length; i+=2) {
  let rangeStart = parseInt(seedVals[i]);
  let rangeEnd = rangeStart + parseInt(seedVals[i+1]) - 1;
  for (let c = rangeStart; c + CHUNK_SIZE < rangeEnd; c+=CHUNK_SIZE) {
    chunks.push({ start: c, stop: c + CHUNK_SIZE - 1 });
  }
  chunks.push({ start: chunks[chunks.length-1].stop + 1, stop: rangeEnd });
}

let lowest = 99999999999999999n;
for (let c = 0; c < chunks.length; c++) {
  let changedValues = {};
  let seeds = {};
  for (let s = chunks[c].start; s <= chunks[c].stop; s++) {
    seeds[s] = s;
  }
  for (let i = 2; i < input_array.length; i++) {
    if (!isNaN(input_array[i][0])) {
      let mapVals = input_array[i].split(" ");
      let sourceStart = parseInt(mapVals[1]); 
      let destStart = parseInt(mapVals[0]);
      let range = parseInt(mapVals[2]);
      for (let sKey in seeds) {
        if (seeds[sKey] >= sourceStart && seeds[sKey] <= sourceStart + range - 1) {
          let diff = range - ((sourceStart + range) - seeds[sKey]);
          changedValues[sKey] = destStart + diff;
        }
      }
    } else {
      for (let sKey in changedValues) {
        seeds[sKey] = changedValues[sKey];
      }
      changedValues = {};
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
  console.log("FINISHED CHUNK", c, "OF", chunks.length);
}




console.log("ANSWER", lowest);