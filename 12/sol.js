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


let regions = {}

let curScan = [];
let searched = []
let scans = []

let curCircum = 0;

let curEdge = []

let curExits = []// for lack of better term


const flood = (a,b, val) => {
    try {
        if (lines[a][b] !== val){// this is circum!!!
            curCircum += 1
            return false;
        }
        let scanKey = a*lines[0].length+b;
        if (curScan.includes(scanKey))
            return true;
    
        curScan.push(scanKey);
        searched.push(scanKey);


        let d = flood(a+1, b, val);//, .3);
        let u = flood(a-1, b, val);//, .1);
        let r = flood(a, b+1, val);//, .2);
        let l = flood(a, b-1, val);//, .4);
        if (!d) curExits.d.push(scanKey)
        if (!u) curExits.u.push(scanKey)
        if (!r) curExits.r.push(scanKey)
        if (!l) curExits.l.push(scanKey)

        return true;

    } catch(e){
        // thi sis also circum, if we go out of bounds
        curCircum += 1;
        return false;
    }

}

for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for(let j = 0; j < line.length; j++) {
        let scanKey = i*lines[0].length+j;
        if (searched.includes(scanKey))
            continue;
        let val = line[j];
        if (!(val in regions))
            regions[val] = []
        //
        //regions[val].push([i,j])
        //
        //flood to find entire region


        curScan = []
        curCircum = 0;
        curExits = {u:[], d: [], r:[], l:[]}
        flood(i,j,val);
        scans.push({val, scan:curScan, circum: curCircum, area: curScan.length, exits: curExits})


        //print(val);
        //print(curScan);
        //print(curScan.length);
        //print('');


    }
}
print(scans);

// how to get circumference???


for (let k of Object.values(scans)){
    print(k.val);
    //print(k);
    let edges = 0

    for (ent of Object.entries(k.exits)){
        e = ent[1]
        let coords = e.map(x => [x/lines[0].length|0, x%lines[0].length])
        print(ent[0])
        print(e);
        //print(coords)

        let i =0;
        while (i < e.length){
            let scale = 1;
            let u = e.indexOf(e[i]-lines[0].length*scale);
            while (u !== -1) {e.splice(u, 1); scale++; u = e.indexOf(e[i]-lines[0].length*scale);}

            scale = 1;
            let d = e.indexOf(e[i]+lines[0].length*scale);
            while (d !== -1) {e.splice(d, 1); scale++; d = e.indexOf(e[i]+lines[0].length*scale);}

            scale = 1;
            let r = e.indexOf(e[i]+scale);
            while (r !== -1) {e.splice(r, 1); scale++; r = e.indexOf(e[i]+scale);}

            scale = 1;
            let l = e.indexOf(e[i]-scale);
            while (l !== -1) {e.splice(l, 1); scale++; l = e.indexOf(e[i]-scale);}

            i++;
        }
        print('was before, after:')
        print(e)
        
        edges += e.length;

    }

    
    print([k.val, edges, k.area]);
    //res += k.circum*k.area;
    res += edges*k.area;
}

p(res);

