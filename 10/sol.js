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

// no assumptions this time
let res = 0;

let lines = input.split('\n');
lines.pop();

const safe = (a,b) => {
    try {
        return +(lines[a][b]);
    }catch(e){return -1;}
}

let nineshit = new Set();

const recurs = (curi, curj, tar) => {
    const next = safe(curi, curj)
    if (next !== tar)
        return 0;
    //if (safe(cur
        //return 0
    //print([curi, curj, tar, safe(curi, curj)])
    if (safe(curi, curj) === -1) {
        return 0;
    }else if (safe(curi, curj) === 9) {
        nineshit.add(curi*lines[0].length+curj);
        //print(curi+lines[0].length+curj)
        return 1;
        /*print(nineshit);
        if (nineshit.indexOf(curi*lines[0].length+curj) !== -1){
            return 0;
        } else {
            return 1;
        }*/
    }else {
        return recurs(curi+1, curj, tar+1) + 
            recurs(curi-1, curj, tar+1) + 
            recurs(curi, curj+1, tar+1) + 
            recurs(curi, curj-1, tar+1)
    }
}

for (let i = 0; i < lines.length;i++){
    let line = [...lines[i]].map(x=>+x);
    for (let j = 0; j < line.length;j++){
        if (line[j] === 0){
            nineshit=new Set();

            let curI = i;
            let curJ = j;

            let x = recurs(i, j, 0);
            print([i,j,x, nineshit.size])
            res += x

            /*while(lines[curI][curJ] != 9){
                const tar = lines[curI][curJ]+1

                    if (safe(lines[curI+1][curJ]) === tar) {
                    }

                safe(lines[curI-1][curJ]),
                    safe(lines[curI][curJ+1]),
                    safe(lines[curI][curJ-1])]




            }*/

        }
    }
}


p(res);

