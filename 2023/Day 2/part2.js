const day = 2;
const use_example = true;

const filename = 'Advent-of-code/2023/Day ' + day + '/' + (use_example ? 'example' : 'input') + '.txt';
const fs = require('fs');
let og_input = fs.readFileSync(filename, 'utf-8');
let input_array = og_input.split('\n');

// PART 2
let sum = 0;
for (let i = 0; i < input_array.length; i++) {
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;
  let gameStuff = input_array[i].split(": ");
  let game = gameStuff[1];
  let draw = game.split("; ");
  for (let j = 0; j < draw.length; j++) {
    let color = draw[j].split(", ");
    for (let k = 0; k < color.length; k++) {
      let rgb = color[k];
      if (rgb.indexOf('red') != -1) {
        rgb = rgb.replace(' red', '');
        rgb = parseInt(rgb);
        if (rgb > maxRed) {
          maxRed = rgb;
        }
      } else if (rgb.indexOf('green') != -1) {
        rgb = rgb.replace(' green', '');
        rgb = parseInt(rgb);
        if (rgb > maxGreen) {
          maxGreen = rgb;
        }
      } else if (rgb.indexOf('blue') != -1) {
        rgb = rgb.replace(' blue', '');
        rgb = parseInt(rgb);
        if (rgb > maxBlue) {
          maxBlue = rgb;
        }
      }
    }
  }
  sum += maxRed * maxGreen * maxBlue;
}

console.log("ANSWER", sum);