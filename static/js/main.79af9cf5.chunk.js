(this["webpackJsonpshiriev-2048"]=this["webpackJsonpshiriev-2048"]||[]).push([[0],[,,,,,,,,,,,function(e,t,n){e.exports=n(24)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),a=n(10),r=(n(16),n(6)),c=n(8),l=(n(17),n(26)),s=n(1),u=n(2);n(18),n(19);function f(e){var t=e.cell,n=t.value,i=t.position,a={"--position-x":i.x,"--position-y":i.y};return o.a.createElement("div",{style:a,className:"block block_value_".concat(n)},o.a.createElement("span",{className:"block__text block__text_digits-count_".concat(n.toString().length)},n||null))}var h=function e(){Object(s.a)(this,e)},v=n(4),m=n(3),p=n(5),d=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(v.a)(this,Object(m.a)(t).call(this))).cell=void 0,n.cell=e,n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"clone",value:function(){return new t(this.cell.clone())}}]),t}(h),b=function(e){function t(){return Object(s.a)(this,t),Object(v.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"clone",value:function(){return new t}}]),t}(h),w=function(e){function t(e,n,i){var o;return Object(s.a)(this,t),(o=Object(v.a)(this,Object(m.a)(t).call(this))).firstCell=void 0,o.secondCell=void 0,o.newCell=void 0,o.firstCell=e,o.secondCell=n,o.newCell=i,o}return Object(p.a)(t,e),Object(u.a)(t,[{key:"clone",value:function(){return new t(this.firstCell.clone(),this.secondCell.clone(),this.newCell.clone())}}]),t}(h),y=function(e){function t(e,n,i){var o;return Object(s.a)(this,t),(o=Object(v.a)(this,Object(m.a)(t).call(this))).value=void 0,o.oldPosition=void 0,o.newPosition=void 0,o.value=e,o.oldPosition=n,o.newPosition=i,o}return Object(p.a)(t,e),Object(u.a)(t,[{key:"clone",value:function(){return new t(this.value,this.oldPosition.clone(),this.newPosition.clone())}}]),t}(h),O=function(e){function t(){return Object(s.a)(this,t),Object(v.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"clone",value:function(){return new t}}]),t}(h),_=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(v.a)(this,Object(m.a)(t).call(this))).cells=void 0,n.cells=e,n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"clone",value:function(){return new t(this.cells)}}]),t}(h),j=function(){function e(t,n){Object(s.a)(this,e),this.cell=void 0,this.id=void 0,this.cell=t,this.id=n}return Object(u.a)(e,[{key:"clone",value:function(){return new e(this.cell.clone(),this.id)}}]),e}();function k(e){var t=e.mapAnimationParams,n=e.mapDimension;return o.a.createElement("div",{className:"map",style:{"--map-dimension":n}},t.cells.map((function(e){return o.a.createElement(f,{key:e.id,cell:e.cell})})))}n(20);function E(e){var t=e.title,n=e.value;return o.a.createElement("div",{className:"counter"},o.a.createElement("div",{className:"counter__title"},t),o.a.createElement("div",{className:"counter__value"},n))}n(21);function g(e){return o.a.createElement("div",{className:"modal"},o.a.createElement("div",{className:"modal__content"},o.a.createElement("h1",{className:"modal__title"},e.title),e.children))}n(22);function C(e){return o.a.createElement("div",{className:"button",onClick:e.onClick},e.title)}var x;n(23);function D(e){var t=e.children,n=e.link;return o.a.createElement("h1",{className:"title"},o.a.createElement("a",{href:n},t))}!function(e){e[e.Up=0]="Up",e[e.Down=1]="Down",e[e.Left=2]="Left",e[e.Right=3]="Right"}(x||(x={}));var R=x,L=function(){function e(t,n){Object(s.a)(this,e),this.x=0,this.y=0,this.x=t,this.y=n}return Object(u.a)(e,[{key:"equals",value:function(e){return e.x===this.x&&e.y===this.y}},{key:"clone",value:function(){return new e(this.x,this.y)}}]),e}(),N=function(){function e(t,n){Object(s.a)(this,e),this.value=void 0,this.position=void 0,this.value=t,this.position=n}return Object(u.a)(e,[{key:"clone",value:function(){return new e(this.value,this.position.clone())}}]),e}(),P=function e(){Object(s.a)(this,e),this.cells=[],this.score=0,this.stepCount=0,this.mapDimension=0},A=function(){function e(t,n){if(Object(s.a)(this,e),this._cells=[],this._actions=[],this._score=0,this._stepCount=0,this._mapDimension=void 0,this._randomize=void 0,t<2)throw new RangeError("mapDimension shouldn`t be lower than 2");if(!n)throw new TypeError("randomize shouldn`t be null");this._mapDimension=t,this._randomize=n}return Object(u.a)(e,[{key:"load",value:function(e){return this._actions=[],this._cells=e.cells,this._mapDimension=e.mapDimension,this._score=e.score,this._stepCount=e.stepCount,[new _(e.cells)]}},{key:"save",value:function(){var e=new P;return e.cells=this._cells.map((function(e){return e.clone()})),e.mapDimension=this.mapDimension,e.score=this._score,e.stepCount=this._stepCount,e}},{key:"restart",value:function(){this._cells=[],this._score=0,this._stepCount=0;var e=new O;return this._actions.push(e),[e]}},{key:"canDoMove",value:function(){if(this._cells.length<this.mapDimension*this.mapDimension)return!0;for(var e=this.matrix,t=0;t<e.length;t++)for(var n=0;n<e.length-1;n++)if(e[t][n]===e[t][n+1]||e[n][t]===e[n+1][t])return!0;return!1}},{key:"getPointTransform",value:function(e,t){switch(t){case R.Left:return{from:function(e){return e},to:function(e){return e}};case R.Right:return{from:function(t){return new L(e-t.x-1,t.y)},to:function(t){return new L(e-t.x-1,t.y)}};case R.Up:return{from:function(e){return new L(e.y,e.x)},to:function(e){return new L(e.y,e.x)}};case R.Down:return{from:function(t){return new L(e-t.y-1,t.x)},to:function(t){return new L(t.y,e-t.x-1)}}}}},{key:"dropCell",value:function(e){this._cells.splice(this._cells.indexOf(e),1)}},{key:"move",value:function(e){for(var t,n=this,i=[],o=this.getPointTransform(this.mapDimension,e),a=o.from,c=o.to,l=function(e){for(var t=n._cells.filter((function(t){return a(t.position).y===e})).sort((function(e,t){return a(e.position).x-a(t.position).x})),o=0,r=0;r<t.length;r++){var l=t[r],s=r+1<t.length?t[r+1]:null;if(null!==s&&l.value===s.value){n.dropCell(l),n.dropCell(s);var u=2*l.value,f=new N(u,c(new L(o,e)));n._cells.push(f);var h=new w(l,s,f);i.push(h),n._score+=u,r++}else if(o<a(l.position).x){var v=l.position.clone();l.position=c(new L(o,a(l.position).y));var m=l.position.clone(),p=new y(l.value,v,m);i.push(p)}o++}},s=0;s<this.mapDimension;s++)l(s);if(i.length<=0)return[];this._stepCount++,(t=this._actions).push.apply(t,i);var u=this.addCell();return i.push.apply(i,Object(r.a)(u)),this.canDoMove()||i.push(new b),i}},{key:"addCell",value:function(){for(var e=this,t=function(){var t=e._randomize.getRandomPosition(e.mapDimension);if(!e._cells.some((function(e){return e.position.equals(t)}))){var n=e._randomize.getRandomCellValue(),i=new N(n,t);e._cells.push(i);var o=new d(i);return e._actions.push(o),{v:[o]}}};;){var n=t();if("object"===typeof n)return n.v}}},{key:"matrix",get:function(){var e=this,t=Array(this.mapDimension).fill([]).map((function(){return Array(e.mapDimension).fill(0)})),n=!0,i=!1,o=void 0;try{for(var a,r=this._cells[Symbol.iterator]();!(n=(a=r.next()).done);n=!0){var c=a.value;t[c.position.y][c.position.x]=c.value}}catch(l){i=!0,o=l}finally{try{n||null==r.return||r.return()}finally{if(i)throw o}}return t}},{key:"score",get:function(){return this._score}},{key:"stepCount",get:function(){return this._stepCount}},{key:"maxValue",get:function(){return this._cells.length>0?Math.max.apply(Math,Object(r.a)(this._cells.map((function(e){return e.value})))):0}},{key:"mapDimension",get:function(){return this._mapDimension}},{key:"isEnd",get:function(){return!this.canDoMove()}}]),e}(),M=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,[{key:"getRandomPosition",value:function(e){return new L(this.getRandomIntInclusive(0,e-1),this.getRandomIntInclusive(0,e-1))}},{key:"getRandomCellValue",value:function(){return this.getRandomIntInclusive(0,5)>0?2:4}},{key:"getRandomIntInclusive",value:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}}]),e}(),I=function(e,t){S(e),U(e,t)},S=function(e){Object(i.useEffect)((function(){var t=function(t){var n;switch(t.key){case"ArrowUp":n=R.Up;break;case"ArrowDown":n=R.Down;break;case"ArrowLeft":n=R.Left;break;case"ArrowRight":n=R.Right;break;default:return}e(n)};return document.addEventListener("keydown",t,!1),function(){return document.removeEventListener("keydown",t,!1)}}),[e])},U=function(e,t){Object(i.useEffect)((function(){var n=t.current;if(n){var i=null,o=null,a=function(e){i=e.touches[0].clientX,o=e.touches[0].clientY},r=function(t){if(i&&o){var n=t.touches[0].clientX,a=t.touches[0].clientY,r=i-n,c=o-a;Math.abs(r)>Math.abs(c)?e(r>0?R.Left:R.Right):e(c>0?R.Up:R.Down),i=null,o=null}};return n.addEventListener("touchstart",a,!1),n.addEventListener("touchmove",r,!1),function(){n.removeEventListener("touchstart",a,!1),n.removeEventListener("touchmove",r,!1)}}}),[e,t])},z=function(e){Object(i.useEffect)((function(){var t=function(t){return e(),!1};return window.addEventListener("unload",t),function(){window.removeEventListener("unload",t,!1)}}),[e])},q=4,T=2,V=function(){var e=Object(l.a)(["LogicState"]),t=Object(c.a)(e,2),n=t[0],i=t[1],o=n.LogicState||null;o&&(o.cells=o.cells.map((function(e){return new N(e.value,new L(e.position.x,e.position.y))})));return[o,function(e){return i("LogicState",e)}]};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.render(i.createElement((function(){var e=Object(i.useState)(null),t=Object(c.a)(e,2),n=t[0],a=t[1],l=Object(i.useRef)(null),s=function(){var e=Object(i.useRef)([]),t=Object(i.useRef)(0),n=Object(i.useState)([]),o=Object(c.a)(n,2),a=o[0],l=o[1],s=Object(i.useCallback)((function(e,t){var n=e.find((function(e){return e.cell.position.equals(t)}));if(void 0===n)throw new Error("");return n}),[]);return{mapAnimationParams:{cells:a},sendActions:Object(i.useCallback)((function(n){var i=Object(r.a)(e.current),o=!0,a=!1,c=void 0;try{for(var u,f=n[Symbol.iterator]();!(o=(u=f.next()).done);o=!0){var h=u.value;if(h instanceof d)i.push(new j(h.cell.clone(),t.current++));else if(h instanceof y){s(e.current,h.oldPosition).cell.position=h.newPosition.clone()}else if(h instanceof w){var v=s(e.current,h.firstCell.position);s(e.current,h.secondCell.position).cell=h.newCell.clone(),i.splice(i.indexOf(v),1)}else h instanceof O?i.length=0:h instanceof _&&(i=h.cells.map((function(e){return new j(e.clone(),t.current++)})))}}catch(m){a=!0,c=m}finally{try{o||null==f.return||f.return()}finally{if(a)throw c}}e.current=i,l(e.current)}),[s])}}(),u=s.mapAnimationParams,f=s.sendActions,h=V(),v=Object(c.a)(h,2),m=v[0],p=v[1];Object(i.useEffect)((function(){if(m){var e=new A(q,new M),t=e.load(m);a(e),f(t)}else{for(var n=new A(q,new M),i=[],o=0;o<T;o++){var c=n.addCell();i.push.apply(i,Object(r.a)(c))}a(n),f(i)}}),[f,m]);var b=function(){if(null!==n){for(var e=n.restart(),t=0;t<T;t++){var i=n.addCell();e.push.apply(e,Object(r.a)(i))}f(e)}};return I((function(e){if(null!==n){var t=n.move(e);f(t)}}),l),z((function(){n&&p(n.save())})),n&&o.a.createElement("div",{className:"app"},o.a.createElement("div",{ref:l,className:"app__map"},o.a.createElement(k,{mapDimension:n.mapDimension,mapAnimationParams:u})),o.a.createElement("div",{className:"app__title"},o.a.createElement(D,{link:"https://github.com/shiriev/shiriev-2048/"},"2048")),o.a.createElement("div",{className:"app__score"},o.a.createElement(E,{title:"\u043e\u0447\u043a\u0438",value:n.score})),o.a.createElement("div",{className:"app__step-count"},o.a.createElement(E,{title:"\u0445\u043e\u0434\u044b",value:n.stepCount})),o.a.createElement("div",{className:"app__restart-button"},o.a.createElement(C,{title:"\u0440\u0435\u0441\u0442\u0430\u0440\u0442",onClick:b})),n.isEnd&&o.a.createElement(g,{title:"\u0418\u0433\u0440\u0430 \u043e\u043a\u043e\u043d\u0447\u0435\u043d\u0430"},o.a.createElement("p",null,"\u0425\u043e\u0442\u0438\u0442\u0435 \u0441\u044b\u0433\u0440\u0430\u0442\u044c \u0435\u0449\u0451?"),o.a.createElement(C,{title:"\u0440\u0435\u0441\u0442\u0430\u0440\u0442",onClick:b})))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[11,1,2]]]);
//# sourceMappingURL=main.79af9cf5.chunk.js.map