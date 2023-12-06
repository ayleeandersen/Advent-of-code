const day = 5;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');
input_array = input_array.filter(val => val.length > 0);

// PART 2 - Wrong answers: 34062605 (too high)
let seedsLine = input_array[0].replace("seeds: ", "");
let seedVals = seedsLine.split(" ");
let seedGroups = [];
for (let i = 0; i < seedVals.length; i+=2) {
  seedGroups.push({
    id: "seed group " + (i/2),
    start: parseInt(seedVals[i]),
    end: parseInt(seedVals[i]) + parseInt(seedVals[i+1]) - 1,
    convertedValueStart: parseInt(seedVals[i]),
    convertedValueEnd: parseInt(seedVals[i]) + parseInt(seedVals[i+1]) - 1,
    range: parseInt(seedVals[i+1])
  });
}
seedGroups.sort((groupA, groupB) => groupA.start - groupB.start);

let lowest = 99999999999999999n;
let maps = {};
let currentConversionType = "";
for (let i = 1; i < input_array.length; i++) {
  if (isNaN(input_array[i][0])) {
    currentConversionType = input_array[i].split(" ")[0];
    maps[currentConversionType] = [];
  } else {
    let line = input_array[i].split(" ");
    maps[currentConversionType].push({
      sourceStart: parseInt(line[1]),
      sourceEnd: parseInt(line[1]) + parseInt(line[2]) - 1,
      destStart: parseInt(line[0]),
      destEnd: parseInt(line[0]) + parseInt(line[2]) - 1,
      range: parseInt(line[2])
    });
    maps[currentConversionType].sort((groupA, groupB) => groupA.sourceStart - groupB.sourceStart);
  }
}

for (let mKey in maps) {
  let map = maps[mKey];
  for (let m = 0; m < map.length; m++) {
    let mapRow = map[m];
    for (sKey in seedGroups) {
      let seed = seedGroups[sKey];
      // If the range starts in the map row or if the range ends in the map row, we want to jump into it
      if ((seed.end >= mapRow.sourceStart && seed.end <= mapRow.sourceEnd) || (seed.start >= mapRow.sourceStart && seed.start <= mapRow.sourceEnd)) {
        console.log("Seed", seed);
        console.log("Map Row", mapRow);
        let diffStart = mapRow.range - ((mapRow.sourceStart + mapRow.range) - seed.start);
        let diffEnd = mapRow.range - ((mapRow.sourceEnd + mapRow.range) - seed.end);
        seed.convertedValueStart = mapRow.destStart + diffStart;
        seed.convertedValueEnd = mapRow.destEnd + diffEnd;
        // Trim off the ends as a new seed range
        if (seed.start < mapRow.sourceStart) {
          seed.convertedValueStart = mapRow.destStart;
          seedGroups.push({
            id: "seed group " + (seedGroups.length),
            start: seed.start,
            end: mapRow.sourceStart - 1,
            convertedValueStart: seed.start,
            convertedValueEnd: mapRow.sourceStart - 1,
            range: (mapRow.sourceStart - 1) - seed.start
          });
          console.log("Added New Seed", seedGroups[seedGroups.length-1]);
        } else if (seed.end > mapRow.sourceEnd) {
          seed.convertedValueEnd = mapRow.destEnd;
          seedGroups.push({
            id: "seed group " + (seedGroups.length),
            start: mapRow.sourceEnd + 1,
            end: seed.end,
            convertedValueStart: mapRow.sourceEnd + 1,
            convertedValueEnd: seed.end,
            range: seed.end - (mapRow.sourceEnd + 1)
          });
          console.log("Added New Seed", seedGroups[seedGroups.length-1]);
        }
        console.log("Updated Seed", seed);
      }
    }
  }
  seedGroups = seedGroups.map(group => ({
    id: group.id,
    start: group.convertedValueStart,
    end: group.convertedValueEnd,
    convertedValueStart: group.convertedValueStart,
    convertedValueEnd: group.convertedValueEnd,
    range: group.range
  }));
}

seedGroups = seedGroups.map(group => ({
  id: group.id,
  start: group.convertedValueStart,
  end: group.convertedValueEnd,
  convertedValueStart: group.convertedValueStart,
  convertedValueEnd: group.convertedValueEnd,
  range: group.range
}));

for (let sKey in seedGroups) {
  let seed = seedGroups[sKey];
  if (seed.start < lowest) {
    lowest = seed.start;
  }
}

console.log("ANSWER", lowest);