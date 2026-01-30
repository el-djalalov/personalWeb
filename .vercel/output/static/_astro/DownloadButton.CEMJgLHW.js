import{j as n}from"./jsx-runtime.D3GSbgeI.js";import{m as f}from"./proxy.BYv4gV3i.js";import{r as s}from"./index.yGrMsBkE.js";import"./index.yBjzXJbu.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),c=(...r)=>r.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=s.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:i="",children:a,iconNode:u,...d},m)=>s.createElement("svg",{ref:m,...g,width:e,height:e,stroke:r,strokeWidth:o?Number(t)*24/Number(e):t,className:c("lucide",i),...d},[...u.map(([x,p])=>s.createElement(x,p)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(r,e)=>{const t=s.forwardRef(({className:o,...i},a)=>s.createElement(v,{ref:a,iconNode:e,className:c(`lucide-${h(r)}`,o),...i}));return t.displayName=`${r}`,t};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=y("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]),l={en:"Download Resume",uz:"Rezyumeni yuklash",ru:"Скачать резюме"};function N({lang:r="en"}){const e=o=>{o.preventDefault()},t=l[r]||l.en;return n.jsx("div",{className:"bg-background flex justify-center items-center",children:n.jsxs("div",{className:"relative inline-flex group",children:[n.jsx("div",{className:"absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-cyan-700 via-fuchsia-700 to-blue-700 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"}),n.jsxs(f.button,{whileHover:{scale:1.05},whileTap:{scale:.95},title:t,"aria-label":t,className:"relative inline-flex items-center justify-center px-4 py-4 text-lg font-bold text-white transition-all duration-200 bg-background font-pj rounded-xl",onClick:e,children:[n.jsx(b,{size:"18",className:"mr-4 text-slate-700 dark:text-slate-200"}),n.jsx("span",{className:"text-slate-700 dark:text-slate-200 text-sm",children:t})]})]})})}export{N as default};
