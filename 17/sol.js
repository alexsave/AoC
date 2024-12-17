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


let lines = input.split('\n');

let [regs,prog] = input.split('\n\n');
regs = regs.split('\n');

//let rA = +regs[0].slice(12);
//let rB = +regs[1].slice(12);
//let rC = +regs[2].slice(12);



//print([rA,rB,rC])
//lines.pop()
//
prog = prog.split(' ')[1].split(',').map(x=>+x);
print(prog);
const expected = prog.join(',');

let initA = 51342988
//initA *= 8*8*8*8*8*8*8*8*8*8*8*8*8;
initA = 
3*(8**15) +
0*(8**14) +
4*(8**13) +
5*(8**12) +
1*(8**11) +
//==solved above
3*(8**10) + // 3 or 5
0*(8**9) + // 0 if 3, 1 if 5 above
1*(8**8) +
4*(8**7) +
0*(8**6) +
0*(8**5) +
0*(8**4) +
0*(8**3) +
0*(8**2) +
0*(8**1) +
0;

initA = 108107574778365;

count = 0;
//while(count < 1){
while(count < 8**7){
count++;
let res = [];
let rA = initA;
let rB = 0;
let rC = 0;

let i = 0;

while(i < prog.length){
    let op = prog[i];
    let lit = prog[i+1];
    let combo = lit<4?lit:[rA,rB,rC,null][lit-4];
    //print([rA, op, lit, combo])


    if (op === 0){
        //print(2**combo);
        //print(rA/(2**combo));
        //print(rA/(2**combo)|0);
        rA = Number(BigInt(Math.floor(rA/(2**combo)))|BigInt(0))
        //rA = rA/(2**combo)|0;
    } 
    if (op === 1)
        rB = rB^lit;
    if (op === 2)
        rB = combo%8;
    if (op === 3){
        if (rA !== 0){
            i = lit;
            continue;
        }
    }
    if (op === 4)
        rB = rB^rC;
    if (op === 5)
        res.push((8+combo%8)%8);
    if (op === 6)
        //rB = rA/(2**combo)|0;
        //rB = Number(BigInt(rA/(2**combo))|BigInt(0))
        rB = Number(BigInt(Math.floor(rA/(2**combo)))|BigInt(0))
    if (op === 7)
        rC = Number(BigInt(Math.floor(rA/(2**combo)))|BigInt(0))
        //rC = Number(BigInt(rA/(2**combo))|BigInt(0))
        //rC = rA/(2**combo)|0;


    i+=2;
}

//print([rA, rB, rC]);

p(res.join(','));

let actual = res.join(',');
print([initA, actual, expected]);
if (actual === expected){
    break;
    print('yay');
}
initA++;
}



