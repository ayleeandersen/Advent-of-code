const day = 7;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

// PART 2
// WRONG ANSWERS: 253418929 (too low), 252403725 (too low), 253926070 (too high)
// Correct answer: 253630098
let total = 0;
let cardMap = { "A": 14, "K": 13, "Q": 12, "T": 10, "9": 9, "8": 8, "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2, "J": 1 };
let hands = [];
for (let i = 0; i < input_array.length; i++) {
  let row = input_array[i].split(" ");
  let hand = row[0];
  let bid = parseInt(row[1]);
  let handObj = {
    type: 0,
    hand: hand,
    bid: bid,
    score: 0
  }
  
  let cardCount = { "A": 0, "K": 0, "Q": 0, "T": 0, "9": 0, "8": 0, "7": 0, "6": 0, "5": 0, "4": 0, "3": 0, "2": 0, "J": 0 };
  for (let j = 0; j < hand.length; j++) {
    let card = hand[j];
    cardCount[card]++;
  }
  let maxCard = '';
  let maxCardCount = 0;
  for (let card in cardCount) {
    if (cardCount[card] >= maxCardCount && card !== "J") {
      maxCard = card;
      maxCardCount = cardCount[card];
    }
  }
  if (cardCount["J"] > 0) {
    cardCount[maxCard] += cardCount["J"];
    cardCount["J"] = 0;
  }
  for (let card in cardCount) {
    let values = Object.values(cardCount);
    if (cardCount[card] === 5) {
      handObj.type = 7;
    } else if (cardCount[card] === 4) {
      handObj.type = 6;
    } else if (cardCount[card] === 3 && values.indexOf(2) !== -1) {
      handObj.type = 5;
    } else if (cardCount[card] === 3) {
      handObj.type = 4;
    } else if (values.filter(count => count === 2).length === 2) {
      handObj.type = 3;
    } else if (cardCount[card] === 2 && values.indexOf(3) === -1) {
      handObj.type = 2;
    } else if (Object.values(cardCount).filter(count => count > 1).length === 0) {
      handObj.type = 1;
    }
  }

  hands.push(handObj);
}

hands.sort((handA, handB) => {
  if (handA.type > handB.type) {
    return 1;
  } else if (handA.type < handB.type) {  
    return -1;
  }

  for (let c = 0; c < 5; c++) {
    if (cardMap[handA.hand[c]] < cardMap[handB.hand[c]]) { 
      return -1;
    } else if (cardMap[handA.hand[c]] > cardMap[handB.hand[c]]) {
      return 1
    }
  }
  return 0;
});

// console.log("HANDS", hands);

for (let h = 1; h < hands.length + 1; h++) {
  total += hands[h-1].bid * h;
}

console.log("ANSWER", total);