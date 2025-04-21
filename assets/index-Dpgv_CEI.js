var pt=Object.defineProperty;var ht=(e,n,t)=>n in e?pt(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var g=(e,n,t)=>ht(e,typeof n!="symbol"?n+"":n,t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();function X(e){for(var n,t,r=arguments,i=1,o="",s="",a=[0],u=function(p){i===1&&(p||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?a.push(p?r[p]:o):i===3&&(p||o)?(a[1]=p?r[p]:o,i=2):i===2&&o==="..."&&p?a[2]=Object.assign(a[2]||{},r[p]):i===2&&o&&!p?(a[2]=a[2]||{})[o]=!0:i>=5&&(i===5?((a[2]=a[2]||{})[t]=p?o?o+r[p]:r[p]:o,i=6):(p||o)&&(a[2][t]+=p?o+r[p]:o)),o=""},c=0;c<e.length;c++){c&&(i===1&&u(),u(c));for(var f=0;f<e[c].length;f++)n=e[c][f],i===1?n==="<"?(u(),a=[a,"",null],i=3):o+=n:i===4?o==="--"&&n===">"?(i=1,o=""):o=n+o[0]:s?n===s?s="":o+=n:n==='"'||n==="'"?s=n:n===">"?(u(),i=1):i&&(n==="="?(i=5,t=o,o=""):n==="/"&&(i<5||e[c][f+1]===">")?(u(),i===3&&(a=a[0]),i=a,(a=a[0]).push(this.apply(null,i.slice(1))),i=0):n===" "||n==="	"||n===`
`||n==="\r"?(u(),i=2):o+=n),i===3&&o==="!--"&&(i=4,a=a[0])}return u(),a.length>2?a.slice(1):a[1]}function vt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function bt(e){if(Object.prototype.hasOwnProperty.call(e,"__esModule"))return e;var n=e.default;if(typeof n=="function"){var t=function r(){return this instanceof r?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};t.prototype=n.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var i=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,i.get?i:{enumerable:!0,get:function(){return e[r]}})}),t}var te={exports:{}};/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */var ne,we;function mt(){return we||(we=1,ne=function(n){var t=String.prototype.split,r=/()??/.exec("")[1]===n,i;return i=function(o,p,a){if(Object.prototype.toString.call(p)!=="[object RegExp]")return t.call(o,p,a);var u=[],c=(p.ignoreCase?"i":"")+(p.multiline?"m":"")+(p.extended?"x":"")+(p.sticky?"y":""),f=0,p=new RegExp(p.source,c+"g"),h,d,y,l;for(o+="",r||(h=new RegExp("^"+p.source+"$(?!\\s)",c)),a=a===n?-1>>>0:a>>>0;(d=p.exec(o))&&(y=d.index+d[0].length,!(y>f&&(u.push(o.slice(f,d.index)),!r&&d.length>1&&d[0].replace(h,function(){for(var v=1;v<arguments.length-2;v++)arguments[v]===n&&(d[v]=n)}),d.length>1&&d.index<o.length&&Array.prototype.push.apply(u,d.slice(1)),l=d[0].length,f=y,u.length>=a)));)p.lastIndex===d.index&&p.lastIndex++;return f===o.length?(l||!p.test(""))&&u.push(""):u.push(o.slice(f)),u.length>a?u.slice(0,a):u},i}()),ne}var re,xe;function yt(){if(xe)return re;xe=1;var e=[].indexOf;return re=function(n,t){if(e)return n.indexOf(t);for(var r=0;r<n.length;++r)if(n[r]===t)return r;return-1},re}var ie,Ee;function gt(){if(Ee)return ie;Ee=1;var e=yt();ie=n;function n(i){var o=i.classList;if(o)return o;var s={add:a,remove:u,contains:c,toggle:f,toString:p,length:0,item:h};return s;function a(l){var v=d();e(v,l)>-1||(v.push(l),y(v))}function u(l){var v=d(),S=e(v,l);S!==-1&&(v.splice(S,1),y(v))}function c(l){return e(d(),l)>-1}function f(l){return c(l)?(u(l),!1):(a(l),!0)}function p(){return i.className}function h(l){var v=d();return v[l]||null}function d(){var l=i.className;return t(l.split(" "),r)}function y(l){var v=l.length;i.className=l.join(" "),s.length=v;for(var S=0;S<l.length;S++)s[S]=l[S];delete l[v]}}function t(i,o){for(var s=[],a=0;a<i.length;a++)o(i[a])&&s.push(i[a]);return s}function r(i){return!!i}return ie}const wt={},xt=Object.freeze(Object.defineProperty({__proto__:null,default:wt},Symbol.toStringTag,{value:"Module"})),Et=bt(xt);var Se;function St(){if(Se)return te.exports;Se=1;var e=mt(),n=gt(),t=typeof window>"u"?Et:window,r=t.document,i=t.Text;function o(){var f=[];function p(){var h=[].slice.call(arguments),d=null;function y(l){var v;function S(w){var E=e(w,/([\.#]?[^\s#.]+)/);/^\.|#/.test(E[1])&&(d=r.createElement("div")),u(E,function(O){var V=O.substring(1,O.length);O&&(d?O[0]==="."?n(d).add(V):O[0]==="#"&&d.setAttribute("id",V):d=r.createElement(O))})}if(l!=null){if(typeof l=="string")d?d.appendChild(v=r.createTextNode(l)):S(l);else if(typeof l=="number"||typeof l=="boolean"||l instanceof Date||l instanceof RegExp)d.appendChild(v=r.createTextNode(l.toString()));else if(c(l))u(l,y);else if(a(l))d.appendChild(v=l);else if(l instanceof i)d.appendChild(v=l);else if(typeof l=="object")for(var m in l)if(typeof l[m]=="function")/^on\w+/.test(m)?function(w,E){d.addEventListener?(d.addEventListener(w.substring(2),E[w],!1),f.push(function(){d.removeEventListener(w.substring(2),E[w],!1)})):(d.attachEvent(w,E[w]),f.push(function(){d.detachEvent(w,E[w])}))}(m,l):(d[m]=l[m](),f.push(l[m](function(w){d[m]=w})));else if(m==="style")if(typeof l[m]=="string")d.style.cssText=l[m];else for(var ge in l[m])(function(w,E){if(typeof E=="function")d.style.setProperty(w,E()),f.push(E(function(V){d.style.setProperty(w,V)}));else var O=l[m][w].match(/(.*)\W+!important\W*$/);O?d.style.setProperty(w,O[1],"important"):d.style.setProperty(w,l[m][w])})(ge,l[m][ge]);else if(m==="attrs")for(var F in l[m])d.setAttribute(F,l[m][F]);else m.substr(0,5)==="data-"?d.setAttribute(m,l[m]):d[m]=l[m];else if(typeof l=="function"){var F=l();d.appendChild(v=a(F)?F:r.createTextNode(F)),f.push(l(function(E){a(E)&&v.parentElement?(v.parentElement.replaceChild(E,v),v=E):v.textContent=E}))}}return v}for(;h.length;)y(h.shift());return d}return p.cleanup=function(){for(var h=0;h<f.length;h++)f[h]();f.length=0},p}var s=te.exports=o();s.context=o;function a(f){return f&&f.nodeName&&f.nodeType}function u(f,p){if(f.forEach)return f.forEach(p);for(var h=0;h<f.length;h++)p(f[h],h)}function c(f){return Object.prototype.toString.call(f)=="[object Array]"}return te.exports}var At=St();const q=vt(At);function C(e){if(!e.shadowRoot)throw new Error("There is no shadow root on the element !");return e.shadowRoot}function D(e){const n=Array.isArray(e)?e:[e],t=document.createElement("template");return t.innerHTML=n.map(r=>r.outerHTML).join(""),t}var se=function(e,n){return se=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])},se(e,n)};function N(e,n){if(typeof n!="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");se(e,n);function t(){this.constructor=e}e.prototype=n===null?Object.create(n):(t.prototype=n.prototype,new t)}function _t(e,n,t,r){function i(o){return o instanceof t?o:new t(function(s){s(o)})}return new(t||(t=Promise))(function(o,s){function a(f){try{c(r.next(f))}catch(p){s(p)}}function u(f){try{c(r.throw(f))}catch(p){s(p)}}function c(f){f.done?o(f.value):i(f.value).then(a,u)}c((r=r.apply(e,n||[])).next())})}function Ne(e,n){var t={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},r,i,o,s=Object.create((typeof Iterator=="function"?Iterator:Object).prototype);return s.next=a(0),s.throw=a(1),s.return=a(2),typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(c){return function(f){return u([c,f])}}function u(c){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(t=0)),t;)try{if(r=1,i&&(o=c[0]&2?i.return:c[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,c[1])).done)return o;switch(i=0,o&&(c=[c[0]&2,o.value]),c[0]){case 0:case 1:o=c;break;case 4:return t.label++,{value:c[1],done:!1};case 5:t.label++,i=c[1],c=[0];continue;case 7:c=t.ops.pop(),t.trys.pop();continue;default:if(o=t.trys,!(o=o.length>0&&o[o.length-1])&&(c[0]===6||c[0]===2)){t=0;continue}if(c[0]===3&&(!o||c[1]>o[0]&&c[1]<o[3])){t.label=c[1];break}if(c[0]===6&&t.label<o[1]){t.label=o[1],o=c;break}if(o&&t.label<o[2]){t.label=o[2],t.ops.push(c);break}o[2]&&t.ops.pop(),t.trys.pop();continue}c=n.call(e,t)}catch(f){c=[6,f],i=0}finally{r=o=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function H(e){var n=typeof Symbol=="function"&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function L(e,n){var t=typeof Symbol=="function"&&e[Symbol.iterator];if(!t)return e;var r=t.call(e),i,o=[],s;try{for(;(n===void 0||n-- >0)&&!(i=r.next()).done;)o.push(i.value)}catch(a){s={error:a}}finally{try{i&&!i.done&&(t=r.return)&&t.call(r)}finally{if(s)throw s.error}}return o}function M(e,n,t){if(t||arguments.length===2)for(var r=0,i=n.length,o;r<i;r++)(o||!(r in n))&&(o||(o=Array.prototype.slice.call(n,0,r)),o[r]=n[r]);return e.concat(o||Array.prototype.slice.call(n))}function z(e){return this instanceof z?(this.v=e,this):new z(e)}function It(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(e,n||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),i[Symbol.asyncIterator]=function(){return this},i;function s(d){return function(y){return Promise.resolve(y).then(d,p)}}function a(d,y){r[d]&&(i[d]=function(l){return new Promise(function(v,S){o.push([d,l,v,S])>1||u(d,l)})},y&&(i[d]=y(i[d])))}function u(d,y){try{c(r[d](y))}catch(l){h(o[0][3],l)}}function c(d){d.value instanceof z?Promise.resolve(d.value.v).then(f,p):h(o[0][2],d)}function f(d){u("next",d)}function p(d){u("throw",d)}function h(d,y){d(y),o.shift(),o.length&&u(o[0][0],o[0][1])}}function $t(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e[Symbol.asyncIterator],t;return n?n.call(e):(e=typeof H=="function"?H(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(o){t[o]=e[o]&&function(s){return new Promise(function(a,u){s=e[o](s),i(a,u,s.done,s.value)})}}function i(o,s,a,u){Promise.resolve(u).then(function(c){o({value:c,done:a})},s)}}function b(e){return typeof e=="function"}function de(e){var n=function(r){Error.call(r),r.stack=new Error().stack},t=e(n);return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var oe=de(function(e){return function(t){e(this),this.message=t?t.length+` errors occurred during unsubscription:
`+t.map(function(r,i){return i+1+") "+r.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=t}});function J(e,n){if(e){var t=e.indexOf(n);0<=t&&e.splice(t,1)}}var U=function(){function e(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var n,t,r,i,o;if(!this.closed){this.closed=!0;var s=this._parentage;if(s)if(this._parentage=null,Array.isArray(s))try{for(var a=H(s),u=a.next();!u.done;u=a.next()){var c=u.value;c.remove(this)}}catch(l){n={error:l}}finally{try{u&&!u.done&&(t=a.return)&&t.call(a)}finally{if(n)throw n.error}}else s.remove(this);var f=this.initialTeardown;if(b(f))try{f()}catch(l){o=l instanceof oe?l.errors:[l]}var p=this._finalizers;if(p){this._finalizers=null;try{for(var h=H(p),d=h.next();!d.done;d=h.next()){var y=d.value;try{Ae(y)}catch(l){o=o??[],l instanceof oe?o=M(M([],L(o)),L(l.errors)):o.push(l)}}}catch(l){r={error:l}}finally{try{d&&!d.done&&(i=h.return)&&i.call(h)}finally{if(r)throw r.error}}}if(o)throw new oe(o)}},e.prototype.add=function(n){var t;if(n&&n!==this)if(this.closed)Ae(n);else{if(n instanceof e){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(n)}},e.prototype._hasParent=function(n){var t=this._parentage;return t===n||Array.isArray(t)&&t.includes(n)},e.prototype._addParent=function(n){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n},e.prototype._removeParent=function(n){var t=this._parentage;t===n?this._parentage=null:Array.isArray(t)&&J(t,n)},e.prototype.remove=function(n){var t=this._finalizers;t&&J(t,n),n instanceof e&&n._removeParent(this)},e.EMPTY=function(){var n=new e;return n.closed=!0,n}(),e}(),Fe=U.EMPTY;function ze(e){return e instanceof U||e&&"closed"in e&&b(e.remove)&&b(e.add)&&b(e.unsubscribe)}function Ae(e){b(e)?e():e.unsubscribe()}var Tt={Promise:void 0},Ot={setTimeout:function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];return setTimeout.apply(void 0,M([e,n],L(t)))},clearTimeout:function(e){return clearTimeout(e)},delegate:void 0};function He(e){Ot.setTimeout(function(){throw e})}function ae(){}function G(e){e()}var pe=function(e){N(n,e);function n(t){var r=e.call(this)||this;return r.isStopped=!1,t?(r.destination=t,ze(t)&&t.add(r)):r.destination=Pt,r}return n.create=function(t,r,i){return new ue(t,r,i)},n.prototype.next=function(t){this.isStopped||this._next(t)},n.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},n.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},n.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},n.prototype._next=function(t){this.destination.next(t)},n.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},n.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},n}(U),Ct=function(){function e(n){this.partialObserver=n}return e.prototype.next=function(n){var t=this.partialObserver;if(t.next)try{t.next(n)}catch(r){W(r)}},e.prototype.error=function(n){var t=this.partialObserver;if(t.error)try{t.error(n)}catch(r){W(r)}else W(n)},e.prototype.complete=function(){var n=this.partialObserver;if(n.complete)try{n.complete()}catch(t){W(t)}},e}(),ue=function(e){N(n,e);function n(t,r,i){var o=e.call(this)||this,s;return b(t)||!t?s={next:t??void 0,error:r??void 0,complete:i??void 0}:s=t,o.destination=new Ct(s),o}return n}(pe);function W(e){He(e)}function Lt(e){throw e}var Pt={closed:!0,next:ae,error:Lt,complete:ae},he=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function B(e){return e}function kt(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return qe(e)}function qe(e){return e.length===0?B:e.length===1?e[0]:function(t){return e.reduce(function(r,i){return i(r)},t)}}var A=function(){function e(n){n&&(this._subscribe=n)}return e.prototype.lift=function(n){var t=new e;return t.source=this,t.operator=n,t},e.prototype.subscribe=function(n,t,r){var i=this,o=jt(n)?n:new ue(n,t,r);return G(function(){var s=i,a=s.operator,u=s.source;o.add(a?a.call(o,u):u?i._subscribe(o):i._trySubscribe(o))}),o},e.prototype._trySubscribe=function(n){try{return this._subscribe(n)}catch(t){n.error(t)}},e.prototype.forEach=function(n,t){var r=this;return t=_e(t),new t(function(i,o){var s=new ue({next:function(a){try{n(a)}catch(u){o(u),s.unsubscribe()}},error:o,complete:i});r.subscribe(s)})},e.prototype._subscribe=function(n){var t;return(t=this.source)===null||t===void 0?void 0:t.subscribe(n)},e.prototype[he]=function(){return this},e.prototype.pipe=function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return qe(n)(this)},e.prototype.toPromise=function(n){var t=this;return n=_e(n),new n(function(r,i){var o;t.subscribe(function(s){return o=s},function(s){return i(s)},function(){return r(o)})})},e.create=function(n){return new e(n)},e}();function _e(e){var n;return(n=e??Tt.Promise)!==null&&n!==void 0?n:Promise}function Rt(e){return e&&b(e.next)&&b(e.error)&&b(e.complete)}function jt(e){return e&&e instanceof pe||Rt(e)&&ze(e)}function Mt(e){return b(e==null?void 0:e.lift)}function I(e){return function(n){if(Mt(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function _(e,n,t,r,i){return new Nt(e,n,t,r,i)}var Nt=function(e){N(n,e);function n(t,r,i,o,s,a){var u=e.call(this,t)||this;return u.onFinalize=s,u.shouldUnsubscribe=a,u._next=r?function(c){try{r(c)}catch(f){t.error(f)}}:e.prototype._next,u._error=o?function(c){try{o(c)}catch(f){t.error(f)}finally{this.unsubscribe()}}:e.prototype._error,u._complete=i?function(){try{i()}catch(c){t.error(c)}finally{this.unsubscribe()}}:e.prototype._complete,u}return n.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var r=this.closed;e.prototype.unsubscribe.call(this),!r&&((t=this.onFinalize)===null||t===void 0||t.call(this))}},n}(pe),Ft=de(function(e){return function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),De=function(e){N(n,e);function n(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return n.prototype.lift=function(t){var r=new Ie(this,this);return r.operator=t,r},n.prototype._throwIfClosed=function(){if(this.closed)throw new Ft},n.prototype.next=function(t){var r=this;G(function(){var i,o;if(r._throwIfClosed(),!r.isStopped){r.currentObservers||(r.currentObservers=Array.from(r.observers));try{for(var s=H(r.currentObservers),a=s.next();!a.done;a=s.next()){var u=a.value;u.next(t)}}catch(c){i={error:c}}finally{try{a&&!a.done&&(o=s.return)&&o.call(s)}finally{if(i)throw i.error}}}})},n.prototype.error=function(t){var r=this;G(function(){if(r._throwIfClosed(),!r.isStopped){r.hasError=r.isStopped=!0,r.thrownError=t;for(var i=r.observers;i.length;)i.shift().error(t)}})},n.prototype.complete=function(){var t=this;G(function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var r=t.observers;r.length;)r.shift().complete()}})},n.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(n.prototype,"observed",{get:function(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0},enumerable:!1,configurable:!0}),n.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},n.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},n.prototype._innerSubscribe=function(t){var r=this,i=this,o=i.hasError,s=i.isStopped,a=i.observers;return o||s?Fe:(this.currentObservers=null,a.push(t),new U(function(){r.currentObservers=null,J(a,t)}))},n.prototype._checkFinalizedStatuses=function(t){var r=this,i=r.hasError,o=r.thrownError,s=r.isStopped;i?t.error(o):s&&t.complete()},n.prototype.asObservable=function(){var t=new A;return t.source=this,t},n.create=function(t,r){return new Ie(t,r)},n}(A),Ie=function(e){N(n,e);function n(t,r){var i=e.call(this)||this;return i.destination=t,i.source=r,i}return n.prototype.next=function(t){var r,i;(i=(r=this.destination)===null||r===void 0?void 0:r.next)===null||i===void 0||i.call(r,t)},n.prototype.error=function(t){var r,i;(i=(r=this.destination)===null||r===void 0?void 0:r.error)===null||i===void 0||i.call(r,t)},n.prototype.complete=function(){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||r===void 0||r.call(t)},n.prototype._subscribe=function(t){var r,i;return(i=(r=this.source)===null||r===void 0?void 0:r.subscribe(t))!==null&&i!==void 0?i:Fe},n}(De),zt={now:function(){return Date.now()}},Ht=function(e){N(n,e);function n(t,r){return e.call(this)||this}return n.prototype.schedule=function(t,r){return this},n}(U),$e={setInterval:function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];return setInterval.apply(void 0,M([e,n],L(t)))},clearInterval:function(e){return clearInterval(e)},delegate:void 0},qt=function(e){N(n,e);function n(t,r){var i=e.call(this,t,r)||this;return i.scheduler=t,i.work=r,i.pending=!1,i}return n.prototype.schedule=function(t,r){var i;if(r===void 0&&(r=0),this.closed)return this;this.state=t;var o=this.id,s=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(s,o,r)),this.pending=!0,this.delay=r,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(s,this.id,r),this},n.prototype.requestAsyncId=function(t,r,i){return i===void 0&&(i=0),$e.setInterval(t.flush.bind(t,this),i)},n.prototype.recycleAsyncId=function(t,r,i){if(i===void 0&&(i=0),i!=null&&this.delay===i&&this.pending===!1)return r;r!=null&&$e.clearInterval(r)},n.prototype.execute=function(t,r){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var i=this._execute(t,r);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},n.prototype._execute=function(t,r){var i=!1,o;try{this.work(t)}catch(s){i=!0,o=s||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),o},n.prototype.unsubscribe=function(){if(!this.closed){var t=this,r=t.id,i=t.scheduler,o=i.actions;this.work=this.state=this.scheduler=null,this.pending=!1,J(o,this),r!=null&&(this.id=this.recycleAsyncId(i,r,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},n}(Ht),Te=function(){function e(n,t){t===void 0&&(t=e.now),this.schedulerActionCtor=n,this.now=t}return e.prototype.schedule=function(n,t,r){return t===void 0&&(t=0),new this.schedulerActionCtor(this,n).schedule(r,t)},e.now=zt.now,e}(),Dt=function(e){N(n,e);function n(t,r){r===void 0&&(r=Te.now);var i=e.call(this,t,r)||this;return i.actions=[],i._active=!1,i}return n.prototype.flush=function(t){var r=this.actions;if(this._active){r.push(t);return}var i;this._active=!0;do if(i=t.execute(t.state,t.delay))break;while(t=r.shift());if(this._active=!1,i){for(;t=r.shift();)t.unsubscribe();throw i}},n}(Te),Ue=new Dt(qt),Ut=Ue,Be=new A(function(e){return e.complete()});function Ve(e){return e&&b(e.schedule)}function ve(e){return e[e.length-1]}function We(e){return b(ve(e))?e.pop():void 0}function Z(e){return Ve(ve(e))?e.pop():void 0}function Bt(e,n){return typeof ve(e)=="number"?e.pop():n}var be=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function Ye(e){return b(e==null?void 0:e.then)}function Ge(e){return b(e[he])}function Je(e){return Symbol.asyncIterator&&b(e==null?void 0:e[Symbol.asyncIterator])}function Ke(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function Vt(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Qe=Vt();function Xe(e){return b(e==null?void 0:e[Qe])}function Ze(e){return It(this,arguments,function(){var t,r,i,o;return Ne(this,function(s){switch(s.label){case 0:t=e.getReader(),s.label=1;case 1:s.trys.push([1,,9,10]),s.label=2;case 2:return[4,z(t.read())];case 3:return r=s.sent(),i=r.value,o=r.done,o?[4,z(void 0)]:[3,5];case 4:return[2,s.sent()];case 5:return[4,z(i)];case 6:return[4,s.sent()];case 7:return s.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function et(e){return b(e==null?void 0:e.getReader)}function P(e){if(e instanceof A)return e;if(e!=null){if(Ge(e))return Wt(e);if(be(e))return Yt(e);if(Ye(e))return Gt(e);if(Je(e))return tt(e);if(Xe(e))return Jt(e);if(et(e))return Kt(e)}throw Ke(e)}function Wt(e){return new A(function(n){var t=e[he]();if(b(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Yt(e){return new A(function(n){for(var t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function Gt(e){return new A(function(n){e.then(function(t){n.closed||(n.next(t),n.complete())},function(t){return n.error(t)}).then(null,He)})}function Jt(e){return new A(function(n){var t,r;try{for(var i=H(e),o=i.next();!o.done;o=i.next()){var s=o.value;if(n.next(s),n.closed)return}}catch(a){t={error:a}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(t)throw t.error}}n.complete()})}function tt(e){return new A(function(n){Qt(e,n).catch(function(t){return n.error(t)})})}function Kt(e){return tt(Ze(e))}function Qt(e,n){var t,r,i,o;return _t(this,void 0,void 0,function(){var s,a;return Ne(this,function(u){switch(u.label){case 0:u.trys.push([0,5,6,11]),t=$t(e),u.label=1;case 1:return[4,t.next()];case 2:if(r=u.sent(),!!r.done)return[3,4];if(s=r.value,n.next(s),n.closed)return[2];u.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return a=u.sent(),i={error:a},[3,11];case 6:return u.trys.push([6,,9,10]),r&&!r.done&&(o=t.return)?[4,o.call(t)]:[3,8];case 7:u.sent(),u.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return n.complete(),[2]}})})}function R(e,n,t,r,i){r===void 0&&(r=0),i===void 0&&(i=!1);var o=n.schedule(function(){t(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(o),!i)return o}function nt(e,n){return n===void 0&&(n=0),I(function(t,r){t.subscribe(_(r,function(i){return R(r,e,function(){return r.next(i)},n)},function(){return R(r,e,function(){return r.complete()},n)},function(i){return R(r,e,function(){return r.error(i)},n)}))})}function rt(e,n){return n===void 0&&(n=0),I(function(t,r){r.add(e.schedule(function(){return t.subscribe(r)},n))})}function Xt(e,n){return P(e).pipe(rt(n),nt(n))}function Zt(e,n){return P(e).pipe(rt(n),nt(n))}function en(e,n){return new A(function(t){var r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function tn(e,n){return new A(function(t){var r;return R(t,n,function(){r=e[Qe](),R(t,n,function(){var i,o,s;try{i=r.next(),o=i.value,s=i.done}catch(a){t.error(a);return}s?t.complete():t.next(o)},0,!0)}),function(){return b(r==null?void 0:r.return)&&r.return()}})}function it(e,n){if(!e)throw new Error("Iterable cannot be null");return new A(function(t){R(t,n,function(){var r=e[Symbol.asyncIterator]();R(t,n,function(){r.next().then(function(i){i.done?t.complete():t.next(i.value)})},0,!0)})})}function nn(e,n){return it(Ze(e),n)}function rn(e,n){if(e!=null){if(Ge(e))return Xt(e,n);if(be(e))return en(e,n);if(Ye(e))return Zt(e,n);if(Je(e))return it(e,n);if(Xe(e))return tn(e,n);if(et(e))return nn(e,n)}throw Ke(e)}function ee(e,n){return n?rn(e,n):P(e)}var ot=de(function(e){return function(){e(this),this.name="EmptyError",this.message="no elements in sequence"}});function on(e){return e instanceof Date&&!isNaN(e)}function x(e,n){return I(function(t,r){var i=0;t.subscribe(_(r,function(o){r.next(e.call(n,o,i++))}))})}var sn=Array.isArray;function an(e,n){return sn(n)?e.apply(void 0,M([],L(n))):e(n)}function me(e){return x(function(n){return an(e,n)})}var un=Array.isArray,cn=Object.getPrototypeOf,ln=Object.prototype,fn=Object.keys;function dn(e){if(e.length===1){var n=e[0];if(un(n))return{args:n,keys:null};if(pn(n)){var t=fn(n);return{args:t.map(function(r){return n[r]}),keys:t}}}return{args:e,keys:null}}function pn(e){return e&&typeof e=="object"&&cn(e)===ln}function hn(e,n){return e.reduce(function(t,r,i){return t[r]=n[i],t},{})}function vn(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=Z(e),r=We(e),i=dn(e),o=i.args,s=i.keys;if(o.length===0)return ee([],t);var a=new A(st(o,t,s?function(u){return hn(s,u)}:B));return r?a.pipe(me(r)):a}function st(e,n,t){return t===void 0&&(t=B),function(r){Oe(n,function(){for(var i=e.length,o=new Array(i),s=i,a=i,u=function(f){Oe(n,function(){var p=ee(e[f],n),h=!1;p.subscribe(_(r,function(d){o[f]=d,h||(h=!0,a--),a||r.next(t(o.slice()))},function(){--s||r.complete()}))},r)},c=0;c<i;c++)u(c)},r)}}function Oe(e,n,t){e?R(t,e,n):n()}function bn(e,n,t,r,i,o,s,a){var u=[],c=0,f=0,p=!1,h=function(){p&&!u.length&&!c&&n.complete()},d=function(l){return c<r?y(l):u.push(l)},y=function(l){c++;var v=!1;P(t(l,f++)).subscribe(_(n,function(S){n.next(S)},function(){v=!0},void 0,function(){if(v)try{c--;for(var S=function(){var m=u.shift();s||y(m)};u.length&&c<r;)S();h()}catch(m){n.error(m)}}))};return e.subscribe(_(n,d,function(){p=!0,h()})),function(){}}function ye(e,n,t){return t===void 0&&(t=1/0),b(n)?ye(function(r,i){return x(function(o,s){return n(r,o,i,s)})(P(e(r,i)))},t):(typeof n=="number"&&(t=n),I(function(r,i){return bn(r,i,e,t)}))}function at(e){return e===void 0&&(e=1/0),ye(B,e)}function mn(){return at(1)}function Ce(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return mn()(ee(e,Z(e)))}var yn=["addListener","removeListener"],gn=["addEventListener","removeEventListener"],wn=["on","off"];function j(e,n,t,r){if(b(t)&&(r=t,t=void 0),r)return j(e,n,t).pipe(me(r));var i=L(Sn(e)?gn.map(function(a){return function(u){return e[a](n,u,t)}}):xn(e)?yn.map(Le(e,n)):En(e)?wn.map(Le(e,n)):[],2),o=i[0],s=i[1];if(!o&&be(e))return ye(function(a){return j(a,n,t)})(P(e));if(!o)throw new TypeError("Invalid event target");return new A(function(a){var u=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];return a.next(1<c.length?c:c[0])};return o(u),function(){return s(u)}})}function Le(e,n){return function(t){return function(r){return e[t](n,r)}}}function xn(e){return b(e.addListener)&&b(e.removeListener)}function En(e){return b(e.on)&&b(e.off)}function Sn(e){return b(e.addEventListener)&&b(e.removeEventListener)}function ut(e,n,t){e===void 0&&(e=0),t===void 0&&(t=Ut);var r=-1;return n!=null&&(Ve(n)?t=n:r=n),new A(function(i){var o=on(e)?+e-t.now():e;o<0&&(o=0);var s=0;return t.schedule(function(){i.closed||(i.next(s++),0<=r?this.schedule(void 0,r):i.complete())},o)})}function An(e,n){return n===void 0&&(n=Ue),ut(e,e,n)}function _n(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=Z(e),r=Bt(e,1/0),i=e;return i.length?i.length===1?P(i[0]):at(r)(ee(i,t)):Be}var In=Array.isArray;function $n(e){return e.length===1&&In(e[0])?e[0]:e}function k(e,n){return I(function(t,r){var i=0;t.subscribe(_(r,function(o){return e.call(n,o,i++)&&r.next(o)}))})}function ct(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=We(e);return t?kt(ct.apply(void 0,M([],L(e))),me(t)):I(function(r,i){st(M([r],L($n(e))))(i)})}function Y(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return ct.apply(void 0,M([],L(e)))}function Tn(e){return I(function(n,t){var r=!1;n.subscribe(_(t,function(i){r=!0,t.next(i)},function(){r||t.next(e),t.complete()}))})}function On(e){return e<=0?function(){return Be}:I(function(n,t){var r=0;n.subscribe(_(t,function(i){++r<=e&&(t.next(i),e<=r&&t.complete())}))})}function Pe(e){return x(function(){return e})}function Cn(e){return e===void 0&&(e=Ln),I(function(n,t){var r=!1;n.subscribe(_(t,function(i){r=!0,t.next(i)},function(){return r?t.complete():t.error(e())}))})}function Ln(){return new ot}function Pn(e,n){var t=arguments.length>=2;return function(r){return r.pipe(B,On(1),t?Tn(n):Cn(function(){return new ot}))}}function ke(){return I(function(e,n){var t,r=!1;e.subscribe(_(n,function(i){var o=t;t=i,r&&n.next([o,i]),r=!0}))})}function T(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=Z(e);return I(function(r,i){(t?Ce(e,r,t):Ce(e,r)).subscribe(i)})}function kn(e,n){return I(function(t,r){var i=null,o=0,s=!1,a=function(){return s&&!i&&r.complete()};t.subscribe(_(r,function(u){i==null||i.unsubscribe();var c=0,f=o++;P(e(u,f)).subscribe(i=_(r,function(p){return r.next(n?n(u,p,f,c++):p)},function(){i=null,a()}))},function(){s=!0,a()}))})}function Rn(e){return I(function(n,t){P(e).subscribe(_(t,function(){return t.complete()},ae)),!t.closed&&n.subscribe(t)})}function lt(){return!document.hidden}function jn(){const e=j(document,"visibilitychange"),n=j(window,"focus").pipe(Pe(!0)),t=j(window,"blur").pipe(Pe(!1)),r=_n(n,t);return vn(e,r).pipe(x(([,i])=>lt()&&i),k(i=>i),Pn())}const Mn=j(document,"mouseover");async function Nn(){lt()||await Promise.race([jn().toPromise(),Mn.toPromise()])}async function Fn(){await new Promise(e=>setTimeout(e,400)),await Nn(),await new Promise(e=>setTimeout(e,400))}const zn=Fn();function $(e,n){const t=e.querySelector(n);if(!t)throw new Error("Failed to find element ${ selector } !");return t}const Hn=X.bind(q),qn="crumbs-p",Dn=D(Hn`
	<style>
		:host {
			display: block;
		}

		p {
			font-size: 1rem;
		}

		::slotted(code) {
			padding: 5px;
			border-radius: 5px;
			display: inline-block;
			font-size: 0.9rem;
		}

		::slotted(code[block]) {
			display: block;
			margin: 1rem 0;
			white-space: pre;
		}

		@media screen and (min-width: 800px) {
			p {
				font-size: 1.4rem;
			}
		}
	</style>

	<p>
		<slot></slot>
	</p>
`);class Un extends HTMLElement{async connectedCallback(){this.attachShadow({mode:"open"});const n=C(this),t=Dn.content.cloneNode(!0);n.appendChild(t)}}customElements.define(qn,Un);const Bn=X.bind(q),Vn="crumbs-panel",Wn=D(Bn`
	<style>
		:host {
			display: block;
		}

		#panel-container {
			display: grid;
			grid-column-gap: 0px;
			grid-row-gap: 0px;
			transition: grid-template-columns .5s cubic-bezier(.12,1.03,.11,.99), grid-template-rows .5s cubic-bezier(.12,1.03,.11,.99);
			height: 100%;
		}

		#panel {
			border-radius: 0.3rem;
			padding: 1.7rem;
			grid-area: 2 / 2 / 3 / 3;
			background-color: #ffffff00;
			box-shadow: 0px 0px 9px 5px rgba(28, 44, 83, 0.04);
			box-shadow: 2px 10px 50px 5px rgba(26, 25, 25, 0.47);
			transition: background-color .5s cubic-bezier(.12,1.03,.11,.99);
			color: black;
			overflow: auto;
			position: relative;
		}

		#panel-title-container {
			grid-area: 2 / 2 / 3 / 3;
			z-index: 0;
		}

		#panel-content {
			visibility: collapse;
			transition: opacity 1s cubic-bezier(.12,1.03,.11,.99);
			z-index: 1;
			position: relative;
			height: calc(100% - 2.5rem);
		}

		#panel-loading-container {
			grid-area: 2 / 2 / 3 / 3;
			overflow: hidden;
			backdrop-filter: blur(0.3rem);
		}

		#panel-title {
			background: linear-gradient(0deg, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0.44) 100%);
			display: inline-block;
			border-radius: 0.3rem;
			padding-left: 1rem;
			padding-right: 1rem;
			opacity: 0;
			transition-duration: 0.2s;
			transition-timing-function: cubic-bezier(.12,1.03,.11,.99);
			transition-delay: 0.4s;
			transition-property: opacity;
		}

		#panel-loading {
			border-radius: 0.3rem;
			width: 75%;
			height: 100%;
			background-color: #ffffff55;
			box-shadow: 0px 0px 9px 5px rgba(28, 44, 83, 0.04);

			transition-duration: 1s;
			transition-timing-function: cubic-bezier(.17,.84,.44,1);
			transition-delay: 0s;
			transition-property: width, background-color;

			color: black;
			overflow: auto;

			position: relative;
		}

		* {
			scrollbar-width: auto;
			scrollbar-color: #ffffff90 #ffffff00;
		}

		*::-webkit-scrollbar {
			width: 8px;
		}

		*::-webkit-scrollbar-track {
			background: #ffffff00;
		}

		*::-webkit-scrollbar-thumb {
			background-color: #ffffff90;
			border-radius: 10px;
			border: 3px solid #ffffff00;
		}
	</style>

	<div id="panel-container" style="grid-template-columns: 20% 1fr 20%; grid-template-rows: 1rem 1fr 40%;">
		<div id="panel-loading-container">
			<div id="panel-loading"></div>
		</div>

		<div id="panel">
			<div id="panel-content" style="opacity: 0;">
				<slot></slot>
			</div>
		</div>

		<div id="panel-title-container">
			<div id="panel-title">
				<crumbs-p style="line-height: 0;">
					<b id="panel-title-content"> </b>
				</crumbs-p>
			</div>
		</div>
	</div>
`);class Yn extends HTMLElement{constructor(){super(...arguments);g(this,"contentTimeoutElapsed",!1);g(this,"contentLoaded",!1);g(this,"connected",!1);g(this,"loading","100");g(this,"scrolled",!1);g(this,"scrolledSubscription",null)}static get observedAttributes(){return["panel-loading","panel-title"]}async connectedCallback(){this.attachShadow({mode:"open"}),await zn;const t=C(this),r=Wn.content.cloneNode(!0);t.appendChild(r);const i=this.getAttribute("panel-loading");i!==null&&Re(i)&&(this.loading=i),setTimeout(()=>{const o=$(t,"#panel-container");o.style.gridTemplateColumns="1rem 1fr 1rem",o.style.gridTemplateRows="1rem 1fr 1rem";const s=$(t,"#panel");s.style.backgroundColor="#ffffff40",this.scrolledSubscription=j(s,"scroll").pipe(x(a=>a.target.scrollTop),x(a=>a!==0)).subscribe(a=>{this.scrolled=a,this.render()}),this.render()},10),setTimeout(()=>{this.contentTimeoutElapsed=!0,this.render()},400),this.connected=!0,this.render()}render(){const t=C(this),r=$(t,"#panel-content"),i=$(t,"#panel-loading"),o=$(t,"#panel"),s=$(t,"#panel-title-content");this.contentTimeoutElapsed&&Gn(this.loading)?(r.style.visibility="visible",r.style.opacity="1",o.style.overflow="auto"):(r.style.visibility="collapse",r.style.opacity="0",o.style.overflow="hidden"),i.style.width=`${this.loading}%`;const a=$(t,"#panel-title");this.loading==="100"&&this.getAttribute("panel-title")&&!this.scrolled?setTimeout(()=>{a.style.opacity="1",s.innerHTML=this.getAttribute("panel-title")||"",r.style.paddingTop="2.5rem"},10):(r.style.paddingTop="inherit",a.style.opacity="0")}attributeChangedCallback(){if(this.shadowRoot&&this.connected){const t=this.getAttribute("panel-loading");t!==null&&Re(t)?this.loading=t:t===null&&(this.loading="100"),this.render()}}disconnectedCallback(){var t;(t=this.scrolledSubscription)==null||t.unsubscribe()}}function Re(e){const n=Number(e),t=Math.floor(n);return t===n&&Number.isInteger(t)&&Number.isFinite(t)&&t<=100&&t>=0}function Gn(e){return e===null||e==="100"}customElements.define(Vn,Yn);const Jn=X.bind(q),Kn="crumbs-input",Qn=D(Jn`
	<style>
		:host {
			display: block;
		}

		input {
			font-size: 1rem;
			font-family: inherit;
			background-color: transparent;
			padding: 0.4rem;
			border-radius: 10px;
			border-color: transparent;
			padding: 10px 25px;

			box-shadow: inset 2px 2px 6px 0px rgba(0, 0, 0, 0.29),
				inset -2px -2px 3px #ffffffa8,
				2px 2px 1px 0px #ffffff1c,
				-2px -2px 1px rgba(0, 0, 0, 0.02);

			border-width: 0;
			margin: 0.1rem;
		}

		@media screen and (min-width: 800px) {
			input {
				font-size: 1.4rem;
			}
		}

		input:focus, input:focus-visible {
			outline: none;
		}
	</style>

	<input type="text"/>
`);class Xn extends HTMLElement{static get observedAttributes(){return["value"]}async connectedCallback(){this.attachShadow({mode:"open"});const n=C(this),t=Qn.content.cloneNode(!0);n.appendChild(t);const r=$(n,"input"),i=this.getAttribute("value");r instanceof HTMLInputElement&&i&&(r.value=i)}attributeChangedCallback(n,t,r){if(n==="value"&&this.shadowRoot){const i=C(this),o=$(i,"input");o instanceof HTMLInputElement&&(o.value=r)}}}customElements.define(Kn,Xn);const ce=X.bind(q),Zn="crumbs-tabs",er=D(ce`
	<style>
		:host {
			display: block;
		}

		.selected-title {
			background: linear-gradient(0deg, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0.44) 100%);
			border-radius: 0.3rem;
		}

		#tabs {
			display: flex;
			justify-content: space-around;

			& > div {
				padding: 10px;
				cursor: pointer;
				width: 100%;
				text-align: center;
				user-select: none;
			}
		}

		#content {
			display: grid;
			grid-auto-flow: column;
			overflow: scroll;
			grid-auto-columns: 100%;
			scroll-snap-type: x mandatory;
			scroll-behavior: smooth;
			-ms-overflow-style: none;
			scrollbar-width: none;

			& > div {
				scroll-snap-align: start;
			}
		}

		#content::-webkit-scrollbar {
			display: none;
		}

		#container {
			display: grid;
			grid-template-rows: 1fr auto;
			height: 100%;
		}
	</style>

	<div id="container">
		<div id="content"></div>
		<div id="tabs"></div>
	</div>
