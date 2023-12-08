const day = 8;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n').filter(line => line !== "");

let steps = input_array[0].split("").map(step => step == "L" ? 0 : 1);

// PART 2
let total = 1;
let map = {};
let locations = [];
let stepsPerLocation = [];
for (let i = 1; i < input_array.length; i++) {
  let key = input_array[i].slice(0, 3);
  let left = input_array[i].slice(7, 10);
  let right = input_array[i].slice(12, 15);
  map[key] = [left, right];
  if (key[2] === "A") {
    locations.push(key);
  }
}

// console.log("map", map);

// console.log("locations", locations);

for (let l = 0; l < locations.length; l++) {
  let location = locations[l];
  let found = false;
  let index = 0;
  let stepsCount = 0;
  while (!found) {
    // console.log("location", location);
    if (location[2] === 'Z') {
      stepsPerLocation[l] = stepsCount;
      found = true;
    }
    location = map[location][steps[index]];
    // console.log('Updated location', location);
    locations[l] = location;
    index = (index + 1) % steps.length;
    stepsCount++;
  }
}

console.log("STEPS PER LOCATION", stepsPerLocation);

function LCM(arr) {
  let max = 0;
  let highestMultiple = 1;
  for (let a = 0; a < arr.length; a++) {
    if (arr[a] > max) max = arr[a];
    highestMultiple *= arr[a];
  }
  // console.log("max", max);
  // console.log("highest multiple", highestMultiple);
  
  for (let i = 1; max * i <= highestMultiple; i++) { 
    let allWork = true;
    for (let ss = 0; ss < arr.length; ss++) {
      if ((max * i) % arr[ss] !== 0) {
        allWork = false;
        break;
      }
    }
    if (allWork) return (max * i);
  } 
} 
  
total = LCM(stepsPerLocation); 

console.log("ANSWER", total);