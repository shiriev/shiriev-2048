(this["webpackJsonpshiriev-2048"]=this["webpackJsonpshiriev-2048"]||[]).push([[0],[,,,,,,,,,,function(e,t,n){e.exports=n(22)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),a=n(9),r=(n(15),n(6)),c=n(7),l=(n(16),n(1)),s=n(2);n(17),n(18);function u(e){var t=e.cell,n=t.value,i=t.position,a={"--position-x":i.x,"--position-y":i.y};return o.a.createElement("div",{style:a,className:"block block_value_".concat(n)},o.a.createElement("span",{className:"block__text block__text_digits-count_".concat(n.toString().length)},n||null))}var h=function e(){Object(l.a)(this,e)},f=n(4),v=n(3),m=n(5),p=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(f.a)(this,Object(v.a)(t).call(this))).cell=void 0,n.cell=e,n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"clone",value:function(){return new t(this.cell.clone())}}]),t}(h),d=function(e){function t(){return Object(l.a)(this,t),Object(f.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"clone",value:function(){return new t}}]),t}(h),b=function(e){function t(e,n,i){var o;return Object(l.a)(this,t),(o=Object(f.a)(this,Object(v.a)(t).call(this))).firstCell=void 0,o.secondCell=void 0,o.newCell=void 0,o.firstCell=e,o.secondCell=n,o.newCell=i,o}return Object(m.a)(t,e),Object(s.a)(t,[{key:"clone",value:function(){return new t(this.firstCell.clone(),this.secondCell.clone(),this.newCell.clone())}}]),t}(h),y=function(e){function t(e,n,i){var o;return Object(l.a)(this,t),(o=Object(f.a)(this,Object(v.a)(t).call(this))).value=void 0,o.oldPosition=void 0,o.newPosition=void 0,o.value=e,o.oldPosition=n,o.newPosition=i,o}return Object(m.a)(t,e),Object(s.a)(t,[{key:"clone",value:function(){return new t(this.value,this.oldPosition.clone(),this.newPosition.clone())}}]),t}(h),w=function(e){function t(){return Object(l.a)(this,t),Object(f.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"clone",value:function(){return new t}}]),t}(h),_=function(){function e(t,n){Object(l.a)(this,e),this.cell=void 0,this.id=void 0,this.cell=t,this.id=n}return Object(s.a)(e,[{key:"clone",value:function(){return new e(this.cell.clone(),this.id)}}]),e}();function O(e){var t=e.mapAnimationParams,n=e.mapSize;return o.a.createElement("div",{className:"map",style:{"--map-size":n}},t.cells.map((function(e){return o.a.createElement(u,{key:e.id,cell:e.cell})})))}n(19);function j(e){var t=e.title,n=e.value;return o.a.createElement("div",{className:"counter"},o.a.createElement("div",{className:"counter__title"},t),o.a.createElement("div",{className:"counter__value"},n))}n(20);function k(e){return o.a.createElement("div",{className:"modal"},o.a.createElement("div",{className:"modal__content"},o.a.createElement("h1",{className:"modal__title"},e.title),e.children))}var g;n(21);function C(e){return o.a.createElement("div",{className:"button",onClick:e.onClick},e.title)}!function(e){e[e.Up=0]="Up",e[e.Down=1]="Down",e[e.Left=2]="Left",e[e.Right=3]="Right"}(g||(g={}));var E=g,x=function(){function e(t,n){Object(l.a)(this,e),this.x=0,this.y=0,this.x=t,this.y=n}return Object(s.a)(e,[{key:"equals",value:function(e){return e.x===this.x&&e.y===this.y}},{key:"clone",value:function(){return new e(this.x,this.y)}}]),e}(),z=function(){function e(t,n){Object(l.a)(this,e),this.value=void 0,this.position=void 0,this.value=t,this.position=n}return Object(s.a)(e,[{key:"clone",value:function(){return new e(this.value,this.position.clone())}}]),e}(),S=function e(){Object(l.a)(this,e),this.cells=[],this.actions=[],this.score=0,this.stepCount=0,this.mapSize=0},P=function(){function e(t,n){if(Object(l.a)(this,e),this._cells=[],this._actions=[],this._score=0,this._stepCount=0,this._mapSize=void 0,this._randomize=void 0,t<2)throw new RangeError("mapSize shouldn`t be lower than 2");if(!n)throw new TypeError("randomize shouldn`t be null");this._mapSize=t,this._randomize=n}return Object(s.a)(e,[{key:"load",value:function(e){this._actions=e.actions,this._cells=e.cells,this._mapSize=e.mapSize,this._score=e.score,this._stepCount=e.stepCount}},{key:"save",value:function(){var e=new S;return e.actions=this._actions.map((function(e){return e.clone()})),e.cells=this._cells.map((function(e){return e.clone()})),e.mapSize=this.mapSize,e.score=this._score,e.stepCount=this._stepCount,e}},{key:"restart",value:function(){this._cells=[],this._score=0,this._stepCount=0;var e=new w;return this._actions.push(e),[e]}},{key:"canDoMove",value:function(){if(this._cells.length<this.mapSize*this.mapSize)return!0;for(var e=this.matrix,t=0;t<e.length;t++)for(var n=0;n<e.length-1;n++)if(e[t][n]===e[t][n+1]||e[n][t]===e[n+1][t])return!0;return!1}},{key:"getPointTransform",value:function(e,t){switch(t){case E.Left:return{from:function(e){return e},to:function(e){return e}};case E.Right:return{from:function(t){return new x(e-t.x-1,t.y)},to:function(t){return new x(e-t.x-1,t.y)}};case E.Up:return{from:function(e){return new x(e.y,e.x)},to:function(e){return new x(e.y,e.x)}};case E.Down:return{from:function(t){return new x(e-t.y-1,t.x)},to:function(t){return new x(t.y,e-t.x-1)}}}}},{key:"dropCell",value:function(e){this._cells.splice(this._cells.indexOf(e),1)}},{key:"move",value:function(e){for(var t,n=this,i=[],o=this.getPointTransform(this.mapSize,e),a=o.from,c=o.to,l=function(e){for(var t=n._cells.filter((function(t){return a(t.position).y===e})).sort((function(e,t){return a(e.position).x-a(t.position).x})),o=0,r=0;r<t.length;r++){var l=t[r],s=r+1<t.length?t[r+1]:null;if(null!==s&&l.value===s.value){n.dropCell(l),n.dropCell(s);var u=2*l.value,h=new z(u,c(new x(o,e)));n._cells.push(h);var f=new b(l,s,h);i.push(f),n._score+=u,r++}else if(o<a(l.position).x){var v=l.position.clone();l.position=c(new x(o,a(l.position).y));var m=l.position.clone(),p=new y(l.value,v,m);i.push(p)}o++}},s=0;s<this.mapSize;s++)l(s);if(i.length<=0)return[];this._stepCount++,(t=this._actions).push.apply(t,i);var u=this.addCell();return i.push.apply(i,Object(r.a)(u)),this.canDoMove()||i.push(new d),i}},{key:"addCell",value:function(){for(var e=this,t=function(){var t=e._randomize.getRandomPosition(e.mapSize);if(!e._cells.some((function(e){return e.position.equals(t)}))){var n=e._randomize.getRandomCellValue(),i=new z(n,t);e._cells.push(i);var o=new p(i);return e._actions.push(o),{v:[o]}}};;){var n=t();if("object"===typeof n)return n.v}}},{key:"matrix",get:function(){var e=this,t=Array(this.mapSize).fill([]).map((function(){return Array(e.mapSize).fill(0)})),n=!0,i=!1,o=void 0;try{for(var a,r=this._cells[Symbol.iterator]();!(n=(a=r.next()).done);n=!0){var c=a.value;t[c.position.y][c.position.x]=c.value}}catch(l){i=!0,o=l}finally{try{n||null==r.return||r.return()}finally{if(i)throw o}}return t}},{key:"score",get:function(){return this._score}},{key:"stepCount",get:function(){return this._stepCount}},{key:"maxValue",get:function(){return this._cells.length>0?Math.max.apply(Math,Object(r.a)(this._cells.map((function(e){return e.value})))):0}},{key:"mapSize",get:function(){return this._mapSize}},{key:"isEnd",get:function(){return!this.canDoMove()}}]),e}(),R=function(){function e(){Object(l.a)(this,e)}return Object(s.a)(e,[{key:"getRandomPosition",value:function(e){return new x(this.getRandomIntInclusive(0,e-1),this.getRandomIntInclusive(0,e-1))}},{key:"getRandomCellValue",value:function(){return this.getRandomIntInclusive(0,5)>0?2:4}},{key:"getRandomIntInclusive",value:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}}]),e}();var N=4,A=2;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.render(i.createElement((function(){var e,t=Object(i.useState)(null),n=Object(c.a)(t,2),a=n[0],l=n[1],s=function(){var e=Object(i.useRef)([]),t=Object(i.useRef)(0),n=Object(i.useState)([]),o=Object(c.a)(n,2),a=o[0],l=o[1],s=Object(i.useCallback)((function(e,t){var n=e.find((function(e){return e.cell.position.equals(t)}));if(void 0===n)throw new Error("");return n}),[]);return{mapAnimationParams:{cells:a},sendActions:Object(i.useCallback)((function(n){var i=Object(r.a)(e.current),o=!0,a=!1,c=void 0;try{for(var u,h=n[Symbol.iterator]();!(o=(u=h.next()).done);o=!0){var f=u.value;if(f instanceof p)i.push(new _(f.cell.clone(),t.current++));else if(f instanceof y){s(e.current,f.oldPosition).cell.position=f.newPosition.clone()}else if(f instanceof b){var v=s(e.current,f.firstCell.position);s(e.current,f.secondCell.position).cell=f.newCell.clone(),i.splice(i.indexOf(v),1)}else f instanceof w&&(i.length=0)}}catch(m){a=!0,c=m}finally{try{o||null==h.return||h.return()}finally{if(a)throw c}}e.current=i,l(e.current)}),[s])}}(),u=s.mapAnimationParams,h=s.sendActions;return Object(i.useEffect)((function(){for(var e=new P(N,new R),t=[],n=0;n<A;n++){var i=e.addCell();t.push.apply(t,Object(r.a)(i))}l(e),h(t)}),[h]),e=function(e){if(null!==a){var t=a.move(e);h(t)}},Object(i.useEffect)((function(){var t=function(t){var n;switch(t.key){case"ArrowUp":n=E.Up;break;case"ArrowDown":n=E.Down;break;case"ArrowLeft":n=E.Left;break;case"ArrowRight":n=E.Right;break;default:return}e(n)};return document.addEventListener("keydown",t,!1),function(){return document.removeEventListener("keydown",t,!1)}}),[e]),a&&o.a.createElement("div",{className:"app"},o.a.createElement("div",{className:"app__map"},o.a.createElement(O,{mapSize:a.mapSize,mapAnimationParams:u})),o.a.createElement("div",{className:"app__title"},o.a.createElement("h1",null,o.a.createElement("a",{href:"https://github.com/shiriev/shiriev-2048/"},"2048"))),o.a.createElement("div",{className:"app__score"},o.a.createElement(j,{title:"\u043e\u0447\u043a\u0438",value:a.score})),o.a.createElement("div",{className:"app__step-count"},o.a.createElement(j,{title:"\u0445\u043e\u0434\u044b",value:a.stepCount})),a.isEnd&&o.a.createElement(k,{title:"\u0418\u0433\u0440\u0430 \u043e\u043a\u043e\u043d\u0447\u0435\u043d\u0430"},o.a.createElement("p",null,"\u0425\u043e\u0442\u0438\u0442\u0435 \u0441\u044b\u0433\u0440\u0430\u0442\u044c \u0435\u0449\u0451?"),o.a.createElement(C,{title:"\u0440\u0435\u0441\u0442\u0430\u0440\u0442",onClick:function(){if(null!==a){for(var e=a.restart(),t=0;t<A;t++){var n=a.addCell();e.push.apply(e,Object(r.a)(n))}h(e)}}})))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.a447d1b8.chunk.js.map