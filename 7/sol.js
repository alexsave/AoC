// Relevant part

// Tips:
// array.sort() has no return value
// [3].contains(3)
// '3'.includes(3)
// Object.keys({}) => keys
// Object.values({}) => values
// Object.items({}) => array of arrays of size 2
// for (let i of [3]) => iterates over values
// for (let i in [3]) => iterates over indicies
// for (let i of {'hi':3}) => iterates over keys
// [].length for length
// +x converts '32' to 32
// NaN and isNaN() are things
// Good luck!
const { setup, p } = require('../setup');
const print = p;

// Run setup
const input = setup();

if (!input) {
    p('No input file found or setup failed.');
    process.exit(1);
}


const startTime = Date.now(); // Get start time in milliseconds

// no assumptions this time
let res = 0;

let lines = input.split('\n');
lines.pop()

for (let i = 0; i < lines.length;i++) {
  const spl = lines[i].split(':');
  const total = +(spl[0])
  const nums = spl[1].split(' ').slice(1).map(x=>+x)

  let pos = [nums[0]];
  for (let j = 1; j < nums.length; j++){
    pos = pos.map(x => 
        [
        x+nums[j],
        x*nums[j],
        +(x+''+nums[j])
      ]
      .filter(x=>x<=total)
    )
      .flat()
  }

  for (let j = 0; j < pos.length; j++){
    if (pos[j]===total){
      res += total;
      break;
    }
  }
}



print(res)




// Perform some operations

const endTime = Date.now(); // Get end time in milliseconds

const elapsedTime = endTime - startTime; // Elapsed time in milliseconds

console.log(`Elapsed time: ${elapsedTime} ms`);

