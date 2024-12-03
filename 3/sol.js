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
// [].length and '123'.length for length
// +x converts '32' to 32
// Good luck!
const { setup, p } = require('../setup');
print = p;

const input = setup();

if (!input) {
    p('No input file found or setup failed.');
    process.exit(1);
}

let res = 0;
const lines = input.trim().split`\n`;

lines.forEach(line => {
    const nums = line.split(/\s+/);
    for (let i = 0; i < nums.length; i++) {
        const n = nums[i];





    }
});


//print(input)
    enabled = true;
for (let i = 0; i < input.length; i++){

    a=0
    found = false;
    if (input.substring(i, i+4) === 'mul(') {
        j=i
        while(input[j]!=')') {
            if (input[j] == ',') {
                found = j;
                a = input.substring(i+4,j)
                //print(a)
            }


                //j//jfou
            //jk = +input[j]
//j
            //jif (typeof k === 'number')
                //jprint(input.substring(i,j))
            //j//if (+input[j])
            //j
            j++;
        }
        b = input.substring(found+1, j)
        //print(b)

        a = +a
        b = +b
        //print(a + ' ' + b)
        if (!isNaN(res + a*b)){
            if (enabled)  {
                res += a*b
            }
            //print(input.substring(i, i+15))
        }

        if (a !== NaN && b !== NaN) {
        }
        print(res)
    } else if (input.substring(i, i+4) === 'do()') {
        print(input.substring(i,i+8))
        enabled = true;
    } else if (input.substring(i, i+7) === 'don\'t()') {
        print(input.substring(i,i+8))
        enabled = false;
    } 

           //print(input.substring(i, i+20))

}

p(res);
