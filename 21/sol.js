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

// ok wtf
let keyPad = [
    [7,8,9],
    [4,5,6],
    [1,2,3],
    ['X',0,'A'],
];

let dirPad = [
    ['X','^','A'],
    ['<','v','>']
]

let startX = 2;
let startY = 3;

const keyPadCo = n => {
    n = n==='A'||n==='X'?n:+n;
    for (let i = 0; i < keyPad.length;i++) {
        let f = keyPad[i].indexOf(n);
        if (f !== -1)
            return [f, i];
    }

}

const dirPadCo = n => {
    for (let i = 0; i < dirPad.length; i++) {
        let f = dirPad[i].indexOf(n);
        if (f !== -1)
            return [f, i];
    }
}

// compeltely restart
const diagCache = {};

const diag = (a,b,level) => {
    let board = '';
    let find = null;

    if (level === 0) {
        board = 'k';
        find = keyPadCo;
        // keypad
    } else {
        //dir
        board = 'd';
        find = dirPadCo;
    }

    const diagKey = [a,b,board].join(',');

    if(diagKey in diagCache)
        return diagCache[diagKey];

    if (a === 'S')
        a = 'A';


    let [startX, startY] = find(a);
    let [targetX, targetY] = find(b);
    let [noX, noY] = find('X');

    let dX = targetX - startX;
    let dY = targetY - startY;

    let path = [];
    if (a === b/*dX === 0 && dY === 0*/){
        // no move, same token
        path = [''];
    } else if (dX === 0){
        path = [((dY<0? '^':'v').repeat(Math.abs(dY)))];
    } else if (dY === 0) {
        path = [((dX<0? '<':'>').repeat(Math.abs(dX)))];
    } else {
        //both non0

        // try X then Y path first
        let runX = startX;
        let runY = startY;

        let xyBad = false;
        let xyPath = '';

        for (let i = 0; i < Math.abs(dX); i++){
            runX += dX < 0? -1 : 1;
            xyPath += dX < 0? '<' : '>';
            if (runX === noX && runY === noY){
                xyBad = true;
            }
        }
        for (let i = 0; i < Math.abs(dY); i++){
            runY += dY < 0? -1 : 1;
            xyPath += dY < 0? '^' : 'v';
            if (runX === noX && runY === noY){
                xyBad = true;
            }
        }

        if (!xyBad)
            path.push(xyPath);


        runX = startX;
        runY = startY;

        let yxBad = false;
        let yxPath = '';

        for (let i = 0; i < Math.abs(dY); i++){
            runY += dY < 0? -1 : 1;
            yxPath += dY < 0? '^' : 'v';
            if (runX === noX && runY === noY){
                yxBad = true;
            }
        }
        for (let i = 0; i < Math.abs(dX); i++){
            runX += dX < 0? -1 : 1;
            yxPath += dX < 0? '<' : '>';
            if (runX === noX && runY === noY){
                yxBad = true;
            }
        }
        if (!yxBad)
            path.push(yxPath);
    }
    
    diagCache[diagKey] = path;
    return path;
}

const cache = {};
let ops = 0;

const recurse = (seq, level) => {
    const key = [seq,level].join(',');
    if(key in cache)
        return cache[key];
    ops++;
    print(' '.repeat(level) + seq);
    // small for now
    if (level == 1+25)
        return seq.replace('S','').length;

    let sum = 0;
    for (let i = 0; i < seq.length-1; i++){
        const [a,b] = seq.slice(i,i+2);
        // it's weird but we need the 'S' at the start to get the right answ
        //
        let opts = diag(a,b,level);
        
        if (opts.length === 1){
            // pretty simple
            sseq = ('S') + (opts[0]) + ('A');
            sum += recurse(sseq, level +1);
        } else {
            // compare both. Luckily we don't need to do this more than once, and cache it
            if (opts.length !== 2)
                print("WTF");
            let sseq0 = ('S') + (opts[0]) + ('A');
            let sseq1 = ('S') + (opts[1]) + ('A');
            // please don't be too slow
            let score0 = recurse(sseq0, level+1);
            let score1 = recurse(sseq1, level+1);
            sum += Math.min(score0, score1);
        }

    }

    print(' '.repeat(level) + seq + ' ' + sum);
    cache[key] = sum;
    return sum;

}

for(let i = 0; i < lines.length; i++){
    let line = lines[i];

    let shortest = recurse('S'+line, 0);
    print(line);
    print(shortest);

    res += +(line.replace('A',''))*shortest;
    print(ops);
}


// ah this so clean but not quite
// we're missing somethign
// 836A correct is <vA<AA>>^AvA<^A>AAAvA^A<v<A>A>^AAvA^A<A>A<v<A>>^AvA^A<v<A>A>^AAvA<^A>A (70)
// 836A this has len 74
//
// 540A correct is <vA<AA>>^AvA<^A>AAvA^A<vA<AA>>^AvAA<^A>A<vA>^A<v<A>>^AAvA<^A>A<vA>^A<A>A (72)
// 540A this has len 72
//
// 965A correct is <v<A>>^AAAvA^A<v<A>A>^AvA<^A>A<vA<AA>>^AvAA<^A>A<v<A>A>^AAvA^A<A>A (66)
// 965A this has len 70
//
// 480A correct is <v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<v<A>^A>AvA^A<v<A>A>^AAAvA<^A>A<vA>^A<A>A (74)
// 480A this has len 74
// 789A correct is <v<A>>^AAA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAAvA<^A>A (66)
// 789A this has len 66

// diving into 836A
// getting from S to 8 is identical
// 8 to 3 is actually different. 22 vs 18
// 3 to 6 matches 
// 6 to A matches 
//
// let's look at 8 to 3
// if we swap priortiy of xyPath with yXPath, that does fix 8 to 3 but makes another correspondingly longer
// on level 1, we do  >vvA, they do vv>A
// interestingly, they did <v< on the highest level, but it didn't really affect anything over v<<
// how is taht possible? it's the highestlevel so distances are the same. dont' worry
// the real trick is that we need to TEST xyPath and yxPath
// FUCK


print(res);

