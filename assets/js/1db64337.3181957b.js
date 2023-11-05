"use strict";(self.webpackChunkjavascript_parser_in_rust=self.webpackChunkjavascript_parser_in_rust||[]).push([[372],{9613:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(9496);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(r),m=o,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||a;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},161:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=r(2962),o=(r(9496),r(9613));const a={id:"overview",title:"Overview"},i=void 0,s={unversionedId:"overview",id:"overview",title:"Overview",description:"For this guide, the standard compiler front-end phases will be applied:",source:"@site/docs/overview.md",sourceDirName:".",slug:"/overview",permalink:"/javascript-parser-in-rust/docs/overview",draft:!1,editUrl:"https://github.com/oxc-project/javascript-parser-in-rust/tree/main/docs/docs/overview.md",tags:[],version:"current",frontMatter:{id:"overview",title:"Overview"},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/javascript-parser-in-rust/docs/intro"},next:{title:"Lexer",permalink:"/javascript-parser-in-rust/docs/lexer"}},l={},c=[{value:"Performance",id:"performance",level:2},{value:"Rust Source Code",id:"rust-source-code",level:2}],p={toc:c};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"For this guide, the standard compiler front-end phases will be applied:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-markup"},"Source Text --\x3e Token --\x3e Lexer --\x3e Parser --\x3e AST\n")),(0,o.kt)("p",null,"Writing a JavaScript parser is fairly easy,\nit is 10% architectural decisions and 90% hard work on the fine-grained details."),(0,o.kt)("p",null,"The architectural decisions will mostly affect two categories:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"the performance of our parser"),(0,o.kt)("li",{parentName:"ul"},"how nice it is to consume our AST")),(0,o.kt)("p",null,"Knowing all the options and trade-offs before building a parser in Rust will make our whole journey much smoother."),(0,o.kt)("h2",{id:"performance"},"Performance"),(0,o.kt)("p",null,"The key to a performant Rust program is to ",(0,o.kt)("strong",{parentName:"p"},"allocate less memory")," and ",(0,o.kt)("strong",{parentName:"p"},"use fewer CPU cycles"),"."),(0,o.kt)("p",null,"It is mostly transparent where memory allocations are made just by looking for heap-allocated objects such as a ",(0,o.kt)("inlineCode",{parentName:"p"},"Vec"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Box")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"String"),".\nReasoning about their usage will give us a sense of how fast our program will be - the more we allocate, the slower our program will be."),(0,o.kt)("p",null,"Rust gives us the power of zero-cost abstractions, we don't need to worry too much about abstractions causing slower performance.\nBe careful with our algorithmic complexities and we will be all good to go."),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"You should also read ",(0,o.kt)("a",{parentName:"p",href:"https://nnethercote.github.io/perf-book/introduction.html"},"The Rust Performance Book"),".")),(0,o.kt)("h2",{id:"rust-source-code"},"Rust Source Code"),(0,o.kt)("p",null,'Whenever the performance of an function call cannot be deduced,\ndo not be afraid to click the "source" button on the Rust documentation and read the source code,\nthey are easy to understand most of the time.'),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"When navigating the Rust source code, searching for a definition is simply looking for\n",(0,o.kt)("inlineCode",{parentName:"p"},"fn function_name"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"struct struct_name"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"enum enum_name")," etc.\nThis is one advantage of having constant grammar in Rust (compared to JavaScript \ud83d\ude09).")))}u.isMDXComponent=!0}}]);