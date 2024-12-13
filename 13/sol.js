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
let machs = input.split('\n\n');

for(let i = 0; i < machs.length; i++) {
    print('')
    print('')
    print('')
    let raw = machs[i].split('\n');
    print(raw);
    let a =[];
    let b =[];
    let p =[];

    a.push(+raw[0].slice(raw[0].indexOf('X+')+2,raw[0].indexOf(',')));
    a.push(+raw[0].slice(raw[0].indexOf('Y+')+2));
    b.push(+raw[1].slice(raw[1].indexOf('X+')+2,raw[1].indexOf(',')));
    b.push(+raw[1].slice(raw[1].indexOf('Y+')+2));
    p.push(+raw[2].slice(raw[2].indexOf('X=')+2,raw[2].indexOf(',')));
    p.push(+raw[2].slice(raw[2].indexOf('Y=')+2));
    p[0] += 10000000000000
    p[1] += 10000000000000

    print(a);
    print(b);
    print(p);

    // we need discriminant
    // first sovle for b steps

    let numer = p[1]-(a[1]*p[0])/a[0]
    let denom = b[1]-(a[1]*b[0])/a[0]
    print(numer)
    print(denom)

    let bSteps = Math.round(numer/denom);

    let aSteps = Math.round((p[1]-b[1]*bSteps)/a[1]);
    print(bSteps);
    print(aSteps);

    // careful check
    let x = a[0]*aSteps + b[0]*bSteps;
    let y = a[1]*aSteps + b[1]*bSteps;
    print(x);
    print(y)
    if (x !== p[0] || y !== p[1])
        print('impossible')
    else
        res += aSteps*3 + bSteps;


}

//lines.pop()

for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for(let j = 0; j < line.length; j++) {



    }
}

print('')
p(res);

