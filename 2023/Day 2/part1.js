const day = 2;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

// PART 1
let maxRed = 12;
let maxGreen = 13;
let maxBlue = 14;
let maxTotal = maxRed + maxGreen + maxBlue;
let sum = 0;
for (let i = 0; i < input_array.length; i++) {
  let impossible = false;
  let gameStuff = input_array[i].split(": ");
  let game = gameStuff[1];
  console.log("GAME", gameStuff);
  let draw = game.split("; ");
  console.log("DRAW", draw);
  for (let j = 0; j < draw.length; j++) {
    let color = draw[j].split(", ");
    for (let k = 0; k < color.length; k++) {
      let rgb = color[k];
      if (rgb.indexOf('red') != -1) {
        rgb = rgb.replace(' red', '');
        rgb = parseInt(rgb);
        console.log("RED", rgb);
        if (rgb > maxRed) {
          impossible = true;
          break;
        }
      } else if (rgb.indexOf('green') != -1) {
        rgb = rgb.replace(' green', '');
        rgb = parseInt(rgb);
        console.log("GREEN", rgb);
        if (rgb > maxGreen) {
          impossible = true;
          break;
        }
      } else if (rgb.indexOf('blue') != -1) {
        rgb = rgb.replace(' blue', '');
        rgb = parseInt(rgb);
        console.log("BLUE", rgb);
        if (rgb > maxBlue) {
          impossible = true;
          break;
        }
      }
    }
  }
  if (!impossible) {
    let id = gameStuff[0].replace('Game ', '');
    id = id.replace(': ', '');
    sum += parseInt(id);
  }
}

console.log("ANSWER", sum);