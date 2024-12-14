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

lines.pop()

let robots = {}
let arr = []

let h = 103;
let w = 101;

let yMid = (h-1)/2;
let xMid = (w-1)/2;

let nw = sw = ne = se = 0



for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    print(line);

    let P = line.slice(line.indexOf('p=')+2, line.indexOf(' ')).split(',').map(x=>+x);
    print(P);
    let V = line.slice(line.indexOf('v=')+2).split(',').map(x=>+x);
    print(V);


    let x = ((P[0]+V[0]*100)%w+w)%w;
    let y = ((P[1]+V[1]*100)%h+h)%h;

    //simulate 100 s
    robots[''+i] = [y,x];
    arr.push({P,V})

    if (y < yMid && x < xMid)
        nw++;
    else if (y > yMid && x < xMid)
        sw++;
    else if (y < yMid && x > xMid)
        ne++;
    else if (y > yMid && x > xMid)
        se++;


    //arr.push([x,y])
}

//print(grid)
//print(grid.map(x=>x.join('')).join('\n'))
for (let i = 1; i < 10000; i++){
    //print('');
    //print(i);

    let row = [];
        for (let j = 0; j < w; j++){
        row.push('.');
    }

    let clone = [];
    for (let j = 0; j < h; j++){
        clone.push(' '.repeat(w).split(''))
    }


    arr = arr.map(x => {
        let X = ((x.P[0]+x.V[0])%w+w)%w;
        let Y = ((x.P[1]+x.V[1])%h+h)%h;
        //print(x);
        //print(x.P);
        let P = [X,Y]

        return {P:P, V: x.V};

    });


    //print(clone[20].length);
    for(let j = 0; j < arr.length; j++){
        //print(clone[20])
        //print(arr[j].P[1])
        clone[+arr[j].P[1]][+arr[j].P[0]] = '*'
    }

    if (i%101 === 22) {
        print('')
        print(i)
        print(clone.map(x=>x.join('')).join('\n'));
    }
    

}

res = nw*sw*ne*se;

p(res);

