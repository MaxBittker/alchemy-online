(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1:function(e,t,n){"use strict";n.r(t);var r=n(29),i=n(14),a=n.n(i),o=n(8),l=(n(48),n(45));n(46);window.memory=o.s;var s=n(65),c=n(66),u=function(e){var t,n=e.canvas,r=e.universe,i=e.isSnapshot,a=void 0!==i&&i,u=e.gl,d=(t=l(u?{gl:u,attributes:{preserveDrawingBuffer:a}}:{canvas:n,attributes:{preserveDrawingBuffer:a}})).texture(),f=r.width(),m=r.height(),p=r.cells(),v=new Uint8Array(o.s.buffer,p,f*m*4),h=t.texture({width:f,height:m,data:v}),y=t({blend:{enable:!0,func:{srcRGB:"src alpha",srcAlpha:1,dstRGB:"one minus src alpha",dstAlpha:1},equation:{rgb:"add",alpha:"add"},color:[0,0,0,0]},frag:s,uniforms:{t:function(e){return e.tick},dataTexture:function(){return p=r.cells(),v=new Uint8Array(o.s.buffer,p,f*m*4),h({width:f,height:m,data:v})},resolution:function(e){return[e.viewportWidth,e.viewportHeight]},dpi:2,isSnapshot:a,backBuffer:d},vert:c,attributes:{position:[[-1,4],[-1,-1],[4,-1]]},count:3});return{regl:t,draw:function(){t.poll(),y()}}},d=n(11),f=n.n(d),m=n(12),p=n.n(m),v=new(function(){function e(){f()(this,e),this.fps=document.getElementById("fps"),this.frames=[],this.lastFrameTimeStamp=performance.now()}return p()(e,[{key:"render",value:function(){var e=performance.now(),t=e-this.lastFrameTimeStamp;this.lastFrameTimeStamp=e;var n=1/t*1e3;this.frames.push(n),this.frames.length>30&&this.frames.shift();for(var r=1/0,i=-1/0,a=0,o=0;o<this.frames.length;o++)a+=this.frames[o],r=Math.min(this.frames[o],r),i=Math.max(this.frames[o],i);var l=a/this.frames.length;this.fps.textContent="FPS:".concat(Math.round(l).toString().padStart(3))}}]),e}()),h=n(67),y=n.n(h),x=document.getElementById("sand-canvas");var g=function(e,t){return Math.sqrt(Math.pow(e.clientX-t.clientX,2)+Math.pow(e.clientY-t.clientY,2),2)},w=function(e){var t=function(e){return Math.sqrt(Math.pow(e.clientX,2)+Math.pow(e.clientY,2),2)}(e);return{clientX:e.clientX/t,clientY:e.clientY/t}},b=function(e,t){return{clientX:e.clientX*t,clientY:e.clientY*t}},E=function(e,t){return{clientX:e.clientX+t.clientX,clientY:e.clientY+t.clientY}},k=function(e,t){return{clientX:e.clientX-t.clientX,clientY:e.clientY-t.clientY}},W=!1,_=null,S=null;function M(e){clearInterval(S),S=window.setInterval((function(){return z(e)}),100);var t={clientX:e.clientX,clientY:e.clientY};if(W){var n=0;if(z(t),_&&window.UI.state.selectedElement!=r.d.Fish&&window.UI.state.selectedElement!=r.d.GoldFish)for(;g(t,_)>2/3;){var i=g(t,_);if(t=E(t,b(w(k(_,e)),Math.min(2/3,i))),++n>1e3)break;z(t)}_=e}}x.addEventListener("mousedown",(function(e){e.preventDefault(),Ee.push_undo(),W=!0,clearInterval(S),S=window.setInterval((function(){return z(e)}),100),z(e),_=e})),document.body.addEventListener("mouseup",(function(e){clearInterval(S),W&&(e.preventDefault(),_=null,W=!1)})),x.addEventListener("mousemove",(function(e){clearInterval(S),M(e)})),x.addEventListener("mouseleave",(function(e){clearInterval(S),_=null})),x.addEventListener("touchstart",(function(e){e.cancelable&&e.preventDefault();Array.from(e.touches);Ee.push_undo(),W=!0,_=e,C(e)})),x.addEventListener("touchend",(function(e){e.cancelable&&e.preventDefault(),_=null,W=!1,clearInterval(S)})),x.addEventListener("touchmove",(function(e){window.paused||e.cancelable&&e.preventDefault(),clearInterval(S),C(e)}));var C=function(e){var t=Array.from(e.touches);1==t.length?M(t[0]):t.forEach(z)};var z=function(e){if(W){var t=function(e){var t=x.getBoundingClientRect();t={left:t.left+28,top:t.top+28,width:t.width-56,height:t.height-56};var n=x.width/(ge*Math.ceil(window.devicePixelRatio))/t.width,r=x.height/(ge*Math.ceil(window.devicePixelRatio))/t.height,i=(e.clientX-t.left)*n,a=(e.clientY-t.top)*r;return[Math.min(Math.floor(i),we-1),Math.min(Math.floor(a),be-1)]}(e),n=y()(t,2),r=n[0],i=n[1];if(!(window.UI.state.selectedElement<0)){Ee.paint(r,i,4,window.UI.state.selectedElement)}}},D=(n(71),n(72)),R=n.n(D),I=n(74),A=n.n(I);function L(e){return new Promise((function(t){return setTimeout(t,e)}))}function N(e,t){return T.apply(this,arguments)}function T(){return(T=A()(R.a.mark((function e(t,n){var i,a,o,l,s,c,u;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=0;case 1:if(!(i<=1.7*t)){e.next=15;break}a=6;case 3:if(!(a>=1)){e.next=12;break}return o=i-4*a,universe.paint(t/2,n/2,o+5,r.d.Empty),universe.paint(t/2,n/2,o,a),e.next=9,L(16);case 9:a-=1,e.next=3;break;case 12:i+=28,e.next=1;break;case 15:l=0;case 16:if(!(l<=t-2)){e.next=23;break}return universe.paint(t/2,n/2,l-5,r.d.Empty),e.next=20,L(8);case 20:l+=2,e.next=16;break;case 23:s=0;case 24:if(!(s<=180)){e.next=34;break}return c=(t/2+10)*Math.cos(s*(Math.PI/180)),u=(n/2+10)*Math.sin(s*(Math.PI/180)),universe.paint(t/2+c,n/2+u,20,r.d.Empty),universe.paint(t/2-c,n/2-u,20,r.d.Empty),e.next=31,L(8);case 31:s+=2,e.next=24;break;case 34:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var U,q=n(2),P=n.n(q),j=n(76),O=n.n(j),Y=n(20),F=n(28),B=function(){return P.a.createElement("div",{className:"welcome-scrim"},P.a.createElement("div",{className:"Info window"},P.a.createElement("div",{className:"title-bar"},P.a.createElement("div",{className:"title-bar-text"},"Information"),P.a.createElement("div",{className:"title-bar-controls"},P.a.createElement(Y.b,{to:"/"},P.a.createElement("button",{"aria-label":"Minimize"})),P.a.createElement("button",{"aria-label":"Maximize"}),P.a.createElement(Y.b,{to:"/"},P.a.createElement("button",{"aria-label":"Close"}," ")))),P.a.createElement("div",{className:"window-body "})))},G=n(24),X=n.n(G),H=n(26),K=n.n(H),Q=n(25),J=n.n(Q),V=n(27),Z=n.n(V),$=function(e){var t=e.close,n=e.children;return P.a.createElement("div",{className:"welcome-scrim"},P.a.createElement("div",{id:"welcome"},n,P.a.createElement(Y.b,{to:"/",className:"x",onClick:t},P.a.createElement("button",null," x"))))},ee=n(40),te=n.n(ee),ne=n(89),re=n.n(ne),ie=n(90),ae=n.n(ie),oe=(U={},ae()(U,r.d.Empty,"🜂"),ae()(U,r.d.Rule1,"🝊"),ae()(U,r.d.Rule2,"☉"),ae()(U,r.d.Rule3,"☽"),ae()(U,r.d.Rule4,"🜛"),ae()(U,r.d.Rule5,"🜝"),ae()(U,r.d.Rule6,"🜏"),U),le=[{key:r.e.Horizontal,symbol:"🜕"},{key:r.e.Quad,symbol:"🜨"}],se=[{key:r.d.Empty,symbol:oe[r.d.Empty]},{key:r.d.Wild,symbol:"*"},{key:r.d.Rule1,symbol:oe[r.d.Rule1]},{key:r.d.Rule2,symbol:oe[r.d.Rule2]},{key:r.d.Rule3,symbol:oe[r.d.Rule3]},{key:r.d.Rule4,symbol:oe[r.d.Rule4]},{key:r.d.Rule5,symbol:oe[r.d.Rule5]},{key:r.d.Rule6,symbol:oe[r.d.Rule6]}];function ce(e,t){return 3*t+e}var ue=function(e){function t(e){return f()(this,t),X()(this,K()(t).call(this,e))}return Z()(t,e),p()(t,[{key:"gridSquare",value:function(e,t,n,i){var a=this,o=this.props,l=o.grid,s=o.options,c=o.selectedElement,u=n&&i,d=l[ce(e,t)];u&&(d=c);var f=s.find((function(e){return e.key==d})).symbol,m=function(n){if(!u){var o=a.props,l=o.grid,s=o.options,c=s.findIndex((function(e){return e.key==d}));c=(c+s.length+n)%s.length,i&&c==s.findIndex((function(e){return e.key===r.d.Wild}))&&(c=(c+s.length+n)%s.length);var f=s[c];l[ce(e,t)]=f.key,(0,a.props.setGrid)(l)}};return P.a.createElement("g",{key:"".concat(e,"-").concat(t),transform:"translate(".concat(51*e,",").concat(51*t,")"),className:u?"disabled":"",onContextMenu:function(e){e.preventDefault(),m(-1)},onClick:function(){return m(1)},onDrop:function(n){if(!u){var r=n.dataTransfer.getData("text"),i=parseInt(r,10);if(se.find((function(e){return e.key==i})))l[ce(e,t)]=i,(0,a.props.setGrid)(l)}},onDragOver:function(e){return e.preventDefault()}},P.a.createElement("foreignObject",{x:2,y:2,width:50,height:50},P.a.createElement("button",{className:"mat-box",draggable:"true",style:{width:48,height:48,filter:"saturate(0.8)",color:"*"==f?"#888":"black",backgroundColor:"*"==f?"#b0b0b055":window.pallette[d],borderColor:"*"==f?"#b0b0b055":window.pallette[d],backgroundImage:'url("assets/paper.png")',backgroundSize:"100px 100px",borderWidth:3,fontSize:"30px",borderStyle:" outset",lineHeight:0,verticalAlign:"middle"},onDragStart:function(e){e.dataTransfer.setData("text/plain",d)}},u||"?"==f?oe[c]:f)))}},{key:"render",value:function(){var e=this.props.isSelector;return P.a.createElement("g",null,[this.gridSquare(0,0,e),this.gridSquare(0,1,e),this.gridSquare(0,2,e),this.gridSquare(1,0,e),this.gridSquare(1,1,e,!0),this.gridSquare(1,2,e),this.gridSquare(2,0,e),this.gridSquare(2,1,e),this.gridSquare(2,2,e)])}}]),t}(P.a.Component),de=[{p:0,symbol:" × "},{p:1,symbol:"   "}],fe=function(e){function t(e){var n;return f()(this,t),(n=X()(this,K()(t).call(this,e))).state={selectedElement:e.selectedElement,clause_index:e.clause_index,clause:t.getRule(e.selectedElement,e.clause_index)},window.Editor=J()(n),n}return Z()(t,e),p()(t,[{key:"setRule",value:function(){var e=this.state.clause,t=e.selector,n=e.effector,i=e.symmetry,o=e.probability,l=te()(r.c,a()(t)),s=te()(r.b,a()(n)),c=new r.a(o.p,le[i].key,l,s);window.u.set_clause(c,this.props.selectedElement,this.props.clause_index)}},{key:"incSymmetry",value:function(e){var t=this.state.clause,n=t.symmetry;t.symmetry=(le.length+n+e)%le.length,this.setState({clause:t},this.setRule)}},{key:"incProbability",value:function(e){var t=this.state.clause,n=t.probability,r=de.indexOf(n);r=(de.length+r+e)%de.length,console.log(de[r]),t.probability=de[r],this.setState({clause:t},this.setRule)}},{key:"render",value:function(){var e=this,t=this.props.selectedElement,n=this.state.clause,r=n.selector,i=n.effector,a=n.symmetry,o=n.probability;return P.a.createElement("div",{className:"MatrixMenu"},P.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"160px"},P.a.createElement("g",{transform:"translate(178,0)",className:"symmetry"},P.a.createElement("text",{x:"0",y:30,style:{fontSize:"30px",opacity:0==o.p?.2:1},onContextMenu:function(t){t.preventDefault(),e.incSymmetry(-1)},onClick:function(){return e.incSymmetry(1)}},le[a].symbol),P.a.createElement("image",{x:"-10",y:"65",href:"assets/gold_arrow.png",height:"28",width:"23",style:{opacity:"×"==o.p?"0.7":"1.0"}}),P.a.createElement("text",{x:"0",y:"80",style:{fontSize:"45px",fill:"#d03f41"},onContextMenu:function(t){t.preventDefault(),e.incProbability(-1)},onClick:function(){return e.incProbability(1)}},o.symbol)),P.a.createElement("g",{className:re()({disabled:0==o.p},"clause")},P.a.createElement("g",{transform:"translate(-2,0)"},r&&P.a.createElement(ue,{selectedElement:t,options:se,grid:r,isSelector:!0,setGrid:function(t){var n=e.state.clause;n.selector=t,e.setState({clause:n},e.setRule)}})),P.a.createElement("g",{transform:"translate(202,0)"},i&&P.a.createElement(ue,{selectedElement:t,options:se,grid:i,setGrid:function(t){var n=e.state.clause;n.effector=t,e.setState({clause:n},e.setRule)}})))))}}],[{key:"getRule",value:function(e,t){var n=window.u.clause(e,t),r=Array.from(new Uint8Array(memory.buffer,n.selector.grid(),9)).slice(0),i=Array.from(new Uint8Array(memory.buffer,n.effector.grid(),9)).slice(0),a=n.symmetry(),o=n.probability();return{selector:r,effector:i,symmetry:a,probability:de.find((function(e){return e.p==o}))}}},{key:"getDerivedStateFromProps",value:function(e,n){var r=e.selectedElement,i=e.clause_index;return r!=n.selectedElement&&r<=6?{selectedElement:r,clause:t.getRule(r,i)}:null}}]),t}(P.a.Component);function me(e,t){var n=new r.c(r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,e,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild),i=new r.b(r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,e,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild),a=new r.a(de[1].p,le[0].key,n,i);universe.set_clause(a,e,t)}function pe(e,t){for(var n=window.u.clause(e,t),i=Array.from(new Uint8Array(o.s.buffer,n.selector.grid(),9)).slice(0),l=Array.from(new Uint8Array(o.s.buffer,n.effector.grid(),9)).slice(0),s=n.symmetry(),c=n.probability(),u=[e,e,e,e,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,e,e,e,e,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Empty,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,r.d.Wild,1,2,3,4,5,6],d=Math.floor(3*Math.random()),f=Math.floor(3*Math.random());1==d&&1==f;)d=Math.floor(3*Math.random()),f=Math.floor(3*Math.random());i[ce(d,f)]=u[Math.floor(Math.random()*u.length)],l[ce(d=Math.floor(3*Math.random()),f=Math.floor(3*Math.random()))]=u[Math.floor(Math.random()*u.length)],Math.random()>.9&&(s=s==r.e.Quad?r.e.Horizontal:r.e.Quad);var m=te()(r.c,a()(i)),p=te()(r.b,a()(l));console.log(c,s);var v=new r.a(c,s,m,p);window.u.set_clause(v,e,t)}window.species=r.d;var ve=function(){var e=document.createElement("canvas"),t=Object.values(r.d).filter((function(e){return!isNaN(parseFloat(e))})),n=Math.max.apply(Math,a()(t))+1,i=r.f.new(n,1);e.width=n,e.height=3,i.reset(),t.forEach((function(e){return i.paint(e,0,2,e)})),i.paint(r.d.Empty,0,2,r.d.Empty),(0,u({universe:i,canvas:e,isSnapshot:!0}).draw)();var o=e.getContext("webgl"),l=new Uint8Array(4*n);o.readPixels(0,0,n,1,o.RGBA,o.UNSIGNED_BYTE,l);var s={};return t.forEach((function(e){var t=4*e,n="rgba(".concat(l[t],",").concat(l[t+1],", ").concat(l[t+2],", 0.9)");s[e]=n})),s}();window.pallette=ve;var he=Object.keys(r.d).filter((function(e){return e.length>2&&"Wild"!=e})),ye=function(e){function t(e){var n;return f()(this,t),(n=X()(this,K()(t).call(this,e))).state={submissionMenuOpen:!1,paused:!1,ff:!1,submitting:!1,size:1,dataURL:null,currentSubmission:null,selectedElement:r.d.Rule2},window.UI=J()(n),n}return Z()(t,e),p()(t,[{key:"componentDidUpdate",value:function(e){}},{key:"togglePause",value:function(){window.paused=!this.state.paused,this.setState({paused:!this.state.paused})}},{key:"toggleFF",value:function(){window.ff=!this.state.ff,this.setState({ff:!this.state.ff})}},{key:"play",value:function(){window.paused=!1,this.setState({paused:!1})}},{key:"pause",value:function(){window.paused=!0,this.setState({paused:!0})}},{key:"setSize",value:function(e,t){e.preventDefault(),this.setState({size:t})}},{key:"reset",value:function(){this.play(),this.setState({currentSubmission:null}),Me()}},{key:"closeMenu",value:function(){this.play(),this.setState({dataURL:null})}},{key:"upload",value:function(){console.log("saving");var e=new Uint8Array(o.s.buffer,Ee.cells(),we*be*4),t=document.createElement("canvas"),n=t.getContext("2d"),r=n.createImageData(we,be);t.height=be,t.width=we;for(var i=0;i<we*be*4;i++)r.data[i]=i%4==3?255:e[i];n.putImageData(r,0,0);var a=t.toDataURL("image/png");JSON.stringify(a)}},{key:"currentDateString",value:function(){var e=new Date;return"".concat(e.getMonth(),"-").concat(e.getDate())}},{key:"load",value:function(){console.log("loading")}},{key:"render",value:function(){var e=this,t=this.state,n=(t.ff,t.selectedElement),i=t.currentSubmission;t.paused,i&&i.id&&"#".concat(i.id);return P.a.createElement("div",{className:"window fade ",id:"HUD"},P.a.createElement("div",{className:"title-bar"}," ",P.a.createElement("div",{className:"title-bar-text"},"Alchemi Online"),P.a.createElement("div",{className:"title-bar-controls"},P.a.createElement("button",{onClick:function(){e.reset()}},"⏻"))),P.a.createElement("div",{className:"window-body hud-body"},P.a.createElement("div",{id:"hud-buttons",style:{backgroundColor:ve[n].replace("0.9","0.2")}},he.map((function(t){return function(e,t,n){var i=r.d[e],a=ve[i],o=i==t,l=e;return oe[i]&&(l=oe[i]),P.a.createElement("button",{className:o?"selected ".concat(e):e,key:e,draggable:!0,onClick:function(){n(i)},onDragStart:function(e){e.dataTransfer.setData("text/plain",i)},onDrop:function(e){var t=e.dataTransfer.getData("text");parseInt(t,10)==i&&n(i)},onDragOver:function(e){return e.preventDefault()},style:{background:"inherit",backgroundColor:a,borderColor:a,filter:o||"saturate(0.8) "}},"  ",l,"  ")}(t,n,(function(t){return e.setState({selectedElement:t})}))})),P.a.createElement("hr",{className:"chain-hr2"}),P.a.createElement(P.a.Fragment,null,P.a.createElement(fe,{selectedElement:n,clause_index:0}),P.a.createElement(fe,{selectedElement:n,clause_index:1}),P.a.createElement(fe,{selectedElement:n,clause_index:2}),P.a.createElement("div",{className:"hint"},"drag and drop tiles to construct rules"),P.a.createElement("button",{onClick:function(){var t=n;pe(n,0),pe(n,1),pe(n,2),e.setState({selectedElement:(n+1)%he.length},(function(){return e.setState({selectedElement:t})}))},id:"clear-button"}," ","Mutate"),P.a.createElement("button",{onClick:function(){var t=n;me(n,0),me(n,1),me(n,2),e.setState({selectedElement:(n+1)%he.length},(function(){return e.setState({selectedElement:t})}))},id:"clear-button"}," ","reset")),P.a.createElement("hr",{className:"chain-hr2"}),this.state.dataURL&&P.a.createElement($,{close:function(){return e.closeMenu()}},P.a.createElement("img",{src:this.state.dataURL,className:"submissionImg"}),P.a.createElement("div",{style:{display:"flex"}})))))}}]),t}(P.a.Component);function xe(){return P.a.createElement(Y.a,null,P.a.createElement(F.a,{path:"/",component:ye}),P.a.createElement(F.a,{exact:!0,path:"/info/",component:B}))}n.d(t,"canvas",(function(){return ke})),n.d(t,"width",(function(){return we})),n.d(t,"height",(function(){return be})),n.d(t,"ratio",(function(){return ge})),n.d(t,"universe",(function(){return Ee})),n.d(t,"reset",(function(){return Me}));var ge=8,we=100,be=100;Math.min(we,be);console.log(we,be);var Ee=r.f.new(we,be);window.u=Ee,window.universe=Ee,O.a.render(P.a.createElement(xe,null),document.getElementById("ui")),N(we,be);var ke=document.getElementById("sand-canvas");ke.width=we*ge*Math.ceil(window.devicePixelRatio),ke.height=be*ge*Math.ceil(window.devicePixelRatio);var We=document.getElementById("HUD"),_e=function(){var e=window.innerWidth,t=(window.innerHeight,""),n="";t="height: ".concat(Math.min(window.innerHeight-80-34,window.innerWidth-481),"px; margin:10px; margin-right: ").concat(401,"px; margin-left:auto;"),n="width: ".concat(361,"px; margin: 10px;"),e<600&&(n="margin: 40px 10px; margin-top:".concat(e+10,"px; margin-bottom: ").concat(34,"px ;padding-bottom: 40px"),t="width:".concat(e-80,"; height: ").concat(e-80,"px; top: 10px; margin:auto; margin-top:10px ; ")),We.style=n,ke.style=t};_e(),window.addEventListener("deviceorientation",_e,!0),window.addEventListener("resize",_e);var Se=u({canvas:ke,universe:Ee});function Me(){console.log("reseting"),N(we,be)}!function e(){for(var t=performance.now(),n=window.ff?100:1,r=0;r<n;r++){if(window.paused||(v.render(),Ee.tick()),performance.now()-t>16)break}window.t=0,Se.draw(),requestAnimationFrame(e)}(),window.UI.load()},29:function(e,t,n){"use strict";(function(e){n.d(t,"d",(function(){return f})),n.d(t,"e",(function(){return m})),n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return v})),n.d(t,"c",(function(){return y})),n.d(t,"f",(function(){return x})),n.d(t,"g",(function(){return g})),n.d(t,"h",(function(){return w}));var r=n(8);function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}var l=new("undefined"==typeof TextDecoder?(0,e.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});l.decode();var s=null;function c(e,t){return l.decode((null!==s&&s.buffer===r.s.buffer||(s=new Uint8Array(r.s.buffer)),s).subarray(e,e+t))}function u(e,t){if(!(e instanceof t))throw new Error("expected instance of ".concat(t.name));return e.ptr}var d,f=Object.freeze({Wild:11,11:"Wild",Empty:0,0:"Empty",Rule1:1,1:"Rule1",Rule2:2,2:"Rule2",Rule3:3,3:"Rule3",Rule4:4,4:"Rule4",Rule5:5,5:"Rule5",Rule6:6,6:"Rule6"}),m=Object.freeze({Horizontal:0,0:"Horizontal",Quad:1,1:"Quad"}),p=function(){function e(t,n,a,o){i(this,e),u(a,y);var l=a.ptr;a.ptr=0,u(o,v);var s=o.ptr;o.ptr=0;var c=r.o(t,n,l,s);return e.__wrap(c)}return o(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.b(e)}},{key:"probability",get:function(){return r.e(this.ptr)},set:function(e){r.k(this.ptr,e)}},{key:"symmetry",get:function(){return r.g(this.ptr)>>>0},set:function(e){r.m(this.ptr,e)}},{key:"selector",get:function(){var e=r.f(this.ptr);return y.__wrap(e)},set:function(e){u(e,y);var t=e.ptr;e.ptr=0,r.l(this.ptr,t)}},{key:"effector",get:function(){var e=r.d(this.ptr);return v.__wrap(e)},set:function(e){u(e,v);var t=e.ptr;e.ptr=0,r.j(this.ptr,t)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}}]),o(e,[{key:"symmetry",value:function(){return r.g(this.ptr)>>>0}},{key:"probability",value:function(){return r.e(this.ptr)}}],[{key:"new_null",value:function(){var t=r.p();return e.__wrap(t)}}]),e}(),v=function(){function e(t,n,a,o,l,s,c,u,d){i(this,e);var f=r.r(t,n,a,o,l,s,c,u,d);return e.__wrap(f)}return o(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.c(e)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}}]),o(e,[{key:"grid",value:function(){return r.q(this.ptr)}}]),e}(),h=function(){function e(t,n,a){i(this,e),u(t,p);var o=t.ptr;t.ptr=0,u(n,p);var l=n.ptr;n.ptr=0,u(a,p);var s=a.ptr;a.ptr=0;var c=r.u(o,l,s);return e.__wrap(c)}return o(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.h(e)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}}]),o(e,[{key:"clause",value:function(e){var t=r.t(this.ptr,e);return p.__wrap(t)}},{key:"set_clause",value:function(e,t){u(e,p),r.v(this.ptr,e.ptr,t)}}]),e}(),y=function(){function e(t,n,a,o,l,s,c,u,d){i(this,e);var f=r.r(t,n,a,o,l,s,c,u,d);return e.__wrap(f)}return o(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.i(e)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}}]),o(e,[{key:"grid",value:function(){return r.q(this.ptr)}}]),e}(),x=function(){function e(){i(this,e)}return o(e,[{key:"free",value:function(){var e=this.ptr;this.ptr=0,r.n(e)}},{key:"reset",value:function(){r.F(this.ptr)}},{key:"tick",value:function(){r.K(this.ptr)}},{key:"rule",value:function(e){var t=r.G(this.ptr,e);return h.__wrap(t)}},{key:"clause",value:function(e,t){var n=r.x(this.ptr,e,t);return p.__wrap(n)}},{key:"set_rule",value:function(e,t){u(e,h),r.I(this.ptr,e.ptr,t)}},{key:"set_clause",value:function(e,t,n){u(e,p),r.H(this.ptr,e.ptr,t,n)}},{key:"width",value:function(){return r.L(this.ptr)}},{key:"height",value:function(){return r.z(this.ptr)}},{key:"cells",value:function(){return r.w(this.ptr)}},{key:"paint",value:function(e,t,n,i){r.C(this.ptr,e,t,n,i)}},{key:"push_undo",value:function(){r.E(this.ptr)}},{key:"pop_undo",value:function(){r.D(this.ptr)}},{key:"flush_undos",value:function(){r.y(this.ptr)}},{key:"set_time",value:function(e){r.J(this.ptr,e)}},{key:"inc_time",value:function(){r.A(this.ptr)}}],[{key:"__wrap",value:function(t){var n=Object.create(e.prototype);return n.ptr=t,n}},{key:"new",value:function(t,n){var i=r.B(t,n);return e.__wrap(i)}}]),e}(),g="function"==typeof Math.random?Math.random:(d="Math.random",function(){throw new Error("".concat(d," is not defined"))}),w=function(e,t){throw new Error(c(e,t))}}).call(this,n(47)(e))},53:function(e,t){},55:function(e,t){},65:function(e,t){e.exports="precision highp float;\n#define GLSLIFY 1\nuniform float t;\nuniform float skyTime;\n\nuniform float dpi;\nuniform vec2 resolution;\nuniform bool isSnapshot;\nuniform sampler2D backBuffer;\nuniform sampler2D dataTexture;\n\nvarying vec2 uv;\nconst float PI2 = 2. * 3.14159265358979323846;\n\n// clang-format off\nvec3 hsv2rgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_0(vec4 x) {\n     return mod289_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_0(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_0 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_0;\n  vec3 i1 = min( g_0.xyz, l.zxy );\n  vec3 i2 = max( g_0.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_0(i);\n  vec4 p = permute_0( permute_0( permute_0(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_1(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_1(vec3 x) {\n  return mod289_1(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_1(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_1(i); // Avoid truncation effects in permutation\n  vec3 p = permute_1( permute_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n// clang-format on\n\nvoid main() {\n  vec2 guv = uv;\n  vec3 color;\n  vec2 grid = floor(guv * (resolution / (dpi * 2.)));\n\n  grid = floor(guv * (resolution / dpi));\n\n  float noise = snoise_0(vec3(grid, t * 0.05));\n  float slownoise = snoise_0(vec3(grid, t * 0.01));\n\n  vec2 textCoord = (guv * vec2(0.5, -0.5)) + vec2(0.5);\n\n  vec4 data = texture2D(dataTexture, textCoord);\n  vec4 last = texture2D(backBuffer, vec2(textCoord.x, 1.0 - textCoord.y));\n\n  int type = int((data.r * 255.) + 0.1);\n  float energy = data.g;\n  float age = data.b;\n\n  float hue = 0.0;\n  float saturation =  0.3 + (energy*1.9) + (age *0.2) ;\n  float lightness = 0.7 - energy * .1;\n  float a = 1.0;\n  float brightness = 0.0;\n\n  if (type == 0) { // Air\n    hue = 0.7;\n    saturation = 0.0;\n    \n    a = 0.0 ;\n    if (isSnapshot) {\n    lightness = 0.9;\n\n      a = 1.0;\n    }\n  } else if (type == 1) { // wall\n    hue = 0.1;\n    saturation *= 0.3;\n    lightness *= 0.5 ;\n    lightness += slownoise*0.4;\n  } else if (type == 2) { // Sand\n    hue = 0.1;\n    lightness += 0.1;\n  } else if (type == 3) { // plant\n    hue = 0.4;\n    saturation += 0.2;\n    lightness-=0.7*energy;\n  } else if (type == 4) { // water\n    hue = 0.58;\n    // saturation -= 0.05;\n    lightness -= noise * 0.1;\n    // a = 0.9;\n    if (isSnapshot) {\n      a = 1.0;\n    }\n  } else if (type == 5) { // fire\n    hue = 0.05 + (noise * -0.1);\n    saturation += 0.2;\n\n   lightness = 0.65+ energy * 1.7;\n\n    //  * (noise + 0.5);\n    if (isSnapshot) {\n      hue += -0.1;\n    }\n\n  } else if (type == 6) { // purple\n    hue = 0.8;\n    lightness += 0.2;\n    hue += energy * 0.2;\n  }\n  if (isSnapshot == false) {\n    lightness *= (0.975 + snoise_1(floor(guv * resolution / dpi)) * 0.15);\n  }\n  saturation = min(saturation, 1.0);\n  lightness = min(lightness, 1.0);\n  color = hsv2rgb(vec3(hue, saturation, lightness));\n\n  gl_FragColor = vec4(color, a);\n}"},66:function(e,t){e.exports='\n// boring "pass-through" vertex shader\nprecision mediump float;\n#define GLSLIFY 1\nattribute vec2 position;\nvarying vec2 uv;\nvoid main() {\n  uv = position;\n  gl_Position = vec4(position, 0, 1);\n}'},71:function(e,t){var n=window.setTimeout((function(){window.UI.state.tutorialProgress>3&&document.body.classList.add("faded")}),3e4),r=function(e){window.clearTimeout(n),document.body.classList.remove("faded"),n=window.setTimeout((function(){window.UI.state.tutorialProgress>3&&document.body.classList.add("faded")}),3e4)};document.body.addEventListener("mousemove",r),document.body.addEventListener("touchstart",r)},8:function(e,t,n){"use strict";var r=n.w[e.i];e.exports=r;n(29);r.M()}}]);
//# sourceMappingURL=2.976d70522002efbf9216.js.map