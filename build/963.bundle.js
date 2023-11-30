/*! For license information please see 963.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkoversight=self.webpackChunkoversight||[]).push([[963],{963:(e,t,r)=>{r.r(t),r.d(t,{default:()=>p});var n=r(294),o=r(726),a=r(257),i=r(782),c=r(250);function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function l(){l=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function f(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{f({},"")}catch(e){f=function(e,t,r){return e[t]=r}}function h(e,t,r,n){var a=t&&t.prototype instanceof g?t:g,i=Object.create(a.prototype),c=new _(n||[]);return o(i,"_invoke",{value:k(e,r,c)}),i}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=h;var y="suspendedStart",d="suspendedYield",m="executing",v="completed",E={};function g(){}function b(){}function w(){}var O={};f(O,i,(function(){return this}));var x=Object.getPrototypeOf,N=x&&x(x(j([])));N&&N!==r&&n.call(N,i)&&(O=N);var I=w.prototype=g.prototype=Object.create(O);function L(e){["next","throw","return"].forEach((function(t){f(e,t,(function(e){return this._invoke(t,e)}))}))}function S(e,t){function r(o,a,i,c){var l=p(e[o],e,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==u(f)&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,i,c)}),(function(e){r("throw",e,i,c)})):t.resolve(f).then((function(e){s.value=e,i(s)}),(function(e){return r("throw",e,i,c)}))}c(l.arg)}var a;o(this,"_invoke",{value:function(e,n){function o(){return new t((function(t,o){r(e,n,t,o)}))}return a=a?a.then(o,o):o()}})}function k(t,r,n){var o=y;return function(a,i){if(o===m)throw new Error("Generator is already running");if(o===v){if("throw"===a)throw i;return{value:e,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=R(c,n);if(u){if(u===E)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=m;var l=p(t,r,n);if("normal"===l.type){if(o=n.done?v:d,l.arg===E)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=v,n.method="throw",n.arg=l.arg)}}}function R(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,R(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),E;var a=p(o,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,E;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,E):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,E)}function A(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function T(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(A,this),this.reset(!0)}function j(t){if(t||""===t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}throw new TypeError(u(t)+" is not iterable")}return b.prototype=w,o(I,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:b,configurable:!0}),b.displayName=f(w,s,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,w):(e.__proto__=w,f(e,s,"GeneratorFunction")),e.prototype=Object.create(I),e},t.awrap=function(e){return{__await:e}},L(S.prototype),f(S.prototype,c,(function(){return this})),t.AsyncIterator=S,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new S(h(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},L(I),f(I,s,"Generator"),f(I,i,(function(){return this})),f(I,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=j,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(T),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,E):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),E},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),T(r),E}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;T(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),E}},t}function s(e,t,r,n,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const p=function(){for(var e,t=f((0,n.useState)({period:"month",day:"1",frequency:"1"}),2),r=t[0],u=t[1],h=f((0,n.useState)({}),2),p=h[0],y=h[1],d=(0,i.useMessageBanner)().showBanner,m=(0,c.s0)(),v=["MON","TUE","WED","THU","FRI","SAT","SUN"],E=["JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEPT","NOV","DEC"],g=[],b=1;b<32;b++)g.push({label:b,value:b});var w=function(e){return"hour"===e.period?{expression:"0 * * * *",description:"EVERY HOUR"}:"month"===e.period?{expression:"0 0 0 ".concat(e.day," 1/").concat(e.frequency," * *"),description:"EVERY ".concat(e.frequency," MONTH(S) ON DAY ").concat(e.day)}:"week"===e.period?{expression:"0 0 0 * * ".concat(e.day),description:"EVERY WEEK ON ".concat(v[e.day-1])}:"year"===e.period?{expression:"0 0 0 ".concat(e.day," ").concat(e.month," *"),description:"EVERY YEAR ON ".concat(E[e.month-1]," ").concat(e.day)}:void 0},O=function(e){if("hour"===e.period)return!0;if("month"===e.period){if(!e.day&&!e.frequency)return!1;if(!e.frequency.length)return!1}else if("week"===e.period){if(!e.day)return!1}else{if("year"!==e.period)return!1;if("2"===e.month&&e.day>"28")return!1;if("4"===e.month&&e.day>"30")return!1}return!0};return n.createElement("div",{className:"bg-white p-4"},n.createElement("h1",null,"NEW SCHEDULE"),n.createElement(o.Z,{label:"label",type:"text",readOnly:!1,formInfo:p,setFormInfo:y}),n.createElement(o.Z,{label:"amount",type:"number",readOnly:!1,formInfo:p,setFormInfo:y}),n.createElement("button",{className:"year"===r.period?"underline":null,onClick:function(){return u({period:"year",month:"1",day:"1"})}},"YEAR"),n.createElement("button",{className:"mx-2 ".concat("month"===r.period?"underline":""),onClick:function(){return u({period:"month",day:"1",frequency:"1"})}},"MONTH"),n.createElement("button",{className:"".concat("week"===r.period?"underline":""),onClick:function(){return u({period:"week",day:"1"})}},"WEEK"),n.createElement("button",{className:"mx-2 ".concat("hour"===r.period?"underline":""),onClick:function(){return u({period:"hour"})}},"HOUR"),function(){var e="border p-4 m-4";switch(r.period){case"year":return n.createElement("div",{className:e},n.createElement("div",null,"YEAR"),n.createElement("span",null,"DESCRIPTION: "),n.createElement("span",null,"EVERY YEAR ON ".concat(E[r.month-1]||"__"," ").concat(r.day)),n.createElement(o.Z,{label:"month",type:"dropdown",options:E.map((function(e,t){return{label:e,value:t+1}})),readOnly:!1,formInfo:r,setFormInfo:u}),n.createElement(o.Z,{label:"day",type:"dropdown",options:g,readOnly:!1,formInfo:r,setFormInfo:u}));case"month":return n.createElement("div",{className:e},n.createElement("div",null,"MONTH"),n.createElement("span",null,"DESCRIPTION: "),n.createElement("span",null,"EVERY ".concat(r.frequency||"__"," MONTH(S) ON DAY ").concat(r.day||"__")),n.createElement(o.Z,{label:"day",type:"dropdown",options:g,readOnly:!1,formInfo:r,setFormInfo:u}),n.createElement(o.Z,{label:"frequency",type:"number",readOnly:!1,formInfo:r,setFormInfo:u}));case"week":return n.createElement("div",{className:e},n.createElement("div",null,"WEEK"),n.createElement("span",null,"DESCRPTION: "),n.createElement("span",null,"EVERY ".concat(v[r.day-1])),n.createElement(o.Z,{label:"day",type:"dropdown",options:v.map((function(e,t){return{label:e,value:t+1}})),readOnly:!1,formInfo:r,setFormInfo:u}));case"hour":return n.createElement("div",{className:e},n.createElement("div",null,"HOUR"),n.createElement("span",null,"DESCRIPTION: EVERY HOUR"))}}(),n.createElement("button",{className:"btn",onClick:function(){return(e=e||(t=l().mark((function e(){var t,n,o,i,c;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,p.label&&p.amount){e.next=3;break}return e.abrupt("return");case 3:if(O(r)){e.next=5;break}throw Error("Invalid input.");case 5:return t=w(r),n=t.expression,o=t.description,i={label:p.label,amount:p.amount,expression:n,description:o},e.next=9,a.Z.post("/api/payments/schedule",i);case 9:c=e.sent,d({style:"success",message:c.data.message}),setTimeout((function(){m("/payments/schedules")}),500),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),console.error(e.t0),d({style:"error",message:a.Z.isAxiosError(e.t0)?e.t0.response.data.message:e.t0.message});case 18:case"end":return e.stop()}}),e,null,[[0,14]])})),function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(e){s(a,n,o,i,c,"next",e)}function c(e){s(a,n,o,i,c,"throw",e)}i(void 0)}))})).apply(this,arguments);var t}},"SUBMIT"))}}}]);