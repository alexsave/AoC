// Relevant part

// Tips:
// array.sort() has no return value
// [3].includes(3)
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

lines = input.trim().split('\n')



dir=[-1,0,1]
check = (a,b, i, j) =>{


            try{

            if(
                    [
                lines[i-a][j-b],
                lines[i][j],
                lines[i+a][j+b]
            ].join('')==='MAS'
            /*&&
                    [
                lines[i-b][j-a],
                lines[i][j],
                lines[i+b][j+b]
            ].join('')==='MAS'*/
            )
                return true;

            }catch(e){}
            return false;

}
// no assumptions this time
let res = 0;

for (let i = 0; i < lines.length;i++){
    s = ''
    for (let j = 0; j < lines[i].length;j++){
        found = false;
        if(lines[i][j]=='A'){
            /*try{

            if(
                    ['MAS','SAM'].includes([ lines[i][j-1], lines[i][j], lines[i][j+1] ].join(''))
                    &&
                    ['MAS','SAM'].includes([ lines[i-1][j], lines[i][j], lines[i+1][j] ].join(''))
              ){
                //print([ lines[i][j+1], lines[i][j], lines[i][j-1] ].join(''))
                //print([ lines[i+1][j], lines[i][j], lines[i-1][j] ].join(''))
                res+=1
                //print(i + ' ' + j)
                found = true;
            }

            }catch(e){}*/

            try{

            if(
                    ['MAS','SAM'].includes( [ lines[i+1][j-1], lines[i][j], lines[i-1][j+1] ].join(''))
                    &&
                    ['MAS','SAM'].includes( [ lines[i-1][j-1], lines[i][j], lines[i+1][j+1] ].join(''))
            
              ) {res+=1;
                    //j//jprint([ lines[i+1][j-1], lines[i][j], lines[i-1][j+1] ].join(''))
                    //print([ lines[i-1][j+1], lines[i][j], lines[i+1][j-1] ].join(''))
                found = true;

            }

            }catch(e){}

            if (found)s+='a'
            else s+='A'
        } else {
            s+=lines[i][j]
        }
    }
    print(s)


}



p(res);

