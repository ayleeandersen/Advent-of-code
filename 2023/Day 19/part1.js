const day = 19;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let sections = og_input.split("\n\n");
let workflows = sections[0].split("\n");
let ratings = sections[1].split("\n");

// PART 1
// WRONG ANSWERS: 445149 (Too High)
// RIGHT ANSWER: 368964
let total = 0;
let workflowMap = {};
for (let w = 0; w < workflows.length; w++) {
  let workflow = workflows[w];
  let key = workflow.match(/.*(?={)/)[0];
  let conditions = workflow.replace(/.*\{/, "").replace("}", "").split(",");
  let conditionsMap = [];
  for (let c = 0; c < conditions.length; c++) {
    let conditionPieces = conditions[c].split(":");
    if (conditionPieces.length > 1) {
      conditionsMap.push({
        input: conditionPieces[0][0],
        operator: conditionPieces[0][1],
        compareTo: conditionPieces[0].substring(2),
        destination: conditionPieces[1]
      });
    } else {
      conditionsMap.push({
        destination: conditionPieces[0]
      });
    }
  }
  workflowMap[key] = conditionsMap;
}
// console.log("WORKFLOW MAP", workflowMap);

for (let r = 0; r < ratings.length; r++) {
  let key = "in";
  let rating = ratings[r];
  rating = rating.replace("{", "").replace("}", "").split(",");
  let ratingMap = {};
  rating.forEach(rate => {
    let rateSections = rate.split("=");
    ratingMap[rateSections[0]] = parseInt(rateSections[1]);
  });
  // console.log("RATING", ratingMap);
  let finished = false;
  while (!finished) {
    // console.log("Key", key);
    // console.log("workflowMap[key]", workflowMap[key]);
    for (let map in workflowMap[key]) {
      // console.log("MAP", workflowMap[key][map]);
      // console.log("compare", workflowMap[key][map].operator === ">", ratingMap[workflowMap[key][map].input], parseInt(workflowMap[key][map].compareTo));
      if (!workflowMap[key][map].input) {
        key = workflowMap[key][map].destination;
      } else if (workflowMap[key][map].operator === "<" && ratingMap[workflowMap[key][map].input] < parseInt(workflowMap[key][map].compareTo)) {
        key = workflowMap[key][map].destination;
        break;
      } else if (workflowMap[key][map].operator === ">" && ratingMap[workflowMap[key][map].input] > parseInt(workflowMap[key][map].compareTo)) {
        key = workflowMap[key][map].destination;
        break;
      }
    }
    if (key === "A") {
      for (let rate in ratingMap) {
        total += ratingMap[rate];
      }
      // console.log("total", total);
      finished = true;
      break;
    } else if (key === "R") {
      finished = true;
      break;
    }
  }
}

// let outputStr = '';
// for (let r = 0; r < grid.length; r++) {
//   outputStr += grid[r].join("") + "\n";
// }
// const outputFile = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'output' : 'input') + '.txt';
// let output = fs.writeFileSync(outputFile, outputStr, 'utf-8');

console.log("ANSWER", total);