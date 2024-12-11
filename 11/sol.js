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

let startTime = performance.now();

let row = lines[0].split(' ').map(x=>+x);

// swtich this to 41 when you're ready
for (let i = 0; i < 40; i++){
    print(i);
    print(row);
    let next = []


    for(let j = 0; j < row.length; j++) {
        //print(row[j]);
        if (row[j] === 0){
            next.push(1);
        } else {
            let len = Math.floor(Math.log10(row[j]))+1;


            if (len %2===0){
                const n = 10**(len/2);
                next.push(row[j]/n|0)
                next.push(row[j]%n);
            } else {
                next.push(row[j]*2024)
            }

        }
    }

    row = next;
}

const sim = (start, n) => {
    let row = [start];
    for(let i = 0; i < n; i++){
        let next = [];
        for (let j = 0; j < row.length; j++){
            let rj = row[j];
            if (row[j] === 0){
                next.push(1);
            } else {
                let len = Math.floor(Math.log10(rj))+1;


                if (len %2===0){
                    const n = 10**(len/2);
                    next.push(rj/n|0)
                    next.push(rj%n);
                } else {
                    next.push(rj*2024)
                }
            }
        }
        row = next;
    }

    return row;
}

// ok at this point, row is a list of something crazy. We can't add a single one more
// But we just need to simulate +25 for each of it's elements. lets do it
//
//

const cached35 = {}
const cached15 = {}

const sim35 = n => {
    //let row = [n];
    let row2 = sim(n, 20);
    let sum = 0;
    for (let k of row2){
        if (!(k in cached15)){
            print('\tcaclculating sim15 for ' + k);
            cached15[k] = sim(k, 15).length;
        }
        sum += cached15[k];
    }
    return sum;
}

for (let i of row){
    if (!(i in cached35)){
        print('caclculating sim35 for ' + i);
        // simulate 35
        //cached25[i] = sim(i, 35);
        // by going 0->5, then to 20, then sim(15)
        //
        cached35[i] = sim35(i);
        
    }
    //} else {
    res += cached35[i];
}

p(res);

// Some code to measure the execution time of...

let endTime = performance.now();
let elapsedTime = endTime - startTime; // Time in milliseconds
console.log(`Elapsed time: ${elapsedTime}ms`);
