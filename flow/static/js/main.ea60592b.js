/*! For license information please see main.ea60592b.js.LICENSE.txt */
(()=>{"use strict";var e={4(e,t,n){var r=n(853),a=n(43),i=n(950);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function l(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function d(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function c(e){if(31===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function u(e){if(l(e)!==e)throw Error(o(188))}function p(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=p(e)))return t;e=e.sibling}return null}var m=Object.assign,f=Symbol.for("react.element"),h=Symbol.for("react.transitional.element"),g=Symbol.for("react.portal"),x=Symbol.for("react.fragment"),v=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),k=Symbol.for("react.consumer"),y=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),S=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),N=Symbol.for("react.lazy");Symbol.for("react.scope");var _=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var E=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var z=Symbol.iterator;function C(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=z&&e[z]||e["@@iterator"])?e:null}var A=Symbol.for("react.client.reference");function D(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===A?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case x:return"Fragment";case b:return"Profiler";case v:return"StrictMode";case w:return"Suspense";case S:return"SuspenseList";case _:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case g:return"Portal";case y:return e.displayName||"Context";case k:return(e._context.displayName||"Context")+".Consumer";case j:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case $:return null!==(t=e.displayName||null)?t:D(e.type)||"Memo";case N:t=e._payload,e=e._init;try{return D(e(t))}catch(ql){}}return null}var F=Array.isArray,O=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,T=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P={pending:!1,data:null,method:null,action:null},L=[],R=-1;function I(e){return{current:e}}function B(e){0>R||(e.current=L[R],L[R]=null,R--)}function M(e,t){R++,L[R]=e.current,e.current=t}var V,U,K=I(null),H=I(null),W=I(null),q=I(null);function G(e,t){switch(M(W,t),M(H,e),M(K,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?vu(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=bu(t=vu(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}B(K),M(K,e)}function Y(){B(K),B(H),B(W)}function J(e){null!==e.memoizedState&&M(q,e);var t=K.current,n=bu(t,e.type);t!==n&&(M(H,e),M(K,n))}function Q(e){H.current===e&&(B(K),B(H)),q.current===e&&(B(q),up._currentValue=P)}function X(e){if(void 0===V)try{throw Error()}catch(ql){var t=ql.stack.trim().match(/\n( *(at )?)/);V=t&&t[1]||"",U=-1<ql.stack.indexOf("\n    at")?" (<anonymous>)":-1<ql.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+V+e+U}var Z=!1;function ee(e,t){if(!e||Z)return"";Z=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(ql){var r=ql}Reflect.construct(e,[],n)}else{try{n.call()}catch(a){r=a}e.call(n.prototype)}}else{try{throw Error()}catch(i){r=i}(n=e())&&"function"===typeof n.catch&&n.catch(function(){})}}catch(o){if(o&&r&&"string"===typeof o.stack)return[o.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=r.DetermineComponentFrameRoot(),o=i[0],s=i[1];if(o&&s){var l=o.split("\n"),d=s.split("\n");for(a=r=0;r<l.length&&!l[r].includes("DetermineComponentFrameRoot");)r++;for(;a<d.length&&!d[a].includes("DetermineComponentFrameRoot");)a++;if(r===l.length||a===d.length)for(r=l.length-1,a=d.length-1;1<=r&&0<=a&&l[r]!==d[a];)a--;for(;1<=r&&0<=a;r--,a--)if(l[r]!==d[a]){if(1!==r||1!==a)do{if(r--,0>--a||l[r]!==d[a]){var c="\n"+l[r].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}}while(1<=r&&0<=a);break}}}finally{Z=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?X(n):""}function te(e,t){switch(e.tag){case 26:case 27:case 5:return X(e.type);case 16:return X("Lazy");case 13:return e.child!==t&&null!==t?X("Suspense Fallback"):X("Suspense");case 19:return X("SuspenseList");case 0:case 15:return ee(e.type,!1);case 11:return ee(e.type.render,!1);case 1:return ee(e.type,!0);case 31:return X("Activity");default:return""}}function ne(e){try{var t="",n=null;do{t+=te(e,n),n=e,e=e.return}while(e);return t}catch(ql){return"\nError generating stack: "+ql.message+"\n"+ql.stack}}var re=Object.prototype.hasOwnProperty,ae=r.unstable_scheduleCallback,ie=r.unstable_cancelCallback,oe=r.unstable_shouldYield,se=r.unstable_requestPaint,le=r.unstable_now,de=r.unstable_getCurrentPriorityLevel,ce=r.unstable_ImmediatePriority,ue=r.unstable_UserBlockingPriority,pe=r.unstable_NormalPriority,me=r.unstable_LowPriority,fe=r.unstable_IdlePriority,he=r.log,ge=r.unstable_setDisableYieldValue,xe=null,ve=null;function be(e){if("function"===typeof he&&ge(e),ve&&"function"===typeof ve.setStrictMode)try{ve.setStrictMode(xe,e)}catch(t){}}var ke=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ye(e)/je|0)|0},ye=Math.log,je=Math.LN2;var we=256,Se=262144,$e=4194304;function Ne(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return 261888&e;case 262144:case 524288:case 1048576:case 2097152:return 3932160&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function _e(e,t,n){var r=e.pendingLanes;if(0===r)return 0;var a=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=134217727&r;return 0!==s?0!==(r=s&~i)?a=Ne(r):0!==(o&=s)?a=Ne(o):n||0!==(n=s&~e)&&(a=Ne(n)):0!==(s=r&~i)?a=Ne(s):0!==o?a=Ne(o):n||0!==(n=r&~e)&&(a=Ne(n)),0===a?0:0!==t&&t!==a&&0===(t&i)&&((i=a&-a)>=(n=t&-t)||32===i&&0!==(4194048&n))?t:a}function Ee(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function ze(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function Ce(){var e=$e;return 0===(62914560&($e<<=1))&&($e=4194304),e}function Ae(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function De(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ke(t);e.entangledLanes|=t,e.entanglements[r]=1073741824|e.entanglements[r]|261930&n}function Oe(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ke(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}function Te(e,t){var n=t&-t;return 0!==((n=0!==(42&n)?1:Pe(n))&(e.suspendedLanes|t))?0:n}function Pe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Le(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function Re(){var e=T.p;return 0!==e?e:void 0===(e=window.event)?32:_p(e.type)}function Ie(e,t){var n=T.p;try{return T.p=e,t()}finally{T.p=n}}var Be=Math.random().toString(36).slice(2),Me="__reactFiber$"+Be,Ve="__reactProps$"+Be,Ue="__reactContainer$"+Be,Ke="__reactEvents$"+Be,He="__reactListeners$"+Be,We="__reactHandles$"+Be,qe="__reactResources$"+Be,Ge="__reactMarker$"+Be;function Ye(e){delete e[Me],delete e[Ve],delete e[Ke],delete e[He],delete e[We]}function Je(e){var t=e[Me];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ue]||n[Me]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Lu(e);null!==e;){if(n=e[Me])return n;e=Lu(e)}return t}n=(e=n).parentNode}return null}function Qe(e){if(e=e[Me]||e[Ue]){var t=e.tag;if(5===t||6===t||13===t||31===t||26===t||27===t||3===t)return e}return null}function Xe(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(o(33))}function Ze(e){var t=e[qe];return t||(t=e[qe]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function et(e){e[Ge]=!0}var tt=new Set,nt={};function rt(e,t){at(e,t),at(e+"Capture",t)}function at(e,t){for(nt[e]=t,e=0;e<t.length;e++)tt.add(t[e])}var it=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ot={},st={};function lt(e,t,n){if(a=t,re.call(st,a)||!re.call(ot,a)&&(it.test(a)?st[a]=!0:(ot[a]=!0,0)))if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var r=t.toLowerCase().slice(0,5);if("data-"!==r&&"aria-"!==r)return void e.removeAttribute(t)}e.setAttribute(t,""+n)}var a}function dt(e,t,n){if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+n)}}function ct(e,t,n,r){if(null===r)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(n)}e.setAttributeNS(t,n,""+r)}}function ut(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function pt(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function mt(e){if(!e._valueTracker){var t=pt(e)?"checked":"value";e._valueTracker=function(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&"undefined"!==typeof r&&"function"===typeof r.get&&"function"===typeof r.set){var a=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){n=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e,t,""+e[t])}}function ft(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=pt(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function ht(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var gt=/[\n"\\]/g;function xt(e){return e.replace(gt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vt(e,t,n,r,a,i,o,s){e.name="",null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o?e.type=o:e.removeAttribute("type"),null!=t?"number"===o?(0===t&&""===e.value||e.value!=t)&&(e.value=""+ut(t)):e.value!==""+ut(t)&&(e.value=""+ut(t)):"submit"!==o&&"reset"!==o||e.removeAttribute("value"),null!=t?kt(e,o,ut(t)):null!=n?kt(e,o,ut(n)):null!=r&&e.removeAttribute("value"),null==a&&null!=i&&(e.defaultChecked=!!i),null!=a&&(e.checked=a&&"function"!==typeof a&&"symbol"!==typeof a),null!=s&&"function"!==typeof s&&"symbol"!==typeof s&&"boolean"!==typeof s?e.name=""+ut(s):e.removeAttribute("name")}function bt(e,t,n,r,a,i,o,s){if(null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.type=i),null!=t||null!=n){if(!("submit"!==i&&"reset"!==i||void 0!==t&&null!==t))return void mt(e);n=null!=n?""+ut(n):"",t=null!=t?""+ut(t):n,s||t===e.value||(e.value=t),e.defaultValue=t}r="function"!==typeof(r=null!=r?r:a)&&"symbol"!==typeof r&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o&&(e.name=o),mt(e)}function kt(e,t,n){"number"===t&&ht(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function yt(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ut(n),t=null,a=0;a<e.length;a++){if(e[a].value===n)return e[a].selected=!0,void(r&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function jt(e,t,n){null==t||((t=""+ut(t))!==e.value&&(e.value=t),null!=n)?e.defaultValue=null!=n?""+ut(n):"":e.defaultValue!==t&&(e.defaultValue=t)}function wt(e,t,n,r){if(null==t){if(null!=r){if(null!=n)throw Error(o(92));if(F(r)){if(1<r.length)throw Error(o(93));r=r[0]}n=r}null==n&&(n=""),t=n}n=ut(t),e.defaultValue=n,(r=e.textContent)===n&&""!==r&&null!==r&&(e.value=r),mt(e)}function St(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var $t=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Nt(e,t,n){var r=0===t.indexOf("--");null==n||"boolean"===typeof n||""===n?r?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":r?e.setProperty(t,n):"number"!==typeof n||0===n||$t.has(t)?"float"===t?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function _t(e,t,n){if(null!=t&&"object"!==typeof t)throw Error(o(62));if(e=e.style,null!=n){for(var r in n)!n.hasOwnProperty(r)||null!=t&&t.hasOwnProperty(r)||(0===r.indexOf("--")?e.setProperty(r,""):"float"===r?e.cssFloat="":e[r]="");for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Nt(e,a,r)}else for(var i in t)t.hasOwnProperty(i)&&Nt(e,i,t[i])}function Et(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zt=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ct=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function At(e){return Ct.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Dt(){}var Ft=null;function Ot(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Tt=null,Pt=null;function Lt(e){var t=Qe(e);if(t&&(e=t.stateNode)){var n=e[Ve]||null;e:switch(e=t.stateNode,t.type){case"input":if(vt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+xt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Ve]||null;if(!a)throw Error(o(90));vt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)(r=n[t]).form===e.form&&ft(r)}break e;case"textarea":jt(e,n.value,n.defaultValue);break e;case"select":null!=(t=n.value)&&yt(e,!!n.multiple,t,!1)}}}var Rt=!1;function It(e,t,n){if(Rt)return e(t,n);Rt=!0;try{return e(t)}finally{if(Rt=!1,(null!==Tt||null!==Pt)&&(ec(),Tt&&(t=Tt,e=Pt,Pt=Tt=null,Lt(t),e)))for(t=0;t<e.length;t++)Lt(e[t])}}function Bt(e,t){var n=e.stateNode;if(null===n)return null;var r=n[Ve]||null;if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(o(231,t,typeof n));return n}var Mt=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Vt=!1;if(Mt)try{var Ut={};Object.defineProperty(Ut,"passive",{get:function(){Vt=!0}}),window.addEventListener("test",Ut,Ut),window.removeEventListener("test",Ut,Ut)}catch(Xp){Vt=!1}var Kt=null,Ht=null,Wt=null;function qt(){if(Wt)return Wt;var e,t,n=Ht,r=n.length,a="value"in Kt?Kt.value:Kt.textContent,i=a.length;for(e=0;e<r&&n[e]===a[e];e++);var o=r-e;for(t=1;t<=o&&n[r-t]===a[i-t];t++);return Wt=a.slice(e,1<t?1-t:void 0)}function Gt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Yt(){return!0}function Jt(){return!1}function Qt(e){function t(t,n,r,a,i){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=a,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(a):a[o]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?Yt:Jt,this.isPropagationStopped=Jt,this}return m(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Yt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Yt)},persist:function(){},isPersistent:Yt}),t}var Xt,Zt,en,tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},nn=Qt(tn),rn=m({},tn,{view:0,detail:0}),an=Qt(rn),on=m({},rn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==en&&(en&&"mousemove"===e.type?(Xt=e.screenX-en.screenX,Zt=e.screenY-en.screenY):Zt=Xt=0,en=e),Xt)},movementY:function(e){return"movementY"in e?e.movementY:Zt}}),sn=Qt(on),ln=Qt(m({},on,{dataTransfer:0})),dn=Qt(m({},rn,{relatedTarget:0})),cn=Qt(m({},tn,{animationName:0,elapsedTime:0,pseudoElement:0})),un=Qt(m({},tn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),pn=Qt(m({},tn,{data:0})),mn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},fn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=hn[e])&&!!t[e]}function xn(){return gn}var vn=Qt(m({},rn,{key:function(e){if(e.key){var t=mn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Gt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?fn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xn,charCode:function(e){return"keypress"===e.type?Gt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Gt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),bn=Qt(m({},on,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),kn=Qt(m({},rn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xn})),yn=Qt(m({},tn,{propertyName:0,elapsedTime:0,pseudoElement:0})),jn=Qt(m({},on,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),wn=Qt(m({},tn,{newState:0,oldState:0})),Sn=[9,13,27,32],$n=Mt&&"CompositionEvent"in window,Nn=null;Mt&&"documentMode"in document&&(Nn=document.documentMode);var _n=Mt&&"TextEvent"in window&&!Nn,En=Mt&&(!$n||Nn&&8<Nn&&11>=Nn),zn=String.fromCharCode(32),Cn=!1;function An(e,t){switch(e){case"keyup":return-1!==Sn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Dn(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Fn=!1;var On={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!On[e.type]:"textarea"===t}function Pn(e,t,n,r){Tt?Pt?Pt.push(r):Pt=[r]:Tt=r,0<(t=au(t,"onChange")).length&&(n=new nn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ln=null,Rn=null;function In(e){Jc(e,0)}function Bn(e){if(ft(Xe(e)))return e}function Mn(e,t){if("change"===e)return t}var Vn=!1;if(Mt){var Un;if(Mt){var Kn="oninput"in document;if(!Kn){var Hn=document.createElement("div");Hn.setAttribute("oninput","return;"),Kn="function"===typeof Hn.oninput}Un=Kn}else Un=!1;Vn=Un&&(!document.documentMode||9<document.documentMode)}function Wn(){Ln&&(Ln.detachEvent("onpropertychange",qn),Rn=Ln=null)}function qn(e){if("value"===e.propertyName&&Bn(Rn)){var t=[];Pn(t,Rn,e,Ot(e)),It(In,t)}}function Gn(e,t,n){"focusin"===e?(Wn(),Rn=n,(Ln=t).attachEvent("onpropertychange",qn)):"focusout"===e&&Wn()}function Yn(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Bn(Rn)}function Jn(e,t){if("click"===e)return Bn(t)}function Qn(e,t){if("input"===e||"change"===e)return Bn(t)}var Xn="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function Zn(e,t){if(Xn(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!re.call(t,a)||!Xn(e[a],t[a]))return!1}return!0}function er(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function tr(e,t){var n,r=er(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=er(r)}}function nr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?nr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function rr(e){for(var t=ht((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=ht((e=t.contentWindow).document)}return t}function ar(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var ir=Mt&&"documentMode"in document&&11>=document.documentMode,or=null,sr=null,lr=null,dr=!1;function cr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;dr||null==or||or!==ht(r)||("selectionStart"in(r=or)&&ar(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},lr&&Zn(lr,r)||(lr=r,0<(r=au(sr,"onSelect")).length&&(t=new nn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=or)))}function ur(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var pr={animationend:ur("Animation","AnimationEnd"),animationiteration:ur("Animation","AnimationIteration"),animationstart:ur("Animation","AnimationStart"),transitionrun:ur("Transition","TransitionRun"),transitionstart:ur("Transition","TransitionStart"),transitioncancel:ur("Transition","TransitionCancel"),transitionend:ur("Transition","TransitionEnd")},mr={},fr={};function hr(e){if(mr[e])return mr[e];if(!pr[e])return e;var t,n=pr[e];for(t in n)if(n.hasOwnProperty(t)&&t in fr)return mr[e]=n[t];return e}Mt&&(fr=document.createElement("div").style,"AnimationEvent"in window||(delete pr.animationend.animation,delete pr.animationiteration.animation,delete pr.animationstart.animation),"TransitionEvent"in window||delete pr.transitionend.transition);var gr=hr("animationend"),xr=hr("animationiteration"),vr=hr("animationstart"),br=hr("transitionrun"),kr=hr("transitionstart"),yr=hr("transitioncancel"),jr=hr("transitionend"),wr=new Map,Sr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $r(e,t){wr.set(e,t),rt(t,[e])}Sr.push("scrollEnd");var Nr="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},_r=[],Er=0,zr=0;function Cr(){for(var e=Er,t=zr=Er=0;t<e;){var n=_r[t];_r[t++]=null;var r=_r[t];_r[t++]=null;var a=_r[t];_r[t++]=null;var i=_r[t];if(_r[t++]=null,null!==r&&null!==a){var o=r.pending;null===o?a.next=a:(a.next=o.next,o.next=a),r.pending=a}0!==i&&Or(n,a,i)}}function Ar(e,t,n,r){_r[Er++]=e,_r[Er++]=t,_r[Er++]=n,_r[Er++]=r,zr|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Dr(e,t,n,r){return Ar(e,t,n,r),Tr(e)}function Fr(e,t){return Ar(e,null,null,t),Tr(e)}function Or(e,t,n){e.lanes|=n;var r=e.alternate;null!==r&&(r.lanes|=n);for(var a=!1,i=e.return;null!==i;)i.childLanes|=n,null!==(r=i.alternate)&&(r.childLanes|=n),22===i.tag&&(null===(e=i.stateNode)||1&e._visibility||(a=!0)),e=i,i=i.return;return 3===e.tag?(i=e.stateNode,a&&null!==t&&(a=31-ke(n),null===(r=(e=i.hiddenUpdates)[a])?e[a]=[t]:r.push(t),t.lane=536870912|n),i):null}function Tr(e){if(50<Hd)throw Hd=0,Wd=null,Error(o(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Pr={};function Lr(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rr(e,t,n,r){return new Lr(e,t,n,r)}function Ir(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Br(e,t){var n=e.alternate;return null===n?((n=Rr(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=65011712&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Mr(e,t){e.flags&=65011714;var n=e.alternate;return null===n?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Vr(e,t,n,r,a,i){var s=0;if(r=e,"function"===typeof e)Ir(e)&&(s=1);else if("string"===typeof e)s=function(e,t,n){if(1===n||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,n,K.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case _:return(e=Rr(31,n,t,a)).elementType=_,e.lanes=i,e;case x:return Ur(n.children,a,i,t);case v:s=8,a|=24;break;case b:return(e=Rr(12,n,t,2|a)).elementType=b,e.lanes=i,e;case w:return(e=Rr(13,n,t,a)).elementType=w,e.lanes=i,e;case S:return(e=Rr(19,n,t,a)).elementType=S,e.lanes=i,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case y:s=10;break e;case k:s=9;break e;case j:s=11;break e;case $:s=14;break e;case N:s=16,r=null;break e}s=29,n=Error(o(130,null===e?"null":typeof e,"")),r=null}return(t=Rr(s,n,t,a)).elementType=e,t.type=r,t.lanes=i,t}function Ur(e,t,n,r){return(e=Rr(7,e,r,t)).lanes=n,e}function Kr(e,t,n){return(e=Rr(6,e,null,t)).lanes=n,e}function Hr(e){var t=Rr(18,null,null,0);return t.stateNode=e,t}function Wr(e,t,n){return(t=Rr(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qr=new WeakMap;function Gr(e,t){if("object"===typeof e&&null!==e){var n=qr.get(e);return void 0!==n?n:(t={value:e,source:t,stack:ne(t)},qr.set(e,t),t)}return{value:e,source:t,stack:ne(t)}}var Yr=[],Jr=0,Qr=null,Xr=0,Zr=[],ea=0,ta=null,na=1,ra="";function aa(e,t){Yr[Jr++]=Xr,Yr[Jr++]=Qr,Qr=e,Xr=t}function ia(e,t,n){Zr[ea++]=na,Zr[ea++]=ra,Zr[ea++]=ta,ta=e;var r=na;e=ra;var a=32-ke(r)-1;r&=~(1<<a),n+=1;var i=32-ke(t)+a;if(30<i){var o=a-a%5;i=(r&(1<<o)-1).toString(32),r>>=o,a-=o,na=1<<32-ke(t)+a|n<<a|r,ra=i+e}else na=1<<i|n<<a|r,ra=e}function oa(e){null!==e.return&&(aa(e,1),ia(e,1,0))}function sa(e){for(;e===Qr;)Qr=Yr[--Jr],Yr[Jr]=null,Xr=Yr[--Jr],Yr[Jr]=null;for(;e===ta;)ta=Zr[--ea],Zr[ea]=null,ra=Zr[--ea],Zr[ea]=null,na=Zr[--ea],Zr[ea]=null}function la(e,t){Zr[ea++]=na,Zr[ea++]=ra,Zr[ea++]=ta,na=t.id,ra=t.overflow,ta=e}var da=null,ca=null,ua=!1,pa=null,ma=!1,fa=Error(o(519));function ha(e){throw ya(Gr(Error(o(418,1<arguments.length&&void 0!==arguments[1]&&arguments[1]?"text":"HTML","")),e)),fa}function ga(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Me]=e,t[Ve]=r,n){case"dialog":Qc("cancel",t),Qc("close",t);break;case"iframe":case"object":case"embed":Qc("load",t);break;case"video":case"audio":for(n=0;n<Gc.length;n++)Qc(Gc[n],t);break;case"source":Qc("error",t);break;case"img":case"image":case"link":Qc("error",t),Qc("load",t);break;case"details":Qc("toggle",t);break;case"input":Qc("invalid",t),bt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":Qc("invalid",t);break;case"textarea":Qc("invalid",t),wt(t,r.value,r.defaultValue,r.children)}"string"!==typeof(n=r.children)&&"number"!==typeof n&&"bigint"!==typeof n||t.textContent===""+n||!0===r.suppressHydrationWarning||cu(t.textContent,n)?(null!=r.popover&&(Qc("beforetoggle",t),Qc("toggle",t)),null!=r.onScroll&&Qc("scroll",t),null!=r.onScrollEnd&&Qc("scrollend",t),null!=r.onClick&&(t.onclick=Dt),t=!0):t=!1,t||ha(e,!0)}function xa(e){for(da=e.return;da;)switch(da.tag){case 5:case 31:case 13:return void(ma=!1);case 27:case 3:return void(ma=!0);default:da=da.return}}function va(e){if(e!==da)return!1;if(!ua)return xa(e),ua=!0,!1;var t,n=e.tag;if((t=3!==n&&27!==n)&&((t=5===n)&&(t=!("form"!==(t=e.type)&&"button"!==t)||ku(e.type,e.memoizedProps)),t=!t),t&&ca&&ha(e),xa(e),13===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));ca=Pu(e)}else if(31===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));ca=Pu(e)}else 27===n?(n=ca,_u(e.type)?(e=Tu,Tu=null,ca=e):ca=n):ca=da?Ou(e.stateNode.nextSibling):null;return!0}function ba(){ca=da=null,ua=!1}function ka(){var e=pa;return null!==e&&(null===Ad?Ad=e:Ad.push.apply(Ad,e),pa=null),e}function ya(e){null===pa?pa=[e]:pa.push(e)}var ja=I(null),wa=null,Sa=null;function $a(e,t,n){M(ja,t._currentValue),t._currentValue=n}function Na(e){e._currentValue=ja.current,B(ja)}function _a(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Ea(e,t,n,r){var a=e.child;for(null!==a&&(a.return=e);null!==a;){var i=a.dependencies;if(null!==i){var s=a.child;i=i.firstContext;e:for(;null!==i;){var l=i;i=a;for(var d=0;d<t.length;d++)if(l.context===t[d]){i.lanes|=n,null!==(l=i.alternate)&&(l.lanes|=n),_a(i.return,n,e),r||(s=null);break e}i=l.next}}else if(18===a.tag){if(null===(s=a.return))throw Error(o(341));s.lanes|=n,null!==(i=s.alternate)&&(i.lanes|=n),_a(s,n,e),s=null}else s=a.child;if(null!==s)s.return=a;else for(s=a;null!==s;){if(s===e){s=null;break}if(null!==(a=s.sibling)){a.return=s.return,s=a;break}s=s.return}a=s}}function za(e,t,n,r){e=null;for(var a=t,i=!1;null!==a;){if(!i)if(0!==(524288&a.flags))i=!0;else if(0!==(262144&a.flags))break;if(10===a.tag){var s=a.alternate;if(null===s)throw Error(o(387));if(null!==(s=s.memoizedProps)){var l=a.type;Xn(a.pendingProps.value,s.value)||(null!==e?e.push(l):e=[l])}}else if(a===q.current){if(null===(s=a.alternate))throw Error(o(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(null!==e?e.push(up):e=[up])}a=a.return}null!==e&&Ea(t,e,n,r),t.flags|=262144}function Ca(e){for(e=e.firstContext;null!==e;){if(!Xn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Aa(e){wa=e,Sa=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Da(e){return Oa(wa,e)}function Fa(e,t){return null===wa&&Aa(e),Oa(e,t)}function Oa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},null===Sa){if(null===e)throw Error(o(308));Sa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Sa=Sa.next=t;return n}var Ta="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Pa=r.unstable_scheduleCallback,La=r.unstable_NormalPriority,Ra={$$typeof:y,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ia(){return{controller:new Ta,data:new Map,refCount:0}}function Ba(e){e.refCount--,0===e.refCount&&Pa(La,function(){e.controller.abort()})}var Ma=null,Va=0,Ua=0,Ka=null;function Ha(){if(0===--Va&&null!==Ma){null!==Ka&&(Ka.status="fulfilled");var e=Ma;Ma=null,Ua=0,Ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Wa=O.S;O.S=function(e,t){Od=le(),"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Ma){var n=Ma=[];Va=0,Ua=Uc(),Ka={status:"pending",value:void 0,then:function(e){n.push(e)}}}Va++,t.then(Ha,Ha)}(0,t),null!==Wa&&Wa(e,t)};var qa=I(null);function Ga(){var e=qa.current;return null!==e?e:hd.pooledCache}function Ya(e,t){M(qa,null===t?qa.current:t.pool)}function Ja(){var e=Ga();return null===e?null:{parent:Ra._currentValue,pool:e}}var Qa=Error(o(460)),Xa=Error(o(474)),Za=Error(o(542)),ei={then:function(){}};function ti(e){return"fulfilled"===(e=e.status)||"rejected"===e}function ni(e,t,n){switch(void 0===(n=e[n])?e.push(t):n!==t&&(t.then(Dt,Dt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e;default:if("string"===typeof t.status)t.then(Dt,Dt);else{if(null!==(e=hd)&&100<e.shellSuspendCounter)throw Error(o(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var n=t;n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t;n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e}throw ai=t,Qa}}function ri(e){try{return(0,e._init)(e._payload)}catch(ql){if(null!==ql&&"object"===typeof ql&&"function"===typeof ql.then)throw ai=ql,Qa;throw ql}}var ai=null;function ii(){if(null===ai)throw Error(o(459));var e=ai;return ai=null,e}function oi(e){if(e===Qa||e===Za)throw Error(o(483))}var si=null,li=0;function di(e){var t=li;return li+=1,null===si&&(si=[]),ni(si,e,t)}function ci(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function ui(e,t){if(t.$$typeof===f)throw Error(o(525));throw e=Object.prototype.toString.call(t),Error(o(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function pi(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function a(e,t){return(e=Br(e,t)).index=0,e.sibling=null,e}function i(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=67108866,n):r:(t.flags|=67108866,n):(t.flags|=1048576,n)}function s(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Kr(n,e.mode,r)).return=e,t):((t=a(t,n)).return=e,t)}function d(e,t,n,r){var i=n.type;return i===x?u(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===i||"object"===typeof i&&null!==i&&i.$$typeof===N&&ri(i)===t.type)?(ci(t=a(t,n.props),n),t.return=e,t):(ci(t=Vr(n.type,n.key,n.props,null,e.mode,r),n),t.return=e,t)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Wr(n,e.mode,r)).return=e,t):((t=a(t,n.children||[])).return=e,t)}function u(e,t,n,r,i){return null===t||7!==t.tag?((t=Ur(n,e.mode,r,i)).return=e,t):((t=a(t,n)).return=e,t)}function p(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=Kr(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case h:return ci(n=Vr(t.type,t.key,t.props,null,e.mode,n),t),n.return=e,n;case g:return(t=Wr(t,e.mode,n)).return=e,t;case N:return p(e,t=ri(t),n)}if(F(t)||C(t))return(t=Ur(t,e.mode,n,null)).return=e,t;if("function"===typeof t.then)return p(e,di(t),n);if(t.$$typeof===y)return p(e,Fa(e,t),n);ui(e,t)}return null}function m(e,t,n,r){var a=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return null!==a?null:l(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case h:return n.key===a?d(e,t,n,r):null;case g:return n.key===a?c(e,t,n,r):null;case N:return m(e,t,n=ri(n),r)}if(F(n)||C(n))return null!==a?null:u(e,t,n,r,null);if("function"===typeof n.then)return m(e,t,di(n),r);if(n.$$typeof===y)return m(e,t,Fa(e,n),r);ui(e,n)}return null}function f(e,t,n,r,a){if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return l(t,e=e.get(n)||null,""+r,a);if("object"===typeof r&&null!==r){switch(r.$$typeof){case h:return d(t,e=e.get(null===r.key?n:r.key)||null,r,a);case g:return c(t,e=e.get(null===r.key?n:r.key)||null,r,a);case N:return f(e,t,n,r=ri(r),a)}if(F(r)||C(r))return u(t,e=e.get(n)||null,r,a,null);if("function"===typeof r.then)return f(e,t,n,di(r),a);if(r.$$typeof===y)return f(e,t,n,Fa(t,r),a);ui(t,r)}return null}function v(l,d,c,u){if("object"===typeof c&&null!==c&&c.type===x&&null===c.key&&(c=c.props.children),"object"===typeof c&&null!==c){switch(c.$$typeof){case h:e:{for(var b=c.key;null!==d;){if(d.key===b){if((b=c.type)===x){if(7===d.tag){n(l,d.sibling),(u=a(d,c.props.children)).return=l,l=u;break e}}else if(d.elementType===b||"object"===typeof b&&null!==b&&b.$$typeof===N&&ri(b)===d.type){n(l,d.sibling),ci(u=a(d,c.props),c),u.return=l,l=u;break e}n(l,d);break}t(l,d),d=d.sibling}c.type===x?((u=Ur(c.props.children,l.mode,u,c.key)).return=l,l=u):(ci(u=Vr(c.type,c.key,c.props,null,l.mode,u),c),u.return=l,l=u)}return s(l);case g:e:{for(b=c.key;null!==d;){if(d.key===b){if(4===d.tag&&d.stateNode.containerInfo===c.containerInfo&&d.stateNode.implementation===c.implementation){n(l,d.sibling),(u=a(d,c.children||[])).return=l,l=u;break e}n(l,d);break}t(l,d),d=d.sibling}(u=Wr(c,l.mode,u)).return=l,l=u}return s(l);case N:return v(l,d,c=ri(c),u)}if(F(c))return function(a,o,s,l){for(var d=null,c=null,u=o,h=o=0,g=null;null!==u&&h<s.length;h++){u.index>h?(g=u,u=null):g=u.sibling;var x=m(a,u,s[h],l);if(null===x){null===u&&(u=g);break}e&&u&&null===x.alternate&&t(a,u),o=i(x,o,h),null===c?d=x:c.sibling=x,c=x,u=g}if(h===s.length)return n(a,u),ua&&aa(a,h),d;if(null===u){for(;h<s.length;h++)null!==(u=p(a,s[h],l))&&(o=i(u,o,h),null===c?d=u:c.sibling=u,c=u);return ua&&aa(a,h),d}for(u=r(u);h<s.length;h++)null!==(g=f(u,a,h,s[h],l))&&(e&&null!==g.alternate&&u.delete(null===g.key?h:g.key),o=i(g,o,h),null===c?d=g:c.sibling=g,c=g);return e&&u.forEach(function(e){return t(a,e)}),ua&&aa(a,h),d}(l,d,c,u);if(C(c)){if("function"!==typeof(b=C(c)))throw Error(o(150));return function(a,s,l,d){if(null==l)throw Error(o(151));for(var c=null,u=null,h=s,g=s=0,x=null,v=l.next();null!==h&&!v.done;g++,v=l.next()){h.index>g?(x=h,h=null):x=h.sibling;var b=m(a,h,v.value,d);if(null===b){null===h&&(h=x);break}e&&h&&null===b.alternate&&t(a,h),s=i(b,s,g),null===u?c=b:u.sibling=b,u=b,h=x}if(v.done)return n(a,h),ua&&aa(a,g),c;if(null===h){for(;!v.done;g++,v=l.next())null!==(v=p(a,v.value,d))&&(s=i(v,s,g),null===u?c=v:u.sibling=v,u=v);return ua&&aa(a,g),c}for(h=r(h);!v.done;g++,v=l.next())null!==(v=f(h,a,g,v.value,d))&&(e&&null!==v.alternate&&h.delete(null===v.key?g:v.key),s=i(v,s,g),null===u?c=v:u.sibling=v,u=v);return e&&h.forEach(function(e){return t(a,e)}),ua&&aa(a,g),c}(l,d,c=b.call(c),u)}if("function"===typeof c.then)return v(l,d,di(c),u);if(c.$$typeof===y)return v(l,d,Fa(l,c),u);ui(l,c)}return"string"===typeof c&&""!==c||"number"===typeof c||"bigint"===typeof c?(c=""+c,null!==d&&6===d.tag?(n(l,d.sibling),(u=a(d,c)).return=l,l=u):(n(l,d),(u=Kr(c,l.mode,u)).return=l,l=u),s(l)):n(l,d)}return function(e,t,n,r){try{li=0;var a=v(e,t,n,r);return si=null,a}catch(ql){if(ql===Qa||ql===Za)throw ql;var i=Rr(29,ql,null,e.mode);return i.lanes=r,i.return=e,i}}}var mi=pi(!0),fi=pi(!1),hi=!1;function gi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xi(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function vi(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function bi(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&fd)){var a=r.pending;return null===a?t.next=t:(t.next=a.next,a.next=t),r.pending=t,t=Tr(e),Or(e,null,n),t}return Ar(e,r,t,n),Tr(e)}function ki(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Oe(e,n)}}function yi(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var a=null,i=null;if(null!==(n=n.firstBaseUpdate)){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};null===i?a=i=o:i=i.next=o,n=n.next}while(null!==n);null===i?a=i=t:i=i.next=t}else a=i=t;return n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:r.shared,callbacks:r.callbacks},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var ji=!1;function wi(){if(ji){if(null!==Ka)throw Ka}}function Si(e,t,n,r){ji=!1;var a=e.updateQueue;hi=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,s=a.shared.pending;if(null!==s){a.shared.pending=null;var l=s,d=l.next;l.next=null,null===o?i=d:o.next=d,o=l;var c=e.alternate;null!==c&&((s=(c=c.updateQueue).lastBaseUpdate)!==o&&(null===s?c.firstBaseUpdate=d:s.next=d,c.lastBaseUpdate=l))}if(null!==i){var u=a.baseState;for(o=0,c=d=l=null,s=i;;){var p=-536870913&s.lane,f=p!==s.lane;if(f?(xd&p)===p:(r&p)===p){0!==p&&p===Ua&&(ji=!0),null!==c&&(c=c.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var h=e,g=s;p=t;var x=n;switch(g.tag){case 1:if("function"===typeof(h=g.payload)){u=h.call(x,u,p);break e}u=h;break e;case 3:h.flags=-65537&h.flags|128;case 0:if(null===(p="function"===typeof(h=g.payload)?h.call(x,u,p):h)||void 0===p)break e;u=m({},u,p);break e;case 2:hi=!0}}null!==(p=s.callback)&&(e.flags|=64,f&&(e.flags|=8192),null===(f=a.callbacks)?a.callbacks=[p]:f.push(p))}else f={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===c?(d=c=f,l=u):c=c.next=f,o|=p;if(null===(s=s.next)){if(null===(s=a.shared.pending))break;s=(f=s).next,f.next=null,a.lastBaseUpdate=f,a.shared.pending=null}}null===c&&(l=u),a.baseState=l,a.firstBaseUpdate=d,a.lastBaseUpdate=c,null===i&&(a.shared.lanes=0),$d|=o,e.lanes=o,e.memoizedState=u}}function $i(e,t){if("function"!==typeof e)throw Error(o(191,e));e.call(t)}function Ni(e,t){var n=e.callbacks;if(null!==n)for(e.callbacks=null,e=0;e<n.length;e++)$i(n[e],t)}var _i=I(null),Ei=I(0);function zi(e,t){M(Ei,e=wd),M(_i,t),wd=e|t.baseLanes}function Ci(){M(Ei,wd),M(_i,_i.current)}function Ai(){wd=Ei.current,B(_i),B(Ei)}var Di=I(null),Fi=null;function Oi(e){var t=e.alternate;M(Ii,1&Ii.current),M(Di,e),null===Fi&&(null===t||null!==_i.current||null!==t.memoizedState)&&(Fi=e)}function Ti(e){M(Ii,Ii.current),M(Di,e),null===Fi&&(Fi=e)}function Pi(e){22===e.tag?(M(Ii,Ii.current),M(Di,e),null===Fi&&(Fi=e)):Li()}function Li(){M(Ii,Ii.current),M(Di,Di.current)}function Ri(e){B(Di),Fi===e&&(Fi=null),B(Ii)}var Ii=I(0);function Bi(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||Du(n)||Fu(n)))return t}else if(19!==t.tag||"forwards"!==t.memoizedProps.revealOrder&&"backwards"!==t.memoizedProps.revealOrder&&"unstable_legacy-backwards"!==t.memoizedProps.revealOrder&&"together"!==t.memoizedProps.revealOrder){if(null!==t.child){t.child.return=t,t=t.child;continue}}else if(0!==(128&t.flags))return t;if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Mi=0,Vi=null,Ui=null,Ki=null,Hi=!1,Wi=!1,qi=!1,Gi=0,Yi=0,Ji=null,Qi=0;function Xi(){throw Error(o(321))}function Zi(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Xn(e[n],t[n]))return!1;return!0}function eo(e,t,n,r,a,i){return Mi=i,Vi=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=null===e||null===e.memoizedState?gs:xs,qi=!1,i=n(r,a),qi=!1,Wi&&(i=no(t,n,r,a)),to(e),i}function to(e){O.H=hs;var t=null!==Ui&&null!==Ui.next;if(Mi=0,Ki=Ui=Vi=null,Hi=!1,Yi=0,Ji=null,t)throw Error(o(300));null===e||Fs||null!==(e=e.dependencies)&&Ca(e)&&(Fs=!0)}function no(e,t,n,r){Vi=e;var a=0;do{if(Wi&&(Ji=null),Yi=0,Wi=!1,25<=a)throw Error(o(301));if(a+=1,Ki=Ui=null,null!=e.updateQueue){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,null!=i.memoCache&&(i.memoCache.index=0)}O.H=vs,i=t(n,r)}while(Wi);return i}function ro(){var e=O.H,t=e.useState()[0];return t="function"===typeof t.then?co(t):t,e=e.useState()[0],(null!==Ui?Ui.memoizedState:null)!==e&&(Vi.flags|=1024),t}function ao(){var e=0!==Gi;return Gi=0,e}function io(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function oo(e){if(Hi){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Hi=!1}Mi=0,Ki=Ui=Vi=null,Wi=!1,Yi=Gi=0,Ji=null}function so(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Ki?Vi.memoizedState=Ki=e:Ki=Ki.next=e,Ki}function lo(){if(null===Ui){var e=Vi.alternate;e=null!==e?e.memoizedState:null}else e=Ui.next;var t=null===Ki?Vi.memoizedState:Ki.next;if(null!==t)Ki=t,Ui=e;else{if(null===e){if(null===Vi.alternate)throw Error(o(467));throw Error(o(310))}e={memoizedState:(Ui=e).memoizedState,baseState:Ui.baseState,baseQueue:Ui.baseQueue,queue:Ui.queue,next:null},null===Ki?Vi.memoizedState=Ki=e:Ki=Ki.next=e}return Ki}function co(e){var t=Yi;return Yi+=1,null===Ji&&(Ji=[]),e=ni(Ji,e,t),t=Vi,null===(null===Ki?t.memoizedState:Ki.next)&&(t=t.alternate,O.H=null===t||null===t.memoizedState?gs:xs),e}function uo(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return co(e);if(e.$$typeof===y)return Da(e)}throw Error(o(438,String(e)))}function po(e){var t=null,n=Vi.updateQueue;if(null!==n&&(t=n.memoCache),null==t){var r=Vi.alternate;null!==r&&(null!==(r=r.updateQueue)&&(null!=(r=r.memoCache)&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===n&&(n={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=n),n.memoCache=t,void 0===(n=t.data[t.index]))for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=E;return t.index++,n}function mo(e,t){return"function"===typeof t?t(e):t}function fo(e){return ho(lo(),Ui,e)}function ho(e,t,n){var r=e.queue;if(null===r)throw Error(o(311));r.lastRenderedReducer=n;var a=e.baseQueue,i=r.pending;if(null!==i){if(null!==a){var s=a.next;a.next=i.next,i.next=s}t.baseQueue=a=i,r.pending=null}if(i=e.baseState,null===a)e.memoizedState=i;else{var l=s=null,d=null,c=t=a.next,u=!1;do{var p=-536870913&c.lane;if(p!==c.lane?(xd&p)===p:(Mi&p)===p){var m=c.revertLane;if(0===m)null!==d&&(d=d.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===Ua&&(u=!0);else{if((Mi&m)===m){c=c.next,m===Ua&&(u=!0);continue}p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===d?(l=d=p,s=i):d=d.next=p,Vi.lanes|=m,$d|=m}p=c.action,qi&&n(i,p),i=c.hasEagerState?c.eagerState:n(i,p)}else m={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===d?(l=d=m,s=i):d=d.next=m,Vi.lanes|=p,$d|=p;c=c.next}while(null!==c&&c!==t);if(null===d?s=i:d.next=l,!Xn(i,e.memoizedState)&&(Fs=!0,u&&null!==(n=Ka)))throw n;e.memoizedState=i,e.baseState=s,e.baseQueue=d,r.lastRenderedState=i}return null===a&&(r.lanes=0),[e.memoizedState,r.dispatch]}function go(e){var t=lo(),n=t.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,i=t.memoizedState;if(null!==a){n.pending=null;var s=a=a.next;do{i=e(i,s.action),s=s.next}while(s!==a);Xn(i,t.memoizedState)||(Fs=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function xo(e,t,n){var r=Vi,a=lo(),i=ua;if(i){if(void 0===n)throw Error(o(407));n=n()}else n=t();var s=!Xn((Ui||a).memoizedState,n);if(s&&(a.memoizedState=n,Fs=!0),a=a.queue,Vo(ko.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||null!==Ki&&1&Ki.memoizedState.tag){if(r.flags|=2048,Lo(9,{destroy:void 0},bo.bind(null,r,a,n,t),null),null===hd)throw Error(o(349));i||0!==(127&Mi)||vo(r,t,n)}return n}function vo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=Vi.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function bo(e,t,n,r){t.value=n,t.getSnapshot=r,yo(t)&&jo(e)}function ko(e,t,n){return n(function(){yo(t)&&jo(e)})}function yo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Xn(e,n)}catch(r){return!0}}function jo(e){var t=Fr(e,2);null!==t&&Yd(t,e,2)}function wo(e){var t=so();if("function"===typeof e){var n=e;if(e=n(),qi){be(!0);try{n()}finally{be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mo,lastRenderedState:e},t}function So(e,t,n,r){return e.baseState=n,ho(e,Ui,"function"===typeof r?r:mo)}function $o(e,t,n,r,a){if(ps(e))throw Error(o(485));if(null!==(e=t.action)){var i={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){i.listeners.push(e)}};null!==O.T?n(!0):i.isTransition=!1,r(i),null===(n=t.pending)?(i.next=t.pending=i,No(t,i)):(i.next=n.next,t.pending=n.next=i)}}function No(e,t){var n=t.action,r=t.payload,a=e.state;if(t.isTransition){var i=O.T,o={};O.T=o;try{var s=n(a,r),l=O.S;null!==l&&l(o,s),_o(e,t,s)}catch(d){zo(e,t,d)}finally{null!==i&&null!==o.types&&(i.types=o.types),O.T=i}}else try{_o(e,t,i=n(a,r))}catch(c){zo(e,t,c)}}function _o(e,t,n){null!==n&&"object"===typeof n&&"function"===typeof n.then?n.then(function(n){Eo(e,t,n)},function(n){return zo(e,t,n)}):Eo(e,t,n)}function Eo(e,t,n){t.status="fulfilled",t.value=n,Co(t),e.state=n,null!==(t=e.pending)&&((n=t.next)===t?e.pending=null:(n=n.next,t.next=n,No(e,n)))}function zo(e,t,n){var r=e.pending;if(e.pending=null,null!==r){r=r.next;do{t.status="rejected",t.reason=n,Co(t),t=t.next}while(t!==r)}e.action=null}function Co(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ao(e,t){return t}function Do(e,t){if(ua){var n=hd.formState;if(null!==n){e:{var r=Vi;if(ua){if(ca){t:{for(var a=ca,i=ma;8!==a.nodeType;){if(!i){a=null;break t}if(null===(a=Ou(a.nextSibling))){a=null;break t}}a="F!"===(i=a.data)||"F"===i?a:null}if(a){ca=Ou(a.nextSibling),r="F!"===a.data;break e}}ha(r)}r=!1}r&&(t=n[0])}}return(n=so()).memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:t},n.queue=r,n=ds.bind(null,Vi,r),r.dispatch=n,r=wo(!1),i=us.bind(null,Vi,!1,r.queue),a={state:t,dispatch:null,action:e,pending:null},(r=so()).queue=a,n=$o.bind(null,Vi,a,i,n),a.dispatch=n,r.memoizedState=e,[t,n,!1]}function Fo(e){return Oo(lo(),Ui,e)}function Oo(e,t,n){if(t=ho(e,t,Ao)[0],e=fo(mo)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var r=co(t)}catch(ql){if(ql===Qa)throw Za;throw ql}else r=t;var a=(t=lo()).queue,i=a.dispatch;return n!==t.memoizedState&&(Vi.flags|=2048,Lo(9,{destroy:void 0},To.bind(null,a,n),null)),[r,i,e]}function To(e,t){e.action=t}function Po(e){var t=lo(),n=Ui;if(null!==n)return Oo(t,n,e);lo(),t=t.memoizedState;var r=(n=lo()).queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Lo(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},null===(t=Vi.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t),null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ro(){return lo().memoizedState}function Io(e,t,n,r){var a=so();Vi.flags|=e,a.memoizedState=Lo(1|t,{destroy:void 0},n,void 0===r?null:r)}function Bo(e,t,n,r){var a=lo();r=void 0===r?null:r;var i=a.memoizedState.inst;null!==Ui&&null!==r&&Zi(r,Ui.memoizedState.deps)?a.memoizedState=Lo(t,i,n,r):(Vi.flags|=e,a.memoizedState=Lo(1|t,i,n,r))}function Mo(e,t){Io(8390656,8,e,t)}function Vo(e,t){Bo(2048,8,e,t)}function Uo(e){var t=lo().memoizedState;return function(e){Vi.flags|=4;var t=Vi.updateQueue;if(null===t)t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.events=[e];else{var n=t.events;null===n?t.events=[e]:n.push(e)}}({ref:t,nextImpl:e}),function(){if(0!==(2&fd))throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Ko(e,t){return Bo(4,2,e,t)}function Ho(e,t){return Bo(4,4,e,t)}function Wo(e,t){if("function"===typeof t){e=e();var n=t(e);return function(){"function"===typeof n?n():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function qo(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,Bo(4,4,Wo.bind(null,t,e),n)}function Go(){}function Yo(e,t){var n=lo();t=void 0===t?null:t;var r=n.memoizedState;return null!==t&&Zi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Jo(e,t){var n=lo();t=void 0===t?null:t;var r=n.memoizedState;if(null!==t&&Zi(t,r[1]))return r[0];if(r=e(),qi){be(!0);try{e()}finally{be(!1)}}return n.memoizedState=[r,t],r}function Qo(e,t,n){return void 0===n||0!==(1073741824&Mi)&&0===(261930&xd)?e.memoizedState=t:(e.memoizedState=n,e=Gd(),Vi.lanes|=e,$d|=e,n)}function Xo(e,t,n,r){return Xn(n,t)?n:null!==_i.current?(e=Qo(e,n,r),Xn(e,t)||(Fs=!0),e):0===(42&Mi)||0!==(1073741824&Mi)&&0===(261930&xd)?(Fs=!0,e.memoizedState=n):(e=Gd(),Vi.lanes|=e,$d|=e,t)}function Zo(e,t,n,r,a){var i=T.p;T.p=0!==i&&8>i?i:8;var o=O.T,s={};O.T=s,us(e,!1,t,n);try{var l=a(),d=O.S;if(null!==d&&d(s,l),null!==l&&"object"===typeof l&&"function"===typeof l.then){var c=function(e,t){var n=[],r={status:"pending",value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status="rejected",r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}(l,r);cs(e,t,c,qd())}else cs(e,t,r,qd())}catch(u){cs(e,t,{then:function(){},status:"rejected",reason:u},qd())}finally{T.p=i,null!==o&&null!==s.types&&(o.types=s.types),O.T=o}}function es(){}function ts(e,t,n,r){if(5!==e.tag)throw Error(o(476));var a=ns(e).queue;Zo(e,a,t,P,null===n?es:function(){return rs(e),n(r)})}function ns(e){var t=e.memoizedState;if(null!==t)return t;var n={};return(t={memoizedState:P,baseState:P,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mo,lastRenderedState:P},next:null}).next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mo,lastRenderedState:n},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function rs(e){var t=ns(e);null===t.next&&(t=e.alternate.memoizedState),cs(e,t.next.queue,{},qd())}function as(){return Da(up)}function is(){return lo().memoizedState}function os(){return lo().memoizedState}function ss(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var n=qd(),r=bi(t,e=vi(n),n);return null!==r&&(Yd(r,t,n),ki(r,t,n)),t={cache:Ia()},void(e.payload=t)}t=t.return}}function ls(e,t,n){var r=qd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ps(e)?ms(t,n):null!==(n=Dr(e,t,n,r))&&(Yd(n,e,r),fs(n,t,r))}function ds(e,t,n){cs(e,t,n,qd())}function cs(e,t,n,r){var a={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(ps(e))ms(t,a);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)&&null!==(i=t.lastRenderedReducer))try{var o=t.lastRenderedState,s=i(o,n);if(a.hasEagerState=!0,a.eagerState=s,Xn(s,o))return Ar(e,t,a,0),null===hd&&Cr(),!1}catch(l){}if(null!==(n=Dr(e,t,a,r)))return Yd(n,e,r),fs(n,t,r),!0}return!1}function us(e,t,n,r){if(r={lane:2,revertLane:Uc(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},ps(e)){if(t)throw Error(o(479))}else null!==(t=Dr(e,n,r,2))&&Yd(t,e,2)}function ps(e){var t=e.alternate;return e===Vi||null!==t&&t===Vi}function ms(e,t){Wi=Hi=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fs(e,t,n){if(0!==(4194048&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Oe(e,n)}}var hs={readContext:Da,use:uo,useCallback:Xi,useContext:Xi,useEffect:Xi,useImperativeHandle:Xi,useLayoutEffect:Xi,useInsertionEffect:Xi,useMemo:Xi,useReducer:Xi,useRef:Xi,useState:Xi,useDebugValue:Xi,useDeferredValue:Xi,useTransition:Xi,useSyncExternalStore:Xi,useId:Xi,useHostTransitionStatus:Xi,useFormState:Xi,useActionState:Xi,useOptimistic:Xi,useMemoCache:Xi,useCacheRefresh:Xi};hs.useEffectEvent=Xi;var gs={readContext:Da,use:uo,useCallback:function(e,t){return so().memoizedState=[e,void 0===t?null:t],e},useContext:Da,useEffect:Mo,useImperativeHandle:function(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,Io(4194308,4,Wo.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Io(4194308,4,e,t)},useInsertionEffect:function(e,t){Io(4,2,e,t)},useMemo:function(e,t){var n=so();t=void 0===t?null:t;var r=e();if(qi){be(!0);try{e()}finally{be(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=so();if(void 0!==n){var a=n(t);if(qi){be(!0);try{n(t)}finally{be(!1)}}}else a=t;return r.memoizedState=r.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},r.queue=e,e=e.dispatch=ls.bind(null,Vi,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},so().memoizedState=e},useState:function(e){var t=(e=wo(e)).queue,n=ds.bind(null,Vi,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Go,useDeferredValue:function(e,t){return Qo(so(),e,t)},useTransition:function(){var e=wo(!1);return e=Zo.bind(null,Vi,e.queue,!0,!1),so().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=Vi,a=so();if(ua){if(void 0===n)throw Error(o(407));n=n()}else{if(n=t(),null===hd)throw Error(o(349));0!==(127&xd)||vo(r,t,n)}a.memoizedState=n;var i={value:n,getSnapshot:t};return a.queue=i,Mo(ko.bind(null,r,i,e),[e]),r.flags|=2048,Lo(9,{destroy:void 0},bo.bind(null,r,i,n,t),null),n},useId:function(){var e=so(),t=hd.identifierPrefix;if(ua){var n=ra;t="_"+t+"R_"+(n=(na&~(1<<32-ke(na)-1)).toString(32)+n),0<(n=Gi++)&&(t+="H"+n.toString(32)),t+="_"}else t="_"+t+"r_"+(n=Qi++).toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:as,useFormState:Do,useActionState:Do,useOptimistic:function(e){var t=so();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=us.bind(null,Vi,!0,n),n.dispatch=t,[e,t]},useMemoCache:po,useCacheRefresh:function(){return so().memoizedState=ss.bind(null,Vi)},useEffectEvent:function(e){var t=so(),n={impl:e};return t.memoizedState=n,function(){if(0!==(2&fd))throw Error(o(440));return n.impl.apply(void 0,arguments)}}},xs={readContext:Da,use:uo,useCallback:Yo,useContext:Da,useEffect:Vo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Jo,useReducer:fo,useRef:Ro,useState:function(){return fo(mo)},useDebugValue:Go,useDeferredValue:function(e,t){return Xo(lo(),Ui.memoizedState,e,t)},useTransition:function(){var e=fo(mo)[0],t=lo().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:is,useHostTransitionStatus:as,useFormState:Fo,useActionState:Fo,useOptimistic:function(e,t){return So(lo(),0,e,t)},useMemoCache:po,useCacheRefresh:os};xs.useEffectEvent=Uo;var vs={readContext:Da,use:uo,useCallback:Yo,useContext:Da,useEffect:Vo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Jo,useReducer:go,useRef:Ro,useState:function(){return go(mo)},useDebugValue:Go,useDeferredValue:function(e,t){var n=lo();return null===Ui?Qo(n,e,t):Xo(n,Ui.memoizedState,e,t)},useTransition:function(){var e=go(mo)[0],t=lo().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:is,useHostTransitionStatus:as,useFormState:Po,useActionState:Po,useOptimistic:function(e,t){var n=lo();return null!==Ui?So(n,0,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:po,useCacheRefresh:os};function bs(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:m({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}vs.useEffectEvent=Uo;var ks={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=qd(),a=vi(r);a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=bi(e,a,r))&&(Yd(t,e,r),ki(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=qd(),a=vi(r);a.tag=1,a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=bi(e,a,r))&&(Yd(t,e,r),ki(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=qd(),r=vi(n);r.tag=2,void 0!==t&&null!==t&&(r.callback=t),null!==(t=bi(e,r,n))&&(Yd(t,e,n),ki(t,e,n))}};function ys(e,t,n,r,a,i,o){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,i,o):!t.prototype||!t.prototype.isPureReactComponent||(!Zn(n,r)||!Zn(a,i))}function js(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ks.enqueueReplaceState(t,t.state,null)}function ws(e,t){var n=t;if("ref"in t)for(var r in n={},t)"ref"!==r&&(n[r]=t[r]);if(e=e.defaultProps)for(var a in n===t&&(n=m({},n)),e)void 0===n[a]&&(n[a]=e[a]);return n}function Ss(e){Nr(e)}function $s(e){console.error(e)}function Ns(e){Nr(e)}function _s(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function Es(e,t,n){try{(0,e.onCaughtError)(n.value,{componentStack:n.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function zs(e,t,n){return(n=vi(n)).tag=3,n.payload={element:null},n.callback=function(){_s(e,t)},n}function Cs(e){return(e=vi(e)).tag=3,e}function As(e,t,n,r){var a=n.type.getDerivedStateFromError;if("function"===typeof a){var i=r.value;e.payload=function(){return a(i)},e.callback=function(){Es(t,n,r)}}var o=n.stateNode;null!==o&&"function"===typeof o.componentDidCatch&&(e.callback=function(){Es(t,n,r),"function"!==typeof a&&(null===Ld?Ld=new Set([this]):Ld.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}var Ds=Error(o(461)),Fs=!1;function Os(e,t,n,r){t.child=null===e?fi(t,null,n,r):mi(t,e.child,n,r)}function Ts(e,t,n,r,a){n=n.render;var i=t.ref;if("ref"in r){var o={};for(var s in r)"ref"!==s&&(o[s]=r[s])}else o=r;return Aa(t),r=eo(e,t,n,o,i,a),s=ao(),null===e||Fs?(ua&&s&&oa(t),t.flags|=1,Os(e,t,r,a),t.child):(io(e,t,a),al(e,t,a))}function Ps(e,t,n,r,a){if(null===e){var i=n.type;return"function"!==typeof i||Ir(i)||void 0!==i.defaultProps||null!==n.compare?((e=Vr(n.type,null,r,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=i,Ls(e,t,i,r,a))}if(i=e.child,!il(e,a)){var o=i.memoizedProps;if((n=null!==(n=n.compare)?n:Zn)(o,r)&&e.ref===t.ref)return al(e,t,a)}return t.flags|=1,(e=Br(i,r)).ref=t.ref,e.return=t,t.child=e}function Ls(e,t,n,r,a){if(null!==e){var i=e.memoizedProps;if(Zn(i,r)&&e.ref===t.ref){if(Fs=!1,t.pendingProps=r=i,!il(e,a))return t.lanes=e.lanes,al(e,t,a);0!==(131072&e.flags)&&(Fs=!0)}}return Ks(e,t,n,r,a)}function Rs(e,t,n,r){var a=r.children,i=null!==e?e.memoizedState:null;if(null===e&&null===t.stateNode&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),"hidden"===r.mode){if(0!==(128&t.flags)){if(i=null!==i?i.baseLanes|n:n,null!==e){for(r=t.child=e.child,a=0;null!==r;)a=a|r.lanes|r.childLanes,r=r.sibling;r=a&~i}else r=0,t.child=null;return Bs(e,t,i,n,r)}if(0===(536870912&n))return r=t.lanes=536870912,Bs(e,t,null!==i?i.baseLanes|n:n,n,r);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Ya(0,null!==i?i.cachePool:null),null!==i?zi(t,i):Ci(),Pi(t)}else null!==i?(Ya(0,i.cachePool),zi(t,i),Li(),t.memoizedState=null):(null!==e&&Ya(0,null),Ci(),Li());return Os(e,t,a,n),t.child}function Is(e,t){return null!==e&&22===e.tag||null!==t.stateNode||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Bs(e,t,n,r,a){var i=Ga();return i=null===i?null:{parent:Ra._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},null!==e&&Ya(0,null),Ci(),Pi(t),null!==e&&za(e,t,r,!0),t.childLanes=a,null}function Ms(e,t){return(t=Zs({mode:t.mode,children:t.children},e.mode)).ref=e.ref,e.child=t,t.return=e,t}function Vs(e,t,n){return mi(t,e.child,null,n),(e=Ms(t,t.pendingProps)).flags|=2,Ri(t),t.memoizedState=null,e}function Us(e,t){var n=t.ref;if(null===n)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof n&&"object"!==typeof n)throw Error(o(284));null!==e&&e.ref===n||(t.flags|=4194816)}}function Ks(e,t,n,r,a){return Aa(t),n=eo(e,t,n,r,void 0,a),r=ao(),null===e||Fs?(ua&&r&&oa(t),t.flags|=1,Os(e,t,n,a),t.child):(io(e,t,a),al(e,t,a))}function Hs(e,t,n,r,a,i){return Aa(t),t.updateQueue=null,n=no(t,r,n,a),to(e),r=ao(),null===e||Fs?(ua&&r&&oa(t),t.flags|=1,Os(e,t,n,i),t.child):(io(e,t,i),al(e,t,i))}function Ws(e,t,n,r,a){if(Aa(t),null===t.stateNode){var i=Pr,o=n.contextType;"object"===typeof o&&null!==o&&(i=Da(o)),i=new n(r,i),t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,i.updater=ks,t.stateNode=i,i._reactInternals=t,(i=t.stateNode).props=r,i.state=t.memoizedState,i.refs={},gi(t),o=n.contextType,i.context="object"===typeof o&&null!==o?Da(o):Pr,i.state=t.memoizedState,"function"===typeof(o=n.getDerivedStateFromProps)&&(bs(t,n,o,r),i.state=t.memoizedState),"function"===typeof n.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(o=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),o!==i.state&&ks.enqueueReplaceState(i,i.state,null),Si(t,r,i,a),wi(),i.state=t.memoizedState),"function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!0}else if(null===e){i=t.stateNode;var s=t.memoizedProps,l=ws(n,s);i.props=l;var d=i.context,c=n.contextType;o=Pr,"object"===typeof c&&null!==c&&(o=Da(c));var u=n.getDerivedStateFromProps;c="function"===typeof u||"function"===typeof i.getSnapshotBeforeUpdate,s=t.pendingProps!==s,c||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(s||d!==o)&&js(t,i,r,o),hi=!1;var p=t.memoizedState;i.state=p,Si(t,r,i,a),wi(),d=t.memoizedState,s||p!==d||hi?("function"===typeof u&&(bs(t,n,u,r),d=t.memoizedState),(l=hi||ys(t,n,l,r,p,d,o))?(c||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||("function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"===typeof i.componentDidMount&&(t.flags|=4194308)):("function"===typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=d),i.props=r,i.state=d,i.context=o,r=l):("function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,xi(e,t),c=ws(n,o=t.memoizedProps),i.props=c,u=t.pendingProps,p=i.context,d=n.contextType,l=Pr,"object"===typeof d&&null!==d&&(l=Da(d)),(d="function"===typeof(s=n.getDerivedStateFromProps)||"function"===typeof i.getSnapshotBeforeUpdate)||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(o!==u||p!==l)&&js(t,i,r,l),hi=!1,p=t.memoizedState,i.state=p,Si(t,r,i,a),wi();var m=t.memoizedState;o!==u||p!==m||hi||null!==e&&null!==e.dependencies&&Ca(e.dependencies)?("function"===typeof s&&(bs(t,n,s,r),m=t.memoizedState),(c=hi||ys(t,n,c,r,p,m,l)||null!==e&&null!==e.dependencies&&Ca(e.dependencies))?(d||"function"!==typeof i.UNSAFE_componentWillUpdate&&"function"!==typeof i.componentWillUpdate||("function"===typeof i.componentWillUpdate&&i.componentWillUpdate(r,m,l),"function"===typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(r,m,l)),"function"===typeof i.componentDidUpdate&&(t.flags|=4),"function"===typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),i.props=r,i.state=m,i.context=l,r=c):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return i=r,Us(e,t),r=0!==(128&t.flags),i||r?(i=t.stateNode,n=r&&"function"!==typeof n.getDerivedStateFromError?null:i.render(),t.flags|=1,null!==e&&r?(t.child=mi(t,e.child,null,a),t.child=mi(t,null,n,a)):Os(e,t,n,a),t.memoizedState=i.state,e=t.child):e=al(e,t,a),e}function qs(e,t,n,r){return ba(),t.flags|=256,Os(e,t,n,r),t.child}var Gs={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ys(e){return{baseLanes:e,cachePool:Ja()}}function Js(e,t,n){return e=null!==e?e.childLanes&~n:0,t&&(e|=Ed),e}function Qs(e,t,n){var r,a=t.pendingProps,i=!1,s=0!==(128&t.flags);if((r=s)||(r=(null===e||null!==e.memoizedState)&&0!==(2&Ii.current)),r&&(i=!0,t.flags&=-129),r=0!==(32&t.flags),t.flags&=-33,null===e){if(ua){if(i?Oi(t):Li(),(e=ca)?null!==(e=null!==(e=Au(e,ma))&&"&"!==e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:na,overflow:ra}:null,retryLane:536870912,hydrationErrors:null},(n=Hr(e)).return=t,t.child=n,da=t,ca=null):e=null,null===e)throw ha(t);return Fu(e)?t.lanes=32:t.lanes=536870912,null}var l=a.children;return a=a.fallback,i?(Li(),l=Zs({mode:"hidden",children:l},i=t.mode),a=Ur(a,i,n,null),l.return=t,a.return=t,l.sibling=a,t.child=l,(a=t.child).memoizedState=Ys(n),a.childLanes=Js(e,r,n),t.memoizedState=Gs,Is(null,a)):(Oi(t),Xs(t,l))}var d=e.memoizedState;if(null!==d&&null!==(l=d.dehydrated)){if(s)256&t.flags?(Oi(t),t.flags&=-257,t=el(e,t,n)):null!==t.memoizedState?(Li(),t.child=e.child,t.flags|=128,t=null):(Li(),l=a.fallback,i=t.mode,a=Zs({mode:"visible",children:a.children},i),(l=Ur(l,i,n,null)).flags|=2,a.return=t,l.return=t,a.sibling=l,t.child=a,mi(t,e.child,null,n),(a=t.child).memoizedState=Ys(n),a.childLanes=Js(e,r,n),t.memoizedState=Gs,t=Is(null,a));else if(Oi(t),Fu(l)){if(r=l.nextSibling&&l.nextSibling.dataset)var c=r.dgst;r=c,(a=Error(o(419))).stack="",a.digest=r,ya({value:a,source:null,stack:null}),t=el(e,t,n)}else if(Fs||za(e,t,n,!1),r=0!==(n&e.childLanes),Fs||r){if(null!==(r=hd)&&(0!==(a=Te(r,n))&&a!==d.retryLane))throw d.retryLane=a,Fr(e,a),Yd(r,e,a),Ds;Du(l)||sc(),t=el(e,t,n)}else Du(l)?(t.flags|=192,t.child=e.child,t=null):(e=d.treeContext,ca=Ou(l.nextSibling),da=t,ua=!0,pa=null,ma=!1,null!==e&&la(t,e),(t=Xs(t,a.children)).flags|=4096);return t}return i?(Li(),l=a.fallback,i=t.mode,c=(d=e.child).sibling,(a=Br(d,{mode:"hidden",children:a.children})).subtreeFlags=65011712&d.subtreeFlags,null!==c?l=Br(c,l):(l=Ur(l,i,n,null)).flags|=2,l.return=t,a.return=t,a.sibling=l,t.child=a,Is(null,a),a=t.child,null===(l=e.child.memoizedState)?l=Ys(n):(null!==(i=l.cachePool)?(d=Ra._currentValue,i=i.parent!==d?{parent:d,pool:d}:i):i=Ja(),l={baseLanes:l.baseLanes|n,cachePool:i}),a.memoizedState=l,a.childLanes=Js(e,r,n),t.memoizedState=Gs,Is(e.child,a)):(Oi(t),e=(n=e.child).sibling,(n=Br(n,{mode:"visible",children:a.children})).return=t,n.sibling=null,null!==e&&(null===(r=t.deletions)?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Xs(e,t){return(t=Zs({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Zs(e,t){return(e=Rr(22,e,null,t)).lanes=0,e}function el(e,t,n){return mi(t,e.child,null,n),(e=Xs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function tl(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),_a(e.return,t,n)}function nl(e,t,n,r,a,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=a,o.treeForkCount=i)}function rl(e,t,n){var r=t.pendingProps,a=r.revealOrder,i=r.tail;r=r.children;var o=Ii.current,s=0!==(2&o);if(s?(o=1&o|2,t.flags|=128):o&=1,M(Ii,o),Os(e,t,r,n),r=ua?Xr:0,!s&&null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&tl(e,n,t);else if(19===e.tag)tl(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;null!==n;)null!==(e=n.alternate)&&null===Bi(e)&&(a=n),n=n.sibling;null===(n=a)?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),nl(t,!1,a,n,i,r);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Bi(e)){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}nl(t,!0,n,null,i,r);break;case"together":nl(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function al(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),$d|=t.lanes,0===(n&t.childLanes)){if(null===e)return null;if(za(e,t,n,!1),0===(n&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(o(153));if(null!==t.child){for(n=Br(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Br(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function il(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Ca(e))}function ol(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps)Fs=!0;else{if(!il(e,n)&&0===(128&t.flags))return Fs=!1,function(e,t,n){switch(t.tag){case 3:G(t,t.stateNode.containerInfo),$a(0,Ra,e.memoizedState.cache),ba();break;case 27:case 5:J(t);break;case 4:G(t,t.stateNode.containerInfo);break;case 10:$a(0,t.type,t.memoizedProps.value);break;case 31:if(null!==t.memoizedState)return t.flags|=128,Ti(t),null;break;case 13:var r=t.memoizedState;if(null!==r)return null!==r.dehydrated?(Oi(t),t.flags|=128,null):0!==(n&t.child.childLanes)?Qs(e,t,n):(Oi(t),null!==(e=al(e,t,n))?e.sibling:null);Oi(t);break;case 19:var a=0!==(128&e.flags);if((r=0!==(n&t.childLanes))||(za(e,t,n,!1),r=0!==(n&t.childLanes)),a){if(r)return rl(e,t,n);t.flags|=128}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),M(Ii,Ii.current),r)break;return null;case 22:return t.lanes=0,Rs(e,t,n,t.pendingProps);case 24:$a(0,Ra,e.memoizedState.cache)}return al(e,t,n)}(e,t,n);Fs=0!==(131072&e.flags)}else Fs=!1,ua&&0!==(1048576&t.flags)&&ia(t,Xr,t.index);switch(t.lanes=0,t.tag){case 16:e:{var r=t.pendingProps;if(e=ri(t.elementType),t.type=e,"function"!==typeof e){if(void 0!==e&&null!==e){var a=e.$$typeof;if(a===j){t.tag=11,t=Ts(null,t,e,r,n);break e}if(a===$){t.tag=14,t=Ps(null,t,e,r,n);break e}}throw t=D(e)||e,Error(o(306,t,""))}Ir(e)?(r=ws(e,r),t.tag=1,t=Ws(null,t,e,r,n)):(t.tag=0,t=Ks(null,t,e,r,n))}return t;case 0:return Ks(e,t,t.type,t.pendingProps,n);case 1:return Ws(e,t,r=t.type,a=ws(r,t.pendingProps),n);case 3:e:{if(G(t,t.stateNode.containerInfo),null===e)throw Error(o(387));r=t.pendingProps;var i=t.memoizedState;a=i.element,xi(e,t),Si(t,r,null,n);var s=t.memoizedState;if(r=s.cache,$a(0,Ra,r),r!==i.cache&&Ea(t,[Ra],n,!0),wi(),r=s.element,i.isDehydrated){if(i={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=qs(e,t,r,n);break e}if(r!==a){ya(a=Gr(Error(o(424)),t)),t=qs(e,t,r,n);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(ca=Ou(e.firstChild),da=t,ua=!0,pa=null,ma=!0,n=fi(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(ba(),r===a){t=al(e,t,n);break e}Os(e,t,r,n)}t=t.child}return t;case 26:return Us(e,t),null===e?(n=Wu(t.type,null,t.pendingProps,null))?t.memoizedState=n:ua||(n=t.type,e=t.pendingProps,(r=xu(W.current).createElement(n))[Me]=t,r[Ve]=e,mu(r,n,e),et(r),t.stateNode=r):t.memoizedState=Wu(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return J(t),null===e&&ua&&(r=t.stateNode=Ru(t.type,t.pendingProps,W.current),da=t,ma=!0,a=ca,_u(t.type)?(Tu=a,ca=Ou(r.firstChild)):ca=a),Os(e,t,t.pendingProps.children,n),Us(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&ua&&((a=r=ca)&&(null!==(r=function(e,t,n,r){for(;1===e.nodeType;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[Ge])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(i=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(i!==a.rel||e.getAttribute("href")!==(null==a.href||""===a.href?null:a.href)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin)||e.getAttribute("title")!==(null==a.title?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((i=e.getAttribute("src"))!==(null==a.src?null:a.src)||e.getAttribute("type")!==(null==a.type?null:a.type)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var i=null==a.name?null:""+a.name;if("hidden"===a.type&&e.getAttribute("name")===i)return e}if(null===(e=Ou(e.nextSibling)))break}return null}(r,t.type,t.pendingProps,ma))?(t.stateNode=r,da=t,ca=Ou(r.firstChild),ma=!1,a=!0):a=!1),a||ha(t)),J(t),a=t.type,i=t.pendingProps,s=null!==e?e.memoizedProps:null,r=i.children,ku(a,i)?r=null:null!==s&&ku(a,s)&&(t.flags|=32),null!==t.memoizedState&&(a=eo(e,t,ro,null,null,n),up._currentValue=a),Us(e,t),Os(e,t,r,n),t.child;case 6:return null===e&&ua&&((e=n=ca)&&(null!==(n=function(e,t,n){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!n)return null;if(null===(e=Ou(e.nextSibling)))return null}return e}(n,t.pendingProps,ma))?(t.stateNode=n,da=t,ca=null,e=!0):e=!1),e||ha(t)),null;case 13:return Qs(e,t,n);case 4:return G(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=mi(t,null,r,n):Os(e,t,r,n),t.child;case 11:return Ts(e,t,t.type,t.pendingProps,n);case 7:return Os(e,t,t.pendingProps,n),t.child;case 8:case 12:return Os(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,$a(0,t.type,r.value),Os(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Aa(t),r=r(a=Da(a)),t.flags|=1,Os(e,t,r,n),t.child;case 14:return Ps(e,t,t.type,t.pendingProps,n);case 15:return Ls(e,t,t.type,t.pendingProps,n);case 19:return rl(e,t,n);case 31:return function(e,t,n){var r=t.pendingProps,a=0!==(128&t.flags);if(t.flags&=-129,null===e){if(ua){if("hidden"===r.mode)return e=Ms(t,r),t.lanes=536870912,Is(null,e);if(Ti(t),(e=ca)?null!==(e=null!==(e=Au(e,ma))&&"&"===e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:na,overflow:ra}:null,retryLane:536870912,hydrationErrors:null},(n=Hr(e)).return=t,t.child=n,da=t,ca=null):e=null,null===e)throw ha(t);return t.lanes=536870912,null}return Ms(t,r)}var i=e.memoizedState;if(null!==i){var s=i.dehydrated;if(Ti(t),a)if(256&t.flags)t.flags&=-257,t=Vs(e,t,n);else{if(null===t.memoizedState)throw Error(o(558));t.child=e.child,t.flags|=128,t=null}else if(Fs||za(e,t,n,!1),a=0!==(n&e.childLanes),Fs||a){if(null!==(r=hd)&&0!==(s=Te(r,n))&&s!==i.retryLane)throw i.retryLane=s,Fr(e,s),Yd(r,e,s),Ds;sc(),t=Vs(e,t,n)}else e=i.treeContext,ca=Ou(s.nextSibling),da=t,ua=!0,pa=null,ma=!1,null!==e&&la(t,e),(t=Ms(t,r)).flags|=4096;return t}return(e=Br(e.child,{mode:r.mode,children:r.children})).ref=t.ref,t.child=e,e.return=t,e}(e,t,n);case 22:return Rs(e,t,n,t.pendingProps);case 24:return Aa(t),r=Da(Ra),null===e?(null===(a=Ga())&&(a=hd,i=Ia(),a.pooledCache=i,i.refCount++,null!==i&&(a.pooledCacheLanes|=n),a=i),t.memoizedState={parent:r,cache:a},gi(t),$a(0,Ra,a)):(0!==(e.lanes&n)&&(xi(e,t),Si(t,null,null,n),wi()),a=e.memoizedState,i=t.memoizedState,a.parent!==r?(a={parent:r,cache:r},t.memoizedState=a,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=a),$a(0,Ra,r)):(r=i.cache,$a(0,Ra,r),r!==a.cache&&Ea(t,[Ra],n,!0))),Os(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function sl(e){e.flags|=4}function ll(e,t,n,r,a){if((t=0!==(32&e.mode))&&(t=!1),t){if(e.flags|=16777216,(335544128&a)===a)if(e.stateNode.complete)e.flags|=8192;else{if(!ac())throw ai=ei,Xa;e.flags|=8192}}else e.flags&=-16777217}function dl(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!ip(t)){if(!ac())throw ai=ei,Xa;e.flags|=8192}}function cl(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?Ce():536870912,e.lanes|=t,zd|=t)}function ul(e,t){if(!ua)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function pl(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=65011712&a.subtreeFlags,r|=65011712&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ml(e,t,n){var r=t.pendingProps;switch(sa(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return pl(t),null;case 3:return n=t.stateNode,r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Na(Ra),Y(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),null!==e&&null!==e.child||(va(t)?sl(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,ka())),pl(t),null;case 26:var a=t.type,i=t.memoizedState;return null===e?(sl(t),null!==i?(pl(t),dl(t,i)):(pl(t),ll(t,a,0,0,n))):i?i!==e.memoizedState?(sl(t),pl(t),dl(t,i)):(pl(t),t.flags&=-16777217):((e=e.memoizedProps)!==r&&sl(t),pl(t),ll(t,a,0,0,n)),null;case 27:if(Q(t),n=W.current,a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&sl(t);else{if(!r){if(null===t.stateNode)throw Error(o(166));return pl(t),null}e=K.current,va(t)?ga(t):(e=Ru(a,r,n),t.stateNode=e,sl(t))}return pl(t),null;case 5:if(Q(t),a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&sl(t);else{if(!r){if(null===t.stateNode)throw Error(o(166));return pl(t),null}if(i=K.current,va(t))ga(t);else{var s=xu(W.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":(i=s.createElement("div")).innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i="string"===typeof r.is?s.createElement("select",{is:r.is}):s.createElement("select"),r.multiple?i.multiple=!0:r.size&&(i.size=r.size);break;default:i="string"===typeof r.is?s.createElement(a,{is:r.is}):s.createElement(a)}}i[Me]=t,i[Ve]=r;e:for(s=t.child;null!==s;){if(5===s.tag||6===s.tag)i.appendChild(s.stateNode);else if(4!==s.tag&&27!==s.tag&&null!==s.child){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;null===s.sibling;){if(null===s.return||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=i;e:switch(mu(i,a,r),a){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&sl(t)}}return pl(t),ll(t,t.type,null===e||e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==r&&sl(t);else{if("string"!==typeof r&&null===t.stateNode)throw Error(o(166));if(e=W.current,va(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,null!==(a=da))switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Me]=t,(e=!!(e.nodeValue===n||null!==r&&!0===r.suppressHydrationWarning||cu(e.nodeValue,n)))||ha(t,!0)}else(e=xu(e).createTextNode(r))[Me]=t,t.stateNode=e}return pl(t),null;case 31:if(n=t.memoizedState,null===e||null!==e.memoizedState){if(r=va(t),null!==n){if(null===e){if(!r)throw Error(o(318));if(!(e=null!==(e=t.memoizedState)?e.dehydrated:null))throw Error(o(557));e[Me]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;pl(t),e=!1}else n=ka(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return 256&t.flags?(Ri(t),t):(Ri(t),null);if(0!==(128&t.flags))throw Error(o(558))}return pl(t),null;case 13:if(r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(a=va(t),null!==r&&null!==r.dehydrated){if(null===e){if(!a)throw Error(o(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(o(317));a[Me]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;pl(t),a=!1}else a=ka(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return 256&t.flags?(Ri(t),t):(Ri(t),null)}return Ri(t),0!==(128&t.flags)?(t.lanes=n,t):(n=null!==r,e=null!==e&&null!==e.memoizedState,n&&(a=null,null!==(r=t.child).alternate&&null!==r.alternate.memoizedState&&null!==r.alternate.memoizedState.cachePool&&(a=r.alternate.memoizedState.cachePool.pool),i=null,null!==r.memoizedState&&null!==r.memoizedState.cachePool&&(i=r.memoizedState.cachePool.pool),i!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),cl(t,t.updateQueue),pl(t),null);case 4:return Y(),null===e&&eu(t.stateNode.containerInfo),pl(t),null;case 10:return Na(t.type),pl(t),null;case 19:if(B(Ii),null===(r=t.memoizedState))return pl(t),null;if(a=0!==(128&t.flags),null===(i=r.rendering))if(a)ul(r,!1);else{if(0!==Sd||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(i=Bi(e))){for(t.flags|=128,ul(r,!1),e=i.updateQueue,t.updateQueue=e,cl(t,e),t.subtreeFlags=0,e=n,n=t.child;null!==n;)Mr(n,e),n=n.sibling;return M(Ii,1&Ii.current|2),ua&&aa(t,r.treeForkCount),t.child}e=e.sibling}null!==r.tail&&le()>Td&&(t.flags|=128,a=!0,ul(r,!1),t.lanes=4194304)}else{if(!a)if(null!==(e=Bi(i))){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,cl(t,e),ul(r,!0),null===r.tail&&"hidden"===r.tailMode&&!i.alternate&&!ua)return pl(t),null}else 2*le()-r.renderingStartTime>Td&&536870912!==n&&(t.flags|=128,a=!0,ul(r,!1),t.lanes=4194304);r.isBackwards?(i.sibling=t.child,t.child=i):(null!==(e=r.last)?e.sibling=i:t.child=i,r.last=i)}return null!==r.tail?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=le(),e.sibling=null,n=Ii.current,M(Ii,a?1&n|2:1&n),ua&&aa(t,r.treeForkCount),e):(pl(t),null);case 22:case 23:return Ri(t),Ai(),r=null!==t.memoizedState,null!==e?null!==e.memoizedState!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?0!==(536870912&n)&&0===(128&t.flags)&&(pl(t),6&t.subtreeFlags&&(t.flags|=8192)):pl(t),null!==(n=t.updateQueue)&&cl(t,n.retryQueue),n=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),r=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),null!==e&&B(qa),null;case 24:return n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Na(Ra),pl(t),null;case 25:case 30:return null}throw Error(o(156,t.tag))}function fl(e,t){switch(sa(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Na(Ra),Y(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return Q(t),null;case 31:if(null!==t.memoizedState){if(Ri(t),null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 13:if(Ri(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return B(Ii),null;case 4:return Y(),null;case 10:return Na(t.type),null;case 22:case 23:return Ri(t),Ai(),null!==e&&B(qa),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return Na(Ra),null;default:return null}}function hl(e,t){switch(sa(t),t.tag){case 3:Na(Ra),Y();break;case 26:case 27:case 5:Q(t);break;case 4:Y();break;case 31:null!==t.memoizedState&&Ri(t);break;case 13:Ri(t);break;case 19:B(Ii);break;case 10:Na(t.type);break;case 22:case 23:Ri(t),Ai(),null!==e&&B(qa);break;case 24:Na(Ra)}}function gl(e,t){try{var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var a=r.next;n=a;do{if((n.tag&e)===e){r=void 0;var i=n.create,o=n.inst;r=i(),o.destroy=r}n=n.next}while(n!==a)}}catch(s){Sc(t,t.return,s)}}function xl(e,t,n){try{var r=t.updateQueue,a=null!==r?r.lastEffect:null;if(null!==a){var i=a.next;r=i;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(void 0!==s){o.destroy=void 0,a=t;var l=n,d=s;try{d()}catch(c){Sc(a,l,c)}}}r=r.next}while(r!==i)}}catch(c){Sc(t,t.return,c)}}function vl(e){var t=e.updateQueue;if(null!==t){var n=e.stateNode;try{Ni(t,n)}catch(r){Sc(e,e.return,r)}}}function bl(e,t,n){n.props=ws(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(r){Sc(e,t,r)}}function kl(e,t){try{var n=e.ref;if(null!==n){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;default:r=e.stateNode}"function"===typeof n?e.refCleanup=n(r):n.current=r}}catch(a){Sc(e,t,a)}}function yl(e,t){var n=e.ref,r=e.refCleanup;if(null!==n)if("function"===typeof r)try{r()}catch(a){Sc(e,t,a)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof n)try{n(null)}catch(i){Sc(e,t,i)}else n.current=null}function jl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&r.focus();break e;case"img":n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(a){Sc(e,e.return,a)}}function wl(e,t,n){try{var r=e.stateNode;!function(e,t,n,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,s=null,l=null,d=null,c=null,u=null;for(f in n){var p=n[f];if(n.hasOwnProperty(f)&&null!=p)switch(f){case"checked":case"value":break;case"defaultValue":d=p;default:r.hasOwnProperty(f)||uu(e,t,f,null,r,p)}}for(var m in r){var f=r[m];if(p=n[m],r.hasOwnProperty(m)&&(null!=f||null!=p))switch(m){case"type":i=f;break;case"name":a=f;break;case"checked":c=f;break;case"defaultChecked":u=f;break;case"value":s=f;break;case"defaultValue":l=f;break;case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(o(137,t));break;default:f!==p&&uu(e,t,m,f,r,p)}}return void vt(e,s,l,d,c,u,i,a);case"select":for(i in f=s=l=m=null,n)if(d=n[i],n.hasOwnProperty(i)&&null!=d)switch(i){case"value":break;case"multiple":f=d;default:r.hasOwnProperty(i)||uu(e,t,i,null,r,d)}for(a in r)if(i=r[a],d=n[a],r.hasOwnProperty(a)&&(null!=i||null!=d))switch(a){case"value":m=i;break;case"defaultValue":l=i;break;case"multiple":s=i;default:i!==d&&uu(e,t,a,i,r,d)}return t=l,n=s,r=f,void(null!=m?yt(e,!!n,m,!1):!!r!==!!n&&(null!=t?yt(e,!!n,t,!0):yt(e,!!n,n?[]:"",!1)));case"textarea":for(l in f=m=null,n)if(a=n[l],n.hasOwnProperty(l)&&null!=a&&!r.hasOwnProperty(l))switch(l){case"value":case"children":break;default:uu(e,t,l,null,r,a)}for(s in r)if(a=r[s],i=n[s],r.hasOwnProperty(s)&&(null!=a||null!=i))switch(s){case"value":m=a;break;case"defaultValue":f=a;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=a)throw Error(o(91));break;default:a!==i&&uu(e,t,s,a,r,i)}return void jt(e,m,f);case"option":for(var h in n)if(m=n[h],n.hasOwnProperty(h)&&null!=m&&!r.hasOwnProperty(h))if("selected"===h)e.selected=!1;else uu(e,t,h,null,r,m);for(d in r)if(m=r[d],f=n[d],r.hasOwnProperty(d)&&m!==f&&(null!=m||null!=f))if("selected"===d)e.selected=m&&"function"!==typeof m&&"symbol"!==typeof m;else uu(e,t,d,m,r,f);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in n)m=n[g],n.hasOwnProperty(g)&&null!=m&&!r.hasOwnProperty(g)&&uu(e,t,g,null,r,m);for(c in r)if(m=r[c],f=n[c],r.hasOwnProperty(c)&&m!==f&&(null!=m||null!=f))switch(c){case"children":case"dangerouslySetInnerHTML":if(null!=m)throw Error(o(137,t));break;default:uu(e,t,c,m,r,f)}return;default:if(Et(t)){for(var x in n)m=n[x],n.hasOwnProperty(x)&&void 0!==m&&!r.hasOwnProperty(x)&&pu(e,t,x,void 0,r,m);for(u in r)m=r[u],f=n[u],!r.hasOwnProperty(u)||m===f||void 0===m&&void 0===f||pu(e,t,u,m,r,f);return}}for(var v in n)m=n[v],n.hasOwnProperty(v)&&null!=m&&!r.hasOwnProperty(v)&&uu(e,t,v,null,r,m);for(p in r)m=r[p],f=n[p],!r.hasOwnProperty(p)||m===f||null==m&&null==f||uu(e,t,p,m,r,f)}(r,e.type,n,t),r[Ve]=t}catch(a){Sc(e,e.return,a)}}function Sl(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&_u(e.type)||4===e.tag}function $l(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Sl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&_u(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function Nl(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?(9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).insertBefore(e,t):((t=9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Dt));else if(4!==r&&(27===r&&_u(e.type)&&(n=e.stateNode,t=null),null!==(e=e.child)))for(Nl(e,t,n),e=e.sibling;null!==e;)Nl(e,t,n),e=e.sibling}function _l(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&(27===r&&_u(e.type)&&(n=e.stateNode),null!==(e=e.child)))for(_l(e,t,n),e=e.sibling;null!==e;)_l(e,t,n),e=e.sibling}function El(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);mu(t,r,n),t[Me]=e,t[Ve]=n}catch(i){Sc(e,e.return,i)}}var zl=!1,Cl=!1,Al=!1,Dl="function"===typeof WeakSet?WeakSet:Set,Fl=null;function Ol(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Yl(e,n),4&r&&gl(5,n);break;case 1:if(Yl(e,n),4&r)if(e=n.stateNode,null===t)try{e.componentDidMount()}catch(o){Sc(n,n.return,o)}else{var a=ws(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){Sc(n,n.return,s)}}64&r&&vl(n),512&r&&kl(n,n.return);break;case 3:if(Yl(e,n),64&r&&null!==(e=n.updateQueue)){if(t=null,null!==n.child)switch(n.child.tag){case 27:case 5:case 1:t=n.child.stateNode}try{Ni(e,t)}catch(o){Sc(n,n.return,o)}}break;case 27:null===t&&4&r&&El(n);case 26:case 5:Yl(e,n),null===t&&4&r&&jl(n),512&r&&kl(n,n.return);break;case 12:Yl(e,n);break;case 31:Yl(e,n),4&r&&Bl(e,n);break;case 13:Yl(e,n),4&r&&Ml(e,n),64&r&&(null!==(e=n.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var n=e.ownerDocument;if("$~"===e.data)e._reactRetry=t;else if("$?"!==e.data||"loading"!==n.readyState)t();else{var r=function(){t(),n.removeEventListener("DOMContentLoaded",r)};n.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}(e,n=Ec.bind(null,n))));break;case 22:if(!(r=null!==n.memoizedState||zl)){t=null!==t&&null!==t.memoizedState||Cl,a=zl;var i=Cl;zl=r,(Cl=t)&&!i?Ql(e,n,0!==(8772&n.subtreeFlags)):Yl(e,n),zl=a,Cl=i}break;case 30:break;default:Yl(e,n)}}function Tl(e){var t=e.alternate;null!==t&&(e.alternate=null,Tl(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Ye(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Pl=null,Ll=!1;function Rl(e,t,n){for(n=n.child;null!==n;)Il(e,t,n),n=n.sibling}function Il(e,t,n){if(ve&&"function"===typeof ve.onCommitFiberUnmount)try{ve.onCommitFiberUnmount(xe,n)}catch(i){}switch(n.tag){case 26:Cl||yl(n,t),Rl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode).parentNode.removeChild(n);break;case 27:Cl||yl(n,t);var r=Pl,a=Ll;_u(n.type)&&(Pl=n.stateNode,Ll=!1),Rl(e,t,n),Iu(n.stateNode),Pl=r,Ll=a;break;case 5:Cl||yl(n,t);case 6:if(r=Pl,a=Ll,Pl=null,Rl(e,t,n),Ll=a,null!==(Pl=r))if(Ll)try{(9===Pl.nodeType?Pl.body:"HTML"===Pl.nodeName?Pl.ownerDocument.body:Pl).removeChild(n.stateNode)}catch(o){Sc(n,t,o)}else try{Pl.removeChild(n.stateNode)}catch(o){Sc(n,t,o)}break;case 18:null!==Pl&&(Ll?(Eu(9===(e=Pl).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,n.stateNode),Hp(e)):Eu(Pl,n.stateNode));break;case 4:r=Pl,a=Ll,Pl=n.stateNode.containerInfo,Ll=!0,Rl(e,t,n),Pl=r,Ll=a;break;case 0:case 11:case 14:case 15:xl(2,n,t),Cl||xl(4,n,t),Rl(e,t,n);break;case 1:Cl||(yl(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount&&bl(n,t,r)),Rl(e,t,n);break;case 21:Rl(e,t,n);break;case 22:Cl=(r=Cl)||null!==n.memoizedState,Rl(e,t,n),Cl=r;break;default:Rl(e,t,n)}}function Bl(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&null!==(e=e.memoizedState))){e=e.dehydrated;try{Hp(e)}catch(n){Sc(t,t.return,n)}}}function Ml(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Hp(e)}catch(n){Sc(t,t.return,n)}}function Vl(e,t){var n=function(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new Dl),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new Dl),t;default:throw Error(o(435,e.tag))}}(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=zc.bind(null,e,t);t.then(r,r)}})}function Ul(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var a=n[r],i=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 27:if(_u(l.type)){Pl=l.stateNode,Ll=!1;break e}break;case 5:Pl=l.stateNode,Ll=!1;break e;case 3:case 4:Pl=l.stateNode.containerInfo,Ll=!0;break e}l=l.return}if(null===Pl)throw Error(o(160));Il(i,s,a),Pl=null,Ll=!1,null!==(i=a.alternate)&&(i.return=null),a.return=null}if(13886&t.subtreeFlags)for(t=t.child;null!==t;)Hl(t,e),t=t.sibling}var Kl=null;function Hl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ul(t,e),Wl(e),4&r&&(xl(3,e,e.return),gl(3,e),xl(5,e,e.return));break;case 1:Ul(t,e),Wl(e),512&r&&(Cl||null===n||yl(n,n.return)),64&r&&zl&&(null!==(e=e.updateQueue)&&(null!==(r=e.callbacks)&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===n?r:n.concat(r))));break;case 26:var a=Kl;if(Ul(t,e),Wl(e),512&r&&(Cl||null===n||yl(n,n.return)),4&r){var i=null!==n?n.memoizedState:null;if(r=e.memoizedState,null===n)if(null===r)if(null===e.stateNode){e:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;t:switch(r){case"title":(!(i=a.getElementsByTagName("title")[0])||i[Ge]||i[Me]||"http://www.w3.org/2000/svg"===i.namespaceURI||i.hasAttribute("itemprop"))&&(i=a.createElement(r),a.head.insertBefore(i,a.querySelector("head > title"))),mu(i,r,n),i[Me]=e,et(i),r=i;break e;case"link":var s=rp("link","href",a).get(r+(n.href||""));if(s)for(var l=0;l<s.length;l++)if((i=s[l]).getAttribute("href")===(null==n.href||""===n.href?null:n.href)&&i.getAttribute("rel")===(null==n.rel?null:n.rel)&&i.getAttribute("title")===(null==n.title?null:n.title)&&i.getAttribute("crossorigin")===(null==n.crossOrigin?null:n.crossOrigin)){s.splice(l,1);break t}mu(i=a.createElement(r),r,n),a.head.appendChild(i);break;case"meta":if(s=rp("meta","content",a).get(r+(n.content||"")))for(l=0;l<s.length;l++)if((i=s[l]).getAttribute("content")===(null==n.content?null:""+n.content)&&i.getAttribute("name")===(null==n.name?null:n.name)&&i.getAttribute("property")===(null==n.property?null:n.property)&&i.getAttribute("http-equiv")===(null==n.httpEquiv?null:n.httpEquiv)&&i.getAttribute("charset")===(null==n.charSet?null:n.charSet)){s.splice(l,1);break t}mu(i=a.createElement(r),r,n),a.head.appendChild(i);break;default:throw Error(o(468,r))}i[Me]=e,et(i),r=i}e.stateNode=r}else ap(a,e.type,e.stateNode);else e.stateNode=Xu(a,r,e.memoizedProps);else i!==r?(null===i?null!==n.stateNode&&(n=n.stateNode).parentNode.removeChild(n):i.count--,null===r?ap(a,e.type,e.stateNode):Xu(a,r,e.memoizedProps)):null===r&&null!==e.stateNode&&wl(e,e.memoizedProps,n.memoizedProps)}break;case 27:Ul(t,e),Wl(e),512&r&&(Cl||null===n||yl(n,n.return)),null!==n&&4&r&&wl(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Ul(t,e),Wl(e),512&r&&(Cl||null===n||yl(n,n.return)),32&e.flags){a=e.stateNode;try{St(a,"")}catch(h){Sc(e,e.return,h)}}4&r&&null!=e.stateNode&&wl(e,a=e.memoizedProps,null!==n?n.memoizedProps:a),1024&r&&(Al=!0);break;case 6:if(Ul(t,e),Wl(e),4&r){if(null===e.stateNode)throw Error(o(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(h){Sc(e,e.return,h)}}break;case 3:if(np=null,a=Kl,Kl=Vu(t.containerInfo),Ul(t,e),Kl=a,Wl(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Hp(t.containerInfo)}catch(h){Sc(e,e.return,h)}Al&&(Al=!1,Gl(e));break;case 4:r=Kl,Kl=Vu(e.stateNode.containerInfo),Ul(t,e),Wl(e),Kl=r;break;case 12:default:Ul(t,e),Wl(e);break;case 31:case 19:Ul(t,e),Wl(e),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Vl(e,r)));break;case 13:Ul(t,e),Wl(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==n&&null!==n.memoizedState)&&(Fd=le()),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Vl(e,r)));break;case 22:a=null!==e.memoizedState;var d=null!==n&&null!==n.memoizedState,c=zl,u=Cl;if(zl=c||a,Cl=u||d,Ul(t,e),Cl=u,zl=c,Wl(e),8192&r)e:for(t=e.stateNode,t._visibility=a?-2&t._visibility:1|t._visibility,a&&(null===n||d||zl||Cl||Jl(e)),n=null,t=e;;){if(5===t.tag||26===t.tag){if(null===n){d=n=t;try{if(i=d.stateNode,a)"function"===typeof(s=i.style).setProperty?s.setProperty("display","none","important"):s.display="none";else{l=d.stateNode;var p=d.memoizedProps.style,m=void 0!==p&&null!==p&&p.hasOwnProperty("display")?p.display:null;l.style.display=null==m||"boolean"===typeof m?"":(""+m).trim()}}catch(h){Sc(d,d.return,h)}}}else if(6===t.tag){if(null===n){d=t;try{d.stateNode.nodeValue=a?"":d.memoizedProps}catch(h){Sc(d,d.return,h)}}}else if(18===t.tag){if(null===n){d=t;try{var f=d.stateNode;a?zu(f,!0):zu(d.stateNode,!1)}catch(h){Sc(d,d.return,h)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}4&r&&(null!==(r=e.updateQueue)&&(null!==(n=r.retryQueue)&&(r.retryQueue=null,Vl(e,n))));case 30:case 21:}}function Wl(e){var t=e.flags;if(2&t){try{for(var n,r=e.return;null!==r;){if(Sl(r)){n=r;break}r=r.return}if(null==n)throw Error(o(160));switch(n.tag){case 27:var a=n.stateNode;_l(e,$l(e),a);break;case 5:var i=n.stateNode;32&n.flags&&(St(i,""),n.flags&=-33),_l(e,$l(e),i);break;case 3:case 4:var s=n.stateNode.containerInfo;Nl(e,$l(e),s);break;default:throw Error(o(161))}}catch(l){Sc(e,e.return,l)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Gl(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Gl(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Yl(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Ol(e,t.alternate,t),t=t.sibling}function Jl(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:xl(4,t,t.return),Jl(t);break;case 1:yl(t,t.return);var n=t.stateNode;"function"===typeof n.componentWillUnmount&&bl(t,t.return,n),Jl(t);break;case 27:Iu(t.stateNode);case 26:case 5:yl(t,t.return),Jl(t);break;case 22:null===t.memoizedState&&Jl(t);break;default:Jl(t)}e=e.sibling}}function Ql(e,t,n){for(n=n&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var r=t.alternate,a=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:Ql(a,i,n),gl(4,i);break;case 1:if(Ql(a,i,n),"function"===typeof(a=(r=i).stateNode).componentDidMount)try{a.componentDidMount()}catch(d){Sc(r,r.return,d)}if(null!==(a=(r=i).updateQueue)){var s=r.stateNode;try{var l=a.shared.hiddenCallbacks;if(null!==l)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)$i(l[a],s)}catch(d){Sc(r,r.return,d)}}n&&64&o&&vl(i),kl(i,i.return);break;case 27:El(i);case 26:case 5:Ql(a,i,n),n&&null===r&&4&o&&jl(i),kl(i,i.return);break;case 12:Ql(a,i,n);break;case 31:Ql(a,i,n),n&&4&o&&Bl(a,i);break;case 13:Ql(a,i,n),n&&4&o&&Ml(a,i);break;case 22:null===i.memoizedState&&Ql(a,i,n),kl(i,i.return);break;case 30:break;default:Ql(a,i,n)}t=t.sibling}}function Xl(e,t){var n=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==n&&(null!=e&&e.refCount++,null!=n&&Ba(n))}function Zl(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ba(e))}function ed(e,t,n,r){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)td(e,t,n,r),t=t.sibling}function td(e,t,n,r){var a=t.flags;switch(t.tag){case 0:case 11:case 15:ed(e,t,n,r),2048&a&&gl(9,t);break;case 1:case 31:case 13:default:ed(e,t,n,r);break;case 3:ed(e,t,n,r),2048&a&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ba(e)));break;case 12:if(2048&a){ed(e,t,n,r),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,s=i.onPostCommit;"function"===typeof s&&s(o,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(l){Sc(t,t.return,l)}}else ed(e,t,n,r);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,null!==t.memoizedState?2&i._visibility?ed(e,t,n,r):rd(e,t):2&i._visibility?ed(e,t,n,r):(i._visibility|=2,nd(e,t,n,r,0!==(10256&t.subtreeFlags)||!1)),2048&a&&Xl(o,t);break;case 24:ed(e,t,n,r),2048&a&&Zl(t.alternate,t)}}function nd(e,t,n,r,a){for(a=a&&(0!==(10256&t.subtreeFlags)||!1),t=t.child;null!==t;){var i=e,o=t,s=n,l=r,d=o.flags;switch(o.tag){case 0:case 11:case 15:nd(i,o,s,l,a),gl(8,o);break;case 23:break;case 22:var c=o.stateNode;null!==o.memoizedState?2&c._visibility?nd(i,o,s,l,a):rd(i,o):(c._visibility|=2,nd(i,o,s,l,a)),a&&2048&d&&Xl(o.alternate,o);break;case 24:nd(i,o,s,l,a),a&&2048&d&&Zl(o.alternate,o);break;default:nd(i,o,s,l,a)}t=t.sibling}}function rd(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var n=e,r=t,a=r.flags;switch(r.tag){case 22:rd(n,r),2048&a&&Xl(r.alternate,r);break;case 24:rd(n,r),2048&a&&Zl(r.alternate,r);break;default:rd(n,r)}t=t.sibling}}var ad=8192;function id(e,t,n){if(e.subtreeFlags&ad)for(e=e.child;null!==e;)od(e,t,n),e=e.sibling}function od(e,t,n){switch(e.tag){case 26:id(e,t,n),e.flags&ad&&null!==e.memoizedState&&function(e,t,n,r){if("stylesheet"===n.type&&("string"!==typeof r.media||!1!==matchMedia(r.media).matches)&&0===(4&n.state.loading)){if(null===n.instance){var a=qu(r.href),i=t.querySelector(Gu(a));if(i)return null!==(t=i._p)&&"object"===typeof t&&"function"===typeof t.then&&(e.count++,e=sp.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,void et(i);i=t.ownerDocument||t,r=Yu(r),(a=Bu.get(a))&&ep(r,a),et(i=i.createElement("link"));var o=i;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),mu(i,"link",r),n.instance=i}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&0===(3&n.state.loading)&&(e.count++,n=sp.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}(n,Kl,e.memoizedState,e.memoizedProps);break;case 5:default:id(e,t,n);break;case 3:case 4:var r=Kl;Kl=Vu(e.stateNode.containerInfo),id(e,t,n),Kl=r;break;case 22:null===e.memoizedState&&(null!==(r=e.alternate)&&null!==r.memoizedState?(r=ad,ad=16777216,id(e,t,n),ad=r):id(e,t,n))}}function sd(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function ld(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];Fl=r,ud(r,e)}sd(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)dd(e),e=e.sibling}function dd(e){switch(e.tag){case 0:case 11:case 15:ld(e),2048&e.flags&&xl(9,e,e.return);break;case 3:case 12:default:ld(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,cd(e)):ld(e)}}function cd(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];Fl=r,ud(r,e)}sd(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:xl(8,t,t.return),cd(t);break;case 22:2&(n=t.stateNode)._visibility&&(n._visibility&=-3,cd(t));break;default:cd(t)}e=e.sibling}}function ud(e,t){for(;null!==Fl;){var n=Fl;switch(n.tag){case 0:case 11:case 15:xl(8,n,t);break;case 23:case 22:if(null!==n.memoizedState&&null!==n.memoizedState.cachePool){var r=n.memoizedState.cachePool.pool;null!=r&&r.refCount++}break;case 24:Ba(n.memoizedState.cache)}if(null!==(r=n.child))r.return=n,Fl=r;else e:for(n=e;null!==Fl;){var a=(r=Fl).sibling,i=r.return;if(Tl(r),r===n){Fl=null;break e}if(null!==a){a.return=i,Fl=a;break e}Fl=i}}}var pd={getCacheForType:function(e){var t=Da(Ra),n=t.data.get(e);return void 0===n&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Da(Ra).controller.signal}},md="function"===typeof WeakMap?WeakMap:Map,fd=0,hd=null,gd=null,xd=0,vd=0,bd=null,kd=!1,yd=!1,jd=!1,wd=0,Sd=0,$d=0,Nd=0,_d=0,Ed=0,zd=0,Cd=null,Ad=null,Dd=!1,Fd=0,Od=0,Td=1/0,Pd=null,Ld=null,Rd=0,Id=null,Bd=null,Md=0,Vd=0,Ud=null,Kd=null,Hd=0,Wd=null;function qd(){return 0!==(2&fd)&&0!==xd?xd&-xd:null!==O.T?Uc():Re()}function Gd(){if(0===Ed)if(0===(536870912&xd)||ua){var e=Se;0===(3932160&(Se<<=1))&&(Se=262144),Ed=e}else Ed=536870912;return null!==(e=Di.current)&&(e.flags|=32),Ed}function Yd(e,t,n){(e!==hd||2!==vd&&9!==vd)&&null===e.cancelPendingCommit||(nc(e,0),Zd(e,xd,Ed,!1)),De(e,n),0!==(2&fd)&&e===hd||(e===hd&&(0===(2&fd)&&(Nd|=n),4===Sd&&Zd(e,xd,Ed,!1)),Pc(e))}function Jd(e,t,n){if(0!==(6&fd))throw Error(o(327));for(var r=!n&&0===(127&t)&&0===(t&e.expiredLanes)||Ee(e,t),a=r?function(e,t){var n=fd;fd|=2;var r=ic(),a=oc();hd!==e||xd!==t?(Pd=null,Td=le()+500,nc(e,t)):yd=Ee(e,t);e:for(;;)try{if(0!==vd&&null!==gd){t=gd;var i=bd;t:switch(vd){case 1:vd=0,bd=null,mc(e,t,i,1);break;case 2:case 9:if(ti(i)){vd=0,bd=null,pc(t);break}t=function(){2!==vd&&9!==vd||hd!==e||(vd=7),Pc(e)},i.then(t,t);break e;case 3:vd=7;break e;case 4:vd=5;break e;case 7:ti(i)?(vd=0,bd=null,pc(t)):(vd=0,bd=null,mc(e,t,i,7));break;case 5:var s=null;switch(gd.tag){case 26:s=gd.memoizedState;case 5:case 27:var l=gd;if(s?ip(s):l.stateNode.complete){vd=0,bd=null;var d=l.sibling;if(null!==d)gd=d;else{var c=l.return;null!==c?(gd=c,fc(c)):gd=null}break t}}vd=0,bd=null,mc(e,t,i,5);break;case 6:vd=0,bd=null,mc(e,t,i,6);break;case 8:tc(),Sd=6;break e;default:throw Error(o(462))}}cc();break}catch(u){rc(e,u)}return Sa=wa=null,O.H=r,O.A=a,fd=n,null!==gd?0:(hd=null,xd=0,Cr(),Sd)}(e,t):lc(e,t,!0),i=r;;){if(0===a){yd&&!r&&Zd(e,t,0,!1);break}if(n=e.current.alternate,!i||Xd(n)){if(2===a){if(i=t,e.errorRecoveryDisabledLanes&i)var s=0;else s=0!==(s=-536870913&e.pendingLanes)?s:536870912&s?536870912:0;if(0!==s){t=s;e:{var l=e;a=Cd;var d=l.current.memoizedState.isDehydrated;if(d&&(nc(l,s).flags|=256),2!==(s=lc(l,s,!1))){if(jd&&!d){l.errorRecoveryDisabledLanes|=i,Nd|=i,a=4;break e}i=Ad,Ad=a,null!==i&&(null===Ad?Ad=i:Ad.push.apply(Ad,i))}a=s}if(i=!1,2!==a)continue}}if(1===a){nc(e,0),Zd(e,t,0,!0);break}e:{switch(r=e,i=a){case 0:case 1:throw Error(o(345));case 4:if((4194048&t)!==t)break;case 6:Zd(r,t,Ed,!kd);break e;case 2:Ad=null;break;case 3:case 5:break;default:throw Error(o(329))}if((62914560&t)===t&&10<(a=Fd+300-le())){if(Zd(r,t,Ed,!kd),0!==_e(r,0,!0))break e;Md=t,r.timeoutHandle=ju(Qd.bind(null,r,n,Ad,Pd,Dd,t,Ed,Nd,zd,kd,i,"Throttled",-0,0),a)}else Qd(r,n,Ad,Pd,Dd,t,Ed,Nd,zd,kd,i,null,-0,0)}break}a=lc(e,t,!1),i=!1}Pc(e)}function Qd(e,t,n,r,a,i,o,s,l,d,c,u,p,m){if(e.timeoutHandle=-1,8192&(u=t.subtreeFlags)||16785408===(16785408&u)){od(t,i,u={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Dt});var f=(62914560&i)===i?Fd-le():(4194048&i)===i?Od-le():0;if(null!==(f=function(e,t){return e.stylesheets&&0===e.count&&dp(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&dp(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&0===op&&(op=62500*function(){if("function"===typeof performance.getEntriesByType){for(var e=0,t=0,n=performance.getEntriesByType("resource"),r=0;r<n.length;r++){var a=n[r],i=a.transferSize,o=a.initiatorType,s=a.duration;if(i&&s&&fu(o)){for(o=0,s=a.responseEnd,r+=1;r<n.length;r++){var l=n[r],d=l.startTime;if(d>s)break;var c=l.transferSize,u=l.initiatorType;c&&fu(u)&&(o+=c*((l=l.responseEnd)<s?1:(s-d)/(l-d)))}if(--r,t+=8*(i+o)/(a.duration/1e3),10<++e)break}}if(0<e)return t/e/1e6}return navigator.connection&&"number"===typeof(e=navigator.connection.downlink)?e:5}());var a=setTimeout(function(){if(e.waitingForImages=!1,0===e.count&&(e.stylesheets&&dp(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>op?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(a)}}:null}(u,f)))return Md=i,e.cancelPendingCommit=f(gc.bind(null,e,t,i,n,r,a,o,s,l,c,u,null,p,m)),void Zd(e,i,o,!d)}gc(e,t,i,n,r,a,o,s,l)}function Xd(e){for(var t=e;;){var n=t.tag;if((0===n||11===n||15===n)&&16384&t.flags&&(null!==(n=t.updateQueue)&&null!==(n=n.stores)))for(var r=0;r<n.length;r++){var a=n[r],i=a.getSnapshot;a=a.value;try{if(!Xn(i(),a))return!1}catch(o){return!1}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zd(e,t,n,r){t&=~_d,t&=~Nd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var a=t;0<a;){var i=31-ke(a),o=1<<i;r[i]=-1,a&=~o}0!==n&&Fe(e,n,t)}function ec(){return 0!==(6&fd)||(Lc(0,!1),!1)}function tc(){if(null!==gd){if(0===vd)var e=gd.return;else Sa=wa=null,oo(e=gd),si=null,li=0,e=gd;for(;null!==e;)hl(e.alternate,e),e=e.return;gd=null}}function nc(e,t){var n=e.timeoutHandle;-1!==n&&(e.timeoutHandle=-1,wu(n)),null!==(n=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,n()),Md=0,tc(),hd=e,gd=n=Br(e.current,null),xd=t,vd=0,bd=null,kd=!1,yd=Ee(e,t),jd=!1,zd=Ed=_d=Nd=$d=Sd=0,Ad=Cd=null,Dd=!1,0!==(8&t)&&(t|=32&t);var r=e.entangledLanes;if(0!==r)for(e=e.entanglements,r&=t;0<r;){var a=31-ke(r),i=1<<a;t|=e[a],r&=~i}return wd=t,Cr(),n}function rc(e,t){Vi=null,O.H=hs,t===Qa||t===Za?(t=ii(),vd=3):t===Xa?(t=ii(),vd=4):vd=t===Ds?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,bd=t,null===gd&&(Sd=1,_s(e,Gr(t,e.current)))}function ac(){var e=Di.current;return null===e||((4194048&xd)===xd?null===Fi:((62914560&xd)===xd||0!==(536870912&xd))&&e===Fi)}function ic(){var e=O.H;return O.H=hs,null===e?hs:e}function oc(){var e=O.A;return O.A=pd,e}function sc(){Sd=4,kd||(4194048&xd)!==xd&&null!==Di.current||(yd=!0),0===(134217727&$d)&&0===(134217727&Nd)||null===hd||Zd(hd,xd,Ed,!1)}function lc(e,t,n){var r=fd;fd|=2;var a=ic(),i=oc();hd===e&&xd===t||(Pd=null,nc(e,t)),t=!1;var o=Sd;e:for(;;)try{if(0!==vd&&null!==gd){var s=gd,l=bd;switch(vd){case 8:tc(),o=6;break e;case 3:case 2:case 9:case 6:null===Di.current&&(t=!0);var d=vd;if(vd=0,bd=null,mc(e,s,l,d),n&&yd){o=0;break e}break;default:d=vd,vd=0,bd=null,mc(e,s,l,d)}}dc(),o=Sd;break}catch(c){rc(e,c)}return t&&e.shellSuspendCounter++,Sa=wa=null,fd=r,O.H=a,O.A=i,null===gd&&(hd=null,xd=0,Cr()),o}function dc(){for(;null!==gd;)uc(gd)}function cc(){for(;null!==gd&&!oe();)uc(gd)}function uc(e){var t=ol(e.alternate,e,wd);e.memoizedProps=e.pendingProps,null===t?fc(e):gd=t}function pc(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Hs(n,t,t.pendingProps,t.type,void 0,xd);break;case 11:t=Hs(n,t,t.pendingProps,t.type.render,t.ref,xd);break;case 5:oo(t);default:hl(n,t),t=ol(n,t=gd=Mr(t,wd),wd)}e.memoizedProps=e.pendingProps,null===t?fc(e):gd=t}function mc(e,t,n,r){Sa=wa=null,oo(t),si=null,li=0;var a=t.return;try{if(function(e,t,n,r,a){if(n.flags|=32768,null!==r&&"object"===typeof r&&"function"===typeof r.then){if(null!==(t=n.alternate)&&za(t,n,a,!0),null!==(n=Di.current)){switch(n.tag){case 31:case 13:return null===Fi?sc():null===n.alternate&&0===Sd&&(Sd=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ei?n.flags|=16384:(null===(t=n.updateQueue)?n.updateQueue=new Set([r]):t.add(r),$c(e,r,a)),!1;case 22:return n.flags|=65536,r===ei?n.flags|=16384:(null===(t=n.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):null===(n=t.retryQueue)?t.retryQueue=new Set([r]):n.add(r),$c(e,r,a)),!1}throw Error(o(435,n.tag))}return $c(e,r,a),sc(),!1}if(ua)return null!==(t=Di.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==fa&&ya(Gr(e=Error(o(422),{cause:r}),n))):(r!==fa&&ya(Gr(t=Error(o(423),{cause:r}),n)),(e=e.current.alternate).flags|=65536,a&=-a,e.lanes|=a,r=Gr(r,n),yi(e,a=zs(e.stateNode,r,a)),4!==Sd&&(Sd=2)),!1;var i=Error(o(520),{cause:r});if(i=Gr(i,n),null===Cd?Cd=[i]:Cd.push(i),4!==Sd&&(Sd=2),null===t)return!0;r=Gr(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,yi(n,e=zs(n.stateNode,r,e)),!1;case 1:if(t=n.type,i=n.stateNode,0===(128&n.flags)&&("function"===typeof t.getDerivedStateFromError||null!==i&&"function"===typeof i.componentDidCatch&&(null===Ld||!Ld.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,As(a=Cs(a),e,n,r),yi(n,a),!1}n=n.return}while(null!==n);return!1}(e,a,t,n,xd))return Sd=1,_s(e,Gr(n,e.current)),void(gd=null)}catch(i){if(null!==a)throw gd=a,i;return Sd=1,_s(e,Gr(n,e.current)),void(gd=null)}32768&t.flags?(ua||1===r?e=!0:yd||0!==(536870912&xd)?e=!1:(kd=e=!0,(2===r||9===r||3===r||6===r)&&(null!==(r=Di.current)&&13===r.tag&&(r.flags|=16384))),hc(t,e)):fc(t)}function fc(e){var t=e;do{if(0!==(32768&t.flags))return void hc(t,kd);e=t.return;var n=ml(t.alternate,t,wd);if(null!==n)return void(gd=n);if(null!==(t=t.sibling))return void(gd=t);gd=t=e}while(null!==t);0===Sd&&(Sd=5)}function hc(e,t){do{var n=fl(e.alternate,e);if(null!==n)return n.flags&=32767,void(gd=n);if(null!==(n=e.return)&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&null!==(e=e.sibling))return void(gd=e);gd=e=n}while(null!==e);Sd=6,gd=null}function gc(e,t,n,r,a,i,s,l,d){e.cancelPendingCommit=null;do{yc()}while(0!==Rd);if(0!==(6&fd))throw Error(o(327));if(null!==t){if(t===e.current)throw Error(o(177));if(i=t.lanes|t.childLanes,function(e,t,n,r,a,i){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,l=e.expirationTimes,d=e.hiddenUpdates;for(n=o&~n;0<n;){var c=31-ke(n),u=1<<c;s[c]=0,l[c]=-1;var p=d[c];if(null!==p)for(d[c]=null,c=0;c<p.length;c++){var m=p[c];null!==m&&(m.lane&=-536870913)}n&=~u}0!==r&&Fe(e,r,0),0!==i&&0===a&&0!==e.tag&&(e.suspendedLanes|=i&~(o&~t))}(e,n,i|=zr,s,l,d),e===hd&&(gd=hd=null,xd=0),Bd=t,Id=e,Md=n,Vd=i,Ud=a,Kd=r,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,ae(pe,function(){return jc(),null})):(e.callbackNode=null,e.callbackPriority=0),r=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||r){r=O.T,O.T=null,a=T.p,T.p=2,s=fd,fd|=4;try{!function(e,t){if(e=e.containerInfo,hu=kp,ar(e=rr(e))){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var a=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch(g){n=null;break e}var s=0,l=-1,d=-1,c=0,u=0,p=e,m=null;t:for(;;){for(var f;p!==n||0!==a&&3!==p.nodeType||(l=s+a),p!==i||0!==r&&3!==p.nodeType||(d=s+r),3===p.nodeType&&(s+=p.nodeValue.length),null!==(f=p.firstChild);)m=p,p=f;for(;;){if(p===e)break t;if(m===n&&++c===a&&(l=s),m===i&&++u===r&&(d=s),null!==(f=p.nextSibling))break;m=(p=m).parentNode}p=f}n=-1===l||-1===d?null:{start:l,end:d}}else n=null}n=n||{start:0,end:0}}else n=null;for(gu={focusedElem:e,selectionRange:n},kp=!1,Fl=t;null!==Fl;)if(e=(t=Fl).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Fl=e;else for(;null!==Fl;){switch(i=(t=Fl).alternate,e=t.flags,t.tag){case 0:if(0!==(4&e)&&null!==(e=null!==(e=t.updateQueue)?e.events:null))for(n=0;n<e.length;n++)(a=e[n]).ref.impl=a.nextImpl;break;case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==i){e=void 0,n=t,a=i.memoizedProps,i=i.memoizedState,r=n.stateNode;try{var h=ws(n.type,a);e=r.getSnapshotBeforeUpdate(h,i),r.__reactInternalSnapshotBeforeUpdate=e}catch(x){Sc(n,n.return,x)}}break;case 3:if(0!==(1024&e))if(9===(n=(e=t.stateNode.containerInfo).nodeType))Cu(e);else if(1===n)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Cu(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(o(163))}if(null!==(e=t.sibling)){e.return=t.return,Fl=e;break}Fl=t.return}}(e,t)}finally{fd=s,T.p=a,O.T=r}}Rd=1,xc(),vc(),bc()}}function xc(){if(1===Rd){Rd=0;var e=Id,t=Bd,n=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||n){n=O.T,O.T=null;var r=T.p;T.p=2;var a=fd;fd|=4;try{Hl(t,e);var i=gu,o=rr(e.containerInfo),s=i.focusedElem,l=i.selectionRange;if(o!==s&&s&&s.ownerDocument&&nr(s.ownerDocument.documentElement,s)){if(null!==l&&ar(s)){var d=l.start,c=l.end;if(void 0===c&&(c=d),"selectionStart"in s)s.selectionStart=d,s.selectionEnd=Math.min(c,s.value.length);else{var u=s.ownerDocument||document,p=u&&u.defaultView||window;if(p.getSelection){var m=p.getSelection(),f=s.textContent.length,h=Math.min(l.start,f),g=void 0===l.end?h:Math.min(l.end,f);!m.extend&&h>g&&(o=g,g=h,h=o);var x=tr(s,h),v=tr(s,g);if(x&&v&&(1!==m.rangeCount||m.anchorNode!==x.node||m.anchorOffset!==x.offset||m.focusNode!==v.node||m.focusOffset!==v.offset)){var b=u.createRange();b.setStart(x.node,x.offset),m.removeAllRanges(),h>g?(m.addRange(b),m.extend(v.node,v.offset)):(b.setEnd(v.node,v.offset),m.addRange(b))}}}}for(u=[],m=s;m=m.parentNode;)1===m.nodeType&&u.push({element:m,left:m.scrollLeft,top:m.scrollTop});for("function"===typeof s.focus&&s.focus(),s=0;s<u.length;s++){var k=u[s];k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}kp=!!hu,gu=hu=null}finally{fd=a,T.p=r,O.T=n}}e.current=t,Rd=2}}function vc(){if(2===Rd){Rd=0;var e=Id,t=Bd,n=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||n){n=O.T,O.T=null;var r=T.p;T.p=2;var a=fd;fd|=4;try{Ol(e,t.alternate,t)}finally{fd=a,T.p=r,O.T=n}}Rd=3}}function bc(){if(4===Rd||3===Rd){Rd=0,se();var e=Id,t=Bd,n=Md,r=Kd;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Rd=5:(Rd=0,Bd=Id=null,kc(e,e.pendingLanes));var a=e.pendingLanes;if(0===a&&(Ld=null),Le(n),t=t.stateNode,ve&&"function"===typeof ve.onCommitFiberRoot)try{ve.onCommitFiberRoot(xe,t,void 0,128===(128&t.current.flags))}catch(l){}if(null!==r){t=O.T,a=T.p,T.p=2,O.T=null;try{for(var i=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];i(s.value,{componentStack:s.stack})}}finally{O.T=t,T.p=a}}0!==(3&Md)&&yc(),Pc(e),a=e.pendingLanes,0!==(261930&n)&&0!==(42&a)?e===Wd?Hd++:(Hd=0,Wd=e):Hd=0,Lc(0,!1)}}function kc(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Ba(t)))}function yc(){return xc(),vc(),bc(),jc()}function jc(){if(5!==Rd)return!1;var e=Id,t=Vd;Vd=0;var n=Le(Md),r=O.T,a=T.p;try{T.p=32>n?32:n,O.T=null,n=Ud,Ud=null;var i=Id,s=Md;if(Rd=0,Bd=Id=null,Md=0,0!==(6&fd))throw Error(o(331));var l=fd;if(fd|=4,dd(i.current),td(i,i.current,s,n),fd=l,Lc(0,!1),ve&&"function"===typeof ve.onPostCommitFiberRoot)try{ve.onPostCommitFiberRoot(xe,i)}catch(d){}return!0}finally{T.p=a,O.T=r,kc(e,t)}}function wc(e,t,n){t=Gr(n,t),null!==(e=bi(e,t=zs(e.stateNode,t,2),2))&&(De(e,2),Pc(e))}function Sc(e,t,n){if(3===e.tag)wc(e,e,n);else for(;null!==t;){if(3===t.tag){wc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===Ld||!Ld.has(r))){e=Gr(n,e),null!==(r=bi(t,n=Cs(2),2))&&(As(n,r,t,e),De(r,2),Pc(r));break}}t=t.return}}function $c(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new md;var a=new Set;r.set(t,a)}else void 0===(a=r.get(t))&&(a=new Set,r.set(t,a));a.has(n)||(jd=!0,a.add(n),e=Nc.bind(null,e,t,n),t.then(e,e))}function Nc(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,hd===e&&(xd&n)===n&&(4===Sd||3===Sd&&(62914560&xd)===xd&&300>le()-Fd?0===(2&fd)&&nc(e,0):_d|=n,zd===xd&&(zd=0)),Pc(e)}function _c(e,t){0===t&&(t=Ce()),null!==(e=Fr(e,t))&&(De(e,t),Pc(e))}function Ec(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),_c(e,n)}function zc(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;null!==a&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(o(314))}null!==r&&r.delete(t),_c(e,n)}var Cc=null,Ac=null,Dc=!1,Fc=!1,Oc=!1,Tc=0;function Pc(e){e!==Ac&&null===e.next&&(null===Ac?Cc=Ac=e:Ac=Ac.next=e),Fc=!0,Dc||(Dc=!0,$u(function(){0!==(6&fd)?ae(ce,Rc):Ic()}))}function Lc(e,t){if(!Oc&&Fc){Oc=!0;do{for(var n=!1,r=Cc;null!==r;){if(!t)if(0!==e){var a=r.pendingLanes;if(0===a)var i=0;else{var o=r.suspendedLanes,s=r.pingedLanes;i=(1<<31-ke(42|e)+1)-1,i=201326741&(i&=a&~(o&~s))?201326741&i|1:i?2|i:0}0!==i&&(n=!0,Vc(r,i))}else i=xd,0===(3&(i=_e(r,r===hd?i:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||Ee(r,i)||(n=!0,Vc(r,i));r=r.next}}while(n);Oc=!1}}function Rc(){Ic()}function Ic(){Fc=Dc=!1;var e=0;0!==Tc&&function(){var e=window.event;if(e&&"popstate"===e.type)return e!==yu&&(yu=e,!0);return yu=null,!1}()&&(e=Tc);for(var t=le(),n=null,r=Cc;null!==r;){var a=r.next,i=Bc(r,t);0===i?(r.next=null,null===n?Cc=a:n.next=a,null===a&&(Ac=n)):(n=r,(0!==e||0!==(3&i))&&(Fc=!0)),r=a}0!==Rd&&5!==Rd||Lc(e,!1),0!==Tc&&(Tc=0)}function Bc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,i=-62914561&e.pendingLanes;0<i;){var o=31-ke(i),s=1<<o,l=a[o];-1===l?0!==(s&n)&&0===(s&r)||(a[o]=ze(s,t)):l<=t&&(e.expiredLanes|=s),i&=~s}if(n=xd,n=_e(e,e===(t=hd)?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===n||e===t&&(2===vd||9===vd)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&ie(r),e.callbackNode=null,e.callbackPriority=0;if(0===(3&n)||Ee(e,n)){if((t=n&-n)===e.callbackPriority)return t;switch(null!==r&&ie(r),Le(n)){case 2:case 8:n=ue;break;case 32:default:n=pe;break;case 268435456:n=fe}return r=Mc.bind(null,e),n=ae(n,r),e.callbackPriority=t,e.callbackNode=n,t}return null!==r&&null!==r&&ie(r),e.callbackPriority=2,e.callbackNode=null,2}function Mc(e,t){if(0!==Rd&&5!==Rd)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(yc()&&e.callbackNode!==n)return null;var r=xd;return 0===(r=_e(e,e===hd?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Jd(e,r,t),Bc(e,le()),null!=e.callbackNode&&e.callbackNode===n?Mc.bind(null,e):null)}function Vc(e,t){if(yc())return null;Jd(e,t,!0)}function Uc(){if(0===Tc){var e=Ua;0===e&&(e=we,0===(261888&(we<<=1))&&(we=256)),Tc=e}return Tc}function Kc(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:At(""+e)}function Hc(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}for(var Wc=0;Wc<Sr.length;Wc++){var qc=Sr[Wc];$r(qc.toLowerCase(),"on"+(qc[0].toUpperCase()+qc.slice(1)))}$r(gr,"onAnimationEnd"),$r(xr,"onAnimationIteration"),$r(vr,"onAnimationStart"),$r("dblclick","onDoubleClick"),$r("focusin","onFocus"),$r("focusout","onBlur"),$r(br,"onTransitionRun"),$r(kr,"onTransitionStart"),$r(yr,"onTransitionCancel"),$r(jr,"onTransitionEnd"),at("onMouseEnter",["mouseout","mouseover"]),at("onMouseLeave",["mouseout","mouseover"]),at("onPointerEnter",["pointerout","pointerover"]),at("onPointerLeave",["pointerout","pointerover"]),rt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),rt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),rt("onBeforeInput",["compositionend","keypress","textInput","paste"]),rt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Gc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Yc=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Gc));function Jc(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],l=s.instance,d=s.currentTarget;if(s=s.listener,l!==i&&a.isPropagationStopped())break e;i=s,a.currentTarget=d;try{i(a)}catch(c){Nr(c)}a.currentTarget=null,i=l}else for(o=0;o<r.length;o++){if(l=(s=r[o]).instance,d=s.currentTarget,s=s.listener,l!==i&&a.isPropagationStopped())break e;i=s,a.currentTarget=d;try{i(a)}catch(c){Nr(c)}a.currentTarget=null,i=l}}}}function Qc(e,t){var n=t[Ke];void 0===n&&(n=t[Ke]=new Set);var r=e+"__bubble";n.has(r)||(tu(t,e,2,!1),n.add(r))}function Xc(e,t,n){var r=0;t&&(r|=4),tu(n,e,r,t)}var Zc="_reactListening"+Math.random().toString(36).slice(2);function eu(e){if(!e[Zc]){e[Zc]=!0,tt.forEach(function(t){"selectionchange"!==t&&(Yc.has(t)||Xc(t,!1,e),Xc(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Zc]||(t[Zc]=!0,Xc("selectionchange",!1,t))}}function tu(e,t,n,r){switch(_p(t)){case 2:var a=yp;break;case 8:a=jp;break;default:a=wp}n=a.bind(null,t,n,e),a=void 0,!Vt||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),r?void 0!==a?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):void 0!==a?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function nu(e,t,n,r,a){var i=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var o=r.tag;if(3===o||4===o){var s=r.stateNode.containerInfo;if(s===a)break;if(4===o)for(o=r.return;null!==o;){var d=o.tag;if((3===d||4===d)&&o.stateNode.containerInfo===a)return;o=o.return}for(;null!==s;){if(null===(o=Je(s)))return;if(5===(d=o.tag)||6===d||26===d||27===d){r=i=o;continue e}s=s.parentNode}}r=r.return}It(function(){var r=i,a=Ot(n),o=[];e:{var s=wr.get(e);if(void 0!==s){var d=nn,c=e;switch(e){case"keypress":if(0===Gt(n))break e;case"keydown":case"keyup":d=vn;break;case"focusin":c="focus",d=dn;break;case"focusout":c="blur",d=dn;break;case"beforeblur":case"afterblur":d=dn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=sn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=ln;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=kn;break;case gr:case xr:case vr:d=cn;break;case jr:d=yn;break;case"scroll":case"scrollend":d=an;break;case"wheel":d=jn;break;case"copy":case"cut":case"paste":d=un;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=bn;break;case"toggle":case"beforetoggle":d=wn}var u=0!==(4&t),p=!u&&("scroll"===e||"scrollend"===e),m=u?null!==s?s+"Capture":null:s;u=[];for(var f,h=r;null!==h;){var g=h;if(f=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===f||null===m||null!=(g=Bt(h,m))&&u.push(ru(h,g,f)),p)break;h=h.return}0<u.length&&(s=new d(s,c,null,n,a),o.push({event:s,listeners:u}))}}if(0===(7&t)){if(d="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||n===Ft||!(c=n.relatedTarget||n.fromElement)||!Je(c)&&!c[Ue])&&(d||s)&&(s=a.window===a?a:(s=a.ownerDocument)?s.defaultView||s.parentWindow:window,d?(d=r,null!==(c=(c=n.relatedTarget||n.toElement)?Je(c):null)&&(p=l(c),u=c.tag,c!==p||5!==u&&27!==u&&6!==u)&&(c=null)):(d=null,c=r),d!==c)){if(u=sn,g="onMouseLeave",m="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(u=bn,g="onPointerLeave",m="onPointerEnter",h="pointer"),p=null==d?s:Xe(d),f=null==c?s:Xe(c),(s=new u(g,h+"leave",d,n,a)).target=p,s.relatedTarget=f,g=null,Je(a)===r&&((u=new u(m,h+"enter",c,n,a)).target=f,u.relatedTarget=p,g=u),p=g,d&&c)e:{for(u=iu,h=c,f=0,g=m=d;g;g=u(g))f++;g=0;for(var x=h;x;x=u(x))g++;for(;0<f-g;)m=u(m),f--;for(;0<g-f;)h=u(h),g--;for(;f--;){if(m===h||null!==h&&m===h.alternate){u=m;break e}m=u(m),h=u(h)}u=null}else u=null;null!==d&&ou(o,s,d,u,!1),null!==c&&null!==p&&ou(o,p,c,u,!0)}if("select"===(d=(s=r?Xe(r):window).nodeName&&s.nodeName.toLowerCase())||"input"===d&&"file"===s.type)var v=Mn;else if(Tn(s))if(Vn)v=Qn;else{v=Yn;var b=Gn}else!(d=s.nodeName)||"input"!==d.toLowerCase()||"checkbox"!==s.type&&"radio"!==s.type?r&&Et(r.elementType)&&(v=Mn):v=Jn;switch(v&&(v=v(e,r))?Pn(o,v,n,a):(b&&b(e,s,r),"focusout"===e&&r&&"number"===s.type&&null!=r.memoizedProps.value&&kt(s,"number",s.value)),b=r?Xe(r):window,e){case"focusin":(Tn(b)||"true"===b.contentEditable)&&(or=b,sr=r,lr=null);break;case"focusout":lr=sr=or=null;break;case"mousedown":dr=!0;break;case"contextmenu":case"mouseup":case"dragend":dr=!1,cr(o,n,a);break;case"selectionchange":if(ir)break;case"keydown":case"keyup":cr(o,n,a)}var k;if($n)e:{switch(e){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Fn?An(e,n)&&(y="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(y="onCompositionStart");y&&(En&&"ko"!==n.locale&&(Fn||"onCompositionStart"!==y?"onCompositionEnd"===y&&Fn&&(k=qt()):(Ht="value"in(Kt=a)?Kt.value:Kt.textContent,Fn=!0)),0<(b=au(r,y)).length&&(y=new pn(y,e,null,n,a),o.push({event:y,listeners:b}),k?y.data=k:null!==(k=Dn(n))&&(y.data=k))),(k=_n?function(e,t){switch(e){case"compositionend":return Dn(t);case"keypress":return 32!==t.which?null:(Cn=!0,zn);case"textInput":return(e=t.data)===zn&&Cn?null:e;default:return null}}(e,n):function(e,t){if(Fn)return"compositionend"===e||!$n&&An(e,t)?(e=qt(),Wt=Ht=Kt=null,Fn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return En&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(y=au(r,"onBeforeInput")).length&&(b=new pn("onBeforeInput","beforeinput",null,n,a),o.push({event:b,listeners:y}),b.data=k)),function(e,t,n,r,a){if("submit"===t&&n&&n.stateNode===a){var i=Kc((a[Ve]||null).action),o=r.submitter;o&&null!==(t=(t=o[Ve]||null)?Kc(t.formAction):o.getAttribute("formAction"))&&(i=t,o=null);var s=new nn("action","action",null,r,a);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==Tc){var e=o?Hc(a,o):new FormData(a);ts(n,{pending:!0,data:e,method:a.method,action:i},null,e)}}else"function"===typeof i&&(s.preventDefault(),e=o?Hc(a,o):new FormData(a),ts(n,{pending:!0,data:e,method:a.method,action:i},i,e))},currentTarget:a}]})}}(o,e,r,n,a)}Jc(o,t)})}function ru(e,t,n){return{instance:e,listener:t,currentTarget:n}}function au(e,t){for(var n=t+"Capture",r=[];null!==e;){var a=e,i=a.stateNode;if(5!==(a=a.tag)&&26!==a&&27!==a||null===i||(null!=(a=Bt(e,n))&&r.unshift(ru(e,a,i)),null!=(a=Bt(e,t))&&r.push(ru(e,a,i))),3===e.tag)return r;e=e.return}return[]}function iu(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function ou(e,t,n,r,a){for(var i=t._reactName,o=[];null!==n&&n!==r;){var s=n,l=s.alternate,d=s.stateNode;if(s=s.tag,null!==l&&l===r)break;5!==s&&26!==s&&27!==s||null===d||(l=d,a?null!=(d=Bt(n,i))&&o.unshift(ru(n,d,l)):a||null!=(d=Bt(n,i))&&o.push(ru(n,d,l))),n=n.return}0!==o.length&&e.push({event:t,listeners:o})}var su=/\r\n?/g,lu=/\u0000|\uFFFD/g;function du(e){return("string"===typeof e?e:""+e).replace(su,"\n").replace(lu,"")}function cu(e,t){return t=du(t),du(e)===t}function uu(e,t,n,r,a,i){switch(n){case"children":"string"===typeof r?"body"===t||"textarea"===t&&""===r||St(e,r):("number"===typeof r||"bigint"===typeof r)&&"body"!==t&&St(e,""+r);break;case"className":dt(e,"class",r);break;case"tabIndex":dt(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":dt(e,n,r);break;case"style":_t(e,r,i);break;case"data":if("object"!==t){dt(e,"data",r);break}case"src":case"href":if(""===r&&("a"!==t||"href"!==n)){e.removeAttribute(n);break}if(null==r||"function"===typeof r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=At(""+r),e.setAttribute(n,r);break;case"action":case"formAction":if("function"===typeof r){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof i&&("formAction"===n?("input"!==t&&uu(e,t,"name",a.name,a,null),uu(e,t,"formEncType",a.formEncType,a,null),uu(e,t,"formMethod",a.formMethod,a,null),uu(e,t,"formTarget",a.formTarget,a,null)):(uu(e,t,"encType",a.encType,a,null),uu(e,t,"method",a.method,a,null),uu(e,t,"target",a.target,a,null))),null==r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=At(""+r),e.setAttribute(n,r);break;case"onClick":null!=r&&(e.onclick=Dt);break;case"onScroll":null!=r&&Qc("scroll",e);break;case"onScrollEnd":null!=r&&Qc("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(o(61));if(null!=(n=r.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=n}}break;case"multiple":e.multiple=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"muted":e.muted=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==r||"function"===typeof r||"boolean"===typeof r||"symbol"===typeof r){e.removeAttribute("xlink:href");break}n=At(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""+r):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":!0===r?e.setAttribute(n,""):!1!==r&&null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,r):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":null!=r&&"function"!==typeof r&&"symbol"!==typeof r&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case"rowSpan":case"start":null==r||"function"===typeof r||"symbol"===typeof r||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case"popover":Qc("beforetoggle",e),Qc("toggle",e),lt(e,"popover",r);break;case"xlinkActuate":ct(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":ct(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":ct(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":ct(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":ct(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":ct(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":ct(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":ct(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":ct(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":lt(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&lt(e,n=zt.get(n)||n,r)}}function pu(e,t,n,r,a,i){switch(n){case"style":_t(e,r,i);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(o(61));if(null!=(n=r.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=n}}break;case"children":"string"===typeof r?St(e,r):("number"===typeof r||"bigint"===typeof r)&&St(e,""+r);break;case"onScroll":null!=r&&Qc("scroll",e);break;case"onScrollEnd":null!=r&&Qc("scrollend",e);break;case"onClick":null!=r&&(e.onclick=Dt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:nt.hasOwnProperty(n)||("o"!==n[0]||"n"!==n[1]||(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),"function"===typeof(i=null!=(i=e[Ve]||null)?i[n]:null)&&e.removeEventListener(t,i,a),"function"!==typeof r)?n in e?e[n]=r:!0===r?e.setAttribute(n,""):lt(e,n,r):("function"!==typeof i&&null!==i&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a)))}}function mu(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Qc("error",e),Qc("load",e);var r,a=!1,i=!1;for(r in n)if(n.hasOwnProperty(r)){var s=n[r];if(null!=s)switch(r){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,r,s,n,null)}}return i&&uu(e,t,"srcSet",n.srcSet,n,null),void(a&&uu(e,t,"src",n.src,n,null));case"input":Qc("invalid",e);var l=r=s=i=null,d=null,c=null;for(a in n)if(n.hasOwnProperty(a)){var u=n[a];if(null!=u)switch(a){case"name":i=u;break;case"type":s=u;break;case"checked":d=u;break;case"defaultChecked":c=u;break;case"value":r=u;break;case"defaultValue":l=u;break;case"children":case"dangerouslySetInnerHTML":if(null!=u)throw Error(o(137,t));break;default:uu(e,t,a,u,n,null)}}return void bt(e,r,l,d,c,s,i,!1);case"select":for(i in Qc("invalid",e),a=s=r=null,n)if(n.hasOwnProperty(i)&&null!=(l=n[i]))switch(i){case"value":r=l;break;case"defaultValue":s=l;break;case"multiple":a=l;default:uu(e,t,i,l,n,null)}return t=r,n=s,e.multiple=!!a,void(null!=t?yt(e,!!a,t,!1):null!=n&&yt(e,!!a,n,!0));case"textarea":for(s in Qc("invalid",e),r=i=a=null,n)if(n.hasOwnProperty(s)&&null!=(l=n[s]))switch(s){case"value":a=l;break;case"defaultValue":i=l;break;case"children":r=l;break;case"dangerouslySetInnerHTML":if(null!=l)throw Error(o(91));break;default:uu(e,t,s,l,n,null)}return void wt(e,a,i,r);case"option":for(d in n)if(n.hasOwnProperty(d)&&null!=(a=n[d]))if("selected"===d)e.selected=a&&"function"!==typeof a&&"symbol"!==typeof a;else uu(e,t,d,a,n,null);return;case"dialog":Qc("beforetoggle",e),Qc("toggle",e),Qc("cancel",e),Qc("close",e);break;case"iframe":case"object":Qc("load",e);break;case"video":case"audio":for(a=0;a<Gc.length;a++)Qc(Gc[a],e);break;case"image":Qc("error",e),Qc("load",e);break;case"details":Qc("toggle",e);break;case"embed":case"source":case"link":Qc("error",e),Qc("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&null!=(a=n[c]))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,c,a,n,null)}return;default:if(Et(t)){for(u in n)n.hasOwnProperty(u)&&(void 0!==(a=n[u])&&pu(e,t,u,a,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(null!=(a=n[l])&&uu(e,t,l,a,n,null))}function fu(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}var hu=null,gu=null;function xu(e){return 9===e.nodeType?e:e.ownerDocument}function vu(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function bu(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function ku(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var yu=null;var ju="function"===typeof setTimeout?setTimeout:void 0,wu="function"===typeof clearTimeout?clearTimeout:void 0,Su="function"===typeof Promise?Promise:void 0,$u="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Su?function(e){return Su.resolve(null).then(e).catch(Nu)}:ju;function Nu(e){setTimeout(function(){throw e})}function _u(e){return"head"===e}function Eu(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&8===a.nodeType)if("/$"===(n=a.data)||"/&"===n){if(0===r)return e.removeChild(a),void Hp(t);r--}else if("$"===n||"$?"===n||"$~"===n||"$!"===n||"&"===n)r++;else if("html"===n)Iu(e.ownerDocument.documentElement);else if("head"===n){Iu(n=e.ownerDocument.head);for(var i=n.firstChild;i;){var o=i.nextSibling,s=i.nodeName;i[Ge]||"SCRIPT"===s||"STYLE"===s||"LINK"===s&&"stylesheet"===i.rel.toLowerCase()||n.removeChild(i),i=o}}else"body"===n&&Iu(e.ownerDocument.body);n=a}while(n);Hp(t)}function zu(e,t){var n=e;e=0;do{var r=n.nextSibling;if(1===n.nodeType?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",""===n.getAttribute("style")&&n.removeAttribute("style")):3===n.nodeType&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),r&&8===r.nodeType)if("/$"===(n=r.data)){if(0===e)break;e--}else"$"!==n&&"$?"!==n&&"$~"!==n&&"$!"!==n||e++;n=r}while(n)}function Cu(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Cu(n),Ye(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===n.rel.toLowerCase())continue}e.removeChild(n)}}function Au(e,t){for(;8!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null;if(null===(e=Ou(e.nextSibling)))return null}return e}function Du(e){return"$?"===e.data||"$~"===e.data}function Fu(e){return"$!"===e.data||"$?"===e.data&&"loading"!==e.ownerDocument.readyState}function Ou(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"$~"===t||"&"===t||"F!"===t||"F"===t)break;if("/$"===t||"/&"===t)return null}}return e}var Tu=null;function Pu(e){e=e.nextSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n||"/&"===n){if(0===t)return Ou(e.nextSibling);t--}else"$"!==n&&"$!"!==n&&"$?"!==n&&"$~"!==n&&"&"!==n||t++}e=e.nextSibling}return null}function Lu(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n||"$~"===n||"&"===n){if(0===t)return e;t--}else"/$"!==n&&"/&"!==n||t++}e=e.previousSibling}return null}function Ru(e,t,n){switch(t=xu(n),e){case"html":if(!(e=t.documentElement))throw Error(o(452));return e;case"head":if(!(e=t.head))throw Error(o(453));return e;case"body":if(!(e=t.body))throw Error(o(454));return e;default:throw Error(o(451))}}function Iu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ye(e)}var Bu=new Map,Mu=new Set;function Vu(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Uu=T.d;T.d={f:function(){var e=Uu.f(),t=ec();return e||t},r:function(e){var t=Qe(e);null!==t&&5===t.tag&&"form"===t.type?rs(t):Uu.r(e)},D:function(e){Uu.D(e),Hu("dns-prefetch",e,null)},C:function(e,t){Uu.C(e,t),Hu("preconnect",e,t)},L:function(e,t,n){Uu.L(e,t,n);var r=Ku;if(r&&e&&t){var a='link[rel="preload"][as="'+xt(t)+'"]';"image"===t&&n&&n.imageSrcSet?(a+='[imagesrcset="'+xt(n.imageSrcSet)+'"]',"string"===typeof n.imageSizes&&(a+='[imagesizes="'+xt(n.imageSizes)+'"]')):a+='[href="'+xt(e)+'"]';var i=a;switch(t){case"style":i=qu(e);break;case"script":i=Ju(e)}Bu.has(i)||(e=m({rel:"preload",href:"image"===t&&n&&n.imageSrcSet?void 0:e,as:t},n),Bu.set(i,e),null!==r.querySelector(a)||"style"===t&&r.querySelector(Gu(i))||"script"===t&&r.querySelector(Qu(i))||(mu(t=r.createElement("link"),"link",e),et(t),r.head.appendChild(t)))}},m:function(e,t){Uu.m(e,t);var n=Ku;if(n&&e){var r=t&&"string"===typeof t.as?t.as:"script",a='link[rel="modulepreload"][as="'+xt(r)+'"][href="'+xt(e)+'"]',i=a;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ju(e)}if(!Bu.has(i)&&(e=m({rel:"modulepreload",href:e},t),Bu.set(i,e),null===n.querySelector(a))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Qu(i)))return}mu(r=n.createElement("link"),"link",e),et(r),n.head.appendChild(r)}}},X:function(e,t){Uu.X(e,t);var n=Ku;if(n&&e){var r=Ze(n).hoistableScripts,a=Ju(e),i=r.get(a);i||((i=n.querySelector(Qu(a)))||(e=m({src:e,async:!0},t),(t=Bu.get(a))&&tp(e,t),et(i=n.createElement("script")),mu(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(a,i))}},S:function(e,t,n){Uu.S(e,t,n);var r=Ku;if(r&&e){var a=Ze(r).hoistableStyles,i=qu(e);t=t||"default";var o=a.get(i);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Gu(i)))s.loading=5;else{e=m({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Bu.get(i))&&ep(e,n);var l=o=r.createElement("link");et(l),mu(l,"link",e),l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),l.addEventListener("load",function(){s.loading|=1}),l.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Zu(o,t,r)}o={type:"stylesheet",instance:o,count:1,state:s},a.set(i,o)}}},M:function(e,t){Uu.M(e,t);var n=Ku;if(n&&e){var r=Ze(n).hoistableScripts,a=Ju(e),i=r.get(a);i||((i=n.querySelector(Qu(a)))||(e=m({src:e,async:!0,type:"module"},t),(t=Bu.get(a))&&tp(e,t),et(i=n.createElement("script")),mu(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(a,i))}}};var Ku="undefined"===typeof document?null:document;function Hu(e,t,n){var r=Ku;if(r&&"string"===typeof t&&t){var a=xt(t);a='link[rel="'+e+'"][href="'+a+'"]',"string"===typeof n&&(a+='[crossorigin="'+n+'"]'),Mu.has(a)||(Mu.add(a),e={rel:e,crossOrigin:n,href:t},null===r.querySelector(a)&&(mu(t=r.createElement("link"),"link",e),et(t),r.head.appendChild(t)))}}function Wu(e,t,n,r){var a,i,s,l,d=(d=W.current)?Vu(d):null;if(!d)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof n.precedence&&"string"===typeof n.href?(t=qu(n.href),(r=(n=Ze(d).hoistableStyles).get(t))||(r={type:"style",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===n.rel&&"string"===typeof n.href&&"string"===typeof n.precedence){e=qu(n.href);var c=Ze(d).hoistableStyles,u=c.get(e);if(u||(d=d.ownerDocument||d,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,u),(c=d.querySelector(Gu(e)))&&!c._p&&(u.instance=c,u.state.loading=5),Bu.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Bu.set(e,n),c||(a=d,i=e,s=n,l=u.state,a.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=a.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),mu(i,"link",s),et(i),a.head.appendChild(i))))),t&&null===r)throw Error(o(528,""));return u}if(t&&null!==r)throw Error(o(529,""));return null;case"script":return t=n.async,"string"===typeof(n=n.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Ju(n),(r=(n=Ze(d).hoistableScripts).get(t))||(r={type:"script",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function qu(e){return'href="'+xt(e)+'"'}function Gu(e){return'link[rel="stylesheet"]['+e+"]"}function Yu(e){return m({},e,{"data-precedence":e.precedence,precedence:null})}function Ju(e){return'[src="'+xt(e)+'"]'}function Qu(e){return"script[async]"+e}function Xu(e,t,n){if(t.count++,null===t.instance)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+xt(n.href)+'"]');if(r)return t.instance=r,et(r),r;var a=m({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return et(r=(e.ownerDocument||e).createElement("style")),mu(r,"style",a),Zu(r,n.precedence,e),t.instance=r;case"stylesheet":a=qu(n.href);var i=e.querySelector(Gu(a));if(i)return t.state.loading|=4,t.instance=i,et(i),i;r=Yu(n),(a=Bu.get(a))&&ep(r,a),et(i=(e.ownerDocument||e).createElement("link"));var s=i;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),mu(i,"link",r),t.state.loading|=4,Zu(i,n.precedence,e),t.instance=i;case"script":return i=Ju(n.src),(a=e.querySelector(Qu(i)))?(t.instance=a,et(a),a):(r=n,(a=Bu.get(i))&&tp(r=m({},n),a),et(a=(e=e.ownerDocument||e).createElement("script")),mu(a,"link",r),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(o(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(r=t.instance,t.state.loading|=4,Zu(r,n.precedence,e));return t.instance}function Zu(e,t,n){for(var r=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=r.length?r[r.length-1]:null,i=a,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)i=s;else if(i!==a)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=9===n.nodeType?n.head:n).insertBefore(e,t.firstChild)}function ep(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function tp(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var np=null;function rp(e,t,n){if(null===np){var r=new Map,a=np=new Map;a.set(n,r)}else(r=(a=np).get(n))||(r=new Map,a.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var i=n[a];if(!(i[Ge]||i[Me]||"link"===e&&"stylesheet"===i.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==i.namespaceURI){var o=i.getAttribute(t)||"";o=e+o;var s=r.get(o);s?s.push(i):r.set(o,[i])}}return r}function ap(e,t,n){(e=e.ownerDocument||e).head.insertBefore(n,"title"===t?e.querySelector("head > title"):null)}function ip(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var op=0;function sp(){if(this.count--,0===this.count&&(0===this.imgCount||!this.waitingForImages))if(this.stylesheets)dp(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var lp=null;function dp(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,lp=new Map,t.forEach(cp,e),lp=null,sp.call(e))}function cp(e,t){if(!(4&t.state.loading)){var n=lp.get(e);if(n)var r=n.get(null);else{n=new Map,lp.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var o=a[i];"LINK"!==o.nodeName&&"not all"===o.getAttribute("media")||(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}o=(a=t.instance).getAttribute("data-precedence"),(i=n.get(o)||r)===r&&n.set(null,a),n.set(o,a),this.count++,r=sp.bind(this),a.addEventListener("load",r),a.addEventListener("error",r),i?i.parentNode.insertBefore(a,i.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(a,e.firstChild),t.state.loading|=4}}var up={$$typeof:y,Provider:null,Consumer:null,_currentValue:P,_currentValue2:P,_threadCount:0};function pp(e,t,n,r,a,i,o,s,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=r,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function mp(e,t,n,r,a,i,o,s,l,d,c,u){return e=new pp(e,t,n,o,l,d,c,u,s),t=1,!0===i&&(t|=24),i=Rr(3,null,null,t),e.current=i,i.stateNode=e,(t=Ia()).refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:r,isDehydrated:n,cache:t},gi(i),e}function fp(e){return e?e=Pr:Pr}function hp(e,t,n,r,a,i){a=fp(a),null===r.context?r.context=a:r.pendingContext=a,(r=vi(t)).payload={element:n},null!==(i=void 0===i?null:i)&&(r.callback=i),null!==(n=bi(e,r,t))&&(Yd(n,0,t),ki(n,e,t))}function gp(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function xp(e,t){gp(e,t),(e=e.alternate)&&gp(e,t)}function vp(e){if(13===e.tag||31===e.tag){var t=Fr(e,67108864);null!==t&&Yd(t,0,67108864),xp(e,67108864)}}function bp(e){if(13===e.tag||31===e.tag){var t=qd(),n=Fr(e,t=Pe(t));null!==n&&Yd(n,0,t),xp(e,t)}}var kp=!0;function yp(e,t,n,r){var a=O.T;O.T=null;var i=T.p;try{T.p=2,wp(e,t,n,r)}finally{T.p=i,O.T=a}}function jp(e,t,n,r){var a=O.T;O.T=null;var i=T.p;try{T.p=8,wp(e,t,n,r)}finally{T.p=i,O.T=a}}function wp(e,t,n,r){if(kp){var a=Sp(r);if(null===a)nu(e,t,r,$p,n),Pp(e,r);else if(function(e,t,n,r,a){switch(t){case"focusin":return zp=Lp(zp,e,t,n,r,a),!0;case"dragenter":return Cp=Lp(Cp,e,t,n,r,a),!0;case"mouseover":return Ap=Lp(Ap,e,t,n,r,a),!0;case"pointerover":var i=a.pointerId;return Dp.set(i,Lp(Dp.get(i)||null,e,t,n,r,a)),!0;case"gotpointercapture":return i=a.pointerId,Fp.set(i,Lp(Fp.get(i)||null,e,t,n,r,a)),!0}return!1}(a,e,t,n,r))r.stopPropagation();else if(Pp(e,r),4&t&&-1<Tp.indexOf(e)){for(;null!==a;){var i=Qe(a);if(null!==i)switch(i.tag){case 3:if((i=i.stateNode).current.memoizedState.isDehydrated){var o=Ne(i.pendingLanes);if(0!==o){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var l=1<<31-ke(o);s.entanglements[1]|=l,o&=~l}Pc(i),0===(6&fd)&&(Td=le()+500,Lc(0,!1))}}break;case 31:case 13:null!==(s=Fr(i,2))&&Yd(s,0,2),ec(),xp(i,2)}if(null===(i=Sp(r))&&nu(e,t,r,$p,n),i===a)break;a=i}null!==a&&r.stopPropagation()}else nu(e,t,r,null,n)}}function Sp(e){return Np(e=Ot(e))}var $p=null;function Np(e){if($p=null,null!==(e=Je(e))){var t=l(e);if(null===t)e=null;else{var n=t.tag;if(13===n){if(null!==(e=d(t)))return e;e=null}else if(31===n){if(null!==(e=c(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return $p=e,null}function _p(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(de()){case ce:return 2;case ue:return 8;case pe:case me:return 32;case fe:return 268435456;default:return 32}default:return 32}}var Ep=!1,zp=null,Cp=null,Ap=null,Dp=new Map,Fp=new Map,Op=[],Tp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Pp(e,t){switch(e){case"focusin":case"focusout":zp=null;break;case"dragenter":case"dragleave":Cp=null;break;case"mouseover":case"mouseout":Ap=null;break;case"pointerover":case"pointerout":Dp.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fp.delete(t.pointerId)}}function Lp(e,t,n,r,a,i){return null===e||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[a]},null!==t&&(null!==(t=Qe(t))&&vp(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function Rp(e){var t=Je(e.target);if(null!==t){var n=l(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=d(n)))return e.blockedOn=t,void Ie(e.priority,function(){bp(n)})}else if(31===t){if(null!==(t=c(n)))return e.blockedOn=t,void Ie(e.priority,function(){bp(n)})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Ip(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Sp(e.nativeEvent);if(null!==n)return null!==(t=Qe(n))&&vp(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);Ft=r,n.target.dispatchEvent(r),Ft=null,t.shift()}return!0}function Bp(e,t,n){Ip(e)&&n.delete(t)}function Mp(){Ep=!1,null!==zp&&Ip(zp)&&(zp=null),null!==Cp&&Ip(Cp)&&(Cp=null),null!==Ap&&Ip(Ap)&&(Ap=null),Dp.forEach(Bp),Fp.forEach(Bp)}function Vp(e,t){e.blockedOn===t&&(e.blockedOn=null,Ep||(Ep=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Mp)))}var Up=null;function Kp(e){Up!==e&&(Up=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Up===e&&(Up=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],a=e[t+2];if("function"!==typeof r){if(null===Np(r||n))continue;break}var i=Qe(n);null!==i&&(e.splice(t,3),t-=3,ts(i,{pending:!0,data:a,method:n.method,action:r},r,a))}}))}function Hp(e){function t(t){return Vp(t,e)}null!==zp&&Vp(zp,e),null!==Cp&&Vp(Cp,e),null!==Ap&&Vp(Ap,e),Dp.forEach(t),Fp.forEach(t);for(var n=0;n<Op.length;n++){var r=Op[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Op.length&&null===(n=Op[0]).blockedOn;)Rp(n),null===n.blockedOn&&Op.shift();if(null!=(n=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<n.length;r+=3){var a=n[r],i=n[r+1],o=a[Ve]||null;if("function"===typeof i)o||Kp(n);else if(o){var s=null;if(i&&i.hasAttribute("formAction")){if(a=i,o=i[Ve]||null)s=o.formAction;else if(null!==Np(a))continue}else s=o.action;"function"===typeof s?n[r+1]=s:(n.splice(r,3),r-=3),Kp(n)}}}function Wp(){function e(e){e.canIntercept&&"react-transition"===e.info&&e.intercept({handler:function(){return new Promise(function(e){return a=e})},focusReset:"manual",scroll:"manual"})}function t(){null!==a&&(a(),a=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&null!=e.url&&navigation.navigate(e.url,{state:e.getState(),info:"react-transition",history:"replace"})}}if("object"===typeof navigation){var r=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),null!==a&&(a(),a=null)}}}function qp(e){this._internalRoot=e}function Gp(e){this._internalRoot=e}Gp.prototype.render=qp.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(o(409));hp(t.current,qd(),e,t,null,null)},Gp.prototype.unmount=qp.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;hp(e.current,2,null,e,null,null),ec(),t[Ue]=null}},Gp.prototype.unstable_scheduleHydration=function(e){if(e){var t=Re();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Op.length&&0!==t&&t<Op[n].priority;n++);Op.splice(n,0,e),0===n&&Rp(e)}};var Yp=a.version;if("19.2.4"!==Yp)throw Error(o(527,Yp,"19.2.4"));T.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(o(188));throw e=Object.keys(e).join(","),Error(o(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=l(e)))throw Error(o(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(null===a)break;var i=a.alternate;if(null===i){if(null!==(r=a.return)){n=r;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return u(a),e;if(i===r)return u(a),t;i=i.sibling}throw Error(o(188))}if(n.return!==r.return)n=a,r=i;else{for(var s=!1,d=a.child;d;){if(d===n){s=!0,n=a,r=i;break}if(d===r){s=!0,r=a,n=i;break}d=d.sibling}if(!s){for(d=i.child;d;){if(d===n){s=!0,n=i,r=a;break}if(d===r){s=!0,r=i,n=a;break}d=d.sibling}if(!s)throw Error(o(189))}}if(n.alternate!==r)throw Error(o(190))}if(3!==n.tag)throw Error(o(188));return n.stateNode.current===n?e:t}(t),e=null===(e=null!==e?p(e):null)?null:e.stateNode};var Jp={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.4"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Qp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Qp.isDisabled&&Qp.supportsFiber)try{xe=Qp.inject(Jp),ve=Qp}catch(Zp){}}t.createRoot=function(e,t){if(!s(e))throw Error(o(299));var n=!1,r="",a=Ss,i=$s,l=Ns;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onUncaughtError&&(a=t.onUncaughtError),void 0!==t.onCaughtError&&(i=t.onCaughtError),void 0!==t.onRecoverableError&&(l=t.onRecoverableError)),t=mp(e,1,!1,null,0,n,r,null,a,i,l,Wp),e[Ue]=t.current,eu(e),new qp(t)}},672(e,t,n){var r=n(43);function a(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var o={d:{f:i,r:function(){throw Error(a(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},s=Symbol.for("react.portal");var l=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(a(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:s,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.flushSync=function(e){var t=l.T,n=o.p;try{if(l.T=null,o.p=2,e)return e()}finally{l.T=t,o.p=n,o.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,o.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&o.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var n=t.as,r=d(n,t.crossOrigin),a="string"===typeof t.integrity?t.integrity:void 0,i="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?o.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:i}):"script"===n&&o.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:i,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=d(t.as,t.crossOrigin);o.d.M(e,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&o.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var n=t.as,r=d(n,t.crossOrigin);o.d.L(e,n,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var n=d(t.as,t.crossOrigin);o.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else o.d.m(e)},t.requestFormReset=function(e){o.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},t.useFormStatus=function(){return l.H.useHostTransitionStatus()},t.version="19.2.4"},391(e,t,n){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(4)},950(e,t,n){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(672)},799(e,t){var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function a(e,t,r){var a=null;if(void 0!==r&&(a=""+r),void 0!==t.key&&(a=""+t.key),"key"in t)for(var i in r={},t)"key"!==i&&(r[i]=t[i]);else r=t;return t=r.ref,{$$typeof:n,type:e,key:a,ref:void 0!==t?t:null,props:r}}t.Fragment=r,t.jsx=a,t.jsxs=a},288(e,t){var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),m=Symbol.for("react.activity"),f=Symbol.iterator;var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,x={};function v(e,t,n){this.props=e,this.context=t,this.refs=x,this.updater=n||h}function b(){}function k(e,t,n){this.props=e,this.context=t,this.refs=x,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var y=k.prototype=new b;y.constructor=k,g(y,v.prototype),y.isPureReactComponent=!0;var j=Array.isArray;function w(){}var S={H:null,A:null,T:null,S:null},$=Object.prototype.hasOwnProperty;function N(e,t,r){var a=r.ref;return{$$typeof:n,type:e,key:t,ref:void 0!==a?a:null,props:r}}function _(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var E=/\/+/g;function z(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function C(e,t,a,i,o){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l,d,c=!1;if(null===e)c=!0;else switch(s){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case n:case r:c=!0;break;case p:return C((c=e._init)(e._payload),t,a,i,o)}}if(c)return o=o(e),c=""===i?"."+z(e,0):i,j(o)?(a="",null!=c&&(a=c.replace(E,"$&/")+"/"),C(o,t,a,"",function(e){return e})):null!=o&&(_(o)&&(l=o,d=a+(null==o.key||e&&e.key===o.key?"":(""+o.key).replace(E,"$&/")+"/")+c,o=N(l.type,d,l.props)),t.push(o)),1;c=0;var u,m=""===i?".":i+":";if(j(e))for(var h=0;h<e.length;h++)c+=C(i=e[h],t,a,s=m+z(i,h),o);else if("function"===typeof(h=null===(u=e)||"object"!==typeof u?null:"function"===typeof(u=f&&u[f]||u["@@iterator"])?u:null))for(e=h.call(e),h=0;!(i=e.next()).done;)c+=C(i=i.value,t,a,s=m+z(i,h++),o);else if("object"===s){if("function"===typeof e.then)return C(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(w,w):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,a,i,o);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function A(e,t,n){if(null==e)return e;var r=[],a=0;return C(e,r,"","",function(e){return t.call(n,e,a++)}),r}function D(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var F="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},O={map:A,forEach:function(e,t,n){A(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return A(e,function(){t++}),t},toArray:function(e){return A(e,function(e){return e})||[]},only:function(e){if(!_(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};t.Activity=m,t.Children=O,t.Component=v,t.Fragment=a,t.Profiler=o,t.PureComponent=k,t.StrictMode=i,t.Suspense=c,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cacheSignal=function(){return null},t.cloneElement=function(e,t,n){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var r=g({},e.props),a=e.key;if(null!=t)for(i in void 0!==t.key&&(a=""+t.key),t)!$.call(t,i)||"key"===i||"__self"===i||"__source"===i||"ref"===i&&void 0===t.ref||(r[i]=t[i]);var i=arguments.length-2;if(1===i)r.children=n;else if(1<i){for(var o=Array(i),s=0;s<i;s++)o[s]=arguments[s+2];r.children=o}return N(e.type,a,r)},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:s,_context:e},e},t.createElement=function(e,t,n){var r,a={},i=null;if(null!=t)for(r in void 0!==t.key&&(i=""+t.key),t)$.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(a[r]=t[r]);var o=arguments.length-2;if(1===o)a.children=n;else if(1<o){for(var s=Array(o),l=0;l<o;l++)s[l]=arguments[l+2];a.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps)void 0===a[r]&&(a[r]=o[r]);return N(e,i,a)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:d,render:e}},t.isValidElement=_,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:D}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=S.T,n={};S.T=n;try{var r=e(),a=S.S;null!==a&&a(n,r),"object"===typeof r&&null!==r&&"function"===typeof r.then&&r.then(w,F)}catch(i){F(i)}finally{null!==t&&null!==n.types&&(t.types=n.types),S.T=t}},t.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},t.use=function(e){return S.H.use(e)},t.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},t.useCallback=function(e,t){return S.H.useCallback(e,t)},t.useContext=function(e){return S.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},t.useEffect=function(e,t){return S.H.useEffect(e,t)},t.useEffectEvent=function(e){return S.H.useEffectEvent(e)},t.useId=function(){return S.H.useId()},t.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return S.H.useMemo(e,t)},t.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},t.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},t.useRef=function(e){return S.H.useRef(e)},t.useState=function(e){return S.H.useState(e)},t.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},t.useTransition=function(){return S.H.useTransition()},t.version="19.2.4"},43(e,t,n){e.exports=n(288)},579(e,t,n){e.exports=n(799)},896(e,t){function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(!(0<i(a,t)))break e;e[r]=t,e[n]=a,n=r}}function r(e){return 0===e.length?null:e[0]}function a(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,l=e[s],d=s+1,c=e[d];if(0>i(l,n))d<a&&0>i(c,l)?(e[r]=c,e[d]=n,r=d):(e[r]=l,e[s]=n,r=s);else{if(!(d<a&&0>i(c,n)))break e;e[r]=c,e[d]=n,r=d}}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var o=performance;t.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var d=[],c=[],u=1,p=null,m=3,f=!1,h=!1,g=!1,x=!1,v="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,k="undefined"!==typeof setImmediate?setImmediate:null;function y(e){for(var t=r(c);null!==t;){if(null===t.callback)a(c);else{if(!(t.startTime<=e))break;a(c),t.sortIndex=t.expirationTime,n(d,t)}t=r(c)}}function j(e){if(g=!1,y(e),!h)if(null!==r(d))h=!0,S||(S=!0,w());else{var t=r(c);null!==t&&D(j,t.startTime-e)}}var w,S=!1,$=-1,N=5,_=-1;function E(){return!!x||!(t.unstable_now()-_<N)}function z(){if(x=!1,S){var e=t.unstable_now();_=e;var n=!0;try{e:{h=!1,g&&(g=!1,b($),$=-1),f=!0;var i=m;try{t:{for(y(e),p=r(d);null!==p&&!(p.expirationTime>e&&E());){var o=p.callback;if("function"===typeof o){p.callback=null,m=p.priorityLevel;var s=o(p.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof s){p.callback=s,y(e),n=!0;break t}p===r(d)&&a(d),y(e)}else a(d);p=r(d)}if(null!==p)n=!0;else{var l=r(c);null!==l&&D(j,l.startTime-e),n=!1}}break e}finally{p=null,m=i,f=!1}n=void 0}}finally{n?w():S=!1}}}if("function"===typeof k)w=function(){k(z)};else if("undefined"!==typeof MessageChannel){var C=new MessageChannel,A=C.port2;C.port1.onmessage=z,w=function(){A.postMessage(null)}}else w=function(){v(z,0)};function D(e,n){$=v(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return m},t.unstable_next=function(e){switch(m){case 1:case 2:case 3:var t=3;break;default:t=m}var n=m;m=t;try{return e()}finally{m=n}},t.unstable_requestPaint=function(){x=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=m;m=e;try{return t()}finally{m=n}},t.unstable_scheduleCallback=function(e,a,i){var o=t.unstable_now();switch("object"===typeof i&&null!==i?i="number"===typeof(i=i.delay)&&0<i?o+i:o:i=o,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:u++,callback:a,priorityLevel:e,startTime:i,expirationTime:s=i+s,sortIndex:-1},i>o?(e.sortIndex=i,n(c,e),null===r(d)&&e===r(c)&&(g?(b($),$=-1):g=!0,D(j,i-o))):(e.sortIndex=s,n(d,e),h||f||(h=!0,S||(S=!0,w()))),e},t.unstable_shouldYield=E,t.unstable_wrapCallback=function(e){var t=m;return function(){var n=m;m=t;try{return e.apply(this,arguments)}finally{m=n}}}},853(e,t,n){e.exports=n(896)}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,a){if(1&a&&(r=this(r)),8&a)return r;if("object"===typeof r&&r){if(4&a&&r.__esModule)return r;if(16&a&&"function"===typeof r.then)return r}var i=Object.create(null);n.r(i);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&a&&r;("object"==typeof s||"function"==typeof s)&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(e=>o[e]=()=>r[e]);return o.default=()=>r,n.d(i,o),i}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nc=void 0;var r=n(43),a=n.t(r,2),i=n(391);const o="10.55.0",s=globalThis;function l(){return d(s),s}function d(e){const t=e.__SENTRY__=e.__SENTRY__||{};return t.version=t.version||o,t[o]=t[o]||{}}function c(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s;const r=n.__SENTRY__=n.__SENTRY__||{},a=r[o]=r[o]||{};return a[e]||(a[e]=t())}const u="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,p=["debug","info","warn","error","log","assert","trace"],m={};function f(e){if(!("console"in s))return e();const t=s.console,n={},r=Object.keys(m);r.forEach(e=>{const r=m[e];n[e]=t[e],t[e]=r});try{return e()}finally{r.forEach(e=>{t[e]=n[e]})}}function h(){return x().enabled}function g(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];u&&h()&&f(()=>{s.console[e](`Sentry Logger [${e}]:`,...n)})}function x(){return u?c("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const v={enable:function(){x().enabled=!0},disable:function(){x().enabled=!1},isEnabled:h,log:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];g("log",...t)},warn:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];g("warn",...t)},error:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];g("error",...t)}},b=Object.prototype.toString;function k(e){switch(b.call(e)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return C(e,Error)}}function y(e,t){return b.call(e)===`[object ${t}]`}function j(e){return y(e,"ErrorEvent")}function w(e){return y(e,"DOMError")}function S(e){return y(e,"String")}function $(e){return"object"===typeof e&&null!==e&&"__sentry_template_string__"in e&&"__sentry_template_values__"in e}function N(e){return null===e||$(e)||"object"!==typeof e&&"function"!==typeof e}function _(e){return y(e,"Object")}function E(e){return"undefined"!==typeof Event&&C(e,Event)}function z(e){return Boolean(e?.then&&"function"===typeof e.then)}function C(e,t){try{return e instanceof t}catch{return!1}}function A(e){return"undefined"!==typeof Request&&C(e,Request)}function D(e,t,n){if(!(t in e))return;const r=e[t];if("function"!==typeof r)return;const a=n(r);"function"===typeof a&&O(a,r);try{e[t]=a}catch{u&&v.log(`Failed to replace method "${t}" in object`,e)}}function F(e,t,n){try{Object.defineProperty(e,t,{value:n,writable:!0,configurable:!0})}catch{u&&v.log(`Failed to add non-enumerable property "${String(t)}" to object`,e)}}function O(e,t){try{const n=t.prototype||{};e.prototype=t.prototype=n,F(e,"__sentry_original__",t)}catch{}}function T(e){return e.__sentry_original__}function P(e){if(k(e))return{message:e.message,name:e.name,stack:e.stack,...L(e)};if(E(e)){const{type:t,target:n,currentTarget:r,detail:a}=e;return{type:t,target:n,currentTarget:r,...a?{detail:a}:{},...L(e)}}return e}function L(e){return"object"===typeof e&&null!==e?Object.fromEntries(Object.entries(e)):{}}let R;function I(e){if(void 0!==R)return R?R(e):e();const t=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=s;return t in n&&"function"===typeof n[t]?(R=n[t],R(e)):(R=null,e())}function B(){return I(()=>Math.random())}function M(){return I(()=>Date.now())}let V;function U(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){const e=s;return e.crypto||e.msCrypto}();try{if(e?.randomUUID)return I(()=>e.randomUUID()).replace(/-/g,"")}catch{}return V||(V="10000000100040008000100000000000"),V.replace(/[018]/g,e=>(e^(16*B()&15)>>e/4).toString(16))}function K(e){return e.exception?.values?.[0]}function H(e){const{message:t,event_id:n}=e;if(t)return t;const r=K(e);return r?r.type&&r.value?`${r.type}: ${r.value}`:r.type||r.value||n||"<unknown>":n||"<unknown>"}function W(e,t,n){const r=e.exception=e.exception||{},a=r.values=r.values||[],i=a[0]=a[0]||{};i.value||(i.value=t||""),i.type||(i.type=n||"Error")}function q(e,t){const n=K(e);if(!n)return;const r=n.mechanism;if(n.mechanism={type:"generic",handled:!0,...r,...t},t&&"data"in t){const e={...r?.data,...t.data};n.mechanism.data=e}}function G(e){if(function(e){try{return e.__sentry_captured__}catch{}}(e))return!0;try{F(e,"__sentry_captured__",!0)}catch{}return!1}function Y(){return M()/1e3}let J;function Q(){return(J??(J=function(){const{performance:e}=s;if(!e?.now||!e.timeOrigin)return Y;const t=e.timeOrigin;return()=>(t+I(()=>e.now()))/1e3}()))()}function X(e){const t=Q(),n={sid:U(),init:!0,timestamp:t,started:t,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>function(e){return{sid:`${e.sid}`,init:e.init,started:new Date(1e3*e.started).toISOString(),timestamp:new Date(1e3*e.timestamp).toISOString(),status:e.status,errors:e.errors,did:"number"===typeof e.did||"string"===typeof e.did?`${e.did}`:void 0,duration:e.duration,abnormal_mechanism:e.abnormal_mechanism,attrs:{release:e.release,environment:e.environment,ip_address:e.ipAddress,user_agent:e.userAgent}}}(n)};return e&&Z(n,e),n}function Z(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.user&&(!e.ipAddress&&t.user.ip_address&&(e.ipAddress=t.user.ip_address),e.did||t.did||(e.did=t.user.id||t.user.email||t.user.username)),e.timestamp=t.timestamp||Q(),t.abnormal_mechanism&&(e.abnormal_mechanism=t.abnormal_mechanism),t.ignoreDuration&&(e.ignoreDuration=t.ignoreDuration),t.sid&&(e.sid=32===t.sid.length?t.sid:U()),void 0!==t.init&&(e.init=t.init),!e.did&&t.did&&(e.did=`${t.did}`),"number"===typeof t.started&&(e.started=t.started),e.ignoreDuration)e.duration=void 0;else if("number"===typeof t.duration)e.duration=t.duration;else{const t=e.timestamp-e.started;e.duration=t>=0?t:0}t.release&&(e.release=t.release),t.environment&&(e.environment=t.environment),!e.ipAddress&&t.ipAddress&&(e.ipAddress=t.ipAddress),!e.userAgent&&t.userAgent&&(e.userAgent=t.userAgent),"number"===typeof t.errors&&(e.errors=t.errors),t.status&&(e.status=t.status)}function ee(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;if(!t||"object"!==typeof t||n<=0)return t;if(e&&0===Object.keys(t).length)return e;const r={...e};for(const a in t)Object.prototype.hasOwnProperty.call(t,a)&&(r[a]=ee(r[a],t[a],n-1));return r}function te(){return U()}function ne(){return U().substring(16)}const re="_sentrySpan";function ae(e,t){t?F(e,re,t):delete e[re]}function ie(e){return e[re]}const oe=Symbol.for("sentry.skipNormalization"),se=Symbol.for("sentry.overrideNormalizationDepth");const le="?",de=/\(error: (.*)\)/,ce=/captureMessage|captureException/;function ue(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=t.sort((e,t)=>e[0]-t[0]).map(e=>e[1]);return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;const a=[],i=e.split("\n");for(let o=t;o<i.length;o++){let e=i[o];e.length>1024&&(e=e.slice(0,1024));const t=de.test(e)?e.replace(de,"$1"):e;if(!t.includes("Error: ")){for(const e of r){const n=e(t);if(n){a.push(n);break}}if(a.length>=50+n)break}}return function(e){if(!e.length)return[];const t=Array.from(e);/sentryWrapped/.test(pe(t).function||"")&&t.pop();t.reverse(),ce.test(pe(t).function||"")&&(t.pop(),ce.test(pe(t).function||"")&&t.pop());return t.slice(0,50).map(e=>({...e,filename:e.filename||pe(t).filename,function:e.function||le}))}(a.slice(n))}}function pe(e){return e[e.length-1]||{}}const me="<anonymous>";function fe(e){try{return e&&"function"===typeof e&&e.name||me}catch{return me}}function he(e){const t=e.exception;if(t){const e=[];try{return t.values.forEach(t=>{t.stacktrace.frames&&e.push(...t.stacktrace.frames)}),e}catch{return}}}let ge;function xe(e){ge=e}function ve(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0;try{return ke("",e,t,n)}catch(r){return{ERROR:`**non-serializable** (${r})`}}}function be(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:102400;const r=ve(e,t);return a=r,function(e){return~-encodeURI(e).split(/%..|./).length}(JSON.stringify(a))>n?be(e,t-1,n):r;var a}function ke(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1/0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){const e=new WeakSet;function t(t){return!!e.has(t)||(e.add(t),!1)}function n(t){e.delete(t)}return[t,n]}();const[i,o]=a;if(null==t||["boolean","string"].includes(typeof t)||"number"===typeof t&&Number.isFinite(t))return t;const s=ye(e,t);if(!s.startsWith("[object "))return s;if(function(e){return Boolean(e[oe])}(t))return t;const l=function(e){const t=e[se];return"number"===typeof t?t:void 0}(t),d=void 0!==l?l:n;if(0===d)return s.replace("object ","");if(i(t))return"[Circular ~]";const c=t;if(c&&"function"===typeof c.toJSON)try{return ke("",c.toJSON(),d-1,r,a)}catch{}const u=Array.isArray(t)?[]:{};let p=0;const m=P(t);for(const f in m){if(!Object.prototype.hasOwnProperty.call(m,f))continue;if(p>=r){u[f]="[MaxProperties ~]";break}const e=m[f];u[f]=ke(f,e,d-1,r,a),p++}return o(t),u}function ye(e,t){try{if(ge){const e=ge(t);if(e)return e}if("undefined"!==typeof globalThis&&t===globalThis)return"[Global]";if("number"===typeof t&&!Number.isFinite(t))return`[${t}]`;if("function"===typeof t)return`[Function: ${fe(t)}]`;if("symbol"===typeof t)return`[${String(t)}]`;if("bigint"===typeof t)return`[BigInt: ${String(t)}]`;const e=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(t);return`[object ${e}]`}catch(n){return`**non-serializable** (${n})`}}function je(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"string"!==typeof e||0===t||e.length<=t?e:`${e.slice(0,t)}...`}function we(e,t){if(!Array.isArray(e))return"";const n=[];for(let r=0;r<e.length;r++){const t=e[r];N(t)?n.push(String(t)):t instanceof Error?n.push(t.message?`${t.name}: ${t.message}`:t.name):n.push(ye(0,t))}return n.join(t)}function Se(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return!!S(e)&&(y(t,"RegExp")?t.test(e):S(t)?n?e===t:e.includes(t):"function"===typeof t&&t(e))}function $e(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(const r of t)if(Se(e,r,n))return!0;return!1}class Ne{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:te(),sampleRand:B()}}clone(){const e=new Ne;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,e._conversationId=this._conversationId,ae(e,ie(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Z(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setConversationId(e){return this._conversationId=e||void 0,this._notifyScopeListeners(),this}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,t){return this.setTags({[e]:t})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,t){return this.setAttributes({[e]:t})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,t){return this._extra={...this._extra,[e]:t},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,t){return null===t?delete this._contexts[e]:this._contexts[e]=t,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const t="function"===typeof e?e(this):e,n=t instanceof Ne?t.getScopeData():_(t)?e:void 0,{tags:r,attributes:a,extra:i,user:o,contexts:s,level:l,fingerprint:d=[],propagationContext:c,conversationId:u}=n||{};return this._tags={...this._tags,...r},this._attributes={...this._attributes,...a},this._extra={...this._extra,...i},this._contexts={...this._contexts,...s},o&&Object.keys(o).length&&(this._user=o),l&&(this._level=l),d.length&&(this._fingerprint=d),c&&(this._propagationContext=c),u&&(this._conversationId=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,this._conversationId=void 0,ae(this,void 0),this._attachments=[],this.setPropagationContext({traceId:te(),sampleRand:B()}),this._notifyScopeListeners(),this}addBreadcrumb(e,t){const n="number"===typeof t?t:100;if(n<=0)return this;const r={timestamp:Y(),...e,message:e.message?je(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>n&&(this._breadcrumbs=this._breadcrumbs.slice(-n),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:ie(this),conversationId:this._conversationId}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=ee(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,t){const n=t?.event_id||U();if(!this._client)return u&&v.warn("No client configured on scope - will not capture exception!"),n;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...t,event_id:n},this),n}captureMessage(e,t,n){const r=n?.event_id||U();if(!this._client)return u&&v.warn("No client configured on scope - will not capture message!"),r;const a=n?.syntheticException??new Error(e);return this._client.captureMessage(e,t,{originalException:e,syntheticException:a,...n,event_id:r},this),r}captureEvent(e,t){const n=e.event_id||t?.event_id||U();return this._client?(this._client.captureEvent(e,{...t,event_id:n},this),n):(u&&v.warn("No client configured on scope - will not capture event!"),n)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}const _e=e=>e instanceof Promise&&!e[Ee],Ee=Symbol("chained PromiseLike"),ze=(e,t)=>{if(!t)return e;let n=!1;for(const r in e){if(r in t)continue;n=!0;const a=e[r];"function"===typeof a?Object.defineProperty(t,r,{value:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return a.apply(e,n)},enumerable:!0,configurable:!0,writable:!0}):t[r]=a}return n&&Object.assign(t,{[Ee]:!0}),t};class Ce{constructor(e,t){let n,r;n=e||new Ne,r=t||new Ne,this._stack=[{scope:n}],this._isolationScope=r}withScope(e){const t=this._pushScope();let n;try{n=e(t)}catch(r){throw this._popScope(),r}return z(n)?((e,t,n)=>{const r=e.then(e=>(t(e),e),e=>{throw n(e),e});return _e(r)&&_e(e)?r:ze(e,r)})(n,()=>this._popScope(),()=>this._popScope()):(this._popScope(),n)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return!(this._stack.length<=1)&&!!this._stack.pop()}}function Ae(){const e=d(l());return e.stack=e.stack||new Ce(c("defaultCurrentScope",()=>new Ne),c("defaultIsolationScope",()=>new Ne))}function De(e){return Ae().withScope(e)}function Fe(e,t){const n=Ae();return n.withScope(()=>(n.getStackTop().scope=e,t(e)))}function Oe(e){return Ae().withScope(()=>e(Ae().getIsolationScope()))}function Te(e){const t=d(e);return t.acs?t.acs:{withIsolationScope:Oe,withScope:De,withSetScope:Fe,withSetIsolationScope:(e,t)=>Oe(t),getCurrentScope:()=>Ae().getScope(),getIsolationScope:()=>Ae().getIsolationScope()}}let Pe;function Le(){return Te(l()).getCurrentScope()}function Re(){return Te(l()).getIsolationScope()}function Ie(){return Le().getClient()}function Be(e){const t=Pe?.();if(t)return{trace_id:t.traceId,span_id:t.spanId};const n=e.getPropagationContext(),{traceId:r,parentSpanId:a,propagationSpanId:i}=n,o={trace_id:r,span_id:i||ne()};return a&&(o.parent_span_id=a),o}const Me="production";function Ve(e){return new Ke(t=>{t(e)})}function Ue(e){return new Ke((t,n)=>{n(e)})}class Ke{constructor(e){this._state=0,this._handlers=[],this._runExecutor(e)}then(e,t){return new Ke((n,r)=>{this._handlers.push([!1,t=>{if(e)try{n(e(t))}catch(a){r(a)}else n(t)},e=>{if(t)try{n(t(e))}catch(a){r(a)}else r(e)}]),this._executeHandlers()})}catch(e){return this.then(e=>e,e)}finally(e){return new Ke((t,n)=>{let r,a;return this.then(t=>{a=!1,r=t,e&&e()},t=>{a=!0,r=t,e&&e()}).then(()=>{a?n(r):t(r)})})}_executeHandlers(){if(0===this._state)return;const e=this._handlers.slice();this._handlers=[],e.forEach(e=>{e[0]||(1===this._state&&e[1](this._value),2===this._state&&e[2](this._value),e[0]=!0)})}_runExecutor(e){const t=(e,t)=>{0===this._state&&(z(t)?t.then(n,r):(this._state=e,this._value=t,this._executeHandlers()))},n=e=>{t(1,e)},r=e=>{t(2,e)};try{e(n,r)}catch(a){r(a)}}}function He(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;try{const a=We(t,n,e,r);return z(a)?a:Ve(a)}catch(a){return Ue(a)}}function We(e,t,n,r){const a=n[r];if(!e||!a)return e;const i=a({...e},t);return u&&null===i&&v.log(`Event processor "${a.id||"?"}" dropped event`),z(i)?i.then(e=>We(e,t,n,r+1)):We(i,t,n,r+1)}let qe,Ge,Ye,Je;function Qe(e){const t=s._sentryDebugIds,n=s._debugIds;if(!t&&!n)return{};const r=t?Object.keys(t):[],a=n?Object.keys(n):[];if(Je&&r.length===Ge&&a.length===Ye)return Je;Ge=r.length,Ye=a.length,Je={},qe||(qe={});const i=(t,n)=>{for(const r of t){const t=n[r],a=qe?.[r];if(a&&Je&&t)Je[a[0]]=t,qe&&(qe[r]=[a[0],t]);else if(t){const n=e(r);for(let e=n.length-1;e>=0;e--){const a=n[e],i=a?.filename;if(i&&Je&&qe){Je[i]=t,qe[r]=[i,t];break}}}}};return t&&i(r,t),n&&i(a,n),Je}const Xe="sentry.profile_id",Ze="sentry.exclusive_time";const et="sentry-";function tt(e){if(e&&(S(e)||Array.isArray(e)))return Array.isArray(e)?e.reduce((e,t)=>{const n=nt(t);return Object.entries(n).forEach(t=>{let[n,r]=t;e[n]=r}),e},{}):nt(e)}function nt(e){return e.split(",").map(e=>{const t=e.indexOf("=");if(-1===t)return[];return[e.slice(0,t),e.slice(t+1)].map(e=>{try{return decodeURIComponent(e.trim())}catch{return}})}).reduce((e,t)=>{let[n,r]=t;return n&&r&&(e[n]=r),e},{})}const rt=/^o(\d+)\./,at=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function it(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{host:n,path:r,pass:a,port:i,projectId:o,protocol:s,publicKey:l}=e;return`${s}://${l}${t&&a?`:${a}`:""}@${n}${i?`:${i}`:""}/${r?`${r}/`:r}${o}`}function ot(e){return{protocol:e.protocol,publicKey:e.publicKey||"",pass:e.pass||"",host:e.host,port:e.port||"",path:e.path||"",projectId:e.projectId}}function st(e){const t=e.getOptions(),{host:n}=e.getDsn()||{};let r;return t.orgId?r=String(t.orgId):n&&(r=function(e){const t=e.match(rt);return t?.[1]}(n)),r}function lt(e){const t="string"===typeof e?function(e){const t=at.exec(e);if(!t)return void f(()=>{console.error(`Invalid Sentry Dsn: ${e}`)});const[n,r,a="",i="",o="",s=""]=t.slice(1);let l="",d=s;const c=d.split("/");if(c.length>1&&(l=c.slice(0,-1).join("/"),d=c.pop()),d){const e=d.match(/^\d+/);e&&(d=e[0])}return ot({host:i,pass:a,path:l,projectId:d,port:o,protocol:n,publicKey:r})}(e):ot(e);if(t&&function(e){if(!u)return!0;const{port:t,projectId:n,protocol:r}=e;return!["protocol","publicKey","host","projectId"].find(t=>!e[t]&&(v.error(`Invalid Sentry Dsn: ${t} missing`),!0))&&(n.match(/^\d+$/)?function(e){return"http"===e||"https"===e}(r)?!t||!isNaN(parseInt(t,10))||(v.error(`Invalid Sentry Dsn: Invalid port ${t}`),!1):(v.error(`Invalid Sentry Dsn: Invalid protocol ${r}`),!1):(v.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1))}(t))return t}function dt(e,t){const{value:n,unit:r}="object"===typeof(a=e)&&null!=a&&!Array.isArray(a)&&Object.keys(a).includes("value")?e:{value:e,unit:void 0};var a;const i=function(e){if(Array.isArray(e))return{value:e,type:"array"};const t="string"===typeof e?"string":"boolean"===typeof e?"boolean":"number"!==typeof e||Number.isNaN(e)?null:Number.isInteger(e)?"integer":"double";if(t)return{value:e,type:t}}(n),o=r&&"string"===typeof r?{unit:r}:{};if(i)return{...i,...o};if(!t||"skip-undefined"===t&&void 0===n)return;let s="";try{s=JSON.stringify(n)??""}catch{}return{value:s,type:"string",...o}}function ct(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n={};for(const[r,a]of Object.entries(e??{})){const e=dt(a,t);e&&(n[r]=e)}return n}function ut(e){if(e){if("object"===typeof e&&"deref"in e&&"function"===typeof e.deref)try{return e.deref()}catch{return}return e}}const pt="_sentryScope",mt="_sentryIsolationScope";function ft(e){const t=e;return{scope:t[pt],isolationScope:ut(t[mt])}}let ht=!1;function gt(e){const{spanId:t,traceId:n,isRemote:r}=e.spanContext(),a=r?t:kt(e).parent_span_id,i=ft(e).scope;return{parent_span_id:a,span_id:r?i?.getPropagationContext().propagationSpanId||ne():t,trace_id:n}}function xt(e){return e&&e.length>0?e.map(e=>{let{context:{spanId:t,traceId:n,traceFlags:r,...a},attributes:i}=e;return{span_id:t,trace_id:n,sampled:1===r,attributes:i,...a}}):void 0}function vt(e){return"number"===typeof e?bt(e):Array.isArray(e)?e[0]+e[1]/1e9:e instanceof Date?bt(e.getTime()):Q()}function bt(e){return e>9999999999?e/1e3:e}function kt(e){if(wt(e))return e.getSpanJSON();const{spanId:t,traceId:n}=e.spanContext();if(jt(e)){const{attributes:r,startTime:a,name:i,endTime:o,status:s,links:l}=e;return{span_id:t,trace_id:n,data:r,description:i,parent_span_id:yt(e),start_timestamp:vt(a),timestamp:vt(o)||void 0,status:$t(s),op:r["sentry.op"],origin:r["sentry.origin"],links:xt(l)}}return{span_id:t,trace_id:n,start_timestamp:0,data:{}}}function yt(e){return"parentSpanId"in e?e.parentSpanId:"parentSpanContext"in e?e.parentSpanContext?.spanId:void 0}function jt(e){const t=e;return!!t.attributes&&!!t.startTime&&!!t.name&&!!t.endTime&&!!t.status}function wt(e){return"function"===typeof e.getSpanJSON}function St(e){const{traceFlags:t}=e.spanContext();return 1===t}function $t(e){if(e&&0!==e.code)return 1===e.code?"ok":e.message||"internal_error"}const Nt="_sentryRootSpan";const _t=Et;function Et(e){return e[Nt]||e}function zt(){ht||(f(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),ht=!0)}const Ct="_frozenDsc";function At(e,t){const n=t.getOptions(),{publicKey:r}=t.getDsn()||{},a={environment:n.environment||Me,release:n.release,public_key:r,trace_id:e,org_id:st(t)};return t.emit("createDsc",a),a}function Dt(e){const t=Ie();if(!t)return{};const n=_t(e),r=kt(n),a=r.data,i=n.spanContext().traceState,o=i?.get("sentry.sample_rate")??a["sentry.sample_rate"]??a["sentry.previous_trace_sample_rate"];function s(e){return"number"!==typeof o&&"string"!==typeof o||(e.sample_rate=`${o}`),e}const l=n[Ct];if(l)return s(l);const d=i?.get("sentry.dsc"),c=d&&function(e){const t=tt(e);if(!t)return;const n=Object.entries(t).reduce((e,t)=>{let[n,r]=t;return n.startsWith(et)&&(e[n.slice(7)]=r),e},{});return Object.keys(n).length>0?n:void 0}(d);if(c)return s(c);const u=At(e.spanContext().traceId,t),p=a["sentry.source"]??a["sentry.span.source"],m=r.description;return"url"!==p&&m&&(u.transaction=m),function(e){if("boolean"===typeof __SENTRY_TRACING__&&!__SENTRY_TRACING__)return!1;const t=e||Ie()?.getOptions();return!!t&&(null!=t.tracesSampleRate||!!t.tracesSampler)}()&&(u.sampled=String(St(n)),u.sample_rand=i?.get("sentry.sample_rand")??ft(n).scope?.getPropagationContext().sampleRand.toString()),s(u),t.emit("createDsc",u,n),u}function Ft(e,t){const{fingerprint:n,span:r,breadcrumbs:a,sdkProcessingMetadata:i}=t;!function(e,t){const{extra:n,tags:r,user:a,contexts:i,level:o,transactionName:s}=t;Object.keys(n).length&&(e.extra={...n,...e.extra});Object.keys(r).length&&(e.tags={...r,...e.tags});Object.keys(a).length&&(e.user={...a,...e.user});Object.keys(i).length&&(e.contexts={...i,...e.contexts});o&&(e.level=o);s&&"transaction"!==e.type&&(e.transaction=s)}(e,t),r&&function(e,t){e.contexts={trace:gt(t),...e.contexts},e.sdkProcessingMetadata={dynamicSamplingContext:Dt(t),...e.sdkProcessingMetadata};const n=_t(t),r=kt(n).description;r&&!e.transaction&&"transaction"===e.type&&(e.transaction=r)}(e,r),function(e,t){e.fingerprint=e.fingerprint?Array.isArray(e.fingerprint)?e.fingerprint:[e.fingerprint]:[],t&&(e.fingerprint=e.fingerprint.concat(t));e.fingerprint.length||delete e.fingerprint}(e,n),function(e,t){const n=[...e.breadcrumbs||[],...t];e.breadcrumbs=n.length?n:void 0}(e,a),function(e,t){e.sdkProcessingMetadata={...e.sdkProcessingMetadata,...t}}(e,i)}function Ot(e,t){const{extra:n,tags:r,attributes:a,user:i,contexts:o,level:s,sdkProcessingMetadata:l,breadcrumbs:d,fingerprint:c,eventProcessors:u,attachments:p,propagationContext:m,transactionName:f,span:h}=t;Tt(e,"extra",n),Tt(e,"tags",r),Tt(e,"attributes",a),Tt(e,"user",i),Tt(e,"contexts",o),e.sdkProcessingMetadata=ee(e.sdkProcessingMetadata,l,2),s&&(e.level=s),f&&(e.transactionName=f),h&&(e.span=h),d.length&&(e.breadcrumbs=[...e.breadcrumbs,...d]),c.length&&(e.fingerprint=[...e.fingerprint,...c]),u.length&&(e.eventProcessors=[...e.eventProcessors,...u]),p.length&&(e.attachments=[...e.attachments,...p]),e.propagationContext={...e.propagationContext,...m}}function Tt(e,t,n){e[t]=ee(e[t],n,1)}function Pt(e,t){const n=c("globalScope",()=>new Ne).getScopeData();return e&&Ot(n,e.getScopeData()),t&&Ot(n,t.getScopeData()),n}function Lt(e,t,n,r,a,i){const{normalizeDepth:o=3,normalizeMaxBreadth:s=1e3}=e,l={...t,event_id:t.event_id||n.event_id||U(),timestamp:t.timestamp||Y()},d=n.integrations||e.integrations.map(e=>e.name);!function(e,t){const{environment:n,release:r,dist:a,maxValueLength:i}=t;e.environment=e.environment||n||Me,!e.release&&r&&(e.release=r);!e.dist&&a&&(e.dist=a);const o=e.request;o?.url&&i&&(o.url=je(o.url,i));i&&e.exception?.values?.forEach(e=>{e.value&&(e.value=je(e.value,i))})}(l,e),function(e,t){t.length>0&&(e.sdk=e.sdk||{},e.sdk.integrations=[...e.sdk.integrations||[],...t])}(l,d),a&&a.emit("applyFrameMetadata",t),void 0===t.type&&function(e,t){const n=Qe(t);e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.filename&&(e.debug_id=n[e.filename])})})}(l,e.stackParser);const c=function(e,t){if(!t)return e;const n=e?e.clone():new Ne;return n.update(t),n}(r,n.captureContext);n.mechanism&&q(l,n.mechanism);const u=a?a.getEventProcessors():[],p=Pt(i,c),m=[...n.attachments||[],...p.attachments];m.length&&(n.attachments=m),Ft(l,p);const f=[...u,...p.eventProcessors];return(n.data&&!0===n.data.__sentry__?Ve(l):He(f,l,n)).then(e=>(e&&function(e){const t={};if(e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.debug_id&&(e.abs_path?t[e.abs_path]=e.debug_id:e.filename&&(t[e.filename]=e.debug_id),delete e.debug_id)})}),0===Object.keys(t).length)return;e.debug_meta=e.debug_meta||{},e.debug_meta.images=e.debug_meta.images||[];const n=e.debug_meta.images;Object.entries(t).forEach(e=>{let[t,r]=e;n.push({type:"sourcemap",code_file:t,debug_id:r})})}(e),"number"===typeof o&&o>0?function(e,t,n){if(!e)return null;const r={...e,...e.breadcrumbs&&{breadcrumbs:e.breadcrumbs.map(e=>({...e,...e.data&&{data:ve(e.data,t,n)}}))},...e.user&&{user:ve(e.user,t,n)},...e.contexts&&{contexts:ve(e.contexts,t,n)},...e.extra&&{extra:ve(e.extra,t,n)}};e.contexts?.trace&&r.contexts&&(r.contexts.trace=e.contexts.trace,e.contexts.trace.data&&(r.contexts.trace.data=ve(e.contexts.trace.data,t,n)));e.spans&&(r.spans=e.spans.map(e=>({...e,...e.data&&{data:ve(e.data,t,n)}})));e.contexts?.flags&&r.contexts&&(r.contexts.flags=ve(e.contexts.flags,3,n));return r}(e,o,s):e))}function Rt(e){if(e)return function(e){return e instanceof Ne||"function"===typeof e}(e)||function(e){return Object.keys(e).some(e=>It.includes(e))}(e)?{captureContext:e}:e}const It=["user","level","extra","contexts","tags","fingerprint","propagationContext"];function Bt(e,t){return Le().captureEvent(e,t)}function Mt(e){const t=Re(),{user:n}=Pt(t,Le()),{userAgent:r}=s.navigator||{},a=X({user:n,...r&&{userAgent:r},...e}),i=t.getSession();return"ok"===i?.status&&Z(i,{status:"exited"}),Vt(),t.setSession(a),a}function Vt(){const e=Re(),t=Le().getSession()||e.getSession();t&&function(e,t){let n={};t?n={status:t}:"ok"===e.status&&(n={status:"exited"}),Z(e,n)}(t),Ut(),e.setSession()}function Ut(){const e=Re(),t=Ie(),n=e.getSession();n&&t&&t.captureSession(n)}function Kt(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]?Vt():Ut()}const Ht=[];function Wt(e){const t=e.defaultIntegrations||[],n=e.integrations;let r;if(t.forEach(e=>{e.isDefaultInstance=!0}),Array.isArray(n))r=[...t,...n];else if("function"===typeof n){const e=n(t);r=Array.isArray(e)?e:[e]}else r=t;return function(e){const t={};return e.forEach(e=>{const{name:n}=e,r=t[n];r&&!r.isDefaultInstance&&e.isDefaultInstance||(t[n]=e)}),Object.values(t)}(r)}function qt(e,t){for(const n of t)n?.afterAllSetup&&n.afterAllSetup(e)}function Gt(e,t,n){if(n[t.name])u&&v.log(`Integration skipped because it was already installed: ${t.name}`);else{if(n[t.name]=t,Ht.includes(t.name)||"function"!==typeof t.setupOnce||(t.setupOnce(),Ht.push(t.name)),t.setup&&"function"===typeof t.setup&&t.setup(e),"function"===typeof t.preprocessEvent){const n=t.preprocessEvent.bind(t);e.on("preprocessEvent",(t,r)=>n(t,r,e))}if("function"===typeof t.processEvent){const n=t.processEvent.bind(t),r=Object.assign((t,r)=>n(t,r,e),{id:t.name});e.addEventProcessor(r)}["processSpan","processSegmentSpan"].forEach(n=>{const r=t[n];"function"===typeof r&&e.on(n,n=>r.call(t,n,e))}),u&&v.log(`Integration installed: ${t.name}`)}}function Yt(e){const t=[];e.message&&t.push(e.message);try{const n=e.exception.values[e.exception.values.length-1];n?.value&&(t.push(n.value),n.type&&t.push(`${n.type}: ${n.value}`))}catch{}return t}const Jt=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,/can't redefine non-configurable property "solana"/,/vv\(\)\.getRestrictions is not a function/,/Can't find variable: _AutofillCallbackHandler/,/Object Not Found Matching Id:\d+, MethodName:simulateEvent/,/^Java exception was raised during method invocation$/],Qt=function(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{name:"EventFilters",setup(n){const r=n.getOptions();e=Zt(t,r)},processEvent(n,r,a){if(!e){const n=a.getOptions();e=Zt(t,n)}return function(e,t){if(e.type){if("transaction"===e.type&&function(e,t){if(!t?.length)return!1;const n=e.transaction;return!!n&&$e(n,t)}(e,t.ignoreTransactions))return u&&v.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${H(e)}`),!0}else{if(function(e,t){if(!t?.length)return!1;return Yt(e).some(e=>$e(e,t))}(e,t.ignoreErrors))return u&&v.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${H(e)}`),!0;if(function(e){if(!e.exception?.values?.length)return!1;return!e.message&&!e.exception.values.some(e=>e.stacktrace||e.type&&"Error"!==e.type||e.value)}(e))return u&&v.warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${H(e)}`),!0;if(function(e,t){if(!t?.length)return!1;const n=en(e);return!!n&&$e(n,t)}(e,t.denyUrls))return u&&v.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${H(e)}.\nUrl: ${en(e)}`),!0;if(!function(e,t){if(!t?.length)return!0;const n=en(e);return!n||$e(n,t)}(e,t.allowUrls))return u&&v.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${H(e)}.\nUrl: ${en(e)}`),!0}return!1}(n,e)?null:n}}},Xt=function(){return{...Qt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),name:"InboundFilters"}};function Zt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{allowUrls:[...e.allowUrls||[],...t.allowUrls||[]],denyUrls:[...e.denyUrls||[],...t.denyUrls||[]],ignoreErrors:[...e.ignoreErrors||[],...t.ignoreErrors||[],...e.disableErrorDefaults?[]:Jt],ignoreTransactions:[...e.ignoreTransactions||[],...t.ignoreTransactions||[]]}}function en(e){try{const t=[...e.exception?.values??[]].reverse().find(e=>void 0===e.mechanism?.parent_id&&e.stacktrace?.frames?.length),n=t?.stacktrace?.frames;return n?function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];for(let t=e.length-1;t>=0;t--){const n=e[t];if(n&&"<anonymous>"!==n.filename&&"[native code]"!==n.filename)return n.filename||null}return null}(n):null}catch{return u&&v.error(`Cannot extract url for event ${H(e)}`),null}}let tn;const nn=new WeakMap,rn=()=>({name:"FunctionToString",setupOnce(){tn=Function.prototype.toString;try{Function.prototype.toString=function(){const e=T(this),t=nn.has(Ie())&&void 0!==e?e:this;for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return tn.apply(t,r)}}catch{}},setup(e){nn.set(e,!0)}}),an=()=>({name:"ConversationId",setup(e){e.on("spanStart",e=>{const t=Le().getScopeData(),n=Re().getScopeData(),r=t.conversationId||n.conversationId;if(r){const{op:t,data:n,description:a}=kt(e);if(!t?.startsWith("gen_ai.")&&!n["ai.operationId"]&&!a?.startsWith("ai."))return;e.setAttribute("gen_ai.conversation.id",r)}})}}),on=()=>{let e;return{name:"Dedupe",processEvent(t){if(t.type)return t;try{if(function(e,t){if(!t)return!1;if(function(e,t){const n=e.message,r=t.message;if(!n&&!r)return!1;if(n&&!r||!n&&r)return!1;if(n!==r)return!1;if(!ln(e,t))return!1;if(!sn(e,t))return!1;return!0}(e,t))return!0;if(function(e,t){const n=dn(t),r=dn(e);if(!n||!r)return!1;if(n.type!==r.type||n.value!==r.value)return!1;if(!ln(e,t))return!1;if(!sn(e,t))return!1;return!0}(e,t))return!0;return!1}(t,e))return u&&v.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return e=t}}};function sn(e,t){let n=he(e),r=he(t);if(!n&&!r)return!0;if(n&&!r||!n&&r)return!1;if(r.length!==n.length)return!1;for(let a=0;a<r.length;a++){const e=r[a],t=n[a];if(e.filename!==t.filename||e.lineno!==t.lineno||e.colno!==t.colno||e.function!==t.function)return!1}return!0}function ln(e,t){let n=e.fingerprint,r=t.fingerprint;if(!n&&!r)return!0;if(n&&!r||!n&&r)return!1;try{return!(n.join("")!==r.join(""))}catch{return!1}}function dn(e){return e.exception?.values?.[0]}function cn(e,t){!0===t.debug&&(u?v.enable():f(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")}));Le().update(t.initialScope);const n=new e(t);return function(e){Le().setClient(e)}(n),n.init(),n}function un(e){const t=e.protocol?`${e.protocol}:`:"",n=e.port?`:${e.port}`:"";return`${t}//${e.host}${n}${e.path?`/${e.path}`:""}/api/`}function pn(e,t,n){return t||`${function(e){return`${un(e)}${e.projectId}/envelope/`}(e)}?${function(e,t){const n={sentry_version:"7"};return e.publicKey&&(n.sentry_key=e.publicKey),t&&(n.sentry_client=`${t.name}/${t.version}`),new URLSearchParams(n).toString()}(e,n)}`}function mn(e){return[e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]]}function fn(e,t){const[n,r]=e;return[n,[...r,t]]}function hn(e,t){const n=e[1];for(const r of n){if(t(r,r[0].type))return!0}return!1}function gn(e){const t=d(s);return t.encodePolyfill?t.encodePolyfill(e):(new TextEncoder).encode(e)}function xn(e){const[t,n]=e;let r=JSON.stringify(t);function a(e){"string"===typeof r?r="string"===typeof e?r+e:[gn(r),e]:r.push("string"===typeof e?gn(e):e)}for(const i of n){const[e,t]=i;if(a(`\n${JSON.stringify(e)}\n`),"string"===typeof t||t instanceof Uint8Array)a(t);else{let e;try{e=JSON.stringify(t)}catch{e=JSON.stringify(ve(t))}a(e)}}return"string"===typeof r?r:function(e){const t=e.reduce((e,t)=>e+t.length,0),n=new Uint8Array(t);let r=0;for(const a of e)n.set(a,r),r+=a.length;return n}(r)}function vn(e){const t="string"===typeof e.data?gn(e.data):e.data;return[{type:"attachment",length:t.length,filename:e.filename,content_type:e.contentType,attachment_type:e.attachmentType},t]}const bn={sessions:"session",event:"error",client_report:"internal",user_report:"default",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",raw_security:"security",log:"log_item",trace_metric:"metric"};function kn(e){return function(e){return e in bn}(e)?bn[e]:e}function yn(e){if(!e?.sdk)return;const{name:t,version:n}=e.sdk;return{name:t,version:n}}function jn(e,t,n,r){const a=yn(n),i=e.type&&"replay_event"!==e.type?e.type:"event";!function(e,t){if(!t)return e;const n=e.sdk||{};e.sdk={...n,name:n.name||t.name,version:n.version||t.version,integrations:[...e.sdk?.integrations||[],...t.integrations||[]],packages:[...e.sdk?.packages||[],...t.packages||[]],settings:e.sdk?.settings||t.settings?{...e.sdk?.settings,...t.settings}:void 0}}(e,n?.sdk);const o=function(e,t,n,r){const a=e.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:e.event_id,sent_at:(new Date).toISOString(),...t&&{sdk:t},...!!n&&r&&{dsn:it(r)},...a&&{trace:a}}}(e,a,r,t);delete e.sdkProcessingMetadata;return mn(o,[[{type:i},e]])}function wn(){return!("undefined"!==typeof __SENTRY_BROWSER_BUNDLE__&&__SENTRY_BROWSER_BUNDLE__)&&"[object process]"===Object.prototype.toString.call("undefined"!==typeof process?process:0)}function Sn(){return"undefined"!==typeof window&&(!wn()||function(){const e=s.process;return"renderer"===e?.type}())}function $n(e,t){const n=t?"auto":"never";return[{type:"log",item_count:e.length,content_type:"application/vnd.sentry.items.log+json"},{version:2,...Sn()&&{ingest_settings:{infer_ip:n,infer_user_agent:n}},items:e}]}function Nn(e,t){const n=t??_n(e)??[];if(0===n.length)return;const r=e.getOptions(),a=function(e,t,n,r,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),n&&r&&(i.dsn=it(r)),mn(i,[$n(e,a)])}(n,r._metadata,r.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);En().set(e,[]),e.emit("flushLogs"),e.sendEnvelope(a)}function _n(e){return En().get(e)}function En(){return c("clientToLogBufferMap",()=>new WeakMap)}function zn(e,t){const n=t?"auto":"never";return[{type:"trace_metric",item_count:e.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{version:2,...Sn()&&{ingest_settings:{infer_ip:n,infer_user_agent:n}},items:e}]}function Cn(e,t){const n=t??An(e)??[];if(0===n.length)return;const r=e.getOptions(),a=function(e,t,n,r,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),n&&r&&(i.dsn=it(r)),mn(i,[zn(e,a)])}(n,r._metadata,r.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);Dn().set(e,[]),e.emit("flushMetrics"),e.sendEnvelope(a)}function An(e){return Dn().get(e)}function Dn(){return c("clientToMetricBufferMap",()=>new WeakMap)}function Fn(e){const t={trace_id:e.trace_id,span_id:e.span_id,parent_span_id:e.parent_span_id,name:e.description||"",start_timestamp:e.start_timestamp,end_timestamp:e.timestamp||e.start_timestamp,status:e.status&&"ok"!==e.status&&"cancelled"!==e.status?"error":"ok",is_segment:!1,attributes:{...e.data},links:e.links};return n=t,{...n,attributes:ct(n.attributes),links:n.links?.map(e=>({...e,attributes:ct(e.attributes)}))};var n}function On(e){return"object"===typeof e&&"function"===typeof e.unref&&e.unref(),e}const Tn=Symbol.for("SentryBufferFullError");function Pn(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;const t=new Set;function n(e){t.delete(e)}return{get $(){return Array.from(t)},add:function(r){if(!(t.size<e))return Ue(Tn);const a=r();return t.add(a),a.then(()=>n(a),()=>n(a)),a},drain:function(e){if(!t.size)return Ve(!0);const n=Promise.allSettled(Array.from(t)).then(()=>!0);if(!e)return n;const r=[n,new Promise(t=>On(setTimeout(()=>t(!1),e)))];return Promise.race(r)}}}function Ln(e,t){let{statusCode:n,headers:r}=t,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M();const i={...e},o=r?.["x-sentry-rate-limits"],s=r?.["retry-after"];if(o)for(const l of o.trim().split(",")){const[e,t,,,n]=l.split(":",5),r=parseInt(e,10),o=1e3*(isNaN(r)?60:r);if(t)for(const s of t.split(";"))"metric_bucket"===s&&n&&!n.split(";").includes("custom")||(i[s]=a+o);else i.all=a+o}else s?i.all=a+function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:M();const n=parseInt(`${e}`,10);if(!isNaN(n))return 1e3*n;const r=Date.parse(`${e}`);return isNaN(r)?6e4:r-t}(s,a):429===n&&(i.all=a+6e4);return i}function Rn(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Pn(e.bufferSize||64),r={};return{send:function(a){const i=[];if(hn(a,(t,n)=>{const a=kn(n);!function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M();return function(e,t){return e[t]||e.all||0}(e,t)>n}(r,a)?i.push(t):e.recordDroppedEvent("ratelimit_backoff",a)}),0===i.length)return Promise.resolve({});const o=mn(a[0],i),s=t=>{!function(e,t){return hn(e,(e,n)=>t.includes(n))}(o,["client_report"])?hn(o,(n,r)=>{e.recordDroppedEvent(t,kn(r))}):u&&v.warn(`Dropping client report. Will not send outcomes (reason: ${t}).`)};return n.add(()=>t({body:xn(o)}).then(e=>413===e.statusCode?(u&&v.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits."),s("send_error"),e):(u&&void 0!==e.statusCode&&(e.statusCode<200||e.statusCode>=300)&&v.warn(`Sentry responded with status code ${e.statusCode} to sent event.`),r=Ln(r,e),e),e=>{throw s("network_error"),u&&v.error("Encountered error running transport request:",e),e})).then(e=>e,e=>{if(e===Tn)return u&&v.error("Skipped sending event because buffer is full."),s("queue_overflow"),Promise.resolve({});throw e})},flush:e=>n.drain(e)}}function In(e){v.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`)}function Bn(e,t){if(!t?.length)return!1;for(const n of t){if(Un(n)){if(e.description&&Se(e.description,n))return u&&In(e),!0;continue}const t=!!n.attributes&&Object.keys(n.attributes).length>0;if(!n.name&&!n.op&&!t)continue;const r=!n.name||e.description&&Se(e.description,n.name),a=!n.op||e.op&&Se(e.op,n.op),i=!n.attributes||Object.entries(n.attributes).every(t=>{let[n,r]=t;return Mn(e.attributes?.[n],r)});if(r&&a&&i)return u&&In(e),!0}return!1}function Mn(e,t){return"string"===typeof e&&("string"===typeof t||t instanceof RegExp)?Se(e,t):Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):e===t}function Vn(e,t){const n=t.parent_span_id,r=t.span_id;if(n)for(const a of e)a.parent_span_id===r&&(a.parent_span_id=n)}function Un(e){return"string"===typeof e||e instanceof RegExp}const Kn=["forwarded","-ip","remote-","via","-user"];const Hn={userInfo:!1,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:[],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5};function Wn(e){const t=null!=e.dataCollection?Hn:!0===e.sendDefaultPii?{userInfo:!0,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:["incomingRequest","outgoingRequest","incomingResponse","outgoingResponse"],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5}:{userInfo:!1,cookies:{deny:Kn},httpHeaders:{request:{deny:Kn},response:{deny:Kn}},httpBodies:[],queryParams:{deny:Kn},genAI:{inputs:!1,outputs:!1},stackFrameVariables:!0,frameContextLines:5};const n=e.dataCollection??{};return{userInfo:n.userInfo??t.userInfo,cookies:n.cookies??t.cookies,httpHeaders:{request:n.httpHeaders?.request??t.httpHeaders.request,response:n.httpHeaders?.response??t.httpHeaders.response},httpBodies:n.httpBodies??t.httpBodies,queryParams:n.queryParams??t.queryParams,genAI:{inputs:n.genAI?.inputs??t.genAI.inputs,outputs:n.genAI?.outputs??t.genAI.outputs},stackFrameVariables:n.stackFrameVariables??t.stackFrameVariables,frameContextLines:n.frameContextLines??t.frameContextLines}}const qn="Not capturing exception because it's already been captured.",Gn="Discarded session because of missing or non-string release",Yn=Symbol.for("SentryInternalError"),Jn=Symbol.for("SentryDoNotSendEventError");function Qn(e){return{message:e,[Yn]:!0}}function Xn(e){return{message:e,[Jn]:!0}}function Zn(e){return!!e&&"object"===typeof e&&Yn in e}function er(e){return!!e&&"object"===typeof e&&Jn in e}function tr(e,t,n,r,a){let i,o=0,s=!1;e.on(n,()=>{o=0,clearTimeout(i),s=!1}),e.on(t,t=>{if(o+=r(t),o>=8e5)a(e);else if(!s){const t=e.getOptions()._flushInterval??5e3;t>0&&(s=!0,i=On(setTimeout(()=>{a(e)},t)))}}),e.on("flush",()=>{a(e)})}class nr{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Pn(e.transportOptions?.bufferSize??64),this._dataCollection=Wn(e),e.dsn?this._dsn=lt(e.dsn):u&&v.warn("No DSN provided, client will not send events."),this._dsn){const t=pn(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:t})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&tr(this,"afterCaptureLog","flushLogs",sr,Nn);(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&tr(this,"afterCaptureMetric","flushMetrics",or,Cn)}captureException(e,t,n){const r=U();if(G(e))return u&&v.log(qn),r;const a={event_id:r,...t};return this._process(()=>this.eventFromException(e,a).then(e=>this._captureEvent(e,a,n)).then(e=>e),"error"),a.event_id}captureMessage(e,t,n,r){const a={event_id:U(),...n},i=$(e)?e:String(e),o=N(e),s=o?this.eventFromMessage(i,t,a):this.eventFromException(e,a);return this._process(()=>s.then(e=>this._captureEvent(e,a,r)),o?"unknown":"error"),a.event_id}captureEvent(e,t,n){const r=U();if(t?.originalException&&G(t.originalException))return u&&v.log(qn),r;const a={event_id:r,...t},i=e.sdkProcessingMetadata||{},o=i.capturedSpanScope,s=i.capturedSpanIsolationScope,l=rr(e.type);return this._process(()=>this._captureEvent(e,a,o||n,s),l),a.event_id}captureSession(e){this.sendSession(e),Z(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getDataCollectionOptions(){return this._dataCollection}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const t=this._transport;if(this.emit("flush"),!t)return!0;const n=await this._isClientDoneProcessing(e),r=await t.flush(e);return n&&r}async close(e){Nn(this);const t=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),t}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(e=>{let{name:t}=e;return t.startsWith("Spotlight")}))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}getIntegrationNames(){return Object.keys(this._integrations)}addIntegration(e){const t=this._integrations[e.name];!t&&e.beforeSetup&&e.beforeSetup(this),Gt(this,e,this._integrations),t||qt(this,[e])}sendEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.emit("beforeSendEvent",e,t);const n=function(e,t){if("transaction"!==e.type||!e.spans?.length||!e.sdkProcessingMetadata?.hasGenAiSpans||!t.getOptions().streamGenAiSpans||function(e){return"stream"===e.getOptions().traceLifecycle}(t))return;const n=[],r=[];for(const i of e.spans)i.op?.startsWith("gen_ai.")?n.push(Fn(i)):r.push(i);if(0===n.length)return;e.spans=r;const a=t.getOptions().sendDefaultPii?"auto":"never";return[{type:"span",item_count:n.length,content_type:"application/vnd.sentry.items.span.v2+json"},{version:2,...Sn()&&{ingest_settings:{infer_ip:a,infer_user_agent:a}},items:n}]}(e,this);let r=jn(e,this._dsn,this._options._metadata,this._options.tunnel);for(const a of t.attachments||[])r=fn(r,vn(a));n&&(r=fn(r,n)),this.sendEnvelope(r).then(t=>this.emit("afterSendEvent",e,t))}sendSession(e){const{release:t,environment:n=Me}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!t)return void(u&&v.warn(Gn));r.release=r.release||t,r.environment=r.environment||n,e.attrs=r}else{if(!e.release&&!t)return void(u&&v.warn(Gn));e.release=e.release||t,e.environment=e.environment||n}this.emit("beforeSendSession",e);const r=function(e,t,n,r){const a=yn(n);return mn({sent_at:(new Date).toISOString(),...a&&{sdk:a},...!!r&&t&&{dsn:it(t)}},["aggregates"in e?[{type:"sessions"},e]:[{type:"session"},e.toJSON()]])}(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(this._options.sendClientReports){const r=`${e}:${t}`;u&&v.log(`Recording outcome: "${r}"${n>1?` (${n} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+n}}on(e,t){const n=this._hooks[e]=this._hooks[e]||new Set,r=function(){return t(...arguments)};return n.add(r),()=>{n.delete(r)}}emit(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];const a=this._hooks[e];a&&a.forEach(e=>e(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(t){return u&&v.error("Error while sending envelope:",t),{}}return u&&v.error("Transport disabled"),{}}registerCleanup(e){}dispose(){}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=function(e,t){const n={};return t.forEach(t=>{t?.beforeSetup&&t.beforeSetup(e)}),t.forEach(t=>{t&&Gt(e,t,n)}),n}(this,e),qt(this,e)}_updateSessionFromEvent(e,t){let n="fatal"===t.level,r=!1;const a=t.exception?.values;if(a){r=!0,n=!1;for(const e of a)if(!1===e.mechanism?.handled){n=!0;break}}const i="ok"===e.status;(i&&0===e.errors||i&&n)&&(Z(e,{...n&&{status:"crashed"},errors:e.errors||Number(r||n)}),this.captureSession(e))}async _isClientDoneProcessing(e){let t=0;for(;!e||t<e;){if(await new Promise(e=>setTimeout(e,1)),!this._numProcessing)return!0;t++}return!1}_isEnabled(){return!1!==this.getOptions().enabled&&void 0!==this._transport}_prepareEvent(e,t,n,r){const a=this.getOptions(),i=this.getIntegrationNames();return!t.integrations&&i.length&&(t.integrations=i),this.emit("preprocessEvent",e,t),e.type||r.setLastEventId(e.event_id||t.event_id),Lt(a,e,t,n,this,r).then(e=>{if(null===e)return e;this.emit("postprocessEvent",e,t),e.contexts={trace:{...e.contexts?.trace,...Be(n)},...e.contexts};const r=function(e,t){const n=t.getPropagationContext();return n.dsc||At(n.traceId,e)}(this,n);return e.sdkProcessingMetadata={dynamicSamplingContext:r,...e.sdkProcessingMetadata},e})}_captureEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Le(),r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Re();return u&&ar(e)&&v.log(`Captured error event \`${Yt(e)[0]||"<unknown>"}\``),this._processEvent(e,t,n,r).then(e=>e.event_id,e=>{u&&(er(e)?v.log(e.message):Zn(e)?v.warn(e.message):v.warn(e))})}_processEvent(e,t,n,r){const a=this.getOptions(),{sampleRate:i}=a,o=ir(e),s=ar(e),l=`before send for type \`${e.type||"error"}\``,d="undefined"===typeof i?void 0:function(e){if("boolean"===typeof e)return Number(e);const t="string"===typeof e?parseFloat(e):e;return"number"!==typeof t||isNaN(t)||t<0||t>1?void 0:t}(i);if(s&&"number"===typeof d&&B()>d)return this.recordDroppedEvent("sample_rate","error"),Ue(Xn(`Discarding event because it's not included in the random sample (sampling rate = ${i})`));const c=rr(e.type);return this._prepareEvent(e,t,n,r).then(e=>{if(null===e)throw this.recordDroppedEvent("event_processor",c),Xn("An event processor returned `null`, will not send event.");if(!0===t.data?.__sentry__)return e;const n=function(e,t,n,r){const{beforeSend:a,beforeSendTransaction:i,ignoreSpans:o}=t,s=(l=t.beforeSendSpan,!(l&&"function"===typeof l&&"_streamed"in l&&l._streamed)&&t.beforeSendSpan);var l;let d=n;if(ar(d)&&a)return a(d,r);if(ir(d)){if(s||o){const t=function(e){const{trace_id:t,parent_span_id:n,span_id:r,status:a,origin:i,data:o,op:s}=e.contexts?.trace??{};return{data:o??{},description:e.transaction,op:s,parent_span_id:n,span_id:r??"",start_timestamp:e.start_timestamp??0,status:a,timestamp:e.timestamp,trace_id:t??"",origin:i,profile_id:o?.[Xe],exclusive_time:o?.[Ze],measurements:e.measurements,is_segment:!0}}(d);if(o?.length&&Bn({description:t.description,op:t.op,attributes:t.data},o))return null;if(s){const e=s(t);e?d=ee(n,{type:"transaction",timestamp:(c=e).timestamp,start_timestamp:c.start_timestamp,transaction:c.description,contexts:{trace:{trace_id:c.trace_id,span_id:c.span_id,parent_span_id:c.parent_span_id,op:c.op,status:c.status,origin:c.origin,data:{...c.data,...c.profile_id&&{[Xe]:c.profile_id},...c.exclusive_time&&{[Ze]:c.exclusive_time}}}},measurements:c.measurements}):zt()}if(d.spans){const t=[],n=d.spans;for(const e of n)if(o?.length&&Bn({description:e.description,op:e.op,attributes:e.data},o))Vn(n,e);else if(s){const n=s(e);n?t.push(n):(zt(),t.push(e))}else t.push(e);const r=d.spans.length-t.length;r&&e.recordDroppedEvent("before_send","span",r),d.spans=t}}if(i){if(d.spans){const e=d.spans.length;d.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:e}}return i(d,r)}}var c;return d}(this,a,e,t);return function(e,t){const n=`${t} must return \`null\` or a valid event.`;if(z(e))return e.then(e=>{if(!_(e)&&null!==e)throw Qn(n);return e},e=>{throw Qn(`${t} rejected with ${e}`)});if(!_(e)&&null!==e)throw Qn(n);return e}(n,l)}).then(a=>{if(null===a){if(this.recordDroppedEvent("before_send",c),o){const t=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",t)}throw Xn(`${l} returned \`null\`, will not send event.`)}const i=n.getSession()||r.getSession();if(s&&i&&this._updateSessionFromEvent(i,a),o){const e=(a.sdkProcessingMetadata?.spanCountBeforeProcessing||0)-(a.spans?a.spans.length:0);e>0&&this.recordDroppedEvent("before_send","span",e)}const d=a.transaction_info;if(o&&d&&a.transaction!==e.transaction){const e="custom";a.transaction_info={...d,source:e}}return this.sendEvent(a,t),a}).then(null,e=>{if(er(e)||Zn(e))throw e;throw this.captureException(e,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:e}),Qn(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${e}`)})}_process(e,t){this._numProcessing++,this._promiseBuffer.add(e).then(e=>(this._numProcessing--,e),e=>(this._numProcessing--,e===Tn&&this.recordDroppedEvent("queue_overflow",t),e))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(e=>{let[t,n]=e;const[r,a]=t.split(":");return{reason:r,category:a,quantity:n}})}_flushOutcomes(){u&&v.log("Flushing outcomes...");const e=this._clearOutcomes();if(0===e.length)return void(u&&v.log("No outcomes to send"));if(!this._dsn)return void(u&&v.log("No dsn provided, will not send outcomes"));u&&v.log("Sending outcomes:",e);const t=(n=e,mn((r=this._options.tunnel&&it(this._dsn))?{dsn:r}:{},[[{type:"client_report"},{timestamp:a||Y(),discarded_events:n}]]));var n,r,a;this.sendEnvelope(t)}}function rr(e){return"replay_event"===e?"replay":e||"error"}function ar(e){return void 0===e.type}function ir(e){return"transaction"===e.type}function or(e){let t=0;return e.name&&(t+=2*e.name.length),t+=8,t+lr(e.attributes)}function sr(e){let t=0;return e.message&&(t+=2*e.message.length),t+lr(e.attributes)}function lr(e){if(!e)return 0;let t=0;return Object.values(e).forEach(e=>{Array.isArray(e)?t+=e.length*dr(e[0]):N(e)?t+=dr(e):t+=100}),t}function dr(e){return"string"===typeof e?2*e.length:"number"===typeof e?8:"boolean"===typeof e?4:0}function cr(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[t],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"npm";const a=(e._metadata=e._metadata||{}).sdk=e._metadata.sdk||{};a.name||(a.name=`sentry.javascript.${t}`,a.packages=n.map(e=>({name:`${r}:@sentry/${e}`,version:o})),a.version=o)}function ur(e){"aggregates"in e?void 0===e.attrs?.ip_address&&(e.attrs={...e.attrs,ip_address:"{{auto}}"}):void 0===e.ipAddress&&(e.ipAddress="{{auto}}")}function pr(e){return function(e){return k(e)&&"__sentry_fetch_url_host__"in e&&"string"===typeof e.__sentry_fetch_url_host__}(e)?`${e.message} (${e.__sentry_fetch_url_host__})`:e.message}function mr(e,t){const n=gr(e,t),r={type:br(t),value:kr(t)};return n.length&&(r.stacktrace={frames:n}),void 0===r.type&&""===r.value&&(r.value="Unrecoverable error caught"),r}function fr(e,t,n,r){const a=Ie(),i=a?.getOptions().normalizeDepth,o=(s=t,Object.values(s).find(e=>e instanceof Error));var s;const l={__serialized__:be(t,i)};if(o)return{exception:{values:[mr(e,o)]},extra:l};const d={exception:{values:[{type:E(t)?t.constructor.name:r?"UnhandledRejection":"Error",value:wr(t,{isUnhandledRejection:r})}]},extra:l};if(n){const t=gr(e,n);t.length&&(d.exception.values[0].stacktrace={frames:t})}return d}function hr(e,t){return{exception:{values:[mr(e,t)]}}}function gr(e,t){const n=t.stacktrace||t.stack||"",r=function(e){if(e&&xr.test(e.message))return 1;return 0}(t),a=function(e){if("number"===typeof e.framesToPop)return e.framesToPop;return 0}(t);try{return e(n,r,a)}catch{}return[]}const xr=/Minified React error #\d+;/i;function vr(e){return"undefined"!==typeof WebAssembly&&"undefined"!==typeof WebAssembly.Exception&&e instanceof WebAssembly.Exception}function br(e){const t=e?.name;if(!t&&vr(e)){return e.message&&Array.isArray(e.message)&&2==e.message.length?e.message[0]:"WebAssembly.Exception"}return t}function kr(e){const t=e?.message;return vr(e)?Array.isArray(e.message)&&2==e.message.length?e.message[1]:"wasm exception":t?t.error&&"string"===typeof t.error.message?pr(t.error):pr(e):"No error message"}function yr(e,t,n,r,a){let i;if(j(t)&&t.error){return hr(e,t.error)}if(w(t)||y(t,"DOMException")){const a=t;if("stack"in t){i=hr(e,t);const a=i.exception?.values?.[0];if(r&&n&&a&&!a.stacktrace){const t=gr(e,n);t.length&&(a.stacktrace={frames:t},q(i,{synthetic:!0}))}}else{const t=a.name||(w(a)?"DOMError":"DOMException"),o=a.message?`${t}: ${a.message}`:t;i=jr(e,o,n,r),W(i,o)}return"code"in a&&(i.tags={...i.tags,"DOMException.code":`${a.code}`}),i}if(k(t))return hr(e,t);if(_(t)||E(t)){return i=fr(e,t,n,a),q(i,{synthetic:!0}),i}return i=jr(e,t,n,r),W(i,`${t}`,void 0),q(i,{synthetic:!0}),i}function jr(e,t,n,r){const a={};if(r&&n){const r=gr(e,n);r.length&&(a.exception={values:[{value:t,stacktrace:{frames:r}}]}),q(a,{synthetic:!0})}if($(t)){const{__sentry_template_string__:e,__sentry_template_values__:n}=t;return a.logentry={message:e,params:n},a}return a.message=t,a}function wr(e,t){let{isUnhandledRejection:n}=t;const r=function(e){const t=Object.keys(P(e));return t.sort(),t[0]?t.join(", "):"[object has no keys]"}(e),a=n?"promise rejection":"exception";if(j(e))return`Event \`ErrorEvent\` captured as ${a} with message \`${e.message}\``;if(E(e)){return`Event \`${function(e){try{const t=Object.getPrototypeOf(e);return t?t.constructor.name:void 0}catch{}}(e)}\` (type=${e.type}) captured as ${a}`}return`Object captured as ${a} with keys: ${r}`}const Sr=s;function $r(){try{return Sr.document.location.href}catch{return""}}const Nr=s;let _r=0;function Er(){return _r>0}function zr(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!==typeof e)return e;try{const t=e.__sentry_wrapped__;if(t)return"function"===typeof t?t:e;if(T(e))return e}catch{return e}const n=function(){for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];s._sentryWrappedDepth=(s._sentryWrappedDepth||0)+1;try{const n=r.map(e=>zr(e,t));return e.apply(this,n)}catch(i){throw _r++,setTimeout(()=>{_r--}),function(){const e=Te(l());for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(2===n.length){const[t,r]=n;return t?e.withSetScope(t,r):e.withScope(r)}e.withScope(n[0])}(e=>{var n,a;e.addEventProcessor(e=>(t.mechanism&&(W(e,void 0,void 0),q(e,t.mechanism)),e.extra={...e.extra,arguments:r},e)),n=i,Le().captureException(n,Rt(a))}),i}finally{s._sentryWrappedDepth=(s._sentryWrappedDepth||0)-1}};try{for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}catch{}O(n,e),F(e,"__sentry_wrapped__",n);try{Object.getOwnPropertyDescriptor(n,"name").configurable&&Object.defineProperty(n,"name",{get:()=>e.name})}catch{}return n}function Cr(){const e=$r(),{referrer:t}=Nr.document||{},{userAgent:n}=Nr.navigator||{};return{url:e,headers:{...t&&{Referer:t},...n&&{"User-Agent":n}}}}class Ar extends nr{constructor(e){const t=(n=e,{release:"string"===typeof __SENTRY_RELEASE__?__SENTRY_RELEASE__:Nr.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...n});var n;cr(t,"browser",["browser"],Nr.SENTRY_SDK_SOURCE||"npm"),t._metadata?.sdk&&(t._metadata.sdk.settings={infer_ip:t.sendDefaultPii?"auto":"never",...t._metadata.sdk.settings}),super(t);const{sendDefaultPii:r,sendClientReports:a,enableLogs:i,_experiments:o,enableMetrics:s}=this._options,l=s??o?.enableMetrics??!0;Nr.document&&(a||i||l)&&Nr.document.addEventListener("visibilitychange",()=>{"hidden"===Nr.document.visibilityState&&(a&&this._flushOutcomes(),i&&Nn(this),l&&Cn(this))}),r&&this.on("beforeSendSession",ur)}eventFromException(e,t){return function(e,t,n,r){const a=yr(e,t,n?.syntheticException||void 0,r);return q(a),a.level="error",n?.event_id&&(a.event_id=n.event_id),Ve(a)}(this._options.stackParser,e,t,this._options.attachStacktrace)}eventFromMessage(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info",n=arguments.length>2?arguments[2]:void 0;return function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"info",r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;const i=jr(e,t,r?.syntheticException||void 0,a);return i.level=n,r?.event_id&&(i.event_id=r.event_id),Ve(i)}(this._options.stackParser,e,t,n,this._options.attachStacktrace)}_prepareEvent(e,t,n,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,t,n,r)}}const Dr={},Fr={};function Or(e,t){return Dr[e]=Dr[e]||[],Dr[e].push(t),()=>{const n=Dr[e];if(n){const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}}function Tr(e,t){if(!Fr[e]){Fr[e]=!0;try{t()}catch(n){u&&v.error(`Error while instrumenting ${e}`,n)}}}function Pr(e,t){const n=e&&Dr[e];if(n)for(const a of n)try{a(t)}catch(r){u&&v.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${fe(a)}\nError:`,r)}}const Lr=new Set([]);function Rr(){"console"in s&&p.forEach(function(e){e in s.console&&D(s.console,e,function(t){return m[e]=t,function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];const a=n[0],i=m[e],o=Lr.size&&"string"===typeof a&&$e(a,Lr);o||Pr("console",{args:n,level:e}),(!o||u&&v.isEnabled())&&i?.apply(s.console,n)}})})}const Ir=s;function Br(){if(!("fetch"in Ir))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Mr(e){return e&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())}function Vr(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&!function(){if("string"===typeof EdgeRuntime)return!0;if(!Br())return!1;if(Mr(Ir.fetch))return!0;let e=!1;const t=Ir.document;if(t&&"function"===typeof t.createElement)try{const n=t.createElement("iframe");n.hidden=!0,t.head.appendChild(n),n.contentWindow?.fetch&&(e=Mr(n.contentWindow.fetch)),t.head.removeChild(n)}catch(n){u&&v.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return e}()||D(s,"fetch",function(t){return function(){const n=new Error;for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];const{method:o,url:l}=function(e){if(0===e.length)return{method:"GET",url:""};if(2===e.length){const[t,n]=e;return{url:Kr(t),method:Ur(n,"method")?String(n.method).toUpperCase():A(t)&&Ur(t,"method")?String(t.method).toUpperCase():"GET"}}const t=e[0];return{url:Kr(t),method:Ur(t,"method")?String(t.method).toUpperCase():"GET"}}(a),d={args:a,fetchData:{method:o,url:l},startTimestamp:1e3*Q(),virtualError:n,headers:Hr(a)};return e||Pr("fetch",{...d}),t.apply(s,a).then(async t=>(e?e(t):Pr("fetch",{...d,endTimestamp:1e3*Q(),response:t}),t),e=>{Pr("fetch",{...d,endTimestamp:1e3*Q(),error:e}),k(e)&&void 0===e.stack&&(e.stack=n.stack,F(e,"framesToPop",1));const t=Ie(),r=t?.getOptions().enhanceFetchErrorMessages??"always";if(!1!==r&&e instanceof TypeError&&("Failed to fetch"===e.message||"Load failed"===e.message||"NetworkError when attempting to fetch resource."===e.message))try{const t=new URL(d.fetchData.url).host;"always"===r?e.message=`${e.message} (${t})`:F(e,"__sentry_fetch_url_host__",t)}catch{}throw e})}})}function Ur(e,t){return!!e&&"object"===typeof e&&!!e[t]}function Kr(e){return"string"===typeof e?e:e?Ur(e,"url")?e.url:e.toString?e.toString():"":""}function Hr(e){const[t,n]=e;try{if("object"===typeof n&&null!==n&&"headers"in n&&n.headers)return new Headers(n.headers);if(A(t))return new Headers(t.headers)}catch{}}const Wr=100;function qr(e,t){const n=Ie(),r=Re();if(!n)return;const{beforeBreadcrumb:a=null,maxBreadcrumbs:i=Wr}=n.getOptions();if(i<=0)return;const o={timestamp:Y(),...e},s=a?f(()=>a(o,t)):o;null!==s&&(n.emit&&n.emit("beforeAddBreadcrumb",s,t),r.addBreadcrumb(s,i))}function Gr(e){return"warn"===e?"warning":["fatal","error","warning","log","info","debug"].includes(e)?e:"log"}function Yr(e){return void 0===e?void 0:e>=400&&e<500?"warning":e>=500?"error":void 0}function Jr(e){if(!e)return{};const t=e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!t)return{};const n=t[6]||"",r=t[8]||"";return{host:t[4],path:t[5],protocol:t[2],search:n,hash:r,relative:t[5]+n+r}}const Qr=s;let Xr,Zr,ea;function ta(){if(!Qr.document)return;const e=Pr.bind(null,"dom"),t=na(e,!0);Qr.document.addEventListener("click",t,!1),Qr.document.addEventListener("keypress",t,!1),["EventTarget","Node"].forEach(t=>{const n=Qr,r=n[t]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(D(r,"addEventListener",function(t){return function(n,r,a){if("click"===n||"keypress"==n)try{const r=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},i=r[n]=r[n]||{refCount:0};if(!i.handler){const r=na(e);i.handler=r,t.call(this,n,r,a)}i.refCount++}catch{}return t.call(this,n,r,a)}}),D(r,"removeEventListener",function(e){return function(t,n,r){if("click"===t||"keypress"==t)try{const n=this.__sentry_instrumentation_handlers__||{},a=n[t];a&&(a.refCount--,a.refCount<=0&&(e.call(this,t,a.handler,r),a.handler=void 0,delete n[t]),0===Object.keys(n).length&&delete this.__sentry_instrumentation_handlers__)}catch{}return e.call(this,t,n,r)}}))})}function na(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n=>{if(!n||n._sentryCaptured)return;const r=function(e){try{return e.target}catch{return null}}(n);if(function(e,t){return"keypress"===e&&(!t?.tagName||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName&&!t.isContentEditable)}(n.type,r))return;F(n,"_sentryCaptured",!0),r&&!r._sentryId&&F(r,"_sentryId",U());const a="keypress"===n.type?"input":n.type;if(!function(e){if(e.type!==Zr)return!1;try{if(!e.target||e.target._sentryId!==ea)return!1}catch{}return!0}(n)){e({event:n,name:a,global:t}),Zr=n.type,ea=r?r._sentryId:void 0}clearTimeout(Xr),Xr=Qr.setTimeout(()=>{ea=void 0,Zr=void 0},1e3)}}const ra="__sentry_xhr_v3__";function aa(){if(!Qr.XMLHttpRequest)return;const e=XMLHttpRequest.prototype;e.open=new Proxy(e.open,{apply(e,t,n){const r=new Error,a=1e3*Q(),i=S(n[0])?n[0].toUpperCase():void 0,o=function(e){if(S(e))return e;try{return e.toString()}catch{}return}(n[1]);if(!i||!o)return e.apply(t,n);t[ra]={method:i,url:o,request_headers:{}},"POST"===i&&o.match(/sentry_key/)&&(t.__sentry_own_request__=!0);const s=()=>{const e=t[ra];if(e&&4===t.readyState){try{e.status_code=t.status}catch{}Pr("xhr",{endTimestamp:1e3*Q(),startTimestamp:a,xhr:t,virtualError:r})}};return"onreadystatechange"in t&&"function"===typeof t.onreadystatechange?t.onreadystatechange=new Proxy(t.onreadystatechange,{apply:(e,t,n)=>(s(),e.apply(t,n))}):t.addEventListener("readystatechange",s),t.setRequestHeader=new Proxy(t.setRequestHeader,{apply(e,t,n){const[r,a]=n,i=t[ra];return i&&S(r)&&S(a)&&(i.request_headers[r.toLowerCase()]=a),e.apply(t,n)}}),e.apply(t,n)}}),e.send=new Proxy(e.send,{apply(e,t,n){const r=t[ra];if(!r)return e.apply(t,n);void 0!==n[0]&&(r.body=n[0]);return Pr("xhr",{startTimestamp:1e3*Q(),xhr:t}),e.apply(t,n)}})}let ia;function oa(e){const t="history";Or(t,e),Tr(t,sa)}function sa(){function e(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];const a=n.length>2?n[2]:void 0;if(a){const t=ia,r=function(e){try{return new URL(e,Qr.location.origin).toString()}catch{return e}}(String(a));if(ia=r,t===r)return e.apply(this,n);Pr("history",{from:t,to:r})}return e.apply(this,n)}}Qr.addEventListener("popstate",()=>{const e=Qr.location.href,t=ia;if(ia=e,t===e)return;Pr("history",{from:t,to:e})}),"history"in Ir&&Ir.history&&(D(Qr.history,"pushState",e),D(Qr.history,"replaceState",e))}function la(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return"<unknown>";try{let n=e;const r=5,a=[];let i=0,o=0;const s=" > ",l=s.length;let d;const c=Array.isArray(t)?t:t.keyAttrs,u=!Array.isArray(t)&&t.maxStringLength||80;for(;n&&i++<r&&(d=da(n,c),!("html"===d||i>1&&o+a.length*l+d.length>=u));)a.push(d),o+=d.length,n=n.parentNode;return a.reverse().join(s)}catch{return"<unknown>"}}function da(e,t){const n=e,r=[];if(!n?.tagName)return"";if("undefined"!==typeof HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}r.push(n.tagName.toLowerCase());const a=t?.length?t.filter(e=>n.getAttribute(e)).map(e=>[e,n.getAttribute(e)]):null;if(a?.length)a.forEach(e=>{r.push(`[${e[0]}="${e[1]}"]`)});else{n.id&&r.push(`#${n.id}`);const e=n.className;if(e&&S(e)){const t=e.split(/\s+/);for(const e of t)r.push(`.${e}`)}}for(const i of["aria-label","type","name","title","alt"]){const e=n.getAttribute(i);e&&r.push(`[${i}="${e}"]`)}return r.join("")}const ca="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,ua=1024,pa=function(){const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"Breadcrumbs",setup(t){var n;e.console&&function(e){const t="console",n=Or(t,e);Tr(t,Rr)}(function(e){return function(t){if(Ie()!==e)return;const n={category:"console",data:{arguments:t.args,logger:"console"},level:Gr(t.level),message:we(t.args," ")};if("assert"===t.level){if(!1!==t.args[0])return;n.message=`Assertion failed: ${we(t.args.slice(1)," ")||"console.assert"}`,n.data.arguments=t.args.slice(1)}qr(n,{input:t.args,level:t.level})}}(t)),e.dom&&(n=function(e,t){return function(n){if(Ie()!==e)return;let r,a,i="object"===typeof t?t.serializeAttribute:void 0,o="object"===typeof t&&"number"===typeof t.maxStringLength?t.maxStringLength:void 0;o&&o>ua&&(ca&&v.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${o} was configured. Sentry will use 1024 instead.`),o=ua),"string"===typeof i&&(i=[i]);try{const e=n.event,t=function(e){return!!e&&!!e.target}(e)?e.target:e;r=la(t,{keyAttrs:i,maxStringLength:o}),a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;if(!Sr.HTMLElement)return null;let n=e;for(let r=0;r<t;r++){if(!n)return null;if(n instanceof HTMLElement){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}n=n.parentNode}return null}(t)}catch{r="<unknown>"}if(0===r.length)return;const s={category:`ui.${n.name}`,message:r};a&&(s.data={"ui.component_name":a}),qr(s,{event:n.event,name:n.name,global:n.global})}}(t,e.dom),Or("dom",n),Tr("dom",ta)),e.xhr&&function(e){Or("xhr",e),Tr("xhr",aa)}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:n,endTimestamp:r}=t,a=t.xhr[ra];if(!n||!r||!a)return;const{method:i,url:o,status_code:s,body:l}=a,d={method:i,url:o,status_code:s},c={xhr:t.xhr,input:l,startTimestamp:n,endTimestamp:r},u={category:"xhr",data:d,type:"http",level:Yr(s)};e.emit("beforeOutgoingRequestBreadcrumb",u,c),qr(u,c)}}(t)),e.fetch&&function(e,t){const n="fetch",r=Or(n,e);Tr(n,()=>Vr(void 0,t))}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:n,endTimestamp:r}=t;if(r&&(!t.fetchData.url.match(/sentry_key/)||"POST"!==t.fetchData.method))if(t.error){const a={data:t.error,input:t.args,startTimestamp:n,endTimestamp:r},i={category:"fetch",data:t.fetchData,level:"error",type:"http"};e.emit("beforeOutgoingRequestBreadcrumb",i,a),qr(i,a)}else{const a=t.response,i={...t.fetchData,status_code:a?.status},o={input:t.args,response:a,startTimestamp:n,endTimestamp:r},s={category:"fetch",data:i,type:"http",level:Yr(i.status_code)};e.emit("beforeOutgoingRequestBreadcrumb",s,o),qr(s,o)}}}(t)),e.history&&oa(function(e){return function(t){if(Ie()!==e)return;let n=t.from,r=t.to;const a=Jr(Nr.location.href);let i=n?Jr(n):void 0;const o=Jr(r);i?.path||(i=a),a.protocol===o.protocol&&a.host===o.host&&(r=o.relative),a.protocol===i.protocol&&a.host===i.host&&(n=i.relative),qr({category:"navigation",data:{from:n,to:r}})}}(t)),e.sentry&&t.on("beforeSendEvent",function(e){return function(t){Ie()===e&&qr({category:"sentry."+("transaction"===t.type?"transaction":"event"),event_id:t.event_id,level:t.level,message:H(t)},{event:t})}}(t))}}};const ma="EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(","),fa=function(){const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"BrowserApiErrors",setupOnce(){e.setTimeout&&D(Nr,"setTimeout",ha),e.setInterval&&D(Nr,"setInterval",ha),e.requestAnimationFrame&&D(Nr,"requestAnimationFrame",ga),e.XMLHttpRequest&&"XMLHttpRequest"in Nr&&D(XMLHttpRequest.prototype,"send",xa);const t=e.eventTarget;if(t){(Array.isArray(t)?t:ma).forEach(t=>function(e,t){const n=Nr,r=n[e]?.prototype;if(!r?.hasOwnProperty?.("addEventListener"))return;D(r,"addEventListener",function(n){return function(r,a,i){try{"function"===typeof a.handleEvent&&(a.handleEvent=zr(a.handleEvent,{mechanism:{data:{handler:fe(a),target:e},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return t.unregisterOriginalCallbacks&&function(e,t,n){e&&"object"===typeof e&&"removeEventListener"in e&&"function"===typeof e.removeEventListener&&e.removeEventListener(t,n)}(this,r,a),n.apply(this,[r,zr(a,{mechanism:{data:{handler:fe(a),target:e},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),i])}}),D(r,"removeEventListener",function(e){return function(t,n,r){try{const a=n.__sentry_wrapped__;a&&e.call(this,t,a,r)}catch{}return e.call(this,t,n,r)}})}(t,e))}}}};function ha(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];const a=n[0];return n[0]=zr(a,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${fe(e)}`}}),e.apply(this,n)}}function ga(e){return function(t){return e.apply(this,[zr(t,{mechanism:{data:{handler:fe(e)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function xa(e){return function(){const t=this;["onload","onerror","onprogress","onreadystatechange"].forEach(e=>{e in t&&"function"===typeof t[e]&&D(t,e,function(t){const n={mechanism:{data:{handler:fe(t)},handled:!1,type:`auto.browser.browserapierrors.xhr.${e}`}},r=T(t);return r&&(n.mechanism.data.handler=fe(r)),zr(t,n)})});for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return e.apply(this,r)}}const va=function(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).lifecycle??"route";return{name:"BrowserSession",setupOnce(){if("undefined"===typeof Nr.document)return void(ca&&v.warn("Using the `browserSessionIntegration` in non-browser environments is not supported."));Mt({ignoreDuration:!0}),Kt();const t=Re();let n=t.getUser();t.addScopeListener(e=>{const t=e.getUser();n?.id===t?.id&&n?.ip_address===t?.ip_address||(Kt(),n=t)}),"route"===e&&oa(e=>{let{from:t,to:n}=e;t!==n&&(Mt({ignoreDuration:!0}),Kt())})}}};function ba(e,t){const n=e.attributes??(e.attributes={});Object.entries(t).forEach(e=>{let[t,r]=e;null==r||t in n||(n[t]=r)})}const ka=()=>({name:"CultureContext",preprocessEvent(e){const t=ya();t&&(e.contexts={...e.contexts,culture:{...t,...e.contexts?.culture}})},processSegmentSpan(e){const t=ya();t&&ba(e,{"culture.locale":t.locale,"culture.timezone":t.timezone,"culture.calendar":t.calendar})}});function ya(){try{const e=Nr.Intl;if(!e)return;const t=e.DateTimeFormat().resolvedOptions();return{locale:t.locale,timezone:t.timeZone,calendar:t.calendar}}catch{return}}let ja=null;function wa(){ja=s.onerror,s.onerror=function(e,t,n,r,a){return Pr("error",{column:r,error:a,line:n,msg:e,url:t}),!!ja&&ja.apply(this,arguments)},s.onerror.__SENTRY_INSTRUMENTED__=!0}let Sa=null;function $a(){Sa=s.onunhandledrejection,s.onunhandledrejection=function(e){return Pr("unhandledrejection",e),!Sa||Sa.apply(this,arguments)},s.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Na=function(){const e={onerror:!0,onunhandledrejection:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"GlobalHandlers",setupOnce(){Error.stackTraceLimit=50},setup(t){e.onerror&&(!function(e){!function(e){const t="error";Or(t,e),Tr(t,wa)}(t=>{const{stackParser:n,attachStacktrace:r}=Ea();if(Ie()!==e||Er())return;const{msg:a,url:i,line:o,column:s,error:l}=t,d=function(e,t,n,r){const a=e.exception=e.exception||{},i=a.values=a.values||[],o=i[0]=i[0]||{},s=o.stacktrace=o.stacktrace||{},l=s.frames=s.frames||[];0===l.length&&l.push({colno:r,lineno:n,filename:za(t)??$r(),function:le,in_app:!0});return e}(yr(n,l||a,void 0,r,!1),i,o,s);d.level="error",Bt(d,{originalException:l,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}(t),_a("onerror")),e.onunhandledrejection&&(!function(e){!function(e){const t="unhandledrejection";Or(t,e),Tr(t,$a)}(t=>{const{stackParser:n,attachStacktrace:r}=Ea();if(Ie()!==e||Er())return;const a=function(e){if(N(e))return e;try{if("reason"in e)return e.reason;if("detail"in e&&"reason"in e.detail)return e.detail.reason}catch{}return e}(t),i=N(a)?{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(a)}`}]}}:yr(n,a,void 0,r,!0);i.level="error",Bt(i,{originalException:a,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}(t),_a("onunhandledrejection"))}}};function _a(e){ca&&v.log(`Global Handler attached: ${e}`)}function Ea(){const e=Ie();return e?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function za(e){if(S(e)&&0!==e.length)return e.startsWith("data:")?`<${function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(e.startsWith("data:")){const n=e.match(/^data:([^;,]+)/),r=n?n[1]:"text/plain",a=e.includes(";base64,"),i=e.indexOf(",");let o="";if(t&&-1!==i){const t=e.slice(i+1);o=t.length>10?`${t.slice(0,10)}... [truncated]`:t}return`data:${r}${a?",base64":""}${o?`,${o}`:""}`}return e}(e,!1)}>`:e}const Ca=()=>({name:"HttpContext",preprocessEvent(e){if(!Nr.navigator&&!Nr.location&&!Nr.document)return;const t=Cr(),n={...t.headers,...e.request?.headers};e.request={...t,...e.request,headers:n}},processSegmentSpan(e){if(!Nr.navigator&&!Nr.location&&!Nr.document)return;const t=Cr();ba(e,{"url.full":t.url||void 0,"http.request.header.user_agent":t.headers["User-Agent"],"http.request.header.referer":t.headers.Referer})}});function Aa(e,t,n,r,a,i){if(!a.exception?.values||!i||!C(i.originalException,Error))return;const o=a.exception.values.length>0?a.exception.values[a.exception.values.length-1]:void 0;o&&(a.exception.values=Da(e,t,r,i.originalException,n,a.exception.values,o,0))}function Da(e,t,n,r,a,i,o,s){if(i.length>=n+1)return i;let l=[...i];if(C(r[a],Error)){Oa(o,s,r);const i=e(t,r[a]),d=l.length;Ta(i,a,d,s),l=Da(e,t,n,r[a],a,[i,...l],i,d)}return Fa(r)&&r.errors.forEach((i,d)=>{if(C(i,Error)){Oa(o,s,r);const c=e(t,i),u=l.length;Ta(c,`errors[${d}]`,u,s),l=Da(e,t,n,i,a,[c,...l],c,u)}}),l}function Fa(e){return Array.isArray(e.errors)}function Oa(e,t,n){e.mechanism={handled:!0,type:"auto.core.linked_errors",...Fa(n)&&{is_exception_group:!0},...e.mechanism,exception_id:t}}function Ta(e,t,n,r){e.mechanism={handled:!0,...e.mechanism,type:"chained",source:t,exception_id:n,parent_id:r}}const Pa=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=e.limit||5,n=e.key||"cause";return{name:"LinkedErrors",preprocessEvent(e,r,a){Aa(mr,a.getOptions().stackParser,n,t,e,r)}}};function La(e,t,n,r){const a={filename:e,function:"<anonymous>"===t?le:t,in_app:!0};return void 0!==n&&(a.lineno=n),void 0!==r&&(a.colno=r),a}const Ra=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Ia=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Ba=/\((\S*)(?::(\d+))(?::(\d+))\)/,Ma=/at (.+?) ?\(data:(.+?),/,Va=[30,e=>{const t=e.match(Ma);if(t)return{filename:`<data:${t[2]}>`,function:t[1]};const n=Ra.exec(e);if(n){const[,e,t,r]=n;return La(e,le,+t,+r)}const r=Ia.exec(e);if(r){if(0===r[2]?.indexOf("eval")){const e=Ba.exec(r[2]);e&&(r[2]=e[1],r[3]=e[2],r[4]=e[3])}const[e,t]=qa(r[1]||le,r[2]);return La(t,e,r[3]?+r[3]:void 0,r[4]?+r[4]:void 0)}}],Ua=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Ka=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Ha=[50,e=>{const t=Ua.exec(e);if(t){if(t[3]&&t[3].indexOf(" > eval")>-1){const e=Ka.exec(t[3]);e&&(t[1]=t[1]||"eval",t[3]=e[1],t[4]=e[2],t[5]="")}let e=t[3],n=t[1]||le;return[n,e]=qa(n,e),La(e,n,t[4]?+t[4]:void 0,t[5]?+t[5]:void 0)}}],Wa=ue(...[Va,Ha]),qa=(e,t)=>{const n=-1!==e.indexOf("safari-extension"),r=-1!==e.indexOf("safari-web-extension");return n||r?[-1!==e.indexOf("@")?e.split("@")[0]:le,n?`safari-extension:${t}`:`safari-web-extension:${t}`]:[e,t]},Ga="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,Ya={};function Ja(e){const t=Ya[e];if(t)return t;let n=Qr[e];if(Mr(n))return Ya[e]=n.bind(Qr);const r=Qr.document;if(r&&"function"===typeof r.createElement)try{const t=r.createElement("iframe");t.hidden=!0,r.head.appendChild(t);const a=t.contentWindow;a?.[e]&&(n=a[e]),r.head.removeChild(t)}catch(a){Ga&&v.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,a)}return n?Ya[e]=n.bind(Qr):n}function Qa(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ja("fetch"),n=0,r=0;return Rn(e,async function(a){const i=a.body.length;n+=i,r++;const o={body:a.body,method:"POST",referrerPolicy:"strict-origin",headers:e.headers,keepalive:n<=6e4&&r<15,...e.fetchOptions};try{const n=await t(e.url,o);return{statusCode:n.status,headers:{"x-sentry-rate-limits":n.headers.get("X-Sentry-Rate-Limits"),"retry-after":n.headers.get("Retry-After")}}}catch(s){throw Ya["fetch"]=void 0,s}finally{n-=i,r--}},Pn(e.bufferSize||40))}const Xa=/^HTML(\w*)Element$/;function Za(e){if("undefined"!==typeof window&&e===window)return"[Window]";if("undefined"!==typeof document&&e===document)return"[Document]";if(function(e){if("undefined"===typeof Element)return!1;try{return e instanceof Element}catch{return!1}}(e)){const t=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(e);if(Xa.test(t))return`[HTMLElement: ${la(e)}]`}}function ei(){return!!function(){if("undefined"===typeof Nr.window)return!1;const e=Nr;if(e.nw)return!1;const t=e.chrome||e.browser;if(!t?.runtime?.id)return!1;const n=$r();return!(Nr===Nr.top&&/^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(n))}()&&(ca&&f(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0)}function ti(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=!e.skipBrowserExtensionCheck&&ei();let n=null==e.defaultIntegrations?[Xt(),rn(),an(),fa(),pa(),Na(),Pa(),on(),Ca(),ka(),va()]:e.defaultIntegrations;const r={...e,enabled:!t&&e.enabled,stackParser:(a=e.stackParser||Wa,Array.isArray(a)?ue(...a):a),integrations:Wt({integrations:e.integrations,defaultIntegrations:n}),transport:e.transport||Qa};var a;return xe(Za),cn(Ar,r)}function ni(e){const t={...e};var n,a;cr(t,"react"),n="react",a={version:r.version},Re().setContext(n,a);const i=ti(t);return xe(ri),i}function ri(e){return _(t=e)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t?"[SyntheticEvent]":Za(e);var t}var ai="popstate";function ii(e){return"object"===typeof e&&null!=e&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function oi(){return mi(function(e,t){let n=t.state?.masked,{pathname:r,search:a,hash:i}=n||e.location;return ci("",{pathname:r,search:a,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default",n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)},function(e,t){return"string"===typeof t?t:ui(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function si(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function li(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function di(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ci(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?pi(t):t,state:n,key:t&&t.key||r||Math.random().toString(36).substring(2,10),unstable_mask:a}}function ui(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function pi(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function mi(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:a=document.defaultView,v5Compat:i=!1}=r,o=a.history,s="POP",l=null,d=c();function c(){return(o.state||{idx:null}).idx}function u(){s="POP";let e=c(),t=null==e?null:e-d;d=e,l&&l({action:s,location:m.location,delta:t})}function p(e){return fi(e)}null==d&&(d=0,o.replaceState({...o.state,idx:d},""));let m={get action(){return s},get location(){return e(a,o)},listen(e){if(l)throw new Error("A history only accepts one active listener");return a.addEventListener(ai,u),l=e,()=>{a.removeEventListener(ai,u),l=null}},createHref:e=>t(a,e),createURL:p,encodeLocation(e){let t=p(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){s="PUSH";let r=ii(e)?e:ci(m.location,e,t);n&&n(r,e),d=c()+1;let u=di(r,d),p=m.createHref(r.unstable_mask||r);try{o.pushState(u,"",p)}catch(f){if(f instanceof DOMException&&"DataCloneError"===f.name)throw f;a.location.assign(p)}i&&l&&l({action:s,location:m.location,delta:1})},replace:function(e,t){s="REPLACE";let r=ii(e)?e:ci(m.location,e,t);n&&n(r,e),d=c();let a=di(r,d),u=m.createHref(r.unstable_mask||r);o.replaceState(a,"",u),i&&l&&l({action:s,location:m.location,delta:0})},go:e=>o.go(e)};return m}function fi(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="http://localhost";"undefined"!==typeof window&&(n="null"!==window.location.origin?window.location.origin:window.location.href),si(n,"No window.location.(origin|href) available to create URL");let r="string"===typeof e?e:ui(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}new WeakMap;function hi(e,t){return gi(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function gi(e,t,n,r){let a=Ai(("string"===typeof t?pi(t):t).pathname||"/",n);if(null==a)return null;let i=xi(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n]);return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(i);let o=null;for(let s=0;null==o&&s<i.length;++s){let e=Ci(a);o=_i(i[s],e,r)}return o}function xi(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e,i){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,s=arguments.length>3?arguments[3]:void 0,l={relativePath:void 0===s?e.path||"":s,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};if(l.relativePath.startsWith("/")){if(!l.relativePath.startsWith(r)&&o)return;si(l.relativePath.startsWith(r),`Absolute route path "${l.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),l.relativePath=l.relativePath.slice(r.length)}let d=Ri([r,l.relativePath]),c=n.concat(l);e.children&&e.children.length>0&&(si(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),xi(e.children,t,c,d,o)),(null!=e.path||e.index)&&t.push({path:d,score:Ni(d,e.index),routesMeta:c})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let n of vi(e.path))i(e,t,!0,n);else i(e,t)}),t}function vi(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,a=n.endsWith("?"),i=n.replace(/\?$/,"");if(0===r.length)return a?[i,""]:[i];let o=vi(r.join("/")),s=[];return s.push(...o.map(e=>""===e?i:[i,e].join("/"))),a&&s.push(...o),s.map(t=>e.startsWith("/")&&""===t?"/":t)}var bi=/^:[\w-]+$/,ki=3,yi=2,ji=1,wi=10,Si=-2,$i=e=>"*"===e;function Ni(e,t){let n=e.split("/"),r=n.length;return n.some($i)&&(r+=Si),t&&(r+=yi),n.filter(e=>!$i(e)).reduce((e,t)=>e+(bi.test(t)?ki:""===t?ji:wi),r)}function _i(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:r}=e,a={},i="/",o=[];for(let s=0;s<r.length;++s){let e=r[s],l=s===r.length-1,d="/"===i?t:t.slice(i.length)||"/",c=Ei({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},d),u=e.route;if(!c&&l&&n&&!r[r.length-1].route.index&&(c=Ei({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},d)),!c)return null;Object.assign(a,c.params),o.push({params:a,pathname:Ri([i,c.pathname]),pathnameBase:Ii(Ri([i,c.pathnameBase])),route:u}),"/"!==c.pathnameBase&&(i=Ri([i,c.pathnameBase]))}return o}function Ei(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=zi(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:a}=t;if("*"===r){let e=s[n]||"";o=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[n];return e[r]=a&&!l?void 0:(l||"").replace(/%2F/g,"/"),e},{}),pathname:i,pathnameBase:o,pattern:e}}function zi(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];li("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,n,a,i)=>{if(r.push({paramName:t,isOptional:null!=n}),n){let t=i.charAt(a+e.length);return t&&"/"!==t?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),a+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":""!==e&&"/"!==e&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function Ci(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return li(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ai(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}var Di=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Fi(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)}),n.length>1?n.join("/"):"/"}function Oi(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ti(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function Pi(e){let t=Ti(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Li(e,t,n){let r,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?r=pi(e):(r={...e},si(!r.pathname||!r.pathname.includes("?"),Oi("?","pathname","search",r)),si(!r.pathname||!r.pathname.includes("#"),Oi("#","pathname","hash",r)),si(!r.search||!r.search.includes("#"),Oi("#","search","hash",r)));let i,o=""===e||""===r.pathname,s=o?"/":r.pathname;if(null==s)i=n;else{let e=t.length-1;if(!a&&s.startsWith("..")){let t=s.split("/");for(;".."===t[0];)t.shift(),e-=1;r.pathname=t.join("/")}i=e>=0?t[e]:"/"}let l=function(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:r,search:a="",hash:i=""}="string"===typeof e?pi(e):e;return r?(r=r.replace(/\/\/+/g,"/"),t=r.startsWith("/")?Fi(r.substring(1),"/"):Fi(r,n)):t=n,{pathname:t,search:Bi(a),hash:Mi(i)}}(r,i),d=s&&"/"!==s&&s.endsWith("/"),c=(o||"."===s)&&n.endsWith("/");return l.pathname.endsWith("/")||!d&&!c||(l.pathname+="/"),l}var Ri=e=>e.join("/").replace(/\/\/+/g,"/"),Ii=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Bi=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",Mi=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";var Vi=class{constructor(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ui(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}function Ki(e){return e.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Hi="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;function Wi(e,t){let n=e;if("string"!==typeof n||!Di.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,a=!1;if(Hi)try{let e=new URL(window.location.href),r=n.startsWith("//")?new URL(e.protocol+n):new URL(n),i=Ai(r.pathname,t);r.origin===e.origin&&null!=i?n=i+r.search+r.hash:a=!0}catch(i){li(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:a,to:n}}Symbol("Uninstrumented");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var qi=["POST","PUT","PATCH","DELETE"],Gi=(new Set(qi),["GET",...qi]);new Set(Gi),Symbol("ResetLoaderData");var Yi=r.createContext(null);Yi.displayName="DataRouter";var Ji=r.createContext(null);Ji.displayName="DataRouterState";var Qi=r.createContext(!1);function Xi(){return r.useContext(Qi)}var Zi=r.createContext({isTransitioning:!1});Zi.displayName="ViewTransition";var eo=r.createContext(new Map);eo.displayName="Fetchers";var to=r.createContext(null);to.displayName="Await";var no=r.createContext(null);no.displayName="Navigation";var ro=r.createContext(null);ro.displayName="Location";var ao=r.createContext({outlet:null,matches:[],isDataRoute:!1});ao.displayName="Route";var io=r.createContext(null);io.displayName="RouteError";var oo="REACT_ROUTER_ERROR";function so(){return null!=r.useContext(ro)}function lo(){return si(so(),"useLocation() may be used only in the context of a <Router> component."),r.useContext(ro).location}var co="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function uo(e){r.useContext(no).static||r.useLayoutEffect(e)}function po(){let{isDataRoute:e}=r.useContext(ao);return e?function(){let{router:e}=So("useNavigate"),t=No("useNavigate"),n=r.useRef(!1);uo(()=>{n.current=!0});let a=r.useCallback(async function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};li(n.current,co),n.current&&("number"===typeof r?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...a}))},[e,t]);return a}():function(){si(so(),"useNavigate() may be used only in the context of a <Router> component.");let e=r.useContext(Yi),{basename:t,navigator:n}=r.useContext(no),{matches:a}=r.useContext(ao),{pathname:i}=lo(),o=JSON.stringify(Pi(a)),s=r.useRef(!1);uo(()=>{s.current=!0});let l=r.useCallback(function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(li(s.current,co),!s.current)return;if("number"===typeof r)return void n.go(r);let l=Li(r,JSON.parse(o),i,"path"===a.relative);null==e&&"/"!==t&&(l.pathname="/"===l.pathname?t:Ri([t,l.pathname])),(a.replace?n.replace:n.push)(l,a.state,a)},[t,n,o,i,e]);return l}()}r.createContext(null);function mo(){let{matches:e}=r.useContext(ao),t=e[e.length-1];return t?t.params:{}}function fo(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:n}=r.useContext(ao),{pathname:a}=lo(),i=JSON.stringify(Pi(n));return r.useMemo(()=>Li(e,JSON.parse(i),a,"path"===t),[e,i,a,t])}function ho(e,t,n){si(so(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=r.useContext(no),{matches:i}=r.useContext(ao),o=i[i.length-1],s=o?o.params:{},l=o?o.pathname:"/",d=o?o.pathnameBase:"/",c=o&&o.route;{let e=c&&c.path||"";zo(l,!c||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let u,p=lo();if(t){let e="string"===typeof t?pi(t):t;si("/"===d||e.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${e.pathname}" was given in the \`location\` prop.`),u=e}else u=p;let m=u.pathname||"/",f=m;if("/"!==d){let e=d.replace(/^\//,"").split("/");f="/"+m.replace(/^\//,"").split("/").slice(e.length).join("/")}let h=hi(e,{pathname:f});li(c||null!=h,`No routes matched location "${u.pathname}${u.search}${u.hash}" `),li(null==h||void 0!==h[h.length-1].route.element||void 0!==h[h.length-1].route.Component||void 0!==h[h.length-1].route.lazy,`Matched leaf route at location "${u.pathname}${u.search}${u.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let g=jo(h&&h.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:Ri([d,a.encodeLocation?a.encodeLocation(e.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?d:Ri([d,a.encodeLocation?a.encodeLocation(e.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathnameBase])})),i,n);return t&&g?r.createElement(ro.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...u},navigationType:"POP"}},g):g}function go(){let e=_o(),t=Ui(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=r.createElement(r.Fragment,null,r.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),r.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",r.createElement("code",{style:o},"ErrorBoundary")," or"," ",r.createElement("code",{style:o},"errorElement")," prop on your route.")),r.createElement(r.Fragment,null,r.createElement("h2",null,"Unexpected Application Error!"),r.createElement("h3",{style:{fontStyle:"italic"}},t),n?r.createElement("pre",{style:i},n):null,s)}var xo=r.createElement(go,null),vo=class extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&"object"===typeof e&&e&&"digest"in e&&"string"===typeof e.digest){const t=function(e){if(e.startsWith(`${oo}:ROUTE_ERROR_RESPONSE:{`))try{let t=JSON.parse(e.slice(40));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText)return new Vi(t.status,t.statusText,t.data)}catch{}}(e.digest);t&&(e=t)}let t=void 0!==e?r.createElement(ao.Provider,{value:this.props.routeContext},r.createElement(io.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?r.createElement(ko,{error:e},t):t}};vo.contextType=Qi;var bo=new WeakMap;function ko(e){let{children:t,error:n}=e,{basename:a}=r.useContext(no);if("object"===typeof n&&n&&"digest"in n&&"string"===typeof n.digest){let e=function(e){if(e.startsWith(`${oo}:REDIRECT:{`))try{let t=JSON.parse(e.slice(28));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText&&"string"===typeof t.location&&"boolean"===typeof t.reloadDocument&&"boolean"===typeof t.replace)return t}catch{}}(n.digest);if(e){let t=bo.get(n);if(t)throw t;let i=Wi(e.location,a);if(Hi&&!bo.get(n)){if(!i.isExternal&&!e.reloadDocument){const t=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw bo.set(n,t),t}window.location.href=i.absoluteURL||i.to}return r.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return t}function yo(e){let{routeContext:t,match:n,children:a}=e,i=r.useContext(Yi);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),r.createElement(ao.Provider,{value:t},a)}function jo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,a=n?.state;if(null==e){if(!a)return null;if(a.errors)e=a.matches;else{if(0!==t.length||a.initialized||!(a.matches.length>0))return null;e=a.matches}}let i=e,o=a?.errors;if(null!=o){let e=i.findIndex(e=>e.route.id&&void 0!==o?.[e.route.id]);si(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),i=i.slice(0,Math.min(i.length,e+1))}let s=!1,l=-1;if(n&&a){s=a.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(l=e),t.route.id){let{loaderData:e,errors:r}=a,o=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!r||void 0===r[t.route.id]);if(t.route.lazy||o){n.isStatic&&(s=!0),i=l>=0?i.slice(0,l+1):[i[0]];break}}}}let d=n?.onError,c=a&&d?(e,t)=>{d(e,{location:a.location,params:a.matches?.[0]?.params??{},unstable_pattern:Ki(a.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,d)=>{let u,p=!1,m=null,f=null;a&&(u=o&&n.route.id?o[n.route.id]:void 0,m=n.route.errorElement||xo,s&&(l<0&&0===d?(zo("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),p=!0,f=null):l===d&&(p=!0,f=n.route.hydrateFallbackElement||null)));let h=t.concat(i.slice(0,d+1)),g=()=>{let t;return t=u?m:p?f:n.route.Component?r.createElement(n.route.Component,null):n.route.element?n.route.element:e,r.createElement(yo,{match:n,routeContext:{outlet:e,matches:h,isDataRoute:null!=a},children:t})};return a&&(n.route.ErrorBoundary||n.route.errorElement||0===d)?r.createElement(vo,{location:a.location,revalidation:a.revalidation,component:m,error:u,children:g(),routeContext:{outlet:null,matches:h,isDataRoute:!0},onError:c}):g()},null)}function wo(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function So(e){let t=r.useContext(Yi);return si(t,wo(e)),t}function $o(e){let t=r.useContext(Ji);return si(t,wo(e)),t}function No(e){let t=function(e){let t=r.useContext(ao);return si(t,wo(e)),t}(e),n=t.matches[t.matches.length-1];return si(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function _o(){let e=r.useContext(io),t=$o("useRouteError"),n=No("useRouteError");return void 0!==e?e:t.errors?.[n]}var Eo={};function zo(e,t,n){t||Eo[e]||(Eo[e]=!0,li(!1,n))}var Co={};function Ao(e,t){e||Co[t]||(Co[t]=!0,console.warn(t))}a.useOptimistic;r.memo(Do);function Do(e){let{routes:t,future:n,state:r,isStatic:a,onError:i}=e;return ho(t,void 0,{state:r,isStatic:a,onError:i,future:n})}function Fo(e){let{to:t,replace:n,state:a,relative:i}=e;si(so(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=r.useContext(no);li(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:s}=r.useContext(ao),{pathname:l}=lo(),d=po(),c=Li(t,Pi(s),l,"path"===i),u=JSON.stringify(c);return r.useEffect(()=>{d(JSON.parse(u),{replace:n,state:a,relative:i})},[d,u,i,n,a]),null}function Oo(e){si(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function To(e){let{basename:t="/",children:n=null,location:a,navigationType:i="POP",navigator:o,static:s=!1,unstable_useTransitions:l}=e;si(!so(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=t.replace(/^\/*/,"/"),c=r.useMemo(()=>({basename:d,navigator:o,static:s,unstable_useTransitions:l,future:{}}),[d,o,s,l]);"string"===typeof a&&(a=pi(a));let{pathname:u="/",search:p="",hash:m="",state:f=null,key:h="default",unstable_mask:g}=a,x=r.useMemo(()=>{let e=Ai(u,d);return null==e?null:{location:{pathname:e,search:p,hash:m,state:f,key:h,unstable_mask:g},navigationType:i}},[d,u,p,m,f,h,i,g]);return li(null!=x,`<Router basename="${d}"> is not able to match the URL "${u}${p}${m}" because it does not start with the basename, so the <Router> won't render anything.`),null==x?null:r.createElement(no.Provider,{value:c},r.createElement(ro.Provider,{children:n,value:x}))}function Po(e){let{children:t,location:n}=e;return ho(Lo(t),n)}r.Component;function Lo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[];return r.Children.forEach(e,(e,a)=>{if(!r.isValidElement(e))return;let i=[...t,a];if(e.type===r.Fragment)return void n.push.apply(n,Lo(e.props.children,i));si(e.type===Oo,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),si(!e.props.index||!e.props.children,"An index route cannot have child routes.");let o={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(o.children=Lo(e.props.children,i)),n.push(o)}),n}var Ro="get",Io="application/x-www-form-urlencoded";function Bo(e){return"undefined"!==typeof HTMLElement&&e instanceof HTMLElement}function Mo(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new URLSearchParams("string"===typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}var Vo=null;var Uo=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ko(e){return null==e||Uo.has(e)?e:(li(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Io}"`),null)}function Ho(e,t){let n,r,a,i,o;if(Bo(s=e)&&"form"===s.tagName.toLowerCase()){let o=e.getAttribute("action");r=o?Ai(o,t):null,n=e.getAttribute("method")||Ro,a=Ko(e.getAttribute("enctype"))||Io,i=new FormData(e)}else if(function(e){return Bo(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Bo(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let o=e.form;if(null==o)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||o.getAttribute("action");if(r=s?Ai(s,t):null,n=e.getAttribute("formmethod")||o.getAttribute("method")||Ro,a=Ko(e.getAttribute("formenctype"))||Ko(o.getAttribute("enctype"))||Io,i=new FormData(o,e),!function(){if(null===Vo)try{new FormData(document.createElement("form"),0),Vo=!1}catch(e){Vo=!0}return Vo}()){let{name:t,type:n,value:r}=e;if("image"===n){let e=t?`${t}.`:"";i.append(`${e}x`,"0"),i.append(`${e}y`,"0")}else t&&i.append(t,r)}}else{if(Bo(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Ro,r=null,a=Io,o=e}var s;return i&&"text/plain"===a&&(o=i,i=void 0),{action:r,method:n.toLowerCase(),encType:a,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;function Wo(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}Symbol("SingleFetchRedirect");function qo(e,t,n,r){let a="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return n?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${r}`:a.pathname=`${a.pathname}.${r}`:"/"===a.pathname?a.pathname=`_root.${r}`:t&&"/"===Ai(a.pathname,t)?a.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${r}`,a}async function Go(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Yo(e){return null!=e&&"string"===typeof e.page}function Jo(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Qo(e,t,n,r,a,i){let o=(e,t)=>!n[t]||e.route.id!==n[t].route.id,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith("*")&&n[t].params["*"]!==e.params["*"];return"assets"===i?t.filter((e,t)=>o(e,t)||s(e,t)):"data"===i?t.filter((t,i)=>{let l=r.routes[t.route.id];if(!l||!l.hasLoader)return!1;if(o(t,i)||s(t,i))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof r)return r}return!0}):[]}function Xo(e,t){let{includeHydrateFallback:n}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r=e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let a=[r.module];return r.clientActionModule&&(a=a.concat(r.clientActionModule)),r.clientLoaderModule&&(a=a.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(a=a.concat(r.hydrateFallbackModule)),r.imports&&(a=a.concat(r.imports)),a}).flat(1),[...new Set(r)];var r}function Zo(e,t){let n=new Set,r=new Set(t);return e.reduce((e,a)=>{if(t&&!Yo(a)&&"script"===a.as&&a.href&&r.has(a.href))return e;let i=JSON.stringify(function(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}(a));return n.has(i)||(n.add(i),e.push({key:i,link:a})),e},[])}function es(e,t){return"lazy"===e.mode&&!0===t}function ts(){let e=r.useContext(Yi);return Wo(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function ns(){let e=r.useContext(Ji);return Wo(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var rs=r.createContext(void 0);function as(){let e=r.useContext(rs);return Wo(e,"You must render this element inside a <HydratedRouter> element"),e}function is(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function os(e,t,n){if(n&&!cs)return[e[0]];if(t){let n=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,n+1)}return e}rs.displayName="FrameworkContext";function ss(e){let{page:t,...n}=e,{router:a}=ts(),i=r.useMemo(()=>hi(a.routes,t,a.basename),[a.routes,t,a.basename]);return i?r.createElement(ds,{page:t,matches:i,...n}):null}function ls(e){let{manifest:t,routeModules:n}=as(),[a,i]=r.useState([]);return r.useEffect(()=>{let r=!1;return async function(e,t,n){let r=await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Go(r,n);return e.links?e.links():[]}return[]}));return Zo(r.flat(1).filter(Jo).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),a}function ds(e){let{page:t,matches:n,...a}=e,i=lo(),{future:o,manifest:s,routeModules:l}=as(),{basename:d}=ts(),{loaderData:c,matches:u}=ns(),p=r.useMemo(()=>Qo(t,n,u,s,i,"data"),[t,n,u,s,i]),m=r.useMemo(()=>Qo(t,n,u,s,i,"assets"),[t,n,u,s,i]),f=r.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let e=new Set,r=!1;if(n.forEach(t=>{let n=s.routes[t.route.id];n&&n.hasLoader&&(!p.some(e=>e.route.id===t.route.id)&&t.route.id in c&&l[t.route.id]?.shouldRevalidate||n.hasClientLoader?r=!0:e.add(t.route.id))}),0===e.size)return[];let a=qo(t,d,o.unstable_trailingSlashAwareDataRequests,"data");return r&&e.size>0&&a.searchParams.set("_routes",n.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[a.pathname+a.search]},[d,o.unstable_trailingSlashAwareDataRequests,c,i,s,p,n,t,l]),h=r.useMemo(()=>Xo(m,s),[m,s]),g=ls(m);return r.createElement(r.Fragment,null,f.map(e=>r.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...a})),h.map(e=>r.createElement("link",{key:e,rel:"modulepreload",href:e,...a})),g.map(e=>{let{key:t,link:n}=e;return r.createElement("link",{key:t,nonce:a.nonce,...n,crossOrigin:n.crossOrigin??a.crossOrigin})}))}var cs=!1;function us(e){let{manifest:t,serverHandoffString:n,isSpaMode:a,renderMeta:i,routeDiscovery:o,ssr:s}=as(),{router:l,static:d,staticContext:c}=ts(),{matches:u}=ns(),p=Xi(),m=es(o,s);i&&(i.didRenderScripts=!0);let f=os(u,null,a);r.useEffect(()=>{cs=!0},[]);let h=r.useMemo(()=>{if(p)return null;let a=c?`window.__reactRouterContext = ${n};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",i=d?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${m?"":`import ${JSON.stringify(t.url)}`};\n${f.map((e,n)=>{let r=`route${n}`,a=t.routes[e.route.id];Wo(a,`Route ${e.route.id} not found in manifest`);let{clientActionModule:i,clientLoaderModule:o,clientMiddlewareModule:s,hydrateFallbackModule:l,module:d}=a,c=[...i?[{module:i,varName:`${r}_clientAction`}]:[],...o?[{module:o,varName:`${r}_clientLoader`}]:[],...s?[{module:s,varName:`${r}_clientMiddleware`}]:[],...l?[{module:l,varName:`${r}_HydrateFallback`}]:[],{module:d,varName:`${r}_main`}];return 1===c.length?`import * as ${r} from ${JSON.stringify(d)};`:[c.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${r} = {${c.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${m?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:n,...r}=e,a=new Set(t.state.matches.map(e=>e.route.id)),i=t.state.location.pathname.split("/").filter(Boolean),o=["/"];for(i.pop();i.length>0;)o.push(`/${i.join("/")}`),i.pop();o.forEach(e=>{let n=hi(t.routes,e,t.basename);n&&n.forEach(e=>a.add(e.route.id))});let s=[...a].reduce((e,t)=>Object.assign(e,{[t]:r.routes[t]}),{});return{...r,routes:s,sri:!!n||void 0}}(t,l),null,2)};`:""}\n  window.__reactRouterRouteModules = {${f.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return r.createElement(r.Fragment,null,r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:a},type:void 0}),r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:i},type:"module",async:!0}))},[]),g=cs||p?[]:(x=t.entry.imports.concat(Xo(f,t,{includeHydrateFallback:!0})),[...new Set(x)]);var x;let v="object"===typeof t.sri?t.sri:{};return Ao(!p,"The <Scripts /> element is a no-op when using RSC and can be safely removed."),cs||p?null:r.createElement(r.Fragment,null,"object"===typeof t.sri?r.createElement("script",{...e,"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:v})}}):null,m?null:r.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:v[t.url],suppressHydrationWarning:!0}),r.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:v[t.entry.module],suppressHydrationWarning:!0}),g.map(t=>r.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:v[t],suppressHydrationWarning:!0})),h)}function ps(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}r.Component;function ms(e){let{error:t,isOutsideRemixApp:n}=e;console.error(t);let a,i=r.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(Ui(t))return r.createElement(fs,{title:"Unhandled Thrown Response!"},r.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),i);if(t instanceof Error)a=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);a=new Error(e)}return r.createElement(fs,{title:"Application Error!",isOutsideRemixApp:n},r.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),r.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},a.stack),i)}function fs(e){let{title:t,renderScripts:n,isOutsideRemixApp:a,children:i}=e,{routeModules:o}=as();return o.root?.Layout&&!a?i:r.createElement("html",{lang:"en"},r.createElement("head",null,r.createElement("meta",{charSet:"utf-8"}),r.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),r.createElement("title",null,t)),r.createElement("body",null,r.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},i,n?r.createElement(us,null):null)))}var hs="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{hs&&(window.__reactRouterVersion="7.13.2")}catch(oy){}function gs(e){let{basename:t,children:n,unstable_useTransitions:a,window:i}=e,o=r.useRef();null==o.current&&(o.current=oi({window:i,v5Compat:!0}));let s=o.current,[l,d]=r.useState({action:s.action,location:s.location}),c=r.useCallback(e=>{!1===a?d(e):r.startTransition(()=>d(e))},[a]);return r.useLayoutEffect(()=>s.listen(c),[s,c]),r.createElement(To,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:s,unstable_useTransitions:a})}var xs=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vs=r.forwardRef(function(e,t){let{onClick:n,discover:a="render",prefetch:i="none",relative:o,reloadDocument:s,replace:l,unstable_mask:d,state:c,target:u,to:p,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:h,...g}=e,{basename:x,navigator:v,unstable_useTransitions:b}=r.useContext(no),k="string"===typeof p&&xs.test(p),y=Wi(p,x);p=y.to;let j=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};si(so(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=r.useContext(no),{hash:i,pathname:o,search:s}=fo(e,{relative:t}),l=o;return"/"!==n&&(l="/"===o?n:Ri([n,o])),a.createHref({pathname:l,search:s,hash:i})}(p,{relative:o}),w=lo(),S=null;if(d){let e=Li(d,[],w.unstable_mask?w.unstable_mask.pathname:"/",!0);"/"!==x&&(e.pathname="/"===e.pathname?x:Ri([x,e.pathname])),S=v.createHref(e)}let[$,N,_]=function(e,t){let n=r.useContext(rs),[a,i]=r.useState(!1),[o,s]=r.useState(!1),{onFocus:l,onBlur:d,onMouseEnter:c,onMouseLeave:u,onTouchStart:p}=t,m=r.useRef(null);r.useEffect(()=>{if("render"===e&&s(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{s(e.isIntersecting)})},{threshold:.5});return m.current&&e.observe(m.current),()=>{e.disconnect()}}},[e]),r.useEffect(()=>{if(a){let e=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(e)}}},[a]);let f=()=>{i(!0)},h=()=>{i(!1),s(!1)};return n?"intent"!==e?[o,m,{}]:[o,m,{onFocus:is(l,f),onBlur:is(d,h),onMouseEnter:is(c,f),onMouseLeave:is(u,h),onTouchStart:is(p,f)}]:[!1,m,{}]}(i,g),E=function(e){let{target:t,replace:n,unstable_mask:a,state:i,preventScrollReset:o,relative:s,viewTransition:l,unstable_defaultShouldRevalidate:d,unstable_useTransitions:c}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=po(),p=lo(),m=fo(e,{relative:s});return r.useCallback(f=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(f,t)){f.preventDefault();let t=void 0!==n?n:ui(p)===ui(m),h=()=>u(e,{replace:t,unstable_mask:a,state:i,preventScrollReset:o,relative:s,viewTransition:l,unstable_defaultShouldRevalidate:d});c?r.startTransition(()=>h()):h()}},[p,u,m,n,a,i,t,e,o,s,l,d,c])}(p,{replace:l,unstable_mask:d,state:c,target:u,preventScrollReset:m,relative:o,viewTransition:f,unstable_defaultShouldRevalidate:h,unstable_useTransitions:b});let z=!(y.isExternal||s),C=r.createElement("a",{...g,..._,href:(z?S:void 0)||y.absoluteURL||j,onClick:z?function(e){n&&n(e),e.defaultPrevented||E(e)}:n,ref:ps(t,N),target:u,"data-discover":k||"render"!==a?void 0:"true"});return $&&!k?r.createElement(r.Fragment,null,C,r.createElement(ss,{page:j})):C});vs.displayName="Link",r.forwardRef(function(e,t){let{"aria-current":n="page",caseSensitive:a=!1,className:i="",end:o=!1,style:s,to:l,viewTransition:d,children:c,...u}=e,p=fo(l,{relative:u.relative}),m=lo(),f=r.useContext(Ji),{navigator:h,basename:g}=r.useContext(no),x=null!=f&&function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.useContext(Zi);si(null!=n,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=ys("useViewTransitionState"),i=fo(e,{relative:t});if(!n.isTransitioning)return!1;let o=Ai(n.currentLocation.pathname,a)||n.currentLocation.pathname,s=Ai(n.nextLocation.pathname,a)||n.nextLocation.pathname;return null!=Ei(i.pathname,s)||null!=Ei(i.pathname,o)}(p)&&!0===d,v=h.encodeLocation?h.encodeLocation(p).pathname:p.pathname,b=m.pathname,k=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;a||(b=b.toLowerCase(),k=k?k.toLowerCase():null,v=v.toLowerCase()),k&&g&&(k=Ai(k,g)||k);const y="/"!==v&&v.endsWith("/")?v.length-1:v.length;let j,w=b===v||!o&&b.startsWith(v)&&"/"===b.charAt(y),S=null!=k&&(k===v||!o&&k.startsWith(v)&&"/"===k.charAt(v.length)),$={isActive:w,isPending:S,isTransitioning:x},N=w?n:void 0;j="function"===typeof i?i($):[i,w?"active":null,S?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let _="function"===typeof s?s($):s;return r.createElement(vs,{...u,"aria-current":N,className:j,ref:t,style:_,to:l,viewTransition:d},"function"===typeof c?c($):c)}).displayName="NavLink";var bs=r.forwardRef((e,t)=>{let{discover:n="render",fetcherKey:a,navigate:i,reloadDocument:o,replace:s,state:l,method:d=Ro,action:c,onSubmit:u,relative:p,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:h,...g}=e,{unstable_useTransitions:x}=r.useContext(no),v=$s(),b=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:n}=r.useContext(no),a=r.useContext(ao);si(a,"useFormAction must be used inside a RouteContext");let[i]=a.matches.slice(-1),o={...fo(e||".",{relative:t})},s=lo();if(null==e){o.search=s.search;let e=new URLSearchParams(o.search),t=e.getAll("index"),n=t.some(e=>""===e);if(n){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let n=e.toString();o.search=n?`?${n}`:""}}e&&"."!==e||!i.route.index||(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index");"/"!==n&&(o.pathname="/"===o.pathname?n:Ri([n,o.pathname]));return ui(o)}(c,{relative:p}),k="get"===d.toLowerCase()?"get":"post",y="string"===typeof c&&xs.test(c);return r.createElement("form",{ref:t,method:k,action:b,onSubmit:o?u:e=>{if(u&&u(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,n=t?.getAttribute("formmethod")||d,o=()=>v(t||e.currentTarget,{fetcherKey:a,method:n,navigate:i,replace:s,state:l,relative:p,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:h});x&&!1!==i?r.startTransition(()=>o()):o()},...g,"data-discover":y||"render"!==n?void 0:"true"})});function ks(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ys(e){let t=r.useContext(Yi);return si(t,ks(e)),t}function js(e){li("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=r.useRef(Mo(e)),n=r.useRef(!1),a=lo(),i=r.useMemo(()=>function(e,t){let n=Mo(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}(a.search,n.current?null:t.current),[a.search]),o=po(),s=r.useCallback((e,t)=>{const r=Mo("function"===typeof e?e(new URLSearchParams(i)):e);n.current=!0,o("?"+r,t)},[o,i]);return[i,s]}bs.displayName="Form";var ws=0,Ss=()=>`__${String(++ws)}__`;function $s(){let{router:e}=ys("useSubmit"),{basename:t}=r.useContext(no),n=No("useRouteId"),a=e.fetch,i=e.navigate;return r.useCallback(async function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:o,method:s,encType:l,formData:d,body:c}=Ho(e,t);if(!1===r.navigate){let e=r.fetcherKey||Ss();await a(e,n,r.action||o,{unstable_defaultShouldRevalidate:r.unstable_defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:d,body:c,formMethod:r.method||s,formEncType:r.encType||l,flushSync:r.flushSync})}else await i(r.action||o,{unstable_defaultShouldRevalidate:r.unstable_defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:d,body:c,formMethod:r.method||s,formEncType:r.encType||l,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[a,i,t,n])}var Ns=function(){return Ns=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},Ns.apply(this,arguments)};Object.create;function _s(e,t,n){if(n||2===arguments.length)for(var r,a=0,i=t.length;a<i;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var Es={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},zs="-ms-",Cs="-moz-",As="-webkit-",Ds="comm",Fs="rule",Os="decl",Ts="@keyframes",Ps=Math.abs,Ls=String.fromCharCode,Rs=Object.assign;function Is(e){return e.trim()}function Bs(e,t){return(e=t.exec(e))?e[0]:e}function Ms(e,t,n){return e.replace(t,n)}function Vs(e,t,n){return e.indexOf(t,n)}function Us(e,t){return 0|e.charCodeAt(t)}function Ks(e,t,n){return e.slice(t,n)}function Hs(e){return e.length}function Ws(e){return e.length}function qs(e,t){return t.push(e),e}function Gs(e,t){return e.filter(function(e){return!Bs(e,t)})}var Ys=1,Js=1,Qs=0,Xs=0,Zs=0,el="";function tl(e,t,n,r,a,i,o,s){return{value:e,root:t,parent:n,type:r,props:a,children:i,line:Ys,column:Js,length:o,return:"",siblings:s}}function nl(e,t){return Rs(tl("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function rl(e){for(;e.root;)e=nl(e.root,{children:[e]});qs(e,e.siblings)}function al(){return Zs=Xs>0?Us(el,--Xs):0,Js--,10===Zs&&(Js=1,Ys--),Zs}function il(){return Zs=Xs<Qs?Us(el,Xs++):0,Js++,10===Zs&&(Js=1,Ys++),Zs}function ol(){return Us(el,Xs)}function sl(){return Xs}function ll(e,t){return Ks(el,e,t)}function dl(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function cl(e){return Ys=Js=1,Qs=Hs(el=e),Xs=0,[]}function ul(e){return el="",e}function pl(e){return Is(ll(Xs-1,hl(91===e?e+2:40===e?e+1:e)))}function ml(e){for(;(Zs=ol())&&Zs<33;)il();return dl(e)>2||dl(Zs)>3?"":" "}function fl(e,t){for(;--t&&il()&&!(Zs<48||Zs>102||Zs>57&&Zs<65||Zs>70&&Zs<97););return ll(e,sl()+(t<6&&32==ol()&&32==il()))}function hl(e){for(;il();)switch(Zs){case e:return Xs;case 34:case 39:34!==e&&39!==e&&hl(Zs);break;case 40:41===e&&hl(e);break;case 92:il()}return Xs}function gl(e,t){for(;il()&&e+Zs!==57&&(e+Zs!==84||47!==ol()););return"/*"+ll(t,Xs-1)+"*"+Ls(47===e?e:il())}function xl(e){for(;!dl(ol());)il();return ll(e,Xs)}function vl(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function bl(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case"@namespace":case Os:return e.return=e.return||e.value;case Ds:return"";case Ts:return e.return=e.value+"{"+vl(e.children,r)+"}";case Fs:if(!Hs(e.value=e.props.join(",")))return""}return Hs(n=vl(e.children,r))?e.return=e.value+"{"+n+"}":""}function kl(e,t,n){switch(function(e,t){return 45^Us(e,0)?(((t<<2^Us(e,0))<<2^Us(e,1))<<2^Us(e,2))<<2^Us(e,3):0}(e,t)){case 5103:return As+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return As+e+e;case 4855:return As+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return Cs+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return As+e+Cs+e+zs+e+e;case 5936:switch(Us(e,t+11)){case 114:return As+e+zs+Ms(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return As+e+zs+Ms(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return As+e+zs+Ms(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return As+e+zs+e+e;case 6165:return As+e+zs+"flex-"+e+e;case 5187:return As+e+Ms(e,/(\w+).+(:[^]+)/,As+"box-$1$2"+zs+"flex-$1$2")+e;case 5443:return As+e+zs+"flex-item-"+Ms(e,/flex-|-self/g,"")+(Bs(e,/flex-|baseline/)?"":zs+"grid-row-"+Ms(e,/flex-|-self/g,""))+e;case 4675:return As+e+zs+"flex-line-pack"+Ms(e,/align-content|flex-|-self/g,"")+e;case 5548:return As+e+zs+Ms(e,"shrink","negative")+e;case 5292:return As+e+zs+Ms(e,"basis","preferred-size")+e;case 6060:return As+"box-"+Ms(e,"-grow","")+As+e+zs+Ms(e,"grow","positive")+e;case 4554:return As+Ms(e,/([^-])(transform)/g,"$1"+As+"$2")+e;case 6187:return Ms(Ms(Ms(e,/(zoom-|grab)/,As+"$1"),/(image-set)/,As+"$1"),e,"")+e;case 5495:case 3959:return Ms(e,/(image-set\([^]*)/,As+"$1$`$1");case 4968:return Ms(Ms(e,/(.+:)(flex-)?(.*)/,As+"box-pack:$3"+zs+"flex-pack:$3"),/space-between/,"justify")+As+e+e;case 4200:if(!Bs(e,/flex-|baseline/))return zs+"grid-column-align"+Ks(e,t)+e;break;case 2592:case 3360:return zs+Ms(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Bs(e.props,/grid-\w+-end/)})?~Vs(e+(n=n[t].value),"span",0)?e:zs+Ms(e,"-start","")+e+zs+"grid-row-span:"+(~Vs(n,"span",0)?Bs(n,/\d+/):+Bs(n,/\d+/)-+Bs(e,/\d+/))+";":zs+Ms(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return Bs(e.props,/grid-\w+-start/)})?e:zs+Ms(Ms(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ms(e,/(.+)-inline(.+)/,As+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Hs(e)-1-t>6)switch(Us(e,t+1)){case 109:if(45!==Us(e,t+4))break;case 102:return Ms(e,/(.+:)(.+)-([^]+)/,"$1"+As+"$2-$3$1"+Cs+(108==Us(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Vs(e,"stretch",0)?kl(Ms(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return Ms(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,a,i,o,s){return zs+n+":"+r+s+(a?zs+n+"-span:"+(i?o:+o-+r)+s:"")+e});case 4949:if(121===Us(e,t+6))return Ms(e,":",":"+As)+e;break;case 6444:switch(Us(e,45===Us(e,14)?18:11)){case 120:return Ms(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+As+(45===Us(e,14)?"inline-":"")+"box$3$1"+As+"$2$3$1"+zs+"$2box$3")+e;case 100:return Ms(e,":",":"+zs)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ms(e,"scroll-","scroll-snap-")+e}return e}function yl(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Os:return void(e.return=kl(e.value,e.length,n));case Ts:return vl([nl(e,{value:Ms(e.value,"@","@"+As)})],r);case Fs:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(Bs(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":rl(nl(e,{props:[Ms(t,/:(read-\w+)/,":-moz-$1")]})),rl(nl(e,{props:[t]})),Rs(e,{props:Gs(n,r)});break;case"::placeholder":rl(nl(e,{props:[Ms(t,/:(plac\w+)/,":"+As+"input-$1")]})),rl(nl(e,{props:[Ms(t,/:(plac\w+)/,":-moz-$1")]})),rl(nl(e,{props:[Ms(t,/:(plac\w+)/,zs+"input-$1")]})),rl(nl(e,{props:[t]})),Rs(e,{props:Gs(n,r)})}return""})}}function jl(e){return ul(wl("",null,null,null,[""],e=cl(e),0,[0],e))}function wl(e,t,n,r,a,i,o,s,l){for(var d=0,c=0,u=o,p=0,m=0,f=0,h=1,g=1,x=1,v=0,b="",k=a,y=i,j=r,w=b;g;)switch(f=v,v=il()){case 40:if(108!=f&&58==Us(w,u-1)){-1!=Vs(w+=Ms(pl(v),"&","&\f"),"&\f",Ps(d?s[d-1]:0))&&(x=-1);break}case 34:case 39:case 91:w+=pl(v);break;case 9:case 10:case 13:case 32:w+=ml(f);break;case 92:w+=fl(sl()-1,7);continue;case 47:switch(ol()){case 42:case 47:qs($l(gl(il(),sl()),t,n,l),l),5!=dl(f||1)&&5!=dl(ol()||1)||!Hs(w)||" "===Ks(w,-1,void 0)||(w+=" ");break;default:w+="/"}break;case 123*h:s[d++]=Hs(w)*x;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+c:-1==x&&(w=Ms(w,/\f/g,"")),m>0&&(Hs(w)-u||0===h&&47===f)&&qs(m>32?Nl(w+";",r,n,u-1,l):Nl(Ms(w," ","")+";",r,n,u-2,l),l);break;case 59:w+=";";default:if(qs(j=Sl(w,t,n,d,c,a,s,b,k=[],y=[],u,i),i),123===v)if(0===c)wl(w,t,j,j,k,i,u,s,y);else{switch(p){case 99:if(110===Us(w,3))break;case 108:if(97===Us(w,2))break;default:c=0;case 100:case 109:case 115:}c?wl(e,j,j,r&&qs(Sl(e,j,j,0,0,a,s,b,a,k=[],u,y),y),a,y,u,s,r?k:y):wl(w,j,j,j,[""],y,0,s,y)}}d=c=m=0,h=x=1,b=w="",u=o;break;case 58:u=1+Hs(w),m=f;default:if(h<1)if(123==v)--h;else if(125==v&&0==h++&&125==al())continue;switch(w+=Ls(v),v*h){case 38:x=c>0?1:(w+="\f",-1);break;case 44:s[d++]=(Hs(w)-1)*x,x=1;break;case 64:45===ol()&&(w+=pl(il())),p=ol(),c=u=Hs(b=w+=xl(sl())),v++;break;case 45:45===f&&2==Hs(w)&&(h=0)}}return i}function Sl(e,t,n,r,a,i,o,s,l,d,c,u){for(var p=a-1,m=0===a?i:[""],f=Ws(m),h=0,g=0,x=0;h<r;++h)for(var v=0,b=Ks(e,p+1,p=Ps(g=o[h])),k=e;v<f;++v)(k=Is(g>0?m[v]+" "+b:Ms(b,/&\f/g,m[v])))&&(l[x++]=k);return tl(e,t,n,0===a?Fs:s,l,d,c,u)}function $l(e,t,n,r){return tl(e,t,n,Ds,Ls(Zs),Ks(e,2,-2),0,r)}function Nl(e,t,n,r,a){return tl(e,t,n,Os,Ks(e,0,r),Ks(e,r+1,-1),r,a)}var _l="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",El="active",zl="data-styled-version",Cl="6.3.12",Al="/*!sc*/\n",Dl="undefined"!=typeof window&&"undefined"!=typeof document,Fl=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),Ol={};function Tl(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Pl=new Map,Ll=new Map,Rl=1,Il=function(e){if(Pl.has(e))return Pl.get(e);for(;Ll.has(Rl);)Rl++;var t=Rl++;return Pl.set(e,t),Ll.set(t,e),t},Bl=function(e,t){Rl=t+1,Pl.set(e,t),Ll.set(t,e)},Ml=(new Set,Object.freeze([])),Vl=Object.freeze({});function Ul(e,t,n){return void 0===n&&(n=Vl),e.theme!==n.theme&&e.theme||t||n.theme}var Kl=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),Hl=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Wl=/(^-|-$)/g;function ql(e){return e.replace(Hl,"-").replace(Wl,"")}var Gl=/(a)(d)/gi,Yl=function(e){return String.fromCharCode(e+(e>25?39:97))};function Jl(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Yl(t%52)+n;return(Yl(t%52)+n).replace(Gl,"$1-$2")}var Ql,Xl=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Zl=function(e){return Xl(5381,e)};function ed(e){return Jl(Zl(e)>>>0)}function td(e){return e.displayName||e.name||"Component"}function nd(e){return"string"==typeof e&&!0}var rd="function"==typeof Symbol&&Symbol.for,ad=rd?Symbol.for("react.memo"):60115,id=rd?Symbol.for("react.forward_ref"):60112,od={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},sd={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},ld={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},dd=((Ql={})[id]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Ql[ad]=ld,Ql);function cd(e){return("type"in(t=e)&&t.type.$$typeof)===ad?ld:"$$typeof"in e?dd[e.$$typeof]:od;var t}var ud=Object.defineProperty,pd=Object.getOwnPropertyNames,md=Object.getOwnPropertySymbols,fd=Object.getOwnPropertyDescriptor,hd=Object.getPrototypeOf,gd=Object.prototype;function xd(e,t,n){if("string"!=typeof t){if(gd){var r=hd(t);r&&r!==gd&&xd(e,r,n)}var a=pd(t);md&&(a=a.concat(md(t)));for(var i=cd(e),o=cd(t),s=0;s<a.length;++s){var l=a[s];if(!(l in sd||n&&n[l]||o&&l in o||i&&l in i)){var d=fd(t,l);try{ud(e,l,d)}catch(e){}}}}return e}function vd(e){return"function"==typeof e}function bd(e){return"object"==typeof e&&"styledComponentId"in e}function kd(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function yd(e,t){return e.join(t||"")}function jd(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function wd(e,t,n){if(void 0===n&&(n=!1),!n&&!jd(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=wd(e[r],t[r]);else if(jd(t))for(var r in t)e[r]=wd(e[r],t[r]);return e}function Sd(e,t){Object.defineProperty(e,"toString",{value:t})}var $d=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,a=r;e>=a;)if((a<<=1)<0)throw Tl(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var i=r;i<a;i++)this.groupSizes[i]=0}for(var o=this.indexOfGroup(e+1),s=0,l=(i=0,t.length);i<l;i++)this.tag.insertRule(o,t[i])&&(this.groupSizes[e]++,o++,s++);s>0&&this._cGroup>e&&(this._cIndex+=s)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var a=n;a<r;a++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),a=r+n,i=r;i<a;i++)t+=this.tag.getRule(i)+Al;return t},e}(),Nd="style[".concat(_l,"][").concat(zl,'="').concat(Cl,'"]'),_d=new RegExp("^".concat(_l,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Ed=function(e){return"undefined"!=typeof ShadowRoot&&e instanceof ShadowRoot||"host"in e&&11===e.nodeType},zd=function(e){if(!e)return document;if(Ed(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(Ed(t))return t}return document},Cd=function(e,t,n){for(var r,a=n.split(","),i=0,o=a.length;i<o;i++)(r=a[i])&&e.registerName(t,r)},Ad=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(Al),a=[],i=0,o=r.length;i<o;i++){var s=r[i].trim();if(s){var l=s.match(_d);if(l){var d=0|parseInt(l[1],10),c=l[2];0!==d&&(Bl(c,d),Cd(e,c,l[3]),e.getTag().insertRules(d,a)),a.length=0}else a.push(s)}}},Dd=function(e){for(var t=zd(e.options.target).querySelectorAll(Nd),n=0,r=t.length;n<r;n++){var a=t[n];a&&a.getAttribute(_l)!==El&&(Ad(e,a),a.parentNode&&a.parentNode.removeChild(a))}};function Fd(){return n.nc}var Od=function(e){var t=document.head,n=e||t,r=document.createElement("style"),a=function(e){var t=Array.from(e.querySelectorAll("style[".concat(_l,"]")));return t[t.length-1]}(n),i=void 0!==a?a.nextSibling:null;r.setAttribute(_l,El),r.setAttribute(zl,Cl);var o=Fd();return o&&r.setAttribute("nonce",o),n.insertBefore(r,i),r},Td=function(){function e(e){this.element=Od(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){var t;if(e.sheet)return e.sheet;for(var n=null!==(t=e.getRootNode().styleSheets)&&void 0!==t?t:document.styleSheets,r=0,a=n.length;r<a;r++){var i=n[r];if(i.ownerNode===e)return i}throw Tl(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Pd=function(){function e(e){this.element=Od(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Ld=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Rd=Dl,Id={isServer:!Dl,useCSSOMInjection:!Fl},Bd=function(){function e(e,t,n){void 0===e&&(e=Vl),void 0===t&&(t={});var r=this;this.options=Ns(Ns({},Id),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Dl&&Rd&&(Rd=!1,Dd(this)),Sd(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",a=function(n){var a=function(e){return Ll.get(e)}(n);if(void 0===a)return"continue";var i=e.names.get(a);if(void 0===i||!i.size)return"continue";var o=t.getGroup(n);if(0===o.length)return"continue";var s=_l+".g"+n+'[id="'+a+'"]',l="";i.forEach(function(e){e.length>0&&(l+=e+",")}),r+=o+s+'{content:"'+l+'"}'+Al},i=0;i<n;i++)a(i);return r}(r)})}return e.registerId=function(e){return Il(e)},e.prototype.rehydrate=function(){!this.server&&Dl&&Dd(this)},e.prototype.reconstructWithOptions=function(t,n){void 0===n&&(n=!0);var r=new e(Ns(Ns({},this.options),t),this.gs,n&&this.names||void 0);return!this.server&&Dl&&t.target!==this.options.target&&zd(this.options.target)!==zd(t.target)&&Dd(r),r},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Ld(n):t?new Td(n):new Pd(n)}(this.options),new $d(e)));var e},e.prototype.hasNameForId=function(e,t){var n,r;return null!==(r=null===(n=this.names.get(e))||void 0===n?void 0:n.has(t))&&void 0!==r&&r},e.prototype.registerName=function(e,t){Il(e);var n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Il(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Il(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function Md(e,t){return null==t||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||e in Es||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Vd=function(e){return e>="A"&&e<="Z"};function Ud(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;Vd(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Kd=Symbol.for("sc-keyframes");var Hd=function(e){return null==e||!1===e||""===e},Wd=function(e){var t=[];for(var n in e){var r=e[n];e.hasOwnProperty(n)&&!Hd(r)&&(Array.isArray(r)&&r.isCss||vd(r)?t.push("".concat(Ud(n),":"),r,";"):jd(r)?t.push.apply(t,_s(_s(["".concat(n," {")],Wd(r),!1),["}"],!1)):t.push("".concat(Ud(n),": ").concat(Md(n,r),";")))}return t};function qd(e,t,n,r,a){if(void 0===a&&(a=[]),"string"==typeof e)return e&&a.push(e),a;if(Hd(e))return a;if(bd(e))return a.push(".".concat(e.styledComponentId)),a;var i;if(vd(e))return!vd(i=e)||i.prototype&&i.prototype.isReactComponent||!t?(a.push(e),a):qd(e(t),t,n,r,a);if(function(e){return"object"==typeof e&&null!==e&&Kd in e}(e))return n?(e.inject(n,r),a.push(e.getName(r))):a.push(e),a;if(jd(e)){for(var o=Wd(e),s=0;s<o.length;s++)a.push(o[s]);return a}if(!Array.isArray(e))return a.push(e.toString()),a;for(s=0;s<e.length;s++)qd(e[s],t,n,r,a);return a}function Gd(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(vd(n)&&!bd(n))return!1}return!0}var Yd=Zl(Cl),Jd=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&Gd(e),this.componentId=t,this.baseHash=Xl(Yd,t),this.baseStyle=n,Bd.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n).className:"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=kd(r,this.staticRulesId);else{var a=yd(qd(this.rules,e,t,n)),i=Jl(Xl(this.baseHash,a)>>>0);if(!t.hasNameForId(this.componentId,i)){var o=n(a,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,o)}r=kd(r,i),this.staticRulesId=i}else{for(var s=Xl(this.baseHash,n.hash),l="",d=0;d<this.rules.length;d++){var c=this.rules[d];if("string"==typeof c)l+=c;else if(c){var u=yd(qd(c,e,t,n));s=Xl(Xl(s,String(d)),u),l+=u}}if(l){var p=Jl(s>>>0);if(!t.hasNameForId(this.componentId,p)){var m=n(l,".".concat(p),void 0,this.componentId);t.insertRules(this.componentId,p,m)}r=kd(r,p)}}return{className:r,css:"undefined"==typeof window?t.getTag().getGroup(Il(this.componentId)):""}},e}(),Qd=/&/g,Xd=47,Zd=42;function ec(e){if(-1===e.indexOf("}"))return!1;for(var t=e.length,n=0,r=0,a=!1,i=0;i<t;i++){var o=e.charCodeAt(i);if(0!==r||a||o!==Xd||e.charCodeAt(i+1)!==Zd)if(a)o===Zd&&e.charCodeAt(i+1)===Xd&&(a=!1,i++);else if(34!==o&&39!==o||0!==i&&92===e.charCodeAt(i-1)){if(0===r)if(123===o)n++;else if(125===o&&--n<0)return!0}else 0===r?r=o:r===o&&(r=0);else a=!0,i++}return 0!==n||0!==r}function tc(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=tc(e.children,t)),e})}function nc(e){var t,n,r,a=void 0===e?Vl:e,i=a.options,o=void 0===i?Vl:i,s=a.plugins,l=void 0===s?Ml:s,d=function(e,r,a){return a.startsWith(n)&&a.endsWith(n)&&a.replaceAll(n,"").length>0?".".concat(t):e},c=l.slice();c.push(function(e){e.type===Fs&&e.value.includes("&")&&(r||(r=new RegExp("\\".concat(n,"\\b"),"g")),e.props[0]=e.props[0].replace(Qd,n).replace(r,d))}),o.prefix&&c.push(yl),c.push(bl);var u,p=[],m=function(e){var t=Ws(e);return function(n,r,a,i){for(var o="",s=0;s<t;s++)o+=e[s](n,r,a,i)||"";return o}}(c.concat((u=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&u(e)}))),f=function(e,a,i,s){void 0===a&&(a=""),void 0===i&&(i=""),void 0===s&&(s="&"),t=s,n=a,r=void 0;var l=function(e){if(!ec(e))return e;for(var t=e.length,n="",r=0,a=0,i=0,o=!1,s=0;s<t;s++){var l=e.charCodeAt(s);if(0!==i||o||l!==Xd||e.charCodeAt(s+1)!==Zd)if(o)l===Zd&&e.charCodeAt(s+1)===Xd&&(o=!1,s++);else if(34!==l&&39!==l||0!==s&&92===e.charCodeAt(s-1)){if(0===i)if(123===l)a++;else if(125===l){if(--a<0){for(var d=s+1;d<t;){var c=e.charCodeAt(d);if(59===c||10===c)break;d++}d<t&&59===e.charCodeAt(d)&&d++,a=0,s=d-1,r=d;continue}0===a&&(n+=e.substring(r,s+1),r=s+1)}else 59===l&&0===a&&(n+=e.substring(r,s+1),r=s+1)}else 0===i?i=l:i===l&&(i=0);else o=!0,s++}if(r<t){var u=e.substring(r);ec(u)||(n+=u)}return n}(function(e){if(-1===e.indexOf("//"))return e;for(var t=e.length,n=[],r=0,a=0,i=0,o=0;a<t;){var s=e.charCodeAt(a);if(34!==s&&39!==s||0!==a&&92===e.charCodeAt(a-1))if(0===i)if(s===Xd&&a+1<t&&e.charCodeAt(a+1)===Zd){for(a+=2;a+1<t&&(e.charCodeAt(a)!==Zd||e.charCodeAt(a+1)!==Xd);)a++;a+=2}else if(40===s&&a>=3&&108==(32|e.charCodeAt(a-1))&&114==(32|e.charCodeAt(a-2))&&117==(32|e.charCodeAt(a-3)))o=1,a++;else if(o>0)41===s?o--:40===s&&o++,a++;else if(s===Zd&&a+1<t&&e.charCodeAt(a+1)===Xd)a>r&&n.push(e.substring(r,a)),r=a+=2;else if(s===Xd&&a+1<t&&e.charCodeAt(a+1)===Xd){for(a>r&&n.push(e.substring(r,a));a<t&&10!==e.charCodeAt(a);)a++;r=a}else a++;else a++;else 0===i?i=s:i===s&&(i=0),a++}return 0===r?e:(r<t&&n.push(e.substring(r)),n.join(""))}(e)),d=jl(i||a?"".concat(i," ").concat(a," { ").concat(l," }"):l);return o.namespace&&(d=tc(d,o.namespace)),p=[],vl(d,m),p};return f.hash=l.length?l.reduce(function(e,t){return t.name||Tl(15),Xl(e,t.name)},5381).toString():"",f}var rc=new Bd,ac=nc(),ic=r.createContext({shouldForwardProp:void 0,styleSheet:rc,stylis:ac}),oc=(ic.Consumer,r.createContext(void 0));function sc(){return r.useContext(ic)}function lc(e){if(!r.useMemo)return e.children;var t=sc().styleSheet,n=r.useMemo(function(){var n=t;return e.sheet?n=e.sheet:e.target&&(n=n.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(n=n.reconstructWithOptions({useCSSOMInjection:!1})),n},[e.disableCSSOMInjection,e.sheet,e.target,t]),a=r.useMemo(function(){return nc({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),i=r.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:n,stylis:a}},[e.shouldForwardProp,n,a]);return r.createElement(ic.Provider,{value:i},r.createElement(oc.Provider,{value:a},e.children))}var dc=r.createContext(void 0);dc.Consumer;function cc(e){var t=r.useContext(dc),n=r.useMemo(function(){return function(e,t){if(!e)throw Tl(14);if(vd(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw Tl(8);return t?Ns(Ns({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?r.createElement(dc.Provider,{value:n},e.children):null}var uc={};new Set;function pc(e,t,n){var a=bd(e),i=e,o=!nd(e),s=t.attrs,l=void 0===s?Ml:s,d=t.componentId,c=void 0===d?function(e,t){var n="string"!=typeof e?"sc":ql(e);uc[n]=(uc[n]||0)+1;var r="".concat(n,"-").concat(ed(Cl+n+uc[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):d,u=t.displayName,p=void 0===u?function(e){return nd(e)?"styled.".concat(e):"Styled(".concat(td(e),")")}(e):u,m=t.displayName&&t.componentId?"".concat(ql(t.displayName),"-").concat(t.componentId):t.componentId||c,f=a&&i.attrs?i.attrs.concat(l).filter(Boolean):l,h=t.shouldForwardProp;if(a&&i.shouldForwardProp){var g=i.shouldForwardProp;if(t.shouldForwardProp){var x=t.shouldForwardProp;h=function(e,t){return g(e,t)&&x(e,t)}}else h=g}var v=new Jd(n,m,a?i.componentStyle:void 0);function b(e,t){return function(e,t,n){var a=e.attrs,i=e.componentStyle,o=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,d=e.target,c=r.useContext(dc),u=sc(),p=e.shouldForwardProp||u.shouldForwardProp,m=Ul(t,c,o)||Vl,f=function(e,t,n){for(var r,a=Ns(Ns({},t),{className:void 0,theme:n}),i=0;i<e.length;i+=1){var o=vd(r=e[i])?r(a):r;for(var s in o)"className"===s?a.className=kd(a.className,o[s]):"style"===s?a.style=Ns(Ns({},a.style),o[s]):s in t&&void 0===t[s]||(a[s]=o[s])}return"className"in t&&"string"==typeof t.className&&(a.className=kd(a.className,t.className)),a}(a,t,m),h=f.as||d,g={};for(var x in f)void 0===f[x]||"$"===x[0]||"as"===x||"theme"===x&&f.theme===m||("forwardedAs"===x?g.as=f.forwardedAs:p&&!p(x,h)||(g[x]=f[x]));var v=function(e,t){var n=sc();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(i,f),b=v.className,k=kd(s,l);return b&&(k+=" "+b),f.className&&(k+=" "+f.className),g[nd(h)&&!Kl.has(h)?"class":"className"]=k,n&&(g.ref=n),(0,r.createElement)(h,g)}(k,e,t)}b.displayName=p;var k=r.forwardRef(b);return k.attrs=f,k.componentStyle=v,k.displayName=p,k.shouldForwardProp=h,k.foldedComponentIds=a?kd(i.foldedComponentIds,i.styledComponentId):"",k.styledComponentId=m,k.target=a?i.target:e,Object.defineProperty(k,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,a=t;r<a.length;r++)wd(e,a[r],!0);return e}({},i.defaultProps,e):e}}),Sd(k,function(){return".".concat(k.styledComponentId)}),o&&xd(k,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),k}function mc(e,t){for(var n=[e[0]],r=0,a=t.length;r<a;r+=1)n.push(t[r],e[r+1]);return n}var fc=function(e){return Object.assign(e,{isCss:!0})};function hc(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(vd(e)||jd(e))return fc(qd(mc(Ml,_s([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?qd(r):fc(qd(mc(r,t)))}function gc(e,t,n){if(void 0===n&&(n=Vl),!t)throw Tl(1,t);var r=function(r){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,hc.apply(void 0,_s([r],a,!1)))};return r.attrs=function(r){return gc(e,t,Ns(Ns({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return gc(e,t,Ns(Ns({},n),r))},r}var xc=function(e){return gc(pc,e)},vc=xc;Kl.forEach(function(e){vc[e]=xc(e)});var bc,kc=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Gd(e),Bd.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var a=r(yd(qd(this.rules,t,n,r)),""),i=this.componentId+e;n.insertRules(i,i,a)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&Bd.registerId(this.componentId+e);var a=this.componentId+e;this.isStatic?n.hasNameForId(a,a)||this.createStyles(e,t,n,r):(this.removeStyles(e,n),this.createStyles(e,t,n,r))},e}();var yc=function(){function e(e,t){var n=this;this[bc]=!0,this.inject=function(e,t){void 0===t&&(t=ac);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Sd(this,function(){throw Tl(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=ac),this.name+e.hash},e}();function jc(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=yd(hc.apply(void 0,_s([e],t,!1))),a=ed(r);return new yc(a,r)}bc=Kd;(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=Fd(),r=yd([n&&'nonce="'.concat(n,'"'),"".concat(_l,'="true"'),"".concat(zl,'="').concat(Cl,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Tl(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Tl(2);var n=e.instance.toString();if(!n)return[];var a=((t={})[_l]="",t[zl]=Cl,t.dangerouslySetInnerHTML={__html:n},t),i=Fd();return i&&(a.nonce=i),[r.createElement("style",Ns({},a,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Bd({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Tl(2);return r.createElement(lc,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Tl(3)}})(),"__sc-".concat(_l,"__");const wc={color:{bg:"#F1F6F3",surface:"#FFFFFF",surfaceAlt:"#E5EFEA",surfaceSunken:"#D8E6E0",ink:"#0E1A17",inkSoft:"#1F2E2A",muted:"#3F4B47",mutedSoft:"#5C6E68",border:"#D5E2DC",borderStrong:"#BACBC2",brand:"#1B7A6E",brandLight:"#4FBFB3",brandSoft:"#DCEEEA",brandInk:"#0E4F47",brandGradient:"linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)",brandGradientHover:"linear-gradient(135deg, #4FC9BD 0%, #155F58 100%)",accent:"#4FBFB3",accentSoft:"#E0F1ED",success:"#1B7A6E",successSoft:"#DCEEEA",danger:"#9F3B22",dangerSoft:"#F4DAD0",warning:"#A8761A",warningSoft:"#F3E5C7"},dossier:{bg:"#050B09",bgRaised:"#0B1612",surface:"#EDF3F0",card:"#FFFFFF",teal:"#2BC4AC",tealBright:"#5DD6CA",tealDeep:"#178A7B",signal:"#E0A23C",inkOnDark:"#F4F9F7",mutedOnDark:"rgba(236,244,241,0.80)",faintOnDark:"rgba(228,238,234,0.62)",hairlineOnDark:"rgba(255,255,255,0.12)",metallicText:"linear-gradient(180deg, #FFFFFF 24%, #D9EFEA 58%, #9FD9CE 100%)",numberGradient:"linear-gradient(135deg, #7BEADB 0%, #2BC4AC 52%, #179580 100%)",keyline:"linear-gradient(90deg, transparent 0%, #2BC4AC 35%, #5DD6CA 50%, #2BC4AC 65%, transparent 100%)",aurora:"radial-gradient(ellipse 680px 400px at 50% 42%, rgba(43,196,172,0.15) 0%, transparent 62%),\n      radial-gradient(ellipse 520px 300px at 30% 96%, rgba(27,110,102,0.14) 0%, transparent 70%),\n      radial-gradient(ellipse 440px 260px at 72% 4%, rgba(93,214,202,0.06) 0%, transparent 70%)",glow:"0 0 0 4px rgba(93,214,202,0.18), 0 0 18px rgba(93,214,202,0.55)",ctaShadow:"0 18px 56px rgba(29,176,154,0.38), inset 0 1px 0 rgba(255,255,255,0.22)",ctaGradient:"linear-gradient(140deg, #4ECDC4 0%, #1DB09A 52%, #178A7B 100%)",column:"580px"},font:{display:"'Playfair Display', Georgia, 'Times New Roman', serif",sans:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",mono:"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"},size:{radius:{sm:"6px",md:"12px",lg:"20px",xl:"28px",pill:"999px"},space:{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px",9:"96px",10:"128px"},container:"1180px",containerNarrow:"960px"},shadow:{xs:"0 1px 2px rgba(14, 26, 23, 0.04)",sm:"0 2px 8px rgba(14, 26, 23, 0.06)",md:"0 8px 24px rgba(14, 26, 23, 0.08)",lg:"0 24px 60px rgba(14, 26, 23, 0.12)",brand:"0 12px 32px rgba(27, 122, 110, 0.28)",inset:"inset 0 1px 0 rgba(255, 255, 255, 0.6)"},motion:{fast:"160ms cubic-bezier(0.2, 0, 0, 1)",base:"240ms cubic-bezier(0.2, 0, 0, 1)",slow:"420ms cubic-bezier(0.2, 0, 0, 1)",spring:"520ms cubic-bezier(0.34, 1.56, 0.64, 1)"},z:{base:1,nav:50,overlay:80,modal:100}},Sc=(function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var a=hc.apply(void 0,_s([e],t,!1)),i="sc-global-".concat(ed(JSON.stringify(a))),o=new kc(a,i),s=new WeakMap,l=function(e){var t=sc(),n=r.useContext(dc),a=s.get(t.styleSheet);return void 0===a&&(a=t.styleSheet.allocateGSInstance(i),s.set(t.styleSheet,a)),r.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,n,r,a){if(o.isStatic)o.renderStyles(e,Ol,n,a);else{var i=Ns(Ns({},t),{theme:Ul(t,r,l.defaultProps)});o.renderStyles(e,i,n,a)}}(a,e,t.styleSheet,n,t.stylis),function(){o.removeStyles(a,t.styleSheet)}},[a,e,t.styleSheet,n,t.stylis]),null};return r.memo(l)})`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    color-scheme: light;
    --bg: ${e=>{let{theme:t}=e;return t.color.bg}};
    --surface: ${e=>{let{theme:t}=e;return t.color.surface}};
    --ink: ${e=>{let{theme:t}=e;return t.color.ink}};
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  html, body, #root {
    min-height: 100%;
    overflow-x: hidden;
    background: ${e=>{let{theme:t}=e;return t.color.bg}};
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }

  @media (prefers-color-scheme: dark) {
    html, body, #root {
      background: ${e=>{let{theme:t}=e;return t.color.bg}} !important;
      color: ${e=>{let{theme:t}=e;return t.color.ink}} !important;
    }
    * {
      forced-color-adjust: none;
    }
  }

  body {
    font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
    font-size: 16px;
    line-height: 1.55;
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.08;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }

  p { color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    color: inherit;
  }

  ul { list-style: none; }

  *:focus-visible {
    outline: 2px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    outline-offset: 2px;
    border-radius: 4px;
  }

  ::selection {
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FFFFFF;
  }

  .tabular { font-variant-numeric: tabular-nums; }
`;var $c=n(579);const Nc=(0,r.createContext)(null),_c="arvo_user_email",Ec="arvo_session",zc=(()=>{try{var e;return null!==(e=new URLSearchParams(window.location.search).get("magic"))&&void 0!==e?e:null}catch{return null}})();function Cc(e){let{children:t}=e;const[n,a]=(0,r.useState)(()=>{try{return localStorage.getItem(_c)||null}catch{return null}}),[i,o]=(0,r.useState)(()=>{try{return localStorage.getItem(Ec)||null}catch{return null}}),[s,l]=(0,r.useState)("idle");(0,r.useEffect)(()=>{const e=zc;e&&(l("validating"),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})}).then(e=>{if(!e.ok)throw new Error(`HTTP ${e.status}`);return e.json()}).then(e=>{if(e.email){try{localStorage.setItem(_c,e.email)}catch{}if(a(e.email),e.session){try{localStorage.setItem(Ec,e.session)}catch{}o(e.session)}l("ok")}else l("error")}).catch(e=>{console.error("[auth] validate-magic misslyckades:",e.message),l("error")}))},[]);const d=(0,r.useCallback)((e,t)=>{try{localStorage.setItem(_c,e)}catch{}if(a(e),t){try{localStorage.setItem(Ec,t)}catch{}o(t)}},[]),c=(0,r.useCallback)(()=>{try{localStorage.removeItem(_c),localStorage.removeItem(Ec)}catch{}a(null),o(null)},[]);return(0,$c.jsx)(Nc.Provider,{value:{email:n,sessionToken:i,login:d,logout:c,magicState:s},children:t})}function Ac(){return(0,r.useContext)(Nc)}const Dc=vc.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: ${e=>{let{theme:t}=e;return t.font.display}};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.025em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
`,Fc=vc.svg`
  width: ${e=>{let{$size:t}=e;return t||30}}px;
  height: ${e=>{let{$size:t}=e;return t||30}}px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(14, 26, 23, 0.10));
`,Oc=vc.span`
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  line-height: 1;
`,Tc=vc.em`
  font-style: italic;
  font-weight: 400;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Pc=e=>{let{showName:t=!0,showSuffix:n=!0,size:r}=e;return(0,$c.jsxs)(Dc,{children:[(0,$c.jsxs)(Fc,{$size:r,viewBox:"0 0 40 40",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[(0,$c.jsx)("defs",{children:(0,$c.jsxs)("linearGradient",{id:"arvoMarkGradient",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,$c.jsx)("stop",{offset:"0%",stopColor:"#5DD6CA"}),(0,$c.jsx)("stop",{offset:"100%",stopColor:"#1B6E66"})]})}),(0,$c.jsx)("path",{fill:"url(#arvoMarkGradient)",fillRule:"evenodd",d:"M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"})]}),t&&(0,$c.jsxs)(Oc,{children:["Arvo ",n&&(0,$c.jsx)(Tc,{children:"Flow"})]})]})},Lc={primary:hc`
    background: ${e=>{let{theme:t}=e;return t.color.ink}};
    color: #FAFAF7;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.ink}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
    &:hover { transform: translateY(-1px); box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}}; }
    &:active { transform: translateY(0); }
  `,brand:hc`
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
    &:hover { transform: translateY(-1px); box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}}; background: ${e=>{let{theme:t}=e;return t.color.brandInk}}; }
    &:active { transform: translateY(0); }
  `,gradient:hc`
    background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
    color: #FFFFFF;
    border: 1px solid transparent;
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.brand}};
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: ${e=>{let{theme:t}=e;return t.color.brandGradientHover}};
      opacity: 0;
      transition: opacity ${e=>{let{theme:t}=e;return t.motion.fast}};
    }
    & > * { position: relative; z-index: 1; }
    &:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(27, 122, 110, 0.36); }
    &:hover::after { opacity: 1; }
    &:active { transform: translateY(0); }
  `,secondary:hc`
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  `,ghost:hc`
    background: transparent;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    border: 1px solid transparent;
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  `,ghostInverse:hc`
    background: transparent;
    color: rgba(250, 250, 247, 0.85);
    border: 1px solid rgba(250, 250, 247, 0.18);
    &:hover { background: rgba(250, 250, 247, 0.08); color: #FAFAF7; }
  `},Rc={sm:hc`
    height: 36px;
    padding: 0 14px;
    font-size: 13.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  `,md:hc`
    height: 44px;
    padding: 0 18px;
    font-size: 14.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  `,lg:hc`
    height: 52px;
    padding: 0 24px;
    font-size: 15.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  `},Ic=vc.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  letter-spacing: -0.005em;
  white-space: nowrap;
  transition: transform ${e=>{let{theme:t}=e;return t.motion.fast}},
              background ${e=>{let{theme:t}=e;return t.motion.fast}},
              box-shadow ${e=>{let{theme:t}=e;return t.motion.fast}},
              color ${e=>{let{theme:t}=e;return t.motion.fast}};
  cursor: pointer;
  ${e=>{let{$variant:t="primary"}=e;return Lc[t]}}
  ${e=>{let{$size:t="md"}=e;return Rc[t]}}
  ${e=>{let{$full:t}=e;return t&&"width: 100%;"}}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }
`,Bc=Ic,Mc=vc.header`
  position: sticky;
  top: 0;
  z-index: ${e=>{let{theme:t}=e;return t.z.nav}};
  background: rgba(250, 250, 247, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,Vc=vc.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 480px) {
    padding: 12px 16px;
    gap: 12px;
  }
`,Uc=vc.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 740px) { display: none; }
`,Kc=vc(vs)`
  padding: 8px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  font-size: 14px;
  white-space: nowrap;
  color: ${e=>{let{theme:t,$active:n}=e;return n?t.color.ink:t.color.muted}};
  font-weight: ${e=>{let{$active:t}=e;return t?600:500}};
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}}, color ${e=>{let{theme:t}=e;return t.motion.fast}};
  background: ${e=>{let{theme:t,$active:n}=e;return n?t.color.surfaceAlt:"transparent"}};
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
`,Hc=vc.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Wc=(vc.span`
  @media (max-width: 600px) { display: none; }
`,vc.span`
  .short { display: none; }
  @media (max-width: 480px) {
    .full  { display: none; }
    .short { display: inline; }
  }
`),qc=vc.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 26, 23, 0.48);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`,Gc=vc.div`
  background: #FAFAF7;
  border-radius: 16px;
  padding: 40px 36px 36px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 24px 80px rgba(14, 26, 23, 0.18);
  position: relative;
  @media (max-width: 480px) {
    padding: 32px 24px 28px;
  }
`,Yc=vc.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`,Jc=vc.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  letter-spacing: -0.02em;
  margin: 0 0 8px;
`,Qc=vc.p`
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin: 0 0 28px;
  line-height: 1.5;
`,Xc=vc.label`
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.inkSoft)&&void 0!==t?t:n.color.ink}};
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 6px;
`,Zc=vc.div`
  margin-bottom: 16px;
`,eu=vc.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid ${e=>{let{theme:t,$error:n}=e;return n?"#D94F3C":t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  font-size: 14.5px;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
  &:focus { border-color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  &::placeholder { color: ${e=>{let{theme:t}=e;return t.color.muted}}; }
`,tu=vc.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #D94F3C;
`,nu=vc.div`
  text-align: center;
  padding: 12px 0 4px;
`,ru=vc.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 26px;
`,au=vc.p`
  font-size: 18px;
  font-weight: 700;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 8px;
  letter-spacing: -0.01em;
`,iu=vc.p`
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin: 0;
  line-height: 1.55;
`,ou=vc.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,su=vc.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${e=>{let{theme:t}=e;return t.color.brand}};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0;
`,lu=vc.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 14px 24px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  box-shadow: 0 8px 32px rgba(0,0,0,.18);
  background: ${e=>{let{$error:t,theme:n}=e;return t?"#D94F3C":"linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%)"}};
  pointer-events: none;
`,du={company:"",name:"",email:""},cu={email:""},uu=e=>{let{variant:t="public"}=e;const{pathname:n}=lo(),{email:a,logout:i,magicState:o}=Ac(),[s,l]=(0,r.useState)(!1);(0,r.useEffect)(()=>{if("ok"===o||"error"===o){l(!0);const e=setTimeout(()=>l(!1),4e3);return()=>clearTimeout(e)}},[o]);const[d,c]=(0,r.useState)(!1),[u,p]=(0,r.useState)(!1),[m,f]=(0,r.useState)(cu),[h,g]=(0,r.useState)("idle"),[x,v]=(0,r.useState)(du),[b,k]=(0,r.useState)({}),[y,j]=(0,r.useState)("idle"),w=(0,r.useRef)(null);(0,r.useEffect)(()=>{d&&w.current&&w.current.focus()},[d]),(0,r.useEffect)(()=>{if(!d)return;const e=e=>{"Escape"===e.key&&S()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[d]);const S=()=>c(!1),$=(e,t)=>{const n=document.getElementById(t);n&&(e.preventDefault(),n.scrollIntoView({behavior:"smooth"}))};return(0,$c.jsxs)($c.Fragment,{children:[s&&(0,$c.jsx)(lu,{$error:"error"===o,children:"ok"===o?`\u2713 Inloggad som ${a}`:"\u2715 L\xe4nken fungerade inte \u2014 beg\xe4r en ny"}),(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Mc,{children:(0,$c.jsxs)(Vc,{children:[(0,$c.jsx)(vs,{to:"/",children:(0,$c.jsx)(Pc,{})}),"public"===t&&(0,$c.jsxs)(Uc,{children:[(0,$c.jsx)(Kc,{to:"/",$active:"/"===n,children:"Hem"}),(0,$c.jsx)(Kc,{to:"/intelligence",$active:"/intelligence"===n,children:"Arvo Intelligence"}),(0,$c.jsx)(Kc,{to:"/#hur",$active:!1,onClick:e=>$(e,"hur"),children:"S\xe5 fungerar det"}),(0,$c.jsx)(Kc,{to:"/#priser",$active:!1,onClick:e=>$(e,"priser"),children:"Pris"}),(0,$c.jsx)(Kc,{to:"/#faq",$active:!1,onClick:e=>$(e,"faq"),children:"FAQ"})]}),"app"===t&&(0,$c.jsxs)(Uc,{children:[(0,$c.jsx)(Kc,{to:"/insights",$active:"/insights"===n,children:"Insikter"}),(0,$c.jsx)(Kc,{to:"/insights",$active:!1,children:"Historik"}),(0,$c.jsx)(Kc,{to:"/insights",$active:!1,children:"Inst\xe4llningar"})]}),(0,$c.jsxs)(Hc,{children:[a?(0,$c.jsxs)(ou,{children:[(0,$c.jsx)(su,{children:a[0].toUpperCase()}),(0,$c.jsx)(Bc,{$variant:"ghost",$size:"sm",onClick:i,children:"Logga ut"})]}):(0,$c.jsx)(Bc,{$variant:"ghost",$size:"sm",onClick:()=>{f(cu),g("idle"),p(!0)},children:"Logga in"}),"public"===t&&(0,$c.jsx)(Bc,{as:vs,to:"/testa-faktura",$variant:"gradient",$size:"sm",children:(0,$c.jsxs)(Wc,{children:[(0,$c.jsx)("span",{className:"full",children:"Se mina besparingar \u2192"}),(0,$c.jsx)("span",{className:"short",children:"Se besparingar \u2192"})]})})]})]})}),u&&(0,$c.jsx)(qc,{onClick:e=>{e.target===e.currentTarget&&p(!1)},children:(0,$c.jsxs)(Gc,{role:"dialog","aria-modal":"true","aria-labelledby":"auth-modal-title",children:[(0,$c.jsx)(Yc,{onClick:()=>p(!1),"aria-label":"St\xe4ng",children:"\u2715"}),"sent"===h?(0,$c.jsxs)(nu,{children:[(0,$c.jsx)(ru,{children:"\u2709"}),(0,$c.jsx)(au,{children:"Kolla inkorgen."}),(0,$c.jsxs)(iu,{children:["Vi har skickat en inloggningsl\xe4nk till ",m.email,".",(0,$c.jsx)("br",{}),"Klicka p\xe5 l\xe4nken i mejlet \u2014 det tar 10 sekunder."]})]}):(0,$c.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=m.email.trim();if(t&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){g("submitting");try{await fetch("/api/auth/request-magic-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}),g("sent")}catch{g("error")}}},noValidate:!0,children:[(0,$c.jsx)(Jc,{id:"auth-modal-title",children:"Logga in p\xe5 Arvo Flow"}),(0,$c.jsx)(Qc,{children:"Ange din e-post \u2014 vi skickar en inloggningsl\xe4nk direkt. Inget l\xf6senord."}),(0,$c.jsxs)(Zc,{children:[(0,$c.jsx)(Xc,{htmlFor:"auth-email",children:"E-postadress"}),(0,$c.jsx)(eu,{id:"auth-email",type:"email",placeholder:"anna@acme.se",value:m.email,onChange:e=>f({email:e.target.value}),autoComplete:"email",autoFocus:!0})]}),"error"===h&&(0,$c.jsx)(tu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===h,children:"submitting"===h?"Skickar\u2026":"Skicka inloggningsl\xe4nk \u2192"})]})]})}),d&&(0,$c.jsx)(qc,{onClick:e=>{e.target===e.currentTarget&&S()},children:(0,$c.jsxs)(Gc,{role:"dialog","aria-modal":"true","aria-labelledby":"early-access-title",children:[(0,$c.jsx)(Yc,{onClick:S,"aria-label":"St\xe4ng",children:"\u2715"}),"success"===y?(0,$c.jsxs)(nu,{children:[(0,$c.jsx)(ru,{children:"\u2713"}),(0,$c.jsx)(au,{children:"Er plats \xe4r reserverad."}),(0,$c.jsx)(iu,{children:"En av grundarna h\xf6r av sig inom 48 timmar f\xf6r att boka er onboarding. Kolla inkorgen \u2014 mejlet \xe4r p\xe5 v\xe4g."})]}):(0,$c.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=(()=>{const e={};return x.company.trim()||(e.company="Fyll i f\xf6retagsnamn."),x.name.trim()||(e.name="Fyll i ditt namn."),x.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email.trim())||(e.email="E-postadressen ser inte r\xe4tt ut."):e.email="E-post saknas.",e})();if(k(t),!(Object.keys(t).length>0)){j("submitting");try{const e=await fetch("/api/founding-member",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company:x.company.trim(),name:x.name.trim(),email:x.email.trim(),referrer:"undefined"!==typeof document&&document.referrer||null,timestamp:(new Date).toISOString()})});if(!e.ok)throw new Error("API "+e.status);j("success")}catch{j("error")}}},noValidate:!0,children:[(0,$c.jsx)(Jc,{id:"early-access-title",children:"Bli Founding Member"}),(0,$c.jsx)(Qc,{children:"Reservera er plats och f\xe5 personlig onboarding, 6 m\xe5nader gratis och f\xf6rtur till Fortnox / Visma-kopplingen n\xe4r den \xf6ppnar."}),(0,$c.jsxs)(Zc,{children:[(0,$c.jsx)(Xc,{htmlFor:"ea-company",children:"F\xf6retag"}),(0,$c.jsx)(eu,{id:"ea-company",ref:w,type:"text",placeholder:"Acme AB",value:x.company,onChange:e=>v(t=>({...t,company:e.target.value})),$error:!!b.company,autoComplete:"organization"}),b.company&&(0,$c.jsx)(tu,{children:b.company})]}),(0,$c.jsxs)(Zc,{children:[(0,$c.jsx)(Xc,{htmlFor:"ea-name",children:"Ditt namn"}),(0,$c.jsx)(eu,{id:"ea-name",type:"text",placeholder:"Anna Andersson",value:x.name,onChange:e=>v(t=>({...t,name:e.target.value})),$error:!!b.name,autoComplete:"name"}),b.name&&(0,$c.jsx)(tu,{children:b.name})]}),(0,$c.jsxs)(Zc,{children:[(0,$c.jsx)(Xc,{htmlFor:"ea-email",children:"E-post"}),(0,$c.jsx)(eu,{id:"ea-email",type:"email",placeholder:"anna@acme.se",value:x.email,onChange:e=>v(t=>({...t,email:e.target.value})),$error:!!b.email,autoComplete:"email"}),b.email&&(0,$c.jsx)(tu,{children:b.email})]}),"error"===y&&(0,$c.jsx)(tu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen om en stund."}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===y,children:"submitting"===y?"Skickar\u2026":"Reservera min plats \u2192"})]})]})})]})]})},pu=vc.footer`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  padding: 64px 28px 48px;
`,mu=vc.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 48px;
  @media (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`,fu=vc.div`
  p {
    margin-top: 14px;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    max-width: 320px;
  }
`,hu=vc.div`
  h4 {
    font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-bottom: 14px;
  }
  ul li { margin-bottom: 10px; }
  a {
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    transition: color ${e=>{let{theme:t}=e;return t.motion.fast}};
    &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
  }
`,gu=vc.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 56px auto 0;
  padding: 18px 20px;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  span div.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    opacity: 0.55;
  }
  strong {
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    font-weight: 600;
  }
`,xu=vc.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 24px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  @media (max-width: 520px) { flex-direction: column; gap: 10px; }
`,vu=()=>(0,$c.jsxs)(pu,{children:[(0,$c.jsxs)(mu,{children:[(0,$c.jsxs)(fu,{children:[(0,$c.jsx)(Pc,{}),(0,$c.jsx)("p",{children:"Er proaktiva finansdirekt\xf6r f\xf6r leverant\xf6rskostnader. Bevakning p\xe5 prenumeration \u2014 bytet f\xf6rberett n\xe4r ni vill, signerat av er."})]}),(0,$c.jsxs)(hu,{children:[(0,$c.jsx)("h4",{children:"Produkt"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:(0,$c.jsx)("a",{href:"/#hur",children:"S\xe5 fungerar det"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)("a",{href:"/#priser",children:"Pris"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/connect",children:"Integrationer"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/integritet",children:"S\xe4kerhet"})})]})]}),(0,$c.jsxs)(hu,{children:[(0,$c.jsx)("h4",{children:"F\xf6retag"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/",children:"Om oss"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)("a",{href:"mailto:hej@arvoflow.se",children:"Kontakt"})})]})]}),(0,$c.jsxs)(hu,{children:[(0,$c.jsx)("h4",{children:"Juridik"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/villkor",children:"Villkor"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/integritet",children:"Integritet (GDPR)"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/cookies",children:"Cookies"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/bias",children:"Rankningspolicy"})})]})]})]}),(0,$c.jsxs)(gu,{children:[(0,$c.jsxs)("span",{children:[(0,$c.jsx)("div",{className:"dot"})," Varje underbitr\xe4de ",(0,$c.jsx)("strong",{children:"namngivet"})," \u2014 EU/EES + USA under SCC"]}),(0,$c.jsxs)("span",{children:[(0,$c.jsx)("div",{className:"dot"})," Krypterad i vila och i transport"]})]}),(0,$c.jsxs)(xu,{children:[(0,$c.jsx)("span",{children:"\xa9 2026 Arvo Flow \xb7 verksamhet under bildande"}),(0,$c.jsx)("span",{children:"Stockholm \xb7 Made with care in Sweden"})]})]}),bu=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e)+" kr",ku=e=>null!=e?new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e):"\u2013",yu=["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];function ju(e){if(!e)return null;const[t,n]=e.split("-");return`${yu[parseInt(n,10)-1]} ${t}`}const wu={microsoft365:"Microsoft 365",google:"Google Workspace",zoho:"Zoho Mail",other:"Anpassad e-postl\xf6sning"};function Su(e){const t=String(e||"").replace(/\D/g,"");return 10===t.length?`${t.slice(0,6)}-${t.slice(6)}`:String(e||"")}const $u="arvo_dorr_sess";const Nu=new Set;function _u(e){let{fynd:t=null,engang:n=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{if(n){if(Nu.has(e))return;Nu.add(e)}const r=function(){try{let e=sessionStorage.getItem($u);return e||(e=(Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)).slice(0,24),sessionStorage.setItem($u,e)),e}catch{return null}}();if(!r)return;const a=JSON.stringify({handelse:e,sess:r,bredd:"undefined"!==typeof window?window.innerWidth:null,..."number"===typeof t&&Number.isFinite(t)?{fynd:t}:{}});if(navigator.sendBeacon)return void navigator.sendBeacon("/api/dorr-handelse",new Blob([a],{type:"application/json"}));fetch("/api/dorr-handelse",{method:"POST",headers:{"Content-Type":"application/json"},body:a,keepalive:!0}).catch(()=>{})}catch{}}var Eu;const zu=vc.section`
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.dossier.teal}};
  background: ${e=>{let{theme:t}=e;return t.dossier.bgRaised}};
  padding: 22px 22px 18px;
  margin: 0 0 22px;

  .rv-eyebrow {
    display: inline-flex; align-items: center; gap: 9px; margin-bottom: 16px;
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11px; letter-spacing: .18em;
    text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.dossier.teal}};
  }
  .rv-eyebrow::before {
    content: ''; width: 7px; height: 7px; border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.dossier.tealBright}};
    box-shadow: 0 0 0 0 ${e=>{let{theme:t}=e;return t.dossier.tealBright}};
    animation: rvpulse 2.4s ease-out infinite;
  }
  @keyframes rvpulse { 0%{box-shadow:0 0 0 0 rgba(93,214,202,.5);} 70%{box-shadow:0 0 0 7px rgba(93,214,202,0);} 100%{box-shadow:0 0 0 0 rgba(93,214,202,0);} }

  .rv-find {
    padding: 13px 0; border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    &:first-of-type { border-top: none; padding-top: 0; }
    /* Raderna materialiseras en i taget — presentation av data som redan anlänt (ärlig stagger). */
    opacity: 0; animation: rvrise .55s cubic-bezier(.16,1,.3,1) forwards;
    @media (prefers-reduced-motion: reduce) { animation: none; opacity: 1; }
  }
  @keyframes rvrise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

  .rv-receipt {
    margin: 16px 0 0; padding: 11px 14px;
    border: 1px solid rgba(43,196,172,.28); border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    background: rgba(43,196,172,.05);
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10.5px; letter-spacing: .08em;
    text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    b { color: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; }
  }
  /* ── HIERARKIN (grundarbeslut 2026-08-07) ────────────────────────────────────────────────
     Fyra fynd låg tidigare som fyra IDENTISKA block — samma titelstorlek, samma vikt, samma
     hårlinje. Men "Ert bokslut 2025" är KONTEXT och "Ni kör Microsoft 365" är PENGAR; de får
     inte bära samma auktoritet. Rangordningen fanns redan i koden (RANK i mergeRevealFindings)
     men designen hedrade den inte. En lista där allt är lika högljutt är en lista där inget hörs.
     Första fyndet är ledet — det bär mest vikt eftersom rangordningen redan sagt att det ska. */
  .rv-title {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}}; font-weight: 600; font-size: 16px;
    color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; line-height: 1.25;
  }
  .rv-find:first-of-type .rv-title { font-size: 21px; line-height: 1.2; letter-spacing: -.01em; }
  .rv-find:first-of-type .rv-detail { font-size: 14.5px; }

  .rv-detail { font-size: 13.5px; line-height: 1.5; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}}; margin-top: 3px; }

  /* ── KÄLLAN SOM FOTNOT, INTE SOM RAD ─────────────────────────────────────────────────────
     Källan var färgmässigt nedtonad men tog TVÅ RADER under varje påstående — alltså lika
     mycket lodrätt utrymme som fyndet självt. Tyst i färg, skrikig i volym. I en dossier ska
     källan vara TILLGÄNGLIG, inte närvarande. Vid breda mått flyttas den ur påståendets väg,
     till en egen spalt. Den döljs ALDRIG — regel 3: varje påstående bär sin proveniens. */
  .rv-source {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11px; letter-spacing: .01em;
    color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; margin-top: 6px; word-break: break-word;
  }
  @media (min-width: 900px) {
    .rv-find { display: grid; grid-template-columns: minmax(0, 1fr) 236px; column-gap: 30px; align-items: start; }
    .rv-title  { grid-column: 1; grid-row: 1; }
    .rv-detail { grid-column: 1; grid-row: 2; }
    .rv-source { grid-column: 2; grid-row: 1 / span 2; margin-top: 4px; line-height: 1.45; }
  }
  .rv-source b { color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; font-weight: 600; }

  /* ── BLÄNDAREN (grundarbeslut 2026-08-07) ────────────────────────────────────────────────
     Det uppenbara vore en sökruta. Men en sökruta är ett FORMULÄR, och formulär stänger flikar.
     Och vi hade redan svaret: när grinden tystnade hade den läst hela sökresultatet och sett
     exakt vilka bolag som rimligen kunde äga domänen — vi kastade bara bort kunskapen.
     "Byt" öppnar därför ingen sökning. Den VIDGAR BLÄNDAREN: kortet visar vad maskinen faktiskt
     såg. Ögonblicket vänds från "vi misslyckades, hjälp oss" till "vi läste 25 bolag, dessa tre
     kunde äga er domän, och vi vägrade gissa mellan dem". Tystnaden blir bevis på disciplin.
     Raderna materialiseras med SAMMA stagger som fynden — det läser som mer bevisning som
     anländer, aldrig som ett felmeddelande. */
  .rv-ident {
    margin: 14px 0 0; padding-top: 13px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    font-size: 12.5px; line-height: 1.6; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    b { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; font-weight: 600; }
    code { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11.5px; color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; }
    button {
      background: none; border: none; padding: 0; margin-left: 6px; cursor: pointer;
      font: inherit; color: ${e=>{let{theme:t}=e;return t.dossier.tealBright}};
      border-bottom: 1px solid rgba(93,214,202,.35);
      &:hover { border-bottom-color: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; }
    }
  }
  .rv-aperture {
    margin: 14px 0 0; padding-top: 13px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    .ap-k {
      display: flex; justify-content: space-between; align-items: baseline; gap: 14px;
      font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10px; letter-spacing: .22em;
      text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; margin-bottom: 12px;
      span:last-child { color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; letter-spacing: .14em; }
      /* Rubriken bär nu en hel mening när identiteten är olöst ("Vi läste 14 bolag som heter
         något med Skanska. Vilket är ert?"). Versaler med .22em spärr är rätt för en etikett och
         fel för en mening — den vill kunna radbrytas utan att se ut som ett larm. */
      span:first-child { text-transform: none; letter-spacing: .04em; font-size: 12.5px; line-height: 1.45; }
    }
    /* Integritetshandlingen sägs högt, en gång — den är ett kvitto på ett val vi gjorde, inte
       en brasklapp. Använder kortets befintliga .ap-foot; en ny klass hade bara varit ännu ett
       namn att skriva fel. */
    /* ── TÄTHETEN (2026-08-12) ─────────────────────────────────────────────────────────────
       Sex kandidater à ~60 px tryckte första FYNDET under vikningen på mobil. Kortet bad då om
       ett val innan det gav något — precis den invändning jag själv reste mot att dölja allt
       tills kunden valt. Raderna är strama nu, inte färre: att korta listan hade varit att dölja
       ett bolag som kunde vara deras. */
    .ap-row {
      display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 14px; align-items: baseline;
      width: 100%; text-align: left; background: none; border: none; cursor: pointer;
      padding: 6px 8px; margin: 0 -8px; border-radius: 8px;
      opacity: 0; animation: rvrise .5s cubic-bezier(.16,1,.3,1) forwards;
      @media (prefers-reduced-motion: reduce) { animation: none; opacity: 1; }
      &:hover, &:focus-visible { background: rgba(93,214,202,.07); outline: none; }
      &:hover .ap-namn { color: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; }
    }
    .ap-org { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11.5px; color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; }
    .ap-namn { display: block; font-family: ${e=>{let{theme:t}=e;return t.font.display}}; font-size: 15px; color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; line-height: 1.25; }
    /* IGENKÄNNINGSRADEN — ort · verksamhet ur samma registerpost. Ersatte "närmast er domän",
       som var stavningslikhet förklädd till vägvisare (och på avida.se pekade fel). Den här
       raden pekar inte: den låter kunden känna igen sig själv. Inga tal — se identityCandidates. */
    .ap-var { display: block; margin-top: 1px; font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
      font-size: 10px; letter-spacing: .07em; text-transform: uppercase; line-height: 1.35;
      color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; }
    .ap-foot { margin: 12px 0 0; font-size: 12px; color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; line-height: 1.6; }
    /* MOBIL: orgnr på egen rad gav TRE rader per bolag — namn, nummer, ort — och det är därför
       listan blev hög just där den har minst plats. Numret är dessutom inte det kunden känner
       igen sig i; namnet är. Nu bär mobilen två rader: namnet först, och numret hopslaget med
       ort och bransch på metaraden. Samma information, en tredjedel kortare. */
    @media (max-width: 560px) {
      .ap-row { grid-template-columns: 1fr; gap: 0; padding: 7px 8px; }
      .ap-org { display: none; }
      .ap-var::before { content: attr(data-org) ' · '; }
      .ap-namn { font-size: 14.5px; }
    }
  }

  .rv-foot {
    margin: 16px 0 0; padding-top: 14px; border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    font-size: 13px; line-height: 1.55; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    b { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; }
  }
`,Cu=vc.form`
  margin: 32px 0 22px;
  .rp-k {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10px; letter-spacing: .24em;
    text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; margin-bottom: 12px;
  }
  .rp-lede { font-size: 14.5px; line-height: 1.55; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}}; margin: 0 0 16px; max-width: 52ch;
    b { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; } }
  .rp-row { display: flex; gap: 10px; flex-wrap: wrap; }
  input {
    flex: 1 1 240px; min-width: 0; padding: 14px 16px; font-size: 15px;
    background: ${e=>{let{theme:t}=e;return t.dossier.bgRaised}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; outline: none; transition: border-color .15s;
    &::placeholder { color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; }
    &:focus { border-color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; }
  }
  button {
    flex: 0 0 auto; padding: 14px 22px; font-size: 15px; font-weight: 600; cursor: pointer;
    border: none; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    color: ${e=>{let{theme:t}=e;return t.dossier.bg}}; background: ${e=>{let{theme:t}=e;return t.dossier.tealBright}};
    transition: opacity .15s; &:hover { opacity: .9; } &:disabled { opacity: .5; cursor: default; }
  }
  .rp-note { margin: 12px 0 0; font-size: 13px; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}}; }
`,Au=vc.div`
  /* ── TVÅ SUBTRAKTIVA JUSTERINGAR (2026-08-13, efter grundarens dom) ────────────────────────
     Försöket att skilja ut bryggan med en LJUS yta föll: den lästes som en annons, inte som en
     dossier — precis den risk som stod skriven här när den byggdes. Läxan är att premium inte
     nås genom mer signal utan genom mindre. Kvar står ursprunget, med två BORTTAG:
       · mer luft ovanför (24 → 40 px). Ett nytt anslag markeras med tystnad, inte med färg.
       · glödringen borta. Bryggan bar hårlinje PLUS en teal ring PLUS en radiell teal-tvätt PLUS
         accentlinjen — fyra signaler för ett block. Ringen fick den att härma kortets hela ram
         och därmed läsa som ett syskon. Utan den är bryggan LUGNARE än kortet och blir paradoxalt
         nog tydligare: den slutar konkurrera och börjar avsluta. */
  margin: 40px 0 0;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
  box-shadow: 0 18px 48px rgba(6,14,12,.45);
  background:
    radial-gradient(120% 130% at 0% 0%, rgba(43,196,172,.11), transparent 62%),
    ${e=>{let{theme:t}=e;return t.dossier.bgRaised}};
  padding: 24px 24px 20px;
  position: relative; overflow: hidden;
  /* Accentlinjen i överkant: samma signal som radarns svep — riktning, inte dekor. */
  &::before {
    content: ''; position: absolute; left: 0; right: 0; top: 0; height: 2px;
    background: linear-gradient(90deg, ${e=>{let{theme:t}=e;return t.dossier.tealBright}}, rgba(43,196,172,0) 72%);
  }

  .br-k {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10px; letter-spacing: .22em;
    text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; margin-bottom: 14px;
  }
  .br-h {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}}; font-weight: 600;
    font-size: clamp(22px, 3.2vw, 28px); line-height: 1.22; letter-spacing: -.01em;
    color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}};
    em { display: block; font-style: italic; font-weight: 500; color: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; }
  }
  .br-p { margin-top: 12px; max-width: 62ch; font-size: 13.5px; line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}}; b { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; } }

  /* Adressen är en ADRESS, inte ett fält. Den gamla full­breda rutan såg ut som något man skulle
     skriva i — en falsk affordans mitt i sidans viktigaste handling. Nu hugger den om texten,
     bär ett kuvert och står bredvid den enda knapp som gör något. */
  .br-adr { margin-top: 18px; display: flex; align-items: stretch; gap: 10px; flex-wrap: wrap; }
  .br-mail {
    flex: 0 1 auto; display: inline-flex; align-items: center; gap: 10px;
    padding: 0 16px; min-height: 48px; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    border: 1px dashed rgba(43,196,172,.34); background: ${e=>{let{theme:t}=e;return t.dossier.bg}};
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 14.5px; letter-spacing: .01em;
    color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; word-break: break-all;
    svg { flex: none; color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; }
  }
  .br-adr button {
    flex: 0 0 auto; cursor: pointer; border: none; font-family: inherit; font-weight: 600;
    font-size: 13.5px; padding: 0 22px; min-height: 48px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    background: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; color: #05231F;
    transition: transform .16s ease, box-shadow .16s ease;
    &:hover { transform: translateY(-1px); box-shadow: 0 10px 26px rgba(43,196,172,.28); }
    &:disabled { opacity: .8; cursor: default; transform: none; }
  }
  @media (max-width: 560px) {
    padding: 20px 18px 18px;
    .br-mail { flex: 1 1 100%; font-size: 13.5px; }
    .br-adr button { flex: 1 1 100%; }
  }

  .br-avtal {
    margin-top: 18px; padding-top: 15px; border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    font-size: 12.5px; line-height: 1.6; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    b { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; }
  }
  .br-alt {
    margin-top: 10px; font-size: 12.5px; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    a { color: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; font-weight: 600; text-decoration: none;
      border-bottom: 1px solid rgba(93,214,202,.3); &:hover { border-bottom-color: currentColor; } }
  }
`,Du=vc.div`
  position: relative; overflow: hidden;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  border: 1px dashed ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
  background: ${e=>{let{theme:t}=e;return t.dossier.bgRaised}};
  padding: 22px 22px 20px; margin: 0 0 22px;

  .tz-eyebrow { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10px; letter-spacing: .22em;
    text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; margin-bottom: 15px; }
  .tz-find { padding: 12px 0; border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    &:first-of-type { border-top: none; padding-top: 0; } }
  .blur { filter: blur(5.5px); opacity: .55; user-select: none; pointer-events: none; }
  .tz-title { font-family: ${e=>{let{theme:t}=e;return t.font.display}}; font-weight: 600; font-size: 17px;
    color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; line-height: 1.25; }
  .tz-src { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11px;
    color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; margin-top: 6px; }
  .tz-lock { margin: 15px 0 0; padding-top: 14px; border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    display: flex; gap: 9px; align-items: baseline;
    font-size: 13px; line-height: 1.5; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    b { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; }
    .tz-ico { flex-shrink: 0; color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; transform: translateY(2px); } }
`,Fu=[["Ert bokslut 2025: 52,9 mkr i oms\xe4ttning, 30 anst\xe4llda","K\xe4lla: offentliga \xe5rsredovisningsuppgifter (Bolagsverket)"],["Ni k\xf6r Microsoft 365 \u2014 bekr\xe4ftat p\xe5 flera oberoende sp\xe5r","K\xe4lla: er publika e-postupps\xe4ttning"]],Ou="faktura@inbox.arvoflow.se";function Tu(){const[e,t]=(0,r.useState)(!1);return(0,$c.jsxs)(Au,{children:[(0,$c.jsx)("div",{className:"br-k",children:"N\xe4sta steg \xb7 ert eget rum"}),(0,$c.jsxs)("div",{className:"br-h",children:["Vidarebefordra en faktura. Eller femtio.",(0,$c.jsx)("em",{children:"Sedan har ni ett eget rum hos Arvo."})]}),(0,$c.jsxs)("p",{className:"br-p",children:["Arvo l\xe4ser varje faktura, v\xe4ger priset mot verifierat marknadspris och l\xe4gger resultatet i ert rum. L\xe4nken dit kommer i svaret p\xe5 ert mejl \u2014 den \xe4r personlig."," ",(0,$c.jsx)("b",{children:"Upp till hundra fakturor i samma mejl"}),"; vi tar dem en och en."]}),(0,$c.jsxs)("div",{className:"br-adr",children:[(0,$c.jsxs)("span",{className:"br-mail",children:[(0,$c.jsxs)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8","aria-hidden":"true",children:[(0,$c.jsx)("rect",{x:"2.5",y:"5",width:"19",height:"14",rx:"2.5"}),(0,$c.jsx)("path",{d:"m3 7 9 6 9-6"})]}),Ou]}),(0,$c.jsx)("button",{type:"button",onClick:async()=>{try{await navigator.clipboard.writeText(Ou)}catch{}_u("adress_kopierad"),t(!0),setTimeout(()=>t(!1),2200)},"aria-live":"polite",children:e?"Kopierad \u2713":"Kopiera adressen"})]}),(0,$c.jsxs)("p",{className:"br-avtal",children:[(0,$c.jsx)("b",{children:"Avtalen sl\xe4pper ni i rummet."})," D\xe4r l\xe4ser vi bindningstiden ord f\xf6r ord, med citat som bevis, och s\xe4tter klockan p\xe5 sista upps\xe4gningsdag."]}),(0,$c.jsxs)("p",{className:"br-alt",children:["Sitter ni vid datorn med fakturan framme?"," ",(0,$c.jsx)(vs,{to:"/testa-faktura",onClick:()=>_u("faktura_lank"),children:"Testa med en faktura \u2192"})]})]})}function Pu(){return(0,$c.jsxs)(Du,{children:[(0,$c.jsx)("div",{className:"tz-eyebrow",children:"F\xf6rhandsvisning \xb7 ert underlag"}),Fu.map((e,t)=>{let[n,r]=e;return(0,$c.jsxs)("div",{className:"tz-find","aria-hidden":"true",children:[(0,$c.jsx)("div",{className:"tz-title blur",children:n}),(0,$c.jsx)("div",{className:"tz-src blur",children:r})]},t)}),(0,$c.jsxs)("div",{className:"tz-lock",children:[(0,$c.jsxs)("svg",{className:"tz-ico",width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[(0,$c.jsx)("rect",{x:"4",y:"11",width:"16",height:"9",rx:"2"}),(0,$c.jsx)("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"})]}),(0,$c.jsxs)("span",{children:["Detta \xe4r formen \u2014 inte ert faktiska underlag. ",(0,$c.jsx)("b",{children:"Skriv in er dom\xe4n ovan"})," s\xe5 l\xe5ser vi upp det p\xe5 sekunder, innan ni delat n\xe5got."]})]})]})}const Lu=vc.section`
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  border: 1px solid rgba(43,196,172,.30);
  background: ${e=>{let{theme:t}=e;return t.dossier.bgRaised}};
  padding: 22px 22px 18px; margin: 0 0 22px;

  .rw-eyebrow { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11px; letter-spacing: .18em;
    text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; margin-bottom: 16px; }
  .rw-beam { height: 2px; border-radius: 1px; overflow: hidden; background: ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    span { display: block; height: 100%; width: 38%; background: linear-gradient(90deg, transparent, ${e=>{let{theme:t}=e;return t.dossier.tealBright}}, transparent);
      animation: rwbeam 1.6s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) { span { animation: none; width: 100%; opacity: .4; } } }
  @keyframes rwbeam { 0% { transform: translateX(-100%); } 100% { transform: translateX(280%); } }
  .rw-status { display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px;
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11px; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    .rw-t { color: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; font-feature-settings: 'tnum'; } }
  .rw-sources { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10.5px; line-height: 2;
    color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; margin-top: 4px; }
  .rw-skel { padding: 14px 0; border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    &:first-of-type { margin-top: 14px; }
    .l1 { height: 11px; border-radius: 4px; background: linear-gradient(90deg, rgba(157,184,175,.13), rgba(157,184,175,.05)); }
    .l2 { height: 8px; border-radius: 4px; background: rgba(157,184,175,.06); margin-top: 9px; } }
`,Ru=["e-postpostur","Bolagsverket","certifikatregistret","dom\xe4nregistret","prisboken"],Iu=Ru.join(" \xb7 "),Bu=null!==(Eu=["noll","ett","tv\xe5","tre","fyra","fem","sex","sju","\xe5tta","nio"][Ru.length])&&void 0!==Eu?Eu:String(Ru.length);function Mu(e){let{doman:t}=e;const n=String(t||"").trim().toLowerCase(),a=(n.includes("@")?n.split("@")[1]:n).replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0],[i,o]=(0,r.useState)(0);return(0,r.useEffect)(()=>{const e=performance.now(),t=setInterval(()=>o((performance.now()-e)/1e3),100);return()=>clearInterval(t)},[]),(0,$c.jsxs)(Lu,{"aria-live":"polite",children:[(0,$c.jsxs)("div",{className:"rw-eyebrow",children:["Underlag",a?` \xb7 ${a}`:""]}),(0,$c.jsx)("div",{className:"rw-beam",children:(0,$c.jsx)("span",{})}),(0,$c.jsxs)("div",{className:"rw-status",children:[(0,$c.jsx)("span",{children:"l\xe4ser \xf6ppna k\xe4llor"}),(0,$c.jsxs)("span",{className:"rw-t",children:[i.toFixed(1)," s"]})]}),(0,$c.jsx)("div",{className:"rw-sources",children:Iu}),(0,$c.jsxs)("div",{className:"rw-skel",children:[(0,$c.jsx)("div",{className:"l1",style:{width:"72%"}}),(0,$c.jsx)("div",{className:"l2",style:{width:"92%"}})]}),(0,$c.jsxs)("div",{className:"rw-skel",children:[(0,$c.jsx)("div",{className:"l1",style:{width:"58%"}}),(0,$c.jsx)("div",{className:"l2",style:{width:"84%"}})]}),(0,$c.jsxs)("div",{className:"rw-skel",children:[(0,$c.jsx)("div",{className:"l1",style:{width:"66%"}}),(0,$c.jsx)("div",{className:"l2",style:{width:"78%"}})]})]})}function Vu(e){let{doman:t,setDoman:n,onSubmit:r,loading:a,reveal:i,note:o,pending:s,onValjBolag:l}=e;return(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(Cu,{onSubmit:r,children:[(0,$c.jsx)("div",{className:"rp-k",children:"Innan f\xf6rsta fakturan"}),(0,$c.jsxs)("p",{className:"rp-lede",children:["Era leverant\xf6rer har redan bildat sig en uppfattning om er \u2014 och priss\xe4tter efter den. Skriv in er ",(0,$c.jsx)("b",{children:"dom\xe4n"}),", s\xe5 visar vi p\xe5 sekunder vad de ser, ur \xf6ppna k\xe4llor."]}),(0,$c.jsxs)("div",{className:"rp-row",children:[(0,$c.jsx)("input",{type:"text",inputMode:"url",autoComplete:"off",autoCapitalize:"off",spellCheck:"false","aria-label":"Er f\xf6retagsdom\xe4n",placeholder:"ertbolag.se",value:t,onChange:e=>n(e.target.value),disabled:a}),(0,$c.jsx)("button",{type:"submit",disabled:a||!t.trim(),children:a?"\xd6ppnar\u2026":"\xd6ppna underlaget \u2192"})]}),o&&(0,$c.jsx)("p",{className:"rp-note",children:o})]}),a&&(0,$c.jsx)(Mu,{doman:t}),!a&&i&&(0,$c.jsx)(Uu,{domain:i.domain,findings:i.findings,pending:s,identity:i.identity,onValjBolag:l})]})}function Uu(e){var t;let{domain:n,findings:a,pending:i,identity:o,onValjBolag:s}=e;const[l,d]=r.useState(!1),[c,u]=r.useState(!1);if(!n||null===a||void 0===a||!a.length)return null;const p=null!==(t=null===o||void 0===o?void 0:o.candidates)&&void 0!==t?t:[],m=p.length>1&&"function"===typeof s,f=!(null!==o&&void 0!==o&&o.confirmedName)&&m,h=m&&(f&&!c||l),g=e=>{d(e),u(!e)},x=h,v=(()=>{const e=n.split(".")[0];return e.charAt(0).toUpperCase()+e.slice(1)})(),b=h?(0,$c.jsxs)("div",{className:"rv-aperture",children:[(0,$c.jsxs)("div",{className:"ap-k",children:[(0,$c.jsx)("span",{children:f?`Vi l\xe4ste ${p.length} bolag som heter n\xe5got med ${v}. Vilket \xe4r ert?`:"Vilket bolag \xe4r ni?"}),(0,$c.jsxs)("span",{children:[p.length," m\xf6jliga"]})]}),p.map((e,t)=>(0,$c.jsxs)("button",{type:"button",className:"ap-row",style:{animationDelay:.07*t+"s"},onClick:()=>{g(!1),s(e.orgnr)},children:[(0,$c.jsx)("span",{className:"ap-org",children:Su(e.orgnr)}),(0,$c.jsxs)("span",{children:[(0,$c.jsx)("span",{className:"ap-namn",children:e.legalName}),(0,$c.jsx)("span",{className:"ap-var","data-org":Su(e.orgnr),children:[e.ort,e.bransch].filter(Boolean).join(" \xb7 ")})]})]},e.orgnr)),f&&(0,$c.jsx)("p",{className:"ap-foot",children:"Vi kunde ha gissat. Ett fel val hade visat er n\xe5gon annans bokslut \u2014 d\xe4rf\xf6r fr\xe5gar vi."})]}):null;return(0,$c.jsxs)(zu,{className:"rv-card",children:[(0,$c.jsxs)("div",{className:"rv-eyebrow",children:["Underlag \xb7 ",n]}),f&&b,a.map((e,t)=>(0,$c.jsxs)("div",{className:"rv-find",style:{animationDelay:.14*t+"s"},children:[(0,$c.jsx)("div",{className:"rv-title",children:e.title}),e.detail&&(0,$c.jsx)("div",{className:"rv-detail",children:e.detail}),(0,$c.jsxs)("div",{className:"rv-source",children:[(0,$c.jsx)("b",{children:"K\xe4lla:"})," ",e.source]})]},t)),(null===o||void 0===o?void 0:o.confirmedName)&&!x&&(0,$c.jsxs)("p",{className:"rv-ident",children:["G\xe4ller ",(0,$c.jsx)("b",{children:o.confirmedName})," ",(0,$c.jsx)("code",{children:Su(o.confirmed)}),o.byHuman&&" \xb7 bekr\xe4ftat av er",m&&(0,$c.jsxs)($c.Fragment,{children:[". Inte ert bolag?",(0,$c.jsx)("button",{type:"button",onClick:()=>g(!0),children:"Byt \u2192"})]})]}),f&&c&&(0,$c.jsx)("p",{className:"rv-ident",children:(0,$c.jsx)("button",{type:"button",onClick:()=>g(!0),children:"V\xe4lj ert bolag \u2014 s\xe5 l\xe4ser vi bokslutet \u2192"})}),!f&&b,i&&(0,$c.jsx)("div",{className:"rv-receipt",style:{borderStyle:"dashed"},children:"Djupare register arbetar fortfarande \u2014 certifikatregistret svarar l\xe5ngsamt. Fler rader kan landa h\xe4r."}),!i&&(0,$c.jsxs)("div",{className:"rv-receipt",children:[(0,$c.jsxs)("b",{children:[Bu," \xf6ppna register"]})," l\xe4sta \u2014 ",Iu," \xb7 innan ni delat n\xe5got"]}),(0,$c.jsxs)("p",{className:"rv-foot",children:["Allt ovan \xe4r ",(0,$c.jsx)("b",{children:"offentlig information"})," \u2014 innan ni loggat in, utan att ni l\xe4mnat ifr\xe5n er n\xe5got. T\xe4nk er vad vakten ser den dag ni delar en faktura."]})]})}const Ku={platform:0,suppliers:1,koncern:2,spoofing:3,business:4,trend:5,cross:6,heritage:7,onboarding:8,domain:9,cert:10,dmarc:11},Hu=new Set(["market","bridge","infra"]);function Wu(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return Array.isArray(e)?e.filter(e=>e&&e.title&&!Hu.has(e.kind)).slice().sort((e,t)=>{var n,r;return(null!==(n=Ku[e.kind])&&void 0!==n?n:99)-(null!==(r=Ku[t.kind])&&void 0!==r?r:99)}).slice(0,t).map(e=>function(e){let t=String(e||"").trim();return t?(t=t.split(/\s+[\u2014\u2013]\s+/)[0],t=t.split(":")[0].trim(),t=t.replace(/^Ni\s+/,"ni "),t.charAt(0).toLowerCase()+t.slice(1)):""}(e.title)).filter(Boolean):[]}const qu={2:"tv\xe5",3:"tre",4:"fyra",5:"fem",6:"sex",7:"sju",8:"\xe5tta",9:"nio",10:"tio",11:"elva",12:"tolv"};function Gu(e){const t=(e||[]).filter(Boolean).map(e=>{return`att ${t=e,String(t||"").replace(/\b(\d{1,2})\s+(?=[a-z\xe5\xe4\xf6])/g,(e,t)=>{const n=qu[Number(t)];return n?`${n} `:e})}`;var t});return function(e){const t=(e||[]).filter(Boolean);return 0===t.length?"":1===t.length?t[0]:`${t.slice(0,-1).join(", ")} och ${t[t.length-1]}`}(t)}const Yu=wc.font.mono,Ju=wc.font.display,Qu=wc.dossier,Xu=hc`
  opacity: 0; transform: translateY(22px);
  transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
  &.inview { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
`,Zu=vc.main`
  background: ${wc.color.bg};
  color: ${wc.color.ink};
  overflow-x: hidden;
`,ep=vc.section`
  max-width: 920px; margin: 0 auto; text-align: center;
  padding: 96px 24px 84px;
  @media (max-width: 640px) { padding: 64px 20px 60px; }

  .eyebrow {
    font-family: ${Yu}; font-size: 10px; letter-spacing: .32em; text-transform: uppercase;
    color: ${wc.color.brand};
    ${Xu}
  }
  h1 {
    font-family: ${Ju}; font-weight: 500; letter-spacing: -.015em;
    font-size: clamp(42px, 7.2vw, 76px); line-height: 1.05;
    margin: 30px 0 0;
    em { font-style: italic; color: ${wc.color.brand}; }
    ${Xu} transition-delay: .08s;
  }
  .lede {
    font-size: 16.5px; line-height: 1.75; color: ${wc.color.mutedSoft};
    max-width: 540px; margin: 30px auto 0;
    ${Xu} transition-delay: .16s;
  }
  .actions { margin-top: 40px; ${Xu} transition-delay: .24s; }
  .cta {
    display: inline-block; cursor: pointer; border: none; font-family: inherit;
    font-size: 15px; font-weight: 600; color: ${wc.color.surface}; padding: 17px 40px;
    border-radius: ${wc.size.radius.pill};
    background: ${wc.color.brandGradient};
    box-shadow: 0 16px 44px rgba(27,122,110,.30);
    transition: transform .18s ease, box-shadow .18s ease;
    &:hover { transform: translateY(-1px); box-shadow: 0 20px 52px rgba(27,122,110,.38); }
  }
  .sub {
    font-size: 12.5px; color: ${wc.color.mutedSoft}; margin-top: 15px;
    a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
  }
  .proof {
    font-family: ${Yu}; font-size: 9.5px; letter-spacing: .22em; text-transform: uppercase;
    color: ${wc.color.mutedSoft}; margin-top: 50px;
    ${Xu} transition-delay: .32s;
    @media (max-width: 640px) { line-height: 2.1; }
  }
`,tp=vc.div`
  max-width: 1120px; margin: 0 auto; padding: 0 20px;
`,np=vc.section`
  background: ${Qu.bg};
  border-radius: 30px;
  position: relative; overflow: hidden;
  box-shadow: 0 60px 140px rgba(8,15,13,.38);
  padding: 72px 34px 88px;
  @media (max-width: 640px) { padding: 52px 20px 64px; border-radius: 22px; }

  /* Dossiern läggs på bordet: fade + lyft + lätt skalning */
  opacity: 0; transform: translateY(34px) scale(.985);
  transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
  &.inview { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }

  /* Materialet (premium-lyftet 2026-07-13): korn + kantljus gör dossiern till ett FÖREMÅL.
     Kornets opacitet bor i SVG:n (0.04) — det ska kännas, inte ses. */
  &::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E"),
      radial-gradient(1100px 480px at 50% -8%, rgba(43,196,172,.13), transparent 65%);
  }
  /* Dubbel keyline — bokpärmen: en inre hårlinje 10px från kanten. */
  &::after {
    content: ''; position: absolute; inset: 10px; pointer-events: none;
    border: 1px solid rgba(157,184,175,.09); border-radius: 21px;
    @media (max-width: 640px) { inset: 7px; border-radius: 16px; }
  }
  /* ── MÅTTSYSTEMET (grundarbeslut 2026-08-07, kväll) ───────────────────────────────────────
     Dossiern bar FEM mått: regeln 680, rubrikerna 560, underlaget 880, rummets kort 640 — och
     ett negativt marginalpåhitt som skulle bryta ut underlaget ur prosakolumnen. Utbrottet
     räknade −100px mot .inner (680), men underlagets VERKLIGA förälder är DoorBlock (560).
     Kortet landade därför 60px höger om sidans mittlinje: mätt live 420..1300, mitt 860 mot
     sidans 800. Grundaren såg det med ögat; ingen maskin hade sagt ifrån.
     Felet var inte talet −100. Felet var att ett mått räknades FÖR HAND mot en förälder som
     antogs — samma sjukdom som en prisbok utan vakt. Botemedlet är inte ett rättat tal utan
     ett system utan aritmetik:
       bevismåttet — regeln OCH båda bilagorna (underlaget, rummets kort). Samma kant, alltid.
       prosamåttet — rubrik, ingress, formulär. Centrerat inuti bevismåttet.
     Ingen behållare har längre en egen marginal att räkna fel på: bilagan ÄR kolumnen.
     Maskinvakt: MITTLINJEN i scripts/live-door-lekia.mjs mäter kortets mitt mot sidans i DOM,
     i mobil och desktop, vid varje körning. */
  --matt-bevis: 880px;
  --matt-prosa: 560px;
  .inner { max-width: var(--matt-bevis); margin: 0 auto; position: relative; z-index: 1; }
`,rp=vc.div`
  display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
  border-bottom: 1px solid ${e=>{let{$light:t}=e;return t?wc.color.border:Qu.hairlineOnDark}};
  padding-bottom: 15px;
  .k-num {
    font-family: ${Yu}; font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    color: ${e=>{let{$light:t}=e;return t?wc.color.brand:Qu.teal}};
  }
  .k-note {
    font-family: ${Yu}; font-size: 9px; letter-spacing: .2em; text-transform: uppercase;
    color: ${e=>{let{$light:t}=e;return t?wc.color.mutedSoft:Qu.faintOnDark}}; text-align: right;
  }
`,ap=vc.div`
  margin: 46px auto 0;
  ${Xu}
  h3 {
    font-family: ${Ju}; font-size: clamp(28px, 4.4vw, 38px); font-weight: 500;
    color: ${Qu.inkOnDark}; margin: 0 0 4px; line-height: 1.2; text-align: center;
    em { font-style: italic; }
  }
  > h3, > form, > .prosa { max-width: var(--matt-prosa); margin-left: auto; margin-right: auto; }
`,ip=vc.div`
  margin-top: 104px;
  @media (max-width: 640px) { margin-top: 72px; }
  /* Centrerad som dörrens rubrik (grundarbeslut 2026-07-24) — de två akterna i dossiern
     ska bära samma typografiska hållning, inte en centrerad och en vänsterställd. */
  h2 {
    font-family: ${Ju}; font-size: clamp(30px, 4.8vw, 44px); font-weight: 500;
    line-height: 1.18; margin: 46px auto 0; max-width: var(--matt-prosa); text-align: center;
    color: ${Qu.inkOnDark};
    em { font-style: italic; color: ${Qu.tealBright}; }
    ${Xu}
  }
`,op=vc.div`
  max-width: var(--matt-bevis); margin: 56px auto 0;
  ${Xu} transition-delay: .1s;

  .a-card {
    position: relative; overflow: hidden;
    border: 1px solid rgba(43,196,172,.30); border-radius: 20px;
    background: radial-gradient(560px 260px at 12% -18%, rgba(43,196,172,.13), transparent 60%), ${Qu.bgRaised};
    box-shadow: 0 50px 110px rgba(0,0,0,.6);
  }
  .a-card::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.045'/%3E%3C/svg%3E");
  }
  .a-card::after {
    content: ''; position: absolute; inset: 9px; pointer-events: none;
    border: 1px solid rgba(157,184,175,.08); border-radius: 13px;
  }
  .a-sec { position: relative; padding: 22px 30px; border-top: 1px solid ${Qu.hairlineOnDark};
    &:first-child { border-top: none; }
    @media (max-width: 640px) { padding: 18px 18px; } }

  /* Vaktens hjärtslag — beviset att en maskin var vaken i natt */
  .a-pulse { display: flex; align-items: center; gap: 15px; }
  .a-disc { position: relative; width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%;
    border: 1px solid rgba(93,232,210,.18);
    &::after { content: ''; position: absolute; inset: 8px; border-radius: 50%; border: 1px solid rgba(93,232,210,.12); } }
  .a-sweep { position: absolute; inset: 0; border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(93,232,210,.0) 250deg, rgba(93,232,210,.5) 360deg);
    mask: radial-gradient(circle, transparent 58%, #000 59%);
    -webkit-mask: radial-gradient(circle, transparent 58%, #000 59%);
    animation: asweep 3.4s linear infinite;
    @media (prefers-reduced-motion: reduce) { animation: none; opacity: .55; } }
  @keyframes asweep { to { transform: rotate(360deg); } }
  .a-plabel { display: block; font-family: ${Yu}; font-size: 9px; letter-spacing: .24em;
    text-transform: uppercase; color: ${Qu.faintOnDark}; margin-bottom: 3px; }
  .a-pline { font-size: 13px; line-height: 1.5; color: ${Qu.inkOnDark};
    b { font-weight: 600; } em { font-style: normal; color: ${Qu.tealBright}; } }

  /* Veckodomen — förtjänat lugn, metallic som i rummet */
  .a-dom { font-family: ${Ju}; font-size: clamp(20px, 3.6vw, 25px); font-weight: 500;
    line-height: 1.3; margin-top: 12px;
    background: ${Qu.metallicText}; -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent; }

  /* Den levande fortsättningen från dörren */
  .a-cont { font-size: 13.5px; line-height: 1.65; color: ${Qu.mutedOnDark};
    b { color: ${Qu.inkOnDark}; font-weight: 600; }
    em { font-style: normal; color: ${Qu.tealBright}; } }

  .a-sum { font-size: 12.5px; line-height: 1.55; color: ${Qu.mutedOnDark};
    padding-top: 12px; border-top: 1px solid ${Qu.hairlineOnDark}; }

  .a-foot { font-size: 13px; line-height: 1.6; color: ${Qu.mutedOnDark};
    b { color: ${Qu.inkOnDark}; font-weight: 600; } }

  .a-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .a-eyebrow { font-family: ${Yu}; font-size: 9.5px; letter-spacing: .24em; text-transform: uppercase; color: ${Qu.teal};
    display: inline-flex; align-items: center; gap: 8px;
    &::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: ${Qu.tealBright};
      animation: dotpulse 2.6s ease-out infinite; } }
  .a-count { font-family: ${Yu}; font-size: 9.5px; color: ${Qu.faintOnDark}; }
  @keyframes dotpulse { 0%{box-shadow:0 0 0 0 rgba(93,232,210,.45);} 70%{box-shadow:0 0 0 7px rgba(93,232,210,0);} 100%{box-shadow:0 0 0 0 rgba(93,232,210,0);} }
  @media (prefers-reduced-motion: reduce) { .a-eyebrow::before { animation: none; } }

  .a-row {
    display: flex; gap: 16px; align-items: baseline; padding: 13px 0;
    border-top: 1px solid ${Qu.hairlineOnDark};
    opacity: 0; transform: translateX(-14px);
    transition: opacity .55s ease, transform .55s ease;
    &.inview { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
  }
  .a-days { font-family: ${Yu}; font-size: 12px; width: 84px; flex-shrink: 0;
    font-feature-settings: 'tnum';
    color: ${Qu.tealBright}; &.akut { color: ${Qu.signal}; } }
  .a-sup { font-size: 14px; font-weight: 600; color: ${Qu.inkOnDark}; }
  .a-txt { font-size: 12px; color: ${Qu.mutedOnDark}; margin-top: 2px; line-height: 1.5; }
  .a-caption {
    text-align: center; font-family: ${Yu}; font-size: 9.5px; letter-spacing: .18em;
    text-transform: uppercase; color: ${Qu.faintOnDark}; margin-top: 18px; line-height: 1.9;
    b { color: ${Qu.mutedOnDark}; font-weight: 500; }
  }
`,sp=vc.section`
  max-width: 820px; margin: 0 auto; padding: 88px 24px 0;
  @media (max-width: 640px) { padding: 64px 20px 0; }
`,lp=vc.div`
  display: flex; gap: 0; margin-top: 42px; flex-wrap: wrap;
  .step {
    flex: 1; min-width: 210px; padding: 2px 24px 8px 22px;
    border-left: 1px solid ${wc.color.border};
    ${Xu}
    &:nth-child(2) { transition-delay: .1s; }
    &:nth-child(3) { transition-delay: .2s; }
    @media (max-width: 700px) { min-width: 100%; margin-bottom: 22px; }
  }
  .s-num { font-family: ${Ju}; font-style: italic; font-size: 15px; color: ${wc.color.brand}; }
  .s-t { font-size: 15px; font-weight: 600; color: ${wc.color.ink}; margin: 8px 0 6px; }
  .s-d { font-size: 12.5px; line-height: 1.65; color: ${wc.color.mutedSoft}; }
`,dp=vc.div`
  text-align: center; margin-top: 46px;
  ${Xu}
  .p-serif {
    font-family: ${Ju}; font-size: clamp(23px, 3.4vw, 31px); font-weight: 500;
    color: ${wc.color.ink}; line-height: 1.35;
    em { font-style: italic; color: ${wc.color.brand}; }
  }
  .p-sub { font-size: 13px; color: ${wc.color.mutedSoft}; max-width: 460px; margin: 15px auto 0; line-height: 1.7; }
`,cp=vc.div`
  display: flex; gap: 16px; margin-top: 42px; flex-wrap: wrap;
  .pc {
    flex: 1; min-width: 280px; border-radius: 20px; padding: 26px;
    ${Xu}
  }
  .pc.dark { background: ${Qu.bgRaised}; box-shadow: 0 30px 70px rgba(8,15,13,.30); }
  .pc.lightc { border: 1px solid ${wc.color.border}; background: #fff; transition-delay: .1s; }
  .pc-k { font-family: ${Yu}; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; }
  .dark .pc-k { color: ${Qu.tealBright}; }
  .lightc .pc-k { color: ${wc.color.brand}; }
  .pc-pris { font-family: ${Yu}; font-size: 26px; margin: 14px 0 4px; }
  .pc-pris small { font-size: 11px; }
  .dark .pc-pris { color: ${Qu.inkOnDark}; }
  .dark .pc-pris small { color: ${Qu.faintOnDark}; }
  .lightc .pc-pris { color: ${wc.color.ink}; }
  .lightc .pc-pris small { color: ${wc.color.mutedSoft}; }
  .pc-lede { font-size: 12px; margin-bottom: 15px; line-height: 1.55; }
  .dark .pc-lede { color: ${Qu.mutedOnDark}; }
  .lightc .pc-lede { color: ${wc.color.mutedSoft}; }
  .pc-row { display: flex; gap: 8px; font-size: 12px; padding: 4px 0; line-height: 1.5; }
  .pc-row .tick { flex-shrink: 0; }
  .dark .pc-row { color: ${Qu.mutedOnDark}; }
  .dark .pc-row .tick { color: ${Qu.teal}; }
  .lightc .pc-row { color: ${wc.color.mutedSoft}; }
  .lightc .pc-row .tick { color: ${wc.color.brand}; }
  .pc-cta {
    display: block; text-align: center; margin-top: 18px; padding: 13px;
    border-radius: ${wc.size.radius.pill}; font-size: 13px; font-weight: 600;
    text-decoration: none; transition: opacity .15s, transform .15s;
    &:hover { opacity: .92; transform: translateY(-1px); }
  }
  .dark .pc-cta { color: ${wc.dossier.bg}; background: linear-gradient(135deg, ${Qu.tealBright}, ${Qu.teal}); }
  .lightc .pc-cta { color: ${wc.color.brand}; border: 1px solid ${wc.color.border}; }
`,up=vc.div`
  margin-top: 8px;
  .f-item { border-bottom: 1px solid ${wc.color.border}; }
  .f-q {
    width: 100%; background: none; border: none; cursor: pointer; text-align: left;
    display: flex; justify-content: space-between; align-items: center; gap: 14px;
    padding: 19px 4px; font-size: 14.5px; font-weight: 500; color: ${wc.color.ink};
    font-family: inherit;
  }
  .f-q .f-plus { font-family: ${Yu}; color: ${wc.color.mutedSoft}; font-size: 15px; flex-shrink: 0;
    transition: transform .25s ease; }
  .f-q[aria-expanded='true'] .f-plus { transform: rotate(45deg); }
  .f-a {
    overflow: hidden; max-height: 0; transition: max-height .4s ease;
    @media (prefers-reduced-motion: reduce) { transition: none; }
  }
  .f-a.open { max-height: 420px; }
  .f-a p { margin: 0; padding: 0 4px 20px; font-size: 13px; line-height: 1.7; color: ${wc.color.mutedSoft}; max-width: 64ch; }
`,pp=vc.section`
  max-width: 820px; margin: 0 auto; text-align: center; padding: 96px 24px 88px;
  @media (max-width: 640px) { padding: 68px 20px 64px; }
  .lw-serif {
    font-family: ${Ju}; font-size: clamp(24px, 3.6vw, 30px); font-weight: 500;
    color: ${wc.color.ink}; line-height: 1.3;
    em { font-style: italic; color: ${wc.color.brand}; }
    ${Xu}
  }
  .lw-cta {
    display: inline-block; margin-top: 30px; font-size: 15px; font-weight: 600; color: ${wc.color.surface};
    padding: 16px 38px; border-radius: ${wc.size.radius.pill}; text-decoration: none;
    background: ${wc.color.brandGradient};
    box-shadow: 0 16px 44px rgba(27,122,110,.30);
    transition: transform .18s ease;
    &:hover { transform: translateY(-1px); }
    ${Xu} transition-delay: .1s;
  }
  .lw-sign { font-family: ${Ju}; font-style: italic; font-size: 13px; color: ${wc.color.mutedSoft}; margin-top: 62px; }
`;function mp(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.18;const t=(0,r.useRef)(null),[n,a]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{const n=t.current;if(!n)return;if("undefined"===typeof IntersectionObserver)return void a(!0);const r=new IntersectionObserver(e=>{let[t]=e;t.isIntersecting&&(a(!0),r.disconnect())},{threshold:e});return r.observe(n),()=>r.disconnect()},[e]),[t,n?"inview":""]}const fp=[{days:266,akut:!1,sup:"Telia",txt:"Ett redan missat f\xf6nster uppt\xe4ckt \u2014 n\xe4sta bevakas 1 april 2027. Motdraget ligger f\xe4rdigt."}],hp=[{q:"Vad kostar det?",a:"Arvo erbjuds i tv\xe5 lager. Arvo Intelligence kostar 1 995 kr/m\xe5n \u2014 l\xf6pande bevakning, smygh\xf6jningslarm och avtalsbevakning, ingen bindningstid. Arvo Switch \xe4r ett till\xe4gg: i kategorier d\xe4r bytet \xe4r systematiserat f\xf6rbereder Arvo hela bytet \u2014 upps\xe4gning, nyteckning, tajming \u2014 och ni godk\xe4nner med BankID. Arvodet \xe4r 20 % av f\xf6rsta \xe5rets kontrakterade besparing: skillnaden mellan ert gamla fakturapris och det nya avtalets pris, b\xe5da dokumenterade svart p\xe5 vitt. Det faktureras f\xf6rst n\xe4r det nya avtalet b\xf6rjat g\xe4lla \u2014 och visar era fakturor senare att besparingen inte landat, justerar vi arvodet. Blir det ingen besparing kostar Switch ingenting."},{q:"Hur kan ni vara s\xe4kra p\xe5 att rekommendationerna \xe4r opartiska?",a:(0,$c.jsxs)($c.Fragment,{children:["Vi tj\xe4nar pengar bara n\xe4r ni sparar \u2014 det \xe4r beviset p\xe5 opartiskhet. Leverant\xf6rer kan inte k\xf6pa sig en h\xf6gre placering, f\xf6r vi tar aldrig en krona fr\xe5n dem: noll provision, noll partner-avgift, ingen d\xf6rr in. V\xe5r enda int\xe4kt \xe4r er besparing. Policyn \xe4r \xf6ppet publicerad under ",(0,$c.jsx)(vs,{to:"/bias",children:"v\xe5r rankningspolicy"}),"."]})},{q:"Varf\xf6r ska jag lita p\xe5 era besparingskalkyler?",a:"Vi bygger p\xe5 verifierade marknadsdata \u2014 offentliga listpriser, ramavtalsdata och faktiska operat\xf6rspriser. Och eftersom v\xe5rt arvode \xe4r 20 % av den kontrakterade besparingen \u2014 skillnaden mellan ert gamla fakturapris och det nya avtalets, b\xe5da dokumenterade \u2014 har vi inget att vinna p\xe5 att \xf6verdriva: en projektion som inte h\xe5ller kostar oss f\xf6rtroendet och arvodet. Vi tj\xe4nar mer p\xe5 att lova lite och leverera fullt ut."},{q:"Vad h\xe4nder om den nya leverant\xf6ren h\xf6jer priset efter bytet?",a:"V\xe5r fee baseras p\xe5 kontrakterade priser vid avtalssignering. F\xf6r\xe4ndras marknadsl\xe4get efter bytet hj\xe4lper vi er med en ny analys \u2014 utan extra kostnad."},{q:"S\xe4ger ni upp avtal autonomt utan mitt godk\xe4nnande?",a:"Aldrig. Varje byte kr\xe4ver er BankID-signatur. Vi f\xf6rbereder, ni godk\xe4nner. Det \xe4r en h\xe5rd regel."},{q:"Vilka kategorier t\xe4cker ni idag?",a:"Vi bevakar er kostnad i tre l\xe4gen. I el, mobil och f\xf6retagsbredband f\xf6rbereder Arvo hela bytet \u2014 upps\xe4gning och nyteckning, f\xe4rdigtajmat \u2014 ni godk\xe4nner med BankID, och den vinnande leverant\xf6ren sk\xf6ter inkopplingen enligt branschens regler. I programvara / SaaS, kortterminaler, fakturatj\xe4nster och l\xf6neadministration f\xf6rbereder Arvo hela bytet \u2014 ni formaliserar med ett klick. I f\xf6rs\xe4kring, leasing, larm och tj\xe4nsteavtal levererar vi fyndet, tajmingen och det exakta motbudet och bev\xe4pnar er att agera (f\xf6rs\xe4kringsbyten genomf\xf6rs n\xe4r v\xe5r FI-licens \xe4r klar). Fler kategorier l\xe4ggs till varje kvartal baserat p\xe5 var vi ser st\xf6rst besparingar i kunddatan."},{q:"Vad h\xe4nder med min data?",a:"Arvo ser endast det ni vidarebefordrar \u2014 leverant\xf6rsfakturor, inget annat. Behandlingen sker inom EU/EES och i USA hos namngivna underbitr\xe4den under EU-godk\xe4nda standardavtalsklausuler (SCC) \u2014 varje bitr\xe4de st\xe5r listat med namn, funktion och land i v\xe5r integritetspolicy, inklusive de vi \xe4nnu inte tagit i drift. Kopplar ni in Fortnox eller Visma g\xe4ller samma princip: enbart l\xe4s-r\xe4ttigheter mot leverant\xf6rsfakturor. Vi s\xe4ljer aldrig identifierbar data \u2014 anonymiserade branschindex \xe4r v\xe5r enda dataprodukt ut\xf6ver tj\xe4nsten."}];function gp(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleTimeString("sv-SE",{hour:"2-digit",minute:"2-digit"}),r=e=>{const t=new Date(e);return t.setHours(0,0,0,0),t},a=Math.round((r(new Date)-r(t))/864e5);return a<=0?`i dag ${n}`:1===a?`i natt ${n}`:`${t.toLocaleDateString("sv-SE",{day:"numeric",month:"short"})} ${n}`}function xp(e){let{r:t,index:n,parentIn:a}=e;const i=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:900;const[a,i]=(0,r.useState)(0);return(0,r.useEffect)(()=>{var r,a;if(!t)return;if("undefined"!==typeof window&&null!==(r=(a=window).matchMedia)&&void 0!==r&&r.call(a,"(prefers-reduced-motion: reduce)").matches)return void i(e);const o=performance.now();let s;const l=t=>{const r=Math.min((t-o)/n,1);i(Math.round(e*(1-Math.pow(1-r,3)))),r<1&&(s=requestAnimationFrame(l))};return s=requestAnimationFrame(l),()=>cancelAnimationFrame(s)},[e,t,n]),t?a:0}(t.days,a,700+150*n);return(0,$c.jsxs)("div",{className:"a-row "+(a?"inview":""),style:{transitionDelay:.15+.12*n+"s"},children:[(0,$c.jsxs)("span",{className:"a-days"+(t.akut?" akut":""),children:[(t.days,i)," dagar"]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"a-sup",children:t.sup}),(0,$c.jsx)("div",{className:"a-txt",children:t.txt})]})]})}function vp(){const[e,t]=(0,r.useState)(""),[n,a]=(0,r.useState)(!1),[i,o]=(0,r.useState)(null),[s,l]=(0,r.useState)(""),[d,c]=(0,r.useState)(!1),u=(0,r.useRef)(null),p=(0,r.useCallback)(async t=>{const n=e.trim();if(n&&t){a(!0);try{var r;const e=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:n,orgnr:t})}),a=await e.json();if(null!==a&&void 0!==a&&a.ok&&null!==(r=a.findings)&&void 0!==r&&r.length){o({domain:a.domain,findings:a.findings,identity:a.identity}),c(!1);try{localStorage.setItem(`arvo_bolag:${a.domain}`,t)}catch{}}}catch{}finally{a(!1)}}},[e]),m=(0,r.useCallback)(async t=>{var r;null===t||void 0===t||null===(r=t.preventDefault)||void 0===r||r.call(t);const i=e.trim();if(i&&!n){a(!0),o(null),l(""),_u("doman_skickad");try{var s;const e=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:i,fast:!0})}),t=await e.json().catch(()=>({}));if(t.ok&&null!==(s=t.findings)&&void 0!==s&&s.length){_u("kort_visat",{fynd:t.findings.length}),o({domain:t.domain,findings:t.findings,identity:t.identity}),c(!0),a(!1);try{const e=new AbortController,n=setTimeout(()=>e.abort(),18e3);try{var d;const n=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:i}),signal:e.signal}),r=await n.json().catch(()=>({}));if(r.ok&&null!==(d=r.findings)&&void 0!==d&&d.length){const e=new Set(t.findings.map(e=>e.title)),n=r.findings.filter(t=>!e.has(t.title)).slice(0,Math.max(0,5-t.findings.length));n.length&&o(e=>({...e,domain:t.domain,findings:[...t.findings,...n]}))}}finally{clearTimeout(n)}}catch{}try{const e=new AbortController,t=setTimeout(()=>e.abort(),28e3);try{var u;const t=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:i,ctOnly:!0}),signal:e.signal}),n=await t.json().catch(()=>({}));n.ok&&null!==(u=n.findings)&&void 0!==u&&u.length&&o(e=>{if(null===e||void 0===e||!e.findings)return e;const t=new Set(e.findings.map(e=>e.title)),r=n.findings.filter(e=>!t.has(e.title));return r.length?{...e,findings:[...e.findings,...r]}:e})}finally{clearTimeout(t)}}catch{}c(!1)}else _u("kort_tomt"),l(t.note||t.error||"Dom\xe4nen bar inga \xf6ppna sp\xe5r just nu \u2014 dela en faktura i st\xe4llet, s\xe5 l\xe4ser vi de verkliga talen.")}catch{l("Kunde inte l\xe4sa av dom\xe4nen just nu \u2014 f\xf6rs\xf6k igen om en stund.")}finally{a(!1)}}},[e,n]),f=(0,r.useCallback)(()=>{var e;null===(e=u.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{var e,t;return null===(e=u.current)||void 0===e||null===(t=e.querySelector("input"))||void 0===t?void 0:t.focus({preventScroll:!0})},550)},[]);(0,r.useEffect)(()=>{_u("dorr_visad",{engang:!0})},[]);const[h,g]=(0,r.useState)(null);(0,r.useEffect)(()=>{let e=!0;return fetch("/api/vakt-pulse").then(e=>e.json()).then(t=>{var n;e&&null!==t&&void 0!==t&&null!==(n=t.sweep)&&void 0!==n&&n.sweptAt&&g(t.sweep)}).catch(()=>{}),()=>{e=!1}},[]);const x=(0,r.useMemo)(()=>Wu(null===i||void 0===i?void 0:i.findings),[i]),v=Boolean((null===i||void 0===i?void 0:i.domain)&&x.length),[b,k]=mp(.1),[y,j]=mp(.12),[w,S]=mp(.2),[$,N]=mp(.2),[_,E]=mp(.3),[z,C]=mp(.2),[A,D]=mp(.2),[F,O]=mp(.15),[T,P]=mp(.2),[L,R]=(0,r.useState)(null);return(0,$c.jsxs)(Zu,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(ep,{ref:b,children:[(0,$c.jsx)("div",{className:`eyebrow ${k}`,children:"Arvo \xb7 finansiell intelligens f\xf6r svenska bolag"}),(0,$c.jsxs)("h1",{className:k,children:["Er finansdirekt\xf6r.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Innan ni fr\xe5gar."})]}),(0,$c.jsx)("p",{className:`lede ${k}`,children:"Ni delar era fakturor och avtal. Vi v\xe4ger varje pris mot verifierat marknadspris, l\xe4ser varje bindningstid \u2014 och s\xe4ger till i tid, med motdraget f\xf6rberett. N\xe4r allt \xe4r r\xe4tt s\xe4ger vi det ocks\xe5."}),(0,$c.jsxs)("div",{className:`actions ${k}`,children:[(0,$c.jsx)("button",{type:"button",className:"cta",onClick:f,children:"Se ert bolag som marknaden ser det \u2192"}),(0,$c.jsxs)("div",{className:"sub",children:["innan ni delat n\xe5got \xb7 \xf6ppna k\xe4llor \xa0\xb7\xa0 ",(0,$c.jsx)(vs,{to:"/testa-faktura",children:"eller testa med en faktura"})]})]}),(0,$c.jsx)("div",{className:`proof ${k}`,children:"Avtal som en jurist \xa0\xb7\xa0 Priser som en ink\xf6pschef \xa0\xb7\xa0 Vaken varje natt"})]}),(0,$c.jsx)(tp,{children:(0,$c.jsx)(np,{ref:y,className:j,children:(0,$c.jsxs)("div",{className:"inner",children:[(0,$c.jsxs)(rp,{children:[(0,$c.jsx)("span",{className:"k-num",children:"01 \xb7 Avsl\xf6jandet"}),(0,$c.jsx)("span",{className:"k-note",children:"\xf6ppna k\xe4llor \xb7 innan ni delat n\xe5got"})]}),(0,$c.jsxs)(ap,{ref:e=>{u.current=e,w.current=e},className:S,children:[(0,$c.jsxs)("h3",{children:["Se ert bolag ",(0,$c.jsx)("em",{children:"som marknaden ser det."})]}),(0,$c.jsx)(Vu,{doman:e,setDoman:t,onSubmit:m,loading:n,reveal:i,note:s,pending:d,onValjBolag:p}),!i&&!n&&(0,$c.jsx)(Pu,{}),i&&(0,$c.jsx)(Tu,{})]}),(0,$c.jsxs)(ip,{ref:$,children:[(0,$c.jsxs)(rp,{children:[(0,$c.jsx)("span",{className:"k-num",children:"02 \xb7 Arvo-kontoret"}),(0,$c.jsx)("span",{className:"k-note",children:"Konfidentiellt \xb7 ett rum per kund"})]}),(0,$c.jsx)("h2",{className:N,children:v?(0,$c.jsxs)($c.Fragment,{children:["Det ni just s\xe5g blir rad ett.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Sedan vakar vi vidare \u2014 varje natt."})]}):(0,$c.jsxs)($c.Fragment,{children:["Det ni just l\xe4ste finns redan.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Och i natt var allt lugnt."})]})}),(0,$c.jsxs)(op,{ref:_,className:E,children:[(0,$c.jsxs)("div",{className:"a-card",children:[(0,$c.jsxs)("div",{className:"a-sec a-pulse",children:[(0,$c.jsx)("span",{className:"a-disc","aria-hidden":"true",children:(0,$c.jsx)("span",{className:"a-sweep"})}),(0,$c.jsxs)("span",{children:[(0,$c.jsx)("span",{className:"a-plabel",children:v?`Ert rum \xb7 ${i.domain} \xb7 f\xf6rhandsvisning`:"Vakten \xb7 exempelrum \xb7 alltid p\xe5"}),(0,$c.jsx)("span",{className:"a-pline",children:h?(0,$c.jsxs)($c.Fragment,{children:["Senaste svep ",(0,$c.jsx)("b",{children:gp(h.sweptAt)}),h.sources?(0,$c.jsxs)($c.Fragment,{children:[" \xb7 ",(0,$c.jsxs)("b",{children:[h.sources," marknadsk\xe4llor"]})," genoms\xf6kta"]}):null,h.streakNights>=2?(0,$c.jsxs)($c.Fragment,{children:[" \xb7 ",(0,$c.jsxs)("b",{children:[h.streakNights," n\xe4tter i rad"]})," utan avbrott."]}):(0,$c.jsxs)($c.Fragment,{children:[" \u2014 ",(0,$c.jsx)("em",{children:"vakten var vaken medan ni sov."})]})]}):(0,$c.jsxs)($c.Fragment,{children:["Vakten sveper ",(0,$c.jsx)("b",{children:"fyrtiotalet marknadsk\xe4llor"})," varje natt \u2014 ",(0,$c.jsx)("em",{children:"ocks\xe5 de n\xe4tter d\xe5 inget h\xe4nder."})]})})]})]}),(0,$c.jsxs)("div",{className:"a-sec",children:[(0,$c.jsx)("span",{className:"a-eyebrow",children:"Veckodomen \xb7 s\xe5 ser en lugn vecka ut"}),(0,$c.jsx)("div",{className:"a-dom",children:"En vanlig vecka hos er. Inget kr\xe4ver er uppm\xe4rksamhet \u2014 vi v\xe4gde era priser i natt, och allt h\xe5ller."})]}),v&&(0,$c.jsxs)("div",{className:"a-sec a-cont",children:["Det ni just s\xe5g i d\xf6rren \u2014 ",Gu(x)," \u2014 var f\xf6rsta \xf6gonkastet. I ert rum blir det ",(0,$c.jsx)("b",{children:"rad ett"}),", och vakten l\xe4ser vidare ",(0,$c.jsx)("em",{children:"varje natt."})]}),(0,$c.jsxs)("div",{className:"a-sec",children:[(0,$c.jsxs)("div",{className:"a-head",children:[(0,$c.jsx)("span",{className:"a-eyebrow",children:"Maktkalendern \xb7 motdraget ligger klart"}),(0,$c.jsx)("span",{className:"a-count",children:"5 avtal l\xe4sta"})]}),fp.map((e,t)=>(0,$c.jsx)(xp,{r:e,index:t,parentIn:!!E},e.sup)),(0,$c.jsx)("div",{className:"a-sum",children:"Fyra avtal till st\xe5r under bevakning \u2014 inget av dem beh\xf6ver er de n\xe4rmaste m\xe5naderna."})]}),(0,$c.jsxs)("div",{className:"a-sec a-foot",children:["Den vecka n\xe5got faktiskt h\xe4nder h\xf6r ni av oss \u2014 med draget redan gjort."," ",(0,$c.jsx)("b",{children:"Tills dess sk\xf6ter vi det \xe5t er."})]})]}),(0,$c.jsx)("div",{className:"a-caption",children:v?(0,$c.jsxs)($c.Fragment,{children:["Domen och kalendern visar ",(0,$c.jsx)("b",{children:"formen"})," \u2014 de fylls n\xe4r ni delat er f\xf6rsta faktura \xb7 raderna om ert bolag ovan \xe4r verifierade"]}):(0,$c.jsx)($c.Fragment,{children:"Exempel \u2014 formen p\xe5 ett Arvo-rum \xb7 maskinellt kontrollerad \xb7 varje datum ur kundens eget avtal"})})]})]})]})})}),(0,$c.jsxs)(sp,{id:"hur",children:[(0,$c.jsxs)(rp,{$light:!0,children:[(0,$c.jsx)("span",{className:"k-num",children:"03 \xb7 S\xe5 fungerar det"}),(0,$c.jsx)("span",{className:"k-note",children:"tv\xe5 minuter att komma ig\xe5ng"})]}),(0,$c.jsx)(lp,{ref:z,children:[["I","Dela","Vidarebefordra en faktura eller sl\xe4pp ett avtal i rummet. Det \xe4r allt ni g\xf6r."],["II","Vakten l\xe4ser","Varje pris v\xe4gs mot verifierat marknadspris. Varje bindningstid l\xe4ses ord f\xf6r ord, med citat som bevis."],["III","Ni f\xe5r domen","R\xe4tt pris? Vi s\xe4ger det. Fel pris eller ett f\xf6nster som st\xe4nger? Ni f\xe5r larmet i tid \u2014 med motdraget f\xf6rberett."]].map(e=>{let[t,n,r]=e;return(0,$c.jsxs)("div",{className:`step ${C}`,children:[(0,$c.jsx)("div",{className:"s-num",children:t}),(0,$c.jsx)("div",{className:"s-t",children:n}),(0,$c.jsx)("div",{className:"s-d",children:r})]},t)})})]}),(0,$c.jsxs)(sp,{id:"priser",children:[(0,$c.jsxs)(rp,{$light:!0,children:[(0,$c.jsx)("span",{className:"k-num",children:"04 \xb7 Priset"}),(0,$c.jsx)("span",{className:"k-note",children:"ingen bindningstid"})]}),(0,$c.jsxs)(dp,{ref:A,className:D,children:[(0,$c.jsxs)("div",{className:"p-serif",children:["1 995 kr i m\xe5naden. Tjugo procent av besparingen \u2014",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"dokumenterad i avtal, aldrig i l\xf6ften."})]}),(0,$c.jsx)("p",{className:"p-sub",children:"Vi tar aldrig ers\xe4ttning fr\xe5n n\xe5gon leverant\xf6r. Vi sitter p\xe5 er sida av bordet \u2014 det \xe4r hela aff\xe4rsid\xe9n."})]}),(0,$c.jsxs)(cp,{ref:F,children:[(0,$c.jsxs)("div",{className:`pc dark ${O}`,children:[(0,$c.jsx)("div",{className:"pc-k",children:"Arvo Intelligence"}),(0,$c.jsxs)("div",{className:"pc-pris",children:["1 995 kr ",(0,$c.jsx)("small",{children:"/ m\xe5n"})]}),(0,$c.jsx)("div",{className:"pc-lede",children:"Er proaktiva finansdirekt\xf6r \u2014 bevakningen som aldrig sover."}),["Smygh\xf6jningslarm \u2014 avvikelse f\xe5ngas direkt","Avtalsklockan \u2014 sista upps\xe4gningsdag bevakad","Priser v\xe4gda mot verifierat marknadspris","M\xe5nadsbrev med det som faktiskt h\xe4nt"].map(e=>(0,$c.jsxs)("div",{className:"pc-row",children:[(0,$c.jsx)("span",{className:"tick",children:"\u2713"})," ",e]},e)),(0,$c.jsx)(vs,{className:"pc-cta",to:"/intelligence",children:"Aktivera Arvo Intelligence \u2192"})]}),(0,$c.jsxs)("div",{className:`pc lightc ${O}`,children:[(0,$c.jsx)("div",{className:"pc-k",children:"Arvo Switch"}),(0,$c.jsxs)("div",{className:"pc-pris",children:["20 % ",(0,$c.jsx)("small",{children:"av kontrakterad besparing"})]}),(0,$c.jsx)("div",{className:"pc-lede",children:"Bytet f\xf6rberett i sin helhet \u2014 tajmat mot avtalsklockan, signerat av er med BankID."}),["Arvodet faktureras f\xf6rst n\xe4r det nya avtalet b\xf6rjat g\xe4lla","Ni godk\xe4nner varje byte med BankID","Fr\xe5n \xe5r tv\xe5 tillfaller hela besparingen er","Hittar vi inget \u2014 kostar det inget"].map(e=>(0,$c.jsxs)("div",{className:"pc-row",children:[(0,$c.jsx)("span",{className:"tick",children:"\u2713"})," ",e]},e)),(0,$c.jsx)(vs,{className:"pc-cta",to:"/testa-faktura",children:"Testa med en faktura \u2192"})]})]})]}),(0,$c.jsxs)(sp,{children:[(0,$c.jsxs)(rp,{$light:!0,children:[(0,$c.jsx)("span",{className:"k-num",children:"05 \xb7 Vanliga fr\xe5gor"}),(0,$c.jsx)("span",{className:"k-note"})]}),(0,$c.jsx)(up,{children:hp.map((e,t)=>(0,$c.jsxs)("div",{className:"f-item",children:[(0,$c.jsxs)("button",{type:"button",className:"f-q","aria-expanded":L===t,onClick:()=>R(L===t?null:t),children:[e.q,(0,$c.jsx)("span",{className:"f-plus",children:"+"})]}),(0,$c.jsx)("div",{className:"f-a"+(L===t?" open":""),children:(0,$c.jsx)("p",{children:e.a})})]},e.q))})]}),(0,$c.jsxs)(pp,{ref:T,children:[(0,$c.jsxs)("div",{className:`lw-serif ${P}`,children:["B\xf6rja med en enda faktura.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Resten sk\xf6ter vakten."})]}),(0,$c.jsx)("br",{}),(0,$c.jsx)(vs,{className:`lw-cta ${P}`,to:"/testa-faktura",children:"Testa med en faktura \u2192"}),(0,$c.jsx)("div",{className:"lw-sign",children:"Finansiell intelligens som aldrig sover."})]}),(0,$c.jsx)(vu,{})]})}const bp={shield:(0,$c.jsx)("path",{d:"M12 2.5l8 3v6.5c0 4.6-3.3 8.7-8 9.5-4.7-.8-8-4.9-8-9.5V5.5l8-3z"}),bolt:(0,$c.jsx)("path",{d:"M13 2L4 14h7l-1 8 9-12h-7l1-8z"}),phone:(0,$c.jsx)("path",{d:"M5 3h4l2 5-3 2c1.4 2.8 3.7 5.1 6.5 6.5l2-3 5 2v4c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2z"}),wifi:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M2 8.8a14 14 0 0120 0"}),(0,$c.jsx)("path",{d:"M5 12.6a9 9 0 0114 0"}),(0,$c.jsx)("path",{d:"M8.5 16.4a4 4 0 017 0"}),(0,$c.jsx)("circle",{cx:"12",cy:"20",r:"1"})]}),card:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),(0,$c.jsx)("path",{d:"M2 10h20"})]}),file:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$c.jsx)("path",{d:"M14 2v6h6"})]}),briefcase:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2"}),(0,$c.jsx)("path",{d:"M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"})]}),truck:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M1 3h15v13H1z"}),(0,$c.jsx)("path",{d:"M16 8h4l3 3v5h-7z"}),(0,$c.jsx)("circle",{cx:"6",cy:"18.5",r:"2"}),(0,$c.jsx)("circle",{cx:"18",cy:"18.5",r:"2"})]}),arrow:(0,$c.jsx)("path",{d:"M5 12h14M13 6l6 6-6 6"}),check:(0,$c.jsx)("path",{d:"M5 12l5 5L20 7"}),upload:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$c.jsx)("path",{d:"M14 2v6h6"}),(0,$c.jsx)("path",{d:"M12 17v-5M9.5 14.5L12 12l2.5 2.5"})]}),spark:(0,$c.jsx)("path",{d:"M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"}),lock:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("rect",{x:"4",y:"11",width:"16",height:"11",rx:"2"}),(0,$c.jsx)("path",{d:"M8 11V7a4 4 0 018 0v4"})]}),fortnox:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"}),(0,$c.jsx)("path",{d:"M8 8h8M8 12h8M8 16h5"})]}),bankid:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M5 3h14v18H5z"}),(0,$c.jsx)("path",{d:"M9 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2"})]}),trend:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M3 17l6-6 4 4 8-8"}),(0,$c.jsx)("path",{d:"M14 7h7v7"})]}),"alert-circle":(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,$c.jsx)("path",{d:"M12 8v4"}),(0,$c.jsx)("path",{d:"M12 16h.01"})]}),pulse:(0,$c.jsx)("path",{d:"M2 13h4l2.5-7 4 14 2.5-7H22"}),benchmark:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M3 20h18"}),(0,$c.jsx)("path",{d:"M6.5 20v-4.5"}),(0,$c.jsx)("path",{d:"M11 20v-10"}),(0,$c.jsx)("path",{d:"M15.5 20v-6.5"}),(0,$c.jsx)("path",{d:"M20 20v-13"})]}),"chevron-down":(0,$c.jsx)("path",{d:"M6 9l6 6 6-6"}),"calendar-clock":(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6.5"}),(0,$c.jsx)("path",{d:"M16 2v4M8 2v4M3 10h18"}),(0,$c.jsx)("circle",{cx:"17.5",cy:"17.5",r:"4.5"}),(0,$c.jsx)("path",{d:"M17.5 15.6v2l1.4 1"})]})},kp=e=>{let{name:t,size:n=20,stroke:r=1.6,color:a="currentColor",fill:i="none",...o}=e;const s=bp[t];return s?(0,$c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 24 24",fill:i,stroke:a,strokeWidth:r,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...o,children:s}):null},yp=jc`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,jp=vc.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 60%),
    radial-gradient(circle at 0% 100%, ${e=>{let{theme:t}=e;return t.color.accentSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,wp=vc.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`,Sp=vc.div`
  width: 100%;
  max-width: 640px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  animation: ${yp} 0.5s ease both;
  @media (max-width: 600px) { padding: 32px 24px; }
`,$p=vc.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};

  span.dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
`,Np=vc.h1`
  margin-top: 14px;
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
`,_p=vc.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Ep=(vc.div`
  margin-top: 22px;
  padding: 18px 20px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 14px;
  align-items: center;

  div.lock {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  strong {
    display: block;
    font-size: 14.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    line-height: 1.4;
  }
  span {
    display: block;
    margin-top: 4px;
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    opacity: 0.78;
    line-height: 1.45;
  }
`,vc.div`
  margin-top: 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow:
    0 0 0 1px rgba(27, 122, 110, 0.10),
    0 4px 16px rgba(14, 26, 23, 0.07);
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`),zp=vc.div`
  padding: 20px 22px;
  background: ${e=>{let{theme:t,$allow:n}=e;return n?"rgba(27, 122, 110, 0.05)":t.color.surface}};
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  &:last-child { border-bottom: none; }

  @media (min-width: 481px) {
    border-bottom: none;
    border-right: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    &:last-child { border-right: none; }
  }

  span.head {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.brand:t.color.muted}};
    margin-bottom: 16px;
  }
  span.head div.dot {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.brand:"rgba(14, 26, 23, 0.12)"}};
    color: ${e=>{let{$allow:t}=e;return t?"#fff":"rgba(14,26,23,0.45)"}};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    flex-shrink: 0;
  }
  ul { display: flex; flex-direction: column; gap: 10px; }
  ul li {
    font-size: 13.5px;
    color: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.ink:t.color.muted}};
    line-height: 1.35;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  ul li svg {
    flex-shrink: 0;
    color: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.brand:t.color.muted}};
    opacity: ${e=>{let{$allow:t}=e;return t?1:.45}};
  }
`,Cp=vc.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  svg { color: ${e=>{let{theme:t}=e;return t.color.brand}}; opacity: 0.7; }
`,Ap=vc.div`
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px dashed ${e=>{let{theme:t}=e;return t.color.brand}};
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 12px;
  align-items: center;

  div.icon {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  strong {
    display: block;
    font-size: 13.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    line-height: 1.4;
  }
  span {
    display: block;
    margin-top: 2px;
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.45;
  }
`,Dp=(vc.div`
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};

  div.live {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    flex-shrink: 0;
    animation: livepulse 2.4s ease-in-out infinite;
  }
  strong {
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-weight: 600;
    font-feature-settings: "tnum";
  }
  @keyframes livepulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
`,vc.div`
  margin-top: 22px;
  padding: 14px 16px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`),Fp=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;

  div.icon {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  strong {
    font-size: 11.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: 0.01em;
    line-height: 1.2;
  }
  span {
    font-size: 10.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.25;
  }
`,Op=vc.div`
  margin-top: 24px;
`,Tp=vc.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin-bottom: 10px;
`,Pp=vc.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`,Lp=vc.label`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span.label {
    font-size: 12.5px;
    font-weight: 500;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }

  select, input[type="number"] {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.border}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-size: 14px;
    font-family: inherit;
    appearance: auto;
    transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}};
    &:focus {
      outline: none;
      border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
      box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    }
  }
`,Rp=vc.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Ip=vc.button`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1.5px solid ${e=>{let{theme:t,$active:n}=e;return n?t.color.brand:t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
  position: relative;
  transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}}, transform ${e=>{let{theme:t}=e;return t.motion.fast}};
  cursor: pointer;

  &:hover { transform: translateY(-1px); border-color: ${e=>{let{theme:t}=e;return t.color.brand}}; }

  strong { font-size: 14.5px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
  span { font-size: 12.5px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; }

  span.badge {
    position: absolute;
    top: 12px; right: 12px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    padding: 3px 8px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-weight: 600;
  }
`,Bp=(vc.ul`
  margin-top: 28px;
  padding: 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    gap: 10px;
    font-size: 13.5px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    align-items: flex-start;
  }
  li svg {
    flex-shrink: 0;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-top: 2px;
  }
`,vc.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`),Mp=vc.p`
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
`,Vp=vc.label`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 12px;
  align-items: start;
  padding: 14px 16px;
  border: 1px solid ${e=>{let{theme:t,$error:n}=e;return n?t.color.danger:t.color.borderStrong}};
  background: ${e=>{let{theme:t,$error:n}=e;return n?t.color.dangerSoft:t.color.surface}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  cursor: pointer;
  transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}},
              background ${e=>{let{theme:t}=e;return t.motion.fast}};

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    cursor: pointer;
    display: grid;
    place-items: center;
    margin-top: 1px;
    transition: all ${e=>{let{theme:t}=e;return t.motion.fast}};
  }
  input[type="checkbox"]::before {
    content: '';
    width: 11px;
    height: 11px;
    transform: scale(0);
    transition: transform ${e=>{let{theme:t}=e;return t.motion.fast}};
    background: #FAFAF7;
    clip-path: polygon(14% 44%, 0 58%, 38% 100%, 100% 24%, 84% 10%, 38% 65%);
  }
  input[type="checkbox"]:checked {
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  input[type="checkbox"]:checked::before { transform: scale(1); }
  input[type="checkbox"]:focus-visible {
    outline: 2px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    outline-offset: 2px;
  }

  span.text {
    font-size: 13.5px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  span.text a {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`,Up=vc.p`
  margin-top: 8px;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  display: flex;
  align-items: center;
  gap: 6px;
`,Kp=jc`
  to { transform: rotate(360deg); }
`,Hp=vc.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${Kp} 0.7s linear infinite;
`,Wp=()=>{const e=po(),[t,n]=(0,r.useState)("fortnox"),[a,i]=(0,r.useState)(!1),[o,s]=(0,r.useState)(!1),[l,d]=(0,r.useState)(!1),[c,u]=(0,r.useState)(!1),[p,m]=(0,r.useState)("konsult"),[f,h]=(0,r.useState)(5);return(0,$c.jsxs)(jp,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsx)(wp,{children:(0,$c.jsxs)(Sp,{children:[(0,$c.jsxs)($p,{children:[(0,$c.jsx)("span",{className:"dot"})," Steg 1 av 3 \xb7 Anslut bokf\xf6ring"]}),(0,$c.jsx)(Np,{children:"Koppla din bokf\xf6ring"}),(0,$c.jsx)(_p,{children:"60 sekunders koppling via Fortnox eller Visma \u2014 och du kan st\xe4nga av den lika snabbt."}),(0,$c.jsxs)(Ep,{children:[(0,$c.jsxs)(zp,{$allow:!0,children:[(0,$c.jsxs)("span",{className:"head",children:[(0,$c.jsx)("div",{className:"dot",children:"\u2713"})," Vi l\xe4ser"]}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor (konton 4xxx\u20137xxx)"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:14,stroke:2.4})," Avtalskategorier & f\xf6rfallodatum"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:14,stroke:2.4})," Belopp & betalningshistorik"]})]})]}),(0,$c.jsxs)(zp,{children:[(0,$c.jsxs)("span",{className:"head",children:[(0,$c.jsx)("div",{className:"dot",children:"\u2717"})," Vi l\xe4ser inte"]}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"lock",size:14,stroke:2})," Kundfakturor & int\xe4kter"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"lock",size:14,stroke:2})," L\xf6nedata & personnummer"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"lock",size:14,stroke:2})," Bankkonton & kassafl\xf6de"]})]})]})]}),(0,$c.jsxs)(Ap,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4})}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"V\xe5rt l\xf6fte \u2014 hittar vi inga \xf6verpriser p\xe5 30 dagar?"}),(0,$c.jsx)("span",{children:"D\xe5 \xe4r ditt bolag redan optimerat. Vi raderar Fortnox-kopplingen och all din data automatiskt \u2014 du har inte betalat en krona."})]})]}),(0,$c.jsxs)(Op,{children:[(0,$c.jsx)(Tp,{children:"Ber\xe4tta lite om bolaget"}),(0,$c.jsxs)(Pp,{children:[(0,$c.jsxs)(Lp,{children:[(0,$c.jsx)("span",{className:"label",children:"Bransch"}),(0,$c.jsxs)("select",{value:p,onChange:e=>m(e.target.value),children:[(0,$c.jsx)("option",{value:"ehandel",children:"E-handel & Detaljhandel"}),(0,$c.jsx)("option",{value:"tillverkning",children:"Industri & Tillverkning"}),(0,$c.jsx)("option",{value:"it-tech",children:"IT, Tech & Mjukvara"}),(0,$c.jsx)("option",{value:"bygg",children:"Bygg, Hantverk & Fastighet"}),(0,$c.jsx)("option",{value:"hotell",children:"Hotell, Restaurang & Event"}),(0,$c.jsx)("option",{value:"konsult",children:"Konsult & F\xf6retagstj\xe4nster"}),(0,$c.jsx)("option",{value:"transport",children:"Transport & Logistik"}),(0,$c.jsx)("option",{value:"vard",children:"V\xe5rd, Omsorg & H\xe4lsa"}),(0,$c.jsx)("option",{value:"ovrigt",children:"\xd6vrigt / Annan bransch"})]})]}),(0,$c.jsxs)(Lp,{children:[(0,$c.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$c.jsx)("input",{type:"number",min:"1",max:"5000",value:f,onChange:e=>h(Number(e.target.value))})]})]})]}),(0,$c.jsxs)(Rp,{children:[(0,$c.jsxs)(Ip,{$active:"fortnox"===t,onClick:()=>n("fortnox"),children:[(0,$c.jsx)("span",{className:"badge",children:"Vanligast"}),(0,$c.jsx)(kp,{name:"fortnox",size:22,color:"#0F5132"}),(0,$c.jsx)("strong",{children:"Fortnox"}),(0,$c.jsx)("span",{children:"Direkt OAuth-koppling"})]}),(0,$c.jsxs)(Ip,{$active:"visma"===t,onClick:()=>n("visma"),children:[(0,$c.jsx)("span",{className:"badge",children:"Inom kort"}),(0,$c.jsx)(kp,{name:"fortnox",size:22,color:"#0F5132"}),(0,$c.jsx)("strong",{children:"Visma eEkonomi"}),(0,$c.jsx)("span",{children:"Lanseras inom kort"})]})]}),(0,$c.jsxs)(Dp,{children:[(0,$c.jsxs)(Fp,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(kp,{name:"bankid",size:16,stroke:2})}),(0,$c.jsx)("strong",{children:"BankID"}),(0,$c.jsx)("span",{children:"S\xe4ker identifiering"})]}),(0,$c.jsxs)(Fp,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(kp,{name:"shield",size:16,stroke:2})}),(0,$c.jsx)("strong",{children:"GDPR"}),(0,$c.jsx)("span",{children:"Bitr\xe4desavtal & registerf\xf6rteckning publicerade"})]}),(0,$c.jsxs)(Fp,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(kp,{name:"lock",size:16,stroke:2})}),(0,$c.jsx)("strong",{children:"AES-256"}),(0,$c.jsx)("span",{children:"Krypterad i vila & i transport"})]}),(0,$c.jsxs)(Fp,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.2})}),(0,$c.jsx)("strong",{children:"EU/EES + SCC"}),(0,$c.jsx)("span",{children:"Varje bitr\xe4de namngivet i policyn"})]})]}),(0,$c.jsxs)(Vp,{$error:c&&!l,children:[(0,$c.jsx)("input",{type:"checkbox",checked:l,onChange:e=>{d(e.target.checked),e.target.checked&&u(!1)},"aria-describedby":"consent-text"}),(0,$c.jsxs)("span",{className:"text",id:"consent-text",children:["Jag accepterar ",(0,$c.jsx)(vs,{to:"/villkor",children:"de allm\xe4nna villkoren"})," och"," ",(0,$c.jsx)(vs,{to:"/integritet",children:"integritetspolicyn"})," och bekr\xe4ftar att jag har beh\xf6righet att utf\xe4rda fullmakt f\xf6r f\xf6retaget."]})]}),c&&!l&&(0,$c.jsxs)(Up,{children:[(0,$c.jsx)(kp,{name:"lock",size:12,stroke:2.4}),"Du m\xe5ste godk\xe4nna villkoren innan du g\xe5r vidare."]}),o&&(0,$c.jsxs)(Up,{as:"div",style:{background:"rgba(27,122,110,0.08)",color:"#1B7A6E"},children:[(0,$c.jsx)(kp,{name:"check",size:12,stroke:2.4}),"Visma-kopplingen lanseras inom kort \u2014 vi har noterat ert intresse och h\xf6r av oss. Tills dess: ",(0,$c.jsx)(vs,{to:"/testa-faktura",style:{color:"#1B7A6E",fontWeight:600},children:"analysera en faktura direkt"}),"."]}),(0,$c.jsxs)(Bp,{children:[(0,$c.jsx)(Bc,{$variant:"gradient",$size:"lg",onClick:()=>{if(l){if("fortnox"===t){i(!0);const e=new URLSearchParams({industry:p,employees:String(f)});return void(window.location.href=`/api/fortnox/auth?${e}`)}fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:"visma_connect",industry:p,employees:f})}).catch(()=>{}),s(!0)}else u(!0)},disabled:a,$full:!0,children:a?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Hp,{})," Ansluter till ","fortnox"===t?"Fortnox":"Visma","\u2026"]}):(0,$c.jsxs)($c.Fragment,{children:["Anslut ","fortnox"===t?"Fortnox":"Visma"," ",(0,$c.jsx)(kp,{name:"arrow",size:18})]})}),(0,$c.jsxs)(Cp,{children:[(0,$c.jsx)(kp,{name:"lock",size:12,stroke:2.2}),"Du skickas nu till ","fortnox"===t?"Fortnox":"Visma"," f\xf6r att godk\xe4nna l\xe4s\xe5tkomst. Inga \xe4ndringar g\xf6rs i din bokf\xf6ring."]}),(0,$c.jsx)(Bc,{$variant:"ghost",$size:"md",onClick:()=>e("/"),children:"Tillbaka"})]}),(0,$c.jsxs)(Mp,{children:["L\xe4s ",(0,$c.jsx)(vs,{to:"/villkor",style:{textDecoration:"underline"},children:"allm\xe4nna villkoren"}),", v\xe5r ",(0,$c.jsx)(vs,{to:"/integritet",style:{textDecoration:"underline"},children:"integritetspolicy"})," ","och ",(0,$c.jsx)(vs,{to:"/cookies",style:{textDecoration:"underline"},children:"cookie-policy"}),"."]})]})})]})},qp=jc`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Gp=vc.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,Yp=vc.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 96px 28px 56px;
  text-align: center;
  animation: ${qp} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 32px; }
`,Jp=vc.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  font-size: 12.5px;
  font-weight: 500;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};

  span.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,Qp=vc.h1`
  margin-top: 22px;
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,Xp=vc.p`
  margin: 22px auto 0;
  max-width: 640px;
  font-size: 18px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.55;
`,Zp=vc.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 28px;
  @media (max-width: 740px) { padding: 32px 20px; }
`,em=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 22px;
  align-items: start;
  @media (max-width: 600px) { grid-template-columns: 1fr; padding: 24px; }

  div.num {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 26px;
    font-weight: 500;
    font-style: italic;
  }
  /* min-width: 0 lets the 1fr column shrink so overflow-x: auto works on pre */
  > div:not(.num) { min-width: 0; }
  h3 {
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  p {
    margin-top: 12px;
    font-size: 15.5px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  pre {
    margin-top: 18px;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceSunken}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    padding: 16px 18px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: 13px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    overflow-x: auto;
    white-space: pre;
  }
  pre b { color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 600; }
`,tm=(vc.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,vc.div`
  background: ${e=>{let{theme:t,$highlight:n}=e;return n?t.color.brand:t.color.surface}};
  color: ${e=>{let{theme:t,$highlight:n}=e;return n?"#FAFAF7":t.color.ink}};
  border: 1px solid ${e=>{let{theme:t,$highlight:n}=e;return n?t.color.brand:t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 24px;
  position: relative;

  span.tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    background: ${e=>{let{theme:t,$highlight:n}=e;return n?"rgba(255,255,255,0.15)":t.color.surfaceAlt}};
    color: ${e=>{let{theme:t,$highlight:n}=e;return n?"#FAFAF7":t.color.muted}};
  }
  h4 {
    margin-top: 14px;
    font-size: 22px;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    color: inherit;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.55;
    color: ${e=>{let{$highlight:t}=e;return t?"rgba(250,250,247,0.85)":"inherit"}};
  }
  ul { margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }
  li {
    font-size: 13.5px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
    color: ${e=>{let{$highlight:t}=e;return t?"rgba(250,250,247,0.92)":"inherit"}};
  }
  li svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${e=>{let{theme:t,$highlight:n}=e;return n?t.color.accent:t.color.brand}};
  }
`,vc.h2`
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
`),nm=vc.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin-bottom: 12px;
`,rm=vc.p`
  font-size: 16.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 640px;
  line-height: 1.55;
  margin-bottom: 32px;
`,am=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
`,im=vc.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 100px;
  gap: 18px;
  padding: 18px 24px;
  align-items: center;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  &:last-child { border-bottom: none; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 6px; padding: 16px 18px; }

  &.header {
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-weight: 600;
  }
  div.cat {
    font-size: 14.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  div.detail {
    font-size: 13.5px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  div.cap {
    font-size: 14px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-align: right;
    font-feature-settings: "tnum";
    @media (max-width: 600px) { text-align: left; }
  }
`,om=vc.section`
  text-align: center;
  padding: 96px 28px;
  max-width: 720px;
  margin: 0 auto;

  h2 {
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 16px;
    font-size: 16.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  div.actions {
    margin-top: 28px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
`,sm=[{cat:"Elavtal",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"Mobilabonnemang",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"F\xf6retagsbredband",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"Programvara / SaaS",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"Kortterminal",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"Fakturatj\xe4nst",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"L\xf6neadministration",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"F\xf6retagsf\xf6rs\xe4kring",detail:"Arvo bev\xe4pnar er med exakt motbud",pay:"Ing\xe5r i prenumerationen"},{cat:"F\xf6retagsleasing",detail:"Arvo bev\xe4pnar er med exakt motbud",pay:"Ing\xe5r i prenumerationen"}],lm=()=>(0,$c.jsxs)(Gp,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(Yp,{children:[(0,$c.jsxs)(Jp,{children:[(0,$c.jsx)("span",{className:"dot"})," Rankningspolicy \xb7 Senast uppdaterad 2026-04-24"]}),(0,$c.jsxs)(Qp,{children:["Vi rankar leverant\xf6rer p\xe5 ",(0,$c.jsx)("em",{children:"din"})," totalkostnad \u2014 inte v\xe5r provision."]}),(0,$c.jsx)(Xp,{children:'Det h\xe4r \xe4r hela v\xe5r policy. Inga undantag, inga gr\xe5zoner, inga "premium-partners". Om en journalist en dag granskar oss vill vi att de hittar exakt det vi skrev h\xe4r.'})]}),(0,$c.jsxs)(Zp,{children:[(0,$c.jsx)(nm,{children:"De fyra reglerna"}),(0,$c.jsx)(tm,{children:"Hur vi f\xf6rhindrar bias fr\xe5n dag 1."}),(0,$c.jsxs)(rm,{children:["Provision fr\xe5n leverant\xf6rer \xe4r en uppenbar intressekonflikt mot kunden. ","Vi l\xf6ste den inte med tak eller l\xf6ften \u2014 vi tog bort d\xf6rren helt. Arvo tar aldrig en krona fr\xe5n en leverant\xf6r."]}),(0,$c.jsxs)(em,{children:[(0,$c.jsx)("div",{className:"num",children:"1"}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("h3",{children:"V\xe5r algoritm \xe4r publik. Och f\xf6ruts\xe4gbar."}),(0,$c.jsxs)("p",{children:["Vi rankar varje f\xf6rslag p\xe5 ",(0,$c.jsx)("strong",{children:"vad det kostar er totalt \xf6ver tv\xe5 \xe5r \u2014 minus vad sj\xe4lva bytet kostar"}),". Den som ger er flest kronor kvar p\xe5 kontot vinner \u2014 alltid. Vad en leverant\xf6r skulle vilja betala oss r\xe4knas aldrig in: de betalar oss aldrig n\xe5got."]}),(0,$c.jsxs)("pre",{children:["score(provider) =\n    annualCost(provider) * 2\n  + switchingCost(provider)        // eng\xe5ngskostnader, etablering, portering\n  - reliabilityBonus(provider)     // SLA, supportkvalitet (publik benchmark)\n  - coverageMatch(provider)        // % av nuvarande t\xe4ckning som beh\xe5lls\n\n",(0,$c.jsx)("b",{children:"// Vad en leverant\xf6r betalar oss \xe4r aldrig en variabel \u2014 de betalar oss aldrig n\xe5got.\n// L\xe4gst score vinner. Vid lika: l\xe4gst pris f\xf6r er."})]})]})]}),(0,$c.jsxs)(em,{children:[(0,$c.jsx)("div",{className:"num",children:"2"}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("h3",{children:"Noll kronor fr\xe5n leverant\xf6rer. Inget tak \u2014 f\xf6r det finns inget att kapa."}),(0,$c.jsxs)("p",{children:["Arvo tar aldrig en kickback, provision eller partner-avgift fr\xe5n en leverant\xf6r ","\u2014 inte nu, inte kapat, aldrig. V\xe5r enda int\xe4kt \xe4r success fee fr\xe5n dig. Vi kan inte k\xf6pas, f\xf6r det finns ingen d\xf6rr in. I samma sekund vi tj\xe4nade en krona p\xe5 att styra dig mot en leverant\xf6r vore v\xe5r oberoende r\xf6st d\xf6d \u2014 och med den hela v\xe5rt existensber\xe4ttigande."]})]})]}),(0,$c.jsxs)(em,{children:[(0,$c.jsx)("div",{className:"num",children:"3"}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("h3",{children:"Ett erbjudande. Inga val, inga kr\xe5ngel."}),(0,$c.jsxs)("p",{children:["Vi tar ",(0,$c.jsx)("strong",{children:"20 % av realiserad besparing"})," \u2014 och fakturerar f\xf6rst n\xe4r besparingen faktiskt syns i dina egna b\xf6cker (den gamla leverant\xf6rsraden f\xf6rsvinner, den nya dyker upp). Aldrig p\xe5 en siffra vi bara gissat. Landar ingen besparing kostar Switch ingenting. Det \xe4r det enda du beh\xf6ver godk\xe4nna."]})]})]}),(0,$c.jsxs)(em,{children:[(0,$c.jsx)("div",{className:"num",children:"4"}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("h3",{children:"Vi publicerar v\xe5r rekommendationsstatistik kvartalsvis."}),(0,$c.jsx)("p",{children:"Varje kvartal publiceras hur ofta varje leverant\xf6r rekommenderas och hur mycket besparing som faktiskt realiserats hos v\xe5ra kunder. Inga affiliate-utbetalningar att redovisa \u2014 det finns inga. Granska oss. Det g\xf6r branschen \xe4rligare."})]})]})]}),(0,$c.jsxs)(Zp,{children:[(0,$c.jsx)(nm,{children:"Vad vi g\xf6r \u2014 och hur vi betalas \u2014 per kategori"}),(0,$c.jsx)(tm,{children:"Olika kategorier, olika mekanik. Samma int\xe4kt: bara fr\xe5n dig."}),(0,$c.jsx)(rm,{children:"I vissa kategorier genomf\xf6r vi bytet, i andra f\xf6rbereder vi det, i n\xe5gra bev\xe4pnar vi dig att agera sj\xe4lv. Vi lovar bara den mekanik vi \xe4ger \u2014 och tar betalt bara p\xe5 besparing som landat."}),(0,$c.jsxs)(am,{children:[(0,$c.jsxs)(im,{className:"header",children:[(0,$c.jsx)("div",{children:"Kategori"}),(0,$c.jsx)("div",{children:"Vad Arvo g\xf6r"}),(0,$c.jsx)("div",{style:{textAlign:"right"},children:"Hur vi betalas"})]}),sm.map(e=>(0,$c.jsxs)(im,{children:[(0,$c.jsx)("div",{className:"cat",children:e.cat}),(0,$c.jsx)("div",{className:"detail",children:e.detail}),(0,$c.jsx)("div",{className:"cap",children:e.pay})]},e.cat))]})]}),(0,$c.jsxs)(om,{children:[(0,$c.jsx)("h2",{children:"Det h\xe4r \xe4r inte marknadsf\xf6ring. Det h\xe4r \xe4r arkitektur."}),(0,$c.jsxs)("p",{children:["Om du uppt\xe4cker att vi bryter mot n\xe5gon av reglerna ovan \u2014 mejla"," ",(0,$c.jsx)("a",{href:"mailto:transparens@arvo.flow",style:{textDecoration:"underline"},children:"transparens@arvo.flow"}),". Vi svarar inom 48 h, publikt."]}),(0,$c.jsxs)("div",{className:"actions",children:[(0,$c.jsxs)(Bc,{as:vs,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$c.jsx)(kp,{name:"arrow",size:18})]}),(0,$c.jsx)(Bc,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$c.jsx)(vu,{})]}),dm=jc`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,cm=vc.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,um=vc.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 28px 40px;
  text-align: center;
  animation: ${dm} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 28px; }
`,pm=vc.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  font-size: 12.5px;
  font-weight: 500;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};

  span.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,mm=vc.h1`
  margin-top: 22px;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,fm=vc.p`
  margin: 22px auto 0;
  max-width: 600px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,hm=vc.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 28px 64px;
  @media (max-width: 740px) { padding: 24px 20px 48px; }
`,gm=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 32px;
  margin-bottom: 40px;

  h2 {
    font-size: 20px;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
  }
  p.intro {
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-bottom: 18px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  li {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 12px;
    font-size: 14.5px;
    line-height: 1.6;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  li svg {
    margin-top: 3px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    flex-shrink: 0;
  }
  li strong { color: ${e=>{let{theme:t}=e;return t.color.ink}}; font-weight: 600; }

  @media (max-width: 600px) { padding: 22px 20px; }
`,xm=vc.section`
  padding: 24px 0;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

  h3 {
    font-size: 19px;
    line-height: 1.3;
    letter-spacing: -0.01em;
    margin-bottom: 14px;
  }
  h4 {
    font-size: 15px;
    font-weight: 600;
    margin-top: 18px;
    margin-bottom: 6px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  p {
    font-size: 15px;
    line-height: 1.7;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin-bottom: 12px;
  }
  p:last-child { margin-bottom: 0; }
  ul, ol {
    margin: 8px 0 12px;
    padding-left: 22px;
  }
  ul li, ol li {
    font-size: 15px;
    line-height: 1.7;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin-bottom: 6px;
  }
  ul { list-style: disc; }
  ol { list-style: decimal; }

  strong { color: ${e=>{let{theme:t}=e;return t.color.ink}}; font-weight: 600; }
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  a {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`,vm=(vc.div`
  padding-left: 0;
  margin-top: 4px;

  p.tag {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: 12px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }
`,vc.div`
  margin: 48px auto 0;
  max-width: 720px;
  padding: 18px 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  font-size: 13px;
  line-height: 1.6;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  text-align: center;

  strong { color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; font-weight: 600; }
`),bm=vc.section`
  text-align: center;
  padding: 64px 28px 96px;
  max-width: 720px;
  margin: 0 auto;

  h2 {
    font-size: clamp(26px, 3.5vw, 36px);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 14px;
    font-size: 15.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.6;
  }
  div.actions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  a.mail {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`,km=(vc.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin-bottom: 10px;
`,vc.h2`
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-top: 56px;
  margin-bottom: 8px;
  &:first-child { margin-top: 0; }
`),ym=vc.p`
  font-size: 15.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin-bottom: 20px;
`,jm=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
  margin: 16px 0 8px;
`,wm=vc.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 18px;
  padding: 16px 22px;
  align-items: start;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  &:last-child { border-bottom: none; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 4px; padding: 14px 18px; }

  &.header {
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-weight: 600;
  }
  div.k {
    font-size: 14px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  div.v {
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    line-height: 1.55;
  }
`,Sm=()=>(0,$c.jsxs)(cm,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(um,{children:[(0,$c.jsxs)(pm,{children:[(0,$c.jsx)("span",{className:"dot"})," Allm\xe4nna villkor \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$c.jsxs)(mm,{children:["Klart, kort och ",(0,$c.jsx)("em",{children:"p\xe5 din sida"}),"."]}),(0,$c.jsx)(fm,{children:"Det h\xe4r \xe4r hela avtalet mellan dig och Arvo Flow (verksamhet under bildande; juridisk person uppdateras h\xe4r vid registrering). Inga fasta avgifter, inga uppstartsavgifter, ingen inl\xe5sning. Vi tj\xe4nar pengar bara n\xe4r du faktiskt sparar."})]}),(0,$c.jsxs)(hm,{children:[(0,$c.jsxs)(gm,{children:[(0,$c.jsx)("h2",{children:"Sammanfattning"}),(0,$c.jsx)("p",{className:"intro",children:"Det h\xe4r beh\xf6ver du veta innan du signerar med BankID:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Ombudskap."})," Arvo Flow agerar som ditt f\xf6retags ombud f\xf6r att optimera och ing\xe5 avtal inom el, telefoni, bredband, f\xf6rs\xe4kring och leasing. Vi verifierar din beh\xf6righet mot Bolagsverket i realtid."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Besparingsarvode."})," Vi tar ingen fast avgift. V\xe5rt arvode \xe4r 20 % av besparingsunderlaget (skillnaden mellan ditt nya och ditt gamla avtal) under de f\xf6rsta 12 m\xe5naderna efter ett byte."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"\xc5ngerr\xe4tt."})," Du har 24 timmars \xe5ngerr\xe4tt fr\xe5n BankID-signering innan vi p\xe5b\xf6rjar skarpa byten hos leverant\xf6rerna."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Ingen inl\xe5sning."})," Du kan s\xe4ga upp Arvo Flow-tj\xe4nsten n\xe4r som helst med 30 dagars upps\xe4gningstid."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Datas\xe4kerhet."})," Vi l\xe4ser endast n\xf6dv\xe4ndig fakturadata via Fortnox. Vid avslut raderas din transaktionsdata inom 24 timmar."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Trygghet."})," V\xe5rt skadest\xe5ndsansvar \xe4r begr\xe4nsat till 12 m\xe5naders betalda avgifter, dock l\xe4gst 50 000 SEK."]})]})]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"1. Definitioner"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"1.1 Tj\xe4nsten."})," Den digitala plattformen Arvo Flow samt tillh\xf6rande ombudstj\xe4nster f\xf6r att optimera Kundens leverant\xf6rsavtal."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"1.2 Besparingsunderlag."})," Det belopp som ligger till grund f\xf6r Besparingsavgiften, motsvarande skillnaden i avtalskostnad exkl. moms \xf6ver en 12-m\xe5nadersperiod mellan Kundens tidigare avtal och det nya avtalet."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"1.3 Besparingsarvode."})," Det r\xf6rliga arvode om 20 % av Besparingsunderlaget som tillfaller Arvo Flow, fakturerat efter Kundens f\xf6rsta faktura fr\xe5n den nya leverant\xf6ren."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"2. Uppdraget och Fullmakt"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"2.1"})," Genom signering via BankID ger Kunden Arvo Flow fullmakt att inh\xe4mta uppgifter, s\xe4ga upp befintliga avtal samt ing\xe5 nya avtal f\xf6r Kundens r\xe4kning inom de kategorier Kunden aktiverat i Tj\xe4nsten."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"2.2 \xc5ngerfrist."})," Kunden har r\xe4tt att \xe5terkalla sin accept av dessa villkor inom 24 timmar fr\xe5n signering. Under \xe5ngerfristen p\xe5b\xf6rjar Arvo Flow inga skarpa upps\xe4gningar eller avtalstecknanden hos tredje part."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"3. Arvode och Betalning"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"3.1"})," Tj\xe4nsten baseras p\xe5 realiserad besparing \u2014 den skillnad som faktiskt uppst\xe5r mellan tidigare och nytt avtal. Inga fasta avgifter, uppstartsavgifter eller licensavgifter utg\xe5r."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"3.2"})," Besparingsavgiften faktureras som en eng\xe5ngsavgift, 3 m\xe5nader efter att det nya avtalet aktiverats. Fr.o.m. \xe5r 2 tillfaller hela besparingen Kunden."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"3.3 F\xf6rtida avslut av leverant\xf6rsavtal."})," Om Kunden v\xe4ljer att avsluta ett av Arvo Flow tecknat leverant\xf6rsavtal i f\xf6rtid, eller p\xe5 annat s\xe4tt f\xf6rhindrar Tj\xe4nstens utf\xf6rande, f\xf6rfaller Besparingsavgiften i sin helhet. Detta g\xe4ller ej om Kunden avbryter samarbetet p\xe5 grund av v\xe4sentligt avtalsbrott fr\xe5n Arvo Flows sida."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"4. Beh\xf6righet och Upps\xe4gning av Tj\xe4nsten"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"4.1 Firmateckningsverifiering."})," Arvo Flow verifierar via BankID-signaturens personnummer mot Bolagsverkets aktuella firmatecknarregister. Avtal ing\xe5s endast om verifieringen godk\xe4nns."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"4.2 Upps\xe4gning."})," Avtalet l\xf6per tills vidare. B\xe5da parter kan s\xe4ga upp Tj\xe4nsten med 30 dagars upps\xe4gningstid. Redan p\xe5b\xf6rjade avtalsbyten slutf\xf6rs och debiteras enligt avtal."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"5. Ansvarsbegr\xe4nsning och Risksenarier"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"5.1 Missad upps\xe4gning."})," Om Arvo Flow missar att s\xe4ga upp ett befintligt avtal i tid, ers\xe4tter Arvo Flow mellanskillnaden upp till vid var tid g\xe4llande ansvarstak."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"5.2 Dubbel-leverans."})," Om Kunden under en period har tv\xe5 parallella leverant\xf6rsavtal f\xf6r samma tj\xe4nst till f\xf6ljd av fel fr\xe5n Arvo Flow, meddelar Kunden Arvo Flow, varvid Arvo Flow krediterar framtida avgifter eller, efter Kundens \xf6nskem\xe5l, utf\xf6r \xe5terbetalning inom 30 dagar."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"5.3 Ansvarstak."})," Arvo Flows totala skadest\xe5ndsansvar \xe4r begr\xe4nsat till ett belopp motsvarande 100 % av de senaste 12 m\xe5nadernas betalda Besparingsavgifter, dock l\xe4gst 50 000 SEK. Arvo Flow ansvarar ej f\xf6r indirekta skador s\xe5som utebliven vinst, produktionsbortfall eller goodwill-skada."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"6. Force Majeure"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"6.1"})," Arvo Flow \xe4r befriat fr\xe5n p\xe5f\xf6ljd vid underl\xe5tenhet orsakad av pandemi, krig, cyberattack, myndighetsbeslut eller fel hos tredjepartsleverant\xf6r (t.ex. BankID, Fortnox, Visma eller leverant\xf6r vars system Tj\xe4nsten \xe4r beroende av) som ligger utanf\xf6r Arvo Flows kontroll."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"7. Data och Tvist"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"7.1 Personuppgifter."})," Personuppgiftsbehandling regleras i separat Personuppgiftsbitr\xe4desavtal (DPA), tillg\xe4nglig som bilaga till"," ",(0,$c.jsx)(vs,{to:"/integritet",children:"v\xe5r integritetspolicy"}),"."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"7.2 Tvist."})," Tvister med anledning av dessa villkor avg\xf6rs i Stockholms tingsr\xe4tt enligt svensk lag."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("strong",{children:"Arvo Flow"})," \xb7 verksamhet under bildande \xb7 Stockholm \xb7 Allm\xe4nna villkor v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$c.jsx)("br",{}),"Tidigare versioner finns tillg\xe4ngliga p\xe5 beg\xe4ran fr\xe5n"," ",(0,$c.jsx)("a",{href:"mailto:juridik@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"juridik@arvo.flow"}),"."]})]}),(0,$c.jsxs)(bm,{children:[(0,$c.jsx)("h2",{children:"Fr\xe5gor p\xe5 villkoren?"}),(0,$c.jsxs)("p",{children:["Mejla ",(0,$c.jsx)("a",{className:"mail",href:"mailto:juridik@arvo.flow",children:"juridik@arvo.flow"})," s\xe5 svarar vi inom 48 h. Vi har en svensk aff\xe4rsjurist som granskat varje klausul."]}),(0,$c.jsxs)("div",{className:"actions",children:[(0,$c.jsxs)(Bc,{as:vs,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$c.jsx)(kp,{name:"arrow",size:18})]}),(0,$c.jsx)(Bc,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$c.jsx)(vu,{})]}),$m=()=>(0,$c.jsxs)(cm,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(um,{children:[(0,$c.jsxs)(pm,{children:[(0,$c.jsx)("span",{className:"dot"})," Integritetspolicy & DPA \xb7 Version 1.4 \xb7 Senast uppdaterad 2026-05-19"]}),(0,$c.jsxs)(mm,{children:["Du ",(0,$c.jsx)("em",{children:"\xe4ger"})," din data. Vi f\xf6rvaltar den."]}),(0,$c.jsx)(fm,{children:"Vi l\xe4ser bara den fakturadata vi beh\xf6ver f\xf6r att hitta \xf6verpriser \u2014 inget annat. Vid avslut raderas allt inom 24 timmar. Det h\xe4r \xe4r hur, var och varf\xf6r."})]}),(0,$c.jsxs)(hm,{children:[(0,$c.jsxs)(gm,{children:[(0,$c.jsx)("h2",{children:"Sammanfattning"}),(0,$c.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller f\xf6r dig som kund hos Arvo Flow:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Vi l\xe4ser endast leverant\xf6rsfakturor"})," via Fortnox eller Visma \u2014 inte kundfakturor, l\xf6ner, bankkonton eller personnummer p\xe5 anst\xe4llda."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Faktura-PDF:er lagras aldrig."})," Vi extraherar den data vi beh\xf6ver och kastar filen direkt \u2014 noll persistent lagring av PDF-inneh\xe5ll hos Arvo Flow. By design."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Data lagras i EU/EES"})," eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer (Standard Contractual Clauses). Krypterad i vila (AES-256) och i transport (TLS 1.3)."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Du kan n\xe4r som helst"})," beg\xe4ra utdrag, r\xe4ttelse eller radering av dina personuppgifter via ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Vid avslut"})," raderas all transaktionsdata inom 24 timmar. Bokf\xf6ringsm\xe4ssiga underlag (fakturor p\xe5 v\xe5rt arvode) sparas i 7 \xe5r enligt bokf\xf6ringslagen."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Vi s\xe4ljer aldrig din data."})," Vi delar den heller inte med leverant\xf6rer, annons\xf6rer eller andra tredje parter \u2014 ut\xf6ver de vi \xe4r bundna till f\xf6r att leverera Tj\xe4nsten."]})]})]})]}),(0,$c.jsx)(km,{children:"Integritetspolicy"}),(0,$c.jsx)(ym,{children:"Den h\xe4r policyn beskriver hur Arvo Flow (verksamhet under bildande) behandlar personuppgifter och f\xf6retagsuppgifter i samband med att vi levererar Tj\xe4nsten."}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"1. Personuppgiftsansvarig"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"Arvo Flow"})," (verksamhet under bildande; juridisk person uppdateras h\xe4r vid registrering) \xe4r personuppgiftsansvarig f\xf6r de uppgifter vi samlar in om dig som kund eller bes\xf6kare. Kontakt:"," ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$c.jsx)("p",{children:"F\xf6r personuppgifter som behandlas p\xe5 Kundens uppdrag (t.ex. namn p\xe5 Kundens kontaktpersoner och firmatecknare) \xe4r Arvo Flow personuppgiftsbitr\xe4de \u2014 se DPA l\xe4ngre ner."})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"2. Vilka uppgifter vi behandlar"}),(0,$c.jsxs)(jm,{children:[(0,$c.jsxs)(wm,{className:"header",children:[(0,$c.jsx)("div",{children:"Kategori"}),(0,$c.jsx)("div",{children:"Syfte & r\xe4ttslig grund"})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"F\xf6retagsuppgifter"}),(0,$c.jsxs)("div",{className:"v",children:["Organisationsnummer, bolagsnamn, registreringsdatum. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."]})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Firmatecknarens uppgifter"}),(0,$c.jsxs)("div",{className:"v",children:["Namn, personnummer (via BankID), beh\xf6righet enligt Bolagsverket. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"fullg\xf6rande av avtal"})," samt r\xe4ttslig f\xf6rpliktelse vid signering."]})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Kontaktuppgifter"}),(0,$c.jsxs)("div",{className:"v",children:["E-post, telefon, namn p\xe5 kontaktpersoner. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r kundkommunikation, ",(0,$c.jsx)("em",{children:"samtycke"})," f\xf6r marknadsf\xf6ring."]})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Leverant\xf6rsfakturor"}),(0,$c.jsxs)("div",{className:"v",children:["Belopp, leverant\xf6r, kategori, f\xf6rfallodatum, fakturarader. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."," ","Anonymiserade uppgifter (belopp, leverant\xf6r, kategori) anv\xe4nds \xe4ven f\xf6r att bygga Arvo Flows branschindex \u2014 se \xa7 4 nedan. R\xe4ttslig grund f\xf6r indexanv\xe4ndning: ",(0,$c.jsx)("em",{children:"ber\xe4ttigat intresse"}),"."]})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Faktura-PDF (uppladdning)"}),(0,$c.jsxs)("div",{className:"v",children:["PDF-filen konverteras till text i realtid via Anthropic API och raderas omedelbart \u2014 den lagras ",(0,$c.jsx)("strong",{children:"aldrig"})," p\xe5 Arvo Flows infrastruktur. Analysresultatet (extraherade siffror, inte PDF-inneh\xe5llet) cachas i 6 timmar f\xf6r att undvika on\xf6diga API-anrop. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r Tj\xe4nstens leverans."]})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Tekniska data"}),(0,$c.jsxs)("div",{className:"v",children:["IP-adress, webbl\xe4sare, sidvisningar (anonymiserat). R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r s\xe4kerhet och drift."]})]})]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsxs)("h3",{children:["3. Vad vi ",(0,$c.jsx)("em",{children:"inte"})," behandlar"]}),(0,$c.jsxs)("p",{children:["Vi har medvetet begr\xe4nsat datainsamlingen. Vi l\xe4ser ",(0,$c.jsx)("strong",{children:"aldrig"}),":"]}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:"Kundfakturor eller int\xe4ktsdata"}),(0,$c.jsx)("li",{children:"L\xf6nedata eller personnummer p\xe5 anst\xe4llda"}),(0,$c.jsx)("li",{children:"Bankkontosaldon eller transaktionshistorik"}),(0,$c.jsx)("li",{children:"Kundregister eller CRM-data"}),(0,$c.jsx)("li",{children:"Inneh\xe5llet i e-postkorrespondens"})]}),(0,$c.jsx)("p",{children:"OAuth-scopen mot Fortnox och Visma \xe4r konfigurerade s\xe5 att vi tekniskt inte ens kan l\xe4sa kategorierna ovan, \xe4ven om vi ville."})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"4. Hur l\xe4nge vi sparar data"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Aktiv kund:"})," S\xe5 l\xe4nge avtalet l\xf6per."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Vid upps\xe4gning:"})," Transaktionsdata raderas inom 24 timmar."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Bokf\xf6ringsunderlag:"})," 7 \xe5r enligt bokf\xf6ringslagen (2 kap. 1 \xa7 BFL)."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Marknadsf\xf6ringssamtycke:"})," Tills du \xe5terkallar samtycket."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Faktura-PDF:"})," Lagras aldrig \u2014 raderas direkt efter AI-extraktering. Analysresultatet (JSON med siffror) cachas i 6 timmar, d\xe4refter auto-raderats."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Anonymiserad statistik (branschindex):"})," Belopp, leverant\xf6r och kategori fr\xe5n leverant\xf6rsfakturor anonymiseras och anv\xe4nds f\xf6r att ber\xe4kna marknadsmedian och prispercentiler per bransch och bolagsstorlek. Detta aggregerade index \xe4r grunden f\xf6r Tj\xe4nstens j\xe4mf\xf6relser och rekommendationer. Inga uppgifter kan h\xe4rledas till ett enskilt bolag. Sparas obegr\xe4nsat."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Anthropic API (AI-behandling):"})," Data behandlas via Anthropic API med 30 dagars radering f\xf6r Trust & Safety, utan att anv\xe4ndas f\xf6r modelltr\xe4ning."]})]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"5. Var data lagras & s\xe4kerhet"}),(0,$c.jsx)("p",{children:"Behandlingen sker inom EU/EES och i USA. Underbitr\xe4dena \xe4r namngivna i avsnitt 7 med funktion och land; \xf6verf\xf6ringar till USA sker under EU-kommissionens standardavtalsklausuler (SCC). Vi driver i dag ingen egen serverhall \u2014 plattformarna nedan \xe4r v\xe5ra bitr\xe4den, och vi listar dem hellre \xe4n att sammanfatta dem."}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:"Kryptering i vila hos samtliga lagringsbitr\xe4den (Neon, Vercel KV)"}),(0,$c.jsx)("li",{children:"TLS f\xf6r all data\xf6verf\xf6ring"}),(0,$c.jsx)("li",{children:"Tv\xe5faktorautentisering f\xf6r all intern access"}),(0,$c.jsx)("li",{children:"Analysresultat cachas i h\xf6gst 6 timmar; Anthropic raderar API-data inom 30 dagar och tr\xe4nar inte modeller p\xe5 den"}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("em",{children:"Planerat, \xe4nnu ej i drift:"})," svensk hosting (Bahnhof), audit trail \xf6ver all access till kunddata, och \xe5rlig penetrationstest av oberoende part"]})]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"6. Dina r\xe4ttigheter (GDPR)"}),(0,$c.jsx)("p",{children:"Du har r\xe4tt att:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:["Beg\xe4ra ut ",(0,$c.jsx)("strong",{children:"registerutdrag"})," \xf6ver dina personuppgifter"]}),(0,$c.jsxs)("li",{children:["Beg\xe4ra ",(0,$c.jsx)("strong",{children:"r\xe4ttelse"})," av felaktiga uppgifter"]}),(0,$c.jsxs)("li",{children:["Beg\xe4ra ",(0,$c.jsx)("strong",{children:"radering"})," (r\xe4tten att bli gl\xf6md), inom de gr\xe4nser bokf\xf6ringslagen till\xe5ter"]}),(0,$c.jsxs)("li",{children:["Beg\xe4ra ",(0,$c.jsx)("strong",{children:"begr\xe4nsning"})," av behandling"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Inv\xe4nda"})," mot behandling som sker p\xe5 ber\xe4ttigat intresse"]}),(0,$c.jsxs)("li",{children:["F\xe5 ut din data i ett ",(0,$c.jsx)("strong",{children:"strukturerat, maskinl\xe4sbart format"})," (dataportabilitet)"]}),(0,$c.jsxs)("li",{children:["L\xe4mna in ",(0,$c.jsx)("strong",{children:"klagom\xe5l till Integritetsskyddsmyndigheten"})," (IMY)"]})]}),(0,$c.jsxs)("p",{children:["Kontakta ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," \u2014 vi svarar inom 30 dagar."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"7. Underbitr\xe4den"}),(0,$c.jsx)("p",{children:"Vi anv\xe4nder f\xf6ljande underbitr\xe4den f\xf6r att leverera Tj\xe4nsten. Samtliga \xe4r bundna av DPA och behandlar uppgifter inom EU/EES eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer:"}),(0,$c.jsxs)(jm,{children:[(0,$c.jsxs)(wm,{className:"header",children:[(0,$c.jsx)("div",{children:"Leverant\xf6r"}),(0,$c.jsx)("div",{children:"Funktion & \xf6verf\xf6ringsmekanism"})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Anthropic PBC"}),(0,$c.jsx)("div",{className:"v",children:"AI-analys av faktura-PDF \u2014 USA. SCC. 30 dagars radering, tr\xe4nar ej modeller p\xe5 API-data."})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Vercel Inc."}),(0,$c.jsx)("div",{className:"v",children:"Serverless funktioner & KV-cache \u2014 USA/EU. SCC. Analysresultat cachas max 6 timmar."})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Neon Inc."}),(0,$c.jsx)("div",{className:"v",children:"Postgres-databas (leads, offertf\xf6rfr\xe5gningar, branschindex) \u2014 USA. SCC."})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Resend Inc."}),(0,$c.jsx)("div",{className:"v",children:"Transaktionell e-post (bekr\xe4ftelser, interna larm) \u2014 USA. SCC."})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Bahnhof AB"}),(0,$c.jsx)("div",{className:"v",children:"Hosting / databas (planerad, full produkt) \u2014 Sverige"})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Scrive AB"}),(0,$c.jsx)("div",{className:"v",children:"BankID-signering (planerad) \u2014 Sverige"})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Fortnox / Visma"}),(0,$c.jsx)("div",{className:"v",children:"OAuth-koppling till bokf\xf6ring (planerad) \u2014 Sverige"})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Stripe Payments Europe"}),(0,$c.jsx)("div",{className:"v",children:"Betalningar & fakturering (planerad) \u2014 Irland"})]})]})]}),(0,$c.jsx)(km,{children:"Personuppgiftsbitr\xe4desavtal (DPA) \u2014 Bilaga"}),(0,$c.jsx)(ym,{children:"Detta avtal g\xe4ller automatiskt n\xe4r du som Kund tecknar Tj\xe4nsten. Det reglerar Arvo Flows behandling av personuppgifter p\xe5 Kundens uppdrag (t.ex. uppgifter om Kundens kontaktpersoner)."}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"1. Parter"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"Personuppgiftsansvarig:"})," Kunden."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"Personuppgiftsbitr\xe4de:"})," Arvo Flow (verksamhet under bildande)."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"2. Omfattning"}),(0,$c.jsx)("p",{children:"Bitr\xe4det behandlar personuppgifter (kontaktuppgifter, fakturarader, personnummer f\xf6r firmateckning) f\xf6r att utf\xf6ra Tj\xe4nsten enligt Allm\xe4nna villkor."})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"3. Instruktion"}),(0,$c.jsxs)("p",{children:["Bitr\xe4det f\xe5r behandla uppgifter f\xf6r att (i) optimera avtal och fakturera enligt de ",(0,$c.jsx)(vs,{to:"/villkor",children:"Allm\xe4nna villkoren"}),", samt (ii) anonymisera och aggregera fakturauppgifter (belopp, leverant\xf6r, kategori) f\xf6r Tj\xe4nstens branschindex enligt \xa7 4 i Integritetspolicyn. Ytterligare instruktioner fr\xe5n Kunden ska vara skriftliga."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"4. S\xe4kerhet"}),(0,$c.jsx)("p",{children:"Bitr\xe4det ska vidta l\xe4mpliga tekniska och organisatoriska \xe5tg\xe4rder f\xf6r att skydda data mot oavsiktlig eller olaglig f\xf6rst\xf6relse, f\xf6rlust, \xe4ndring, obeh\xf6rigt r\xf6jande eller obeh\xf6rig \xe5tkomst (jfr GDPR art. 32). Detta inkluderar kryptering, \xe5tkomstkontroll, loggning och regelbunden s\xe4kerhetsgranskning enligt \xa7 5 i Integritetspolicyn ovan."})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"5. Underbitr\xe4den"}),(0,$c.jsx)("p",{children:"Kunden godk\xe4nner att Bitr\xe4det anv\xe4nder underbitr\xe4den enligt listan under \xa7 7 i Integritetspolicyn. Bitr\xe4det ska underr\xe4tta Kunden vid byte av underbitr\xe4de, varvid Kunden har r\xe4tt att inv\xe4nda inom 30 dagar."})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"6. Radering"}),(0,$c.jsx)("p",{children:"Vid upps\xe4gning av Tj\xe4nsten eller p\xe5 Kundens beg\xe4ran ska Bitr\xe4det radera eller anonymisera all transaktionsdata inom 24 timmar, s\xe5vida inte lag kr\xe4ver lagring (t.ex. bokf\xf6ringslagen f\xf6r fakturaunderlag)."})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"7. Personuppgiftsincident"}),(0,$c.jsx)("p",{children:"Bitr\xe4det ska utan on\xf6digt dr\xf6jsm\xe5l, dock senast 48 timmar efter det att Bitr\xe4det f\xe5tt k\xe4nnedom om en personuppgiftsincident som r\xf6r Kunden, meddela Kunden om incidenten samt vidtagna \xe5tg\xe4rder."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("strong",{children:"Arvo Flow"})," \xb7 verksamhet under bildande \xb7 Stockholm \xb7 Integritetspolicy & DPA v1.4 \xb7 Senast uppdaterad 2026-05-19. ",(0,$c.jsx)("br",{}),"Fr\xe5gor: ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$c.jsxs)(bm,{children:[(0,$c.jsx)("h2",{children:"Vill du veta exakt vad vi har om dig?"}),(0,$c.jsxs)("p",{children:["Mejla ",(0,$c.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," s\xe5 f\xe5r du ett komplett registerutdrag inom 30 dagar \u2014 utan kostnad."]}),(0,$c.jsxs)("div",{className:"actions",children:[(0,$c.jsx)(Bc,{as:vs,to:"/villkor",$variant:"primary",$size:"lg",children:"L\xe4s allm\xe4nna villkor"}),(0,$c.jsx)(Bc,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$c.jsx)(vu,{})]}),Nm=()=>(0,$c.jsxs)(cm,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(um,{children:[(0,$c.jsxs)(pm,{children:[(0,$c.jsx)("span",{className:"dot"})," Cookie-policy \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$c.jsxs)(mm,{children:["Vi anv\xe4nder bara ",(0,$c.jsx)("em",{children:"n\xf6dv\xe4ndiga"})," cookies."]}),(0,$c.jsx)(fm,{children:"Inga marknadsf\xf6ringspixlar, inga remarketing-taggar, ingen f\xf6rs\xe4ljning av din surfdata till tredje part. Bara det som kr\xe4vs f\xf6r att Tj\xe4nsten ska fungera och vara s\xe4ker."})]}),(0,$c.jsxs)(hm,{children:[(0,$c.jsxs)(gm,{children:[(0,$c.jsx)("h2",{children:"Sammanfattning"}),(0,$c.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller cookies p\xe5 arvo.flow och arvoflow.se:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"N\xf6dv\xe4ndiga cookies"})," anv\xe4nds alltid \u2014 utan dem fungerar inte inloggning eller s\xe4ker session."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Anonymiserad statistik"})," samlas in f\xf6r att f\xf6rst\xe5 hur Tj\xe4nsten anv\xe4nds (sidvisningar, felmeddelanden). Den kan inte kopplas till dig som individ."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Inga marknadsf\xf6ringscookies."})," Vi anv\xe4nder inte Facebook Pixel, Google Ads remarketing eller liknande sp\xe5rning."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Inga cookies fr\xe5n tredje part"})," s\xe4tts utan ditt aktiva samtycke."]})]})]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"1. Vad \xe4r cookies?"}),(0,$c.jsx)("p",{children:"Cookies \xe4r sm\xe5 textfiler som sparas i din webbl\xe4sare n\xe4r du bes\xf6ker en webbplats. De anv\xe4nds f\xf6r att webbplatsen ska fungera korrekt, f\xf6r s\xe4kerhet och f\xf6r att samla in anonymiserad anv\xe4ndarstatistik."})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"2. Cookies vi anv\xe4nder"}),(0,$c.jsxs)(jm,{children:[(0,$c.jsxs)(wm,{className:"header",children:[(0,$c.jsx)("div",{children:"Namn / typ"}),(0,$c.jsx)("div",{children:"Syfte & livsl\xe4ngd"})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Session-cookie"}),(0,$c.jsxs)("div",{className:"v",children:["H\xe5ller dig inloggad under bes\xf6ket. Livsl\xe4ngd: tills du st\xe4nger webbl\xe4saren. ",(0,$c.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"CSRF-token"}),(0,$c.jsxs)("div",{className:"v",children:["Skyddar mot f\xf6rfalskade formul\xe4rinskick. Livsl\xe4ngd: tills sessionen avslutas. ",(0,$c.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Cookie-samtycke"}),(0,$c.jsxs)("div",{className:"v",children:["Sparar ditt val g\xe4llande statistik-cookies. Livsl\xe4ngd: 12 m\xe5nader.",(0,$c.jsx)("strong",{children:" N\xf6dv\xe4ndig."})]})]}),(0,$c.jsxs)(wm,{children:[(0,$c.jsx)("div",{className:"k",children:"Anonymiserad statistik"}),(0,$c.jsxs)("div",{className:"v",children:["Aggregerad data om sidvisningar och fel. Ingen IP, ingen individidentifiering. Livsl\xe4ngd: 90 dagar. ",(0,$c.jsx)("strong",{children:"Statistik (samtycke)."})]})]})]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"3. Hur du hanterar cookies"}),(0,$c.jsx)("p",{children:"Du kan n\xe4r som helst:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:"\xc5terkalla samtycke till statistik-cookies via inst\xe4llningar i din profil n\xe4r du \xe4r inloggad"}),(0,$c.jsx)("li",{children:"Radera alla cookies fr\xe5n arvo.flow via din webbl\xe4sares inst\xe4llningar"}),(0,$c.jsx)("li",{children:"Blockera cookies helt \u2014 observera dock att inloggning d\xe5 inte kommer fungera"})]}),(0,$c.jsxs)("p",{children:["V\xe4gledning f\xf6r de vanligaste webbl\xe4sarna finns hos"," ",(0,$c.jsx)("a",{href:"https://www.imy.se/privatperson/dataskydd/det-har-galler-enligt-gdpr/cookies/",target:"_blank",rel:"noopener noreferrer",children:"Integritetsskyddsmyndigheten (IMY)"}),"."]})]}),(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h3",{children:"4. Lagst\xf6d"}),(0,$c.jsx)("p",{children:"Vi f\xf6ljer Lagen om elektronisk kommunikation (LEK) 9 kap. 28 \xa7. N\xf6dv\xe4ndiga cookies s\xe4tts utan samtycke eftersom de kr\xe4vs f\xf6r att tillhandah\xe5lla den tj\xe4nst du aktivt efterfr\xe5gat. F\xf6r \xf6vriga cookies inh\xe4mtar vi aktivt samtycke i enlighet med GDPR."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("strong",{children:"Arvo Flow"})," \xb7 verksamhet under bildande \xb7 Stockholm \xb7 Cookie-policy v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$c.jsx)("br",{}),"Fr\xe5gor: ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$c.jsxs)(bm,{children:[(0,$c.jsx)("h2",{children:"Inga m\xf6rka m\xf6nster, inga dolda sp\xe5rare."}),(0,$c.jsxs)("p",{children:["Vi tycker att cookie-banners ska vara \xe4rliga. Om du uppt\xe4cker att vi s\xe4tter en cookie som inte st\xe5r med ovan \u2014 mejla ",(0,$c.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$c.jsxs)("div",{className:"actions",children:[(0,$c.jsx)(Bc,{as:vs,to:"/integritet",$variant:"primary",$size:"lg",children:"L\xe4s integritetspolicy"}),(0,$c.jsx)(Bc,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$c.jsx)(vu,{})]}),_m={mobil:{label:"Mobilabonnemang",partnerLabel:"Kvalificerad Mobiloperat\xf6r",segment:2,unit:"abonnemang",unitSingular:"abonnemang",inlineLabel:"mobilabonnemang",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga ramavtal f\xf6r mobilabonnemang kostar v\xe4sentligt mindre",variableChargeNote:"Roaming, \xf6vertrafik m.m. \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},molnvaxel:{label:"F\xf6retagsv\xe4xel (molnv\xe4xel)",partnerLabel:"Kvalificerad V\xe4xeloperat\xf6r",segment:2,unit:"anv\xe4ndare",unitSingular:"anv\xe4ndare",inlineLabel:"molnv\xe4xel",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat instegspris: Telia Smart Connect fr\xe5n 89 kr/anv/m\xe5n exkl moms (telia.se). Exakt pris beror p\xe5 niv\xe5 och tillval.",smfBenchmark:"marknadens instegsv\xe4xel (Telia Smart Connect) kostar fr\xe5n 89 kr/anv\xe4ndare/m\xe5n exkl moms",variableChargeNote:"Samtalsavgifter och tillval ut\xf6ver licensen \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},bredband:{label:"F\xf6retagsbredband",partnerLabel:"Kvalificerad Bredbandsoperat\xf6r",segment:2,unit:"anslutningar",unitSingular:"anslutning",inlineLabel:"bredband",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat mot leverant\xf6rens publika listpris (Tele2 address-API) \u2014 exakt pris beror p\xe5 adress och befintlig infrastruktur.",smfBenchmark:"leverant\xf6rens eget publika listpris f\xf6r samma hastighet \xe4r v\xe4sentligt l\xe4gre",variableChargeNote:"Datatrafik och \xf6verskottsavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"saas-productivity":{label:"Programvarulicenser / SaaS",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga avtal f\xf6r samma licenser kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-crm":{label:"CRM-system",partnerLabel:"Kvalificerad CRM-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga CRM-avtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-finance":{label:"Aff\xe4rssystem / Bokf\xf6ring",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga aff\xe4rssystemsavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-other":{label:"Programvarulicenser / SaaS \xb7 \xf6vrigt",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga programvaruavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-creative":{label:"Kreativ mjukvara / Design",partnerLabel:"Kvalificerad Mjukvaruleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga avtal f\xf6r kreativ mjukvara kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},el:{label:"Elavtal",partnerLabel:"Kvalificerad Elleverant\xf6r",segment:1,unit:"avtal",unitSingular:"avtal",inlineLabel:"el (energidel)",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga elavtal kostar v\xe4sentligt mindre",variableChargeNote:"R\xf6rliga energikostnader (spotpris, n\xe4tavgift) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!0},skrivarleasing:{label:"Skrivare & Managed Print",partnerLabel:"Kvalificerad Print-leverant\xf6r",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"skrivarl\xf6sning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",smfBenchmark:"marknadsm\xe4ssiga utskriftsavtal kostar v\xe4sentligt mindre",variableChargeNote:"Klickkostnader per utskrift (volymbaserat) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},utrustningsleasing:{label:"IT-utrustningsleasing",partnerLabel:"Kvalificerad IT-partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"utrustningsleasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",smfBenchmark:"marknadsm\xe4ssiga IT-leasingavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},kortterminal:{label:"Kortterminal",partnerLabel:"Kvalificerad Betaltj\xe4nstleverant\xf6r",segment:6,unit:"terminaler",unitSingular:"terminal",inlineLabel:"kortterminal",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:"Transaktionsavgifter och volymbaserade procentavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"faktura-tjanst":{label:"Fakturatj\xe4nst / Aff\xe4rssystem",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:6,unit:"licenser",unitSingular:"licens",inlineLabel:"fakturatj\xe4nst",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},"leasing-bil":{label:"F\xf6retagsleasing",partnerLabel:"Kvalificerad Leasingpartner",segment:5,unit:"fordon",unitSingular:"fordon",inlineLabel:"billeasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"it-support":{label:"IT-drift & Support",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"IT-support",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},serverhosting:{label:"Serverhosting & Cloud-infrastruktur",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"serverhosting",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"transport-frakt":{label:"Transport & Frakt",partnerLabel:"Kvalificerad Fraktleverant\xf6r",segment:5,unit:"avtal",unitSingular:"avtal",inlineLabel:"transport",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},kontorsmaterial:{label:"Kontorsmaterial & F\xf6rbrukning",partnerLabel:"Kvalificerad F\xf6rbrukningsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"kontorsmaterial",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"st\xe4d-reng\xf6ring":{label:"St\xe4d & Reng\xf6ring",partnerLabel:"Kvalificerad St\xe4dleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"st\xe4dtj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"larm-bevakning":{label:"Larm & Bevakning",partnerLabel:"Kvalificerad S\xe4kerhetsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"larm och bevakning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},foretagshalsovard:{label:"F\xf6retagsh\xe4lsov\xe5rd",partnerLabel:"Kvalificerad H\xe4lsov\xe5rdspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsh\xe4lsov\xe5rd",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},loneadmin:{label:"L\xf6neadministration",partnerLabel:"Kvalificerad L\xf6nesystemleverant\xf6r",segment:7,unit:"anst\xe4llda",unitSingular:"anst\xe4lld",inlineLabel:"l\xf6neadministration",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat golv: Fortnox L\xf6n 199 kr/m\xe5n + 25 kr/anst\xe4lld/m\xe5n exkl moms (fortnox.se). Exakt utfall beror p\xe5 om behovet ryms i Fortnox L\xf6n.",smfBenchmark:"Fortnox L\xf6n \u2014 verifierat l\xe4gst \u2014 kostar 199 kr/m\xe5n + 25 kr/anst\xe4lld/m\xe5n exkl moms",variableChargeNote:"L\xf6nebesked-/utskicksavgifter (Kivra) \xe4r r\xf6rliga \u2014 ej inkluderat i golvj\xe4mf\xf6relsen.",licensePending:!1,elSuffix:!1},"forsakring-foretag":{label:"F\xf6retagsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},"forsakring-ansvar":{label:"Yrkesansvarsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"yrkesansvarsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},vaxel:{label:"Molnv\xe4xel",partnerLabel:"Kvalificerad Telekomleverant\xf6r",segment:2,unit:"licenser",unitSingular:"licens",inlineLabel:"molnv\xe4xel",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},bankavgifter:{label:"Bankavgifter & Betaltj\xe4nster",partnerLabel:"Kvalificerad Bankpartner",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"bankavgifter",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"avfall-atervinning":{label:"Avfall & \xc5tervinning",partnerLabel:"Kvalificerad Avfallsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"avfall och \xe5tervinning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},uncategorized:{label:"Okategoriserad",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}};function Em(e){var t;return null!==(t=_m[e])&&void 0!==t?t:{label:null!==e&&void 0!==e?e:"Ok\xe4nd kategori",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}}const zm=[{key:"mjukvara",label:"Programvara & licenser",short:"Mjukvara",icon:"spark",mode:"verdict",hint:"Microsoft 365 \xb7 Adobe \xb7 Fortnox",know:"verifierat listpris",cats:["saas-productivity","saas-creative","saas-crm","saas-finance","saas-other","faktura-tjanst","managed-workplace"]},{key:"telefoni",label:"Telefoni & bredband",short:"Telefoni",icon:"phone",mode:"verdict",hint:"Mobil \xb7 v\xe4xel \xb7 bredband",know:"verifierat marknadspris",cats:["mobil","bredband","molnvaxel"]},{key:"lon",label:"L\xf6n & HR",short:"L\xf6n",icon:"fortnox",mode:"verdict",hint:"L\xf6nesystem \xb7 f\xf6retagsh\xe4lsa",know:"verifierat golv",cats:["loneadmin","foretagshalsovard","forsakring-foretag","forsakring-ansvar"]},{key:"el",label:"El",short:"El",icon:"bolt",mode:"verdict",hint:"F\xf6retagsel",know:"Nordpool-verifierat",cats:["el"]},{key:"itdrift",label:"IT-drift & hosting",short:"IT-drift",icon:"wifi",mode:"offert",hint:"Support \xb7 server \xb7 moln",know:null,cats:["it-support","serverhosting"]},{key:"skrivare",label:"Skrivare & print",short:"Skrivare",icon:"file",mode:"offert",hint:"Leasing \xb7 klickavtal",know:null,cats:["skrivarleasing","utrustningsleasing"]},{key:"fordon",label:"Fordon & frakt",short:"Fordon",icon:"truck",mode:"offert",hint:"Leasing \xb7 transport",know:null,cats:["leasing-bil","transport-frakt"]},{key:"ovrigt",label:"Kontor & \xf6vrigt",short:"Kontor",icon:"shield",mode:"offert",hint:"F\xf6rbrukning \xb7 larm \xb7 terminal",know:null,cats:["kontorsmaterial","st\xe4d-reng\xf6ring","larm-bevakning","kortterminal","avfall-atervinning","bankavgifter"]}];const Cm=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e),Am=(e,t,n)=>"watch"===t?"dossier"===n?e.dossier.teal:e.color.brand:e.color.warning,Dm=vc.section`
  position: relative;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  border: 1px solid ${e=>{let{theme:t,$tone:n,$variant:r}=e;return Am(t,n,r)}};
  padding: 15px 18px;
  margin: ${e=>{let{$variant:t}=e;return"dossier"===t?"26px 0 4px":"0 0 20px"}};
  background: ${e=>{let{theme:t,$variant:n,$tone:r}=e;return"dossier"===n?t.dossier.bgRaised:((e,t)=>"watch"===t?e.color.brandSoft:e.color.warningSoft)(t,r)}};

  .fc-eyebrow {
    display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;
    text-transform: uppercase; color: ${e=>{let{theme:t,$tone:n,$variant:r}=e;return Am(t,n,r)}};
    ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?hc`font-family: ${t.font.mono}; font-size: 11px; letter-spacing: .22em;`:hc`font-size: 10px; font-weight: 800; letter-spacing: .1em;`}}
  }
  .fc-eyebrow::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: ${e=>{let{theme:t,$tone:n,$variant:r}=e;return Am(t,n,r)}}; }

  .fc-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 10px; }
  .fc-title {
    line-height: 1.16;
    /* KOMPAKTERAT 2026-08-15: kortet tog en halv skärm i mobil. Rubriken är hooken och får
       stanna, men i mindre grad — fyndet ska ANNONSERA sig, inte ockupera rummet. */
    ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?hc`font-family: ${t.font.display}; font-weight: 600; font-size: clamp(18px, 2.6vw, 22px); color: ${t.dossier.inkOnDark};`:hc`font-weight: 700; font-size: 16px; color: ${t.color.ink};`}}
  }
  .fc-impact {
    flex-shrink: 0; font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-weight: 600; letter-spacing: -.02em;
    font-feature-settings: 'tnum'; color: ${e=>{let{theme:t,$tone:n,$variant:r}=e;return Am(t,n,r)}}; white-space: nowrap;
    font-size: ${e=>{let{$variant:t}=e;return"dossier"===t?"clamp(17px, 2.6vw, 21px)":"clamp(16px, 3.4vw, 20px)"}};
  }
  /* KRAVET (2026-08-15): det enda talet kunden kan hämta hem I DAG låg begravt mitt i en löpande
     mening medan run-raten fick all typografi. En CFO agerar på det som går att kräva tillbaka. */
  .fc-claim {
    display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
    margin: 0 0 10px; padding: 9px 12px; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?hc`background: rgba(43,196,172,.07); border: 1px solid rgba(43,196,172,.30);`:hc`background: ${t.color.brandSoft}; border: 1px solid ${t.color.border};`}}
    .fc-claim-k { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10px; letter-spacing: .16em;
      text-transform: uppercase; color: ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?t.dossier.tealBright:t.color.brand}}; }
    .fc-claim-v { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-weight: 600; font-size: 17px;
      font-feature-settings: 'tnum';
      color: ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?t.dossier.inkOnDark:t.color.ink}}; }
    .fc-claim-b {
      margin-left: auto; cursor: pointer; white-space: nowrap; font-size: 12px; font-weight: 600;
      border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}}; padding: 7px 14px;
      ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?hc`background: transparent; border: 1px solid ${t.dossier.tealBright}; color: ${t.dossier.tealBright};`:hc`background: transparent; border: 1px solid ${t.color.brand}; color: ${t.color.brand};`}}
    }
  }
  .fc-letter {
    margin: 0 0 10px; white-space: pre-wrap; font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: 11.5px; line-height: 1.55; max-height: 260px; overflow: auto;
    padding: 12px 14px; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?hc`color: ${t.dossier.mutedOnDark}; border: 1px solid ${t.dossier.hairlineOnDark};`:hc`color: ${t.color.inkSoft}; background: ${t.color.surface}; border: 1px solid ${t.color.border};`}}
  }
  .fc-line {
    display: inline-block; font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}}; padding: 3px 8px; margin-bottom: 10px; word-break: break-word;
    ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?hc`color: ${t.dossier.mutedOnDark}; border: 1px solid ${t.dossier.hairlineOnDark};`:hc`color: ${t.color.inkSoft}; background: ${t.color.surface}; border: 1px solid ${t.color.border};`}}
  }
  .fc-text {
    margin: 0; line-height: 1.55;
    ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?hc`font-size: 13.5px; color: ${t.dossier.mutedOnDark};`:hc`font-size: 13px; color: ${t.color.inkSoft};`}}
    strong { color: ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?t.dossier.inkOnDark:t.color.ink}}; font-weight: 700; }
  }
  .fc-more {
    margin: 12px 0 0; padding-top: 10px; font-size: 12px;
    border-top: 1px solid ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?t.dossier.hairlineOnDark:t.color.border}};
    color: ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?t.dossier.mutedOnDark:t.color.muted}};
    strong { color: ${e=>{let{theme:t,$variant:n}=e;return"dossier"===n?t.dossier.inkOnDark:t.color.ink}}; font-weight: 700; }
  }
`;function Fm(e){let{finding:t,extraCount:n=0,variant:a="light",eyebrow:i}=e;const[o,s]=(0,r.useState)(!1),[l,d]=(0,r.useState)(!1);if(!t||!t.title)return null;const c="watch"===t.tone?"watch":"leak",u=null!==i&&void 0!==i?i:"watch"===c?"Avtalsbevakning":"dossier"===a?"Fynd p\xe5 era fakturor":"Fynd p\xe5 er faktura",p=t.annualImpact>0;return(0,$c.jsxs)(Dm,{$variant:a,$tone:c,children:[(0,$c.jsx)("div",{className:"fc-eyebrow",children:u}),(0,$c.jsxs)("div",{className:"fc-row",children:[(0,$c.jsx)("div",{className:"fc-title",children:t.title}),p?(0,$c.jsxs)("div",{className:"fc-impact",children:[Cm(t.annualImpact)," kr/\xe5r"]}):t.metricText?(0,$c.jsx)("div",{className:"fc-impact",children:t.metricText}):null]}),t.lineDescription&&(0,$c.jsxs)("div",{className:"fc-line",children:["\u201d",t.lineDescription,"\u201d"]}),t.overpaidToDate>0&&(0,$c.jsxs)("div",{className:"fc-claim",children:[(0,$c.jsx)("span",{className:"fc-claim-k",children:"Att beg\xe4ra tillbaka"}),(0,$c.jsxs)("span",{className:"fc-claim-v",children:[Cm(t.overpaidToDate)," kr"]}),t.letter&&(0,$c.jsx)("button",{type:"button",className:"fc-claim-b",onClick:()=>{var e;o?null===(e=navigator.clipboard)||void 0===e||e.writeText(`${t.letter.subject}\n\n${t.letter.body}`).then(()=>{d(!0),setTimeout(()=>d(!1),2200)}).catch(()=>{}):s(!0)},children:o?l?"Kopierat \u2713":"Kopiera brevet":"Vi skrev brevet \u2192"})]}),o&&t.letter&&(0,$c.jsxs)("div",{className:"fc-letter",children:[t.letter.subject,"\n\n",t.letter.body]}),(0,$c.jsx)("p",{className:"fc-text",children:t.text}),n>0&&(0,$c.jsxs)("p",{className:"fc-more",children:[(0,$c.jsxs)("strong",{children:["+",n," fler fynd"]})," p\xe5 fakturan \u2014 vi g\xe5r igenom dem i er genomg\xe5ng."]})]})}const Om=jc`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Tm=jc`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`,Pm=jc`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
`,Lm=jc`
  to { transform: rotate(360deg); }
`,Rm=jc`
  0%   { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
`,Im=jc`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,.5); }
  60%       { box-shadow: 0 0 0 4px rgba(27,122,110,.0); }
`,Bm=vc.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  min-height: 100vh;
`,Mm=vc.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 80px 28px 32px;
  text-align: center;
  animation: ${Om} 0.6s ease both;
  @media (max-width: 740px) { padding: 48px 20px 20px; }
`,Vm=vc.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  font-size: 12.5px;
  font-weight: 500;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};

  span.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,Um=vc.h1`
  margin-top: 22px;
  font-size: clamp(38px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,Km=vc.p`
  margin: 22px auto 0;
  max-width: 580px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,Hm=vc.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 16px 28px 64px;
  @media (max-width: 740px) { padding: 12px 20px 48px; }
`,Wm=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  margin-bottom: 16px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
  animation: ${Om} 0.5s ease both;
  @media (max-width: 600px) { padding: 22px 20px; }
`,qm=vc.div`
  position: relative;
  border: 2px dashed ${e=>{let{theme:t,$active:n,$hasFile:r}=e;return n||r?t.color.brand:"#A8C8BE"}};
  background: ${e=>{let{theme:t,$active:n,$hasFile:r}=e;return n||r?t.color.brandSoft:t.color.surfaceAlt}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px 24px 28px;
  text-align: center;
  cursor: pointer;
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}},
              border-color ${e=>{let{theme:t}=e;return t.motion.fast}};

  &:hover {
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }

  div.icon {
    margin: 0 auto 16px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }

  strong.primary {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin-bottom: 14px;
  }

  span.cta-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 22px;
    border-radius: 100px;
    background: linear-gradient(135deg, #5DD6CA, #1B6E66);
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
    pointer-events: none;
    margin-bottom: 14px;
  }

  span.secondary {
    display: block;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.5;
  }
  span.filename {
    display: block;
    margin-top: 8px;
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    word-break: break-all;
  }

  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
  }
`,Gm=vc.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 18px;
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`,Ym=vc.label`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span.label {
    font-size: 12.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }

  span.hint {
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.4;
    margin-bottom: 2px;
  }

  select, input {
    padding: 12px 14px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    font-family: inherit;
    font-size: 15px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}};

    &:focus {
      outline: none;
      border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
      box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    }
  }
`,Jm=vc.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Qm=vc.div`
  animation: ${Tm} 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;
`,Xm=(vc.div`
  margin: 20px 0 6px;
  animation: ${Om} .4s ease both;

  .sa-head {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 14px;
  }
  .sa-gauge {
    position: relative;
    width: 74px;
    height: 74px;
    flex-shrink: 0;
  }
  .sa-gauge svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }
  .sa-num {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  .sa-val {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 27px;
    font-weight: 500;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    color: var(--diag-color);
  }
  .sa-den {
    font-size: 10px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
    letter-spacing: 0.02em;
    margin-top: 3px;
  }
  .sa-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .sa-eyebrow {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  .sa-label {
    font-size: 12.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--diag-label-clr);
    line-height: 1.1;
  }
  .sa-text {
    font-size: 15.5px;
    line-height: 1.6;
    letter-spacing: -0.01em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0;
  }
  @media (max-width: 480px) {
    .sa-label { font-size: 14px; }
    .sa-text { font-size: 14.5px; }
  }
`,vc.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  background: none;
  border: none;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  cursor: pointer;
  padding: 14px 0 6px;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  font-family: inherit;
  letter-spacing: 0.01em;
  transition: opacity .15s;
  &:hover { opacity: 0.7; }
`),Zm=vc.p`
  margin-top: 14px;
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
  line-height: 1.55;
  text-align: center;

  a {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`,ef=vc.div`
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.dangerSoft}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.danger}};
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  line-height: 1.5;
`,tf=vc.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${Lm} 0.7s linear infinite;
`,nf=vc.ol`
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
`,rf=vc.li`
  display: grid;
  grid-template-columns: 28px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 12px 16px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t,$state:n}=e;return"done"===n?t.color.surface:"transparent"}};
  border: 1px solid ${e=>{let{theme:t,$state:n}=e;return"done"===n?t.color.borderStrong:"transparent"}};
  opacity: ${e=>{let{$state:t}=e;return"pending"===t?.55:1}};
  transition: opacity ${e=>{let{theme:t}=e;return t.motion.base}},
              background ${e=>{let{theme:t}=e;return t.motion.base}};

  div.bullet {
    width: 24px; height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${e=>{let{theme:t,$state:n}=e;return"done"===n?t.color.brand:"active"===n?t.color.brandSoft:t.color.surfaceAlt}};
    color: ${e=>{let{theme:t,$state:n}=e;return"done"===n?"#FAFAF7":t.color.muted}};
    animation: ${e=>{let{$state:t}=e;return"active"===t?Pm:"none"}} 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  div.label {
    font-size: 14.5px;
    color: ${e=>{let{theme:t,$state:n}=e;return"pending"===n?t.color.muted:t.color.ink}};
    font-weight: ${e=>{let{$state:t}=e;return"active"===t?600:500}};
  }
  div.time {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
  }
`,af=(vc.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: start;
  margin-bottom: 24px;

  h2 {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  span.subtitle {
    margin-top: 4px;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    display: block;
  }
`,vc.div`
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

  .bh-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .bh-stamp {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  .bh-dl {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    transition: all 0.18s;
    padding: 0;
    flex-shrink: 0;
    &:hover {
      background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
      border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
      color: ${e=>{let{theme:t}=e;return t.color.brand}};
    }
  }
  h2.bh-supplier {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(26px, 4vw, 38px);
    font-weight: 600;
    letter-spacing: -0.025em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    line-height: 1.1;
    margin: 0;
    flex: 1;
    min-width: 190px;
  }
  .bh-main {
    margin-bottom: 14px;
  }
  .bh-row {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
    align-items: center;
  }
  .bh-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    white-space: nowrap;
  }
  .bh-chip--alert {
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    font-weight: 700;
  }
`),of=vc.div`
  position: relative;
  overflow: hidden;
  padding: 24px 26px 22px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
  color: #FAFAF7;
  margin-bottom: 12px;
  box-shadow: 0 8px 32px rgba(27,110,102,.22), 0 2px 6px rgba(27,110,102,.14);
  animation: ${Om} 0.5s ease both;

  /* shimmer sweep */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 38%,
      rgba(255,255,255,.14) 48%,
      rgba(255,255,255,.08) 52%,
      transparent 62%
    );
    animation: ${Rm} 3.6s ease-in-out 1.2s infinite;
    pointer-events: none;
  }

  span.kicker {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.75;
    margin-bottom: 10px;
  }
  span.amount {
    display: block;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(38px, 6.5vw, 56px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    font-feature-settings: "tnum";
  }
  span.unit {
    display: block;
    margin-top: 10px;
    font-size: 13.5px;
    opacity: 0.82;
    line-height: 1.55;
    border-top: 1px solid rgba(255,255,255,.18);
    padding-top: 10px;
  }
  span.key-finding {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    font-weight: 600;
    opacity: 0.9;
    letter-spacing: .01em;
    border-top: 1px solid rgba(255,255,255,.14);
    padding-top: 10px;
  }
`,sf=vc.div`
  padding: 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.brand}}99;
  margin-bottom: 20px;

  .estimate-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  span.kicker {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  span.estimate-badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    border-radius: 4px;
    padding: 2px 6px;
  }
  span.amount {
    display: block;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(42px, 7vw, 64px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    font-feature-settings: "tnum";
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  span.unit {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.5;
  }
`,lf=vc.div`
  padding: 20px 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.border}};
  margin-bottom: 20px;

  .ref-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  span.kicker {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  span.ref-badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    border-radius: 4px;
    padding: 2px 6px;
  }
  .ref-tier {
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-size: 15px;
    margin-bottom: 8px;
  }
  .ref-figure {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: clamp(24px, 4.2vw, 34px);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  .ref-figure .per {
    font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
    font-size: 14px;
    font-weight: 500;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  .ref-sub {
    margin-top: 8px;
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.55;
  }
  .ref-disclaimer {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.55;
  }
  .ref-disclaimer strong {
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-weight: 600;
  }
`,df=vc.div`
  grid-column: 1 / -1;
  position: relative;
  margin-top: 14px;
  margin-bottom: 22px;
  padding: 22px 24px 18px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
  overflow: hidden;

  /* dossier-keyline överst — telemetri, inte dekor */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
  }

  .adv-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }
  .adv-eyebrow {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  .adv-badge {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 9.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    padding: 3px 9px;
  }
  .adv-badge::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
  }

  /* Hjältetalet — kundens faktiska kostnad, instrumentläst */
  .adv-figure {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: clamp(30px, 6vw, 40px);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  .adv-figure .unit {
    display: block;
    margin-top: 6px;
    font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }

  /* Visuell jämförelse mot verifierat golv — två staplar på gemensam skala */
  .adv-compare {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .adv-bar {
    display: grid;
    grid-template-columns: 92px 1fr auto;
    align-items: center;
    gap: 12px;
  }
  .adv-bar .lbl {
    font-size: 11.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  .adv-bar .track {
    height: 8px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    overflow: hidden;
  }
  .adv-bar .fill {
    height: 100%;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    transition: width ${e=>{let{theme:t}=e;return t.motion.slow}};
  }
  .adv-bar.you .fill {
    background: ${e=>{let{theme:t,$over:n}=e;return n?t.color.warning:t.color.brand}};
  }
  .adv-bar.floor .fill {
    background: ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  }
  .adv-bar .amt {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: 13px;
    font-weight: 600;
    font-feature-settings: "tnum";
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    white-space: nowrap;
  }

  /* Signalchip — sparsam färg, bara när siffran förtjänar den */
  .adv-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    padding: 6px 12px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-size: 12px;
    font-weight: 600;
    line-height: 1.3;
  }
  .adv-pill.warn {
    color: ${e=>{let{theme:t}=e;return t.color.warning}};
    background: ${e=>{let{theme:t}=e;return t.color.warningSoft}};
  }
  .adv-pill.ok {
    color: ${e=>{let{theme:t}=e;return t.color.success}};
    background: ${e=>{let{theme:t}=e;return t.color.successSoft}};
  }
  .adv-pill.neutral {
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  }

  .adv-prose {
    margin: 16px 0 0;
    font-size: 14px;
    line-height: 1.6;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  .adv-prose strong { color: ${e=>{let{theme:t}=e;return t.color.ink}}; font-weight: 700; }

  .adv-addons {
    margin: 12px 0 0;
    font-size: 12.5px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }

  .adv-foot {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    font-size: 11px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
  }

  @media (max-width: 480px) {
    padding: 20px 18px 16px;
    .adv-bar { grid-template-columns: 76px 1fr auto; gap: 9px; }
    .adv-bar .lbl { font-size: 11px; }
  }
`,cf=vc.p`
  margin-top: 10px;
  margin-bottom: ${e=>{let{$compact:t}=e;return t?"10px":"24px"}};
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  font-style: italic;
  text-align: center;
`,uf=(vc.div`
  margin-bottom: 24px;
`,vc.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 10px 0 4px;
  padding: 18px 20px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.brand}}55;
  background: linear-gradient(
    135deg,
    ${e=>{let{theme:t}=e;return t.color.brandSoft}} 0%,
    ${e=>{let{theme:t}=e;return t.color.surface}} 100%
  );

  div.left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  span.verified-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    flex-shrink: 0;
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }

  p.partner-name {
    margin: 0;
    font-size: 14.5px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -0.01em;
  }

  p.price-label {
    margin: 3px 0 0;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  div.price-offer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-shrink: 0;
    margin-right: 16px;
    @media (max-width: 540px) { display: none; }
  }
  span.offer-price {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.03em;
    font-feature-settings: "tnum";
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  span.offer-label {
    font-size: 11px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-top: 1px;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 32px 26px;
  margin-bottom: 12px;
  box-shadow: 0 4px 24px rgba(14,26,23,.10), 0 1px 4px rgba(14,26,23,.06);
  animation: ${Om} 0.5s ease 0.08s both;

  .switch-eyebrow {
    font-size: 10px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-transform: uppercase;
    letter-spacing: .22em;
    margin-bottom: 8px;
  }

  h3 {
    font-size: clamp(24px, 3.6vw, 30px);
    font-weight: 800;
    letter-spacing: -.028em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0 0 8px;
    line-height: 1.18;
  }

  p.sub {
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.65;
    margin: 0 0 20px;
  }

  .switch-steps {
    display: flex;
    flex-direction: column;
    margin: 4px 0 24px;
  }

  .switch-step {
    position: relative;
    display: flex;
    gap: 16px;
    padding-bottom: 22px;
    &:last-child { padding-bottom: 0; }
  }

  /* connecting timeline line */
  .switch-step:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 13px;
    top: 30px;
    bottom: -2px;
    width: 2px;
    background: ${e=>{let{theme:t}=e;return t.color.brand}}26;
  }

  .step-num {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border: 2px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-feature-settings: "tnum";
  }

  .step-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 3px;
  }

  .step-title {
    font-size: 14.5px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -0.015em;
    line-height: 1.3;
  }

  .step-detail {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.5;
  }

  .switch-offer {
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    overflow: hidden;
    margin-bottom: 20px;
  }

  .switch-offer-head {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 14px 18px;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  }

  .switch-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    flex-shrink: 0;
  }

  .switch-supplier {
    flex: 1;
    min-width: 0;
  }

  .switch-supplier-name {
    font-size: 14px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }

  .switch-price-label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    margin: 3px 0 0;
  }

  .switch-offer-body {
    padding: 20px 22px 18px;
  }

  .sp-from-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .sp-old {
    font-size: 14px;
    font-weight: 500;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
    text-decoration: line-through;
    text-decoration-color: ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    font-feature-settings: "tnum";
    white-space: nowrap;
  }

  .sp-from-arrow {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
    flex-shrink: 0;
  }

  .sp-new {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(40px, 6vw, 52px);
    font-weight: 500;
    letter-spacing: -0.025em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    line-height: 1;
    font-feature-settings: "tnum";
    white-space: nowrap;
    display: block;
    margin-bottom: 10px;

    small {
      font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
      font-size: 15px;
      font-weight: 400;
      color: ${e=>{let{theme:t}=e;return t.color.muted}};
      margin-left: 4px;
      letter-spacing: 0;
    }
  }

  .sp-save-note {
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.4;
  }

  .switch-fine-print {
    font-size: 11.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-align: center;
    margin-top: 10px;
    line-height: 1.5;
  }

  @media (max-width: 600px) { padding: 22px 20px; }
`),pf=vc.div`
  padding: 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(14,26,23,.05), 0 1px 2px rgba(14,26,23,.04);

  strong {
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  p {
    font-size: 14.5px;
    line-height: 1.6;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }

  .estimate-banner {
    margin: 0 0 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  }
  .est-kicker {
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 8px;
  }
  .est-amount {
    display: block;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(36px, 6vw, 52px);
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.0;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-feature-settings: "tnum";
    margin-bottom: 6px;
  }
  .est-note {
    display: block;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    line-height: 1.5;
  }
`,mf=vc.form`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};

  .qlf-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
    @media (max-width: 480px) { grid-template-columns: 1fr; }
  }
  .qlf-full { grid-column: 1 / -1; }

  input[type="text"], input[type="email"] {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 13px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    outline: none;
    &:focus { border-color: ${e=>{let{theme:t}=e;return t.color.accent}}; }
    &::placeholder { color: ${e=>{let{theme:t}=e;return t.color.muted}}; }
  }

  .qlf-mandate {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 12px 0 14px;
    padding: 12px 14px;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    cursor: pointer;

    input[type="checkbox"] {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-top: 2px;
      accent-color: ${e=>{let{theme:t}=e;return t.color.brand}};
      cursor: pointer;
    }
    span {
      font-size: 12.5px;
      line-height: 1.55;
      color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
      em { font-style: normal; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
    }
  }

  .qlf-sent {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    background: #ECFDF5;
    border: 1px solid #6EE7B7;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    font-size: 14px;
    color: #065F46;
    font-weight: 500;
  }

  .qlf-zero-risk {
    margin-top: 10px;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    text-align: center;
    line-height: 1.5;
  }
`,ff=vc.div`
  padding: 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: #FFFBEB;
  border: 1.5px solid #D97706;
  margin-bottom: 20px;

  .monitoring-kicker {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #B45309;
    margin-bottom: 10px;
  }

  .monitoring-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #D97706;
    box-shadow: 0 0 0 3px #FDE68A;
    flex-shrink: 0;
  }

  strong {
    display: block;
    font-size: 18px;
    font-weight: 700;
    color: #92400E;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    line-height: 1.65;
    color: #78350F;
    margin: 0;
  }
`,hf=(vc.div`
  padding: 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.brand}}55;
  margin-bottom: 20px;

  .kicker {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 10px;
  }
  .amount {
    display: block;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(42px, 7vw, 64px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-feature-settings: "tnum";
  }
  .unit {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    opacity: 0.85;
    line-height: 1.5;
    font-feature-settings: "tnum";
  }
`,vc.div`
  margin-top: 16px;
  padding: 16px 20px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.warningSoft}};
  border-left: 3px solid ${e=>{let{theme:t}=e;return t.color.warning}};

  strong {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.warning}};
    margin-bottom: 6px;
  }
  p {
    font-size: 13.5px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin: 0;
  }
`),gf=vc.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{$type:t}=e;return"satellite"===t?"#F8F9FA":"#EFF9F7"}};
  border: 1px solid ${e=>{let{theme:t,$type:n}=e;return"satellite"===n?t.color.border:t.color.brand+"33"}};

  svg { flex-shrink: 0; margin-top: 2px; color: ${e=>{let{theme:t,$type:n}=e;return"satellite"===n?t.color.muted:t.color.brand}}; }
  span {
    font-size: 13px;
    line-height: 1.55;
    color: ${e=>{let{theme:t,$type:n}=e;return"satellite"===n?t.color.muted:t.color.inkSoft}};
  }
`,xf=vc.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
  margin: 32px 0 0;
  @media (max-width: 540px) { grid-template-columns: 1fr; }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  dt {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  dd {
    font-size: 15px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-weight: 500;
    margin: 0;
  }
  dd small {
    display: block;
    margin-top: 4px;
    font-size: 11.5px;
    font-weight: 400;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.5;
  }
  div.full {
    grid-column: 1 / -1;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    padding-top: 14px;
  }
`,vf=vc.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 8, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${Om} 0.2s ease both;
`,bf=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  width: 100%;
  max-width: 440px;
  position: relative;

  button.close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 1;
    transition: background ${e=>{let{theme:t}=e;return t.motion.fast}};
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.border}}; }
  }

  h3 {
    font-size: 22px;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 8px;
    padding-right: 32px;
    em {
      font-style: normal;
      color: ${e=>{let{theme:t}=e;return t.color.brand}};
    }
  }

  p.sub {
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.55;
    margin: 0 0 20px;
  }

  div.context-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}}33;
    font-size: 12.5px;
    font-weight: 500;
    color: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    margin-bottom: 20px;
  }

  div.modal-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input[type="email"] {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    font-family: inherit;
    font-size: 15px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}};
    &:focus {
      outline: none;
      border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
      box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    }
    &::placeholder { color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; }
  }

  div.gate-saving {
    background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
    padding: 22px 24px;
    margin-bottom: 20px;
    color: #FAFAF7;

    span.gate-saving-label {
      display: block;
      font-size: 10.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.8;
      margin-bottom: 8px;
    }

    span.gate-saving-amount {
      display: block;
      font-family: ${e=>{let{theme:t}=e;return t.font.display}};
      font-size: clamp(36px, 9vw, 52px);
      font-weight: 500;
      letter-spacing: -0.025em;
      font-feature-settings: "tnum";
      line-height: 1.0;
      margin-bottom: 8px;
    }

    span.gate-saving-context {
      display: block;
      font-size: 13px;
      opacity: 0.8;
      line-height: 1.4;
    }
  }

  p.fine-print {
    margin: 4px 0 0;
    font-size: 11.5px;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
    text-align: center;
    line-height: 1.5;
  }

  button.manual-link {
    display: block;
    width: 100%;
    margin-top: 14px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-align: center;
    line-height: 1.5;
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover { color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; }
  }

  button.back-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-bottom: 16px;
    &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
  }

  div.sent-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 16px 0 4px;
    text-align: center;

    span.sent-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
      color: ${e=>{let{theme:t}=e;return t.color.brand}};
    }
    p.sent-title {
      font-size: 15px;
      font-weight: 600;
      color: ${e=>{let{theme:t}=e;return t.color.ink}};
      margin: 0;
    }
    p.sent-sub {
      font-size: 13.5px;
      color: ${e=>{let{theme:t}=e;return t.color.muted}};
      margin: 0;
      line-height: 1.5;
    }
  }

  /* ── BankID activation modal ────────────────────────────── */
  p.bk-title {
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin: 0 0 18px;
    padding-right: 32px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }

  div.bk-offer {
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    padding: 16px;
    margin-bottom: 18px;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  }

  div.bk-offer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  span.bk-partner-name {
    font-size: 14px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }

  span.bk-verified {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }

  div.bk-price-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  span.bk-from {
    font-size: 13.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-decoration: line-through;
    text-decoration-color: ${e=>{let{theme:t}=e;return t.color.muted}}88;
  }

  span.bk-arrow {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-weight: 700;
    font-size: 14px;
  }

  span.bk-to {
    font-size: 16px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -0.01em;
  }

  p.bk-savings-row {
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin: 0;
    line-height: 1.5;
  }

  p.bk-email-confirm {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin: 0 0 14px;
    strong { color: ${e=>{let{theme:t}=e;return t.color.ink}}; font-weight: 500; }
  }

  p.bk-fine-print {
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
    text-align: center;
    margin: 12px 0 0;
    line-height: 1.5;
  }
`,kf=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px 32px 28px;
  width: 100%;
  max-width: 440px;
  position: relative;
  box-shadow: 0 24px 64px rgba(14,26,23,.22);

  button.ac-close {
    position: absolute;
    top: 16px; right: 16px;
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    background: none;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; line-height: 1;
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  }

  .ac-eyebrow {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .22em; color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 12px;
  }

  h2.ac-heading {
    font-size: clamp(20px, 4vw, 26px);
    font-weight: 800; letter-spacing: -.03em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0 0 8px; line-height: 1.15; padding-right: 28px;
  }

  p.ac-sub {
    font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.6; margin: 0 0 24px;
  }

  /* ── OAuth provider buttons ── */
  .ac-oauth-btn {
    display: flex; align-items: center; gap: 12px;
    width: 100%; padding: 13px 18px;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    border-radius: 11px;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    font-family: inherit; font-size: 14.5px; font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    cursor: pointer; text-align: left; text-decoration: none;
    transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}},
                box-shadow    ${e=>{let{theme:t}=e;return t.motion.fast}};
    margin-bottom: 9px;

    &:hover {
      border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
      box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    }

    .ac-provider-badge {
      width: 28px; height: 28px; border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 800; flex-shrink: 0;
    }
    .ac-provider-badge--google  { background: #FEF2F2; color: #C0392B; }
    .ac-provider-badge--outlook { background: #EFF6FF; color: #1D4ED8; }

    .ac-oauth-label { flex: 1; }
    .ac-oauth-arrow { color: ${e=>{let{theme:t}=e;return t.color.muted}}; font-size: 12px; }
  }

  /* ── Divider ── */
  .ac-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 20px 0 18px;
    font-size: 11.5px; color: ${e=>{let{theme:t}=e;return t.color.muted}};
    &::before, &::after {
      content: ''; flex: 1; height: 1px;
      background: ${e=>{let{theme:t}=e;return t.color.border}};
    }
  }

  /* ── Email input ── */
  .ac-email-row { display: flex; gap: 8px; }

  .ac-email-input {
    flex: 1; padding: 12px 14px;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    border-radius: 10px;
    font-family: inherit; font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}};
    &:focus {
      outline: none;
      border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
      box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    }
    &::placeholder { color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; }
  }

  /* ── Privacy note ── */
  .ac-privacy {
    font-size: 11px; color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
    text-align: center; margin-top: 14px; line-height: 1.6;
  }

  /* ── Success state ── */
  .ac-success {
    text-align: center; padding: 8px 0 4px;

    .ac-check {
      width: 52px; height: 52px; border-radius: 50%;
      background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
      color: ${e=>{let{theme:t}=e;return t.color.brand}};
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 16px; font-size: 22px;
    }
    h3 { font-size: 20px; font-weight: 800; color: ${e=>{let{theme:t}=e;return t.color.ink}}; margin: 0 0 6px; letter-spacing: -.02em; }
    .ac-email-sent { font-size: 13px; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 600; margin: 0 0 20px; }
    p.ac-success-sub { font-size: 13.5px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; line-height: 1.6; margin: 0 0 20px; }

    .ac-upgrade-label {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .14em; color: ${e=>{let{theme:t}=e;return t.color.muted}};
      margin-bottom: 10px; display: block;
    }
  }

  @media (max-width: 480px) {
    padding: 24px 20px 22px;
    h2.ac-heading { font-size: 19px; }
  }
`,yf=(vc.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  border: none;
  background: #0055CC;
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;

  &:hover { background: #0047B0; }

  span.f-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    background: #fff;
    color: #0055CC;
    font-size: 13px;
    font-weight: 900;
    line-height: 1;
    flex-shrink: 0;
  }
`,vc.div`
  margin-top: 24px;
  margin-bottom: 28px;
  padding-left: 16px;
  border-left: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}}55;

  span.kicker {
    display: block;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 8px;
  }
  p {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 17px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin: 0;
  }
`),jf=vc.div`
  margin-top: 16px;
  border-left: 2px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};

  .lon-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    background: none;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    &:hover .lon-teaser { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
  }
  .lon-head {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  span.kicker {
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  .lon-teaser {
    font-size: 13px;
    font-weight: 400;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    letter-spacing: -0.01em;
    transition: color .15s;
  }
  .lon-chevron {
    flex-shrink: 0;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
    &.open { transform: rotate(90deg); }
  }
  .lon-body {
    padding: 2px 16px 10px;
    animation: ${Tm} 0.2s ease both;
  }
  p {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 14px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin: 0;
  }
`,wf=vc.div`
  margin-top: 20px;
  border: 2px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  overflow: hidden;
  box-shadow: 0 2px 8px ${e=>{let{theme:t}=e;return t.color.brand}}22;

  .acc-trigger {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px 18px;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    cursor: pointer;
    border: none;
    text-align: left;
    gap: 10px;
    transition: background 0.14s ease;
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.brandSoft}}; }
  }
  .acc-icon {
    flex-shrink: 0;
    font-size: 15px;
    line-height: 1;
  }
  .acc-label-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .acc-label {
    font-size: 14px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -0.01em;
  }
  .acc-hint {
    font-size: 11px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-weight: 500;
    letter-spacing: 0;
  }
  .acc-amount {
    font-size: 14px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-feature-settings: "tnum";
    letter-spacing: -0.015em;
  }
  .acc-chevron {
    flex-shrink: 0;
    margin-left: 4px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    &.open { transform: rotate(90deg); }
  }

  .acc-body {
    padding: 16px 18px 20px;
    border-top: 1.5px solid ${e=>{let{theme:t}=e;return t.color.brand}}33;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
  }
  .acc-intro {
    font-size: 14.5px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0 0 18px;
  }
  .acc-row {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
  }
  .acc-row-icon {
    flex-shrink: 0;
    margin-top: 2px;
  }
  .acc-row-content {}
  .acc-row-head {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    margin-bottom: 3px;
    &.keeps { color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
    &.loses { color: ${e=>{let{theme:t}=e;return t.color.warning}}; }
  }
  .acc-row-text {
    font-size: 13.5px;
    line-height: 1.6;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin: 0;
  }
  .acc-disclaimer {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    font-size: 12.5px;
    line-height: 1.6;
    color: #7A8F89;
    font-style: italic;
  }
  .acc-combined {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding: 10px 14px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}}33;
  }
  .acc-combined-label {
    font-size: 12px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -0.01em;
  }
  .acc-combined-amount {
    font-size: 13.5px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-feature-settings: "tnum";
    letter-spacing: -0.015em;
  }
  .acc-cta {
    margin-top: 18px;
    text-align: center;
  }
`,Sf=vc.div`
  margin: 16px 0 20px;
  border: 1px solid ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.border)&&void 0!==t?t:"#D5E2DC"}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;

  .chain-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.surface)&&void 0!==t?t:"#F7FAF9"}};
    border-bottom: 1px solid ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.border)&&void 0!==t?t:"#D5E2DC"}};
    cursor: pointer;
    user-select: none;
    gap: 8px;
  }
  .chain-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.brand)&&void 0!==t?t:"#1B6E66"}};
  }
  .chain-toggle {
    font-size: 11px;
    color: #888;
    flex-shrink: 0;
  }
  .chain-body {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .chain-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    font-size: 13px;
    color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.text)&&void 0!==t?t:"#0E1A17"}};
    border-bottom: 1px dashed #E8F0EC;
    padding-bottom: 7px;
    &:last-child { border-bottom: none; padding-bottom: 0; }
  }
  .chain-row.total {
    font-weight: 700;
    font-size: 14px;
    color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.brand)&&void 0!==t?t:"#1B6E66"}};
    border-top: 1.5px solid #D5E2DC;
    border-bottom: none;
    padding-top: 8px;
    margin-top: 4px;
  }
  .chain-label { color: #5C6E68; font-size: 12px; }
  .chain-value { font-weight: 600; white-space: nowrap; }
  .chain-source {
    font-size: 10px;
    color: #888;
    margin-top: 2px;
  }
`,$f=vc.div`
  margin: 16px 0 20px;
  border: 1px solid ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.border)&&void 0!==t?t:"#D5E2DC"}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;

  .vr-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 16px;
    background: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.surface)&&void 0!==t?t:"#F7FAF9"}};
    border-bottom: 1px solid ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.border)&&void 0!==t?t:"#D5E2DC"}};
  }
  .vr-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.brand)&&void 0!==t?t:"#1B6E66"}};
  }
  .vr-count {
    font-size: 11px;
    color: #888;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }
  .vr-body {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .vr-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-size: 12px;
    color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.text)&&void 0!==t?t:"#0E1A17"}};
  }
  .vr-glyph {
    flex-shrink: 0;
    width: 16px;
    text-align: center;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .vr-glyph.ok        { color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.brand)&&void 0!==t?t:"#1B6E66"}}; }
  .vr-glyph.varning   { color: #B45309; }
  .vr-glyph.ej_provbar { color: #9CA3AF; }
  .vr-label { font-weight: 600; }
  .vr-detalj { color: #5C6E68; font-size: 11px; }
  .vr-row.ej_provbar .vr-label,
  .vr-row.ej_provbar .vr-detalj { color: #9CA3AF; }
  .vr-foot {
    padding: 8px 16px 11px;
    font-size: 10px;
    color: #888;
    border-top: 1px dashed #E8F0EC;
  }
`,Nf=vc.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(27,110,102,.08);
  border: 1px solid rgba(27,110,102,.18);
  border-radius: 100px;
  font-size: 11px;
  color: #1B6E66;
  font-weight: 600;
  margin-top: 6px;

  .range-label { opacity: .7; font-weight: 400; }
`,_f=(vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 32px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(14,26,23,.05), 0 1px 2px rgba(14,26,23,.04);

  h3 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.015em;
    margin-bottom: 8px;
    sup {
      font-size: 9px;
      font-weight: 700;
      color: ${e=>{let{theme:t}=e;return t.color.brand}};
      vertical-align: super;
    }
  }
  p.sub {
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.65;
    margin: 0 0 16px;
  }
  p.seg-count {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin: 0 0 10px;
  }

  .segment-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 20px;
    @media (max-width: 580px) { grid-template-columns: repeat(2, 1fr); }
  }
  .segment-tile {
    position: relative;
    padding: 12px 12px 11px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    display: flex;
    flex-direction: column;
    gap: 3px;
    opacity: 0.6;
    cursor: default;
    transition: opacity 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
    &:hover {
      opacity: 0.85;
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(14,26,23,.07);
    }
  }
  .tile-active {
    border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    background: linear-gradient(
      145deg,
      ${e=>{let{theme:t}=e;return t.color.brandSoft}} 0%,
      ${e=>{let{theme:t}=e;return t.color.surface}} 100%
    );
    box-shadow: 0 2px 12px ${e=>{let{theme:t}=e;return t.color.brand}}1A;
    opacity: 1;
    &:hover {
      opacity: 1;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px ${e=>{let{theme:t}=e;return t.color.brand}}2A;
    }
  }
  .tile-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-bottom: 7px;
    flex-shrink: 0;
  }
  .icon-active {
    width: 32px;
    height: 32px;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    border-color: transparent;
    color: #FAFAF7;
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
  .tile-name {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  .tile-active .tile-name {
    font-size: 12.5px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  .tile-status {
    font-size: 10.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-weight: 500;
  }
  .status-active {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-weight: 600;
    font-size: 11px;
  }
  .tile-metric {
    font-size: 12px;
    font-weight: 800;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-feature-settings: "tnum";
    letter-spacing: -0.03em;
    margin-top: 2px;
  }
  .tile-lock {
    position: absolute;
    top: 8px;
    right: 8px;
    color: ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  }

  @media (max-width: 600px) { padding: 22px 20px; }
`,vc.ul`
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    line-height: 1.5;

    span.check {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
      color: ${e=>{let{theme:t}=e;return t.color.brand}};
    }
  }
`,vc.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 22px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1.5px solid var(--diag-color, ${e=>{let{theme:t}=e;return t.color.borderStrong}});
  margin-bottom: 16px;

  .gauge-wrap {
    flex-shrink: 0;
    position: relative;
    width: 60px;
    height: 60px;
  }
  .gauge-svg {
    position: absolute;
    inset: 0;
  }
  .gauge-num {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    gap: 2px;
  }
  .gauge-val {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-feature-settings: "tnum";
  }
  .gauge-denom {
    font-size: 8px;
    font-weight: 600;
    opacity: 0.5;
    letter-spacing: 0;
  }
  .diag-body {
    flex: 1;
    min-width: 0;
  }
  .diag-top {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }
  .diag-score-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  .diag-sep {
    color: ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    font-size: 13px;
    flex-shrink: 0;
  }
  .diag-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }
  .diag-label {
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .diag-text {
    font-size: 14.5px;
    letter-spacing: -0.01em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0;
    line-height: 1.55;
  }

  @media (max-width: 480px) {
    gap: 15px;
    padding: 16px 18px;
    align-items: flex-start;
    .diag-top {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
    .diag-sep { display: none; }
  }
`),Ef=(vc.div`
  margin-top: 20px;
  padding: 20px 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};

  p.label {
    font-size: 15px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin-bottom: 12px;
  }

  div.row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  input[type="email"] {
    flex: 1;
    min-width: 200px;
    padding: 11px 14px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    font-family: inherit;
    font-size: 15px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}};

    &:focus {
      outline: none;
      border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
      box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    }
    &::placeholder { color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; }
  }

  p.note {
    margin-top: 10px;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
    line-height: 1.5;
  }

  div.sent {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-size: 14.5px;
    font-weight: 500;
    padding: 4px 0;
  }
`,vc.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 100px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0;
  }

  .sub {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-top: 1px;
  }
`),zf=vc.div`
  height: 6px;
  background: ${e=>{let{theme:t}=e;return t.color.borderSoft}};
  border-radius: 3px;
  margin-bottom: 24px;
  overflow: hidden;

  .fill {
    height: 100%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    border-radius: 3px;
    transition: width 0.4s ease;
    width: ${e=>{let{$pct:t}=e;return null!==t&&void 0!==t?t:0}}%;
  }
`,Cf=vc.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`,Af=vc.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{$status:t,theme:n}=e;return"done"===t?n.color.brand+"33":"failed"===t?"#E5383B33":"processing"===t?n.color.brand+"22":n.color.border}};
  transition: border-color 0.2s;

  .icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${e=>{let{$status:t,theme:n}=e;return"done"===t?n.color.brandSoft:"failed"===t?"#FFE8E8":"processing"===t?n.color.brandSoft+"88":n.color.borderSoft}};
    color: ${e=>{let{$status:t,theme:n}=e;return"done"===t?n.color.brand:"failed"===t?"#C0392B":"processing"===t?n.color.brand:n.color.muted}};
  }

  .name {
    flex: 1;
    min-width: 0;
    font-size: 13px;
    font-weight: 500;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status-label {
    font-size: 11.5px;
    font-weight: 500;
    color: ${e=>{let{$status:t,theme:n}=e;return"done"===t?n.color.brand:"failed"===t?"#C0392B":"processing"===t?n.color.brand:n.color.muted}};
    white-space: nowrap;
  }

  .saving {
    font-size: 13px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    white-space: nowrap;
    margin-left: 4px;
  }
`,Df=vc.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }

  .stat {
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    padding: 14px;
    text-align: center;

    .value {
      font-size: 22px;
      font-weight: 700;
      color: ${e=>{let{theme:t}=e;return t.color.ink}};
      line-height: 1.1;
    }
    .label {
      font-size: 11px;
      color: ${e=>{let{theme:t}=e;return t.color.muted}};
      margin-top: 2px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    &.highlight .value {
      color: ${e=>{let{theme:t}=e;return t.color.brand}};
    }
  }
`,Ff=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px 32px 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 24px rgba(14,26,23,.08), 0 1px 4px rgba(14,26,23,.04);
  animation: ${Om} 0.5s ease 0.16s both;

  .eyebrow {
    font-size: 10px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-transform: uppercase;
    letter-spacing: .22em;
    margin-bottom: 14px;
  }

  h3 {
    font-size: clamp(24px, 3.6vw, 30px);
    font-weight: 800;
    letter-spacing: -.028em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0 0 20px;
    line-height: 1.18;
  }

  p.sub {
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.7;
    margin: 0 0 20px;
  }

  /* ── Briefing preview — signal cards ── */
  .briefing-preview {
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 24px;
    box-shadow: 0 2px 10px rgba(14,26,23,.06);
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  }

  .preview-live-dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    animation: ${Im} 2s ease-in-out infinite;
    margin-right: 7px;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }

  .preview-brand-name {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .18em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    vertical-align: middle;
  }

  .preview-time {
    font-size: 11px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }

  /* ── Signal rows ── */
  .signal {
    display: flex;
    gap: 14px;
    padding: 16px 18px;
    border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

    &:last-child {
      border-bottom: none;
    }
  }

  .signal-ico {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-top: 1px;
  }

  .signal-tag {
    display: block;
    font-size: 10px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    letter-spacing: .04em;
    margin-bottom: 5px;
  }

  .signal-line {
    font-size: 14.5px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 6px;
    letter-spacing: -.01em;
  }

  .signal-badge {
    font-size: 12px;
    font-weight: 800;
    padding: 3px 9px;
    border-radius: 100px;
    background: #FEF2F2;
    color: #C41E1E;
    white-space: nowrap;
    letter-spacing: -.01em;

    &.signal-badge--contract {
      background: #FFFBEB;
      color: #92400E;
    }
  }

  .signal-sub {
    font-size: 13px;
    line-height: 1.5;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin: 0;

    strong { color: ${e=>{let{theme:t}=e;return t.color.ink}}; font-weight: 700; }
  }

  /* ── Community Benchmark dot grid ── */
  .bench-grid {
    display: grid;
    grid-template-columns: repeat(5, 13px);
    gap: 5px;
    margin: 7px 0 8px;

    span {
      display: block;
      width: 13px;
      height: 13px;
      border-radius: 3px;
      background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
      border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

      &.on {
        background: ${e=>{let{theme:t}=e;return t.color.brand}};
        border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
        opacity: .6;
      }
      &.you {
        background: ${e=>{let{theme:t}=e;return t.color.brand}};
        border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
        opacity: 1;
        box-shadow: 0 0 0 2.5px #fff, 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brand}};
      }
    }
  }

  /* ── Price row ── */
  .price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    padding-top: 20px;
    margin-bottom: 16px;
  }

  .price {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 36px;
    font-weight: 500;
    letter-spacing: -.03em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-feature-settings: "tnum";
  }

  .price-period {
    font-size: 15px;
    font-weight: 400;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-left: 4px;
  }

  .price-note {
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }

  @media (max-width: 600px) {
    padding: 24px 20px 22px;
    h3 { font-size: 21px; }
    .price { font-size: 30px; }
  }
`,Of=vc.div`
  margin-bottom: 12px;
  padding: 30px 32px 26px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  animation: ${Om} 0.5s ease 0.24s both;

  .pb-eyebrow {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .22em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 12px;
  }

  .pb-head {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(20px, 3vw, 27px);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    line-height: 1.22;
    margin: 0 0 24px;
    max-width: 30ch;
  }

  .pb-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;
    margin-bottom: 24px;
    @media (max-width: 560px) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 18px;
    }
  }

  .pb-seg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    text-align: center;
    opacity: 0.42;
    transition: opacity .35s ease, transform .35s ease;
  }
  .pb-seg.lit {
    opacity: 1;
    transform: translateY(-2px);
  }

  .pb-seg-ico {
    width: 52px;
    height: 52px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    transition: all .35s ease;
  }
  .pb-seg.lit .pb-seg-ico {
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}}, 0 6px 16px rgba(27,122,110,.24);
  }

  .pb-seg-label {
    font-size: 10px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.25;
    letter-spacing: -0.005em;
  }
  .pb-seg.lit .pb-seg-label {
    color: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    font-weight: 700;
  }

  .pb-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
    padding-top: 22px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  }
  .pb-note {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.55;
    margin: 0;
    flex: 1;
    min-width: 220px;
  }
  .pb-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-decoration: none;
    white-space: nowrap;
    transition: gap .2s ease;
    &:hover { gap: 10px; }
  }

  @media (max-width: 600px) {
    padding: 24px 20px 22px;
  }
`;const Tf={"business-premium":"Business Premium","business-standard":"Business Standard","business-basic":"Business Basic",e3:"E3",e5:"E5"},Pf=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);const Lf=3145728;async function Rf(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}function If(e,t){if(!e||!t)return e;const n=t.split(/\s+/),r=[t];n[0].length>=4&&r.push(n[0]),n.length>=2&&r.push(`${n[0]} ${n[1]}`);let a=e;for(const i of[...new Set(r)])a=a.replace(new RegExp(i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),"en verifierad l\xe4gre leverant\xf6r");return a}const Bf={ehandel:"E-handel & Detaljhandel",tillverkning:"Industri & Tillverkning","it-tech":"IT, Tech & Mjukvara",bygg:"Bygg, Hantverk & Fastighet",hotell:"Hotell, Restaurang & Event",konsult:"Konsult & F\xf6retagstj\xe4nster",transport:"Transport & Logistik",vard:"V\xe5rd, Omsorg & H\xe4lsa",ovrigt:"\xd6vrigt / Annan bransch"},Mf=zm,Vf=[{id:"extract",label:"Arvo l\xe4ser & klassificerar fakturan",sublabel:"Tolkar varje rad och post"},{id:"categorize",label:"Identifierar leverant\xf6r & kategori",sublabel:"Matchar mot 200+ leverant\xf6rsprofiler"},{id:"recommend",label:"Ber\xe4knar besparing mot branschindex",sublabel:"J\xe4mf\xf6r med svenska branschdata"}],Uf=e=>new Promise((t,n)=>{const r=new FileReader;r.onload=()=>{const e=String(r.result||""),n=e.includes(",")?e.split(",")[1]:e;t(n)},r.onerror=()=>n(new Error("Kunde inte l\xe4sa filen")),r.readAsDataURL(e)}),Kf={schemakrav:"Strukturkontroll",radsumma:"Radsumma mot fakturatotal",balanskrav:"Antal \xd7 \xe0-pris per rad",projektion:"N\xe4sta periods belopp",listpris:"J\xe4mf\xf6relsepris"},Hf={ok:"\u2713",varning:"!",stopp:"\u2715",ej_provbar:"\u2013"};function Wf(e){let{items:t}=e;if(!Array.isArray(t)||0===t.length)return null;const n=t.filter(e=>"ej_provbar"!==e.status),r=n.filter(e=>"ok"===e.status),a=t.length-n.length;return(0,$c.jsxs)($f,{children:[(0,$c.jsxs)("div",{className:"vr-header",children:[(0,$c.jsx)("span",{className:"vr-title",children:"Maskinellt kontrollerad"}),(0,$c.jsxs)("span",{className:"vr-count",children:[r.length," av ",n.length," kontroller gr\xf6na",a>0?` \xb7 ${a} ej pr\xf6vbara`:""]})]}),(0,$c.jsx)("div",{className:"vr-body",children:t.map(e=>{var t,n;return(0,$c.jsxs)("div",{className:`vr-row ${e.status}`,children:[(0,$c.jsx)("span",{className:`vr-glyph ${e.status}`,children:null!==(t=Hf[e.status])&&void 0!==t?t:"\xb7"}),(0,$c.jsx)("span",{className:"vr-label",children:null!==(n=Kf[e.id])&&void 0!==n?n:e.id}),(0,$c.jsx)("span",{className:"vr-detalj",children:e.detalj})]},e.id)})}),(0,$c.jsx)("div",{className:"vr-foot",children:"Varje kontroll ovan k\xf6rdes deterministiskt p\xe5 just den h\xe4r fakturan \u2014 en kontroll som inte kunde pr\xf6vas markeras, aldrig bockas."})]})}function qf(e){let{cc:t}=e;const[n,a]=r.useState(!1);return(0,$c.jsxs)(Sf,{children:[(0,$c.jsxs)("div",{className:"chain-header",onClick:()=>a(e=>!e),role:"button",tabIndex:0,onKeyDown:e=>"Enter"===e.key&&a(e=>!e),children:[(0,$c.jsx)("span",{className:"chain-title",children:"Ber\xe4kningsunderlag"}),(0,$c.jsx)("span",{className:"chain-toggle",children:n?"D\xf6lj \u25b2":"Visa hur vi r\xe4knar \u25bc"})]}),n&&(0,$c.jsxs)("div",{className:"chain-body",children:[(0,$c.jsxs)("div",{className:"chain-row",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"chain-label",children:"Nuvarande kostnad"}),(0,$c.jsx)("div",{className:"chain-source",children:t.currentAnnualCost.source})]}),(0,$c.jsxs)("span",{className:"chain-value",children:[bu(t.currentAnnualCost.value)," kr/\xe5r"]})]}),t.benchmarkAnnualCost&&(0,$c.jsxs)("div",{className:"chain-row",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"chain-label",children:"Arvo-pris"}),t.benchmarkAnnualCost.formula&&(0,$c.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.formula}),(0,$c.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.source})]}),(0,$c.jsxs)("span",{className:"chain-value",children:[bu(t.benchmarkAnnualCost.value)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"chain-row",children:[(0,$c.jsx)("div",{className:"chain-label",children:"Bruttobesparing"}),(0,$c.jsxs)("span",{className:"chain-value",children:[bu(t.grossSaving.value)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"chain-row",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"chain-label",children:"Arvos arvode"}),(0,$c.jsx)("div",{className:"chain-source",children:t.arvoFee.formula})]}),(0,$c.jsxs)("span",{className:"chain-value",children:["\u2212",bu(t.arvoFee.value)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"chain-row total",children:[(0,$c.jsx)("span",{children:"Er nettobesparing"}),(0,$c.jsxs)("span",{className:"chain-value",children:["+",bu(t.netSaving.value)," kr/\xe5r"]})]})]})]})}function Gf(e){let{seatCount:t,employees:n,overage:a,term:i,termSing:o}=e;const[s,l]=r.useState(!1);return(0,$c.jsxs)(jf,{children:[(0,$c.jsxs)("button",{className:"lon-trigger",onClick:()=>l(e=>!e),"aria-expanded":s,children:[(0,$c.jsxs)("span",{className:"lon-head",children:[(0,$c.jsxs)("span",{className:"kicker",children:["Notering om ",i]}),(0,$c.jsxs)("span",{className:"lon-teaser",children:[a," av ",t," ",i," verkar oanv\xe4nda"]})]}),(0,$c.jsx)("span",{className:"lon-chevron"+(s?" open":""),children:(0,$c.jsx)(kp,{name:"chevron-right",size:15,stroke:2.5})})]}),s&&(0,$c.jsx)("div",{className:"lon-body",children:(0,$c.jsxs)("p",{children:["Kalkylen ovan bygger p\xe5 att vi beh\xe5ller era ",t," ",i,", men s\xe4nker styckpriset genom att flytta er till r\xe4tt avtalsniv\xe5. Vi noterar dock att ni enligt uppgift \xe4r ",n," anst\xe4llda. Om man dessutom hade st\xe4dat bort",1===a?` detta ${a} \xf6verfl\xf6diga ${o}`:` dessa ${a} \xf6verfl\xf6diga ${i}`,", hade er kostnad s\xe4nkts ytterligare."]})})]})}const Yf=()=>{var e,t,n,a,i,o,s,l,d,c,u,p,m,f,h,g,x,v,b,k,y,j,w,S,$,N,_,E,z,C,A,D,F,O,T,P,L,R,I,B,M,V,U,K,H,W,q,G,Y,J,Q,X,Z,ee,te,ne,re,ae,ie,oe,se,le,de,ce,ue,pe,me,fe,he,ge,xe,ve,be,ke,ye,je,we,Se,$e,Ne,_e,Ee,ze,Ce,Ae,De,Fe,Oe,Te,Pe,Le,Re,Ie,Be,Me,Ve,Ue,Ke,He,We,qe,Ge,Ye,Je,Qe,Xe,Ze,et,tt,nt,rt,at,it,ot,st,lt,dt,ct,ut,pt,mt,ft,ht,gt,xt,vt,bt,kt,yt,jt,wt,St,$t,Nt,_t,Et,zt,Ct,At,Dt,Ft,Ot,Tt,Pt,Lt,Rt,It,Bt,Mt,Vt,Ut,Kt,Ht,Wt;const qt=(0,r.useRef)(null),Gt=(0,r.useRef)(null),{email:Yt}=Ac(),[Jt,Qt]=(0,r.useState)(null),[Xt,Zt]=(0,r.useState)("konsult"),[en,tn]=(0,r.useState)(5),[nn,rn]=(0,r.useState)(""),[an,on]=(0,r.useState)(null),[sn,ln]=(0,r.useState)(null),[dn,cn]=(0,r.useState)(null),[un,pn]=(0,r.useState)(null),[mn,fn]=(0,r.useState)(""),[hn,gn]=(0,r.useState)("idle"),[xn,vn]=(0,r.useState)(!1),[bn,kn]=(0,r.useState)(""),[yn,jn]=(0,r.useState)("idle"),[wn,Sn]=(0,r.useState)(!1),[$n,Nn]=(0,r.useState)(""),[_n,En]=(0,r.useState)("idle"),[zn,Cn]=(0,r.useState)(null),[An,Dn]=(0,r.useState)(!1),[Fn,On]=(0,r.useState)(!1),[Tn,Pn]=(0,r.useState)("quota"),[Ln,Rn]=(0,r.useState)(""),[In,Bn]=(0,r.useState)(!1),[Mn,Vn]=(0,r.useState)(""),[Un,Kn]=(0,r.useState)(""),[Hn,Wn]=(0,r.useState)(""),[qn,Gn]=(0,r.useState)(!1),[Yn,Jn]=(0,r.useState)("idle"),[Qn,Xn]=(0,r.useState)(!1),[Zn,er]=(0,r.useState)(""),[tr,nr]=(0,r.useState)("idle"),[rr,ar]=(0,r.useState)(""),[ir,or]=(0,r.useState)("idle"),[sr,lr]=(0,r.useState)(null),[dr,cr]=(0,r.useState)("idle"),[ur,pr]=(0,r.useState)(!1),[mr,fr]=(0,r.useState)(!1),[hr,gr]=(0,r.useState)(""),[xr,vr]=(0,r.useState)("idle"),[br,kr]=(0,r.useState)(null),[yr,jr]=(0,r.useState)(null),[wr,Sr]=(0,r.useState)(""),[$r,Nr]=(0,r.useState)("idle"),[_r,Er]=(0,r.useState)([]),[zr,Cr]=(0,r.useState)(null),[Ar,Dr]=(0,r.useState)([]),[Fr,Or]=(0,r.useState)(null),[Tr,Pr]=(0,r.useState)(!1),Lr=_r.length>1;r.useEffect(()=>{var e,t,n;const r=new URLSearchParams(window.location.search),a=r.get("bypass");a&&(sessionStorage.setItem("arvo_bypass",a),window.history.replaceState({},"",window.location.pathname));const i=r.get("magic");i&&(window.history.replaceState({},"",window.location.pathname),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:i})}).then(e=>e.json()).then(e=>{e.ok&&e.bypass&&sessionStorage.setItem("arvo_bypass",e.bypass)}).catch(()=>{})),fetch("/api/token",{method:"POST"}).then(e=>e.json()).then(e=>{var t;return Cn(null!==(t=e.token)&&void 0!==t?t:null)}).catch(()=>{});const o=r.get("intelligence_connected"),s=r.get("oauth_pending"),l=r.get("oauth_error"),d=null!==(e=null!==(t=null!==(n=r.get("provider"))&&void 0!==n?n:o)&&void 0!==t?t:s)&&void 0!==e?e:"gmail";if(o||s||l){var c,u;const e=parseInt(null!==(c=r.get("invoices"))&&void 0!==c?c:"0",10)||0,t=null!==(u=r.get("email"))&&void 0!==u?u:"";o?kr({type:"connected",provider:o,invoices:e,email:t}):s?kr({type:"pending",provider:s}):l&&kr({type:"error",provider:d,errorCode:l}),window.history.replaceState({},"",window.location.pathname)}},[]),r.useEffect(()=>{var e,t;if(!dn||!Gt.current)return;const n=null!==(e=null===(t=document.querySelector("header"))||void 0===t?void 0:t.offsetHeight)&&void 0!==e?e:64,r=Gt.current.getBoundingClientRect().top+window.pageYOffset-n-8;window.scrollTo({top:r,behavior:"smooth"})},[dn]);const Rr=e=>{ln(null),e&&("application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")?e.size>Lf?ln(`PDF \xe4r f\xf6r stor (${(e.size/1024/1024).toFixed(1)} MB). Max: 3 MB.`):Qt(e):ln("Endast PDF-filer st\xf6ds."))},Ir=e=>{ln(null),Or(null);const t=Array.from(e).filter(e=>"application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")),n=t.filter(e=>e.size>Lf);n.length>0&&ln(`${n.length} fil(er) \xe4r f\xf6r stora (max 3 MB per faktura).`);const r=t.filter(e=>e.size<=Lf);1===r.length?(Qt(r[0]),Er([])):r.length>1?(Er(r),Qt(null),cn(null)):e.length>0&&ln("Endast PDF-filer st\xf6ds.")},Br=async e=>{const t=await fetch("/api/send-analysis",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:dn})});if(!t.ok)throw new Error("send-analysis "+t.status)},Mr=async e=>{const t=await fetch("/api/send-confirmation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:dn})});if(!t.ok)throw new Error("send-confirmation "+t.status)},Vr=async e=>{var t;null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e);const n=($n||Ln||"").trim();if(n&&"idle"===_n){En("submitting");try{await Promise.all([Mr(n),Br(n)]),En("sent")}catch{En("idle")}}},Ur=async e=>{var t;e.preventDefault();const n=null===dn||void 0===dn||null===(t=dn.recommendation)||void 0===t?void 0:t.shelfware;if(n&&"submitting"!==$r){Nr("submitting");try{var r;const e=await fetch("/api/recompute-shelfware",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({seatCount:n.paidSeats,pricePerSeatMonthly:n.perSeatMonthly,employees:n.employees,knownExceptions:""===wr?0:Number(wr)})});if(!e.ok)throw new Error("recompute failed");const t=await e.json();jr(null!==(r=t.shelfware)&&void 0!==r?r:{cleared:!0}),Nr("done")}catch{Nr("error")}}},Kr=an&&"done"!==an,Hr="optimize"===(null===dn||void 0===dn||null===(e=dn.recommendation)||void 0===e?void 0:e.recommendationType)&&(null!==(t=null===dn||void 0===dn||null===(n=dn.recommendation)||void 0===n?void 0:n.optimizationSaving)&&void 0!==t?t:0)>0,Wr=null!==(a=null===dn||void 0===dn||null===(i=dn.recommendation)||void 0===i?void 0:i.optimizationSaving)&&void 0!==a?a:0,qr=Hr&&null!==(o=null===dn||void 0===dn||null===(s=dn.recommendation)||void 0===s?void 0:s.optimizationFee)&&void 0!==o?o:0,Gr=Hr&&null!==(l=null===dn||void 0===dn||null===(d=dn.recommendation)||void 0===d?void 0:d.optimizationNetSaving)&&void 0!==l?l:0,Yr=null!==(c=null===dn||void 0===dn?void 0:dn.hardwareAdjustment)&&void 0!==c?c:null,Jr=null!==(u=null===Yr||void 0===Yr?void 0:Yr.items)&&void 0!==u?u:[],Qr=null!==(p=null===Yr||void 0===Yr?void 0:Yr.hwAnnualCost)&&void 0!==p?p:0,Xr=null!==(m=null===Yr||void 0===Yr?void 0:Yr.hwTotalRemaining)&&void 0!==m?m:0,Zr=!!Yr,ea=Zr?Yr.adjAnnualCost:null!==(f=null===dn||void 0===dn||null===(h=dn.extracted)||void 0===h?void 0:h.annualCost)&&void 0!==f?f:0,ta=Zr?Yr.adjGrossSaving:null!==(g=null===dn||void 0===dn||null===(x=dn.recommendation)||void 0===x?void 0:x.grossSaving)&&void 0!==g?g:0,na=Zr?Yr.adjArvoFee:null!==(v=null===dn||void 0===dn||null===(b=dn.recommendation)||void 0===b?void 0:b.arvoFee)&&void 0!==v?v:0,ra=Zr?Yr.adjNetSaving:null!==(k=null===dn||void 0===dn||null===(y=dn.recommendation)||void 0===y?void 0:y.netSaving)&&void 0!==k?k:0,aa=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1600;const[n,a]=r.useState(0);return r.useEffect(()=>{if(!e)return void a(0);const n=performance.now();let r;const i=o=>{const s=Math.min((o-n)/t,1),l=1-Math.pow(1-s,3);a(Math.round(e*l)),s<1?r=requestAnimationFrame(i):a(e)};return r=requestAnimationFrame(i),()=>{r&&cancelAnimationFrame(r)}},[e,t]),n}(Zr?ra:null!==(j=null===dn||void 0===dn||null===(w=dn.recommendation)||void 0===w?void 0:w.netSaving)&&void 0!==j?j:0),ia=ea,oa=null!==(S=null===dn||void 0===dn||null===($=dn.recommendation)||void 0===$?void 0:$.suggestedAnnualCost)&&void 0!==S?S:0,sa=ia>0&&oa>0&&oa<ia?Math.round((ia-oa)/ia*100):0,la=ia>0&&oa>0&&oa<ia?Math.round((ia-oa)/oa*100):0,da=null!==(N=null===dn||void 0===dn||null===(_=dn.recommendation)||void 0===_||null===(E=_.clickRateAnalysis)||void 0===E?void 0:E.priceGapScore)&&void 0!==N?N:null,ca=null!==da&&void 0!==da?da:Math.max(5,Math.round(100-1.5*sa)),ua=null!=da?da:null!==dn&&void 0!==dn&&null!==(z=dn.recommendation)&&void 0!==z&&z.shouldSwitch?(null!==(C=null===dn||void 0===dn||null===(A=dn.recommendation)||void 0===A?void 0:A.netSaving)&&void 0!==C?C:0)>0?Math.min(ca,79):ca:Math.min(ca,85),pa=ua<45?{dot:"#DC2626",num:"#DC2626",label:"Kritisk",labelClr:"#991B1B",txt:"#7F1D1D",bg:"#FEF2F2",border:"rgba(220,38,38,.18)"}:ua<65?{dot:"#D97706",num:"#D97706",label:"Suboptimerat",labelClr:"#92400E",txt:"#78350F",bg:"#FFFBEB",border:"rgba(217,119,6,.18)"}:ua<80?{dot:"#65A30D",num:"#65A30D",label:"F\xf6rb\xe4ttringsl\xe4ge",labelClr:"#365314",txt:"#365314",bg:"#F7FEE7",border:"rgba(101,163,13,.18)"}:{dot:"#1B7A6E",num:"#1B7A6E",label:"Optimalt",labelClr:"#0E4F47",txt:"#0E4F47",bg:"#DCEEEA",border:"rgba(27,122,110,.18)"},ma=(null===dn||void 0===dn?void 0:dn.monitoringDate)&&new Date(dn.monitoringDate)<new Date,fa=null!==dn&&void 0!==dn&&dn.servicePeriodEnd?Math.ceil((new Date(dn.servicePeriodEnd)-new Date)/864e5):null,ha=null!==(D=null===dn||void 0===dn||null===(F=dn.recommendation)||void 0===F?void 0:F.secondarySaving)&&void 0!==D?D:null,ga=ha?(null!==(O=null===dn||void 0===dn||null===(T=dn.recommendation)||void 0===T?void 0:T.grossSaving)&&void 0!==O?O:0)-ha.grossSaving:null,xa=ha?"bredband"===ha.category?"Bredband"+(ha.speedMbit?` ${ha.speedMbit} Mbit`:""):"Mobil"+(ha.seatCount?` (${ha.seatCount} st)`:""):null,va=!(null===dn||void 0===dn||null===(P=dn.recommendation)||void 0===P||!P.shouldSwitch||null!==dn&&void 0!==dn&&null!==(L=dn.recommendation)&&void 0!==L&&L.suggestedSupplier||null==ha),ba=Em(va?ha.category:null!==(R=null===dn||void 0===dn||null===(I=dn.categorized)||void 0===I?void 0:I.category)&&void 0!==R?R:"uncategorized"),ka=sa>=15?null!==(B=ba.smfBenchmark)&&void 0!==B?B:"ett l\xe4gre verifierat marknadspris finns att h\xe4mta":"samma avtal kostar mindre till leverant\xf6rens publika \xe5rsavtalspris",ya=va?`Ert ${Em(null!==(M=null===dn||void 0===dn||null===(V=dn.categorized)||void 0===V?void 0:V.category)&&void 0!==M?M:"uncategorized").label.toLowerCase()} \xe4r konkurrenskraftigt \u2014 ${null!==xa&&void 0!==xa?xa:"sekund\xe4rtj\xe4nsten"} kan optimeras.`:"monitoring"===(null===dn||void 0===dn?void 0:dn.route)?ma?`Avtalsl\xe5set lossnar snart${null!=fa?` \u2014 ${fa} dagar kvar`:""}. Arvo f\xf6rbereder bytet inf\xf6r f\xf6rnyelsen.`:ua>=80?"Ni betalar marknadsm\xe4ssigt i dag \u2014 Arvo bevakar och agerar inf\xf6r f\xf6rnyelsen.":`Ni betalar ${la}% \xf6ver verifierat marknadspris \u2014 ett l\xe4gre pris finns att s\xe4kra inf\xf6r f\xf6rnyelsen.`:ua<45?la>0?`Ni betalar ${la}% \xf6ver marknadspris \u2014 ${sa>=15?null!==(U=ba.smfBenchmark)&&void 0!==U?U:"stor besparingspotential":ka}.`:"Ni betalar markant s\xe4mre \xe4n branschsnittet \u2014 stor besparingspotential.":ua<80?la>0?`Ni betalar ${la}% \xf6ver marknadspris \u2014 ${ka}.`:"Ni betalar n\xe5got s\xe4mre \xe4n branschsnittet \u2014 ett l\xe4gre verifierat marknadspris finns att h\xe4mta.":"Ni har ett marknadsm\xe4ssigt avtal \u2014 b\xe4ttre \xe4n branschsnittet.",ja=2*Math.PI*26,wa=ua/100*ja,{score:Sa,gaugeReady:$a}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;const[n,a]=r.useState(!1),[i,o]=r.useState(0);return r.useEffect(()=>{if(a(!1),o(0),!e)return;const n=setTimeout(()=>{a(!0);const t=performance.now();let n;const r=a=>{const i=Math.min((a-t)/1450,1),s=1-Math.pow(1-i,3);o(Math.round(e*s)),i<1?n=requestAnimationFrame(r):o(e)};return n=requestAnimationFrame(r),()=>{n&&cancelAnimationFrame(n)}},t);return()=>clearTimeout(n)},[e,t]),{score:i,gaugeReady:n}}(ua,400),Na=ba.isRealPrice,_a=!(null===dn||void 0===dn||null===(K=dn.categorized)||void 0===K||!K.licensePending),Ea=ba.partnerLabel,za=(null!==(H=null===dn||void 0===dn||null===(W=dn.recommendation)||void 0===W?void 0:W.suggestedSupplier)&&void 0!==H?H:"").toLowerCase().trim(),Ca=(null!==(q=null!==(G=null===dn||void 0===dn||null===(Y=dn.categorized)||void 0===Y?void 0:Y.normalizedSupplier)&&void 0!==G?G:null===dn||void 0===dn||null===(J=dn.extracted)||void 0===J?void 0:J.supplier)&&void 0!==q?q:"").toLowerCase().trim(),Aa=Na&&za&&Ca&&(za===Ca||za.includes(Ca)||Ca.includes(za)),Da=Aa?`S\xe4nk er ${null===dn||void 0===dn||null===(Q=dn.recommendation)||void 0===Q?void 0:Q.suggestedSupplier}-kostnad`:Na?"Aktivera bytet":"S\xe4kra besparingen",Fa=!!("auto"===(null===dn||void 0===dn?void 0:dn.route)&&null!==dn&&void 0!==dn&&null!==(X=dn.recommendation)&&void 0!==X&&X.suggestedAnnualCost&&!_a&&ra>0);"auto"!==(null===dn||void 0===dn?void 0:dn.route)||null===dn||void 0===dn||null===(Z=dn.recommendation)||void 0===Z||Z.isOptimize;return(0,$c.jsxs)(Bm,{children:[(0,$c.jsx)(uu,{variant:"public"}),br&&(0,$c.jsxs)("div",{style:{background:"connected"===br.type?"#F0FDF9":"pending"===br.type?"#FFFBEB":"#FEF2F2",borderBottom:"1px solid "+("connected"===br.type?"#6EE7D1":"pending"===br.type?"#FCD34D":"#FECACA"),padding:"13px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[(0,$c.jsxs)("span",{style:{fontSize:14,color:"connected"===br.type?"#065F46":"pending"===br.type?"#92400E":"#991B1B",fontWeight:600,lineHeight:1.5},children:["connected"===br.type&&(0,$c.jsxs)($c.Fragment,{children:["gmail"===br.provider?"Gmail":"Outlook"," kopplat \u2014"," ",br.invoices>0?`Arvo hittade ${br.invoices} fakturor i er inkorg \u2014 analysera er f\xf6rsta nedan, det tar 2 minuter.`:"Inkorgen \xe4r kopplad. Analysera er f\xf6rsta faktura nedan \u2014 det tar 2 minuter."]}),"pending"===br.type&&(0,$c.jsxs)($c.Fragment,{children:["gmail"===br.provider?"Gmail":"Outlook","-anslutning kr\xe4ver konfiguration \u2014"," ","er aktivering \xe4r mottagen och Arvo kontaktar er inom kort."]}),"error"===br.type&&(0,$c.jsxs)($c.Fragment,{children:["Anslutning misslyckades (",br.errorCode,") \u2014 f\xf6rs\xf6k igen eller kontakta hej@arvoflow.se."]})]}),(0,$c.jsx)("button",{onClick:()=>kr(null),style:{background:"none",border:"none",cursor:"pointer",fontSize:18,lineHeight:1,opacity:.5,padding:"0 4px"},"aria-label":"St\xe4ng",children:"\xd7"})]}),(0,$c.jsxs)(Mm,{children:[(0,$c.jsxs)(Vm,{children:[(0,$c.jsx)("span",{className:"dot"})," Arvo Intelligence \xb7 Analys p\xe5 60 sekunder"]}),(0,$c.jsxs)(Um,{children:["Ni betalar f\xf6r mycket. ",(0,$c.jsx)("em",{children:"En"})," faktura bevisar det."]}),(0,$c.jsx)(Km,{children:"Arvo Intelligence j\xe4mf\xf6r er faktura mot verkliga branschpriser och visar exakt vad ni betalar f\xf6r mycket \u2014 och hos vem ni kan spara."})]}),(0,$c.jsxs)(Hm,{children:[!dn&&(0,$c.jsx)(Wm,{children:(0,$c.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),await async function(){var e,t;let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!Jt)return void ln("V\xe4lj en PDF-faktura f\xf6rst.");const r=!!(null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:localStorage.getItem("arvo_gate_passed"));if(!n&&!r){var a;const e=localStorage.getItem("arvo_had_saving"),t=parseInt(null!==(a=localStorage.getItem("arvo_successful_count"))&&void 0!==a?a:"0");if(e||t>=2)return Pn("quota"),void Dn(!0)}let i,o;n&&localStorage.setItem("arvo_gate_passed","1"),ln(null),cn(null),Dn(!1),lr(null),cr("idle"),on("uploading");try{var s,l,d,c;const e=await Uf(Jt),t=await Rf(),r=null!==(s=null!==(l=null!==(d=sessionStorage.getItem("arvo_bypass"))&&void 0!==d?d:localStorage.getItem("arvo_bypass"))&&void 0!==l?l:localStorage.getItem("arvo_gate_passed"))&&void 0!==s?s:void 0;let a=zn;try{var u;const e=await fetch("/api/token",{method:"POST"});a=null!==(u=(await e.json()).token)&&void 0!==u?u:zn,Cn(a)}catch{}on("extract"),i=setTimeout(()=>on("categorize"),6e3),o=setTimeout(()=>on("recommend"),14e3);const g=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:Xt,employees:Number(en),revenue:""===nn?null:Number(nn),token:a,fingerprint:t,bypass:r||void 0,email:n||void 0,userEmail:Yt||void 0})});clearTimeout(i),clearTimeout(o);const x=await g.json().catch(()=>({}));if(x.gate&&"saving_limit"===x.gateType)return on("done"),cn(x),Pn("saving_limit"),void Dn(!0);if(x.gate)return on(null),void Dn(!0);if(x.timeout)return on(null),void ln("Analysen tog lite f\xf6r l\xe5ng tid just nu. V\xe4nta ett \xf6gonblick och f\xf6rs\xf6k igen \u2014 det brukar g\xe5 snabbare vid andra f\xf6rs\xf6ket.");if(429===g.status||x.rateLimited)return on(null),void ln("Du har analyserat f\xf6r m\xe5nga fakturor idag (max 5/dag). Kontakta oss p\xe5 hej@arvoflow.se f\xf6r att ut\xf6ka din kvot.");if(!g.ok||!x.ok)throw new Error(x.error||`Servern returnerade ${g.status}`);if(on("done"),cn(x),pn(null!==(c=x.analysisId)&&void 0!==c?c:null),fn(""),gn("idle"),"auto"===x.route){var p,m;const e=parseInt(null!==(p=localStorage.getItem("arvo_successful_count"))&&void 0!==p?p:"0")+1;var f,h;if(localStorage.setItem("arvo_successful_count",String(e)),(null===(m=x.recommendation)||void 0===m?void 0:m.netSaving)>0)localStorage.setItem("arvo_had_saving","1"),(null!==(f=null!==(h=sessionStorage.getItem("arvo_bypass"))&&void 0!==h?h:localStorage.getItem("arvo_bypass"))&&void 0!==f?f:localStorage.getItem("arvo_gate_passed"))||(Pn("saving"),Dn(!0))}}catch(g){clearTimeout(i),clearTimeout(o),on(null),ln(g.message||"N\xe5got gick fel. F\xf6rs\xf6k igen.")}}()},children:[(0,$c.jsxs)(qm,{$active:xn,$hasFile:!!Jt||Lr,onClick:()=>{var e;return null===(e=qt.current)||void 0===e?void 0:e.click()},onDrop:e=>{e.preventDefault(),vn(!1);const t=e.dataTransfer.files;(null===t||void 0===t?void 0:t.length)>1?Ir(t):null!==t&&void 0!==t&&t[0]&&Rr(t[0])},onDragOver:e=>{e.preventDefault(),vn(!0)},onDragLeave:e=>{e.preventDefault(),vn(!1)},role:"button",tabIndex:0,onKeyDown:e=>{var t;"Enter"!==e.key&&" "!==e.key||null===(t=qt.current)||void 0===t||t.click()},children:[(0,$c.jsx)("input",{ref:qt,type:"file",accept:"application/pdf,.pdf",multiple:!0,onChange:e=>{const t=e.target.files;(null===t||void 0===t?void 0:t.length)>1?Ir(t):null!==t&&void 0!==t&&t[0]&&Rr(t[0])}}),(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(kp,{name:Jt||Lr?"check":"upload",size:28,stroke:1.75})}),Lr?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("strong",{className:"primary",children:[_r.length," fakturor valda"]}),(0,$c.jsxs)("span",{className:"secondary",children:[_r.map(e=>e.name).join(", ").slice(0,80),_r.map(e=>e.name).join(", ").length>80?"\u2026":""]})]}):Jt?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{className:"primary",children:"Faktura vald"}),(0,$c.jsxs)("span",{className:"filename",children:[Jt.name," \xb7 ",(Jt.size/1024).toFixed(0)," kB"]})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{className:"primary",children:"undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"L\xe4gg till er faktura":"Dra hit er faktura"}),(0,$c.jsxs)("span",{className:"cta-pill",children:["undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"V\xe4lj faktura":"V\xe4lj fil"," \u2192"]}),(0,$c.jsx)("span",{className:"secondary",children:"PDF \xb7 max 3 MB \xb7 Vi sparar inte filen"})]})]}),(Jt||Lr)&&(0,$c.jsxs)(Qm,{children:[(0,$c.jsxs)(Gm,{children:[(0,$c.jsxs)(Ym,{children:[(0,$c.jsx)("span",{className:"label",children:"Bransch"}),(0,$c.jsx)("span",{className:"hint",children:"Vi j\xe4mf\xf6r mot bolag av er storlek i samma bransch."}),(0,$c.jsx)("select",{value:Xt,onChange:e=>Zt(e.target.value),children:Object.entries(Bf).map(e=>{let[t,n]=e;return(0,$c.jsx)("option",{value:t,children:n},t)})})]}),(0,$c.jsxs)(Ym,{children:[(0,$c.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$c.jsx)("span",{className:"hint",children:"Prisniv\xe5n varierar med bolagets storlek."}),(0,$c.jsx)("input",{type:"number",min:"1",max:"5000",value:en,onChange:e=>tn(e.target.value)})]})]}),sn&&(0,$c.jsx)(ef,{children:sn}),(0,$c.jsx)(Jm,{children:Lr?(0,$c.jsx)(Bc,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:Tr,onClick:async()=>{var e,t;if(_r.length<2)return;Or(null),Cr({status:"processing",total:_r.length,done:0,failed:0}),Dr(_r.map((e,t)=>({index:t,filename:e.name,status:"pending"}))),Pr(!0);let n=zn;try{var r;const e=await fetch("/api/token",{method:"POST"});n=null!==(r=(await e.json()).token)&&void 0!==r?r:zn,Cn(n)}catch{}const a=null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:void 0;let i=0,o=0;for(let d=0;d<_r.length;d++){Dr(e=>e.map((e,t)=>t===d?{...e,status:"extracting"}:e));try{var s;const e=await Uf(_r[d]),t=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:Xt,employees:parseInt(en,10)||5,token:null!==(s=n)&&void 0!==s?s:"dev",bypass:a})}),r=await t.json();r.route?(i++,Dr(e=>e.map((e,t)=>t===d?{...e,status:"done",route:r.route,extracted:r.extracted,categorized:r.categorized,recommendation:r.recommendation}:e))):(o++,Dr(e=>e.map((e,t)=>{var n;return t===d?{...e,status:"failed",error:null!==(n=r.error)&&void 0!==n?n:"Analys misslyckades"}:e})))}catch(l){o++,Dr(e=>e.map((e,t)=>t===d?{...e,status:"failed",error:l.message}:e))}Cr({status:d===_r.length-1?"done":"processing",total:_r.length,done:i,failed:o})}Pr(!1)},children:Tr?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(tf,{})," Analyserar ",_r.length," fakturor\u2026"]}):(0,$c.jsxs)($c.Fragment,{children:["Analysera ",_r.length," fakturor ",(0,$c.jsx)(kp,{name:"arrow",size:18})]})}):(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:Kr||!Jt,children:Kr?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(tf,{})," Analyserar\u2026"]}):(0,$c.jsxs)($c.Fragment,{children:["Analysera fakturan ",(0,$c.jsx)(kp,{name:"arrow",size:18})]})})})]}),Kr&&(0,$c.jsx)(nf,{children:Vf.map(e=>{const t=(e=>{if(!an)return"pending";if("done"===an)return"done";const t=["uploading","extract","categorize","recommend"],n=t.indexOf(an),r=t.indexOf(e);return r<n?"done":r===n?"active":"pending"})(e.id);return(0,$c.jsxs)(rf,{$state:t,children:[(0,$c.jsx)("div",{className:"bullet",children:"done"===t?(0,$c.jsx)(kp,{name:"check",size:14,stroke:2.5}):(0,$c.jsx)("span",{children:Vf.findIndex(t=>t.id===e.id)+1})}),(0,$c.jsxs)("div",{className:"label",children:[e.label,"active"===t&&e.sublabel&&(0,$c.jsx)("div",{style:{fontSize:11,opacity:.6,marginTop:2,fontWeight:400},children:e.sublabel})]}),(0,$c.jsx)("div",{className:"time",children:"done"===t?"\u2713":"active"===t?"\u2026":""})]},e.id)})}),(0,$c.jsxs)(Zm,{children:["Genom att forts\xe4tta godk\xe4nner du v\xe5ra ",(0,$c.jsx)(vs,{to:"/villkor",children:"villkor"})," ","och v\xe5r ",(0,$c.jsx)(vs,{to:"/integritet",children:"integritetspolicy"}),". Fakturan analyseras av Arvo Intelligence och raderas omedelbart efter analysen."]})]})}),Lr&&(zr||Fr)&&(0,$c.jsxs)(Wm,{style:{marginTop:20},children:[(0,$c.jsx)(Ef,{children:(0,$c.jsxs)("div",{children:[(0,$c.jsxs)("span",{className:"badge",children:[(0,$c.jsx)(kp,{name:"spark",size:10})," Batch-analys"]}),(0,$c.jsx)("h3",{children:"done"===(null===zr||void 0===zr?void 0:zr.status)?"Analys klar":"failed"===(null===zr||void 0===zr?void 0:zr.status)?"Analys misslyckades":"Analyserar fakturor\u2026"}),(0,$c.jsx)("div",{className:"sub",children:zr?`${null!==(ee=zr.done)&&void 0!==ee?ee:0} av ${zr.total} klara${zr.failed?` \xb7 ${zr.failed} misslyckades`:""}`:Fr||`${_r.length} fakturor k\xf6ade`})]})}),zr&&(0,$c.jsx)(zf,{$pct:zr.total>0?Math.round(((null!==(te=zr.done)&&void 0!==te?te:0)+(null!==(ne=zr.failed)&&void 0!==ne?ne:0))/zr.total*100):0,children:(0,$c.jsx)("div",{className:"fill"})}),Fr&&(0,$c.jsx)(ef,{style:{marginBottom:16},children:Fr}),"done"===(null===zr||void 0===zr?void 0:zr.status)&&(()=>{const e=Ar.filter(e=>{var t;return null===e||void 0===e||null===(t=e.recommendation)||void 0===t?void 0:t.shouldSwitch}),t=e.reduce((e,t)=>{var n,r;return e+(null!==(n=null===(r=t.recommendation)||void 0===r?void 0:r.netSaving)&&void 0!==n?n:0)},0),n=Ar.filter(e=>"review_queue"===(null===e||void 0===e?void 0:e.route)).length;return(0,$c.jsxs)(Df,{children:[(0,$c.jsxs)("div",{className:"stat highlight",children:[(0,$c.jsxs)("div",{className:"value",children:[bu(Math.round(t/1e3)),"k"]}),(0,$c.jsx)("div",{className:"label",children:"Nettobesparing/\xe5r"})]}),(0,$c.jsxs)("div",{className:"stat",children:[(0,$c.jsx)("div",{className:"value",children:e.length}),(0,$c.jsx)("div",{className:"label",children:"Rekommenderar byte"})]}),(0,$c.jsxs)("div",{className:"stat",children:[(0,$c.jsx)("div",{className:"value",children:n}),(0,$c.jsx)("div",{className:"label",children:"Kr\xe4ver granskning"})]})]})})(),(0,$c.jsx)(Cf,{children:(Ar.length>0?Ar:_r.map((e,t)=>({index:t,filename:e.name,status:"pending"}))).map((e,t)=>{var n,r,a,i,o,s,l;const d=null!==(n=null===e||void 0===e?void 0:e.status)&&void 0!==n?n:"pending",c=null!==(r=null===e||void 0===e||null===(a=e.recommendation)||void 0===a?void 0:a.netSaving)&&void 0!==r?r:null,u="done"===d?"check":"failed"===d?"x":"processing"===d?"spark":"file",p="done"===d?"review_queue"===e.route?"Kr\xe4ver granskning":"unsupported"===e.route?"Utanf\xf6r scope":"Klar":"failed"===d?"Misslyckades":"processing"===d?"Kategoriserar\u2026":"extracting"===d?"L\xe4ser faktura\u2026":"V\xe4ntar\u2026";return(0,$c.jsxs)(Af,{$status:d,children:[(0,$c.jsx)("div",{className:"icon-wrap",children:(0,$c.jsx)(kp,{name:u,size:14,stroke:2})}),(0,$c.jsx)("span",{className:"name",children:null!==(o=null!==(s=null===e||void 0===e?void 0:e.filename)&&void 0!==s?s:null===(l=_r[t])||void 0===l?void 0:l.name)&&void 0!==o?o:`Faktura ${t+1}`}),(0,$c.jsx)("span",{className:"status-label",children:p}),c>0&&(0,$c.jsxs)("span",{className:"saving",children:["\u2212",bu(c)," kr/\xe5r"]})]},null!==(i=null===e||void 0===e?void 0:e.index)&&void 0!==i?i:t)})}),"done"!==(null===zr||void 0===zr?void 0:zr.status)&&"failed"!==(null===zr||void 0===zr?void 0:zr.status)&&(0,$c.jsx)("p",{style:{fontSize:12,color:"#888",textAlign:"center",margin:0},children:"Arvo analyserar fakturorna i bakgrunden. Uppdateras var 5:e sekund."})]}),dn&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(Wm,{ref:Gt,children:[(0,$c.jsxs)(af,{children:[(0,$c.jsxs)("div",{className:"bh-top",children:[(0,$c.jsxs)("span",{className:"bh-stamp",children:["Arvo-analys \xb7 ",(new Date).toLocaleDateString("sv-SE",{day:"numeric",month:"short",year:"numeric"}).toUpperCase()]}),(0,$c.jsx)("button",{className:"bh-dl",onClick:()=>Xn(!0),title:"Ladda ner analys",children:(0,$c.jsx)("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",children:(0,$c.jsx)("path",{d:"M12 5v14M5 12l7 7 7-7"})})})]}),(0,$c.jsx)("div",{className:"bh-main",children:(0,$c.jsx)("h2",{className:"bh-supplier",children:dn.extracted.supplier})}),(0,$c.jsx)("div",{className:"bh-row",children:dn.categorized&&(0,$c.jsxs)("span",{className:"bh-chip",children:["natavgift"===dn.reason?"N\xe4tavgift":null!=ha?`${Em(dn.categorized.category).label} & ${xa}`:Em(dn.categorized.category).label||dn.categorized.category,dn.categorized.subType&&"natavgift"!==dn.reason&&null==ha?` \xb7 ${dn.categorized.subType}`:""]})})]}),(0,$c.jsx)(Fm,{finding:null===(re=dn.recommendation)||void 0===re?void 0:re.leadFinding,extraCount:(null!==(ae=null===(ie=dn.recommendation)||void 0===ie||null===(oe=ie.forensicFindings)||void 0===oe?void 0:oe.length)&&void 0!==ae?ae:0)-1,variant:"light"}),"monitoring"!==dn.route&&(0,$c.jsx)(Fm,{finding:dn.contractClock,variant:"light"}),"monitoring"===dn.route?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(_f,{style:{"--diag-color":pa.dot},children:[(0,$c.jsxs)("div",{className:"gauge-wrap",children:[(0,$c.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$c.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E5E7EB",strokeWidth:"4.5"}),(0,$c.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:pa.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:`${wa} ${ja}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1s ease"}})]}),(0,$c.jsxs)("div",{className:"gauge-num",style:{color:pa.dot},children:[(0,$c.jsx)("span",{className:"gauge-val",children:ua}),(0,$c.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$c.jsxs)("div",{className:"diag-body",children:[(0,$c.jsxs)("div",{className:"diag-top",children:[(0,$c.jsx)("span",{className:"diag-score-label",children:"Arvo Score"}),(0,$c.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$c.jsxs)("span",{className:"diag-status",children:[(0,$c.jsx)(kp,{name:"alert-circle",size:13,color:pa.dot,stroke:2}),(0,$c.jsx)("span",{className:"diag-label",style:{color:pa.labelClr},children:pa.label})]})]}),(0,$c.jsx)("p",{className:"diag-text",children:ya})]})]}),(0,$c.jsxs)(ff,{children:[(0,$c.jsxs)("div",{className:"monitoring-kicker",children:[(0,$c.jsx)("span",{className:"monitoring-dot"}),"Bevakning aktiverad"]}),"fixed_price"===dn.contractType?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("strong",{children:["Fastprisavtal \u2014 bundet t.o.m. ",dn.servicePeriodEnd?new Date(dn.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):dn.servicePeriodEnd,"."]}),(0,$c.jsx)("p",{children:ma?`Fastprisavtal kan inte avslutas i f\xf6rtid. Avtalet l\xf6per ut om ${null!=fa?`${fa} dagar`:"kort tid"} \u2014 Arvo f\xf6rbereder bytet till ett b\xe4ttre avtal nu.`:`Fastprisavtal kan inte avslutas i f\xf6rtid. Arvo bevakar avtalet och p\xe5minner er ${dn.monitoringDate?new Date(dn.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):"3 m\xe5nader"} innan slutdatum s\xe5 ni hinner byta till ett b\xe4ttre avtal i r\xe4tt tid.`})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:ma?"Avtalet l\xf6per ut snart \u2014 Arvo agerar nu.":null!=dn.cancellationNoticeDays?"Avtalet \xe4r l\xe5st \u2014 vi l\xe4gger det p\xe5 bevakning.":"\xc5rsavtal \u2014 Arvo bevakar inf\xf6r f\xf6rnyelse."}),(0,$c.jsx)("p",{children:(()=>{const e=dn.servicePeriodEnd,t=dn.cancellationNoticeDays,n=dn.monitoringDate,r=e?new Date(e).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):null,a=n?new Date(n).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):null;return ma?`Avtalet l\xf6per t.o.m. ${null!==r&&void 0!==r?r:e}${null!=fa?` (${fa} dagar kvar)`:""}. Arvo f\xf6rbereder bytet till b\xe4sta verifierade villkor innan f\xf6rnyelse.`:null!=t?`Avtalet l\xf6per t.o.m. ${null!==r&&void 0!==r?r:e}. Upps\xe4gningstiden (${t} dagar) har redan passerat. Arvo f\xf6rbereder bytet ${null!==a&&void 0!==a?a:"90 dagar innan n\xe4sta f\xf6rnyelse"}.`:`Avtalet l\xf6per t.o.m. ${null!==r&&void 0!==r?r:e}. Vi p\xe5minner er i ${null!==a&&void 0!==a?a:"90 dagar innan slutdatum"} \u2014 i god tid f\xf6r att agera n\xe4r avtalet l\xf6per ut.`})()})]})]}),(0,$c.jsxs)(xf,{children:[(0,$c.jsxs)("div",{children:[(0,$c.jsxs)("dt",{children:["Ni betalar idag",Em(null===(se=dn.categorized)||void 0===se?void 0:se.category).elSuffix?" (energidel)":""]}),(0,$c.jsxs)("dd",{children:[bu(dn.extracted.annualCost)," / \xe5r","annual"!==dn.extracted.billingPeriod&&(0,$c.jsxs)("small",{style:{fontStyle:"italic"},children:["Projicerat fr\xe5n abonnemangsradernas listpris",dn.extracted.billingPeriodAssumed?" \xb7 antaget m\xe5nadsvis (fakturan saknar period)":""]})]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Fakturadatum"}),(0,$c.jsx)("dd",{children:dn.extracted.date})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$c.jsx)("dd",{children:bu(dn.extracted.amount)})]}),dn.extracted.servicePeriodEnd&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Avtalstid t.o.m."}),(0,$c.jsx)("dd",{children:new Date(dn.extracted.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"})})]}),dn.monitoringDate&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:ma?"Bevakning":"Arvo p\xe5minner er"}),(0,$c.jsx)("dd",{children:ma?null!=fa?`Aktiv \u2014 avtal l\xf6per ut om ${fa} dagar`:"Aktiv":(()=>{const e=new Date(dn.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"});return e.charAt(0).toUpperCase()+e.slice(1)})()})]})]}),((null===(le=dn.categorized)||void 0===le?void 0:le.reasoning)||dn.potentialSavingNote)&&(0,$c.jsxs)(yf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Avtals\xf6versikt"}),(null===(de=dn.categorized)||void 0===de?void 0:de.reasoning)&&(0,$c.jsxs)("p",{children:[dn.categorized.normalizedSupplier||(null===(ce=dn.extracted)||void 0===ce?void 0:ce.supplier)," fakturerar"," ",bu(null===(ue=dn.extracted)||void 0===ue?void 0:ue.annualCost)," per \xe5r f\xf6r"," ",Em(dn.categorized.category).inlineLabel,"."," ","Avtalet \xe4r bevakat \u2014 Arvo tar kontakt"," ",null!=fa&&fa<=90?"nu inf\xf6r f\xf6rest\xe5ende f\xf6rnyelse":dn.monitoringDate&&!ma?`fr\xe5n ${new Date(dn.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"})}`:"inf\xf6r avtalets f\xf6rnyelse"," ","och s\xe4krar b\xe4sta villkor utan att ni beh\xf6ver l\xe4gga tid p\xe5 det."]}),dn.potentialSavingNote&&(0,$c.jsxs)("p",{style:{marginTop:null!==(pe=dn.categorized)&&void 0!==pe&&pe.reasoning?10:0},children:[(0,$c.jsx)("strong",{children:"Potentiell nettobesparing vid avtalets slut:"})," ",dn.potentialSavingNote]})]})]}):"unsupported"===dn.route?(0,$c.jsx)(pf,{children:"natavgift"===dn.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"N\xe4tavgift \u2014 reglerat monopol, kan inte f\xf6rhandlas."}),(0,$c.jsxs)("p",{children:["Denna faktura \xe4r fr\xe5n er lokala n\xe4t\xe4gare (",null!==(me=null===(fe=dn.extracted)||void 0===fe?void 0:fe.supplier)&&void 0!==me?me:"n\xe4tbolaget",") och avser eln\xe4tets distributionskostnad. N\xe4tavgiften best\xe4ms av Energimarknadsinspektionen och \xe4r geografiskt bunden \u2014 den kan inte p\xe5verkas genom ett elleverant\xf6rsbyte."]}),(0,$c.jsxs)("p",{children:["Ladda upp er ",(0,$c.jsx)("strong",{children:"elhandelsfaktura"})," (fr\xe5n er elleverant\xf6r) f\xf6r att se om ni betalar r\xe4tt pris f\xf6r sj\xe4lva elen."]})]}):"credit_note"===dn.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Kreditnota \u2014 ingen analys m\xf6jlig."}),(0,$c.jsx)("p",{children:"Filen verkar vara en kreditnota med negativt belopp. Ladda upp den ordinarie fakturan f\xf6r en korrekt analys."})]}):"insurance"===dn.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"F\xf6rs\xe4kringar hanteras inte av Arvo \xe4nnu."}),(0,$c.jsx)("p",{children:"F\xf6rs\xe4kringsf\xf6rmedling kr\xe4ver tillst\xe5nd fr\xe5n Finansinspektionen. Arvo planerar att ans\xf6ka om detta tillst\xe5nd under 2027 \u2014 tills dess analyserar vi inte f\xf6rs\xe4kringsfakturor. Ladda upp en annan leverant\xf6rsfaktura f\xf6r att komma ig\xe5ng."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Utanf\xf6r analysr\xe4ckvidden."}),(0,$c.jsx)("p",{children:"Denna faktura avser en tj\xe4nst vi inte optimerar (t.ex. juridik, redovisning, bemanning eller myndighetsavgifter). Koppla Fortnox / Visma f\xf6r att analysera era \xf6vriga leverant\xf6rer."})]})}):"review_queue"===dn.route?(0,$c.jsxs)(pf,{children:["volume_data_required"===dn.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Kr\xe4ver offert \u2014 v\xe5ra experter kikar p\xe5 detta."}),(0,$c.jsx)("p",{children:dn.volumeDataNote||"Kostnaden f\xf6r denna kategori styrs av specifika volymer och specifikationer, inte antalet anst\xe4llda. V\xe5ra experter kikar p\xe5 detta manuellt f\xf6r att ge er en r\xe4ttvis analys."}),null!=dn.creditExpiryMonths&&(0,$c.jsxs)(hf,{style:dn.creditWillExpireUnused?{background:"#FEF3C7",borderColor:"rgba(217,119,6,.25)"}:void 0,children:[(0,$c.jsx)("strong",{children:dn.creditWillExpireUnused?`\u26a0 Krediter f\xf6rfaller ${dn.creditExpiryDate} \u2014 ${dn.creditExpiryMonths} ${1===dn.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} kvar`:`Era startup-krediter r\xe4cker ca ${dn.creditExpiryMonths} ${1===dn.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} till`}),(0,$c.jsxs)("p",{children:["Ni f\xf6rbrukar ",dn.startupCreditCurrency," ",null===(he=dn.startupCreditMonthlyBurn)||void 0===he?void 0:he.toLocaleString("sv-SE"),"/m\xe5n men betalar ingenting tack vare kvarvarande kredit (",dn.startupCreditCurrency," ",null===(ge=dn.startupCreditBalance)||void 0===ge?void 0:ge.toLocaleString("sv-SE"),").",dn.creditWillExpireUnused?` Vid nuvarande f\xf6rbrukningstakt f\xf6rfaller ca ${dn.startupCreditCurrency} ${null===(xe=dn.creditUnusedAmount)||void 0===xe?void 0:xe.toLocaleString("sv-SE")} oanv\xe4nt. \xd6verv\xe4g att skala upp era resurser eller kontakta leverant\xf6ren om f\xf6rl\xe4ngning \u2014 sedan bev\xe4pnar Arvo er med exakt vilken prisniv\xe5 ni ska kr\xe4va.`:" Nu \xe4r r\xe4tt tid att planera ert molnavtal \u2014 vi visar er exakt vilken prisniv\xe5 ni ska kr\xe4va innan fakturorna b\xf6rjar landa."]})]})]}):"foreign_currency"===dn.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("strong",{children:["Fakturan \xe4r i ",dn.currency," \u2014 kontakta oss."]}),(0,$c.jsx)("p",{children:"Vi st\xf6djer SEK och EUR. F\xf6r \xf6vriga valutor, kontakta oss s\xe5 hj\xe4lper vi er manuellt."})]}):"no_benchmark"===dn.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Utanf\xf6r v\xe5r nuvarande t\xe4ckning."}),(0,$c.jsx)("p",{children:"Vi har \xe4nnu inte benchmarkdata f\xf6r denna leverant\xf6rskategori. Vi noterar fakturan och \xe5terkommer n\xe4r vi kan g\xf6ra en fullst\xe4ndig analys."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Fakturan beh\xf6ver djupare analys."}),(0,$c.jsx)("p",{children:"V\xe5r algoritm \xe4r inte tillr\xe4ckligt s\xe4ker p\xe5 klassificeringen f\xf6r att visa automatiska besparingssiffror. Koppla Fortnox / Visma f\xf6r en komplett, felfri analys av hela er leverant\xf6rsreskontra."})]}),"sent"===ir?(0,$c.jsx)("p",{style:{fontSize:13,color:"#1B6E66",fontWeight:600,marginTop:14,marginBottom:0},children:"\u2713 Vi h\xf6r av oss n\xe4r analysen \xe4r klar!"}):(0,$c.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),rr&&"idle"===ir){or("submitting");try{await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:rr,source:"review_queue",reason:null===dn||void 0===dn?void 0:dn.reason})}),or("sent")}catch{or("sent")}}},style:{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"},children:[(0,$c.jsx)("input",{type:"email",placeholder:"din@email.se \u2014 vi meddelar n\xe4r vi har ett svar",value:rr,onChange:e=>ar(e.target.value),required:!0,style:{flex:1,minWidth:180,padding:"9px 14px",borderRadius:100,border:"1.5px solid #D5E2DC",fontSize:13,outline:"none",background:"#fff",color:"#0E1A17"}}),(0,$c.jsx)("button",{type:"submit",disabled:!rr||"submitting"===ir,style:{padding:"9px 18px",borderRadius:100,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#5DD6CA,#1B6E66)",color:"#fff",fontSize:13,fontWeight:700,opacity:rr&&"submitting"!==ir?1:.55},children:"submitting"===ir?"Skickar\u2026":"Meddela mig \u2192"})]})]}):null!==(ve=dn.recommendation)&&void 0!==ve&&ve.requiresQuote?(0,$c.jsxs)($c.Fragment,{children:[((null===(be=dn.recommendation)||void 0===be?void 0:be.clickRateAnalysis)||(null===(ke=dn.recommendation)||void 0===ke?void 0:ke.shouldSwitch)&&(null!==(ye=null===(je=dn.recommendation)||void 0===je?void 0:je.netSaving)&&void 0!==ye?ye:0)>0)&&(0,$c.jsx)($c.Fragment,{children:(0,$c.jsxs)(yf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Vad analysen visar"}),(0,$c.jsx)("p",{children:dn.recommendation.reasoning})]})}),(null===(we=dn.recommendation)||void 0===we||null===(Se=we.clickRateAnalysis)||void 0===Se?void 0:Se.estimatedAnnualSavingsHigh)>0?(0,$c.jsxs)(sf,{children:[(0,$c.jsxs)("div",{className:"estimate-header",children:[(0,$c.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$c.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$c.jsxs)("span",{className:"amount",children:["\u2248 ",Pf(dn.recommendation.clickRateAnalysis.estimatedAnnualSavingsLow),"\u2013",Pf(dn.recommendation.clickRateAnalysis.estimatedAnnualSavingsHigh),"\xa0kr/\xe5r"]}),(0,$c.jsx)("span",{className:"unit",children:"Er faktiska klickkostnad p\xe5 \xe5rsbasis mot marknadsbandet (estimat) \xb7 exakt belopp bekr\xe4ftas med offert"})]}):(null!==($e=null===(Ne=dn.recommendation)||void 0===Ne?void 0:Ne.netSaving)&&void 0!==$e?$e:0)>0?(0,$c.jsxs)(sf,{children:[(0,$c.jsxs)("div",{className:"estimate-header",children:[(0,$c.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$c.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$c.jsxs)("span",{className:"amount",children:["\u2248 +",Pf(dn.recommendation.netSaving),"\xa0kr/\xe5r"]}),(0,$c.jsx)("span",{className:"unit",children:"J\xe4mf\xf6rt mot verifierat B2B-marknadspris \xb7 bekr\xe4ftas med faktisk offert"})]}):null,(null===(_e=dn.recommendation)||void 0===_e?void 0:_e.storageSubstitution)&&(()=>{const e=dn.recommendation.storageSubstitution;return(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1",marginBottom:"20px",padding:"18px 22px",background:"#0E1A17",borderRadius:"20px",border:"1.5px solid #1B7A6E"},children:[(0,$c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px",flexWrap:"wrap"},children:[(0,$c.jsx)("span",{style:{fontSize:"12px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",color:"#5DD6CA"},children:"Arkitektonisk insikt"}),(0,$c.jsxs)("span",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#0E1A17",background:"#5DD6CA",borderRadius:"4px",padding:"2px 6px"},children:[e.vendor," \xb7 USD"]})]}),(0,$c.jsx)("p",{style:{margin:0,fontSize:"15px",lineHeight:1.55,color:"#F1F6F3",fontWeight:600},children:e.usdPain}),(0,$c.jsx)("p",{style:{margin:"10px 0 0",fontSize:"14px",lineHeight:1.55,color:"#C7D6D0"},children:e.substitution}),(0,$c.jsx)("p",{style:{margin:"12px 0 0",paddingTop:"12px",borderTop:"1px solid #2A3A35",fontSize:"12px",lineHeight:1.5,color:"#8FA39C"},children:e.note})]})})(),(null===(Ee=dn.recommendation)||void 0===Ee?void 0:Ee.m365Equivalent)&&(0,$c.jsxs)(lf,{children:[(0,$c.jsxs)("div",{className:"ref-header",children:[(0,$c.jsx)("span",{className:"kicker",children:"Verifierad referens \u2014 likv\xe4rdig svit"}),(0,$c.jsx)("span",{className:"ref-badge",children:"Microsoft listpris"})]}),(0,$c.jsx)("div",{className:"ref-tier",children:dn.recommendation.m365Equivalent.m365TierLabel}),(0,$c.jsx)("div",{className:"ref-figure",children:null!=dn.recommendation.m365Equivalent.monthlyTotal?(0,$c.jsxs)($c.Fragment,{children:[Pf(dn.recommendation.m365Equivalent.monthlyTotal),"\xa0kr",(0,$c.jsxs)("span",{className:"per",children:["/m\xe5n f\xf6r ",dn.recommendation.m365Equivalent.seats," anv\xe4ndare"]})]}):(0,$c.jsxs)($c.Fragment,{children:[dn.recommendation.m365Equivalent.perSeatMonthlyLabel,"\xa0kr",(0,$c.jsx)("span",{className:"per",children:"/anv\xe4ndare/m\xe5n"})]})}),(0,$c.jsxs)("div",{className:"ref-sub",children:[dn.recommendation.m365Equivalent.perSeatMonthlyLabel,"\xa0kr/anv\xe4ndare/m\xe5n vid \xe5rsavtal \xb7 ",dn.recommendation.m365Equivalent.equivalenceNote]}),(0,$c.jsxs)("div",{className:"ref-disclaimer",children:[(0,$c.jsx)("strong",{children:"Detta \xe4r Microsofts publika listpris f\xf6r den likv\xe4rdiga sviten \u2014 inte ert Google-pris."})," Google publicerar bara listpris i USD; ert faktiska kronpris j\xe4mf\xf6r vi mot i offerten nedan."]})]}),(0,$c.jsxs)(pf,{children:[(0,$c.jsx)("strong",{children:null!==(ze=dn.recommendation)&&void 0!==ze&&ze.clickRateAnalysis?"Ber\xe4kna exakt besparing per \xe5r":(null!==(Ce=null===(Ae=dn.recommendation)||void 0===Ae?void 0:Ae.netSaving)&&void 0!==Ce?Ce:0)>0?"S\xe4kra besparingen \u2014 kr\xe4ver offert":null!==(De=dn.recommendation)&&void 0!==De&&De.m365Equivalent?"Exakt Google-pris kr\xe4ver offert":"unaudited"===(null===(Fe=dn.recommendation)||void 0===Fe?void 0:Fe.revisionGate)?"Kr\xe4ver offert \u2014 Arvo g\xf6r en manuell genomg\xe5ng":"Kr\xe4ver offert \u2014 volymdata beh\xf6vs."}),(0,$c.jsx)("p",{children:null!==(Oe=dn.recommendation)&&void 0!==Oe&&Oe.clickRateAnalysis?"Klickpriset \xe4r fastslaget. Fyll i nedan s\xe5 ber\xe4knar Arvo det exakta beloppet inklusive maskinleasing.":(null!==(Te=null===(Pe=dn.recommendation)||void 0===Pe?void 0:Pe.netSaving)&&void 0!==Te?Te:0)>0?"Fyll i era uppgifter \u2014 Arvo beg\xe4r in och sammanst\xe4ller offerter fr\xe5n rikst\xe4ckande avfallspartners.":null!==(Le=dn.recommendation)&&void 0!==Le&&Le.m365Equivalent?"Vi j\xe4mf\xf6r referensen ovan mot ert faktiska Google-pris och tar fram en exakt besparing i offerten.":dn.recommendation.reasoning}),(0,$c.jsx)(mf,{onSubmit:e=>{e.preventDefault(),Hn&&qn&&"idle"===Yn&&(Jn("sent"),setTimeout(()=>{if(!Gt.current)return;const e=Gt.current.getBoundingClientRect().top+window.pageYOffset-16;window.scrollTo({top:e,behavior:"smooth"})},50),fetch("/api/quote-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contactEmail:Hn.trim().toLowerCase(),contactName:Mn.trim()||void 0,contactCompany:Un.trim()||void 0,mandateAccepted:!0,extractedData:null===dn||void 0===dn?void 0:dn.extracted,categorized:null===dn||void 0===dn?void 0:dn.categorized})}).catch(e=>console.error("[quote-request]",e)))},children:"sent"===Yn?(0,$c.jsxs)("div",{className:"qlf-sent",children:[(0,$c.jsx)(kp,{name:"check",size:16,stroke:2.5}),"Tack! Bekr\xe4ftelse \xe4r skickad till din e-post. Vi \xe5terkommer med offerter inom 1\u20132 arbetsdagar."]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{className:"qlf-fields",children:[(0,$c.jsx)("input",{type:"text",placeholder:"Ditt namn",value:Mn,onChange:e=>Vn(e.target.value)}),(0,$c.jsx)("input",{type:"text",placeholder:"F\xf6retag",value:Un,onChange:e=>Kn(e.target.value)}),(0,$c.jsx)("input",{className:"qlf-full",type:"email",placeholder:"Din e-post (dit skickar vi offertsammanst\xe4llningen)",required:!0,value:Hn,onChange:e=>Wn(e.target.value)})]}),(0,$c.jsxs)("label",{className:"qlf-mandate",children:[(0,$c.jsx)("input",{type:"checkbox",checked:qn,onChange:e=>Gn(e.target.checked)}),(0,$c.jsxs)("span",{children:["Jag ger ",(0,$c.jsx)("em",{children:"Arvo Flow"})," fullmakt att beg\xe4ra in, sammanst\xe4lla och presentera offerter fr\xe5n leverant\xf6rer \xe5 mitt bolags v\xe4gnar."]})]}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"sm",disabled:"submitting"===Yn||!qn,style:{width:"100%",justifyContent:"center"},children:"submitting"===Yn?"Startar...":"Starta offertprocessen \u2192"}),(0,$c.jsx)("p",{className:"qlf-zero-risk",children:"Ni betalar ingenting om vi inte hittar besparingar \u2014 20\xa0% av realiserad besparing."})]})})]})]}):Hr?(0,$c.jsx)($c.Fragment,{children:(0,$c.jsxs)(of,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Dold kostnad hittad"}),(0,$c.jsxs)("span",{className:"amount",children:["+",bu(Gr)]}),(0,$c.jsxs)("span",{className:"unit",children:["Ni betalar ",Pf(Wr)," kr/\xe5r f\xf6r en tj\xe4nst som redan ing\xe5r i er licens"," ","\xb7 Arvos besparingsarvode ",bu(qr)," (20 %)"]})]})}):null!==(Re=dn.recommendation)&&void 0!==Re&&Re.shouldSwitch&&(null===(Ie=dn.recommendation)||void 0===Ie?void 0:Ie.netSaving)>0?(0,$c.jsx)($c.Fragment,{children:((e,t,n,r,a,i)=>{const o=ba.isRealPrice,s=dn.categorized.licensePending,l=(ba.partnerLabel,(null!==(e=dn.recommendation.suggestedSupplier)&&void 0!==e?e:"").toLowerCase().trim()),d=(null!==(t=null!==(n=null===(r=dn.categorized)||void 0===r?void 0:r.normalizedSupplier)&&void 0!==n?n:null===(a=dn.extracted)||void 0===a?void 0:a.supplier)&&void 0!==t?t:"").toLowerCase().trim();o&&l&&d&&(l===d||l.includes(d)||d.includes(l))&&dn.recommendation.suggestedSupplier;return(0,$c.jsxs)($c.Fragment,{children:[ya&&(0,$c.jsxs)(_f,{style:{"--diag-color":pa.dot},children:[(0,$c.jsxs)("div",{className:"gauge-wrap",children:[(0,$c.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$c.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E9F1ED",strokeWidth:"4.5"}),(0,$c.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:pa.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:$a?`${Sa/100*ja} ${ja}`:`0 ${ja}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)"}})]}),(0,$c.jsxs)("div",{className:"gauge-num",style:{color:pa.dot},children:[(0,$c.jsx)("span",{className:"gauge-val",children:Sa}),(0,$c.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$c.jsxs)("div",{className:"diag-body",children:[(0,$c.jsxs)("div",{className:"diag-top",children:[(0,$c.jsx)("span",{className:"diag-score-label",children:"Arvo Score\u2122"}),(0,$c.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$c.jsxs)("span",{className:"diag-status",children:[(0,$c.jsx)(kp,{name:"alert-circle",size:13,color:pa.dot,stroke:2}),(0,$c.jsx)("span",{className:"diag-label",style:{color:pa.labelClr},children:pa.label})]})]}),(0,$c.jsx)("p",{className:"diag-text",children:ya})]})]}),(0,$c.jsxs)(of,{children:[(0,$c.jsx)("span",{className:"kicker",children:s?"M\xf6jlig \xe5rlig besparing":"Din identifierade nettobesparing"}),(0,$c.jsxs)("span",{className:"amount",children:["+",bu(aa)]}),(0,$c.jsx)("span",{className:"unit",children:s?"F\xf6rs\xe4kring kr\xe4ver FI-licens \u2014 vi byter inte sj\xe4lva \xe4nnu, men visar gapet.":o&&dn.recommendation.suggestedSupplier?(0,$c.jsxs)($c.Fragment,{children:[Pf(ea)," \u2192 ",Pf(dn.recommendation.suggestedAnnualCost)," kr/\xe5r hos ",(0,$c.jsx)("strong",{children:dn.recommendation.suggestedSupplier})," ","\xb7 Arvos besparingsarvode ",bu(na)," (20 %)",Zr&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("br",{}),(0,$c.jsxs)("small",{style:{opacity:.85},children:["Avser abonnemang och licenser. Om ",dn.recommendation.suggestedSupplier," absorberar er h\xe5rdvaruskuld (",Pf(Xr)," kr) uppg\xe5r nettobesparing till ",bu(dn.recommendation.netSaving)," kr/\xe5r."]})]})]}):(0,$c.jsxs)($c.Fragment,{children:[Pf(ea)," \u2192 ",Pf(dn.recommendation.suggestedAnnualCost)," kr/\xe5r (Arvos kalkylerade riktpris)"," ","\xb7 Arvos besparingsarvode ",bu(na)," (20 %)"]})})]}),!s&&(0,$c.jsx)(cf,{$compact:!0,children:"list-verified"===ba.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Vid genomf\xf6rt byte bekr\xe4ftas slutpriset i offert innan ni godk\xe4nner.":null!==(i=ba.benchmarkNote)&&void 0!==i?i:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n en verifierad l\xe4gre leverant\xf6r."})]})})()}):"uncategorized"===(null===(Be=dn.categorized)||void 0===Be?void 0:Be.category)?(0,$c.jsxs)(pf,{children:[(0,$c.jsx)("strong",{children:"Kategorin \xe4r under analys."}),(0,$c.jsx)("p",{children:"Koppla Fortnox / Visma s\xe5 mappar vi era volymer mot marknadens b\xe4sta priser direkt."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(pf,{style:{marginTop:0},children:[(0,$c.jsx)("strong",{children:"Marknadsm\xe4ssigt pris."})," ",null!==(Me=null===(Ve=dn.recommendation)||void 0===Ve?void 0:Ve.monitoringNote)&&void 0!==Me?Me:"Vi hittar inget prisgap mot marknadens b\xe4sta verifierade niv\xe5 \u2014 Arvo rekommenderar inget byte i dag."]}),!(null!==(Ue=dn.recommendation)&&void 0!==Ue&&Ue.shouldSwitch)&&(null===(Ke=dn.recommendation)||void 0===Ke?void 0:Ke.reasoning)&&(0,$c.jsxs)(yf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$c.jsx)("p",{children:Em(dn.categorized.category).isRealPrice?dn.recommendation.reasoning:If(dn.recommendation.reasoning,dn.recommendation.suggestedSupplier)})]})]}),(null===(He=dn.recommendation)||void 0===He?void 0:He.reasoning)&&(null===(We=dn.recommendation)||void 0===We?void 0:We.shouldSwitch)&&!Hr&&!va&&(0,$c.jsxs)(yf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$c.jsx)("p",{children:Em(dn.categorized.category).isRealPrice?dn.recommendation.reasoning:If(dn.recommendation.reasoning,dn.recommendation.suggestedSupplier)})]}),(null===(qe=dn.recommendation)||void 0===qe?void 0:qe.shouldSwitch)&&!Hr&&((e,t)=>{const n=null===(e=dn.extracted)||void 0===e?void 0:e.seatCount,r=Number(en),a=null!=n&&n>r?n-r:0,i=Em(null===(t=dn.categorized)||void 0===t?void 0:t.category);return a>0?(0,$c.jsx)(Gf,{seatCount:n,employees:r,overage:a,term:i.unit,termSing:i.unitSingular}):null})(),(0,$c.jsx)(Xm,{onClick:()=>pr(e=>!e),children:ur?"\u2191 D\xf6lj underlag":"\u2193 Hur vi r\xe4knar"}),ur&&(0,$c.jsxs)($c.Fragment,{children:["auto"===dn.route&&!(null!==(Ge=dn.categorized)&&void 0!==Ge&&Ge.licensePending)&&!(null!==(Ye=dn.recommendation)&&void 0!==Ye&&Ye.shouldSwitch&&(null===(Je=dn.recommendation)||void 0===Je?void 0:Je.netSaving)>0&&!Hr)&&(0,$c.jsx)(cf,{children:"list-verified"===ba.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Vid genomf\xf6rt byte bekr\xe4ftas slutpriset i offert innan ni godk\xe4nner.":null!==(Qe=ba.benchmarkNote)&&void 0!==Qe?Qe:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n en verifierad l\xe4gre leverant\xf6r."}),"auto"===dn.route&&!(null!==(Xe=dn.categorized)&&void 0!==Xe&&Xe.licensePending)&&!ba.isRealPrice&&dn.savingRange&&(0,$c.jsxs)(Nf,{children:[(0,$c.jsx)("span",{className:"range-label",children:"Intervall:"}),Pf(dn.savingRange.low)," \u2013 ",Pf(dn.savingRange.high)," kr/\xe5r netto"]}),"auto"===dn.route&&!(null!==(Ze=dn.categorized)&&void 0!==Ze&&Ze.licensePending)&&dn.calculationChain&&(0,$c.jsx)(qf,{cc:dn.calculationChain}),"auto"===dn.route&&(0,$c.jsx)(Wf,{items:dn.verifications}),(null===(et=dn.extracted)||void 0===et?void 0:et.potentialMixedCategories)&&(0,$c.jsx)("p",{style:{fontSize:12,color:"#9CA3AF",marginBottom:14,lineHeight:1.5,fontStyle:"italic"},children:ha?(0,$c.jsxs)($c.Fragment,{children:["Kombinerad faktura \u2014"," ",Em(null===(tt=dn.categorized)||void 0===tt?void 0:tt.category).label,null!=(null===(nt=dn.extracted)||void 0===nt?void 0:nt.primaryComponentMonthly)?` (${bu(12*dn.extracted.primaryComponentMonthly)}/\xe5r)`:""," ","+ ",xa," (",bu(ha.currentAnnual),"/\xe5r)."," ","Besparing:"," ",Em(null===(rt=dn.categorized)||void 0===rt?void 0:rt.category).label," ","\u2212",bu(ga),"/\xe5r"," ","|"," ",xa," \u2212",bu(ha.grossSaving),"/\xe5r."]}):(0,$c.jsxs)($c.Fragment,{children:["Kombinerad faktura \u2014 analysen avser"," ",Em(null===(at=dn.categorized)||void 0===at?void 0:at.category).label,null!=(null===(it=dn.extracted)||void 0===it?void 0:it.primaryComponentMonthly)?` (${bu(12*dn.extracted.primaryComponentMonthly)}/\xe5r)`:"",(null!==(ot=null===(st=dn.recommendation)||void 0===st?void 0:st.nonPrimaryAnnual)&&void 0!==ot?ot:0)>0?`. \xd6vriga tj\xe4nster (${bu(dn.recommendation.nonPrimaryAnnual)}/\xe5r) analyseras via Fortnox/Visma.`:"."]})}),null!=(null===(lt=dn.extracted)||void 0===lt?void 0:lt.annualCost)&&"monitoring"!==dn.route&&"unsupported"!==dn.route&&(0,$c.jsxs)(xf,{children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Ni betalar idag"}),(0,$c.jsxs)("dd",{children:[bu(ea)," / \xe5r",Zr?(0,$c.jsxs)("small",{children:["Abonnemang och licenser. Exkl. h\xe5rdvaruavbetalningar (",bu(Qr),"/\xe5r)",dn.extracted.variableCharges>0?` och r\xf6rliga avgifter (${bu(dn.extracted.variableCharges)} denna period)`:"","."]}):dn.extracted.variableCharges>0&&(0,$c.jsxs)("small",{children:["Varav fasta abonnemang. Exkl. r\xf6rliga avgifter (",bu(dn.extracted.variableCharges)," denna period)."]})]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Fakturadatum"}),(0,$c.jsx)("dd",{children:dn.extracted.date})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$c.jsxs)("dd",{children:[bu(dn.extracted.amount),dn.extracted.oneTimeFees>0&&(0,$c.jsxs)("small",{children:["Inkl. ",bu(dn.extracted.oneTimeFees)," ",dn.extracted.elSkatterKr>0?"lagstadgade avgifter":"eng\xe5ngskostnader"," \u2014 ing\xe5r ej i \xe5rsber\xe4kningen ovan."]})]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"\xc5terkommande"}),(0,$c.jsx)("dd",{children:dn.extracted.recurring?"Ja (abonnemang / premie)":"Nej"})]}),"EUR"===dn.extracted.originalCurrency&&(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1"},children:[(0,$c.jsx)("dt",{children:"Valutakonvertering"}),(0,$c.jsx)("dd",{children:(0,$c.jsxs)("small",{children:["Fakturan \xe4r i EUR \u2014 konverterad till SEK med kursen ",null===(dt=dn.extracted.fxRate)||void 0===dt?void 0:dt.toFixed(2)," SEK/EUR",dn.extracted.fxSource&&"fallback"!==dn.extracted.fxSource?` (Riksbanken/ECB ${null!==(ct=dn.extracted.fxDate)&&void 0!==ct?ct:""})`:" (fallback-kurs)",". Alla belopp ovan \xe4r i SEK."]})})]}),Jr.length>0&&(0,$c.jsx)("div",{style:{gridColumn:"1 / -1"},children:(0,$c.jsxs)(hf,{children:[(0,$c.jsx)("strong",{children:"\u26a0 Aktiv h\xe5rdvaruleasing \u2014 kontrollera innan ni byter"}),(0,$c.jsxs)("p",{children:[Jr.map((e,t)=>(0,$c.jsxs)("span",{style:{display:"block",marginBottom:Jr.length>1&&t<Jr.length-1?"6px":0},children:[e.description," \u2014 ",e.monthsRemaining," m\xe5nader kvar (",Pf(e.monthlyCost)," kr/m\xe5n = ",(0,$c.jsxs)("strong",{children:[Pf(e.remainingCost)," kr totalt"]}),")"]},t)),Jr.length>1&&(0,$c.jsxs)("span",{style:{display:"block",marginTop:"6px",fontWeight:700},children:["Totalt kvar att betala: ",Pf(Xr)," kr"]})]}),Zr&&null!=Yr.breakEvenYears&&(0,$c.jsxs)("p",{style:{marginTop:8,paddingTop:8,borderTop:"1px solid rgba(0,0,0,0.08)"},children:[(0,$c.jsx)("strong",{children:"Break-even om skulden l\xf6ses kontant:"})," ",Pf(Xr)," kr \xf7 ",Pf(ta)," kr/\xe5r = ",(0,$c.jsxs)("strong",{children:[String(Yr.breakEvenYears).replace(".",",")," \xe5r"]})," ","\u2014"," ","fr\xe5ga ",null!==(ut=null===(pt=dn.recommendation)||void 0===pt?void 0:pt.suggestedSupplier)&&void 0!==ut?ut:"den nya leverant\xf6ren"," om de kan absorbera skulden vid avtalssignering. Om ja \xe4r besparingen ",bu(dn.recommendation.netSaving)," kr/\xe5r netto fr\xe5n dag ett."]})]})}),dn.extracted.elUncertaintyNote&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"\xc5rsuppskattning"}),(0,$c.jsx)("dd",{children:(0,$c.jsx)("small",{children:dn.extracted.elUncertaintyNote})})]}),dn.extracted.elSkatterKr>0&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Skatter & lagstadgade avgifter"}),(0,$c.jsxs)("dd",{children:[bu(dn.extracted.elSkatterKr),(0,$c.jsx)("small",{children:"Energiskatt, elcertifikat m.m. \u2014 ej f\xf6rhandlingsbara, ing\xe5r ej i besparingskalkylen."})]})]}),dn.extracted.elNatavgiftAnnual>0&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"N\xe4tavgift (ej valbar)"}),(0,$c.jsxs)("dd",{children:[bu(dn.extracted.elNatavgiftAnnual)," / \xe5r",(0,$c.jsx)("small",{children:"Eln\xe4tsavgiften best\xe4ms av din regionala n\xe4toperat\xf6r och kan inte bytas via elleverant\xf6rsbyte \u2014 ing\xe5r ej i besparingskalkylen."})]})]}),dn.extracted.variableCharges>0&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"R\xf6rliga avgifter denna period"}),(0,$c.jsxs)("dd",{children:[bu(dn.extracted.variableCharges),(0,$c.jsx)("small",{children:null!==(mt=Em(null===(ft=dn.categorized)||void 0===ft?void 0:ft.category).variableChargeNote)&&void 0!==mt?mt:"R\xf6rliga avgifter denna period \u2014 ej inkluderat i \xe5rsber\xe4kningen."}),"mobil"===(null===(ht=dn.categorized)||void 0===ht?void 0:ht.category)&&((e,t)=>{const n=dn.extracted.roamingZone,r=null!==(e=dn.extracted.recurringAmount)&&void 0!==e?e:0,a=null!==(t=dn.extracted.variableCharges)&&void 0!==t?t:0;return a<Math.max(.3*r,1e3)?null:n>=4?(0,$c.jsxs)(gf,{$type:"satellite",children:[(0,$c.jsx)(kp,{name:"globe",size:14}),(0,$c.jsx)("span",{children:"Satellit- och maritim datatrafik (Zon 4) \xe4r teknikberoende \u2014 kan inte optimeras via operat\xf6rsbyte och ing\xe5r inte i Arvos besparing."})]}):(0,$c.jsxs)(gf,{children:[(0,$c.jsx)(kp,{name:"info",size:14}),(0,$c.jsxs)("span",{children:["Roamingkostnader p\xe5 ",bu(a)," denna period. Om detta \xe4r \xe5terkommande kan ett mobilavtal med b\xe4ttre EU-datapaket minska kostnaden \u2014 Arvo tittar p\xe5 detta vid ett leverant\xf6rsbyte."]})]})})()]})]}),"saas-productivity"===(null===(gt=dn.categorized)||void 0===gt?void 0:gt.category)&&(null===(xt=dn.extracted)||void 0===xt?void 0:xt.licenseType)&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Licensplan"}),(0,$c.jsxs)("dd",{children:[dn.extracted.licenseType,"monthly"===dn.extracted.billingCycleType&&(0,$c.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#A8761A",fontWeight:600},children:"M\xe5nadsvis"}),"annual"===dn.extracted.billingCycleType&&(0,$c.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#1B7A6E",fontWeight:600},children:"\xc5rsavtal"})]})]}),"saas-productivity"===(null===(vt=dn.categorized)||void 0===vt?void 0:vt.category)&&(null===(bt=dn.recommendation)||void 0===bt?void 0:bt.annualBillingSaving)>0&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"M\xf6jlighet \u2014 \xe5rsavtal"}),(0,$c.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",bu(dn.recommendation.annualBillingSaving),"/\xe5r utan leverant\xf6rsbyte"]})]}),"saas-productivity"===(null===(kt=dn.categorized)||void 0===kt?void 0:kt.category)&&(e=>{const t=null===(e=dn.recommendation)||void 0===e?void 0:e.savingsBreakdown;if(!t)return null;const n=[{label:"Marknadsgap",value:t.cspDiscount},{label:"Tier-optimering (advisory)",value:t.tierOptimization},{label:"Licensrensning",value:t.licenseCleanup}].filter(e=>e.value>0);return n.length<2?null:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("div",{style:{gridColumn:"1 / -1",borderTop:"1px solid #D5E2DC",marginTop:"4px",paddingTop:"10px"},children:(0,$c.jsx)("dt",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#5C6E68",marginBottom:"6px"},children:"Besparing per kanal"})}),n.map(e=>(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:e.label}),(0,$c.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",bu(e.value),"/\xe5r"]})]},e.label))]})})()]}),(null===(yt=dn.recommendation)||void 0===yt?void 0:yt.shelfware)&&(()=>{const e=dn.recommendation.shelfware,t=null!==yr?yr:e,n=null!==yr,r={gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},a={fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"};return n&&t&&!t.cleared&&t.annualWaste>0?(0,$c.jsxs)("div",{style:r,children:[(0,$c.jsx)("div",{style:a,children:"Licensrevision \u2014 bekr\xe4ftat"}),(0,$c.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:[(0,$c.jsxs)("strong",{children:[t.confirmedIdle," bekr\xe4ftat oanv\xe4nda platser"]})," \xe0 ",t.perSeatMonthly," kr/plats/m\xe5n"," ","= ",(0,$c.jsxs)("strong",{style:{color:"#1B7A6E"},children:[bu(t.annualWaste)," kr/\xe5r"]})," i verifierat svinn att avveckla."]})]}):n?(0,$c.jsxs)("div",{style:r,children:[(0,$c.jsx)("div",{style:a,children:"Licensrevision \u2014 klar"}),(0,$c.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:"Tack \u2014 d\xe5 \xe4r \xf6verskottet f\xf6rklarat. Vi flaggar inget svinn p\xe5 era licenser."})]}):e.needsReview?(0,$c.jsxs)("div",{style:r,children:[(0,$c.jsx)("div",{style:a,children:"Licensrevision \u2014 vi beh\xf6ver er bekr\xe4ftelse"}),(0,$c.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:e.reviewPrompt}),(0,$c.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Om de st\xe5r oanv\xe4nda motsvarar det upp till ",bu(e.potentialAnnualWaste)," kr/\xe5r. Vi r\xe4knar ingen besparing f\xf6rr\xe4n ni bekr\xe4ftat \u2014 siffror utan k\xe4lla visar vi aldrig."]}),(0,$c.jsxs)("form",{onSubmit:Ur,style:{display:"flex",gap:"8px",alignItems:"center",marginTop:"12px",flexWrap:"wrap"},children:[(0,$c.jsxs)("label",{htmlFor:"shelfware-exc",style:{fontSize:"13px",color:"#0E1A17"},children:["Hur m\xe5nga av de ",e.unverifiedGap," anv\xe4nds till annat?"]}),(0,$c.jsx)("input",{id:"shelfware-exc",type:"number",min:"0",max:e.unverifiedGap,inputMode:"numeric",value:wr,onChange:e=>Sr(e.target.value),placeholder:"0",style:{width:"72px",padding:"7px 9px",fontSize:"14px",border:"1px solid #BFD8D0",borderRadius:"8px",background:"#fff"}}),(0,$c.jsx)("button",{type:"submit",disabled:"submitting"===$r,style:{padding:"8px 16px",fontSize:"13px",fontWeight:600,color:"#fff",background:"#1B7A6E",border:"none",borderRadius:"8px",cursor:"pointer",opacity:"submitting"===$r?.6:1},children:"submitting"===$r?"R\xe4knar\u2026":"Bekr\xe4fta"})]}),"error"===$r&&(0,$c.jsx)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#B4341F"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}):null})(),(null===(jt=dn.recommendation)||void 0===jt?void 0:jt.fortnoxRightsizing)&&(()=>{const e=dn.recommendation.fortnoxRightsizing;return(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$c.jsxs)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:["R\xe4tt-storlek \u2014 ",e.vendor]}),(0,$c.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$c.jsxs)("strong",{children:[e.vendor," ",e.currentPaket]})," (",e.currentMonthly," kr/m\xe5n). Niv\xe5n under,"," ",(0,$c.jsx)("strong",{children:e.targetPaket})," (",e.targetMonthly," kr/m\xe5n), \xe4r ",e.deltaMonthly," kr/m\xe5n billigare."]}),(0,$c.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Ryms er anv\xe4ndning (moduler, antal anv\xe4ndare, verifikationsvolym) i ",e.targetPaket,"? D\xe5 realiserar vi upp till"," ",(0,$c.jsxs)("strong",{style:{color:"#1B7A6E"},children:[bu(e.annualSaving)," kr/\xe5r"]}),". Verifierad prisskillnad mot Fortnox publika listpris \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(wt=dn.recommendation)||void 0===wt?void 0:wt.m365Rightsizing)&&(()=>{const e=dn.recommendation.m365Rightsizing;return(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$c.jsx)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:"R\xe4tt-storlek \u2014 Microsoft 365 (r\xe5dgivning)"}),(0,$c.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$c.jsx)("strong",{children:e.currentLabel})," (",e.currentPerSeatLabel," kr/anv/m\xe5n) \u2014 full enterprise-svit."," ",(0,$c.jsx)("strong",{children:e.targetLabel})," (",e.targetPerSeatLabel," kr/anv/m\xe5n) ger Intune MDM + Defender, s\xe4kerheten de flesta SMF beh\xf6ver."]}),(0,$c.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Kr\xe4ver ni inte ",e.currentTier.toUpperCase(),":s enterprise-funktioner (compliance, eDiscovery)? D\xe5 realiserar vi upp till"," ",(0,$c.jsxs)("strong",{style:{color:"#1B7A6E"},children:[e.annualSavingLabel," kr/\xe5r"]})," f\xf6r era ",e.seats," anv\xe4ndare. Verifierad prisskillnad mot Microsofts publika listpris \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(St=dn.recommendation)||void 0===St?void 0:St.molnvaxel)&&(()=>{const e=dn.recommendation.molnvaxel,t=(e.addons||[]).filter(e=>null!=e.monthlyExVat),n=!e.bundled&&null!=e.teliaFloorLabel&&null!=e.teliaFloor,r=null!=e.overFloorPct&&e.overFloorPct>=30,a=Math.max(e.perUserMonthlyExVat||0,e.teliaFloor||0)||1,i=Math.max(6,Math.round((e.perUserMonthlyExVat||0)/a*100)),o=Math.max(6,Math.round((e.teliaFloor||0)/a*100));return(0,$c.jsxs)(df,{$over:r,children:[(0,$c.jsxs)("div",{className:"adv-top",children:[(0,$c.jsxs)("span",{className:"adv-eyebrow",children:["F\xf6retagsv\xe4xel \xb7 ",e.tierLabel,"-niv\xe5"]}),(0,$c.jsx)("span",{className:"adv-badge",children:"Verifierad referens"})]}),(0,$c.jsxs)("div",{className:"adv-figure",children:[e.perUserLabel," kr",(0,$c.jsxs)("span",{className:"unit",children:["per anv\xe4ndare/m\xe5n \xb7 exkl moms \xb7 ",e.seats," anv\xe4ndare"]})]}),n&&(0,$c.jsxs)("div",{className:"adv-compare",children:[(0,$c.jsxs)("div",{className:"adv-bar you",children:[(0,$c.jsx)("span",{className:"lbl",children:"Ni betalar"}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${i}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[e.perUserLabel," kr"]})]}),(0,$c.jsxs)("div",{className:"adv-bar floor",children:[(0,$c.jsx)("span",{className:"lbl",children:"Telia-golv"}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${o}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[e.teliaFloorLabel," kr"]})]})]}),e.bundled?(0,$c.jsx)("span",{className:"adv-pill neutral",children:"Buntat pris \u2014 j\xe4mf\xf6rs i genomg\xe5ng, inte mot golv"}):n?r?(0,$c.jsxs)("span",{className:"adv-pill warn",children:["~",e.overFloorPct," % \xf6ver Telias instegsgolv"]}):(0,$c.jsx)("span",{className:"adv-pill ok",children:"I niv\xe5 med marknadens instegsv\xe4xel"}):(0,$c.jsx)("span",{className:"adv-pill neutral",children:"Kontaktcenter \u2014 pris s\xe4tts via offert"}),(0,$c.jsx)("p",{className:"adv-prose",children:e.bundled?(0,$c.jsxs)($c.Fragment,{children:["Priset buntar v\xe4xel ",(0,$c.jsx)("strong",{children:"och"})," mobilabonnemang (inkl. surf) \u2014 inte direkt j\xe4mf\xf6rbart med en ren v\xe4xellicens. Vi j\xe4mf\xf6r mot ert faktiska pris i en genomg\xe5ng ist\xe4llet f\xf6r en missvisande siffra."]}):n?(0,$c.jsxs)($c.Fragment,{children:["Telia Smart Connect \u2014 marknadens instegsv\xe4xel f\xf6r motsvarande niv\xe5 \u2014 kostar ",(0,$c.jsxs)("strong",{children:["fr\xe5n ",e.teliaFloorLabel," kr/anv/m\xe5n"]})," (exkl moms)",r?(0,$c.jsx)($c.Fragment,{children:". Glappet \xe4r v\xe4rt en offertj\xe4mf\xf6relse."}):(0,$c.jsx)($c.Fragment,{children:". Ni ligger redan r\xe4tt \u2014 vi bevakar att det f\xf6rblir s\xe5."})]}):(0,$c.jsx)($c.Fragment,{children:"P\xe5 kontaktcenter-niv\xe5 s\xe4tter leverant\xf6rerna pris via offert \u2014 vi j\xe4mf\xf6r mot er faktiska kostnad i en genomg\xe5ng."})}),t.length>0&&(0,$c.jsxs)("p",{className:"adv-addons",children:["Ni betalar f\xf6r ",t.map(e=>`${e.label} (${e.monthlyExVat} kr/m\xe5n)`).join(", ")," \u2014 bekr\xe4fta att de anv\xe4nds, annars \xe4r det ren besparing."]}),(0,$c.jsx)("div",{className:"adv-foot",children:"Telias instegspris exkl moms verifierat mot telia.se. \u201dFr\xe5n\u201d-pris = golv; exakt j\xe4mf\xf6relse mot er bransch g\xf6rs n\xe4r underlaget r\xe4cker."})]})})(),(null===($t=dn.recommendation)||void 0===$t?void 0:$t.adobeRightsizing)&&(()=>{const e=dn.recommendation.adobeRightsizing;return(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$c.jsx)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:"R\xe4tt-storlek \u2014 Adobe Creative Cloud (r\xe5dgivning)"}),(0,$c.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$c.jsx)("strong",{children:e.currentLabel})," (",e.currentMonthlyLabel," ",e.unit," exkl moms) \u2014 hela sviten."," ","Anv\xe4nder era anv\xe4ndare i praktiken bara ",(0,$c.jsx)("strong",{children:"ett program"}),"? D\xe5 r\xe4cker ",(0,$c.jsx)("strong",{children:e.targetLabel})," (",e.targetMonthlyLabel," ",e.unit," exkl moms)."]}),(0,$c.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:[e.annualSavingLabel?(0,$c.jsxs)($c.Fragment,{children:["Bekr\xe4fta s\xe5 realiserar vi upp till ",(0,$c.jsxs)("strong",{style:{color:"#1B7A6E"},children:[e.annualSavingLabel," kr/\xe5r"]})," f\xf6r era ",e.seats," licenser. "]}):(0,$c.jsx)($c.Fragment,{children:"Bekr\xe4fta antal licenser s\xe5 r\xe4knar vi hem beloppet. "}),"Verifierad prisskillnad mot Adobes publika listpris (adobe.com/se) \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(Nt=dn.recommendation)||void 0===Nt?void 0:Nt.loneadminRightsizing)&&(()=>{const e=dn.recommendation.loneadminRightsizing,t=e.aboveFloor&&null!=e.overFloorPct&&e.overFloorPct>=15,n=Math.max(e.perEmployeeMonthly||0,e.floorPerEmployee||0)||1,r=Math.max(6,Math.round((e.perEmployeeMonthly||0)/n*100)),a=Math.max(6,Math.round((e.floorPerEmployee||0)/n*100));return(0,$c.jsxs)(df,{$over:t,children:[(0,$c.jsxs)("div",{className:"adv-top",children:[(0,$c.jsx)("span",{className:"adv-eyebrow",children:"L\xf6neadministration \xb7 per anst\xe4lld"}),(0,$c.jsx)("span",{className:"adv-badge",children:"Verifierad referens"})]}),(0,$c.jsxs)("div",{className:"adv-figure",children:[e.perEmployeeLabel," kr",(0,$c.jsxs)("span",{className:"unit",children:["per anst\xe4lld/m\xe5n \xb7 exkl moms \xb7 ",e.headcount," anst\xe4llda"]})]}),(0,$c.jsxs)("div",{className:"adv-compare",children:[(0,$c.jsxs)("div",{className:"adv-bar you",children:[(0,$c.jsx)("span",{className:"lbl",children:"Ni betalar"}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${r}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[e.perEmployeeLabel," kr"]})]}),(0,$c.jsxs)("div",{className:"adv-bar floor",children:[(0,$c.jsx)("span",{className:"lbl",children:"Fortnox-golv"}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${a}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[e.floorPerEmployeeLabel," kr"]})]})]}),e.alreadyFortnox?(0,$c.jsx)("span",{className:"adv-pill neutral",children:"Redan p\xe5 Fortnox L\xf6ns verifierade niv\xe5"}):t?(0,$c.jsxs)("span",{className:"adv-pill warn",children:["~",e.overFloorPct," % \xf6ver Fortnox-golvet"]}):(0,$c.jsx)("span",{className:"adv-pill ok",children:"I niv\xe5 med Fortnox-golvet"}),(0,$c.jsx)("p",{className:"adv-prose",children:e.alreadyFortnox?(0,$c.jsx)($c.Fragment,{children:"Ni ligger redan p\xe5 Fortnox L\xf6ns verifierade niv\xe5 \u2014 vi bevakar att det f\xf6rblir s\xe5."}):e.aboveFloor?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:e.fortnoxProduct})," \u2014 verifierat l\xe4gst \u2014 kostar 199 kr/m\xe5n + 25 kr/anst\xe4lld. Ryms er l\xf6nehantering (kollektivavtal, integrationer) d\xe4r? Bekr\xe4fta s\xe5 realiserar vi upp till ",(0,$c.jsxs)("strong",{children:[bu(e.annualSaving)," kr/\xe5r"]}),"."]}):(0,$c.jsx)($c.Fragment,{children:"Ni ligger i niv\xe5 med Fortnox L\xf6ns verifierade golv \u2014 ni ligger r\xe4tt, vi bevakar."})}),e.hasPayslip&&(0,$c.jsx)("p",{className:"adv-addons",children:"L\xf6nebesked-/utskicksavgifter (Kivra) \xe4r r\xf6rliga och ing\xe5r inte i golvj\xe4mf\xf6relsen."}),(0,$c.jsx)("div",{className:"adv-foot",children:"Fortnox L\xf6ns listpris exkl moms verifierat mot fortnox.se. Golvet \xe4r ett fast pris; exakt utfall beror p\xe5 om behovet ryms i Fortnox L\xf6n."})]})})(),(null===(_t=dn.recommendation)||void 0===_t?void 0:_t.reasoning)&&(Hr||va)&&(0,$c.jsxs)(yf,{children:[(0,$c.jsx)("span",{className:"kicker",children:Hr?"Vad vi hittade":"Kombinerad analys"}),(0,$c.jsx)("p",{children:Em(dn.categorized.category).isRealPrice?dn.recommendation.reasoning:If(dn.recommendation.reasoning,dn.recommendation.suggestedSupplier)})]}),"saas-productivity"===(null===(Et=dn.categorized)||void 0===Et?void 0:Et.category)&&(null!==(zt=null===(Ct=dn.recommendation)||void 0===Ct?void 0:Ct.tierOptimizationSaving)&&void 0!==zt?zt:0)>0&&(0,$c.jsxs)(wf,{children:[(0,$c.jsxs)("button",{className:"acc-trigger",onClick:()=>On(e=>!e),"aria-expanded":Fn,children:[(0,$c.jsx)("span",{className:"acc-icon",children:"\u26a1"}),(0,$c.jsxs)("span",{className:"acc-label-group",children:[(0,$c.jsx)("span",{className:"acc-label",children:"Licensoptimering"}),!Fn&&(0,$c.jsx)("span",{className:"acc-hint",children:"Klicka f\xf6r att se detaljer \u2192"})]}),(0,$c.jsxs)("span",{className:"acc-amount",children:["ytterligare +",Pf(null!==(At=dn.recommendation.tierOptimizationNetSaving)&&void 0!==At?At:0),"\xa0kr/\xe5r netto"]}),(0,$c.jsx)("span",{className:"acc-chevron"+(Fn?" open":""),children:(0,$c.jsx)(kp,{name:"chevron-right",size:16,stroke:2.5})})]}),Fn&&(0,$c.jsxs)("div",{className:"acc-body",children:[(0,$c.jsxs)("p",{className:"acc-intro",children:["Ni kan spara ytterligare"," ",(0,$c.jsxs)("strong",{children:[Pf(null!==(Dt=dn.recommendation.tierOptimizationNetSaving)&&void 0!==Dt?Dt:0),"\xa0kr/\xe5r netto"]})," ","(efter Arvos arvode om ",Pf(null!==(Ft=dn.recommendation.tierOptimizationFee)&&void 0!==Ft?Ft:0),"\xa0kr) genom att byta"," ","fr\xe5n\xa0",(0,$c.jsx)("strong",{children:null!==(Ot=Tf[dn.recommendation.tierOptimizationFromTier])&&void 0!==Ot?Ot:dn.recommendation.tierOptimizationFromTier})," ","till\xa0",(0,$c.jsx)("strong",{children:null!==(Tt=Tf[dn.recommendation.tierOptimizationToTier])&&void 0!==Tt?Tt:dn.recommendation.tierOptimizationToTier}),"."]}),(0,$c.jsxs)("div",{className:"acc-row",children:[(0,$c.jsx)("span",{className:"acc-row-icon",style:{color:"#1B7A6E"},children:(0,$c.jsx)(kp,{name:"check-circle",size:15,stroke:2.5})}),(0,$c.jsxs)("div",{className:"acc-row-content",children:[(0,$c.jsx)("div",{className:"acc-row-head keeps",children:"Vad ni beh\xe5ller"}),(0,$c.jsx)("p",{className:"acc-row-text",children:"Teams, Exchange, desktop Office, SharePoint, 1\xa0TB\xa0OneDrive/anv\xe4ndare"})]})]}),(0,$c.jsxs)("div",{className:"acc-row",children:[(0,$c.jsx)("span",{className:"acc-row-icon",style:{color:"#A8761A"},children:(0,$c.jsx)(kp,{name:"alert-triangle",size:15,stroke:2.5})}),(0,$c.jsxs)("div",{className:"acc-row-content",children:[(0,$c.jsx)("div",{className:"acc-row-head loses",children:"Vad ni tappar"}),(0,$c.jsx)("p",{className:"acc-row-text",children:"Intune MDM (centraliserad enhetshantering) och Defender for Business (endpoint-s\xe4kerhet)"})]})]}),(0,$c.jsxs)("p",{className:"acc-disclaimer",children:["Passar bolag utan aktiv MDM-policy eller externt hanterat s\xe4kerhetsansvar. \xc4r ni os\xe4kra \u2014 beh\xe5ll Premium och spara \xe4nd\xe5 ",Pf(null!==(Pt=dn.recommendation.netSaving)&&void 0!==Pt?Pt:0),"\xa0kr/\xe5r."]}),(0,$c.jsxs)("div",{className:"acc-combined",children:[(0,$c.jsx)("span",{className:"acc-combined-label",children:"Totalt om ni g\xf6r b\xe5da \xe5tg\xe4rderna"}),(0,$c.jsxs)("span",{className:"acc-combined-amount",children:["ca +",Pf((null!==(Lt=dn.recommendation.netSaving)&&void 0!==Lt?Lt:0)+(null!==(Rt=dn.recommendation.tierOptimizationNetSaving)&&void 0!==Rt?Rt:0)),"\xa0kr/\xe5r netto"]})]}),(0,$c.jsx)("div",{className:"acc-cta",children:(0,$c.jsx)(Bc,{as:vs,to:"/connect",$variant:"gradient",$size:"sm",children:"Inkludera i bytet \u2192"})})]})]})]})," "]}),Fa&&(0,$c.jsxs)(uf,{children:[(0,$c.jsx)("div",{className:"switch-eyebrow",children:"Arvo Switch"}),(0,$c.jsx)("h3",{children:"Priset \xe4r verifierat. Arvo f\xf6rbereder bytet."}),(0,$c.jsx)("p",{className:"sub",children:"Priset \xe4r leverant\xf6rens officiella avtalspris \u2014 verifierat och tillg\xe4ngligt utan f\xf6rhandling. Ni beh\xf6ver inte kontakta er nuvarande leverant\xf6r \u2014 Arvo f\xf6rbereder hela bytet."}),(0,$c.jsxs)("div",{className:"switch-steps",children:[(0,$c.jsxs)("div",{className:"switch-step",children:[(0,$c.jsx)("span",{className:"step-num",children:"1"}),(0,$c.jsxs)("span",{className:"step-body",children:[(0,$c.jsx)("span",{className:"step-title",children:"Ni aktiverar bytet"}),(0,$c.jsx)("span",{className:"step-detail",children:"Ett klick \u2014 Arvo tar det d\xe4rifr\xe5n."})]})]}),(0,$c.jsxs)("div",{className:"switch-step",children:[(0,$c.jsx)("span",{className:"step-num",children:"2"}),(0,$c.jsxs)("span",{className:"step-body",children:[(0,$c.jsx)("span",{className:"step-title",children:"Arvo f\xf6rbereder allt"}),(0,$c.jsx)("span",{className:"step-detail",children:"Fullmakt och bytesplan i er inkorg inom 24 timmar \u2014 ni granskar och signerar."})]})]}),(0,$c.jsxs)("div",{className:"switch-step",children:[(0,$c.jsx)("span",{className:"step-num",children:"3"}),(0,$c.jsxs)("span",{className:"step-body",children:[(0,$c.jsx)("span",{className:"step-title",children:"Nytt avtalspris aktivt"}),(0,$c.jsx)("span",{className:"step-detail",children:"Ni betalar 20\xa0% av den identifierade besparingen \u2014 inget annat."})]})]})]}),(0,$c.jsxs)("div",{className:"switch-offer",children:[(0,$c.jsxs)("div",{className:"switch-offer-head",children:[(0,$c.jsx)("span",{className:"switch-badge",children:(0,$c.jsx)(kp,{name:"check",size:13,stroke:2.5})}),(0,$c.jsxs)("div",{className:"switch-supplier",children:[(0,$c.jsx)("p",{className:"switch-supplier-name",children:Na?dn.recommendation.suggestedSupplier:Ea}),(0,$c.jsxs)("span",{className:"switch-price-label",children:[(0,$c.jsx)(kp,{name:"shield",size:10,stroke:2}),Na?"Verifierat listpris":"Arvo-verifierad leverant\xf6r"]})]})]}),(0,$c.jsxs)("div",{className:"switch-offer-body",children:[(0,$c.jsxs)("div",{className:"sp-from-row",children:[(0,$c.jsxs)("span",{className:"sp-old",children:[bu(ea),"/\xe5r"]}),(0,$c.jsx)("span",{className:"sp-from-arrow",children:"\u2192"})]}),(0,$c.jsxs)("span",{className:"sp-new",children:[Pf(dn.recommendation.suggestedAnnualCost),(0,$c.jsx)("small",{children:"kr/\xe5r"})]}),(0,$c.jsxs)("span",{className:"sp-save-note",children:["Ni sparar ",bu(ta),"/\xe5r \u2014 Arvo tar 20\xa0% av det"]})]})]}),(0,$c.jsxs)(Bc,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{Nn(Ln||""),En("idle"),Sn(!0)},children:[Da," ",(0,$c.jsx)(kp,{name:"arrow",size:16})]})]}),(0,$c.jsxs)(Ff,{children:[(0,$c.jsx)("div",{className:"eyebrow",children:"Arvo Intelligence"}),(0,$c.jsx)("h3",{children:"Det h\xe4r var en faktura."}),(0,$c.jsxs)("div",{className:"briefing-preview",children:[(0,$c.jsxs)("div",{className:"preview-header",children:[(0,$c.jsxs)("span",{children:[(0,$c.jsx)("span",{className:"preview-live-dot"}),(0,$c.jsx)("span",{className:"preview-brand-name",children:"Arvo Intelligence"})]}),(0,$c.jsx)("span",{className:"preview-time",children:"Exempel ur en briefing"})]}),(0,$c.jsxs)("div",{className:"signal",children:[(0,$c.jsx)("div",{className:"signal-ico",children:(0,$c.jsx)(kp,{name:"pulse",size:14,stroke:2})}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("span",{className:"signal-tag",children:"Smygh\xf6jningslarm"}),(0,$c.jsxs)("div",{className:"signal-line",children:["Telia \xb7 Mobilflotta 24 abonnemang",(0,$c.jsx)("span",{className:"signal-badge",children:"+11\xa0%"})]}),(0,$c.jsx)("p",{className:"signal-sub",children:"Pris h\xf6jt mot f\xf6reg\xe5ende period \u2014 utan avisering. S\xe5 h\xe4r ser larmet ut n\xe4r det h\xe4nder er."})]})]}),(0,$c.jsxs)("div",{className:"signal",children:[(0,$c.jsx)("div",{className:"signal-ico",children:(0,$c.jsx)(kp,{name:"benchmark",size:14,stroke:2})}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("span",{className:"signal-tag",children:"Community Benchmark"}),(0,$c.jsx)("div",{className:"bench-grid",children:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(e=>(0,$c.jsx)("span",{className:[0,2,3,5,8,9,11,13].includes(e)?"on":""},e))}),(0,$c.jsxs)("p",{className:"signal-sub",children:[(0,$c.jsx)("strong",{children:"8 av 15"})," bolag i samma kohort fick h\xf6jningen \u2014 Arvo ser m\xf6nstret innan det n\xe5r er."]})]})]}),(0,$c.jsxs)("div",{className:"signal",children:[(0,$c.jsx)("div",{className:"signal-ico",children:(0,$c.jsx)(kp,{name:"calendar-clock",size:14,stroke:2})}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("span",{className:"signal-tag",children:"Proaktiv avtalsbevakning"}),(0,$c.jsxs)("div",{className:"signal-line",children:["Avtalsbevakning \xb7 varnar 90 dagar f\xf6re f\xf6rnyelse",(0,$c.jsx)("span",{className:"signal-badge signal-badge--contract",children:"F\xf6rnyelse"})]}),(0,$c.jsx)("p",{className:"signal-sub",children:"Arvo varnar automatiskt \u2014 och f\xf6rbereder bytet p\xe5 er beg\xe4ran."})]})]})]}),(0,$c.jsxs)("div",{className:"price-row",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("span",{className:"price",children:"1 995 kr"}),(0,$c.jsx)("span",{className:"price-period",children:"/ m\xe5n"})]}),(0,$c.jsx)("span",{className:"price-note",children:"Ingen bindningstid"})]}),(0,$c.jsx)(Bc,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{gr(null!==Ln&&void 0!==Ln?Ln:""),vr("idle"),fr(!0)},children:"Aktivera Arvo Intelligence \u2192"}),(0,$c.jsx)("p",{style:{fontSize:12,color:"#8A9E98",textAlign:"center",marginTop:10,lineHeight:1.5},children:"Arvo s\xf6ker igenom er inkorg \u2014 ni beh\xf6ver inte lyfta ett finger."})]}),(0,$c.jsxs)(Of,{children:[(0,$c.jsx)("div",{className:"pb-eyebrow",children:"Helhetsbilden"}),(0,$c.jsx)("h2",{className:"pb-head",children:"Arvo bevakar \xe5tta kostnadskategorier. Den h\xe4r fakturan var en."}),(0,$c.jsx)("div",{className:"pb-grid",children:Mf.map(e=>{var t;const n=e.cats.includes(null===(t=dn.categorized)||void 0===t?void 0:t.category);return(0,$c.jsxs)("div",{className:"pb-seg"+(n?" lit":""),children:[(0,$c.jsx)("span",{className:"pb-seg-ico",children:(0,$c.jsx)(kp,{name:e.icon,size:20,stroke:1.8})}),(0,$c.jsx)("span",{className:"pb-seg-label",children:e.short})]},e.label)})}),(0,$c.jsxs)("div",{className:"pb-foot",children:[(0,$c.jsx)("p",{className:"pb-note",children:"En faktura s\xe4ger en sak. Hela reskontran s\xe4ger var ni faktiskt bl\xf6der. Vidarebefordra era leverant\xf6rsfakturor s\xe5 kartl\xe4gger Arvo varje leverant\xf6r \u2014 och hittar varenda besparing, inte bara den h\xe4r."}),(0,$c.jsxs)(vs,{to:"/portfolio",className:"pb-link",children:["Kartl\xe4gg er reskontra ",(0,$c.jsx)(kp,{name:"arrow",size:15,stroke:2})]})]})]}),(0,$c.jsx)("p",{style:{textAlign:"center",fontSize:12,color:"#8A9E98",marginBottom:8},children:"sent"===dr?(0,$c.jsx)("span",{style:{color:"#1B7A6E"},children:"\u2713 Noterat \u2014 vi justerar modellen"}):(0,$c.jsxs)($c.Fragment,{children:["Felklassificerad faktura?"," ",(0,$c.jsx)("button",{onClick:()=>(async e=>{if("idle"===dr){lr(e),cr("submitting");try{var t,n;await fetch("/api/feedback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fingerprint:await Rf().catch(()=>""),supplier:null===dn||void 0===dn||null===(t=dn.extracted)||void 0===t?void 0:t.supplier,category:null===dn||void 0===dn||null===(n=dn.categorized)||void 0===n?void 0:n.category,vote:e})})}catch{}cr("sent")}})("down"),disabled:"idle"!==dr,style:{background:"none",border:"none",padding:0,cursor:"pointer",fontSize:12,color:"#5C6E68",textDecoration:"underline",textUnderlineOffset:2,fontFamily:"inherit"},children:"Ber\xe4tta \u2192"})]})})]})]}),(0,$c.jsx)(vu,{}),An&&(0,$c.jsx)(vf,{children:(0,$c.jsxs)(bf,{children:["saving_limit"===Tn?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("h3",{children:["Ni har hittat er besparing \u2014 nu \xe4r det dags att ",(0,$c.jsx)("em",{children:"realisera"})," den."]}),(0,$c.jsx)("p",{className:"sub",children:"Arvo har identifierat besparingar i era fakturor. Koppla Fortnox eller Visma s\xe5 analyserar vi hela er leverant\xf6rsreskontra och sk\xf6ter varje byte \u2014 fr\xe5n upps\xe4gning till nytt avtal."})]}):"saving"===Tn?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{className:"gate-saving",children:[(0,$c.jsx)("span",{className:"gate-saving-label",children:"M\xf6jlig nettobesparing"}),(0,$c.jsxs)("span",{className:"gate-saving-amount",children:["+",bu(null!==(It=null===dn||void 0===dn||null===(Bt=dn.recommendation)||void 0===Bt?void 0:Bt.netSaving)&&void 0!==It?It:0)]}),(0,$c.jsxs)("span",{className:"gate-saving-context",children:[null===dn||void 0===dn||null===(Mt=dn.extracted)||void 0===Mt?void 0:Mt.supplier,null!==dn&&void 0!==dn&&null!==(Vt=dn.categorized)&&void 0!==Vt&&Vt.category?` \xb7 ${null!==(Ut=Em(dn.categorized.category).label)&&void 0!==Ut?Ut:dn.categorized.category}`:""]})]}),(0,$c.jsx)("p",{className:"sub",children:"Ange din e-post \u2014 vi skickar analysen direkt och en r\xe5dgivare kontaktar dig f\xf6r att realisera besparingen."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("h3",{children:["Redo att ",(0,$c.jsx)("em",{children:"g\xe5 vidare"}),"?"]}),(0,$c.jsx)("p",{className:"sub",children:"Koppla Fortnox / Visma f\xf6r en komplett analys av hela er leverant\xf6rsreskontra \u2014 Arvo sk\xf6ter varje byte fr\xe5n upps\xe4gning till nytt avtal."})]}),(0,$c.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),!Ln||In)return;Bn(!0);const t=Ln.trim().toLowerCase();if(localStorage.setItem("arvo_gate_email",t),"saving"===Tn){try{dn&&await Br(t)}catch{}Dn(!1),Bn(!1)}else Bn(!1),window.location.href="/connect"},children:[(0,$c.jsx)("input",{type:"email",placeholder:"din@epost.se",value:Ln,onChange:e=>Rn(e.target.value),required:!0,autoFocus:!0}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:In||!Ln,children:In?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(tf,{})," Skickar\u2026"]}):"saving"===Tn?(0,$c.jsxs)($c.Fragment,{children:["Skicka analysen ",(0,$c.jsx)(kp,{name:"arrow",size:16})]}):(0,$c.jsxs)($c.Fragment,{children:["Koppla Fortnox / Visma ",(0,$c.jsx)(kp,{name:"arrow",size:16})]})}),(0,$c.jsx)("p",{className:"fine-print",children:"saving"===Tn?"Ingen spam. Inga bindningstider. Ni betalar 20 % av den kontrakterade besparingen \u2014 dokumenterad i gammalt och nytt avtal, fakturerad f\xf6rst n\xe4r det nya avtalet b\xf6rjat g\xe4lla.":"Ingen spam. Inga fasta avgifter. Vi kontaktar dig bara om det finns besparingar att h\xe4mta."}),"saving_limit"===Tn&&(0,$c.jsx)("p",{className:"fine-print",style:{marginTop:"8px",fontStyle:"italic"},children:"Ni har provat Arvo. Nu l\xe5ter vi siffrorna tala \u2014 utan kostnad tills ni sparar."})]})]})}),wn&&dn&&(0,$c.jsx)(vf,{onClick:e=>{e.target===e.currentTarget&&Sn(!1)},children:(0,$c.jsxs)(bf,{children:[(0,$c.jsx)("button",{className:"close",onClick:()=>{Sn(!1)},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===_n?(0,$c.jsxs)("div",{className:"sent-state",children:[(0,$c.jsx)("span",{className:"sent-icon",children:(0,$c.jsx)(kp,{name:"check",size:20,stroke:2.5})}),(0,$c.jsx)("p",{className:"sent-title",children:Aa?"Optimeringen \xe4r aktiverad.":"Bytet \xe4r aktiverat."}),(0,$c.jsx)("p",{className:"sent-sub",children:"Arvo tar det h\xe4rifr\xe5n \u2014 ni h\xf6r av oss inom 48 timmar."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("p",{className:"bk-title",children:["Allt \xe4r f\xf6rberett.",(0,$c.jsx)("br",{}),"Er signatur aktiverar det."]}),(0,$c.jsxs)("div",{className:"bk-offer",children:[(0,$c.jsxs)("div",{className:"bk-offer-top",children:[(0,$c.jsx)("span",{className:"bk-partner-name",children:Na?dn.recommendation.suggestedSupplier:Ea}),(0,$c.jsxs)("span",{className:"bk-verified",children:[(0,$c.jsx)(kp,{name:"shield",size:10,stroke:2}),Na?"Verifierat listpris":"Arvo-verifierad leverant\xf6r"]})]}),(0,$c.jsxs)("div",{className:"bk-price-row",children:[(0,$c.jsxs)("span",{className:"bk-from",children:[bu(ea),"/\xe5r"]}),(0,$c.jsx)("span",{className:"bk-arrow",children:"\u2192"}),(0,$c.jsxs)("span",{className:"bk-to",children:[Pf(dn.recommendation.suggestedAnnualCost)," kr/\xe5r"]})]}),(0,$c.jsxs)("p",{className:"bk-savings-row",children:["Ni sparar ",bu(ta)," \xb7 Arvo ",bu(na)]})]}),Ln||$n?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("p",{className:"bk-email-confirm",children:["Bekr\xe4ftelse till: ",(0,$c.jsx)("strong",{children:Ln||$n})]}),(0,$c.jsx)(Bc,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===_n,onClick:Vr,children:"submitting"===_n?"Aktiverar\u2026":(0,$c.jsxs)($c.Fragment,{children:["Signera med BankID ",(0,$c.jsx)(kp,{name:"arrow",size:16})]})})]}):(0,$c.jsxs)("form",{className:"modal-form",onSubmit:Vr,children:[(0,$c.jsx)("input",{type:"email",placeholder:"din@epost.se",value:$n,onChange:e=>Nn(e.target.value),required:!0,autoFocus:!0}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===_n,children:"submitting"===_n?"Aktiverar\u2026":(0,$c.jsxs)($c.Fragment,{children:["Signera med BankID ",(0,$c.jsx)(kp,{name:"arrow",size:16})]})})]}),(0,$c.jsx)("p",{className:"bk-fine-print",children:"Du har 24 timmars \xe5ngerr\xe4tt."})]})]})}),Qn&&dn&&(0,$c.jsx)(vf,{onClick:e=>{e.target===e.currentTarget&&(Xn(!1),nr("idle"))},children:(0,$c.jsxs)(bf,{children:[(0,$c.jsx)("button",{className:"close",onClick:()=>{Xn(!1),nr("idle")},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===tr?(0,$c.jsxs)("div",{className:"sent-state",children:[(0,$c.jsx)("span",{className:"sent-icon",children:(0,$c.jsx)(kp,{name:"check",size:20,stroke:2.5})}),(0,$c.jsx)("p",{className:"sent-title",children:"Analysen \xe4r skickad!"}),(0,$c.jsxs)("p",{className:"sent-sub",children:["Vi har skickat analysen till ",Zn,"."]})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("h3",{children:["Ladda ner er ",(0,$c.jsx)("em",{children:"analys"})]}),(0,$c.jsx)("p",{className:"sub",children:"Ange er e-post s\xe5 skickar vi en sammanfattning av analysen direkt till er inkorg."}),(0,$c.jsxs)("div",{className:"context-badge",children:[dn.extracted.supplier," \xb7 ",Em(null===(Kt=dn.categorized)||void 0===Kt?void 0:Kt.category).label]}),(0,$c.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),Zn&&"idle"===tr){nr("submitting");try{await Br(Zn),nr("sent")}catch{nr("error")}}},children:[(0,$c.jsx)("input",{type:"email",placeholder:"din@epost.se",value:Zn,onChange:e=>er(e.target.value),required:!0,autoFocus:!0}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===tr,children:"submitting"===tr?"Skickar\u2026":(0,$c.jsxs)($c.Fragment,{children:["Skicka analysen ",(0,$c.jsx)(kp,{name:"arrow",size:16})]})}),"error"===tr&&(0,$c.jsx)("p",{className:"fine-print",style:{color:"red"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$c.jsx)("p",{className:"fine-print",children:"Ingen spam. Vi skickar analysen direkt till din inkorg."})]})]})]})}),mr&&(0,$c.jsx)(vf,{onClick:e=>{e.target===e.currentTarget&&fr(!1)},children:(0,$c.jsxs)(kf,{children:[(0,$c.jsx)("button",{className:"ac-close",onClick:()=>fr(!1),"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===xr?(0,$c.jsxs)("div",{className:"ac-success",children:[(0,$c.jsx)("div",{className:"ac-check",children:"\u2713"}),(0,$c.jsx)("h3",{children:"Briefing p\xe5 v\xe4g"}),(0,$c.jsx)("p",{className:"ac-email-sent",children:hr||Ln}),(0,$c.jsxs)("p",{className:"ac-success-sub",children:["Er Arvo Intelligence-briefing f\xf6r ",null!==(Ht=null===dn||void 0===dn||null===(Wt=dn.extracted)||void 0===Wt?void 0:Wt.supplier)&&void 0!==Ht?Ht:"er leverant\xf6r"," \xe4r skickad. Koppla er inkorg s\xe5 bevakar Arvo alla era leverant\xf6rsfakturor l\xf6pande."]}),(0,$c.jsx)("span",{className:"ac-upgrade-label",children:"Koppla er inkorg"}),(0,$c.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(hr||Ln)}`,className:"ac-oauth-btn",style:{marginBottom:9,display:"flex"},children:[(0,$c.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$c.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$c.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$c.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(hr||Ln)}`,className:"ac-oauth-btn",style:{display:"flex"},children:[(0,$c.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$c.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$c.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$c.jsx)("p",{className:"ac-privacy",children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("div",{className:"ac-eyebrow",children:"Arvo Intelligence"}),(0,$c.jsx)("h2",{className:"ac-heading",children:"Arvo s\xf6ker igenom er inkorg"}),(0,$c.jsx)("p",{className:"ac-sub",children:"Koppla Gmail eller Outlook \u2014 Arvo s\xf6ker er inkorg efter leverant\xf6rsfakturor och skickar er f\xf6rsta fullst\xe4ndiga briefing inom en timme."}),(0,$c.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(hr||Ln)}`,className:"ac-oauth-btn",children:[(0,$c.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$c.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$c.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$c.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(hr||Ln)}`,className:"ac-oauth-btn",children:[(0,$c.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$c.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$c.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$c.jsx)("div",{className:"ac-divider",children:"eller b\xf6rja nu"}),(0,$c.jsxs)("form",{onSubmit:async e=>{var t,n,r,a,i,o;e.preventDefault();const s=hr.trim()||Ln.trim();if(!s||"submitting"===xr)return;vr("submitting");const l=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(!e)return"";const n=e.match(/[^.!?]+[.!?]+/g)||[];return 0===n.length?e.length>200?e.slice(0,200).trimEnd()+"\u2026":e:n.slice(0,t).join(" ").trim()}(null!==dn&&void 0!==dn&&null!==(t=dn.categorized)&&void 0!==t&&t.category&&Em(dn.categorized.category).isRealPrice?null!==(n=null===dn||void 0===dn||null===(r=dn.recommendation)||void 0===r?void 0:r.reasoning)&&void 0!==n?n:"":If(null!==(a=null===dn||void 0===dn||null===(i=dn.recommendation)||void 0===i?void 0:i.reasoning)&&void 0!==a?a:"",null===dn||void 0===dn||null===(o=dn.recommendation)||void 0===o?void 0:o.suggestedSupplier));try{var d,c,u,p;if(!(await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,supplier:null===dn||void 0===dn||null===(d=dn.extracted)||void 0===d?void 0:d.supplier,normalizedSupplier:null===dn||void 0===dn||null===(c=dn.categorized)||void 0===c?void 0:c.normalizedSupplier,category:null===dn||void 0===dn||null===(u=dn.categorized)||void 0===u?void 0:u.category,annualCost:ea,suggestedAnnualCost:null===dn||void 0===dn||null===(p=dn.recommendation)||void 0===p?void 0:p.suggestedAnnualCost,grossSaving:ta,netSaving:ra,arvoFee:na,reasoning:l,diagScore:ua,diagLabel:null===pa||void 0===pa?void 0:pa.label,diagInsight:ya})})).ok)throw new Error;vr("sent")}catch{vr("error")}},children:[(0,$c.jsxs)("div",{className:"ac-email-row",children:[(0,$c.jsx)("input",{className:"ac-email-input",type:"email",placeholder:"er@foretag.se",value:hr||Ln,onChange:e=>gr(e.target.value),required:!0,autoComplete:"email"}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"md",disabled:"submitting"===xr,style:{flexShrink:0},children:"submitting"===xr?"\u2026":"Skicka \u2192"})]}),"error"===xr&&(0,$c.jsx)("p",{style:{fontSize:12,color:"#C41E1E",marginTop:8},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$c.jsx)("p",{className:"ac-privacy",children:"Vi skickar er f\xf6rsta Intelligence-briefing omedelbart \u2014 baserad p\xe5 denna analys. Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})]})})]})},Jf=[[/\btelia\b/i,"Telia"],[/\btele\s*2\b/i,"Tele2"],[/\btelenor\b/i,"Telenor"],[/(?:^|\s)tre(?:\s|$)|\btre\s+f[\xf6o]retag\b/i,"Tre"],[/\bmicrosoft\b/i,"Microsoft"],[/\bgoogle\b/i,"Google"],[/\badobe\b/i,"Adobe"],[/\bdustin\b/i,"Dustin"]];function Qf(e){return function(e){const t=String(e||"").trim();if(!t)return"Ok\xe4nd leverant\xf6r";for(const[n,r]of Jf)if(n.test(t))return r;return t}(e.normalized_supplier||e.supplier)}function Xf(e){var t,n;if("monitoring"===e.route)return 72;if(null!=e.health_score&&Number.isFinite(Number(e.health_score))){var r;const t=Number(e.health_score);return e.should_switch&&(null!==(r=e.net_saving)&&void 0!==r?r:0)>0?Math.min(t,79):t}const a=null!==(t=e.gross_saving)&&void 0!==t?t:null!=e.net_saving?e.net_saving/.8:0;if(!e.should_switch||!e.annual_cost||!(a>0))return e.annual_cost>0?75:50;const i=Math.round(a/e.annual_cost*100),o=Math.max(5,Math.round(100-1.5*i));return(null!==(n=e.net_saving)&&void 0!==n?n:0)>0?Math.min(o,79):o}const Zf=vc.div`
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  margin: 0 0 20px; padding: 11px 16px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.dossier.bgRaised}};

  .ab-who { display: inline-flex; align-items: center; gap: 9px; min-width: 0;
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 12.5px; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}}; }
  .ab-who b { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; font-weight: 600; overflow: hidden; text-overflow: ellipsis; }
  .ab-dot { width: 7px; height: 7px; border-radius: 50%; background: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; flex-shrink: 0; }
  button.ab-out {
    flex-shrink: 0; background: none; cursor: pointer; font-size: 12.5px; padding: 6px 12px;
    color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}}; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    transition: color .15s, border-color .15s;
    &:hover { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; border-color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; }
  }

  form { display: flex; gap: 8px; flex: 1 1 320px; flex-wrap: wrap; }
  .ab-k { flex-basis: 100%; font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10px; letter-spacing: .2em;
    text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; }
  input {
    flex: 1 1 200px; min-width: 0; padding: 9px 13px; font-size: 14px;
    background: ${e=>{let{theme:t}=e;return t.dossier.bg}}; color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}}; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    outline: none; &:focus { border-color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; }
    &::placeholder { color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; }
  }
  button.ab-in {
    flex: 0 0 auto; padding: 9px 16px; font-size: 14px; font-weight: 600; cursor: pointer; border: none;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    background: ${e=>{let{theme:t}=e;return t.dossier.tealBright}}; color: ${e=>{let{theme:t}=e;return t.dossier.bg}};
    &:disabled { opacity: .5; cursor: default; }
  }
  .ab-msg { flex-basis: 100%; font-size: 12.5px; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}}; }
`;function eh(e){let{email:t,onLogout:n}=e;const[a,i]=(0,r.useState)(""),[o,s]=(0,r.useState)(!1),[l,d]=(0,r.useState)(!1);if(t)return(0,$c.jsxs)(Zf,{children:[(0,$c.jsxs)("span",{className:"ab-who",children:[(0,$c.jsx)("span",{className:"ab-dot"}),"Inloggad som ",(0,$c.jsx)("b",{children:t})]}),(0,$c.jsx)("button",{className:"ab-out",onClick:n,children:"Logga ut"})]});return(0,$c.jsx)(Zf,{children:(0,$c.jsxs)("form",{onSubmit:async function(e){e.preventDefault();const t=a.trim();if(t&&!l){d(!0);try{await fetch("/api/auth/request-magic-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,dest:"portfolio"})}),s(!0)}catch{s(!0)}finally{d(!1)}}},children:[(0,$c.jsx)("div",{className:"ab-k",children:"Redan kund?"}),o?(0,$c.jsxs)("p",{className:"ab-msg",children:["Kolla er inkorg \u2014 en inloggningsl\xe4nk \xe4r p\xe5 v\xe4g till ",(0,$c.jsx)("b",{children:a.trim()}),". Den \xf6ppnar ert kontor p\xe5 vilken enhet som helst."]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("input",{type:"email",inputMode:"email",autoComplete:"email",placeholder:"Logga in med er f\xf6retagsmejl",value:a,onChange:e=>i(e.target.value),disabled:l}),(0,$c.jsx)("button",{className:"ab-in",type:"submit",disabled:l||!a.trim(),children:l?"Skickar\u2026":"Skicka l\xe4nk"})]})]})})}const th=wc.font.mono,nh=wc.font.display,rh=jc`from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); }`,ah=jc`to { transform: rotate(360deg); }`,ih=(jc`0%,100% { opacity:.25; } 50% { opacity:1; }`,jc`0%,100% { opacity:.6; } 50% { opacity:1; }`),oh=(jc`0% { background-position:-200% 0; } 100% { background-position:200% 0; }`,function(){return hc`opacity:0; animation:${rh} .7s ${arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}s cubic-bezier(0.16,1,0.3,1) forwards;`}),sh=vc.main`
  min-height: 100vh;
  background: ${wc.dossier.bg};
  font-family: ${wc.font.sans};
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow: hidden;
  /* Materialskiktet (premium-lyftet 2026-07-13): kornet gör ytan till ett FÖREMÅL, inte en div.
     Subtilt nog att kännas snarare än ses — kornets egen opacitet bor i SVG:n (0.04). */
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E"), ${wc.dossier.aurora};
    pointer-events: none;
  }
  &::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: ${wc.dossier.keyline}; opacity: .85;
  }
`,lh=vc.div`
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 22px 90px;
  @media (min-width: 768px) { padding: 56px 32px 120px; }
`,dh=(vc.div`
  position: relative; z-index: 2;
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${th}; font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
  color: ${wc.dossier.faintOnDark};
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: ${wc.size.radius.pill};
  padding: 6px 14px; margin-bottom: 28px;
  span.dot { width: 5px; height: 5px; border-radius: 50%; background: ${wc.dossier.tealBright}; }
`,vc.div`
  display: flex; align-items: flex-start; justify-content: space-between; gap: 28px;
  ${oh(0)}
  @media (max-width: 820px) { flex-direction: column; gap: 22px; }
`),ch=vc.div`
  .brand {
    font-family: ${th}; font-size: 11px; font-weight: 600;
    letter-spacing: .40em; text-indent: .40em; color: ${wc.dossier.tealBright};
    margin-bottom: 16px;
  }
  .confidential {
    font-family: ${th}; font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark}; margin-bottom: 18px;
  }
  h1 {
    font-family: ${nh}; font-weight: 700; line-height: 1.02; letter-spacing: -.03em;
    font-size: clamp(40px, 7vw, 62px); margin: 0;
    color: ${wc.dossier.inkOnDark};
    background: ${wc.dossier.metallicText};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
`,uh=vc.div`
  flex-shrink: 0; width: 300px; max-width: 100%;
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: ${wc.size.radius.lg};
  background: ${wc.dossier.bgRaised};
  padding: 18px 20px;
  @media (max-width: 820px) { width: 100%; }

  /* Urtavlan (premium-lyftet 2026-07-13): svepet är stort nog att BÄRA tidsstämpeln i centrum —
     den verkliga tidpunkten ur vakt_events blir instrumentets nav, inte en fotnot. */
  .radar-head { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 16px; }
  .disc { position: relative; width: 118px; height: 118px; flex-shrink: 0; }
  .disc svg { position: absolute; inset: 0; }
  .disc .sweep {
    position: absolute; inset: 0; border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(93,214,202,.0) 270deg, rgba(93,214,202,.45) 360deg);
    animation: ${ah} 3.2s linear infinite;
    mask: radial-gradient(circle, #000 62%, transparent 63%);
    -webkit-mask: radial-gradient(circle, #000 62%, transparent 63%);
  }
  @media (prefers-reduced-motion: reduce) { .disc .sweep { animation: none; opacity: .35; } }
  .dial-center {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 3px;
    .dial-time { font-family: ${th}; font-size: 19px; color: ${wc.dossier.inkOnDark}; font-feature-settings: 'tnum'; }
    .dial-k { font-family: ${th}; font-size: 7.5px; letter-spacing: .24em; text-transform: uppercase; color: ${wc.dossier.faintOnDark}; }
  }
  .radar-title {
    font-family: ${th}; font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
    color: ${wc.dossier.mutedOnDark}; line-height: 1.5; text-align: center;
    strong { color: ${wc.dossier.inkOnDark}; display: block; letter-spacing: .14em; }
  }
  /* Minimal separation (variant C): två namngivna grupper i SAMMA kort — era avtal vs marknaden.
     Hårfin men SYNLIG mono-etikett (faintOnDark, inte osynlig) så de två sanningarna aldrig blandas. */
  .rgroup-label { font-family: ${th}; font-size: 9.5px; letter-spacing: .2em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark}; margin-bottom: 9px; }
  .radar-stats { display: flex; flex-direction: column; gap: 7px; }
  .rstat {
    display: flex; align-items: baseline; justify-content: space-between;
    font-size: 12px; color: ${wc.dossier.mutedOnDark};
    span.v { font-family: ${th}; color: ${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; }
  }
  .radar-foot {
    margin-top: 16px; padding-top: 14px; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    display: flex; flex-direction: column; align-items: flex-start;
    font-size: 12px; color: ${wc.dossier.inkOnDark};
    .foot-line { display: flex; align-items: baseline; gap: 8px; line-height: 1.5;
      b { color: ${wc.dossier.inkOnDark}; font-weight: 600; } }
    .live { flex-shrink: 0; transform: translateY(2px); width: 7px; height: 7px; border-radius: 50%;
      background: ${wc.dossier.tealBright}; box-shadow: ${wc.dossier.glow}; animation: ${ih} 2.4s ease-in-out infinite; }
  }
`,ph=vc.section`
  margin-top: 30px; padding: 34px 0 4px;
  border-top: 1px solid ${wc.dossier.hairlineOnDark};
  ${oh(.08)}

  .eyebrow {
    font-family: ${th}; font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: ${wc.dossier.teal}; margin-bottom: 18px;
    display: flex; align-items: center; gap: 12px;
  }
  .eyebrow::after { content:''; flex:1; height:1px; background:${wc.dossier.hairlineOnDark}; }

  h2 {
    font-family: ${nh}; font-weight: 600; letter-spacing: -.02em;
    font-size: clamp(30px, 5vw, 48px); line-height: 1.08; margin: 0 0 20px;
    max-width: 20ch; color: ${wc.dossier.inkOnDark};
  }
  h2 em { font-style: normal; color: ${wc.dossier.tealBright}; }

  p.work {
    font-size: 16px; line-height: 1.7; color: ${wc.dossier.mutedOnDark};
    max-width: 56ch; margin: 0 0 22px;
    b { color: ${wc.dossier.inkOnDark}; font-weight: 600; }
  }
`,mh=vc.span`
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${th}; font-size: 11px; letter-spacing: .04em;
  color: ${wc.dossier.mutedOnDark};
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: ${wc.size.radius.pill};
  padding: 7px 14px;
  .pct { color: ${wc.dossier.tealBright}; font-weight: 600; }
`,fh=vc.div`
  margin-top: 40px;
  display: grid; gap: 18px;
  grid-template-columns: minmax(0,1fr);
  ${oh(.16)}
  @media (min-width: 880px) { grid-template-columns: 1.25fr 1fr; }
`,hh=hc`
  position: relative;
  background: ${wc.dossier.bgRaised};
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: ${wc.size.radius.lg};
  padding: 26px 26px 24px;
`,gh=vc.div`
  ${hh}
  grid-column: ${e=>{let{$full:t}=e;return t?"1 / -1":"auto"}};

  .card-eyebrow {
    font-family: ${th}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wc.dossier.teal}; margin-bottom: 16px;
    display: flex; align-items: center; justify-content: space-between;
    .src { color: ${wc.dossier.faintOnDark}; letter-spacing: .12em; }
  }
`,xh=vc(gh)`
  overflow: hidden;
  &::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(ellipse 380px 200px at 88% 0%, rgba(43,196,172,.10), transparent 70%);
  }
  h3 {
    font-family: ${nh}; font-weight: 600; font-size: clamp(21px, 2.6vw, 27px);
    line-height: 1.22; letter-spacing: -.01em; margin: 0 0 22px; max-width: 26ch;
    color: ${wc.dossier.inkOnDark};
    em { font-style: normal; color: ${wc.dossier.tealBright}; }
  }
  .bars { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
  .barrow {
    display: grid; grid-template-columns: 130px 1fr auto; align-items: center; gap: 14px;
    font-size: 13px; color: ${wc.dossier.mutedOnDark};
    @media (max-width: 480px) { grid-template-columns: 96px 1fr auto; gap: 10px; font-size: 12px; }
    .lbl { white-space: nowrap; }
    .track { height: 8px; border-radius: ${wc.size.radius.pill};
      background: rgba(255,255,255,.06); overflow: hidden; }
    .fill { height: 100%; border-radius: inherit; }
    .amt { font-family: ${th}; font-feature-settings:'tnum'; color: ${wc.dossier.inkOnDark};
      white-space: nowrap; }
    &.you .lbl { color: ${wc.dossier.tealBright}; font-weight: 600; }
    &.you .fill { background: ${wc.dossier.numberGradient}; box-shadow: 0 0 14px rgba(93,214,202,.4); }
    &:not(.you) .fill { background: rgba(255,255,255,.22); }
  }
  .truth-note { font-size: 13px; line-height: 1.6; color: ${wc.dossier.mutedOnDark};
    padding-top: 16px; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    b { color: ${wc.dossier.inkOnDark}; } }
`,vh=vc(gh)`
  display: flex; flex-direction: column;
  .idx-main { display: flex; align-items: flex-end; gap: 14px; margin-bottom: 6px; }
  .idx-num {
    font-family: ${th}; font-weight: 700; font-size: 72px; line-height: .9;
    letter-spacing: -.04em; font-feature-settings:'tnum';
    background: ${wc.dossier.numberGradient};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .idx-denom { font-family: ${th}; font-size: 22px; font-weight: 500; letter-spacing: -.02em;
    color: ${wc.dossier.faintOnDark}; padding-bottom: 8px; }
  .idx-delta {
    font-family: ${th}; font-size: 13px; color: ${wc.dossier.tealBright};
    padding-bottom: 10px; margin-left: auto; text-align: right;
    .d { display:block; } .dl { color: ${wc.dossier.faintOnDark}; font-size:11px; letter-spacing:.1em; }
  }
  .spark { display: flex; align-items: flex-end; gap: 4px; height: 34px; margin: 12px 0 18px; }
  .spark span { flex: 1; border-radius: 2px 2px 0 0; background: rgba(255,255,255,.14); }
  .spark span.hot { background: ${wc.dossier.numberGradient}; }

  /* Marknadsläge — under / i nivå / över marknaden */
  .mkt-k { font-family: ${th}; font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark}; margin-bottom: 9px; }
  .mkt-track {
    position: relative; height: 6px; border-radius: ${wc.size.radius.pill};
    background: linear-gradient(90deg, rgba(159,217,206,.16), rgba(255,255,255,.08) 50%, rgba(43,196,172,.30));
    margin-bottom: 9px;
  }
  .mkt-ptr {
    position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%;
    background: ${wc.dossier.tealBright}; box-shadow: ${wc.dossier.glow};
    transform: translate(-50%, -50%);
  }
  .mkt-scale { display: flex; justify-content: space-between;
    font-family: ${th}; font-size: 9.5px; letter-spacing: .08em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark};
    .on { color: ${wc.dossier.tealBright}; } }
  .idx-note { font-size: 12.5px; line-height: 1.6; color: ${wc.dossier.mutedOnDark};
    margin-top: 16px; b { color: ${wc.dossier.inkOnDark}; } }
`,bh=vc(gh)`
  .cal-row {
    display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px;
    padding: 16px 0; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
    @media (max-width: 480px) { grid-template-columns: auto 1fr; gap: 10px 12px; }
  }
  .cal-prob {
    font-family: ${th}; font-size: 15px; font-weight: 600; font-feature-settings:'tnum';
    color: ${wc.dossier.tealBright};
    width: 52px; text-align: right;
    @media (max-width: 480px) { grid-row: 1 / 3; }
  }
  .cal-body {
    .t { font-size: 14.5px; color: ${wc.dossier.inkOnDark}; font-weight: 600; margin-bottom: 3px; }
    .s { font-size: 12.5px; color: ${wc.dossier.mutedOnDark}; line-height: 1.45; }
  }
  .cal-when {
    font-family: ${th}; font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark}; white-space: nowrap;
    @media (max-width: 480px) { grid-column: 2; text-align: left; }
  }
`,kh=vc(gh)`
  .rcpt {
    display: grid; grid-template-columns: 70px 1fr; gap: 14px; align-items: baseline;
    padding: 13px 0; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
  }
  .rcpt .day { font-family: ${th}; font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
    color: ${wc.dossier.teal}; }
  .rcpt .what { font-size: 13.5px; line-height: 1.5; color: ${wc.dossier.mutedOnDark};
    b { color: ${wc.dossier.inkOnDark}; font-weight: 600; } }
`,yh=vc(gh)`
  display: flex; flex-direction: column; justify-content: center;
  background: linear-gradient(150deg, ${wc.dossier.bgRaised} 0%, rgba(23,138,123,.16) 100%);
  .tally-k { font-family: ${th}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wc.dossier.teal}; margin-bottom: 14px; }
  .tally-num { font-family: ${nh}; font-weight: 600; font-size: clamp(36px, 6vw, 52px);
    line-height: 1; letter-spacing: -.02em; margin-bottom: 10px;
    background: ${wc.dossier.metallicText};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    small { font-family: ${wc.font.sans}; font-size: 16px; color: ${wc.dossier.mutedOnDark};
      font-weight: 400; margin-left: 6px; -webkit-text-fill-color: ${wc.dossier.mutedOnDark}; } }
  .tally-sub { font-size: 14px; line-height: 1.55; color: ${wc.dossier.mutedOnDark};
    b { color: ${wc.dossier.inkOnDark}; } }
`,jh=vc.section`
  margin-top: 40px; padding-top: 28px; border-top: 1px solid ${wc.dossier.hairlineOnDark};
  ${oh(.24)}
  .h-eyebrow { font-family: ${th}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wc.dossier.teal}; margin-bottom: 18px; }
  .h-row {
    display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 18px;
    padding: 14px 0; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
    @media (max-width: 560px) { grid-template-columns: 1fr auto; gap: 6px 12px; }
  }
  .h-name { color: ${wc.dossier.inkOnDark}; font-size: 14.5px; font-weight: 600; }
  .h-cat { font-size: 12px; color: ${wc.dossier.faintOnDark}; }
  .h-cost { font-family: ${th}; font-size: 13.5px; color: ${wc.dossier.mutedOnDark};
    font-feature-settings:'tnum'; white-space: nowrap;
    @media (max-width:560px){ grid-column:2; grid-row:1; } }
  .h-state { font-family: ${th}; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase;
    white-space: nowrap; padding: 4px 10px; border-radius: ${wc.size.radius.pill};
    border: 1px solid ${wc.dossier.hairlineOnDark};
    &.opt { color: ${wc.dossier.tealBright}; }
    &.watch { color: ${wc.dossier.mutedOnDark}; }
    @media (max-width:560px){ grid-column:2; } }
`,wh=vc.div`
  margin-top: 56px; text-align: center;
  .keyline { height: 1px; background: ${wc.dossier.keyline}; opacity: .5; margin-bottom: 22px; }
  .mark { font-family: ${th}; font-size: 11px; letter-spacing: .36em; text-indent: .36em;
    color: ${wc.dossier.faintOnDark}; }
  .tagline { font-family: ${nh}; font-style: italic; font-size: 16px;
    color: ${wc.dossier.mutedOnDark}; margin-top: 14px; }
`,Sh=vc.div`
  border-top: 1px solid ${wc.dossier.hairlineOnDark};
  &:first-of-type { border-top: none; }
`,$h=vc.button`
  width:100%; background:none; border:none; cursor:pointer; text-align:left;
  display:grid; grid-template-columns:auto 1fr auto auto auto; align-items:center; gap:16px;
  padding:15px 0; color:inherit; transition:opacity .15s;
  &:hover { opacity:.82; }
  @media (max-width: 760px){ grid-template-columns:auto 1fr auto; gap:8px 12px; padding:14px 0; }

  .h-name { color:${wc.dossier.inkOnDark}; font-size:15px; font-weight:600; letter-spacing:-.005em;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .h-cat { font-size:12px; color:${wc.dossier.faintOnDark}; margin-top:2px; }
  .h-cost { font-family:${th}; font-size:13.5px; color:${wc.dossier.mutedOnDark};
    font-feature-settings:'tnum'; white-space:nowrap;
    @media (max-width:760px){ grid-column:2; grid-row:1; text-align:right; } }
  .h-badge { font-family:${th}; font-size:13px; letter-spacing:.06em;
    white-space:nowrap; padding:5px 11px; border-radius:${wc.size.radius.pill};
    border:1px solid ${wc.dossier.hairlineOnDark};
    /* sparbadgen bär ett tal (kr/år) → aldrig versaler; statusord versaliseras */
    &.save { color:${wc.dossier.bg}; background:${wc.dossier.tealBright}; border-color:transparent; font-weight:600; font-feature-settings:'tnum'; }
    &.watch { color:${wc.dossier.mutedOnDark}; text-transform:uppercase; }
    /* pillen högerställs under kostnaden → kostnad + pill bildar en ren högerkolumn (i linje) */
    @media (max-width:760px){ grid-column:2; grid-row:2; justify-self:end; } }
  .h-chev { color:${wc.dossier.faintOnDark}; display:flex; transition:transform .22s ease;
    transform:${e=>{let{$open:t}=e;return t?"rotate(180deg)":"none"}};
    @media (max-width:760px){ grid-column:3; grid-row:1 / 3; } }
`,Nh=vc.div`
  position:relative; width:42px; height:42px; flex-shrink:0;
  span.v { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    font-family:${th}; font-size:15px; font-weight:700; font-feature-settings:'tnum'; }
`,_h=vc.div`
  padding:6px 0 24px; animation:${rh} .28s ease both;
  display:flex; flex-direction:column; gap:18px;

  /* Arvo bedömer — bara omdömet (score-ringen bor i radhuvudet, ej dubblerad) */
  .diag { padding:0 2px; }
  .diag .dbody .dtop { font-family:${th}; font-size:10px; letter-spacing:.18em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:8px; }
  .diag .dbody .dtxt { font-size:14px; line-height:1.6; color:${wc.dossier.mutedOnDark};
    max-width:64ch; b { color:${wc.dossier.inkOnDark}; } }

  /* Faktatabell — råa tal, varje en gång */
  .facts { display:flex; flex-direction:column; gap:0;
    border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .fact { display:flex; justify-content:space-between; align-items:baseline; gap:14px;
    padding:10px 0; border-bottom:1px solid ${wc.dossier.hairlineOnDark}; font-size:13px;
    dt { color:${wc.dossier.mutedOnDark}; }
    dd { font-family:${th}; color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; margin:0; } }
`,Eh=(vc.div`
  border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.md};
  background: linear-gradient(160deg, rgba(43,196,172,.10), rgba(23,138,123,.04));
  padding:18px 20px; display:flex; flex-direction:column;

  .si-k { font-family:${th}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:14px; }
  .si-steps { display:flex; flex-direction:column; gap:14px; margin-bottom:18px; }
  .si-step { display:flex; gap:12px; align-items:flex-start; }
  .si-n { flex-shrink:0; width:22px; height:22px; border-radius:50%;
    border:1.5px solid ${wc.dossier.teal}; color:${wc.dossier.tealBright};
    font-family:${th}; font-size:11px; font-weight:600; display:flex; align-items:center; justify-content:center; }
  .si-body { display:flex; flex-direction:column; gap:2px; }
  .si-t { display:block; font-size:13px; color:${wc.dossier.inkOnDark}; font-weight:600; line-height:1.3; }
  .si-d { display:block; font-size:12px; color:${wc.dossier.mutedOnDark}; line-height:1.45; }
  .si-offer { display:flex; align-items:baseline; gap:8px; margin-bottom:6px;
    padding-top:16px; border-top:1px solid ${wc.dossier.hairlineOnDark}; flex-wrap:wrap;
    .old { font-family:${th}; font-size:13px; color:${wc.dossier.faintOnDark};
      text-decoration:line-through; }
    .arr { color:${wc.dossier.faintOnDark}; }
    .new { font-family:${th}; font-size:20px; font-weight:700; font-feature-settings:'tnum';
      color:${wc.dossier.tealBright}; }
    .new small { font-family:${wc.font.sans}; font-size:12px; font-weight:400;
      color:${wc.dossier.mutedOnDark}; margin-left:3px; } }
  .si-save { font-size:12.5px; color:${wc.dossier.mutedOnDark}; line-height:1.5; margin-bottom:16px;
    b { color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; } }
`,vc.div`
  border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.md};
  background:${wc.dossier.bgRaised}; padding:18px 20px; margin-bottom:14px;
  display:flex; flex-direction:column;

  .st-k { font-family:${th}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:14px; }
  .st-alt { padding:12px 0; border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .st-alt:first-of-type { border-top:none; padding-top:0; }
  .st-sup { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:14px; font-weight:600;
    color:${wc.dossier.inkOnDark}; margin-bottom:3px; }
  .st-tag { font-family:${th}; font-size:9px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.bg}; background:${wc.dossier.teal}; border-radius:${wc.size.radius.sm};
    padding:2px 7px; }
  .st-pos { font-size:12.5px; color:${wc.dossier.mutedOnDark}; line-height:1.5; }
  .st-src { margin-top:14px; padding-top:12px; border-top:1px solid ${wc.dossier.hairlineOnDark};
    font-size:11.5px; color:${wc.dossier.faintOnDark}; line-height:1.55;
    b { color:${wc.dossier.mutedOnDark}; } }
`,hc`
  .sv-upload { display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;
    font-size:13px; font-weight:600; color:${wc.dossier.teal};
    border:1px dashed rgba(43,196,172,.45); border-radius:${wc.size.radius.pill}; padding:11px 18px;
    transition:background .15s, border-color .15s;
    &:hover { background:rgba(43,196,172,.08); border-color:${wc.dossier.tealBright}; }
    input { display:none; } }
  .sv-upload-note { margin:10px 2px 0; font-size:12px; line-height:1.5;
    &.done { color:${wc.dossier.tealBright}; }
    &.work { color:${wc.dossier.faintOnDark}; }
    &.fail { color:${wc.dossier.signal}; } }
`),zh=vc.div`
  position:relative; border:1px solid ${wc.dossier.hairlineOnDark};
  border-radius:${wc.size.radius.md}; overflow:hidden;
  background: radial-gradient(560px 260px at 8% -22%,
      ${e=>{let{$known:t}=e;return t?"rgba(43,196,172,0.10)":"rgba(224,162,60,0.09)"}}, transparent 60%),
    ${wc.dossier.bgRaised};
  padding:22px 22px 18px; display:flex; flex-direction:column;

  .sv-eyebrow { display:flex; align-items:center; gap:9px; font-family:${th}; font-size:10px;
    letter-spacing:.26em; text-transform:uppercase; color:${wc.dossier.faintOnDark}; margin-bottom:15px; }
  .sv-dot { flex-shrink:0; width:6px; height:6px; border-radius:50%;
    background:${e=>{let{$known:t}=e;return t?wc.dossier.teal:wc.dossier.signal}};
    box-shadow:0 0 0 4px ${e=>{let{$known:t}=e;return t?"rgba(43,196,172,0.13)":"rgba(224,162,60,0.13)"}},
      0 0 12px ${e=>{let{$known:t}=e;return t?wc.dossier.tealBright:wc.dossier.signal}}; }
  .sv-dom { font-family:${nh}; font-weight:500; font-size:clamp(20px,2.6vw,25px); line-height:1.22;
    letter-spacing:-.01em; color:${wc.dossier.inkOnDark}; margin-bottom:13px;
    em { font-style:normal; color:${e=>{let{$known:t}=e;return t?wc.dossier.teal:wc.dossier.tealBright}}; } }
  .sv-support { font-size:13.5px; line-height:1.62; color:${wc.dossier.mutedOnDark}; margin:0;
    b { color:${wc.dossier.inkOnDark}; } }

  .sv-proof { margin-top:12px; border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .sv-proof > summary { list-style:none; cursor:pointer; font-family:${th}; font-size:10px;
    letter-spacing:.2em; text-transform:uppercase; color:${wc.dossier.teal};
    padding:13px 0 0; display:flex; align-items:center; }
  .sv-proof > summary::-webkit-details-marker { display:none; }
  .sv-proof > summary::after { content:'+'; margin-left:auto; font-size:15px; line-height:1;
    color:${wc.dossier.faintOnDark}; }
  .sv-proof[open] > summary::after { content:'\\2013'; }
  .sv-proof-body { padding-top:4px; }
  .sv-sec { padding:13px 0 2px; border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .sv-sec:first-child { border-top:none; }
  .sv-lbl { font-family:${th}; font-size:9.5px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; margin-bottom:8px; }
  .sv-alt { margin-bottom:8px; }
  .sv-sup { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:13.5px; font-weight:600;
    color:${wc.dossier.inkOnDark}; }
  .sv-tag { font-family:${th}; font-size:9px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.bg}; background:${wc.dossier.teal}; border-radius:${wc.size.radius.sm}; padding:2px 7px; }
  .sv-pos { display:block; font-size:12px; color:${wc.dossier.mutedOnDark}; line-height:1.5; margin-top:3px; }
  .sv-fine { margin-top:6px; font-size:11.5px; color:${wc.dossier.faintOnDark}; line-height:1.5;
    b { color:${wc.dossier.mutedOnDark}; } }
  .sv-note { font-size:12.5px; line-height:1.6; color:${wc.dossier.mutedOnDark}; margin:2px 0 0; }
  .sv-row { display:flex; justify-content:space-between; align-items:baseline; padding:7px 0; gap:14px;
    & > span:first-child { font-size:12.5px; color:${wc.dossier.mutedOnDark}; display:flex; flex-direction:column; }
    small { font-size:10.5px; color:${wc.dossier.faintOnDark}; margin-top:2px; } }
  .sv-v { font-family:${th}; font-size:13px; color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; white-space:nowrap; }
  .sv-keep .sv-v { font-size:15px; color:${wc.dossier.tealBright}; }

  .sv-act { margin-top:18px; display:flex; flex-direction:column; gap:11px; }
  ${Eh}
`,Ch=vc.div`
  margin-top:16px; padding:18px;
  border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.md};
  background: radial-gradient(480px 220px at 10% -20%, rgba(43,196,172,0.07), transparent 60%);
  .al-eyebrow { display:flex; align-items:center; justify-content:space-between; gap:8px;
    font-family:${th}; font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:12px;
    span { color:${wc.dossier.faintOnDark}; letter-spacing:.08em; text-transform:none; } }
  .al-facts { display:flex; flex-wrap:wrap; gap:6px 14px; margin-bottom:14px;
    font-size:12px; color:${wc.dossier.mutedOnDark};
    b { color:${wc.dossier.inkOnDark}; font-weight:600; } }
  .al-deadline { padding:12px 14px; border:1px solid rgba(43,196,172,.28);
    border-radius:${wc.size.radius.sm}; margin-bottom:12px;
    font-size:13px; color:${wc.dossier.mutedOnDark}; line-height:1.5;
    .al-date { font-family:${th}; font-size:15px; color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; }
    .al-days { font-family:${th}; color:${wc.dossier.tealBright}; }
    &.akut .al-days { color:${wc.dossier.signal}; }
    &.lugn { border-color:rgba(43,196,172,.45); } }
  .al-larm { margin:0 0 8px; font-size:12.5px; line-height:1.6; color:${wc.dossier.signal};
    b { font-weight:700; } }
  .al-actions { display:flex; gap:8px; margin:4px 0 10px; flex-wrap:wrap;
    .al-btn { flex:1; min-width:150px; cursor:pointer; font-size:12.5px; font-weight:600;
      color:${wc.dossier.mutedOnDark}; background:none;
      border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.pill};
      padding:11px 16px; transition:border-color .15s, color .15s;
      &:hover { border-color:${wc.dossier.teal}; color:${wc.dossier.inkOnDark}; }
      &:disabled { opacity:.5; cursor:default; }
      &.primary { color:#06231d; border:none;
        background:linear-gradient(135deg, ${wc.dossier.tealBright}, ${wc.dossier.teal}); } } }
  .al-angra { display:block; cursor:pointer; background:none; border:none; padding:0; margin-top:4px;
    font-family:${th}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; text-align:left;
    &:hover { color:${wc.dossier.teal}; } }
  .al-falla, .al-motdrag { margin:0 0 8px; font-size:12.5px; line-height:1.6;
    color:${wc.dossier.mutedOnDark};
    b { color:${wc.dossier.inkOnDark}; font-weight:600; } }
  .al-citat { margin-top:12px;
    summary { cursor:pointer; font-family:${th}; font-size:10.5px; letter-spacing:.14em;
      text-transform:uppercase; color:${wc.dossier.faintOnDark};
      &:hover { color:${wc.dossier.teal}; } }
    .al-c { margin:10px 0 0; padding-left:12px; border-left:2px solid ${wc.dossier.hairlineOnDark};
      font-size:11.5px; line-height:1.55; color:${wc.dossier.faintOnDark};
      i { font-style:normal; color:${wc.dossier.mutedOnDark}; }
      small { display:block; font-family:${th}; font-size:9.5px; letter-spacing:.12em;
        text-transform:uppercase; color:${wc.dossier.faintOnDark}; margin-bottom:2px; } } }
  ${Eh}
  .sv-upload { margin-top:14px; }
`,Ah=vc.div`
  margin-top:16px; padding:16px 18px;
  border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.md};
  .au-eyebrow { font-family:${th}; font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; margin-bottom:8px; }
  .au-txt { margin:0 0 12px; font-size:12.5px; line-height:1.55; color:${wc.dossier.mutedOnDark}; }
  ${Eh}
`,Dh=vc.section`
  margin-top:40px;
  .w-eyebrow { font-family:${th}; font-size:11px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; padding-bottom:14px; border-bottom:1px solid ${wc.dossier.hairlineOnDark}; }
  .w-manifesto { margin:16px 0 22px; font-size:14px; line-height:1.65; color:${wc.dossier.mutedOnDark};
    max-width:64ch; b { color:${wc.dossier.inkOnDark}; font-weight:700; } }
  .w-row { padding:18px 0; border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .w-row:first-of-type { border-top:none; }
  .w-top { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px; }
  .w-sup { font-size:15px; font-weight:600; color:${wc.dossier.inkOnDark}; }
  .w-kind { font-family:${th}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; border:1px solid ${wc.dossier.hairlineOnDark};
    border-radius:${wc.size.radius.sm}; padding:3px 8px; white-space:nowrap; }
  .w-head { font-family:${wc.font.display}; font-size:17px; font-weight:600; line-height:1.3;
    color:${wc.dossier.inkOnDark}; margin-bottom:7px; }
  .w-detail { margin:0 0 10px; font-size:13px; line-height:1.6; color:${wc.dossier.mutedOnDark}; max-width:68ch; }
  .w-list { font-family:${th}; font-size:12px; letter-spacing:.02em; color:${wc.dossier.faintOnDark};
    margin-bottom:10px; line-height:1.7; }
  .w-action { font-size:12.5px; color:${wc.dossier.teal}; display:flex; gap:7px; align-items:baseline;
    .w-arrow { font-family:${th}; } }
`,Fh=vc.a`
  display:flex; align-items:center; justify-content:center; gap:8px;
  text-decoration:none; cursor:pointer;
  font-size:14px; font-weight:600; color:${wc.dossier.bg};
  background:${wc.dossier.ctaGradient}; box-shadow:${wc.dossier.ctaShadow};
  border-radius:${wc.size.radius.pill}; padding:13px 20px; border:none;
  transition:transform .15s ease, filter .15s ease;
  &:hover { transform:translateY(-1px); filter:brightness(1.05); }
`,Oh=vc.div`
  margin-top:40px; padding:30px 0 4px; border-top:1px solid ${wc.dossier.hairlineOnDark};
  ${oh(.1)}
  .iq-k { font-family:${th}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:14px; }
  h3 { font-family:${nh}; font-weight:600; font-size:clamp(22px,3.2vw,30px); line-height:1.16;
    letter-spacing:-.02em; margin:0 0 14px; max-width:24ch; color:${wc.dossier.inkOnDark};
    em { font-style:normal; color:${wc.dossier.tealBright}; } }
  p { font-size:15px; line-height:1.65; color:${wc.dossier.mutedOnDark}; max-width:54ch; margin:0 0 22px;
    b { color:${wc.dossier.inkOnDark}; } }
  .iq-row { display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
  /* Priset gömmer sig aldrig — krispig off-white som poppar ur mörkret */
  .iq-price { font-family:${th}; font-size:19px; font-weight:600; letter-spacing:-.01em;
    color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum';
    span { color:${wc.dossier.mutedOnDark}; font-size:12.5px; font-weight:400; letter-spacing:0; } }
`,Th=vc.div`
  width:30px; height:30px; border:3px solid ${wc.dossier.hairlineOnDark};
  border-top-color:${wc.dossier.tealBright}; border-radius:50%;
  animation:${ah} .8s linear infinite; margin:120px auto;
`,Ph=(vc.div`
  margin-top:34px; padding-top:28px; border-top:1px solid ${wc.dossier.hairlineOnDark};
  ${oh(.06)}
  .cm-eyebrow { font-family:${th}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:16px; }
  .cm-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px;
    @media (max-width:600px){ grid-template-columns:repeat(2,1fr); } }
  .cm-cell { position:relative; border:1px solid ${wc.dossier.hairlineOnDark};
    border-radius:${wc.size.radius.md}; padding:14px 15px 15px;
    display:flex; flex-direction:column; gap:9px; background:${wc.dossier.bgRaised}; }
  .cm-cell.hot { border-color:rgba(43,196,172,.42);
    background:linear-gradient(155deg, rgba(43,196,172,.11), rgba(23,138,123,.03));
    box-shadow:0 0 0 1px rgba(43,196,172,.10); }
  .cm-top { display:flex; align-items:center; justify-content:space-between; min-height:24px; }
  .cm-ico { color:${wc.dossier.faintOnDark}; display:flex; }
  .cm-cell.hot .cm-ico { color:${wc.dossier.tealBright}; }
  .cm-label { font-size:13.5px; font-weight:600; color:${wc.dossier.mutedOnDark}; letter-spacing:-.005em; line-height:1.2; }
  .cm-cell.hot .cm-label { color:${wc.dossier.inkOnDark}; }
  .cm-hint { font-size:11px; color:${wc.dossier.faintOnDark}; letter-spacing:.01em; }
  .cm-tag { font-family:${th}; font-size:8.5px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; border:1px solid rgba(43,196,172,.4);
    border-radius:${wc.size.radius.pill}; padding:3px 8px; white-space:nowrap; }
  .cm-tag.offert { color:${wc.dossier.faintOnDark}; border-color:${wc.dossier.hairlineOnDark}; }
  .cm-verified { font-family:${th}; font-size:9px; letter-spacing:.07em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; margin-top:1px; }
`,vc.div`
  margin-top:20px; display:grid; gap:18px; grid-template-columns:1fr 1fr;
  ${oh(.12)}
  @media (max-width:760px){ grid-template-columns:1fr; }
  .door { position:relative; border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.lg};
    background:${wc.dossier.bgRaised}; padding:24px 24px 22px; display:flex; flex-direction:column; }
  /* Vidarebefordra ÄR moaten (bulk 50–100 fakturor). Den rekommenderade dörren bär hjälte-vikt:
     hot teal-ton + glöd, medan upload förblir den lugna sekundär-dörren (grundarbeslut 2026-07-01). */
  .door.primary { border-color:rgba(43,196,172,.42);
    background:linear-gradient(155deg, rgba(43,196,172,.10), rgba(23,138,123,.03));
    box-shadow:0 0 0 1px rgba(43,196,172,.10); }
  .door-k { font-family:${th}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:12px; display:flex; align-items:center; gap:9px; }
  .door-tag { font-family:${th}; font-size:8.5px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.bg}; background:${wc.dossier.teal}; border-radius:${wc.size.radius.pill};
    padding:3px 8px; }
  .door h4 { font-family:${nh}; font-weight:600; font-size:18px; letter-spacing:-.01em;
    color:${wc.dossier.inkOnDark}; margin:0 0 8px; }
  .door p { font-size:13px; line-height:1.55; color:${wc.dossier.mutedOnDark}; margin:0 0 16px; }
  .door .spacer { flex:1; }
  /* Trygghet vid själva överlämnandet av data — Zero Trust betyder mest här (grundarbeslut 2026-07-01) */
  .door-trust { margin:11px 0 0; font-size:11.5px; line-height:1.5; color:${wc.dossier.faintOnDark};
    display:flex; gap:8px; align-items:baseline;
    .dt-ico { flex-shrink:0; color:${wc.dossier.teal}; transform:translateY(2px); }
    b { color:${wc.dossier.mutedOnDark}; font-weight:600; } }
`),Lh=vc.p`
  margin: 18px 2px 0; font-size: 13px; line-height: 1.6; color: ${wc.dossier.faintOnDark};
  b { color: ${wc.dossier.mutedOnDark}; font-weight: 600; }
`,Rh=vc.button`
  width:100%; display:flex; align-items:center; justify-content:space-between; gap:12px;
  font-family:${th}; font-size:14px; letter-spacing:.01em; color:${wc.dossier.tealBright};
  background:rgba(43,196,172,.06); border:1px dashed rgba(43,196,172,.45);
  border-radius:${wc.size.radius.md}; padding:13px 16px; text-align:left; cursor:pointer;
  transition:background .15s, border-color .15s;
  &:hover { background:rgba(43,196,172,.12); border-color:${wc.dossier.tealBright}; }
  &.copied { border-style:solid; border-color:${wc.dossier.tealBright}; }
  .ac-addr { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .ac-copy { flex-shrink:0; display:inline-flex; align-items:center; gap:6px;
    font-family:${th}; font-size:10px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; }
  &.copied .ac-copy { color:${wc.dossier.tealBright}; }
`,Ih=vc.label`
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
  border:1.5px dashed rgba(43,196,172,.38); border-radius:${wc.size.radius.md};
  padding:26px 18px; cursor:pointer; text-align:center;
  background:rgba(43,196,172,.04); transition:border-color .15s, background .15s;
  &:hover, &.over { border-color:${wc.dossier.tealBright}; background:rgba(43,196,172,.10); }
  &.over { box-shadow:0 0 0 1px ${wc.dossier.tealBright}; }
  .dz-ico { color:${wc.dossier.tealBright}; }
  .dz-t { font-size:14px; font-weight:600; color:${wc.dossier.inkOnDark}; }
  .dz-s { font-size:12px; color:${wc.dossier.mutedOnDark}; }
  input { display:none; }
`,Bh=vc.div`
  margin-top:14px; display:flex; flex-direction:column; gap:7px;
  .dp-row { display:flex; align-items:center; justify-content:space-between; gap:12px;
    font-size:12.5px; color:${wc.dossier.mutedOnDark}; }
  .dp-name { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; }
  .dp-stat { font-family:${th}; font-size:11px; letter-spacing:.06em; white-space:nowrap; }
  .dp-stat.done { color:${wc.dossier.tealBright}; }
  .dp-stat.work { color:${wc.dossier.faintOnDark}; }
  .dp-stat.fail { color:#E06A4D; }
  .dp-note { margin-top:6px; font-size:12px; color:${wc.dossier.faintOnDark}; line-height:1.5; }
`,Mh=vc.div`
  margin-top:24px; display:flex; align-items:center; gap:14px;
  padding:15px 18px; border:1px solid ${wc.dossier.hairlineOnDark};
  border-radius:${wc.size.radius.md}; ${oh(.18)}
  .ft-ico { color:${wc.dossier.faintOnDark}; flex-shrink:0; display:flex; }
  .ft-txt { flex:1; font-size:13px; line-height:1.5; color:${wc.dossier.mutedOnDark};
    b { color:${wc.dossier.inkOnDark}; } }
  .ft-soon { font-family:${th}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; border:1px solid rgba(43,196,172,.4);
    border-radius:${wc.size.radius.pill}; padding:5px 11px; white-space:nowrap; }
`,Vh=vc.section`
  margin-top:26px; padding:22px 24px; border:1px solid ${wc.dossier.hairlineOnDark};
  border-radius:${wc.size.radius.lg}; background:${wc.dossier.bgRaised}; ${oh(.16)}
  .mi-k { font-family:${th}; font-size:10px; letter-spacing:.22em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; }
  .mi-h { margin:10px 0 4px; font-family:${wc.font.display}; font-weight:600;
    font-size:clamp(18px,2.6vw,22px); line-height:1.25; color:${wc.dossier.inkOnDark}; }
  .mi-p { margin:0 0 16px; font-size:13.5px; line-height:1.6; color:${wc.dossier.mutedOnDark}; }
  .mi-grid { display:grid; gap:14px; grid-template-columns:1fr 1fr; align-items:start; }
  @media (max-width:760px){ .mi-grid { grid-template-columns:1fr; } }
  .mi-or { font-size:12px; color:${wc.dossier.faintOnDark}; margin:0 0 8px; }
`,Uh=vc.div`
  margin-top:18px; padding-top:16px; border-top:1px solid ${wc.dossier.hairlineOnDark};
  .u-k { font-family:${th}; font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; margin-bottom:12px; }
  .u-rad { display:grid; grid-template-columns:1fr auto auto; gap:8px 14px; align-items:baseline;
    padding:7px 0; border-bottom:1px solid rgba(255,255,255,.04); font-size:13px; }
  .u-rad:last-of-type { border-bottom:none; }
  .u-txt { color:${wc.dossier.mutedOnDark}; }
  .u-spec { font-family:${th}; font-size:11.5px; color:${wc.dossier.faintOnDark}; white-space:nowrap; }
  .u-bel { font-family:${th}; font-size:13px; font-feature-settings:'tnum';
    color:${wc.dossier.inkOnDark}; white-space:nowrap; text-align:right; }
  /* Summeringen är kvittot: kunden ska kunna följa raderna ned till talet i rubriken. */
  .u-summa { display:grid; grid-template-columns:1fr auto; gap:14px; align-items:baseline;
    margin-top:10px; padding-top:10px; border-top:1px solid ${wc.dossier.hairlineOnDark};
    font-size:13px; color:${wc.dossier.mutedOnDark}; }
  .u-summa.total .u-bel, .u-summa.total { color:${wc.dossier.inkOnDark}; font-weight:600; }
  .u-not { margin:12px 0 0; font-size:12px; line-height:1.55; color:${wc.dossier.faintOnDark}; }
  .u-utanfor { margin-top:16px; padding-top:14px; border-top:1px dashed ${wc.dossier.hairlineOnDark}; }
  @media (max-width:480px){ .u-rad { grid-template-columns:1fr auto; } .u-spec { grid-column:1 / -1; } }
`,Kh=e=>new Promise((t,n)=>{const r=new FileReader;r.onload=()=>{const e=String(r.result||"");t(e.includes(",")?e.split(",")[1]:e)},r.onerror=()=>n(new Error("Kunde inte l\xe4sa filen")),r.readAsDataURL(e)});function Hh(e,t,n){switch(e){case 429:return["Dagskvot n\xe5dd",t||"Ni har n\xe5tt max antal fria analyser idag \u2014 f\xf6rs\xf6k igen imorgon eller aktivera ert konto."];case 504:return["Tog f\xf6r l\xe5ng tid","Analysen hann inte klart i tid. V\xe4nta en stund och f\xf6rs\xf6k igen."];case 401:return["Sessionen l\xf6pte ut","Ladda om sidan och f\xf6rs\xf6k igen."+(n?` (orsak: ${n})`:"")];case 413:return["Filen f\xf6r stor",t||"PDF:en \xf6verstiger maxstorleken \u2014 komprimera eller dela upp den."];case 400:return["Kunde inte l\xe4sas",t||"Filen gick inte att tolka som en faktura. Kontrollera att det \xe4r en PDF-faktura."];case 404:return["Tj\xe4nsten n\xe5s inte h\xe4r","\xd6ppna ert kontor via arvoflow.se s\xe5 fungerar analysen."];case 500:case 502:case 503:return["Tillf\xe4lligt serverfel","N\xe5got gick fel p\xe5 v\xe5r sida \u2014 f\xf6rs\xf6k igen om en stund."];default:return["Misslyckades",t||`Servern svarade ${e||"ov\xe4ntat"}.`]}}const Wh=new Set(["gmail.com","hotmail.com","outlook.com","yahoo.com","yahoo.se","icloud.com","live.com","msn.com","me.com","proton.me","protonmail.com"]);async function qh(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}const Gh="arvo_fp_override";const Yh="faktura@inbox.arvoflow.se",Jh=e=>null==e?"\u2013":Math.round(e).toLocaleString("sv-SE"),Qh=e=>e?new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"short"}):"",Xh=e=>e.toLocaleDateString("sv-SE",{month:"long",year:"numeric"}),Zh={per_user_month:"kr/anv./m\xe5n",per_subscription_month:"kr/abonn./m\xe5n",ore_per_kwh:"\xf6re/kWh"},eg={"ramavtal-stat":"statliga ramavtal","ramavtal-kommun":"kommunala ramavtal","reskontra-kommun":"kommunal leverant\xf6rsreskontra",upphandling:"offentliga upphandlingar",eurostat:"officiell statistik (Eurostat/SCB)"},tg=e=>null==e?"\u2013":Number(e).toLocaleString("sv-SE",{maximumFractionDigits:2});function ng(e){return e<45?"#E06A4D":e<65?"#E0A23C":e<80?"#5DD6CA":"#2BC4AC"}const rg=17;function ag(e){let{score:t,size:n=42,r:r=rg,sw:a=3.2}=e;const i=2*Math.PI*r,o=ng(t);return(0,$c.jsxs)("svg",{width:n,height:n,viewBox:`0 0 ${n} ${n}`,children:[(0,$c.jsx)("circle",{cx:n/2,cy:n/2,r:r,fill:"none",stroke:"rgba(255,255,255,.12)",strokeWidth:a}),(0,$c.jsx)("circle",{cx:n/2,cy:n/2,r:r,fill:"none",stroke:o,strokeWidth:a,strokeLinecap:"round",strokeDasharray:`${t/100*i} ${i}`,style:{transform:"rotate(-90deg)",transformOrigin:"center",transition:"stroke-dasharray 1s ease"}})]})}function ig(e){var t,n;const r=Em(e.category),a=(null!==(t=null===r||void 0===r?void 0:r.label)&&void 0!==t?t:e.category).toLowerCase();if("monitoring"===e.route)return"Avtalet \xe4r tidsbegr\xe4nsat. Arvo bevakar och f\xf6rbereder bytet inf\xf6r f\xf6rnyelsen \u2014 ni betalar konkurrenskraftigt till dess.";if("review_queue"===e.route)return"Kategorin kr\xe4ver manuell granskning \u2014 Arvo inh\xe4mtar offert f\xf6r exakt prisj\xe4mf\xf6relse. Ni kontaktas n\xe4r det \xe4r klart.";if(e.should_switch&&(null!==(n=e.net_saving)&&void 0!==n?n:0)>0){const t=e.annual_cost>0&&e.suggested_annual_cost>0?Math.round((e.annual_cost-e.suggested_annual_cost)/e.annual_cost*100):0;return t>=10?`Ni betalar <b>${t}% mer</b> \xe4n verifierat marknadspris f\xf6r ${a}. Arvo rekommenderar byte \u2014 det l\xe4gre priset finns f\xf6rberett nedan.`:`Ni betalar ${t>0?`${t}% mer`:"n\xe5got mer"} \xe4n verifierat marknadspris f\xf6r ${a} \u2014 ett litet gap. Ett l\xe4gre avtalspris finns att s\xe4kra om ni vill, men ingen br\xe5dska; avv\xe4rjt \xe4r \xe4nd\xe5 avv\xe4rjt.`}return`Priset \xe4r konkurrenskraftigt mot verifierat marknadspris f\xf6r ${a}. Inget byte rekommenderas i dag \u2014 dela en ny faktura vid n\xe4sta avtalsperiod s\xe5 kontrollerar Arvo igen.`}function og(){var e,t,n,a;const[i,o]=(0,r.useState)(null),[s,l]=(0,r.useState)(null),[d,c]=(0,r.useState)({}),[u,p]=(0,r.useState)({}),[m,f]=(0,r.useState)({}),[h,g]=(0,r.useState)({}),[x,v]=(0,r.useState)({}),[b,k]=(0,r.useState)({}),[y,j]=(0,r.useState)([]),[w,S]=(0,r.useState)(null),[$,N]=(0,r.useState)(0),[_,E]=(0,r.useState)(0),[z,C]=(0,r.useState)([]),[A,D]=(0,r.useState)(0),[F,O]=(0,r.useState)(!1),[T,P]=(0,r.useState)(null),[L,R]=(0,r.useState)(new Set),[I,B]=(0,r.useState)(""),[M,V]=(0,r.useState)([]),[U,K]=(0,r.useState)(!1),[H,W]=(0,r.useState)(""),[q,G]=(0,r.useState)(!1),[Y,J]=(0,r.useState)(!1),[Q,X]=(0,r.useState)(!1),[Z,ee]=(0,r.useState)({}),[te,ne]=(0,r.useState)(""),[re,ae]=(0,r.useState)(null),[ie,oe]=(0,r.useState)(!1),[se,le]=(0,r.useState)(""),[de,ce]=(0,r.useState)(0),[ue,pe]=(0,r.useState)(!1),me=(0,r.useMemo)(()=>new URLSearchParams(window.location.search).get("magic"),[]),{email:fe,sessionToken:he,logout:ge}=Ac(),xe=(0,r.useCallback)(async e=>{var t,n,r,a,i,s,d,u,m,h,x,b,y;const w=new URLSearchParams;if(he)w.set("session",he);else{const t=e||I||await qh();t&&w.set("fingerprint",t)}me&&w.set("magic",me);const $=await fetch(`/api/invoice-history?${w.toString()}`);if(!$.ok){const e=await $.json().catch(()=>null);throw new Error((null===e||void 0===e?void 0:e.message)||`Kunde inte h\xe4mta ert kontor just nu (HTTP ${$.status}).`)}const _=await $.json();o(null!==(t=_.analyses)&&void 0!==t?t:[]),l(null!==(n=_.email)&&void 0!==n?n:null),c(null!==(r=_.cohort)&&void 0!==r?r:{}),p(null!==(a=_.publicBench)&&void 0!==a?a:{}),f(null!==(i=_.forecasts)&&void 0!==i?i:{}),g(null!==(s=_.branchAnchors)&&void 0!==s?s:{}),v(null!==(d=_.movements)&&void 0!==d?d:{}),k(null!==(u=_.switchTargets)&&void 0!==u?u:{}),j(null!==(m=_.watched)&&void 0!==m?m:[]),S(null!==(h=_.vakt)&&void 0!==h?h:null),N(null!==(x=_.ingesting)&&void 0!==x?x:0),E(null!==(b=_.ingestFailed)&&void 0!==b?b:0),C(null!==(y=_.ingestFailedFiles)&&void 0!==y?y:[]),D(Number(_.fr\u00e5nDennaEnhet)||0)},[I,me,he]),ve=(0,r.useCallback)(async()=>{O(!0);try{await fetch("/api/ingest/retry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session:he,magic:me})}),E(0),C([]),N(e=>e||1),await xe()}catch{}finally{O(!1)}},[he,me,xe]);(0,r.useEffect)(()=>{let e=!1;return(async()=>{try{const t=function(){try{const e=new URLSearchParams(window.location.search);if(e.has("reset")){const t=(e.get("reset")||"1").toLowerCase();if("off"===t||"0"===t||"real"===t)localStorage.removeItem(Gh);else{const e="test"+Array.from(crypto.getRandomValues(new Uint8Array(10))).map(e=>e.toString(16).padStart(2,"0")).join("");localStorage.setItem(Gh,e),["arvo_successful_count","arvo_had_saving","arvo_gate_passed"].forEach(e=>localStorage.removeItem(e))}e.delete("reset");const n=e.toString();window.history.replaceState({},"",window.location.pathname+(n?`?${n}`:""))}return localStorage.getItem(Gh)||null}catch{return null}}();e||J(!!t);const n=t||await qh();e||B(n),e||await xe(n)}catch(t){e||P(t.message)}})(),()=>{e=!0}},[]),(0,r.useEffect)(()=>{he&&xe().catch(e=>P(e.message))},[he]),(0,r.useEffect)(()=>{if($<=0)return;const e=setInterval(()=>{xe().catch(()=>{})},12e3);return()=>clearInterval(e)},[$,xe]);const be=(0,r.useCallback)(()=>{ge();const e=window.location.pathname;window.history.replaceState({},"",e),window.location.reload()},[ge]);async function ke(e){const t=[...e||[]].filter(e=>"application/pdf"===e.type||/\.pdf$/i.test(e.name)).slice(0,20);if(!t.length)return;W(""),K(!0),V(t.map(e=>({name:e.name,status:"work"})));const n=!(!me&&!he);let r=null;if(!n)try{var a;const e=await fetch("/api/token",{method:"POST"});r=null===(a=await e.json())||void 0===a?void 0:a.token}catch{}let i=!1,o="",s=0;for(let l=0;l<t.length;l++)try{const e=await Kh(t[l]);let a="fail",d="Misslyckades",c="";const u=n?"/api/kontor-ingest":"/api/test-invoice",p=n?{pdfBase64:e,magic:me,session:he,fingerprint:I}:{pdfBase64:e,industry:"ovrigt",employees:10,token:r,fingerprint:I},m=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}),f=await m.json().catch(()=>({}));n?f.ok?a="done":([d,c]=Hh(m.status,null===f||void 0===f?void 0:f.error,null===f||void 0===f?void 0:f.code),o=c):f.gate?(a="gate",i=!0):"auto"===f.route||"monitoring"===f.route?a="done":"review_queue"===f.route||"unsupported"===f.route?(a="review",s++):([d,c]=Hh(m.status,null===f||void 0===f?void 0:f.error,null===f||void 0===f?void 0:f.code),o=c),V(e=>e.map((e,t)=>t===l?{...e,status:a,label:d,hint:c}:e))}catch{o="Kunde inte n\xe5 servern \u2014 kontrollera n\xe4tet och f\xf6rs\xf6k igen.",V(e=>e.map((e,t)=>t===l?{...e,status:"fail",label:"N\xe4tverksfel",hint:o}:e))}K(!1),i?W("Ni har n\xe5tt gr\xe4nsen f\xf6r fria analyser. Vidarebefordra resten till faktura@inbox.arvoflow.se \u2014 eller aktivera ert konto \u2014 s\xe5 forts\xe4tter vi."):s>0?W("En eller flera fakturor beh\xf6ver manuell granskning (t.ex. utl\xe4ndsk valuta eller l\xe5g l\xe4sbarhet). Vi tittar p\xe5 dem och \xe5terkommer \u2014 ladda g\xe4rna upp fler under tiden."):o&&W(o);try{await xe()}catch{}}const ye=e=>{const t=e.target.files;e.target.value="",ke(t)},je=e=>{var t;e.preventDefault(),G(!1),ke(null===(t=e.dataTransfer)||void 0===t?void 0:t.files)},we=e=>{e.preventDefault(),q||G(!0)},Se=()=>G(!1);const $e=(0,r.useCallback)(async(e,t)=>{if(t)if("application/pdf"===t.type){ee(t=>({...t,[e]:{phase:"work",msg:"L\xe4ser avtalet\u2026"}}));try{const n=await Kh(t),r=await fetch("/api/contract-upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:e,pdfBase64:n,email:fe||s||void 0})}),a=await r.json().catch(()=>({}));a.ok?(ee(t=>({...t,[e]:{phase:"done",msg:`L\xe4st \u2014 bindningen l\xf6per till ${a.clock.currentPeriodEnd}.`}})),await xe()):ee(t=>({...t,[e]:{phase:"fail",msg:a.reason||a.error||"Avtalet kunde inte l\xe4sas just nu."}}))}catch{ee(t=>({...t,[e]:{phase:"fail",msg:"Avtalet kunde inte l\xe4sas just nu \u2014 f\xf6rs\xf6k igen om en stund."}}))}}else ee(t=>({...t,[e]:{phase:"fail",msg:"Endast PDF st\xf6ds."}}))},[fe,s,xe]),Ne=(0,r.useCallback)(async(e,t)=>{ee(t=>({...t,[e]:{phase:"work",msg:"Registrerar\u2026"}}));try{const n=await fetch("/api/contract-status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:e,action:t})}),r=await n.json().catch(()=>({}));r.ok?(ee(t=>{const n={...t};return delete n[e],n}),await xe()):ee(t=>({...t,[e]:{phase:"fail",msg:r.reason||r.error||"Kunde inte registrera just nu."}}))}catch{ee(t=>({...t,[e]:{phase:"fail",msg:"Kunde inte registrera just nu \u2014 f\xf6rs\xf6k igen."}}))}},[xe]),_e=(0,r.useCallback)(async()=>{try{await navigator.clipboard.writeText(Yh)}catch{}X(!0),setTimeout(()=>X(!1),2200)},[]);const Ee=(0,r.useMemo)(()=>(null!==i&&void 0!==i?i:[]).filter(e=>"auto"===e.route||"monitoring"===e.route),[i]),ze=(0,r.useMemo)(()=>function(e){const t=new Map;for(const n of null!==e&&void 0!==e?e:[]){const e=`${Qf(n).trim().toLowerCase()}|${String(n.category||"").toLowerCase()}`,r=t.get(e);r?(r.count+=1,new Date(n.created_at)>new Date(r.latest.created_at)&&(r.latest=n)):t.set(e,{key:e,latest:n,count:1})}return[...t.values()].sort((e,t)=>{var n,r;return(null!==(n=t.latest.net_saving)&&void 0!==n?n:0)-(null!==(r=e.latest.net_saving)&&void 0!==r?r:0)})}(Ee),[Ee]),Ce=(0,r.useMemo)(()=>{const e=new Map;for(const t of null!==y&&void 0!==y?y:[]){e.has(t.kind)||e.set(t.kind,{kind:t.kind,headline:t.headline,detail:t.detail,action:t.action,suppliers:[]});const n=e.get(t.kind),r=t.invoiceNumber?`${t.supplier} (faktura ${t.invoiceNumber})`:t.supplier;n.suppliers.includes(r)||n.suppliers.push(r)}return[...e.values()]},[y]),Ae=(0,r.useMemo)(()=>function(){let{autoAnalyses:e=[],watched:t=[]}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const n=e.length,r=t.length;return{fakturor:n+r,prissatta:n,bevakade:r}}({autoAnalyses:Ee,watched:null!==y&&void 0!==y?y:[]}),[Ee,y]),De=(0,r.useMemo)(()=>{var e;const t={high:0,medium:1,low:2};return null!==(e=(null!==Ee&&void 0!==Ee?Ee:[]).map(e=>e.lead_finding_json).filter(e=>e&&"object"===typeof e&&e.title).sort((e,n)=>t[e.severity]-t[n.severity]||(n.annualImpact||0)-(e.annualImpact||0))[0])&&void 0!==e?e:null},[Ee]),Fe=(0,r.useMemo)(()=>{var e;return null!==(e=(null!==i&&void 0!==i?i:[]).map(e=>e.contractClock).filter(e=>e&&"object"===typeof e&&e.title&&e.daysLeft>0).sort((e,t)=>e.daysLeft-t.daysLeft)[0])&&void 0!==e?e:null},[i]),Oe=(0,r.useMemo)(()=>{var e;return null!==(e=Object.values(null!==x&&void 0!==x?x:{}).filter(e=>e&&"object"===typeof e&&e.title).sort((e,t)=>{var n,r;return new Date(t.changedAt)-new Date(e.changedAt)||(null!==(n=t.withSupplier)&&void 0!==n?n:0)-(null!==(r=e.withSupplier)&&void 0!==r?r:0)})[0])&&void 0!==e?e:null},[x]),Te=(0,r.useMemo)(()=>{var e;const t={high:0,medium:1,low:2};return null!==(e=Object.values(null!==m&&void 0!==m?m:{}).filter(e=>e&&"object"===typeof e&&e.title&&e.category!==(null===Oe||void 0===Oe?void 0:Oe.category)).sort((e,n)=>{var r,a;return(null!==(r=t[e.confidence])&&void 0!==r?r:3)-(null!==(a=t[n.confidence])&&void 0!==a?a:3)})[0])&&void 0!==e?e:null},[m,Oe]),Pe=ze.reduce((e,t)=>{var n;return e+(null!==(n=t.latest.net_saving)&&void 0!==n?n:0)},0),Le=function(e){if(!e.length)return 0;let t=0,n=0;for(const r of e){const e=r.latest.annual_cost>0?r.latest.annual_cost:0;t+=e,n+=Xf(r.latest)*e}return 0===t?Math.round(e.reduce((e,t)=>e+Xf(t.latest),0)/e.length):Math.round(n/t)}(ze),Re=(Ie=Le,{pointer:Math.max(4,Math.min(96,Ie)),label:Ie>=67?"B\xe4ttre \xe4n marknaden":Ie>=45?"I niv\xe5":"S\xe4mre \xe4n marknaden"});var Ie;const Be=function(e){var t;if(!e)return null;const n=(null!==(t=e.split("@")[1])&&void 0!==t?t:"").toLowerCase();return!n||Wh.has(n)?null:n}(s),Me=ze.filter(e=>{var t;return e.latest.should_switch&&(null!==(t=e.latest.net_saving)&&void 0!==t?t:0)>0}),Ve=(0,r.useMemo)(()=>{let e=null;for(const t of ze){const n=t.latest,r=d[`${n.normalized_supplier}|${n.category}`],a=(null===r||void 0===r?void 0:r.supplierMedian)||(null===r||void 0===r?void 0:r.supplierAvgCost);if(!r||!a||!n.annual_cost)continue;const i=Math.round((n.annual_cost-a)/a*100),o={supplier:Qf(n),cost:n.annual_cost,median:a,p25:r.supplierP25,n:r.supplierDataPoints,pct:i};(!e||i>e.pct)&&(e=o)}return e},[ze,d]),Ue=(0,r.useMemo)(()=>{if(Ve)return null;for(const n of ze){var e;const r=n.latest,a=u[r.category];if(a&&a.n>=3&&null!==(e=a.observations)&&void 0!==e&&e.length){var t;const e="eurostat"===(null===(t=a.observations[0])||void 0===t?void 0:t.source),n=e&&"supplier"===a.scope&&r.price_per_seat_monthly>0?r.price_per_seat_monthly:null,i=n?Math.round((n-a.median)/a.median*100):null;return{...a,category:r.category,supplier:Qf(r),customerUnit:n,pct:i,isPeer:e}}}return null},[Ve,ze,u]),Ke=(0,r.useMemo)(()=>{if(Ve||Ue)return null;let e=null;for(const n of ze){var t;const r=h[n.latest.category];if(!r||!(r.median>0))continue;const a=null!==(t=r.customerCost)&&void 0!==t?t:0;(!e||a>e._material)&&(e={...r,_material:a})}return e},[Ve,Ue,ze,h]),He=(0,r.useMemo)(()=>ze.filter(e=>"annual"===e.latest.billing_period&&e.latest.created_at).map(e=>{const t=e.latest,n=new Date(t.created_at);return n.setMonth(n.getMonth()+12),{id:t.id,supplier:Qf(t),when:n,cost:t.annual_cost}}).sort((e,t)=>e.when-t.when),[ze]),We=ze.length?Qh(ze.map(e=>e.latest.created_at).sort().reverse()[0]):"",qe=(new Date).toLocaleDateString("sv-SE",{day:"numeric",month:"short",year:"numeric"}).toUpperCase(),Ge=function(e){return e>=5&&e<10?"God morgon":e>=10&&e<12?"God f\xf6rmiddag":e>=12&&e<17?"God eftermiddag":"God kv\xe4ll"}((new Date).getHours()),{hasSwitchAction:Ye,hasFindingAction:Je,acting:Qe}=function(e){var t;let{switchablesCount:n,roomFinding:r}=e;const a=(null!==n&&void 0!==n?n:0)>0,i=!!(r&&(null!==(t=r.annualImpact)&&void 0!==t?t:0)>0);return{hasSwitchAction:a,hasFindingAction:i,acting:a||i}}({switchablesCount:Me.length,roomFinding:De}),Xe=(0,r.useMemo)(()=>{const e=[];var t;return e.push({tag:"Bevakar",what:null!==w&&void 0!==w&&w.sweptAt?(0,$c.jsxs)($c.Fragment,{children:[w.streakNights>=2?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("b",{children:[w.streakNights," n\xe4tter i rad"]})," utan ett avbrott i bevakningen. "]}):(0,$c.jsx)($c.Fragment,{children:"Bevakningen gick igenom i natt. "}),w.allClear?"Inget av det marknaden gjorde r\xf6rde era priser \u2014 det tysta beskedet \xe4r ocks\xe5 ett besked.":Oe?"Nattens svep \xe4r avl\xe4st \u2014 det som ber\xf6r er st\xe5r som ett eget kort h\xe4r ovan.":"Nattens svep \xe4r avl\xe4st. Ingenting i det kr\xe4vde er uppm\xe4rksamhet."]}):(0,$c.jsx)($c.Fragment,{children:"Er bevakning \xe4r aktiv. Nattens svep visas h\xe4r s\xe5 snart k\xf6rningen rapporterat \u2014 vi redovisar antalet k\xe4llor f\xf6rst n\xe4r vi har det, aldrig en ungef\xe4rlig siffra."})}),Ee.length>0&&e.push({tag:"Analys",what:(0,$c.jsxs)($c.Fragment,{children:["V\xe4gde ",(0,$c.jsxs)("b",{children:[Ee.length," ",1===Ee.length?"faktura":"fakturor"]})," mot verifierat marknadspris",We?(0,$c.jsxs)($c.Fragment,{children:[" \xb7 senast ",We]}):null,(t=We,String(null!==t&&void 0!==t?t:"").trim().endsWith(".")?"":".")]})}),Ve&&e.push({tag:"Kohort",what:(0,$c.jsxs)($c.Fragment,{children:["J\xe4mf\xf6rde era priser mot ",(0,$c.jsxs)("b",{children:[Ve.n," bolag"]})," hos ",Ve.supplier," via n\xe4tverket \u2014 sanningen ingen j\xe4mf\xf6relsesajt kan ge."]})}),Oe&&e.push({tag:"R\xf6relse",what:(0,$c.jsxs)($c.Fragment,{children:["F\xe5ngade en marknadsr\xf6relse: ",(0,$c.jsx)("b",{children:Oe.title})," \u2014 ",Oe.withSupplier," av ",Oe.total," bolag vi f\xf6ljer ber\xf6rs."]})}),Te&&e.push({tag:"Prognos",what:(0,$c.jsxs)($c.Fragment,{children:["K\xf6ade ett motdrag inf\xf6r en trolig h\xf6jning: ",(0,$c.jsx)("b",{children:Te.title}),"."]})}),Fe&&e.push({tag:"Klocka",what:(0,$c.jsxs)($c.Fragment,{children:["Bevakar avtalsklockan \u2014 ",(0,$c.jsxs)("b",{children:[Fe.daysLeft," dagar"]})," kvar p\xe5 bindningen, agerar i f\xf6nstret."]})}),e},[ze.length,Ee.length,We,w,Ve,Oe,Te,Fe]),Ze=Qe?Ye?"B\xe4ttre \xe4n marknaden"===Re.label?(0,$c.jsxs)($c.Fragment,{children:["Sammantaget st\xe5r ni ",(0,$c.jsx)("em",{children:"starkt"})," \u2014 men ",Me.length," avtal kostar mer \xe4n de borde."]}):"I niv\xe5"===Re.label?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("em",{children:"i niv\xe5"})," med marknaden \u2014 ",Me.length," avtal kan sk\xe4rpas."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsx)("em",{children:"mer \xe4n marknaden"})," \u2014 ",Me.length," avtal drar mest."]}):(0,$c.jsxs)($c.Fragment,{children:["Era avtal st\xe5r sig \u2014 men vi f\xe5ngade ",(0,$c.jsxs)("em",{children:[Jh(De.annualImpact)," kr/\xe5r"]})," v\xe4rt att \xe5tg\xe4rda."]}):(0,$c.jsxs)($c.Fragment,{children:["H\xe5ll kursen. Era priser ",(0,$c.jsx)("em",{children:"st\xe5r sig mot marknaden."})]}),et=Qe?Ye?(0,$c.jsxs)($c.Fragment,{children:["Vi j\xe4mf\xf6rde de ",(0,$c.jsxs)("b",{children:[ze.length," leverant\xf6rer"]})," vi kunde priss\xe4tta mot verifierat marknadspris.",(0,$c.jsxs)("b",{children:[" ",Jh(Pe)," kr/\xe5r"]})," i m\xf6jlig nettobesparing ligger p\xe5 bordet \u2014 det st\xf6rsta bytet tar tv\xe5 minuter att signera. Resten h\xe5ller m\xe5ttet; dem r\xf6r vi inte."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi j\xe4mf\xf6rde de ",(0,$c.jsxs)("b",{children:[ze.length," leverant\xf6rer"]})," vi kunde priss\xe4tta mot verifierat marknadspris \u2014 priserna st\xe5r sig. Men vi l\xe4ste varje rad p\xe5 era fakturor och f\xe5ngade en kostnad v\xe4rd ",(0,$c.jsxs)("b",{children:[Jh(De.annualImpact)," kr/\xe5r"]})," \u2014 se vad domen bygger p\xe5 i fyndet ovan."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi j\xe4mf\xf6rde de ",(0,$c.jsxs)("b",{children:[ze.length," leverant\xf6rer"]})," vi kunde priss\xe4tta mot verifierat marknadspris. Inget byte rekommenderas i dag. Vi h\xf6r av oss om l\xe4get f\xf6r\xe4ndras \u2014 ni beh\xf6ver inte g\xf6ra n\xe5got."]});return(0,$c.jsx)(sh,{children:(0,$c.jsxs)(lh,{children:[(0,$c.jsx)(eh,{email:fe,onLogout:be}),A>0&&(0,$c.jsxs)("div",{style:{border:"1px solid rgba(157,184,175,0.22)",borderRadius:12,background:"rgba(157,184,175,0.05)",padding:"14px 18px",margin:"0 0 18px",color:"rgba(236,244,241,0.80)",fontSize:13,lineHeight:1.6},children:[(0,$c.jsxs)("strong",{style:{color:"#EAF2EF"},children:[A," ",1===A?"analys":"analyser"," till finns p\xe5 den h\xe4r datorn"]})," ","\u2014 de h\xf6r inte till ",null!==s&&void 0!==s?s:"ert konto"," och visas d\xe4rf\xf6r inte h\xe4r. Rummet visar det ni delat med oss, inget annat."]}),_>0&&(0,$c.jsxs)("div",{style:{border:"1px solid rgba(245,180,90,0.45)",borderRadius:12,background:"rgba(245,180,90,0.07)",padding:"16px 18px",margin:"0 0 18px",color:"#E8C9A0",fontSize:13.5,lineHeight:1.55},children:[(0,$c.jsxs)("strong",{style:{color:"#F5B45A"},children:[_," ",1===_?"faktura kunde":"fakturor kunde"," inte l\xe4sas in."]})," ","Oftast ett tillf\xe4lligt fel (ett tekniskt avbrott) \u2014 s\xe4llan att filen inte var en l\xe4sbar faktura.",z.length>0&&(0,$c.jsx)("ul",{style:{margin:"10px 0 0",paddingLeft:18},children:z.map((e,t)=>(0,$c.jsx)("li",{style:{fontFamily:"monospace",fontSize:12.5,color:"#D9B98A",marginBottom:2},children:e},t))}),(0,$c.jsxs)("div",{style:{marginTop:12,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"},children:[(0,$c.jsx)("button",{onClick:ve,disabled:F,style:{cursor:F?"default":"pointer",border:"1px solid #F5B45A",background:"transparent",color:"#F5B45A",borderRadius:100,padding:"9px 20px",fontSize:13,fontWeight:600,opacity:F?.6:1},children:F?"K\xf6r om\u2026":`F\xf6rs\xf6k igen \u2014 Arvo k\xf6r om ${1===_?"den":"dem"} \xe5t er`}),(0,$c.jsx)("span",{style:{fontSize:12,color:"#B89B72"},children:"Inget nytt mejl beh\xf6vs."})]})]}),null===i&&!T&&(0,$c.jsx)(Th,{}),T&&(0,$c.jsx)(ph,{children:(0,$c.jsx)("h2",{style:{fontSize:26},children:"Kunde inte ladda ert kontor \u2014 f\xf6rs\xf6k igen om en stund."})}),null!==i&&ze.length>0&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(dh,{children:[(0,$c.jsxs)(ch,{children:[(0,$c.jsx)("div",{className:"brand",children:"ARVO-KONTORET"}),(0,$c.jsxs)("div",{className:"confidential",children:["Konfidentiellt \xb7 ",null!==Be&&void 0!==Be?Be:"Ert konto"," \xb7 ",qe,Y?" \xb7 TESTKONTO (?reset=off f\xf6r skarpt)":""]}),(0,$c.jsxs)("h1",{children:[Ge,".",(0,$c.jsx)("br",{}),Qe?"Ett par drag v\xe4ntar p\xe5 er.":"Allt \xe4r under kontroll."]})]}),(0,$c.jsxs)(uh,{children:[(0,$c.jsxs)("div",{className:"radar-head",children:[(0,$c.jsxs)("div",{className:"disc",children:[(0,$c.jsxs)("svg",{width:"118",height:"118",viewBox:"0 0 118 118",children:[(0,$c.jsx)("circle",{cx:"59",cy:"59",r:"56",fill:"none",stroke:"rgba(93,214,202,.16)",strokeWidth:"1"}),(0,$c.jsx)("circle",{cx:"59",cy:"59",r:"38",fill:"none",stroke:"rgba(93,214,202,.11)",strokeWidth:"1"}),(0,$c.jsx)("circle",{cx:"59",cy:"59",r:"20",fill:"none",stroke:"rgba(93,214,202,.08)",strokeWidth:"1"})]}),(0,$c.jsx)("div",{className:"sweep"}),(0,$c.jsxs)("div",{className:"dial-center",children:[(0,$c.jsx)("span",{className:"dial-time",children:null!==w&&void 0!==w&&w.sweptAt?new Date(w.sweptAt).toLocaleTimeString("sv-SE",{hour:"2-digit",minute:"2-digit"}):"\xb7 \xb7 \xb7"}),(0,$c.jsx)("span",{className:"dial-k",children:null!==w&&void 0!==w&&w.sweptAt?"senaste svep":"bevakning aktiv"})]})]}),(0,$c.jsxs)("div",{className:"radar-title",children:[(0,$c.jsx)("strong",{children:"Vakten"}),"bevakar era avtal"]})]}),(0,$c.jsxs)("div",{className:"radar-stats",children:[(0,$c.jsx)("div",{className:"rgroup-label",children:"Ert underlag"}),Ae.bevakade>0&&(0,$c.jsxs)("div",{className:"rstat",children:[(0,$c.jsx)("span",{children:"Fakturor"}),(0,$c.jsx)("span",{className:"v",children:Ae.fakturor})]}),(0,$c.jsxs)("div",{className:"rstat",children:[(0,$c.jsx)("span",{children:Ae.bevakade>0?"Prissatta":"Fakturor"}),(0,$c.jsx)("span",{className:"v",children:Ae.prissatta})]}),Ae.bevakade>0&&(0,$c.jsxs)("div",{className:"rstat",children:[(0,$c.jsx)("span",{children:"Bevakade"}),(0,$c.jsx)("span",{className:"v",children:Ae.bevakade})]})]}),(0,$c.jsxs)("div",{className:"radar-foot",children:[(0,$c.jsx)("div",{className:"rgroup-label",children:"Marknaden"}),(0,$c.jsxs)("div",{className:"foot-line",children:[(0,$c.jsx)("span",{className:"live"}),(0,$c.jsx)("span",{children:null!==w&&void 0!==w&&w.sweptAt?(0,$c.jsxs)($c.Fragment,{children:[w.sources?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("b",{children:[w.sources," marknadsk\xe4llor"]})," svepta"]}):(0,$c.jsx)($c.Fragment,{children:"Marknaden svept"}),w.allClear?" \xb7 allt lugnt":""]}):We?(0,$c.jsxs)($c.Fragment,{children:["Senaste analys ",We," \xb7 bevakning aktiv"]}):"Bevakning aktiv"})]})]})]})]}),(0,$c.jsx)(Fm,{finding:De,variant:"dossier"}),(0,$c.jsx)(Fm,{finding:Oe,variant:"dossier",eyebrow:"Marknadsr\xf6relsen \xb7 n\xe4tverket"}),(0,$c.jsx)(Fm,{finding:Fe,variant:"dossier",eyebrow:"Maktkalendern \xb7 avtalsbevakning"}),(0,$c.jsx)(Fm,{finding:Te,variant:"dossier",eyebrow:"Maktkalendern \xb7 prognos"}),(0,$c.jsxs)(ph,{children:[(0,$c.jsx)("div",{className:"eyebrow",children:"Arvo bed\xf6mer"}),(0,$c.jsx)("h2",{children:Ze}),(0,$c.jsx)("p",{className:"work",children:et}),(0,$c.jsx)(mh,{children:Qe&&!Ye?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("span",{className:"pct",children:"Ur er egen faktura"})," \xb7 talet st\xe5r p\xe5 raden i fyndet ovan \xb7 inget marknadspris inblandat"]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("span",{className:"pct",children:"Verifierat"})," \xb7 grundat p\xe5 ",ze.length," analyserade leverant\xf6rer \xb7 publika listpriser"]})})]}),(0,$c.jsxs)(fh,{children:[(0,$c.jsxs)(vh,{children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Arvo Score"}),(0,$c.jsx)("span",{className:"src",children:Ae.bevakade>0?`${Ae.prissatta} av ${Ae.fakturor} fakturor prissatta`:"mot verifierat listpris"})]}),(0,$c.jsxs)("div",{className:"idx-main",children:[(0,$c.jsx)("span",{className:"idx-num",children:Le}),(0,$c.jsx)("span",{className:"idx-denom",children:"/100"})]}),(0,$c.jsx)("div",{className:"mkt-k",children:"Marknadsl\xe4ge"}),(0,$c.jsx)("div",{className:"mkt-track",children:(0,$c.jsx)("span",{className:"mkt-ptr",style:{left:`${Re.pointer}%`}})}),(0,$c.jsxs)("div",{className:"mkt-scale",children:[(0,$c.jsx)("span",{className:"S\xe4mre \xe4n marknaden"===Re.label?"on":"",children:"S\xe4mre"}),(0,$c.jsx)("span",{className:"I niv\xe5"===Re.label?"on":"",children:"I niv\xe5"}),(0,$c.jsx)("span",{className:"B\xe4ttre \xe4n marknaden"===Re.label?"on":"",children:"B\xe4ttre"})]}),(0,$c.jsx)("p",{className:"idx-note",children:Me.length>0?(0,$c.jsxs)($c.Fragment,{children:["Sammanv\xe4gt ",Le>=67?"starkt":Le>=45?"godk\xe4nt":"svagt"," \u2014 men ",(0,$c.jsxs)("b",{children:[Me.length," avtal kostar mer \xe4n marknaden"]}),". De ligger f\xf6rberedda i innehavet nedan."]}):"B\xe4ttre \xe4n marknaden"===Re.label?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("b",{children:"b\xe4ttre \xe4n marknaden"})," mot verifierat listpris. Inget enskilt avtal sticker ut i dag."]}):"I niv\xe5"===Re.label?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("b",{children:"i niv\xe5 med marknaden"})," mot verifierat listpris. Inget enskilt avtal sticker ut i dag."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("b",{children:"s\xe4mre \xe4n marknaden"})," \u2014 men inget enskilt avtal b\xe4r ett byte vi kan bel\xe4gga i dag."]})})]}),(0,$c.jsxs)(yh,{children:[(0,$c.jsx)("div",{className:"tally-k",children:Ye?"M\xf6jlig nettobesparing":Qe?"F\xe5ngad kostnad":"Avtal under bevakning"}),(0,$c.jsx)("div",{className:"tally-num",children:Ye?(0,$c.jsxs)($c.Fragment,{children:[Jh(Pe)," kr",(0,$c.jsx)("small",{children:"per \xe5r"})]}):Qe?(0,$c.jsxs)($c.Fragment,{children:[Jh(De.annualImpact)," kr",(0,$c.jsx)("small",{children:"per \xe5r"})]}):(0,$c.jsxs)($c.Fragment,{children:[ze.length,(0,$c.jsx)("small",{children:(ze.length,"avtal")})]})}),(0,$c.jsx)("div",{className:"tally-sub",children:Ye?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("b",{children:[Me.length," byte",Me.length>1?"n":""," f\xf6rberedda"]})," \xb7 netto efter Arvos arvode (20% av f\xf6rsta \xe5rets besparing). Fr\xe5n \xe5r tv\xe5 \xe4r hela besparingen er."]}):Qe?(0,$c.jsx)($c.Fragment,{children:"Inget leverant\xf6rsbyte kr\xe4vs \u2014 kostnaden \xe5tg\xe4rdas direkt mot fakturan. Se fyndet ovan."}):(0,$c.jsx)($c.Fragment,{children:"Era priser st\xe5r sig \u2014 inga byten p\xe5 bordet just nu. Lugnet att ni ligger r\xe4tt \xe4r ocks\xe5 en leverans."})})]})]}),(0,$c.jsxs)(kh,{children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Vaktens kvitton"}),(0,$c.jsx)("span",{className:"src",children:"medan ni drev bolaget"})]}),Xe.map((e,t)=>(0,$c.jsxs)("div",{className:"rcpt",children:[(0,$c.jsx)("span",{className:"day",children:e.tag}),(0,$c.jsx)("span",{className:"what",children:e.what})]},t))]}),(Ve||Ue||Ke||He.length>0)&&(0,$c.jsxs)(fh,{children:[Ue&&(0,$c.jsxs)(xh,{$full:0===He.length,children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:Ue.isPeer?"Den kollektiva sanningen":"Golv-referens"}),(0,$c.jsxs)("span",{className:"src",children:[Ue.isPeer?"svenska f\xf6retag":"offentlig sektor"," \xb7 ",Ue.n," pris",Ue.n>1?"punkter":"punkt"]})]}),(0,$c.jsx)("h3",{children:(e=>{const t=((null===(e=Em(Ue.category))||void 0===e?void 0:e.label)||Ue.category).toLowerCase(),n=Zh[Ue.unit]||"";return Ue.isPeer?Ue.customerUnit&&Ue.pct>=8?(0,$c.jsxs)($c.Fragment,{children:["Svenska f\xf6retag betalar ",tg(Ue.median)," ",n," f\xf6r ",t,". Ni betalar ",(0,$c.jsxs)("em",{children:[Ue.pct,"% mer."]})]}):Ue.customerUnit&&Ue.pct<=-8?(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsxs)("em",{children:[Math.abs(Ue.pct),"% mindre"]})," \xe4n svenska f\xf6retag f\xf6r ",t,"."]}):Ue.customerUnit?(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsx)("em",{children:"i niv\xe5"})," med svenska f\xf6retag f\xf6r ",t,"."]}):(0,$c.jsxs)($c.Fragment,{children:["Svenska f\xf6retag betalar ",(0,$c.jsxs)("em",{children:[tg(Ue.min),"\u2013",tg(Ue.max)," ",n]})," f\xf6r ",t,"."]}):(0,$c.jsxs)($c.Fragment,{children:["Offentlig sektor pressar samma ",t," till ",(0,$c.jsxs)("em",{children:[tg(Ue.min),"\u2013",tg(Ue.max)," ",n]}),". Beviset att priset \xe4r ",(0,$c.jsx)("em",{children:"f\xf6rhandlingsbart."})]})})()}),(()=>{const e=[...Ue.customerUnit?[{lbl:"Ni betalar",amt:Ue.customerUnit,you:!0}]:[],...(Ue.observations||[]).map(e=>({lbl:e.product||e.buyer,amt:e.unitPrice,you:!1}))];if(!e.length)return null;const t=Math.max(...e.map(e=>e.amt))||1;return(0,$c.jsx)("div",{className:"bars",children:e.map((e,n)=>(0,$c.jsxs)("div",{className:"barrow"+(e.you?" you":""),children:[(0,$c.jsx)("span",{className:"lbl",children:e.lbl}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${Math.max(8,e.amt/t*100)}%`}})}),(0,$c.jsx)("span",{className:"amt",children:tg(e.amt)})]},n))})})(),(0,$c.jsxs)("p",{className:"truth-note",children:["Verkliga priser ur ",(0,$c.jsx)("b",{children:"\xf6ppen data"})," \u2014 ",eg[null===(e=Ue.observations)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.source]||"offentliga avtal",null!==(n=Ue.observations)&&void 0!==n&&null!==(a=n[0])&&void 0!==a&&a.buyer?`, ${Ue.observations[0].buyer}`:"",".",Ue.isPeer?Ue.customerUnit?" J\xe4mf\xf6rt per enhet mot er faktura.":"":" Golvet \u2014 inte ett m\xe5l ni n\xe5r i er storlek, men beviset att listpriset \xe4r f\xf6rhandlingsbart."]})]}),Ve&&(0,$c.jsxs)(xh,{$full:0===He.length,children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Den kollektiva sanningen"}),(0,$c.jsxs)("span",{className:"src",children:[Ve.n," bolag \xb7 live"]})]}),(0,$c.jsx)("h3",{children:Ve.pct>=8?(0,$c.jsxs)($c.Fragment,{children:[Ve.n," bolag hos ",Ve.supplier," betalar i snitt ",Jh(Ve.median)," kr. Ni betalar ",(0,$c.jsxs)("em",{children:[Ve.pct,"% mer."]})]}):Ve.pct<=-8?(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsxs)("em",{children:[Math.abs(Ve.pct),"% mindre"]})," \xe4n snittet hos ",Ve.supplier," \u2014 ",Ve.n," bolag j\xe4mf\xf6rda."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsx)("em",{children:"i niv\xe5"})," med vad ",Ve.n," bolag betalar hos ",Ve.supplier,"."]})}),(()=>{const e=Math.max(Ve.cost,Ve.median,Ve.p25||0)||1,t=[{lbl:"Ni betalar",amt:Ve.cost,you:!0},{lbl:`Snitt \xb7 ${Ve.n} bolag`,amt:Ve.median,you:!1},...Ve.p25?[{lbl:"L\xe4gst 25 %",amt:Ve.p25,you:!1}]:[]];return(0,$c.jsx)("div",{className:"bars",children:t.map(t=>(0,$c.jsxs)("div",{className:"barrow"+(t.you?" you":""),children:[(0,$c.jsx)("span",{className:"lbl",children:t.lbl}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${Math.max(8,t.amt/e*100)}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[Jh(t.amt)," kr"]})]},t.lbl))})})(),(0,$c.jsxs)("p",{className:"truth-note",children:["Den h\xe4r raden kr\xe4ver att man ser ",(0,$c.jsx)("b",{children:"m\xe5nga bolags faktiska fakturor samtidigt"}),". Ingen j\xe4mf\xf6relsesajt och ingen konsult kan ge den \u2014 bara Arvo, tack vare n\xe4tverket."]})]}),Ke&&(()=>{const e=Em(Ke.category),t=(null===e||void 0===e?void 0:e.inlineLabel)||((null===e||void 0===e?void 0:e.label)||Ke.category).toLowerCase(),n=Ke.seats,r=Ke.customerCost,a=null!=(n>0?Ke.median*n:null)&&r>0,i=a?Math.round(r/n):null,o=a&&i>Ke.median;return(0,$c.jsxs)(xh,{$full:0===He.length,children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Marknadsankaret"}),(0,$c.jsx)("span",{className:"src",children:Ke.lastVerified?(0,$c.jsxs)($c.Fragment,{children:["verifierat ",Qh(Ke.lastVerified)]}):"publikt listpris"})]}),a?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("h3",{children:o?(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsxs)("em",{children:[Jh(i)," kr"]})," ",Ke.unitLabel," f\xf6r ",t," \u2014 ",(0,$c.jsx)("em",{children:"mer \xe4n leverant\xf6rens eget listpris"})," p\xe5 ",Jh(Ke.median)," kr."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsxs)("em",{children:[Jh(i)," kr"]})," ",Ke.unitLabel," f\xf6r ",t,". Leverant\xf6rens publika listpris \xe4r ",(0,$c.jsxs)("em",{children:[Jh(Ke.median)," kr"]}),"."]})}),(()=>{const e=Math.max(i,Ke.median)||1,t=[{lbl:"Ni betalar",amt:i,you:!0},{lbl:"Publikt listpris",amt:Ke.median,you:!1}];return(0,$c.jsx)("div",{className:"bars",children:t.map(t=>(0,$c.jsxs)("div",{className:"barrow"+(t.you?" you":""),children:[(0,$c.jsx)("span",{className:"lbl",children:t.lbl}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${Math.max(8,t.amt/e*100)}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[Jh(t.amt)," kr"]})]},t.lbl))})})(),(0,$c.jsxs)("p",{className:"truth-note",children:["Ert pris \xe4r r\xe4knat p\xe5 era ",n," ",1===n?Ke.unitNoun:Ke.unitNounPl," ","(",Jh(r)," kr/\xe5r) mot ",Ke.lastVerified?(0,$c.jsxs)($c.Fragment,{children:["leverant\xf6rens publika listpris, senast kontrollerat av oss ",(0,$c.jsx)("b",{children:Qh(Ke.lastVerified)})]}):(0,$c.jsx)($c.Fragment,{children:"leverant\xf6rens publika listpris"}),"."," ",o?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("b",{children:"De flesta f\xf6retag ligger under listpris"})," \u2014 ni ligger \xf6ver. Det \xe4r ovanligt nog att alltid vara v\xe4rt en fr\xe5ga till leverant\xf6ren: vilken rabatt g\xe4ller f\xf6r er volym?"]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("b",{children:"N\xe4stan alla f\xf6retag ligger under listpris"}),", s\xe5 avst\xe5ndet hit s\xe4ger inte att ni f\xf6rhandlat v\xe4l \u2014 bara att ni f\xf6rhandlat."]})," ","Svaret p\xe5 om ni betalar r\xe4tt kommer n\xe4r fler bolag i er bransch delar sina fakturor \u2014 d\xe5 byts det h\xe4r kortet mot ",(0,$c.jsx)("b",{children:"vad de faktiskt betalar"}),"."]})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("h3",{children:["Leverant\xf6rernas publika listpris f\xf6r ",t," \xe4r ",(0,$c.jsxs)("em",{children:[Jh(Ke.median)," kr"]})," ",Ke.unitLabel,"."]}),r>0&&(0,$c.jsxs)("p",{className:"truth-note",style:{borderTop:"none",paddingTop:0,marginTop:4},children:["Er kostnad i dag: ",(0,$c.jsxs)("b",{children:[Jh(r)," kr/\xe5r"]}),"."]}),(0,$c.jsxs)("p",{className:"truth-note",children:["Verifierat publikt listpris ",Ke.unitLabel," \u2014 ett ankare, inte er exakta position (den st\xe5r i innehavet nedan). N\xe4stan alla f\xf6retag ligger under listpris, s\xe5 ankaret \xe4r ett tak att m\xe4ta mot, inte ett facit. Facit kommer n\xe4r fler bolag i er bransch delar sina fakturor."]})]})]})})(),He.length>0&&(0,$c.jsxs)(bh,{$full:!Ve&&!Ue&&!Ke,children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Maktkalendern \xb7 era \xe5rsavtal"}),(0,$c.jsx)("span",{className:"src",children:"uppskattat"})]}),He.map(e=>(0,$c.jsxs)("div",{className:"cal-row",children:[(0,$c.jsx)("span",{className:"cal-prob",children:(0,$c.jsx)(kp,{name:"calendar-clock",size:18,stroke:1.8})}),(0,$c.jsxs)("div",{className:"cal-body",children:[(0,$c.jsx)("div",{className:"t",children:e.supplier}),(0,$c.jsxs)("div",{className:"s",children:["\xc5rsavtal \u2014 bytesl\xe4get \xe5terkommer \xe5rligen. ",Jh(e.cost)," kr/\xe5r."]})]}),(0,$c.jsxs)("span",{className:"cal-when",children:["~ ",Xh(e.when)]})]},e.id))]})]}),(0,$c.jsxs)(jh,{children:[(0,$c.jsxs)("div",{className:"h-eyebrow",children:["Innehavet \xb7 ",ze.length," prissatta leverant\xf6rer"]}),ze.map(e=>{var t,n,r,a;const i=e.latest,o=Em(i.category),l=Xf(i),d=ng(l),c=L.has(i.id),u=i.should_switch&&(null!==(t=i.net_saving)&&void 0!==t?t:0)>0;return(0,$c.jsxs)(Sh,{$saving:u,children:[(0,$c.jsxs)($h,{$open:c,onClick:()=>{return e=i.id,void R(t=>{const n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n});var e},"aria-expanded":c,children:[(0,$c.jsxs)(Nh,{children:[(0,$c.jsx)(ag,{score:l}),(0,$c.jsx)("span",{className:"v",style:{color:d},children:l})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"h-name",children:Qf(i)}),(0,$c.jsxs)("div",{className:"h-cat",children:[o.label," \xb7 ",Qh(i.created_at),i.invoice_number?` \xb7 faktura ${i.invoice_number}`:"",e.count>1?` \xb7 ${e.count} analyser`:""]})]}),(0,$c.jsx)("div",{className:"h-cost",children:null!=i.annual_cost?`${Jh(i.annual_cost)} kr/\xe5r`:""}),(0,$c.jsx)("div",{className:"h-badge "+(u?"save":"watch"),children:u?`+${Jh(i.net_saving)} kr/\xe5r`:"monitoring"===i.route?"Avtalsbevakad":"R\xe4tt prissatt"}),(0,$c.jsx)("span",{className:"h-chev",children:(0,$c.jsx)(kp,{name:"chevron-down",size:16,stroke:2})})]}),c&&(0,$c.jsxs)(_h,{children:[(0,$c.jsx)("div",{className:"diag",children:(0,$c.jsxs)("div",{className:"dbody",children:[(0,$c.jsx)("div",{className:"dtop",children:"Arvo bed\xf6mer"}),(0,$c.jsx)("div",{className:"dtxt",dangerouslySetInnerHTML:{__html:ig(i)}})]})}),i.uppdelning&&(()=>{const e=i.uppdelning,t=e.periodOrd;return(0,$c.jsxs)(Uh,{"data-uppdelning":!0,children:[(0,$c.jsxs)("div",{className:"u-k",children:["Vad ing\xe5r i ",Jh(i.annual_cost)," kr/\xe5r"]}),e.lopande.map((e,t)=>{var n;return(0,$c.jsxs)("div",{className:"u-rad",children:[(0,$c.jsx)("span",{className:"u-txt",children:e.beskrivning}),(0,$c.jsxs)("span",{className:"u-spec",children:[e.antal>0&&e.aPris>0?(0,$c.jsxs)($c.Fragment,{children:[Jh(e.antal)," \xd7 ",tg(e.aPris)," kr"]}):null,e.prorata?" \xb7 delperiod, \xe5rstakten anv\xe4nder fullt pris":""]}),(0,$c.jsxs)("span",{className:"u-bel",children:[Jh(null!==(n=e.fulltBelopp)&&void 0!==n?n:e.belopp)," kr"]})]},`l${t}`)}),(0,$c.jsxs)("div",{className:"u-summa",children:[(0,$c.jsxs)("span",{children:["L\xf6pande per ",t]}),(0,$c.jsxs)("span",{className:"u-bel",children:[Jh(e.lopandePerPeriod)," kr"]})]}),(0,$c.jsxs)("div",{className:"u-summa total",children:[(0,$c.jsxs)("span",{children:["\xd7 ",e.multiplikator," ",e.periodOrdPlural]}),(0,$c.jsxs)("span",{className:"u-bel",children:[Jh(e.arstakt)," kr/\xe5r"]})]}),e.engangs.length>0&&(0,$c.jsxs)("div",{className:"u-utanfor",children:[(0,$c.jsx)("div",{className:"u-k",children:"Ing\xe5r inte i \xe5rstakten"}),e.engangs.map((e,t)=>(0,$c.jsxs)("div",{className:"u-rad",children:[(0,$c.jsx)("span",{className:"u-txt",children:e.beskrivning}),(0,$c.jsx)("span",{className:"u-spec",children:"eng\xe5ngs eller r\xf6rlig"}),(0,$c.jsxs)("span",{className:"u-bel",children:[Jh(e.belopp)," kr"]})]},`e${t}`)),(0,$c.jsxs)("p",{className:"u-not",children:["Poster som inte \xe5terkommer varje ",t," r\xe4knas aldrig in i \xe5rskostnaden \u2014 att annualisera dem hade bl\xe5st upp b\xe5de er kostnad och v\xe5r besparing."]})]}),(0,$c.jsx)("p",{className:"u-not",children:"Talen \xe4r h\xe4mtade ur er egen faktura, ordagrant. Summan g\xe5r att r\xe4kna efter med minir\xe4knare \u2014 annars visar vi den inte."})]})})(),(0,$c.jsxs)("dl",{className:"facts",children:[!u&&null!=i.annual_cost&&(0,$c.jsxs)("div",{className:"fact",children:[(0,$c.jsx)("dt",{children:"Ni betalar idag"}),(0,$c.jsxs)("dd",{children:[Jh(i.annual_cost)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"fact",children:[(0,$c.jsx)("dt",{children:"Kategori"}),(0,$c.jsx)("dd",{style:{fontFamily:"inherit"},children:o.label})]}),(0,$c.jsxs)("div",{className:"fact",children:[(0,$c.jsx)("dt",{children:"Analyserad"}),(0,$c.jsx)("dd",{children:Qh(i.created_at)})]})]}),u&&((e,t,n,r)=>{const a=!!i.contract_end_date,o=b[i.category];return(0,$c.jsxs)(zh,{$known:a,children:[(0,$c.jsxs)("div",{className:"sv-eyebrow",children:[(0,$c.jsx)("span",{className:"sv-dot"}),a?"Vakten \xb7 ert byte":"Vakten \xb7 ett drag kvar"]}),(0,$c.jsx)("div",{className:"sv-dom",children:a?(0,$c.jsxs)($c.Fragment,{children:["Ni kan byta \u2014 och vi vet ",(0,$c.jsx)("em",{children:"exakt n\xe4r"}),"."]}):(0,$c.jsxs)($c.Fragment,{children:["En sak st\xe5r mellan er och ",(0,$c.jsxs)("em",{children:[Jh(i.net_saving)," kr"]}),": vad ert avtal s\xe4ger."]})}),(0,$c.jsx)("p",{className:"sv-support",children:a?(0,$c.jsxs)($c.Fragment,{children:["Ert ",Qf(i),"-avtal l\xf6per till ",(0,$c.jsx)("b",{children:Qh(i.contract_end_date)})," \u2014 vi avfyrar bytet p\xe5 dagen, i ert namn. Ni betalar ",(0,$c.jsx)("b",{children:"aldrig en dag dubbelt"}),", och vi flyttar er",(0,$c.jsx)("b",{children:" aldrig in i en avgift"}),"."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi ser besparingen tydligt \u2014 men inget bindningsdatum p\xe5 er faktura. Skicka avtalet, s\xe5",(0,$c.jsx)("b",{children:" l\xe4ser vi bindningstiden"})," och tajmar bytet s\xe5 ni ",(0,$c.jsx)("b",{children:"aldrig betalar dubbelt"})," och aldrig hamnar i en brytavgift."]})}),(0,$c.jsxs)("details",{className:"sv-proof",children:[(0,$c.jsx)("summary",{children:"F\xf6ruts\xe4ttningar inf\xf6r bytet"}),(0,$c.jsxs)("div",{className:"sv-proof-body",children:[(null===o||void 0===o||null===(e=o.alternatives)||void 0===e?void 0:e.length)>0&&(0,$c.jsxs)("div",{className:"sv-sec",children:[(0,$c.jsx)("div",{className:"sv-lbl",children:"Vad ni f\xe5r"}),o.alternatives.map((e,t)=>(0,$c.jsxs)("div",{className:"sv-alt",children:[(0,$c.jsxs)("span",{className:"sv-sup",children:[e.supplier,0===t&&(0,$c.jsx)("span",{className:"sv-tag",children:"b\xe4st matchning"})]}),(0,$c.jsx)("span",{className:"sv-pos",children:e.positioning})]},e.supplier)),(0,$c.jsxs)("div",{className:"sv-fine",children:["Matchat mot er nuvarande niv\xe5 \u2014 ",(0,$c.jsx)("b",{children:"samma eller b\xe4ttre, aldrig en nedgradering."})]})]}),(0,$c.jsxs)("div",{className:"sv-sec",children:[(0,$c.jsx)("div",{className:"sv-lbl",children:"Vad bytet ger er"}),(0,$c.jsxs)("div",{className:"sv-row",children:[(0,$c.jsxs)("span",{children:["Ni betalar idag",(0,$c.jsx)("small",{children:"er faktura"})]}),(0,$c.jsxs)("span",{className:"sv-v",children:[Jh(i.annual_cost)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"sv-row",children:[(0,$c.jsxs)("span",{children:["Samma niv\xe5 kostar idag",(0,$c.jsxs)("small",{children:["verifierat \xf6ppet pris",null!==o&&void 0!==o&&o.lastVerified?` \xb7 ${o.lastVerified}`:""]})]}),(0,$c.jsxs)("span",{className:"sv-v",children:[Jh(i.suggested_annual_cost)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"sv-row sv-keep",children:[(0,$c.jsxs)("span",{children:["Ni beh\xe5ller",(0,$c.jsx)("small",{children:"efter Arvos arvode \xb7 vi tar betalt f\xf6rst n\xe4r pengarna landat"})]}),(0,$c.jsxs)("span",{className:"sv-v",children:["+",Jh(i.net_saving)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"sv-fine",children:["bredband"===i.category?(0,$c.jsx)($c.Fragment,{children:"Exakt pris s\xe4tts per adress i offert \u2014 "}):(0,$c.jsx)($c.Fragment,{children:"Det slutliga priset s\xe4tts i offert \u2014 "}),"det ",(0,$c.jsx)("b",{children:"bekr\xe4ftas innan ni skriver under."})]})]}),(0,$c.jsxs)("div",{className:"sv-sec",children:[(0,$c.jsx)("div",{className:"sv-lbl",children:a?"Er enda handling":"Varf\xf6r vi v\xe4ntar p\xe5 datumet"}),(0,$c.jsx)("p",{className:"sv-note",children:a?(0,$c.jsx)($c.Fragment,{children:"En signatur med BankID. Inget \xe4r bindande f\xf6rr\xe4n ni skriver under, ni kan tacka nej utan kostnad, och sj\xe4lva bytet ger ingen driftst\xf6rning \u2014 den nya leverant\xf6ren sk\xf6ter flytten."}):(0,$c.jsx)($c.Fragment,{children:"En bindningstid eller brytavgift kan \xe4ta besparingen om bytet sker fel dag. Vi r\xf6r er aldrig f\xf6rr\xe4n vi vet att kalkylen h\xe5ller \u2014 bristen \xe4r n\xe4sta drag, inte ett hinder."})})]})]})]}),(0,$c.jsxs)("div",{className:"sv-act",children:[(0,$c.jsxs)(Fh,{as:vs,to:"/aktivera",children:[a?"Aktivera bytet":"F\xf6rbered bytet"," ",(0,$c.jsx)(kp,{name:"arrow",size:16})]}),!a&&(0,$c.jsxs)("label",{className:"sv-upload",children:[(0,$c.jsx)(kp,{name:"upload",size:14,stroke:1.9}),"work"===(null===(t=Z[i.id])||void 0===t?void 0:t.phase)?"L\xe4ser avtalet\u2026":"Ladda upp avtalet (PDF)",(0,$c.jsx)("input",{type:"file",accept:"application/pdf",disabled:"work"===(null===(n=Z[i.id])||void 0===n?void 0:n.phase),onChange:e=>{var t;$e(i.id,null===(t=e.target.files)||void 0===t?void 0:t[0]),e.target.value=""}})]})]}),!a&&(null===(r=Z[i.id])||void 0===r?void 0:r.msg)&&(0,$c.jsx)("p",{className:`sv-upload-note ${Z[i.id].phase}`,children:Z[i.id].msg})]})})(),i.avtal&&((e,t,n,r,a,o,l,d,c)=>{const u=i.avtal,p=u.clock,m="window-open"===p.status&&null!=p.daysToDeadline&&p.daysToDeadline<=30,f={avtalsstart:"Avtalsstart",avtalstidMan:"Avtalstid",uppsagningstidMan:"Upps\xe4gningstid",uppsagningstidDagar:"Upps\xe4gningstid",forlangningMan:"F\xf6rl\xe4ngning"},h=Object.entries(null!==(e=u.citat)&&void 0!==e?e:{}).filter(e=>{let[,t]=e;return t});return(0,$c.jsxs)(Ch,{children:[(0,$c.jsxs)("div",{className:"al-eyebrow",children:["Avtalet \xb7 l\xe4st och bevakat",u.readAt&&(0,$c.jsxs)("span",{children:["l\xe4st ",Qh(u.readAt)]})]}),(0,$c.jsxs)("div",{className:"al-facts",children:[(0,$c.jsxs)("span",{children:["Bindning ",(0,$c.jsx)("b",{children:u.bindningLabel})]}),u.uppsagningLabel&&(0,$c.jsxs)("span",{children:["Upps\xe4gningstid ",(0,$c.jsx)("b",{children:u.uppsagningLabel})]}),u.forlangningLabel&&(0,$c.jsxs)("span",{children:["F\xf6rl\xe4ngning ",(0,$c.jsx)("b",{children:u.forlangningLabel})]})]}),"uppsagd"===(null===(t=u.kundStatus)||void 0===t?void 0:t.typ)&&("terminating"===p.status||"terminated"===p.status)&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{className:"al-deadline lugn",children:["Avtalet upph\xf6r ",(0,$c.jsx)("span",{className:"al-date",children:Qh(p.currentPeriodEnd)}),"terminating"===p.status&&(0,$c.jsxs)($c.Fragment,{children:[" \xb7 ",(0,$c.jsxs)("span",{className:"al-days",children:[p.daysToEnd," dagar"]})]})]}),(0,$c.jsxs)("p",{className:"al-falla",children:["Markerad som uppsagd ",(0,$c.jsxs)("b",{children:["av er \xb7 ",Qh(u.kundStatus.registrerad)]}),". Varningarna \xe4r tysta."]}),u.omVaktLarm?(0,$c.jsxs)("p",{className:"al-larm",children:[(0,$c.jsx)("b",{children:"Om-vakten larmar:"})," en faktura fr\xe5n ",Qf(i)," har landat efter uttr\xe4desdatumet \u2014 kontrollera att upps\xe4gningen verkligen gick igenom."]}):(0,$c.jsxs)("p",{className:"al-motdrag",children:[(0,$c.jsx)("b",{children:"Om-vakten:"})," efter ",Qh(p.currentPeriodEnd)," ska ",Qf(i)," f\xf6rsvinna ur ert fakturafl\xf6de \u2014 landar en faktura \xe4nd\xe5 larmar rummet."]}),(0,$c.jsx)("button",{type:"button",className:"al-angra",onClick:()=>Ne(i.id,"angra"),children:"\u25b8 \xc5ngra \u2014 vi sade inte upp \xe4nd\xe5"})]}),u.stannarAktiv&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{className:"al-deadline",children:["N\xe4sta f\xf6nster ",(0,$c.jsx)("span",{className:"al-date",children:Qh(null!==(n=u.nastaFonster)&&void 0!==n?n:p.deadline)})," \xb7 varnar igen d\xe5"]}),(0,$c.jsxs)("p",{className:"al-falla",children:["Ni valde att beh\xe5lla ",Qf(i)," ",(0,$c.jsxs)("b",{children:["denna period \xb7 ",Qh(u.kundStatus.registrerad)]}),". Larmet \xe4r tyst till n\xe4sta f\xf6nster \u2014 bevakningen forts\xe4tter, och h\xf6jer leverant\xf6ren priset h\xf6r ni av oss direkt."]}),(0,$c.jsx)("button",{type:"button",className:"al-angra",onClick:()=>Ne(i.id,"angra"),children:"\u25b8 \xc5ngra \u2014 \xf6ppna f\xf6nstret igen"})]}),!(null!==(r=u.kundStatus)&&void 0!==r&&r.typ)&&!u.stannarAktiv&&(0,$c.jsxs)($c.Fragment,{children:["window-open"===p.status&&p.deadline&&(0,$c.jsxs)("div",{className:"al-deadline"+(m?" akut":""),children:["Sista upps\xe4gningsdag ",(0,$c.jsx)("span",{className:"al-date",children:Qh(p.deadline)})," ","\xb7 ",(0,$c.jsxs)("span",{className:"al-days",children:[p.daysToDeadline," dagar kvar"]})]}),"window-open"===p.status&&u.nastaPeriodSlut&&(0,$c.jsxs)("p",{className:"al-falla",children:[(0,$c.jsx)("b",{children:"F\xe4llan i ert avtal:"})," missas f\xf6nstret f\xf6rl\xe4ngs avtalet automatiskt och ni \xe4r bundna till ",Qh(u.nastaPeriodSlut),"."]}),"rolling"===p.status&&(0,$c.jsxs)("p",{className:"al-falla",children:["Ingen deadline att missa \u2014 avtalet l\xf6per tills vidare och kan s\xe4gas upp n\xe4r som helst med ",u.uppsagningLabel," varsel (tidigast ",Qh(p.currentPeriodEnd),")."]}),("expires"===p.status||"expired"===p.status)&&(0,$c.jsxs)("p",{className:"al-falla",children:["Avtalet l\xf6per ut ",Qh(p.currentPeriodEnd)," utan automatisk f\xf6rl\xe4ngning."]}),(0,$c.jsxs)("p",{className:"al-motdrag",children:[(0,$c.jsx)("b",{children:"Motdraget:"})," f\xf6nstret bevakas i Maktkalendern",fe||s?(0,$c.jsx)($c.Fragment,{children:" \u2014 vi mejlar er 30 och 7 dagar f\xf6re sista upps\xe4gningsdagen, och rummet visar alltid exakt hur m\xe5nga dagar som \xe5terst\xe5r."}):(0,$c.jsx)($c.Fragment,{children:" \u2014 rummet visar alltid exakt hur m\xe5nga dagar som \xe5terst\xe5r, och bytet f\xf6rbereds mot r\xe4tt dag. Logga in med er f\xf6retagsmejl s\xe5 p\xe5minner vi er \xe4ven via mejl."})]}),("window-open"===p.status||"rolling"===p.status)&&(0,$c.jsxs)("div",{className:"al-actions",children:[(0,$c.jsx)("button",{type:"button",className:"al-btn primary",disabled:"work"===(null===(a=Z[i.id])||void 0===a?void 0:a.phase),onClick:()=>Ne(i.id,"uppsagd"),children:"Vi har sagt upp \u2713"}),"window-open"===p.status&&(0,$c.jsx)("button",{type:"button",className:"al-btn",disabled:"work"===(null===(o=Z[i.id])||void 0===o?void 0:o.phase),onClick:()=>Ne(i.id,"stannar"),children:"Vi stannar denna period"})]})]}),h.length>0&&(0,$c.jsxs)("details",{className:"al-citat",children:[(0,$c.jsx)("summary",{children:"Ordagrant ur ert avtal"}),h.map(e=>{var t;let[n,r]=e;return(0,$c.jsxs)("p",{className:"al-c",children:[(0,$c.jsx)("small",{children:null!==(t=f[n])&&void 0!==t?t:n}),(0,$c.jsxs)("i",{children:["\u201d",r,"\u201d"]})]},n)})]}),(0,$c.jsxs)("label",{className:"sv-upload",children:[(0,$c.jsx)(kp,{name:"upload",size:14,stroke:1.9}),"work"===(null===(l=Z[i.id])||void 0===l?void 0:l.phase)?"L\xe4ser avtalet\u2026":"Ladda upp ett nyare avtal (PDF)",(0,$c.jsx)("input",{type:"file",accept:"application/pdf",disabled:"work"===(null===(d=Z[i.id])||void 0===d?void 0:d.phase),onChange:e=>{var t;$e(i.id,null===(t=e.target.files)||void 0===t?void 0:t[0]),e.target.value=""}})]}),(null===(c=Z[i.id])||void 0===c?void 0:c.msg)&&(0,$c.jsx)("p",{className:`sv-upload-note ${Z[i.id].phase}`,children:Z[i.id].msg})]})})(),!u&&!i.contract_end_date&&(0,$c.jsxs)(Ah,{children:[(0,$c.jsx)("div",{className:"au-eyebrow",children:"Bindningstiden \xe4r ok\xe4nd"}),(0,$c.jsx)("p",{className:"au-txt",children:"Fakturan visar inte n\xe4r ert avtal l\xf6per ut. Ladda upp avtalet, s\xe5 l\xe4ser vi datumen och r\xe4knar ut er sista upps\xe4gningsdag \u2014 f\xf6nstret bevakas sedan i kontraktskalendern."}),(0,$c.jsxs)("label",{className:"sv-upload",children:[(0,$c.jsx)(kp,{name:"upload",size:14,stroke:1.9}),"work"===(null===(n=Z[i.id])||void 0===n?void 0:n.phase)?"L\xe4ser avtalet\u2026":"Ladda upp avtalet (PDF)",(0,$c.jsx)("input",{type:"file",accept:"application/pdf",disabled:"work"===(null===(r=Z[i.id])||void 0===r?void 0:r.phase),onChange:e=>{var t;$e(i.id,null===(t=e.target.files)||void 0===t?void 0:t[0]),e.target.value=""}})]}),(null===(a=Z[i.id])||void 0===a?void 0:a.msg)&&(0,$c.jsx)("p",{className:`sv-upload-note ${Z[i.id].phase}`,children:Z[i.id].msg})]})]})]},i.id)})]}),y.length>0&&(0,$c.jsxs)(Dh,{children:[(0,$c.jsxs)("div",{className:"w-eyebrow",children:["Bevakat \u2014 inte prissatt \xb7 ",y.length," ",1===y.length?"faktura":"fakturor",Ce.length!==y.length&&(0,$c.jsxs)($c.Fragment,{children:[" \xb7 ",Ce.length," sk\xe4l"]})]}),(0,$c.jsxs)("p",{className:"w-manifesto",children:["Dessa ",(0,$c.jsx)("b",{children:y.length})," priss\xe4tter vi medvetet inte. Vart och ett b\xe4r sitt eget sk\xe4l nedan \u2014 vi s\xe4tter hellre ingen siffra \xe4n en vi inte kan st\xe5 f\xf6r. Vakten h\xe5ller dem under uppsikt och s\xe4ger till n\xe4r underlaget b\xe4r."]}),Ce.map(e=>(0,$c.jsxs)("div",{className:"w-row",children:[(0,$c.jsxs)("div",{className:"w-top",children:[(0,$c.jsx)("span",{className:"w-sup",children:1===e.suppliers.length?e.suppliers[0]:`${e.suppliers.length} fakturor`}),(0,$c.jsx)("span",{className:"w-kind",children:e.kind})]}),(0,$c.jsx)("div",{className:"w-head",children:e.headline}),(0,$c.jsx)("p",{className:"w-detail",children:e.detail}),e.suppliers.length>1&&(0,$c.jsx)("div",{className:"w-list",children:e.suppliers.join(" \xb7 ")}),(0,$c.jsxs)("div",{className:"w-action",children:[(0,$c.jsx)("span",{className:"w-arrow",children:"\u2192"})," ",e.action]})]},e.kind))]}),(0,$c.jsxs)(Vh,{children:[(0,$c.jsx)("div",{className:"mi-k",children:"Fyll p\xe5 rummet"}),(0,$c.jsx)("h3",{className:"mi-h",children:"Fler leverant\xf6rer, fler avtal \u2014 samma v\xe4g in."}),(0,$c.jsx)("p",{className:"mi-p",children:"Vidarebefordra n\xe4sta bunt leverant\xf6rsfakturor, eller sl\xe4pp dem h\xe4r. Ju fler avtal vakten ser, desto mer av er kostnad st\xe5r under uppsikt."}),(0,$c.jsxs)("div",{className:"mi-grid",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("p",{className:"mi-or",children:"Vidarebefordra \u2014 \xe4ven 50 p\xe5 en g\xe5ng"}),(0,$c.jsxs)(Rh,{type:"button",onClick:_e,className:Q?"copied":"","aria-label":`Kopiera ${Yh}`,children:[(0,$c.jsx)("span",{className:"ac-addr",children:Yh}),(0,$c.jsx)("span",{className:"ac-copy",children:Q?(0,$c.jsxs)($c.Fragment,{children:["Kopierat ",(0,$c.jsx)(kp,{name:"check",size:13,stroke:2.4})]}):"Kopiera"})]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("p",{className:"mi-or",children:"Eller ladda upp direkt"}),(0,$c.jsxs)(Ih,{className:`${U?"busy":""}${q?" over":""}`,onDrop:je,onDragOver:we,onDragLeave:Se,children:[(0,$c.jsx)("span",{className:"dz-ico",children:(0,$c.jsx)(kp,{name:"upload",size:20,stroke:1.7})}),(0,$c.jsx)("span",{className:"dz-t",children:U?"Analyserar\u2026":q?"Sl\xe4pp h\xe4r":"Sl\xe4pp eller v\xe4lj PDF-fakturor"}),(0,$c.jsx)("span",{className:"dz-s",children:"Flera samtidigt g\xe5r bra \xb7 vi sparar aldrig filen"}),(0,$c.jsx)("input",{type:"file",accept:"application/pdf",multiple:!0,disabled:U,onChange:ye})]})]})]}),M.length>0&&(0,$c.jsx)(Bh,{children:M.map((e,t)=>(0,$c.jsxs)("div",{className:"dp-row",children:[(0,$c.jsx)("span",{className:"dp-name",children:e.name}),(0,$c.jsx)("span",{className:"dp-stat "+("done"===e.status?"done":"work"===e.status||"gate"===e.status||"review"===e.status?"work":"fail"),title:"fail"===e.status&&e.hint||"",children:"done"===e.status?"Klar":"review"===e.status?"Manuell granskning":"fail"===e.status?e.label||"Misslyckades":"gate"===e.status?"Gr\xe4ns n\xe5dd":"Analyserar\u2026"})]},`${e.name}-${t}`))}),H&&(0,$c.jsx)(Bh,{children:(0,$c.jsx)("p",{className:"dp-note",children:H})})]}),(0,$c.jsxs)(Oh,{children:[(0,$c.jsx)("div",{className:"iq-k",children:"Arvo Intelligence"}),(0,$c.jsxs)("h3",{children:["Hela reskontran, ",(0,$c.jsx)("em",{children:"bevakad dygnet runt."})]}),(0,$c.jsx)("p",{children:Qe?(0,$c.jsxs)($c.Fragment,{children:["I dag vaktar Arvo de avtal ni delat. Arvo Intelligence vidgar vakten till ",(0,$c.jsx)("b",{children:"resten av boken"})," \u2014 varenda avtal ni har \u2014 och larmar er innan n\xe4sta h\xf6jning n\xe5r er. Varje m\xe5nad: ett brev med exakt vad som r\xf6rt sig, och vad vi gjort \xe5t det."]}):(0,$c.jsxs)($c.Fragment,{children:["Era priser st\xe5r sig i dag, och Arvo vaktar de avtal ni delat. Arvo Intelligence vidgar vakten till ",(0,$c.jsx)("b",{children:"resten av boken"}),", s\xe5 att inget avtal l\xe4mnas obevakat \u2014 och skickar varje m\xe5nad ett brev med vad som r\xf6rt sig."]})}),(0,$c.jsxs)("div",{className:"iq-row",children:[(0,$c.jsxs)("span",{className:"iq-price",children:["1 995 kr ",(0,$c.jsx)("span",{children:"/ m\xe5n \xb7 ingen bindningstid"})]}),(0,$c.jsxs)(Fh,{as:vs,to:"/aktivera",children:["Aktivera Arvo Intelligence ",(0,$c.jsx)(kp,{name:"arrow",size:16})]})]})]}),(0,$c.jsxs)(wh,{children:[(0,$c.jsx)("div",{className:"keyline"}),(0,$c.jsx)("div",{className:"mark",children:"ARVO"}),(0,$c.jsx)("div",{className:"tagline",children:"Finansiell intelligens som aldrig sover."})]})]}),null!==i&&0===ze.length&&!T&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(dh,{children:(0,$c.jsxs)(ch,{children:[(0,$c.jsx)("div",{className:"brand",children:"ARVO-KONTORET"}),(0,$c.jsxs)("div",{className:"confidential",children:["Konfidentiellt \xb7 ",null!==Be&&void 0!==Be?Be:"Ert konto"," \xb7 ",qe,Y?" \xb7 TESTKONTO (?reset=off f\xf6r skarpt)":""]}),(0,$c.jsx)("h1",{children:$>0?(0,$c.jsxs)($c.Fragment,{children:["Arvo analyserar",(0,$c.jsx)("br",{}),$," ",1===$?"faktura":"fakturor","\u2026"]}):(0,$c.jsxs)($c.Fragment,{children:["Se ert bolag",(0,$c.jsx)("br",{}),"som marknaden ser det."]})})]})}),$>0?(0,$c.jsxs)(ph,{children:[(0,$c.jsxs)("div",{className:"eyebrow",children:[(0,$c.jsx)("span",{className:"live",style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:"#5DD6CA",marginRight:8}}),"Arbetar nu"]}),(0,$c.jsxs)("h2",{children:["Vi v\xe4ger era ",(0,$c.jsxs)("em",{children:[$," ",1===$?"faktura":"fakturor"]})," mot verifierat marknadspris."]}),(0,$c.jsx)("p",{className:"work",children:"Kontoret fylls i takt med att varje analys blir klar \u2014 sidan uppdateras automatiskt, ni beh\xf6ver inte g\xf6ra n\xe5got. Det tar oftast n\xe5gon minut."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Vu,{doman:te,setDoman:ne,onSubmit:async function(e){var t;null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e);const n=te.trim();if(!n||ie)return;oe(!0),ae(null),le(""),ce(0);const r=performance.now();try{var a;const e=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:n,fast:!0})}),t=await e.json().catch(()=>({}));if(null!==(a=t.findings)&&void 0!==a&&a.length){ae(t),pe(!0),oe(!1);try{const e=new AbortController,r=setTimeout(()=>e.abort(),18e3);try{var i;const r=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:n}),signal:e.signal}),a=await r.json().catch(()=>({}));if(null!==(i=a.findings)&&void 0!==i&&i.length){const e=new Set(t.findings.map(e=>e.title)),n=a.findings.filter(t=>!e.has(t.title)).slice(0,Math.max(0,5-t.findings.length));n.length&&ae({...t,findings:[...t.findings,...n]})}}finally{clearTimeout(r)}}catch{}ce((performance.now()-r)/1e3),pe(!1)}else le(t.note||"Vi kunde inte l\xe4sa av den dom\xe4nen just nu \u2014 kontrollera adressen och f\xf6rs\xf6k igen.")}catch{le("Vi n\xe5r inte Arvo just nu \u2014 f\xf6rs\xf6k igen om en stund.")}finally{oe(!1)}},loading:ie,reveal:re,note:se,elapsedS:de,pending:ue}),!re&&!ie&&(0,$c.jsx)(Pu,{})]}),(0,$c.jsxs)(Ph,{children:[(0,$c.jsxs)("div",{className:"door primary",children:[(0,$c.jsxs)("div",{className:"door-k",children:["Vidarebefordra ",(0,$c.jsx)("span",{className:"door-tag",children:"Rekommenderas"})]}),(0,$c.jsx)("h4",{children:"T\xf6m m\xe5nadens fakturor i ett mejl."}),(0,$c.jsx)("p",{children:"Markera era leverant\xf6rsfakturor (PDF) i inkorgen och vidarebefordra allt p\xe5 en g\xe5ng \u2014 \xe4ven 50 p\xe5 en g\xe5ng. Analyserna landar h\xe4r."}),(0,$c.jsx)("div",{className:"spacer"}),(0,$c.jsxs)(Rh,{type:"button",onClick:_e,className:Q?"copied":"","aria-label":`Kopiera ${Yh}`,children:[(0,$c.jsx)("span",{className:"ac-addr",children:Yh}),(0,$c.jsx)("span",{className:"ac-copy",children:Q?(0,$c.jsxs)($c.Fragment,{children:["Kopierat ",(0,$c.jsx)(kp,{name:"check",size:13,stroke:2.4})]}):"Kopiera"})]}),(0,$c.jsxs)("p",{className:"door-trust",children:[(0,$c.jsx)(kp,{name:"lock",size:13,stroke:1.8,className:"dt-ico"}),(0,$c.jsxs)("span",{children:["Vi l\xe4ser fakturan, v\xe4ger den mot marknaden och ",(0,$c.jsx)("b",{children:"sparar aldrig filen efter analysen"})," \u2014 bara resultatet."]})]})]}),(0,$c.jsxs)("div",{className:"door",children:[(0,$c.jsx)("div",{className:"door-k",children:"Eller \xb7 ladda upp direkt"}),(0,$c.jsx)("h4",{children:"Dra in flera fakturor h\xe4r."}),(0,$c.jsx)("p",{children:"PDF \xb7 upp till 20 \xe5t g\xe5ngen \xb7 vi sparar aldrig filen efter analysen."}),(0,$c.jsx)("div",{className:"spacer"}),(0,$c.jsxs)(Ih,{className:`${U?"busy":""}${q?" over":""}`,onDrop:je,onDragOver:we,onDragLeave:Se,children:[(0,$c.jsx)("span",{className:"dz-ico",children:(0,$c.jsx)(kp,{name:"upload",size:22,stroke:1.7})}),(0,$c.jsx)("span",{className:"dz-t",children:U?"Analyserar\u2026":q?"Sl\xe4pp h\xe4r":"Sl\xe4pp eller v\xe4lj PDF-fakturor"}),(0,$c.jsx)("span",{className:"dz-s",children:"Flera samtidigt g\xe5r bra"}),(0,$c.jsx)("input",{type:"file",accept:"application/pdf",multiple:!0,disabled:U,onChange:ye})]}),M.length>0&&(0,$c.jsx)(Bh,{children:M.map((e,t)=>(0,$c.jsxs)("div",{className:"dp-row",children:[(0,$c.jsx)("span",{className:"dp-name",children:e.name}),(0,$c.jsx)("span",{className:"dp-stat "+("done"===e.status?"done":"work"===e.status||"gate"===e.status||"review"===e.status?"work":"fail"),title:"fail"===e.status&&e.hint||"",children:"done"===e.status?"Klar":"review"===e.status?"Manuell granskning":"fail"===e.status?e.label||"Misslyckades":"gate"===e.status?"Gr\xe4ns n\xe5dd":"Analyserar\u2026"})]},`${e.name}-${t}`))}),H&&(0,$c.jsx)(Bh,{children:(0,$c.jsx)("p",{className:"dp-note",children:H})})]})]}),(0,$c.jsxs)(Lh,{children:["B\xf6rja med det vi priss\xe4tter direkt mot verifierat marknadspris \u2014 ",(0,$c.jsx)("b",{children:"IT-licenser, telefoni, l\xf6n eller el"}),". D\xe4r sitter \xf6verbetalningen oftast."]}),(0,$c.jsxs)(Mh,{children:[(0,$c.jsx)("span",{className:"ft-ico",children:(0,$c.jsx)(kp,{name:"lock",size:18,stroke:1.7})}),(0,$c.jsxs)("span",{className:"ft-txt",children:[(0,$c.jsx)("b",{children:"Snart: koppla Fortnox."})," N\xe4r integrationen \xe4r p\xe5 plats l\xe4ses hela leverant\xf6rsreskontran automatiskt \u2014 d\xe5 slutar ni ladda upp."]}),(0,$c.jsx)("span",{className:"ft-soon",children:"Lanseras inom kort"})]}),(0,$c.jsxs)(wh,{children:[(0,$c.jsx)("div",{className:"keyline"}),(0,$c.jsx)("div",{className:"mark",children:"ARVO"}),(0,$c.jsx)("div",{className:"tagline",children:"Finansiell intelligens som aldrig sover."})]})]})]})})}const sg=jc`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}`,lg=vc.div`min-height:100vh;background:#0E1A17;color:#fff;font-family:system-ui,sans-serif;padding:32px 24px;`,dg=vc.h1`font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 4px;`,cg=vc.p`font-size:13px;color:rgba(255,255,255,.45);margin:0 0 28px;`,ug=vc.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;@media(max-width:700px){grid-template-columns:1fr 1fr;}`,pg=vc.div`background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px 18px;`,mg=vc.p`font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.4);margin:0 0 4px;`,fg=vc.p`font-size:22px;font-weight:800;color:#5DD6CA;margin:0;letter-spacing:-.02em;`,hg=vc.div`margin-bottom:28px;animation:${sg} .4s ease both;`,gg=vc.h2`font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 10px;`,xg=vc.div`background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;`,vg=vc.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:10px 16px;background:rgba(255,255,255,.06);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);gap:12px;`,bg=vc.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:11px 16px;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;gap:12px;align-items:center;&:hover{background:rgba(255,255,255,.03);}`,kg=vc.span`display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600;background:${e=>{let{$c:t}=e;return null!==t&&void 0!==t?t:"rgba(255,255,255,.1)"}};color:#fff;`,yg=vc.form`display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;`,jg=vc.input`padding:10px 14px;border-radius:100px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;flex:1;min-width:200px;outline:none;&::placeholder{color:rgba(255,255,255,.3);}`,wg=vc.button`padding:10px 20px;border-radius:100px;border:none;cursor:pointer;font-size:13px;font-weight:700;background:linear-gradient(135deg,#5DD6CA,#1B6E66);color:#fff;white-space:nowrap;&:disabled{opacity:.5;cursor:not-allowed;}`,Sg=vc.div`margin-top:8px;background:rgba(93,214,202,.1);border:1px solid rgba(93,214,202,.25);border-radius:8px;padding:10px 14px;font-size:12px;color:#5DD6CA;word-break:break-all;`,$g=vc.div`max-width:360px;margin:80px auto;text-align:center;`,Ng=vc.p`padding:20px 16px;font-size:13px;color:rgba(255,255,255,.3);margin:0;`;function _g(e){return e?new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"\u2013"}function Eg(e){return null==e?"\u2013":Math.round(e).toLocaleString("sv-SE")}function zg(){var e,t,n,a,i,o,s,l,d,c,u,p,m,f,h,g,x,v,b,k,y,j;const[w,S]=(0,r.useState)(()=>{var e;return null!==(e=sessionStorage.getItem("arvo_admin_token"))&&void 0!==e?e:""}),[$,N]=(0,r.useState)(""),[_,E]=(0,r.useState)(!1),[z,C]=(0,r.useState)(null),[A,D]=(0,r.useState)(""),[F,O]=(0,r.useState)(""),[T,P]=(0,r.useState)(""),[L,R]=(0,r.useState)("72"),[I,B]=(0,r.useState)(""),[M,V]=(0,r.useState)("idle"),[U,K]=(0,r.useState)("queue"),[H,W]=(0,r.useState)("idle"),[q,G]=(0,r.useState)(null),[Y,J]=(0,r.useState)(null),[Q,X]=(0,r.useState)(null),[Z,ee]=(0,r.useState)("list"),[te,ne]=(0,r.useState)(""),[re,ae]=(0,r.useState)(null),[ie,oe]=(0,r.useState)(null),[se,le]=(0,r.useState)(null),[de,ce]=(0,r.useState)(null),[ue,pe]=(0,r.useState)(null),[me,fe]=(0,r.useState)("category"),[he,ge]=(0,r.useState)(""),[xe,ve]=(0,r.useState)(""),[be,ke]=(0,r.useState)(!1),[ye,je]=(0,r.useState)(null),[we,Se]=(0,r.useState)(null),[$e,Ne]=(0,r.useState)(null),[_e,Ee]=(0,r.useState)({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),[ze,Ce]=(0,r.useState)("idle"),[Ae,De]=(0,r.useState)(null),Fe=(0,r.useCallback)(async e=>{D("");try{const n=await fetch("/api/admin/dashboard",{headers:{"x-admin-token":e}}),r=await n.json();var t;if(!n.ok)return void D(null!==(t=r.error)&&void 0!==t?t:"Ej beh\xf6rig");C(r),E(!0),sessionStorage.setItem("arvo_admin_token",e)}catch{D("N\xe4tverksfel")}},[]);(0,r.useEffect)(()=>{w&&Fe(w)},[w,Fe]);const[Oe,Te]=(0,r.useState)(null),Pe=(0,r.useCallback)(()=>{fetch("/api/admin/benchmark-stats",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(Te).catch(()=>{})},[w]),Le=(0,r.useCallback)(()=>{fetch("/api/admin/prospects",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(e=>{var t,n;Se(null!==(t=e.prospects)&&void 0!==t?t:[]),Ne(null!==(n=e.stats)&&void 0!==n?n:{})}).catch(()=>{})},[w]);if(!_)return(0,$c.jsx)(lg,{children:(0,$c.jsxs)($g,{children:[(0,$c.jsx)(dg,{children:"Arvo Admin"}),(0,$c.jsx)(cg,{children:"Ange ADMIN_TOKEN f\xf6r att forts\xe4tta"}),A&&(0,$c.jsx)("p",{style:{color:"#EF4444",fontSize:13,marginBottom:12},children:A}),(0,$c.jsxs)("form",{onSubmit:async function(e){e.preventDefault(),S($)},style:{display:"flex",flexDirection:"column",gap:10},children:[(0,$c.jsx)(jg,{type:"password",placeholder:"Admin-token",value:$,onChange:e=>N(e.target.value),style:{borderRadius:10,textAlign:"center"}}),(0,$c.jsx)(wg,{type:"submit",disabled:!$,children:"Logga in \u2192"})]})]})});const Re=null!==(e=null===z||void 0===z?void 0:z.stats)&&void 0!==e?e:{},Ie="2fr 1.5fr 1fr 1fr 1fr 1.2fr 84px",Be={padding:"6px 10px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:12.5,cursor:"pointer",outline:"none"},Me=["saas-crm","saas-productivity","saas-finance","saas-devtools","saas-other","mobil","bredband","el","skrivarleasing","kortterminal","molnvaxel","loneadmin","utrustningsleasing","managed-workplace","larm-bevakning","foretagshalsovard","bankavgifter","forsakring-foretag","serverhosting","it-support","faktura-tjanst","leasing-bil"],Ve="2fr 1.5fr 1.5fr 1.5fr",Ue="2fr 1.5fr 0.5fr 2fr 1.5fr";return(0,$c.jsxs)(lg,{children:[(0,$c.jsx)(dg,{children:"Arvo Admin"}),(0,$c.jsxs)(cg,{children:["Live-data fr\xe5n Neon Postgres \xb7 senast laddad ",(new Date).toLocaleTimeString("sv-SE")]}),(0,$c.jsxs)(ug,{children:[(0,$c.jsxs)(pg,{children:[(0,$c.jsx)(mg,{children:"Totalt analyserade"}),(0,$c.jsx)(fg,{children:Eg(Re.total_analyses)})]}),(0,$c.jsxs)(pg,{children:[(0,$c.jsx)(mg,{children:"Auto (klara)"}),(0,$c.jsx)(fg,{children:Eg(Re.auto_count)})]}),(0,$c.jsxs)(pg,{children:[(0,$c.jsx)(mg,{children:"Review queue"}),(0,$c.jsx)(fg,{style:{color:"#F59E0B"},children:Eg(Re.review_count)})]}),(0,$c.jsxs)(pg,{children:[(0,$c.jsx)(mg,{children:"Unika anv\xe4ndare"}),(0,$c.jsx)(fg,{children:Eg(Re.unique_users)})]}),(0,$c.jsxs)(pg,{children:[(0,$c.jsx)(mg,{children:"Byten rekommenderade"}),(0,$c.jsx)(fg,{children:Eg(Re.switch_recommended)})]}),(0,$c.jsxs)(pg,{children:[(0,$c.jsx)(mg,{children:"Snitt nettobesparing"}),(0,$c.jsxs)(fg,{children:[Eg(Re.avg_net_saving)," kr"]})]}),(0,$c.jsxs)(pg,{children:[(0,$c.jsx)(mg,{children:"Waitlist"}),(0,$c.jsx)(fg,{children:null!==(t=null===z||void 0===z||null===(n=z.waitlist)||void 0===n?void 0:n.length)&&void 0!==t?t:"\u2013"})]}),(0,$c.jsxs)(pg,{children:[(0,$c.jsx)(mg,{children:"Feedback"}),(0,$c.jsx)(fg,{children:null!==(a=null===z||void 0===z||null===(i=z.feedback)||void 0===i?void 0:i.length)&&void 0!==a?a:"\u2013"})]})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Databasmigration"}),(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)("div",{style:{padding:"16px 18px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[(0,$c.jsxs)("p",{style:{margin:0,fontSize:13,color:"rgba(255,255,255,.6)",flex:1},children:["Skapar tabellerna ",(0,$c.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"waitlist"}),","," ",(0,$c.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"invoice_feedback"})," och"," ",(0,$c.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"magic_tokens"})," i databasen. S\xe4kert att k\xf6ra flera g\xe5nger (IF NOT EXISTS)."]}),(0,$c.jsx)(wg,{type:"button",onClick:async function(){W("loading"),G(null);try{const e=await fetch("/api/admin/run-migration",{method:"POST",headers:{"x-admin-token":w}}),t=await e.json();G(t),W(t.ok?"done":"error")}catch{W("error")}},disabled:"loading"===H,style:{background:"done"===H?"#16a34a":void 0},children:"loading"===H?"K\xf6r migration\u2026":"done"===H?"\u2713 Migration klar!":"K\xf6r migration \u2192"})]}),q&&(0,$c.jsx)("div",{style:{padding:"0 18px 16px",display:"flex",flexDirection:"column",gap:4},children:null===(o=q.results)||void 0===o?void 0:o.map(e=>(0,$c.jsxs)("div",{style:{fontSize:12,color:e.ok?"#5DD6CA":"#EF4444"},children:[e.ok?"\u2713":"\u2717"," ",e.name,e.error?` \u2014 ${e.error}`:""]},e.name))})]})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Generera demo-l\xe4nk (Magic Link)"}),(0,$c.jsx)(xg,{children:(0,$c.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$c.jsx)("p",{style:{margin:"0 0 12px",fontSize:13,color:"rgba(255,255,255,.6)"},children:"Skickar en tidsbegr\xe4nsad l\xe4nk som ger direkt\xe5tkomst utan gate."}),(0,$c.jsxs)(yg,{onSubmit:async function(e){if(e.preventDefault(),F){V("loading"),B("");try{const e=await fetch("/api/admin/magic-link",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":w},body:JSON.stringify({email:F,note:T||void 0,expiresInHours:Number(L)})}),t=await e.json();if(!e.ok)return void V("error");B(t.link),V("done")}catch{V("error")}}},children:[(0,$c.jsx)(jg,{type:"email",placeholder:"mottagare@foretag.se",value:F,onChange:e=>O(e.target.value),required:!0}),(0,$c.jsx)(jg,{placeholder:"Notering (frivillig)",value:T,onChange:e=>P(e.target.value),style:{maxWidth:200}}),(0,$c.jsx)(jg,{type:"number",placeholder:"Timmar (default 72)",value:L,onChange:e=>R(e.target.value),style:{maxWidth:140}}),(0,$c.jsx)(wg,{type:"submit",disabled:!F||"loading"===M,children:"loading"===M?"Genererar\u2026":"Skicka magic link \u2192"})]}),I&&(0,$c.jsxs)(Sg,{children:["\u2713 L\xe4nk skickad till ",F,(0,$c.jsx)("br",{}),(0,$c.jsx)("strong",{children:I})]}),"error"===M&&(0,$c.jsx)("p",{style:{color:"#EF4444",fontSize:12,marginTop:8},children:"Misslyckades \u2014 kontrollera ADMIN_TOKEN och RESEND_API_KEY."})]})})]}),(0,$c.jsx)("div",{style:{display:"flex",gap:4,marginBottom:16},children:[["queue","Review Queue"],["waitlist","Waitlist"],["feedback","Feedback"],["corrections","Korrektioner \ud83e\udde0"],["connections","Anslutningar \ud83d\udd17"],["outbound","Outbound \ud83d\ude80"],["prisbok","Prisboken \ud83d\udcd2"]].map(e=>{let[t,n]=e;return(0,$c.jsx)("button",{onClick:()=>K(t),style:{padding:"7px 16px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,background:U===t?"#5DD6CA":"rgba(255,255,255,.08)",color:U===t?"#0E1A17":"rgba(255,255,255,.6)"},children:n},t)})}),"queue"===U&&(0,$c.jsx)(hg,{children:(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:Ie,children:[(0,$c.jsx)("span",{children:"Leverant\xf6r"}),(0,$c.jsx)("span",{children:"Kategori"}),(0,$c.jsx)("span",{children:"\xc5rskkostnad"}),(0,$c.jsx)("span",{children:"Bransch"}),(0,$c.jsx)("span",{children:"Anst\xe4llda"}),(0,$c.jsx)("span",{children:"Datum"}),(0,$c.jsx)("span",{children:"\xc5tg\xe4rd"})]}),0===(null!==(s=null===z||void 0===z?void 0:z.reviewQueue)&&void 0!==s?s:[]).length&&(0,$c.jsx)(Ng,{children:"Inga review_queue-fakturor \xe4nnu."}),(null!==(l=null===z||void 0===z?void 0:z.reviewQueue)&&void 0!==l?l:[]).map(e=>(0,$c.jsxs)(r.Fragment,{children:[(0,$c.jsxs)(bg,{$cols:Ie,children:[(0,$c.jsx)("span",{style:{fontWeight:600},children:e.supplier||e.normalized_supplier||"\u2013"}),(0,$c.jsx)(kg,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$c.jsxs)("span",{children:[Eg(e.annual_cost)," kr"]}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.industry}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.employees}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:_g(e.created_at)}),(0,$c.jsx)("button",{onClick:()=>{const t=ue===e.id;pe(t?null:e.id),ge(""),ve(""),fe("category"),je(null)},style:{padding:"4px 10px",borderRadius:100,border:"1px solid rgba(93,214,202,.3)",background:ue===e.id?"rgba(93,214,202,.15)":"transparent",color:"#5DD6CA",cursor:"pointer",fontSize:11.5,fontWeight:600},children:ue===e.id?"\u2715":"Korrigera"})]}),ue===e.id&&(0,$c.jsxs)("div",{style:{padding:"14px 16px",borderTop:"1px solid rgba(93,214,202,.12)",background:"rgba(93,214,202,.03)"},children:[(0,$c.jsx)("p",{style:{margin:"0 0 10px",fontSize:12,color:"rgba(255,255,255,.45)"},children:"Manuell korrektion \u2014 sparas som labeled data och tr\xe4nar systemet."}),(0,$c.jsxs)("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[(0,$c.jsxs)("select",{value:me,onChange:e=>{fe(e.target.value),ge("")},style:Be,children:[(0,$c.jsx)("option",{value:"category",children:"Kategori"}),(0,$c.jsx)("option",{value:"recurring",children:"\xc5terkommande"}),(0,$c.jsx)("option",{value:"route",children:"Route"})]}),"category"===me&&(0,$c.jsxs)("select",{value:he,onChange:e=>ge(e.target.value),style:Be,children:[(0,$c.jsx)("option",{value:"",children:"V\xe4lj r\xe4tt kategori\u2026"}),Me.map(e=>(0,$c.jsx)("option",{value:e,children:e},e))]}),"recurring"===me&&(0,$c.jsxs)("select",{value:he,onChange:e=>ge(e.target.value),style:Be,children:[(0,$c.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$c.jsx)("option",{value:"true",children:"true (\xe5terkommande)"}),(0,$c.jsx)("option",{value:"false",children:"false (eng\xe5ngskostnad)"})]}),"route"===me&&(0,$c.jsxs)("select",{value:he,onChange:e=>ge(e.target.value),style:Be,children:[(0,$c.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$c.jsx)("option",{value:"auto",children:"auto"}),(0,$c.jsx)("option",{value:"review_queue",children:"review_queue"}),(0,$c.jsx)("option",{value:"unsupported",children:"unsupported"})]}),(0,$c.jsx)(jg,{placeholder:"Anledning (valfri)",value:xe,onChange:e=>ve(e.target.value),style:{flex:"1 1 140px",borderRadius:8,padding:"6px 12px",fontSize:12.5}}),(0,$c.jsx)(wg,{type:"button",onClick:()=>async function(e){if(he&&!be){ke(!0);try{var t,n;const r="category"===me?null!==(t=e.category)&&void 0!==t?t:"":"recurring"===me?"false":"";(await fetch("/api/admin/corrections",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":w},body:JSON.stringify({analysisId:e.id,field:me,originalValue:r,correctedValue:he,reason:xe||"operator_manual_review",category:"category"===me?he:null!==(n=e.category)&&void 0!==n?n:null,supplier:e.normalized_supplier||e.supplier||null,operatorReasoning:te||null})})).ok&&(je(e.id),setTimeout(()=>{je(null),pe(null),ge(""),ve(""),ne(""),fe("category")},2500))}catch{}finally{ke(!1)}}}(e),disabled:!he||be,style:{padding:"7px 18px",fontSize:12.5},children:be?"Sparar\u2026":"Spara \u2192"})]}),(0,$c.jsx)("textarea",{placeholder:"Resonemang / princip (valfri men v\xe4rdefullt \u2014 anv\xe4nds som few-shot-exempel i AI:n n\xe4sta g\xe5ng)",value:te,onChange:e=>ne(e.target.value),style:{marginTop:8,width:"100%",boxSizing:"border-box",padding:"8px 12px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.05)",color:"#fff",fontSize:12,fontFamily:"inherit",resize:"vertical",minHeight:56,outline:"none"}}),ye===e.id&&(0,$c.jsx)("p",{style:{color:"#5DD6CA",fontSize:12,margin:"8px 0 0"},children:"\u2713 Korrektion sparad \u2014 systemet l\xe4r sig."})]})]},e.id))]})}),"waitlist"===U&&(0,$c.jsx)(hg,{children:(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:Ve,children:[(0,$c.jsx)("span",{children:"E-post"}),(0,$c.jsx)("span",{children:"K\xe4lla"}),(0,$c.jsx)("span",{children:"Reason"}),(0,$c.jsx)("span",{children:"Datum"})]}),0===(null!==(d=null===z||void 0===z?void 0:z.waitlist)&&void 0!==d?d:[]).length&&(0,$c.jsx)(Ng,{children:"Ingen waitlist \xe4nnu."}),(null!==(c=null===z||void 0===z?void 0:z.waitlist)&&void 0!==c?c:[]).map(e=>{var t;return(0,$c.jsxs)(bg,{$cols:Ve,children:[(0,$c.jsx)("span",{style:{fontWeight:600},children:e.email}),(0,$c.jsx)(kg,{$c:"rgba(245,158,11,.15)",children:e.source}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.reason)&&void 0!==t?t:"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:_g(e.created_at)})]},e.id)})]})}),"feedback"===U&&(0,$c.jsx)(hg,{children:(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:Ue,children:[(0,$c.jsx)("span",{children:"Leverant\xf6r"}),(0,$c.jsx)("span",{children:"Kategori"}),(0,$c.jsx)("span",{children:"R\xf6st"}),(0,$c.jsx)("span",{children:"Kommentar"}),(0,$c.jsx)("span",{children:"Datum"})]}),0===(null!==(u=null===z||void 0===z?void 0:z.feedback)&&void 0!==u?u:[]).length&&(0,$c.jsx)(Ng,{children:"Ingen feedback \xe4nnu."}),(null!==(p=null===z||void 0===z?void 0:z.feedback)&&void 0!==p?p:[]).map(e=>{var t,n;return(0,$c.jsxs)(bg,{$cols:Ue,children:[(0,$c.jsx)("span",{style:{fontWeight:600},children:e.supplier||"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.category)&&void 0!==t?t:"\u2013"}),(0,$c.jsx)("span",{style:{fontSize:18},children:"up"===e.vote?"\ud83d\udc4d":"\ud83d\udc4e"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(n=e.comment)&&void 0!==n?n:"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:_g(e.created_at)})]},e.id)})]})}),"corrections"===U&&(0,$c.jsxs)(hg,{children:[(0,$c.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"},children:[(0,$c.jsx)(gg,{style:{margin:0},children:"Flywheel \u2014 Labeled Corrections"}),(0,$c.jsxs)("div",{style:{marginLeft:"auto",display:"flex",gap:4,flexWrap:"wrap"},children:[[["list","Lista"],["patterns","M\xf6nster"],["learning","Aktiv inl\xe4rning \ud83d\udd2c"],["market","Marknadsdata \ud83d\udcca"]].map(e=>{let[t,n]=e;return(0,$c.jsx)("button",{onClick:()=>{ee(t);const e={"x-admin-token":w};"patterns"!==t||Q||fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return X(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"!==t||Y||fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return J(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"!==t||re||fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ae(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"!==t||ie||fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>oe(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:Z===t?"#5DD6CA":"rgba(255,255,255,.08)",color:Z===t?"#0E1A17":"rgba(255,255,255,.6)"},children:n},t)}),(0,$c.jsx)("button",{onClick:()=>{const e={"x-admin-token":w};"patterns"===Z&&fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return X(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"===Z&&fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return J(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"===Z&&fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ae(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"===Z&&fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>oe(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]})]}),"list"===Z&&(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$c.jsx)("span",{children:"F\xe4lt"}),(0,$c.jsx)("span",{children:"Fr\xe5n"}),(0,$c.jsx)("span",{children:"Till"}),(0,$c.jsx)("span",{children:"Anledning"}),(0,$c.jsx)("span",{children:"Av"}),(0,$c.jsx)("span",{children:"Datum"})]}),null===Y&&(0,$c.jsx)(Ng,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta korrektioner."}),0===(null===Y||void 0===Y?void 0:Y.length)&&(0,$c.jsx)(Ng,{children:"Inga korrektioner \xe4nnu \u2014 systemet \xe4r nytt."}),(null!==Y&&void 0!==Y?Y:[]).map(e=>(0,$c.jsxs)(r.Fragment,{children:[(0,$c.jsxs)(bg,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$c.jsx)(kg,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$c.jsx)("span",{style:{color:"rgba(255,100,100,.8)",fontSize:11.5},children:e.original_value||"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(100,220,180,.8)",fontSize:11.5},children:e.corrected_value||"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.45)",fontSize:11},children:e.reason}),(0,$c.jsx)(kg,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:_g(e.created_at)})]}),e.operator_reasoning&&(0,$c.jsxs)("div",{style:{padding:"6px 16px 10px",borderTop:"1px solid rgba(255,255,255,.04)",background:"rgba(93,214,202,.02)"},children:[(0,$c.jsx)("span",{style:{fontSize:10.5,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",color:"rgba(93,214,202,.5)",marginRight:8},children:"Princip"}),(0,$c.jsx)("span",{style:{fontSize:12,color:"rgba(255,255,255,.55)"},children:e.operator_reasoning})]})]},e.id))]}),"patterns"===Z&&(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"1fr 2fr 80px 80px",children:[(0,$c.jsx)("span",{children:"F\xe4lt"}),(0,$c.jsx)("span",{children:"M\xf6nster (reason)"}),(0,$c.jsx)("span",{children:"Antal"}),(0,$c.jsx)("span",{children:"Av"})]}),null===Q&&(0,$c.jsx)(Ng,{children:"Klicka \u21bb Ladda f\xf6r att analysera m\xf6nster."}),0===(null===Q||void 0===Q?void 0:Q.length)&&(0,$c.jsx)(Ng,{children:"Inga m\xf6nster \xe4nnu."}),(null!==Q&&void 0!==Q?Q:[]).map((e,t)=>(0,$c.jsxs)(bg,{$cols:"1fr 2fr 80px 80px",children:[(0,$c.jsx)(kg,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.6)",fontSize:11.5},children:e.reason}),(0,$c.jsxs)("span",{style:{fontWeight:700,color:e.count>=5?"#F59E0B":"#5DD6CA"},children:[e.count,"\xd7"]}),(0,$c.jsx)(kg,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by})]},t))]}),"learning"===Z&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("div",{style:{marginBottom:12,padding:"10px 14px",background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,fontSize:12.5,color:"rgba(255,255,255,.7)"},children:"Leverant\xf6rer som inte matchar n\xe5got k\xe4nt fingerprint \u2014 flaggade automatiskt av pipeline. L\xe4gg till korrektion f\xf6r att l\xe4ra systemet."}),(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"2fr 80px 1.5fr",children:[(0,$c.jsx)("span",{children:"Leverant\xf6r (ok\xe4nd)"}),(0,$c.jsx)("span",{children:"Sedd"}),(0,$c.jsx)("span",{children:"Senast"})]}),null===re&&(0,$c.jsx)(Ng,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta k\xf6n."}),0===(null===re||void 0===re?void 0:re.length)&&(0,$c.jsx)(Ng,{children:"Inga ok\xe4nda leverant\xf6rer \u2014 systemet k\xe4nner igen alla det sett."}),(null!==re&&void 0!==re?re:[]).map((e,t)=>(0,$c.jsxs)(bg,{$cols:"2fr 80px 1.5fr",children:[(0,$c.jsx)("span",{style:{fontWeight:600,color:"#F59E0B"},children:e.supplier}),(0,$c.jsxs)("span",{style:{fontWeight:700,color:e.seen_count>=3?"#EF4444":"#F59E0B"},children:[e.seen_count,"\xd7"]}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:_g(e.last_seen)})]},t))]})]}),"market"===Z&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20},children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)(gg,{children:"Kategorif\xf6rdelning (operat\xf6rskorrektioner)"}),(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"2fr 80px",children:[(0,$c.jsx)("span",{children:"Kategori"}),(0,$c.jsx)("span",{children:"Antal"})]}),!ie&&(0,$c.jsx)(Ng,{children:"Klicka \u21bb Ladda."}),0===(null===ie||void 0===ie||null===(m=ie.categoryDist)||void 0===m?void 0:m.length)&&(0,$c.jsx)(Ng,{children:"Inga korrektioner \xe4nnu."}),(null!==(f=null===ie||void 0===ie?void 0:ie.categoryDist)&&void 0!==f?f:[]).map((e,t)=>(0,$c.jsxs)(bg,{$cols:"2fr 80px",children:[(0,$c.jsx)(kg,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$c.jsxs)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:[e.count,"\xd7"]})]},t))]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)(gg,{children:"Mest korrigerade leverant\xf6rer"}),(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"2fr 80px 1fr",children:[(0,$c.jsx)("span",{children:"Leverant\xf6r"}),(0,$c.jsx)("span",{children:"Korr."}),(0,$c.jsx)("span",{children:"Senast"})]}),!ie&&(0,$c.jsx)(Ng,{children:"Klicka \u21bb Ladda."}),0===(null===ie||void 0===ie||null===(h=ie.topSuppliers)||void 0===h?void 0:h.length)&&(0,$c.jsx)(Ng,{children:"Inga korrektioner \xe4nnu."}),(null!==(g=null===ie||void 0===ie?void 0:ie.topSuppliers)&&void 0!==g?g:[]).map((e,t)=>(0,$c.jsxs)(bg,{$cols:"2fr 80px 1fr",children:[(0,$c.jsx)("span",{style:{fontWeight:600,fontSize:12},children:e.supplier}),(0,$c.jsxs)("span",{style:{fontWeight:700,color:e.correction_count>=5?"#F59E0B":"#5DD6CA"},children:[e.correction_count,"\xd7"]}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:_g(e.last_corrected)})]},t))]})]})]}),(0,$c.jsx)(gg,{children:"Nya leverant\xf6rer per vecka (senaste 90 dagar)"}),(null===ie||void 0===ie||null===(x=ie.discoveryTrend)||void 0===x?void 0:x.length)>0?(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"2fr 1fr",children:[(0,$c.jsx)("span",{children:"Vecka"}),(0,$c.jsx)("span",{children:"Ny leverant\xf6rer"})]}),(null!==(v=ie.discoveryTrend)&&void 0!==v?v:[]).map((e,t)=>(0,$c.jsxs)(bg,{$cols:"2fr 1fr",children:[(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:12},children:e.week}),(0,$c.jsx)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:e.new_suppliers})]},t))]}):(0,$c.jsx)(Ng,{children:ie?"Inga data \xe4nnu \u2014 skicka in fakturor f\xf6r att bygga marknadsdata.":"Klicka \u21bb Ladda."})]})]}),"connections"===U&&(0,$c.jsxs)(hg,{children:[(0,$c.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center"},children:[(0,$c.jsx)(gg,{style:{margin:0},children:"OAuth-anslutningar \u2014 Gmail & Outlook"}),(0,$c.jsx)("button",{onClick:()=>{fetch("/api/admin/connections",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(e=>{var t,n;le(null!==(t=e.connections)&&void 0!==t?t:[]),ce(null!==(n=e.stats)&&void 0!==n?n:[])}).catch(()=>{})},style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),de&&de.length>0&&(0,$c.jsx)("div",{style:{display:"flex",gap:10,marginBottom:14},children:de.map(e=>(0,$c.jsxs)("div",{style:{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"10px 16px",minWidth:130},children:[(0,$c.jsx)(mg,{children:e.provider}),(0,$c.jsxs)("div",{style:{display:"flex",gap:12,marginTop:4},children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#5DD6CA"},children:e.total}),(0,$c.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"totalt"})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#4ADE80"},children:e.active}),(0,$c.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"aktiva"})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#F59E0B"},children:e.last_7d}),(0,$c.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"7 dagar"})]})]})]},e.provider))}),(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$c.jsx)("span",{children:"E-post"}),(0,$c.jsx)("span",{children:"Leverant\xf6r"}),(0,$c.jsx)("span",{children:"Token"}),(0,$c.jsx)("span",{children:"Kopplad"}),(0,$c.jsx)("span",{children:"Uppdaterad"}),(0,$c.jsx)("span",{children:"Status"})]}),null===se&&(0,$c.jsx)(Ng,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta anslutningar."}),0===(null===se||void 0===se?void 0:se.length)&&(0,$c.jsx)(Ng,{children:"Inga anslutningar \xe4nnu \u2014 ingen har kopplat Gmail/Outlook."}),(null!==se&&void 0!==se?se:[]).map(e=>(0,$c.jsxs)(bg,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$c.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.email}),(0,$c.jsx)(kg,{$c:"gmail"===e.provider?"rgba(234,67,53,.2)":"rgba(0,120,212,.2)",children:e.provider}),(0,$c.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.4)"},children:e.token_expiry?new Date(e.token_expiry).toLocaleDateString("sv-SE"):"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:_g(e.created_at)}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:_g(e.updated_at)}),(0,$c.jsx)(kg,{$c:e.token_valid?"rgba(74,222,128,.2)":"rgba(239,68,68,.2)",children:e.token_valid?"OK":"Utg\xe5ngen"})]},e.id))]})]}),"prisbok"===U&&(0,$c.jsxs)(hg,{children:[(0,$c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:12},children:[(0,$c.jsx)(gg,{style:{margin:0},children:"Prisbokens cellteckning"}),(0,$c.jsx)("button",{onClick:Pe,style:{marginLeft:"auto",padding:"6px 14px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)"},children:"Uppdatera"})]}),Oe?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("p",{style:{fontSize:12.5,color:"rgba(255,255,255,.55)",margin:"0 0 14px"},children:[null!==(b=Oe.total_datapoints)&&void 0!==b?b:0," datapunkter totalt \xb7 ",null!==(k=Oe.segments_with_real_data)&&void 0!==k?k:0," celler b\xe4r (\u2265",Oe.min_points_threshold,") \xb7 celler n\xe4ra tr\xf6skeln fylls medvetet \u2014 v\xe4lj n\xe4sta outbound-lista p\xe5 SNI-koder som tippar dem \xf6ver."]}),(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"1.2fr 1fr .8fr .5fr .8fr",children:[(0,$c.jsx)("span",{children:"Kategori"}),(0,$c.jsx)("span",{children:"Bransch"}),(0,$c.jsx)("span",{children:"Storlek"}),(0,$c.jsx)("span",{children:"n"}),(0,$c.jsx)("span",{children:"Status"})]}),0===(null!==(y=Oe.segments)&&void 0!==y?y:[]).length&&(0,$c.jsx)(Ng,{children:"Prisboken \xe4r tom \u2014 varje analyserad faktura l\xe4gger en datapunkt."}),(null!==(j=Oe.segments)&&void 0!==j?j:[]).map((e,t)=>(0,$c.jsxs)(bg,{$cols:"1.2fr 1fr .8fr .5fr .8fr",children:[(0,$c.jsx)("span",{style:{fontWeight:600},children:e.category}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.6)"},children:e.industry}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.size_bucket}),(0,$c.jsx)("span",{style:{fontWeight:700},children:e.n}),(0,$c.jsx)(kg,{$c:"B\xc4R"===e.status?"rgba(93,214,202,.2)":"LIVE-LIGHT"===e.status?"rgba(93,214,202,.12)":"N\xc4RA"===e.status?"rgba(245,158,11,.15)":"rgba(255,255,255,.08)",children:e.status})]},t))]})]}):(0,$c.jsx)(Ng,{children:"Klicka Uppdatera f\xf6r att l\xe4sa cellteckningen."})]}),"outbound"===U&&(0,$c.jsxs)(hg,{children:[(0,$c.jsx)("div",{style:{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"},children:[["Skapade",null===$e||void 0===$e?void 0:$e.total,"#5DD6CA"],["Mail skickade",null===$e||void 0===$e?void 0:$e.email_sent,"#5DD6CA"],["\xd6ppnade l\xe4nken",null===$e||void 0===$e?void 0:$e.opened,"#F59E0B"],["Konverterade",null===$e||void 0===$e?void 0:$e.converted,"#4ADE80"]].map(e=>{let[t,n,r]=e;return(0,$c.jsxs)(pg,{style:{minWidth:120},children:[(0,$c.jsx)(mg,{children:t}),(0,$c.jsx)(fg,{style:{color:r},children:null!==n&&void 0!==n?n:"\u2013"})]},t)})}),(0,$c.jsx)(gg,{children:"Skapa prospect"}),(0,$c.jsx)(xg,{children:(0,$c.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$c.jsxs)("form",{onSubmit:async function(e){if(e.preventDefault(),"loading"!==ze&&_e.companyName&&_e.employees){Ce("loading"),De(null);try{const e=await fetch("/api/generate-prospect",{method:"POST",headers:{"Content-Type":"application/json","x-arvo-admin":w},body:JSON.stringify({companyName:_e.companyName,sniCode:_e.sniCode||void 0,employees:Number(_e.employees),contactEmail:_e.contactEmail||void 0,sendEmail:_e.sendEmail,createdBy:"admin-ui"})}),t=await e.json();De(t),t.ok&&(Ee({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),Le())}catch{De({ok:!1,error:"N\xe4tverksfel"})}finally{Ce("idle")}}},style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"},children:[(0,$c.jsx)(jg,{placeholder:"Bolagsnamn *",value:_e.companyName,onChange:e=>Ee(t=>({...t,companyName:e.target.value})),style:{minWidth:180,borderRadius:8}}),(0,$c.jsx)(jg,{placeholder:"SNI-kod (t.ex. 41)",value:_e.sniCode,onChange:e=>Ee(t=>({...t,sniCode:e.target.value})),style:{width:130,borderRadius:8}}),(0,$c.jsx)(jg,{placeholder:"Antal anst. *",type:"number",value:_e.employees,onChange:e=>Ee(t=>({...t,employees:e.target.value})),style:{width:110,borderRadius:8}}),(0,$c.jsx)(jg,{placeholder:"Kontakt-mail",value:_e.contactEmail,onChange:e=>Ee(t=>({...t,contactEmail:e.target.value})),style:{minWidth:200,borderRadius:8}}),(0,$c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"rgba(255,255,255,.6)",whiteSpace:"nowrap",cursor:"pointer"},children:[(0,$c.jsx)("input",{type:"checkbox",checked:_e.sendEmail,onChange:e=>Ee(t=>({...t,sendEmail:e.target.checked}))}),"Skicka mail"]}),(0,$c.jsx)(wg,{type:"submit",disabled:"loading"===ze||!_e.companyName||!_e.employees,children:"loading"===ze?"\u2026":"Skapa \u2192"})]}),Ae&&(0,$c.jsx)("div",{style:{marginTop:10,padding:"10px 14px",borderRadius:8,background:Ae.ok?"rgba(74,222,128,.1)":"rgba(239,68,68,.1)",border:"1px solid "+(Ae.ok?"rgba(74,222,128,.25)":"rgba(239,68,68,.25)")},children:Ae.ok?(0,$c.jsxs)("span",{style:{fontSize:12.5,color:"#4ADE80"},children:["\u2713 Skapad:\xa0",(0,$c.jsx)("a",{href:Ae.url,target:"_blank",rel:"noopener noreferrer",style:{color:"#5DD6CA",wordBreak:"break-all"},children:Ae.url}),Ae.emailSent&&" \xb7 mail skickat"]}):(0,$c.jsxs)("span",{style:{fontSize:12.5,color:"#F87171"},children:["Fel: ",Ae.error]})})]})}),(0,$c.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:12,marginTop:20,alignItems:"center"},children:[(0,$c.jsx)(gg,{style:{margin:0},children:"Prospects"}),(0,$c.jsx)("button",{onClick:Le,style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),(0,$c.jsxs)(xg,{children:[(0,$c.jsxs)(vg,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$c.jsx)("span",{children:"Bolag"}),(0,$c.jsx)("span",{children:"Bransch"}),(0,$c.jsx)("span",{children:"Anst."}),(0,$c.jsx)("span",{children:"Mail skickat"}),(0,$c.jsx)("span",{children:"\xd6ppnat"}),(0,$c.jsx)("span",{children:"\xc5tg\xe4rd"}),(0,$c.jsx)("span",{children:"Skapad"})]}),null===we&&(0,$c.jsx)(Ng,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta prospects."}),0===(null===we||void 0===we?void 0:we.length)&&(0,$c.jsx)(Ng,{children:"Inga prospects \xe4n \u2014 skapa ett ovan."}),(null!==we&&void 0!==we?we:[]).map(e=>{var t;return(0,$c.jsxs)(bg,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$c.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.company_name}),(0,$c.jsx)("span",{style:{fontSize:11.5,color:"rgba(255,255,255,.50)"},children:e.industry}),(0,$c.jsx)("span",{style:{fontSize:12},children:e.employees}),(0,$c.jsx)("span",{style:{fontSize:11,color:e.email_sent_at?"rgba(255,255,255,.5)":"rgba(255,255,255,.2)"},children:_g(e.email_sent_at)}),(0,$c.jsx)("span",{style:{fontSize:11,color:e.opened_at?"#F59E0B":"rgba(255,255,255,.2)"},children:_g(e.opened_at)}),(0,$c.jsx)(kg,{$c:"upload"===e.action?"rgba(74,222,128,.25)":"activate"===e.action?"rgba(93,214,202,.25)":"rgba(255,255,255,.07)",children:null!==(t=e.action)&&void 0!==t?t:"\u2013"}),(0,$c.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.30)"},children:_g(e.created_at)})]},e.id)})]})]})]})}const Cg=vc.div`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`,Ag=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 48px 44px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 32px rgba(0,0,0,.07);
  @media (max-width: 520px) { padding: 36px 24px; }
`,Dg=vc.div`
  margin-bottom: 36px;
`,Fg=vc.p`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin: 0 0 10px;
`,Og=vc.h1`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 10px;
  line-height: 1.3;
`,Tg=vc.p`
  font-size: 14.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin: 0 0 32px;
`,Pg=vc.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,Lg=vc.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  font-size: 15px;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  background: #fff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;
  margin-bottom: 16px;
  &:focus { border-color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  &::placeholder { color: ${e=>{let{theme:t}=e;return t.color.muted}}; }
`,Rg=vc.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin-bottom: 8px;
  letter-spacing: 0.01em;
`,Ig=vc.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 0 24px;
`,Bg=vc(vs)`
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  text-decoration: none;
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`;function Mg(){const e=new URLSearchParams(window.location.search),t=e.get("id"),n=e.get("svar"),[a,i]=(0,r.useState)("ja"===n?"cost":"nej"===n?"submitting-no":"question"),[o,s]=(0,r.useState)(""),[l,d]=(0,r.useState)("idle"),[c,u]=(0,r.useState)("");async function p(e,n){if(t){d("submitting");try{const r=await fetch("/api/outcome-survey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:t,switched:e,actualAnnualCost:n?Number(String(n).replace(/\s/g,"")):null})}),a=await r.json();a.supplier&&u(a.supplier),d("done")}catch{d("error")}}else d("done")}return(0,r.useEffect)(()=>{"nej"===n&&t&&p(!1,null)},[]),"done"===l?(0,$c.jsx)(Cg,{children:(0,$c.jsxs)(Ag,{children:[(0,$c.jsx)(Dg,{children:(0,$c.jsx)(vs,{to:"/",children:(0,$c.jsx)(Pc,{})})}),(0,$c.jsx)(Ig,{children:"\u2713"}),(0,$c.jsx)(Og,{children:"Tack \u2014 det hj\xe4lper oss mycket."}),(0,$c.jsxs)(Tg,{children:["Varje svar g\xf6r Arvo lite mer precis. N\xe4sta kund som analyserar en",c?` ${c}`:"","-faktura drar nytta av det ni just ber\xe4ttade."]}),(0,$c.jsx)(Bc,{as:vs,to:"/testa-faktura",$variant:"gradient",$size:"md",children:"Analysera en ny faktura \u2192"})]})}):"submitting-no"===a||"nej"===n&&"done"!==l?(0,$c.jsx)(Cg,{children:(0,$c.jsxs)(Ag,{style:{textAlign:"center"},children:[(0,$c.jsx)(Dg,{style:{textAlign:"left"},children:(0,$c.jsx)(vs,{to:"/",children:(0,$c.jsx)(Pc,{})})}),(0,$c.jsx)(Tg,{style:{margin:"32px 0 0"},children:"Registrerar ert svar\u2026"})]})}):(0,$c.jsx)(Cg,{children:(0,$c.jsxs)(Ag,{children:[(0,$c.jsx)(Dg,{children:(0,$c.jsx)(vs,{to:"/",children:(0,$c.jsx)(Pc,{})})}),(0,$c.jsx)(Fg,{children:"60-dagars uppf\xf6ljning"}),"question"===a&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Og,{children:"Bytte ni leverant\xf6r efter analysen?"}),(0,$c.jsx)(Tg,{children:"Det tar 30 sekunder och hj\xe4lper oss att bli mer precisa f\xf6r er och alla kommande kunder."}),(0,$c.jsxs)(Pg,{children:[(0,$c.jsx)(Bc,{$variant:"gradient",$size:"md",onClick:()=>i("cost"),children:"Ja, vi bytte \u2192"}),(0,$c.jsx)(Bc,{$variant:"ghost",$size:"md",onClick:()=>p(!1,null),children:"Inte \xe4n"})]})]}),"cost"===a&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Og,{children:"Vad betalar ni nu per \xe5r?"}),(0,$c.jsx)(Tg,{children:"Ange er nya \xe5rskostnad (kr/\xe5r) \u2014 vi j\xe4mf\xf6r med vad vi f\xf6rutsp\xe5dde."}),(0,$c.jsx)(Rg,{htmlFor:"actual-cost",children:"Ny \xe5rskostnad (kr)"}),(0,$c.jsx)(Lg,{id:"actual-cost",type:"text",inputMode:"numeric",placeholder:"t.ex. 48 000",value:o,onChange:e=>s(e.target.value),autoFocus:!0}),(0,$c.jsxs)(Pg,{children:[(0,$c.jsx)(Bc,{$variant:"gradient",$size:"md",disabled:"submitting"===l,onClick:()=>p(!0,o),children:"submitting"===l?"Sparar\u2026":"Skicka \u2192"}),(0,$c.jsx)(Bc,{$variant:"ghost",$size:"sm",onClick:()=>p(!0,null),children:"Hoppa \xf6ver kostnaden"})]}),"error"===l&&(0,$c.jsx)("p",{style:{color:"#D94F3C",fontSize:13,margin:"8px 0 0"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$c.jsx)(Bg,{to:"/",children:"\u2190 Tillbaka till startsidan"})]})})}const Vg=jc`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,Ug=jc`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
`,Kg=jc`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
`,Hg=jc`
  from { stroke-dashoffset: 24; }
  to   { stroke-dashoffset: 0; }
`,Wg=jc`
  to { transform: rotate(360deg); }
`,qg=vc.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: #0A1512;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`,Gg=vc.section`
  height: 100vh;
  min-height: 600px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`,Yg=vc(Gg)`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  background: radial-gradient(ellipse at 50% 30%, rgba(29,176,154,0.10) 0%, transparent 70%),
              #0A1512;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 80%, rgba(29,176,154,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
`,Jg=vc.p`
  margin: 16px 0 4px;
  font-size: 11px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .18em;
  animation: ${Vg} 0.7s ease both;
`,Qg=vc.p`
  margin: 0 0 48px;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  animation: ${Vg} 0.7s 0.1s ease both;
`,Xg=vc.p`
  margin: 0 0 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .12em;
  animation: ${Vg} 0.7s 0.2s ease both;
`,Zg=vc.p`
  margin: 0 0 6px;
  font-size: clamp(52px, 9vw, 80px);
  font-weight: 800;
  color: #fff;
  line-height: 1;
  letter-spacing: -.03em;
  animation: ${Vg} 0.7s 0.25s ease both;
`,ex=vc.span`
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 400;
  color: rgba(255,255,255,0.40);
  margin-left: 8px;
`,tx=vc.p`
  margin: 0 0 56px;
  font-size: 17px;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  animation: ${Vg} 0.7s 0.35s ease both;

  strong { color: #fff; }
`,nx=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: ${Vg} 0.7s 0.5s ease both;
`,rx=vc.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .06em;
`,ax=vc.div`
  width: 20px;
  height: 20px;
  color: rgba(29,176,154,0.5);
  animation: ${Ug} 1.6s ease-in-out infinite;
`,ix=vc.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;

  @media (max-width: 480px) { display: none; }
`,ox=vc.button`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: ${e=>{let{$active:t}=e;return t?"#1DB09A":"rgba(255,255,255,0.20)"}};
  transform: scale(${e=>{let{$active:t}=e;return t?1.5:1}});
  transition: background 0.3s, transform 0.3s;
  cursor: pointer;
  padding: 0;

  &:hover { background: rgba(29,176,154,0.6); }
`,sx=vc(Gg)`
  padding: 0;
  background: radial-gradient(ellipse at 80% 20%, rgba(29,176,154,0.07) 0%, transparent 60%),
              #0A1512;
`,lx=vc.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 56px 36px 36px;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) { padding: 48px 24px 28px; }
`,dx=vc.p`
  margin: 0 0 24px;
  font-size: 10px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .20em;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,cx=vc.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(29,176,154,0.12);
  border: 1px solid rgba(29,176,154,0.25);
  border-radius: 100px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #1DB09A;
  margin-bottom: 20px;
  transition-delay: 0.05s;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.05s ease, transform 0.5s 0.05s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,ux=vc.span`
  display: inline-flex;
  align-items: center;
  background: ${e=>{let{$type:t}=e;return"recommendation"===t?"rgba(29,176,154,0.15)":"cost_trend"===t?"rgba(245,158,11,0.15)":"price_alert"===t?"rgba(192,57,43,0.12)":"rgba(245,158,11,0.12)"}};
  color: ${e=>{let{$type:t}=e;return"recommendation"===t?"#1DB09A":"cost_trend"===t?"#F59E0B":"price_alert"===t?"#C0392B":"#F59E0B"}};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .12em;
  padding: 3px 8px;
  border-radius: 4px;
  margin-right: 8px;
`,px=vc.h1`
  margin: 0 0 12px;
  font-size: clamp(24px, 4.5vw, 38px);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -.02em;

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s 0.1s ease, transform 0.55s 0.1s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,mx=vc.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.5;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.17s ease, transform 0.5s 0.17s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,fx=vc.div`
  display: flex;
  gap: 16px;
  margin-bottom: 28px;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.24s ease, transform 0.5s 0.24s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}

  @media (max-width: 480px) { flex-direction: column; gap: 12px; }
`,hx=vc.div`
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 18px 20px;
`,gx=vc.p`
  margin: 0 0 4px;
  font-size: ${e=>{let{$primary:t}=e;return t?"clamp(28px, 5vw, 40px)":"clamp(20px, 3.5vw, 28px)"}};
  font-weight: 800;
  color: ${e=>{let{$primary:t}=e;return t?"#fff":"rgba(255,255,255,0.75)"}};
  line-height: 1;
  letter-spacing: -.02em;
`,xx=vc.span`
  font-size: 0.55em;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  margin-left: 4px;
`,vx=vc.p`
  margin: 0;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .08em;
`,bx=vc.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  flex: 1;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.30s ease, transform 0.5s 0.30s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,kx=vc.div`
  padding-top: 24px;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.38s ease, transform 0.5s 0.38s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,yx=vc.button`
  width: 100%;
  padding: 17px 24px;
  border: none;
  border-radius: 12px;
  background: ${e=>{let{$done:t}=e;return t?"rgba(29,176,154,0.15)":"linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%)"}};
  color: ${e=>{let{$done:t}=e;return t?"#1DB09A":"#fff"}};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: .01em;
  cursor: ${e=>{let{$done:t,$loading:n}=e;return t||n?"default":"pointer"}};
  transition: opacity 0.2s, transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 14px;

  &:hover:not(:disabled) {
    opacity: ${e=>{let{$done:t}=e;return t?1:.92}};
    transform: ${e=>{let{$done:t}=e;return t?"none":"translateY(-1px)"}};
  }

  &:active:not(:disabled) { transform: translateY(0); }
`,jx=vc.span`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${Wg} 0.7s linear infinite;
`,wx=(vc.button`
  width: 100%;
  background: none;
  border: none;
  color: rgba(255,255,255,0.30);
  font-size: 13px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
  text-align: center;

  &:hover { color: rgba(255,255,255,0.55); }
`,vc(Gg)`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 32px;
  background: radial-gradient(ellipse at 50% 40%, rgba(29,176,154,0.09) 0%, transparent 65%),
              #0A1512;
`),Sx=vc.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(29,176,154,0.15);
  border: 1.5px solid rgba(29,176,154,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: ${Vg} 0.6s ease both;

  svg { overflow: visible; }

  svg path {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: ${Hg} 0.5s 0.3s ease forwards;
  }
`,$x=vc.h2`
  margin: 0 0 12px;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  animation: ${Vg} 0.6s 0.1s ease both;
`,Nx=vc.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  max-width: 440px;
  animation: ${Vg} 0.6s 0.2s ease both;
`,_x=vc.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${Vg} 0.6s 0.3s ease both;
`,Ex=vc.div`
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.20);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
`,zx=vc.span`
  font-size: 16px;
  flex-shrink: 0;
`,Cx=vc.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.80);
  line-height: 1.4;

  strong { color: #fff; }
`,Ax=vc.p`
  margin: 0 0 36px;
  font-size: 14px;
  color: #1DB09A;
  animation: ${Vg} 0.6s 0.4s ease both;
`,Dx=vc.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 14px 24px;
  color: rgba(255,255,255,0.70);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
  animation: ${Vg} 0.6s 0.45s ease both;

  &:hover {
    background: rgba(255,255,255,0.11);
    color: #fff;
  }
`,Fx=vc.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  gap: 20px;
`,Ox=vc.div`
  display: flex;
  gap: 8px;
`,Tx=vc.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1DB09A;
  animation: ${Kg} 1.2s ${e=>{let{$i:t}=e;return.2*t}}s ease-in-out infinite;
`,Px=vc.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  letter-spacing: .04em;
`,Lx=vc.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  padding: 32px;
  text-align: center;
`,Rx=vc.div`
  font-size: 40px;
  margin-bottom: 20px;
`,Ix=vc.h1`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`,Bx=vc.p`
  margin: 0 0 32px;
  font-size: 15px;
  color: rgba(255,255,255,0.45);
  max-width: 360px;
  line-height: 1.6;
`,Mx=vc.a`
  background: linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%);
  color: #fff;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  transition: opacity 0.2s;

  &:hover { opacity: 0.88; }
`,Vx=e=>Math.round(null!==e&&void 0!==e?e:0).toLocaleString("sv-SE");const Ux={recommendation:"Bytesrekommendation",cost_trend:"Prish\xf6jning",overpaying:"\xd6verpris",price_alert:"Prish\xf6jningsvarning"};function Kx(e){if(!e)return"";const[t,n]=e.split("-").map(Number),r=new Date(t,n-1,1).toLocaleString("sv-SE",{month:"long",year:"numeric"});return r.charAt(0).toUpperCase()+r.slice(1)}const Hx=e=>{let{size:t=36}=e;return(0,$c.jsxs)("svg",{width:t,height:t,viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",children:[(0,$c.jsx)("defs",{children:(0,$c.jsxs)("linearGradient",{id:"briefingGrad",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$c.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$c.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$c.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#briefingGrad)"})]})},Wx=()=>(0,$c.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:(0,$c.jsx)("path",{d:"M10 4v12M4 10l6 6 6-6",stroke:"#1DB09A",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),qx=()=>(0,$c.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",fill:"none",children:(0,$c.jsx)("path",{d:"M6 14l6 6 10-12",stroke:"#1DB09A",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})});function Gx(){var e;const{token:t}=mo(),[n,a]=(0,r.useState)("loading"),[i,o]=(0,r.useState)(null),[s,l]=(0,r.useState)(""),[d,c]=(0,r.useState)(0),[u,p]=(0,r.useState)({}),[m,f]=(0,r.useState)({}),[h,g]=(0,r.useState)({}),x=(0,r.useRef)(null),v=(0,r.useRef)([]),b=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1300;const[n,a]=(0,r.useState)(0);return(0,r.useEffect)(()=>{if(!e)return;const n=performance.now();let r;const i=o=>{const s=Math.min(1,(o-n)/t),l=1-Math.pow(1-s,3);a(Math.round(l*e)),s<1&&(r=requestAnimationFrame(i))};return r=requestAnimationFrame(i),()=>cancelAnimationFrame(r)},[e,t]),n}("ready"===n?null===i||void 0===i?void 0:i.totalSavingPotential:0);(0,r.useEffect)(()=>{if(!t)return a("error"),void l("Ogiltig l\xe4nk");fetch(`/api/briefing?token=${encodeURIComponent(t)}`).then(e=>e.json()).then(e=>{var t,n;if(!e.ok)return a("error"),void l(null!==(n=e.error)&&void 0!==n?n:"Ok\xe4nt fel");o(e.briefing),g(null!==(t=e.briefing.actionsTaken)&&void 0!==t?t:{}),a("ready")}).catch(()=>{a("error"),l("Kunde inte h\xe4mta briefingen")})},[t]),(0,r.useEffect)(()=>{if("ready"!==n)return;const e=new IntersectionObserver(e=>{e.forEach(e=>{const t=Number(e.target.dataset.cardIndex);e.isIntersecting&&(p(e=>({...e,[t]:!0})),c(t))})},{threshold:.4,root:x.current});return v.current.forEach(t=>{t&&e.observe(t)}),()=>e.disconnect()},[n,i]);const k=(0,r.useCallback)(async(e,n)=>{if("loading"!==m[e]&&"done"!==m[e]){f(t=>({...t,[e]:"loading"}));try{const a=await fetch(`/api/briefing?token=${encodeURIComponent(t)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({insightId:e,action:n})}),i=await a.json();var r;if(a.ok&&i.ok)f(t=>({...t,[e]:"done"})),g(null!==(r=i.actionsTaken)&&void 0!==r?r:{});else f(t=>({...t,[e]:"idle"}))}catch{f(t=>({...t,[e]:"idle"}))}}},[t,m]),y=(0,r.useCallback)(e=>{const t=v.current[e];t&&t.scrollIntoView({behavior:"smooth",block:"start"})},[]);if("loading"===n)return(0,$c.jsxs)(Fx,{children:[(0,$c.jsx)(Ox,{children:[0,1,2].map(e=>(0,$c.jsx)(Tx,{$i:e},e))}),(0,$c.jsx)(Px,{children:"H\xe4mtar din Arvo-briefing\u2026"})]});if("error"===n)return(0,$c.jsxs)(Lx,{children:[(0,$c.jsx)(Rx,{children:"\ud83d\udd12"}),(0,$c.jsx)(Ix,{children:"Briefingen hittades inte"}),(0,$c.jsxs)(Bx,{children:[s||"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig."," ","Ladda upp en ny faktura s\xe5 genererar Arvo en uppdaterad briefing \xe5t er."]}),(0,$c.jsx)(Mx,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const j=null!==(e=null===i||void 0===i?void 0:i.insights)&&void 0!==e?e:[],w=1+j.length+1,S=Object.keys(h).length>0;return(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(ix,{children:Array.from({length:w},(e,t)=>(0,$c.jsx)(ox,{$active:d===t,onClick:()=>y(t),"aria-label":`G\xe5 till kort ${t+1}`},t))}),(0,$c.jsxs)(qg,{ref:x,children:[(0,$c.jsxs)(Yg,{"data-card-index":"0",ref:e=>{v.current[0]=e},children:[(0,$c.jsx)(Hx,{size:44}),(0,$c.jsx)(Jg,{children:"Arvo Intelligence"}),(0,$c.jsx)(Qg,{children:Kx(null===i||void 0===i?void 0:i.period)}),(0,$c.jsx)(Xg,{children:"Potentiell besparing"}),(0,$c.jsxs)(Zg,{children:[Vx(b),(0,$c.jsx)(ex,{children:"kr/\xe5r"})]}),(0,$c.jsxs)(tx,{children:["Arvo har identifierat"," ",(0,$c.jsxs)("strong",{children:[j.length," ",1===j.length?"besparingsinsikt":"besparingsinsikter"]})," ","f\xf6r ert bolag"]}),(0,$c.jsxs)(nx,{children:[(0,$c.jsx)(rx,{children:"Scrolla f\xf6r att se insikterna"}),(0,$c.jsx)(ax,{children:(0,$c.jsx)(Wx,{})})]})]}),j.map((e,t)=>{var n,r,a,i,o,s,l,d,c,p,f,g;const x=t+1,b=!!u[x],y=null!==(n=m[e.id])&&void 0!==n?n:"idle",w="done"===y||!!h[e.id],S="loading"===y;return(0,$c.jsx)(sx,{"data-card-index":String(x),ref:e=>{v.current[x]=e},children:(0,$c.jsxs)(lx,{children:[(0,$c.jsxs)(dx,{$visible:b,children:["INSIKT ",t+1," AV ",j.length]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)(ux,{$type:e.type,children:null!==(r=Ux[e.type])&&void 0!==r?r:e.type}),(0,$c.jsx)(cx,{$visible:b,children:e.supplier})]}),(0,$c.jsx)(px,{$visible:b,children:e.headline}),(0,$c.jsx)(mx,{$visible:b,children:e.subheadline}),(0,$c.jsxs)(fx,{$visible:b,children:[(0,$c.jsxs)(hx,{children:[(0,$c.jsxs)(gx,{$primary:!0,children:[Vx(null===(a=e.metric)||void 0===a||null===(i=a.primary)||void 0===i?void 0:i.value),(0,$c.jsx)(xx,{children:"kr"})]}),(0,$c.jsx)(vx,{children:null===(o=e.metric)||void 0===o||null===(s=o.primary)||void 0===s?void 0:s.label})]}),null!=(null===(l=e.metric)||void 0===l||null===(d=l.secondary)||void 0===d?void 0:d.value)&&(0,$c.jsxs)(hx,{children:[(0,$c.jsxs)(gx,{children:["number"===typeof e.metric.secondary.value&&null!==(c=e.metric.secondary.label)&&void 0!==c&&c.includes("%")?`${e.metric.secondary.value}%`:Vx(e.metric.secondary.value),!(null!==(p=e.metric.secondary.label)&&void 0!==p&&p.includes("%"))&&(0,$c.jsx)(xx,{children:"kr"})]}),(0,$c.jsx)(vx,{children:null===(f=e.metric)||void 0===f||null===(g=f.secondary)||void 0===g?void 0:g.label})]})]}),(0,$c.jsx)(bx,{$visible:b,children:e.context}),e.action&&(0,$c.jsx)(kx,{$visible:b,children:(0,$c.jsxs)(yx,{$done:w,$loading:S,disabled:w||S,onClick:()=>k(e.id,e.action.label),children:[S&&(0,$c.jsx)(jx,{}),w?"\u2713 Arvo \xe4r p\xe5 det \u2014 vi \xe5terkommer inom 24 timmar":e.action.label]})})]})},e.id)}),(0,$c.jsxs)(wx,{"data-card-index":String(w-1),ref:e=>{v.current[w-1]=e},children:[(0,$c.jsx)(Sx,{children:(0,$c.jsx)(qx,{})}),(0,$c.jsx)($x,{children:"Er Arvo-briefing \xe4r klar"}),(0,$c.jsx)(Nx,{children:S?"Bra jobbat \u2014 ni har aktiverat Arvo. Vi granskar era avtal och \xe5terkommer med en konkret handlingsplan.":"Era insikter v\xe4ntar p\xe5 er. Ni kan alltid komma tillbaka till denna sida via l\xe4nken i mailet."}),S&&(0,$c.jsx)(_x,{children:Object.entries(h).map(e=>{let[t,n]=e;return(0,$c.jsxs)(Ex,{children:[(0,$c.jsx)(zx,{children:"\u2713"}),(0,$c.jsxs)(Cx,{children:[(0,$c.jsx)("strong",{children:"approve_switch"===n.type?"Bytesuppdrag":"Bevakningsuppdrag"})," ","aktiverat f\xf6r ",(0,$c.jsx)("strong",{children:n.supplier}),n.estimatedNetSaving>0&&` \xb7 Potentiell besparing: ${Vx(n.estimatedNetSaving)} kr/\xe5r`]})]},t)})}),S&&(0,$c.jsx)(Ax,{children:"Arvo \xe5terkommer inom 24 timmar med n\xe4sta steg."}),(0,$c.jsx)(Dx,{href:"/testa-faktura",children:"Analysera fler fakturor \u2192"})]})]})]})}const Yx=jc`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`,Jx=jc`
  from { opacity: 0; transform: translateY(-24px) scale(0.95); }
  65%  { transform: translateY(4px) scale(1.005); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`,Qx=jc`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(29,176,154,0); }
`,Xx=jc`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,Zx=vc.div`
  background: #ffffff;
  color: #0E1A17;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
`,ev=vc.section`
  min-height: 100vh;
  background: #060D0B;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 90% 55% at 50% 10%, rgba(29,176,154,0.10) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 80% 85%, rgba(29,176,154,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
`,tv=vc.div`
  position: relative;
  z-index: 1;
  max-width: 680px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`,nv=vc.div`
  width: 100%;
  max-width: 400px;
  background: rgba(6, 11, 10, 0.98);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.50);
  border-radius: 22px;
  padding: 20px 22px 22px;
  margin-bottom: 56px;
  text-align: left;
  animation: ${Jx} 0.75s cubic-bezier(0.34, 1.46, 0.64, 1) both;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.55) inset,
    0 -1px 0 rgba(255,255,255,0.06) inset,
    0 0 40px rgba(255,255,255,0.04),
    0 48px 120px rgba(0,0,0,0.70),
    0 8px 32px rgba(0,0,0,0.40);
`,rv=vc.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
`,av=vc.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${Qx} 2.2s ease-in-out infinite;
`,iv=vc.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: .02em;
  flex: 1;
`,ov=vc.span`
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .01em;
`,sv=vc.p`
  margin: 0 0 7px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -.015em;
`,lv=vc.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;

  strong {
    color: rgba(255,255,255,0.88);
    font-weight: 600;
  }
`,dv=vc.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: #1DB09A;
  cursor: pointer;
  letter-spacing: -.01em;
  transition: opacity 0.2s;

  &:hover { opacity: 0.70; }
`,cv=vc.h1`
  margin: 0 0 20px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(38px, 6.5vw, 76px);
  font-weight: 700;
  color: #fff;
  line-height: 1.10;
  letter-spacing: -.02em;
  animation: ${Yx} 0.8s 0.28s both ease-out;

  em {
    font-style: italic;
    font-weight: 400;
  }
`,uv=vc.p`
  margin: 0 0 52px;
  font-size: clamp(16px, 2.2vw, 20px);
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
  animation: ${Yx} 0.8s 0.42s both ease-out;
`,pv=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: ${Yx} 0.8s 0.56s both ease-out;
`,mv=vc.a`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 17px 40px;
  border-radius: 100px;
  text-decoration: none;
  letter-spacing: -.01em;
  box-shadow: 0 8px 40px rgba(27,122,110,0.28);
  transition: opacity 0.2s, transform 0.15s;

  &:hover {
    opacity: 0.90;
    transform: translateY(-2px);
  }
  &:active { transform: translateY(0); }
`,fv=vc.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.52);
  letter-spacing: .01em;
`,hv=vc.section`
  padding: 80px 24px;
  background: #ffffff;

  @media (max-width: 640px) { padding: 64px 20px; }

  & > * {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
`,gv=vc.div`
  text-align: center;
  margin-bottom: 48px;
  @media (max-width: 640px) { margin-bottom: 36px; }
`,xv=vc.p`
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  color: #1B7A6E;
  text-transform: uppercase;
  letter-spacing: .20em;
  text-align: center;
`,vv=vc.h2`
  margin: 0 0 48px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  line-height: 1.12;
  letter-spacing: -.02em;
  text-align: center;

  @media (max-width: 640px) { margin-bottom: 36px; }
`,bv=(vc.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,vc.div`
  background: #fff;
  border: 1px solid #D5E2DC;
  border-top: 3px solid #0E1A17;
  border-radius: 0 0 18px 18px;
  padding: 26px 26px 22px;
  box-shadow: 0 2px 12px rgba(14,26,23,0.06);
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,vc.div`
  display: flex;
  align-items: baseline;
  gap: 7px;
  margin-bottom: 6px;
`,vc.span`
  font-size: 10px;
  font-weight: 700;
  color: #9F3B22;
  letter-spacing: .10em;
  flex-shrink: 0;
  opacity: 0.55;
`,vc.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 16px;
  font-weight: 600;
  color: #0E1A17;
  line-height: 1.25;
`,vc.p`
  margin: 6px 0 16px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: ${e=>{let{$isText:t}=e;return t?"clamp(20px,2.8vw,26px)":"clamp(24px,3.2vw,32px)"}};
  font-weight: 700;
  color: #9F3B22;
  letter-spacing: -.025em;
  line-height: 1.05;
`,vc.p`
  margin: 0;
  font-size: 13px;
  color: #5C6E68;
  line-height: 1.6;
  flex: 1;
`,vc.p`
  margin: 16px 0 0;
  padding: 0 0 0 13px;
  border-left: 2.5px solid #1B7A6E;
  font-size: 12.5px;
  font-style: normal;
  color: #2D4A44;
  font-weight: 500;
  line-height: 1.6;

  &::before {
    content: 'MED ARVO';
    display: block;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .16em;
    color: #1B7A6E;
    margin-bottom: 5px;
  }
`,vc.div`
  margin-top: 40px;
  padding-top: 28px;
  border-top: 2px solid #0E1A17;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,vc.p`
  margin: 0 0 4px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(40px, 7vw, 60px);
  font-weight: 700;
  color: #9F3B22;
  letter-spacing: -.03em;
  line-height: 1;
`,vc.p`
  margin: 0;
  font-size: 14px;
  color: #5C6E68;
  font-style: italic;
  line-height: 1.4;
`,vc.p`
  margin: 0;
  font-size: 12px;
  color: #1B7A6E;
  font-weight: 600;
  letter-spacing: .01em;
  text-align: right;

  @media (max-width: 600px) { text-align: left; }
`,vc.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 620px) { grid-template-columns: 1fr; }
`),kv=vc.div`
  background: #fff;
  border: 1px solid #D5E2DC;
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(14,26,23,0.06);
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.60s ${e=>{let{$i:t}=e;return.08*t+"s"}} ease,
    transform 0.60s ${e=>{let{$i:t}=e;return.08*t+"s"}} ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}

  &:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 16px 48px rgba(14,26,23,0.13);
    border-color: #B8D0C8;
    transition:
      transform 0.28s ease,
      box-shadow 0.28s ease,
      border-color 0.28s ease;
  }

  @media (max-width: 620px) { padding: 22px 20px; }
`,yv=vc.p`
  margin: 0;
  padding: 0 0 0 12px;
  border-left: 2.5px solid #9F3B22;
  font-size: 13px;
  font-style: italic;
  color: #4A5E58;
  line-height: 1.6;
`,jv=vc.div`
  height: 1px;
  background: #E4EDE9;
  margin: 16px 0;
`,wv=(vc.span`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid #1B7A6E;
  color: #1B7A6E;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,vc.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 18px;
  font-weight: 600;
  color: #0E1A17;
  line-height: 1.25;
`),Sv=vc.p`
  margin: 0;
  font-size: 13.5px;
  color: #5C6E68;
  line-height: 1.6;
  flex: 1;
`,$v=vc.p`
  margin: 0;
  font-size: 12.5px;
  color: #1B7A6E;
  font-style: italic;
  line-height: 1.55;
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid #D5E2DC;
`,Nv=vc.section`
  background: #000;
  padding: 88px 24px;

  @media (max-width: 640px) { padding: 72px 20px; }
`,_v=vc.div`
  max-width: 760px;
  margin: 0 auto;
`,Ev=vc.p`
  margin: 0 0 56px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.28);
  text-transform: uppercase;
  letter-spacing: .22em;
`,zv=vc.div`
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease,
    transform 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Cv=vc.span`
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #4FBFB3;
  text-transform: uppercase;
  letter-spacing: .20em;
  margin-bottom: 14px;
`,Av=vc.p`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(30px, 5.5vw, 60px);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -.03em;
  text-align: left;
`,Dv=vc.div`
  width: 1px;
  height: 56px;
  background: rgba(255,255,255,0.10);
  margin: 52px 0;
`,Fv=vc.section`
  background: #ffffff;
  padding: 96px 24px;
  border-top: 1px solid #E8EFEC;
  text-align: center;

  @media (max-width: 640px) { padding: 72px 20px; }
`,Ov=vc.div`
  max-width: 480px;
  margin: 0 auto;
`,Tv=vc.h2`
  margin: 0 0 16px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  letter-spacing: -.025em;
  line-height: 1.12;
`,Pv=vc.p`
  margin: 0 0 40px;
  font-size: 16px;
  color: #5C6E68;
  line-height: 1.6;
`,Lv=vc.p`
  margin: 24px 0 0;
  font-size: 12px;
  color: #3F4B47;
  letter-spacing: .01em;
  opacity: 0.65;
`,Rv=vc.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #F0F8F6;
  border: 1px solid #C8E0DA;
  border-radius: 14px;
  padding: 14px 18px;
  margin-bottom: 32px;
  text-align: left;
  font-size: 13.5px;
  color: #3F4B47;
  line-height: 1.55;

  strong { color: #1B7A6E; font-weight: 700; }
`,Iv=vc.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 0;
`,Bv=vc.input`
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #D5E2DC;
  border-radius: 12px;
  padding: 15px 18px;
  font-size: 15px;
  color: #0E1A17;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;

  &::placeholder { color: #5C6E68; opacity: 0.55; }

  &:focus {
    border-color: #1B7A6E;
    box-shadow: 0 0 0 3px rgba(27,122,110,0.12);
  }
`,Mv=vc.button`
  width: 100%;
  background: linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%);
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.01em;
  box-shadow: 0 8px 32px rgba(27,122,110,0.22);
  transition: opacity 0.18s, transform 0.15s;
  margin-top: 4px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  &:hover { opacity: 0.88; transform: translateY(-2px); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.40; cursor: not-allowed; transform: none; }
`,Vv=vc.p`
  font-size: 12.5px;
  color: #9F3B22;
  margin: 4px 0 0;
  line-height: 1.5;
`,Uv=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
`,Kv=vc.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #E5EFEA;
  border: 1.5px solid #1B7A6E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #1B7A6E;
  margin-bottom: 8px;
  animation: ${Xx} 0.55s cubic-bezier(0.34,1.46,0.64,1) both;
`,Hv=vc.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0E1A17;
`,Wv=vc.p`
  margin: 0;
  font-size: 14px;
  color: #5C6E68;
  line-height: 1.6;
`,qv=vc.p`
  margin: 0;
  font-size: 13px;
  color: #3F4B47;
  opacity: 0.55;
  font-style: italic;
`,Gv=[{context:"Telia h\xf6jer 11% i januari. Ni m\xe4rker det i september \u2014 \xe5tta m\xe5nader senare.",title:"Marknadsintelligens f\xf6re fakturan",body:"Arvo ser vad som h\xe4nder hos j\xe4mf\xf6rbara bolag i n\xe4tverket \u2014 och varnar er innan h\xf6jningen syns p\xe5 er faktura.",quote:'"6 av 14 bolag i er bransch fick Telias prish\xf6jning f\xf6rra m\xe5naden."'},{context:"Tele2-avtalet f\xf6rnyas automatiskt. Ni m\xe4rkte det inte. Nu \xe4r ni l\xe5sta ett \xe5r till.",title:"Kontraktskalender med handlingsplan",body:"Inte bara p\xe5minnelser \u2014 utan exakt vad som ska g\xf6ras, n\xe4r och varf\xf6r. Arvo r\xe4knar bakl\xe4nges fr\xe5n varje f\xf6rnyelsedatum.",quote:'"87 dagar kvar. Aktivera byte senast 15 september."'},{context:"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr. Ni betalar differensen utan att veta om det.",title:"Faktura mot avtal",body:"Leverant\xf6rer fakturerar fel \u2014 ofta. Arvo kontrollerar automatiskt varje faktura mot k\xe4nt avtalspris och flaggar avvikelser direkt.",quote:'"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr."'},{context:"Kostnaderna rullar p\xe5. Ingen sammanfattar. Styrelsen fr\xe5gar \u2014 ingen har svaret.",title:"M\xe5natlig CFO-brief",body:"En professionell rapport \u2014 klar f\xf6r styrelserummet \u2014 med vad Arvo hittat, vad som sparats och vad som \xe4r p\xe5 v\xe4g.",quote:'"Tre avtal bevakas. Ett flaggat f\xf6r \xe5tg\xe4rd n\xe4sta vecka."'}];function Yv(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.12;const t=(0,r.useRef)(null),[n,a]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{const n=t.current;if(!n)return;const r=new IntersectionObserver(e=>{let[t]=e;t.isIntersecting&&(a(!0),r.disconnect())},{threshold:e});return r.observe(n),()=>r.disconnect()},[e]),[t,n]}const Jv=()=>(0,$c.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",style:{flexShrink:0},children:[(0,$c.jsx)("defs",{children:(0,$c.jsxs)("linearGradient",{id:"intelig",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$c.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$c.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$c.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#intelig)"})]}),Qv=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function Xv(){var e;const[t,n]=Yv(.08),[a,i]=Yv(.12),[o]=js(),s=o.get("savings")?Number(o.get("savings")):null,l=null!==(e=o.get("supplier"))&&void 0!==e?e:null,[d,c]=(0,r.useState)(""),[u,p]=(0,r.useState)(""),[m,f]=(0,r.useState)("idle"),[h,g]=(0,r.useState)("");return(0,$c.jsxs)(Zx,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsx)(ev,{children:(0,$c.jsxs)(tv,{children:[(0,$c.jsxs)(nv,{children:[(0,$c.jsxs)(rv,{children:[(0,$c.jsx)(Jv,{}),(0,$c.jsx)(av,{}),(0,$c.jsx)(iv,{children:"Arvo Intelligence"}),(0,$c.jsx)(ov,{children:"Just nu"})]}),(0,$c.jsx)(sv,{children:"Arvo har detekterat n\xe5got"}),(0,$c.jsxs)(lv,{children:["Telia h\xf6jde priset f\xf6r ",(0,$c.jsx)("strong",{children:"8 av 14 bolag"})," i er bransch f\xf6rra m\xe5naden. Er n\xe4sta faktura tr\xe4ffar om"," ",(0,$c.jsx)("strong",{children:"12 dagar."})]}),(0,$c.jsx)(dv,{as:vs,to:"/testa-faktura",children:"Se vad det inneb\xe4r f\xf6r er \u2192"})]}),(0,$c.jsxs)(cv,{children:["Arvo m\xe4rkte det.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Ni visste inte om det \xe4nnu."})]}),(0,$c.jsx)(uv,{children:"Ni ska inte beh\xf6va h\xe5lla koll. Det \xe4r Arvos jobb."}),(0,$c.jsxs)(pv,{children:[(0,$c.jsx)(mv,{as:"a",href:"#aktivera",children:"Aktivera Arvo Intelligence"}),(0,$c.jsx)(fv,{children:"1 995 kr/m\xe5n \xb7 Ingen bindningstid"})]})]})}),(0,$c.jsxs)(hv,{ref:t,children:[(0,$c.jsxs)(gv,{children:[(0,$c.jsx)(xv,{children:"Arvo Intelligence"}),(0,$c.jsx)(vv,{style:{marginBottom:0},children:"Det Arvo ser \u2014 som annars f\xf6rsvinner"})]}),(0,$c.jsx)(bv,{children:Gv.map((e,t)=>(0,$c.jsxs)(kv,{$i:t,$visible:n,children:[(0,$c.jsx)(yv,{children:e.context}),(0,$c.jsx)(jv,{}),(0,$c.jsx)(wv,{children:e.title}),(0,$c.jsx)(Sv,{children:e.body}),(0,$c.jsx)($v,{children:e.quote})]},t))})]}),(0,$c.jsx)(Nv,{ref:a,children:(0,$c.jsxs)(_v,{children:[(0,$c.jsx)(Ev,{children:"Den enda finansiella partnern som..."}),(0,$c.jsxs)(zv,{$i:0,$visible:i,children:[(0,$c.jsx)(Cv,{children:"Regel 1"}),(0,$c.jsx)(Av,{children:"Arvo vaktar er f\xf6r 1 995 kr/m\xe5n."})]}),(0,$c.jsx)(Dv,{}),(0,$c.jsxs)(zv,{$i:1,$visible:i,children:[(0,$c.jsx)(Cv,{children:"Regel 2"}),(0,$c.jsx)(Av,{children:"Ni beh\xe5ller 80% av allt vi sparar er."})]})]})}),(0,$c.jsx)(Fv,{id:"aktivera",children:(0,$c.jsxs)(Ov,{children:["sent"!==m&&(0,$c.jsxs)(Tv,{children:["Arvo b\xf6rjar bevaka",(0,$c.jsx)("br",{}),"imorgon bitti."]}),"sent"===m?(0,$c.jsxs)(Uv,{children:[(0,$c.jsx)(Kv,{children:"\u2713"}),(0,$c.jsx)(Hv,{children:"Aktiverat."}),(0,$c.jsxs)(Wv,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$c.jsx)("br",{}),"Vi h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),d&&(0,$c.jsx)(qv,{children:d})]}):(0,$c.jsxs)($c.Fragment,{children:[null!=s?(0,$c.jsx)(Rv,{children:l?(0,$c.jsxs)($c.Fragment,{children:["Vi identifierade redan ",(0,$c.jsxs)("strong",{children:[Qv(s),"\xa0kr/\xe5r"]})," hos ",l,". Den besparingen v\xe4ntar."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi identifierade redan ",(0,$c.jsxs)("strong",{children:[Qv(s),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})}):(0,$c.jsx)(Pv,{children:"E-post och bolagsnamn \u2014 klart p\xe5 30 sekunder."}),(0,$c.jsxs)(Iv,{onSubmit:async e=>{e.preventDefault();const t=d.trim();if(t&&"submitting"!==m){f("submitting"),g("");try{var n;const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==l&&void 0!==l?l:u.trim()||void 0,netSaving:null!==s&&void 0!==s?s:void 0,source:"intelligence-page"})});if(!e.ok)throw new Error(null!==(n=(await e.json().catch(()=>({}))).error)&&void 0!==n?n:"err");f("sent")}catch{g("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),f("error")}}},children:[(0,$c.jsx)(Bv,{type:"email",placeholder:"er@foretag.se",value:d,onChange:e=>c(e.target.value),required:!0,autoComplete:"email"}),(0,$c.jsx)(Bv,{type:"text",placeholder:"Bolagsnamn",value:u,onChange:e=>p(e.target.value),autoComplete:"organization"}),(0,$c.jsx)(Mv,{type:"submit",disabled:"submitting"===m,children:"submitting"===m?"\u2026":"Aktivera bevakningen \u2192"}),h&&(0,$c.jsx)(Vv,{children:h})]})]}),(0,$c.jsx)(Lv,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo startar bevakningen inom 24h"})]})}),(0,$c.jsx)(vu,{})]})}const Zv=jc`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`,eb=jc`
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`,tb=jc`
  from { stroke-dashoffset: 60; opacity: 0; }
  to   { stroke-dashoffset: 0;  opacity: 1; }
`,nb=jc`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,rb=jc`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(29,176,154,0); }
`,ab=vc.div`
  background: #060D0B;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
`,ib=vc.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 20px 80px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 50% 0%, rgba(29,176,154,0.13) 0%, transparent 65%),
      radial-gradient(ellipse 40% 30% at 80% 90%, rgba(29,176,154,0.04) 0%, transparent 55%);
    pointer-events: none;
  }
`,ob=vc.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
`,sb=vc.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 32px;
  animation: ${Zv} 0.6s ease both;
`,lb=vc.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${rb} 2.4s ease-in-out infinite;
`,db=vc.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #1DB09A;
`,cb=vc.h1`
  font-size: clamp(30px, 6vw, 50px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #fff;
  text-align: center;
  margin: 0 0 16px;
  animation: ${Zv} 0.6s 0.08s ease both;
`,ub=vc.p`
  font-size: 15px;
  color: rgba(255,255,255,0.42);
  text-align: center;
  margin: 0 0 40px;
  line-height: 1.5;
  animation: ${Zv} 0.6s 0.14s ease both;
`,pb=vc.div`
  width: 100%;
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.22);
  border-radius: 14px;
  padding: 14px 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${Zv} 0.6s 0.18s ease both;
`,mb=vc.span`
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1;
`,fb=vc.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.70);
  line-height: 1.55;

  strong {
    color: #1DB09A;
    font-weight: 700;
  }
`,hb=vc.div`
  width: 100%;
  background: rgba(10,22,18,0.82);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 24px;
  padding: 32px 28px 28px;
  box-shadow:
    0 40px 100px rgba(0,0,0,0.55),
    0 1px 0 rgba(255,255,255,0.06) inset;
  animation: ${eb} 0.65s 0.1s cubic-bezier(0.34,1.28,0.64,1) both;
`,gb=vc.h2`
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 6px;
  line-height: 1.2;
`,xb=vc.p`
  font-size: 13px;
  color: rgba(255,255,255,0.40);
  margin: 0 0 24px;
  line-height: 1.5;
`,vb=vc.a`
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 12px;
  padding: 13px 16px;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: background 0.18s, border-color 0.18s, transform 0.14s;
  margin-bottom: 10px;

  &:hover {
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.18);
    transform: translateY(-1px);
  }

  &:active { transform: translateY(0); }
`,bb=vc.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;

  ${e=>"google"===e.$provider&&hc`
    background: #fff;
    color: #4285F4;
  `}
  ${e=>"outlook"===e.$provider&&hc`
    background: #0078D4;
    color: #fff;
  `}
`,kb=vc.span`
  flex: 1;
`,yb=vc.span`
  color: rgba(255,255,255,0.25);
  font-size: 13px;
`,jb=vc.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0 18px;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.09);
  }

  span {
    font-size: 11px;
    color: rgba(255,255,255,0.28);
    white-space: nowrap;
    letter-spacing: .04em;
  }
`,wb=vc.form`
  display: flex;
  gap: 8px;
  align-items: stretch;
`,Sb=vc.input`
  flex: 1;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 14px;
  color: #fff;
  outline: none;
  transition: border-color 0.18s, background 0.18s;
  min-width: 0;

  &::placeholder {
    color: rgba(255,255,255,0.22);
  }

  &:focus {
    border-color: rgba(29,176,154,0.50);
    background: rgba(29,176,154,0.05);
  }
`,$b=vc.button`
  background: linear-gradient(135deg, #1DB09A 0%, #16917E 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: -0.01em;
  transition: opacity 0.18s, transform 0.14s;
  flex-shrink: 0;

  &:hover { opacity: 0.88; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
`,Nb=vc.p`
  font-size: 12px;
  color: #F87171;
  margin: 8px 0 0;
  line-height: 1.5;
`,_b=vc.p`
  font-size: 11.5px;
  color: rgba(255,255,255,0.22);
  margin: 16px 0 0;
  line-height: 1.6;
  text-align: center;
`,Eb=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 0 4px;
`,zb=vc.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: rgba(29,176,154,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: ${nb} 0.55s cubic-bezier(0.34,1.46,0.64,1) both;

  svg {
    stroke: #1DB09A;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
    animation: ${tb} 0.5s 0.2s ease both;
  }
`,Cb=vc.h3`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 8px;
`,Ab=vc.p`
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  margin: 0 0 24px;
  line-height: 1.6;
`,Db=vc.p`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
  margin: 0 0 24px;
  font-style: italic;
`,Fb=vc.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  margin: 0 0 10px;
  width: 100%;
  text-align: left;
`,Ob=vc.div`
  display: flex;
  gap: 0;
  margin-top: 40px;
  width: 100%;
  animation: ${Zv} 0.6s 0.4s ease both;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0;
  }
`,Tb=vc.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 12px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 50%;
    background: rgba(255,255,255,0.07);

    @media (max-width: 500px) {
      top: auto;
      bottom: 0;
      right: auto;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      height: 1px;
    }
  }
`,Pb=vc.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 8px;
`,Lb=vc.p`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin: 0;
  line-height: 1.55;
`,Rb=vc.div`
  width: 100%;
  max-width: 460px;
  margin: 48px auto 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: ${Zv} 0.6s 0.5s ease both;
`,Ib=vc.p`
  font-size: clamp(14px, 2.4vw, 17px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: rgba(255,255,255,0.28);
  margin: 0;
  padding: 18px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  line-height: 1.4;

  strong {
    color: rgba(255,255,255,0.65);
  }

  &:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
`,Bb=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function Mb(){return(0,$c.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:(0,$c.jsx)("polyline",{points:"5,14 11,20 23,8"})})}function Vb(){var e;const[t]=js(),n=t.get("savings")?Number(t.get("savings")):null,a=null!==(e=t.get("supplier"))&&void 0!==e?e:null,i=t.get("score")?Number(t.get("score")):null,[o,s]=(0,r.useState)(""),[l,d]=(0,r.useState)("idle"),[c,u]=(0,r.useState)(""),p="/api/auth/gmail-init"+(o?`?email=${encodeURIComponent(o)}`:""),m="/api/auth/outlook-init"+(o?`?email=${encodeURIComponent(o)}`:"");return(0,$c.jsxs)(ab,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsx)(ib,{children:(0,$c.jsxs)(ob,{children:[(0,$c.jsxs)(sb,{children:[(0,$c.jsx)(lb,{}),(0,$c.jsx)(db,{children:"Arvo Intelligence"})]}),"sent"!==l&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(cb,{children:["Arvo b\xf6rjar bevaka er",(0,$c.jsx)("br",{}),"imorgon bitti."]}),(0,$c.jsx)(ub,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid"})]}),null!=n&&"sent"!==l&&(0,$c.jsxs)(pb,{children:[(0,$c.jsx)(mb,{children:"\u2192"}),(0,$c.jsx)(fb,{children:a?(0,$c.jsxs)($c.Fragment,{children:["Vi identifierade redan ",(0,$c.jsxs)("strong",{children:[Bb(n),"\xa0kr/\xe5r"]})," hos ",a,". Den besparingen v\xe4ntar."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi identifierade redan ",(0,$c.jsxs)("strong",{children:[Bb(n),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})})]}),(0,$c.jsx)(hb,{children:"sent"===l?(0,$c.jsxs)(Eb,{children:[(0,$c.jsx)(zb,{children:(0,$c.jsx)(Mb,{})}),(0,$c.jsx)(Cb,{children:"Aktiverat."}),(0,$c.jsxs)(Ab,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$c.jsx)("br",{}),"Ni h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),(0,$c.jsx)(Db,{children:o}),(0,$c.jsx)(Fb,{children:"Koppla er inkorg \u2014 Arvo hittar allt"}),(0,$c.jsxs)(vb,{href:p,style:{marginBottom:9},children:[(0,$c.jsx)(bb,{$provider:"google",children:"G"}),(0,$c.jsx)(kb,{children:"Koppla Gmail"}),(0,$c.jsx)(yb,{children:"\u2192"})]}),(0,$c.jsxs)(vb,{href:m,children:[(0,$c.jsx)(bb,{$provider:"outlook",children:"\u25a0"}),(0,$c.jsx)(kb,{children:"Koppla Outlook"}),(0,$c.jsx)(yb,{children:"\u2192"})]}),(0,$c.jsx)(_b,{children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(gb,{children:"Koppla er inkorg \u2014 en g\xe5ng."}),(0,$c.jsx)(xb,{children:"Arvo s\xf6ker igenom era leverant\xf6rsfakturor och kontaktar er n\xe4r n\xe5got h\xe4nt."}),(0,$c.jsxs)(vb,{href:p,children:[(0,$c.jsx)(bb,{$provider:"google",children:"G"}),(0,$c.jsx)(kb,{children:"Koppla Gmail"}),(0,$c.jsx)(yb,{children:"\u2192"})]}),(0,$c.jsxs)(vb,{href:m,children:[(0,$c.jsx)(bb,{$provider:"outlook",children:"\u25a0"}),(0,$c.jsx)(kb,{children:"Koppla Outlook"}),(0,$c.jsx)(yb,{children:"\u2192"})]}),(0,$c.jsx)(jb,{children:(0,$c.jsx)("span",{children:"eller b\xf6rja med e-post"})}),(0,$c.jsxs)(wb,{onSubmit:async e=>{e.preventDefault();const t=o.trim();if(t&&"submitting"!==l){d("submitting"),u("");try{const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==a&&void 0!==a?a:void 0,netSaving:null!==n&&void 0!==n?n:void 0,diagScore:null!==i&&void 0!==i?i:void 0,source:"intelligence-page"})});if(!e.ok){var r;const t=await e.json().catch(()=>({}));throw new Error(null!==(r=t.error)&&void 0!==r?r:"server_error")}d("sent")}catch(s){u("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),d("error")}}},children:[(0,$c.jsx)(Sb,{type:"email",placeholder:"er@foretag.se",value:o,onChange:e=>s(e.target.value),required:!0,autoComplete:"email"}),(0,$c.jsx)($b,{type:"submit",disabled:"submitting"===l,children:"submitting"===l?"\u2026":"Aktivera \u2192"})]}),c&&(0,$c.jsx)(Nb,{children:c}),(0,$c.jsx)(_b,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})}),(0,$c.jsxs)(Ob,{children:[(0,$c.jsxs)(Tb,{children:[(0,$c.jsx)(Pb,{children:"24h"}),(0,$c.jsx)(Lb,{children:"Arvo aktiverar er bevakning"})]}),(0,$c.jsxs)(Tb,{children:[(0,$c.jsx)(Pb,{children:"Dag 7"}),(0,$c.jsx)(Lb,{children:"Ni f\xe5r er f\xf6rsta analys"})]}),(0,$c.jsxs)(Tb,{children:[(0,$c.jsx)(Pb,{children:"L\xf6pande"}),(0,$c.jsx)(Lb,{children:"Arvo kontaktar er om n\xe5got h\xe4nt"})]})]})]})}),(0,$c.jsxs)(Rb,{children:[(0,$c.jsxs)(Ib,{children:[(0,$c.jsx)("strong",{children:"Regel 1:"})," Arvo vaktar er f\xf6r 1\xa0995\xa0kr/m\xe5n."]}),(0,$c.jsxs)(Ib,{children:[(0,$c.jsx)("strong",{children:"Regel 2:"})," Ni beh\xe5ller 80% av allt vi sparar er."]})]}),(0,$c.jsx)(vu,{})]})}const Ub=jc`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,Kb=jc`
  from { opacity: 0; }
  to   { opacity: 1; }
`,Hb=jc`
  0%,100% { opacity:0.3; transform:scale(0.8); }
  50%     { opacity:1;   transform:scale(1);   }
`,Wb=function(){return hc`
  opacity: 0;
  animation: ${Ub} 0.75s ${arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`},qb=wc.font.mono,Gb=vc.div`
  min-height: 100vh;
  background: ${wc.dossier.bg};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
`,Yb=vc.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 10;
  height: calc(env(safe-area-inset-top, 0px) + 28px);
  background: linear-gradient(to bottom, rgba(5,11,9,0.94) 0%, rgba(5,11,9,0) 100%);
  pointer-events: none;
`,Jb=vc.div`
  background: ${wc.dossier.bg};
  padding: calc(76px + env(safe-area-inset-top, 0px)) 28px 96px;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: calc(130px + env(safe-area-inset-top, 0px)) 28px 150px;
  }

  /* Tunn brand-keyline i absoluta toppen */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${wc.dossier.keyline};
    opacity: 0.85;
  }

  /* Aurora — px-bundna ljuskällor (procent-ellipser bandar på breda skärmar) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${wc.dossier.aurora};
    pointer-events: none;
  }
`,Qb=vc.div`
  position: relative;
`,Xb=vc.div`
  font-family: ${qb};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-indent: 0.42em; /* kompenserar sista bokstavens spacing vid centrering */
  color: ${wc.dossier.tealBright};
  margin-bottom: 18px;
  ${Wb(0)}
`,Zb=vc.div`
  font-family: ${qb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.46);
  margin-bottom: 48px;
  ${Wb(.05)}
`,ek=vc.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(52px, 14vw, 76px);
  font-weight: 700;
  margin: 0 0 24px;
  line-height: 1.04;
  letter-spacing: -0.03em;

  /* Apple-metallisk text: vit som tonar mot teal-is i botten */
  color: ${wc.dossier.inkOnDark}; /* fallback när background-clip saknas */
  background: ${wc.dossier.metallicText};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  ${Wb(.1)}
`,tk=vc.div`
  font-size: 15px;
  color: rgba(255,255,255,0.58);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  ${Wb(.17)}
`,nk=vc.span`
  color: rgba(93,214,202,0.45);
`,rk=vc.div`
  font-family: ${qb};
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.36);
  margin-top: 32px;
  ${Wb(.24)}
`,ak=vc.div`
  background: ${wc.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 84px 28px 76px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 120px 28px 110px;
  }
`,ik=vc.div`
  font-family: ${qb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: ${wc.dossier.teal};
  margin-bottom: 40px;
`,ok=vc.div`
  margin-bottom: 44px;
  &:last-of-type { margin-bottom: 0; }
  ${e=>{let{$i:t}=e;return Wb(.08+.06*(null!==t&&void 0!==t?t:0))}}
`,sk=vc.div`
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(93,214,202,0.7), transparent);
  margin: 0 auto 30px;
`,lk=vc.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 6.4vw, 33px);
  font-weight: 500;
  color: ${wc.dossier.inkOnDark};
  line-height: 1.46;
  max-width: 560px;
  margin: 0 auto;
  letter-spacing: -0.012em;
`,dk=vc.div`
  margin: 52px auto 0;
  max-width: 360px;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.025);
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`,ck=vc.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`,uk=vc.span`
  font-size: 13px;
  color: rgba(255,255,255,0.48);
`,pk=vc.span`
  font-family: ${qb};
  font-size: 12.5px;
  font-weight: 500;
  color: ${e=>{let{$highlight:t}=e;return t?wc.dossier.tealBright:"rgba(255,255,255,0.88)"}};
  text-align: right;
`,mk=vc.div`
  background: ${wc.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 96px 28px 92px;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 130px 28px 126px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 520px; height: 360px;
    background: radial-gradient(ellipse, rgba(43,196,172,0.12) 0%, transparent 65%);
    pointer-events: none;
  }
`,fk=vc.div`
  position: relative;
  font-size: clamp(58px, 16.5vw, 92px);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;

  color: ${wc.dossier.teal};
  background: ${wc.dossier.numberGradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  ${Wb(.06)}
`,hk=vc.span`
  font-size: 0.50em;
  font-weight: 600;
  vertical-align: 0.34em;
  margin-right: 0.10em;
`,gk=vc.div`
  max-width: 320px;
  margin: 40px auto 0;
  ${Wb(.14)}
`,xk=vc.div`
  position: relative;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(43,196,172,0.18) 0%, rgba(43,196,172,0.55) 50%, rgba(43,196,172,0.18) 100%);
`,vk=vc.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 11px; height: 11px;
  border-radius: 50%;
  background: ${wc.dossier.tealBright};
  box-shadow: ${wc.dossier.glow};
`,bk=vc.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-family: ${qb};
  font-size: 11px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.52);
`,kk=vc.div`
  font-size: 13px;
  color: rgba(255,255,255,0.50);
  margin-top: 30px;
  ${Wb(.18)}
`,yk=vc.div`
  font-size: 12px;
  font-style: italic;
  color: rgba(255,255,255,0.38);
  margin-top: 10px;
`,jk=vc.div`
  background: ${wc.dossier.bg};
  padding: 56px 20px 48px;

  @media (min-width: 768px) {
    padding: 88px 28px 76px;
  }
`,wk=vc.div`
  font-family: ${qb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: ${wc.dossier.teal};
  margin-bottom: 26px;
  text-align: center;
`,Sk=vc.div`
  background: ${wc.dossier.bgRaised};
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: 20px;
  padding: 28px 24px 0;
  max-width: ${wc.dossier.column};
  margin: 0 auto 16px;
  overflow: hidden;
`,$k=vc.div`
  font-family: ${qb};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: ${wc.dossier.teal};
  margin-bottom: 10px;
`,Nk=vc.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid ${wc.dossier.hairlineOnDark};

  &:last-of-type { border-bottom: none; }
`,_k=vc.span`
  font-size: 13px;
  color: ${wc.dossier.mutedOnDark};
`,Ek=vc.span`
  font-family: ${qb};
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{$highlight:t}=e;return t?wc.dossier.tealBright:wc.dossier.inkOnDark}};
  text-align: right;
`,zk=vc.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: ${wc.dossier.faintOnDark};
  margin-top: 2px;
`,Ck=vc.div`
  background: ${wc.dossier.bg};
  border-top: 1px solid ${wc.dossier.hairlineOnDark};
  margin: 18px -24px 0;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  > div { text-align: right; }
`,Ak=vc.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.62);
`,Dk=vc.div`
  font-family: ${qb};
  font-size: 16px;
  font-weight: 600;
  color: ${wc.dossier.tealBright};
  letter-spacing: -0.01em;
`,Fk=vc.div`
  font-family: ${qb};
  font-size: 10.5px;
  color: rgba(255,255,255,0.46);
  margin-top: 3px;
`,Ok=vc.div`
  font-size: 11px;
  color: ${wc.dossier.faintOnDark};
  margin: 12px 0 0;
  padding-bottom: 16px;
`,Tk=vc.div`
  background: ${wc.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 72px 24px 60px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 110px 24px 96px;
  }
`,Pk=vc.p`
  font-size: 12px;
  color: rgba(255,255,255,0.46);
  line-height: 1.80;
  max-width: 360px;
  margin: 0 auto 52px;
`,Lk=vc.div`
  margin-bottom: 10px;
`,Rk=vc.a`
  display: block;
  max-width: 400px;
  margin-inline: auto;
  background: ${wc.dossier.ctaGradient};
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  padding: 22px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  box-shadow: ${wc.dossier.ctaShadow};
  box-sizing: border-box;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:active {
    transform: scale(0.97);
    box-shadow: 0 8px 24px rgba(29,176,154,0.20);
  }
`,Ik=vc.div`
  font-size: 12px;
  color: rgba(255,255,255,0.50);
  margin-top: 14px;
`,Bk=vc.div`
  height: 36px;
`,Mk=vc.a`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.18);
  padding-bottom: 3px;
  transition: color 0.15s, border-color 0.15s;

  &:active {
    color: rgba(255,255,255,0.90);
    border-color: rgba(255,255,255,0.40);
  }
`,Vk=vc.div`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin-top: 12px;
`,Uk=vc.div`
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 22px 28px calc(22px + env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${wc.dossier.bg};
`,Kk=vc.span`
  font-family: ${qb};
  font-size: 11px;
  color: rgba(255,255,255,0.32);
`,Hk=vc.span`
  font-family: ${qb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
`,Wk=vc.div`
  min-height: 100vh;
  background: ${wc.dossier.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`,qk=vc.div`display: flex; gap: 8px;`,Gk=vc.div`
  width: 8px; height: 8px;
  border-radius: 50%;
  background: ${wc.dossier.teal};
  animation: ${Hb} 1.2s ${e=>{let{$i:t}=e;return.2*(null!==t&&void 0!==t?t:0)}}s ease-in-out infinite;
`,Yk=vc.div`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
`,Jk=vc.div`
  min-height: 100vh;
  background: ${wc.dossier.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
`,Qk=vc.div`
  font-size: 32px;
  margin-bottom: 20px;
  animation: ${Kb} 0.4s ease both;
`,Xk=vc.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
`,Zk=vc.p`
  font-size: 14px;
  color: rgba(255,255,255,0.40);
  line-height: 1.65;
  max-width: 300px;
  margin: 0 0 28px;
`,ey=vc.a`
  font-size: 15px;
  font-weight: 600;
  color: ${wc.dossier.teal};
  text-decoration: none;
  border-bottom: 1px solid rgba(29,176,154,0.3);
  padding-bottom: 2px;
`,ty=(e,t)=>500*Math.round((e+t)/2/500);function ny(e){if(!e)return"";return new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"})}function ry(){var e,t,n,a;const{token:i}=mo(),[o,s]=(0,r.useState)("loading"),[l,d]=(0,r.useState)(null),[c,u]=(0,r.useState)(!1);(0,r.useEffect)(()=>{i?fetch(`/api/prospect?token=${encodeURIComponent(i)}`).then(e=>e.json()).then(e=>{e.ok?(d(e.prospect),s("ready")):s("error")}).catch(()=>s("error")):s("error")},[i]);const p=e=>{c||(u(!0),fetch(`/api/prospect?token=${encodeURIComponent(i)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})}).catch(()=>{}))};if("loading"===o)return(0,$c.jsxs)(Wk,{children:[(0,$c.jsx)(qk,{children:[0,1,2].map(e=>(0,$c.jsx)(Gk,{$i:e},e))}),(0,$c.jsx)(Yk,{children:"H\xe4mtar er analys\u2026"})]});if("error"===o)return(0,$c.jsxs)(Jk,{children:[(0,$c.jsx)(Qk,{children:"\ud83d\udd12"}),(0,$c.jsx)(Xk,{children:"Analysen hittades inte"}),(0,$c.jsx)(Zk,{children:"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig. Analysera er faktura direkt \u2014 det tar 2 minuter."}),(0,$c.jsx)(ey,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const{companyName:m,industry:f,employees:h,estimates:g,generatedAt:x}=l,v=null!==(e=null===g||void 0===g?void 0:g.categories)&&void 0!==e?e:[],b=(null===g||void 0===g?void 0:g.hasEstimates)&&((null===g||void 0===g?void 0:g.totalSavingLow)>0||v.length>0),k=null===g||void 0===g?void 0:g.mxPlatform,y=null===g||void 0===g?void 0:g.mxSince,j=null===g||void 0===g?void 0:g.domainRegistered,w=null===g||void 0===g?void 0:g.foundedYear,S=null!==(t=null===g||void 0===g?void 0:g.findings)&&void 0!==t?t:[],$=(N=y)?Math.round((Date.now()-new Date(N).getTime())/2630016e3):0;var N;const _=null!==(n=wu[k])&&void 0!==n?n:k,E=S.length>0,z=[],C=null===g||void 0===g?void 0:g.business;if((null===C||void 0===C?void 0:C.revenueTkr)>0){const e=(C.revenueTkr/1e3).toLocaleString("sv-SE",{minimumFractionDigits:1,maximumFractionDigits:1});z.push({text:`Ert bokslut ${C.year}: ${e} mkr i oms\xe4ttning, ${C.employees} anst\xe4llda \u2014 offentliga uppgifter (Bolagsverket), inget ni delat`,key:"business"})}S.forEach(e=>z.push({text:e,key:e})),!E&&y?z.push({text:`${_}-upps\xe4ttningen or\xf6rd sedan ${ju(y)} \u2014 ${$} m\xe5nader`,key:"mxSince"}):!E&&k&&z.push({text:`Ni k\xf6r ${_} \xb7 ${h} licenser`,key:"mxPlatform"});const A=z.length>0,D=E||C?"IDENTIFIERAT FYND":"INFRASTRUKTURANALYS",F=(E||C)&&(k||j||y),O=null!==(a=null===g||void 0===g?void 0:g.totalSavingCentral)&&void 0!==a?a:b?ty(g.totalSavingLow,g.totalSavingHigh):null,T=v.map(e=>`${e.estimatedSims} ${"m365"===e.category?"Microsoft 365-licenser":"mobilabonnemang"}`).join(" + ");return(0,$c.jsxs)(Gb,{children:[(0,$c.jsx)(Yb,{}),(0,$c.jsx)(Jb,{children:(0,$c.jsxs)(Qb,{children:[(0,$c.jsx)(Xb,{children:"ARVO"}),(0,$c.jsx)(Zb,{children:"Konfidentiell analys"}),(0,$c.jsx)(ek,{children:m}),(0,$c.jsxs)(tk,{children:[f&&(0,$c.jsx)("span",{children:f}),f&&h&&(0,$c.jsx)(nk,{children:"\xb7"}),h&&(0,$c.jsxs)("span",{children:[h," anst\xe4llda"]}),w&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(nk,{children:"\xb7"}),(0,$c.jsxs)("span",{children:["Grundat ",w]})]})]}),(0,$c.jsx)(rk,{children:ny(x)})]})}),A&&(0,$c.jsxs)(ak,{children:[(0,$c.jsx)(ik,{children:D}),z.map((e,t)=>(0,$c.jsxs)(ok,{$i:t,children:[t>0&&(0,$c.jsx)(sk,{}),(0,$c.jsx)(lk,{children:e.text})]},e.key)),F&&(0,$c.jsxs)(dk,{children:[k&&(0,$c.jsxs)(ck,{children:[(0,$c.jsx)(uk,{children:"E-postplattform"}),(0,$c.jsx)(pk,{children:_})]}),y&&(0,$c.jsxs)(ck,{children:[(0,$c.jsx)(uk,{children:"Of\xf6r\xe4ndrad sedan"}),(0,$c.jsxs)(pk,{$highlight:!0,children:[ju(y)," \u2014 ",$," m\xe5n"]})]}),j&&(0,$c.jsxs)(ck,{children:[(0,$c.jsx)(uk,{children:"Dom\xe4n registrerad"}),(0,$c.jsx)(pk,{children:ju(j)})]})]})]}),b&&(0,$c.jsxs)(mk,{children:[(0,$c.jsx)(ik,{children:"Sannolik kostnadspremie"}),(0,$c.jsxs)(fk,{children:[(0,$c.jsx)(hk,{children:"\u2248"}),ku(O)," ",(0,$c.jsx)("span",{style:{fontSize:"0.42em",letterSpacing:"0em",fontWeight:700},children:"kr/\xe5r"})]}),(0,$c.jsxs)(gk,{children:[(0,$c.jsx)(xk,{children:(0,$c.jsx)(vk,{style:{left:`${Math.min(88,Math.max(12,g.totalSavingHigh>g.totalSavingLow?(O-g.totalSavingLow)/(g.totalSavingHigh-g.totalSavingLow)*100:50))}%`}})}),(0,$c.jsxs)(bk,{children:[(0,$c.jsx)("span",{children:ku(g.totalSavingLow)}),(0,$c.jsxs)("span",{children:[ku(g.totalSavingHigh)," kr/\xe5r"]})]})]}),T&&(0,$c.jsxs)(kk,{children:["Baserat p\xe5 ",T," mot verifierade listpriser"]}),(0,$c.jsx)(yk,{children:"Er faktiska avtalskostnad ser vi inte f\xf6rr\xe4n ni delar er faktura"})]}),v.length>0&&(0,$c.jsxs)(jk,{children:[(0,$c.jsx)(wk,{children:"Kostnadsanalys per kategori"}),v.map((e,t)=>{var n;const r="m365"===e.category?"licens":"abonnemang",a=null!==(n=e.savingCentral)&&void 0!==n?n:ty(e.savingLow,e.savingHigh);return(0,$c.jsxs)(Sk,{children:[(0,$c.jsx)($k,{children:e.label}),(0,$c.jsxs)(Nk,{children:[(0,$c.jsx)(_k,{children:"m365"===e.category?"Uppskattade licenser":"Uppskattade abonnemang"}),(0,$c.jsxs)(Ek,{children:[e.estimatedSims," st"]})]}),(0,$c.jsxs)(Nk,{children:[(0,$c.jsx)(_k,{children:"Typisk marknadskostnad"}),(0,$c.jsxs)(Ek,{children:[ku(e.typicalLow),"\u2013",ku(e.typicalHigh)," kr/\xe5r",(0,$c.jsx)(zk,{children:"live"===e.source?`median av verifierade fakturor: ${e.pricePerSim.typical} kr/m\xe5n per ${r} \xb1 15 %`:`ordinarie listpris ${e.pricePerSim.typical} kr/m\xe5n per ${r} \xb1 15 %`})]})]}),(0,$c.jsxs)(Nk,{children:[(0,$c.jsx)(_k,{children:"Arvo-pris, verifierat listpris"}),(0,$c.jsxs)(Ek,{$highlight:!0,children:[ku(e.arvoAnnual)," kr/\xe5r",(0,$c.jsxs)(zk,{children:[e.pricePerSim.arvo," kr/m\xe5n per ",r]})]})]}),(0,$c.jsx)(Ok,{children:e.sourceNote}),(0,$c.jsxs)(Ck,{children:[(0,$c.jsx)(Ak,{children:"Sannolik premie"}),(0,$c.jsxs)("div",{children:[(0,$c.jsxs)(Dk,{children:["\u2248 ",ku(a)," kr/\xe5r"]}),(0,$c.jsxs)(Fk,{children:["intervall ",ku(e.savingLow),"\u2013",ku(e.savingHigh)]})]})]})]},t)})]}),(0,$c.jsxs)(Tk,{children:[(0,$c.jsxs)(Pk,{children:["Arvo har g\xe5tt igenom den publika digitala upps\xe4ttningen f\xf6r ",m,"s dom\xe4n. Ingen data har h\xe4mtats fr\xe5n er eller era leverant\xf6rer utan ert tillst\xe5nd."]}),(0,$c.jsxs)(Lk,{children:[(0,$c.jsx)(Rk,{href:"/testa-faktura",onClick:()=>p("upload"),children:"Se er exakta premie"}),(0,$c.jsx)(Ik,{children:"Ladda upp en faktura \xb7 Kostnadsfritt \xb7 2 minuter \xb7 Ingen registrering"})]}),(0,$c.jsx)(Bk,{}),(0,$c.jsx)(Mk,{href:"/intelligence#aktivera",onClick:()=>p("activate"),children:"Eller l\xe5t Arvo bevaka er l\xf6pande \u2014 Arvo Intelligence, 1\xa0995 kr/m\xe5n \u2192"}),(0,$c.jsx)(Vk,{children:"Ingen bindningstid \xb7 Bevakningen b\xf6rjar inom 24 timmar"})]}),(0,$c.jsxs)(Uk,{children:[(0,$c.jsx)(Kk,{children:"arvoflow.se"}),(0,$c.jsx)(Hk,{children:"Arvo Intelligence"})]})]})}"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const ay=()=>{const{pathname:e}=lo();return(0,r.useEffect)(()=>{window.scrollTo(0,0)},[e]),null},iy=()=>(0,$c.jsxs)(cc,{theme:wc,children:[(0,$c.jsx)(Sc,{}),(0,$c.jsx)(gs,{basename:"/flow",children:(0,$c.jsxs)(Cc,{children:[(0,$c.jsx)(ay,{}),(0,$c.jsxs)(Po,{children:[(0,$c.jsx)(Oo,{path:"/",element:(0,$c.jsx)(vp,{})}),(0,$c.jsx)(Oo,{path:"/connect",element:(0,$c.jsx)(Wp,{})}),(0,$c.jsx)(Oo,{path:"/bias",element:(0,$c.jsx)(lm,{})}),(0,$c.jsx)(Oo,{path:"/villkor",element:(0,$c.jsx)(Sm,{})}),(0,$c.jsx)(Oo,{path:"/integritet",element:(0,$c.jsx)($m,{})}),(0,$c.jsx)(Oo,{path:"/cookies",element:(0,$c.jsx)(Nm,{})}),(0,$c.jsx)(Oo,{path:"/testa-faktura",element:(0,$c.jsx)(Yf,{})}),(0,$c.jsx)(Oo,{path:"/portfolio",element:(0,$c.jsx)(og,{})}),(0,$c.jsx)(Oo,{path:"/admin",element:(0,$c.jsx)(zg,{})}),(0,$c.jsx)(Oo,{path:"/utfall",element:(0,$c.jsx)(Mg,{})}),(0,$c.jsx)(Oo,{path:"/briefing/:token",element:(0,$c.jsx)(Gx,{})}),(0,$c.jsx)(Oo,{path:"/intelligence",element:(0,$c.jsx)(Xv,{})}),(0,$c.jsx)(Oo,{path:"/aktivera",element:(0,$c.jsx)(Vb,{})}),(0,$c.jsx)(Oo,{path:"/prospect/:token",element:(0,$c.jsx)(ry,{})}),(0,$c.jsx)(Oo,{path:"/kontoret",element:(0,$c.jsx)(Fo,{to:"/portfolio",replace:!0})}),(0,$c.jsx)(Oo,{path:"*",element:(0,$c.jsx)(Fo,{to:"/",replace:!0})})]})]})})]});!function(){var e;const t={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SENTRY_DSN;t&&ni({dsn:t,environment:null!==(e="production")?e:"production",release:{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_VERSION,tracesSampleRate:.1,beforeSend(e){var t,n,r,a;const i=null!==(t=null===(n=e.exception)||void 0===n||null===(r=n.values)||void 0===r||null===(a=r[0])||void 0===a?void 0:a.value)&&void 0!==t?t:"";return i.includes("Network request failed")||i.includes("Load failed")?null:e}})}();(0,i.createRoot)(document.getElementById("root")).render((0,$c.jsx)(iy,{}))})();
//# sourceMappingURL=main.ea60592b.js.map