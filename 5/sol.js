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
const print = p

// Run setup
const input = setup();

if (!input) {
    p('No input file found or setup failed.');
    process.exit(1);
}

// no assumptions this time
let res = 0;

let lines = input.split('\n');

lines.pop()

let rules = []

let i = 0
for (; i < lines.length; i++){



    if (lines[i].indexOf('|')===-1)
        break;

    rules.push(lines[i].split('|').map(x=>+x))

}
//print(rules)
i++
for(;i < lines.length;i++){
    let l = lines[i].split(',').map(x=>+x);
    let valid = true;
    for (let j = 0; j < rules.length; j++){
        let r = rules[j];
            a = l.indexOf(r[0])
            b = l.indexOf(r[1])
        if(a >-1 && b>-1 && l.indexOf(r[0]) > l.indexOf(r[1])){
            //print(r[0] + ' ' + r[1] + ' ' + l.indexOf(r[0]) + '  ' + l.indexOf(r[1]))
            valid = false
        }
    }

    if (valid){
        //res += (+l[l.length/2|0])
    } else {


        //fix
        for (let k = 0; k < 2000; k++){

            changes = 0
        for (let j = 0; j < rules.length; j++){
            let r = rules[j];
            let a = l.indexOf(r[0])
            let b = l.indexOf(r[1])
            //if (a >-1 && b>-1){
        if(a >-1 && b>-1 && l.indexOf(r[0]) > l.indexOf(r[1])){
            changes++;
                print(l + ' ' + a + ' ' +  b + ' ' + r)
                // just swap?
                l[a] = r[1];
                l[b] = r[0];
                print(l +  ' ' +a + ' ' +  b + ' ' + r)
            }

        }
        if (changes ==0)
            break;
        }



        res += (+l[l.length/2|0])
    }

}






p(res);

