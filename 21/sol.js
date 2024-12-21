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

// ok wtf
let keyPad = [
    [7,8,9],
    [4,5,6],
    [1,2,3],
    ['X',0,'A'],
];

let dirPad = [
    ['X','^','A'],
    ['<','v','>']
]

let startX = 2;
let startY = 3;

const keyPadCo = n => {
    n = n==='A'||n==='X'?n:+n;
    for (let i = 0; i < keyPad.length;i++) {
        let f = keyPad[i].indexOf(n);
        if (f !== -1)
            return [f, i];
    }

}

const dirPadCo = n => {
    for (let i = 0; i < dirPad.length; i++) {
        let f = dirPad[i].indexOf(n);
        if (f !== -1)
            return [f, i];
    }
}

// for lowest level, keypad
let x1 = 2;
let y1 = 3;

// fuck
const findDiag = (x, y, dx, dy, coFunc, cur) => {
    //if (isNaN(x) || isNaN(y))
        //return null;
    const [nox,noy] = coFunc('X');
    //print([x,y,dx,dy, cur]);
    if (x === nox && y === noy)
        return null;

    if(dx === 0 && dy ===0)
        return [cur];




    if (dx === 0)
        return [cur+((dy<0? '^':'v').repeat(Math.abs(dy)))];
    if (dy === 0)
        return [cur+((dx<0? '<':'>').repeat(Math.abs(dx)))];
    let xDir = dx/Math.abs(dx);
    let yDir = dy/Math.abs(dy);
    
    //print('recursing');
    let opt = [ 
        findDiag(x+xDir, y, dx-xDir, dy, coFunc, cur+(dx<0?'<':'>')),
        findDiag(x, y+yDir, dx, dy-yDir, coFunc, cur+(dy<0?'^':'v'))
    ].filter(x=>x!==null);
    return opt.flat();
    //return cur.map(c=>opt.map(o=>x+o)).flat();


}

const expandPath = (seq, sx, sy, coFunc) => {
    let x = sx;
    let y = sy;
    let paths = [''];

    for(let j = 0; j < seq.length; j++) {
        let co = coFunc(seq[j]);

        let dx = co[0] - x;
        let dy = co[1] - y;
        //print([dx,dy]);

        let need = [''];
        // straightforward case

        if (dx === 0 && dy === 0) {
            // need A
            //need = ['A']
        } else {
            if (dx === 0){
                need = [(dy<0? '^':'v').repeat(Math.abs(dy))]
            } else if (dy === 0) {
                need = [(dx<0? '<':'>').repeat(Math.abs(dx))]
            } else {
                // need some efficient combo of x & y
                // but most efficient has tob e all x then all y or all y then all x, right?
                // NO becuase on higher levels, if we need to keep going between A and < it's a lot
                //
                //
                // the real complex part is that we can't hit the empty spot
                
                need = findDiag(x,y, dx, dy, coFunc,'');
                //print([x, y, dx, dy, need]);
                //exit(1);

                /*need = [
                    (dx<0? '<':'>').repeat(Math.abs(dx))+
                        (dy<0? '^':'v').repeat(Math.abs(dy)),
                    (dy<0? '^':'v').repeat(Math.abs(dy))+
                        (dx<0? '<':'>').repeat(Math.abs(dx))
                ]*/
            }
        }
        need = need.map(x=>x+'A')
        //print(need);

        // advance
        paths = paths.map(x => need.map(a => x+a)).flat();

        [x, y] = co;
    }
    return paths;
}

let x2 = 2;
let y2 = 0;

const simClick = (val, x, y) => {
    if (val === '<')
        x -= 1;
    if (val === '>')
        x += 1;
    if (val === '^')
        y -= 1;
    if (val === 'v')
        y += 1;
    return [x,y];
}

const simulate = seq => {
    //depress
    let xd = 2;
    let yd = 3;

    // radiation
    let xr = 2;
    let yr = 0;

    //cold
    let xc = 2;
    let yc = 0;

    let last = '';

    for (let i = 0; i < seq.length; i++){
        let val = seq[i];


        if (val !== 'A')
            [xc,yc] = simClick(val, xc, yc);
        else {
            let c = dirPad[yc][xc];
            if (c !== 'A')
                [xr,yr] = simClick(c, xr, yr);
            else {
                let r = dirPad[yr][xr];
                if (r !== 'A')
                    [xd,yd] = simClick(r, xd,yd);
                else {
                    let d = keyPad[yd][xd];
                    print('PRESS ' + d);
                    last += d;
                }
            }

        }

        let c = dirPad[yc][xc];
        let r = dirPad[yr][xr];
        let d = keyPad[yd][xd];

        print([val, c,r,d]);
    }
    return last;

}

for(let i = 0; i < lines.length; i++) {
    let line = lines[i];

    let first = expandPath(line, x1, y1, keyPadco);

    let dir = first.map(p => expandPath(p, x2, y2, dirPadCo)).flat();

    for (let j = 0; j < 24; j++)
        dir = dir.map(p => expandPath(p, x2, y2, dirPadCo)).flat();

    let shortest = dir.sort((a,b)=> a.length-b.length)[0];
    print(line + ': ' + shortest);
    res += +(line.replace('A',''))*shortest.length;

    //print(line);
    let depress = expandPath(line, x1, y1, keyPadCo);
    //print(depress);

    let radiation = depress.map(p => expandPath(p, x2, y2, dirPadCo)).flat();
    //print(radiation);

    let cold = radiation.map(p => expandPath(p, x2, y2, dirPadCo)).flat();
    // wait a minute, they're all the same fucking length

    // but gonna send it first

    // great now we need to fuckign simulate it

    //simulate(shortest);

}

p(res);

