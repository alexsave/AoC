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

let grid = lines.map(x=>x.split(''))


let ex = ey = 0;
let sx = sy = 0;

let dist = {};

const toKey = (x,y,d) => {
    return x+','+y+','+d;
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
            ['n','s','e','w'].forEach(x=>dist[j+','+i+','+x] = {total: 1e11, prev: []})
        if (line[j] === 'E'){
            ex = j;
            ey = i;
        } else if (line[j] === 'S'){
            sx = j;
            sy = i;
            //['n','s','e','w'].forEach(x=>dist[j+','+i+','+x] = {total: 1e11, prev: null})
        } else if (line[j] === '.'){
            // inf
            // x,y,dir
            //['n','s','e','w'].forEach(x=>dist[j+','+i+','+x] = {total: 1e11, prev: null})
        }
    }
}

dist[toKey(sx, sy, 'e')] = {total: 0, prev: []};
//print(grid);
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
    let [x,y,d] = fromKey(key);
    visited.add(small[0]);
    // get all neighbors (3)
    // we can always rotate

    let rotates = [];
    if (d === 'e' || d=== 'w'){
        rotates.push(toKey(x,y,'n'));
        rotates.push(toKey(x,y,'s'));
    } else if (d === 'n' || d === 's'){
        rotates.push(toKey(x,y,'w'));
        rotates.push(toKey(x,y,'e'));
    }

    //print(rotates);
    rotates.forEach(k =>{
        //print(k);
        //kinda, need more checks
        if (dist[k].total > 1000 + curTotal){
            dist[k].total = 1000 + curTotal;
            dist[k].prev = [key];
            //print(dist[k]);
        } else if (dist[k].total === 1000 + curTotal){
            //multi paths
            dist[k].prev.push(key);
        }
    });

    // the advance move. sometiems blocked
    // [x,y]
    let v = [];
    if (d === 'n') v = [0, -1];
    if (d === 's') v = [0, 1];
    if (d === 'e') v = [1, 0];
    if (d === 'w') v = [-1, 0];

    const moveKey = toKey(x+v[0], y+v[1], d);

    if (moveKey in dist){
        if (dist[moveKey].total > 1 + curTotal) {
            dist[moveKey].total = 1 + curTotal;
            dist[moveKey].prev = [key];
        } else if (dist[moveKey].total === 1 + curTotal) {
            dist[moveKey].prev.push(key);
        }
        // can move
    }

    //print(moveKey)
    //print(dist[moveKey])




    i++;
    ent = Object.entries(dist).filter(x=>!visited.has(x[0]))
}

// work backwards
let bestK = ''
let bestS = 1e11;

['e','n','s','w'].map(d => {
    let k = toKey(ex,ey, d);
    if (dist[k].total < bestS){
        bestK = k;
        bestS = dist[k].total;
    }


    print(k);
    print(dist[k]);
});

print(bestK);


let path = new Set();
let output = new Set();

// stack overflow from hell
const rec = a => {
    if (path.has(a))
        return;

    path.add(a);
    let [x,y,d] = fromKey(a);
    output.add(x+','+y);
    print(a);
    let prevs = dist[a].prev;
    for (let i = 0; i < prevs.length;i++){
        rec(prevs[i]);
    }
}


rec(bestK);

print([...path]);
print([...output]);

res = output.size;
p(res);

