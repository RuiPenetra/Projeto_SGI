!function(i,n,o,a,r,c){const s=Array.prototype,d=/\/?$/,l=/([^\\](\\\\)*)\\'/g,g=/^'|'$/g,t=/\s+/g,h=/([^\\])(\\\\)*"/g,e=r=>(e,t)=>(e[r]||s[r]).call(e,t),u=(t,r)=>e=>e(t,r),p=u(),v=s.concat,m=e=>"data-"+e,f=e("forEach"),b=(e,t)=>()=>f(e,t),W=(e,t)=>e&&e.hasOwnProperty(t),H=e("map"),x=e=>e&&e.replace(t,""),A=(e,t)=>e&&!isNaN(e)?Number(e):t,$=(e,t=e)=>e?e.trim():t;var M,y=(""+Math.random()).slice(2)+Date.now();const w=n.documentElement,N=!!n.documentMode,O=N&&!!n.attachEvent,j=(t,r)=>{for(let e=r.length;e--;){var n=$(t.getAttribute(r[e]));if(null!=n)return n}};e:{var E=["webkit","ms","moz","o"];for(let e=0;e<E.length;e++){var R=E[e]+"MatchesSelector";if(w[R]){M=R;break e}}M="matches"}const L=M,k=i.ShadowRoot,C=k?e=>e instanceof k:()=>!1,S=(e,t)=>{var r=(e=e||w).querySelectorAll;return r?(r=r.call(e,t),!C(e)&&e&&e[L](t)?v.apply([e],r):r):[]},B=e=>(e=e&&e.parentNode)&&C(e)&&e.host||e,D=(e,t,r)=>{e.addEventListener(t,r,!1)},I=e=>{(e&&e.parentNode).removeChild(e)},T=(e,t)=>{e.removeAttribute(t)},z=(t,r,n)=>{var e=e=>()=>{t[r]=t.onerror=null,n(e)};t[r]=e(!1),t.onerror=e(!0)},F=(e,t,r=n.createElement("img"))=>{z(r,"onload",t),r.src=e},J=[["h265",'video/mp4;codecs="hvc1"'],["vp9",'video/webm;codecs="vp9"'],["h264",'video/mp4;codecs="avc1"']],P=` ${y} `,G=n.createElement("source"),K=n.createElement("a"),U=e=>(K.href=e,K.href),V=/\b(bing|google)bot\b/i.test(navigator.userAgent),X=e=>r+":"+e,Y=e=>r+"-"+e,Z=e=>"data-"+r+"-"+e,q=[m,Z,Y,X];let Q=q;const _=t=>H(Q,e=>e(t)),ee="data-"+(r=j(w,_("class"))||j(w,_(r))||r)+"-"+y,te=` ${r} `+y,re=[m],ne={data:re,namespace:[X],prefix:[Y],"prefix-data":[Z]},oe=j(w,_("mode"))||"";Q=W(ne,oe)?ne[oe]:q;const ae=Q===q||Q===re?"."+r:"",ie=`:not([${"data-"+r+"-"+y}])`,ce=Math.max(0,A(j(w,_("anticipation")),0.2));var y=A(j(w,_("max-dpi")),2),se=A(j(w,_("max-dpr")),y);const le=A(j(w,_("step")),50),de=e=>{let t;const r=()=>{t=void 0,e()};return()=>{t&&i.clearTimeout(t),t=i.setTimeout(r,200)}},ge=(t,r)=>{const o={};return(n,e)=>{r||(e=n,n=te),W(o,n)?o[n].push(e):(o[n]=[e],e=(e,t)=>{var r=o[n];delete o[n],f(r,u(e,t))},r?t(n,e):t(e))}},he=ge(F,!0),ue=e=>i.getComputedStyle(e),pe=/"(\\.|[^"])+"|\([^()"]+\)/g,ve=/[\r\t ]*\n[\r\t ]*/g,me=/\r\n|\r|\n/g,fe=/,/g,be=/\r([0-9]+)/g,We=e=>{e=$(e,"").replace(me," ");const r=[];for(var t,n=e=>{var t="\r"+r.length;return r.push(e),t};t=r.length,e=e.replace(pe,n),r.length>t;);e=e.replace(fe,"\n");let o=0;for(n=(e,t)=>(o++,r[Number(t)]);o<r.length;)e=e.replace(be,n);return e.split(ve)},He=/^url\(\s*((["']?).*\2)\s*\)$/,xe=e=>{const t=He.exec(e);return[t&&U(t[2]?JSON.parse("'"===t[2]?t[1].replace(l,"$1'").replace(h,'$1\\"').replace(g,'"'):t[1]):t[1]),e]},Ae=/^(.*)(%|px)$/,$e=e=>{var t="%"===(e=e&&Ae.exec(e)||[0,0])[2];return{B:e[1]*(t?.01:1),N:t}},Me=(e,t)=>{if(!t||"auto"===t)return"-";var{B:r,N:t}=$e(t);return t?1===r?e:`(${r}*${e})`:r*tt.G},ye=(e,t)=>{e.style.backgroundImage=t},we=(e,t,r,n)=>{var o=e[n];e[n]="0";var a=t[r];return e[n]="1px",t=t[r],e[n]=o,a!==t},Ne=(e,t,r="")=>e?t?"":`-x${r}H`:r+"W"+(t?"":`x${r}H`),Oe=(n,o,a)=>{const i=o.cloneNode(),c=i.style;c.display="block",c.visibility="hidden",c.position="absolute",c.top=c.left=c.minWidth=c.minHeight=c.border=c.padding=c.margin=0,c.right=c.bottom=c.overflow="auto",c.maxWidth=c.maxHeight="none",T(i,"alt"),T(i,"controls"),T(i,"loading"),T(i,"poster"),T(i,"src"),T(i,"title"),i.innerHTML="",i.setAttribute(ee,""),(o&&o.parentNode).appendChild(i);const s=ue(i),l=!$e(s.width).B,d=!$e(s.height).B;l||d?F("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",()=>{var e=l&&we(c,s,"width","height"),t=d&&we(c,s,"height","width"),r=!1;(e||t)&&(r={W:e,H:t,I:{W:!e,H:!t},S:`${(r=Ne(e,t))?`=${r}/`:""}max=${Ne(!e,!t,"M")}/min=`+Ne(!e,!t,"m")}),I(i),n.j=r,a(n,o)},i):(I(i),n.j=!1,a(n,o))},je=/:/g,Ee=/^([^,]+)/,Re=e=>H(_(e),e=>`[${e.replace(je,"\\:")}]`+ie).join(","),Le=ae+Re("src")+`,${ae+Re("poster")},`+ae+Re("background"),ke=e=>{let t=Re(e);return ae&&(t=t.replace(Ee,ae+"-"+e+ie)),t},Ce=ke("view"),Se=ke("component"),Be=Le+","+Ce,De=ke("eager"),Ie=r=>{let n;const t=e=>{var t=S(e,r);return(e=S(e,Se)).length?v.apply(t.length?s.slice.call(t):[],H(e,n)):t};return n=({shadowRoot:e})=>e&&"open"===e.mode?s.slice.call(t(e)):[],t},Te=Ie(Be),ze=Ie(Le),Fe=e=>{for(e=B(e);e;){var t=e[te];if(t)return t.L||t.X&&t;e=B(e)}};let Je=0;const Pe=(i,c)=>t=>{let r=t[te];var e,n,o,a;return r||(e=t&&t[L](Le),n=t&&t[L](Ce),(e||n||t===w)&&(o=t&&t[L]("img"),a=t&&t[L]("video"),r={A:{},j:void 0,Z:(o||a)&&ge(e=>{void 0===r.j?Oe(r,t,e):e(r,t)}),J:"tp"+Je++,X:n,K:t&&t[L](De),ca:o,fa:e,D:a,L:Fe(t),C:!1,u:{b:void 0,p:void 0,s:void 0}},Object.defineProperty(t,te,{value:r}))),r&&(c&&r.Z?r.Z(i):i(r,t))},Ge=()=>{let n={};const o=[],a=[],r={o:({h:e,g:t})=>(e&&o.push(e),t&&a.push(t),r),ba:()=>{n={}},forEach:e=>{for(const t in n)W(n,t)&&e(n[t])},U:Pe(({J:e})=>W(n,e)),h:Pe(({J:e},t)=>{var r=W(n,e);return r&&(delete n[e],o.length&&f(o,u(t))),r}),g:Pe(({J:e},t)=>{var r=!W(n,e);return r&&(n[e]=t,a.length&&f(a,u(t))),r})};return r},Ke=e=>Ge().o({h:e.unobserve.bind(e),g:e.observe.bind(e)}),Ue=!N&&i.MutationObserver,Ve=Ue&&((e,{A:t,aa:r,Y:n})=>new Ue(e).observe(w,{attributeFilter:!0===t?void 0:t,attributes:!!t,characterData:r,childList:n,subtree:!0})),Xe=[],Ye=e=>{var t;Xe.length||(t=de(b(Xe,p)),Ve?Ve(t,{A:!0,aa:!0,Y:!0}):D(w,"DOMSubtreeModified",t),D(i,"resize",t),D(i,"scroll",t)),Xe.push(e)},Ze=Ve?(e,r)=>{const n=Ge();return Ve(e=>{const t=Ge();f(e,({target:e})=>{n.U(e)&&t.g(e)&&r(e)})},{A:e}),n}:(()=>{const n={};return D(w,"DOMAttrModified",({attrName:e,target:t})=>{W(n,e)&&n[e](t)}),(e,t)=>{const r=Ge();return f(e,e=>n[e]=e=>{r.U(e)&&t(e)}),r}})(),qe=(e,t)=>{D(w,"DOMNode"+e,({target:e})=>{t(e)})},Qe=i.IntersectionObserverEntry,_e=Qe&&"isIntersecting"in Qe.prototype&&i.IntersectionObserver,et=i.ResizeObserver;let tt;const rt=()=>{var e=$(w.getAttribute("twic:debug")),t=Math.min(i.devicePixelRatio||1,se),e=null==e?"":"debug/";const r=!tt||tt.i!==e,n=i.innerHeight||w.clientHeight,o=i.innerWidth||w.clientWidth,a=!tt||tt.W!==o||tt.H!==n||tt.G!==t;return(a||r)&&{G:t,H:n,i:e,ea:r,ga:a,W:o}};tt=rt();y=de(()=>{var e=rt();e&&(tt=e,Gt())});D(i,"resize",y),Ze(["twic:debug"],y).g(w);const nt=/^image:(\/*)(.*)$/,ot=/^(?:file|https?):/,at=/\?/,it=/^\/?/,ct=/^v[0-9]+(?:\/|$)/,st=e=>({H:e.scrollHeight,W:e.scrollWidth}),lt=e=>({H:e.clientHeight,W:e.clientWidth}),dt=(e,t)=>{var{B:r,N:e}=$e(e);return e?r*t:r},gt={H:0,W:0},ht=a=>e=>{var t=a?a(e):gt;e=ue(e);var r=t.W,n=dt(e.paddingTop,r)+dt(e.paddingBottom,r),o=dt(e.paddingLeft,r)+dt(e.paddingRight,r),r="b"===e.boxSizing[0]?{H:n+dt(e.borderTopWidth,r)+dt(e.borderBottomWidth,r),W:o+dt(e.borderLeftWidth,r)+dt(e.borderRightWidth,r)}:gt;return a?{H:Math.max(0,t.H-n),W:Math.max(0,t.W-o),a:r}:{H:Math.max(0,dt(e.height,0)-r.H),W:Math.max(0,dt(e.width,0)-r.W),a:r}},ut=ht(lt),pt=()=>({H:tt.H,W:tt.W}),vt={fb:pt,fc:pt,fp:pt,lb:e=>{const t=st(e);return t.H+=e.offsetHeight-e.clientHeight,t.W+=e.offsetWidth-e.clientWidth,t},lc:ht(st),lp:st,sb:e=>({H:e.offsetHeight,W:e.offsetWidth}),sc:ut,sp:lt,img:ht()},mt=/\b(?:block|flex|list-item|table)\b/,ft=e=>mt.test(e.display),bt=/^[afr]/,Wt=e=>bt.test(e.position),Ht=/(%|px)$/,xt=(a,i,c)=>{let s;const l=ue(a);var e=(r,e)=>{if(Ht.test(r)){var{B:t,N:n}=$e(r);if(!t||!n)return t;if(!s){r=l.position[0];let e=a,t;if("f"===r)e=w,t=ue(e);else{const o="a"===r?Wt:ft;for(;e=B(e)||w,t=ue(e),e!==w&&!o(t););}s=("a"===r?lt:ut)(e),"n"!==t.cssFloat[0]&&(r=xt(e,s.a||gt,c).M)&&(r.H&&(s.H=Math.max(s.H,r.H)),r.W&&(s.W=Math.max(s.W,r.W)))}return Math.max(t*s[e]-i[e],0)}},t=c.H&&e(l.minHeight,"H")||void 0,r=c.W&&e(l.minWidth,"W")||void 0;let n=c.H?e(l.maxHeight,"H"):void 0;return e=c.W?e(l.maxWidth,"W"):void 0,t>n&&(n=void 0),{M:(void 0!==(e=e<r?void 0:e)||void 0!==n)&&{W:e,H:n},m:(void 0!==r||void 0!==t)&&{W:r,H:t}}},At=["loading","done","error"],$t=e=>{const a=r+"-"+(e?e+"-":""),t=new RegExp(`(^|\\s)(${a}(?:${At.join("|")}))(\\s|$)|$`);return(e,o)=>e.className=e.className.replace(t,(e,t,r,n)=>(r?t:" ")+a+At[o]+(n||""))},Mt=(e,t)=>{var r;return t.da?(r=vt[t.R](e),(e=t.j?xt(e,r.a,t.j):{})[""]=r,r=t.i(e)):r=t["i"],t=!1!==r&&(t=t.V,e=nt.exec(t),c&&(e?t="image:"+c+e[1]+e[2]:ot.test(t)&&(t=""+c+t),e=nt.exec(t)),e=e?!ct.test(e[2])&&e[2]:ot.test(t)&&t,r=(r||"").replace(it,tt.i),e?""+o+(r?`${e}${at.test(e)?"&":"?"}twic=`+a+r.slice(0,-1):e):""+o+a+r+t)},yt=/(^|\/)(?:auto|\*)(\/|$)/g,wt=/((?:(?:^|\/)(?:(?:contain|cover|resize)(?:-max|-min)?|max|min))=-(?:x-)?|x-)(?=$|\/)/g,Nt=/^(?==)/,Ot=/[HW]/,jt=/(^|\/)((?:contain|cover|resize)(?:-max|-min)?|max|min)(?=\/|$)/g,Et=/([mM])?([HW])/g,Rt=/^\//,Lt=(e,t,s,l,r,n)=>{s="none"===s?le:A(s,le),t="none"===(t=x(t))?"":(n=n(),t?t.replace(yt,n&&`$1${n}$2`):n);const o=l?l.S:"=WxH";return t=(t=t.replace(jt,(e,t,r)=>""+t+o.replace(Nt,r))).replace(Rt,""),t=(t=(e=x(e))&&"none"!==e?"focus="+(e?e.replace(d,"/"):"")+t:t)?t.replace(d,"/"):"",r&&(t=`${t}output=${P}/`),e=Ot.test(t),{j:l,da:e,i:e?a=>{const i={};let c=!1;const e=t.replace(Et,(e,t,r)=>{if(e=t||"",!i[e]){var n=a[e];t=t?l.I:l;var o=tt.G,n={W:n.W*o,H:n.H*o};if(1!==s&&!(t&&t.W&&t.H)&&(o=n[(t=t&&t.W)?"H":"W"])){let e=Math.round(o/s)*s||s;e<o&&1.1<o/e&&(e+=s),(n=n[t?"W":"H"])&&e!==o&&((n=Math.round(n*e/o))<1&&(n=1)),n=t?{W:n,H:e}:{W:e,H:n}}i[e]=n}return 0===(r=i[e][r])&&(c=!0),r?r.toFixed(0):"-"});return!c&&e.replace(wt,"")}:t}},kt=(t,a)=>{const e=e=>_(e).concat(_(t+"-"+e)),r=e("transform"),i=[_(t),e("focus"),e("step"),V?r.concat(e("bot")):r,["v"]],c=i.length-1,n=Pe((e,r)=>{const n=e.A;let o=!1;var t=H(i,(e,t)=>(t=t<c?$(j(r,e)):tt.i,e=e[e.length-1],o||W(n,e)&&t===n[e]||(o=!0),n[e]=t));o&&a.apply(void 0,v.apply([e,r],t))}),o=Ze(v.apply([],i.slice(0,c)),n);return{h:o.h,g:e=>{var t=o.g(e);return t&&n(e),t}}},Ct={f:"resize",n:"",s:"max"},St=(e,t)=>({l:e,P:e,$:t&&We(e),i:void 0}),Bt=l=>{const d=$t(l),g=!l,h=(l=l||"src")[0],e=(e,t)=>{const r=e.u[h];if(r){r.O();const i=r.P,c=Mt(t,r.i);if(c&&c!==r.l){const s=e.D&&g;r.l=c,e=e=>{c===r.l&&(e?d(t,2):(s||(t[l]=c),d(t,1)))},s?(d(t,0),n=c,o=e,(a=t).innerHTML=H(J,e=>(G.src=n.replace(P,e[0]),G.type=e[1],G.outerHTML)).join(""),z(a,"onplay",o),a.autoplay=a.loop=a.muted=!0,a.load()):(i&&(t[l]=i),d(t,0),he(c,e))}}var n,o,a},t=kt(l,(t,r,n,o,a,i)=>{if(n){n=U(n),o=We(o),a=We(a),i=We(i);const c=t.u[h]||(t.u[h]=St(r[l]));c.O=()=>{const e=Lt(o[0],i[0],a[0],t.j,t.D&&g,()=>{var e=ue(r).objectFit||"f",t=e[0];return W(Ct,t)?Ct[t]:e});e.R="img",e.V=n,c.i=e},e(t,r)}});return{T:e,F:t}},Dt=Bt(),It=Bt("poster"),Tt=$t("background"),zt=({u:{b:t}},r)=>{if(t){t.O();const e=t.P,n=t.$,o=t.i,a=[],i=o&&o.length&&H(o,(e,t)=>"string"==typeof e?e:!1===(e=Mt(r,e))?n[t]||"none":(a.push(e),`url( ${JSON.stringify(e)} )`)).join(",");i&&a.length&&i!==t.l&&(t.l=i,e&&"none"!==e&&ye(r,e),Tt(r,0),((e,t)=>{var r=he;let n,o=e.length;const a=e=>{n||!(n=e)&&o--||t(n)};f(e,e=>r(e,a)),a(void 0)})(a,e=>{i===t.l&&(e?Tt(r,2):(ye(r,i),Tt(r,1)))}))}},Ft=kt("background",(e,c,s,l,d,g)=>{s=H(We(s),xe),l=We(l),d=We(d),g=We(g);const t=e.u.b||(e.u.b=St(ue(c).backgroundImage,!0));t.O=()=>{t.i=H(s,(e,i)=>{if(e[0]){let r,n,o,a;const t=Lt(l[i],g[i],d[i],void 0,!1,()=>{if(r||(e=((n,o)=>{const a=ue(n);let i=!1;return 1<o?e=>{var t=We(a[e]);if(!i&&t.length<o){i=!0;for(var r=(t=We(a.backgroundImage)).length;r<o;r++)t[r]="none";ye(n,t.join(",")),t=We(a[e])}if(t.length<o)for(r=e=t.length;r<o;r++)t[r]=t[r-e];return t}:e=>We(a[e])})(c,s.length),r=e("backgroundAttachment"),o=e("backgroundOrigin"),a=e("backgroundSize")),n=""+(r[i]?r[i][0]:"s")+(o[i]?o[i][0]:"p"),!(e=a[i])||"auto"===e)return"";if("c"===e[0])return e+"=WxH";var e,t=e.split(" ");return"resize="+(e=Me("W",t[0]))+("-"===(t=Me("H",t[1]))?"":"x"+t)});return t.R=n,t.V=e[0],t}return e[1]})},zt(e,c)}),Jt=(e,t)=>{zt(e,t),It.T(e,t),Dt.T(e,t)},Pt=(e=>{let t;if(et){const r=Ge().o({g:de(()=>{f(r,e),r.ba()})});t=Ke(new et(e=>f(e,({target:e})=>r.g(e)))).o({h:r.h})}else t=Ge().o({g:e}),Ye(b(t,e));return t})(Pe(Jt)),Gt=b(Pt,Pe((e,t)=>{tt.ea?(e.A.v=tt.i,Jt(e,t)):zt(e,t)})),Kt=Pe((e,t)=>{e.C=!0;var r=(e.ca||e.D)&&Dt.F.g(t);e=e.D&&It.F.g(t);var n=Ft.g(t);(r||e||n)&&Pt.g(t)},!0),Ut=Pe((e,t)=>{e.K||(e.C=!1,Ft.h(t),It.F.h(t),Pt.h(t),Dt.F.h(t))}),Vt=(r,n)=>Pe((e,t)=>{e.X?(e.C=n,f(ze(t),r)):r(t)});y=()=>{const n=(()=>{var e,{h:i,g:c}={h:Vt(Ut,!1),g:Vt(Kt,!0)};let t;return _e?t=Ke(new _e(e=>f(e,e=>(e.isIntersecting?c:i)(e.target)),{rootMargin:100*ce+"%"})):(e=e=>{var{H:t,W:r}=tt,n=t*(1+ce),o=-(r*ce),a=-(t*ce),t=r*(1+ce),r=e.getBoundingClientRect();(r.top<n&&r.bottom>=a&&r.left<t&&r.right>=o?c:i)(e)},t=Ge().o({g:e}),Ye(b(t,e))),t.o({h:i})})();var r,e=e=>{const t=Pe(e);return e=>f(Te(e),t)};(e={g:e(({K:e,L:t},r)=>{e?Kt(r):t?t.C&&Kt(r):n.g(r)}),h:e(({K:e,L:t},r)=>{e?Ut(r):t?t.C&&Ut(r):n.h(r),r[te]=void 0})}).g(w),r=e,Ve?Ve(e=>f(e,e=>{var t=e.removedNodes;t&&f(t,r.h),(e=e.addedNodes)&&f(e,r.g)}),{Y:!0}):(qe("Removed",r.h),qe("Inserted",r.g))};(O?/n/:/g$/).test(n.readyState)?O?D(i,"load",y):D(n,"DOMContentLoaded",y):y()}(window,document,"https://cdn.laredoute.com/","v1/","twic","");//v1.7.15