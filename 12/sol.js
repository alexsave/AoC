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

let res = 0;

let lines = input.split('\n');
lines.pop();


let regions = {}

let curScan = [];
let searched = []
let scans = []

let curCircum = 0;

let curEdge = []

let exits = []// for lack of better term


const flood = (a,b, val) => {
    try {
        if (lines[a][b] !== val){// this is circum!!!
            curCircum += 1
            return;
        }
        let scanKey = a*lines[0].length+b;
        if (curScan.includes(scanKey))
            return;
    
        curScan.push(scanKey);
        searched.push(scanKey);
    
        flood(a+1, b, val);
        flood(a-1, b, val);
        flood(a, b+1, val);
        flood(a, b-1, val);
    } catch(e){
        // thi sis also circum, if we go out of bounds
        curCircum += 1;
    }

}

for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for(let j = 0; j < line.length; j++) {
        let scanKey = i*lines[0].length+j;
        if (searched.includes(scanKey))
            continue;
        let val = line[j];
        if (!(val in regions))
            regions[val] = []
        //
        //regions[val].push([i,j])
        //
        //flood to find entire region


        curScan = []
        curCircum = 0;
        flood(i,j,val);
        scans.push({val, scan:curScan, circum: curCircum, area: curScan.length})


        //print(val);
        //print(curScan);
        //print(curScan.length);
        //print('');


    }
}
print(scans);

// how to get circumference???


for (let k of Object.values(scans)){
    print(k);
    res += k.circum*k.area;
}

p(res);

