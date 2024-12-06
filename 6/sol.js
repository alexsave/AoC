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

let lines = input.split('\n').map(x=>x.split(''))
lines.pop()
//print(lines);
let ogx = 0;
let ogy = 0;
for(let i = 0; i < lines.length;i++){
    if (lines[i].indexOf('^') !== -1){
        ogy = i;
        ogx = lines[i].indexOf('^');
    }

}




// now detects loops
const check = (grid) => {
    let x = ogx;
    let y = ogy;
let dx = 0
let dy = -1

let count = 0;
while(count < lines.length*lines[0].length){
    count++;
    try{

        x += dx, y+= dy
        let next = grid[y][x];
        if (next === undefined) 
            return false;
        //print(grid.map(x=>x.join('')).join('\n'));
        //print(' ');
        if (next === '#'){
            x -= dx, y-= dy
            // rotate 90
            lastdx = dx;
            dx = -dy;
            dy = lastdx;
            //print([dx,dy])
            grid[y][x] = '+'
        } else if (next === '^' || next == '1' ) {
            if (dy === -1)
                return true;
        } else if (next === '>'){
            if (dx === 1)
                return true;
        } else if (next === '<'){
            if (dx === -1)
                return true;
        } else if (next === '|'){
            if (dy === 1)
                return true;
        
        /*} else if (next === '-' ) {
            // travelling along same path == iniflite lops, brteak
            if (dx !== 0)
                return true;

        } else if (next === '^' ||next === '|' ) {
            if (dy !== 0)
                return true;*/
        } else if (next === '.'){
            if (dx === -1)
                grid[y][x] = '<'
            else if (dx === 1)
                grid[y][x] = '>'
            else if (dy === 1)
                grid[y][x] = 'v'
            else if (dy === -1)
                grid[y][x] = '1'
            //res++;
        }
    } catch(e) {
        //lol
        return false;
    }




}
    return true;

}

for (let i = 0; i < lines.length; i++){
    for (let j = 0; j < lines[i].length;j++){
        if (i === ogy && j === ogx)// starting pos
            continue;
        copy = JSON.parse(JSON.stringify(lines))
        if (copy[i][j] === '#')//blocked
            continue;
        //if (i <ogy)// in sight?
            //continue
        copy[i][j] = '#';
        //print(copy), print(), print(lines)
        //print([i,j])
        if (check(copy)){

            res++;
        }
    }


}



p(res);

