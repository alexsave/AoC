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
let [grid, cmd] = input.split('\n\n');
cmd = cmd.split('');
cmd.pop();

grid = grid.split('\n').map(x=>x.split('').map(c => {
            if (c === '#')
                return ['#','#'];
            if (c === '.')
                return ['.','.'];
            if (c === '@')
                return ['@','.'];
            if (c === 'O')
                return ['[',']'];


            }).flat())
//print(grid);
//print(grid.map(x=>x.join('')).join('\n'))
//exit(1)

let rX= rY = 0;

for(let y = 0; y < grid.length; y++) {
    let line = grid[y];
    for (let x = 0; x < line.length; x++){
        if (line[x] === '@'){
            rX = x;rY=y;
        }
    }
}

const move = (dx, dy) => {
    print([rY, dy, rX, dx]);
    let next = grid[rY+dy][rX+dx];
    if (next === '#')
        return;
    if (next === '.'){
        grid[rY][rX] = '.'
        grid[rY+dy][rX+dx] = '@'
        rY += dy;
        rX += dx;

        return;
    }

    if (next === '[' || next === ']'){
        if (dy === 0){
            let canMove = false;
            let scale = 2;
            while(true) {
                try {

                    if (grid[rY+dy*scale][rX+dx*scale] === '.'){
                        canMove = true;
                        break;
                    }
                    if (grid[rY+dy*scale][rX+dx*scale] === '#')
                        break;

                    scale += 1;
                } catch(e){
                    // hit a wall, dip out
                    break;
                }
            }
            if(canMove){
                while (scale >0){
                    grid[rY+dy*scale][rX+dx*scale] = grid[rY+dy*(scale-1)][rX+dx*(scale-1)] 
                    scale--;
                }
                grid[rY][rX] = '.'
                rY += dy;
                rX += dx;

            }
        } else {
            // ok we need to group together "pushes", which could be exponential
            let pushes = [[rX, rY]];
            let toMove = [];
            let canMove = false;
            while(true) {

                toMove.push(...pushes);

                // first advance
                print(pushes)
                pushes = pushes.map(co => [co[0], co[1]+dy])
                print(pushes)


                const nextPushes = []
                let oob = false;
                let allDot = true;
                // filter out  and check conditions
                for (let i = 0; i < pushes.length; i++){
                    let x = pushes[i];
                    try {
                        let val = grid[x[1]][x[0]];
                        if (val === '#'){
                            oob = true;
                            break;
                        }
                        if (val !== '.'){
                            allDot = false;
                            nextPushes.push(x);
                        } 
                    } catch(e){
                        oob = true;
                        // out of bounds
                        break;
                    }

                }

                // out of bounds, no
                if (oob)
                    break;

                // we can move
                if (allDot){
                    canMove = true;
                    break;
                }

                pushes = nextPushes;

                // then check collision
                /*try{
                    if (pushes.every(x=> grid[x[1]][x[0]] === '.')){
                        canMove = true;
                        break;
                    }
                    // can't move
                    if (pushes.some(x=> grid[x[1]][x[0]] === '#'))
                        break;
                } catch(e){
                    //out of bounds
                    break;
                }*/


                // then spread based on bracket
                let add = []
                for(let i = 0; i < pushes.length; i++){
                    let coor = pushes[i];
                    if(grid[coor[1]][coor[0]] === ']'){
                        add.push([coor[0]-1, coor[1] ]);
                    } else if(grid[coor[1]][coor[0]] === '['){
                        add.push([coor[0]+1, coor[1] ]);
                    }
                }

                // this can duplicate, but pray it doesn't?
                pushes = [...pushes, ...add]
            }

            if (canMove){
                //pray
                let copy = [...grid.map(x=>[...x])];

                for (let i = toMove.length-1; i>=0; i--){
                    let move = toMove[i];
                    copy[move[1]][move[0]] = '.';
                }
                for (let i = toMove.length-1; i>=0; i--){

                    let move = toMove[i];
                    copy[move[1]+dy][move[0]] = grid[move[1]][move[0]];
                    //grid[move[1]][move[0]] = '.';
                    //grid[move[1]+dy][move[0]] = 
                    //grid[rY+dy*scale][rX+dx*scale] = grid[rY+dy*(scale-1)][rX+dx*(scale-1)] 

                }
                grid = copy;
                rY += dy;
                rX += dx;
                
            }

        }
    }

}


print(grid.map(x=>x.join('')).join('\n'))
for (let i = 0; i < cmd.length;i++){
    let c = cmd[i];
    print([i,c])

    if (c === '<'){
        move(-1, 0);
    } else if (c === '^'){
        move(0, -1);
    } else if (c === '>'){
        move(1, 0);
    } else if (c === 'v'){
        move(0, 1);
    }


    print(grid.map(x=>x.join('')).join('\n'))
}

//grid.map((y, i)=>{
    //print([i, y]);
//
//});


for(let y = 0; y < grid.length; y++) {
    let line = grid[y];
    for (let x = 0; x < line.length/2; x++){
        if (line[x] === '['){
            //print([y,x])
            res += 100*y+x;
        }
    }
    for (let x = line.length/2; x < line.length; x++){
        if (line[x] === '['){
            //print([y,x])
            res += 100*y+x;
        }
    }
}

//lines.pop()

p(res);

