/*! For license information please see main.af9ffc56.js.LICENSE.txt */
(()=>{"use strict";var e={4(e,t,n){var r=n(853),a=n(43),i=n(950);function l(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function s(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function u(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function c(e){if(31===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function d(e){if(s(e)!==e)throw Error(l(188))}function p(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=p(e)))return t;e=e.sibling}return null}var f=Object.assign,h=Symbol.for("react.element"),m=Symbol.for("react.transitional.element"),g=Symbol.for("react.portal"),v=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),y=Symbol.for("react.consumer"),k=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),j=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),E=Symbol.for("react.lazy");Symbol.for("react.scope");var z=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var C=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var N=Symbol.iterator;function _(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=N&&e[N]||e["@@iterator"])?e:null}var P=Symbol.for("react.client.reference");function T(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===P?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case v:return"Fragment";case b:return"Profiler";case x:return"StrictMode";case S:return"Suspense";case j:return"SuspenseList";case z:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case g:return"Portal";case k:return e.displayName||"Context";case y:return(e._context.displayName||"Context")+".Consumer";case w:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case $:return null!==(t=e.displayName||null)?t:T(e.type)||"Memo";case E:t=e._payload,e=e._init;try{return T(e(t))}catch(Yn){}}return null}var F=Array.isArray,A=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L={pending:!1,data:null,method:null,action:null},O=[],D=-1;function M(e){return{current:e}}function I(e){0>D||(e.current=O[D],O[D]=null,D--)}function B(e,t){D++,O[D]=e.current,e.current=t}var H,V,U=M(null),W=M(null),K=M(null),Y=M(null);function q(e,t){switch(B(K,t),B(W,e),B(U,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?xd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=bd(t=xd(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}I(U),B(U,e)}function G(){I(U),I(W),I(K)}function Q(e){null!==e.memoizedState&&B(Y,e);var t=U.current,n=bd(t,e.type);t!==n&&(B(W,e),B(U,n))}function X(e){W.current===e&&(I(U),I(W)),Y.current===e&&(I(Y),dp._currentValue=L)}function J(e){if(void 0===H)try{throw Error()}catch(Yn){var t=Yn.stack.trim().match(/\n( *(at )?)/);H=t&&t[1]||"",V=-1<Yn.stack.indexOf("\n    at")?" (<anonymous>)":-1<Yn.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+H+e+V}var Z=!1;function ee(e,t){if(!e||Z)return"";Z=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(Yn){var r=Yn}Reflect.construct(e,[],n)}else{try{n.call()}catch(a){r=a}e.call(n.prototype)}}else{try{throw Error()}catch(i){r=i}(n=e())&&"function"===typeof n.catch&&n.catch(function(){})}}catch(l){if(l&&r&&"string"===typeof l.stack)return[l.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=r.DetermineComponentFrameRoot(),l=i[0],o=i[1];if(l&&o){var s=l.split("\n"),u=o.split("\n");for(a=r=0;r<s.length&&!s[r].includes("DetermineComponentFrameRoot");)r++;for(;a<u.length&&!u[a].includes("DetermineComponentFrameRoot");)a++;if(r===s.length||a===u.length)for(r=s.length-1,a=u.length-1;1<=r&&0<=a&&s[r]!==u[a];)a--;for(;1<=r&&0<=a;r--,a--)if(s[r]!==u[a]){if(1!==r||1!==a)do{if(r--,0>--a||s[r]!==u[a]){var c="\n"+s[r].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}}while(1<=r&&0<=a);break}}}finally{Z=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?J(n):""}function te(e,t){switch(e.tag){case 26:case 27:case 5:return J(e.type);case 16:return J("Lazy");case 13:return e.child!==t&&null!==t?J("Suspense Fallback"):J("Suspense");case 19:return J("SuspenseList");case 0:case 15:return ee(e.type,!1);case 11:return ee(e.type.render,!1);case 1:return ee(e.type,!0);case 31:return J("Activity");default:return""}}function ne(e){try{var t="",n=null;do{t+=te(e,n),n=e,e=e.return}while(e);return t}catch(Yn){return"\nError generating stack: "+Yn.message+"\n"+Yn.stack}}var re=Object.prototype.hasOwnProperty,ae=r.unstable_scheduleCallback,ie=r.unstable_cancelCallback,le=r.unstable_shouldYield,oe=r.unstable_requestPaint,se=r.unstable_now,ue=r.unstable_getCurrentPriorityLevel,ce=r.unstable_ImmediatePriority,de=r.unstable_UserBlockingPriority,pe=r.unstable_NormalPriority,fe=r.unstable_LowPriority,he=r.unstable_IdlePriority,me=r.log,ge=r.unstable_setDisableYieldValue,ve=null,xe=null;function be(e){if("function"===typeof me&&ge(e),xe&&"function"===typeof xe.setStrictMode)try{xe.setStrictMode(ve,e)}catch(t){}}var ye=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ke(e)/we|0)|0},ke=Math.log,we=Math.LN2;var Se=256,je=262144,$e=4194304;function Ee(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return 261888&e;case 262144:case 524288:case 1048576:case 2097152:return 3932160&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ze(e,t,n){var r=e.pendingLanes;if(0===r)return 0;var a=0,i=e.suspendedLanes,l=e.pingedLanes;e=e.warmLanes;var o=134217727&r;return 0!==o?0!==(r=o&~i)?a=Ee(r):0!==(l&=o)?a=Ee(l):n||0!==(n=o&~e)&&(a=Ee(n)):0!==(o=r&~i)?a=Ee(o):0!==l?a=Ee(l):n||0!==(n=r&~e)&&(a=Ee(n)),0===a?0:0!==t&&t!==a&&0===(t&i)&&((i=a&-a)>=(n=t&-t)||32===i&&0!==(4194048&n))?t:a}function Ce(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function Ne(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function _e(){var e=$e;return 0===(62914560&($e<<=1))&&($e=4194304),e}function Pe(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Te(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ye(t);e.entangledLanes|=t,e.entanglements[r]=1073741824|e.entanglements[r]|261930&n}function Ae(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ye(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}function Re(e,t){var n=t&-t;return 0!==((n=0!==(42&n)?1:Le(n))&(e.suspendedLanes|t))?0:n}function Le(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Oe(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function De(){var e=R.p;return 0!==e?e:void 0===(e=window.event)?32:zp(e.type)}function Me(e,t){var n=R.p;try{return R.p=e,t()}finally{R.p=n}}var Ie=Math.random().toString(36).slice(2),Be="__reactFiber$"+Ie,He="__reactProps$"+Ie,Ve="__reactContainer$"+Ie,Ue="__reactEvents$"+Ie,We="__reactListeners$"+Ie,Ke="__reactHandles$"+Ie,Ye="__reactResources$"+Ie,qe="__reactMarker$"+Ie;function Ge(e){delete e[Be],delete e[He],delete e[Ue],delete e[We],delete e[Ke]}function Qe(e){var t=e[Be];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ve]||n[Be]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Od(e);null!==e;){if(n=e[Be])return n;e=Od(e)}return t}n=(e=n).parentNode}return null}function Xe(e){if(e=e[Be]||e[Ve]){var t=e.tag;if(5===t||6===t||13===t||31===t||26===t||27===t||3===t)return e}return null}function Je(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(l(33))}function Ze(e){var t=e[Ye];return t||(t=e[Ye]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function et(e){e[qe]=!0}var tt=new Set,nt={};function rt(e,t){at(e,t),at(e+"Capture",t)}function at(e,t){for(nt[e]=t,e=0;e<t.length;e++)tt.add(t[e])}var it=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),lt={},ot={};function st(e,t,n){if(a=t,re.call(ot,a)||!re.call(lt,a)&&(it.test(a)?ot[a]=!0:(lt[a]=!0,0)))if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var r=t.toLowerCase().slice(0,5);if("data-"!==r&&"aria-"!==r)return void e.removeAttribute(t)}e.setAttribute(t,""+n)}var a}function ut(e,t,n){if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+n)}}function ct(e,t,n,r){if(null===r)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(n)}e.setAttributeNS(t,n,""+r)}}function dt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function pt(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function ft(e){if(!e._valueTracker){var t=pt(e)?"checked":"value";e._valueTracker=function(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&"undefined"!==typeof r&&"function"===typeof r.get&&"function"===typeof r.set){var a=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){n=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e,t,""+e[t])}}function ht(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=pt(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function mt(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var gt=/[\n"\\]/g;function vt(e){return e.replace(gt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function xt(e,t,n,r,a,i,l,o){e.name="",null!=l&&"function"!==typeof l&&"symbol"!==typeof l&&"boolean"!==typeof l?e.type=l:e.removeAttribute("type"),null!=t?"number"===l?(0===t&&""===e.value||e.value!=t)&&(e.value=""+dt(t)):e.value!==""+dt(t)&&(e.value=""+dt(t)):"submit"!==l&&"reset"!==l||e.removeAttribute("value"),null!=t?yt(e,l,dt(t)):null!=n?yt(e,l,dt(n)):null!=r&&e.removeAttribute("value"),null==a&&null!=i&&(e.defaultChecked=!!i),null!=a&&(e.checked=a&&"function"!==typeof a&&"symbol"!==typeof a),null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o?e.name=""+dt(o):e.removeAttribute("name")}function bt(e,t,n,r,a,i,l,o){if(null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.type=i),null!=t||null!=n){if(!("submit"!==i&&"reset"!==i||void 0!==t&&null!==t))return void ft(e);n=null!=n?""+dt(n):"",t=null!=t?""+dt(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}r="function"!==typeof(r=null!=r?r:a)&&"symbol"!==typeof r&&!!r,e.checked=o?e.checked:!!r,e.defaultChecked=!!r,null!=l&&"function"!==typeof l&&"symbol"!==typeof l&&"boolean"!==typeof l&&(e.name=l),ft(e)}function yt(e,t,n){"number"===t&&mt(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function kt(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+dt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n)return e[a].selected=!0,void(r&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function wt(e,t,n){null==t||((t=""+dt(t))!==e.value&&(e.value=t),null!=n)?e.defaultValue=null!=n?""+dt(n):"":e.defaultValue!==t&&(e.defaultValue=t)}function St(e,t,n,r){if(null==t){if(null!=r){if(null!=n)throw Error(l(92));if(F(r)){if(1<r.length)throw Error(l(93));r=r[0]}n=r}null==n&&(n=""),t=n}n=dt(t),e.defaultValue=n,(r=e.textContent)===n&&""!==r&&null!==r&&(e.value=r),ft(e)}function jt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var $t=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Et(e,t,n){var r=0===t.indexOf("--");null==n||"boolean"===typeof n||""===n?r?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":r?e.setProperty(t,n):"number"!==typeof n||0===n||$t.has(t)?"float"===t?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function zt(e,t,n){if(null!=t&&"object"!==typeof t)throw Error(l(62));if(e=e.style,null!=n){for(var r in n)!n.hasOwnProperty(r)||null!=t&&t.hasOwnProperty(r)||(0===r.indexOf("--")?e.setProperty(r,""):"float"===r?e.cssFloat="":e[r]="");for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Et(e,a,r)}else for(var i in t)t.hasOwnProperty(i)&&Et(e,i,t[i])}function Ct(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nt=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),_t=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Pt(e){return _t.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Tt(){}var Ft=null;function At(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Rt=null,Lt=null;function Ot(e){var t=Xe(e);if(t&&(e=t.stateNode)){var n=e[He]||null;e:switch(e=t.stateNode,t.type){case"input":if(xt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+vt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[He]||null;if(!a)throw Error(l(90));xt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)(r=n[t]).form===e.form&&ht(r)}break e;case"textarea":wt(e,n.value,n.defaultValue);break e;case"select":null!=(t=n.value)&&kt(e,!!n.multiple,t,!1)}}}var Dt=!1;function Mt(e,t,n){if(Dt)return e(t,n);Dt=!0;try{return e(t)}finally{if(Dt=!1,(null!==Rt||null!==Lt)&&(ec(),Rt&&(t=Rt,e=Lt,Lt=Rt=null,Ot(t),e)))for(t=0;t<e.length;t++)Ot(e[t])}}function It(e,t){var n=e.stateNode;if(null===n)return null;var r=n[He]||null;if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(l(231,t,typeof n));return n}var Bt=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Ht=!1;if(Bt)try{var Vt={};Object.defineProperty(Vt,"passive",{get:function(){Ht=!0}}),window.addEventListener("test",Vt,Vt),window.removeEventListener("test",Vt,Vt)}catch(Jp){Ht=!1}var Ut=null,Wt=null,Kt=null;function Yt(){if(Kt)return Kt;var e,t,n=Wt,r=n.length,a="value"in Ut?Ut.value:Ut.textContent,i=a.length;for(e=0;e<r&&n[e]===a[e];e++);var l=r-e;for(t=1;t<=l&&n[r-t]===a[i-t];t++);return Kt=a.slice(e,1<t?1-t:void 0)}function qt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Gt(){return!0}function Qt(){return!1}function Xt(e){function t(t,n,r,a,i){for(var l in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=a,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(l)&&(t=e[l],this[l]=t?t(a):a[l]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?Gt:Qt,this.isPropagationStopped=Qt,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Gt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Gt)},persist:function(){},isPersistent:Gt}),t}var Jt,Zt,en,tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},nn=Xt(tn),rn=f({},tn,{view:0,detail:0}),an=Xt(rn),ln=f({},rn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==en&&(en&&"mousemove"===e.type?(Jt=e.screenX-en.screenX,Zt=e.screenY-en.screenY):Zt=Jt=0,en=e),Jt)},movementY:function(e){return"movementY"in e?e.movementY:Zt}}),on=Xt(ln),sn=Xt(f({},ln,{dataTransfer:0})),un=Xt(f({},rn,{relatedTarget:0})),cn=Xt(f({},tn,{animationName:0,elapsedTime:0,pseudoElement:0})),dn=Xt(f({},tn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),pn=Xt(f({},tn,{data:0})),fn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=mn[e])&&!!t[e]}function vn(){return gn}var xn=Xt(f({},rn,{key:function(e){if(e.key){var t=fn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=qt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?hn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vn,charCode:function(e){return"keypress"===e.type?qt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?qt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),bn=Xt(f({},ln,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),yn=Xt(f({},rn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vn})),kn=Xt(f({},tn,{propertyName:0,elapsedTime:0,pseudoElement:0})),wn=Xt(f({},ln,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Sn=Xt(f({},tn,{newState:0,oldState:0})),jn=[9,13,27,32],$n=Bt&&"CompositionEvent"in window,En=null;Bt&&"documentMode"in document&&(En=document.documentMode);var zn=Bt&&"TextEvent"in window&&!En,Cn=Bt&&(!$n||En&&8<En&&11>=En),Nn=String.fromCharCode(32),_n=!1;function Pn(e,t){switch(e){case"keyup":return-1!==jn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Tn(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Fn=!1;var An={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!An[e.type]:"textarea"===t}function Ln(e,t,n,r){Rt?Lt?Lt.push(r):Lt=[r]:Rt=r,0<(t=ad(t,"onChange")).length&&(n=new nn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var On=null,Dn=null;function Mn(e){Qc(e,0)}function In(e){if(ht(Je(e)))return e}function Bn(e,t){if("change"===e)return t}var Hn=!1;if(Bt){var Vn;if(Bt){var Un="oninput"in document;if(!Un){var Wn=document.createElement("div");Wn.setAttribute("oninput","return;"),Un="function"===typeof Wn.oninput}Vn=Un}else Vn=!1;Hn=Vn&&(!document.documentMode||9<document.documentMode)}function Kn(){On&&(On.detachEvent("onpropertychange",qn),Dn=On=null)}function qn(e){if("value"===e.propertyName&&In(Dn)){var t=[];Ln(t,Dn,e,At(e)),Mt(Mn,t)}}function Gn(e,t,n){"focusin"===e?(Kn(),Dn=n,(On=t).attachEvent("onpropertychange",qn)):"focusout"===e&&Kn()}function Qn(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return In(Dn)}function Xn(e,t){if("click"===e)return In(t)}function Jn(e,t){if("input"===e||"change"===e)return In(t)}var Zn="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function er(e,t){if(Zn(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!re.call(t,a)||!Zn(e[a],t[a]))return!1}return!0}function tr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function nr(e,t){var n,r=tr(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=tr(r)}}function rr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?rr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function ar(e){for(var t=mt((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=mt((e=t.contentWindow).document)}return t}function ir(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var lr=Bt&&"documentMode"in document&&11>=document.documentMode,or=null,sr=null,ur=null,cr=!1;function dr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;cr||null==or||or!==mt(r)||("selectionStart"in(r=or)&&ir(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},ur&&er(ur,r)||(ur=r,0<(r=ad(sr,"onSelect")).length&&(t=new nn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=or)))}function pr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var fr={animationend:pr("Animation","AnimationEnd"),animationiteration:pr("Animation","AnimationIteration"),animationstart:pr("Animation","AnimationStart"),transitionrun:pr("Transition","TransitionRun"),transitionstart:pr("Transition","TransitionStart"),transitioncancel:pr("Transition","TransitionCancel"),transitionend:pr("Transition","TransitionEnd")},hr={},mr={};function gr(e){if(hr[e])return hr[e];if(!fr[e])return e;var t,n=fr[e];for(t in n)if(n.hasOwnProperty(t)&&t in mr)return hr[e]=n[t];return e}Bt&&(mr=document.createElement("div").style,"AnimationEvent"in window||(delete fr.animationend.animation,delete fr.animationiteration.animation,delete fr.animationstart.animation),"TransitionEvent"in window||delete fr.transitionend.transition);var vr=gr("animationend"),xr=gr("animationiteration"),br=gr("animationstart"),yr=gr("transitionrun"),kr=gr("transitionstart"),wr=gr("transitioncancel"),Sr=gr("transitionend"),jr=new Map,$r="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Er(e,t){jr.set(e,t),rt(t,[e])}$r.push("scrollEnd");var zr="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},Cr=[],Nr=0,_r=0;function Pr(){for(var e=Nr,t=_r=Nr=0;t<e;){var n=Cr[t];Cr[t++]=null;var r=Cr[t];Cr[t++]=null;var a=Cr[t];Cr[t++]=null;var i=Cr[t];if(Cr[t++]=null,null!==r&&null!==a){var l=r.pending;null===l?a.next=a:(a.next=l.next,l.next=a),r.pending=a}0!==i&&Rr(n,a,i)}}function Tr(e,t,n,r){Cr[Nr++]=e,Cr[Nr++]=t,Cr[Nr++]=n,Cr[Nr++]=r,_r|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Fr(e,t,n,r){return Tr(e,t,n,r),Lr(e)}function Ar(e,t){return Tr(e,null,null,t),Lr(e)}function Rr(e,t,n){e.lanes|=n;var r=e.alternate;null!==r&&(r.lanes|=n);for(var a=!1,i=e.return;null!==i;)i.childLanes|=n,null!==(r=i.alternate)&&(r.childLanes|=n),22===i.tag&&(null===(e=i.stateNode)||1&e._visibility||(a=!0)),e=i,i=i.return;return 3===e.tag?(i=e.stateNode,a&&null!==t&&(a=31-ye(n),null===(r=(e=i.hiddenUpdates)[a])?e[a]=[t]:r.push(t),t.lane=536870912|n),i):null}function Lr(e){if(50<Wu)throw Wu=0,Ku=null,Error(l(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Or={};function Dr(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Mr(e,t,n,r){return new Dr(e,t,n,r)}function Ir(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Br(e,t){var n=e.alternate;return null===n?((n=Mr(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=65011712&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Hr(e,t){e.flags&=65011714;var n=e.alternate;return null===n?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Vr(e,t,n,r,a,i){var o=0;if(r=e,"function"===typeof e)Ir(e)&&(o=1);else if("string"===typeof e)o=function(e,t,n){if(1===n||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,n,U.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case z:return(e=Mr(31,n,t,a)).elementType=z,e.lanes=i,e;case v:return Ur(n.children,a,i,t);case x:o=8,a|=24;break;case b:return(e=Mr(12,n,t,2|a)).elementType=b,e.lanes=i,e;case S:return(e=Mr(13,n,t,a)).elementType=S,e.lanes=i,e;case j:return(e=Mr(19,n,t,a)).elementType=j,e.lanes=i,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case k:o=10;break e;case y:o=9;break e;case w:o=11;break e;case $:o=14;break e;case E:o=16,r=null;break e}o=29,n=Error(l(130,null===e?"null":typeof e,"")),r=null}return(t=Mr(o,n,t,a)).elementType=e,t.type=r,t.lanes=i,t}function Ur(e,t,n,r){return(e=Mr(7,e,r,t)).lanes=n,e}function Wr(e,t,n){return(e=Mr(6,e,null,t)).lanes=n,e}function Kr(e){var t=Mr(18,null,null,0);return t.stateNode=e,t}function Yr(e,t,n){return(t=Mr(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qr=new WeakMap;function Gr(e,t){if("object"===typeof e&&null!==e){var n=qr.get(e);return void 0!==n?n:(t={value:e,source:t,stack:ne(t)},qr.set(e,t),t)}return{value:e,source:t,stack:ne(t)}}var Qr=[],Xr=0,Jr=null,Zr=0,ea=[],ta=0,na=null,ra=1,aa="";function ia(e,t){Qr[Xr++]=Zr,Qr[Xr++]=Jr,Jr=e,Zr=t}function la(e,t,n){ea[ta++]=ra,ea[ta++]=aa,ea[ta++]=na,na=e;var r=ra;e=aa;var a=32-ye(r)-1;r&=~(1<<a),n+=1;var i=32-ye(t)+a;if(30<i){var l=a-a%5;i=(r&(1<<l)-1).toString(32),r>>=l,a-=l,ra=1<<32-ye(t)+a|n<<a|r,aa=i+e}else ra=1<<i|n<<a|r,aa=e}function oa(e){null!==e.return&&(ia(e,1),la(e,1,0))}function sa(e){for(;e===Jr;)Jr=Qr[--Xr],Qr[Xr]=null,Zr=Qr[--Xr],Qr[Xr]=null;for(;e===na;)na=ea[--ta],ea[ta]=null,aa=ea[--ta],ea[ta]=null,ra=ea[--ta],ea[ta]=null}function ua(e,t){ea[ta++]=ra,ea[ta++]=aa,ea[ta++]=na,ra=t.id,aa=t.overflow,na=e}var ca=null,da=null,pa=!1,fa=null,ha=!1,ma=Error(l(519));function ga(e){throw wa(Gr(Error(l(418,1<arguments.length&&void 0!==arguments[1]&&arguments[1]?"text":"HTML","")),e)),ma}function va(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Be]=e,t[He]=r,n){case"dialog":Xc("cancel",t),Xc("close",t);break;case"iframe":case"object":case"embed":Xc("load",t);break;case"video":case"audio":for(n=0;n<qc.length;n++)Xc(qc[n],t);break;case"source":Xc("error",t);break;case"img":case"image":case"link":Xc("error",t),Xc("load",t);break;case"details":Xc("toggle",t);break;case"input":Xc("invalid",t),bt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":Xc("invalid",t);break;case"textarea":Xc("invalid",t),St(t,r.value,r.defaultValue,r.children)}"string"!==typeof(n=r.children)&&"number"!==typeof n&&"bigint"!==typeof n||t.textContent===""+n||!0===r.suppressHydrationWarning||cd(t.textContent,n)?(null!=r.popover&&(Xc("beforetoggle",t),Xc("toggle",t)),null!=r.onScroll&&Xc("scroll",t),null!=r.onScrollEnd&&Xc("scrollend",t),null!=r.onClick&&(t.onclick=Tt),t=!0):t=!1,t||ga(e,!0)}function xa(e){for(ca=e.return;ca;)switch(ca.tag){case 5:case 31:case 13:return void(ha=!1);case 27:case 3:return void(ha=!0);default:ca=ca.return}}function ba(e){if(e!==ca)return!1;if(!pa)return xa(e),pa=!0,!1;var t,n=e.tag;if((t=3!==n&&27!==n)&&((t=5===n)&&(t=!("form"!==(t=e.type)&&"button"!==t)||yd(e.type,e.memoizedProps)),t=!t),t&&da&&ga(e),xa(e),13===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(l(317));da=Ld(e)}else if(31===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(l(317));da=Ld(e)}else 27===n?(n=da,zd(e.type)?(e=Rd,Rd=null,da=e):da=n):da=ca?Ad(e.stateNode.nextSibling):null;return!0}function ya(){da=ca=null,pa=!1}function ka(){var e=fa;return null!==e&&(null===Pu?Pu=e:Pu.push.apply(Pu,e),fa=null),e}function wa(e){null===fa?fa=[e]:fa.push(e)}var Sa=M(null),ja=null,$a=null;function Ea(e,t,n){B(Sa,t._currentValue),t._currentValue=n}function za(e){e._currentValue=Sa.current,I(Sa)}function Ca(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Na(e,t,n,r){var a=e.child;for(null!==a&&(a.return=e);null!==a;){var i=a.dependencies;if(null!==i){var o=a.child;i=i.firstContext;e:for(;null!==i;){var s=i;i=a;for(var u=0;u<t.length;u++)if(s.context===t[u]){i.lanes|=n,null!==(s=i.alternate)&&(s.lanes|=n),Ca(i.return,n,e),r||(o=null);break e}i=s.next}}else if(18===a.tag){if(null===(o=a.return))throw Error(l(341));o.lanes|=n,null!==(i=o.alternate)&&(i.lanes|=n),Ca(o,n,e),o=null}else o=a.child;if(null!==o)o.return=a;else for(o=a;null!==o;){if(o===e){o=null;break}if(null!==(a=o.sibling)){a.return=o.return,o=a;break}o=o.return}a=o}}function _a(e,t,n,r){e=null;for(var a=t,i=!1;null!==a;){if(!i)if(0!==(524288&a.flags))i=!0;else if(0!==(262144&a.flags))break;if(10===a.tag){var o=a.alternate;if(null===o)throw Error(l(387));if(null!==(o=o.memoizedProps)){var s=a.type;Zn(a.pendingProps.value,o.value)||(null!==e?e.push(s):e=[s])}}else if(a===Y.current){if(null===(o=a.alternate))throw Error(l(387));o.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(null!==e?e.push(dp):e=[dp])}a=a.return}null!==e&&Na(t,e,n,r),t.flags|=262144}function Pa(e){for(e=e.firstContext;null!==e;){if(!Zn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ta(e){ja=e,$a=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Fa(e){return Ra(ja,e)}function Aa(e,t){return null===ja&&Ta(e),Ra(e,t)}function Ra(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},null===$a){if(null===e)throw Error(l(308));$a=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else $a=$a.next=t;return n}var La="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Oa=r.unstable_scheduleCallback,Da=r.unstable_NormalPriority,Ma={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ia(){return{controller:new La,data:new Map,refCount:0}}function Ba(e){e.refCount--,0===e.refCount&&Oa(Da,function(){e.controller.abort()})}var Ha=null,Va=0,Ua=0,Wa=null;function Ka(){if(0===--Va&&null!==Ha){null!==Wa&&(Wa.status="fulfilled");var e=Ha;Ha=null,Ua=0,Wa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Ya=A.S;A.S=function(e,t){Au=se(),"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Ha){var n=Ha=[];Va=0,Ua=Vc(),Wa={status:"pending",value:void 0,then:function(e){n.push(e)}}}Va++,t.then(Ka,Ka)}(0,t),null!==Ya&&Ya(e,t)};var qa=M(null);function Ga(){var e=qa.current;return null!==e?e:mu.pooledCache}function Qa(e,t){B(qa,null===t?qa.current:t.pool)}function Xa(){var e=Ga();return null===e?null:{parent:Ma._currentValue,pool:e}}var Ja=Error(l(460)),Za=Error(l(474)),ei=Error(l(542)),ti={then:function(){}};function ni(e){return"fulfilled"===(e=e.status)||"rejected"===e}function ri(e,t,n){switch(void 0===(n=e[n])?e.push(t):n!==t&&(t.then(Tt,Tt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e;default:if("string"===typeof t.status)t.then(Tt,Tt);else{if(null!==(e=mu)&&100<e.shellSuspendCounter)throw Error(l(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var n=t;n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t;n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e}throw ii=t,Ja}}function ai(e){try{return(0,e._init)(e._payload)}catch(Yn){if(null!==Yn&&"object"===typeof Yn&&"function"===typeof Yn.then)throw ii=Yn,Ja;throw Yn}}var ii=null;function li(){if(null===ii)throw Error(l(459));var e=ii;return ii=null,e}function oi(e){if(e===Ja||e===ei)throw Error(l(483))}var si=null,ui=0;function ci(e){var t=ui;return ui+=1,null===si&&(si=[]),ri(si,e,t)}function di(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function pi(e,t){if(t.$$typeof===h)throw Error(l(525));throw e=Object.prototype.toString.call(t),Error(l(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function fi(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function a(e,t){return(e=Br(e,t)).index=0,e.sibling=null,e}function i(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=67108866,n):r:(t.flags|=67108866,n):(t.flags|=1048576,n)}function o(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function s(e,t,n,r){return null===t||6!==t.tag?((t=Wr(n,e.mode,r)).return=e,t):((t=a(t,n)).return=e,t)}function u(e,t,n,r){var i=n.type;return i===v?d(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===i||"object"===typeof i&&null!==i&&i.$$typeof===E&&ai(i)===t.type)?(di(t=a(t,n.props),n),t.return=e,t):(di(t=Vr(n.type,n.key,n.props,null,e.mode,r),n),t.return=e,t)}function c(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Yr(n,e.mode,r)).return=e,t):((t=a(t,n.children||[])).return=e,t)}function d(e,t,n,r,i){return null===t||7!==t.tag?((t=Ur(n,e.mode,r,i)).return=e,t):((t=a(t,n)).return=e,t)}function p(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=Wr(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case m:return di(n=Vr(t.type,t.key,t.props,null,e.mode,n),t),n.return=e,n;case g:return(t=Yr(t,e.mode,n)).return=e,t;case E:return p(e,t=ai(t),n)}if(F(t)||_(t))return(t=Ur(t,e.mode,n,null)).return=e,t;if("function"===typeof t.then)return p(e,ci(t),n);if(t.$$typeof===k)return p(e,Aa(e,t),n);pi(e,t)}return null}function f(e,t,n,r){var a=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return null!==a?null:s(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case m:return n.key===a?u(e,t,n,r):null;case g:return n.key===a?c(e,t,n,r):null;case E:return f(e,t,n=ai(n),r)}if(F(n)||_(n))return null!==a?null:d(e,t,n,r,null);if("function"===typeof n.then)return f(e,t,ci(n),r);if(n.$$typeof===k)return f(e,t,Aa(e,n),r);pi(e,n)}return null}function h(e,t,n,r,a){if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return s(t,e=e.get(n)||null,""+r,a);if("object"===typeof r&&null!==r){switch(r.$$typeof){case m:return u(t,e=e.get(null===r.key?n:r.key)||null,r,a);case g:return c(t,e=e.get(null===r.key?n:r.key)||null,r,a);case E:return h(e,t,n,r=ai(r),a)}if(F(r)||_(r))return d(t,e=e.get(n)||null,r,a,null);if("function"===typeof r.then)return h(e,t,n,ci(r),a);if(r.$$typeof===k)return h(e,t,n,Aa(t,r),a);pi(t,r)}return null}function x(s,u,c,d){if("object"===typeof c&&null!==c&&c.type===v&&null===c.key&&(c=c.props.children),"object"===typeof c&&null!==c){switch(c.$$typeof){case m:e:{for(var b=c.key;null!==u;){if(u.key===b){if((b=c.type)===v){if(7===u.tag){n(s,u.sibling),(d=a(u,c.props.children)).return=s,s=d;break e}}else if(u.elementType===b||"object"===typeof b&&null!==b&&b.$$typeof===E&&ai(b)===u.type){n(s,u.sibling),di(d=a(u,c.props),c),d.return=s,s=d;break e}n(s,u);break}t(s,u),u=u.sibling}c.type===v?((d=Ur(c.props.children,s.mode,d,c.key)).return=s,s=d):(di(d=Vr(c.type,c.key,c.props,null,s.mode,d),c),d.return=s,s=d)}return o(s);case g:e:{for(b=c.key;null!==u;){if(u.key===b){if(4===u.tag&&u.stateNode.containerInfo===c.containerInfo&&u.stateNode.implementation===c.implementation){n(s,u.sibling),(d=a(u,c.children||[])).return=s,s=d;break e}n(s,u);break}t(s,u),u=u.sibling}(d=Yr(c,s.mode,d)).return=s,s=d}return o(s);case E:return x(s,u,c=ai(c),d)}if(F(c))return function(a,l,o,s){for(var u=null,c=null,d=l,m=l=0,g=null;null!==d&&m<o.length;m++){d.index>m?(g=d,d=null):g=d.sibling;var v=f(a,d,o[m],s);if(null===v){null===d&&(d=g);break}e&&d&&null===v.alternate&&t(a,d),l=i(v,l,m),null===c?u=v:c.sibling=v,c=v,d=g}if(m===o.length)return n(a,d),pa&&ia(a,m),u;if(null===d){for(;m<o.length;m++)null!==(d=p(a,o[m],s))&&(l=i(d,l,m),null===c?u=d:c.sibling=d,c=d);return pa&&ia(a,m),u}for(d=r(d);m<o.length;m++)null!==(g=h(d,a,m,o[m],s))&&(e&&null!==g.alternate&&d.delete(null===g.key?m:g.key),l=i(g,l,m),null===c?u=g:c.sibling=g,c=g);return e&&d.forEach(function(e){return t(a,e)}),pa&&ia(a,m),u}(s,u,c,d);if(_(c)){if("function"!==typeof(b=_(c)))throw Error(l(150));return function(a,o,s,u){if(null==s)throw Error(l(151));for(var c=null,d=null,m=o,g=o=0,v=null,x=s.next();null!==m&&!x.done;g++,x=s.next()){m.index>g?(v=m,m=null):v=m.sibling;var b=f(a,m,x.value,u);if(null===b){null===m&&(m=v);break}e&&m&&null===b.alternate&&t(a,m),o=i(b,o,g),null===d?c=b:d.sibling=b,d=b,m=v}if(x.done)return n(a,m),pa&&ia(a,g),c;if(null===m){for(;!x.done;g++,x=s.next())null!==(x=p(a,x.value,u))&&(o=i(x,o,g),null===d?c=x:d.sibling=x,d=x);return pa&&ia(a,g),c}for(m=r(m);!x.done;g++,x=s.next())null!==(x=h(m,a,g,x.value,u))&&(e&&null!==x.alternate&&m.delete(null===x.key?g:x.key),o=i(x,o,g),null===d?c=x:d.sibling=x,d=x);return e&&m.forEach(function(e){return t(a,e)}),pa&&ia(a,g),c}(s,u,c=b.call(c),d)}if("function"===typeof c.then)return x(s,u,ci(c),d);if(c.$$typeof===k)return x(s,u,Aa(s,c),d);pi(s,c)}return"string"===typeof c&&""!==c||"number"===typeof c||"bigint"===typeof c?(c=""+c,null!==u&&6===u.tag?(n(s,u.sibling),(d=a(u,c)).return=s,s=d):(n(s,u),(d=Wr(c,s.mode,d)).return=s,s=d),o(s)):n(s,u)}return function(e,t,n,r){try{ui=0;var a=x(e,t,n,r);return si=null,a}catch(Yn){if(Yn===Ja||Yn===ei)throw Yn;var i=Mr(29,Yn,null,e.mode);return i.lanes=r,i.return=e,i}}}var hi=fi(!0),mi=fi(!1),gi=!1;function vi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xi(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function bi(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function yi(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&hu)){var a=r.pending;return null===a?t.next=t:(t.next=a.next,a.next=t),r.pending=t,t=Lr(e),Rr(e,null,n),t}return Tr(e,r,t,n),Lr(e)}function ki(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Ae(e,n)}}function wi(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var a=null,i=null;if(null!==(n=n.firstBaseUpdate)){do{var l={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};null===i?a=i=l:i=i.next=l,n=n.next}while(null!==n);null===i?a=i=t:i=i.next=t}else a=i=t;return n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:r.shared,callbacks:r.callbacks},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Si=!1;function ji(){if(Si){if(null!==Wa)throw Wa}}function $i(e,t,n,r){Si=!1;var a=e.updateQueue;gi=!1;var i=a.firstBaseUpdate,l=a.lastBaseUpdate,o=a.shared.pending;if(null!==o){a.shared.pending=null;var s=o,u=s.next;s.next=null,null===l?i=u:l.next=u,l=s;var c=e.alternate;null!==c&&((o=(c=c.updateQueue).lastBaseUpdate)!==l&&(null===o?c.firstBaseUpdate=u:o.next=u,c.lastBaseUpdate=s))}if(null!==i){var d=a.baseState;for(l=0,c=u=s=null,o=i;;){var p=-536870913&o.lane,h=p!==o.lane;if(h?(vu&p)===p:(r&p)===p){0!==p&&p===Ua&&(Si=!0),null!==c&&(c=c.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var m=e,g=o;p=t;var v=n;switch(g.tag){case 1:if("function"===typeof(m=g.payload)){d=m.call(v,d,p);break e}d=m;break e;case 3:m.flags=-65537&m.flags|128;case 0:if(null===(p="function"===typeof(m=g.payload)?m.call(v,d,p):m)||void 0===p)break e;d=f({},d,p);break e;case 2:gi=!0}}null!==(p=o.callback)&&(e.flags|=64,h&&(e.flags|=8192),null===(h=a.callbacks)?a.callbacks=[p]:h.push(p))}else h={lane:p,tag:o.tag,payload:o.payload,callback:o.callback,next:null},null===c?(u=c=h,s=d):c=c.next=h,l|=p;if(null===(o=o.next)){if(null===(o=a.shared.pending))break;o=(h=o).next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}null===c&&(s=d),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=c,null===i&&(a.shared.lanes=0),$u|=l,e.lanes=l,e.memoizedState=d}}function Ei(e,t){if("function"!==typeof e)throw Error(l(191,e));e.call(t)}function zi(e,t){var n=e.callbacks;if(null!==n)for(e.callbacks=null,e=0;e<n.length;e++)Ei(n[e],t)}var Ci=M(null),Ni=M(0);function _i(e,t){B(Ni,e=Su),B(Ci,t),Su=e|t.baseLanes}function Pi(){B(Ni,Su),B(Ci,Ci.current)}function Ti(){Su=Ni.current,I(Ci),I(Ni)}var Fi=M(null),Ai=null;function Ri(e){var t=e.alternate;B(Ii,1&Ii.current),B(Fi,e),null===Ai&&(null===t||null!==Ci.current||null!==t.memoizedState)&&(Ai=e)}function Li(e){B(Ii,Ii.current),B(Fi,e),null===Ai&&(Ai=e)}function Oi(e){22===e.tag?(B(Ii,Ii.current),B(Fi,e),null===Ai&&(Ai=e)):Di()}function Di(){B(Ii,Ii.current),B(Fi,Fi.current)}function Mi(e){I(Fi),Ai===e&&(Ai=null),I(Ii)}var Ii=M(0);function Bi(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||Td(n)||Fd(n)))return t}else if(19!==t.tag||"forwards"!==t.memoizedProps.revealOrder&&"backwards"!==t.memoizedProps.revealOrder&&"unstable_legacy-backwards"!==t.memoizedProps.revealOrder&&"together"!==t.memoizedProps.revealOrder){if(null!==t.child){t.child.return=t,t=t.child;continue}}else if(0!==(128&t.flags))return t;if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Hi=0,Vi=null,Ui=null,Wi=null,Ki=!1,Yi=!1,qi=!1,Gi=0,Qi=0,Xi=null,Ji=0;function Zi(){throw Error(l(321))}function el(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Zn(e[n],t[n]))return!1;return!0}function tl(e,t,n,r,a,i){return Hi=i,Vi=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=null===e||null===e.memoizedState?vo:xo,qi=!1,i=n(r,a),qi=!1,Yi&&(i=rl(t,n,r,a)),nl(e),i}function nl(e){A.H=go;var t=null!==Ui&&null!==Ui.next;if(Hi=0,Wi=Ui=Vi=null,Ki=!1,Qi=0,Xi=null,t)throw Error(l(300));null===e||Ao||null!==(e=e.dependencies)&&Pa(e)&&(Ao=!0)}function rl(e,t,n,r){Vi=e;var a=0;do{if(Yi&&(Xi=null),Qi=0,Yi=!1,25<=a)throw Error(l(301));if(a+=1,Wi=Ui=null,null!=e.updateQueue){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,null!=i.memoCache&&(i.memoCache.index=0)}A.H=bo,i=t(n,r)}while(Yi);return i}function al(){var e=A.H,t=e.useState()[0];return t="function"===typeof t.then?cl(t):t,e=e.useState()[0],(null!==Ui?Ui.memoizedState:null)!==e&&(Vi.flags|=1024),t}function il(){var e=0!==Gi;return Gi=0,e}function ll(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ol(e){if(Ki){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Ki=!1}Hi=0,Wi=Ui=Vi=null,Yi=!1,Qi=Gi=0,Xi=null}function sl(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Wi?Vi.memoizedState=Wi=e:Wi=Wi.next=e,Wi}function ul(){if(null===Ui){var e=Vi.alternate;e=null!==e?e.memoizedState:null}else e=Ui.next;var t=null===Wi?Vi.memoizedState:Wi.next;if(null!==t)Wi=t,Ui=e;else{if(null===e){if(null===Vi.alternate)throw Error(l(467));throw Error(l(310))}e={memoizedState:(Ui=e).memoizedState,baseState:Ui.baseState,baseQueue:Ui.baseQueue,queue:Ui.queue,next:null},null===Wi?Vi.memoizedState=Wi=e:Wi=Wi.next=e}return Wi}function cl(e){var t=Qi;return Qi+=1,null===Xi&&(Xi=[]),e=ri(Xi,e,t),t=Vi,null===(null===Wi?t.memoizedState:Wi.next)&&(t=t.alternate,A.H=null===t||null===t.memoizedState?vo:xo),e}function dl(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return cl(e);if(e.$$typeof===k)return Fa(e)}throw Error(l(438,String(e)))}function pl(e){var t=null,n=Vi.updateQueue;if(null!==n&&(t=n.memoCache),null==t){var r=Vi.alternate;null!==r&&(null!==(r=r.updateQueue)&&(null!=(r=r.memoCache)&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===n&&(n={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=n),n.memoCache=t,void 0===(n=t.data[t.index]))for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=C;return t.index++,n}function fl(e,t){return"function"===typeof t?t(e):t}function hl(e){return ml(ul(),Ui,e)}function ml(e,t,n){var r=e.queue;if(null===r)throw Error(l(311));r.lastRenderedReducer=n;var a=e.baseQueue,i=r.pending;if(null!==i){if(null!==a){var o=a.next;a.next=i.next,i.next=o}t.baseQueue=a=i,r.pending=null}if(i=e.baseState,null===a)e.memoizedState=i;else{var s=o=null,u=null,c=t=a.next,d=!1;do{var p=-536870913&c.lane;if(p!==c.lane?(vu&p)===p:(Hi&p)===p){var f=c.revertLane;if(0===f)null!==u&&(u=u.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===Ua&&(d=!0);else{if((Hi&f)===f){c=c.next,f===Ua&&(d=!0);continue}p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===u?(s=u=p,o=i):u=u.next=p,Vi.lanes|=f,$u|=f}p=c.action,qi&&n(i,p),i=c.hasEagerState?c.eagerState:n(i,p)}else f={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},null===u?(s=u=f,o=i):u=u.next=f,Vi.lanes|=p,$u|=p;c=c.next}while(null!==c&&c!==t);if(null===u?o=i:u.next=s,!Zn(i,e.memoizedState)&&(Ao=!0,d&&null!==(n=Wa)))throw n;e.memoizedState=i,e.baseState=o,e.baseQueue=u,r.lastRenderedState=i}return null===a&&(r.lanes=0),[e.memoizedState,r.dispatch]}function gl(e){var t=ul(),n=t.queue;if(null===n)throw Error(l(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,i=t.memoizedState;if(null!==a){n.pending=null;var o=a=a.next;do{i=e(i,o.action),o=o.next}while(o!==a);Zn(i,t.memoizedState)||(Ao=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function vl(e,t,n){var r=Vi,a=ul(),i=pa;if(i){if(void 0===n)throw Error(l(407));n=n()}else n=t();var o=!Zn((Ui||a).memoizedState,n);if(o&&(a.memoizedState=n,Ao=!0),a=a.queue,Hl(yl.bind(null,r,a,e),[e]),a.getSnapshot!==t||o||null!==Wi&&1&Wi.memoizedState.tag){if(r.flags|=2048,Ol(9,{destroy:void 0},bl.bind(null,r,a,n,t),null),null===mu)throw Error(l(349));i||0!==(127&Hi)||xl(r,t,n)}return n}function xl(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=Vi.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function bl(e,t,n,r){t.value=n,t.getSnapshot=r,kl(t)&&wl(e)}function yl(e,t,n){return n(function(){kl(t)&&wl(e)})}function kl(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Zn(e,n)}catch(r){return!0}}function wl(e){var t=Ar(e,2);null!==t&&Gu(t,e,2)}function Sl(e){var t=sl();if("function"===typeof e){var n=e;if(e=n(),qi){be(!0);try{n()}finally{be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fl,lastRenderedState:e},t}function jl(e,t,n,r){return e.baseState=n,ml(e,Ui,"function"===typeof r?r:fl)}function $l(e,t,n,r,a){if(fo(e))throw Error(l(485));if(null!==(e=t.action)){var i={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){i.listeners.push(e)}};null!==A.T?n(!0):i.isTransition=!1,r(i),null===(n=t.pending)?(i.next=t.pending=i,El(t,i)):(i.next=n.next,t.pending=n.next=i)}}function El(e,t){var n=t.action,r=t.payload,a=e.state;if(t.isTransition){var i=A.T,l={};A.T=l;try{var o=n(a,r),s=A.S;null!==s&&s(l,o),zl(e,t,o)}catch(u){Nl(e,t,u)}finally{null!==i&&null!==l.types&&(i.types=l.types),A.T=i}}else try{zl(e,t,i=n(a,r))}catch(c){Nl(e,t,c)}}function zl(e,t,n){null!==n&&"object"===typeof n&&"function"===typeof n.then?n.then(function(n){Cl(e,t,n)},function(n){return Nl(e,t,n)}):Cl(e,t,n)}function Cl(e,t,n){t.status="fulfilled",t.value=n,_l(t),e.state=n,null!==(t=e.pending)&&((n=t.next)===t?e.pending=null:(n=n.next,t.next=n,El(e,n)))}function Nl(e,t,n){var r=e.pending;if(e.pending=null,null!==r){r=r.next;do{t.status="rejected",t.reason=n,_l(t),t=t.next}while(t!==r)}e.action=null}function _l(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Pl(e,t){return t}function Tl(e,t){if(pa){var n=mu.formState;if(null!==n){e:{var r=Vi;if(pa){if(da){t:{for(var a=da,i=ha;8!==a.nodeType;){if(!i){a=null;break t}if(null===(a=Ad(a.nextSibling))){a=null;break t}}a="F!"===(i=a.data)||"F"===i?a:null}if(a){da=Ad(a.nextSibling),r="F!"===a.data;break e}}ga(r)}r=!1}r&&(t=n[0])}}return(n=sl()).memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pl,lastRenderedState:t},n.queue=r,n=uo.bind(null,Vi,r),r.dispatch=n,r=Sl(!1),i=po.bind(null,Vi,!1,r.queue),a={state:t,dispatch:null,action:e,pending:null},(r=sl()).queue=a,n=$l.bind(null,Vi,a,i,n),a.dispatch=n,r.memoizedState=e,[t,n,!1]}function Fl(e){return Al(ul(),Ui,e)}function Al(e,t,n){if(t=ml(e,t,Pl)[0],e=hl(fl)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var r=cl(t)}catch(Yn){if(Yn===Ja)throw ei;throw Yn}else r=t;var a=(t=ul()).queue,i=a.dispatch;return n!==t.memoizedState&&(Vi.flags|=2048,Ol(9,{destroy:void 0},Rl.bind(null,a,n),null)),[r,i,e]}function Rl(e,t){e.action=t}function Ll(e){var t=ul(),n=Ui;if(null!==n)return Al(t,n,e);ul(),t=t.memoizedState;var r=(n=ul()).queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ol(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},null===(t=Vi.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t),null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Dl(){return ul().memoizedState}function Ml(e,t,n,r){var a=sl();Vi.flags|=e,a.memoizedState=Ol(1|t,{destroy:void 0},n,void 0===r?null:r)}function Il(e,t,n,r){var a=ul();r=void 0===r?null:r;var i=a.memoizedState.inst;null!==Ui&&null!==r&&el(r,Ui.memoizedState.deps)?a.memoizedState=Ol(t,i,n,r):(Vi.flags|=e,a.memoizedState=Ol(1|t,i,n,r))}function Bl(e,t){Ml(8390656,8,e,t)}function Hl(e,t){Il(2048,8,e,t)}function Vl(e){var t=ul().memoizedState;return function(e){Vi.flags|=4;var t=Vi.updateQueue;if(null===t)t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.events=[e];else{var n=t.events;null===n?t.events=[e]:n.push(e)}}({ref:t,nextImpl:e}),function(){if(0!==(2&hu))throw Error(l(440));return t.impl.apply(void 0,arguments)}}function Ul(e,t){return Il(4,2,e,t)}function Wl(e,t){return Il(4,4,e,t)}function Kl(e,t){if("function"===typeof t){e=e();var n=t(e);return function(){"function"===typeof n?n():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function Yl(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,Il(4,4,Kl.bind(null,t,e),n)}function ql(){}function Gl(e,t){var n=ul();t=void 0===t?null:t;var r=n.memoizedState;return null!==t&&el(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ql(e,t){var n=ul();t=void 0===t?null:t;var r=n.memoizedState;if(null!==t&&el(t,r[1]))return r[0];if(r=e(),qi){be(!0);try{e()}finally{be(!1)}}return n.memoizedState=[r,t],r}function Xl(e,t,n){return void 0===n||0!==(1073741824&Hi)&&0===(261930&vu)?e.memoizedState=t:(e.memoizedState=n,e=qu(),Vi.lanes|=e,$u|=e,n)}function Jl(e,t,n,r){return Zn(n,t)?n:null!==Ci.current?(e=Xl(e,n,r),Zn(e,t)||(Ao=!0),e):0===(42&Hi)||0!==(1073741824&Hi)&&0===(261930&vu)?(Ao=!0,e.memoizedState=n):(e=qu(),Vi.lanes|=e,$u|=e,t)}function Zl(e,t,n,r,a){var i=R.p;R.p=0!==i&&8>i?i:8;var l=A.T,o={};A.T=o,po(e,!1,t,n);try{var s=a(),u=A.S;if(null!==u&&u(o,s),null!==s&&"object"===typeof s&&"function"===typeof s.then)co(e,t,function(e,t){var n=[],r={status:"pending",value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status="rejected",r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}(s,r),Yu());else co(e,t,r,Yu())}catch(c){co(e,t,{then:function(){},status:"rejected",reason:c},Yu())}finally{R.p=i,null!==l&&null!==o.types&&(l.types=o.types),A.T=l}}function eo(){}function to(e,t,n,r){if(5!==e.tag)throw Error(l(476));var a=no(e).queue;Zl(e,a,t,L,null===n?eo:function(){return ro(e),n(r)})}function no(e){var t=e.memoizedState;if(null!==t)return t;var n={};return(t={memoizedState:L,baseState:L,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fl,lastRenderedState:L},next:null}).next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fl,lastRenderedState:n},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function ro(e){var t=no(e);null===t.next&&(t=e.alternate.memoizedState),co(e,t.next.queue,{},Yu())}function ao(){return Fa(dp)}function io(){return ul().memoizedState}function lo(){return ul().memoizedState}function oo(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var n=Yu(),r=yi(t,e=bi(n),n);return null!==r&&(Gu(r,t,n),ki(r,t,n)),t={cache:Ia()},void(e.payload=t)}t=t.return}}function so(e,t,n){var r=Yu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},fo(e)?ho(t,n):null!==(n=Fr(e,t,n,r))&&(Gu(n,e,r),mo(n,t,r))}function uo(e,t,n){co(e,t,n,Yu())}function co(e,t,n,r){var a={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(fo(e))ho(t,a);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)&&null!==(i=t.lastRenderedReducer))try{var l=t.lastRenderedState,o=i(l,n);if(a.hasEagerState=!0,a.eagerState=o,Zn(o,l))return Tr(e,t,a,0),null===mu&&Pr(),!1}catch(s){}if(null!==(n=Fr(e,t,a,r)))return Gu(n,e,r),mo(n,t,r),!0}return!1}function po(e,t,n,r){if(r={lane:2,revertLane:Vc(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},fo(e)){if(t)throw Error(l(479))}else null!==(t=Fr(e,n,r,2))&&Gu(t,e,2)}function fo(e){var t=e.alternate;return e===Vi||null!==t&&t===Vi}function ho(e,t){Yi=Ki=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function mo(e,t,n){if(0!==(4194048&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Ae(e,n)}}var go={readContext:Fa,use:dl,useCallback:Zi,useContext:Zi,useEffect:Zi,useImperativeHandle:Zi,useLayoutEffect:Zi,useInsertionEffect:Zi,useMemo:Zi,useReducer:Zi,useRef:Zi,useState:Zi,useDebugValue:Zi,useDeferredValue:Zi,useTransition:Zi,useSyncExternalStore:Zi,useId:Zi,useHostTransitionStatus:Zi,useFormState:Zi,useActionState:Zi,useOptimistic:Zi,useMemoCache:Zi,useCacheRefresh:Zi};go.useEffectEvent=Zi;var vo={readContext:Fa,use:dl,useCallback:function(e,t){return sl().memoizedState=[e,void 0===t?null:t],e},useContext:Fa,useEffect:Bl,useImperativeHandle:function(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,Ml(4194308,4,Kl.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ml(4194308,4,e,t)},useInsertionEffect:function(e,t){Ml(4,2,e,t)},useMemo:function(e,t){var n=sl();t=void 0===t?null:t;var r=e();if(qi){be(!0);try{e()}finally{be(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=sl();if(void 0!==n){var a=n(t);if(qi){be(!0);try{n(t)}finally{be(!1)}}}else a=t;return r.memoizedState=r.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},r.queue=e,e=e.dispatch=so.bind(null,Vi,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},sl().memoizedState=e},useState:function(e){var t=(e=Sl(e)).queue,n=uo.bind(null,Vi,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ql,useDeferredValue:function(e,t){return Xl(sl(),e,t)},useTransition:function(){var e=Sl(!1);return e=Zl.bind(null,Vi,e.queue,!0,!1),sl().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=Vi,a=sl();if(pa){if(void 0===n)throw Error(l(407));n=n()}else{if(n=t(),null===mu)throw Error(l(349));0!==(127&vu)||xl(r,t,n)}a.memoizedState=n;var i={value:n,getSnapshot:t};return a.queue=i,Bl(yl.bind(null,r,i,e),[e]),r.flags|=2048,Ol(9,{destroy:void 0},bl.bind(null,r,i,n,t),null),n},useId:function(){var e=sl(),t=mu.identifierPrefix;if(pa){var n=aa;t="_"+t+"R_"+(n=(ra&~(1<<32-ye(ra)-1)).toString(32)+n),0<(n=Gi++)&&(t+="H"+n.toString(32)),t+="_"}else t="_"+t+"r_"+(n=Ji++).toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:ao,useFormState:Tl,useActionState:Tl,useOptimistic:function(e){var t=sl();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=po.bind(null,Vi,!0,n),n.dispatch=t,[e,t]},useMemoCache:pl,useCacheRefresh:function(){return sl().memoizedState=oo.bind(null,Vi)},useEffectEvent:function(e){var t=sl(),n={impl:e};return t.memoizedState=n,function(){if(0!==(2&hu))throw Error(l(440));return n.impl.apply(void 0,arguments)}}},xo={readContext:Fa,use:dl,useCallback:Gl,useContext:Fa,useEffect:Hl,useImperativeHandle:Yl,useInsertionEffect:Ul,useLayoutEffect:Wl,useMemo:Ql,useReducer:hl,useRef:Dl,useState:function(){return hl(fl)},useDebugValue:ql,useDeferredValue:function(e,t){return Jl(ul(),Ui.memoizedState,e,t)},useTransition:function(){var e=hl(fl)[0],t=ul().memoizedState;return["boolean"===typeof e?e:cl(e),t]},useSyncExternalStore:vl,useId:io,useHostTransitionStatus:ao,useFormState:Fl,useActionState:Fl,useOptimistic:function(e,t){return jl(ul(),0,e,t)},useMemoCache:pl,useCacheRefresh:lo};xo.useEffectEvent=Vl;var bo={readContext:Fa,use:dl,useCallback:Gl,useContext:Fa,useEffect:Hl,useImperativeHandle:Yl,useInsertionEffect:Ul,useLayoutEffect:Wl,useMemo:Ql,useReducer:gl,useRef:Dl,useState:function(){return gl(fl)},useDebugValue:ql,useDeferredValue:function(e,t){var n=ul();return null===Ui?Xl(n,e,t):Jl(n,Ui.memoizedState,e,t)},useTransition:function(){var e=gl(fl)[0],t=ul().memoizedState;return["boolean"===typeof e?e:cl(e),t]},useSyncExternalStore:vl,useId:io,useHostTransitionStatus:ao,useFormState:Ll,useActionState:Ll,useOptimistic:function(e,t){var n=ul();return null!==Ui?jl(n,0,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:pl,useCacheRefresh:lo};function yo(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:f({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}bo.useEffectEvent=Vl;var ko={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Yu(),a=bi(r);a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=yi(e,a,r))&&(Gu(t,e,r),ki(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Yu(),a=bi(r);a.tag=1,a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=yi(e,a,r))&&(Gu(t,e,r),ki(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Yu(),r=bi(n);r.tag=2,void 0!==t&&null!==t&&(r.callback=t),null!==(t=yi(e,r,n))&&(Gu(t,e,n),ki(t,e,n))}};function wo(e,t,n,r,a,i,l){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,i,l):!t.prototype||!t.prototype.isPureReactComponent||(!er(n,r)||!er(a,i))}function So(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ko.enqueueReplaceState(t,t.state,null)}function jo(e,t){var n=t;if("ref"in t)for(var r in n={},t)"ref"!==r&&(n[r]=t[r]);if(e=e.defaultProps)for(var a in n===t&&(n=f({},n)),e)void 0===n[a]&&(n[a]=e[a]);return n}function $o(e){zr(e)}function Eo(e){console.error(e)}function zo(e){zr(e)}function Co(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function No(e,t,n){try{(0,e.onCaughtError)(n.value,{componentStack:n.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function _o(e,t,n){return(n=bi(n)).tag=3,n.payload={element:null},n.callback=function(){Co(e,t)},n}function Po(e){return(e=bi(e)).tag=3,e}function To(e,t,n,r){var a=n.type.getDerivedStateFromError;if("function"===typeof a){var i=r.value;e.payload=function(){return a(i)},e.callback=function(){No(t,n,r)}}var l=n.stateNode;null!==l&&"function"===typeof l.componentDidCatch&&(e.callback=function(){No(t,n,r),"function"!==typeof a&&(null===Ou?Ou=new Set([this]):Ou.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}var Fo=Error(l(461)),Ao=!1;function Ro(e,t,n,r){t.child=null===e?mi(t,null,n,r):hi(t,e.child,n,r)}function Lo(e,t,n,r,a){n=n.render;var i=t.ref;if("ref"in r){var l={};for(var o in r)"ref"!==o&&(l[o]=r[o])}else l=r;return Ta(t),r=tl(e,t,n,l,i,a),o=il(),null===e||Ao?(pa&&o&&oa(t),t.flags|=1,Ro(e,t,r,a),t.child):(ll(e,t,a),is(e,t,a))}function Oo(e,t,n,r,a){if(null===e){var i=n.type;return"function"!==typeof i||Ir(i)||void 0!==i.defaultProps||null!==n.compare?((e=Vr(n.type,null,r,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=i,Do(e,t,i,r,a))}if(i=e.child,!ls(e,a)){var l=i.memoizedProps;if((n=null!==(n=n.compare)?n:er)(l,r)&&e.ref===t.ref)return is(e,t,a)}return t.flags|=1,(e=Br(i,r)).ref=t.ref,e.return=t,t.child=e}function Do(e,t,n,r,a){if(null!==e){var i=e.memoizedProps;if(er(i,r)&&e.ref===t.ref){if(Ao=!1,t.pendingProps=r=i,!ls(e,a))return t.lanes=e.lanes,is(e,t,a);0!==(131072&e.flags)&&(Ao=!0)}}return Wo(e,t,n,r,a)}function Mo(e,t,n,r){var a=r.children,i=null!==e?e.memoizedState:null;if(null===e&&null===t.stateNode&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),"hidden"===r.mode){if(0!==(128&t.flags)){if(i=null!==i?i.baseLanes|n:n,null!==e){for(r=t.child=e.child,a=0;null!==r;)a=a|r.lanes|r.childLanes,r=r.sibling;r=a&~i}else r=0,t.child=null;return Bo(e,t,i,n,r)}if(0===(536870912&n))return r=t.lanes=536870912,Bo(e,t,null!==i?i.baseLanes|n:n,n,r);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Qa(0,null!==i?i.cachePool:null),null!==i?_i(t,i):Pi(),Oi(t)}else null!==i?(Qa(0,i.cachePool),_i(t,i),Di(),t.memoizedState=null):(null!==e&&Qa(0,null),Pi(),Di());return Ro(e,t,a,n),t.child}function Io(e,t){return null!==e&&22===e.tag||null!==t.stateNode||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Bo(e,t,n,r,a){var i=Ga();return i=null===i?null:{parent:Ma._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},null!==e&&Qa(0,null),Pi(),Oi(t),null!==e&&_a(e,t,r,!0),t.childLanes=a,null}function Ho(e,t){return(t=es({mode:t.mode,children:t.children},e.mode)).ref=e.ref,e.child=t,t.return=e,t}function Vo(e,t,n){return hi(t,e.child,null,n),(e=Ho(t,t.pendingProps)).flags|=2,Mi(t),t.memoizedState=null,e}function Uo(e,t){var n=t.ref;if(null===n)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof n&&"object"!==typeof n)throw Error(l(284));null!==e&&e.ref===n||(t.flags|=4194816)}}function Wo(e,t,n,r,a){return Ta(t),n=tl(e,t,n,r,void 0,a),r=il(),null===e||Ao?(pa&&r&&oa(t),t.flags|=1,Ro(e,t,n,a),t.child):(ll(e,t,a),is(e,t,a))}function Ko(e,t,n,r,a,i){return Ta(t),t.updateQueue=null,n=rl(t,r,n,a),nl(e),r=il(),null===e||Ao?(pa&&r&&oa(t),t.flags|=1,Ro(e,t,n,i),t.child):(ll(e,t,i),is(e,t,i))}function Yo(e,t,n,r,a){if(Ta(t),null===t.stateNode){var i=Or,l=n.contextType;"object"===typeof l&&null!==l&&(i=Fa(l)),i=new n(r,i),t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,i.updater=ko,t.stateNode=i,i._reactInternals=t,(i=t.stateNode).props=r,i.state=t.memoizedState,i.refs={},vi(t),l=n.contextType,i.context="object"===typeof l&&null!==l?Fa(l):Or,i.state=t.memoizedState,"function"===typeof(l=n.getDerivedStateFromProps)&&(yo(t,n,l,r),i.state=t.memoizedState),"function"===typeof n.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(l=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),l!==i.state&&ko.enqueueReplaceState(i,i.state,null),$i(t,r,i,a),ji(),i.state=t.memoizedState),"function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!0}else if(null===e){i=t.stateNode;var o=t.memoizedProps,s=jo(n,o);i.props=s;var u=i.context,c=n.contextType;l=Or,"object"===typeof c&&null!==c&&(l=Fa(c));var d=n.getDerivedStateFromProps;c="function"===typeof d||"function"===typeof i.getSnapshotBeforeUpdate,o=t.pendingProps!==o,c||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(o||u!==l)&&So(t,i,r,l),gi=!1;var p=t.memoizedState;i.state=p,$i(t,r,i,a),ji(),u=t.memoizedState,o||p!==u||gi?("function"===typeof d&&(yo(t,n,d,r),u=t.memoizedState),(s=gi||wo(t,n,s,r,p,u,l))?(c||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||("function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"===typeof i.componentDidMount&&(t.flags|=4194308)):("function"===typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),i.props=r,i.state=u,i.context=l,r=s):("function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,xi(e,t),c=jo(n,l=t.memoizedProps),i.props=c,d=t.pendingProps,p=i.context,u=n.contextType,s=Or,"object"===typeof u&&null!==u&&(s=Fa(u)),(u="function"===typeof(o=n.getDerivedStateFromProps)||"function"===typeof i.getSnapshotBeforeUpdate)||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(l!==d||p!==s)&&So(t,i,r,s),gi=!1,p=t.memoizedState,i.state=p,$i(t,r,i,a),ji();var f=t.memoizedState;l!==d||p!==f||gi||null!==e&&null!==e.dependencies&&Pa(e.dependencies)?("function"===typeof o&&(yo(t,n,o,r),f=t.memoizedState),(c=gi||wo(t,n,c,r,p,f,s)||null!==e&&null!==e.dependencies&&Pa(e.dependencies))?(u||"function"!==typeof i.UNSAFE_componentWillUpdate&&"function"!==typeof i.componentWillUpdate||("function"===typeof i.componentWillUpdate&&i.componentWillUpdate(r,f,s),"function"===typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(r,f,s)),"function"===typeof i.componentDidUpdate&&(t.flags|=4),"function"===typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof i.componentDidUpdate||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=f),i.props=r,i.state=f,i.context=s,r=c):("function"!==typeof i.componentDidUpdate||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return i=r,Uo(e,t),r=0!==(128&t.flags),i||r?(i=t.stateNode,n=r&&"function"!==typeof n.getDerivedStateFromError?null:i.render(),t.flags|=1,null!==e&&r?(t.child=hi(t,e.child,null,a),t.child=hi(t,null,n,a)):Ro(e,t,n,a),t.memoizedState=i.state,e=t.child):e=is(e,t,a),e}function qo(e,t,n,r){return ya(),t.flags|=256,Ro(e,t,n,r),t.child}var Go={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qo(e){return{baseLanes:e,cachePool:Xa()}}function Xo(e,t,n){return e=null!==e?e.childLanes&~n:0,t&&(e|=Cu),e}function Jo(e,t,n){var r,a=t.pendingProps,i=!1,o=0!==(128&t.flags);if((r=o)||(r=(null===e||null!==e.memoizedState)&&0!==(2&Ii.current)),r&&(i=!0,t.flags&=-129),r=0!==(32&t.flags),t.flags&=-33,null===e){if(pa){if(i?Ri(t):Di(),(e=da)?null!==(e=null!==(e=Pd(e,ha))&&"&"!==e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==na?{id:ra,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},(n=Kr(e)).return=t,t.child=n,ca=t,da=null):e=null,null===e)throw ga(t);return Fd(e)?t.lanes=32:t.lanes=536870912,null}var s=a.children;return a=a.fallback,i?(Di(),s=es({mode:"hidden",children:s},i=t.mode),a=Ur(a,i,n,null),s.return=t,a.return=t,s.sibling=a,t.child=s,(a=t.child).memoizedState=Qo(n),a.childLanes=Xo(e,r,n),t.memoizedState=Go,Io(null,a)):(Ri(t),Zo(t,s))}var u=e.memoizedState;if(null!==u&&null!==(s=u.dehydrated)){if(o)256&t.flags?(Ri(t),t.flags&=-257,t=ts(e,t,n)):null!==t.memoizedState?(Di(),t.child=e.child,t.flags|=128,t=null):(Di(),s=a.fallback,i=t.mode,a=es({mode:"visible",children:a.children},i),(s=Ur(s,i,n,null)).flags|=2,a.return=t,s.return=t,a.sibling=s,t.child=a,hi(t,e.child,null,n),(a=t.child).memoizedState=Qo(n),a.childLanes=Xo(e,r,n),t.memoizedState=Go,t=Io(null,a));else if(Ri(t),Fd(s)){if(r=s.nextSibling&&s.nextSibling.dataset)var c=r.dgst;r=c,(a=Error(l(419))).stack="",a.digest=r,wa({value:a,source:null,stack:null}),t=ts(e,t,n)}else if(Ao||_a(e,t,n,!1),r=0!==(n&e.childLanes),Ao||r){if(null!==(r=mu)&&(0!==(a=Re(r,n))&&a!==u.retryLane))throw u.retryLane=a,Ar(e,a),Gu(r,e,a),Fo;Td(s)||oc(),t=ts(e,t,n)}else Td(s)?(t.flags|=192,t.child=e.child,t=null):(e=u.treeContext,da=Ad(s.nextSibling),ca=t,pa=!0,fa=null,ha=!1,null!==e&&ua(t,e),(t=Zo(t,a.children)).flags|=4096);return t}return i?(Di(),s=a.fallback,i=t.mode,c=(u=e.child).sibling,(a=Br(u,{mode:"hidden",children:a.children})).subtreeFlags=65011712&u.subtreeFlags,null!==c?s=Br(c,s):(s=Ur(s,i,n,null)).flags|=2,s.return=t,a.return=t,a.sibling=s,t.child=a,Io(null,a),a=t.child,null===(s=e.child.memoizedState)?s=Qo(n):(null!==(i=s.cachePool)?(u=Ma._currentValue,i=i.parent!==u?{parent:u,pool:u}:i):i=Xa(),s={baseLanes:s.baseLanes|n,cachePool:i}),a.memoizedState=s,a.childLanes=Xo(e,r,n),t.memoizedState=Go,Io(e.child,a)):(Ri(t),e=(n=e.child).sibling,(n=Br(n,{mode:"visible",children:a.children})).return=t,n.sibling=null,null!==e&&(null===(r=t.deletions)?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Zo(e,t){return(t=es({mode:"visible",children:t},e.mode)).return=e,e.child=t}function es(e,t){return(e=Mr(22,e,null,t)).lanes=0,e}function ts(e,t,n){return hi(t,e.child,null,n),(e=Zo(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function ns(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),Ca(e.return,t,n)}function rs(e,t,n,r,a,i){var l=e.memoizedState;null===l?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a,treeForkCount:i}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=a,l.treeForkCount=i)}function as(e,t,n){var r=t.pendingProps,a=r.revealOrder,i=r.tail;r=r.children;var l=Ii.current,o=0!==(2&l);if(o?(l=1&l|2,t.flags|=128):l&=1,B(Ii,l),Ro(e,t,r,n),r=pa?Zr:0,!o&&null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&ns(e,n,t);else if(19===e.tag)ns(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;null!==n;)null!==(e=n.alternate)&&null===Bi(e)&&(a=n),n=n.sibling;null===(n=a)?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),rs(t,!1,a,n,i,r);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Bi(e)){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}rs(t,!0,n,null,i,r);break;case"together":rs(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function is(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),$u|=t.lanes,0===(n&t.childLanes)){if(null===e)return null;if(_a(e,t,n,!1),0===(n&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(l(153));if(null!==t.child){for(n=Br(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Br(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function ls(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Pa(e))}function os(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps)Ao=!0;else{if(!ls(e,n)&&0===(128&t.flags))return Ao=!1,function(e,t,n){switch(t.tag){case 3:q(t,t.stateNode.containerInfo),Ea(0,Ma,e.memoizedState.cache),ya();break;case 27:case 5:Q(t);break;case 4:q(t,t.stateNode.containerInfo);break;case 10:Ea(0,t.type,t.memoizedProps.value);break;case 31:if(null!==t.memoizedState)return t.flags|=128,Li(t),null;break;case 13:var r=t.memoizedState;if(null!==r)return null!==r.dehydrated?(Ri(t),t.flags|=128,null):0!==(n&t.child.childLanes)?Jo(e,t,n):(Ri(t),null!==(e=is(e,t,n))?e.sibling:null);Ri(t);break;case 19:var a=0!==(128&e.flags);if((r=0!==(n&t.childLanes))||(_a(e,t,n,!1),r=0!==(n&t.childLanes)),a){if(r)return as(e,t,n);t.flags|=128}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),B(Ii,Ii.current),r)break;return null;case 22:return t.lanes=0,Mo(e,t,n,t.pendingProps);case 24:Ea(0,Ma,e.memoizedState.cache)}return is(e,t,n)}(e,t,n);Ao=0!==(131072&e.flags)}else Ao=!1,pa&&0!==(1048576&t.flags)&&la(t,Zr,t.index);switch(t.lanes=0,t.tag){case 16:e:{var r=t.pendingProps;if(e=ai(t.elementType),t.type=e,"function"!==typeof e){if(void 0!==e&&null!==e){var a=e.$$typeof;if(a===w){t.tag=11,t=Lo(null,t,e,r,n);break e}if(a===$){t.tag=14,t=Oo(null,t,e,r,n);break e}}throw t=T(e)||e,Error(l(306,t,""))}Ir(e)?(r=jo(e,r),t.tag=1,t=Yo(null,t,e,r,n)):(t.tag=0,t=Wo(null,t,e,r,n))}return t;case 0:return Wo(e,t,t.type,t.pendingProps,n);case 1:return Yo(e,t,r=t.type,a=jo(r,t.pendingProps),n);case 3:e:{if(q(t,t.stateNode.containerInfo),null===e)throw Error(l(387));r=t.pendingProps;var i=t.memoizedState;a=i.element,xi(e,t),$i(t,r,null,n);var o=t.memoizedState;if(r=o.cache,Ea(0,Ma,r),r!==i.cache&&Na(t,[Ma],n,!0),ji(),r=o.element,i.isDehydrated){if(i={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=qo(e,t,r,n);break e}if(r!==a){wa(a=Gr(Error(l(424)),t)),t=qo(e,t,r,n);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(da=Ad(e.firstChild),ca=t,pa=!0,fa=null,ha=!0,n=mi(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(ya(),r===a){t=is(e,t,n);break e}Ro(e,t,r,n)}t=t.child}return t;case 26:return Uo(e,t),null===e?(n=Kd(t.type,null,t.pendingProps,null))?t.memoizedState=n:pa||(n=t.type,e=t.pendingProps,(r=vd(K.current).createElement(n))[Be]=t,r[He]=e,fd(r,n,e),et(r),t.stateNode=r):t.memoizedState=Kd(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Q(t),null===e&&pa&&(r=t.stateNode=Dd(t.type,t.pendingProps,K.current),ca=t,ha=!0,a=da,zd(t.type)?(Rd=a,da=Ad(r.firstChild)):da=a),Ro(e,t,t.pendingProps.children,n),Uo(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&pa&&((a=r=da)&&(null!==(r=function(e,t,n,r){for(;1===e.nodeType;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[qe])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(i=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(i!==a.rel||e.getAttribute("href")!==(null==a.href||""===a.href?null:a.href)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin)||e.getAttribute("title")!==(null==a.title?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((i=e.getAttribute("src"))!==(null==a.src?null:a.src)||e.getAttribute("type")!==(null==a.type?null:a.type)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var i=null==a.name?null:""+a.name;if("hidden"===a.type&&e.getAttribute("name")===i)return e}if(null===(e=Ad(e.nextSibling)))break}return null}(r,t.type,t.pendingProps,ha))?(t.stateNode=r,ca=t,da=Ad(r.firstChild),ha=!1,a=!0):a=!1),a||ga(t)),Q(t),a=t.type,i=t.pendingProps,o=null!==e?e.memoizedProps:null,r=i.children,yd(a,i)?r=null:null!==o&&yd(a,o)&&(t.flags|=32),null!==t.memoizedState&&(a=tl(e,t,al,null,null,n),dp._currentValue=a),Uo(e,t),Ro(e,t,r,n),t.child;case 6:return null===e&&pa&&((e=n=da)&&(null!==(n=function(e,t,n){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!n)return null;if(null===(e=Ad(e.nextSibling)))return null}return e}(n,t.pendingProps,ha))?(t.stateNode=n,ca=t,da=null,e=!0):e=!1),e||ga(t)),null;case 13:return Jo(e,t,n);case 4:return q(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=hi(t,null,r,n):Ro(e,t,r,n),t.child;case 11:return Lo(e,t,t.type,t.pendingProps,n);case 7:return Ro(e,t,t.pendingProps,n),t.child;case 8:case 12:return Ro(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Ea(0,t.type,r.value),Ro(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Ta(t),r=r(a=Fa(a)),t.flags|=1,Ro(e,t,r,n),t.child;case 14:return Oo(e,t,t.type,t.pendingProps,n);case 15:return Do(e,t,t.type,t.pendingProps,n);case 19:return as(e,t,n);case 31:return function(e,t,n){var r=t.pendingProps,a=0!==(128&t.flags);if(t.flags&=-129,null===e){if(pa){if("hidden"===r.mode)return e=Ho(t,r),t.lanes=536870912,Io(null,e);if(Li(t),(e=da)?null!==(e=null!==(e=Pd(e,ha))&&"&"===e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==na?{id:ra,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},(n=Kr(e)).return=t,t.child=n,ca=t,da=null):e=null,null===e)throw ga(t);return t.lanes=536870912,null}return Ho(t,r)}var i=e.memoizedState;if(null!==i){var o=i.dehydrated;if(Li(t),a)if(256&t.flags)t.flags&=-257,t=Vo(e,t,n);else{if(null===t.memoizedState)throw Error(l(558));t.child=e.child,t.flags|=128,t=null}else if(Ao||_a(e,t,n,!1),a=0!==(n&e.childLanes),Ao||a){if(null!==(r=mu)&&0!==(o=Re(r,n))&&o!==i.retryLane)throw i.retryLane=o,Ar(e,o),Gu(r,e,o),Fo;oc(),t=Vo(e,t,n)}else e=i.treeContext,da=Ad(o.nextSibling),ca=t,pa=!0,fa=null,ha=!1,null!==e&&ua(t,e),(t=Ho(t,r)).flags|=4096;return t}return(e=Br(e.child,{mode:r.mode,children:r.children})).ref=t.ref,t.child=e,e.return=t,e}(e,t,n);case 22:return Mo(e,t,n,t.pendingProps);case 24:return Ta(t),r=Fa(Ma),null===e?(null===(a=Ga())&&(a=mu,i=Ia(),a.pooledCache=i,i.refCount++,null!==i&&(a.pooledCacheLanes|=n),a=i),t.memoizedState={parent:r,cache:a},vi(t),Ea(0,Ma,a)):(0!==(e.lanes&n)&&(xi(e,t),$i(t,null,null,n),ji()),a=e.memoizedState,i=t.memoizedState,a.parent!==r?(a={parent:r,cache:r},t.memoizedState=a,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=a),Ea(0,Ma,r)):(r=i.cache,Ea(0,Ma,r),r!==a.cache&&Na(t,[Ma],n,!0))),Ro(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(l(156,t.tag))}function ss(e){e.flags|=4}function us(e,t,n,r,a){if((t=0!==(32&e.mode))&&(t=!1),t){if(e.flags|=16777216,(335544128&a)===a)if(e.stateNode.complete)e.flags|=8192;else{if(!ac())throw ii=ti,Za;e.flags|=8192}}else e.flags&=-16777217}function cs(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!ip(t)){if(!ac())throw ii=ti,Za;e.flags|=8192}}function ds(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?_e():536870912,e.lanes|=t,Nu|=t)}function ps(e,t){if(!pa)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function fs(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=65011712&a.subtreeFlags,r|=65011712&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function hs(e,t,n){var r=t.pendingProps;switch(sa(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return fs(t),null;case 3:return n=t.stateNode,r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),za(Ma),G(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),null!==e&&null!==e.child||(ba(t)?ss(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,ka())),fs(t),null;case 26:var a=t.type,i=t.memoizedState;return null===e?(ss(t),null!==i?(fs(t),cs(t,i)):(fs(t),us(t,a,0,0,n))):i?i!==e.memoizedState?(ss(t),fs(t),cs(t,i)):(fs(t),t.flags&=-16777217):((e=e.memoizedProps)!==r&&ss(t),fs(t),us(t,a,0,0,n)),null;case 27:if(X(t),n=K.current,a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&ss(t);else{if(!r){if(null===t.stateNode)throw Error(l(166));return fs(t),null}e=U.current,ba(t)?va(t):(e=Dd(a,r,n),t.stateNode=e,ss(t))}return fs(t),null;case 5:if(X(t),a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&ss(t);else{if(!r){if(null===t.stateNode)throw Error(l(166));return fs(t),null}if(i=U.current,ba(t))va(t);else{var o=vd(K.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":(i=o.createElement("div")).innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i="string"===typeof r.is?o.createElement("select",{is:r.is}):o.createElement("select"),r.multiple?i.multiple=!0:r.size&&(i.size=r.size);break;default:i="string"===typeof r.is?o.createElement(a,{is:r.is}):o.createElement(a)}}i[Be]=t,i[He]=r;e:for(o=t.child;null!==o;){if(5===o.tag||6===o.tag)i.appendChild(o.stateNode);else if(4!==o.tag&&27!==o.tag&&null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;null===o.sibling;){if(null===o.return||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=i;e:switch(fd(i,a,r),a){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&ss(t)}}return fs(t),us(t,t.type,null===e||e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==r&&ss(t);else{if("string"!==typeof r&&null===t.stateNode)throw Error(l(166));if(e=K.current,ba(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,null!==(a=ca))switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Be]=t,(e=!!(e.nodeValue===n||null!==r&&!0===r.suppressHydrationWarning||cd(e.nodeValue,n)))||ga(t,!0)}else(e=vd(e).createTextNode(r))[Be]=t,t.stateNode=e}return fs(t),null;case 31:if(n=t.memoizedState,null===e||null!==e.memoizedState){if(r=ba(t),null!==n){if(null===e){if(!r)throw Error(l(318));if(!(e=null!==(e=t.memoizedState)?e.dehydrated:null))throw Error(l(557));e[Be]=t}else ya(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;fs(t),e=!1}else n=ka(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return 256&t.flags?(Mi(t),t):(Mi(t),null);if(0!==(128&t.flags))throw Error(l(558))}return fs(t),null;case 13:if(r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(a=ba(t),null!==r&&null!==r.dehydrated){if(null===e){if(!a)throw Error(l(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(l(317));a[Be]=t}else ya(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;fs(t),a=!1}else a=ka(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return 256&t.flags?(Mi(t),t):(Mi(t),null)}return Mi(t),0!==(128&t.flags)?(t.lanes=n,t):(n=null!==r,e=null!==e&&null!==e.memoizedState,n&&(a=null,null!==(r=t.child).alternate&&null!==r.alternate.memoizedState&&null!==r.alternate.memoizedState.cachePool&&(a=r.alternate.memoizedState.cachePool.pool),i=null,null!==r.memoizedState&&null!==r.memoizedState.cachePool&&(i=r.memoizedState.cachePool.pool),i!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ds(t,t.updateQueue),fs(t),null);case 4:return G(),null===e&&ed(t.stateNode.containerInfo),fs(t),null;case 10:return za(t.type),fs(t),null;case 19:if(I(Ii),null===(r=t.memoizedState))return fs(t),null;if(a=0!==(128&t.flags),null===(i=r.rendering))if(a)ps(r,!1);else{if(0!==ju||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(i=Bi(e))){for(t.flags|=128,ps(r,!1),e=i.updateQueue,t.updateQueue=e,ds(t,e),t.subtreeFlags=0,e=n,n=t.child;null!==n;)Hr(n,e),n=n.sibling;return B(Ii,1&Ii.current|2),pa&&ia(t,r.treeForkCount),t.child}e=e.sibling}null!==r.tail&&se()>Ru&&(t.flags|=128,a=!0,ps(r,!1),t.lanes=4194304)}else{if(!a)if(null!==(e=Bi(i))){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ds(t,e),ps(r,!0),null===r.tail&&"hidden"===r.tailMode&&!i.alternate&&!pa)return fs(t),null}else 2*se()-r.renderingStartTime>Ru&&536870912!==n&&(t.flags|=128,a=!0,ps(r,!1),t.lanes=4194304);r.isBackwards?(i.sibling=t.child,t.child=i):(null!==(e=r.last)?e.sibling=i:t.child=i,r.last=i)}return null!==r.tail?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=se(),e.sibling=null,n=Ii.current,B(Ii,a?1&n|2:1&n),pa&&ia(t,r.treeForkCount),e):(fs(t),null);case 22:case 23:return Mi(t),Ti(),r=null!==t.memoizedState,null!==e?null!==e.memoizedState!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?0!==(536870912&n)&&0===(128&t.flags)&&(fs(t),6&t.subtreeFlags&&(t.flags|=8192)):fs(t),null!==(n=t.updateQueue)&&ds(t,n.retryQueue),n=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),r=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),null!==e&&I(qa),null;case 24:return n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),za(Ma),fs(t),null;case 25:case 30:return null}throw Error(l(156,t.tag))}function ms(e,t){switch(sa(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return za(Ma),G(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return X(t),null;case 31:if(null!==t.memoizedState){if(Mi(t),null===t.alternate)throw Error(l(340));ya()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 13:if(Mi(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(l(340));ya()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return I(Ii),null;case 4:return G(),null;case 10:return za(t.type),null;case 22:case 23:return Mi(t),Ti(),null!==e&&I(qa),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return za(Ma),null;default:return null}}function gs(e,t){switch(sa(t),t.tag){case 3:za(Ma),G();break;case 26:case 27:case 5:X(t);break;case 4:G();break;case 31:null!==t.memoizedState&&Mi(t);break;case 13:Mi(t);break;case 19:I(Ii);break;case 10:za(t.type);break;case 22:case 23:Mi(t),Ti(),null!==e&&I(qa);break;case 24:za(Ma)}}function vs(e,t){try{var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var a=r.next;n=a;do{if((n.tag&e)===e){r=void 0;var i=n.create,l=n.inst;r=i(),l.destroy=r}n=n.next}while(n!==a)}}catch(o){jc(t,t.return,o)}}function xs(e,t,n){try{var r=t.updateQueue,a=null!==r?r.lastEffect:null;if(null!==a){var i=a.next;r=i;do{if((r.tag&e)===e){var l=r.inst,o=l.destroy;if(void 0!==o){l.destroy=void 0,a=t;var s=n,u=o;try{u()}catch(c){jc(a,s,c)}}}r=r.next}while(r!==i)}}catch(c){jc(t,t.return,c)}}function bs(e){var t=e.updateQueue;if(null!==t){var n=e.stateNode;try{zi(t,n)}catch(r){jc(e,e.return,r)}}}function ys(e,t,n){n.props=jo(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(r){jc(e,t,r)}}function ks(e,t){try{var n=e.ref;if(null!==n){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;default:r=e.stateNode}"function"===typeof n?e.refCleanup=n(r):n.current=r}}catch(a){jc(e,t,a)}}function ws(e,t){var n=e.ref,r=e.refCleanup;if(null!==n)if("function"===typeof r)try{r()}catch(a){jc(e,t,a)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof n)try{n(null)}catch(i){jc(e,t,i)}else n.current=null}function Ss(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&r.focus();break e;case"img":n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(a){jc(e,e.return,a)}}function js(e,t,n){try{var r=e.stateNode;!function(e,t,n,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,o=null,s=null,u=null,c=null,d=null;for(h in n){var p=n[h];if(n.hasOwnProperty(h)&&null!=p)switch(h){case"checked":case"value":break;case"defaultValue":u=p;default:r.hasOwnProperty(h)||dd(e,t,h,null,r,p)}}for(var f in r){var h=r[f];if(p=n[f],r.hasOwnProperty(f)&&(null!=h||null!=p))switch(f){case"type":i=h;break;case"name":a=h;break;case"checked":c=h;break;case"defaultChecked":d=h;break;case"value":o=h;break;case"defaultValue":s=h;break;case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(l(137,t));break;default:h!==p&&dd(e,t,f,h,r,p)}}return void xt(e,o,s,u,c,d,i,a);case"select":for(i in h=o=s=f=null,n)if(u=n[i],n.hasOwnProperty(i)&&null!=u)switch(i){case"value":break;case"multiple":h=u;default:r.hasOwnProperty(i)||dd(e,t,i,null,r,u)}for(a in r)if(i=r[a],u=n[a],r.hasOwnProperty(a)&&(null!=i||null!=u))switch(a){case"value":f=i;break;case"defaultValue":s=i;break;case"multiple":o=i;default:i!==u&&dd(e,t,a,i,r,u)}return t=s,n=o,r=h,void(null!=f?kt(e,!!n,f,!1):!!r!==!!n&&(null!=t?kt(e,!!n,t,!0):kt(e,!!n,n?[]:"",!1)));case"textarea":for(s in h=f=null,n)if(a=n[s],n.hasOwnProperty(s)&&null!=a&&!r.hasOwnProperty(s))switch(s){case"value":case"children":break;default:dd(e,t,s,null,r,a)}for(o in r)if(a=r[o],i=n[o],r.hasOwnProperty(o)&&(null!=a||null!=i))switch(o){case"value":f=a;break;case"defaultValue":h=a;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=a)throw Error(l(91));break;default:a!==i&&dd(e,t,o,a,r,i)}return void wt(e,f,h);case"option":for(var m in n)if(f=n[m],n.hasOwnProperty(m)&&null!=f&&!r.hasOwnProperty(m))if("selected"===m)e.selected=!1;else dd(e,t,m,null,r,f);for(u in r)if(f=r[u],h=n[u],r.hasOwnProperty(u)&&f!==h&&(null!=f||null!=h))if("selected"===u)e.selected=f&&"function"!==typeof f&&"symbol"!==typeof f;else dd(e,t,u,f,r,h);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in n)f=n[g],n.hasOwnProperty(g)&&null!=f&&!r.hasOwnProperty(g)&&dd(e,t,g,null,r,f);for(c in r)if(f=r[c],h=n[c],r.hasOwnProperty(c)&&f!==h&&(null!=f||null!=h))switch(c){case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(l(137,t));break;default:dd(e,t,c,f,r,h)}return;default:if(Ct(t)){for(var v in n)f=n[v],n.hasOwnProperty(v)&&void 0!==f&&!r.hasOwnProperty(v)&&pd(e,t,v,void 0,r,f);for(d in r)f=r[d],h=n[d],!r.hasOwnProperty(d)||f===h||void 0===f&&void 0===h||pd(e,t,d,f,r,h);return}}for(var x in n)f=n[x],n.hasOwnProperty(x)&&null!=f&&!r.hasOwnProperty(x)&&dd(e,t,x,null,r,f);for(p in r)f=r[p],h=n[p],!r.hasOwnProperty(p)||f===h||null==f&&null==h||dd(e,t,p,f,r,h)}(r,e.type,n,t),r[He]=t}catch(a){jc(e,e.return,a)}}function $s(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&zd(e.type)||4===e.tag}function Es(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||$s(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&zd(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function zs(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?(9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).insertBefore(e,t):((t=9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Tt));else if(4!==r&&(27===r&&zd(e.type)&&(n=e.stateNode,t=null),null!==(e=e.child)))for(zs(e,t,n),e=e.sibling;null!==e;)zs(e,t,n),e=e.sibling}function Cs(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&(27===r&&zd(e.type)&&(n=e.stateNode),null!==(e=e.child)))for(Cs(e,t,n),e=e.sibling;null!==e;)Cs(e,t,n),e=e.sibling}function Ns(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);fd(t,r,n),t[Be]=e,t[He]=n}catch(i){jc(e,e.return,i)}}var _s=!1,Ps=!1,Ts=!1,Fs="function"===typeof WeakSet?WeakSet:Set,As=null;function Rs(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Gs(e,n),4&r&&vs(5,n);break;case 1:if(Gs(e,n),4&r)if(e=n.stateNode,null===t)try{e.componentDidMount()}catch(l){jc(n,n.return,l)}else{var a=jo(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){jc(n,n.return,o)}}64&r&&bs(n),512&r&&ks(n,n.return);break;case 3:if(Gs(e,n),64&r&&null!==(e=n.updateQueue)){if(t=null,null!==n.child)switch(n.child.tag){case 27:case 5:case 1:t=n.child.stateNode}try{zi(e,t)}catch(l){jc(n,n.return,l)}}break;case 27:null===t&&4&r&&Ns(n);case 26:case 5:Gs(e,n),null===t&&4&r&&Ss(n),512&r&&ks(n,n.return);break;case 12:Gs(e,n);break;case 31:Gs(e,n),4&r&&Bs(e,n);break;case 13:Gs(e,n),4&r&&Hs(e,n),64&r&&(null!==(e=n.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var n=e.ownerDocument;if("$~"===e.data)e._reactRetry=t;else if("$?"!==e.data||"loading"!==n.readyState)t();else{var r=function(){t(),n.removeEventListener("DOMContentLoaded",r)};n.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}(e,n=Cc.bind(null,n))));break;case 22:if(!(r=null!==n.memoizedState||_s)){t=null!==t&&null!==t.memoizedState||Ps,a=_s;var i=Ps;_s=r,(Ps=t)&&!i?Xs(e,n,0!==(8772&n.subtreeFlags)):Gs(e,n),_s=a,Ps=i}break;case 30:break;default:Gs(e,n)}}function Ls(e){var t=e.alternate;null!==t&&(e.alternate=null,Ls(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Ge(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Os=null,Ds=!1;function Ms(e,t,n){for(n=n.child;null!==n;)Is(e,t,n),n=n.sibling}function Is(e,t,n){if(xe&&"function"===typeof xe.onCommitFiberUnmount)try{xe.onCommitFiberUnmount(ve,n)}catch(i){}switch(n.tag){case 26:Ps||ws(n,t),Ms(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode).parentNode.removeChild(n);break;case 27:Ps||ws(n,t);var r=Os,a=Ds;zd(n.type)&&(Os=n.stateNode,Ds=!1),Ms(e,t,n),Md(n.stateNode),Os=r,Ds=a;break;case 5:Ps||ws(n,t);case 6:if(r=Os,a=Ds,Os=null,Ms(e,t,n),Ds=a,null!==(Os=r))if(Ds)try{(9===Os.nodeType?Os.body:"HTML"===Os.nodeName?Os.ownerDocument.body:Os).removeChild(n.stateNode)}catch(l){jc(n,t,l)}else try{Os.removeChild(n.stateNode)}catch(l){jc(n,t,l)}break;case 18:null!==Os&&(Ds?(Cd(9===(e=Os).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,n.stateNode),Wp(e)):Cd(Os,n.stateNode));break;case 4:r=Os,a=Ds,Os=n.stateNode.containerInfo,Ds=!0,Ms(e,t,n),Os=r,Ds=a;break;case 0:case 11:case 14:case 15:xs(2,n,t),Ps||xs(4,n,t),Ms(e,t,n);break;case 1:Ps||(ws(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount&&ys(n,t,r)),Ms(e,t,n);break;case 21:Ms(e,t,n);break;case 22:Ps=(r=Ps)||null!==n.memoizedState,Ms(e,t,n),Ps=r;break;default:Ms(e,t,n)}}function Bs(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&null!==(e=e.memoizedState))){e=e.dehydrated;try{Wp(e)}catch(n){jc(t,t.return,n)}}}function Hs(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Wp(e)}catch(n){jc(t,t.return,n)}}function Vs(e,t){var n=function(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new Fs),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new Fs),t;default:throw Error(l(435,e.tag))}}(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Nc.bind(null,e,t);t.then(r,r)}})}function Us(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var a=n[r],i=e,o=t,s=o;e:for(;null!==s;){switch(s.tag){case 27:if(zd(s.type)){Os=s.stateNode,Ds=!1;break e}break;case 5:Os=s.stateNode,Ds=!1;break e;case 3:case 4:Os=s.stateNode.containerInfo,Ds=!0;break e}s=s.return}if(null===Os)throw Error(l(160));Is(i,o,a),Os=null,Ds=!1,null!==(i=a.alternate)&&(i.return=null),a.return=null}if(13886&t.subtreeFlags)for(t=t.child;null!==t;)Ks(t,e),t=t.sibling}var Ws=null;function Ks(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Us(t,e),Ys(e),4&r&&(xs(3,e,e.return),vs(3,e),xs(5,e,e.return));break;case 1:Us(t,e),Ys(e),512&r&&(Ps||null===n||ws(n,n.return)),64&r&&_s&&(null!==(e=e.updateQueue)&&(null!==(r=e.callbacks)&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===n?r:n.concat(r))));break;case 26:var a=Ws;if(Us(t,e),Ys(e),512&r&&(Ps||null===n||ws(n,n.return)),4&r){var i=null!==n?n.memoizedState:null;if(r=e.memoizedState,null===n)if(null===r)if(null===e.stateNode){e:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;t:switch(r){case"title":(!(i=a.getElementsByTagName("title")[0])||i[qe]||i[Be]||"http://www.w3.org/2000/svg"===i.namespaceURI||i.hasAttribute("itemprop"))&&(i=a.createElement(r),a.head.insertBefore(i,a.querySelector("head > title"))),fd(i,r,n),i[Be]=e,et(i),r=i;break e;case"link":var o=rp("link","href",a).get(r+(n.href||""));if(o)for(var s=0;s<o.length;s++)if((i=o[s]).getAttribute("href")===(null==n.href||""===n.href?null:n.href)&&i.getAttribute("rel")===(null==n.rel?null:n.rel)&&i.getAttribute("title")===(null==n.title?null:n.title)&&i.getAttribute("crossorigin")===(null==n.crossOrigin?null:n.crossOrigin)){o.splice(s,1);break t}fd(i=a.createElement(r),r,n),a.head.appendChild(i);break;case"meta":if(o=rp("meta","content",a).get(r+(n.content||"")))for(s=0;s<o.length;s++)if((i=o[s]).getAttribute("content")===(null==n.content?null:""+n.content)&&i.getAttribute("name")===(null==n.name?null:n.name)&&i.getAttribute("property")===(null==n.property?null:n.property)&&i.getAttribute("http-equiv")===(null==n.httpEquiv?null:n.httpEquiv)&&i.getAttribute("charset")===(null==n.charSet?null:n.charSet)){o.splice(s,1);break t}fd(i=a.createElement(r),r,n),a.head.appendChild(i);break;default:throw Error(l(468,r))}i[Be]=e,et(i),r=i}e.stateNode=r}else ap(a,e.type,e.stateNode);else e.stateNode=Jd(a,r,e.memoizedProps);else i!==r?(null===i?null!==n.stateNode&&(n=n.stateNode).parentNode.removeChild(n):i.count--,null===r?ap(a,e.type,e.stateNode):Jd(a,r,e.memoizedProps)):null===r&&null!==e.stateNode&&js(e,e.memoizedProps,n.memoizedProps)}break;case 27:Us(t,e),Ys(e),512&r&&(Ps||null===n||ws(n,n.return)),null!==n&&4&r&&js(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Us(t,e),Ys(e),512&r&&(Ps||null===n||ws(n,n.return)),32&e.flags){a=e.stateNode;try{jt(a,"")}catch(m){jc(e,e.return,m)}}4&r&&null!=e.stateNode&&js(e,a=e.memoizedProps,null!==n?n.memoizedProps:a),1024&r&&(Ts=!0);break;case 6:if(Us(t,e),Ys(e),4&r){if(null===e.stateNode)throw Error(l(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(m){jc(e,e.return,m)}}break;case 3:if(np=null,a=Ws,Ws=Hd(t.containerInfo),Us(t,e),Ws=a,Ys(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Wp(t.containerInfo)}catch(m){jc(e,e.return,m)}Ts&&(Ts=!1,qs(e));break;case 4:r=Ws,Ws=Hd(e.stateNode.containerInfo),Us(t,e),Ys(e),Ws=r;break;case 12:default:Us(t,e),Ys(e);break;case 31:case 19:Us(t,e),Ys(e),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Vs(e,r)));break;case 13:Us(t,e),Ys(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==n&&null!==n.memoizedState)&&(Fu=se()),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Vs(e,r)));break;case 22:a=null!==e.memoizedState;var u=null!==n&&null!==n.memoizedState,c=_s,d=Ps;if(_s=c||a,Ps=d||u,Us(t,e),Ps=d,_s=c,Ys(e),8192&r)e:for(t=e.stateNode,t._visibility=a?-2&t._visibility:1|t._visibility,a&&(null===n||u||_s||Ps||Qs(e)),n=null,t=e;;){if(5===t.tag||26===t.tag){if(null===n){u=n=t;try{if(i=u.stateNode,a)"function"===typeof(o=i.style).setProperty?o.setProperty("display","none","important"):o.display="none";else{s=u.stateNode;var p=u.memoizedProps.style,f=void 0!==p&&null!==p&&p.hasOwnProperty("display")?p.display:null;s.style.display=null==f||"boolean"===typeof f?"":(""+f).trim()}}catch(m){jc(u,u.return,m)}}}else if(6===t.tag){if(null===n){u=t;try{u.stateNode.nodeValue=a?"":u.memoizedProps}catch(m){jc(u,u.return,m)}}}else if(18===t.tag){if(null===n){u=t;try{var h=u.stateNode;a?Nd(h,!0):Nd(u.stateNode,!1)}catch(m){jc(u,u.return,m)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}4&r&&(null!==(r=e.updateQueue)&&(null!==(n=r.retryQueue)&&(r.retryQueue=null,Vs(e,n))));case 30:case 21:}}function Ys(e){var t=e.flags;if(2&t){try{for(var n,r=e.return;null!==r;){if($s(r)){n=r;break}r=r.return}if(null==n)throw Error(l(160));switch(n.tag){case 27:var a=n.stateNode;Cs(e,Es(e),a);break;case 5:var i=n.stateNode;32&n.flags&&(jt(i,""),n.flags&=-33),Cs(e,Es(e),i);break;case 3:case 4:var o=n.stateNode.containerInfo;zs(e,Es(e),o);break;default:throw Error(l(161))}}catch(s){jc(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function qs(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;qs(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Gs(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Rs(e,t.alternate,t),t=t.sibling}function Qs(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:xs(4,t,t.return),Qs(t);break;case 1:ws(t,t.return);var n=t.stateNode;"function"===typeof n.componentWillUnmount&&ys(t,t.return,n),Qs(t);break;case 27:Md(t.stateNode);case 26:case 5:ws(t,t.return),Qs(t);break;case 22:null===t.memoizedState&&Qs(t);break;default:Qs(t)}e=e.sibling}}function Xs(e,t,n){for(n=n&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var r=t.alternate,a=e,i=t,l=i.flags;switch(i.tag){case 0:case 11:case 15:Xs(a,i,n),vs(4,i);break;case 1:if(Xs(a,i,n),"function"===typeof(a=(r=i).stateNode).componentDidMount)try{a.componentDidMount()}catch(u){jc(r,r.return,u)}if(null!==(a=(r=i).updateQueue)){var o=r.stateNode;try{var s=a.shared.hiddenCallbacks;if(null!==s)for(a.shared.hiddenCallbacks=null,a=0;a<s.length;a++)Ei(s[a],o)}catch(u){jc(r,r.return,u)}}n&&64&l&&bs(i),ks(i,i.return);break;case 27:Ns(i);case 26:case 5:Xs(a,i,n),n&&null===r&&4&l&&Ss(i),ks(i,i.return);break;case 12:Xs(a,i,n);break;case 31:Xs(a,i,n),n&&4&l&&Bs(a,i);break;case 13:Xs(a,i,n),n&&4&l&&Hs(a,i);break;case 22:null===i.memoizedState&&Xs(a,i,n),ks(i,i.return);break;case 30:break;default:Xs(a,i,n)}t=t.sibling}}function Js(e,t){var n=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==n&&(null!=e&&e.refCount++,null!=n&&Ba(n))}function Zs(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ba(e))}function eu(e,t,n,r){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)tu(e,t,n,r),t=t.sibling}function tu(e,t,n,r){var a=t.flags;switch(t.tag){case 0:case 11:case 15:eu(e,t,n,r),2048&a&&vs(9,t);break;case 1:case 31:case 13:default:eu(e,t,n,r);break;case 3:eu(e,t,n,r),2048&a&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ba(e)));break;case 12:if(2048&a){eu(e,t,n,r),e=t.stateNode;try{var i=t.memoizedProps,l=i.id,o=i.onPostCommit;"function"===typeof o&&o(l,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(s){jc(t,t.return,s)}}else eu(e,t,n,r);break;case 23:break;case 22:i=t.stateNode,l=t.alternate,null!==t.memoizedState?2&i._visibility?eu(e,t,n,r):ru(e,t):2&i._visibility?eu(e,t,n,r):(i._visibility|=2,nu(e,t,n,r,0!==(10256&t.subtreeFlags)||!1)),2048&a&&Js(l,t);break;case 24:eu(e,t,n,r),2048&a&&Zs(t.alternate,t)}}function nu(e,t,n,r,a){for(a=a&&(0!==(10256&t.subtreeFlags)||!1),t=t.child;null!==t;){var i=e,l=t,o=n,s=r,u=l.flags;switch(l.tag){case 0:case 11:case 15:nu(i,l,o,s,a),vs(8,l);break;case 23:break;case 22:var c=l.stateNode;null!==l.memoizedState?2&c._visibility?nu(i,l,o,s,a):ru(i,l):(c._visibility|=2,nu(i,l,o,s,a)),a&&2048&u&&Js(l.alternate,l);break;case 24:nu(i,l,o,s,a),a&&2048&u&&Zs(l.alternate,l);break;default:nu(i,l,o,s,a)}t=t.sibling}}function ru(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var n=e,r=t,a=r.flags;switch(r.tag){case 22:ru(n,r),2048&a&&Js(r.alternate,r);break;case 24:ru(n,r),2048&a&&Zs(r.alternate,r);break;default:ru(n,r)}t=t.sibling}}var au=8192;function iu(e,t,n){if(e.subtreeFlags&au)for(e=e.child;null!==e;)lu(e,t,n),e=e.sibling}function lu(e,t,n){switch(e.tag){case 26:iu(e,t,n),e.flags&au&&null!==e.memoizedState&&function(e,t,n,r){if("stylesheet"===n.type&&("string"!==typeof r.media||!1!==matchMedia(r.media).matches)&&0===(4&n.state.loading)){if(null===n.instance){var a=Yd(r.href),i=t.querySelector(qd(a));if(i)return null!==(t=i._p)&&"object"===typeof t&&"function"===typeof t.then&&(e.count++,e=op.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,void et(i);i=t.ownerDocument||t,r=Gd(r),(a=Id.get(a))&&ep(r,a),et(i=i.createElement("link"));var l=i;l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),fd(i,"link",r),n.instance=i}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&0===(3&n.state.loading)&&(e.count++,n=op.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}(n,Ws,e.memoizedState,e.memoizedProps);break;case 5:default:iu(e,t,n);break;case 3:case 4:var r=Ws;Ws=Hd(e.stateNode.containerInfo),iu(e,t,n),Ws=r;break;case 22:null===e.memoizedState&&(null!==(r=e.alternate)&&null!==r.memoizedState?(r=au,au=16777216,iu(e,t,n),au=r):iu(e,t,n))}}function ou(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function su(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];As=r,du(r,e)}ou(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)uu(e),e=e.sibling}function uu(e){switch(e.tag){case 0:case 11:case 15:su(e),2048&e.flags&&xs(9,e,e.return);break;case 3:case 12:default:su(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,cu(e)):su(e)}}function cu(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];As=r,du(r,e)}ou(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:xs(8,t,t.return),cu(t);break;case 22:2&(n=t.stateNode)._visibility&&(n._visibility&=-3,cu(t));break;default:cu(t)}e=e.sibling}}function du(e,t){for(;null!==As;){var n=As;switch(n.tag){case 0:case 11:case 15:xs(8,n,t);break;case 23:case 22:if(null!==n.memoizedState&&null!==n.memoizedState.cachePool){var r=n.memoizedState.cachePool.pool;null!=r&&r.refCount++}break;case 24:Ba(n.memoizedState.cache)}if(null!==(r=n.child))r.return=n,As=r;else e:for(n=e;null!==As;){var a=(r=As).sibling,i=r.return;if(Ls(r),r===n){As=null;break e}if(null!==a){a.return=i,As=a;break e}As=i}}}var pu={getCacheForType:function(e){var t=Fa(Ma),n=t.data.get(e);return void 0===n&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Fa(Ma).controller.signal}},fu="function"===typeof WeakMap?WeakMap:Map,hu=0,mu=null,gu=null,vu=0,xu=0,bu=null,yu=!1,ku=!1,wu=!1,Su=0,ju=0,$u=0,Eu=0,zu=0,Cu=0,Nu=0,_u=null,Pu=null,Tu=!1,Fu=0,Au=0,Ru=1/0,Lu=null,Ou=null,Du=0,Mu=null,Iu=null,Bu=0,Hu=0,Vu=null,Uu=null,Wu=0,Ku=null;function Yu(){return 0!==(2&hu)&&0!==vu?vu&-vu:null!==A.T?Vc():De()}function qu(){if(0===Cu)if(0===(536870912&vu)||pa){var e=je;0===(3932160&(je<<=1))&&(je=262144),Cu=e}else Cu=536870912;return null!==(e=Fi.current)&&(e.flags|=32),Cu}function Gu(e,t,n){(e!==mu||2!==xu&&9!==xu)&&null===e.cancelPendingCommit||(nc(e,0),Zu(e,vu,Cu,!1)),Te(e,n),0!==(2&hu)&&e===mu||(e===mu&&(0===(2&hu)&&(Eu|=n),4===ju&&Zu(e,vu,Cu,!1)),Lc(e))}function Qu(e,t,n){if(0!==(6&hu))throw Error(l(327));for(var r=!n&&0===(127&t)&&0===(t&e.expiredLanes)||Ce(e,t),a=r?function(e,t){var n=hu;hu|=2;var r=ic(),a=lc();mu!==e||vu!==t?(Lu=null,Ru=se()+500,nc(e,t)):ku=Ce(e,t);e:for(;;)try{if(0!==xu&&null!==gu){t=gu;var i=bu;t:switch(xu){case 1:xu=0,bu=null,fc(e,t,i,1);break;case 2:case 9:if(ni(i)){xu=0,bu=null,pc(t);break}t=function(){2!==xu&&9!==xu||mu!==e||(xu=7),Lc(e)},i.then(t,t);break e;case 3:xu=7;break e;case 4:xu=5;break e;case 7:ni(i)?(xu=0,bu=null,pc(t)):(xu=0,bu=null,fc(e,t,i,7));break;case 5:var o=null;switch(gu.tag){case 26:o=gu.memoizedState;case 5:case 27:var s=gu;if(o?ip(o):s.stateNode.complete){xu=0,bu=null;var u=s.sibling;if(null!==u)gu=u;else{var c=s.return;null!==c?(gu=c,hc(c)):gu=null}break t}}xu=0,bu=null,fc(e,t,i,5);break;case 6:xu=0,bu=null,fc(e,t,i,6);break;case 8:tc(),ju=6;break e;default:throw Error(l(462))}}cc();break}catch(d){rc(e,d)}return $a=ja=null,A.H=r,A.A=a,hu=n,null!==gu?0:(mu=null,vu=0,Pr(),ju)}(e,t):sc(e,t,!0),i=r;;){if(0===a){ku&&!r&&Zu(e,t,0,!1);break}if(n=e.current.alternate,!i||Ju(n)){if(2===a){if(i=t,e.errorRecoveryDisabledLanes&i)var o=0;else o=0!==(o=-536870913&e.pendingLanes)?o:536870912&o?536870912:0;if(0!==o){t=o;e:{var s=e;a=_u;var u=s.current.memoizedState.isDehydrated;if(u&&(nc(s,o).flags|=256),2!==(o=sc(s,o,!1))){if(wu&&!u){s.errorRecoveryDisabledLanes|=i,Eu|=i,a=4;break e}i=Pu,Pu=a,null!==i&&(null===Pu?Pu=i:Pu.push.apply(Pu,i))}a=o}if(i=!1,2!==a)continue}}if(1===a){nc(e,0),Zu(e,t,0,!0);break}e:{switch(r=e,i=a){case 0:case 1:throw Error(l(345));case 4:if((4194048&t)!==t)break;case 6:Zu(r,t,Cu,!yu);break e;case 2:Pu=null;break;case 3:case 5:break;default:throw Error(l(329))}if((62914560&t)===t&&10<(a=Fu+300-se())){if(Zu(r,t,Cu,!yu),0!==ze(r,0,!0))break e;Bu=t,r.timeoutHandle=wd(Xu.bind(null,r,n,Pu,Lu,Tu,t,Cu,Eu,Nu,yu,i,"Throttled",-0,0),a)}else Xu(r,n,Pu,Lu,Tu,t,Cu,Eu,Nu,yu,i,null,-0,0)}break}a=sc(e,t,!1),i=!1}Lc(e)}function Xu(e,t,n,r,a,i,l,o,s,u,c,d,p,f){if(e.timeoutHandle=-1,8192&(d=t.subtreeFlags)||16785408===(16785408&d)){lu(t,i,d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Tt});var h=(62914560&i)===i?Fu-se():(4194048&i)===i?Au-se():0;if(null!==(h=function(e,t){return e.stylesheets&&0===e.count&&up(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&up(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&0===lp&&(lp=62500*function(){if("function"===typeof performance.getEntriesByType){for(var e=0,t=0,n=performance.getEntriesByType("resource"),r=0;r<n.length;r++){var a=n[r],i=a.transferSize,l=a.initiatorType,o=a.duration;if(i&&o&&hd(l)){for(l=0,o=a.responseEnd,r+=1;r<n.length;r++){var s=n[r],u=s.startTime;if(u>o)break;var c=s.transferSize,d=s.initiatorType;c&&hd(d)&&(l+=c*((s=s.responseEnd)<o?1:(o-u)/(s-u)))}if(--r,t+=8*(i+l)/(a.duration/1e3),10<++e)break}}if(0<e)return t/e/1e6}return navigator.connection&&"number"===typeof(e=navigator.connection.downlink)?e:5}());var a=setTimeout(function(){if(e.waitingForImages=!1,0===e.count&&(e.stylesheets&&up(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>lp?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(a)}}:null}(d,h)))return Bu=i,e.cancelPendingCommit=h(gc.bind(null,e,t,i,n,r,a,l,o,s,c,d,null,p,f)),void Zu(e,i,l,!u)}gc(e,t,i,n,r,a,l,o,s)}function Ju(e){for(var t=e;;){var n=t.tag;if((0===n||11===n||15===n)&&16384&t.flags&&(null!==(n=t.updateQueue)&&null!==(n=n.stores)))for(var r=0;r<n.length;r++){var a=n[r],i=a.getSnapshot;a=a.value;try{if(!Zn(i(),a))return!1}catch(l){return!1}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zu(e,t,n,r){t&=~zu,t&=~Eu,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var a=t;0<a;){var i=31-ye(a),l=1<<i;r[i]=-1,a&=~l}0!==n&&Fe(e,n,t)}function ec(){return 0!==(6&hu)||(Oc(0,!1),!1)}function tc(){if(null!==gu){if(0===xu)var e=gu.return;else $a=ja=null,ol(e=gu),si=null,ui=0,e=gu;for(;null!==e;)gs(e.alternate,e),e=e.return;gu=null}}function nc(e,t){var n=e.timeoutHandle;-1!==n&&(e.timeoutHandle=-1,Sd(n)),null!==(n=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,n()),Bu=0,tc(),mu=e,gu=n=Br(e.current,null),vu=t,xu=0,bu=null,yu=!1,ku=Ce(e,t),wu=!1,Nu=Cu=zu=Eu=$u=ju=0,Pu=_u=null,Tu=!1,0!==(8&t)&&(t|=32&t);var r=e.entangledLanes;if(0!==r)for(e=e.entanglements,r&=t;0<r;){var a=31-ye(r),i=1<<a;t|=e[a],r&=~i}return Su=t,Pr(),n}function rc(e,t){Vi=null,A.H=go,t===Ja||t===ei?(t=li(),xu=3):t===Za?(t=li(),xu=4):xu=t===Fo?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,bu=t,null===gu&&(ju=1,Co(e,Gr(t,e.current)))}function ac(){var e=Fi.current;return null===e||((4194048&vu)===vu?null===Ai:((62914560&vu)===vu||0!==(536870912&vu))&&e===Ai)}function ic(){var e=A.H;return A.H=go,null===e?go:e}function lc(){var e=A.A;return A.A=pu,e}function oc(){ju=4,yu||(4194048&vu)!==vu&&null!==Fi.current||(ku=!0),0===(134217727&$u)&&0===(134217727&Eu)||null===mu||Zu(mu,vu,Cu,!1)}function sc(e,t,n){var r=hu;hu|=2;var a=ic(),i=lc();mu===e&&vu===t||(Lu=null,nc(e,t)),t=!1;var l=ju;e:for(;;)try{if(0!==xu&&null!==gu){var o=gu,s=bu;switch(xu){case 8:tc(),l=6;break e;case 3:case 2:case 9:case 6:null===Fi.current&&(t=!0);var u=xu;if(xu=0,bu=null,fc(e,o,s,u),n&&ku){l=0;break e}break;default:u=xu,xu=0,bu=null,fc(e,o,s,u)}}uc(),l=ju;break}catch(c){rc(e,c)}return t&&e.shellSuspendCounter++,$a=ja=null,hu=r,A.H=a,A.A=i,null===gu&&(mu=null,vu=0,Pr()),l}function uc(){for(;null!==gu;)dc(gu)}function cc(){for(;null!==gu&&!le();)dc(gu)}function dc(e){var t=os(e.alternate,e,Su);e.memoizedProps=e.pendingProps,null===t?hc(e):gu=t}function pc(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Ko(n,t,t.pendingProps,t.type,void 0,vu);break;case 11:t=Ko(n,t,t.pendingProps,t.type.render,t.ref,vu);break;case 5:ol(t);default:gs(n,t),t=os(n,t=gu=Hr(t,Su),Su)}e.memoizedProps=e.pendingProps,null===t?hc(e):gu=t}function fc(e,t,n,r){$a=ja=null,ol(t),si=null,ui=0;var a=t.return;try{if(function(e,t,n,r,a){if(n.flags|=32768,null!==r&&"object"===typeof r&&"function"===typeof r.then){if(null!==(t=n.alternate)&&_a(t,n,a,!0),null!==(n=Fi.current)){switch(n.tag){case 31:case 13:return null===Ai?oc():null===n.alternate&&0===ju&&(ju=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ti?n.flags|=16384:(null===(t=n.updateQueue)?n.updateQueue=new Set([r]):t.add(r),$c(e,r,a)),!1;case 22:return n.flags|=65536,r===ti?n.flags|=16384:(null===(t=n.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):null===(n=t.retryQueue)?t.retryQueue=new Set([r]):n.add(r),$c(e,r,a)),!1}throw Error(l(435,n.tag))}return $c(e,r,a),oc(),!1}if(pa)return null!==(t=Fi.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ma&&wa(Gr(e=Error(l(422),{cause:r}),n))):(r!==ma&&wa(Gr(t=Error(l(423),{cause:r}),n)),(e=e.current.alternate).flags|=65536,a&=-a,e.lanes|=a,r=Gr(r,n),wi(e,a=_o(e.stateNode,r,a)),4!==ju&&(ju=2)),!1;var i=Error(l(520),{cause:r});if(i=Gr(i,n),null===_u?_u=[i]:_u.push(i),4!==ju&&(ju=2),null===t)return!0;r=Gr(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,wi(n,e=_o(n.stateNode,r,e)),!1;case 1:if(t=n.type,i=n.stateNode,0===(128&n.flags)&&("function"===typeof t.getDerivedStateFromError||null!==i&&"function"===typeof i.componentDidCatch&&(null===Ou||!Ou.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,To(a=Po(a),e,n,r),wi(n,a),!1}n=n.return}while(null!==n);return!1}(e,a,t,n,vu))return ju=1,Co(e,Gr(n,e.current)),void(gu=null)}catch(i){if(null!==a)throw gu=a,i;return ju=1,Co(e,Gr(n,e.current)),void(gu=null)}32768&t.flags?(pa||1===r?e=!0:ku||0!==(536870912&vu)?e=!1:(yu=e=!0,(2===r||9===r||3===r||6===r)&&(null!==(r=Fi.current)&&13===r.tag&&(r.flags|=16384))),mc(t,e)):hc(t)}function hc(e){var t=e;do{if(0!==(32768&t.flags))return void mc(t,yu);e=t.return;var n=hs(t.alternate,t,Su);if(null!==n)return void(gu=n);if(null!==(t=t.sibling))return void(gu=t);gu=t=e}while(null!==t);0===ju&&(ju=5)}function mc(e,t){do{var n=ms(e.alternate,e);if(null!==n)return n.flags&=32767,void(gu=n);if(null!==(n=e.return)&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&null!==(e=e.sibling))return void(gu=e);gu=e=n}while(null!==e);ju=6,gu=null}function gc(e,t,n,r,a,i,o,s,u){e.cancelPendingCommit=null;do{kc()}while(0!==Du);if(0!==(6&hu))throw Error(l(327));if(null!==t){if(t===e.current)throw Error(l(177));if(i=t.lanes|t.childLanes,function(e,t,n,r,a,i){var l=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,s=e.expirationTimes,u=e.hiddenUpdates;for(n=l&~n;0<n;){var c=31-ye(n),d=1<<c;o[c]=0,s[c]=-1;var p=u[c];if(null!==p)for(u[c]=null,c=0;c<p.length;c++){var f=p[c];null!==f&&(f.lane&=-536870913)}n&=~d}0!==r&&Fe(e,r,0),0!==i&&0===a&&0!==e.tag&&(e.suspendedLanes|=i&~(l&~t))}(e,n,i|=_r,o,s,u),e===mu&&(gu=mu=null,vu=0),Iu=t,Mu=e,Bu=n,Hu=i,Vu=a,Uu=r,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,ae(pe,function(){return wc(),null})):(e.callbackNode=null,e.callbackPriority=0),r=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||r){r=A.T,A.T=null,a=R.p,R.p=2,o=hu,hu|=4;try{!function(e,t){if(e=e.containerInfo,md=yp,ir(e=ar(e))){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var a=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch(g){n=null;break e}var o=0,s=-1,u=-1,c=0,d=0,p=e,f=null;t:for(;;){for(var h;p!==n||0!==a&&3!==p.nodeType||(s=o+a),p!==i||0!==r&&3!==p.nodeType||(u=o+r),3===p.nodeType&&(o+=p.nodeValue.length),null!==(h=p.firstChild);)f=p,p=h;for(;;){if(p===e)break t;if(f===n&&++c===a&&(s=o),f===i&&++d===r&&(u=o),null!==(h=p.nextSibling))break;f=(p=f).parentNode}p=h}n=-1===s||-1===u?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(gd={focusedElem:e,selectionRange:n},yp=!1,As=t;null!==As;)if(e=(t=As).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,As=e;else for(;null!==As;){switch(i=(t=As).alternate,e=t.flags,t.tag){case 0:if(0!==(4&e)&&null!==(e=null!==(e=t.updateQueue)?e.events:null))for(n=0;n<e.length;n++)(a=e[n]).ref.impl=a.nextImpl;break;case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==i){e=void 0,n=t,a=i.memoizedProps,i=i.memoizedState,r=n.stateNode;try{var m=jo(n.type,a);e=r.getSnapshotBeforeUpdate(m,i),r.__reactInternalSnapshotBeforeUpdate=e}catch(v){jc(n,n.return,v)}}break;case 3:if(0!==(1024&e))if(9===(n=(e=t.stateNode.containerInfo).nodeType))_d(e);else if(1===n)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":_d(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(l(163))}if(null!==(e=t.sibling)){e.return=t.return,As=e;break}As=t.return}}(e,t)}finally{hu=o,R.p=a,A.T=r}}Du=1,vc(),xc(),bc()}}function vc(){if(1===Du){Du=0;var e=Mu,t=Iu,n=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||n){n=A.T,A.T=null;var r=R.p;R.p=2;var a=hu;hu|=4;try{Ks(t,e);var i=gd,l=ar(e.containerInfo),o=i.focusedElem,s=i.selectionRange;if(l!==o&&o&&o.ownerDocument&&rr(o.ownerDocument.documentElement,o)){if(null!==s&&ir(o)){var u=s.start,c=s.end;if(void 0===c&&(c=u),"selectionStart"in o)o.selectionStart=u,o.selectionEnd=Math.min(c,o.value.length);else{var d=o.ownerDocument||document,p=d&&d.defaultView||window;if(p.getSelection){var f=p.getSelection(),h=o.textContent.length,m=Math.min(s.start,h),g=void 0===s.end?m:Math.min(s.end,h);!f.extend&&m>g&&(l=g,g=m,m=l);var v=nr(o,m),x=nr(o,g);if(v&&x&&(1!==f.rangeCount||f.anchorNode!==v.node||f.anchorOffset!==v.offset||f.focusNode!==x.node||f.focusOffset!==x.offset)){var b=d.createRange();b.setStart(v.node,v.offset),f.removeAllRanges(),m>g?(f.addRange(b),f.extend(x.node,x.offset)):(b.setEnd(x.node,x.offset),f.addRange(b))}}}}for(d=[],f=o;f=f.parentNode;)1===f.nodeType&&d.push({element:f,left:f.scrollLeft,top:f.scrollTop});for("function"===typeof o.focus&&o.focus(),o=0;o<d.length;o++){var y=d[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}yp=!!md,gd=md=null}finally{hu=a,R.p=r,A.T=n}}e.current=t,Du=2}}function xc(){if(2===Du){Du=0;var e=Mu,t=Iu,n=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||n){n=A.T,A.T=null;var r=R.p;R.p=2;var a=hu;hu|=4;try{Rs(e,t.alternate,t)}finally{hu=a,R.p=r,A.T=n}}Du=3}}function bc(){if(4===Du||3===Du){Du=0,oe();var e=Mu,t=Iu,n=Bu,r=Uu;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Du=5:(Du=0,Iu=Mu=null,yc(e,e.pendingLanes));var a=e.pendingLanes;if(0===a&&(Ou=null),Oe(n),t=t.stateNode,xe&&"function"===typeof xe.onCommitFiberRoot)try{xe.onCommitFiberRoot(ve,t,void 0,128===(128&t.current.flags))}catch(s){}if(null!==r){t=A.T,a=R.p,R.p=2,A.T=null;try{for(var i=e.onRecoverableError,l=0;l<r.length;l++){var o=r[l];i(o.value,{componentStack:o.stack})}}finally{A.T=t,R.p=a}}0!==(3&Bu)&&kc(),Lc(e),a=e.pendingLanes,0!==(261930&n)&&0!==(42&a)?e===Ku?Wu++:(Wu=0,Ku=e):Wu=0,Oc(0,!1)}}function yc(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Ba(t)))}function kc(){return vc(),xc(),bc(),wc()}function wc(){if(5!==Du)return!1;var e=Mu,t=Hu;Hu=0;var n=Oe(Bu),r=A.T,a=R.p;try{R.p=32>n?32:n,A.T=null,n=Vu,Vu=null;var i=Mu,o=Bu;if(Du=0,Iu=Mu=null,Bu=0,0!==(6&hu))throw Error(l(331));var s=hu;if(hu|=4,uu(i.current),tu(i,i.current,o,n),hu=s,Oc(0,!1),xe&&"function"===typeof xe.onPostCommitFiberRoot)try{xe.onPostCommitFiberRoot(ve,i)}catch(u){}return!0}finally{R.p=a,A.T=r,yc(e,t)}}function Sc(e,t,n){t=Gr(n,t),null!==(e=yi(e,t=_o(e.stateNode,t,2),2))&&(Te(e,2),Lc(e))}function jc(e,t,n){if(3===e.tag)Sc(e,e,n);else for(;null!==t;){if(3===t.tag){Sc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===Ou||!Ou.has(r))){e=Gr(n,e),null!==(r=yi(t,n=Po(2),2))&&(To(n,r,t,e),Te(r,2),Lc(r));break}}t=t.return}}function $c(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new fu;var a=new Set;r.set(t,a)}else void 0===(a=r.get(t))&&(a=new Set,r.set(t,a));a.has(n)||(wu=!0,a.add(n),e=Ec.bind(null,e,t,n),t.then(e,e))}function Ec(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,mu===e&&(vu&n)===n&&(4===ju||3===ju&&(62914560&vu)===vu&&300>se()-Fu?0===(2&hu)&&nc(e,0):zu|=n,Nu===vu&&(Nu=0)),Lc(e)}function zc(e,t){0===t&&(t=_e()),null!==(e=Ar(e,t))&&(Te(e,t),Lc(e))}function Cc(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),zc(e,n)}function Nc(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;null!==a&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(l(314))}null!==r&&r.delete(t),zc(e,n)}var _c=null,Pc=null,Tc=!1,Fc=!1,Ac=!1,Rc=0;function Lc(e){e!==Pc&&null===e.next&&(null===Pc?_c=Pc=e:Pc=Pc.next=e),Fc=!0,Tc||(Tc=!0,$d(function(){0!==(6&hu)?ae(ce,Dc):Mc()}))}function Oc(e,t){if(!Ac&&Fc){Ac=!0;do{for(var n=!1,r=_c;null!==r;){if(!t)if(0!==e){var a=r.pendingLanes;if(0===a)var i=0;else{var l=r.suspendedLanes,o=r.pingedLanes;i=(1<<31-ye(42|e)+1)-1,i=201326741&(i&=a&~(l&~o))?201326741&i|1:i?2|i:0}0!==i&&(n=!0,Hc(r,i))}else i=vu,0===(3&(i=ze(r,r===mu?i:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||Ce(r,i)||(n=!0,Hc(r,i));r=r.next}}while(n);Ac=!1}}function Dc(){Mc()}function Mc(){Fc=Tc=!1;var e=0;0!==Rc&&function(){var e=window.event;if(e&&"popstate"===e.type)return e!==kd&&(kd=e,!0);return kd=null,!1}()&&(e=Rc);for(var t=se(),n=null,r=_c;null!==r;){var a=r.next,i=Ic(r,t);0===i?(r.next=null,null===n?_c=a:n.next=a,null===a&&(Pc=n)):(n=r,(0!==e||0!==(3&i))&&(Fc=!0)),r=a}0!==Du&&5!==Du||Oc(e,!1),0!==Rc&&(Rc=0)}function Ic(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,i=-62914561&e.pendingLanes;0<i;){var l=31-ye(i),o=1<<l,s=a[l];-1===s?0!==(o&n)&&0===(o&r)||(a[l]=Ne(o,t)):s<=t&&(e.expiredLanes|=o),i&=~o}if(n=vu,n=ze(e,e===(t=mu)?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===n||e===t&&(2===xu||9===xu)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&ie(r),e.callbackNode=null,e.callbackPriority=0;if(0===(3&n)||Ce(e,n)){if((t=n&-n)===e.callbackPriority)return t;switch(null!==r&&ie(r),Oe(n)){case 2:case 8:n=de;break;case 32:default:n=pe;break;case 268435456:n=he}return r=Bc.bind(null,e),n=ae(n,r),e.callbackPriority=t,e.callbackNode=n,t}return null!==r&&null!==r&&ie(r),e.callbackPriority=2,e.callbackNode=null,2}function Bc(e,t){if(0!==Du&&5!==Du)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(kc()&&e.callbackNode!==n)return null;var r=vu;return 0===(r=ze(e,e===mu?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Qu(e,r,t),Ic(e,se()),null!=e.callbackNode&&e.callbackNode===n?Bc.bind(null,e):null)}function Hc(e,t){if(kc())return null;Qu(e,t,!0)}function Vc(){if(0===Rc){var e=Ua;0===e&&(e=Se,0===(261888&(Se<<=1))&&(Se=256)),Rc=e}return Rc}function Uc(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:Pt(""+e)}function Wc(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}for(var Kc=0;Kc<$r.length;Kc++){var Yc=$r[Kc];Er(Yc.toLowerCase(),"on"+(Yc[0].toUpperCase()+Yc.slice(1)))}Er(vr,"onAnimationEnd"),Er(xr,"onAnimationIteration"),Er(br,"onAnimationStart"),Er("dblclick","onDoubleClick"),Er("focusin","onFocus"),Er("focusout","onBlur"),Er(yr,"onTransitionRun"),Er(kr,"onTransitionStart"),Er(wr,"onTransitionCancel"),Er(Sr,"onTransitionEnd"),at("onMouseEnter",["mouseout","mouseover"]),at("onMouseLeave",["mouseout","mouseover"]),at("onPointerEnter",["pointerout","pointerover"]),at("onPointerLeave",["pointerout","pointerover"]),rt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),rt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),rt("onBeforeInput",["compositionend","keypress","textInput","paste"]),rt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var qc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gc=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(qc));function Qc(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var l=r.length-1;0<=l;l--){var o=r[l],s=o.instance,u=o.currentTarget;if(o=o.listener,s!==i&&a.isPropagationStopped())break e;i=o,a.currentTarget=u;try{i(a)}catch(c){zr(c)}a.currentTarget=null,i=s}else for(l=0;l<r.length;l++){if(s=(o=r[l]).instance,u=o.currentTarget,o=o.listener,s!==i&&a.isPropagationStopped())break e;i=o,a.currentTarget=u;try{i(a)}catch(c){zr(c)}a.currentTarget=null,i=s}}}}function Xc(e,t){var n=t[Ue];void 0===n&&(n=t[Ue]=new Set);var r=e+"__bubble";n.has(r)||(td(t,e,2,!1),n.add(r))}function Jc(e,t,n){var r=0;t&&(r|=4),td(n,e,r,t)}var Zc="_reactListening"+Math.random().toString(36).slice(2);function ed(e){if(!e[Zc]){e[Zc]=!0,tt.forEach(function(t){"selectionchange"!==t&&(Gc.has(t)||Jc(t,!1,e),Jc(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Zc]||(t[Zc]=!0,Jc("selectionchange",!1,t))}}function td(e,t,n,r){switch(zp(t)){case 2:var a=kp;break;case 8:a=wp;break;default:a=Sp}n=a.bind(null,t,n,e),a=void 0,!Ht||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),r?void 0!==a?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):void 0!==a?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function nd(e,t,n,r,a){var i=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var l=r.tag;if(3===l||4===l){var o=r.stateNode.containerInfo;if(o===a)break;if(4===l)for(l=r.return;null!==l;){var u=l.tag;if((3===u||4===u)&&l.stateNode.containerInfo===a)return;l=l.return}for(;null!==o;){if(null===(l=Qe(o)))return;if(5===(u=l.tag)||6===u||26===u||27===u){r=i=l;continue e}o=o.parentNode}}r=r.return}Mt(function(){var r=i,a=At(n),l=[];e:{var o=jr.get(e);if(void 0!==o){var u=nn,c=e;switch(e){case"keypress":if(0===qt(n))break e;case"keydown":case"keyup":u=xn;break;case"focusin":c="focus",u=un;break;case"focusout":c="blur",u=un;break;case"beforeblur":case"afterblur":u=un;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":u=on;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":u=sn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":u=yn;break;case vr:case xr:case br:u=cn;break;case Sr:u=kn;break;case"scroll":case"scrollend":u=an;break;case"wheel":u=wn;break;case"copy":case"cut":case"paste":u=dn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":u=bn;break;case"toggle":case"beforetoggle":u=Sn}var d=0!==(4&t),p=!d&&("scroll"===e||"scrollend"===e),f=d?null!==o?o+"Capture":null:o;d=[];for(var h,m=r;null!==m;){var g=m;if(h=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===h||null===f||null!=(g=It(m,f))&&d.push(rd(m,g,h)),p)break;m=m.return}0<d.length&&(o=new u(o,c,null,n,a),l.push({event:o,listeners:d}))}}if(0===(7&t)){if(u="mouseout"===e||"pointerout"===e,(!(o="mouseover"===e||"pointerover"===e)||n===Ft||!(c=n.relatedTarget||n.fromElement)||!Qe(c)&&!c[Ve])&&(u||o)&&(o=a.window===a?a:(o=a.ownerDocument)?o.defaultView||o.parentWindow:window,u?(u=r,null!==(c=(c=n.relatedTarget||n.toElement)?Qe(c):null)&&(p=s(c),d=c.tag,c!==p||5!==d&&27!==d&&6!==d)&&(c=null)):(u=null,c=r),u!==c)){if(d=on,g="onMouseLeave",f="onMouseEnter",m="mouse","pointerout"!==e&&"pointerover"!==e||(d=bn,g="onPointerLeave",f="onPointerEnter",m="pointer"),p=null==u?o:Je(u),h=null==c?o:Je(c),(o=new d(g,m+"leave",u,n,a)).target=p,o.relatedTarget=h,g=null,Qe(a)===r&&((d=new d(f,m+"enter",c,n,a)).target=h,d.relatedTarget=p,g=d),p=g,u&&c)e:{for(d=id,m=c,h=0,g=f=u;g;g=d(g))h++;g=0;for(var v=m;v;v=d(v))g++;for(;0<h-g;)f=d(f),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(f===m||null!==m&&f===m.alternate){d=f;break e}f=d(f),m=d(m)}d=null}else d=null;null!==u&&ld(l,o,u,d,!1),null!==c&&null!==p&&ld(l,p,c,d,!0)}if("select"===(u=(o=r?Je(r):window).nodeName&&o.nodeName.toLowerCase())||"input"===u&&"file"===o.type)var x=Bn;else if(Rn(o))if(Hn)x=Jn;else{x=Qn;var b=Gn}else!(u=o.nodeName)||"input"!==u.toLowerCase()||"checkbox"!==o.type&&"radio"!==o.type?r&&Ct(r.elementType)&&(x=Bn):x=Xn;switch(x&&(x=x(e,r))?Ln(l,x,n,a):(b&&b(e,o,r),"focusout"===e&&r&&"number"===o.type&&null!=r.memoizedProps.value&&yt(o,"number",o.value)),b=r?Je(r):window,e){case"focusin":(Rn(b)||"true"===b.contentEditable)&&(or=b,sr=r,ur=null);break;case"focusout":ur=sr=or=null;break;case"mousedown":cr=!0;break;case"contextmenu":case"mouseup":case"dragend":cr=!1,dr(l,n,a);break;case"selectionchange":if(lr)break;case"keydown":case"keyup":dr(l,n,a)}var y;if($n)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else Fn?Pn(e,n)&&(k="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(k="onCompositionStart");k&&(Cn&&"ko"!==n.locale&&(Fn||"onCompositionStart"!==k?"onCompositionEnd"===k&&Fn&&(y=Yt()):(Wt="value"in(Ut=a)?Ut.value:Ut.textContent,Fn=!0)),0<(b=ad(r,k)).length&&(k=new pn(k,e,null,n,a),l.push({event:k,listeners:b}),y?k.data=y:null!==(y=Tn(n))&&(k.data=y))),(y=zn?function(e,t){switch(e){case"compositionend":return Tn(t);case"keypress":return 32!==t.which?null:(_n=!0,Nn);case"textInput":return(e=t.data)===Nn&&_n?null:e;default:return null}}(e,n):function(e,t){if(Fn)return"compositionend"===e||!$n&&Pn(e,t)?(e=Yt(),Kt=Wt=Ut=null,Fn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Cn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(k=ad(r,"onBeforeInput")).length&&(b=new pn("onBeforeInput","beforeinput",null,n,a),l.push({event:b,listeners:k}),b.data=y)),function(e,t,n,r,a){if("submit"===t&&n&&n.stateNode===a){var i=Uc((a[He]||null).action),l=r.submitter;l&&null!==(t=(t=l[He]||null)?Uc(t.formAction):l.getAttribute("formAction"))&&(i=t,l=null);var o=new nn("action","action",null,r,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==Rc){var e=l?Wc(a,l):new FormData(a);to(n,{pending:!0,data:e,method:a.method,action:i},null,e)}}else"function"===typeof i&&(o.preventDefault(),e=l?Wc(a,l):new FormData(a),to(n,{pending:!0,data:e,method:a.method,action:i},i,e))},currentTarget:a}]})}}(l,e,r,n,a)}Qc(l,t)})}function rd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ad(e,t){for(var n=t+"Capture",r=[];null!==e;){var a=e,i=a.stateNode;if(5!==(a=a.tag)&&26!==a&&27!==a||null===i||(null!=(a=It(e,n))&&r.unshift(rd(e,a,i)),null!=(a=It(e,t))&&r.push(rd(e,a,i))),3===e.tag)return r;e=e.return}return[]}function id(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function ld(e,t,n,r,a){for(var i=t._reactName,l=[];null!==n&&n!==r;){var o=n,s=o.alternate,u=o.stateNode;if(o=o.tag,null!==s&&s===r)break;5!==o&&26!==o&&27!==o||null===u||(s=u,a?null!=(u=It(n,i))&&l.unshift(rd(n,u,s)):a||null!=(u=It(n,i))&&l.push(rd(n,u,s))),n=n.return}0!==l.length&&e.push({event:t,listeners:l})}var od=/\r\n?/g,sd=/\u0000|\uFFFD/g;function ud(e){return("string"===typeof e?e:""+e).replace(od,"\n").replace(sd,"")}function cd(e,t){return t=ud(t),ud(e)===t}function dd(e,t,n,r,a,i){switch(n){case"children":"string"===typeof r?"body"===t||"textarea"===t&&""===r||jt(e,r):("number"===typeof r||"bigint"===typeof r)&&"body"!==t&&jt(e,""+r);break;case"className":ut(e,"class",r);break;case"tabIndex":ut(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":ut(e,n,r);break;case"style":zt(e,r,i);break;case"data":if("object"!==t){ut(e,"data",r);break}case"src":case"href":if(""===r&&("a"!==t||"href"!==n)){e.removeAttribute(n);break}if(null==r||"function"===typeof r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=Pt(""+r),e.setAttribute(n,r);break;case"action":case"formAction":if("function"===typeof r){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof i&&("formAction"===n?("input"!==t&&dd(e,t,"name",a.name,a,null),dd(e,t,"formEncType",a.formEncType,a,null),dd(e,t,"formMethod",a.formMethod,a,null),dd(e,t,"formTarget",a.formTarget,a,null)):(dd(e,t,"encType",a.encType,a,null),dd(e,t,"method",a.method,a,null),dd(e,t,"target",a.target,a,null))),null==r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=Pt(""+r),e.setAttribute(n,r);break;case"onClick":null!=r&&(e.onclick=Tt);break;case"onScroll":null!=r&&Xc("scroll",e);break;case"onScrollEnd":null!=r&&Xc("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(l(61));if(null!=(n=r.__html)){if(null!=a.children)throw Error(l(60));e.innerHTML=n}}break;case"multiple":e.multiple=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"muted":e.muted=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==r||"function"===typeof r||"boolean"===typeof r||"symbol"===typeof r){e.removeAttribute("xlink:href");break}n=Pt(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""+r):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":!0===r?e.setAttribute(n,""):!1!==r&&null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,r):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":null!=r&&"function"!==typeof r&&"symbol"!==typeof r&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case"rowSpan":case"start":null==r||"function"===typeof r||"symbol"===typeof r||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case"popover":Xc("beforetoggle",e),Xc("toggle",e),st(e,"popover",r);break;case"xlinkActuate":ct(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":ct(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":ct(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":ct(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":ct(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":ct(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":ct(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":ct(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":ct(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":st(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&st(e,n=Nt.get(n)||n,r)}}function pd(e,t,n,r,a,i){switch(n){case"style":zt(e,r,i);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(l(61));if(null!=(n=r.__html)){if(null!=a.children)throw Error(l(60));e.innerHTML=n}}break;case"children":"string"===typeof r?jt(e,r):("number"===typeof r||"bigint"===typeof r)&&jt(e,""+r);break;case"onScroll":null!=r&&Xc("scroll",e);break;case"onScrollEnd":null!=r&&Xc("scrollend",e);break;case"onClick":null!=r&&(e.onclick=Tt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:nt.hasOwnProperty(n)||("o"!==n[0]||"n"!==n[1]||(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),"function"===typeof(i=null!=(i=e[He]||null)?i[n]:null)&&e.removeEventListener(t,i,a),"function"!==typeof r)?n in e?e[n]=r:!0===r?e.setAttribute(n,""):st(e,n,r):("function"!==typeof i&&null!==i&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a)))}}function fd(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Xc("error",e),Xc("load",e);var r,a=!1,i=!1;for(r in n)if(n.hasOwnProperty(r)){var o=n[r];if(null!=o)switch(r){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:dd(e,t,r,o,n,null)}}return i&&dd(e,t,"srcSet",n.srcSet,n,null),void(a&&dd(e,t,"src",n.src,n,null));case"input":Xc("invalid",e);var s=r=o=i=null,u=null,c=null;for(a in n)if(n.hasOwnProperty(a)){var d=n[a];if(null!=d)switch(a){case"name":i=d;break;case"type":o=d;break;case"checked":u=d;break;case"defaultChecked":c=d;break;case"value":r=d;break;case"defaultValue":s=d;break;case"children":case"dangerouslySetInnerHTML":if(null!=d)throw Error(l(137,t));break;default:dd(e,t,a,d,n,null)}}return void bt(e,r,s,u,c,o,i,!1);case"select":for(i in Xc("invalid",e),a=o=r=null,n)if(n.hasOwnProperty(i)&&null!=(s=n[i]))switch(i){case"value":r=s;break;case"defaultValue":o=s;break;case"multiple":a=s;default:dd(e,t,i,s,n,null)}return t=r,n=o,e.multiple=!!a,void(null!=t?kt(e,!!a,t,!1):null!=n&&kt(e,!!a,n,!0));case"textarea":for(o in Xc("invalid",e),r=i=a=null,n)if(n.hasOwnProperty(o)&&null!=(s=n[o]))switch(o){case"value":a=s;break;case"defaultValue":i=s;break;case"children":r=s;break;case"dangerouslySetInnerHTML":if(null!=s)throw Error(l(91));break;default:dd(e,t,o,s,n,null)}return void St(e,a,i,r);case"option":for(u in n)if(n.hasOwnProperty(u)&&null!=(a=n[u]))if("selected"===u)e.selected=a&&"function"!==typeof a&&"symbol"!==typeof a;else dd(e,t,u,a,n,null);return;case"dialog":Xc("beforetoggle",e),Xc("toggle",e),Xc("cancel",e),Xc("close",e);break;case"iframe":case"object":Xc("load",e);break;case"video":case"audio":for(a=0;a<qc.length;a++)Xc(qc[a],e);break;case"image":Xc("error",e),Xc("load",e);break;case"details":Xc("toggle",e);break;case"embed":case"source":case"link":Xc("error",e),Xc("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&null!=(a=n[c]))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:dd(e,t,c,a,n,null)}return;default:if(Ct(t)){for(d in n)n.hasOwnProperty(d)&&(void 0!==(a=n[d])&&pd(e,t,d,a,n,void 0));return}}for(s in n)n.hasOwnProperty(s)&&(null!=(a=n[s])&&dd(e,t,s,a,n,null))}function hd(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}var md=null,gd=null;function vd(e){return 9===e.nodeType?e:e.ownerDocument}function xd(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function bd(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function yd(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var kd=null;var wd="function"===typeof setTimeout?setTimeout:void 0,Sd="function"===typeof clearTimeout?clearTimeout:void 0,jd="function"===typeof Promise?Promise:void 0,$d="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof jd?function(e){return jd.resolve(null).then(e).catch(Ed)}:wd;function Ed(e){setTimeout(function(){throw e})}function zd(e){return"head"===e}function Cd(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&8===a.nodeType)if("/$"===(n=a.data)||"/&"===n){if(0===r)return e.removeChild(a),void Wp(t);r--}else if("$"===n||"$?"===n||"$~"===n||"$!"===n||"&"===n)r++;else if("html"===n)Md(e.ownerDocument.documentElement);else if("head"===n){Md(n=e.ownerDocument.head);for(var i=n.firstChild;i;){var l=i.nextSibling,o=i.nodeName;i[qe]||"SCRIPT"===o||"STYLE"===o||"LINK"===o&&"stylesheet"===i.rel.toLowerCase()||n.removeChild(i),i=l}}else"body"===n&&Md(e.ownerDocument.body);n=a}while(n);Wp(t)}function Nd(e,t){var n=e;e=0;do{var r=n.nextSibling;if(1===n.nodeType?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",""===n.getAttribute("style")&&n.removeAttribute("style")):3===n.nodeType&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),r&&8===r.nodeType)if("/$"===(n=r.data)){if(0===e)break;e--}else"$"!==n&&"$?"!==n&&"$~"!==n&&"$!"!==n||e++;n=r}while(n)}function _d(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":_d(n),Ge(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===n.rel.toLowerCase())continue}e.removeChild(n)}}function Pd(e,t){for(;8!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null;if(null===(e=Ad(e.nextSibling)))return null}return e}function Td(e){return"$?"===e.data||"$~"===e.data}function Fd(e){return"$!"===e.data||"$?"===e.data&&"loading"!==e.ownerDocument.readyState}function Ad(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"$~"===t||"&"===t||"F!"===t||"F"===t)break;if("/$"===t||"/&"===t)return null}}return e}var Rd=null;function Ld(e){e=e.nextSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n||"/&"===n){if(0===t)return Ad(e.nextSibling);t--}else"$"!==n&&"$!"!==n&&"$?"!==n&&"$~"!==n&&"&"!==n||t++}e=e.nextSibling}return null}function Od(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n||"$~"===n||"&"===n){if(0===t)return e;t--}else"/$"!==n&&"/&"!==n||t++}e=e.previousSibling}return null}function Dd(e,t,n){switch(t=vd(n),e){case"html":if(!(e=t.documentElement))throw Error(l(452));return e;case"head":if(!(e=t.head))throw Error(l(453));return e;case"body":if(!(e=t.body))throw Error(l(454));return e;default:throw Error(l(451))}}function Md(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ge(e)}var Id=new Map,Bd=new Set;function Hd(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Vd=R.d;R.d={f:function(){var e=Vd.f(),t=ec();return e||t},r:function(e){var t=Xe(e);null!==t&&5===t.tag&&"form"===t.type?ro(t):Vd.r(e)},D:function(e){Vd.D(e),Wd("dns-prefetch",e,null)},C:function(e,t){Vd.C(e,t),Wd("preconnect",e,t)},L:function(e,t,n){Vd.L(e,t,n);var r=Ud;if(r&&e&&t){var a='link[rel="preload"][as="'+vt(t)+'"]';"image"===t&&n&&n.imageSrcSet?(a+='[imagesrcset="'+vt(n.imageSrcSet)+'"]',"string"===typeof n.imageSizes&&(a+='[imagesizes="'+vt(n.imageSizes)+'"]')):a+='[href="'+vt(e)+'"]';var i=a;switch(t){case"style":i=Yd(e);break;case"script":i=Qd(e)}Id.has(i)||(e=f({rel:"preload",href:"image"===t&&n&&n.imageSrcSet?void 0:e,as:t},n),Id.set(i,e),null!==r.querySelector(a)||"style"===t&&r.querySelector(qd(i))||"script"===t&&r.querySelector(Xd(i))||(fd(t=r.createElement("link"),"link",e),et(t),r.head.appendChild(t)))}},m:function(e,t){Vd.m(e,t);var n=Ud;if(n&&e){var r=t&&"string"===typeof t.as?t.as:"script",a='link[rel="modulepreload"][as="'+vt(r)+'"][href="'+vt(e)+'"]',i=a;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Qd(e)}if(!Id.has(i)&&(e=f({rel:"modulepreload",href:e},t),Id.set(i,e),null===n.querySelector(a))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Xd(i)))return}fd(r=n.createElement("link"),"link",e),et(r),n.head.appendChild(r)}}},X:function(e,t){Vd.X(e,t);var n=Ud;if(n&&e){var r=Ze(n).hoistableScripts,a=Qd(e),i=r.get(a);i||((i=n.querySelector(Xd(a)))||(e=f({src:e,async:!0},t),(t=Id.get(a))&&tp(e,t),et(i=n.createElement("script")),fd(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(a,i))}},S:function(e,t,n){Vd.S(e,t,n);var r=Ud;if(r&&e){var a=Ze(r).hoistableStyles,i=Yd(e);t=t||"default";var l=a.get(i);if(!l){var o={loading:0,preload:null};if(l=r.querySelector(qd(i)))o.loading=5;else{e=f({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Id.get(i))&&ep(e,n);var s=l=r.createElement("link");et(s),fd(s,"link",e),s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),s.addEventListener("load",function(){o.loading|=1}),s.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Zd(l,t,r)}l={type:"stylesheet",instance:l,count:1,state:o},a.set(i,l)}}},M:function(e,t){Vd.M(e,t);var n=Ud;if(n&&e){var r=Ze(n).hoistableScripts,a=Qd(e),i=r.get(a);i||((i=n.querySelector(Xd(a)))||(e=f({src:e,async:!0,type:"module"},t),(t=Id.get(a))&&tp(e,t),et(i=n.createElement("script")),fd(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(a,i))}}};var Ud="undefined"===typeof document?null:document;function Wd(e,t,n){var r=Ud;if(r&&"string"===typeof t&&t){var a=vt(t);a='link[rel="'+e+'"][href="'+a+'"]',"string"===typeof n&&(a+='[crossorigin="'+n+'"]'),Bd.has(a)||(Bd.add(a),e={rel:e,crossOrigin:n,href:t},null===r.querySelector(a)&&(fd(t=r.createElement("link"),"link",e),et(t),r.head.appendChild(t)))}}function Kd(e,t,n,r){var a,i,o,s,u=(u=K.current)?Hd(u):null;if(!u)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof n.precedence&&"string"===typeof n.href?(t=Yd(n.href),(r=(n=Ze(u).hoistableStyles).get(t))||(r={type:"style",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===n.rel&&"string"===typeof n.href&&"string"===typeof n.precedence){e=Yd(n.href);var c=Ze(u).hoistableStyles,d=c.get(e);if(d||(u=u.ownerDocument||u,d={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,d),(c=u.querySelector(qd(e)))&&!c._p&&(d.instance=c,d.state.loading=5),Id.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Id.set(e,n),c||(a=u,i=e,o=n,s=d.state,a.querySelector('link[rel="preload"][as="style"]['+i+"]")?s.loading=1:(i=a.createElement("link"),s.preload=i,i.addEventListener("load",function(){return s.loading|=1}),i.addEventListener("error",function(){return s.loading|=2}),fd(i,"link",o),et(i),a.head.appendChild(i))))),t&&null===r)throw Error(l(528,""));return d}if(t&&null!==r)throw Error(l(529,""));return null;case"script":return t=n.async,"string"===typeof(n=n.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Qd(n),(r=(n=Ze(u).hoistableScripts).get(t))||(r={type:"script",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Yd(e){return'href="'+vt(e)+'"'}function qd(e){return'link[rel="stylesheet"]['+e+"]"}function Gd(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function Qd(e){return'[src="'+vt(e)+'"]'}function Xd(e){return"script[async]"+e}function Jd(e,t,n){if(t.count++,null===t.instance)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+vt(n.href)+'"]');if(r)return t.instance=r,et(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return et(r=(e.ownerDocument||e).createElement("style")),fd(r,"style",a),Zd(r,n.precedence,e),t.instance=r;case"stylesheet":a=Yd(n.href);var i=e.querySelector(qd(a));if(i)return t.state.loading|=4,t.instance=i,et(i),i;r=Gd(n),(a=Id.get(a))&&ep(r,a),et(i=(e.ownerDocument||e).createElement("link"));var o=i;return o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),fd(i,"link",r),t.state.loading|=4,Zd(i,n.precedence,e),t.instance=i;case"script":return i=Qd(n.src),(a=e.querySelector(Xd(i)))?(t.instance=a,et(a),a):(r=n,(a=Id.get(i))&&tp(r=f({},n),a),et(a=(e=e.ownerDocument||e).createElement("script")),fd(a,"link",r),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(l(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(r=t.instance,t.state.loading|=4,Zd(r,n.precedence,e));return t.instance}function Zd(e,t,n){for(var r=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=r.length?r[r.length-1]:null,i=a,l=0;l<r.length;l++){var o=r[l];if(o.dataset.precedence===t)i=o;else if(i!==a)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=9===n.nodeType?n.head:n).insertBefore(e,t.firstChild)}function ep(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function tp(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var np=null;function rp(e,t,n){if(null===np){var r=new Map,a=np=new Map;a.set(n,r)}else(r=(a=np).get(n))||(r=new Map,a.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var i=n[a];if(!(i[qe]||i[Be]||"link"===e&&"stylesheet"===i.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==i.namespaceURI){var l=i.getAttribute(t)||"";l=e+l;var o=r.get(l);o?o.push(i):r.set(l,[i])}}return r}function ap(e,t,n){(e=e.ownerDocument||e).head.insertBefore(n,"title"===t?e.querySelector("head > title"):null)}function ip(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var lp=0;function op(){if(this.count--,0===this.count&&(0===this.imgCount||!this.waitingForImages))if(this.stylesheets)up(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var sp=null;function up(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,sp=new Map,t.forEach(cp,e),sp=null,op.call(e))}function cp(e,t){if(!(4&t.state.loading)){var n=sp.get(e);if(n)var r=n.get(null);else{n=new Map,sp.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var l=a[i];"LINK"!==l.nodeName&&"not all"===l.getAttribute("media")||(n.set(l.dataset.precedence,l),r=l)}r&&n.set(null,r)}l=(a=t.instance).getAttribute("data-precedence"),(i=n.get(l)||r)===r&&n.set(null,a),n.set(l,a),this.count++,r=op.bind(this),a.addEventListener("load",r),a.addEventListener("error",r),i?i.parentNode.insertBefore(a,i.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(a,e.firstChild),t.state.loading|=4}}var dp={$$typeof:k,Provider:null,Consumer:null,_currentValue:L,_currentValue2:L,_threadCount:0};function pp(e,t,n,r,a,i,l,o,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Pe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pe(0),this.hiddenUpdates=Pe(null),this.identifierPrefix=r,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=l,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function fp(e,t,n,r,a,i,l,o,s,u,c,d){return e=new pp(e,t,n,l,s,u,c,d,o),t=1,!0===i&&(t|=24),i=Mr(3,null,null,t),e.current=i,i.stateNode=e,(t=Ia()).refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:r,isDehydrated:n,cache:t},vi(i),e}function hp(e){return e?e=Or:Or}function mp(e,t,n,r,a,i){a=hp(a),null===r.context?r.context=a:r.pendingContext=a,(r=bi(t)).payload={element:n},null!==(i=void 0===i?null:i)&&(r.callback=i),null!==(n=yi(e,r,t))&&(Gu(n,0,t),ki(n,e,t))}function gp(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function vp(e,t){gp(e,t),(e=e.alternate)&&gp(e,t)}function xp(e){if(13===e.tag||31===e.tag){var t=Ar(e,67108864);null!==t&&Gu(t,0,67108864),vp(e,67108864)}}function bp(e){if(13===e.tag||31===e.tag){var t=Yu(),n=Ar(e,t=Le(t));null!==n&&Gu(n,0,t),vp(e,t)}}var yp=!0;function kp(e,t,n,r){var a=A.T;A.T=null;var i=R.p;try{R.p=2,Sp(e,t,n,r)}finally{R.p=i,A.T=a}}function wp(e,t,n,r){var a=A.T;A.T=null;var i=R.p;try{R.p=8,Sp(e,t,n,r)}finally{R.p=i,A.T=a}}function Sp(e,t,n,r){if(yp){var a=jp(r);if(null===a)nd(e,t,r,$p,n),Lp(e,r);else if(function(e,t,n,r,a){switch(t){case"focusin":return Np=Op(Np,e,t,n,r,a),!0;case"dragenter":return _p=Op(_p,e,t,n,r,a),!0;case"mouseover":return Pp=Op(Pp,e,t,n,r,a),!0;case"pointerover":var i=a.pointerId;return Tp.set(i,Op(Tp.get(i)||null,e,t,n,r,a)),!0;case"gotpointercapture":return i=a.pointerId,Fp.set(i,Op(Fp.get(i)||null,e,t,n,r,a)),!0}return!1}(a,e,t,n,r))r.stopPropagation();else if(Lp(e,r),4&t&&-1<Rp.indexOf(e)){for(;null!==a;){var i=Xe(a);if(null!==i)switch(i.tag){case 3:if((i=i.stateNode).current.memoizedState.isDehydrated){var l=Ee(i.pendingLanes);if(0!==l){var o=i;for(o.pendingLanes|=2,o.entangledLanes|=2;l;){var s=1<<31-ye(l);o.entanglements[1]|=s,l&=~s}Lc(i),0===(6&hu)&&(Ru=se()+500,Oc(0,!1))}}break;case 31:case 13:null!==(o=Ar(i,2))&&Gu(o,0,2),ec(),vp(i,2)}if(null===(i=jp(r))&&nd(e,t,r,$p,n),i===a)break;a=i}null!==a&&r.stopPropagation()}else nd(e,t,r,null,n)}}function jp(e){return Ep(e=At(e))}var $p=null;function Ep(e){if($p=null,null!==(e=Qe(e))){var t=s(e);if(null===t)e=null;else{var n=t.tag;if(13===n){if(null!==(e=u(t)))return e;e=null}else if(31===n){if(null!==(e=c(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return $p=e,null}function zp(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ue()){case ce:return 2;case de:return 8;case pe:case fe:return 32;case he:return 268435456;default:return 32}default:return 32}}var Cp=!1,Np=null,_p=null,Pp=null,Tp=new Map,Fp=new Map,Ap=[],Rp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Lp(e,t){switch(e){case"focusin":case"focusout":Np=null;break;case"dragenter":case"dragleave":_p=null;break;case"mouseover":case"mouseout":Pp=null;break;case"pointerover":case"pointerout":Tp.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fp.delete(t.pointerId)}}function Op(e,t,n,r,a,i){return null===e||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[a]},null!==t&&(null!==(t=Xe(t))&&xp(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function Dp(e){var t=Qe(e.target);if(null!==t){var n=s(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=u(n)))return e.blockedOn=t,void Me(e.priority,function(){bp(n)})}else if(31===t){if(null!==(t=c(n)))return e.blockedOn=t,void Me(e.priority,function(){bp(n)})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Mp(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=jp(e.nativeEvent);if(null!==n)return null!==(t=Xe(n))&&xp(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);Ft=r,n.target.dispatchEvent(r),Ft=null,t.shift()}return!0}function Ip(e,t,n){Mp(e)&&n.delete(t)}function Bp(){Cp=!1,null!==Np&&Mp(Np)&&(Np=null),null!==_p&&Mp(_p)&&(_p=null),null!==Pp&&Mp(Pp)&&(Pp=null),Tp.forEach(Ip),Fp.forEach(Ip)}function Hp(e,t){e.blockedOn===t&&(e.blockedOn=null,Cp||(Cp=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Bp)))}var Vp=null;function Up(e){Vp!==e&&(Vp=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Vp===e&&(Vp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],a=e[t+2];if("function"!==typeof r){if(null===Ep(r||n))continue;break}var i=Xe(n);null!==i&&(e.splice(t,3),t-=3,to(i,{pending:!0,data:a,method:n.method,action:r},r,a))}}))}function Wp(e){function t(t){return Hp(t,e)}null!==Np&&Hp(Np,e),null!==_p&&Hp(_p,e),null!==Pp&&Hp(Pp,e),Tp.forEach(t),Fp.forEach(t);for(var n=0;n<Ap.length;n++){var r=Ap[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ap.length&&null===(n=Ap[0]).blockedOn;)Dp(n),null===n.blockedOn&&Ap.shift();if(null!=(n=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<n.length;r+=3){var a=n[r],i=n[r+1],l=a[He]||null;if("function"===typeof i)l||Up(n);else if(l){var o=null;if(i&&i.hasAttribute("formAction")){if(a=i,l=i[He]||null)o=l.formAction;else if(null!==Ep(a))continue}else o=l.action;"function"===typeof o?n[r+1]=o:(n.splice(r,3),r-=3),Up(n)}}}function Kp(){function e(e){e.canIntercept&&"react-transition"===e.info&&e.intercept({handler:function(){return new Promise(function(e){return a=e})},focusReset:"manual",scroll:"manual"})}function t(){null!==a&&(a(),a=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&null!=e.url&&navigation.navigate(e.url,{state:e.getState(),info:"react-transition",history:"replace"})}}if("object"===typeof navigation){var r=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),null!==a&&(a(),a=null)}}}function Yp(e){this._internalRoot=e}function qp(e){this._internalRoot=e}qp.prototype.render=Yp.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(l(409));mp(t.current,Yu(),e,t,null,null)},qp.prototype.unmount=Yp.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;mp(e.current,2,null,e,null,null),ec(),t[Ve]=null}},qp.prototype.unstable_scheduleHydration=function(e){if(e){var t=De();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ap.length&&0!==t&&t<Ap[n].priority;n++);Ap.splice(n,0,e),0===n&&Dp(e)}};var Gp=a.version;if("19.2.4"!==Gp)throw Error(l(527,Gp,"19.2.4"));R.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(l(188));throw e=Object.keys(e).join(","),Error(l(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=s(e)))throw Error(l(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(null===a)break;var i=a.alternate;if(null===i){if(null!==(r=a.return)){n=r;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return d(a),e;if(i===r)return d(a),t;i=i.sibling}throw Error(l(188))}if(n.return!==r.return)n=a,r=i;else{for(var o=!1,u=a.child;u;){if(u===n){o=!0,n=a,r=i;break}if(u===r){o=!0,r=a,n=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===n){o=!0,n=i,r=a;break}if(u===r){o=!0,r=i,n=a;break}u=u.sibling}if(!o)throw Error(l(189))}}if(n.alternate!==r)throw Error(l(190))}if(3!==n.tag)throw Error(l(188));return n.stateNode.current===n?e:t}(t),e=null===(e=null!==e?p(e):null)?null:e.stateNode};var Qp={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:A,reconcilerVersion:"19.2.4"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Xp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xp.isDisabled&&Xp.supportsFiber)try{ve=Xp.inject(Qp),xe=Xp}catch(Zp){}}t.createRoot=function(e,t){if(!o(e))throw Error(l(299));var n=!1,r="",a=$o,i=Eo,s=zo;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onUncaughtError&&(a=t.onUncaughtError),void 0!==t.onCaughtError&&(i=t.onCaughtError),void 0!==t.onRecoverableError&&(s=t.onRecoverableError)),t=fp(e,1,!1,null,0,n,r,null,a,i,s,Kp),e[Ve]=t.current,ed(e),new Yp(t)}},672(e,t,n){var r=n(43);function a(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var l={d:{f:i,r:function(){throw Error(a(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},o=Symbol.for("react.portal");var s=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(a(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:o,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.flushSync=function(e){var t=s.T,n=l.p;try{if(s.T=null,l.p=2,e)return e()}finally{s.T=t,l.p=n,l.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,l.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&l.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var n=t.as,r=u(n,t.crossOrigin),a="string"===typeof t.integrity?t.integrity:void 0,i="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?l.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:i}):"script"===n&&l.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:i,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=u(t.as,t.crossOrigin);l.d.M(e,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&l.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var n=t.as,r=u(n,t.crossOrigin);l.d.L(e,n,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var n=u(t.as,t.crossOrigin);l.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else l.d.m(e)},t.requestFormReset=function(e){l.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},t.useFormStatus=function(){return s.H.useHostTransitionStatus()},t.version="19.2.4"},391(e,t,n){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(4)},950(e,t,n){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(672)},799(e,t){var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function a(e,t,r){var a=null;if(void 0!==r&&(a=""+r),void 0!==t.key&&(a=""+t.key),"key"in t)for(var i in r={},t)"key"!==i&&(r[i]=t[i]);else r=t;return t=r.ref,{$$typeof:n,type:e,key:a,ref:void 0!==t?t:null,props:r}}t.Fragment=r,t.jsx=a,t.jsxs=a},288(e,t){var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),o=Symbol.for("react.consumer"),s=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),f=Symbol.for("react.activity"),h=Symbol.iterator;var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,v={};function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||m}function b(){}function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||m}x.prototype.isReactComponent={},x.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},x.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=x.prototype;var k=y.prototype=new b;k.constructor=y,g(k,x.prototype),k.isPureReactComponent=!0;var w=Array.isArray;function S(){}var j={H:null,A:null,T:null,S:null},$=Object.prototype.hasOwnProperty;function E(e,t,r){var a=r.ref;return{$$typeof:n,type:e,key:t,ref:void 0!==a?a:null,props:r}}function z(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var C=/\/+/g;function N(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function _(e,t,a,i,l){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var s,u,c=!1;if(null===e)c=!0;else switch(o){case"bigint":case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case n:case r:c=!0;break;case p:return _((c=e._init)(e._payload),t,a,i,l)}}if(c)return l=l(e),c=""===i?"."+N(e,0):i,w(l)?(a="",null!=c&&(a=c.replace(C,"$&/")+"/"),_(l,t,a,"",function(e){return e})):null!=l&&(z(l)&&(s=l,u=a+(null==l.key||e&&e.key===l.key?"":(""+l.key).replace(C,"$&/")+"/")+c,l=E(s.type,u,s.props)),t.push(l)),1;c=0;var d,f=""===i?".":i+":";if(w(e))for(var m=0;m<e.length;m++)c+=_(i=e[m],t,a,o=f+N(i,m),l);else if("function"===typeof(m=null===(d=e)||"object"!==typeof d?null:"function"===typeof(d=h&&d[h]||d["@@iterator"])?d:null))for(e=m.call(e),m=0;!(i=e.next()).done;)c+=_(i=i.value,t,a,o=f+N(i,m++),l);else if("object"===o){if("function"===typeof e.then)return _(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(S,S):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,a,i,l);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return c}function P(e,t,n){if(null==e)return e;var r=[],a=0;return _(e,r,"","",function(e){return t.call(n,e,a++)}),r}function T(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var F="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},A={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!z(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};t.Activity=f,t.Children=A,t.Component=x,t.Fragment=a,t.Profiler=l,t.PureComponent=y,t.StrictMode=i,t.Suspense=c,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=j,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return j.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cacheSignal=function(){return null},t.cloneElement=function(e,t,n){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var r=g({},e.props),a=e.key;if(null!=t)for(i in void 0!==t.key&&(a=""+t.key),t)!$.call(t,i)||"key"===i||"__self"===i||"__source"===i||"ref"===i&&void 0===t.ref||(r[i]=t[i]);var i=arguments.length-2;if(1===i)r.children=n;else if(1<i){for(var l=Array(i),o=0;o<i;o++)l[o]=arguments[o+2];r.children=l}return E(e.type,a,r)},t.createContext=function(e){return(e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:o,_context:e},e},t.createElement=function(e,t,n){var r,a={},i=null;if(null!=t)for(r in void 0!==t.key&&(i=""+t.key),t)$.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(a[r]=t[r]);var l=arguments.length-2;if(1===l)a.children=n;else if(1<l){for(var o=Array(l),s=0;s<l;s++)o[s]=arguments[s+2];a.children=o}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===a[r]&&(a[r]=l[r]);return E(e,i,a)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:u,render:e}},t.isValidElement=z,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:T}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=j.T,n={};j.T=n;try{var r=e(),a=j.S;null!==a&&a(n,r),"object"===typeof r&&null!==r&&"function"===typeof r.then&&r.then(S,F)}catch(i){F(i)}finally{null!==t&&null!==n.types&&(t.types=n.types),j.T=t}},t.unstable_useCacheRefresh=function(){return j.H.useCacheRefresh()},t.use=function(e){return j.H.use(e)},t.useActionState=function(e,t,n){return j.H.useActionState(e,t,n)},t.useCallback=function(e,t){return j.H.useCallback(e,t)},t.useContext=function(e){return j.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return j.H.useDeferredValue(e,t)},t.useEffect=function(e,t){return j.H.useEffect(e,t)},t.useEffectEvent=function(e){return j.H.useEffectEvent(e)},t.useId=function(){return j.H.useId()},t.useImperativeHandle=function(e,t,n){return j.H.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return j.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return j.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return j.H.useMemo(e,t)},t.useOptimistic=function(e,t){return j.H.useOptimistic(e,t)},t.useReducer=function(e,t,n){return j.H.useReducer(e,t,n)},t.useRef=function(e){return j.H.useRef(e)},t.useState=function(e){return j.H.useState(e)},t.useSyncExternalStore=function(e,t,n){return j.H.useSyncExternalStore(e,t,n)},t.useTransition=function(){return j.H.useTransition()},t.version="19.2.4"},43(e,t,n){e.exports=n(288)},579(e,t,n){e.exports=n(799)},896(e,t){function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(!(0<i(a,t)))break e;e[r]=t,e[n]=a,n=r}}function r(e){return 0===e.length?null:e[0]}function a(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,l=a>>>1;r<l;){var o=2*(r+1)-1,s=e[o],u=o+1,c=e[u];if(0>i(s,n))u<a&&0>i(c,s)?(e[r]=c,e[u]=n,r=u):(e[r]=s,e[o]=n,r=o);else{if(!(u<a&&0>i(c,n)))break e;e[r]=c,e[u]=n,r=u}}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var l=performance;t.unstable_now=function(){return l.now()}}else{var o=Date,s=o.now();t.unstable_now=function(){return o.now()-s}}var u=[],c=[],d=1,p=null,f=3,h=!1,m=!1,g=!1,v=!1,x="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,y="undefined"!==typeof setImmediate?setImmediate:null;function k(e){for(var t=r(c);null!==t;){if(null===t.callback)a(c);else{if(!(t.startTime<=e))break;a(c),t.sortIndex=t.expirationTime,n(u,t)}t=r(c)}}function w(e){if(g=!1,k(e),!m)if(null!==r(u))m=!0,j||(j=!0,S());else{var t=r(c);null!==t&&T(w,t.startTime-e)}}var S,j=!1,$=-1,E=5,z=-1;function C(){return!!v||!(t.unstable_now()-z<E)}function N(){if(v=!1,j){var e=t.unstable_now();z=e;var n=!0;try{e:{m=!1,g&&(g=!1,b($),$=-1),h=!0;var i=f;try{t:{for(k(e),p=r(u);null!==p&&!(p.expirationTime>e&&C());){var l=p.callback;if("function"===typeof l){p.callback=null,f=p.priorityLevel;var o=l(p.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof o){p.callback=o,k(e),n=!0;break t}p===r(u)&&a(u),k(e)}else a(u);p=r(u)}if(null!==p)n=!0;else{var s=r(c);null!==s&&T(w,s.startTime-e),n=!1}}break e}finally{p=null,f=i,h=!1}n=void 0}}finally{n?S():j=!1}}}if("function"===typeof y)S=function(){y(N)};else if("undefined"!==typeof MessageChannel){var _=new MessageChannel,P=_.port2;_.port1.onmessage=N,S=function(){P.postMessage(null)}}else S=function(){x(N,0)};function T(e,n){$=x(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},t.unstable_requestPaint=function(){v=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},t.unstable_scheduleCallback=function(e,a,i){var l=t.unstable_now();switch("object"===typeof i&&null!==i?i="number"===typeof(i=i.delay)&&0<i?l+i:l:i=l,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return e={id:d++,callback:a,priorityLevel:e,startTime:i,expirationTime:o=i+o,sortIndex:-1},i>l?(e.sortIndex=i,n(c,e),null===r(u)&&e===r(c)&&(g?(b($),$=-1):g=!0,T(w,i-l))):(e.sortIndex=o,n(u,e),m||h||(m=!0,j||(j=!0,S()))),e},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}},853(e,t,n){e.exports=n(896)}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,a){if(1&a&&(r=this(r)),8&a)return r;if("object"===typeof r&&r){if(4&a&&r.__esModule)return r;if(16&a&&"function"===typeof r.then)return r}var i=Object.create(null);n.r(i);var l={};e=e||[null,t({}),t([]),t(t)];for(var o=2&a&&r;("object"==typeof o||"function"==typeof o)&&!~e.indexOf(o);o=t(o))Object.getOwnPropertyNames(o).forEach(e=>l[e]=()=>r[e]);return l.default=()=>r,n.d(i,l),i}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nc=void 0;var r=n(43),a=n.t(r,2),i=n(391),l="popstate";function o(e){return"object"===typeof e&&null!=e&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function s(){return m(function(e,t){let n=t.state?.masked,{pathname:r,search:a,hash:i}=n||e.location;return p("",{pathname:r,search:a,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default",n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)},function(e,t){return"string"===typeof t?t:f(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function u(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function c(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function d(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function p(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?h(t):t,state:n,key:t&&t.key||r||Math.random().toString(36).substring(2,10),unstable_mask:a}}function f(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function h(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function m(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:a=document.defaultView,v5Compat:i=!1}=r,s=a.history,u="POP",c=null,f=h();function h(){return(s.state||{idx:null}).idx}function m(){u="POP";let e=h(),t=null==e?null:e-f;f=e,c&&c({action:u,location:x.location,delta:t})}function v(e){return g(e)}null==f&&(f=0,s.replaceState({...s.state,idx:f},""));let x={get action(){return u},get location(){return e(a,s)},listen(e){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(l,m),c=e,()=>{a.removeEventListener(l,m),c=null}},createHref:e=>t(a,e),createURL:v,encodeLocation(e){let t=v(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){u="PUSH";let r=o(e)?e:p(x.location,e,t);n&&n(r,e),f=h()+1;let l=d(r,f),m=x.createHref(r.unstable_mask||r);try{s.pushState(l,"",m)}catch(g){if(g instanceof DOMException&&"DataCloneError"===g.name)throw g;a.location.assign(m)}i&&c&&c({action:u,location:x.location,delta:1})},replace:function(e,t){u="REPLACE";let r=o(e)?e:p(x.location,e,t);n&&n(r,e),f=h();let a=d(r,f),l=x.createHref(r.unstable_mask||r);s.replaceState(a,"",l),i&&c&&c({action:u,location:x.location,delta:0})},go:e=>s.go(e)};return x}function g(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="http://localhost";"undefined"!==typeof window&&(n="null"!==window.location.origin?window.location.origin:window.location.href),u(n,"No window.location.(origin|href) available to create URL");let r="string"===typeof e?e:f(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}new WeakMap;function v(e,t){return x(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function x(e,t,n,r){let a=F(("string"===typeof t?h(t):t).pathname||"/",n);if(null==a)return null;let i=b(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n]);return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(i);let l=null;for(let o=0;null==l&&o<i.length;++o){let e=T(a);l=N(i[o],e,r)}return l}function b(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e,i){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,o=arguments.length>3?arguments[3]:void 0,s={relativePath:void 0===o?e.path||"":o,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};if(s.relativePath.startsWith("/")){if(!s.relativePath.startsWith(r)&&l)return;u(s.relativePath.startsWith(r),`Absolute route path "${s.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),s.relativePath=s.relativePath.slice(r.length)}let c=I([r,s.relativePath]),d=n.concat(s);e.children&&e.children.length>0&&(u(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${c}".`),b(e.children,t,d,c,l)),(null!=e.path||e.index)&&t.push({path:c,score:C(c,e.index),routesMeta:d})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let n of y(e.path))i(e,t,!0,n);else i(e,t)}),t}function y(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,a=n.endsWith("?"),i=n.replace(/\?$/,"");if(0===r.length)return a?[i,""]:[i];let l=y(r.join("/")),o=[];return o.push(...l.map(e=>""===e?i:[i,e].join("/"))),a&&o.push(...l),o.map(t=>e.startsWith("/")&&""===t?"/":t)}var k=/^:[\w-]+$/,w=3,S=2,j=1,$=10,E=-2,z=e=>"*"===e;function C(e,t){let n=e.split("/"),r=n.length;return n.some(z)&&(r+=E),t&&(r+=S),n.filter(e=>!z(e)).reduce((e,t)=>e+(k.test(t)?w:""===t?j:$),r)}function N(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:r}=e,a={},i="/",l=[];for(let o=0;o<r.length;++o){let e=r[o],s=o===r.length-1,u="/"===i?t:t.slice(i.length)||"/",c=_({path:e.relativePath,caseSensitive:e.caseSensitive,end:s},u),d=e.route;if(!c&&s&&n&&!r[r.length-1].route.index&&(c=_({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},u)),!c)return null;Object.assign(a,c.params),l.push({params:a,pathname:I([i,c.pathname]),pathnameBase:B(I([i,c.pathnameBase])),route:d}),"/"!==c.pathnameBase&&(i=I([i,c.pathnameBase]))}return l}function _(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=P(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let i=a[0],l=i.replace(/(.)\/+$/,"$1"),o=a.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:a}=t;if("*"===r){let e=o[n]||"";l=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const s=o[n];return e[r]=a&&!s?void 0:(s||"").replace(/%2F/g,"/"),e},{}),pathname:i,pathnameBase:l,pattern:e}}function P(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];c("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,n,a,i)=>{if(r.push({paramName:t,isOptional:null!=n}),n){let t=i.charAt(a+e.length);return t&&"/"!==t?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),a+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":""!==e&&"/"!==e&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function T(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return c(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function F(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}var A=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function R(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)}),n.length>1?n.join("/"):"/"}function L(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function O(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function D(e){let t=O(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function M(e,t,n){let r,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?r=h(e):(r={...e},u(!r.pathname||!r.pathname.includes("?"),L("?","pathname","search",r)),u(!r.pathname||!r.pathname.includes("#"),L("#","pathname","hash",r)),u(!r.search||!r.search.includes("#"),L("#","search","hash",r)));let i,l=""===e||""===r.pathname,o=l?"/":r.pathname;if(null==o)i=n;else{let e=t.length-1;if(!a&&o.startsWith("..")){let t=o.split("/");for(;".."===t[0];)t.shift(),e-=1;r.pathname=t.join("/")}i=e>=0?t[e]:"/"}let s=function(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:r,search:a="",hash:i=""}="string"===typeof e?h(e):e;return r?(r=r.replace(/\/\/+/g,"/"),t=r.startsWith("/")?R(r.substring(1),"/"):R(r,n)):t=n,{pathname:t,search:H(a),hash:V(i)}}(r,i),c=o&&"/"!==o&&o.endsWith("/"),d=(l||"."===o)&&n.endsWith("/");return s.pathname.endsWith("/")||!c&&!d||(s.pathname+="/"),s}var I=e=>e.join("/").replace(/\/\/+/g,"/"),B=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),H=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",V=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";var U=class{constructor(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function W(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}function K(e){return e.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Y="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;function q(e,t){let n=e;if("string"!==typeof n||!A.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,a=!1;if(Y)try{let e=new URL(window.location.href),r=n.startsWith("//")?new URL(e.protocol+n):new URL(n),i=F(r.pathname,t);r.origin===e.origin&&null!=i?n=i+r.search+r.hash:a=!0}catch(i){c(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:a,to:n}}Symbol("Uninstrumented");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var G=["POST","PUT","PATCH","DELETE"],Q=(new Set(G),["GET",...G]);new Set(Q),Symbol("ResetLoaderData");var X=r.createContext(null);X.displayName="DataRouter";var J=r.createContext(null);J.displayName="DataRouterState";var Z=r.createContext(!1);function ee(){return r.useContext(Z)}var te=r.createContext({isTransitioning:!1});te.displayName="ViewTransition";var ne=r.createContext(new Map);ne.displayName="Fetchers";var re=r.createContext(null);re.displayName="Await";var ae=r.createContext(null);ae.displayName="Navigation";var ie=r.createContext(null);ie.displayName="Location";var le=r.createContext({outlet:null,matches:[],isDataRoute:!1});le.displayName="Route";var oe=r.createContext(null);oe.displayName="RouteError";var se="REACT_ROUTER_ERROR";function ue(){return null!=r.useContext(ie)}function ce(){return u(ue(),"useLocation() may be used only in the context of a <Router> component."),r.useContext(ie).location}var de="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function pe(e){r.useContext(ae).static||r.useLayoutEffect(e)}function fe(){let{isDataRoute:e}=r.useContext(le);return e?function(){let{router:e}=$e("useNavigate"),t=ze("useNavigate"),n=r.useRef(!1);pe(()=>{n.current=!0});let a=r.useCallback(async function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};c(n.current,de),n.current&&("number"===typeof r?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...a}))},[e,t]);return a}():function(){u(ue(),"useNavigate() may be used only in the context of a <Router> component.");let e=r.useContext(X),{basename:t,navigator:n}=r.useContext(ae),{matches:a}=r.useContext(le),{pathname:i}=ce(),l=JSON.stringify(D(a)),o=r.useRef(!1);pe(()=>{o.current=!0});let s=r.useCallback(function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(c(o.current,de),!o.current)return;if("number"===typeof r)return void n.go(r);let s=M(r,JSON.parse(l),i,"path"===a.relative);null==e&&"/"!==t&&(s.pathname="/"===s.pathname?t:I([t,s.pathname])),(a.replace?n.replace:n.push)(s,a.state,a)},[t,n,l,i,e]);return s}()}r.createContext(null);function he(){let{matches:e}=r.useContext(le),t=e[e.length-1];return t?t.params:{}}function me(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:n}=r.useContext(le),{pathname:a}=ce(),i=JSON.stringify(D(n));return r.useMemo(()=>M(e,JSON.parse(i),a,"path"===t),[e,i,a,t])}function ge(e,t,n){u(ue(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=r.useContext(ae),{matches:i}=r.useContext(le),l=i[i.length-1],o=l?l.params:{},s=l?l.pathname:"/",d=l?l.pathnameBase:"/",p=l&&l.route;{let e=p&&p.path||"";_e(s,!p||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let f,m=ce();if(t){let e="string"===typeof t?h(t):t;u("/"===d||e.pathname?.startsWith(d),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${e.pathname}" was given in the \`location\` prop.`),f=e}else f=m;let g=f.pathname||"/",x=g;if("/"!==d){let e=d.replace(/^\//,"").split("/");x="/"+g.replace(/^\//,"").split("/").slice(e.length).join("/")}let b=v(e,{pathname:x});c(p||null!=b,`No routes matched location "${f.pathname}${f.search}${f.hash}" `),c(null==b||void 0!==b[b.length-1].route.element||void 0!==b[b.length-1].route.Component||void 0!==b[b.length-1].route.lazy,`Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let y=Se(b&&b.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:I([d,a.encodeLocation?a.encodeLocation(e.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?d:I([d,a.encodeLocation?a.encodeLocation(e.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathnameBase])})),i,n);return t&&y?r.createElement(ie.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...f},navigationType:"POP"}},y):y}function ve(){let e=Ce(),t=W(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:a},l={padding:"2px 4px",backgroundColor:a},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=r.createElement(r.Fragment,null,r.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),r.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",r.createElement("code",{style:l},"ErrorBoundary")," or"," ",r.createElement("code",{style:l},"errorElement")," prop on your route.")),r.createElement(r.Fragment,null,r.createElement("h2",null,"Unexpected Application Error!"),r.createElement("h3",{style:{fontStyle:"italic"}},t),n?r.createElement("pre",{style:i},n):null,o)}var xe=r.createElement(ve,null),be=class extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&"object"===typeof e&&e&&"digest"in e&&"string"===typeof e.digest){const t=function(e){if(e.startsWith(`${se}:ROUTE_ERROR_RESPONSE:{`))try{let t=JSON.parse(e.slice(40));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText)return new U(t.status,t.statusText,t.data)}catch{}}(e.digest);t&&(e=t)}let t=void 0!==e?r.createElement(le.Provider,{value:this.props.routeContext},r.createElement(oe.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?r.createElement(ke,{error:e},t):t}};be.contextType=Z;var ye=new WeakMap;function ke(e){let{children:t,error:n}=e,{basename:a}=r.useContext(ae);if("object"===typeof n&&n&&"digest"in n&&"string"===typeof n.digest){let e=function(e){if(e.startsWith(`${se}:REDIRECT:{`))try{let t=JSON.parse(e.slice(28));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText&&"string"===typeof t.location&&"boolean"===typeof t.reloadDocument&&"boolean"===typeof t.replace)return t}catch{}}(n.digest);if(e){let t=ye.get(n);if(t)throw t;let i=q(e.location,a);if(Y&&!ye.get(n)){if(!i.isExternal&&!e.reloadDocument){const t=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw ye.set(n,t),t}window.location.href=i.absoluteURL||i.to}return r.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return t}function we(e){let{routeContext:t,match:n,children:a}=e,i=r.useContext(X);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),r.createElement(le.Provider,{value:t},a)}function Se(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,a=n?.state;if(null==e){if(!a)return null;if(a.errors)e=a.matches;else{if(0!==t.length||a.initialized||!(a.matches.length>0))return null;e=a.matches}}let i=e,l=a?.errors;if(null!=l){let e=i.findIndex(e=>e.route.id&&void 0!==l?.[e.route.id]);u(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(l).join(",")}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&a){o=a.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:r}=a,l=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!r||void 0===r[t.route.id]);if(t.route.lazy||l){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,d=a&&c?(e,t)=>{c(e,{location:a.location,params:a.matches?.[0]?.params??{},unstable_pattern:K(a.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,u)=>{let c,p=!1,f=null,h=null;a&&(c=l&&n.route.id?l[n.route.id]:void 0,f=n.route.errorElement||xe,o&&(s<0&&0===u?(_e("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),p=!0,h=null):s===u&&(p=!0,h=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,u+1)),g=()=>{let t;return t=c?f:p?h:n.route.Component?r.createElement(n.route.Component,null):n.route.element?n.route.element:e,r.createElement(we,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:null!=a},children:t})};return a&&(n.route.ErrorBoundary||n.route.errorElement||0===u)?r.createElement(be,{location:a.location,revalidation:a.revalidation,component:f,error:c,children:g(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:d}):g()},null)}function je(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function $e(e){let t=r.useContext(X);return u(t,je(e)),t}function Ee(e){let t=r.useContext(J);return u(t,je(e)),t}function ze(e){let t=function(e){let t=r.useContext(le);return u(t,je(e)),t}(e),n=t.matches[t.matches.length-1];return u(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Ce(){let e=r.useContext(oe),t=Ee("useRouteError"),n=ze("useRouteError");return void 0!==e?e:t.errors?.[n]}var Ne={};function _e(e,t,n){t||Ne[e]||(Ne[e]=!0,c(!1,n))}var Pe={};function Te(e,t){e||Pe[t]||(Pe[t]=!0,console.warn(t))}a.useOptimistic;r.memo(Fe);function Fe(e){let{routes:t,future:n,state:r,isStatic:a,onError:i}=e;return ge(t,void 0,{state:r,isStatic:a,onError:i,future:n})}function Ae(e){let{to:t,replace:n,state:a,relative:i}=e;u(ue(),"<Navigate> may be used only in the context of a <Router> component.");let{static:l}=r.useContext(ae);c(!l,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:o}=r.useContext(le),{pathname:s}=ce(),d=fe(),p=M(t,D(o),s,"path"===i),f=JSON.stringify(p);return r.useEffect(()=>{d(JSON.parse(f),{replace:n,state:a,relative:i})},[d,f,i,n,a]),null}function Re(e){u(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Le(e){let{basename:t="/",children:n=null,location:a,navigationType:i="POP",navigator:l,static:o=!1,unstable_useTransitions:s}=e;u(!ue(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=t.replace(/^\/*/,"/"),p=r.useMemo(()=>({basename:d,navigator:l,static:o,unstable_useTransitions:s,future:{}}),[d,l,o,s]);"string"===typeof a&&(a=h(a));let{pathname:f="/",search:m="",hash:g="",state:v=null,key:x="default",unstable_mask:b}=a,y=r.useMemo(()=>{let e=F(f,d);return null==e?null:{location:{pathname:e,search:m,hash:g,state:v,key:x,unstable_mask:b},navigationType:i}},[d,f,m,g,v,x,i,b]);return c(null!=y,`<Router basename="${d}"> is not able to match the URL "${f}${m}${g}" because it does not start with the basename, so the <Router> won't render anything.`),null==y?null:r.createElement(ae.Provider,{value:p},r.createElement(ie.Provider,{children:n,value:y}))}function Oe(e){let{children:t,location:n}=e;return ge(De(t),n)}r.Component;function De(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[];return r.Children.forEach(e,(e,a)=>{if(!r.isValidElement(e))return;let i=[...t,a];if(e.type===r.Fragment)return void n.push.apply(n,De(e.props.children,i));u(e.type===Re,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),u(!e.props.index||!e.props.children,"An index route cannot have child routes.");let l={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(l.children=De(e.props.children,i)),n.push(l)}),n}var Me="get",Ie="application/x-www-form-urlencoded";function Be(e){return"undefined"!==typeof HTMLElement&&e instanceof HTMLElement}var He=null;var Ve=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ue(e){return null==e||Ve.has(e)?e:(c(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ie}"`),null)}function We(e,t){let n,r,a,i,l;if(Be(o=e)&&"form"===o.tagName.toLowerCase()){let l=e.getAttribute("action");r=l?F(l,t):null,n=e.getAttribute("method")||Me,a=Ue(e.getAttribute("enctype"))||Ie,i=new FormData(e)}else if(function(e){return Be(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Be(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let l=e.form;if(null==l)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let o=e.getAttribute("formaction")||l.getAttribute("action");if(r=o?F(o,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||Me,a=Ue(e.getAttribute("formenctype"))||Ue(l.getAttribute("enctype"))||Ie,i=new FormData(l,e),!function(){if(null===He)try{new FormData(document.createElement("form"),0),He=!1}catch(e){He=!0}return He}()){let{name:t,type:n,value:r}=e;if("image"===n){let e=t?`${t}.`:"";i.append(`${e}x`,"0"),i.append(`${e}y`,"0")}else t&&i.append(t,r)}}else{if(Be(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Me,r=null,a=Ie,l=e}var o;return i&&"text/plain"===a&&(l=i,i=void 0),{action:r,method:n.toLowerCase(),encType:a,formData:i,body:l}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;function Ke(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}Symbol("SingleFetchRedirect");function Ye(e,t,n,r){let a="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return n?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${r}`:a.pathname=`${a.pathname}.${r}`:"/"===a.pathname?a.pathname=`_root.${r}`:t&&"/"===F(a.pathname,t)?a.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${r}`,a}async function qe(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Ge(e){return null!=e&&"string"===typeof e.page}function Qe(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Xe(e,t,n,r,a,i){let l=(e,t)=>!n[t]||e.route.id!==n[t].route.id,o=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith("*")&&n[t].params["*"]!==e.params["*"];return"assets"===i?t.filter((e,t)=>l(e,t)||o(e,t)):"data"===i?t.filter((t,i)=>{let s=r.routes[t.route.id];if(!s||!s.hasLoader)return!1;if(l(t,i)||o(t,i))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof r)return r}return!0}):[]}function Je(e,t){let{includeHydrateFallback:n}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r=e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let a=[r.module];return r.clientActionModule&&(a=a.concat(r.clientActionModule)),r.clientLoaderModule&&(a=a.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(a=a.concat(r.hydrateFallbackModule)),r.imports&&(a=a.concat(r.imports)),a}).flat(1),[...new Set(r)];var r}function Ze(e,t){let n=new Set,r=new Set(t);return e.reduce((e,a)=>{if(t&&!Ge(a)&&"script"===a.as&&a.href&&r.has(a.href))return e;let i=JSON.stringify(function(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}(a));return n.has(i)||(n.add(i),e.push({key:i,link:a})),e},[])}function et(e,t){return"lazy"===e.mode&&!0===t}function tt(){let e=r.useContext(X);return Ke(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function nt(){let e=r.useContext(J);return Ke(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var rt=r.createContext(void 0);function at(){let e=r.useContext(rt);return Ke(e,"You must render this element inside a <HydratedRouter> element"),e}function it(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function lt(e,t,n){if(n&&!ct)return[e[0]];if(t){let n=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,n+1)}return e}rt.displayName="FrameworkContext";function ot(e){let{page:t,...n}=e,{router:a}=tt(),i=r.useMemo(()=>v(a.routes,t,a.basename),[a.routes,t,a.basename]);return i?r.createElement(ut,{page:t,matches:i,...n}):null}function st(e){let{manifest:t,routeModules:n}=at(),[a,i]=r.useState([]);return r.useEffect(()=>{let r=!1;return async function(e,t,n){let r=await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await qe(r,n);return e.links?e.links():[]}return[]}));return Ze(r.flat(1).filter(Qe).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),a}function ut(e){let{page:t,matches:n,...a}=e,i=ce(),{future:l,manifest:o,routeModules:s}=at(),{basename:u}=tt(),{loaderData:c,matches:d}=nt(),p=r.useMemo(()=>Xe(t,n,d,o,i,"data"),[t,n,d,o,i]),f=r.useMemo(()=>Xe(t,n,d,o,i,"assets"),[t,n,d,o,i]),h=r.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let e=new Set,r=!1;if(n.forEach(t=>{let n=o.routes[t.route.id];n&&n.hasLoader&&(!p.some(e=>e.route.id===t.route.id)&&t.route.id in c&&s[t.route.id]?.shouldRevalidate||n.hasClientLoader?r=!0:e.add(t.route.id))}),0===e.size)return[];let a=Ye(t,u,l.unstable_trailingSlashAwareDataRequests,"data");return r&&e.size>0&&a.searchParams.set("_routes",n.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[a.pathname+a.search]},[u,l.unstable_trailingSlashAwareDataRequests,c,i,o,p,n,t,s]),m=r.useMemo(()=>Je(f,o),[f,o]),g=st(f);return r.createElement(r.Fragment,null,h.map(e=>r.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...a})),m.map(e=>r.createElement("link",{key:e,rel:"modulepreload",href:e,...a})),g.map(e=>{let{key:t,link:n}=e;return r.createElement("link",{key:t,nonce:a.nonce,...n,crossOrigin:n.crossOrigin??a.crossOrigin})}))}var ct=!1;function dt(e){let{manifest:t,serverHandoffString:n,isSpaMode:a,renderMeta:i,routeDiscovery:l,ssr:o}=at(),{router:s,static:u,staticContext:c}=tt(),{matches:d}=nt(),p=ee(),f=et(l,o);i&&(i.didRenderScripts=!0);let h=lt(d,null,a);r.useEffect(()=>{ct=!0},[]);let m=r.useMemo(()=>{if(p)return null;let a=c?`window.__reactRouterContext = ${n};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",i=u?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${f?"":`import ${JSON.stringify(t.url)}`};\n${h.map((e,n)=>{let r=`route${n}`,a=t.routes[e.route.id];Ke(a,`Route ${e.route.id} not found in manifest`);let{clientActionModule:i,clientLoaderModule:l,clientMiddlewareModule:o,hydrateFallbackModule:s,module:u}=a,c=[...i?[{module:i,varName:`${r}_clientAction`}]:[],...l?[{module:l,varName:`${r}_clientLoader`}]:[],...o?[{module:o,varName:`${r}_clientMiddleware`}]:[],...s?[{module:s,varName:`${r}_HydrateFallback`}]:[],{module:u,varName:`${r}_main`}];return 1===c.length?`import * as ${r} from ${JSON.stringify(u)};`:[c.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${r} = {${c.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${f?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:n,...r}=e,a=new Set(t.state.matches.map(e=>e.route.id)),i=t.state.location.pathname.split("/").filter(Boolean),l=["/"];for(i.pop();i.length>0;)l.push(`/${i.join("/")}`),i.pop();l.forEach(e=>{let n=v(t.routes,e,t.basename);n&&n.forEach(e=>a.add(e.route.id))});let o=[...a].reduce((e,t)=>Object.assign(e,{[t]:r.routes[t]}),{});return{...r,routes:o,sri:!!n||void 0}}(t,s),null,2)};`:""}\n  window.__reactRouterRouteModules = {${h.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return r.createElement(r.Fragment,null,r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:a},type:void 0}),r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:i},type:"module",async:!0}))},[]),g=ct||p?[]:(x=t.entry.imports.concat(Je(h,t,{includeHydrateFallback:!0})),[...new Set(x)]);var x;let b="object"===typeof t.sri?t.sri:{};return Te(!p,"The <Scripts /> element is a no-op when using RSC and can be safely removed."),ct||p?null:r.createElement(r.Fragment,null,"object"===typeof t.sri?r.createElement("script",{...e,"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:b})}}):null,f?null:r.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:b[t.url],suppressHydrationWarning:!0}),r.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:b[t.entry.module],suppressHydrationWarning:!0}),g.map(t=>r.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:b[t],suppressHydrationWarning:!0})),m)}function pt(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}r.Component;function ft(e){let{error:t,isOutsideRemixApp:n}=e;console.error(t);let a,i=r.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(W(t))return r.createElement(ht,{title:"Unhandled Thrown Response!"},r.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),i);if(t instanceof Error)a=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);a=new Error(e)}return r.createElement(ht,{title:"Application Error!",isOutsideRemixApp:n},r.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),r.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},a.stack),i)}function ht(e){let{title:t,renderScripts:n,isOutsideRemixApp:a,children:i}=e,{routeModules:l}=at();return l.root?.Layout&&!a?i:r.createElement("html",{lang:"en"},r.createElement("head",null,r.createElement("meta",{charSet:"utf-8"}),r.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),r.createElement("title",null,t)),r.createElement("body",null,r.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},i,n?r.createElement(dt,null):null)))}var mt="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{mt&&(window.__reactRouterVersion="7.13.2")}catch(ss){}function gt(e){let{basename:t,children:n,unstable_useTransitions:a,window:i}=e,l=r.useRef();null==l.current&&(l.current=s({window:i,v5Compat:!0}));let o=l.current,[u,c]=r.useState({action:o.action,location:o.location}),d=r.useCallback(e=>{!1===a?c(e):r.startTransition(()=>c(e))},[a]);return r.useLayoutEffect(()=>o.listen(d),[o,d]),r.createElement(Le,{basename:t,children:n,location:u.location,navigationType:u.action,navigator:o,unstable_useTransitions:a})}var vt=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,xt=r.forwardRef(function(e,t){let{onClick:n,discover:a="render",prefetch:i="none",relative:l,reloadDocument:o,replace:s,unstable_mask:c,state:d,target:p,to:h,preventScrollReset:m,viewTransition:g,unstable_defaultShouldRevalidate:v,...x}=e,{basename:b,navigator:y,unstable_useTransitions:k}=r.useContext(ae),w="string"===typeof h&&vt.test(h),S=q(h,b);h=S.to;let j=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};u(ue(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=r.useContext(ae),{hash:i,pathname:l,search:o}=me(e,{relative:t}),s=l;return"/"!==n&&(s="/"===l?n:I([n,l])),a.createHref({pathname:s,search:o,hash:i})}(h,{relative:l}),$=ce(),E=null;if(c){let e=M(c,[],$.unstable_mask?$.unstable_mask.pathname:"/",!0);"/"!==b&&(e.pathname="/"===e.pathname?b:I([b,e.pathname])),E=y.createHref(e)}let[z,C,N]=function(e,t){let n=r.useContext(rt),[a,i]=r.useState(!1),[l,o]=r.useState(!1),{onFocus:s,onBlur:u,onMouseEnter:c,onMouseLeave:d,onTouchStart:p}=t,f=r.useRef(null);r.useEffect(()=>{if("render"===e&&o(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),r.useEffect(()=>{if(a){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[a]);let h=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?"intent"!==e?[l,f,{}]:[l,f,{onFocus:it(s,h),onBlur:it(u,m),onMouseEnter:it(c,h),onMouseLeave:it(d,m),onTouchStart:it(p,h)}]:[!1,f,{}]}(i,x),_=function(e){let{target:t,replace:n,unstable_mask:a,state:i,preventScrollReset:l,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:u,unstable_useTransitions:c}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},d=fe(),p=ce(),h=me(e,{relative:o});return r.useCallback(m=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(m,t)){m.preventDefault();let t=void 0!==n?n:f(p)===f(h),g=()=>d(e,{replace:t,unstable_mask:a,state:i,preventScrollReset:l,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:u});c?r.startTransition(()=>g()):g()}},[p,d,h,n,a,i,t,e,l,o,s,u,c])}(h,{replace:s,unstable_mask:c,state:d,target:p,preventScrollReset:m,relative:l,viewTransition:g,unstable_defaultShouldRevalidate:v,unstable_useTransitions:k});let P=!(S.isExternal||o),T=r.createElement("a",{...x,...N,href:(P?E:void 0)||S.absoluteURL||j,onClick:P?function(e){n&&n(e),e.defaultPrevented||_(e)}:n,ref:pt(t,C),target:p,"data-discover":w||"render"!==a?void 0:"true"});return z&&!w?r.createElement(r.Fragment,null,T,r.createElement(ot,{page:j})):T});xt.displayName="Link",r.forwardRef(function(e,t){let{"aria-current":n="page",caseSensitive:a=!1,className:i="",end:l=!1,style:o,to:s,viewTransition:c,children:d,...p}=e,f=me(s,{relative:p.relative}),h=ce(),m=r.useContext(J),{navigator:g,basename:v}=r.useContext(ae),x=null!=m&&function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.useContext(te);u(null!=n,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=kt("useViewTransitionState"),i=me(e,{relative:t});if(!n.isTransitioning)return!1;let l=F(n.currentLocation.pathname,a)||n.currentLocation.pathname,o=F(n.nextLocation.pathname,a)||n.nextLocation.pathname;return null!=_(i.pathname,o)||null!=_(i.pathname,l)}(f)&&!0===c,b=g.encodeLocation?g.encodeLocation(f).pathname:f.pathname,y=h.pathname,k=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;a||(y=y.toLowerCase(),k=k?k.toLowerCase():null,b=b.toLowerCase()),k&&v&&(k=F(k,v)||k);const w="/"!==b&&b.endsWith("/")?b.length-1:b.length;let S,j=y===b||!l&&y.startsWith(b)&&"/"===y.charAt(w),$=null!=k&&(k===b||!l&&k.startsWith(b)&&"/"===k.charAt(b.length)),E={isActive:j,isPending:$,isTransitioning:x},z=j?n:void 0;S="function"===typeof i?i(E):[i,j?"active":null,$?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let C="function"===typeof o?o(E):o;return r.createElement(xt,{...p,"aria-current":z,className:S,ref:t,style:C,to:s,viewTransition:c},"function"===typeof d?d(E):d)}).displayName="NavLink";var bt=r.forwardRef((e,t)=>{let{discover:n="render",fetcherKey:a,navigate:i,reloadDocument:l,replace:o,state:s,method:c=Me,action:d,onSubmit:p,relative:h,preventScrollReset:m,viewTransition:g,unstable_defaultShouldRevalidate:v,...x}=e,{unstable_useTransitions:b}=r.useContext(ae),y=jt(),k=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:n}=r.useContext(ae),a=r.useContext(le);u(a,"useFormAction must be used inside a RouteContext");let[i]=a.matches.slice(-1),l={...me(e||".",{relative:t})},o=ce();if(null==e){l.search=o.search;let e=new URLSearchParams(l.search),t=e.getAll("index"),n=t.some(e=>""===e);if(n){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let n=e.toString();l.search=n?`?${n}`:""}}e&&"."!==e||!i.route.index||(l.search=l.search?l.search.replace(/^\?/,"?index&"):"?index");"/"!==n&&(l.pathname="/"===l.pathname?n:I([n,l.pathname]));return f(l)}(d,{relative:h}),w="get"===c.toLowerCase()?"get":"post",S="string"===typeof d&&vt.test(d);return r.createElement("form",{ref:t,method:w,action:k,onSubmit:l?p:e=>{if(p&&p(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,n=t?.getAttribute("formmethod")||c,l=()=>y(t||e.currentTarget,{fetcherKey:a,method:n,navigate:i,replace:o,state:s,relative:h,preventScrollReset:m,viewTransition:g,unstable_defaultShouldRevalidate:v});b&&!1!==i?r.startTransition(()=>l()):l()},...x,"data-discover":S||"render"!==n?void 0:"true"})});function yt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function kt(e){let t=r.useContext(X);return u(t,yt(e)),t}bt.displayName="Form";var wt=0,St=()=>`__${String(++wt)}__`;function jt(){let{router:e}=kt("useSubmit"),{basename:t}=r.useContext(ae),n=ze("useRouteId"),a=e.fetch,i=e.navigate;return r.useCallback(async function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:l,method:o,encType:s,formData:u,body:c}=We(e,t);if(!1===r.navigate){let e=r.fetcherKey||St();await a(e,n,r.action||l,{unstable_defaultShouldRevalidate:r.unstable_defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:u,body:c,formMethod:r.method||o,formEncType:r.encType||s,flushSync:r.flushSync})}else await i(r.action||l,{unstable_defaultShouldRevalidate:r.unstable_defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:u,body:c,formMethod:r.method||o,formEncType:r.encType||s,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[a,i,t,n])}var $t=function(){return $t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},$t.apply(this,arguments)};Object.create;function Et(e,t,n){if(n||2===arguments.length)for(var r,a=0,i=t.length;a<i;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var zt={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Ct="-ms-",Nt="-moz-",_t="-webkit-",Pt="comm",Tt="rule",Ft="decl",At="@keyframes",Rt=Math.abs,Lt=String.fromCharCode,Ot=Object.assign;function Dt(e){return e.trim()}function Mt(e,t){return(e=t.exec(e))?e[0]:e}function It(e,t,n){return e.replace(t,n)}function Bt(e,t,n){return e.indexOf(t,n)}function Ht(e,t){return 0|e.charCodeAt(t)}function Vt(e,t,n){return e.slice(t,n)}function Ut(e){return e.length}function Wt(e){return e.length}function Kt(e,t){return t.push(e),e}function Yt(e,t){return e.filter(function(e){return!Mt(e,t)})}var qt=1,Gt=1,Qt=0,Xt=0,Jt=0,Zt="";function en(e,t,n,r,a,i,l,o){return{value:e,root:t,parent:n,type:r,props:a,children:i,line:qt,column:Gt,length:l,return:"",siblings:o}}function tn(e,t){return Ot(en("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function nn(e){for(;e.root;)e=tn(e.root,{children:[e]});Kt(e,e.siblings)}function rn(){return Jt=Xt>0?Ht(Zt,--Xt):0,Gt--,10===Jt&&(Gt=1,qt--),Jt}function an(){return Jt=Xt<Qt?Ht(Zt,Xt++):0,Gt++,10===Jt&&(Gt=1,qt++),Jt}function ln(){return Ht(Zt,Xt)}function on(){return Xt}function sn(e,t){return Vt(Zt,e,t)}function un(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function cn(e){return qt=Gt=1,Qt=Ut(Zt=e),Xt=0,[]}function dn(e){return Zt="",e}function pn(e){return Dt(sn(Xt-1,mn(91===e?e+2:40===e?e+1:e)))}function fn(e){for(;(Jt=ln())&&Jt<33;)an();return un(e)>2||un(Jt)>3?"":" "}function hn(e,t){for(;--t&&an()&&!(Jt<48||Jt>102||Jt>57&&Jt<65||Jt>70&&Jt<97););return sn(e,on()+(t<6&&32==ln()&&32==an()))}function mn(e){for(;an();)switch(Jt){case e:return Xt;case 34:case 39:34!==e&&39!==e&&mn(Jt);break;case 40:41===e&&mn(e);break;case 92:an()}return Xt}function gn(e,t){for(;an()&&e+Jt!==57&&(e+Jt!==84||47!==ln()););return"/*"+sn(t,Xt-1)+"*"+Lt(47===e?e:an())}function vn(e){for(;!un(ln());)an();return sn(e,Xt)}function xn(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function bn(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case"@namespace":case Ft:return e.return=e.return||e.value;case Pt:return"";case At:return e.return=e.value+"{"+xn(e.children,r)+"}";case Tt:if(!Ut(e.value=e.props.join(",")))return""}return Ut(n=xn(e.children,r))?e.return=e.value+"{"+n+"}":""}function yn(e,t,n){switch(function(e,t){return 45^Ht(e,0)?(((t<<2^Ht(e,0))<<2^Ht(e,1))<<2^Ht(e,2))<<2^Ht(e,3):0}(e,t)){case 5103:return _t+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return _t+e+e;case 4855:return _t+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return Nt+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return _t+e+Nt+e+Ct+e+e;case 5936:switch(Ht(e,t+11)){case 114:return _t+e+Ct+It(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return _t+e+Ct+It(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return _t+e+Ct+It(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return _t+e+Ct+e+e;case 6165:return _t+e+Ct+"flex-"+e+e;case 5187:return _t+e+It(e,/(\w+).+(:[^]+)/,_t+"box-$1$2"+Ct+"flex-$1$2")+e;case 5443:return _t+e+Ct+"flex-item-"+It(e,/flex-|-self/g,"")+(Mt(e,/flex-|baseline/)?"":Ct+"grid-row-"+It(e,/flex-|-self/g,""))+e;case 4675:return _t+e+Ct+"flex-line-pack"+It(e,/align-content|flex-|-self/g,"")+e;case 5548:return _t+e+Ct+It(e,"shrink","negative")+e;case 5292:return _t+e+Ct+It(e,"basis","preferred-size")+e;case 6060:return _t+"box-"+It(e,"-grow","")+_t+e+Ct+It(e,"grow","positive")+e;case 4554:return _t+It(e,/([^-])(transform)/g,"$1"+_t+"$2")+e;case 6187:return It(It(It(e,/(zoom-|grab)/,_t+"$1"),/(image-set)/,_t+"$1"),e,"")+e;case 5495:case 3959:return It(e,/(image-set\([^]*)/,_t+"$1$`$1");case 4968:return It(It(e,/(.+:)(flex-)?(.*)/,_t+"box-pack:$3"+Ct+"flex-pack:$3"),/space-between/,"justify")+_t+e+e;case 4200:if(!Mt(e,/flex-|baseline/))return Ct+"grid-column-align"+Vt(e,t)+e;break;case 2592:case 3360:return Ct+It(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Mt(e.props,/grid-\w+-end/)})?~Bt(e+(n=n[t].value),"span",0)?e:Ct+It(e,"-start","")+e+Ct+"grid-row-span:"+(~Bt(n,"span",0)?Mt(n,/\d+/):+Mt(n,/\d+/)-+Mt(e,/\d+/))+";":Ct+It(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return Mt(e.props,/grid-\w+-start/)})?e:Ct+It(It(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return It(e,/(.+)-inline(.+)/,_t+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Ut(e)-1-t>6)switch(Ht(e,t+1)){case 109:if(45!==Ht(e,t+4))break;case 102:return It(e,/(.+:)(.+)-([^]+)/,"$1"+_t+"$2-$3$1"+Nt+(108==Ht(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Bt(e,"stretch",0)?yn(It(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return It(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,a,i,l,o){return Ct+n+":"+r+o+(a?Ct+n+"-span:"+(i?l:+l-+r)+o:"")+e});case 4949:if(121===Ht(e,t+6))return It(e,":",":"+_t)+e;break;case 6444:switch(Ht(e,45===Ht(e,14)?18:11)){case 120:return It(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+_t+(45===Ht(e,14)?"inline-":"")+"box$3$1"+_t+"$2$3$1"+Ct+"$2box$3")+e;case 100:return It(e,":",":"+Ct)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return It(e,"scroll-","scroll-snap-")+e}return e}function kn(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Ft:return void(e.return=yn(e.value,e.length,n));case At:return xn([tn(e,{value:It(e.value,"@","@"+_t)})],r);case Tt:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(Mt(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":nn(tn(e,{props:[It(t,/:(read-\w+)/,":-moz-$1")]})),nn(tn(e,{props:[t]})),Ot(e,{props:Yt(n,r)});break;case"::placeholder":nn(tn(e,{props:[It(t,/:(plac\w+)/,":"+_t+"input-$1")]})),nn(tn(e,{props:[It(t,/:(plac\w+)/,":-moz-$1")]})),nn(tn(e,{props:[It(t,/:(plac\w+)/,Ct+"input-$1")]})),nn(tn(e,{props:[t]})),Ot(e,{props:Yt(n,r)})}return""})}}function wn(e){return dn(Sn("",null,null,null,[""],e=cn(e),0,[0],e))}function Sn(e,t,n,r,a,i,l,o,s){for(var u=0,c=0,d=l,p=0,f=0,h=0,m=1,g=1,v=1,x=0,b="",y=a,k=i,w=r,S=b;g;)switch(h=x,x=an()){case 40:if(108!=h&&58==Ht(S,d-1)){-1!=Bt(S+=It(pn(x),"&","&\f"),"&\f",Rt(u?o[u-1]:0))&&(v=-1);break}case 34:case 39:case 91:S+=pn(x);break;case 9:case 10:case 13:case 32:S+=fn(h);break;case 92:S+=hn(on()-1,7);continue;case 47:switch(ln()){case 42:case 47:Kt($n(gn(an(),on()),t,n,s),s),5!=un(h||1)&&5!=un(ln()||1)||!Ut(S)||" "===Vt(S,-1,void 0)||(S+=" ");break;default:S+="/"}break;case 123*m:o[u++]=Ut(S)*v;case 125*m:case 59:case 0:switch(x){case 0:case 125:g=0;case 59+c:-1==v&&(S=It(S,/\f/g,"")),f>0&&(Ut(S)-d||0===m&&47===h)&&Kt(f>32?En(S+";",r,n,d-1,s):En(It(S," ","")+";",r,n,d-2,s),s);break;case 59:S+=";";default:if(Kt(w=jn(S,t,n,u,c,a,o,b,y=[],k=[],d,i),i),123===x)if(0===c)Sn(S,t,w,w,y,i,d,o,k);else{switch(p){case 99:if(110===Ht(S,3))break;case 108:if(97===Ht(S,2))break;default:c=0;case 100:case 109:case 115:}c?Sn(e,w,w,r&&Kt(jn(e,w,w,0,0,a,o,b,a,y=[],d,k),k),a,k,d,o,r?y:k):Sn(S,w,w,w,[""],k,0,o,k)}}u=c=f=0,m=v=1,b=S="",d=l;break;case 58:d=1+Ut(S),f=h;default:if(m<1)if(123==x)--m;else if(125==x&&0==m++&&125==rn())continue;switch(S+=Lt(x),x*m){case 38:v=c>0?1:(S+="\f",-1);break;case 44:o[u++]=(Ut(S)-1)*v,v=1;break;case 64:45===ln()&&(S+=pn(an())),p=ln(),c=d=Ut(b=S+=vn(on())),x++;break;case 45:45===h&&2==Ut(S)&&(m=0)}}return i}function jn(e,t,n,r,a,i,l,o,s,u,c,d){for(var p=a-1,f=0===a?i:[""],h=Wt(f),m=0,g=0,v=0;m<r;++m)for(var x=0,b=Vt(e,p+1,p=Rt(g=l[m])),y=e;x<h;++x)(y=Dt(g>0?f[x]+" "+b:It(b,/&\f/g,f[x])))&&(s[v++]=y);return en(e,t,n,0===a?Tt:o,s,u,c,d)}function $n(e,t,n,r){return en(e,t,n,Pt,Lt(Jt),Vt(e,2,-2),0,r)}function En(e,t,n,r,a){return en(e,t,n,Ft,Vt(e,0,r),Vt(e,r+1,-1),r,a)}var zn="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",Cn="active",Nn="data-styled-version",_n="6.3.12",Pn="/*!sc*/\n",Tn="undefined"!=typeof window&&"undefined"!=typeof document,Fn=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),An={};function Rn(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Ln=new Map,On=new Map,Dn=1,Mn=function(e){if(Ln.has(e))return Ln.get(e);for(;On.has(Dn);)Dn++;var t=Dn++;return Ln.set(e,t),On.set(t,e),t},In=function(e,t){Dn=t+1,Ln.set(e,t),On.set(t,e)},Bn=(new Set,Object.freeze([])),Hn=Object.freeze({});function Vn(e,t,n){return void 0===n&&(n=Hn),e.theme!==n.theme&&e.theme||t||n.theme}var Un=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),Wn=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Kn=/(^-|-$)/g;function Yn(e){return e.replace(Wn,"-").replace(Kn,"")}var qn=/(a)(d)/gi,Gn=function(e){return String.fromCharCode(e+(e>25?39:97))};function Qn(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Gn(t%52)+n;return(Gn(t%52)+n).replace(qn,"$1-$2")}var Xn,Jn=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Zn=function(e){return Jn(5381,e)};function er(e){return Qn(Zn(e)>>>0)}function tr(e){return e.displayName||e.name||"Component"}function nr(e){return"string"==typeof e&&!0}var rr="function"==typeof Symbol&&Symbol.for,ar=rr?Symbol.for("react.memo"):60115,ir=rr?Symbol.for("react.forward_ref"):60112,lr={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},or={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},sr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ur=((Xn={})[ir]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Xn[ar]=sr,Xn);function cr(e){return("type"in(t=e)&&t.type.$$typeof)===ar?sr:"$$typeof"in e?ur[e.$$typeof]:lr;var t}var dr=Object.defineProperty,pr=Object.getOwnPropertyNames,fr=Object.getOwnPropertySymbols,hr=Object.getOwnPropertyDescriptor,mr=Object.getPrototypeOf,gr=Object.prototype;function vr(e,t,n){if("string"!=typeof t){if(gr){var r=mr(t);r&&r!==gr&&vr(e,r,n)}var a=pr(t);fr&&(a=a.concat(fr(t)));for(var i=cr(e),l=cr(t),o=0;o<a.length;++o){var s=a[o];if(!(s in or||n&&n[s]||l&&s in l||i&&s in i)){var u=hr(t,s);try{dr(e,s,u)}catch(e){}}}}return e}function xr(e){return"function"==typeof e}function br(e){return"object"==typeof e&&"styledComponentId"in e}function yr(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function kr(e,t){return e.join(t||"")}function wr(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Sr(e,t,n){if(void 0===n&&(n=!1),!n&&!wr(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Sr(e[r],t[r]);else if(wr(t))for(var r in t)e[r]=Sr(e[r],t[r]);return e}function jr(e,t){Object.defineProperty(e,"toString",{value:t})}var $r=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,a=r;e>=a;)if((a<<=1)<0)throw Rn(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var i=r;i<a;i++)this.groupSizes[i]=0}for(var l=this.indexOfGroup(e+1),o=0,s=(i=0,t.length);i<s;i++)this.tag.insertRule(l,t[i])&&(this.groupSizes[e]++,l++,o++);o>0&&this._cGroup>e&&(this._cIndex+=o)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var a=n;a<r;a++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),a=r+n,i=r;i<a;i++)t+=this.tag.getRule(i)+Pn;return t},e}(),Er="style[".concat(zn,"][").concat(Nn,'="').concat(_n,'"]'),zr=new RegExp("^".concat(zn,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Cr=function(e){return"undefined"!=typeof ShadowRoot&&e instanceof ShadowRoot||"host"in e&&11===e.nodeType},Nr=function(e){if(!e)return document;if(Cr(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(Cr(t))return t}return document},_r=function(e,t,n){for(var r,a=n.split(","),i=0,l=a.length;i<l;i++)(r=a[i])&&e.registerName(t,r)},Pr=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(Pn),a=[],i=0,l=r.length;i<l;i++){var o=r[i].trim();if(o){var s=o.match(zr);if(s){var u=0|parseInt(s[1],10),c=s[2];0!==u&&(In(c,u),_r(e,c,s[3]),e.getTag().insertRules(u,a)),a.length=0}else a.push(o)}}},Tr=function(e){for(var t=Nr(e.options.target).querySelectorAll(Er),n=0,r=t.length;n<r;n++){var a=t[n];a&&a.getAttribute(zn)!==Cn&&(Pr(e,a),a.parentNode&&a.parentNode.removeChild(a))}};function Fr(){return n.nc}var Ar=function(e){var t=document.head,n=e||t,r=document.createElement("style"),a=function(e){var t=Array.from(e.querySelectorAll("style[".concat(zn,"]")));return t[t.length-1]}(n),i=void 0!==a?a.nextSibling:null;r.setAttribute(zn,Cn),r.setAttribute(Nn,_n);var l=Fr();return l&&r.setAttribute("nonce",l),n.insertBefore(r,i),r},Rr=function(){function e(e){this.element=Ar(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){var t;if(e.sheet)return e.sheet;for(var n=null!==(t=e.getRootNode().styleSheets)&&void 0!==t?t:document.styleSheets,r=0,a=n.length;r<a;r++){var i=n[r];if(i.ownerNode===e)return i}throw Rn(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Lr=function(){function e(e){this.element=Ar(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Or=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Dr=Tn,Mr={isServer:!Tn,useCSSOMInjection:!Fn},Ir=function(){function e(e,t,n){void 0===e&&(e=Hn),void 0===t&&(t={});var r=this;this.options=$t($t({},Mr),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Tn&&Dr&&(Dr=!1,Tr(this)),jr(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",a=function(n){var a=function(e){return On.get(e)}(n);if(void 0===a)return"continue";var i=e.names.get(a);if(void 0===i||!i.size)return"continue";var l=t.getGroup(n);if(0===l.length)return"continue";var o=zn+".g"+n+'[id="'+a+'"]',s="";i.forEach(function(e){e.length>0&&(s+=e+",")}),r+=l+o+'{content:"'+s+'"}'+Pn},i=0;i<n;i++)a(i);return r}(r)})}return e.registerId=function(e){return Mn(e)},e.prototype.rehydrate=function(){!this.server&&Tn&&Tr(this)},e.prototype.reconstructWithOptions=function(t,n){void 0===n&&(n=!0);var r=new e($t($t({},this.options),t),this.gs,n&&this.names||void 0);return!this.server&&Tn&&t.target!==this.options.target&&Nr(this.options.target)!==Nr(t.target)&&Tr(r),r},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Or(n):t?new Rr(n):new Lr(n)}(this.options),new $r(e)));var e},e.prototype.hasNameForId=function(e,t){var n,r;return null!==(r=null===(n=this.names.get(e))||void 0===n?void 0:n.has(t))&&void 0!==r&&r},e.prototype.registerName=function(e,t){Mn(e);var n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Mn(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Mn(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function Br(e,t){return null==t||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||e in zt||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Hr=function(e){return e>="A"&&e<="Z"};function Vr(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;Hr(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Ur=Symbol.for("sc-keyframes");var Wr=function(e){return null==e||!1===e||""===e},Kr=function(e){var t=[];for(var n in e){var r=e[n];e.hasOwnProperty(n)&&!Wr(r)&&(Array.isArray(r)&&r.isCss||xr(r)?t.push("".concat(Vr(n),":"),r,";"):wr(r)?t.push.apply(t,Et(Et(["".concat(n," {")],Kr(r),!1),["}"],!1)):t.push("".concat(Vr(n),": ").concat(Br(n,r),";")))}return t};function Yr(e,t,n,r,a){if(void 0===a&&(a=[]),"string"==typeof e)return e&&a.push(e),a;if(Wr(e))return a;if(br(e))return a.push(".".concat(e.styledComponentId)),a;var i;if(xr(e))return!xr(i=e)||i.prototype&&i.prototype.isReactComponent||!t?(a.push(e),a):Yr(e(t),t,n,r,a);if(function(e){return"object"==typeof e&&null!==e&&Ur in e}(e))return n?(e.inject(n,r),a.push(e.getName(r))):a.push(e),a;if(wr(e)){for(var l=Kr(e),o=0;o<l.length;o++)a.push(l[o]);return a}if(!Array.isArray(e))return a.push(e.toString()),a;for(o=0;o<e.length;o++)Yr(e[o],t,n,r,a);return a}function qr(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(xr(n)&&!br(n))return!1}return!0}var Gr=Zn(_n),Qr=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&qr(e),this.componentId=t,this.baseHash=Jn(Gr,t),this.baseStyle=n,Ir.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n).className:"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=yr(r,this.staticRulesId);else{var a=kr(Yr(this.rules,e,t,n)),i=Qn(Jn(this.baseHash,a)>>>0);if(!t.hasNameForId(this.componentId,i)){var l=n(a,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,l)}r=yr(r,i),this.staticRulesId=i}else{for(var o=Jn(this.baseHash,n.hash),s="",u=0;u<this.rules.length;u++){var c=this.rules[u];if("string"==typeof c)s+=c;else if(c){var d=kr(Yr(c,e,t,n));o=Jn(Jn(o,String(u)),d),s+=d}}if(s){var p=Qn(o>>>0);if(!t.hasNameForId(this.componentId,p)){var f=n(s,".".concat(p),void 0,this.componentId);t.insertRules(this.componentId,p,f)}r=yr(r,p)}}return{className:r,css:"undefined"==typeof window?t.getTag().getGroup(Mn(this.componentId)):""}},e}(),Xr=/&/g,Jr=47,Zr=42;function ea(e){if(-1===e.indexOf("}"))return!1;for(var t=e.length,n=0,r=0,a=!1,i=0;i<t;i++){var l=e.charCodeAt(i);if(0!==r||a||l!==Jr||e.charCodeAt(i+1)!==Zr)if(a)l===Zr&&e.charCodeAt(i+1)===Jr&&(a=!1,i++);else if(34!==l&&39!==l||0!==i&&92===e.charCodeAt(i-1)){if(0===r)if(123===l)n++;else if(125===l&&--n<0)return!0}else 0===r?r=l:r===l&&(r=0);else a=!0,i++}return 0!==n||0!==r}function ta(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=ta(e.children,t)),e})}function na(e){var t,n,r,a=void 0===e?Hn:e,i=a.options,l=void 0===i?Hn:i,o=a.plugins,s=void 0===o?Bn:o,u=function(e,r,a){return a.startsWith(n)&&a.endsWith(n)&&a.replaceAll(n,"").length>0?".".concat(t):e},c=s.slice();c.push(function(e){e.type===Tt&&e.value.includes("&")&&(r||(r=new RegExp("\\".concat(n,"\\b"),"g")),e.props[0]=e.props[0].replace(Xr,n).replace(r,u))}),l.prefix&&c.push(kn),c.push(bn);var d,p=[],f=function(e){var t=Wt(e);return function(n,r,a,i){for(var l="",o=0;o<t;o++)l+=e[o](n,r,a,i)||"";return l}}(c.concat((d=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&d(e)}))),h=function(e,a,i,o){void 0===a&&(a=""),void 0===i&&(i=""),void 0===o&&(o="&"),t=o,n=a,r=void 0;var s=function(e){if(!ea(e))return e;for(var t=e.length,n="",r=0,a=0,i=0,l=!1,o=0;o<t;o++){var s=e.charCodeAt(o);if(0!==i||l||s!==Jr||e.charCodeAt(o+1)!==Zr)if(l)s===Zr&&e.charCodeAt(o+1)===Jr&&(l=!1,o++);else if(34!==s&&39!==s||0!==o&&92===e.charCodeAt(o-1)){if(0===i)if(123===s)a++;else if(125===s){if(--a<0){for(var u=o+1;u<t;){var c=e.charCodeAt(u);if(59===c||10===c)break;u++}u<t&&59===e.charCodeAt(u)&&u++,a=0,o=u-1,r=u;continue}0===a&&(n+=e.substring(r,o+1),r=o+1)}else 59===s&&0===a&&(n+=e.substring(r,o+1),r=o+1)}else 0===i?i=s:i===s&&(i=0);else l=!0,o++}if(r<t){var d=e.substring(r);ea(d)||(n+=d)}return n}(function(e){if(-1===e.indexOf("//"))return e;for(var t=e.length,n=[],r=0,a=0,i=0,l=0;a<t;){var o=e.charCodeAt(a);if(34!==o&&39!==o||0!==a&&92===e.charCodeAt(a-1))if(0===i)if(o===Jr&&a+1<t&&e.charCodeAt(a+1)===Zr){for(a+=2;a+1<t&&(e.charCodeAt(a)!==Zr||e.charCodeAt(a+1)!==Jr);)a++;a+=2}else if(40===o&&a>=3&&108==(32|e.charCodeAt(a-1))&&114==(32|e.charCodeAt(a-2))&&117==(32|e.charCodeAt(a-3)))l=1,a++;else if(l>0)41===o?l--:40===o&&l++,a++;else if(o===Zr&&a+1<t&&e.charCodeAt(a+1)===Jr)a>r&&n.push(e.substring(r,a)),r=a+=2;else if(o===Jr&&a+1<t&&e.charCodeAt(a+1)===Jr){for(a>r&&n.push(e.substring(r,a));a<t&&10!==e.charCodeAt(a);)a++;r=a}else a++;else a++;else 0===i?i=o:i===o&&(i=0),a++}return 0===r?e:(r<t&&n.push(e.substring(r)),n.join(""))}(e)),u=wn(i||a?"".concat(i," ").concat(a," { ").concat(s," }"):s);return l.namespace&&(u=ta(u,l.namespace)),p=[],xn(u,f),p};return h.hash=s.length?s.reduce(function(e,t){return t.name||Rn(15),Jn(e,t.name)},5381).toString():"",h}var ra=new Ir,aa=na(),ia=r.createContext({shouldForwardProp:void 0,styleSheet:ra,stylis:aa}),la=(ia.Consumer,r.createContext(void 0));function oa(){return r.useContext(ia)}function sa(e){if(!r.useMemo)return e.children;var t=oa().styleSheet,n=r.useMemo(function(){var n=t;return e.sheet?n=e.sheet:e.target&&(n=n.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(n=n.reconstructWithOptions({useCSSOMInjection:!1})),n},[e.disableCSSOMInjection,e.sheet,e.target,t]),a=r.useMemo(function(){return na({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),i=r.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:n,stylis:a}},[e.shouldForwardProp,n,a]);return r.createElement(ia.Provider,{value:i},r.createElement(la.Provider,{value:a},e.children))}var ua=r.createContext(void 0);ua.Consumer;function ca(e){var t=r.useContext(ua),n=r.useMemo(function(){return function(e,t){if(!e)throw Rn(14);if(xr(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw Rn(8);return t?$t($t({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?r.createElement(ua.Provider,{value:n},e.children):null}var da={};new Set;function pa(e,t,n){var a=br(e),i=e,l=!nr(e),o=t.attrs,s=void 0===o?Bn:o,u=t.componentId,c=void 0===u?function(e,t){var n="string"!=typeof e?"sc":Yn(e);da[n]=(da[n]||0)+1;var r="".concat(n,"-").concat(er(_n+n+da[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):u,d=t.displayName,p=void 0===d?function(e){return nr(e)?"styled.".concat(e):"Styled(".concat(tr(e),")")}(e):d,f=t.displayName&&t.componentId?"".concat(Yn(t.displayName),"-").concat(t.componentId):t.componentId||c,h=a&&i.attrs?i.attrs.concat(s).filter(Boolean):s,m=t.shouldForwardProp;if(a&&i.shouldForwardProp){var g=i.shouldForwardProp;if(t.shouldForwardProp){var v=t.shouldForwardProp;m=function(e,t){return g(e,t)&&v(e,t)}}else m=g}var x=new Qr(n,f,a?i.componentStyle:void 0);function b(e,t){return function(e,t,n){var a=e.attrs,i=e.componentStyle,l=e.defaultProps,o=e.foldedComponentIds,s=e.styledComponentId,u=e.target,c=r.useContext(ua),d=oa(),p=e.shouldForwardProp||d.shouldForwardProp,f=Vn(t,c,l)||Hn,h=function(e,t,n){for(var r,a=$t($t({},t),{className:void 0,theme:n}),i=0;i<e.length;i+=1){var l=xr(r=e[i])?r(a):r;for(var o in l)"className"===o?a.className=yr(a.className,l[o]):"style"===o?a.style=$t($t({},a.style),l[o]):o in t&&void 0===t[o]||(a[o]=l[o])}return"className"in t&&"string"==typeof t.className&&(a.className=yr(a.className,t.className)),a}(a,t,f),m=h.as||u,g={};for(var v in h)void 0===h[v]||"$"===v[0]||"as"===v||"theme"===v&&h.theme===f||("forwardedAs"===v?g.as=h.forwardedAs:p&&!p(v,m)||(g[v]=h[v]));var x=function(e,t){var n=oa();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(i,h),b=x.className,y=yr(o,s);return b&&(y+=" "+b),h.className&&(y+=" "+h.className),g[nr(m)&&!Un.has(m)?"class":"className"]=y,n&&(g.ref=n),(0,r.createElement)(m,g)}(y,e,t)}b.displayName=p;var y=r.forwardRef(b);return y.attrs=h,y.componentStyle=x,y.displayName=p,y.shouldForwardProp=m,y.foldedComponentIds=a?yr(i.foldedComponentIds,i.styledComponentId):"",y.styledComponentId=f,y.target=a?i.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,a=t;r<a.length;r++)Sr(e,a[r],!0);return e}({},i.defaultProps,e):e}}),jr(y,function(){return".".concat(y.styledComponentId)}),l&&vr(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function fa(e,t){for(var n=[e[0]],r=0,a=t.length;r<a;r+=1)n.push(t[r],e[r+1]);return n}var ha=function(e){return Object.assign(e,{isCss:!0})};function ma(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(xr(e)||wr(e))return ha(Yr(fa(Bn,Et([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?Yr(r):ha(Yr(fa(r,t)))}function ga(e,t,n){if(void 0===n&&(n=Hn),!t)throw Rn(1,t);var r=function(r){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,ma.apply(void 0,Et([r],a,!1)))};return r.attrs=function(r){return ga(e,t,$t($t({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return ga(e,t,$t($t({},n),r))},r}var va=function(e){return ga(pa,e)},xa=va;Un.forEach(function(e){xa[e]=va(e)});var ba,ya=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=qr(e),Ir.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var a=r(kr(Yr(this.rules,t,n,r)),""),i=this.componentId+e;n.insertRules(i,i,a)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&Ir.registerId(this.componentId+e);var a=this.componentId+e;this.isStatic?n.hasNameForId(a,a)||this.createStyles(e,t,n,r):(this.removeStyles(e,n),this.createStyles(e,t,n,r))},e}();var ka=function(){function e(e,t){var n=this;this[ba]=!0,this.inject=function(e,t){void 0===t&&(t=aa);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,jr(this,function(){throw Rn(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=aa),this.name+e.hash},e}();function wa(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=kr(ma.apply(void 0,Et([e],t,!1))),a=er(r);return new ka(a,r)}ba=Ur;(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=Fr(),r=kr([n&&'nonce="'.concat(n,'"'),"".concat(zn,'="true"'),"".concat(Nn,'="').concat(_n,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Rn(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Rn(2);var n=e.instance.toString();if(!n)return[];var a=((t={})[zn]="",t[Nn]=_n,t.dangerouslySetInnerHTML={__html:n},t),i=Fr();return i&&(a.nonce=i),[r.createElement("style",$t({},a,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Ir({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Rn(2);return r.createElement(sa,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Rn(3)}})(),"__sc-".concat(zn,"__");const Sa={color:{bg:"#F1F6F3",surface:"#FFFFFF",surfaceAlt:"#E5EFEA",surfaceSunken:"#D8E6E0",ink:"#0E1A17",inkSoft:"#1F2E2A",muted:"#3F4B47",mutedSoft:"#5C6E68",border:"#D5E2DC",borderStrong:"#BACBC2",brand:"#1B7A6E",brandLight:"#4FBFB3",brandSoft:"#DCEEEA",brandInk:"#0E4F47",brandGradient:"linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)",brandGradientHover:"linear-gradient(135deg, #4FC9BD 0%, #155F58 100%)",accent:"#4FBFB3",accentSoft:"#E0F1ED",success:"#1B7A6E",successSoft:"#DCEEEA",danger:"#9F3B22",dangerSoft:"#F4DAD0",warning:"#A8761A",warningSoft:"#F3E5C7"},font:{display:"'Playfair Display', Georgia, 'Times New Roman', serif",sans:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",mono:"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"},size:{radius:{sm:"6px",md:"12px",lg:"20px",xl:"28px",pill:"999px"},space:{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px",9:"96px",10:"128px"},container:"1180px",containerNarrow:"960px"},shadow:{xs:"0 1px 2px rgba(14, 26, 23, 0.04)",sm:"0 2px 8px rgba(14, 26, 23, 0.06)",md:"0 8px 24px rgba(14, 26, 23, 0.08)",lg:"0 24px 60px rgba(14, 26, 23, 0.12)",brand:"0 12px 32px rgba(27, 122, 110, 0.28)",inset:"inset 0 1px 0 rgba(255, 255, 255, 0.6)"},motion:{fast:"160ms cubic-bezier(0.2, 0, 0, 1)",base:"240ms cubic-bezier(0.2, 0, 0, 1)",slow:"420ms cubic-bezier(0.2, 0, 0, 1)",spring:"520ms cubic-bezier(0.34, 1.56, 0.64, 1)"},z:{base:1,nav:50,overlay:80,modal:100}},ja=(function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var a=ma.apply(void 0,Et([e],t,!1)),i="sc-global-".concat(er(JSON.stringify(a))),l=new ya(a,i),o=new WeakMap,s=function(e){var t=oa(),n=r.useContext(ua),a=o.get(t.styleSheet);return void 0===a&&(a=t.styleSheet.allocateGSInstance(i),o.set(t.styleSheet,a)),r.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,n,r,a){if(l.isStatic)l.renderStyles(e,An,n,a);else{var i=$t($t({},t),{theme:Vn(t,r,s.defaultProps)});l.renderStyles(e,i,n,a)}}(a,e,t.styleSheet,n,t.stylis),function(){l.removeStyles(a,t.styleSheet)}},[a,e,t.styleSheet,n,t.stylis]),null};return r.memo(s)})`
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
`;var $a=n(579);const Ea=xa.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: ${e=>{let{theme:t}=e;return t.font.display}};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.025em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
`,za=xa.svg`
  width: ${e=>{let{$size:t}=e;return t||30}}px;
  height: ${e=>{let{$size:t}=e;return t||30}}px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(14, 26, 23, 0.10));
`,Ca=xa.span`
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  line-height: 1;
`,Na=xa.em`
  font-style: italic;
  font-weight: 400;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,_a=e=>{let{showName:t=!0,showSuffix:n=!0,size:r}=e;return(0,$a.jsxs)(Ea,{children:[(0,$a.jsxs)(za,{$size:r,viewBox:"0 0 40 40",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[(0,$a.jsx)("defs",{children:(0,$a.jsxs)("linearGradient",{id:"arvoMarkGradient",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,$a.jsx)("stop",{offset:"0%",stopColor:"#5DD6CA"}),(0,$a.jsx)("stop",{offset:"100%",stopColor:"#1B6E66"})]})}),(0,$a.jsx)("path",{fill:"url(#arvoMarkGradient)",fillRule:"evenodd",d:"M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"})]}),t&&(0,$a.jsxs)(Ca,{children:["Arvo ",n&&(0,$a.jsx)(Na,{children:"Flow"})]})]})},Pa={primary:ma`
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
  `,gradient:ma`
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
  `},Fa=xa.button`
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
`,Aa=Fa,Ra=xa.header`
  position: sticky;
  top: 0;
  z-index: ${e=>{let{theme:t}=e;return t.z.nav}};
  background: rgba(250, 250, 247, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,La=xa.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`,Oa=xa.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 740px) { display: none; }
`,Da=xa(xt)`
  padding: 8px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  font-size: 14px;
  color: ${e=>{let{theme:t,$active:n}=e;return n?t.color.ink:t.color.muted}};
  font-weight: ${e=>{let{$active:t}=e;return t?600:500}};
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}}, color ${e=>{let{theme:t}=e;return t.motion.fast}};
  background: ${e=>{let{theme:t,$active:n}=e;return n?t.color.surfaceAlt:"transparent"}};
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
`,Ma=xa.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ia=e=>{let{variant:t="public"}=e;const{pathname:n}=ce();return(0,$a.jsx)(Ra,{children:(0,$a.jsxs)(La,{children:[(0,$a.jsx)(xt,{to:"/",children:(0,$a.jsx)(_a,{})}),"public"===t&&(0,$a.jsxs)(Oa,{children:[(0,$a.jsx)(Da,{to:"/",$active:"/"===n,children:"Hem"}),(0,$a.jsx)(Da,{to:"/#hur",$active:!1,children:"S\xe5 fungerar det"}),(0,$a.jsx)(Da,{to:"/#priser",$active:!1,children:"Pris"}),(0,$a.jsx)(Da,{to:"/#faq",$active:!1,children:"FAQ"})]}),"app"===t&&(0,$a.jsxs)(Oa,{children:[(0,$a.jsx)(Da,{to:"/insights",$active:"/insights"===n,children:"Insikter"}),(0,$a.jsx)(Da,{to:"/insights",$active:!1,children:"Historik"}),(0,$a.jsx)(Da,{to:"/insights",$active:!1,children:"Inst\xe4llningar"})]}),(0,$a.jsx)(Ma,{children:"public"===t?(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)(Aa,{as:xt,to:"/connect",$variant:"ghost",$size:"sm",children:"Logga in"}),(0,$a.jsx)(Aa,{as:xt,to:"/connect",$variant:"gradient",$size:"sm",children:"Se mina besparingar \u2192"})]}):(0,$a.jsx)(Aa,{as:xt,to:"/",$variant:"ghost",$size:"sm",children:"Logga ut"})})]})})},Ba=xa.footer`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  padding: 64px 28px 48px;
`,Ha=xa.div`
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
`,Va=xa.div`
  p {
    margin-top: 14px;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    max-width: 320px;
  }
`,Ua=xa.div`
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
`,Wa=xa.div`
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
`,Ka=xa.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 24px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  @media (max-width: 520px) { flex-direction: column; gap: 10px; }
`,Ya=()=>(0,$a.jsxs)(Ba,{children:[(0,$a.jsxs)(Ha,{children:[(0,$a.jsxs)(Va,{children:[(0,$a.jsx)(_a,{}),(0,$a.jsx)("p",{children:"Vi s\xe4nker svenska sm\xe5f\xf6retags leverant\xf6rskostnader. Inga fasta avgifter \u2014 vi tj\xe4nar pengar bara n\xe4r du g\xf6r det."})]}),(0,$a.jsxs)(Ua,{children:[(0,$a.jsx)("h4",{children:"Produkt"}),(0,$a.jsxs)("ul",{children:[(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#hur",children:"S\xe5 fungerar det"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#priser",children:"Pris"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#integrationer",children:"Integrationer"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#sakerhet",children:"S\xe4kerhet"})})]})]}),(0,$a.jsxs)(Ua,{children:[(0,$a.jsx)("h4",{children:"F\xf6retag"}),(0,$a.jsxs)("ul",{children:[(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#om",children:"Om oss"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#partners",children:"Partners"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#kontakt",children:"Kontakt"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#blog",children:"Blog"})})]})]}),(0,$a.jsxs)(Ua,{children:[(0,$a.jsx)("h4",{children:"Juridik"}),(0,$a.jsxs)("ul",{children:[(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#villkor",children:"Villkor"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#integritet",children:"Integritet (GDPR)"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)("a",{href:"#cookies",children:"Cookies"})}),(0,$a.jsx)("li",{children:(0,$a.jsx)(xt,{to:"/bias",children:"Rankningspolicy"})})]})]})]}),(0,$a.jsxs)(Wa,{children:[(0,$a.jsxs)("span",{children:[(0,$a.jsx)("div",{className:"dot"})," Ansvars- och cyberf\xf6rs\xe4krade via ",(0,$a.jsx)("strong",{children:"Hiscox"})]}),(0,$a.jsxs)("span",{children:[(0,$a.jsx)("div",{className:"dot"})," GDPR-s\xe4krad infrastruktur i ",(0,$a.jsx)("strong",{children:"Sverige"})]}),(0,$a.jsxs)("span",{children:[(0,$a.jsx)("div",{className:"dot"})," Krypterad data ",(0,$a.jsx)("strong",{children:"AES-256"})]})]}),(0,$a.jsxs)(Ka,{children:[(0,$a.jsx)("span",{children:"\xa9 2026 Arvo Flow AB \xb7 Org.nr 559500-0000"}),(0,$a.jsx)("span",{children:"Stockholm \xb7 Made with care in Sweden"})]})]}),qa={shield:(0,$a.jsx)("path",{d:"M12 2.5l8 3v6.5c0 4.6-3.3 8.7-8 9.5-4.7-.8-8-4.9-8-9.5V5.5l8-3z"}),bolt:(0,$a.jsx)("path",{d:"M13 2L4 14h7l-1 8 9-12h-7l1-8z"}),phone:(0,$a.jsx)("path",{d:"M5 3h4l2 5-3 2c1.4 2.8 3.7 5.1 6.5 6.5l2-3 5 2v4c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2z"}),wifi:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("path",{d:"M2 8.8a14 14 0 0120 0"}),(0,$a.jsx)("path",{d:"M5 12.6a9 9 0 0114 0"}),(0,$a.jsx)("path",{d:"M8.5 16.4a4 4 0 017 0"}),(0,$a.jsx)("circle",{cx:"12",cy:"20",r:"1"})]}),card:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),(0,$a.jsx)("path",{d:"M2 10h20"})]}),file:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$a.jsx)("path",{d:"M14 2v6h6"})]}),briefcase:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2"}),(0,$a.jsx)("path",{d:"M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"})]}),truck:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("path",{d:"M1 3h15v13H1z"}),(0,$a.jsx)("path",{d:"M16 8h4l3 3v5h-7z"}),(0,$a.jsx)("circle",{cx:"6",cy:"18.5",r:"2"}),(0,$a.jsx)("circle",{cx:"18",cy:"18.5",r:"2"})]}),arrow:(0,$a.jsx)("path",{d:"M5 12h14M13 6l6 6-6 6"}),check:(0,$a.jsx)("path",{d:"M5 12l5 5L20 7"}),spark:(0,$a.jsx)("path",{d:"M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"}),lock:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("rect",{x:"4",y:"11",width:"16",height:"11",rx:"2"}),(0,$a.jsx)("path",{d:"M8 11V7a4 4 0 018 0v4"})]}),fortnox:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"}),(0,$a.jsx)("path",{d:"M8 8h8M8 12h8M8 16h5"})]}),bankid:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("path",{d:"M5 3h14v18H5z"}),(0,$a.jsx)("path",{d:"M9 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2"})]}),trend:(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("path",{d:"M3 17l6-6 4 4 8-8"}),(0,$a.jsx)("path",{d:"M14 7h7v7"})]})},Ga=e=>{let{name:t,size:n=20,stroke:r=1.6,color:a="currentColor",fill:i="none",...l}=e;const o=qa[t];return o?(0,$a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 24 24",fill:i,stroke:a,strokeWidth:r,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...l,children:o}):null},Qa="Lindberg VVS AB",Xa="556789-1234",Ja=412,Za=38,ei=[{id:"insurance-foretag",category:"F\xf6retagsf\xf6rs\xe4kring",icon:"shield",licensePending:!0,currentSupplier:"Trygg-Hansa",currentAnnualCost:84600,suggestedSupplier:"If Skadef\xf6rs\xe4kring",suggestedAnnualCost:52400,savingPerYear:32200,overpaymentPercent:49,confidence:"high",benchmark:{yourCost:84600,industryMedian:56800,industryLow:49200},contractEndsIn:41,cancellationNotice:30,why:"Din premie ligger 49 % \xf6ver branschsnittet f\xf6r VVS-firmor med 10\u201320 anst\xe4llda. Estimerad \xf6verbetalning baserad p\xe5 faktisk skadehistorik och branschindex.",coverage:["Egendom 12 MSEK","Avbrott 3 m\xe5n","Ansvar 10 MSEK","R\xe4ttsskydd 5 prisbasbelopp"],switchSteps:["Vi f\xf6rbereder upps\xe4gning av nuvarande avtal","Du signerar nytt avtal med BankID","Vi koordinerar \xf6verg\xe5ngen utan avbrott i skydd"]},{id:"el",category:"Elavtal",icon:"bolt",currentSupplier:"Vattenfall (r\xf6rligt)",currentAnnualCost:218400,suggestedSupplier:"Tibber Pulse F\xf6retag",suggestedAnnualCost:162800,savingPerYear:55600,confidence:"high",benchmark:{yourCost:218400,industryMedian:168e3,industryLow:152e3},contractEndsIn:14,cancellationNotice:30,why:"Du betalar ett p\xe5slag p\xe5 12,4 \xf6re/kWh \u2014 Tibber tar 5,9 \xf6re med samma timdebitering. Med 247 MWh/\xe5r ger det 55 600 kr/\xe5r.",coverage:["Spotpris timme f\xf6r timme","Ingen bindningstid","F\xf6rbrukningsapp ing\xe5r"],switchSteps:["Vi s\xe4ger upp ditt nuvarande avtal","Tibber tar \xf6ver leverans n\xe4sta m\xe5nadsskifte","Inget str\xf6mavbrott \u2014 du m\xe4rker bara den l\xe4gre fakturan"]},{id:"mobil",category:"Mobilabonnemang",icon:"phone",currentSupplier:"Telia F\xf6retag",currentAnnualCost:38400,suggestedSupplier:"Tele2 F\xf6retag Obegr\xe4nsad",suggestedAnnualCost:22800,savingPerYear:15600,confidence:"high",benchmark:{yourCost:38400,industryMedian:26400,industryLow:21600},contractEndsIn:0,cancellationNotice:30,why:"14 abonnemang \xe1 229 kr/m\xe5n vs. Tele2:s 135 kr/m\xe5n med samma data och EU-roaming.",coverage:["Obegr\xe4nsat tal & SMS","50 GB data","EU-roaming ing\xe5r","F\xf6retagssupport"],switchSteps:["Vi s\xe4ger upp Telia-avtalen samordnat","Tele2 portar nummer utan avbrott","SIM-kort skickas med bud till kontoret"]},{id:"bredband",category:"F\xf6retagsbredband",icon:"wifi",currentSupplier:"Telenor Business 1000",currentAnnualCost:14988,suggestedSupplier:"Bahnhof F\xf6retag 1000",suggestedAnnualCost:8388,savingPerYear:6600,confidence:"medium",benchmark:{yourCost:14988,industryMedian:10800,industryLow:8388},contractEndsIn:67,cancellationNotice:30,why:"Identisk hastighet (1 Gbit) p\xe5 samma fiberinfrastruktur. Bahnhof har dessutom svensk support och b\xe4ttre SLA.",coverage:["1 Gbit symmetrisk","Statisk IPv4","SLA 99,9 %","Svensk support"],switchSteps:["Bahnhof best\xe4ller porting av befintlig fiber","\xd6verg\xe5ng inom 14 dagar","Vi s\xe4ger upp Telenor n\xe4r Bahnhof \xe4r live"]},{id:"kortterminal",category:"Kortterminal",icon:"card",currentSupplier:"Worldline (Bambora)",currentAnnualCost:27360,suggestedSupplier:"Zettle by PayPal",suggestedAnnualCost:13200,savingPerYear:14160,confidence:"medium",benchmark:{yourCost:27360,industryMedian:16800,industryLow:11400},contractEndsIn:92,cancellationNotice:30,why:"Du betalar 1,95 % per transaktion vs. Zettles 1,25 %. Vid 1,9 MSEK kortvolym/\xe5r = 13 300 kr i ren avgift\xadbesparing + l\xe4gre m\xe5nadsavgift.",coverage:["Kortavgift 1,25 %","Ingen m\xe5nadsavgift","Utbetalning inom 1 dag"],switchSteps:["Ny terminal levereras inom 3 dagar","Vi s\xe4ger upp Worldline n\xe4r allt \xe4r testat","Bokf\xf6ring i Fortnox uppdateras automatiskt"]},{id:"saas-bokforing",category:"Fakturatj\xe4nst",icon:"file",currentSupplier:"Kivra F\xf6retag Premium",currentAnnualCost:8940,suggestedSupplier:"Direkt via Fortnox e-faktura",suggestedAnnualCost:1740,savingPerYear:7200,confidence:"high",benchmark:{yourCost:8940,industryMedian:2400,industryLow:1740},contractEndsIn:0,cancellationNotice:0,why:"Du betalar f\xf6r utskick via Kivra som Fortnox redan st\xf6djer inbyggt. Ingen funktionsf\xf6rlust, samma mottagare.",coverage:["Obegr\xe4nsade e-fakturor","P\xe5minnelser ing\xe5r","PDF-arkiv 7 \xe5r"],switchSteps:["Vi aktiverar Fortnox e-faktura","Befintliga mottagare migreras automatiskt","Kivra-abonnemanget s\xe4gs upp"]},{id:"forsakring-ansvar",category:"Yrkesansvarsf\xf6rs\xe4kring",icon:"briefcase",licensePending:!0,currentSupplier:"L\xe4nsf\xf6rs\xe4kringar",currentAnnualCost:26400,suggestedSupplier:"Gjensidige F\xf6retag",suggestedAnnualCost:19800,savingPerYear:6600,overpaymentPercent:22,confidence:"medium",benchmark:{yourCost:26400,industryMedian:21600,industryLow:18400},contractEndsIn:122,cancellationNotice:60,why:"Din premie ligger 22 % \xf6ver branschsnittet f\xf6r VVS-firmor med liknande oms\xe4ttning. Estimerad \xf6verbetalning baserad p\xe5 branschspecifik skadestatistik.",coverage:["10 MSEK","Tillkommande skydd VVS","R\xe4ttsskydd ing\xe5r"],switchSteps:["Vi f\xf6rbereder nytt avtal hos Gjensidige","Du signerar med BankID","\xd6verg\xe5ng samordnas vid avtalsslut"]},{id:"leasing-bil",category:"F\xf6retagsleasing",icon:"truck",currentSupplier:"ALD Automotive",currentAnnualCost:412800,suggestedSupplier:"Arval Sverige",suggestedAnnualCost:363200,savingPerYear:49600,confidence:"medium",benchmark:{yourCost:412800,industryMedian:384e3,industryLow:348e3},contractEndsIn:184,cancellationNotice:90,why:"8 servicebilar med samma specifikation kostar 11 % mindre hos Arval just nu \u2014 restv\xe4rden r\xe4knade.",coverage:["Full service","Vinterd\xe4ck","F\xf6rs\xe4kring","H\xe4mtning vid skada"],switchSteps:["Vi f\xf6rbereder nya leasingavtal vid avtalsslut","Inget byte under p\xe5g\xe5ende leasing","Bilarna ers\xe4tts succesivt under 6 m\xe5n"]}],ti=[{week:1,label:"Ig\xe5ng",status:"completed",detail:"Fortnox kopplat"},{week:1,label:"Besparingar identifierade",status:"completed",detail:"8 m\xf6jligheter, 187 340 kr/\xe5r"},{week:2,label:"F\xf6rsta byte godk\xe4nt",status:"current",detail:"Vi v\xe4ntar p\xe5 dig"},{week:4,label:"F\xf6rsta besparing utbetald",status:"pending",detail:"Cirka 4 veckor efter aktivering"},{week:12,label:"Kvartalsrapport",status:"pending",detail:"Ny scanning + nya f\xf6rslag"}],ni=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e)+" kr",ri=e=>e.licensePending?e.savingPerYear:Math.round(.8*e.savingPerYear),ai=e=>e.reduce((e,t)=>e+ri(t),0),ii=ei.filter(e=>!e.licensePending),li=ei.filter(e=>e.licensePending),oi=Object.freeze({activeNet:ai(ii),activeFee:ii.reduce((e,t)=>{return e+((n=t).licensePending?0:Math.round(.2*n.savingPerYear));var n},0),activeGross:ii.reduce((e,t)=>e+t.savingPerYear,0),lockedOverpayment:(si=li,si.filter(e=>e.licensePending).reduce((e,t)=>e+t.savingPerYear,0)),activeCount:ii.length,lockedCount:li.length});var si;const ui=wa`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,ci=wa`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`,di=xa.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  overflow-x: hidden;
`,pi=xa.section`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: ${e=>{let{$tight:t}=e;return t?"64px 28px":"120px 28px"}};
  @media (max-width: 740px) {
    padding: ${e=>{let{$tight:t}=e;return t?"48px 20px":"80px 20px"}};
  }
`,fi=xa.section`
  position: relative;
  padding: 96px 28px 80px;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 56px 20px 48px; }
`,hi=xa.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 30%, rgba(27, 122, 110, 0.10), transparent 50%),
    radial-gradient(circle at 82% 12%, rgba(93, 214, 202, 0.14), transparent 55%);
  z-index: 0;
`,mi=xa.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: center;
  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 48px; }
`,gi=xa.span`
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
  animation: ${ui} 0.6s ease both;

  span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,vi=xa.h1`
  margin-top: 24px;
  font-size: clamp(44px, 6vw, 76px);
  line-height: 1.02;
  font-weight: 500;
  letter-spacing: -0.025em;
  animation: ${ui} 0.7s 0.1s ease both;

  em {
    font-style: italic;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-weight: 500;
  }
`,xi=xa.p`
  margin-top: 22px;
  font-size: 18.5px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  max-width: 540px;
  animation: ${ui} 0.7s 0.2s ease both;
`,bi=xa.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: ${ui} 0.7s 0.3s ease both;
`,yi=xa.div`
  margin-top: 28px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  animation: ${ui} 0.7s 0.4s ease both;

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
`,ki=xa.div`
  position: relative;
  animation: ${ui} 0.8s 0.2s ease both;
`,wi=xa.div`
  position: relative;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  padding: 28px;
  transform: rotate(0.4deg);
`,Si=xa.div`
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
`,ji=xa.div`
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
`,$i=xa.ul`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ei=xa.li`
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
`,zi=xa.div`
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
`,Ci=xa.div`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  padding: 22px 0;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  overflow: hidden;
`,Ni=xa.div`
  display: flex;
  white-space: nowrap;
  gap: 64px;
  animation: ${ci} 50s linear infinite;
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
`,_i=xa.section`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 80px 28px 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 56px 20px 24px;
  }
`,Pi=xa.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform ${e=>{let{theme:t}=e;return t.motion.base}},
              box-shadow ${e=>{let{theme:t}=e;return t.motion.base}};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
  }

  div.icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }

  h3 {
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }

  p {
    font-size: 14.5px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }

  > strong {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    line-height: 1.4;
  }

  ul {
    margin-top: 6px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 14px;
  }
  ul li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-weight: 500;
  }
  ul li svg {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    flex-shrink: 0;
  }
  ul li.no {
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-weight: 500;
  }
  ul li.no svg {
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    opacity: 0.55;
  }
`,Ti=xa.div`
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
`,Fi=xa.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`,Ai=xa.div`
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
`,Ri=xa.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 40px; }
`,Li=xa.figure`
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
`,Oi=xa.div`
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
`,Di=xa.div`
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
    background: radial-gradient(circle, rgba(93, 214, 202, 0.20), transparent 60%);
    pointer-events: none;
  }
`,Mi=xa.div`
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
`,Ii=xa.div`
  max-width: 820px;
  margin: 0 auto;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,Bi=xa.details`
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
`,Hi=xa.section`
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
`,Vi=[{step:"Steg 01",title:"Koppla Fortnox p\xe5 60 sek",body:"S\xe4ker OAuth-anslutning till ditt befintliga bokf\xf6ringssystem. Vi l\xe4ser leverant\xf6rsfakturor \u2014 inget annat. Du kan koppla bort n\xe4r som helst.",bullets:["Endast l\xe4s-r\xe4ttigheter","BankID-verifierat","GDPR-s\xe4krad infrastruktur i Sverige"]},{step:"Steg 02",title:"Vi skannar dina avtal \u2014 du sover",body:"P\xe5 30 sekunder analyseras 12 m\xe5naders leverant\xf6rsfakturor. AI:n j\xe4mf\xf6r mot 50 000+ andra svenska SMB:er och hittar var du betalar \xf6ver marknadspris.",bullets:["8 leverant\xf6rskategorier idag","Branschjusterad benchmark","\xc5terkommande scanning varje kvartal"]},{step:"Steg 03",title:"Godk\xe4nn med BankID \u2014 vi byter \xe5t dig",body:"Du ser exakt vad du sparar och vad som m\xe5ste signeras. Arvo f\xf6rbereder upps\xe4gning + nytt avtal. Du klickar igenom \u2014 vi sk\xf6ter resten.",bullets:["Du beh\xe5ller full kontroll","Ingen leverant\xf6r byts utan din signatur","Garanti om priset h\xf6js inom 12 m\xe5n"]}],Ui=[{q:"Vad kostar det?",a:"Inget i f\xf6rskott. Vi tar 20 % av den faktiska besparing som materialiseras under \xe5r 1, fakturerat kvartalsvis. Hittar vi inget \u2014 kostar det inget. Du kan v\xe4lja en alternativ modell d\xe4r vi rabatterar v\xe5r affiliate-int\xe4kt mot 30 % success-fee, helt transparent."},{q:"Hur kan ni vara s\xe4kra p\xe5 att rekommendationerna \xe4r opartiska?",a:"V\xe5r rankningsalgoritm \xe4r publik och deterministisk \u2014 du hittar hela v\xe5r rankningspolicy under /bias. Affiliate-int\xe4kter \xe4r kapade per kategori och \xf6verskott rabatteras tillbaka till kunderna. Du kan ocks\xe5 v\xe4lja en helt affiliate-fri modell vid onboarding."},{q:"Vad h\xe4nder om den nya leverant\xf6ren h\xf6jer priset efter bytet?",a:"Vi m\xe4ter faktisk besparing \xf6ver 12 m\xe5nader via Fortnox. H\xf6js priset s\xe5 att din besparing blir l\xe4gre \xe4n vad vi lovat \u2014 f\xe5r du mellanskillnaden tillbaka. Det st\xe5r i avtalet."},{q:"S\xe4ger ni upp avtal autonomt utan min godk\xe4nnande?",a:"Aldrig. Varje byte kr\xe4ver din BankID-signatur. Vi f\xf6rbereder, du godk\xe4nner. Det \xe4r en h\xe5rd regel."},{q:"Vilka kategorier t\xe4cker ni idag?",a:"F\xf6retagsf\xf6rs\xe4kring, elavtal, mobilabonnemang, bredband, kortterminaler, fakturatj\xe4nster, yrkesansvarsf\xf6rs\xe4kring och f\xf6retagsleasing. Fler kategorier l\xe4ggs till varje kvartal baserat p\xe5 var vi ser st\xf6rst besparingar i kunddatan."},{q:"Vad h\xe4nder med min data?",a:"Vi l\xe4ser endast leverant\xf6rsfakturor fr\xe5n Fortnox via l\xe4s-r\xe4ttigheter. Datan lagras krypterad i Sverige (Bahnhof Stockholm). Vi s\xe4ljer aldrig identifierbar data \u2014 anonymiserade branschindex \xe4r v\xe5r enda dataprodukt ut\xf6ver tj\xe4nsten."}],Wi=()=>(0,$a.jsxs)(di,{children:[(0,$a.jsx)(Ia,{variant:"public"}),(0,$a.jsxs)(fi,{children:[(0,$a.jsx)(hi,{}),(0,$a.jsxs)(mi,{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsxs)(gi,{children:[(0,$a.jsx)("span",{className:"dot"})," Ingen risk. Ingen fast avgift. Bara resultat."]}),(0,$a.jsxs)(vi,{children:["Sluta betala \xf6verpris",(0,$a.jsx)("br",{}),"f\xf6r dina ",(0,$a.jsx)("em",{children:"leverant\xf6rsavtal."})]}),(0,$a.jsxs)(xi,{children:["Snittkunden hittar ",oi.activeNet.toLocaleString("sv-SE")," kr/\xe5r i nettobesparing efter Arvos avgift. Arvo Flow f\xf6resl\xe5r byten \u2014 du godk\xe4nner med BankID och vi sk\xf6ter resten. Inga fasta avgifter \u2014 vi tj\xe4nar pengar bara n\xe4r du g\xf6r det."]}),(0,$a.jsxs)(bi,{children:[(0,$a.jsxs)(Aa,{as:xt,to:"/connect",$variant:"gradient",$size:"lg",children:["Se mina besparingar \u2014 gratis ",(0,$a.jsx)(Ga,{name:"arrow",size:18})]}),(0,$a.jsx)(Aa,{as:"a",href:"#hur",$variant:"secondary",$size:"lg",children:"S\xe5 fungerar det"})]}),(0,$a.jsxs)(yi,{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsxs)("strong",{children:[oi.activeNet.toLocaleString("sv-SE")," kr"]}),(0,$a.jsx)("span",{children:"snittkundens nettobesparing \xe5r 1"})]}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("strong",{children:"47 250"}),(0,$a.jsx)("span",{children:"leverant\xf6rsfakturor analyserade i \xe5r"})]}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("strong",{children:"0 kr"}),(0,$a.jsx)("span",{children:"tills vi sparat pengar \xe5t dig"})]})]})]}),(0,$a.jsxs)(ki,{children:[(0,$a.jsxs)(wi,{children:[(0,$a.jsxs)(Si,{children:[(0,$a.jsx)("h4",{children:"Lindberg VVS \xb7 Live"}),(0,$a.jsx)("span",{children:"\u25cf Aktiv"})]}),(0,$a.jsxs)(ji,{children:[(0,$a.jsx)("small",{children:"Identifierad besparing \xe5r 1"}),(0,$a.jsxs)("div",{className:"amount",children:[(0,$a.jsx)("em",{children:"187 340"}),(0,$a.jsx)("span",{className:"unit",children:"kr"})]})]}),(0,$a.jsxs)($i,{children:[(0,$a.jsxs)(Ei,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"bolt",size:18})}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("div",{className:"label",children:"Elavtal \xb7 Tibber"}),(0,$a.jsx)("div",{className:"sub",children:"vs Vattenfall (r\xf6rligt)"})]}),(0,$a.jsx)("div",{className:"amount",children:"+55 600 kr"})]}),(0,$a.jsxs)(Ei,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"shield",size:18})}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("div",{className:"label",children:"F\xf6retagsf\xf6rs\xe4kring \xb7 If"}),(0,$a.jsx)("div",{className:"sub",children:"vs Trygg-Hansa"})]}),(0,$a.jsx)("div",{className:"amount",children:"+32 200 kr"})]}),(0,$a.jsxs)(Ei,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"phone",size:18})}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("div",{className:"label",children:"Mobil \xb7 Tele2"}),(0,$a.jsx)("div",{className:"sub",children:"14 abonnemang vs Telia"})]}),(0,$a.jsx)("div",{className:"amount",children:"+15 600 kr"})]})]})]}),(0,$a.jsxs)(zi,{$top:"-24px",$right:"-12px",children:[(0,$a.jsx)("div",{className:"dot",children:(0,$a.jsx)(Ga,{name:"spark",size:18})}),(0,$a.jsxs)("div",{className:"text",children:[(0,$a.jsx)("strong",{children:"5 nya f\xf6rslag"}),(0,$a.jsx)("span",{children:"scanning klar 09:14"})]})]}),(0,$a.jsxs)(zi,{$bottom:"-24px",$left:"20px",children:[(0,$a.jsx)("div",{className:"dot",children:(0,$a.jsx)(Ga,{name:"check",size:18})}),(0,$a.jsxs)("div",{className:"text",children:[(0,$a.jsx)("strong",{children:"Bytet \xe4r klart"}),(0,$a.jsx)("span",{children:"Tibber tar \xf6ver 1 maj"})]})]})]})]})]}),(0,$a.jsx)(Ci,{children:(0,$a.jsx)(Ni,{children:Array.from({length:2}).flatMap((e,t)=>[(0,$a.jsxs)("span",{children:["Fortnox ",(0,$a.jsx)("em",{children:"\xb7"})]},`a${t}`),(0,$a.jsxs)("span",{children:["Visma ",(0,$a.jsx)("em",{children:"\xb7"})]},`b${t}`),(0,$a.jsxs)("span",{children:["Tibber ",(0,$a.jsx)("em",{children:"\xb7"})]},`c${t}`),(0,$a.jsxs)("span",{children:["If Skadef\xf6rs\xe4kring ",(0,$a.jsx)("em",{children:"\xb7"})]},`d${t}`),(0,$a.jsxs)("span",{children:["Tele2 F\xf6retag ",(0,$a.jsx)("em",{children:"\xb7"})]},`e${t}`),(0,$a.jsxs)("span",{children:["Bahnhof ",(0,$a.jsx)("em",{children:"\xb7"})]},`f${t}`),(0,$a.jsxs)("span",{children:["Zettle ",(0,$a.jsx)("em",{children:"\xb7"})]},`g${t}`),(0,$a.jsxs)("span",{children:["L\xe4nsf\xf6rs\xe4kringar ",(0,$a.jsx)("em",{children:"\xb7"})]},`h${t}`),(0,$a.jsxs)("span",{children:["Vattenfall ",(0,$a.jsx)("em",{children:"\xb7"})]},`i${t}`),(0,$a.jsxs)("span",{children:["Worldline ",(0,$a.jsx)("em",{children:"\xb7"})]},`j${t}`)])})}),(0,$a.jsxs)(_i,{children:[(0,$a.jsxs)(Pi,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"lock",size:22,stroke:2})}),(0,$a.jsx)("h3",{children:"Vi f\xe5r bara l\xe4sa, aldrig \xe4ndra"}),(0,$a.jsx)("p",{children:"Endast leverant\xf6rsfakturor \u2014 kundfakturor, l\xf6nedata, bankkonton och personnummer ligger utanf\xf6r vad vi kommer \xe5t."}),(0,$a.jsxs)("ul",{children:[(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:14,stroke:2.4})," Avtal & f\xf6rfallodatum"]}),(0,$a.jsxs)("li",{className:"no",children:[(0,$a.jsx)(Ga,{name:"lock",size:14,stroke:2})," L\xf6n & personnummer"]}),(0,$a.jsxs)("li",{className:"no",children:[(0,$a.jsx)(Ga,{name:"lock",size:14,stroke:2})," Kundfakturor"]})]})]}),(0,$a.jsxs)(Pi,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"check",size:22,stroke:2.4})}),(0,$a.jsx)("h3",{children:"No Waste Promise"}),(0,$a.jsx)("p",{children:"Hittar vi inga \xf6verpriser p\xe5 30 dagar \xe4r ditt bolag redan optimerat. Vi raderar Fortnox-kopplingen och all data automatiskt."}),(0,$a.jsx)("strong",{children:"Du har inte betalat en krona."})]}),(0,$a.jsxs)(Pi,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"trend",size:22,stroke:2})}),(0,$a.jsx)("h3",{children:"Inga fasta avgifter"}),(0,$a.jsx)("p",{children:"Vi tj\xe4nar pengar bara n\xe4r du g\xf6r det. 20 % av faktiska besparingar \xe5r 1, fakturerat kvartalsvis i takt med att pengarna landar."}),(0,$a.jsx)("strong",{children:"Hittar vi inget kostar det inget."})]})]}),(0,$a.jsxs)(pi,{id:"hur",children:[(0,$a.jsxs)(Ti,{children:[(0,$a.jsx)("span",{className:"kicker",children:"S\xe5 fungerar Arvo Flow"}),(0,$a.jsx)("h2",{children:"Tre steg fr\xe5n trasigt till transparent."}),(0,$a.jsx)("p",{children:"Vi byggde Arvo Flow f\xf6r att vi sj\xe4lva tr\xf6ttnade p\xe5 att betala 30 % \xf6ver marknad utan att ens veta om det. H\xe4r \xe4r hur vi g\xf6r det enkelt."})]}),(0,$a.jsx)(Fi,{children:Vi.map(e=>(0,$a.jsxs)(Ai,{children:[(0,$a.jsx)("span",{className:"step",children:e.step}),(0,$a.jsx)("h3",{children:e.title}),(0,$a.jsx)("p",{children:e.body}),(0,$a.jsx)("ul",{children:e.bullets.map(e=>(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:16,stroke:2}),e]},e))})]},e.step))})]}),(0,$a.jsx)(pi,{$tight:!0,children:(0,$a.jsxs)(Ri,{children:[(0,$a.jsxs)(Li,{children:[(0,$a.jsx)("blockquote",{children:"P\xe5 sex veckor hittade Arvo 134 000 kr i besparingar bara p\xe5 el och f\xf6rs\xe4kring. Jag hade trott att jag redan hade f\xf6rhandlat klart \u2014 det st\xe4mde uppenbarligen inte."}),(0,$a.jsxs)("figcaption",{children:[(0,$a.jsx)("div",{className:"avatar",children:"JL"}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("strong",{children:"Johan Lindberg"}),(0,$a.jsx)("span",{children:"VD, Lindberg VVS \xb7 14 anst\xe4llda"})]})]})]}),(0,$a.jsxs)(Oi,{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsx)("strong",{children:"23 %"}),(0,$a.jsx)("span",{children:"genomsnittlig besparing per leverant\xf6rskategori vi hittar"})]}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("strong",{children:"11 dgr"}),(0,$a.jsx)("span",{children:"median\xadtid fr\xe5n f\xf6rsta skanning till f\xf6rsta byte aktiverat"})]}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("strong",{children:"500+"}),(0,$a.jsx)("span",{children:"sm\xe5f\xf6retag i Sverige som l\xe5ter Arvo bevaka sina kostnader"})]}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("strong",{children:"0 kr"}),(0,$a.jsx)("span",{children:"fasta avgifter \u2014 vi tj\xe4nar bara pengar n\xe4r du sparar pengar"})]})]})]})}),(0,$a.jsxs)(pi,{id:"priser",children:[(0,$a.jsxs)(Ti,{children:[(0,$a.jsx)("span",{className:"kicker",children:"Pris"}),(0,$a.jsx)("h2",{children:"Du betalar bara n\xe4r vi sparat \xe5t dig."}),(0,$a.jsx)("p",{children:"Vi \xe4r s\xe5 \xf6vertygade om att vi hittar pengarna att vi v\xe4grar ta en krona innan de \xe4r dina."})]}),(0,$a.jsx)(Di,{children:(0,$a.jsxs)(Mi,{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsx)("span",{className:"kicker",children:"Success-baserat"}),(0,$a.jsx)("h3",{children:"20 % av faktisk besparing \xe5r 1."}),(0,$a.jsx)("p",{children:"Inga m\xe5nadsavgifter. Inga uppstartskostnader. Vi m\xe4ter besparingen via Fortnox och fakturerar kvartalsvis i takt med att du faktiskt sparar pengarna. Hittar vi inget \u2014 kostar det inget."})]}),(0,$a.jsxs)("ul",{children:[(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:18,stroke:2.2})," Skanning av alla leverant\xf6rsfakturor varje kvartal"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:18,stroke:2.2})," F\xf6rberedda byten med BankID-signering"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:18,stroke:2.2})," Prisgaranti \u2014 h\xf6js priset f\xe5r du tillbaka mellanskillnaden"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:18,stroke:2.2})," Branschindex tillg\xe4ngligt f\xf6r dig som kund"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:18,stroke:2.2})," ",(0,$a.jsx)("strong",{children:"No Waste Promise"})," \u2014 hittar vi inga \xf6verpriser p\xe5 30 dagar raderas data + koppling automatiskt"]})]})]})})]}),(0,$a.jsxs)(pi,{id:"faq",children:[(0,$a.jsxs)(Ti,{children:[(0,$a.jsx)("span",{className:"kicker",children:"Vanliga fr\xe5gor"}),(0,$a.jsx)("h2",{children:"Det vi f\xe5r oftast \u2014 rakt p\xe5."})]}),(0,$a.jsx)(Ii,{children:Ui.map((e,t)=>(0,$a.jsxs)(Bi,{open:0===t,children:[(0,$a.jsx)("summary",{children:e.q}),(0,$a.jsx)("p",{children:e.a})]},e.q))})]}),(0,$a.jsxs)(Hi,{children:[(0,$a.jsx)("h2",{children:"Hur mycket betalar du f\xf6r mycket just nu?"}),(0,$a.jsxs)("p",{children:["Snittet bland v\xe5ra kunder \xe4r ",oi.activeNet.toLocaleString("sv-SE")," kr/\xe5r i nettobesparing efter v\xe5r avgift. Du vet inte f\xf6rr\xe4n vi har scannat. 60 sekunder med Fortnox och du har svaret."]}),(0,$a.jsx)("div",{className:"actions",children:(0,$a.jsxs)(Aa,{as:xt,to:"/connect",$variant:"gradient",$size:"lg",children:["Analysera mina fakturor \u2014 gratis ",(0,$a.jsx)(Ga,{name:"arrow",size:18})]})}),(0,$a.jsx)("div",{className:"fineprint",children:"Inga kreditkortsuppgifter. Ingen bindningstid. Avsluta n\xe4r du vill."})]}),(0,$a.jsx)(Ya,{})]}),Ki=wa`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,Yi=xa.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 60%),
    radial-gradient(circle at 0% 100%, ${e=>{let{theme:t}=e;return t.color.accentSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,qi=xa.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`,Gi=xa.div`
  width: 100%;
  max-width: 540px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  animation: ${Ki} 0.5s ease both;
  @media (max-width: 600px) { padding: 32px 24px; }
`,Qi=xa.div`
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
`,Xi=xa.h1`
  margin-top: 14px;
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
`,Ji=xa.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Zi=(xa.div`
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
`,xa.div`
  margin-top: 22px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`),el=xa.div`
  padding: 16px 18px;
  background: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.brandSoft:t.color.surfaceSunken}};
  border-right: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  &:last-child { border-right: none; border-left: none; }

  @media (max-width: 480px) {
    border-right: none;
    border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    &:last-child { border-bottom: none; }
  }

  span.head {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.brand:t.color.muted}};
    margin-bottom: 12px;
  }
  span.head div.dot {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.brand:"#9F3B22"}};
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
  }
  ul { display: flex; flex-direction: column; gap: 8px; }
  ul li {
    font-size: 13px;
    color: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.inkSoft:t.color.muted}};
    line-height: 1.4;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  ul li svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${e=>{let{theme:t,$allow:n}=e;return n?t.color.brand:t.color.muted}};
    opacity: ${e=>{let{$allow:t}=e;return t?1:.6}};
  }
`,tl=xa.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  svg { color: ${e=>{let{theme:t}=e;return t.color.brand}}; opacity: 0.7; }
`,nl=xa.div`
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
`,rl=xa.div`
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
`,al=xa.div`
  margin-top: 22px;
  padding: 14px 16px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`,il=xa.div`
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
`,ll=xa.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,ol=xa.button`
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
`,sl=(xa.ul`
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
`,xa.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`),ul=xa.p`
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
`,cl=wa`
  to { transform: rotate(360deg); }
`,dl=xa.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${cl} 0.7s linear infinite;
`,pl=()=>{const e=fe(),[t,n]=(0,r.useState)("fortnox"),[a,i]=(0,r.useState)(!1);return(0,$a.jsxs)(Yi,{children:[(0,$a.jsx)(Ia,{variant:"public"}),(0,$a.jsx)(qi,{children:(0,$a.jsxs)(Gi,{children:[(0,$a.jsxs)(Qi,{children:[(0,$a.jsx)("span",{className:"dot"})," Steg 1 av 3 \xb7 Anslut bokf\xf6ring"]}),(0,$a.jsx)(Xi,{children:"Koppla din bokf\xf6ring"}),(0,$a.jsx)(Ji,{children:"60 sekunders koppling via Fortnox eller Visma \u2014 och du kan st\xe4nga av den lika snabbt."}),(0,$a.jsxs)(Zi,{children:[(0,$a.jsxs)(el,{$allow:!0,children:[(0,$a.jsxs)("span",{className:"head",children:[(0,$a.jsx)("div",{className:"dot",children:"\u2713"})," Vi l\xe4ser"]}),(0,$a.jsxs)("ul",{children:[(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor (konton 4xxx\u20137xxx)"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:14,stroke:2.4})," Avtalskategorier & f\xf6rfallodatum"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:14,stroke:2.4})," Belopp & betalningshistorik"]})]})]}),(0,$a.jsxs)(el,{children:[(0,$a.jsxs)("span",{className:"head",children:[(0,$a.jsx)("div",{className:"dot",children:"\u2717"})," Vi l\xe4ser inte"]}),(0,$a.jsxs)("ul",{children:[(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"lock",size:14,stroke:2})," Kundfakturor & int\xe4kter"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"lock",size:14,stroke:2})," L\xf6nedata & personnummer"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"lock",size:14,stroke:2})," Bankkonton & kassafl\xf6de"]})]})]})]}),(0,$a.jsxs)(nl,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"check",size:16,stroke:2.4})}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("strong",{children:"No Waste Promise \u2014 hittar vi inga \xf6verpriser p\xe5 30 dagar?"}),(0,$a.jsx)("span",{children:"D\xe5 \xe4r ditt bolag redan optimerat. Vi raderar Fortnox-kopplingen och all din data automatiskt \u2014 du har inte betalat en krona."})]})]}),(0,$a.jsxs)(ll,{children:[(0,$a.jsxs)(ol,{$active:"fortnox"===t,onClick:()=>n("fortnox"),children:[(0,$a.jsx)("span",{className:"badge",children:"Vanligast"}),(0,$a.jsx)(Ga,{name:"fortnox",size:22,color:"#0F5132"}),(0,$a.jsx)("strong",{children:"Fortnox"}),(0,$a.jsx)("span",{children:"Direkt OAuth-koppling"})]}),(0,$a.jsxs)(ol,{$active:"visma"===t,onClick:()=>n("visma"),children:[(0,$a.jsx)(Ga,{name:"fortnox",size:22,color:"#0F5132"}),(0,$a.jsx)("strong",{children:"Visma eEkonomi"}),(0,$a.jsx)("span",{children:"Direkt OAuth-koppling"})]})]}),(0,$a.jsxs)(al,{children:[(0,$a.jsxs)(il,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"bankid",size:16,stroke:2})}),(0,$a.jsx)("strong",{children:"BankID"}),(0,$a.jsx)("span",{children:"S\xe4ker identifiering"})]}),(0,$a.jsxs)(il,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"shield",size:16,stroke:2})}),(0,$a.jsx)("strong",{children:"GDPR"}),(0,$a.jsx)("span",{children:"Fullt regelefterlevnad"})]}),(0,$a.jsxs)(il,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"lock",size:16,stroke:2})}),(0,$a.jsx)("strong",{children:"AES-256"}),(0,$a.jsx)("span",{children:"Krypterad i vila & i transport"})]}),(0,$a.jsxs)(il,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:"check",size:16,stroke:2.2})}),(0,$a.jsx)("strong",{children:"Sverige"}),(0,$a.jsx)("span",{children:"Data hos Bahnhof, Stockholm"})]})]}),(0,$a.jsxs)(rl,{children:[(0,$a.jsx)("div",{className:"live"}),(0,$a.jsxs)("span",{children:[(0,$a.jsx)("strong",{children:"1 247"})," leverant\xf6rsfakturor analyserade denna vecka"]})]}),(0,$a.jsxs)(sl,{children:[(0,$a.jsx)(Aa,{$variant:"gradient",$size:"lg",onClick:()=>{i(!0),setTimeout(()=>e("/scanning"),900)},disabled:a,$full:!0,children:a?(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)(dl,{})," Ansluter till ","fortnox"===t?"Fortnox":"Visma","\u2026"]}):(0,$a.jsxs)($a.Fragment,{children:["Anslut ","fortnox"===t?"Fortnox":"Visma"," ",(0,$a.jsx)(Ga,{name:"arrow",size:18})]})}),(0,$a.jsxs)(tl,{children:[(0,$a.jsx)(Ga,{name:"lock",size:12,stroke:2.2}),"Du skickas nu till ","fortnox"===t?"Fortnox":"Visma"," f\xf6r att godk\xe4nna l\xe4s\xe5tkomst. Inga \xe4ndringar g\xf6rs i din bokf\xf6ring."]}),(0,$a.jsx)(Aa,{$variant:"ghost",$size:"md",onClick:()=>e("/"),children:"Tillbaka"})]}),(0,$a.jsxs)(ul,{children:["Genom att forts\xe4tta godk\xe4nner du v\xe5ra ",(0,$a.jsx)("a",{href:"#villkor",style:{textDecoration:"underline"},children:"villkor"})," och v\xe5r ",(0,$a.jsx)("a",{href:"#integritet",style:{textDecoration:"underline"},children:"integritetspolicy"}),"."]})]})})]})},fl=wa`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`,hl=wa`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.06); opacity: 1; }
`,ml=wa`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`,gl=wa`
  0% { stroke-dashoffset: 380; }
  100% { stroke-dashoffset: 0; }
`,vl=xa.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 50% 20%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,xl=xa.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
`,bl=xa.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin-bottom: 44px;
`,yl=xa.svg`
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
    animation: ${gl} 6s ease-in-out forwards;
    transform: rotate(-90deg);
    transform-origin: center;
  }
`,kl=xa.div`
  position: absolute;
  inset: 0;
  animation: ${ml} 4s linear infinite;
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
`,wl=xa.div`
  position: absolute;
  inset: 32px;
  border-radius: 50%;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  animation: ${hl} 2.4s ease-in-out infinite;

  span {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 38px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-feature-settings: "tnum";
  }
`,Sl=xa.h1`
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.02em;
  line-height: 1.1;
  max-width: 640px;
`,jl=xa.p`
  margin-top: 14px;
  font-size: 16px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 520px;
`,$l=xa.ul`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 460px;
`,El=xa.li`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t,$state:n,$type:r}=e;return"pending"===n?"transparent":"skip"===r?t.color.surfaceSunken:t.color.surface}};
  border: 1px solid ${e=>{let{theme:t,$state:n,$type:r}=e;return"pending"===n?"transparent":t.color.borderStrong}};
  text-align: left;
  animation: ${fl} 0.4s ease both;
  opacity: ${e=>{let{$state:t}=e;return"pending"===t?.55:1}};
  transition: opacity ${e=>{let{theme:t}=e;return t.motion.base}},
              background ${e=>{let{theme:t}=e;return t.motion.base}};

  div.idx {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${e=>{let{theme:t,$state:n,$type:r}=e;return"skip"===r?"pending"===n?t.color.surfaceAlt:t.color.muted:"done"===n?t.color.brand:"active"===n?t.color.brandSoft:t.color.surfaceAlt}};
    color: ${e=>{let{theme:t,$state:n,$type:r}=e;return"skip"===r?"#FFFFFF":"done"===n?"#FAFAF7":t.color.muted}};
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
    color: ${e=>{let{theme:t,$state:n,$type:r}=e;return"skip"===r||"pending"===n?t.color.muted:t.color.ink}};
    font-style: ${e=>{let{$type:t}=e;return"skip"===t?"italic":"normal"}};
  }
  div.detail {
    font-size: 12.5px;
    color: ${e=>{let{theme:t,$type:n}=e;return"skip"===n?t.color.mutedSoft:t.color.muted}};
    font-feature-settings: "tnum";
    font-weight: ${e=>{let{$type:t}=e;return"skip"===t?500:400}};
    text-transform: ${e=>{let{$type:t}=e;return"skip"===t?"uppercase":"none"}};
    letter-spacing: ${e=>{let{$type:t}=e;return"skip"===t?"0.06em":"0"}};
    font-size: ${e=>{let{$type:t}=e;return"skip"===t?"11px":"12.5px"}};
  }
`,zl=[{type:"read",label:"L\xe4ser leverant\xf6rsfakturor fr\xe5n Fortnox",target:412},{type:"skip",label:"Hoppar \xf6ver kundfakturor & int\xe4kter"},{type:"read",label:"Identifierar leverant\xf6rer & avtalstyper",target:38},{type:"skip",label:"Hoppar \xf6ver l\xf6nedata & personnummer"},{type:"read",label:"J\xe4mf\xf6r mot branschindex (50 000+ SMB)",target:8},{type:"skip",label:"Hoppar \xf6ver bankkonton & kassafl\xf6de"},{type:"read",label:"Sammanst\xe4ller dina besparingsm\xf6jligheter",target:8}],Cl=900,Nl=600,_l=()=>{const e=fe(),[t,n]=(0,r.useState)(0),[a,i]=(0,r.useState)(0),[l,o]=(0,r.useState)(()=>zl.map(()=>0));return(0,r.useEffect)(()=>{const e=Nl+Cl*zl.length-600,t=performance.now();let r;const a=i=>{const l=Math.min(1,(i-t)/e),o=1-Math.pow(1-l,3);n(Math.round(187340*o)),l<1&&(r=requestAnimationFrame(a))};return r=requestAnimationFrame(a),()=>cancelAnimationFrame(r)},[]),(0,r.useEffect)(()=>{const t=[];return zl.forEach((e,n)=>{t.push(setTimeout(()=>i(n+1),Nl+n*Cl)),"read"===e.type&&e.target&&t.push(setTimeout(()=>{o(t=>{const r=[...t];return r[n]=e.target,r})},1e3+n*Cl))}),t.push(setTimeout(()=>{try{sessionStorage.setItem("arvo:scanCompleted","1")}catch(ss){}e("/insights")},Nl+Cl*zl.length+400)),()=>t.forEach(clearTimeout)},[e]),(0,$a.jsxs)(vl,{children:[(0,$a.jsx)(Ia,{variant:"public"}),(0,$a.jsxs)(xl,{children:[(0,$a.jsxs)(bl,{children:[(0,$a.jsxs)(yl,{viewBox:"0 0 220 220",children:[(0,$a.jsx)("circle",{className:"track",cx:"110",cy:"110",r:"100"}),(0,$a.jsx)("circle",{className:"progress",cx:"110",cy:"110",r:"100"})]}),(0,$a.jsx)(kl,{}),(0,$a.jsx)(wl,{children:(0,$a.jsx)("span",{children:t.toLocaleString("sv-SE")})})]}),(0,$a.jsx)(Sl,{children:"Vi skannar din bokf\xf6ring just nu\u2026"}),(0,$a.jsx)(jl,{children:"Arvo Flow analyserar bara dina leverant\xf6rsfakturor \u2014 ingenting annat. Du ser exakt vad vi r\xf6r och vad vi g\xe5r f\xf6rbi."}),(0,$a.jsx)($l,{children:zl.map((e,t)=>{const n=t<a?"done":t===a?"active":"pending";return(0,$a.jsxs)(El,{$state:n,$type:e.type,children:[(0,$a.jsx)("div",{className:"idx",children:"skip"===e.type?(0,$a.jsx)(Ga,{name:"lock",size:12,stroke:2.4,color:"#FFFFFF"}):"done"===n?(0,$a.jsx)(Ga,{name:"check",size:14,stroke:2.5}):Math.floor(t/2)+1}),(0,$a.jsx)("div",{className:"label",children:e.label}),(0,$a.jsx)("div",{className:"detail",children:"skip"===e.type?"pending"===n?"":"Skyddat":l[t]>0?l[t].toLocaleString("sv-SE"):""})]},t)})})]})]})},Pl=wa`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,Tl=wa`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`,Fl=wa`
  0% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
`,Al=wa`
  0% { opacity: 0; transform: translateY(4px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
`,Rl=xa.div`
  position: fixed;
  inset: 0;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  z-index: 80;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  animation: ${Fl} 0.5s ease forwards 3.8s;

  div.spinner {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 3px solid ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    border-top-color: ${e=>{let{theme:t}=e;return t.color.brand}};
    animation: spin 0.9s linear infinite;
    margin-bottom: 24px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  h2 {
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.015em;
    max-width: 480px;
  }

  div.lineTrack {
    margin-top: 14px;
    height: 22px;
    width: 100%;
    max-width: 480px;
    position: relative;
  }
  div.lineTrack p {
    position: absolute;
    inset: 0;
    margin: 0;
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    animation: ${Al} 1s ease-in-out forwards;
  }

  ul.skeletonRows {
    margin-top: 32px;
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ul.skeletonRows li {
    height: 14px;
    border-radius: 4px;
    background: linear-gradient(90deg,
      ${e=>{let{theme:t}=e;return t.color.surfaceAlt}} 0%,
      ${e=>{let{theme:t}=e;return t.color.surface}} 50%,
      ${e=>{let{theme:t}=e;return t.color.surfaceAlt}} 100%);
    background-size: 800px 100%;
    animation: ${Tl} 1.4s ease-in-out infinite;
  }
  ul.skeletonRows li:nth-child(1) { width: 100%; }
  ul.skeletonRows li:nth-child(2) { width: 88%; }
  ul.skeletonRows li:nth-child(3) { width: 76%; }
  ul.skeletonRows li:nth-child(4) { width: 92%; }
`,Ll=xa.main`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,Ol=xa.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 40px 28px 80px;
  @media (max-width: 740px) { padding: 24px 18px 60px; }
`,Dl=xa.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  animation: ${Pl} 0.5s ease both;

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
`,Ml=xa.section`
  margin-top: 32px;
  background: ${e=>{let{theme:t}=e;return t.color.ink}};
  color: #FAFAF7;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px 40px;
  position: relative;
  overflow: hidden;
  animation: ${Pl} 0.6s 0.05s ease both;
  @media (max-width: 740px) { padding: 32px 24px; }

  &::before {
    content: '';
    position: absolute;
    top: -30%; right: -10%;
    width: 60%; height: 180%;
    background: radial-gradient(circle, rgba(93, 214, 202, 0.22), transparent 60%);
    pointer-events: none;
  }
`,Il=xa.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: end;
  @media (max-width: 740px) { grid-template-columns: 1fr; gap: 24px; }
`,Bl=xa.div`
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
    color: rgba(250, 250, 247, 0.78);
    margin-left: 12px;
  }
  p.netMath {
    margin-top: 14px;
    font-size: 13px;
    color: rgba(250, 250, 247, 0.65);
    font-feature-settings: "tnum";
    letter-spacing: 0.005em;
    max-width: 480px;
  }
  p.netMath span.dash {
    color: rgba(250, 250, 247, 0.4);
    margin: 0 2px;
  }
  p {
    margin-top: 14px;
    font-size: 15px;
    color: rgba(250, 250, 247, 0.78);
    line-height: 1.55;
    max-width: 400px;
  }
`,Hl=(xa.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-top: 1px solid rgba(250, 250, 247, 0.12);
  padding-top: 24px;

  div { }
  dt {
    font-size: 12px;
    color: rgba(250, 250, 247, 0.78);
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
`,xa.section`
  margin-top: 56px;
  animation: ${Pl} 0.6s 0.15s ease both;

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
`),Vl=xa.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`,Ul=xa.button`
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
  &:hover div.cta {
    background: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.brand}};
  }
`,Wl=xa.div`
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
`,Kl=xa.div`
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
`,Yl=xa.div`
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
    padding: 8px 14px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.005em;
    transition: transform ${e=>{let{theme:t}=e;return t.motion.fast}}, background ${e=>{let{theme:t}=e;return t.motion.fast}}, box-shadow ${e=>{let{theme:t}=e;return t.motion.fast}};
  }
`,ql=xa.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  transition: color ${e=>{let{theme:t}=e;return t.motion.fast}};

  a {
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-decoration: underline;
    text-decoration-color: ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    text-underline-offset: 2px;
    transition: color ${e=>{let{theme:t}=e;return t.motion.fast}};
  }
  a:hover { color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  svg { color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; flex-shrink: 0; }
`,Gl=xa.div`
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
`,Ql=xa.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;

  h3 {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.015em;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-weight: 500;
  }
  span.badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  span.badge.warning {
    background: ${e=>{let{theme:t}=e;return t.color.warningSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.warning}};
  }
  span.subtle {
    margin-left: auto;
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-feature-settings: "tnum";
  }
`,Xl=xa.button`
  text-align: left;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px dashed ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 24px;
  cursor: pointer;
  transition: all ${e=>{let{theme:t}=e;return t.motion.base}};
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 120px; height: 120px;
    background: radial-gradient(circle at top right, rgba(168, 118, 26, 0.08), transparent 70%);
    pointer-events: none;
  }

  &:hover {
    border-color: ${e=>{let{theme:t}=e;return t.color.warning}};
    transform: translateY(-2px);
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
  }
`,Jl=xa.div`
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;

  div.icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
  }
  div.icon::after {
    content: '';
    position: absolute;
    bottom: -3px; right: -3px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.warning}};
    border: 2px solid ${e=>{let{theme:t}=e;return t.color.surface}};
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
  }
  span.beta {
    font-size: 11px;
    padding: 4px 8px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-weight: 700;
    letter-spacing: 0.06em;
    background: ${e=>{let{theme:t}=e;return t.color.warningSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.warning}};
    text-transform: uppercase;
  }
`,Zl=xa.div`
  div.amount {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 36px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.warning}};
    font-feature-settings: "tnum";
    em { font-style: italic; font-weight: 400; }
  }
  div.unit {
    margin-top: 6px;
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  div.unit strong { color: ${e=>{let{theme:t}=e;return t.color.ink}}; font-weight: 600; }
`,eo=xa.div`
  padding: 14px 16px;
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  line-height: 1.5;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  svg { flex-shrink: 0; margin-top: 2px; color: ${e=>{let{theme:t}=e;return t.color.warning}}; }
`,to=xa.div`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.delta {
    font-size: 13px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  div.cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.warning}};
  }
`,no=wa`
  0% { transform: translate3d(0, -40px, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate3d(var(--drift, 0px), 480px, 0) rotate(var(--spin, 720deg)); opacity: 0; }
`,ro=xa.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`,ao=xa.span`
  position: absolute;
  top: 0;
  left: ${e=>{let{$x:t}=e;return t}}%;
  width: ${e=>{let{$size:t}=e;return t}}px;
  height: ${e=>{let{$size:t}=e;return.4*t}}px;
  background: ${e=>{let{$color:t}=e;return t}};
  border-radius: 1px;
  --drift: ${e=>{let{$drift:t}=e;return t}}px;
  --spin: ${e=>{let{$spin:t}=e;return t}}deg;
  animation: ${no} ${e=>{let{$dur:t}=e;return t}}s cubic-bezier(0.2, 0.6, 0.4, 1) ${e=>{let{$delay:t}=e;return t}}s forwards;
`,io=xa.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 26, 23, 0.55);
  backdrop-filter: blur(6px);
  z-index: ${e=>{let{theme:t}=e;return t.z.modal}};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadein 0.25s ease;
  @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
`,lo=xa.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 480px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 40px 36px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};

  div.crown {
    width: 64px; height: 64px;
    border-radius: 18px;
    background: ${e=>{let{theme:t}=e;return t.color.warningSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.warning}};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  span.tag {
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.warning}};
    background: ${e=>{let{theme:t}=e;return t.color.warningSoft}};
    padding: 4px 10px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    display: inline-block;
    margin-bottom: 14px;
  }
  h3 {
    font-size: 26px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 12px;
    font-size: 14.5px;
    line-height: 1.6;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  ul.benefits {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ul.benefits li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  ul.benefits li svg { flex-shrink: 0; margin-top: 2px; color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  div.actions {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  div.confirmed {
    text-align: center;
    padding: 24px 0 12px;
    div.checkmark {
      width: 64px; height: 64px;
      margin: 0 auto 16px;
      border-radius: 50%;
      background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
      color: ${e=>{let{theme:t}=e;return t.color.brand}};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`,oo=xa.div`
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid rgba(250, 250, 247, 0.12);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 16px; }

  div { position: relative; }
  div + div { padding-left: 24px; border-left: 1px solid rgba(250, 250, 247, 0.12);
    @media (max-width: 600px) { padding-left: 0; border-left: 0; padding-top: 16px; border-top: 1px solid rgba(250, 250, 247, 0.12); }
  }
  span.lbl {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(250, 250, 247, 0.78);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  span.lbl em {
    font-style: normal;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    font-size: 10px;
    letter-spacing: 0.04em;
  }
  span.lbl em.live {
    background: rgba(93, 214, 202, 0.18);
    color: #5DD6CA;
  }
  span.lbl em.beta {
    background: rgba(245, 213, 152, 0.18);
    color: #F5D598;
  }
  div.value {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 34px;
    line-height: 1;
    color: #FAFAF7;
    font-feature-settings: "tnum";
    letter-spacing: -0.02em;
  }
  div.value small {
    font-size: 13px;
    color: rgba(250, 250, 247, 0.78);
    margin-left: 8px;
    font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
    font-feature-settings: "tnum";
  }
`,so=xa.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px;
`,uo=xa.ol`
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
`,co=xa.li`
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
`,po=["#5DD6CA","#1B7A6E","#C8804A","#F5D598","#1B6E66"],fo=[{id:"all",label:"Alla"},{id:"high",label:"H\xf6g s\xe4kerhet"},{id:"urgent",label:"Br\xe5dskande"}],ho=()=>{const e=fe(),[t,n]=(0,r.useState)("all"),[a,i]=(0,r.useState)(0),[l,o]=(0,r.useState)(()=>{try{return"1"!==sessionStorage.getItem("arvo:scanCompleted")}catch(ss){return!1}}),[s,u]=(0,r.useState)(0);(0,r.useEffect)(()=>{if(!l)return;const e=[setTimeout(()=>u(1),1e3),setTimeout(()=>u(2),2e3),setTimeout(()=>u(3),3e3)],t=setTimeout(()=>{o(!1);try{sessionStorage.setItem("arvo:scanCompleted","1")}catch(ss){}},4200);return()=>{e.forEach(clearTimeout),clearTimeout(t)}},[l]);(0,r.useEffect)(()=>{if(l)return;const e=oi.activeNet,t=performance.now();let n;const r=a=>{const l=Math.min(1,(a-t)/1400),o=1-Math.pow(1-l,3);i(Math.round(o*e)),l<1&&(n=requestAnimationFrame(r))};return n=requestAnimationFrame(r),()=>cancelAnimationFrame(n)},[l]);const[c,d]=(0,r.useState)(null),[p,f]=(0,r.useState)("idle"),[h,m]=(0,r.useState)([]),g=(0,r.useMemo)(()=>"high"===t?ei.filter(e=>"high"===e.confidence):"urgent"===t?ei.filter(e=>e.contractEndsIn<60):ei,[t]),v=g.filter(e=>!e.licensePending),x=g.filter(e=>e.licensePending),b=ai(v),y=x.reduce((e,t)=>e+t.savingPerYear,0),k=()=>{d(null),f("idle"),m([])};return(0,$a.jsxs)(Ll,{children:[l&&(0,$a.jsxs)(Rl,{children:[(0,$a.jsx)("div",{className:"spinner"}),(0,$a.jsx)("h2",{children:"Analyserar din leverant\xf6rsdata"}),(0,$a.jsx)("div",{className:"lineTrack",children:(0,$a.jsx)("p",{children:["H\xe4mtar data via krypterad anslutning\u2026","Skannar 412 leverant\xf6rsfakturor fr\xe5n senaste 12 m\xe5naderna\u2026","J\xe4mf\xf6r avtal mot branschindex (50 000+ SMB)\u2026","Identifierar \xf6verbetalningar\u2026"][s]},s)}),(0,$a.jsxs)("ul",{className:"skeletonRows",children:[(0,$a.jsx)("li",{}),(0,$a.jsx)("li",{}),(0,$a.jsx)("li",{}),(0,$a.jsx)("li",{})]})]}),(0,$a.jsx)(Ia,{variant:"app"}),(0,$a.jsxs)(Ol,{children:[(0,$a.jsxs)(Dl,{children:[(0,$a.jsxs)("div",{className:"left",children:[(0,$a.jsxs)("small",{children:[Qa," \xb7 Org ",Xa]}),(0,$a.jsx)("h1",{children:"God morgon, Johan."})]}),(0,$a.jsx)("div",{className:"right",children:(0,$a.jsx)("span",{className:"live",children:"Scanning klar 09:14"})})]}),(0,$a.jsx)(Ml,{children:(0,$a.jsxs)(Il,{children:[(0,$a.jsxs)(Bl,{children:[(0,$a.jsx)("span",{className:"kicker",children:"Din nettobesparing \xe5r 1"}),(0,$a.jsxs)("div",{className:"amount tabular",children:[(0,$a.jsx)("em",{children:Math.round(.8*a).toLocaleString("sv-SE")}),(0,$a.jsx)("span",{className:"unit",children:"kr"})]}),(0,$a.jsxs)("p",{className:"netMath",children:["Bruttobesparing ",oi.activeGross.toLocaleString("sv-SE")," kr",(0,$a.jsx)("span",{className:"dash",children:" \u2212 "}),"Arvos success-fee ",oi.activeFee.toLocaleString("sv-SE")," kr (20 %)"]}),(0,$a.jsxs)("p",{children:["Vi gick igenom ",Ja," leverant\xf6rsfakturor fr\xe5n"," ",Za," olika leverant\xf6rer det senaste \xe5ret och hittade"," ",ei.length," tydliga bytesm\xf6jligheter. F\xf6rs\xe4kring (2 m\xf6jligheter) kan inte aktiveras \xe4n \u2014 vi v\xe4ntar p\xe5 FI-godk\xe4nnande och tar ingen avgift f\xf6r dem."]})]}),(0,$a.jsxs)(oo,{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsxs)("span",{className:"lbl",children:["Redo nu \u2014 netto ",(0,$a.jsx)("em",{className:"live",children:"Live"})]}),(0,$a.jsxs)("div",{className:"value",children:[b.toLocaleString("sv-SE"),(0,$a.jsxs)("small",{children:["kr \xb7 ",v.length," m\xf6jligheter"]})]})]}),(0,$a.jsxs)("div",{children:[(0,$a.jsxs)("span",{className:"lbl",children:["Estimerad \xf6verbetalning ",(0,$a.jsx)("em",{className:"beta",children:"V\xe4ntar p\xe5 FI"})]}),(0,$a.jsxs)("div",{className:"value",children:["~",y.toLocaleString("sv-SE"),(0,$a.jsxs)("small",{children:["kr \xb7 ",x.length," m\xf6jligheter"]})]})]})]})]})}),(0,$a.jsxs)(Hl,{children:[(0,$a.jsxs)("header",{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsx)("h2",{children:"Dina besparingsm\xf6jligheter"}),(0,$a.jsx)("p",{children:"Sorterade efter besparing per \xe5r. Klicka f\xf6r detaljer + signera bytet."})]}),(0,$a.jsx)("div",{className:"filters",children:fo.map(e=>(0,$a.jsx)("button",{className:t===e.id?"active":"",onClick:()=>n(e.id),children:e.label},e.id))})]}),(0,$a.jsxs)(Ql,{children:[(0,$a.jsx)("h3",{children:"Redo att aktiveras idag"}),(0,$a.jsx)("span",{className:"badge",children:"Live \xb7 netto efter Arvos avgift"}),(0,$a.jsxs)("span",{className:"subtle",children:[v.length," m\xf6jligheter \xb7 ",b.toLocaleString("sv-SE")," kr/\xe5r"]})]}),(0,$a.jsx)(Vl,{children:v.map(t=>(0,$a.jsxs)(Ul,{onClick:()=>e(`/opportunity/${t.id}`),children:[(0,$a.jsxs)(Wl,{$high:"high"===t.confidence,children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:t.icon,size:22})}),(0,$a.jsxs)("div",{className:"text",children:[(0,$a.jsx)("span",{className:"cat",children:t.category}),(0,$a.jsx)("strong",{children:t.suggestedSupplier})]}),(0,$a.jsx)("span",{className:"confidence",children:"high"===t.confidence?"H\xf6g":"Medel"})]}),(0,$a.jsxs)(Kl,{children:[(0,$a.jsxs)("div",{className:"amount",children:["+",ri(t).toLocaleString("sv-SE")," kr"]}),(0,$a.jsxs)("div",{className:"unit",children:["netto \xe5r 1 efter Arvos avgift \xb7 ",Math.round(ri(t)/t.currentAnnualCost*100)," % l\xe4gre kostnad"]})]}),(0,$a.jsxs)(Gl,{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsx)("span",{children:"Idag"}),(0,$a.jsx)("strong",{children:ni(t.currentAnnualCost)})]}),(0,$a.jsx)(Ga,{name:"arrow",size:18}),(0,$a.jsxs)("div",{className:"right",children:[(0,$a.jsx)("span",{children:"Med Arvo"}),(0,$a.jsx)("strong",{children:ni(t.suggestedAnnualCost)})]})]}),(0,$a.jsxs)(Yl,{children:[(0,$a.jsx)("div",{className:"delta",children:0===t.contractEndsIn?(0,$a.jsxs)($a.Fragment,{children:["Avtalet kan s\xe4gas upp ",(0,$a.jsx)("span",{children:"nu"})]}):(0,$a.jsxs)($a.Fragment,{children:["Avtal l\xf6per i ",(0,$a.jsxs)("span",{children:[t.contractEndsIn," dgr"]})]})}),(0,$a.jsxs)("div",{className:"cta",children:["Granska bytet ",(0,$a.jsx)(Ga,{name:"arrow",size:14,stroke:2.4,color:"#FFFFFF"})]})]}),(0,$a.jsxs)(ql,{children:[(0,$a.jsx)(Ga,{name:"check",size:12,stroke:2}),(0,$a.jsxs)("span",{onClick:e=>e.stopPropagation(),children:["Hur r\xe4knas detta? ",(0,$a.jsx)(xt,{to:"/bias",children:"Bias-policy"})]})]})]},t.id))}),x.length>0&&(0,$a.jsxs)("div",{style:{marginTop:48},children:[(0,$a.jsxs)(Ql,{children:[(0,$a.jsx)("h3",{children:"Snart tillg\xe4ngligt"}),(0,$a.jsx)("span",{className:"badge warning",children:"Beta \xb7 V\xe4ntar p\xe5 FI"}),(0,$a.jsxs)("span",{className:"subtle",children:[x.length," m\xf6jligheter \xb7 ~",y.toLocaleString("sv-SE")," kr/\xe5r estimerad \xf6verbetalning"]})]}),(0,$a.jsx)(Vl,{children:x.map(e=>(0,$a.jsxs)(Xl,{onClick:()=>(d(e),f("idle"),void m([])),children:[(0,$a.jsxs)(Jl,{children:[(0,$a.jsx)("div",{className:"icon",children:(0,$a.jsx)(Ga,{name:e.icon,size:22})}),(0,$a.jsxs)("div",{className:"text",children:[(0,$a.jsx)("span",{className:"cat",children:e.category}),(0,$a.jsx)("strong",{children:e.currentSupplier})]}),(0,$a.jsx)("span",{className:"beta",children:"Beta"})]}),(0,$a.jsxs)(Zl,{children:[(0,$a.jsxs)("div",{className:"amount",children:["~",(0,$a.jsx)("em",{children:e.savingPerYear.toLocaleString("sv-SE")})," kr"]}),(0,$a.jsxs)("div",{className:"unit",children:["estimerad \xf6verbetalning \xb7 ",(0,$a.jsxs)("strong",{children:[e.overpaymentPercent," % \xf6ver branschsnittet"]})]})]}),(0,$a.jsxs)(eo,{children:[(0,$a.jsx)(Ga,{name:"lock",size:16,stroke:2}),(0,$a.jsx)("span",{children:"Vi v\xe4ntar p\xe5 godk\xe4nnande fr\xe5n Finansinspektionen f\xf6r att f\xe5 byta din f\xf6rs\xe4kring \xe5t dig. Estimat baserat p\xe5 din premie + branschindex."})]}),(0,$a.jsxs)(to,{children:[(0,$a.jsx)("div",{className:"delta",children:"Lansering Q4 2026"}),(0,$a.jsxs)("div",{className:"cta",children:["Prioritera mitt bolag ",(0,$a.jsx)(Ga,{name:"arrow",size:14})]})]}),(0,$a.jsxs)(ql,{children:[(0,$a.jsx)(Ga,{name:"check",size:12,stroke:2}),(0,$a.jsxs)("span",{onClick:e=>e.stopPropagation(),children:["Hur r\xe4knas detta? ",(0,$a.jsx)(xt,{to:"/bias",children:"Bias-policy"})]})]})]},e.id))})]})]}),(0,$a.jsxs)(Hl,{children:[(0,$a.jsx)("header",{children:(0,$a.jsxs)("div",{children:[(0,$a.jsx)("h2",{children:"Din resa med Arvo"}),(0,$a.jsx)("p",{children:"S\xe5 h\xe4r ser tidslinjen ut \u2014 vi f\xf6ljer upp varje vecka och rapporterar."})]})}),(0,$a.jsx)(so,{children:(0,$a.jsx)(uo,{children:ti.map((e,t)=>(0,$a.jsxs)(co,{$state:e.status,children:[(0,$a.jsx)("div",{className:"label",children:e.label}),(0,$a.jsx)("div",{className:"detail",children:e.detail}),(0,$a.jsxs)("div",{className:"week",children:["v ",e.week]})]},t))})})]})]}),c&&(0,$a.jsx)(io,{onClick:e=>{e.target===e.currentTarget&&k()},children:(0,$a.jsxs)(lo,{children:["confirmed"===p&&(0,$a.jsx)(ro,{children:h.map(e=>(0,$a.jsx)(ao,{$x:e.x,$size:e.size,$drift:e.drift,$spin:e.spin,$dur:e.dur,$delay:e.delay,$color:e.color},e.id))}),"idle"===p?(0,$a.jsxs)($a.Fragment,{children:[(0,$a.jsx)("div",{className:"crown",children:(0,$a.jsx)(Ga,{name:"spark",size:28,stroke:2})}),(0,$a.jsx)("span",{className:"tag",children:"Beta \xb7 VIP-k\xf6"}),(0,$a.jsxs)("h3",{children:["Vi byter din ",c.category.toLowerCase()," n\xe4r FI \xe4r klart."]}),(0,$a.jsxs)("p",{children:["Din nuvarande premie hos ",c.currentSupplier," ligger",(0,$a.jsxs)("strong",{children:[" ",c.overpaymentPercent," % \xf6ver branschsnittet"]})," \u2014 en estimerad \xf6verbetalning p\xe5 cirka ",(0,$a.jsxs)("strong",{children:[c.savingPerYear.toLocaleString("sv-SE")," kr/\xe5r"]}),". Vi f\xe5r inte teckna det nya avtalet \xe5t dig f\xf6rr\xe4n vi \xe4r registrerade f\xf6rs\xe4kringsf\xf6rmedlare hos Finansinspektionen (FI)."]}),(0,$a.jsxs)("ul",{className:"benefits",children:[(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:16,stroke:2.2})," Din plats i k\xf6n reserveras med Fortnox-data redan analyserad"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:16,stroke:2.2})," Du f\xe5r mejl n\xe4r vi g\xe5r live \u2014 bytet utf\xf6rs samma dag"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:16,stroke:2.2})," Garanterad placering f\xf6re \xf6ppen lansering"]})]}),(0,$a.jsxs)("div",{className:"actions",children:[(0,$a.jsx)(Aa,{onClick:()=>{f("confirmed"),m(Array.from({length:36}).map((e,t)=>({id:t,x:100*Math.random(),size:6+8*Math.random(),drift:240*(Math.random()-.5),spin:360+540*Math.random()*(Math.random()>.5?1:-1),dur:1.4+1*Math.random(),delay:.25*Math.random(),color:po[t%po.length]})))},$variant:"gradient",$size:"lg",$full:!0,children:"Prioritera mitt bolag"}),(0,$a.jsx)(Aa,{onClick:k,$variant:"ghost",$size:"md",$full:!0,children:"St\xe4ng"})]})]}):(0,$a.jsxs)("div",{className:"confirmed",children:[(0,$a.jsx)("div",{className:"checkmark",children:(0,$a.jsx)(Ga,{name:"check",size:36,stroke:2.5})}),(0,$a.jsx)("h3",{children:"Du st\xe5r f\xf6rst i k\xf6n."}),(0,$a.jsx)("p",{children:"Vi h\xf6r av oss direkt n\xe4r vi aktiverar f\xf6rs\xe4kringsbyten \u2014 d\xe5 f\xe5r du mellanskillnaden tillbaka utan att lyfta ett finger. Tills dess forts\xe4tter vi optimera dina \xf6vriga leverant\xf6rsavtal."}),(0,$a.jsx)("div",{style:{marginTop:24},children:(0,$a.jsx)(Aa,{onClick:k,$variant:"gradient",$size:"md",$full:!0,children:"Tillbaka till insikter"})})]})]})}),(0,$a.jsx)(Ya,{})]})},mo=wa`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,go=wa`
  0%, 100% { box-shadow: 0 0 0 0 rgba(15, 81, 50, 0.5); }
  50% { box-shadow: 0 0 0 14px rgba(15, 81, 50, 0); }
`,vo=xa.main`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,xo=xa.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.containerNarrow}};
  margin: 0 auto;
  padding: 32px 28px 80px;
  @media (max-width: 740px) { padding: 20px 18px 60px; }
`,bo=xa.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin-bottom: 24px;
  transition: color ${e=>{let{theme:t}=e;return t.motion.fast}};
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`,yo=xa.header`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;
  padding-bottom: 24px;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  animation: ${mo} 0.5s ease both;

  @media (max-width: 740px) { grid-template-columns: 1fr; }
`,ko=xa.div`
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
`,wo=xa.aside`
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
`,So=xa.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 28px;
  align-items: start;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`,jo=xa.section`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px;
  animation: ${mo} 0.5s 0.1s ease both;
  & + & { margin-top: 16px; }

  h3 {
    font-size: 19px;
    line-height: 1.3;
  }
  h3 + p { margin-top: 8px; font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; line-height: 1.55; }
`,$o=xa.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 90px;
  @media (max-width: 860px) { position: static; }
`,Eo=xa.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`,zo=xa.div`
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
`,Co=xa.div`
  margin-top: 22px;
  padding: 18px 20px;
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

  div.hero {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
  }
  span.kicker {
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
  }
  strong.overpay {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 32px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.danger}};
    font-feature-settings: "tnum";
  }
  span.overpayLabel {
    font-size: 13.5px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    font-weight: 500;
  }

  div.track {
    margin-top: 14px;
    position: relative;
    height: 6px;
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
  }
  div.suggested {
    position: absolute;
    top: -3px;
    width: 12px; height: 12px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    transform: translateX(-50%);
    box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
  div.median {
    position: absolute;
    top: -2px;
    width: 2px; height: 10px;
    background: ${e=>{let{theme:t}=e;return t.color.muted}};
    transform: translateX(-50%);
  }
  div.you {
    position: absolute;
    top: -3px;
    width: 12px; height: 12px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.danger}};
    transform: translateX(-50%);
  }

  div.legend {
    margin-top: 14px;
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    font-feature-settings: "tnum";
  }
  div.legend span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  div.dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  div.dot.suggested { background: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  div.dot.median { background: ${e=>{let{theme:t}=e;return t.color.muted}}; }
  div.dot.you { background: ${e=>{let{theme:t}=e;return t.color.danger}}; }
`,No=xa.div`
  position: relative;
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;

  a {
    color: rgba(250, 250, 247, 0.55);
    text-decoration: underline;
    text-decoration-color: rgba(250, 250, 247, 0.25);
    text-underline-offset: 3px;
    transition: color ${e=>{let{theme:t}=e;return t.motion.fast}};
  }
  a:hover {
    color: rgba(250, 250, 247, 0.85);
  }
`,_o=xa.div`
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
`,Po=xa.ul`
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
`,To=xa.ol`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`,Fo=xa.li`
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
`,Ao=xa(jo)`
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
    background: radial-gradient(circle, rgba(93, 214, 202, 0.18), transparent 60%);
    pointer-events: none;
  }
  h3 { color: #FAFAF7; position: relative; }
  p { color: rgba(250, 250, 247, 0.75); position: relative; }
`,Ro=xa.dl`
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
`,Lo=xa.div`
  position: relative;
  margin-top: 22px;
  padding: 18px 0 16px;
  border-top: 1px solid rgba(250, 250, 247, 0.12);
  border-bottom: 1px solid rgba(250, 250, 247, 0.12);
  display: flex;
  flex-direction: column;

  span.kicker {
    font-size: 12px;
    color: rgba(250, 250, 247, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }
  span.amount {
    margin-top: 6px;
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 38px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
    font-feature-settings: "tnum";
  }
  span.fineprint {
    margin-top: 10px;
    font-size: 11.5px;
    color: rgba(250, 250, 247, 0.72);
    line-height: 1.5;
    font-feature-settings: "tnum";
  }
`,Oo=xa.div`
  position: relative;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Do=xa.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 56px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
  color: #FFFFFF;
  font-size: 15.5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  animation: ${go} 2.4s ease-in-out infinite;
  transition: transform ${e=>{let{theme:t}=e;return t.motion.fast}}, box-shadow ${e=>{let{theme:t}=e;return t.motion.fast}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.brand}};
  &:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(27, 122, 110, 0.36); }
`,Mo=xa.p`
  position: relative;
  font-size: 12px;
  color: rgba(250, 250, 247, 0.75);
  margin-top: 8px;
  text-align: center;
`,Io=(xa.a`
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
`,xa.div`
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
`),Bo=xa.div`
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
`,Ho=()=>{const{id:e}=he(),t=fe(),n=ei.find(t=>t.id===e),[a,i]=(0,r.useState)("idle");if(r.useEffect(()=>{n&&n.licensePending&&t("/insights",{replace:!0})},[n,t]),!n)return(0,$a.jsxs)(vo,{children:[(0,$a.jsx)(Ia,{variant:"app"}),(0,$a.jsxs)(xo,{children:[(0,$a.jsx)("p",{children:"M\xf6jligheten kunde inte hittas."}),(0,$a.jsx)(Aa,{onClick:()=>t("/insights"),$variant:"secondary",children:"Tillbaka"})]})]});if(n.licensePending)return null;const l=n.benchmark.yourCost-n.benchmark.industryLow,o=e=>Math.max(2,Math.min(98,(e-n.benchmark.industryLow)/l*100)),s=o(n.benchmark.yourCost),u=o(n.benchmark.industryMedian),c=o(n.suggestedAnnualCost),d=netSaving(n),p=arvoFee(n);return(0,$a.jsxs)(vo,{children:[(0,$a.jsx)(Ia,{variant:"app"}),(0,$a.jsxs)(xo,{children:[(0,$a.jsxs)(bo,{onClick:()=>t("/insights"),children:[(0,$a.jsx)(Ga,{name:"arrow",size:14,stroke:2,style:{transform:"rotate(180deg)"}}),"Tillbaka till insikter"]}),(0,$a.jsxs)(yo,{children:[(0,$a.jsxs)(ko,{children:[(0,$a.jsxs)("div",{className:"tag",children:[(0,$a.jsx)(Ga,{name:n.icon,size:14,stroke:2.2}),n.category]}),(0,$a.jsxs)("h1",{children:["Byt till ",n.suggestedSupplier,".",(0,$a.jsx)("br",{}),"Spara ",ni(n.savingPerYear)," per \xe5r."]}),(0,$a.jsx)("p",{className:"lede",children:n.why})]}),(0,$a.jsxs)(wo,{children:[(0,$a.jsx)("div",{className:"kicker",children:"Din nettobesparing \xe5r 1"}),(0,$a.jsxs)("div",{className:"amount",children:["+",d.toLocaleString("sv-SE")]}),(0,$a.jsxs)("div",{className:"unit",children:["kr \xb7 efter Arvos avgift ",p.toLocaleString("sv-SE")," kr (20 %)"]})]})]}),(0,$a.jsxs)(So,{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsxs)(jo,{children:[(0,$a.jsx)("h3",{children:"Sida vid sida"}),(0,$a.jsx)("p",{children:"Identiskt t\xe4ckningsomf\xe5ng och serviceniv\xe5 \u2014 bara ett b\xe4ttre pris."}),(0,$a.jsxs)(Eo,{children:[(0,$a.jsxs)(zo,{children:[(0,$a.jsx)("span",{className:"lbl",children:"Idag"}),(0,$a.jsx)("strong",{className:"name",children:n.currentSupplier}),(0,$a.jsx)("div",{className:"cost",children:ni(n.currentAnnualCost)}),(0,$a.jsx)("div",{className:"unit",children:"per \xe5r"})]}),(0,$a.jsxs)(zo,{$best:!0,children:[(0,$a.jsx)("span",{className:"badge",children:"Rekommenderad"}),(0,$a.jsx)("span",{className:"lbl",children:"Med Arvo Flow"}),(0,$a.jsx)("strong",{className:"name",children:n.suggestedSupplier}),(0,$a.jsx)("div",{className:"cost",children:ni(n.suggestedAnnualCost)}),(0,$a.jsxs)("div",{className:"unit",children:["per \xe5r \xb7 spara ",ni(d)," netto"]})]})]}),(0,$a.jsxs)(Co,{children:[(0,$a.jsxs)("div",{className:"hero",children:[(0,$a.jsx)("span",{className:"kicker",children:"Du betalar idag"}),(0,$a.jsxs)("strong",{className:"overpay",children:[Math.round((n.benchmark.yourCost-n.benchmark.industryMedian)/n.benchmark.industryMedian*100)," %"]}),(0,$a.jsx)("span",{className:"overpayLabel",children:"\xf6ver branschsnittet"})]}),(0,$a.jsxs)("div",{className:"track",children:[(0,$a.jsx)("div",{className:"suggested",style:{left:`${c}%`}}),(0,$a.jsx)("div",{className:"median",style:{left:`${Math.max(20,Math.min(80,u))}%`}}),(0,$a.jsx)("div",{className:"you",style:{left:`${s}%`}})]}),(0,$a.jsxs)("div",{className:"legend",children:[(0,$a.jsxs)("span",{children:[(0,$a.jsx)("div",{className:"dot suggested"})," Med Arvo ",ni(n.suggestedAnnualCost)]}),(0,$a.jsxs)("span",{children:[(0,$a.jsx)("div",{className:"dot median"})," Snitt ",ni(n.benchmark.industryMedian)]}),(0,$a.jsxs)("span",{children:[(0,$a.jsx)("div",{className:"dot you"})," Du ",ni(n.benchmark.yourCost)]})]})]}),(0,$a.jsxs)(_o,{children:[(0,$a.jsx)("span",{children:"Varf\xf6r Arvo rekommenderar bytet"}),(0,$a.jsx)("p",{children:n.why})]})]}),(0,$a.jsxs)(jo,{children:[(0,$a.jsxs)("h3",{children:["Vad du f\xe5r hos ",n.suggestedSupplier]}),(0,$a.jsx)("p",{children:"Vi har verifierat att t\xe4ckning och serviceniv\xe5 motsvarar eller \xf6vertr\xe4ffar ditt nuvarande avtal."}),(0,$a.jsx)(Po,{children:n.coverage.map(e=>(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:16,stroke:2.2})," ",e]},e))})]}),(0,$a.jsxs)(jo,{children:[(0,$a.jsx)("h3",{children:"S\xe5 g\xe5r bytet till"}),(0,$a.jsx)("p",{children:"Arvo f\xf6rbereder allt \u2014 du signerar med BankID och vi sk\xf6ter resten."}),(0,$a.jsx)(To,{children:n.switchSteps.map((e,t)=>(0,$a.jsxs)(Fo,{children:[(0,$a.jsx)("div",{className:"idx",children:t+1}),(0,$a.jsx)("div",{className:"text",children:e})]},t))})]})]}),(0,$a.jsx)($o,{children:(0,$a.jsxs)(Ao,{children:[(0,$a.jsx)("h3",{children:"Godk\xe4nn bytet"}),(0,$a.jsx)("p",{children:"Vi f\xf6rbereder allt och hanterar \xf6verg\xe5ngen. Du signerar med BankID och kan \xe5ngra inom 14 dagar utan kostnad."}),(0,$a.jsxs)(Lo,{children:[(0,$a.jsx)("span",{className:"kicker",children:"Din nettobesparing \xe5r 1"}),(0,$a.jsx)("span",{className:"amount",children:ni(d)}),(0,$a.jsxs)("span",{className:"fineprint",children:["Bruttobesparing ",ni(n.savingPerYear)," \u2212 Arvos success-fee ",ni(p)," (20 %)"]})]}),(0,$a.jsxs)(Ro,{children:[(0,$a.jsxs)("div",{children:[(0,$a.jsx)("dt",{children:"Avtalstid kvar"}),(0,$a.jsx)("dd",{children:0===n.contractEndsIn?"Kan s\xe4gas upp nu":`${n.contractEndsIn} dagar`})]}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("dt",{children:"Upps\xe4gningstid"}),(0,$a.jsxs)("dd",{children:[n.cancellationNotice," dagar"]})]})]}),(0,$a.jsx)(Oo,{children:(0,$a.jsxs)(Do,{onClick:()=>{i("signing"),setTimeout(()=>i("done"),2400)},children:[(0,$a.jsx)(Ga,{name:"bankid",size:20,stroke:2,color:"#FFFFFF"}),"Godk\xe4nn byte med BankID"]})}),(0,$a.jsxs)(Mo,{children:["Vi sk\xf6ter all onboarding hos ",n.suggestedSupplier," \xe5t dig. 14 dagars \xe5ngerr\xe4tt \u2014 bytet aktiveras inte f\xf6rr\xe4n det nya avtalet \xe4r p\xe5 plats."]}),(0,$a.jsx)(No,{children:(0,$a.jsx)("a",{href:"#",onClick:e=>e.preventDefault(),children:"Mejla mig sammanfattningen ist\xe4llet"})})]})})]})]}),"signing"===a&&(0,$a.jsx)(Io,{children:(0,$a.jsxs)(Bo,{children:[(0,$a.jsx)("div",{className:"bankid",children:"B"}),(0,$a.jsx)("h3",{children:"\xd6ppna BankID-appen"}),(0,$a.jsxs)("p",{children:["Bekr\xe4fta f\xf6r att godk\xe4nna bytet till ",n.suggestedSupplier,". Du beh\xf6ver bara signera en g\xe5ng \u2014 vi sk\xf6ter resten."]}),(0,$a.jsxs)("div",{className:"dots",children:[(0,$a.jsx)("span",{}),(0,$a.jsx)("span",{}),(0,$a.jsx)("span",{})]})]})}),"done"===a&&(0,$a.jsx)(Io,{children:(0,$a.jsxs)(Bo,{children:[(0,$a.jsx)("div",{className:"success",children:(0,$a.jsx)(Ga,{name:"check",size:36,stroke:2.5,color:"#1B7A6E"})}),(0,$a.jsx)("h3",{children:"Bytet \xe4r ig\xe5ngsatt."}),(0,$a.jsxs)("p",{children:[(0,$a.jsx)("strong",{children:"Du beh\xf6ver inte g\xf6ra n\xe5got mer."})," Vi f\xf6rhandlar upps\xe4gningen med ",n.currentSupplier," och tecknar det nya avtalet med ",n.suggestedSupplier," ","\xe5t dig. Du f\xe5r bekr\xe4ftelse p\xe5 mejl n\xe4r bytet \xe4r aktiverat."]}),(0,$a.jsx)("div",{style:{marginTop:28,display:"flex",flexDirection:"column",gap:10},children:(0,$a.jsx)(Aa,{onClick:()=>{i("idle"),t("/insights")},$variant:"gradient",$size:"md",$full:!0,children:"Tillbaka till insikter"})})]})}),(0,$a.jsx)(Ya,{})]})},Vo=wa`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Uo=xa.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,Wo=xa.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 96px 28px 56px;
  text-align: center;
  animation: ${Vo} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 32px; }
`,Ko=xa.span`
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
`,Yo=xa.h1`
  margin-top: 22px;
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,qo=xa.p`
  margin: 22px auto 0;
  max-width: 640px;
  font-size: 18px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.55;
`,Go=xa.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 28px;
  @media (max-width: 740px) { padding: 32px 20px; }
`,Qo=xa.div`
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
`,Xo=xa.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,Jo=xa.div`
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
`,Zo=xa.h2`
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
`,es=xa.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin-bottom: 12px;
`,ts=xa.p`
  font-size: 16.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 640px;
  line-height: 1.55;
  margin-bottom: 32px;
`,ns=xa.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
`,rs=xa.div`
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
`,as=xa.section`
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
`,is=[{cat:"F\xf6retagsf\xf6rs\xe4kring",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Elavtal",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Mobilabonnemang",detail:"Per abonnemang som flyttas",cap:"120 kr"},{cat:"F\xf6retagsbredband",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Kortterminal",detail:"Per genomf\xf6rt byte",cap:"400 kr"},{cat:"Fakturatj\xe4nst",detail:"Per genomf\xf6rt byte",cap:"300 kr"},{cat:"Yrkesansvarsf\xf6rs\xe4kring",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"F\xf6retagsleasing",detail:"Per genomf\xf6rt byte",cap:"500 kr"}],ls=()=>(0,$a.jsxs)(Uo,{children:[(0,$a.jsx)(Ia,{variant:"public"}),(0,$a.jsxs)(Wo,{children:[(0,$a.jsxs)(Ko,{children:[(0,$a.jsx)("span",{className:"dot"})," Rankningspolicy \xb7 Senast uppdaterad 2026-04-24"]}),(0,$a.jsxs)(Yo,{children:["Vi rankar leverant\xf6rer p\xe5 ",(0,$a.jsx)("em",{children:"din"})," totalkostnad \u2014 inte v\xe5r provision."]}),(0,$a.jsx)(qo,{children:'Det h\xe4r \xe4r hela v\xe5r policy. Inga undantag, inga gr\xe5zoner, inga "premium-partners". Om en journalist en dag granskar oss vill vi att de hittar exakt det vi skrev h\xe4r.'})]}),(0,$a.jsxs)(Go,{children:[(0,$a.jsx)(es,{children:"De fyra reglerna"}),(0,$a.jsx)(Zo,{children:"Hur vi f\xf6rhindrar bias fr\xe5n dag 1."}),(0,$a.jsx)(ts,{children:"Affiliate-int\xe4kter \xe4r bra f\xf6r aff\xe4rsmodellen \u2014 men en uppenbar intressekonflikt mot kunden. Vi l\xf6ste det strukturellt, inte bara i marknadsf\xf6ringstexten."}),(0,$a.jsxs)(Qo,{children:[(0,$a.jsx)("div",{className:"num",children:"1"}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("h3",{children:"V\xe5r algoritm \xe4r publik. Och deterministisk."}),(0,$a.jsxs)("p",{children:["Vi rankar varje f\xf6rslag p\xe5 ",(0,$a.jsx)("strong",{children:"total cost of ownership \xf6ver 24 m\xe5nader minus switching cost"}),". Den som ger dig flest kronor \xf6ver p\xe5 kontot vinner \u2014 alltid. Affiliate-storlek \xe4r inte ett ing\xe5ngsv\xe4rde i scoring-funktionen."]}),(0,$a.jsxs)("pre",{children:["score(provider) =\n    annualCost(provider) * 2\n  + switchingCost(provider)        // eng\xe5ngskostnader, etablering, portering\n  - reliabilityBonus(provider)     // SLA, supportkvalitet (publik benchmark)\n  - coverageMatch(provider)        // % av nuvarande t\xe4ckning som beh\xe5lls\n\n",(0,$a.jsx)("b",{children:"// Affiliate-rate \xe4r aldrig en variabel i scoringen.\n// L\xe4gst score vinner. Vid likast\xe5nd: l\xe4gst nominellt pris f\xf6r dig."})]})]})]}),(0,$a.jsxs)(Qo,{children:[(0,$a.jsx)("div",{className:"num",children:"2"}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("h3",{children:"Affiliate-int\xe4kten \xe4r kapad \u2014 \xf6verskott g\xe5r till dig."}),(0,$a.jsx)("p",{children:"Vi accepterar en fast, kapad affiliate-avgift per leverant\xf6rskategori (se tabellen nedan). Om en leverant\xf6r vill betala mer f\xf6r att vinna oftare \u2014 d\xe5 har vi inte r\xe4tten att tj\xe4na mer p\xe5 det. \xd6verskottet l\xe4ggs i en kundbonus-pool och rabatteras tillbaka som l\xe4gre success-fee n\xe4sta kvartal."})]})]}),(0,$a.jsxs)(Qo,{children:[(0,$a.jsx)("div",{className:"num",children:"3"}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("h3",{children:"Du v\xe4ljer modell vid onboarding."}),(0,$a.jsx)("p",{children:"Vi tror p\xe5 radikal transparens, men vi vill inte heller att du beh\xf6ver lita p\xe5 oss blint. D\xe4rf\xf6r erbjuder vi tv\xe5 modeller d\xe4r du sj\xe4lv v\xe4ljer hur mycket vi f\xe5r tj\xe4na fr\xe5n affiliate-sidan."}),(0,$a.jsxs)(Xo,{children:[(0,$a.jsxs)(Jo,{children:[(0,$a.jsx)("span",{className:"tag",children:"Standard"}),(0,$a.jsx)("h4",{children:"20 % av besparing"}),(0,$a.jsx)("p",{children:"Vi beh\xe5ller affiliate-int\xe4kten upp till kapad gr\xe4ns. L\xe4gre fee f\xf6r dig."}),(0,$a.jsxs)("ul",{children:[(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:15,stroke:2.2})," Affiliate kapad enligt tabell"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:15,stroke:2.2})," \xd6verskott rabatteras till alla kunder"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:15,stroke:2.2})," Vi publicerar utbetalning per kvartal"]})]})]}),(0,$a.jsxs)(Jo,{$highlight:!0,children:[(0,$a.jsx)("span",{className:"tag",children:"Affiliate-fri"}),(0,$a.jsx)("h4",{children:"30 % av besparing"}),(0,$a.jsx)("p",{children:"All affiliate-int\xe4kt rabatteras direkt till dig. Vi tj\xe4nar bara p\xe5 success-fee."}),(0,$a.jsxs)("ul",{children:[(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:15,stroke:2.2})," Noll affiliate-int\xe4kt till oss"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:15,stroke:2.2})," Helt symmetrisk incitamentstruktur"]}),(0,$a.jsxs)("li",{children:[(0,$a.jsx)(Ga,{name:"check",size:15,stroke:2.2})," Du kan byta modell n\xe4r som helst"]})]})]})]})]})]}),(0,$a.jsxs)(Qo,{children:[(0,$a.jsx)("div",{className:"num",children:"4"}),(0,$a.jsxs)("div",{children:[(0,$a.jsx)("h3",{children:"Vi publicerar v\xe5ra rekommendationsstatistik kvartalsvis."}),(0,$a.jsx)("p",{children:"Varje kvartal publiceras hur ofta varje leverant\xf6r rekommenderas, hur mycket affiliate som faktiskt utbetalats, och hur stor andel av besparing-poolen som rabatterats. Granska oss. Det g\xf6r branschen \xe4rligare."})]})]})]}),(0,$a.jsxs)(Go,{children:[(0,$a.jsx)(es,{children:"Affiliate-tak per kategori"}),(0,$a.jsx)(Zo,{children:"Det h\xe4r \xe4r max vi f\xe5r ta \u2014 oavsett vad leverant\xf6ren vill betala."}),(0,$a.jsx)(ts,{children:"Taken \xe4r satta f\xf6r att rymma normal industri-affiliate utan att skapa incitament att favorisera en viss leverant\xf6r."}),(0,$a.jsxs)(ns,{children:[(0,$a.jsxs)(rs,{className:"header",children:[(0,$a.jsx)("div",{children:"Kategori"}),(0,$a.jsx)("div",{children:"M\xe4tpunkt"}),(0,$a.jsx)("div",{style:{textAlign:"right"},children:"Tak"})]}),is.map(e=>(0,$a.jsxs)(rs,{children:[(0,$a.jsx)("div",{className:"cat",children:e.cat}),(0,$a.jsx)("div",{className:"detail",children:e.detail}),(0,$a.jsx)("div",{className:"cap",children:e.cap})]},e.cat))]})]}),(0,$a.jsxs)(as,{children:[(0,$a.jsx)("h2",{children:"Det h\xe4r \xe4r inte marknadsf\xf6ring. Det h\xe4r \xe4r arkitektur."}),(0,$a.jsxs)("p",{children:["Om du uppt\xe4cker att vi bryter mot n\xe5gon av reglerna ovan \u2014 mejla"," ",(0,$a.jsx)("a",{href:"mailto:transparens@arvo.flow",style:{textDecoration:"underline"},children:"transparens@arvo.flow"}),". Vi svarar inom 48 h, publikt."]}),(0,$a.jsxs)("div",{className:"actions",children:[(0,$a.jsxs)(Aa,{as:xt,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox ",(0,$a.jsx)(Ga,{name:"arrow",size:18})]}),(0,$a.jsx)(Aa,{as:xt,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$a.jsx)(Ya,{})]}),os=()=>(0,$a.jsxs)(ca,{theme:Sa,children:[(0,$a.jsx)(ja,{}),(0,$a.jsx)(gt,{basename:"/flow",children:(0,$a.jsxs)(Oe,{children:[(0,$a.jsx)(Re,{path:"/",element:(0,$a.jsx)(Wi,{})}),(0,$a.jsx)(Re,{path:"/connect",element:(0,$a.jsx)(pl,{})}),(0,$a.jsx)(Re,{path:"/scanning",element:(0,$a.jsx)(_l,{})}),(0,$a.jsx)(Re,{path:"/insights",element:(0,$a.jsx)(ho,{})}),(0,$a.jsx)(Re,{path:"/opportunity/:id",element:(0,$a.jsx)(Ho,{})}),(0,$a.jsx)(Re,{path:"/bias",element:(0,$a.jsx)(ls,{})}),(0,$a.jsx)(Re,{path:"*",element:(0,$a.jsx)(Ae,{to:"/",replace:!0})})]})})]});(0,i.createRoot)(document.getElementById("root")).render((0,$a.jsx)(os,{}))})();
//# sourceMappingURL=main.af9ffc56.js.map