`);class tr extends HTMLElement{constructor(){super(...arguments);g(this,"selected",1);g(this,"subscriptions",[])}async connectedCallback(){this.attachShadow({mode:"open"});const t=C(this),r=er.content.cloneNode(!0);t.appendChild(r);const i=this.getAttribute("selected");this.selected=Number.parseInt(i||"1");const o=t.querySelector("#tabs"),s=t.querySelector("#content");if(!o)throw new Error("Tabs not found");if(!s)throw new Error("Content not found");for(const a of{[Symbol.iterator]:()=>this.getSlots()}){if(a.startsWith("content-")){const u=ce`<div id=${`${a}`}> <slot name=${a}></slot> </div>`;u instanceof Element&&s.appendChild(u)}if(a.startsWith("title-")){const u=ce`<div id=${a}> <crumbs-p> <slot name=${a}></slot> </crumbs-p> </div>`;u instanceof Element&&o.appendChild(u)}}this.subscriptions=[...o.children].map((a,u)=>j(a,"click").subscribe(()=>{const c=a.id.replace("title-","content-"),f=t.querySelector(`#${c}`);f instanceof HTMLElement&&s instanceof HTMLElement&&f.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),this.selected=u+1,this.render()})),this.render()}render(){const r=C(this).querySelector("#tabs");if(!r)throw new Error("Tabs not found");[...r.children].forEach((i,o)=>{o+1===this.selected?i instanceof HTMLElement&&i.classList.add("selected-title"):i instanceof HTMLElement&&i.classList.remove("selected-title")})}disconnectedCallback(){for(const t of this.subscriptions)t.unsubscribe()}*getSlots(){for(const t of Array.from(this.children)){const r=t.getAttribute("slot");r&&(yield r)}}}customElements.define(Zn,tr);var ft=function(e,n,t,r){var i;n[0]=0;for(var o=1;o<n.length;o++){var s=n[o++],a=n[o]?(n[0]|=s?1:2,t[n[o++]]):n[++o];s===3?r[0]=a:s===4?r[1]=Object.assign(r[1]||{},a):s===5?(r[1]=r[1]||{})[n[++o]]=a:s===6?r[1][n[++o]]+=a+"":s?(i=e.apply(a,ft(e,a,t,["",null])),r.push(i),a[0]?n[0]|=2:(n[o-2]=0,n[o]=i)):r.push(a)}return r},je=new Map;function nr(e){var n=je.get(this);return n||(n=new Map,je.set(this,n)),(n=ft(this,n.get(e)||(n.set(e,n=function(t){for(var r,i,o=1,s="",a="",u=[0],c=function(h){o===1&&(h||(s=s.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?u.push(0,h,s):o===3&&(h||s)?(u.push(3,h,s),o=2):o===2&&s==="..."&&h?u.push(4,h,0):o===2&&s&&!h?u.push(5,0,!0,s):o>=5&&((s||!h&&o===5)&&(u.push(o,0,s,i),o=6),h&&(u.push(o,h,0,i),o=6)),s=""},f=0;f<t.length;f++){f&&(o===1&&c(),c(f));for(var p=0;p<t[f].length;p++)r=t[f][p],o===1?r==="<"?(c(),u=[u],o=3):s+=r:o===4?s==="--"&&r===">"?(o=1,s=""):s=r+s[0]:a?r===a?a="":s+=r:r==='"'||r==="'"?a=r:r===">"?(c(),o=1):o&&(r==="="?(o=5,i=s,s=""):r==="/"&&(o<5||t[f][p+1]===">")?(c(),o===3&&(u=u[0]),o=u,(u=u[0]).push(2,0,o),o=0):r===" "||r==="	"||r===`
`||r==="\r"?(c(),o=2):s+=r),o===3&&s==="!--"&&(o=4,u=u[0])}return c(),u}(e)),n),arguments,[])).length>1?n:n[0]}function rr(){return e=>e.pipe(x(([n,t,r,i])=>!r||t!==100&&t!==0&&i!==null?!1:r<Number(i)||n))}function ir(){return e=>e.pipe(x(([n,t,r])=>n||t||r>0&&r<100))}function Me(){return 1e3}function or(){return e=>e.pipe(x(([n,t,r,i])=>{if(Number(r)-Me()>t){const s=Number(r)-Me(),a=Math.max(s,0),u=Math.ceil(t/a*100);return Math.min(100,u)}return i?100:n||0}))}const sr=nr.bind(q),ar="crumbs-button";class ur extends HTMLElement{constructor(){super();g(this,"_renderSubscription",null);g(this,"_clickSubscription",null);g(this,"_attributeChanges$",new De);g(this,"_parsedProgress$");g(this,"_parsedDisabled$");g(this,"_parsedIndeterminateProgress$");g(this,"_parsedIndeterminateDurationMs$");g(this,"_indeterminedLoadingTime$");g(this,"_loading$");g(this,"_activeIndeterminateProgress$");g(this,"_disabled$");g(this,"_loadingBarTransitionEnabled$");this._parsedProgress$=this._attributeChanges$.pipe(k(([r])=>r==="progress"),x(([r,i])=>i),T(this.getAttribute("progress")),x(r=>r===null?null:Number(r)),k(r=>r===null||Number.isInteger(r)&&Number.isFinite(r)&&r<=100&&r>=0)),this._parsedDisabled$=this._attributeChanges$.pipe(k(([r])=>r==="disabled"),x(([r,i])=>i),T(this.getAttribute("disabled")),x(r=>r!==null&&r!=="false")),this._parsedIndeterminateProgress$=this._attributeChanges$.pipe(k(([r])=>r==="indeterminate-progress"),x(([r,i])=>i),T(this.getAttribute("indeterminate-progress")),x(r=>r!==null&&r!=="false")),this._parsedIndeterminateDurationMs$=this._attributeChanges$.pipe(k(([r])=>r==="indeterminate-duration-ms"),x(([r,i])=>i),T(this.getAttribute("indeterminate-duration-ms")),x(r=>r===null?null:Number(r)),k(r=>r===null||Number.isInteger(r)&&Number.isFinite(r)&&r>=0));const t=50;this._indeterminedLoadingTime$=this._parsedIndeterminateProgress$.pipe(T(!1),ke(),k(([r,i])=>i&&!r),kn(()=>An(t).pipe(Rn(ut(2e4*t)))),x(r=>r*t),T(0)),this._loading$=this._parsedProgress$.pipe(Y(this._indeterminedLoadingTime$,this._parsedIndeterminateDurationMs$,this._parsedIndeterminateProgress$),or(),T(0)),this._activeIndeterminateProgress$=this._parsedIndeterminateProgress$.pipe(Y(this._loading$,this._indeterminedLoadingTime$,this._parsedIndeterminateDurationMs$),rr(),T(!1)),this._disabled$=this._parsedDisabled$.pipe(Y(this._activeIndeterminateProgress$,this._loading$),ir(),T(!1)),this._loadingBarTransitionEnabled$=this._loading$.pipe(ke(),x(([r,i])=>i>=r),T(!1))}static get observedAttributes(){return["progress","disabled","indeterminate-progress","indeterminate-duration-ms"]}async connectedCallback(){this.attachShadow({mode:"open"}),C(this).appendChild(cr.content.cloneNode(!0)),this._renderSubscription=this._disabled$.pipe(Y(this._loading$,this._activeIndeterminateProgress$,this._loadingBarTransitionEnabled$)).subscribe(r=>{this.render(...r)}),this._attributeChanges$.next(["disabled",this.getAttribute("disabled")]),this._attributeChanges$.next(["progress",this.getAttribute("progress")]),this._attributeChanges$.next(["indeterminate-progress",this.getAttribute("indeterminate-progress")]),this._attributeChanges$.next(["indeterminate-duration-ms",this.getAttribute("indeterminate-duration-ms")])}attributeChangedCallback(t){this._attributeChanges$.next([t,this.getAttribute(t)])}render(t,r,i,o){if(!this.shadowRoot)return;const s=C(this),a=$(s,"#progress"),u=$(s,"button"),c=$(s,"progress");u instanceof HTMLButtonElement&&(u.disabled=t),i?(u.classList.remove("indeterminate-loading-end"),u.classList.add("indeterminate-loading")):(u.classList.add("indeterminate-loading-end"),setTimeout(()=>{u.classList.remove("indeterminate-loading")},500)),o?a.classList.add("transition"):a.classList.remove("transition"),a.style.width=`${r}%`,c instanceof HTMLProgressElement&&(c.value=r)}disconnectedCallback(){var t,r;(t=this._clickSubscription)==null||t.unsubscribe(),(r=this._renderSubscription)==null||r.unsubscribe()}}customElements.define(ar,ur);const cr=D(sr`
	<style>
		:host {
			display: inline-block;
		}

		/* ❤️ https://codepen.io/yuhomyan/pen/OJMejWJ */

		.custom-btn {
			border: none;
			font-family: ds-notes-sans;
			font-size: 1rem;
			display: grid;
			place-content: center;
			border-radius: 5px;
			padding: 10px 25px;
			font-weight: 500;
			background: transparent;
			transition: all 0.3s ease;
			position: relative;
			box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
			7px 7px 20px 0px rgba(0,0,0,.1),
			4px 4px 5px 0px rgba(0,0,0,.1);
			outline: none;
			grid-area: 2 / 2 / 3 / 3;
			user-select: none;
		}

		.indeterminate-loading {
			/*animation: transparency-fade 1.5s ease-in-out infinite;*/
		}

		.indeterminate-loading-end {
			animation-iteration-count: 1;
		}	

		@keyframes transparency-fade {
			0% {
				background-color: transparent;
			}
			50% {
				background-color: rgba(255, 255, 255, 0.15);
			}
			100% {
				background-color: transparent;
			}
		}

		@media screen and (min-width: 800px) {
			.custom-btn {
				font-size: 1.4rem;
			}
		}

		.btn-16 {
			border: none;
		}
		.btn-16:after {
			position: absolute;
			content: "";
			width: 0;
			height: 100%;
			top: 0;
			left: 0;
			direction: rtl;
			z-index: -1;
			box-shadow: -1px -1px 5px 0px #fff0, -1px -1px 5px 0px #fff, 7px 7px 10px 0px #0002, 4px 4px 5px 0px #0001;
			transition: all 0.3s ease;
			border-radius: 5px;
			background-color: #fff3;
		}
		.btn-16:hover {
		}
		.btn-16:hover:after {
			left: auto;
			right: 0;
			width: 100%;
		}

		.btn-16:hover:after:disabled {
			left: initial;
			right: initial;
			width: inherit;
		}

		.btn-16:active {
			top: 2px;
		}

		.button-container {
			display: grid;
			grid-template-columns: 0.4rem 1fr 0.4rem;
			grid-template-rows: 0.4rem 1fr 0.4rem;
			animation: fadeIn 0.3s ease-in-out;
			animation-delay: 0.3s;
			opacity: 0;
			animation-fill-mode: forwards;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}

		.progress-container {
			grid-area: 2 / 2 / 3 / 3;
		}

		#progress {
			background-color: #fff3;
			height: 100%;
			width: 0%;
			border-radius: 5px;
		}

		progress {
			visibility: hidden;
		}

		#progress.transition {
			transition: width 0.3s ease-in-out;
		}

		button {
			background-color: transparent;
			padding: 0;
			border: none;
		}
	</style>

	<div className="button-container">
		<button className="custom-btn btn-16">
			<slot></slot>
		</button>
		<div className="progress-container">
			<div id="progress"></div>
		</div>
		<progress></progress>
	</div>
