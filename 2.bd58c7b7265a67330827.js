(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1:function(e,t,n){"use strict";n.r(t);var r=n(22),i=n(12);n(36);function o(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var a=n(33);n(34);window.memory=i.s;var c=n(53),l=n(54),u=function(e){var t,n=e.canvas,r=e.universe,o=e.isSnapshot,u=void 0!==o&&o,s=e.gl,f=(t=a(s?{gl:s,attributes:{preserveDrawingBuffer:u}}:{canvas:n,attributes:{preserveDrawingBuffer:u}})).texture(),d=r.width(),p=r.height(),m=r.cells(),v=new Uint8Array(i.s.buffer,m,d*p*4),y=t.texture({width:d,height:p,data:v}),h=t({blend:{enable:!0,func:{srcRGB:"src alpha",srcAlpha:1,dstRGB:"one minus src alpha",dstAlpha:1},equation:{rgb:"add",alpha:"add"},color:[0,0,0,0]},frag:c,uniforms:{t:function(e){return e.tick},skyTime:function(){return window.skyTime||0},dataTexture:function(){return m=r.cells(),v=new Uint8Array(i.s.buffer,m,d*p*4),y({width:d,height:p,data:v})},resolution:function(e){return[e.viewportWidth,e.viewportHeight]},dpi:4,isSnapshot:u,backBuffer:f},vert:l,attributes:{position:[[-1,4],[-1,-1],[4,-1]]},count:3});return{regl:t,draw:function(){t.poll(),h()}}};function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.fps=document.getElementById("fps"),this.frames=[],this.lastFrameTimeStamp=performance.now()}var t,n,r;return t=e,(n=[{key:"render",value:function(){var e=performance.now(),t=e-this.lastFrameTimeStamp;this.lastFrameTimeStamp=e;var n=1/t*1e3;this.frames.push(n),this.frames.length>30&&this.frames.shift();for(var r=1/0,i=-1/0,o=0,a=0;a<this.frames.length;a++)o+=this.frames[a],r=Math.min(this.frames[a],r),i=Math.max(this.frames[a],i);var c=o/this.frames.length;this.fps.textContent="FPS:".concat(Math.round(c).toString().padStart(3))}}])&&s(t.prototype,n),r&&s(t,r),e}());function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var p=document.getElementById("sand-canvas");var m=function(e,t){return Math.sqrt(Math.pow(e.clientX-t.clientX,2)+Math.pow(e.clientY-t.clientY,2),2)},v=function(e){var t=function(e){return Math.sqrt(Math.pow(e.clientX,2)+Math.pow(e.clientY,2),2)}(e);return{clientX:e.clientX/t,clientY:e.clientY/t}},y=function(e,t){return{clientX:e.clientX*t,clientY:e.clientY*t}},h=function(e,t){return{clientX:e.clientX+t.clientX,clientY:e.clientY+t.clientY}},b=function(e,t){return{clientX:e.clientX-t.clientX,clientY:e.clientY-t.clientY}},g=!1,w=null,x=null;function E(e){clearInterval(x),x=window.setInterval((function(){return S(e)}),100);var t={clientX:e.clientX,clientY:e.clientY};if(g){var n=0;if(S(t),w&&window.UI.state.selectedElement!=r.d.Fish&&window.UI.state.selectedElement!=r.d.GoldFish)for(;m(t,w)>2/3;){var i=m(t,w);if(t=h(t,y(v(b(w,e)),Math.min(2/3,i))),++n>1e3)break;S(t)}w=e}}p.addEventListener("mousedown",(function(e){e.preventDefault(),he.push_undo(),g=!0,clearInterval(x),x=window.setInterval((function(){return S(e)}),100),S(e),w=e})),document.body.addEventListener("mouseup",(function(e){clearInterval(x),g&&(e.preventDefault(),w=null,g=!1)})),p.addEventListener("mousemove",(function(e){clearInterval(x),E(e)})),p.addEventListener("mouseleave",(function(e){clearInterval(x),w=null})),p.addEventListener("touchstart",(function(e){e.cancelable&&e.preventDefault();Array.from(e.touches);he.push_undo(),g=!0,w=e,_(e)})),p.addEventListener("touchend",(function(e){e.cancelable&&e.preventDefault(),w=null,g=!1,clearInterval(x)})),p.addEventListener("touchmove",(function(e){window.paused||e.cancelable&&e.preventDefault(),clearInterval(x),_(e)}));var _=function(e){var t=Array.from(e.touches);1==t.length?E(t[0]):t.forEach(S)};var k,S=function(e){if(g){var t=d(function(e){var t=p.getBoundingClientRect();t={left:t.left+28,top:t.top+28,width:t.width-56,height:t.height-56};var n=p.width/(fe*Math.ceil(window.devicePixelRatio))/t.width,r=p.height/(fe*Math.ceil(window.devicePixelRatio))/t.height,i=(e.clientX-t.left)*n,o=(e.clientY-t.top)*r;return[Math.min(Math.floor(i),de-1),Math.min(Math.floor(o),pe-1)]}(e),2),n=t[0],r=t[1];if(!(window.UI.state.selectedElement<0)){he.paint(n,r,4,window.UI.state.selectedElement)}}},R=(n(55),n(2)),C=n.n(R),O=n(57),j=n.n(O),z=n(10),D=n(21),I=function(){return C.a.createElement("div",{className:"welcome-scrim"},C.a.createElement("div",{className:"Info window"},C.a.createElement("div",{className:"title-bar"},C.a.createElement("div",{className:"title-bar-text"},"Information"),C.a.createElement("div",{className:"title-bar-controls"},C.a.createElement(z.b,{to:"/"},C.a.createElement("button",{"aria-label":"Minimize"})),C.a.createElement("button",{"aria-label":"Maximize"}),C.a.createElement(z.b,{to:"/"},C.a.createElement("button",{"aria-label":"Close"}," ")))),C.a.createElement("div",{className:"window-body "})))},A=function(e){var t=e.close,n=e.children;return C.a.createElement("div",{className:"welcome-scrim"},C.a.createElement("div",{id:"welcome"},n,C.a.createElement(z.b,{to:"/",className:"x",onClick:t},C.a.createElement("button",null," x"))))},M=n(69),L=n.n(M);function T(e){return(T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function N(e,t){return!t||"object"!==T(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function W(e){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function U(e,t){return(U=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}console.log(r.e),console.log(r.d);var F=(q(k={},r.d.Empty,"🜂"),q(k,r.d.Rule1,"🝊"),q(k,r.d.Rule2,"☉"),q(k,r.d.Rule3,"☽"),q(k,r.d.Rule4,"🜛"),q(k,r.d.Rule5,"🜝"),q(k,r.d.Rule6,"🜏"),k),Y=[{key:r.e.Horizontal,symbol:"🜕"},{key:r.e.Quad,symbol:"🜨"}],B=[{key:r.d.Empty,symbol:F[r.d.Empty]},{key:r.d.Wild,symbol:"*"},{key:r.d.Rule1,symbol:F[r.d.Rule1]},{key:r.d.Rule2,symbol:F[r.d.Rule2]},{key:r.d.Rule3,symbol:F[r.d.Rule3]},{key:r.d.Rule4,symbol:F[r.d.Rule4]},{key:r.d.Rule5,symbol:F[r.d.Rule5]},{key:r.d.Rule6,symbol:F[r.d.Rule6]}];function G(e,t){return 3*t+e}var X=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),N(this,W(t).call(this,e))}var n,i,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&U(e,t)}(t,e),n=t,(i=[{key:"gridSquare",value:function(e,t,n,i){var o=this,a=this.props,c=a.grid,l=a.options,u=a.selectedElement,s=n&&i,f=c[G(e,t)];s&&(f=u);var d=l.find((function(e){return e.key==f})).symbol,p=function(n){if(!s){var a=o.props,c=a.grid,l=a.options,u=l.findIndex((function(e){return e.key==f}));u=(u+l.length+n)%l.length,i&&u==l.findIndex((function(e){return e.key===r.d.Wild}))&&(u=(u+l.length+n)%l.length);var d=l[u];c[G(e,t)]=d.key,(0,o.props.setGrid)(c)}},m=i?44:46,v=i?4:2;return C.a.createElement("g",{key:"".concat(e,"-").concat(t),transform:"translate(".concat(51*e,",").concat(51*t+15,")"),className:s?"disabled":"",onContextMenu:function(e){e.preventDefault(),p(-1)},onClick:function(){return p(1)},onDrop:function(n){if(!s){var r=n.dataTransfer.getData("text");c[G(e,t)]=parseInt(r,10),(0,o.props.setGrid)(c)}},onDragOver:function(e){return e.preventDefault()}},C.a.createElement("foreignObject",{x:v,y:v,width:m,height:m},C.a.createElement("button",{className:"mat-box",draggable:"true",style:{width:m-v,height:m-v,filter:"saturate(0.8)",color:"*"==d?"#888":"black",backgroundColor:"*"==d?"#b0b0b055":window.pallette[f],borderColor:"*"==d?"#b0b0b055":window.pallette[f],borderWidth:3,fontSize:"30px",borderStyle:" outset",lineHeight:0,verticalAlign:"middle"},onDragStart:function(e){e.dataTransfer.setData("text/plain",f)}},s||"?"==d?F[u]:d)))}},{key:"render",value:function(){var e=this.props.isSelector;return C.a.createElement("g",null,[this.gridSquare(0,0,e),this.gridSquare(0,1,e),this.gridSquare(0,2,e),this.gridSquare(1,0,e),this.gridSquare(1,1,e,!0),this.gridSquare(1,2,e),this.gridSquare(2,0,e),this.gridSquare(2,1,e),this.gridSquare(2,2,e)])}}])&&P(n.prototype,i),o&&P(n,o),t}(C.a.Component);function H(e){return(H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function K(e,t,n){return(K=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var i=new(Function.bind.apply(e,r));return n&&$(i,n.prototype),i}).apply(null,arguments)}function J(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function Q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function V(e){return(V=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Z(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function $(e,t){return($=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ee=[{p:0,symbol:"×"},{p:1,symbol:"⚀"},{p:2,symbol:"⚁"},{p:3,symbol:"⚂"},{p:4,symbol:"⚃"},{p:5,symbol:"⚄"},{p:6,symbol:"⚅"}],te=function(e){function t(e){var n,r,i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,(n=!(i=V(t).call(this,e))||"object"!==H(i)&&"function"!=typeof i?Z(r):i).state={selectedElement:e.selectedElement,clause_index:e.clause_index,clause:t.getRule(e.selectedElement,e.clause_index)},window.Editor=Z(n),n}var n,i,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&$(e,t)}(t,e),n=t,o=[{key:"getRule",value:function(e,t){console.log(e,t);var n=window.u.clause(e,t),r=Array.from(new Uint8Array(memory.buffer,n.selector.grid(),9)),i=Array.from(new Uint8Array(memory.buffer,n.effector.grid(),9)),o=n.symmetry(),a=n.probability();return{selector:r,effector:i,symmetry:o,probability:ee.find((function(e){return e.p==a}))}}},{key:"getDerivedStateFromProps",value:function(e,n){var r=e.selectedElement,i=e.clause_index;return r!=n.selectedElement&&r<=6?{selectedElement:r,clause:t.getRule(r,i)}:null}}],(i=[{key:"setRule",value:function(){var e=this.state.clause,t=e.selector,n=e.effector,i=e.symmetry,o=e.probability,a=K(r.c,J(t)),c=K(r.b,J(n)),l=new r.a(o.p,Y[i].key,a,c);window.u.set_clause(l,this.props.selectedElement,this.props.clause_index)}},{key:"incSymmetry",value:function(e){var t=this.state.clause,n=t.symmetry;t.symmetry=(Y.length+n+e)%Y.length,this.setState({clause:t},this.setRule)}},{key:"incProbability",value:function(e){var t=this.state.clause,n=t.probability,r=ee.indexOf(n);r=(ee.length+r+e)%ee.length,console.log(ee[r]),t.probability=ee[r],this.setState({clause:t},this.setRule)}},{key:"render",value:function(){var e=this,t=this.props.selectedElement,n=this.state.clause,r=n.selector,i=n.effector,o=n.symmetry,a=n.probability;return C.a.createElement("div",{className:"MatrixMenu"},C.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 15 355 170",width:"100%"},C.a.createElement("g",{transform:"translate(178,0)",className:L()({disabled:0==a.p},"symmetry")},C.a.createElement("text",{x:"0",y:46,style:{fontSize:"30px"},onContextMenu:function(t){t.preventDefault(),e.incSymmetry(-1)},onClick:function(){return e.incSymmetry(1)}},Y[o].symbol)),C.a.createElement("g",{className:L()({disabled:0==a.p},"clause")},C.a.createElement("g",{transform:"translate(0,0)"},r&&C.a.createElement(X,{selectedElement:t,options:B,grid:r,isSelector:!0,setGrid:function(t){var n=e.state.clause;n.selector=t,e.setState({clause:n},e.setRule)}})),C.a.createElement("g",{transform:"translate(169,78)"},C.a.createElement("image",{href:"assets/gold_arrow.png",height:"28",width:"23"})),C.a.createElement("g",{transform:"translate(200,0)"},i&&C.a.createElement(X,{selectedElement:t,options:B,grid:i,setGrid:function(t){var n=e.state.clause;n.effector=t,e.setState({clause:n},e.setRule)}})))))}}])&&Q(n.prototype,i),o&&Q(n,o),t}(C.a.Component);function ne(e){return(ne="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function re(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ie(e){return(ie=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function oe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ae(e,t){return(ae=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}window.species=r.d;var ce=function(){var e=document.createElement("canvas"),t=Object.values(r.d).filter((function(e){return!isNaN(parseFloat(e))})),n=Math.max.apply(Math,o(t))+1,i=r.f.new(n,1);e.width=n,e.height=3,i.reset(),t.forEach((function(e){return i.paint(e,0,2,e)})),i.paint(r.d.Empty,0,2,r.d.Empty),(0,u({universe:i,canvas:e,isSnapshot:!0}).draw)();var a=e.getContext("webgl"),c=new Uint8Array(4*n);a.readPixels(0,0,n,1,a.RGBA,a.UNSIGNED_BYTE,c);var l={};return t.forEach((function(e){var t=4*e,n="rgba(".concat(c[t],",").concat(c[t+1],", ").concat(c[t+2],", 0.9)");l[e]=n})),l}();function le(e,t){var n=new r.c(r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,e,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild),i=new r.b(r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,e,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild),o=new r.a(ee[1].p,Y[0].key,n,i);he.set_clause(o,e,t)}window.pallette=ce;var ue=function(e){function t(e){var n,i,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),i=this,(n=!(o=ie(t).call(this,e))||"object"!==ne(o)&&"function"!=typeof o?oe(i):o).state={submissionMenuOpen:!1,paused:!1,ff:!1,submitting:!1,size:1,dataURL:null,currentSubmission:null,selectedElement:r.d.Rule2},window.UI=oe(n),n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ae(e,t)}(t,e),n=t,(o=[{key:"componentDidUpdate",value:function(e){}},{key:"togglePause",value:function(){window.paused=!this.state.paused,this.setState({paused:!this.state.paused})}},{key:"toggleFF",value:function(){window.ff=!this.state.ff,this.setState({ff:!this.state.ff})}},{key:"play",value:function(){window.paused=!1,this.setState({paused:!1})}},{key:"pause",value:function(){window.paused=!0,this.setState({paused:!0})}},{key:"setSize",value:function(e,t){e.preventDefault(),this.setState({size:t})}},{key:"reset",value:function(){this.play(),this.setState({currentSubmission:null}),ke()}},{key:"closeMenu",value:function(){this.play(),this.setState({dataURL:null})}},{key:"upload",value:function(){console.log("saving");var e=new Uint8Array(i.s.buffer,he.cells(),de*pe*4),t=document.createElement("canvas"),n=t.getContext("2d"),r=n.createImageData(de,pe);t.height=pe,t.width=de;for(var o=0;o<de*pe*4;o++)r.data[o]=o%4==3?255:e[o];n.putImageData(r,0,0);var a=t.toDataURL("image/png");JSON.stringify(a)}},{key:"currentDateString",value:function(){var e=new Date;return"".concat(e.getMonth(),"-").concat(e.getDate())}},{key:"load",value:function(){console.log("loading")}},{key:"render",value:function(){var e=this,t=this.state,n=(t.ff,t.selectedElement),i=t.currentSubmission,o=(t.paused,i&&i.id&&"#".concat(i.id),Object.keys(r.d).filter((function(e){return e.length>2&&"Wild"!=e})));return C.a.createElement("div",{className:"window fade ",id:"HUD"},C.a.createElement("div",{className:"title-bar"}," ",C.a.createElement("div",{className:"title-bar-text"},"Alchemi Online"),C.a.createElement("div",{className:"title-bar-controls"},C.a.createElement("button",{onClick:function(){e.reset()}},"×"))),C.a.createElement("div",{className:"window-body hud-body"},C.a.createElement("div",{id:"hud-buttons"},o.map((function(t){return function(e,t,n){var i=r.d[e],o=ce[i],a=i==t,c=e;return F[i]&&(c=F[i]),C.a.createElement("button",{className:a?"selected ".concat(e):e,key:e,draggable:!0,onDragStart:function(e){e.dataTransfer.setData("text/plain",i)},onClick:function(){n(i)},style:{background:"inherit",backgroundColor:o,borderColor:o,filter:a||"saturate(0.8) "}},"  ",c,"  ")}(t,n,(function(t){return e.setState({selectedElement:t})}))})),C.a.createElement("img",{style:{width:"100%"},src:"assets/barb_wire.gif"}),C.a.createElement(C.a.Fragment,null,C.a.createElement(te,{selectedElement:n,clause_index:0}),C.a.createElement(te,{selectedElement:n,clause_index:1}),C.a.createElement(te,{selectedElement:n,clause_index:2}),C.a.createElement("div",{className:"hint"},"drag and drop tiles to construct rules"),C.a.createElement("button",{onClick:function(){var t=n;le(n,0),le(n,1),le(n,2),e.setState({selectedElement:(n+1)%o.length},(function(){return e.setState({selectedElement:t})}))},id:"clear-button"}," ","clear")),this.state.dataURL&&C.a.createElement(A,{close:function(){return e.closeMenu()}},C.a.createElement("img",{src:this.state.dataURL,className:"submissionImg"}),C.a.createElement("div",{style:{display:"flex"}})))))}}])&&re(n.prototype,o),a&&re(n,a),t}(C.a.Component);function se(){return C.a.createElement(z.a,null,C.a.createElement(D.a,{path:"/",component:ue}),C.a.createElement(D.a,{exact:!0,path:"/info/",component:I}))}n.d(t,"canvas",(function(){return ge})),n.d(t,"width",(function(){return de})),n.d(t,"height",(function(){return pe})),n.d(t,"ratio",(function(){return fe})),n.d(t,"universe",(function(){return he})),n.d(t,"reset",(function(){return ke}));var fe=8,de=128,pe=128,me=Math.min(de,pe),ve=me/2,ye=me-6;console.log(de,pe);var he=r.f.new(de,pe);function be(){he.paint(ve,ve,ye+2,r.d.Rule1),he.paint(ve,ve,ye-2,r.d.Empty)}window.u=he,window.universe=he,j.a.render(C.a.createElement(se,null),document.getElementById("ui")),be();var ge=document.getElementById("sand-canvas");ge.width=de*fe*Math.ceil(window.devicePixelRatio),ge.height=pe*fe*Math.ceil(window.devicePixelRatio);var we=document.getElementById("HUD"),xe=function(){var e,t;window.innerWidth,window.innerHeight;e="height: ".concat(Math.min(window.innerHeight-80-50,window.innerWidth-477),"px; margin:10px; margin-right: ").concat(397,"px; margin-left:auto;"),window.innerHeight-80,t="width: ".concat(357,"px; margin: 10px;"),we.style=t,ge.style=e};xe(),window.addEventListener("deviceorientation",xe,!0),window.addEventListener("resize",xe);var Ee=u({canvas:ge,universe:he}),_e=parseInt(localStorage.getItem("time"),10)||0;function ke(){console.log("reseting"),localStorage.setItem("cell_data",null),he.reset(),be()}!function e(){for(var t=performance.now(),n=window.ff?100:1,r=0;r<n;r++){if(window.paused||(f.render(),he.tick()),performance.now()-t>16)break}window.t=_e,Ee.draw(),requestAnimationFrame(e)}(),window.UI.load()},12:function(e,t,n){"use strict";var r=n.w[e.i];e.exports=r;n(22);r.M()},22:function(e,t,n){"use strict";(function(e){n.d(t,"d",(function(){return d})),n.d(t,"e",(function(){return p})),n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return v})),n.d(t,"c",(function(){return h})),n.d(t,"f",(function(){return b})),n.d(t,"g",(function(){return g})),n.d(t,"h",(function(){return w}));var r=n(12);function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}var c=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});c.decode();var l=null;function u(e,t){return c.decode((null!==l&&l.buffer===r.s.buffer||(l=new Uint8Array(r.s.buffer)),l).subarray(e,e+t))}function s(e,t){if(!(e instanceof t))throw new Error("expected instance of ".concat(t.name));return e.ptr}var f,d=Object.freeze({Wild:11,11:"Wild",Empty:0,0:"Empty",Rule1:1,1:"Rule1",Rule2:2,2:"Rule2",Rule3:3,3:"Rule3",Rule4:4,4:"Rule4",Rule5:5,5:"Rule5",Rule6:6,6:"Rule6"}),p=Object.freeze({Horizontal:0,0:"Horizontal",Quad:1,1:"Quad"}),m=function(){function e(t,n,o,a){i(this,e),s(o,h);var c=o.ptr;o.ptr=0,s(a,v);var l=a.ptr;a.ptr=0;var u=r.o(t,n,c,l);return e.__wrap(u)}return a(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.b(e)}},{key:"probability",get:function(){return r.e(this.ptr)},set:function(e){r.k(this.ptr,e)}},{key:"symmetry",get:function(){return r.g(this.ptr)>>>0},set:function(e){r.m(this.ptr,e)}},{key:"selector",get:function(){var e=r.f(this.ptr);return h.__wrap(e)},set:function(e){s(e,h);var t=e.ptr;e.ptr=0,r.l(this.ptr,t)}},{key:"effector",get:function(){var e=r.d(this.ptr);return v.__wrap(e)},set:function(e){s(e,v);var t=e.ptr;e.ptr=0,r.j(this.ptr,t)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}}]),a(e,[{key:"symmetry",value:function(){return r.g(this.ptr)>>>0}},{key:"probability",value:function(){return r.e(this.ptr)}}],[{key:"new_null",value:function(){var t=r.p();return e.__wrap(t)}}]),e}(),v=function(){function e(t,n,o,a,c,l,u,s,f){i(this,e);var d=r.r(t,n,o,a,c,l,u,s,f);return e.__wrap(d)}return a(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.c(e)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}}]),a(e,[{key:"grid",value:function(){return r.q(this.ptr)}}]),e}(),y=function(){function e(t,n,o){i(this,e),s(t,m);var a=t.ptr;t.ptr=0,s(n,m);var c=n.ptr;n.ptr=0,s(o,m);var l=o.ptr;o.ptr=0;var u=r.u(a,c,l);return e.__wrap(u)}return a(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.h(e)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}}]),a(e,[{key:"clause",value:function(e){var t=r.t(this.ptr,e);return m.__wrap(t)}},{key:"set_clause",value:function(e,t){s(e,m),r.v(this.ptr,e.ptr,t)}}]),e}(),h=function(){function e(t,n,o,a,c,l,u,s,f){i(this,e);var d=r.r(t,n,o,a,c,l,u,s,f);return e.__wrap(d)}return a(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.i(e)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}}]),a(e,[{key:"grid",value:function(){return r.q(this.ptr)}}]),e}(),b=function(){function e(){i(this,e)}return a(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.n(e)}},{key:"reset",value:function(){r.F(this.ptr)}},{key:"tick",value:function(){r.K(this.ptr)}},{key:"rule",value:function(e){var t=r.G(this.ptr,e);return y.__wrap(t)}},{key:"clause",value:function(e,t){var n=r.x(this.ptr,e,t);return m.__wrap(n)}},{key:"set_rule",value:function(e,t){s(e,y),r.I(this.ptr,e.ptr,t)}},{key:"set_clause",value:function(e,t,n){s(e,m),r.H(this.ptr,e.ptr,t,n)}},{key:"width",value:function(){return r.L(this.ptr)}},{key:"height",value:function(){return r.z(this.ptr)}},{key:"cells",value:function(){return r.w(this.ptr)}},{key:"paint",value:function(e,t,n,i){r.C(this.ptr,e,t,n,i)}},{key:"push_undo",value:function(){r.E(this.ptr)}},{key:"pop_undo",value:function(){r.D(this.ptr)}},{key:"flush_undos",value:function(){r.y(this.ptr)}},{key:"set_time",value:function(e){r.J(this.ptr,e)}},{key:"inc_time",value:function(){r.A(this.ptr)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}},{key:"new",value:function(t,n){var i=r.B(t,n);return e.__wrap(i)}}]),e}(),g="function"==typeof Math.random?Math.random:(f="Math.random",function(){throw new Error("".concat(f," is not defined"))}),w=function(e,t){throw new Error(u(e,t))}}).call(this,n(35)(e))},41:function(e,t){},43:function(e,t){},53:function(e,t){e.exports="precision highp float;\n#define GLSLIFY 1\nuniform float t;\nuniform float skyTime;\n\nuniform float dpi;\nuniform vec2 resolution;\nuniform bool isSnapshot;\nuniform sampler2D backBuffer;\nuniform sampler2D dataTexture;\n\nvarying vec2 uv;\nconst float PI2 = 2. * 3.14159265358979323846;\n\n// clang-format off\nvec3 hsv2rgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_0(vec4 x) {\n     return mod289_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_0(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_0 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_0;\n  vec3 i1 = min( g_0.xyz, l.zxy );\n  vec3 i2 = max( g_0.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_0(i);\n  vec4 p = permute_0( permute_0( permute_0(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_1(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_1(vec3 x) {\n  return mod289_1(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_1(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_1(i); // Avoid truncation effects in permutation\n  vec3 p = permute_1( permute_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n// clang-format on\n\nvoid main() {\n  vec2 guv = uv;\n  vec3 color;\n  vec2 grid = floor(guv * (resolution / (dpi * 2.)));\n\n  grid = floor(guv * (resolution / dpi));\n\n  float noise = snoise_0(vec3(grid, t * 0.05));\n\n  vec2 textCoord = (guv * vec2(0.5, -0.5)) + vec2(0.5);\n\n  vec4 data = texture2D(dataTexture, textCoord);\n  vec4 last = texture2D(backBuffer, vec2(textCoord.x, 1.0 - textCoord.y));\n\n  int type = int((data.r * 255.) + 0.1);\n  float energy = data.g;\n  float age = data.b;\n\n  float hue = 0.0;\n  float saturation =  0.3 + (energy*1.9) + (age *0.2) ;\n  float lightness = 0.7 - energy * .1;\n  float a = 1.0;\n  float brightness = 0.0;\n\n  if (type == 0) { // Air\n    hue = 0.0;\n    saturation = 0.1;\n    a = 0.0 ;\n    if (isSnapshot) {\n    lightness = 1.0;\n\n      a = 0.9;\n    }\n  } else if (type == 1) { // Glass\n    hue = 0.1;\n    saturation *= 0.3;\n    // lightness = 0.7;\n  } else if (type == 2) { // Sand\n    hue = 0.1;\n    lightness += 0.1;\n  } else if (type == 3) { // plant\n    hue = 0.4;\n    saturation += 0.2;\n    // lightness-=0.1;\n  } else if (type == 4) { // water\n    hue = 0.58;\n    // saturation -= 0.05;\n    lightness -= noise * 0.1;\n    // a = 0.9;\n    if (isSnapshot) {\n      a = 1.0;\n    }\n  } else if (type == 5) { // fire\n    hue = 0.05 + (noise * -0.1);\n    saturation += 0.2;\n\n   lightness = 0.65+ energy * 1.7;\n\n    //  * (noise + 0.5);\n    if (isSnapshot) {\n      hue += -0.1;\n    }\n\n  } else if (type == 6) { // purple\n    hue = 0.8;\n    lightness += 0.2;\n    hue += energy * 0.2;\n  }\n  if (isSnapshot == false) {\n    lightness *= (0.975 + snoise_1(floor(guv * resolution / dpi)) * 0.15);\n  }\n  saturation = min(saturation, 1.0);\n  lightness = min(lightness, 1.0);\n  color = hsv2rgb(vec3(hue, saturation, lightness));\n  // a = 1.0;\n  // if (last.a > 0.7) {\n  //   color.rgb = last.rgb;\n  //   a = last.a * 0.95;\n  // }\n  // color.rgb = max(color.rgb, last.rgb * 0.97);\n\n  gl_FragColor = vec4(color, a);\n}"},54:function(e,t){e.exports='\n// boring "pass-through" vertex shader\nprecision mediump float;\n#define GLSLIFY 1\nattribute vec2 position;\nvarying vec2 uv;\nvoid main() {\n  uv = position;\n  gl_Position = vec4(position, 0, 1);\n}'},55:function(e,t){var n=window.setTimeout((function(){window.UI.state.tutorialProgress>3&&document.body.classList.add("faded")}),3e4),r=function(e){window.clearTimeout(n),document.body.classList.remove("faded"),n=window.setTimeout((function(){window.UI.state.tutorialProgress>3&&document.body.classList.add("faded")}),3e4)};document.body.addEventListener("mousemove",r),document.body.addEventListener("touchstart",r)}}]);
//# sourceMappingURL=2.bd58c7b7265a67330827.js.map