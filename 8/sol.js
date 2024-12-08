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

let lines = input.split('\n');
lines.pop();

let loc = {}
let taken = []

for (let i = 0; i < lines.length;i++){
    let l = lines[i].split('');
    for (let j = 0; j < l.length; j++) {
        if (lines[i][j] != '.'){
            let val = lines[i][j];
            if (!(val in loc))
                loc[val] =[]
            loc[val].push([i,j])
            //taken.push(j+i*lines[j].length);
        }
    }
}

print(loc)
    // well do dist ^2
for (let i = 0; i < lines.length;i++){
    let l = lines[i].split('');
    for (let j = 0; j < l.length; j++) {
        //if (lines[i][j] !== '.')
            //continue;
        let found = false;
        for (let type of Object.keys(loc)){
            // wrong
            /*let dists = loc[type].map(x => (x[0]-i)**2 + (x[1]-j)**2);
            for (let dist of dists) {
                // 4 because squared
                if (dists.includes(dist*4)){
                    print(dist + ' ' + i + ' ' + j + ' ' + dists + ' ' + type)
                    found = type;
                }
            }*/

            let dists = loc[type].map(x => [x[0]-i, x[1]-j])//.filter(x => x[0]!== 0&&x[1]!==0)
            for (let dist of dists) {
                // 4 because squared
                if (i === 11 && j === 10){
                    //print(dist)
                    //print(dists)
                    ////print([dist[0]*(-2), dist[1]*(-2)])
                    //print([dist[0]*(2), dist[1]*(2)])
                    //print('')
                }

                for (let dist2 of dists) {
                    if (i === 11 && j === 10){
                            //j//jprint(dist2[0]/dist[0])
                               //print(dist2[1]/dist[0])
                    }
                    if (
                            // check same direction
                            dist2[0]/dist[0] === dist2[1]/dist[1]
                            //(dist2[0] === dist[0]*-2 && dist2[1] === dist[1]*-2 ) ||
                            //(dist2[0] === dist[0]*2 && dist2[1] === dist[1]*2 ) ||
                            //(dist2[0] === dist[0]*-3 && dist2[1] === dist[1]*-3 ) ||
                            //(dist2[0] === dist[0]*3 && dist2[1] === dist[1]*3 )
                            ){

                    if (dist2[0]%(dist2[0]-dist[0]) === 0&&
                        dist2[1]%(dist2[1]-dist[1]) === 0)
                        found = type;
                    } else {
                    }
                }

                /*if (
                        dists.includes([dist[0]*(-2), dist[1]*(-2)])
                        ||
                        dists.includes([dist[0]*(2), dist[1]*(2)])
                        ){
                    print(dist + ' ' + i + ' ' + j + ' ' + dists + ' ' + type)
                }*/
            }


            //print(dists);
        }
        if (found) {
            print([found, i, j])
            res += 1
        }
    }
}

p(res);

