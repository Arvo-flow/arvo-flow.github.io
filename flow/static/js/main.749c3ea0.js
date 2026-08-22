/*! For license information please see main.749c3ea0.js.LICENSE.txt */
(()=>{"use strict";var e={4(e,t,r){var n=r(853),a=r(43),i=r(950);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function l(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(r=t.return),e=t.return}while(e)}return 3===t.tag?r:null}function d(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function c(e){if(31===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function u(e){if(l(e)!==e)throw Error(o(188))}function p(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=p(e)))return t;e=e.sibling}return null}var m=Object.assign,f=Symbol.for("react.element"),h=Symbol.for("react.transitional.element"),g=Symbol.for("react.portal"),x=Symbol.for("react.fragment"),v=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),k=Symbol.for("react.consumer"),y=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),S=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),N=Symbol.for("react.lazy");Symbol.for("react.scope");var E=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var _=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var z=Symbol.iterator;function C(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=z&&e[z]||e["@@iterator"])?e:null}var A=Symbol.for("react.client.reference");function D(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===A?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case x:return"Fragment";case b:return"Profiler";case v:return"StrictMode";case w:return"Suspense";case S:return"SuspenseList";case E:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case g:return"Portal";case y:return e.displayName||"Context";case k:return(e._context.displayName||"Context")+".Consumer";case j:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case $:return null!==(t=e.displayName||null)?t:D(e.type)||"Memo";case N:t=e._payload,e=e._init;try{return D(e(t))}catch(ql){}}return null}var F=Array.isArray,O=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,T=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P={pending:!1,data:null,method:null,action:null},L=[],R=-1;function I(e){return{current:e}}function B(e){0>R||(e.current=L[R],L[R]=null,R--)}function M(e,t){R++,L[R]=e.current,e.current=t}var V,U,K=I(null),H=I(null),W=I(null),q=I(null);function G(e,t){switch(M(W,t),M(H,e),M(K,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?vu(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=bu(t=vu(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}B(K),M(K,e)}function Y(){B(K),B(H),B(W)}function J(e){null!==e.memoizedState&&M(q,e);var t=K.current,r=bu(t,e.type);t!==r&&(M(H,e),M(K,r))}function Q(e){H.current===e&&(B(K),B(H)),q.current===e&&(B(q),up._currentValue=P)}function X(e){if(void 0===V)try{throw Error()}catch(ql){var t=ql.stack.trim().match(/\n( *(at )?)/);V=t&&t[1]||"",U=-1<ql.stack.indexOf("\n    at")?" (<anonymous>)":-1<ql.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+V+e+U}var Z=!1;function ee(e,t){if(!e||Z)return"";Z=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var r=function(){throw Error()};if(Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(r,[])}catch(ql){var n=ql}Reflect.construct(e,[],r)}else{try{r.call()}catch(a){n=a}e.call(r.prototype)}}else{try{throw Error()}catch(i){n=i}(r=e())&&"function"===typeof r.catch&&r.catch(function(){})}}catch(o){if(o&&n&&"string"===typeof o.stack)return[o.stack,n.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=n.DetermineComponentFrameRoot(),o=i[0],s=i[1];if(o&&s){var l=o.split("\n"),d=s.split("\n");for(a=n=0;n<l.length&&!l[n].includes("DetermineComponentFrameRoot");)n++;for(;a<d.length&&!d[a].includes("DetermineComponentFrameRoot");)a++;if(n===l.length||a===d.length)for(n=l.length-1,a=d.length-1;1<=n&&0<=a&&l[n]!==d[a];)a--;for(;1<=n&&0<=a;n--,a--)if(l[n]!==d[a]){if(1!==n||1!==a)do{if(n--,0>--a||l[n]!==d[a]){var c="\n"+l[n].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}}while(1<=n&&0<=a);break}}}finally{Z=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?X(r):""}function te(e,t){switch(e.tag){case 26:case 27:case 5:return X(e.type);case 16:return X("Lazy");case 13:return e.child!==t&&null!==t?X("Suspense Fallback"):X("Suspense");case 19:return X("SuspenseList");case 0:case 15:return ee(e.type,!1);case 11:return ee(e.type.render,!1);case 1:return ee(e.type,!0);case 31:return X("Activity");default:return""}}function re(e){try{var t="",r=null;do{t+=te(e,r),r=e,e=e.return}while(e);return t}catch(ql){return"\nError generating stack: "+ql.message+"\n"+ql.stack}}var ne=Object.prototype.hasOwnProperty,ae=n.unstable_scheduleCallback,ie=n.unstable_cancelCallback,oe=n.unstable_shouldYield,se=n.unstable_requestPaint,le=n.unstable_now,de=n.unstable_getCurrentPriorityLevel,ce=n.unstable_ImmediatePriority,ue=n.unstable_UserBlockingPriority,pe=n.unstable_NormalPriority,me=n.unstable_LowPriority,fe=n.unstable_IdlePriority,he=n.log,ge=n.unstable_setDisableYieldValue,xe=null,ve=null;function be(e){if("function"===typeof he&&ge(e),ve&&"function"===typeof ve.setStrictMode)try{ve.setStrictMode(xe,e)}catch(t){}}var ke=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ye(e)/je|0)|0},ye=Math.log,je=Math.LN2;var we=256,Se=262144,$e=4194304;function Ne(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return 261888&e;case 262144:case 524288:case 1048576:case 2097152:return 3932160&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ee(e,t,r){var n=e.pendingLanes;if(0===n)return 0;var a=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=134217727&n;return 0!==s?0!==(n=s&~i)?a=Ne(n):0!==(o&=s)?a=Ne(o):r||0!==(r=s&~e)&&(a=Ne(r)):0!==(s=n&~i)?a=Ne(s):0!==o?a=Ne(o):r||0!==(r=n&~e)&&(a=Ne(r)),0===a?0:0!==t&&t!==a&&0===(t&i)&&((i=a&-a)>=(r=t&-t)||32===i&&0!==(4194048&r))?t:a}function _e(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function ze(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function Ce(){var e=$e;return 0===(62914560&($e<<=1))&&($e=4194304),e}function Ae(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function De(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-ke(t);e.entangledLanes|=t,e.entanglements[n]=1073741824|e.entanglements[n]|261930&r}function Oe(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-ke(r),a=1<<n;a&t|e[n]&t&&(e[n]|=t),r&=~a}}function Te(e,t){var r=t&-t;return 0!==((r=0!==(42&r)?1:Pe(r))&(e.suspendedLanes|t))?0:r}function Pe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Le(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function Re(){var e=T.p;return 0!==e?e:void 0===(e=window.event)?32:Ep(e.type)}function Ie(e,t){var r=T.p;try{return T.p=e,t()}finally{T.p=r}}var Be=Math.random().toString(36).slice(2),Me="__reactFiber$"+Be,Ve="__reactProps$"+Be,Ue="__reactContainer$"+Be,Ke="__reactEvents$"+Be,He="__reactListeners$"+Be,We="__reactHandles$"+Be,qe="__reactResources$"+Be,Ge="__reactMarker$"+Be;function Ye(e){delete e[Me],delete e[Ve],delete e[Ke],delete e[He],delete e[We]}function Je(e){var t=e[Me];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Ue]||r[Me]){if(r=t.alternate,null!==t.child||null!==r&&null!==r.child)for(e=Lu(e);null!==e;){if(r=e[Me])return r;e=Lu(e)}return t}r=(e=r).parentNode}return null}function Qe(e){if(e=e[Me]||e[Ue]){var t=e.tag;if(5===t||6===t||13===t||31===t||26===t||27===t||3===t)return e}return null}function Xe(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(o(33))}function Ze(e){var t=e[qe];return t||(t=e[qe]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function et(e){e[Ge]=!0}var tt=new Set,rt={};function nt(e,t){at(e,t),at(e+"Capture",t)}function at(e,t){for(rt[e]=t,e=0;e<t.length;e++)tt.add(t[e])}var it=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ot={},st={};function lt(e,t,r){if(a=t,ne.call(st,a)||!ne.call(ot,a)&&(it.test(a)?st[a]=!0:(ot[a]=!0,0)))if(null===r)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var n=t.toLowerCase().slice(0,5);if("data-"!==n&&"aria-"!==n)return void e.removeAttribute(t)}e.setAttribute(t,""+r)}var a}function dt(e,t,r){if(null===r)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+r)}}function ct(e,t,r,n){if(null===n)e.removeAttribute(r);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(r)}e.setAttributeNS(t,r,""+n)}}function ut(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function pt(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function mt(e){if(!e._valueTracker){var t=pt(e)?"checked":"value";e._valueTracker=function(e,t,r){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){r=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e,t,""+e[t])}}function ft(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=pt(e)?e.checked?"true":"false":e.value),(e=n)!==r&&(t.setValue(e),!0)}function ht(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var gt=/[\n"\\]/g;function xt(e){return e.replace(gt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vt(e,t,r,n,a,i,o,s){e.name="",null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o?e.type=o:e.removeAttribute("type"),null!=t?"number"===o?(0===t&&""===e.value||e.value!=t)&&(e.value=""+ut(t)):e.value!==""+ut(t)&&(e.value=""+ut(t)):"submit"!==o&&"reset"!==o||e.removeAttribute("value"),null!=t?kt(e,o,ut(t)):null!=r?kt(e,o,ut(r)):null!=n&&e.removeAttribute("value"),null==a&&null!=i&&(e.defaultChecked=!!i),null!=a&&(e.checked=a&&"function"!==typeof a&&"symbol"!==typeof a),null!=s&&"function"!==typeof s&&"symbol"!==typeof s&&"boolean"!==typeof s?e.name=""+ut(s):e.removeAttribute("name")}function bt(e,t,r,n,a,i,o,s){if(null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.type=i),null!=t||null!=r){if(!("submit"!==i&&"reset"!==i||void 0!==t&&null!==t))return void mt(e);r=null!=r?""+ut(r):"",t=null!=t?""+ut(t):r,s||t===e.value||(e.value=t),e.defaultValue=t}n="function"!==typeof(n=null!=n?n:a)&&"symbol"!==typeof n&&!!n,e.checked=s?e.checked:!!n,e.defaultChecked=!!n,null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o&&(e.name=o),mt(e)}function kt(e,t,r){"number"===t&&ht(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function yt(e,t,r,n){if(e=e.options,t){t={};for(var a=0;a<r.length;a++)t["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=t.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&n&&(e[r].defaultSelected=!0)}else{for(r=""+ut(r),t=null,a=0;a<e.length;a++){if(e[a].value===r)return e[a].selected=!0,void(n&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function jt(e,t,r){null==t||((t=""+ut(t))!==e.value&&(e.value=t),null!=r)?e.defaultValue=null!=r?""+ut(r):"":e.defaultValue!==t&&(e.defaultValue=t)}function wt(e,t,r,n){if(null==t){if(null!=n){if(null!=r)throw Error(o(92));if(F(n)){if(1<n.length)throw Error(o(93));n=n[0]}r=n}null==r&&(r=""),t=r}r=ut(t),e.defaultValue=r,(n=e.textContent)===r&&""!==n&&null!==n&&(e.value=n),mt(e)}function St(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&3===r.nodeType)return void(r.nodeValue=t)}e.textContent=t}var $t=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Nt(e,t,r){var n=0===t.indexOf("--");null==r||"boolean"===typeof r||""===r?n?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":n?e.setProperty(t,r):"number"!==typeof r||0===r||$t.has(t)?"float"===t?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function Et(e,t,r){if(null!=t&&"object"!==typeof t)throw Error(o(62));if(e=e.style,null!=r){for(var n in r)!r.hasOwnProperty(n)||null!=t&&t.hasOwnProperty(n)||(0===n.indexOf("--")?e.setProperty(n,""):"float"===n?e.cssFloat="":e[n]="");for(var a in t)n=t[a],t.hasOwnProperty(a)&&r[a]!==n&&Nt(e,a,n)}else for(var i in t)t.hasOwnProperty(i)&&Nt(e,i,t[i])}function _t(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zt=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ct=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function At(e){return Ct.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Dt(){}var Ft=null;function Ot(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Tt=null,Pt=null;function Lt(e){var t=Qe(e);if(t&&(e=t.stateNode)){var r=e[Ve]||null;e:switch(e=t.stateNode,t.type){case"input":if(vt(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,"radio"===r.type&&null!=t){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+xt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var a=n[Ve]||null;if(!a)throw Error(o(90));vt(n,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<r.length;t++)(n=r[t]).form===e.form&&ft(n)}break e;case"textarea":jt(e,r.value,r.defaultValue);break e;case"select":null!=(t=r.value)&&yt(e,!!r.multiple,t,!1)}}}var Rt=!1;function It(e,t,r){if(Rt)return e(t,r);Rt=!0;try{return e(t)}finally{if(Rt=!1,(null!==Tt||null!==Pt)&&(ec(),Tt&&(t=Tt,e=Pt,Pt=Tt=null,Lt(t),e)))for(t=0;t<e.length;t++)Lt(e[t])}}function Bt(e,t){var r=e.stateNode;if(null===r)return null;var n=r[Ve]||null;if(null===n)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(n=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!n;break e;default:e=!1}if(e)return null;if(r&&"function"!==typeof r)throw Error(o(231,t,typeof r));return r}var Mt=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Vt=!1;if(Mt)try{var Ut={};Object.defineProperty(Ut,"passive",{get:function(){Vt=!0}}),window.addEventListener("test",Ut,Ut),window.removeEventListener("test",Ut,Ut)}catch(Xp){Vt=!1}var Kt=null,Ht=null,Wt=null;function qt(){if(Wt)return Wt;var e,t,r=Ht,n=r.length,a="value"in Kt?Kt.value:Kt.textContent,i=a.length;for(e=0;e<n&&r[e]===a[e];e++);var o=n-e;for(t=1;t<=o&&r[n-t]===a[i-t];t++);return Wt=a.slice(e,1<t?1-t:void 0)}function Gt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Yt(){return!0}function Jt(){return!1}function Qt(e){function t(t,r,n,a,i){for(var o in this._reactName=t,this._targetInst=n,this.type=r,this.nativeEvent=a,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(a):a[o]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?Yt:Jt,this.isPropagationStopped=Jt,this}return m(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Yt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Yt)},persist:function(){},isPersistent:Yt}),t}var Xt,Zt,er,tr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rr=Qt(tr),nr=m({},tr,{view:0,detail:0}),ar=Qt(nr),ir=m({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gr,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==er&&(er&&"mousemove"===e.type?(Xt=e.screenX-er.screenX,Zt=e.screenY-er.screenY):Zt=Xt=0,er=e),Xt)},movementY:function(e){return"movementY"in e?e.movementY:Zt}}),or=Qt(ir),sr=Qt(m({},ir,{dataTransfer:0})),lr=Qt(m({},nr,{relatedTarget:0})),dr=Qt(m({},tr,{animationName:0,elapsedTime:0,pseudoElement:0})),cr=Qt(m({},tr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),ur=Qt(m({},tr,{data:0})),pr={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},mr={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fr={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function hr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=fr[e])&&!!t[e]}function gr(){return hr}var xr=Qt(m({},nr,{key:function(e){if(e.key){var t=pr[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Gt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?mr[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gr,charCode:function(e){return"keypress"===e.type?Gt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Gt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),vr=Qt(m({},ir,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),br=Qt(m({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gr})),kr=Qt(m({},tr,{propertyName:0,elapsedTime:0,pseudoElement:0})),yr=Qt(m({},ir,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),jr=Qt(m({},tr,{newState:0,oldState:0})),wr=[9,13,27,32],Sr=Mt&&"CompositionEvent"in window,$r=null;Mt&&"documentMode"in document&&($r=document.documentMode);var Nr=Mt&&"TextEvent"in window&&!$r,Er=Mt&&(!Sr||$r&&8<$r&&11>=$r),_r=String.fromCharCode(32),zr=!1;function Cr(e,t){switch(e){case"keyup":return-1!==wr.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ar(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Dr=!1;var Fr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Or(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Fr[e.type]:"textarea"===t}function Tr(e,t,r,n){Tt?Pt?Pt.push(n):Pt=[n]:Tt=n,0<(t=au(t,"onChange")).length&&(r=new rr("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Pr=null,Lr=null;function Rr(e){Jc(e,0)}function Ir(e){if(ft(Xe(e)))return e}function Br(e,t){if("change"===e)return t}var Mr=!1;if(Mt){var Vr;if(Mt){var Ur="oninput"in document;if(!Ur){var Kr=document.createElement("div");Kr.setAttribute("oninput","return;"),Ur="function"===typeof Kr.oninput}Vr=Ur}else Vr=!1;Mr=Vr&&(!document.documentMode||9<document.documentMode)}function Hr(){Pr&&(Pr.detachEvent("onpropertychange",Wr),Lr=Pr=null)}function Wr(e){if("value"===e.propertyName&&Ir(Lr)){var t=[];Tr(t,Lr,e,Ot(e)),It(Rr,t)}}function qr(e,t,r){"focusin"===e?(Hr(),Lr=r,(Pr=t).attachEvent("onpropertychange",Wr)):"focusout"===e&&Hr()}function Gr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Ir(Lr)}function Yr(e,t){if("click"===e)return Ir(t)}function Jr(e,t){if("input"===e||"change"===e)return Ir(t)}var Qr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function Xr(e,t){if(Qr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var a=r[n];if(!ne.call(t,a)||!Qr(e[a],t[a]))return!1}return!0}function Zr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function en(e,t){var r,n=Zr(e);for(e=0;n;){if(3===n.nodeType){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Zr(n)}}function tn(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?tn(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function rn(e){for(var t=ht((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var r="string"===typeof t.contentWindow.location.href}catch(n){r=!1}if(!r)break;t=ht((e=t.contentWindow).document)}return t}function nn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var an=Mt&&"documentMode"in document&&11>=document.documentMode,on=null,sn=null,ln=null,dn=!1;function cn(e,t,r){var n=r.window===r?r.document:9===r.nodeType?r:r.ownerDocument;dn||null==on||on!==ht(n)||("selectionStart"in(n=on)&&nn(n)?n={start:n.selectionStart,end:n.selectionEnd}:n={anchorNode:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset},ln&&Xr(ln,n)||(ln=n,0<(n=au(sn,"onSelect")).length&&(t=new rr("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=on)))}function un(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var pn={animationend:un("Animation","AnimationEnd"),animationiteration:un("Animation","AnimationIteration"),animationstart:un("Animation","AnimationStart"),transitionrun:un("Transition","TransitionRun"),transitionstart:un("Transition","TransitionStart"),transitioncancel:un("Transition","TransitionCancel"),transitionend:un("Transition","TransitionEnd")},mn={},fn={};function hn(e){if(mn[e])return mn[e];if(!pn[e])return e;var t,r=pn[e];for(t in r)if(r.hasOwnProperty(t)&&t in fn)return mn[e]=r[t];return e}Mt&&(fn=document.createElement("div").style,"AnimationEvent"in window||(delete pn.animationend.animation,delete pn.animationiteration.animation,delete pn.animationstart.animation),"TransitionEvent"in window||delete pn.transitionend.transition);var gn=hn("animationend"),xn=hn("animationiteration"),vn=hn("animationstart"),bn=hn("transitionrun"),kn=hn("transitionstart"),yn=hn("transitioncancel"),jn=hn("transitionend"),wn=new Map,Sn="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $n(e,t){wn.set(e,t),nt(t,[e])}Sn.push("scrollEnd");var Nn="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},En=[],_n=0,zn=0;function Cn(){for(var e=_n,t=zn=_n=0;t<e;){var r=En[t];En[t++]=null;var n=En[t];En[t++]=null;var a=En[t];En[t++]=null;var i=En[t];if(En[t++]=null,null!==n&&null!==a){var o=n.pending;null===o?a.next=a:(a.next=o.next,o.next=a),n.pending=a}0!==i&&On(r,a,i)}}function An(e,t,r,n){En[_n++]=e,En[_n++]=t,En[_n++]=r,En[_n++]=n,zn|=n,e.lanes|=n,null!==(e=e.alternate)&&(e.lanes|=n)}function Dn(e,t,r,n){return An(e,t,r,n),Tn(e)}function Fn(e,t){return An(e,null,null,t),Tn(e)}function On(e,t,r){e.lanes|=r;var n=e.alternate;null!==n&&(n.lanes|=r);for(var a=!1,i=e.return;null!==i;)i.childLanes|=r,null!==(n=i.alternate)&&(n.childLanes|=r),22===i.tag&&(null===(e=i.stateNode)||1&e._visibility||(a=!0)),e=i,i=i.return;return 3===e.tag?(i=e.stateNode,a&&null!==t&&(a=31-ke(r),null===(n=(e=i.hiddenUpdates)[a])?e[a]=[t]:n.push(t),t.lane=536870912|r),i):null}function Tn(e){if(50<Hd)throw Hd=0,Wd=null,Error(o(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Pn={};function Ln(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rn(e,t,r,n){return new Ln(e,t,r,n)}function In(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Bn(e,t){var r=e.alternate;return null===r?((r=Rn(e.tag,t,e.key,e.mode)).elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=65011712&e.flags,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Mn(e,t){e.flags&=65011714;var r=e.alternate;return null===r?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Vn(e,t,r,n,a,i){var s=0;if(n=e,"function"===typeof e)In(e)&&(s=1);else if("string"===typeof e)s=function(e,t,r){if(1===r||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,r,K.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case E:return(e=Rn(31,r,t,a)).elementType=E,e.lanes=i,e;case x:return Un(r.children,a,i,t);case v:s=8,a|=24;break;case b:return(e=Rn(12,r,t,2|a)).elementType=b,e.lanes=i,e;case w:return(e=Rn(13,r,t,a)).elementType=w,e.lanes=i,e;case S:return(e=Rn(19,r,t,a)).elementType=S,e.lanes=i,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case y:s=10;break e;case k:s=9;break e;case j:s=11;break e;case $:s=14;break e;case N:s=16,n=null;break e}s=29,r=Error(o(130,null===e?"null":typeof e,"")),n=null}return(t=Rn(s,r,t,a)).elementType=e,t.type=n,t.lanes=i,t}function Un(e,t,r,n){return(e=Rn(7,e,n,t)).lanes=r,e}function Kn(e,t,r){return(e=Rn(6,e,null,t)).lanes=r,e}function Hn(e){var t=Rn(18,null,null,0);return t.stateNode=e,t}function Wn(e,t,r){return(t=Rn(4,null!==e.children?e.children:[],e.key,t)).lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qn=new WeakMap;function Gn(e,t){if("object"===typeof e&&null!==e){var r=qn.get(e);return void 0!==r?r:(t={value:e,source:t,stack:re(t)},qn.set(e,t),t)}return{value:e,source:t,stack:re(t)}}var Yn=[],Jn=0,Qn=null,Xn=0,Zn=[],ea=0,ta=null,ra=1,na="";function aa(e,t){Yn[Jn++]=Xn,Yn[Jn++]=Qn,Qn=e,Xn=t}function ia(e,t,r){Zn[ea++]=ra,Zn[ea++]=na,Zn[ea++]=ta,ta=e;var n=ra;e=na;var a=32-ke(n)-1;n&=~(1<<a),r+=1;var i=32-ke(t)+a;if(30<i){var o=a-a%5;i=(n&(1<<o)-1).toString(32),n>>=o,a-=o,ra=1<<32-ke(t)+a|r<<a|n,na=i+e}else ra=1<<i|r<<a|n,na=e}function oa(e){null!==e.return&&(aa(e,1),ia(e,1,0))}function sa(e){for(;e===Qn;)Qn=Yn[--Jn],Yn[Jn]=null,Xn=Yn[--Jn],Yn[Jn]=null;for(;e===ta;)ta=Zn[--ea],Zn[ea]=null,na=Zn[--ea],Zn[ea]=null,ra=Zn[--ea],Zn[ea]=null}function la(e,t){Zn[ea++]=ra,Zn[ea++]=na,Zn[ea++]=ta,ra=t.id,na=t.overflow,ta=e}var da=null,ca=null,ua=!1,pa=null,ma=!1,fa=Error(o(519));function ha(e){throw ya(Gn(Error(o(418,1<arguments.length&&void 0!==arguments[1]&&arguments[1]?"text":"HTML","")),e)),fa}function ga(e){var t=e.stateNode,r=e.type,n=e.memoizedProps;switch(t[Me]=e,t[Ve]=n,r){case"dialog":Qc("cancel",t),Qc("close",t);break;case"iframe":case"object":case"embed":Qc("load",t);break;case"video":case"audio":for(r=0;r<Gc.length;r++)Qc(Gc[r],t);break;case"source":Qc("error",t);break;case"img":case"image":case"link":Qc("error",t),Qc("load",t);break;case"details":Qc("toggle",t);break;case"input":Qc("invalid",t),bt(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":Qc("invalid",t);break;case"textarea":Qc("invalid",t),wt(t,n.value,n.defaultValue,n.children)}"string"!==typeof(r=n.children)&&"number"!==typeof r&&"bigint"!==typeof r||t.textContent===""+r||!0===n.suppressHydrationWarning||cu(t.textContent,r)?(null!=n.popover&&(Qc("beforetoggle",t),Qc("toggle",t)),null!=n.onScroll&&Qc("scroll",t),null!=n.onScrollEnd&&Qc("scrollend",t),null!=n.onClick&&(t.onclick=Dt),t=!0):t=!1,t||ha(e,!0)}function xa(e){for(da=e.return;da;)switch(da.tag){case 5:case 31:case 13:return void(ma=!1);case 27:case 3:return void(ma=!0);default:da=da.return}}function va(e){if(e!==da)return!1;if(!ua)return xa(e),ua=!0,!1;var t,r=e.tag;if((t=3!==r&&27!==r)&&((t=5===r)&&(t=!("form"!==(t=e.type)&&"button"!==t)||ku(e.type,e.memoizedProps)),t=!t),t&&ca&&ha(e),xa(e),13===r){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));ca=Pu(e)}else if(31===r){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));ca=Pu(e)}else 27===r?(r=ca,Eu(e.type)?(e=Tu,Tu=null,ca=e):ca=r):ca=da?Ou(e.stateNode.nextSibling):null;return!0}function ba(){ca=da=null,ua=!1}function ka(){var e=pa;return null!==e&&(null===Ad?Ad=e:Ad.push.apply(Ad,e),pa=null),e}function ya(e){null===pa?pa=[e]:pa.push(e)}var ja=I(null),wa=null,Sa=null;function $a(e,t,r){M(ja,t._currentValue),t._currentValue=r}function Na(e){e._currentValue=ja.current,B(ja)}function Ea(e,t,r){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==n&&(n.childLanes|=t)):null!==n&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function _a(e,t,r,n){var a=e.child;for(null!==a&&(a.return=e);null!==a;){var i=a.dependencies;if(null!==i){var s=a.child;i=i.firstContext;e:for(;null!==i;){var l=i;i=a;for(var d=0;d<t.length;d++)if(l.context===t[d]){i.lanes|=r,null!==(l=i.alternate)&&(l.lanes|=r),Ea(i.return,r,e),n||(s=null);break e}i=l.next}}else if(18===a.tag){if(null===(s=a.return))throw Error(o(341));s.lanes|=r,null!==(i=s.alternate)&&(i.lanes|=r),Ea(s,r,e),s=null}else s=a.child;if(null!==s)s.return=a;else for(s=a;null!==s;){if(s===e){s=null;break}if(null!==(a=s.sibling)){a.return=s.return,s=a;break}s=s.return}a=s}}function za(e,t,r,n){e=null;for(var a=t,i=!1;null!==a;){if(!i)if(0!==(524288&a.flags))i=!0;else if(0!==(262144&a.flags))break;if(10===a.tag){var s=a.alternate;if(null===s)throw Error(o(387));if(null!==(s=s.memoizedProps)){var l=a.type;Qr(a.pendingProps.value,s.value)||(null!==e?e.push(l):e=[l])}}else if(a===q.current){if(null===(s=a.alternate))throw Error(o(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(null!==e?e.push(up):e=[up])}a=a.return}null!==e&&_a(t,e,r,n),t.flags|=262144}function Ca(e){for(e=e.firstContext;null!==e;){if(!Qr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Aa(e){wa=e,Sa=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Da(e){return Oa(wa,e)}function Fa(e,t){return null===wa&&Aa(e),Oa(e,t)}function Oa(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},null===Sa){if(null===e)throw Error(o(308));Sa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Sa=Sa.next=t;return r}var Ta="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,r){e.push(r)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Pa=n.unstable_scheduleCallback,La=n.unstable_NormalPriority,Ra={$$typeof:y,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ia(){return{controller:new Ta,data:new Map,refCount:0}}function Ba(e){e.refCount--,0===e.refCount&&Pa(La,function(){e.controller.abort()})}var Ma=null,Va=0,Ua=0,Ka=null;function Ha(){if(0===--Va&&null!==Ma){null!==Ka&&(Ka.status="fulfilled");var e=Ma;Ma=null,Ua=0,Ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Wa=O.S;O.S=function(e,t){Od=le(),"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Ma){var r=Ma=[];Va=0,Ua=Uc(),Ka={status:"pending",value:void 0,then:function(e){r.push(e)}}}Va++,t.then(Ha,Ha)}(0,t),null!==Wa&&Wa(e,t)};var qa=I(null);function Ga(){var e=qa.current;return null!==e?e:hd.pooledCache}function Ya(e,t){M(qa,null===t?qa.current:t.pool)}function Ja(){var e=Ga();return null===e?null:{parent:Ra._currentValue,pool:e}}var Qa=Error(o(460)),Xa=Error(o(474)),Za=Error(o(542)),ei={then:function(){}};function ti(e){return"fulfilled"===(e=e.status)||"rejected"===e}function ri(e,t,r){switch(void 0===(r=e[r])?e.push(t):r!==t&&(t.then(Dt,Dt),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e;default:if("string"===typeof t.status)t.then(Dt,Dt);else{if(null!==(e=hd)&&100<e.shellSuspendCounter)throw Error(o(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var r=t;r.status="fulfilled",r.value=e}},function(e){if("pending"===t.status){var r=t;r.status="rejected",r.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e}throw ai=t,Qa}}function ni(e){try{return(0,e._init)(e._payload)}catch(ql){if(null!==ql&&"object"===typeof ql&&"function"===typeof ql.then)throw ai=ql,Qa;throw ql}}var ai=null;function ii(){if(null===ai)throw Error(o(459));var e=ai;return ai=null,e}function oi(e){if(e===Qa||e===Za)throw Error(o(483))}var si=null,li=0;function di(e){var t=li;return li+=1,null===si&&(si=[]),ri(si,e,t)}function ci(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function ui(e,t){if(t.$$typeof===f)throw Error(o(525));throw e=Object.prototype.toString.call(t),Error(o(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function pi(e){function t(t,r){if(e){var n=t.deletions;null===n?(t.deletions=[r],t.flags|=16):n.push(r)}}function r(r,n){if(!e)return null;for(;null!==n;)t(r,n),n=n.sibling;return null}function n(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function a(e,t){return(e=Bn(e,t)).index=0,e.sibling=null,e}function i(t,r,n){return t.index=n,e?null!==(n=t.alternate)?(n=n.index)<r?(t.flags|=67108866,r):n:(t.flags|=67108866,r):(t.flags|=1048576,r)}function s(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function l(e,t,r,n){return null===t||6!==t.tag?((t=Kn(r,e.mode,n)).return=e,t):((t=a(t,r)).return=e,t)}function d(e,t,r,n){var i=r.type;return i===x?u(e,t,r.props.children,n,r.key):null!==t&&(t.elementType===i||"object"===typeof i&&null!==i&&i.$$typeof===N&&ni(i)===t.type)?(ci(t=a(t,r.props),r),t.return=e,t):(ci(t=Vn(r.type,r.key,r.props,null,e.mode,n),r),t.return=e,t)}function c(e,t,r,n){return null===t||4!==t.tag||t.stateNode.containerInfo!==r.containerInfo||t.stateNode.implementation!==r.implementation?((t=Wn(r,e.mode,n)).return=e,t):((t=a(t,r.children||[])).return=e,t)}function u(e,t,r,n,i){return null===t||7!==t.tag?((t=Un(r,e.mode,n,i)).return=e,t):((t=a(t,r)).return=e,t)}function p(e,t,r){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=Kn(""+t,e.mode,r)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case h:return ci(r=Vn(t.type,t.key,t.props,null,e.mode,r),t),r.return=e,r;case g:return(t=Wn(t,e.mode,r)).return=e,t;case N:return p(e,t=ni(t),r)}if(F(t)||C(t))return(t=Un(t,e.mode,r,null)).return=e,t;if("function"===typeof t.then)return p(e,di(t),r);if(t.$$typeof===y)return p(e,Fa(e,t),r);ui(e,t)}return null}function m(e,t,r,n){var a=null!==t?t.key:null;if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return null!==a?null:l(e,t,""+r,n);if("object"===typeof r&&null!==r){switch(r.$$typeof){case h:return r.key===a?d(e,t,r,n):null;case g:return r.key===a?c(e,t,r,n):null;case N:return m(e,t,r=ni(r),n)}if(F(r)||C(r))return null!==a?null:u(e,t,r,n,null);if("function"===typeof r.then)return m(e,t,di(r),n);if(r.$$typeof===y)return m(e,t,Fa(e,r),n);ui(e,r)}return null}function f(e,t,r,n,a){if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return l(t,e=e.get(r)||null,""+n,a);if("object"===typeof n&&null!==n){switch(n.$$typeof){case h:return d(t,e=e.get(null===n.key?r:n.key)||null,n,a);case g:return c(t,e=e.get(null===n.key?r:n.key)||null,n,a);case N:return f(e,t,r,n=ni(n),a)}if(F(n)||C(n))return u(t,e=e.get(r)||null,n,a,null);if("function"===typeof n.then)return f(e,t,r,di(n),a);if(n.$$typeof===y)return f(e,t,r,Fa(t,n),a);ui(t,n)}return null}function v(l,d,c,u){if("object"===typeof c&&null!==c&&c.type===x&&null===c.key&&(c=c.props.children),"object"===typeof c&&null!==c){switch(c.$$typeof){case h:e:{for(var b=c.key;null!==d;){if(d.key===b){if((b=c.type)===x){if(7===d.tag){r(l,d.sibling),(u=a(d,c.props.children)).return=l,l=u;break e}}else if(d.elementType===b||"object"===typeof b&&null!==b&&b.$$typeof===N&&ni(b)===d.type){r(l,d.sibling),ci(u=a(d,c.props),c),u.return=l,l=u;break e}r(l,d);break}t(l,d),d=d.sibling}c.type===x?((u=Un(c.props.children,l.mode,u,c.key)).return=l,l=u):(ci(u=Vn(c.type,c.key,c.props,null,l.mode,u),c),u.return=l,l=u)}return s(l);case g:e:{for(b=c.key;null!==d;){if(d.key===b){if(4===d.tag&&d.stateNode.containerInfo===c.containerInfo&&d.stateNode.implementation===c.implementation){r(l,d.sibling),(u=a(d,c.children||[])).return=l,l=u;break e}r(l,d);break}t(l,d),d=d.sibling}(u=Wn(c,l.mode,u)).return=l,l=u}return s(l);case N:return v(l,d,c=ni(c),u)}if(F(c))return function(a,o,s,l){for(var d=null,c=null,u=o,h=o=0,g=null;null!==u&&h<s.length;h++){u.index>h?(g=u,u=null):g=u.sibling;var x=m(a,u,s[h],l);if(null===x){null===u&&(u=g);break}e&&u&&null===x.alternate&&t(a,u),o=i(x,o,h),null===c?d=x:c.sibling=x,c=x,u=g}if(h===s.length)return r(a,u),ua&&aa(a,h),d;if(null===u){for(;h<s.length;h++)null!==(u=p(a,s[h],l))&&(o=i(u,o,h),null===c?d=u:c.sibling=u,c=u);return ua&&aa(a,h),d}for(u=n(u);h<s.length;h++)null!==(g=f(u,a,h,s[h],l))&&(e&&null!==g.alternate&&u.delete(null===g.key?h:g.key),o=i(g,o,h),null===c?d=g:c.sibling=g,c=g);return e&&u.forEach(function(e){return t(a,e)}),ua&&aa(a,h),d}(l,d,c,u);if(C(c)){if("function"!==typeof(b=C(c)))throw Error(o(150));return function(a,s,l,d){if(null==l)throw Error(o(151));for(var c=null,u=null,h=s,g=s=0,x=null,v=l.next();null!==h&&!v.done;g++,v=l.next()){h.index>g?(x=h,h=null):x=h.sibling;var b=m(a,h,v.value,d);if(null===b){null===h&&(h=x);break}e&&h&&null===b.alternate&&t(a,h),s=i(b,s,g),null===u?c=b:u.sibling=b,u=b,h=x}if(v.done)return r(a,h),ua&&aa(a,g),c;if(null===h){for(;!v.done;g++,v=l.next())null!==(v=p(a,v.value,d))&&(s=i(v,s,g),null===u?c=v:u.sibling=v,u=v);return ua&&aa(a,g),c}for(h=n(h);!v.done;g++,v=l.next())null!==(v=f(h,a,g,v.value,d))&&(e&&null!==v.alternate&&h.delete(null===v.key?g:v.key),s=i(v,s,g),null===u?c=v:u.sibling=v,u=v);return e&&h.forEach(function(e){return t(a,e)}),ua&&aa(a,g),c}(l,d,c=b.call(c),u)}if("function"===typeof c.then)return v(l,d,di(c),u);if(c.$$typeof===y)return v(l,d,Fa(l,c),u);ui(l,c)}return"string"===typeof c&&""!==c||"number"===typeof c||"bigint"===typeof c?(c=""+c,null!==d&&6===d.tag?(r(l,d.sibling),(u=a(d,c)).return=l,l=u):(r(l,d),(u=Kn(c,l.mode,u)).return=l,l=u),s(l)):r(l,d)}return function(e,t,r,n){try{li=0;var a=v(e,t,r,n);return si=null,a}catch(ql){if(ql===Qa||ql===Za)throw ql;var i=Rn(29,ql,null,e.mode);return i.lanes=n,i.return=e,i}}}var mi=pi(!0),fi=pi(!1),hi=!1;function gi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xi(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function vi(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function bi(e,t,r){var n=e.updateQueue;if(null===n)return null;if(n=n.shared,0!==(2&fd)){var a=n.pending;return null===a?t.next=t:(t.next=a.next,a.next=t),n.pending=t,t=Tn(e),On(e,null,r),t}return An(e,n,t,r),Tn(e)}function ki(e,t,r){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&r))){var n=t.lanes;r|=n&=e.pendingLanes,t.lanes=r,Oe(e,r)}}function yi(e,t){var r=e.updateQueue,n=e.alternate;if(null!==n&&r===(n=n.updateQueue)){var a=null,i=null;if(null!==(r=r.firstBaseUpdate)){do{var o={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};null===i?a=i=o:i=i.next=o,r=r.next}while(null!==r);null===i?a=i=t:i=i.next=t}else a=i=t;return r={baseState:n.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:n.shared,callbacks:n.callbacks},void(e.updateQueue=r)}null===(e=r.lastBaseUpdate)?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var ji=!1;function wi(){if(ji){if(null!==Ka)throw Ka}}function Si(e,t,r,n){ji=!1;var a=e.updateQueue;hi=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,s=a.shared.pending;if(null!==s){a.shared.pending=null;var l=s,d=l.next;l.next=null,null===o?i=d:o.next=d,o=l;var c=e.alternate;null!==c&&((s=(c=c.updateQueue).lastBaseUpdate)!==o&&(null===s?c.firstBaseUpdate=d:s.next=d,c.lastBaseUpdate=l))}if(null!==i){var u=a.baseState;for(o=0,c=d=l=null,s=i;;){var p=-536870913&s.lane,f=p!==s.lane;if(f?(xd&p)===p:(n&p)===p){0!==p&&p===Ua&&(ji=!0),null!==c&&(c=c.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var h=e,g=s;p=t;var x=r;switch(g.tag){case 1:if("function"===typeof(h=g.payload)){u=h.call(x,u,p);break e}u=h;break e;case 3:h.flags=-65537&h.flags|128;case 0:if(null===(p="function"===typeof(h=g.payload)?h.call(x,u,p):h)||void 0===p)break e;u=m({},u,p);break e;case 2:hi=!0}}null!==(p=s.callback)&&(e.flags|=64,f&&(e.flags|=8192),null===(f=a.callbacks)?a.callbacks=[p]:f.push(p))}else f={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===c?(d=c=f,l=u):c=c.next=f,o|=p;if(null===(s=s.next)){if(null===(s=a.shared.pending))break;s=(f=s).next,f.next=null,a.lastBaseUpdate=f,a.shared.pending=null}}null===c&&(l=u),a.baseState=l,a.firstBaseUpdate=d,a.lastBaseUpdate=c,null===i&&(a.shared.lanes=0),$d|=o,e.lanes=o,e.memoizedState=u}}function $i(e,t){if("function"!==typeof e)throw Error(o(191,e));e.call(t)}function Ni(e,t){var r=e.callbacks;if(null!==r)for(e.callbacks=null,e=0;e<r.length;e++)$i(r[e],t)}var Ei=I(null),_i=I(0);function zi(e,t){M(_i,e=wd),M(Ei,t),wd=e|t.baseLanes}function Ci(){M(_i,wd),M(Ei,Ei.current)}function Ai(){wd=_i.current,B(Ei),B(_i)}var Di=I(null),Fi=null;function Oi(e){var t=e.alternate;M(Ii,1&Ii.current),M(Di,e),null===Fi&&(null===t||null!==Ei.current||null!==t.memoizedState)&&(Fi=e)}function Ti(e){M(Ii,Ii.current),M(Di,e),null===Fi&&(Fi=e)}function Pi(e){22===e.tag?(M(Ii,Ii.current),M(Di,e),null===Fi&&(Fi=e)):Li()}function Li(){M(Ii,Ii.current),M(Di,Di.current)}function Ri(e){B(Di),Fi===e&&(Fi=null),B(Ii)}var Ii=I(0);function Bi(e){for(var t=e;null!==t;){if(13===t.tag){var r=t.memoizedState;if(null!==r&&(null===(r=r.dehydrated)||Du(r)||Fu(r)))return t}else if(19!==t.tag||"forwards"!==t.memoizedProps.revealOrder&&"backwards"!==t.memoizedProps.revealOrder&&"unstable_legacy-backwards"!==t.memoizedProps.revealOrder&&"together"!==t.memoizedProps.revealOrder){if(null!==t.child){t.child.return=t,t=t.child;continue}}else if(0!==(128&t.flags))return t;if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Mi=0,Vi=null,Ui=null,Ki=null,Hi=!1,Wi=!1,qi=!1,Gi=0,Yi=0,Ji=null,Qi=0;function Xi(){throw Error(o(321))}function Zi(e,t){if(null===t)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Qr(e[r],t[r]))return!1;return!0}function eo(e,t,r,n,a,i){return Mi=i,Vi=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=null===e||null===e.memoizedState?gs:xs,qi=!1,i=r(n,a),qi=!1,Wi&&(i=ro(t,r,n,a)),to(e),i}function to(e){O.H=hs;var t=null!==Ui&&null!==Ui.next;if(Mi=0,Ki=Ui=Vi=null,Hi=!1,Yi=0,Ji=null,t)throw Error(o(300));null===e||Fs||null!==(e=e.dependencies)&&Ca(e)&&(Fs=!0)}function ro(e,t,r,n){Vi=e;var a=0;do{if(Wi&&(Ji=null),Yi=0,Wi=!1,25<=a)throw Error(o(301));if(a+=1,Ki=Ui=null,null!=e.updateQueue){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,null!=i.memoCache&&(i.memoCache.index=0)}O.H=vs,i=t(r,n)}while(Wi);return i}function no(){var e=O.H,t=e.useState()[0];return t="function"===typeof t.then?co(t):t,e=e.useState()[0],(null!==Ui?Ui.memoizedState:null)!==e&&(Vi.flags|=1024),t}function ao(){var e=0!==Gi;return Gi=0,e}function io(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function oo(e){if(Hi){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Hi=!1}Mi=0,Ki=Ui=Vi=null,Wi=!1,Yi=Gi=0,Ji=null}function so(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Ki?Vi.memoizedState=Ki=e:Ki=Ki.next=e,Ki}function lo(){if(null===Ui){var e=Vi.alternate;e=null!==e?e.memoizedState:null}else e=Ui.next;var t=null===Ki?Vi.memoizedState:Ki.next;if(null!==t)Ki=t,Ui=e;else{if(null===e){if(null===Vi.alternate)throw Error(o(467));throw Error(o(310))}e={memoizedState:(Ui=e).memoizedState,baseState:Ui.baseState,baseQueue:Ui.baseQueue,queue:Ui.queue,next:null},null===Ki?Vi.memoizedState=Ki=e:Ki=Ki.next=e}return Ki}function co(e){var t=Yi;return Yi+=1,null===Ji&&(Ji=[]),e=ri(Ji,e,t),t=Vi,null===(null===Ki?t.memoizedState:Ki.next)&&(t=t.alternate,O.H=null===t||null===t.memoizedState?gs:xs),e}function uo(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return co(e);if(e.$$typeof===y)return Da(e)}throw Error(o(438,String(e)))}function po(e){var t=null,r=Vi.updateQueue;if(null!==r&&(t=r.memoCache),null==t){var n=Vi.alternate;null!==n&&(null!==(n=n.updateQueue)&&(null!=(n=n.memoCache)&&(t={data:n.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===r&&(r={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=r),r.memoCache=t,void 0===(r=t.data[t.index]))for(r=t.data[t.index]=Array(e),n=0;n<e;n++)r[n]=_;return t.index++,r}function mo(e,t){return"function"===typeof t?t(e):t}function fo(e){return ho(lo(),Ui,e)}function ho(e,t,r){var n=e.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=r;var a=e.baseQueue,i=n.pending;if(null!==i){if(null!==a){var s=a.next;a.next=i.next,i.next=s}t.baseQueue=a=i,n.pending=null}if(i=e.baseState,null===a)e.memoizedState=i;else{var l=s=null,d=null,c=t=a.next,u=!1;do{var p=-536870913&c.lane;if(p!==c.lane?(xd&p)===p:(Mi&p)===p){var m=c.revertLane;if(0===m)null!==d&&(d=d.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===Ua&&(u=!0);else{if((Mi&m)===m){c=c.next,m===Ua&&(u=!0);continue}p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===d?(l=d=p,s=i):d=d.next=p,Vi.lanes|=m,$d|=m}p=c.action,qi&&r(i,p),i=c.hasEagerState?c.eagerState:r(i,p)}else m={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===d?(l=d=m,s=i):d=d.next=m,Vi.lanes|=p,$d|=p;c=c.next}while(null!==c&&c!==t);if(null===d?s=i:d.next=l,!Qr(i,e.memoizedState)&&(Fs=!0,u&&null!==(r=Ka)))throw r;e.memoizedState=i,e.baseState=s,e.baseQueue=d,n.lastRenderedState=i}return null===a&&(n.lanes=0),[e.memoizedState,n.dispatch]}function go(e){var t=lo(),r=t.queue;if(null===r)throw Error(o(311));r.lastRenderedReducer=e;var n=r.dispatch,a=r.pending,i=t.memoizedState;if(null!==a){r.pending=null;var s=a=a.next;do{i=e(i,s.action),s=s.next}while(s!==a);Qr(i,t.memoizedState)||(Fs=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),r.lastRenderedState=i}return[i,n]}function xo(e,t,r){var n=Vi,a=lo(),i=ua;if(i){if(void 0===r)throw Error(o(407));r=r()}else r=t();var s=!Qr((Ui||a).memoizedState,r);if(s&&(a.memoizedState=r,Fs=!0),a=a.queue,Vo(ko.bind(null,n,a,e),[e]),a.getSnapshot!==t||s||null!==Ki&&1&Ki.memoizedState.tag){if(n.flags|=2048,Lo(9,{destroy:void 0},bo.bind(null,n,a,r,t),null),null===hd)throw Error(o(349));i||0!==(127&Mi)||vo(n,t,r)}return r}function vo(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},null===(t=Vi.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.stores=[e]):null===(r=t.stores)?t.stores=[e]:r.push(e)}function bo(e,t,r,n){t.value=r,t.getSnapshot=n,yo(t)&&jo(e)}function ko(e,t,r){return r(function(){yo(t)&&jo(e)})}function yo(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Qr(e,r)}catch(n){return!0}}function jo(e){var t=Fn(e,2);null!==t&&Yd(t,e,2)}function wo(e){var t=so();if("function"===typeof e){var r=e;if(e=r(),qi){be(!0);try{r()}finally{be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:mo,lastRenderedState:e},t}function So(e,t,r,n){return e.baseState=r,ho(e,Ui,"function"===typeof n?n:mo)}function $o(e,t,r,n,a){if(ps(e))throw Error(o(485));if(null!==(e=t.action)){var i={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){i.listeners.push(e)}};null!==O.T?r(!0):i.isTransition=!1,n(i),null===(r=t.pending)?(i.next=t.pending=i,No(t,i)):(i.next=r.next,t.pending=r.next=i)}}function No(e,t){var r=t.action,n=t.payload,a=e.state;if(t.isTransition){var i=O.T,o={};O.T=o;try{var s=r(a,n),l=O.S;null!==l&&l(o,s),Eo(e,t,s)}catch(d){zo(e,t,d)}finally{null!==i&&null!==o.types&&(i.types=o.types),O.T=i}}else try{Eo(e,t,i=r(a,n))}catch(c){zo(e,t,c)}}function Eo(e,t,r){null!==r&&"object"===typeof r&&"function"===typeof r.then?r.then(function(r){_o(e,t,r)},function(r){return zo(e,t,r)}):_o(e,t,r)}function _o(e,t,r){t.status="fulfilled",t.value=r,Co(t),e.state=r,null!==(t=e.pending)&&((r=t.next)===t?e.pending=null:(r=r.next,t.next=r,No(e,r)))}function zo(e,t,r){var n=e.pending;if(e.pending=null,null!==n){n=n.next;do{t.status="rejected",t.reason=r,Co(t),t=t.next}while(t!==n)}e.action=null}function Co(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ao(e,t){return t}function Do(e,t){if(ua){var r=hd.formState;if(null!==r){e:{var n=Vi;if(ua){if(ca){t:{for(var a=ca,i=ma;8!==a.nodeType;){if(!i){a=null;break t}if(null===(a=Ou(a.nextSibling))){a=null;break t}}a="F!"===(i=a.data)||"F"===i?a:null}if(a){ca=Ou(a.nextSibling),n="F!"===a.data;break e}}ha(n)}n=!1}n&&(t=r[0])}}return(r=so()).memoizedState=r.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:t},r.queue=n,r=ds.bind(null,Vi,n),n.dispatch=r,n=wo(!1),i=us.bind(null,Vi,!1,n.queue),a={state:t,dispatch:null,action:e,pending:null},(n=so()).queue=a,r=$o.bind(null,Vi,a,i,r),a.dispatch=r,n.memoizedState=e,[t,r,!1]}function Fo(e){return Oo(lo(),Ui,e)}function Oo(e,t,r){if(t=ho(e,t,Ao)[0],e=fo(mo)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var n=co(t)}catch(ql){if(ql===Qa)throw Za;throw ql}else n=t;var a=(t=lo()).queue,i=a.dispatch;return r!==t.memoizedState&&(Vi.flags|=2048,Lo(9,{destroy:void 0},To.bind(null,a,r),null)),[n,i,e]}function To(e,t){e.action=t}function Po(e){var t=lo(),r=Ui;if(null!==r)return Oo(t,r,e);lo(),t=t.memoizedState;var n=(r=lo()).queue.dispatch;return r.memoizedState=e,[t,n,!1]}function Lo(e,t,r,n){return e={tag:e,create:r,deps:n,inst:t,next:null},null===(t=Vi.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t),null===(r=t.lastEffect)?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e),e}function Ro(){return lo().memoizedState}function Io(e,t,r,n){var a=so();Vi.flags|=e,a.memoizedState=Lo(1|t,{destroy:void 0},r,void 0===n?null:n)}function Bo(e,t,r,n){var a=lo();n=void 0===n?null:n;var i=a.memoizedState.inst;null!==Ui&&null!==n&&Zi(n,Ui.memoizedState.deps)?a.memoizedState=Lo(t,i,r,n):(Vi.flags|=e,a.memoizedState=Lo(1|t,i,r,n))}function Mo(e,t){Io(8390656,8,e,t)}function Vo(e,t){Bo(2048,8,e,t)}function Uo(e){var t=lo().memoizedState;return function(e){Vi.flags|=4;var t=Vi.updateQueue;if(null===t)t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.events=[e];else{var r=t.events;null===r?t.events=[e]:r.push(e)}}({ref:t,nextImpl:e}),function(){if(0!==(2&fd))throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Ko(e,t){return Bo(4,2,e,t)}function Ho(e,t){return Bo(4,4,e,t)}function Wo(e,t){if("function"===typeof t){e=e();var r=t(e);return function(){"function"===typeof r?r():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function qo(e,t,r){r=null!==r&&void 0!==r?r.concat([e]):null,Bo(4,4,Wo.bind(null,t,e),r)}function Go(){}function Yo(e,t){var r=lo();t=void 0===t?null:t;var n=r.memoizedState;return null!==t&&Zi(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Jo(e,t){var r=lo();t=void 0===t?null:t;var n=r.memoizedState;if(null!==t&&Zi(t,n[1]))return n[0];if(n=e(),qi){be(!0);try{e()}finally{be(!1)}}return r.memoizedState=[n,t],n}function Qo(e,t,r){return void 0===r||0!==(1073741824&Mi)&&0===(261930&xd)?e.memoizedState=t:(e.memoizedState=r,e=Gd(),Vi.lanes|=e,$d|=e,r)}function Xo(e,t,r,n){return Qr(r,t)?r:null!==Ei.current?(e=Qo(e,r,n),Qr(e,t)||(Fs=!0),e):0===(42&Mi)||0!==(1073741824&Mi)&&0===(261930&xd)?(Fs=!0,e.memoizedState=r):(e=Gd(),Vi.lanes|=e,$d|=e,t)}function Zo(e,t,r,n,a){var i=T.p;T.p=0!==i&&8>i?i:8;var o=O.T,s={};O.T=s,us(e,!1,t,r);try{var l=a(),d=O.S;if(null!==d&&d(s,l),null!==l&&"object"===typeof l&&"function"===typeof l.then){var c=function(e,t){var r=[],n={status:"pending",value:null,reason:null,then:function(e){r.push(e)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var e=0;e<r.length;e++)(0,r[e])(t)},function(e){for(n.status="rejected",n.reason=e,e=0;e<r.length;e++)(0,r[e])(void 0)}),n}(l,n);cs(e,t,c,qd())}else cs(e,t,n,qd())}catch(u){cs(e,t,{then:function(){},status:"rejected",reason:u},qd())}finally{T.p=i,null!==o&&null!==s.types&&(o.types=s.types),O.T=o}}function es(){}function ts(e,t,r,n){if(5!==e.tag)throw Error(o(476));var a=rs(e).queue;Zo(e,a,t,P,null===r?es:function(){return ns(e),r(n)})}function rs(e){var t=e.memoizedState;if(null!==t)return t;var r={};return(t={memoizedState:P,baseState:P,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mo,lastRenderedState:P},next:null}).next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:mo,lastRenderedState:r},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function ns(e){var t=rs(e);null===t.next&&(t=e.alternate.memoizedState),cs(e,t.next.queue,{},qd())}function as(){return Da(up)}function is(){return lo().memoizedState}function os(){return lo().memoizedState}function ss(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var r=qd(),n=bi(t,e=vi(r),r);return null!==n&&(Yd(n,t,r),ki(n,t,r)),t={cache:Ia()},void(e.payload=t)}t=t.return}}function ls(e,t,r){var n=qd();r={lane:n,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},ps(e)?ms(t,r):null!==(r=Dn(e,t,r,n))&&(Yd(r,e,n),fs(r,t,n))}function ds(e,t,r){cs(e,t,r,qd())}function cs(e,t,r,n){var a={lane:n,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(ps(e))ms(t,a);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)&&null!==(i=t.lastRenderedReducer))try{var o=t.lastRenderedState,s=i(o,r);if(a.hasEagerState=!0,a.eagerState=s,Qr(s,o))return An(e,t,a,0),null===hd&&Cn(),!1}catch(l){}if(null!==(r=Dn(e,t,a,n)))return Yd(r,e,n),fs(r,t,n),!0}return!1}function us(e,t,r,n){if(n={lane:2,revertLane:Uc(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ps(e)){if(t)throw Error(o(479))}else null!==(t=Dn(e,r,n,2))&&Yd(t,e,2)}function ps(e){var t=e.alternate;return e===Vi||null!==t&&t===Vi}function ms(e,t){Wi=Hi=!0;var r=e.pending;null===r?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function fs(e,t,r){if(0!==(4194048&r)){var n=t.lanes;r|=n&=e.pendingLanes,t.lanes=r,Oe(e,r)}}var hs={readContext:Da,use:uo,useCallback:Xi,useContext:Xi,useEffect:Xi,useImperativeHandle:Xi,useLayoutEffect:Xi,useInsertionEffect:Xi,useMemo:Xi,useReducer:Xi,useRef:Xi,useState:Xi,useDebugValue:Xi,useDeferredValue:Xi,useTransition:Xi,useSyncExternalStore:Xi,useId:Xi,useHostTransitionStatus:Xi,useFormState:Xi,useActionState:Xi,useOptimistic:Xi,useMemoCache:Xi,useCacheRefresh:Xi};hs.useEffectEvent=Xi;var gs={readContext:Da,use:uo,useCallback:function(e,t){return so().memoizedState=[e,void 0===t?null:t],e},useContext:Da,useEffect:Mo,useImperativeHandle:function(e,t,r){r=null!==r&&void 0!==r?r.concat([e]):null,Io(4194308,4,Wo.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Io(4194308,4,e,t)},useInsertionEffect:function(e,t){Io(4,2,e,t)},useMemo:function(e,t){var r=so();t=void 0===t?null:t;var n=e();if(qi){be(!0);try{e()}finally{be(!1)}}return r.memoizedState=[n,t],n},useReducer:function(e,t,r){var n=so();if(void 0!==r){var a=r(t);if(qi){be(!0);try{r(t)}finally{be(!1)}}}else a=t;return n.memoizedState=n.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},n.queue=e,e=e.dispatch=ls.bind(null,Vi,e),[n.memoizedState,e]},useRef:function(e){return e={current:e},so().memoizedState=e},useState:function(e){var t=(e=wo(e)).queue,r=ds.bind(null,Vi,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Go,useDeferredValue:function(e,t){return Qo(so(),e,t)},useTransition:function(){var e=wo(!1);return e=Zo.bind(null,Vi,e.queue,!0,!1),so().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var n=Vi,a=so();if(ua){if(void 0===r)throw Error(o(407));r=r()}else{if(r=t(),null===hd)throw Error(o(349));0!==(127&xd)||vo(n,t,r)}a.memoizedState=r;var i={value:r,getSnapshot:t};return a.queue=i,Mo(ko.bind(null,n,i,e),[e]),n.flags|=2048,Lo(9,{destroy:void 0},bo.bind(null,n,i,r,t),null),r},useId:function(){var e=so(),t=hd.identifierPrefix;if(ua){var r=na;t="_"+t+"R_"+(r=(ra&~(1<<32-ke(ra)-1)).toString(32)+r),0<(r=Gi++)&&(t+="H"+r.toString(32)),t+="_"}else t="_"+t+"r_"+(r=Qi++).toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:as,useFormState:Do,useActionState:Do,useOptimistic:function(e){var t=so();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=us.bind(null,Vi,!0,r),r.dispatch=t,[e,t]},useMemoCache:po,useCacheRefresh:function(){return so().memoizedState=ss.bind(null,Vi)},useEffectEvent:function(e){var t=so(),r={impl:e};return t.memoizedState=r,function(){if(0!==(2&fd))throw Error(o(440));return r.impl.apply(void 0,arguments)}}},xs={readContext:Da,use:uo,useCallback:Yo,useContext:Da,useEffect:Vo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Jo,useReducer:fo,useRef:Ro,useState:function(){return fo(mo)},useDebugValue:Go,useDeferredValue:function(e,t){return Xo(lo(),Ui.memoizedState,e,t)},useTransition:function(){var e=fo(mo)[0],t=lo().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:is,useHostTransitionStatus:as,useFormState:Fo,useActionState:Fo,useOptimistic:function(e,t){return So(lo(),0,e,t)},useMemoCache:po,useCacheRefresh:os};xs.useEffectEvent=Uo;var vs={readContext:Da,use:uo,useCallback:Yo,useContext:Da,useEffect:Vo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Jo,useReducer:go,useRef:Ro,useState:function(){return go(mo)},useDebugValue:Go,useDeferredValue:function(e,t){var r=lo();return null===Ui?Qo(r,e,t):Xo(r,Ui.memoizedState,e,t)},useTransition:function(){var e=go(mo)[0],t=lo().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:is,useHostTransitionStatus:as,useFormState:Po,useActionState:Po,useOptimistic:function(e,t){var r=lo();return null!==Ui?So(r,0,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:po,useCacheRefresh:os};function bs(e,t,r,n){r=null===(r=r(n,t=e.memoizedState))||void 0===r?t:m({},t,r),e.memoizedState=r,0===e.lanes&&(e.updateQueue.baseState=r)}vs.useEffectEvent=Uo;var ks={enqueueSetState:function(e,t,r){e=e._reactInternals;var n=qd(),a=vi(n);a.payload=t,void 0!==r&&null!==r&&(a.callback=r),null!==(t=bi(e,a,n))&&(Yd(t,e,n),ki(t,e,n))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=qd(),a=vi(n);a.tag=1,a.payload=t,void 0!==r&&null!==r&&(a.callback=r),null!==(t=bi(e,a,n))&&(Yd(t,e,n),ki(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=qd(),n=vi(r);n.tag=2,void 0!==t&&null!==t&&(n.callback=t),null!==(t=bi(e,n,r))&&(Yd(t,e,r),ki(t,e,r))}};function ys(e,t,r,n,a,i,o){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(n,i,o):!t.prototype||!t.prototype.isPureReactComponent||(!Xr(r,n)||!Xr(a,i))}function js(e,t,r,n){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(r,n),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&ks.enqueueReplaceState(t,t.state,null)}function ws(e,t){var r=t;if("ref"in t)for(var n in r={},t)"ref"!==n&&(r[n]=t[n]);if(e=e.defaultProps)for(var a in r===t&&(r=m({},r)),e)void 0===r[a]&&(r[a]=e[a]);return r}function Ss(e){Nn(e)}function $s(e){console.error(e)}function Ns(e){Nn(e)}function Es(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(r){setTimeout(function(){throw r})}}function _s(e,t,r){try{(0,e.onCaughtError)(r.value,{componentStack:r.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function zs(e,t,r){return(r=vi(r)).tag=3,r.payload={element:null},r.callback=function(){Es(e,t)},r}function Cs(e){return(e=vi(e)).tag=3,e}function As(e,t,r,n){var a=r.type.getDerivedStateFromError;if("function"===typeof a){var i=n.value;e.payload=function(){return a(i)},e.callback=function(){_s(t,r,n)}}var o=r.stateNode;null!==o&&"function"===typeof o.componentDidCatch&&(e.callback=function(){_s(t,r,n),"function"!==typeof a&&(null===Ld?Ld=new Set([this]):Ld.add(this));var e=n.stack;this.componentDidCatch(n.value,{componentStack:null!==e?e:""})})}var Ds=Error(o(461)),Fs=!1;function Os(e,t,r,n){t.child=null===e?fi(t,null,r,n):mi(t,e.child,r,n)}function Ts(e,t,r,n,a){r=r.render;var i=t.ref;if("ref"in n){var o={};for(var s in n)"ref"!==s&&(o[s]=n[s])}else o=n;return Aa(t),n=eo(e,t,r,o,i,a),s=ao(),null===e||Fs?(ua&&s&&oa(t),t.flags|=1,Os(e,t,n,a),t.child):(io(e,t,a),al(e,t,a))}function Ps(e,t,r,n,a){if(null===e){var i=r.type;return"function"!==typeof i||In(i)||void 0!==i.defaultProps||null!==r.compare?((e=Vn(r.type,null,n,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=i,Ls(e,t,i,n,a))}if(i=e.child,!il(e,a)){var o=i.memoizedProps;if((r=null!==(r=r.compare)?r:Xr)(o,n)&&e.ref===t.ref)return al(e,t,a)}return t.flags|=1,(e=Bn(i,n)).ref=t.ref,e.return=t,t.child=e}function Ls(e,t,r,n,a){if(null!==e){var i=e.memoizedProps;if(Xr(i,n)&&e.ref===t.ref){if(Fs=!1,t.pendingProps=n=i,!il(e,a))return t.lanes=e.lanes,al(e,t,a);0!==(131072&e.flags)&&(Fs=!0)}}return Ks(e,t,r,n,a)}function Rs(e,t,r,n){var a=n.children,i=null!==e?e.memoizedState:null;if(null===e&&null===t.stateNode&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),"hidden"===n.mode){if(0!==(128&t.flags)){if(i=null!==i?i.baseLanes|r:r,null!==e){for(n=t.child=e.child,a=0;null!==n;)a=a|n.lanes|n.childLanes,n=n.sibling;n=a&~i}else n=0,t.child=null;return Bs(e,t,i,r,n)}if(0===(536870912&r))return n=t.lanes=536870912,Bs(e,t,null!==i?i.baseLanes|r:r,r,n);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Ya(0,null!==i?i.cachePool:null),null!==i?zi(t,i):Ci(),Pi(t)}else null!==i?(Ya(0,i.cachePool),zi(t,i),Li(),t.memoizedState=null):(null!==e&&Ya(0,null),Ci(),Li());return Os(e,t,a,r),t.child}function Is(e,t){return null!==e&&22===e.tag||null!==t.stateNode||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Bs(e,t,r,n,a){var i=Ga();return i=null===i?null:{parent:Ra._currentValue,pool:i},t.memoizedState={baseLanes:r,cachePool:i},null!==e&&Ya(0,null),Ci(),Pi(t),null!==e&&za(e,t,n,!0),t.childLanes=a,null}function Ms(e,t){return(t=Zs({mode:t.mode,children:t.children},e.mode)).ref=e.ref,e.child=t,t.return=e,t}function Vs(e,t,r){return mi(t,e.child,null,r),(e=Ms(t,t.pendingProps)).flags|=2,Ri(t),t.memoizedState=null,e}function Us(e,t){var r=t.ref;if(null===r)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof r&&"object"!==typeof r)throw Error(o(284));null!==e&&e.ref===r||(t.flags|=4194816)}}function Ks(e,t,r,n,a){return Aa(t),r=eo(e,t,r,n,void 0,a),n=ao(),null===e||Fs?(ua&&n&&oa(t),t.flags|=1,Os(e,t,r,a),t.child):(io(e,t,a),al(e,t,a))}function Hs(e,t,r,n,a,i){return Aa(t),t.updateQueue=null,r=ro(t,n,r,a),to(e),n=ao(),null===e||Fs?(ua&&n&&oa(t),t.flags|=1,Os(e,t,r,i),t.child):(io(e,t,i),al(e,t,i))}function Ws(e,t,r,n,a){if(Aa(t),null===t.stateNode){var i=Pn,o=r.contextType;"object"===typeof o&&null!==o&&(i=Da(o)),i=new r(n,i),t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,i.updater=ks,t.stateNode=i,i._reactInternals=t,(i=t.stateNode).props=n,i.state=t.memoizedState,i.refs={},gi(t),o=r.contextType,i.context="object"===typeof o&&null!==o?Da(o):Pn,i.state=t.memoizedState,"function"===typeof(o=r.getDerivedStateFromProps)&&(bs(t,r,o,n),i.state=t.memoizedState),"function"===typeof r.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(o=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),o!==i.state&&ks.enqueueReplaceState(i,i.state,null),Si(t,n,i,a),wi(),i.state=t.memoizedState),"function"===typeof i.componentDidMount&&(t.flags|=4194308),n=!0}else if(null===e){i=t.stateNode;var s=t.memoizedProps,l=ws(r,s);i.props=l;var d=i.context,c=r.contextType;o=Pn,"object"===typeof c&&null!==c&&(o=Da(c));var u=r.getDerivedStateFromProps;c="function"===typeof u||"function"===typeof i.getSnapshotBeforeUpdate,s=t.pendingProps!==s,c||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(s||d!==o)&&js(t,i,n,o),hi=!1;var p=t.memoizedState;i.state=p,Si(t,n,i,a),wi(),d=t.memoizedState,s||p!==d||hi?("function"===typeof u&&(bs(t,r,u,n),d=t.memoizedState),(l=hi||ys(t,r,l,n,p,d,o))?(c||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||("function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"===typeof i.componentDidMount&&(t.flags|=4194308)):("function"===typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=d),i.props=n,i.state=d,i.context=o,n=l):("function"===typeof i.componentDidMount&&(t.flags|=4194308),n=!1)}else{i=t.stateNode,xi(e,t),c=ws(r,o=t.memoizedProps),i.props=c,u=t.pendingProps,p=i.context,d=r.contextType,l=Pn,"object"===typeof d&&null!==d&&(l=Da(d)),(d="function"===typeof(s=r.getDerivedStateFromProps)||"function"===typeof i.getSnapshotBeforeUpdate)||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(o!==u||p!==l)&&js(t,i,n,l),hi=!1,p=t.memoizedState,i.state=p,Si(t,n,i,a),wi();var m=t.memoizedState;o!==u||p!==m||hi||null!==e&&null!==e.dependencies&&Ca(e.dependencies)?("function"===typeof s&&(bs(t,r,s,n),m=t.memoizedState),(c=hi||ys(t,r,c,n,p,m,l)||null!==e&&null!==e.dependencies&&Ca(e.dependencies))?(d||"function"!==typeof i.UNSAFE_componentWillUpdate&&"function"!==typeof i.componentWillUpdate||("function"===typeof i.componentWillUpdate&&i.componentWillUpdate(n,m,l),"function"===typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(n,m,l)),"function"===typeof i.componentDidUpdate&&(t.flags|=4),"function"===typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=m),i.props=n,i.state=m,i.context=l,n=c):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),n=!1)}return i=n,Us(e,t),n=0!==(128&t.flags),i||n?(i=t.stateNode,r=n&&"function"!==typeof r.getDerivedStateFromError?null:i.render(),t.flags|=1,null!==e&&n?(t.child=mi(t,e.child,null,a),t.child=mi(t,null,r,a)):Os(e,t,r,a),t.memoizedState=i.state,e=t.child):e=al(e,t,a),e}function qs(e,t,r,n){return ba(),t.flags|=256,Os(e,t,r,n),t.child}var Gs={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ys(e){return{baseLanes:e,cachePool:Ja()}}function Js(e,t,r){return e=null!==e?e.childLanes&~r:0,t&&(e|=_d),e}function Qs(e,t,r){var n,a=t.pendingProps,i=!1,s=0!==(128&t.flags);if((n=s)||(n=(null===e||null!==e.memoizedState)&&0!==(2&Ii.current)),n&&(i=!0,t.flags&=-129),n=0!==(32&t.flags),t.flags&=-33,null===e){if(ua){if(i?Oi(t):Li(),(e=ca)?null!==(e=null!==(e=Au(e,ma))&&"&"!==e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:ra,overflow:na}:null,retryLane:536870912,hydrationErrors:null},(r=Hn(e)).return=t,t.child=r,da=t,ca=null):e=null,null===e)throw ha(t);return Fu(e)?t.lanes=32:t.lanes=536870912,null}var l=a.children;return a=a.fallback,i?(Li(),l=Zs({mode:"hidden",children:l},i=t.mode),a=Un(a,i,r,null),l.return=t,a.return=t,l.sibling=a,t.child=l,(a=t.child).memoizedState=Ys(r),a.childLanes=Js(e,n,r),t.memoizedState=Gs,Is(null,a)):(Oi(t),Xs(t,l))}var d=e.memoizedState;if(null!==d&&null!==(l=d.dehydrated)){if(s)256&t.flags?(Oi(t),t.flags&=-257,t=el(e,t,r)):null!==t.memoizedState?(Li(),t.child=e.child,t.flags|=128,t=null):(Li(),l=a.fallback,i=t.mode,a=Zs({mode:"visible",children:a.children},i),(l=Un(l,i,r,null)).flags|=2,a.return=t,l.return=t,a.sibling=l,t.child=a,mi(t,e.child,null,r),(a=t.child).memoizedState=Ys(r),a.childLanes=Js(e,n,r),t.memoizedState=Gs,t=Is(null,a));else if(Oi(t),Fu(l)){if(n=l.nextSibling&&l.nextSibling.dataset)var c=n.dgst;n=c,(a=Error(o(419))).stack="",a.digest=n,ya({value:a,source:null,stack:null}),t=el(e,t,r)}else if(Fs||za(e,t,r,!1),n=0!==(r&e.childLanes),Fs||n){if(null!==(n=hd)&&(0!==(a=Te(n,r))&&a!==d.retryLane))throw d.retryLane=a,Fn(e,a),Yd(n,e,a),Ds;Du(l)||sc(),t=el(e,t,r)}else Du(l)?(t.flags|=192,t.child=e.child,t=null):(e=d.treeContext,ca=Ou(l.nextSibling),da=t,ua=!0,pa=null,ma=!1,null!==e&&la(t,e),(t=Xs(t,a.children)).flags|=4096);return t}return i?(Li(),l=a.fallback,i=t.mode,c=(d=e.child).sibling,(a=Bn(d,{mode:"hidden",children:a.children})).subtreeFlags=65011712&d.subtreeFlags,null!==c?l=Bn(c,l):(l=Un(l,i,r,null)).flags|=2,l.return=t,a.return=t,a.sibling=l,t.child=a,Is(null,a),a=t.child,null===(l=e.child.memoizedState)?l=Ys(r):(null!==(i=l.cachePool)?(d=Ra._currentValue,i=i.parent!==d?{parent:d,pool:d}:i):i=Ja(),l={baseLanes:l.baseLanes|r,cachePool:i}),a.memoizedState=l,a.childLanes=Js(e,n,r),t.memoizedState=Gs,Is(e.child,a)):(Oi(t),e=(r=e.child).sibling,(r=Bn(r,{mode:"visible",children:a.children})).return=t,r.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r)}function Xs(e,t){return(t=Zs({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Zs(e,t){return(e=Rn(22,e,null,t)).lanes=0,e}function el(e,t,r){return mi(t,e.child,null,r),(e=Xs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function tl(e,t,r){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),Ea(e.return,t,r)}function rl(e,t,r,n,a,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:a,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=r,o.tailMode=a,o.treeForkCount=i)}function nl(e,t,r){var n=t.pendingProps,a=n.revealOrder,i=n.tail;n=n.children;var o=Ii.current,s=0!==(2&o);if(s?(o=1&o|2,t.flags|=128):o&=1,M(Ii,o),Os(e,t,n,r),n=ua?Xn:0,!s&&null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&tl(e,r,t);else if(19===e.tag)tl(e,r,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(r=t.child,a=null;null!==r;)null!==(e=r.alternate)&&null===Bi(e)&&(a=r),r=r.sibling;null===(r=a)?(a=t.child,t.child=null):(a=r.sibling,r.sibling=null),rl(t,!1,a,r,i,n);break;case"backwards":case"unstable_legacy-backwards":for(r=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Bi(e)){t.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}rl(t,!0,r,null,i,n);break;case"together":rl(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function al(e,t,r){if(null!==e&&(t.dependencies=e.dependencies),$d|=t.lanes,0===(r&t.childLanes)){if(null===e)return null;if(za(e,t,r,!1),0===(r&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(o(153));if(null!==t.child){for(r=Bn(e=t.child,e.pendingProps),t.child=r,r.return=t;null!==e.sibling;)e=e.sibling,(r=r.sibling=Bn(e,e.pendingProps)).return=t;r.sibling=null}return t.child}function il(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Ca(e))}function ol(e,t,r){if(null!==e)if(e.memoizedProps!==t.pendingProps)Fs=!0;else{if(!il(e,r)&&0===(128&t.flags))return Fs=!1,function(e,t,r){switch(t.tag){case 3:G(t,t.stateNode.containerInfo),$a(0,Ra,e.memoizedState.cache),ba();break;case 27:case 5:J(t);break;case 4:G(t,t.stateNode.containerInfo);break;case 10:$a(0,t.type,t.memoizedProps.value);break;case 31:if(null!==t.memoizedState)return t.flags|=128,Ti(t),null;break;case 13:var n=t.memoizedState;if(null!==n)return null!==n.dehydrated?(Oi(t),t.flags|=128,null):0!==(r&t.child.childLanes)?Qs(e,t,r):(Oi(t),null!==(e=al(e,t,r))?e.sibling:null);Oi(t);break;case 19:var a=0!==(128&e.flags);if((n=0!==(r&t.childLanes))||(za(e,t,r,!1),n=0!==(r&t.childLanes)),a){if(n)return nl(e,t,r);t.flags|=128}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),M(Ii,Ii.current),n)break;return null;case 22:return t.lanes=0,Rs(e,t,r,t.pendingProps);case 24:$a(0,Ra,e.memoizedState.cache)}return al(e,t,r)}(e,t,r);Fs=0!==(131072&e.flags)}else Fs=!1,ua&&0!==(1048576&t.flags)&&ia(t,Xn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=ni(t.elementType),t.type=e,"function"!==typeof e){if(void 0!==e&&null!==e){var a=e.$$typeof;if(a===j){t.tag=11,t=Ts(null,t,e,n,r);break e}if(a===$){t.tag=14,t=Ps(null,t,e,n,r);break e}}throw t=D(e)||e,Error(o(306,t,""))}In(e)?(n=ws(e,n),t.tag=1,t=Ws(null,t,e,n,r)):(t.tag=0,t=Ks(null,t,e,n,r))}return t;case 0:return Ks(e,t,t.type,t.pendingProps,r);case 1:return Ws(e,t,n=t.type,a=ws(n,t.pendingProps),r);case 3:e:{if(G(t,t.stateNode.containerInfo),null===e)throw Error(o(387));n=t.pendingProps;var i=t.memoizedState;a=i.element,xi(e,t),Si(t,n,null,r);var s=t.memoizedState;if(n=s.cache,$a(0,Ra,n),n!==i.cache&&_a(t,[Ra],r,!0),wi(),n=s.element,i.isDehydrated){if(i={element:n,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=qs(e,t,n,r);break e}if(n!==a){ya(a=Gn(Error(o(424)),t)),t=qs(e,t,n,r);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(ca=Ou(e.firstChild),da=t,ua=!0,pa=null,ma=!0,r=fi(t,null,n,r),t.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(ba(),n===a){t=al(e,t,r);break e}Os(e,t,n,r)}t=t.child}return t;case 26:return Us(e,t),null===e?(r=Wu(t.type,null,t.pendingProps,null))?t.memoizedState=r:ua||(r=t.type,e=t.pendingProps,(n=xu(W.current).createElement(r))[Me]=t,n[Ve]=e,mu(n,r,e),et(n),t.stateNode=n):t.memoizedState=Wu(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return J(t),null===e&&ua&&(n=t.stateNode=Ru(t.type,t.pendingProps,W.current),da=t,ma=!0,a=ca,Eu(t.type)?(Tu=a,ca=Ou(n.firstChild)):ca=a),Os(e,t,t.pendingProps.children,r),Us(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&ua&&((a=n=ca)&&(null!==(n=function(e,t,r,n){for(;1===e.nodeType;){var a=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(n){if(!e[Ge])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(i=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(i!==a.rel||e.getAttribute("href")!==(null==a.href||""===a.href?null:a.href)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin)||e.getAttribute("title")!==(null==a.title?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((i=e.getAttribute("src"))!==(null==a.src?null:a.src)||e.getAttribute("type")!==(null==a.type?null:a.type)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var i=null==a.name?null:""+a.name;if("hidden"===a.type&&e.getAttribute("name")===i)return e}if(null===(e=Ou(e.nextSibling)))break}return null}(n,t.type,t.pendingProps,ma))?(t.stateNode=n,da=t,ca=Ou(n.firstChild),ma=!1,a=!0):a=!1),a||ha(t)),J(t),a=t.type,i=t.pendingProps,s=null!==e?e.memoizedProps:null,n=i.children,ku(a,i)?n=null:null!==s&&ku(a,s)&&(t.flags|=32),null!==t.memoizedState&&(a=eo(e,t,no,null,null,r),up._currentValue=a),Us(e,t),Os(e,t,n,r),t.child;case 6:return null===e&&ua&&((e=r=ca)&&(null!==(r=function(e,t,r){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!r)return null;if(null===(e=Ou(e.nextSibling)))return null}return e}(r,t.pendingProps,ma))?(t.stateNode=r,da=t,ca=null,e=!0):e=!1),e||ha(t)),null;case 13:return Qs(e,t,r);case 4:return G(t,t.stateNode.containerInfo),n=t.pendingProps,null===e?t.child=mi(t,null,n,r):Os(e,t,n,r),t.child;case 11:return Ts(e,t,t.type,t.pendingProps,r);case 7:return Os(e,t,t.pendingProps,r),t.child;case 8:case 12:return Os(e,t,t.pendingProps.children,r),t.child;case 10:return n=t.pendingProps,$a(0,t.type,n.value),Os(e,t,n.children,r),t.child;case 9:return a=t.type._context,n=t.pendingProps.children,Aa(t),n=n(a=Da(a)),t.flags|=1,Os(e,t,n,r),t.child;case 14:return Ps(e,t,t.type,t.pendingProps,r);case 15:return Ls(e,t,t.type,t.pendingProps,r);case 19:return nl(e,t,r);case 31:return function(e,t,r){var n=t.pendingProps,a=0!==(128&t.flags);if(t.flags&=-129,null===e){if(ua){if("hidden"===n.mode)return e=Ms(t,n),t.lanes=536870912,Is(null,e);if(Ti(t),(e=ca)?null!==(e=null!==(e=Au(e,ma))&&"&"===e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:ra,overflow:na}:null,retryLane:536870912,hydrationErrors:null},(r=Hn(e)).return=t,t.child=r,da=t,ca=null):e=null,null===e)throw ha(t);return t.lanes=536870912,null}return Ms(t,n)}var i=e.memoizedState;if(null!==i){var s=i.dehydrated;if(Ti(t),a)if(256&t.flags)t.flags&=-257,t=Vs(e,t,r);else{if(null===t.memoizedState)throw Error(o(558));t.child=e.child,t.flags|=128,t=null}else if(Fs||za(e,t,r,!1),a=0!==(r&e.childLanes),Fs||a){if(null!==(n=hd)&&0!==(s=Te(n,r))&&s!==i.retryLane)throw i.retryLane=s,Fn(e,s),Yd(n,e,s),Ds;sc(),t=Vs(e,t,r)}else e=i.treeContext,ca=Ou(s.nextSibling),da=t,ua=!0,pa=null,ma=!1,null!==e&&la(t,e),(t=Ms(t,n)).flags|=4096;return t}return(e=Bn(e.child,{mode:n.mode,children:n.children})).ref=t.ref,t.child=e,e.return=t,e}(e,t,r);case 22:return Rs(e,t,r,t.pendingProps);case 24:return Aa(t),n=Da(Ra),null===e?(null===(a=Ga())&&(a=hd,i=Ia(),a.pooledCache=i,i.refCount++,null!==i&&(a.pooledCacheLanes|=r),a=i),t.memoizedState={parent:n,cache:a},gi(t),$a(0,Ra,a)):(0!==(e.lanes&r)&&(xi(e,t),Si(t,null,null,r),wi()),a=e.memoizedState,i=t.memoizedState,a.parent!==n?(a={parent:n,cache:n},t.memoizedState=a,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=a),$a(0,Ra,n)):(n=i.cache,$a(0,Ra,n),n!==a.cache&&_a(t,[Ra],r,!0))),Os(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function sl(e){e.flags|=4}function ll(e,t,r,n,a){if((t=0!==(32&e.mode))&&(t=!1),t){if(e.flags|=16777216,(335544128&a)===a)if(e.stateNode.complete)e.flags|=8192;else{if(!ac())throw ai=ei,Xa;e.flags|=8192}}else e.flags&=-16777217}function dl(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!ip(t)){if(!ac())throw ai=ei,Xa;e.flags|=8192}}function cl(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?Ce():536870912,e.lanes|=t,zd|=t)}function ul(e,t){if(!ua)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling;null===r?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;null!==r;)null!==r.alternate&&(n=r),r=r.sibling;null===n?t||null===e.tail?e.tail=null:e.tail.sibling=null:n.sibling=null}}function pl(e){var t=null!==e.alternate&&e.alternate.child===e.child,r=0,n=0;if(t)for(var a=e.child;null!==a;)r|=a.lanes|a.childLanes,n|=65011712&a.subtreeFlags,n|=65011712&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)r|=a.lanes|a.childLanes,n|=a.subtreeFlags,n|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function ml(e,t,r){var n=t.pendingProps;switch(sa(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return pl(t),null;case 3:return r=t.stateNode,n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Na(Ra),Y(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(va(t)?sl(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,ka())),pl(t),null;case 26:var a=t.type,i=t.memoizedState;return null===e?(sl(t),null!==i?(pl(t),dl(t,i)):(pl(t),ll(t,a,0,0,r))):i?i!==e.memoizedState?(sl(t),pl(t),dl(t,i)):(pl(t),t.flags&=-16777217):((e=e.memoizedProps)!==n&&sl(t),pl(t),ll(t,a,0,0,r)),null;case 27:if(Q(t),r=W.current,a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==n&&sl(t);else{if(!n){if(null===t.stateNode)throw Error(o(166));return pl(t),null}e=K.current,va(t)?ga(t):(e=Ru(a,n,r),t.stateNode=e,sl(t))}return pl(t),null;case 5:if(Q(t),a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==n&&sl(t);else{if(!n){if(null===t.stateNode)throw Error(o(166));return pl(t),null}if(i=K.current,va(t))ga(t);else{var s=xu(W.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":(i=s.createElement("div")).innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i="string"===typeof n.is?s.createElement("select",{is:n.is}):s.createElement("select"),n.multiple?i.multiple=!0:n.size&&(i.size=n.size);break;default:i="string"===typeof n.is?s.createElement(a,{is:n.is}):s.createElement(a)}}i[Me]=t,i[Ve]=n;e:for(s=t.child;null!==s;){if(5===s.tag||6===s.tag)i.appendChild(s.stateNode);else if(4!==s.tag&&27!==s.tag&&null!==s.child){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;null===s.sibling;){if(null===s.return||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=i;e:switch(mu(i,a,n),a){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&sl(t)}}return pl(t),ll(t,t.type,null===e||e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==n&&sl(t);else{if("string"!==typeof n&&null===t.stateNode)throw Error(o(166));if(e=W.current,va(t)){if(e=t.stateNode,r=t.memoizedProps,n=null,null!==(a=da))switch(a.tag){case 27:case 5:n=a.memoizedProps}e[Me]=t,(e=!!(e.nodeValue===r||null!==n&&!0===n.suppressHydrationWarning||cu(e.nodeValue,r)))||ha(t,!0)}else(e=xu(e).createTextNode(n))[Me]=t,t.stateNode=e}return pl(t),null;case 31:if(r=t.memoizedState,null===e||null!==e.memoizedState){if(n=va(t),null!==r){if(null===e){if(!n)throw Error(o(318));if(!(e=null!==(e=t.memoizedState)?e.dehydrated:null))throw Error(o(557));e[Me]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;pl(t),e=!1}else r=ka(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return 256&t.flags?(Ri(t),t):(Ri(t),null);if(0!==(128&t.flags))throw Error(o(558))}return pl(t),null;case 13:if(n=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(a=va(t),null!==n&&null!==n.dehydrated){if(null===e){if(!a)throw Error(o(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(o(317));a[Me]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;pl(t),a=!1}else a=ka(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return 256&t.flags?(Ri(t),t):(Ri(t),null)}return Ri(t),0!==(128&t.flags)?(t.lanes=r,t):(r=null!==n,e=null!==e&&null!==e.memoizedState,r&&(a=null,null!==(n=t.child).alternate&&null!==n.alternate.memoizedState&&null!==n.alternate.memoizedState.cachePool&&(a=n.alternate.memoizedState.cachePool.pool),i=null,null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(i=n.memoizedState.cachePool.pool),i!==a&&(n.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),cl(t,t.updateQueue),pl(t),null);case 4:return Y(),null===e&&eu(t.stateNode.containerInfo),pl(t),null;case 10:return Na(t.type),pl(t),null;case 19:if(B(Ii),null===(n=t.memoizedState))return pl(t),null;if(a=0!==(128&t.flags),null===(i=n.rendering))if(a)ul(n,!1);else{if(0!==Sd||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(i=Bi(e))){for(t.flags|=128,ul(n,!1),e=i.updateQueue,t.updateQueue=e,cl(t,e),t.subtreeFlags=0,e=r,r=t.child;null!==r;)Mn(r,e),r=r.sibling;return M(Ii,1&Ii.current|2),ua&&aa(t,n.treeForkCount),t.child}e=e.sibling}null!==n.tail&&le()>Td&&(t.flags|=128,a=!0,ul(n,!1),t.lanes=4194304)}else{if(!a)if(null!==(e=Bi(i))){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,cl(t,e),ul(n,!0),null===n.tail&&"hidden"===n.tailMode&&!i.alternate&&!ua)return pl(t),null}else 2*le()-n.renderingStartTime>Td&&536870912!==r&&(t.flags|=128,a=!0,ul(n,!1),t.lanes=4194304);n.isBackwards?(i.sibling=t.child,t.child=i):(null!==(e=n.last)?e.sibling=i:t.child=i,n.last=i)}return null!==n.tail?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=le(),e.sibling=null,r=Ii.current,M(Ii,a?1&r|2:1&r),ua&&aa(t,n.treeForkCount),e):(pl(t),null);case 22:case 23:return Ri(t),Ai(),n=null!==t.memoizedState,null!==e?null!==e.memoizedState!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?0!==(536870912&r)&&0===(128&t.flags)&&(pl(t),6&t.subtreeFlags&&(t.flags|=8192)):pl(t),null!==(r=t.updateQueue)&&cl(t,r.retryQueue),r=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(r=e.memoizedState.cachePool.pool),n=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(n=t.memoizedState.cachePool.pool),n!==r&&(t.flags|=2048),null!==e&&B(qa),null;case 24:return r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Na(Ra),pl(t),null;case 25:case 30:return null}throw Error(o(156,t.tag))}function fl(e,t){switch(sa(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Na(Ra),Y(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return Q(t),null;case 31:if(null!==t.memoizedState){if(Ri(t),null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 13:if(Ri(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return B(Ii),null;case 4:return Y(),null;case 10:return Na(t.type),null;case 22:case 23:return Ri(t),Ai(),null!==e&&B(qa),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return Na(Ra),null;default:return null}}function hl(e,t){switch(sa(t),t.tag){case 3:Na(Ra),Y();break;case 26:case 27:case 5:Q(t);break;case 4:Y();break;case 31:null!==t.memoizedState&&Ri(t);break;case 13:Ri(t);break;case 19:B(Ii);break;case 10:Na(t.type);break;case 22:case 23:Ri(t),Ai(),null!==e&&B(qa);break;case 24:Na(Ra)}}function gl(e,t){try{var r=t.updateQueue,n=null!==r?r.lastEffect:null;if(null!==n){var a=n.next;r=a;do{if((r.tag&e)===e){n=void 0;var i=r.create,o=r.inst;n=i(),o.destroy=n}r=r.next}while(r!==a)}}catch(s){Sc(t,t.return,s)}}function xl(e,t,r){try{var n=t.updateQueue,a=null!==n?n.lastEffect:null;if(null!==a){var i=a.next;n=i;do{if((n.tag&e)===e){var o=n.inst,s=o.destroy;if(void 0!==s){o.destroy=void 0,a=t;var l=r,d=s;try{d()}catch(c){Sc(a,l,c)}}}n=n.next}while(n!==i)}}catch(c){Sc(t,t.return,c)}}function vl(e){var t=e.updateQueue;if(null!==t){var r=e.stateNode;try{Ni(t,r)}catch(n){Sc(e,e.return,n)}}}function bl(e,t,r){r.props=ws(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(n){Sc(e,t,n)}}function kl(e,t){try{var r=e.ref;if(null!==r){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;default:n=e.stateNode}"function"===typeof r?e.refCleanup=r(n):r.current=n}}catch(a){Sc(e,t,a)}}function yl(e,t){var r=e.ref,n=e.refCleanup;if(null!==r)if("function"===typeof n)try{n()}catch(a){Sc(e,t,a)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof r)try{r(null)}catch(i){Sc(e,t,i)}else r.current=null}function jl(e){var t=e.type,r=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&n.focus();break e;case"img":r.src?n.src=r.src:r.srcSet&&(n.srcset=r.srcSet)}}catch(a){Sc(e,e.return,a)}}function wl(e,t,r){try{var n=e.stateNode;!function(e,t,r,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,s=null,l=null,d=null,c=null,u=null;for(f in r){var p=r[f];if(r.hasOwnProperty(f)&&null!=p)switch(f){case"checked":case"value":break;case"defaultValue":d=p;default:n.hasOwnProperty(f)||uu(e,t,f,null,n,p)}}for(var m in n){var f=n[m];if(p=r[m],n.hasOwnProperty(m)&&(null!=f||null!=p))switch(m){case"type":i=f;break;case"name":a=f;break;case"checked":c=f;break;case"defaultChecked":u=f;break;case"value":s=f;break;case"defaultValue":l=f;break;case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(o(137,t));break;default:f!==p&&uu(e,t,m,f,n,p)}}return void vt(e,s,l,d,c,u,i,a);case"select":for(i in f=s=l=m=null,r)if(d=r[i],r.hasOwnProperty(i)&&null!=d)switch(i){case"value":break;case"multiple":f=d;default:n.hasOwnProperty(i)||uu(e,t,i,null,n,d)}for(a in n)if(i=n[a],d=r[a],n.hasOwnProperty(a)&&(null!=i||null!=d))switch(a){case"value":m=i;break;case"defaultValue":l=i;break;case"multiple":s=i;default:i!==d&&uu(e,t,a,i,n,d)}return t=l,r=s,n=f,void(null!=m?yt(e,!!r,m,!1):!!n!==!!r&&(null!=t?yt(e,!!r,t,!0):yt(e,!!r,r?[]:"",!1)));case"textarea":for(l in f=m=null,r)if(a=r[l],r.hasOwnProperty(l)&&null!=a&&!n.hasOwnProperty(l))switch(l){case"value":case"children":break;default:uu(e,t,l,null,n,a)}for(s in n)if(a=n[s],i=r[s],n.hasOwnProperty(s)&&(null!=a||null!=i))switch(s){case"value":m=a;break;case"defaultValue":f=a;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=a)throw Error(o(91));break;default:a!==i&&uu(e,t,s,a,n,i)}return void jt(e,m,f);case"option":for(var h in r)if(m=r[h],r.hasOwnProperty(h)&&null!=m&&!n.hasOwnProperty(h))if("selected"===h)e.selected=!1;else uu(e,t,h,null,n,m);for(d in n)if(m=n[d],f=r[d],n.hasOwnProperty(d)&&m!==f&&(null!=m||null!=f))if("selected"===d)e.selected=m&&"function"!==typeof m&&"symbol"!==typeof m;else uu(e,t,d,m,n,f);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in r)m=r[g],r.hasOwnProperty(g)&&null!=m&&!n.hasOwnProperty(g)&&uu(e,t,g,null,n,m);for(c in n)if(m=n[c],f=r[c],n.hasOwnProperty(c)&&m!==f&&(null!=m||null!=f))switch(c){case"children":case"dangerouslySetInnerHTML":if(null!=m)throw Error(o(137,t));break;default:uu(e,t,c,m,n,f)}return;default:if(_t(t)){for(var x in r)m=r[x],r.hasOwnProperty(x)&&void 0!==m&&!n.hasOwnProperty(x)&&pu(e,t,x,void 0,n,m);for(u in n)m=n[u],f=r[u],!n.hasOwnProperty(u)||m===f||void 0===m&&void 0===f||pu(e,t,u,m,n,f);return}}for(var v in r)m=r[v],r.hasOwnProperty(v)&&null!=m&&!n.hasOwnProperty(v)&&uu(e,t,v,null,n,m);for(p in n)m=n[p],f=r[p],!n.hasOwnProperty(p)||m===f||null==m&&null==f||uu(e,t,p,m,n,f)}(n,e.type,r,t),n[Ve]=t}catch(a){Sc(e,e.return,a)}}function Sl(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&Eu(e.type)||4===e.tag}function $l(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Sl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&Eu(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function Nl(e,t,r){var n=e.tag;if(5===n||6===n)e=e.stateNode,t?(9===r.nodeType?r.body:"HTML"===r.nodeName?r.ownerDocument.body:r).insertBefore(e,t):((t=9===r.nodeType?r.body:"HTML"===r.nodeName?r.ownerDocument.body:r).appendChild(e),null!==(r=r._reactRootContainer)&&void 0!==r||null!==t.onclick||(t.onclick=Dt));else if(4!==n&&(27===n&&Eu(e.type)&&(r=e.stateNode,t=null),null!==(e=e.child)))for(Nl(e,t,r),e=e.sibling;null!==e;)Nl(e,t,r),e=e.sibling}function El(e,t,r){var n=e.tag;if(5===n||6===n)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(4!==n&&(27===n&&Eu(e.type)&&(r=e.stateNode),null!==(e=e.child)))for(El(e,t,r),e=e.sibling;null!==e;)El(e,t,r),e=e.sibling}function _l(e){var t=e.stateNode,r=e.memoizedProps;try{for(var n=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);mu(t,n,r),t[Me]=e,t[Ve]=r}catch(i){Sc(e,e.return,i)}}var zl=!1,Cl=!1,Al=!1,Dl="function"===typeof WeakSet?WeakSet:Set,Fl=null;function Ol(e,t,r){var n=r.flags;switch(r.tag){case 0:case 11:case 15:Yl(e,r),4&n&&gl(5,r);break;case 1:if(Yl(e,r),4&n)if(e=r.stateNode,null===t)try{e.componentDidMount()}catch(o){Sc(r,r.return,o)}else{var a=ws(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){Sc(r,r.return,s)}}64&n&&vl(r),512&n&&kl(r,r.return);break;case 3:if(Yl(e,r),64&n&&null!==(e=r.updateQueue)){if(t=null,null!==r.child)switch(r.child.tag){case 27:case 5:case 1:t=r.child.stateNode}try{Ni(e,t)}catch(o){Sc(r,r.return,o)}}break;case 27:null===t&&4&n&&_l(r);case 26:case 5:Yl(e,r),null===t&&4&n&&jl(r),512&n&&kl(r,r.return);break;case 12:Yl(e,r);break;case 31:Yl(e,r),4&n&&Bl(e,r);break;case 13:Yl(e,r),4&n&&Ml(e,r),64&n&&(null!==(e=r.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var r=e.ownerDocument;if("$~"===e.data)e._reactRetry=t;else if("$?"!==e.data||"loading"!==r.readyState)t();else{var n=function(){t(),r.removeEventListener("DOMContentLoaded",n)};r.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}(e,r=_c.bind(null,r))));break;case 22:if(!(n=null!==r.memoizedState||zl)){t=null!==t&&null!==t.memoizedState||Cl,a=zl;var i=Cl;zl=n,(Cl=t)&&!i?Ql(e,r,0!==(8772&r.subtreeFlags)):Yl(e,r),zl=a,Cl=i}break;case 30:break;default:Yl(e,r)}}function Tl(e){var t=e.alternate;null!==t&&(e.alternate=null,Tl(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Ye(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Pl=null,Ll=!1;function Rl(e,t,r){for(r=r.child;null!==r;)Il(e,t,r),r=r.sibling}function Il(e,t,r){if(ve&&"function"===typeof ve.onCommitFiberUnmount)try{ve.onCommitFiberUnmount(xe,r)}catch(i){}switch(r.tag){case 26:Cl||yl(r,t),Rl(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode).parentNode.removeChild(r);break;case 27:Cl||yl(r,t);var n=Pl,a=Ll;Eu(r.type)&&(Pl=r.stateNode,Ll=!1),Rl(e,t,r),Iu(r.stateNode),Pl=n,Ll=a;break;case 5:Cl||yl(r,t);case 6:if(n=Pl,a=Ll,Pl=null,Rl(e,t,r),Ll=a,null!==(Pl=n))if(Ll)try{(9===Pl.nodeType?Pl.body:"HTML"===Pl.nodeName?Pl.ownerDocument.body:Pl).removeChild(r.stateNode)}catch(o){Sc(r,t,o)}else try{Pl.removeChild(r.stateNode)}catch(o){Sc(r,t,o)}break;case 18:null!==Pl&&(Ll?(_u(9===(e=Pl).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,r.stateNode),Hp(e)):_u(Pl,r.stateNode));break;case 4:n=Pl,a=Ll,Pl=r.stateNode.containerInfo,Ll=!0,Rl(e,t,r),Pl=n,Ll=a;break;case 0:case 11:case 14:case 15:xl(2,r,t),Cl||xl(4,r,t),Rl(e,t,r);break;case 1:Cl||(yl(r,t),"function"===typeof(n=r.stateNode).componentWillUnmount&&bl(r,t,n)),Rl(e,t,r);break;case 21:Rl(e,t,r);break;case 22:Cl=(n=Cl)||null!==r.memoizedState,Rl(e,t,r),Cl=n;break;default:Rl(e,t,r)}}function Bl(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&null!==(e=e.memoizedState))){e=e.dehydrated;try{Hp(e)}catch(r){Sc(t,t.return,r)}}}function Ml(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Hp(e)}catch(r){Sc(t,t.return,r)}}function Vl(e,t){var r=function(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new Dl),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new Dl),t;default:throw Error(o(435,e.tag))}}(e);t.forEach(function(t){if(!r.has(t)){r.add(t);var n=zc.bind(null,e,t);t.then(n,n)}})}function Ul(e,t){var r=t.deletions;if(null!==r)for(var n=0;n<r.length;n++){var a=r[n],i=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 27:if(Eu(l.type)){Pl=l.stateNode,Ll=!1;break e}break;case 5:Pl=l.stateNode,Ll=!1;break e;case 3:case 4:Pl=l.stateNode.containerInfo,Ll=!0;break e}l=l.return}if(null===Pl)throw Error(o(160));Il(i,s,a),Pl=null,Ll=!1,null!==(i=a.alternate)&&(i.return=null),a.return=null}if(13886&t.subtreeFlags)for(t=t.child;null!==t;)Hl(t,e),t=t.sibling}var Kl=null;function Hl(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ul(t,e),Wl(e),4&n&&(xl(3,e,e.return),gl(3,e),xl(5,e,e.return));break;case 1:Ul(t,e),Wl(e),512&n&&(Cl||null===r||yl(r,r.return)),64&n&&zl&&(null!==(e=e.updateQueue)&&(null!==(n=e.callbacks)&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===r?n:r.concat(n))));break;case 26:var a=Kl;if(Ul(t,e),Wl(e),512&n&&(Cl||null===r||yl(r,r.return)),4&n){var i=null!==r?r.memoizedState:null;if(n=e.memoizedState,null===r)if(null===n)if(null===e.stateNode){e:{n=e.type,r=e.memoizedProps,a=a.ownerDocument||a;t:switch(n){case"title":(!(i=a.getElementsByTagName("title")[0])||i[Ge]||i[Me]||"http://www.w3.org/2000/svg"===i.namespaceURI||i.hasAttribute("itemprop"))&&(i=a.createElement(n),a.head.insertBefore(i,a.querySelector("head > title"))),mu(i,n,r),i[Me]=e,et(i),n=i;break e;case"link":var s=np("link","href",a).get(n+(r.href||""));if(s)for(var l=0;l<s.length;l++)if((i=s[l]).getAttribute("href")===(null==r.href||""===r.href?null:r.href)&&i.getAttribute("rel")===(null==r.rel?null:r.rel)&&i.getAttribute("title")===(null==r.title?null:r.title)&&i.getAttribute("crossorigin")===(null==r.crossOrigin?null:r.crossOrigin)){s.splice(l,1);break t}mu(i=a.createElement(n),n,r),a.head.appendChild(i);break;case"meta":if(s=np("meta","content",a).get(n+(r.content||"")))for(l=0;l<s.length;l++)if((i=s[l]).getAttribute("content")===(null==r.content?null:""+r.content)&&i.getAttribute("name")===(null==r.name?null:r.name)&&i.getAttribute("property")===(null==r.property?null:r.property)&&i.getAttribute("http-equiv")===(null==r.httpEquiv?null:r.httpEquiv)&&i.getAttribute("charset")===(null==r.charSet?null:r.charSet)){s.splice(l,1);break t}mu(i=a.createElement(n),n,r),a.head.appendChild(i);break;default:throw Error(o(468,n))}i[Me]=e,et(i),n=i}e.stateNode=n}else ap(a,e.type,e.stateNode);else e.stateNode=Xu(a,n,e.memoizedProps);else i!==n?(null===i?null!==r.stateNode&&(r=r.stateNode).parentNode.removeChild(r):i.count--,null===n?ap(a,e.type,e.stateNode):Xu(a,n,e.memoizedProps)):null===n&&null!==e.stateNode&&wl(e,e.memoizedProps,r.memoizedProps)}break;case 27:Ul(t,e),Wl(e),512&n&&(Cl||null===r||yl(r,r.return)),null!==r&&4&n&&wl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Ul(t,e),Wl(e),512&n&&(Cl||null===r||yl(r,r.return)),32&e.flags){a=e.stateNode;try{St(a,"")}catch(h){Sc(e,e.return,h)}}4&n&&null!=e.stateNode&&wl(e,a=e.memoizedProps,null!==r?r.memoizedProps:a),1024&n&&(Al=!0);break;case 6:if(Ul(t,e),Wl(e),4&n){if(null===e.stateNode)throw Error(o(162));n=e.memoizedProps,r=e.stateNode;try{r.nodeValue=n}catch(h){Sc(e,e.return,h)}}break;case 3:if(rp=null,a=Kl,Kl=Vu(t.containerInfo),Ul(t,e),Kl=a,Wl(e),4&n&&null!==r&&r.memoizedState.isDehydrated)try{Hp(t.containerInfo)}catch(h){Sc(e,e.return,h)}Al&&(Al=!1,Gl(e));break;case 4:n=Kl,Kl=Vu(e.stateNode.containerInfo),Ul(t,e),Wl(e),Kl=n;break;case 12:default:Ul(t,e),Wl(e);break;case 31:case 19:Ul(t,e),Wl(e),4&n&&(null!==(n=e.updateQueue)&&(e.updateQueue=null,Vl(e,n)));break;case 13:Ul(t,e),Wl(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==r&&null!==r.memoizedState)&&(Fd=le()),4&n&&(null!==(n=e.updateQueue)&&(e.updateQueue=null,Vl(e,n)));break;case 22:a=null!==e.memoizedState;var d=null!==r&&null!==r.memoizedState,c=zl,u=Cl;if(zl=c||a,Cl=u||d,Ul(t,e),Cl=u,zl=c,Wl(e),8192&n)e:for(t=e.stateNode,t._visibility=a?-2&t._visibility:1|t._visibility,a&&(null===r||d||zl||Cl||Jl(e)),r=null,t=e;;){if(5===t.tag||26===t.tag){if(null===r){d=r=t;try{if(i=d.stateNode,a)"function"===typeof(s=i.style).setProperty?s.setProperty("display","none","important"):s.display="none";else{l=d.stateNode;var p=d.memoizedProps.style,m=void 0!==p&&null!==p&&p.hasOwnProperty("display")?p.display:null;l.style.display=null==m||"boolean"===typeof m?"":(""+m).trim()}}catch(h){Sc(d,d.return,h)}}}else if(6===t.tag){if(null===r){d=t;try{d.stateNode.nodeValue=a?"":d.memoizedProps}catch(h){Sc(d,d.return,h)}}}else if(18===t.tag){if(null===r){d=t;try{var f=d.stateNode;a?zu(f,!0):zu(d.stateNode,!1)}catch(h){Sc(d,d.return,h)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}4&n&&(null!==(n=e.updateQueue)&&(null!==(r=n.retryQueue)&&(n.retryQueue=null,Vl(e,r))));case 30:case 21:}}function Wl(e){var t=e.flags;if(2&t){try{for(var r,n=e.return;null!==n;){if(Sl(n)){r=n;break}n=n.return}if(null==r)throw Error(o(160));switch(r.tag){case 27:var a=r.stateNode;El(e,$l(e),a);break;case 5:var i=r.stateNode;32&r.flags&&(St(i,""),r.flags&=-33),El(e,$l(e),i);break;case 3:case 4:var s=r.stateNode.containerInfo;Nl(e,$l(e),s);break;default:throw Error(o(161))}}catch(l){Sc(e,e.return,l)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Gl(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Gl(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Yl(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Ol(e,t.alternate,t),t=t.sibling}function Jl(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:xl(4,t,t.return),Jl(t);break;case 1:yl(t,t.return);var r=t.stateNode;"function"===typeof r.componentWillUnmount&&bl(t,t.return,r),Jl(t);break;case 27:Iu(t.stateNode);case 26:case 5:yl(t,t.return),Jl(t);break;case 22:null===t.memoizedState&&Jl(t);break;default:Jl(t)}e=e.sibling}}function Ql(e,t,r){for(r=r&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var n=t.alternate,a=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:Ql(a,i,r),gl(4,i);break;case 1:if(Ql(a,i,r),"function"===typeof(a=(n=i).stateNode).componentDidMount)try{a.componentDidMount()}catch(d){Sc(n,n.return,d)}if(null!==(a=(n=i).updateQueue)){var s=n.stateNode;try{var l=a.shared.hiddenCallbacks;if(null!==l)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)$i(l[a],s)}catch(d){Sc(n,n.return,d)}}r&&64&o&&vl(i),kl(i,i.return);break;case 27:_l(i);case 26:case 5:Ql(a,i,r),r&&null===n&&4&o&&jl(i),kl(i,i.return);break;case 12:Ql(a,i,r);break;case 31:Ql(a,i,r),r&&4&o&&Bl(a,i);break;case 13:Ql(a,i,r),r&&4&o&&Ml(a,i);break;case 22:null===i.memoizedState&&Ql(a,i,r),kl(i,i.return);break;case 30:break;default:Ql(a,i,r)}t=t.sibling}}function Xl(e,t){var r=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(r=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==r&&(null!=e&&e.refCount++,null!=r&&Ba(r))}function Zl(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ba(e))}function ed(e,t,r,n){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)td(e,t,r,n),t=t.sibling}function td(e,t,r,n){var a=t.flags;switch(t.tag){case 0:case 11:case 15:ed(e,t,r,n),2048&a&&gl(9,t);break;case 1:case 31:case 13:default:ed(e,t,r,n);break;case 3:ed(e,t,r,n),2048&a&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ba(e)));break;case 12:if(2048&a){ed(e,t,r,n),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,s=i.onPostCommit;"function"===typeof s&&s(o,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(l){Sc(t,t.return,l)}}else ed(e,t,r,n);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,null!==t.memoizedState?2&i._visibility?ed(e,t,r,n):nd(e,t):2&i._visibility?ed(e,t,r,n):(i._visibility|=2,rd(e,t,r,n,0!==(10256&t.subtreeFlags)||!1)),2048&a&&Xl(o,t);break;case 24:ed(e,t,r,n),2048&a&&Zl(t.alternate,t)}}function rd(e,t,r,n,a){for(a=a&&(0!==(10256&t.subtreeFlags)||!1),t=t.child;null!==t;){var i=e,o=t,s=r,l=n,d=o.flags;switch(o.tag){case 0:case 11:case 15:rd(i,o,s,l,a),gl(8,o);break;case 23:break;case 22:var c=o.stateNode;null!==o.memoizedState?2&c._visibility?rd(i,o,s,l,a):nd(i,o):(c._visibility|=2,rd(i,o,s,l,a)),a&&2048&d&&Xl(o.alternate,o);break;case 24:rd(i,o,s,l,a),a&&2048&d&&Zl(o.alternate,o);break;default:rd(i,o,s,l,a)}t=t.sibling}}function nd(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var r=e,n=t,a=n.flags;switch(n.tag){case 22:nd(r,n),2048&a&&Xl(n.alternate,n);break;case 24:nd(r,n),2048&a&&Zl(n.alternate,n);break;default:nd(r,n)}t=t.sibling}}var ad=8192;function id(e,t,r){if(e.subtreeFlags&ad)for(e=e.child;null!==e;)od(e,t,r),e=e.sibling}function od(e,t,r){switch(e.tag){case 26:id(e,t,r),e.flags&ad&&null!==e.memoizedState&&function(e,t,r,n){if("stylesheet"===r.type&&("string"!==typeof n.media||!1!==matchMedia(n.media).matches)&&0===(4&r.state.loading)){if(null===r.instance){var a=qu(n.href),i=t.querySelector(Gu(a));if(i)return null!==(t=i._p)&&"object"===typeof t&&"function"===typeof t.then&&(e.count++,e=sp.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=i,void et(i);i=t.ownerDocument||t,n=Yu(n),(a=Bu.get(a))&&ep(n,a),et(i=i.createElement("link"));var o=i;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),mu(i,"link",n),r.instance=i}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&0===(3&r.state.loading)&&(e.count++,r=sp.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}(r,Kl,e.memoizedState,e.memoizedProps);break;case 5:default:id(e,t,r);break;case 3:case 4:var n=Kl;Kl=Vu(e.stateNode.containerInfo),id(e,t,r),Kl=n;break;case 22:null===e.memoizedState&&(null!==(n=e.alternate)&&null!==n.memoizedState?(n=ad,ad=16777216,id(e,t,r),ad=n):id(e,t,r))}}function sd(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function ld(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var r=0;r<t.length;r++){var n=t[r];Fl=n,ud(n,e)}sd(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)dd(e),e=e.sibling}function dd(e){switch(e.tag){case 0:case 11:case 15:ld(e),2048&e.flags&&xl(9,e,e.return);break;case 3:case 12:default:ld(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,cd(e)):ld(e)}}function cd(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var r=0;r<t.length;r++){var n=t[r];Fl=n,ud(n,e)}sd(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:xl(8,t,t.return),cd(t);break;case 22:2&(r=t.stateNode)._visibility&&(r._visibility&=-3,cd(t));break;default:cd(t)}e=e.sibling}}function ud(e,t){for(;null!==Fl;){var r=Fl;switch(r.tag){case 0:case 11:case 15:xl(8,r,t);break;case 23:case 22:if(null!==r.memoizedState&&null!==r.memoizedState.cachePool){var n=r.memoizedState.cachePool.pool;null!=n&&n.refCount++}break;case 24:Ba(r.memoizedState.cache)}if(null!==(n=r.child))n.return=r,Fl=n;else e:for(r=e;null!==Fl;){var a=(n=Fl).sibling,i=n.return;if(Tl(n),n===r){Fl=null;break e}if(null!==a){a.return=i,Fl=a;break e}Fl=i}}}var pd={getCacheForType:function(e){var t=Da(Ra),r=t.data.get(e);return void 0===r&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return Da(Ra).controller.signal}},md="function"===typeof WeakMap?WeakMap:Map,fd=0,hd=null,gd=null,xd=0,vd=0,bd=null,kd=!1,yd=!1,jd=!1,wd=0,Sd=0,$d=0,Nd=0,Ed=0,_d=0,zd=0,Cd=null,Ad=null,Dd=!1,Fd=0,Od=0,Td=1/0,Pd=null,Ld=null,Rd=0,Id=null,Bd=null,Md=0,Vd=0,Ud=null,Kd=null,Hd=0,Wd=null;function qd(){return 0!==(2&fd)&&0!==xd?xd&-xd:null!==O.T?Uc():Re()}function Gd(){if(0===_d)if(0===(536870912&xd)||ua){var e=Se;0===(3932160&(Se<<=1))&&(Se=262144),_d=e}else _d=536870912;return null!==(e=Di.current)&&(e.flags|=32),_d}function Yd(e,t,r){(e!==hd||2!==vd&&9!==vd)&&null===e.cancelPendingCommit||(rc(e,0),Zd(e,xd,_d,!1)),De(e,r),0!==(2&fd)&&e===hd||(e===hd&&(0===(2&fd)&&(Nd|=r),4===Sd&&Zd(e,xd,_d,!1)),Pc(e))}function Jd(e,t,r){if(0!==(6&fd))throw Error(o(327));for(var n=!r&&0===(127&t)&&0===(t&e.expiredLanes)||_e(e,t),a=n?function(e,t){var r=fd;fd|=2;var n=ic(),a=oc();hd!==e||xd!==t?(Pd=null,Td=le()+500,rc(e,t)):yd=_e(e,t);e:for(;;)try{if(0!==vd&&null!==gd){t=gd;var i=bd;t:switch(vd){case 1:vd=0,bd=null,mc(e,t,i,1);break;case 2:case 9:if(ti(i)){vd=0,bd=null,pc(t);break}t=function(){2!==vd&&9!==vd||hd!==e||(vd=7),Pc(e)},i.then(t,t);break e;case 3:vd=7;break e;case 4:vd=5;break e;case 7:ti(i)?(vd=0,bd=null,pc(t)):(vd=0,bd=null,mc(e,t,i,7));break;case 5:var s=null;switch(gd.tag){case 26:s=gd.memoizedState;case 5:case 27:var l=gd;if(s?ip(s):l.stateNode.complete){vd=0,bd=null;var d=l.sibling;if(null!==d)gd=d;else{var c=l.return;null!==c?(gd=c,fc(c)):gd=null}break t}}vd=0,bd=null,mc(e,t,i,5);break;case 6:vd=0,bd=null,mc(e,t,i,6);break;case 8:tc(),Sd=6;break e;default:throw Error(o(462))}}cc();break}catch(u){nc(e,u)}return Sa=wa=null,O.H=n,O.A=a,fd=r,null!==gd?0:(hd=null,xd=0,Cn(),Sd)}(e,t):lc(e,t,!0),i=n;;){if(0===a){yd&&!n&&Zd(e,t,0,!1);break}if(r=e.current.alternate,!i||Xd(r)){if(2===a){if(i=t,e.errorRecoveryDisabledLanes&i)var s=0;else s=0!==(s=-536870913&e.pendingLanes)?s:536870912&s?536870912:0;if(0!==s){t=s;e:{var l=e;a=Cd;var d=l.current.memoizedState.isDehydrated;if(d&&(rc(l,s).flags|=256),2!==(s=lc(l,s,!1))){if(jd&&!d){l.errorRecoveryDisabledLanes|=i,Nd|=i,a=4;break e}i=Ad,Ad=a,null!==i&&(null===Ad?Ad=i:Ad.push.apply(Ad,i))}a=s}if(i=!1,2!==a)continue}}if(1===a){rc(e,0),Zd(e,t,0,!0);break}e:{switch(n=e,i=a){case 0:case 1:throw Error(o(345));case 4:if((4194048&t)!==t)break;case 6:Zd(n,t,_d,!kd);break e;case 2:Ad=null;break;case 3:case 5:break;default:throw Error(o(329))}if((62914560&t)===t&&10<(a=Fd+300-le())){if(Zd(n,t,_d,!kd),0!==Ee(n,0,!0))break e;Md=t,n.timeoutHandle=ju(Qd.bind(null,n,r,Ad,Pd,Dd,t,_d,Nd,zd,kd,i,"Throttled",-0,0),a)}else Qd(n,r,Ad,Pd,Dd,t,_d,Nd,zd,kd,i,null,-0,0)}break}a=lc(e,t,!1),i=!1}Pc(e)}function Qd(e,t,r,n,a,i,o,s,l,d,c,u,p,m){if(e.timeoutHandle=-1,8192&(u=t.subtreeFlags)||16785408===(16785408&u)){od(t,i,u={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Dt});var f=(62914560&i)===i?Fd-le():(4194048&i)===i?Od-le():0;if(null!==(f=function(e,t){return e.stylesheets&&0===e.count&&dp(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var n=setTimeout(function(){if(e.stylesheets&&dp(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&0===op&&(op=62500*function(){if("function"===typeof performance.getEntriesByType){for(var e=0,t=0,r=performance.getEntriesByType("resource"),n=0;n<r.length;n++){var a=r[n],i=a.transferSize,o=a.initiatorType,s=a.duration;if(i&&s&&fu(o)){for(o=0,s=a.responseEnd,n+=1;n<r.length;n++){var l=r[n],d=l.startTime;if(d>s)break;var c=l.transferSize,u=l.initiatorType;c&&fu(u)&&(o+=c*((l=l.responseEnd)<s?1:(s-d)/(l-d)))}if(--n,t+=8*(i+o)/(a.duration/1e3),10<++e)break}}if(0<e)return t/e/1e6}return navigator.connection&&"number"===typeof(e=navigator.connection.downlink)?e:5}());var a=setTimeout(function(){if(e.waitingForImages=!1,0===e.count&&(e.stylesheets&&dp(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>op?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(a)}}:null}(u,f)))return Md=i,e.cancelPendingCommit=f(gc.bind(null,e,t,i,r,n,a,o,s,l,c,u,null,p,m)),void Zd(e,i,o,!d)}gc(e,t,i,r,n,a,o,s,l)}function Xd(e){for(var t=e;;){var r=t.tag;if((0===r||11===r||15===r)&&16384&t.flags&&(null!==(r=t.updateQueue)&&null!==(r=r.stores)))for(var n=0;n<r.length;n++){var a=r[n],i=a.getSnapshot;a=a.value;try{if(!Qr(i(),a))return!1}catch(o){return!1}}if(r=t.child,16384&t.subtreeFlags&&null!==r)r.return=t,t=r;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zd(e,t,r,n){t&=~Ed,t&=~Nd,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var a=t;0<a;){var i=31-ke(a),o=1<<i;n[i]=-1,a&=~o}0!==r&&Fe(e,r,t)}function ec(){return 0!==(6&fd)||(Lc(0,!1),!1)}function tc(){if(null!==gd){if(0===vd)var e=gd.return;else Sa=wa=null,oo(e=gd),si=null,li=0,e=gd;for(;null!==e;)hl(e.alternate,e),e=e.return;gd=null}}function rc(e,t){var r=e.timeoutHandle;-1!==r&&(e.timeoutHandle=-1,wu(r)),null!==(r=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,r()),Md=0,tc(),hd=e,gd=r=Bn(e.current,null),xd=t,vd=0,bd=null,kd=!1,yd=_e(e,t),jd=!1,zd=_d=Ed=Nd=$d=Sd=0,Ad=Cd=null,Dd=!1,0!==(8&t)&&(t|=32&t);var n=e.entangledLanes;if(0!==n)for(e=e.entanglements,n&=t;0<n;){var a=31-ke(n),i=1<<a;t|=e[a],n&=~i}return wd=t,Cn(),r}function nc(e,t){Vi=null,O.H=hs,t===Qa||t===Za?(t=ii(),vd=3):t===Xa?(t=ii(),vd=4):vd=t===Ds?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,bd=t,null===gd&&(Sd=1,Es(e,Gn(t,e.current)))}function ac(){var e=Di.current;return null===e||((4194048&xd)===xd?null===Fi:((62914560&xd)===xd||0!==(536870912&xd))&&e===Fi)}function ic(){var e=O.H;return O.H=hs,null===e?hs:e}function oc(){var e=O.A;return O.A=pd,e}function sc(){Sd=4,kd||(4194048&xd)!==xd&&null!==Di.current||(yd=!0),0===(134217727&$d)&&0===(134217727&Nd)||null===hd||Zd(hd,xd,_d,!1)}function lc(e,t,r){var n=fd;fd|=2;var a=ic(),i=oc();hd===e&&xd===t||(Pd=null,rc(e,t)),t=!1;var o=Sd;e:for(;;)try{if(0!==vd&&null!==gd){var s=gd,l=bd;switch(vd){case 8:tc(),o=6;break e;case 3:case 2:case 9:case 6:null===Di.current&&(t=!0);var d=vd;if(vd=0,bd=null,mc(e,s,l,d),r&&yd){o=0;break e}break;default:d=vd,vd=0,bd=null,mc(e,s,l,d)}}dc(),o=Sd;break}catch(c){nc(e,c)}return t&&e.shellSuspendCounter++,Sa=wa=null,fd=n,O.H=a,O.A=i,null===gd&&(hd=null,xd=0,Cn()),o}function dc(){for(;null!==gd;)uc(gd)}function cc(){for(;null!==gd&&!oe();)uc(gd)}function uc(e){var t=ol(e.alternate,e,wd);e.memoizedProps=e.pendingProps,null===t?fc(e):gd=t}function pc(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=Hs(r,t,t.pendingProps,t.type,void 0,xd);break;case 11:t=Hs(r,t,t.pendingProps,t.type.render,t.ref,xd);break;case 5:oo(t);default:hl(r,t),t=ol(r,t=gd=Mn(t,wd),wd)}e.memoizedProps=e.pendingProps,null===t?fc(e):gd=t}function mc(e,t,r,n){Sa=wa=null,oo(t),si=null,li=0;var a=t.return;try{if(function(e,t,r,n,a){if(r.flags|=32768,null!==n&&"object"===typeof n&&"function"===typeof n.then){if(null!==(t=r.alternate)&&za(t,r,a,!0),null!==(r=Di.current)){switch(r.tag){case 31:case 13:return null===Fi?sc():null===r.alternate&&0===Sd&&(Sd=3),r.flags&=-257,r.flags|=65536,r.lanes=a,n===ei?r.flags|=16384:(null===(t=r.updateQueue)?r.updateQueue=new Set([n]):t.add(n),$c(e,n,a)),!1;case 22:return r.flags|=65536,n===ei?r.flags|=16384:(null===(t=r.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},r.updateQueue=t):null===(r=t.retryQueue)?t.retryQueue=new Set([n]):r.add(n),$c(e,n,a)),!1}throw Error(o(435,r.tag))}return $c(e,n,a),sc(),!1}if(ua)return null!==(t=Di.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=a,n!==fa&&ya(Gn(e=Error(o(422),{cause:n}),r))):(n!==fa&&ya(Gn(t=Error(o(423),{cause:n}),r)),(e=e.current.alternate).flags|=65536,a&=-a,e.lanes|=a,n=Gn(n,r),yi(e,a=zs(e.stateNode,n,a)),4!==Sd&&(Sd=2)),!1;var i=Error(o(520),{cause:n});if(i=Gn(i,r),null===Cd?Cd=[i]:Cd.push(i),4!==Sd&&(Sd=2),null===t)return!0;n=Gn(n,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=a&-a,r.lanes|=e,yi(r,e=zs(r.stateNode,n,e)),!1;case 1:if(t=r.type,i=r.stateNode,0===(128&r.flags)&&("function"===typeof t.getDerivedStateFromError||null!==i&&"function"===typeof i.componentDidCatch&&(null===Ld||!Ld.has(i))))return r.flags|=65536,a&=-a,r.lanes|=a,As(a=Cs(a),e,r,n),yi(r,a),!1}r=r.return}while(null!==r);return!1}(e,a,t,r,xd))return Sd=1,Es(e,Gn(r,e.current)),void(gd=null)}catch(i){if(null!==a)throw gd=a,i;return Sd=1,Es(e,Gn(r,e.current)),void(gd=null)}32768&t.flags?(ua||1===n?e=!0:yd||0!==(536870912&xd)?e=!1:(kd=e=!0,(2===n||9===n||3===n||6===n)&&(null!==(n=Di.current)&&13===n.tag&&(n.flags|=16384))),hc(t,e)):fc(t)}function fc(e){var t=e;do{if(0!==(32768&t.flags))return void hc(t,kd);e=t.return;var r=ml(t.alternate,t,wd);if(null!==r)return void(gd=r);if(null!==(t=t.sibling))return void(gd=t);gd=t=e}while(null!==t);0===Sd&&(Sd=5)}function hc(e,t){do{var r=fl(e.alternate,e);if(null!==r)return r.flags&=32767,void(gd=r);if(null!==(r=e.return)&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&null!==(e=e.sibling))return void(gd=e);gd=e=r}while(null!==e);Sd=6,gd=null}function gc(e,t,r,n,a,i,s,l,d){e.cancelPendingCommit=null;do{yc()}while(0!==Rd);if(0!==(6&fd))throw Error(o(327));if(null!==t){if(t===e.current)throw Error(o(177));if(i=t.lanes|t.childLanes,function(e,t,r,n,a,i){var o=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var s=e.entanglements,l=e.expirationTimes,d=e.hiddenUpdates;for(r=o&~r;0<r;){var c=31-ke(r),u=1<<c;s[c]=0,l[c]=-1;var p=d[c];if(null!==p)for(d[c]=null,c=0;c<p.length;c++){var m=p[c];null!==m&&(m.lane&=-536870913)}r&=~u}0!==n&&Fe(e,n,0),0!==i&&0===a&&0!==e.tag&&(e.suspendedLanes|=i&~(o&~t))}(e,r,i|=zn,s,l,d),e===hd&&(gd=hd=null,xd=0),Bd=t,Id=e,Md=r,Vd=i,Ud=a,Kd=n,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,ae(pe,function(){return jc(),null})):(e.callbackNode=null,e.callbackPriority=0),n=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||n){n=O.T,O.T=null,a=T.p,T.p=2,s=fd,fd|=4;try{!function(e,t){if(e=e.containerInfo,hu=kp,nn(e=rn(e))){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{var n=(r=(r=e.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection();if(n&&0!==n.rangeCount){r=n.anchorNode;var a=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch(g){r=null;break e}var s=0,l=-1,d=-1,c=0,u=0,p=e,m=null;t:for(;;){for(var f;p!==r||0!==a&&3!==p.nodeType||(l=s+a),p!==i||0!==n&&3!==p.nodeType||(d=s+n),3===p.nodeType&&(s+=p.nodeValue.length),null!==(f=p.firstChild);)m=p,p=f;for(;;){if(p===e)break t;if(m===r&&++c===a&&(l=s),m===i&&++u===n&&(d=s),null!==(f=p.nextSibling))break;m=(p=m).parentNode}p=f}r=-1===l||-1===d?null:{start:l,end:d}}else r=null}r=r||{start:0,end:0}}else r=null;for(gu={focusedElem:e,selectionRange:r},kp=!1,Fl=t;null!==Fl;)if(e=(t=Fl).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Fl=e;else for(;null!==Fl;){switch(i=(t=Fl).alternate,e=t.flags,t.tag){case 0:if(0!==(4&e)&&null!==(e=null!==(e=t.updateQueue)?e.events:null))for(r=0;r<e.length;r++)(a=e[r]).ref.impl=a.nextImpl;break;case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==i){e=void 0,r=t,a=i.memoizedProps,i=i.memoizedState,n=r.stateNode;try{var h=ws(r.type,a);e=n.getSnapshotBeforeUpdate(h,i),n.__reactInternalSnapshotBeforeUpdate=e}catch(x){Sc(r,r.return,x)}}break;case 3:if(0!==(1024&e))if(9===(r=(e=t.stateNode.containerInfo).nodeType))Cu(e);else if(1===r)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Cu(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(o(163))}if(null!==(e=t.sibling)){e.return=t.return,Fl=e;break}Fl=t.return}}(e,t)}finally{fd=s,T.p=a,O.T=n}}Rd=1,xc(),vc(),bc()}}function xc(){if(1===Rd){Rd=0;var e=Id,t=Bd,r=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||r){r=O.T,O.T=null;var n=T.p;T.p=2;var a=fd;fd|=4;try{Hl(t,e);var i=gu,o=rn(e.containerInfo),s=i.focusedElem,l=i.selectionRange;if(o!==s&&s&&s.ownerDocument&&tn(s.ownerDocument.documentElement,s)){if(null!==l&&nn(s)){var d=l.start,c=l.end;if(void 0===c&&(c=d),"selectionStart"in s)s.selectionStart=d,s.selectionEnd=Math.min(c,s.value.length);else{var u=s.ownerDocument||document,p=u&&u.defaultView||window;if(p.getSelection){var m=p.getSelection(),f=s.textContent.length,h=Math.min(l.start,f),g=void 0===l.end?h:Math.min(l.end,f);!m.extend&&h>g&&(o=g,g=h,h=o);var x=en(s,h),v=en(s,g);if(x&&v&&(1!==m.rangeCount||m.anchorNode!==x.node||m.anchorOffset!==x.offset||m.focusNode!==v.node||m.focusOffset!==v.offset)){var b=u.createRange();b.setStart(x.node,x.offset),m.removeAllRanges(),h>g?(m.addRange(b),m.extend(v.node,v.offset)):(b.setEnd(v.node,v.offset),m.addRange(b))}}}}for(u=[],m=s;m=m.parentNode;)1===m.nodeType&&u.push({element:m,left:m.scrollLeft,top:m.scrollTop});for("function"===typeof s.focus&&s.focus(),s=0;s<u.length;s++){var k=u[s];k.element.scrollLeft=k.left,k.element.scrollTop=k.top}}kp=!!hu,gu=hu=null}finally{fd=a,T.p=n,O.T=r}}e.current=t,Rd=2}}function vc(){if(2===Rd){Rd=0;var e=Id,t=Bd,r=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||r){r=O.T,O.T=null;var n=T.p;T.p=2;var a=fd;fd|=4;try{Ol(e,t.alternate,t)}finally{fd=a,T.p=n,O.T=r}}Rd=3}}function bc(){if(4===Rd||3===Rd){Rd=0,se();var e=Id,t=Bd,r=Md,n=Kd;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Rd=5:(Rd=0,Bd=Id=null,kc(e,e.pendingLanes));var a=e.pendingLanes;if(0===a&&(Ld=null),Le(r),t=t.stateNode,ve&&"function"===typeof ve.onCommitFiberRoot)try{ve.onCommitFiberRoot(xe,t,void 0,128===(128&t.current.flags))}catch(l){}if(null!==n){t=O.T,a=T.p,T.p=2,O.T=null;try{for(var i=e.onRecoverableError,o=0;o<n.length;o++){var s=n[o];i(s.value,{componentStack:s.stack})}}finally{O.T=t,T.p=a}}0!==(3&Md)&&yc(),Pc(e),a=e.pendingLanes,0!==(261930&r)&&0!==(42&a)?e===Wd?Hd++:(Hd=0,Wd=e):Hd=0,Lc(0,!1)}}function kc(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Ba(t)))}function yc(){return xc(),vc(),bc(),jc()}function jc(){if(5!==Rd)return!1;var e=Id,t=Vd;Vd=0;var r=Le(Md),n=O.T,a=T.p;try{T.p=32>r?32:r,O.T=null,r=Ud,Ud=null;var i=Id,s=Md;if(Rd=0,Bd=Id=null,Md=0,0!==(6&fd))throw Error(o(331));var l=fd;if(fd|=4,dd(i.current),td(i,i.current,s,r),fd=l,Lc(0,!1),ve&&"function"===typeof ve.onPostCommitFiberRoot)try{ve.onPostCommitFiberRoot(xe,i)}catch(d){}return!0}finally{T.p=a,O.T=n,kc(e,t)}}function wc(e,t,r){t=Gn(r,t),null!==(e=bi(e,t=zs(e.stateNode,t,2),2))&&(De(e,2),Pc(e))}function Sc(e,t,r){if(3===e.tag)wc(e,e,r);else for(;null!==t;){if(3===t.tag){wc(t,e,r);break}if(1===t.tag){var n=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof n.componentDidCatch&&(null===Ld||!Ld.has(n))){e=Gn(r,e),null!==(n=bi(t,r=Cs(2),2))&&(As(r,n,t,e),De(n,2),Pc(n));break}}t=t.return}}function $c(e,t,r){var n=e.pingCache;if(null===n){n=e.pingCache=new md;var a=new Set;n.set(t,a)}else void 0===(a=n.get(t))&&(a=new Set,n.set(t,a));a.has(r)||(jd=!0,a.add(r),e=Nc.bind(null,e,t,r),t.then(e,e))}function Nc(e,t,r){var n=e.pingCache;null!==n&&n.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,hd===e&&(xd&r)===r&&(4===Sd||3===Sd&&(62914560&xd)===xd&&300>le()-Fd?0===(2&fd)&&rc(e,0):Ed|=r,zd===xd&&(zd=0)),Pc(e)}function Ec(e,t){0===t&&(t=Ce()),null!==(e=Fn(e,t))&&(De(e,t),Pc(e))}function _c(e){var t=e.memoizedState,r=0;null!==t&&(r=t.retryLane),Ec(e,r)}function zc(e,t){var r=0;switch(e.tag){case 31:case 13:var n=e.stateNode,a=e.memoizedState;null!==a&&(r=a.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(o(314))}null!==n&&n.delete(t),Ec(e,r)}var Cc=null,Ac=null,Dc=!1,Fc=!1,Oc=!1,Tc=0;function Pc(e){e!==Ac&&null===e.next&&(null===Ac?Cc=Ac=e:Ac=Ac.next=e),Fc=!0,Dc||(Dc=!0,$u(function(){0!==(6&fd)?ae(ce,Rc):Ic()}))}function Lc(e,t){if(!Oc&&Fc){Oc=!0;do{for(var r=!1,n=Cc;null!==n;){if(!t)if(0!==e){var a=n.pendingLanes;if(0===a)var i=0;else{var o=n.suspendedLanes,s=n.pingedLanes;i=(1<<31-ke(42|e)+1)-1,i=201326741&(i&=a&~(o&~s))?201326741&i|1:i?2|i:0}0!==i&&(r=!0,Vc(n,i))}else i=xd,0===(3&(i=Ee(n,n===hd?i:0,null!==n.cancelPendingCommit||-1!==n.timeoutHandle)))||_e(n,i)||(r=!0,Vc(n,i));n=n.next}}while(r);Oc=!1}}function Rc(){Ic()}function Ic(){Fc=Dc=!1;var e=0;0!==Tc&&function(){var e=window.event;if(e&&"popstate"===e.type)return e!==yu&&(yu=e,!0);return yu=null,!1}()&&(e=Tc);for(var t=le(),r=null,n=Cc;null!==n;){var a=n.next,i=Bc(n,t);0===i?(n.next=null,null===r?Cc=a:r.next=a,null===a&&(Ac=r)):(r=n,(0!==e||0!==(3&i))&&(Fc=!0)),n=a}0!==Rd&&5!==Rd||Lc(e,!1),0!==Tc&&(Tc=0)}function Bc(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,a=e.expirationTimes,i=-62914561&e.pendingLanes;0<i;){var o=31-ke(i),s=1<<o,l=a[o];-1===l?0!==(s&r)&&0===(s&n)||(a[o]=ze(s,t)):l<=t&&(e.expiredLanes|=s),i&=~s}if(r=xd,r=Ee(e,e===(t=hd)?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),n=e.callbackNode,0===r||e===t&&(2===vd||9===vd)||null!==e.cancelPendingCommit)return null!==n&&null!==n&&ie(n),e.callbackNode=null,e.callbackPriority=0;if(0===(3&r)||_e(e,r)){if((t=r&-r)===e.callbackPriority)return t;switch(null!==n&&ie(n),Le(r)){case 2:case 8:r=ue;break;case 32:default:r=pe;break;case 268435456:r=fe}return n=Mc.bind(null,e),r=ae(r,n),e.callbackPriority=t,e.callbackNode=r,t}return null!==n&&null!==n&&ie(n),e.callbackPriority=2,e.callbackNode=null,2}function Mc(e,t){if(0!==Rd&&5!==Rd)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(yc()&&e.callbackNode!==r)return null;var n=xd;return 0===(n=Ee(e,e===hd?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Jd(e,n,t),Bc(e,le()),null!=e.callbackNode&&e.callbackNode===r?Mc.bind(null,e):null)}function Vc(e,t){if(yc())return null;Jd(e,t,!0)}function Uc(){if(0===Tc){var e=Ua;0===e&&(e=we,0===(261888&(we<<=1))&&(we=256)),Tc=e}return Tc}function Kc(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:At(""+e)}function Hc(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}for(var Wc=0;Wc<Sn.length;Wc++){var qc=Sn[Wc];$n(qc.toLowerCase(),"on"+(qc[0].toUpperCase()+qc.slice(1)))}$n(gn,"onAnimationEnd"),$n(xn,"onAnimationIteration"),$n(vn,"onAnimationStart"),$n("dblclick","onDoubleClick"),$n("focusin","onFocus"),$n("focusout","onBlur"),$n(bn,"onTransitionRun"),$n(kn,"onTransitionStart"),$n(yn,"onTransitionCancel"),$n(jn,"onTransitionEnd"),at("onMouseEnter",["mouseout","mouseover"]),at("onMouseLeave",["mouseout","mouseover"]),at("onPointerEnter",["pointerout","pointerover"]),at("onPointerLeave",["pointerout","pointerover"]),nt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),nt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),nt("onBeforeInput",["compositionend","keypress","textInput","paste"]),nt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),nt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),nt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Gc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Yc=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Gc));function Jc(e,t){t=0!==(4&t);for(var r=0;r<e.length;r++){var n=e[r],a=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var o=n.length-1;0<=o;o--){var s=n[o],l=s.instance,d=s.currentTarget;if(s=s.listener,l!==i&&a.isPropagationStopped())break e;i=s,a.currentTarget=d;try{i(a)}catch(c){Nn(c)}a.currentTarget=null,i=l}else for(o=0;o<n.length;o++){if(l=(s=n[o]).instance,d=s.currentTarget,s=s.listener,l!==i&&a.isPropagationStopped())break e;i=s,a.currentTarget=d;try{i(a)}catch(c){Nn(c)}a.currentTarget=null,i=l}}}}function Qc(e,t){var r=t[Ke];void 0===r&&(r=t[Ke]=new Set);var n=e+"__bubble";r.has(n)||(tu(t,e,2,!1),r.add(n))}function Xc(e,t,r){var n=0;t&&(n|=4),tu(r,e,n,t)}var Zc="_reactListening"+Math.random().toString(36).slice(2);function eu(e){if(!e[Zc]){e[Zc]=!0,tt.forEach(function(t){"selectionchange"!==t&&(Yc.has(t)||Xc(t,!1,e),Xc(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Zc]||(t[Zc]=!0,Xc("selectionchange",!1,t))}}function tu(e,t,r,n){switch(Ep(t)){case 2:var a=yp;break;case 8:a=jp;break;default:a=wp}r=a.bind(null,t,r,e),a=void 0,!Vt||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),n?void 0!==a?e.addEventListener(t,r,{capture:!0,passive:a}):e.addEventListener(t,r,!0):void 0!==a?e.addEventListener(t,r,{passive:a}):e.addEventListener(t,r,!1)}function ru(e,t,r,n,a){var i=n;if(0===(1&t)&&0===(2&t)&&null!==n)e:for(;;){if(null===n)return;var o=n.tag;if(3===o||4===o){var s=n.stateNode.containerInfo;if(s===a)break;if(4===o)for(o=n.return;null!==o;){var d=o.tag;if((3===d||4===d)&&o.stateNode.containerInfo===a)return;o=o.return}for(;null!==s;){if(null===(o=Je(s)))return;if(5===(d=o.tag)||6===d||26===d||27===d){n=i=o;continue e}s=s.parentNode}}n=n.return}It(function(){var n=i,a=Ot(r),o=[];e:{var s=wn.get(e);if(void 0!==s){var d=rr,c=e;switch(e){case"keypress":if(0===Gt(r))break e;case"keydown":case"keyup":d=xr;break;case"focusin":c="focus",d=lr;break;case"focusout":c="blur",d=lr;break;case"beforeblur":case"afterblur":d=lr;break;case"click":if(2===r.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=or;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=sr;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=br;break;case gn:case xn:case vn:d=dr;break;case jn:d=kr;break;case"scroll":case"scrollend":d=ar;break;case"wheel":d=yr;break;case"copy":case"cut":case"paste":d=cr;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=vr;break;case"toggle":case"beforetoggle":d=jr}var u=0!==(4&t),p=!u&&("scroll"===e||"scrollend"===e),m=u?null!==s?s+"Capture":null:s;u=[];for(var f,h=n;null!==h;){var g=h;if(f=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===f||null===m||null!=(g=Bt(h,m))&&u.push(nu(h,g,f)),p)break;h=h.return}0<u.length&&(s=new d(s,c,null,r,a),o.push({event:s,listeners:u}))}}if(0===(7&t)){if(d="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||r===Ft||!(c=r.relatedTarget||r.fromElement)||!Je(c)&&!c[Ue])&&(d||s)&&(s=a.window===a?a:(s=a.ownerDocument)?s.defaultView||s.parentWindow:window,d?(d=n,null!==(c=(c=r.relatedTarget||r.toElement)?Je(c):null)&&(p=l(c),u=c.tag,c!==p||5!==u&&27!==u&&6!==u)&&(c=null)):(d=null,c=n),d!==c)){if(u=or,g="onMouseLeave",m="onMouseEnter",h="mouse","pointerout"!==e&&"pointerover"!==e||(u=vr,g="onPointerLeave",m="onPointerEnter",h="pointer"),p=null==d?s:Xe(d),f=null==c?s:Xe(c),(s=new u(g,h+"leave",d,r,a)).target=p,s.relatedTarget=f,g=null,Je(a)===n&&((u=new u(m,h+"enter",c,r,a)).target=f,u.relatedTarget=p,g=u),p=g,d&&c)e:{for(u=iu,h=c,f=0,g=m=d;g;g=u(g))f++;g=0;for(var x=h;x;x=u(x))g++;for(;0<f-g;)m=u(m),f--;for(;0<g-f;)h=u(h),g--;for(;f--;){if(m===h||null!==h&&m===h.alternate){u=m;break e}m=u(m),h=u(h)}u=null}else u=null;null!==d&&ou(o,s,d,u,!1),null!==c&&null!==p&&ou(o,p,c,u,!0)}if("select"===(d=(s=n?Xe(n):window).nodeName&&s.nodeName.toLowerCase())||"input"===d&&"file"===s.type)var v=Br;else if(Or(s))if(Mr)v=Jr;else{v=Gr;var b=qr}else!(d=s.nodeName)||"input"!==d.toLowerCase()||"checkbox"!==s.type&&"radio"!==s.type?n&&_t(n.elementType)&&(v=Br):v=Yr;switch(v&&(v=v(e,n))?Tr(o,v,r,a):(b&&b(e,s,n),"focusout"===e&&n&&"number"===s.type&&null!=n.memoizedProps.value&&kt(s,"number",s.value)),b=n?Xe(n):window,e){case"focusin":(Or(b)||"true"===b.contentEditable)&&(on=b,sn=n,ln=null);break;case"focusout":ln=sn=on=null;break;case"mousedown":dn=!0;break;case"contextmenu":case"mouseup":case"dragend":dn=!1,cn(o,r,a);break;case"selectionchange":if(an)break;case"keydown":case"keyup":cn(o,r,a)}var k;if(Sr)e:{switch(e){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Dr?Cr(e,r)&&(y="onCompositionEnd"):"keydown"===e&&229===r.keyCode&&(y="onCompositionStart");y&&(Er&&"ko"!==r.locale&&(Dr||"onCompositionStart"!==y?"onCompositionEnd"===y&&Dr&&(k=qt()):(Ht="value"in(Kt=a)?Kt.value:Kt.textContent,Dr=!0)),0<(b=au(n,y)).length&&(y=new ur(y,e,null,r,a),o.push({event:y,listeners:b}),k?y.data=k:null!==(k=Ar(r))&&(y.data=k))),(k=Nr?function(e,t){switch(e){case"compositionend":return Ar(t);case"keypress":return 32!==t.which?null:(zr=!0,_r);case"textInput":return(e=t.data)===_r&&zr?null:e;default:return null}}(e,r):function(e,t){if(Dr)return"compositionend"===e||!Sr&&Cr(e,t)?(e=qt(),Wt=Ht=Kt=null,Dr=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Er&&"ko"!==t.locale?null:t.data}}(e,r))&&(0<(y=au(n,"onBeforeInput")).length&&(b=new ur("onBeforeInput","beforeinput",null,r,a),o.push({event:b,listeners:y}),b.data=k)),function(e,t,r,n,a){if("submit"===t&&r&&r.stateNode===a){var i=Kc((a[Ve]||null).action),o=n.submitter;o&&null!==(t=(t=o[Ve]||null)?Kc(t.formAction):o.getAttribute("formAction"))&&(i=t,o=null);var s=new rr("action","action",null,n,a);e.push({event:s,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(0!==Tc){var e=o?Hc(a,o):new FormData(a);ts(r,{pending:!0,data:e,method:a.method,action:i},null,e)}}else"function"===typeof i&&(s.preventDefault(),e=o?Hc(a,o):new FormData(a),ts(r,{pending:!0,data:e,method:a.method,action:i},i,e))},currentTarget:a}]})}}(o,e,n,r,a)}Jc(o,t)})}function nu(e,t,r){return{instance:e,listener:t,currentTarget:r}}function au(e,t){for(var r=t+"Capture",n=[];null!==e;){var a=e,i=a.stateNode;if(5!==(a=a.tag)&&26!==a&&27!==a||null===i||(null!=(a=Bt(e,r))&&n.unshift(nu(e,a,i)),null!=(a=Bt(e,t))&&n.push(nu(e,a,i))),3===e.tag)return n;e=e.return}return[]}function iu(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function ou(e,t,r,n,a){for(var i=t._reactName,o=[];null!==r&&r!==n;){var s=r,l=s.alternate,d=s.stateNode;if(s=s.tag,null!==l&&l===n)break;5!==s&&26!==s&&27!==s||null===d||(l=d,a?null!=(d=Bt(r,i))&&o.unshift(nu(r,d,l)):a||null!=(d=Bt(r,i))&&o.push(nu(r,d,l))),r=r.return}0!==o.length&&e.push({event:t,listeners:o})}var su=/\r\n?/g,lu=/\u0000|\uFFFD/g;function du(e){return("string"===typeof e?e:""+e).replace(su,"\n").replace(lu,"")}function cu(e,t){return t=du(t),du(e)===t}function uu(e,t,r,n,a,i){switch(r){case"children":"string"===typeof n?"body"===t||"textarea"===t&&""===n||St(e,n):("number"===typeof n||"bigint"===typeof n)&&"body"!==t&&St(e,""+n);break;case"className":dt(e,"class",n);break;case"tabIndex":dt(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":dt(e,r,n);break;case"style":Et(e,n,i);break;case"data":if("object"!==t){dt(e,"data",n);break}case"src":case"href":if(""===n&&("a"!==t||"href"!==r)){e.removeAttribute(r);break}if(null==n||"function"===typeof n||"symbol"===typeof n||"boolean"===typeof n){e.removeAttribute(r);break}n=At(""+n),e.setAttribute(r,n);break;case"action":case"formAction":if("function"===typeof n){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof i&&("formAction"===r?("input"!==t&&uu(e,t,"name",a.name,a,null),uu(e,t,"formEncType",a.formEncType,a,null),uu(e,t,"formMethod",a.formMethod,a,null),uu(e,t,"formTarget",a.formTarget,a,null)):(uu(e,t,"encType",a.encType,a,null),uu(e,t,"method",a.method,a,null),uu(e,t,"target",a.target,a,null))),null==n||"symbol"===typeof n||"boolean"===typeof n){e.removeAttribute(r);break}n=At(""+n),e.setAttribute(r,n);break;case"onClick":null!=n&&(e.onclick=Dt);break;case"onScroll":null!=n&&Qc("scroll",e);break;case"onScrollEnd":null!=n&&Qc("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=n){if("object"!==typeof n||!("__html"in n))throw Error(o(61));if(null!=(r=n.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=r}}break;case"multiple":e.multiple=n&&"function"!==typeof n&&"symbol"!==typeof n;break;case"muted":e.muted=n&&"function"!==typeof n&&"symbol"!==typeof n;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==n||"function"===typeof n||"boolean"===typeof n||"symbol"===typeof n){e.removeAttribute("xlink:href");break}r=At(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,""+n):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":!0===n?e.setAttribute(r,""):!1!==n&&null!=n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,n):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":null!=n&&"function"!==typeof n&&"symbol"!==typeof n&&!isNaN(n)&&1<=n?e.setAttribute(r,n):e.removeAttribute(r);break;case"rowSpan":case"start":null==n||"function"===typeof n||"symbol"===typeof n||isNaN(n)?e.removeAttribute(r):e.setAttribute(r,n);break;case"popover":Qc("beforetoggle",e),Qc("toggle",e),lt(e,"popover",n);break;case"xlinkActuate":ct(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":ct(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":ct(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":ct(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":ct(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":ct(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":ct(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":ct(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":ct(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":lt(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<r.length)||"o"!==r[0]&&"O"!==r[0]||"n"!==r[1]&&"N"!==r[1])&&lt(e,r=zt.get(r)||r,n)}}function pu(e,t,r,n,a,i){switch(r){case"style":Et(e,n,i);break;case"dangerouslySetInnerHTML":if(null!=n){if("object"!==typeof n||!("__html"in n))throw Error(o(61));if(null!=(r=n.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=r}}break;case"children":"string"===typeof n?St(e,n):("number"===typeof n||"bigint"===typeof n)&&St(e,""+n);break;case"onScroll":null!=n&&Qc("scroll",e);break;case"onScrollEnd":null!=n&&Qc("scrollend",e);break;case"onClick":null!=n&&(e.onclick=Dt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:rt.hasOwnProperty(r)||("o"!==r[0]||"n"!==r[1]||(a=r.endsWith("Capture"),t=r.slice(2,a?r.length-7:void 0),"function"===typeof(i=null!=(i=e[Ve]||null)?i[r]:null)&&e.removeEventListener(t,i,a),"function"!==typeof n)?r in e?e[r]=n:!0===n?e.setAttribute(r,""):lt(e,r,n):("function"!==typeof i&&null!==i&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,n,a)))}}function mu(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Qc("error",e),Qc("load",e);var n,a=!1,i=!1;for(n in r)if(r.hasOwnProperty(n)){var s=r[n];if(null!=s)switch(n){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,n,s,r,null)}}return i&&uu(e,t,"srcSet",r.srcSet,r,null),void(a&&uu(e,t,"src",r.src,r,null));case"input":Qc("invalid",e);var l=n=s=i=null,d=null,c=null;for(a in r)if(r.hasOwnProperty(a)){var u=r[a];if(null!=u)switch(a){case"name":i=u;break;case"type":s=u;break;case"checked":d=u;break;case"defaultChecked":c=u;break;case"value":n=u;break;case"defaultValue":l=u;break;case"children":case"dangerouslySetInnerHTML":if(null!=u)throw Error(o(137,t));break;default:uu(e,t,a,u,r,null)}}return void bt(e,n,l,d,c,s,i,!1);case"select":for(i in Qc("invalid",e),a=s=n=null,r)if(r.hasOwnProperty(i)&&null!=(l=r[i]))switch(i){case"value":n=l;break;case"defaultValue":s=l;break;case"multiple":a=l;default:uu(e,t,i,l,r,null)}return t=n,r=s,e.multiple=!!a,void(null!=t?yt(e,!!a,t,!1):null!=r&&yt(e,!!a,r,!0));case"textarea":for(s in Qc("invalid",e),n=i=a=null,r)if(r.hasOwnProperty(s)&&null!=(l=r[s]))switch(s){case"value":a=l;break;case"defaultValue":i=l;break;case"children":n=l;break;case"dangerouslySetInnerHTML":if(null!=l)throw Error(o(91));break;default:uu(e,t,s,l,r,null)}return void wt(e,a,i,n);case"option":for(d in r)if(r.hasOwnProperty(d)&&null!=(a=r[d]))if("selected"===d)e.selected=a&&"function"!==typeof a&&"symbol"!==typeof a;else uu(e,t,d,a,r,null);return;case"dialog":Qc("beforetoggle",e),Qc("toggle",e),Qc("cancel",e),Qc("close",e);break;case"iframe":case"object":Qc("load",e);break;case"video":case"audio":for(a=0;a<Gc.length;a++)Qc(Gc[a],e);break;case"image":Qc("error",e),Qc("load",e);break;case"details":Qc("toggle",e);break;case"embed":case"source":case"link":Qc("error",e),Qc("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in r)if(r.hasOwnProperty(c)&&null!=(a=r[c]))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,c,a,r,null)}return;default:if(_t(t)){for(u in r)r.hasOwnProperty(u)&&(void 0!==(a=r[u])&&pu(e,t,u,a,r,void 0));return}}for(l in r)r.hasOwnProperty(l)&&(null!=(a=r[l])&&uu(e,t,l,a,r,null))}function fu(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}var hu=null,gu=null;function xu(e){return 9===e.nodeType?e:e.ownerDocument}function vu(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function bu(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function ku(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var yu=null;var ju="function"===typeof setTimeout?setTimeout:void 0,wu="function"===typeof clearTimeout?clearTimeout:void 0,Su="function"===typeof Promise?Promise:void 0,$u="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Su?function(e){return Su.resolve(null).then(e).catch(Nu)}:ju;function Nu(e){setTimeout(function(){throw e})}function Eu(e){return"head"===e}function _u(e,t){var r=t,n=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&8===a.nodeType)if("/$"===(r=a.data)||"/&"===r){if(0===n)return e.removeChild(a),void Hp(t);n--}else if("$"===r||"$?"===r||"$~"===r||"$!"===r||"&"===r)n++;else if("html"===r)Iu(e.ownerDocument.documentElement);else if("head"===r){Iu(r=e.ownerDocument.head);for(var i=r.firstChild;i;){var o=i.nextSibling,s=i.nodeName;i[Ge]||"SCRIPT"===s||"STYLE"===s||"LINK"===s&&"stylesheet"===i.rel.toLowerCase()||r.removeChild(i),i=o}}else"body"===r&&Iu(e.ownerDocument.body);r=a}while(r);Hp(t)}function zu(e,t){var r=e;e=0;do{var n=r.nextSibling;if(1===r.nodeType?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",""===r.getAttribute("style")&&r.removeAttribute("style")):3===r.nodeType&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),n&&8===n.nodeType)if("/$"===(r=n.data)){if(0===e)break;e--}else"$"!==r&&"$?"!==r&&"$~"!==r&&"$!"!==r||e++;r=n}while(r)}function Cu(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Cu(r),Ye(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===r.rel.toLowerCase())continue}e.removeChild(r)}}function Au(e,t){for(;8!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null;if(null===(e=Ou(e.nextSibling)))return null}return e}function Du(e){return"$?"===e.data||"$~"===e.data}function Fu(e){return"$!"===e.data||"$?"===e.data&&"loading"!==e.ownerDocument.readyState}function Ou(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"$~"===t||"&"===t||"F!"===t||"F"===t)break;if("/$"===t||"/&"===t)return null}}return e}var Tu=null;function Pu(e){e=e.nextSibling;for(var t=0;e;){if(8===e.nodeType){var r=e.data;if("/$"===r||"/&"===r){if(0===t)return Ou(e.nextSibling);t--}else"$"!==r&&"$!"!==r&&"$?"!==r&&"$~"!==r&&"&"!==r||t++}e=e.nextSibling}return null}function Lu(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var r=e.data;if("$"===r||"$!"===r||"$?"===r||"$~"===r||"&"===r){if(0===t)return e;t--}else"/$"!==r&&"/&"!==r||t++}e=e.previousSibling}return null}function Ru(e,t,r){switch(t=xu(r),e){case"html":if(!(e=t.documentElement))throw Error(o(452));return e;case"head":if(!(e=t.head))throw Error(o(453));return e;case"body":if(!(e=t.body))throw Error(o(454));return e;default:throw Error(o(451))}}function Iu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ye(e)}var Bu=new Map,Mu=new Set;function Vu(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Uu=T.d;T.d={f:function(){var e=Uu.f(),t=ec();return e||t},r:function(e){var t=Qe(e);null!==t&&5===t.tag&&"form"===t.type?ns(t):Uu.r(e)},D:function(e){Uu.D(e),Hu("dns-prefetch",e,null)},C:function(e,t){Uu.C(e,t),Hu("preconnect",e,t)},L:function(e,t,r){Uu.L(e,t,r);var n=Ku;if(n&&e&&t){var a='link[rel="preload"][as="'+xt(t)+'"]';"image"===t&&r&&r.imageSrcSet?(a+='[imagesrcset="'+xt(r.imageSrcSet)+'"]',"string"===typeof r.imageSizes&&(a+='[imagesizes="'+xt(r.imageSizes)+'"]')):a+='[href="'+xt(e)+'"]';var i=a;switch(t){case"style":i=qu(e);break;case"script":i=Ju(e)}Bu.has(i)||(e=m({rel:"preload",href:"image"===t&&r&&r.imageSrcSet?void 0:e,as:t},r),Bu.set(i,e),null!==n.querySelector(a)||"style"===t&&n.querySelector(Gu(i))||"script"===t&&n.querySelector(Qu(i))||(mu(t=n.createElement("link"),"link",e),et(t),n.head.appendChild(t)))}},m:function(e,t){Uu.m(e,t);var r=Ku;if(r&&e){var n=t&&"string"===typeof t.as?t.as:"script",a='link[rel="modulepreload"][as="'+xt(n)+'"][href="'+xt(e)+'"]',i=a;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ju(e)}if(!Bu.has(i)&&(e=m({rel:"modulepreload",href:e},t),Bu.set(i,e),null===r.querySelector(a))){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Qu(i)))return}mu(n=r.createElement("link"),"link",e),et(n),r.head.appendChild(n)}}},X:function(e,t){Uu.X(e,t);var r=Ku;if(r&&e){var n=Ze(r).hoistableScripts,a=Ju(e),i=n.get(a);i||((i=r.querySelector(Qu(a)))||(e=m({src:e,async:!0},t),(t=Bu.get(a))&&tp(e,t),et(i=r.createElement("script")),mu(i,"link",e),r.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(a,i))}},S:function(e,t,r){Uu.S(e,t,r);var n=Ku;if(n&&e){var a=Ze(n).hoistableStyles,i=qu(e);t=t||"default";var o=a.get(i);if(!o){var s={loading:0,preload:null};if(o=n.querySelector(Gu(i)))s.loading=5;else{e=m({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Bu.get(i))&&ep(e,r);var l=o=n.createElement("link");et(l),mu(l,"link",e),l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),l.addEventListener("load",function(){s.loading|=1}),l.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Zu(o,t,n)}o={type:"stylesheet",instance:o,count:1,state:s},a.set(i,o)}}},M:function(e,t){Uu.M(e,t);var r=Ku;if(r&&e){var n=Ze(r).hoistableScripts,a=Ju(e),i=n.get(a);i||((i=r.querySelector(Qu(a)))||(e=m({src:e,async:!0,type:"module"},t),(t=Bu.get(a))&&tp(e,t),et(i=r.createElement("script")),mu(i,"link",e),r.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(a,i))}}};var Ku="undefined"===typeof document?null:document;function Hu(e,t,r){var n=Ku;if(n&&"string"===typeof t&&t){var a=xt(t);a='link[rel="'+e+'"][href="'+a+'"]',"string"===typeof r&&(a+='[crossorigin="'+r+'"]'),Mu.has(a)||(Mu.add(a),e={rel:e,crossOrigin:r,href:t},null===n.querySelector(a)&&(mu(t=n.createElement("link"),"link",e),et(t),n.head.appendChild(t)))}}function Wu(e,t,r,n){var a,i,s,l,d=(d=W.current)?Vu(d):null;if(!d)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof r.precedence&&"string"===typeof r.href?(t=qu(r.href),(n=(r=Ze(d).hoistableStyles).get(t))||(n={type:"style",instance:null,count:0,state:null},r.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===r.rel&&"string"===typeof r.href&&"string"===typeof r.precedence){e=qu(r.href);var c=Ze(d).hoistableStyles,u=c.get(e);if(u||(d=d.ownerDocument||d,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,u),(c=d.querySelector(Gu(e)))&&!c._p&&(u.instance=c,u.state.loading=5),Bu.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Bu.set(e,r),c||(a=d,i=e,s=r,l=u.state,a.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=a.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),mu(i,"link",s),et(i),a.head.appendChild(i))))),t&&null===n)throw Error(o(528,""));return u}if(t&&null!==n)throw Error(o(529,""));return null;case"script":return t=r.async,"string"===typeof(r=r.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Ju(r),(n=(r=Ze(d).hoistableScripts).get(t))||(n={type:"script",instance:null,count:0,state:null},r.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function qu(e){return'href="'+xt(e)+'"'}function Gu(e){return'link[rel="stylesheet"]['+e+"]"}function Yu(e){return m({},e,{"data-precedence":e.precedence,precedence:null})}function Ju(e){return'[src="'+xt(e)+'"]'}function Qu(e){return"script[async]"+e}function Xu(e,t,r){if(t.count++,null===t.instance)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+xt(r.href)+'"]');if(n)return t.instance=n,et(n),n;var a=m({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return et(n=(e.ownerDocument||e).createElement("style")),mu(n,"style",a),Zu(n,r.precedence,e),t.instance=n;case"stylesheet":a=qu(r.href);var i=e.querySelector(Gu(a));if(i)return t.state.loading|=4,t.instance=i,et(i),i;n=Yu(r),(a=Bu.get(a))&&ep(n,a),et(i=(e.ownerDocument||e).createElement("link"));var s=i;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),mu(i,"link",n),t.state.loading|=4,Zu(i,r.precedence,e),t.instance=i;case"script":return i=Ju(r.src),(a=e.querySelector(Qu(i)))?(t.instance=a,et(a),a):(n=r,(a=Bu.get(i))&&tp(n=m({},r),a),et(a=(e=e.ownerDocument||e).createElement("script")),mu(a,"link",n),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(o(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(n=t.instance,t.state.loading|=4,Zu(n,r.precedence,e));return t.instance}function Zu(e,t,r){for(var n=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=n.length?n[n.length-1]:null,i=a,o=0;o<n.length;o++){var s=n[o];if(s.dataset.precedence===t)i=s;else if(i!==a)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=9===r.nodeType?r.head:r).insertBefore(e,t.firstChild)}function ep(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function tp(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var rp=null;function np(e,t,r){if(null===rp){var n=new Map,a=rp=new Map;a.set(r,n)}else(n=(a=rp).get(r))||(n=new Map,a.set(r,n));if(n.has(e))return n;for(n.set(e,null),r=r.getElementsByTagName(e),a=0;a<r.length;a++){var i=r[a];if(!(i[Ge]||i[Me]||"link"===e&&"stylesheet"===i.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==i.namespaceURI){var o=i.getAttribute(t)||"";o=e+o;var s=n.get(o);s?s.push(i):n.set(o,[i])}}return n}function ap(e,t,r){(e=e.ownerDocument||e).head.insertBefore(r,"title"===t?e.querySelector("head > title"):null)}function ip(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var op=0;function sp(){if(this.count--,0===this.count&&(0===this.imgCount||!this.waitingForImages))if(this.stylesheets)dp(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var lp=null;function dp(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,lp=new Map,t.forEach(cp,e),lp=null,sp.call(e))}function cp(e,t){if(!(4&t.state.loading)){var r=lp.get(e);if(r)var n=r.get(null);else{r=new Map,lp.set(e,r);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var o=a[i];"LINK"!==o.nodeName&&"not all"===o.getAttribute("media")||(r.set(o.dataset.precedence,o),n=o)}n&&r.set(null,n)}o=(a=t.instance).getAttribute("data-precedence"),(i=r.get(o)||n)===n&&r.set(null,a),r.set(o,a),this.count++,n=sp.bind(this),a.addEventListener("load",n),a.addEventListener("error",n),i?i.parentNode.insertBefore(a,i.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(a,e.firstChild),t.state.loading|=4}}var up={$$typeof:y,Provider:null,Consumer:null,_currentValue:P,_currentValue2:P,_threadCount:0};function pp(e,t,r,n,a,i,o,s,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=n,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function mp(e,t,r,n,a,i,o,s,l,d,c,u){return e=new pp(e,t,r,o,l,d,c,u,s),t=1,!0===i&&(t|=24),i=Rn(3,null,null,t),e.current=i,i.stateNode=e,(t=Ia()).refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:n,isDehydrated:r,cache:t},gi(i),e}function fp(e){return e?e=Pn:Pn}function hp(e,t,r,n,a,i){a=fp(a),null===n.context?n.context=a:n.pendingContext=a,(n=vi(t)).payload={element:r},null!==(i=void 0===i?null:i)&&(n.callback=i),null!==(r=bi(e,n,t))&&(Yd(r,0,t),ki(r,e,t))}function gp(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var r=e.retryLane;e.retryLane=0!==r&&r<t?r:t}}function xp(e,t){gp(e,t),(e=e.alternate)&&gp(e,t)}function vp(e){if(13===e.tag||31===e.tag){var t=Fn(e,67108864);null!==t&&Yd(t,0,67108864),xp(e,67108864)}}function bp(e){if(13===e.tag||31===e.tag){var t=qd(),r=Fn(e,t=Pe(t));null!==r&&Yd(r,0,t),xp(e,t)}}var kp=!0;function yp(e,t,r,n){var a=O.T;O.T=null;var i=T.p;try{T.p=2,wp(e,t,r,n)}finally{T.p=i,O.T=a}}function jp(e,t,r,n){var a=O.T;O.T=null;var i=T.p;try{T.p=8,wp(e,t,r,n)}finally{T.p=i,O.T=a}}function wp(e,t,r,n){if(kp){var a=Sp(n);if(null===a)ru(e,t,n,$p,r),Pp(e,n);else if(function(e,t,r,n,a){switch(t){case"focusin":return zp=Lp(zp,e,t,r,n,a),!0;case"dragenter":return Cp=Lp(Cp,e,t,r,n,a),!0;case"mouseover":return Ap=Lp(Ap,e,t,r,n,a),!0;case"pointerover":var i=a.pointerId;return Dp.set(i,Lp(Dp.get(i)||null,e,t,r,n,a)),!0;case"gotpointercapture":return i=a.pointerId,Fp.set(i,Lp(Fp.get(i)||null,e,t,r,n,a)),!0}return!1}(a,e,t,r,n))n.stopPropagation();else if(Pp(e,n),4&t&&-1<Tp.indexOf(e)){for(;null!==a;){var i=Qe(a);if(null!==i)switch(i.tag){case 3:if((i=i.stateNode).current.memoizedState.isDehydrated){var o=Ne(i.pendingLanes);if(0!==o){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var l=1<<31-ke(o);s.entanglements[1]|=l,o&=~l}Pc(i),0===(6&fd)&&(Td=le()+500,Lc(0,!1))}}break;case 31:case 13:null!==(s=Fn(i,2))&&Yd(s,0,2),ec(),xp(i,2)}if(null===(i=Sp(n))&&ru(e,t,n,$p,r),i===a)break;a=i}null!==a&&n.stopPropagation()}else ru(e,t,n,null,r)}}function Sp(e){return Np(e=Ot(e))}var $p=null;function Np(e){if($p=null,null!==(e=Je(e))){var t=l(e);if(null===t)e=null;else{var r=t.tag;if(13===r){if(null!==(e=d(t)))return e;e=null}else if(31===r){if(null!==(e=c(t)))return e;e=null}else if(3===r){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return $p=e,null}function Ep(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(de()){case ce:return 2;case ue:return 8;case pe:case me:return 32;case fe:return 268435456;default:return 32}default:return 32}}var _p=!1,zp=null,Cp=null,Ap=null,Dp=new Map,Fp=new Map,Op=[],Tp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Pp(e,t){switch(e){case"focusin":case"focusout":zp=null;break;case"dragenter":case"dragleave":Cp=null;break;case"mouseover":case"mouseout":Ap=null;break;case"pointerover":case"pointerout":Dp.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fp.delete(t.pointerId)}}function Lp(e,t,r,n,a,i){return null===e||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[a]},null!==t&&(null!==(t=Qe(t))&&vp(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function Rp(e){var t=Je(e.target);if(null!==t){var r=l(t);if(null!==r)if(13===(t=r.tag)){if(null!==(t=d(r)))return e.blockedOn=t,void Ie(e.priority,function(){bp(r)})}else if(31===t){if(null!==(t=c(r)))return e.blockedOn=t,void Ie(e.priority,function(){bp(r)})}else if(3===t&&r.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===r.tag?r.stateNode.containerInfo:null)}e.blockedOn=null}function Ip(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var r=Sp(e.nativeEvent);if(null!==r)return null!==(t=Qe(r))&&vp(t),e.blockedOn=r,!1;var n=new(r=e.nativeEvent).constructor(r.type,r);Ft=n,r.target.dispatchEvent(n),Ft=null,t.shift()}return!0}function Bp(e,t,r){Ip(e)&&r.delete(t)}function Mp(){_p=!1,null!==zp&&Ip(zp)&&(zp=null),null!==Cp&&Ip(Cp)&&(Cp=null),null!==Ap&&Ip(Ap)&&(Ap=null),Dp.forEach(Bp),Fp.forEach(Bp)}function Vp(e,t){e.blockedOn===t&&(e.blockedOn=null,_p||(_p=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,Mp)))}var Up=null;function Kp(e){Up!==e&&(Up=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Up===e&&(Up=null);for(var t=0;t<e.length;t+=3){var r=e[t],n=e[t+1],a=e[t+2];if("function"!==typeof n){if(null===Np(n||r))continue;break}var i=Qe(r);null!==i&&(e.splice(t,3),t-=3,ts(i,{pending:!0,data:a,method:r.method,action:n},n,a))}}))}function Hp(e){function t(t){return Vp(t,e)}null!==zp&&Vp(zp,e),null!==Cp&&Vp(Cp,e),null!==Ap&&Vp(Ap,e),Dp.forEach(t),Fp.forEach(t);for(var r=0;r<Op.length;r++){var n=Op[r];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Op.length&&null===(r=Op[0]).blockedOn;)Rp(r),null===r.blockedOn&&Op.shift();if(null!=(r=(e.ownerDocument||e).$$reactFormReplay))for(n=0;n<r.length;n+=3){var a=r[n],i=r[n+1],o=a[Ve]||null;if("function"===typeof i)o||Kp(r);else if(o){var s=null;if(i&&i.hasAttribute("formAction")){if(a=i,o=i[Ve]||null)s=o.formAction;else if(null!==Np(a))continue}else s=o.action;"function"===typeof s?r[n+1]=s:(r.splice(n,3),n-=3),Kp(r)}}}function Wp(){function e(e){e.canIntercept&&"react-transition"===e.info&&e.intercept({handler:function(){return new Promise(function(e){return a=e})},focusReset:"manual",scroll:"manual"})}function t(){null!==a&&(a(),a=null),n||setTimeout(r,20)}function r(){if(!n&&!navigation.transition){var e=navigation.currentEntry;e&&null!=e.url&&navigation.navigate(e.url,{state:e.getState(),info:"react-transition",history:"replace"})}}if("object"===typeof navigation){var n=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),null!==a&&(a(),a=null)}}}function qp(e){this._internalRoot=e}function Gp(e){this._internalRoot=e}Gp.prototype.render=qp.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(o(409));hp(t.current,qd(),e,t,null,null)},Gp.prototype.unmount=qp.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;hp(e.current,2,null,e,null,null),ec(),t[Ue]=null}},Gp.prototype.unstable_scheduleHydration=function(e){if(e){var t=Re();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Op.length&&0!==t&&t<Op[r].priority;r++);Op.splice(r,0,e),0===r&&Rp(e)}};var Yp=a.version;if("19.2.4"!==Yp)throw Error(o(527,Yp,"19.2.4"));T.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(o(188));throw e=Object.keys(e).join(","),Error(o(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=l(e)))throw Error(o(188));return t!==e?null:e}for(var r=e,n=t;;){var a=r.return;if(null===a)break;var i=a.alternate;if(null===i){if(null!==(n=a.return)){r=n;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===r)return u(a),e;if(i===n)return u(a),t;i=i.sibling}throw Error(o(188))}if(r.return!==n.return)r=a,n=i;else{for(var s=!1,d=a.child;d;){if(d===r){s=!0,r=a,n=i;break}if(d===n){s=!0,n=a,r=i;break}d=d.sibling}if(!s){for(d=i.child;d;){if(d===r){s=!0,r=i,n=a;break}if(d===n){s=!0,n=i,r=a;break}d=d.sibling}if(!s)throw Error(o(189))}}if(r.alternate!==n)throw Error(o(190))}if(3!==r.tag)throw Error(o(188));return r.stateNode.current===r?e:t}(t),e=null===(e=null!==e?p(e):null)?null:e.stateNode};var Jp={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.4"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Qp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Qp.isDisabled&&Qp.supportsFiber)try{xe=Qp.inject(Jp),ve=Qp}catch(Zp){}}t.createRoot=function(e,t){if(!s(e))throw Error(o(299));var r=!1,n="",a=Ss,i=$s,l=Ns;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(r=!0),void 0!==t.identifierPrefix&&(n=t.identifierPrefix),void 0!==t.onUncaughtError&&(a=t.onUncaughtError),void 0!==t.onCaughtError&&(i=t.onCaughtError),void 0!==t.onRecoverableError&&(l=t.onRecoverableError)),t=mp(e,1,!1,null,0,r,n,null,a,i,l,Wp),e[Ue]=t.current,eu(e),new qp(t)}},672(e,t,r){var n=r(43);function a(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var o={d:{f:i,r:function(){throw Error(a(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},s=Symbol.for("react.portal");var l=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,t.createPortal=function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(a(299));return function(e,t,r){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:s,key:null==n?null:""+n,children:e,containerInfo:t,implementation:r}}(e,t,null,r)},t.flushSync=function(e){var t=l.T,r=o.p;try{if(l.T=null,o.p=2,e)return e()}finally{l.T=t,o.p=r,o.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,o.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&o.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var r=t.as,n=d(r,t.crossOrigin),a="string"===typeof t.integrity?t.integrity:void 0,i="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===r?o.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:n,integrity:a,fetchPriority:i}):"script"===r&&o.d.X(e,{crossOrigin:n,integrity:a,fetchPriority:i,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var r=d(t.as,t.crossOrigin);o.d.M(e,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&o.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var r=t.as,n=d(r,t.crossOrigin);o.d.L(e,r,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var r=d(t.as,t.crossOrigin);o.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else o.d.m(e)},t.requestFormReset=function(e){o.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,r){return l.H.useFormState(e,t,r)},t.useFormStatus=function(){return l.H.useHostTransitionStatus()},t.version="19.2.4"},391(e,t,r){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=r(4)},950(e,t,r){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=r(672)},799(e,t){var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function a(e,t,n){var a=null;if(void 0!==n&&(a=""+n),void 0!==t.key&&(a=""+t.key),"key"in t)for(var i in n={},t)"key"!==i&&(n[i]=t[i]);else n=t;return t=n.ref,{$$typeof:r,type:e,key:a,ref:void 0!==t?t:null,props:n}}t.Fragment=n,t.jsx=a,t.jsxs=a},288(e,t){var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),m=Symbol.for("react.activity"),f=Symbol.iterator;var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,x={};function v(e,t,r){this.props=e,this.context=t,this.refs=x,this.updater=r||h}function b(){}function k(e,t,r){this.props=e,this.context=t,this.refs=x,this.updater=r||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var y=k.prototype=new b;y.constructor=k,g(y,v.prototype),y.isPureReactComponent=!0;var j=Array.isArray;function w(){}var S={H:null,A:null,T:null,S:null},$=Object.prototype.hasOwnProperty;function N(e,t,n){var a=n.ref;return{$$typeof:r,type:e,key:t,ref:void 0!==a?a:null,props:n}}function E(e){return"object"===typeof e&&null!==e&&e.$$typeof===r}var _=/\/+/g;function z(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function C(e,t,a,i,o){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l,d,c=!1;if(null===e)c=!0;else switch(s){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case r:case n:c=!0;break;case p:return C((c=e._init)(e._payload),t,a,i,o)}}if(c)return o=o(e),c=""===i?"."+z(e,0):i,j(o)?(a="",null!=c&&(a=c.replace(_,"$&/")+"/"),C(o,t,a,"",function(e){return e})):null!=o&&(E(o)&&(l=o,d=a+(null==o.key||e&&e.key===o.key?"":(""+o.key).replace(_,"$&/")+"/")+c,o=N(l.type,d,l.props)),t.push(o)),1;c=0;var u,m=""===i?".":i+":";if(j(e))for(var h=0;h<e.length;h++)c+=C(i=e[h],t,a,s=m+z(i,h),o);else if("function"===typeof(h=null===(u=e)||"object"!==typeof u?null:"function"===typeof(u=f&&u[f]||u["@@iterator"])?u:null))for(e=h.call(e),h=0;!(i=e.next()).done;)c+=C(i=i.value,t,a,s=m+z(i,h++),o);else if("object"===s){if("function"===typeof e.then)return C(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(w,w):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,a,i,o);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function A(e,t,r){if(null==e)return e;var n=[],a=0;return C(e,n,"","",function(e){return t.call(r,e,a++)}),n}function D(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var F="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},O={map:A,forEach:function(e,t,r){A(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return A(e,function(){t++}),t},toArray:function(e){return A(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};t.Activity=m,t.Children=O,t.Component=v,t.Fragment=a,t.Profiler=o,t.PureComponent=k,t.StrictMode=i,t.Suspense=c,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cacheSignal=function(){return null},t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var n=g({},e.props),a=e.key;if(null!=t)for(i in void 0!==t.key&&(a=""+t.key),t)!$.call(t,i)||"key"===i||"__self"===i||"__source"===i||"ref"===i&&void 0===t.ref||(n[i]=t[i]);var i=arguments.length-2;if(1===i)n.children=r;else if(1<i){for(var o=Array(i),s=0;s<i;s++)o[s]=arguments[s+2];n.children=o}return N(e.type,a,n)},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:s,_context:e},e},t.createElement=function(e,t,r){var n,a={},i=null;if(null!=t)for(n in void 0!==t.key&&(i=""+t.key),t)$.call(t,n)&&"key"!==n&&"__self"!==n&&"__source"!==n&&(a[n]=t[n]);var o=arguments.length-2;if(1===o)a.children=r;else if(1<o){for(var s=Array(o),l=0;l<o;l++)s[l]=arguments[l+2];a.children=s}if(e&&e.defaultProps)for(n in o=e.defaultProps)void 0===a[n]&&(a[n]=o[n]);return N(e,i,a)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:d,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:D}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=S.T,r={};S.T=r;try{var n=e(),a=S.S;null!==a&&a(r,n),"object"===typeof n&&null!==n&&"function"===typeof n.then&&n.then(w,F)}catch(i){F(i)}finally{null!==t&&null!==r.types&&(t.types=r.types),S.T=t}},t.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},t.use=function(e){return S.H.use(e)},t.useActionState=function(e,t,r){return S.H.useActionState(e,t,r)},t.useCallback=function(e,t){return S.H.useCallback(e,t)},t.useContext=function(e){return S.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},t.useEffect=function(e,t){return S.H.useEffect(e,t)},t.useEffectEvent=function(e){return S.H.useEffectEvent(e)},t.useId=function(){return S.H.useId()},t.useImperativeHandle=function(e,t,r){return S.H.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return S.H.useMemo(e,t)},t.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},t.useReducer=function(e,t,r){return S.H.useReducer(e,t,r)},t.useRef=function(e){return S.H.useRef(e)},t.useState=function(e){return S.H.useState(e)},t.useSyncExternalStore=function(e,t,r){return S.H.useSyncExternalStore(e,t,r)},t.useTransition=function(){return S.H.useTransition()},t.version="19.2.4"},43(e,t,r){e.exports=r(288)},579(e,t,r){e.exports=r(799)},896(e,t){function r(e,t){var r=e.length;e.push(t);e:for(;0<r;){var n=r-1>>>1,a=e[n];if(!(0<i(a,t)))break e;e[n]=t,e[r]=a,r=n}}function n(e){return 0===e.length?null:e[0]}function a(e){if(0===e.length)return null;var t=e[0],r=e.pop();if(r!==t){e[0]=r;e:for(var n=0,a=e.length,o=a>>>1;n<o;){var s=2*(n+1)-1,l=e[s],d=s+1,c=e[d];if(0>i(l,r))d<a&&0>i(c,l)?(e[n]=c,e[d]=r,n=d):(e[n]=l,e[s]=r,n=s);else{if(!(d<a&&0>i(c,r)))break e;e[n]=c,e[d]=r,n=d}}}return t}function i(e,t){var r=e.sortIndex-t.sortIndex;return 0!==r?r:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var o=performance;t.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var d=[],c=[],u=1,p=null,m=3,f=!1,h=!1,g=!1,x=!1,v="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,k="undefined"!==typeof setImmediate?setImmediate:null;function y(e){for(var t=n(c);null!==t;){if(null===t.callback)a(c);else{if(!(t.startTime<=e))break;a(c),t.sortIndex=t.expirationTime,r(d,t)}t=n(c)}}function j(e){if(g=!1,y(e),!h)if(null!==n(d))h=!0,S||(S=!0,w());else{var t=n(c);null!==t&&D(j,t.startTime-e)}}var w,S=!1,$=-1,N=5,E=-1;function _(){return!!x||!(t.unstable_now()-E<N)}function z(){if(x=!1,S){var e=t.unstable_now();E=e;var r=!0;try{e:{h=!1,g&&(g=!1,b($),$=-1),f=!0;var i=m;try{t:{for(y(e),p=n(d);null!==p&&!(p.expirationTime>e&&_());){var o=p.callback;if("function"===typeof o){p.callback=null,m=p.priorityLevel;var s=o(p.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof s){p.callback=s,y(e),r=!0;break t}p===n(d)&&a(d),y(e)}else a(d);p=n(d)}if(null!==p)r=!0;else{var l=n(c);null!==l&&D(j,l.startTime-e),r=!1}}break e}finally{p=null,m=i,f=!1}r=void 0}}finally{r?w():S=!1}}}if("function"===typeof k)w=function(){k(z)};else if("undefined"!==typeof MessageChannel){var C=new MessageChannel,A=C.port2;C.port1.onmessage=z,w=function(){A.postMessage(null)}}else w=function(){v(z,0)};function D(e,r){$=v(function(){e(t.unstable_now())},r)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return m},t.unstable_next=function(e){switch(m){case 1:case 2:case 3:var t=3;break;default:t=m}var r=m;m=t;try{return e()}finally{m=r}},t.unstable_requestPaint=function(){x=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var r=m;m=e;try{return t()}finally{m=r}},t.unstable_scheduleCallback=function(e,a,i){var o=t.unstable_now();switch("object"===typeof i&&null!==i?i="number"===typeof(i=i.delay)&&0<i?o+i:o:i=o,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:u++,callback:a,priorityLevel:e,startTime:i,expirationTime:s=i+s,sortIndex:-1},i>o?(e.sortIndex=i,r(c,e),null===n(d)&&e===n(c)&&(g?(b($),$=-1):g=!0,D(j,i-o))):(e.sortIndex=s,r(d,e),h||f||(h=!0,S||(S=!0,w()))),e},t.unstable_shouldYield=_,t.unstable_wrapCallback=function(e){var t=m;return function(){var r=m;m=t;try{return e.apply(this,arguments)}finally{m=r}}}},853(e,t,r){e.exports=r(896)}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(n,a){if(1&a&&(n=this(n)),8&a)return n;if("object"===typeof n&&n){if(4&a&&n.__esModule)return n;if(16&a&&"function"===typeof n.then)return n}var i=Object.create(null);r.r(i);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&a&&n;("object"==typeof s||"function"==typeof s)&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(e=>o[e]=()=>n[e]);return o.default=()=>n,r.d(i,o),i}})(),r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nc=void 0;var n=r(43),a=r.t(n,2),i=r(391);const o="10.55.0",s=globalThis;function l(){return d(s),s}function d(e){const t=e.__SENTRY__=e.__SENTRY__||{};return t.version=t.version||o,t[o]=t[o]||{}}function c(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s;const n=r.__SENTRY__=r.__SENTRY__||{},a=n[o]=n[o]||{};return a[e]||(a[e]=t())}const u="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,p=["debug","info","warn","error","log","assert","trace"],m={};function f(e){if(!("console"in s))return e();const t=s.console,r={},n=Object.keys(m);n.forEach(e=>{const n=m[e];r[e]=t[e],t[e]=n});try{return e()}finally{n.forEach(e=>{t[e]=r[e]})}}function h(){return x().enabled}function g(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];u&&h()&&f(()=>{s.console[e](`Sentry Logger [${e}]:`,...r)})}function x(){return u?c("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const v={enable:function(){x().enabled=!0},disable:function(){x().enabled=!1},isEnabled:h,log:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("log",...t)},warn:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("warn",...t)},error:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("error",...t)}},b=Object.prototype.toString;function k(e){switch(b.call(e)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return C(e,Error)}}function y(e,t){return b.call(e)===`[object ${t}]`}function j(e){return y(e,"ErrorEvent")}function w(e){return y(e,"DOMError")}function S(e){return y(e,"String")}function $(e){return"object"===typeof e&&null!==e&&"__sentry_template_string__"in e&&"__sentry_template_values__"in e}function N(e){return null===e||$(e)||"object"!==typeof e&&"function"!==typeof e}function E(e){return y(e,"Object")}function _(e){return"undefined"!==typeof Event&&C(e,Event)}function z(e){return Boolean(e?.then&&"function"===typeof e.then)}function C(e,t){try{return e instanceof t}catch{return!1}}function A(e){return"undefined"!==typeof Request&&C(e,Request)}function D(e,t,r){if(!(t in e))return;const n=e[t];if("function"!==typeof n)return;const a=r(n);"function"===typeof a&&O(a,n);try{e[t]=a}catch{u&&v.log(`Failed to replace method "${t}" in object`,e)}}function F(e,t,r){try{Object.defineProperty(e,t,{value:r,writable:!0,configurable:!0})}catch{u&&v.log(`Failed to add non-enumerable property "${String(t)}" to object`,e)}}function O(e,t){try{const r=t.prototype||{};e.prototype=t.prototype=r,F(e,"__sentry_original__",t)}catch{}}function T(e){return e.__sentry_original__}function P(e){if(k(e))return{message:e.message,name:e.name,stack:e.stack,...L(e)};if(_(e)){const{type:t,target:r,currentTarget:n,detail:a}=e;return{type:t,target:r,currentTarget:n,...a?{detail:a}:{},...L(e)}}return e}function L(e){return"object"===typeof e&&null!==e?Object.fromEntries(Object.entries(e)):{}}let R;function I(e){if(void 0!==R)return R?R(e):e();const t=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),r=s;return t in r&&"function"===typeof r[t]?(R=r[t],R(e)):(R=null,e())}function B(){return I(()=>Math.random())}function M(){return I(()=>Date.now())}let V;function U(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){const e=s;return e.crypto||e.msCrypto}();try{if(e?.randomUUID)return I(()=>e.randomUUID()).replace(/-/g,"")}catch{}return V||(V="10000000100040008000100000000000"),V.replace(/[018]/g,e=>(e^(16*B()&15)>>e/4).toString(16))}function K(e){return e.exception?.values?.[0]}function H(e){const{message:t,event_id:r}=e;if(t)return t;const n=K(e);return n?n.type&&n.value?`${n.type}: ${n.value}`:n.type||n.value||r||"<unknown>":r||"<unknown>"}function W(e,t,r){const n=e.exception=e.exception||{},a=n.values=n.values||[],i=a[0]=a[0]||{};i.value||(i.value=t||""),i.type||(i.type=r||"Error")}function q(e,t){const r=K(e);if(!r)return;const n=r.mechanism;if(r.mechanism={type:"generic",handled:!0,...n,...t},t&&"data"in t){const e={...n?.data,...t.data};r.mechanism.data=e}}function G(e){if(function(e){try{return e.__sentry_captured__}catch{}}(e))return!0;try{F(e,"__sentry_captured__",!0)}catch{}return!1}function Y(){return M()/1e3}let J;function Q(){return(J??(J=function(){const{performance:e}=s;if(!e?.now||!e.timeOrigin)return Y;const t=e.timeOrigin;return()=>(t+I(()=>e.now()))/1e3}()))()}function X(e){const t=Q(),r={sid:U(),init:!0,timestamp:t,started:t,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>function(e){return{sid:`${e.sid}`,init:e.init,started:new Date(1e3*e.started).toISOString(),timestamp:new Date(1e3*e.timestamp).toISOString(),status:e.status,errors:e.errors,did:"number"===typeof e.did||"string"===typeof e.did?`${e.did}`:void 0,duration:e.duration,abnormal_mechanism:e.abnormal_mechanism,attrs:{release:e.release,environment:e.environment,ip_address:e.ipAddress,user_agent:e.userAgent}}}(r)};return e&&Z(r,e),r}function Z(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.user&&(!e.ipAddress&&t.user.ip_address&&(e.ipAddress=t.user.ip_address),e.did||t.did||(e.did=t.user.id||t.user.email||t.user.username)),e.timestamp=t.timestamp||Q(),t.abnormal_mechanism&&(e.abnormal_mechanism=t.abnormal_mechanism),t.ignoreDuration&&(e.ignoreDuration=t.ignoreDuration),t.sid&&(e.sid=32===t.sid.length?t.sid:U()),void 0!==t.init&&(e.init=t.init),!e.did&&t.did&&(e.did=`${t.did}`),"number"===typeof t.started&&(e.started=t.started),e.ignoreDuration)e.duration=void 0;else if("number"===typeof t.duration)e.duration=t.duration;else{const t=e.timestamp-e.started;e.duration=t>=0?t:0}t.release&&(e.release=t.release),t.environment&&(e.environment=t.environment),!e.ipAddress&&t.ipAddress&&(e.ipAddress=t.ipAddress),!e.userAgent&&t.userAgent&&(e.userAgent=t.userAgent),"number"===typeof t.errors&&(e.errors=t.errors),t.status&&(e.status=t.status)}function ee(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;if(!t||"object"!==typeof t||r<=0)return t;if(e&&0===Object.keys(t).length)return e;const n={...e};for(const a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=ee(n[a],t[a],r-1));return n}function te(){return U()}function re(){return U().substring(16)}const ne="_sentrySpan";function ae(e,t){t?F(e,ne,t):delete e[ne]}function ie(e){return e[ne]}const oe=Symbol.for("sentry.skipNormalization"),se=Symbol.for("sentry.overrideNormalizationDepth");const le="?",de=/\(error: (.*)\)/,ce=/captureMessage|captureException/;function ue(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const n=t.sort((e,t)=>e[0]-t[0]).map(e=>e[1]);return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;const a=[],i=e.split("\n");for(let o=t;o<i.length;o++){let e=i[o];e.length>1024&&(e=e.slice(0,1024));const t=de.test(e)?e.replace(de,"$1"):e;if(!t.includes("Error: ")){for(const e of n){const r=e(t);if(r){a.push(r);break}}if(a.length>=50+r)break}}return function(e){if(!e.length)return[];const t=Array.from(e);/sentryWrapped/.test(pe(t).function||"")&&t.pop();t.reverse(),ce.test(pe(t).function||"")&&(t.pop(),ce.test(pe(t).function||"")&&t.pop());return t.slice(0,50).map(e=>({...e,filename:e.filename||pe(t).filename,function:e.function||le}))}(a.slice(r))}}function pe(e){return e[e.length-1]||{}}const me="<anonymous>";function fe(e){try{return e&&"function"===typeof e&&e.name||me}catch{return me}}function he(e){const t=e.exception;if(t){const e=[];try{return t.values.forEach(t=>{t.stacktrace.frames&&e.push(...t.stacktrace.frames)}),e}catch{return}}}let ge;function xe(e){ge=e}function ve(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0;try{return ke("",e,t,r)}catch(n){return{ERROR:`**non-serializable** (${n})`}}}function be(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:102400;const n=ve(e,t);return a=n,function(e){return~-encodeURI(e).split(/%..|./).length}(JSON.stringify(a))>r?be(e,t-1,r):n;var a}function ke(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1/0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){const e=new WeakSet;function t(t){return!!e.has(t)||(e.add(t),!1)}function r(t){e.delete(t)}return[t,r]}();const[i,o]=a;if(null==t||["boolean","string"].includes(typeof t)||"number"===typeof t&&Number.isFinite(t))return t;const s=ye(e,t);if(!s.startsWith("[object "))return s;if(function(e){return Boolean(e[oe])}(t))return t;const l=function(e){const t=e[se];return"number"===typeof t?t:void 0}(t),d=void 0!==l?l:r;if(0===d)return s.replace("object ","");if(i(t))return"[Circular ~]";const c=t;if(c&&"function"===typeof c.toJSON)try{return ke("",c.toJSON(),d-1,n,a)}catch{}const u=Array.isArray(t)?[]:{};let p=0;const m=P(t);for(const f in m){if(!Object.prototype.hasOwnProperty.call(m,f))continue;if(p>=n){u[f]="[MaxProperties ~]";break}const e=m[f];u[f]=ke(f,e,d-1,n,a),p++}return o(t),u}function ye(e,t){try{if(ge){const e=ge(t);if(e)return e}if("undefined"!==typeof globalThis&&t===globalThis)return"[Global]";if("number"===typeof t&&!Number.isFinite(t))return`[${t}]`;if("function"===typeof t)return`[Function: ${fe(t)}]`;if("symbol"===typeof t)return`[${String(t)}]`;if("bigint"===typeof t)return`[BigInt: ${String(t)}]`;const e=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(t);return`[object ${e}]`}catch(r){return`**non-serializable** (${r})`}}function je(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"string"!==typeof e||0===t||e.length<=t?e:`${e.slice(0,t)}...`}function we(e,t){if(!Array.isArray(e))return"";const r=[];for(let n=0;n<e.length;n++){const t=e[n];N(t)?r.push(String(t)):t instanceof Error?r.push(t.message?`${t.name}: ${t.message}`:t.name):r.push(ye(0,t))}return r.join(t)}function Se(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return!!S(e)&&(y(t,"RegExp")?t.test(e):S(t)?r?e===t:e.includes(t):"function"===typeof t&&t(e))}function $e(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(const n of t)if(Se(e,n,r))return!0;return!1}class Ne{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:te(),sampleRand:B()}}clone(){const e=new Ne;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,e._conversationId=this._conversationId,ae(e,ie(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Z(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setConversationId(e){return this._conversationId=e||void 0,this._notifyScopeListeners(),this}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,t){return this.setTags({[e]:t})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,t){return this.setAttributes({[e]:t})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,t){return this._extra={...this._extra,[e]:t},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,t){return null===t?delete this._contexts[e]:this._contexts[e]=t,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const t="function"===typeof e?e(this):e,r=t instanceof Ne?t.getScopeData():E(t)?e:void 0,{tags:n,attributes:a,extra:i,user:o,contexts:s,level:l,fingerprint:d=[],propagationContext:c,conversationId:u}=r||{};return this._tags={...this._tags,...n},this._attributes={...this._attributes,...a},this._extra={...this._extra,...i},this._contexts={...this._contexts,...s},o&&Object.keys(o).length&&(this._user=o),l&&(this._level=l),d.length&&(this._fingerprint=d),c&&(this._propagationContext=c),u&&(this._conversationId=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,this._conversationId=void 0,ae(this,void 0),this._attachments=[],this.setPropagationContext({traceId:te(),sampleRand:B()}),this._notifyScopeListeners(),this}addBreadcrumb(e,t){const r="number"===typeof t?t:100;if(r<=0)return this;const n={timestamp:Y(),...e,message:e.message?je(e.message,2048):e.message};return this._breadcrumbs.push(n),this._breadcrumbs.length>r&&(this._breadcrumbs=this._breadcrumbs.slice(-r),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:ie(this),conversationId:this._conversationId}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=ee(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,t){const r=t?.event_id||U();if(!this._client)return u&&v.warn("No client configured on scope - will not capture exception!"),r;const n=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:n,...t,event_id:r},this),r}captureMessage(e,t,r){const n=r?.event_id||U();if(!this._client)return u&&v.warn("No client configured on scope - will not capture message!"),n;const a=r?.syntheticException??new Error(e);return this._client.captureMessage(e,t,{originalException:e,syntheticException:a,...r,event_id:n},this),n}captureEvent(e,t){const r=e.event_id||t?.event_id||U();return this._client?(this._client.captureEvent(e,{...t,event_id:r},this),r):(u&&v.warn("No client configured on scope - will not capture event!"),r)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}const Ee=e=>e instanceof Promise&&!e[_e],_e=Symbol("chained PromiseLike"),ze=(e,t)=>{if(!t)return e;let r=!1;for(const n in e){if(n in t)continue;r=!0;const a=e[n];"function"===typeof a?Object.defineProperty(t,n,{value:function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return a.apply(e,r)},enumerable:!0,configurable:!0,writable:!0}):t[n]=a}return r&&Object.assign(t,{[_e]:!0}),t};class Ce{constructor(e,t){let r,n;r=e||new Ne,n=t||new Ne,this._stack=[{scope:r}],this._isolationScope=n}withScope(e){const t=this._pushScope();let r;try{r=e(t)}catch(n){throw this._popScope(),n}return z(r)?((e,t,r)=>{const n=e.then(e=>(t(e),e),e=>{throw r(e),e});return Ee(n)&&Ee(e)?n:ze(e,n)})(r,()=>this._popScope(),()=>this._popScope()):(this._popScope(),r)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return!(this._stack.length<=1)&&!!this._stack.pop()}}function Ae(){const e=d(l());return e.stack=e.stack||new Ce(c("defaultCurrentScope",()=>new Ne),c("defaultIsolationScope",()=>new Ne))}function De(e){return Ae().withScope(e)}function Fe(e,t){const r=Ae();return r.withScope(()=>(r.getStackTop().scope=e,t(e)))}function Oe(e){return Ae().withScope(()=>e(Ae().getIsolationScope()))}function Te(e){const t=d(e);return t.acs?t.acs:{withIsolationScope:Oe,withScope:De,withSetScope:Fe,withSetIsolationScope:(e,t)=>Oe(t),getCurrentScope:()=>Ae().getScope(),getIsolationScope:()=>Ae().getIsolationScope()}}let Pe;function Le(){return Te(l()).getCurrentScope()}function Re(){return Te(l()).getIsolationScope()}function Ie(){return Le().getClient()}function Be(e){const t=Pe?.();if(t)return{trace_id:t.traceId,span_id:t.spanId};const r=e.getPropagationContext(),{traceId:n,parentSpanId:a,propagationSpanId:i}=r,o={trace_id:n,span_id:i||re()};return a&&(o.parent_span_id=a),o}const Me="production";function Ve(e){return new Ke(t=>{t(e)})}function Ue(e){return new Ke((t,r)=>{r(e)})}class Ke{constructor(e){this._state=0,this._handlers=[],this._runExecutor(e)}then(e,t){return new Ke((r,n)=>{this._handlers.push([!1,t=>{if(e)try{r(e(t))}catch(a){n(a)}else r(t)},e=>{if(t)try{r(t(e))}catch(a){n(a)}else n(e)}]),this._executeHandlers()})}catch(e){return this.then(e=>e,e)}finally(e){return new Ke((t,r)=>{let n,a;return this.then(t=>{a=!1,n=t,e&&e()},t=>{a=!0,n=t,e&&e()}).then(()=>{a?r(n):t(n)})})}_executeHandlers(){if(0===this._state)return;const e=this._handlers.slice();this._handlers=[],e.forEach(e=>{e[0]||(1===this._state&&e[1](this._value),2===this._state&&e[2](this._value),e[0]=!0)})}_runExecutor(e){const t=(e,t)=>{0===this._state&&(z(t)?t.then(r,n):(this._state=e,this._value=t,this._executeHandlers()))},r=e=>{t(1,e)},n=e=>{t(2,e)};try{e(r,n)}catch(a){n(a)}}}function He(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;try{const a=We(t,r,e,n);return z(a)?a:Ve(a)}catch(a){return Ue(a)}}function We(e,t,r,n){const a=r[n];if(!e||!a)return e;const i=a({...e},t);return u&&null===i&&v.log(`Event processor "${a.id||"?"}" dropped event`),z(i)?i.then(e=>We(e,t,r,n+1)):We(i,t,r,n+1)}let qe,Ge,Ye,Je;function Qe(e){const t=s._sentryDebugIds,r=s._debugIds;if(!t&&!r)return{};const n=t?Object.keys(t):[],a=r?Object.keys(r):[];if(Je&&n.length===Ge&&a.length===Ye)return Je;Ge=n.length,Ye=a.length,Je={},qe||(qe={});const i=(t,r)=>{for(const n of t){const t=r[n],a=qe?.[n];if(a&&Je&&t)Je[a[0]]=t,qe&&(qe[n]=[a[0],t]);else if(t){const r=e(n);for(let e=r.length-1;e>=0;e--){const a=r[e],i=a?.filename;if(i&&Je&&qe){Je[i]=t,qe[n]=[i,t];break}}}}};return t&&i(n,t),r&&i(a,r),Je}const Xe="sentry.profile_id",Ze="sentry.exclusive_time";const et="sentry-";function tt(e){if(e&&(S(e)||Array.isArray(e)))return Array.isArray(e)?e.reduce((e,t)=>{const r=rt(t);return Object.entries(r).forEach(t=>{let[r,n]=t;e[r]=n}),e},{}):rt(e)}function rt(e){return e.split(",").map(e=>{const t=e.indexOf("=");if(-1===t)return[];return[e.slice(0,t),e.slice(t+1)].map(e=>{try{return decodeURIComponent(e.trim())}catch{return}})}).reduce((e,t)=>{let[r,n]=t;return r&&n&&(e[r]=n),e},{})}const nt=/^o(\d+)\./,at=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function it(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{host:r,path:n,pass:a,port:i,projectId:o,protocol:s,publicKey:l}=e;return`${s}://${l}${t&&a?`:${a}`:""}@${r}${i?`:${i}`:""}/${n?`${n}/`:n}${o}`}function ot(e){return{protocol:e.protocol,publicKey:e.publicKey||"",pass:e.pass||"",host:e.host,port:e.port||"",path:e.path||"",projectId:e.projectId}}function st(e){const t=e.getOptions(),{host:r}=e.getDsn()||{};let n;return t.orgId?n=String(t.orgId):r&&(n=function(e){const t=e.match(nt);return t?.[1]}(r)),n}function lt(e){const t="string"===typeof e?function(e){const t=at.exec(e);if(!t)return void f(()=>{console.error(`Invalid Sentry Dsn: ${e}`)});const[r,n,a="",i="",o="",s=""]=t.slice(1);let l="",d=s;const c=d.split("/");if(c.length>1&&(l=c.slice(0,-1).join("/"),d=c.pop()),d){const e=d.match(/^\d+/);e&&(d=e[0])}return ot({host:i,pass:a,path:l,projectId:d,port:o,protocol:r,publicKey:n})}(e):ot(e);if(t&&function(e){if(!u)return!0;const{port:t,projectId:r,protocol:n}=e;return!["protocol","publicKey","host","projectId"].find(t=>!e[t]&&(v.error(`Invalid Sentry Dsn: ${t} missing`),!0))&&(r.match(/^\d+$/)?function(e){return"http"===e||"https"===e}(n)?!t||!isNaN(parseInt(t,10))||(v.error(`Invalid Sentry Dsn: Invalid port ${t}`),!1):(v.error(`Invalid Sentry Dsn: Invalid protocol ${n}`),!1):(v.error(`Invalid Sentry Dsn: Invalid projectId ${r}`),!1))}(t))return t}function dt(e,t){const{value:r,unit:n}="object"===typeof(a=e)&&null!=a&&!Array.isArray(a)&&Object.keys(a).includes("value")?e:{value:e,unit:void 0};var a;const i=function(e){if(Array.isArray(e))return{value:e,type:"array"};const t="string"===typeof e?"string":"boolean"===typeof e?"boolean":"number"!==typeof e||Number.isNaN(e)?null:Number.isInteger(e)?"integer":"double";if(t)return{value:e,type:t}}(r),o=n&&"string"===typeof n?{unit:n}:{};if(i)return{...i,...o};if(!t||"skip-undefined"===t&&void 0===r)return;let s="";try{s=JSON.stringify(r)??""}catch{}return{value:s,type:"string",...o}}function ct(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const r={};for(const[n,a]of Object.entries(e??{})){const e=dt(a,t);e&&(r[n]=e)}return r}function ut(e){if(e){if("object"===typeof e&&"deref"in e&&"function"===typeof e.deref)try{return e.deref()}catch{return}return e}}const pt="_sentryScope",mt="_sentryIsolationScope";function ft(e){const t=e;return{scope:t[pt],isolationScope:ut(t[mt])}}let ht=!1;function gt(e){const{spanId:t,traceId:r,isRemote:n}=e.spanContext(),a=n?t:kt(e).parent_span_id,i=ft(e).scope;return{parent_span_id:a,span_id:n?i?.getPropagationContext().propagationSpanId||re():t,trace_id:r}}function xt(e){return e&&e.length>0?e.map(e=>{let{context:{spanId:t,traceId:r,traceFlags:n,...a},attributes:i}=e;return{span_id:t,trace_id:r,sampled:1===n,attributes:i,...a}}):void 0}function vt(e){return"number"===typeof e?bt(e):Array.isArray(e)?e[0]+e[1]/1e9:e instanceof Date?bt(e.getTime()):Q()}function bt(e){return e>9999999999?e/1e3:e}function kt(e){if(wt(e))return e.getSpanJSON();const{spanId:t,traceId:r}=e.spanContext();if(jt(e)){const{attributes:n,startTime:a,name:i,endTime:o,status:s,links:l}=e;return{span_id:t,trace_id:r,data:n,description:i,parent_span_id:yt(e),start_timestamp:vt(a),timestamp:vt(o)||void 0,status:$t(s),op:n["sentry.op"],origin:n["sentry.origin"],links:xt(l)}}return{span_id:t,trace_id:r,start_timestamp:0,data:{}}}function yt(e){return"parentSpanId"in e?e.parentSpanId:"parentSpanContext"in e?e.parentSpanContext?.spanId:void 0}function jt(e){const t=e;return!!t.attributes&&!!t.startTime&&!!t.name&&!!t.endTime&&!!t.status}function wt(e){return"function"===typeof e.getSpanJSON}function St(e){const{traceFlags:t}=e.spanContext();return 1===t}function $t(e){if(e&&0!==e.code)return 1===e.code?"ok":e.message||"internal_error"}const Nt="_sentryRootSpan";const Et=_t;function _t(e){return e[Nt]||e}function zt(){ht||(f(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),ht=!0)}const Ct="_frozenDsc";function At(e,t){const r=t.getOptions(),{publicKey:n}=t.getDsn()||{},a={environment:r.environment||Me,release:r.release,public_key:n,trace_id:e,org_id:st(t)};return t.emit("createDsc",a),a}function Dt(e){const t=Ie();if(!t)return{};const r=Et(e),n=kt(r),a=n.data,i=r.spanContext().traceState,o=i?.get("sentry.sample_rate")??a["sentry.sample_rate"]??a["sentry.previous_trace_sample_rate"];function s(e){return"number"!==typeof o&&"string"!==typeof o||(e.sample_rate=`${o}`),e}const l=r[Ct];if(l)return s(l);const d=i?.get("sentry.dsc"),c=d&&function(e){const t=tt(e);if(!t)return;const r=Object.entries(t).reduce((e,t)=>{let[r,n]=t;return r.startsWith(et)&&(e[r.slice(7)]=n),e},{});return Object.keys(r).length>0?r:void 0}(d);if(c)return s(c);const u=At(e.spanContext().traceId,t),p=a["sentry.source"]??a["sentry.span.source"],m=n.description;return"url"!==p&&m&&(u.transaction=m),function(e){if("boolean"===typeof __SENTRY_TRACING__&&!__SENTRY_TRACING__)return!1;const t=e||Ie()?.getOptions();return!!t&&(null!=t.tracesSampleRate||!!t.tracesSampler)}()&&(u.sampled=String(St(r)),u.sample_rand=i?.get("sentry.sample_rand")??ft(r).scope?.getPropagationContext().sampleRand.toString()),s(u),t.emit("createDsc",u,r),u}function Ft(e,t){const{fingerprint:r,span:n,breadcrumbs:a,sdkProcessingMetadata:i}=t;!function(e,t){const{extra:r,tags:n,user:a,contexts:i,level:o,transactionName:s}=t;Object.keys(r).length&&(e.extra={...r,...e.extra});Object.keys(n).length&&(e.tags={...n,...e.tags});Object.keys(a).length&&(e.user={...a,...e.user});Object.keys(i).length&&(e.contexts={...i,...e.contexts});o&&(e.level=o);s&&"transaction"!==e.type&&(e.transaction=s)}(e,t),n&&function(e,t){e.contexts={trace:gt(t),...e.contexts},e.sdkProcessingMetadata={dynamicSamplingContext:Dt(t),...e.sdkProcessingMetadata};const r=Et(t),n=kt(r).description;n&&!e.transaction&&"transaction"===e.type&&(e.transaction=n)}(e,n),function(e,t){e.fingerprint=e.fingerprint?Array.isArray(e.fingerprint)?e.fingerprint:[e.fingerprint]:[],t&&(e.fingerprint=e.fingerprint.concat(t));e.fingerprint.length||delete e.fingerprint}(e,r),function(e,t){const r=[...e.breadcrumbs||[],...t];e.breadcrumbs=r.length?r:void 0}(e,a),function(e,t){e.sdkProcessingMetadata={...e.sdkProcessingMetadata,...t}}(e,i)}function Ot(e,t){const{extra:r,tags:n,attributes:a,user:i,contexts:o,level:s,sdkProcessingMetadata:l,breadcrumbs:d,fingerprint:c,eventProcessors:u,attachments:p,propagationContext:m,transactionName:f,span:h}=t;Tt(e,"extra",r),Tt(e,"tags",n),Tt(e,"attributes",a),Tt(e,"user",i),Tt(e,"contexts",o),e.sdkProcessingMetadata=ee(e.sdkProcessingMetadata,l,2),s&&(e.level=s),f&&(e.transactionName=f),h&&(e.span=h),d.length&&(e.breadcrumbs=[...e.breadcrumbs,...d]),c.length&&(e.fingerprint=[...e.fingerprint,...c]),u.length&&(e.eventProcessors=[...e.eventProcessors,...u]),p.length&&(e.attachments=[...e.attachments,...p]),e.propagationContext={...e.propagationContext,...m}}function Tt(e,t,r){e[t]=ee(e[t],r,1)}function Pt(e,t){const r=c("globalScope",()=>new Ne).getScopeData();return e&&Ot(r,e.getScopeData()),t&&Ot(r,t.getScopeData()),r}function Lt(e,t,r,n,a,i){const{normalizeDepth:o=3,normalizeMaxBreadth:s=1e3}=e,l={...t,event_id:t.event_id||r.event_id||U(),timestamp:t.timestamp||Y()},d=r.integrations||e.integrations.map(e=>e.name);!function(e,t){const{environment:r,release:n,dist:a,maxValueLength:i}=t;e.environment=e.environment||r||Me,!e.release&&n&&(e.release=n);!e.dist&&a&&(e.dist=a);const o=e.request;o?.url&&i&&(o.url=je(o.url,i));i&&e.exception?.values?.forEach(e=>{e.value&&(e.value=je(e.value,i))})}(l,e),function(e,t){t.length>0&&(e.sdk=e.sdk||{},e.sdk.integrations=[...e.sdk.integrations||[],...t])}(l,d),a&&a.emit("applyFrameMetadata",t),void 0===t.type&&function(e,t){const r=Qe(t);e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.filename&&(e.debug_id=r[e.filename])})})}(l,e.stackParser);const c=function(e,t){if(!t)return e;const r=e?e.clone():new Ne;return r.update(t),r}(n,r.captureContext);r.mechanism&&q(l,r.mechanism);const u=a?a.getEventProcessors():[],p=Pt(i,c),m=[...r.attachments||[],...p.attachments];m.length&&(r.attachments=m),Ft(l,p);const f=[...u,...p.eventProcessors];return(r.data&&!0===r.data.__sentry__?Ve(l):He(f,l,r)).then(e=>(e&&function(e){const t={};if(e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.debug_id&&(e.abs_path?t[e.abs_path]=e.debug_id:e.filename&&(t[e.filename]=e.debug_id),delete e.debug_id)})}),0===Object.keys(t).length)return;e.debug_meta=e.debug_meta||{},e.debug_meta.images=e.debug_meta.images||[];const r=e.debug_meta.images;Object.entries(t).forEach(e=>{let[t,n]=e;r.push({type:"sourcemap",code_file:t,debug_id:n})})}(e),"number"===typeof o&&o>0?function(e,t,r){if(!e)return null;const n={...e,...e.breadcrumbs&&{breadcrumbs:e.breadcrumbs.map(e=>({...e,...e.data&&{data:ve(e.data,t,r)}}))},...e.user&&{user:ve(e.user,t,r)},...e.contexts&&{contexts:ve(e.contexts,t,r)},...e.extra&&{extra:ve(e.extra,t,r)}};e.contexts?.trace&&n.contexts&&(n.contexts.trace=e.contexts.trace,e.contexts.trace.data&&(n.contexts.trace.data=ve(e.contexts.trace.data,t,r)));e.spans&&(n.spans=e.spans.map(e=>({...e,...e.data&&{data:ve(e.data,t,r)}})));e.contexts?.flags&&n.contexts&&(n.contexts.flags=ve(e.contexts.flags,3,r));return n}(e,o,s):e))}function Rt(e){if(e)return function(e){return e instanceof Ne||"function"===typeof e}(e)||function(e){return Object.keys(e).some(e=>It.includes(e))}(e)?{captureContext:e}:e}const It=["user","level","extra","contexts","tags","fingerprint","propagationContext"];function Bt(e,t){return Le().captureEvent(e,t)}function Mt(e){const t=Re(),{user:r}=Pt(t,Le()),{userAgent:n}=s.navigator||{},a=X({user:r,...n&&{userAgent:n},...e}),i=t.getSession();return"ok"===i?.status&&Z(i,{status:"exited"}),Vt(),t.setSession(a),a}function Vt(){const e=Re(),t=Le().getSession()||e.getSession();t&&function(e,t){let r={};t?r={status:t}:"ok"===e.status&&(r={status:"exited"}),Z(e,r)}(t),Ut(),e.setSession()}function Ut(){const e=Re(),t=Ie(),r=e.getSession();r&&t&&t.captureSession(r)}function Kt(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]?Vt():Ut()}const Ht=[];function Wt(e){const t=e.defaultIntegrations||[],r=e.integrations;let n;if(t.forEach(e=>{e.isDefaultInstance=!0}),Array.isArray(r))n=[...t,...r];else if("function"===typeof r){const e=r(t);n=Array.isArray(e)?e:[e]}else n=t;return function(e){const t={};return e.forEach(e=>{const{name:r}=e,n=t[r];n&&!n.isDefaultInstance&&e.isDefaultInstance||(t[r]=e)}),Object.values(t)}(n)}function qt(e,t){for(const r of t)r?.afterAllSetup&&r.afterAllSetup(e)}function Gt(e,t,r){if(r[t.name])u&&v.log(`Integration skipped because it was already installed: ${t.name}`);else{if(r[t.name]=t,Ht.includes(t.name)||"function"!==typeof t.setupOnce||(t.setupOnce(),Ht.push(t.name)),t.setup&&"function"===typeof t.setup&&t.setup(e),"function"===typeof t.preprocessEvent){const r=t.preprocessEvent.bind(t);e.on("preprocessEvent",(t,n)=>r(t,n,e))}if("function"===typeof t.processEvent){const r=t.processEvent.bind(t),n=Object.assign((t,n)=>r(t,n,e),{id:t.name});e.addEventProcessor(n)}["processSpan","processSegmentSpan"].forEach(r=>{const n=t[r];"function"===typeof n&&e.on(r,r=>n.call(t,r,e))}),u&&v.log(`Integration installed: ${t.name}`)}}function Yt(e){const t=[];e.message&&t.push(e.message);try{const r=e.exception.values[e.exception.values.length-1];r?.value&&(t.push(r.value),r.type&&t.push(`${r.type}: ${r.value}`))}catch{}return t}const Jt=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,/can't redefine non-configurable property "solana"/,/vv\(\)\.getRestrictions is not a function/,/Can't find variable: _AutofillCallbackHandler/,/Object Not Found Matching Id:\d+, MethodName:simulateEvent/,/^Java exception was raised during method invocation$/],Qt=function(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{name:"EventFilters",setup(r){const n=r.getOptions();e=Zt(t,n)},processEvent(r,n,a){if(!e){const r=a.getOptions();e=Zt(t,r)}return function(e,t){if(e.type){if("transaction"===e.type&&function(e,t){if(!t?.length)return!1;const r=e.transaction;return!!r&&$e(r,t)}(e,t.ignoreTransactions))return u&&v.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${H(e)}`),!0}else{if(function(e,t){if(!t?.length)return!1;return Yt(e).some(e=>$e(e,t))}(e,t.ignoreErrors))return u&&v.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${H(e)}`),!0;if(function(e){if(!e.exception?.values?.length)return!1;return!e.message&&!e.exception.values.some(e=>e.stacktrace||e.type&&"Error"!==e.type||e.value)}(e))return u&&v.warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${H(e)}`),!0;if(function(e,t){if(!t?.length)return!1;const r=er(e);return!!r&&$e(r,t)}(e,t.denyUrls))return u&&v.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${H(e)}.\nUrl: ${er(e)}`),!0;if(!function(e,t){if(!t?.length)return!0;const r=er(e);return!r||$e(r,t)}(e,t.allowUrls))return u&&v.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${H(e)}.\nUrl: ${er(e)}`),!0}return!1}(r,e)?null:r}}},Xt=function(){return{...Qt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),name:"InboundFilters"}};function Zt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{allowUrls:[...e.allowUrls||[],...t.allowUrls||[]],denyUrls:[...e.denyUrls||[],...t.denyUrls||[]],ignoreErrors:[...e.ignoreErrors||[],...t.ignoreErrors||[],...e.disableErrorDefaults?[]:Jt],ignoreTransactions:[...e.ignoreTransactions||[],...t.ignoreTransactions||[]]}}function er(e){try{const t=[...e.exception?.values??[]].reverse().find(e=>void 0===e.mechanism?.parent_id&&e.stacktrace?.frames?.length),r=t?.stacktrace?.frames;return r?function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];for(let t=e.length-1;t>=0;t--){const r=e[t];if(r&&"<anonymous>"!==r.filename&&"[native code]"!==r.filename)return r.filename||null}return null}(r):null}catch{return u&&v.error(`Cannot extract url for event ${H(e)}`),null}}let tr;const rr=new WeakMap,nr=()=>({name:"FunctionToString",setupOnce(){tr=Function.prototype.toString;try{Function.prototype.toString=function(){const e=T(this),t=rr.has(Ie())&&void 0!==e?e:this;for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return tr.apply(t,n)}}catch{}},setup(e){rr.set(e,!0)}}),ar=()=>({name:"ConversationId",setup(e){e.on("spanStart",e=>{const t=Le().getScopeData(),r=Re().getScopeData(),n=t.conversationId||r.conversationId;if(n){const{op:t,data:r,description:a}=kt(e);if(!t?.startsWith("gen_ai.")&&!r["ai.operationId"]&&!a?.startsWith("ai."))return;e.setAttribute("gen_ai.conversation.id",n)}})}}),ir=()=>{let e;return{name:"Dedupe",processEvent(t){if(t.type)return t;try{if(function(e,t){if(!t)return!1;if(function(e,t){const r=e.message,n=t.message;if(!r&&!n)return!1;if(r&&!n||!r&&n)return!1;if(r!==n)return!1;if(!sr(e,t))return!1;if(!or(e,t))return!1;return!0}(e,t))return!0;if(function(e,t){const r=lr(t),n=lr(e);if(!r||!n)return!1;if(r.type!==n.type||r.value!==n.value)return!1;if(!sr(e,t))return!1;if(!or(e,t))return!1;return!0}(e,t))return!0;return!1}(t,e))return u&&v.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return e=t}}};function or(e,t){let r=he(e),n=he(t);if(!r&&!n)return!0;if(r&&!n||!r&&n)return!1;if(n.length!==r.length)return!1;for(let a=0;a<n.length;a++){const e=n[a],t=r[a];if(e.filename!==t.filename||e.lineno!==t.lineno||e.colno!==t.colno||e.function!==t.function)return!1}return!0}function sr(e,t){let r=e.fingerprint,n=t.fingerprint;if(!r&&!n)return!0;if(r&&!n||!r&&n)return!1;try{return!(r.join("")!==n.join(""))}catch{return!1}}function lr(e){return e.exception?.values?.[0]}function dr(e,t){!0===t.debug&&(u?v.enable():f(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")}));Le().update(t.initialScope);const r=new e(t);return function(e){Le().setClient(e)}(r),r.init(),r}function cr(e){const t=e.protocol?`${e.protocol}:`:"",r=e.port?`:${e.port}`:"";return`${t}//${e.host}${r}${e.path?`/${e.path}`:""}/api/`}function ur(e,t,r){return t||`${function(e){return`${cr(e)}${e.projectId}/envelope/`}(e)}?${function(e,t){const r={sentry_version:"7"};return e.publicKey&&(r.sentry_key=e.publicKey),t&&(r.sentry_client=`${t.name}/${t.version}`),new URLSearchParams(r).toString()}(e,r)}`}function pr(e){return[e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]]}function mr(e,t){const[r,n]=e;return[r,[...n,t]]}function fr(e,t){const r=e[1];for(const n of r){if(t(n,n[0].type))return!0}return!1}function hr(e){const t=d(s);return t.encodePolyfill?t.encodePolyfill(e):(new TextEncoder).encode(e)}function gr(e){const[t,r]=e;let n=JSON.stringify(t);function a(e){"string"===typeof n?n="string"===typeof e?n+e:[hr(n),e]:n.push("string"===typeof e?hr(e):e)}for(const i of r){const[e,t]=i;if(a(`\n${JSON.stringify(e)}\n`),"string"===typeof t||t instanceof Uint8Array)a(t);else{let e;try{e=JSON.stringify(t)}catch{e=JSON.stringify(ve(t))}a(e)}}return"string"===typeof n?n:function(e){const t=e.reduce((e,t)=>e+t.length,0),r=new Uint8Array(t);let n=0;for(const a of e)r.set(a,n),n+=a.length;return r}(n)}function xr(e){const t="string"===typeof e.data?hr(e.data):e.data;return[{type:"attachment",length:t.length,filename:e.filename,content_type:e.contentType,attachment_type:e.attachmentType},t]}const vr={sessions:"session",event:"error",client_report:"internal",user_report:"default",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",raw_security:"security",log:"log_item",trace_metric:"metric"};function br(e){return function(e){return e in vr}(e)?vr[e]:e}function kr(e){if(!e?.sdk)return;const{name:t,version:r}=e.sdk;return{name:t,version:r}}function yr(e,t,r,n){const a=kr(r),i=e.type&&"replay_event"!==e.type?e.type:"event";!function(e,t){if(!t)return e;const r=e.sdk||{};e.sdk={...r,name:r.name||t.name,version:r.version||t.version,integrations:[...e.sdk?.integrations||[],...t.integrations||[]],packages:[...e.sdk?.packages||[],...t.packages||[]],settings:e.sdk?.settings||t.settings?{...e.sdk?.settings,...t.settings}:void 0}}(e,r?.sdk);const o=function(e,t,r,n){const a=e.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:e.event_id,sent_at:(new Date).toISOString(),...t&&{sdk:t},...!!r&&n&&{dsn:it(n)},...a&&{trace:a}}}(e,a,n,t);delete e.sdkProcessingMetadata;return pr(o,[[{type:i},e]])}function jr(){return!("undefined"!==typeof __SENTRY_BROWSER_BUNDLE__&&__SENTRY_BROWSER_BUNDLE__)&&"[object process]"===Object.prototype.toString.call("undefined"!==typeof process?process:0)}function wr(){return"undefined"!==typeof window&&(!jr()||function(){const e=s.process;return"renderer"===e?.type}())}function Sr(e,t){const r=t?"auto":"never";return[{type:"log",item_count:e.length,content_type:"application/vnd.sentry.items.log+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:r,infer_user_agent:r}},items:e}]}function $r(e,t){const r=t??Nr(e)??[];if(0===r.length)return;const n=e.getOptions(),a=function(e,t,r,n,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),r&&n&&(i.dsn=it(n)),pr(i,[Sr(e,a)])}(r,n._metadata,n.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);Er().set(e,[]),e.emit("flushLogs"),e.sendEnvelope(a)}function Nr(e){return Er().get(e)}function Er(){return c("clientToLogBufferMap",()=>new WeakMap)}function _r(e,t){const r=t?"auto":"never";return[{type:"trace_metric",item_count:e.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:r,infer_user_agent:r}},items:e}]}function zr(e,t){const r=t??Cr(e)??[];if(0===r.length)return;const n=e.getOptions(),a=function(e,t,r,n,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),r&&n&&(i.dsn=it(n)),pr(i,[_r(e,a)])}(r,n._metadata,n.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);Ar().set(e,[]),e.emit("flushMetrics"),e.sendEnvelope(a)}function Cr(e){return Ar().get(e)}function Ar(){return c("clientToMetricBufferMap",()=>new WeakMap)}function Dr(e){const t={trace_id:e.trace_id,span_id:e.span_id,parent_span_id:e.parent_span_id,name:e.description||"",start_timestamp:e.start_timestamp,end_timestamp:e.timestamp||e.start_timestamp,status:e.status&&"ok"!==e.status&&"cancelled"!==e.status?"error":"ok",is_segment:!1,attributes:{...e.data},links:e.links};return r=t,{...r,attributes:ct(r.attributes),links:r.links?.map(e=>({...e,attributes:ct(e.attributes)}))};var r}function Fr(e){return"object"===typeof e&&"function"===typeof e.unref&&e.unref(),e}const Or=Symbol.for("SentryBufferFullError");function Tr(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;const t=new Set;function r(e){t.delete(e)}return{get $(){return Array.from(t)},add:function(n){if(!(t.size<e))return Ue(Or);const a=n();return t.add(a),a.then(()=>r(a),()=>r(a)),a},drain:function(e){if(!t.size)return Ve(!0);const r=Promise.allSettled(Array.from(t)).then(()=>!0);if(!e)return r;const n=[r,new Promise(t=>Fr(setTimeout(()=>t(!1),e)))];return Promise.race(n)}}}function Pr(e,t){let{statusCode:r,headers:n}=t,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M();const i={...e},o=n?.["x-sentry-rate-limits"],s=n?.["retry-after"];if(o)for(const l of o.trim().split(",")){const[e,t,,,r]=l.split(":",5),n=parseInt(e,10),o=1e3*(isNaN(n)?60:n);if(t)for(const s of t.split(";"))"metric_bucket"===s&&r&&!r.split(";").includes("custom")||(i[s]=a+o);else i.all=a+o}else s?i.all=a+function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:M();const r=parseInt(`${e}`,10);if(!isNaN(r))return 1e3*r;const n=Date.parse(`${e}`);return isNaN(n)?6e4:n-t}(s,a):429===r&&(i.all=a+6e4);return i}function Lr(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Tr(e.bufferSize||64),n={};return{send:function(a){const i=[];if(fr(a,(t,r)=>{const a=br(r);!function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M();return function(e,t){return e[t]||e.all||0}(e,t)>r}(n,a)?i.push(t):e.recordDroppedEvent("ratelimit_backoff",a)}),0===i.length)return Promise.resolve({});const o=pr(a[0],i),s=t=>{!function(e,t){return fr(e,(e,r)=>t.includes(r))}(o,["client_report"])?fr(o,(r,n)=>{e.recordDroppedEvent(t,br(n))}):u&&v.warn(`Dropping client report. Will not send outcomes (reason: ${t}).`)};return r.add(()=>t({body:gr(o)}).then(e=>413===e.statusCode?(u&&v.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits."),s("send_error"),e):(u&&void 0!==e.statusCode&&(e.statusCode<200||e.statusCode>=300)&&v.warn(`Sentry responded with status code ${e.statusCode} to sent event.`),n=Pr(n,e),e),e=>{throw s("network_error"),u&&v.error("Encountered error running transport request:",e),e})).then(e=>e,e=>{if(e===Or)return u&&v.error("Skipped sending event because buffer is full."),s("queue_overflow"),Promise.resolve({});throw e})},flush:e=>r.drain(e)}}function Rr(e){v.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`)}function Ir(e,t){if(!t?.length)return!1;for(const r of t){if(Vr(r)){if(e.description&&Se(e.description,r))return u&&Rr(e),!0;continue}const t=!!r.attributes&&Object.keys(r.attributes).length>0;if(!r.name&&!r.op&&!t)continue;const n=!r.name||e.description&&Se(e.description,r.name),a=!r.op||e.op&&Se(e.op,r.op),i=!r.attributes||Object.entries(r.attributes).every(t=>{let[r,n]=t;return Br(e.attributes?.[r],n)});if(n&&a&&i)return u&&Rr(e),!0}return!1}function Br(e,t){return"string"===typeof e&&("string"===typeof t||t instanceof RegExp)?Se(e,t):Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,r)=>e===t[r]):e===t}function Mr(e,t){const r=t.parent_span_id,n=t.span_id;if(r)for(const a of e)a.parent_span_id===n&&(a.parent_span_id=r)}function Vr(e){return"string"===typeof e||e instanceof RegExp}const Ur=["forwarded","-ip","remote-","via","-user"];const Kr={userInfo:!1,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:[],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5};function Hr(e){const t=null!=e.dataCollection?Kr:!0===e.sendDefaultPii?{userInfo:!0,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:["incomingRequest","outgoingRequest","incomingResponse","outgoingResponse"],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5}:{userInfo:!1,cookies:{deny:Ur},httpHeaders:{request:{deny:Ur},response:{deny:Ur}},httpBodies:[],queryParams:{deny:Ur},genAI:{inputs:!1,outputs:!1},stackFrameVariables:!0,frameContextLines:5};const r=e.dataCollection??{};return{userInfo:r.userInfo??t.userInfo,cookies:r.cookies??t.cookies,httpHeaders:{request:r.httpHeaders?.request??t.httpHeaders.request,response:r.httpHeaders?.response??t.httpHeaders.response},httpBodies:r.httpBodies??t.httpBodies,queryParams:r.queryParams??t.queryParams,genAI:{inputs:r.genAI?.inputs??t.genAI.inputs,outputs:r.genAI?.outputs??t.genAI.outputs},stackFrameVariables:r.stackFrameVariables??t.stackFrameVariables,frameContextLines:r.frameContextLines??t.frameContextLines}}const Wr="Not capturing exception because it's already been captured.",qr="Discarded session because of missing or non-string release",Gr=Symbol.for("SentryInternalError"),Yr=Symbol.for("SentryDoNotSendEventError");function Jr(e){return{message:e,[Gr]:!0}}function Qr(e){return{message:e,[Yr]:!0}}function Xr(e){return!!e&&"object"===typeof e&&Gr in e}function Zr(e){return!!e&&"object"===typeof e&&Yr in e}function en(e,t,r,n,a){let i,o=0,s=!1;e.on(r,()=>{o=0,clearTimeout(i),s=!1}),e.on(t,t=>{if(o+=n(t),o>=8e5)a(e);else if(!s){const t=e.getOptions()._flushInterval??5e3;t>0&&(s=!0,i=Fr(setTimeout(()=>{a(e)},t)))}}),e.on("flush",()=>{a(e)})}class tn{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Tr(e.transportOptions?.bufferSize??64),this._dataCollection=Hr(e),e.dsn?this._dsn=lt(e.dsn):u&&v.warn("No DSN provided, client will not send events."),this._dsn){const t=ur(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:t})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&en(this,"afterCaptureLog","flushLogs",sn,$r);(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&en(this,"afterCaptureMetric","flushMetrics",on,zr)}captureException(e,t,r){const n=U();if(G(e))return u&&v.log(Wr),n;const a={event_id:n,...t};return this._process(()=>this.eventFromException(e,a).then(e=>this._captureEvent(e,a,r)).then(e=>e),"error"),a.event_id}captureMessage(e,t,r,n){const a={event_id:U(),...r},i=$(e)?e:String(e),o=N(e),s=o?this.eventFromMessage(i,t,a):this.eventFromException(e,a);return this._process(()=>s.then(e=>this._captureEvent(e,a,n)),o?"unknown":"error"),a.event_id}captureEvent(e,t,r){const n=U();if(t?.originalException&&G(t.originalException))return u&&v.log(Wr),n;const a={event_id:n,...t},i=e.sdkProcessingMetadata||{},o=i.capturedSpanScope,s=i.capturedSpanIsolationScope,l=rn(e.type);return this._process(()=>this._captureEvent(e,a,o||r,s),l),a.event_id}captureSession(e){this.sendSession(e),Z(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getDataCollectionOptions(){return this._dataCollection}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const t=this._transport;if(this.emit("flush"),!t)return!0;const r=await this._isClientDoneProcessing(e),n=await t.flush(e);return r&&n}async close(e){$r(this);const t=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),t}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(e=>{let{name:t}=e;return t.startsWith("Spotlight")}))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}getIntegrationNames(){return Object.keys(this._integrations)}addIntegration(e){const t=this._integrations[e.name];!t&&e.beforeSetup&&e.beforeSetup(this),Gt(this,e,this._integrations),t||qt(this,[e])}sendEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.emit("beforeSendEvent",e,t);const r=function(e,t){if("transaction"!==e.type||!e.spans?.length||!e.sdkProcessingMetadata?.hasGenAiSpans||!t.getOptions().streamGenAiSpans||function(e){return"stream"===e.getOptions().traceLifecycle}(t))return;const r=[],n=[];for(const i of e.spans)i.op?.startsWith("gen_ai.")?r.push(Dr(i)):n.push(i);if(0===r.length)return;e.spans=n;const a=t.getOptions().sendDefaultPii?"auto":"never";return[{type:"span",item_count:r.length,content_type:"application/vnd.sentry.items.span.v2+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:a,infer_user_agent:a}},items:r}]}(e,this);let n=yr(e,this._dsn,this._options._metadata,this._options.tunnel);for(const a of t.attachments||[])n=mr(n,xr(a));r&&(n=mr(n,r)),this.sendEnvelope(n).then(t=>this.emit("afterSendEvent",e,t))}sendSession(e){const{release:t,environment:r=Me}=this._options;if("aggregates"in e){const n=e.attrs||{};if(!n.release&&!t)return void(u&&v.warn(qr));n.release=n.release||t,n.environment=n.environment||r,e.attrs=n}else{if(!e.release&&!t)return void(u&&v.warn(qr));e.release=e.release||t,e.environment=e.environment||r}this.emit("beforeSendSession",e);const n=function(e,t,r,n){const a=kr(r);return pr({sent_at:(new Date).toISOString(),...a&&{sdk:a},...!!n&&t&&{dsn:it(t)}},["aggregates"in e?[{type:"sessions"},e]:[{type:"session"},e.toJSON()]])}(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(n)}recordDroppedEvent(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(this._options.sendClientReports){const n=`${e}:${t}`;u&&v.log(`Recording outcome: "${n}"${r>1?` (${r} times)`:""}`),this._outcomes[n]=(this._outcomes[n]||0)+r}}on(e,t){const r=this._hooks[e]=this._hooks[e]||new Set,n=function(){return t(...arguments)};return r.add(n),()=>{r.delete(n)}}emit(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];const a=this._hooks[e];a&&a.forEach(e=>e(...r))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(t){return u&&v.error("Error while sending envelope:",t),{}}return u&&v.error("Transport disabled"),{}}registerCleanup(e){}dispose(){}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=function(e,t){const r={};return t.forEach(t=>{t?.beforeSetup&&t.beforeSetup(e)}),t.forEach(t=>{t&&Gt(e,t,r)}),r}(this,e),qt(this,e)}_updateSessionFromEvent(e,t){let r="fatal"===t.level,n=!1;const a=t.exception?.values;if(a){n=!0,r=!1;for(const e of a)if(!1===e.mechanism?.handled){r=!0;break}}const i="ok"===e.status;(i&&0===e.errors||i&&r)&&(Z(e,{...r&&{status:"crashed"},errors:e.errors||Number(n||r)}),this.captureSession(e))}async _isClientDoneProcessing(e){let t=0;for(;!e||t<e;){if(await new Promise(e=>setTimeout(e,1)),!this._numProcessing)return!0;t++}return!1}_isEnabled(){return!1!==this.getOptions().enabled&&void 0!==this._transport}_prepareEvent(e,t,r,n){const a=this.getOptions(),i=this.getIntegrationNames();return!t.integrations&&i.length&&(t.integrations=i),this.emit("preprocessEvent",e,t),e.type||n.setLastEventId(e.event_id||t.event_id),Lt(a,e,t,r,this,n).then(e=>{if(null===e)return e;this.emit("postprocessEvent",e,t),e.contexts={trace:{...e.contexts?.trace,...Be(r)},...e.contexts};const n=function(e,t){const r=t.getPropagationContext();return r.dsc||At(r.traceId,e)}(this,r);return e.sdkProcessingMetadata={dynamicSamplingContext:n,...e.sdkProcessingMetadata},e})}_captureEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Le(),n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Re();return u&&nn(e)&&v.log(`Captured error event \`${Yt(e)[0]||"<unknown>"}\``),this._processEvent(e,t,r,n).then(e=>e.event_id,e=>{u&&(Zr(e)?v.log(e.message):Xr(e)?v.warn(e.message):v.warn(e))})}_processEvent(e,t,r,n){const a=this.getOptions(),{sampleRate:i}=a,o=an(e),s=nn(e),l=`before send for type \`${e.type||"error"}\``,d="undefined"===typeof i?void 0:function(e){if("boolean"===typeof e)return Number(e);const t="string"===typeof e?parseFloat(e):e;return"number"!==typeof t||isNaN(t)||t<0||t>1?void 0:t}(i);if(s&&"number"===typeof d&&B()>d)return this.recordDroppedEvent("sample_rate","error"),Ue(Qr(`Discarding event because it's not included in the random sample (sampling rate = ${i})`));const c=rn(e.type);return this._prepareEvent(e,t,r,n).then(e=>{if(null===e)throw this.recordDroppedEvent("event_processor",c),Qr("An event processor returned `null`, will not send event.");if(!0===t.data?.__sentry__)return e;const r=function(e,t,r,n){const{beforeSend:a,beforeSendTransaction:i,ignoreSpans:o}=t,s=(l=t.beforeSendSpan,!(l&&"function"===typeof l&&"_streamed"in l&&l._streamed)&&t.beforeSendSpan);var l;let d=r;if(nn(d)&&a)return a(d,n);if(an(d)){if(s||o){const t=function(e){const{trace_id:t,parent_span_id:r,span_id:n,status:a,origin:i,data:o,op:s}=e.contexts?.trace??{};return{data:o??{},description:e.transaction,op:s,parent_span_id:r,span_id:n??"",start_timestamp:e.start_timestamp??0,status:a,timestamp:e.timestamp,trace_id:t??"",origin:i,profile_id:o?.[Xe],exclusive_time:o?.[Ze],measurements:e.measurements,is_segment:!0}}(d);if(o?.length&&Ir({description:t.description,op:t.op,attributes:t.data},o))return null;if(s){const e=s(t);e?d=ee(r,{type:"transaction",timestamp:(c=e).timestamp,start_timestamp:c.start_timestamp,transaction:c.description,contexts:{trace:{trace_id:c.trace_id,span_id:c.span_id,parent_span_id:c.parent_span_id,op:c.op,status:c.status,origin:c.origin,data:{...c.data,...c.profile_id&&{[Xe]:c.profile_id},...c.exclusive_time&&{[Ze]:c.exclusive_time}}}},measurements:c.measurements}):zt()}if(d.spans){const t=[],r=d.spans;for(const e of r)if(o?.length&&Ir({description:e.description,op:e.op,attributes:e.data},o))Mr(r,e);else if(s){const r=s(e);r?t.push(r):(zt(),t.push(e))}else t.push(e);const n=d.spans.length-t.length;n&&e.recordDroppedEvent("before_send","span",n),d.spans=t}}if(i){if(d.spans){const e=d.spans.length;d.sdkProcessingMetadata={...r.sdkProcessingMetadata,spanCountBeforeProcessing:e}}return i(d,n)}}var c;return d}(this,a,e,t);return function(e,t){const r=`${t} must return \`null\` or a valid event.`;if(z(e))return e.then(e=>{if(!E(e)&&null!==e)throw Jr(r);return e},e=>{throw Jr(`${t} rejected with ${e}`)});if(!E(e)&&null!==e)throw Jr(r);return e}(r,l)}).then(a=>{if(null===a){if(this.recordDroppedEvent("before_send",c),o){const t=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",t)}throw Qr(`${l} returned \`null\`, will not send event.`)}const i=r.getSession()||n.getSession();if(s&&i&&this._updateSessionFromEvent(i,a),o){const e=(a.sdkProcessingMetadata?.spanCountBeforeProcessing||0)-(a.spans?a.spans.length:0);e>0&&this.recordDroppedEvent("before_send","span",e)}const d=a.transaction_info;if(o&&d&&a.transaction!==e.transaction){const e="custom";a.transaction_info={...d,source:e}}return this.sendEvent(a,t),a}).then(null,e=>{if(Zr(e)||Xr(e))throw e;throw this.captureException(e,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:e}),Jr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${e}`)})}_process(e,t){this._numProcessing++,this._promiseBuffer.add(e).then(e=>(this._numProcessing--,e),e=>(this._numProcessing--,e===Or&&this.recordDroppedEvent("queue_overflow",t),e))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(e=>{let[t,r]=e;const[n,a]=t.split(":");return{reason:n,category:a,quantity:r}})}_flushOutcomes(){u&&v.log("Flushing outcomes...");const e=this._clearOutcomes();if(0===e.length)return void(u&&v.log("No outcomes to send"));if(!this._dsn)return void(u&&v.log("No dsn provided, will not send outcomes"));u&&v.log("Sending outcomes:",e);const t=(r=e,pr((n=this._options.tunnel&&it(this._dsn))?{dsn:n}:{},[[{type:"client_report"},{timestamp:a||Y(),discarded_events:r}]]));var r,n,a;this.sendEnvelope(t)}}function rn(e){return"replay_event"===e?"replay":e||"error"}function nn(e){return void 0===e.type}function an(e){return"transaction"===e.type}function on(e){let t=0;return e.name&&(t+=2*e.name.length),t+=8,t+ln(e.attributes)}function sn(e){let t=0;return e.message&&(t+=2*e.message.length),t+ln(e.attributes)}function ln(e){if(!e)return 0;let t=0;return Object.values(e).forEach(e=>{Array.isArray(e)?t+=e.length*dn(e[0]):N(e)?t+=dn(e):t+=100}),t}function dn(e){return"string"===typeof e?2*e.length:"number"===typeof e?8:"boolean"===typeof e?4:0}function cn(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[t],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"npm";const a=(e._metadata=e._metadata||{}).sdk=e._metadata.sdk||{};a.name||(a.name=`sentry.javascript.${t}`,a.packages=r.map(e=>({name:`${n}:@sentry/${e}`,version:o})),a.version=o)}function un(e){"aggregates"in e?void 0===e.attrs?.ip_address&&(e.attrs={...e.attrs,ip_address:"{{auto}}"}):void 0===e.ipAddress&&(e.ipAddress="{{auto}}")}function pn(e){return function(e){return k(e)&&"__sentry_fetch_url_host__"in e&&"string"===typeof e.__sentry_fetch_url_host__}(e)?`${e.message} (${e.__sentry_fetch_url_host__})`:e.message}function mn(e,t){const r=gn(e,t),n={type:bn(t),value:kn(t)};return r.length&&(n.stacktrace={frames:r}),void 0===n.type&&""===n.value&&(n.value="Unrecoverable error caught"),n}function fn(e,t,r,n){const a=Ie(),i=a?.getOptions().normalizeDepth,o=(s=t,Object.values(s).find(e=>e instanceof Error));var s;const l={__serialized__:be(t,i)};if(o)return{exception:{values:[mn(e,o)]},extra:l};const d={exception:{values:[{type:_(t)?t.constructor.name:n?"UnhandledRejection":"Error",value:wn(t,{isUnhandledRejection:n})}]},extra:l};if(r){const t=gn(e,r);t.length&&(d.exception.values[0].stacktrace={frames:t})}return d}function hn(e,t){return{exception:{values:[mn(e,t)]}}}function gn(e,t){const r=t.stacktrace||t.stack||"",n=function(e){if(e&&xn.test(e.message))return 1;return 0}(t),a=function(e){if("number"===typeof e.framesToPop)return e.framesToPop;return 0}(t);try{return e(r,n,a)}catch{}return[]}const xn=/Minified React error #\d+;/i;function vn(e){return"undefined"!==typeof WebAssembly&&"undefined"!==typeof WebAssembly.Exception&&e instanceof WebAssembly.Exception}function bn(e){const t=e?.name;if(!t&&vn(e)){return e.message&&Array.isArray(e.message)&&2==e.message.length?e.message[0]:"WebAssembly.Exception"}return t}function kn(e){const t=e?.message;return vn(e)?Array.isArray(e.message)&&2==e.message.length?e.message[1]:"wasm exception":t?t.error&&"string"===typeof t.error.message?pn(t.error):pn(e):"No error message"}function yn(e,t,r,n,a){let i;if(j(t)&&t.error){return hn(e,t.error)}if(w(t)||y(t,"DOMException")){const a=t;if("stack"in t){i=hn(e,t);const a=i.exception?.values?.[0];if(n&&r&&a&&!a.stacktrace){const t=gn(e,r);t.length&&(a.stacktrace={frames:t},q(i,{synthetic:!0}))}}else{const t=a.name||(w(a)?"DOMError":"DOMException"),o=a.message?`${t}: ${a.message}`:t;i=jn(e,o,r,n),W(i,o)}return"code"in a&&(i.tags={...i.tags,"DOMException.code":`${a.code}`}),i}if(k(t))return hn(e,t);if(E(t)||_(t)){return i=fn(e,t,r,a),q(i,{synthetic:!0}),i}return i=jn(e,t,r,n),W(i,`${t}`,void 0),q(i,{synthetic:!0}),i}function jn(e,t,r,n){const a={};if(n&&r){const n=gn(e,r);n.length&&(a.exception={values:[{value:t,stacktrace:{frames:n}}]}),q(a,{synthetic:!0})}if($(t)){const{__sentry_template_string__:e,__sentry_template_values__:r}=t;return a.logentry={message:e,params:r},a}return a.message=t,a}function wn(e,t){let{isUnhandledRejection:r}=t;const n=function(e){const t=Object.keys(P(e));return t.sort(),t[0]?t.join(", "):"[object has no keys]"}(e),a=r?"promise rejection":"exception";if(j(e))return`Event \`ErrorEvent\` captured as ${a} with message \`${e.message}\``;if(_(e)){return`Event \`${function(e){try{const t=Object.getPrototypeOf(e);return t?t.constructor.name:void 0}catch{}}(e)}\` (type=${e.type}) captured as ${a}`}return`Object captured as ${a} with keys: ${n}`}const Sn=s;function $n(){try{return Sn.document.location.href}catch{return""}}const Nn=s;let En=0;function _n(){return En>0}function zn(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!==typeof e)return e;try{const t=e.__sentry_wrapped__;if(t)return"function"===typeof t?t:e;if(T(e))return e}catch{return e}const r=function(){for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];s._sentryWrappedDepth=(s._sentryWrappedDepth||0)+1;try{const r=n.map(e=>zn(e,t));return e.apply(this,r)}catch(i){throw En++,setTimeout(()=>{En--}),function(){const e=Te(l());for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];if(2===r.length){const[t,n]=r;return t?e.withSetScope(t,n):e.withScope(n)}e.withScope(r[0])}(e=>{var r,a;e.addEventProcessor(e=>(t.mechanism&&(W(e,void 0,void 0),q(e,t.mechanism)),e.extra={...e.extra,arguments:n},e)),r=i,Le().captureException(r,Rt(a))}),i}finally{s._sentryWrappedDepth=(s._sentryWrappedDepth||0)-1}};try{for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])}catch{}O(r,e),F(e,"__sentry_wrapped__",r);try{Object.getOwnPropertyDescriptor(r,"name").configurable&&Object.defineProperty(r,"name",{get:()=>e.name})}catch{}return r}function Cn(){const e=$n(),{referrer:t}=Nn.document||{},{userAgent:r}=Nn.navigator||{};return{url:e,headers:{...t&&{Referer:t},...r&&{"User-Agent":r}}}}class An extends tn{constructor(e){const t=(r=e,{release:"string"===typeof __SENTRY_RELEASE__?__SENTRY_RELEASE__:Nn.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...r});var r;cn(t,"browser",["browser"],Nn.SENTRY_SDK_SOURCE||"npm"),t._metadata?.sdk&&(t._metadata.sdk.settings={infer_ip:t.sendDefaultPii?"auto":"never",...t._metadata.sdk.settings}),super(t);const{sendDefaultPii:n,sendClientReports:a,enableLogs:i,_experiments:o,enableMetrics:s}=this._options,l=s??o?.enableMetrics??!0;Nn.document&&(a||i||l)&&Nn.document.addEventListener("visibilitychange",()=>{"hidden"===Nn.document.visibilityState&&(a&&this._flushOutcomes(),i&&$r(this),l&&zr(this))}),n&&this.on("beforeSendSession",un)}eventFromException(e,t){return function(e,t,r,n){const a=yn(e,t,r?.syntheticException||void 0,n);return q(a),a.level="error",r?.event_id&&(a.event_id=r.event_id),Ve(a)}(this._options.stackParser,e,t,this._options.attachStacktrace)}eventFromMessage(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info",r=arguments.length>2?arguments[2]:void 0;return function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"info",n=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;const i=jn(e,t,n?.syntheticException||void 0,a);return i.level=r,n?.event_id&&(i.event_id=n.event_id),Ve(i)}(this._options.stackParser,e,t,r,this._options.attachStacktrace)}_prepareEvent(e,t,r,n){return e.platform=e.platform||"javascript",super._prepareEvent(e,t,r,n)}}const Dn={},Fn={};function On(e,t){return Dn[e]=Dn[e]||[],Dn[e].push(t),()=>{const r=Dn[e];if(r){const e=r.indexOf(t);-1!==e&&r.splice(e,1)}}}function Tn(e,t){if(!Fn[e]){Fn[e]=!0;try{t()}catch(r){u&&v.error(`Error while instrumenting ${e}`,r)}}}function Pn(e,t){const r=e&&Dn[e];if(r)for(const a of r)try{a(t)}catch(n){u&&v.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${fe(a)}\nError:`,n)}}const Ln=new Set([]);function Rn(){"console"in s&&p.forEach(function(e){e in s.console&&D(s.console,e,function(t){return m[e]=t,function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r[0],i=m[e],o=Ln.size&&"string"===typeof a&&$e(a,Ln);o||Pn("console",{args:r,level:e}),(!o||u&&v.isEnabled())&&i?.apply(s.console,r)}})})}const In=s;function Bn(){if(!("fetch"in In))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Mn(e){return e&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())}function Vn(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&!function(){if("string"===typeof EdgeRuntime)return!0;if(!Bn())return!1;if(Mn(In.fetch))return!0;let e=!1;const t=In.document;if(t&&"function"===typeof t.createElement)try{const r=t.createElement("iframe");r.hidden=!0,t.head.appendChild(r),r.contentWindow?.fetch&&(e=Mn(r.contentWindow.fetch)),t.head.removeChild(r)}catch(r){u&&v.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",r)}return e}()||D(s,"fetch",function(t){return function(){const r=new Error;for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];const{method:o,url:l}=function(e){if(0===e.length)return{method:"GET",url:""};if(2===e.length){const[t,r]=e;return{url:Kn(t),method:Un(r,"method")?String(r.method).toUpperCase():A(t)&&Un(t,"method")?String(t.method).toUpperCase():"GET"}}const t=e[0];return{url:Kn(t),method:Un(t,"method")?String(t.method).toUpperCase():"GET"}}(a),d={args:a,fetchData:{method:o,url:l},startTimestamp:1e3*Q(),virtualError:r,headers:Hn(a)};return e||Pn("fetch",{...d}),t.apply(s,a).then(async t=>(e?e(t):Pn("fetch",{...d,endTimestamp:1e3*Q(),response:t}),t),e=>{Pn("fetch",{...d,endTimestamp:1e3*Q(),error:e}),k(e)&&void 0===e.stack&&(e.stack=r.stack,F(e,"framesToPop",1));const t=Ie(),n=t?.getOptions().enhanceFetchErrorMessages??"always";if(!1!==n&&e instanceof TypeError&&("Failed to fetch"===e.message||"Load failed"===e.message||"NetworkError when attempting to fetch resource."===e.message))try{const t=new URL(d.fetchData.url).host;"always"===n?e.message=`${e.message} (${t})`:F(e,"__sentry_fetch_url_host__",t)}catch{}throw e})}})}function Un(e,t){return!!e&&"object"===typeof e&&!!e[t]}function Kn(e){return"string"===typeof e?e:e?Un(e,"url")?e.url:e.toString?e.toString():"":""}function Hn(e){const[t,r]=e;try{if("object"===typeof r&&null!==r&&"headers"in r&&r.headers)return new Headers(r.headers);if(A(t))return new Headers(t.headers)}catch{}}const Wn=100;function qn(e,t){const r=Ie(),n=Re();if(!r)return;const{beforeBreadcrumb:a=null,maxBreadcrumbs:i=Wn}=r.getOptions();if(i<=0)return;const o={timestamp:Y(),...e},s=a?f(()=>a(o,t)):o;null!==s&&(r.emit&&r.emit("beforeAddBreadcrumb",s,t),n.addBreadcrumb(s,i))}function Gn(e){return"warn"===e?"warning":["fatal","error","warning","log","info","debug"].includes(e)?e:"log"}function Yn(e){return void 0===e?void 0:e>=400&&e<500?"warning":e>=500?"error":void 0}function Jn(e){if(!e)return{};const t=e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!t)return{};const r=t[6]||"",n=t[8]||"";return{host:t[4],path:t[5],protocol:t[2],search:r,hash:n,relative:t[5]+r+n}}const Qn=s;let Xn,Zn,ea;function ta(){if(!Qn.document)return;const e=Pn.bind(null,"dom"),t=ra(e,!0);Qn.document.addEventListener("click",t,!1),Qn.document.addEventListener("keypress",t,!1),["EventTarget","Node"].forEach(t=>{const r=Qn,n=r[t]?.prototype;n?.hasOwnProperty?.("addEventListener")&&(D(n,"addEventListener",function(t){return function(r,n,a){if("click"===r||"keypress"==r)try{const n=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},i=n[r]=n[r]||{refCount:0};if(!i.handler){const n=ra(e);i.handler=n,t.call(this,r,n,a)}i.refCount++}catch{}return t.call(this,r,n,a)}}),D(n,"removeEventListener",function(e){return function(t,r,n){if("click"===t||"keypress"==t)try{const r=this.__sentry_instrumentation_handlers__||{},a=r[t];a&&(a.refCount--,a.refCount<=0&&(e.call(this,t,a.handler,n),a.handler=void 0,delete r[t]),0===Object.keys(r).length&&delete this.__sentry_instrumentation_handlers__)}catch{}return e.call(this,t,r,n)}}))})}function ra(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r=>{if(!r||r._sentryCaptured)return;const n=function(e){try{return e.target}catch{return null}}(r);if(function(e,t){return"keypress"===e&&(!t?.tagName||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName&&!t.isContentEditable)}(r.type,n))return;F(r,"_sentryCaptured",!0),n&&!n._sentryId&&F(n,"_sentryId",U());const a="keypress"===r.type?"input":r.type;if(!function(e){if(e.type!==Zn)return!1;try{if(!e.target||e.target._sentryId!==ea)return!1}catch{}return!0}(r)){e({event:r,name:a,global:t}),Zn=r.type,ea=n?n._sentryId:void 0}clearTimeout(Xn),Xn=Qn.setTimeout(()=>{ea=void 0,Zn=void 0},1e3)}}const na="__sentry_xhr_v3__";function aa(){if(!Qn.XMLHttpRequest)return;const e=XMLHttpRequest.prototype;e.open=new Proxy(e.open,{apply(e,t,r){const n=new Error,a=1e3*Q(),i=S(r[0])?r[0].toUpperCase():void 0,o=function(e){if(S(e))return e;try{return e.toString()}catch{}return}(r[1]);if(!i||!o)return e.apply(t,r);t[na]={method:i,url:o,request_headers:{}},"POST"===i&&o.match(/sentry_key/)&&(t.__sentry_own_request__=!0);const s=()=>{const e=t[na];if(e&&4===t.readyState){try{e.status_code=t.status}catch{}Pn("xhr",{endTimestamp:1e3*Q(),startTimestamp:a,xhr:t,virtualError:n})}};return"onreadystatechange"in t&&"function"===typeof t.onreadystatechange?t.onreadystatechange=new Proxy(t.onreadystatechange,{apply:(e,t,r)=>(s(),e.apply(t,r))}):t.addEventListener("readystatechange",s),t.setRequestHeader=new Proxy(t.setRequestHeader,{apply(e,t,r){const[n,a]=r,i=t[na];return i&&S(n)&&S(a)&&(i.request_headers[n.toLowerCase()]=a),e.apply(t,r)}}),e.apply(t,r)}}),e.send=new Proxy(e.send,{apply(e,t,r){const n=t[na];if(!n)return e.apply(t,r);void 0!==r[0]&&(n.body=r[0]);return Pn("xhr",{startTimestamp:1e3*Q(),xhr:t}),e.apply(t,r)}})}let ia;function oa(e){const t="history";On(t,e),Tn(t,sa)}function sa(){function e(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r.length>2?r[2]:void 0;if(a){const t=ia,n=function(e){try{return new URL(e,Qn.location.origin).toString()}catch{return e}}(String(a));if(ia=n,t===n)return e.apply(this,r);Pn("history",{from:t,to:n})}return e.apply(this,r)}}Qn.addEventListener("popstate",()=>{const e=Qn.location.href,t=ia;if(ia=e,t===e)return;Pn("history",{from:t,to:e})}),"history"in In&&In.history&&(D(Qn.history,"pushState",e),D(Qn.history,"replaceState",e))}function la(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return"<unknown>";try{let r=e;const n=5,a=[];let i=0,o=0;const s=" > ",l=s.length;let d;const c=Array.isArray(t)?t:t.keyAttrs,u=!Array.isArray(t)&&t.maxStringLength||80;for(;r&&i++<n&&(d=da(r,c),!("html"===d||i>1&&o+a.length*l+d.length>=u));)a.push(d),o+=d.length,r=r.parentNode;return a.reverse().join(s)}catch{return"<unknown>"}}function da(e,t){const r=e,n=[];if(!r?.tagName)return"";if("undefined"!==typeof HTMLElement&&r instanceof HTMLElement&&r.dataset){if(r.dataset.sentryComponent)return r.dataset.sentryComponent;if(r.dataset.sentryElement)return r.dataset.sentryElement}n.push(r.tagName.toLowerCase());const a=t?.length?t.filter(e=>r.getAttribute(e)).map(e=>[e,r.getAttribute(e)]):null;if(a?.length)a.forEach(e=>{n.push(`[${e[0]}="${e[1]}"]`)});else{r.id&&n.push(`#${r.id}`);const e=r.className;if(e&&S(e)){const t=e.split(/\s+/);for(const e of t)n.push(`.${e}`)}}for(const i of["aria-label","type","name","title","alt"]){const e=r.getAttribute(i);e&&n.push(`[${i}="${e}"]`)}return n.join("")}const ca="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,ua=1024,pa=function(){const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"Breadcrumbs",setup(t){var r;e.console&&function(e){const t="console",r=On(t,e);Tn(t,Rn)}(function(e){return function(t){if(Ie()!==e)return;const r={category:"console",data:{arguments:t.args,logger:"console"},level:Gn(t.level),message:we(t.args," ")};if("assert"===t.level){if(!1!==t.args[0])return;r.message=`Assertion failed: ${we(t.args.slice(1)," ")||"console.assert"}`,r.data.arguments=t.args.slice(1)}qn(r,{input:t.args,level:t.level})}}(t)),e.dom&&(r=function(e,t){return function(r){if(Ie()!==e)return;let n,a,i="object"===typeof t?t.serializeAttribute:void 0,o="object"===typeof t&&"number"===typeof t.maxStringLength?t.maxStringLength:void 0;o&&o>ua&&(ca&&v.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${o} was configured. Sentry will use 1024 instead.`),o=ua),"string"===typeof i&&(i=[i]);try{const e=r.event,t=function(e){return!!e&&!!e.target}(e)?e.target:e;n=la(t,{keyAttrs:i,maxStringLength:o}),a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;if(!Sn.HTMLElement)return null;let r=e;for(let n=0;n<t;n++){if(!r)return null;if(r instanceof HTMLElement){if(r.dataset.sentryComponent)return r.dataset.sentryComponent;if(r.dataset.sentryElement)return r.dataset.sentryElement}r=r.parentNode}return null}(t)}catch{n="<unknown>"}if(0===n.length)return;const s={category:`ui.${r.name}`,message:n};a&&(s.data={"ui.component_name":a}),qn(s,{event:r.event,name:r.name,global:r.global})}}(t,e.dom),On("dom",r),Tn("dom",ta)),e.xhr&&function(e){On("xhr",e),Tn("xhr",aa)}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:r,endTimestamp:n}=t,a=t.xhr[na];if(!r||!n||!a)return;const{method:i,url:o,status_code:s,body:l}=a,d={method:i,url:o,status_code:s},c={xhr:t.xhr,input:l,startTimestamp:r,endTimestamp:n},u={category:"xhr",data:d,type:"http",level:Yn(s)};e.emit("beforeOutgoingRequestBreadcrumb",u,c),qn(u,c)}}(t)),e.fetch&&function(e,t){const r="fetch",n=On(r,e);Tn(r,()=>Vn(void 0,t))}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:r,endTimestamp:n}=t;if(n&&(!t.fetchData.url.match(/sentry_key/)||"POST"!==t.fetchData.method))if(t.error){const a={data:t.error,input:t.args,startTimestamp:r,endTimestamp:n},i={category:"fetch",data:t.fetchData,level:"error",type:"http"};e.emit("beforeOutgoingRequestBreadcrumb",i,a),qn(i,a)}else{const a=t.response,i={...t.fetchData,status_code:a?.status},o={input:t.args,response:a,startTimestamp:r,endTimestamp:n},s={category:"fetch",data:i,type:"http",level:Yn(i.status_code)};e.emit("beforeOutgoingRequestBreadcrumb",s,o),qn(s,o)}}}(t)),e.history&&oa(function(e){return function(t){if(Ie()!==e)return;let r=t.from,n=t.to;const a=Jn(Nn.location.href);let i=r?Jn(r):void 0;const o=Jn(n);i?.path||(i=a),a.protocol===o.protocol&&a.host===o.host&&(n=o.relative),a.protocol===i.protocol&&a.host===i.host&&(r=i.relative),qn({category:"navigation",data:{from:r,to:n}})}}(t)),e.sentry&&t.on("beforeSendEvent",function(e){return function(t){Ie()===e&&qn({category:"sentry."+("transaction"===t.type?"transaction":"event"),event_id:t.event_id,level:t.level,message:H(t)},{event:t})}}(t))}}};const ma="EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(","),fa=function(){const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"BrowserApiErrors",setupOnce(){e.setTimeout&&D(Nn,"setTimeout",ha),e.setInterval&&D(Nn,"setInterval",ha),e.requestAnimationFrame&&D(Nn,"requestAnimationFrame",ga),e.XMLHttpRequest&&"XMLHttpRequest"in Nn&&D(XMLHttpRequest.prototype,"send",xa);const t=e.eventTarget;if(t){(Array.isArray(t)?t:ma).forEach(t=>function(e,t){const r=Nn,n=r[e]?.prototype;if(!n?.hasOwnProperty?.("addEventListener"))return;D(n,"addEventListener",function(r){return function(n,a,i){try{"function"===typeof a.handleEvent&&(a.handleEvent=zn(a.handleEvent,{mechanism:{data:{handler:fe(a),target:e},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return t.unregisterOriginalCallbacks&&function(e,t,r){e&&"object"===typeof e&&"removeEventListener"in e&&"function"===typeof e.removeEventListener&&e.removeEventListener(t,r)}(this,n,a),r.apply(this,[n,zn(a,{mechanism:{data:{handler:fe(a),target:e},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),i])}}),D(n,"removeEventListener",function(e){return function(t,r,n){try{const a=r.__sentry_wrapped__;a&&e.call(this,t,a,n)}catch{}return e.call(this,t,r,n)}})}(t,e))}}}};function ha(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r[0];return r[0]=zn(a,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${fe(e)}`}}),e.apply(this,r)}}function ga(e){return function(t){return e.apply(this,[zn(t,{mechanism:{data:{handler:fe(e)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function xa(e){return function(){const t=this;["onload","onerror","onprogress","onreadystatechange"].forEach(e=>{e in t&&"function"===typeof t[e]&&D(t,e,function(t){const r={mechanism:{data:{handler:fe(t)},handled:!1,type:`auto.browser.browserapierrors.xhr.${e}`}},n=T(t);return n&&(r.mechanism.data.handler=fe(n)),zn(t,r)})});for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return e.apply(this,n)}}const va=function(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).lifecycle??"route";return{name:"BrowserSession",setupOnce(){if("undefined"===typeof Nn.document)return void(ca&&v.warn("Using the `browserSessionIntegration` in non-browser environments is not supported."));Mt({ignoreDuration:!0}),Kt();const t=Re();let r=t.getUser();t.addScopeListener(e=>{const t=e.getUser();r?.id===t?.id&&r?.ip_address===t?.ip_address||(Kt(),r=t)}),"route"===e&&oa(e=>{let{from:t,to:r}=e;t!==r&&(Mt({ignoreDuration:!0}),Kt())})}}};function ba(e,t){const r=e.attributes??(e.attributes={});Object.entries(t).forEach(e=>{let[t,n]=e;null==n||t in r||(r[t]=n)})}const ka=()=>({name:"CultureContext",preprocessEvent(e){const t=ya();t&&(e.contexts={...e.contexts,culture:{...t,...e.contexts?.culture}})},processSegmentSpan(e){const t=ya();t&&ba(e,{"culture.locale":t.locale,"culture.timezone":t.timezone,"culture.calendar":t.calendar})}});function ya(){try{const e=Nn.Intl;if(!e)return;const t=e.DateTimeFormat().resolvedOptions();return{locale:t.locale,timezone:t.timeZone,calendar:t.calendar}}catch{return}}let ja=null;function wa(){ja=s.onerror,s.onerror=function(e,t,r,n,a){return Pn("error",{column:n,error:a,line:r,msg:e,url:t}),!!ja&&ja.apply(this,arguments)},s.onerror.__SENTRY_INSTRUMENTED__=!0}let Sa=null;function $a(){Sa=s.onunhandledrejection,s.onunhandledrejection=function(e){return Pn("unhandledrejection",e),!Sa||Sa.apply(this,arguments)},s.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Na=function(){const e={onerror:!0,onunhandledrejection:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"GlobalHandlers",setupOnce(){Error.stackTraceLimit=50},setup(t){e.onerror&&(!function(e){!function(e){const t="error";On(t,e),Tn(t,wa)}(t=>{const{stackParser:r,attachStacktrace:n}=_a();if(Ie()!==e||_n())return;const{msg:a,url:i,line:o,column:s,error:l}=t,d=function(e,t,r,n){const a=e.exception=e.exception||{},i=a.values=a.values||[],o=i[0]=i[0]||{},s=o.stacktrace=o.stacktrace||{},l=s.frames=s.frames||[];0===l.length&&l.push({colno:n,lineno:r,filename:za(t)??$n(),function:le,in_app:!0});return e}(yn(r,l||a,void 0,n,!1),i,o,s);d.level="error",Bt(d,{originalException:l,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}(t),Ea("onerror")),e.onunhandledrejection&&(!function(e){!function(e){const t="unhandledrejection";On(t,e),Tn(t,$a)}(t=>{const{stackParser:r,attachStacktrace:n}=_a();if(Ie()!==e||_n())return;const a=function(e){if(N(e))return e;try{if("reason"in e)return e.reason;if("detail"in e&&"reason"in e.detail)return e.detail.reason}catch{}return e}(t),i=N(a)?{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(a)}`}]}}:yn(r,a,void 0,n,!0);i.level="error",Bt(i,{originalException:a,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}(t),Ea("onunhandledrejection"))}}};function Ea(e){ca&&v.log(`Global Handler attached: ${e}`)}function _a(){const e=Ie();return e?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function za(e){if(S(e)&&0!==e.length)return e.startsWith("data:")?`<${function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(e.startsWith("data:")){const r=e.match(/^data:([^;,]+)/),n=r?r[1]:"text/plain",a=e.includes(";base64,"),i=e.indexOf(",");let o="";if(t&&-1!==i){const t=e.slice(i+1);o=t.length>10?`${t.slice(0,10)}... [truncated]`:t}return`data:${n}${a?",base64":""}${o?`,${o}`:""}`}return e}(e,!1)}>`:e}const Ca=()=>({name:"HttpContext",preprocessEvent(e){if(!Nn.navigator&&!Nn.location&&!Nn.document)return;const t=Cn(),r={...t.headers,...e.request?.headers};e.request={...t,...e.request,headers:r}},processSegmentSpan(e){if(!Nn.navigator&&!Nn.location&&!Nn.document)return;const t=Cn();ba(e,{"url.full":t.url||void 0,"http.request.header.user_agent":t.headers["User-Agent"],"http.request.header.referer":t.headers.Referer})}});function Aa(e,t,r,n,a,i){if(!a.exception?.values||!i||!C(i.originalException,Error))return;const o=a.exception.values.length>0?a.exception.values[a.exception.values.length-1]:void 0;o&&(a.exception.values=Da(e,t,n,i.originalException,r,a.exception.values,o,0))}function Da(e,t,r,n,a,i,o,s){if(i.length>=r+1)return i;let l=[...i];if(C(n[a],Error)){Oa(o,s,n);const i=e(t,n[a]),d=l.length;Ta(i,a,d,s),l=Da(e,t,r,n[a],a,[i,...l],i,d)}return Fa(n)&&n.errors.forEach((i,d)=>{if(C(i,Error)){Oa(o,s,n);const c=e(t,i),u=l.length;Ta(c,`errors[${d}]`,u,s),l=Da(e,t,r,i,a,[c,...l],c,u)}}),l}function Fa(e){return Array.isArray(e.errors)}function Oa(e,t,r){e.mechanism={handled:!0,type:"auto.core.linked_errors",...Fa(r)&&{is_exception_group:!0},...e.mechanism,exception_id:t}}function Ta(e,t,r,n){e.mechanism={handled:!0,...e.mechanism,type:"chained",source:t,exception_id:r,parent_id:n}}const Pa=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=e.limit||5,r=e.key||"cause";return{name:"LinkedErrors",preprocessEvent(e,n,a){Aa(mn,a.getOptions().stackParser,r,t,e,n)}}};function La(e,t,r,n){const a={filename:e,function:"<anonymous>"===t?le:t,in_app:!0};return void 0!==r&&(a.lineno=r),void 0!==n&&(a.colno=n),a}const Ra=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Ia=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Ba=/\((\S*)(?::(\d+))(?::(\d+))\)/,Ma=/at (.+?) ?\(data:(.+?),/,Va=[30,e=>{const t=e.match(Ma);if(t)return{filename:`<data:${t[2]}>`,function:t[1]};const r=Ra.exec(e);if(r){const[,e,t,n]=r;return La(e,le,+t,+n)}const n=Ia.exec(e);if(n){if(0===n[2]?.indexOf("eval")){const e=Ba.exec(n[2]);e&&(n[2]=e[1],n[3]=e[2],n[4]=e[3])}const[e,t]=qa(n[1]||le,n[2]);return La(t,e,n[3]?+n[3]:void 0,n[4]?+n[4]:void 0)}}],Ua=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Ka=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Ha=[50,e=>{const t=Ua.exec(e);if(t){if(t[3]&&t[3].indexOf(" > eval")>-1){const e=Ka.exec(t[3]);e&&(t[1]=t[1]||"eval",t[3]=e[1],t[4]=e[2],t[5]="")}let e=t[3],r=t[1]||le;return[r,e]=qa(r,e),La(e,r,t[4]?+t[4]:void 0,t[5]?+t[5]:void 0)}}],Wa=ue(...[Va,Ha]),qa=(e,t)=>{const r=-1!==e.indexOf("safari-extension"),n=-1!==e.indexOf("safari-web-extension");return r||n?[-1!==e.indexOf("@")?e.split("@")[0]:le,r?`safari-extension:${t}`:`safari-web-extension:${t}`]:[e,t]},Ga="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,Ya={};function Ja(e){const t=Ya[e];if(t)return t;let r=Qn[e];if(Mn(r))return Ya[e]=r.bind(Qn);const n=Qn.document;if(n&&"function"===typeof n.createElement)try{const t=n.createElement("iframe");t.hidden=!0,n.head.appendChild(t);const a=t.contentWindow;a?.[e]&&(r=a[e]),n.head.removeChild(t)}catch(a){Ga&&v.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,a)}return r?Ya[e]=r.bind(Qn):r}function Qa(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Ja("fetch"),r=0,n=0;return Lr(e,async function(a){const i=a.body.length;r+=i,n++;const o={body:a.body,method:"POST",referrerPolicy:"strict-origin",headers:e.headers,keepalive:r<=6e4&&n<15,...e.fetchOptions};try{const r=await t(e.url,o);return{statusCode:r.status,headers:{"x-sentry-rate-limits":r.headers.get("X-Sentry-Rate-Limits"),"retry-after":r.headers.get("Retry-After")}}}catch(s){throw Ya["fetch"]=void 0,s}finally{r-=i,n--}},Tr(e.bufferSize||40))}const Xa=/^HTML(\w*)Element$/;function Za(e){if("undefined"!==typeof window&&e===window)return"[Window]";if("undefined"!==typeof document&&e===document)return"[Document]";if(function(e){if("undefined"===typeof Element)return!1;try{return e instanceof Element}catch{return!1}}(e)){const t=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(e);if(Xa.test(t))return`[HTMLElement: ${la(e)}]`}}function ei(){return!!function(){if("undefined"===typeof Nn.window)return!1;const e=Nn;if(e.nw)return!1;const t=e.chrome||e.browser;if(!t?.runtime?.id)return!1;const r=$n();return!(Nn===Nn.top&&/^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(r))}()&&(ca&&f(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0)}function ti(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=!e.skipBrowserExtensionCheck&&ei();let r=null==e.defaultIntegrations?[Xt(),nr(),ar(),fa(),pa(),Na(),Pa(),ir(),Ca(),ka(),va()]:e.defaultIntegrations;const n={...e,enabled:!t&&e.enabled,stackParser:(a=e.stackParser||Wa,Array.isArray(a)?ue(...a):a),integrations:Wt({integrations:e.integrations,defaultIntegrations:r}),transport:e.transport||Qa};var a;return xe(Za),dr(An,n)}function ri(e){const t={...e};var r,a;cn(t,"react"),r="react",a={version:n.version},Re().setContext(r,a);const i=ti(t);return xe(ni),i}function ni(e){return E(t=e)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t?"[SyntheticEvent]":Za(e);var t}var ai="popstate";function ii(e){return"object"===typeof e&&null!=e&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function oi(){return mi(function(e,t){let r=t.state?.masked,{pathname:n,search:a,hash:i}=r||e.location;return ci("",{pathname:n,search:a,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default",r?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)},function(e,t){return"string"===typeof t?t:ui(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function si(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function li(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(r){}}}function di(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ci(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?pi(t):t,state:r,key:t&&t.key||n||Math.random().toString(36).substring(2,10),unstable_mask:a}}function ui(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&"?"!==r&&(t+="?"===r.charAt(0)?r:"?"+r),n&&"#"!==n&&(t+="#"===n.charAt(0)?n:"#"+n),t}function pi(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function mi(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:a=document.defaultView,v5Compat:i=!1}=n,o=a.history,s="POP",l=null,d=c();function c(){return(o.state||{idx:null}).idx}function u(){s="POP";let e=c(),t=null==e?null:e-d;d=e,l&&l({action:s,location:m.location,delta:t})}function p(e){return fi(e)}null==d&&(d=0,o.replaceState({...o.state,idx:d},""));let m={get action(){return s},get location(){return e(a,o)},listen(e){if(l)throw new Error("A history only accepts one active listener");return a.addEventListener(ai,u),l=e,()=>{a.removeEventListener(ai,u),l=null}},createHref:e=>t(a,e),createURL:p,encodeLocation(e){let t=p(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){s="PUSH";let n=ii(e)?e:ci(m.location,e,t);r&&r(n,e),d=c()+1;let u=di(n,d),p=m.createHref(n.unstable_mask||n);try{o.pushState(u,"",p)}catch(f){if(f instanceof DOMException&&"DataCloneError"===f.name)throw f;a.location.assign(p)}i&&l&&l({action:s,location:m.location,delta:1})},replace:function(e,t){s="REPLACE";let n=ii(e)?e:ci(m.location,e,t);r&&r(n,e),d=c();let a=di(n,d),u=m.createHref(n.unstable_mask||n);o.replaceState(a,"",u),i&&l&&l({action:s,location:m.location,delta:0})},go:e=>o.go(e)};return m}function fi(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r="http://localhost";"undefined"!==typeof window&&(r="null"!==window.location.origin?window.location.origin:window.location.href),si(r,"No window.location.(origin|href) available to create URL");let n="string"===typeof e?e:ui(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}new WeakMap;function hi(e,t){return gi(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function gi(e,t,r,n){let a=Ai(("string"===typeof t?pi(t):t).pathname||"/",r);if(null==a)return null;let i=xi(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let r=e.length===t.length&&e.slice(0,-1).every((e,r)=>e===t[r]);return r?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(i);let o=null;for(let s=0;null==o&&s<i.length;++s){let e=Ci(a);o=Ei(i[s],e,n)}return o}function xi(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e,i){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,s=arguments.length>3?arguments[3]:void 0,l={relativePath:void 0===s?e.path||"":s,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};if(l.relativePath.startsWith("/")){if(!l.relativePath.startsWith(n)&&o)return;si(l.relativePath.startsWith(n),`Absolute route path "${l.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),l.relativePath=l.relativePath.slice(n.length)}let d=Ri([n,l.relativePath]),c=r.concat(l);e.children&&e.children.length>0&&(si(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),xi(e.children,t,c,d,o)),(null!=e.path||e.index)&&t.push({path:d,score:Ni(d,e.index),routesMeta:c})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let r of vi(e.path))i(e,t,!0,r);else i(e,t)}),t}function vi(e){let t=e.split("/");if(0===t.length)return[];let[r,...n]=t,a=r.endsWith("?"),i=r.replace(/\?$/,"");if(0===n.length)return a?[i,""]:[i];let o=vi(n.join("/")),s=[];return s.push(...o.map(e=>""===e?i:[i,e].join("/"))),a&&s.push(...o),s.map(t=>e.startsWith("/")&&""===t?"/":t)}var bi=/^:[\w-]+$/,ki=3,yi=2,ji=1,wi=10,Si=-2,$i=e=>"*"===e;function Ni(e,t){let r=e.split("/"),n=r.length;return r.some($i)&&(n+=Si),t&&(n+=yi),r.filter(e=>!$i(e)).reduce((e,t)=>e+(bi.test(t)?ki:""===t?ji:wi),n)}function Ei(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:n}=e,a={},i="/",o=[];for(let s=0;s<n.length;++s){let e=n[s],l=s===n.length-1,d="/"===i?t:t.slice(i.length)||"/",c=_i({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},d),u=e.route;if(!c&&l&&r&&!n[n.length-1].route.index&&(c=_i({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},d)),!c)return null;Object.assign(a,c.params),o.push({params:a,pathname:Ri([i,c.pathname]),pathnameBase:Ii(Ri([i,c.pathnameBase])),route:u}),"/"!==c.pathnameBase&&(i=Ri([i,c.pathnameBase]))}return o}function _i(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=zi(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:n.reduce((e,t,r)=>{let{paramName:n,isOptional:a}=t;if("*"===n){let e=s[r]||"";o=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[r];return e[n]=a&&!l?void 0:(l||"").replace(/%2F/g,"/"),e},{}),pathname:i,pathnameBase:o,pattern:e}}function zi(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];li("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,r,a,i)=>{if(n.push({paramName:t,isOptional:null!=r}),r){let t=i.charAt(a+e.length);return t&&"/"!==t?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(n.push({paramName:"*"}),a+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":""!==e&&"/"!==e&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),n]}function Ci(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return li(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ai(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&"/"!==n?null:e.slice(r)||"/"}var Di=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Fi(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?r.length>1&&r.pop():"."!==e&&r.push(e)}),r.length>1?r.join("/"):"/"}function Oi(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ti(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function Pi(e){let t=Ti(e);return t.map((e,r)=>r===t.length-1?e.pathname:e.pathnameBase)}function Li(e,t,r){let n,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?n=pi(e):(n={...e},si(!n.pathname||!n.pathname.includes("?"),Oi("?","pathname","search",n)),si(!n.pathname||!n.pathname.includes("#"),Oi("#","pathname","hash",n)),si(!n.search||!n.search.includes("#"),Oi("#","search","hash",n)));let i,o=""===e||""===n.pathname,s=o?"/":n.pathname;if(null==s)i=r;else{let e=t.length-1;if(!a&&s.startsWith("..")){let t=s.split("/");for(;".."===t[0];)t.shift(),e-=1;n.pathname=t.join("/")}i=e>=0?t[e]:"/"}let l=function(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:n,search:a="",hash:i=""}="string"===typeof e?pi(e):e;return n?(n=n.replace(/\/\/+/g,"/"),t=n.startsWith("/")?Fi(n.substring(1),"/"):Fi(n,r)):t=r,{pathname:t,search:Bi(a),hash:Mi(i)}}(n,i),d=s&&"/"!==s&&s.endsWith("/"),c=(o||"."===s)&&r.endsWith("/");return l.pathname.endsWith("/")||!d&&!c||(l.pathname+="/"),l}var Ri=e=>e.join("/").replace(/\/\/+/g,"/"),Ii=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Bi=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",Mi=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";var Vi=class{constructor(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.status=e,this.statusText=t||"",this.internal=n,r instanceof Error?(this.data=r.toString(),this.error=r):this.data=r}};function Ui(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}function Ki(e){return e.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Hi="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;function Wi(e,t){let r=e;if("string"!==typeof r||!Di.test(r))return{absoluteURL:void 0,isExternal:!1,to:r};let n=r,a=!1;if(Hi)try{let e=new URL(window.location.href),n=r.startsWith("//")?new URL(e.protocol+r):new URL(r),i=Ai(n.pathname,t);n.origin===e.origin&&null!=i?r=i+n.search+n.hash:a=!0}catch(i){li(!1,`<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:n,isExternal:a,to:r}}Symbol("Uninstrumented");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var qi=["POST","PUT","PATCH","DELETE"],Gi=(new Set(qi),["GET",...qi]);new Set(Gi),Symbol("ResetLoaderData");var Yi=n.createContext(null);Yi.displayName="DataRouter";var Ji=n.createContext(null);Ji.displayName="DataRouterState";var Qi=n.createContext(!1);function Xi(){return n.useContext(Qi)}var Zi=n.createContext({isTransitioning:!1});Zi.displayName="ViewTransition";var eo=n.createContext(new Map);eo.displayName="Fetchers";var to=n.createContext(null);to.displayName="Await";var ro=n.createContext(null);ro.displayName="Navigation";var no=n.createContext(null);no.displayName="Location";var ao=n.createContext({outlet:null,matches:[],isDataRoute:!1});ao.displayName="Route";var io=n.createContext(null);io.displayName="RouteError";var oo="REACT_ROUTER_ERROR";function so(){return null!=n.useContext(no)}function lo(){return si(so(),"useLocation() may be used only in the context of a <Router> component."),n.useContext(no).location}var co="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function uo(e){n.useContext(ro).static||n.useLayoutEffect(e)}function po(){let{isDataRoute:e}=n.useContext(ao);return e?function(){let{router:e}=So("useNavigate"),t=No("useNavigate"),r=n.useRef(!1);uo(()=>{r.current=!0});let a=n.useCallback(async function(n){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};li(r.current,co),r.current&&("number"===typeof n?await e.navigate(n):await e.navigate(n,{fromRouteId:t,...a}))},[e,t]);return a}():function(){si(so(),"useNavigate() may be used only in the context of a <Router> component.");let e=n.useContext(Yi),{basename:t,navigator:r}=n.useContext(ro),{matches:a}=n.useContext(ao),{pathname:i}=lo(),o=JSON.stringify(Pi(a)),s=n.useRef(!1);uo(()=>{s.current=!0});let l=n.useCallback(function(n){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(li(s.current,co),!s.current)return;if("number"===typeof n)return void r.go(n);let l=Li(n,JSON.parse(o),i,"path"===a.relative);null==e&&"/"!==t&&(l.pathname="/"===l.pathname?t:Ri([t,l.pathname])),(a.replace?r.replace:r.push)(l,a.state,a)},[t,r,o,i,e]);return l}()}n.createContext(null);function mo(){let{matches:e}=n.useContext(ao),t=e[e.length-1];return t?t.params:{}}function fo(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:r}=n.useContext(ao),{pathname:a}=lo(),i=JSON.stringify(Pi(r));return n.useMemo(()=>Li(e,JSON.parse(i),a,"path"===t),[e,i,a,t])}function ho(e,t,r){si(so(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=n.useContext(ro),{matches:i}=n.useContext(ao),o=i[i.length-1],s=o?o.params:{},l=o?o.pathname:"/",d=o?o.pathnameBase:"/",c=o&&o.route;{let e=c&&c.path||"";zo(l,!c||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let u,p=lo();if(t){let e="string"===typeof t?pi(t):t;si("/"===d||e.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${e.pathname}" was given in the \`location\` prop.`),u=e}else u=p;let m=u.pathname||"/",f=m;if("/"!==d){let e=d.replace(/^\//,"").split("/");f="/"+m.replace(/^\//,"").split("/").slice(e.length).join("/")}let h=hi(e,{pathname:f});li(c||null!=h,`No routes matched location "${u.pathname}${u.search}${u.hash}" `),li(null==h||void 0!==h[h.length-1].route.element||void 0!==h[h.length-1].route.Component||void 0!==h[h.length-1].route.lazy,`Matched leaf route at location "${u.pathname}${u.search}${u.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let g=jo(h&&h.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:Ri([d,a.encodeLocation?a.encodeLocation(e.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?d:Ri([d,a.encodeLocation?a.encodeLocation(e.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathnameBase])})),i,r);return t&&g?n.createElement(no.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...u},navigationType:"POP"}},g):g}function go(){let e=Eo(),t=Ui(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=n.createElement(n.Fragment,null,n.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),n.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",n.createElement("code",{style:o},"ErrorBoundary")," or"," ",n.createElement("code",{style:o},"errorElement")," prop on your route.")),n.createElement(n.Fragment,null,n.createElement("h2",null,"Unexpected Application Error!"),n.createElement("h3",{style:{fontStyle:"italic"}},t),r?n.createElement("pre",{style:i},r):null,s)}var xo=n.createElement(go,null),vo=class extends n.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&"object"===typeof e&&e&&"digest"in e&&"string"===typeof e.digest){const t=function(e){if(e.startsWith(`${oo}:ROUTE_ERROR_RESPONSE:{`))try{let t=JSON.parse(e.slice(40));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText)return new Vi(t.status,t.statusText,t.data)}catch{}}(e.digest);t&&(e=t)}let t=void 0!==e?n.createElement(ao.Provider,{value:this.props.routeContext},n.createElement(io.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?n.createElement(ko,{error:e},t):t}};vo.contextType=Qi;var bo=new WeakMap;function ko(e){let{children:t,error:r}=e,{basename:a}=n.useContext(ro);if("object"===typeof r&&r&&"digest"in r&&"string"===typeof r.digest){let e=function(e){if(e.startsWith(`${oo}:REDIRECT:{`))try{let t=JSON.parse(e.slice(28));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText&&"string"===typeof t.location&&"boolean"===typeof t.reloadDocument&&"boolean"===typeof t.replace)return t}catch{}}(r.digest);if(e){let t=bo.get(r);if(t)throw t;let i=Wi(e.location,a);if(Hi&&!bo.get(r)){if(!i.isExternal&&!e.reloadDocument){const t=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw bo.set(r,t),t}window.location.href=i.absoluteURL||i.to}return n.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return t}function yo(e){let{routeContext:t,match:r,children:a}=e,i=n.useContext(Yi);return i&&i.static&&i.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=r.route.id),n.createElement(ao.Provider,{value:t},a)}function jo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0,a=r?.state;if(null==e){if(!a)return null;if(a.errors)e=a.matches;else{if(0!==t.length||a.initialized||!(a.matches.length>0))return null;e=a.matches}}let i=e,o=a?.errors;if(null!=o){let e=i.findIndex(e=>e.route.id&&void 0!==o?.[e.route.id]);si(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),i=i.slice(0,Math.min(i.length,e+1))}let s=!1,l=-1;if(r&&a){s=a.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(l=e),t.route.id){let{loaderData:e,errors:n}=a,o=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!n||void 0===n[t.route.id]);if(t.route.lazy||o){r.isStatic&&(s=!0),i=l>=0?i.slice(0,l+1):[i[0]];break}}}}let d=r?.onError,c=a&&d?(e,t)=>{d(e,{location:a.location,params:a.matches?.[0]?.params??{},unstable_pattern:Ki(a.matches),errorInfo:t})}:void 0;return i.reduceRight((e,r,d)=>{let u,p=!1,m=null,f=null;a&&(u=o&&r.route.id?o[r.route.id]:void 0,m=r.route.errorElement||xo,s&&(l<0&&0===d?(zo("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),p=!0,f=null):l===d&&(p=!0,f=r.route.hydrateFallbackElement||null)));let h=t.concat(i.slice(0,d+1)),g=()=>{let t;return t=u?m:p?f:r.route.Component?n.createElement(r.route.Component,null):r.route.element?r.route.element:e,n.createElement(yo,{match:r,routeContext:{outlet:e,matches:h,isDataRoute:null!=a},children:t})};return a&&(r.route.ErrorBoundary||r.route.errorElement||0===d)?n.createElement(vo,{location:a.location,revalidation:a.revalidation,component:m,error:u,children:g(),routeContext:{outlet:null,matches:h,isDataRoute:!0},onError:c}):g()},null)}function wo(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function So(e){let t=n.useContext(Yi);return si(t,wo(e)),t}function $o(e){let t=n.useContext(Ji);return si(t,wo(e)),t}function No(e){let t=function(e){let t=n.useContext(ao);return si(t,wo(e)),t}(e),r=t.matches[t.matches.length-1];return si(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function Eo(){let e=n.useContext(io),t=$o("useRouteError"),r=No("useRouteError");return void 0!==e?e:t.errors?.[r]}var _o={};function zo(e,t,r){t||_o[e]||(_o[e]=!0,li(!1,r))}var Co={};function Ao(e,t){e||Co[t]||(Co[t]=!0,console.warn(t))}a.useOptimistic;n.memo(Do);function Do(e){let{routes:t,future:r,state:n,isStatic:a,onError:i}=e;return ho(t,void 0,{state:n,isStatic:a,onError:i,future:r})}function Fo(e){let{to:t,replace:r,state:a,relative:i}=e;si(so(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=n.useContext(ro);li(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:s}=n.useContext(ao),{pathname:l}=lo(),d=po(),c=Li(t,Pi(s),l,"path"===i),u=JSON.stringify(c);return n.useEffect(()=>{d(JSON.parse(u),{replace:r,state:a,relative:i})},[d,u,i,r,a]),null}function Oo(e){si(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function To(e){let{basename:t="/",children:r=null,location:a,navigationType:i="POP",navigator:o,static:s=!1,unstable_useTransitions:l}=e;si(!so(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=t.replace(/^\/*/,"/"),c=n.useMemo(()=>({basename:d,navigator:o,static:s,unstable_useTransitions:l,future:{}}),[d,o,s,l]);"string"===typeof a&&(a=pi(a));let{pathname:u="/",search:p="",hash:m="",state:f=null,key:h="default",unstable_mask:g}=a,x=n.useMemo(()=>{let e=Ai(u,d);return null==e?null:{location:{pathname:e,search:p,hash:m,state:f,key:h,unstable_mask:g},navigationType:i}},[d,u,p,m,f,h,i,g]);return li(null!=x,`<Router basename="${d}"> is not able to match the URL "${u}${p}${m}" because it does not start with the basename, so the <Router> won't render anything.`),null==x?null:n.createElement(ro.Provider,{value:c},n.createElement(no.Provider,{children:r,value:x}))}function Po(e){let{children:t,location:r}=e;return ho(Lo(t),r)}n.Component;function Lo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=[];return n.Children.forEach(e,(e,a)=>{if(!n.isValidElement(e))return;let i=[...t,a];if(e.type===n.Fragment)return void r.push.apply(r,Lo(e.props.children,i));si(e.type===Oo,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),si(!e.props.index||!e.props.children,"An index route cannot have child routes.");let o={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(o.children=Lo(e.props.children,i)),r.push(o)}),r}var Ro="get",Io="application/x-www-form-urlencoded";function Bo(e){return"undefined"!==typeof HTMLElement&&e instanceof HTMLElement}function Mo(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new URLSearchParams("string"===typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,r)=>{let n=e[r];return t.concat(Array.isArray(n)?n.map(e=>[r,e]):[[r,n]])},[]))}var Vo=null;var Uo=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ko(e){return null==e||Uo.has(e)?e:(li(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Io}"`),null)}function Ho(e,t){let r,n,a,i,o;if(Bo(s=e)&&"form"===s.tagName.toLowerCase()){let o=e.getAttribute("action");n=o?Ai(o,t):null,r=e.getAttribute("method")||Ro,a=Ko(e.getAttribute("enctype"))||Io,i=new FormData(e)}else if(function(e){return Bo(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Bo(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let o=e.form;if(null==o)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||o.getAttribute("action");if(n=s?Ai(s,t):null,r=e.getAttribute("formmethod")||o.getAttribute("method")||Ro,a=Ko(e.getAttribute("formenctype"))||Ko(o.getAttribute("enctype"))||Io,i=new FormData(o,e),!function(){if(null===Vo)try{new FormData(document.createElement("form"),0),Vo=!1}catch(e){Vo=!0}return Vo}()){let{name:t,type:r,value:n}=e;if("image"===r){let e=t?`${t}.`:"";i.append(`${e}x`,"0"),i.append(`${e}y`,"0")}else t&&i.append(t,n)}}else{if(Bo(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Ro,n=null,a=Io,o=e}var s;return i&&"text/plain"===a&&(o=i,i=void 0),{action:n,method:r.toLowerCase(),encType:a,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;function Wo(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}Symbol("SingleFetchRedirect");function qo(e,t,r,n){let a="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return r?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${n}`:a.pathname=`${a.pathname}.${n}`:"/"===a.pathname?a.pathname=`_root.${n}`:t&&"/"===Ai(a.pathname,t)?a.pathname=`${t.replace(/\/$/,"")}/_root.${n}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${n}`,a}async function Go(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Yo(e){return null!=e&&"string"===typeof e.page}function Jo(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Qo(e,t,r,n,a,i){let o=(e,t)=>!r[t]||e.route.id!==r[t].route.id,s=(e,t)=>r[t].pathname!==e.pathname||r[t].route.path?.endsWith("*")&&r[t].params["*"]!==e.params["*"];return"assets"===i?t.filter((e,t)=>o(e,t)||s(e,t)):"data"===i?t.filter((t,i)=>{let l=n.routes[t.route.id];if(!l||!l.hasLoader)return!1;if(o(t,i)||s(t,i))return!0;if(t.route.shouldRevalidate){let n=t.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof n)return n}return!0}):[]}function Xo(e,t){let{includeHydrateFallback:r}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n=e.map(e=>{let n=t.routes[e.route.id];if(!n)return[];let a=[n.module];return n.clientActionModule&&(a=a.concat(n.clientActionModule)),n.clientLoaderModule&&(a=a.concat(n.clientLoaderModule)),r&&n.hydrateFallbackModule&&(a=a.concat(n.hydrateFallbackModule)),n.imports&&(a=a.concat(n.imports)),a}).flat(1),[...new Set(n)];var n}function Zo(e,t){let r=new Set,n=new Set(t);return e.reduce((e,a)=>{if(t&&!Yo(a)&&"script"===a.as&&a.href&&n.has(a.href))return e;let i=JSON.stringify(function(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}(a));return r.has(i)||(r.add(i),e.push({key:i,link:a})),e},[])}function es(e,t){return"lazy"===e.mode&&!0===t}function ts(){let e=n.useContext(Yi);return Wo(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function rs(){let e=n.useContext(Ji);return Wo(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var ns=n.createContext(void 0);function as(){let e=n.useContext(ns);return Wo(e,"You must render this element inside a <HydratedRouter> element"),e}function is(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function os(e,t,r){if(r&&!cs)return[e[0]];if(t){let r=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,r+1)}return e}ns.displayName="FrameworkContext";function ss(e){let{page:t,...r}=e,{router:a}=ts(),i=n.useMemo(()=>hi(a.routes,t,a.basename),[a.routes,t,a.basename]);return i?n.createElement(ds,{page:t,matches:i,...r}):null}function ls(e){let{manifest:t,routeModules:r}=as(),[a,i]=n.useState([]);return n.useEffect(()=>{let n=!1;return async function(e,t,r){let n=await Promise.all(e.map(async e=>{let n=t.routes[e.route.id];if(n){let e=await Go(n,r);return e.links?e.links():[]}return[]}));return Zo(n.flat(1).filter(Jo).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,r).then(e=>{n||i(e)}),()=>{n=!0}},[e,t,r]),a}function ds(e){let{page:t,matches:r,...a}=e,i=lo(),{future:o,manifest:s,routeModules:l}=as(),{basename:d}=ts(),{loaderData:c,matches:u}=rs(),p=n.useMemo(()=>Qo(t,r,u,s,i,"data"),[t,r,u,s,i]),m=n.useMemo(()=>Qo(t,r,u,s,i,"assets"),[t,r,u,s,i]),f=n.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let e=new Set,n=!1;if(r.forEach(t=>{let r=s.routes[t.route.id];r&&r.hasLoader&&(!p.some(e=>e.route.id===t.route.id)&&t.route.id in c&&l[t.route.id]?.shouldRevalidate||r.hasClientLoader?n=!0:e.add(t.route.id))}),0===e.size)return[];let a=qo(t,d,o.unstable_trailingSlashAwareDataRequests,"data");return n&&e.size>0&&a.searchParams.set("_routes",r.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[a.pathname+a.search]},[d,o.unstable_trailingSlashAwareDataRequests,c,i,s,p,r,t,l]),h=n.useMemo(()=>Xo(m,s),[m,s]),g=ls(m);return n.createElement(n.Fragment,null,f.map(e=>n.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...a})),h.map(e=>n.createElement("link",{key:e,rel:"modulepreload",href:e,...a})),g.map(e=>{let{key:t,link:r}=e;return n.createElement("link",{key:t,nonce:a.nonce,...r,crossOrigin:r.crossOrigin??a.crossOrigin})}))}var cs=!1;function us(e){let{manifest:t,serverHandoffString:r,isSpaMode:a,renderMeta:i,routeDiscovery:o,ssr:s}=as(),{router:l,static:d,staticContext:c}=ts(),{matches:u}=rs(),p=Xi(),m=es(o,s);i&&(i.didRenderScripts=!0);let f=os(u,null,a);n.useEffect(()=>{cs=!0},[]);let h=n.useMemo(()=>{if(p)return null;let a=c?`window.__reactRouterContext = ${r};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",i=d?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${m?"":`import ${JSON.stringify(t.url)}`};\n${f.map((e,r)=>{let n=`route${r}`,a=t.routes[e.route.id];Wo(a,`Route ${e.route.id} not found in manifest`);let{clientActionModule:i,clientLoaderModule:o,clientMiddlewareModule:s,hydrateFallbackModule:l,module:d}=a,c=[...i?[{module:i,varName:`${n}_clientAction`}]:[],...o?[{module:o,varName:`${n}_clientLoader`}]:[],...s?[{module:s,varName:`${n}_clientMiddleware`}]:[],...l?[{module:l,varName:`${n}_HydrateFallback`}]:[],{module:d,varName:`${n}_main`}];return 1===c.length?`import * as ${n} from ${JSON.stringify(d)};`:[c.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${n} = {${c.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${m?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:r,...n}=e,a=new Set(t.state.matches.map(e=>e.route.id)),i=t.state.location.pathname.split("/").filter(Boolean),o=["/"];for(i.pop();i.length>0;)o.push(`/${i.join("/")}`),i.pop();o.forEach(e=>{let r=hi(t.routes,e,t.basename);r&&r.forEach(e=>a.add(e.route.id))});let s=[...a].reduce((e,t)=>Object.assign(e,{[t]:n.routes[t]}),{});return{...n,routes:s,sri:!!r||void 0}}(t,l),null,2)};`:""}\n  window.__reactRouterRouteModules = {${f.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return n.createElement(n.Fragment,null,n.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:a},type:void 0}),n.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:i},type:"module",async:!0}))},[]),g=cs||p?[]:(x=t.entry.imports.concat(Xo(f,t,{includeHydrateFallback:!0})),[...new Set(x)]);var x;let v="object"===typeof t.sri?t.sri:{};return Ao(!p,"The <Scripts /> element is a no-op when using RSC and can be safely removed."),cs||p?null:n.createElement(n.Fragment,null,"object"===typeof t.sri?n.createElement("script",{...e,"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:v})}}):null,m?null:n.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:v[t.url],suppressHydrationWarning:!0}),n.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:v[t.entry.module],suppressHydrationWarning:!0}),g.map(t=>n.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:v[t],suppressHydrationWarning:!0})),h)}function ps(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}n.Component;function ms(e){let{error:t,isOutsideRemixApp:r}=e;console.error(t);let a,i=n.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(Ui(t))return n.createElement(fs,{title:"Unhandled Thrown Response!"},n.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),i);if(t instanceof Error)a=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);a=new Error(e)}return n.createElement(fs,{title:"Application Error!",isOutsideRemixApp:r},n.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),n.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},a.stack),i)}function fs(e){let{title:t,renderScripts:r,isOutsideRemixApp:a,children:i}=e,{routeModules:o}=as();return o.root?.Layout&&!a?i:n.createElement("html",{lang:"en"},n.createElement("head",null,n.createElement("meta",{charSet:"utf-8"}),n.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),n.createElement("title",null,t)),n.createElement("body",null,n.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},i,r?n.createElement(us,null):null)))}var hs="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{hs&&(window.__reactRouterVersion="7.13.2")}catch(dy){}function gs(e){let{basename:t,children:r,unstable_useTransitions:a,window:i}=e,o=n.useRef();null==o.current&&(o.current=oi({window:i,v5Compat:!0}));let s=o.current,[l,d]=n.useState({action:s.action,location:s.location}),c=n.useCallback(e=>{!1===a?d(e):n.startTransition(()=>d(e))},[a]);return n.useLayoutEffect(()=>s.listen(c),[s,c]),n.createElement(To,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:s,unstable_useTransitions:a})}var xs=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vs=n.forwardRef(function(e,t){let{onClick:r,discover:a="render",prefetch:i="none",relative:o,reloadDocument:s,replace:l,unstable_mask:d,state:c,target:u,to:p,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:h,...g}=e,{basename:x,navigator:v,unstable_useTransitions:b}=n.useContext(ro),k="string"===typeof p&&xs.test(p),y=Wi(p,x);p=y.to;let j=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};si(so(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:a}=n.useContext(ro),{hash:i,pathname:o,search:s}=fo(e,{relative:t}),l=o;return"/"!==r&&(l="/"===o?r:Ri([r,o])),a.createHref({pathname:l,search:s,hash:i})}(p,{relative:o}),w=lo(),S=null;if(d){let e=Li(d,[],w.unstable_mask?w.unstable_mask.pathname:"/",!0);"/"!==x&&(e.pathname="/"===e.pathname?x:Ri([x,e.pathname])),S=v.createHref(e)}let[$,N,E]=function(e,t){let r=n.useContext(ns),[a,i]=n.useState(!1),[o,s]=n.useState(!1),{onFocus:l,onBlur:d,onMouseEnter:c,onMouseLeave:u,onTouchStart:p}=t,m=n.useRef(null);n.useEffect(()=>{if("render"===e&&s(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{s(e.isIntersecting)})},{threshold:.5});return m.current&&e.observe(m.current),()=>{e.disconnect()}}},[e]),n.useEffect(()=>{if(a){let e=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(e)}}},[a]);let f=()=>{i(!0)},h=()=>{i(!1),s(!1)};return r?"intent"!==e?[o,m,{}]:[o,m,{onFocus:is(l,f),onBlur:is(d,h),onMouseEnter:is(c,f),onMouseLeave:is(u,h),onTouchStart:is(p,f)}]:[!1,m,{}]}(i,g),_=function(e){let{target:t,replace:r,unstable_mask:a,state:i,preventScrollReset:o,relative:s,viewTransition:l,unstable_defaultShouldRevalidate:d,unstable_useTransitions:c}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=po(),p=lo(),m=fo(e,{relative:s});return n.useCallback(f=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(f,t)){f.preventDefault();let t=void 0!==r?r:ui(p)===ui(m),h=()=>u(e,{replace:t,unstable_mask:a,state:i,preventScrollReset:o,relative:s,viewTransition:l,unstable_defaultShouldRevalidate:d});c?n.startTransition(()=>h()):h()}},[p,u,m,r,a,i,t,e,o,s,l,d,c])}(p,{replace:l,unstable_mask:d,state:c,target:u,preventScrollReset:m,relative:o,viewTransition:f,unstable_defaultShouldRevalidate:h,unstable_useTransitions:b});let z=!(y.isExternal||s),C=n.createElement("a",{...g,...E,href:(z?S:void 0)||y.absoluteURL||j,onClick:z?function(e){r&&r(e),e.defaultPrevented||_(e)}:r,ref:ps(t,N),target:u,"data-discover":k||"render"!==a?void 0:"true"});return $&&!k?n.createElement(n.Fragment,null,C,n.createElement(ss,{page:j})):C});vs.displayName="Link",n.forwardRef(function(e,t){let{"aria-current":r="page",caseSensitive:a=!1,className:i="",end:o=!1,style:s,to:l,viewTransition:d,children:c,...u}=e,p=fo(l,{relative:u.relative}),m=lo(),f=n.useContext(Ji),{navigator:h,basename:g}=n.useContext(ro),x=null!=f&&function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.useContext(Zi);si(null!=r,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=ys("useViewTransitionState"),i=fo(e,{relative:t});if(!r.isTransitioning)return!1;let o=Ai(r.currentLocation.pathname,a)||r.currentLocation.pathname,s=Ai(r.nextLocation.pathname,a)||r.nextLocation.pathname;return null!=_i(i.pathname,s)||null!=_i(i.pathname,o)}(p)&&!0===d,v=h.encodeLocation?h.encodeLocation(p).pathname:p.pathname,b=m.pathname,k=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;a||(b=b.toLowerCase(),k=k?k.toLowerCase():null,v=v.toLowerCase()),k&&g&&(k=Ai(k,g)||k);const y="/"!==v&&v.endsWith("/")?v.length-1:v.length;let j,w=b===v||!o&&b.startsWith(v)&&"/"===b.charAt(y),S=null!=k&&(k===v||!o&&k.startsWith(v)&&"/"===k.charAt(v.length)),$={isActive:w,isPending:S,isTransitioning:x},N=w?r:void 0;j="function"===typeof i?i($):[i,w?"active":null,S?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let E="function"===typeof s?s($):s;return n.createElement(vs,{...u,"aria-current":N,className:j,ref:t,style:E,to:l,viewTransition:d},"function"===typeof c?c($):c)}).displayName="NavLink";var bs=n.forwardRef((e,t)=>{let{discover:r="render",fetcherKey:a,navigate:i,reloadDocument:o,replace:s,state:l,method:d=Ro,action:c,onSubmit:u,relative:p,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:h,...g}=e,{unstable_useTransitions:x}=n.useContext(ro),v=$s(),b=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:r}=n.useContext(ro),a=n.useContext(ao);si(a,"useFormAction must be used inside a RouteContext");let[i]=a.matches.slice(-1),o={...fo(e||".",{relative:t})},s=lo();if(null==e){o.search=s.search;let e=new URLSearchParams(o.search),t=e.getAll("index"),r=t.some(e=>""===e);if(r){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let r=e.toString();o.search=r?`?${r}`:""}}e&&"."!==e||!i.route.index||(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index");"/"!==r&&(o.pathname="/"===o.pathname?r:Ri([r,o.pathname]));return ui(o)}(c,{relative:p}),k="get"===d.toLowerCase()?"get":"post",y="string"===typeof c&&xs.test(c);return n.createElement("form",{ref:t,method:k,action:b,onSubmit:o?u:e=>{if(u&&u(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,r=t?.getAttribute("formmethod")||d,o=()=>v(t||e.currentTarget,{fetcherKey:a,method:r,navigate:i,replace:s,state:l,relative:p,preventScrollReset:m,viewTransition:f,unstable_defaultShouldRevalidate:h});x&&!1!==i?n.startTransition(()=>o()):o()},...g,"data-discover":y||"render"!==r?void 0:"true"})});function ks(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ys(e){let t=n.useContext(Yi);return si(t,ks(e)),t}function js(e){li("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=n.useRef(Mo(e)),r=n.useRef(!1),a=lo(),i=n.useMemo(()=>function(e,t){let r=Mo(e);return t&&t.forEach((e,n)=>{r.has(n)||t.getAll(n).forEach(e=>{r.append(n,e)})}),r}(a.search,r.current?null:t.current),[a.search]),o=po(),s=n.useCallback((e,t)=>{const n=Mo("function"===typeof e?e(new URLSearchParams(i)):e);r.current=!0,o("?"+n,t)},[o,i]);return[i,s]}bs.displayName="Form";var ws=0,Ss=()=>`__${String(++ws)}__`;function $s(){let{router:e}=ys("useSubmit"),{basename:t}=n.useContext(ro),r=No("useRouteId"),a=e.fetch,i=e.navigate;return n.useCallback(async function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:o,method:s,encType:l,formData:d,body:c}=Ho(e,t);if(!1===n.navigate){let e=n.fetcherKey||Ss();await a(e,r,n.action||o,{unstable_defaultShouldRevalidate:n.unstable_defaultShouldRevalidate,preventScrollReset:n.preventScrollReset,formData:d,body:c,formMethod:n.method||s,formEncType:n.encType||l,flushSync:n.flushSync})}else await i(n.action||o,{unstable_defaultShouldRevalidate:n.unstable_defaultShouldRevalidate,preventScrollReset:n.preventScrollReset,formData:d,body:c,formMethod:n.method||s,formEncType:n.encType||l,replace:n.replace,state:n.state,fromRouteId:r,flushSync:n.flushSync,viewTransition:n.viewTransition})},[a,i,t,r])}var Ns=function(){return Ns=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},Ns.apply(this,arguments)};Object.create;function Es(e,t,r){if(r||2===arguments.length)for(var n,a=0,i=t.length;a<i;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var _s={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},zs="-ms-",Cs="-moz-",As="-webkit-",Ds="comm",Fs="rule",Os="decl",Ts="@keyframes",Ps=Math.abs,Ls=String.fromCharCode,Rs=Object.assign;function Is(e){return e.trim()}function Bs(e,t){return(e=t.exec(e))?e[0]:e}function Ms(e,t,r){return e.replace(t,r)}function Vs(e,t,r){return e.indexOf(t,r)}function Us(e,t){return 0|e.charCodeAt(t)}function Ks(e,t,r){return e.slice(t,r)}function Hs(e){return e.length}function Ws(e){return e.length}function qs(e,t){return t.push(e),e}function Gs(e,t){return e.filter(function(e){return!Bs(e,t)})}var Ys=1,Js=1,Qs=0,Xs=0,Zs=0,el="";function tl(e,t,r,n,a,i,o,s){return{value:e,root:t,parent:r,type:n,props:a,children:i,line:Ys,column:Js,length:o,return:"",siblings:s}}function rl(e,t){return Rs(tl("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function nl(e){for(;e.root;)e=rl(e.root,{children:[e]});qs(e,e.siblings)}function al(){return Zs=Xs>0?Us(el,--Xs):0,Js--,10===Zs&&(Js=1,Ys--),Zs}function il(){return Zs=Xs<Qs?Us(el,Xs++):0,Js++,10===Zs&&(Js=1,Ys++),Zs}function ol(){return Us(el,Xs)}function sl(){return Xs}function ll(e,t){return Ks(el,e,t)}function dl(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function cl(e){return Ys=Js=1,Qs=Hs(el=e),Xs=0,[]}function ul(e){return el="",e}function pl(e){return Is(ll(Xs-1,hl(91===e?e+2:40===e?e+1:e)))}function ml(e){for(;(Zs=ol())&&Zs<33;)il();return dl(e)>2||dl(Zs)>3?"":" "}function fl(e,t){for(;--t&&il()&&!(Zs<48||Zs>102||Zs>57&&Zs<65||Zs>70&&Zs<97););return ll(e,sl()+(t<6&&32==ol()&&32==il()))}function hl(e){for(;il();)switch(Zs){case e:return Xs;case 34:case 39:34!==e&&39!==e&&hl(Zs);break;case 40:41===e&&hl(e);break;case 92:il()}return Xs}function gl(e,t){for(;il()&&e+Zs!==57&&(e+Zs!==84||47!==ol()););return"/*"+ll(t,Xs-1)+"*"+Ls(47===e?e:il())}function xl(e){for(;!dl(ol());)il();return ll(e,Xs)}function vl(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function bl(e,t,r,n){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case"@namespace":case Os:return e.return=e.return||e.value;case Ds:return"";case Ts:return e.return=e.value+"{"+vl(e.children,n)+"}";case Fs:if(!Hs(e.value=e.props.join(",")))return""}return Hs(r=vl(e.children,n))?e.return=e.value+"{"+r+"}":""}function kl(e,t,r){switch(function(e,t){return 45^Us(e,0)?(((t<<2^Us(e,0))<<2^Us(e,1))<<2^Us(e,2))<<2^Us(e,3):0}(e,t)){case 5103:return As+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return As+e+e;case 4855:return As+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return Cs+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return As+e+Cs+e+zs+e+e;case 5936:switch(Us(e,t+11)){case 114:return As+e+zs+Ms(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return As+e+zs+Ms(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return As+e+zs+Ms(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return As+e+zs+e+e;case 6165:return As+e+zs+"flex-"+e+e;case 5187:return As+e+Ms(e,/(\w+).+(:[^]+)/,As+"box-$1$2"+zs+"flex-$1$2")+e;case 5443:return As+e+zs+"flex-item-"+Ms(e,/flex-|-self/g,"")+(Bs(e,/flex-|baseline/)?"":zs+"grid-row-"+Ms(e,/flex-|-self/g,""))+e;case 4675:return As+e+zs+"flex-line-pack"+Ms(e,/align-content|flex-|-self/g,"")+e;case 5548:return As+e+zs+Ms(e,"shrink","negative")+e;case 5292:return As+e+zs+Ms(e,"basis","preferred-size")+e;case 6060:return As+"box-"+Ms(e,"-grow","")+As+e+zs+Ms(e,"grow","positive")+e;case 4554:return As+Ms(e,/([^-])(transform)/g,"$1"+As+"$2")+e;case 6187:return Ms(Ms(Ms(e,/(zoom-|grab)/,As+"$1"),/(image-set)/,As+"$1"),e,"")+e;case 5495:case 3959:return Ms(e,/(image-set\([^]*)/,As+"$1$`$1");case 4968:return Ms(Ms(e,/(.+:)(flex-)?(.*)/,As+"box-pack:$3"+zs+"flex-pack:$3"),/space-between/,"justify")+As+e+e;case 4200:if(!Bs(e,/flex-|baseline/))return zs+"grid-column-align"+Ks(e,t)+e;break;case 2592:case 3360:return zs+Ms(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(e,r){return t=r,Bs(e.props,/grid-\w+-end/)})?~Vs(e+(r=r[t].value),"span",0)?e:zs+Ms(e,"-start","")+e+zs+"grid-row-span:"+(~Vs(r,"span",0)?Bs(r,/\d+/):+Bs(r,/\d+/)-+Bs(e,/\d+/))+";":zs+Ms(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(e){return Bs(e.props,/grid-\w+-start/)})?e:zs+Ms(Ms(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ms(e,/(.+)-inline(.+)/,As+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Hs(e)-1-t>6)switch(Us(e,t+1)){case 109:if(45!==Us(e,t+4))break;case 102:return Ms(e,/(.+:)(.+)-([^]+)/,"$1"+As+"$2-$3$1"+Cs+(108==Us(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Vs(e,"stretch",0)?kl(Ms(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return Ms(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,r,n,a,i,o,s){return zs+r+":"+n+s+(a?zs+r+"-span:"+(i?o:+o-+n)+s:"")+e});case 4949:if(121===Us(e,t+6))return Ms(e,":",":"+As)+e;break;case 6444:switch(Us(e,45===Us(e,14)?18:11)){case 120:return Ms(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+As+(45===Us(e,14)?"inline-":"")+"box$3$1"+As+"$2$3$1"+zs+"$2box$3")+e;case 100:return Ms(e,":",":"+zs)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ms(e,"scroll-","scroll-snap-")+e}return e}function yl(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Os:return void(e.return=kl(e.value,e.length,r));case Ts:return vl([rl(e,{value:Ms(e.value,"@","@"+As)})],n);case Fs:if(e.length)return function(e,t){return e.map(t).join("")}(r=e.props,function(t){switch(Bs(t,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":nl(rl(e,{props:[Ms(t,/:(read-\w+)/,":-moz-$1")]})),nl(rl(e,{props:[t]})),Rs(e,{props:Gs(r,n)});break;case"::placeholder":nl(rl(e,{props:[Ms(t,/:(plac\w+)/,":"+As+"input-$1")]})),nl(rl(e,{props:[Ms(t,/:(plac\w+)/,":-moz-$1")]})),nl(rl(e,{props:[Ms(t,/:(plac\w+)/,zs+"input-$1")]})),nl(rl(e,{props:[t]})),Rs(e,{props:Gs(r,n)})}return""})}}function jl(e){return ul(wl("",null,null,null,[""],e=cl(e),0,[0],e))}function wl(e,t,r,n,a,i,o,s,l){for(var d=0,c=0,u=o,p=0,m=0,f=0,h=1,g=1,x=1,v=0,b="",k=a,y=i,j=n,w=b;g;)switch(f=v,v=il()){case 40:if(108!=f&&58==Us(w,u-1)){-1!=Vs(w+=Ms(pl(v),"&","&\f"),"&\f",Ps(d?s[d-1]:0))&&(x=-1);break}case 34:case 39:case 91:w+=pl(v);break;case 9:case 10:case 13:case 32:w+=ml(f);break;case 92:w+=fl(sl()-1,7);continue;case 47:switch(ol()){case 42:case 47:qs($l(gl(il(),sl()),t,r,l),l),5!=dl(f||1)&&5!=dl(ol()||1)||!Hs(w)||" "===Ks(w,-1,void 0)||(w+=" ");break;default:w+="/"}break;case 123*h:s[d++]=Hs(w)*x;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+c:-1==x&&(w=Ms(w,/\f/g,"")),m>0&&(Hs(w)-u||0===h&&47===f)&&qs(m>32?Nl(w+";",n,r,u-1,l):Nl(Ms(w," ","")+";",n,r,u-2,l),l);break;case 59:w+=";";default:if(qs(j=Sl(w,t,r,d,c,a,s,b,k=[],y=[],u,i),i),123===v)if(0===c)wl(w,t,j,j,k,i,u,s,y);else{switch(p){case 99:if(110===Us(w,3))break;case 108:if(97===Us(w,2))break;default:c=0;case 100:case 109:case 115:}c?wl(e,j,j,n&&qs(Sl(e,j,j,0,0,a,s,b,a,k=[],u,y),y),a,y,u,s,n?k:y):wl(w,j,j,j,[""],y,0,s,y)}}d=c=m=0,h=x=1,b=w="",u=o;break;case 58:u=1+Hs(w),m=f;default:if(h<1)if(123==v)--h;else if(125==v&&0==h++&&125==al())continue;switch(w+=Ls(v),v*h){case 38:x=c>0?1:(w+="\f",-1);break;case 44:s[d++]=(Hs(w)-1)*x,x=1;break;case 64:45===ol()&&(w+=pl(il())),p=ol(),c=u=Hs(b=w+=xl(sl())),v++;break;case 45:45===f&&2==Hs(w)&&(h=0)}}return i}function Sl(e,t,r,n,a,i,o,s,l,d,c,u){for(var p=a-1,m=0===a?i:[""],f=Ws(m),h=0,g=0,x=0;h<n;++h)for(var v=0,b=Ks(e,p+1,p=Ps(g=o[h])),k=e;v<f;++v)(k=Is(g>0?m[v]+" "+b:Ms(b,/&\f/g,m[v])))&&(l[x++]=k);return tl(e,t,r,0===a?Fs:s,l,d,c,u)}function $l(e,t,r,n){return tl(e,t,r,Ds,Ls(Zs),Ks(e,2,-2),0,n)}function Nl(e,t,r,n,a){return tl(e,t,r,Os,Ks(e,0,n),Ks(e,n+1,-1),n,a)}var El="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",_l="active",zl="data-styled-version",Cl="6.3.12",Al="/*!sc*/\n",Dl="undefined"!=typeof window&&"undefined"!=typeof document,Fl=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),Ol={};function Tl(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Pl=new Map,Ll=new Map,Rl=1,Il=function(e){if(Pl.has(e))return Pl.get(e);for(;Ll.has(Rl);)Rl++;var t=Rl++;return Pl.set(e,t),Ll.set(t,e),t},Bl=function(e,t){Rl=t+1,Pl.set(e,t),Ll.set(t,e)},Ml=(new Set,Object.freeze([])),Vl=Object.freeze({});function Ul(e,t,r){return void 0===r&&(r=Vl),e.theme!==r.theme&&e.theme||t||r.theme}var Kl=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),Hl=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Wl=/(^-|-$)/g;function ql(e){return e.replace(Hl,"-").replace(Wl,"")}var Gl=/(a)(d)/gi,Yl=function(e){return String.fromCharCode(e+(e>25?39:97))};function Jl(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=Yl(t%52)+r;return(Yl(t%52)+r).replace(Gl,"$1-$2")}var Ql,Xl=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Zl=function(e){return Xl(5381,e)};function ed(e){return Jl(Zl(e)>>>0)}function td(e){return e.displayName||e.name||"Component"}function rd(e){return"string"==typeof e&&!0}var nd="function"==typeof Symbol&&Symbol.for,ad=nd?Symbol.for("react.memo"):60115,id=nd?Symbol.for("react.forward_ref"):60112,od={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},sd={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},ld={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},dd=((Ql={})[id]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Ql[ad]=ld,Ql);function cd(e){return("type"in(t=e)&&t.type.$$typeof)===ad?ld:"$$typeof"in e?dd[e.$$typeof]:od;var t}var ud=Object.defineProperty,pd=Object.getOwnPropertyNames,md=Object.getOwnPropertySymbols,fd=Object.getOwnPropertyDescriptor,hd=Object.getPrototypeOf,gd=Object.prototype;function xd(e,t,r){if("string"!=typeof t){if(gd){var n=hd(t);n&&n!==gd&&xd(e,n,r)}var a=pd(t);md&&(a=a.concat(md(t)));for(var i=cd(e),o=cd(t),s=0;s<a.length;++s){var l=a[s];if(!(l in sd||r&&r[l]||o&&l in o||i&&l in i)){var d=fd(t,l);try{ud(e,l,d)}catch(e){}}}}return e}function vd(e){return"function"==typeof e}function bd(e){return"object"==typeof e&&"styledComponentId"in e}function kd(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function yd(e,t){return e.join(t||"")}function jd(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function wd(e,t,r){if(void 0===r&&(r=!1),!r&&!jd(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=wd(e[n],t[n]);else if(jd(t))for(var n in t)e[n]=wd(e[n],t[n]);return e}function Sd(e,t){Object.defineProperty(e,"toString",{value:t})}var $d=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var r=this._cGroup;r<e;r++)t+=this.groupSizes[r];else for(r=this._cGroup-1;r>=e;r--)t-=this.groupSizes[r];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var r=this.groupSizes,n=r.length,a=n;e>=a;)if((a<<=1)<0)throw Tl(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(r),this.length=a;for(var i=n;i<a;i++)this.groupSizes[i]=0}for(var o=this.indexOfGroup(e+1),s=0,l=(i=0,t.length);i<l;i++)this.tag.insertRule(o,t[i])&&(this.groupSizes[e]++,o++,s++);s>0&&this._cGroup>e&&(this._cIndex+=s)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],r=this.indexOfGroup(e),n=r+t;this.groupSizes[e]=0;for(var a=r;a<n;a++)this.tag.deleteRule(r);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var r=this.groupSizes[e],n=this.indexOfGroup(e),a=n+r,i=n;i<a;i++)t+=this.tag.getRule(i)+Al;return t},e}(),Nd="style[".concat(El,"][").concat(zl,'="').concat(Cl,'"]'),Ed=new RegExp("^".concat(El,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),_d=function(e){return"undefined"!=typeof ShadowRoot&&e instanceof ShadowRoot||"host"in e&&11===e.nodeType},zd=function(e){if(!e)return document;if(_d(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(_d(t))return t}return document},Cd=function(e,t,r){for(var n,a=r.split(","),i=0,o=a.length;i<o;i++)(n=a[i])&&e.registerName(t,n)},Ad=function(e,t){for(var r,n=(null!==(r=t.textContent)&&void 0!==r?r:"").split(Al),a=[],i=0,o=n.length;i<o;i++){var s=n[i].trim();if(s){var l=s.match(Ed);if(l){var d=0|parseInt(l[1],10),c=l[2];0!==d&&(Bl(c,d),Cd(e,c,l[3]),e.getTag().insertRules(d,a)),a.length=0}else a.push(s)}}},Dd=function(e){for(var t=zd(e.options.target).querySelectorAll(Nd),r=0,n=t.length;r<n;r++){var a=t[r];a&&a.getAttribute(El)!==_l&&(Ad(e,a),a.parentNode&&a.parentNode.removeChild(a))}};function Fd(){return r.nc}var Od=function(e){var t=document.head,r=e||t,n=document.createElement("style"),a=function(e){var t=Array.from(e.querySelectorAll("style[".concat(El,"]")));return t[t.length-1]}(r),i=void 0!==a?a.nextSibling:null;n.setAttribute(El,_l),n.setAttribute(zl,Cl);var o=Fd();return o&&n.setAttribute("nonce",o),r.insertBefore(n,i),n},Td=function(){function e(e){this.element=Od(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){var t;if(e.sheet)return e.sheet;for(var r=null!==(t=e.getRootNode().styleSheets)&&void 0!==t?t:document.styleSheets,n=0,a=r.length;n<a;n++){var i=r[n];if(i.ownerNode===e)return i}throw Tl(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Pd=function(){function e(e){this.element=Od(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var r=document.createTextNode(t);return this.element.insertBefore(r,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Ld=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Rd=Dl,Id={isServer:!Dl,useCSSOMInjection:!Fl},Bd=function(){function e(e,t,r){void 0===e&&(e=Vl),void 0===t&&(t={});var n=this;this.options=Ns(Ns({},Id),e),this.gs=t,this.names=new Map(r),this.server=!!e.isServer,!this.server&&Dl&&Rd&&(Rd=!1,Dd(this)),Sd(this,function(){return function(e){for(var t=e.getTag(),r=t.length,n="",a=function(r){var a=function(e){return Ll.get(e)}(r);if(void 0===a)return"continue";var i=e.names.get(a);if(void 0===i||!i.size)return"continue";var o=t.getGroup(r);if(0===o.length)return"continue";var s=El+".g"+r+'[id="'+a+'"]',l="";i.forEach(function(e){e.length>0&&(l+=e+",")}),n+=o+s+'{content:"'+l+'"}'+Al},i=0;i<r;i++)a(i);return n}(n)})}return e.registerId=function(e){return Il(e)},e.prototype.rehydrate=function(){!this.server&&Dl&&Dd(this)},e.prototype.reconstructWithOptions=function(t,r){void 0===r&&(r=!0);var n=new e(Ns(Ns({},this.options),t),this.gs,r&&this.names||void 0);return!this.server&&Dl&&t.target!==this.options.target&&zd(this.options.target)!==zd(t.target)&&Dd(n),n},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,r=e.target;return e.isServer?new Ld(r):t?new Td(r):new Pd(r)}(this.options),new $d(e)));var e},e.prototype.hasNameForId=function(e,t){var r,n;return null!==(n=null===(r=this.names.get(e))||void 0===r?void 0:r.has(t))&&void 0!==n&&n},e.prototype.registerName=function(e,t){Il(e);var r=this.names.get(e);r?r.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,r){this.registerName(e,t),this.getTag().insertRules(Il(e),r)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Il(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function Md(e,t){return null==t||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||e in _s||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Vd=function(e){return e>="A"&&e<="Z"};function Ud(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(1===r&&"-"===n&&"-"===e[0])return e;Vd(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Kd=Symbol.for("sc-keyframes");var Hd=function(e){return null==e||!1===e||""===e},Wd=function(e){var t=[];for(var r in e){var n=e[r];e.hasOwnProperty(r)&&!Hd(n)&&(Array.isArray(n)&&n.isCss||vd(n)?t.push("".concat(Ud(r),":"),n,";"):jd(n)?t.push.apply(t,Es(Es(["".concat(r," {")],Wd(n),!1),["}"],!1)):t.push("".concat(Ud(r),": ").concat(Md(r,n),";")))}return t};function qd(e,t,r,n,a){if(void 0===a&&(a=[]),"string"==typeof e)return e&&a.push(e),a;if(Hd(e))return a;if(bd(e))return a.push(".".concat(e.styledComponentId)),a;var i;if(vd(e))return!vd(i=e)||i.prototype&&i.prototype.isReactComponent||!t?(a.push(e),a):qd(e(t),t,r,n,a);if(function(e){return"object"==typeof e&&null!==e&&Kd in e}(e))return r?(e.inject(r,n),a.push(e.getName(n))):a.push(e),a;if(jd(e)){for(var o=Wd(e),s=0;s<o.length;s++)a.push(o[s]);return a}if(!Array.isArray(e))return a.push(e.toString()),a;for(s=0;s<e.length;s++)qd(e[s],t,r,n,a);return a}function Gd(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(vd(r)&&!bd(r))return!1}return!0}var Yd=Zl(Cl),Jd=function(){function e(e,t,r){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===r||r.isStatic)&&Gd(e),this.componentId=t,this.baseHash=Xl(Yd,t),this.baseStyle=r,Bd.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,r){var n=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,r).className:"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))n=kd(n,this.staticRulesId);else{var a=yd(qd(this.rules,e,t,r)),i=Jl(Xl(this.baseHash,a)>>>0);if(!t.hasNameForId(this.componentId,i)){var o=r(a,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,o)}n=kd(n,i),this.staticRulesId=i}else{for(var s=Xl(this.baseHash,r.hash),l="",d=0;d<this.rules.length;d++){var c=this.rules[d];if("string"==typeof c)l+=c;else if(c){var u=yd(qd(c,e,t,r));s=Xl(Xl(s,String(d)),u),l+=u}}if(l){var p=Jl(s>>>0);if(!t.hasNameForId(this.componentId,p)){var m=r(l,".".concat(p),void 0,this.componentId);t.insertRules(this.componentId,p,m)}n=kd(n,p)}}return{className:n,css:"undefined"==typeof window?t.getTag().getGroup(Il(this.componentId)):""}},e}(),Qd=/&/g,Xd=47,Zd=42;function ec(e){if(-1===e.indexOf("}"))return!1;for(var t=e.length,r=0,n=0,a=!1,i=0;i<t;i++){var o=e.charCodeAt(i);if(0!==n||a||o!==Xd||e.charCodeAt(i+1)!==Zd)if(a)o===Zd&&e.charCodeAt(i+1)===Xd&&(a=!1,i++);else if(34!==o&&39!==o||0!==i&&92===e.charCodeAt(i-1)){if(0===n)if(123===o)r++;else if(125===o&&--r<0)return!0}else 0===n?n=o:n===o&&(n=0);else a=!0,i++}return 0!==r||0!==n}function tc(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=tc(e.children,t)),e})}function rc(e){var t,r,n,a=void 0===e?Vl:e,i=a.options,o=void 0===i?Vl:i,s=a.plugins,l=void 0===s?Ml:s,d=function(e,n,a){return a.startsWith(r)&&a.endsWith(r)&&a.replaceAll(r,"").length>0?".".concat(t):e},c=l.slice();c.push(function(e){e.type===Fs&&e.value.includes("&")&&(n||(n=new RegExp("\\".concat(r,"\\b"),"g")),e.props[0]=e.props[0].replace(Qd,r).replace(n,d))}),o.prefix&&c.push(yl),c.push(bl);var u,p=[],m=function(e){var t=Ws(e);return function(r,n,a,i){for(var o="",s=0;s<t;s++)o+=e[s](r,n,a,i)||"";return o}}(c.concat((u=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&u(e)}))),f=function(e,a,i,s){void 0===a&&(a=""),void 0===i&&(i=""),void 0===s&&(s="&"),t=s,r=a,n=void 0;var l=function(e){if(!ec(e))return e;for(var t=e.length,r="",n=0,a=0,i=0,o=!1,s=0;s<t;s++){var l=e.charCodeAt(s);if(0!==i||o||l!==Xd||e.charCodeAt(s+1)!==Zd)if(o)l===Zd&&e.charCodeAt(s+1)===Xd&&(o=!1,s++);else if(34!==l&&39!==l||0!==s&&92===e.charCodeAt(s-1)){if(0===i)if(123===l)a++;else if(125===l){if(--a<0){for(var d=s+1;d<t;){var c=e.charCodeAt(d);if(59===c||10===c)break;d++}d<t&&59===e.charCodeAt(d)&&d++,a=0,s=d-1,n=d;continue}0===a&&(r+=e.substring(n,s+1),n=s+1)}else 59===l&&0===a&&(r+=e.substring(n,s+1),n=s+1)}else 0===i?i=l:i===l&&(i=0);else o=!0,s++}if(n<t){var u=e.substring(n);ec(u)||(r+=u)}return r}(function(e){if(-1===e.indexOf("//"))return e;for(var t=e.length,r=[],n=0,a=0,i=0,o=0;a<t;){var s=e.charCodeAt(a);if(34!==s&&39!==s||0!==a&&92===e.charCodeAt(a-1))if(0===i)if(s===Xd&&a+1<t&&e.charCodeAt(a+1)===Zd){for(a+=2;a+1<t&&(e.charCodeAt(a)!==Zd||e.charCodeAt(a+1)!==Xd);)a++;a+=2}else if(40===s&&a>=3&&108==(32|e.charCodeAt(a-1))&&114==(32|e.charCodeAt(a-2))&&117==(32|e.charCodeAt(a-3)))o=1,a++;else if(o>0)41===s?o--:40===s&&o++,a++;else if(s===Zd&&a+1<t&&e.charCodeAt(a+1)===Xd)a>n&&r.push(e.substring(n,a)),n=a+=2;else if(s===Xd&&a+1<t&&e.charCodeAt(a+1)===Xd){for(a>n&&r.push(e.substring(n,a));a<t&&10!==e.charCodeAt(a);)a++;n=a}else a++;else a++;else 0===i?i=s:i===s&&(i=0),a++}return 0===n?e:(n<t&&r.push(e.substring(n)),r.join(""))}(e)),d=jl(i||a?"".concat(i," ").concat(a," { ").concat(l," }"):l);return o.namespace&&(d=tc(d,o.namespace)),p=[],vl(d,m),p};return f.hash=l.length?l.reduce(function(e,t){return t.name||Tl(15),Xl(e,t.name)},5381).toString():"",f}var nc=new Bd,ac=rc(),ic=n.createContext({shouldForwardProp:void 0,styleSheet:nc,stylis:ac}),oc=(ic.Consumer,n.createContext(void 0));function sc(){return n.useContext(ic)}function lc(e){if(!n.useMemo)return e.children;var t=sc().styleSheet,r=n.useMemo(function(){var r=t;return e.sheet?r=e.sheet:e.target&&(r=r.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(r=r.reconstructWithOptions({useCSSOMInjection:!1})),r},[e.disableCSSOMInjection,e.sheet,e.target,t]),a=n.useMemo(function(){return rc({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),i=n.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:r,stylis:a}},[e.shouldForwardProp,r,a]);return n.createElement(ic.Provider,{value:i},n.createElement(oc.Provider,{value:a},e.children))}var dc=n.createContext(void 0);dc.Consumer;function cc(e){var t=n.useContext(dc),r=n.useMemo(function(){return function(e,t){if(!e)throw Tl(14);if(vd(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw Tl(8);return t?Ns(Ns({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?n.createElement(dc.Provider,{value:r},e.children):null}var uc={};new Set;function pc(e,t,r){var a=bd(e),i=e,o=!rd(e),s=t.attrs,l=void 0===s?Ml:s,d=t.componentId,c=void 0===d?function(e,t){var r="string"!=typeof e?"sc":ql(e);uc[r]=(uc[r]||0)+1;var n="".concat(r,"-").concat(ed(Cl+r+uc[r]));return t?"".concat(t,"-").concat(n):n}(t.displayName,t.parentComponentId):d,u=t.displayName,p=void 0===u?function(e){return rd(e)?"styled.".concat(e):"Styled(".concat(td(e),")")}(e):u,m=t.displayName&&t.componentId?"".concat(ql(t.displayName),"-").concat(t.componentId):t.componentId||c,f=a&&i.attrs?i.attrs.concat(l).filter(Boolean):l,h=t.shouldForwardProp;if(a&&i.shouldForwardProp){var g=i.shouldForwardProp;if(t.shouldForwardProp){var x=t.shouldForwardProp;h=function(e,t){return g(e,t)&&x(e,t)}}else h=g}var v=new Jd(r,m,a?i.componentStyle:void 0);function b(e,t){return function(e,t,r){var a=e.attrs,i=e.componentStyle,o=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,d=e.target,c=n.useContext(dc),u=sc(),p=e.shouldForwardProp||u.shouldForwardProp,m=Ul(t,c,o)||Vl,f=function(e,t,r){for(var n,a=Ns(Ns({},t),{className:void 0,theme:r}),i=0;i<e.length;i+=1){var o=vd(n=e[i])?n(a):n;for(var s in o)"className"===s?a.className=kd(a.className,o[s]):"style"===s?a.style=Ns(Ns({},a.style),o[s]):s in t&&void 0===t[s]||(a[s]=o[s])}return"className"in t&&"string"==typeof t.className&&(a.className=kd(a.className,t.className)),a}(a,t,m),h=f.as||d,g={};for(var x in f)void 0===f[x]||"$"===x[0]||"as"===x||"theme"===x&&f.theme===m||("forwardedAs"===x?g.as=f.forwardedAs:p&&!p(x,h)||(g[x]=f[x]));var v=function(e,t){var r=sc();return e.generateAndInjectStyles(t,r.styleSheet,r.stylis)}(i,f),b=v.className,k=kd(s,l);return b&&(k+=" "+b),f.className&&(k+=" "+f.className),g[rd(h)&&!Kl.has(h)?"class":"className"]=k,r&&(g.ref=r),(0,n.createElement)(h,g)}(k,e,t)}b.displayName=p;var k=n.forwardRef(b);return k.attrs=f,k.componentStyle=v,k.displayName=p,k.shouldForwardProp=h,k.foldedComponentIds=a?kd(i.foldedComponentIds,i.styledComponentId):"",k.styledComponentId=m,k.target=a?i.target:e,Object.defineProperty(k,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];for(var n=0,a=t;n<a.length;n++)wd(e,a[n],!0);return e}({},i.defaultProps,e):e}}),Sd(k,function(){return".".concat(k.styledComponentId)}),o&&xd(k,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),k}function mc(e,t){for(var r=[e[0]],n=0,a=t.length;n<a;n+=1)r.push(t[n],e[n+1]);return r}var fc=function(e){return Object.assign(e,{isCss:!0})};function hc(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(vd(e)||jd(e))return fc(qd(mc(Ml,Es([e],t,!0))));var n=e;return 0===t.length&&1===n.length&&"string"==typeof n[0]?qd(n):fc(qd(mc(n,t)))}function gc(e,t,r){if(void 0===r&&(r=Vl),!t)throw Tl(1,t);var n=function(n){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,r,hc.apply(void 0,Es([n],a,!1)))};return n.attrs=function(n){return gc(e,t,Ns(Ns({},r),{attrs:Array.prototype.concat(r.attrs,n).filter(Boolean)}))},n.withConfig=function(n){return gc(e,t,Ns(Ns({},r),n))},n}var xc=function(e){return gc(pc,e)},vc=xc;Kl.forEach(function(e){vc[e]=xc(e)});var bc,kc=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Gd(e),Bd.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,r,n){var a=n(yd(qd(this.rules,t,r,n)),""),i=this.componentId+e;r.insertRules(i,i,a)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,r,n){e>2&&Bd.registerId(this.componentId+e);var a=this.componentId+e;this.isStatic?r.hasNameForId(a,a)||this.createStyles(e,t,r,n):(this.removeStyles(e,r),this.createStyles(e,t,r,n))},e}();var yc=function(){function e(e,t){var r=this;this[bc]=!0,this.inject=function(e,t){void 0===t&&(t=ac);var n=r.name+t.hash;e.hasNameForId(r.id,n)||e.insertRules(r.id,n,t(r.rules,n,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Sd(this,function(){throw Tl(12,String(r.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=ac),this.name+e.hash},e}();function jc(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=yd(hc.apply(void 0,Es([e],t,!1))),a=ed(n);return new yc(a,n)}bc=Kd;(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var r=Fd(),n=yd([r&&'nonce="'.concat(r,'"'),"".concat(El,'="true"'),"".concat(zl,'="').concat(Cl,'"')].filter(Boolean)," ");return"<style ".concat(n,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Tl(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Tl(2);var r=e.instance.toString();if(!r)return[];var a=((t={})[El]="",t[zl]=Cl,t.dangerouslySetInnerHTML={__html:r},t),i=Fd();return i&&(a.nonce=i),[n.createElement("style",Ns({},a,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Bd({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Tl(2);return n.createElement(lc,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Tl(3)}})(),"__sc-".concat(El,"__");const wc={color:{bg:"#F1F6F3",surface:"#FFFFFF",surfaceAlt:"#E5EFEA",surfaceSunken:"#D8E6E0",ink:"#0E1A17",inkSoft:"#1F2E2A",muted:"#3F4B47",mutedSoft:"#5C6E68",border:"#D5E2DC",borderStrong:"#BACBC2",brand:"#1B7A6E",brandLight:"#4FBFB3",brandSoft:"#DCEEEA",brandInk:"#0E4F47",brandGradient:"linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)",brandGradientHover:"linear-gradient(135deg, #4FC9BD 0%, #155F58 100%)",accent:"#4FBFB3",accentSoft:"#E0F1ED",success:"#1B7A6E",successSoft:"#DCEEEA",danger:"#9F3B22",dangerSoft:"#F4DAD0",warning:"#A8761A",warningSoft:"#F3E5C7"},dossier:{bg:"#050B09",bgRaised:"#0B1612",surface:"#EDF3F0",card:"#FFFFFF",teal:"#2BC4AC",tealBright:"#5DD6CA",tealDeep:"#178A7B",signal:"#E0A23C",inkOnDark:"#F4F9F7",mutedOnDark:"rgba(236,244,241,0.80)",faintOnDark:"rgba(228,238,234,0.62)",hairlineOnDark:"rgba(255,255,255,0.12)",metallicText:"linear-gradient(180deg, #FFFFFF 24%, #D9EFEA 58%, #9FD9CE 100%)",numberGradient:"linear-gradient(135deg, #7BEADB 0%, #2BC4AC 52%, #179580 100%)",keyline:"linear-gradient(90deg, transparent 0%, #2BC4AC 35%, #5DD6CA 50%, #2BC4AC 65%, transparent 100%)",aurora:"radial-gradient(ellipse 680px 400px at 50% 42%, rgba(43,196,172,0.15) 0%, transparent 62%),\n      radial-gradient(ellipse 520px 300px at 30% 96%, rgba(27,110,102,0.14) 0%, transparent 70%),\n      radial-gradient(ellipse 440px 260px at 72% 4%, rgba(93,214,202,0.06) 0%, transparent 70%)",glow:"0 0 0 4px rgba(93,214,202,0.18), 0 0 18px rgba(93,214,202,0.55)",ctaShadow:"0 18px 56px rgba(29,176,154,0.38), inset 0 1px 0 rgba(255,255,255,0.22)",ctaGradient:"linear-gradient(140deg, #4ECDC4 0%, #1DB09A 52%, #178A7B 100%)",column:"580px"},font:{display:"'Playfair Display', Georgia, 'Times New Roman', serif",sans:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",mono:"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"},size:{radius:{sm:"6px",md:"12px",lg:"20px",xl:"28px",pill:"999px"},space:{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px",9:"96px",10:"128px"},container:"1180px",containerNarrow:"960px"},shadow:{xs:"0 1px 2px rgba(14, 26, 23, 0.04)",sm:"0 2px 8px rgba(14, 26, 23, 0.06)",md:"0 8px 24px rgba(14, 26, 23, 0.08)",lg:"0 24px 60px rgba(14, 26, 23, 0.12)",brand:"0 12px 32px rgba(27, 122, 110, 0.28)",inset:"inset 0 1px 0 rgba(255, 255, 255, 0.6)"},motion:{fast:"160ms cubic-bezier(0.2, 0, 0, 1)",base:"240ms cubic-bezier(0.2, 0, 0, 1)",slow:"420ms cubic-bezier(0.2, 0, 0, 1)",spring:"520ms cubic-bezier(0.34, 1.56, 0.64, 1)"},z:{base:1,nav:50,overlay:80,modal:100}},Sc=(function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var a=hc.apply(void 0,Es([e],t,!1)),i="sc-global-".concat(ed(JSON.stringify(a))),o=new kc(a,i),s=new WeakMap,l=function(e){var t=sc(),r=n.useContext(dc),a=s.get(t.styleSheet);return void 0===a&&(a=t.styleSheet.allocateGSInstance(i),s.set(t.styleSheet,a)),n.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,r,n,a){if(o.isStatic)o.renderStyles(e,Ol,r,a);else{var i=Ns(Ns({},t),{theme:Ul(t,n,l.defaultProps)});o.renderStyles(e,i,r,a)}}(a,e,t.styleSheet,r,t.stylis),function(){o.removeStyles(a,t.styleSheet)}},[a,e,t.styleSheet,r,t.stylis]),null};return n.memo(l)})`
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
`;var $c=r(579);const Nc=(0,n.createContext)(null),Ec="arvo_user_email",_c="arvo_session",zc=(()=>{try{var e;return null!==(e=new URLSearchParams(window.location.search).get("magic"))&&void 0!==e?e:null}catch{return null}})();function Cc(e){let{children:t}=e;const[r,a]=(0,n.useState)(()=>{try{return localStorage.getItem(Ec)||null}catch{return null}}),[i,o]=(0,n.useState)(()=>{try{return localStorage.getItem(_c)||null}catch{return null}}),[s,l]=(0,n.useState)("idle");(0,n.useEffect)(()=>{const e=zc;e&&(l("validating"),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})}).then(e=>{if(!e.ok)throw new Error(`HTTP ${e.status}`);return e.json()}).then(e=>{if(e.email){try{localStorage.setItem(Ec,e.email)}catch{}if(a(e.email),e.session){try{localStorage.setItem(_c,e.session)}catch{}o(e.session)}l("ok")}else l("error")}).catch(e=>{console.error("[auth] validate-magic misslyckades:",e.message),l("error")}))},[]);const d=(0,n.useCallback)((e,t)=>{try{localStorage.setItem(Ec,e)}catch{}if(a(e),t){try{localStorage.setItem(_c,t)}catch{}o(t)}},[]),c=(0,n.useCallback)(()=>{try{localStorage.removeItem(Ec),localStorage.removeItem(_c)}catch{}a(null),o(null)},[]);return(0,$c.jsx)(Nc.Provider,{value:{email:r,sessionToken:i,login:d,logout:c,magicState:s},children:t})}function Ac(){return(0,n.useContext)(Nc)}const Dc=vc.span`
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
`,Pc=e=>{let{showName:t=!0,showSuffix:r=!0,size:n}=e;return(0,$c.jsxs)(Dc,{children:[(0,$c.jsxs)(Fc,{$size:n,viewBox:"0 0 40 40",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[(0,$c.jsx)("defs",{children:(0,$c.jsxs)("linearGradient",{id:"arvoMarkGradient",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,$c.jsx)("stop",{offset:"0%",stopColor:"#5DD6CA"}),(0,$c.jsx)("stop",{offset:"100%",stopColor:"#1B6E66"})]})}),(0,$c.jsx)("path",{fill:"url(#arvoMarkGradient)",fillRule:"evenodd",d:"M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"})]}),t&&(0,$c.jsxs)(Oc,{children:["Arvo ",r&&(0,$c.jsx)(Tc,{children:"Flow"})]})]})},Lc={primary:hc`
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
  color: ${e=>{let{theme:t,$active:r}=e;return r?t.color.ink:t.color.muted}};
  font-weight: ${e=>{let{$active:t}=e;return t?600:500}};
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}}, color ${e=>{let{theme:t}=e;return t.motion.fast}};
  background: ${e=>{let{theme:t,$active:r}=e;return r?t.color.surfaceAlt:"transparent"}};
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
  color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.inkSoft)&&void 0!==t?t:r.color.ink}};
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 6px;
`,Zc=vc.div`
  margin-bottom: 16px;
`,eu=vc.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid ${e=>{let{theme:t,$error:r}=e;return r?"#D94F3C":t.color.border}};
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
`,ru=vc.div`
  text-align: center;
  padding: 12px 0 4px;
`,nu=vc.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
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
  background: ${e=>{let{$error:t,theme:r}=e;return t?"#D94F3C":"linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%)"}};
  pointer-events: none;
`,du={company:"",name:"",email:""},cu={email:""},uu=e=>{let{variant:t="public"}=e;const{pathname:r}=lo(),{email:a,logout:i,magicState:o}=Ac(),[s,l]=(0,n.useState)(!1);(0,n.useEffect)(()=>{if("ok"===o||"error"===o){l(!0);const e=setTimeout(()=>l(!1),4e3);return()=>clearTimeout(e)}},[o]);const[d,c]=(0,n.useState)(!1),[u,p]=(0,n.useState)(!1),[m,f]=(0,n.useState)(cu),[h,g]=(0,n.useState)("idle"),[x,v]=(0,n.useState)(du),[b,k]=(0,n.useState)({}),[y,j]=(0,n.useState)("idle"),w=(0,n.useRef)(null);(0,n.useEffect)(()=>{d&&w.current&&w.current.focus()},[d]),(0,n.useEffect)(()=>{if(!d)return;const e=e=>{"Escape"===e.key&&S()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[d]);const S=()=>c(!1),$=(e,t)=>{const r=document.getElementById(t);r&&(e.preventDefault(),r.scrollIntoView({behavior:"smooth"}))};return(0,$c.jsxs)($c.Fragment,{children:[s&&(0,$c.jsx)(lu,{$error:"error"===o,children:"ok"===o?`\u2713 Inloggad som ${a}`:"\u2715 L\xe4nken fungerade inte \u2014 beg\xe4r en ny"}),(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Mc,{children:(0,$c.jsxs)(Vc,{children:[(0,$c.jsx)(vs,{to:"/",children:(0,$c.jsx)(Pc,{})}),"public"===t&&(0,$c.jsxs)(Uc,{children:[(0,$c.jsx)(Kc,{to:"/",$active:"/"===r,children:"Hem"}),(0,$c.jsx)(Kc,{to:"/intelligence",$active:"/intelligence"===r,children:"Arvo Intelligence"}),(0,$c.jsx)(Kc,{to:"/#hur",$active:!1,onClick:e=>$(e,"hur"),children:"S\xe5 fungerar det"}),(0,$c.jsx)(Kc,{to:"/#priser",$active:!1,onClick:e=>$(e,"priser"),children:"Pris"}),(0,$c.jsx)(Kc,{to:"/#faq",$active:!1,onClick:e=>$(e,"faq"),children:"FAQ"})]}),"app"===t&&(0,$c.jsxs)(Uc,{children:[(0,$c.jsx)(Kc,{to:"/insights",$active:"/insights"===r,children:"Insikter"}),(0,$c.jsx)(Kc,{to:"/insights",$active:!1,children:"Historik"}),(0,$c.jsx)(Kc,{to:"/insights",$active:!1,children:"Inst\xe4llningar"})]}),(0,$c.jsxs)(Hc,{children:[a?(0,$c.jsxs)(ou,{children:[(0,$c.jsx)(su,{children:a[0].toUpperCase()}),(0,$c.jsx)(Bc,{$variant:"ghost",$size:"sm",onClick:i,children:"Logga ut"})]}):(0,$c.jsx)(Bc,{$variant:"ghost",$size:"sm",onClick:()=>{f(cu),g("idle"),p(!0)},children:"Logga in"}),"public"===t&&(0,$c.jsx)(Bc,{as:vs,to:"/testa-faktura",$variant:"gradient",$size:"sm",children:(0,$c.jsxs)(Wc,{children:[(0,$c.jsx)("span",{className:"full",children:"Se mina besparingar \u2192"}),(0,$c.jsx)("span",{className:"short",children:"Se besparingar \u2192"})]})})]})]})}),u&&(0,$c.jsx)(qc,{onClick:e=>{e.target===e.currentTarget&&p(!1)},children:(0,$c.jsxs)(Gc,{role:"dialog","aria-modal":"true","aria-labelledby":"auth-modal-title",children:[(0,$c.jsx)(Yc,{onClick:()=>p(!1),"aria-label":"St\xe4ng",children:"\u2715"}),"sent"===h?(0,$c.jsxs)(ru,{children:[(0,$c.jsx)(nu,{children:"\u2709"}),(0,$c.jsx)(au,{children:"Kolla inkorgen."}),(0,$c.jsxs)(iu,{children:["Vi har skickat en inloggningsl\xe4nk till ",m.email,".",(0,$c.jsx)("br",{}),"Klicka p\xe5 l\xe4nken i mejlet \u2014 det tar 10 sekunder."]})]}):(0,$c.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=m.email.trim();if(t&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){g("submitting");try{await fetch("/api/auth/request-magic-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}),g("sent")}catch{g("error")}}},noValidate:!0,children:[(0,$c.jsx)(Jc,{id:"auth-modal-title",children:"Logga in p\xe5 Arvo Flow"}),(0,$c.jsx)(Qc,{children:"Ange din e-post \u2014 vi skickar en inloggningsl\xe4nk direkt. Inget l\xf6senord."}),(0,$c.jsxs)(Zc,{children:[(0,$c.jsx)(Xc,{htmlFor:"auth-email",children:"E-postadress"}),(0,$c.jsx)(eu,{id:"auth-email",type:"email",placeholder:"anna@acme.se",value:m.email,onChange:e=>f({email:e.target.value}),autoComplete:"email",autoFocus:!0})]}),"error"===h&&(0,$c.jsx)(tu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===h,children:"submitting"===h?"Skickar\u2026":"Skicka inloggningsl\xe4nk \u2192"})]})]})}),d&&(0,$c.jsx)(qc,{onClick:e=>{e.target===e.currentTarget&&S()},children:(0,$c.jsxs)(Gc,{role:"dialog","aria-modal":"true","aria-labelledby":"early-access-title",children:[(0,$c.jsx)(Yc,{onClick:S,"aria-label":"St\xe4ng",children:"\u2715"}),"success"===y?(0,$c.jsxs)(ru,{children:[(0,$c.jsx)(nu,{children:"\u2713"}),(0,$c.jsx)(au,{children:"Er plats \xe4r reserverad."}),(0,$c.jsx)(iu,{children:"En av grundarna h\xf6r av sig inom 48 timmar f\xf6r att boka er onboarding. Kolla inkorgen \u2014 mejlet \xe4r p\xe5 v\xe4g."})]}):(0,$c.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=(()=>{const e={};return x.company.trim()||(e.company="Fyll i f\xf6retagsnamn."),x.name.trim()||(e.name="Fyll i ditt namn."),x.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email.trim())||(e.email="E-postadressen ser inte r\xe4tt ut."):e.email="E-post saknas.",e})();if(k(t),!(Object.keys(t).length>0)){j("submitting");try{const e=await fetch("/api/founding-member",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company:x.company.trim(),name:x.name.trim(),email:x.email.trim(),referrer:"undefined"!==typeof document&&document.referrer||null,timestamp:(new Date).toISOString()})});if(!e.ok)throw new Error("API "+e.status);j("success")}catch{j("error")}}},noValidate:!0,children:[(0,$c.jsx)(Jc,{id:"early-access-title",children:"Bli Founding Member"}),(0,$c.jsx)(Qc,{children:"Reservera er plats och f\xe5 personlig onboarding, 6 m\xe5nader gratis och f\xf6rtur till Fortnox / Visma-kopplingen n\xe4r den \xf6ppnar."}),(0,$c.jsxs)(Zc,{children:[(0,$c.jsx)(Xc,{htmlFor:"ea-company",children:"F\xf6retag"}),(0,$c.jsx)(eu,{id:"ea-company",ref:w,type:"text",placeholder:"Acme AB",value:x.company,onChange:e=>v(t=>({...t,company:e.target.value})),$error:!!b.company,autoComplete:"organization"}),b.company&&(0,$c.jsx)(tu,{children:b.company})]}),(0,$c.jsxs)(Zc,{children:[(0,$c.jsx)(Xc,{htmlFor:"ea-name",children:"Ditt namn"}),(0,$c.jsx)(eu,{id:"ea-name",type:"text",placeholder:"Anna Andersson",value:x.name,onChange:e=>v(t=>({...t,name:e.target.value})),$error:!!b.name,autoComplete:"name"}),b.name&&(0,$c.jsx)(tu,{children:b.name})]}),(0,$c.jsxs)(Zc,{children:[(0,$c.jsx)(Xc,{htmlFor:"ea-email",children:"E-post"}),(0,$c.jsx)(eu,{id:"ea-email",type:"email",placeholder:"anna@acme.se",value:x.email,onChange:e=>v(t=>({...t,email:e.target.value})),$error:!!b.email,autoComplete:"email"}),b.email&&(0,$c.jsx)(tu,{children:b.email})]}),"error"===y&&(0,$c.jsx)(tu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen om en stund."}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===y,children:"submitting"===y?"Skickar\u2026":"Reservera min plats \u2192"})]})]})})]})]})},pu=vc.footer`
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
`,vu=()=>(0,$c.jsxs)(pu,{children:[(0,$c.jsxs)(mu,{children:[(0,$c.jsxs)(fu,{children:[(0,$c.jsx)(Pc,{}),(0,$c.jsx)("p",{children:"Er proaktiva finansdirekt\xf6r f\xf6r leverant\xf6rskostnader. Bevakning p\xe5 prenumeration \u2014 bytet f\xf6rberett n\xe4r ni vill, signerat av er."})]}),(0,$c.jsxs)(hu,{children:[(0,$c.jsx)("h4",{children:"Produkt"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:(0,$c.jsx)("a",{href:"/#hur",children:"S\xe5 fungerar det"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)("a",{href:"/#priser",children:"Pris"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/connect",children:"Integrationer"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/integritet",children:"S\xe4kerhet"})})]})]}),(0,$c.jsxs)(hu,{children:[(0,$c.jsx)("h4",{children:"F\xf6retag"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/",children:"Om oss"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)("a",{href:"mailto:hej@arvoflow.se",children:"Kontakt"})})]})]}),(0,$c.jsxs)(hu,{children:[(0,$c.jsx)("h4",{children:"Juridik"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/villkor",children:"Villkor"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/integritet",children:"Integritet (GDPR)"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/cookies",children:"Cookies"})}),(0,$c.jsx)("li",{children:(0,$c.jsx)(vs,{to:"/bias",children:"Rankningspolicy"})})]})]})]}),(0,$c.jsxs)(gu,{children:[(0,$c.jsxs)("span",{children:[(0,$c.jsx)("div",{className:"dot"})," Varje underbitr\xe4de ",(0,$c.jsx)("strong",{children:"namngivet"})," \u2014 EU/EES + USA under SCC"]}),(0,$c.jsxs)("span",{children:[(0,$c.jsx)("div",{className:"dot"})," Krypterad i vila och i transport"]})]}),(0,$c.jsxs)(xu,{children:[(0,$c.jsx)("span",{children:"\xa9 2026 Arvo Flow \xb7 verksamhet under bildande"}),(0,$c.jsx)("span",{children:"Stockholm \xb7 Made with care in Sweden"})]})]}),bu=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e)+" kr",ku=e=>null!=e?new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e):"\u2013",yu=["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];function ju(e){if(!e)return null;const[t,r]=e.split("-");return`${yu[parseInt(r,10)-1]} ${t}`}const wu={microsoft365:"Microsoft 365",google:"Google Workspace",zoho:"Zoho Mail",other:"Anpassad e-postl\xf6sning"};function Su(e){const t=String(e||"").replace(/\D/g,"");return 10===t.length?`${t.slice(0,6)}-${t.slice(6)}`:String(e||"")}function $u(e,t,r){return 1===Number(e)?t:r}const Nu="arvo_dorr_sess";const Eu=new Set;function _u(e){let{fynd:t=null,engang:r=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};try{if(r){if(Eu.has(e))return;Eu.add(e)}const n=function(){try{let e=sessionStorage.getItem(Nu);return e||(e=(Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)).slice(0,24),sessionStorage.setItem(Nu,e)),e}catch{return null}}();if(!n)return;const a=JSON.stringify({handelse:e,sess:n,bredd:"undefined"!==typeof window?window.innerWidth:null,..."number"===typeof t&&Number.isFinite(t)?{fynd:t}:{}});if(navigator.sendBeacon)return void navigator.sendBeacon("/api/dorr-handelse",new Blob([a],{type:"application/json"}));fetch("/api/dorr-handelse",{method:"POST",headers:{"Content-Type":"application/json"},body:a,keepalive:!0}).catch(()=>{})}catch{}}var zu;const Cu=vc.section`
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
`,Au=vc.form`
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
`,Du=vc.div`
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
`,Fu=vc.div`
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
`,Ou=[["Ert bokslut 2025: 52,9 mkr i oms\xe4ttning, 30 anst\xe4llda","K\xe4lla: offentliga \xe5rsredovisningsuppgifter (Bolagsverket)"],["Ni k\xf6r Microsoft 365 \u2014 bekr\xe4ftat p\xe5 flera oberoende sp\xe5r","K\xe4lla: er publika e-postupps\xe4ttning"]],Tu="faktura@inbox.arvoflow.se";function Pu(){const[e,t]=(0,n.useState)(!1);return(0,$c.jsxs)(Du,{children:[(0,$c.jsx)("div",{className:"br-k",children:"N\xe4sta steg \xb7 ert eget rum"}),(0,$c.jsxs)("div",{className:"br-h",children:["Vidarebefordra en faktura. Eller femtio.",(0,$c.jsx)("em",{children:"Sedan har ni ett eget rum hos Arvo."})]}),(0,$c.jsxs)("p",{className:"br-p",children:["Arvo l\xe4ser varje faktura, v\xe4ger priset mot verifierat marknadspris och l\xe4gger resultatet i ert rum. L\xe4nken dit kommer i svaret p\xe5 ert mejl \u2014 den \xe4r personlig."," ",(0,$c.jsx)("b",{children:"Upp till hundra fakturor i samma mejl"}),"; vi tar dem en och en."]}),(0,$c.jsxs)("div",{className:"br-adr",children:[(0,$c.jsxs)("span",{className:"br-mail",children:[(0,$c.jsxs)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8","aria-hidden":"true",children:[(0,$c.jsx)("rect",{x:"2.5",y:"5",width:"19",height:"14",rx:"2.5"}),(0,$c.jsx)("path",{d:"m3 7 9 6 9-6"})]}),Tu]}),(0,$c.jsx)("button",{type:"button",onClick:async()=>{try{await navigator.clipboard.writeText(Tu)}catch{}_u("adress_kopierad"),t(!0),setTimeout(()=>t(!1),2200)},"aria-live":"polite",children:e?"Kopierad \u2713":"Kopiera adressen"})]}),(0,$c.jsxs)("p",{className:"br-avtal",children:[(0,$c.jsx)("b",{children:"Avtalen sl\xe4pper ni i rummet."})," D\xe4r l\xe4ser vi bindningstiden ord f\xf6r ord, med citat som bevis, och s\xe4tter klockan p\xe5 sista upps\xe4gningsdag."]}),(0,$c.jsxs)("p",{className:"br-alt",children:["Sitter ni vid datorn med fakturan framme?"," ",(0,$c.jsx)(vs,{to:"/testa-faktura",onClick:()=>_u("faktura_lank"),children:"Testa med en faktura \u2192"})]})]})}function Lu(){return(0,$c.jsxs)(Fu,{children:[(0,$c.jsx)("div",{className:"tz-eyebrow",children:"F\xf6rhandsvisning \xb7 ert underlag"}),Ou.map((e,t)=>{let[r,n]=e;return(0,$c.jsxs)("div",{className:"tz-find","aria-hidden":"true",children:[(0,$c.jsx)("div",{className:"tz-title blur",children:r}),(0,$c.jsx)("div",{className:"tz-src blur",children:n})]},t)}),(0,$c.jsxs)("div",{className:"tz-lock",children:[(0,$c.jsxs)("svg",{className:"tz-ico",width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[(0,$c.jsx)("rect",{x:"4",y:"11",width:"16",height:"9",rx:"2"}),(0,$c.jsx)("path",{d:"M8 11V7a4 4 0 0 1 8 0v4"})]}),(0,$c.jsxs)("span",{children:["Detta \xe4r formen \u2014 inte ert faktiska underlag. ",(0,$c.jsx)("b",{children:"Skriv in er dom\xe4n ovan"})," s\xe5 l\xe5ser vi upp det p\xe5 sekunder, innan ni delat n\xe5got."]})]})]})}const Ru=vc.section`
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
`,Iu=["e-postpostur","Bolagsverket","certifikatregistret","dom\xe4nregistret","prisboken"],Bu=Iu.join(" \xb7 "),Mu=null!==(zu=["noll","ett","tv\xe5","tre","fyra","fem","sex","sju","\xe5tta","nio"][Iu.length])&&void 0!==zu?zu:String(Iu.length);function Vu(e){let{doman:t}=e;const r=String(t||"").trim().toLowerCase(),a=(r.includes("@")?r.split("@")[1]:r).replace(/^https?:\/\//,"").replace(/^www\./,"").split("/")[0],[i,o]=(0,n.useState)(0);return(0,n.useEffect)(()=>{const e=performance.now(),t=setInterval(()=>o((performance.now()-e)/1e3),100);return()=>clearInterval(t)},[]),(0,$c.jsxs)(Ru,{"aria-live":"polite",children:[(0,$c.jsxs)("div",{className:"rw-eyebrow",children:["Underlag",a?` \xb7 ${a}`:""]}),(0,$c.jsx)("div",{className:"rw-beam",children:(0,$c.jsx)("span",{})}),(0,$c.jsxs)("div",{className:"rw-status",children:[(0,$c.jsx)("span",{children:"l\xe4ser \xf6ppna k\xe4llor"}),(0,$c.jsxs)("span",{className:"rw-t",children:[i.toFixed(1)," s"]})]}),(0,$c.jsx)("div",{className:"rw-sources",children:Bu}),(0,$c.jsxs)("div",{className:"rw-skel",children:[(0,$c.jsx)("div",{className:"l1",style:{width:"72%"}}),(0,$c.jsx)("div",{className:"l2",style:{width:"92%"}})]}),(0,$c.jsxs)("div",{className:"rw-skel",children:[(0,$c.jsx)("div",{className:"l1",style:{width:"58%"}}),(0,$c.jsx)("div",{className:"l2",style:{width:"84%"}})]}),(0,$c.jsxs)("div",{className:"rw-skel",children:[(0,$c.jsx)("div",{className:"l1",style:{width:"66%"}}),(0,$c.jsx)("div",{className:"l2",style:{width:"78%"}})]})]})}function Uu(e){let{doman:t,setDoman:r,onSubmit:n,loading:a,reveal:i,note:o,pending:s,onValjBolag:l}=e;return(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(Au,{onSubmit:n,children:[(0,$c.jsx)("div",{className:"rp-k",children:"Innan f\xf6rsta fakturan"}),(0,$c.jsxs)("p",{className:"rp-lede",children:["Era leverant\xf6rer har redan bildat sig en uppfattning om er \u2014 och priss\xe4tter efter den. Skriv in er ",(0,$c.jsx)("b",{children:"dom\xe4n"}),", s\xe5 visar vi p\xe5 sekunder vad de ser, ur \xf6ppna k\xe4llor."]}),(0,$c.jsxs)("div",{className:"rp-row",children:[(0,$c.jsx)("input",{type:"text",inputMode:"url",autoComplete:"off",autoCapitalize:"off",spellCheck:"false","aria-label":"Er f\xf6retagsdom\xe4n",placeholder:"ertbolag.se",value:t,onChange:e=>r(e.target.value),disabled:a}),(0,$c.jsx)("button",{type:"submit",disabled:a||!t.trim(),children:a?"\xd6ppnar\u2026":"\xd6ppna underlaget \u2192"})]}),o&&(0,$c.jsx)("p",{className:"rp-note",children:o})]}),a&&(0,$c.jsx)(Vu,{doman:t}),!a&&i&&(0,$c.jsx)(Ku,{domain:i.domain,findings:i.findings,pending:s,identity:i.identity,onValjBolag:l})]})}function Ku(e){var t;let{domain:r,findings:a,pending:i,identity:o,onValjBolag:s}=e;const[l,d]=n.useState(!1),[c,u]=n.useState(!1);if(!r||null===a||void 0===a||!a.length)return null;const p=null!==(t=null===o||void 0===o?void 0:o.candidates)&&void 0!==t?t:[],m=p.length>1&&"function"===typeof s,f=!(null!==o&&void 0!==o&&o.confirmedName)&&m,h=m&&(f&&!c||l),g=e=>{d(e),u(!e)},x=h,v=(()=>{const e=r.split(".")[0];return e.charAt(0).toUpperCase()+e.slice(1)})(),b=h?(0,$c.jsxs)("div",{className:"rv-aperture",children:[(0,$c.jsxs)("div",{className:"ap-k",children:[(0,$c.jsx)("span",{children:f?`Vi l\xe4ste ${p.length} bolag som heter n\xe5got med ${v}. Vilket \xe4r ert?`:"Vilket bolag \xe4r ni?"}),(0,$c.jsxs)("span",{children:[p.length," m\xf6jliga"]})]}),p.map((e,t)=>(0,$c.jsxs)("button",{type:"button",className:"ap-row",style:{animationDelay:.07*t+"s"},onClick:()=>{g(!1),s(e.orgnr)},children:[(0,$c.jsx)("span",{className:"ap-org",children:Su(e.orgnr)}),(0,$c.jsxs)("span",{children:[(0,$c.jsx)("span",{className:"ap-namn",children:e.legalName}),(0,$c.jsx)("span",{className:"ap-var","data-org":Su(e.orgnr),children:[e.ort,e.bransch].filter(Boolean).join(" \xb7 ")})]})]},e.orgnr)),f&&(0,$c.jsx)("p",{className:"ap-foot",children:"Vi kunde ha gissat. Ett fel val hade visat er n\xe5gon annans bokslut \u2014 d\xe4rf\xf6r fr\xe5gar vi."})]}):null;return(0,$c.jsxs)(Cu,{className:"rv-card",children:[(0,$c.jsxs)("div",{className:"rv-eyebrow",children:["Underlag \xb7 ",r]}),f&&b,a.map((e,t)=>(0,$c.jsxs)("div",{className:"rv-find",style:{animationDelay:.14*t+"s"},children:[(0,$c.jsx)("div",{className:"rv-title",children:e.title}),e.detail&&(0,$c.jsx)("div",{className:"rv-detail",children:e.detail}),(0,$c.jsxs)("div",{className:"rv-source",children:[(0,$c.jsx)("b",{children:"K\xe4lla:"})," ",e.source]})]},t)),(null===o||void 0===o?void 0:o.confirmedName)&&!x&&(0,$c.jsxs)("p",{className:"rv-ident",children:["G\xe4ller ",(0,$c.jsx)("b",{children:o.confirmedName})," ",(0,$c.jsx)("code",{children:Su(o.confirmed)}),o.byHuman&&" \xb7 bekr\xe4ftat av er",m&&(0,$c.jsxs)($c.Fragment,{children:[". Inte ert bolag?",(0,$c.jsx)("button",{type:"button",onClick:()=>g(!0),children:"Byt \u2192"})]})]}),f&&c&&(0,$c.jsx)("p",{className:"rv-ident",children:(0,$c.jsx)("button",{type:"button",onClick:()=>g(!0),children:"V\xe4lj ert bolag \u2014 s\xe5 l\xe4ser vi bokslutet \u2192"})}),!f&&b,i&&(0,$c.jsx)("div",{className:"rv-receipt",style:{borderStyle:"dashed"},children:"Djupare register arbetar fortfarande \u2014 certifikatregistret svarar l\xe5ngsamt. Fler rader kan landa h\xe4r."}),!i&&(0,$c.jsxs)("div",{className:"rv-receipt",children:[(0,$c.jsxs)("b",{children:[Mu," \xf6ppna register"]})," l\xe4sta \u2014 ",Bu," \xb7 innan ni delat n\xe5got"]}),(0,$c.jsxs)("p",{className:"rv-foot",children:["Allt ovan \xe4r ",(0,$c.jsx)("b",{children:"offentlig information"})," \u2014 innan ni loggat in, utan att ni l\xe4mnat ifr\xe5n er n\xe5got. T\xe4nk er vad vakten ser den dag ni delar en faktura."]})]})}const Hu={platform:0,suppliers:1,koncern:2,spoofing:3,business:4,trend:5,cross:6,heritage:7,onboarding:8,domain:9,cert:10,dmarc:11},Wu=new Set(["market","bridge","infra"]);function qu(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return Array.isArray(e)?e.filter(e=>e&&e.title&&!Wu.has(e.kind)).slice().sort((e,t)=>{var r,n;return(null!==(r=Hu[e.kind])&&void 0!==r?r:99)-(null!==(n=Hu[t.kind])&&void 0!==n?n:99)}).slice(0,t).map(e=>function(e){let t=String(e||"").trim();return t?(t=t.split(/\s+[\u2014\u2013]\s+/)[0],t=t.split(":")[0].trim(),t=t.replace(/^Ni\s+/,"ni "),t.charAt(0).toLowerCase()+t.slice(1)):""}(e.title)).filter(Boolean):[]}const Gu={2:"tv\xe5",3:"tre",4:"fyra",5:"fem",6:"sex",7:"sju",8:"\xe5tta",9:"nio",10:"tio",11:"elva",12:"tolv"};function Yu(e){const t=(e||[]).filter(Boolean).map(e=>{return`att ${t=e,String(t||"").replace(/\b(\d{1,2})\s+(?=[a-z\xe5\xe4\xf6])/g,(e,t)=>{const r=Gu[Number(t)];return r?`${r} `:e})}`;var t});return function(e){const t=(e||[]).filter(Boolean);return 0===t.length?"":1===t.length?t[0]:`${t.slice(0,-1).join(", ")} och ${t[t.length-1]}`}(t)}const Ju=wc.font.mono,Qu=wc.font.display,Xu=wc.dossier,Zu=hc`
  opacity: 0; transform: translateY(22px);
  transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
  &.inview { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
`,ep=vc.main`
  background: ${wc.color.bg};
  color: ${wc.color.ink};
  overflow-x: hidden;
`,tp=vc.section`
  max-width: 920px; margin: 0 auto; text-align: center;
  padding: 96px 24px 84px;
  @media (max-width: 640px) { padding: 64px 20px 60px; }

  .eyebrow {
    font-family: ${Ju}; font-size: 10px; letter-spacing: .32em; text-transform: uppercase;
    color: ${wc.color.brand};
    ${Zu}
  }
  h1 {
    font-family: ${Qu}; font-weight: 500; letter-spacing: -.015em;
    font-size: clamp(42px, 7.2vw, 76px); line-height: 1.05;
    margin: 30px 0 0;
    em { font-style: italic; color: ${wc.color.brand}; }
    ${Zu} transition-delay: .08s;
  }
  .lede {
    font-size: 16.5px; line-height: 1.75; color: ${wc.color.mutedSoft};
    max-width: 540px; margin: 30px auto 0;
    ${Zu} transition-delay: .16s;
  }
  .actions { margin-top: 40px; ${Zu} transition-delay: .24s; }
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
    font-family: ${Ju}; font-size: 9.5px; letter-spacing: .22em; text-transform: uppercase;
    color: ${wc.color.mutedSoft}; margin-top: 50px;
    ${Zu} transition-delay: .32s;
    @media (max-width: 640px) { line-height: 2.1; }
  }
`,rp=vc.div`
  max-width: 1120px; margin: 0 auto; padding: 0 20px;
`,np=vc.section`
  background: ${Xu.bg};
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
`,ap=vc.div`
  display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
  border-bottom: 1px solid ${e=>{let{$light:t}=e;return t?wc.color.border:Xu.hairlineOnDark}};
  padding-bottom: 15px;
  .k-num {
    font-family: ${Ju}; font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    color: ${e=>{let{$light:t}=e;return t?wc.color.brand:Xu.teal}};
  }
  .k-note {
    font-family: ${Ju}; font-size: 9px; letter-spacing: .2em; text-transform: uppercase;
    color: ${e=>{let{$light:t}=e;return t?wc.color.mutedSoft:Xu.faintOnDark}}; text-align: right;
  }
`,ip=vc.div`
  margin: 46px auto 0;
  ${Zu}
  h3 {
    font-family: ${Qu}; font-size: clamp(28px, 4.4vw, 38px); font-weight: 500;
    color: ${Xu.inkOnDark}; margin: 0 0 4px; line-height: 1.2; text-align: center;
    em { font-style: italic; }
  }
  > h3, > form, > .prosa { max-width: var(--matt-prosa); margin-left: auto; margin-right: auto; }
`,op=vc.div`
  margin-top: 104px;
  @media (max-width: 640px) { margin-top: 72px; }
  /* Centrerad som dörrens rubrik (grundarbeslut 2026-07-24) — de två akterna i dossiern
     ska bära samma typografiska hållning, inte en centrerad och en vänsterställd. */
  h2 {
    font-family: ${Qu}; font-size: clamp(30px, 4.8vw, 44px); font-weight: 500;
    line-height: 1.18; margin: 46px auto 0; max-width: var(--matt-prosa); text-align: center;
    color: ${Xu.inkOnDark};
    em { font-style: italic; color: ${Xu.tealBright}; }
    ${Zu}
  }
`,sp=vc.div`
  max-width: var(--matt-bevis); margin: 56px auto 0;
  ${Zu} transition-delay: .1s;

  .a-card {
    position: relative; overflow: hidden;
    border: 1px solid rgba(43,196,172,.30); border-radius: 20px;
    background: radial-gradient(560px 260px at 12% -18%, rgba(43,196,172,.13), transparent 60%), ${Xu.bgRaised};
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
  .a-sec { position: relative; padding: 22px 30px; border-top: 1px solid ${Xu.hairlineOnDark};
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
  .a-plabel { display: block; font-family: ${Ju}; font-size: 9px; letter-spacing: .24em;
    text-transform: uppercase; color: ${Xu.faintOnDark}; margin-bottom: 3px; }
  .a-pline { font-size: 13px; line-height: 1.5; color: ${Xu.inkOnDark};
    b { font-weight: 600; } em { font-style: normal; color: ${Xu.tealBright}; } }

  /* Veckodomen — förtjänat lugn, metallic som i rummet */
  .a-dom { font-family: ${Qu}; font-size: clamp(20px, 3.6vw, 25px); font-weight: 500;
    line-height: 1.3; margin-top: 12px;
    background: ${Xu.metallicText}; -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent; }

  /* Den levande fortsättningen från dörren */
  .a-cont { font-size: 13.5px; line-height: 1.65; color: ${Xu.mutedOnDark};
    b { color: ${Xu.inkOnDark}; font-weight: 600; }
    em { font-style: normal; color: ${Xu.tealBright}; } }

  .a-sum { font-size: 12.5px; line-height: 1.55; color: ${Xu.mutedOnDark};
    padding-top: 12px; border-top: 1px solid ${Xu.hairlineOnDark}; }

  .a-foot { font-size: 13px; line-height: 1.6; color: ${Xu.mutedOnDark};
    b { color: ${Xu.inkOnDark}; font-weight: 600; } }

  .a-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .a-eyebrow { font-family: ${Ju}; font-size: 9.5px; letter-spacing: .24em; text-transform: uppercase; color: ${Xu.teal};
    display: inline-flex; align-items: center; gap: 8px;
    &::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: ${Xu.tealBright};
      animation: dotpulse 2.6s ease-out infinite; } }
  .a-count { font-family: ${Ju}; font-size: 9.5px; color: ${Xu.faintOnDark}; }
  @keyframes dotpulse { 0%{box-shadow:0 0 0 0 rgba(93,232,210,.45);} 70%{box-shadow:0 0 0 7px rgba(93,232,210,0);} 100%{box-shadow:0 0 0 0 rgba(93,232,210,0);} }
  @media (prefers-reduced-motion: reduce) { .a-eyebrow::before { animation: none; } }

  .a-row {
    display: flex; gap: 16px; align-items: baseline; padding: 13px 0;
    border-top: 1px solid ${Xu.hairlineOnDark};
    opacity: 0; transform: translateX(-14px);
    transition: opacity .55s ease, transform .55s ease;
    &.inview { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
  }
  .a-days { font-family: ${Ju}; font-size: 12px; width: 84px; flex-shrink: 0;
    font-feature-settings: 'tnum';
    color: ${Xu.tealBright}; &.akut { color: ${Xu.signal}; } }
  .a-sup { font-size: 14px; font-weight: 600; color: ${Xu.inkOnDark}; }
  .a-txt { font-size: 12px; color: ${Xu.mutedOnDark}; margin-top: 2px; line-height: 1.5; }
  .a-caption {
    text-align: center; font-family: ${Ju}; font-size: 9.5px; letter-spacing: .18em;
    text-transform: uppercase; color: ${Xu.faintOnDark}; margin-top: 18px; line-height: 1.9;
    b { color: ${Xu.mutedOnDark}; font-weight: 500; }
  }
`,lp=vc.section`
  max-width: 820px; margin: 0 auto; padding: 88px 24px 0;
  @media (max-width: 640px) { padding: 64px 20px 0; }
`,dp=vc.div`
  display: flex; gap: 0; margin-top: 42px; flex-wrap: wrap;
  .step {
    flex: 1; min-width: 210px; padding: 2px 24px 8px 22px;
    border-left: 1px solid ${wc.color.border};
    ${Zu}
    &:nth-child(2) { transition-delay: .1s; }
    &:nth-child(3) { transition-delay: .2s; }
    @media (max-width: 700px) { min-width: 100%; margin-bottom: 22px; }
  }
  .s-num { font-family: ${Qu}; font-style: italic; font-size: 15px; color: ${wc.color.brand}; }
  .s-t { font-size: 15px; font-weight: 600; color: ${wc.color.ink}; margin: 8px 0 6px; }
  .s-d { font-size: 12.5px; line-height: 1.65; color: ${wc.color.mutedSoft}; }
`,cp=vc.div`
  text-align: center; margin-top: 46px;
  ${Zu}
  .p-serif {
    font-family: ${Qu}; font-size: clamp(23px, 3.4vw, 31px); font-weight: 500;
    color: ${wc.color.ink}; line-height: 1.35;
    em { font-style: italic; color: ${wc.color.brand}; }
  }
  .p-sub { font-size: 13px; color: ${wc.color.mutedSoft}; max-width: 460px; margin: 15px auto 0; line-height: 1.7; }
`,up=vc.div`
  display: flex; gap: 16px; margin-top: 42px; flex-wrap: wrap;
  .pc {
    flex: 1; min-width: 280px; border-radius: 20px; padding: 26px;
    ${Zu}
  }
  .pc.dark { background: ${Xu.bgRaised}; box-shadow: 0 30px 70px rgba(8,15,13,.30); }
  .pc.lightc { border: 1px solid ${wc.color.border}; background: #fff; transition-delay: .1s; }
  .pc-k { font-family: ${Ju}; font-size: 9px; letter-spacing: .24em; text-transform: uppercase; }
  .dark .pc-k { color: ${Xu.tealBright}; }
  .lightc .pc-k { color: ${wc.color.brand}; }
  .pc-pris { font-family: ${Ju}; font-size: 26px; margin: 14px 0 4px; }
  .pc-pris small { font-size: 11px; }
  .dark .pc-pris { color: ${Xu.inkOnDark}; }
  .dark .pc-pris small { color: ${Xu.faintOnDark}; }
  .lightc .pc-pris { color: ${wc.color.ink}; }
  .lightc .pc-pris small { color: ${wc.color.mutedSoft}; }
  .pc-lede { font-size: 12px; margin-bottom: 15px; line-height: 1.55; }
  .dark .pc-lede { color: ${Xu.mutedOnDark}; }
  .lightc .pc-lede { color: ${wc.color.mutedSoft}; }
  .pc-row { display: flex; gap: 8px; font-size: 12px; padding: 4px 0; line-height: 1.5; }
  .pc-row .tick { flex-shrink: 0; }
  .dark .pc-row { color: ${Xu.mutedOnDark}; }
  .dark .pc-row .tick { color: ${Xu.teal}; }
  .lightc .pc-row { color: ${wc.color.mutedSoft}; }
  .lightc .pc-row .tick { color: ${wc.color.brand}; }
  .pc-cta {
    display: block; text-align: center; margin-top: 18px; padding: 13px;
    border-radius: ${wc.size.radius.pill}; font-size: 13px; font-weight: 600;
    text-decoration: none; transition: opacity .15s, transform .15s;
    &:hover { opacity: .92; transform: translateY(-1px); }
  }
  .dark .pc-cta { color: ${wc.dossier.bg}; background: linear-gradient(135deg, ${Xu.tealBright}, ${Xu.teal}); }
  .lightc .pc-cta { color: ${wc.color.brand}; border: 1px solid ${wc.color.border}; }
`,pp=vc.div`
  margin-top: 8px;
  .f-item { border-bottom: 1px solid ${wc.color.border}; }
  .f-q {
    width: 100%; background: none; border: none; cursor: pointer; text-align: left;
    display: flex; justify-content: space-between; align-items: center; gap: 14px;
    padding: 19px 4px; font-size: 14.5px; font-weight: 500; color: ${wc.color.ink};
    font-family: inherit;
  }
  .f-q .f-plus { font-family: ${Ju}; color: ${wc.color.mutedSoft}; font-size: 15px; flex-shrink: 0;
    transition: transform .25s ease; }
  .f-q[aria-expanded='true'] .f-plus { transform: rotate(45deg); }
  .f-a {
    overflow: hidden; max-height: 0; transition: max-height .4s ease;
    @media (prefers-reduced-motion: reduce) { transition: none; }
  }
  .f-a.open { max-height: 420px; }
  .f-a p { margin: 0; padding: 0 4px 20px; font-size: 13px; line-height: 1.7; color: ${wc.color.mutedSoft}; max-width: 64ch; }
`,mp=vc.section`
  max-width: 820px; margin: 0 auto; text-align: center; padding: 96px 24px 88px;
  @media (max-width: 640px) { padding: 68px 20px 64px; }
  .lw-serif {
    font-family: ${Qu}; font-size: clamp(24px, 3.6vw, 30px); font-weight: 500;
    color: ${wc.color.ink}; line-height: 1.3;
    em { font-style: italic; color: ${wc.color.brand}; }
    ${Zu}
  }
  .lw-cta {
    display: inline-block; margin-top: 30px; font-size: 15px; font-weight: 600; color: ${wc.color.surface};
    padding: 16px 38px; border-radius: ${wc.size.radius.pill}; text-decoration: none;
    background: ${wc.color.brandGradient};
    box-shadow: 0 16px 44px rgba(27,122,110,.30);
    transition: transform .18s ease;
    &:hover { transform: translateY(-1px); }
    ${Zu} transition-delay: .1s;
  }
  .lw-sign { font-family: ${Qu}; font-style: italic; font-size: 13px; color: ${wc.color.mutedSoft}; margin-top: 62px; }
`;function fp(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.18;const t=(0,n.useRef)(null),[r,a]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{const r=t.current;if(!r)return;if("undefined"===typeof IntersectionObserver)return void a(!0);const n=new IntersectionObserver(e=>{let[t]=e;t.isIntersecting&&(a(!0),n.disconnect())},{threshold:e});return n.observe(r),()=>n.disconnect()},[e]),[t,r?"inview":""]}const hp=[{days:266,akut:!1,sup:"Telia",txt:"Ett redan missat f\xf6nster uppt\xe4ckt \u2014 n\xe4sta bevakas 1 april 2027. Motdraget ligger f\xe4rdigt."}],gp=[{q:"Vad kostar det?",a:"Arvo erbjuds i tv\xe5 lager. Arvo Intelligence kostar 1 995 kr/m\xe5n \u2014 l\xf6pande bevakning, smygh\xf6jningslarm och avtalsbevakning, ingen bindningstid. Arvo Switch \xe4r ett till\xe4gg: i kategorier d\xe4r bytet \xe4r systematiserat f\xf6rbereder Arvo hela bytet \u2014 upps\xe4gning, nyteckning, tajming \u2014 och ni godk\xe4nner med BankID. Arvodet \xe4r 20 % av f\xf6rsta \xe5rets kontrakterade besparing: skillnaden mellan ert gamla fakturapris och det nya avtalets pris, b\xe5da dokumenterade svart p\xe5 vitt. Det faktureras f\xf6rst n\xe4r det nya avtalet b\xf6rjat g\xe4lla \u2014 och visar era fakturor senare att besparingen inte landat, justerar vi arvodet. Blir det ingen besparing kostar Switch ingenting."},{q:"Hur kan ni vara s\xe4kra p\xe5 att rekommendationerna \xe4r opartiska?",a:(0,$c.jsxs)($c.Fragment,{children:["Vi tj\xe4nar pengar bara n\xe4r ni sparar \u2014 det \xe4r beviset p\xe5 opartiskhet. Leverant\xf6rer kan inte k\xf6pa sig en h\xf6gre placering, f\xf6r vi tar aldrig en krona fr\xe5n dem: noll provision, noll partner-avgift, ingen d\xf6rr in. V\xe5r enda int\xe4kt \xe4r er besparing. Policyn \xe4r \xf6ppet publicerad under ",(0,$c.jsx)(vs,{to:"/bias",children:"v\xe5r rankningspolicy"}),"."]})},{q:"Varf\xf6r ska jag lita p\xe5 era besparingskalkyler?",a:"Vi bygger p\xe5 verifierade marknadsdata \u2014 offentliga listpriser, ramavtalsdata och faktiska operat\xf6rspriser. Och eftersom v\xe5rt arvode \xe4r 20 % av den kontrakterade besparingen \u2014 skillnaden mellan ert gamla fakturapris och det nya avtalets, b\xe5da dokumenterade \u2014 har vi inget att vinna p\xe5 att \xf6verdriva: en projektion som inte h\xe5ller kostar oss f\xf6rtroendet och arvodet. Vi tj\xe4nar mer p\xe5 att lova lite och leverera fullt ut."},{q:"Vad h\xe4nder om den nya leverant\xf6ren h\xf6jer priset efter bytet?",a:"V\xe5r fee baseras p\xe5 kontrakterade priser vid avtalssignering. F\xf6r\xe4ndras marknadsl\xe4get efter bytet hj\xe4lper vi er med en ny analys \u2014 utan extra kostnad."},{q:"S\xe4ger ni upp avtal autonomt utan mitt godk\xe4nnande?",a:"Aldrig. Varje byte kr\xe4ver er BankID-signatur. Vi f\xf6rbereder, ni godk\xe4nner. Det \xe4r en h\xe5rd regel."},{q:"Vilka kategorier t\xe4cker ni idag?",a:"Vi bevakar er kostnad i tre l\xe4gen. I el, mobil och f\xf6retagsbredband f\xf6rbereder Arvo hela bytet \u2014 upps\xe4gning och nyteckning, f\xe4rdigtajmat \u2014 ni godk\xe4nner med BankID, och den vinnande leverant\xf6ren sk\xf6ter inkopplingen enligt branschens regler. I programvara / SaaS, kortterminaler, fakturatj\xe4nster och l\xf6neadministration f\xf6rbereder Arvo hela bytet \u2014 ni formaliserar med ett klick. I f\xf6rs\xe4kring, leasing, larm och tj\xe4nsteavtal levererar vi fyndet, tajmingen och det exakta motbudet och bev\xe4pnar er att agera (f\xf6rs\xe4kringsbyten genomf\xf6rs n\xe4r v\xe5r FI-licens \xe4r klar). Fler kategorier l\xe4ggs till varje kvartal baserat p\xe5 var vi ser st\xf6rst besparingar i kunddatan."},{q:"Vad h\xe4nder med min data?",a:"Arvo ser endast det ni vidarebefordrar \u2014 leverant\xf6rsfakturor, inget annat. Behandlingen sker inom EU/EES och i USA hos namngivna underbitr\xe4den under EU-godk\xe4nda standardavtalsklausuler (SCC) \u2014 varje bitr\xe4de st\xe5r listat med namn, funktion och land i v\xe5r integritetspolicy, inklusive de vi \xe4nnu inte tagit i drift. Kopplar ni in Fortnox eller Visma g\xe4ller samma princip: enbart l\xe4s-r\xe4ttigheter mot leverant\xf6rsfakturor. Vi s\xe4ljer aldrig identifierbar data \u2014 anonymiserade branschindex \xe4r v\xe5r enda dataprodukt ut\xf6ver tj\xe4nsten."}];function xp(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return"";const r=t.toLocaleTimeString("sv-SE",{hour:"2-digit",minute:"2-digit"}),n=e=>{const t=new Date(e);return t.setHours(0,0,0,0),t},a=Math.round((n(new Date)-n(t))/864e5);return a<=0?`i dag ${r}`:1===a?`i natt ${r}`:`${t.toLocaleDateString("sv-SE",{day:"numeric",month:"short"})} ${r}`}function vp(e){let{r:t,index:r,parentIn:a}=e;const i=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:900;const[a,i]=(0,n.useState)(0);return(0,n.useEffect)(()=>{var n,a;if(!t)return;if("undefined"!==typeof window&&null!==(n=(a=window).matchMedia)&&void 0!==n&&n.call(a,"(prefers-reduced-motion: reduce)").matches)return void i(e);const o=performance.now();let s;const l=t=>{const n=Math.min((t-o)/r,1);i(Math.round(e*(1-Math.pow(1-n,3)))),n<1&&(s=requestAnimationFrame(l))};return s=requestAnimationFrame(l),()=>cancelAnimationFrame(s)},[e,t,r]),t?a:0}(t.days,a,700+150*r);return(0,$c.jsxs)("div",{className:"a-row "+(a?"inview":""),style:{transitionDelay:.15+.12*r+"s"},children:[(0,$c.jsxs)("span",{className:"a-days"+(t.akut?" akut":""),children:[(t.days,i)," dagar"]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"a-sup",children:t.sup}),(0,$c.jsx)("div",{className:"a-txt",children:t.txt})]})]})}function bp(){const[e,t]=(0,n.useState)(""),[r,a]=(0,n.useState)(!1),[i,o]=(0,n.useState)(null),[s,l]=(0,n.useState)(""),[d,c]=(0,n.useState)(!1),u=(0,n.useRef)(null),p=(0,n.useCallback)(async t=>{const r=e.trim();if(r&&t){a(!0);try{var n;const e=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:r,orgnr:t})}),a=await e.json();if(null!==a&&void 0!==a&&a.ok&&null!==(n=a.findings)&&void 0!==n&&n.length){o({domain:a.domain,findings:a.findings,identity:a.identity}),c(!1);try{localStorage.setItem(`arvo_bolag:${a.domain}`,t)}catch{}}}catch{}finally{a(!1)}}},[e]),m=(0,n.useCallback)(async t=>{var n;null===t||void 0===t||null===(n=t.preventDefault)||void 0===n||n.call(t);const i=e.trim();if(i&&!r){a(!0),o(null),l(""),_u("doman_skickad");try{var s;const e=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:i,fast:!0})}),t=await e.json().catch(()=>({}));if(t.ok&&null!==(s=t.findings)&&void 0!==s&&s.length){_u("kort_visat",{fynd:t.findings.length}),o({domain:t.domain,findings:t.findings,identity:t.identity}),c(!0),a(!1);try{const e=new AbortController,r=setTimeout(()=>e.abort(),18e3);try{var d;const r=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:i}),signal:e.signal}),n=await r.json().catch(()=>({}));if(n.ok&&null!==(d=n.findings)&&void 0!==d&&d.length){const e=new Set(t.findings.map(e=>e.title)),r=n.findings.filter(t=>!e.has(t.title)).slice(0,Math.max(0,5-t.findings.length));r.length&&o(e=>({...e,domain:t.domain,findings:[...t.findings,...r]}))}}finally{clearTimeout(r)}}catch{}try{const e=new AbortController,t=setTimeout(()=>e.abort(),28e3);try{var u;const t=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:i,ctOnly:!0}),signal:e.signal}),r=await t.json().catch(()=>({}));r.ok&&null!==(u=r.findings)&&void 0!==u&&u.length&&o(e=>{if(null===e||void 0===e||!e.findings)return e;const t=new Set(e.findings.map(e=>e.title)),n=r.findings.filter(e=>!t.has(e.title));return n.length?{...e,findings:[...e.findings,...n]}:e})}finally{clearTimeout(t)}}catch{}c(!1)}else _u("kort_tomt"),l(t.note||t.error||"Dom\xe4nen bar inga \xf6ppna sp\xe5r just nu \u2014 dela en faktura i st\xe4llet, s\xe5 l\xe4ser vi de verkliga talen.")}catch{l("Kunde inte l\xe4sa av dom\xe4nen just nu \u2014 f\xf6rs\xf6k igen om en stund.")}finally{a(!1)}}},[e,r]),f=(0,n.useCallback)(()=>{var e;null===(e=u.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{var e,t;return null===(e=u.current)||void 0===e||null===(t=e.querySelector("input"))||void 0===t?void 0:t.focus({preventScroll:!0})},550)},[]);(0,n.useEffect)(()=>{_u("dorr_visad",{engang:!0})},[]);const[h,g]=(0,n.useState)(null);(0,n.useEffect)(()=>{let e=!0;return fetch("/api/vakt-pulse").then(e=>e.json()).then(t=>{var r;e&&null!==t&&void 0!==t&&null!==(r=t.sweep)&&void 0!==r&&r.sweptAt&&g(t.sweep)}).catch(()=>{}),()=>{e=!1}},[]);const x=(0,n.useMemo)(()=>qu(null===i||void 0===i?void 0:i.findings),[i]),v=Boolean((null===i||void 0===i?void 0:i.domain)&&x.length),[b,k]=fp(.1),[y,j]=fp(.12),[w,S]=fp(.2),[$,N]=fp(.2),[E,_]=fp(.3),[z,C]=fp(.2),[A,D]=fp(.2),[F,O]=fp(.15),[T,P]=fp(.2),[L,R]=(0,n.useState)(null);return(0,$c.jsxs)(ep,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(tp,{ref:b,children:[(0,$c.jsx)("div",{className:`eyebrow ${k}`,children:"Arvo \xb7 finansiell intelligens f\xf6r svenska bolag"}),(0,$c.jsxs)("h1",{className:k,children:["Er finansdirekt\xf6r.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Innan ni fr\xe5gar."})]}),(0,$c.jsx)("p",{className:`lede ${k}`,children:"Ni delar era fakturor och avtal. Vi v\xe4ger varje pris mot verifierat marknadspris, l\xe4ser varje bindningstid \u2014 och s\xe4ger till i tid, med motdraget f\xf6rberett. N\xe4r allt \xe4r r\xe4tt s\xe4ger vi det ocks\xe5."}),(0,$c.jsxs)("div",{className:`actions ${k}`,children:[(0,$c.jsx)("button",{type:"button",className:"cta",onClick:f,children:"Se ert bolag som marknaden ser det \u2192"}),(0,$c.jsxs)("div",{className:"sub",children:["innan ni delat n\xe5got \xb7 \xf6ppna k\xe4llor \xa0\xb7\xa0 ",(0,$c.jsx)(vs,{to:"/testa-faktura",children:"eller testa med en faktura"})]})]}),(0,$c.jsx)("div",{className:`proof ${k}`,children:"Avtal som en jurist \xa0\xb7\xa0 Priser som en ink\xf6pschef \xa0\xb7\xa0 Vaken varje natt"})]}),(0,$c.jsx)(rp,{children:(0,$c.jsx)(np,{ref:y,className:j,children:(0,$c.jsxs)("div",{className:"inner",children:[(0,$c.jsxs)(ap,{children:[(0,$c.jsx)("span",{className:"k-num",children:"01 \xb7 Avsl\xf6jandet"}),(0,$c.jsx)("span",{className:"k-note",children:"\xf6ppna k\xe4llor \xb7 innan ni delat n\xe5got"})]}),(0,$c.jsxs)(ip,{ref:e=>{u.current=e,w.current=e},className:S,children:[(0,$c.jsxs)("h3",{children:["Se ert bolag ",(0,$c.jsx)("em",{children:"som marknaden ser det."})]}),(0,$c.jsx)(Uu,{doman:e,setDoman:t,onSubmit:m,loading:r,reveal:i,note:s,pending:d,onValjBolag:p}),!i&&!r&&(0,$c.jsx)(Lu,{}),i&&(0,$c.jsx)(Pu,{})]}),(0,$c.jsxs)(op,{ref:$,children:[(0,$c.jsxs)(ap,{children:[(0,$c.jsx)("span",{className:"k-num",children:"02 \xb7 Arvo-kontoret"}),(0,$c.jsx)("span",{className:"k-note",children:"Konfidentiellt \xb7 ett rum per kund"})]}),(0,$c.jsx)("h2",{className:N,children:v?(0,$c.jsxs)($c.Fragment,{children:["Det ni just s\xe5g blir rad ett.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Sedan vakar vi vidare \u2014 varje natt."})]}):(0,$c.jsxs)($c.Fragment,{children:["Det ni just l\xe4ste finns redan.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Och i natt var allt lugnt."})]})}),(0,$c.jsxs)(sp,{ref:E,className:_,children:[(0,$c.jsxs)("div",{className:"a-card",children:[(0,$c.jsxs)("div",{className:"a-sec a-pulse",children:[(0,$c.jsx)("span",{className:"a-disc","aria-hidden":"true",children:(0,$c.jsx)("span",{className:"a-sweep"})}),(0,$c.jsxs)("span",{children:[(0,$c.jsx)("span",{className:"a-plabel",children:v?`Ert rum \xb7 ${i.domain} \xb7 f\xf6rhandsvisning`:"Vakten \xb7 exempelrum \xb7 alltid p\xe5"}),(0,$c.jsx)("span",{className:"a-pline",children:h?(0,$c.jsxs)($c.Fragment,{children:["Senaste svep ",(0,$c.jsx)("b",{children:xp(h.sweptAt)}),h.sources?(0,$c.jsxs)($c.Fragment,{children:[" \xb7 ",(0,$c.jsxs)("b",{children:[h.sources," marknadsk\xe4llor"]})," genoms\xf6kta"]}):null,h.streakNights>=2?(0,$c.jsxs)($c.Fragment,{children:[" \xb7 ",(0,$c.jsxs)("b",{children:[h.streakNights," n\xe4tter i rad"]})," utan avbrott."]}):(0,$c.jsxs)($c.Fragment,{children:[" \u2014 ",(0,$c.jsx)("em",{children:"vakten var vaken medan ni sov."})]})]}):(0,$c.jsxs)($c.Fragment,{children:["Vakten sveper ",(0,$c.jsx)("b",{children:"fyrtiotalet marknadsk\xe4llor"})," varje natt \u2014 ",(0,$c.jsx)("em",{children:"ocks\xe5 de n\xe4tter d\xe5 inget h\xe4nder."})]})})]})]}),(0,$c.jsxs)("div",{className:"a-sec",children:[(0,$c.jsx)("span",{className:"a-eyebrow",children:"Veckodomen \xb7 s\xe5 ser en lugn vecka ut"}),(0,$c.jsx)("div",{className:"a-dom",children:"En vanlig vecka hos er. Inget kr\xe4ver er uppm\xe4rksamhet \u2014 vi v\xe4gde era priser i natt, och allt h\xe5ller."})]}),v&&(0,$c.jsxs)("div",{className:"a-sec a-cont",children:["Det ni just s\xe5g i d\xf6rren \u2014 ",Yu(x)," \u2014 var f\xf6rsta \xf6gonkastet. I ert rum blir det ",(0,$c.jsx)("b",{children:"rad ett"}),", och vakten l\xe4ser vidare ",(0,$c.jsx)("em",{children:"varje natt."})]}),(0,$c.jsxs)("div",{className:"a-sec",children:[(0,$c.jsxs)("div",{className:"a-head",children:[(0,$c.jsx)("span",{className:"a-eyebrow",children:"Maktkalendern \xb7 motdraget ligger klart"}),(0,$c.jsx)("span",{className:"a-count",children:"5 avtal l\xe4sta"})]}),hp.map((e,t)=>(0,$c.jsx)(vp,{r:e,index:t,parentIn:!!_},e.sup)),(0,$c.jsx)("div",{className:"a-sum",children:"Fyra avtal till st\xe5r under bevakning \u2014 inget av dem beh\xf6ver er de n\xe4rmaste m\xe5naderna."})]}),(0,$c.jsxs)("div",{className:"a-sec a-foot",children:["Den vecka n\xe5got faktiskt h\xe4nder h\xf6r ni av oss \u2014 med draget redan gjort."," ",(0,$c.jsx)("b",{children:"Tills dess sk\xf6ter vi det \xe5t er."})]})]}),(0,$c.jsx)("div",{className:"a-caption",children:v?(0,$c.jsxs)($c.Fragment,{children:["Domen och kalendern visar ",(0,$c.jsx)("b",{children:"formen"})," \u2014 de fylls n\xe4r ni delat er f\xf6rsta faktura \xb7 raderna om ert bolag ovan \xe4r verifierade"]}):(0,$c.jsx)($c.Fragment,{children:"Exempel \u2014 formen p\xe5 ett Arvo-rum \xb7 maskinellt kontrollerad \xb7 varje datum ur kundens eget avtal"})})]})]})]})})}),(0,$c.jsxs)(lp,{id:"hur",children:[(0,$c.jsxs)(ap,{$light:!0,children:[(0,$c.jsx)("span",{className:"k-num",children:"03 \xb7 S\xe5 fungerar det"}),(0,$c.jsx)("span",{className:"k-note",children:"tv\xe5 minuter att komma ig\xe5ng"})]}),(0,$c.jsx)(dp,{ref:z,children:[["I","Dela","Vidarebefordra en faktura eller sl\xe4pp ett avtal i rummet. Det \xe4r allt ni g\xf6r."],["II","Vakten l\xe4ser","Varje pris v\xe4gs mot verifierat marknadspris. Varje bindningstid l\xe4ses ord f\xf6r ord, med citat som bevis."],["III","Ni f\xe5r domen","R\xe4tt pris? Vi s\xe4ger det. Fel pris eller ett f\xf6nster som st\xe4nger? Ni f\xe5r larmet i tid \u2014 med motdraget f\xf6rberett."]].map(e=>{let[t,r,n]=e;return(0,$c.jsxs)("div",{className:`step ${C}`,children:[(0,$c.jsx)("div",{className:"s-num",children:t}),(0,$c.jsx)("div",{className:"s-t",children:r}),(0,$c.jsx)("div",{className:"s-d",children:n})]},t)})})]}),(0,$c.jsxs)(lp,{id:"priser",children:[(0,$c.jsxs)(ap,{$light:!0,children:[(0,$c.jsx)("span",{className:"k-num",children:"04 \xb7 Priset"}),(0,$c.jsx)("span",{className:"k-note",children:"ingen bindningstid"})]}),(0,$c.jsxs)(cp,{ref:A,className:D,children:[(0,$c.jsxs)("div",{className:"p-serif",children:["1 995 kr i m\xe5naden. Tjugo procent av besparingen \u2014",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"dokumenterad i avtal, aldrig i l\xf6ften."})]}),(0,$c.jsx)("p",{className:"p-sub",children:"Vi tar aldrig ers\xe4ttning fr\xe5n n\xe5gon leverant\xf6r. Vi sitter p\xe5 er sida av bordet \u2014 det \xe4r hela aff\xe4rsid\xe9n."})]}),(0,$c.jsxs)(up,{ref:F,children:[(0,$c.jsxs)("div",{className:`pc dark ${O}`,children:[(0,$c.jsx)("div",{className:"pc-k",children:"Arvo Intelligence"}),(0,$c.jsxs)("div",{className:"pc-pris",children:["1 995 kr ",(0,$c.jsx)("small",{children:"/ m\xe5n"})]}),(0,$c.jsx)("div",{className:"pc-lede",children:"Er proaktiva finansdirekt\xf6r \u2014 bevakningen som aldrig sover."}),["Smygh\xf6jningslarm \u2014 avvikelse f\xe5ngas direkt","Avtalsklockan \u2014 sista upps\xe4gningsdag bevakad","Priser v\xe4gda mot verifierat marknadspris","M\xe5nadsbrev med det som faktiskt h\xe4nt"].map(e=>(0,$c.jsxs)("div",{className:"pc-row",children:[(0,$c.jsx)("span",{className:"tick",children:"\u2713"})," ",e]},e)),(0,$c.jsx)(vs,{className:"pc-cta",to:"/intelligence",children:"Aktivera Arvo Intelligence \u2192"})]}),(0,$c.jsxs)("div",{className:`pc lightc ${O}`,children:[(0,$c.jsx)("div",{className:"pc-k",children:"Arvo Switch"}),(0,$c.jsxs)("div",{className:"pc-pris",children:["20 % ",(0,$c.jsx)("small",{children:"av kontrakterad besparing"})]}),(0,$c.jsx)("div",{className:"pc-lede",children:"Bytet f\xf6rberett i sin helhet \u2014 tajmat mot avtalsklockan, signerat av er med BankID."}),["Arvodet faktureras f\xf6rst n\xe4r det nya avtalet b\xf6rjat g\xe4lla","Ni godk\xe4nner varje byte med BankID","Fr\xe5n \xe5r tv\xe5 tillfaller hela besparingen er","Hittar vi inget \u2014 kostar det inget"].map(e=>(0,$c.jsxs)("div",{className:"pc-row",children:[(0,$c.jsx)("span",{className:"tick",children:"\u2713"})," ",e]},e)),(0,$c.jsx)(vs,{className:"pc-cta",to:"/testa-faktura",children:"Testa med en faktura \u2192"})]})]})]}),(0,$c.jsxs)(lp,{children:[(0,$c.jsxs)(ap,{$light:!0,children:[(0,$c.jsx)("span",{className:"k-num",children:"05 \xb7 Vanliga fr\xe5gor"}),(0,$c.jsx)("span",{className:"k-note"})]}),(0,$c.jsx)(pp,{children:gp.map((e,t)=>(0,$c.jsxs)("div",{className:"f-item",children:[(0,$c.jsxs)("button",{type:"button",className:"f-q","aria-expanded":L===t,onClick:()=>R(L===t?null:t),children:[e.q,(0,$c.jsx)("span",{className:"f-plus",children:"+"})]}),(0,$c.jsx)("div",{className:"f-a"+(L===t?" open":""),children:(0,$c.jsx)("p",{children:e.a})})]},e.q))})]}),(0,$c.jsxs)(mp,{ref:T,children:[(0,$c.jsxs)("div",{className:`lw-serif ${P}`,children:["B\xf6rja med en enda faktura.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Resten sk\xf6ter vakten."})]}),(0,$c.jsx)("br",{}),(0,$c.jsx)(vs,{className:`lw-cta ${P}`,to:"/testa-faktura",children:"Testa med en faktura \u2192"}),(0,$c.jsx)("div",{className:"lw-sign",children:"Finansiell intelligens som aldrig sover."})]}),(0,$c.jsx)(vu,{})]})}const kp={shield:(0,$c.jsx)("path",{d:"M12 2.5l8 3v6.5c0 4.6-3.3 8.7-8 9.5-4.7-.8-8-4.9-8-9.5V5.5l8-3z"}),bolt:(0,$c.jsx)("path",{d:"M13 2L4 14h7l-1 8 9-12h-7l1-8z"}),phone:(0,$c.jsx)("path",{d:"M5 3h4l2 5-3 2c1.4 2.8 3.7 5.1 6.5 6.5l2-3 5 2v4c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2z"}),wifi:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M2 8.8a14 14 0 0120 0"}),(0,$c.jsx)("path",{d:"M5 12.6a9 9 0 0114 0"}),(0,$c.jsx)("path",{d:"M8.5 16.4a4 4 0 017 0"}),(0,$c.jsx)("circle",{cx:"12",cy:"20",r:"1"})]}),card:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),(0,$c.jsx)("path",{d:"M2 10h20"})]}),file:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$c.jsx)("path",{d:"M14 2v6h6"})]}),briefcase:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2"}),(0,$c.jsx)("path",{d:"M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"})]}),truck:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M1 3h15v13H1z"}),(0,$c.jsx)("path",{d:"M16 8h4l3 3v5h-7z"}),(0,$c.jsx)("circle",{cx:"6",cy:"18.5",r:"2"}),(0,$c.jsx)("circle",{cx:"18",cy:"18.5",r:"2"})]}),arrow:(0,$c.jsx)("path",{d:"M5 12h14M13 6l6 6-6 6"}),check:(0,$c.jsx)("path",{d:"M5 12l5 5L20 7"}),upload:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$c.jsx)("path",{d:"M14 2v6h6"}),(0,$c.jsx)("path",{d:"M12 17v-5M9.5 14.5L12 12l2.5 2.5"})]}),spark:(0,$c.jsx)("path",{d:"M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"}),lock:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("rect",{x:"4",y:"11",width:"16",height:"11",rx:"2"}),(0,$c.jsx)("path",{d:"M8 11V7a4 4 0 018 0v4"})]}),fortnox:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"}),(0,$c.jsx)("path",{d:"M8 8h8M8 12h8M8 16h5"})]}),bankid:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M5 3h14v18H5z"}),(0,$c.jsx)("path",{d:"M9 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2"})]}),trend:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M3 17l6-6 4 4 8-8"}),(0,$c.jsx)("path",{d:"M14 7h7v7"})]}),"alert-circle":(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,$c.jsx)("path",{d:"M12 8v4"}),(0,$c.jsx)("path",{d:"M12 16h.01"})]}),pulse:(0,$c.jsx)("path",{d:"M2 13h4l2.5-7 4 14 2.5-7H22"}),benchmark:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M3 20h18"}),(0,$c.jsx)("path",{d:"M6.5 20v-4.5"}),(0,$c.jsx)("path",{d:"M11 20v-10"}),(0,$c.jsx)("path",{d:"M15.5 20v-6.5"}),(0,$c.jsx)("path",{d:"M20 20v-13"})]}),"chevron-down":(0,$c.jsx)("path",{d:"M6 9l6 6 6-6"}),"calendar-clock":(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("path",{d:"M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6.5"}),(0,$c.jsx)("path",{d:"M16 2v4M8 2v4M3 10h18"}),(0,$c.jsx)("circle",{cx:"17.5",cy:"17.5",r:"4.5"}),(0,$c.jsx)("path",{d:"M17.5 15.6v2l1.4 1"})]})},yp=e=>{let{name:t,size:r=20,stroke:n=1.6,color:a="currentColor",fill:i="none",...o}=e;const s=kp[t];return s?(0,$c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:r,viewBox:"0 0 24 24",fill:i,stroke:a,strokeWidth:n,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...o,children:s}):null},jp=jc`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,wp=vc.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 60%),
    radial-gradient(circle at 0% 100%, ${e=>{let{theme:t}=e;return t.color.accentSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,Sp=vc.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`,$p=vc.div`
  width: 100%;
  max-width: 640px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  animation: ${jp} 0.5s ease both;
  @media (max-width: 600px) { padding: 32px 24px; }
`,Np=vc.div`
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
`,Ep=vc.h1`
  margin-top: 14px;
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
`,_p=vc.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,zp=(vc.div`
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
`),Cp=vc.div`
  padding: 20px 22px;
  background: ${e=>{let{theme:t,$allow:r}=e;return r?"rgba(27, 122, 110, 0.05)":t.color.surface}};
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
    color: ${e=>{let{theme:t,$allow:r}=e;return r?t.color.brand:t.color.muted}};
    margin-bottom: 16px;
  }
  span.head div.dot {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: ${e=>{let{theme:t,$allow:r}=e;return r?t.color.brand:"rgba(14, 26, 23, 0.12)"}};
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
    color: ${e=>{let{theme:t,$allow:r}=e;return r?t.color.ink:t.color.muted}};
    line-height: 1.35;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  ul li svg {
    flex-shrink: 0;
    color: ${e=>{let{theme:t,$allow:r}=e;return r?t.color.brand:t.color.muted}};
    opacity: ${e=>{let{$allow:t}=e;return t?1:.45}};
  }
`,Ap=vc.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  svg { color: ${e=>{let{theme:t}=e;return t.color.brand}}; opacity: 0.7; }
`,Dp=vc.div`
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
`,Fp=(vc.div`
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
`),Op=vc.div`
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
`,Tp=vc.div`
  margin-top: 24px;
`,Pp=vc.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin-bottom: 10px;
`,Lp=vc.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`,Rp=vc.label`
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
`,Ip=vc.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Bp=vc.button`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1.5px solid ${e=>{let{theme:t,$active:r}=e;return r?t.color.brand:t.color.border}};
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
`,Mp=(vc.ul`
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
`),Vp=vc.p`
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
`,Up=vc.label`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 12px;
  align-items: start;
  padding: 14px 16px;
  border: 1px solid ${e=>{let{theme:t,$error:r}=e;return r?t.color.danger:t.color.borderStrong}};
  background: ${e=>{let{theme:t,$error:r}=e;return r?t.color.dangerSoft:t.color.surface}};
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
`,Kp=vc.p`
  margin-top: 8px;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  display: flex;
  align-items: center;
  gap: 6px;
`,Hp=jc`
  to { transform: rotate(360deg); }
`,Wp=vc.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${Hp} 0.7s linear infinite;
`,qp=()=>{const e=po(),[t,r]=(0,n.useState)("fortnox"),[a,i]=(0,n.useState)(!1),[o,s]=(0,n.useState)(!1),[l,d]=(0,n.useState)(!1),[c,u]=(0,n.useState)(!1),[p,m]=(0,n.useState)("konsult"),[f,h]=(0,n.useState)(5);return(0,$c.jsxs)(wp,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsx)(Sp,{children:(0,$c.jsxs)($p,{children:[(0,$c.jsxs)(Np,{children:[(0,$c.jsx)("span",{className:"dot"})," Steg 1 av 3 \xb7 Anslut bokf\xf6ring"]}),(0,$c.jsx)(Ep,{children:"Koppla din bokf\xf6ring"}),(0,$c.jsx)(_p,{children:"60 sekunders koppling via Fortnox eller Visma \u2014 och du kan st\xe4nga av den lika snabbt."}),(0,$c.jsxs)(zp,{children:[(0,$c.jsxs)(Cp,{$allow:!0,children:[(0,$c.jsxs)("span",{className:"head",children:[(0,$c.jsx)("div",{className:"dot",children:"\u2713"})," Vi l\xe4ser"]}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor (konton 4xxx\u20137xxx)"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:14,stroke:2.4})," Avtalskategorier & f\xf6rfallodatum"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:14,stroke:2.4})," Belopp & betalningshistorik"]})]})]}),(0,$c.jsxs)(Cp,{children:[(0,$c.jsxs)("span",{className:"head",children:[(0,$c.jsx)("div",{className:"dot",children:"\u2717"})," Vi l\xe4ser inte"]}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"lock",size:14,stroke:2})," Kundfakturor & int\xe4kter"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"lock",size:14,stroke:2})," L\xf6nedata & personnummer"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"lock",size:14,stroke:2})," Bankkonton & kassafl\xf6de"]})]})]})]}),(0,$c.jsxs)(Dp,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4})}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"V\xe5rt l\xf6fte \u2014 hittar vi inga \xf6verpriser p\xe5 30 dagar?"}),(0,$c.jsx)("span",{children:"D\xe5 \xe4r ditt bolag redan optimerat. Vi raderar Fortnox-kopplingen och all din data automatiskt \u2014 du har inte betalat en krona."})]})]}),(0,$c.jsxs)(Tp,{children:[(0,$c.jsx)(Pp,{children:"Ber\xe4tta lite om bolaget"}),(0,$c.jsxs)(Lp,{children:[(0,$c.jsxs)(Rp,{children:[(0,$c.jsx)("span",{className:"label",children:"Bransch"}),(0,$c.jsxs)("select",{value:p,onChange:e=>m(e.target.value),children:[(0,$c.jsx)("option",{value:"ehandel",children:"E-handel & Detaljhandel"}),(0,$c.jsx)("option",{value:"tillverkning",children:"Industri & Tillverkning"}),(0,$c.jsx)("option",{value:"it-tech",children:"IT, Tech & Mjukvara"}),(0,$c.jsx)("option",{value:"bygg",children:"Bygg, Hantverk & Fastighet"}),(0,$c.jsx)("option",{value:"hotell",children:"Hotell, Restaurang & Event"}),(0,$c.jsx)("option",{value:"konsult",children:"Konsult & F\xf6retagstj\xe4nster"}),(0,$c.jsx)("option",{value:"transport",children:"Transport & Logistik"}),(0,$c.jsx)("option",{value:"vard",children:"V\xe5rd, Omsorg & H\xe4lsa"}),(0,$c.jsx)("option",{value:"ovrigt",children:"\xd6vrigt / Annan bransch"})]})]}),(0,$c.jsxs)(Rp,{children:[(0,$c.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$c.jsx)("input",{type:"number",min:"1",max:"5000",value:f,onChange:e=>h(Number(e.target.value))})]})]})]}),(0,$c.jsxs)(Ip,{children:[(0,$c.jsxs)(Bp,{$active:"fortnox"===t,onClick:()=>r("fortnox"),children:[(0,$c.jsx)("span",{className:"badge",children:"Vanligast"}),(0,$c.jsx)(yp,{name:"fortnox",size:22,color:"#0F5132"}),(0,$c.jsx)("strong",{children:"Fortnox"}),(0,$c.jsx)("span",{children:"Direkt OAuth-koppling"})]}),(0,$c.jsxs)(Bp,{$active:"visma"===t,onClick:()=>r("visma"),children:[(0,$c.jsx)("span",{className:"badge",children:"Inom kort"}),(0,$c.jsx)(yp,{name:"fortnox",size:22,color:"#0F5132"}),(0,$c.jsx)("strong",{children:"Visma eEkonomi"}),(0,$c.jsx)("span",{children:"Lanseras inom kort"})]})]}),(0,$c.jsxs)(Fp,{children:[(0,$c.jsxs)(Op,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(yp,{name:"bankid",size:16,stroke:2})}),(0,$c.jsx)("strong",{children:"BankID"}),(0,$c.jsx)("span",{children:"S\xe4ker identifiering"})]}),(0,$c.jsxs)(Op,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(yp,{name:"shield",size:16,stroke:2})}),(0,$c.jsx)("strong",{children:"GDPR"}),(0,$c.jsx)("span",{children:"Bitr\xe4desavtal & registerf\xf6rteckning publicerade"})]}),(0,$c.jsxs)(Op,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(yp,{name:"lock",size:16,stroke:2})}),(0,$c.jsx)("strong",{children:"AES-256"}),(0,$c.jsx)("span",{children:"Krypterad i vila & i transport"})]}),(0,$c.jsxs)(Op,{children:[(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.2})}),(0,$c.jsx)("strong",{children:"EU/EES + SCC"}),(0,$c.jsx)("span",{children:"Varje bitr\xe4de namngivet i policyn"})]})]}),(0,$c.jsxs)(Up,{$error:c&&!l,children:[(0,$c.jsx)("input",{type:"checkbox",checked:l,onChange:e=>{d(e.target.checked),e.target.checked&&u(!1)},"aria-describedby":"consent-text"}),(0,$c.jsxs)("span",{className:"text",id:"consent-text",children:["Jag accepterar ",(0,$c.jsx)(vs,{to:"/villkor",children:"de allm\xe4nna villkoren"})," och"," ",(0,$c.jsx)(vs,{to:"/integritet",children:"integritetspolicyn"})," och bekr\xe4ftar att jag har beh\xf6righet att utf\xe4rda fullmakt f\xf6r f\xf6retaget."]})]}),c&&!l&&(0,$c.jsxs)(Kp,{children:[(0,$c.jsx)(yp,{name:"lock",size:12,stroke:2.4}),"Du m\xe5ste godk\xe4nna villkoren innan du g\xe5r vidare."]}),o&&(0,$c.jsxs)(Kp,{as:"div",style:{background:"rgba(27,122,110,0.08)",color:"#1B7A6E"},children:[(0,$c.jsx)(yp,{name:"check",size:12,stroke:2.4}),"Visma-kopplingen lanseras inom kort \u2014 vi har noterat ert intresse och h\xf6r av oss. Tills dess: ",(0,$c.jsx)(vs,{to:"/testa-faktura",style:{color:"#1B7A6E",fontWeight:600},children:"analysera en faktura direkt"}),"."]}),(0,$c.jsxs)(Mp,{children:[(0,$c.jsx)(Bc,{$variant:"gradient",$size:"lg",onClick:()=>{if(l){if("fortnox"===t){i(!0);const e=new URLSearchParams({industry:p,employees:String(f)});return void(window.location.href=`/api/fortnox/auth?${e}`)}fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:"visma_connect",industry:p,employees:f})}).catch(()=>{}),s(!0)}else u(!0)},disabled:a,$full:!0,children:a?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Wp,{})," Ansluter till ","fortnox"===t?"Fortnox":"Visma","\u2026"]}):(0,$c.jsxs)($c.Fragment,{children:["Anslut ","fortnox"===t?"Fortnox":"Visma"," ",(0,$c.jsx)(yp,{name:"arrow",size:18})]})}),(0,$c.jsxs)(Ap,{children:[(0,$c.jsx)(yp,{name:"lock",size:12,stroke:2.2}),"Du skickas nu till ","fortnox"===t?"Fortnox":"Visma"," f\xf6r att godk\xe4nna l\xe4s\xe5tkomst. Inga \xe4ndringar g\xf6rs i din bokf\xf6ring."]}),(0,$c.jsx)(Bc,{$variant:"ghost",$size:"md",onClick:()=>e("/"),children:"Tillbaka"})]}),(0,$c.jsxs)(Vp,{children:["L\xe4s ",(0,$c.jsx)(vs,{to:"/villkor",style:{textDecoration:"underline"},children:"allm\xe4nna villkoren"}),", v\xe5r ",(0,$c.jsx)(vs,{to:"/integritet",style:{textDecoration:"underline"},children:"integritetspolicy"})," ","och ",(0,$c.jsx)(vs,{to:"/cookies",style:{textDecoration:"underline"},children:"cookie-policy"}),"."]})]})})]})},Gp=jc`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Yp=vc.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,Jp=vc.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 96px 28px 56px;
  text-align: center;
  animation: ${Gp} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 32px; }
`,Qp=vc.span`
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
`,Xp=vc.h1`
  margin-top: 22px;
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,Zp=vc.p`
  margin: 22px auto 0;
  max-width: 640px;
  font-size: 18px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.55;
`,em=vc.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 28px;
  @media (max-width: 740px) { padding: 32px 20px; }
`,tm=vc.div`
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
`,rm=(vc.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,vc.div`
  background: ${e=>{let{theme:t,$highlight:r}=e;return r?t.color.brand:t.color.surface}};
  color: ${e=>{let{theme:t,$highlight:r}=e;return r?"#FAFAF7":t.color.ink}};
  border: 1px solid ${e=>{let{theme:t,$highlight:r}=e;return r?t.color.brand:t.color.border}};
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
    background: ${e=>{let{theme:t,$highlight:r}=e;return r?"rgba(255,255,255,0.15)":t.color.surfaceAlt}};
    color: ${e=>{let{theme:t,$highlight:r}=e;return r?"#FAFAF7":t.color.muted}};
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
    color: ${e=>{let{theme:t,$highlight:r}=e;return r?t.color.accent:t.color.brand}};
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
`,am=vc.p`
  font-size: 16.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 640px;
  line-height: 1.55;
  margin-bottom: 32px;
`,im=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
`,om=vc.div`
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
`,sm=vc.section`
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
`,lm=[{cat:"Elavtal",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"Mobilabonnemang",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"F\xf6retagsbredband",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"Programvara / SaaS",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"Kortterminal",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"Fakturatj\xe4nst",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"L\xf6neadministration",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"F\xf6retagsf\xf6rs\xe4kring",detail:"Arvo bev\xe4pnar er med exakt motbud",pay:"Ing\xe5r i prenumerationen"},{cat:"F\xf6retagsleasing",detail:"Arvo bev\xe4pnar er med exakt motbud",pay:"Ing\xe5r i prenumerationen"}],dm=()=>(0,$c.jsxs)(Yp,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(Jp,{children:[(0,$c.jsxs)(Qp,{children:[(0,$c.jsx)("span",{className:"dot"})," Rankningspolicy \xb7 Senast uppdaterad 2026-04-24"]}),(0,$c.jsxs)(Xp,{children:["Vi rankar leverant\xf6rer p\xe5 ",(0,$c.jsx)("em",{children:"din"})," totalkostnad \u2014 inte v\xe5r provision."]}),(0,$c.jsx)(Zp,{children:'Det h\xe4r \xe4r hela v\xe5r policy. Inga undantag, inga gr\xe5zoner, inga "premium-partners". Om en journalist en dag granskar oss vill vi att de hittar exakt det vi skrev h\xe4r.'})]}),(0,$c.jsxs)(em,{children:[(0,$c.jsx)(nm,{children:"De fyra reglerna"}),(0,$c.jsx)(rm,{children:"Hur vi f\xf6rhindrar bias fr\xe5n dag 1."}),(0,$c.jsxs)(am,{children:["Provision fr\xe5n leverant\xf6rer \xe4r en uppenbar intressekonflikt mot kunden. ","Vi l\xf6ste den inte med tak eller l\xf6ften \u2014 vi tog bort d\xf6rren helt. Arvo tar aldrig en krona fr\xe5n en leverant\xf6r."]}),(0,$c.jsxs)(tm,{children:[(0,$c.jsx)("div",{className:"num",children:"1"}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("h3",{children:"V\xe5r algoritm \xe4r publik. Och f\xf6ruts\xe4gbar."}),(0,$c.jsxs)("p",{children:["Vi rankar varje f\xf6rslag p\xe5 ",(0,$c.jsx)("strong",{children:"vad det kostar er totalt \xf6ver tv\xe5 \xe5r \u2014 minus vad sj\xe4lva bytet kostar"}),". Den som ger er flest kronor kvar p\xe5 kontot vinner \u2014 alltid. Vad en leverant\xf6r skulle vilja betala oss r\xe4knas aldrig in: de betalar oss aldrig n\xe5got."]}),(0,$c.jsxs)("pre",{children:["score(provider) =\n    annualCost(provider) * 2\n  + switchingCost(provider)        // eng\xe5ngskostnader, etablering, portering\n  - reliabilityBonus(provider)     // SLA, supportkvalitet (publik benchmark)\n  - coverageMatch(provider)        // % av nuvarande t\xe4ckning som beh\xe5lls\n\n",(0,$c.jsx)("b",{children:"// Vad en leverant\xf6r betalar oss \xe4r aldrig en variabel \u2014 de betalar oss aldrig n\xe5got.\n// L\xe4gst score vinner. Vid lika: l\xe4gst pris f\xf6r er."})]})]})]}),(0,$c.jsxs)(tm,{children:[(0,$c.jsx)("div",{className:"num",children:"2"}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("h3",{children:"Noll kronor fr\xe5n leverant\xf6rer. Inget tak \u2014 f\xf6r det finns inget att kapa."}),(0,$c.jsxs)("p",{children:["Arvo tar aldrig en kickback, provision eller partner-avgift fr\xe5n en leverant\xf6r ","\u2014 inte nu, inte kapat, aldrig. V\xe5r enda int\xe4kt \xe4r success fee fr\xe5n dig. Vi kan inte k\xf6pas, f\xf6r det finns ingen d\xf6rr in. I samma sekund vi tj\xe4nade en krona p\xe5 att styra dig mot en leverant\xf6r vore v\xe5r oberoende r\xf6st d\xf6d \u2014 och med den hela v\xe5rt existensber\xe4ttigande."]})]})]}),(0,$c.jsxs)(tm,{children:[(0,$c.jsx)("div",{className:"num",children:"3"}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("h3",{children:"Ett erbjudande. Inga val, inga kr\xe5ngel."}),(0,$c.jsxs)("p",{children:["Vi tar ",(0,$c.jsx)("strong",{children:"20 % av realiserad besparing"})," \u2014 och fakturerar f\xf6rst n\xe4r besparingen faktiskt syns i dina egna b\xf6cker (den gamla leverant\xf6rsraden f\xf6rsvinner, den nya dyker upp). Aldrig p\xe5 en siffra vi bara gissat. Landar ingen besparing kostar Switch ingenting. Det \xe4r det enda du beh\xf6ver godk\xe4nna."]})]})]}),(0,$c.jsxs)(tm,{children:[(0,$c.jsx)("div",{className:"num",children:"4"}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("h3",{children:"Vi publicerar v\xe5r rekommendationsstatistik kvartalsvis."}),(0,$c.jsx)("p",{children:"Varje kvartal publiceras hur ofta varje leverant\xf6r rekommenderas och hur mycket besparing som faktiskt realiserats hos v\xe5ra kunder. Inga affiliate-utbetalningar att redovisa \u2014 det finns inga. Granska oss. Det g\xf6r branschen \xe4rligare."})]})]})]}),(0,$c.jsxs)(em,{children:[(0,$c.jsx)(nm,{children:"Vad vi g\xf6r \u2014 och hur vi betalas \u2014 per kategori"}),(0,$c.jsx)(rm,{children:"Olika kategorier, olika mekanik. Samma int\xe4kt: bara fr\xe5n dig."}),(0,$c.jsx)(am,{children:"I vissa kategorier genomf\xf6r vi bytet, i andra f\xf6rbereder vi det, i n\xe5gra bev\xe4pnar vi dig att agera sj\xe4lv. Vi lovar bara den mekanik vi \xe4ger \u2014 och tar betalt bara p\xe5 besparing som landat."}),(0,$c.jsxs)(im,{children:[(0,$c.jsxs)(om,{className:"header",children:[(0,$c.jsx)("div",{children:"Kategori"}),(0,$c.jsx)("div",{children:"Vad Arvo g\xf6r"}),(0,$c.jsx)("div",{style:{textAlign:"right"},children:"Hur vi betalas"})]}),lm.map(e=>(0,$c.jsxs)(om,{children:[(0,$c.jsx)("div",{className:"cat",children:e.cat}),(0,$c.jsx)("div",{className:"detail",children:e.detail}),(0,$c.jsx)("div",{className:"cap",children:e.pay})]},e.cat))]})]}),(0,$c.jsxs)(sm,{children:[(0,$c.jsx)("h2",{children:"Det h\xe4r \xe4r inte marknadsf\xf6ring. Det h\xe4r \xe4r arkitektur."}),(0,$c.jsxs)("p",{children:["Om du uppt\xe4cker att vi bryter mot n\xe5gon av reglerna ovan \u2014 mejla"," ",(0,$c.jsx)("a",{href:"mailto:transparens@arvo.flow",style:{textDecoration:"underline"},children:"transparens@arvo.flow"}),". Vi svarar inom 48 h, publikt."]}),(0,$c.jsxs)("div",{className:"actions",children:[(0,$c.jsxs)(Bc,{as:vs,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$c.jsx)(yp,{name:"arrow",size:18})]}),(0,$c.jsx)(Bc,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$c.jsx)(vu,{})]}),cm=jc`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,um=vc.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,pm=vc.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 28px 40px;
  text-align: center;
  animation: ${cm} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 28px; }
`,mm=vc.span`
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
`,fm=vc.h1`
  margin-top: 22px;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,hm=vc.p`
  margin: 22px auto 0;
  max-width: 600px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,gm=vc.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 28px 64px;
  @media (max-width: 740px) { padding: 24px 20px 48px; }
`,xm=vc.div`
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
`,vm=vc.section`
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
`,bm=(vc.div`
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
`),km=vc.section`
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
`,ym=(vc.span`
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
`),jm=vc.p`
  font-size: 15.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin-bottom: 20px;
`,wm=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
  margin: 16px 0 8px;
`,Sm=vc.div`
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
`,$m=()=>(0,$c.jsxs)(um,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(pm,{children:[(0,$c.jsxs)(mm,{children:[(0,$c.jsx)("span",{className:"dot"})," Allm\xe4nna villkor \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$c.jsxs)(fm,{children:["Klart, kort och ",(0,$c.jsx)("em",{children:"p\xe5 din sida"}),"."]}),(0,$c.jsx)(hm,{children:"Det h\xe4r \xe4r hela avtalet mellan dig och Arvo Flow (verksamhet under bildande; juridisk person uppdateras h\xe4r vid registrering). Inga fasta avgifter, inga uppstartsavgifter, ingen inl\xe5sning. Vi tj\xe4nar pengar bara n\xe4r du faktiskt sparar."})]}),(0,$c.jsxs)(gm,{children:[(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h2",{children:"Sammanfattning"}),(0,$c.jsx)("p",{className:"intro",children:"Det h\xe4r beh\xf6ver du veta innan du signerar med BankID:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Ombudskap."})," Arvo Flow agerar som ditt f\xf6retags ombud f\xf6r att optimera och ing\xe5 avtal inom el, telefoni, bredband, f\xf6rs\xe4kring och leasing. Vi verifierar din beh\xf6righet mot Bolagsverket i realtid."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Besparingsarvode."})," Vi tar ingen fast avgift. V\xe5rt arvode \xe4r 20 % av besparingsunderlaget (skillnaden mellan ditt nya och ditt gamla avtal) under de f\xf6rsta 12 m\xe5naderna efter ett byte."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"\xc5ngerr\xe4tt."})," Du har 24 timmars \xe5ngerr\xe4tt fr\xe5n BankID-signering innan vi p\xe5b\xf6rjar skarpa byten hos leverant\xf6rerna."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Ingen inl\xe5sning."})," Du kan s\xe4ga upp Arvo Flow-tj\xe4nsten n\xe4r som helst med 30 dagars upps\xe4gningstid."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Datas\xe4kerhet."})," Vi l\xe4ser endast n\xf6dv\xe4ndig fakturadata via Fortnox. Vid avslut raderas din transaktionsdata inom 24 timmar."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Trygghet."})," V\xe5rt skadest\xe5ndsansvar \xe4r begr\xe4nsat till 12 m\xe5naders betalda avgifter, dock l\xe4gst 50 000 SEK."]})]})]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"1. Definitioner"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"1.1 Tj\xe4nsten."})," Den digitala plattformen Arvo Flow samt tillh\xf6rande ombudstj\xe4nster f\xf6r att optimera Kundens leverant\xf6rsavtal."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"1.2 Besparingsunderlag."})," Det belopp som ligger till grund f\xf6r Besparingsavgiften, motsvarande skillnaden i avtalskostnad exkl. moms \xf6ver en 12-m\xe5nadersperiod mellan Kundens tidigare avtal och det nya avtalet."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"1.3 Besparingsarvode."})," Det r\xf6rliga arvode om 20 % av Besparingsunderlaget som tillfaller Arvo Flow, fakturerat efter Kundens f\xf6rsta faktura fr\xe5n den nya leverant\xf6ren."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"2. Uppdraget och Fullmakt"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"2.1"})," Genom signering via BankID ger Kunden Arvo Flow fullmakt att inh\xe4mta uppgifter, s\xe4ga upp befintliga avtal samt ing\xe5 nya avtal f\xf6r Kundens r\xe4kning inom de kategorier Kunden aktiverat i Tj\xe4nsten."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"2.2 \xc5ngerfrist."})," Kunden har r\xe4tt att \xe5terkalla sin accept av dessa villkor inom 24 timmar fr\xe5n signering. Under \xe5ngerfristen p\xe5b\xf6rjar Arvo Flow inga skarpa upps\xe4gningar eller avtalstecknanden hos tredje part."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"3. Arvode och Betalning"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"3.1"})," Tj\xe4nsten baseras p\xe5 realiserad besparing \u2014 den skillnad som faktiskt uppst\xe5r mellan tidigare och nytt avtal. Inga fasta avgifter, uppstartsavgifter eller licensavgifter utg\xe5r."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"3.2"})," Besparingsavgiften faktureras som en eng\xe5ngsavgift, 3 m\xe5nader efter att det nya avtalet aktiverats. Fr.o.m. \xe5r 2 tillfaller hela besparingen Kunden."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"3.3 F\xf6rtida avslut av leverant\xf6rsavtal."})," Om Kunden v\xe4ljer att avsluta ett av Arvo Flow tecknat leverant\xf6rsavtal i f\xf6rtid, eller p\xe5 annat s\xe4tt f\xf6rhindrar Tj\xe4nstens utf\xf6rande, f\xf6rfaller Besparingsavgiften i sin helhet. Detta g\xe4ller ej om Kunden avbryter samarbetet p\xe5 grund av v\xe4sentligt avtalsbrott fr\xe5n Arvo Flows sida."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"4. Beh\xf6righet och Upps\xe4gning av Tj\xe4nsten"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"4.1 Firmateckningsverifiering."})," Arvo Flow verifierar via BankID-signaturens personnummer mot Bolagsverkets aktuella firmatecknarregister. Avtal ing\xe5s endast om verifieringen godk\xe4nns."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"4.2 Upps\xe4gning."})," Avtalet l\xf6per tills vidare. B\xe5da parter kan s\xe4ga upp Tj\xe4nsten med 30 dagars upps\xe4gningstid. Redan p\xe5b\xf6rjade avtalsbyten slutf\xf6rs och debiteras enligt avtal."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"5. Ansvarsbegr\xe4nsning och Risksenarier"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"5.1 Missad upps\xe4gning."})," Om Arvo Flow missar att s\xe4ga upp ett befintligt avtal i tid, ers\xe4tter Arvo Flow mellanskillnaden upp till vid var tid g\xe4llande ansvarstak."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"5.2 Dubbel-leverans."})," Om Kunden under en period har tv\xe5 parallella leverant\xf6rsavtal f\xf6r samma tj\xe4nst till f\xf6ljd av fel fr\xe5n Arvo Flow, meddelar Kunden Arvo Flow, varvid Arvo Flow krediterar framtida avgifter eller, efter Kundens \xf6nskem\xe5l, utf\xf6r \xe5terbetalning inom 30 dagar."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"5.3 Ansvarstak."})," Arvo Flows totala skadest\xe5ndsansvar \xe4r begr\xe4nsat till ett belopp motsvarande 100 % av de senaste 12 m\xe5nadernas betalda Besparingsavgifter, dock l\xe4gst 50 000 SEK. Arvo Flow ansvarar ej f\xf6r indirekta skador s\xe5som utebliven vinst, produktionsbortfall eller goodwill-skada."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"6. Force Majeure"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"6.1"})," Arvo Flow \xe4r befriat fr\xe5n p\xe5f\xf6ljd vid underl\xe5tenhet orsakad av pandemi, krig, cyberattack, myndighetsbeslut eller fel hos tredjepartsleverant\xf6r (t.ex. BankID, Fortnox, Visma eller leverant\xf6r vars system Tj\xe4nsten \xe4r beroende av) som ligger utanf\xf6r Arvo Flows kontroll."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"7. Data och Tvist"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"7.1 Personuppgifter."})," Personuppgiftsbehandling regleras i separat Personuppgiftsbitr\xe4desavtal (DPA), tillg\xe4nglig som bilaga till"," ",(0,$c.jsx)(vs,{to:"/integritet",children:"v\xe5r integritetspolicy"}),"."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"7.2 Tvist."})," Tvister med anledning av dessa villkor avg\xf6rs i Stockholms tingsr\xe4tt enligt svensk lag."]})]}),(0,$c.jsxs)(bm,{children:[(0,$c.jsx)("strong",{children:"Arvo Flow"})," \xb7 verksamhet under bildande \xb7 Stockholm \xb7 Allm\xe4nna villkor v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$c.jsx)("br",{}),"Tidigare versioner finns tillg\xe4ngliga p\xe5 beg\xe4ran fr\xe5n"," ",(0,$c.jsx)("a",{href:"mailto:juridik@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"juridik@arvo.flow"}),"."]})]}),(0,$c.jsxs)(km,{children:[(0,$c.jsx)("h2",{children:"Fr\xe5gor p\xe5 villkoren?"}),(0,$c.jsxs)("p",{children:["Mejla ",(0,$c.jsx)("a",{className:"mail",href:"mailto:juridik@arvo.flow",children:"juridik@arvo.flow"})," s\xe5 svarar vi inom 48 h. Vi har en svensk aff\xe4rsjurist som granskat varje klausul."]}),(0,$c.jsxs)("div",{className:"actions",children:[(0,$c.jsxs)(Bc,{as:vs,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$c.jsx)(yp,{name:"arrow",size:18})]}),(0,$c.jsx)(Bc,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$c.jsx)(vu,{})]}),Nm=()=>(0,$c.jsxs)(um,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(pm,{children:[(0,$c.jsxs)(mm,{children:[(0,$c.jsx)("span",{className:"dot"})," Integritetspolicy & DPA \xb7 Version 1.4 \xb7 Senast uppdaterad 2026-05-19"]}),(0,$c.jsxs)(fm,{children:["Du ",(0,$c.jsx)("em",{children:"\xe4ger"})," din data. Vi f\xf6rvaltar den."]}),(0,$c.jsx)(hm,{children:"Vi l\xe4ser bara den fakturadata vi beh\xf6ver f\xf6r att hitta \xf6verpriser \u2014 inget annat. Vid avslut raderas allt inom 24 timmar. Det h\xe4r \xe4r hur, var och varf\xf6r."})]}),(0,$c.jsxs)(gm,{children:[(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h2",{children:"Sammanfattning"}),(0,$c.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller f\xf6r dig som kund hos Arvo Flow:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Vi l\xe4ser endast leverant\xf6rsfakturor"})," via Fortnox eller Visma \u2014 inte kundfakturor, l\xf6ner, bankkonton eller personnummer p\xe5 anst\xe4llda."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Faktura-PDF:er lagras aldrig."})," Vi extraherar den data vi beh\xf6ver och kastar filen direkt \u2014 noll persistent lagring av PDF-inneh\xe5ll hos Arvo Flow. By design."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Data lagras i EU/EES"})," eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer (Standard Contractual Clauses). Krypterad i vila (AES-256) och i transport (TLS 1.3)."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Du kan n\xe4r som helst"})," beg\xe4ra utdrag, r\xe4ttelse eller radering av dina personuppgifter via ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Vid avslut"})," raderas all transaktionsdata inom 24 timmar. Bokf\xf6ringsm\xe4ssiga underlag (fakturor p\xe5 v\xe5rt arvode) sparas i 7 \xe5r enligt bokf\xf6ringslagen."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Vi s\xe4ljer aldrig din data."})," Vi delar den heller inte med leverant\xf6rer, annons\xf6rer eller andra tredje parter \u2014 ut\xf6ver de vi \xe4r bundna till f\xf6r att leverera Tj\xe4nsten."]})]})]})]}),(0,$c.jsx)(ym,{children:"Integritetspolicy"}),(0,$c.jsx)(jm,{children:"Den h\xe4r policyn beskriver hur Arvo Flow (verksamhet under bildande) behandlar personuppgifter och f\xf6retagsuppgifter i samband med att vi levererar Tj\xe4nsten."}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"1. Personuppgiftsansvarig"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"Arvo Flow"})," (verksamhet under bildande; juridisk person uppdateras h\xe4r vid registrering) \xe4r personuppgiftsansvarig f\xf6r de uppgifter vi samlar in om dig som kund eller bes\xf6kare. Kontakt:"," ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$c.jsx)("p",{children:"F\xf6r personuppgifter som behandlas p\xe5 Kundens uppdrag (t.ex. namn p\xe5 Kundens kontaktpersoner och firmatecknare) \xe4r Arvo Flow personuppgiftsbitr\xe4de \u2014 se DPA l\xe4ngre ner."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"2. Vilka uppgifter vi behandlar"}),(0,$c.jsxs)(wm,{children:[(0,$c.jsxs)(Sm,{className:"header",children:[(0,$c.jsx)("div",{children:"Kategori"}),(0,$c.jsx)("div",{children:"Syfte & r\xe4ttslig grund"})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"F\xf6retagsuppgifter"}),(0,$c.jsxs)("div",{className:"v",children:["Organisationsnummer, bolagsnamn, registreringsdatum. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."]})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Firmatecknarens uppgifter"}),(0,$c.jsxs)("div",{className:"v",children:["Namn, personnummer (via BankID), beh\xf6righet enligt Bolagsverket. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"fullg\xf6rande av avtal"})," samt r\xe4ttslig f\xf6rpliktelse vid signering."]})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Kontaktuppgifter"}),(0,$c.jsxs)("div",{className:"v",children:["E-post, telefon, namn p\xe5 kontaktpersoner. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r kundkommunikation, ",(0,$c.jsx)("em",{children:"samtycke"})," f\xf6r marknadsf\xf6ring."]})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Leverant\xf6rsfakturor"}),(0,$c.jsxs)("div",{className:"v",children:["Belopp, leverant\xf6r, kategori, f\xf6rfallodatum, fakturarader. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."," ","Anonymiserade uppgifter (belopp, leverant\xf6r, kategori) anv\xe4nds \xe4ven f\xf6r att bygga Arvo Flows branschindex \u2014 se \xa7 4 nedan. R\xe4ttslig grund f\xf6r indexanv\xe4ndning: ",(0,$c.jsx)("em",{children:"ber\xe4ttigat intresse"}),"."]})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Faktura-PDF (uppladdning)"}),(0,$c.jsxs)("div",{className:"v",children:["PDF-filen konverteras till text i realtid via Anthropic API och raderas omedelbart \u2014 den lagras ",(0,$c.jsx)("strong",{children:"aldrig"})," p\xe5 Arvo Flows infrastruktur. Analysresultatet (extraherade siffror, inte PDF-inneh\xe5llet) cachas i 6 timmar f\xf6r att undvika on\xf6diga API-anrop. R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r Tj\xe4nstens leverans."]})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Tekniska data"}),(0,$c.jsxs)("div",{className:"v",children:["IP-adress, webbl\xe4sare, sidvisningar (anonymiserat). R\xe4ttslig grund: ",(0,$c.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r s\xe4kerhet och drift."]})]})]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsxs)("h3",{children:["3. Vad vi ",(0,$c.jsx)("em",{children:"inte"})," behandlar"]}),(0,$c.jsxs)("p",{children:["Vi har medvetet begr\xe4nsat datainsamlingen. Vi l\xe4ser ",(0,$c.jsx)("strong",{children:"aldrig"}),":"]}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:"Kundfakturor eller int\xe4ktsdata"}),(0,$c.jsx)("li",{children:"L\xf6nedata eller personnummer p\xe5 anst\xe4llda"}),(0,$c.jsx)("li",{children:"Bankkontosaldon eller transaktionshistorik"}),(0,$c.jsx)("li",{children:"Kundregister eller CRM-data"}),(0,$c.jsx)("li",{children:"Inneh\xe5llet i e-postkorrespondens"})]}),(0,$c.jsx)("p",{children:"OAuth-scopen mot Fortnox och Visma \xe4r konfigurerade s\xe5 att vi tekniskt inte ens kan l\xe4sa kategorierna ovan, \xe4ven om vi ville."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"4. Hur l\xe4nge vi sparar data"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Aktiv kund:"})," S\xe5 l\xe4nge avtalet l\xf6per."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Vid upps\xe4gning:"})," Transaktionsdata raderas inom 24 timmar."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Bokf\xf6ringsunderlag:"})," 7 \xe5r enligt bokf\xf6ringslagen (2 kap. 1 \xa7 BFL)."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Marknadsf\xf6ringssamtycke:"})," Tills du \xe5terkallar samtycket."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Faktura-PDF:"})," Lagras aldrig \u2014 raderas direkt efter AI-extraktering. Analysresultatet (JSON med siffror) cachas i 6 timmar, d\xe4refter auto-raderats."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Anonymiserad statistik (branschindex):"})," Belopp, leverant\xf6r och kategori fr\xe5n leverant\xf6rsfakturor anonymiseras och anv\xe4nds f\xf6r att ber\xe4kna marknadsmedian och prispercentiler per bransch och bolagsstorlek. Detta aggregerade index \xe4r grunden f\xf6r Tj\xe4nstens j\xe4mf\xf6relser och rekommendationer. Inga uppgifter kan h\xe4rledas till ett enskilt bolag. Sparas obegr\xe4nsat."]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Anthropic API (AI-behandling):"})," Data behandlas via Anthropic API med 30 dagars radering f\xf6r Trust & Safety, utan att anv\xe4ndas f\xf6r modelltr\xe4ning."]})]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"5. Var data lagras & s\xe4kerhet"}),(0,$c.jsx)("p",{children:"Behandlingen sker inom EU/EES och i USA. Underbitr\xe4dena \xe4r namngivna i avsnitt 7 med funktion och land; \xf6verf\xf6ringar till USA sker under EU-kommissionens standardavtalsklausuler (SCC). Vi driver i dag ingen egen serverhall \u2014 plattformarna nedan \xe4r v\xe5ra bitr\xe4den, och vi listar dem hellre \xe4n att sammanfatta dem."}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:"Kryptering i vila hos samtliga lagringsbitr\xe4den (Neon, Vercel KV)"}),(0,$c.jsx)("li",{children:"TLS f\xf6r all data\xf6verf\xf6ring"}),(0,$c.jsx)("li",{children:"Tv\xe5faktorautentisering f\xf6r all intern access"}),(0,$c.jsx)("li",{children:"Analysresultat cachas i h\xf6gst 6 timmar; Anthropic raderar API-data inom 30 dagar och tr\xe4nar inte modeller p\xe5 den"}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("em",{children:"Planerat, \xe4nnu ej i drift:"})," svensk hosting (Bahnhof), audit trail \xf6ver all access till kunddata, och \xe5rlig penetrationstest av oberoende part"]})]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"6. Dina r\xe4ttigheter (GDPR)"}),(0,$c.jsx)("p",{children:"Du har r\xe4tt att:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:["Beg\xe4ra ut ",(0,$c.jsx)("strong",{children:"registerutdrag"})," \xf6ver dina personuppgifter"]}),(0,$c.jsxs)("li",{children:["Beg\xe4ra ",(0,$c.jsx)("strong",{children:"r\xe4ttelse"})," av felaktiga uppgifter"]}),(0,$c.jsxs)("li",{children:["Beg\xe4ra ",(0,$c.jsx)("strong",{children:"radering"})," (r\xe4tten att bli gl\xf6md), inom de gr\xe4nser bokf\xf6ringslagen till\xe5ter"]}),(0,$c.jsxs)("li",{children:["Beg\xe4ra ",(0,$c.jsx)("strong",{children:"begr\xe4nsning"})," av behandling"]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)("strong",{children:"Inv\xe4nda"})," mot behandling som sker p\xe5 ber\xe4ttigat intresse"]}),(0,$c.jsxs)("li",{children:["F\xe5 ut din data i ett ",(0,$c.jsx)("strong",{children:"strukturerat, maskinl\xe4sbart format"})," (dataportabilitet)"]}),(0,$c.jsxs)("li",{children:["L\xe4mna in ",(0,$c.jsx)("strong",{children:"klagom\xe5l till Integritetsskyddsmyndigheten"})," (IMY)"]})]}),(0,$c.jsxs)("p",{children:["Kontakta ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," \u2014 vi svarar inom 30 dagar."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"7. Underbitr\xe4den"}),(0,$c.jsx)("p",{children:"Vi anv\xe4nder f\xf6ljande underbitr\xe4den f\xf6r att leverera Tj\xe4nsten. Samtliga \xe4r bundna av DPA och behandlar uppgifter inom EU/EES eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer:"}),(0,$c.jsxs)(wm,{children:[(0,$c.jsxs)(Sm,{className:"header",children:[(0,$c.jsx)("div",{children:"Leverant\xf6r"}),(0,$c.jsx)("div",{children:"Funktion & \xf6verf\xf6ringsmekanism"})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Anthropic PBC"}),(0,$c.jsx)("div",{className:"v",children:"AI-analys av faktura-PDF \u2014 USA. SCC. 30 dagars radering, tr\xe4nar ej modeller p\xe5 API-data."})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Vercel Inc."}),(0,$c.jsx)("div",{className:"v",children:"Serverless funktioner & KV-cache \u2014 USA/EU. SCC. Analysresultat cachas max 6 timmar."})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Neon Inc."}),(0,$c.jsx)("div",{className:"v",children:"Postgres-databas (leads, offertf\xf6rfr\xe5gningar, branschindex) \u2014 USA. SCC."})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Resend Inc."}),(0,$c.jsx)("div",{className:"v",children:"Transaktionell e-post (bekr\xe4ftelser, interna larm) \u2014 USA. SCC."})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Bahnhof AB"}),(0,$c.jsx)("div",{className:"v",children:"Hosting / databas (planerad, full produkt) \u2014 Sverige"})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Scrive AB"}),(0,$c.jsx)("div",{className:"v",children:"BankID-signering (planerad) \u2014 Sverige"})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Fortnox / Visma"}),(0,$c.jsx)("div",{className:"v",children:"OAuth-koppling till bokf\xf6ring (planerad) \u2014 Sverige"})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Stripe Payments Europe"}),(0,$c.jsx)("div",{className:"v",children:"Betalningar & fakturering (planerad) \u2014 Irland"})]})]})]}),(0,$c.jsx)(ym,{children:"Personuppgiftsbitr\xe4desavtal (DPA) \u2014 Bilaga"}),(0,$c.jsx)(jm,{children:"Detta avtal g\xe4ller automatiskt n\xe4r du som Kund tecknar Tj\xe4nsten. Det reglerar Arvo Flows behandling av personuppgifter p\xe5 Kundens uppdrag (t.ex. uppgifter om Kundens kontaktpersoner)."}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"1. Parter"}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"Personuppgiftsansvarig:"})," Kunden."]}),(0,$c.jsxs)("p",{children:[(0,$c.jsx)("strong",{children:"Personuppgiftsbitr\xe4de:"})," Arvo Flow (verksamhet under bildande)."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"2. Omfattning"}),(0,$c.jsx)("p",{children:"Bitr\xe4det behandlar personuppgifter (kontaktuppgifter, fakturarader, personnummer f\xf6r firmateckning) f\xf6r att utf\xf6ra Tj\xe4nsten enligt Allm\xe4nna villkor."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"3. Instruktion"}),(0,$c.jsxs)("p",{children:["Bitr\xe4det f\xe5r behandla uppgifter f\xf6r att (i) optimera avtal och fakturera enligt de ",(0,$c.jsx)(vs,{to:"/villkor",children:"Allm\xe4nna villkoren"}),", samt (ii) anonymisera och aggregera fakturauppgifter (belopp, leverant\xf6r, kategori) f\xf6r Tj\xe4nstens branschindex enligt \xa7 4 i Integritetspolicyn. Ytterligare instruktioner fr\xe5n Kunden ska vara skriftliga."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"4. S\xe4kerhet"}),(0,$c.jsx)("p",{children:"Bitr\xe4det ska vidta l\xe4mpliga tekniska och organisatoriska \xe5tg\xe4rder f\xf6r att skydda data mot oavsiktlig eller olaglig f\xf6rst\xf6relse, f\xf6rlust, \xe4ndring, obeh\xf6rigt r\xf6jande eller obeh\xf6rig \xe5tkomst (jfr GDPR art. 32). Detta inkluderar kryptering, \xe5tkomstkontroll, loggning och regelbunden s\xe4kerhetsgranskning enligt \xa7 5 i Integritetspolicyn ovan."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"5. Underbitr\xe4den"}),(0,$c.jsx)("p",{children:"Kunden godk\xe4nner att Bitr\xe4det anv\xe4nder underbitr\xe4den enligt listan under \xa7 7 i Integritetspolicyn. Bitr\xe4det ska underr\xe4tta Kunden vid byte av underbitr\xe4de, varvid Kunden har r\xe4tt att inv\xe4nda inom 30 dagar."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"6. Radering"}),(0,$c.jsx)("p",{children:"Vid upps\xe4gning av Tj\xe4nsten eller p\xe5 Kundens beg\xe4ran ska Bitr\xe4det radera eller anonymisera all transaktionsdata inom 24 timmar, s\xe5vida inte lag kr\xe4ver lagring (t.ex. bokf\xf6ringslagen f\xf6r fakturaunderlag)."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"7. Personuppgiftsincident"}),(0,$c.jsx)("p",{children:"Bitr\xe4det ska utan on\xf6digt dr\xf6jsm\xe5l, dock senast 48 timmar efter det att Bitr\xe4det f\xe5tt k\xe4nnedom om en personuppgiftsincident som r\xf6r Kunden, meddela Kunden om incidenten samt vidtagna \xe5tg\xe4rder."})]}),(0,$c.jsxs)(bm,{children:[(0,$c.jsx)("strong",{children:"Arvo Flow"})," \xb7 verksamhet under bildande \xb7 Stockholm \xb7 Integritetspolicy & DPA v1.4 \xb7 Senast uppdaterad 2026-05-19. ",(0,$c.jsx)("br",{}),"Fr\xe5gor: ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$c.jsxs)(km,{children:[(0,$c.jsx)("h2",{children:"Vill du veta exakt vad vi har om dig?"}),(0,$c.jsxs)("p",{children:["Mejla ",(0,$c.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," s\xe5 f\xe5r du ett komplett registerutdrag inom 30 dagar \u2014 utan kostnad."]}),(0,$c.jsxs)("div",{className:"actions",children:[(0,$c.jsx)(Bc,{as:vs,to:"/villkor",$variant:"primary",$size:"lg",children:"L\xe4s allm\xe4nna villkor"}),(0,$c.jsx)(Bc,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$c.jsx)(vu,{})]}),Em=()=>(0,$c.jsxs)(um,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsxs)(pm,{children:[(0,$c.jsxs)(mm,{children:[(0,$c.jsx)("span",{className:"dot"})," Cookie-policy \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$c.jsxs)(fm,{children:["Vi anv\xe4nder bara ",(0,$c.jsx)("em",{children:"n\xf6dv\xe4ndiga"})," cookies."]}),(0,$c.jsx)(hm,{children:"Inga marknadsf\xf6ringspixlar, inga remarketing-taggar, ingen f\xf6rs\xe4ljning av din surfdata till tredje part. Bara det som kr\xe4vs f\xf6r att Tj\xe4nsten ska fungera och vara s\xe4ker."})]}),(0,$c.jsxs)(gm,{children:[(0,$c.jsxs)(xm,{children:[(0,$c.jsx)("h2",{children:"Sammanfattning"}),(0,$c.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller cookies p\xe5 arvo.flow och arvoflow.se:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"N\xf6dv\xe4ndiga cookies"})," anv\xe4nds alltid \u2014 utan dem fungerar inte inloggning eller s\xe4ker session."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Anonymiserad statistik"})," samlas in f\xf6r att f\xf6rst\xe5 hur Tj\xe4nsten anv\xe4nds (sidvisningar, felmeddelanden). Den kan inte kopplas till dig som individ."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Inga marknadsf\xf6ringscookies."})," Vi anv\xe4nder inte Facebook Pixel, Google Ads remarketing eller liknande sp\xe5rning."]})]}),(0,$c.jsxs)("li",{children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.4}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("strong",{children:"Inga cookies fr\xe5n tredje part"})," s\xe4tts utan ditt aktiva samtycke."]})]})]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"1. Vad \xe4r cookies?"}),(0,$c.jsx)("p",{children:"Cookies \xe4r sm\xe5 textfiler som sparas i din webbl\xe4sare n\xe4r du bes\xf6ker en webbplats. De anv\xe4nds f\xf6r att webbplatsen ska fungera korrekt, f\xf6r s\xe4kerhet och f\xf6r att samla in anonymiserad anv\xe4ndarstatistik."})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"2. Cookies vi anv\xe4nder"}),(0,$c.jsxs)(wm,{children:[(0,$c.jsxs)(Sm,{className:"header",children:[(0,$c.jsx)("div",{children:"Namn / typ"}),(0,$c.jsx)("div",{children:"Syfte & livsl\xe4ngd"})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Session-cookie"}),(0,$c.jsxs)("div",{className:"v",children:["H\xe5ller dig inloggad under bes\xf6ket. Livsl\xe4ngd: tills du st\xe4nger webbl\xe4saren. ",(0,$c.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"CSRF-token"}),(0,$c.jsxs)("div",{className:"v",children:["Skyddar mot f\xf6rfalskade formul\xe4rinskick. Livsl\xe4ngd: tills sessionen avslutas. ",(0,$c.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Cookie-samtycke"}),(0,$c.jsxs)("div",{className:"v",children:["Sparar ditt val g\xe4llande statistik-cookies. Livsl\xe4ngd: 12 m\xe5nader.",(0,$c.jsx)("strong",{children:" N\xf6dv\xe4ndig."})]})]}),(0,$c.jsxs)(Sm,{children:[(0,$c.jsx)("div",{className:"k",children:"Anonymiserad statistik"}),(0,$c.jsxs)("div",{className:"v",children:["Aggregerad data om sidvisningar och fel. Ingen IP, ingen individidentifiering. Livsl\xe4ngd: 90 dagar. ",(0,$c.jsx)("strong",{children:"Statistik (samtycke)."})]})]})]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"3. Hur du hanterar cookies"}),(0,$c.jsx)("p",{children:"Du kan n\xe4r som helst:"}),(0,$c.jsxs)("ul",{children:[(0,$c.jsx)("li",{children:"\xc5terkalla samtycke till statistik-cookies via inst\xe4llningar i din profil n\xe4r du \xe4r inloggad"}),(0,$c.jsx)("li",{children:"Radera alla cookies fr\xe5n arvo.flow via din webbl\xe4sares inst\xe4llningar"}),(0,$c.jsx)("li",{children:"Blockera cookies helt \u2014 observera dock att inloggning d\xe5 inte kommer fungera"})]}),(0,$c.jsxs)("p",{children:["V\xe4gledning f\xf6r de vanligaste webbl\xe4sarna finns hos"," ",(0,$c.jsx)("a",{href:"https://www.imy.se/privatperson/dataskydd/det-har-galler-enligt-gdpr/cookies/",target:"_blank",rel:"noopener noreferrer",children:"Integritetsskyddsmyndigheten (IMY)"}),"."]})]}),(0,$c.jsxs)(vm,{children:[(0,$c.jsx)("h3",{children:"4. Lagst\xf6d"}),(0,$c.jsx)("p",{children:"Vi f\xf6ljer Lagen om elektronisk kommunikation (LEK) 9 kap. 28 \xa7. N\xf6dv\xe4ndiga cookies s\xe4tts utan samtycke eftersom de kr\xe4vs f\xf6r att tillhandah\xe5lla den tj\xe4nst du aktivt efterfr\xe5gat. F\xf6r \xf6vriga cookies inh\xe4mtar vi aktivt samtycke i enlighet med GDPR."})]}),(0,$c.jsxs)(bm,{children:[(0,$c.jsx)("strong",{children:"Arvo Flow"})," \xb7 verksamhet under bildande \xb7 Stockholm \xb7 Cookie-policy v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$c.jsx)("br",{}),"Fr\xe5gor: ",(0,$c.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$c.jsxs)(km,{children:[(0,$c.jsx)("h2",{children:"Inga m\xf6rka m\xf6nster, inga dolda sp\xe5rare."}),(0,$c.jsxs)("p",{children:["Vi tycker att cookie-banners ska vara \xe4rliga. Om du uppt\xe4cker att vi s\xe4tter en cookie som inte st\xe5r med ovan \u2014 mejla ",(0,$c.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$c.jsxs)("div",{className:"actions",children:[(0,$c.jsx)(Bc,{as:vs,to:"/integritet",$variant:"primary",$size:"lg",children:"L\xe4s integritetspolicy"}),(0,$c.jsx)(Bc,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$c.jsx)(vu,{})]});const _m={mobil:{label:"Mobilabonnemang",partnerLabel:"Kvalificerad Mobiloperat\xf6r",segment:2,unit:"abonnemang",unitSingular:"abonnemang",inlineLabel:"mobilabonnemang",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga ramavtal f\xf6r mobilabonnemang kostar v\xe4sentligt mindre",variableChargeNote:"Roaming, \xf6vertrafik m.m. \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},molnvaxel:{label:"F\xf6retagsv\xe4xel (molnv\xe4xel)",partnerLabel:"Kvalificerad V\xe4xeloperat\xf6r",segment:2,unit:"anv\xe4ndare",unitSingular:"anv\xe4ndare",inlineLabel:"molnv\xe4xel",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat instegspris: Telia Smart Connect fr\xe5n 89 kr/anv/m\xe5n exkl moms (telia.se). Exakt pris beror p\xe5 niv\xe5 och tillval.",smfBenchmark:"marknadens instegsv\xe4xel (Telia Smart Connect) kostar fr\xe5n 89 kr/anv\xe4ndare/m\xe5n exkl moms",variableChargeNote:"Samtalsavgifter och tillval ut\xf6ver licensen \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},bredband:{label:"F\xf6retagsbredband",partnerLabel:"Kvalificerad Bredbandsoperat\xf6r",segment:2,unit:"anslutningar",unitSingular:"anslutning",inlineLabel:"bredband",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat mot leverant\xf6rens publika listpris (Tele2 address-API) \u2014 exakt pris beror p\xe5 adress och befintlig infrastruktur.",smfBenchmark:"leverant\xf6rens eget publika listpris f\xf6r samma hastighet \xe4r v\xe4sentligt l\xe4gre",variableChargeNote:"Datatrafik och \xf6verskottsavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"saas-productivity":{label:"Programvarulicenser / SaaS",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga avtal f\xf6r samma licenser kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-crm":{label:"CRM-system",partnerLabel:"Kvalificerad CRM-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga CRM-avtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-finance":{label:"Aff\xe4rssystem / Bokf\xf6ring",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga aff\xe4rssystemsavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-other":{label:"Programvarulicenser / SaaS \xb7 \xf6vrigt",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga programvaruavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-creative":{label:"Kreativ mjukvara / Design",partnerLabel:"Kvalificerad Mjukvaruleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga avtal f\xf6r kreativ mjukvara kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},el:{label:"Elavtal",partnerLabel:"Kvalificerad Elleverant\xf6r",segment:1,unit:"avtal",unitSingular:"avtal",inlineLabel:"el (energidel)",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga elavtal kostar v\xe4sentligt mindre",variableChargeNote:"R\xf6rliga energikostnader (spotpris, n\xe4tavgift) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!0},skrivarleasing:{label:"Skrivare & Managed Print",partnerLabel:"Kvalificerad Print-leverant\xf6r",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"skrivarl\xf6sning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",smfBenchmark:"marknadsm\xe4ssiga utskriftsavtal kostar v\xe4sentligt mindre",variableChargeNote:"Klickkostnader per utskrift (volymbaserat) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},utrustningsleasing:{label:"IT-utrustningsleasing",partnerLabel:"Kvalificerad IT-partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"utrustningsleasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",smfBenchmark:"marknadsm\xe4ssiga IT-leasingavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},kortterminal:{label:"Kortterminal",partnerLabel:"Kvalificerad Betaltj\xe4nstleverant\xf6r",segment:6,unit:"terminaler",unitSingular:"terminal",inlineLabel:"kortterminal",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:"Transaktionsavgifter och volymbaserade procentavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"faktura-tjanst":{label:"Fakturatj\xe4nst / Aff\xe4rssystem",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:6,unit:"licenser",unitSingular:"licens",inlineLabel:"fakturatj\xe4nst",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},"leasing-bil":{label:"F\xf6retagsleasing",partnerLabel:"Kvalificerad Leasingpartner",segment:5,unit:"fordon",unitSingular:"fordon",inlineLabel:"billeasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"it-support":{label:"IT-drift & Support",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"IT-support",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},serverhosting:{label:"Serverhosting & Cloud-infrastruktur",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"serverhosting",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"transport-frakt":{label:"Transport & Frakt",partnerLabel:"Kvalificerad Fraktleverant\xf6r",segment:5,unit:"avtal",unitSingular:"avtal",inlineLabel:"transport",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},kontorsmaterial:{label:"Kontorsmaterial & F\xf6rbrukning",partnerLabel:"Kvalificerad F\xf6rbrukningsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"kontorsmaterial",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"st\xe4d-reng\xf6ring":{label:"St\xe4d & Reng\xf6ring",partnerLabel:"Kvalificerad St\xe4dleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"st\xe4dtj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"larm-bevakning":{label:"Larm & Bevakning",partnerLabel:"Kvalificerad S\xe4kerhetsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"larm och bevakning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},foretagshalsovard:{label:"F\xf6retagsh\xe4lsov\xe5rd",partnerLabel:"Kvalificerad H\xe4lsov\xe5rdspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsh\xe4lsov\xe5rd",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},loneadmin:{label:"L\xf6neadministration",partnerLabel:"Kvalificerad L\xf6nesystemleverant\xf6r",segment:7,unit:"anst\xe4llda",unitSingular:"anst\xe4lld",inlineLabel:"l\xf6neadministration",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat golv: Fortnox L\xf6n 199 kr/m\xe5n + 25 kr/anst\xe4lld/m\xe5n exkl moms (fortnox.se). Exakt utfall beror p\xe5 om behovet ryms i Fortnox L\xf6n.",smfBenchmark:"Fortnox L\xf6n \u2014 verifierat l\xe4gst \u2014 kostar 199 kr/m\xe5n + 25 kr/anst\xe4lld/m\xe5n exkl moms",variableChargeNote:"L\xf6nebesked-/utskicksavgifter (Kivra) \xe4r r\xf6rliga \u2014 ej inkluderat i golvj\xe4mf\xf6relsen.",licensePending:!1,elSuffix:!1},"forsakring-foretag":{label:"F\xf6retagsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},"forsakring-ansvar":{label:"Yrkesansvarsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"yrkesansvarsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},vaxel:{label:"Molnv\xe4xel",partnerLabel:"Kvalificerad Telekomleverant\xf6r",segment:2,unit:"licenser",unitSingular:"licens",inlineLabel:"molnv\xe4xel",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},bankavgifter:{label:"Bankavgifter & Betaltj\xe4nster",partnerLabel:"Kvalificerad Bankpartner",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"bankavgifter",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"avfall-atervinning":{label:"Avfall & \xc5tervinning",partnerLabel:"Kvalificerad Avfallsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"avfall och \xe5tervinning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},uncategorized:{label:"Okategoriserad",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}};function zm(e){var t;return null!==(t=_m[e])&&void 0!==t?t:{label:null!==e&&void 0!==e?e:"Ok\xe4nd kategori",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}}const Cm=[{key:"mjukvara",label:"Programvara & licenser",short:"Mjukvara",icon:"spark",mode:"verdict",hint:"Microsoft 365 \xb7 Adobe \xb7 Fortnox",know:"verifierat listpris",cats:["saas-productivity","saas-creative","saas-crm","saas-finance","saas-other","faktura-tjanst","managed-workplace"]},{key:"telefoni",label:"Telefoni & bredband",short:"Telefoni",icon:"phone",mode:"verdict",hint:"Mobil \xb7 v\xe4xel \xb7 bredband",know:"verifierat marknadspris",cats:["mobil","bredband","molnvaxel"]},{key:"lon",label:"L\xf6n & HR",short:"L\xf6n",icon:"fortnox",mode:"verdict",hint:"L\xf6nesystem \xb7 f\xf6retagsh\xe4lsa",know:"verifierat golv",cats:["loneadmin","foretagshalsovard","forsakring-foretag","forsakring-ansvar"]},{key:"el",label:"El",short:"El",icon:"bolt",mode:"verdict",hint:"F\xf6retagsel",know:"Nordpool-verifierat",cats:["el"]},{key:"itdrift",label:"IT-drift & hosting",short:"IT-drift",icon:"wifi",mode:"offert",hint:"Support \xb7 server \xb7 moln",know:null,cats:["it-support","serverhosting"]},{key:"skrivare",label:"Skrivare & print",short:"Skrivare",icon:"file",mode:"offert",hint:"Leasing \xb7 klickavtal",know:null,cats:["skrivarleasing","utrustningsleasing"]},{key:"fordon",label:"Fordon & frakt",short:"Fordon",icon:"truck",mode:"offert",hint:"Leasing \xb7 transport",know:null,cats:["leasing-bil","transport-frakt"]},{key:"ovrigt",label:"Kontor & \xf6vrigt",short:"Kontor",icon:"shield",mode:"offert",hint:"F\xf6rbrukning \xb7 larm \xb7 terminal",know:null,cats:["kontorsmaterial","st\xe4d-reng\xf6ring","larm-bevakning","kortterminal","avfall-atervinning","bankavgifter"]}];const Am=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e),Dm=(e,t,r)=>"watch"===t?"dossier"===r?e.dossier.teal:e.color.brand:e.color.warning,Fm=vc.section`
  position: relative;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  border: 1px solid ${e=>{let{theme:t,$tone:r,$variant:n}=e;return Dm(t,r,n)}};
  padding: 15px 18px;
  margin: ${e=>{let{$variant:t}=e;return"dossier"===t?"26px 0 4px":"0 0 20px"}};
  background: ${e=>{let{theme:t,$variant:r,$tone:n}=e;return"dossier"===r?t.dossier.bgRaised:((e,t)=>"watch"===t?e.color.brandSoft:e.color.warningSoft)(t,n)}};

  .fc-eyebrow {
    display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;
    text-transform: uppercase; color: ${e=>{let{theme:t,$tone:r,$variant:n}=e;return Dm(t,r,n)}};
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?hc`font-family: ${t.font.mono}; font-size: 11px; letter-spacing: .22em;`:hc`font-size: 10px; font-weight: 800; letter-spacing: .1em;`}}
  }
  .fc-eyebrow::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: ${e=>{let{theme:t,$tone:r,$variant:n}=e;return Dm(t,r,n)}}; }

  .fc-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 10px; }
  .fc-title {
    line-height: 1.16;
    /* KOMPAKTERAT 2026-08-15: kortet tog en halv skärm i mobil. Rubriken är hooken och får
       stanna, men i mindre grad — fyndet ska ANNONSERA sig, inte ockupera rummet. */
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?hc`font-family: ${t.font.display}; font-weight: 600; font-size: clamp(18px, 2.6vw, 22px); color: ${t.dossier.inkOnDark};`:hc`font-weight: 700; font-size: 16px; color: ${t.color.ink};`}}
  }
  .fc-impact {
    flex-shrink: 0; font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-weight: 600; letter-spacing: -.02em;
    font-feature-settings: 'tnum'; color: ${e=>{let{theme:t,$tone:r,$variant:n}=e;return Dm(t,r,n)}}; white-space: nowrap;
    font-size: ${e=>{let{$variant:t}=e;return"dossier"===t?"clamp(17px, 2.6vw, 21px)":"clamp(16px, 3.4vw, 20px)"}};
  }
  /* KRAVET (2026-08-15): det enda talet kunden kan hämta hem I DAG låg begravt mitt i en löpande
     mening medan run-raten fick all typografi. En CFO agerar på det som går att kräva tillbaka. */
  .fc-claim {
    display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
    margin: 0 0 10px; padding: 9px 12px; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?hc`background: rgba(43,196,172,.07); border: 1px solid rgba(43,196,172,.30);`:hc`background: ${t.color.brandSoft}; border: 1px solid ${t.color.border};`}}
    .fc-claim-k { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 10px; letter-spacing: .16em;
      text-transform: uppercase; color: ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.tealBright:t.color.brand}}; }
    .fc-claim-v { font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-weight: 600; font-size: 17px;
      font-feature-settings: 'tnum';
      color: ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.inkOnDark:t.color.ink}}; }
    .fc-claim-b {
      margin-left: auto; cursor: pointer; white-space: nowrap; font-size: 12px; font-weight: 600;
      border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}}; padding: 7px 14px;
      ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?hc`background: transparent; border: 1px solid ${t.dossier.tealBright}; color: ${t.dossier.tealBright};`:hc`background: transparent; border: 1px solid ${t.color.brand}; color: ${t.color.brand};`}}
    }
  }
  .fc-letter {
    margin: 0 0 10px; white-space: pre-wrap; font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: 11.5px; line-height: 1.55; max-height: 260px; overflow: auto;
    padding: 12px 14px; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?hc`color: ${t.dossier.mutedOnDark}; border: 1px solid ${t.dossier.hairlineOnDark};`:hc`color: ${t.color.inkSoft}; background: ${t.color.surface}; border: 1px solid ${t.color.border};`}}
  }
  .fc-line {
    display: inline-block; font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}}; padding: 3px 8px; margin-bottom: 10px; word-break: break-word;
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?hc`color: ${t.dossier.mutedOnDark}; border: 1px solid ${t.dossier.hairlineOnDark};`:hc`color: ${t.color.inkSoft}; background: ${t.color.surface}; border: 1px solid ${t.color.border};`}}
  }
  .fc-text {
    margin: 0; line-height: 1.55;
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?hc`font-size: 13.5px; color: ${t.dossier.mutedOnDark};`:hc`font-size: 13px; color: ${t.color.inkSoft};`}}
    strong { color: ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.inkOnDark:t.color.ink}}; font-weight: 700; }
  }
  .fc-more {
    margin: 12px 0 0; padding-top: 10px; font-size: 12px;
    border-top: 1px solid ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.hairlineOnDark:t.color.border}};
    color: ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.mutedOnDark:t.color.muted}};
    strong { color: ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.inkOnDark:t.color.ink}}; font-weight: 700; }
  }
`;function Om(e){let{finding:t,extraCount:r=0,variant:a="light",eyebrow:i}=e;const[o,s]=(0,n.useState)(!1),[l,d]=(0,n.useState)(!1);if(!t||!t.title)return null;const c="watch"===t.tone?"watch":"leak",u=null!==i&&void 0!==i?i:"watch"===c?"Avtalsbevakning":"dossier"===a?"Fynd p\xe5 era fakturor":"Fynd p\xe5 er faktura",p=t.annualImpact>0;return(0,$c.jsxs)(Fm,{$variant:a,$tone:c,children:[(0,$c.jsx)("div",{className:"fc-eyebrow",children:u}),(0,$c.jsxs)("div",{className:"fc-row",children:[(0,$c.jsx)("div",{className:"fc-title",children:t.title}),p?(0,$c.jsxs)("div",{className:"fc-impact",children:[Am(t.annualImpact)," kr/\xe5r"]}):t.metricText?(0,$c.jsx)("div",{className:"fc-impact",children:t.metricText}):null]}),t.lineDescription&&(0,$c.jsxs)("div",{className:"fc-line",children:["\u201d",t.lineDescription,"\u201d"]}),t.overpaidToDate>0&&(0,$c.jsxs)("div",{className:"fc-claim",children:[(0,$c.jsx)("span",{className:"fc-claim-k",children:"Att beg\xe4ra tillbaka"}),(0,$c.jsxs)("span",{className:"fc-claim-v",children:[Am(t.overpaidToDate)," kr"]}),t.letter&&(0,$c.jsx)("button",{type:"button",className:"fc-claim-b",onClick:()=>{var e;o?null===(e=navigator.clipboard)||void 0===e||e.writeText(`${t.letter.subject}\n\n${t.letter.body}`).then(()=>{d(!0),setTimeout(()=>d(!1),2200)}).catch(()=>{}):s(!0)},children:o?l?"Kopierat \u2713":"Kopiera brevet":"Vi skrev brevet \u2192"})]}),o&&t.letter&&(0,$c.jsxs)("div",{className:"fc-letter",children:[t.letter.subject,"\n\n",t.letter.body]}),(0,$c.jsx)("p",{className:"fc-text",children:t.text}),r>0&&(0,$c.jsxs)("p",{className:"fc-more",children:[(0,$c.jsxs)("strong",{children:["+",r," fler fynd"]})," p\xe5 fakturan \u2014 vi g\xe5r igenom dem i er genomg\xe5ng."]})]})}const Tm=jc`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Pm=jc`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`,Lm=jc`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
`,Rm=jc`
  to { transform: rotate(360deg); }
`,Im=jc`
  0%   { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
`,Bm=jc`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,.5); }
  60%       { box-shadow: 0 0 0 4px rgba(27,122,110,.0); }
`,Mm=vc.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  min-height: 100vh;
`,Vm=vc.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 80px 28px 32px;
  text-align: center;
  animation: ${Tm} 0.6s ease both;
  @media (max-width: 740px) { padding: 48px 20px 20px; }
`,Um=vc.span`
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
`,Km=vc.h1`
  margin-top: 22px;
  font-size: clamp(38px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,Hm=vc.p`
  margin: 22px auto 0;
  max-width: 580px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,Wm=vc.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 16px 28px 64px;
  @media (max-width: 740px) { padding: 12px 20px 48px; }
`,qm=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  margin-bottom: 16px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
  animation: ${Tm} 0.5s ease both;
  @media (max-width: 600px) { padding: 22px 20px; }
`,Gm=vc.div`
  position: relative;
  border: 2px dashed ${e=>{let{theme:t,$active:r,$hasFile:n}=e;return r||n?t.color.brand:"#A8C8BE"}};
  background: ${e=>{let{theme:t,$active:r,$hasFile:n}=e;return r||n?t.color.brandSoft:t.color.surfaceAlt}};
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
`,Ym=vc.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 18px;
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`,Jm=vc.label`
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
`,Qm=vc.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Xm=vc.div`
  animation: ${Pm} 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;
`,Zm=(vc.div`
  margin: 20px 0 6px;
  animation: ${Tm} .4s ease both;

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
`),ef=vc.p`
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
`,tf=vc.div`
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.dangerSoft}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.danger}};
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  line-height: 1.5;
`,rf=vc.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${Rm} 0.7s linear infinite;
`,nf=vc.ol`
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
`,af=vc.li`
  display: grid;
  grid-template-columns: 28px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 12px 16px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t,$state:r}=e;return"done"===r?t.color.surface:"transparent"}};
  border: 1px solid ${e=>{let{theme:t,$state:r}=e;return"done"===r?t.color.borderStrong:"transparent"}};
  opacity: ${e=>{let{$state:t}=e;return"pending"===t?.55:1}};
  transition: opacity ${e=>{let{theme:t}=e;return t.motion.base}},
              background ${e=>{let{theme:t}=e;return t.motion.base}};

  div.bullet {
    width: 24px; height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${e=>{let{theme:t,$state:r}=e;return"done"===r?t.color.brand:"active"===r?t.color.brandSoft:t.color.surfaceAlt}};
    color: ${e=>{let{theme:t,$state:r}=e;return"done"===r?"#FAFAF7":t.color.muted}};
    animation: ${e=>{let{$state:t}=e;return"active"===t?Lm:"none"}} 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  div.label {
    font-size: 14.5px;
    color: ${e=>{let{theme:t,$state:r}=e;return"pending"===r?t.color.muted:t.color.ink}};
    font-weight: ${e=>{let{$state:t}=e;return"active"===t?600:500}};
  }
  div.time {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}};
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
  }
`,of=(vc.div`
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
`),sf=vc.div`
  position: relative;
  overflow: hidden;
  padding: 24px 26px 22px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
  color: #FAFAF7;
  margin-bottom: 12px;
  box-shadow: 0 8px 32px rgba(27,110,102,.22), 0 2px 6px rgba(27,110,102,.14);
  animation: ${Tm} 0.5s ease both;

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
    animation: ${Im} 3.6s ease-in-out 1.2s infinite;
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
`,lf=vc.div`
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
`,df=vc.div`
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
`,cf=vc.div`
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
    background: ${e=>{let{theme:t,$over:r}=e;return r?t.color.warning:t.color.brand}};
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
`,uf=vc.p`
  margin-top: 10px;
  margin-bottom: ${e=>{let{$compact:t}=e;return t?"10px":"24px"}};
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  font-style: italic;
  text-align: center;
`,pf=(vc.div`
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
  animation: ${Tm} 0.5s ease 0.08s both;

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
`),mf=vc.div`
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
`,ff=vc.form`
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
`,hf=vc.div`
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
`,gf=(vc.div`
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
`),xf=vc.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{$type:t}=e;return"satellite"===t?"#F8F9FA":"#EFF9F7"}};
  border: 1px solid ${e=>{let{theme:t,$type:r}=e;return"satellite"===r?t.color.border:t.color.brand+"33"}};

  svg { flex-shrink: 0; margin-top: 2px; color: ${e=>{let{theme:t,$type:r}=e;return"satellite"===r?t.color.muted:t.color.brand}}; }
  span {
    font-size: 13px;
    line-height: 1.55;
    color: ${e=>{let{theme:t,$type:r}=e;return"satellite"===r?t.color.muted:t.color.inkSoft}};
  }
`,vf=vc.dl`
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
`,bf=vc.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 8, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${Tm} 0.2s ease both;
`,kf=vc.div`
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
`,yf=vc.div`
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
`,jf=(vc.a`
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
`),wf=vc.div`
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
    animation: ${Pm} 0.2s ease both;
  }
  p {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 14px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin: 0;
  }
`,Sf=vc.div`
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
`,$f=vc.div`
  margin: 16px 0 20px;
  border: 1px solid ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.border)&&void 0!==t?t:"#D5E2DC"}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;

  .chain-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.surface)&&void 0!==t?t:"#F7FAF9"}};
    border-bottom: 1px solid ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.border)&&void 0!==t?t:"#D5E2DC"}};
    cursor: pointer;
    user-select: none;
    gap: 8px;
  }
  .chain-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brand)&&void 0!==t?t:"#1B6E66"}};
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
    color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.text)&&void 0!==t?t:"#0E1A17"}};
    border-bottom: 1px dashed #E8F0EC;
    padding-bottom: 7px;
    &:last-child { border-bottom: none; padding-bottom: 0; }
  }
  .chain-row.total {
    font-weight: 700;
    font-size: 14px;
    color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brand)&&void 0!==t?t:"#1B6E66"}};
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
`,Nf=vc.div`
  margin: 16px 0 20px;
  border: 1px solid ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.border)&&void 0!==t?t:"#D5E2DC"}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;

  .vr-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 16px;
    background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.surface)&&void 0!==t?t:"#F7FAF9"}};
    border-bottom: 1px solid ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.border)&&void 0!==t?t:"#D5E2DC"}};
  }
  .vr-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brand)&&void 0!==t?t:"#1B6E66"}};
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
    color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.text)&&void 0!==t?t:"#0E1A17"}};
  }
  .vr-glyph {
    flex-shrink: 0;
    width: 16px;
    text-align: center;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .vr-glyph.ok        { color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brand)&&void 0!==t?t:"#1B6E66"}}; }
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
`,Ef=vc.div`
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
`),zf=(vc.div`
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
`),Cf=vc.div`
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
`,Af=vc.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`,Df=vc.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{$status:t,theme:r}=e;return"done"===t?r.color.brand+"33":"failed"===t?"#E5383B33":"processing"===t?r.color.brand+"22":r.color.border}};
  transition: border-color 0.2s;

  .icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${e=>{let{$status:t,theme:r}=e;return"done"===t?r.color.brandSoft:"failed"===t?"#FFE8E8":"processing"===t?r.color.brandSoft+"88":r.color.borderSoft}};
    color: ${e=>{let{$status:t,theme:r}=e;return"done"===t?r.color.brand:"failed"===t?"#C0392B":"processing"===t?r.color.brand:r.color.muted}};
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
    color: ${e=>{let{$status:t,theme:r}=e;return"done"===t?r.color.brand:"failed"===t?"#C0392B":"processing"===t?r.color.brand:r.color.muted}};
    white-space: nowrap;
  }

  .saving {
    font-size: 13px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    white-space: nowrap;
    margin-left: 4px;
  }
`,Ff=vc.div`
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
`,Of=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px 32px 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 24px rgba(14,26,23,.08), 0 1px 4px rgba(14,26,23,.04);
  animation: ${Tm} 0.5s ease 0.16s both;

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
    animation: ${Bm} 2s ease-in-out infinite;
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
`,Tf=vc.div`
  margin-bottom: 12px;
  padding: 30px 32px 26px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  animation: ${Tm} 0.5s ease 0.24s both;

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
`;const Pf={"business-premium":"Business Premium","business-standard":"Business Standard","business-basic":"Business Basic",e3:"E3",e5:"E5"},Lf=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);const Rf=3145728;async function If(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}function Bf(e,t){if(!e||!t)return e;const r=t.split(/\s+/),n=[t];r[0].length>=4&&n.push(r[0]),r.length>=2&&n.push(`${r[0]} ${r[1]}`);let a=e;for(const i of[...new Set(n)])a=a.replace(new RegExp(i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),"en verifierad l\xe4gre leverant\xf6r");return a}const Mf={ehandel:"E-handel & Detaljhandel",tillverkning:"Industri & Tillverkning","it-tech":"IT, Tech & Mjukvara",bygg:"Bygg, Hantverk & Fastighet",hotell:"Hotell, Restaurang & Event",konsult:"Konsult & F\xf6retagstj\xe4nster",transport:"Transport & Logistik",vard:"V\xe5rd, Omsorg & H\xe4lsa",ovrigt:"\xd6vrigt / Annan bransch"},Vf=Cm,Uf=[{id:"extract",label:"Arvo l\xe4ser & klassificerar fakturan",sublabel:"Tolkar varje rad och post"},{id:"categorize",label:"Identifierar leverant\xf6r & kategori",sublabel:"Matchar mot 200+ leverant\xf6rsprofiler"},{id:"recommend",label:"Ber\xe4knar besparing mot branschindex",sublabel:"J\xe4mf\xf6r med svenska branschdata"}],Kf=e=>new Promise((t,r)=>{const n=new FileReader;n.onload=()=>{const e=String(n.result||""),r=e.includes(",")?e.split(",")[1]:e;t(r)},n.onerror=()=>r(new Error("Kunde inte l\xe4sa filen")),n.readAsDataURL(e)}),Hf={schemakrav:"Strukturkontroll",radsumma:"Radsumma mot fakturatotal",balanskrav:"Antal \xd7 \xe0-pris per rad",projektion:"N\xe4sta periods belopp",listpris:"J\xe4mf\xf6relsepris"},Wf={ok:"\u2713",varning:"!",stopp:"\u2715",ej_provbar:"\u2013"};function qf(e){let{items:t}=e;if(!Array.isArray(t)||0===t.length)return null;const r=t.filter(e=>"ej_provbar"!==e.status),n=r.filter(e=>"ok"===e.status),a=t.length-r.length;return(0,$c.jsxs)(Nf,{children:[(0,$c.jsxs)("div",{className:"vr-header",children:[(0,$c.jsx)("span",{className:"vr-title",children:"Maskinellt kontrollerad"}),(0,$c.jsxs)("span",{className:"vr-count",children:[n.length," av ",r.length," kontroller gr\xf6na",a>0?` \xb7 ${a} ej pr\xf6vbara`:""]})]}),(0,$c.jsx)("div",{className:"vr-body",children:t.map(e=>{var t,r;return(0,$c.jsxs)("div",{className:`vr-row ${e.status}`,children:[(0,$c.jsx)("span",{className:`vr-glyph ${e.status}`,children:null!==(t=Wf[e.status])&&void 0!==t?t:"\xb7"}),(0,$c.jsx)("span",{className:"vr-label",children:null!==(r=Hf[e.id])&&void 0!==r?r:e.id}),(0,$c.jsx)("span",{className:"vr-detalj",children:e.detalj})]},e.id)})}),(0,$c.jsx)("div",{className:"vr-foot",children:"Varje kontroll ovan k\xf6rdes deterministiskt p\xe5 just den h\xe4r fakturan \u2014 en kontroll som inte kunde pr\xf6vas markeras, aldrig bockas."})]})}function Gf(e){let{cc:t}=e;const[r,a]=n.useState(!1);return(0,$c.jsxs)($f,{children:[(0,$c.jsxs)("div",{className:"chain-header",onClick:()=>a(e=>!e),role:"button",tabIndex:0,onKeyDown:e=>"Enter"===e.key&&a(e=>!e),children:[(0,$c.jsx)("span",{className:"chain-title",children:"Ber\xe4kningsunderlag"}),(0,$c.jsx)("span",{className:"chain-toggle",children:r?"D\xf6lj \u25b2":"Visa hur vi r\xe4knar \u25bc"})]}),r&&(0,$c.jsxs)("div",{className:"chain-body",children:[(0,$c.jsxs)("div",{className:"chain-row",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"chain-label",children:"Nuvarande kostnad"}),(0,$c.jsx)("div",{className:"chain-source",children:t.currentAnnualCost.source})]}),(0,$c.jsxs)("span",{className:"chain-value",children:[bu(t.currentAnnualCost.value)," kr/\xe5r"]})]}),t.benchmarkAnnualCost&&(0,$c.jsxs)("div",{className:"chain-row",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"chain-label",children:"Arvo-pris"}),t.benchmarkAnnualCost.formula&&(0,$c.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.formula}),(0,$c.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.source})]}),(0,$c.jsxs)("span",{className:"chain-value",children:[bu(t.benchmarkAnnualCost.value)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"chain-row",children:[(0,$c.jsx)("div",{className:"chain-label",children:"Bruttobesparing"}),(0,$c.jsxs)("span",{className:"chain-value",children:[bu(t.grossSaving.value)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"chain-row",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"chain-label",children:"Arvos arvode"}),(0,$c.jsx)("div",{className:"chain-source",children:t.arvoFee.formula})]}),(0,$c.jsxs)("span",{className:"chain-value",children:["\u2212",bu(t.arvoFee.value)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"chain-row total",children:[(0,$c.jsx)("span",{children:"Er nettobesparing"}),(0,$c.jsxs)("span",{className:"chain-value",children:["+",bu(t.netSaving.value)," kr/\xe5r"]})]})]})]})}function Yf(e){let{seatCount:t,employees:r,overage:a,term:i,termSing:o}=e;const[s,l]=n.useState(!1);return(0,$c.jsxs)(wf,{children:[(0,$c.jsxs)("button",{className:"lon-trigger",onClick:()=>l(e=>!e),"aria-expanded":s,children:[(0,$c.jsxs)("span",{className:"lon-head",children:[(0,$c.jsxs)("span",{className:"kicker",children:["Notering om ",i]}),(0,$c.jsxs)("span",{className:"lon-teaser",children:[a," av ",t," ",i," verkar oanv\xe4nda"]})]}),(0,$c.jsx)("span",{className:"lon-chevron"+(s?" open":""),children:(0,$c.jsx)(yp,{name:"chevron-right",size:15,stroke:2.5})})]}),s&&(0,$c.jsx)("div",{className:"lon-body",children:(0,$c.jsxs)("p",{children:["Kalkylen ovan bygger p\xe5 att vi beh\xe5ller era ",t," ",i,", men s\xe4nker styckpriset genom att flytta er till r\xe4tt avtalsniv\xe5. Vi noterar dock att ni enligt uppgift \xe4r ",r," anst\xe4llda. Om man dessutom hade st\xe4dat bort",1===a?` detta ${a} \xf6verfl\xf6diga ${o}`:` dessa ${a} \xf6verfl\xf6diga ${i}`,", hade er kostnad s\xe4nkts ytterligare."]})})]})}const Jf=()=>{var e,t,r,a,i,o,s,l,d,c,u,p,m,f,h,g,x,v,b,k,y,j,w,S,$,N,E,_,z,C,A,D,F,O,T,P,L,R,I,B,M,V,U,K,H,W,q,G,Y,J,Q,X,Z,ee,te,re,ne,ae,ie,oe,se,le,de,ce,ue,pe,me,fe,he,ge,xe,ve,be,ke,ye,je,we,Se,$e,Ne,Ee,_e,ze,Ce,Ae,De,Fe,Oe,Te,Pe,Le,Re,Ie,Be,Me,Ve,Ue,Ke,He,We,qe,Ge,Ye,Je,Qe,Xe,Ze,et,tt,rt,nt,at,it,ot,st,lt,dt,ct,ut,pt,mt,ft,ht,gt,xt,vt,bt,kt,yt,jt,wt,St,$t,Nt,Et,_t,zt,Ct,At,Dt,Ft,Ot,Tt,Pt,Lt,Rt,It,Bt,Mt,Vt,Ut,Kt,Ht,Wt;const qt=(0,n.useRef)(null),Gt=(0,n.useRef)(null),{email:Yt}=Ac(),[Jt,Qt]=(0,n.useState)(null),[Xt,Zt]=(0,n.useState)("konsult"),[er,tr]=(0,n.useState)(5),[rr,nr]=(0,n.useState)(""),[ar,ir]=(0,n.useState)(null),[or,sr]=(0,n.useState)(null),[lr,dr]=(0,n.useState)(null),[cr,ur]=(0,n.useState)(null),[pr,mr]=(0,n.useState)(""),[fr,hr]=(0,n.useState)("idle"),[gr,xr]=(0,n.useState)(!1),[vr,br]=(0,n.useState)(""),[kr,yr]=(0,n.useState)("idle"),[jr,wr]=(0,n.useState)(!1),[Sr,$r]=(0,n.useState)(""),[Nr,Er]=(0,n.useState)("idle"),[_r,zr]=(0,n.useState)(null),[Cr,Ar]=(0,n.useState)(!1),[Dr,Fr]=(0,n.useState)(!1),[Or,Tr]=(0,n.useState)("quota"),[Pr,Lr]=(0,n.useState)(""),[Rr,Ir]=(0,n.useState)(!1),[Br,Mr]=(0,n.useState)(""),[Vr,Ur]=(0,n.useState)(""),[Kr,Hr]=(0,n.useState)(""),[Wr,qr]=(0,n.useState)(!1),[Gr,Yr]=(0,n.useState)("idle"),[Jr,Qr]=(0,n.useState)(!1),[Xr,Zr]=(0,n.useState)(""),[en,tn]=(0,n.useState)("idle"),[rn,nn]=(0,n.useState)(""),[an,on]=(0,n.useState)("idle"),[sn,ln]=(0,n.useState)(null),[dn,cn]=(0,n.useState)("idle"),[un,pn]=(0,n.useState)(!1),[mn,fn]=(0,n.useState)(!1),[hn,gn]=(0,n.useState)(""),[xn,vn]=(0,n.useState)("idle"),[bn,kn]=(0,n.useState)(null),[yn,jn]=(0,n.useState)(null),[wn,Sn]=(0,n.useState)(""),[$n,Nn]=(0,n.useState)("idle"),[En,_n]=(0,n.useState)([]),[zn,Cn]=(0,n.useState)(null),[An,Dn]=(0,n.useState)([]),[Fn,On]=(0,n.useState)(null),[Tn,Pn]=(0,n.useState)(!1),Ln=En.length>1;n.useEffect(()=>{var e,t,r;const n=new URLSearchParams(window.location.search),a=n.get("bypass");a&&(sessionStorage.setItem("arvo_bypass",a),window.history.replaceState({},"",window.location.pathname));const i=n.get("magic");i&&(window.history.replaceState({},"",window.location.pathname),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:i})}).then(e=>e.json()).then(e=>{e.ok&&e.bypass&&sessionStorage.setItem("arvo_bypass",e.bypass)}).catch(()=>{})),fetch("/api/token",{method:"POST"}).then(e=>e.json()).then(e=>{var t;return zr(null!==(t=e.token)&&void 0!==t?t:null)}).catch(()=>{});const o=n.get("intelligence_connected"),s=n.get("oauth_pending"),l=n.get("oauth_error"),d=null!==(e=null!==(t=null!==(r=n.get("provider"))&&void 0!==r?r:o)&&void 0!==t?t:s)&&void 0!==e?e:"gmail";if(o||s||l){var c,u;const e=parseInt(null!==(c=n.get("invoices"))&&void 0!==c?c:"0",10)||0,t=null!==(u=n.get("email"))&&void 0!==u?u:"";o?kn({type:"connected",provider:o,invoices:e,email:t}):s?kn({type:"pending",provider:s}):l&&kn({type:"error",provider:d,errorCode:l}),window.history.replaceState({},"",window.location.pathname)}},[]),n.useEffect(()=>{var e,t;if(!lr||!Gt.current)return;const r=null!==(e=null===(t=document.querySelector("header"))||void 0===t?void 0:t.offsetHeight)&&void 0!==e?e:64,n=Gt.current.getBoundingClientRect().top+window.pageYOffset-r-8;window.scrollTo({top:n,behavior:"smooth"})},[lr]);const Rn=e=>{sr(null),e&&("application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")?e.size>Rf?sr(`PDF \xe4r f\xf6r stor (${(e.size/1024/1024).toFixed(1)} MB). Max: 3 MB.`):Qt(e):sr("Endast PDF-filer st\xf6ds."))},In=e=>{sr(null),On(null);const t=Array.from(e).filter(e=>"application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")),r=t.filter(e=>e.size>Rf);r.length>0&&sr(`${r.length} fil(er) \xe4r f\xf6r stora (max 3 MB per faktura).`);const n=t.filter(e=>e.size<=Rf);1===n.length?(Qt(n[0]),_n([])):n.length>1?(_n(n),Qt(null),dr(null)):e.length>0&&sr("Endast PDF-filer st\xf6ds.")},Bn=async e=>{const t=await fetch("/api/send-analysis",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:lr})});if(!t.ok)throw new Error("send-analysis "+t.status)},Mn=async e=>{const t=await fetch("/api/send-confirmation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:lr})});if(!t.ok)throw new Error("send-confirmation "+t.status)},Vn=async e=>{var t;null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e);const r=(Sr||Pr||"").trim();if(r&&"idle"===Nr){Er("submitting");try{await Promise.all([Mn(r),Bn(r)]),Er("sent")}catch{Er("idle")}}},Un=async e=>{var t;e.preventDefault();const r=null===lr||void 0===lr||null===(t=lr.recommendation)||void 0===t?void 0:t.shelfware;if(r&&"submitting"!==$n){Nn("submitting");try{var n;const e=await fetch("/api/recompute-shelfware",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({seatCount:r.paidSeats,pricePerSeatMonthly:r.perSeatMonthly,employees:r.employees,knownExceptions:""===wn?0:Number(wn)})});if(!e.ok)throw new Error("recompute failed");const t=await e.json();jn(null!==(n=t.shelfware)&&void 0!==n?n:{cleared:!0}),Nn("done")}catch{Nn("error")}}},Kn=ar&&"done"!==ar,Hn="optimize"===(null===lr||void 0===lr||null===(e=lr.recommendation)||void 0===e?void 0:e.recommendationType)&&(null!==(t=null===lr||void 0===lr||null===(r=lr.recommendation)||void 0===r?void 0:r.optimizationSaving)&&void 0!==t?t:0)>0,Wn=null!==(a=null===lr||void 0===lr||null===(i=lr.recommendation)||void 0===i?void 0:i.optimizationSaving)&&void 0!==a?a:0,qn=Hn&&null!==(o=null===lr||void 0===lr||null===(s=lr.recommendation)||void 0===s?void 0:s.optimizationFee)&&void 0!==o?o:0,Gn=Hn&&null!==(l=null===lr||void 0===lr||null===(d=lr.recommendation)||void 0===d?void 0:d.optimizationNetSaving)&&void 0!==l?l:0,Yn=null!==(c=null===lr||void 0===lr?void 0:lr.hardwareAdjustment)&&void 0!==c?c:null,Jn=null!==(u=null===Yn||void 0===Yn?void 0:Yn.items)&&void 0!==u?u:[],Qn=null!==(p=null===Yn||void 0===Yn?void 0:Yn.hwAnnualCost)&&void 0!==p?p:0,Xn=null!==(m=null===Yn||void 0===Yn?void 0:Yn.hwTotalRemaining)&&void 0!==m?m:0,Zn=!!Yn,ea=Zn?Yn.adjAnnualCost:null!==(f=null===lr||void 0===lr||null===(h=lr.extracted)||void 0===h?void 0:h.annualCost)&&void 0!==f?f:0,ta=Zn?Yn.adjGrossSaving:null!==(g=null===lr||void 0===lr||null===(x=lr.recommendation)||void 0===x?void 0:x.grossSaving)&&void 0!==g?g:0,ra=Zn?Yn.adjArvoFee:null!==(v=null===lr||void 0===lr||null===(b=lr.recommendation)||void 0===b?void 0:b.arvoFee)&&void 0!==v?v:0,na=Zn?Yn.adjNetSaving:null!==(k=null===lr||void 0===lr||null===(y=lr.recommendation)||void 0===y?void 0:y.netSaving)&&void 0!==k?k:0,aa=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1600;const[r,a]=n.useState(0);return n.useEffect(()=>{if(!e)return void a(0);const r=performance.now();let n;const i=o=>{const s=Math.min((o-r)/t,1),l=1-Math.pow(1-s,3);a(Math.round(e*l)),s<1?n=requestAnimationFrame(i):a(e)};return n=requestAnimationFrame(i),()=>{n&&cancelAnimationFrame(n)}},[e,t]),r}(Zn?na:null!==(j=null===lr||void 0===lr||null===(w=lr.recommendation)||void 0===w?void 0:w.netSaving)&&void 0!==j?j:0),ia=function(){let{annual:e,suggested:t,clickPriceScore:r,shouldSwitch:n,netSaving:a}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const i=Number(e)||0,o=Number(t)||0;if(null!=r&&Number.isFinite(Number(r)))return{matt:!0,score:Number(r),ovPct:0,overMarketPct:0,skal:null};if(!(i>0)||!(o>0)||!(o<i))return{matt:!1,score:null,ovPct:0,overMarketPct:0,skal:i>0?o>0?"j\xe4mf\xf6relsepriset underskrider inte kundens kostnad":"inget verifierat j\xe4mf\xf6relsepris kunde r\xe4knas fram":"\xe5rskostnaden kunde inte fastst\xe4llas"};const s=Math.round((i-o)/i*100),l=Math.round((i-o)/o*100),d=Math.max(5,Math.round(100-1.5*s));return{matt:!0,score:n?(Number(a)||0)>0?Math.min(d,79):d:Math.min(d,85),ovPct:s,overMarketPct:l,skal:null}}({annual:ea,suggested:null!==(S=null===lr||void 0===lr||null===($=lr.recommendation)||void 0===$?void 0:$.suggestedAnnualCost)&&void 0!==S?S:0,clickPriceScore:null!==(N=null===lr||void 0===lr||null===(E=lr.recommendation)||void 0===E||null===(_=E.clickRateAnalysis)||void 0===_?void 0:_.priceGapScore)&&void 0!==N?N:null,shouldSwitch:null===lr||void 0===lr||null===(z=lr.recommendation)||void 0===z?void 0:z.shouldSwitch,netSaving:null===lr||void 0===lr||null===(C=lr.recommendation)||void 0===C?void 0:C.netSaving}),oa=ia.ovPct,sa=ia.overMarketPct,la=ia.matt,da=null!==(A=ia.score)&&void 0!==A?A:0,ca=da<45?{dot:"#DC2626",num:"#DC2626",label:"Kritisk",labelClr:"#991B1B",txt:"#7F1D1D",bg:"#FEF2F2",border:"rgba(220,38,38,.18)"}:da<65?{dot:"#D97706",num:"#D97706",label:"Suboptimerat",labelClr:"#92400E",txt:"#78350F",bg:"#FFFBEB",border:"rgba(217,119,6,.18)"}:da<80?{dot:"#65A30D",num:"#65A30D",label:"F\xf6rb\xe4ttringsl\xe4ge",labelClr:"#365314",txt:"#365314",bg:"#F7FEE7",border:"rgba(101,163,13,.18)"}:{dot:"#1B7A6E",num:"#1B7A6E",label:"Optimalt",labelClr:"#0E4F47",txt:"#0E4F47",bg:"#DCEEEA",border:"rgba(27,122,110,.18)"},ua=(null===lr||void 0===lr?void 0:lr.monitoringDate)&&new Date(lr.monitoringDate)<new Date,pa=null!==lr&&void 0!==lr&&lr.servicePeriodEnd?Math.ceil((new Date(lr.servicePeriodEnd)-new Date)/864e5):null,ma=null!==(D=null===lr||void 0===lr||null===(F=lr.recommendation)||void 0===F?void 0:F.secondarySaving)&&void 0!==D?D:null,fa=ma?(null!==(O=null===lr||void 0===lr||null===(T=lr.recommendation)||void 0===T?void 0:T.grossSaving)&&void 0!==O?O:0)-ma.grossSaving:null,ha=ma?"bredband"===ma.category?"Bredband"+(ma.speedMbit?` ${ma.speedMbit} Mbit`:""):"Mobil"+(ma.seatCount?` (${ma.seatCount} st)`:""):null,ga=!(null===lr||void 0===lr||null===(P=lr.recommendation)||void 0===P||!P.shouldSwitch||null!==lr&&void 0!==lr&&null!==(L=lr.recommendation)&&void 0!==L&&L.suggestedSupplier||null==ma),xa=zm(ga?ma.category:null!==(R=null===lr||void 0===lr||null===(I=lr.categorized)||void 0===I?void 0:I.category)&&void 0!==R?R:"uncategorized"),va=oa>=15?null!==(B=xa.smfBenchmark)&&void 0!==B?B:"ett l\xe4gre verifierat marknadspris finns att h\xe4mta":"samma avtal kostar mindre till leverant\xf6rens publika \xe5rsavtalspris",ba=la?ga?`Ert ${zm(null!==(M=null===lr||void 0===lr||null===(V=lr.categorized)||void 0===V?void 0:V.category)&&void 0!==M?M:"uncategorized").label.toLowerCase()} \xe4r konkurrenskraftigt \u2014 ${null!==ha&&void 0!==ha?ha:"sekund\xe4rtj\xe4nsten"} kan optimeras.`:"monitoring"===(null===lr||void 0===lr?void 0:lr.route)?ua?`Avtalsl\xe5set lossnar snart${null!=pa?` \u2014 ${pa} dagar kvar`:""}. Arvo f\xf6rbereder bytet inf\xf6r f\xf6rnyelsen.`:da>=80?"Ni betalar marknadsm\xe4ssigt i dag \u2014 Arvo bevakar och agerar inf\xf6r f\xf6rnyelsen.":`Ni betalar ${sa}% \xf6ver verifierat marknadspris \u2014 ett l\xe4gre pris finns att s\xe4kra inf\xf6r f\xf6rnyelsen.`:da<45?sa>0?`Ni betalar ${sa}% \xf6ver marknadspris \u2014 ${oa>=15?null!==(U=xa.smfBenchmark)&&void 0!==U?U:"stor besparingspotential":va}.`:"Ni betalar markant s\xe4mre \xe4n branschsnittet \u2014 stor besparingspotential.":da<80?sa>0?`Ni betalar ${sa}% \xf6ver marknadspris \u2014 ${va}.`:"Ni betalar n\xe5got s\xe4mre \xe4n branschsnittet \u2014 ett l\xe4gre verifierat marknadspris finns att h\xe4mta.":"Ni har ett marknadsm\xe4ssigt avtal \u2014 b\xe4ttre \xe4n branschsnittet.":`Vi har l\xe4st er faktura och ert nul\xe4ge \u2014 men ${ia.skal}. Vi h\xe4vdar d\xe4rf\xf6r inget om er prisniv\xe5 i dag, och l\xe4gger aldrig fram en besparing vi inte kan r\xe4kna hem.`,ka=2*Math.PI*26,ya=da/100*ka,{score:ja,gaugeReady:wa}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;const[r,a]=n.useState(!1),[i,o]=n.useState(0);return n.useEffect(()=>{if(a(!1),o(0),!e)return;const r=setTimeout(()=>{a(!0);const t=performance.now();let r;const n=a=>{const i=Math.min((a-t)/1450,1),s=1-Math.pow(1-i,3);o(Math.round(e*s)),i<1?r=requestAnimationFrame(n):o(e)};return r=requestAnimationFrame(n),()=>{r&&cancelAnimationFrame(r)}},t);return()=>clearTimeout(r)},[e,t]),{score:i,gaugeReady:r}}(da,400),Sa=xa.isRealPrice,$a=!(null===lr||void 0===lr||null===(K=lr.categorized)||void 0===K||!K.licensePending),Na=xa.partnerLabel,Ea=(null!==(H=null===lr||void 0===lr||null===(W=lr.recommendation)||void 0===W?void 0:W.suggestedSupplier)&&void 0!==H?H:"").toLowerCase().trim(),_a=(null!==(q=null!==(G=null===lr||void 0===lr||null===(Y=lr.categorized)||void 0===Y?void 0:Y.normalizedSupplier)&&void 0!==G?G:null===lr||void 0===lr||null===(J=lr.extracted)||void 0===J?void 0:J.supplier)&&void 0!==q?q:"").toLowerCase().trim(),za=Sa&&Ea&&_a&&(Ea===_a||Ea.includes(_a)||_a.includes(Ea)),Ca=za?`S\xe4nk er ${null===lr||void 0===lr||null===(Q=lr.recommendation)||void 0===Q?void 0:Q.suggestedSupplier}-kostnad`:Sa?"Aktivera bytet":"S\xe4kra besparingen",Aa=!!("auto"===(null===lr||void 0===lr?void 0:lr.route)&&null!==lr&&void 0!==lr&&null!==(X=lr.recommendation)&&void 0!==X&&X.suggestedAnnualCost&&!$a&&na>0);"auto"!==(null===lr||void 0===lr?void 0:lr.route)||null===lr||void 0===lr||null===(Z=lr.recommendation)||void 0===Z||Z.isOptimize;return(0,$c.jsxs)(Mm,{children:[(0,$c.jsx)(uu,{variant:"public"}),bn&&(0,$c.jsxs)("div",{style:{background:"connected"===bn.type?"#F0FDF9":"pending"===bn.type?"#FFFBEB":"#FEF2F2",borderBottom:"1px solid "+("connected"===bn.type?"#6EE7D1":"pending"===bn.type?"#FCD34D":"#FECACA"),padding:"13px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[(0,$c.jsxs)("span",{style:{fontSize:14,color:"connected"===bn.type?"#065F46":"pending"===bn.type?"#92400E":"#991B1B",fontWeight:600,lineHeight:1.5},children:["connected"===bn.type&&(0,$c.jsxs)($c.Fragment,{children:["gmail"===bn.provider?"Gmail":"Outlook"," kopplat \u2014"," ",bn.invoices>0?`Arvo hittade ${bn.invoices} fakturor i er inkorg \u2014 analysera er f\xf6rsta nedan, det tar 2 minuter.`:"Inkorgen \xe4r kopplad. Analysera er f\xf6rsta faktura nedan \u2014 det tar 2 minuter."]}),"pending"===bn.type&&(0,$c.jsxs)($c.Fragment,{children:["gmail"===bn.provider?"Gmail":"Outlook","-anslutning kr\xe4ver konfiguration \u2014"," ","er aktivering \xe4r mottagen och Arvo kontaktar er inom kort."]}),"error"===bn.type&&(0,$c.jsxs)($c.Fragment,{children:["Anslutning misslyckades (",bn.errorCode,") \u2014 f\xf6rs\xf6k igen eller kontakta hej@arvoflow.se."]})]}),(0,$c.jsx)("button",{onClick:()=>kn(null),style:{background:"none",border:"none",cursor:"pointer",fontSize:18,lineHeight:1,opacity:.5,padding:"0 4px"},"aria-label":"St\xe4ng",children:"\xd7"})]}),(0,$c.jsxs)(Vm,{children:[(0,$c.jsxs)(Um,{children:[(0,$c.jsx)("span",{className:"dot"})," Arvo Intelligence \xb7 Analys p\xe5 60 sekunder"]}),(0,$c.jsxs)(Km,{children:["Ni betalar f\xf6r mycket. ",(0,$c.jsx)("em",{children:"En"})," faktura bevisar det."]}),(0,$c.jsx)(Hm,{children:"Arvo Intelligence j\xe4mf\xf6r er faktura mot verkliga branschpriser och visar exakt vad ni betalar f\xf6r mycket \u2014 och hos vem ni kan spara."})]}),(0,$c.jsxs)(Wm,{children:[!lr&&(0,$c.jsx)(qm,{children:(0,$c.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),await async function(){var e,t;let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!Jt)return void sr("V\xe4lj en PDF-faktura f\xf6rst.");const n=!!(null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:localStorage.getItem("arvo_gate_passed"));if(!r&&!n){var a;const e=localStorage.getItem("arvo_had_saving"),t=parseInt(null!==(a=localStorage.getItem("arvo_successful_count"))&&void 0!==a?a:"0");if(e||t>=2)return Tr("quota"),void Ar(!0)}let i,o;r&&localStorage.setItem("arvo_gate_passed","1"),sr(null),dr(null),Ar(!1),ln(null),cn("idle"),ir("uploading");try{var s,l,d,c;const e=await Kf(Jt),t=await If(),n=null!==(s=null!==(l=null!==(d=sessionStorage.getItem("arvo_bypass"))&&void 0!==d?d:localStorage.getItem("arvo_bypass"))&&void 0!==l?l:localStorage.getItem("arvo_gate_passed"))&&void 0!==s?s:void 0;let a=_r;try{var u;const e=await fetch("/api/token",{method:"POST"});a=null!==(u=(await e.json()).token)&&void 0!==u?u:_r,zr(a)}catch{}ir("extract"),i=setTimeout(()=>ir("categorize"),6e3),o=setTimeout(()=>ir("recommend"),14e3);const g=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:Xt,employees:Number(er),revenue:""===rr?null:Number(rr),token:a,fingerprint:t,bypass:n||void 0,email:r||void 0,userEmail:Yt||void 0})});clearTimeout(i),clearTimeout(o);const x=await g.json().catch(()=>({}));if(x.gate&&"saving_limit"===x.gateType)return ir("done"),dr(x),Tr("saving_limit"),void Ar(!0);if(x.gate)return ir(null),void Ar(!0);if(x.timeout)return ir(null),void sr("Analysen tog lite f\xf6r l\xe5ng tid just nu. V\xe4nta ett \xf6gonblick och f\xf6rs\xf6k igen \u2014 det brukar g\xe5 snabbare vid andra f\xf6rs\xf6ket.");if(429===g.status||x.rateLimited)return ir(null),void sr("Du har analyserat f\xf6r m\xe5nga fakturor idag (max 5/dag). Kontakta oss p\xe5 hej@arvoflow.se f\xf6r att ut\xf6ka din kvot.");if(!g.ok||!x.ok)throw new Error(x.error||`Servern returnerade ${g.status}`);if(ir("done"),dr(x),ur(null!==(c=x.analysisId)&&void 0!==c?c:null),mr(""),hr("idle"),"auto"===x.route){var p,m;const e=parseInt(null!==(p=localStorage.getItem("arvo_successful_count"))&&void 0!==p?p:"0")+1;var f,h;if(localStorage.setItem("arvo_successful_count",String(e)),(null===(m=x.recommendation)||void 0===m?void 0:m.netSaving)>0)localStorage.setItem("arvo_had_saving","1"),(null!==(f=null!==(h=sessionStorage.getItem("arvo_bypass"))&&void 0!==h?h:localStorage.getItem("arvo_bypass"))&&void 0!==f?f:localStorage.getItem("arvo_gate_passed"))||(Tr("saving"),Ar(!0))}}catch(g){clearTimeout(i),clearTimeout(o),ir(null),sr(g.message||"N\xe5got gick fel. F\xf6rs\xf6k igen.")}}()},children:[(0,$c.jsxs)(Gm,{$active:gr,$hasFile:!!Jt||Ln,onClick:()=>{var e;return null===(e=qt.current)||void 0===e?void 0:e.click()},onDrop:e=>{e.preventDefault(),xr(!1);const t=e.dataTransfer.files;(null===t||void 0===t?void 0:t.length)>1?In(t):null!==t&&void 0!==t&&t[0]&&Rn(t[0])},onDragOver:e=>{e.preventDefault(),xr(!0)},onDragLeave:e=>{e.preventDefault(),xr(!1)},role:"button",tabIndex:0,onKeyDown:e=>{var t;"Enter"!==e.key&&" "!==e.key||null===(t=qt.current)||void 0===t||t.click()},children:[(0,$c.jsx)("input",{ref:qt,type:"file",accept:"application/pdf,.pdf",multiple:!0,onChange:e=>{const t=e.target.files;(null===t||void 0===t?void 0:t.length)>1?In(t):null!==t&&void 0!==t&&t[0]&&Rn(t[0])}}),(0,$c.jsx)("div",{className:"icon",children:(0,$c.jsx)(yp,{name:Jt||Ln?"check":"upload",size:28,stroke:1.75})}),Ln?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("strong",{className:"primary",children:[En.length," fakturor valda"]}),(0,$c.jsxs)("span",{className:"secondary",children:[En.map(e=>e.name).join(", ").slice(0,80),En.map(e=>e.name).join(", ").length>80?"\u2026":""]})]}):Jt?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{className:"primary",children:"Faktura vald"}),(0,$c.jsxs)("span",{className:"filename",children:[Jt.name," \xb7 ",(Jt.size/1024).toFixed(0)," kB"]})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{className:"primary",children:"undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"L\xe4gg till er faktura":"Dra hit er faktura"}),(0,$c.jsxs)("span",{className:"cta-pill",children:["undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"V\xe4lj faktura":"V\xe4lj fil"," \u2192"]}),(0,$c.jsx)("span",{className:"secondary",children:"PDF \xb7 max 3 MB \xb7 Vi sparar inte filen"})]})]}),(Jt||Ln)&&(0,$c.jsxs)(Xm,{children:[(0,$c.jsxs)(Ym,{children:[(0,$c.jsxs)(Jm,{children:[(0,$c.jsx)("span",{className:"label",children:"Bransch"}),(0,$c.jsx)("span",{className:"hint",children:"Vi j\xe4mf\xf6r mot bolag av er storlek i samma bransch."}),(0,$c.jsx)("select",{value:Xt,onChange:e=>Zt(e.target.value),children:Object.entries(Mf).map(e=>{let[t,r]=e;return(0,$c.jsx)("option",{value:t,children:r},t)})})]}),(0,$c.jsxs)(Jm,{children:[(0,$c.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$c.jsx)("span",{className:"hint",children:"Prisniv\xe5n varierar med bolagets storlek."}),(0,$c.jsx)("input",{type:"number",min:"1",max:"5000",value:er,onChange:e=>tr(e.target.value)})]})]}),or&&(0,$c.jsx)(tf,{children:or}),(0,$c.jsx)(Qm,{children:Ln?(0,$c.jsx)(Bc,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:Tn,onClick:async()=>{var e,t;if(En.length<2)return;On(null),Cn({status:"processing",total:En.length,done:0,failed:0}),Dn(En.map((e,t)=>({index:t,filename:e.name,status:"pending"}))),Pn(!0);let r=_r;try{var n;const e=await fetch("/api/token",{method:"POST"});r=null!==(n=(await e.json()).token)&&void 0!==n?n:_r,zr(r)}catch{}const a=null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:void 0;let i=0,o=0;for(let d=0;d<En.length;d++){Dn(e=>e.map((e,t)=>t===d?{...e,status:"extracting"}:e));try{var s;const e=await Kf(En[d]),t=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:Xt,employees:parseInt(er,10)||5,token:null!==(s=r)&&void 0!==s?s:"dev",bypass:a})}),n=await t.json();n.route?(i++,Dn(e=>e.map((e,t)=>t===d?{...e,status:"done",route:n.route,extracted:n.extracted,categorized:n.categorized,recommendation:n.recommendation}:e))):(o++,Dn(e=>e.map((e,t)=>{var r;return t===d?{...e,status:"failed",error:null!==(r=n.error)&&void 0!==r?r:"Analys misslyckades"}:e})))}catch(l){o++,Dn(e=>e.map((e,t)=>t===d?{...e,status:"failed",error:l.message}:e))}Cn({status:d===En.length-1?"done":"processing",total:En.length,done:i,failed:o})}Pn(!1)},children:Tn?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(rf,{})," Analyserar ",En.length," fakturor\u2026"]}):(0,$c.jsxs)($c.Fragment,{children:["Analysera ",En.length," fakturor ",(0,$c.jsx)(yp,{name:"arrow",size:18})]})}):(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:Kn||!Jt,children:Kn?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(rf,{})," Analyserar\u2026"]}):(0,$c.jsxs)($c.Fragment,{children:["Analysera fakturan ",(0,$c.jsx)(yp,{name:"arrow",size:18})]})})})]}),Kn&&(0,$c.jsx)(nf,{children:Uf.map(e=>{const t=(e=>{if(!ar)return"pending";if("done"===ar)return"done";const t=["uploading","extract","categorize","recommend"],r=t.indexOf(ar),n=t.indexOf(e);return n<r?"done":n===r?"active":"pending"})(e.id);return(0,$c.jsxs)(af,{$state:t,children:[(0,$c.jsx)("div",{className:"bullet",children:"done"===t?(0,$c.jsx)(yp,{name:"check",size:14,stroke:2.5}):(0,$c.jsx)("span",{children:Uf.findIndex(t=>t.id===e.id)+1})}),(0,$c.jsxs)("div",{className:"label",children:[e.label,"active"===t&&e.sublabel&&(0,$c.jsx)("div",{style:{fontSize:11,opacity:.6,marginTop:2,fontWeight:400},children:e.sublabel})]}),(0,$c.jsx)("div",{className:"time",children:"done"===t?"\u2713":"active"===t?"\u2026":""})]},e.id)})}),(0,$c.jsxs)(ef,{children:["Genom att forts\xe4tta godk\xe4nner du v\xe5ra ",(0,$c.jsx)(vs,{to:"/villkor",children:"villkor"})," ","och v\xe5r ",(0,$c.jsx)(vs,{to:"/integritet",children:"integritetspolicy"}),". Fakturan analyseras av Arvo Intelligence och raderas omedelbart efter analysen."]})]})}),Ln&&(zn||Fn)&&(0,$c.jsxs)(qm,{style:{marginTop:20},children:[(0,$c.jsx)(zf,{children:(0,$c.jsxs)("div",{children:[(0,$c.jsxs)("span",{className:"badge",children:[(0,$c.jsx)(yp,{name:"spark",size:10})," Batch-analys"]}),(0,$c.jsx)("h3",{children:"done"===(null===zn||void 0===zn?void 0:zn.status)?"Analys klar":"failed"===(null===zn||void 0===zn?void 0:zn.status)?"Analys misslyckades":"Analyserar fakturor\u2026"}),(0,$c.jsx)("div",{className:"sub",children:zn?`${null!==(ee=zn.done)&&void 0!==ee?ee:0} av ${zn.total} klara${zn.failed?` \xb7 ${zn.failed} misslyckades`:""}`:Fn||`${En.length} fakturor k\xf6ade`})]})}),zn&&(0,$c.jsx)(Cf,{$pct:zn.total>0?Math.round(((null!==(te=zn.done)&&void 0!==te?te:0)+(null!==(re=zn.failed)&&void 0!==re?re:0))/zn.total*100):0,children:(0,$c.jsx)("div",{className:"fill"})}),Fn&&(0,$c.jsx)(tf,{style:{marginBottom:16},children:Fn}),"done"===(null===zn||void 0===zn?void 0:zn.status)&&(()=>{const e=An.filter(e=>{var t;return null===e||void 0===e||null===(t=e.recommendation)||void 0===t?void 0:t.shouldSwitch}),t=e.reduce((e,t)=>{var r,n;return e+(null!==(r=null===(n=t.recommendation)||void 0===n?void 0:n.netSaving)&&void 0!==r?r:0)},0),r=An.filter(e=>"review_queue"===(null===e||void 0===e?void 0:e.route)).length;return(0,$c.jsxs)(Ff,{children:[(0,$c.jsxs)("div",{className:"stat highlight",children:[(0,$c.jsxs)("div",{className:"value",children:[bu(Math.round(t/1e3)),"k"]}),(0,$c.jsx)("div",{className:"label",children:"Nettobesparing/\xe5r"})]}),(0,$c.jsxs)("div",{className:"stat",children:[(0,$c.jsx)("div",{className:"value",children:e.length}),(0,$c.jsx)("div",{className:"label",children:"Rekommenderar byte"})]}),(0,$c.jsxs)("div",{className:"stat",children:[(0,$c.jsx)("div",{className:"value",children:r}),(0,$c.jsx)("div",{className:"label",children:"Kr\xe4ver granskning"})]})]})})(),(0,$c.jsx)(Af,{children:(An.length>0?An:En.map((e,t)=>({index:t,filename:e.name,status:"pending"}))).map((e,t)=>{var r,n,a,i,o,s,l;const d=null!==(r=null===e||void 0===e?void 0:e.status)&&void 0!==r?r:"pending",c=null!==(n=null===e||void 0===e||null===(a=e.recommendation)||void 0===a?void 0:a.netSaving)&&void 0!==n?n:null,u="done"===d?"check":"failed"===d?"x":"processing"===d?"spark":"file",p="done"===d?"review_queue"===e.route?"Kr\xe4ver granskning":"unsupported"===e.route?"Utanf\xf6r scope":"Klar":"failed"===d?"Misslyckades":"processing"===d?"Kategoriserar\u2026":"extracting"===d?"L\xe4ser faktura\u2026":"V\xe4ntar\u2026";return(0,$c.jsxs)(Df,{$status:d,children:[(0,$c.jsx)("div",{className:"icon-wrap",children:(0,$c.jsx)(yp,{name:u,size:14,stroke:2})}),(0,$c.jsx)("span",{className:"name",children:null!==(o=null!==(s=null===e||void 0===e?void 0:e.filename)&&void 0!==s?s:null===(l=En[t])||void 0===l?void 0:l.name)&&void 0!==o?o:`Faktura ${t+1}`}),(0,$c.jsx)("span",{className:"status-label",children:p}),c>0&&(0,$c.jsxs)("span",{className:"saving",children:["\u2212",bu(c)," kr/\xe5r"]})]},null!==(i=null===e||void 0===e?void 0:e.index)&&void 0!==i?i:t)})}),"done"!==(null===zn||void 0===zn?void 0:zn.status)&&"failed"!==(null===zn||void 0===zn?void 0:zn.status)&&(0,$c.jsx)("p",{style:{fontSize:12,color:"#888",textAlign:"center",margin:0},children:"Arvo analyserar fakturorna i bakgrunden. Uppdateras var 5:e sekund."})]}),lr&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(qm,{ref:Gt,children:[(0,$c.jsxs)(of,{children:[(0,$c.jsxs)("div",{className:"bh-top",children:[(0,$c.jsxs)("span",{className:"bh-stamp",children:["Arvo-analys \xb7 ",(new Date).toLocaleDateString("sv-SE",{day:"numeric",month:"short",year:"numeric"}).toUpperCase()]}),(0,$c.jsx)("button",{className:"bh-dl",onClick:()=>Qr(!0),title:"Ladda ner analys",children:(0,$c.jsx)("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",children:(0,$c.jsx)("path",{d:"M12 5v14M5 12l7 7 7-7"})})})]}),(0,$c.jsx)("div",{className:"bh-main",children:(0,$c.jsx)("h2",{className:"bh-supplier",children:lr.extracted.supplier})}),(0,$c.jsx)("div",{className:"bh-row",children:lr.categorized&&(0,$c.jsxs)("span",{className:"bh-chip",children:["natavgift"===lr.reason?"N\xe4tavgift":null!=ma?`${zm(lr.categorized.category).label} & ${ha}`:zm(lr.categorized.category).label||lr.categorized.category,lr.categorized.subType&&"natavgift"!==lr.reason&&null==ma?` \xb7 ${lr.categorized.subType}`:""]})})]}),(0,$c.jsx)(Om,{finding:null===(ne=lr.recommendation)||void 0===ne?void 0:ne.leadFinding,extraCount:(null!==(ae=null===(ie=lr.recommendation)||void 0===ie||null===(oe=ie.forensicFindings)||void 0===oe?void 0:oe.length)&&void 0!==ae?ae:0)-1,variant:"light"}),"monitoring"!==lr.route&&(0,$c.jsx)(Om,{finding:lr.contractClock,variant:"light"}),"monitoring"===lr.route?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(_f,{style:{"--diag-color":ca.dot},children:[(0,$c.jsxs)("div",{className:"gauge-wrap",children:[(0,$c.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$c.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E5E7EB",strokeWidth:"4.5"}),(0,$c.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:ca.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:`${ya} ${ka}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1s ease"}})]}),(0,$c.jsxs)("div",{className:"gauge-num",style:{color:ca.dot},children:[(0,$c.jsx)("span",{className:"gauge-val",children:la?da:"\u2014"}),(0,$c.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$c.jsxs)("div",{className:"diag-body",children:[(0,$c.jsxs)("div",{className:"diag-top",children:[(0,$c.jsx)("span",{className:"diag-score-label",children:"Arvo Score"}),(0,$c.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$c.jsxs)("span",{className:"diag-status",children:[(0,$c.jsx)(yp,{name:"alert-circle",size:13,color:ca.dot,stroke:2}),(0,$c.jsx)("span",{className:"diag-label",style:{color:ca.labelClr},children:ca.label})]})]}),(0,$c.jsx)("p",{className:"diag-text",children:ba})]})]}),(0,$c.jsxs)(hf,{children:[(0,$c.jsxs)("div",{className:"monitoring-kicker",children:[(0,$c.jsx)("span",{className:"monitoring-dot"}),"Bevakning aktiverad"]}),"fixed_price"===lr.contractType?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("strong",{children:["Fastprisavtal \u2014 bundet t.o.m. ",lr.servicePeriodEnd?new Date(lr.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):lr.servicePeriodEnd,"."]}),(0,$c.jsx)("p",{children:ua?`Fastprisavtal kan inte avslutas i f\xf6rtid. Avtalet l\xf6per ut om ${null!=pa?`${pa} dagar`:"kort tid"} \u2014 Arvo f\xf6rbereder bytet till ett b\xe4ttre avtal nu.`:`Fastprisavtal kan inte avslutas i f\xf6rtid. Arvo bevakar avtalet och p\xe5minner er ${lr.monitoringDate?new Date(lr.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):"3 m\xe5nader"} innan slutdatum s\xe5 ni hinner byta till ett b\xe4ttre avtal i r\xe4tt tid.`})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:ua?"Avtalet l\xf6per ut snart \u2014 Arvo agerar nu.":null!=lr.cancellationNoticeDays?"Avtalet \xe4r l\xe5st \u2014 vi l\xe4gger det p\xe5 bevakning.":"\xc5rsavtal \u2014 Arvo bevakar inf\xf6r f\xf6rnyelse."}),(0,$c.jsx)("p",{children:(()=>{const e=lr.servicePeriodEnd,t=lr.cancellationNoticeDays,r=lr.monitoringDate,n=e?new Date(e).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):null,a=r?new Date(r).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):null;return ua?`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}${null!=pa?` (${pa} dagar kvar)`:""}. Arvo f\xf6rbereder bytet till b\xe4sta verifierade villkor innan f\xf6rnyelse.`:null!=t?`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}. Upps\xe4gningstiden (${t} dagar) har redan passerat. Arvo f\xf6rbereder bytet ${null!==a&&void 0!==a?a:"90 dagar innan n\xe4sta f\xf6rnyelse"}.`:`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}. Vi p\xe5minner er i ${null!==a&&void 0!==a?a:"90 dagar innan slutdatum"} \u2014 i god tid f\xf6r att agera n\xe4r avtalet l\xf6per ut.`})()})]})]}),(0,$c.jsxs)(vf,{children:[(0,$c.jsxs)("div",{children:[(0,$c.jsxs)("dt",{children:["Ni betalar idag",zm(null===(se=lr.categorized)||void 0===se?void 0:se.category).elSuffix?" (energidel)":""]}),(0,$c.jsxs)("dd",{children:[bu(lr.extracted.annualCost)," / \xe5r","annual"!==lr.extracted.billingPeriod&&(0,$c.jsxs)("small",{style:{fontStyle:"italic"},children:["Projicerat fr\xe5n abonnemangsradernas listpris",lr.extracted.billingPeriodAssumed?" \xb7 antaget m\xe5nadsvis (fakturan saknar period)":""]})]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Fakturadatum"}),(0,$c.jsx)("dd",{children:lr.extracted.date})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$c.jsx)("dd",{children:bu(lr.extracted.amount)})]}),lr.extracted.servicePeriodEnd&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Avtalstid t.o.m."}),(0,$c.jsx)("dd",{children:new Date(lr.extracted.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"})})]}),lr.monitoringDate&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:ua?"Bevakning":"Arvo p\xe5minner er"}),(0,$c.jsx)("dd",{children:ua?null!=pa?`Aktiv \u2014 avtal l\xf6per ut om ${pa} dagar`:"Aktiv":(()=>{const e=new Date(lr.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"});return e.charAt(0).toUpperCase()+e.slice(1)})()})]})]}),((null===(le=lr.categorized)||void 0===le?void 0:le.reasoning)||lr.potentialSavingNote)&&(0,$c.jsxs)(jf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Avtals\xf6versikt"}),(null===(de=lr.categorized)||void 0===de?void 0:de.reasoning)&&(0,$c.jsxs)("p",{children:[lr.categorized.normalizedSupplier||(null===(ce=lr.extracted)||void 0===ce?void 0:ce.supplier)," fakturerar"," ",bu(null===(ue=lr.extracted)||void 0===ue?void 0:ue.annualCost)," per \xe5r f\xf6r"," ",zm(lr.categorized.category).inlineLabel,"."," ","Avtalet \xe4r bevakat \u2014 Arvo tar kontakt"," ",null!=pa&&pa<=90?"nu inf\xf6r f\xf6rest\xe5ende f\xf6rnyelse":lr.monitoringDate&&!ua?`fr\xe5n ${new Date(lr.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"})}`:"inf\xf6r avtalets f\xf6rnyelse"," ","och s\xe4krar b\xe4sta villkor utan att ni beh\xf6ver l\xe4gga tid p\xe5 det."]}),lr.potentialSavingNote&&(0,$c.jsxs)("p",{style:{marginTop:null!==(pe=lr.categorized)&&void 0!==pe&&pe.reasoning?10:0},children:[(0,$c.jsx)("strong",{children:"Potentiell nettobesparing vid avtalets slut:"})," ",lr.potentialSavingNote]})]})]}):"unsupported"===lr.route?(0,$c.jsx)(mf,{children:"natavgift"===lr.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"N\xe4tavgift \u2014 reglerat monopol, kan inte f\xf6rhandlas."}),(0,$c.jsxs)("p",{children:["Denna faktura \xe4r fr\xe5n er lokala n\xe4t\xe4gare (",null!==(me=null===(fe=lr.extracted)||void 0===fe?void 0:fe.supplier)&&void 0!==me?me:"n\xe4tbolaget",") och avser eln\xe4tets distributionskostnad. N\xe4tavgiften best\xe4ms av Energimarknadsinspektionen och \xe4r geografiskt bunden \u2014 den kan inte p\xe5verkas genom ett elleverant\xf6rsbyte."]}),(0,$c.jsxs)("p",{children:["Ladda upp er ",(0,$c.jsx)("strong",{children:"elhandelsfaktura"})," (fr\xe5n er elleverant\xf6r) f\xf6r att se om ni betalar r\xe4tt pris f\xf6r sj\xe4lva elen."]})]}):"credit_note"===lr.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Kreditnota \u2014 ingen analys m\xf6jlig."}),(0,$c.jsx)("p",{children:"Filen verkar vara en kreditnota med negativt belopp. Ladda upp den ordinarie fakturan f\xf6r en korrekt analys."})]}):"insurance"===lr.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"F\xf6rs\xe4kringar hanteras inte av Arvo \xe4nnu."}),(0,$c.jsx)("p",{children:"F\xf6rs\xe4kringsf\xf6rmedling kr\xe4ver tillst\xe5nd fr\xe5n Finansinspektionen. Arvo planerar att ans\xf6ka om detta tillst\xe5nd under 2027 \u2014 tills dess analyserar vi inte f\xf6rs\xe4kringsfakturor. Ladda upp en annan leverant\xf6rsfaktura f\xf6r att komma ig\xe5ng."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Utanf\xf6r analysr\xe4ckvidden."}),(0,$c.jsx)("p",{children:"Denna faktura avser en tj\xe4nst vi inte optimerar (t.ex. juridik, redovisning, bemanning eller myndighetsavgifter). Koppla Fortnox / Visma f\xf6r att analysera era \xf6vriga leverant\xf6rer."})]})}):"review_queue"===lr.route?(0,$c.jsxs)(mf,{children:["volume_data_required"===lr.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Kr\xe4ver offert \u2014 v\xe5ra experter kikar p\xe5 detta."}),(0,$c.jsx)("p",{children:lr.volumeDataNote||"Kostnaden f\xf6r denna kategori styrs av specifika volymer och specifikationer, inte antalet anst\xe4llda. V\xe5ra experter kikar p\xe5 detta manuellt f\xf6r att ge er en r\xe4ttvis analys."}),null!=lr.creditExpiryMonths&&(0,$c.jsxs)(gf,{style:lr.creditWillExpireUnused?{background:"#FEF3C7",borderColor:"rgba(217,119,6,.25)"}:void 0,children:[(0,$c.jsx)("strong",{children:lr.creditWillExpireUnused?`\u26a0 Krediter f\xf6rfaller ${lr.creditExpiryDate} \u2014 ${lr.creditExpiryMonths} ${1===lr.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} kvar`:`Era startup-krediter r\xe4cker ca ${lr.creditExpiryMonths} ${1===lr.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} till`}),(0,$c.jsxs)("p",{children:["Ni f\xf6rbrukar ",lr.startupCreditCurrency," ",null===(he=lr.startupCreditMonthlyBurn)||void 0===he?void 0:he.toLocaleString("sv-SE"),"/m\xe5n men betalar ingenting tack vare kvarvarande kredit (",lr.startupCreditCurrency," ",null===(ge=lr.startupCreditBalance)||void 0===ge?void 0:ge.toLocaleString("sv-SE"),").",lr.creditWillExpireUnused?` Vid nuvarande f\xf6rbrukningstakt f\xf6rfaller ca ${lr.startupCreditCurrency} ${null===(xe=lr.creditUnusedAmount)||void 0===xe?void 0:xe.toLocaleString("sv-SE")} oanv\xe4nt. \xd6verv\xe4g att skala upp era resurser eller kontakta leverant\xf6ren om f\xf6rl\xe4ngning \u2014 sedan bev\xe4pnar Arvo er med exakt vilken prisniv\xe5 ni ska kr\xe4va.`:" Nu \xe4r r\xe4tt tid att planera ert molnavtal \u2014 vi visar er exakt vilken prisniv\xe5 ni ska kr\xe4va innan fakturorna b\xf6rjar landa."]})]})]}):"foreign_currency"===lr.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("strong",{children:["Fakturan \xe4r i ",lr.currency," \u2014 kontakta oss."]}),(0,$c.jsx)("p",{children:"Vi st\xf6djer SEK och EUR. F\xf6r \xf6vriga valutor, kontakta oss s\xe5 hj\xe4lper vi er manuellt."})]}):"no_benchmark"===lr.reason?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Utanf\xf6r v\xe5r nuvarande t\xe4ckning."}),(0,$c.jsx)("p",{children:"Vi har \xe4nnu inte benchmarkdata f\xf6r denna leverant\xf6rskategori. Vi noterar fakturan och \xe5terkommer n\xe4r vi kan g\xf6ra en fullst\xe4ndig analys."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:"Fakturan beh\xf6ver djupare analys."}),(0,$c.jsx)("p",{children:"V\xe5r algoritm \xe4r inte tillr\xe4ckligt s\xe4ker p\xe5 klassificeringen f\xf6r att visa automatiska besparingssiffror. Koppla Fortnox / Visma f\xf6r en komplett, felfri analys av hela er leverant\xf6rsreskontra."})]}),"sent"===an?(0,$c.jsx)("p",{style:{fontSize:13,color:"#1B6E66",fontWeight:600,marginTop:14,marginBottom:0},children:"\u2713 Vi h\xf6r av oss n\xe4r analysen \xe4r klar!"}):(0,$c.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),rn&&"idle"===an){on("submitting");try{await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:rn,source:"review_queue",reason:null===lr||void 0===lr?void 0:lr.reason})}),on("sent")}catch{on("sent")}}},style:{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"},children:[(0,$c.jsx)("input",{type:"email",placeholder:"din@email.se \u2014 vi meddelar n\xe4r vi har ett svar",value:rn,onChange:e=>nn(e.target.value),required:!0,style:{flex:1,minWidth:180,padding:"9px 14px",borderRadius:100,border:"1.5px solid #D5E2DC",fontSize:13,outline:"none",background:"#fff",color:"#0E1A17"}}),(0,$c.jsx)("button",{type:"submit",disabled:!rn||"submitting"===an,style:{padding:"9px 18px",borderRadius:100,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#5DD6CA,#1B6E66)",color:"#fff",fontSize:13,fontWeight:700,opacity:rn&&"submitting"!==an?1:.55},children:"submitting"===an?"Skickar\u2026":"Meddela mig \u2192"})]})]}):null!==(ve=lr.recommendation)&&void 0!==ve&&ve.requiresQuote?(0,$c.jsxs)($c.Fragment,{children:[((null===(be=lr.recommendation)||void 0===be?void 0:be.clickRateAnalysis)||(null===(ke=lr.recommendation)||void 0===ke?void 0:ke.shouldSwitch)&&(null!==(ye=null===(je=lr.recommendation)||void 0===je?void 0:je.netSaving)&&void 0!==ye?ye:0)>0)&&(0,$c.jsx)($c.Fragment,{children:(0,$c.jsxs)(jf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Vad analysen visar"}),(0,$c.jsx)("p",{children:lr.recommendation.reasoning})]})}),(null===(we=lr.recommendation)||void 0===we||null===(Se=we.clickRateAnalysis)||void 0===Se?void 0:Se.estimatedAnnualSavingsHigh)>0?(0,$c.jsxs)(lf,{children:[(0,$c.jsxs)("div",{className:"estimate-header",children:[(0,$c.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$c.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$c.jsxs)("span",{className:"amount",children:["\u2248 ",Lf(lr.recommendation.clickRateAnalysis.estimatedAnnualSavingsLow),"\u2013",Lf(lr.recommendation.clickRateAnalysis.estimatedAnnualSavingsHigh),"\xa0kr/\xe5r"]}),(0,$c.jsx)("span",{className:"unit",children:"Er faktiska klickkostnad p\xe5 \xe5rsbasis mot marknadsbandet (estimat) \xb7 exakt belopp bekr\xe4ftas med offert"})]}):(null!==($e=null===(Ne=lr.recommendation)||void 0===Ne?void 0:Ne.netSaving)&&void 0!==$e?$e:0)>0?(0,$c.jsxs)(lf,{children:[(0,$c.jsxs)("div",{className:"estimate-header",children:[(0,$c.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$c.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$c.jsxs)("span",{className:"amount",children:["\u2248 +",Lf(lr.recommendation.netSaving),"\xa0kr/\xe5r"]}),(0,$c.jsx)("span",{className:"unit",children:"J\xe4mf\xf6rt mot verifierat B2B-marknadspris \xb7 bekr\xe4ftas med faktisk offert"})]}):null,(null===(Ee=lr.recommendation)||void 0===Ee?void 0:Ee.storageSubstitution)&&(()=>{const e=lr.recommendation.storageSubstitution;return(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1",marginBottom:"20px",padding:"18px 22px",background:"#0E1A17",borderRadius:"20px",border:"1.5px solid #1B7A6E"},children:[(0,$c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px",flexWrap:"wrap"},children:[(0,$c.jsx)("span",{style:{fontSize:"12px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",color:"#5DD6CA"},children:"Arkitektonisk insikt"}),(0,$c.jsxs)("span",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#0E1A17",background:"#5DD6CA",borderRadius:"4px",padding:"2px 6px"},children:[e.vendor," \xb7 USD"]})]}),(0,$c.jsx)("p",{style:{margin:0,fontSize:"15px",lineHeight:1.55,color:"#F1F6F3",fontWeight:600},children:e.usdPain}),(0,$c.jsx)("p",{style:{margin:"10px 0 0",fontSize:"14px",lineHeight:1.55,color:"#C7D6D0"},children:e.substitution}),(0,$c.jsx)("p",{style:{margin:"12px 0 0",paddingTop:"12px",borderTop:"1px solid #2A3A35",fontSize:"12px",lineHeight:1.5,color:"#8FA39C"},children:e.note})]})})(),(null===(_e=lr.recommendation)||void 0===_e?void 0:_e.m365Equivalent)&&(0,$c.jsxs)(df,{children:[(0,$c.jsxs)("div",{className:"ref-header",children:[(0,$c.jsx)("span",{className:"kicker",children:"Verifierad referens \u2014 likv\xe4rdig svit"}),(0,$c.jsx)("span",{className:"ref-badge",children:"Microsoft listpris"})]}),(0,$c.jsx)("div",{className:"ref-tier",children:lr.recommendation.m365Equivalent.m365TierLabel}),(0,$c.jsx)("div",{className:"ref-figure",children:null!=lr.recommendation.m365Equivalent.monthlyTotal?(0,$c.jsxs)($c.Fragment,{children:[Lf(lr.recommendation.m365Equivalent.monthlyTotal),"\xa0kr",(0,$c.jsxs)("span",{className:"per",children:["/m\xe5n f\xf6r ",lr.recommendation.m365Equivalent.seats," anv\xe4ndare"]})]}):(0,$c.jsxs)($c.Fragment,{children:[lr.recommendation.m365Equivalent.perSeatMonthlyLabel,"\xa0kr",(0,$c.jsx)("span",{className:"per",children:"/anv\xe4ndare/m\xe5n"})]})}),(0,$c.jsxs)("div",{className:"ref-sub",children:[lr.recommendation.m365Equivalent.perSeatMonthlyLabel,"\xa0kr/anv\xe4ndare/m\xe5n vid \xe5rsavtal \xb7 ",lr.recommendation.m365Equivalent.equivalenceNote]}),(0,$c.jsxs)("div",{className:"ref-disclaimer",children:[(0,$c.jsx)("strong",{children:"Detta \xe4r Microsofts publika listpris f\xf6r den likv\xe4rdiga sviten \u2014 inte ert Google-pris."})," Google publicerar bara listpris i USD; ert faktiska kronpris j\xe4mf\xf6r vi mot i offerten nedan."]})]}),(0,$c.jsxs)(mf,{children:[(0,$c.jsx)("strong",{children:null!==(ze=lr.recommendation)&&void 0!==ze&&ze.clickRateAnalysis?"Ber\xe4kna exakt besparing per \xe5r":(null!==(Ce=null===(Ae=lr.recommendation)||void 0===Ae?void 0:Ae.netSaving)&&void 0!==Ce?Ce:0)>0?"S\xe4kra besparingen \u2014 kr\xe4ver offert":null!==(De=lr.recommendation)&&void 0!==De&&De.m365Equivalent?"Exakt Google-pris kr\xe4ver offert":"unaudited"===(null===(Fe=lr.recommendation)||void 0===Fe?void 0:Fe.revisionGate)?"Kr\xe4ver offert \u2014 Arvo g\xf6r en manuell genomg\xe5ng":"Kr\xe4ver offert \u2014 volymdata beh\xf6vs."}),(0,$c.jsx)("p",{children:null!==(Oe=lr.recommendation)&&void 0!==Oe&&Oe.clickRateAnalysis?"Klickpriset \xe4r fastslaget. Fyll i nedan s\xe5 ber\xe4knar Arvo det exakta beloppet inklusive maskinleasing.":(null!==(Te=null===(Pe=lr.recommendation)||void 0===Pe?void 0:Pe.netSaving)&&void 0!==Te?Te:0)>0?"Fyll i era uppgifter \u2014 Arvo beg\xe4r in och sammanst\xe4ller offerter fr\xe5n rikst\xe4ckande avfallspartners.":null!==(Le=lr.recommendation)&&void 0!==Le&&Le.m365Equivalent?"Vi j\xe4mf\xf6r referensen ovan mot ert faktiska Google-pris och tar fram en exakt besparing i offerten.":lr.recommendation.reasoning}),(0,$c.jsx)(ff,{onSubmit:e=>{e.preventDefault(),Kr&&Wr&&"idle"===Gr&&(Yr("sent"),setTimeout(()=>{if(!Gt.current)return;const e=Gt.current.getBoundingClientRect().top+window.pageYOffset-16;window.scrollTo({top:e,behavior:"smooth"})},50),fetch("/api/quote-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contactEmail:Kr.trim().toLowerCase(),contactName:Br.trim()||void 0,contactCompany:Vr.trim()||void 0,mandateAccepted:!0,extractedData:null===lr||void 0===lr?void 0:lr.extracted,categorized:null===lr||void 0===lr?void 0:lr.categorized})}).catch(e=>console.error("[quote-request]",e)))},children:"sent"===Gr?(0,$c.jsxs)("div",{className:"qlf-sent",children:[(0,$c.jsx)(yp,{name:"check",size:16,stroke:2.5}),"Tack! Bekr\xe4ftelse \xe4r skickad till din e-post. Vi \xe5terkommer med offerter inom 1\u20132 arbetsdagar."]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{className:"qlf-fields",children:[(0,$c.jsx)("input",{type:"text",placeholder:"Ditt namn",value:Br,onChange:e=>Mr(e.target.value)}),(0,$c.jsx)("input",{type:"text",placeholder:"F\xf6retag",value:Vr,onChange:e=>Ur(e.target.value)}),(0,$c.jsx)("input",{className:"qlf-full",type:"email",placeholder:"Din e-post (dit skickar vi offertsammanst\xe4llningen)",required:!0,value:Kr,onChange:e=>Hr(e.target.value)})]}),(0,$c.jsxs)("label",{className:"qlf-mandate",children:[(0,$c.jsx)("input",{type:"checkbox",checked:Wr,onChange:e=>qr(e.target.checked)}),(0,$c.jsxs)("span",{children:["Jag ger ",(0,$c.jsx)("em",{children:"Arvo Flow"})," fullmakt att beg\xe4ra in, sammanst\xe4lla och presentera offerter fr\xe5n leverant\xf6rer \xe5 mitt bolags v\xe4gnar."]})]}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"sm",disabled:"submitting"===Gr||!Wr,style:{width:"100%",justifyContent:"center"},children:"submitting"===Gr?"Startar...":"Starta offertprocessen \u2192"}),(0,$c.jsx)("p",{className:"qlf-zero-risk",children:"Ni betalar ingenting om vi inte hittar besparingar \u2014 20\xa0% av realiserad besparing."})]})})]})]}):Hn?(0,$c.jsx)($c.Fragment,{children:(0,$c.jsxs)(sf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Dold kostnad hittad"}),(0,$c.jsxs)("span",{className:"amount",children:["+",bu(Gn)]}),(0,$c.jsxs)("span",{className:"unit",children:["Ni betalar ",Lf(Wn)," kr/\xe5r f\xf6r en tj\xe4nst som redan ing\xe5r i er licens"," ","\xb7 Arvos besparingsarvode ",bu(qn)," (20 %)"]})]})}):null!==(Re=lr.recommendation)&&void 0!==Re&&Re.shouldSwitch&&(null===(Ie=lr.recommendation)||void 0===Ie?void 0:Ie.netSaving)>0?(0,$c.jsx)($c.Fragment,{children:((e,t,r,n,a,i)=>{const o=xa.isRealPrice,s=lr.categorized.licensePending,l=(xa.partnerLabel,(null!==(e=lr.recommendation.suggestedSupplier)&&void 0!==e?e:"").toLowerCase().trim()),d=(null!==(t=null!==(r=null===(n=lr.categorized)||void 0===n?void 0:n.normalizedSupplier)&&void 0!==r?r:null===(a=lr.extracted)||void 0===a?void 0:a.supplier)&&void 0!==t?t:"").toLowerCase().trim();o&&l&&d&&(l===d||l.includes(d)||d.includes(l))&&lr.recommendation.suggestedSupplier;return(0,$c.jsxs)($c.Fragment,{children:[ba&&(0,$c.jsxs)(_f,{style:{"--diag-color":ca.dot},children:[(0,$c.jsxs)("div",{className:"gauge-wrap",children:[(0,$c.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$c.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E9F1ED",strokeWidth:"4.5"}),(0,$c.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:ca.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:wa?`${ja/100*ka} ${ka}`:`0 ${ka}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)"}})]}),(0,$c.jsxs)("div",{className:"gauge-num",style:{color:ca.dot},children:[(0,$c.jsx)("span",{className:"gauge-val",children:la?ja:"\u2014"}),la&&(0,$c.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$c.jsxs)("div",{className:"diag-body",children:[(0,$c.jsxs)("div",{className:"diag-top",children:[(0,$c.jsx)("span",{className:"diag-score-label",children:"Arvo Score\u2122"}),(0,$c.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$c.jsxs)("span",{className:"diag-status",children:[(0,$c.jsx)(yp,{name:"alert-circle",size:13,color:ca.dot,stroke:2}),(0,$c.jsx)("span",{className:"diag-label",style:{color:ca.labelClr},children:ca.label})]})]}),(0,$c.jsx)("p",{className:"diag-text",children:ba})]})]}),(0,$c.jsxs)(sf,{children:[(0,$c.jsx)("span",{className:"kicker",children:s?"M\xf6jlig \xe5rlig besparing":"Din identifierade nettobesparing"}),(0,$c.jsxs)("span",{className:"amount",children:["+",bu(aa)]}),(0,$c.jsx)("span",{className:"unit",children:s?"F\xf6rs\xe4kring kr\xe4ver FI-licens \u2014 vi byter inte sj\xe4lva \xe4nnu, men visar gapet.":o&&lr.recommendation.suggestedSupplier?(0,$c.jsxs)($c.Fragment,{children:[Lf(ea)," \u2192 ",Lf(lr.recommendation.suggestedAnnualCost)," kr/\xe5r hos ",(0,$c.jsx)("strong",{children:lr.recommendation.suggestedSupplier})," ","\xb7 Arvos besparingsarvode ",bu(ra)," (20 %)",Zn&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("br",{}),(0,$c.jsxs)("small",{style:{opacity:.85},children:["Avser abonnemang och licenser. Om ",lr.recommendation.suggestedSupplier," absorberar er h\xe5rdvaruskuld (",Lf(Xn)," kr) uppg\xe5r nettobesparing till ",bu(lr.recommendation.netSaving)," kr/\xe5r."]})]})]}):(0,$c.jsxs)($c.Fragment,{children:[Lf(ea)," \u2192 ",Lf(lr.recommendation.suggestedAnnualCost)," kr/\xe5r (Arvos kalkylerade riktpris)"," ","\xb7 Arvos besparingsarvode ",bu(ra)," (20 %)"]})})]}),!s&&(0,$c.jsx)(uf,{$compact:!0,children:"list-verified"===xa.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Vid genomf\xf6rt byte bekr\xe4ftas slutpriset i offert innan ni godk\xe4nner.":null!==(i=xa.benchmarkNote)&&void 0!==i?i:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n en verifierad l\xe4gre leverant\xf6r."})]})})()}):"uncategorized"===(null===(Be=lr.categorized)||void 0===Be?void 0:Be.category)?(0,$c.jsxs)(mf,{children:[(0,$c.jsx)("strong",{children:"Kategorin \xe4r under analys."}),(0,$c.jsx)("p",{children:"Koppla Fortnox / Visma s\xe5 mappar vi era volymer mot marknadens b\xe4sta priser direkt."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(mf,{style:{marginTop:0},children:[(0,$c.jsx)("strong",{children:"Marknadsm\xe4ssigt pris."})," ",null!==(Me=null===(Ve=lr.recommendation)||void 0===Ve?void 0:Ve.monitoringNote)&&void 0!==Me?Me:"Vi hittar inget prisgap mot marknadens b\xe4sta verifierade niv\xe5 \u2014 Arvo rekommenderar inget byte i dag."]}),!(null!==(Ue=lr.recommendation)&&void 0!==Ue&&Ue.shouldSwitch)&&(null===(Ke=lr.recommendation)||void 0===Ke?void 0:Ke.reasoning)&&(0,$c.jsxs)(jf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$c.jsx)("p",{children:zm(lr.categorized.category).isRealPrice?lr.recommendation.reasoning:Bf(lr.recommendation.reasoning,lr.recommendation.suggestedSupplier)})]})]}),(null===(He=lr.recommendation)||void 0===He?void 0:He.reasoning)&&(null===(We=lr.recommendation)||void 0===We?void 0:We.shouldSwitch)&&!Hn&&!ga&&(0,$c.jsxs)(jf,{children:[(0,$c.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$c.jsx)("p",{children:zm(lr.categorized.category).isRealPrice?lr.recommendation.reasoning:Bf(lr.recommendation.reasoning,lr.recommendation.suggestedSupplier)})]}),(null===(qe=lr.recommendation)||void 0===qe?void 0:qe.shouldSwitch)&&!Hn&&((e,t)=>{const r=null===(e=lr.extracted)||void 0===e?void 0:e.seatCount,n=Number(er),a=null!=r&&r>n?r-n:0,i=zm(null===(t=lr.categorized)||void 0===t?void 0:t.category);return a>0?(0,$c.jsx)(Yf,{seatCount:r,employees:n,overage:a,term:i.unit,termSing:i.unitSingular}):null})(),(0,$c.jsx)(Zm,{onClick:()=>pn(e=>!e),children:un?"\u2191 D\xf6lj underlag":"\u2193 Hur vi r\xe4knar"}),un&&(0,$c.jsxs)($c.Fragment,{children:["auto"===lr.route&&!(null!==(Ge=lr.categorized)&&void 0!==Ge&&Ge.licensePending)&&!(null!==(Ye=lr.recommendation)&&void 0!==Ye&&Ye.shouldSwitch&&(null===(Je=lr.recommendation)||void 0===Je?void 0:Je.netSaving)>0&&!Hn)&&(0,$c.jsx)(uf,{children:"list-verified"===xa.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Vid genomf\xf6rt byte bekr\xe4ftas slutpriset i offert innan ni godk\xe4nner.":null!==(Qe=xa.benchmarkNote)&&void 0!==Qe?Qe:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n en verifierad l\xe4gre leverant\xf6r."}),"auto"===lr.route&&!(null!==(Xe=lr.categorized)&&void 0!==Xe&&Xe.licensePending)&&!xa.isRealPrice&&lr.savingRange&&(0,$c.jsxs)(Ef,{children:[(0,$c.jsx)("span",{className:"range-label",children:"Intervall:"}),Lf(lr.savingRange.low)," \u2013 ",Lf(lr.savingRange.high)," kr/\xe5r netto"]}),"auto"===lr.route&&!(null!==(Ze=lr.categorized)&&void 0!==Ze&&Ze.licensePending)&&lr.calculationChain&&(0,$c.jsx)(Gf,{cc:lr.calculationChain}),"auto"===lr.route&&(0,$c.jsx)(qf,{items:lr.verifications}),(null===(et=lr.extracted)||void 0===et?void 0:et.potentialMixedCategories)&&(0,$c.jsx)("p",{style:{fontSize:12,color:"#9CA3AF",marginBottom:14,lineHeight:1.5,fontStyle:"italic"},children:ma?(0,$c.jsxs)($c.Fragment,{children:["Kombinerad faktura \u2014"," ",zm(null===(tt=lr.categorized)||void 0===tt?void 0:tt.category).label,null!=(null===(rt=lr.extracted)||void 0===rt?void 0:rt.primaryComponentMonthly)?` (${bu(12*lr.extracted.primaryComponentMonthly)}/\xe5r)`:""," ","+ ",ha," (",bu(ma.currentAnnual),"/\xe5r)."," ","Besparing:"," ",zm(null===(nt=lr.categorized)||void 0===nt?void 0:nt.category).label," ","\u2212",bu(fa),"/\xe5r"," ","|"," ",ha," \u2212",bu(ma.grossSaving),"/\xe5r."]}):(0,$c.jsxs)($c.Fragment,{children:["Kombinerad faktura \u2014 analysen avser"," ",zm(null===(at=lr.categorized)||void 0===at?void 0:at.category).label,null!=(null===(it=lr.extracted)||void 0===it?void 0:it.primaryComponentMonthly)?` (${bu(12*lr.extracted.primaryComponentMonthly)}/\xe5r)`:"",(null!==(ot=null===(st=lr.recommendation)||void 0===st?void 0:st.nonPrimaryAnnual)&&void 0!==ot?ot:0)>0?`. \xd6vriga tj\xe4nster (${bu(lr.recommendation.nonPrimaryAnnual)}/\xe5r) analyseras via Fortnox/Visma.`:"."]})}),null!=(null===(lt=lr.extracted)||void 0===lt?void 0:lt.annualCost)&&"monitoring"!==lr.route&&"unsupported"!==lr.route&&(0,$c.jsxs)(vf,{children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Ni betalar idag"}),(0,$c.jsxs)("dd",{children:[bu(ea)," / \xe5r",Zn?(0,$c.jsxs)("small",{children:["Abonnemang och licenser. Exkl. h\xe5rdvaruavbetalningar (",bu(Qn),"/\xe5r)",lr.extracted.variableCharges>0?` och r\xf6rliga avgifter (${bu(lr.extracted.variableCharges)} denna period)`:"","."]}):lr.extracted.variableCharges>0&&(0,$c.jsxs)("small",{children:["Varav fasta abonnemang. Exkl. r\xf6rliga avgifter (",bu(lr.extracted.variableCharges)," denna period)."]})]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Fakturadatum"}),(0,$c.jsx)("dd",{children:lr.extracted.date})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$c.jsxs)("dd",{children:[bu(lr.extracted.amount),lr.extracted.oneTimeFees>0&&(0,$c.jsxs)("small",{children:["Inkl. ",bu(lr.extracted.oneTimeFees)," ",lr.extracted.elSkatterKr>0?"lagstadgade avgifter":"eng\xe5ngskostnader"," \u2014 ing\xe5r ej i \xe5rsber\xe4kningen ovan."]})]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"\xc5terkommande"}),(0,$c.jsx)("dd",{children:lr.extracted.recurring?"Ja (abonnemang / premie)":"Nej"})]}),"EUR"===lr.extracted.originalCurrency&&(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1"},children:[(0,$c.jsx)("dt",{children:"Valutakonvertering"}),(0,$c.jsx)("dd",{children:(0,$c.jsxs)("small",{children:["Fakturan \xe4r i EUR \u2014 konverterad till SEK med kursen ",null===(dt=lr.extracted.fxRate)||void 0===dt?void 0:dt.toFixed(2)," SEK/EUR",lr.extracted.fxSource&&"fallback"!==lr.extracted.fxSource?` (Riksbanken/ECB ${null!==(ct=lr.extracted.fxDate)&&void 0!==ct?ct:""})`:" (fallback-kurs)",". Alla belopp ovan \xe4r i SEK."]})})]}),Jn.length>0&&(0,$c.jsx)("div",{style:{gridColumn:"1 / -1"},children:(0,$c.jsxs)(gf,{children:[(0,$c.jsx)("strong",{children:"\u26a0 Aktiv h\xe5rdvaruleasing \u2014 kontrollera innan ni byter"}),(0,$c.jsxs)("p",{children:[Jn.map((e,t)=>(0,$c.jsxs)("span",{style:{display:"block",marginBottom:Jn.length>1&&t<Jn.length-1?"6px":0},children:[e.description," \u2014 ",e.monthsRemaining," m\xe5nader kvar (",Lf(e.monthlyCost)," kr/m\xe5n = ",(0,$c.jsxs)("strong",{children:[Lf(e.remainingCost)," kr totalt"]}),")"]},t)),Jn.length>1&&(0,$c.jsxs)("span",{style:{display:"block",marginTop:"6px",fontWeight:700},children:["Totalt kvar att betala: ",Lf(Xn)," kr"]})]}),Zn&&null!=Yn.breakEvenYears&&(0,$c.jsxs)("p",{style:{marginTop:8,paddingTop:8,borderTop:"1px solid rgba(0,0,0,0.08)"},children:[(0,$c.jsx)("strong",{children:"Break-even om skulden l\xf6ses kontant:"})," ",Lf(Xn)," kr \xf7 ",Lf(ta)," kr/\xe5r = ",(0,$c.jsxs)("strong",{children:[String(Yn.breakEvenYears).replace(".",",")," \xe5r"]})," ","\u2014"," ","fr\xe5ga ",null!==(ut=null===(pt=lr.recommendation)||void 0===pt?void 0:pt.suggestedSupplier)&&void 0!==ut?ut:"den nya leverant\xf6ren"," om de kan absorbera skulden vid avtalssignering. Om ja \xe4r besparingen ",bu(lr.recommendation.netSaving)," kr/\xe5r netto fr\xe5n dag ett."]})]})}),lr.extracted.elUncertaintyNote&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"\xc5rsuppskattning"}),(0,$c.jsx)("dd",{children:(0,$c.jsx)("small",{children:lr.extracted.elUncertaintyNote})})]}),lr.extracted.elSkatterKr>0&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Skatter & lagstadgade avgifter"}),(0,$c.jsxs)("dd",{children:[bu(lr.extracted.elSkatterKr),(0,$c.jsx)("small",{children:"Energiskatt, elcertifikat m.m. \u2014 ej f\xf6rhandlingsbara, ing\xe5r ej i besparingskalkylen."})]})]}),lr.extracted.elNatavgiftAnnual>0&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"N\xe4tavgift (ej valbar)"}),(0,$c.jsxs)("dd",{children:[bu(lr.extracted.elNatavgiftAnnual)," / \xe5r",(0,$c.jsx)("small",{children:"Eln\xe4tsavgiften best\xe4ms av din regionala n\xe4toperat\xf6r och kan inte bytas via elleverant\xf6rsbyte \u2014 ing\xe5r ej i besparingskalkylen."})]})]}),lr.extracted.variableCharges>0&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"R\xf6rliga avgifter denna period"}),(0,$c.jsxs)("dd",{children:[bu(lr.extracted.variableCharges),(0,$c.jsx)("small",{children:null!==(mt=zm(null===(ft=lr.categorized)||void 0===ft?void 0:ft.category).variableChargeNote)&&void 0!==mt?mt:"R\xf6rliga avgifter denna period \u2014 ej inkluderat i \xe5rsber\xe4kningen."}),"mobil"===(null===(ht=lr.categorized)||void 0===ht?void 0:ht.category)&&((e,t)=>{const r=lr.extracted.roamingZone,n=null!==(e=lr.extracted.recurringAmount)&&void 0!==e?e:0,a=null!==(t=lr.extracted.variableCharges)&&void 0!==t?t:0;return a<Math.max(.3*n,1e3)?null:r>=4?(0,$c.jsxs)(xf,{$type:"satellite",children:[(0,$c.jsx)(yp,{name:"globe",size:14}),(0,$c.jsx)("span",{children:"Satellit- och maritim datatrafik (Zon 4) \xe4r teknikberoende \u2014 kan inte optimeras via operat\xf6rsbyte och ing\xe5r inte i Arvos besparing."})]}):(0,$c.jsxs)(xf,{children:[(0,$c.jsx)(yp,{name:"info",size:14}),(0,$c.jsxs)("span",{children:["Roamingkostnader p\xe5 ",bu(a)," denna period. Om detta \xe4r \xe5terkommande kan ett mobilavtal med b\xe4ttre EU-datapaket minska kostnaden \u2014 Arvo tittar p\xe5 detta vid ett leverant\xf6rsbyte."]})]})})()]})]}),"saas-productivity"===(null===(gt=lr.categorized)||void 0===gt?void 0:gt.category)&&(null===(xt=lr.extracted)||void 0===xt?void 0:xt.licenseType)&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"Licensplan"}),(0,$c.jsxs)("dd",{children:[lr.extracted.licenseType,"monthly"===lr.extracted.billingCycleType&&(0,$c.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#A8761A",fontWeight:600},children:"M\xe5nadsvis"}),"annual"===lr.extracted.billingCycleType&&(0,$c.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#1B7A6E",fontWeight:600},children:"\xc5rsavtal"})]})]}),"saas-productivity"===(null===(vt=lr.categorized)||void 0===vt?void 0:vt.category)&&(null===(bt=lr.recommendation)||void 0===bt?void 0:bt.annualBillingSaving)>0&&(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:"M\xf6jlighet \u2014 \xe5rsavtal"}),(0,$c.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",bu(lr.recommendation.annualBillingSaving),"/\xe5r utan leverant\xf6rsbyte"]})]}),"saas-productivity"===(null===(kt=lr.categorized)||void 0===kt?void 0:kt.category)&&(e=>{const t=null===(e=lr.recommendation)||void 0===e?void 0:e.savingsBreakdown;if(!t)return null;const r=[{label:"Marknadsgap",value:t.cspDiscount},{label:"Tier-optimering (advisory)",value:t.tierOptimization},{label:"Licensrensning",value:t.licenseCleanup}].filter(e=>e.value>0);return r.length<2?null:(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("div",{style:{gridColumn:"1 / -1",borderTop:"1px solid #D5E2DC",marginTop:"4px",paddingTop:"10px"},children:(0,$c.jsx)("dt",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#5C6E68",marginBottom:"6px"},children:"Besparing per kanal"})}),r.map(e=>(0,$c.jsxs)("div",{children:[(0,$c.jsx)("dt",{children:e.label}),(0,$c.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",bu(e.value),"/\xe5r"]})]},e.label))]})})()]}),(null===(yt=lr.recommendation)||void 0===yt?void 0:yt.shelfware)&&(()=>{const e=lr.recommendation.shelfware,t=null!==yn?yn:e,r=null!==yn,n={gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},a={fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"};return r&&t&&!t.cleared&&t.annualWaste>0?(0,$c.jsxs)("div",{style:n,children:[(0,$c.jsx)("div",{style:a,children:"Licensrevision \u2014 bekr\xe4ftat"}),(0,$c.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:[(0,$c.jsxs)("strong",{children:[t.confirmedIdle," bekr\xe4ftat oanv\xe4nda platser"]})," \xe0 ",t.perSeatMonthly," kr/plats/m\xe5n"," ","= ",(0,$c.jsxs)("strong",{style:{color:"#1B7A6E"},children:[bu(t.annualWaste)," kr/\xe5r"]})," i verifierat svinn att avveckla."]})]}):r?(0,$c.jsxs)("div",{style:n,children:[(0,$c.jsx)("div",{style:a,children:"Licensrevision \u2014 klar"}),(0,$c.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:"Tack \u2014 d\xe5 \xe4r \xf6verskottet f\xf6rklarat. Vi flaggar inget svinn p\xe5 era licenser."})]}):e.needsReview?(0,$c.jsxs)("div",{style:n,children:[(0,$c.jsx)("div",{style:a,children:"Licensrevision \u2014 vi beh\xf6ver er bekr\xe4ftelse"}),(0,$c.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:e.reviewPrompt}),(0,$c.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Om de st\xe5r oanv\xe4nda motsvarar det upp till ",bu(e.potentialAnnualWaste)," kr/\xe5r. Vi r\xe4knar ingen besparing f\xf6rr\xe4n ni bekr\xe4ftat \u2014 siffror utan k\xe4lla visar vi aldrig."]}),(0,$c.jsxs)("form",{onSubmit:Un,style:{display:"flex",gap:"8px",alignItems:"center",marginTop:"12px",flexWrap:"wrap"},children:[(0,$c.jsxs)("label",{htmlFor:"shelfware-exc",style:{fontSize:"13px",color:"#0E1A17"},children:["Hur m\xe5nga av de ",e.unverifiedGap," anv\xe4nds till annat?"]}),(0,$c.jsx)("input",{id:"shelfware-exc",type:"number",min:"0",max:e.unverifiedGap,inputMode:"numeric",value:wn,onChange:e=>Sn(e.target.value),placeholder:"0",style:{width:"72px",padding:"7px 9px",fontSize:"14px",border:"1px solid #BFD8D0",borderRadius:"8px",background:"#fff"}}),(0,$c.jsx)("button",{type:"submit",disabled:"submitting"===$n,style:{padding:"8px 16px",fontSize:"13px",fontWeight:600,color:"#fff",background:"#1B7A6E",border:"none",borderRadius:"8px",cursor:"pointer",opacity:"submitting"===$n?.6:1},children:"submitting"===$n?"R\xe4knar\u2026":"Bekr\xe4fta"})]}),"error"===$n&&(0,$c.jsx)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#B4341F"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}):null})(),(null===(jt=lr.recommendation)||void 0===jt?void 0:jt.fortnoxRightsizing)&&(()=>{const e=lr.recommendation.fortnoxRightsizing;return(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$c.jsxs)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:["R\xe4tt-storlek \u2014 ",e.vendor]}),(0,$c.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$c.jsxs)("strong",{children:[e.vendor," ",e.currentPaket]})," (",e.currentMonthly," kr/m\xe5n). Niv\xe5n under,"," ",(0,$c.jsx)("strong",{children:e.targetPaket})," (",e.targetMonthly," kr/m\xe5n), \xe4r ",e.deltaMonthly," kr/m\xe5n billigare."]}),(0,$c.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Ryms er anv\xe4ndning (moduler, antal anv\xe4ndare, verifikationsvolym) i ",e.targetPaket,"? D\xe5 realiserar vi upp till"," ",(0,$c.jsxs)("strong",{style:{color:"#1B7A6E"},children:[bu(e.annualSaving)," kr/\xe5r"]}),". Verifierad prisskillnad mot Fortnox publika listpris \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(wt=lr.recommendation)||void 0===wt?void 0:wt.m365Rightsizing)&&(()=>{const e=lr.recommendation.m365Rightsizing;return(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$c.jsx)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:"R\xe4tt-storlek \u2014 Microsoft 365 (r\xe5dgivning)"}),(0,$c.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$c.jsx)("strong",{children:e.currentLabel})," (",e.currentPerSeatLabel," kr/anv/m\xe5n) \u2014 full enterprise-svit."," ",(0,$c.jsx)("strong",{children:e.targetLabel})," (",e.targetPerSeatLabel," kr/anv/m\xe5n) ger Intune MDM + Defender, s\xe4kerheten de flesta SMF beh\xf6ver."]}),(0,$c.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Kr\xe4ver ni inte ",e.currentTier.toUpperCase(),":s enterprise-funktioner (compliance, eDiscovery)? D\xe5 realiserar vi upp till"," ",(0,$c.jsxs)("strong",{style:{color:"#1B7A6E"},children:[e.annualSavingLabel," kr/\xe5r"]})," f\xf6r era ",e.seats," anv\xe4ndare. Verifierad prisskillnad mot Microsofts publika listpris \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(St=lr.recommendation)||void 0===St?void 0:St.molnvaxel)&&(()=>{const e=lr.recommendation.molnvaxel,t=(e.addons||[]).filter(e=>null!=e.monthlyExVat),r=!e.bundled&&null!=e.teliaFloorLabel&&null!=e.teliaFloor,n=null!=e.overFloorPct&&e.overFloorPct>=30,a=Math.max(e.perUserMonthlyExVat||0,e.teliaFloor||0)||1,i=Math.max(6,Math.round((e.perUserMonthlyExVat||0)/a*100)),o=Math.max(6,Math.round((e.teliaFloor||0)/a*100));return(0,$c.jsxs)(cf,{$over:n,children:[(0,$c.jsxs)("div",{className:"adv-top",children:[(0,$c.jsxs)("span",{className:"adv-eyebrow",children:["F\xf6retagsv\xe4xel \xb7 ",e.tierLabel,"-niv\xe5"]}),(0,$c.jsx)("span",{className:"adv-badge",children:"Verifierad referens"})]}),(0,$c.jsxs)("div",{className:"adv-figure",children:[e.perUserLabel," kr",(0,$c.jsxs)("span",{className:"unit",children:["per anv\xe4ndare/m\xe5n \xb7 exkl moms \xb7 ",e.seats," anv\xe4ndare"]})]}),r&&(0,$c.jsxs)("div",{className:"adv-compare",children:[(0,$c.jsxs)("div",{className:"adv-bar you",children:[(0,$c.jsx)("span",{className:"lbl",children:"Ni betalar"}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${i}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[e.perUserLabel," kr"]})]}),(0,$c.jsxs)("div",{className:"adv-bar floor",children:[(0,$c.jsx)("span",{className:"lbl",children:"Telia-golv"}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${o}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[e.teliaFloorLabel," kr"]})]})]}),e.bundled?(0,$c.jsx)("span",{className:"adv-pill neutral",children:"Buntat pris \u2014 j\xe4mf\xf6rs i genomg\xe5ng, inte mot golv"}):r?n?(0,$c.jsxs)("span",{className:"adv-pill warn",children:["~",e.overFloorPct," % \xf6ver Telias instegsgolv"]}):(0,$c.jsx)("span",{className:"adv-pill ok",children:"I niv\xe5 med marknadens instegsv\xe4xel"}):(0,$c.jsx)("span",{className:"adv-pill neutral",children:"Kontaktcenter \u2014 pris s\xe4tts via offert"}),(0,$c.jsx)("p",{className:"adv-prose",children:e.bundled?(0,$c.jsxs)($c.Fragment,{children:["Priset buntar v\xe4xel ",(0,$c.jsx)("strong",{children:"och"})," mobilabonnemang (inkl. surf) \u2014 inte direkt j\xe4mf\xf6rbart med en ren v\xe4xellicens. Vi j\xe4mf\xf6r mot ert faktiska pris i en genomg\xe5ng ist\xe4llet f\xf6r en missvisande siffra."]}):r?(0,$c.jsxs)($c.Fragment,{children:["Telia Smart Connect \u2014 marknadens instegsv\xe4xel f\xf6r motsvarande niv\xe5 \u2014 kostar ",(0,$c.jsxs)("strong",{children:["fr\xe5n ",e.teliaFloorLabel," kr/anv/m\xe5n"]})," (exkl moms)",n?(0,$c.jsx)($c.Fragment,{children:". Glappet \xe4r v\xe4rt en offertj\xe4mf\xf6relse."}):(0,$c.jsx)($c.Fragment,{children:". Ni ligger redan r\xe4tt \u2014 vi bevakar att det f\xf6rblir s\xe5."})]}):(0,$c.jsx)($c.Fragment,{children:"P\xe5 kontaktcenter-niv\xe5 s\xe4tter leverant\xf6rerna pris via offert \u2014 vi j\xe4mf\xf6r mot er faktiska kostnad i en genomg\xe5ng."})}),t.length>0&&(0,$c.jsxs)("p",{className:"adv-addons",children:["Ni betalar f\xf6r ",t.map(e=>`${e.label} (${e.monthlyExVat} kr/m\xe5n)`).join(", ")," \u2014 bekr\xe4fta att de anv\xe4nds, annars \xe4r det ren besparing."]}),(0,$c.jsx)("div",{className:"adv-foot",children:"Telias instegspris exkl moms verifierat mot telia.se. \u201dFr\xe5n\u201d-pris = golv; exakt j\xe4mf\xf6relse mot er bransch g\xf6rs n\xe4r underlaget r\xe4cker."})]})})(),(null===($t=lr.recommendation)||void 0===$t?void 0:$t.adobeRightsizing)&&(()=>{const e=lr.recommendation.adobeRightsizing;return(0,$c.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$c.jsx)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:"R\xe4tt-storlek \u2014 Adobe Creative Cloud (r\xe5dgivning)"}),(0,$c.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$c.jsx)("strong",{children:e.currentLabel})," (",e.currentMonthlyLabel," ",e.unit," exkl moms) \u2014 hela sviten."," ","Anv\xe4nder era anv\xe4ndare i praktiken bara ",(0,$c.jsx)("strong",{children:"ett program"}),"? D\xe5 r\xe4cker ",(0,$c.jsx)("strong",{children:e.targetLabel})," (",e.targetMonthlyLabel," ",e.unit," exkl moms)."]}),(0,$c.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:[e.annualSavingLabel?(0,$c.jsxs)($c.Fragment,{children:["Bekr\xe4fta s\xe5 realiserar vi upp till ",(0,$c.jsxs)("strong",{style:{color:"#1B7A6E"},children:[e.annualSavingLabel," kr/\xe5r"]})," f\xf6r era ",e.seats," licenser. "]}):(0,$c.jsx)($c.Fragment,{children:"Bekr\xe4fta antal licenser s\xe5 r\xe4knar vi hem beloppet. "}),"Verifierad prisskillnad mot Adobes publika listpris (adobe.com/se) \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(Nt=lr.recommendation)||void 0===Nt?void 0:Nt.loneadminRightsizing)&&(()=>{const e=lr.recommendation.loneadminRightsizing,t=e.aboveFloor&&null!=e.overFloorPct&&e.overFloorPct>=15,r=Math.max(e.perEmployeeMonthly||0,e.floorPerEmployee||0)||1,n=Math.max(6,Math.round((e.perEmployeeMonthly||0)/r*100)),a=Math.max(6,Math.round((e.floorPerEmployee||0)/r*100));return(0,$c.jsxs)(cf,{$over:t,children:[(0,$c.jsxs)("div",{className:"adv-top",children:[(0,$c.jsx)("span",{className:"adv-eyebrow",children:"L\xf6neadministration \xb7 per anst\xe4lld"}),(0,$c.jsx)("span",{className:"adv-badge",children:"Verifierad referens"})]}),(0,$c.jsxs)("div",{className:"adv-figure",children:[e.perEmployeeLabel," kr",(0,$c.jsxs)("span",{className:"unit",children:["per anst\xe4lld/m\xe5n \xb7 exkl moms \xb7 ",e.headcount," anst\xe4llda"]})]}),(0,$c.jsxs)("div",{className:"adv-compare",children:[(0,$c.jsxs)("div",{className:"adv-bar you",children:[(0,$c.jsx)("span",{className:"lbl",children:"Ni betalar"}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${n}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[e.perEmployeeLabel," kr"]})]}),(0,$c.jsxs)("div",{className:"adv-bar floor",children:[(0,$c.jsx)("span",{className:"lbl",children:"Fortnox-golv"}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${a}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[e.floorPerEmployeeLabel," kr"]})]})]}),e.alreadyFortnox?(0,$c.jsx)("span",{className:"adv-pill neutral",children:"Redan p\xe5 Fortnox L\xf6ns verifierade niv\xe5"}):t?(0,$c.jsxs)("span",{className:"adv-pill warn",children:["~",e.overFloorPct," % \xf6ver Fortnox-golvet"]}):(0,$c.jsx)("span",{className:"adv-pill ok",children:"I niv\xe5 med Fortnox-golvet"}),(0,$c.jsx)("p",{className:"adv-prose",children:e.alreadyFortnox?(0,$c.jsx)($c.Fragment,{children:"Ni ligger redan p\xe5 Fortnox L\xf6ns verifierade niv\xe5 \u2014 vi bevakar att det f\xf6rblir s\xe5."}):e.aboveFloor?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("strong",{children:e.fortnoxProduct})," \u2014 verifierat l\xe4gst \u2014 kostar 199 kr/m\xe5n + 25 kr/anst\xe4lld. Ryms er l\xf6nehantering (kollektivavtal, integrationer) d\xe4r? Bekr\xe4fta s\xe5 realiserar vi upp till ",(0,$c.jsxs)("strong",{children:[bu(e.annualSaving)," kr/\xe5r"]}),"."]}):(0,$c.jsx)($c.Fragment,{children:"Ni ligger i niv\xe5 med Fortnox L\xf6ns verifierade golv \u2014 ni ligger r\xe4tt, vi bevakar."})}),e.hasPayslip&&(0,$c.jsx)("p",{className:"adv-addons",children:"L\xf6nebesked-/utskicksavgifter (Kivra) \xe4r r\xf6rliga och ing\xe5r inte i golvj\xe4mf\xf6relsen."}),(0,$c.jsx)("div",{className:"adv-foot",children:"Fortnox L\xf6ns listpris exkl moms verifierat mot fortnox.se. Golvet \xe4r ett fast pris; exakt utfall beror p\xe5 om behovet ryms i Fortnox L\xf6n."})]})})(),(null===(Et=lr.recommendation)||void 0===Et?void 0:Et.reasoning)&&(Hn||ga)&&(0,$c.jsxs)(jf,{children:[(0,$c.jsx)("span",{className:"kicker",children:Hn?"Vad vi hittade":"Kombinerad analys"}),(0,$c.jsx)("p",{children:zm(lr.categorized.category).isRealPrice?lr.recommendation.reasoning:Bf(lr.recommendation.reasoning,lr.recommendation.suggestedSupplier)})]}),"saas-productivity"===(null===(_t=lr.categorized)||void 0===_t?void 0:_t.category)&&(null!==(zt=null===(Ct=lr.recommendation)||void 0===Ct?void 0:Ct.tierOptimizationSaving)&&void 0!==zt?zt:0)>0&&(0,$c.jsxs)(Sf,{children:[(0,$c.jsxs)("button",{className:"acc-trigger",onClick:()=>Fr(e=>!e),"aria-expanded":Dr,children:[(0,$c.jsx)("span",{className:"acc-icon",children:"\u26a1"}),(0,$c.jsxs)("span",{className:"acc-label-group",children:[(0,$c.jsx)("span",{className:"acc-label",children:"Licensoptimering"}),!Dr&&(0,$c.jsx)("span",{className:"acc-hint",children:"Klicka f\xf6r att se detaljer \u2192"})]}),(0,$c.jsxs)("span",{className:"acc-amount",children:["ytterligare +",Lf(null!==(At=lr.recommendation.tierOptimizationNetSaving)&&void 0!==At?At:0),"\xa0kr/\xe5r netto"]}),(0,$c.jsx)("span",{className:"acc-chevron"+(Dr?" open":""),children:(0,$c.jsx)(yp,{name:"chevron-right",size:16,stroke:2.5})})]}),Dr&&(0,$c.jsxs)("div",{className:"acc-body",children:[(0,$c.jsxs)("p",{className:"acc-intro",children:["Ni kan spara ytterligare"," ",(0,$c.jsxs)("strong",{children:[Lf(null!==(Dt=lr.recommendation.tierOptimizationNetSaving)&&void 0!==Dt?Dt:0),"\xa0kr/\xe5r netto"]})," ","(efter Arvos arvode om ",Lf(null!==(Ft=lr.recommendation.tierOptimizationFee)&&void 0!==Ft?Ft:0),"\xa0kr) genom att byta"," ","fr\xe5n\xa0",(0,$c.jsx)("strong",{children:null!==(Ot=Pf[lr.recommendation.tierOptimizationFromTier])&&void 0!==Ot?Ot:lr.recommendation.tierOptimizationFromTier})," ","till\xa0",(0,$c.jsx)("strong",{children:null!==(Tt=Pf[lr.recommendation.tierOptimizationToTier])&&void 0!==Tt?Tt:lr.recommendation.tierOptimizationToTier}),"."]}),(0,$c.jsxs)("div",{className:"acc-row",children:[(0,$c.jsx)("span",{className:"acc-row-icon",style:{color:"#1B7A6E"},children:(0,$c.jsx)(yp,{name:"check-circle",size:15,stroke:2.5})}),(0,$c.jsxs)("div",{className:"acc-row-content",children:[(0,$c.jsx)("div",{className:"acc-row-head keeps",children:"Vad ni beh\xe5ller"}),(0,$c.jsx)("p",{className:"acc-row-text",children:"Teams, Exchange, desktop Office, SharePoint, 1\xa0TB\xa0OneDrive/anv\xe4ndare"})]})]}),(0,$c.jsxs)("div",{className:"acc-row",children:[(0,$c.jsx)("span",{className:"acc-row-icon",style:{color:"#A8761A"},children:(0,$c.jsx)(yp,{name:"alert-triangle",size:15,stroke:2.5})}),(0,$c.jsxs)("div",{className:"acc-row-content",children:[(0,$c.jsx)("div",{className:"acc-row-head loses",children:"Vad ni tappar"}),(0,$c.jsx)("p",{className:"acc-row-text",children:"Intune MDM (centraliserad enhetshantering) och Defender for Business (endpoint-s\xe4kerhet)"})]})]}),(0,$c.jsxs)("p",{className:"acc-disclaimer",children:["Passar bolag utan aktiv MDM-policy eller externt hanterat s\xe4kerhetsansvar. \xc4r ni os\xe4kra \u2014 beh\xe5ll Premium och spara \xe4nd\xe5 ",Lf(null!==(Pt=lr.recommendation.netSaving)&&void 0!==Pt?Pt:0),"\xa0kr/\xe5r."]}),(0,$c.jsxs)("div",{className:"acc-combined",children:[(0,$c.jsx)("span",{className:"acc-combined-label",children:"Totalt om ni g\xf6r b\xe5da \xe5tg\xe4rderna"}),(0,$c.jsxs)("span",{className:"acc-combined-amount",children:["ca +",Lf((null!==(Lt=lr.recommendation.netSaving)&&void 0!==Lt?Lt:0)+(null!==(Rt=lr.recommendation.tierOptimizationNetSaving)&&void 0!==Rt?Rt:0)),"\xa0kr/\xe5r netto"]})]}),(0,$c.jsx)("div",{className:"acc-cta",children:(0,$c.jsx)(Bc,{as:vs,to:"/connect",$variant:"gradient",$size:"sm",children:"Inkludera i bytet \u2192"})})]})]})]})," "]}),Aa&&(0,$c.jsxs)(pf,{children:[(0,$c.jsx)("div",{className:"switch-eyebrow",children:"Arvo Switch"}),(0,$c.jsx)("h3",{children:"Priset \xe4r verifierat. Arvo f\xf6rbereder bytet."}),(0,$c.jsx)("p",{className:"sub",children:"Priset \xe4r leverant\xf6rens officiella avtalspris \u2014 verifierat och tillg\xe4ngligt utan f\xf6rhandling. Ni beh\xf6ver inte kontakta er nuvarande leverant\xf6r \u2014 Arvo f\xf6rbereder hela bytet."}),(0,$c.jsxs)("div",{className:"switch-steps",children:[(0,$c.jsxs)("div",{className:"switch-step",children:[(0,$c.jsx)("span",{className:"step-num",children:"1"}),(0,$c.jsxs)("span",{className:"step-body",children:[(0,$c.jsx)("span",{className:"step-title",children:"Ni aktiverar bytet"}),(0,$c.jsx)("span",{className:"step-detail",children:"Ett klick \u2014 Arvo tar det d\xe4rifr\xe5n."})]})]}),(0,$c.jsxs)("div",{className:"switch-step",children:[(0,$c.jsx)("span",{className:"step-num",children:"2"}),(0,$c.jsxs)("span",{className:"step-body",children:[(0,$c.jsx)("span",{className:"step-title",children:"Arvo f\xf6rbereder allt"}),(0,$c.jsx)("span",{className:"step-detail",children:"Fullmakt och bytesplan i er inkorg inom 24 timmar \u2014 ni granskar och signerar."})]})]}),(0,$c.jsxs)("div",{className:"switch-step",children:[(0,$c.jsx)("span",{className:"step-num",children:"3"}),(0,$c.jsxs)("span",{className:"step-body",children:[(0,$c.jsx)("span",{className:"step-title",children:"Nytt avtalspris aktivt"}),(0,$c.jsx)("span",{className:"step-detail",children:"Ni betalar 20\xa0% av den identifierade besparingen \u2014 inget annat."})]})]})]}),(0,$c.jsxs)("div",{className:"switch-offer",children:[(0,$c.jsxs)("div",{className:"switch-offer-head",children:[(0,$c.jsx)("span",{className:"switch-badge",children:(0,$c.jsx)(yp,{name:"check",size:13,stroke:2.5})}),(0,$c.jsxs)("div",{className:"switch-supplier",children:[(0,$c.jsx)("p",{className:"switch-supplier-name",children:Sa?lr.recommendation.suggestedSupplier:Na}),(0,$c.jsxs)("span",{className:"switch-price-label",children:[(0,$c.jsx)(yp,{name:"shield",size:10,stroke:2}),Sa?"Verifierat listpris":"Arvo-verifierad leverant\xf6r"]})]})]}),(0,$c.jsxs)("div",{className:"switch-offer-body",children:[(0,$c.jsxs)("div",{className:"sp-from-row",children:[(0,$c.jsxs)("span",{className:"sp-old",children:[bu(ea),"/\xe5r"]}),(0,$c.jsx)("span",{className:"sp-from-arrow",children:"\u2192"})]}),(0,$c.jsxs)("span",{className:"sp-new",children:[Lf(lr.recommendation.suggestedAnnualCost),(0,$c.jsx)("small",{children:"kr/\xe5r"})]}),(0,$c.jsxs)("span",{className:"sp-save-note",children:["Ni sparar ",bu(ta),"/\xe5r \u2014 Arvo tar 20\xa0% av det"]})]})]}),(0,$c.jsxs)(Bc,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{$r(Pr||""),Er("idle"),wr(!0)},children:[Ca," ",(0,$c.jsx)(yp,{name:"arrow",size:16})]})]}),(0,$c.jsxs)(Of,{children:[(0,$c.jsx)("div",{className:"eyebrow",children:"Arvo Intelligence"}),(0,$c.jsx)("h3",{children:"Det h\xe4r var en faktura."}),(0,$c.jsxs)("div",{className:"briefing-preview",children:[(0,$c.jsxs)("div",{className:"preview-header",children:[(0,$c.jsxs)("span",{children:[(0,$c.jsx)("span",{className:"preview-live-dot"}),(0,$c.jsx)("span",{className:"preview-brand-name",children:"Arvo Intelligence"})]}),(0,$c.jsx)("span",{className:"preview-time",children:"Exempel ur en briefing"})]}),(0,$c.jsxs)("div",{className:"signal",children:[(0,$c.jsx)("div",{className:"signal-ico",children:(0,$c.jsx)(yp,{name:"pulse",size:14,stroke:2})}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("span",{className:"signal-tag",children:"Smygh\xf6jningslarm"}),(0,$c.jsxs)("div",{className:"signal-line",children:["Telia \xb7 Mobilflotta 24 abonnemang",(0,$c.jsx)("span",{className:"signal-badge",children:"+11\xa0%"})]}),(0,$c.jsx)("p",{className:"signal-sub",children:"Pris h\xf6jt mot f\xf6reg\xe5ende period \u2014 utan avisering. S\xe5 h\xe4r ser larmet ut n\xe4r det h\xe4nder er."})]})]}),(0,$c.jsxs)("div",{className:"signal",children:[(0,$c.jsx)("div",{className:"signal-ico",children:(0,$c.jsx)(yp,{name:"benchmark",size:14,stroke:2})}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("span",{className:"signal-tag",children:"Community Benchmark"}),(0,$c.jsx)("div",{className:"bench-grid",children:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(e=>(0,$c.jsx)("span",{className:[0,2,3,5,8,9,11,13].includes(e)?"on":""},e))}),(0,$c.jsxs)("p",{className:"signal-sub",children:[(0,$c.jsx)("strong",{children:"8 av 15"})," bolag i samma kohort fick h\xf6jningen \u2014 Arvo ser m\xf6nstret innan det n\xe5r er."]})]})]}),(0,$c.jsxs)("div",{className:"signal",children:[(0,$c.jsx)("div",{className:"signal-ico",children:(0,$c.jsx)(yp,{name:"calendar-clock",size:14,stroke:2})}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("span",{className:"signal-tag",children:"Proaktiv avtalsbevakning"}),(0,$c.jsxs)("div",{className:"signal-line",children:["Avtalsbevakning \xb7 varnar 90 dagar f\xf6re f\xf6rnyelse",(0,$c.jsx)("span",{className:"signal-badge signal-badge--contract",children:"F\xf6rnyelse"})]}),(0,$c.jsx)("p",{className:"signal-sub",children:"Arvo varnar automatiskt \u2014 och f\xf6rbereder bytet p\xe5 er beg\xe4ran."})]})]})]}),(0,$c.jsxs)("div",{className:"price-row",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("span",{className:"price",children:"1 995 kr"}),(0,$c.jsx)("span",{className:"price-period",children:"/ m\xe5n"})]}),(0,$c.jsx)("span",{className:"price-note",children:"Ingen bindningstid"})]}),(0,$c.jsx)(Bc,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{gn(null!==Pr&&void 0!==Pr?Pr:""),vn("idle"),fn(!0)},children:"Aktivera Arvo Intelligence \u2192"}),(0,$c.jsx)("p",{style:{fontSize:12,color:"#8A9E98",textAlign:"center",marginTop:10,lineHeight:1.5},children:"Arvo s\xf6ker igenom er inkorg \u2014 ni beh\xf6ver inte lyfta ett finger."})]}),(0,$c.jsxs)(Tf,{children:[(0,$c.jsx)("div",{className:"pb-eyebrow",children:"Helhetsbilden"}),(0,$c.jsx)("h2",{className:"pb-head",children:"Arvo bevakar \xe5tta kostnadskategorier. Den h\xe4r fakturan var en."}),(0,$c.jsx)("div",{className:"pb-grid",children:Vf.map(e=>{var t;const r=e.cats.includes(null===(t=lr.categorized)||void 0===t?void 0:t.category);return(0,$c.jsxs)("div",{className:"pb-seg"+(r?" lit":""),children:[(0,$c.jsx)("span",{className:"pb-seg-ico",children:(0,$c.jsx)(yp,{name:e.icon,size:20,stroke:1.8})}),(0,$c.jsx)("span",{className:"pb-seg-label",children:e.short})]},e.label)})}),(0,$c.jsxs)("div",{className:"pb-foot",children:[(0,$c.jsx)("p",{className:"pb-note",children:"En faktura s\xe4ger en sak. Hela reskontran s\xe4ger var ni faktiskt bl\xf6der. Vidarebefordra era leverant\xf6rsfakturor s\xe5 kartl\xe4gger Arvo varje leverant\xf6r \u2014 och hittar varenda besparing, inte bara den h\xe4r."}),(0,$c.jsxs)(vs,{to:"/portfolio",className:"pb-link",children:["Kartl\xe4gg er reskontra ",(0,$c.jsx)(yp,{name:"arrow",size:15,stroke:2})]})]})]}),(0,$c.jsx)("p",{style:{textAlign:"center",fontSize:12,color:"#8A9E98",marginBottom:8},children:"sent"===dn?(0,$c.jsx)("span",{style:{color:"#1B7A6E"},children:"\u2713 Noterat \u2014 vi justerar modellen"}):(0,$c.jsxs)($c.Fragment,{children:["Felklassificerad faktura?"," ",(0,$c.jsx)("button",{onClick:()=>(async e=>{if("idle"===dn){ln(e),cn("submitting");try{var t,r;await fetch("/api/feedback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fingerprint:await If().catch(()=>""),supplier:null===lr||void 0===lr||null===(t=lr.extracted)||void 0===t?void 0:t.supplier,category:null===lr||void 0===lr||null===(r=lr.categorized)||void 0===r?void 0:r.category,vote:e})})}catch{}cn("sent")}})("down"),disabled:"idle"!==dn,style:{background:"none",border:"none",padding:0,cursor:"pointer",fontSize:12,color:"#5C6E68",textDecoration:"underline",textUnderlineOffset:2,fontFamily:"inherit"},children:"Ber\xe4tta \u2192"})]})})]})]}),(0,$c.jsx)(vu,{}),Cr&&(0,$c.jsx)(bf,{children:(0,$c.jsxs)(kf,{children:["saving_limit"===Or?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("h3",{children:["Ni har hittat er besparing \u2014 nu \xe4r det dags att ",(0,$c.jsx)("em",{children:"realisera"})," den."]}),(0,$c.jsx)("p",{className:"sub",children:"Arvo har identifierat besparingar i era fakturor. Koppla Fortnox eller Visma s\xe5 analyserar vi hela er leverant\xf6rsreskontra och sk\xf6ter varje byte \u2014 fr\xe5n upps\xe4gning till nytt avtal."})]}):"saving"===Or?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{className:"gate-saving",children:[(0,$c.jsx)("span",{className:"gate-saving-label",children:"M\xf6jlig nettobesparing"}),(0,$c.jsxs)("span",{className:"gate-saving-amount",children:["+",bu(null!==(It=null===lr||void 0===lr||null===(Bt=lr.recommendation)||void 0===Bt?void 0:Bt.netSaving)&&void 0!==It?It:0)]}),(0,$c.jsxs)("span",{className:"gate-saving-context",children:[null===lr||void 0===lr||null===(Mt=lr.extracted)||void 0===Mt?void 0:Mt.supplier,null!==lr&&void 0!==lr&&null!==(Vt=lr.categorized)&&void 0!==Vt&&Vt.category?` \xb7 ${null!==(Ut=zm(lr.categorized.category).label)&&void 0!==Ut?Ut:lr.categorized.category}`:""]})]}),(0,$c.jsx)("p",{className:"sub",children:"Ange din e-post \u2014 vi skickar analysen direkt och en r\xe5dgivare kontaktar dig f\xf6r att realisera besparingen."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("h3",{children:["Redo att ",(0,$c.jsx)("em",{children:"g\xe5 vidare"}),"?"]}),(0,$c.jsx)("p",{className:"sub",children:"Koppla Fortnox / Visma f\xf6r en komplett analys av hela er leverant\xf6rsreskontra \u2014 Arvo sk\xf6ter varje byte fr\xe5n upps\xe4gning till nytt avtal."})]}),(0,$c.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),!Pr||Rr)return;Ir(!0);const t=Pr.trim().toLowerCase();if(localStorage.setItem("arvo_gate_email",t),"saving"===Or){try{lr&&await Bn(t)}catch{}Ar(!1),Ir(!1)}else Ir(!1),window.location.href="/connect"},children:[(0,$c.jsx)("input",{type:"email",placeholder:"din@epost.se",value:Pr,onChange:e=>Lr(e.target.value),required:!0,autoFocus:!0}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:Rr||!Pr,children:Rr?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(rf,{})," Skickar\u2026"]}):"saving"===Or?(0,$c.jsxs)($c.Fragment,{children:["Skicka analysen ",(0,$c.jsx)(yp,{name:"arrow",size:16})]}):(0,$c.jsxs)($c.Fragment,{children:["Koppla Fortnox / Visma ",(0,$c.jsx)(yp,{name:"arrow",size:16})]})}),(0,$c.jsx)("p",{className:"fine-print",children:"saving"===Or?"Ingen spam. Inga bindningstider. Ni betalar 20 % av den kontrakterade besparingen \u2014 dokumenterad i gammalt och nytt avtal, fakturerad f\xf6rst n\xe4r det nya avtalet b\xf6rjat g\xe4lla.":"Ingen spam. Inga fasta avgifter. Vi kontaktar dig bara om det finns besparingar att h\xe4mta."}),"saving_limit"===Or&&(0,$c.jsx)("p",{className:"fine-print",style:{marginTop:"8px",fontStyle:"italic"},children:"Ni har provat Arvo. Nu l\xe5ter vi siffrorna tala \u2014 utan kostnad tills ni sparar."})]})]})}),jr&&lr&&(0,$c.jsx)(bf,{onClick:e=>{e.target===e.currentTarget&&wr(!1)},children:(0,$c.jsxs)(kf,{children:[(0,$c.jsx)("button",{className:"close",onClick:()=>{wr(!1)},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===Nr?(0,$c.jsxs)("div",{className:"sent-state",children:[(0,$c.jsx)("span",{className:"sent-icon",children:(0,$c.jsx)(yp,{name:"check",size:20,stroke:2.5})}),(0,$c.jsx)("p",{className:"sent-title",children:za?"Optimeringen \xe4r aktiverad.":"Bytet \xe4r aktiverat."}),(0,$c.jsx)("p",{className:"sent-sub",children:"Arvo tar det h\xe4rifr\xe5n \u2014 ni h\xf6r av oss inom 48 timmar."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("p",{className:"bk-title",children:["Allt \xe4r f\xf6rberett.",(0,$c.jsx)("br",{}),"Er signatur aktiverar det."]}),(0,$c.jsxs)("div",{className:"bk-offer",children:[(0,$c.jsxs)("div",{className:"bk-offer-top",children:[(0,$c.jsx)("span",{className:"bk-partner-name",children:Sa?lr.recommendation.suggestedSupplier:Na}),(0,$c.jsxs)("span",{className:"bk-verified",children:[(0,$c.jsx)(yp,{name:"shield",size:10,stroke:2}),Sa?"Verifierat listpris":"Arvo-verifierad leverant\xf6r"]})]}),(0,$c.jsxs)("div",{className:"bk-price-row",children:[(0,$c.jsxs)("span",{className:"bk-from",children:[bu(ea),"/\xe5r"]}),(0,$c.jsx)("span",{className:"bk-arrow",children:"\u2192"}),(0,$c.jsxs)("span",{className:"bk-to",children:[Lf(lr.recommendation.suggestedAnnualCost)," kr/\xe5r"]})]}),(0,$c.jsxs)("p",{className:"bk-savings-row",children:["Ni sparar ",bu(ta)," \xb7 Arvo ",bu(ra)]})]}),Pr||Sr?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("p",{className:"bk-email-confirm",children:["Bekr\xe4ftelse till: ",(0,$c.jsx)("strong",{children:Pr||Sr})]}),(0,$c.jsx)(Bc,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===Nr,onClick:Vn,children:"submitting"===Nr?"Aktiverar\u2026":(0,$c.jsxs)($c.Fragment,{children:["Signera med BankID ",(0,$c.jsx)(yp,{name:"arrow",size:16})]})})]}):(0,$c.jsxs)("form",{className:"modal-form",onSubmit:Vn,children:[(0,$c.jsx)("input",{type:"email",placeholder:"din@epost.se",value:Sr,onChange:e=>$r(e.target.value),required:!0,autoFocus:!0}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===Nr,children:"submitting"===Nr?"Aktiverar\u2026":(0,$c.jsxs)($c.Fragment,{children:["Signera med BankID ",(0,$c.jsx)(yp,{name:"arrow",size:16})]})})]}),(0,$c.jsx)("p",{className:"bk-fine-print",children:"Du har 24 timmars \xe5ngerr\xe4tt."})]})]})}),Jr&&lr&&(0,$c.jsx)(bf,{onClick:e=>{e.target===e.currentTarget&&(Qr(!1),tn("idle"))},children:(0,$c.jsxs)(kf,{children:[(0,$c.jsx)("button",{className:"close",onClick:()=>{Qr(!1),tn("idle")},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===en?(0,$c.jsxs)("div",{className:"sent-state",children:[(0,$c.jsx)("span",{className:"sent-icon",children:(0,$c.jsx)(yp,{name:"check",size:20,stroke:2.5})}),(0,$c.jsx)("p",{className:"sent-title",children:"Analysen \xe4r skickad!"}),(0,$c.jsxs)("p",{className:"sent-sub",children:["Vi har skickat analysen till ",Xr,"."]})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("h3",{children:["Ladda ner er ",(0,$c.jsx)("em",{children:"analys"})]}),(0,$c.jsx)("p",{className:"sub",children:"Ange er e-post s\xe5 skickar vi en sammanfattning av analysen direkt till er inkorg."}),(0,$c.jsxs)("div",{className:"context-badge",children:[lr.extracted.supplier," \xb7 ",zm(null===(Kt=lr.categorized)||void 0===Kt?void 0:Kt.category).label]}),(0,$c.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),Xr&&"idle"===en){tn("submitting");try{await Bn(Xr),tn("sent")}catch{tn("error")}}},children:[(0,$c.jsx)("input",{type:"email",placeholder:"din@epost.se",value:Xr,onChange:e=>Zr(e.target.value),required:!0,autoFocus:!0}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===en,children:"submitting"===en?"Skickar\u2026":(0,$c.jsxs)($c.Fragment,{children:["Skicka analysen ",(0,$c.jsx)(yp,{name:"arrow",size:16})]})}),"error"===en&&(0,$c.jsx)("p",{className:"fine-print",style:{color:"red"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$c.jsx)("p",{className:"fine-print",children:"Ingen spam. Vi skickar analysen direkt till din inkorg."})]})]})]})}),mn&&(0,$c.jsx)(bf,{onClick:e=>{e.target===e.currentTarget&&fn(!1)},children:(0,$c.jsxs)(yf,{children:[(0,$c.jsx)("button",{className:"ac-close",onClick:()=>fn(!1),"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===xn?(0,$c.jsxs)("div",{className:"ac-success",children:[(0,$c.jsx)("div",{className:"ac-check",children:"\u2713"}),(0,$c.jsx)("h3",{children:"Briefing p\xe5 v\xe4g"}),(0,$c.jsx)("p",{className:"ac-email-sent",children:hn||Pr}),(0,$c.jsxs)("p",{className:"ac-success-sub",children:["Er Arvo Intelligence-briefing f\xf6r ",null!==(Ht=null===lr||void 0===lr||null===(Wt=lr.extracted)||void 0===Wt?void 0:Wt.supplier)&&void 0!==Ht?Ht:"er leverant\xf6r"," \xe4r skickad. Koppla er inkorg s\xe5 bevakar Arvo alla era leverant\xf6rsfakturor l\xf6pande."]}),(0,$c.jsx)("span",{className:"ac-upgrade-label",children:"Koppla er inkorg"}),(0,$c.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(hn||Pr)}`,className:"ac-oauth-btn",style:{marginBottom:9,display:"flex"},children:[(0,$c.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$c.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$c.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$c.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(hn||Pr)}`,className:"ac-oauth-btn",style:{display:"flex"},children:[(0,$c.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$c.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$c.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$c.jsx)("p",{className:"ac-privacy",children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("div",{className:"ac-eyebrow",children:"Arvo Intelligence"}),(0,$c.jsx)("h2",{className:"ac-heading",children:"Arvo s\xf6ker igenom er inkorg"}),(0,$c.jsx)("p",{className:"ac-sub",children:"Koppla Gmail eller Outlook \u2014 Arvo s\xf6ker er inkorg efter leverant\xf6rsfakturor och skickar er f\xf6rsta fullst\xe4ndiga briefing inom en timme."}),(0,$c.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(hn||Pr)}`,className:"ac-oauth-btn",children:[(0,$c.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$c.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$c.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$c.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(hn||Pr)}`,className:"ac-oauth-btn",children:[(0,$c.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$c.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$c.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$c.jsx)("div",{className:"ac-divider",children:"eller b\xf6rja nu"}),(0,$c.jsxs)("form",{onSubmit:async e=>{var t,r,n,a,i,o;e.preventDefault();const s=hn.trim()||Pr.trim();if(!s||"submitting"===xn)return;vn("submitting");const l=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(!e)return"";const r=e.match(/[^.!?]+[.!?]+/g)||[];return 0===r.length?e.length>200?e.slice(0,200).trimEnd()+"\u2026":e:r.slice(0,t).join(" ").trim()}(null!==lr&&void 0!==lr&&null!==(t=lr.categorized)&&void 0!==t&&t.category&&zm(lr.categorized.category).isRealPrice?null!==(r=null===lr||void 0===lr||null===(n=lr.recommendation)||void 0===n?void 0:n.reasoning)&&void 0!==r?r:"":Bf(null!==(a=null===lr||void 0===lr||null===(i=lr.recommendation)||void 0===i?void 0:i.reasoning)&&void 0!==a?a:"",null===lr||void 0===lr||null===(o=lr.recommendation)||void 0===o?void 0:o.suggestedSupplier));try{var d,c,u,p;if(!(await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,supplier:null===lr||void 0===lr||null===(d=lr.extracted)||void 0===d?void 0:d.supplier,normalizedSupplier:null===lr||void 0===lr||null===(c=lr.categorized)||void 0===c?void 0:c.normalizedSupplier,category:null===lr||void 0===lr||null===(u=lr.categorized)||void 0===u?void 0:u.category,annualCost:ea,suggestedAnnualCost:null===lr||void 0===lr||null===(p=lr.recommendation)||void 0===p?void 0:p.suggestedAnnualCost,grossSaving:ta,netSaving:na,arvoFee:ra,reasoning:l,diagScore:da,diagLabel:null===ca||void 0===ca?void 0:ca.label,diagInsight:ba})})).ok)throw new Error;vn("sent")}catch{vn("error")}},children:[(0,$c.jsxs)("div",{className:"ac-email-row",children:[(0,$c.jsx)("input",{className:"ac-email-input",type:"email",placeholder:"er@foretag.se",value:hn||Pr,onChange:e=>gn(e.target.value),required:!0,autoComplete:"email"}),(0,$c.jsx)(Bc,{type:"submit",$variant:"gradient",$size:"md",disabled:"submitting"===xn,style:{flexShrink:0},children:"submitting"===xn?"\u2026":"Skicka \u2192"})]}),"error"===xn&&(0,$c.jsx)("p",{style:{fontSize:12,color:"#C41E1E",marginTop:8},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$c.jsx)("p",{className:"ac-privacy",children:"Vi skickar er f\xf6rsta Intelligence-briefing omedelbart \u2014 baserad p\xe5 denna analys. Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})]})})]})},Qf=[[/\btelia\b/i,"Telia"],[/\btele\s*2\b/i,"Tele2"],[/\btelenor\b/i,"Telenor"],[/(?:^|\s)tre(?:\s|$)|\btre\s+f[\xf6o]retag\b/i,"Tre"],[/\bmicrosoft\b/i,"Microsoft"],[/\bgoogle\b/i,"Google"],[/\badobe\b/i,"Adobe"],[/\bdustin\b/i,"Dustin"]];function Xf(e){return function(e){const t=String(e||"").trim();if(!t)return"Ok\xe4nd leverant\xf6r";for(const[r,n]of Qf)if(r.test(t))return n;return t}(e.normalized_supplier||e.supplier)}function Zf(e){var t,r;if(null!=e.arvoScore&&Number.isFinite(Number(e.arvoScore))){var n;const t=Number(e.arvoScore);return e.should_switch&&(null!==(n=e.net_saving)&&void 0!==n?n:0)>0?Math.min(t,79):t}const a=null!==(t=e.gross_saving)&&void 0!==t?t:null!=e.net_saving?e.net_saving/.8:0;if(!e.should_switch||!e.annual_cost||!(a>0))return null;const i=Math.round(a/e.annual_cost*100),o=Math.max(5,Math.round(100-1.5*i));return(null!==(r=e.net_saving)&&void 0!==r?r:0)>0?Math.min(o,79):o}function eh(){let{autoAnalyses:e=[],watched:t=[]}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const r=e.length,n=t.length,a=e.filter(e=>null!=(null===e||void 0===e?void 0:e.prisunderlag)).length;return{fakturor:r+n,analyserade:r,prissatta:a,mottagna:r-a,bevakade:n}}function th(e){var t,r;const n=zm(e.category),a=(null!==(t=null===n||void 0===n?void 0:n.label)&&void 0!==t?t:e.category).toLowerCase();if("monitoring"===e.route)return"Avtalet \xe4r tidsbegr\xe4nsat. Arvo bevakar och f\xf6rbereder bytet inf\xf6r f\xf6rnyelsen \u2014 ni betalar konkurrenskraftigt till dess.";if("review_queue"===e.route)return"Kategorin kr\xe4ver manuell granskning \u2014 Arvo inh\xe4mtar offert f\xf6r exakt prisj\xe4mf\xf6relse. Ni kontaktas n\xe4r det \xe4r klart.";if(e.should_switch&&(null!==(r=e.net_saving)&&void 0!==r?r:0)>0){const t=e.annual_cost>0&&e.suggested_annual_cost>0?Math.round((e.annual_cost-e.suggested_annual_cost)/e.annual_cost*100):0;return t>=10?`Ni betalar <b>${t}% mer</b> \xe4n det billigaste verifierade alternativet f\xf6r ${a}. Arvo rekommenderar byte \u2014 det l\xe4gre priset finns f\xf6rberett nedan.`:`Ni betalar ${t>0?`${t}% mer`:"n\xe5got mer"} \xe4n det billigaste verifierade alternativet f\xf6r ${a} \u2014 ett litet gap. Ett l\xe4gre avtalspris finns att s\xe4kra om ni vill, men ingen br\xe5dska; avv\xe4rjt \xe4r \xe4nd\xe5 avv\xe4rjt.`}const i=e.prisunderlag;var o;return i&&i.ovissNiva?`Ni betalar ${Math.round(i.perEnhet).toLocaleString("sv-SE")} kr ${null!==(o=i.unitLabel)&&void 0!==o?o:"per enhet/\xe5r"} f\xf6r ${a}. Billigaste j\xe4mf\xf6rbara licens kostar ${i.golv.toLocaleString("sv-SE")} kr`+(i.referensProdukt?` (${i.referensProdukt})`:"")+" \u2014 men priserna i kategorin skiljer n\xe4stan tio g\xe5nger mellan billigaste och dyraste, s\xe5 vi s\xe4ger inget om avst\xe5ndet f\xf6rr\xe4n vi vet vilken niv\xe5 ni har. <b>Dela avtalet, s\xe5 l\xe5ser vi j\xe4mf\xf6relsen.</b>":i&&!i.underGolv&&i.avstandPct>15?`Ni betalar <b>${i.avstandPct}% mer</b> \xe4n det billigaste publicerade priset f\xf6r ${a}`+(i.referensProdukt?` (${i.referensProdukt})`:"")+". Arvo har inget verifierat bytesm\xe5l att l\xe4gga fram f\xf6r just den h\xe4r raden i dag \u2014 men priset \xe4r inte konkurrenskraftigt, och underlaget nedan visar exakt vad j\xe4mf\xf6relsen bygger p\xe5.":i?`Priset ligger p\xe5 eller under det billigaste publicerade priset f\xf6r ${a}`+(i.referensProdukt?` (${i.referensProdukt})`:"")+". Inget byte rekommenderas i dag \u2014 dela en ny faktura vid n\xe4sta avtalsperiod s\xe5 kontrollerar Arvo igen.":`Fakturan \xe4r mottagen och klassad som ${a}. Arvo har inget verifierat publikt pris att j\xe4mf\xf6ra den mot i dag, s\xe5 vi g\xf6r inget p\xe5st\xe5ende om prisl\xe4get \u2014 raden st\xe5r under bevakning och kontrolleras n\xe4r underlaget b\xe4r.`}const rh=vc.div`
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
`;function nh(e){let{email:t,onLogout:r}=e;const[a,i]=(0,n.useState)(""),[o,s]=(0,n.useState)(!1),[l,d]=(0,n.useState)(!1);if(t)return(0,$c.jsxs)(rh,{children:[(0,$c.jsxs)("span",{className:"ab-who",children:[(0,$c.jsx)("span",{className:"ab-dot"}),"Inloggad som ",(0,$c.jsx)("b",{children:t})]}),(0,$c.jsx)("button",{className:"ab-out",onClick:r,children:"Logga ut"})]});return(0,$c.jsx)(rh,{children:(0,$c.jsxs)("form",{onSubmit:async function(e){e.preventDefault();const t=a.trim();if(t&&!l){d(!0);try{await fetch("/api/auth/request-magic-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,dest:"portfolio"})}),s(!0)}catch{s(!0)}finally{d(!1)}}},children:[(0,$c.jsx)("div",{className:"ab-k",children:"Redan kund?"}),o?(0,$c.jsxs)("p",{className:"ab-msg",children:["Kolla er inkorg \u2014 en inloggningsl\xe4nk \xe4r p\xe5 v\xe4g till ",(0,$c.jsx)("b",{children:a.trim()}),". Den \xf6ppnar ert kontor p\xe5 vilken enhet som helst."]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("input",{type:"email",inputMode:"email",autoComplete:"email",placeholder:"Logga in med er f\xf6retagsmejl",value:a,onChange:e=>i(e.target.value),disabled:l}),(0,$c.jsx)("button",{className:"ab-in",type:"submit",disabled:l||!a.trim(),children:l?"Skickar\u2026":"Skicka l\xe4nk"})]})]})})}const ah=wc.font.mono,ih=wc.font.display,oh=jc`from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); }`,sh=jc`to { transform: rotate(360deg); }`,lh=(jc`0%,100% { opacity:.25; } 50% { opacity:1; }`,jc`0%,100% { opacity:.6; } 50% { opacity:1; }`),dh=(jc`0% { background-position:-200% 0; } 100% { background-position:200% 0; }`,function(){return hc`opacity:0; animation:${oh} .7s ${arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}s cubic-bezier(0.16,1,0.3,1) forwards;`}),ch=vc.main`
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
`,uh=vc.div`
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 22px 90px;
  @media (min-width: 768px) { padding: 56px 32px 120px; }
`,ph=(vc.div`
  position: relative; z-index: 2;
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${ah}; font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
  color: ${wc.dossier.faintOnDark};
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: ${wc.size.radius.pill};
  padding: 6px 14px; margin-bottom: 28px;
  span.dot { width: 5px; height: 5px; border-radius: 50%; background: ${wc.dossier.tealBright}; }
`,vc.div`
  display: flex; align-items: flex-start; justify-content: space-between; gap: 28px;
  ${dh(0)}
  @media (max-width: 820px) { flex-direction: column; gap: 22px; }
`),mh=vc.div`
  .brand {
    font-family: ${ah}; font-size: 11px; font-weight: 600;
    letter-spacing: .40em; text-indent: .40em; color: ${wc.dossier.tealBright};
    margin-bottom: 16px;
  }
  .confidential {
    font-family: ${ah}; font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark}; margin-bottom: 18px;
  }
  h1 {
    font-family: ${ih}; font-weight: 700; line-height: 1.02; letter-spacing: -.03em;
    font-size: clamp(40px, 7vw, 62px); margin: 0;
    color: ${wc.dossier.inkOnDark};
    background: ${wc.dossier.metallicText};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
`,fh=vc.div`
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
    animation: ${sh} 3.2s linear infinite;
    mask: radial-gradient(circle, #000 62%, transparent 63%);
    -webkit-mask: radial-gradient(circle, #000 62%, transparent 63%);
  }
  @media (prefers-reduced-motion: reduce) { .disc .sweep { animation: none; opacity: .35; } }
  .dial-center {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 3px;
    .dial-time { font-family: ${ah}; font-size: 19px; color: ${wc.dossier.inkOnDark}; font-feature-settings: 'tnum'; }
    .dial-k { font-family: ${ah}; font-size: 7.5px; letter-spacing: .24em; text-transform: uppercase; color: ${wc.dossier.faintOnDark}; }
  }
  .radar-title {
    font-family: ${ah}; font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
    color: ${wc.dossier.mutedOnDark}; line-height: 1.5; text-align: center;
    strong { color: ${wc.dossier.inkOnDark}; display: block; letter-spacing: .14em; }
  }
  /* Minimal separation (variant C): två namngivna grupper i SAMMA kort — era avtal vs marknaden.
     Hårfin men SYNLIG mono-etikett (faintOnDark, inte osynlig) så de två sanningarna aldrig blandas. */
  .rgroup-label { font-family: ${ah}; font-size: 9.5px; letter-spacing: .2em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark}; margin-bottom: 9px; }
  .radar-stats { display: flex; flex-direction: column; gap: 7px; }
  .rstat {
    display: flex; align-items: baseline; justify-content: space-between;
    font-size: 12px; color: ${wc.dossier.mutedOnDark};
    span.v { font-family: ${ah}; color: ${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; }
  }
  .radar-foot {
    margin-top: 16px; padding-top: 14px; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    display: flex; flex-direction: column; align-items: flex-start;
    font-size: 12px; color: ${wc.dossier.inkOnDark};
    .foot-line { display: flex; align-items: baseline; gap: 8px; line-height: 1.5;
      b { color: ${wc.dossier.inkOnDark}; font-weight: 600; } }
    .live { flex-shrink: 0; transform: translateY(2px); width: 7px; height: 7px; border-radius: 50%;
      background: ${wc.dossier.tealBright}; box-shadow: ${wc.dossier.glow}; animation: ${lh} 2.4s ease-in-out infinite; }
  }
`,hh=vc.section`
  margin-top: 30px; padding: 34px 0 4px;
  border-top: 1px solid ${wc.dossier.hairlineOnDark};
  ${dh(.08)}

  .eyebrow {
    font-family: ${ah}; font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: ${wc.dossier.teal}; margin-bottom: 18px;
    display: flex; align-items: center; gap: 12px;
  }
  .eyebrow::after { content:''; flex:1; height:1px; background:${wc.dossier.hairlineOnDark}; }

  h2 {
    font-family: ${ih}; font-weight: 600; letter-spacing: -.02em;
    font-size: clamp(30px, 5vw, 48px); line-height: 1.08; margin: 0 0 20px;
    max-width: 20ch; color: ${wc.dossier.inkOnDark};
  }
  h2 em { font-style: normal; color: ${wc.dossier.tealBright}; }

  p.work {
    font-size: 16px; line-height: 1.7; color: ${wc.dossier.mutedOnDark};
    max-width: 56ch; margin: 0 0 22px;
    b { color: ${wc.dossier.inkOnDark}; font-weight: 600; }
  }
`,gh=vc.span`
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${ah}; font-size: 11px; letter-spacing: .04em;
  color: ${wc.dossier.mutedOnDark};
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: ${wc.size.radius.pill};
  padding: 7px 14px;
  .pct { color: ${wc.dossier.tealBright}; font-weight: 600; }
`,xh=vc.div`
  margin-top: 40px;
  display: grid; gap: 18px;
  grid-template-columns: minmax(0,1fr);
  ${dh(.16)}
  @media (min-width: 880px) { grid-template-columns: 1.25fr 1fr; }
`,vh=hc`
  position: relative;
  background: ${wc.dossier.bgRaised};
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: ${wc.size.radius.lg};
  padding: 26px 26px 24px;
`,bh=vc.div`
  ${vh}
  grid-column: ${e=>{let{$full:t}=e;return t?"1 / -1":"auto"}};

  .card-eyebrow {
    font-family: ${ah}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wc.dossier.teal}; margin-bottom: 16px;
    display: flex; align-items: center; justify-content: space-between;
    .src { color: ${wc.dossier.faintOnDark}; letter-spacing: .12em; }
  }
`,kh=vc(bh)`
  overflow: hidden;
  &::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(ellipse 380px 200px at 88% 0%, rgba(43,196,172,.10), transparent 70%);
  }
  h3 {
    font-family: ${ih}; font-weight: 600; font-size: clamp(21px, 2.6vw, 27px);
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
    .amt { font-family: ${ah}; font-feature-settings:'tnum'; color: ${wc.dossier.inkOnDark};
      white-space: nowrap; }
    &.you .lbl { color: ${wc.dossier.tealBright}; font-weight: 600; }
    &.you .fill { background: ${wc.dossier.numberGradient}; box-shadow: 0 0 14px rgba(93,214,202,.4); }
    &:not(.you) .fill { background: rgba(255,255,255,.22); }
  }
  .truth-note { font-size: 13px; line-height: 1.6; color: ${wc.dossier.mutedOnDark};
    padding-top: 16px; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    b { color: ${wc.dossier.inkOnDark}; } }
`,yh=vc(bh)`
  display: flex; flex-direction: column;
  .idx-main { display: flex; align-items: flex-end; gap: 14px; margin-bottom: 6px; }
  .idx-num {
    font-family: ${ah}; font-weight: 700; font-size: 72px; line-height: .9;
    letter-spacing: -.04em; font-feature-settings:'tnum';
    background: ${wc.dossier.numberGradient};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .idx-denom { font-family: ${ah}; font-size: 22px; font-weight: 500; letter-spacing: -.02em;
    color: ${wc.dossier.faintOnDark}; padding-bottom: 8px; }
  .idx-delta {
    font-family: ${ah}; font-size: 13px; color: ${wc.dossier.tealBright};
    padding-bottom: 10px; margin-left: auto; text-align: right;
    .d { display:block; } .dl { color: ${wc.dossier.faintOnDark}; font-size:11px; letter-spacing:.1em; }
  }
  .spark { display: flex; align-items: flex-end; gap: 4px; height: 34px; margin: 12px 0 18px; }
  .spark span { flex: 1; border-radius: 2px 2px 0 0; background: rgba(255,255,255,.14); }
  .spark span.hot { background: ${wc.dossier.numberGradient}; }

  /* Marknadsläge — under / i nivå / över marknaden */
  .mkt-k { font-family: ${ah}; font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
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
    font-family: ${ah}; font-size: 9.5px; letter-spacing: .08em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark};
    .on { color: ${wc.dossier.tealBright}; } }
  .idx-note { font-size: 12.5px; line-height: 1.6; color: ${wc.dossier.mutedOnDark};
    margin-top: 16px; b { color: ${wc.dossier.inkOnDark}; } }
`,jh=vc(bh)`
  .cal-row {
    display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px;
    padding: 16px 0; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
    @media (max-width: 480px) { grid-template-columns: auto 1fr; gap: 10px 12px; }
  }
  .cal-prob {
    font-family: ${ah}; font-size: 15px; font-weight: 600; font-feature-settings:'tnum';
    color: ${wc.dossier.tealBright};
    width: 52px; text-align: right;
    @media (max-width: 480px) { grid-row: 1 / 3; }
  }
  .cal-body {
    .t { font-size: 14.5px; color: ${wc.dossier.inkOnDark}; font-weight: 600; margin-bottom: 3px; }
    .s { font-size: 12.5px; color: ${wc.dossier.mutedOnDark}; line-height: 1.45; }
  }
  .cal-when {
    font-family: ${ah}; font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
    color: ${wc.dossier.faintOnDark}; white-space: nowrap;
    @media (max-width: 480px) { grid-column: 2; text-align: left; }
  }
`,wh=vc(bh)`
  .rcpt {
    display: grid; grid-template-columns: 70px 1fr; gap: 14px; align-items: baseline;
    padding: 13px 0; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
  }
  .rcpt .day { font-family: ${ah}; font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
    color: ${wc.dossier.teal}; }
  .rcpt .what { font-size: 13.5px; line-height: 1.5; color: ${wc.dossier.mutedOnDark};
    b { color: ${wc.dossier.inkOnDark}; font-weight: 600; } }
`,Sh=vc(bh)`
  display: flex; flex-direction: column; justify-content: center;
  background: linear-gradient(150deg, ${wc.dossier.bgRaised} 0%, rgba(23,138,123,.16) 100%);
  .tally-k { font-family: ${ah}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wc.dossier.teal}; margin-bottom: 14px; }
  .tally-num { font-family: ${ih}; font-weight: 600; font-size: clamp(36px, 6vw, 52px);
    line-height: 1; letter-spacing: -.02em; margin-bottom: 10px;
    background: ${wc.dossier.metallicText};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    small { font-family: ${wc.font.sans}; font-size: 16px; color: ${wc.dossier.mutedOnDark};
      font-weight: 400; margin-left: 6px; -webkit-text-fill-color: ${wc.dossier.mutedOnDark}; } }
  .tally-sub { font-size: 14px; line-height: 1.55; color: ${wc.dossier.mutedOnDark};
    b { color: ${wc.dossier.inkOnDark}; } }
`,$h=vc.section`
  margin-top: 40px; padding-top: 28px; border-top: 1px solid ${wc.dossier.hairlineOnDark};
  ${dh(.24)}
  .h-eyebrow { font-family: ${ah}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wc.dossier.teal}; margin-bottom: 18px; }
  .h-row {
    display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 18px;
    padding: 14px 0; border-top: 1px solid ${wc.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
    @media (max-width: 560px) { grid-template-columns: 1fr auto; gap: 6px 12px; }
  }
  .h-name { color: ${wc.dossier.inkOnDark}; font-size: 14.5px; font-weight: 600; }
  .h-cat { font-size: 12px; color: ${wc.dossier.faintOnDark}; }
  .h-cost { font-family: ${ah}; font-size: 13.5px; color: ${wc.dossier.mutedOnDark};
    font-feature-settings:'tnum'; white-space: nowrap;
    @media (max-width:560px){ grid-column:2; grid-row:1; } }
  .h-state { font-family: ${ah}; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase;
    white-space: nowrap; padding: 4px 10px; border-radius: ${wc.size.radius.pill};
    border: 1px solid ${wc.dossier.hairlineOnDark};
    &.opt { color: ${wc.dossier.tealBright}; }
    &.watch { color: ${wc.dossier.mutedOnDark}; }
    @media (max-width:560px){ grid-column:2; } }
`,Nh=vc.div`
  margin-top: 56px; text-align: center;
  .keyline { height: 1px; background: ${wc.dossier.keyline}; opacity: .5; margin-bottom: 22px; }
  .mark { font-family: ${ah}; font-size: 11px; letter-spacing: .36em; text-indent: .36em;
    color: ${wc.dossier.faintOnDark}; }
  .tagline { font-family: ${ih}; font-style: italic; font-size: 16px;
    color: ${wc.dossier.mutedOnDark}; margin-top: 14px; }
`,Eh=vc.div`
  border-top: 1px solid ${wc.dossier.hairlineOnDark};
  &:first-of-type { border-top: none; }
`,_h=vc.button`
  width:100%; background:none; border:none; cursor:pointer; text-align:left;
  display:grid; grid-template-columns:auto 1fr auto auto auto; align-items:center; gap:16px;
  padding:15px 0; color:inherit; transition:opacity .15s;
  &:hover { opacity:.82; }
  @media (max-width: 760px){ grid-template-columns:auto 1fr auto; gap:8px 12px; padding:14px 0; }

  .h-name { color:${wc.dossier.inkOnDark}; font-size:15px; font-weight:600; letter-spacing:-.005em;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .h-cat { font-size:12px; color:${wc.dossier.faintOnDark}; margin-top:2px; }
  .h-cost { font-family:${ah}; font-size:13.5px; color:${wc.dossier.mutedOnDark};
    font-feature-settings:'tnum'; white-space:nowrap;
    @media (max-width:760px){ grid-column:2; grid-row:1; text-align:right; } }
  .h-badge { font-family:${ah}; font-size:13px; letter-spacing:.06em;
    white-space:nowrap; padding:5px 11px; border-radius:${wc.size.radius.pill};
    border:1px solid ${wc.dossier.hairlineOnDark};
    /* sparbadgen bär ett tal (kr/år) → aldrig versaler; statusord versaliseras */
    &.save { color:${wc.dossier.bg}; background:${wc.dossier.tealBright}; border-color:transparent; font-weight:600; font-feature-settings:'tnum'; }
    &.watch { color:${wc.dossier.mutedOnDark}; text-transform:uppercase; }
    /* "X % över lägsta pris" bär ett tal → aldrig versaler. Dämpad varningston, inte larmröd: det är
       ett konstaterande ur verifierat listpris, inte ett larm — och kortet under bär beviset. */
    &.over { color:${wc.dossier.inkOnDark}; border-color:rgba(224,160,90,.45);
             background:rgba(224,160,90,.10); font-feature-settings:'tnum'; }
    /* pillen högerställs under kostnaden → kostnad + pill bildar en ren högerkolumn (i linje) */
    @media (max-width:760px){ grid-column:2; grid-row:2; justify-self:end; } }
  .h-chev { color:${wc.dossier.faintOnDark}; display:flex; transition:transform .22s ease;
    transform:${e=>{let{$open:t}=e;return t?"rotate(180deg)":"none"}};
    @media (max-width:760px){ grid-column:3; grid-row:1 / 3; } }
`,zh=vc.div`
  position:relative; width:42px; height:42px; flex-shrink:0;
  span.v { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    font-family:${ah}; font-size:15px; font-weight:700; font-feature-settings:'tnum'; }
`,Ch=vc.div`
  padding:6px 0 24px; animation:${oh} .28s ease both;
  display:flex; flex-direction:column; gap:18px;

  /* Arvo bedömer — bara omdömet (score-ringen bor i radhuvudet, ej dubblerad) */
  .diag { padding:0 2px; }
  .diag .dbody .dtop { font-family:${ah}; font-size:10px; letter-spacing:.18em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:8px; }
  .diag .dbody .dtxt { font-size:14px; line-height:1.6; color:${wc.dossier.mutedOnDark};
    max-width:64ch; b { color:${wc.dossier.inkOnDark}; } }

  /* Faktatabell — råa tal, varje en gång */
  .facts { display:flex; flex-direction:column; gap:0;
    border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .fact { display:flex; justify-content:space-between; align-items:baseline; gap:14px;
    padding:10px 0; border-bottom:1px solid ${wc.dossier.hairlineOnDark}; font-size:13px;
    dt { color:${wc.dossier.mutedOnDark}; }
    dd { font-family:${ah}; color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; margin:0; } }
`,Ah=(vc.div`
  border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.md};
  background: linear-gradient(160deg, rgba(43,196,172,.10), rgba(23,138,123,.04));
  padding:18px 20px; display:flex; flex-direction:column;

  .si-k { font-family:${ah}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:14px; }
  .si-steps { display:flex; flex-direction:column; gap:14px; margin-bottom:18px; }
  .si-step { display:flex; gap:12px; align-items:flex-start; }
  .si-n { flex-shrink:0; width:22px; height:22px; border-radius:50%;
    border:1.5px solid ${wc.dossier.teal}; color:${wc.dossier.tealBright};
    font-family:${ah}; font-size:11px; font-weight:600; display:flex; align-items:center; justify-content:center; }
  .si-body { display:flex; flex-direction:column; gap:2px; }
  .si-t { display:block; font-size:13px; color:${wc.dossier.inkOnDark}; font-weight:600; line-height:1.3; }
  .si-d { display:block; font-size:12px; color:${wc.dossier.mutedOnDark}; line-height:1.45; }
  .si-offer { display:flex; align-items:baseline; gap:8px; margin-bottom:6px;
    padding-top:16px; border-top:1px solid ${wc.dossier.hairlineOnDark}; flex-wrap:wrap;
    .old { font-family:${ah}; font-size:13px; color:${wc.dossier.faintOnDark};
      text-decoration:line-through; }
    .arr { color:${wc.dossier.faintOnDark}; }
    .new { font-family:${ah}; font-size:20px; font-weight:700; font-feature-settings:'tnum';
      color:${wc.dossier.tealBright}; }
    .new small { font-family:${wc.font.sans}; font-size:12px; font-weight:400;
      color:${wc.dossier.mutedOnDark}; margin-left:3px; } }
  .si-save { font-size:12.5px; color:${wc.dossier.mutedOnDark}; line-height:1.5; margin-bottom:16px;
    b { color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; } }
`,vc.div`
  border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.md};
  background:${wc.dossier.bgRaised}; padding:18px 20px; margin-bottom:14px;
  display:flex; flex-direction:column;

  .st-k { font-family:${ah}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:14px; }
  .st-alt { padding:12px 0; border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .st-alt:first-of-type { border-top:none; padding-top:0; }
  .st-sup { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:14px; font-weight:600;
    color:${wc.dossier.inkOnDark}; margin-bottom:3px; }
  .st-tag { font-family:${ah}; font-size:9px; letter-spacing:.12em; text-transform:uppercase;
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
`),Dh=vc.div`
  position:relative; border:1px solid ${wc.dossier.hairlineOnDark};
  border-radius:${wc.size.radius.md}; overflow:hidden;
  background: radial-gradient(560px 260px at 8% -22%,
      ${e=>{let{$known:t}=e;return t?"rgba(43,196,172,0.10)":"rgba(224,162,60,0.09)"}}, transparent 60%),
    ${wc.dossier.bgRaised};
  padding:22px 22px 18px; display:flex; flex-direction:column;

  .sv-eyebrow { display:flex; align-items:center; gap:9px; font-family:${ah}; font-size:10px;
    letter-spacing:.26em; text-transform:uppercase; color:${wc.dossier.faintOnDark}; margin-bottom:15px; }
  .sv-dot { flex-shrink:0; width:6px; height:6px; border-radius:50%;
    background:${e=>{let{$known:t}=e;return t?wc.dossier.teal:wc.dossier.signal}};
    box-shadow:0 0 0 4px ${e=>{let{$known:t}=e;return t?"rgba(43,196,172,0.13)":"rgba(224,162,60,0.13)"}},
      0 0 12px ${e=>{let{$known:t}=e;return t?wc.dossier.tealBright:wc.dossier.signal}}; }
  .sv-dom { font-family:${ih}; font-weight:500; font-size:clamp(20px,2.6vw,25px); line-height:1.22;
    letter-spacing:-.01em; color:${wc.dossier.inkOnDark}; margin-bottom:13px;
    em { font-style:normal; color:${e=>{let{$known:t}=e;return t?wc.dossier.teal:wc.dossier.tealBright}}; } }
  .sv-support { font-size:13.5px; line-height:1.62; color:${wc.dossier.mutedOnDark}; margin:0;
    b { color:${wc.dossier.inkOnDark}; } }

  .sv-proof { margin-top:12px; border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .sv-proof > summary { list-style:none; cursor:pointer; font-family:${ah}; font-size:10px;
    letter-spacing:.2em; text-transform:uppercase; color:${wc.dossier.teal};
    padding:13px 0 0; display:flex; align-items:center; }
  .sv-proof > summary::-webkit-details-marker { display:none; }
  .sv-proof > summary::after { content:'+'; margin-left:auto; font-size:15px; line-height:1;
    color:${wc.dossier.faintOnDark}; }
  .sv-proof[open] > summary::after { content:'\\2013'; }
  .sv-proof-body { padding-top:4px; }
  .sv-sec { padding:13px 0 2px; border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .sv-sec:first-child { border-top:none; }
  .sv-lbl { font-family:${ah}; font-size:9.5px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; margin-bottom:8px; }
  .sv-alt { margin-bottom:8px; }
  .sv-sup { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:13.5px; font-weight:600;
    color:${wc.dossier.inkOnDark}; }
  .sv-tag { font-family:${ah}; font-size:9px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.bg}; background:${wc.dossier.teal}; border-radius:${wc.size.radius.sm}; padding:2px 7px; }
  .sv-pos { display:block; font-size:12px; color:${wc.dossier.mutedOnDark}; line-height:1.5; margin-top:3px; }
  .sv-fine { margin-top:6px; font-size:11.5px; color:${wc.dossier.faintOnDark}; line-height:1.5;
    b { color:${wc.dossier.mutedOnDark}; } }
  .sv-note { font-size:12.5px; line-height:1.6; color:${wc.dossier.mutedOnDark}; margin:2px 0 0; }
  .sv-row { display:flex; justify-content:space-between; align-items:baseline; padding:7px 0; gap:14px;
    & > span:first-child { font-size:12.5px; color:${wc.dossier.mutedOnDark}; display:flex; flex-direction:column; }
    small { font-size:10.5px; color:${wc.dossier.faintOnDark}; margin-top:2px; } }
  .sv-v { font-family:${ah}; font-size:13px; color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; white-space:nowrap; }
  .sv-keep .sv-v { font-size:15px; color:${wc.dossier.tealBright}; }

  .sv-act { margin-top:18px; display:flex; flex-direction:column; gap:11px; }
  ${Ah}
`,Fh=vc.div`
  margin-top:16px; padding:18px;
  border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.md};
  background: radial-gradient(480px 220px at 10% -20%, rgba(43,196,172,0.07), transparent 60%);
  .al-eyebrow { display:flex; align-items:center; justify-content:space-between; gap:8px;
    font-family:${ah}; font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:12px;
    span { color:${wc.dossier.faintOnDark}; letter-spacing:.08em; text-transform:none; } }
  .al-facts { display:flex; flex-wrap:wrap; gap:6px 14px; margin-bottom:14px;
    font-size:12px; color:${wc.dossier.mutedOnDark};
    b { color:${wc.dossier.inkOnDark}; font-weight:600; } }
  .al-deadline { padding:12px 14px; border:1px solid rgba(43,196,172,.28);
    border-radius:${wc.size.radius.sm}; margin-bottom:12px;
    font-size:13px; color:${wc.dossier.mutedOnDark}; line-height:1.5;
    .al-date { font-family:${ah}; font-size:15px; color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum'; }
    .al-days { font-family:${ah}; color:${wc.dossier.tealBright}; }
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
    font-family:${ah}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; text-align:left;
    &:hover { color:${wc.dossier.teal}; } }
  .al-falla, .al-motdrag { margin:0 0 8px; font-size:12.5px; line-height:1.6;
    color:${wc.dossier.mutedOnDark};
    b { color:${wc.dossier.inkOnDark}; font-weight:600; } }
  .al-citat { margin-top:12px;
    summary { cursor:pointer; font-family:${ah}; font-size:10.5px; letter-spacing:.14em;
      text-transform:uppercase; color:${wc.dossier.faintOnDark};
      &:hover { color:${wc.dossier.teal}; } }
    .al-c { margin:10px 0 0; padding-left:12px; border-left:2px solid ${wc.dossier.hairlineOnDark};
      font-size:11.5px; line-height:1.55; color:${wc.dossier.faintOnDark};
      i { font-style:normal; color:${wc.dossier.mutedOnDark}; }
      small { display:block; font-family:${ah}; font-size:9.5px; letter-spacing:.12em;
        text-transform:uppercase; color:${wc.dossier.faintOnDark}; margin-bottom:2px; } } }
  ${Ah}
  .sv-upload { margin-top:14px; }
`,Oh=vc.div`
  margin-top:16px; padding:16px 18px;
  border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.md};
  .au-eyebrow { font-family:${ah}; font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; margin-bottom:8px; }
  .au-txt { margin:0 0 12px; font-size:12.5px; line-height:1.55; color:${wc.dossier.mutedOnDark}; }
  ${Ah}
`,Th=vc.section`
  margin-top:40px;
  .w-eyebrow { font-family:${ah}; font-size:11px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; padding-bottom:14px; border-bottom:1px solid ${wc.dossier.hairlineOnDark}; }
  .w-manifesto { margin:16px 0 22px; font-size:14px; line-height:1.65; color:${wc.dossier.mutedOnDark};
    max-width:64ch; b { color:${wc.dossier.inkOnDark}; font-weight:700; } }
  .w-row { padding:18px 0; border-top:1px solid ${wc.dossier.hairlineOnDark}; }
  .w-row:first-of-type { border-top:none; }
  .w-top { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px; }
  .w-sup { font-size:15px; font-weight:600; color:${wc.dossier.inkOnDark}; }
  .w-kind { font-family:${ah}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; border:1px solid ${wc.dossier.hairlineOnDark};
    border-radius:${wc.size.radius.sm}; padding:3px 8px; white-space:nowrap; }
  .w-head { font-family:${wc.font.display}; font-size:17px; font-weight:600; line-height:1.3;
    color:${wc.dossier.inkOnDark}; margin-bottom:7px; }
  .w-detail { margin:0 0 10px; font-size:13px; line-height:1.6; color:${wc.dossier.mutedOnDark}; max-width:68ch; }
  .w-list { font-family:${ah}; font-size:12px; letter-spacing:.02em; color:${wc.dossier.faintOnDark};
    margin-bottom:10px; line-height:1.7; }
  .w-action { font-size:12.5px; color:${wc.dossier.teal}; display:flex; gap:7px; align-items:baseline;
    .w-arrow { font-family:${ah}; } }
`,Ph=vc.a`
  display:flex; align-items:center; justify-content:center; gap:8px;
  text-decoration:none; cursor:pointer;
  font-size:14px; font-weight:600; color:${wc.dossier.bg};
  background:${wc.dossier.ctaGradient}; box-shadow:${wc.dossier.ctaShadow};
  border-radius:${wc.size.radius.pill}; padding:13px 20px; border:none;
  transition:transform .15s ease, filter .15s ease;
  &:hover { transform:translateY(-1px); filter:brightness(1.05); }
`,Lh=vc.div`
  margin-top:40px; padding:30px 0 4px; border-top:1px solid ${wc.dossier.hairlineOnDark};
  ${dh(.1)}
  .iq-k { font-family:${ah}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:14px; }
  h3 { font-family:${ih}; font-weight:600; font-size:clamp(22px,3.2vw,30px); line-height:1.16;
    letter-spacing:-.02em; margin:0 0 14px; max-width:24ch; color:${wc.dossier.inkOnDark};
    em { font-style:normal; color:${wc.dossier.tealBright}; } }
  p { font-size:15px; line-height:1.65; color:${wc.dossier.mutedOnDark}; max-width:54ch; margin:0 0 22px;
    b { color:${wc.dossier.inkOnDark}; } }
  .iq-row { display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
  /* Priset gömmer sig aldrig — krispig off-white som poppar ur mörkret */
  .iq-price { font-family:${ah}; font-size:19px; font-weight:600; letter-spacing:-.01em;
    color:${wc.dossier.inkOnDark}; font-feature-settings:'tnum';
    span { color:${wc.dossier.mutedOnDark}; font-size:12.5px; font-weight:400; letter-spacing:0; } }
`,Rh=vc.div`
  width:30px; height:30px; border:3px solid ${wc.dossier.hairlineOnDark};
  border-top-color:${wc.dossier.tealBright}; border-radius:50%;
  animation:${sh} .8s linear infinite; margin:120px auto;
`,Ih=(vc.div`
  margin-top:34px; padding-top:28px; border-top:1px solid ${wc.dossier.hairlineOnDark};
  ${dh(.06)}
  .cm-eyebrow { font-family:${ah}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
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
  .cm-tag { font-family:${ah}; font-size:8.5px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; border:1px solid rgba(43,196,172,.4);
    border-radius:${wc.size.radius.pill}; padding:3px 8px; white-space:nowrap; }
  .cm-tag.offert { color:${wc.dossier.faintOnDark}; border-color:${wc.dossier.hairlineOnDark}; }
  .cm-verified { font-family:${ah}; font-size:9px; letter-spacing:.07em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; margin-top:1px; }
`,vc.div`
  margin-top:20px; display:grid; gap:18px; grid-template-columns:1fr 1fr;
  ${dh(.12)}
  @media (max-width:760px){ grid-template-columns:1fr; }
  .door { position:relative; border:1px solid ${wc.dossier.hairlineOnDark}; border-radius:${wc.size.radius.lg};
    background:${wc.dossier.bgRaised}; padding:24px 24px 22px; display:flex; flex-direction:column; }
  /* Vidarebefordra ÄR moaten (bulk 50–100 fakturor). Den rekommenderade dörren bär hjälte-vikt:
     hot teal-ton + glöd, medan upload förblir den lugna sekundär-dörren (grundarbeslut 2026-07-01). */
  .door.primary { border-color:rgba(43,196,172,.42);
    background:linear-gradient(155deg, rgba(43,196,172,.10), rgba(23,138,123,.03));
    box-shadow:0 0 0 1px rgba(43,196,172,.10); }
  .door-k { font-family:${ah}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wc.dossier.teal}; margin-bottom:12px; display:flex; align-items:center; gap:9px; }
  .door-tag { font-family:${ah}; font-size:8.5px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.bg}; background:${wc.dossier.teal}; border-radius:${wc.size.radius.pill};
    padding:3px 8px; }
  .door h4 { font-family:${ih}; font-weight:600; font-size:18px; letter-spacing:-.01em;
    color:${wc.dossier.inkOnDark}; margin:0 0 8px; }
  .door p { font-size:13px; line-height:1.55; color:${wc.dossier.mutedOnDark}; margin:0 0 16px; }
  .door .spacer { flex:1; }
  /* Trygghet vid själva överlämnandet av data — Zero Trust betyder mest här (grundarbeslut 2026-07-01) */
  .door-trust { margin:11px 0 0; font-size:11.5px; line-height:1.5; color:${wc.dossier.faintOnDark};
    display:flex; gap:8px; align-items:baseline;
    .dt-ico { flex-shrink:0; color:${wc.dossier.teal}; transform:translateY(2px); }
    b { color:${wc.dossier.mutedOnDark}; font-weight:600; } }
`),Bh=vc.p`
  margin: 18px 2px 0; font-size: 13px; line-height: 1.6; color: ${wc.dossier.faintOnDark};
  b { color: ${wc.dossier.mutedOnDark}; font-weight: 600; }
`,Mh=vc.button`
  width:100%; display:flex; align-items:center; justify-content:space-between; gap:12px;
  font-family:${ah}; font-size:14px; letter-spacing:.01em; color:${wc.dossier.tealBright};
  background:rgba(43,196,172,.06); border:1px dashed rgba(43,196,172,.45);
  border-radius:${wc.size.radius.md}; padding:13px 16px; text-align:left; cursor:pointer;
  transition:background .15s, border-color .15s;
  &:hover { background:rgba(43,196,172,.12); border-color:${wc.dossier.tealBright}; }
  &.copied { border-style:solid; border-color:${wc.dossier.tealBright}; }
  .ac-addr { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .ac-copy { flex-shrink:0; display:inline-flex; align-items:center; gap:6px;
    font-family:${ah}; font-size:10px; letter-spacing:.12em; text-transform:uppercase;
    color:${wc.dossier.faintOnDark}; }
  &.copied .ac-copy { color:${wc.dossier.tealBright}; }
`,Vh=vc.label`
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
`,Uh=vc.div`
  margin-top:14px; display:flex; flex-direction:column; gap:7px;
  .dp-row { display:flex; align-items:center; justify-content:space-between; gap:12px;
    font-size:12.5px; color:${wc.dossier.mutedOnDark}; }
  .dp-name { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; }
  .dp-stat { font-family:${ah}; font-size:11px; letter-spacing:.06em; white-space:nowrap; }
  .dp-stat.done { color:${wc.dossier.tealBright}; }
  .dp-stat.work { color:${wc.dossier.faintOnDark}; }
  .dp-stat.fail { color:#E06A4D; }
  .dp-note { margin-top:6px; font-size:12px; color:${wc.dossier.faintOnDark}; line-height:1.5; }
`,Kh=vc.div`
  margin-top:24px; display:flex; align-items:center; gap:14px;
  padding:15px 18px; border:1px solid ${wc.dossier.hairlineOnDark};
  border-radius:${wc.size.radius.md}; ${dh(.18)}
  .ft-ico { color:${wc.dossier.faintOnDark}; flex-shrink:0; display:flex; }
  .ft-txt { flex:1; font-size:13px; line-height:1.5; color:${wc.dossier.mutedOnDark};
    b { color:${wc.dossier.inkOnDark}; } }
  .ft-soon { font-family:${ah}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; border:1px solid rgba(43,196,172,.4);
    border-radius:${wc.size.radius.pill}; padding:5px 11px; white-space:nowrap; }
`,Hh=vc.section`
  margin-top:26px; padding:22px 24px; border:1px solid ${wc.dossier.hairlineOnDark};
  border-radius:${wc.size.radius.lg}; background:${wc.dossier.bgRaised}; ${dh(.16)}
  .mi-k { font-family:${ah}; font-size:10px; letter-spacing:.22em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; }
  .mi-h { margin:10px 0 4px; font-family:${wc.font.display}; font-weight:600;
    font-size:clamp(18px,2.6vw,22px); line-height:1.25; color:${wc.dossier.inkOnDark}; }
  .mi-p { margin:0 0 16px; font-size:13.5px; line-height:1.6; color:${wc.dossier.mutedOnDark}; }
  .mi-grid { display:grid; gap:14px; grid-template-columns:1fr 1fr; align-items:start; }
  @media (max-width:760px){ .mi-grid { grid-template-columns:1fr; } }
  .mi-or { font-size:12px; color:${wc.dossier.faintOnDark}; margin:0 0 8px; }
`,Wh=vc.div`
  margin-top:18px; padding-top:16px; border-top:1px solid ${wc.dossier.hairlineOnDark};
  .u-k { font-family:${ah}; font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; margin-bottom:12px; }
  .u-rad { display:grid; grid-template-columns:1fr auto auto; gap:8px 14px; align-items:baseline;
    padding:7px 0; border-bottom:1px solid rgba(255,255,255,.04); font-size:13px; }
  .u-rad:last-of-type { border-bottom:none; }
  .u-txt { color:${wc.dossier.mutedOnDark}; }
  .u-spec { font-family:${ah}; font-size:11.5px; color:${wc.dossier.faintOnDark}; white-space:nowrap; }
  .u-bel { font-family:${ah}; font-size:13px; font-feature-settings:'tnum';
    color:${wc.dossier.inkOnDark}; white-space:nowrap; text-align:right; }
  /* Summeringen är kvittot: kunden ska kunna följa raderna ned till talet i rubriken. */
  .u-summa { display:grid; grid-template-columns:1fr auto; gap:14px; align-items:baseline;
    margin-top:10px; padding-top:10px; border-top:1px solid ${wc.dossier.hairlineOnDark};
    font-size:13px; color:${wc.dossier.mutedOnDark}; }
  .u-summa.total .u-bel, .u-summa.total { color:${wc.dossier.inkOnDark}; font-weight:600; }
  .u-not { margin:12px 0 0; font-size:12px; line-height:1.55; color:${wc.dossier.faintOnDark}; }
  .u-utanfor { margin-top:16px; padding-top:14px; border-top:1px dashed ${wc.dossier.hairlineOnDark}; }
  @media (max-width:480px){ .u-rad { grid-template-columns:1fr auto; } .u-spec { grid-column:1 / -1; } }
`,qh=vc.div`
  margin-top:18px; padding-top:16px; border-top:1px solid ${wc.dossier.hairlineOnDark};
  .u-k { font-family:${ah}; font-size:10px; letter-spacing:.2em; text-transform:uppercase;
    color:${wc.dossier.tealBright}; margin-bottom:12px; }
  .u-rad { display:grid; grid-template-columns:1fr auto auto; gap:8px 14px; align-items:baseline;
    padding:7px 0; border-bottom:1px solid rgba(255,255,255,.04); font-size:13px; }
  .u-txt { color:${wc.dossier.mutedOnDark}; }
  /* Referensprodukten står under sin rad, inte som en parentes i den — den är svaret på "priset
     på VAD?", och den frågan ska inte behöva letas upp. */
  .u-prod { display:block; font-style:normal; font-family:${ah}; font-size:11px;
    letter-spacing:.02em; color:${wc.dossier.faintOnDark}; margin-top:3px; }
  .u-spec { font-family:${ah}; font-size:11.5px; color:${wc.dossier.faintOnDark}; white-space:nowrap; }
  .u-bel { font-family:${ah}; font-size:13px; font-feature-settings:'tnum';
    color:${wc.dossier.inkOnDark}; white-space:nowrap; text-align:right; }
  .u-slut { margin-top:12px; padding:10px 12px; border-radius:${wc.size.radius.md};
    font-size:13.5px; line-height:1.5; color:${wc.dossier.mutedOnDark};
    border:1px solid ${wc.dossier.hairlineOnDark};
    b { color:${wc.dossier.inkOnDark}; } }
  .u-slut.bra { border-color:rgba(43,196,172,.30); background:rgba(43,196,172,.06);
    b { color:${wc.dossier.tealBright}; } }
  .u-not { margin:12px 0 0; font-size:12px; line-height:1.55; color:${wc.dossier.faintOnDark}; }
  @media (max-width:480px){ .u-rad { grid-template-columns:1fr auto; } .u-spec { grid-column:1 / -1; } }
`,Gh=e=>new Promise((t,r)=>{const n=new FileReader;n.onload=()=>{const e=String(n.result||"");t(e.includes(",")?e.split(",")[1]:e)},n.onerror=()=>r(new Error("Kunde inte l\xe4sa filen")),n.readAsDataURL(e)});function Yh(e,t,r){switch(e){case 429:return["Dagskvot n\xe5dd",t||"Ni har n\xe5tt max antal fria analyser idag \u2014 f\xf6rs\xf6k igen imorgon eller aktivera ert konto."];case 504:return["Tog f\xf6r l\xe5ng tid","Analysen hann inte klart i tid. V\xe4nta en stund och f\xf6rs\xf6k igen."];case 401:return["Sessionen l\xf6pte ut","Ladda om sidan och f\xf6rs\xf6k igen."+(r?` (orsak: ${r})`:"")];case 413:return["Filen f\xf6r stor",t||"PDF:en \xf6verstiger maxstorleken \u2014 komprimera eller dela upp den."];case 400:return["Kunde inte l\xe4sas",t||"Filen gick inte att tolka som en faktura. Kontrollera att det \xe4r en PDF-faktura."];case 404:return["Tj\xe4nsten n\xe5s inte h\xe4r","\xd6ppna ert kontor via arvoflow.se s\xe5 fungerar analysen."];case 500:case 502:case 503:return["Tillf\xe4lligt serverfel","N\xe5got gick fel p\xe5 v\xe5r sida \u2014 f\xf6rs\xf6k igen om en stund."];default:return["Misslyckades",t||`Servern svarade ${e||"ov\xe4ntat"}.`]}}const Jh=new Set(["gmail.com","hotmail.com","outlook.com","yahoo.com","yahoo.se","icloud.com","live.com","msn.com","me.com","proton.me","protonmail.com"]);async function Qh(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}const Xh="arvo_fp_override";const Zh="faktura@inbox.arvoflow.se",eg=e=>null==e?"\u2013":Math.round(e).toLocaleString("sv-SE"),tg=e=>e?new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"short"}):"",rg=e=>e.toLocaleDateString("sv-SE",{month:"long",year:"numeric"}),ng={per_user_month:"kr/anv./m\xe5n",per_subscription_month:"kr/abonn./m\xe5n",ore_per_kwh:"\xf6re/kWh"},ag={"ramavtal-stat":"statliga ramavtal","ramavtal-kommun":"kommunala ramavtal","reskontra-kommun":"kommunal leverant\xf6rsreskontra",upphandling:"offentliga upphandlingar",eurostat:"officiell statistik (Eurostat/SCB)"},ig=e=>null==e?"\u2013":Number(e).toLocaleString("sv-SE",{maximumFractionDigits:2});function og(e){return null==e?"rgba(157,184,175,.45)":e<45?"#E06A4D":e<65?"#E0A23C":e<80?"#5DD6CA":"#2BC4AC"}const sg=17;function lg(e){let{score:t,size:r=42,r:n=sg,sw:a=3.2}=e;const i=2*Math.PI*n,o=og(t),s=null==t?0:t/100;return(0,$c.jsxs)("svg",{width:r,height:r,viewBox:`0 0 ${r} ${r}`,children:[(0,$c.jsx)("circle",{cx:r/2,cy:r/2,r:n,fill:"none",stroke:"rgba(255,255,255,.12)",strokeWidth:a}),(0,$c.jsx)("circle",{cx:r/2,cy:r/2,r:n,fill:"none",stroke:o,strokeWidth:a,strokeLinecap:"round",strokeDasharray:`${s*i} ${i}`,style:{transform:"rotate(-90deg)",transformOrigin:"center",transition:"stroke-dasharray 1s ease"}})]})}function dg(){var e,t,r,a;const[i,o]=(0,n.useState)(null),[s,l]=(0,n.useState)(null),[d,c]=(0,n.useState)({}),[u,p]=(0,n.useState)({}),[m,f]=(0,n.useState)({}),[h,g]=(0,n.useState)({}),[x,v]=(0,n.useState)({}),[b,k]=(0,n.useState)({}),[y,j]=(0,n.useState)([]),[w,S]=(0,n.useState)(null),[$,N]=(0,n.useState)(0),[E,_]=(0,n.useState)(0),[z,C]=(0,n.useState)([]),[A,D]=(0,n.useState)(0),[F,O]=(0,n.useState)(!1),[T,P]=(0,n.useState)(null),[L,R]=(0,n.useState)(new Set),[I,B]=(0,n.useState)(""),[M,V]=(0,n.useState)([]),[U,K]=(0,n.useState)(!1),[H,W]=(0,n.useState)(""),[q,G]=(0,n.useState)(!1),[Y,J]=(0,n.useState)(!1),[Q,X]=(0,n.useState)(!1),[Z,ee]=(0,n.useState)({}),[te,re]=(0,n.useState)(""),[ne,ae]=(0,n.useState)(null),[ie,oe]=(0,n.useState)(!1),[se,le]=(0,n.useState)(""),[de,ce]=(0,n.useState)(0),[ue,pe]=(0,n.useState)(!1),me=(0,n.useMemo)(()=>new URLSearchParams(window.location.search).get("magic"),[]),{email:fe,sessionToken:he,logout:ge}=Ac(),xe=(0,n.useCallback)(async e=>{var t,r,n,a,i,s,d,u,m,h,x,b,y;const w=new URLSearchParams;if(he)w.set("session",he);else{const t=e||I||await Qh();t&&w.set("fingerprint",t)}me&&w.set("magic",me);const $=await fetch(`/api/invoice-history?${w.toString()}`);if(!$.ok){const e=await $.json().catch(()=>null);throw new Error((null===e||void 0===e?void 0:e.message)||`Kunde inte h\xe4mta ert kontor just nu (HTTP ${$.status}).`)}const E=await $.json();o(null!==(t=E.analyses)&&void 0!==t?t:[]),l(null!==(r=E.email)&&void 0!==r?r:null),c(null!==(n=E.cohort)&&void 0!==n?n:{}),p(null!==(a=E.publicBench)&&void 0!==a?a:{}),f(null!==(i=E.forecasts)&&void 0!==i?i:{}),g(null!==(s=E.branchAnchors)&&void 0!==s?s:{}),v(null!==(d=E.movements)&&void 0!==d?d:{}),k(null!==(u=E.switchTargets)&&void 0!==u?u:{}),j(null!==(m=E.watched)&&void 0!==m?m:[]),S(null!==(h=E.vakt)&&void 0!==h?h:null),N(null!==(x=E.ingesting)&&void 0!==x?x:0),_(null!==(b=E.ingestFailed)&&void 0!==b?b:0),C(null!==(y=E.ingestFailedFiles)&&void 0!==y?y:[]),D(Number(E.fr\u00e5nDennaEnhet)||0)},[I,me,he]),ve=(0,n.useCallback)(async()=>{O(!0);try{await fetch("/api/ingest/retry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session:he,magic:me})}),_(0),C([]),N(e=>e||1),await xe()}catch{}finally{O(!1)}},[he,me,xe]);(0,n.useEffect)(()=>{let e=!1;return(async()=>{try{const t=function(){try{const e=new URLSearchParams(window.location.search);if(e.has("reset")){const t=(e.get("reset")||"1").toLowerCase();if("off"===t||"0"===t||"real"===t)localStorage.removeItem(Xh);else{const e="test"+Array.from(crypto.getRandomValues(new Uint8Array(10))).map(e=>e.toString(16).padStart(2,"0")).join("");localStorage.setItem(Xh,e),["arvo_successful_count","arvo_had_saving","arvo_gate_passed"].forEach(e=>localStorage.removeItem(e))}e.delete("reset");const r=e.toString();window.history.replaceState({},"",window.location.pathname+(r?`?${r}`:""))}return localStorage.getItem(Xh)||null}catch{return null}}();e||J(!!t);const r=t||await Qh();e||B(r),e||await xe(r)}catch(t){e||P(t.message)}})(),()=>{e=!0}},[]),(0,n.useEffect)(()=>{he&&xe().catch(e=>P(e.message))},[he]),(0,n.useEffect)(()=>{if($<=0)return;const e=setInterval(()=>{xe().catch(()=>{})},12e3);return()=>clearInterval(e)},[$,xe]);const be=(0,n.useCallback)(()=>{ge();const e=window.location.pathname;window.history.replaceState({},"",e),window.location.reload()},[ge]);async function ke(e){const t=[...e||[]].filter(e=>"application/pdf"===e.type||/\.pdf$/i.test(e.name)).slice(0,20);if(!t.length)return;W(""),K(!0),V(t.map(e=>({name:e.name,status:"work"})));const r=!(!me&&!he);let n=null;if(!r)try{var a;const e=await fetch("/api/token",{method:"POST"});n=null===(a=await e.json())||void 0===a?void 0:a.token}catch{}let i=!1,o="",s=0;for(let l=0;l<t.length;l++)try{const e=await Gh(t[l]);let a="fail",d="Misslyckades",c="";const u=r?"/api/kontor-ingest":"/api/test-invoice",p=r?{pdfBase64:e,magic:me,session:he,fingerprint:I}:{pdfBase64:e,industry:"ovrigt",employees:10,token:n,fingerprint:I},m=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}),f=await m.json().catch(()=>({}));r?f.ok?a="done":([d,c]=Yh(m.status,null===f||void 0===f?void 0:f.error,null===f||void 0===f?void 0:f.code),o=c):f.gate?(a="gate",i=!0):"auto"===f.route||"monitoring"===f.route?a="done":"review_queue"===f.route||"unsupported"===f.route?(a="review",s++):([d,c]=Yh(m.status,null===f||void 0===f?void 0:f.error,null===f||void 0===f?void 0:f.code),o=c),V(e=>e.map((e,t)=>t===l?{...e,status:a,label:d,hint:c}:e))}catch{o="Kunde inte n\xe5 servern \u2014 kontrollera n\xe4tet och f\xf6rs\xf6k igen.",V(e=>e.map((e,t)=>t===l?{...e,status:"fail",label:"N\xe4tverksfel",hint:o}:e))}K(!1),i?W("Ni har n\xe5tt gr\xe4nsen f\xf6r fria analyser. Vidarebefordra resten till faktura@inbox.arvoflow.se \u2014 eller aktivera ert konto \u2014 s\xe5 forts\xe4tter vi."):s>0?W("En eller flera fakturor beh\xf6ver manuell granskning (t.ex. utl\xe4ndsk valuta eller l\xe5g l\xe4sbarhet). Vi tittar p\xe5 dem och \xe5terkommer \u2014 ladda g\xe4rna upp fler under tiden."):o&&W(o);try{await xe()}catch{}}const ye=e=>{const t=e.target.files;e.target.value="",ke(t)},je=e=>{var t;e.preventDefault(),G(!1),ke(null===(t=e.dataTransfer)||void 0===t?void 0:t.files)},we=e=>{e.preventDefault(),q||G(!0)},Se=()=>G(!1);const $e=(0,n.useCallback)(async(e,t)=>{if(t)if("application/pdf"===t.type){ee(t=>({...t,[e]:{phase:"work",msg:"L\xe4ser avtalet\u2026"}}));try{const r=await Gh(t),n=await fetch("/api/contract-upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:e,pdfBase64:r,email:fe||s||void 0})}),a=await n.json().catch(()=>({}));a.ok?(ee(t=>({...t,[e]:{phase:"done",msg:`L\xe4st \u2014 bindningen l\xf6per till ${a.clock.currentPeriodEnd}.`}})),await xe()):ee(t=>({...t,[e]:{phase:"fail",msg:a.reason||a.error||"Avtalet kunde inte l\xe4sas just nu."}}))}catch{ee(t=>({...t,[e]:{phase:"fail",msg:"Avtalet kunde inte l\xe4sas just nu \u2014 f\xf6rs\xf6k igen om en stund."}}))}}else ee(t=>({...t,[e]:{phase:"fail",msg:"Endast PDF st\xf6ds."}}))},[fe,s,xe]),Ne=(0,n.useCallback)(async(e,t)=>{ee(t=>({...t,[e]:{phase:"work",msg:"Registrerar\u2026"}}));try{const r=await fetch("/api/contract-status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:e,action:t})}),n=await r.json().catch(()=>({}));n.ok?(ee(t=>{const r={...t};return delete r[e],r}),await xe()):ee(t=>({...t,[e]:{phase:"fail",msg:n.reason||n.error||"Kunde inte registrera just nu."}}))}catch{ee(t=>({...t,[e]:{phase:"fail",msg:"Kunde inte registrera just nu \u2014 f\xf6rs\xf6k igen."}}))}},[xe]),Ee=(0,n.useCallback)(async()=>{try{await navigator.clipboard.writeText(Zh)}catch{}X(!0),setTimeout(()=>X(!1),2200)},[]);const _e=(0,n.useMemo)(()=>(null!==i&&void 0!==i?i:[]).filter(e=>"auto"===e.route||"monitoring"===e.route),[i]),ze=(0,n.useMemo)(()=>function(e){const t=new Map;for(const r of null!==e&&void 0!==e?e:[]){const e=`${Xf(r).trim().toLowerCase()}|${String(r.category||"").toLowerCase()}`,n=t.get(e);n?(n.count+=1,new Date(r.created_at)>new Date(n.latest.created_at)&&(n.latest=r)):t.set(e,{key:e,latest:r,count:1})}return[...t.values()].sort((e,t)=>{var r,n;return(null!==(r=t.latest.net_saving)&&void 0!==r?r:0)-(null!==(n=e.latest.net_saving)&&void 0!==n?n:0)})}(_e),[_e]),Ce=(0,n.useMemo)(()=>{const e=new Map;for(const t of null!==y&&void 0!==y?y:[]){e.has(t.kind)||e.set(t.kind,{kind:t.kind,headline:t.headline,detail:t.detail,action:t.action,suppliers:[]});const r=e.get(t.kind),n=t.invoiceNumber?`${t.supplier} (faktura ${t.invoiceNumber})`:t.supplier;r.suppliers.includes(n)||r.suppliers.push(n)}return[...e.values()]},[y]),Ae=(0,n.useMemo)(()=>eh({autoAnalyses:_e,watched:null!==y&&void 0!==y?y:[]}),[_e,y]),De=(0,n.useMemo)(()=>{var e;const t={high:0,medium:1,low:2};return null!==(e=(null!==_e&&void 0!==_e?_e:[]).map(e=>e.lead_finding_json).filter(e=>e&&"object"===typeof e&&e.title).sort((e,r)=>t[e.severity]-t[r.severity]||(r.annualImpact||0)-(e.annualImpact||0))[0])&&void 0!==e?e:null},[_e]),Fe=(0,n.useMemo)(()=>{var e;return null!==(e=(null!==i&&void 0!==i?i:[]).map(e=>e.contractClock).filter(e=>e&&"object"===typeof e&&e.title&&e.daysLeft>0).sort((e,t)=>e.daysLeft-t.daysLeft)[0])&&void 0!==e?e:null},[i]),Oe=(0,n.useMemo)(()=>{var e;return null!==(e=Object.values(null!==x&&void 0!==x?x:{}).filter(e=>e&&"object"===typeof e&&e.title).sort((e,t)=>{var r,n;return new Date(t.changedAt)-new Date(e.changedAt)||(null!==(r=t.withSupplier)&&void 0!==r?r:0)-(null!==(n=e.withSupplier)&&void 0!==n?n:0)})[0])&&void 0!==e?e:null},[x]),Te=(0,n.useMemo)(()=>{var e;const t={high:0,medium:1,low:2};return null!==(e=Object.values(null!==m&&void 0!==m?m:{}).filter(e=>e&&"object"===typeof e&&e.title&&e.category!==(null===Oe||void 0===Oe?void 0:Oe.category)).sort((e,r)=>{var n,a;return(null!==(n=t[e.confidence])&&void 0!==n?n:3)-(null!==(a=t[r.confidence])&&void 0!==a?a:3)})[0])&&void 0!==e?e:null},[m,Oe]),Pe=ze.reduce((e,t)=>{var r;return e+(null!==(r=t.latest.net_saving)&&void 0!==r?r:0)},0),Le=function(e){const t=e.filter(e=>null!=Zf(e.latest));if(!t.length)return null;let r=0,n=0;for(const a of t){const e=a.latest.annual_cost>0?a.latest.annual_cost:0;r+=e,n+=Zf(a.latest)*e}return 0===r?Math.round(t.reduce((e,t)=>e+Zf(t.latest),0)/t.length):Math.round(n/r)}(ze),Re=function(e){if(null==e)return{pointer:null,label:null,niva:null,satt:!1};const t=e>=67?"battre":e>=45?"i-niva":"samre";return{pointer:Math.max(4,Math.min(96,e)),label:"battre"===t?"B\xe4ttre \xe4n listpris":"i-niva"===t?"I niv\xe5 med listpris":"S\xe4mre \xe4n listpris",niva:t,satt:!0}}(Le),Ie=function(e){var t;if(!e)return null;const r=(null!==(t=e.split("@")[1])&&void 0!==t?t:"").toLowerCase();return!r||Jh.has(r)?null:r}(s),Be=ze.filter(e=>{var t;return e.latest.should_switch&&(null!==(t=e.latest.net_saving)&&void 0!==t?t:0)>0}),Me=(0,n.useMemo)(()=>{let e=null;for(const t of ze){const r=t.latest,n=d[`${r.normalized_supplier}|${r.category}`],a=(null===n||void 0===n?void 0:n.supplierMedian)||(null===n||void 0===n?void 0:n.supplierAvgCost);if(!n||!a||!r.annual_cost)continue;const i=Math.round((r.annual_cost-a)/a*100),o={supplier:Xf(r),cost:r.annual_cost,median:a,p25:n.supplierP25,n:n.supplierDataPoints,pct:i};(!e||i>e.pct)&&(e=o)}return e},[ze,d]),Ve=(0,n.useMemo)(()=>{if(Me)return null;for(const r of ze){var e;const n=r.latest,a=u[n.category];if(a&&a.n>=3&&null!==(e=a.observations)&&void 0!==e&&e.length){var t;const e="eurostat"===(null===(t=a.observations[0])||void 0===t?void 0:t.source),r=e&&"supplier"===a.scope&&n.price_per_seat_monthly>0?n.price_per_seat_monthly:null,i=r?Math.round((r-a.median)/a.median*100):null;return{...a,category:n.category,supplier:Xf(n),customerUnit:r,pct:i,isPeer:e}}}return null},[Me,ze,u]),Ue=(0,n.useMemo)(()=>{if(Me||Ve)return null;let e=null;for(const r of ze){var t;const n=h[r.latest.category];if(!n||!(n.median>0))continue;const a=null!==(t=n.customerCost)&&void 0!==t?t:0;(!e||a>e._material)&&(e={...n,_material:a})}return e},[Me,Ve,ze,h]),Ke=(0,n.useMemo)(()=>ze.filter(e=>"annual"===e.latest.billing_period&&e.latest.created_at).map(e=>{const t=e.latest,r=new Date(t.created_at);return r.setMonth(r.getMonth()+12),{id:t.id,supplier:Xf(t),when:r,cost:t.annual_cost}}).sort((e,t)=>e.when-t.when),[ze]),He=ze.length?tg(ze.map(e=>e.latest.created_at).sort().reverse()[0]):"",We=(new Date).toLocaleDateString("sv-SE",{day:"numeric",month:"short",year:"numeric"}).toUpperCase(),qe=function(e){return e>=5&&e<10?"God morgon":e>=10&&e<12?"God f\xf6rmiddag":e>=12&&e<17?"God eftermiddag":"God kv\xe4ll"}((new Date).getHours()),{hasSwitchAction:Ge,hasFindingAction:Ye,acting:Je}=function(e){var t;let{switchablesCount:r,roomFinding:n}=e;const a=(null!==r&&void 0!==r?r:0)>0,i=!!(n&&(null!==(t=n.annualImpact)&&void 0!==t?t:0)>0);return{hasSwitchAction:a,hasFindingAction:i,acting:a||i}}({switchablesCount:Be.length,roomFinding:De}),Qe=(0,n.useMemo)(()=>{const e=[];if(e.push({tag:"Bevakar",what:null!==w&&void 0!==w&&w.sweptAt?(0,$c.jsxs)($c.Fragment,{children:[w.streakNights>=2?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("b",{children:[w.streakNights," n\xe4tter i rad"]})," utan ett avbrott i bevakningen. "]}):(0,$c.jsx)($c.Fragment,{children:"Bevakningen gick igenom i natt. "}),w.allClear?"Inget av det marknaden gjorde r\xf6rde era priser \u2014 det tysta beskedet \xe4r ocks\xe5 ett besked.":Oe?"Nattens svep \xe4r avl\xe4st \u2014 det som ber\xf6r er st\xe5r som ett eget kort h\xe4r ovan.":"Nattens svep \xe4r avl\xe4st. Ingenting i det kr\xe4vde er uppm\xe4rksamhet."]}):(0,$c.jsx)($c.Fragment,{children:"Er bevakning \xe4r aktiv. Nattens svep visas h\xe4r s\xe5 snart k\xf6rningen rapporterat \u2014 vi redovisar antalet k\xe4llor f\xf6rst n\xe4r vi har det, aldrig en ungef\xe4rlig siffra."})}),_e.length>0){const r=eh({autoAnalyses:_e,watched:null!==y&&void 0!==y?y:[]}).prissatta;e.push({tag:"Analys",what:(0,$c.jsxs)($c.Fragment,{children:["V\xe4gde ",(0,$c.jsxs)("b",{children:[r," ",$u(r,"faktura","fakturor")]})," mot verifierat publikt listpris",He?(0,$c.jsxs)($c.Fragment,{children:[" \xb7 senast ",He]}):null,(t=He,String(null!==t&&void 0!==t?t:"").trim().endsWith(".")?"":".")]})})}var t;return Me&&e.push({tag:"Kohort",what:(0,$c.jsxs)($c.Fragment,{children:["J\xe4mf\xf6rde era priser mot ",(0,$c.jsxs)("b",{children:[Me.n," bolag"]})," hos ",Me.supplier," via n\xe4tverket \u2014 sanningen ingen j\xe4mf\xf6relsesajt kan ge."]})}),Oe&&e.push({tag:"R\xf6relse",what:(0,$c.jsxs)($c.Fragment,{children:["F\xe5ngade en marknadsr\xf6relse: ",(0,$c.jsx)("b",{children:Oe.title})," \u2014 ",Oe.withSupplier," av ",Oe.total," bolag vi f\xf6ljer ber\xf6rs."]})}),Te&&e.push({tag:"Prognos",what:(0,$c.jsxs)($c.Fragment,{children:["K\xf6ade ett motdrag inf\xf6r en trolig h\xf6jning: ",(0,$c.jsx)("b",{children:Te.title}),"."]})}),Fe&&e.push({tag:"Klocka",what:(0,$c.jsxs)($c.Fragment,{children:["Bevakar avtalsklockan \u2014 ",(0,$c.jsxs)("b",{children:[Fe.daysLeft," dagar"]})," kvar p\xe5 bindningen, agerar i f\xf6nstret."]})}),e},[ze.length,_e.length,He,w,Me,Oe,Te,Fe]),Xe=Je?Ge?"battre"===Re.niva?(0,$c.jsxs)($c.Fragment,{children:["Sammantaget st\xe5r ni ",(0,$c.jsx)("em",{children:"starkt"})," \u2014 men ",Be.length," avtal kostar mer \xe4n de borde."]}):"i-niva"===Re.niva?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("em",{children:"i niv\xe5"})," med verifierat listpris \u2014 ",Be.length," avtal kan sk\xe4rpas."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsx)("em",{children:"mer \xe4n listpris"})," \u2014 ",Be.length," avtal drar mest."]}):(0,$c.jsxs)($c.Fragment,{children:["Era avtal st\xe5r sig \u2014 men vi f\xe5ngade ",(0,$c.jsxs)("em",{children:[eg(De.annualImpact)," kr/\xe5r"]})," v\xe4rt att \xe5tg\xe4rda."]}):Re.satt?"battre"===Re.niva?(0,$c.jsxs)($c.Fragment,{children:["H\xe5ll kursen. Era priser ",(0,$c.jsx)("em",{children:"st\xe5r sig mot verifierat listpris."})]}):"i-niva"===Re.niva?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("em",{children:"i niv\xe5 med verifierat listpris"})," \u2014 inget byte att l\xe4gga fram i dag."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsx)("em",{children:"mer \xe4n verifierat listpris"})," \u2014 men inget avtal b\xe4r ett byte vi kan bel\xe4gga i dag."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi vaktar era avtal \u2014 men ",(0,$c.jsx)("em",{children:"er position mot listpris kunde inte m\xe4tas"})," i dag."]}),Ze=Je?Ge?(0,$c.jsxs)($c.Fragment,{children:["Vi j\xe4mf\xf6rde ",(0,$c.jsxs)("b",{children:[Ae.prissatta," ",$u(Ae.prissatta,"faktura","fakturor")]})," mot verifierat publikt listpris.",(0,$c.jsxs)("b",{children:[" ",eg(Pe)," kr/\xe5r"]})," i m\xf6jlig nettobesparing ligger p\xe5 bordet \u2014 det st\xf6rsta bytet tar tv\xe5 minuter att signera. \xd6vriga avtal har vi inget byte att l\xe4gga fram f\xf6r i dag."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi j\xe4mf\xf6rde ",(0,$c.jsxs)("b",{children:[Ae.prissatta," ",$u(Ae.prissatta,"faktura","fakturor")]})," mot verifierat publikt listpris \u2014 priserna st\xe5r sig. Men i underlaget vi kunde l\xe4sa f\xe5ngade vi en kostnad v\xe4rd ",(0,$c.jsxs)("b",{children:[eg(De.annualImpact)," kr/\xe5r"]})," \u2014 se vad domen bygger p\xe5 i fyndet ovan."]}):Re.satt&&"samre"===Re.niva?(0,$c.jsxs)($c.Fragment,{children:["Vi j\xe4mf\xf6rde ",(0,$c.jsxs)("b",{children:[Ae.prissatta," ",$u(Ae.prissatta,"faktura","fakturor")]})," mot verifierat publikt listpris. Ni ligger \xf6ver golvet, men vi har inget bytesm\xe5l vi kan bel\xe4gga \u2014 och vi l\xe4gger aldrig fram en besparing vi inte kan r\xe4kna hem. Vi bevakar och h\xf6r av oss s\xe5 snart ett m\xe5l g\xe5r att styrka."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi j\xe4mf\xf6rde ",(0,$c.jsxs)("b",{children:[Ae.prissatta," ",$u(Ae.prissatta,"faktura","fakturor")]})," mot verifierat publikt listpris. Inget byte rekommenderas i dag. Vi h\xf6r av oss om l\xe4get f\xf6r\xe4ndras \u2014 ni beh\xf6ver inte g\xf6ra n\xe5got."]});return(0,$c.jsx)(ch,{children:(0,$c.jsxs)(uh,{children:[(0,$c.jsx)(nh,{email:fe,onLogout:be}),A>0&&(0,$c.jsxs)("div",{style:{border:"1px solid rgba(157,184,175,0.22)",borderRadius:12,background:"rgba(157,184,175,0.05)",padding:"14px 18px",margin:"0 0 18px",color:"rgba(236,244,241,0.80)",fontSize:13,lineHeight:1.6},children:[(0,$c.jsxs)("strong",{style:{color:"#EAF2EF"},children:[A," ",1===A?"analys":"analyser"," till finns p\xe5 den h\xe4r datorn"]})," ","\u2014 de h\xf6r inte till ",null!==s&&void 0!==s?s:"ert konto"," och visas d\xe4rf\xf6r inte h\xe4r. Rummet visar det ni delat med oss, inget annat."]}),E>0&&(0,$c.jsxs)("div",{style:{border:"1px solid rgba(245,180,90,0.45)",borderRadius:12,background:"rgba(245,180,90,0.07)",padding:"16px 18px",margin:"0 0 18px",color:"#E8C9A0",fontSize:13.5,lineHeight:1.55},children:[(0,$c.jsxs)("strong",{style:{color:"#F5B45A"},children:[E," ",1===E?"faktura kunde":"fakturor kunde"," inte l\xe4sas in."]})," ","Oftast ett tillf\xe4lligt fel (ett tekniskt avbrott) \u2014 s\xe4llan att filen inte var en l\xe4sbar faktura.",z.length>0&&(0,$c.jsx)("ul",{style:{margin:"10px 0 0",paddingLeft:18},children:z.map((e,t)=>(0,$c.jsx)("li",{style:{fontFamily:"monospace",fontSize:12.5,color:"#D9B98A",marginBottom:2},children:e},t))}),(0,$c.jsxs)("div",{style:{marginTop:12,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"},children:[(0,$c.jsx)("button",{onClick:ve,disabled:F,style:{cursor:F?"default":"pointer",border:"1px solid #F5B45A",background:"transparent",color:"#F5B45A",borderRadius:100,padding:"9px 20px",fontSize:13,fontWeight:600,opacity:F?.6:1},children:F?"K\xf6r om\u2026":`F\xf6rs\xf6k igen \u2014 Arvo k\xf6r om ${1===E?"den":"dem"} \xe5t er`}),(0,$c.jsx)("span",{style:{fontSize:12,color:"#B89B72"},children:"Inget nytt mejl beh\xf6vs."})]})]}),null===i&&!T&&(0,$c.jsx)(Rh,{}),T&&(0,$c.jsx)(hh,{children:(0,$c.jsx)("h2",{style:{fontSize:26},children:"Kunde inte ladda ert kontor \u2014 f\xf6rs\xf6k igen om en stund."})}),null!==i&&ze.length>0&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(ph,{children:[(0,$c.jsxs)(mh,{children:[(0,$c.jsx)("div",{className:"brand",children:"ARVO-KONTORET"}),(0,$c.jsxs)("div",{className:"confidential",children:["Konfidentiellt \xb7 ",null!==Ie&&void 0!==Ie?Ie:"Ert konto"," \xb7 ",We,Y?" \xb7 TESTKONTO (?reset=off f\xf6r skarpt)":""]}),(0,$c.jsxs)("h1",{children:[qe,".",(0,$c.jsx)("br",{}),Je?"Ett par drag v\xe4ntar p\xe5 er.":Re.satt&&"samre"===Re.niva?"Vi vaktar era avtal.":"Allt \xe4r under kontroll."]})]}),(0,$c.jsxs)(fh,{children:[(0,$c.jsxs)("div",{className:"radar-head",children:[(0,$c.jsxs)("div",{className:"disc",children:[(0,$c.jsxs)("svg",{width:"118",height:"118",viewBox:"0 0 118 118",children:[(0,$c.jsx)("circle",{cx:"59",cy:"59",r:"56",fill:"none",stroke:"rgba(93,214,202,.16)",strokeWidth:"1"}),(0,$c.jsx)("circle",{cx:"59",cy:"59",r:"38",fill:"none",stroke:"rgba(93,214,202,.11)",strokeWidth:"1"}),(0,$c.jsx)("circle",{cx:"59",cy:"59",r:"20",fill:"none",stroke:"rgba(93,214,202,.08)",strokeWidth:"1"})]}),(0,$c.jsx)("div",{className:"sweep"}),(0,$c.jsxs)("div",{className:"dial-center",children:[(0,$c.jsx)("span",{className:"dial-time",children:null!==w&&void 0!==w&&w.sweptAt?new Date(w.sweptAt).toLocaleTimeString("sv-SE",{hour:"2-digit",minute:"2-digit"}):"\xb7 \xb7 \xb7"}),(0,$c.jsx)("span",{className:"dial-k",children:null!==w&&void 0!==w&&w.sweptAt?"senaste svep":"bevakning aktiv"})]})]}),(0,$c.jsxs)("div",{className:"radar-title",children:[(0,$c.jsx)("strong",{children:"Vakten"}),"bevakar era avtal"]})]}),(0,$c.jsxs)("div",{className:"radar-stats",children:[(0,$c.jsx)("div",{className:"rgroup-label",children:"Ert underlag"}),Ae.bevakade>0&&(0,$c.jsxs)("div",{className:"rstat",children:[(0,$c.jsx)("span",{children:"Fakturor"}),(0,$c.jsx)("span",{className:"v",children:Ae.fakturor})]}),(0,$c.jsxs)("div",{className:"rstat",children:[(0,$c.jsx)("span",{children:Ae.bevakade>0||Ae.mottagna>0?"Prissatta":"Fakturor"}),(0,$c.jsx)("span",{className:"v",children:Ae.prissatta})]}),Ae.bevakade>0&&(0,$c.jsxs)("div",{className:"rstat",children:[(0,$c.jsx)("span",{children:"Bevakade"}),(0,$c.jsx)("span",{className:"v",children:Ae.bevakade})]})]}),(0,$c.jsxs)("div",{className:"radar-foot",children:[(0,$c.jsx)("div",{className:"rgroup-label",children:"Marknaden"}),(0,$c.jsxs)("div",{className:"foot-line",children:[(0,$c.jsx)("span",{className:"live"}),(0,$c.jsx)("span",{children:null!==w&&void 0!==w&&w.sweptAt?(0,$c.jsxs)($c.Fragment,{children:[w.sources?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("b",{children:[w.sources," marknadsk\xe4llor"]})," svepta"]}):(0,$c.jsx)($c.Fragment,{children:"Marknaden svept"}),w.allClear?" \xb7 allt lugnt":""]}):He?(0,$c.jsxs)($c.Fragment,{children:["Senaste analys ",He," \xb7 bevakning aktiv"]}):"Bevakning aktiv"})]})]})]})]}),(0,$c.jsx)(Om,{finding:De,variant:"dossier"}),(0,$c.jsx)(Om,{finding:Oe,variant:"dossier",eyebrow:"Marknadsr\xf6relsen \xb7 n\xe4tverket"}),(0,$c.jsx)(Om,{finding:Fe,variant:"dossier",eyebrow:"Maktkalendern \xb7 avtalsbevakning"}),(0,$c.jsx)(Om,{finding:Te,variant:"dossier",eyebrow:"Maktkalendern \xb7 prognos"}),(0,$c.jsxs)(hh,{children:[(0,$c.jsx)("div",{className:"eyebrow",children:"Arvo bed\xf6mer"}),(0,$c.jsx)("h2",{children:Xe}),(0,$c.jsx)("p",{className:"work",children:Ze}),(0,$c.jsx)(gh,{children:Je&&!Ge?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("span",{className:"pct",children:"Ur er egen faktura"})," \xb7 talet st\xe5r p\xe5 raden i fyndet ovan \xb7 inget marknadspris inblandat"]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("span",{className:"pct",children:"Verifierat"})," \xb7 grundat p\xe5 ",Ae.prissatta," ",$u(Ae.prissatta,"prissatt faktura","prissatta fakturor")," \xb7 publika listpriser"]})})]}),(0,$c.jsxs)(xh,{children:[(0,$c.jsxs)(yh,{children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Arvo Score"}),(0,$c.jsx)("span",{className:"src",children:Ae.bevakade>0?`${Ae.prissatta} av ${Ae.fakturor} fakturor prissatta`:"mot verifierat listpris"})]}),(0,$c.jsxs)("div",{className:"idx-main",children:[(0,$c.jsx)("span",{className:"idx-num",children:null!==Le&&void 0!==Le?Le:"\u2014"}),null!=Le&&(0,$c.jsx)("span",{className:"idx-denom",children:"/100"})]}),(0,$c.jsx)("div",{className:"mkt-k",children:Re.satt?"Marknadsl\xe4ge":"Marknadsl\xe4ge \xb7 inte satt"}),Re.satt&&(0,$c.jsx)("div",{className:"mkt-track",children:(0,$c.jsx)("span",{className:"mkt-ptr",style:{left:`${Re.pointer}%`}})}),Re.satt&&(0,$c.jsxs)("div",{className:"mkt-scale",children:[(0,$c.jsx)("span",{className:"samre"===Re.niva?"on":"",children:"S\xe4mre"}),(0,$c.jsx)("span",{className:"i-niva"===Re.niva?"on":"",children:"I niv\xe5"}),(0,$c.jsx)("span",{className:"battre"===Re.niva?"on":"",children:"B\xe4ttre"})]}),(0,$c.jsx)("p",{className:"idx-note",children:Re.satt?Be.length>0?(0,$c.jsxs)($c.Fragment,{children:["Sammanv\xe4gt ",Le>=67?"starkt":Le>=45?"godk\xe4nt":"svagt"," \u2014 men ",(0,$c.jsxs)("b",{children:[Be.length," avtal kostar mer \xe4n verifierat listpris"]}),". De ligger f\xf6rberedda i innehavet nedan."]}):"battre"===Re.niva?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("b",{children:"b\xe4ttre \xe4n verifierat listpris"}),". Inget enskilt avtal sticker ut i dag."]}):"i-niva"===Re.niva?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("b",{children:"i niv\xe5 med verifierat listpris"}),". Inget enskilt avtal sticker ut i dag."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsx)("b",{children:"\xf6ver verifierat listpris"})," \u2014 men inget enskilt avtal b\xe4r ett byte vi kan bel\xe4gga i dag."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi har inget verifierat j\xe4mf\xf6relsepris f\xf6r era kategorier \xe4nnu, s\xe5 vi s\xe4tter ingen po\xe4ng.",(0,$c.jsx)("b",{children:" Ett tal utan m\xe4tning \xe4r v\xe4rre \xe4n inget tal."})," S\xe5 snart en av era kategorier f\xe5r ett verifierat pris r\xe4knas det fram \u2014 och ni ser exakt hur."]})})]}),(0,$c.jsxs)(Sh,{children:[(0,$c.jsx)("div",{className:"tally-k",children:Ge?"M\xf6jlig nettobesparing":Je?"F\xe5ngad kostnad":"Avtal under bevakning"}),(0,$c.jsx)("div",{className:"tally-num",children:Ge?(0,$c.jsxs)($c.Fragment,{children:[eg(Pe)," kr",(0,$c.jsx)("small",{children:"per \xe5r"})]}):Je?(0,$c.jsxs)($c.Fragment,{children:[eg(De.annualImpact)," kr",(0,$c.jsx)("small",{children:"per \xe5r"})]}):(0,$c.jsxs)($c.Fragment,{children:[ze.length,(0,$c.jsx)("small",{children:(ze.length,"avtal")})]})}),(0,$c.jsx)("div",{className:"tally-sub",children:Ge?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("b",{children:[Be.length," byte",Be.length>1?"n":""," f\xf6rberedda"]})," \xb7 netto efter Arvos arvode (20% av f\xf6rsta \xe5rets besparing). Fr\xe5n \xe5r tv\xe5 \xe4r hela besparingen er."]}):Je?(0,$c.jsx)($c.Fragment,{children:"Inget leverant\xf6rsbyte kr\xe4vs \u2014 kostnaden \xe5tg\xe4rdas direkt mot fakturan. Se fyndet ovan."}):Re.satt&&"samre"===Re.niva?(0,$c.jsx)($c.Fragment,{children:"Ni ligger \xf6ver verifierat listpris, men inget av avtalen b\xe4r ett byte vi kan bel\xe4gga. Vi vaktar dem tills ett m\xe5l g\xe5r att styrka."}):(0,$c.jsx)($c.Fragment,{children:"Era priser st\xe5r sig \u2014 inga byten p\xe5 bordet just nu. Lugnet att ni ligger r\xe4tt \xe4r ocks\xe5 en leverans."})})]})]}),(0,$c.jsxs)(wh,{children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Vaktens kvitton"}),(0,$c.jsx)("span",{className:"src",children:"medan ni drev bolaget"})]}),Qe.map((e,t)=>(0,$c.jsxs)("div",{className:"rcpt",children:[(0,$c.jsx)("span",{className:"day",children:e.tag}),(0,$c.jsx)("span",{className:"what",children:e.what})]},t))]}),(Me||Ve||Ue||Ke.length>0)&&(0,$c.jsxs)(xh,{children:[Ve&&(0,$c.jsxs)(kh,{$full:0===Ke.length,children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:Ve.isPeer?"Den kollektiva sanningen":"Golv-referens"}),(0,$c.jsxs)("span",{className:"src",children:[Ve.isPeer?"svenska f\xf6retag":"offentlig sektor"," \xb7 ",Ve.n," pris",Ve.n>1?"punkter":"punkt"]})]}),(0,$c.jsx)("h3",{children:(e=>{const t=((null===(e=zm(Ve.category))||void 0===e?void 0:e.label)||Ve.category).toLowerCase(),r=ng[Ve.unit]||"";return Ve.isPeer?Ve.customerUnit&&Ve.pct>=8?(0,$c.jsxs)($c.Fragment,{children:["Svenska f\xf6retag betalar ",ig(Ve.median)," ",r," f\xf6r ",t,". Ni betalar ",(0,$c.jsxs)("em",{children:[Ve.pct,"% mer."]})]}):Ve.customerUnit&&Ve.pct<=-8?(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsxs)("em",{children:[Math.abs(Ve.pct),"% mindre"]})," \xe4n svenska f\xf6retag f\xf6r ",t,"."]}):Ve.customerUnit?(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsx)("em",{children:"i niv\xe5"})," med svenska f\xf6retag f\xf6r ",t,"."]}):(0,$c.jsxs)($c.Fragment,{children:["Svenska f\xf6retag betalar ",(0,$c.jsxs)("em",{children:[ig(Ve.min),"\u2013",ig(Ve.max)," ",r]})," f\xf6r ",t,"."]}):(0,$c.jsxs)($c.Fragment,{children:["Offentlig sektor pressar samma ",t," till ",(0,$c.jsxs)("em",{children:[ig(Ve.min),"\u2013",ig(Ve.max)," ",r]}),". Beviset att priset \xe4r ",(0,$c.jsx)("em",{children:"f\xf6rhandlingsbart."})]})})()}),(()=>{const e=[...Ve.customerUnit?[{lbl:"Ni betalar",amt:Ve.customerUnit,you:!0}]:[],...(Ve.observations||[]).map(e=>({lbl:e.product||e.buyer,amt:e.unitPrice,you:!1}))];if(!e.length)return null;const t=Math.max(...e.map(e=>e.amt))||1;return(0,$c.jsx)("div",{className:"bars",children:e.map((e,r)=>(0,$c.jsxs)("div",{className:"barrow"+(e.you?" you":""),children:[(0,$c.jsx)("span",{className:"lbl",children:e.lbl}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${Math.max(8,e.amt/t*100)}%`}})}),(0,$c.jsx)("span",{className:"amt",children:ig(e.amt)})]},r))})})(),(0,$c.jsxs)("p",{className:"truth-note",children:["Verkliga priser ur ",(0,$c.jsx)("b",{children:"\xf6ppen data"})," \u2014 ",ag[null===(e=Ve.observations)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.source]||"offentliga avtal",null!==(r=Ve.observations)&&void 0!==r&&null!==(a=r[0])&&void 0!==a&&a.buyer?`, ${Ve.observations[0].buyer}`:"",".",Ve.isPeer?Ve.customerUnit?" J\xe4mf\xf6rt per enhet mot er faktura.":"":" Golvet \u2014 inte ett m\xe5l ni n\xe5r i er storlek, men beviset att listpriset \xe4r f\xf6rhandlingsbart."]})]}),Me&&(0,$c.jsxs)(kh,{$full:0===Ke.length,children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Den kollektiva sanningen"}),(0,$c.jsxs)("span",{className:"src",children:[Me.n," bolag \xb7 live"]})]}),(0,$c.jsx)("h3",{children:Me.pct>=8?(0,$c.jsxs)($c.Fragment,{children:[Me.n," bolag hos ",Me.supplier," betalar i snitt ",eg(Me.median)," kr. Ni betalar ",(0,$c.jsxs)("em",{children:[Me.pct,"% mer."]})]}):Me.pct<=-8?(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsxs)("em",{children:[Math.abs(Me.pct),"% mindre"]})," \xe4n snittet hos ",Me.supplier," \u2014 ",Me.n," bolag j\xe4mf\xf6rda."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsx)("em",{children:"i niv\xe5"})," med vad ",Me.n," bolag betalar hos ",Me.supplier,"."]})}),(()=>{const e=Math.max(Me.cost,Me.median,Me.p25||0)||1,t=[{lbl:"Ni betalar",amt:Me.cost,you:!0},{lbl:`Snitt \xb7 ${Me.n} bolag`,amt:Me.median,you:!1},...Me.p25?[{lbl:"L\xe4gst 25 %",amt:Me.p25,you:!1}]:[]];return(0,$c.jsx)("div",{className:"bars",children:t.map(t=>(0,$c.jsxs)("div",{className:"barrow"+(t.you?" you":""),children:[(0,$c.jsx)("span",{className:"lbl",children:t.lbl}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${Math.max(8,t.amt/e*100)}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[eg(t.amt)," kr"]})]},t.lbl))})})(),(0,$c.jsxs)("p",{className:"truth-note",children:["Den h\xe4r raden kr\xe4ver att man ser ",(0,$c.jsx)("b",{children:"m\xe5nga bolags faktiska fakturor samtidigt"}),". Ingen j\xe4mf\xf6relsesajt och ingen konsult kan ge den \u2014 bara Arvo, tack vare n\xe4tverket."]})]}),Ue&&(()=>{const e=zm(Ue.category),t=(null===e||void 0===e?void 0:e.inlineLabel)||((null===e||void 0===e?void 0:e.label)||Ue.category).toLowerCase(),r=Ue.seats,n=Ue.customerCost,a=null!=(r>0?Ue.median*r:null)&&n>0,i=a?Math.round(n/r):null,o=a&&i>Ue.median;return(0,$c.jsxs)(kh,{$full:0===Ke.length,children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Marknadsankaret"}),(0,$c.jsx)("span",{className:"src",children:Ue.lastVerified?(0,$c.jsxs)($c.Fragment,{children:["verifierat ",tg(Ue.lastVerified)]}):"publikt listpris"})]}),a?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("h3",{children:o?(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsxs)("em",{children:[eg(i)," kr"]})," ",Ue.unitLabel," f\xf6r ",t," \u2014 ",(0,$c.jsx)("em",{children:"mer \xe4n leverant\xf6rens eget listpris"})," p\xe5 ",eg(Ue.median)," kr."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni betalar ",(0,$c.jsxs)("em",{children:[eg(i)," kr"]})," ",Ue.unitLabel," f\xf6r ",t,". Leverant\xf6rens publika listpris \xe4r ",(0,$c.jsxs)("em",{children:[eg(Ue.median)," kr"]}),"."]})}),(()=>{const e=Math.max(i,Ue.median)||1,t=[{lbl:"Ni betalar",amt:i,you:!0},{lbl:"Publikt listpris",amt:Ue.median,you:!1}];return(0,$c.jsx)("div",{className:"bars",children:t.map(t=>(0,$c.jsxs)("div",{className:"barrow"+(t.you?" you":""),children:[(0,$c.jsx)("span",{className:"lbl",children:t.lbl}),(0,$c.jsx)("span",{className:"track",children:(0,$c.jsx)("span",{className:"fill",style:{width:`${Math.max(8,t.amt/e*100)}%`}})}),(0,$c.jsxs)("span",{className:"amt",children:[eg(t.amt)," kr"]})]},t.lbl))})})(),(0,$c.jsxs)("p",{className:"truth-note",children:["Ert pris \xe4r r\xe4knat p\xe5 era ",r," ",1===r?Ue.unitNoun:Ue.unitNounPl," ","(",eg(n)," kr/\xe5r) mot ",Ue.lastVerified?(0,$c.jsxs)($c.Fragment,{children:["leverant\xf6rens publika listpris, senast kontrollerat av oss ",(0,$c.jsx)("b",{children:tg(Ue.lastVerified)})]}):(0,$c.jsx)($c.Fragment,{children:"leverant\xf6rens publika listpris"}),"."," ",o?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("b",{children:"De flesta f\xf6retag ligger under listpris"})," \u2014 ni ligger \xf6ver. Det \xe4r ovanligt nog att alltid vara v\xe4rt en fr\xe5ga till leverant\xf6ren: vilken rabatt g\xe4ller f\xf6r er volym?"]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("b",{children:"N\xe4stan alla f\xf6retag ligger under listpris"}),", s\xe5 avst\xe5ndet hit s\xe4ger inte att ni f\xf6rhandlat v\xe4l \u2014 bara att ni f\xf6rhandlat."]})," ","Svaret p\xe5 om ni betalar r\xe4tt kommer n\xe4r fler bolag i er bransch delar sina fakturor \u2014 d\xe5 byts det h\xe4r kortet mot ",(0,$c.jsx)("b",{children:"vad de faktiskt betalar"}),"."]})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("h3",{children:["Leverant\xf6rernas publika listpris f\xf6r ",t," \xe4r ",(0,$c.jsxs)("em",{children:[eg(Ue.median)," kr"]})," ",Ue.unitLabel,"."]}),n>0&&(0,$c.jsxs)("p",{className:"truth-note",style:{borderTop:"none",paddingTop:0,marginTop:4},children:["Er kostnad i dag: ",(0,$c.jsxs)("b",{children:[eg(n)," kr/\xe5r"]}),"."]}),(0,$c.jsxs)("p",{className:"truth-note",children:["Verifierat publikt listpris ",Ue.unitLabel," \u2014 ett ankare, inte er exakta position (den st\xe5r i innehavet nedan). N\xe4stan alla f\xf6retag ligger under listpris, s\xe5 ankaret \xe4r ett tak att m\xe4ta mot, inte ett facit. Facit kommer n\xe4r fler bolag i er bransch delar sina fakturor."]})]})]})})(),Ke.length>0&&(0,$c.jsxs)(jh,{$full:!Me&&!Ve&&!Ue,children:[(0,$c.jsxs)("div",{className:"card-eyebrow",children:[(0,$c.jsx)("span",{children:"Maktkalendern \xb7 era \xe5rsavtal"}),(0,$c.jsx)("span",{className:"src",children:"uppskattat"})]}),Ke.map(e=>(0,$c.jsxs)("div",{className:"cal-row",children:[(0,$c.jsx)("span",{className:"cal-prob",children:(0,$c.jsx)(yp,{name:"calendar-clock",size:18,stroke:1.8})}),(0,$c.jsxs)("div",{className:"cal-body",children:[(0,$c.jsx)("div",{className:"t",children:e.supplier}),(0,$c.jsxs)("div",{className:"s",children:["\xc5rsavtal \u2014 bytesl\xe4get \xe5terkommer \xe5rligen. ",eg(e.cost)," kr/\xe5r."]})]}),(0,$c.jsxs)("span",{className:"cal-when",children:["~ ",rg(e.when)]})]},e.id))]})]}),(0,$c.jsxs)($h,{children:[(0,$c.jsxs)("div",{className:"h-eyebrow",children:["Innehavet \xb7 ",Ae.prissatta," ",$u(Ae.prissatta,"prissatt","prissatta"),Ae.mottagna>0?` \xb7 ${Ae.mottagna} ${$u(Ae.mottagna,"mottagen","mottagna")}, inte ${$u(Ae.mottagna,"prissatt","prissatta")}`:` ${$u(Ae.prissatta,"leverant\xf6r","leverant\xf6rer")}`]}),ze.map(e=>{var t,r,n,a;const i=e.latest,o=zm(i.category),l=Zf(i),d=og(l),c=L.has(i.id),u=i.should_switch&&(null!==(t=i.net_saving)&&void 0!==t?t:0)>0;return(0,$c.jsxs)(Eh,{$saving:u,children:[(0,$c.jsxs)(_h,{$open:c,onClick:()=>{return e=i.id,void R(t=>{const r=new Set(t);return r.has(e)?r.delete(e):r.add(e),r});var e},"aria-expanded":c,children:[(0,$c.jsxs)(zh,{children:[(0,$c.jsx)(lg,{score:l}),(0,$c.jsx)("span",{className:"v",style:{color:d},children:null!==l&&void 0!==l?l:"\u2014"})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{className:"h-name",children:Xf(i)}),(0,$c.jsxs)("div",{className:"h-cat",children:[o.label," \xb7 ",tg(i.created_at),i.invoice_number?` \xb7 faktura ${i.invoice_number}`:"",e.count>1?` \xb7 ${e.count} analyser`:""]})]}),(0,$c.jsx)("div",{className:"h-cost",children:null!=i.annual_cost?`${eg(i.annual_cost)} kr/\xe5r`:""}),(e=>{const t=!0===(null===(e=i.prisunderlag)||void 0===e?void 0:e.ovissNiva),r=i.prisunderlag&&!t&&!i.prisunderlag.underGolv&&i.prisunderlag.avstandPct>15,n=u?`+${eg(i.net_saving)} kr/\xe5r`:"monitoring"===i.route?"Avtalsbevakad":r?`${i.prisunderlag.avstandPct} % \xf6ver l\xe4gsta pris`:t?"Niv\xe5 ej bekr\xe4ftad":i.prisunderlag?"R\xe4tt prissatt":"Mottagen";return(0,$c.jsx)("div",{className:"h-badge "+(u?"save":r?"over":"watch"),children:n})})(),(0,$c.jsx)("span",{className:"h-chev",children:(0,$c.jsx)(yp,{name:"chevron-down",size:16,stroke:2})})]}),c&&(0,$c.jsxs)(Ch,{children:[(0,$c.jsx)("div",{className:"diag",children:(0,$c.jsxs)("div",{className:"dbody",children:[(0,$c.jsx)("div",{className:"dtop",children:"Arvo bed\xf6mer"}),(0,$c.jsx)("div",{className:"dtxt",dangerouslySetInnerHTML:{__html:th(i)}})]})}),i.prisunderlag&&(()=>{const e=i.prisunderlag;return(0,$c.jsxs)(qh,{"data-underlag":!0,children:[(0,$c.jsx)("div",{className:"u-k",children:"S\xe5 landade vi i talet"}),(0,$c.jsxs)("div",{className:"u-rad",children:[(0,$c.jsx)("span",{className:"u-txt",children:"Ni betalar"}),(0,$c.jsx)("span",{className:"u-spec",children:e.unitLabel}),(0,$c.jsxs)("span",{className:"u-bel",children:[eg(e.perEnhet)," kr"]})]}),(0,$c.jsxs)("div",{className:"u-rad",children:[(0,$c.jsxs)("span",{className:"u-txt",children:[e.nivaBekraftad?"Listpris f\xf6r er niv\xe5":"Billigaste publicerade pris",e.referensProdukt?(0,$c.jsx)("em",{className:"u-prod",children:e.referensProdukt}):null]}),(0,$c.jsx)("span",{className:"u-spec",children:e.lastVerified?`verifierat ${tg(e.lastVerified)}`:"publikt listpris"}),(0,$c.jsxs)("span",{className:"u-bel",children:[eg(e.golv)," kr"]})]}),e.median>0&&e.median!==e.golv&&(0,$c.jsxs)("div",{className:"u-rad",children:[(0,$c.jsx)("span",{className:"u-txt",children:"Samma licens utan bindning"}),(0,$c.jsx)("span",{className:"u-spec",children:"samma k\xe4lla"}),(0,$c.jsxs)("span",{className:"u-bel",children:[eg(e.median)," kr"]})]}),(0,$c.jsx)("div",{className:"u-slut"+(e.underGolv?" bra":""),children:e.ovissNiva?(0,$c.jsxs)($c.Fragment,{children:["Vad ni betalar och vad den billigaste j\xe4mf\xf6rbara licensen kostar st\xe5r ovan. ",(0,$c.jsx)("b",{children:"Hur l\xe5ngt ifr\xe5n ni ligger kan vi inte s\xe4ga"})," f\xf6rr\xe4n vi vet vilken niv\xe5 ni har \u2014 priserna i den h\xe4r kategorin skiljer n\xe4stan tio g\xe5nger mellan billigaste och dyraste. Dela avtalet, s\xe5 l\xe5ser vi j\xe4mf\xf6relsen."]}):e.nivaBekraftad?e.underGolv?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsxs)("b",{children:[Math.abs(e.avstandPct)," % under"]})," listpriset f\xf6r er egen licensniv\xe5. Det kr\xe4ver att n\xe5gon har f\xf6rhandlat."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsxs)("b",{children:[e.avstandPct," % \xf6ver"]})," listpriset f\xf6r er egen licensniv\xe5 \u2014 samma produkt, h\xf6gre pris."]}):e.underGolv?(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsxs)("b",{children:[Math.abs(e.avstandPct)," % under"]})," det billigaste priset som g\xe5r att k\xf6pa \xf6ver disk. Det kr\xe4ver att n\xe5gon har f\xf6rhandlat."]}):(0,$c.jsxs)($c.Fragment,{children:["Ni ligger ",(0,$c.jsxs)("b",{children:[e.avstandPct," % \xf6ver"]})," det billigaste priset som g\xe5r att k\xf6pa \xf6ver disk."]})}),(0,$c.jsxs)("p",{className:"u-not",children:[e.nivaBekraftad?(0,$c.jsx)($c.Fragment,{children:"Er licensniv\xe5 \xe4r l\xe4st ur fakturans egen radtext, s\xe5 j\xe4mf\xf6relsen g\xe4ller samma produkt. Scoren m\xe4ts mot det priset \u2014 inte mot vad andra bolag faktiskt betalar."}):e.ovissNiva?(0,$c.jsx)($c.Fragment,{children:"Vi s\xe4tter varken avst\xe5nd eller po\xe4ng h\xe4r. Priserna i kategorin skiljer n\xe4stan tio g\xe5nger mellan billigaste och dyraste licens, s\xe5 ett tal mot det billigaste hade m\xe4tt vilken produkt ni valt \u2014 inte vad ni betalar f\xf6r den. Med avtalet i handen blir j\xe4mf\xf6relsen exakt."}):(0,$c.jsx)($c.Fragment,{children:"J\xe4mf\xf6relsen g\xf6rs mot den billigaste j\xe4mf\xf6rbara produkten. Scoren m\xe4ts mot priset ovan, inte mot vad andra bolag faktiskt betalar."})," ","Den j\xe4mf\xf6relsen kommer n\xe4r fler i er bransch delar sina fakturor."]})]})})(),i.uppdelning&&(()=>{const e=i.uppdelning,t=e.periodOrd;return(0,$c.jsxs)(Wh,{"data-uppdelning":!0,children:[(0,$c.jsxs)("div",{className:"u-k",children:["Vad ing\xe5r i ",eg(i.annual_cost)," kr/\xe5r"]}),e.lopande.map((e,t)=>{var r;return(0,$c.jsxs)("div",{className:"u-rad",children:[(0,$c.jsx)("span",{className:"u-txt",children:e.beskrivning}),(0,$c.jsxs)("span",{className:"u-spec",children:[e.antal>0&&e.aPris>0?(0,$c.jsxs)($c.Fragment,{children:[eg(e.antal)," \xd7 ",ig(e.aPris)," kr"]}):null,e.prorata?" \xb7 delperiod, \xe5rstakten anv\xe4nder fullt pris":""]}),(0,$c.jsxs)("span",{className:"u-bel",children:[eg(null!==(r=e.fulltBelopp)&&void 0!==r?r:e.belopp)," kr"]})]},`l${t}`)}),(0,$c.jsxs)("div",{className:"u-summa",children:[(0,$c.jsxs)("span",{children:["L\xf6pande per ",t]}),(0,$c.jsxs)("span",{className:"u-bel",children:[eg(e.lopandePerPeriod)," kr"]})]}),(0,$c.jsxs)("div",{className:"u-summa total",children:[(0,$c.jsxs)("span",{children:["\xd7 ",e.multiplikator," ",e.periodOrdPlural]}),(0,$c.jsxs)("span",{className:"u-bel",children:[eg(e.arstakt)," kr/\xe5r"]})]}),e.engangs.length>0&&(0,$c.jsxs)("div",{className:"u-utanfor",children:[(0,$c.jsx)("div",{className:"u-k",children:"Ing\xe5r inte i \xe5rstakten"}),e.engangs.map((e,t)=>(0,$c.jsxs)("div",{className:"u-rad",children:[(0,$c.jsx)("span",{className:"u-txt",children:e.beskrivning}),(0,$c.jsx)("span",{className:"u-spec",children:"eng\xe5ngs eller r\xf6rlig"}),(0,$c.jsxs)("span",{className:"u-bel",children:[eg(e.belopp)," kr"]})]},`e${t}`)),(0,$c.jsxs)("p",{className:"u-not",children:["Poster som inte \xe5terkommer varje ",t," r\xe4knas aldrig in i \xe5rskostnaden \u2014 att annualisera dem hade bl\xe5st upp b\xe5de er kostnad och v\xe5r besparing."]})]}),(0,$c.jsx)("p",{className:"u-not",children:"Talen \xe4r h\xe4mtade ur er egen faktura, ordagrant. Summan g\xe5r att r\xe4kna efter med minir\xe4knare \u2014 annars visar vi den inte."})]})})(),(0,$c.jsxs)("dl",{className:"facts",children:[!u&&null!=i.annual_cost&&(0,$c.jsxs)("div",{className:"fact",children:[(0,$c.jsx)("dt",{children:"Ni betalar idag"}),(0,$c.jsxs)("dd",{children:[eg(i.annual_cost)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"fact",children:[(0,$c.jsx)("dt",{children:"Kategori"}),(0,$c.jsx)("dd",{style:{fontFamily:"inherit"},children:o.label})]}),(0,$c.jsxs)("div",{className:"fact",children:[(0,$c.jsx)("dt",{children:"Analyserad"}),(0,$c.jsx)("dd",{children:tg(i.created_at)})]})]}),u&&((e,t,r,n)=>{const a=!!i.contract_end_date,o=b[i.category];return(0,$c.jsxs)(Dh,{$known:a,children:[(0,$c.jsxs)("div",{className:"sv-eyebrow",children:[(0,$c.jsx)("span",{className:"sv-dot"}),a?"Vakten \xb7 ert byte":"Vakten \xb7 ett drag kvar"]}),(0,$c.jsx)("div",{className:"sv-dom",children:a?(0,$c.jsxs)($c.Fragment,{children:["Ni kan byta \u2014 och vi vet ",(0,$c.jsx)("em",{children:"exakt n\xe4r"}),"."]}):(0,$c.jsxs)($c.Fragment,{children:["En sak st\xe5r mellan er och ",(0,$c.jsxs)("em",{children:[eg(i.net_saving)," kr"]}),": vad ert avtal s\xe4ger."]})}),(0,$c.jsx)("p",{className:"sv-support",children:a?(0,$c.jsxs)($c.Fragment,{children:["Ert ",Xf(i),"-avtal l\xf6per till ",(0,$c.jsx)("b",{children:tg(i.contract_end_date)})," \u2014 vi avfyrar bytet p\xe5 dagen, i ert namn. Ni betalar ",(0,$c.jsx)("b",{children:"aldrig en dag dubbelt"}),", och vi flyttar er",(0,$c.jsx)("b",{children:" aldrig in i en avgift"}),"."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi ser besparingen tydligt \u2014 men inget bindningsdatum p\xe5 er faktura. Skicka avtalet, s\xe5",(0,$c.jsx)("b",{children:" l\xe4ser vi bindningstiden"})," och tajmar bytet s\xe5 ni ",(0,$c.jsx)("b",{children:"aldrig betalar dubbelt"})," och aldrig hamnar i en brytavgift."]})}),(0,$c.jsxs)("details",{className:"sv-proof",children:[(0,$c.jsx)("summary",{children:"F\xf6ruts\xe4ttningar inf\xf6r bytet"}),(0,$c.jsxs)("div",{className:"sv-proof-body",children:[(null===o||void 0===o||null===(e=o.alternatives)||void 0===e?void 0:e.length)>0&&(0,$c.jsxs)("div",{className:"sv-sec",children:[(0,$c.jsx)("div",{className:"sv-lbl",children:"Vad ni f\xe5r"}),o.alternatives.map((e,t)=>(0,$c.jsxs)("div",{className:"sv-alt",children:[(0,$c.jsxs)("span",{className:"sv-sup",children:[e.supplier,0===t&&(0,$c.jsx)("span",{className:"sv-tag",children:"b\xe4st matchning"})]}),(0,$c.jsx)("span",{className:"sv-pos",children:e.positioning})]},e.supplier)),(0,$c.jsxs)("div",{className:"sv-fine",children:["Matchat mot er nuvarande niv\xe5 \u2014 ",(0,$c.jsx)("b",{children:"samma eller b\xe4ttre, aldrig en nedgradering."})]})]}),(0,$c.jsxs)("div",{className:"sv-sec",children:[(0,$c.jsx)("div",{className:"sv-lbl",children:"Vad bytet ger er"}),(0,$c.jsxs)("div",{className:"sv-row",children:[(0,$c.jsxs)("span",{children:["Ni betalar idag",(0,$c.jsx)("small",{children:"er faktura"})]}),(0,$c.jsxs)("span",{className:"sv-v",children:[eg(i.annual_cost)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"sv-row",children:[(0,$c.jsxs)("span",{children:["Samma niv\xe5 kostar idag",(0,$c.jsxs)("small",{children:["verifierat \xf6ppet pris",null!==o&&void 0!==o&&o.lastVerified?` \xb7 ${o.lastVerified}`:""]})]}),(0,$c.jsxs)("span",{className:"sv-v",children:[eg(i.suggested_annual_cost)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"sv-row sv-keep",children:[(0,$c.jsxs)("span",{children:["Ni beh\xe5ller",(0,$c.jsx)("small",{children:"efter Arvos arvode \xb7 vi tar betalt f\xf6rst n\xe4r pengarna landat"})]}),(0,$c.jsxs)("span",{className:"sv-v",children:["+",eg(i.net_saving)," kr/\xe5r"]})]}),(0,$c.jsxs)("div",{className:"sv-fine",children:["bredband"===i.category?(0,$c.jsx)($c.Fragment,{children:"Exakt pris s\xe4tts per adress i offert \u2014 "}):(0,$c.jsx)($c.Fragment,{children:"Det slutliga priset s\xe4tts i offert \u2014 "}),"det ",(0,$c.jsx)("b",{children:"bekr\xe4ftas innan ni skriver under."})]})]}),(0,$c.jsxs)("div",{className:"sv-sec",children:[(0,$c.jsx)("div",{className:"sv-lbl",children:a?"Er enda handling":"Varf\xf6r vi v\xe4ntar p\xe5 datumet"}),(0,$c.jsx)("p",{className:"sv-note",children:a?(0,$c.jsx)($c.Fragment,{children:"En signatur med BankID. Inget \xe4r bindande f\xf6rr\xe4n ni skriver under, ni kan tacka nej utan kostnad, och sj\xe4lva bytet ger ingen driftst\xf6rning \u2014 den nya leverant\xf6ren sk\xf6ter flytten."}):(0,$c.jsx)($c.Fragment,{children:"En bindningstid eller brytavgift kan \xe4ta besparingen om bytet sker fel dag. Vi r\xf6r er aldrig f\xf6rr\xe4n vi vet att kalkylen h\xe5ller \u2014 bristen \xe4r n\xe4sta drag, inte ett hinder."})})]})]})]}),(0,$c.jsxs)("div",{className:"sv-act",children:[(0,$c.jsxs)(Ph,{as:vs,to:"/aktivera",children:[a?"Aktivera bytet":"F\xf6rbered bytet"," ",(0,$c.jsx)(yp,{name:"arrow",size:16})]}),!a&&(0,$c.jsxs)("label",{className:"sv-upload",children:[(0,$c.jsx)(yp,{name:"upload",size:14,stroke:1.9}),"work"===(null===(t=Z[i.id])||void 0===t?void 0:t.phase)?"L\xe4ser avtalet\u2026":"Ladda upp avtalet (PDF)",(0,$c.jsx)("input",{type:"file",accept:"application/pdf",disabled:"work"===(null===(r=Z[i.id])||void 0===r?void 0:r.phase),onChange:e=>{var t;$e(i.id,null===(t=e.target.files)||void 0===t?void 0:t[0]),e.target.value=""}})]})]}),!a&&(null===(n=Z[i.id])||void 0===n?void 0:n.msg)&&(0,$c.jsx)("p",{className:`sv-upload-note ${Z[i.id].phase}`,children:Z[i.id].msg})]})})(),i.avtal&&((e,t,r,n,a,o,l,d,c)=>{const u=i.avtal,p=u.clock,m="window-open"===p.status&&null!=p.daysToDeadline&&p.daysToDeadline<=30,f={avtalsstart:"Avtalsstart",avtalstidMan:"Avtalstid",uppsagningstidMan:"Upps\xe4gningstid",uppsagningstidDagar:"Upps\xe4gningstid",forlangningMan:"F\xf6rl\xe4ngning"},h=Object.entries(null!==(e=u.citat)&&void 0!==e?e:{}).filter(e=>{let[,t]=e;return t});return(0,$c.jsxs)(Fh,{children:[(0,$c.jsxs)("div",{className:"al-eyebrow",children:["Avtalet \xb7 l\xe4st och bevakat",u.readAt&&(0,$c.jsxs)("span",{children:["l\xe4st ",tg(u.readAt)]})]}),(0,$c.jsxs)("div",{className:"al-facts",children:[(0,$c.jsxs)("span",{children:["Bindning ",(0,$c.jsx)("b",{children:u.bindningLabel})]}),u.uppsagningLabel&&(0,$c.jsxs)("span",{children:["Upps\xe4gningstid ",(0,$c.jsx)("b",{children:u.uppsagningLabel})]}),u.forlangningLabel&&(0,$c.jsxs)("span",{children:["F\xf6rl\xe4ngning ",(0,$c.jsx)("b",{children:u.forlangningLabel})]})]}),"uppsagd"===(null===(t=u.kundStatus)||void 0===t?void 0:t.typ)&&("terminating"===p.status||"terminated"===p.status)&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{className:"al-deadline lugn",children:["Avtalet upph\xf6r ",(0,$c.jsx)("span",{className:"al-date",children:tg(p.currentPeriodEnd)}),"terminating"===p.status&&(0,$c.jsxs)($c.Fragment,{children:[" \xb7 ",(0,$c.jsxs)("span",{className:"al-days",children:[p.daysToEnd," dagar"]})]})]}),(0,$c.jsxs)("p",{className:"al-falla",children:["Markerad som uppsagd ",(0,$c.jsxs)("b",{children:["av er \xb7 ",tg(u.kundStatus.registrerad)]}),". Varningarna \xe4r tysta."]}),u.omVaktLarm?(0,$c.jsxs)("p",{className:"al-larm",children:[(0,$c.jsx)("b",{children:"Om-vakten larmar:"})," en faktura fr\xe5n ",Xf(i)," har landat efter uttr\xe4desdatumet \u2014 kontrollera att upps\xe4gningen verkligen gick igenom."]}):(0,$c.jsxs)("p",{className:"al-motdrag",children:[(0,$c.jsx)("b",{children:"Om-vakten:"})," efter ",tg(p.currentPeriodEnd)," ska ",Xf(i)," f\xf6rsvinna ur ert fakturafl\xf6de \u2014 landar en faktura \xe4nd\xe5 larmar rummet."]}),(0,$c.jsx)("button",{type:"button",className:"al-angra",onClick:()=>Ne(i.id,"angra"),children:"\u25b8 \xc5ngra \u2014 vi sade inte upp \xe4nd\xe5"})]}),u.stannarAktiv&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{className:"al-deadline",children:["N\xe4sta f\xf6nster ",(0,$c.jsx)("span",{className:"al-date",children:tg(null!==(r=u.nastaFonster)&&void 0!==r?r:p.deadline)})," \xb7 varnar igen d\xe5"]}),(0,$c.jsxs)("p",{className:"al-falla",children:["Ni valde att beh\xe5lla ",Xf(i)," ",(0,$c.jsxs)("b",{children:["denna period \xb7 ",tg(u.kundStatus.registrerad)]}),". Larmet \xe4r tyst till n\xe4sta f\xf6nster \u2014 bevakningen forts\xe4tter, och h\xf6jer leverant\xf6ren priset h\xf6r ni av oss direkt."]}),(0,$c.jsx)("button",{type:"button",className:"al-angra",onClick:()=>Ne(i.id,"angra"),children:"\u25b8 \xc5ngra \u2014 \xf6ppna f\xf6nstret igen"})]}),!(null!==(n=u.kundStatus)&&void 0!==n&&n.typ)&&!u.stannarAktiv&&(0,$c.jsxs)($c.Fragment,{children:["window-open"===p.status&&p.deadline&&(0,$c.jsxs)("div",{className:"al-deadline"+(m?" akut":""),children:["Sista upps\xe4gningsdag ",(0,$c.jsx)("span",{className:"al-date",children:tg(p.deadline)})," ","\xb7 ",(0,$c.jsxs)("span",{className:"al-days",children:[p.daysToDeadline," dagar kvar"]})]}),"window-open"===p.status&&u.nastaPeriodSlut&&(0,$c.jsxs)("p",{className:"al-falla",children:[(0,$c.jsx)("b",{children:"F\xe4llan i ert avtal:"})," missas f\xf6nstret f\xf6rl\xe4ngs avtalet automatiskt och ni \xe4r bundna till ",tg(u.nastaPeriodSlut),"."]}),"rolling"===p.status&&(0,$c.jsxs)("p",{className:"al-falla",children:["Ingen deadline att missa \u2014 avtalet l\xf6per tills vidare och kan s\xe4gas upp n\xe4r som helst med ",u.uppsagningLabel," varsel (tidigast ",tg(p.currentPeriodEnd),")."]}),("expires"===p.status||"expired"===p.status)&&(0,$c.jsxs)("p",{className:"al-falla",children:["Avtalet l\xf6per ut ",tg(p.currentPeriodEnd)," utan automatisk f\xf6rl\xe4ngning."]}),(0,$c.jsxs)("p",{className:"al-motdrag",children:[(0,$c.jsx)("b",{children:"Motdraget:"})," f\xf6nstret bevakas i Maktkalendern",fe||s?(0,$c.jsx)($c.Fragment,{children:" \u2014 vi mejlar er 30 och 7 dagar f\xf6re sista upps\xe4gningsdagen, och rummet visar alltid exakt hur m\xe5nga dagar som \xe5terst\xe5r."}):(0,$c.jsx)($c.Fragment,{children:" \u2014 rummet visar alltid exakt hur m\xe5nga dagar som \xe5terst\xe5r, och bytet f\xf6rbereds mot r\xe4tt dag. Logga in med er f\xf6retagsmejl s\xe5 p\xe5minner vi er \xe4ven via mejl."})]}),("window-open"===p.status||"rolling"===p.status)&&(0,$c.jsxs)("div",{className:"al-actions",children:[(0,$c.jsx)("button",{type:"button",className:"al-btn primary",disabled:"work"===(null===(a=Z[i.id])||void 0===a?void 0:a.phase),onClick:()=>Ne(i.id,"uppsagd"),children:"Vi har sagt upp \u2713"}),"window-open"===p.status&&(0,$c.jsx)("button",{type:"button",className:"al-btn",disabled:"work"===(null===(o=Z[i.id])||void 0===o?void 0:o.phase),onClick:()=>Ne(i.id,"stannar"),children:"Vi stannar denna period"})]})]}),h.length>0&&(0,$c.jsxs)("details",{className:"al-citat",children:[(0,$c.jsx)("summary",{children:"Ordagrant ur ert avtal"}),h.map(e=>{var t;let[r,n]=e;return(0,$c.jsxs)("p",{className:"al-c",children:[(0,$c.jsx)("small",{children:null!==(t=f[r])&&void 0!==t?t:r}),(0,$c.jsxs)("i",{children:["\u201d",n,"\u201d"]})]},r)})]}),(0,$c.jsxs)("label",{className:"sv-upload",children:[(0,$c.jsx)(yp,{name:"upload",size:14,stroke:1.9}),"work"===(null===(l=Z[i.id])||void 0===l?void 0:l.phase)?"L\xe4ser avtalet\u2026":"Ladda upp ett nyare avtal (PDF)",(0,$c.jsx)("input",{type:"file",accept:"application/pdf",disabled:"work"===(null===(d=Z[i.id])||void 0===d?void 0:d.phase),onChange:e=>{var t;$e(i.id,null===(t=e.target.files)||void 0===t?void 0:t[0]),e.target.value=""}})]}),(null===(c=Z[i.id])||void 0===c?void 0:c.msg)&&(0,$c.jsx)("p",{className:`sv-upload-note ${Z[i.id].phase}`,children:Z[i.id].msg})]})})(),!u&&!i.contract_end_date&&(0,$c.jsxs)(Oh,{children:[(0,$c.jsx)("div",{className:"au-eyebrow",children:"Bindningstiden \xe4r ok\xe4nd"}),(0,$c.jsx)("p",{className:"au-txt",children:"Fakturan visar inte n\xe4r ert avtal l\xf6per ut. Ladda upp avtalet, s\xe5 l\xe4ser vi datumen och r\xe4knar ut er sista upps\xe4gningsdag \u2014 f\xf6nstret bevakas sedan i kontraktskalendern."}),(0,$c.jsxs)("label",{className:"sv-upload",children:[(0,$c.jsx)(yp,{name:"upload",size:14,stroke:1.9}),"work"===(null===(r=Z[i.id])||void 0===r?void 0:r.phase)?"L\xe4ser avtalet\u2026":"Ladda upp avtalet (PDF)",(0,$c.jsx)("input",{type:"file",accept:"application/pdf",disabled:"work"===(null===(n=Z[i.id])||void 0===n?void 0:n.phase),onChange:e=>{var t;$e(i.id,null===(t=e.target.files)||void 0===t?void 0:t[0]),e.target.value=""}})]}),(null===(a=Z[i.id])||void 0===a?void 0:a.msg)&&(0,$c.jsx)("p",{className:`sv-upload-note ${Z[i.id].phase}`,children:Z[i.id].msg})]})]})]},i.id)})]}),y.length>0&&(0,$c.jsxs)(Th,{children:[(0,$c.jsxs)("div",{className:"w-eyebrow",children:["Bevakat \u2014 inte prissatt \xb7 ",y.length," ",1===y.length?"faktura":"fakturor",Ce.length!==y.length&&(0,$c.jsxs)($c.Fragment,{children:[" \xb7 ",Ce.length," sk\xe4l"]})]}),(0,$c.jsxs)("p",{className:"w-manifesto",children:["Dessa ",(0,$c.jsx)("b",{children:y.length})," priss\xe4tter vi medvetet inte. Vart och ett b\xe4r sitt eget sk\xe4l nedan \u2014 vi s\xe4tter hellre ingen siffra \xe4n en vi inte kan st\xe5 f\xf6r. Vakten h\xe5ller dem under uppsikt och s\xe4ger till n\xe4r underlaget b\xe4r."]}),Ce.map(e=>(0,$c.jsxs)("div",{className:"w-row",children:[(0,$c.jsxs)("div",{className:"w-top",children:[(0,$c.jsx)("span",{className:"w-sup",children:1===e.suppliers.length?e.suppliers[0]:`${e.suppliers.length} fakturor`}),(0,$c.jsx)("span",{className:"w-kind",children:e.kind})]}),(0,$c.jsx)("div",{className:"w-head",children:e.headline}),(0,$c.jsx)("p",{className:"w-detail",children:e.detail}),e.suppliers.length>1&&(0,$c.jsx)("div",{className:"w-list",children:e.suppliers.join(" \xb7 ")}),(0,$c.jsxs)("div",{className:"w-action",children:[(0,$c.jsx)("span",{className:"w-arrow",children:"\u2192"})," ",e.action]})]},e.kind))]}),(0,$c.jsxs)(Hh,{children:[(0,$c.jsx)("div",{className:"mi-k",children:"Fyll p\xe5 rummet"}),(0,$c.jsx)("h3",{className:"mi-h",children:"Fler leverant\xf6rer, fler avtal \u2014 samma v\xe4g in."}),(0,$c.jsx)("p",{className:"mi-p",children:"Vidarebefordra n\xe4sta bunt leverant\xf6rsfakturor, eller sl\xe4pp dem h\xe4r. Ju fler avtal vakten ser, desto mer av er kostnad st\xe5r under uppsikt."}),(0,$c.jsxs)("div",{className:"mi-grid",children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("p",{className:"mi-or",children:"Vidarebefordra \u2014 \xe4ven 50 p\xe5 en g\xe5ng"}),(0,$c.jsxs)(Mh,{type:"button",onClick:Ee,className:Q?"copied":"","aria-label":`Kopiera ${Zh}`,children:[(0,$c.jsx)("span",{className:"ac-addr",children:Zh}),(0,$c.jsx)("span",{className:"ac-copy",children:Q?(0,$c.jsxs)($c.Fragment,{children:["Kopierat ",(0,$c.jsx)(yp,{name:"check",size:13,stroke:2.4})]}):"Kopiera"})]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("p",{className:"mi-or",children:"Eller ladda upp direkt"}),(0,$c.jsxs)(Vh,{className:`${U?"busy":""}${q?" over":""}`,onDrop:je,onDragOver:we,onDragLeave:Se,children:[(0,$c.jsx)("span",{className:"dz-ico",children:(0,$c.jsx)(yp,{name:"upload",size:20,stroke:1.7})}),(0,$c.jsx)("span",{className:"dz-t",children:U?"Analyserar\u2026":q?"Sl\xe4pp h\xe4r":"Sl\xe4pp eller v\xe4lj PDF-fakturor"}),(0,$c.jsx)("span",{className:"dz-s",children:"Flera samtidigt g\xe5r bra \xb7 vi sparar aldrig filen"}),(0,$c.jsx)("input",{type:"file",accept:"application/pdf",multiple:!0,disabled:U,onChange:ye})]})]})]}),M.length>0&&(0,$c.jsx)(Uh,{children:M.map((e,t)=>(0,$c.jsxs)("div",{className:"dp-row",children:[(0,$c.jsx)("span",{className:"dp-name",children:e.name}),(0,$c.jsx)("span",{className:"dp-stat "+("done"===e.status?"done":"work"===e.status||"gate"===e.status||"review"===e.status?"work":"fail"),title:"fail"===e.status&&e.hint||"",children:"done"===e.status?"Klar":"review"===e.status?"Manuell granskning":"fail"===e.status?e.label||"Misslyckades":"gate"===e.status?"Gr\xe4ns n\xe5dd":"Analyserar\u2026"})]},`${e.name}-${t}`))}),H&&(0,$c.jsx)(Uh,{children:(0,$c.jsx)("p",{className:"dp-note",children:H})})]}),(0,$c.jsxs)(Lh,{children:[(0,$c.jsx)("div",{className:"iq-k",children:"Arvo Intelligence"}),(0,$c.jsxs)("h3",{children:["Hela reskontran, ",(0,$c.jsx)("em",{children:"bevakad dygnet runt."})]}),(0,$c.jsx)("p",{children:Je?(0,$c.jsxs)($c.Fragment,{children:["I dag vaktar Arvo de avtal ni delat. Arvo Intelligence vidgar vakten till ",(0,$c.jsx)("b",{children:"resten av boken"})," \u2014 varenda avtal ni har \u2014 och larmar er innan n\xe4sta h\xf6jning n\xe5r er. Varje m\xe5nad: ett brev med exakt vad som r\xf6rt sig, och vad vi gjort \xe5t det."]}):(0,$c.jsxs)($c.Fragment,{children:["Era priser st\xe5r sig i dag, och Arvo vaktar de avtal ni delat. Arvo Intelligence vidgar vakten till ",(0,$c.jsx)("b",{children:"resten av boken"}),", s\xe5 att inget avtal l\xe4mnas obevakat \u2014 och skickar varje m\xe5nad ett brev med vad som r\xf6rt sig."]})}),(0,$c.jsxs)("div",{className:"iq-row",children:[(0,$c.jsxs)("span",{className:"iq-price",children:["1 995 kr ",(0,$c.jsx)("span",{children:"/ m\xe5n \xb7 ingen bindningstid"})]}),(0,$c.jsxs)(Ph,{as:vs,to:"/aktivera",children:["Aktivera Arvo Intelligence ",(0,$c.jsx)(yp,{name:"arrow",size:16})]})]})]}),(0,$c.jsxs)(Nh,{children:[(0,$c.jsx)("div",{className:"keyline"}),(0,$c.jsx)("div",{className:"mark",children:"ARVO"}),(0,$c.jsx)("div",{className:"tagline",children:"Finansiell intelligens som aldrig sover."})]})]}),null!==i&&0===ze.length&&!T&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(ph,{children:(0,$c.jsxs)(mh,{children:[(0,$c.jsx)("div",{className:"brand",children:"ARVO-KONTORET"}),(0,$c.jsxs)("div",{className:"confidential",children:["Konfidentiellt \xb7 ",null!==Ie&&void 0!==Ie?Ie:"Ert konto"," \xb7 ",We,Y?" \xb7 TESTKONTO (?reset=off f\xf6r skarpt)":""]}),(0,$c.jsx)("h1",{children:$>0?(0,$c.jsxs)($c.Fragment,{children:["Arvo analyserar",(0,$c.jsx)("br",{}),$," ",1===$?"faktura":"fakturor","\u2026"]}):(0,$c.jsxs)($c.Fragment,{children:["Se ert bolag",(0,$c.jsx)("br",{}),"som marknaden ser det."]})})]})}),$>0?(0,$c.jsxs)(hh,{children:[(0,$c.jsxs)("div",{className:"eyebrow",children:[(0,$c.jsx)("span",{className:"live",style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:"#5DD6CA",marginRight:8}}),"Arbetar nu"]}),(0,$c.jsxs)("h2",{children:["Vi v\xe4ger era ",(0,$c.jsxs)("em",{children:[$," ",1===$?"faktura":"fakturor"]})," mot verifierat publikt listpris."]}),(0,$c.jsx)("p",{className:"work",children:"Kontoret fylls i takt med att varje analys blir klar \u2014 sidan uppdateras automatiskt, ni beh\xf6ver inte g\xf6ra n\xe5got. Det tar oftast n\xe5gon minut."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Uu,{doman:te,setDoman:re,onSubmit:async function(e){var t;null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e);const r=te.trim();if(!r||ie)return;oe(!0),ae(null),le(""),ce(0);const n=performance.now();try{var a;const e=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:r,fast:!0})}),t=await e.json().catch(()=>({}));if(null!==(a=t.findings)&&void 0!==a&&a.length){ae(t),pe(!0),oe(!1);try{const e=new AbortController,n=setTimeout(()=>e.abort(),18e3);try{var i;const n=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:r}),signal:e.signal}),a=await n.json().catch(()=>({}));if(null!==(i=a.findings)&&void 0!==i&&i.length){const e=new Set(t.findings.map(e=>e.title)),r=a.findings.filter(t=>!e.has(t.title)).slice(0,Math.max(0,5-t.findings.length));r.length&&ae({...t,findings:[...t.findings,...r]})}}finally{clearTimeout(n)}}catch{}ce((performance.now()-n)/1e3),pe(!1)}else le(t.note||"Vi kunde inte l\xe4sa av den dom\xe4nen just nu \u2014 kontrollera adressen och f\xf6rs\xf6k igen.")}catch{le("Vi n\xe5r inte Arvo just nu \u2014 f\xf6rs\xf6k igen om en stund.")}finally{oe(!1)}},loading:ie,reveal:ne,note:se,elapsedS:de,pending:ue}),!ne&&!ie&&(0,$c.jsx)(Lu,{})]}),(0,$c.jsxs)(Ih,{children:[(0,$c.jsxs)("div",{className:"door primary",children:[(0,$c.jsxs)("div",{className:"door-k",children:["Vidarebefordra ",(0,$c.jsx)("span",{className:"door-tag",children:"Rekommenderas"})]}),(0,$c.jsx)("h4",{children:"T\xf6m m\xe5nadens fakturor i ett mejl."}),(0,$c.jsx)("p",{children:"Markera era leverant\xf6rsfakturor (PDF) i inkorgen och vidarebefordra allt p\xe5 en g\xe5ng \u2014 \xe4ven 50 p\xe5 en g\xe5ng. Analyserna landar h\xe4r."}),(0,$c.jsx)("div",{className:"spacer"}),(0,$c.jsxs)(Mh,{type:"button",onClick:Ee,className:Q?"copied":"","aria-label":`Kopiera ${Zh}`,children:[(0,$c.jsx)("span",{className:"ac-addr",children:Zh}),(0,$c.jsx)("span",{className:"ac-copy",children:Q?(0,$c.jsxs)($c.Fragment,{children:["Kopierat ",(0,$c.jsx)(yp,{name:"check",size:13,stroke:2.4})]}):"Kopiera"})]}),(0,$c.jsxs)("p",{className:"door-trust",children:[(0,$c.jsx)(yp,{name:"lock",size:13,stroke:1.8,className:"dt-ico"}),(0,$c.jsxs)("span",{children:["Vi l\xe4ser fakturan, v\xe4ger den mot marknaden och ",(0,$c.jsx)("b",{children:"sparar aldrig filen efter analysen"})," \u2014 bara resultatet."]})]})]}),(0,$c.jsxs)("div",{className:"door",children:[(0,$c.jsx)("div",{className:"door-k",children:"Eller \xb7 ladda upp direkt"}),(0,$c.jsx)("h4",{children:"Dra in flera fakturor h\xe4r."}),(0,$c.jsx)("p",{children:"PDF \xb7 upp till 20 \xe5t g\xe5ngen \xb7 vi sparar aldrig filen efter analysen."}),(0,$c.jsx)("div",{className:"spacer"}),(0,$c.jsxs)(Vh,{className:`${U?"busy":""}${q?" over":""}`,onDrop:je,onDragOver:we,onDragLeave:Se,children:[(0,$c.jsx)("span",{className:"dz-ico",children:(0,$c.jsx)(yp,{name:"upload",size:22,stroke:1.7})}),(0,$c.jsx)("span",{className:"dz-t",children:U?"Analyserar\u2026":q?"Sl\xe4pp h\xe4r":"Sl\xe4pp eller v\xe4lj PDF-fakturor"}),(0,$c.jsx)("span",{className:"dz-s",children:"Flera samtidigt g\xe5r bra"}),(0,$c.jsx)("input",{type:"file",accept:"application/pdf",multiple:!0,disabled:U,onChange:ye})]}),M.length>0&&(0,$c.jsx)(Uh,{children:M.map((e,t)=>(0,$c.jsxs)("div",{className:"dp-row",children:[(0,$c.jsx)("span",{className:"dp-name",children:e.name}),(0,$c.jsx)("span",{className:"dp-stat "+("done"===e.status?"done":"work"===e.status||"gate"===e.status||"review"===e.status?"work":"fail"),title:"fail"===e.status&&e.hint||"",children:"done"===e.status?"Klar":"review"===e.status?"Manuell granskning":"fail"===e.status?e.label||"Misslyckades":"gate"===e.status?"Gr\xe4ns n\xe5dd":"Analyserar\u2026"})]},`${e.name}-${t}`))}),H&&(0,$c.jsx)(Uh,{children:(0,$c.jsx)("p",{className:"dp-note",children:H})})]})]}),(0,$c.jsxs)(Bh,{children:["B\xf6rja med det vi priss\xe4tter direkt mot verifierat publikt listpris \u2014 ",(0,$c.jsx)("b",{children:"IT-licenser, telefoni, l\xf6n eller el"}),". D\xe4r sitter \xf6verbetalningen oftast."]}),(0,$c.jsxs)(Kh,{children:[(0,$c.jsx)("span",{className:"ft-ico",children:(0,$c.jsx)(yp,{name:"lock",size:18,stroke:1.7})}),(0,$c.jsxs)("span",{className:"ft-txt",children:[(0,$c.jsx)("b",{children:"Snart: koppla Fortnox."})," N\xe4r integrationen \xe4r p\xe5 plats l\xe4ses hela leverant\xf6rsreskontran automatiskt \u2014 d\xe5 slutar ni ladda upp."]}),(0,$c.jsx)("span",{className:"ft-soon",children:"Lanseras inom kort"})]}),(0,$c.jsxs)(Nh,{children:[(0,$c.jsx)("div",{className:"keyline"}),(0,$c.jsx)("div",{className:"mark",children:"ARVO"}),(0,$c.jsx)("div",{className:"tagline",children:"Finansiell intelligens som aldrig sover."})]})]})]})})}const cg=jc`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}`,ug=vc.div`min-height:100vh;background:#0E1A17;color:#fff;font-family:system-ui,sans-serif;padding:32px 24px;`,pg=vc.h1`font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 4px;`,mg=vc.p`font-size:13px;color:rgba(255,255,255,.45);margin:0 0 28px;`,fg=vc.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;@media(max-width:700px){grid-template-columns:1fr 1fr;}`,hg=vc.div`background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px 18px;`,gg=vc.p`font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.4);margin:0 0 4px;`,xg=vc.p`font-size:22px;font-weight:800;color:#5DD6CA;margin:0;letter-spacing:-.02em;`,vg=vc.div`margin-bottom:28px;animation:${cg} .4s ease both;`,bg=vc.h2`font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 10px;`,kg=vc.div`background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;`,yg=vc.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:10px 16px;background:rgba(255,255,255,.06);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);gap:12px;`,jg=vc.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:11px 16px;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;gap:12px;align-items:center;&:hover{background:rgba(255,255,255,.03);}`,wg=vc.span`display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600;background:${e=>{let{$c:t}=e;return null!==t&&void 0!==t?t:"rgba(255,255,255,.1)"}};color:#fff;`,Sg=vc.form`display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;`,$g=vc.input`padding:10px 14px;border-radius:100px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;flex:1;min-width:200px;outline:none;&::placeholder{color:rgba(255,255,255,.3);}`,Ng=vc.button`padding:10px 20px;border-radius:100px;border:none;cursor:pointer;font-size:13px;font-weight:700;background:linear-gradient(135deg,#5DD6CA,#1B6E66);color:#fff;white-space:nowrap;&:disabled{opacity:.5;cursor:not-allowed;}`,Eg=vc.div`margin-top:8px;background:rgba(93,214,202,.1);border:1px solid rgba(93,214,202,.25);border-radius:8px;padding:10px 14px;font-size:12px;color:#5DD6CA;word-break:break-all;`,_g=vc.div`max-width:360px;margin:80px auto;text-align:center;`,zg=vc.p`padding:20px 16px;font-size:13px;color:rgba(255,255,255,.3);margin:0;`;function Cg(e){return e?new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"\u2013"}function Ag(e){return null==e?"\u2013":Math.round(e).toLocaleString("sv-SE")}function Dg(){var e,t,r,a,i,o,s,l,d,c,u,p,m,f,h,g,x,v,b,k,y,j;const[w,S]=(0,n.useState)(()=>{var e;return null!==(e=sessionStorage.getItem("arvo_admin_token"))&&void 0!==e?e:""}),[$,N]=(0,n.useState)(""),[E,_]=(0,n.useState)(!1),[z,C]=(0,n.useState)(null),[A,D]=(0,n.useState)(""),[F,O]=(0,n.useState)(""),[T,P]=(0,n.useState)(""),[L,R]=(0,n.useState)("72"),[I,B]=(0,n.useState)(""),[M,V]=(0,n.useState)("idle"),[U,K]=(0,n.useState)("queue"),[H,W]=(0,n.useState)("idle"),[q,G]=(0,n.useState)(null),[Y,J]=(0,n.useState)(null),[Q,X]=(0,n.useState)(null),[Z,ee]=(0,n.useState)("list"),[te,re]=(0,n.useState)(""),[ne,ae]=(0,n.useState)(null),[ie,oe]=(0,n.useState)(null),[se,le]=(0,n.useState)(null),[de,ce]=(0,n.useState)(null),[ue,pe]=(0,n.useState)(null),[me,fe]=(0,n.useState)("category"),[he,ge]=(0,n.useState)(""),[xe,ve]=(0,n.useState)(""),[be,ke]=(0,n.useState)(!1),[ye,je]=(0,n.useState)(null),[we,Se]=(0,n.useState)(null),[$e,Ne]=(0,n.useState)(null),[Ee,_e]=(0,n.useState)({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),[ze,Ce]=(0,n.useState)("idle"),[Ae,De]=(0,n.useState)(null),Fe=(0,n.useCallback)(async e=>{D("");try{const r=await fetch("/api/admin/dashboard",{headers:{"x-admin-token":e}}),n=await r.json();var t;if(!r.ok)return void D(null!==(t=n.error)&&void 0!==t?t:"Ej beh\xf6rig");C(n),_(!0),sessionStorage.setItem("arvo_admin_token",e)}catch{D("N\xe4tverksfel")}},[]);(0,n.useEffect)(()=>{w&&Fe(w)},[w,Fe]);const[Oe,Te]=(0,n.useState)(null),Pe=(0,n.useCallback)(()=>{fetch("/api/admin/benchmark-stats",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(Te).catch(()=>{})},[w]),Le=(0,n.useCallback)(()=>{fetch("/api/admin/prospects",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(e=>{var t,r;Se(null!==(t=e.prospects)&&void 0!==t?t:[]),Ne(null!==(r=e.stats)&&void 0!==r?r:{})}).catch(()=>{})},[w]);if(!E)return(0,$c.jsx)(ug,{children:(0,$c.jsxs)(_g,{children:[(0,$c.jsx)(pg,{children:"Arvo Admin"}),(0,$c.jsx)(mg,{children:"Ange ADMIN_TOKEN f\xf6r att forts\xe4tta"}),A&&(0,$c.jsx)("p",{style:{color:"#EF4444",fontSize:13,marginBottom:12},children:A}),(0,$c.jsxs)("form",{onSubmit:async function(e){e.preventDefault(),S($)},style:{display:"flex",flexDirection:"column",gap:10},children:[(0,$c.jsx)($g,{type:"password",placeholder:"Admin-token",value:$,onChange:e=>N(e.target.value),style:{borderRadius:10,textAlign:"center"}}),(0,$c.jsx)(Ng,{type:"submit",disabled:!$,children:"Logga in \u2192"})]})]})});const Re=null!==(e=null===z||void 0===z?void 0:z.stats)&&void 0!==e?e:{},Ie="2fr 1.5fr 1fr 1fr 1fr 1.2fr 84px",Be={padding:"6px 10px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:12.5,cursor:"pointer",outline:"none"},Me=["saas-crm","saas-productivity","saas-finance","saas-devtools","saas-other","mobil","bredband","el","skrivarleasing","kortterminal","molnvaxel","loneadmin","utrustningsleasing","managed-workplace","larm-bevakning","foretagshalsovard","bankavgifter","forsakring-foretag","serverhosting","it-support","faktura-tjanst","leasing-bil"],Ve="2fr 1.5fr 1.5fr 1.5fr",Ue="2fr 1.5fr 0.5fr 2fr 1.5fr";return(0,$c.jsxs)(ug,{children:[(0,$c.jsx)(pg,{children:"Arvo Admin"}),(0,$c.jsxs)(mg,{children:["Live-data fr\xe5n Neon Postgres \xb7 senast laddad ",(new Date).toLocaleTimeString("sv-SE")]}),(0,$c.jsxs)(fg,{children:[(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Totalt analyserade"}),(0,$c.jsx)(xg,{children:Ag(Re.total_analyses)})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Auto (klara)"}),(0,$c.jsx)(xg,{children:Ag(Re.auto_count)})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Review queue"}),(0,$c.jsx)(xg,{style:{color:"#F59E0B"},children:Ag(Re.review_count)})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Unika anv\xe4ndare"}),(0,$c.jsx)(xg,{children:Ag(Re.unique_users)})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Byten rekommenderade"}),(0,$c.jsx)(xg,{children:Ag(Re.switch_recommended)})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Snitt nettobesparing"}),(0,$c.jsxs)(xg,{children:[Ag(Re.avg_net_saving)," kr"]})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Waitlist"}),(0,$c.jsx)(xg,{children:null!==(t=null===z||void 0===z||null===(r=z.waitlist)||void 0===r?void 0:r.length)&&void 0!==t?t:"\u2013"})]}),(0,$c.jsxs)(hg,{children:[(0,$c.jsx)(gg,{children:"Feedback"}),(0,$c.jsx)(xg,{children:null!==(a=null===z||void 0===z||null===(i=z.feedback)||void 0===i?void 0:i.length)&&void 0!==a?a:"\u2013"})]})]}),(0,$c.jsxs)(vg,{children:[(0,$c.jsx)(bg,{children:"Databasmigration"}),(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)("div",{style:{padding:"16px 18px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[(0,$c.jsxs)("p",{style:{margin:0,fontSize:13,color:"rgba(255,255,255,.6)",flex:1},children:["Skapar tabellerna ",(0,$c.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"waitlist"}),","," ",(0,$c.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"invoice_feedback"})," och"," ",(0,$c.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"magic_tokens"})," i databasen. S\xe4kert att k\xf6ra flera g\xe5nger (IF NOT EXISTS)."]}),(0,$c.jsx)(Ng,{type:"button",onClick:async function(){W("loading"),G(null);try{const e=await fetch("/api/admin/run-migration",{method:"POST",headers:{"x-admin-token":w}}),t=await e.json();G(t),W(t.ok?"done":"error")}catch{W("error")}},disabled:"loading"===H,style:{background:"done"===H?"#16a34a":void 0},children:"loading"===H?"K\xf6r migration\u2026":"done"===H?"\u2713 Migration klar!":"K\xf6r migration \u2192"})]}),q&&(0,$c.jsx)("div",{style:{padding:"0 18px 16px",display:"flex",flexDirection:"column",gap:4},children:null===(o=q.results)||void 0===o?void 0:o.map(e=>(0,$c.jsxs)("div",{style:{fontSize:12,color:e.ok?"#5DD6CA":"#EF4444"},children:[e.ok?"\u2713":"\u2717"," ",e.name,e.error?` \u2014 ${e.error}`:""]},e.name))})]})]}),(0,$c.jsxs)(vg,{children:[(0,$c.jsx)(bg,{children:"Generera demo-l\xe4nk (Magic Link)"}),(0,$c.jsx)(kg,{children:(0,$c.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$c.jsx)("p",{style:{margin:"0 0 12px",fontSize:13,color:"rgba(255,255,255,.6)"},children:"Skickar en tidsbegr\xe4nsad l\xe4nk som ger direkt\xe5tkomst utan gate."}),(0,$c.jsxs)(Sg,{onSubmit:async function(e){if(e.preventDefault(),F){V("loading"),B("");try{const e=await fetch("/api/admin/magic-link",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":w},body:JSON.stringify({email:F,note:T||void 0,expiresInHours:Number(L)})}),t=await e.json();if(!e.ok)return void V("error");B(t.link),V("done")}catch{V("error")}}},children:[(0,$c.jsx)($g,{type:"email",placeholder:"mottagare@foretag.se",value:F,onChange:e=>O(e.target.value),required:!0}),(0,$c.jsx)($g,{placeholder:"Notering (frivillig)",value:T,onChange:e=>P(e.target.value),style:{maxWidth:200}}),(0,$c.jsx)($g,{type:"number",placeholder:"Timmar (default 72)",value:L,onChange:e=>R(e.target.value),style:{maxWidth:140}}),(0,$c.jsx)(Ng,{type:"submit",disabled:!F||"loading"===M,children:"loading"===M?"Genererar\u2026":"Skicka magic link \u2192"})]}),I&&(0,$c.jsxs)(Eg,{children:["\u2713 L\xe4nk skickad till ",F,(0,$c.jsx)("br",{}),(0,$c.jsx)("strong",{children:I})]}),"error"===M&&(0,$c.jsx)("p",{style:{color:"#EF4444",fontSize:12,marginTop:8},children:"Misslyckades \u2014 kontrollera ADMIN_TOKEN och RESEND_API_KEY."})]})})]}),(0,$c.jsx)("div",{style:{display:"flex",gap:4,marginBottom:16},children:[["queue","Review Queue"],["waitlist","Waitlist"],["feedback","Feedback"],["corrections","Korrektioner \ud83e\udde0"],["connections","Anslutningar \ud83d\udd17"],["outbound","Outbound \ud83d\ude80"],["prisbok","Prisboken \ud83d\udcd2"]].map(e=>{let[t,r]=e;return(0,$c.jsx)("button",{onClick:()=>K(t),style:{padding:"7px 16px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,background:U===t?"#5DD6CA":"rgba(255,255,255,.08)",color:U===t?"#0E1A17":"rgba(255,255,255,.6)"},children:r},t)})}),"queue"===U&&(0,$c.jsx)(vg,{children:(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:Ie,children:[(0,$c.jsx)("span",{children:"Leverant\xf6r"}),(0,$c.jsx)("span",{children:"Kategori"}),(0,$c.jsx)("span",{children:"\xc5rskkostnad"}),(0,$c.jsx)("span",{children:"Bransch"}),(0,$c.jsx)("span",{children:"Anst\xe4llda"}),(0,$c.jsx)("span",{children:"Datum"}),(0,$c.jsx)("span",{children:"\xc5tg\xe4rd"})]}),0===(null!==(s=null===z||void 0===z?void 0:z.reviewQueue)&&void 0!==s?s:[]).length&&(0,$c.jsx)(zg,{children:"Inga review_queue-fakturor \xe4nnu."}),(null!==(l=null===z||void 0===z?void 0:z.reviewQueue)&&void 0!==l?l:[]).map(e=>(0,$c.jsxs)(n.Fragment,{children:[(0,$c.jsxs)(jg,{$cols:Ie,children:[(0,$c.jsx)("span",{style:{fontWeight:600},children:e.supplier||e.normalized_supplier||"\u2013"}),(0,$c.jsx)(wg,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$c.jsxs)("span",{children:[Ag(e.annual_cost)," kr"]}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.industry}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.employees}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Cg(e.created_at)}),(0,$c.jsx)("button",{onClick:()=>{const t=ue===e.id;pe(t?null:e.id),ge(""),ve(""),fe("category"),je(null)},style:{padding:"4px 10px",borderRadius:100,border:"1px solid rgba(93,214,202,.3)",background:ue===e.id?"rgba(93,214,202,.15)":"transparent",color:"#5DD6CA",cursor:"pointer",fontSize:11.5,fontWeight:600},children:ue===e.id?"\u2715":"Korrigera"})]}),ue===e.id&&(0,$c.jsxs)("div",{style:{padding:"14px 16px",borderTop:"1px solid rgba(93,214,202,.12)",background:"rgba(93,214,202,.03)"},children:[(0,$c.jsx)("p",{style:{margin:"0 0 10px",fontSize:12,color:"rgba(255,255,255,.45)"},children:"Manuell korrektion \u2014 sparas som labeled data och tr\xe4nar systemet."}),(0,$c.jsxs)("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[(0,$c.jsxs)("select",{value:me,onChange:e=>{fe(e.target.value),ge("")},style:Be,children:[(0,$c.jsx)("option",{value:"category",children:"Kategori"}),(0,$c.jsx)("option",{value:"recurring",children:"\xc5terkommande"}),(0,$c.jsx)("option",{value:"route",children:"Route"})]}),"category"===me&&(0,$c.jsxs)("select",{value:he,onChange:e=>ge(e.target.value),style:Be,children:[(0,$c.jsx)("option",{value:"",children:"V\xe4lj r\xe4tt kategori\u2026"}),Me.map(e=>(0,$c.jsx)("option",{value:e,children:e},e))]}),"recurring"===me&&(0,$c.jsxs)("select",{value:he,onChange:e=>ge(e.target.value),style:Be,children:[(0,$c.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$c.jsx)("option",{value:"true",children:"true (\xe5terkommande)"}),(0,$c.jsx)("option",{value:"false",children:"false (eng\xe5ngskostnad)"})]}),"route"===me&&(0,$c.jsxs)("select",{value:he,onChange:e=>ge(e.target.value),style:Be,children:[(0,$c.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$c.jsx)("option",{value:"auto",children:"auto"}),(0,$c.jsx)("option",{value:"review_queue",children:"review_queue"}),(0,$c.jsx)("option",{value:"unsupported",children:"unsupported"})]}),(0,$c.jsx)($g,{placeholder:"Anledning (valfri)",value:xe,onChange:e=>ve(e.target.value),style:{flex:"1 1 140px",borderRadius:8,padding:"6px 12px",fontSize:12.5}}),(0,$c.jsx)(Ng,{type:"button",onClick:()=>async function(e){if(he&&!be){ke(!0);try{var t,r;const n="category"===me?null!==(t=e.category)&&void 0!==t?t:"":"recurring"===me?"false":"";(await fetch("/api/admin/corrections",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":w},body:JSON.stringify({analysisId:e.id,field:me,originalValue:n,correctedValue:he,reason:xe||"operator_manual_review",category:"category"===me?he:null!==(r=e.category)&&void 0!==r?r:null,supplier:e.normalized_supplier||e.supplier||null,operatorReasoning:te||null})})).ok&&(je(e.id),setTimeout(()=>{je(null),pe(null),ge(""),ve(""),re(""),fe("category")},2500))}catch{}finally{ke(!1)}}}(e),disabled:!he||be,style:{padding:"7px 18px",fontSize:12.5},children:be?"Sparar\u2026":"Spara \u2192"})]}),(0,$c.jsx)("textarea",{placeholder:"Resonemang / princip (valfri men v\xe4rdefullt \u2014 anv\xe4nds som few-shot-exempel i AI:n n\xe4sta g\xe5ng)",value:te,onChange:e=>re(e.target.value),style:{marginTop:8,width:"100%",boxSizing:"border-box",padding:"8px 12px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.05)",color:"#fff",fontSize:12,fontFamily:"inherit",resize:"vertical",minHeight:56,outline:"none"}}),ye===e.id&&(0,$c.jsx)("p",{style:{color:"#5DD6CA",fontSize:12,margin:"8px 0 0"},children:"\u2713 Korrektion sparad \u2014 systemet l\xe4r sig."})]})]},e.id))]})}),"waitlist"===U&&(0,$c.jsx)(vg,{children:(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:Ve,children:[(0,$c.jsx)("span",{children:"E-post"}),(0,$c.jsx)("span",{children:"K\xe4lla"}),(0,$c.jsx)("span",{children:"Reason"}),(0,$c.jsx)("span",{children:"Datum"})]}),0===(null!==(d=null===z||void 0===z?void 0:z.waitlist)&&void 0!==d?d:[]).length&&(0,$c.jsx)(zg,{children:"Ingen waitlist \xe4nnu."}),(null!==(c=null===z||void 0===z?void 0:z.waitlist)&&void 0!==c?c:[]).map(e=>{var t;return(0,$c.jsxs)(jg,{$cols:Ve,children:[(0,$c.jsx)("span",{style:{fontWeight:600},children:e.email}),(0,$c.jsx)(wg,{$c:"rgba(245,158,11,.15)",children:e.source}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.reason)&&void 0!==t?t:"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Cg(e.created_at)})]},e.id)})]})}),"feedback"===U&&(0,$c.jsx)(vg,{children:(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:Ue,children:[(0,$c.jsx)("span",{children:"Leverant\xf6r"}),(0,$c.jsx)("span",{children:"Kategori"}),(0,$c.jsx)("span",{children:"R\xf6st"}),(0,$c.jsx)("span",{children:"Kommentar"}),(0,$c.jsx)("span",{children:"Datum"})]}),0===(null!==(u=null===z||void 0===z?void 0:z.feedback)&&void 0!==u?u:[]).length&&(0,$c.jsx)(zg,{children:"Ingen feedback \xe4nnu."}),(null!==(p=null===z||void 0===z?void 0:z.feedback)&&void 0!==p?p:[]).map(e=>{var t,r;return(0,$c.jsxs)(jg,{$cols:Ue,children:[(0,$c.jsx)("span",{style:{fontWeight:600},children:e.supplier||"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.category)&&void 0!==t?t:"\u2013"}),(0,$c.jsx)("span",{style:{fontSize:18},children:"up"===e.vote?"\ud83d\udc4d":"\ud83d\udc4e"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(r=e.comment)&&void 0!==r?r:"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Cg(e.created_at)})]},e.id)})]})}),"corrections"===U&&(0,$c.jsxs)(vg,{children:[(0,$c.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"},children:[(0,$c.jsx)(bg,{style:{margin:0},children:"Flywheel \u2014 Labeled Corrections"}),(0,$c.jsxs)("div",{style:{marginLeft:"auto",display:"flex",gap:4,flexWrap:"wrap"},children:[[["list","Lista"],["patterns","M\xf6nster"],["learning","Aktiv inl\xe4rning \ud83d\udd2c"],["market","Marknadsdata \ud83d\udcca"]].map(e=>{let[t,r]=e;return(0,$c.jsx)("button",{onClick:()=>{ee(t);const e={"x-admin-token":w};"patterns"!==t||Q||fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return X(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"!==t||Y||fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return J(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"!==t||ne||fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ae(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"!==t||ie||fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>oe(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:Z===t?"#5DD6CA":"rgba(255,255,255,.08)",color:Z===t?"#0E1A17":"rgba(255,255,255,.6)"},children:r},t)}),(0,$c.jsx)("button",{onClick:()=>{const e={"x-admin-token":w};"patterns"===Z&&fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return X(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"===Z&&fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return J(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"===Z&&fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ae(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"===Z&&fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>oe(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]})]}),"list"===Z&&(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$c.jsx)("span",{children:"F\xe4lt"}),(0,$c.jsx)("span",{children:"Fr\xe5n"}),(0,$c.jsx)("span",{children:"Till"}),(0,$c.jsx)("span",{children:"Anledning"}),(0,$c.jsx)("span",{children:"Av"}),(0,$c.jsx)("span",{children:"Datum"})]}),null===Y&&(0,$c.jsx)(zg,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta korrektioner."}),0===(null===Y||void 0===Y?void 0:Y.length)&&(0,$c.jsx)(zg,{children:"Inga korrektioner \xe4nnu \u2014 systemet \xe4r nytt."}),(null!==Y&&void 0!==Y?Y:[]).map(e=>(0,$c.jsxs)(n.Fragment,{children:[(0,$c.jsxs)(jg,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$c.jsx)(wg,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$c.jsx)("span",{style:{color:"rgba(255,100,100,.8)",fontSize:11.5},children:e.original_value||"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(100,220,180,.8)",fontSize:11.5},children:e.corrected_value||"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.45)",fontSize:11},children:e.reason}),(0,$c.jsx)(wg,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:Cg(e.created_at)})]}),e.operator_reasoning&&(0,$c.jsxs)("div",{style:{padding:"6px 16px 10px",borderTop:"1px solid rgba(255,255,255,.04)",background:"rgba(93,214,202,.02)"},children:[(0,$c.jsx)("span",{style:{fontSize:10.5,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",color:"rgba(93,214,202,.5)",marginRight:8},children:"Princip"}),(0,$c.jsx)("span",{style:{fontSize:12,color:"rgba(255,255,255,.55)"},children:e.operator_reasoning})]})]},e.id))]}),"patterns"===Z&&(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"1fr 2fr 80px 80px",children:[(0,$c.jsx)("span",{children:"F\xe4lt"}),(0,$c.jsx)("span",{children:"M\xf6nster (reason)"}),(0,$c.jsx)("span",{children:"Antal"}),(0,$c.jsx)("span",{children:"Av"})]}),null===Q&&(0,$c.jsx)(zg,{children:"Klicka \u21bb Ladda f\xf6r att analysera m\xf6nster."}),0===(null===Q||void 0===Q?void 0:Q.length)&&(0,$c.jsx)(zg,{children:"Inga m\xf6nster \xe4nnu."}),(null!==Q&&void 0!==Q?Q:[]).map((e,t)=>(0,$c.jsxs)(jg,{$cols:"1fr 2fr 80px 80px",children:[(0,$c.jsx)(wg,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.6)",fontSize:11.5},children:e.reason}),(0,$c.jsxs)("span",{style:{fontWeight:700,color:e.count>=5?"#F59E0B":"#5DD6CA"},children:[e.count,"\xd7"]}),(0,$c.jsx)(wg,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by})]},t))]}),"learning"===Z&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)("div",{style:{marginBottom:12,padding:"10px 14px",background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,fontSize:12.5,color:"rgba(255,255,255,.7)"},children:"Leverant\xf6rer som inte matchar n\xe5got k\xe4nt fingerprint \u2014 flaggade automatiskt av pipeline. L\xe4gg till korrektion f\xf6r att l\xe4ra systemet."}),(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"2fr 80px 1.5fr",children:[(0,$c.jsx)("span",{children:"Leverant\xf6r (ok\xe4nd)"}),(0,$c.jsx)("span",{children:"Sedd"}),(0,$c.jsx)("span",{children:"Senast"})]}),null===ne&&(0,$c.jsx)(zg,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta k\xf6n."}),0===(null===ne||void 0===ne?void 0:ne.length)&&(0,$c.jsx)(zg,{children:"Inga ok\xe4nda leverant\xf6rer \u2014 systemet k\xe4nner igen alla det sett."}),(null!==ne&&void 0!==ne?ne:[]).map((e,t)=>(0,$c.jsxs)(jg,{$cols:"2fr 80px 1.5fr",children:[(0,$c.jsx)("span",{style:{fontWeight:600,color:"#F59E0B"},children:e.supplier}),(0,$c.jsxs)("span",{style:{fontWeight:700,color:e.seen_count>=3?"#EF4444":"#F59E0B"},children:[e.seen_count,"\xd7"]}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Cg(e.last_seen)})]},t))]})]}),"market"===Z&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20},children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)(bg,{children:"Kategorif\xf6rdelning (operat\xf6rskorrektioner)"}),(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"2fr 80px",children:[(0,$c.jsx)("span",{children:"Kategori"}),(0,$c.jsx)("span",{children:"Antal"})]}),!ie&&(0,$c.jsx)(zg,{children:"Klicka \u21bb Ladda."}),0===(null===ie||void 0===ie||null===(m=ie.categoryDist)||void 0===m?void 0:m.length)&&(0,$c.jsx)(zg,{children:"Inga korrektioner \xe4nnu."}),(null!==(f=null===ie||void 0===ie?void 0:ie.categoryDist)&&void 0!==f?f:[]).map((e,t)=>(0,$c.jsxs)(jg,{$cols:"2fr 80px",children:[(0,$c.jsx)(wg,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$c.jsxs)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:[e.count,"\xd7"]})]},t))]})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)(bg,{children:"Mest korrigerade leverant\xf6rer"}),(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"2fr 80px 1fr",children:[(0,$c.jsx)("span",{children:"Leverant\xf6r"}),(0,$c.jsx)("span",{children:"Korr."}),(0,$c.jsx)("span",{children:"Senast"})]}),!ie&&(0,$c.jsx)(zg,{children:"Klicka \u21bb Ladda."}),0===(null===ie||void 0===ie||null===(h=ie.topSuppliers)||void 0===h?void 0:h.length)&&(0,$c.jsx)(zg,{children:"Inga korrektioner \xe4nnu."}),(null!==(g=null===ie||void 0===ie?void 0:ie.topSuppliers)&&void 0!==g?g:[]).map((e,t)=>(0,$c.jsxs)(jg,{$cols:"2fr 80px 1fr",children:[(0,$c.jsx)("span",{style:{fontWeight:600,fontSize:12},children:e.supplier}),(0,$c.jsxs)("span",{style:{fontWeight:700,color:e.correction_count>=5?"#F59E0B":"#5DD6CA"},children:[e.correction_count,"\xd7"]}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:Cg(e.last_corrected)})]},t))]})]})]}),(0,$c.jsx)(bg,{children:"Nya leverant\xf6rer per vecka (senaste 90 dagar)"}),(null===ie||void 0===ie||null===(x=ie.discoveryTrend)||void 0===x?void 0:x.length)>0?(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"2fr 1fr",children:[(0,$c.jsx)("span",{children:"Vecka"}),(0,$c.jsx)("span",{children:"Ny leverant\xf6rer"})]}),(null!==(v=ie.discoveryTrend)&&void 0!==v?v:[]).map((e,t)=>(0,$c.jsxs)(jg,{$cols:"2fr 1fr",children:[(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:12},children:e.week}),(0,$c.jsx)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:e.new_suppliers})]},t))]}):(0,$c.jsx)(zg,{children:ie?"Inga data \xe4nnu \u2014 skicka in fakturor f\xf6r att bygga marknadsdata.":"Klicka \u21bb Ladda."})]})]}),"connections"===U&&(0,$c.jsxs)(vg,{children:[(0,$c.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center"},children:[(0,$c.jsx)(bg,{style:{margin:0},children:"OAuth-anslutningar \u2014 Gmail & Outlook"}),(0,$c.jsx)("button",{onClick:()=>{fetch("/api/admin/connections",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(e=>{var t,r;le(null!==(t=e.connections)&&void 0!==t?t:[]),ce(null!==(r=e.stats)&&void 0!==r?r:[])}).catch(()=>{})},style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),de&&de.length>0&&(0,$c.jsx)("div",{style:{display:"flex",gap:10,marginBottom:14},children:de.map(e=>(0,$c.jsxs)("div",{style:{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"10px 16px",minWidth:130},children:[(0,$c.jsx)(gg,{children:e.provider}),(0,$c.jsxs)("div",{style:{display:"flex",gap:12,marginTop:4},children:[(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#5DD6CA"},children:e.total}),(0,$c.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"totalt"})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#4ADE80"},children:e.active}),(0,$c.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"aktiva"})]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#F59E0B"},children:e.last_7d}),(0,$c.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"7 dagar"})]})]})]},e.provider))}),(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$c.jsx)("span",{children:"E-post"}),(0,$c.jsx)("span",{children:"Leverant\xf6r"}),(0,$c.jsx)("span",{children:"Token"}),(0,$c.jsx)("span",{children:"Kopplad"}),(0,$c.jsx)("span",{children:"Uppdaterad"}),(0,$c.jsx)("span",{children:"Status"})]}),null===se&&(0,$c.jsx)(zg,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta anslutningar."}),0===(null===se||void 0===se?void 0:se.length)&&(0,$c.jsx)(zg,{children:"Inga anslutningar \xe4nnu \u2014 ingen har kopplat Gmail/Outlook."}),(null!==se&&void 0!==se?se:[]).map(e=>(0,$c.jsxs)(jg,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$c.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.email}),(0,$c.jsx)(wg,{$c:"gmail"===e.provider?"rgba(234,67,53,.2)":"rgba(0,120,212,.2)",children:e.provider}),(0,$c.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.4)"},children:e.token_expiry?new Date(e.token_expiry).toLocaleDateString("sv-SE"):"\u2013"}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Cg(e.created_at)}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Cg(e.updated_at)}),(0,$c.jsx)(wg,{$c:e.token_valid?"rgba(74,222,128,.2)":"rgba(239,68,68,.2)",children:e.token_valid?"OK":"Utg\xe5ngen"})]},e.id))]})]}),"prisbok"===U&&(0,$c.jsxs)(vg,{children:[(0,$c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:12},children:[(0,$c.jsx)(bg,{style:{margin:0},children:"Prisbokens cellteckning"}),(0,$c.jsx)("button",{onClick:Pe,style:{marginLeft:"auto",padding:"6px 14px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)"},children:"Uppdatera"})]}),Oe?(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)("p",{style:{fontSize:12.5,color:"rgba(255,255,255,.55)",margin:"0 0 14px"},children:[null!==(b=Oe.total_datapoints)&&void 0!==b?b:0," datapunkter totalt \xb7 ",null!==(k=Oe.segments_with_real_data)&&void 0!==k?k:0," celler b\xe4r (\u2265",Oe.min_points_threshold,") \xb7 celler n\xe4ra tr\xf6skeln fylls medvetet \u2014 v\xe4lj n\xe4sta outbound-lista p\xe5 SNI-koder som tippar dem \xf6ver."]}),(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"1.2fr 1fr .8fr .5fr .8fr",children:[(0,$c.jsx)("span",{children:"Kategori"}),(0,$c.jsx)("span",{children:"Bransch"}),(0,$c.jsx)("span",{children:"Storlek"}),(0,$c.jsx)("span",{children:"n"}),(0,$c.jsx)("span",{children:"Status"})]}),0===(null!==(y=Oe.segments)&&void 0!==y?y:[]).length&&(0,$c.jsx)(zg,{children:"Prisboken \xe4r tom \u2014 varje analyserad faktura l\xe4gger en datapunkt."}),(null!==(j=Oe.segments)&&void 0!==j?j:[]).map((e,t)=>(0,$c.jsxs)(jg,{$cols:"1.2fr 1fr .8fr .5fr .8fr",children:[(0,$c.jsx)("span",{style:{fontWeight:600},children:e.category}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.6)"},children:e.industry}),(0,$c.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.size_bucket}),(0,$c.jsx)("span",{style:{fontWeight:700},children:e.n}),(0,$c.jsx)(wg,{$c:"B\xc4R"===e.status?"rgba(93,214,202,.2)":"LIVE-LIGHT"===e.status?"rgba(93,214,202,.12)":"N\xc4RA"===e.status?"rgba(245,158,11,.15)":"rgba(255,255,255,.08)",children:e.status})]},t))]})]}):(0,$c.jsx)(zg,{children:"Klicka Uppdatera f\xf6r att l\xe4sa cellteckningen."})]}),"outbound"===U&&(0,$c.jsxs)(vg,{children:[(0,$c.jsx)("div",{style:{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"},children:[["Skapade",null===$e||void 0===$e?void 0:$e.total,"#5DD6CA"],["Mail skickade",null===$e||void 0===$e?void 0:$e.email_sent,"#5DD6CA"],["\xd6ppnade l\xe4nken",null===$e||void 0===$e?void 0:$e.opened,"#F59E0B"],["Konverterade",null===$e||void 0===$e?void 0:$e.converted,"#4ADE80"]].map(e=>{let[t,r,n]=e;return(0,$c.jsxs)(hg,{style:{minWidth:120},children:[(0,$c.jsx)(gg,{children:t}),(0,$c.jsx)(xg,{style:{color:n},children:null!==r&&void 0!==r?r:"\u2013"})]},t)})}),(0,$c.jsx)(bg,{children:"Skapa prospect"}),(0,$c.jsx)(kg,{children:(0,$c.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$c.jsxs)("form",{onSubmit:async function(e){if(e.preventDefault(),"loading"!==ze&&Ee.companyName&&Ee.employees){Ce("loading"),De(null);try{const e=await fetch("/api/generate-prospect",{method:"POST",headers:{"Content-Type":"application/json","x-arvo-admin":w},body:JSON.stringify({companyName:Ee.companyName,sniCode:Ee.sniCode||void 0,employees:Number(Ee.employees),contactEmail:Ee.contactEmail||void 0,sendEmail:Ee.sendEmail,createdBy:"admin-ui"})}),t=await e.json();De(t),t.ok&&(_e({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),Le())}catch{De({ok:!1,error:"N\xe4tverksfel"})}finally{Ce("idle")}}},style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"},children:[(0,$c.jsx)($g,{placeholder:"Bolagsnamn *",value:Ee.companyName,onChange:e=>_e(t=>({...t,companyName:e.target.value})),style:{minWidth:180,borderRadius:8}}),(0,$c.jsx)($g,{placeholder:"SNI-kod (t.ex. 41)",value:Ee.sniCode,onChange:e=>_e(t=>({...t,sniCode:e.target.value})),style:{width:130,borderRadius:8}}),(0,$c.jsx)($g,{placeholder:"Antal anst. *",type:"number",value:Ee.employees,onChange:e=>_e(t=>({...t,employees:e.target.value})),style:{width:110,borderRadius:8}}),(0,$c.jsx)($g,{placeholder:"Kontakt-mail",value:Ee.contactEmail,onChange:e=>_e(t=>({...t,contactEmail:e.target.value})),style:{minWidth:200,borderRadius:8}}),(0,$c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"rgba(255,255,255,.6)",whiteSpace:"nowrap",cursor:"pointer"},children:[(0,$c.jsx)("input",{type:"checkbox",checked:Ee.sendEmail,onChange:e=>_e(t=>({...t,sendEmail:e.target.checked}))}),"Skicka mail"]}),(0,$c.jsx)(Ng,{type:"submit",disabled:"loading"===ze||!Ee.companyName||!Ee.employees,children:"loading"===ze?"\u2026":"Skapa \u2192"})]}),Ae&&(0,$c.jsx)("div",{style:{marginTop:10,padding:"10px 14px",borderRadius:8,background:Ae.ok?"rgba(74,222,128,.1)":"rgba(239,68,68,.1)",border:"1px solid "+(Ae.ok?"rgba(74,222,128,.25)":"rgba(239,68,68,.25)")},children:Ae.ok?(0,$c.jsxs)("span",{style:{fontSize:12.5,color:"#4ADE80"},children:["\u2713 Skapad:\xa0",(0,$c.jsx)("a",{href:Ae.url,target:"_blank",rel:"noopener noreferrer",style:{color:"#5DD6CA",wordBreak:"break-all"},children:Ae.url}),Ae.emailSent&&" \xb7 mail skickat"]}):(0,$c.jsxs)("span",{style:{fontSize:12.5,color:"#F87171"},children:["Fel: ",Ae.error]})})]})}),(0,$c.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:12,marginTop:20,alignItems:"center"},children:[(0,$c.jsx)(bg,{style:{margin:0},children:"Prospects"}),(0,$c.jsx)("button",{onClick:Le,style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),(0,$c.jsxs)(kg,{children:[(0,$c.jsxs)(yg,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$c.jsx)("span",{children:"Bolag"}),(0,$c.jsx)("span",{children:"Bransch"}),(0,$c.jsx)("span",{children:"Anst."}),(0,$c.jsx)("span",{children:"Mail skickat"}),(0,$c.jsx)("span",{children:"\xd6ppnat"}),(0,$c.jsx)("span",{children:"\xc5tg\xe4rd"}),(0,$c.jsx)("span",{children:"Skapad"})]}),null===we&&(0,$c.jsx)(zg,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta prospects."}),0===(null===we||void 0===we?void 0:we.length)&&(0,$c.jsx)(zg,{children:"Inga prospects \xe4n \u2014 skapa ett ovan."}),(null!==we&&void 0!==we?we:[]).map(e=>{var t;return(0,$c.jsxs)(jg,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$c.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.company_name}),(0,$c.jsx)("span",{style:{fontSize:11.5,color:"rgba(255,255,255,.50)"},children:e.industry}),(0,$c.jsx)("span",{style:{fontSize:12},children:e.employees}),(0,$c.jsx)("span",{style:{fontSize:11,color:e.email_sent_at?"rgba(255,255,255,.5)":"rgba(255,255,255,.2)"},children:Cg(e.email_sent_at)}),(0,$c.jsx)("span",{style:{fontSize:11,color:e.opened_at?"#F59E0B":"rgba(255,255,255,.2)"},children:Cg(e.opened_at)}),(0,$c.jsx)(wg,{$c:"upload"===e.action?"rgba(74,222,128,.25)":"activate"===e.action?"rgba(93,214,202,.25)":"rgba(255,255,255,.07)",children:null!==(t=e.action)&&void 0!==t?t:"\u2013"}),(0,$c.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.30)"},children:Cg(e.created_at)})]},e.id)})]})]})]})}const Fg=vc.div`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`,Og=vc.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 48px 44px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 32px rgba(0,0,0,.07);
  @media (max-width: 520px) { padding: 36px 24px; }
`,Tg=vc.div`
  margin-bottom: 36px;
`,Pg=vc.p`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin: 0 0 10px;
`,Lg=vc.h1`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 10px;
  line-height: 1.3;
`,Rg=vc.p`
  font-size: 14.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin: 0 0 32px;
`,Ig=vc.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,Bg=vc.input`
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
`,Mg=vc.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin-bottom: 8px;
  letter-spacing: 0.01em;
`,Vg=vc.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 0 24px;
`,Ug=vc(vs)`
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  text-decoration: none;
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`;function Kg(){const e=new URLSearchParams(window.location.search),t=e.get("id"),r=e.get("svar"),[a,i]=(0,n.useState)("ja"===r?"cost":"nej"===r?"submitting-no":"question"),[o,s]=(0,n.useState)(""),[l,d]=(0,n.useState)("idle"),[c,u]=(0,n.useState)("");async function p(e,r){if(t){d("submitting");try{const n=await fetch("/api/outcome-survey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:t,switched:e,actualAnnualCost:r?Number(String(r).replace(/\s/g,"")):null})}),a=await n.json();a.supplier&&u(a.supplier),d("done")}catch{d("error")}}else d("done")}return(0,n.useEffect)(()=>{"nej"===r&&t&&p(!1,null)},[]),"done"===l?(0,$c.jsx)(Fg,{children:(0,$c.jsxs)(Og,{children:[(0,$c.jsx)(Tg,{children:(0,$c.jsx)(vs,{to:"/",children:(0,$c.jsx)(Pc,{})})}),(0,$c.jsx)(Vg,{children:"\u2713"}),(0,$c.jsx)(Lg,{children:"Tack \u2014 det hj\xe4lper oss mycket."}),(0,$c.jsxs)(Rg,{children:["Varje svar g\xf6r Arvo lite mer precis. N\xe4sta kund som analyserar en",c?` ${c}`:"","-faktura drar nytta av det ni just ber\xe4ttade."]}),(0,$c.jsx)(Bc,{as:vs,to:"/testa-faktura",$variant:"gradient",$size:"md",children:"Analysera en ny faktura \u2192"})]})}):"submitting-no"===a||"nej"===r&&"done"!==l?(0,$c.jsx)(Fg,{children:(0,$c.jsxs)(Og,{style:{textAlign:"center"},children:[(0,$c.jsx)(Tg,{style:{textAlign:"left"},children:(0,$c.jsx)(vs,{to:"/",children:(0,$c.jsx)(Pc,{})})}),(0,$c.jsx)(Rg,{style:{margin:"32px 0 0"},children:"Registrerar ert svar\u2026"})]})}):(0,$c.jsx)(Fg,{children:(0,$c.jsxs)(Og,{children:[(0,$c.jsx)(Tg,{children:(0,$c.jsx)(vs,{to:"/",children:(0,$c.jsx)(Pc,{})})}),(0,$c.jsx)(Pg,{children:"60-dagars uppf\xf6ljning"}),"question"===a&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Lg,{children:"Bytte ni leverant\xf6r efter analysen?"}),(0,$c.jsx)(Rg,{children:"Det tar 30 sekunder och hj\xe4lper oss att bli mer precisa f\xf6r er och alla kommande kunder."}),(0,$c.jsxs)(Ig,{children:[(0,$c.jsx)(Bc,{$variant:"gradient",$size:"md",onClick:()=>i("cost"),children:"Ja, vi bytte \u2192"}),(0,$c.jsx)(Bc,{$variant:"ghost",$size:"md",onClick:()=>p(!1,null),children:"Inte \xe4n"})]})]}),"cost"===a&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(Lg,{children:"Vad betalar ni nu per \xe5r?"}),(0,$c.jsx)(Rg,{children:"Ange er nya \xe5rskostnad (kr/\xe5r) \u2014 vi j\xe4mf\xf6r med vad vi f\xf6rutsp\xe5dde."}),(0,$c.jsx)(Mg,{htmlFor:"actual-cost",children:"Ny \xe5rskostnad (kr)"}),(0,$c.jsx)(Bg,{id:"actual-cost",type:"text",inputMode:"numeric",placeholder:"t.ex. 48 000",value:o,onChange:e=>s(e.target.value),autoFocus:!0}),(0,$c.jsxs)(Ig,{children:[(0,$c.jsx)(Bc,{$variant:"gradient",$size:"md",disabled:"submitting"===l,onClick:()=>p(!0,o),children:"submitting"===l?"Sparar\u2026":"Skicka \u2192"}),(0,$c.jsx)(Bc,{$variant:"ghost",$size:"sm",onClick:()=>p(!0,null),children:"Hoppa \xf6ver kostnaden"})]}),"error"===l&&(0,$c.jsx)("p",{style:{color:"#D94F3C",fontSize:13,margin:"8px 0 0"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$c.jsx)(Ug,{to:"/",children:"\u2190 Tillbaka till startsidan"})]})})}const Hg=jc`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,Wg=jc`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
`,qg=jc`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
`,Gg=jc`
  from { stroke-dashoffset: 24; }
  to   { stroke-dashoffset: 0; }
`,Yg=jc`
  to { transform: rotate(360deg); }
`,Jg=vc.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: #0A1512;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`,Qg=vc.section`
  height: 100vh;
  min-height: 600px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`,Xg=vc(Qg)`
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
`,Zg=vc.p`
  margin: 16px 0 4px;
  font-size: 11px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .18em;
  animation: ${Hg} 0.7s ease both;
`,ex=vc.p`
  margin: 0 0 48px;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  animation: ${Hg} 0.7s 0.1s ease both;
`,tx=vc.p`
  margin: 0 0 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .12em;
  animation: ${Hg} 0.7s 0.2s ease both;
`,rx=vc.p`
  margin: 0 0 6px;
  font-size: clamp(52px, 9vw, 80px);
  font-weight: 800;
  color: #fff;
  line-height: 1;
  letter-spacing: -.03em;
  animation: ${Hg} 0.7s 0.25s ease both;
`,nx=vc.span`
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 400;
  color: rgba(255,255,255,0.40);
  margin-left: 8px;
`,ax=vc.p`
  margin: 0 0 56px;
  font-size: 17px;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  animation: ${Hg} 0.7s 0.35s ease both;

  strong { color: #fff; }
`,ix=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: ${Hg} 0.7s 0.5s ease both;
`,ox=vc.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .06em;
`,sx=vc.div`
  width: 20px;
  height: 20px;
  color: rgba(29,176,154,0.5);
  animation: ${Wg} 1.6s ease-in-out infinite;
`,lx=vc.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;

  @media (max-width: 480px) { display: none; }
`,dx=vc.button`
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
`,cx=vc(Qg)`
  padding: 0;
  background: radial-gradient(ellipse at 80% 20%, rgba(29,176,154,0.07) 0%, transparent 60%),
              #0A1512;
`,ux=vc.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 56px 36px 36px;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) { padding: 48px 24px 28px; }
`,px=vc.p`
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
`,mx=vc.span`
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
`,fx=vc.span`
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
`,hx=vc.h1`
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
`,gx=vc.p`
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
`,xx=vc.div`
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
`,vx=vc.div`
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 18px 20px;
`,bx=vc.p`
  margin: 0 0 4px;
  font-size: ${e=>{let{$primary:t}=e;return t?"clamp(28px, 5vw, 40px)":"clamp(20px, 3.5vw, 28px)"}};
  font-weight: 800;
  color: ${e=>{let{$primary:t}=e;return t?"#fff":"rgba(255,255,255,0.75)"}};
  line-height: 1;
  letter-spacing: -.02em;
`,kx=vc.span`
  font-size: 0.55em;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  margin-left: 4px;
`,yx=vc.p`
  margin: 0;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .08em;
`,jx=vc.p`
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
`,wx=vc.div`
  padding-top: 24px;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.38s ease, transform 0.5s 0.38s ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Sx=vc.button`
  width: 100%;
  padding: 17px 24px;
  border: none;
  border-radius: 12px;
  background: ${e=>{let{$done:t}=e;return t?"rgba(29,176,154,0.15)":"linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%)"}};
  color: ${e=>{let{$done:t}=e;return t?"#1DB09A":"#fff"}};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: .01em;
  cursor: ${e=>{let{$done:t,$loading:r}=e;return t||r?"default":"pointer"}};
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
`,$x=vc.span`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${Yg} 0.7s linear infinite;
`,Nx=(vc.button`
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
`,vc(Qg)`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 32px;
  background: radial-gradient(ellipse at 50% 40%, rgba(29,176,154,0.09) 0%, transparent 65%),
              #0A1512;
`),Ex=vc.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(29,176,154,0.15);
  border: 1.5px solid rgba(29,176,154,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: ${Hg} 0.6s ease both;

  svg { overflow: visible; }

  svg path {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: ${Gg} 0.5s 0.3s ease forwards;
  }
`,_x=vc.h2`
  margin: 0 0 12px;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  animation: ${Hg} 0.6s 0.1s ease both;
`,zx=vc.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  max-width: 440px;
  animation: ${Hg} 0.6s 0.2s ease both;
`,Cx=vc.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${Hg} 0.6s 0.3s ease both;
`,Ax=vc.div`
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.20);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
`,Dx=vc.span`
  font-size: 16px;
  flex-shrink: 0;
`,Fx=vc.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.80);
  line-height: 1.4;

  strong { color: #fff; }
`,Ox=vc.p`
  margin: 0 0 36px;
  font-size: 14px;
  color: #1DB09A;
  animation: ${Hg} 0.6s 0.4s ease both;
`,Tx=vc.a`
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
  animation: ${Hg} 0.6s 0.45s ease both;

  &:hover {
    background: rgba(255,255,255,0.11);
    color: #fff;
  }
`,Px=vc.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  gap: 20px;
`,Lx=vc.div`
  display: flex;
  gap: 8px;
`,Rx=vc.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1DB09A;
  animation: ${qg} 1.2s ${e=>{let{$i:t}=e;return.2*t}}s ease-in-out infinite;
`,Ix=vc.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  letter-spacing: .04em;
`,Bx=vc.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  padding: 32px;
  text-align: center;
`,Mx=vc.div`
  font-size: 40px;
  margin-bottom: 20px;
`,Vx=vc.h1`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`,Ux=vc.p`
  margin: 0 0 32px;
  font-size: 15px;
  color: rgba(255,255,255,0.45);
  max-width: 360px;
  line-height: 1.6;
`,Kx=vc.a`
  background: linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%);
  color: #fff;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  transition: opacity 0.2s;

  &:hover { opacity: 0.88; }
`,Hx=e=>Math.round(null!==e&&void 0!==e?e:0).toLocaleString("sv-SE");const Wx={recommendation:"Bytesrekommendation",cost_trend:"Prish\xf6jning",overpaying:"\xd6verpris",price_alert:"Prish\xf6jningsvarning"};function qx(e){if(!e)return"";const[t,r]=e.split("-").map(Number),n=new Date(t,r-1,1).toLocaleString("sv-SE",{month:"long",year:"numeric"});return n.charAt(0).toUpperCase()+n.slice(1)}const Gx=e=>{let{size:t=36}=e;return(0,$c.jsxs)("svg",{width:t,height:t,viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",children:[(0,$c.jsx)("defs",{children:(0,$c.jsxs)("linearGradient",{id:"briefingGrad",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$c.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$c.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$c.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#briefingGrad)"})]})},Yx=()=>(0,$c.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:(0,$c.jsx)("path",{d:"M10 4v12M4 10l6 6 6-6",stroke:"#1DB09A",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),Jx=()=>(0,$c.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",fill:"none",children:(0,$c.jsx)("path",{d:"M6 14l6 6 10-12",stroke:"#1DB09A",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})});function Qx(){var e;const{token:t}=mo(),[r,a]=(0,n.useState)("loading"),[i,o]=(0,n.useState)(null),[s,l]=(0,n.useState)(""),[d,c]=(0,n.useState)(0),[u,p]=(0,n.useState)({}),[m,f]=(0,n.useState)({}),[h,g]=(0,n.useState)({}),x=(0,n.useRef)(null),v=(0,n.useRef)([]),b=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1300;const[r,a]=(0,n.useState)(0);return(0,n.useEffect)(()=>{if(!e)return;const r=performance.now();let n;const i=o=>{const s=Math.min(1,(o-r)/t),l=1-Math.pow(1-s,3);a(Math.round(l*e)),s<1&&(n=requestAnimationFrame(i))};return n=requestAnimationFrame(i),()=>cancelAnimationFrame(n)},[e,t]),r}("ready"===r?null===i||void 0===i?void 0:i.totalSavingPotential:0);(0,n.useEffect)(()=>{if(!t)return a("error"),void l("Ogiltig l\xe4nk");fetch(`/api/briefing?token=${encodeURIComponent(t)}`).then(e=>e.json()).then(e=>{var t,r;if(!e.ok)return a("error"),void l(null!==(r=e.error)&&void 0!==r?r:"Ok\xe4nt fel");o(e.briefing),g(null!==(t=e.briefing.actionsTaken)&&void 0!==t?t:{}),a("ready")}).catch(()=>{a("error"),l("Kunde inte h\xe4mta briefingen")})},[t]),(0,n.useEffect)(()=>{if("ready"!==r)return;const e=new IntersectionObserver(e=>{e.forEach(e=>{const t=Number(e.target.dataset.cardIndex);e.isIntersecting&&(p(e=>({...e,[t]:!0})),c(t))})},{threshold:.4,root:x.current});return v.current.forEach(t=>{t&&e.observe(t)}),()=>e.disconnect()},[r,i]);const k=(0,n.useCallback)(async(e,r)=>{if("loading"!==m[e]&&"done"!==m[e]){f(t=>({...t,[e]:"loading"}));try{const a=await fetch(`/api/briefing?token=${encodeURIComponent(t)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({insightId:e,action:r})}),i=await a.json();var n;if(a.ok&&i.ok)f(t=>({...t,[e]:"done"})),g(null!==(n=i.actionsTaken)&&void 0!==n?n:{});else f(t=>({...t,[e]:"idle"}))}catch{f(t=>({...t,[e]:"idle"}))}}},[t,m]),y=(0,n.useCallback)(e=>{const t=v.current[e];t&&t.scrollIntoView({behavior:"smooth",block:"start"})},[]);if("loading"===r)return(0,$c.jsxs)(Px,{children:[(0,$c.jsx)(Lx,{children:[0,1,2].map(e=>(0,$c.jsx)(Rx,{$i:e},e))}),(0,$c.jsx)(Ix,{children:"H\xe4mtar din Arvo-briefing\u2026"})]});if("error"===r)return(0,$c.jsxs)(Bx,{children:[(0,$c.jsx)(Mx,{children:"\ud83d\udd12"}),(0,$c.jsx)(Vx,{children:"Briefingen hittades inte"}),(0,$c.jsxs)(Ux,{children:[s||"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig."," ","Ladda upp en ny faktura s\xe5 genererar Arvo en uppdaterad briefing \xe5t er."]}),(0,$c.jsx)(Kx,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const j=null!==(e=null===i||void 0===i?void 0:i.insights)&&void 0!==e?e:[],w=1+j.length+1,S=Object.keys(h).length>0;return(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(lx,{children:Array.from({length:w},(e,t)=>(0,$c.jsx)(dx,{$active:d===t,onClick:()=>y(t),"aria-label":`G\xe5 till kort ${t+1}`},t))}),(0,$c.jsxs)(Jg,{ref:x,children:[(0,$c.jsxs)(Xg,{"data-card-index":"0",ref:e=>{v.current[0]=e},children:[(0,$c.jsx)(Gx,{size:44}),(0,$c.jsx)(Zg,{children:"Arvo Intelligence"}),(0,$c.jsx)(ex,{children:qx(null===i||void 0===i?void 0:i.period)}),(0,$c.jsx)(tx,{children:"Potentiell besparing"}),(0,$c.jsxs)(rx,{children:[Hx(b),(0,$c.jsx)(nx,{children:"kr/\xe5r"})]}),(0,$c.jsxs)(ax,{children:["Arvo har identifierat"," ",(0,$c.jsxs)("strong",{children:[j.length," ",1===j.length?"besparingsinsikt":"besparingsinsikter"]})," ","f\xf6r ert bolag"]}),(0,$c.jsxs)(ix,{children:[(0,$c.jsx)(ox,{children:"Scrolla f\xf6r att se insikterna"}),(0,$c.jsx)(sx,{children:(0,$c.jsx)(Yx,{})})]})]}),j.map((e,t)=>{var r,n,a,i,o,s,l,d,c,p,f,g;const x=t+1,b=!!u[x],y=null!==(r=m[e.id])&&void 0!==r?r:"idle",w="done"===y||!!h[e.id],S="loading"===y;return(0,$c.jsx)(cx,{"data-card-index":String(x),ref:e=>{v.current[x]=e},children:(0,$c.jsxs)(ux,{children:[(0,$c.jsxs)(px,{$visible:b,children:["INSIKT ",t+1," AV ",j.length]}),(0,$c.jsxs)("div",{children:[(0,$c.jsx)(fx,{$type:e.type,children:null!==(n=Wx[e.type])&&void 0!==n?n:e.type}),(0,$c.jsx)(mx,{$visible:b,children:e.supplier})]}),(0,$c.jsx)(hx,{$visible:b,children:e.headline}),(0,$c.jsx)(gx,{$visible:b,children:e.subheadline}),(0,$c.jsxs)(xx,{$visible:b,children:[(0,$c.jsxs)(vx,{children:[(0,$c.jsxs)(bx,{$primary:!0,children:[Hx(null===(a=e.metric)||void 0===a||null===(i=a.primary)||void 0===i?void 0:i.value),(0,$c.jsx)(kx,{children:"kr"})]}),(0,$c.jsx)(yx,{children:null===(o=e.metric)||void 0===o||null===(s=o.primary)||void 0===s?void 0:s.label})]}),null!=(null===(l=e.metric)||void 0===l||null===(d=l.secondary)||void 0===d?void 0:d.value)&&(0,$c.jsxs)(vx,{children:[(0,$c.jsxs)(bx,{children:["number"===typeof e.metric.secondary.value&&null!==(c=e.metric.secondary.label)&&void 0!==c&&c.includes("%")?`${e.metric.secondary.value}%`:Hx(e.metric.secondary.value),!(null!==(p=e.metric.secondary.label)&&void 0!==p&&p.includes("%"))&&(0,$c.jsx)(kx,{children:"kr"})]}),(0,$c.jsx)(yx,{children:null===(f=e.metric)||void 0===f||null===(g=f.secondary)||void 0===g?void 0:g.label})]})]}),(0,$c.jsx)(jx,{$visible:b,children:e.context}),e.action&&(0,$c.jsx)(wx,{$visible:b,children:(0,$c.jsxs)(Sx,{$done:w,$loading:S,disabled:w||S,onClick:()=>k(e.id,e.action.label),children:[S&&(0,$c.jsx)($x,{}),w?"\u2713 Arvo \xe4r p\xe5 det \u2014 vi \xe5terkommer inom 24 timmar":e.action.label]})})]})},e.id)}),(0,$c.jsxs)(Nx,{"data-card-index":String(w-1),ref:e=>{v.current[w-1]=e},children:[(0,$c.jsx)(Ex,{children:(0,$c.jsx)(Jx,{})}),(0,$c.jsx)(_x,{children:"Er Arvo-briefing \xe4r klar"}),(0,$c.jsx)(zx,{children:S?"Bra jobbat \u2014 ni har aktiverat Arvo. Vi granskar era avtal och \xe5terkommer med en konkret handlingsplan.":"Era insikter v\xe4ntar p\xe5 er. Ni kan alltid komma tillbaka till denna sida via l\xe4nken i mailet."}),S&&(0,$c.jsx)(Cx,{children:Object.entries(h).map(e=>{let[t,r]=e;return(0,$c.jsxs)(Ax,{children:[(0,$c.jsx)(Dx,{children:"\u2713"}),(0,$c.jsxs)(Fx,{children:[(0,$c.jsx)("strong",{children:"approve_switch"===r.type?"Bytesuppdrag":"Bevakningsuppdrag"})," ","aktiverat f\xf6r ",(0,$c.jsx)("strong",{children:r.supplier}),r.estimatedNetSaving>0&&` \xb7 Potentiell besparing: ${Hx(r.estimatedNetSaving)} kr/\xe5r`]})]},t)})}),S&&(0,$c.jsx)(Ox,{children:"Arvo \xe5terkommer inom 24 timmar med n\xe4sta steg."}),(0,$c.jsx)(Tx,{href:"/testa-faktura",children:"Analysera fler fakturor \u2192"})]})]})]})}const Xx=jc`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`,Zx=jc`
  from { opacity: 0; transform: translateY(-24px) scale(0.95); }
  65%  { transform: translateY(4px) scale(1.005); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`,ev=jc`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(29,176,154,0); }
`,tv=jc`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,rv=vc.div`
  background: #ffffff;
  color: #0E1A17;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
`,nv=vc.section`
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
`,av=vc.div`
  position: relative;
  z-index: 1;
  max-width: 680px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`,iv=vc.div`
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
  animation: ${Zx} 0.75s cubic-bezier(0.34, 1.46, 0.64, 1) both;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.55) inset,
    0 -1px 0 rgba(255,255,255,0.06) inset,
    0 0 40px rgba(255,255,255,0.04),
    0 48px 120px rgba(0,0,0,0.70),
    0 8px 32px rgba(0,0,0,0.40);
`,ov=vc.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
`,sv=vc.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${ev} 2.2s ease-in-out infinite;
`,lv=vc.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: .02em;
  flex: 1;
`,dv=vc.span`
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .01em;
`,cv=vc.p`
  margin: 0 0 7px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -.015em;
`,uv=vc.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;

  strong {
    color: rgba(255,255,255,0.88);
    font-weight: 600;
  }
`,pv=vc.button`
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
`,mv=vc.h1`
  margin: 0 0 20px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(38px, 6.5vw, 76px);
  font-weight: 700;
  color: #fff;
  line-height: 1.10;
  letter-spacing: -.02em;
  animation: ${Xx} 0.8s 0.28s both ease-out;

  em {
    font-style: italic;
    font-weight: 400;
  }
`,fv=vc.p`
  margin: 0 0 52px;
  font-size: clamp(16px, 2.2vw, 20px);
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
  animation: ${Xx} 0.8s 0.42s both ease-out;
`,hv=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: ${Xx} 0.8s 0.56s both ease-out;
`,gv=vc.a`
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
`,xv=vc.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.52);
  letter-spacing: .01em;
`,vv=vc.section`
  padding: 80px 24px;
  background: #ffffff;

  @media (max-width: 640px) { padding: 64px 20px; }

  & > * {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
`,bv=vc.div`
  text-align: center;
  margin-bottom: 48px;
  @media (max-width: 640px) { margin-bottom: 36px; }
`,kv=vc.p`
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  color: #1B7A6E;
  text-transform: uppercase;
  letter-spacing: .20em;
  text-align: center;
`,yv=vc.h2`
  margin: 0 0 48px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  line-height: 1.12;
  letter-spacing: -.02em;
  text-align: center;

  @media (max-width: 640px) { margin-bottom: 36px; }
`,jv=(vc.div`
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
`),wv=vc.div`
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
`,Sv=vc.p`
  margin: 0;
  padding: 0 0 0 12px;
  border-left: 2.5px solid #9F3B22;
  font-size: 13px;
  font-style: italic;
  color: #4A5E58;
  line-height: 1.6;
`,$v=vc.div`
  height: 1px;
  background: #E4EDE9;
  margin: 16px 0;
`,Nv=(vc.span`
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
`),Ev=vc.p`
  margin: 0;
  font-size: 13.5px;
  color: #5C6E68;
  line-height: 1.6;
  flex: 1;
`,_v=vc.p`
  margin: 0;
  font-size: 12.5px;
  color: #1B7A6E;
  font-style: italic;
  line-height: 1.55;
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid #D5E2DC;
`,zv=vc.section`
  background: #000;
  padding: 88px 24px;

  @media (max-width: 640px) { padding: 72px 20px; }
`,Cv=vc.div`
  max-width: 760px;
  margin: 0 auto;
`,Av=vc.p`
  margin: 0 0 56px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.28);
  text-transform: uppercase;
  letter-spacing: .22em;
`,Dv=vc.div`
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease,
    transform 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease;

  ${e=>{let{$visible:t}=e;return t&&hc`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Fv=vc.span`
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #4FBFB3;
  text-transform: uppercase;
  letter-spacing: .20em;
  margin-bottom: 14px;
`,Ov=vc.p`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(30px, 5.5vw, 60px);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -.03em;
  text-align: left;
`,Tv=vc.div`
  width: 1px;
  height: 56px;
  background: rgba(255,255,255,0.10);
  margin: 52px 0;
`,Pv=vc.section`
  background: #ffffff;
  padding: 96px 24px;
  border-top: 1px solid #E8EFEC;
  text-align: center;

  @media (max-width: 640px) { padding: 72px 20px; }
`,Lv=vc.div`
  max-width: 480px;
  margin: 0 auto;
`,Rv=vc.h2`
  margin: 0 0 16px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  letter-spacing: -.025em;
  line-height: 1.12;
`,Iv=vc.p`
  margin: 0 0 40px;
  font-size: 16px;
  color: #5C6E68;
  line-height: 1.6;
`,Bv=vc.p`
  margin: 24px 0 0;
  font-size: 12px;
  color: #3F4B47;
  letter-spacing: .01em;
  opacity: 0.65;
`,Mv=vc.div`
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
`,Vv=vc.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 0;
`,Uv=vc.input`
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
`,Kv=vc.button`
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
`,Hv=vc.p`
  font-size: 12.5px;
  color: #9F3B22;
  margin: 4px 0 0;
  line-height: 1.5;
`,Wv=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
`,qv=vc.div`
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
  animation: ${tv} 0.55s cubic-bezier(0.34,1.46,0.64,1) both;
`,Gv=vc.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0E1A17;
`,Yv=vc.p`
  margin: 0;
  font-size: 14px;
  color: #5C6E68;
  line-height: 1.6;
`,Jv=vc.p`
  margin: 0;
  font-size: 13px;
  color: #3F4B47;
  opacity: 0.55;
  font-style: italic;
`,Qv=[{context:"Telia h\xf6jer 11% i januari. Ni m\xe4rker det i september \u2014 \xe5tta m\xe5nader senare.",title:"Marknadsintelligens f\xf6re fakturan",body:"Arvo ser vad som h\xe4nder hos j\xe4mf\xf6rbara bolag i n\xe4tverket \u2014 och varnar er innan h\xf6jningen syns p\xe5 er faktura.",quote:'"6 av 14 bolag i er bransch fick Telias prish\xf6jning f\xf6rra m\xe5naden."'},{context:"Tele2-avtalet f\xf6rnyas automatiskt. Ni m\xe4rkte det inte. Nu \xe4r ni l\xe5sta ett \xe5r till.",title:"Kontraktskalender med handlingsplan",body:"Inte bara p\xe5minnelser \u2014 utan exakt vad som ska g\xf6ras, n\xe4r och varf\xf6r. Arvo r\xe4knar bakl\xe4nges fr\xe5n varje f\xf6rnyelsedatum.",quote:'"87 dagar kvar. Aktivera byte senast 15 september."'},{context:"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr. Ni betalar differensen utan att veta om det.",title:"Faktura mot avtal",body:"Leverant\xf6rer fakturerar fel \u2014 ofta. Arvo kontrollerar automatiskt varje faktura mot k\xe4nt avtalspris och flaggar avvikelser direkt.",quote:'"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr."'},{context:"Kostnaderna rullar p\xe5. Ingen sammanfattar. Styrelsen fr\xe5gar \u2014 ingen har svaret.",title:"M\xe5natlig CFO-brief",body:"En professionell rapport \u2014 klar f\xf6r styrelserummet \u2014 med vad Arvo hittat, vad som sparats och vad som \xe4r p\xe5 v\xe4g.",quote:'"Tre avtal bevakas. Ett flaggat f\xf6r \xe5tg\xe4rd n\xe4sta vecka."'}];function Xv(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.12;const t=(0,n.useRef)(null),[r,a]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{const r=t.current;if(!r)return;const n=new IntersectionObserver(e=>{let[t]=e;t.isIntersecting&&(a(!0),n.disconnect())},{threshold:e});return n.observe(r),()=>n.disconnect()},[e]),[t,r]}const Zv=()=>(0,$c.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",style:{flexShrink:0},children:[(0,$c.jsx)("defs",{children:(0,$c.jsxs)("linearGradient",{id:"intelig",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$c.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$c.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$c.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#intelig)"})]}),eb=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function tb(){var e;const[t,r]=Xv(.08),[a,i]=Xv(.12),[o]=js(),s=o.get("savings")?Number(o.get("savings")):null,l=null!==(e=o.get("supplier"))&&void 0!==e?e:null,[d,c]=(0,n.useState)(""),[u,p]=(0,n.useState)(""),[m,f]=(0,n.useState)("idle"),[h,g]=(0,n.useState)("");return(0,$c.jsxs)(rv,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsx)(nv,{children:(0,$c.jsxs)(av,{children:[(0,$c.jsxs)(iv,{children:[(0,$c.jsxs)(ov,{children:[(0,$c.jsx)(Zv,{}),(0,$c.jsx)(sv,{}),(0,$c.jsx)(lv,{children:"Arvo Intelligence"}),(0,$c.jsx)(dv,{children:"Just nu"})]}),(0,$c.jsx)(cv,{children:"Arvo har detekterat n\xe5got"}),(0,$c.jsxs)(uv,{children:["Telia h\xf6jde priset f\xf6r ",(0,$c.jsx)("strong",{children:"8 av 14 bolag"})," i er bransch f\xf6rra m\xe5naden. Er n\xe4sta faktura tr\xe4ffar om"," ",(0,$c.jsx)("strong",{children:"12 dagar."})]}),(0,$c.jsx)(pv,{as:vs,to:"/testa-faktura",children:"Se vad det inneb\xe4r f\xf6r er \u2192"})]}),(0,$c.jsxs)(mv,{children:["Arvo m\xe4rkte det.",(0,$c.jsx)("br",{}),(0,$c.jsx)("em",{children:"Ni visste inte om det \xe4nnu."})]}),(0,$c.jsx)(fv,{children:"Ni ska inte beh\xf6va h\xe5lla koll. Det \xe4r Arvos jobb."}),(0,$c.jsxs)(hv,{children:[(0,$c.jsx)(gv,{as:"a",href:"#aktivera",children:"Aktivera Arvo Intelligence"}),(0,$c.jsx)(xv,{children:"1 995 kr/m\xe5n \xb7 Ingen bindningstid"})]})]})}),(0,$c.jsxs)(vv,{ref:t,children:[(0,$c.jsxs)(bv,{children:[(0,$c.jsx)(kv,{children:"Arvo Intelligence"}),(0,$c.jsx)(yv,{style:{marginBottom:0},children:"Det Arvo ser \u2014 som annars f\xf6rsvinner"})]}),(0,$c.jsx)(jv,{children:Qv.map((e,t)=>(0,$c.jsxs)(wv,{$i:t,$visible:r,children:[(0,$c.jsx)(Sv,{children:e.context}),(0,$c.jsx)($v,{}),(0,$c.jsx)(Nv,{children:e.title}),(0,$c.jsx)(Ev,{children:e.body}),(0,$c.jsx)(_v,{children:e.quote})]},t))})]}),(0,$c.jsx)(zv,{ref:a,children:(0,$c.jsxs)(Cv,{children:[(0,$c.jsx)(Av,{children:"Den enda finansiella partnern som..."}),(0,$c.jsxs)(Dv,{$i:0,$visible:i,children:[(0,$c.jsx)(Fv,{children:"Regel 1"}),(0,$c.jsx)(Ov,{children:"Arvo vaktar er f\xf6r 1 995 kr/m\xe5n."})]}),(0,$c.jsx)(Tv,{}),(0,$c.jsxs)(Dv,{$i:1,$visible:i,children:[(0,$c.jsx)(Fv,{children:"Regel 2"}),(0,$c.jsx)(Ov,{children:"Ni beh\xe5ller 80% av allt vi sparar er."})]})]})}),(0,$c.jsx)(Pv,{id:"aktivera",children:(0,$c.jsxs)(Lv,{children:["sent"!==m&&(0,$c.jsxs)(Rv,{children:["Arvo b\xf6rjar bevaka",(0,$c.jsx)("br",{}),"imorgon bitti."]}),"sent"===m?(0,$c.jsxs)(Wv,{children:[(0,$c.jsx)(qv,{children:"\u2713"}),(0,$c.jsx)(Gv,{children:"Aktiverat."}),(0,$c.jsxs)(Yv,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$c.jsx)("br",{}),"Vi h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),d&&(0,$c.jsx)(Jv,{children:d})]}):(0,$c.jsxs)($c.Fragment,{children:[null!=s?(0,$c.jsx)(Mv,{children:l?(0,$c.jsxs)($c.Fragment,{children:["Vi identifierade redan ",(0,$c.jsxs)("strong",{children:[eb(s),"\xa0kr/\xe5r"]})," hos ",l,". Den besparingen v\xe4ntar."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi identifierade redan ",(0,$c.jsxs)("strong",{children:[eb(s),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})}):(0,$c.jsx)(Iv,{children:"E-post och bolagsnamn \u2014 klart p\xe5 30 sekunder."}),(0,$c.jsxs)(Vv,{onSubmit:async e=>{e.preventDefault();const t=d.trim();if(t&&"submitting"!==m){f("submitting"),g("");try{var r;const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==l&&void 0!==l?l:u.trim()||void 0,netSaving:null!==s&&void 0!==s?s:void 0,source:"intelligence-page"})});if(!e.ok)throw new Error(null!==(r=(await e.json().catch(()=>({}))).error)&&void 0!==r?r:"err");f("sent")}catch{g("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),f("error")}}},children:[(0,$c.jsx)(Uv,{type:"email",placeholder:"er@foretag.se",value:d,onChange:e=>c(e.target.value),required:!0,autoComplete:"email"}),(0,$c.jsx)(Uv,{type:"text",placeholder:"Bolagsnamn",value:u,onChange:e=>p(e.target.value),autoComplete:"organization"}),(0,$c.jsx)(Kv,{type:"submit",disabled:"submitting"===m,children:"submitting"===m?"\u2026":"Aktivera bevakningen \u2192"}),h&&(0,$c.jsx)(Hv,{children:h})]})]}),(0,$c.jsx)(Bv,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo startar bevakningen inom 24h"})]})}),(0,$c.jsx)(vu,{})]})}const rb=jc`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`,nb=jc`
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`,ab=jc`
  from { stroke-dashoffset: 60; opacity: 0; }
  to   { stroke-dashoffset: 0;  opacity: 1; }
`,ib=jc`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,ob=jc`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(29,176,154,0); }
`,sb=vc.div`
  background: #060D0B;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
`,lb=vc.section`
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
`,db=vc.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
`,cb=vc.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 32px;
  animation: ${rb} 0.6s ease both;
`,ub=vc.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${ob} 2.4s ease-in-out infinite;
`,pb=vc.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #1DB09A;
`,mb=vc.h1`
  font-size: clamp(30px, 6vw, 50px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #fff;
  text-align: center;
  margin: 0 0 16px;
  animation: ${rb} 0.6s 0.08s ease both;
`,fb=vc.p`
  font-size: 15px;
  color: rgba(255,255,255,0.42);
  text-align: center;
  margin: 0 0 40px;
  line-height: 1.5;
  animation: ${rb} 0.6s 0.14s ease both;
`,hb=vc.div`
  width: 100%;
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.22);
  border-radius: 14px;
  padding: 14px 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${rb} 0.6s 0.18s ease both;
`,gb=vc.span`
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1;
`,xb=vc.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.70);
  line-height: 1.55;

  strong {
    color: #1DB09A;
    font-weight: 700;
  }
`,vb=vc.div`
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
  animation: ${nb} 0.65s 0.1s cubic-bezier(0.34,1.28,0.64,1) both;
`,bb=vc.h2`
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 6px;
  line-height: 1.2;
`,kb=vc.p`
  font-size: 13px;
  color: rgba(255,255,255,0.40);
  margin: 0 0 24px;
  line-height: 1.5;
`,yb=vc.a`
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
`,jb=vc.span`
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
`,wb=vc.span`
  flex: 1;
`,Sb=vc.span`
  color: rgba(255,255,255,0.25);
  font-size: 13px;
`,$b=vc.div`
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
`,Nb=vc.form`
  display: flex;
  gap: 8px;
  align-items: stretch;
`,Eb=vc.input`
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
`,_b=vc.button`
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
`,zb=vc.p`
  font-size: 12px;
  color: #F87171;
  margin: 8px 0 0;
  line-height: 1.5;
`,Cb=vc.p`
  font-size: 11.5px;
  color: rgba(255,255,255,0.22);
  margin: 16px 0 0;
  line-height: 1.6;
  text-align: center;
`,Ab=vc.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 0 4px;
`,Db=vc.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: rgba(29,176,154,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: ${ib} 0.55s cubic-bezier(0.34,1.46,0.64,1) both;

  svg {
    stroke: #1DB09A;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
    animation: ${ab} 0.5s 0.2s ease both;
  }
`,Fb=vc.h3`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 8px;
`,Ob=vc.p`
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  margin: 0 0 24px;
  line-height: 1.6;
`,Tb=vc.p`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
  margin: 0 0 24px;
  font-style: italic;
`,Pb=vc.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  margin: 0 0 10px;
  width: 100%;
  text-align: left;
`,Lb=vc.div`
  display: flex;
  gap: 0;
  margin-top: 40px;
  width: 100%;
  animation: ${rb} 0.6s 0.4s ease both;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0;
  }
`,Rb=vc.div`
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
`,Ib=vc.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 8px;
`,Bb=vc.p`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin: 0;
  line-height: 1.55;
`,Mb=vc.div`
  width: 100%;
  max-width: 460px;
  margin: 48px auto 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: ${rb} 0.6s 0.5s ease both;
`,Vb=vc.p`
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
`,Ub=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function Kb(){return(0,$c.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:(0,$c.jsx)("polyline",{points:"5,14 11,20 23,8"})})}function Hb(){var e;const[t]=js(),r=t.get("savings")?Number(t.get("savings")):null,a=null!==(e=t.get("supplier"))&&void 0!==e?e:null,i=t.get("score")?Number(t.get("score")):null,[o,s]=(0,n.useState)(""),[l,d]=(0,n.useState)("idle"),[c,u]=(0,n.useState)(""),p="/api/auth/gmail-init"+(o?`?email=${encodeURIComponent(o)}`:""),m="/api/auth/outlook-init"+(o?`?email=${encodeURIComponent(o)}`:"");return(0,$c.jsxs)(sb,{children:[(0,$c.jsx)(uu,{variant:"public"}),(0,$c.jsx)(lb,{children:(0,$c.jsxs)(db,{children:[(0,$c.jsxs)(cb,{children:[(0,$c.jsx)(ub,{}),(0,$c.jsx)(pb,{children:"Arvo Intelligence"})]}),"sent"!==l&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsxs)(mb,{children:["Arvo b\xf6rjar bevaka er",(0,$c.jsx)("br",{}),"imorgon bitti."]}),(0,$c.jsx)(fb,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid"})]}),null!=r&&"sent"!==l&&(0,$c.jsxs)(hb,{children:[(0,$c.jsx)(gb,{children:"\u2192"}),(0,$c.jsx)(xb,{children:a?(0,$c.jsxs)($c.Fragment,{children:["Vi identifierade redan ",(0,$c.jsxs)("strong",{children:[Ub(r),"\xa0kr/\xe5r"]})," hos ",a,". Den besparingen v\xe4ntar."]}):(0,$c.jsxs)($c.Fragment,{children:["Vi identifierade redan ",(0,$c.jsxs)("strong",{children:[Ub(r),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})})]}),(0,$c.jsx)(vb,{children:"sent"===l?(0,$c.jsxs)(Ab,{children:[(0,$c.jsx)(Db,{children:(0,$c.jsx)(Kb,{})}),(0,$c.jsx)(Fb,{children:"Aktiverat."}),(0,$c.jsxs)(Ob,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$c.jsx)("br",{}),"Ni h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),(0,$c.jsx)(Tb,{children:o}),(0,$c.jsx)(Pb,{children:"Koppla er inkorg \u2014 Arvo hittar allt"}),(0,$c.jsxs)(yb,{href:p,style:{marginBottom:9},children:[(0,$c.jsx)(jb,{$provider:"google",children:"G"}),(0,$c.jsx)(wb,{children:"Koppla Gmail"}),(0,$c.jsx)(Sb,{children:"\u2192"})]}),(0,$c.jsxs)(yb,{href:m,children:[(0,$c.jsx)(jb,{$provider:"outlook",children:"\u25a0"}),(0,$c.jsx)(wb,{children:"Koppla Outlook"}),(0,$c.jsx)(Sb,{children:"\u2192"})]}),(0,$c.jsx)(Cb,{children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(bb,{children:"Koppla er inkorg \u2014 en g\xe5ng."}),(0,$c.jsx)(kb,{children:"Arvo s\xf6ker igenom era leverant\xf6rsfakturor och kontaktar er n\xe4r n\xe5got h\xe4nt."}),(0,$c.jsxs)(yb,{href:p,children:[(0,$c.jsx)(jb,{$provider:"google",children:"G"}),(0,$c.jsx)(wb,{children:"Koppla Gmail"}),(0,$c.jsx)(Sb,{children:"\u2192"})]}),(0,$c.jsxs)(yb,{href:m,children:[(0,$c.jsx)(jb,{$provider:"outlook",children:"\u25a0"}),(0,$c.jsx)(wb,{children:"Koppla Outlook"}),(0,$c.jsx)(Sb,{children:"\u2192"})]}),(0,$c.jsx)($b,{children:(0,$c.jsx)("span",{children:"eller b\xf6rja med e-post"})}),(0,$c.jsxs)(Nb,{onSubmit:async e=>{e.preventDefault();const t=o.trim();if(t&&"submitting"!==l){d("submitting"),u("");try{const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==a&&void 0!==a?a:void 0,netSaving:null!==r&&void 0!==r?r:void 0,diagScore:null!==i&&void 0!==i?i:void 0,source:"intelligence-page"})});if(!e.ok){var n;const t=await e.json().catch(()=>({}));throw new Error(null!==(n=t.error)&&void 0!==n?n:"server_error")}d("sent")}catch(s){u("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),d("error")}}},children:[(0,$c.jsx)(Eb,{type:"email",placeholder:"er@foretag.se",value:o,onChange:e=>s(e.target.value),required:!0,autoComplete:"email"}),(0,$c.jsx)(_b,{type:"submit",disabled:"submitting"===l,children:"submitting"===l?"\u2026":"Aktivera \u2192"})]}),c&&(0,$c.jsx)(zb,{children:c}),(0,$c.jsx)(Cb,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})}),(0,$c.jsxs)(Lb,{children:[(0,$c.jsxs)(Rb,{children:[(0,$c.jsx)(Ib,{children:"24h"}),(0,$c.jsx)(Bb,{children:"Arvo aktiverar er bevakning"})]}),(0,$c.jsxs)(Rb,{children:[(0,$c.jsx)(Ib,{children:"Dag 7"}),(0,$c.jsx)(Bb,{children:"Ni f\xe5r er f\xf6rsta analys"})]}),(0,$c.jsxs)(Rb,{children:[(0,$c.jsx)(Ib,{children:"L\xf6pande"}),(0,$c.jsx)(Bb,{children:"Arvo kontaktar er om n\xe5got h\xe4nt"})]})]})]})}),(0,$c.jsxs)(Mb,{children:[(0,$c.jsxs)(Vb,{children:[(0,$c.jsx)("strong",{children:"Regel 1:"})," Arvo vaktar er f\xf6r 1\xa0995\xa0kr/m\xe5n."]}),(0,$c.jsxs)(Vb,{children:[(0,$c.jsx)("strong",{children:"Regel 2:"})," Ni beh\xe5ller 80% av allt vi sparar er."]})]}),(0,$c.jsx)(vu,{})]})}const Wb=jc`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,qb=jc`
  from { opacity: 0; }
  to   { opacity: 1; }
`,Gb=jc`
  0%,100% { opacity:0.3; transform:scale(0.8); }
  50%     { opacity:1;   transform:scale(1);   }
`,Yb=function(){return hc`
  opacity: 0;
  animation: ${Wb} 0.75s ${arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`},Jb=wc.font.mono,Qb=vc.div`
  min-height: 100vh;
  background: ${wc.dossier.bg};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
`,Xb=vc.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 10;
  height: calc(env(safe-area-inset-top, 0px) + 28px);
  background: linear-gradient(to bottom, rgba(5,11,9,0.94) 0%, rgba(5,11,9,0) 100%);
  pointer-events: none;
`,Zb=vc.div`
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
`,ek=vc.div`
  position: relative;
`,tk=vc.div`
  font-family: ${Jb};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-indent: 0.42em; /* kompenserar sista bokstavens spacing vid centrering */
  color: ${wc.dossier.tealBright};
  margin-bottom: 18px;
  ${Yb(0)}
`,rk=vc.div`
  font-family: ${Jb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.46);
  margin-bottom: 48px;
  ${Yb(.05)}
`,nk=vc.h1`
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

  ${Yb(.1)}
`,ak=vc.div`
  font-size: 15px;
  color: rgba(255,255,255,0.58);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  ${Yb(.17)}
`,ik=vc.span`
  color: rgba(93,214,202,0.45);
`,ok=vc.div`
  font-family: ${Jb};
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.36);
  margin-top: 32px;
  ${Yb(.24)}
`,sk=vc.div`
  background: ${wc.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 84px 28px 76px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 120px 28px 110px;
  }
`,lk=vc.div`
  font-family: ${Jb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: ${wc.dossier.teal};
  margin-bottom: 40px;
`,dk=vc.div`
  margin-bottom: 44px;
  &:last-of-type { margin-bottom: 0; }
  ${e=>{let{$i:t}=e;return Yb(.08+.06*(null!==t&&void 0!==t?t:0))}}
`,ck=vc.div`
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(93,214,202,0.7), transparent);
  margin: 0 auto 30px;
`,uk=vc.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 6.4vw, 33px);
  font-weight: 500;
  color: ${wc.dossier.inkOnDark};
  line-height: 1.46;
  max-width: 560px;
  margin: 0 auto;
  letter-spacing: -0.012em;
`,pk=vc.div`
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
`,mk=vc.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`,fk=vc.span`
  font-size: 13px;
  color: rgba(255,255,255,0.48);
`,hk=vc.span`
  font-family: ${Jb};
  font-size: 12.5px;
  font-weight: 500;
  color: ${e=>{let{$highlight:t}=e;return t?wc.dossier.tealBright:"rgba(255,255,255,0.88)"}};
  text-align: right;
`,gk=vc.div`
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
`,xk=vc.div`
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

  ${Yb(.06)}
`,vk=vc.span`
  font-size: 0.50em;
  font-weight: 600;
  vertical-align: 0.34em;
  margin-right: 0.10em;
`,bk=vc.div`
  max-width: 320px;
  margin: 40px auto 0;
  ${Yb(.14)}
`,kk=vc.div`
  position: relative;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(43,196,172,0.18) 0%, rgba(43,196,172,0.55) 50%, rgba(43,196,172,0.18) 100%);
`,yk=vc.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 11px; height: 11px;
  border-radius: 50%;
  background: ${wc.dossier.tealBright};
  box-shadow: ${wc.dossier.glow};
`,jk=vc.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-family: ${Jb};
  font-size: 11px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.52);
`,wk=vc.div`
  font-size: 13px;
  color: rgba(255,255,255,0.50);
  margin-top: 30px;
  ${Yb(.18)}
`,Sk=vc.div`
  font-size: 12px;
  font-style: italic;
  color: rgba(255,255,255,0.38);
  margin-top: 10px;
`,$k=vc.div`
  background: ${wc.dossier.bg};
  padding: 56px 20px 48px;

  @media (min-width: 768px) {
    padding: 88px 28px 76px;
  }
`,Nk=vc.div`
  font-family: ${Jb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: ${wc.dossier.teal};
  margin-bottom: 26px;
  text-align: center;
`,Ek=vc.div`
  background: ${wc.dossier.bgRaised};
  border: 1px solid ${wc.dossier.hairlineOnDark};
  border-radius: 20px;
  padding: 28px 24px 0;
  max-width: ${wc.dossier.column};
  margin: 0 auto 16px;
  overflow: hidden;
`,_k=vc.div`
  font-family: ${Jb};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: ${wc.dossier.teal};
  margin-bottom: 10px;
`,zk=vc.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid ${wc.dossier.hairlineOnDark};

  &:last-of-type { border-bottom: none; }
`,Ck=vc.span`
  font-size: 13px;
  color: ${wc.dossier.mutedOnDark};
`,Ak=vc.span`
  font-family: ${Jb};
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{$highlight:t}=e;return t?wc.dossier.tealBright:wc.dossier.inkOnDark}};
  text-align: right;
`,Dk=vc.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: ${wc.dossier.faintOnDark};
  margin-top: 2px;
`,Fk=vc.div`
  background: ${wc.dossier.bg};
  border-top: 1px solid ${wc.dossier.hairlineOnDark};
  margin: 18px -24px 0;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  > div { text-align: right; }
`,Ok=vc.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.62);
`,Tk=vc.div`
  font-family: ${Jb};
  font-size: 16px;
  font-weight: 600;
  color: ${wc.dossier.tealBright};
  letter-spacing: -0.01em;
`,Pk=vc.div`
  font-family: ${Jb};
  font-size: 10.5px;
  color: rgba(255,255,255,0.46);
  margin-top: 3px;
`,Lk=vc.div`
  font-size: 11px;
  color: ${wc.dossier.faintOnDark};
  margin: 12px 0 0;
  padding-bottom: 16px;
`,Rk=vc.div`
  background: ${wc.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 72px 24px 60px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 110px 24px 96px;
  }
`,Ik=vc.p`
  font-size: 12px;
  color: rgba(255,255,255,0.46);
  line-height: 1.80;
  max-width: 360px;
  margin: 0 auto 52px;
`,Bk=vc.div`
  margin-bottom: 10px;
`,Mk=vc.a`
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
`,Vk=vc.div`
  font-size: 12px;
  color: rgba(255,255,255,0.50);
  margin-top: 14px;
`,Uk=vc.div`
  height: 36px;
`,Kk=vc.a`
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
`,Hk=vc.div`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin-top: 12px;
`,Wk=vc.div`
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 22px 28px calc(22px + env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${wc.dossier.bg};
`,qk=vc.span`
  font-family: ${Jb};
  font-size: 11px;
  color: rgba(255,255,255,0.32);
`,Gk=vc.span`
  font-family: ${Jb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
`,Yk=vc.div`
  min-height: 100vh;
  background: ${wc.dossier.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`,Jk=vc.div`display: flex; gap: 8px;`,Qk=vc.div`
  width: 8px; height: 8px;
  border-radius: 50%;
  background: ${wc.dossier.teal};
  animation: ${Gb} 1.2s ${e=>{let{$i:t}=e;return.2*(null!==t&&void 0!==t?t:0)}}s ease-in-out infinite;
`,Xk=vc.div`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
`,Zk=vc.div`
  min-height: 100vh;
  background: ${wc.dossier.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
`,ey=vc.div`
  font-size: 32px;
  margin-bottom: 20px;
  animation: ${qb} 0.4s ease both;
`,ty=vc.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
`,ry=vc.p`
  font-size: 14px;
  color: rgba(255,255,255,0.40);
  line-height: 1.65;
  max-width: 300px;
  margin: 0 0 28px;
`,ny=vc.a`
  font-size: 15px;
  font-weight: 600;
  color: ${wc.dossier.teal};
  text-decoration: none;
  border-bottom: 1px solid rgba(29,176,154,0.3);
  padding-bottom: 2px;
`,ay=(e,t)=>500*Math.round((e+t)/2/500);function iy(e){if(!e)return"";return new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"})}function oy(){var e,t,r,a;const{token:i}=mo(),[o,s]=(0,n.useState)("loading"),[l,d]=(0,n.useState)(null),[c,u]=(0,n.useState)(!1);(0,n.useEffect)(()=>{i?fetch(`/api/prospect?token=${encodeURIComponent(i)}`).then(e=>e.json()).then(e=>{e.ok?(d(e.prospect),s("ready")):s("error")}).catch(()=>s("error")):s("error")},[i]);const p=e=>{c||(u(!0),fetch(`/api/prospect?token=${encodeURIComponent(i)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})}).catch(()=>{}))};if("loading"===o)return(0,$c.jsxs)(Yk,{children:[(0,$c.jsx)(Jk,{children:[0,1,2].map(e=>(0,$c.jsx)(Qk,{$i:e},e))}),(0,$c.jsx)(Xk,{children:"H\xe4mtar er analys\u2026"})]});if("error"===o)return(0,$c.jsxs)(Zk,{children:[(0,$c.jsx)(ey,{children:"\ud83d\udd12"}),(0,$c.jsx)(ty,{children:"Analysen hittades inte"}),(0,$c.jsx)(ry,{children:"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig. Analysera er faktura direkt \u2014 det tar 2 minuter."}),(0,$c.jsx)(ny,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const{companyName:m,industry:f,employees:h,estimates:g,generatedAt:x}=l,v=null!==(e=null===g||void 0===g?void 0:g.categories)&&void 0!==e?e:[],b=(null===g||void 0===g?void 0:g.hasEstimates)&&((null===g||void 0===g?void 0:g.totalSavingLow)>0||v.length>0),k=null===g||void 0===g?void 0:g.mxPlatform,y=null===g||void 0===g?void 0:g.mxSince,j=null===g||void 0===g?void 0:g.domainRegistered,w=null===g||void 0===g?void 0:g.foundedYear,S=null!==(t=null===g||void 0===g?void 0:g.findings)&&void 0!==t?t:[],$=(N=y)?Math.round((Date.now()-new Date(N).getTime())/2630016e3):0;var N;const E=null!==(r=wu[k])&&void 0!==r?r:k,_=S.length>0,z=[],C=null===g||void 0===g?void 0:g.business;if((null===C||void 0===C?void 0:C.revenueTkr)>0){const e=(C.revenueTkr/1e3).toLocaleString("sv-SE",{minimumFractionDigits:1,maximumFractionDigits:1});z.push({text:`Ert bokslut ${C.year}: ${e} mkr i oms\xe4ttning, ${C.employees} anst\xe4llda \u2014 offentliga uppgifter (Bolagsverket), inget ni delat`,key:"business"})}S.forEach(e=>z.push({text:e,key:e})),!_&&y?z.push({text:`${E}-upps\xe4ttningen or\xf6rd sedan ${ju(y)} \u2014 ${$} m\xe5nader`,key:"mxSince"}):!_&&k&&z.push({text:`Ni k\xf6r ${E} \xb7 ${h} licenser`,key:"mxPlatform"});const A=z.length>0,D=_||C?"IDENTIFIERAT FYND":"INFRASTRUKTURANALYS",F=(_||C)&&(k||j||y),O=null!==(a=null===g||void 0===g?void 0:g.totalSavingCentral)&&void 0!==a?a:b?ay(g.totalSavingLow,g.totalSavingHigh):null,T=v.map(e=>`${e.estimatedSims} ${"m365"===e.category?"Microsoft 365-licenser":"mobilabonnemang"}`).join(" + ");return(0,$c.jsxs)(Qb,{children:[(0,$c.jsx)(Xb,{}),(0,$c.jsx)(Zb,{children:(0,$c.jsxs)(ek,{children:[(0,$c.jsx)(tk,{children:"ARVO"}),(0,$c.jsx)(rk,{children:"Konfidentiell analys"}),(0,$c.jsx)(nk,{children:m}),(0,$c.jsxs)(ak,{children:[f&&(0,$c.jsx)("span",{children:f}),f&&h&&(0,$c.jsx)(ik,{children:"\xb7"}),h&&(0,$c.jsxs)("span",{children:[h," anst\xe4llda"]}),w&&(0,$c.jsxs)($c.Fragment,{children:[(0,$c.jsx)(ik,{children:"\xb7"}),(0,$c.jsxs)("span",{children:["Grundat ",w]})]})]}),(0,$c.jsx)(ok,{children:iy(x)})]})}),A&&(0,$c.jsxs)(sk,{children:[(0,$c.jsx)(lk,{children:D}),z.map((e,t)=>(0,$c.jsxs)(dk,{$i:t,children:[t>0&&(0,$c.jsx)(ck,{}),(0,$c.jsx)(uk,{children:e.text})]},e.key)),F&&(0,$c.jsxs)(pk,{children:[k&&(0,$c.jsxs)(mk,{children:[(0,$c.jsx)(fk,{children:"E-postplattform"}),(0,$c.jsx)(hk,{children:E})]}),y&&(0,$c.jsxs)(mk,{children:[(0,$c.jsx)(fk,{children:"Of\xf6r\xe4ndrad sedan"}),(0,$c.jsxs)(hk,{$highlight:!0,children:[ju(y)," \u2014 ",$," m\xe5n"]})]}),j&&(0,$c.jsxs)(mk,{children:[(0,$c.jsx)(fk,{children:"Dom\xe4n registrerad"}),(0,$c.jsx)(hk,{children:ju(j)})]})]})]}),b&&(0,$c.jsxs)(gk,{children:[(0,$c.jsx)(lk,{children:"Sannolik kostnadspremie"}),(0,$c.jsxs)(xk,{children:[(0,$c.jsx)(vk,{children:"\u2248"}),ku(O)," ",(0,$c.jsx)("span",{style:{fontSize:"0.42em",letterSpacing:"0em",fontWeight:700},children:"kr/\xe5r"})]}),(0,$c.jsxs)(bk,{children:[(0,$c.jsx)(kk,{children:(0,$c.jsx)(yk,{style:{left:`${Math.min(88,Math.max(12,g.totalSavingHigh>g.totalSavingLow?(O-g.totalSavingLow)/(g.totalSavingHigh-g.totalSavingLow)*100:50))}%`}})}),(0,$c.jsxs)(jk,{children:[(0,$c.jsx)("span",{children:ku(g.totalSavingLow)}),(0,$c.jsxs)("span",{children:[ku(g.totalSavingHigh)," kr/\xe5r"]})]})]}),T&&(0,$c.jsxs)(wk,{children:["Baserat p\xe5 ",T," mot verifierade listpriser"]}),(0,$c.jsx)(Sk,{children:"Er faktiska avtalskostnad ser vi inte f\xf6rr\xe4n ni delar er faktura"})]}),v.length>0&&(0,$c.jsxs)($k,{children:[(0,$c.jsx)(Nk,{children:"Kostnadsanalys per kategori"}),v.map((e,t)=>{var r;const n="m365"===e.category?"licens":"abonnemang",a=null!==(r=e.savingCentral)&&void 0!==r?r:ay(e.savingLow,e.savingHigh);return(0,$c.jsxs)(Ek,{children:[(0,$c.jsx)(_k,{children:e.label}),(0,$c.jsxs)(zk,{children:[(0,$c.jsx)(Ck,{children:"m365"===e.category?"Uppskattade licenser":"Uppskattade abonnemang"}),(0,$c.jsxs)(Ak,{children:[e.estimatedSims," st"]})]}),(0,$c.jsxs)(zk,{children:[(0,$c.jsx)(Ck,{children:"Typisk marknadskostnad"}),(0,$c.jsxs)(Ak,{children:[ku(e.typicalLow),"\u2013",ku(e.typicalHigh)," kr/\xe5r",(0,$c.jsx)(Dk,{children:"live"===e.source?`median av verifierade fakturor: ${e.pricePerSim.typical} kr/m\xe5n per ${n} \xb1 15 %`:`ordinarie listpris ${e.pricePerSim.typical} kr/m\xe5n per ${n} \xb1 15 %`})]})]}),(0,$c.jsxs)(zk,{children:[(0,$c.jsx)(Ck,{children:"Arvo-pris, verifierat listpris"}),(0,$c.jsxs)(Ak,{$highlight:!0,children:[ku(e.arvoAnnual)," kr/\xe5r",(0,$c.jsxs)(Dk,{children:[e.pricePerSim.arvo," kr/m\xe5n per ",n]})]})]}),(0,$c.jsx)(Lk,{children:e.sourceNote}),(0,$c.jsxs)(Fk,{children:[(0,$c.jsx)(Ok,{children:"Sannolik premie"}),(0,$c.jsxs)("div",{children:[(0,$c.jsxs)(Tk,{children:["\u2248 ",ku(a)," kr/\xe5r"]}),(0,$c.jsxs)(Pk,{children:["intervall ",ku(e.savingLow),"\u2013",ku(e.savingHigh)]})]})]})]},t)})]}),(0,$c.jsxs)(Rk,{children:[(0,$c.jsxs)(Ik,{children:["Arvo har g\xe5tt igenom den publika digitala upps\xe4ttningen f\xf6r ",m,"s dom\xe4n. Ingen data har h\xe4mtats fr\xe5n er eller era leverant\xf6rer utan ert tillst\xe5nd."]}),(0,$c.jsxs)(Bk,{children:[(0,$c.jsx)(Mk,{href:"/testa-faktura",onClick:()=>p("upload"),children:"Se er exakta premie"}),(0,$c.jsx)(Vk,{children:"Ladda upp en faktura \xb7 Kostnadsfritt \xb7 2 minuter \xb7 Ingen registrering"})]}),(0,$c.jsx)(Uk,{}),(0,$c.jsx)(Kk,{href:"/intelligence#aktivera",onClick:()=>p("activate"),children:"Eller l\xe5t Arvo bevaka er l\xf6pande \u2014 Arvo Intelligence, 1\xa0995 kr/m\xe5n \u2192"}),(0,$c.jsx)(Hk,{children:"Ingen bindningstid \xb7 Bevakningen b\xf6rjar inom 24 timmar"})]}),(0,$c.jsxs)(Wk,{children:[(0,$c.jsx)(qk,{children:"arvoflow.se"}),(0,$c.jsx)(Gk,{children:"Arvo Intelligence"})]})]})}"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const sy=()=>{const{pathname:e}=lo();return(0,n.useEffect)(()=>{window.scrollTo(0,0)},[e]),null},ly=()=>(0,$c.jsxs)(cc,{theme:wc,children:[(0,$c.jsx)(Sc,{}),(0,$c.jsx)(gs,{basename:"/flow",children:(0,$c.jsxs)(Cc,{children:[(0,$c.jsx)(sy,{}),(0,$c.jsxs)(Po,{children:[(0,$c.jsx)(Oo,{path:"/",element:(0,$c.jsx)(bp,{})}),(0,$c.jsx)(Oo,{path:"/connect",element:(0,$c.jsx)(qp,{})}),(0,$c.jsx)(Oo,{path:"/bias",element:(0,$c.jsx)(dm,{})}),(0,$c.jsx)(Oo,{path:"/villkor",element:(0,$c.jsx)($m,{})}),(0,$c.jsx)(Oo,{path:"/integritet",element:(0,$c.jsx)(Nm,{})}),(0,$c.jsx)(Oo,{path:"/cookies",element:(0,$c.jsx)(Em,{})}),(0,$c.jsx)(Oo,{path:"/testa-faktura",element:(0,$c.jsx)(Jf,{})}),(0,$c.jsx)(Oo,{path:"/portfolio",element:(0,$c.jsx)(dg,{})}),(0,$c.jsx)(Oo,{path:"/admin",element:(0,$c.jsx)(Dg,{})}),(0,$c.jsx)(Oo,{path:"/utfall",element:(0,$c.jsx)(Kg,{})}),(0,$c.jsx)(Oo,{path:"/briefing/:token",element:(0,$c.jsx)(Qx,{})}),(0,$c.jsx)(Oo,{path:"/intelligence",element:(0,$c.jsx)(tb,{})}),(0,$c.jsx)(Oo,{path:"/aktivera",element:(0,$c.jsx)(Hb,{})}),(0,$c.jsx)(Oo,{path:"/prospect/:token",element:(0,$c.jsx)(oy,{})}),(0,$c.jsx)(Oo,{path:"/kontoret",element:(0,$c.jsx)(Fo,{to:"/portfolio",replace:!0})}),(0,$c.jsx)(Oo,{path:"*",element:(0,$c.jsx)(Fo,{to:"/",replace:!0})})]})]})})]});!function(){var e;const t={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SENTRY_DSN;t&&ri({dsn:t,environment:null!==(e="production")?e:"production",release:{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_VERSION,tracesSampleRate:.1,beforeSend(e){var t,r,n,a;const i=null!==(t=null===(r=e.exception)||void 0===r||null===(n=r.values)||void 0===n||null===(a=n[0])||void 0===a?void 0:a.value)&&void 0!==t?t:"";return i.includes("Network request failed")||i.includes("Load failed")?null:e}})}();(0,i.createRoot)(document.getElementById("root")).render((0,$c.jsx)(ly,{}))})();
//# sourceMappingURL=main.749c3ea0.js.map