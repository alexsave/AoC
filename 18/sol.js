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




let end = 2902;

while(true){

let grid = [];
let row = [];
for (let i = 0 ; i < 71; i++)
    row.push('.');
for (let i = 0 ; i < 71; i++)
    grid.push([...row]);

let lineslice = lines.slice(0,end);

lineslice.map(x=>x.split(',').map(x=>+x)).forEach(co => {
        //print(grid[6][0]);
        grid[co[1]][co[0]] = '#';
});
print(grid.map(x=>x.join('')).join('\n'));
//print(grid);


let ex = ey = 70;
let sx = sy = 0;

let dist = {};

const toKey = (x,y) => {
    return x+','+y;
}

const fromKey = k => {
    let a =  k.split(',');
    a[0] = +a[0]
    a[1] = +a[1]
    return a;
}

for(let i = 0; i < grid.length; i++) {
    let line = grid[i];
    for(let j = 0; j < line.length; j++) {
        key = i*line.length+j;

        if (line[j] !== '#')
            dist[toKey(j,i)] = {total:1e11, prev:[]};
            //['n','s','e','w'].forEach(x=>dist[j+','+i+','+x] = {total: 1e11, prev: []})
        //if (line[j] === 'E'){
            //ex = j;
            //ey = i;
        //} else if (line[j] === 'S'){
            //sx = j;
            //sy = i;
            ////['n','s','e','w'].forEach(x=>dist[j+','+i+','+x] = {total: 1e11, prev: null})
        //} else if (line[j] === '.'){
            //// inf
            //// x,y,dir
            ////['n','s','e','w'].forEach(x=>dist[j+','+i+','+x] = {total: 1e11, prev: null})
        //}
    }
}
print(Object.keys(dist).length);

dist[toKey(sx, sy)] = {total: 0, prev: []};
//print(grid);
//
//print([ex, ey, sx, sy]);
//print(dist);

let visited = new Set();

let ent = Object.entries(dist).filter(x=>!visited.has(x[0]))
let i = 0;
while(ent.length !== 0/*i<4*/) {
    //print('')
    // choose node with lowest val
    let small = ent.sort((a,b) => a[1].total-b[1].total)[0];

    let curTotal = small[1].total;
    let key = small[0];
    if (ent.length % 100 === 0) 
        print(ent.length + ' ' + key);
    let [x,y] = fromKey(key);
    visited.add(small[0]);
    // get all neighbors (3)
    // we can always rotate

    let v = [];

    let arr = [
        [0, -1],
        [0, 1],
        [1, 0],
        [-1, 0]
    ];
    for (let b = 0; b < arr.length;b++){
        let v = arr[b];


        const moveKey = toKey(x+v[0], y+v[1]);

        if (moveKey in dist){
            if (dist[moveKey].total > 1 + curTotal) {
                dist[moveKey].total = 1 + curTotal;
                dist[moveKey].prev = [key];
            } else if (dist[moveKey].total === 1 + curTotal) {
                dist[moveKey].prev.push(key);
            }
            // can move
        }

    }
    //print(moveKey)
    //print(dist[moveKey])




    i++;
    ent = Object.entries(dist).filter(x=>!visited.has(x[0]))
}

// work backwards
let bestK = ''
let bestS = 1e11;

let k = toKey(ex,ey);
print(k);
print(dist[k]);
print([end, lineslice[end-1]]);

if (dist[k].total === 1e11){
    break;
}

end++;

}
