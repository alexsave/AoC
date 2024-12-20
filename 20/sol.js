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

for(let i = 0; i < grid.length; i++) {
    let line = grid[i];
    for(let j = 0; j < line.length; j++) {
        key = i*line.length+j;
        if (line[j] === 'E'){
            ex = j;
            ey = i;
        } else if (line[j] === 'S'){
            sx = j;
            sy = i;
        }
    }
}



const toKey = (x,y) => {
    return x+','+y;
}

const fromKey = k => {
    let a =  k.split(',');
    a[0] = +a[0]
    a[1] = +a[1]
    return a;
}

const checkLen = someGrid => {

let dist = {};


for(let i = 0; i < someGrid.length; i++) {
    let line = someGrid[i];
    for(let j = 0; j < line.length; j++) {
        key = i*line.length+j;
        if (line[j] !== '#')
            dist[j+','+i] = {total: 1e11, prev: []};
            //['n','s','e','w'].forEach(x=>
    }
}

dist[toKey(sx, sy)] = {total: 0, prev: []};
//print(someGrid);
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

    /*let rotates = [];
    if (d === 'e' || d=== 'w'){
        rotates.push(toKey(x,y,'n'));
        rotates.push(toKey(x,y,'s'));
    } else if (d === 'n' || d === 's'){
        rotates.push(toKey(x,y,'w'));
        rotates.push(toKey(x,y,'e'));
    }*/

    //print(rotates);
    /*rotates.forEach(k =>{
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
    });*/

    // the advance move. sometiems blocked
    // [x,y]
    /*let v = [];
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
    }*/

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
if (dist[k].total < bestS){
    bestK = k;
    bestS = dist[k].total;
}


//print(k);
//print(dist[k]);

return [bestS, dist];

}

const [baseline, dist ]= checkLen(grid);

let arr = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0]
];

let bestK = toKey(ex,ey);

// we can't use recursion
let checked = new Set();
let toCheck = [];

toCheck.push(bestK);

const helps = {}
const counts = {}

while(toCheck.length > 0){
    print(toCheck.length);
    const point = toCheck.pop();
    if (checked.has(point))
        continue;

    let prevs = dist[point].prev;
    for (let i = 0; i < prevs.length;i++){
        toCheck.push(prevs[i]);
    }

    let [x,y] = fromKey(point);
    let d1 = dist[point].total;

    //lets break walls
    for(let i = 0; i < arr.length;i++){
        let v = arr[i];

        // also need to make sure we don't come out on #
        try{
            if (
                    grid[y+v[1]*1][x+v[0]*1] === '#' &&
                    grid[y+v[1]*2][x+v[0]*2] !== '#'
                    ){
                let k2 = toKey(x+v[0]*2, y+v[1]*2);
                let d2 = dist[k2].total;
                // so you have d1 | # | d2
                // 4 | # | 8 => 4 | 5 | 6
                if (d1 > d2) {
                    let remK = toKey(x+v[0]*1, y+v[1]*1);
                    const diff = d1 - d2 - 2;
                        //helps[remK] = d1-d2 -2;
                    if (!(diff in counts))
                        counts[diff] = 0;
                    counts[diff] +=1;

                }

            }

        }catch(e){}

    }
    
    checked.add(point);
}


//print(helps);
//
print([...Object.entries(counts)].filter(x=>+x[0]>=100));
print([...Object.entries(counts)].filter(x=>+x[0]>=100).reduce((a,c)=>c[1]+a,0));

//print(counts);

p(res);

