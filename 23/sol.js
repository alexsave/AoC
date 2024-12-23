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

let map = {};

for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let [a,b] = line.split('-');

    if (!(a in map))
        map[a] = [];
    if (!(b in map))
        map[b] = [];
    map[a].push(b);
    map[b].push(a);

}

//looking at the connections, it seems each lsit is connected to 13 other computers
/// that means teh largest hub could only be 13
// lets look for groups of 13
//

//sorted
let keys = Object.keys(map);
for (let k of keys){
    let j = map[k];
    j.sort();
    map[k] = j;
}

let size = 14;
// ok so size 13 doesn't work



let set3 = new Set();

// so we know that kh connects to 'tc','qp','ub','ta'
// if any of these connect to each other, that's a three
print(map);
Object.keys(map).map(k=>{
    let con = map[k];
    let a = k;
    //print('');
    //print(k);
    //print(con);
    for(let i = 0; i < con.length;i++){
        for(let j = i+1; j < con.length;j++){
            let b = con[i];
            let c = con[j];
            //ab and ac are solved
            //bc?
            if (map[b].includes(c)){
                let key = [a,b,c];
                //if (a[0]==='t'||b[0]==='t'||c[0]==='t'){
                    //doesn't matter, just needs to be consistent
                key.sort();
                key = key.join(',');
                //print(key);
                set3.add(key);
                //}
            }
        }
    }
});

print([...set3]);
/*
*/
res = [...set3].length;

let list = [...set3];
p(res);

let largestSize = 0;
let largestGroup = [];

for (let k of keys) {


    // let's build
    //   wh: [ 'fo', 'fs', 'gg', 'in', 'pg', 'rm', 'tg', 'tn', 'ui', 'wz', 'xh', 'yl', 'zy' ]
    //   wh is connected to all of these. think of them in a circle, with spokes from wh to all

    // now we check connectivity with the 3s

    // let's start small kh: [ 'qp', 'ta', 'tc', 'ub' ],

    let scores = {}

    let others = map[k];
    let hiScore = 0;
    print(k);
    for(let i = 0; i < others.length;i++){
        let oKey = others[i];
        let score = 1;

        for(let j = 0; j < others.length;j++){
            let ooKey = others[j];
            if (map[oKey].includes(ooKey)){
                //print(oKey + ' is connected to ' + ooKey);
                score++;
            }
        }
        scores[oKey] = score;
        //if (score > 0)
            //print(oKey+ ' score is ' + score);
        if (hiScore < score)
            hiScore = score;
    }
    // what you expect to see is exactly hiScore number of other with score hiScore (1,22,333,etc)

    let osWithHi = 0
    for(let i in scores){
        if (scores[i] === hiScore){
            osWithHi++;
        }
    }

    if (osWithHi === hiScore){
        if (hiScore > largestSize){
            largestSize = hiScore;
            largestGroup = [k];
            for(let i in scores){
                if (scores[i] === hiScore){
                    largestGroup.push(i);

                    print(i + ' has hi score ' + hiScore);
                }
            }
            largestGroup.sort();
        }
    }

    print('');
}

print(largestSize);
print(largestGroup);
print(largestGroup.join(','));

