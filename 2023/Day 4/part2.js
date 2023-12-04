const day = 4;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

// PART 2
let sum = 0;
let cardCopies = {};
for (let i = 0; i < input_array.length; i++) {
  cardCopies[i+1] = 1;
}
for (let i = 0; i < input_array.length; i++) {
  let cardNum = i+1;
  // console.log("Card Num", cardNum);
  // console.log("Card Copies", cardCopies[cardNum]);
  let both = input_array[i].replace(/Card.*\: /g, "");
  let bothArr = both.split("|");
  let winningValues = bothArr[0].split(" ").filter(val => val.length > 0);
  // console.log("Winning values", winningValues);
  let yourValues = bothArr[1].split(" ").filter(val => val.length > 0);
  // console.log("Your values", yourValues);
  for (let z = 0; z < cardCopies[cardNum]; z++) {
    let matches = 0;
    for (let j = 0; j < yourValues.length; j++) {
      let yourValue = yourValues[j];
      if (winningValues.indexOf(yourValue) !== -1) {
        // console.log("Match!", yourValue);
        matches++;
      }
    }
    for (let k = 0; k < matches; k++) {
      cardCopies[cardNum+k+1] = cardCopies[cardNum+k+1] + 1;
      // console.log("Card Copies added", cardCopies);
    }
  }
}

for (let card in cardCopies) {
  sum += cardCopies[card];
}

console.log("ANSWER", sum);