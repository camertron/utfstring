!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var n in r)("object"==typeof exports?exports:t)[n]=r[n]}}(self,(()=>(()=>{"use strict";var t={221:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.UtfString=e.createUtfSafeCharScannerHandlingSurrogatePairs=e.createSurrogatePairScanner=e.surrogatePairs=void 0;const n=r(787);function s(){return new RegExp(e.surrogatePairs.source,"g")}function i(){const t=new Array;return t.push(e.surrogatePairs.source),t.push("[^]"),new RegExp(t.join("|"),"g")}e.surrogatePairs=/[\uD800-\uDBFF][\uDC00-\uDFFF]/,e.createSurrogatePairScanner=s,e.createUtfSafeCharScannerHandlingSurrogatePairs=i;class a{constructor(t){this.unsafeString=t}*[Symbol.iterator](){for(let t=0;t<this.length;++t)yield this.charAt(t)}charAt(t){const e=this.getClass(),r=e.charAt(this.unsafeString,t);return new e(r)}charCodeAt(t){return this.getClass().charCodeAt(this.unsafeString,t)}codePointAt(t){return this.getClass().charCodeAt(this.unsafeString,t)}concat(...t){return new(this.getClass())(this.unsafeString+t.map((t=>String(t))).join(""))}endsWith(t,e){return this.unsafeString.endsWith(t.toString(),e)}equals(t){return this.unsafeString===(null==t?void 0:t.toString())}findByteIndex(t){return this.getClass().findByteIndex(this.unsafeString,t)}findCharIndex(t){return this.getClass().findCharIndex(this.unsafeString,t)}includes(t){return-1!==this.indexOf(t)}indexOf(t,e=0){return this.getClass().indexOf(this.unsafeString,t.toString(),e)}lastIndexOf(t,e){return this.getClass().lastIndexOf(this.unsafeString,t.toString(),e)}get length(){return this.getClass().lengthOf(this.unsafeString)}match(t){return this.toString().match(t instanceof a?t.toString():t)}padEnd(t,e){const r=this.getClass();return new r(r.padEnd(this.unsafeString,t,null==e?void 0:e.toString()))}padStart(t,e){const r=this.getClass();return new r(r.padStart(this.unsafeString,t,null==e?void 0:e.toString()))}repeat(t){return new(this.getClass())(this.unsafeString.repeat(t))}replace(t,e){return t instanceof a&&(t=t.toString()),e instanceof a&&(e=e.toString()),new(this.getClass())(this.unsafeString.replace(t,e))}slice(t,e){const r=this.getClass(),n=r.slice(this.unsafeString,t,e);return new r(n)}split(t,e){if(""===t)return[...this].slice(0,e);const r=this.getClass();return this.unsafeString.split(t,e).map((t=>new r(t)))}startsWith(t,e){return this.unsafeString.startsWith(t.toString(),e)}substr(t,e){const r=this.getClass(),n=r.substr(this.unsafeString,t,e);return new r(n)}substring(t,e){const r=this.getClass(),n=r.substring(this.unsafeString,t,e);return new r(n)}toBytes(){return this.getClass().stringToBytes(this.unsafeString)}toCharArray(){return this.getClass().stringToCharArray(this.unsafeString)}toCodePoints(){return this.getClass().stringToCodePoints(this.unsafeString)}toLowerCase(){return new(this.getClass())(this.unsafeString.toLowerCase())}toString(){return this.unsafeString}toUpperCase(){return new(this.getClass())(this.unsafeString.toUpperCase())}trim(){return new(this.getClass())(this.unsafeString.trim())}trimEnd(){return new(this.getClass())(this.unsafeString.trimEnd())}trimLeft(){return new(this.getClass())(this.unsafeString.trimLeft())}trimRight(){return new(this.getClass())(this.unsafeString.trimRight())}trimStart(){return new(this.getClass())(this.unsafeString.trimStart())}getClass(){return Object.getPrototypeOf(this).constructor}static bytesToString(t){const e=new Array;for(let r=0;r<t.length;r+=2){const n=t[r]<<8|t[r+1];e.push(String.fromCharCode(n))}return e.join("")}static charAt(t,e){const r=this.findByteIndex(t,e);if(r<0)return"";const n=t.slice(r,r+8),s=this.createUtfSafeCharScanner().exec(n);return null===s?n[0]:s[0]}static charCodeAt(t,e){const r=this.findSurrogateByteIndex(t,e);if(r<0)return NaN;const n=t.charCodeAt(r);return 55296<=n&&n<=56319?1024*(n-55296)+(t.charCodeAt(r+1)-56320)+65536:n}static codePointsToString(t){return t.map((t=>this.stringFromCharCode(t))).join("")}static findByteIndex(t,e){return e>=this.lengthOf(t)?-1:this.scan(t,this.createUtfSafeCharScanner(),e)}static findCharIndex(t,e){if(e>=t.length)return-1;if(!this.containsUnsafeUtfChars(t))return e;const r=this.createUtfSafeCharScanner();let n=0;for(;null!==r.exec(t)&&!(r.lastIndex>e);)n++;return n}static fromBytes(t){return new this(this.bytesToString(t))}static fromCharCode(t){return new this(this.stringFromCharCode(t))}static fromCodePoints(t){return new this(this.codePointsToString(t))}static indexOf(t,e,r=0){const n=this.findByteIndex(t,r),s=t.indexOf(e,n);return s<0?-1:this.findCharIndex(t,s)}static join(t,e=","){return new this(t.map((t=>(0,n.isDefined)(t)?t.toString():"")).join(e.toString()))}static lastIndexOf(t,e,r){let s;if((0,n.isDefined)(r)){const n=this.findByteIndex(t,r);s=t.lastIndexOf(e,n)}else s=t.lastIndexOf(e);return s<0?-1:this.findCharIndex(t,s)}static lengthOf(t){return this.findCharIndex(t,t.length-1)+1}static padEnd(t,e,r){if(e<=this.lengthOf(t))return t;r||(r=" ");let n=0,s=t;do{s+=this.charAt(r,n),++n,n>=this.lengthOf(r)&&(n=0)}while(this.lengthOf(s)<e);return s}static padStart(t,e,r){if(e<=this.lengthOf(t))return t;r||(r=" ");let n=0,s="";do{s+=this.charAt(r,n),++n,n>=this.lengthOf(r)&&(n=0)}while(this.lengthOf(s+t)<e);return s+t}static slice(t,e,r){(0,n.isNumber)(e)?e<0&&(e=this.lengthOf(t)+e):e=0,!(0,n.isNumber)(r)||r>=this.lengthOf(t)?r=t.length:r<0&&(r=this.lengthOf(t)+r);let s=this.findByteIndex(t,e);s<0&&(s=t.length);let i=this.findByteIndex(t,r);return i<0&&(i=t.length),t.slice(s,i)}static stringFromCharCode(t){return t>65535?(t-=65536,String.fromCharCode(55296+(t>>10),56320+(1023&t))):String.fromCharCode(t)}static stringToBytes(t){let e=new Array;for(let r=0;r<t.length;r++){let n=t.charCodeAt(r);const s=new Array;for(;n>0;)s.push(255&n),n>>=8;1===s.length&&s.push(0),e=e.concat(s.reverse())}return e}static stringToCharArray(t){const e=new Array,r=this.createUtfSafeCharScanner();let n;do{if(n=r.exec(t),null===n)break;e.push(n[0])}while(null!==n);return e}static stringToCodePoints(t){const e=new Array;for(let r=0;r<t.length;r++){const n=this.charCodeAt(t,r);if(!n)break;e.push(n)}return e}static substr(t,e,r){return(0,n.isNumber)(e)||(e=0),(0,n.isDefined)(r)&&(isNaN(r)&&(r=0),r<=0)?"":(e<0&&(e=Math.max(this.lengthOf(t)+e,0)),(0,n.isDefined)(r)?this.slice(t,e,e+r):this.slice(t,e))}static substring(t,e,r){return(!(0,n.isNumber)(e)||e<0)&&(e=0),(0,n.isDefined)(r)?(isNaN(r)||r<0)&&(r=0):r=this.lengthOf(t),e>r&&([e,r]=[r,e]),this.slice(t,e,r)}static findSurrogateByteIndex(t,e){return this.scan(t,s(),e)}static scan(t,e,r){if(!this.containsUnsafeUtfChars(t))return r;let n=0,s=0;for(;;){const i=e.exec(t),a=i?i.index:t.length;for(;s<r;){if(n===a){s<r&&(s++,i?n+=i[0].length:n++);break}n++,s++}if(s===r)break;if(n>=t.length||!i)return-1}return n}static containsUnsafeUtfChars(t){return this.createUnsafeUtfCharFinder().test(t)}static createUnsafeUtfCharFinder(){return s()}static createUtfSafeCharScanner(){return i()}}e.UtfString=a},762:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.UtfVisualString=e.createUtfSafeCharScannerHandingRegionalIndicatorPairsAndSurrogatePairs=e.createRegionalIndicatorAndSurrogatePairScanner=void 0;const n=r(221),s=/\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/;function i(){return new RegExp(s.source+"|"+n.surrogatePairs.source,"g")}function a(){const t=new Array;return t.push(s.source),t.push(n.surrogatePairs.source),t.push("[^]"),new RegExp(t.join("|"),"g")}e.createRegionalIndicatorAndSurrogatePairScanner=i,e.createUtfSafeCharScannerHandingRegionalIndicatorPairsAndSurrogatePairs=a;class o extends n.UtfString{static createUnsafeUtfCharFinder(){return i()}static createUtfSafeCharScanner(){return a()}}e.UtfVisualString=o},787:(t,e)=>{function r(t){return null!=t}Object.defineProperty(e,"__esModule",{value:!0}),e.isNumber=e.isDefined=void 0,e.isDefined=r,e.isNumber=function(t){return r(t)&&"number"==typeof t&&!isNaN(t)}}},e={};function r(n){var s=e[n];if(void 0!==s)return s.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}var n={};return(()=>{var t=n;Object.defineProperty(t,"__esModule",{value:!0}),t.UtfVisualString=t.UtfString=void 0;const e=r(221);Object.defineProperty(t,"UtfString",{enumerable:!0,get:function(){return e.UtfString}});const s=r(762);Object.defineProperty(t,"UtfVisualString",{enumerable:!0,get:function(){return s.UtfVisualString}}),(0,r(787).isDefined)(window)&&(window.UtfString=e.UtfString,window.UtfVisualString=s.UtfVisualString)})(),n})()));