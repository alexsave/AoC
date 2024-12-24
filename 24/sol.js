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

let start = {};
input.split('\n\n')[0].split('\n').map(x =>{
    let [k,s] = x.split(': ');
    start[k] = +s;
});
print(start);

let conns = {};
let tree = {};
input.split('\n\n')[1].split('\n').map(x =>{
    let [a, op, b, _, c] = x.split(' ');
    if (op)
        conns[c] = {input: [a,b], op: op};
});

print(conns);
// binary tree, right?
//

//analyze levels that things appear at?
const level = {}
// yeah but i think we can just go through keys and figure it out
const recus = (k,l) => {
    if (!(k in level))
        level[k] = [];
    level[k].push(l);
    if (k in start)
        return start[k];

    let o = conns[k];
    if (o.val)
        return o.val;

    let a = recus(o.input[0],l+1);
    //print('\t'.repeat(l)+o.input[0]+':'+a);
    let b = recus(o.input[1],l+1);
    //print('\t'.repeat(l)+o.input[1]+':'+b);

    let v = -1;
    if (o.op === 'AND')
        v = a & b;
    else if (o.op === 'OR')
        v = a | b;
    else if (o.op === 'XOR')
        v = a ^ b;

    o.val = v;
    return v;
}

const getList = c => {
    let one = Object.keys(conns).filter(x=>x[0]===c);
    if (one.length === 0)
        one = Object.keys(start).filter(x=>x[0]===c);
    one.sort();
    one.reverse();
    return one
}

const toNum = c => {
    let one = getList(c);
    let r = BigInt(0);
    for (let i of one){
        let v = recus(i,0);
        r *= 2n;
        r += BigInt(v);
    }
    return r
}
let z = toNum('z');

const inf = k => {
    return ((k in conns)?(JSON.stringify({i:conns[k].input, x:conns[k].op})):''/*start[k]*/);
}
let b = Object.keys(level);
b.sort();
for (x of b)
    print(x + ': '+ level[x] + ' ' + ((x in conns)?(JSON.stringify(conns[x])):start[x]));


for (let i = 0; i < 89; i++){
    let line = [];
    for (let j = 0; j < b.length; j++){
        if (level[b[j]].includes(i))
            line.push(b[j] + inf([b[j]]));
    }
    
    print([i, line.join(' ')]);

}

//let x = toNum('x');
//let y = toNum('y');
//print((x+y).toString(2));
//print(z.toString(2));
//print('000'+((x+y)^z).toString(2));


// ok I thnink if we can visualize the  structure we can compare it
print(Object.keys(conns).length);

//lets start with final outputs?
//
let Z = getList('z');
for (let i = 0; i < Z.length; i++){
    let obj = conns[Z[i]];
    /*print(obj.input[0]);
    print(obj.op+'\t'+Z[i]);
    print(obj.input[1]);
    print('');*/
}

// at level 80, you have ccq, rhr, x05,y05. x05 is not on any other elvel
// at level 48, you're also missing usages of maybe x21
// x89 and y39 appear about of place at level 7


p(res);


/*
 * findings
 *
 * there is probbable a long chain
 *
 **/ 
