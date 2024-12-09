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

print(lines[0])

let id = 0;
let disk = '';
let arr = []

let fileSize = {}

for (let i = 0; i < lines[0].length; i++){
    let ch = +(lines[0][i]);

    if (i%2===0){
        // first is block file
        disk += (''+id).repeat(ch);
        for (let j = 0; j < ch;j++)
            arr.push(id)
        fileSize[id] = ch;
        id += 1;
    } else {
        disk += '.'.repeat(ch)
        for (let j = 0; j < ch;j++)
            arr.push('.')
    }
}

//print(disk);

id--;
while (id >=0){
    const size = fileSize[id];
    const empty = arr.map(x=> x==='.'?'A':'B').join('')
    print(id);
    //print('size ' + size);
    //print('searcing for ' + 'A'.repeat(size));
    //print(empty);
    const found = empty.indexOf('A'.repeat(size));
    //print('');


    //print(arr.join(' '))
    if (found !== -1 && found < arr.indexOf(id)){
        arr = arr.map(x=> x===id?'.':x);
        for(let i = 0; i < size; i++){
            arr[found+i] = id;
        }
    }
    //print(arr.join(' '))
    //print(arr);




    id--;
}

/*while(arr.indexOf('.') !== -1){
    let last = arr.slice(-1)[0];
    arr = arr.slice(0,-1);
    print([last, arr]);
    arr[arr.indexOf('.')] = last;
    //disk = disk.replace('.', last);
    //disk = next;
}*/
/*while(disk.indexOf('.') !== -1){
    let last = disk.slice(-1)
    disk = disk.slice(0,-1);
    //print([last, disk]);
    disk = disk.replace('.', last);
    //disk = next;
}*/
//print(arr.join(' '))
//print(disk);
/*for(let i = 0; i < disk.length; i++){
    //res += i * (+(disk[i]))
}*/
for(let i = 0; i < arr.length; i++){
    res += i * (+(arr[i]==='.'?0:arr[i]))
}



p(res);

