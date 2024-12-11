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

//lines.pop()

for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for(let j = 0; j < line.length; j++) {



    }
}

let row = lines[0].split(' ').map(x=>+x);

let max = 111010774;



//let struct = [row]
const addToStruct = (n, struct) => {
    let last = struct[struct.length-1];
    if (last.length >= max){
        struct.push([]);
        last = struct[struct.length-1];
    }

    last.push(n);
}

const getFromStruct = (i, struct) => {
    let arr = struct[(i/max)|0];
    return arr[i%max]
}

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

const cached15 = {}
for (let i of row){
    if (!(i in cached25)){
        print(i);
        // simulate 25
        cached25[i] = sim(i, 35);
    }
    //} else {
    res += cached25[i];
}

/*for(let i = row.length-1; i>=0; i--){
    let num = row[i];

    print(i);
    if(!(num in cached25)){
        cached25[i] = sim(i, 35);
    }
    res += cached25[i];

}*/


// first, just run it on all numbers for 15
//
/*let at5 = [];
for (let i of row){
    print(i);
    let arr = sim(i, 5);
    //cached15[i] = arr.length;
    at5.push(...arr);
}
print(at5);
// now we have 7 numbers in cache

let at30=[];
for (let i of at15){
    if (!(i in cached15){
        print(i);
        let arr = sim(i, 15);
        cached15[i] = arr.length;
        at30.push(...arr);
    } else {
        at30.push({is:cached15[i]}
    }
}*/
// now we have 7 numbers in cache







//print(row.length);


p(res);

