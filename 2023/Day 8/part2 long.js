const day = 8;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n').filter(line => line !== "");

let steps = input_array[0].split("").map(step => step == "L" ? 0 : 1);

// PART 2
let total = 0;
let map = {};
let locations = [];
for (let i = 1; i < input_array.length; i++) {
  let key = input_array[i].slice(0, 3);
  let left = input_array[i].slice(7, 10);
  let right = input_array[i].slice(12, 15);
  map[key] = [left, right];
  if (key[2] === "A") {
    // console.log("KEY ending in A", key);
    locations.push(key);
  }
}
// console.log("MAP", map);

let found = false;
let index = 0;
while (!found) {
  // console.log("New Locations", locations);
  let allEndInZ = true;
  for (var l = 0; l < locations.length; l++) {
    let location = locations[l];
    // console.log(" location", location);
    // console.log("   map at location", map[location]);
    // console.log("   step", steps[index]);
    location = map[location][steps[index]];
    // console.log("location at change", location);
    if (location[2] !== 'Z') {
      allEndInZ = false;
    }
    locations[l] = location;
  }
  index = (index + 1) % steps.length;
  total++;
  if (allEndInZ) {
    found = true;
  }
}

console.log("ANSWER", total);