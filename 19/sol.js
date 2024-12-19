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

let colors = lines[0].split(', ');
print(colors);

//lines.pop()
let patterns = lines.slice(2);
print(patterns);

let cache = {'':1};

const recurs = req => {
    if (req in cache)
        return cache[req];
    print(req);
    //if (req === '')
        //return true;
    let found = 0;
    for (let j = 0; j < colors.length;j++){
        let c = colors[j];
        if (req.startsWith(c)) {
            let res = recurs(req.slice(c.length));
            if(res)
                found += res;
        }
    }
    
    cache[req] = found;

    return found;
};

/*let cache = {'':true};

const recurs = req => {
    if (req in cache)
        return cache[req];
    print(req);
    //if (req === '')
        //return true;
    let found = false;
    for (let j = 0; j < colors.length;j++){
        let c = colors[j];
        if (req.startsWith(c)) {
            let res = recurs(req.slice(c.length));
            if(res)
                found = true;
        }
    }
    
    cache[req] = found;

    return found;
};*/


for(let i = 0; i < patterns.length; i++) {
    let pattern = patterns[i];
    print(pattern);
    let x = recurs(pattern);
    if (x){
        print('found');
        res += x;
    }


}

p(res);