`);function dt(e){const n=document.createElement("template");return n.innerHTML=e.join(""),n}const K=class K extends HTMLElement{async connectedCallback(){var n;this.attachShadow({mode:"open"}),(n=this.shadowRoot)==null||n.appendChild(K.template.content.cloneNode(!0))}};g(K,"template",dt`
	<style>
		:host {
			width: 100svw;
			height: 100svh; 
			display:block; 
			position: fixed; 
			top: 0; 
			left: 0;
			z-index: -1;
		}

		*,
		*::before,
		*::after {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		.body {
			height: 100%;
			min-height: 100vh;
			background: linear-gradient(90deg, #aea4e3, #d3ffe8);
		}

		.container {
			background:#1F2024;
			height: 100%;
			overflow: hidden;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.blob-c {
			min-height: 100vh;
			overflow: hidden;
			position:absolute;
			width: 100%;
			filter: blur(7vw);
		}

		.blob {
			background:#26C3F9;
			height: 4.2vw;
			width: 5.6vw;
			border-radius: 40% 50% 30% 40%;
			opacity:.7;
			position: absolute;
			left: 75%;
			top: 40%;
		}

		.blob.one{
			background:#0085FF;
			height: 10.4vw;
			width: 13.9vw;
			left: 0.7vw;
			top: 0.7vw;
			transform: rotate(-180deg);
		}

		.blob.two{
			background:#4EAEFF;
			height: 10.4vw;
			width: 10.4vw;
			left: 41.7vw;
			top: 17.4vw;
			transform: rotate(-180deg);
		}

		.blob.three{
			background:#0EAFFF;
			height: 10.4vw;
			width: 10.4vw;
			left: 55.6vw;
			top: 2.1vw;
			transform: rotate(-180deg);
		}

		.blob.four{
			background:#4EAEFF;
			height: 6.9vw;
			width: 6.9vw;
			left: 34.7vw;
			top: 4.2vw;
			transform: rotate(-180deg);
		}

		.blob.five{
			background:#0085FF;
			height: 6.9vw;
			width: 5.6vw;
			left: 33.3vw;
			top: 17.4vw;
			transform: rotate(-180deg);
		}

		.blob.six{
			background:#0EAFFF;
			height: 4.9vw;
			width: 6.9vw;
			left: 11.1vw;
			top: 27.8vw;
			transform: rotate(-180deg);
		}

		.blob.seven{
			background: #0085FF;
			height: 4.9vw;
			width: 6.9vw;
			left: 27.8vw;
			top: 27.8vw;
			transform: rotate(-180deg);
		}

		.blob.height{
			height: 5.6vw;
			width: 10vw;
			left: 55.6vw;
			top: 55.6vw;
			transform: rotate(-180deg);
		}

		.blob.nine {
			background: #0EAFFF;
			height: 5.6vw;
			width: 2vw;
			left: 42.6vw;
			top: 64.6vw;
			transform: rotate(-180deg);
		}

		@keyframes transform
		{
				0%,
			100% { border-radius: 33% 67% 70% 30% / 30% 40% 70% 70%; } 
			20% { border-radius: 37% 63% 51% 49% / 37% 35% 35% 63%; } 
			40% { border-radius: 36% 64% 64% 36% / 64% 48% 52% 26%; } 
			60% { border-radius: 37% 63% 51% 49% / 30% 30% 70% 73%; } 
			80% { border-radius: 40% 60% 42% 58% / 51% 51% 49% 59%; } 
		}

		@keyframes movement_one
		{
				0%,
			100% { transform: none; }
			50% { transform: translate(50%, 20%) rotateY(10deg) scale(1); }
		}

		@keyframes movement_two
		{
				0%,
			500% { transform: none; }
			50% { transform: translate(50%, 100%) rotate(-200deg) scale(1.3);}
		}
	</style>

	<div class="body">
		<div class="container">
			<div class="blob-c">
			<div class="blob"></div>
			<div class="blob one"></div>
			<div class="blob two"></div>
			<div class="blob three"></div>
			<div class="blob four"></div>
			<div class="blob five"></div>
			<div class="blob six"></div>
			<div class="blob seven"></div>
			<div class="blob height"></div>
			<div class="blob nine"></div>
		</div>
	</div>
</div>
`);let le=K;const Q=class Q extends HTMLElement{async connectedCallback(){var t;this.attachShadow({mode:"open"});const n=Q.template.content.cloneNode(!0);(t=this.shadowRoot)==null||t.appendChild(n)}};g(Q,"template",dt`
		<style>
			::slotted(*) {
				color: #C2C2C2;
				font-family: "Saeada";
			}

			::slotted(h1) {
				font-size: clamp(2rem, 6vw, 3rem);
			}

			::slotted(h2) {
				font-size: clamp(1.2rem, 3.6vw, 1.8rem);
			}

			::slotted(p), ::slotted(span), ::slotted(input), ::slotted(ul) {
				font-size: clamp(0.726rem, 2.2vw, 1.1rem);
			}

			::slotted(ul) {
				line-height: 2;
			}

			:host([disabled]) ::slotted(*) {
				opacity: 0.5;
			}
		</style>

		<slot></slot>
	`);let fe=Q;customElements.define("ec-background",le);customElements.define("ec-typography",fe);
