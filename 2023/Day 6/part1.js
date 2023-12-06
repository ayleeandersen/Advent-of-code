const day = 6;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');
input_array = input_array.filter(val => val.length > 0);
let times = input_array[0].replace('Time:', "").split(" ").filter(e => e !== "");
let distances = input_array[1].replace('Distance:', "").split(" ").filter(e => e !== "");

// PART 1
// 1 ms -> 1mm / ms -> 6 mm
// 2 ms -> 2mm / ms -> 10 mm
// 3 ms -> 3mm / ms -> 12 mm
// 4 ms -> 4mm / ms -> 12 mm
// 5 ms -> 5mm / ms -> 10 mm
// 6 ms -> 6mm / ms -> 6 mm

// 15 ms 4-11 work 4 on each side
// hit it on index 4
// 8 possible solutions

// 30 ms 11-19 work 11 on each side

let total = 1;
for (let t = 0; t < times.length; t++) {
  let time = parseInt(times[t]);
  let distanceToBeat = parseInt(distances[t]);
  let numWaysToBeat = 0;

  console.log("Time", time);
  console.log("Distance", distanceToBeat);

  for (let s = 1; s < time; s++) {
    let newDist = (time - s) * s;
    console.log("New Distnace", newDist);
    if (newDist > distanceToBeat) {
      numWaysToBeat = time - (s * 2) + 1;
      console.log("Number of ways to beat", numWaysToBeat);
      break;
    }
  }

  if (numWaysToBeat > 0) {
    total = total * numWaysToBeat;
  }
}

console.log("ANSWER", total);