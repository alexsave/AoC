const fs = require('fs');
const p = _ => console.log(_);

const data = fs.readFileSync('input.txt', 'utf8');
p(data);

const check = l =>{
    inc = l[0] < l[1]
    let s = true;
    for (let i = 0; i < l.length-1; i++){
        let d = Math.abs(l[i]-l[i+1]);
        if (d < 1 || d > 3)
            s = false
        if (inc && l[i] > l[i+1])
            s = false;
        if (!inc && l[i] < l[i+1])
            s = false;
    }
    return s
};

let safe = 0
reports = data.split('\n')
reports.pop();
reports.map(line => {
    let l = line.split(' ').map(x => +x);

    if (check(l)){
        //p(l)
        safe++
    } else {
        for (let i = 0; i < l.length; i++){
            let alt = [...l.slice(0,i) ,...l.slice(i+1)]
            //p('alt of ' + l +  ' is '  + alt)
           //if (i==1)
                //break;
            if (check(alt)){
                safe++;
                return;
            }
            
        }
    }




})

p(safe)
