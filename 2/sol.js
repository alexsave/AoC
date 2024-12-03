D=require('fs').readFileSync('input.txt','utf8')
C=l=>{
for(j=l.length-1;j--;)if(!(d=Math.abs(l[j]-l[j+1]))|d>3|(I=l[0]<l[1])&l[j]>l[j+1]|!I&l[j]<l[j+1])return 0
return 1
}
S=0
R=D.split`\n`
R.pop()
R.map(L=>{
if(C(l=L.split` `.map(x=>+x)))S++
else for(i=l.length;i--;)if(C([...l.slice(0,i),...l.slice(i+1)])&&S++)return
})
console.log(S)
