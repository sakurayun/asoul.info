import{d as i,Y as d,r as m,Z as p,o as f,c as v,g as _,h as b,W as V,u as h,F as x,a as B}from"./vendor.3749ca8a.js";/* empty css                     */import{u as S}from"./index.3f1c2b26.js";const g=B("div",null,"RSS\u8BA2\u9605\u5730\u5740",-1),k=i({setup(j){const l=S();let e,s;const n=d(()=>"https://rss.asoul.info/"+a.value[0]+"/"+a.value[1]),a=m(["bilibili","official"]),t=[];for(e in l.dynamics){const o=[];for(s in l.dynamics[e])o.push({value:s,label:s});t.push({value:e,label:e,children:o})}return(o,r)=>{const c=p;return f(),v(x,null,[g,_(c,{modelValue:a.value,"onUpdate:modelValue":r[0]||(r[0]=u=>a.value=u),options:t},null,8,["modelValue"]),b(" "+V(h(n)),1)],64)}}});export{k as default};
