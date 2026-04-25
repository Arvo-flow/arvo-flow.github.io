/*! For license information please see main.7f657fad.js.LICENSE.txt */
(()=>{"use strict";var e={4(e,t,n){var r=n(853),a=n(43),l=n(950);function i(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function s(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function u(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function c(e){if(31===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function d(e){if(s(e)!==e)throw Error(i(188))}function f(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=f(e)))return t;e=e.sibling}return null}var p=Object.assign,h=Symbol.for("react.element"),m=Symbol.for("react.transitional.element"),g=Symbol.for("react.portal"),v=Symbol.for("react.fragment"),b=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),x=Symbol.for("react.consumer"),k=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),j=Symbol.for("react.suspense_list"),E=Symbol.for("react.memo"),$=Symbol.for("react.lazy");Symbol.for("react.scope");var C=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var z=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var _=Symbol.iterator;function N(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=_&&e[_]||e["@@iterator"])?e:null}var P=Symbol.for("react.client.reference");function T(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===P?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case v:return"Fragment";case y:return"Profiler";case b:return"StrictMode";case S:return"Suspense";case j:return"SuspenseList";case C:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case g:return"Portal";case k:return e.displayName||"Context";case x:return(e._context.displayName||"Context")+".Consumer";case w:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case E:return null!==(t=e.displayName||null)?t:T(e.type)||"Memo";case $:t=e._payload,e=e._init;try{return T(e(t))}catch(qn){}}return null}var A=Array.isArray,F=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,O={pending:!1,data:null,method:null,action:null},L=[],D=-1;function M(e){return{current:e}}function I(e){0>D||(e.current=L[D],L[D]=null,D--)}function H(e,t){D++,L[D]=e.current,e.current=t}var B,V,U=M(null),W=M(null),K=M(null),q=M(null);function Y(e,t){switch(H(K,t),H(W,e),H(U,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?bd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=yd(t=bd(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}I(U),H(U,e)}function Q(){I(U),I(W),I(K)}function G(e){null!==e.memoizedState&&H(q,e);var t=U.current,n=yd(t,e.type);t!==n&&(H(W,e),H(U,n))}function X(e){W.current===e&&(I(U),I(W)),q.current===e&&(I(q),ff._currentValue=O)}function J(e){if(void 0===B)try{throw Error()}catch(qn){var t=qn.stack.trim().match(/\n( *(at )?)/);B=t&&t[1]||"",V=-1<qn.stack.indexOf("\n    at")?" (<anonymous>)":-1<qn.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+B+e+V}var Z=!1;function ee(e,t){if(!e||Z)return"";Z=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(qn){var r=qn}Reflect.construct(e,[],n)}else{try{n.call()}catch(a){r=a}e.call(n.prototype)}}else{try{throw Error()}catch(l){r=l}(n=e())&&"function"===typeof n.catch&&n.catch(function(){})}}catch(i){if(i&&r&&"string"===typeof i.stack)return[i.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=r.DetermineComponentFrameRoot(),i=l[0],o=l[1];if(i&&o){var s=i.split("\n"),u=o.split("\n");for(a=r=0;r<s.length&&!s[r].includes("DetermineComponentFrameRoot");)r++;for(;a<u.length&&!u[a].includes("DetermineComponentFrameRoot");)a++;if(r===s.length||a===u.length)for(r=s.length-1,a=u.length-1;1<=r&&0<=a&&s[r]!==u[a];)a--;for(;1<=r&&0<=a;r--,a--)if(s[r]!==u[a]){if(1!==r||1!==a)do{if(r--,0>--a||s[r]!==u[a]){var c="\n"+s[r].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}}while(1<=r&&0<=a);break}}}finally{Z=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?J(n):""}function te(e,t){switch(e.tag){case 26:case 27:case 5:return J(e.type);case 16:return J("Lazy");case 13:return e.child!==t&&null!==t?J("Suspense Fallback"):J("Suspense");case 19:return J("SuspenseList");case 0:case 15:return ee(e.type,!1);case 11:return ee(e.type.render,!1);case 1:return ee(e.type,!0);case 31:return J("Activity");default:return""}}function ne(e){try{var t="",n=null;do{t+=te(e,n),n=e,e=e.return}while(e);return t}catch(qn){return"\nError generating stack: "+qn.message+"\n"+qn.stack}}var re=Object.prototype.hasOwnProperty,ae=r.unstable_scheduleCallback,le=r.unstable_cancelCallback,ie=r.unstable_shouldYield,oe=r.unstable_requestPaint,se=r.unstable_now,ue=r.unstable_getCurrentPriorityLevel,ce=r.unstable_ImmediatePriority,de=r.unstable_UserBlockingPriority,fe=r.unstable_NormalPriority,pe=r.unstable_LowPriority,he=r.unstable_IdlePriority,me=r.log,ge=r.unstable_setDisableYieldValue,ve=null,be=null;function ye(e){if("function"===typeof me&&ge(e),be&&"function"===typeof be.setStrictMode)try{be.setStrictMode(ve,e)}catch(t){}}var xe=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ke(e)/we|0)|0},ke=Math.log,we=Math.LN2;var Se=256,je=262144,Ee=4194304;function $e(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return 261888&e;case 262144:case 524288:case 1048576:case 2097152:return 3932160&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ce(e,t,n){var r=e.pendingLanes;if(0===r)return 0;var a=0,l=e.suspendedLanes,i=e.pingedLanes;e=e.warmLanes;var o=134217727&r;return 0!==o?0!==(r=o&~l)?a=$e(r):0!==(i&=o)?a=$e(i):n||0!==(n=o&~e)&&(a=$e(n)):0!==(o=r&~l)?a=$e(o):0!==i?a=$e(i):n||0!==(n=r&~e)&&(a=$e(n)),0===a?0:0!==t&&t!==a&&0===(t&l)&&((l=a&-a)>=(n=t&-t)||32===l&&0!==(4194048&n))?t:a}function ze(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function _e(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function Ne(){var e=Ee;return 0===(62914560&(Ee<<=1))&&(Ee=4194304),e}function Pe(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Te(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ae(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-xe(t);e.entangledLanes|=t,e.entanglements[r]=1073741824|e.entanglements[r]|261930&n}function Fe(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-xe(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}function Re(e,t){var n=t&-t;return 0!==((n=0!==(42&n)?1:Oe(n))&(e.suspendedLanes|t))?0:n}function Oe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Le(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function De(){var e=R.p;return 0!==e?e:void 0===(e=window.event)?32:zf(e.type)}function Me(e,t){var n=R.p;try{return R.p=e,t()}finally{R.p=n}}var Ie=Math.random().toString(36).slice(2),He="__reactFiber$"+Ie,Be="__reactProps$"+Ie,Ve="__reactContainer$"+Ie,Ue="__reactEvents$"+Ie,We="__reactListeners$"+Ie,Ke="__reactHandles$"+Ie,qe="__reactResources$"+Ie,Ye="__reactMarker$"+Ie;function Qe(e){delete e[He],delete e[Be],delete e[Ue],delete e[We],delete e[Ke]}function Ge(e){var t=e[He];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ve]||n[He]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Ld(e);null!==e;){if(n=e[He])return n;e=Ld(e)}return t}n=(e=n).parentNode}return null}function Xe(e){if(e=e[He]||e[Ve]){var t=e.tag;if(5===t||6===t||13===t||31===t||26===t||27===t||3===t)return e}return null}function Je(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(i(33))}function Ze(e){var t=e[qe];return t||(t=e[qe]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function et(e){e[Ye]=!0}var tt=new Set,nt={};function rt(e,t){at(e,t),at(e+"Capture",t)}function at(e,t){for(nt[e]=t,e=0;e<t.length;e++)tt.add(t[e])}var lt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),it={},ot={};function st(e,t,n){if(a=t,re.call(ot,a)||!re.call(it,a)&&(lt.test(a)?ot[a]=!0:(it[a]=!0,0)))if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var r=t.toLowerCase().slice(0,5);if("data-"!==r&&"aria-"!==r)return void e.removeAttribute(t)}e.setAttribute(t,""+n)}var a}function ut(e,t,n){if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+n)}}function ct(e,t,n,r){if(null===r)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(n)}e.setAttributeNS(t,n,""+r)}}function dt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function ft(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function pt(e){if(!e._valueTracker){var t=ft(e)?"checked":"value";e._valueTracker=function(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&"undefined"!==typeof r&&"function"===typeof r.get&&"function"===typeof r.set){var a=r.get,l=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){n=""+e,l.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e,t,""+e[t])}}function ht(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ft(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function mt(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var gt=/[\n"\\]/g;function vt(e){return e.replace(gt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function bt(e,t,n,r,a,l,i,o){e.name="",null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i?e.type=i:e.removeAttribute("type"),null!=t?"number"===i?(0===t&&""===e.value||e.value!=t)&&(e.value=""+dt(t)):e.value!==""+dt(t)&&(e.value=""+dt(t)):"submit"!==i&&"reset"!==i||e.removeAttribute("value"),null!=t?xt(e,i,dt(t)):null!=n?xt(e,i,dt(n)):null!=r&&e.removeAttribute("value"),null==a&&null!=l&&(e.defaultChecked=!!l),null!=a&&(e.checked=a&&"function"!==typeof a&&"symbol"!==typeof a),null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o?e.name=""+dt(o):e.removeAttribute("name")}function yt(e,t,n,r,a,l,i,o){if(null!=l&&"function"!==typeof l&&"symbol"!==typeof l&&"boolean"!==typeof l&&(e.type=l),null!=t||null!=n){if(!("submit"!==l&&"reset"!==l||void 0!==t&&null!==t))return void pt(e);n=null!=n?""+dt(n):"",t=null!=t?""+dt(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}r="function"!==typeof(r=null!=r?r:a)&&"symbol"!==typeof r&&!!r,e.checked=o?e.checked:!!r,e.defaultChecked=!!r,null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.name=i),pt(e)}function xt(e,t,n){"number"===t&&mt(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function kt(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+dt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n)return e[a].selected=!0,void(r&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function wt(e,t,n){null==t||((t=""+dt(t))!==e.value&&(e.value=t),null!=n)?e.defaultValue=null!=n?""+dt(n):"":e.defaultValue!==t&&(e.defaultValue=t)}function St(e,t,n,r){if(null==t){if(null!=r){if(null!=n)throw Error(i(92));if(A(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}null==n&&(n=""),t=n}n=dt(t),e.defaultValue=n,(r=e.textContent)===n&&""!==r&&null!==r&&(e.value=r),pt(e)}function jt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var Et=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $t(e,t,n){var r=0===t.indexOf("--");null==n||"boolean"===typeof n||""===n?r?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":r?e.setProperty(t,n):"number"!==typeof n||0===n||Et.has(t)?"float"===t?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Ct(e,t,n){if(null!=t&&"object"!==typeof t)throw Error(i(62));if(e=e.style,null!=n){for(var r in n)!n.hasOwnProperty(r)||null!=t&&t.hasOwnProperty(r)||(0===r.indexOf("--")?e.setProperty(r,""):"float"===r?e.cssFloat="":e[r]="");for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&$t(e,a,r)}else for(var l in t)t.hasOwnProperty(l)&&$t(e,l,t[l])}function zt(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _t=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Nt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Pt(e){return Nt.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Tt(){}var At=null;function Ft(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Rt=null,Ot=null;function Lt(e){var t=Xe(e);if(t&&(e=t.stateNode)){var n=e[Be]||null;e:switch(e=t.stateNode,t.type){case"input":if(bt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+vt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Be]||null;if(!a)throw Error(i(90));bt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)(r=n[t]).form===e.form&&ht(r)}break e;case"textarea":wt(e,n.value,n.defaultValue);break e;case"select":null!=(t=n.value)&&kt(e,!!n.multiple,t,!1)}}}var Dt=!1;function Mt(e,t,n){if(Dt)return e(t,n);Dt=!0;try{return e(t)}finally{if(Dt=!1,(null!==Rt||null!==Ot)&&(ec(),Rt&&(t=Rt,e=Ot,Ot=Rt=null,Lt(t),e)))for(t=0;t<e.length;t++)Lt(e[t])}}function It(e,t){var n=e.stateNode;if(null===n)return null;var r=n[Be]||null;if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(i(231,t,typeof n));return n}var Ht=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Bt=!1;if(Ht)try{var Vt={};Object.defineProperty(Vt,"passive",{get:function(){Bt=!0}}),window.addEventListener("test",Vt,Vt),window.removeEventListener("test",Vt,Vt)}catch(Zf){Bt=!1}var Ut=null,Wt=null,Kt=null;function qt(){if(Kt)return Kt;var e,t,n=Wt,r=n.length,a="value"in Ut?Ut.value:Ut.textContent,l=a.length;for(e=0;e<r&&n[e]===a[e];e++);var i=r-e;for(t=1;t<=i&&n[r-t]===a[l-t];t++);return Kt=a.slice(e,1<t?1-t:void 0)}function Yt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Qt(){return!0}function Gt(){return!1}function Xt(e){function t(t,n,r,a,l){for(var i in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=a,this.target=l,this.currentTarget=null,e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(a):a[i]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?Qt:Gt,this.isPropagationStopped=Gt,this}return p(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Qt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Qt)},persist:function(){},isPersistent:Qt}),t}var Jt,Zt,en,tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},nn=Xt(tn),rn=p({},tn,{view:0,detail:0}),an=Xt(rn),ln=p({},rn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==en&&(en&&"mousemove"===e.type?(Jt=e.screenX-en.screenX,Zt=e.screenY-en.screenY):Zt=Jt=0,en=e),Jt)},movementY:function(e){return"movementY"in e?e.movementY:Zt}}),on=Xt(ln),sn=Xt(p({},ln,{dataTransfer:0})),un=Xt(p({},rn,{relatedTarget:0})),cn=Xt(p({},tn,{animationName:0,elapsedTime:0,pseudoElement:0})),dn=Xt(p({},tn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),fn=Xt(p({},tn,{data:0})),pn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=mn[e])&&!!t[e]}function vn(){return gn}var bn=Xt(p({},rn,{key:function(e){if(e.key){var t=pn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Yt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?hn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vn,charCode:function(e){return"keypress"===e.type?Yt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Yt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),yn=Xt(p({},ln,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),xn=Xt(p({},rn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vn})),kn=Xt(p({},tn,{propertyName:0,elapsedTime:0,pseudoElement:0})),wn=Xt(p({},ln,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Sn=Xt(p({},tn,{newState:0,oldState:0})),jn=[9,13,27,32],En=Ht&&"CompositionEvent"in window,$n=null;Ht&&"documentMode"in document&&($n=document.documentMode);var Cn=Ht&&"TextEvent"in window&&!$n,zn=Ht&&(!En||$n&&8<$n&&11>=$n),_n=String.fromCharCode(32),Nn=!1;function Pn(e,t){switch(e){case"keyup":return-1!==jn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Tn(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var An=!1;var Fn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Fn[e.type]:"textarea"===t}function On(e,t,n,r){Rt?Ot?Ot.push(r):Ot=[r]:Rt=r,0<(t=ad(t,"onChange")).length&&(n=new nn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ln=null,Dn=null;function Mn(e){Gc(e,0)}function In(e){if(ht(Je(e)))return e}function Hn(e,t){if("change"===e)return t}var Bn=!1;if(Ht){var Vn;if(Ht){var Un="oninput"in document;if(!Un){var Wn=document.createElement("div");Wn.setAttribute("oninput","return;"),Un="function"===typeof Wn.oninput}Vn=Un}else Vn=!1;Bn=Vn&&(!document.documentMode||9<document.documentMode)}function Kn(){Ln&&(Ln.detachEvent("onpropertychange",Yn),Dn=Ln=null)}function Yn(e){if("value"===e.propertyName&&In(Dn)){var t=[];On(t,Dn,e,Ft(e)),Mt(Mn,t)}}function Qn(e,t,n){"focusin"===e?(Kn(),Dn=n,(Ln=t).attachEvent("onpropertychange",Yn)):"focusout"===e&&Kn()}function Gn(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return In(Dn)}function Xn(e,t){if("click"===e)return In(t)}function Jn(e,t){if("input"===e||"change"===e)return In(t)}var Zn="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function er(e,t){if(Zn(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!re.call(t,a)||!Zn(e[a],t[a]))return!1}return!0}function tr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function nr(e,t){var n,r=tr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=tr(r)}}function rr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?rr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function ar(e){for(var t=mt((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=mt((e=t.contentWindow).document)}return t}function lr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var ir=Ht&&"documentMode"in document&&11>=document.documentMode,or=null,sr=null,ur=null,cr=!1;function dr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;cr||null==or||or!==mt(r)||("selectionStart"in(r=or)&&lr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},ur&&er(ur,r)||(ur=r,0<(r=ad(sr,"onSelect")).length&&(t=new nn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=or)))}function fr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var pr={animationend:fr("Animation","AnimationEnd"),animationiteration:fr("Animation","AnimationIteration"),animationstart:fr("Animation","AnimationStart"),transitionrun:fr("Transition","TransitionRun"),transitionstart:fr("Transition","TransitionStart"),transitioncancel:fr("Transition","TransitionCancel"),transitionend:fr("Transition","TransitionEnd")},hr={},mr={};function gr(e){if(hr[e])return hr[e];if(!pr[e])return e;var t,n=pr[e];for(t in n)if(n.hasOwnProperty(t)&&t in mr)return hr[e]=n[t];return e}Ht&&(mr=document.createElement("div").style,"AnimationEvent"in window||(delete pr.animationend.animation,delete pr.animationiteration.animation,delete pr.animationstart.animation),"TransitionEvent"in window||delete pr.transitionend.transition);var vr=gr("animationend"),br=gr("animationiteration"),yr=gr("animationstart"),xr=gr("transitionrun"),kr=gr("transitionstart"),wr=gr("transitioncancel"),Sr=gr("transitionend"),jr=new Map,Er="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $r(e,t){jr.set(e,t),rt(t,[e])}Er.push("scrollEnd");var Cr="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},zr=[],_r=0,Nr=0;function Pr(){for(var e=_r,t=Nr=_r=0;t<e;){var n=zr[t];zr[t++]=null;var r=zr[t];zr[t++]=null;var a=zr[t];zr[t++]=null;var l=zr[t];if(zr[t++]=null,null!==r&&null!==a){var i=r.pending;null===i?a.next=a:(a.next=i.next,i.next=a),r.pending=a}0!==l&&Rr(n,a,l)}}function Tr(e,t,n,r){zr[_r++]=e,zr[_r++]=t,zr[_r++]=n,zr[_r++]=r,Nr|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Ar(e,t,n,r){return Tr(e,t,n,r),Or(e)}function Fr(e,t){return Tr(e,null,null,t),Or(e)}function Rr(e,t,n){e.lanes|=n;var r=e.alternate;null!==r&&(r.lanes|=n);for(var a=!1,l=e.return;null!==l;)l.childLanes|=n,null!==(r=l.alternate)&&(r.childLanes|=n),22===l.tag&&(null===(e=l.stateNode)||1&e._visibility||(a=!0)),e=l,l=l.return;return 3===e.tag?(l=e.stateNode,a&&null!==t&&(a=31-xe(n),null===(r=(e=l.hiddenUpdates)[a])?e[a]=[t]:r.push(t),t.lane=536870912|n),l):null}function Or(e){if(50<Wu)throw Wu=0,Ku=null,Error(i(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Lr={};function Dr(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Mr(e,t,n,r){return new Dr(e,t,n,r)}function Ir(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Hr(e,t){var n=e.alternate;return null===n?((n=Mr(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=65011712&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Br(e,t){e.flags&=65011714;var n=e.alternate;return null===n?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Vr(e,t,n,r,a,l){var o=0;if(r=e,"function"===typeof e)Ir(e)&&(o=1);else if("string"===typeof e)o=function(e,t,n){if(1===n||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,n,U.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case C:return(e=Mr(31,n,t,a)).elementType=C,e.lanes=l,e;case v:return Ur(n.children,a,l,t);case b:o=8,a|=24;break;case y:return(e=Mr(12,n,t,2|a)).elementType=y,e.lanes=l,e;case S:return(e=Mr(13,n,t,a)).elementType=S,e.lanes=l,e;case j:return(e=Mr(19,n,t,a)).elementType=j,e.lanes=l,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case k:o=10;break e;case x:o=9;break e;case w:o=11;break e;case E:o=14;break e;case $:o=16,r=null;break e}o=29,n=Error(i(130,null===e?"null":typeof e,"")),r=null}return(t=Mr(o,n,t,a)).elementType=e,t.type=r,t.lanes=l,t}function Ur(e,t,n,r){return(e=Mr(7,e,r,t)).lanes=n,e}function Wr(e,t,n){return(e=Mr(6,e,null,t)).lanes=n,e}function Kr(e){var t=Mr(18,null,null,0);return t.stateNode=e,t}function qr(e,t,n){return(t=Mr(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Yr=new WeakMap;function Qr(e,t){if("object"===typeof e&&null!==e){var n=Yr.get(e);return void 0!==n?n:(t={value:e,source:t,stack:ne(t)},Yr.set(e,t),t)}return{value:e,source:t,stack:ne(t)}}var Gr=[],Xr=0,Jr=null,Zr=0,ea=[],ta=0,na=null,ra=1,aa="";function la(e,t){Gr[Xr++]=Zr,Gr[Xr++]=Jr,Jr=e,Zr=t}function ia(e,t,n){ea[ta++]=ra,ea[ta++]=aa,ea[ta++]=na,na=e;var r=ra;e=aa;var a=32-xe(r)-1;r&=~(1<<a),n+=1;var l=32-xe(t)+a;if(30<l){var i=a-a%5;l=(r&(1<<i)-1).toString(32),r>>=i,a-=i,ra=1<<32-xe(t)+a|n<<a|r,aa=l+e}else ra=1<<l|n<<a|r,aa=e}function oa(e){null!==e.return&&(la(e,1),ia(e,1,0))}function sa(e){for(;e===Jr;)Jr=Gr[--Xr],Gr[Xr]=null,Zr=Gr[--Xr],Gr[Xr]=null;for(;e===na;)na=ea[--ta],ea[ta]=null,aa=ea[--ta],ea[ta]=null,ra=ea[--ta],ea[ta]=null}function ua(e,t){ea[ta++]=ra,ea[ta++]=aa,ea[ta++]=na,ra=t.id,aa=t.overflow,na=e}var ca=null,da=null,fa=!1,pa=null,ha=!1,ma=Error(i(519));function ga(e){throw wa(Qr(Error(i(418,1<arguments.length&&void 0!==arguments[1]&&arguments[1]?"text":"HTML","")),e)),ma}function va(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[He]=e,t[Be]=r,n){case"dialog":Xc("cancel",t),Xc("close",t);break;case"iframe":case"object":case"embed":Xc("load",t);break;case"video":case"audio":for(n=0;n<Yc.length;n++)Xc(Yc[n],t);break;case"source":Xc("error",t);break;case"img":case"image":case"link":Xc("error",t),Xc("load",t);break;case"details":Xc("toggle",t);break;case"input":Xc("invalid",t),yt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":Xc("invalid",t);break;case"textarea":Xc("invalid",t),St(t,r.value,r.defaultValue,r.children)}"string"!==typeof(n=r.children)&&"number"!==typeof n&&"bigint"!==typeof n||t.textContent===""+n||!0===r.suppressHydrationWarning||cd(t.textContent,n)?(null!=r.popover&&(Xc("beforetoggle",t),Xc("toggle",t)),null!=r.onScroll&&Xc("scroll",t),null!=r.onScrollEnd&&Xc("scrollend",t),null!=r.onClick&&(t.onclick=Tt),t=!0):t=!1,t||ga(e,!0)}function ba(e){for(ca=e.return;ca;)switch(ca.tag){case 5:case 31:case 13:return void(ha=!1);case 27:case 3:return void(ha=!0);default:ca=ca.return}}function ya(e){if(e!==ca)return!1;if(!fa)return ba(e),fa=!0,!1;var t,n=e.tag;if((t=3!==n&&27!==n)&&((t=5===n)&&(t=!("form"!==(t=e.type)&&"button"!==t)||xd(e.type,e.memoizedProps)),t=!t),t&&da&&ga(e),ba(e),13===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(i(317));da=Od(e)}else if(31===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(i(317));da=Od(e)}else 27===n?(n=da,Cd(e.type)?(e=Rd,Rd=null,da=e):da=n):da=ca?Fd(e.stateNode.nextSibling):null;return!0}function xa(){da=ca=null,fa=!1}function ka(){var e=pa;return null!==e&&(null===Pu?Pu=e:Pu.push.apply(Pu,e),pa=null),e}function wa(e){null===pa?pa=[e]:pa.push(e)}var Sa=M(null),ja=null,Ea=null;function $a(e,t,n){H(Sa,t._currentValue),t._currentValue=n}function Ca(e){e._currentValue=Sa.current,I(Sa)}function za(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function _a(e,t,n,r){var a=e.child;for(null!==a&&(a.return=e);null!==a;){var l=a.dependencies;if(null!==l){var o=a.child;l=l.firstContext;e:for(;null!==l;){var s=l;l=a;for(var u=0;u<t.length;u++)if(s.context===t[u]){l.lanes|=n,null!==(s=l.alternate)&&(s.lanes|=n),za(l.return,n,e),r||(o=null);break e}l=s.next}}else if(18===a.tag){if(null===(o=a.return))throw Error(i(341));o.lanes|=n,null!==(l=o.alternate)&&(l.lanes|=n),za(o,n,e),o=null}else o=a.child;if(null!==o)o.return=a;else for(o=a;null!==o;){if(o===e){o=null;break}if(null!==(a=o.sibling)){a.return=o.return,o=a;break}o=o.return}a=o}}function Na(e,t,n,r){e=null;for(var a=t,l=!1;null!==a;){if(!l)if(0!==(524288&a.flags))l=!0;else if(0!==(262144&a.flags))break;if(10===a.tag){var o=a.alternate;if(null===o)throw Error(i(387));if(null!==(o=o.memoizedProps)){var s=a.type;Zn(a.pendingProps.value,o.value)||(null!==e?e.push(s):e=[s])}}else if(a===q.current){if(null===(o=a.alternate))throw Error(i(387));o.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(null!==e?e.push(ff):e=[ff])}a=a.return}null!==e&&_a(t,e,n,r),t.flags|=262144}function Pa(e){for(e=e.firstContext;null!==e;){if(!Zn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ta(e){ja=e,Ea=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Aa(e){return Ra(ja,e)}function Fa(e,t){return null===ja&&Ta(e),Ra(e,t)}function Ra(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},null===Ea){if(null===e)throw Error(i(308));Ea=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ea=Ea.next=t;return n}var Oa="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},La=r.unstable_scheduleCallback,Da=r.unstable_NormalPriority,Ma={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ia(){return{controller:new Oa,data:new Map,refCount:0}}function Ha(e){e.refCount--,0===e.refCount&&La(Da,function(){e.controller.abort()})}var Ba=null,Va=0,Ua=0,Wa=null;function Ka(){if(0===--Va&&null!==Ba){null!==Wa&&(Wa.status="fulfilled");var e=Ba;Ba=null,Ua=0,Wa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var qa=F.S;F.S=function(e,t){Fu=se(),"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Ba){var n=Ba=[];Va=0,Ua=Vc(),Wa={status:"pending",value:void 0,then:function(e){n.push(e)}}}Va++,t.then(Ka,Ka)}(0,t),null!==qa&&qa(e,t)};var Ya=M(null);function Qa(){var e=Ya.current;return null!==e?e:mu.pooledCache}function Ga(e,t){H(Ya,null===t?Ya.current:t.pool)}function Xa(){var e=Qa();return null===e?null:{parent:Ma._currentValue,pool:e}}var Ja=Error(i(460)),Za=Error(i(474)),el=Error(i(542)),tl={then:function(){}};function nl(e){return"fulfilled"===(e=e.status)||"rejected"===e}function rl(e,t,n){switch(void 0===(n=e[n])?e.push(t):n!==t&&(t.then(Tt,Tt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw ol(e=t.reason),e;default:if("string"===typeof t.status)t.then(Tt,Tt);else{if(null!==(e=mu)&&100<e.shellSuspendCounter)throw Error(i(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var n=t;n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t;n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw ol(e=t.reason),e}throw ll=t,Ja}}function al(e){try{return(0,e._init)(e._payload)}catch(qn){if(null!==qn&&"object"===typeof qn&&"function"===typeof qn.then)throw ll=qn,Ja;throw qn}}var ll=null;function il(){if(null===ll)throw Error(i(459));var e=ll;return ll=null,e}function ol(e){if(e===Ja||e===el)throw Error(i(483))}var sl=null,ul=0;function cl(e){var t=ul;return ul+=1,null===sl&&(sl=[]),rl(sl,e,t)}function dl(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function fl(e,t){if(t.$$typeof===h)throw Error(i(525));throw e=Object.prototype.toString.call(t),Error(i(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function pl(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function a(e,t){return(e=Hr(e,t)).index=0,e.sibling=null,e}function l(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=67108866,n):r:(t.flags|=67108866,n):(t.flags|=1048576,n)}function o(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function s(e,t,n,r){return null===t||6!==t.tag?((t=Wr(n,e.mode,r)).return=e,t):((t=a(t,n)).return=e,t)}function u(e,t,n,r){var l=n.type;return l===v?d(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===l||"object"===typeof l&&null!==l&&l.$$typeof===$&&al(l)===t.type)?(dl(t=a(t,n.props),n),t.return=e,t):(dl(t=Vr(n.type,n.key,n.props,null,e.mode,r),n),t.return=e,t)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=qr(n,e.mode,r)).return=e,t):((t=a(t,n.children||[])).return=e,t)}function d(e,t,n,r,l){return null===t||7!==t.tag?((t=Ur(n,e.mode,r,l)).return=e,t):((t=a(t,n)).return=e,t)}function f(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=Wr(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case m:return dl(n=Vr(t.type,t.key,t.props,null,e.mode,n),t),n.return=e,n;case g:return(t=qr(t,e.mode,n)).return=e,t;case $:return f(e,t=al(t),n)}if(A(t)||N(t))return(t=Ur(t,e.mode,n,null)).return=e,t;if("function"===typeof t.then)return f(e,cl(t),n);if(t.$$typeof===k)return f(e,Fa(e,t),n);fl(e,t)}return null}function p(e,t,n,r){var a=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return null!==a?null:s(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case m:return n.key===a?u(e,t,n,r):null;case g:return n.key===a?c(e,t,n,r):null;case $:return p(e,t,n=al(n),r)}if(A(n)||N(n))return null!==a?null:d(e,t,n,r,null);if("function"===typeof n.then)return p(e,t,cl(n),r);if(n.$$typeof===k)return p(e,t,Fa(e,n),r);fl(e,n)}return null}function h(e,t,n,r,a){if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return s(t,e=e.get(n)||null,""+r,a);if("object"===typeof r&&null!==r){switch(r.$$typeof){case m:return u(t,e=e.get(null===r.key?n:r.key)||null,r,a);case g:return c(t,e=e.get(null===r.key?n:r.key)||null,r,a);case $:return h(e,t,n,r=al(r),a)}if(A(r)||N(r))return d(t,e=e.get(n)||null,r,a,null);if("function"===typeof r.then)return h(e,t,n,cl(r),a);if(r.$$typeof===k)return h(e,t,n,Fa(t,r),a);fl(t,r)}return null}function b(s,u,c,d){if("object"===typeof c&&null!==c&&c.type===v&&null===c.key&&(c=c.props.children),"object"===typeof c&&null!==c){switch(c.$$typeof){case m:e:{for(var y=c.key;null!==u;){if(u.key===y){if((y=c.type)===v){if(7===u.tag){n(s,u.sibling),(d=a(u,c.props.children)).return=s,s=d;break e}}else if(u.elementType===y||"object"===typeof y&&null!==y&&y.$$typeof===$&&al(y)===u.type){n(s,u.sibling),dl(d=a(u,c.props),c),d.return=s,s=d;break e}n(s,u);break}t(s,u),u=u.sibling}c.type===v?((d=Ur(c.props.children,s.mode,d,c.key)).return=s,s=d):(dl(d=Vr(c.type,c.key,c.props,null,s.mode,d),c),d.return=s,s=d)}return o(s);case g:e:{for(y=c.key;null!==u;){if(u.key===y){if(4===u.tag&&u.stateNode.containerInfo===c.containerInfo&&u.stateNode.implementation===c.implementation){n(s,u.sibling),(d=a(u,c.children||[])).return=s,s=d;break e}n(s,u);break}t(s,u),u=u.sibling}(d=qr(c,s.mode,d)).return=s,s=d}return o(s);case $:return b(s,u,c=al(c),d)}if(A(c))return function(a,i,o,s){for(var u=null,c=null,d=i,m=i=0,g=null;null!==d&&m<o.length;m++){d.index>m?(g=d,d=null):g=d.sibling;var v=p(a,d,o[m],s);if(null===v){null===d&&(d=g);break}e&&d&&null===v.alternate&&t(a,d),i=l(v,i,m),null===c?u=v:c.sibling=v,c=v,d=g}if(m===o.length)return n(a,d),fa&&la(a,m),u;if(null===d){for(;m<o.length;m++)null!==(d=f(a,o[m],s))&&(i=l(d,i,m),null===c?u=d:c.sibling=d,c=d);return fa&&la(a,m),u}for(d=r(d);m<o.length;m++)null!==(g=h(d,a,m,o[m],s))&&(e&&null!==g.alternate&&d.delete(null===g.key?m:g.key),i=l(g,i,m),null===c?u=g:c.sibling=g,c=g);return e&&d.forEach(function(e){return t(a,e)}),fa&&la(a,m),u}(s,u,c,d);if(N(c)){if("function"!==typeof(y=N(c)))throw Error(i(150));return function(a,o,s,u){if(null==s)throw Error(i(151));for(var c=null,d=null,m=o,g=o=0,v=null,b=s.next();null!==m&&!b.done;g++,b=s.next()){m.index>g?(v=m,m=null):v=m.sibling;var y=p(a,m,b.value,u);if(null===y){null===m&&(m=v);break}e&&m&&null===y.alternate&&t(a,m),o=l(y,o,g),null===d?c=y:d.sibling=y,d=y,m=v}if(b.done)return n(a,m),fa&&la(a,g),c;if(null===m){for(;!b.done;g++,b=s.next())null!==(b=f(a,b.value,u))&&(o=l(b,o,g),null===d?c=b:d.sibling=b,d=b);return fa&&la(a,g),c}for(m=r(m);!b.done;g++,b=s.next())null!==(b=h(m,a,g,b.value,u))&&(e&&null!==b.alternate&&m.delete(null===b.key?g:b.key),o=l(b,o,g),null===d?c=b:d.sibling=b,d=b);return e&&m.forEach(function(e){return t(a,e)}),fa&&la(a,g),c}(s,u,c=y.call(c),d)}if("function"===typeof c.then)return b(s,u,cl(c),d);if(c.$$typeof===k)return b(s,u,Fa(s,c),d);fl(s,c)}return"string"===typeof c&&""!==c||"number"===typeof c||"bigint"===typeof c?(c=""+c,null!==u&&6===u.tag?(n(s,u.sibling),(d=a(u,c)).return=s,s=d):(n(s,u),(d=Wr(c,s.mode,d)).return=s,s=d),o(s)):n(s,u)}return function(e,t,n,r){try{ul=0;var a=b(e,t,n,r);return sl=null,a}catch(qn){if(qn===Ja||qn===el)throw qn;var l=Mr(29,qn,null,e.mode);return l.lanes=r,l.return=e,l}}}var hl=pl(!0),ml=pl(!1),gl=!1;function vl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function bl(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function yl(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function xl(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&hu)){var a=r.pending;return null===a?t.next=t:(t.next=a.next,a.next=t),r.pending=t,t=Or(e),Rr(e,null,n),t}return Tr(e,r,t,n),Or(e)}function kl(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Fe(e,n)}}function wl(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var a=null,l=null;if(null!==(n=n.firstBaseUpdate)){do{var i={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};null===l?a=l=i:l=l.next=i,n=n.next}while(null!==n);null===l?a=l=t:l=l.next=t}else a=l=t;return n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:l,shared:r.shared,callbacks:r.callbacks},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Sl=!1;function jl(){if(Sl){if(null!==Wa)throw Wa}}function El(e,t,n,r){Sl=!1;var a=e.updateQueue;gl=!1;var l=a.firstBaseUpdate,i=a.lastBaseUpdate,o=a.shared.pending;if(null!==o){a.shared.pending=null;var s=o,u=s.next;s.next=null,null===i?l=u:i.next=u,i=s;var c=e.alternate;null!==c&&((o=(c=c.updateQueue).lastBaseUpdate)!==i&&(null===o?c.firstBaseUpdate=u:o.next=u,c.lastBaseUpdate=s))}if(null!==l){var d=a.baseState;for(i=0,c=u=s=null,o=l;;){var f=-536870913&o.lane,h=f!==o.lane;if(h?(vu&f)===f:(r&f)===f){0!==f&&f===Ua&&(Sl=!0),null!==c&&(c=c.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var m=e,g=o;f=t;var v=n;switch(g.tag){case 1:if("function"===typeof(m=g.payload)){d=m.call(v,d,f);break e}d=m;break e;case 3:m.flags=-65537&m.flags|128;case 0:if(null===(f="function"===typeof(m=g.payload)?m.call(v,d,f):m)||void 0===f)break e;d=p({},d,f);break e;case 2:gl=!0}}null!==(f=o.callback)&&(e.flags|=64,h&&(e.flags|=8192),null===(h=a.callbacks)?a.callbacks=[f]:h.push(f))}else h={lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},null===c?(u=c=h,s=d):c=c.next=h,i|=f;if(null===(o=o.next)){if(null===(o=a.shared.pending))break;o=(h=o).next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}null===c&&(s=d),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=c,null===l&&(a.shared.lanes=0),Eu|=i,e.lanes=i,e.memoizedState=d}}function $l(e,t){if("function"!==typeof e)throw Error(i(191,e));e.call(t)}function Cl(e,t){var n=e.callbacks;if(null!==n)for(e.callbacks=null,e=0;e<n.length;e++)$l(n[e],t)}var zl=M(null),_l=M(0);function Nl(e,t){H(_l,e=Su),H(zl,t),Su=e|t.baseLanes}function Pl(){H(_l,Su),H(zl,zl.current)}function Tl(){Su=_l.current,I(zl),I(_l)}var Al=M(null),Fl=null;function Rl(e){var t=e.alternate;H(Il,1&Il.current),H(Al,e),null===Fl&&(null===t||null!==zl.current||null!==t.memoizedState)&&(Fl=e)}function Ol(e){H(Il,Il.current),H(Al,e),null===Fl&&(Fl=e)}function Ll(e){22===e.tag?(H(Il,Il.current),H(Al,e),null===Fl&&(Fl=e)):Dl()}function Dl(){H(Il,Il.current),H(Al,Al.current)}function Ml(e){I(Al),Fl===e&&(Fl=null),I(Il)}var Il=M(0);function Hl(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||Td(n)||Ad(n)))return t}else if(19!==t.tag||"forwards"!==t.memoizedProps.revealOrder&&"backwards"!==t.memoizedProps.revealOrder&&"unstable_legacy-backwards"!==t.memoizedProps.revealOrder&&"together"!==t.memoizedProps.revealOrder){if(null!==t.child){t.child.return=t,t=t.child;continue}}else if(0!==(128&t.flags))return t;if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bl=0,Vl=null,Ul=null,Wl=null,Kl=!1,ql=!1,Yl=!1,Ql=0,Gl=0,Xl=null,Jl=0;function Zl(){throw Error(i(321))}function ei(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Zn(e[n],t[n]))return!1;return!0}function ti(e,t,n,r,a,l){return Bl=l,Vl=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,F.H=null===e||null===e.memoizedState?vo:bo,Yl=!1,l=n(r,a),Yl=!1,ql&&(l=ri(t,n,r,a)),ni(e),l}function ni(e){F.H=go;var t=null!==Ul&&null!==Ul.next;if(Bl=0,Wl=Ul=Vl=null,Kl=!1,Gl=0,Xl=null,t)throw Error(i(300));null===e||Fo||null!==(e=e.dependencies)&&Pa(e)&&(Fo=!0)}function ri(e,t,n,r){Vl=e;var a=0;do{if(ql&&(Xl=null),Gl=0,ql=!1,25<=a)throw Error(i(301));if(a+=1,Wl=Ul=null,null!=e.updateQueue){var l=e.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,null!=l.memoCache&&(l.memoCache.index=0)}F.H=yo,l=t(n,r)}while(ql);return l}function ai(){var e=F.H,t=e.useState()[0];return t="function"===typeof t.then?ci(t):t,e=e.useState()[0],(null!==Ul?Ul.memoizedState:null)!==e&&(Vl.flags|=1024),t}function li(){var e=0!==Ql;return Ql=0,e}function ii(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function oi(e){if(Kl){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Kl=!1}Bl=0,Wl=Ul=Vl=null,ql=!1,Gl=Ql=0,Xl=null}function si(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Wl?Vl.memoizedState=Wl=e:Wl=Wl.next=e,Wl}function ui(){if(null===Ul){var e=Vl.alternate;e=null!==e?e.memoizedState:null}else e=Ul.next;var t=null===Wl?Vl.memoizedState:Wl.next;if(null!==t)Wl=t,Ul=e;else{if(null===e){if(null===Vl.alternate)throw Error(i(467));throw Error(i(310))}e={memoizedState:(Ul=e).memoizedState,baseState:Ul.baseState,baseQueue:Ul.baseQueue,queue:Ul.queue,next:null},null===Wl?Vl.memoizedState=Wl=e:Wl=Wl.next=e}return Wl}function ci(e){var t=Gl;return Gl+=1,null===Xl&&(Xl=[]),e=rl(Xl,e,t),t=Vl,null===(null===Wl?t.memoizedState:Wl.next)&&(t=t.alternate,F.H=null===t||null===t.memoizedState?vo:bo),e}function di(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return ci(e);if(e.$$typeof===k)return Aa(e)}throw Error(i(438,String(e)))}function fi(e){var t=null,n=Vl.updateQueue;if(null!==n&&(t=n.memoCache),null==t){var r=Vl.alternate;null!==r&&(null!==(r=r.updateQueue)&&(null!=(r=r.memoCache)&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===n&&(n={lastEffect:null,events:null,stores:null,memoCache:null},Vl.updateQueue=n),n.memoCache=t,void 0===(n=t.data[t.index]))for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=z;return t.index++,n}function pi(e,t){return"function"===typeof t?t(e):t}function hi(e){return mi(ui(),Ul,e)}function mi(e,t,n){var r=e.queue;if(null===r)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,l=r.pending;if(null!==l){if(null!==a){var o=a.next;a.next=l.next,l.next=o}t.baseQueue=a=l,r.pending=null}if(l=e.baseState,null===a)e.memoizedState=l;else{var s=o=null,u=null,c=t=a.next,d=!1;do{var f=-536870913&c.lane;if(f!==c.lane?(vu&f)===f:(Bl&f)===f){var p=c.revertLane;if(0===p)null!==u&&(u=u.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),f===Ua&&(d=!0);else{if((Bl&p)===p){c=c.next,p===Ua&&(d=!0);continue}f={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===u?(s=u=f,o=l):u=u.next=f,Vl.lanes|=p,Eu|=p}f=c.action,Yl&&n(l,f),l=c.hasEagerState?c.eagerState:n(l,f)}else p={lane:f,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===u?(s=u=p,o=l):u=u.next=p,Vl.lanes|=f,Eu|=f;c=c.next}while(null!==c&&c!==t);if(null===u?o=l:u.next=s,!Zn(l,e.memoizedState)&&(Fo=!0,d&&null!==(n=Wa)))throw n;e.memoizedState=l,e.baseState=o,e.baseQueue=u,r.lastRenderedState=l}return null===a&&(r.lanes=0),[e.memoizedState,r.dispatch]}function gi(e){var t=ui(),n=t.queue;if(null===n)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,l=t.memoizedState;if(null!==a){n.pending=null;var o=a=a.next;do{l=e(l,o.action),o=o.next}while(o!==a);Zn(l,t.memoizedState)||(Fo=!0),t.memoizedState=l,null===t.baseQueue&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function vi(e,t,n){var r=Vl,a=ui(),l=fa;if(l){if(void 0===n)throw Error(i(407));n=n()}else n=t();var o=!Zn((Ul||a).memoizedState,n);if(o&&(a.memoizedState=n,Fo=!0),a=a.queue,Bi(xi.bind(null,r,a,e),[e]),a.getSnapshot!==t||o||null!==Wl&&1&Wl.memoizedState.tag){if(r.flags|=2048,Li(9,{destroy:void 0},yi.bind(null,r,a,n,t),null),null===mu)throw Error(i(349));l||0!==(127&Bl)||bi(r,t,n)}return n}function bi(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=Vl.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},Vl.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function yi(e,t,n,r){t.value=n,t.getSnapshot=r,ki(t)&&wi(e)}function xi(e,t,n){return n(function(){ki(t)&&wi(e)})}function ki(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Zn(e,n)}catch(r){return!0}}function wi(e){var t=Fr(e,2);null!==t&&Qu(t,e,2)}function Si(e){var t=si();if("function"===typeof e){var n=e;if(e=n(),Yl){ye(!0);try{n()}finally{ye(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:pi,lastRenderedState:e},t}function ji(e,t,n,r){return e.baseState=n,mi(e,Ul,"function"===typeof r?r:pi)}function Ei(e,t,n,r,a){if(po(e))throw Error(i(485));if(null!==(e=t.action)){var l={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){l.listeners.push(e)}};null!==F.T?n(!0):l.isTransition=!1,r(l),null===(n=t.pending)?(l.next=t.pending=l,$i(t,l)):(l.next=n.next,t.pending=n.next=l)}}function $i(e,t){var n=t.action,r=t.payload,a=e.state;if(t.isTransition){var l=F.T,i={};F.T=i;try{var o=n(a,r),s=F.S;null!==s&&s(i,o),Ci(e,t,o)}catch(u){_i(e,t,u)}finally{null!==l&&null!==i.types&&(l.types=i.types),F.T=l}}else try{Ci(e,t,l=n(a,r))}catch(c){_i(e,t,c)}}function Ci(e,t,n){null!==n&&"object"===typeof n&&"function"===typeof n.then?n.then(function(n){zi(e,t,n)},function(n){return _i(e,t,n)}):zi(e,t,n)}function zi(e,t,n){t.status="fulfilled",t.value=n,Ni(t),e.state=n,null!==(t=e.pending)&&((n=t.next)===t?e.pending=null:(n=n.next,t.next=n,$i(e,n)))}function _i(e,t,n){var r=e.pending;if(e.pending=null,null!==r){r=r.next;do{t.status="rejected",t.reason=n,Ni(t),t=t.next}while(t!==r)}e.action=null}function Ni(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Pi(e,t){return t}function Ti(e,t){if(fa){var n=mu.formState;if(null!==n){e:{var r=Vl;if(fa){if(da){t:{for(var a=da,l=ha;8!==a.nodeType;){if(!l){a=null;break t}if(null===(a=Fd(a.nextSibling))){a=null;break t}}a="F!"===(l=a.data)||"F"===l?a:null}if(a){da=Fd(a.nextSibling),r="F!"===a.data;break e}}ga(r)}r=!1}r&&(t=n[0])}}return(n=si()).memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pi,lastRenderedState:t},n.queue=r,n=uo.bind(null,Vl,r),r.dispatch=n,r=Si(!1),l=fo.bind(null,Vl,!1,r.queue),a={state:t,dispatch:null,action:e,pending:null},(r=si()).queue=a,n=Ei.bind(null,Vl,a,l,n),a.dispatch=n,r.memoizedState=e,[t,n,!1]}function Ai(e){return Fi(ui(),Ul,e)}function Fi(e,t,n){if(t=mi(e,t,Pi)[0],e=hi(pi)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var r=ci(t)}catch(qn){if(qn===Ja)throw el;throw qn}else r=t;var a=(t=ui()).queue,l=a.dispatch;return n!==t.memoizedState&&(Vl.flags|=2048,Li(9,{destroy:void 0},Ri.bind(null,a,n),null)),[r,l,e]}function Ri(e,t){e.action=t}function Oi(e){var t=ui(),n=Ul;if(null!==n)return Fi(t,n,e);ui(),t=t.memoizedState;var r=(n=ui()).queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Li(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},null===(t=Vl.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Vl.updateQueue=t),null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Di(){return ui().memoizedState}function Mi(e,t,n,r){var a=si();Vl.flags|=e,a.memoizedState=Li(1|t,{destroy:void 0},n,void 0===r?null:r)}function Ii(e,t,n,r){var a=ui();r=void 0===r?null:r;var l=a.memoizedState.inst;null!==Ul&&null!==r&&ei(r,Ul.memoizedState.deps)?a.memoizedState=Li(t,l,n,r):(Vl.flags|=e,a.memoizedState=Li(1|t,l,n,r))}function Hi(e,t){Mi(8390656,8,e,t)}function Bi(e,t){Ii(2048,8,e,t)}function Vi(e){var t=ui().memoizedState;return function(e){Vl.flags|=4;var t=Vl.updateQueue;if(null===t)t={lastEffect:null,events:null,stores:null,memoCache:null},Vl.updateQueue=t,t.events=[e];else{var n=t.events;null===n?t.events=[e]:n.push(e)}}({ref:t,nextImpl:e}),function(){if(0!==(2&hu))throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Ui(e,t){return Ii(4,2,e,t)}function Wi(e,t){return Ii(4,4,e,t)}function Ki(e,t){if("function"===typeof t){e=e();var n=t(e);return function(){"function"===typeof n?n():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function qi(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,Ii(4,4,Ki.bind(null,t,e),n)}function Yi(){}function Qi(e,t){var n=ui();t=void 0===t?null:t;var r=n.memoizedState;return null!==t&&ei(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Gi(e,t){var n=ui();t=void 0===t?null:t;var r=n.memoizedState;if(null!==t&&ei(t,r[1]))return r[0];if(r=e(),Yl){ye(!0);try{e()}finally{ye(!1)}}return n.memoizedState=[r,t],r}function Xi(e,t,n){return void 0===n||0!==(1073741824&Bl)&&0===(261930&vu)?e.memoizedState=t:(e.memoizedState=n,e=Yu(),Vl.lanes|=e,Eu|=e,n)}function Ji(e,t,n,r){return Zn(n,t)?n:null!==zl.current?(e=Xi(e,n,r),Zn(e,t)||(Fo=!0),e):0===(42&Bl)||0!==(1073741824&Bl)&&0===(261930&vu)?(Fo=!0,e.memoizedState=n):(e=Yu(),Vl.lanes|=e,Eu|=e,t)}function Zi(e,t,n,r,a){var l=R.p;R.p=0!==l&&8>l?l:8;var i=F.T,o={};F.T=o,fo(e,!1,t,n);try{var s=a(),u=F.S;if(null!==u&&u(o,s),null!==s&&"object"===typeof s&&"function"===typeof s.then)co(e,t,function(e,t){var n=[],r={status:"pending",value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status="rejected",r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}(s,r),qu());else co(e,t,r,qu())}catch(c){co(e,t,{then:function(){},status:"rejected",reason:c},qu())}finally{R.p=l,null!==i&&null!==o.types&&(i.types=o.types),F.T=i}}function eo(){}function to(e,t,n,r){if(5!==e.tag)throw Error(i(476));var a=no(e).queue;Zi(e,a,t,O,null===n?eo:function(){return ro(e),n(r)})}function no(e){var t=e.memoizedState;if(null!==t)return t;var n={};return(t={memoizedState:O,baseState:O,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pi,lastRenderedState:O},next:null}).next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pi,lastRenderedState:n},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function ro(e){var t=no(e);null===t.next&&(t=e.alternate.memoizedState),co(e,t.next.queue,{},qu())}function ao(){return Aa(ff)}function lo(){return ui().memoizedState}function io(){return ui().memoizedState}function oo(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var n=qu(),r=xl(t,e=yl(n),n);return null!==r&&(Qu(r,t,n),kl(r,t,n)),t={cache:Ia()},void(e.payload=t)}t=t.return}}function so(e,t,n){var r=qu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},po(e)?ho(t,n):null!==(n=Ar(e,t,n,r))&&(Qu(n,e,r),mo(n,t,r))}function uo(e,t,n){co(e,t,n,qu())}function co(e,t,n,r){var a={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(po(e))ho(t,a);else{var l=e.alternate;if(0===e.lanes&&(null===l||0===l.lanes)&&null!==(l=t.lastRenderedReducer))try{var i=t.lastRenderedState,o=l(i,n);if(a.hasEagerState=!0,a.eagerState=o,Zn(o,i))return Tr(e,t,a,0),null===mu&&Pr(),!1}catch(s){}if(null!==(n=Ar(e,t,a,r)))return Qu(n,e,r),mo(n,t,r),!0}return!1}function fo(e,t,n,r){if(r={lane:2,revertLane:Vc(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},po(e)){if(t)throw Error(i(479))}else null!==(t=Ar(e,n,r,2))&&Qu(t,e,2)}function po(e){var t=e.alternate;return e===Vl||null!==t&&t===Vl}function ho(e,t){ql=Kl=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function mo(e,t,n){if(0!==(4194048&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Fe(e,n)}}var go={readContext:Aa,use:di,useCallback:Zl,useContext:Zl,useEffect:Zl,useImperativeHandle:Zl,useLayoutEffect:Zl,useInsertionEffect:Zl,useMemo:Zl,useReducer:Zl,useRef:Zl,useState:Zl,useDebugValue:Zl,useDeferredValue:Zl,useTransition:Zl,useSyncExternalStore:Zl,useId:Zl,useHostTransitionStatus:Zl,useFormState:Zl,useActionState:Zl,useOptimistic:Zl,useMemoCache:Zl,useCacheRefresh:Zl};go.useEffectEvent=Zl;var vo={readContext:Aa,use:di,useCallback:function(e,t){return si().memoizedState=[e,void 0===t?null:t],e},useContext:Aa,useEffect:Hi,useImperativeHandle:function(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,Mi(4194308,4,Ki.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Mi(4194308,4,e,t)},useInsertionEffect:function(e,t){Mi(4,2,e,t)},useMemo:function(e,t){var n=si();t=void 0===t?null:t;var r=e();if(Yl){ye(!0);try{e()}finally{ye(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=si();if(void 0!==n){var a=n(t);if(Yl){ye(!0);try{n(t)}finally{ye(!1)}}}else a=t;return r.memoizedState=r.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},r.queue=e,e=e.dispatch=so.bind(null,Vl,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},si().memoizedState=e},useState:function(e){var t=(e=Si(e)).queue,n=uo.bind(null,Vl,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Yi,useDeferredValue:function(e,t){return Xi(si(),e,t)},useTransition:function(){var e=Si(!1);return e=Zi.bind(null,Vl,e.queue,!0,!1),si().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=Vl,a=si();if(fa){if(void 0===n)throw Error(i(407));n=n()}else{if(n=t(),null===mu)throw Error(i(349));0!==(127&vu)||bi(r,t,n)}a.memoizedState=n;var l={value:n,getSnapshot:t};return a.queue=l,Hi(xi.bind(null,r,l,e),[e]),r.flags|=2048,Li(9,{destroy:void 0},yi.bind(null,r,l,n,t),null),n},useId:function(){var e=si(),t=mu.identifierPrefix;if(fa){var n=aa;t="_"+t+"R_"+(n=(ra&~(1<<32-xe(ra)-1)).toString(32)+n),0<(n=Ql++)&&(t+="H"+n.toString(32)),t+="_"}else t="_"+t+"r_"+(n=Jl++).toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:ao,useFormState:Ti,useActionState:Ti,useOptimistic:function(e){var t=si();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=fo.bind(null,Vl,!0,n),n.dispatch=t,[e,t]},useMemoCache:fi,useCacheRefresh:function(){return si().memoizedState=oo.bind(null,Vl)},useEffectEvent:function(e){var t=si(),n={impl:e};return t.memoizedState=n,function(){if(0!==(2&hu))throw Error(i(440));return n.impl.apply(void 0,arguments)}}},bo={readContext:Aa,use:di,useCallback:Qi,useContext:Aa,useEffect:Bi,useImperativeHandle:qi,useInsertionEffect:Ui,useLayoutEffect:Wi,useMemo:Gi,useReducer:hi,useRef:Di,useState:function(){return hi(pi)},useDebugValue:Yi,useDeferredValue:function(e,t){return Ji(ui(),Ul.memoizedState,e,t)},useTransition:function(){var e=hi(pi)[0],t=ui().memoizedState;return["boolean"===typeof e?e:ci(e),t]},useSyncExternalStore:vi,useId:lo,useHostTransitionStatus:ao,useFormState:Ai,useActionState:Ai,useOptimistic:function(e,t){return ji(ui(),0,e,t)},useMemoCache:fi,useCacheRefresh:io};bo.useEffectEvent=Vi;var yo={readContext:Aa,use:di,useCallback:Qi,useContext:Aa,useEffect:Bi,useImperativeHandle:qi,useInsertionEffect:Ui,useLayoutEffect:Wi,useMemo:Gi,useReducer:gi,useRef:Di,useState:function(){return gi(pi)},useDebugValue:Yi,useDeferredValue:function(e,t){var n=ui();return null===Ul?Xi(n,e,t):Ji(n,Ul.memoizedState,e,t)},useTransition:function(){var e=gi(pi)[0],t=ui().memoizedState;return["boolean"===typeof e?e:ci(e),t]},useSyncExternalStore:vi,useId:lo,useHostTransitionStatus:ao,useFormState:Oi,useActionState:Oi,useOptimistic:function(e,t){var n=ui();return null!==Ul?ji(n,0,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:fi,useCacheRefresh:io};function xo(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:p({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}yo.useEffectEvent=Vi;var ko={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=qu(),a=yl(r);a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=xl(e,a,r))&&(Qu(t,e,r),kl(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=qu(),a=yl(r);a.tag=1,a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=xl(e,a,r))&&(Qu(t,e,r),kl(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=qu(),r=yl(n);r.tag=2,void 0!==t&&null!==t&&(r.callback=t),null!==(t=xl(e,r,n))&&(Qu(t,e,n),kl(t,e,n))}};function wo(e,t,n,r,a,l,i){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,l,i):!t.prototype||!t.prototype.isPureReactComponent||(!er(n,r)||!er(a,l))}function So(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ko.enqueueReplaceState(t,t.state,null)}function jo(e,t){var n=t;if("ref"in t)for(var r in n={},t)"ref"!==r&&(n[r]=t[r]);if(e=e.defaultProps)for(var a in n===t&&(n=p({},n)),e)void 0===n[a]&&(n[a]=e[a]);return n}function Eo(e){Cr(e)}function $o(e){console.error(e)}function Co(e){Cr(e)}function zo(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function _o(e,t,n){try{(0,e.onCaughtError)(n.value,{componentStack:n.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function No(e,t,n){return(n=yl(n)).tag=3,n.payload={element:null},n.callback=function(){zo(e,t)},n}function Po(e){return(e=yl(e)).tag=3,e}function To(e,t,n,r){var a=n.type.getDerivedStateFromError;if("function"===typeof a){var l=r.value;e.payload=function(){return a(l)},e.callback=function(){_o(t,n,r)}}var i=n.stateNode;null!==i&&"function"===typeof i.componentDidCatch&&(e.callback=function(){_o(t,n,r),"function"!==typeof a&&(null===Lu?Lu=new Set([this]):Lu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}var Ao=Error(i(461)),Fo=!1;function Ro(e,t,n,r){t.child=null===e?ml(t,null,n,r):hl(t,e.child,n,r)}function Oo(e,t,n,r,a){n=n.render;var l=t.ref;if("ref"in r){var i={};for(var o in r)"ref"!==o&&(i[o]=r[o])}else i=r;return Ta(t),r=ti(e,t,n,i,l,a),o=li(),null===e||Fo?(fa&&o&&oa(t),t.flags|=1,Ro(e,t,r,a),t.child):(ii(e,t,a),ls(e,t,a))}function Lo(e,t,n,r,a){if(null===e){var l=n.type;return"function"!==typeof l||Ir(l)||void 0!==l.defaultProps||null!==n.compare?((e=Vr(n.type,null,r,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=l,Do(e,t,l,r,a))}if(l=e.child,!is(e,a)){var i=l.memoizedProps;if((n=null!==(n=n.compare)?n:er)(i,r)&&e.ref===t.ref)return ls(e,t,a)}return t.flags|=1,(e=Hr(l,r)).ref=t.ref,e.return=t,t.child=e}function Do(e,t,n,r,a){if(null!==e){var l=e.memoizedProps;if(er(l,r)&&e.ref===t.ref){if(Fo=!1,t.pendingProps=r=l,!is(e,a))return t.lanes=e.lanes,ls(e,t,a);0!==(131072&e.flags)&&(Fo=!0)}}return Wo(e,t,n,r,a)}function Mo(e,t,n,r){var a=r.children,l=null!==e?e.memoizedState:null;if(null===e&&null===t.stateNode&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),"hidden"===r.mode){if(0!==(128&t.flags)){if(l=null!==l?l.baseLanes|n:n,null!==e){for(r=t.child=e.child,a=0;null!==r;)a=a|r.lanes|r.childLanes,r=r.sibling;r=a&~l}else r=0,t.child=null;return Ho(e,t,l,n,r)}if(0===(536870912&n))return r=t.lanes=536870912,Ho(e,t,null!==l?l.baseLanes|n:n,n,r);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Ga(0,null!==l?l.cachePool:null),null!==l?Nl(t,l):Pl(),Ll(t)}else null!==l?(Ga(0,l.cachePool),Nl(t,l),Dl(),t.memoizedState=null):(null!==e&&Ga(0,null),Pl(),Dl());return Ro(e,t,a,n),t.child}function Io(e,t){return null!==e&&22===e.tag||null!==t.stateNode||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ho(e,t,n,r,a){var l=Qa();return l=null===l?null:{parent:Ma._currentValue,pool:l},t.memoizedState={baseLanes:n,cachePool:l},null!==e&&Ga(0,null),Pl(),Ll(t),null!==e&&Na(e,t,r,!0),t.childLanes=a,null}function Bo(e,t){return(t=es({mode:t.mode,children:t.children},e.mode)).ref=e.ref,e.child=t,t.return=e,t}function Vo(e,t,n){return hl(t,e.child,null,n),(e=Bo(t,t.pendingProps)).flags|=2,Ml(t),t.memoizedState=null,e}function Uo(e,t){var n=t.ref;if(null===n)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof n&&"object"!==typeof n)throw Error(i(284));null!==e&&e.ref===n||(t.flags|=4194816)}}function Wo(e,t,n,r,a){return Ta(t),n=ti(e,t,n,r,void 0,a),r=li(),null===e||Fo?(fa&&r&&oa(t),t.flags|=1,Ro(e,t,n,a),t.child):(ii(e,t,a),ls(e,t,a))}function Ko(e,t,n,r,a,l){return Ta(t),t.updateQueue=null,n=ri(t,r,n,a),ni(e),r=li(),null===e||Fo?(fa&&r&&oa(t),t.flags|=1,Ro(e,t,n,l),t.child):(ii(e,t,l),ls(e,t,l))}function qo(e,t,n,r,a){if(Ta(t),null===t.stateNode){var l=Lr,i=n.contextType;"object"===typeof i&&null!==i&&(l=Aa(i)),l=new n(r,l),t.memoizedState=null!==l.state&&void 0!==l.state?l.state:null,l.updater=ko,t.stateNode=l,l._reactInternals=t,(l=t.stateNode).props=r,l.state=t.memoizedState,l.refs={},vl(t),i=n.contextType,l.context="object"===typeof i&&null!==i?Aa(i):Lr,l.state=t.memoizedState,"function"===typeof(i=n.getDerivedStateFromProps)&&(xo(t,n,i,r),l.state=t.memoizedState),"function"===typeof n.getDerivedStateFromProps||"function"===typeof l.getSnapshotBeforeUpdate||"function"!==typeof l.UNSAFE_componentWillMount&&"function"!==typeof l.componentWillMount||(i=l.state,"function"===typeof l.componentWillMount&&l.componentWillMount(),"function"===typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount(),i!==l.state&&ko.enqueueReplaceState(l,l.state,null),El(t,r,l,a),jl(),l.state=t.memoizedState),"function"===typeof l.componentDidMount&&(t.flags|=4194308),r=!0}else if(null===e){l=t.stateNode;var o=t.memoizedProps,s=jo(n,o);l.props=s;var u=l.context,c=n.contextType;i=Lr,"object"===typeof c&&null!==c&&(i=Aa(c));var d=n.getDerivedStateFromProps;c="function"===typeof d||"function"===typeof l.getSnapshotBeforeUpdate,o=t.pendingProps!==o,c||"function"!==typeof l.UNSAFE_componentWillReceiveProps&&"function"!==typeof l.componentWillReceiveProps||(o||u!==i)&&So(t,l,r,i),gl=!1;var f=t.memoizedState;l.state=f,El(t,r,l,a),jl(),u=t.memoizedState,o||f!==u||gl?("function"===typeof d&&(xo(t,n,d,r),u=t.memoizedState),(s=gl||wo(t,n,s,r,f,u,i))?(c||"function"!==typeof l.UNSAFE_componentWillMount&&"function"!==typeof l.componentWillMount||("function"===typeof l.componentWillMount&&l.componentWillMount(),"function"===typeof l.UNSAFE_componentWillMount&&l.UNSAFE_componentWillMount()),"function"===typeof l.componentDidMount&&(t.flags|=4194308)):("function"===typeof l.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),l.props=r,l.state=u,l.context=i,r=s):("function"===typeof l.componentDidMount&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,bl(e,t),c=jo(n,i=t.memoizedProps),l.props=c,d=t.pendingProps,f=l.context,u=n.contextType,s=Lr,"object"===typeof u&&null!==u&&(s=Aa(u)),(u="function"===typeof(o=n.getDerivedStateFromProps)||"function"===typeof l.getSnapshotBeforeUpdate)||"function"!==typeof l.UNSAFE_componentWillReceiveProps&&"function"!==typeof l.componentWillReceiveProps||(i!==d||f!==s)&&So(t,l,r,s),gl=!1,f=t.memoizedState,l.state=f,El(t,r,l,a),jl();var p=t.memoizedState;i!==d||f!==p||gl||null!==e&&null!==e.dependencies&&Pa(e.dependencies)?("function"===typeof o&&(xo(t,n,o,r),p=t.memoizedState),(c=gl||wo(t,n,c,r,f,p,s)||null!==e&&null!==e.dependencies&&Pa(e.dependencies))?(u||"function"!==typeof l.UNSAFE_componentWillUpdate&&"function"!==typeof l.componentWillUpdate||("function"===typeof l.componentWillUpdate&&l.componentWillUpdate(r,p,s),"function"===typeof l.UNSAFE_componentWillUpdate&&l.UNSAFE_componentWillUpdate(r,p,s)),"function"===typeof l.componentDidUpdate&&(t.flags|=4),"function"===typeof l.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof l.componentDidUpdate||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!==typeof l.getSnapshotBeforeUpdate||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),l.props=r,l.state=p,l.context=s,r=c):("function"!==typeof l.componentDidUpdate||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!==typeof l.getSnapshotBeforeUpdate||i===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return l=r,Uo(e,t),r=0!==(128&t.flags),l||r?(l=t.stateNode,n=r&&"function"!==typeof n.getDerivedStateFromError?null:l.render(),t.flags|=1,null!==e&&r?(t.child=hl(t,e.child,null,a),t.child=hl(t,null,n,a)):Ro(e,t,n,a),t.memoizedState=l.state,e=t.child):e=ls(e,t,a),e}function Yo(e,t,n,r){return xa(),t.flags|=256,Ro(e,t,n,r),t.child}var Qo={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Go(e){return{baseLanes:e,cachePool:Xa()}}function Xo(e,t,n){return e=null!==e?e.childLanes&~n:0,t&&(e|=zu),e}function Jo(e,t,n){var r,a=t.pendingProps,l=!1,o=0!==(128&t.flags);if((r=o)||(r=(null===e||null!==e.memoizedState)&&0!==(2&Il.current)),r&&(l=!0,t.flags&=-129),r=0!==(32&t.flags),t.flags&=-33,null===e){if(fa){if(l?Rl(t):Dl(),(e=da)?null!==(e=null!==(e=Pd(e,ha))&&"&"!==e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==na?{id:ra,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},(n=Kr(e)).return=t,t.child=n,ca=t,da=null):e=null,null===e)throw ga(t);return Ad(e)?t.lanes=32:t.lanes=536870912,null}var s=a.children;return a=a.fallback,l?(Dl(),s=es({mode:"hidden",children:s},l=t.mode),a=Ur(a,l,n,null),s.return=t,a.return=t,s.sibling=a,t.child=s,(a=t.child).memoizedState=Go(n),a.childLanes=Xo(e,r,n),t.memoizedState=Qo,Io(null,a)):(Rl(t),Zo(t,s))}var u=e.memoizedState;if(null!==u&&null!==(s=u.dehydrated)){if(o)256&t.flags?(Rl(t),t.flags&=-257,t=ts(e,t,n)):null!==t.memoizedState?(Dl(),t.child=e.child,t.flags|=128,t=null):(Dl(),s=a.fallback,l=t.mode,a=es({mode:"visible",children:a.children},l),(s=Ur(s,l,n,null)).flags|=2,a.return=t,s.return=t,a.sibling=s,t.child=a,hl(t,e.child,null,n),(a=t.child).memoizedState=Go(n),a.childLanes=Xo(e,r,n),t.memoizedState=Qo,t=Io(null,a));else if(Rl(t),Ad(s)){if(r=s.nextSibling&&s.nextSibling.dataset)var c=r.dgst;r=c,(a=Error(i(419))).stack="",a.digest=r,wa({value:a,source:null,stack:null}),t=ts(e,t,n)}else if(Fo||Na(e,t,n,!1),r=0!==(n&e.childLanes),Fo||r){if(null!==(r=mu)&&(0!==(a=Re(r,n))&&a!==u.retryLane))throw u.retryLane=a,Fr(e,a),Qu(r,e,a),Ao;Td(s)||oc(),t=ts(e,t,n)}else Td(s)?(t.flags|=192,t.child=e.child,t=null):(e=u.treeContext,da=Fd(s.nextSibling),ca=t,fa=!0,pa=null,ha=!1,null!==e&&ua(t,e),(t=Zo(t,a.children)).flags|=4096);return t}return l?(Dl(),s=a.fallback,l=t.mode,c=(u=e.child).sibling,(a=Hr(u,{mode:"hidden",children:a.children})).subtreeFlags=65011712&u.subtreeFlags,null!==c?s=Hr(c,s):(s=Ur(s,l,n,null)).flags|=2,s.return=t,a.return=t,a.sibling=s,t.child=a,Io(null,a),a=t.child,null===(s=e.child.memoizedState)?s=Go(n):(null!==(l=s.cachePool)?(u=Ma._currentValue,l=l.parent!==u?{parent:u,pool:u}:l):l=Xa(),s={baseLanes:s.baseLanes|n,cachePool:l}),a.memoizedState=s,a.childLanes=Xo(e,r,n),t.memoizedState=Qo,Io(e.child,a)):(Rl(t),e=(n=e.child).sibling,(n=Hr(n,{mode:"visible",children:a.children})).return=t,n.sibling=null,null!==e&&(null===(r=t.deletions)?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Zo(e,t){return(t=es({mode:"visible",children:t},e.mode)).return=e,e.child=t}function es(e,t){return(e=Mr(22,e,null,t)).lanes=0,e}function ts(e,t,n){return hl(t,e.child,null,n),(e=Zo(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function ns(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),za(e.return,t,n)}function rs(e,t,n,r,a,l){var i=e.memoizedState;null===i?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a,treeForkCount:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=a,i.treeForkCount=l)}function as(e,t,n){var r=t.pendingProps,a=r.revealOrder,l=r.tail;r=r.children;var i=Il.current,o=0!==(2&i);if(o?(i=1&i|2,t.flags|=128):i&=1,H(Il,i),Ro(e,t,r,n),r=fa?Zr:0,!o&&null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&ns(e,n,t);else if(19===e.tag)ns(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;null!==n;)null!==(e=n.alternate)&&null===Hl(e)&&(a=n),n=n.sibling;null===(n=a)?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),rs(t,!1,a,n,l,r);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Hl(e)){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}rs(t,!0,n,null,l,r);break;case"together":rs(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function ls(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Eu|=t.lanes,0===(n&t.childLanes)){if(null===e)return null;if(Na(e,t,n,!1),0===(n&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(i(153));if(null!==t.child){for(n=Hr(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Hr(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function is(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Pa(e))}function os(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps)Fo=!0;else{if(!is(e,n)&&0===(128&t.flags))return Fo=!1,function(e,t,n){switch(t.tag){case 3:Y(t,t.stateNode.containerInfo),$a(0,Ma,e.memoizedState.cache),xa();break;case 27:case 5:G(t);break;case 4:Y(t,t.stateNode.containerInfo);break;case 10:$a(0,t.type,t.memoizedProps.value);break;case 31:if(null!==t.memoizedState)return t.flags|=128,Ol(t),null;break;case 13:var r=t.memoizedState;if(null!==r)return null!==r.dehydrated?(Rl(t),t.flags|=128,null):0!==(n&t.child.childLanes)?Jo(e,t,n):(Rl(t),null!==(e=ls(e,t,n))?e.sibling:null);Rl(t);break;case 19:var a=0!==(128&e.flags);if((r=0!==(n&t.childLanes))||(Na(e,t,n,!1),r=0!==(n&t.childLanes)),a){if(r)return as(e,t,n);t.flags|=128}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),H(Il,Il.current),r)break;return null;case 22:return t.lanes=0,Mo(e,t,n,t.pendingProps);case 24:$a(0,Ma,e.memoizedState.cache)}return ls(e,t,n)}(e,t,n);Fo=0!==(131072&e.flags)}else Fo=!1,fa&&0!==(1048576&t.flags)&&ia(t,Zr,t.index);switch(t.lanes=0,t.tag){case 16:e:{var r=t.pendingProps;if(e=al(t.elementType),t.type=e,"function"!==typeof e){if(void 0!==e&&null!==e){var a=e.$$typeof;if(a===w){t.tag=11,t=Oo(null,t,e,r,n);break e}if(a===E){t.tag=14,t=Lo(null,t,e,r,n);break e}}throw t=T(e)||e,Error(i(306,t,""))}Ir(e)?(r=jo(e,r),t.tag=1,t=qo(null,t,e,r,n)):(t.tag=0,t=Wo(null,t,e,r,n))}return t;case 0:return Wo(e,t,t.type,t.pendingProps,n);case 1:return qo(e,t,r=t.type,a=jo(r,t.pendingProps),n);case 3:e:{if(Y(t,t.stateNode.containerInfo),null===e)throw Error(i(387));r=t.pendingProps;var l=t.memoizedState;a=l.element,bl(e,t),El(t,r,null,n);var o=t.memoizedState;if(r=o.cache,$a(0,Ma,r),r!==l.cache&&_a(t,[Ma],n,!0),jl(),r=o.element,l.isDehydrated){if(l={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=l,t.memoizedState=l,256&t.flags){t=Yo(e,t,r,n);break e}if(r!==a){wa(a=Qr(Error(i(424)),t)),t=Yo(e,t,r,n);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(da=Fd(e.firstChild),ca=t,fa=!0,pa=null,ha=!0,n=ml(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(xa(),r===a){t=ls(e,t,n);break e}Ro(e,t,r,n)}t=t.child}return t;case 26:return Uo(e,t),null===e?(n=Kd(t.type,null,t.pendingProps,null))?t.memoizedState=n:fa||(n=t.type,e=t.pendingProps,(r=vd(K.current).createElement(n))[He]=t,r[Be]=e,pd(r,n,e),et(r),t.stateNode=r):t.memoizedState=Kd(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return G(t),null===e&&fa&&(r=t.stateNode=Dd(t.type,t.pendingProps,K.current),ca=t,ha=!0,a=da,Cd(t.type)?(Rd=a,da=Fd(r.firstChild)):da=a),Ro(e,t,t.pendingProps.children,n),Uo(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&fa&&((a=r=da)&&(null!==(r=function(e,t,n,r){for(;1===e.nodeType;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[Ye])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(l=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(l!==a.rel||e.getAttribute("href")!==(null==a.href||""===a.href?null:a.href)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin)||e.getAttribute("title")!==(null==a.title?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((l=e.getAttribute("src"))!==(null==a.src?null:a.src)||e.getAttribute("type")!==(null==a.type?null:a.type)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin))&&l&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var l=null==a.name?null:""+a.name;if("hidden"===a.type&&e.getAttribute("name")===l)return e}if(null===(e=Fd(e.nextSibling)))break}return null}(r,t.type,t.pendingProps,ha))?(t.stateNode=r,ca=t,da=Fd(r.firstChild),ha=!1,a=!0):a=!1),a||ga(t)),G(t),a=t.type,l=t.pendingProps,o=null!==e?e.memoizedProps:null,r=l.children,xd(a,l)?r=null:null!==o&&xd(a,o)&&(t.flags|=32),null!==t.memoizedState&&(a=ti(e,t,ai,null,null,n),ff._currentValue=a),Uo(e,t),Ro(e,t,r,n),t.child;case 6:return null===e&&fa&&((e=n=da)&&(null!==(n=function(e,t,n){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!n)return null;if(null===(e=Fd(e.nextSibling)))return null}return e}(n,t.pendingProps,ha))?(t.stateNode=n,ca=t,da=null,e=!0):e=!1),e||ga(t)),null;case 13:return Jo(e,t,n);case 4:return Y(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=hl(t,null,r,n):Ro(e,t,r,n),t.child;case 11:return Oo(e,t,t.type,t.pendingProps,n);case 7:return Ro(e,t,t.pendingProps,n),t.child;case 8:case 12:return Ro(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,$a(0,t.type,r.value),Ro(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Ta(t),r=r(a=Aa(a)),t.flags|=1,Ro(e,t,r,n),t.child;case 14:return Lo(e,t,t.type,t.pendingProps,n);case 15:return Do(e,t,t.type,t.pendingProps,n);case 19:return as(e,t,n);case 31:return function(e,t,n){var r=t.pendingProps,a=0!==(128&t.flags);if(t.flags&=-129,null===e){if(fa){if("hidden"===r.mode)return e=Bo(t,r),t.lanes=536870912,Io(null,e);if(Ol(t),(e=da)?null!==(e=null!==(e=Pd(e,ha))&&"&"===e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==na?{id:ra,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},(n=Kr(e)).return=t,t.child=n,ca=t,da=null):e=null,null===e)throw ga(t);return t.lanes=536870912,null}return Bo(t,r)}var l=e.memoizedState;if(null!==l){var o=l.dehydrated;if(Ol(t),a)if(256&t.flags)t.flags&=-257,t=Vo(e,t,n);else{if(null===t.memoizedState)throw Error(i(558));t.child=e.child,t.flags|=128,t=null}else if(Fo||Na(e,t,n,!1),a=0!==(n&e.childLanes),Fo||a){if(null!==(r=mu)&&0!==(o=Re(r,n))&&o!==l.retryLane)throw l.retryLane=o,Fr(e,o),Qu(r,e,o),Ao;oc(),t=Vo(e,t,n)}else e=l.treeContext,da=Fd(o.nextSibling),ca=t,fa=!0,pa=null,ha=!1,null!==e&&ua(t,e),(t=Bo(t,r)).flags|=4096;return t}return(e=Hr(e.child,{mode:r.mode,children:r.children})).ref=t.ref,t.child=e,e.return=t,e}(e,t,n);case 22:return Mo(e,t,n,t.pendingProps);case 24:return Ta(t),r=Aa(Ma),null===e?(null===(a=Qa())&&(a=mu,l=Ia(),a.pooledCache=l,l.refCount++,null!==l&&(a.pooledCacheLanes|=n),a=l),t.memoizedState={parent:r,cache:a},vl(t),$a(0,Ma,a)):(0!==(e.lanes&n)&&(bl(e,t),El(t,null,null,n),jl()),a=e.memoizedState,l=t.memoizedState,a.parent!==r?(a={parent:r,cache:r},t.memoizedState=a,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=a),$a(0,Ma,r)):(r=l.cache,$a(0,Ma,r),r!==a.cache&&_a(t,[Ma],n,!0))),Ro(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function ss(e){e.flags|=4}function us(e,t,n,r,a){if((t=0!==(32&e.mode))&&(t=!1),t){if(e.flags|=16777216,(335544128&a)===a)if(e.stateNode.complete)e.flags|=8192;else{if(!ac())throw ll=tl,Za;e.flags|=8192}}else e.flags&=-16777217}function cs(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!lf(t)){if(!ac())throw ll=tl,Za;e.flags|=8192}}function ds(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?Ne():536870912,e.lanes|=t,_u|=t)}function fs(e,t){if(!fa)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ps(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=65011712&a.subtreeFlags,r|=65011712&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function hs(e,t,n){var r=t.pendingProps;switch(sa(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return ps(t),null;case 3:return n=t.stateNode,r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Ca(Ma),Q(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),null!==e&&null!==e.child||(ya(t)?ss(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,ka())),ps(t),null;case 26:var a=t.type,l=t.memoizedState;return null===e?(ss(t),null!==l?(ps(t),cs(t,l)):(ps(t),us(t,a,0,0,n))):l?l!==e.memoizedState?(ss(t),ps(t),cs(t,l)):(ps(t),t.flags&=-16777217):((e=e.memoizedProps)!==r&&ss(t),ps(t),us(t,a,0,0,n)),null;case 27:if(X(t),n=K.current,a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&ss(t);else{if(!r){if(null===t.stateNode)throw Error(i(166));return ps(t),null}e=U.current,ya(t)?va(t):(e=Dd(a,r,n),t.stateNode=e,ss(t))}return ps(t),null;case 5:if(X(t),a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&ss(t);else{if(!r){if(null===t.stateNode)throw Error(i(166));return ps(t),null}if(l=U.current,ya(t))va(t);else{var o=vd(K.current);switch(l){case 1:l=o.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:l=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":l=o.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":l=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":(l=o.createElement("div")).innerHTML="<script><\/script>",l=l.removeChild(l.firstChild);break;case"select":l="string"===typeof r.is?o.createElement("select",{is:r.is}):o.createElement("select"),r.multiple?l.multiple=!0:r.size&&(l.size=r.size);break;default:l="string"===typeof r.is?o.createElement(a,{is:r.is}):o.createElement(a)}}l[He]=t,l[Be]=r;e:for(o=t.child;null!==o;){if(5===o.tag||6===o.tag)l.appendChild(o.stateNode);else if(4!==o.tag&&27!==o.tag&&null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;null===o.sibling;){if(null===o.return||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=l;e:switch(pd(l,a,r),a){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&ss(t)}}return ps(t),us(t,t.type,null===e||e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==r&&ss(t);else{if("string"!==typeof r&&null===t.stateNode)throw Error(i(166));if(e=K.current,ya(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,null!==(a=ca))switch(a.tag){case 27:case 5:r=a.memoizedProps}e[He]=t,(e=!!(e.nodeValue===n||null!==r&&!0===r.suppressHydrationWarning||cd(e.nodeValue,n)))||ga(t,!0)}else(e=vd(e).createTextNode(r))[He]=t,t.stateNode=e}return ps(t),null;case 31:if(n=t.memoizedState,null===e||null!==e.memoizedState){if(r=ya(t),null!==n){if(null===e){if(!r)throw Error(i(318));if(!(e=null!==(e=t.memoizedState)?e.dehydrated:null))throw Error(i(557));e[He]=t}else xa(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;ps(t),e=!1}else n=ka(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return 256&t.flags?(Ml(t),t):(Ml(t),null);if(0!==(128&t.flags))throw Error(i(558))}return ps(t),null;case 13:if(r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(a=ya(t),null!==r&&null!==r.dehydrated){if(null===e){if(!a)throw Error(i(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(i(317));a[He]=t}else xa(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;ps(t),a=!1}else a=ka(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return 256&t.flags?(Ml(t),t):(Ml(t),null)}return Ml(t),0!==(128&t.flags)?(t.lanes=n,t):(n=null!==r,e=null!==e&&null!==e.memoizedState,n&&(a=null,null!==(r=t.child).alternate&&null!==r.alternate.memoizedState&&null!==r.alternate.memoizedState.cachePool&&(a=r.alternate.memoizedState.cachePool.pool),l=null,null!==r.memoizedState&&null!==r.memoizedState.cachePool&&(l=r.memoizedState.cachePool.pool),l!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ds(t,t.updateQueue),ps(t),null);case 4:return Q(),null===e&&ed(t.stateNode.containerInfo),ps(t),null;case 10:return Ca(t.type),ps(t),null;case 19:if(I(Il),null===(r=t.memoizedState))return ps(t),null;if(a=0!==(128&t.flags),null===(l=r.rendering))if(a)fs(r,!1);else{if(0!==ju||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(l=Hl(e))){for(t.flags|=128,fs(r,!1),e=l.updateQueue,t.updateQueue=e,ds(t,e),t.subtreeFlags=0,e=n,n=t.child;null!==n;)Br(n,e),n=n.sibling;return H(Il,1&Il.current|2),fa&&la(t,r.treeForkCount),t.child}e=e.sibling}null!==r.tail&&se()>Ru&&(t.flags|=128,a=!0,fs(r,!1),t.lanes=4194304)}else{if(!a)if(null!==(e=Hl(l))){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ds(t,e),fs(r,!0),null===r.tail&&"hidden"===r.tailMode&&!l.alternate&&!fa)return ps(t),null}else 2*se()-r.renderingStartTime>Ru&&536870912!==n&&(t.flags|=128,a=!0,fs(r,!1),t.lanes=4194304);r.isBackwards?(l.sibling=t.child,t.child=l):(null!==(e=r.last)?e.sibling=l:t.child=l,r.last=l)}return null!==r.tail?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=se(),e.sibling=null,n=Il.current,H(Il,a?1&n|2:1&n),fa&&la(t,r.treeForkCount),e):(ps(t),null);case 22:case 23:return Ml(t),Tl(),r=null!==t.memoizedState,null!==e?null!==e.memoizedState!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?0!==(536870912&n)&&0===(128&t.flags)&&(ps(t),6&t.subtreeFlags&&(t.flags|=8192)):ps(t),null!==(n=t.updateQueue)&&ds(t,n.retryQueue),n=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),r=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),null!==e&&I(Ya),null;case 24:return n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ca(Ma),ps(t),null;case 25:case 30:return null}throw Error(i(156,t.tag))}function ms(e,t){switch(sa(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return Ca(Ma),Q(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return X(t),null;case 31:if(null!==t.memoizedState){if(Ml(t),null===t.alternate)throw Error(i(340));xa()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 13:if(Ml(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(i(340));xa()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return I(Il),null;case 4:return Q(),null;case 10:return Ca(t.type),null;case 22:case 23:return Ml(t),Tl(),null!==e&&I(Ya),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return Ca(Ma),null;default:return null}}function gs(e,t){switch(sa(t),t.tag){case 3:Ca(Ma),Q();break;case 26:case 27:case 5:X(t);break;case 4:Q();break;case 31:null!==t.memoizedState&&Ml(t);break;case 13:Ml(t);break;case 19:I(Il);break;case 10:Ca(t.type);break;case 22:case 23:Ml(t),Tl(),null!==e&&I(Ya);break;case 24:Ca(Ma)}}function vs(e,t){try{var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var a=r.next;n=a;do{if((n.tag&e)===e){r=void 0;var l=n.create,i=n.inst;r=l(),i.destroy=r}n=n.next}while(n!==a)}}catch(o){jc(t,t.return,o)}}function bs(e,t,n){try{var r=t.updateQueue,a=null!==r?r.lastEffect:null;if(null!==a){var l=a.next;r=l;do{if((r.tag&e)===e){var i=r.inst,o=i.destroy;if(void 0!==o){i.destroy=void 0,a=t;var s=n,u=o;try{u()}catch(c){jc(a,s,c)}}}r=r.next}while(r!==l)}}catch(c){jc(t,t.return,c)}}function ys(e){var t=e.updateQueue;if(null!==t){var n=e.stateNode;try{Cl(t,n)}catch(r){jc(e,e.return,r)}}}function xs(e,t,n){n.props=jo(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(r){jc(e,t,r)}}function ks(e,t){try{var n=e.ref;if(null!==n){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;default:r=e.stateNode}"function"===typeof n?e.refCleanup=n(r):n.current=r}}catch(a){jc(e,t,a)}}function ws(e,t){var n=e.ref,r=e.refCleanup;if(null!==n)if("function"===typeof r)try{r()}catch(a){jc(e,t,a)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof n)try{n(null)}catch(l){jc(e,t,l)}else n.current=null}function Ss(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&r.focus();break e;case"img":n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(a){jc(e,e.return,a)}}function js(e,t,n){try{var r=e.stateNode;!function(e,t,n,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,l=null,o=null,s=null,u=null,c=null,d=null;for(h in n){var f=n[h];if(n.hasOwnProperty(h)&&null!=f)switch(h){case"checked":case"value":break;case"defaultValue":u=f;default:r.hasOwnProperty(h)||dd(e,t,h,null,r,f)}}for(var p in r){var h=r[p];if(f=n[p],r.hasOwnProperty(p)&&(null!=h||null!=f))switch(p){case"type":l=h;break;case"name":a=h;break;case"checked":c=h;break;case"defaultChecked":d=h;break;case"value":o=h;break;case"defaultValue":s=h;break;case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(i(137,t));break;default:h!==f&&dd(e,t,p,h,r,f)}}return void bt(e,o,s,u,c,d,l,a);case"select":for(l in h=o=s=p=null,n)if(u=n[l],n.hasOwnProperty(l)&&null!=u)switch(l){case"value":break;case"multiple":h=u;default:r.hasOwnProperty(l)||dd(e,t,l,null,r,u)}for(a in r)if(l=r[a],u=n[a],r.hasOwnProperty(a)&&(null!=l||null!=u))switch(a){case"value":p=l;break;case"defaultValue":s=l;break;case"multiple":o=l;default:l!==u&&dd(e,t,a,l,r,u)}return t=s,n=o,r=h,void(null!=p?kt(e,!!n,p,!1):!!r!==!!n&&(null!=t?kt(e,!!n,t,!0):kt(e,!!n,n?[]:"",!1)));case"textarea":for(s in h=p=null,n)if(a=n[s],n.hasOwnProperty(s)&&null!=a&&!r.hasOwnProperty(s))switch(s){case"value":case"children":break;default:dd(e,t,s,null,r,a)}for(o in r)if(a=r[o],l=n[o],r.hasOwnProperty(o)&&(null!=a||null!=l))switch(o){case"value":p=a;break;case"defaultValue":h=a;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=a)throw Error(i(91));break;default:a!==l&&dd(e,t,o,a,r,l)}return void wt(e,p,h);case"option":for(var m in n)if(p=n[m],n.hasOwnProperty(m)&&null!=p&&!r.hasOwnProperty(m))if("selected"===m)e.selected=!1;else dd(e,t,m,null,r,p);for(u in r)if(p=r[u],h=n[u],r.hasOwnProperty(u)&&p!==h&&(null!=p||null!=h))if("selected"===u)e.selected=p&&"function"!==typeof p&&"symbol"!==typeof p;else dd(e,t,u,p,r,h);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in n)p=n[g],n.hasOwnProperty(g)&&null!=p&&!r.hasOwnProperty(g)&&dd(e,t,g,null,r,p);for(c in r)if(p=r[c],h=n[c],r.hasOwnProperty(c)&&p!==h&&(null!=p||null!=h))switch(c){case"children":case"dangerouslySetInnerHTML":if(null!=p)throw Error(i(137,t));break;default:dd(e,t,c,p,r,h)}return;default:if(zt(t)){for(var v in n)p=n[v],n.hasOwnProperty(v)&&void 0!==p&&!r.hasOwnProperty(v)&&fd(e,t,v,void 0,r,p);for(d in r)p=r[d],h=n[d],!r.hasOwnProperty(d)||p===h||void 0===p&&void 0===h||fd(e,t,d,p,r,h);return}}for(var b in n)p=n[b],n.hasOwnProperty(b)&&null!=p&&!r.hasOwnProperty(b)&&dd(e,t,b,null,r,p);for(f in r)p=r[f],h=n[f],!r.hasOwnProperty(f)||p===h||null==p&&null==h||dd(e,t,f,p,r,h)}(r,e.type,n,t),r[Be]=t}catch(a){jc(e,e.return,a)}}function Es(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&Cd(e.type)||4===e.tag}function $s(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Es(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&Cd(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function Cs(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?(9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).insertBefore(e,t):((t=9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Tt));else if(4!==r&&(27===r&&Cd(e.type)&&(n=e.stateNode,t=null),null!==(e=e.child)))for(Cs(e,t,n),e=e.sibling;null!==e;)Cs(e,t,n),e=e.sibling}function zs(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&(27===r&&Cd(e.type)&&(n=e.stateNode),null!==(e=e.child)))for(zs(e,t,n),e=e.sibling;null!==e;)zs(e,t,n),e=e.sibling}function _s(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);pd(t,r,n),t[He]=e,t[Be]=n}catch(l){jc(e,e.return,l)}}var Ns=!1,Ps=!1,Ts=!1,As="function"===typeof WeakSet?WeakSet:Set,Fs=null;function Rs(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Qs(e,n),4&r&&vs(5,n);break;case 1:if(Qs(e,n),4&r)if(e=n.stateNode,null===t)try{e.componentDidMount()}catch(i){jc(n,n.return,i)}else{var a=jo(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){jc(n,n.return,o)}}64&r&&ys(n),512&r&&ks(n,n.return);break;case 3:if(Qs(e,n),64&r&&null!==(e=n.updateQueue)){if(t=null,null!==n.child)switch(n.child.tag){case 27:case 5:case 1:t=n.child.stateNode}try{Cl(e,t)}catch(i){jc(n,n.return,i)}}break;case 27:null===t&&4&r&&_s(n);case 26:case 5:Qs(e,n),null===t&&4&r&&Ss(n),512&r&&ks(n,n.return);break;case 12:Qs(e,n);break;case 31:Qs(e,n),4&r&&Hs(e,n);break;case 13:Qs(e,n),4&r&&Bs(e,n),64&r&&(null!==(e=n.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var n=e.ownerDocument;if("$~"===e.data)e._reactRetry=t;else if("$?"!==e.data||"loading"!==n.readyState)t();else{var r=function(){t(),n.removeEventListener("DOMContentLoaded",r)};n.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}(e,n=zc.bind(null,n))));break;case 22:if(!(r=null!==n.memoizedState||Ns)){t=null!==t&&null!==t.memoizedState||Ps,a=Ns;var l=Ps;Ns=r,(Ps=t)&&!l?Xs(e,n,0!==(8772&n.subtreeFlags)):Qs(e,n),Ns=a,Ps=l}break;case 30:break;default:Qs(e,n)}}function Os(e){var t=e.alternate;null!==t&&(e.alternate=null,Os(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Qe(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ls=null,Ds=!1;function Ms(e,t,n){for(n=n.child;null!==n;)Is(e,t,n),n=n.sibling}function Is(e,t,n){if(be&&"function"===typeof be.onCommitFiberUnmount)try{be.onCommitFiberUnmount(ve,n)}catch(l){}switch(n.tag){case 26:Ps||ws(n,t),Ms(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode).parentNode.removeChild(n);break;case 27:Ps||ws(n,t);var r=Ls,a=Ds;Cd(n.type)&&(Ls=n.stateNode,Ds=!1),Ms(e,t,n),Md(n.stateNode),Ls=r,Ds=a;break;case 5:Ps||ws(n,t);case 6:if(r=Ls,a=Ds,Ls=null,Ms(e,t,n),Ds=a,null!==(Ls=r))if(Ds)try{(9===Ls.nodeType?Ls.body:"HTML"===Ls.nodeName?Ls.ownerDocument.body:Ls).removeChild(n.stateNode)}catch(i){jc(n,t,i)}else try{Ls.removeChild(n.stateNode)}catch(i){jc(n,t,i)}break;case 18:null!==Ls&&(Ds?(zd(9===(e=Ls).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,n.stateNode),Kf(e)):zd(Ls,n.stateNode));break;case 4:r=Ls,a=Ds,Ls=n.stateNode.containerInfo,Ds=!0,Ms(e,t,n),Ls=r,Ds=a;break;case 0:case 11:case 14:case 15:bs(2,n,t),Ps||bs(4,n,t),Ms(e,t,n);break;case 1:Ps||(ws(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount&&xs(n,t,r)),Ms(e,t,n);break;case 21:Ms(e,t,n);break;case 22:Ps=(r=Ps)||null!==n.memoizedState,Ms(e,t,n),Ps=r;break;default:Ms(e,t,n)}}function Hs(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&null!==(e=e.memoizedState))){e=e.dehydrated;try{Kf(e)}catch(n){jc(t,t.return,n)}}}function Bs(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Kf(e)}catch(n){jc(t,t.return,n)}}function Vs(e,t){var n=function(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new As),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new As),t;default:throw Error(i(435,e.tag))}}(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=_c.bind(null,e,t);t.then(r,r)}})}function Us(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var a=n[r],l=e,o=t,s=o;e:for(;null!==s;){switch(s.tag){case 27:if(Cd(s.type)){Ls=s.stateNode,Ds=!1;break e}break;case 5:Ls=s.stateNode,Ds=!1;break e;case 3:case 4:Ls=s.stateNode.containerInfo,Ds=!0;break e}s=s.return}if(null===Ls)throw Error(i(160));Is(l,o,a),Ls=null,Ds=!1,null!==(l=a.alternate)&&(l.return=null),a.return=null}if(13886&t.subtreeFlags)for(t=t.child;null!==t;)Ks(t,e),t=t.sibling}var Ws=null;function Ks(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Us(t,e),qs(e),4&r&&(bs(3,e,e.return),vs(3,e),bs(5,e,e.return));break;case 1:Us(t,e),qs(e),512&r&&(Ps||null===n||ws(n,n.return)),64&r&&Ns&&(null!==(e=e.updateQueue)&&(null!==(r=e.callbacks)&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===n?r:n.concat(r))));break;case 26:var a=Ws;if(Us(t,e),qs(e),512&r&&(Ps||null===n||ws(n,n.return)),4&r){var l=null!==n?n.memoizedState:null;if(r=e.memoizedState,null===n)if(null===r)if(null===e.stateNode){e:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;t:switch(r){case"title":(!(l=a.getElementsByTagName("title")[0])||l[Ye]||l[He]||"http://www.w3.org/2000/svg"===l.namespaceURI||l.hasAttribute("itemprop"))&&(l=a.createElement(r),a.head.insertBefore(l,a.querySelector("head > title"))),pd(l,r,n),l[He]=e,et(l),r=l;break e;case"link":var o=rf("link","href",a).get(r+(n.href||""));if(o)for(var s=0;s<o.length;s++)if((l=o[s]).getAttribute("href")===(null==n.href||""===n.href?null:n.href)&&l.getAttribute("rel")===(null==n.rel?null:n.rel)&&l.getAttribute("title")===(null==n.title?null:n.title)&&l.getAttribute("crossorigin")===(null==n.crossOrigin?null:n.crossOrigin)){o.splice(s,1);break t}pd(l=a.createElement(r),r,n),a.head.appendChild(l);break;case"meta":if(o=rf("meta","content",a).get(r+(n.content||"")))for(s=0;s<o.length;s++)if((l=o[s]).getAttribute("content")===(null==n.content?null:""+n.content)&&l.getAttribute("name")===(null==n.name?null:n.name)&&l.getAttribute("property")===(null==n.property?null:n.property)&&l.getAttribute("http-equiv")===(null==n.httpEquiv?null:n.httpEquiv)&&l.getAttribute("charset")===(null==n.charSet?null:n.charSet)){o.splice(s,1);break t}pd(l=a.createElement(r),r,n),a.head.appendChild(l);break;default:throw Error(i(468,r))}l[He]=e,et(l),r=l}e.stateNode=r}else af(a,e.type,e.stateNode);else e.stateNode=Jd(a,r,e.memoizedProps);else l!==r?(null===l?null!==n.stateNode&&(n=n.stateNode).parentNode.removeChild(n):l.count--,null===r?af(a,e.type,e.stateNode):Jd(a,r,e.memoizedProps)):null===r&&null!==e.stateNode&&js(e,e.memoizedProps,n.memoizedProps)}break;case 27:Us(t,e),qs(e),512&r&&(Ps||null===n||ws(n,n.return)),null!==n&&4&r&&js(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Us(t,e),qs(e),512&r&&(Ps||null===n||ws(n,n.return)),32&e.flags){a=e.stateNode;try{jt(a,"")}catch(m){jc(e,e.return,m)}}4&r&&null!=e.stateNode&&js(e,a=e.memoizedProps,null!==n?n.memoizedProps:a),1024&r&&(Ts=!0);break;case 6:if(Us(t,e),qs(e),4&r){if(null===e.stateNode)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(m){jc(e,e.return,m)}}break;case 3:if(nf=null,a=Ws,Ws=Bd(t.containerInfo),Us(t,e),Ws=a,qs(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Kf(t.containerInfo)}catch(m){jc(e,e.return,m)}Ts&&(Ts=!1,Ys(e));break;case 4:r=Ws,Ws=Bd(e.stateNode.containerInfo),Us(t,e),qs(e),Ws=r;break;case 12:default:Us(t,e),qs(e);break;case 31:case 19:Us(t,e),qs(e),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Vs(e,r)));break;case 13:Us(t,e),qs(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==n&&null!==n.memoizedState)&&(Au=se()),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Vs(e,r)));break;case 22:a=null!==e.memoizedState;var u=null!==n&&null!==n.memoizedState,c=Ns,d=Ps;if(Ns=c||a,Ps=d||u,Us(t,e),Ps=d,Ns=c,qs(e),8192&r)e:for(t=e.stateNode,t._visibility=a?-2&t._visibility:1|t._visibility,a&&(null===n||u||Ns||Ps||Gs(e)),n=null,t=e;;){if(5===t.tag||26===t.tag){if(null===n){u=n=t;try{if(l=u.stateNode,a)"function"===typeof(o=l.style).setProperty?o.setProperty("display","none","important"):o.display="none";else{s=u.stateNode;var f=u.memoizedProps.style,p=void 0!==f&&null!==f&&f.hasOwnProperty("display")?f.display:null;s.style.display=null==p||"boolean"===typeof p?"":(""+p).trim()}}catch(m){jc(u,u.return,m)}}}else if(6===t.tag){if(null===n){u=t;try{u.stateNode.nodeValue=a?"":u.memoizedProps}catch(m){jc(u,u.return,m)}}}else if(18===t.tag){if(null===n){u=t;try{var h=u.stateNode;a?_d(h,!0):_d(u.stateNode,!1)}catch(m){jc(u,u.return,m)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}4&r&&(null!==(r=e.updateQueue)&&(null!==(n=r.retryQueue)&&(r.retryQueue=null,Vs(e,n))));case 30:case 21:}}function qs(e){var t=e.flags;if(2&t){try{for(var n,r=e.return;null!==r;){if(Es(r)){n=r;break}r=r.return}if(null==n)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;zs(e,$s(e),a);break;case 5:var l=n.stateNode;32&n.flags&&(jt(l,""),n.flags&=-33),zs(e,$s(e),l);break;case 3:case 4:var o=n.stateNode.containerInfo;Cs(e,$s(e),o);break;default:throw Error(i(161))}}catch(s){jc(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Ys(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Ys(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Qs(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Rs(e,t.alternate,t),t=t.sibling}function Gs(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:bs(4,t,t.return),Gs(t);break;case 1:ws(t,t.return);var n=t.stateNode;"function"===typeof n.componentWillUnmount&&xs(t,t.return,n),Gs(t);break;case 27:Md(t.stateNode);case 26:case 5:ws(t,t.return),Gs(t);break;case 22:null===t.memoizedState&&Gs(t);break;default:Gs(t)}e=e.sibling}}function Xs(e,t,n){for(n=n&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var r=t.alternate,a=e,l=t,i=l.flags;switch(l.tag){case 0:case 11:case 15:Xs(a,l,n),vs(4,l);break;case 1:if(Xs(a,l,n),"function"===typeof(a=(r=l).stateNode).componentDidMount)try{a.componentDidMount()}catch(u){jc(r,r.return,u)}if(null!==(a=(r=l).updateQueue)){var o=r.stateNode;try{var s=a.shared.hiddenCallbacks;if(null!==s)for(a.shared.hiddenCallbacks=null,a=0;a<s.length;a++)$l(s[a],o)}catch(u){jc(r,r.return,u)}}n&&64&i&&ys(l),ks(l,l.return);break;case 27:_s(l);case 26:case 5:Xs(a,l,n),n&&null===r&&4&i&&Ss(l),ks(l,l.return);break;case 12:Xs(a,l,n);break;case 31:Xs(a,l,n),n&&4&i&&Hs(a,l);break;case 13:Xs(a,l,n),n&&4&i&&Bs(a,l);break;case 22:null===l.memoizedState&&Xs(a,l,n),ks(l,l.return);break;case 30:break;default:Xs(a,l,n)}t=t.sibling}}function Js(e,t){var n=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==n&&(null!=e&&e.refCount++,null!=n&&Ha(n))}function Zs(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ha(e))}function eu(e,t,n,r){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)tu(e,t,n,r),t=t.sibling}function tu(e,t,n,r){var a=t.flags;switch(t.tag){case 0:case 11:case 15:eu(e,t,n,r),2048&a&&vs(9,t);break;case 1:case 31:case 13:default:eu(e,t,n,r);break;case 3:eu(e,t,n,r),2048&a&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ha(e)));break;case 12:if(2048&a){eu(e,t,n,r),e=t.stateNode;try{var l=t.memoizedProps,i=l.id,o=l.onPostCommit;"function"===typeof o&&o(i,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(s){jc(t,t.return,s)}}else eu(e,t,n,r);break;case 23:break;case 22:l=t.stateNode,i=t.alternate,null!==t.memoizedState?2&l._visibility?eu(e,t,n,r):ru(e,t):2&l._visibility?eu(e,t,n,r):(l._visibility|=2,nu(e,t,n,r,0!==(10256&t.subtreeFlags)||!1)),2048&a&&Js(i,t);break;case 24:eu(e,t,n,r),2048&a&&Zs(t.alternate,t)}}function nu(e,t,n,r,a){for(a=a&&(0!==(10256&t.subtreeFlags)||!1),t=t.child;null!==t;){var l=e,i=t,o=n,s=r,u=i.flags;switch(i.tag){case 0:case 11:case 15:nu(l,i,o,s,a),vs(8,i);break;case 23:break;case 22:var c=i.stateNode;null!==i.memoizedState?2&c._visibility?nu(l,i,o,s,a):ru(l,i):(c._visibility|=2,nu(l,i,o,s,a)),a&&2048&u&&Js(i.alternate,i);break;case 24:nu(l,i,o,s,a),a&&2048&u&&Zs(i.alternate,i);break;default:nu(l,i,o,s,a)}t=t.sibling}}function ru(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var n=e,r=t,a=r.flags;switch(r.tag){case 22:ru(n,r),2048&a&&Js(r.alternate,r);break;case 24:ru(n,r),2048&a&&Zs(r.alternate,r);break;default:ru(n,r)}t=t.sibling}}var au=8192;function lu(e,t,n){if(e.subtreeFlags&au)for(e=e.child;null!==e;)iu(e,t,n),e=e.sibling}function iu(e,t,n){switch(e.tag){case 26:lu(e,t,n),e.flags&au&&null!==e.memoizedState&&function(e,t,n,r){if("stylesheet"===n.type&&("string"!==typeof r.media||!1!==matchMedia(r.media).matches)&&0===(4&n.state.loading)){if(null===n.instance){var a=qd(r.href),l=t.querySelector(Yd(a));if(l)return null!==(t=l._p)&&"object"===typeof t&&"function"===typeof t.then&&(e.count++,e=sf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=l,void et(l);l=t.ownerDocument||t,r=Qd(r),(a=Id.get(a))&&ef(r,a),et(l=l.createElement("link"));var i=l;i._p=new Promise(function(e,t){i.onload=e,i.onerror=t}),pd(l,"link",r),n.instance=l}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&0===(3&n.state.loading)&&(e.count++,n=sf.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}(n,Ws,e.memoizedState,e.memoizedProps);break;case 5:default:lu(e,t,n);break;case 3:case 4:var r=Ws;Ws=Bd(e.stateNode.containerInfo),lu(e,t,n),Ws=r;break;case 22:null===e.memoizedState&&(null!==(r=e.alternate)&&null!==r.memoizedState?(r=au,au=16777216,lu(e,t,n),au=r):lu(e,t,n))}}function ou(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function su(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];Fs=r,du(r,e)}ou(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)uu(e),e=e.sibling}function uu(e){switch(e.tag){case 0:case 11:case 15:su(e),2048&e.flags&&bs(9,e,e.return);break;case 3:case 12:default:su(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,cu(e)):su(e)}}function cu(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];Fs=r,du(r,e)}ou(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:bs(8,t,t.return),cu(t);break;case 22:2&(n=t.stateNode)._visibility&&(n._visibility&=-3,cu(t));break;default:cu(t)}e=e.sibling}}function du(e,t){for(;null!==Fs;){var n=Fs;switch(n.tag){case 0:case 11:case 15:bs(8,n,t);break;case 23:case 22:if(null!==n.memoizedState&&null!==n.memoizedState.cachePool){var r=n.memoizedState.cachePool.pool;null!=r&&r.refCount++}break;case 24:Ha(n.memoizedState.cache)}if(null!==(r=n.child))r.return=n,Fs=r;else e:for(n=e;null!==Fs;){var a=(r=Fs).sibling,l=r.return;if(Os(r),r===n){Fs=null;break e}if(null!==a){a.return=l,Fs=a;break e}Fs=l}}}var fu={getCacheForType:function(e){var t=Aa(Ma),n=t.data.get(e);return void 0===n&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Aa(Ma).controller.signal}},pu="function"===typeof WeakMap?WeakMap:Map,hu=0,mu=null,gu=null,vu=0,bu=0,yu=null,xu=!1,ku=!1,wu=!1,Su=0,ju=0,Eu=0,$u=0,Cu=0,zu=0,_u=0,Nu=null,Pu=null,Tu=!1,Au=0,Fu=0,Ru=1/0,Ou=null,Lu=null,Du=0,Mu=null,Iu=null,Hu=0,Bu=0,Vu=null,Uu=null,Wu=0,Ku=null;function qu(){return 0!==(2&hu)&&0!==vu?vu&-vu:null!==F.T?Vc():De()}function Yu(){if(0===zu)if(0===(536870912&vu)||fa){var e=je;0===(3932160&(je<<=1))&&(je=262144),zu=e}else zu=536870912;return null!==(e=Al.current)&&(e.flags|=32),zu}function Qu(e,t,n){(e!==mu||2!==bu&&9!==bu)&&null===e.cancelPendingCommit||(nc(e,0),Zu(e,vu,zu,!1)),Te(e,n),0!==(2&hu)&&e===mu||(e===mu&&(0===(2&hu)&&($u|=n),4===ju&&Zu(e,vu,zu,!1)),Oc(e))}function Gu(e,t,n){if(0!==(6&hu))throw Error(i(327));for(var r=!n&&0===(127&t)&&0===(t&e.expiredLanes)||ze(e,t),a=r?function(e,t){var n=hu;hu|=2;var r=lc(),a=ic();mu!==e||vu!==t?(Ou=null,Ru=se()+500,nc(e,t)):ku=ze(e,t);e:for(;;)try{if(0!==bu&&null!==gu){t=gu;var l=yu;t:switch(bu){case 1:bu=0,yu=null,pc(e,t,l,1);break;case 2:case 9:if(nl(l)){bu=0,yu=null,fc(t);break}t=function(){2!==bu&&9!==bu||mu!==e||(bu=7),Oc(e)},l.then(t,t);break e;case 3:bu=7;break e;case 4:bu=5;break e;case 7:nl(l)?(bu=0,yu=null,fc(t)):(bu=0,yu=null,pc(e,t,l,7));break;case 5:var o=null;switch(gu.tag){case 26:o=gu.memoizedState;case 5:case 27:var s=gu;if(o?lf(o):s.stateNode.complete){bu=0,yu=null;var u=s.sibling;if(null!==u)gu=u;else{var c=s.return;null!==c?(gu=c,hc(c)):gu=null}break t}}bu=0,yu=null,pc(e,t,l,5);break;case 6:bu=0,yu=null,pc(e,t,l,6);break;case 8:tc(),ju=6;break e;default:throw Error(i(462))}}cc();break}catch(d){rc(e,d)}return Ea=ja=null,F.H=r,F.A=a,hu=n,null!==gu?0:(mu=null,vu=0,Pr(),ju)}(e,t):sc(e,t,!0),l=r;;){if(0===a){ku&&!r&&Zu(e,t,0,!1);break}if(n=e.current.alternate,!l||Ju(n)){if(2===a){if(l=t,e.errorRecoveryDisabledLanes&l)var o=0;else o=0!==(o=-536870913&e.pendingLanes)?o:536870912&o?536870912:0;if(0!==o){t=o;e:{var s=e;a=Nu;var u=s.current.memoizedState.isDehydrated;if(u&&(nc(s,o).flags|=256),2!==(o=sc(s,o,!1))){if(wu&&!u){s.errorRecoveryDisabledLanes|=l,$u|=l,a=4;break e}l=Pu,Pu=a,null!==l&&(null===Pu?Pu=l:Pu.push.apply(Pu,l))}a=o}if(l=!1,2!==a)continue}}if(1===a){nc(e,0),Zu(e,t,0,!0);break}e:{switch(r=e,l=a){case 0:case 1:throw Error(i(345));case 4:if((4194048&t)!==t)break;case 6:Zu(r,t,zu,!xu);break e;case 2:Pu=null;break;case 3:case 5:break;default:throw Error(i(329))}if((62914560&t)===t&&10<(a=Au+300-se())){if(Zu(r,t,zu,!xu),0!==Ce(r,0,!0))break e;Hu=t,r.timeoutHandle=wd(Xu.bind(null,r,n,Pu,Ou,Tu,t,zu,$u,_u,xu,l,"Throttled",-0,0),a)}else Xu(r,n,Pu,Ou,Tu,t,zu,$u,_u,xu,l,null,-0,0)}break}a=sc(e,t,!1),l=!1}Oc(e)}function Xu(e,t,n,r,a,l,i,o,s,u,c,d,f,p){if(e.timeoutHandle=-1,8192&(d=t.subtreeFlags)||16785408===(16785408&d)){iu(t,l,d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Tt});var h=(62914560&l)===l?Au-se():(4194048&l)===l?Fu-se():0;if(null!==(h=function(e,t){return e.stylesheets&&0===e.count&&cf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&cf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&0===of&&(of=62500*function(){if("function"===typeof performance.getEntriesByType){for(var e=0,t=0,n=performance.getEntriesByType("resource"),r=0;r<n.length;r++){var a=n[r],l=a.transferSize,i=a.initiatorType,o=a.duration;if(l&&o&&hd(i)){for(i=0,o=a.responseEnd,r+=1;r<n.length;r++){var s=n[r],u=s.startTime;if(u>o)break;var c=s.transferSize,d=s.initiatorType;c&&hd(d)&&(i+=c*((s=s.responseEnd)<o?1:(o-u)/(s-u)))}if(--r,t+=8*(l+i)/(a.duration/1e3),10<++e)break}}if(0<e)return t/e/1e6}return navigator.connection&&"number"===typeof(e=navigator.connection.downlink)?e:5}());var a=setTimeout(function(){if(e.waitingForImages=!1,0===e.count&&(e.stylesheets&&cf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>of?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(a)}}:null}(d,h)))return Hu=l,e.cancelPendingCommit=h(gc.bind(null,e,t,l,n,r,a,i,o,s,c,d,null,f,p)),void Zu(e,l,i,!u)}gc(e,t,l,n,r,a,i,o,s)}function Ju(e){for(var t=e;;){var n=t.tag;if((0===n||11===n||15===n)&&16384&t.flags&&(null!==(n=t.updateQueue)&&null!==(n=n.stores)))for(var r=0;r<n.length;r++){var a=n[r],l=a.getSnapshot;a=a.value;try{if(!Zn(l(),a))return!1}catch(i){return!1}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zu(e,t,n,r){t&=~Cu,t&=~$u,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var a=t;0<a;){var l=31-xe(a),i=1<<l;r[l]=-1,a&=~i}0!==n&&Ae(e,n,t)}function ec(){return 0!==(6&hu)||(Lc(0,!1),!1)}function tc(){if(null!==gu){if(0===bu)var e=gu.return;else Ea=ja=null,oi(e=gu),sl=null,ul=0,e=gu;for(;null!==e;)gs(e.alternate,e),e=e.return;gu=null}}function nc(e,t){var n=e.timeoutHandle;-1!==n&&(e.timeoutHandle=-1,Sd(n)),null!==(n=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,n()),Hu=0,tc(),mu=e,gu=n=Hr(e.current,null),vu=t,bu=0,yu=null,xu=!1,ku=ze(e,t),wu=!1,_u=zu=Cu=$u=Eu=ju=0,Pu=Nu=null,Tu=!1,0!==(8&t)&&(t|=32&t);var r=e.entangledLanes;if(0!==r)for(e=e.entanglements,r&=t;0<r;){var a=31-xe(r),l=1<<a;t|=e[a],r&=~l}return Su=t,Pr(),n}function rc(e,t){Vl=null,F.H=go,t===Ja||t===el?(t=il(),bu=3):t===Za?(t=il(),bu=4):bu=t===Ao?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,yu=t,null===gu&&(ju=1,zo(e,Qr(t,e.current)))}function ac(){var e=Al.current;return null===e||((4194048&vu)===vu?null===Fl:((62914560&vu)===vu||0!==(536870912&vu))&&e===Fl)}function lc(){var e=F.H;return F.H=go,null===e?go:e}function ic(){var e=F.A;return F.A=fu,e}function oc(){ju=4,xu||(4194048&vu)!==vu&&null!==Al.current||(ku=!0),0===(134217727&Eu)&&0===(134217727&$u)||null===mu||Zu(mu,vu,zu,!1)}function sc(e,t,n){var r=hu;hu|=2;var a=lc(),l=ic();mu===e&&vu===t||(Ou=null,nc(e,t)),t=!1;var i=ju;e:for(;;)try{if(0!==bu&&null!==gu){var o=gu,s=yu;switch(bu){case 8:tc(),i=6;break e;case 3:case 2:case 9:case 6:null===Al.current&&(t=!0);var u=bu;if(bu=0,yu=null,pc(e,o,s,u),n&&ku){i=0;break e}break;default:u=bu,bu=0,yu=null,pc(e,o,s,u)}}uc(),i=ju;break}catch(c){rc(e,c)}return t&&e.shellSuspendCounter++,Ea=ja=null,hu=r,F.H=a,F.A=l,null===gu&&(mu=null,vu=0,Pr()),i}function uc(){for(;null!==gu;)dc(gu)}function cc(){for(;null!==gu&&!ie();)dc(gu)}function dc(e){var t=os(e.alternate,e,Su);e.memoizedProps=e.pendingProps,null===t?hc(e):gu=t}function fc(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Ko(n,t,t.pendingProps,t.type,void 0,vu);break;case 11:t=Ko(n,t,t.pendingProps,t.type.render,t.ref,vu);break;case 5:oi(t);default:gs(n,t),t=os(n,t=gu=Br(t,Su),Su)}e.memoizedProps=e.pendingProps,null===t?hc(e):gu=t}function pc(e,t,n,r){Ea=ja=null,oi(t),sl=null,ul=0;var a=t.return;try{if(function(e,t,n,r,a){if(n.flags|=32768,null!==r&&"object"===typeof r&&"function"===typeof r.then){if(null!==(t=n.alternate)&&Na(t,n,a,!0),null!==(n=Al.current)){switch(n.tag){case 31:case 13:return null===Fl?oc():null===n.alternate&&0===ju&&(ju=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===tl?n.flags|=16384:(null===(t=n.updateQueue)?n.updateQueue=new Set([r]):t.add(r),Ec(e,r,a)),!1;case 22:return n.flags|=65536,r===tl?n.flags|=16384:(null===(t=n.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):null===(n=t.retryQueue)?t.retryQueue=new Set([r]):n.add(r),Ec(e,r,a)),!1}throw Error(i(435,n.tag))}return Ec(e,r,a),oc(),!1}if(fa)return null!==(t=Al.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ma&&wa(Qr(e=Error(i(422),{cause:r}),n))):(r!==ma&&wa(Qr(t=Error(i(423),{cause:r}),n)),(e=e.current.alternate).flags|=65536,a&=-a,e.lanes|=a,r=Qr(r,n),wl(e,a=No(e.stateNode,r,a)),4!==ju&&(ju=2)),!1;var l=Error(i(520),{cause:r});if(l=Qr(l,n),null===Nu?Nu=[l]:Nu.push(l),4!==ju&&(ju=2),null===t)return!0;r=Qr(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,wl(n,e=No(n.stateNode,r,e)),!1;case 1:if(t=n.type,l=n.stateNode,0===(128&n.flags)&&("function"===typeof t.getDerivedStateFromError||null!==l&&"function"===typeof l.componentDidCatch&&(null===Lu||!Lu.has(l))))return n.flags|=65536,a&=-a,n.lanes|=a,To(a=Po(a),e,n,r),wl(n,a),!1}n=n.return}while(null!==n);return!1}(e,a,t,n,vu))return ju=1,zo(e,Qr(n,e.current)),void(gu=null)}catch(l){if(null!==a)throw gu=a,l;return ju=1,zo(e,Qr(n,e.current)),void(gu=null)}32768&t.flags?(fa||1===r?e=!0:ku||0!==(536870912&vu)?e=!1:(xu=e=!0,(2===r||9===r||3===r||6===r)&&(null!==(r=Al.current)&&13===r.tag&&(r.flags|=16384))),mc(t,e)):hc(t)}function hc(e){var t=e;do{if(0!==(32768&t.flags))return void mc(t,xu);e=t.return;var n=hs(t.alternate,t,Su);if(null!==n)return void(gu=n);if(null!==(t=t.sibling))return void(gu=t);gu=t=e}while(null!==t);0===ju&&(ju=5)}function mc(e,t){do{var n=ms(e.alternate,e);if(null!==n)return n.flags&=32767,void(gu=n);if(null!==(n=e.return)&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&null!==(e=e.sibling))return void(gu=e);gu=e=n}while(null!==e);ju=6,gu=null}function gc(e,t,n,r,a,l,o,s,u){e.cancelPendingCommit=null;do{kc()}while(0!==Du);if(0!==(6&hu))throw Error(i(327));if(null!==t){if(t===e.current)throw Error(i(177));if(l=t.lanes|t.childLanes,function(e,t,n,r,a,l){var i=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,s=e.expirationTimes,u=e.hiddenUpdates;for(n=i&~n;0<n;){var c=31-xe(n),d=1<<c;o[c]=0,s[c]=-1;var f=u[c];if(null!==f)for(u[c]=null,c=0;c<f.length;c++){var p=f[c];null!==p&&(p.lane&=-536870913)}n&=~d}0!==r&&Ae(e,r,0),0!==l&&0===a&&0!==e.tag&&(e.suspendedLanes|=l&~(i&~t))}(e,n,l|=Nr,o,s,u),e===mu&&(gu=mu=null,vu=0),Iu=t,Mu=e,Hu=n,Bu=l,Vu=a,Uu=r,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,ae(fe,function(){return wc(),null})):(e.callbackNode=null,e.callbackPriority=0),r=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||r){r=F.T,F.T=null,a=R.p,R.p=2,o=hu,hu|=4;try{!function(e,t){if(e=e.containerInfo,md=kf,lr(e=ar(e))){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var a=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch(g){n=null;break e}var o=0,s=-1,u=-1,c=0,d=0,f=e,p=null;t:for(;;){for(var h;f!==n||0!==a&&3!==f.nodeType||(s=o+a),f!==l||0!==r&&3!==f.nodeType||(u=o+r),3===f.nodeType&&(o+=f.nodeValue.length),null!==(h=f.firstChild);)p=f,f=h;for(;;){if(f===e)break t;if(p===n&&++c===a&&(s=o),p===l&&++d===r&&(u=o),null!==(h=f.nextSibling))break;p=(f=p).parentNode}f=h}n=-1===s||-1===u?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(gd={focusedElem:e,selectionRange:n},kf=!1,Fs=t;null!==Fs;)if(e=(t=Fs).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Fs=e;else for(;null!==Fs;){switch(l=(t=Fs).alternate,e=t.flags,t.tag){case 0:if(0!==(4&e)&&null!==(e=null!==(e=t.updateQueue)?e.events:null))for(n=0;n<e.length;n++)(a=e[n]).ref.impl=a.nextImpl;break;case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==l){e=void 0,n=t,a=l.memoizedProps,l=l.memoizedState,r=n.stateNode;try{var m=jo(n.type,a);e=r.getSnapshotBeforeUpdate(m,l),r.__reactInternalSnapshotBeforeUpdate=e}catch(v){jc(n,n.return,v)}}break;case 3:if(0!==(1024&e))if(9===(n=(e=t.stateNode.containerInfo).nodeType))Nd(e);else if(1===n)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Nd(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(i(163))}if(null!==(e=t.sibling)){e.return=t.return,Fs=e;break}Fs=t.return}}(e,t)}finally{hu=o,R.p=a,F.T=r}}Du=1,vc(),bc(),yc()}}function vc(){if(1===Du){Du=0;var e=Mu,t=Iu,n=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||n){n=F.T,F.T=null;var r=R.p;R.p=2;var a=hu;hu|=4;try{Ks(t,e);var l=gd,i=ar(e.containerInfo),o=l.focusedElem,s=l.selectionRange;if(i!==o&&o&&o.ownerDocument&&rr(o.ownerDocument.documentElement,o)){if(null!==s&&lr(o)){var u=s.start,c=s.end;if(void 0===c&&(c=u),"selectionStart"in o)o.selectionStart=u,o.selectionEnd=Math.min(c,o.value.length);else{var d=o.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),h=o.textContent.length,m=Math.min(s.start,h),g=void 0===s.end?m:Math.min(s.end,h);!p.extend&&m>g&&(i=g,g=m,m=i);var v=nr(o,m),b=nr(o,g);if(v&&b&&(1!==p.rangeCount||p.anchorNode!==v.node||p.anchorOffset!==v.offset||p.focusNode!==b.node||p.focusOffset!==b.offset)){var y=d.createRange();y.setStart(v.node,v.offset),p.removeAllRanges(),m>g?(p.addRange(y),p.extend(b.node,b.offset)):(y.setEnd(b.node,b.offset),p.addRange(y))}}}}for(d=[],p=o;p=p.parentNode;)1===p.nodeType&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for("function"===typeof o.focus&&o.focus(),o=0;o<d.length;o++){var x=d[o];x.element.scrollLeft=x.left,x.element.scrollTop=x.top}}kf=!!md,gd=md=null}finally{hu=a,R.p=r,F.T=n}}e.current=t,Du=2}}function bc(){if(2===Du){Du=0;var e=Mu,t=Iu,n=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||n){n=F.T,F.T=null;var r=R.p;R.p=2;var a=hu;hu|=4;try{Rs(e,t.alternate,t)}finally{hu=a,R.p=r,F.T=n}}Du=3}}function yc(){if(4===Du||3===Du){Du=0,oe();var e=Mu,t=Iu,n=Hu,r=Uu;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Du=5:(Du=0,Iu=Mu=null,xc(e,e.pendingLanes));var a=e.pendingLanes;if(0===a&&(Lu=null),Le(n),t=t.stateNode,be&&"function"===typeof be.onCommitFiberRoot)try{be.onCommitFiberRoot(ve,t,void 0,128===(128&t.current.flags))}catch(s){}if(null!==r){t=F.T,a=R.p,R.p=2,F.T=null;try{for(var l=e.onRecoverableError,i=0;i<r.length;i++){var o=r[i];l(o.value,{componentStack:o.stack})}}finally{F.T=t,R.p=a}}0!==(3&Hu)&&kc(),Oc(e),a=e.pendingLanes,0!==(261930&n)&&0!==(42&a)?e===Ku?Wu++:(Wu=0,Ku=e):Wu=0,Lc(0,!1)}}function xc(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Ha(t)))}function kc(){return vc(),bc(),yc(),wc()}function wc(){if(5!==Du)return!1;var e=Mu,t=Bu;Bu=0;var n=Le(Hu),r=F.T,a=R.p;try{R.p=32>n?32:n,F.T=null,n=Vu,Vu=null;var l=Mu,o=Hu;if(Du=0,Iu=Mu=null,Hu=0,0!==(6&hu))throw Error(i(331));var s=hu;if(hu|=4,uu(l.current),tu(l,l.current,o,n),hu=s,Lc(0,!1),be&&"function"===typeof be.onPostCommitFiberRoot)try{be.onPostCommitFiberRoot(ve,l)}catch(u){}return!0}finally{R.p=a,F.T=r,xc(e,t)}}function Sc(e,t,n){t=Qr(n,t),null!==(e=xl(e,t=No(e.stateNode,t,2),2))&&(Te(e,2),Oc(e))}function jc(e,t,n){if(3===e.tag)Sc(e,e,n);else for(;null!==t;){if(3===t.tag){Sc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===Lu||!Lu.has(r))){e=Qr(n,e),null!==(r=xl(t,n=Po(2),2))&&(To(n,r,t,e),Te(r,2),Oc(r));break}}t=t.return}}function Ec(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new pu;var a=new Set;r.set(t,a)}else void 0===(a=r.get(t))&&(a=new Set,r.set(t,a));a.has(n)||(wu=!0,a.add(n),e=$c.bind(null,e,t,n),t.then(e,e))}function $c(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,mu===e&&(vu&n)===n&&(4===ju||3===ju&&(62914560&vu)===vu&&300>se()-Au?0===(2&hu)&&nc(e,0):Cu|=n,_u===vu&&(_u=0)),Oc(e)}function Cc(e,t){0===t&&(t=Ne()),null!==(e=Fr(e,t))&&(Te(e,t),Oc(e))}function zc(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Cc(e,n)}function _c(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;null!==a&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}null!==r&&r.delete(t),Cc(e,n)}var Nc=null,Pc=null,Tc=!1,Ac=!1,Fc=!1,Rc=0;function Oc(e){e!==Pc&&null===e.next&&(null===Pc?Nc=Pc=e:Pc=Pc.next=e),Ac=!0,Tc||(Tc=!0,Ed(function(){0!==(6&hu)?ae(ce,Dc):Mc()}))}function Lc(e,t){if(!Fc&&Ac){Fc=!0;do{for(var n=!1,r=Nc;null!==r;){if(!t)if(0!==e){var a=r.pendingLanes;if(0===a)var l=0;else{var i=r.suspendedLanes,o=r.pingedLanes;l=(1<<31-xe(42|e)+1)-1,l=201326741&(l&=a&~(i&~o))?201326741&l|1:l?2|l:0}0!==l&&(n=!0,Bc(r,l))}else l=vu,0===(3&(l=Ce(r,r===mu?l:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||ze(r,l)||(n=!0,Bc(r,l));r=r.next}}while(n);Fc=!1}}function Dc(){Mc()}function Mc(){Ac=Tc=!1;var e=0;0!==Rc&&function(){var e=window.event;if(e&&"popstate"===e.type)return e!==kd&&(kd=e,!0);return kd=null,!1}()&&(e=Rc);for(var t=se(),n=null,r=Nc;null!==r;){var a=r.next,l=Ic(r,t);0===l?(r.next=null,null===n?Nc=a:n.next=a,null===a&&(Pc=n)):(n=r,(0!==e||0!==(3&l))&&(Ac=!0)),r=a}0!==Du&&5!==Du||Lc(e,!1),0!==Rc&&(Rc=0)}function Ic(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,l=-62914561&e.pendingLanes;0<l;){var i=31-xe(l),o=1<<i,s=a[i];-1===s?0!==(o&n)&&0===(o&r)||(a[i]=_e(o,t)):s<=t&&(e.expiredLanes|=o),l&=~o}if(n=vu,n=Ce(e,e===(t=mu)?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===n||e===t&&(2===bu||9===bu)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&le(r),e.callbackNode=null,e.callbackPriority=0;if(0===(3&n)||ze(e,n)){if((t=n&-n)===e.callbackPriority)return t;switch(null!==r&&le(r),Le(n)){case 2:case 8:n=de;break;case 32:default:n=fe;break;case 268435456:n=he}return r=Hc.bind(null,e),n=ae(n,r),e.callbackPriority=t,e.callbackNode=n,t}return null!==r&&null!==r&&le(r),e.callbackPriority=2,e.callbackNode=null,2}function Hc(e,t){if(0!==Du&&5!==Du)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(kc()&&e.callbackNode!==n)return null;var r=vu;return 0===(r=Ce(e,e===mu?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Gu(e,r,t),Ic(e,se()),null!=e.callbackNode&&e.callbackNode===n?Hc.bind(null,e):null)}function Bc(e,t){if(kc())return null;Gu(e,t,!0)}function Vc(){if(0===Rc){var e=Ua;0===e&&(e=Se,0===(261888&(Se<<=1))&&(Se=256)),Rc=e}return Rc}function Uc(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:Pt(""+e)}function Wc(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}for(var Kc=0;Kc<Er.length;Kc++){var qc=Er[Kc];$r(qc.toLowerCase(),"on"+(qc[0].toUpperCase()+qc.slice(1)))}$r(vr,"onAnimationEnd"),$r(br,"onAnimationIteration"),$r(yr,"onAnimationStart"),$r("dblclick","onDoubleClick"),$r("focusin","onFocus"),$r("focusout","onBlur"),$r(xr,"onTransitionRun"),$r(kr,"onTransitionStart"),$r(wr,"onTransitionCancel"),$r(Sr,"onTransitionEnd"),at("onMouseEnter",["mouseout","mouseover"]),at("onMouseLeave",["mouseout","mouseover"]),at("onPointerEnter",["pointerout","pointerover"]),at("onPointerLeave",["pointerout","pointerover"]),rt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),rt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),rt("onBeforeInput",["compositionend","keypress","textInput","paste"]),rt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Qc=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yc));function Gc(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var i=r.length-1;0<=i;i--){var o=r[i],s=o.instance,u=o.currentTarget;if(o=o.listener,s!==l&&a.isPropagationStopped())break e;l=o,a.currentTarget=u;try{l(a)}catch(c){Cr(c)}a.currentTarget=null,l=s}else for(i=0;i<r.length;i++){if(s=(o=r[i]).instance,u=o.currentTarget,o=o.listener,s!==l&&a.isPropagationStopped())break e;l=o,a.currentTarget=u;try{l(a)}catch(c){Cr(c)}a.currentTarget=null,l=s}}}}function Xc(e,t){var n=t[Ue];void 0===n&&(n=t[Ue]=new Set);var r=e+"__bubble";n.has(r)||(td(t,e,2,!1),n.add(r))}function Jc(e,t,n){var r=0;t&&(r|=4),td(n,e,r,t)}var Zc="_reactListening"+Math.random().toString(36).slice(2);function ed(e){if(!e[Zc]){e[Zc]=!0,tt.forEach(function(t){"selectionchange"!==t&&(Qc.has(t)||Jc(t,!1,e),Jc(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Zc]||(t[Zc]=!0,Jc("selectionchange",!1,t))}}function td(e,t,n,r){switch(zf(t)){case 2:var a=wf;break;case 8:a=Sf;break;default:a=jf}n=a.bind(null,t,n,e),a=void 0,!Bt||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),r?void 0!==a?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):void 0!==a?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function nd(e,t,n,r,a){var l=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var i=r.tag;if(3===i||4===i){var o=r.stateNode.containerInfo;if(o===a)break;if(4===i)for(i=r.return;null!==i;){var u=i.tag;if((3===u||4===u)&&i.stateNode.containerInfo===a)return;i=i.return}for(;null!==o;){if(null===(i=Ge(o)))return;if(5===(u=i.tag)||6===u||26===u||27===u){r=l=i;continue e}o=o.parentNode}}r=r.return}Mt(function(){var r=l,a=Ft(n),i=[];e:{var o=jr.get(e);if(void 0!==o){var u=nn,c=e;switch(e){case"keypress":if(0===Yt(n))break e;case"keydown":case"keyup":u=bn;break;case"focusin":c="focus",u=un;break;case"focusout":c="blur",u=un;break;case"beforeblur":case"afterblur":u=un;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":u=on;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":u=sn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":u=xn;break;case vr:case br:case yr:u=cn;break;case Sr:u=kn;break;case"scroll":case"scrollend":u=an;break;case"wheel":u=wn;break;case"copy":case"cut":case"paste":u=dn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":u=yn;break;case"toggle":case"beforetoggle":u=Sn}var d=0!==(4&t),f=!d&&("scroll"===e||"scrollend"===e),p=d?null!==o?o+"Capture":null:o;d=[];for(var h,m=r;null!==m;){var g=m;if(h=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===h||null===p||null!=(g=It(m,p))&&d.push(rd(m,g,h)),f)break;m=m.return}0<d.length&&(o=new u(o,c,null,n,a),i.push({event:o,listeners:d}))}}if(0===(7&t)){if(u="mouseout"===e||"pointerout"===e,(!(o="mouseover"===e||"pointerover"===e)||n===At||!(c=n.relatedTarget||n.fromElement)||!Ge(c)&&!c[Ve])&&(u||o)&&(o=a.window===a?a:(o=a.ownerDocument)?o.defaultView||o.parentWindow:window,u?(u=r,null!==(c=(c=n.relatedTarget||n.toElement)?Ge(c):null)&&(f=s(c),d=c.tag,c!==f||5!==d&&27!==d&&6!==d)&&(c=null)):(u=null,c=r),u!==c)){if(d=on,g="onMouseLeave",p="onMouseEnter",m="mouse","pointerout"!==e&&"pointerover"!==e||(d=yn,g="onPointerLeave",p="onPointerEnter",m="pointer"),f=null==u?o:Je(u),h=null==c?o:Je(c),(o=new d(g,m+"leave",u,n,a)).target=f,o.relatedTarget=h,g=null,Ge(a)===r&&((d=new d(p,m+"enter",c,n,a)).target=h,d.relatedTarget=f,g=d),f=g,u&&c)e:{for(d=ld,m=c,h=0,g=p=u;g;g=d(g))h++;g=0;for(var v=m;v;v=d(v))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||null!==m&&p===m.alternate){d=p;break e}p=d(p),m=d(m)}d=null}else d=null;null!==u&&id(i,o,u,d,!1),null!==c&&null!==f&&id(i,f,c,d,!0)}if("select"===(u=(o=r?Je(r):window).nodeName&&o.nodeName.toLowerCase())||"input"===u&&"file"===o.type)var b=Hn;else if(Rn(o))if(Bn)b=Jn;else{b=Gn;var y=Qn}else!(u=o.nodeName)||"input"!==u.toLowerCase()||"checkbox"!==o.type&&"radio"!==o.type?r&&zt(r.elementType)&&(b=Hn):b=Xn;switch(b&&(b=b(e,r))?On(i,b,n,a):(y&&y(e,o,r),"focusout"===e&&r&&"number"===o.type&&null!=r.memoizedProps.value&&xt(o,"number",o.value)),y=r?Je(r):window,e){case"focusin":(Rn(y)||"true"===y.contentEditable)&&(or=y,sr=r,ur=null);break;case"focusout":ur=sr=or=null;break;case"mousedown":cr=!0;break;case"contextmenu":case"mouseup":case"dragend":cr=!1,dr(i,n,a);break;case"selectionchange":if(ir)break;case"keydown":case"keyup":dr(i,n,a)}var x;if(En)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else An?Pn(e,n)&&(k="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(k="onCompositionStart");k&&(zn&&"ko"!==n.locale&&(An||"onCompositionStart"!==k?"onCompositionEnd"===k&&An&&(x=qt()):(Wt="value"in(Ut=a)?Ut.value:Ut.textContent,An=!0)),0<(y=ad(r,k)).length&&(k=new fn(k,e,null,n,a),i.push({event:k,listeners:y}),x?k.data=x:null!==(x=Tn(n))&&(k.data=x))),(x=Cn?function(e,t){switch(e){case"compositionend":return Tn(t);case"keypress":return 32!==t.which?null:(Nn=!0,_n);case"textInput":return(e=t.data)===_n&&Nn?null:e;default:return null}}(e,n):function(e,t){if(An)return"compositionend"===e||!En&&Pn(e,t)?(e=qt(),Kt=Wt=Ut=null,An=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(k=ad(r,"onBeforeInput")).length&&(y=new fn("onBeforeInput","beforeinput",null,n,a),i.push({event:y,listeners:k}),y.data=x)),function(e,t,n,r,a){if("submit"===t&&n&&n.stateNode===a){var l=Uc((a[Be]||null).action),i=r.submitter;i&&null!==(t=(t=i[Be]||null)?Uc(t.formAction):i.getAttribute("formAction"))&&(l=t,i=null);var o=new nn("action","action",null,r,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==Rc){var e=i?Wc(a,i):new FormData(a);to(n,{pending:!0,data:e,method:a.method,action:l},null,e)}}else"function"===typeof l&&(o.preventDefault(),e=i?Wc(a,i):new FormData(a),to(n,{pending:!0,data:e,method:a.method,action:l},l,e))},currentTarget:a}]})}}(i,e,r,n,a)}Gc(i,t)})}function rd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ad(e,t){for(var n=t+"Capture",r=[];null!==e;){var a=e,l=a.stateNode;if(5!==(a=a.tag)&&26!==a&&27!==a||null===l||(null!=(a=It(e,n))&&r.unshift(rd(e,a,l)),null!=(a=It(e,t))&&r.push(rd(e,a,l))),3===e.tag)return r;e=e.return}return[]}function ld(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function id(e,t,n,r,a){for(var l=t._reactName,i=[];null!==n&&n!==r;){var o=n,s=o.alternate,u=o.stateNode;if(o=o.tag,null!==s&&s===r)break;5!==o&&26!==o&&27!==o||null===u||(s=u,a?null!=(u=It(n,l))&&i.unshift(rd(n,u,s)):a||null!=(u=It(n,l))&&i.push(rd(n,u,s))),n=n.return}0!==i.length&&e.push({event:t,listeners:i})}var od=/\r\n?/g,sd=/\u0000|\uFFFD/g;function ud(e){return("string"===typeof e?e:""+e).replace(od,"\n").replace(sd,"")}function cd(e,t){return t=ud(t),ud(e)===t}function dd(e,t,n,r,a,l){switch(n){case"children":"string"===typeof r?"body"===t||"textarea"===t&&""===r||jt(e,r):("number"===typeof r||"bigint"===typeof r)&&"body"!==t&&jt(e,""+r);break;case"className":ut(e,"class",r);break;case"tabIndex":ut(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":ut(e,n,r);break;case"style":Ct(e,r,l);break;case"data":if("object"!==t){ut(e,"data",r);break}case"src":case"href":if(""===r&&("a"!==t||"href"!==n)){e.removeAttribute(n);break}if(null==r||"function"===typeof r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=Pt(""+r),e.setAttribute(n,r);break;case"action":case"formAction":if("function"===typeof r){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof l&&("formAction"===n?("input"!==t&&dd(e,t,"name",a.name,a,null),dd(e,t,"formEncType",a.formEncType,a,null),dd(e,t,"formMethod",a.formMethod,a,null),dd(e,t,"formTarget",a.formTarget,a,null)):(dd(e,t,"encType",a.encType,a,null),dd(e,t,"method",a.method,a,null),dd(e,t,"target",a.target,a,null))),null==r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=Pt(""+r),e.setAttribute(n,r);break;case"onClick":null!=r&&(e.onclick=Tt);break;case"onScroll":null!=r&&Xc("scroll",e);break;case"onScrollEnd":null!=r&&Xc("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(i(61));if(null!=(n=r.__html)){if(null!=a.children)throw Error(i(60));e.innerHTML=n}}break;case"multiple":e.multiple=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"muted":e.muted=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==r||"function"===typeof r||"boolean"===typeof r||"symbol"===typeof r){e.removeAttribute("xlink:href");break}n=Pt(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""+r):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":!0===r?e.setAttribute(n,""):!1!==r&&null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,r):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":null!=r&&"function"!==typeof r&&"symbol"!==typeof r&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case"rowSpan":case"start":null==r||"function"===typeof r||"symbol"===typeof r||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case"popover":Xc("beforetoggle",e),Xc("toggle",e),st(e,"popover",r);break;case"xlinkActuate":ct(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":ct(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":ct(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":ct(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":ct(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":ct(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":ct(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":ct(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":ct(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":st(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&st(e,n=_t.get(n)||n,r)}}function fd(e,t,n,r,a,l){switch(n){case"style":Ct(e,r,l);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(i(61));if(null!=(n=r.__html)){if(null!=a.children)throw Error(i(60));e.innerHTML=n}}break;case"children":"string"===typeof r?jt(e,r):("number"===typeof r||"bigint"===typeof r)&&jt(e,""+r);break;case"onScroll":null!=r&&Xc("scroll",e);break;case"onScrollEnd":null!=r&&Xc("scrollend",e);break;case"onClick":null!=r&&(e.onclick=Tt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:nt.hasOwnProperty(n)||("o"!==n[0]||"n"!==n[1]||(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),"function"===typeof(l=null!=(l=e[Be]||null)?l[n]:null)&&e.removeEventListener(t,l,a),"function"!==typeof r)?n in e?e[n]=r:!0===r?e.setAttribute(n,""):st(e,n,r):("function"!==typeof l&&null!==l&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a)))}}function pd(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Xc("error",e),Xc("load",e);var r,a=!1,l=!1;for(r in n)if(n.hasOwnProperty(r)){var o=n[r];if(null!=o)switch(r){case"src":a=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(i(137,t));default:dd(e,t,r,o,n,null)}}return l&&dd(e,t,"srcSet",n.srcSet,n,null),void(a&&dd(e,t,"src",n.src,n,null));case"input":Xc("invalid",e);var s=r=o=l=null,u=null,c=null;for(a in n)if(n.hasOwnProperty(a)){var d=n[a];if(null!=d)switch(a){case"name":l=d;break;case"type":o=d;break;case"checked":u=d;break;case"defaultChecked":c=d;break;case"value":r=d;break;case"defaultValue":s=d;break;case"children":case"dangerouslySetInnerHTML":if(null!=d)throw Error(i(137,t));break;default:dd(e,t,a,d,n,null)}}return void yt(e,r,s,u,c,o,l,!1);case"select":for(l in Xc("invalid",e),a=o=r=null,n)if(n.hasOwnProperty(l)&&null!=(s=n[l]))switch(l){case"value":r=s;break;case"defaultValue":o=s;break;case"multiple":a=s;default:dd(e,t,l,s,n,null)}return t=r,n=o,e.multiple=!!a,void(null!=t?kt(e,!!a,t,!1):null!=n&&kt(e,!!a,n,!0));case"textarea":for(o in Xc("invalid",e),r=l=a=null,n)if(n.hasOwnProperty(o)&&null!=(s=n[o]))switch(o){case"value":a=s;break;case"defaultValue":l=s;break;case"children":r=s;break;case"dangerouslySetInnerHTML":if(null!=s)throw Error(i(91));break;default:dd(e,t,o,s,n,null)}return void St(e,a,l,r);case"option":for(u in n)if(n.hasOwnProperty(u)&&null!=(a=n[u]))if("selected"===u)e.selected=a&&"function"!==typeof a&&"symbol"!==typeof a;else dd(e,t,u,a,n,null);return;case"dialog":Xc("beforetoggle",e),Xc("toggle",e),Xc("cancel",e),Xc("close",e);break;case"iframe":case"object":Xc("load",e);break;case"video":case"audio":for(a=0;a<Yc.length;a++)Xc(Yc[a],e);break;case"image":Xc("error",e),Xc("load",e);break;case"details":Xc("toggle",e);break;case"embed":case"source":case"link":Xc("error",e),Xc("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&null!=(a=n[c]))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(i(137,t));default:dd(e,t,c,a,n,null)}return;default:if(zt(t)){for(d in n)n.hasOwnProperty(d)&&(void 0!==(a=n[d])&&fd(e,t,d,a,n,void 0));return}}for(s in n)n.hasOwnProperty(s)&&(null!=(a=n[s])&&dd(e,t,s,a,n,null))}function hd(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}var md=null,gd=null;function vd(e){return 9===e.nodeType?e:e.ownerDocument}function bd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function yd(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function xd(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var kd=null;var wd="function"===typeof setTimeout?setTimeout:void 0,Sd="function"===typeof clearTimeout?clearTimeout:void 0,jd="function"===typeof Promise?Promise:void 0,Ed="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof jd?function(e){return jd.resolve(null).then(e).catch($d)}:wd;function $d(e){setTimeout(function(){throw e})}function Cd(e){return"head"===e}function zd(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&8===a.nodeType)if("/$"===(n=a.data)||"/&"===n){if(0===r)return e.removeChild(a),void Kf(t);r--}else if("$"===n||"$?"===n||"$~"===n||"$!"===n||"&"===n)r++;else if("html"===n)Md(e.ownerDocument.documentElement);else if("head"===n){Md(n=e.ownerDocument.head);for(var l=n.firstChild;l;){var i=l.nextSibling,o=l.nodeName;l[Ye]||"SCRIPT"===o||"STYLE"===o||"LINK"===o&&"stylesheet"===l.rel.toLowerCase()||n.removeChild(l),l=i}}else"body"===n&&Md(e.ownerDocument.body);n=a}while(n);Kf(t)}function _d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(1===n.nodeType?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",""===n.getAttribute("style")&&n.removeAttribute("style")):3===n.nodeType&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),r&&8===r.nodeType)if("/$"===(n=r.data)){if(0===e)break;e--}else"$"!==n&&"$?"!==n&&"$~"!==n&&"$!"!==n||e++;n=r}while(n)}function Nd(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Nd(n),Qe(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===n.rel.toLowerCase())continue}e.removeChild(n)}}function Pd(e,t){for(;8!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null;if(null===(e=Fd(e.nextSibling)))return null}return e}function Td(e){return"$?"===e.data||"$~"===e.data}function Ad(e){return"$!"===e.data||"$?"===e.data&&"loading"!==e.ownerDocument.readyState}function Fd(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"$~"===t||"&"===t||"F!"===t||"F"===t)break;if("/$"===t||"/&"===t)return null}}return e}var Rd=null;function Od(e){e=e.nextSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n||"/&"===n){if(0===t)return Fd(e.nextSibling);t--}else"$"!==n&&"$!"!==n&&"$?"!==n&&"$~"!==n&&"&"!==n||t++}e=e.nextSibling}return null}function Ld(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n||"$~"===n||"&"===n){if(0===t)return e;t--}else"/$"!==n&&"/&"!==n||t++}e=e.previousSibling}return null}function Dd(e,t,n){switch(t=vd(n),e){case"html":if(!(e=t.documentElement))throw Error(i(452));return e;case"head":if(!(e=t.head))throw Error(i(453));return e;case"body":if(!(e=t.body))throw Error(i(454));return e;default:throw Error(i(451))}}function Md(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Qe(e)}var Id=new Map,Hd=new Set;function Bd(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Vd=R.d;R.d={f:function(){var e=Vd.f(),t=ec();return e||t},r:function(e){var t=Xe(e);null!==t&&5===t.tag&&"form"===t.type?ro(t):Vd.r(e)},D:function(e){Vd.D(e),Wd("dns-prefetch",e,null)},C:function(e,t){Vd.C(e,t),Wd("preconnect",e,t)},L:function(e,t,n){Vd.L(e,t,n);var r=Ud;if(r&&e&&t){var a='link[rel="preload"][as="'+vt(t)+'"]';"image"===t&&n&&n.imageSrcSet?(a+='[imagesrcset="'+vt(n.imageSrcSet)+'"]',"string"===typeof n.imageSizes&&(a+='[imagesizes="'+vt(n.imageSizes)+'"]')):a+='[href="'+vt(e)+'"]';var l=a;switch(t){case"style":l=qd(e);break;case"script":l=Gd(e)}Id.has(l)||(e=p({rel:"preload",href:"image"===t&&n&&n.imageSrcSet?void 0:e,as:t},n),Id.set(l,e),null!==r.querySelector(a)||"style"===t&&r.querySelector(Yd(l))||"script"===t&&r.querySelector(Xd(l))||(pd(t=r.createElement("link"),"link",e),et(t),r.head.appendChild(t)))}},m:function(e,t){Vd.m(e,t);var n=Ud;if(n&&e){var r=t&&"string"===typeof t.as?t.as:"script",a='link[rel="modulepreload"][as="'+vt(r)+'"][href="'+vt(e)+'"]',l=a;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=Gd(e)}if(!Id.has(l)&&(e=p({rel:"modulepreload",href:e},t),Id.set(l,e),null===n.querySelector(a))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Xd(l)))return}pd(r=n.createElement("link"),"link",e),et(r),n.head.appendChild(r)}}},X:function(e,t){Vd.X(e,t);var n=Ud;if(n&&e){var r=Ze(n).hoistableScripts,a=Gd(e),l=r.get(a);l||((l=n.querySelector(Xd(a)))||(e=p({src:e,async:!0},t),(t=Id.get(a))&&tf(e,t),et(l=n.createElement("script")),pd(l,"link",e),n.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},r.set(a,l))}},S:function(e,t,n){Vd.S(e,t,n);var r=Ud;if(r&&e){var a=Ze(r).hoistableStyles,l=qd(e);t=t||"default";var i=a.get(l);if(!i){var o={loading:0,preload:null};if(i=r.querySelector(Yd(l)))o.loading=5;else{e=p({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Id.get(l))&&ef(e,n);var s=i=r.createElement("link");et(s),pd(s,"link",e),s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),s.addEventListener("load",function(){o.loading|=1}),s.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Zd(i,t,r)}i={type:"stylesheet",instance:i,count:1,state:o},a.set(l,i)}}},M:function(e,t){Vd.M(e,t);var n=Ud;if(n&&e){var r=Ze(n).hoistableScripts,a=Gd(e),l=r.get(a);l||((l=n.querySelector(Xd(a)))||(e=p({src:e,async:!0,type:"module"},t),(t=Id.get(a))&&tf(e,t),et(l=n.createElement("script")),pd(l,"link",e),n.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},r.set(a,l))}}};var Ud="undefined"===typeof document?null:document;function Wd(e,t,n){var r=Ud;if(r&&"string"===typeof t&&t){var a=vt(t);a='link[rel="'+e+'"][href="'+a+'"]',"string"===typeof n&&(a+='[crossorigin="'+n+'"]'),Hd.has(a)||(Hd.add(a),e={rel:e,crossOrigin:n,href:t},null===r.querySelector(a)&&(pd(t=r.createElement("link"),"link",e),et(t),r.head.appendChild(t)))}}function Kd(e,t,n,r){var a,l,o,s,u=(u=K.current)?Bd(u):null;if(!u)throw Error(i(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof n.precedence&&"string"===typeof n.href?(t=qd(n.href),(r=(n=Ze(u).hoistableStyles).get(t))||(r={type:"style",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===n.rel&&"string"===typeof n.href&&"string"===typeof n.precedence){e=qd(n.href);var c=Ze(u).hoistableStyles,d=c.get(e);if(d||(u=u.ownerDocument||u,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,d),(c=u.querySelector(Yd(e)))&&!c._p&&(d.instance=c,d.state.loading=5),Id.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Id.set(e,n),c||(a=u,l=e,o=n,s=d.state,a.querySelector('link[rel="preload"][as="style"]['+l+"]")?s.loading=1:(l=a.createElement("link"),s.preload=l,l.addEventListener("load",function(){return s.loading|=1}),l.addEventListener("error",function(){return s.loading|=2}),pd(l,"link",o),et(l),a.head.appendChild(l))))),t&&null===r)throw Error(i(528,""));return d}if(t&&null!==r)throw Error(i(529,""));return null;case"script":return t=n.async,"string"===typeof(n=n.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Gd(n),(r=(n=Ze(u).hoistableScripts).get(t))||(r={type:"script",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(i(444,e))}}function qd(e){return'href="'+vt(e)+'"'}function Yd(e){return'link[rel="stylesheet"]['+e+"]"}function Qd(e){return p({},e,{"data-precedence":e.precedence,precedence:null})}function Gd(e){return'[src="'+vt(e)+'"]'}function Xd(e){return"script[async]"+e}function Jd(e,t,n){if(t.count++,null===t.instance)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+vt(n.href)+'"]');if(r)return t.instance=r,et(r),r;var a=p({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return et(r=(e.ownerDocument||e).createElement("style")),pd(r,"style",a),Zd(r,n.precedence,e),t.instance=r;case"stylesheet":a=qd(n.href);var l=e.querySelector(Yd(a));if(l)return t.state.loading|=4,t.instance=l,et(l),l;r=Qd(n),(a=Id.get(a))&&ef(r,a),et(l=(e.ownerDocument||e).createElement("link"));var o=l;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),pd(l,"link",r),t.state.loading|=4,Zd(l,n.precedence,e),t.instance=l;case"script":return l=Gd(n.src),(a=e.querySelector(Xd(l)))?(t.instance=a,et(a),a):(r=n,(a=Id.get(l))&&tf(r=p({},n),a),et(a=(e=e.ownerDocument||e).createElement("script")),pd(a,"link",r),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(i(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(r=t.instance,t.state.loading|=4,Zd(r,n.precedence,e));return t.instance}function Zd(e,t,n){for(var r=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=r.length?r[r.length-1]:null,l=a,i=0;i<r.length;i++){var o=r[i];if(o.dataset.precedence===t)l=o;else if(l!==a)break}l?l.parentNode.insertBefore(e,l.nextSibling):(t=9===n.nodeType?n.head:n).insertBefore(e,t.firstChild)}function ef(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function tf(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var nf=null;function rf(e,t,n){if(null===nf){var r=new Map,a=nf=new Map;a.set(n,r)}else(r=(a=nf).get(n))||(r=new Map,a.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var l=n[a];if(!(l[Ye]||l[He]||"link"===e&&"stylesheet"===l.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==l.namespaceURI){var i=l.getAttribute(t)||"";i=e+i;var o=r.get(i);o?o.push(l):r.set(i,[l])}}return r}function af(e,t,n){(e=e.ownerDocument||e).head.insertBefore(n,"title"===t?e.querySelector("head > title"):null)}function lf(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var of=0;function sf(){if(this.count--,0===this.count&&(0===this.imgCount||!this.waitingForImages))if(this.stylesheets)cf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var uf=null;function cf(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,uf=new Map,t.forEach(df,e),uf=null,sf.call(e))}function df(e,t){if(!(4&t.state.loading)){var n=uf.get(e);if(n)var r=n.get(null);else{n=new Map,uf.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<a.length;l++){var i=a[l];"LINK"!==i.nodeName&&"not all"===i.getAttribute("media")||(n.set(i.dataset.precedence,i),r=i)}r&&n.set(null,r)}i=(a=t.instance).getAttribute("data-precedence"),(l=n.get(i)||r)===r&&n.set(null,a),n.set(i,a),this.count++,r=sf.bind(this),a.addEventListener("load",r),a.addEventListener("error",r),l?l.parentNode.insertBefore(a,l.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(a,e.firstChild),t.state.loading|=4}}var ff={$$typeof:k,Provider:null,Consumer:null,_currentValue:O,_currentValue2:O,_threadCount:0};function pf(e,t,n,r,a,l,i,o,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Pe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pe(0),this.hiddenUpdates=Pe(null),this.identifierPrefix=r,this.onUncaughtError=a,this.onCaughtError=l,this.onRecoverableError=i,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function hf(e,t,n,r,a,l,i,o,s,u,c,d){return e=new pf(e,t,n,i,s,u,c,d,o),t=1,!0===l&&(t|=24),l=Mr(3,null,null,t),e.current=l,l.stateNode=e,(t=Ia()).refCount++,e.pooledCache=t,t.refCount++,l.memoizedState={element:r,isDehydrated:n,cache:t},vl(l),e}function mf(e){return e?e=Lr:Lr}function gf(e,t,n,r,a,l){a=mf(a),null===r.context?r.context=a:r.pendingContext=a,(r=yl(t)).payload={element:n},null!==(l=void 0===l?null:l)&&(r.callback=l),null!==(n=xl(e,r,t))&&(Qu(n,0,t),kl(n,e,t))}function vf(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function bf(e,t){vf(e,t),(e=e.alternate)&&vf(e,t)}function yf(e){if(13===e.tag||31===e.tag){var t=Fr(e,67108864);null!==t&&Qu(t,0,67108864),bf(e,67108864)}}function xf(e){if(13===e.tag||31===e.tag){var t=qu(),n=Fr(e,t=Oe(t));null!==n&&Qu(n,0,t),bf(e,t)}}var kf=!0;function wf(e,t,n,r){var a=F.T;F.T=null;var l=R.p;try{R.p=2,jf(e,t,n,r)}finally{R.p=l,F.T=a}}function Sf(e,t,n,r){var a=F.T;F.T=null;var l=R.p;try{R.p=8,jf(e,t,n,r)}finally{R.p=l,F.T=a}}function jf(e,t,n,r){if(kf){var a=Ef(r);if(null===a)nd(e,t,r,$f,n),Lf(e,r);else if(function(e,t,n,r,a){switch(t){case"focusin":return Nf=Df(Nf,e,t,n,r,a),!0;case"dragenter":return Pf=Df(Pf,e,t,n,r,a),!0;case"mouseover":return Tf=Df(Tf,e,t,n,r,a),!0;case"pointerover":var l=a.pointerId;return Af.set(l,Df(Af.get(l)||null,e,t,n,r,a)),!0;case"gotpointercapture":return l=a.pointerId,Ff.set(l,Df(Ff.get(l)||null,e,t,n,r,a)),!0}return!1}(a,e,t,n,r))r.stopPropagation();else if(Lf(e,r),4&t&&-1<Of.indexOf(e)){for(;null!==a;){var l=Xe(a);if(null!==l)switch(l.tag){case 3:if((l=l.stateNode).current.memoizedState.isDehydrated){var i=$e(l.pendingLanes);if(0!==i){var o=l;for(o.pendingLanes|=2,o.entangledLanes|=2;i;){var s=1<<31-xe(i);o.entanglements[1]|=s,i&=~s}Oc(l),0===(6&hu)&&(Ru=se()+500,Lc(0,!1))}}break;case 31:case 13:null!==(o=Fr(l,2))&&Qu(o,0,2),ec(),bf(l,2)}if(null===(l=Ef(r))&&nd(e,t,r,$f,n),l===a)break;a=l}null!==a&&r.stopPropagation()}else nd(e,t,r,null,n)}}function Ef(e){return Cf(e=Ft(e))}var $f=null;function Cf(e){if($f=null,null!==(e=Ge(e))){var t=s(e);if(null===t)e=null;else{var n=t.tag;if(13===n){if(null!==(e=u(t)))return e;e=null}else if(31===n){if(null!==(e=c(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return $f=e,null}function zf(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ue()){case ce:return 2;case de:return 8;case fe:case pe:return 32;case he:return 268435456;default:return 32}default:return 32}}var _f=!1,Nf=null,Pf=null,Tf=null,Af=new Map,Ff=new Map,Rf=[],Of="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Lf(e,t){switch(e){case"focusin":case"focusout":Nf=null;break;case"dragenter":case"dragleave":Pf=null;break;case"mouseover":case"mouseout":Tf=null;break;case"pointerover":case"pointerout":Af.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ff.delete(t.pointerId)}}function Df(e,t,n,r,a,l){return null===e||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[a]},null!==t&&(null!==(t=Xe(t))&&yf(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function Mf(e){var t=Ge(e.target);if(null!==t){var n=s(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=u(n)))return e.blockedOn=t,void Me(e.priority,function(){xf(n)})}else if(31===t){if(null!==(t=c(n)))return e.blockedOn=t,void Me(e.priority,function(){xf(n)})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function If(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ef(e.nativeEvent);if(null!==n)return null!==(t=Xe(n))&&yf(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);At=r,n.target.dispatchEvent(r),At=null,t.shift()}return!0}function Hf(e,t,n){If(e)&&n.delete(t)}function Bf(){_f=!1,null!==Nf&&If(Nf)&&(Nf=null),null!==Pf&&If(Pf)&&(Pf=null),null!==Tf&&If(Tf)&&(Tf=null),Af.forEach(Hf),Ff.forEach(Hf)}function Vf(e,t){e.blockedOn===t&&(e.blockedOn=null,_f||(_f=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Bf)))}var Uf=null;function Wf(e){Uf!==e&&(Uf=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Uf===e&&(Uf=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],a=e[t+2];if("function"!==typeof r){if(null===Cf(r||n))continue;break}var l=Xe(n);null!==l&&(e.splice(t,3),t-=3,to(l,{pending:!0,data:a,method:n.method,action:r},r,a))}}))}function Kf(e){function t(t){return Vf(t,e)}null!==Nf&&Vf(Nf,e),null!==Pf&&Vf(Pf,e),null!==Tf&&Vf(Tf,e),Af.forEach(t),Ff.forEach(t);for(var n=0;n<Rf.length;n++){var r=Rf[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Rf.length&&null===(n=Rf[0]).blockedOn;)Mf(n),null===n.blockedOn&&Rf.shift();if(null!=(n=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<n.length;r+=3){var a=n[r],l=n[r+1],i=a[Be]||null;if("function"===typeof l)i||Wf(n);else if(i){var o=null;if(l&&l.hasAttribute("formAction")){if(a=l,i=l[Be]||null)o=i.formAction;else if(null!==Cf(a))continue}else o=i.action;"function"===typeof o?n[r+1]=o:(n.splice(r,3),r-=3),Wf(n)}}}function qf(){function e(e){e.canIntercept&&"react-transition"===e.info&&e.intercept({handler:function(){return new Promise(function(e){return a=e})},focusReset:"manual",scroll:"manual"})}function t(){null!==a&&(a(),a=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&null!=e.url&&navigation.navigate(e.url,{state:e.getState(),info:"react-transition",history:"replace"})}}if("object"===typeof navigation){var r=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),null!==a&&(a(),a=null)}}}function Yf(e){this._internalRoot=e}function Qf(e){this._internalRoot=e}Qf.prototype.render=Yf.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(i(409));gf(t.current,qu(),e,t,null,null)},Qf.prototype.unmount=Yf.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;gf(e.current,2,null,e,null,null),ec(),t[Ve]=null}},Qf.prototype.unstable_scheduleHydration=function(e){if(e){var t=De();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Rf.length&&0!==t&&t<Rf[n].priority;n++);Rf.splice(n,0,e),0===n&&Mf(e)}};var Gf=a.version;if("19.2.4"!==Gf)throw Error(i(527,Gf,"19.2.4"));R.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(i(188));throw e=Object.keys(e).join(","),Error(i(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=s(e)))throw Error(i(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(null===a)break;var l=a.alternate;if(null===l){if(null!==(r=a.return)){n=r;continue}break}if(a.child===l.child){for(l=a.child;l;){if(l===n)return d(a),e;if(l===r)return d(a),t;l=l.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=l;else{for(var o=!1,u=a.child;u;){if(u===n){o=!0,n=a,r=l;break}if(u===r){o=!0,r=a,n=l;break}u=u.sibling}if(!o){for(u=l.child;u;){if(u===n){o=!0,n=l,r=a;break}if(u===r){o=!0,r=l,n=a;break}u=u.sibling}if(!o)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(3!==n.tag)throw Error(i(188));return n.stateNode.current===n?e:t}(t),e=null===(e=null!==e?f(e):null)?null:e.stateNode};var Xf={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:F,reconcilerVersion:"19.2.4"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Jf=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jf.isDisabled&&Jf.supportsFiber)try{ve=Jf.inject(Xf),be=Jf}catch(ep){}}t.createRoot=function(e,t){if(!o(e))throw Error(i(299));var n=!1,r="",a=Eo,l=$o,s=Co;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onUncaughtError&&(a=t.onUncaughtError),void 0!==t.onCaughtError&&(l=t.onCaughtError),void 0!==t.onRecoverableError&&(s=t.onRecoverableError)),t=hf(e,1,!1,null,0,n,r,null,a,l,s,qf),e[Ve]=t.current,ed(e),new Yf(t)}},672(e,t,n){var r=n(43);function a(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var i={d:{f:l,r:function(){throw Error(a(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},o=Symbol.for("react.portal");var s=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(a(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:o,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,i.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&i.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var n=t.as,r=u(n,t.crossOrigin),a="string"===typeof t.integrity?t.integrity:void 0,l="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?i.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:l}):"script"===n&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:l,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&i.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else i.d.m(e)},t.requestFormReset=function(e){i.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},t.useFormStatus=function(){return s.H.useHostTransitionStatus()},t.version="19.2.4"},391(e,t,n){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(4)},950(e,t,n){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(672)},799(e,t){var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function a(e,t,r){var a=null;if(void 0!==r&&(a=""+r),void 0!==t.key&&(a=""+t.key),"key"in t)for(var l in r={},t)"key"!==l&&(r[l]=t[l]);else r=t;return t=r.ref,{$$typeof:n,type:e,key:a,ref:void 0!==t?t:null,props:r}}t.Fragment=r,t.jsx=a,t.jsxs=a},288(e,t){var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),o=Symbol.for("react.consumer"),s=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.for("react.activity"),h=Symbol.iterator;var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,v={};function b(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||m}function y(){}function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||m}b.prototype.isReactComponent={},b.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},b.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},y.prototype=b.prototype;var k=x.prototype=new y;k.constructor=x,g(k,b.prototype),k.isPureReactComponent=!0;var w=Array.isArray;function S(){}var j={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function $(e,t,r){var a=r.ref;return{$$typeof:n,type:e,key:t,ref:void 0!==a?a:null,props:r}}function C(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var z=/\/+/g;function _(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function N(e,t,a,l,i){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var s,u,c=!1;if(null===e)c=!0;else switch(o){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case n:case r:c=!0;break;case f:return N((c=e._init)(e._payload),t,a,l,i)}}if(c)return i=i(e),c=""===l?"."+_(e,0):l,w(i)?(a="",null!=c&&(a=c.replace(z,"$&/")+"/"),N(i,t,a,"",function(e){return e})):null!=i&&(C(i)&&(s=i,u=a+(null==i.key||e&&e.key===i.key?"":(""+i.key).replace(z,"$&/")+"/")+c,i=$(s.type,u,s.props)),t.push(i)),1;c=0;var d,p=""===l?".":l+":";if(w(e))for(var m=0;m<e.length;m++)c+=N(l=e[m],t,a,o=p+_(l,m),i);else if("function"===typeof(m=null===(d=e)||"object"!==typeof d?null:"function"===typeof(d=h&&d[h]||d["@@iterator"])?d:null))for(e=m.call(e),m=0;!(l=e.next()).done;)c+=N(l=l.value,t,a,o=p+_(l,m++),i);else if("object"===o){if("function"===typeof e.then)return N(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(S,S):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,a,l,i);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function P(e,t,n){if(null==e)return e;var r=[],a=0;return N(e,r,"","",function(e){return t.call(n,e,a++)}),r}function T(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var A="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},F={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!C(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};t.Activity=p,t.Children=F,t.Component=b,t.Fragment=a,t.Profiler=i,t.PureComponent=x,t.StrictMode=l,t.Suspense=c,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=j,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return j.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cacheSignal=function(){return null},t.cloneElement=function(e,t,n){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var r=g({},e.props),a=e.key;if(null!=t)for(l in void 0!==t.key&&(a=""+t.key),t)!E.call(t,l)||"key"===l||"__self"===l||"__source"===l||"ref"===l&&void 0===t.ref||(r[l]=t[l]);var l=arguments.length-2;if(1===l)r.children=n;else if(1<l){for(var i=Array(l),o=0;o<l;o++)i[o]=arguments[o+2];r.children=i}return $(e.type,a,r)},t.createContext=function(e){return(e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:o,_context:e},e},t.createElement=function(e,t,n){var r,a={},l=null;if(null!=t)for(r in void 0!==t.key&&(l=""+t.key),t)E.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(a[r]=t[r]);var i=arguments.length-2;if(1===i)a.children=n;else if(1<i){for(var o=Array(i),s=0;s<i;s++)o[s]=arguments[s+2];a.children=o}if(e&&e.defaultProps)for(r in i=e.defaultProps)void 0===a[r]&&(a[r]=i[r]);return $(e,l,a)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=C,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:T}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=j.T,n={};j.T=n;try{var r=e(),a=j.S;null!==a&&a(n,r),"object"===typeof r&&null!==r&&"function"===typeof r.then&&r.then(S,A)}catch(l){A(l)}finally{null!==t&&null!==n.types&&(t.types=n.types),j.T=t}},t.unstable_useCacheRefresh=function(){return j.H.useCacheRefresh()},t.use=function(e){return j.H.use(e)},t.useActionState=function(e,t,n){return j.H.useActionState(e,t,n)},t.useCallback=function(e,t){return j.H.useCallback(e,t)},t.useContext=function(e){return j.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return j.H.useDeferredValue(e,t)},t.useEffect=function(e,t){return j.H.useEffect(e,t)},t.useEffectEvent=function(e){return j.H.useEffectEvent(e)},t.useId=function(){return j.H.useId()},t.useImperativeHandle=function(e,t,n){return j.H.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return j.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return j.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return j.H.useMemo(e,t)},t.useOptimistic=function(e,t){return j.H.useOptimistic(e,t)},t.useReducer=function(e,t,n){return j.H.useReducer(e,t,n)},t.useRef=function(e){return j.H.useRef(e)},t.useState=function(e){return j.H.useState(e)},t.useSyncExternalStore=function(e,t,n){return j.H.useSyncExternalStore(e,t,n)},t.useTransition=function(){return j.H.useTransition()},t.version="19.2.4"},43(e,t,n){e.exports=n(288)},579(e,t,n){e.exports=n(799)},896(e,t){function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(!(0<l(a,t)))break e;e[r]=t,e[n]=a,n=r}}function r(e){return 0===e.length?null:e[0]}function a(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,i=a>>>1;r<i;){var o=2*(r+1)-1,s=e[o],u=o+1,c=e[u];if(0>l(s,n))u<a&&0>l(c,s)?(e[r]=c,e[u]=n,r=u):(e[r]=s,e[o]=n,r=o);else{if(!(u<a&&0>l(c,n)))break e;e[r]=c,e[u]=n,r=u}}}return t}function l(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}var u=[],c=[],d=1,f=null,p=3,h=!1,m=!1,g=!1,v=!1,b="function"===typeof setTimeout?setTimeout:null,y="function"===typeof clearTimeout?clearTimeout:null,x="undefined"!==typeof setImmediate?setImmediate:null;function k(e){for(var t=r(c);null!==t;){if(null===t.callback)a(c);else{if(!(t.startTime<=e))break;a(c),t.sortIndex=t.expirationTime,n(u,t)}t=r(c)}}function w(e){if(g=!1,k(e),!m)if(null!==r(u))m=!0,j||(j=!0,S());else{var t=r(c);null!==t&&T(w,t.startTime-e)}}var S,j=!1,E=-1,$=5,C=-1;function z(){return!!v||!(t.unstable_now()-C<$)}function _(){if(v=!1,j){var e=t.unstable_now();C=e;var n=!0;try{e:{m=!1,g&&(g=!1,y(E),E=-1),h=!0;var l=p;try{t:{for(k(e),f=r(u);null!==f&&!(f.expirationTime>e&&z());){var i=f.callback;if("function"===typeof i){f.callback=null,p=f.priorityLevel;var o=i(f.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof o){f.callback=o,k(e),n=!0;break t}f===r(u)&&a(u),k(e)}else a(u);f=r(u)}if(null!==f)n=!0;else{var s=r(c);null!==s&&T(w,s.startTime-e),n=!1}}break e}finally{f=null,p=l,h=!1}n=void 0}}finally{n?S():j=!1}}}if("function"===typeof x)S=function(){x(_)};else if("undefined"!==typeof MessageChannel){var N=new MessageChannel,P=N.port2;N.port1.onmessage=_,S=function(){P.postMessage(null)}}else S=function(){b(_,0)};function T(e,n){E=b(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var n=p;p=t;try{return e()}finally{p=n}},t.unstable_requestPaint=function(){v=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=p;p=e;try{return t()}finally{p=n}},t.unstable_scheduleCallback=function(e,a,l){var i=t.unstable_now();switch("object"===typeof l&&null!==l?l="number"===typeof(l=l.delay)&&0<l?i+l:i:l=i,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return e={id:d++,callback:a,priorityLevel:e,startTime:l,expirationTime:o=l+o,sortIndex:-1},l>i?(e.sortIndex=l,n(c,e),null===r(u)&&e===r(c)&&(g?(y(E),E=-1):g=!0,T(w,l-i))):(e.sortIndex=o,n(u,e),m||h||(m=!0,j||(j=!0,S()))),e},t.unstable_shouldYield=z,t.unstable_wrapCallback=function(e){var t=p;return function(){var n=p;p=t;try{return e.apply(this,arguments)}finally{p=n}}}},853(e,t,n){e.exports=n(896)}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var l=t[r]={exports:{}};return e[r](l,l.exports,n),l.exports}(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,a){if(1&a&&(r=this(r)),8&a)return r;if("object"===typeof r&&r){if(4&a&&r.__esModule)return r;if(16&a&&"function"===typeof r.then)return r}var l=Object.create(null);n.r(l);var i={};e=e||[null,t({}),t([]),t(t)];for(var o=2&a&&r;("object"==typeof o||"function"==typeof o)&&!~e.indexOf(o);o=t(o))Object.getOwnPropertyNames(o).forEach(e=>i[e]=()=>r[e]);return i.default=()=>r,n.d(l,i),l}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nc=void 0;var r=n(43),a=n.t(r,2),l=n(391),i="popstate";function o(e){return"object"===typeof e&&null!=e&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function s(){return m(function(e,t){let n=t.state?.masked,{pathname:r,search:a,hash:l}=n||e.location;return f("",{pathname:r,search:a,hash:l},t.state&&t.state.usr||null,t.state&&t.state.key||"default",n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)},function(e,t){return"string"===typeof t?t:p(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function u(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function c(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function d(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function f(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?h(t):t,state:n,key:t&&t.key||r||Math.random().toString(36).substring(2,10),unstable_mask:a}}function p(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function h(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function m(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:a=document.defaultView,v5Compat:l=!1}=r,s=a.history,u="POP",c=null,p=h();function h(){return(s.state||{idx:null}).idx}function m(){u="POP";let e=h(),t=null==e?null:e-p;p=e,c&&c({action:u,location:b.location,delta:t})}function v(e){return g(e)}null==p&&(p=0,s.replaceState({...s.state,idx:p},""));let b={get action(){return u},get location(){return e(a,s)},listen(e){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(i,m),c=e,()=>{a.removeEventListener(i,m),c=null}},createHref:e=>t(a,e),createURL:v,encodeLocation(e){let t=v(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){u="PUSH";let r=o(e)?e:f(b.location,e,t);n&&n(r,e),p=h()+1;let i=d(r,p),m=b.createHref(r.unstable_mask||r);try{s.pushState(i,"",m)}catch(g){if(g instanceof DOMException&&"DataCloneError"===g.name)throw g;a.location.assign(m)}l&&c&&c({action:u,location:b.location,delta:1})},replace:function(e,t){u="REPLACE";let r=o(e)?e:f(b.location,e,t);n&&n(r,e),p=h();let a=d(r,p),i=b.createHref(r.unstable_mask||r);s.replaceState(a,"",i),l&&c&&c({action:u,location:b.location,delta:0})},go:e=>s.go(e)};return b}function g(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="http://localhost";"undefined"!==typeof window&&(n="null"!==window.location.origin?window.location.origin:window.location.href),u(n,"No window.location.(origin|href) available to create URL");let r="string"===typeof e?e:p(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}new WeakMap;function v(e,t){return b(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function b(e,t,n,r){let a=A(("string"===typeof t?h(t):t).pathname||"/",n);if(null==a)return null;let l=y(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n]);return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(l);let i=null;for(let o=0;null==i&&o<l.length;++o){let e=T(a);i=_(l[o],e,r)}return i}function y(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],l=function(e,l){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,o=arguments.length>3?arguments[3]:void 0,s={relativePath:void 0===o?e.path||"":o,caseSensitive:!0===e.caseSensitive,childrenIndex:l,route:e};if(s.relativePath.startsWith("/")){if(!s.relativePath.startsWith(r)&&i)return;u(s.relativePath.startsWith(r),`Absolute route path "${s.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),s.relativePath=s.relativePath.slice(r.length)}let c=I([r,s.relativePath]),d=n.concat(s);e.children&&e.children.length>0&&(u(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${c}".`),y(e.children,t,d,c,i)),(null!=e.path||e.index)&&t.push({path:c,score:z(c,e.index),routesMeta:d})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let n of x(e.path))l(e,t,!0,n);else l(e,t)}),t}function x(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,a=n.endsWith("?"),l=n.replace(/\?$/,"");if(0===r.length)return a?[l,""]:[l];let i=x(r.join("/")),o=[];return o.push(...i.map(e=>""===e?l:[l,e].join("/"))),a&&o.push(...i),o.map(t=>e.startsWith("/")&&""===t?"/":t)}var k=/^:[\w-]+$/,w=3,S=2,j=1,E=10,$=-2,C=e=>"*"===e;function z(e,t){let n=e.split("/"),r=n.length;return n.some(C)&&(r+=$),t&&(r+=S),n.filter(e=>!C(e)).reduce((e,t)=>e+(k.test(t)?w:""===t?j:E),r)}function _(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:r}=e,a={},l="/",i=[];for(let o=0;o<r.length;++o){let e=r[o],s=o===r.length-1,u="/"===l?t:t.slice(l.length)||"/",c=N({path:e.relativePath,caseSensitive:e.caseSensitive,end:s},u),d=e.route;if(!c&&s&&n&&!r[r.length-1].route.index&&(c=N({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},u)),!c)return null;Object.assign(a,c.params),i.push({params:a,pathname:I([l,c.pathname]),pathnameBase:H(I([l,c.pathnameBase])),route:d}),"/"!==c.pathnameBase&&(l=I([l,c.pathnameBase]))}return i}function N(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=P(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let l=a[0],i=l.replace(/(.)\/+$/,"$1"),o=a.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:a}=t;if("*"===r){let e=o[n]||"";i=l.slice(0,l.length-e.length).replace(/(.)\/+$/,"$1")}const s=o[n];return e[r]=a&&!s?void 0:(s||"").replace(/%2F/g,"/"),e},{}),pathname:l,pathnameBase:i,pattern:e}}function P(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];c("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,n,a,l)=>{if(r.push({paramName:t,isOptional:null!=n}),n){let t=l.charAt(a+e.length);return t&&"/"!==t?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),a+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":""!==e&&"/"!==e&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function T(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return c(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function A(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}var F=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function R(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)}),n.length>1?n.join("/"):"/"}function O(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function L(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function D(e){let t=L(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function M(e,t,n){let r,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?r=h(e):(r={...e},u(!r.pathname||!r.pathname.includes("?"),O("?","pathname","search",r)),u(!r.pathname||!r.pathname.includes("#"),O("#","pathname","hash",r)),u(!r.search||!r.search.includes("#"),O("#","search","hash",r)));let l,i=""===e||""===r.pathname,o=i?"/":r.pathname;if(null==o)l=n;else{let e=t.length-1;if(!a&&o.startsWith("..")){let t=o.split("/");for(;".."===t[0];)t.shift(),e-=1;r.pathname=t.join("/")}l=e>=0?t[e]:"/"}let s=function(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:r,search:a="",hash:l=""}="string"===typeof e?h(e):e;return r?(r=r.replace(/\/\/+/g,"/"),t=r.startsWith("/")?R(r.substring(1),"/"):R(r,n)):t=n,{pathname:t,search:B(a),hash:V(l)}}(r,l),c=o&&"/"!==o&&o.endsWith("/"),d=(i||"."===o)&&n.endsWith("/");return s.pathname.endsWith("/")||!c&&!d||(s.pathname+="/"),s}var I=e=>e.join("/").replace(/\/\/+/g,"/"),H=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),B=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",V=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";var U=class{constructor(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function W(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}function K(e){return e.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var q="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;function Y(e,t){let n=e;if("string"!==typeof n||!F.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,a=!1;if(q)try{let e=new URL(window.location.href),r=n.startsWith("//")?new URL(e.protocol+n):new URL(n),l=A(r.pathname,t);r.origin===e.origin&&null!=l?n=l+r.search+r.hash:a=!0}catch(l){c(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:a,to:n}}Symbol("Uninstrumented");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Q=["POST","PUT","PATCH","DELETE"],G=(new Set(Q),["GET",...Q]);new Set(G),Symbol("ResetLoaderData");var X=r.createContext(null);X.displayName="DataRouter";var J=r.createContext(null);J.displayName="DataRouterState";var Z=r.createContext(!1);function ee(){return r.useContext(Z)}var te=r.createContext({isTransitioning:!1});te.displayName="ViewTransition";var ne=r.createContext(new Map);ne.displayName="Fetchers";var re=r.createContext(null);re.displayName="Await";var ae=r.createContext(null);ae.displayName="Navigation";var le=r.createContext(null);le.displayName="Location";var ie=r.createContext({outlet:null,matches:[],isDataRoute:!1});ie.displayName="Route";var oe=r.createContext(null);oe.displayName="RouteError";var se="REACT_ROUTER_ERROR";function ue(){return null!=r.useContext(le)}function ce(){return u(ue(),"useLocation() may be used only in the context of a <Router> component."),r.useContext(le).location}var de="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function fe(e){r.useContext(ae).static||r.useLayoutEffect(e)}function pe(){let{isDataRoute:e}=r.useContext(ie);return e?function(){let{router:e}=Ee("useNavigate"),t=Ce("useNavigate"),n=r.useRef(!1);fe(()=>{n.current=!0});let a=r.useCallback(async function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};c(n.current,de),n.current&&("number"===typeof r?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...a}))},[e,t]);return a}():function(){u(ue(),"useNavigate() may be used only in the context of a <Router> component.");let e=r.useContext(X),{basename:t,navigator:n}=r.useContext(ae),{matches:a}=r.useContext(ie),{pathname:l}=ce(),i=JSON.stringify(D(a)),o=r.useRef(!1);fe(()=>{o.current=!0});let s=r.useCallback(function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(c(o.current,de),!o.current)return;if("number"===typeof r)return void n.go(r);let s=M(r,JSON.parse(i),l,"path"===a.relative);null==e&&"/"!==t&&(s.pathname="/"===s.pathname?t:I([t,s.pathname])),(a.replace?n.replace:n.push)(s,a.state,a)},[t,n,i,l,e]);return s}()}r.createContext(null);function he(){let{matches:e}=r.useContext(ie),t=e[e.length-1];return t?t.params:{}}function me(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:n}=r.useContext(ie),{pathname:a}=ce(),l=JSON.stringify(D(n));return r.useMemo(()=>M(e,JSON.parse(l),a,"path"===t),[e,l,a,t])}function ge(e,t,n){u(ue(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=r.useContext(ae),{matches:l}=r.useContext(ie),i=l[l.length-1],o=i?i.params:{},s=i?i.pathname:"/",d=i?i.pathnameBase:"/",f=i&&i.route;{let e=f&&f.path||"";Ne(s,!f||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let p,m=ce();if(t){let e="string"===typeof t?h(t):t;u("/"===d||e.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${e.pathname}" was given in the \`location\` prop.`),p=e}else p=m;let g=p.pathname||"/",b=g;if("/"!==d){let e=d.replace(/^\//,"").split("/");b="/"+g.replace(/^\//,"").split("/").slice(e.length).join("/")}let y=v(e,{pathname:b});c(f||null!=y,`No routes matched location "${p.pathname}${p.search}${p.hash}" `),c(null==y||void 0!==y[y.length-1].route.element||void 0!==y[y.length-1].route.Component||void 0!==y[y.length-1].route.lazy,`Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let x=Se(y&&y.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:I([d,a.encodeLocation?a.encodeLocation(e.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?d:I([d,a.encodeLocation?a.encodeLocation(e.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathnameBase])})),l,n);return t&&x?r.createElement(le.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...p},navigationType:"POP"}},x):x}function ve(){let e=ze(),t=W(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:a},i={padding:"2px 4px",backgroundColor:a},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=r.createElement(r.Fragment,null,r.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),r.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",r.createElement("code",{style:i},"ErrorBoundary")," or"," ",r.createElement("code",{style:i},"errorElement")," prop on your route.")),r.createElement(r.Fragment,null,r.createElement("h2",null,"Unexpected Application Error!"),r.createElement("h3",{style:{fontStyle:"italic"}},t),n?r.createElement("pre",{style:l},n):null,o)}var be=r.createElement(ve,null),ye=class extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&"object"===typeof e&&e&&"digest"in e&&"string"===typeof e.digest){const t=function(e){if(e.startsWith(`${se}:ROUTE_ERROR_RESPONSE:{`))try{let t=JSON.parse(e.slice(40));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText)return new U(t.status,t.statusText,t.data)}catch{}}(e.digest);t&&(e=t)}let t=void 0!==e?r.createElement(ie.Provider,{value:this.props.routeContext},r.createElement(oe.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?r.createElement(ke,{error:e},t):t}};ye.contextType=Z;var xe=new WeakMap;function ke(e){let{children:t,error:n}=e,{basename:a}=r.useContext(ae);if("object"===typeof n&&n&&"digest"in n&&"string"===typeof n.digest){let e=function(e){if(e.startsWith(`${se}:REDIRECT:{`))try{let t=JSON.parse(e.slice(28));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText&&"string"===typeof t.location&&"boolean"===typeof t.reloadDocument&&"boolean"===typeof t.replace)return t}catch{}}(n.digest);if(e){let t=xe.get(n);if(t)throw t;let l=Y(e.location,a);if(q&&!xe.get(n)){if(!l.isExternal&&!e.reloadDocument){const t=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(l.to,{replace:e.replace}));throw xe.set(n,t),t}window.location.href=l.absoluteURL||l.to}return r.createElement("meta",{httpEquiv:"refresh",content:`0;url=${l.absoluteURL||l.to}`})}}return t}function we(e){let{routeContext:t,match:n,children:a}=e,l=r.useContext(X);return l&&l.static&&l.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=n.route.id),r.createElement(ie.Provider,{value:t},a)}function Se(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,a=n?.state;if(null==e){if(!a)return null;if(a.errors)e=a.matches;else{if(0!==t.length||a.initialized||!(a.matches.length>0))return null;e=a.matches}}let l=e,i=a?.errors;if(null!=i){let e=l.findIndex(e=>e.route.id&&void 0!==i?.[e.route.id]);u(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(i).join(",")}`),l=l.slice(0,Math.min(l.length,e+1))}let o=!1,s=-1;if(n&&a){o=a.renderFallback;for(let e=0;e<l.length;e++){let t=l[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:r}=a,i=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!r||void 0===r[t.route.id]);if(t.route.lazy||i){n.isStatic&&(o=!0),l=s>=0?l.slice(0,s+1):[l[0]];break}}}}let c=n?.onError,d=a&&c?(e,t)=>{c(e,{location:a.location,params:a.matches?.[0]?.params??{},unstable_pattern:K(a.matches),errorInfo:t})}:void 0;return l.reduceRight((e,n,u)=>{let c,f=!1,p=null,h=null;a&&(c=i&&n.route.id?i[n.route.id]:void 0,p=n.route.errorElement||be,o&&(s<0&&0===u?(Ne("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),f=!0,h=null):s===u&&(f=!0,h=n.route.hydrateFallbackElement||null)));let m=t.concat(l.slice(0,u+1)),g=()=>{let t;return t=c?p:f?h:n.route.Component?r.createElement(n.route.Component,null):n.route.element?n.route.element:e,r.createElement(we,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:null!=a},children:t})};return a&&(n.route.ErrorBoundary||n.route.errorElement||0===u)?r.createElement(ye,{location:a.location,revalidation:a.revalidation,component:p,error:c,children:g(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:d}):g()},null)}function je(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ee(e){let t=r.useContext(X);return u(t,je(e)),t}function $e(e){let t=r.useContext(J);return u(t,je(e)),t}function Ce(e){let t=function(e){let t=r.useContext(ie);return u(t,je(e)),t}(e),n=t.matches[t.matches.length-1];return u(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function ze(){let e=r.useContext(oe),t=$e("useRouteError"),n=Ce("useRouteError");return void 0!==e?e:t.errors?.[n]}var _e={};function Ne(e,t,n){t||_e[e]||(_e[e]=!0,c(!1,n))}var Pe={};function Te(e,t){e||Pe[t]||(Pe[t]=!0,console.warn(t))}a.useOptimistic;r.memo(Ae);function Ae(e){let{routes:t,future:n,state:r,isStatic:a,onError:l}=e;return ge(t,void 0,{state:r,isStatic:a,onError:l,future:n})}function Fe(e){let{to:t,replace:n,state:a,relative:l}=e;u(ue(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=r.useContext(ae);c(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:o}=r.useContext(ie),{pathname:s}=ce(),d=pe(),f=M(t,D(o),s,"path"===l),p=JSON.stringify(f);return r.useEffect(()=>{d(JSON.parse(p),{replace:n,state:a,relative:l})},[d,p,l,n,a]),null}function Re(e){u(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Oe(e){let{basename:t="/",children:n=null,location:a,navigationType:l="POP",navigator:i,static:o=!1,unstable_useTransitions:s}=e;u(!ue(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=t.replace(/^\/*/,"/"),f=r.useMemo(()=>({basename:d,navigator:i,static:o,unstable_useTransitions:s,future:{}}),[d,i,o,s]);"string"===typeof a&&(a=h(a));let{pathname:p="/",search:m="",hash:g="",state:v=null,key:b="default",unstable_mask:y}=a,x=r.useMemo(()=>{let e=A(p,d);return null==e?null:{location:{pathname:e,search:m,hash:g,state:v,key:b,unstable_mask:y},navigationType:l}},[d,p,m,g,v,b,l,y]);return c(null!=x,`<Router basename="${d}"> is not able to match the URL "${p}${m}${g}" because it does not start with the basename, so the <Router> won't render anything.`),null==x?null:r.createElement(ae.Provider,{value:f},r.createElement(le.Provider,{children:n,value:x}))}function Le(e){let{children:t,location:n}=e;return ge(De(t),n)}r.Component;function De(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[];return r.Children.forEach(e,(e,a)=>{if(!r.isValidElement(e))return;let l=[...t,a];if(e.type===r.Fragment)return void n.push.apply(n,De(e.props.children,l));u(e.type===Re,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),u(!e.props.index||!e.props.children,"An index route cannot have child routes.");let i={id:e.props.id||l.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(i.children=De(e.props.children,l)),n.push(i)}),n}var Me="get",Ie="application/x-www-form-urlencoded";function He(e){return"undefined"!==typeof HTMLElement&&e instanceof HTMLElement}var Be=null;var Ve=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ue(e){return null==e||Ve.has(e)?e:(c(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ie}"`),null)}function We(e,t){let n,r,a,l,i;if(He(o=e)&&"form"===o.tagName.toLowerCase()){let i=e.getAttribute("action");r=i?A(i,t):null,n=e.getAttribute("method")||Me,a=Ue(e.getAttribute("enctype"))||Ie,l=new FormData(e)}else if(function(e){return He(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return He(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let i=e.form;if(null==i)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let o=e.getAttribute("formaction")||i.getAttribute("action");if(r=o?A(o,t):null,n=e.getAttribute("formmethod")||i.getAttribute("method")||Me,a=Ue(e.getAttribute("formenctype"))||Ue(i.getAttribute("enctype"))||Ie,l=new FormData(i,e),!function(){if(null===Be)try{new FormData(document.createElement("form"),0),Be=!1}catch(e){Be=!0}return Be}()){let{name:t,type:n,value:r}=e;if("image"===n){let e=t?`${t}.`:"";l.append(`${e}x`,"0"),l.append(`${e}y`,"0")}else t&&l.append(t,r)}}else{if(He(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Me,r=null,a=Ie,i=e}var o;return l&&"text/plain"===a&&(i=l,l=void 0),{action:r,method:n.toLowerCase(),encType:a,formData:l,body:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;function Ke(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}Symbol("SingleFetchRedirect");function qe(e,t,n,r){let a="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return n?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${r}`:a.pathname=`${a.pathname}.${r}`:"/"===a.pathname?a.pathname=`_root.${r}`:t&&"/"===A(a.pathname,t)?a.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${r}`,a}async function Ye(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Qe(e){return null!=e&&"string"===typeof e.page}function Ge(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Xe(e,t,n,r,a,l){let i=(e,t)=>!n[t]||e.route.id!==n[t].route.id,o=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith("*")&&n[t].params["*"]!==e.params["*"];return"assets"===l?t.filter((e,t)=>i(e,t)||o(e,t)):"data"===l?t.filter((t,l)=>{let s=r.routes[t.route.id];if(!s||!s.hasLoader)return!1;if(i(t,l)||o(t,l))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof r)return r}return!0}):[]}function Je(e,t){let{includeHydrateFallback:n}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r=e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let a=[r.module];return r.clientActionModule&&(a=a.concat(r.clientActionModule)),r.clientLoaderModule&&(a=a.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(a=a.concat(r.hydrateFallbackModule)),r.imports&&(a=a.concat(r.imports)),a}).flat(1),[...new Set(r)];var r}function Ze(e,t){let n=new Set,r=new Set(t);return e.reduce((e,a)=>{if(t&&!Qe(a)&&"script"===a.as&&a.href&&r.has(a.href))return e;let l=JSON.stringify(function(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}(a));return n.has(l)||(n.add(l),e.push({key:l,link:a})),e},[])}function et(e,t){return"lazy"===e.mode&&!0===t}function tt(){let e=r.useContext(X);return Ke(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function nt(){let e=r.useContext(J);return Ke(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var rt=r.createContext(void 0);function at(){let e=r.useContext(rt);return Ke(e,"You must render this element inside a <HydratedRouter> element"),e}function lt(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function it(e,t,n){if(n&&!ct)return[e[0]];if(t){let n=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,n+1)}return e}rt.displayName="FrameworkContext";function ot(e){let{page:t,...n}=e,{router:a}=tt(),l=r.useMemo(()=>v(a.routes,t,a.basename),[a.routes,t,a.basename]);return l?r.createElement(ut,{page:t,matches:l,...n}):null}function st(e){let{manifest:t,routeModules:n}=at(),[a,l]=r.useState([]);return r.useEffect(()=>{let r=!1;return async function(e,t,n){let r=await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Ye(r,n);return e.links?e.links():[]}return[]}));return Ze(r.flat(1).filter(Ge).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,n).then(e=>{r||l(e)}),()=>{r=!0}},[e,t,n]),a}function ut(e){let{page:t,matches:n,...a}=e,l=ce(),{future:i,manifest:o,routeModules:s}=at(),{basename:u}=tt(),{loaderData:c,matches:d}=nt(),f=r.useMemo(()=>Xe(t,n,d,o,l,"data"),[t,n,d,o,l]),p=r.useMemo(()=>Xe(t,n,d,o,l,"assets"),[t,n,d,o,l]),h=r.useMemo(()=>{if(t===l.pathname+l.search+l.hash)return[];let e=new Set,r=!1;if(n.forEach(t=>{let n=o.routes[t.route.id];n&&n.hasLoader&&(!f.some(e=>e.route.id===t.route.id)&&t.route.id in c&&s[t.route.id]?.shouldRevalidate||n.hasClientLoader?r=!0:e.add(t.route.id))}),0===e.size)return[];let a=qe(t,u,i.unstable_trailingSlashAwareDataRequests,"data");return r&&e.size>0&&a.searchParams.set("_routes",n.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[a.pathname+a.search]},[u,i.unstable_trailingSlashAwareDataRequests,c,l,o,f,n,t,s]),m=r.useMemo(()=>Je(p,o),[p,o]),g=st(p);return r.createElement(r.Fragment,null,h.map(e=>r.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...a})),m.map(e=>r.createElement("link",{key:e,rel:"modulepreload",href:e,...a})),g.map(e=>{let{key:t,link:n}=e;return r.createElement("link",{key:t,nonce:a.nonce,...n,crossOrigin:n.crossOrigin??a.crossOrigin})}))}var ct=!1;function dt(e){let{manifest:t,serverHandoffString:n,isSpaMode:a,renderMeta:l,routeDiscovery:i,ssr:o}=at(),{router:s,static:u,staticContext:c}=tt(),{matches:d}=nt(),f=ee(),p=et(i,o);l&&(l.didRenderScripts=!0);let h=it(d,null,a);r.useEffect(()=>{ct=!0},[]);let m=r.useMemo(()=>{if(f)return null;let a=c?`window.__reactRouterContext = ${n};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",l=u?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${p?"":`import ${JSON.stringify(t.url)}`};\n${h.map((e,n)=>{let r=`route${n}`,a=t.routes[e.route.id];Ke(a,`Route ${e.route.id} not found in manifest`);let{clientActionModule:l,clientLoaderModule:i,clientMiddlewareModule:o,hydrateFallbackModule:s,module:u}=a,c=[...l?[{module:l,varName:`${r}_clientAction`}]:[],...i?[{module:i,varName:`${r}_clientLoader`}]:[],...o?[{module:o,varName:`${r}_clientMiddleware`}]:[],...s?[{module:s,varName:`${r}_HydrateFallback`}]:[],{module:u,varName:`${r}_main`}];return 1===c.length?`import * as ${r} from ${JSON.stringify(u)};`:[c.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${r} = {${c.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${p?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:n,...r}=e,a=new Set(t.state.matches.map(e=>e.route.id)),l=t.state.location.pathname.split("/").filter(Boolean),i=["/"];for(l.pop();l.length>0;)i.push(`/${l.join("/")}`),l.pop();i.forEach(e=>{let n=v(t.routes,e,t.basename);n&&n.forEach(e=>a.add(e.route.id))});let o=[...a].reduce((e,t)=>Object.assign(e,{[t]:r.routes[t]}),{});return{...r,routes:o,sri:!!n||void 0}}(t,s),null,2)};`:""}\n  window.__reactRouterRouteModules = {${h.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return r.createElement(r.Fragment,null,r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:a},type:void 0}),r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:l},type:"module",async:!0}))},[]),g=ct||f?[]:(b=t.entry.imports.concat(Je(h,t,{includeHydrateFallback:!0})),[...new Set(b)]);var b;let y="object"===typeof t.sri?t.sri:{};return Te(!f,"The <Scripts /> element is a no-op when using RSC and can be safely removed."),ct||f?null:r.createElement(r.Fragment,null,"object"===typeof t.sri?r.createElement("script",{...e,"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:y})}}):null,p?null:r.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:y[t.url],suppressHydrationWarning:!0}),r.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:y[t.entry.module],suppressHydrationWarning:!0}),g.map(t=>r.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:y[t],suppressHydrationWarning:!0})),m)}function ft(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}r.Component;function pt(e){let{error:t,isOutsideRemixApp:n}=e;console.error(t);let a,l=r.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(W(t))return r.createElement(ht,{title:"Unhandled Thrown Response!"},r.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),l);if(t instanceof Error)a=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);a=new Error(e)}return r.createElement(ht,{title:"Application Error!",isOutsideRemixApp:n},r.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),r.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},a.stack),l)}function ht(e){let{title:t,renderScripts:n,isOutsideRemixApp:a,children:l}=e,{routeModules:i}=at();return i.root?.Layout&&!a?l:r.createElement("html",{lang:"en"},r.createElement("head",null,r.createElement("meta",{charSet:"utf-8"}),r.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),r.createElement("title",null,t)),r.createElement("body",null,r.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},l,n?r.createElement(dt,null):null)))}var mt="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{mt&&(window.__reactRouterVersion="7.13.2")}catch(_o){}function gt(e){let{basename:t,children:n,unstable_useTransitions:a,window:l}=e,i=r.useRef();null==i.current&&(i.current=s({window:l,v5Compat:!0}));let o=i.current,[u,c]=r.useState({action:o.action,location:o.location}),d=r.useCallback(e=>{!1===a?c(e):r.startTransition(()=>c(e))},[a]);return r.useLayoutEffect(()=>o.listen(d),[o,d]),r.createElement(Oe,{basename:t,children:n,location:u.location,navigationType:u.action,navigator:o,unstable_useTransitions:a})}var vt=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,bt=r.forwardRef(function(e,t){let{onClick:n,discover:a="render",prefetch:l="none",relative:i,reloadDocument:o,replace:s,unstable_mask:c,state:d,target:f,to:h,preventScrollReset:m,viewTransition:g,unstable_defaultShouldRevalidate:v,...b}=e,{basename:y,navigator:x,unstable_useTransitions:k}=r.useContext(ae),w="string"===typeof h&&vt.test(h),S=Y(h,y);h=S.to;let j=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};u(ue(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=r.useContext(ae),{hash:l,pathname:i,search:o}=me(e,{relative:t}),s=i;return"/"!==n&&(s="/"===i?n:I([n,i])),a.createHref({pathname:s,search:o,hash:l})}(h,{relative:i}),E=ce(),$=null;if(c){let e=M(c,[],E.unstable_mask?E.unstable_mask.pathname:"/",!0);"/"!==y&&(e.pathname="/"===e.pathname?y:I([y,e.pathname])),$=x.createHref(e)}let[C,z,_]=function(e,t){let n=r.useContext(rt),[a,l]=r.useState(!1),[i,o]=r.useState(!1),{onFocus:s,onBlur:u,onMouseEnter:c,onMouseLeave:d,onTouchStart:f}=t,p=r.useRef(null);r.useEffect(()=>{if("render"===e&&o(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return p.current&&e.observe(p.current),()=>{e.disconnect()}}},[e]),r.useEffect(()=>{if(a){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[a]);let h=()=>{l(!0)},m=()=>{l(!1),o(!1)};return n?"intent"!==e?[i,p,{}]:[i,p,{onFocus:lt(s,h),onBlur:lt(u,m),onMouseEnter:lt(c,h),onMouseLeave:lt(d,m),onTouchStart:lt(f,h)}]:[!1,p,{}]}(l,b),N=function(e){let{target:t,replace:n,unstable_mask:a,state:l,preventScrollReset:i,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:u,unstable_useTransitions:c}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=pe(),f=ce(),h=me(e,{relative:o});return r.useCallback(m=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(m,t)){m.preventDefault();let t=void 0!==n?n:p(f)===p(h),g=()=>d(e,{replace:t,unstable_mask:a,state:l,preventScrollReset:i,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:u});c?r.startTransition(()=>g()):g()}},[f,d,h,n,a,l,t,e,i,o,s,u,c])}(h,{replace:s,unstable_mask:c,state:d,target:f,preventScrollReset:m,relative:i,viewTransition:g,unstable_defaultShouldRevalidate:v,unstable_useTransitions:k});let P=!(S.isExternal||o),T=r.createElement("a",{...b,..._,href:(P?$:void 0)||S.absoluteURL||j,onClick:P?function(e){n&&n(e),e.defaultPrevented||N(e)}:n,ref:ft(t,z),target:f,"data-discover":w||"render"!==a?void 0:"true"});return C&&!w?r.createElement(r.Fragment,null,T,r.createElement(ot,{page:j})):T});bt.displayName="Link",r.forwardRef(function(e,t){let{"aria-current":n="page",caseSensitive:a=!1,className:l="",end:i=!1,style:o,to:s,viewTransition:c,children:d,...f}=e,p=me(s,{relative:f.relative}),h=ce(),m=r.useContext(J),{navigator:g,basename:v}=r.useContext(ae),b=null!=m&&function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.useContext(te);u(null!=n,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=kt("useViewTransitionState"),l=me(e,{relative:t});if(!n.isTransitioning)return!1;let i=A(n.currentLocation.pathname,a)||n.currentLocation.pathname,o=A(n.nextLocation.pathname,a)||n.nextLocation.pathname;return null!=N(l.pathname,o)||null!=N(l.pathname,i)}(p)&&!0===c,y=g.encodeLocation?g.encodeLocation(p).pathname:p.pathname,x=h.pathname,k=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;a||(x=x.toLowerCase(),k=k?k.toLowerCase():null,y=y.toLowerCase()),k&&v&&(k=A(k,v)||k);const w="/"!==y&&y.endsWith("/")?y.length-1:y.length;let S,j=x===y||!i&&x.startsWith(y)&&"/"===x.charAt(w),E=null!=k&&(k===y||!i&&k.startsWith(y)&&"/"===k.charAt(y.length)),$={isActive:j,isPending:E,isTransitioning:b},C=j?n:void 0;S="function"===typeof l?l($):[l,j?"active":null,E?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let z="function"===typeof o?o($):o;return r.createElement(bt,{...f,"aria-current":C,className:S,ref:t,style:z,to:s,viewTransition:c},"function"===typeof d?d($):d)}).displayName="NavLink";var yt=r.forwardRef((e,t)=>{let{discover:n="render",fetcherKey:a,navigate:l,reloadDocument:i,replace:o,state:s,method:c=Me,action:d,onSubmit:f,relative:h,preventScrollReset:m,viewTransition:g,unstable_defaultShouldRevalidate:v,...b}=e,{unstable_useTransitions:y}=r.useContext(ae),x=jt(),k=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:n}=r.useContext(ae),a=r.useContext(ie);u(a,"useFormAction must be used inside a RouteContext");let[l]=a.matches.slice(-1),i={...me(e||".",{relative:t})},o=ce();if(null==e){i.search=o.search;let e=new URLSearchParams(i.search),t=e.getAll("index"),n=t.some(e=>""===e);if(n){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let n=e.toString();i.search=n?`?${n}`:""}}e&&"."!==e||!l.route.index||(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index");"/"!==n&&(i.pathname="/"===i.pathname?n:I([n,i.pathname]));return p(i)}(d,{relative:h}),w="get"===c.toLowerCase()?"get":"post",S="string"===typeof d&&vt.test(d);return r.createElement("form",{ref:t,method:w,action:k,onSubmit:i?f:e=>{if(f&&f(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,n=t?.getAttribute("formmethod")||c,i=()=>x(t||e.currentTarget,{fetcherKey:a,method:n,navigate:l,replace:o,state:s,relative:h,preventScrollReset:m,viewTransition:g,unstable_defaultShouldRevalidate:v});y&&!1!==l?r.startTransition(()=>i()):i()},...b,"data-discover":S||"render"!==n?void 0:"true"})});function xt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function kt(e){let t=r.useContext(X);return u(t,xt(e)),t}yt.displayName="Form";var wt=0,St=()=>`__${String(++wt)}__`;function jt(){let{router:e}=kt("useSubmit"),{basename:t}=r.useContext(ae),n=Ce("useRouteId"),a=e.fetch,l=e.navigate;return r.useCallback(async function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:i,method:o,encType:s,formData:u,body:c}=We(e,t);if(!1===r.navigate){let e=r.fetcherKey||St();await a(e,n,r.action||i,{unstable_defaultShouldRevalidate:r.unstable_defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:u,body:c,formMethod:r.method||o,formEncType:r.encType||s,flushSync:r.flushSync})}else await l(r.action||i,{unstable_defaultShouldRevalidate:r.unstable_defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:u,body:c,formMethod:r.method||o,formEncType:r.encType||s,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[a,l,t,n])}var Et=function(){return Et=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},Et.apply(this,arguments)};Object.create;function $t(e,t,n){if(n||2===arguments.length)for(var r,a=0,l=t.length;a<l;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var Ct={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},zt="-ms-",_t="-moz-",Nt="-webkit-",Pt="comm",Tt="rule",At="decl",Ft="@keyframes",Rt=Math.abs,Ot=String.fromCharCode,Lt=Object.assign;function Dt(e){return e.trim()}function Mt(e,t){return(e=t.exec(e))?e[0]:e}function It(e,t,n){return e.replace(t,n)}function Ht(e,t,n){return e.indexOf(t,n)}function Bt(e,t){return 0|e.charCodeAt(t)}function Vt(e,t,n){return e.slice(t,n)}function Ut(e){return e.length}function Wt(e){return e.length}function Kt(e,t){return t.push(e),e}function qt(e,t){return e.filter(function(e){return!Mt(e,t)})}var Yt=1,Qt=1,Gt=0,Xt=0,Jt=0,Zt="";function en(e,t,n,r,a,l,i,o){return{value:e,root:t,parent:n,type:r,props:a,children:l,line:Yt,column:Qt,length:i,return:"",siblings:o}}function tn(e,t){return Lt(en("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function nn(e){for(;e.root;)e=tn(e.root,{children:[e]});Kt(e,e.siblings)}function rn(){return Jt=Xt>0?Bt(Zt,--Xt):0,Qt--,10===Jt&&(Qt=1,Yt--),Jt}function an(){return Jt=Xt<Gt?Bt(Zt,Xt++):0,Qt++,10===Jt&&(Qt=1,Yt++),Jt}function ln(){return Bt(Zt,Xt)}function on(){return Xt}function sn(e,t){return Vt(Zt,e,t)}function un(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function cn(e){return Yt=Qt=1,Gt=Ut(Zt=e),Xt=0,[]}function dn(e){return Zt="",e}function fn(e){return Dt(sn(Xt-1,mn(91===e?e+2:40===e?e+1:e)))}function pn(e){for(;(Jt=ln())&&Jt<33;)an();return un(e)>2||un(Jt)>3?"":" "}function hn(e,t){for(;--t&&an()&&!(Jt<48||Jt>102||Jt>57&&Jt<65||Jt>70&&Jt<97););return sn(e,on()+(t<6&&32==ln()&&32==an()))}function mn(e){for(;an();)switch(Jt){case e:return Xt;case 34:case 39:34!==e&&39!==e&&mn(Jt);break;case 40:41===e&&mn(e);break;case 92:an()}return Xt}function gn(e,t){for(;an()&&e+Jt!==57&&(e+Jt!==84||47!==ln()););return"/*"+sn(t,Xt-1)+"*"+Ot(47===e?e:an())}function vn(e){for(;!un(ln());)an();return sn(e,Xt)}function bn(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function yn(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case"@namespace":case At:return e.return=e.return||e.value;case Pt:return"";case Ft:return e.return=e.value+"{"+bn(e.children,r)+"}";case Tt:if(!Ut(e.value=e.props.join(",")))return""}return Ut(n=bn(e.children,r))?e.return=e.value+"{"+n+"}":""}function xn(e,t,n){switch(function(e,t){return 45^Bt(e,0)?(((t<<2^Bt(e,0))<<2^Bt(e,1))<<2^Bt(e,2))<<2^Bt(e,3):0}(e,t)){case 5103:return Nt+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Nt+e+e;case 4855:return Nt+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return _t+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Nt+e+_t+e+zt+e+e;case 5936:switch(Bt(e,t+11)){case 114:return Nt+e+zt+It(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Nt+e+zt+It(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Nt+e+zt+It(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Nt+e+zt+e+e;case 6165:return Nt+e+zt+"flex-"+e+e;case 5187:return Nt+e+It(e,/(\w+).+(:[^]+)/,Nt+"box-$1$2"+zt+"flex-$1$2")+e;case 5443:return Nt+e+zt+"flex-item-"+It(e,/flex-|-self/g,"")+(Mt(e,/flex-|baseline/)?"":zt+"grid-row-"+It(e,/flex-|-self/g,""))+e;case 4675:return Nt+e+zt+"flex-line-pack"+It(e,/align-content|flex-|-self/g,"")+e;case 5548:return Nt+e+zt+It(e,"shrink","negative")+e;case 5292:return Nt+e+zt+It(e,"basis","preferred-size")+e;case 6060:return Nt+"box-"+It(e,"-grow","")+Nt+e+zt+It(e,"grow","positive")+e;case 4554:return Nt+It(e,/([^-])(transform)/g,"$1"+Nt+"$2")+e;case 6187:return It(It(It(e,/(zoom-|grab)/,Nt+"$1"),/(image-set)/,Nt+"$1"),e,"")+e;case 5495:case 3959:return It(e,/(image-set\([^]*)/,Nt+"$1$`$1");case 4968:return It(It(e,/(.+:)(flex-)?(.*)/,Nt+"box-pack:$3"+zt+"flex-pack:$3"),/space-between/,"justify")+Nt+e+e;case 4200:if(!Mt(e,/flex-|baseline/))return zt+"grid-column-align"+Vt(e,t)+e;break;case 2592:case 3360:return zt+It(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Mt(e.props,/grid-\w+-end/)})?~Ht(e+(n=n[t].value),"span",0)?e:zt+It(e,"-start","")+e+zt+"grid-row-span:"+(~Ht(n,"span",0)?Mt(n,/\d+/):+Mt(n,/\d+/)-+Mt(e,/\d+/))+";":zt+It(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return Mt(e.props,/grid-\w+-start/)})?e:zt+It(It(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return It(e,/(.+)-inline(.+)/,Nt+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Ut(e)-1-t>6)switch(Bt(e,t+1)){case 109:if(45!==Bt(e,t+4))break;case 102:return It(e,/(.+:)(.+)-([^]+)/,"$1"+Nt+"$2-$3$1"+_t+(108==Bt(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Ht(e,"stretch",0)?xn(It(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return It(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,a,l,i,o){return zt+n+":"+r+o+(a?zt+n+"-span:"+(l?i:+i-+r)+o:"")+e});case 4949:if(121===Bt(e,t+6))return It(e,":",":"+Nt)+e;break;case 6444:switch(Bt(e,45===Bt(e,14)?18:11)){case 120:return It(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Nt+(45===Bt(e,14)?"inline-":"")+"box$3$1"+Nt+"$2$3$1"+zt+"$2box$3")+e;case 100:return It(e,":",":"+zt)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return It(e,"scroll-","scroll-snap-")+e}return e}function kn(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case At:return void(e.return=xn(e.value,e.length,n));case Ft:return bn([tn(e,{value:It(e.value,"@","@"+Nt)})],r);case Tt:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(Mt(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":nn(tn(e,{props:[It(t,/:(read-\w+)/,":-moz-$1")]})),nn(tn(e,{props:[t]})),Lt(e,{props:qt(n,r)});break;case"::placeholder":nn(tn(e,{props:[It(t,/:(plac\w+)/,":"+Nt+"input-$1")]})),nn(tn(e,{props:[It(t,/:(plac\w+)/,":-moz-$1")]})),nn(tn(e,{props:[It(t,/:(plac\w+)/,zt+"input-$1")]})),nn(tn(e,{props:[t]})),Lt(e,{props:qt(n,r)})}return""})}}function wn(e){return dn(Sn("",null,null,null,[""],e=cn(e),0,[0],e))}function Sn(e,t,n,r,a,l,i,o,s){for(var u=0,c=0,d=i,f=0,p=0,h=0,m=1,g=1,v=1,b=0,y="",x=a,k=l,w=r,S=y;g;)switch(h=b,b=an()){case 40:if(108!=h&&58==Bt(S,d-1)){-1!=Ht(S+=It(fn(b),"&","&\f"),"&\f",Rt(u?o[u-1]:0))&&(v=-1);break}case 34:case 39:case 91:S+=fn(b);break;case 9:case 10:case 13:case 32:S+=pn(h);break;case 92:S+=hn(on()-1,7);continue;case 47:switch(ln()){case 42:case 47:Kt(En(gn(an(),on()),t,n,s),s),5!=un(h||1)&&5!=un(ln()||1)||!Ut(S)||" "===Vt(S,-1,void 0)||(S+=" ");break;default:S+="/"}break;case 123*m:o[u++]=Ut(S)*v;case 125*m:case 59:case 0:switch(b){case 0:case 125:g=0;case 59+c:-1==v&&(S=It(S,/\f/g,"")),p>0&&(Ut(S)-d||0===m&&47===h)&&Kt(p>32?$n(S+";",r,n,d-1,s):$n(It(S," ","")+";",r,n,d-2,s),s);break;case 59:S+=";";default:if(Kt(w=jn(S,t,n,u,c,a,o,y,x=[],k=[],d,l),l),123===b)if(0===c)Sn(S,t,w,w,x,l,d,o,k);else{switch(f){case 99:if(110===Bt(S,3))break;case 108:if(97===Bt(S,2))break;default:c=0;case 100:case 109:case 115:}c?Sn(e,w,w,r&&Kt(jn(e,w,w,0,0,a,o,y,a,x=[],d,k),k),a,k,d,o,r?x:k):Sn(S,w,w,w,[""],k,0,o,k)}}u=c=p=0,m=v=1,y=S="",d=i;break;case 58:d=1+Ut(S),p=h;default:if(m<1)if(123==b)--m;else if(125==b&&0==m++&&125==rn())continue;switch(S+=Ot(b),b*m){case 38:v=c>0?1:(S+="\f",-1);break;case 44:o[u++]=(Ut(S)-1)*v,v=1;break;case 64:45===ln()&&(S+=fn(an())),f=ln(),c=d=Ut(y=S+=vn(on())),b++;break;case 45:45===h&&2==Ut(S)&&(m=0)}}return l}function jn(e,t,n,r,a,l,i,o,s,u,c,d){for(var f=a-1,p=0===a?l:[""],h=Wt(p),m=0,g=0,v=0;m<r;++m)for(var b=0,y=Vt(e,f+1,f=Rt(g=i[m])),x=e;b<h;++b)(x=Dt(g>0?p[b]+" "+y:It(y,/&\f/g,p[b])))&&(s[v++]=x);return en(e,t,n,0===a?Tt:o,s,u,c,d)}function En(e,t,n,r){return en(e,t,n,Pt,Ot(Jt),Vt(e,2,-2),0,r)}function $n(e,t,n,r,a){return en(e,t,n,At,Vt(e,0,r),Vt(e,r+1,-1),r,a)}var Cn="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",zn="active",_n="data-styled-version",Nn="6.3.12",Pn="/*!sc*/\n",Tn="undefined"!=typeof window&&"undefined"!=typeof document,An=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),Fn={};function Rn(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var On=new Map,Ln=new Map,Dn=1,Mn=function(e){if(On.has(e))return On.get(e);for(;Ln.has(Dn);)Dn++;var t=Dn++;return On.set(e,t),Ln.set(t,e),t},In=function(e,t){Dn=t+1,On.set(e,t),Ln.set(t,e)},Hn=(new Set,Object.freeze([])),Bn=Object.freeze({});function Vn(e,t,n){return void 0===n&&(n=Bn),e.theme!==n.theme&&e.theme||t||n.theme}var Un=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),Wn=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Kn=/(^-|-$)/g;function qn(e){return e.replace(Wn,"-").replace(Kn,"")}var Yn=/(a)(d)/gi,Qn=function(e){return String.fromCharCode(e+(e>25?39:97))};function Gn(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Qn(t%52)+n;return(Qn(t%52)+n).replace(Yn,"$1-$2")}var Xn,Jn=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Zn=function(e){return Jn(5381,e)};function er(e){return Gn(Zn(e)>>>0)}function tr(e){return e.displayName||e.name||"Component"}function nr(e){return"string"==typeof e&&!0}var rr="function"==typeof Symbol&&Symbol.for,ar=rr?Symbol.for("react.memo"):60115,lr=rr?Symbol.for("react.forward_ref"):60112,ir={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},or={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},sr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ur=((Xn={})[lr]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Xn[ar]=sr,Xn);function cr(e){return("type"in(t=e)&&t.type.$$typeof)===ar?sr:"$$typeof"in e?ur[e.$$typeof]:ir;var t}var dr=Object.defineProperty,fr=Object.getOwnPropertyNames,pr=Object.getOwnPropertySymbols,hr=Object.getOwnPropertyDescriptor,mr=Object.getPrototypeOf,gr=Object.prototype;function vr(e,t,n){if("string"!=typeof t){if(gr){var r=mr(t);r&&r!==gr&&vr(e,r,n)}var a=fr(t);pr&&(a=a.concat(pr(t)));for(var l=cr(e),i=cr(t),o=0;o<a.length;++o){var s=a[o];if(!(s in or||n&&n[s]||i&&s in i||l&&s in l)){var u=hr(t,s);try{dr(e,s,u)}catch(e){}}}}return e}function br(e){return"function"==typeof e}function yr(e){return"object"==typeof e&&"styledComponentId"in e}function xr(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function kr(e,t){return e.join(t||"")}function wr(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Sr(e,t,n){if(void 0===n&&(n=!1),!n&&!wr(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Sr(e[r],t[r]);else if(wr(t))for(var r in t)e[r]=Sr(e[r],t[r]);return e}function jr(e,t){Object.defineProperty(e,"toString",{value:t})}var Er=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,a=r;e>=a;)if((a<<=1)<0)throw Rn(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var l=r;l<a;l++)this.groupSizes[l]=0}for(var i=this.indexOfGroup(e+1),o=0,s=(l=0,t.length);l<s;l++)this.tag.insertRule(i,t[l])&&(this.groupSizes[e]++,i++,o++);o>0&&this._cGroup>e&&(this._cIndex+=o)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var a=n;a<r;a++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),a=r+n,l=r;l<a;l++)t+=this.tag.getRule(l)+Pn;return t},e}(),$r="style[".concat(Cn,"][").concat(_n,'="').concat(Nn,'"]'),Cr=new RegExp("^".concat(Cn,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),zr=function(e){return"undefined"!=typeof ShadowRoot&&e instanceof ShadowRoot||"host"in e&&11===e.nodeType},_r=function(e){if(!e)return document;if(zr(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(zr(t))return t}return document},Nr=function(e,t,n){for(var r,a=n.split(","),l=0,i=a.length;l<i;l++)(r=a[l])&&e.registerName(t,r)},Pr=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(Pn),a=[],l=0,i=r.length;l<i;l++){var o=r[l].trim();if(o){var s=o.match(Cr);if(s){var u=0|parseInt(s[1],10),c=s[2];0!==u&&(In(c,u),Nr(e,c,s[3]),e.getTag().insertRules(u,a)),a.length=0}else a.push(o)}}},Tr=function(e){for(var t=_r(e.options.target).querySelectorAll($r),n=0,r=t.length;n<r;n++){var a=t[n];a&&a.getAttribute(Cn)!==zn&&(Pr(e,a),a.parentNode&&a.parentNode.removeChild(a))}};function Ar(){return n.nc}var Fr=function(e){var t=document.head,n=e||t,r=document.createElement("style"),a=function(e){var t=Array.from(e.querySelectorAll("style[".concat(Cn,"]")));return t[t.length-1]}(n),l=void 0!==a?a.nextSibling:null;r.setAttribute(Cn,zn),r.setAttribute(_n,Nn);var i=Ar();return i&&r.setAttribute("nonce",i),n.insertBefore(r,l),r},Rr=function(){function e(e){this.element=Fr(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){var t;if(e.sheet)return e.sheet;for(var n=null!==(t=e.getRootNode().styleSheets)&&void 0!==t?t:document.styleSheets,r=0,a=n.length;r<a;r++){var l=n[r];if(l.ownerNode===e)return l}throw Rn(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Or=function(){function e(e){this.element=Fr(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Lr=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Dr=Tn,Mr={isServer:!Tn,useCSSOMInjection:!An},Ir=function(){function e(e,t,n){void 0===e&&(e=Bn),void 0===t&&(t={});var r=this;this.options=Et(Et({},Mr),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Tn&&Dr&&(Dr=!1,Tr(this)),jr(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",a=function(n){var a=function(e){return Ln.get(e)}(n);if(void 0===a)return"continue";var l=e.names.get(a);if(void 0===l||!l.size)return"continue";var i=t.getGroup(n);if(0===i.length)return"continue";var o=Cn+".g"+n+'[id="'+a+'"]',s="";l.forEach(function(e){e.length>0&&(s+=e+",")}),r+=i+o+'{content:"'+s+'"}'+Pn},l=0;l<n;l++)a(l);return r}(r)})}return e.registerId=function(e){return Mn(e)},e.prototype.rehydrate=function(){!this.server&&Tn&&Tr(this)},e.prototype.reconstructWithOptions=function(t,n){void 0===n&&(n=!0);var r=new e(Et(Et({},this.options),t),this.gs,n&&this.names||void 0);return!this.server&&Tn&&t.target!==this.options.target&&_r(this.options.target)!==_r(t.target)&&Tr(r),r},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Lr(n):t?new Rr(n):new Or(n)}(this.options),new Er(e)));var e},e.prototype.hasNameForId=function(e,t){var n,r;return null!==(r=null===(n=this.names.get(e))||void 0===n?void 0:n.has(t))&&void 0!==r&&r},e.prototype.registerName=function(e,t){Mn(e);var n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Mn(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Mn(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function Hr(e,t){return null==t||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||e in Ct||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Br=function(e){return e>="A"&&e<="Z"};function Vr(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;Br(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Ur=Symbol.for("sc-keyframes");var Wr=function(e){return null==e||!1===e||""===e},Kr=function(e){var t=[];for(var n in e){var r=e[n];e.hasOwnProperty(n)&&!Wr(r)&&(Array.isArray(r)&&r.isCss||br(r)?t.push("".concat(Vr(n),":"),r,";"):wr(r)?t.push.apply(t,$t($t(["".concat(n," {")],Kr(r),!1),["}"],!1)):t.push("".concat(Vr(n),": ").concat(Hr(n,r),";")))}return t};function qr(e,t,n,r,a){if(void 0===a&&(a=[]),"string"==typeof e)return e&&a.push(e),a;if(Wr(e))return a;if(yr(e))return a.push(".".concat(e.styledComponentId)),a;var l;if(br(e))return!br(l=e)||l.prototype&&l.prototype.isReactComponent||!t?(a.push(e),a):qr(e(t),t,n,r,a);if(function(e){return"object"==typeof e&&null!==e&&Ur in e}(e))return n?(e.inject(n,r),a.push(e.getName(r))):a.push(e),a;if(wr(e)){for(var i=Kr(e),o=0;o<i.length;o++)a.push(i[o]);return a}if(!Array.isArray(e))return a.push(e.toString()),a;for(o=0;o<e.length;o++)qr(e[o],t,n,r,a);return a}function Yr(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(br(n)&&!yr(n))return!1}return!0}var Qr=Zn(Nn),Gr=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&Yr(e),this.componentId=t,this.baseHash=Jn(Qr,t),this.baseStyle=n,Ir.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n).className:"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=xr(r,this.staticRulesId);else{var a=kr(qr(this.rules,e,t,n)),l=Gn(Jn(this.baseHash,a)>>>0);if(!t.hasNameForId(this.componentId,l)){var i=n(a,".".concat(l),void 0,this.componentId);t.insertRules(this.componentId,l,i)}r=xr(r,l),this.staticRulesId=l}else{for(var o=Jn(this.baseHash,n.hash),s="",u=0;u<this.rules.length;u++){var c=this.rules[u];if("string"==typeof c)s+=c;else if(c){var d=kr(qr(c,e,t,n));o=Jn(Jn(o,String(u)),d),s+=d}}if(s){var f=Gn(o>>>0);if(!t.hasNameForId(this.componentId,f)){var p=n(s,".".concat(f),void 0,this.componentId);t.insertRules(this.componentId,f,p)}r=xr(r,f)}}return{className:r,css:"undefined"==typeof window?t.getTag().getGroup(Mn(this.componentId)):""}},e}(),Xr=/&/g,Jr=47,Zr=42;function ea(e){if(-1===e.indexOf("}"))return!1;for(var t=e.length,n=0,r=0,a=!1,l=0;l<t;l++){var i=e.charCodeAt(l);if(0!==r||a||i!==Jr||e.charCodeAt(l+1)!==Zr)if(a)i===Zr&&e.charCodeAt(l+1)===Jr&&(a=!1,l++);else if(34!==i&&39!==i||0!==l&&92===e.charCodeAt(l-1)){if(0===r)if(123===i)n++;else if(125===i&&--n<0)return!0}else 0===r?r=i:r===i&&(r=0);else a=!0,l++}return 0!==n||0!==r}function ta(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=ta(e.children,t)),e})}function na(e){var t,n,r,a=void 0===e?Bn:e,l=a.options,i=void 0===l?Bn:l,o=a.plugins,s=void 0===o?Hn:o,u=function(e,r,a){return a.startsWith(n)&&a.endsWith(n)&&a.replaceAll(n,"").length>0?".".concat(t):e},c=s.slice();c.push(function(e){e.type===Tt&&e.value.includes("&")&&(r||(r=new RegExp("\\".concat(n,"\\b"),"g")),e.props[0]=e.props[0].replace(Xr,n).replace(r,u))}),i.prefix&&c.push(kn),c.push(yn);var d,f=[],p=function(e){var t=Wt(e);return function(n,r,a,l){for(var i="",o=0;o<t;o++)i+=e[o](n,r,a,l)||"";return i}}(c.concat((d=function(e){return f.push(e)},function(e){e.root||(e=e.return)&&d(e)}))),h=function(e,a,l,o){void 0===a&&(a=""),void 0===l&&(l=""),void 0===o&&(o="&"),t=o,n=a,r=void 0;var s=function(e){if(!ea(e))return e;for(var t=e.length,n="",r=0,a=0,l=0,i=!1,o=0;o<t;o++){var s=e.charCodeAt(o);if(0!==l||i||s!==Jr||e.charCodeAt(o+1)!==Zr)if(i)s===Zr&&e.charCodeAt(o+1)===Jr&&(i=!1,o++);else if(34!==s&&39!==s||0!==o&&92===e.charCodeAt(o-1)){if(0===l)if(123===s)a++;else if(125===s){if(--a<0){for(var u=o+1;u<t;){var c=e.charCodeAt(u);if(59===c||10===c)break;u++}u<t&&59===e.charCodeAt(u)&&u++,a=0,o=u-1,r=u;continue}0===a&&(n+=e.substring(r,o+1),r=o+1)}else 59===s&&0===a&&(n+=e.substring(r,o+1),r=o+1)}else 0===l?l=s:l===s&&(l=0);else i=!0,o++}if(r<t){var d=e.substring(r);ea(d)||(n+=d)}return n}(function(e){if(-1===e.indexOf("//"))return e;for(var t=e.length,n=[],r=0,a=0,l=0,i=0;a<t;){var o=e.charCodeAt(a);if(34!==o&&39!==o||0!==a&&92===e.charCodeAt(a-1))if(0===l)if(o===Jr&&a+1<t&&e.charCodeAt(a+1)===Zr){for(a+=2;a+1<t&&(e.charCodeAt(a)!==Zr||e.charCodeAt(a+1)!==Jr);)a++;a+=2}else if(40===o&&a>=3&&108==(32|e.charCodeAt(a-1))&&114==(32|e.charCodeAt(a-2))&&117==(32|e.charCodeAt(a-3)))i=1,a++;else if(i>0)41===o?i--:40===o&&i++,a++;else if(o===Zr&&a+1<t&&e.charCodeAt(a+1)===Jr)a>r&&n.push(e.substring(r,a)),r=a+=2;else if(o===Jr&&a+1<t&&e.charCodeAt(a+1)===Jr){for(a>r&&n.push(e.substring(r,a));a<t&&10!==e.charCodeAt(a);)a++;r=a}else a++;else a++;else 0===l?l=o:l===o&&(l=0),a++}return 0===r?e:(r<t&&n.push(e.substring(r)),n.join(""))}(e)),u=wn(l||a?"".concat(l," ").concat(a," { ").concat(s," }"):s);return i.namespace&&(u=ta(u,i.namespace)),f=[],bn(u,p),f};return h.hash=s.length?s.reduce(function(e,t){return t.name||Rn(15),Jn(e,t.name)},5381).toString():"",h}var ra=new Ir,aa=na(),la=r.createContext({shouldForwardProp:void 0,styleSheet:ra,stylis:aa}),ia=(la.Consumer,r.createContext(void 0));function oa(){return r.useContext(la)}function sa(e){if(!r.useMemo)return e.children;var t=oa().styleSheet,n=r.useMemo(function(){var n=t;return e.sheet?n=e.sheet:e.target&&(n=n.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(n=n.reconstructWithOptions({useCSSOMInjection:!1})),n},[e.disableCSSOMInjection,e.sheet,e.target,t]),a=r.useMemo(function(){return na({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),l=r.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:n,stylis:a}},[e.shouldForwardProp,n,a]);return r.createElement(la.Provider,{value:l},r.createElement(ia.Provider,{value:a},e.children))}var ua=r.createContext(void 0);ua.Consumer;function ca(e){var t=r.useContext(ua),n=r.useMemo(function(){return function(e,t){if(!e)throw Rn(14);if(br(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw Rn(8);return t?Et(Et({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?r.createElement(ua.Provider,{value:n},e.children):null}var da={};new Set;function fa(e,t,n){var a=yr(e),l=e,i=!nr(e),o=t.attrs,s=void 0===o?Hn:o,u=t.componentId,c=void 0===u?function(e,t){var n="string"!=typeof e?"sc":qn(e);da[n]=(da[n]||0)+1;var r="".concat(n,"-").concat(er(Nn+n+da[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):u,d=t.displayName,f=void 0===d?function(e){return nr(e)?"styled.".concat(e):"Styled(".concat(tr(e),")")}(e):d,p=t.displayName&&t.componentId?"".concat(qn(t.displayName),"-").concat(t.componentId):t.componentId||c,h=a&&l.attrs?l.attrs.concat(s).filter(Boolean):s,m=t.shouldForwardProp;if(a&&l.shouldForwardProp){var g=l.shouldForwardProp;if(t.shouldForwardProp){var v=t.shouldForwardProp;m=function(e,t){return g(e,t)&&v(e,t)}}else m=g}var b=new Gr(n,p,a?l.componentStyle:void 0);function y(e,t){return function(e,t,n){var a=e.attrs,l=e.componentStyle,i=e.defaultProps,o=e.foldedComponentIds,s=e.styledComponentId,u=e.target,c=r.useContext(ua),d=oa(),f=e.shouldForwardProp||d.shouldForwardProp,p=Vn(t,c,i)||Bn,h=function(e,t,n){for(var r,a=Et(Et({},t),{className:void 0,theme:n}),l=0;l<e.length;l+=1){var i=br(r=e[l])?r(a):r;for(var o in i)"className"===o?a.className=xr(a.className,i[o]):"style"===o?a.style=Et(Et({},a.style),i[o]):o in t&&void 0===t[o]||(a[o]=i[o])}return"className"in t&&"string"==typeof t.className&&(a.className=xr(a.className,t.className)),a}(a,t,p),m=h.as||u,g={};for(var v in h)void 0===h[v]||"$"===v[0]||"as"===v||"theme"===v&&h.theme===p||("forwardedAs"===v?g.as=h.forwardedAs:f&&!f(v,m)||(g[v]=h[v]));var b=function(e,t){var n=oa();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(l,h),y=b.className,x=xr(o,s);return y&&(x+=" "+y),h.className&&(x+=" "+h.className),g[nr(m)&&!Un.has(m)?"class":"className"]=x,n&&(g.ref=n),(0,r.createElement)(m,g)}(x,e,t)}y.displayName=f;var x=r.forwardRef(y);return x.attrs=h,x.componentStyle=b,x.displayName=f,x.shouldForwardProp=m,x.foldedComponentIds=a?xr(l.foldedComponentIds,l.styledComponentId):"",x.styledComponentId=p,x.target=a?l.target:e,Object.defineProperty(x,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,a=t;r<a.length;r++)Sr(e,a[r],!0);return e}({},l.defaultProps,e):e}}),jr(x,function(){return".".concat(x.styledComponentId)}),i&&vr(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function pa(e,t){for(var n=[e[0]],r=0,a=t.length;r<a;r+=1)n.push(t[r],e[r+1]);return n}var ha=function(e){return Object.assign(e,{isCss:!0})};function ma(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(br(e)||wr(e))return ha(qr(pa(Hn,$t([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?qr(r):ha(qr(pa(r,t)))}function ga(e,t,n){if(void 0===n&&(n=Bn),!t)throw Rn(1,t);var r=function(r){for(var a=[],l=1;l<arguments.length;l++)a[l-1]=arguments[l];return e(t,n,ma.apply(void 0,$t([r],a,!1)))};return r.attrs=function(r){return ga(e,t,Et(Et({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return ga(e,t,Et(Et({},n),r))},r}var va=function(e){return ga(fa,e)},ba=va;Un.forEach(function(e){ba[e]=va(e)});var ya,xa=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Yr(e),Ir.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var a=r(kr(qr(this.rules,t,n,r)),""),l=this.componentId+e;n.insertRules(l,l,a)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&Ir.registerId(this.componentId+e);var a=this.componentId+e;this.isStatic?n.hasNameForId(a,a)||this.createStyles(e,t,n,r):(this.removeStyles(e,n),this.createStyles(e,t,n,r))},e}();var ka=function(){function e(e,t){var n=this;this[ya]=!0,this.inject=function(e,t){void 0===t&&(t=aa);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,jr(this,function(){throw Rn(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=aa),this.name+e.hash},e}();function wa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=kr(ma.apply(void 0,$t([e],t,!1))),a=er(r);return new ka(a,r)}ya=Ur;(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=Ar(),r=kr([n&&'nonce="'.concat(n,'"'),"".concat(Cn,'="true"'),"".concat(_n,'="').concat(Nn,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Rn(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Rn(2);var n=e.instance.toString();if(!n)return[];var a=((t={})[Cn]="",t[_n]=Nn,t.dangerouslySetInnerHTML={__html:n},t),l=Ar();return l&&(a.nonce=l),[r.createElement("style",Et({},a,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Ir({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Rn(2);return r.createElement(sa,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Rn(3)}})(),"__sc-".concat(Cn,"__");const Sa={color:{bg:"#FAFAF7",surface:"#FFFFFF",surfaceAlt:"#F2EEE5",surfaceSunken:"#EFEAE0",ink:"#0F0F0E",inkSoft:"#2A2925",muted:"#6F6C65",mutedSoft:"#9C9890",border:"#E7E2D6",borderStrong:"#D6D0C0",brand:"#0F5132",brandSoft:"#E5EFE9",brandInk:"#0A3320",accent:"#C8804A",accentSoft:"#F5E7D6",success:"#1F5C42",successSoft:"#DEEBE2",danger:"#9F3B22",dangerSoft:"#F4DAD0",warning:"#A8761A",warningSoft:"#F3E5C7"},font:{display:"'Playfair Display', Georgia, 'Times New Roman', serif",sans:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",mono:"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"},size:{radius:{sm:"6px",md:"12px",lg:"20px",xl:"28px",pill:"999px"},space:{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px",9:"96px",10:"128px"},container:"1180px",containerNarrow:"960px"},shadow:{xs:"0 1px 2px rgba(15, 15, 14, 0.04)",sm:"0 2px 8px rgba(15, 15, 14, 0.06)",md:"0 8px 24px rgba(15, 15, 14, 0.08)",lg:"0 24px 60px rgba(15, 15, 14, 0.12)",inset:"inset 0 1px 0 rgba(255, 255, 255, 0.6)"},motion:{fast:"160ms cubic-bezier(0.2, 0, 0, 1)",base:"240ms cubic-bezier(0.2, 0, 0, 1)",slow:"420ms cubic-bezier(0.2, 0, 0, 1)",spring:"520ms cubic-bezier(0.34, 1.56, 0.64, 1)"},z:{base:1,nav:50,overlay:80,modal:100}},ja=(function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var a=ma.apply(void 0,$t([e],t,!1)),l="sc-global-".concat(er(JSON.stringify(a))),i=new xa(a,l),o=new WeakMap,s=function(e){var t=oa(),n=r.useContext(ua),a=o.get(t.styleSheet);return void 0===a&&(a=t.styleSheet.allocateGSInstance(l),o.set(t.styleSheet,a)),r.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,n,r,a){if(i.isStatic)i.renderStyles(e,Fn,n,a);else{var l=Et(Et({},t),{theme:Vn(t,r,s.defaultProps)});i.renderStyles(e,l,n,a)}}(a,e,t.styleSheet,n,t.stylis),function(){i.removeStyles(a,t.styleSheet)}},[a,e,t.styleSheet,n,t.stylis]),null};return r.memo(s)})`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
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
    background: ${e=>{let{theme:t}=e;return t.color.bg}};
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
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
`;var Ea=n(579);const $a=ba.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${e=>{let{theme:t}=e;return t.font.display}};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
`,Ca=ba.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${e=>{let{theme:t}=e;return t.color.brand}};
  color: #FAFAF7;
  font-family: ${e=>{let{theme:t}=e;return t.font.display}};
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0;
  line-height: 1;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
`,za=ba.span`
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
`,_a=ba.em`
  font-style: italic;
  font-weight: 400;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Na=e=>{let{showName:t=!0}=e;return(0,Ea.jsxs)($a,{children:[(0,Ea.jsx)(Ca,{children:"A"}),t&&(0,Ea.jsxs)(za,{children:["Arvo ",(0,Ea.jsx)(_a,{children:"Flow"})]})]})},Pa={primary:ma`
    background: ${e=>{let{theme:t}=e;return t.color.ink}};
    color: #FAFAF7;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.ink}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
    &:hover { transform: translateY(-1px); box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}}; }
    &:active { transform: translateY(0); }
  `,brand:ma`
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
    &:hover { transform: translateY(-1px); box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}}; background: ${e=>{let{theme:t}=e;return t.color.brandInk}}; }
    &:active { transform: translateY(0); }
  `,secondary:ma`
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  `,ghost:ma`
    background: transparent;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    border: 1px solid transparent;
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  `,ghostInverse:ma`
    background: transparent;
    color: rgba(250, 250, 247, 0.85);
    border: 1px solid rgba(250, 250, 247, 0.18);
    &:hover { background: rgba(250, 250, 247, 0.08); color: #FAFAF7; }
  `},Ta={sm:ma`
    height: 36px;
    padding: 0 14px;
    font-size: 13.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  `,md:ma`
    height: 44px;
    padding: 0 18px;
    font-size: 14.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  `,lg:ma`
    height: 52px;
    padding: 0 24px;
    font-size: 15.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  `},Aa=ba.button`
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
  ${e=>{let{$variant:t="primary"}=e;return Pa[t]}}
  ${e=>{let{$size:t="md"}=e;return Ta[t]}}
  ${e=>{let{$full:t}=e;return t&&"width: 100%;"}}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }
`,Fa=Aa,Ra=ba.header`
  position: sticky;
  top: 0;
  z-index: ${e=>{let{theme:t}=e;return t.z.nav}};
  background: rgba(250, 250, 247, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,Oa=ba.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`,La=ba.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 740px) { display: none; }
`,Da=ba(bt)`
  padding: 8px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  font-size: 14px;
  color: ${e=>{let{theme:t,$active:n}=e;return n?t.color.ink:t.color.muted}};
  font-weight: ${e=>{let{$active:t}=e;return t?600:500}};
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}}, color ${e=>{let{theme:t}=e;return t.motion.fast}};
  background: ${e=>{let{theme:t,$active:n}=e;return n?t.color.surfaceAlt:"transparent"}};
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
`,Ma=ba.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ia=e=>{let{variant:t="public"}=e;const{pathname:n}=ce();return(0,Ea.jsx)(Ra,{children:(0,Ea.jsxs)(Oa,{children:[(0,Ea.jsx)(bt,{to:"/",children:(0,Ea.jsx)(Na,{})}),"public"===t&&(0,Ea.jsxs)(La,{children:[(0,Ea.jsx)(Da,{to:"/",$active:"/"===n,children:"Hem"}),(0,Ea.jsx)(Da,{to:"/#hur",$active:!1,children:"S\xe5 fungerar det"}),(0,Ea.jsx)(Da,{to:"/#priser",$active:!1,children:"Pris"}),(0,Ea.jsx)(Da,{to:"/#faq",$active:!1,children:"FAQ"})]}),"app"===t&&(0,Ea.jsxs)(La,{children:[(0,Ea.jsx)(Da,{to:"/insights",$active:"/insights"===n,children:"Insikter"}),(0,Ea.jsx)(Da,{to:"/insights",$active:!1,children:"Historik"}),(0,Ea.jsx)(Da,{to:"/insights",$active:!1,children:"Inst\xe4llningar"})]}),(0,Ea.jsx)(Ma,{children:"public"===t?(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)(Fa,{as:bt,to:"/connect",$variant:"ghost",$size:"sm",children:"Logga in"}),(0,Ea.jsx)(Fa,{as:bt,to:"/connect",$variant:"primary",$size:"sm",children:"Koppla Fortnox \u2192"})]}):(0,Ea.jsx)(Fa,{as:bt,to:"/",$variant:"ghost",$size:"sm",children:"Logga ut"})})]})})},Ha=ba.footer`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  padding: 64px 28px 48px;
`,Ba=ba.div`
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
`,Va=ba.div`
  p {
    margin-top: 14px;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    max-width: 320px;
  }
`,Ua=ba.div`
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
`,Wa=ba.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 56px auto 0;
  padding-top: 24px;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  @media (max-width: 520px) { flex-direction: column; gap: 10px; }
`,Ka=()=>(0,Ea.jsxs)(Ha,{children:[(0,Ea.jsxs)(Ba,{children:[(0,Ea.jsxs)(Va,{children:[(0,Ea.jsx)(Na,{}),(0,Ea.jsx)("p",{children:"AI-ink\xf6pschefen f\xf6r svenska sm\xe5f\xf6retag. Vi hittar pengarna du bl\xf6der p\xe5 leverant\xf6rsavtal \u2014 du betalar bara n\xe4r du sparar."})]}),(0,Ea.jsxs)(Ua,{children:[(0,Ea.jsx)("h4",{children:"Produkt"}),(0,Ea.jsxs)("ul",{children:[(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#hur",children:"S\xe5 fungerar det"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#priser",children:"Pris"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#integrationer",children:"Integrationer"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#sakerhet",children:"S\xe4kerhet"})})]})]}),(0,Ea.jsxs)(Ua,{children:[(0,Ea.jsx)("h4",{children:"F\xf6retag"}),(0,Ea.jsxs)("ul",{children:[(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#om",children:"Om oss"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#partners",children:"Partners"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#kontakt",children:"Kontakt"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#blog",children:"Blog"})})]})]}),(0,Ea.jsxs)(Ua,{children:[(0,Ea.jsx)("h4",{children:"Juridik"}),(0,Ea.jsxs)("ul",{children:[(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#villkor",children:"Villkor"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#integritet",children:"Integritet (GDPR)"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)("a",{href:"#cookies",children:"Cookies"})}),(0,Ea.jsx)("li",{children:(0,Ea.jsx)(bt,{to:"/bias",children:"Rankningspolicy"})})]})]})]}),(0,Ea.jsxs)(Wa,{children:[(0,Ea.jsx)("span",{children:"\xa9 2026 Arvo Flow AB \xb7 Org.nr 559500-0000"}),(0,Ea.jsx)("span",{children:"Stockholm \xb7 Made with care in Sweden"})]})]}),qa={shield:(0,Ea.jsx)("path",{d:"M12 2.5l8 3v6.5c0 4.6-3.3 8.7-8 9.5-4.7-.8-8-4.9-8-9.5V5.5l8-3z"}),bolt:(0,Ea.jsx)("path",{d:"M13 2L4 14h7l-1 8 9-12h-7l1-8z"}),phone:(0,Ea.jsx)("path",{d:"M5 3h4l2 5-3 2c1.4 2.8 3.7 5.1 6.5 6.5l2-3 5 2v4c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2z"}),wifi:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("path",{d:"M2 8.8a14 14 0 0120 0"}),(0,Ea.jsx)("path",{d:"M5 12.6a9 9 0 0114 0"}),(0,Ea.jsx)("path",{d:"M8.5 16.4a4 4 0 017 0"}),(0,Ea.jsx)("circle",{cx:"12",cy:"20",r:"1"})]}),card:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),(0,Ea.jsx)("path",{d:"M2 10h20"})]}),file:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,Ea.jsx)("path",{d:"M14 2v6h6"})]}),briefcase:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2"}),(0,Ea.jsx)("path",{d:"M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"})]}),truck:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("path",{d:"M1 3h15v13H1z"}),(0,Ea.jsx)("path",{d:"M16 8h4l3 3v5h-7z"}),(0,Ea.jsx)("circle",{cx:"6",cy:"18.5",r:"2"}),(0,Ea.jsx)("circle",{cx:"18",cy:"18.5",r:"2"})]}),arrow:(0,Ea.jsx)("path",{d:"M5 12h14M13 6l6 6-6 6"}),check:(0,Ea.jsx)("path",{d:"M5 12l5 5L20 7"}),spark:(0,Ea.jsx)("path",{d:"M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"}),lock:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("rect",{x:"4",y:"11",width:"16",height:"11",rx:"2"}),(0,Ea.jsx)("path",{d:"M8 11V7a4 4 0 018 0v4"})]}),fortnox:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"}),(0,Ea.jsx)("path",{d:"M8 8h8M8 12h8M8 16h5"})]}),bankid:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("path",{d:"M5 3h14v18H5z"}),(0,Ea.jsx)("path",{d:"M9 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2"})]}),trend:(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)("path",{d:"M3 17l6-6 4 4 8-8"}),(0,Ea.jsx)("path",{d:"M14 7h7v7"})]})},Ya=e=>{let{name:t,size:n=20,stroke:r=1.6,color:a="currentColor",fill:l="none",...i}=e;const o=qa[t];return o?(0,Ea.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 24 24",fill:l,stroke:a,strokeWidth:r,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...i,children:o}):null},Qa=wa`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,Ga=wa`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`,Xa=ba.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  overflow-x: hidden;
`,Ja=ba.section`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: ${e=>{let{$tight:t}=e;return t?"64px 28px":"120px 28px"}};
  @media (max-width: 740px) {
    padding: ${e=>{let{$tight:t}=e;return t?"48px 20px":"80px 20px"}};
  }
`,Za=ba.section`
  position: relative;
  padding: 96px 28px 80px;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 56px 20px 48px; }
`,el=ba.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 30%, rgba(15, 81, 50, 0.08), transparent 50%),
    radial-gradient(circle at 82% 12%, rgba(200, 128, 74, 0.10), transparent 55%);
  z-index: 0;
`,tl=ba.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: center;
  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 48px; }
`,nl=ba.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  animation: ${Qa} 0.6s ease both;

  span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,rl=ba.h1`
  margin-top: 24px;
  font-size: clamp(44px, 6vw, 76px);
  line-height: 1.02;
  font-weight: 500;
  letter-spacing: -0.025em;
  animation: ${Qa} 0.7s 0.1s ease both;

  em {
    font-style: italic;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-weight: 500;
  }
`,al=ba.p`
  margin-top: 22px;
  font-size: 18.5px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  max-width: 540px;
  animation: ${Qa} 0.7s 0.2s ease both;
`,ll=ba.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: ${Qa} 0.7s 0.3s ease both;
`,il=ba.div`
  margin-top: 28px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  animation: ${Qa} 0.7s 0.4s ease both;

  div {
    display: flex;
    flex-direction: column;
  }
  strong {
    font-size: 18px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-feature-settings: "tnum";
  }
  span {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-top: 2px;
  }
`,ol=ba.div`
  position: relative;
  animation: ${Qa} 0.8s 0.2s ease both;
`,sl=ba.div`
  position: relative;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  padding: 28px;
  transform: rotate(0.4deg);
`,ul=ba.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

  h4 {
    font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
    font-size: 13px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  span {
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    padding: 4px 10px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-weight: 500;
  }
`,cl=ba.div`
  padding: 20px 0 14px;

  small {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    display: block;
    margin-bottom: 4px;
  }
  div.amount {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 56px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.03em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-feature-settings: "tnum";
    em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 400; }
  }
  span.unit { font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; margin-left: 6px; }
`,dl=ba.ul`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,fl=ba.li`
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

  div.icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  div.label {
    font-size: 14.5px;
    font-weight: 500;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  div.sub {
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  div.amount {
    font-size: 15px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.success}};
    font-feature-settings: "tnum";
  }
`,pl=ba.div`
  position: absolute;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  ${e=>{let{$top:t}=e;return t&&`top: ${t};`}}
  ${e=>{let{$bottom:t}=e;return t&&`bottom: ${t};`}}
  ${e=>{let{$left:t}=e;return t&&`left: ${t};`}}
  ${e=>{let{$right:t}=e;return t&&`right: ${t};`}}
  transform: rotate(-2deg);

  div.dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div.text { display: flex; flex-direction: column; }
  strong { font-size: 13.5px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
  span { font-size: 12px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; }
`,hl=ba.div`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  padding: 22px 0;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  overflow: hidden;
`,ml=ba.div`
  display: flex;
  white-space: nowrap;
  gap: 64px;
  animation: ${Ga} 50s linear infinite;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  font-size: 14px;
  letter-spacing: 0.02em;

  span {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  em {
    font-style: normal;
    color: ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  }
`,gl=ba.div`
  max-width: 720px;
  margin: 0 auto 64px;
  text-align: center;

  span.kicker {
    display: inline-block;
    font-size: 12.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 14px;
  }
  h2 {
    font-size: clamp(36px, 4.5vw, 56px);
    line-height: 1.05;
    letter-spacing: -0.025em;
  }
  p {
    margin-top: 18px;
    font-size: 18px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.55;
  }

  @media (max-width: 740px) { margin-bottom: 40px; text-align: left; }
`,vl=ba.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`,bl=ba.div`
  position: relative;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px 28px;
  transition: transform ${e=>{let{theme:t}=e;return t.motion.base}}, box-shadow ${e=>{let{theme:t}=e;return t.motion.base}};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  }

  span.step {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 15px;
    font-style: italic;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  h3 {
    margin-top: 16px;
    font-size: 24px;
    line-height: 1.15;
  }
  p {
    margin-top: 12px;
    font-size: 15px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  ul {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  ul li {
    font-size: 13.5px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  ul li svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
`,yl=ba.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 40px; }
`,xl=ba.figure`
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 40px 36px;
  position: relative;

  blockquote {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 26px;
    line-height: 1.35;
    letter-spacing: -0.015em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};

    &::before { content: '“'; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-size: 60px; line-height: 0; vertical-align: -22px; margin-right: 4px; }
  }
  figcaption {
    margin-top: 22px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  figcaption div.avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
  }
  figcaption strong { display: block; font-size: 14.5px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
  figcaption span { display: block; font-size: 13px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; }
`,kl=ba.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }

  div {
    border-left: 2px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    padding-left: 18px;
  }
  strong {
    display: block;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 44px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-feature-settings: "tnum";
  }
  span {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
`,wl=ba.div`
  max-width: 840px;
  margin: 0 auto;
  background: ${e=>{let{theme:t}=e;return t.color.ink}};
  color: #FAFAF7;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 56px;
  position: relative;
  overflow: hidden;
  @media (max-width: 740px) { padding: 36px 28px; }

  &::after {
    content: '';
    position: absolute;
    top: -40%; right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(circle, rgba(200, 128, 74, 0.18), transparent 60%);
    pointer-events: none;
  }
`,Sl=ba.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  @media (max-width: 740px) { grid-template-columns: 1fr; }

  span.kicker {
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  h3 {
    color: #FAFAF7;
    margin-top: 14px;
    font-size: 38px;
    line-height: 1.1;
  }
  p {
    color: rgba(250, 250, 247, 0.7);
    margin-top: 18px;
    font-size: 15.5px;
    line-height: 1.55;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  ul li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    color: rgba(250, 250, 247, 0.92);
    font-size: 14.5px;
  }
  ul li svg { color: ${e=>{let{theme:t}=e;return t.color.accent}}; flex-shrink: 0; margin-top: 3px; }
`,jl=ba.div`
  max-width: 820px;
  margin: 0 auto;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,El=ba.details`
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  padding: 24px 4px;

  summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 22px;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    &::-webkit-details-marker { display: none; }
  }
  summary::after {
    content: '+';
    font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
    font-size: 24px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    transition: transform ${e=>{let{theme:t}=e;return t.motion.base}};
  }
  &[open] summary::after { content: '−'; }
  p {
    margin-top: 16px;
    font-size: 15.5px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    max-width: 700px;
  }
`,$l=ba.section`
  text-align: center;
  padding: 120px 28px;
  max-width: 720px;
  margin: 0 auto;

  h2 {
    font-size: clamp(40px, 5vw, 64px);
    line-height: 1.05;
    letter-spacing: -0.025em;
  }
  p {
    margin-top: 18px;
    font-size: 17px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  div.actions {
    margin-top: 32px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  div.fineprint {
    margin-top: 16px;
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
  }
`,Cl=[{step:"Steg 01",title:"Koppla Fortnox p\xe5 60 sek",body:"S\xe4ker OAuth-anslutning till ditt befintliga bokf\xf6ringssystem. Vi l\xe4ser leverant\xf6rsfakturor \u2014 inget annat. Du kan koppla bort n\xe4r som helst.",bullets:["Endast l\xe4s-r\xe4ttigheter","BankID-verifierat","GDPR-s\xe4krad infrastruktur i Sverige"]},{step:"Steg 02",title:"Vi skannar dina avtal \u2014 du sover",body:"P\xe5 30 sekunder analyseras 12 m\xe5naders leverant\xf6rsfakturor. AI:n j\xe4mf\xf6r mot 50 000+ andra svenska SMB:er och hittar var du betalar \xf6ver marknadspris.",bullets:["8 leverant\xf6rskategorier idag","Branschjusterad benchmark","\xc5terkommande scanning varje kvartal"]},{step:"Steg 03",title:"Godk\xe4nn med BankID \u2014 vi byter \xe5t dig",body:"Du ser exakt vad du sparar och vad som m\xe5ste signeras. Arvo f\xf6rbereder upps\xe4gning + nytt avtal. Du klickar igenom \u2014 vi sk\xf6ter resten.",bullets:["Du beh\xe5ller full kontroll","Ingen leverant\xf6r byts utan din signatur","Garanti om priset h\xf6js inom 12 m\xe5n"]}],zl=[{q:"Vad kostar det?",a:"Inget i f\xf6rskott. Vi tar 20 % av den faktiska besparing som materialiseras under \xe5r 1, fakturerat kvartalsvis. Hittar vi inget \u2014 kostar det inget. Du kan v\xe4lja en alternativ modell d\xe4r vi rabatterar v\xe5r affiliate-int\xe4kt mot 30 % success-fee, helt transparent."},{q:"Hur kan ni vara s\xe4kra p\xe5 att rekommendationerna \xe4r opartiska?",a:"V\xe5r rankningsalgoritm \xe4r publik och deterministisk \u2014 du hittar hela v\xe5r rankningspolicy under /bias. Affiliate-int\xe4kter \xe4r kapade per kategori och \xf6verskott rabatteras tillbaka till kunderna. Du kan ocks\xe5 v\xe4lja en helt affiliate-fri modell vid onboarding."},{q:"Vad h\xe4nder om den nya leverant\xf6ren h\xf6jer priset efter bytet?",a:"Vi m\xe4ter faktisk besparing \xf6ver 12 m\xe5nader via Fortnox. H\xf6js priset s\xe5 att din besparing blir l\xe4gre \xe4n vad vi lovat \u2014 f\xe5r du mellanskillnaden tillbaka. Det st\xe5r i avtalet."},{q:"S\xe4ger ni upp avtal autonomt utan min godk\xe4nnande?",a:"Aldrig. Varje byte kr\xe4ver din BankID-signatur. Vi f\xf6rbereder, du godk\xe4nner. Det \xe4r en h\xe5rd regel."},{q:"Vilka kategorier t\xe4cker ni idag?",a:"F\xf6retagsf\xf6rs\xe4kring, elavtal, mobilabonnemang, bredband, kortterminaler, fakturatj\xe4nster, yrkesansvarsf\xf6rs\xe4kring och f\xf6retagsleasing. Fler kategorier l\xe4ggs till varje kvartal baserat p\xe5 var vi ser st\xf6rst besparingar i kunddatan."},{q:"Vad h\xe4nder med min data?",a:"Vi l\xe4ser endast leverant\xf6rsfakturor fr\xe5n Fortnox via l\xe4s-r\xe4ttigheter. Datan lagras krypterad i Sverige (Bahnhof Stockholm). Vi s\xe4ljer aldrig identifierbar data \u2014 anonymiserade branschindex \xe4r v\xe5r enda dataprodukt ut\xf6ver tj\xe4nsten."}],_l=()=>(0,Ea.jsxs)(Xa,{children:[(0,Ea.jsx)(Ia,{variant:"public"}),(0,Ea.jsxs)(Za,{children:[(0,Ea.jsx)(el,{}),(0,Ea.jsxs)(tl,{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsxs)(nl,{children:[(0,Ea.jsx)("span",{className:"dot"})," AI-ink\xf6pschef \xb7 F\xf6r svenska sm\xe5f\xf6retag"]}),(0,Ea.jsxs)(rl,{children:["Vi hittar pengarna",(0,Ea.jsx)("br",{}),"du bl\xf6der p\xe5 ",(0,Ea.jsx)("em",{children:"fel leverant\xf6r."})]}),(0,Ea.jsx)(al,{children:"Koppla Fortnox p\xe5 60 sekunder. Arvo Flow analyserar dina leverant\xf6rsavtal, j\xe4mf\xf6r mot tusentals andra svenska SMB:er och hittar var du betalar \xf6ver marknadspris. Du betalar oss bara n\xe4r du faktiskt sparar pengar."}),(0,Ea.jsxs)(ll,{children:[(0,Ea.jsxs)(Fa,{as:bt,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox ",(0,Ea.jsx)(Ya,{name:"arrow",size:18})]}),(0,Ea.jsx)(Fa,{as:"a",href:"#hur",$variant:"secondary",$size:"lg",children:"S\xe5 fungerar det"})]}),(0,Ea.jsxs)(il,{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("strong",{children:"187 340 kr"}),(0,Ea.jsx)("span",{children:"snitt-besparing \xe5r 1"})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("strong",{children:"4,8 / 5"}),(0,Ea.jsx)("span",{children:"Trustpilot \xb7 312 omd\xf6men"})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("strong",{children:"0 kr"}),(0,Ea.jsx)("span",{children:"tills du sparat pengar"})]})]})]}),(0,Ea.jsxs)(ol,{children:[(0,Ea.jsxs)(sl,{children:[(0,Ea.jsxs)(ul,{children:[(0,Ea.jsx)("h4",{children:"Lindberg VVS \xb7 Live"}),(0,Ea.jsx)("span",{children:"\u25cf Aktiv"})]}),(0,Ea.jsxs)(cl,{children:[(0,Ea.jsx)("small",{children:"Identifierad besparing \xe5r 1"}),(0,Ea.jsxs)("div",{className:"amount",children:[(0,Ea.jsx)("em",{children:"187 340"}),(0,Ea.jsx)("span",{className:"unit",children:"kr"})]})]}),(0,Ea.jsxs)(dl,{children:[(0,Ea.jsxs)(fl,{children:[(0,Ea.jsx)("div",{className:"icon",children:(0,Ea.jsx)(Ya,{name:"bolt",size:18})}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("div",{className:"label",children:"Elavtal \xb7 Tibber"}),(0,Ea.jsx)("div",{className:"sub",children:"vs Vattenfall (r\xf6rligt)"})]}),(0,Ea.jsx)("div",{className:"amount",children:"+55 600 kr"})]}),(0,Ea.jsxs)(fl,{children:[(0,Ea.jsx)("div",{className:"icon",children:(0,Ea.jsx)(Ya,{name:"shield",size:18})}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("div",{className:"label",children:"F\xf6retagsf\xf6rs\xe4kring \xb7 If"}),(0,Ea.jsx)("div",{className:"sub",children:"vs Trygg-Hansa"})]}),(0,Ea.jsx)("div",{className:"amount",children:"+32 200 kr"})]}),(0,Ea.jsxs)(fl,{children:[(0,Ea.jsx)("div",{className:"icon",children:(0,Ea.jsx)(Ya,{name:"phone",size:18})}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("div",{className:"label",children:"Mobil \xb7 Tele2"}),(0,Ea.jsx)("div",{className:"sub",children:"14 abonnemang vs Telia"})]}),(0,Ea.jsx)("div",{className:"amount",children:"+15 600 kr"})]})]})]}),(0,Ea.jsxs)(pl,{$top:"-24px",$right:"-12px",children:[(0,Ea.jsx)("div",{className:"dot",children:(0,Ea.jsx)(Ya,{name:"spark",size:18})}),(0,Ea.jsxs)("div",{className:"text",children:[(0,Ea.jsx)("strong",{children:"5 nya f\xf6rslag"}),(0,Ea.jsx)("span",{children:"scanning klar 09:14"})]})]}),(0,Ea.jsxs)(pl,{$bottom:"-24px",$left:"20px",children:[(0,Ea.jsx)("div",{className:"dot",children:(0,Ea.jsx)(Ya,{name:"check",size:18})}),(0,Ea.jsxs)("div",{className:"text",children:[(0,Ea.jsx)("strong",{children:"Bytet \xe4r klart"}),(0,Ea.jsx)("span",{children:"Tibber tar \xf6ver 1 maj"})]})]})]})]})]}),(0,Ea.jsx)(hl,{children:(0,Ea.jsx)(ml,{children:Array.from({length:2}).flatMap((e,t)=>[(0,Ea.jsxs)("span",{children:["Fortnox ",(0,Ea.jsx)("em",{children:"\xb7"})]},`a${t}`),(0,Ea.jsxs)("span",{children:["Visma ",(0,Ea.jsx)("em",{children:"\xb7"})]},`b${t}`),(0,Ea.jsxs)("span",{children:["Tibber ",(0,Ea.jsx)("em",{children:"\xb7"})]},`c${t}`),(0,Ea.jsxs)("span",{children:["If Skadef\xf6rs\xe4kring ",(0,Ea.jsx)("em",{children:"\xb7"})]},`d${t}`),(0,Ea.jsxs)("span",{children:["Tele2 F\xf6retag ",(0,Ea.jsx)("em",{children:"\xb7"})]},`e${t}`),(0,Ea.jsxs)("span",{children:["Bahnhof ",(0,Ea.jsx)("em",{children:"\xb7"})]},`f${t}`),(0,Ea.jsxs)("span",{children:["Zettle ",(0,Ea.jsx)("em",{children:"\xb7"})]},`g${t}`),(0,Ea.jsxs)("span",{children:["L\xe4nsf\xf6rs\xe4kringar ",(0,Ea.jsx)("em",{children:"\xb7"})]},`h${t}`),(0,Ea.jsxs)("span",{children:["Vattenfall ",(0,Ea.jsx)("em",{children:"\xb7"})]},`i${t}`),(0,Ea.jsxs)("span",{children:["Worldline ",(0,Ea.jsx)("em",{children:"\xb7"})]},`j${t}`)])})}),(0,Ea.jsxs)(Ja,{id:"hur",children:[(0,Ea.jsxs)(gl,{children:[(0,Ea.jsx)("span",{className:"kicker",children:"S\xe5 fungerar Arvo Flow"}),(0,Ea.jsx)("h2",{children:"Tre steg fr\xe5n trasigt till transparent."}),(0,Ea.jsx)("p",{children:"Vi byggde Arvo Flow f\xf6r att vi sj\xe4lva tr\xf6ttnade p\xe5 att betala 30 % \xf6ver marknad utan att ens veta om det. H\xe4r \xe4r hur vi g\xf6r det enkelt."})]}),(0,Ea.jsx)(vl,{children:Cl.map(e=>(0,Ea.jsxs)(bl,{children:[(0,Ea.jsx)("span",{className:"step",children:e.step}),(0,Ea.jsx)("h3",{children:e.title}),(0,Ea.jsx)("p",{children:e.body}),(0,Ea.jsx)("ul",{children:e.bullets.map(e=>(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:16,stroke:2}),e]},e))})]},e.step))})]}),(0,Ea.jsx)(Ja,{$tight:!0,children:(0,Ea.jsxs)(yl,{children:[(0,Ea.jsxs)(xl,{children:[(0,Ea.jsx)("blockquote",{children:"P\xe5 sex veckor hittade Arvo 134 000 kr i besparingar bara p\xe5 el och f\xf6rs\xe4kring. Jag hade trott att jag redan hade f\xf6rhandlat klart \u2014 det st\xe4mde uppenbarligen inte."}),(0,Ea.jsxs)("figcaption",{children:[(0,Ea.jsx)("div",{className:"avatar",children:"JL"}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("strong",{children:"Johan Lindberg"}),(0,Ea.jsx)("span",{children:"VD, Lindberg VVS \xb7 14 anst\xe4llda"})]})]})]}),(0,Ea.jsxs)(kl,{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("strong",{children:"23 %"}),(0,Ea.jsx)("span",{children:"genomsnittlig besparing per leverant\xf6rskategori vi hittar"})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("strong",{children:"11 dgr"}),(0,Ea.jsx)("span",{children:"median\xadtid fr\xe5n f\xf6rsta skanning till f\xf6rsta byte aktiverat"})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("strong",{children:"500+"}),(0,Ea.jsx)("span",{children:"sm\xe5f\xf6retag i Sverige som l\xe5ter Arvo bevaka sina kostnader"})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("strong",{children:"0 kr"}),(0,Ea.jsx)("span",{children:"fasta avgifter \u2014 vi tj\xe4nar bara pengar n\xe4r du sparar pengar"})]})]})]})}),(0,Ea.jsxs)(Ja,{id:"priser",children:[(0,Ea.jsxs)(gl,{children:[(0,Ea.jsx)("span",{className:"kicker",children:"Pris"}),(0,Ea.jsx)("h2",{children:"Du betalar bara n\xe4r vi sparat \xe5t dig."}),(0,Ea.jsx)("p",{children:"Vi \xe4r s\xe5 \xf6vertygade om att vi hittar pengarna att vi v\xe4grar ta en krona innan de \xe4r dina."})]}),(0,Ea.jsx)(wl,{children:(0,Ea.jsxs)(Sl,{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("span",{className:"kicker",children:"Success-baserat"}),(0,Ea.jsx)("h3",{children:"20 % av faktisk besparing \xe5r 1."}),(0,Ea.jsx)("p",{children:"Inga m\xe5nadsavgifter. Inga uppstartskostnader. Vi m\xe4ter besparingen via Fortnox och fakturerar kvartalsvis i takt med att du faktiskt sparar pengarna. Hittar vi inget \u2014 kostar det inget."})]}),(0,Ea.jsxs)("ul",{children:[(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:18,stroke:2.2})," Skanning av alla leverant\xf6rsfakturor varje kvartal"]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:18,stroke:2.2})," F\xf6rberedda byten med BankID-signering"]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:18,stroke:2.2})," Prisgaranti \u2014 h\xf6js priset f\xe5r du tillbaka mellanskillnaden"]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:18,stroke:2.2})," Branschindex tillg\xe4ngligt f\xf6r dig som kund"]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:18,stroke:2.2})," Du kan koppla bort Fortnox n\xe4r som helst"]})]})]})})]}),(0,Ea.jsxs)(Ja,{id:"faq",children:[(0,Ea.jsxs)(gl,{children:[(0,Ea.jsx)("span",{className:"kicker",children:"Vanliga fr\xe5gor"}),(0,Ea.jsx)("h2",{children:"Det vi f\xe5r oftast \u2014 rakt p\xe5."})]}),(0,Ea.jsx)(jl,{children:zl.map((e,t)=>(0,Ea.jsxs)(El,{open:0===t,children:[(0,Ea.jsx)("summary",{children:e.q}),(0,Ea.jsx)("p",{children:e.a})]},e.q))})]}),(0,Ea.jsxs)($l,{children:[(0,Ea.jsx)("h2",{children:"Hur mycket bl\xf6der du just nu?"}),(0,Ea.jsx)("p",{children:"Snittet bland v\xe5ra kunder \xe4r 187 340 kr/\xe5r. Du vet inte f\xf6rr\xe4n vi har scannat. 60 sekunder med Fortnox och du har svaret."}),(0,Ea.jsx)("div",{className:"actions",children:(0,Ea.jsxs)(Fa,{as:bt,to:"/connect",$variant:"brand",$size:"lg",children:["Koppla Fortnox \u2014 gratis scanning ",(0,Ea.jsx)(Ya,{name:"arrow",size:18})]})}),(0,Ea.jsx)("div",{className:"fineprint",children:"Inga kreditkortsuppgifter. Ingen bindningstid. Avsluta n\xe4r du vill."})]}),(0,Ea.jsx)(Ka,{})]}),Nl=wa`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,Pl=ba.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 60%),
    radial-gradient(circle at 0% 100%, ${e=>{let{theme:t}=e;return t.color.accentSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,Tl=ba.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`,Al=ba.div`
  width: 100%;
  max-width: 540px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  animation: ${Nl} 0.5s ease both;
  @media (max-width: 600px) { padding: 32px 24px; }
`,Fl=ba.div`
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
`,Rl=ba.h1`
  margin-top: 14px;
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
`,Ol=ba.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Ll=ba.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Dl=ba.button`
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
`,Ml=ba.ul`
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
`,Il=ba.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Hl=ba.p`
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
`,Bl=wa`
  to { transform: rotate(360deg); }
`,Vl=ba.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${Bl} 0.7s linear infinite;
`,Ul=()=>{const e=pe(),[t,n]=(0,r.useState)("fortnox"),[a,l]=(0,r.useState)(!1);return(0,Ea.jsxs)(Pl,{children:[(0,Ea.jsx)(Ia,{variant:"public"}),(0,Ea.jsx)(Tl,{children:(0,Ea.jsxs)(Al,{children:[(0,Ea.jsxs)(Fl,{children:[(0,Ea.jsx)("span",{className:"dot"})," Steg 1 av 3 \xb7 Anslut bokf\xf6ring"]}),(0,Ea.jsx)(Rl,{children:"Koppla din bokf\xf6ring"}),(0,Ea.jsx)(Ol,{children:"Vi l\xe4ser endast leverant\xf6rsfakturor \u2014 inget annat. Det tar 60 sekunder och du kan koppla bort n\xe4r som helst i ett klick."}),(0,Ea.jsxs)(Ll,{children:[(0,Ea.jsxs)(Dl,{$active:"fortnox"===t,onClick:()=>n("fortnox"),children:[(0,Ea.jsx)("span",{className:"badge",children:"Vanligast"}),(0,Ea.jsx)(Ya,{name:"fortnox",size:22,color:"#0F5132"}),(0,Ea.jsx)("strong",{children:"Fortnox"}),(0,Ea.jsx)("span",{children:"Direkt OAuth-koppling"})]}),(0,Ea.jsxs)(Dl,{$active:"visma"===t,onClick:()=>n("visma"),children:[(0,Ea.jsx)(Ya,{name:"fortnox",size:22,color:"#0F5132"}),(0,Ea.jsx)("strong",{children:"Visma eEkonomi"}),(0,Ea.jsx)("span",{children:"Direkt OAuth-koppling"})]})]}),(0,Ea.jsxs)(Ml,{children:[(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"lock",size:16,stroke:2})," Endast l\xe4s-r\xe4ttigheter \u2014 vi kan inte \xe4ndra eller skicka n\xe5got i din bokf\xf6ring."]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:16,stroke:2})," All data krypteras och lagras i Sverige (Bahnhof Stockholm)."]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:16,stroke:2})," Du kan koppla bort i ett klick \u2014 d\xe5 raderas all data inom 24 h."]})]}),(0,Ea.jsxs)(Il,{children:[(0,Ea.jsx)(Fa,{$variant:"primary",$size:"lg",onClick:()=>{l(!0),setTimeout(()=>e("/scanning"),900)},disabled:a,$full:!0,children:a?(0,Ea.jsxs)(Ea.Fragment,{children:[(0,Ea.jsx)(Vl,{})," Ansluter till ","fortnox"===t?"Fortnox":"Visma","\u2026"]}):(0,Ea.jsxs)(Ea.Fragment,{children:["Anslut ","fortnox"===t?"Fortnox":"Visma"," ",(0,Ea.jsx)(Ya,{name:"arrow",size:18})]})}),(0,Ea.jsx)(Fa,{$variant:"ghost",$size:"md",onClick:()=>e("/"),children:"Tillbaka"})]}),(0,Ea.jsxs)(Hl,{children:["Genom att forts\xe4tta godk\xe4nner du v\xe5ra ",(0,Ea.jsx)("a",{href:"#villkor",style:{textDecoration:"underline"},children:"villkor"})," och v\xe5r ",(0,Ea.jsx)("a",{href:"#integritet",style:{textDecoration:"underline"},children:"integritetspolicy"}),"."]})]})})]})},Wl=wa`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`,Kl=wa`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.06); opacity: 1; }
`,ql=wa`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`,Yl=wa`
  0% { stroke-dashoffset: 380; }
  100% { stroke-dashoffset: 0; }
`,Ql=ba.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 50% 20%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,Gl=ba.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
`,Xl=ba.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin-bottom: 44px;
`,Jl=ba.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  circle.track {
    fill: none;
    stroke: ${e=>{let{theme:t}=e;return t.color.border}};
    stroke-width: 1.5;
  }
  circle.progress {
    fill: none;
    stroke: ${e=>{let{theme:t}=e;return t.color.brand}};
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-dasharray: 380;
    animation: ${Yl} 6s ease-in-out forwards;
    transform: rotate(-90deg);
    transform-origin: center;
  }
`,Zl=ba.div`
  position: absolute;
  inset: 0;
  animation: ${ql} 4s linear infinite;
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translate(-50%, -50%);
    width: 12px; height: 12px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 6px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,ei=ba.div`
  position: absolute;
  inset: 32px;
  border-radius: 50%;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  animation: ${Kl} 2.4s ease-in-out infinite;

  span {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 38px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-feature-settings: "tnum";
  }
`,ti=ba.h1`
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.02em;
  line-height: 1.1;
  max-width: 640px;
`,ni=ba.p`
  margin-top: 14px;
  font-size: 16px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 520px;
`,ri=ba.ul`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 460px;
`,ai=ba.li`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t,$state:n}=e;return"active"===n?t.color.surface:"transparent"}};
  border: 1px solid ${e=>{let{theme:t,$state:n}=e;return"active"===n?t.color.borderStrong:"transparent"}};
  text-align: left;
  animation: ${Wl} 0.4s ease both;

  div.idx {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${e=>{let{theme:t,$state:n}=e;return"done"===n?t.color.brand:"active"===n?t.color.brandSoft:t.color.surfaceAlt}};
    color: ${e=>{let{theme:t,$state:n}=e;return"done"===n?"#FAFAF7":t.color.muted}};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 12.5px;
    font-weight: 600;
  }
  div.label {
    flex: 1;
    font-size: 14.5px;
    font-weight: 500;
    color: ${e=>{let{theme:t,$state:n}=e;return"pending"===n?t.color.muted:t.color.ink}};
  }
  div.detail {
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-feature-settings: "tnum";
  }
`,li=[{label:"L\xe4ser leverant\xf6rsfakturor fr\xe5n Fortnox",target:412},{label:"Identifierar leverant\xf6rer & avtalstyper",target:38},{label:"J\xe4mf\xf6r mot branschindex (50 000+ SMB)",target:8},{label:"Sammanst\xe4ller dina besparingsm\xf6jligheter",target:8}],ii=()=>{const e=pe(),[t,n]=(0,r.useState)(0),[a,l]=(0,r.useState)(0),[i,o]=(0,r.useState)([0,0,0,0]);return(0,r.useEffect)(()=>{const e=performance.now();let t;const r=a=>{const l=Math.min(1,(a-e)/5500),i=1-Math.pow(1-l,3);n(Math.round(187340*i)),l<1&&(t=requestAnimationFrame(r))};return t=requestAnimationFrame(r),()=>cancelAnimationFrame(t)},[]),(0,r.useEffect)(()=>{const t=[];return li.forEach((e,n)=>{t.push(setTimeout(()=>l(n+1),700+1200*n)),t.push(setTimeout(()=>{o(t=>{const r=[...t];return r[n]=e.target,r})},1100+1200*n))}),t.push(setTimeout(()=>e("/insights"),6200)),()=>t.forEach(clearTimeout)},[e]),(0,Ea.jsxs)(Ql,{children:[(0,Ea.jsx)(Ia,{variant:"public"}),(0,Ea.jsxs)(Gl,{children:[(0,Ea.jsxs)(Xl,{children:[(0,Ea.jsxs)(Jl,{viewBox:"0 0 220 220",children:[(0,Ea.jsx)("circle",{className:"track",cx:"110",cy:"110",r:"100"}),(0,Ea.jsx)("circle",{className:"progress",cx:"110",cy:"110",r:"100"})]}),(0,Ea.jsx)(Zl,{}),(0,Ea.jsx)(ei,{children:(0,Ea.jsx)("span",{children:t.toLocaleString("sv-SE")})})]}),(0,Ea.jsx)(ti,{children:"Vi skannar din bokf\xf6ring just nu\u2026"}),(0,Ea.jsx)(ni,{children:"Arvo Flow analyserar dina leverant\xf6rsfakturor och hittar var du betalar \xf6ver marknadspris. Detta tar mindre \xe4n 30 sekunder."}),(0,Ea.jsx)(ri,{children:li.map((e,t)=>{const n=t<a?"done":t===a?"active":"pending";return(0,Ea.jsxs)(ai,{$state:n,children:[(0,Ea.jsx)("div",{className:"idx",children:"done"===n?(0,Ea.jsx)(Ya,{name:"check",size:14,stroke:2.5}):t+1}),(0,Ea.jsx)("div",{className:"label",children:e.label}),(0,Ea.jsx)("div",{className:"detail",children:i[t]>0?i[t].toLocaleString("sv-SE"):""})]},e.label)})})]})]})},oi="Lindberg VVS AB",si="556789-1234",ui=1247800,ci=187340,di=412,fi=38,pi=[{id:"insurance-foretag",category:"F\xf6retagsf\xf6rs\xe4kring",icon:"shield",currentSupplier:"Trygg-Hansa",currentAnnualCost:84600,suggestedSupplier:"If Skadef\xf6rs\xe4kring",suggestedAnnualCost:52400,savingPerYear:32200,confidence:"high",benchmark:{yourCost:84600,industryMedian:56800,industryLow:49200},contractEndsIn:41,cancellationNotice:30,why:"Ditt nuvarande premium ligger 49 % \xf6ver branschsnitt f\xf6r VVS-firmor med 10\u201320 anst\xe4llda. If erbjuder identiskt t\xe4ckningsomf\xe5ng, samma sj\xe4lvriskniv\xe5, men prissatt p\xe5 faktisk skadehistorik.",coverage:["Egendom 12 MSEK","Avbrott 3 m\xe5n","Ansvar 10 MSEK","R\xe4ttsskydd 5 prisbasbelopp"],switchSteps:["Vi f\xf6rbereder upps\xe4gning av nuvarande avtal","Du signerar nytt avtal med BankID","Vi koordinerar \xf6verg\xe5ngen utan avbrott i skydd"]},{id:"el",category:"Elavtal",icon:"bolt",currentSupplier:"Vattenfall (r\xf6rligt)",currentAnnualCost:218400,suggestedSupplier:"Tibber Pulse F\xf6retag",suggestedAnnualCost:162800,savingPerYear:55600,confidence:"high",benchmark:{yourCost:218400,industryMedian:168e3,industryLow:152e3},contractEndsIn:14,cancellationNotice:30,why:"Du betalar ett p\xe5slag p\xe5 12,4 \xf6re/kWh \u2014 Tibber tar 5,9 \xf6re med samma timdebitering. Med 247 MWh/\xe5r ger det 55 600 kr/\xe5r.",coverage:["Spotpris timme f\xf6r timme","Ingen bindningstid","F\xf6rbrukningsapp ing\xe5r"],switchSteps:["Vi s\xe4ger upp ditt nuvarande avtal","Tibber tar \xf6ver leverans n\xe4sta m\xe5nadsskifte","Inget str\xf6mavbrott \u2014 du m\xe4rker bara den l\xe4gre fakturan"]},{id:"mobil",category:"Mobilabonnemang",icon:"phone",currentSupplier:"Telia F\xf6retag",currentAnnualCost:38400,suggestedSupplier:"Tele2 F\xf6retag Obegr\xe4nsad",suggestedAnnualCost:22800,savingPerYear:15600,confidence:"high",benchmark:{yourCost:38400,industryMedian:26400,industryLow:21600},contractEndsIn:0,cancellationNotice:30,why:"14 abonnemang \xe1 229 kr/m\xe5n vs. Tele2:s 135 kr/m\xe5n med samma data och EU-roaming.",coverage:["Obegr\xe4nsat tal & SMS","50 GB data","EU-roaming ing\xe5r","F\xf6retagssupport"],switchSteps:["Vi s\xe4ger upp Telia-avtalen samordnat","Tele2 portar nummer utan avbrott","SIM-kort skickas med bud till kontoret"]},{id:"bredband",category:"F\xf6retagsbredband",icon:"wifi",currentSupplier:"Telenor Business 1000",currentAnnualCost:14988,suggestedSupplier:"Bahnhof F\xf6retag 1000",suggestedAnnualCost:8388,savingPerYear:6600,confidence:"medium",benchmark:{yourCost:14988,industryMedian:10800,industryLow:8388},contractEndsIn:67,cancellationNotice:30,why:"Identisk hastighet (1 Gbit) p\xe5 samma fiberinfrastruktur. Bahnhof har dessutom svensk support och b\xe4ttre SLA.",coverage:["1 Gbit symmetrisk","Statisk IPv4","SLA 99,9 %","Svensk support"],switchSteps:["Bahnhof best\xe4ller porting av befintlig fiber","\xd6verg\xe5ng inom 14 dagar","Vi s\xe4ger upp Telenor n\xe4r Bahnhof \xe4r live"]},{id:"kortterminal",category:"Kortterminal",icon:"card",currentSupplier:"Worldline (Bambora)",currentAnnualCost:27360,suggestedSupplier:"Zettle by PayPal",suggestedAnnualCost:13200,savingPerYear:14160,confidence:"medium",benchmark:{yourCost:27360,industryMedian:16800,industryLow:11400},contractEndsIn:92,cancellationNotice:30,why:"Du betalar 1,95 % per transaktion vs. Zettles 1,25 %. Vid 1,9 MSEK kortvolym/\xe5r = 13 300 kr i ren avgift\xadbesparing + l\xe4gre m\xe5nadsavgift.",coverage:["Kortavgift 1,25 %","Ingen m\xe5nadsavgift","Utbetalning inom 1 dag"],switchSteps:["Ny terminal levereras inom 3 dagar","Vi s\xe4ger upp Worldline n\xe4r allt \xe4r testat","Bokf\xf6ring i Fortnox uppdateras automatiskt"]},{id:"saas-bokforing",category:"Fakturatj\xe4nst",icon:"file",currentSupplier:"Kivra F\xf6retag Premium",currentAnnualCost:8940,suggestedSupplier:"Direkt via Fortnox e-faktura",suggestedAnnualCost:1740,savingPerYear:7200,confidence:"high",benchmark:{yourCost:8940,industryMedian:2400,industryLow:1740},contractEndsIn:0,cancellationNotice:0,why:"Du betalar f\xf6r utskick via Kivra som Fortnox redan st\xf6djer inbyggt. Ingen funktionsf\xf6rlust, samma mottagare.",coverage:["Obegr\xe4nsade e-fakturor","P\xe5minnelser ing\xe5r","PDF-arkiv 7 \xe5r"],switchSteps:["Vi aktiverar Fortnox e-faktura","Befintliga mottagare migreras automatiskt","Kivra-abonnemanget s\xe4gs upp"]},{id:"forsakring-ansvar",category:"Yrkesansvarsf\xf6rs\xe4kring",icon:"briefcase",currentSupplier:"L\xe4nsf\xf6rs\xe4kringar",currentAnnualCost:26400,suggestedSupplier:"Gjensidige F\xf6retag",suggestedAnnualCost:19800,savingPerYear:6600,confidence:"medium",benchmark:{yourCost:26400,industryMedian:21600,industryLow:18400},contractEndsIn:122,cancellationNotice:60,why:"Samma f\xf6rs\xe4kringsbelopp (10 MSEK) men prissatt p\xe5 branschspecifik skadestatistik f\xf6r VVS.",coverage:["10 MSEK","Tillkommande skydd VVS","R\xe4ttsskydd ing\xe5r"],switchSteps:["Vi f\xf6rbereder nytt avtal hos Gjensidige","Du signerar med BankID","\xd6verg\xe5ng samordnas vid avtalsslut"]},{id:"leasing-bil",category:"F\xf6retagsleasing",icon:"truck",currentSupplier:"ALD Automotive",currentAnnualCost:412800,suggestedSupplier:"Arval Sverige",suggestedAnnualCost:363200,savingPerYear:49600,confidence:"medium",benchmark:{yourCost:412800,industryMedian:384e3,industryLow:348e3},contractEndsIn:184,cancellationNotice:90,why:"8 servicebilar med samma specifikation kostar 11 % mindre hos Arval just nu \u2014 restv\xe4rden r\xe4knade.",coverage:["Full service","Vinterd\xe4ck","F\xf6rs\xe4kring","H\xe4mtning vid skada"],switchSteps:["Vi f\xf6rbereder nya leasingavtal vid avtalsslut","Inget byte under p\xe5g\xe5ende leasing","Bilarna ers\xe4tts succesivt under 6 m\xe5n"]}],hi=[{week:1,label:"Ig\xe5ng",status:"completed",detail:"Fortnox kopplat"},{week:1,label:"Besparingar identifierade",status:"completed",detail:"8 m\xf6jligheter, 187 340 kr/\xe5r"},{week:2,label:"F\xf6rsta byte godk\xe4nt",status:"current",detail:"Vi v\xe4ntar p\xe5 dig"},{week:4,label:"F\xf6rsta besparing utbetald",status:"pending",detail:"Cirka 4 veckor efter aktivering"},{week:12,label:"Kvartalsrapport",status:"pending",detail:"Ny scanning + nya f\xf6rslag"}],mi=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e)+" kr",gi=wa`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,vi=ba.main`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,bi=ba.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 40px 28px 80px;
  @media (max-width: 740px) { padding: 24px 18px 60px; }
`,yi=ba.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  animation: ${gi} 0.5s ease both;

  div.left small {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  div.left h1 {
    margin-top: 6px;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  div.right {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-size: 13.5px;
  }
  div.right span.live {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-size: 12.5px;
    font-weight: 600;
  }
  div.right span.live::before {
    content: '';
    width: 6px; height: 6px; border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px rgba(15, 81, 50, 0.18);
  }
`,xi=ba.section`
  margin-top: 32px;
  background: ${e=>{let{theme:t}=e;return t.color.ink}};
  color: #FAFAF7;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px 40px;
  position: relative;
  overflow: hidden;
  animation: ${gi} 0.6s 0.05s ease both;
  @media (max-width: 740px) { padding: 32px 24px; }

  &::before {
    content: '';
    position: absolute;
    top: -30%; right: -10%;
    width: 60%; height: 180%;
    background: radial-gradient(circle, rgba(200, 128, 74, 0.18), transparent 60%);
    pointer-events: none;
  }
`,ki=ba.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: end;
  @media (max-width: 740px) { grid-template-columns: 1fr; gap: 24px; }
`,wi=ba.div`
  span.kicker {
    color: rgba(250, 250, 247, 0.7);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  div.amount {
    margin-top: 14px;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(56px, 9vw, 96px);
    line-height: 1;
    letter-spacing: -0.03em;
    font-weight: 500;
    font-feature-settings: "tnum";
    em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.accent}}; font-weight: 400; }
  }
  span.unit {
    font-size: 18px;
    color: rgba(250, 250, 247, 0.6);
    margin-left: 12px;
  }
  p {
    margin-top: 18px;
    font-size: 15px;
    color: rgba(250, 250, 247, 0.75);
    line-height: 1.55;
    max-width: 400px;
  }
`,Si=ba.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-top: 1px solid rgba(250, 250, 247, 0.12);
  padding-top: 24px;

  div { }
  dt {
    font-size: 12px;
    color: rgba(250, 250, 247, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  dd {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 24px;
    font-weight: 500;
    color: #FAFAF7;
    font-feature-settings: "tnum";
  }
`,ji=ba.section`
  margin-top: 56px;
  animation: ${gi} 0.6s 0.15s ease both;

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  header h2 {
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  header p {
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  header div.filters {
    display: flex;
    gap: 6px;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    padding: 4px;
  }
  header button {
    padding: 8px 14px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-size: 13px;
    font-weight: 500;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    transition: all ${e=>{let{theme:t}=e;return t.motion.fast}};
  }
  header button.active {
    background: ${e=>{let{theme:t}=e;return t.color.ink}};
    color: #FAFAF7;
  }
`,Ei=ba.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`,$i=ba.button`
  text-align: left;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 24px;
  cursor: pointer;
  transition: transform ${e=>{let{theme:t}=e;return t.motion.base}}, box-shadow ${e=>{let{theme:t}=e;return t.motion.base}}, border-color ${e=>{let{theme:t}=e;return t.motion.base}};
  display: flex;
  flex-direction: column;
  gap: 18px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
    border-color: ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  }
`,Ci=ba.div`
  display: flex;
  align-items: center;
  gap: 14px;

  div.icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  div.text { flex: 1; min-width: 0; }
  span.cat {
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }
  strong {
    display: block;
    margin-top: 4px;
    font-size: 16.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span.confidence {
    font-size: 11.5px;
    padding: 4px 8px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-weight: 600;
    background: ${e=>{let{theme:t,$high:n}=e;return n?t.color.brandSoft:t.color.warningSoft}};
    color: ${e=>{let{theme:t,$high:n}=e;return n?t.color.brand:t.color.warning}};
  }
`,zi=ba.div`
  div.amount {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 36px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.success}};
    font-feature-settings: "tnum";
  }
  div.unit {
    margin-top: 4px;
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
`,_i=ba.div`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.delta {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    span { color: ${e=>{let{theme:t}=e;return t.color.ink}}; font-weight: 600; }
  }
  div.cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
`,Ni=ba.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};

  div { font-size: 12.5px; }
  div span { display: block; color: ${e=>{let{theme:t}=e;return t.color.muted}}; }
  div strong {
    display: block;
    font-size: 15px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin-top: 3px;
    font-feature-settings: "tnum";
  }
  div.right strong { color: ${e=>{let{theme:t}=e;return t.color.success}}; }
`,Pi=ba.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px;
`,Ti=ba.ol`
  position: relative;
  padding-left: 20px;
  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 1.5px;
    background: ${e=>{let{theme:t}=e;return t.color.border}};
  }
`,Ai=ba.li`
  position: relative;
  padding: 12px 0 12px 24px;

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 18px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: ${e=>{let{theme:t,$state:n}=e;return"completed"===n?t.color.brand:t.color.surface}};
    border: 2px solid ${e=>{let{theme:t,$state:n}=e;return"completed"===n||"current"===n?t.color.brand:t.color.border}};
    box-shadow: ${e=>{let{theme:t,$state:n}=e;return"current"===n?`0 0 0 5px ${t.color.brandSoft}`:"none"}};
  }
  div.label {
    font-size: 14.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  div.detail {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-top: 2px;
  }
  div.week {
    position: absolute;
    right: 0;
    top: 12px;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-feature-settings: "tnum";
  }
`,Fi=[{id:"all",label:"Alla"},{id:"high",label:"H\xf6g s\xe4kerhet"},{id:"urgent",label:"Br\xe5dskande"}],Ri=()=>{const e=pe(),[t,n]=(0,r.useState)("all"),[a,l]=(0,r.useState)(0);(0,r.useEffect)(()=>{const e=ci,t=performance.now();let n;const r=a=>{const i=Math.min(1,(a-t)/1400),o=1-Math.pow(1-i,3);l(Math.round(o*e)),i<1&&(n=requestAnimationFrame(r))};return n=requestAnimationFrame(r),()=>cancelAnimationFrame(n)},[]);const i=(0,r.useMemo)(()=>"high"===t?pi.filter(e=>"high"===e.confidence):"urgent"===t?pi.filter(e=>e.contractEndsIn<60):pi,[t]);return(0,Ea.jsxs)(vi,{children:[(0,Ea.jsx)(Ia,{variant:"app"}),(0,Ea.jsxs)(bi,{children:[(0,Ea.jsxs)(yi,{children:[(0,Ea.jsxs)("div",{className:"left",children:[(0,Ea.jsxs)("small",{children:[oi," \xb7 Org ",si]}),(0,Ea.jsx)("h1",{children:"God morgon, Johan."})]}),(0,Ea.jsx)("div",{className:"right",children:(0,Ea.jsx)("span",{className:"live",children:"Scanning klar 09:14"})})]}),(0,Ea.jsx)(xi,{children:(0,Ea.jsxs)(ki,{children:[(0,Ea.jsxs)(wi,{children:[(0,Ea.jsx)("span",{className:"kicker",children:"Identifierad besparing \xe5r 1"}),(0,Ea.jsxs)("div",{className:"amount tabular",children:[(0,Ea.jsx)("em",{children:a.toLocaleString("sv-SE")}),(0,Ea.jsx)("span",{className:"unit",children:"kr"})]}),(0,Ea.jsxs)("p",{children:["Vi gick igenom ",di," leverant\xf6rsfakturor fr\xe5n"," ",fi," olika leverant\xf6rer det senaste \xe5ret och hittade"," ",pi.length," tydliga bytesm\xf6jligheter. Du kan godk\xe4nna varje ett separat med BankID \u2014 ingen leverant\xf6r byts utan din signatur."]})]}),(0,Ea.jsxs)(Si,{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("dt",{children:"Total leverant\xf6rskostnad / \xe5r"}),(0,Ea.jsx)("dd",{children:mi(ui)})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("dt",{children:"Andel av kostnad du sparar"}),(0,Ea.jsxs)("dd",{children:[Math.round(ci/ui*100)," %"]})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("dt",{children:"Fakturor analyserade"}),(0,Ea.jsx)("dd",{children:di})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("dt",{children:"Leverant\xf6rer scannade"}),(0,Ea.jsx)("dd",{children:fi})]})]})]})}),(0,Ea.jsxs)(ji,{children:[(0,Ea.jsxs)("header",{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("h2",{children:"Dina besparingsm\xf6jligheter"}),(0,Ea.jsx)("p",{children:"Sorterade efter besparing per \xe5r. Klicka f\xf6r detaljer + signera bytet."})]}),(0,Ea.jsx)("div",{className:"filters",children:Fi.map(e=>(0,Ea.jsx)("button",{className:t===e.id?"active":"",onClick:()=>n(e.id),children:e.label},e.id))})]}),(0,Ea.jsx)(Ei,{children:i.map(t=>(0,Ea.jsxs)($i,{onClick:()=>e(`/opportunity/${t.id}`),children:[(0,Ea.jsxs)(Ci,{$high:"high"===t.confidence,children:[(0,Ea.jsx)("div",{className:"icon",children:(0,Ea.jsx)(Ya,{name:t.icon,size:22})}),(0,Ea.jsxs)("div",{className:"text",children:[(0,Ea.jsx)("span",{className:"cat",children:t.category}),(0,Ea.jsx)("strong",{children:t.suggestedSupplier})]}),(0,Ea.jsx)("span",{className:"confidence",children:"high"===t.confidence?"H\xf6g":"Medel"})]}),(0,Ea.jsxs)(zi,{children:[(0,Ea.jsxs)("div",{className:"amount",children:["+",t.savingPerYear.toLocaleString("sv-SE")," kr"]}),(0,Ea.jsxs)("div",{className:"unit",children:["\xe5rlig besparing \xb7 ",Math.round(t.savingPerYear/t.currentAnnualCost*100)," % l\xe4gre kostnad"]})]}),(0,Ea.jsxs)(Ni,{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("span",{children:"Idag"}),(0,Ea.jsx)("strong",{children:mi(t.currentAnnualCost)})]}),(0,Ea.jsx)(Ya,{name:"arrow",size:18}),(0,Ea.jsxs)("div",{className:"right",children:[(0,Ea.jsx)("span",{children:"Med Arvo"}),(0,Ea.jsx)("strong",{children:mi(t.suggestedAnnualCost)})]})]}),(0,Ea.jsxs)(_i,{children:[(0,Ea.jsx)("div",{className:"delta",children:0===t.contractEndsIn?(0,Ea.jsxs)(Ea.Fragment,{children:["Avtalet kan s\xe4gas upp ",(0,Ea.jsx)("span",{children:"nu"})]}):(0,Ea.jsxs)(Ea.Fragment,{children:["Avtal l\xf6per i ",(0,Ea.jsxs)("span",{children:[t.contractEndsIn," dgr"]})]})}),(0,Ea.jsxs)("div",{className:"cta",children:["Granska ",(0,Ea.jsx)(Ya,{name:"arrow",size:14})]})]})]},t.id))})]}),(0,Ea.jsxs)(ji,{children:[(0,Ea.jsx)("header",{children:(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("h2",{children:"Din resa med Arvo"}),(0,Ea.jsx)("p",{children:"S\xe5 h\xe4r ser tidslinjen ut \u2014 vi f\xf6ljer upp varje vecka och rapporterar."})]})}),(0,Ea.jsx)(Pi,{children:(0,Ea.jsx)(Ti,{children:hi.map((e,t)=>(0,Ea.jsxs)(Ai,{$state:e.status,children:[(0,Ea.jsx)("div",{className:"label",children:e.label}),(0,Ea.jsx)("div",{className:"detail",children:e.detail}),(0,Ea.jsxs)("div",{className:"week",children:["v ",e.week]})]},t))})})]})]}),(0,Ea.jsx)(Ka,{})]})},Oi=wa`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,Li=wa`
  0%, 100% { box-shadow: 0 0 0 0 rgba(15, 81, 50, 0.5); }
  50% { box-shadow: 0 0 0 14px rgba(15, 81, 50, 0); }
`,Di=ba.main`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,Mi=ba.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.containerNarrow}};
  margin: 0 auto;
  padding: 32px 28px 80px;
  @media (max-width: 740px) { padding: 20px 18px 60px; }
`,Ii=ba.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin-bottom: 24px;
  transition: color ${e=>{let{theme:t}=e;return t.motion.fast}};
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`,Hi=ba.header`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;
  padding-bottom: 24px;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  animation: ${Oi} 0.5s ease both;

  @media (max-width: 740px) { grid-template-columns: 1fr; }
`,Bi=ba.div`
  div.tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  h1 {
    margin-top: 16px;
    font-size: clamp(34px, 4vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p.lede {
    margin-top: 14px;
    font-size: 16.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    max-width: 540px;
    line-height: 1.5;
  }
`,Vi=ba.aside`
  text-align: right;
  div.kicker {
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  div.amount {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 56px;
    line-height: 1;
    letter-spacing: -0.025em;
    color: ${e=>{let{theme:t}=e;return t.color.success}};
    font-feature-settings: "tnum";
    margin-top: 6px;
  }
  div.unit {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-top: 6px;
  }
`,Ui=ba.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 28px;
  align-items: start;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`,Wi=ba.section`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px;
  animation: ${Oi} 0.5s 0.1s ease both;
  & + & { margin-top: 16px; }

  h3 {
    font-size: 19px;
    line-height: 1.3;
  }
  h3 + p { margin-top: 8px; font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; line-height: 1.55; }
`,Ki=ba.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 90px;
  @media (max-width: 860px) { position: static; }
`,qi=ba.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`,Yi=ba.div`
  border: 1px solid ${e=>{let{theme:t,$best:n}=e;return n?t.color.brand:t.color.border}};
  background: ${e=>{let{theme:t,$best:n}=e;return n?t.color.brandSoft:t.color.surface}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 20px;
  position: relative;

  span.lbl {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  strong.name {
    display: block;
    margin-top: 8px;
    font-size: 17px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }
  div.cost {
    margin-top: 14px;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 28px;
    line-height: 1;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-feature-settings: "tnum";
    letter-spacing: -0.02em;
  }
  div.unit {
    margin-top: 4px;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  span.badge {
    position: absolute;
    top: -10px; right: 14px;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    font-size: 11px;
    padding: 4px 10px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`,Qi=ba.div`
  margin-top: 20px;

  div.legend {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-bottom: 10px;
  }
  div.track {
    position: relative;
    height: 8px;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
  }
  div.median {
    position: absolute;
    top: -5px;
    width: 2px;
    height: 18px;
    background: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  div.you {
    position: absolute;
    top: -8px;
    width: 14px; height: 24px;
    border-radius: 6px;
    background: ${e=>{let{theme:t}=e;return t.color.danger}};
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FAFAF7;
    font-size: 10px;
    font-weight: 700;
  }
  div.suggested {
    position: absolute;
    top: -8px;
    width: 14px; height: 24px;
    border-radius: 6px;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    transform: translateX(-50%);
  }
  div.labels {
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  div.labels strong {
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    display: block;
    margin-top: 2px;
    font-size: 13px;
    font-feature-settings: "tnum";
  }
`,Gi=ba.div`
  margin-top: 22px;
  padding: 18px 20px;
  border-left: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  border-radius: 0 ${e=>{let{theme:t}=e;return t.size.radius.md}} ${e=>{let{theme:t}=e;return t.size.radius.md}} 0;

  span {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }
  p {
    color: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    font-size: 14.5px;
    line-height: 1.6;
  }
`,Xi=ba.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }

  li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 13.5px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  li svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
`,Ji=ba.ol`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`,Zi=ba.li`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 14px;
  align-items: flex-start;

  div.idx {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    flex-shrink: 0;
    margin-top: 2px;
  }
  div.text {
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    line-height: 1.5;
  }
`,eo=ba(Wi)`
  background: ${e=>{let{theme:t}=e;return t.color.ink}};
  color: #FAFAF7;
  border-color: ${e=>{let{theme:t}=e;return t.color.ink}};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%; right: -30%;
    width: 80%; height: 200%;
    background: radial-gradient(circle, rgba(200, 128, 74, 0.15), transparent 60%);
    pointer-events: none;
  }
  h3 { color: #FAFAF7; position: relative; }
  p { color: rgba(250, 250, 247, 0.75); position: relative; }
`,to=ba.dl`
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(250, 250, 247, 0.12);
  }
  div:last-child { border-bottom: none; }
  dt {
    font-size: 13px;
    color: rgba(250, 250, 247, 0.7);
  }
  dd {
    font-size: 14px;
    font-weight: 600;
    color: #FAFAF7;
    font-feature-settings: "tnum";
  }
`,no=ba.div`
  position: relative;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,ro=ba.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 56px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.brand}};
  color: #FAFAF7;
  font-size: 15.5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  animation: ${Li} 2.4s ease-in-out infinite;
  transition: transform ${e=>{let{theme:t}=e;return t.motion.fast}};
  &:hover { transform: translateY(-1px); }
`,ao=ba.p`
  position: relative;
  font-size: 12px;
  color: rgba(250, 250, 247, 0.6);
  margin-top: 8px;
  text-align: center;
`,lo=ba.a`
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 18px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  font-size: 14.5px;
  font-weight: 500;
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}};
  &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
`,io=ba.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 14, 0.55);
  backdrop-filter: blur(6px);
  z-index: ${e=>{let{theme:t}=e;return t.z.modal}};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadein 0.25s ease;

  @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
`,oo=ba.div`
  width: 100%;
  max-width: 460px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 40px 32px;
  text-align: center;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};

  h3 {
    font-size: 28px;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 10px;
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.55;
  }

  div.bankid {
    width: 80px; height: 80px;
    margin: 0 auto 22px;
    border-radius: 20px;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 38px;
    font-weight: 700;
  }
  div.success {
    width: 80px; height: 80px;
    margin: 0 auto 22px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div.dots {
    margin-top: 24px;
    display: flex;
    gap: 8px;
    justify-content: center;
  }
  div.dots span {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    opacity: 0.3;
    animation: bounce 1.2s ease-in-out infinite;
  }
  div.dots span:nth-child(2) { animation-delay: 0.15s; }
  div.dots span:nth-child(3) { animation-delay: 0.3s; }
  @keyframes bounce {
    0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
    40% { opacity: 1; transform: translateY(-4px); }
  }
`,so=()=>{const{id:e}=he(),t=pe(),n=pi.find(t=>t.id===e),[a,l]=(0,r.useState)("idle");if(!n)return(0,Ea.jsxs)(Di,{children:[(0,Ea.jsx)(Ia,{variant:"app"}),(0,Ea.jsxs)(Mi,{children:[(0,Ea.jsx)("p",{children:"M\xf6jligheten kunde inte hittas."}),(0,Ea.jsx)(Fa,{onClick:()=>t("/insights"),$variant:"secondary",children:"Tillbaka"})]})]});const i=n.benchmark.yourCost-n.benchmark.industryLow,o=e=>Math.max(2,Math.min(98,(e-n.benchmark.industryLow)/i*100)),s=o(n.benchmark.yourCost),u=o(n.benchmark.industryMedian),c=o(n.suggestedAnnualCost);return(0,Ea.jsxs)(Di,{children:[(0,Ea.jsx)(Ia,{variant:"app"}),(0,Ea.jsxs)(Mi,{children:[(0,Ea.jsxs)(Ii,{onClick:()=>t("/insights"),children:[(0,Ea.jsx)(Ya,{name:"arrow",size:14,stroke:2,style:{transform:"rotate(180deg)"}}),"Tillbaka till insikter"]}),(0,Ea.jsxs)(Hi,{children:[(0,Ea.jsxs)(Bi,{children:[(0,Ea.jsxs)("div",{className:"tag",children:[(0,Ea.jsx)(Ya,{name:n.icon,size:14,stroke:2.2}),n.category]}),(0,Ea.jsxs)("h1",{children:["Byt till ",n.suggestedSupplier,".",(0,Ea.jsx)("br",{}),"Spara ",mi(n.savingPerYear)," per \xe5r."]}),(0,Ea.jsx)("p",{className:"lede",children:n.why})]}),(0,Ea.jsxs)(Vi,{children:[(0,Ea.jsx)("div",{className:"kicker",children:"Besparing \xe5r 1"}),(0,Ea.jsxs)("div",{className:"amount",children:["+",n.savingPerYear.toLocaleString("sv-SE")]}),(0,Ea.jsxs)("div",{className:"unit",children:["kr \xb7 ",Math.round(n.savingPerYear/n.currentAnnualCost*100)," % l\xe4gre kostnad"]})]})]}),(0,Ea.jsxs)(Ui,{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsxs)(Wi,{children:[(0,Ea.jsx)("h3",{children:"Sida vid sida"}),(0,Ea.jsx)("p",{children:"Identiskt t\xe4ckningsomf\xe5ng och serviceniv\xe5 \u2014 bara ett b\xe4ttre pris."}),(0,Ea.jsxs)(qi,{children:[(0,Ea.jsxs)(Yi,{children:[(0,Ea.jsx)("span",{className:"lbl",children:"Idag"}),(0,Ea.jsx)("strong",{className:"name",children:n.currentSupplier}),(0,Ea.jsx)("div",{className:"cost",children:mi(n.currentAnnualCost)}),(0,Ea.jsx)("div",{className:"unit",children:"per \xe5r"})]}),(0,Ea.jsxs)(Yi,{$best:!0,children:[(0,Ea.jsx)("span",{className:"badge",children:"Rekommenderad"}),(0,Ea.jsx)("span",{className:"lbl",children:"Med Arvo Flow"}),(0,Ea.jsx)("strong",{className:"name",children:n.suggestedSupplier}),(0,Ea.jsx)("div",{className:"cost",children:mi(n.suggestedAnnualCost)}),(0,Ea.jsxs)("div",{className:"unit",children:["per \xe5r \xb7 spara ",mi(n.savingPerYear)]})]})]}),(0,Ea.jsxs)(Qi,{children:[(0,Ea.jsxs)("div",{className:"legend",children:[(0,Ea.jsx)("span",{children:"Branschens l\xe4gsta"}),(0,Ea.jsx)("span",{children:"Du betalar idag"})]}),(0,Ea.jsxs)("div",{className:"track",children:[(0,Ea.jsx)("div",{className:"suggested",style:{left:`${c}%`}}),(0,Ea.jsx)("div",{className:"median",style:{left:`${Math.max(20,Math.min(80,u))}%`}}),(0,Ea.jsx)("div",{className:"you",style:{left:`${s}%`},children:"!"})]}),(0,Ea.jsxs)("div",{className:"labels",children:[(0,Ea.jsxs)("span",{children:["L\xe4gsta",(0,Ea.jsx)("strong",{children:mi(n.benchmark.industryLow)})]}),(0,Ea.jsxs)("span",{children:["Branschsnitt",(0,Ea.jsx)("strong",{children:mi(n.benchmark.industryMedian)})]}),(0,Ea.jsxs)("span",{children:["Du",(0,Ea.jsx)("strong",{children:mi(n.benchmark.yourCost)})]})]})]}),(0,Ea.jsxs)(Gi,{children:[(0,Ea.jsx)("span",{children:"Varf\xf6r Arvo rekommenderar bytet"}),(0,Ea.jsx)("p",{children:n.why})]})]}),(0,Ea.jsxs)(Wi,{children:[(0,Ea.jsxs)("h3",{children:["Vad du f\xe5r hos ",n.suggestedSupplier]}),(0,Ea.jsx)("p",{children:"Vi har verifierat att t\xe4ckning och serviceniv\xe5 motsvarar eller \xf6vertr\xe4ffar ditt nuvarande avtal."}),(0,Ea.jsx)(Xi,{children:n.coverage.map(e=>(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:16,stroke:2.2})," ",e]},e))})]}),(0,Ea.jsxs)(Wi,{children:[(0,Ea.jsx)("h3",{children:"S\xe5 g\xe5r bytet till"}),(0,Ea.jsx)("p",{children:"Arvo f\xf6rbereder allt \u2014 du signerar med BankID och vi sk\xf6ter resten."}),(0,Ea.jsx)(Ji,{children:n.switchSteps.map((e,t)=>(0,Ea.jsxs)(Zi,{children:[(0,Ea.jsx)("div",{className:"idx",children:t+1}),(0,Ea.jsx)("div",{className:"text",children:e})]},t))})]})]}),(0,Ea.jsxs)(Ki,{children:[(0,Ea.jsxs)(eo,{children:[(0,Ea.jsx)("h3",{children:"Godk\xe4nn bytet"}),(0,Ea.jsx)("p",{children:"Vi f\xf6rbereder allt och hanterar \xf6verg\xe5ngen. Du signerar med BankID och kan \xe5ngra inom 14 dagar utan kostnad."}),(0,Ea.jsxs)(to,{children:[(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("dt",{children:"Besparing \xe5r 1"}),(0,Ea.jsx)("dd",{children:mi(n.savingPerYear)})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("dt",{children:"Avtalstid kvar"}),(0,Ea.jsx)("dd",{children:0===n.contractEndsIn?"Kan s\xe4gas upp nu":`${n.contractEndsIn} dagar`})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("dt",{children:"Upps\xe4gningstid"}),(0,Ea.jsxs)("dd",{children:[n.cancellationNotice," dagar"]})]}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("dt",{children:"V\xe5r avgift"}),(0,Ea.jsx)("dd",{children:mi(Math.round(.2*n.savingPerYear))})]})]}),(0,Ea.jsxs)(no,{children:[(0,Ea.jsxs)(ro,{onClick:()=>{l("signing"),setTimeout(()=>l("done"),2400)},children:[(0,Ea.jsx)(Ya,{name:"bankid",size:20,stroke:2,color:"#FAFAF7"}),"Signera med BankID"]}),(0,Ea.jsx)(Fa,{as:"a",href:"#",$variant:"ghostInverse",$size:"md",children:"Spara till senare"})]}),(0,Ea.jsx)(ao,{children:"14 dagars \xe5ngerr\xe4tt. Prisgaranti 12 m\xe5nader. Du kan koppla bort Arvo Flow n\xe4r som helst."})]}),(0,Ea.jsxs)(Wi,{children:[(0,Ea.jsx)("h3",{children:"Beh\xf6ver du fundera?"}),(0,Ea.jsx)("p",{children:"Vi mejlar dig sammanfattningen s\xe5 du kan st\xe4mma av med din bokf\xf6rings\xadkonsult eller styrelse. Bytet utf\xf6rs aldrig utan din BankID-signatur."}),(0,Ea.jsx)(lo,{as:"a",href:"#",$variant:"secondary",$size:"md",children:"Mejla mig sammanfattningen"})]})]})]})]}),"signing"===a&&(0,Ea.jsx)(io,{children:(0,Ea.jsxs)(oo,{children:[(0,Ea.jsx)("div",{className:"bankid",children:"B"}),(0,Ea.jsx)("h3",{children:"\xd6ppna BankID-appen"}),(0,Ea.jsx)("p",{children:"Vi har skickat en signeringsbeg\xe4ran till ditt BankID. \xd6ppna appen och bekr\xe4fta."}),(0,Ea.jsxs)("div",{className:"dots",children:[(0,Ea.jsx)("span",{}),(0,Ea.jsx)("span",{}),(0,Ea.jsx)("span",{})]})]})}),"done"===a&&(0,Ea.jsx)(io,{children:(0,Ea.jsxs)(oo,{children:[(0,Ea.jsx)("div",{className:"success",children:(0,Ea.jsx)(Ya,{name:"check",size:36,stroke:2.5,color:"#0F5132"})}),(0,Ea.jsx)("h3",{children:"Bytet \xe4r ig\xe5ngsatt."}),(0,Ea.jsxs)("p",{children:["Vi har skickat upps\xe4gningen till ",n.currentSupplier," och tecknat det nya avtalet hos"," ",n.suggestedSupplier,". Du f\xe5r en bekr\xe4ftelse p\xe5 mejl inom kort."]}),(0,Ea.jsx)("div",{style:{marginTop:28,display:"flex",flexDirection:"column",gap:10},children:(0,Ea.jsx)(Fa,{onClick:()=>{l("idle"),t("/insights")},$variant:"primary",$size:"md",$full:!0,children:"Tillbaka till insikter"})})]})}),(0,Ea.jsx)(Ka,{})]})},uo=wa`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,co=ba.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,fo=ba.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 96px 28px 56px;
  text-align: center;
  animation: ${uo} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 32px; }
`,po=ba.span`
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
`,ho=ba.h1`
  margin-top: 22px;
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,mo=ba.p`
  margin: 22px auto 0;
  max-width: 640px;
  font-size: 18px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.55;
`,go=ba.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 28px;
  @media (max-width: 740px) { padding: 32px 20px; }
`,vo=ba.div`
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
`,bo=ba.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,yo=ba.div`
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
`,xo=ba.h2`
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
`,ko=ba.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin-bottom: 12px;
`,wo=ba.p`
  font-size: 16.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 640px;
  line-height: 1.55;
  margin-bottom: 32px;
`,So=ba.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
`,jo=ba.div`
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
`,Eo=ba.section`
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
`,$o=[{cat:"F\xf6retagsf\xf6rs\xe4kring",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Elavtal",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Mobilabonnemang",detail:"Per abonnemang som flyttas",cap:"120 kr"},{cat:"F\xf6retagsbredband",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Kortterminal",detail:"Per genomf\xf6rt byte",cap:"400 kr"},{cat:"Fakturatj\xe4nst",detail:"Per genomf\xf6rt byte",cap:"300 kr"},{cat:"Yrkesansvarsf\xf6rs\xe4kring",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"F\xf6retagsleasing",detail:"Per genomf\xf6rt byte",cap:"500 kr"}],Co=()=>(0,Ea.jsxs)(co,{children:[(0,Ea.jsx)(Ia,{variant:"public"}),(0,Ea.jsxs)(fo,{children:[(0,Ea.jsxs)(po,{children:[(0,Ea.jsx)("span",{className:"dot"})," Rankningspolicy \xb7 Senast uppdaterad 2026-04-24"]}),(0,Ea.jsxs)(ho,{children:["Vi rankar leverant\xf6rer p\xe5 ",(0,Ea.jsx)("em",{children:"din"})," totalkostnad \u2014 inte v\xe5r provision."]}),(0,Ea.jsx)(mo,{children:'Det h\xe4r \xe4r hela v\xe5r policy. Inga undantag, inga gr\xe5zoner, inga "premium-partners". Om en journalist en dag granskar oss vill vi att de hittar exakt det vi skrev h\xe4r.'})]}),(0,Ea.jsxs)(go,{children:[(0,Ea.jsx)(ko,{children:"De fyra reglerna"}),(0,Ea.jsx)(xo,{children:"Hur vi f\xf6rhindrar bias fr\xe5n dag 1."}),(0,Ea.jsx)(wo,{children:"Affiliate-int\xe4kter \xe4r bra f\xf6r aff\xe4rsmodellen \u2014 men en uppenbar intressekonflikt mot kunden. Vi l\xf6ste det strukturellt, inte bara i marknadsf\xf6ringstexten."}),(0,Ea.jsxs)(vo,{children:[(0,Ea.jsx)("div",{className:"num",children:"1"}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("h3",{children:"V\xe5r algoritm \xe4r publik. Och deterministisk."}),(0,Ea.jsxs)("p",{children:["Vi rankar varje f\xf6rslag p\xe5 ",(0,Ea.jsx)("strong",{children:"total cost of ownership \xf6ver 24 m\xe5nader minus switching cost"}),". Den som ger dig flest kronor \xf6ver p\xe5 kontot vinner \u2014 alltid. Affiliate-storlek \xe4r inte ett ing\xe5ngsv\xe4rde i scoring-funktionen."]}),(0,Ea.jsxs)("pre",{children:["score(provider) =\n    annualCost(provider) * 2\n  + switchingCost(provider)        // eng\xe5ngskostnader, etablering, portering\n  - reliabilityBonus(provider)     // SLA, supportkvalitet (publik benchmark)\n  - coverageMatch(provider)        // % av nuvarande t\xe4ckning som beh\xe5lls\n\n",(0,Ea.jsx)("b",{children:"// Affiliate-rate \xe4r aldrig en variabel i scoringen.\n// L\xe4gst score vinner. Vid likast\xe5nd: l\xe4gst nominellt pris f\xf6r dig."})]})]})]}),(0,Ea.jsxs)(vo,{children:[(0,Ea.jsx)("div",{className:"num",children:"2"}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("h3",{children:"Affiliate-int\xe4kten \xe4r kapad \u2014 \xf6verskott g\xe5r till dig."}),(0,Ea.jsx)("p",{children:"Vi accepterar en fast, kapad affiliate-avgift per leverant\xf6rskategori (se tabellen nedan). Om en leverant\xf6r vill betala mer f\xf6r att vinna oftare \u2014 d\xe5 har vi inte r\xe4tten att tj\xe4na mer p\xe5 det. \xd6verskottet l\xe4ggs i en kundbonus-pool och rabatteras tillbaka som l\xe4gre success-fee n\xe4sta kvartal."})]})]}),(0,Ea.jsxs)(vo,{children:[(0,Ea.jsx)("div",{className:"num",children:"3"}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("h3",{children:"Du v\xe4ljer modell vid onboarding."}),(0,Ea.jsx)("p",{children:"Vi tror p\xe5 radikal transparens, men vi vill inte heller att du beh\xf6ver lita p\xe5 oss blint. D\xe4rf\xf6r erbjuder vi tv\xe5 modeller d\xe4r du sj\xe4lv v\xe4ljer hur mycket vi f\xe5r tj\xe4na fr\xe5n affiliate-sidan."}),(0,Ea.jsxs)(bo,{children:[(0,Ea.jsxs)(yo,{children:[(0,Ea.jsx)("span",{className:"tag",children:"Standard"}),(0,Ea.jsx)("h4",{children:"20 % av besparing"}),(0,Ea.jsx)("p",{children:"Vi beh\xe5ller affiliate-int\xe4kten upp till kapad gr\xe4ns. L\xe4gre fee f\xf6r dig."}),(0,Ea.jsxs)("ul",{children:[(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:15,stroke:2.2})," Affiliate kapad enligt tabell"]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:15,stroke:2.2})," \xd6verskott rabatteras till alla kunder"]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:15,stroke:2.2})," Vi publicerar utbetalning per kvartal"]})]})]}),(0,Ea.jsxs)(yo,{$highlight:!0,children:[(0,Ea.jsx)("span",{className:"tag",children:"Affiliate-fri"}),(0,Ea.jsx)("h4",{children:"30 % av besparing"}),(0,Ea.jsx)("p",{children:"All affiliate-int\xe4kt rabatteras direkt till dig. Vi tj\xe4nar bara p\xe5 success-fee."}),(0,Ea.jsxs)("ul",{children:[(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:15,stroke:2.2})," Noll affiliate-int\xe4kt till oss"]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:15,stroke:2.2})," Helt symmetrisk incitamentstruktur"]}),(0,Ea.jsxs)("li",{children:[(0,Ea.jsx)(Ya,{name:"check",size:15,stroke:2.2})," Du kan byta modell n\xe4r som helst"]})]})]})]})]})]}),(0,Ea.jsxs)(vo,{children:[(0,Ea.jsx)("div",{className:"num",children:"4"}),(0,Ea.jsxs)("div",{children:[(0,Ea.jsx)("h3",{children:"Vi publicerar v\xe5ra rekommendationsstatistik kvartalsvis."}),(0,Ea.jsx)("p",{children:"Varje kvartal publiceras hur ofta varje leverant\xf6r rekommenderas, hur mycket affiliate som faktiskt utbetalats, och hur stor andel av besparing-poolen som rabatterats. Granska oss. Det g\xf6r branschen \xe4rligare."})]})]})]}),(0,Ea.jsxs)(go,{children:[(0,Ea.jsx)(ko,{children:"Affiliate-tak per kategori"}),(0,Ea.jsx)(xo,{children:"Det h\xe4r \xe4r max vi f\xe5r ta \u2014 oavsett vad leverant\xf6ren vill betala."}),(0,Ea.jsx)(wo,{children:"Taken \xe4r satta f\xf6r att rymma normal industri-affiliate utan att skapa incitament att favorisera en viss leverant\xf6r."}),(0,Ea.jsxs)(So,{children:[(0,Ea.jsxs)(jo,{className:"header",children:[(0,Ea.jsx)("div",{children:"Kategori"}),(0,Ea.jsx)("div",{children:"M\xe4tpunkt"}),(0,Ea.jsx)("div",{style:{textAlign:"right"},children:"Tak"})]}),$o.map(e=>(0,Ea.jsxs)(jo,{children:[(0,Ea.jsx)("div",{className:"cat",children:e.cat}),(0,Ea.jsx)("div",{className:"detail",children:e.detail}),(0,Ea.jsx)("div",{className:"cap",children:e.cap})]},e.cat))]})]}),(0,Ea.jsxs)(Eo,{children:[(0,Ea.jsx)("h2",{children:"Det h\xe4r \xe4r inte marknadsf\xf6ring. Det h\xe4r \xe4r arkitektur."}),(0,Ea.jsxs)("p",{children:["Om du uppt\xe4cker att vi bryter mot n\xe5gon av reglerna ovan \u2014 mejla"," ",(0,Ea.jsx)("a",{href:"mailto:transparens@arvo.flow",style:{textDecoration:"underline"},children:"transparens@arvo.flow"}),". Vi svarar inom 48 h, publikt."]}),(0,Ea.jsxs)("div",{className:"actions",children:[(0,Ea.jsxs)(Fa,{as:bt,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox ",(0,Ea.jsx)(Ya,{name:"arrow",size:18})]}),(0,Ea.jsx)(Fa,{as:bt,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,Ea.jsx)(Ka,{})]}),zo=()=>(0,Ea.jsxs)(ca,{theme:Sa,children:[(0,Ea.jsx)(ja,{}),(0,Ea.jsx)(gt,{basename:"/flow",children:(0,Ea.jsxs)(Le,{children:[(0,Ea.jsx)(Re,{path:"/",element:(0,Ea.jsx)(_l,{})}),(0,Ea.jsx)(Re,{path:"/connect",element:(0,Ea.jsx)(Ul,{})}),(0,Ea.jsx)(Re,{path:"/scanning",element:(0,Ea.jsx)(ii,{})}),(0,Ea.jsx)(Re,{path:"/insights",element:(0,Ea.jsx)(Ri,{})}),(0,Ea.jsx)(Re,{path:"/opportunity/:id",element:(0,Ea.jsx)(so,{})}),(0,Ea.jsx)(Re,{path:"/bias",element:(0,Ea.jsx)(Co,{})}),(0,Ea.jsx)(Re,{path:"*",element:(0,Ea.jsx)(Fe,{to:"/",replace:!0})})]})})]});(0,l.createRoot)(document.getElementById("root")).render((0,Ea.jsx)(zo,{}))})();
//# sourceMappingURL=main.7f657fad.js.map