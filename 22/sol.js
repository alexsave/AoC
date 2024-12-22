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

let res = 0n;

let lines = input.split('\n');

lines.pop();

let prices = [
    
]
let changes = [
]




for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let start = BigInt(+line);
    print(start);

    let last = start%10n;

    prices.push([Number(last)]);
    changes.push([0]);


    for(let j = 0; j < 2000; j++) {
        let m = start * 64n;
        start = start ^ m;
        start = start % 16777216n;

        let r = (start/32n)|0n;
        start = start ^ r;
        start = start % 16777216n;

        let t = start * 2048n;
        start = start ^ t;
        start = start % 16777216n;

        let cur = start%10n;
        let diff = cur-last;
        prices[i].push(Number(cur))
        changes[i].push(Number(diff))
        //print(cur-last);

        last = cur;

    }
    //res+=start;
    //print(start);
}


for (let j = 0; j < changes.length; j++){
    //print(prices[j].join(' '));
    //print(changes[j].join(' '));
    //print('')
}

const simulate = (arr) => {
    let sum = 0;
    for (let j = 0; j < changes.length; j++){
        for (let i = 0; i < changes[j].length-1; i++){
            if (
                    changes[j][i] === arr[0] &&
                    changes[j][i+1] === arr[1] &&
                    changes[j][i+2] === arr[2] &&
                    changes[j][i+3] === arr[3]){
                sum += prices[j][i+3]//dump it
                break;
             }
            
        }
    }
    return sum;
}

//let opts = [];
// dumb? yes
let max = 1935;
for (let a = -1; a <= 9; a++){
for (let b = -9; b <= 9; b++){
    print(a + ' ' + b);
for (let c = -9; c <= 9; c++){
for (let d = -9; d <= 9; d++){

    // we can probably skip a few combos
    del = a+b;
    if (del > 9 || del < -9)
        continue;
    del = a+b+c;
    if (del > 9 || del < -9)
        continue;
    del = a+b+c+d;
    if (del > 9 || del < -9)
        continue;
    del = b+c;
    if (del > 9 || del < -9)
        continue;
    del = b+c+d;
    if (del > 9 || del < -9)
        continue;
    del = c+d;
    if (del > 9 || del < -9)
        continue;

    let ar = [a,b,c,d];
    let score = simulate(ar);
    if (score > max){
        print(ar.join(',') + ' ' + score);
        max = score;
    }
}
}
}
}
// only 100K possibilities, not bad
//print(opts.length);

res = max;
p(res);

