(this["webpackJsonpl4d2-spawn-order"]=this["webpackJsonpl4d2-spawn-order"]||[]).push([[0],{20:function(e,a,n){},21:function(e,a,n){},28:function(e,a,n){"use strict";n.r(a);var t,r=n(0),s=n.n(r),c=n(6),o=n.n(c),i=(n(20),n(21),n(2)),l=n(12),d=n.n(l),u=n(7),p=n(15),f=n(14),y=n(4),m=n(13);function b(e){return t[e]}!function(e){e[e.Common=0]="Common",e[e.Smoker=1]="Smoker",e[e.Boomer=2]="Boomer",e[e.Hunter=3]="Hunter",e[e.Spitter=4]="Spitter",e[e.Jockey=5]="Jockey",e[e.Charger=6]="Charger",e[e.Witch=7]="Witch",e[e.Tank=8]="Tank"}(t||(t={}));var j=[t.Smoker,t.Hunter,t.Jockey,t.Charger],h=[t.Smoker,t.Boomer,t.Hunter,t.Spitter,t.Jockey,t.Charger];var w=t;function S(e,a){console.assert(void 0!==e,a)}function v(e,a){if(a===w.Witch||a===w.Tank)return!1;var n=e.filter((function(e){return"dead"!==e.spawnState})).reduce((function(e,a){return a.siClass>w.Common&&a.siClass<w.Witch&&++e[a.siClass],e}),[0,0,0,0,0,0,0,0,0,0]);return n[a]>=1||!!function(e){switch(e){case t.Smoker:case t.Hunter:case t.Jockey:case t.Charger:return!0;default:return!1}}(a)&&j.map((function(e){return n[e]})).reduce((function(e,a){return e+a}),0)>2}function O(e,a){var n,t=99999,r=w.Hunter,s=!0,c=Object(u.a)(function(e){return[].concat(Object(m.a)(h.slice(e-1)),Object(m.a)(h.slice(0,e)))}(e.spawnSeed));try{for(c.s();!(n=c.n()).done;){var o=n.value,i=a.classTimestamps[o];i<t&&(v(e.players,o)||(r=o,t=i,s=!1))}}catch(l){c.e(l)}finally{c.f()}return s&&console.warn("Next spawn defaulted to Hunter because of no available options!!!"),r}var k=n(3),x=Object(k.a)((function(e){return e.orderedPlayers}),(function(e){return e.playersById}),(function(e,a){return e.map((function(e){return a[e]}))})),C=1;function P(){return Math.floor(6*Math.random())+1}var g=Object(y.c)({name:"GameState",initialState:{availablePlayerNames:["purple","mason","killatoy","breaker","ProdigySim","CanadaRox","grizz","RailsBarlow","LuckyLock","qeo","Chd","kimchi","flyby","dectheone","IcyInferno","n1njaaa","jcb","alexi21","SirPlease","vex","vanille","BRBOWLFEXIN`"],playersById:{},orderedPlayers:[],spawnSeed:P(),curTime:0},reducers:{addPlayer:function(e){var a,n=function(e){return{id:C++,name:e,classTimestamps:[0,0,0,0,0,0,0,0,0],siClass:w.Common,spawnState:"dead"}}(null!==(a=function(e){if(e.length<2)return e.pop();var a=Math.floor(Math.random()*e.length);return e.splice(a)[0]}(e.availablePlayerNames))&&void 0!==a?a:"PLAYER");e.playersById[n.id]=n,e.orderedPlayers.push(n.id)},removePlayer:function(e){var a=e.orderedPlayers.pop();S(a,"No players found to remove");var n=e.playersById[a];delete e.playersById[a],e.availablePlayerNames.push(n.name)},setSpawnSeed:function(e,a){console.assert(a.payload>0&&a.payload<7,"Spawn seed out of bounds."),e.spawnSeed=a.payload},rerollSpawnSeed:function(e){e.spawnSeed=P()},spawnPlayer:function(e,a){var n=e.playersById[a.payload];S(n,"Couldn't find player ".concat(a.payload," to spawn.")),console.assert("dead"===n.spawnState,"Player ".concat(a.payload," is not dead"));var t=O({players:x(e),spawnSeed:e.spawnSeed},n);n.siClass=t,n.classTimestamps[t]=++e.curTime,n.spawnState="ghost"},killPlayer:function(e,a){var n=e.playersById[a.payload];S(n,"Couldn't find player ".concat(a.payload," to spawn.")),++e.curTime,n.siClass=w.Common,n.spawnState="dead"}}}),B=g.reducer,T=Object(f.a)(Object(f.a)({},g.actions),{},{populateGame:Object(y.b)("gameState/addNewPlayerAndSpawn",function(){var e=Object(p.a)(d.a.mark((function e(a,n){var t,r,s,c,o,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=n.dispatch,r=n.getState;case 1:if(!a--){e.next=6;break}return e.next=4,t(g.actions.addPlayer());case 4:e.next=1;break;case 6:s=x(r()),c=Object(u.a)(s),e.prev=8,c.s();case 10:if((o=c.n()).done){e.next=16;break}return i=o.value,e.next=14,t(g.actions.spawnPlayer(i.id));case 14:e.next=10;break;case 16:e.next=21;break;case 18:e.prev=18,e.t0=e.catch(8),c.e(e.t0);case 21:return e.prev=21,c.f(),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[8,18,21,24]])})));return function(a,n){return e.apply(this,arguments)}}())}),I=Object(k.a)(x,(function(e){return e.spawnSeed}),(function(e,a){return Object.fromEntries(e.map((function(n){return[n.id,O({players:e,spawnSeed:a},n)]})))})),N=n(1);function H(e){var a=e.player,n=Object(i.c)(I)[a.id],t=Object(i.b)(),r="dead"===a.spawnState?function(){return t(T.spawnPlayer(a.id))}:function(){return t(T.killPlayer(a.id))};return Object(N.jsxs)("div",{children:["dead"===a.spawnState?Object(N.jsxs)("span",{children:[a.name," is Dead. Their next spawn will be: ",b(n)," (",n,")"]}):Object(N.jsxs)("span",{children:[a.name," is spawned as a ",b(a.siClass)," (",a.siClass,")."]})," ",Object(N.jsx)("button",{className:"playerSpawnStateToggle",onClick:r,children:"dead"===a.spawnState?"Spawn":"Kill"})]})}var J=function(){var e=Object(i.c)((function(e){return e.spawnSeed})),a=Object(i.c)(x),n=Object(i.b)();return Object(r.useEffect)((function(){n(T.populateGame(4))}),[n]),Object(N.jsxs)("div",{className:"App",children:[Object(N.jsx)("div",{children:Object(N.jsx)("h1",{children:"Spawn Simulator"})}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("p",{children:["Current spawn seed is: ",b(e)," (",e,")."]}),Object(N.jsx)("button",{children:"New Game (new seed)"}),Object(N.jsx)("button",{children:"New Round (same seed)"}),a.map((function(e){return Object(N.jsx)(H,{player:e},e.id)}))]})]})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,29)).then((function(a){var n=a.getCLS,t=a.getFID,r=a.getFCP,s=a.getLCP,c=a.getTTFB;n(e),t(e),r(e),s(e),c(e)}))},E=Object(y.a)({reducer:B});o.a.render(Object(N.jsx)(s.a.StrictMode,{children:Object(N.jsx)(i.a,{store:E,children:Object(N.jsx)(J,{})})}),document.getElementById("root")),L()}},[[28,1,2]]]);
//# sourceMappingURL=main.5fadf5fa.chunk.js.map