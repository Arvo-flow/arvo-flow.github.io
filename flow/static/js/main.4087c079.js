/*! For license information please see main.4087c079.js.LICENSE.txt */
(()=>{"use strict";var e={4(e,t,n){var r=n(853),a=n(43),i=n(950);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function s(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function c(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function d(e){if(31===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function u(e){if(s(e)!==e)throw Error(o(188))}function p(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=p(e)))return t;e=e.sibling}return null}var h=Object.assign,f=Symbol.for("react.element"),m=Symbol.for("react.transitional.element"),g=Symbol.for("react.portal"),x=Symbol.for("react.fragment"),v=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),y=Symbol.for("react.consumer"),k=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),S=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),_=Symbol.for("react.lazy");Symbol.for("react.scope");var E=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var z=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var N=Symbol.iterator;function A(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=N&&e[N]||e["@@iterator"])?e:null}var C=Symbol.for("react.client.reference");function F(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===C?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case x:return"Fragment";case b:return"Profiler";case v:return"StrictMode";case w:return"Suspense";case S:return"SuspenseList";case E:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case g:return"Portal";case k:return e.displayName||"Context";case y:return(e._context.displayName||"Context")+".Consumer";case j:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case $:return null!==(t=e.displayName||null)?t:F(e.type)||"Memo";case _:t=e._payload,e=e._init;try{return F(e(t))}catch(qs){}}return null}var T=Array.isArray,P=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,R={pending:!1,data:null,method:null,action:null},L=[],O=-1;function I(e){return{current:e}}function B(e){0>O||(e.current=L[O],L[O]=null,O--)}function M(e,t){O++,L[O]=e.current,e.current=t}var U,V,K=I(null),H=I(null),W=I(null),q=I(null);function Y(e,t){switch(M(W,t),M(H,e),M(K,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?vu(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=bu(t=vu(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}B(K),M(K,e)}function G(){B(K),B(H),B(W)}function Q(e){null!==e.memoizedState&&M(q,e);var t=K.current,n=bu(t,e.type);t!==n&&(M(H,e),M(K,n))}function J(e){H.current===e&&(B(K),B(H)),q.current===e&&(B(q),up._currentValue=R)}function X(e){if(void 0===U)try{throw Error()}catch(qs){var t=qs.stack.trim().match(/\n( *(at )?)/);U=t&&t[1]||"",V=-1<qs.stack.indexOf("\n    at")?" (<anonymous>)":-1<qs.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+U+e+V}var Z=!1;function ee(e,t){if(!e||Z)return"";Z=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(n,[])}catch(qs){var r=qs}Reflect.construct(e,[],n)}else{try{n.call()}catch(a){r=a}e.call(n.prototype)}}else{try{throw Error()}catch(i){r=i}(n=e())&&"function"===typeof n.catch&&n.catch(function(){})}}catch(o){if(o&&r&&"string"===typeof o.stack)return[o.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=r.DetermineComponentFrameRoot(),o=i[0],l=i[1];if(o&&l){var s=o.split("\n"),c=l.split("\n");for(a=r=0;r<s.length&&!s[r].includes("DetermineComponentFrameRoot");)r++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(r===s.length||a===c.length)for(r=s.length-1,a=c.length-1;1<=r&&0<=a&&s[r]!==c[a];)a--;for(;1<=r&&0<=a;r--,a--)if(s[r]!==c[a]){if(1!==r||1!==a)do{if(r--,0>--a||s[r]!==c[a]){var d="\n"+s[r].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}}while(1<=r&&0<=a);break}}}finally{Z=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?X(n):""}function te(e,t){switch(e.tag){case 26:case 27:case 5:return X(e.type);case 16:return X("Lazy");case 13:return e.child!==t&&null!==t?X("Suspense Fallback"):X("Suspense");case 19:return X("SuspenseList");case 0:case 15:return ee(e.type,!1);case 11:return ee(e.type.render,!1);case 1:return ee(e.type,!0);case 31:return X("Activity");default:return""}}function ne(e){try{var t="",n=null;do{t+=te(e,n),n=e,e=e.return}while(e);return t}catch(qs){return"\nError generating stack: "+qs.message+"\n"+qs.stack}}var re=Object.prototype.hasOwnProperty,ae=r.unstable_scheduleCallback,ie=r.unstable_cancelCallback,oe=r.unstable_shouldYield,le=r.unstable_requestPaint,se=r.unstable_now,ce=r.unstable_getCurrentPriorityLevel,de=r.unstable_ImmediatePriority,ue=r.unstable_UserBlockingPriority,pe=r.unstable_NormalPriority,he=r.unstable_LowPriority,fe=r.unstable_IdlePriority,me=r.log,ge=r.unstable_setDisableYieldValue,xe=null,ve=null;function be(e){if("function"===typeof me&&ge(e),ve&&"function"===typeof ve.setStrictMode)try{ve.setStrictMode(xe,e)}catch(t){}}var ye=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ke(e)/je|0)|0},ke=Math.log,je=Math.LN2;var we=256,Se=262144,$e=4194304;function _e(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return 261888&e;case 262144:case 524288:case 1048576:case 2097152:return 3932160&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ee(e,t,n){var r=e.pendingLanes;if(0===r)return 0;var a=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var l=134217727&r;return 0!==l?0!==(r=l&~i)?a=_e(r):0!==(o&=l)?a=_e(o):n||0!==(n=l&~e)&&(a=_e(n)):0!==(l=r&~i)?a=_e(l):0!==o?a=_e(o):n||0!==(n=r&~e)&&(a=_e(n)),0===a?0:0!==t&&t!==a&&0===(t&i)&&((i=a&-a)>=(n=t&-t)||32===i&&0!==(4194048&n))?t:a}function ze(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function Ne(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function Ae(){var e=$e;return 0===(62914560&($e<<=1))&&($e=4194304),e}function Ce(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Fe(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Te(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ye(t);e.entangledLanes|=t,e.entanglements[r]=1073741824|e.entanglements[r]|261930&n}function Pe(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ye(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}function De(e,t){var n=t&-t;return 0!==((n=0!==(42&n)?1:Re(n))&(e.suspendedLanes|t))?0:n}function Re(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Le(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function Oe(){var e=D.p;return 0!==e?e:void 0===(e=window.event)?32:Ep(e.type)}function Ie(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var Be=Math.random().toString(36).slice(2),Me="__reactFiber$"+Be,Ue="__reactProps$"+Be,Ve="__reactContainer$"+Be,Ke="__reactEvents$"+Be,He="__reactListeners$"+Be,We="__reactHandles$"+Be,qe="__reactResources$"+Be,Ye="__reactMarker$"+Be;function Ge(e){delete e[Me],delete e[Ue],delete e[Ke],delete e[He],delete e[We]}function Qe(e){var t=e[Me];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ve]||n[Me]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=Lu(e);null!==e;){if(n=e[Me])return n;e=Lu(e)}return t}n=(e=n).parentNode}return null}function Je(e){if(e=e[Me]||e[Ve]){var t=e.tag;if(5===t||6===t||13===t||31===t||26===t||27===t||3===t)return e}return null}function Xe(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(o(33))}function Ze(e){var t=e[qe];return t||(t=e[qe]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function et(e){e[Ye]=!0}var tt=new Set,nt={};function rt(e,t){at(e,t),at(e+"Capture",t)}function at(e,t){for(nt[e]=t,e=0;e<t.length;e++)tt.add(t[e])}var it=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ot={},lt={};function st(e,t,n){if(a=t,re.call(lt,a)||!re.call(ot,a)&&(it.test(a)?lt[a]=!0:(ot[a]=!0,0)))if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var r=t.toLowerCase().slice(0,5);if("data-"!==r&&"aria-"!==r)return void e.removeAttribute(t)}e.setAttribute(t,""+n)}var a}function ct(e,t,n){if(null===n)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+n)}}function dt(e,t,n,r){if(null===r)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(n)}e.setAttributeNS(t,n,""+r)}}function ut(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function pt(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function ht(e){if(!e._valueTracker){var t=pt(e)?"checked":"value";e._valueTracker=function(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&"undefined"!==typeof r&&"function"===typeof r.get&&"function"===typeof r.set){var a=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){n=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e,t,""+e[t])}}function ft(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=pt(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function mt(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var gt=/[\n"\\]/g;function xt(e){return e.replace(gt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vt(e,t,n,r,a,i,o,l){e.name="",null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o?e.type=o:e.removeAttribute("type"),null!=t?"number"===o?(0===t&&""===e.value||e.value!=t)&&(e.value=""+ut(t)):e.value!==""+ut(t)&&(e.value=""+ut(t)):"submit"!==o&&"reset"!==o||e.removeAttribute("value"),null!=t?yt(e,o,ut(t)):null!=n?yt(e,o,ut(n)):null!=r&&e.removeAttribute("value"),null==a&&null!=i&&(e.defaultChecked=!!i),null!=a&&(e.checked=a&&"function"!==typeof a&&"symbol"!==typeof a),null!=l&&"function"!==typeof l&&"symbol"!==typeof l&&"boolean"!==typeof l?e.name=""+ut(l):e.removeAttribute("name")}function bt(e,t,n,r,a,i,o,l){if(null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.type=i),null!=t||null!=n){if(!("submit"!==i&&"reset"!==i||void 0!==t&&null!==t))return void ht(e);n=null!=n?""+ut(n):"",t=null!=t?""+ut(t):n,l||t===e.value||(e.value=t),e.defaultValue=t}r="function"!==typeof(r=null!=r?r:a)&&"symbol"!==typeof r&&!!r,e.checked=l?e.checked:!!r,e.defaultChecked=!!r,null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o&&(e.name=o),ht(e)}function yt(e,t,n){"number"===t&&mt(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function kt(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ut(n),t=null,a=0;a<e.length;a++){if(e[a].value===n)return e[a].selected=!0,void(r&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function jt(e,t,n){null==t||((t=""+ut(t))!==e.value&&(e.value=t),null!=n)?e.defaultValue=null!=n?""+ut(n):"":e.defaultValue!==t&&(e.defaultValue=t)}function wt(e,t,n,r){if(null==t){if(null!=r){if(null!=n)throw Error(o(92));if(T(r)){if(1<r.length)throw Error(o(93));r=r[0]}n=r}null==n&&(n=""),t=n}n=ut(t),e.defaultValue=n,(r=e.textContent)===n&&""!==r&&null!==r&&(e.value=r),ht(e)}function St(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var $t=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function _t(e,t,n){var r=0===t.indexOf("--");null==n||"boolean"===typeof n||""===n?r?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":r?e.setProperty(t,n):"number"!==typeof n||0===n||$t.has(t)?"float"===t?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Et(e,t,n){if(null!=t&&"object"!==typeof t)throw Error(o(62));if(e=e.style,null!=n){for(var r in n)!n.hasOwnProperty(r)||null!=t&&t.hasOwnProperty(r)||(0===r.indexOf("--")?e.setProperty(r,""):"float"===r?e.cssFloat="":e[r]="");for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&_t(e,a,r)}else for(var i in t)t.hasOwnProperty(i)&&_t(e,i,t[i])}function zt(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nt=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),At=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ct(e){return At.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ft(){}var Tt=null;function Pt(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Dt=null,Rt=null;function Lt(e){var t=Je(e);if(t&&(e=t.stateNode)){var n=e[Ue]||null;e:switch(e=t.stateNode,t.type){case"input":if(vt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+xt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Ue]||null;if(!a)throw Error(o(90));vt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)(r=n[t]).form===e.form&&ft(r)}break e;case"textarea":jt(e,n.value,n.defaultValue);break e;case"select":null!=(t=n.value)&&kt(e,!!n.multiple,t,!1)}}}var Ot=!1;function It(e,t,n){if(Ot)return e(t,n);Ot=!0;try{return e(t)}finally{if(Ot=!1,(null!==Dt||null!==Rt)&&(ed(),Dt&&(t=Dt,e=Rt,Rt=Dt=null,Lt(t),e)))for(t=0;t<e.length;t++)Lt(e[t])}}function Bt(e,t){var n=e.stateNode;if(null===n)return null;var r=n[Ue]||null;if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!==typeof n)throw Error(o(231,t,typeof n));return n}var Mt=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Ut=!1;if(Mt)try{var Vt={};Object.defineProperty(Vt,"passive",{get:function(){Ut=!0}}),window.addEventListener("test",Vt,Vt),window.removeEventListener("test",Vt,Vt)}catch(Xp){Ut=!1}var Kt=null,Ht=null,Wt=null;function qt(){if(Wt)return Wt;var e,t,n=Ht,r=n.length,a="value"in Kt?Kt.value:Kt.textContent,i=a.length;for(e=0;e<r&&n[e]===a[e];e++);var o=r-e;for(t=1;t<=o&&n[r-t]===a[i-t];t++);return Wt=a.slice(e,1<t?1-t:void 0)}function Yt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Gt(){return!0}function Qt(){return!1}function Jt(e){function t(t,n,r,a,i){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=a,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(a):a[o]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?Gt:Qt,this.isPropagationStopped=Qt,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Gt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Gt)},persist:function(){},isPersistent:Gt}),t}var Xt,Zt,en,tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},nn=Jt(tn),rn=h({},tn,{view:0,detail:0}),an=Jt(rn),on=h({},rn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==en&&(en&&"mousemove"===e.type?(Xt=e.screenX-en.screenX,Zt=e.screenY-en.screenY):Zt=Xt=0,en=e),Xt)},movementY:function(e){return"movementY"in e?e.movementY:Zt}}),ln=Jt(on),sn=Jt(h({},on,{dataTransfer:0})),cn=Jt(h({},rn,{relatedTarget:0})),dn=Jt(h({},tn,{animationName:0,elapsedTime:0,pseudoElement:0})),un=Jt(h({},tn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),pn=Jt(h({},tn,{data:0})),hn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},fn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=mn[e])&&!!t[e]}function xn(){return gn}var vn=Jt(h({},rn,{key:function(e){if(e.key){var t=hn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Yt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?fn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xn,charCode:function(e){return"keypress"===e.type?Yt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Yt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),bn=Jt(h({},on,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),yn=Jt(h({},rn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xn})),kn=Jt(h({},tn,{propertyName:0,elapsedTime:0,pseudoElement:0})),jn=Jt(h({},on,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),wn=Jt(h({},tn,{newState:0,oldState:0})),Sn=[9,13,27,32],$n=Mt&&"CompositionEvent"in window,_n=null;Mt&&"documentMode"in document&&(_n=document.documentMode);var En=Mt&&"TextEvent"in window&&!_n,zn=Mt&&(!$n||_n&&8<_n&&11>=_n),Nn=String.fromCharCode(32),An=!1;function Cn(e,t){switch(e){case"keyup":return-1!==Sn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fn(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Tn=!1;var Pn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Dn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Pn[e.type]:"textarea"===t}function Rn(e,t,n,r){Dt?Rt?Rt.push(r):Rt=[r]:Dt=r,0<(t=au(t,"onChange")).length&&(n=new nn("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ln=null,On=null;function In(e){Qd(e,0)}function Bn(e){if(ft(Xe(e)))return e}function Mn(e,t){if("change"===e)return t}var Un=!1;if(Mt){var Vn;if(Mt){var Kn="oninput"in document;if(!Kn){var Hn=document.createElement("div");Hn.setAttribute("oninput","return;"),Kn="function"===typeof Hn.oninput}Vn=Kn}else Vn=!1;Un=Vn&&(!document.documentMode||9<document.documentMode)}function Wn(){Ln&&(Ln.detachEvent("onpropertychange",qn),On=Ln=null)}function qn(e){if("value"===e.propertyName&&Bn(On)){var t=[];Rn(t,On,e,Pt(e)),It(In,t)}}function Yn(e,t,n){"focusin"===e?(Wn(),On=n,(Ln=t).attachEvent("onpropertychange",qn)):"focusout"===e&&Wn()}function Gn(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Bn(On)}function Qn(e,t){if("click"===e)return Bn(t)}function Jn(e,t){if("input"===e||"change"===e)return Bn(t)}var Xn="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function Zn(e,t){if(Xn(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!re.call(t,a)||!Xn(e[a],t[a]))return!1}return!0}function er(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function tr(e,t){var n,r=er(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=er(r)}}function nr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?nr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function rr(e){for(var t=mt((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var n="string"===typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=mt((e=t.contentWindow).document)}return t}function ar(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var ir=Mt&&"documentMode"in document&&11>=document.documentMode,or=null,lr=null,sr=null,cr=!1;function dr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;cr||null==or||or!==mt(r)||("selectionStart"in(r=or)&&ar(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},sr&&Zn(sr,r)||(sr=r,0<(r=au(lr,"onSelect")).length&&(t=new nn("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=or)))}function ur(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var pr={animationend:ur("Animation","AnimationEnd"),animationiteration:ur("Animation","AnimationIteration"),animationstart:ur("Animation","AnimationStart"),transitionrun:ur("Transition","TransitionRun"),transitionstart:ur("Transition","TransitionStart"),transitioncancel:ur("Transition","TransitionCancel"),transitionend:ur("Transition","TransitionEnd")},hr={},fr={};function mr(e){if(hr[e])return hr[e];if(!pr[e])return e;var t,n=pr[e];for(t in n)if(n.hasOwnProperty(t)&&t in fr)return hr[e]=n[t];return e}Mt&&(fr=document.createElement("div").style,"AnimationEvent"in window||(delete pr.animationend.animation,delete pr.animationiteration.animation,delete pr.animationstart.animation),"TransitionEvent"in window||delete pr.transitionend.transition);var gr=mr("animationend"),xr=mr("animationiteration"),vr=mr("animationstart"),br=mr("transitionrun"),yr=mr("transitionstart"),kr=mr("transitioncancel"),jr=mr("transitionend"),wr=new Map,Sr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $r(e,t){wr.set(e,t),rt(t,[e])}Sr.push("scrollEnd");var _r="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},Er=[],zr=0,Nr=0;function Ar(){for(var e=zr,t=Nr=zr=0;t<e;){var n=Er[t];Er[t++]=null;var r=Er[t];Er[t++]=null;var a=Er[t];Er[t++]=null;var i=Er[t];if(Er[t++]=null,null!==r&&null!==a){var o=r.pending;null===o?a.next=a:(a.next=o.next,o.next=a),r.pending=a}0!==i&&Pr(n,a,i)}}function Cr(e,t,n,r){Er[zr++]=e,Er[zr++]=t,Er[zr++]=n,Er[zr++]=r,Nr|=r,e.lanes|=r,null!==(e=e.alternate)&&(e.lanes|=r)}function Fr(e,t,n,r){return Cr(e,t,n,r),Dr(e)}function Tr(e,t){return Cr(e,null,null,t),Dr(e)}function Pr(e,t,n){e.lanes|=n;var r=e.alternate;null!==r&&(r.lanes|=n);for(var a=!1,i=e.return;null!==i;)i.childLanes|=n,null!==(r=i.alternate)&&(r.childLanes|=n),22===i.tag&&(null===(e=i.stateNode)||1&e._visibility||(a=!0)),e=i,i=i.return;return 3===e.tag?(i=e.stateNode,a&&null!==t&&(a=31-ye(n),null===(r=(e=i.hiddenUpdates)[a])?e[a]=[t]:r.push(t),t.lane=536870912|n),i):null}function Dr(e){if(50<Hc)throw Hc=0,Wc=null,Error(o(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Rr={};function Lr(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Or(e,t,n,r){return new Lr(e,t,n,r)}function Ir(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Br(e,t){var n=e.alternate;return null===n?((n=Or(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=65011712&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Mr(e,t){e.flags&=65011714;var n=e.alternate;return null===n?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ur(e,t,n,r,a,i){var l=0;if(r=e,"function"===typeof e)Ir(e)&&(l=1);else if("string"===typeof e)l=function(e,t,n){if(1===n||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,n,K.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case E:return(e=Or(31,n,t,a)).elementType=E,e.lanes=i,e;case x:return Vr(n.children,a,i,t);case v:l=8,a|=24;break;case b:return(e=Or(12,n,t,2|a)).elementType=b,e.lanes=i,e;case w:return(e=Or(13,n,t,a)).elementType=w,e.lanes=i,e;case S:return(e=Or(19,n,t,a)).elementType=S,e.lanes=i,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case k:l=10;break e;case y:l=9;break e;case j:l=11;break e;case $:l=14;break e;case _:l=16,r=null;break e}l=29,n=Error(o(130,null===e?"null":typeof e,"")),r=null}return(t=Or(l,n,t,a)).elementType=e,t.type=r,t.lanes=i,t}function Vr(e,t,n,r){return(e=Or(7,e,r,t)).lanes=n,e}function Kr(e,t,n){return(e=Or(6,e,null,t)).lanes=n,e}function Hr(e){var t=Or(18,null,null,0);return t.stateNode=e,t}function Wr(e,t,n){return(t=Or(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qr=new WeakMap;function Yr(e,t){if("object"===typeof e&&null!==e){var n=qr.get(e);return void 0!==n?n:(t={value:e,source:t,stack:ne(t)},qr.set(e,t),t)}return{value:e,source:t,stack:ne(t)}}var Gr=[],Qr=0,Jr=null,Xr=0,Zr=[],ea=0,ta=null,na=1,ra="";function aa(e,t){Gr[Qr++]=Xr,Gr[Qr++]=Jr,Jr=e,Xr=t}function ia(e,t,n){Zr[ea++]=na,Zr[ea++]=ra,Zr[ea++]=ta,ta=e;var r=na;e=ra;var a=32-ye(r)-1;r&=~(1<<a),n+=1;var i=32-ye(t)+a;if(30<i){var o=a-a%5;i=(r&(1<<o)-1).toString(32),r>>=o,a-=o,na=1<<32-ye(t)+a|n<<a|r,ra=i+e}else na=1<<i|n<<a|r,ra=e}function oa(e){null!==e.return&&(aa(e,1),ia(e,1,0))}function la(e){for(;e===Jr;)Jr=Gr[--Qr],Gr[Qr]=null,Xr=Gr[--Qr],Gr[Qr]=null;for(;e===ta;)ta=Zr[--ea],Zr[ea]=null,ra=Zr[--ea],Zr[ea]=null,na=Zr[--ea],Zr[ea]=null}function sa(e,t){Zr[ea++]=na,Zr[ea++]=ra,Zr[ea++]=ta,na=t.id,ra=t.overflow,ta=e}var ca=null,da=null,ua=!1,pa=null,ha=!1,fa=Error(o(519));function ma(e){throw ka(Yr(Error(o(418,1<arguments.length&&void 0!==arguments[1]&&arguments[1]?"text":"HTML","")),e)),fa}function ga(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Me]=e,t[Ue]=r,n){case"dialog":Jd("cancel",t),Jd("close",t);break;case"iframe":case"object":case"embed":Jd("load",t);break;case"video":case"audio":for(n=0;n<Yd.length;n++)Jd(Yd[n],t);break;case"source":Jd("error",t);break;case"img":case"image":case"link":Jd("error",t),Jd("load",t);break;case"details":Jd("toggle",t);break;case"input":Jd("invalid",t),bt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":Jd("invalid",t);break;case"textarea":Jd("invalid",t),wt(t,r.value,r.defaultValue,r.children)}"string"!==typeof(n=r.children)&&"number"!==typeof n&&"bigint"!==typeof n||t.textContent===""+n||!0===r.suppressHydrationWarning||du(t.textContent,n)?(null!=r.popover&&(Jd("beforetoggle",t),Jd("toggle",t)),null!=r.onScroll&&Jd("scroll",t),null!=r.onScrollEnd&&Jd("scrollend",t),null!=r.onClick&&(t.onclick=Ft),t=!0):t=!1,t||ma(e,!0)}function xa(e){for(ca=e.return;ca;)switch(ca.tag){case 5:case 31:case 13:return void(ha=!1);case 27:case 3:return void(ha=!0);default:ca=ca.return}}function va(e){if(e!==ca)return!1;if(!ua)return xa(e),ua=!0,!1;var t,n=e.tag;if((t=3!==n&&27!==n)&&((t=5===n)&&(t=!("form"!==(t=e.type)&&"button"!==t)||yu(e.type,e.memoizedProps)),t=!t),t&&da&&ma(e),xa(e),13===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));da=Ru(e)}else if(31===n){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));da=Ru(e)}else 27===n?(n=da,Eu(e.type)?(e=Du,Du=null,da=e):da=n):da=ca?Pu(e.stateNode.nextSibling):null;return!0}function ba(){da=ca=null,ua=!1}function ya(){var e=pa;return null!==e&&(null===Cc?Cc=e:Cc.push.apply(Cc,e),pa=null),e}function ka(e){null===pa?pa=[e]:pa.push(e)}var ja=I(null),wa=null,Sa=null;function $a(e,t,n){M(ja,t._currentValue),t._currentValue=n}function _a(e){e._currentValue=ja.current,B(ja)}function Ea(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function za(e,t,n,r){var a=e.child;for(null!==a&&(a.return=e);null!==a;){var i=a.dependencies;if(null!==i){var l=a.child;i=i.firstContext;e:for(;null!==i;){var s=i;i=a;for(var c=0;c<t.length;c++)if(s.context===t[c]){i.lanes|=n,null!==(s=i.alternate)&&(s.lanes|=n),Ea(i.return,n,e),r||(l=null);break e}i=s.next}}else if(18===a.tag){if(null===(l=a.return))throw Error(o(341));l.lanes|=n,null!==(i=l.alternate)&&(i.lanes|=n),Ea(l,n,e),l=null}else l=a.child;if(null!==l)l.return=a;else for(l=a;null!==l;){if(l===e){l=null;break}if(null!==(a=l.sibling)){a.return=l.return,l=a;break}l=l.return}a=l}}function Na(e,t,n,r){e=null;for(var a=t,i=!1;null!==a;){if(!i)if(0!==(524288&a.flags))i=!0;else if(0!==(262144&a.flags))break;if(10===a.tag){var l=a.alternate;if(null===l)throw Error(o(387));if(null!==(l=l.memoizedProps)){var s=a.type;Xn(a.pendingProps.value,l.value)||(null!==e?e.push(s):e=[s])}}else if(a===q.current){if(null===(l=a.alternate))throw Error(o(387));l.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(null!==e?e.push(up):e=[up])}a=a.return}null!==e&&za(t,e,n,r),t.flags|=262144}function Aa(e){for(e=e.firstContext;null!==e;){if(!Xn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ca(e){wa=e,Sa=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Fa(e){return Pa(wa,e)}function Ta(e,t){return null===wa&&Ca(e),Pa(e,t)}function Pa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},null===Sa){if(null===e)throw Error(o(308));Sa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Sa=Sa.next=t;return n}var Da="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Ra=r.unstable_scheduleCallback,La=r.unstable_NormalPriority,Oa={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ia(){return{controller:new Da,data:new Map,refCount:0}}function Ba(e){e.refCount--,0===e.refCount&&Ra(La,function(){e.controller.abort()})}var Ma=null,Ua=0,Va=0,Ka=null;function Ha(){if(0===--Ua&&null!==Ma){null!==Ka&&(Ka.status="fulfilled");var e=Ma;Ma=null,Va=0,Ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Wa=P.S;P.S=function(e,t){Pc=se(),"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Ma){var n=Ma=[];Ua=0,Va=Vd(),Ka={status:"pending",value:void 0,then:function(e){n.push(e)}}}Ua++,t.then(Ha,Ha)}(0,t),null!==Wa&&Wa(e,t)};var qa=I(null);function Ya(){var e=qa.current;return null!==e?e:mc.pooledCache}function Ga(e,t){M(qa,null===t?qa.current:t.pool)}function Qa(){var e=Ya();return null===e?null:{parent:Oa._currentValue,pool:e}}var Ja=Error(o(460)),Xa=Error(o(474)),Za=Error(o(542)),ei={then:function(){}};function ti(e){return"fulfilled"===(e=e.status)||"rejected"===e}function ni(e,t,n){switch(void 0===(n=e[n])?e.push(t):n!==t&&(t.then(Ft,Ft),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e;default:if("string"===typeof t.status)t.then(Ft,Ft);else{if(null!==(e=mc)&&100<e.shellSuspendCounter)throw Error(o(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var n=t;n.status="fulfilled",n.value=e}},function(e){if("pending"===t.status){var n=t;n.status="rejected",n.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e}throw ai=t,Ja}}function ri(e){try{return(0,e._init)(e._payload)}catch(qs){if(null!==qs&&"object"===typeof qs&&"function"===typeof qs.then)throw ai=qs,Ja;throw qs}}var ai=null;function ii(){if(null===ai)throw Error(o(459));var e=ai;return ai=null,e}function oi(e){if(e===Ja||e===Za)throw Error(o(483))}var li=null,si=0;function ci(e){var t=si;return si+=1,null===li&&(li=[]),ni(li,e,t)}function di(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function ui(e,t){if(t.$$typeof===f)throw Error(o(525));throw e=Object.prototype.toString.call(t),Error(o(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function pi(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function a(e,t){return(e=Br(e,t)).index=0,e.sibling=null,e}function i(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=67108866,n):r:(t.flags|=67108866,n):(t.flags|=1048576,n)}function l(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function s(e,t,n,r){return null===t||6!==t.tag?((t=Kr(n,e.mode,r)).return=e,t):((t=a(t,n)).return=e,t)}function c(e,t,n,r){var i=n.type;return i===x?u(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===i||"object"===typeof i&&null!==i&&i.$$typeof===_&&ri(i)===t.type)?(di(t=a(t,n.props),n),t.return=e,t):(di(t=Ur(n.type,n.key,n.props,null,e.mode,r),n),t.return=e,t)}function d(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Wr(n,e.mode,r)).return=e,t):((t=a(t,n.children||[])).return=e,t)}function u(e,t,n,r,i){return null===t||7!==t.tag?((t=Vr(n,e.mode,r,i)).return=e,t):((t=a(t,n)).return=e,t)}function p(e,t,n){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=Kr(""+t,e.mode,n)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case m:return di(n=Ur(t.type,t.key,t.props,null,e.mode,n),t),n.return=e,n;case g:return(t=Wr(t,e.mode,n)).return=e,t;case _:return p(e,t=ri(t),n)}if(T(t)||A(t))return(t=Vr(t,e.mode,n,null)).return=e,t;if("function"===typeof t.then)return p(e,ci(t),n);if(t.$$typeof===k)return p(e,Ta(e,t),n);ui(e,t)}return null}function h(e,t,n,r){var a=null!==t?t.key:null;if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return null!==a?null:s(e,t,""+n,r);if("object"===typeof n&&null!==n){switch(n.$$typeof){case m:return n.key===a?c(e,t,n,r):null;case g:return n.key===a?d(e,t,n,r):null;case _:return h(e,t,n=ri(n),r)}if(T(n)||A(n))return null!==a?null:u(e,t,n,r,null);if("function"===typeof n.then)return h(e,t,ci(n),r);if(n.$$typeof===k)return h(e,t,Ta(e,n),r);ui(e,n)}return null}function f(e,t,n,r,a){if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return s(t,e=e.get(n)||null,""+r,a);if("object"===typeof r&&null!==r){switch(r.$$typeof){case m:return c(t,e=e.get(null===r.key?n:r.key)||null,r,a);case g:return d(t,e=e.get(null===r.key?n:r.key)||null,r,a);case _:return f(e,t,n,r=ri(r),a)}if(T(r)||A(r))return u(t,e=e.get(n)||null,r,a,null);if("function"===typeof r.then)return f(e,t,n,ci(r),a);if(r.$$typeof===k)return f(e,t,n,Ta(t,r),a);ui(t,r)}return null}function v(s,c,d,u){if("object"===typeof d&&null!==d&&d.type===x&&null===d.key&&(d=d.props.children),"object"===typeof d&&null!==d){switch(d.$$typeof){case m:e:{for(var b=d.key;null!==c;){if(c.key===b){if((b=d.type)===x){if(7===c.tag){n(s,c.sibling),(u=a(c,d.props.children)).return=s,s=u;break e}}else if(c.elementType===b||"object"===typeof b&&null!==b&&b.$$typeof===_&&ri(b)===c.type){n(s,c.sibling),di(u=a(c,d.props),d),u.return=s,s=u;break e}n(s,c);break}t(s,c),c=c.sibling}d.type===x?((u=Vr(d.props.children,s.mode,u,d.key)).return=s,s=u):(di(u=Ur(d.type,d.key,d.props,null,s.mode,u),d),u.return=s,s=u)}return l(s);case g:e:{for(b=d.key;null!==c;){if(c.key===b){if(4===c.tag&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){n(s,c.sibling),(u=a(c,d.children||[])).return=s,s=u;break e}n(s,c);break}t(s,c),c=c.sibling}(u=Wr(d,s.mode,u)).return=s,s=u}return l(s);case _:return v(s,c,d=ri(d),u)}if(T(d))return function(a,o,l,s){for(var c=null,d=null,u=o,m=o=0,g=null;null!==u&&m<l.length;m++){u.index>m?(g=u,u=null):g=u.sibling;var x=h(a,u,l[m],s);if(null===x){null===u&&(u=g);break}e&&u&&null===x.alternate&&t(a,u),o=i(x,o,m),null===d?c=x:d.sibling=x,d=x,u=g}if(m===l.length)return n(a,u),ua&&aa(a,m),c;if(null===u){for(;m<l.length;m++)null!==(u=p(a,l[m],s))&&(o=i(u,o,m),null===d?c=u:d.sibling=u,d=u);return ua&&aa(a,m),c}for(u=r(u);m<l.length;m++)null!==(g=f(u,a,m,l[m],s))&&(e&&null!==g.alternate&&u.delete(null===g.key?m:g.key),o=i(g,o,m),null===d?c=g:d.sibling=g,d=g);return e&&u.forEach(function(e){return t(a,e)}),ua&&aa(a,m),c}(s,c,d,u);if(A(d)){if("function"!==typeof(b=A(d)))throw Error(o(150));return function(a,l,s,c){if(null==s)throw Error(o(151));for(var d=null,u=null,m=l,g=l=0,x=null,v=s.next();null!==m&&!v.done;g++,v=s.next()){m.index>g?(x=m,m=null):x=m.sibling;var b=h(a,m,v.value,c);if(null===b){null===m&&(m=x);break}e&&m&&null===b.alternate&&t(a,m),l=i(b,l,g),null===u?d=b:u.sibling=b,u=b,m=x}if(v.done)return n(a,m),ua&&aa(a,g),d;if(null===m){for(;!v.done;g++,v=s.next())null!==(v=p(a,v.value,c))&&(l=i(v,l,g),null===u?d=v:u.sibling=v,u=v);return ua&&aa(a,g),d}for(m=r(m);!v.done;g++,v=s.next())null!==(v=f(m,a,g,v.value,c))&&(e&&null!==v.alternate&&m.delete(null===v.key?g:v.key),l=i(v,l,g),null===u?d=v:u.sibling=v,u=v);return e&&m.forEach(function(e){return t(a,e)}),ua&&aa(a,g),d}(s,c,d=b.call(d),u)}if("function"===typeof d.then)return v(s,c,ci(d),u);if(d.$$typeof===k)return v(s,c,Ta(s,d),u);ui(s,d)}return"string"===typeof d&&""!==d||"number"===typeof d||"bigint"===typeof d?(d=""+d,null!==c&&6===c.tag?(n(s,c.sibling),(u=a(c,d)).return=s,s=u):(n(s,c),(u=Kr(d,s.mode,u)).return=s,s=u),l(s)):n(s,c)}return function(e,t,n,r){try{si=0;var a=v(e,t,n,r);return li=null,a}catch(qs){if(qs===Ja||qs===Za)throw qs;var i=Or(29,qs,null,e.mode);return i.lanes=r,i.return=e,i}}}var hi=pi(!0),fi=pi(!1),mi=!1;function gi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xi(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function vi(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function bi(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,0!==(2&fc)){var a=r.pending;return null===a?t.next=t:(t.next=a.next,a.next=t),r.pending=t,t=Dr(e),Pr(e,null,n),t}return Cr(e,r,t,n),Dr(e)}function yi(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&n))){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Pe(e,n)}}function ki(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var a=null,i=null;if(null!==(n=n.firstBaseUpdate)){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};null===i?a=i=o:i=i.next=o,n=n.next}while(null!==n);null===i?a=i=t:i=i.next=t}else a=i=t;return n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:r.shared,callbacks:r.callbacks},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var ji=!1;function wi(){if(ji){if(null!==Ka)throw Ka}}function Si(e,t,n,r){ji=!1;var a=e.updateQueue;mi=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,l=a.shared.pending;if(null!==l){a.shared.pending=null;var s=l,c=s.next;s.next=null,null===o?i=c:o.next=c,o=s;var d=e.alternate;null!==d&&((l=(d=d.updateQueue).lastBaseUpdate)!==o&&(null===l?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=s))}if(null!==i){var u=a.baseState;for(o=0,d=c=s=null,l=i;;){var p=-536870913&l.lane,f=p!==l.lane;if(f?(xc&p)===p:(r&p)===p){0!==p&&p===Va&&(ji=!0),null!==d&&(d=d.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});e:{var m=e,g=l;p=t;var x=n;switch(g.tag){case 1:if("function"===typeof(m=g.payload)){u=m.call(x,u,p);break e}u=m;break e;case 3:m.flags=-65537&m.flags|128;case 0:if(null===(p="function"===typeof(m=g.payload)?m.call(x,u,p):m)||void 0===p)break e;u=h({},u,p);break e;case 2:mi=!0}}null!==(p=l.callback)&&(e.flags|=64,f&&(e.flags|=8192),null===(f=a.callbacks)?a.callbacks=[p]:f.push(p))}else f={lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},null===d?(c=d=f,s=u):d=d.next=f,o|=p;if(null===(l=l.next)){if(null===(l=a.shared.pending))break;l=(f=l).next,f.next=null,a.lastBaseUpdate=f,a.shared.pending=null}}null===d&&(s=u),a.baseState=s,a.firstBaseUpdate=c,a.lastBaseUpdate=d,null===i&&(a.shared.lanes=0),$c|=o,e.lanes=o,e.memoizedState=u}}function $i(e,t){if("function"!==typeof e)throw Error(o(191,e));e.call(t)}function _i(e,t){var n=e.callbacks;if(null!==n)for(e.callbacks=null,e=0;e<n.length;e++)$i(n[e],t)}var Ei=I(null),zi=I(0);function Ni(e,t){M(zi,e=wc),M(Ei,t),wc=e|t.baseLanes}function Ai(){M(zi,wc),M(Ei,Ei.current)}function Ci(){wc=zi.current,B(Ei),B(zi)}var Fi=I(null),Ti=null;function Pi(e){var t=e.alternate;M(Ii,1&Ii.current),M(Fi,e),null===Ti&&(null===t||null!==Ei.current||null!==t.memoizedState)&&(Ti=e)}function Di(e){M(Ii,Ii.current),M(Fi,e),null===Ti&&(Ti=e)}function Ri(e){22===e.tag?(M(Ii,Ii.current),M(Fi,e),null===Ti&&(Ti=e)):Li()}function Li(){M(Ii,Ii.current),M(Fi,Fi.current)}function Oi(e){B(Fi),Ti===e&&(Ti=null),B(Ii)}var Ii=I(0);function Bi(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||Fu(n)||Tu(n)))return t}else if(19!==t.tag||"forwards"!==t.memoizedProps.revealOrder&&"backwards"!==t.memoizedProps.revealOrder&&"unstable_legacy-backwards"!==t.memoizedProps.revealOrder&&"together"!==t.memoizedProps.revealOrder){if(null!==t.child){t.child.return=t,t=t.child;continue}}else if(0!==(128&t.flags))return t;if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Mi=0,Ui=null,Vi=null,Ki=null,Hi=!1,Wi=!1,qi=!1,Yi=0,Gi=0,Qi=null,Ji=0;function Xi(){throw Error(o(321))}function Zi(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Xn(e[n],t[n]))return!1;return!0}function eo(e,t,n,r,a,i){return Mi=i,Ui=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,P.H=null===e||null===e.memoizedState?gl:xl,qi=!1,i=n(r,a),qi=!1,Wi&&(i=no(t,n,r,a)),to(e),i}function to(e){P.H=ml;var t=null!==Vi&&null!==Vi.next;if(Mi=0,Ki=Vi=Ui=null,Hi=!1,Gi=0,Qi=null,t)throw Error(o(300));null===e||Tl||null!==(e=e.dependencies)&&Aa(e)&&(Tl=!0)}function no(e,t,n,r){Ui=e;var a=0;do{if(Wi&&(Qi=null),Gi=0,Wi=!1,25<=a)throw Error(o(301));if(a+=1,Ki=Vi=null,null!=e.updateQueue){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,null!=i.memoCache&&(i.memoCache.index=0)}P.H=vl,i=t(n,r)}while(Wi);return i}function ro(){var e=P.H,t=e.useState()[0];return t="function"===typeof t.then?co(t):t,e=e.useState()[0],(null!==Vi?Vi.memoizedState:null)!==e&&(Ui.flags|=1024),t}function ao(){var e=0!==Yi;return Yi=0,e}function io(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function oo(e){if(Hi){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Hi=!1}Mi=0,Ki=Vi=Ui=null,Wi=!1,Gi=Yi=0,Qi=null}function lo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Ki?Ui.memoizedState=Ki=e:Ki=Ki.next=e,Ki}function so(){if(null===Vi){var e=Ui.alternate;e=null!==e?e.memoizedState:null}else e=Vi.next;var t=null===Ki?Ui.memoizedState:Ki.next;if(null!==t)Ki=t,Vi=e;else{if(null===e){if(null===Ui.alternate)throw Error(o(467));throw Error(o(310))}e={memoizedState:(Vi=e).memoizedState,baseState:Vi.baseState,baseQueue:Vi.baseQueue,queue:Vi.queue,next:null},null===Ki?Ui.memoizedState=Ki=e:Ki=Ki.next=e}return Ki}function co(e){var t=Gi;return Gi+=1,null===Qi&&(Qi=[]),e=ni(Qi,e,t),t=Ui,null===(null===Ki?t.memoizedState:Ki.next)&&(t=t.alternate,P.H=null===t||null===t.memoizedState?gl:xl),e}function uo(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return co(e);if(e.$$typeof===k)return Fa(e)}throw Error(o(438,String(e)))}function po(e){var t=null,n=Ui.updateQueue;if(null!==n&&(t=n.memoCache),null==t){var r=Ui.alternate;null!==r&&(null!==(r=r.updateQueue)&&(null!=(r=r.memoCache)&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===n&&(n={lastEffect:null,events:null,stores:null,memoCache:null},Ui.updateQueue=n),n.memoCache=t,void 0===(n=t.data[t.index]))for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=z;return t.index++,n}function ho(e,t){return"function"===typeof t?t(e):t}function fo(e){return mo(so(),Vi,e)}function mo(e,t,n){var r=e.queue;if(null===r)throw Error(o(311));r.lastRenderedReducer=n;var a=e.baseQueue,i=r.pending;if(null!==i){if(null!==a){var l=a.next;a.next=i.next,i.next=l}t.baseQueue=a=i,r.pending=null}if(i=e.baseState,null===a)e.memoizedState=i;else{var s=l=null,c=null,d=t=a.next,u=!1;do{var p=-536870913&d.lane;if(p!==d.lane?(xc&p)===p:(Mi&p)===p){var h=d.revertLane;if(0===h)null!==c&&(c=c.next={lane:0,revertLane:0,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),p===Va&&(u=!0);else{if((Mi&h)===h){d=d.next,h===Va&&(u=!0);continue}p={lane:0,revertLane:d.revertLane,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},null===c?(s=c=p,l=i):c=c.next=p,Ui.lanes|=h,$c|=h}p=d.action,qi&&n(i,p),i=d.hasEagerState?d.eagerState:n(i,p)}else h={lane:p,revertLane:d.revertLane,gesture:d.gesture,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},null===c?(s=c=h,l=i):c=c.next=h,Ui.lanes|=p,$c|=p;d=d.next}while(null!==d&&d!==t);if(null===c?l=i:c.next=s,!Xn(i,e.memoizedState)&&(Tl=!0,u&&null!==(n=Ka)))throw n;e.memoizedState=i,e.baseState=l,e.baseQueue=c,r.lastRenderedState=i}return null===a&&(r.lanes=0),[e.memoizedState,r.dispatch]}function go(e){var t=so(),n=t.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,i=t.memoizedState;if(null!==a){n.pending=null;var l=a=a.next;do{i=e(i,l.action),l=l.next}while(l!==a);Xn(i,t.memoizedState)||(Tl=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function xo(e,t,n){var r=Ui,a=so(),i=ua;if(i){if(void 0===n)throw Error(o(407));n=n()}else n=t();var l=!Xn((Vi||a).memoizedState,n);if(l&&(a.memoizedState=n,Tl=!0),a=a.queue,Uo(yo.bind(null,r,a,e),[e]),a.getSnapshot!==t||l||null!==Ki&&1&Ki.memoizedState.tag){if(r.flags|=2048,Lo(9,{destroy:void 0},bo.bind(null,r,a,n,t),null),null===mc)throw Error(o(349));i||0!==(127&Mi)||vo(r,t,n)}return n}function vo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=Ui.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},Ui.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function bo(e,t,n,r){t.value=n,t.getSnapshot=r,ko(t)&&jo(e)}function yo(e,t,n){return n(function(){ko(t)&&jo(e)})}function ko(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Xn(e,n)}catch(r){return!0}}function jo(e){var t=Tr(e,2);null!==t&&Gc(t,e,2)}function wo(e){var t=lo();if("function"===typeof e){var n=e;if(e=n(),qi){be(!0);try{n()}finally{be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:e},t}function So(e,t,n,r){return e.baseState=n,mo(e,Vi,"function"===typeof r?r:ho)}function $o(e,t,n,r,a){if(pl(e))throw Error(o(485));if(null!==(e=t.action)){var i={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){i.listeners.push(e)}};null!==P.T?n(!0):i.isTransition=!1,r(i),null===(n=t.pending)?(i.next=t.pending=i,_o(t,i)):(i.next=n.next,t.pending=n.next=i)}}function _o(e,t){var n=t.action,r=t.payload,a=e.state;if(t.isTransition){var i=P.T,o={};P.T=o;try{var l=n(a,r),s=P.S;null!==s&&s(o,l),Eo(e,t,l)}catch(c){No(e,t,c)}finally{null!==i&&null!==o.types&&(i.types=o.types),P.T=i}}else try{Eo(e,t,i=n(a,r))}catch(d){No(e,t,d)}}function Eo(e,t,n){null!==n&&"object"===typeof n&&"function"===typeof n.then?n.then(function(n){zo(e,t,n)},function(n){return No(e,t,n)}):zo(e,t,n)}function zo(e,t,n){t.status="fulfilled",t.value=n,Ao(t),e.state=n,null!==(t=e.pending)&&((n=t.next)===t?e.pending=null:(n=n.next,t.next=n,_o(e,n)))}function No(e,t,n){var r=e.pending;if(e.pending=null,null!==r){r=r.next;do{t.status="rejected",t.reason=n,Ao(t),t=t.next}while(t!==r)}e.action=null}function Ao(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Co(e,t){return t}function Fo(e,t){if(ua){var n=mc.formState;if(null!==n){e:{var r=Ui;if(ua){if(da){t:{for(var a=da,i=ha;8!==a.nodeType;){if(!i){a=null;break t}if(null===(a=Pu(a.nextSibling))){a=null;break t}}a="F!"===(i=a.data)||"F"===i?a:null}if(a){da=Pu(a.nextSibling),r="F!"===a.data;break e}}ma(r)}r=!1}r&&(t=n[0])}}return(n=lo()).memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Co,lastRenderedState:t},n.queue=r,n=cl.bind(null,Ui,r),r.dispatch=n,r=wo(!1),i=ul.bind(null,Ui,!1,r.queue),a={state:t,dispatch:null,action:e,pending:null},(r=lo()).queue=a,n=$o.bind(null,Ui,a,i,n),a.dispatch=n,r.memoizedState=e,[t,n,!1]}function To(e){return Po(so(),Vi,e)}function Po(e,t,n){if(t=mo(e,t,Co)[0],e=fo(ho)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var r=co(t)}catch(qs){if(qs===Ja)throw Za;throw qs}else r=t;var a=(t=so()).queue,i=a.dispatch;return n!==t.memoizedState&&(Ui.flags|=2048,Lo(9,{destroy:void 0},Do.bind(null,a,n),null)),[r,i,e]}function Do(e,t){e.action=t}function Ro(e){var t=so(),n=Vi;if(null!==n)return Po(t,n,e);so(),t=t.memoizedState;var r=(n=so()).queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Lo(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},null===(t=Ui.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Ui.updateQueue=t),null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Oo(){return so().memoizedState}function Io(e,t,n,r){var a=lo();Ui.flags|=e,a.memoizedState=Lo(1|t,{destroy:void 0},n,void 0===r?null:r)}function Bo(e,t,n,r){var a=so();r=void 0===r?null:r;var i=a.memoizedState.inst;null!==Vi&&null!==r&&Zi(r,Vi.memoizedState.deps)?a.memoizedState=Lo(t,i,n,r):(Ui.flags|=e,a.memoizedState=Lo(1|t,i,n,r))}function Mo(e,t){Io(8390656,8,e,t)}function Uo(e,t){Bo(2048,8,e,t)}function Vo(e){var t=so().memoizedState;return function(e){Ui.flags|=4;var t=Ui.updateQueue;if(null===t)t={lastEffect:null,events:null,stores:null,memoCache:null},Ui.updateQueue=t,t.events=[e];else{var n=t.events;null===n?t.events=[e]:n.push(e)}}({ref:t,nextImpl:e}),function(){if(0!==(2&fc))throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Ko(e,t){return Bo(4,2,e,t)}function Ho(e,t){return Bo(4,4,e,t)}function Wo(e,t){if("function"===typeof t){e=e();var n=t(e);return function(){"function"===typeof n?n():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function qo(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,Bo(4,4,Wo.bind(null,t,e),n)}function Yo(){}function Go(e,t){var n=so();t=void 0===t?null:t;var r=n.memoizedState;return null!==t&&Zi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Qo(e,t){var n=so();t=void 0===t?null:t;var r=n.memoizedState;if(null!==t&&Zi(t,r[1]))return r[0];if(r=e(),qi){be(!0);try{e()}finally{be(!1)}}return n.memoizedState=[r,t],r}function Jo(e,t,n){return void 0===n||0!==(1073741824&Mi)&&0===(261930&xc)?e.memoizedState=t:(e.memoizedState=n,e=Yc(),Ui.lanes|=e,$c|=e,n)}function Xo(e,t,n,r){return Xn(n,t)?n:null!==Ei.current?(e=Jo(e,n,r),Xn(e,t)||(Tl=!0),e):0===(42&Mi)||0!==(1073741824&Mi)&&0===(261930&xc)?(Tl=!0,e.memoizedState=n):(e=Yc(),Ui.lanes|=e,$c|=e,t)}function Zo(e,t,n,r,a){var i=D.p;D.p=0!==i&&8>i?i:8;var o=P.T,l={};P.T=l,ul(e,!1,t,n);try{var s=a(),c=P.S;if(null!==c&&c(l,s),null!==s&&"object"===typeof s&&"function"===typeof s.then){var d=function(e,t){var n=[],r={status:"pending",value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status="rejected",r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}(s,r);dl(e,t,d,qc())}else dl(e,t,r,qc())}catch(u){dl(e,t,{then:function(){},status:"rejected",reason:u},qc())}finally{D.p=i,null!==o&&null!==l.types&&(o.types=l.types),P.T=o}}function el(){}function tl(e,t,n,r){if(5!==e.tag)throw Error(o(476));var a=nl(e).queue;Zo(e,a,t,R,null===n?el:function(){return rl(e),n(r)})}function nl(e){var t=e.memoizedState;if(null!==t)return t;var n={};return(t={memoizedState:R,baseState:R,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:R},next:null}).next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:n},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function rl(e){var t=nl(e);null===t.next&&(t=e.alternate.memoizedState),dl(e,t.next.queue,{},qc())}function al(){return Fa(up)}function il(){return so().memoizedState}function ol(){return so().memoizedState}function ll(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var n=qc(),r=bi(t,e=vi(n),n);return null!==r&&(Gc(r,t,n),yi(r,t,n)),t={cache:Ia()},void(e.payload=t)}t=t.return}}function sl(e,t,n){var r=qc();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},pl(e)?hl(t,n):null!==(n=Fr(e,t,n,r))&&(Gc(n,e,r),fl(n,t,r))}function cl(e,t,n){dl(e,t,n,qc())}function dl(e,t,n,r){var a={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(pl(e))hl(t,a);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)&&null!==(i=t.lastRenderedReducer))try{var o=t.lastRenderedState,l=i(o,n);if(a.hasEagerState=!0,a.eagerState=l,Xn(l,o))return Cr(e,t,a,0),null===mc&&Ar(),!1}catch(s){}if(null!==(n=Fr(e,t,a,r)))return Gc(n,e,r),fl(n,t,r),!0}return!1}function ul(e,t,n,r){if(r={lane:2,revertLane:Vd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},pl(e)){if(t)throw Error(o(479))}else null!==(t=Fr(e,n,r,2))&&Gc(t,e,2)}function pl(e){var t=e.alternate;return e===Ui||null!==t&&t===Ui}function hl(e,t){Wi=Hi=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fl(e,t,n){if(0!==(4194048&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,Pe(e,n)}}var ml={readContext:Fa,use:uo,useCallback:Xi,useContext:Xi,useEffect:Xi,useImperativeHandle:Xi,useLayoutEffect:Xi,useInsertionEffect:Xi,useMemo:Xi,useReducer:Xi,useRef:Xi,useState:Xi,useDebugValue:Xi,useDeferredValue:Xi,useTransition:Xi,useSyncExternalStore:Xi,useId:Xi,useHostTransitionStatus:Xi,useFormState:Xi,useActionState:Xi,useOptimistic:Xi,useMemoCache:Xi,useCacheRefresh:Xi};ml.useEffectEvent=Xi;var gl={readContext:Fa,use:uo,useCallback:function(e,t){return lo().memoizedState=[e,void 0===t?null:t],e},useContext:Fa,useEffect:Mo,useImperativeHandle:function(e,t,n){n=null!==n&&void 0!==n?n.concat([e]):null,Io(4194308,4,Wo.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Io(4194308,4,e,t)},useInsertionEffect:function(e,t){Io(4,2,e,t)},useMemo:function(e,t){var n=lo();t=void 0===t?null:t;var r=e();if(qi){be(!0);try{e()}finally{be(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=lo();if(void 0!==n){var a=n(t);if(qi){be(!0);try{n(t)}finally{be(!1)}}}else a=t;return r.memoizedState=r.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},r.queue=e,e=e.dispatch=sl.bind(null,Ui,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},lo().memoizedState=e},useState:function(e){var t=(e=wo(e)).queue,n=cl.bind(null,Ui,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Yo,useDeferredValue:function(e,t){return Jo(lo(),e,t)},useTransition:function(){var e=wo(!1);return e=Zo.bind(null,Ui,e.queue,!0,!1),lo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=Ui,a=lo();if(ua){if(void 0===n)throw Error(o(407));n=n()}else{if(n=t(),null===mc)throw Error(o(349));0!==(127&xc)||vo(r,t,n)}a.memoizedState=n;var i={value:n,getSnapshot:t};return a.queue=i,Mo(yo.bind(null,r,i,e),[e]),r.flags|=2048,Lo(9,{destroy:void 0},bo.bind(null,r,i,n,t),null),n},useId:function(){var e=lo(),t=mc.identifierPrefix;if(ua){var n=ra;t="_"+t+"R_"+(n=(na&~(1<<32-ye(na)-1)).toString(32)+n),0<(n=Yi++)&&(t+="H"+n.toString(32)),t+="_"}else t="_"+t+"r_"+(n=Ji++).toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:al,useFormState:Fo,useActionState:Fo,useOptimistic:function(e){var t=lo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=ul.bind(null,Ui,!0,n),n.dispatch=t,[e,t]},useMemoCache:po,useCacheRefresh:function(){return lo().memoizedState=ll.bind(null,Ui)},useEffectEvent:function(e){var t=lo(),n={impl:e};return t.memoizedState=n,function(){if(0!==(2&fc))throw Error(o(440));return n.impl.apply(void 0,arguments)}}},xl={readContext:Fa,use:uo,useCallback:Go,useContext:Fa,useEffect:Uo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Qo,useReducer:fo,useRef:Oo,useState:function(){return fo(ho)},useDebugValue:Yo,useDeferredValue:function(e,t){return Xo(so(),Vi.memoizedState,e,t)},useTransition:function(){var e=fo(ho)[0],t=so().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:il,useHostTransitionStatus:al,useFormState:To,useActionState:To,useOptimistic:function(e,t){return So(so(),0,e,t)},useMemoCache:po,useCacheRefresh:ol};xl.useEffectEvent=Vo;var vl={readContext:Fa,use:uo,useCallback:Go,useContext:Fa,useEffect:Uo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Qo,useReducer:go,useRef:Oo,useState:function(){return go(ho)},useDebugValue:Yo,useDeferredValue:function(e,t){var n=so();return null===Vi?Jo(n,e,t):Xo(n,Vi.memoizedState,e,t)},useTransition:function(){var e=go(ho)[0],t=so().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:il,useHostTransitionStatus:al,useFormState:Ro,useActionState:Ro,useOptimistic:function(e,t){var n=so();return null!==Vi?So(n,0,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:po,useCacheRefresh:ol};function bl(e,t,n,r){n=null===(n=n(r,t=e.memoizedState))||void 0===n?t:h({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}vl.useEffectEvent=Vo;var yl={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=qc(),a=vi(r);a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=bi(e,a,r))&&(Gc(t,e,r),yi(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=qc(),a=vi(r);a.tag=1,a.payload=t,void 0!==n&&null!==n&&(a.callback=n),null!==(t=bi(e,a,r))&&(Gc(t,e,r),yi(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=qc(),r=vi(n);r.tag=2,void 0!==t&&null!==t&&(r.callback=t),null!==(t=bi(e,r,n))&&(Gc(t,e,n),yi(t,e,n))}};function kl(e,t,n,r,a,i,o){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,i,o):!t.prototype||!t.prototype.isPureReactComponent||(!Zn(n,r)||!Zn(a,i))}function jl(e,t,n,r){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&yl.enqueueReplaceState(t,t.state,null)}function wl(e,t){var n=t;if("ref"in t)for(var r in n={},t)"ref"!==r&&(n[r]=t[r]);if(e=e.defaultProps)for(var a in n===t&&(n=h({},n)),e)void 0===n[a]&&(n[a]=e[a]);return n}function Sl(e){_r(e)}function $l(e){console.error(e)}function _l(e){_r(e)}function El(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function zl(e,t,n){try{(0,e.onCaughtError)(n.value,{componentStack:n.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function Nl(e,t,n){return(n=vi(n)).tag=3,n.payload={element:null},n.callback=function(){El(e,t)},n}function Al(e){return(e=vi(e)).tag=3,e}function Cl(e,t,n,r){var a=n.type.getDerivedStateFromError;if("function"===typeof a){var i=r.value;e.payload=function(){return a(i)},e.callback=function(){zl(t,n,r)}}var o=n.stateNode;null!==o&&"function"===typeof o.componentDidCatch&&(e.callback=function(){zl(t,n,r),"function"!==typeof a&&(null===Lc?Lc=new Set([this]):Lc.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:null!==e?e:""})})}var Fl=Error(o(461)),Tl=!1;function Pl(e,t,n,r){t.child=null===e?fi(t,null,n,r):hi(t,e.child,n,r)}function Dl(e,t,n,r,a){n=n.render;var i=t.ref;if("ref"in r){var o={};for(var l in r)"ref"!==l&&(o[l]=r[l])}else o=r;return Ca(t),r=eo(e,t,n,o,i,a),l=ao(),null===e||Tl?(ua&&l&&oa(t),t.flags|=1,Pl(e,t,r,a),t.child):(io(e,t,a),as(e,t,a))}function Rl(e,t,n,r,a){if(null===e){var i=n.type;return"function"!==typeof i||Ir(i)||void 0!==i.defaultProps||null!==n.compare?((e=Ur(n.type,null,r,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=i,Ll(e,t,i,r,a))}if(i=e.child,!is(e,a)){var o=i.memoizedProps;if((n=null!==(n=n.compare)?n:Zn)(o,r)&&e.ref===t.ref)return as(e,t,a)}return t.flags|=1,(e=Br(i,r)).ref=t.ref,e.return=t,t.child=e}function Ll(e,t,n,r,a){if(null!==e){var i=e.memoizedProps;if(Zn(i,r)&&e.ref===t.ref){if(Tl=!1,t.pendingProps=r=i,!is(e,a))return t.lanes=e.lanes,as(e,t,a);0!==(131072&e.flags)&&(Tl=!0)}}return Kl(e,t,n,r,a)}function Ol(e,t,n,r){var a=r.children,i=null!==e?e.memoizedState:null;if(null===e&&null===t.stateNode&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),"hidden"===r.mode){if(0!==(128&t.flags)){if(i=null!==i?i.baseLanes|n:n,null!==e){for(r=t.child=e.child,a=0;null!==r;)a=a|r.lanes|r.childLanes,r=r.sibling;r=a&~i}else r=0,t.child=null;return Bl(e,t,i,n,r)}if(0===(536870912&n))return r=t.lanes=536870912,Bl(e,t,null!==i?i.baseLanes|n:n,n,r);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Ga(0,null!==i?i.cachePool:null),null!==i?Ni(t,i):Ai(),Ri(t)}else null!==i?(Ga(0,i.cachePool),Ni(t,i),Li(),t.memoizedState=null):(null!==e&&Ga(0,null),Ai(),Li());return Pl(e,t,a,n),t.child}function Il(e,t){return null!==e&&22===e.tag||null!==t.stateNode||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Bl(e,t,n,r,a){var i=Ya();return i=null===i?null:{parent:Oa._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},null!==e&&Ga(0,null),Ai(),Ri(t),null!==e&&Na(e,t,r,!0),t.childLanes=a,null}function Ml(e,t){return(t=Zl({mode:t.mode,children:t.children},e.mode)).ref=e.ref,e.child=t,t.return=e,t}function Ul(e,t,n){return hi(t,e.child,null,n),(e=Ml(t,t.pendingProps)).flags|=2,Oi(t),t.memoizedState=null,e}function Vl(e,t){var n=t.ref;if(null===n)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof n&&"object"!==typeof n)throw Error(o(284));null!==e&&e.ref===n||(t.flags|=4194816)}}function Kl(e,t,n,r,a){return Ca(t),n=eo(e,t,n,r,void 0,a),r=ao(),null===e||Tl?(ua&&r&&oa(t),t.flags|=1,Pl(e,t,n,a),t.child):(io(e,t,a),as(e,t,a))}function Hl(e,t,n,r,a,i){return Ca(t),t.updateQueue=null,n=no(t,r,n,a),to(e),r=ao(),null===e||Tl?(ua&&r&&oa(t),t.flags|=1,Pl(e,t,n,i),t.child):(io(e,t,i),as(e,t,i))}function Wl(e,t,n,r,a){if(Ca(t),null===t.stateNode){var i=Rr,o=n.contextType;"object"===typeof o&&null!==o&&(i=Fa(o)),i=new n(r,i),t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,i.updater=yl,t.stateNode=i,i._reactInternals=t,(i=t.stateNode).props=r,i.state=t.memoizedState,i.refs={},gi(t),o=n.contextType,i.context="object"===typeof o&&null!==o?Fa(o):Rr,i.state=t.memoizedState,"function"===typeof(o=n.getDerivedStateFromProps)&&(bl(t,n,o,r),i.state=t.memoizedState),"function"===typeof n.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(o=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),o!==i.state&&yl.enqueueReplaceState(i,i.state,null),Si(t,r,i,a),wi(),i.state=t.memoizedState),"function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!0}else if(null===e){i=t.stateNode;var l=t.memoizedProps,s=wl(n,l);i.props=s;var c=i.context,d=n.contextType;o=Rr,"object"===typeof d&&null!==d&&(o=Fa(d));var u=n.getDerivedStateFromProps;d="function"===typeof u||"function"===typeof i.getSnapshotBeforeUpdate,l=t.pendingProps!==l,d||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(l||c!==o)&&jl(t,i,r,o),mi=!1;var p=t.memoizedState;i.state=p,Si(t,r,i,a),wi(),c=t.memoizedState,l||p!==c||mi?("function"===typeof u&&(bl(t,n,u,r),c=t.memoizedState),(s=mi||kl(t,n,s,r,p,c,o))?(d||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||("function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"===typeof i.componentDidMount&&(t.flags|=4194308)):("function"===typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),i.props=r,i.state=c,i.context=o,r=s):("function"===typeof i.componentDidMount&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,xi(e,t),d=wl(n,o=t.memoizedProps),i.props=d,u=t.pendingProps,p=i.context,c=n.contextType,s=Rr,"object"===typeof c&&null!==c&&(s=Fa(c)),(c="function"===typeof(l=n.getDerivedStateFromProps)||"function"===typeof i.getSnapshotBeforeUpdate)||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(o!==u||p!==s)&&jl(t,i,r,s),mi=!1,p=t.memoizedState,i.state=p,Si(t,r,i,a),wi();var h=t.memoizedState;o!==u||p!==h||mi||null!==e&&null!==e.dependencies&&Aa(e.dependencies)?("function"===typeof l&&(bl(t,n,l,r),h=t.memoizedState),(d=mi||kl(t,n,d,r,p,h,s)||null!==e&&null!==e.dependencies&&Aa(e.dependencies))?(c||"function"!==typeof i.UNSAFE_componentWillUpdate&&"function"!==typeof i.componentWillUpdate||("function"===typeof i.componentWillUpdate&&i.componentWillUpdate(r,h,s),"function"===typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(r,h,s)),"function"===typeof i.componentDidUpdate&&(t.flags|=4),"function"===typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=h),i.props=r,i.state=h,i.context=s,r=d):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return i=r,Vl(e,t),r=0!==(128&t.flags),i||r?(i=t.stateNode,n=r&&"function"!==typeof n.getDerivedStateFromError?null:i.render(),t.flags|=1,null!==e&&r?(t.child=hi(t,e.child,null,a),t.child=hi(t,null,n,a)):Pl(e,t,n,a),t.memoizedState=i.state,e=t.child):e=as(e,t,a),e}function ql(e,t,n,r){return ba(),t.flags|=256,Pl(e,t,n,r),t.child}var Yl={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Gl(e){return{baseLanes:e,cachePool:Qa()}}function Ql(e,t,n){return e=null!==e?e.childLanes&~n:0,t&&(e|=zc),e}function Jl(e,t,n){var r,a=t.pendingProps,i=!1,l=0!==(128&t.flags);if((r=l)||(r=(null===e||null!==e.memoizedState)&&0!==(2&Ii.current)),r&&(i=!0,t.flags&=-129),r=0!==(32&t.flags),t.flags&=-33,null===e){if(ua){if(i?Pi(t):Li(),(e=da)?null!==(e=null!==(e=Cu(e,ha))&&"&"!==e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:na,overflow:ra}:null,retryLane:536870912,hydrationErrors:null},(n=Hr(e)).return=t,t.child=n,ca=t,da=null):e=null,null===e)throw ma(t);return Tu(e)?t.lanes=32:t.lanes=536870912,null}var s=a.children;return a=a.fallback,i?(Li(),s=Zl({mode:"hidden",children:s},i=t.mode),a=Vr(a,i,n,null),s.return=t,a.return=t,s.sibling=a,t.child=s,(a=t.child).memoizedState=Gl(n),a.childLanes=Ql(e,r,n),t.memoizedState=Yl,Il(null,a)):(Pi(t),Xl(t,s))}var c=e.memoizedState;if(null!==c&&null!==(s=c.dehydrated)){if(l)256&t.flags?(Pi(t),t.flags&=-257,t=es(e,t,n)):null!==t.memoizedState?(Li(),t.child=e.child,t.flags|=128,t=null):(Li(),s=a.fallback,i=t.mode,a=Zl({mode:"visible",children:a.children},i),(s=Vr(s,i,n,null)).flags|=2,a.return=t,s.return=t,a.sibling=s,t.child=a,hi(t,e.child,null,n),(a=t.child).memoizedState=Gl(n),a.childLanes=Ql(e,r,n),t.memoizedState=Yl,t=Il(null,a));else if(Pi(t),Tu(s)){if(r=s.nextSibling&&s.nextSibling.dataset)var d=r.dgst;r=d,(a=Error(o(419))).stack="",a.digest=r,ka({value:a,source:null,stack:null}),t=es(e,t,n)}else if(Tl||Na(e,t,n,!1),r=0!==(n&e.childLanes),Tl||r){if(null!==(r=mc)&&(0!==(a=De(r,n))&&a!==c.retryLane))throw c.retryLane=a,Tr(e,a),Gc(r,e,a),Fl;Fu(s)||ld(),t=es(e,t,n)}else Fu(s)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,da=Pu(s.nextSibling),ca=t,ua=!0,pa=null,ha=!1,null!==e&&sa(t,e),(t=Xl(t,a.children)).flags|=4096);return t}return i?(Li(),s=a.fallback,i=t.mode,d=(c=e.child).sibling,(a=Br(c,{mode:"hidden",children:a.children})).subtreeFlags=65011712&c.subtreeFlags,null!==d?s=Br(d,s):(s=Vr(s,i,n,null)).flags|=2,s.return=t,a.return=t,a.sibling=s,t.child=a,Il(null,a),a=t.child,null===(s=e.child.memoizedState)?s=Gl(n):(null!==(i=s.cachePool)?(c=Oa._currentValue,i=i.parent!==c?{parent:c,pool:c}:i):i=Qa(),s={baseLanes:s.baseLanes|n,cachePool:i}),a.memoizedState=s,a.childLanes=Ql(e,r,n),t.memoizedState=Yl,Il(e.child,a)):(Pi(t),e=(n=e.child).sibling,(n=Br(n,{mode:"visible",children:a.children})).return=t,n.sibling=null,null!==e&&(null===(r=t.deletions)?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Xl(e,t){return(t=Zl({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Zl(e,t){return(e=Or(22,e,null,t)).lanes=0,e}function es(e,t,n){return hi(t,e.child,null,n),(e=Xl(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function ts(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),Ea(e.return,t,n)}function ns(e,t,n,r,a,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=a,o.treeForkCount=i)}function rs(e,t,n){var r=t.pendingProps,a=r.revealOrder,i=r.tail;r=r.children;var o=Ii.current,l=0!==(2&o);if(l?(o=1&o|2,t.flags|=128):o&=1,M(Ii,o),Pl(e,t,r,n),r=ua?Xr:0,!l&&null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&ts(e,n,t);else if(19===e.tag)ts(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;null!==n;)null!==(e=n.alternate)&&null===Bi(e)&&(a=n),n=n.sibling;null===(n=a)?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),ns(t,!1,a,n,i,r);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Bi(e)){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}ns(t,!0,n,null,i,r);break;case"together":ns(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function as(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),$c|=t.lanes,0===(n&t.childLanes)){if(null===e)return null;if(Na(e,t,n,!1),0===(n&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(o(153));if(null!==t.child){for(n=Br(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Br(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function is(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Aa(e))}function os(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps)Tl=!0;else{if(!is(e,n)&&0===(128&t.flags))return Tl=!1,function(e,t,n){switch(t.tag){case 3:Y(t,t.stateNode.containerInfo),$a(0,Oa,e.memoizedState.cache),ba();break;case 27:case 5:Q(t);break;case 4:Y(t,t.stateNode.containerInfo);break;case 10:$a(0,t.type,t.memoizedProps.value);break;case 31:if(null!==t.memoizedState)return t.flags|=128,Di(t),null;break;case 13:var r=t.memoizedState;if(null!==r)return null!==r.dehydrated?(Pi(t),t.flags|=128,null):0!==(n&t.child.childLanes)?Jl(e,t,n):(Pi(t),null!==(e=as(e,t,n))?e.sibling:null);Pi(t);break;case 19:var a=0!==(128&e.flags);if((r=0!==(n&t.childLanes))||(Na(e,t,n,!1),r=0!==(n&t.childLanes)),a){if(r)return rs(e,t,n);t.flags|=128}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),M(Ii,Ii.current),r)break;return null;case 22:return t.lanes=0,Ol(e,t,n,t.pendingProps);case 24:$a(0,Oa,e.memoizedState.cache)}return as(e,t,n)}(e,t,n);Tl=0!==(131072&e.flags)}else Tl=!1,ua&&0!==(1048576&t.flags)&&ia(t,Xr,t.index);switch(t.lanes=0,t.tag){case 16:e:{var r=t.pendingProps;if(e=ri(t.elementType),t.type=e,"function"!==typeof e){if(void 0!==e&&null!==e){var a=e.$$typeof;if(a===j){t.tag=11,t=Dl(null,t,e,r,n);break e}if(a===$){t.tag=14,t=Rl(null,t,e,r,n);break e}}throw t=F(e)||e,Error(o(306,t,""))}Ir(e)?(r=wl(e,r),t.tag=1,t=Wl(null,t,e,r,n)):(t.tag=0,t=Kl(null,t,e,r,n))}return t;case 0:return Kl(e,t,t.type,t.pendingProps,n);case 1:return Wl(e,t,r=t.type,a=wl(r,t.pendingProps),n);case 3:e:{if(Y(t,t.stateNode.containerInfo),null===e)throw Error(o(387));r=t.pendingProps;var i=t.memoizedState;a=i.element,xi(e,t),Si(t,r,null,n);var l=t.memoizedState;if(r=l.cache,$a(0,Oa,r),r!==i.cache&&za(t,[Oa],n,!0),wi(),r=l.element,i.isDehydrated){if(i={element:r,isDehydrated:!1,cache:l.cache},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=ql(e,t,r,n);break e}if(r!==a){ka(a=Yr(Error(o(424)),t)),t=ql(e,t,r,n);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(da=Pu(e.firstChild),ca=t,ua=!0,pa=null,ha=!0,n=fi(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(ba(),r===a){t=as(e,t,n);break e}Pl(e,t,r,n)}t=t.child}return t;case 26:return Vl(e,t),null===e?(n=Wu(t.type,null,t.pendingProps,null))?t.memoizedState=n:ua||(n=t.type,e=t.pendingProps,(r=xu(W.current).createElement(n))[Me]=t,r[Ue]=e,hu(r,n,e),et(r),t.stateNode=r):t.memoizedState=Wu(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Q(t),null===e&&ua&&(r=t.stateNode=Ou(t.type,t.pendingProps,W.current),ca=t,ha=!0,a=da,Eu(t.type)?(Du=a,da=Pu(r.firstChild)):da=a),Pl(e,t,t.pendingProps.children,n),Vl(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&ua&&((a=r=da)&&(null!==(r=function(e,t,n,r){for(;1===e.nodeType;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(r){if(!e[Ye])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(i=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(i!==a.rel||e.getAttribute("href")!==(null==a.href||""===a.href?null:a.href)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin)||e.getAttribute("title")!==(null==a.title?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((i=e.getAttribute("src"))!==(null==a.src?null:a.src)||e.getAttribute("type")!==(null==a.type?null:a.type)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var i=null==a.name?null:""+a.name;if("hidden"===a.type&&e.getAttribute("name")===i)return e}if(null===(e=Pu(e.nextSibling)))break}return null}(r,t.type,t.pendingProps,ha))?(t.stateNode=r,ca=t,da=Pu(r.firstChild),ha=!1,a=!0):a=!1),a||ma(t)),Q(t),a=t.type,i=t.pendingProps,l=null!==e?e.memoizedProps:null,r=i.children,yu(a,i)?r=null:null!==l&&yu(a,l)&&(t.flags|=32),null!==t.memoizedState&&(a=eo(e,t,ro,null,null,n),up._currentValue=a),Vl(e,t),Pl(e,t,r,n),t.child;case 6:return null===e&&ua&&((e=n=da)&&(null!==(n=function(e,t,n){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!n)return null;if(null===(e=Pu(e.nextSibling)))return null}return e}(n,t.pendingProps,ha))?(t.stateNode=n,ca=t,da=null,e=!0):e=!1),e||ma(t)),null;case 13:return Jl(e,t,n);case 4:return Y(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=hi(t,null,r,n):Pl(e,t,r,n),t.child;case 11:return Dl(e,t,t.type,t.pendingProps,n);case 7:return Pl(e,t,t.pendingProps,n),t.child;case 8:case 12:return Pl(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,$a(0,t.type,r.value),Pl(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Ca(t),r=r(a=Fa(a)),t.flags|=1,Pl(e,t,r,n),t.child;case 14:return Rl(e,t,t.type,t.pendingProps,n);case 15:return Ll(e,t,t.type,t.pendingProps,n);case 19:return rs(e,t,n);case 31:return function(e,t,n){var r=t.pendingProps,a=0!==(128&t.flags);if(t.flags&=-129,null===e){if(ua){if("hidden"===r.mode)return e=Ml(t,r),t.lanes=536870912,Il(null,e);if(Di(t),(e=da)?null!==(e=null!==(e=Cu(e,ha))&&"&"===e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:na,overflow:ra}:null,retryLane:536870912,hydrationErrors:null},(n=Hr(e)).return=t,t.child=n,ca=t,da=null):e=null,null===e)throw ma(t);return t.lanes=536870912,null}return Ml(t,r)}var i=e.memoizedState;if(null!==i){var l=i.dehydrated;if(Di(t),a)if(256&t.flags)t.flags&=-257,t=Ul(e,t,n);else{if(null===t.memoizedState)throw Error(o(558));t.child=e.child,t.flags|=128,t=null}else if(Tl||Na(e,t,n,!1),a=0!==(n&e.childLanes),Tl||a){if(null!==(r=mc)&&0!==(l=De(r,n))&&l!==i.retryLane)throw i.retryLane=l,Tr(e,l),Gc(r,e,l),Fl;ld(),t=Ul(e,t,n)}else e=i.treeContext,da=Pu(l.nextSibling),ca=t,ua=!0,pa=null,ha=!1,null!==e&&sa(t,e),(t=Ml(t,r)).flags|=4096;return t}return(e=Br(e.child,{mode:r.mode,children:r.children})).ref=t.ref,t.child=e,e.return=t,e}(e,t,n);case 22:return Ol(e,t,n,t.pendingProps);case 24:return Ca(t),r=Fa(Oa),null===e?(null===(a=Ya())&&(a=mc,i=Ia(),a.pooledCache=i,i.refCount++,null!==i&&(a.pooledCacheLanes|=n),a=i),t.memoizedState={parent:r,cache:a},gi(t),$a(0,Oa,a)):(0!==(e.lanes&n)&&(xi(e,t),Si(t,null,null,n),wi()),a=e.memoizedState,i=t.memoizedState,a.parent!==r?(a={parent:r,cache:r},t.memoizedState=a,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=a),$a(0,Oa,r)):(r=i.cache,$a(0,Oa,r),r!==a.cache&&za(t,[Oa],n,!0))),Pl(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function ls(e){e.flags|=4}function ss(e,t,n,r,a){if((t=0!==(32&e.mode))&&(t=!1),t){if(e.flags|=16777216,(335544128&a)===a)if(e.stateNode.complete)e.flags|=8192;else{if(!ad())throw ai=ei,Xa;e.flags|=8192}}else e.flags&=-16777217}function cs(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!ip(t)){if(!ad())throw ai=ei,Xa;e.flags|=8192}}function ds(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?Ae():536870912,e.lanes|=t,Nc|=t)}function us(e,t){if(!ua)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ps(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=65011712&a.subtreeFlags,r|=65011712&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function hs(e,t,n){var r=t.pendingProps;switch(la(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return ps(t),null;case 3:return n=t.stateNode,r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),_a(Oa),G(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),null!==e&&null!==e.child||(va(t)?ls(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,ya())),ps(t),null;case 26:var a=t.type,i=t.memoizedState;return null===e?(ls(t),null!==i?(ps(t),cs(t,i)):(ps(t),ss(t,a,0,0,n))):i?i!==e.memoizedState?(ls(t),ps(t),cs(t,i)):(ps(t),t.flags&=-16777217):((e=e.memoizedProps)!==r&&ls(t),ps(t),ss(t,a,0,0,n)),null;case 27:if(J(t),n=W.current,a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&ls(t);else{if(!r){if(null===t.stateNode)throw Error(o(166));return ps(t),null}e=K.current,va(t)?ga(t):(e=Ou(a,r,n),t.stateNode=e,ls(t))}return ps(t),null;case 5:if(J(t),a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==r&&ls(t);else{if(!r){if(null===t.stateNode)throw Error(o(166));return ps(t),null}if(i=K.current,va(t))ga(t);else{var l=xu(W.current);switch(i){case 1:i=l.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=l.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=l.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=l.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":(i=l.createElement("div")).innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i="string"===typeof r.is?l.createElement("select",{is:r.is}):l.createElement("select"),r.multiple?i.multiple=!0:r.size&&(i.size=r.size);break;default:i="string"===typeof r.is?l.createElement(a,{is:r.is}):l.createElement(a)}}i[Me]=t,i[Ue]=r;e:for(l=t.child;null!==l;){if(5===l.tag||6===l.tag)i.appendChild(l.stateNode);else if(4!==l.tag&&27!==l.tag&&null!==l.child){l.child.return=l,l=l.child;continue}if(l===t)break e;for(;null===l.sibling;){if(null===l.return||l.return===t)break e;l=l.return}l.sibling.return=l.return,l=l.sibling}t.stateNode=i;e:switch(hu(i,a,r),a){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&ls(t)}}return ps(t),ss(t,t.type,null===e||e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==r&&ls(t);else{if("string"!==typeof r&&null===t.stateNode)throw Error(o(166));if(e=W.current,va(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,null!==(a=ca))switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Me]=t,(e=!!(e.nodeValue===n||null!==r&&!0===r.suppressHydrationWarning||du(e.nodeValue,n)))||ma(t,!0)}else(e=xu(e).createTextNode(r))[Me]=t,t.stateNode=e}return ps(t),null;case 31:if(n=t.memoizedState,null===e||null!==e.memoizedState){if(r=va(t),null!==n){if(null===e){if(!r)throw Error(o(318));if(!(e=null!==(e=t.memoizedState)?e.dehydrated:null))throw Error(o(557));e[Me]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;ps(t),e=!1}else n=ya(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return 256&t.flags?(Oi(t),t):(Oi(t),null);if(0!==(128&t.flags))throw Error(o(558))}return ps(t),null;case 13:if(r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(a=va(t),null!==r&&null!==r.dehydrated){if(null===e){if(!a)throw Error(o(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(o(317));a[Me]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;ps(t),a=!1}else a=ya(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return 256&t.flags?(Oi(t),t):(Oi(t),null)}return Oi(t),0!==(128&t.flags)?(t.lanes=n,t):(n=null!==r,e=null!==e&&null!==e.memoizedState,n&&(a=null,null!==(r=t.child).alternate&&null!==r.alternate.memoizedState&&null!==r.alternate.memoizedState.cachePool&&(a=r.alternate.memoizedState.cachePool.pool),i=null,null!==r.memoizedState&&null!==r.memoizedState.cachePool&&(i=r.memoizedState.cachePool.pool),i!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ds(t,t.updateQueue),ps(t),null);case 4:return G(),null===e&&eu(t.stateNode.containerInfo),ps(t),null;case 10:return _a(t.type),ps(t),null;case 19:if(B(Ii),null===(r=t.memoizedState))return ps(t),null;if(a=0!==(128&t.flags),null===(i=r.rendering))if(a)us(r,!1);else{if(0!==Sc||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(i=Bi(e))){for(t.flags|=128,us(r,!1),e=i.updateQueue,t.updateQueue=e,ds(t,e),t.subtreeFlags=0,e=n,n=t.child;null!==n;)Mr(n,e),n=n.sibling;return M(Ii,1&Ii.current|2),ua&&aa(t,r.treeForkCount),t.child}e=e.sibling}null!==r.tail&&se()>Dc&&(t.flags|=128,a=!0,us(r,!1),t.lanes=4194304)}else{if(!a)if(null!==(e=Bi(i))){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ds(t,e),us(r,!0),null===r.tail&&"hidden"===r.tailMode&&!i.alternate&&!ua)return ps(t),null}else 2*se()-r.renderingStartTime>Dc&&536870912!==n&&(t.flags|=128,a=!0,us(r,!1),t.lanes=4194304);r.isBackwards?(i.sibling=t.child,t.child=i):(null!==(e=r.last)?e.sibling=i:t.child=i,r.last=i)}return null!==r.tail?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=se(),e.sibling=null,n=Ii.current,M(Ii,a?1&n|2:1&n),ua&&aa(t,r.treeForkCount),e):(ps(t),null);case 22:case 23:return Oi(t),Ci(),r=null!==t.memoizedState,null!==e?null!==e.memoizedState!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?0!==(536870912&n)&&0===(128&t.flags)&&(ps(t),6&t.subtreeFlags&&(t.flags|=8192)):ps(t),null!==(n=t.updateQueue)&&ds(t,n.retryQueue),n=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),r=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),null!==e&&B(qa),null;case 24:return n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),_a(Oa),ps(t),null;case 25:case 30:return null}throw Error(o(156,t.tag))}function fs(e,t){switch(la(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return _a(Oa),G(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return J(t),null;case 31:if(null!==t.memoizedState){if(Oi(t),null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 13:if(Oi(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return B(Ii),null;case 4:return G(),null;case 10:return _a(t.type),null;case 22:case 23:return Oi(t),Ci(),null!==e&&B(qa),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return _a(Oa),null;default:return null}}function ms(e,t){switch(la(t),t.tag){case 3:_a(Oa),G();break;case 26:case 27:case 5:J(t);break;case 4:G();break;case 31:null!==t.memoizedState&&Oi(t);break;case 13:Oi(t);break;case 19:B(Ii);break;case 10:_a(t.type);break;case 22:case 23:Oi(t),Ci(),null!==e&&B(qa);break;case 24:_a(Oa)}}function gs(e,t){try{var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var a=r.next;n=a;do{if((n.tag&e)===e){r=void 0;var i=n.create,o=n.inst;r=i(),o.destroy=r}n=n.next}while(n!==a)}}catch(l){Sd(t,t.return,l)}}function xs(e,t,n){try{var r=t.updateQueue,a=null!==r?r.lastEffect:null;if(null!==a){var i=a.next;r=i;do{if((r.tag&e)===e){var o=r.inst,l=o.destroy;if(void 0!==l){o.destroy=void 0,a=t;var s=n,c=l;try{c()}catch(d){Sd(a,s,d)}}}r=r.next}while(r!==i)}}catch(d){Sd(t,t.return,d)}}function vs(e){var t=e.updateQueue;if(null!==t){var n=e.stateNode;try{_i(t,n)}catch(r){Sd(e,e.return,r)}}}function bs(e,t,n){n.props=wl(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(r){Sd(e,t,r)}}function ys(e,t){try{var n=e.ref;if(null!==n){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;default:r=e.stateNode}"function"===typeof n?e.refCleanup=n(r):n.current=r}}catch(a){Sd(e,t,a)}}function ks(e,t){var n=e.ref,r=e.refCleanup;if(null!==n)if("function"===typeof r)try{r()}catch(a){Sd(e,t,a)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof n)try{n(null)}catch(i){Sd(e,t,i)}else n.current=null}function js(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&r.focus();break e;case"img":n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(a){Sd(e,e.return,a)}}function ws(e,t,n){try{var r=e.stateNode;!function(e,t,n,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,l=null,s=null,c=null,d=null,u=null;for(f in n){var p=n[f];if(n.hasOwnProperty(f)&&null!=p)switch(f){case"checked":case"value":break;case"defaultValue":c=p;default:r.hasOwnProperty(f)||uu(e,t,f,null,r,p)}}for(var h in r){var f=r[h];if(p=n[h],r.hasOwnProperty(h)&&(null!=f||null!=p))switch(h){case"type":i=f;break;case"name":a=f;break;case"checked":d=f;break;case"defaultChecked":u=f;break;case"value":l=f;break;case"defaultValue":s=f;break;case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(o(137,t));break;default:f!==p&&uu(e,t,h,f,r,p)}}return void vt(e,l,s,c,d,u,i,a);case"select":for(i in f=l=s=h=null,n)if(c=n[i],n.hasOwnProperty(i)&&null!=c)switch(i){case"value":break;case"multiple":f=c;default:r.hasOwnProperty(i)||uu(e,t,i,null,r,c)}for(a in r)if(i=r[a],c=n[a],r.hasOwnProperty(a)&&(null!=i||null!=c))switch(a){case"value":h=i;break;case"defaultValue":s=i;break;case"multiple":l=i;default:i!==c&&uu(e,t,a,i,r,c)}return t=s,n=l,r=f,void(null!=h?kt(e,!!n,h,!1):!!r!==!!n&&(null!=t?kt(e,!!n,t,!0):kt(e,!!n,n?[]:"",!1)));case"textarea":for(s in f=h=null,n)if(a=n[s],n.hasOwnProperty(s)&&null!=a&&!r.hasOwnProperty(s))switch(s){case"value":case"children":break;default:uu(e,t,s,null,r,a)}for(l in r)if(a=r[l],i=n[l],r.hasOwnProperty(l)&&(null!=a||null!=i))switch(l){case"value":h=a;break;case"defaultValue":f=a;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=a)throw Error(o(91));break;default:a!==i&&uu(e,t,l,a,r,i)}return void jt(e,h,f);case"option":for(var m in n)if(h=n[m],n.hasOwnProperty(m)&&null!=h&&!r.hasOwnProperty(m))if("selected"===m)e.selected=!1;else uu(e,t,m,null,r,h);for(c in r)if(h=r[c],f=n[c],r.hasOwnProperty(c)&&h!==f&&(null!=h||null!=f))if("selected"===c)e.selected=h&&"function"!==typeof h&&"symbol"!==typeof h;else uu(e,t,c,h,r,f);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in n)h=n[g],n.hasOwnProperty(g)&&null!=h&&!r.hasOwnProperty(g)&&uu(e,t,g,null,r,h);for(d in r)if(h=r[d],f=n[d],r.hasOwnProperty(d)&&h!==f&&(null!=h||null!=f))switch(d){case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(o(137,t));break;default:uu(e,t,d,h,r,f)}return;default:if(zt(t)){for(var x in n)h=n[x],n.hasOwnProperty(x)&&void 0!==h&&!r.hasOwnProperty(x)&&pu(e,t,x,void 0,r,h);for(u in r)h=r[u],f=n[u],!r.hasOwnProperty(u)||h===f||void 0===h&&void 0===f||pu(e,t,u,h,r,f);return}}for(var v in n)h=n[v],n.hasOwnProperty(v)&&null!=h&&!r.hasOwnProperty(v)&&uu(e,t,v,null,r,h);for(p in r)h=r[p],f=n[p],!r.hasOwnProperty(p)||h===f||null==h&&null==f||uu(e,t,p,h,r,f)}(r,e.type,n,t),r[Ue]=t}catch(a){Sd(e,e.return,a)}}function Ss(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&Eu(e.type)||4===e.tag}function $s(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Ss(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&Eu(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function _s(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?(9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).insertBefore(e,t):((t=9===n.nodeType?n.body:"HTML"===n.nodeName?n.ownerDocument.body:n).appendChild(e),null!==(n=n._reactRootContainer)&&void 0!==n||null!==t.onclick||(t.onclick=Ft));else if(4!==r&&(27===r&&Eu(e.type)&&(n=e.stateNode,t=null),null!==(e=e.child)))for(_s(e,t,n),e=e.sibling;null!==e;)_s(e,t,n),e=e.sibling}function Es(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&(27===r&&Eu(e.type)&&(n=e.stateNode),null!==(e=e.child)))for(Es(e,t,n),e=e.sibling;null!==e;)Es(e,t,n),e=e.sibling}function zs(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);hu(t,r,n),t[Me]=e,t[Ue]=n}catch(i){Sd(e,e.return,i)}}var Ns=!1,As=!1,Cs=!1,Fs="function"===typeof WeakSet?WeakSet:Set,Ts=null;function Ps(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Gs(e,n),4&r&&gs(5,n);break;case 1:if(Gs(e,n),4&r)if(e=n.stateNode,null===t)try{e.componentDidMount()}catch(o){Sd(n,n.return,o)}else{var a=wl(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(l){Sd(n,n.return,l)}}64&r&&vs(n),512&r&&ys(n,n.return);break;case 3:if(Gs(e,n),64&r&&null!==(e=n.updateQueue)){if(t=null,null!==n.child)switch(n.child.tag){case 27:case 5:case 1:t=n.child.stateNode}try{_i(e,t)}catch(o){Sd(n,n.return,o)}}break;case 27:null===t&&4&r&&zs(n);case 26:case 5:Gs(e,n),null===t&&4&r&&js(n),512&r&&ys(n,n.return);break;case 12:Gs(e,n);break;case 31:Gs(e,n),4&r&&Bs(e,n);break;case 13:Gs(e,n),4&r&&Ms(e,n),64&r&&(null!==(e=n.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var n=e.ownerDocument;if("$~"===e.data)e._reactRetry=t;else if("$?"!==e.data||"loading"!==n.readyState)t();else{var r=function(){t(),n.removeEventListener("DOMContentLoaded",r)};n.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}(e,n=zd.bind(null,n))));break;case 22:if(!(r=null!==n.memoizedState||Ns)){t=null!==t&&null!==t.memoizedState||As,a=Ns;var i=As;Ns=r,(As=t)&&!i?Js(e,n,0!==(8772&n.subtreeFlags)):Gs(e,n),Ns=a,As=i}break;case 30:break;default:Gs(e,n)}}function Ds(e){var t=e.alternate;null!==t&&(e.alternate=null,Ds(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Ge(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Rs=null,Ls=!1;function Os(e,t,n){for(n=n.child;null!==n;)Is(e,t,n),n=n.sibling}function Is(e,t,n){if(ve&&"function"===typeof ve.onCommitFiberUnmount)try{ve.onCommitFiberUnmount(xe,n)}catch(i){}switch(n.tag){case 26:As||ks(n,t),Os(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode).parentNode.removeChild(n);break;case 27:As||ks(n,t);var r=Rs,a=Ls;Eu(n.type)&&(Rs=n.stateNode,Ls=!1),Os(e,t,n),Iu(n.stateNode),Rs=r,Ls=a;break;case 5:As||ks(n,t);case 6:if(r=Rs,a=Ls,Rs=null,Os(e,t,n),Ls=a,null!==(Rs=r))if(Ls)try{(9===Rs.nodeType?Rs.body:"HTML"===Rs.nodeName?Rs.ownerDocument.body:Rs).removeChild(n.stateNode)}catch(o){Sd(n,t,o)}else try{Rs.removeChild(n.stateNode)}catch(o){Sd(n,t,o)}break;case 18:null!==Rs&&(Ls?(zu(9===(e=Rs).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,n.stateNode),Hp(e)):zu(Rs,n.stateNode));break;case 4:r=Rs,a=Ls,Rs=n.stateNode.containerInfo,Ls=!0,Os(e,t,n),Rs=r,Ls=a;break;case 0:case 11:case 14:case 15:xs(2,n,t),As||xs(4,n,t),Os(e,t,n);break;case 1:As||(ks(n,t),"function"===typeof(r=n.stateNode).componentWillUnmount&&bs(n,t,r)),Os(e,t,n);break;case 21:Os(e,t,n);break;case 22:As=(r=As)||null!==n.memoizedState,Os(e,t,n),As=r;break;default:Os(e,t,n)}}function Bs(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&null!==(e=e.memoizedState))){e=e.dehydrated;try{Hp(e)}catch(n){Sd(t,t.return,n)}}}function Ms(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Hp(e)}catch(n){Sd(t,t.return,n)}}function Us(e,t){var n=function(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new Fs),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new Fs),t;default:throw Error(o(435,e.tag))}}(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Nd.bind(null,e,t);t.then(r,r)}})}function Vs(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var a=n[r],i=e,l=t,s=l;e:for(;null!==s;){switch(s.tag){case 27:if(Eu(s.type)){Rs=s.stateNode,Ls=!1;break e}break;case 5:Rs=s.stateNode,Ls=!1;break e;case 3:case 4:Rs=s.stateNode.containerInfo,Ls=!0;break e}s=s.return}if(null===Rs)throw Error(o(160));Is(i,l,a),Rs=null,Ls=!1,null!==(i=a.alternate)&&(i.return=null),a.return=null}if(13886&t.subtreeFlags)for(t=t.child;null!==t;)Hs(t,e),t=t.sibling}var Ks=null;function Hs(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Vs(t,e),Ws(e),4&r&&(xs(3,e,e.return),gs(3,e),xs(5,e,e.return));break;case 1:Vs(t,e),Ws(e),512&r&&(As||null===n||ks(n,n.return)),64&r&&Ns&&(null!==(e=e.updateQueue)&&(null!==(r=e.callbacks)&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===n?r:n.concat(r))));break;case 26:var a=Ks;if(Vs(t,e),Ws(e),512&r&&(As||null===n||ks(n,n.return)),4&r){var i=null!==n?n.memoizedState:null;if(r=e.memoizedState,null===n)if(null===r)if(null===e.stateNode){e:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;t:switch(r){case"title":(!(i=a.getElementsByTagName("title")[0])||i[Ye]||i[Me]||"http://www.w3.org/2000/svg"===i.namespaceURI||i.hasAttribute("itemprop"))&&(i=a.createElement(r),a.head.insertBefore(i,a.querySelector("head > title"))),hu(i,r,n),i[Me]=e,et(i),r=i;break e;case"link":var l=rp("link","href",a).get(r+(n.href||""));if(l)for(var s=0;s<l.length;s++)if((i=l[s]).getAttribute("href")===(null==n.href||""===n.href?null:n.href)&&i.getAttribute("rel")===(null==n.rel?null:n.rel)&&i.getAttribute("title")===(null==n.title?null:n.title)&&i.getAttribute("crossorigin")===(null==n.crossOrigin?null:n.crossOrigin)){l.splice(s,1);break t}hu(i=a.createElement(r),r,n),a.head.appendChild(i);break;case"meta":if(l=rp("meta","content",a).get(r+(n.content||"")))for(s=0;s<l.length;s++)if((i=l[s]).getAttribute("content")===(null==n.content?null:""+n.content)&&i.getAttribute("name")===(null==n.name?null:n.name)&&i.getAttribute("property")===(null==n.property?null:n.property)&&i.getAttribute("http-equiv")===(null==n.httpEquiv?null:n.httpEquiv)&&i.getAttribute("charset")===(null==n.charSet?null:n.charSet)){l.splice(s,1);break t}hu(i=a.createElement(r),r,n),a.head.appendChild(i);break;default:throw Error(o(468,r))}i[Me]=e,et(i),r=i}e.stateNode=r}else ap(a,e.type,e.stateNode);else e.stateNode=Xu(a,r,e.memoizedProps);else i!==r?(null===i?null!==n.stateNode&&(n=n.stateNode).parentNode.removeChild(n):i.count--,null===r?ap(a,e.type,e.stateNode):Xu(a,r,e.memoizedProps)):null===r&&null!==e.stateNode&&ws(e,e.memoizedProps,n.memoizedProps)}break;case 27:Vs(t,e),Ws(e),512&r&&(As||null===n||ks(n,n.return)),null!==n&&4&r&&ws(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Vs(t,e),Ws(e),512&r&&(As||null===n||ks(n,n.return)),32&e.flags){a=e.stateNode;try{St(a,"")}catch(m){Sd(e,e.return,m)}}4&r&&null!=e.stateNode&&ws(e,a=e.memoizedProps,null!==n?n.memoizedProps:a),1024&r&&(Cs=!0);break;case 6:if(Vs(t,e),Ws(e),4&r){if(null===e.stateNode)throw Error(o(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(m){Sd(e,e.return,m)}}break;case 3:if(np=null,a=Ks,Ks=Uu(t.containerInfo),Vs(t,e),Ks=a,Ws(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Hp(t.containerInfo)}catch(m){Sd(e,e.return,m)}Cs&&(Cs=!1,Ys(e));break;case 4:r=Ks,Ks=Uu(e.stateNode.containerInfo),Vs(t,e),Ws(e),Ks=r;break;case 12:default:Vs(t,e),Ws(e);break;case 31:case 19:Vs(t,e),Ws(e),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Us(e,r)));break;case 13:Vs(t,e),Ws(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==n&&null!==n.memoizedState)&&(Tc=se()),4&r&&(null!==(r=e.updateQueue)&&(e.updateQueue=null,Us(e,r)));break;case 22:a=null!==e.memoizedState;var c=null!==n&&null!==n.memoizedState,d=Ns,u=As;if(Ns=d||a,As=u||c,Vs(t,e),As=u,Ns=d,Ws(e),8192&r)e:for(t=e.stateNode,t._visibility=a?-2&t._visibility:1|t._visibility,a&&(null===n||c||Ns||As||Qs(e)),n=null,t=e;;){if(5===t.tag||26===t.tag){if(null===n){c=n=t;try{if(i=c.stateNode,a)"function"===typeof(l=i.style).setProperty?l.setProperty("display","none","important"):l.display="none";else{s=c.stateNode;var p=c.memoizedProps.style,h=void 0!==p&&null!==p&&p.hasOwnProperty("display")?p.display:null;s.style.display=null==h||"boolean"===typeof h?"":(""+h).trim()}}catch(m){Sd(c,c.return,m)}}}else if(6===t.tag){if(null===n){c=t;try{c.stateNode.nodeValue=a?"":c.memoizedProps}catch(m){Sd(c,c.return,m)}}}else if(18===t.tag){if(null===n){c=t;try{var f=c.stateNode;a?Nu(f,!0):Nu(c.stateNode,!1)}catch(m){Sd(c,c.return,m)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}4&r&&(null!==(r=e.updateQueue)&&(null!==(n=r.retryQueue)&&(r.retryQueue=null,Us(e,n))));case 30:case 21:}}function Ws(e){var t=e.flags;if(2&t){try{for(var n,r=e.return;null!==r;){if(Ss(r)){n=r;break}r=r.return}if(null==n)throw Error(o(160));switch(n.tag){case 27:var a=n.stateNode;Es(e,$s(e),a);break;case 5:var i=n.stateNode;32&n.flags&&(St(i,""),n.flags&=-33),Es(e,$s(e),i);break;case 3:case 4:var l=n.stateNode.containerInfo;_s(e,$s(e),l);break;default:throw Error(o(161))}}catch(s){Sd(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Ys(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Ys(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Gs(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Ps(e,t.alternate,t),t=t.sibling}function Qs(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:xs(4,t,t.return),Qs(t);break;case 1:ks(t,t.return);var n=t.stateNode;"function"===typeof n.componentWillUnmount&&bs(t,t.return,n),Qs(t);break;case 27:Iu(t.stateNode);case 26:case 5:ks(t,t.return),Qs(t);break;case 22:null===t.memoizedState&&Qs(t);break;default:Qs(t)}e=e.sibling}}function Js(e,t,n){for(n=n&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var r=t.alternate,a=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:Js(a,i,n),gs(4,i);break;case 1:if(Js(a,i,n),"function"===typeof(a=(r=i).stateNode).componentDidMount)try{a.componentDidMount()}catch(c){Sd(r,r.return,c)}if(null!==(a=(r=i).updateQueue)){var l=r.stateNode;try{var s=a.shared.hiddenCallbacks;if(null!==s)for(a.shared.hiddenCallbacks=null,a=0;a<s.length;a++)$i(s[a],l)}catch(c){Sd(r,r.return,c)}}n&&64&o&&vs(i),ys(i,i.return);break;case 27:zs(i);case 26:case 5:Js(a,i,n),n&&null===r&&4&o&&js(i),ys(i,i.return);break;case 12:Js(a,i,n);break;case 31:Js(a,i,n),n&&4&o&&Bs(a,i);break;case 13:Js(a,i,n),n&&4&o&&Ms(a,i);break;case 22:null===i.memoizedState&&Js(a,i,n),ys(i,i.return);break;case 30:break;default:Js(a,i,n)}t=t.sibling}}function Xs(e,t){var n=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(n=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==n&&(null!=e&&e.refCount++,null!=n&&Ba(n))}function Zs(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ba(e))}function ec(e,t,n,r){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)tc(e,t,n,r),t=t.sibling}function tc(e,t,n,r){var a=t.flags;switch(t.tag){case 0:case 11:case 15:ec(e,t,n,r),2048&a&&gs(9,t);break;case 1:case 31:case 13:default:ec(e,t,n,r);break;case 3:ec(e,t,n,r),2048&a&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ba(e)));break;case 12:if(2048&a){ec(e,t,n,r),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,l=i.onPostCommit;"function"===typeof l&&l(o,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(s){Sd(t,t.return,s)}}else ec(e,t,n,r);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,null!==t.memoizedState?2&i._visibility?ec(e,t,n,r):rc(e,t):2&i._visibility?ec(e,t,n,r):(i._visibility|=2,nc(e,t,n,r,0!==(10256&t.subtreeFlags)||!1)),2048&a&&Xs(o,t);break;case 24:ec(e,t,n,r),2048&a&&Zs(t.alternate,t)}}function nc(e,t,n,r,a){for(a=a&&(0!==(10256&t.subtreeFlags)||!1),t=t.child;null!==t;){var i=e,o=t,l=n,s=r,c=o.flags;switch(o.tag){case 0:case 11:case 15:nc(i,o,l,s,a),gs(8,o);break;case 23:break;case 22:var d=o.stateNode;null!==o.memoizedState?2&d._visibility?nc(i,o,l,s,a):rc(i,o):(d._visibility|=2,nc(i,o,l,s,a)),a&&2048&c&&Xs(o.alternate,o);break;case 24:nc(i,o,l,s,a),a&&2048&c&&Zs(o.alternate,o);break;default:nc(i,o,l,s,a)}t=t.sibling}}function rc(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var n=e,r=t,a=r.flags;switch(r.tag){case 22:rc(n,r),2048&a&&Xs(r.alternate,r);break;case 24:rc(n,r),2048&a&&Zs(r.alternate,r);break;default:rc(n,r)}t=t.sibling}}var ac=8192;function ic(e,t,n){if(e.subtreeFlags&ac)for(e=e.child;null!==e;)oc(e,t,n),e=e.sibling}function oc(e,t,n){switch(e.tag){case 26:ic(e,t,n),e.flags&ac&&null!==e.memoizedState&&function(e,t,n,r){if("stylesheet"===n.type&&("string"!==typeof r.media||!1!==matchMedia(r.media).matches)&&0===(4&n.state.loading)){if(null===n.instance){var a=qu(r.href),i=t.querySelector(Yu(a));if(i)return null!==(t=i._p)&&"object"===typeof t&&"function"===typeof t.then&&(e.count++,e=lp.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,void et(i);i=t.ownerDocument||t,r=Gu(r),(a=Bu.get(a))&&ep(r,a),et(i=i.createElement("link"));var o=i;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),hu(i,"link",r),n.instance=i}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&0===(3&n.state.loading)&&(e.count++,n=lp.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}(n,Ks,e.memoizedState,e.memoizedProps);break;case 5:default:ic(e,t,n);break;case 3:case 4:var r=Ks;Ks=Uu(e.stateNode.containerInfo),ic(e,t,n),Ks=r;break;case 22:null===e.memoizedState&&(null!==(r=e.alternate)&&null!==r.memoizedState?(r=ac,ac=16777216,ic(e,t,n),ac=r):ic(e,t,n))}}function lc(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function sc(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];Ts=r,uc(r,e)}lc(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)cc(e),e=e.sibling}function cc(e){switch(e.tag){case 0:case 11:case 15:sc(e),2048&e.flags&&xs(9,e,e.return);break;case 3:case 12:default:sc(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,dc(e)):sc(e)}}function dc(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var n=0;n<t.length;n++){var r=t[n];Ts=r,uc(r,e)}lc(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:xs(8,t,t.return),dc(t);break;case 22:2&(n=t.stateNode)._visibility&&(n._visibility&=-3,dc(t));break;default:dc(t)}e=e.sibling}}function uc(e,t){for(;null!==Ts;){var n=Ts;switch(n.tag){case 0:case 11:case 15:xs(8,n,t);break;case 23:case 22:if(null!==n.memoizedState&&null!==n.memoizedState.cachePool){var r=n.memoizedState.cachePool.pool;null!=r&&r.refCount++}break;case 24:Ba(n.memoizedState.cache)}if(null!==(r=n.child))r.return=n,Ts=r;else e:for(n=e;null!==Ts;){var a=(r=Ts).sibling,i=r.return;if(Ds(r),r===n){Ts=null;break e}if(null!==a){a.return=i,Ts=a;break e}Ts=i}}}var pc={getCacheForType:function(e){var t=Fa(Oa),n=t.data.get(e);return void 0===n&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Fa(Oa).controller.signal}},hc="function"===typeof WeakMap?WeakMap:Map,fc=0,mc=null,gc=null,xc=0,vc=0,bc=null,yc=!1,kc=!1,jc=!1,wc=0,Sc=0,$c=0,_c=0,Ec=0,zc=0,Nc=0,Ac=null,Cc=null,Fc=!1,Tc=0,Pc=0,Dc=1/0,Rc=null,Lc=null,Oc=0,Ic=null,Bc=null,Mc=0,Uc=0,Vc=null,Kc=null,Hc=0,Wc=null;function qc(){return 0!==(2&fc)&&0!==xc?xc&-xc:null!==P.T?Vd():Oe()}function Yc(){if(0===zc)if(0===(536870912&xc)||ua){var e=Se;0===(3932160&(Se<<=1))&&(Se=262144),zc=e}else zc=536870912;return null!==(e=Fi.current)&&(e.flags|=32),zc}function Gc(e,t,n){(e!==mc||2!==vc&&9!==vc)&&null===e.cancelPendingCommit||(nd(e,0),Zc(e,xc,zc,!1)),Fe(e,n),0!==(2&fc)&&e===mc||(e===mc&&(0===(2&fc)&&(_c|=n),4===Sc&&Zc(e,xc,zc,!1)),Rd(e))}function Qc(e,t,n){if(0!==(6&fc))throw Error(o(327));for(var r=!n&&0===(127&t)&&0===(t&e.expiredLanes)||ze(e,t),a=r?function(e,t){var n=fc;fc|=2;var r=id(),a=od();mc!==e||xc!==t?(Rc=null,Dc=se()+500,nd(e,t)):kc=ze(e,t);e:for(;;)try{if(0!==vc&&null!==gc){t=gc;var i=bc;t:switch(vc){case 1:vc=0,bc=null,hd(e,t,i,1);break;case 2:case 9:if(ti(i)){vc=0,bc=null,pd(t);break}t=function(){2!==vc&&9!==vc||mc!==e||(vc=7),Rd(e)},i.then(t,t);break e;case 3:vc=7;break e;case 4:vc=5;break e;case 7:ti(i)?(vc=0,bc=null,pd(t)):(vc=0,bc=null,hd(e,t,i,7));break;case 5:var l=null;switch(gc.tag){case 26:l=gc.memoizedState;case 5:case 27:var s=gc;if(l?ip(l):s.stateNode.complete){vc=0,bc=null;var c=s.sibling;if(null!==c)gc=c;else{var d=s.return;null!==d?(gc=d,fd(d)):gc=null}break t}}vc=0,bc=null,hd(e,t,i,5);break;case 6:vc=0,bc=null,hd(e,t,i,6);break;case 8:td(),Sc=6;break e;default:throw Error(o(462))}}dd();break}catch(u){rd(e,u)}return Sa=wa=null,P.H=r,P.A=a,fc=n,null!==gc?0:(mc=null,xc=0,Ar(),Sc)}(e,t):sd(e,t,!0),i=r;;){if(0===a){kc&&!r&&Zc(e,t,0,!1);break}if(n=e.current.alternate,!i||Xc(n)){if(2===a){if(i=t,e.errorRecoveryDisabledLanes&i)var l=0;else l=0!==(l=-536870913&e.pendingLanes)?l:536870912&l?536870912:0;if(0!==l){t=l;e:{var s=e;a=Ac;var c=s.current.memoizedState.isDehydrated;if(c&&(nd(s,l).flags|=256),2!==(l=sd(s,l,!1))){if(jc&&!c){s.errorRecoveryDisabledLanes|=i,_c|=i,a=4;break e}i=Cc,Cc=a,null!==i&&(null===Cc?Cc=i:Cc.push.apply(Cc,i))}a=l}if(i=!1,2!==a)continue}}if(1===a){nd(e,0),Zc(e,t,0,!0);break}e:{switch(r=e,i=a){case 0:case 1:throw Error(o(345));case 4:if((4194048&t)!==t)break;case 6:Zc(r,t,zc,!yc);break e;case 2:Cc=null;break;case 3:case 5:break;default:throw Error(o(329))}if((62914560&t)===t&&10<(a=Tc+300-se())){if(Zc(r,t,zc,!yc),0!==Ee(r,0,!0))break e;Mc=t,r.timeoutHandle=ju(Jc.bind(null,r,n,Cc,Rc,Fc,t,zc,_c,Nc,yc,i,"Throttled",-0,0),a)}else Jc(r,n,Cc,Rc,Fc,t,zc,_c,Nc,yc,i,null,-0,0)}break}a=sd(e,t,!1),i=!1}Rd(e)}function Jc(e,t,n,r,a,i,o,l,s,c,d,u,p,h){if(e.timeoutHandle=-1,8192&(u=t.subtreeFlags)||16785408===(16785408&u)){oc(t,i,u={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ft});var f=(62914560&i)===i?Tc-se():(4194048&i)===i?Pc-se():0;if(null!==(f=function(e,t){return e.stylesheets&&0===e.count&&cp(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&cp(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&0===op&&(op=62500*function(){if("function"===typeof performance.getEntriesByType){for(var e=0,t=0,n=performance.getEntriesByType("resource"),r=0;r<n.length;r++){var a=n[r],i=a.transferSize,o=a.initiatorType,l=a.duration;if(i&&l&&fu(o)){for(o=0,l=a.responseEnd,r+=1;r<n.length;r++){var s=n[r],c=s.startTime;if(c>l)break;var d=s.transferSize,u=s.initiatorType;d&&fu(u)&&(o+=d*((s=s.responseEnd)<l?1:(l-c)/(s-c)))}if(--r,t+=8*(i+o)/(a.duration/1e3),10<++e)break}}if(0<e)return t/e/1e6}return navigator.connection&&"number"===typeof(e=navigator.connection.downlink)?e:5}());var a=setTimeout(function(){if(e.waitingForImages=!1,0===e.count&&(e.stylesheets&&cp(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>op?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(a)}}:null}(u,f)))return Mc=i,e.cancelPendingCommit=f(gd.bind(null,e,t,i,n,r,a,o,l,s,d,u,null,p,h)),void Zc(e,i,o,!c)}gd(e,t,i,n,r,a,o,l,s)}function Xc(e){for(var t=e;;){var n=t.tag;if((0===n||11===n||15===n)&&16384&t.flags&&(null!==(n=t.updateQueue)&&null!==(n=n.stores)))for(var r=0;r<n.length;r++){var a=n[r],i=a.getSnapshot;a=a.value;try{if(!Xn(i(),a))return!1}catch(o){return!1}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zc(e,t,n,r){t&=~Ec,t&=~_c,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var a=t;0<a;){var i=31-ye(a),o=1<<i;r[i]=-1,a&=~o}0!==n&&Te(e,n,t)}function ed(){return 0!==(6&fc)||(Ld(0,!1),!1)}function td(){if(null!==gc){if(0===vc)var e=gc.return;else Sa=wa=null,oo(e=gc),li=null,si=0,e=gc;for(;null!==e;)ms(e.alternate,e),e=e.return;gc=null}}function nd(e,t){var n=e.timeoutHandle;-1!==n&&(e.timeoutHandle=-1,wu(n)),null!==(n=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,n()),Mc=0,td(),mc=e,gc=n=Br(e.current,null),xc=t,vc=0,bc=null,yc=!1,kc=ze(e,t),jc=!1,Nc=zc=Ec=_c=$c=Sc=0,Cc=Ac=null,Fc=!1,0!==(8&t)&&(t|=32&t);var r=e.entangledLanes;if(0!==r)for(e=e.entanglements,r&=t;0<r;){var a=31-ye(r),i=1<<a;t|=e[a],r&=~i}return wc=t,Ar(),n}function rd(e,t){Ui=null,P.H=ml,t===Ja||t===Za?(t=ii(),vc=3):t===Xa?(t=ii(),vc=4):vc=t===Fl?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,bc=t,null===gc&&(Sc=1,El(e,Yr(t,e.current)))}function ad(){var e=Fi.current;return null===e||((4194048&xc)===xc?null===Ti:((62914560&xc)===xc||0!==(536870912&xc))&&e===Ti)}function id(){var e=P.H;return P.H=ml,null===e?ml:e}function od(){var e=P.A;return P.A=pc,e}function ld(){Sc=4,yc||(4194048&xc)!==xc&&null!==Fi.current||(kc=!0),0===(134217727&$c)&&0===(134217727&_c)||null===mc||Zc(mc,xc,zc,!1)}function sd(e,t,n){var r=fc;fc|=2;var a=id(),i=od();mc===e&&xc===t||(Rc=null,nd(e,t)),t=!1;var o=Sc;e:for(;;)try{if(0!==vc&&null!==gc){var l=gc,s=bc;switch(vc){case 8:td(),o=6;break e;case 3:case 2:case 9:case 6:null===Fi.current&&(t=!0);var c=vc;if(vc=0,bc=null,hd(e,l,s,c),n&&kc){o=0;break e}break;default:c=vc,vc=0,bc=null,hd(e,l,s,c)}}cd(),o=Sc;break}catch(d){rd(e,d)}return t&&e.shellSuspendCounter++,Sa=wa=null,fc=r,P.H=a,P.A=i,null===gc&&(mc=null,xc=0,Ar()),o}function cd(){for(;null!==gc;)ud(gc)}function dd(){for(;null!==gc&&!oe();)ud(gc)}function ud(e){var t=os(e.alternate,e,wc);e.memoizedProps=e.pendingProps,null===t?fd(e):gc=t}function pd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Hl(n,t,t.pendingProps,t.type,void 0,xc);break;case 11:t=Hl(n,t,t.pendingProps,t.type.render,t.ref,xc);break;case 5:oo(t);default:ms(n,t),t=os(n,t=gc=Mr(t,wc),wc)}e.memoizedProps=e.pendingProps,null===t?fd(e):gc=t}function hd(e,t,n,r){Sa=wa=null,oo(t),li=null,si=0;var a=t.return;try{if(function(e,t,n,r,a){if(n.flags|=32768,null!==r&&"object"===typeof r&&"function"===typeof r.then){if(null!==(t=n.alternate)&&Na(t,n,a,!0),null!==(n=Fi.current)){switch(n.tag){case 31:case 13:return null===Ti?ld():null===n.alternate&&0===Sc&&(Sc=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ei?n.flags|=16384:(null===(t=n.updateQueue)?n.updateQueue=new Set([r]):t.add(r),$d(e,r,a)),!1;case 22:return n.flags|=65536,r===ei?n.flags|=16384:(null===(t=n.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):null===(n=t.retryQueue)?t.retryQueue=new Set([r]):n.add(r),$d(e,r,a)),!1}throw Error(o(435,n.tag))}return $d(e,r,a),ld(),!1}if(ua)return null!==(t=Fi.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==fa&&ka(Yr(e=Error(o(422),{cause:r}),n))):(r!==fa&&ka(Yr(t=Error(o(423),{cause:r}),n)),(e=e.current.alternate).flags|=65536,a&=-a,e.lanes|=a,r=Yr(r,n),ki(e,a=Nl(e.stateNode,r,a)),4!==Sc&&(Sc=2)),!1;var i=Error(o(520),{cause:r});if(i=Yr(i,n),null===Ac?Ac=[i]:Ac.push(i),4!==Sc&&(Sc=2),null===t)return!0;r=Yr(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,ki(n,e=Nl(n.stateNode,r,e)),!1;case 1:if(t=n.type,i=n.stateNode,0===(128&n.flags)&&("function"===typeof t.getDerivedStateFromError||null!==i&&"function"===typeof i.componentDidCatch&&(null===Lc||!Lc.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,Cl(a=Al(a),e,n,r),ki(n,a),!1}n=n.return}while(null!==n);return!1}(e,a,t,n,xc))return Sc=1,El(e,Yr(n,e.current)),void(gc=null)}catch(i){if(null!==a)throw gc=a,i;return Sc=1,El(e,Yr(n,e.current)),void(gc=null)}32768&t.flags?(ua||1===r?e=!0:kc||0!==(536870912&xc)?e=!1:(yc=e=!0,(2===r||9===r||3===r||6===r)&&(null!==(r=Fi.current)&&13===r.tag&&(r.flags|=16384))),md(t,e)):fd(t)}function fd(e){var t=e;do{if(0!==(32768&t.flags))return void md(t,yc);e=t.return;var n=hs(t.alternate,t,wc);if(null!==n)return void(gc=n);if(null!==(t=t.sibling))return void(gc=t);gc=t=e}while(null!==t);0===Sc&&(Sc=5)}function md(e,t){do{var n=fs(e.alternate,e);if(null!==n)return n.flags&=32767,void(gc=n);if(null!==(n=e.return)&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&null!==(e=e.sibling))return void(gc=e);gc=e=n}while(null!==e);Sc=6,gc=null}function gd(e,t,n,r,a,i,l,s,c){e.cancelPendingCommit=null;do{kd()}while(0!==Oc);if(0!==(6&fc))throw Error(o(327));if(null!==t){if(t===e.current)throw Error(o(177));if(i=t.lanes|t.childLanes,function(e,t,n,r,a,i){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var l=e.entanglements,s=e.expirationTimes,c=e.hiddenUpdates;for(n=o&~n;0<n;){var d=31-ye(n),u=1<<d;l[d]=0,s[d]=-1;var p=c[d];if(null!==p)for(c[d]=null,d=0;d<p.length;d++){var h=p[d];null!==h&&(h.lane&=-536870913)}n&=~u}0!==r&&Te(e,r,0),0!==i&&0===a&&0!==e.tag&&(e.suspendedLanes|=i&~(o&~t))}(e,n,i|=Nr,l,s,c),e===mc&&(gc=mc=null,xc=0),Bc=t,Ic=e,Mc=n,Uc=i,Vc=a,Kc=r,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,ae(pe,function(){return jd(),null})):(e.callbackNode=null,e.callbackPriority=0),r=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||r){r=P.T,P.T=null,a=D.p,D.p=2,l=fc,fc|=4;try{!function(e,t){if(e=e.containerInfo,mu=yp,ar(e=rr(e))){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var a=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch(g){n=null;break e}var l=0,s=-1,c=-1,d=0,u=0,p=e,h=null;t:for(;;){for(var f;p!==n||0!==a&&3!==p.nodeType||(s=l+a),p!==i||0!==r&&3!==p.nodeType||(c=l+r),3===p.nodeType&&(l+=p.nodeValue.length),null!==(f=p.firstChild);)h=p,p=f;for(;;){if(p===e)break t;if(h===n&&++d===a&&(s=l),h===i&&++u===r&&(c=l),null!==(f=p.nextSibling))break;h=(p=h).parentNode}p=f}n=-1===s||-1===c?null:{start:s,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(gu={focusedElem:e,selectionRange:n},yp=!1,Ts=t;null!==Ts;)if(e=(t=Ts).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Ts=e;else for(;null!==Ts;){switch(i=(t=Ts).alternate,e=t.flags,t.tag){case 0:if(0!==(4&e)&&null!==(e=null!==(e=t.updateQueue)?e.events:null))for(n=0;n<e.length;n++)(a=e[n]).ref.impl=a.nextImpl;break;case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==i){e=void 0,n=t,a=i.memoizedProps,i=i.memoizedState,r=n.stateNode;try{var m=wl(n.type,a);e=r.getSnapshotBeforeUpdate(m,i),r.__reactInternalSnapshotBeforeUpdate=e}catch(x){Sd(n,n.return,x)}}break;case 3:if(0!==(1024&e))if(9===(n=(e=t.stateNode.containerInfo).nodeType))Au(e);else if(1===n)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Au(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(o(163))}if(null!==(e=t.sibling)){e.return=t.return,Ts=e;break}Ts=t.return}}(e,t)}finally{fc=l,D.p=a,P.T=r}}Oc=1,xd(),vd(),bd()}}function xd(){if(1===Oc){Oc=0;var e=Ic,t=Bc,n=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||n){n=P.T,P.T=null;var r=D.p;D.p=2;var a=fc;fc|=4;try{Hs(t,e);var i=gu,o=rr(e.containerInfo),l=i.focusedElem,s=i.selectionRange;if(o!==l&&l&&l.ownerDocument&&nr(l.ownerDocument.documentElement,l)){if(null!==s&&ar(l)){var c=s.start,d=s.end;if(void 0===d&&(d=c),"selectionStart"in l)l.selectionStart=c,l.selectionEnd=Math.min(d,l.value.length);else{var u=l.ownerDocument||document,p=u&&u.defaultView||window;if(p.getSelection){var h=p.getSelection(),f=l.textContent.length,m=Math.min(s.start,f),g=void 0===s.end?m:Math.min(s.end,f);!h.extend&&m>g&&(o=g,g=m,m=o);var x=tr(l,m),v=tr(l,g);if(x&&v&&(1!==h.rangeCount||h.anchorNode!==x.node||h.anchorOffset!==x.offset||h.focusNode!==v.node||h.focusOffset!==v.offset)){var b=u.createRange();b.setStart(x.node,x.offset),h.removeAllRanges(),m>g?(h.addRange(b),h.extend(v.node,v.offset)):(b.setEnd(v.node,v.offset),h.addRange(b))}}}}for(u=[],h=l;h=h.parentNode;)1===h.nodeType&&u.push({element:h,left:h.scrollLeft,top:h.scrollTop});for("function"===typeof l.focus&&l.focus(),l=0;l<u.length;l++){var y=u[l];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}yp=!!mu,gu=mu=null}finally{fc=a,D.p=r,P.T=n}}e.current=t,Oc=2}}function vd(){if(2===Oc){Oc=0;var e=Ic,t=Bc,n=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||n){n=P.T,P.T=null;var r=D.p;D.p=2;var a=fc;fc|=4;try{Ps(e,t.alternate,t)}finally{fc=a,D.p=r,P.T=n}}Oc=3}}function bd(){if(4===Oc||3===Oc){Oc=0,le();var e=Ic,t=Bc,n=Mc,r=Kc;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Oc=5:(Oc=0,Bc=Ic=null,yd(e,e.pendingLanes));var a=e.pendingLanes;if(0===a&&(Lc=null),Le(n),t=t.stateNode,ve&&"function"===typeof ve.onCommitFiberRoot)try{ve.onCommitFiberRoot(xe,t,void 0,128===(128&t.current.flags))}catch(s){}if(null!==r){t=P.T,a=D.p,D.p=2,P.T=null;try{for(var i=e.onRecoverableError,o=0;o<r.length;o++){var l=r[o];i(l.value,{componentStack:l.stack})}}finally{P.T=t,D.p=a}}0!==(3&Mc)&&kd(),Rd(e),a=e.pendingLanes,0!==(261930&n)&&0!==(42&a)?e===Wc?Hc++:(Hc=0,Wc=e):Hc=0,Ld(0,!1)}}function yd(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Ba(t)))}function kd(){return xd(),vd(),bd(),jd()}function jd(){if(5!==Oc)return!1;var e=Ic,t=Uc;Uc=0;var n=Le(Mc),r=P.T,a=D.p;try{D.p=32>n?32:n,P.T=null,n=Vc,Vc=null;var i=Ic,l=Mc;if(Oc=0,Bc=Ic=null,Mc=0,0!==(6&fc))throw Error(o(331));var s=fc;if(fc|=4,cc(i.current),tc(i,i.current,l,n),fc=s,Ld(0,!1),ve&&"function"===typeof ve.onPostCommitFiberRoot)try{ve.onPostCommitFiberRoot(xe,i)}catch(c){}return!0}finally{D.p=a,P.T=r,yd(e,t)}}function wd(e,t,n){t=Yr(n,t),null!==(e=bi(e,t=Nl(e.stateNode,t,2),2))&&(Fe(e,2),Rd(e))}function Sd(e,t,n){if(3===e.tag)wd(e,e,n);else for(;null!==t;){if(3===t.tag){wd(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof r.componentDidCatch&&(null===Lc||!Lc.has(r))){e=Yr(n,e),null!==(r=bi(t,n=Al(2),2))&&(Cl(n,r,t,e),Fe(r,2),Rd(r));break}}t=t.return}}function $d(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new hc;var a=new Set;r.set(t,a)}else void 0===(a=r.get(t))&&(a=new Set,r.set(t,a));a.has(n)||(jc=!0,a.add(n),e=_d.bind(null,e,t,n),t.then(e,e))}function _d(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,mc===e&&(xc&n)===n&&(4===Sc||3===Sc&&(62914560&xc)===xc&&300>se()-Tc?0===(2&fc)&&nd(e,0):Ec|=n,Nc===xc&&(Nc=0)),Rd(e)}function Ed(e,t){0===t&&(t=Ae()),null!==(e=Tr(e,t))&&(Fe(e,t),Rd(e))}function zd(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Ed(e,n)}function Nd(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;null!==a&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(o(314))}null!==r&&r.delete(t),Ed(e,n)}var Ad=null,Cd=null,Fd=!1,Td=!1,Pd=!1,Dd=0;function Rd(e){e!==Cd&&null===e.next&&(null===Cd?Ad=Cd=e:Cd=Cd.next=e),Td=!0,Fd||(Fd=!0,$u(function(){0!==(6&fc)?ae(de,Od):Id()}))}function Ld(e,t){if(!Pd&&Td){Pd=!0;do{for(var n=!1,r=Ad;null!==r;){if(!t)if(0!==e){var a=r.pendingLanes;if(0===a)var i=0;else{var o=r.suspendedLanes,l=r.pingedLanes;i=(1<<31-ye(42|e)+1)-1,i=201326741&(i&=a&~(o&~l))?201326741&i|1:i?2|i:0}0!==i&&(n=!0,Ud(r,i))}else i=xc,0===(3&(i=Ee(r,r===mc?i:0,null!==r.cancelPendingCommit||-1!==r.timeoutHandle)))||ze(r,i)||(n=!0,Ud(r,i));r=r.next}}while(n);Pd=!1}}function Od(){Id()}function Id(){Td=Fd=!1;var e=0;0!==Dd&&function(){var e=window.event;if(e&&"popstate"===e.type)return e!==ku&&(ku=e,!0);return ku=null,!1}()&&(e=Dd);for(var t=se(),n=null,r=Ad;null!==r;){var a=r.next,i=Bd(r,t);0===i?(r.next=null,null===n?Ad=a:n.next=a,null===a&&(Cd=n)):(n=r,(0!==e||0!==(3&i))&&(Td=!0)),r=a}0!==Oc&&5!==Oc||Ld(e,!1),0!==Dd&&(Dd=0)}function Bd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,i=-62914561&e.pendingLanes;0<i;){var o=31-ye(i),l=1<<o,s=a[o];-1===s?0!==(l&n)&&0===(l&r)||(a[o]=Ne(l,t)):s<=t&&(e.expiredLanes|=l),i&=~l}if(n=xc,n=Ee(e,e===(t=mc)?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),r=e.callbackNode,0===n||e===t&&(2===vc||9===vc)||null!==e.cancelPendingCommit)return null!==r&&null!==r&&ie(r),e.callbackNode=null,e.callbackPriority=0;if(0===(3&n)||ze(e,n)){if((t=n&-n)===e.callbackPriority)return t;switch(null!==r&&ie(r),Le(n)){case 2:case 8:n=ue;break;case 32:default:n=pe;break;case 268435456:n=fe}return r=Md.bind(null,e),n=ae(n,r),e.callbackPriority=t,e.callbackNode=n,t}return null!==r&&null!==r&&ie(r),e.callbackPriority=2,e.callbackNode=null,2}function Md(e,t){if(0!==Oc&&5!==Oc)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(kd()&&e.callbackNode!==n)return null;var r=xc;return 0===(r=Ee(e,e===mc?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Qc(e,r,t),Bd(e,se()),null!=e.callbackNode&&e.callbackNode===n?Md.bind(null,e):null)}function Ud(e,t){if(kd())return null;Qc(e,t,!0)}function Vd(){if(0===Dd){var e=Va;0===e&&(e=we,0===(261888&(we<<=1))&&(we=256)),Dd=e}return Dd}function Kd(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:Ct(""+e)}function Hd(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}for(var Wd=0;Wd<Sr.length;Wd++){var qd=Sr[Wd];$r(qd.toLowerCase(),"on"+(qd[0].toUpperCase()+qd.slice(1)))}$r(gr,"onAnimationEnd"),$r(xr,"onAnimationIteration"),$r(vr,"onAnimationStart"),$r("dblclick","onDoubleClick"),$r("focusin","onFocus"),$r("focusout","onBlur"),$r(br,"onTransitionRun"),$r(yr,"onTransitionStart"),$r(kr,"onTransitionCancel"),$r(jr,"onTransitionEnd"),at("onMouseEnter",["mouseout","mouseover"]),at("onMouseLeave",["mouseout","mouseover"]),at("onPointerEnter",["pointerout","pointerover"]),at("onPointerLeave",["pointerout","pointerover"]),rt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),rt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),rt("onBeforeInput",["compositionend","keypress","textInput","paste"]),rt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),rt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yd="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gd=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yd));function Qd(e,t){t=0!==(4&t);for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var l=r[o],s=l.instance,c=l.currentTarget;if(l=l.listener,s!==i&&a.isPropagationStopped())break e;i=l,a.currentTarget=c;try{i(a)}catch(d){_r(d)}a.currentTarget=null,i=s}else for(o=0;o<r.length;o++){if(s=(l=r[o]).instance,c=l.currentTarget,l=l.listener,s!==i&&a.isPropagationStopped())break e;i=l,a.currentTarget=c;try{i(a)}catch(d){_r(d)}a.currentTarget=null,i=s}}}}function Jd(e,t){var n=t[Ke];void 0===n&&(n=t[Ke]=new Set);var r=e+"__bubble";n.has(r)||(tu(t,e,2,!1),n.add(r))}function Xd(e,t,n){var r=0;t&&(r|=4),tu(n,e,r,t)}var Zd="_reactListening"+Math.random().toString(36).slice(2);function eu(e){if(!e[Zd]){e[Zd]=!0,tt.forEach(function(t){"selectionchange"!==t&&(Gd.has(t)||Xd(t,!1,e),Xd(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Zd]||(t[Zd]=!0,Xd("selectionchange",!1,t))}}function tu(e,t,n,r){switch(Ep(t)){case 2:var a=kp;break;case 8:a=jp;break;default:a=wp}n=a.bind(null,t,n,e),a=void 0,!Ut||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),r?void 0!==a?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):void 0!==a?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function nu(e,t,n,r,a){var i=r;if(0===(1&t)&&0===(2&t)&&null!==r)e:for(;;){if(null===r)return;var o=r.tag;if(3===o||4===o){var l=r.stateNode.containerInfo;if(l===a)break;if(4===o)for(o=r.return;null!==o;){var c=o.tag;if((3===c||4===c)&&o.stateNode.containerInfo===a)return;o=o.return}for(;null!==l;){if(null===(o=Qe(l)))return;if(5===(c=o.tag)||6===c||26===c||27===c){r=i=o;continue e}l=l.parentNode}}r=r.return}It(function(){var r=i,a=Pt(n),o=[];e:{var l=wr.get(e);if(void 0!==l){var c=nn,d=e;switch(e){case"keypress":if(0===Yt(n))break e;case"keydown":case"keyup":c=vn;break;case"focusin":d="focus",c=cn;break;case"focusout":d="blur",c=cn;break;case"beforeblur":case"afterblur":c=cn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=ln;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=sn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=yn;break;case gr:case xr:case vr:c=dn;break;case jr:c=kn;break;case"scroll":case"scrollend":c=an;break;case"wheel":c=jn;break;case"copy":case"cut":case"paste":c=un;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=bn;break;case"toggle":case"beforetoggle":c=wn}var u=0!==(4&t),p=!u&&("scroll"===e||"scrollend"===e),h=u?null!==l?l+"Capture":null:l;u=[];for(var f,m=r;null!==m;){var g=m;if(f=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===f||null===h||null!=(g=Bt(m,h))&&u.push(ru(m,g,f)),p)break;m=m.return}0<u.length&&(l=new c(l,d,null,n,a),o.push({event:l,listeners:u}))}}if(0===(7&t)){if(c="mouseout"===e||"pointerout"===e,(!(l="mouseover"===e||"pointerover"===e)||n===Tt||!(d=n.relatedTarget||n.fromElement)||!Qe(d)&&!d[Ve])&&(c||l)&&(l=a.window===a?a:(l=a.ownerDocument)?l.defaultView||l.parentWindow:window,c?(c=r,null!==(d=(d=n.relatedTarget||n.toElement)?Qe(d):null)&&(p=s(d),u=d.tag,d!==p||5!==u&&27!==u&&6!==u)&&(d=null)):(c=null,d=r),c!==d)){if(u=ln,g="onMouseLeave",h="onMouseEnter",m="mouse","pointerout"!==e&&"pointerover"!==e||(u=bn,g="onPointerLeave",h="onPointerEnter",m="pointer"),p=null==c?l:Xe(c),f=null==d?l:Xe(d),(l=new u(g,m+"leave",c,n,a)).target=p,l.relatedTarget=f,g=null,Qe(a)===r&&((u=new u(h,m+"enter",d,n,a)).target=f,u.relatedTarget=p,g=u),p=g,c&&d)e:{for(u=iu,m=d,f=0,g=h=c;g;g=u(g))f++;g=0;for(var x=m;x;x=u(x))g++;for(;0<f-g;)h=u(h),f--;for(;0<g-f;)m=u(m),g--;for(;f--;){if(h===m||null!==m&&h===m.alternate){u=h;break e}h=u(h),m=u(m)}u=null}else u=null;null!==c&&ou(o,l,c,u,!1),null!==d&&null!==p&&ou(o,p,d,u,!0)}if("select"===(c=(l=r?Xe(r):window).nodeName&&l.nodeName.toLowerCase())||"input"===c&&"file"===l.type)var v=Mn;else if(Dn(l))if(Un)v=Jn;else{v=Gn;var b=Yn}else!(c=l.nodeName)||"input"!==c.toLowerCase()||"checkbox"!==l.type&&"radio"!==l.type?r&&zt(r.elementType)&&(v=Mn):v=Qn;switch(v&&(v=v(e,r))?Rn(o,v,n,a):(b&&b(e,l,r),"focusout"===e&&r&&"number"===l.type&&null!=r.memoizedProps.value&&yt(l,"number",l.value)),b=r?Xe(r):window,e){case"focusin":(Dn(b)||"true"===b.contentEditable)&&(or=b,lr=r,sr=null);break;case"focusout":sr=lr=or=null;break;case"mousedown":cr=!0;break;case"contextmenu":case"mouseup":case"dragend":cr=!1,dr(o,n,a);break;case"selectionchange":if(ir)break;case"keydown":case"keyup":dr(o,n,a)}var y;if($n)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else Tn?Cn(e,n)&&(k="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(k="onCompositionStart");k&&(zn&&"ko"!==n.locale&&(Tn||"onCompositionStart"!==k?"onCompositionEnd"===k&&Tn&&(y=qt()):(Ht="value"in(Kt=a)?Kt.value:Kt.textContent,Tn=!0)),0<(b=au(r,k)).length&&(k=new pn(k,e,null,n,a),o.push({event:k,listeners:b}),y?k.data=y:null!==(y=Fn(n))&&(k.data=y))),(y=En?function(e,t){switch(e){case"compositionend":return Fn(t);case"keypress":return 32!==t.which?null:(An=!0,Nn);case"textInput":return(e=t.data)===Nn&&An?null:e;default:return null}}(e,n):function(e,t){if(Tn)return"compositionend"===e||!$n&&Cn(e,t)?(e=qt(),Wt=Ht=Kt=null,Tn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(k=au(r,"onBeforeInput")).length&&(b=new pn("onBeforeInput","beforeinput",null,n,a),o.push({event:b,listeners:k}),b.data=y)),function(e,t,n,r,a){if("submit"===t&&n&&n.stateNode===a){var i=Kd((a[Ue]||null).action),o=r.submitter;o&&null!==(t=(t=o[Ue]||null)?Kd(t.formAction):o.getAttribute("formAction"))&&(i=t,o=null);var l=new nn("action","action",null,r,a);e.push({event:l,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(0!==Dd){var e=o?Hd(a,o):new FormData(a);tl(n,{pending:!0,data:e,method:a.method,action:i},null,e)}}else"function"===typeof i&&(l.preventDefault(),e=o?Hd(a,o):new FormData(a),tl(n,{pending:!0,data:e,method:a.method,action:i},i,e))},currentTarget:a}]})}}(o,e,r,n,a)}Qd(o,t)})}function ru(e,t,n){return{instance:e,listener:t,currentTarget:n}}function au(e,t){for(var n=t+"Capture",r=[];null!==e;){var a=e,i=a.stateNode;if(5!==(a=a.tag)&&26!==a&&27!==a||null===i||(null!=(a=Bt(e,n))&&r.unshift(ru(e,a,i)),null!=(a=Bt(e,t))&&r.push(ru(e,a,i))),3===e.tag)return r;e=e.return}return[]}function iu(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function ou(e,t,n,r,a){for(var i=t._reactName,o=[];null!==n&&n!==r;){var l=n,s=l.alternate,c=l.stateNode;if(l=l.tag,null!==s&&s===r)break;5!==l&&26!==l&&27!==l||null===c||(s=c,a?null!=(c=Bt(n,i))&&o.unshift(ru(n,c,s)):a||null!=(c=Bt(n,i))&&o.push(ru(n,c,s))),n=n.return}0!==o.length&&e.push({event:t,listeners:o})}var lu=/\r\n?/g,su=/\u0000|\uFFFD/g;function cu(e){return("string"===typeof e?e:""+e).replace(lu,"\n").replace(su,"")}function du(e,t){return t=cu(t),cu(e)===t}function uu(e,t,n,r,a,i){switch(n){case"children":"string"===typeof r?"body"===t||"textarea"===t&&""===r||St(e,r):("number"===typeof r||"bigint"===typeof r)&&"body"!==t&&St(e,""+r);break;case"className":ct(e,"class",r);break;case"tabIndex":ct(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":ct(e,n,r);break;case"style":Et(e,r,i);break;case"data":if("object"!==t){ct(e,"data",r);break}case"src":case"href":if(""===r&&("a"!==t||"href"!==n)){e.removeAttribute(n);break}if(null==r||"function"===typeof r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=Ct(""+r),e.setAttribute(n,r);break;case"action":case"formAction":if("function"===typeof r){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof i&&("formAction"===n?("input"!==t&&uu(e,t,"name",a.name,a,null),uu(e,t,"formEncType",a.formEncType,a,null),uu(e,t,"formMethod",a.formMethod,a,null),uu(e,t,"formTarget",a.formTarget,a,null)):(uu(e,t,"encType",a.encType,a,null),uu(e,t,"method",a.method,a,null),uu(e,t,"target",a.target,a,null))),null==r||"symbol"===typeof r||"boolean"===typeof r){e.removeAttribute(n);break}r=Ct(""+r),e.setAttribute(n,r);break;case"onClick":null!=r&&(e.onclick=Ft);break;case"onScroll":null!=r&&Jd("scroll",e);break;case"onScrollEnd":null!=r&&Jd("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(o(61));if(null!=(n=r.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=n}}break;case"multiple":e.multiple=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"muted":e.muted=r&&"function"!==typeof r&&"symbol"!==typeof r;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==r||"function"===typeof r||"boolean"===typeof r||"symbol"===typeof r){e.removeAttribute("xlink:href");break}n=Ct(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""+r):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":!0===r?e.setAttribute(n,""):!1!==r&&null!=r&&"function"!==typeof r&&"symbol"!==typeof r?e.setAttribute(n,r):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":null!=r&&"function"!==typeof r&&"symbol"!==typeof r&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case"rowSpan":case"start":null==r||"function"===typeof r||"symbol"===typeof r||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case"popover":Jd("beforetoggle",e),Jd("toggle",e),st(e,"popover",r);break;case"xlinkActuate":dt(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":dt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":dt(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":dt(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":dt(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":dt(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":dt(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":dt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":dt(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":st(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<n.length)||"o"!==n[0]&&"O"!==n[0]||"n"!==n[1]&&"N"!==n[1])&&st(e,n=Nt.get(n)||n,r)}}function pu(e,t,n,r,a,i){switch(n){case"style":Et(e,r,i);break;case"dangerouslySetInnerHTML":if(null!=r){if("object"!==typeof r||!("__html"in r))throw Error(o(61));if(null!=(n=r.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=n}}break;case"children":"string"===typeof r?St(e,r):("number"===typeof r||"bigint"===typeof r)&&St(e,""+r);break;case"onScroll":null!=r&&Jd("scroll",e);break;case"onScrollEnd":null!=r&&Jd("scrollend",e);break;case"onClick":null!=r&&(e.onclick=Ft);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:nt.hasOwnProperty(n)||("o"!==n[0]||"n"!==n[1]||(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),"function"===typeof(i=null!=(i=e[Ue]||null)?i[n]:null)&&e.removeEventListener(t,i,a),"function"!==typeof r)?n in e?e[n]=r:!0===r?e.setAttribute(n,""):st(e,n,r):("function"!==typeof i&&null!==i&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a)))}}function hu(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Jd("error",e),Jd("load",e);var r,a=!1,i=!1;for(r in n)if(n.hasOwnProperty(r)){var l=n[r];if(null!=l)switch(r){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,r,l,n,null)}}return i&&uu(e,t,"srcSet",n.srcSet,n,null),void(a&&uu(e,t,"src",n.src,n,null));case"input":Jd("invalid",e);var s=r=l=i=null,c=null,d=null;for(a in n)if(n.hasOwnProperty(a)){var u=n[a];if(null!=u)switch(a){case"name":i=u;break;case"type":l=u;break;case"checked":c=u;break;case"defaultChecked":d=u;break;case"value":r=u;break;case"defaultValue":s=u;break;case"children":case"dangerouslySetInnerHTML":if(null!=u)throw Error(o(137,t));break;default:uu(e,t,a,u,n,null)}}return void bt(e,r,s,c,d,l,i,!1);case"select":for(i in Jd("invalid",e),a=l=r=null,n)if(n.hasOwnProperty(i)&&null!=(s=n[i]))switch(i){case"value":r=s;break;case"defaultValue":l=s;break;case"multiple":a=s;default:uu(e,t,i,s,n,null)}return t=r,n=l,e.multiple=!!a,void(null!=t?kt(e,!!a,t,!1):null!=n&&kt(e,!!a,n,!0));case"textarea":for(l in Jd("invalid",e),r=i=a=null,n)if(n.hasOwnProperty(l)&&null!=(s=n[l]))switch(l){case"value":a=s;break;case"defaultValue":i=s;break;case"children":r=s;break;case"dangerouslySetInnerHTML":if(null!=s)throw Error(o(91));break;default:uu(e,t,l,s,n,null)}return void wt(e,a,i,r);case"option":for(c in n)if(n.hasOwnProperty(c)&&null!=(a=n[c]))if("selected"===c)e.selected=a&&"function"!==typeof a&&"symbol"!==typeof a;else uu(e,t,c,a,n,null);return;case"dialog":Jd("beforetoggle",e),Jd("toggle",e),Jd("cancel",e),Jd("close",e);break;case"iframe":case"object":Jd("load",e);break;case"video":case"audio":for(a=0;a<Yd.length;a++)Jd(Yd[a],e);break;case"image":Jd("error",e),Jd("load",e);break;case"details":Jd("toggle",e);break;case"embed":case"source":case"link":Jd("error",e),Jd("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in n)if(n.hasOwnProperty(d)&&null!=(a=n[d]))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,d,a,n,null)}return;default:if(zt(t)){for(u in n)n.hasOwnProperty(u)&&(void 0!==(a=n[u])&&pu(e,t,u,a,n,void 0));return}}for(s in n)n.hasOwnProperty(s)&&(null!=(a=n[s])&&uu(e,t,s,a,n,null))}function fu(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}var mu=null,gu=null;function xu(e){return 9===e.nodeType?e:e.ownerDocument}function vu(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function bu(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function yu(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ku=null;var ju="function"===typeof setTimeout?setTimeout:void 0,wu="function"===typeof clearTimeout?clearTimeout:void 0,Su="function"===typeof Promise?Promise:void 0,$u="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Su?function(e){return Su.resolve(null).then(e).catch(_u)}:ju;function _u(e){setTimeout(function(){throw e})}function Eu(e){return"head"===e}function zu(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&8===a.nodeType)if("/$"===(n=a.data)||"/&"===n){if(0===r)return e.removeChild(a),void Hp(t);r--}else if("$"===n||"$?"===n||"$~"===n||"$!"===n||"&"===n)r++;else if("html"===n)Iu(e.ownerDocument.documentElement);else if("head"===n){Iu(n=e.ownerDocument.head);for(var i=n.firstChild;i;){var o=i.nextSibling,l=i.nodeName;i[Ye]||"SCRIPT"===l||"STYLE"===l||"LINK"===l&&"stylesheet"===i.rel.toLowerCase()||n.removeChild(i),i=o}}else"body"===n&&Iu(e.ownerDocument.body);n=a}while(n);Hp(t)}function Nu(e,t){var n=e;e=0;do{var r=n.nextSibling;if(1===n.nodeType?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",""===n.getAttribute("style")&&n.removeAttribute("style")):3===n.nodeType&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),r&&8===r.nodeType)if("/$"===(n=r.data)){if(0===e)break;e--}else"$"!==n&&"$?"!==n&&"$~"!==n&&"$!"!==n||e++;n=r}while(n)}function Au(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Au(n),Ge(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===n.rel.toLowerCase())continue}e.removeChild(n)}}function Cu(e,t){for(;8!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null;if(null===(e=Pu(e.nextSibling)))return null}return e}function Fu(e){return"$?"===e.data||"$~"===e.data}function Tu(e){return"$!"===e.data||"$?"===e.data&&"loading"!==e.ownerDocument.readyState}function Pu(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"$~"===t||"&"===t||"F!"===t||"F"===t)break;if("/$"===t||"/&"===t)return null}}return e}var Du=null;function Ru(e){e=e.nextSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n||"/&"===n){if(0===t)return Pu(e.nextSibling);t--}else"$"!==n&&"$!"!==n&&"$?"!==n&&"$~"!==n&&"&"!==n||t++}e=e.nextSibling}return null}function Lu(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n||"$~"===n||"&"===n){if(0===t)return e;t--}else"/$"!==n&&"/&"!==n||t++}e=e.previousSibling}return null}function Ou(e,t,n){switch(t=xu(n),e){case"html":if(!(e=t.documentElement))throw Error(o(452));return e;case"head":if(!(e=t.head))throw Error(o(453));return e;case"body":if(!(e=t.body))throw Error(o(454));return e;default:throw Error(o(451))}}function Iu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ge(e)}var Bu=new Map,Mu=new Set;function Uu(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Vu=D.d;D.d={f:function(){var e=Vu.f(),t=ed();return e||t},r:function(e){var t=Je(e);null!==t&&5===t.tag&&"form"===t.type?rl(t):Vu.r(e)},D:function(e){Vu.D(e),Hu("dns-prefetch",e,null)},C:function(e,t){Vu.C(e,t),Hu("preconnect",e,t)},L:function(e,t,n){Vu.L(e,t,n);var r=Ku;if(r&&e&&t){var a='link[rel="preload"][as="'+xt(t)+'"]';"image"===t&&n&&n.imageSrcSet?(a+='[imagesrcset="'+xt(n.imageSrcSet)+'"]',"string"===typeof n.imageSizes&&(a+='[imagesizes="'+xt(n.imageSizes)+'"]')):a+='[href="'+xt(e)+'"]';var i=a;switch(t){case"style":i=qu(e);break;case"script":i=Qu(e)}Bu.has(i)||(e=h({rel:"preload",href:"image"===t&&n&&n.imageSrcSet?void 0:e,as:t},n),Bu.set(i,e),null!==r.querySelector(a)||"style"===t&&r.querySelector(Yu(i))||"script"===t&&r.querySelector(Ju(i))||(hu(t=r.createElement("link"),"link",e),et(t),r.head.appendChild(t)))}},m:function(e,t){Vu.m(e,t);var n=Ku;if(n&&e){var r=t&&"string"===typeof t.as?t.as:"script",a='link[rel="modulepreload"][as="'+xt(r)+'"][href="'+xt(e)+'"]',i=a;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Qu(e)}if(!Bu.has(i)&&(e=h({rel:"modulepreload",href:e},t),Bu.set(i,e),null===n.querySelector(a))){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Ju(i)))return}hu(r=n.createElement("link"),"link",e),et(r),n.head.appendChild(r)}}},X:function(e,t){Vu.X(e,t);var n=Ku;if(n&&e){var r=Ze(n).hoistableScripts,a=Qu(e),i=r.get(a);i||((i=n.querySelector(Ju(a)))||(e=h({src:e,async:!0},t),(t=Bu.get(a))&&tp(e,t),et(i=n.createElement("script")),hu(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(a,i))}},S:function(e,t,n){Vu.S(e,t,n);var r=Ku;if(r&&e){var a=Ze(r).hoistableStyles,i=qu(e);t=t||"default";var o=a.get(i);if(!o){var l={loading:0,preload:null};if(o=r.querySelector(Yu(i)))l.loading=5;else{e=h({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Bu.get(i))&&ep(e,n);var s=o=r.createElement("link");et(s),hu(s,"link",e),s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),s.addEventListener("load",function(){l.loading|=1}),s.addEventListener("error",function(){l.loading|=2}),l.loading|=4,Zu(o,t,r)}o={type:"stylesheet",instance:o,count:1,state:l},a.set(i,o)}}},M:function(e,t){Vu.M(e,t);var n=Ku;if(n&&e){var r=Ze(n).hoistableScripts,a=Qu(e),i=r.get(a);i||((i=n.querySelector(Ju(a)))||(e=h({src:e,async:!0,type:"module"},t),(t=Bu.get(a))&&tp(e,t),et(i=n.createElement("script")),hu(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(a,i))}}};var Ku="undefined"===typeof document?null:document;function Hu(e,t,n){var r=Ku;if(r&&"string"===typeof t&&t){var a=xt(t);a='link[rel="'+e+'"][href="'+a+'"]',"string"===typeof n&&(a+='[crossorigin="'+n+'"]'),Mu.has(a)||(Mu.add(a),e={rel:e,crossOrigin:n,href:t},null===r.querySelector(a)&&(hu(t=r.createElement("link"),"link",e),et(t),r.head.appendChild(t)))}}function Wu(e,t,n,r){var a,i,l,s,c=(c=W.current)?Uu(c):null;if(!c)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof n.precedence&&"string"===typeof n.href?(t=qu(n.href),(r=(n=Ze(c).hoistableStyles).get(t))||(r={type:"style",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===n.rel&&"string"===typeof n.href&&"string"===typeof n.precedence){e=qu(n.href);var d=Ze(c).hoistableStyles,u=d.get(e);if(u||(c=c.ownerDocument||c,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,u),(d=c.querySelector(Yu(e)))&&!d._p&&(u.instance=d,u.state.loading=5),Bu.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Bu.set(e,n),d||(a=c,i=e,l=n,s=u.state,a.querySelector('link[rel="preload"][as="style"]['+i+"]")?s.loading=1:(i=a.createElement("link"),s.preload=i,i.addEventListener("load",function(){return s.loading|=1}),i.addEventListener("error",function(){return s.loading|=2}),hu(i,"link",l),et(i),a.head.appendChild(i))))),t&&null===r)throw Error(o(528,""));return u}if(t&&null!==r)throw Error(o(529,""));return null;case"script":return t=n.async,"string"===typeof(n=n.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Qu(n),(r=(n=Ze(c).hoistableScripts).get(t))||(r={type:"script",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function qu(e){return'href="'+xt(e)+'"'}function Yu(e){return'link[rel="stylesheet"]['+e+"]"}function Gu(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Qu(e){return'[src="'+xt(e)+'"]'}function Ju(e){return"script[async]"+e}function Xu(e,t,n){if(t.count++,null===t.instance)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+xt(n.href)+'"]');if(r)return t.instance=r,et(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return et(r=(e.ownerDocument||e).createElement("style")),hu(r,"style",a),Zu(r,n.precedence,e),t.instance=r;case"stylesheet":a=qu(n.href);var i=e.querySelector(Yu(a));if(i)return t.state.loading|=4,t.instance=i,et(i),i;r=Gu(n),(a=Bu.get(a))&&ep(r,a),et(i=(e.ownerDocument||e).createElement("link"));var l=i;return l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),hu(i,"link",r),t.state.loading|=4,Zu(i,n.precedence,e),t.instance=i;case"script":return i=Qu(n.src),(a=e.querySelector(Ju(i)))?(t.instance=a,et(a),a):(r=n,(a=Bu.get(i))&&tp(r=h({},n),a),et(a=(e=e.ownerDocument||e).createElement("script")),hu(a,"link",r),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(o(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(r=t.instance,t.state.loading|=4,Zu(r,n.precedence,e));return t.instance}function Zu(e,t,n){for(var r=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=r.length?r[r.length-1]:null,i=a,o=0;o<r.length;o++){var l=r[o];if(l.dataset.precedence===t)i=l;else if(i!==a)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=9===n.nodeType?n.head:n).insertBefore(e,t.firstChild)}function ep(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function tp(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var np=null;function rp(e,t,n){if(null===np){var r=new Map,a=np=new Map;a.set(n,r)}else(r=(a=np).get(n))||(r=new Map,a.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var i=n[a];if(!(i[Ye]||i[Me]||"link"===e&&"stylesheet"===i.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==i.namespaceURI){var o=i.getAttribute(t)||"";o=e+o;var l=r.get(o);l?l.push(i):r.set(o,[i])}}return r}function ap(e,t,n){(e=e.ownerDocument||e).head.insertBefore(n,"title"===t?e.querySelector("head > title"):null)}function ip(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var op=0;function lp(){if(this.count--,0===this.count&&(0===this.imgCount||!this.waitingForImages))if(this.stylesheets)cp(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var sp=null;function cp(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,sp=new Map,t.forEach(dp,e),sp=null,lp.call(e))}function dp(e,t){if(!(4&t.state.loading)){var n=sp.get(e);if(n)var r=n.get(null);else{n=new Map,sp.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var o=a[i];"LINK"!==o.nodeName&&"not all"===o.getAttribute("media")||(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}o=(a=t.instance).getAttribute("data-precedence"),(i=n.get(o)||r)===r&&n.set(null,a),n.set(o,a),this.count++,r=lp.bind(this),a.addEventListener("load",r),a.addEventListener("error",r),i?i.parentNode.insertBefore(a,i.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(a,e.firstChild),t.state.loading|=4}}var up={$$typeof:k,Provider:null,Consumer:null,_currentValue:R,_currentValue2:R,_threadCount:0};function pp(e,t,n,r,a,i,o,l,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ce(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ce(0),this.hiddenUpdates=Ce(null),this.identifierPrefix=r,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function hp(e,t,n,r,a,i,o,l,s,c,d,u){return e=new pp(e,t,n,o,s,c,d,u,l),t=1,!0===i&&(t|=24),i=Or(3,null,null,t),e.current=i,i.stateNode=e,(t=Ia()).refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:r,isDehydrated:n,cache:t},gi(i),e}function fp(e){return e?e=Rr:Rr}function mp(e,t,n,r,a,i){a=fp(a),null===r.context?r.context=a:r.pendingContext=a,(r=vi(t)).payload={element:n},null!==(i=void 0===i?null:i)&&(r.callback=i),null!==(n=bi(e,r,t))&&(Gc(n,0,t),yi(n,e,t))}function gp(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function xp(e,t){gp(e,t),(e=e.alternate)&&gp(e,t)}function vp(e){if(13===e.tag||31===e.tag){var t=Tr(e,67108864);null!==t&&Gc(t,0,67108864),xp(e,67108864)}}function bp(e){if(13===e.tag||31===e.tag){var t=qc(),n=Tr(e,t=Re(t));null!==n&&Gc(n,0,t),xp(e,t)}}var yp=!0;function kp(e,t,n,r){var a=P.T;P.T=null;var i=D.p;try{D.p=2,wp(e,t,n,r)}finally{D.p=i,P.T=a}}function jp(e,t,n,r){var a=P.T;P.T=null;var i=D.p;try{D.p=8,wp(e,t,n,r)}finally{D.p=i,P.T=a}}function wp(e,t,n,r){if(yp){var a=Sp(r);if(null===a)nu(e,t,r,$p,n),Rp(e,r);else if(function(e,t,n,r,a){switch(t){case"focusin":return Np=Lp(Np,e,t,n,r,a),!0;case"dragenter":return Ap=Lp(Ap,e,t,n,r,a),!0;case"mouseover":return Cp=Lp(Cp,e,t,n,r,a),!0;case"pointerover":var i=a.pointerId;return Fp.set(i,Lp(Fp.get(i)||null,e,t,n,r,a)),!0;case"gotpointercapture":return i=a.pointerId,Tp.set(i,Lp(Tp.get(i)||null,e,t,n,r,a)),!0}return!1}(a,e,t,n,r))r.stopPropagation();else if(Rp(e,r),4&t&&-1<Dp.indexOf(e)){for(;null!==a;){var i=Je(a);if(null!==i)switch(i.tag){case 3:if((i=i.stateNode).current.memoizedState.isDehydrated){var o=_e(i.pendingLanes);if(0!==o){var l=i;for(l.pendingLanes|=2,l.entangledLanes|=2;o;){var s=1<<31-ye(o);l.entanglements[1]|=s,o&=~s}Rd(i),0===(6&fc)&&(Dc=se()+500,Ld(0,!1))}}break;case 31:case 13:null!==(l=Tr(i,2))&&Gc(l,0,2),ed(),xp(i,2)}if(null===(i=Sp(r))&&nu(e,t,r,$p,n),i===a)break;a=i}null!==a&&r.stopPropagation()}else nu(e,t,r,null,n)}}function Sp(e){return _p(e=Pt(e))}var $p=null;function _p(e){if($p=null,null!==(e=Qe(e))){var t=s(e);if(null===t)e=null;else{var n=t.tag;if(13===n){if(null!==(e=c(t)))return e;e=null}else if(31===n){if(null!==(e=d(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return $p=e,null}function Ep(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ce()){case de:return 2;case ue:return 8;case pe:case he:return 32;case fe:return 268435456;default:return 32}default:return 32}}var zp=!1,Np=null,Ap=null,Cp=null,Fp=new Map,Tp=new Map,Pp=[],Dp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Rp(e,t){switch(e){case"focusin":case"focusout":Np=null;break;case"dragenter":case"dragleave":Ap=null;break;case"mouseover":case"mouseout":Cp=null;break;case"pointerover":case"pointerout":Fp.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Tp.delete(t.pointerId)}}function Lp(e,t,n,r,a,i){return null===e||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[a]},null!==t&&(null!==(t=Je(t))&&vp(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function Op(e){var t=Qe(e.target);if(null!==t){var n=s(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=c(n)))return e.blockedOn=t,void Ie(e.priority,function(){bp(n)})}else if(31===t){if(null!==(t=d(n)))return e.blockedOn=t,void Ie(e.priority,function(){bp(n)})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function Ip(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Sp(e.nativeEvent);if(null!==n)return null!==(t=Je(n))&&vp(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);Tt=r,n.target.dispatchEvent(r),Tt=null,t.shift()}return!0}function Bp(e,t,n){Ip(e)&&n.delete(t)}function Mp(){zp=!1,null!==Np&&Ip(Np)&&(Np=null),null!==Ap&&Ip(Ap)&&(Ap=null),null!==Cp&&Ip(Cp)&&(Cp=null),Fp.forEach(Bp),Tp.forEach(Bp)}function Up(e,t){e.blockedOn===t&&(e.blockedOn=null,zp||(zp=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Mp)))}var Vp=null;function Kp(e){Vp!==e&&(Vp=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Vp===e&&(Vp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],a=e[t+2];if("function"!==typeof r){if(null===_p(r||n))continue;break}var i=Je(n);null!==i&&(e.splice(t,3),t-=3,tl(i,{pending:!0,data:a,method:n.method,action:r},r,a))}}))}function Hp(e){function t(t){return Up(t,e)}null!==Np&&Up(Np,e),null!==Ap&&Up(Ap,e),null!==Cp&&Up(Cp,e),Fp.forEach(t),Tp.forEach(t);for(var n=0;n<Pp.length;n++){var r=Pp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Pp.length&&null===(n=Pp[0]).blockedOn;)Op(n),null===n.blockedOn&&Pp.shift();if(null!=(n=(e.ownerDocument||e).$$reactFormReplay))for(r=0;r<n.length;r+=3){var a=n[r],i=n[r+1],o=a[Ue]||null;if("function"===typeof i)o||Kp(n);else if(o){var l=null;if(i&&i.hasAttribute("formAction")){if(a=i,o=i[Ue]||null)l=o.formAction;else if(null!==_p(a))continue}else l=o.action;"function"===typeof l?n[r+1]=l:(n.splice(r,3),r-=3),Kp(n)}}}function Wp(){function e(e){e.canIntercept&&"react-transition"===e.info&&e.intercept({handler:function(){return new Promise(function(e){return a=e})},focusReset:"manual",scroll:"manual"})}function t(){null!==a&&(a(),a=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&null!=e.url&&navigation.navigate(e.url,{state:e.getState(),info:"react-transition",history:"replace"})}}if("object"===typeof navigation){var r=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),null!==a&&(a(),a=null)}}}function qp(e){this._internalRoot=e}function Yp(e){this._internalRoot=e}Yp.prototype.render=qp.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(o(409));mp(t.current,qc(),e,t,null,null)},Yp.prototype.unmount=qp.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;mp(e.current,2,null,e,null,null),ed(),t[Ve]=null}},Yp.prototype.unstable_scheduleHydration=function(e){if(e){var t=Oe();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Pp.length&&0!==t&&t<Pp[n].priority;n++);Pp.splice(n,0,e),0===n&&Op(e)}};var Gp=a.version;if("19.2.4"!==Gp)throw Error(o(527,Gp,"19.2.4"));D.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(o(188));throw e=Object.keys(e).join(","),Error(o(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=s(e)))throw Error(o(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(null===a)break;var i=a.alternate;if(null===i){if(null!==(r=a.return)){n=r;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return u(a),e;if(i===r)return u(a),t;i=i.sibling}throw Error(o(188))}if(n.return!==r.return)n=a,r=i;else{for(var l=!1,c=a.child;c;){if(c===n){l=!0,n=a,r=i;break}if(c===r){l=!0,r=a,n=i;break}c=c.sibling}if(!l){for(c=i.child;c;){if(c===n){l=!0,n=i,r=a;break}if(c===r){l=!0,r=i,n=a;break}c=c.sibling}if(!l)throw Error(o(189))}}if(n.alternate!==r)throw Error(o(190))}if(3!==n.tag)throw Error(o(188));return n.stateNode.current===n?e:t}(t),e=null===(e=null!==e?p(e):null)?null:e.stateNode};var Qp={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.4"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Jp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jp.isDisabled&&Jp.supportsFiber)try{xe=Jp.inject(Qp),ve=Jp}catch(Zp){}}t.createRoot=function(e,t){if(!l(e))throw Error(o(299));var n=!1,r="",a=Sl,i=$l,s=_l;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onUncaughtError&&(a=t.onUncaughtError),void 0!==t.onCaughtError&&(i=t.onCaughtError),void 0!==t.onRecoverableError&&(s=t.onRecoverableError)),t=hp(e,1,!1,null,0,n,r,null,a,i,s,Wp),e[Ve]=t.current,eu(e),new qp(t)}},672(e,t,n){var r=n(43);function a(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var o={d:{f:i,r:function(){throw Error(a(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");var s=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,t.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(a(299));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:l,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},t.flushSync=function(e){var t=s.T,n=o.p;try{if(s.T=null,o.p=2,e)return e()}finally{s.T=t,o.p=n,o.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,o.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&o.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var n=t.as,r=c(n,t.crossOrigin),a="string"===typeof t.integrity?t.integrity:void 0,i="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===n?o.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:i}):"script"===n&&o.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:i,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var n=c(t.as,t.crossOrigin);o.d.M(e,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&o.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var n=t.as,r=c(n,t.crossOrigin);o.d.L(e,n,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var n=c(t.as,t.crossOrigin);o.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else o.d.m(e)},t.requestFormReset=function(e){o.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},t.useFormStatus=function(){return s.H.useHostTransitionStatus()},t.version="19.2.4"},391(e,t,n){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(4)},950(e,t,n){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=n(672)},799(e,t){var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function a(e,t,r){var a=null;if(void 0!==r&&(a=""+r),void 0!==t.key&&(a=""+t.key),"key"in t)for(var i in r={},t)"key"!==i&&(r[i]=t[i]);else r=t;return t=r.ref,{$$typeof:n,type:e,key:a,ref:void 0!==t?t:null,props:r}}t.Fragment=r,t.jsx=a,t.jsxs=a},288(e,t){var n=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.consumer"),s=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.for("react.activity"),f=Symbol.iterator;var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,x={};function v(e,t,n){this.props=e,this.context=t,this.refs=x,this.updater=n||m}function b(){}function y(e,t,n){this.props=e,this.context=t,this.refs=x,this.updater=n||m}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var k=y.prototype=new b;k.constructor=y,g(k,v.prototype),k.isPureReactComponent=!0;var j=Array.isArray;function w(){}var S={H:null,A:null,T:null,S:null},$=Object.prototype.hasOwnProperty;function _(e,t,r){var a=r.ref;return{$$typeof:n,type:e,key:t,ref:void 0!==a?a:null,props:r}}function E(e){return"object"===typeof e&&null!==e&&e.$$typeof===n}var z=/\/+/g;function N(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function A(e,t,a,i,o){var l=typeof e;"undefined"!==l&&"boolean"!==l||(e=null);var s,c,d=!1;if(null===e)d=!0;else switch(l){case"bigint":case"string":case"number":d=!0;break;case"object":switch(e.$$typeof){case n:case r:d=!0;break;case p:return A((d=e._init)(e._payload),t,a,i,o)}}if(d)return o=o(e),d=""===i?"."+N(e,0):i,j(o)?(a="",null!=d&&(a=d.replace(z,"$&/")+"/"),A(o,t,a,"",function(e){return e})):null!=o&&(E(o)&&(s=o,c=a+(null==o.key||e&&e.key===o.key?"":(""+o.key).replace(z,"$&/")+"/")+d,o=_(s.type,c,s.props)),t.push(o)),1;d=0;var u,h=""===i?".":i+":";if(j(e))for(var m=0;m<e.length;m++)d+=A(i=e[m],t,a,l=h+N(i,m),o);else if("function"===typeof(m=null===(u=e)||"object"!==typeof u?null:"function"===typeof(u=f&&u[f]||u["@@iterator"])?u:null))for(e=m.call(e),m=0;!(i=e.next()).done;)d+=A(i=i.value,t,a,l=h+N(i,m++),o);else if("object"===l){if("function"===typeof e.then)return A(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(w,w):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,a,i,o);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return d}function C(e,t,n){if(null==e)return e;var r=[],a=0;return A(e,r,"","",function(e){return t.call(n,e,a++)}),r}function F(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var T="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},P={map:C,forEach:function(e,t,n){C(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return C(e,function(){t++}),t},toArray:function(e){return C(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};t.Activity=h,t.Children=P,t.Component=v,t.Fragment=a,t.Profiler=o,t.PureComponent=y,t.StrictMode=i,t.Suspense=d,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cacheSignal=function(){return null},t.cloneElement=function(e,t,n){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var r=g({},e.props),a=e.key;if(null!=t)for(i in void 0!==t.key&&(a=""+t.key),t)!$.call(t,i)||"key"===i||"__self"===i||"__source"===i||"ref"===i&&void 0===t.ref||(r[i]=t[i]);var i=arguments.length-2;if(1===i)r.children=n;else if(1<i){for(var o=Array(i),l=0;l<i;l++)o[l]=arguments[l+2];r.children=o}return _(e.type,a,r)},t.createContext=function(e){return(e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:l,_context:e},e},t.createElement=function(e,t,n){var r,a={},i=null;if(null!=t)for(r in void 0!==t.key&&(i=""+t.key),t)$.call(t,r)&&"key"!==r&&"__self"!==r&&"__source"!==r&&(a[r]=t[r]);var o=arguments.length-2;if(1===o)a.children=n;else if(1<o){for(var l=Array(o),s=0;s<o;s++)l[s]=arguments[s+2];a.children=l}if(e&&e.defaultProps)for(r in o=e.defaultProps)void 0===a[r]&&(a[r]=o[r]);return _(e,i,a)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:F}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=S.T,n={};S.T=n;try{var r=e(),a=S.S;null!==a&&a(n,r),"object"===typeof r&&null!==r&&"function"===typeof r.then&&r.then(w,T)}catch(i){T(i)}finally{null!==t&&null!==n.types&&(t.types=n.types),S.T=t}},t.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},t.use=function(e){return S.H.use(e)},t.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},t.useCallback=function(e,t){return S.H.useCallback(e,t)},t.useContext=function(e){return S.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},t.useEffect=function(e,t){return S.H.useEffect(e,t)},t.useEffectEvent=function(e){return S.H.useEffectEvent(e)},t.useId=function(){return S.H.useId()},t.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return S.H.useMemo(e,t)},t.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},t.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},t.useRef=function(e){return S.H.useRef(e)},t.useState=function(e){return S.H.useState(e)},t.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},t.useTransition=function(){return S.H.useTransition()},t.version="19.2.4"},43(e,t,n){e.exports=n(288)},579(e,t,n){e.exports=n(799)},896(e,t){function n(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(!(0<i(a,t)))break e;e[r]=t,e[n]=a,n=r}}function r(e){return 0===e.length?null:e[0]}function a(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,o=a>>>1;r<o;){var l=2*(r+1)-1,s=e[l],c=l+1,d=e[c];if(0>i(s,n))c<a&&0>i(d,s)?(e[r]=d,e[c]=n,r=c):(e[r]=s,e[l]=n,r=l);else{if(!(c<a&&0>i(d,n)))break e;e[r]=d,e[c]=n,r=c}}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var o=performance;t.unstable_now=function(){return o.now()}}else{var l=Date,s=l.now();t.unstable_now=function(){return l.now()-s}}var c=[],d=[],u=1,p=null,h=3,f=!1,m=!1,g=!1,x=!1,v="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,y="undefined"!==typeof setImmediate?setImmediate:null;function k(e){for(var t=r(d);null!==t;){if(null===t.callback)a(d);else{if(!(t.startTime<=e))break;a(d),t.sortIndex=t.expirationTime,n(c,t)}t=r(d)}}function j(e){if(g=!1,k(e),!m)if(null!==r(c))m=!0,S||(S=!0,w());else{var t=r(d);null!==t&&F(j,t.startTime-e)}}var w,S=!1,$=-1,_=5,E=-1;function z(){return!!x||!(t.unstable_now()-E<_)}function N(){if(x=!1,S){var e=t.unstable_now();E=e;var n=!0;try{e:{m=!1,g&&(g=!1,b($),$=-1),f=!0;var i=h;try{t:{for(k(e),p=r(c);null!==p&&!(p.expirationTime>e&&z());){var o=p.callback;if("function"===typeof o){p.callback=null,h=p.priorityLevel;var l=o(p.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof l){p.callback=l,k(e),n=!0;break t}p===r(c)&&a(c),k(e)}else a(c);p=r(c)}if(null!==p)n=!0;else{var s=r(d);null!==s&&F(j,s.startTime-e),n=!1}}break e}finally{p=null,h=i,f=!1}n=void 0}}finally{n?w():S=!1}}}if("function"===typeof y)w=function(){y(N)};else if("undefined"!==typeof MessageChannel){var A=new MessageChannel,C=A.port2;A.port1.onmessage=N,w=function(){C.postMessage(null)}}else w=function(){v(N,0)};function F(e,n){$=v(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var n=h;h=t;try{return e()}finally{h=n}},t.unstable_requestPaint=function(){x=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=h;h=e;try{return t()}finally{h=n}},t.unstable_scheduleCallback=function(e,a,i){var o=t.unstable_now();switch("object"===typeof i&&null!==i?i="number"===typeof(i=i.delay)&&0<i?o+i:o:i=o,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return e={id:u++,callback:a,priorityLevel:e,startTime:i,expirationTime:l=i+l,sortIndex:-1},i>o?(e.sortIndex=i,n(d,e),null===r(c)&&e===r(d)&&(g?(b($),$=-1):g=!0,F(j,i-o))):(e.sortIndex=l,n(c,e),m||f||(m=!0,S||(S=!0,w()))),e},t.unstable_shouldYield=z,t.unstable_wrapCallback=function(e){var t=h;return function(){var n=h;h=t;try{return e.apply(this,arguments)}finally{h=n}}}},853(e,t,n){e.exports=n(896)}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(r,a){if(1&a&&(r=this(r)),8&a)return r;if("object"===typeof r&&r){if(4&a&&r.__esModule)return r;if(16&a&&"function"===typeof r.then)return r}var i=Object.create(null);n.r(i);var o={};e=e||[null,t({}),t([]),t(t)];for(var l=2&a&&r;("object"==typeof l||"function"==typeof l)&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach(e=>o[e]=()=>r[e]);return o.default=()=>r,n.d(i,o),i}})(),n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nc=void 0;var r=n(43),a=n.t(r,2),i=n(391);const o="10.55.0",l=globalThis;function s(){return c(l),l}function c(e){const t=e.__SENTRY__=e.__SENTRY__||{};return t.version=t.version||o,t[o]=t[o]||{}}function d(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:l;const r=n.__SENTRY__=n.__SENTRY__||{},a=r[o]=r[o]||{};return a[e]||(a[e]=t())}const u="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,p=["debug","info","warn","error","log","assert","trace"],h={};function f(e){if(!("console"in l))return e();const t=l.console,n={},r=Object.keys(h);r.forEach(e=>{const r=h[e];n[e]=t[e],t[e]=r});try{return e()}finally{r.forEach(e=>{t[e]=n[e]})}}function m(){return x().enabled}function g(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];u&&m()&&f(()=>{l.console[e](`Sentry Logger [${e}]:`,...n)})}function x(){return u?d("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const v={enable:function(){x().enabled=!0},disable:function(){x().enabled=!1},isEnabled:m,log:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];g("log",...t)},warn:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];g("warn",...t)},error:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];g("error",...t)}},b=Object.prototype.toString;function y(e){switch(b.call(e)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return A(e,Error)}}function k(e,t){return b.call(e)===`[object ${t}]`}function j(e){return k(e,"ErrorEvent")}function w(e){return k(e,"DOMError")}function S(e){return k(e,"String")}function $(e){return"object"===typeof e&&null!==e&&"__sentry_template_string__"in e&&"__sentry_template_values__"in e}function _(e){return null===e||$(e)||"object"!==typeof e&&"function"!==typeof e}function E(e){return k(e,"Object")}function z(e){return"undefined"!==typeof Event&&A(e,Event)}function N(e){return Boolean(e?.then&&"function"===typeof e.then)}function A(e,t){try{return e instanceof t}catch{return!1}}function C(e){return"undefined"!==typeof Request&&A(e,Request)}function F(e,t,n){if(!(t in e))return;const r=e[t];if("function"!==typeof r)return;const a=n(r);"function"===typeof a&&P(a,r);try{e[t]=a}catch{u&&v.log(`Failed to replace method "${t}" in object`,e)}}function T(e,t,n){try{Object.defineProperty(e,t,{value:n,writable:!0,configurable:!0})}catch{u&&v.log(`Failed to add non-enumerable property "${String(t)}" to object`,e)}}function P(e,t){try{const n=t.prototype||{};e.prototype=t.prototype=n,T(e,"__sentry_original__",t)}catch{}}function D(e){return e.__sentry_original__}function R(e){if(y(e))return{message:e.message,name:e.name,stack:e.stack,...L(e)};if(z(e)){const{type:t,target:n,currentTarget:r,detail:a}=e;return{type:t,target:n,currentTarget:r,...a?{detail:a}:{},...L(e)}}return e}function L(e){return"object"===typeof e&&null!==e?Object.fromEntries(Object.entries(e)):{}}let O;function I(e){if(void 0!==O)return O?O(e):e();const t=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=l;return t in n&&"function"===typeof n[t]?(O=n[t],O(e)):(O=null,e())}function B(){return I(()=>Math.random())}function M(){return I(()=>Date.now())}let U;function V(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){const e=l;return e.crypto||e.msCrypto}();try{if(e?.randomUUID)return I(()=>e.randomUUID()).replace(/-/g,"")}catch{}return U||(U="10000000100040008000100000000000"),U.replace(/[018]/g,e=>(e^(16*B()&15)>>e/4).toString(16))}function K(e){return e.exception?.values?.[0]}function H(e){const{message:t,event_id:n}=e;if(t)return t;const r=K(e);return r?r.type&&r.value?`${r.type}: ${r.value}`:r.type||r.value||n||"<unknown>":n||"<unknown>"}function W(e,t,n){const r=e.exception=e.exception||{},a=r.values=r.values||[],i=a[0]=a[0]||{};i.value||(i.value=t||""),i.type||(i.type=n||"Error")}function q(e,t){const n=K(e);if(!n)return;const r=n.mechanism;if(n.mechanism={type:"generic",handled:!0,...r,...t},t&&"data"in t){const e={...r?.data,...t.data};n.mechanism.data=e}}function Y(e){if(function(e){try{return e.__sentry_captured__}catch{}}(e))return!0;try{T(e,"__sentry_captured__",!0)}catch{}return!1}function G(){return M()/1e3}let Q;function J(){return(Q??(Q=function(){const{performance:e}=l;if(!e?.now||!e.timeOrigin)return G;const t=e.timeOrigin;return()=>(t+I(()=>e.now()))/1e3}()))()}function X(e){const t=J(),n={sid:V(),init:!0,timestamp:t,started:t,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>function(e){return{sid:`${e.sid}`,init:e.init,started:new Date(1e3*e.started).toISOString(),timestamp:new Date(1e3*e.timestamp).toISOString(),status:e.status,errors:e.errors,did:"number"===typeof e.did||"string"===typeof e.did?`${e.did}`:void 0,duration:e.duration,abnormal_mechanism:e.abnormal_mechanism,attrs:{release:e.release,environment:e.environment,ip_address:e.ipAddress,user_agent:e.userAgent}}}(n)};return e&&Z(n,e),n}function Z(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.user&&(!e.ipAddress&&t.user.ip_address&&(e.ipAddress=t.user.ip_address),e.did||t.did||(e.did=t.user.id||t.user.email||t.user.username)),e.timestamp=t.timestamp||J(),t.abnormal_mechanism&&(e.abnormal_mechanism=t.abnormal_mechanism),t.ignoreDuration&&(e.ignoreDuration=t.ignoreDuration),t.sid&&(e.sid=32===t.sid.length?t.sid:V()),void 0!==t.init&&(e.init=t.init),!e.did&&t.did&&(e.did=`${t.did}`),"number"===typeof t.started&&(e.started=t.started),e.ignoreDuration)e.duration=void 0;else if("number"===typeof t.duration)e.duration=t.duration;else{const t=e.timestamp-e.started;e.duration=t>=0?t:0}t.release&&(e.release=t.release),t.environment&&(e.environment=t.environment),!e.ipAddress&&t.ipAddress&&(e.ipAddress=t.ipAddress),!e.userAgent&&t.userAgent&&(e.userAgent=t.userAgent),"number"===typeof t.errors&&(e.errors=t.errors),t.status&&(e.status=t.status)}function ee(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;if(!t||"object"!==typeof t||n<=0)return t;if(e&&0===Object.keys(t).length)return e;const r={...e};for(const a in t)Object.prototype.hasOwnProperty.call(t,a)&&(r[a]=ee(r[a],t[a],n-1));return r}function te(){return V()}function ne(){return V().substring(16)}const re="_sentrySpan";function ae(e,t){t?T(e,re,t):delete e[re]}function ie(e){return e[re]}const oe=Symbol.for("sentry.skipNormalization"),le=Symbol.for("sentry.overrideNormalizationDepth");const se="?",ce=/\(error: (.*)\)/,de=/captureMessage|captureException/;function ue(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=t.sort((e,t)=>e[0]-t[0]).map(e=>e[1]);return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;const a=[],i=e.split("\n");for(let o=t;o<i.length;o++){let e=i[o];e.length>1024&&(e=e.slice(0,1024));const t=ce.test(e)?e.replace(ce,"$1"):e;if(!t.includes("Error: ")){for(const e of r){const n=e(t);if(n){a.push(n);break}}if(a.length>=50+n)break}}return function(e){if(!e.length)return[];const t=Array.from(e);/sentryWrapped/.test(pe(t).function||"")&&t.pop();t.reverse(),de.test(pe(t).function||"")&&(t.pop(),de.test(pe(t).function||"")&&t.pop());return t.slice(0,50).map(e=>({...e,filename:e.filename||pe(t).filename,function:e.function||se}))}(a.slice(n))}}function pe(e){return e[e.length-1]||{}}const he="<anonymous>";function fe(e){try{return e&&"function"===typeof e&&e.name||he}catch{return he}}function me(e){const t=e.exception;if(t){const e=[];try{return t.values.forEach(t=>{t.stacktrace.frames&&e.push(...t.stacktrace.frames)}),e}catch{return}}}let ge;function xe(e){ge=e}function ve(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0;try{return ye("",e,t,n)}catch(r){return{ERROR:`**non-serializable** (${r})`}}}function be(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:102400;const r=ve(e,t);return a=r,function(e){return~-encodeURI(e).split(/%..|./).length}(JSON.stringify(a))>n?be(e,t-1,n):r;var a}function ye(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1/0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){const e=new WeakSet;function t(t){return!!e.has(t)||(e.add(t),!1)}function n(t){e.delete(t)}return[t,n]}();const[i,o]=a;if(null==t||["boolean","string"].includes(typeof t)||"number"===typeof t&&Number.isFinite(t))return t;const l=ke(e,t);if(!l.startsWith("[object "))return l;if(function(e){return Boolean(e[oe])}(t))return t;const s=function(e){const t=e[le];return"number"===typeof t?t:void 0}(t),c=void 0!==s?s:n;if(0===c)return l.replace("object ","");if(i(t))return"[Circular ~]";const d=t;if(d&&"function"===typeof d.toJSON)try{return ye("",d.toJSON(),c-1,r,a)}catch{}const u=Array.isArray(t)?[]:{};let p=0;const h=R(t);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(p>=r){u[f]="[MaxProperties ~]";break}const e=h[f];u[f]=ye(f,e,c-1,r,a),p++}return o(t),u}function ke(e,t){try{if(ge){const e=ge(t);if(e)return e}if("undefined"!==typeof globalThis&&t===globalThis)return"[Global]";if("number"===typeof t&&!Number.isFinite(t))return`[${t}]`;if("function"===typeof t)return`[Function: ${fe(t)}]`;if("symbol"===typeof t)return`[${String(t)}]`;if("bigint"===typeof t)return`[BigInt: ${String(t)}]`;const e=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(t);return`[object ${e}]`}catch(n){return`**non-serializable** (${n})`}}function je(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"string"!==typeof e||0===t||e.length<=t?e:`${e.slice(0,t)}...`}function we(e,t){if(!Array.isArray(e))return"";const n=[];for(let r=0;r<e.length;r++){const t=e[r];_(t)?n.push(String(t)):t instanceof Error?n.push(t.message?`${t.name}: ${t.message}`:t.name):n.push(ke(0,t))}return n.join(t)}function Se(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return!!S(e)&&(k(t,"RegExp")?t.test(e):S(t)?n?e===t:e.includes(t):"function"===typeof t&&t(e))}function $e(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(const r of t)if(Se(e,r,n))return!0;return!1}class _e{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:te(),sampleRand:B()}}clone(){const e=new _e;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,e._conversationId=this._conversationId,ae(e,ie(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Z(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setConversationId(e){return this._conversationId=e||void 0,this._notifyScopeListeners(),this}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,t){return this.setTags({[e]:t})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,t){return this.setAttributes({[e]:t})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,t){return this._extra={...this._extra,[e]:t},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,t){return null===t?delete this._contexts[e]:this._contexts[e]=t,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const t="function"===typeof e?e(this):e,n=t instanceof _e?t.getScopeData():E(t)?e:void 0,{tags:r,attributes:a,extra:i,user:o,contexts:l,level:s,fingerprint:c=[],propagationContext:d,conversationId:u}=n||{};return this._tags={...this._tags,...r},this._attributes={...this._attributes,...a},this._extra={...this._extra,...i},this._contexts={...this._contexts,...l},o&&Object.keys(o).length&&(this._user=o),s&&(this._level=s),c.length&&(this._fingerprint=c),d&&(this._propagationContext=d),u&&(this._conversationId=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,this._conversationId=void 0,ae(this,void 0),this._attachments=[],this.setPropagationContext({traceId:te(),sampleRand:B()}),this._notifyScopeListeners(),this}addBreadcrumb(e,t){const n="number"===typeof t?t:100;if(n<=0)return this;const r={timestamp:G(),...e,message:e.message?je(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>n&&(this._breadcrumbs=this._breadcrumbs.slice(-n),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:ie(this),conversationId:this._conversationId}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=ee(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,t){const n=t?.event_id||V();if(!this._client)return u&&v.warn("No client configured on scope - will not capture exception!"),n;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...t,event_id:n},this),n}captureMessage(e,t,n){const r=n?.event_id||V();if(!this._client)return u&&v.warn("No client configured on scope - will not capture message!"),r;const a=n?.syntheticException??new Error(e);return this._client.captureMessage(e,t,{originalException:e,syntheticException:a,...n,event_id:r},this),r}captureEvent(e,t){const n=e.event_id||t?.event_id||V();return this._client?(this._client.captureEvent(e,{...t,event_id:n},this),n):(u&&v.warn("No client configured on scope - will not capture event!"),n)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}const Ee=e=>e instanceof Promise&&!e[ze],ze=Symbol("chained PromiseLike"),Ne=(e,t)=>{if(!t)return e;let n=!1;for(const r in e){if(r in t)continue;n=!0;const a=e[r];"function"===typeof a?Object.defineProperty(t,r,{value:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return a.apply(e,n)},enumerable:!0,configurable:!0,writable:!0}):t[r]=a}return n&&Object.assign(t,{[ze]:!0}),t};class Ae{constructor(e,t){let n,r;n=e||new _e,r=t||new _e,this._stack=[{scope:n}],this._isolationScope=r}withScope(e){const t=this._pushScope();let n;try{n=e(t)}catch(r){throw this._popScope(),r}return N(n)?((e,t,n)=>{const r=e.then(e=>(t(e),e),e=>{throw n(e),e});return Ee(r)&&Ee(e)?r:Ne(e,r)})(n,()=>this._popScope(),()=>this._popScope()):(this._popScope(),n)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return!(this._stack.length<=1)&&!!this._stack.pop()}}function Ce(){const e=c(s());return e.stack=e.stack||new Ae(d("defaultCurrentScope",()=>new _e),d("defaultIsolationScope",()=>new _e))}function Fe(e){return Ce().withScope(e)}function Te(e,t){const n=Ce();return n.withScope(()=>(n.getStackTop().scope=e,t(e)))}function Pe(e){return Ce().withScope(()=>e(Ce().getIsolationScope()))}function De(e){const t=c(e);return t.acs?t.acs:{withIsolationScope:Pe,withScope:Fe,withSetScope:Te,withSetIsolationScope:(e,t)=>Pe(t),getCurrentScope:()=>Ce().getScope(),getIsolationScope:()=>Ce().getIsolationScope()}}let Re;function Le(){return De(s()).getCurrentScope()}function Oe(){return De(s()).getIsolationScope()}function Ie(){return Le().getClient()}function Be(e){const t=Re?.();if(t)return{trace_id:t.traceId,span_id:t.spanId};const n=e.getPropagationContext(),{traceId:r,parentSpanId:a,propagationSpanId:i}=n,o={trace_id:r,span_id:i||ne()};return a&&(o.parent_span_id=a),o}const Me="production";function Ue(e){return new Ke(t=>{t(e)})}function Ve(e){return new Ke((t,n)=>{n(e)})}class Ke{constructor(e){this._state=0,this._handlers=[],this._runExecutor(e)}then(e,t){return new Ke((n,r)=>{this._handlers.push([!1,t=>{if(e)try{n(e(t))}catch(a){r(a)}else n(t)},e=>{if(t)try{n(t(e))}catch(a){r(a)}else r(e)}]),this._executeHandlers()})}catch(e){return this.then(e=>e,e)}finally(e){return new Ke((t,n)=>{let r,a;return this.then(t=>{a=!1,r=t,e&&e()},t=>{a=!0,r=t,e&&e()}).then(()=>{a?n(r):t(r)})})}_executeHandlers(){if(0===this._state)return;const e=this._handlers.slice();this._handlers=[],e.forEach(e=>{e[0]||(1===this._state&&e[1](this._value),2===this._state&&e[2](this._value),e[0]=!0)})}_runExecutor(e){const t=(e,t)=>{0===this._state&&(N(t)?t.then(n,r):(this._state=e,this._value=t,this._executeHandlers()))},n=e=>{t(1,e)},r=e=>{t(2,e)};try{e(n,r)}catch(a){r(a)}}}function He(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;try{const a=We(t,n,e,r);return N(a)?a:Ue(a)}catch(a){return Ve(a)}}function We(e,t,n,r){const a=n[r];if(!e||!a)return e;const i=a({...e},t);return u&&null===i&&v.log(`Event processor "${a.id||"?"}" dropped event`),N(i)?i.then(e=>We(e,t,n,r+1)):We(i,t,n,r+1)}let qe,Ye,Ge,Qe;function Je(e){const t=l._sentryDebugIds,n=l._debugIds;if(!t&&!n)return{};const r=t?Object.keys(t):[],a=n?Object.keys(n):[];if(Qe&&r.length===Ye&&a.length===Ge)return Qe;Ye=r.length,Ge=a.length,Qe={},qe||(qe={});const i=(t,n)=>{for(const r of t){const t=n[r],a=qe?.[r];if(a&&Qe&&t)Qe[a[0]]=t,qe&&(qe[r]=[a[0],t]);else if(t){const n=e(r);for(let e=n.length-1;e>=0;e--){const a=n[e],i=a?.filename;if(i&&Qe&&qe){Qe[i]=t,qe[r]=[i,t];break}}}}};return t&&i(r,t),n&&i(a,n),Qe}const Xe="sentry.profile_id",Ze="sentry.exclusive_time";const et="sentry-";function tt(e){if(e&&(S(e)||Array.isArray(e)))return Array.isArray(e)?e.reduce((e,t)=>{const n=nt(t);return Object.entries(n).forEach(t=>{let[n,r]=t;e[n]=r}),e},{}):nt(e)}function nt(e){return e.split(",").map(e=>{const t=e.indexOf("=");if(-1===t)return[];return[e.slice(0,t),e.slice(t+1)].map(e=>{try{return decodeURIComponent(e.trim())}catch{return}})}).reduce((e,t)=>{let[n,r]=t;return n&&r&&(e[n]=r),e},{})}const rt=/^o(\d+)\./,at=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function it(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{host:n,path:r,pass:a,port:i,projectId:o,protocol:l,publicKey:s}=e;return`${l}://${s}${t&&a?`:${a}`:""}@${n}${i?`:${i}`:""}/${r?`${r}/`:r}${o}`}function ot(e){return{protocol:e.protocol,publicKey:e.publicKey||"",pass:e.pass||"",host:e.host,port:e.port||"",path:e.path||"",projectId:e.projectId}}function lt(e){const t=e.getOptions(),{host:n}=e.getDsn()||{};let r;return t.orgId?r=String(t.orgId):n&&(r=function(e){const t=e.match(rt);return t?.[1]}(n)),r}function st(e){const t="string"===typeof e?function(e){const t=at.exec(e);if(!t)return void f(()=>{console.error(`Invalid Sentry Dsn: ${e}`)});const[n,r,a="",i="",o="",l=""]=t.slice(1);let s="",c=l;const d=c.split("/");if(d.length>1&&(s=d.slice(0,-1).join("/"),c=d.pop()),c){const e=c.match(/^\d+/);e&&(c=e[0])}return ot({host:i,pass:a,path:s,projectId:c,port:o,protocol:n,publicKey:r})}(e):ot(e);if(t&&function(e){if(!u)return!0;const{port:t,projectId:n,protocol:r}=e;return!["protocol","publicKey","host","projectId"].find(t=>!e[t]&&(v.error(`Invalid Sentry Dsn: ${t} missing`),!0))&&(n.match(/^\d+$/)?function(e){return"http"===e||"https"===e}(r)?!t||!isNaN(parseInt(t,10))||(v.error(`Invalid Sentry Dsn: Invalid port ${t}`),!1):(v.error(`Invalid Sentry Dsn: Invalid protocol ${r}`),!1):(v.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1))}(t))return t}function ct(e,t){const{value:n,unit:r}="object"===typeof(a=e)&&null!=a&&!Array.isArray(a)&&Object.keys(a).includes("value")?e:{value:e,unit:void 0};var a;const i=function(e){if(Array.isArray(e))return{value:e,type:"array"};const t="string"===typeof e?"string":"boolean"===typeof e?"boolean":"number"!==typeof e||Number.isNaN(e)?null:Number.isInteger(e)?"integer":"double";if(t)return{value:e,type:t}}(n),o=r&&"string"===typeof r?{unit:r}:{};if(i)return{...i,...o};if(!t||"skip-undefined"===t&&void 0===n)return;let l="";try{l=JSON.stringify(n)??""}catch{}return{value:l,type:"string",...o}}function dt(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const n={};for(const[r,a]of Object.entries(e??{})){const e=ct(a,t);e&&(n[r]=e)}return n}function ut(e){if(e){if("object"===typeof e&&"deref"in e&&"function"===typeof e.deref)try{return e.deref()}catch{return}return e}}const pt="_sentryScope",ht="_sentryIsolationScope";function ft(e){const t=e;return{scope:t[pt],isolationScope:ut(t[ht])}}let mt=!1;function gt(e){const{spanId:t,traceId:n,isRemote:r}=e.spanContext(),a=r?t:yt(e).parent_span_id,i=ft(e).scope;return{parent_span_id:a,span_id:r?i?.getPropagationContext().propagationSpanId||ne():t,trace_id:n}}function xt(e){return e&&e.length>0?e.map(e=>{let{context:{spanId:t,traceId:n,traceFlags:r,...a},attributes:i}=e;return{span_id:t,trace_id:n,sampled:1===r,attributes:i,...a}}):void 0}function vt(e){return"number"===typeof e?bt(e):Array.isArray(e)?e[0]+e[1]/1e9:e instanceof Date?bt(e.getTime()):J()}function bt(e){return e>9999999999?e/1e3:e}function yt(e){if(wt(e))return e.getSpanJSON();const{spanId:t,traceId:n}=e.spanContext();if(jt(e)){const{attributes:r,startTime:a,name:i,endTime:o,status:l,links:s}=e;return{span_id:t,trace_id:n,data:r,description:i,parent_span_id:kt(e),start_timestamp:vt(a),timestamp:vt(o)||void 0,status:$t(l),op:r["sentry.op"],origin:r["sentry.origin"],links:xt(s)}}return{span_id:t,trace_id:n,start_timestamp:0,data:{}}}function kt(e){return"parentSpanId"in e?e.parentSpanId:"parentSpanContext"in e?e.parentSpanContext?.spanId:void 0}function jt(e){const t=e;return!!t.attributes&&!!t.startTime&&!!t.name&&!!t.endTime&&!!t.status}function wt(e){return"function"===typeof e.getSpanJSON}function St(e){const{traceFlags:t}=e.spanContext();return 1===t}function $t(e){if(e&&0!==e.code)return 1===e.code?"ok":e.message||"internal_error"}const _t="_sentryRootSpan";const Et=zt;function zt(e){return e[_t]||e}function Nt(){mt||(f(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),mt=!0)}const At="_frozenDsc";function Ct(e,t){const n=t.getOptions(),{publicKey:r}=t.getDsn()||{},a={environment:n.environment||Me,release:n.release,public_key:r,trace_id:e,org_id:lt(t)};return t.emit("createDsc",a),a}function Ft(e){const t=Ie();if(!t)return{};const n=Et(e),r=yt(n),a=r.data,i=n.spanContext().traceState,o=i?.get("sentry.sample_rate")??a["sentry.sample_rate"]??a["sentry.previous_trace_sample_rate"];function l(e){return"number"!==typeof o&&"string"!==typeof o||(e.sample_rate=`${o}`),e}const s=n[At];if(s)return l(s);const c=i?.get("sentry.dsc"),d=c&&function(e){const t=tt(e);if(!t)return;const n=Object.entries(t).reduce((e,t)=>{let[n,r]=t;return n.startsWith(et)&&(e[n.slice(7)]=r),e},{});return Object.keys(n).length>0?n:void 0}(c);if(d)return l(d);const u=Ct(e.spanContext().traceId,t),p=a["sentry.source"]??a["sentry.span.source"],h=r.description;return"url"!==p&&h&&(u.transaction=h),function(e){if("boolean"===typeof __SENTRY_TRACING__&&!__SENTRY_TRACING__)return!1;const t=e||Ie()?.getOptions();return!!t&&(null!=t.tracesSampleRate||!!t.tracesSampler)}()&&(u.sampled=String(St(n)),u.sample_rand=i?.get("sentry.sample_rand")??ft(n).scope?.getPropagationContext().sampleRand.toString()),l(u),t.emit("createDsc",u,n),u}function Tt(e,t){const{fingerprint:n,span:r,breadcrumbs:a,sdkProcessingMetadata:i}=t;!function(e,t){const{extra:n,tags:r,user:a,contexts:i,level:o,transactionName:l}=t;Object.keys(n).length&&(e.extra={...n,...e.extra});Object.keys(r).length&&(e.tags={...r,...e.tags});Object.keys(a).length&&(e.user={...a,...e.user});Object.keys(i).length&&(e.contexts={...i,...e.contexts});o&&(e.level=o);l&&"transaction"!==e.type&&(e.transaction=l)}(e,t),r&&function(e,t){e.contexts={trace:gt(t),...e.contexts},e.sdkProcessingMetadata={dynamicSamplingContext:Ft(t),...e.sdkProcessingMetadata};const n=Et(t),r=yt(n).description;r&&!e.transaction&&"transaction"===e.type&&(e.transaction=r)}(e,r),function(e,t){e.fingerprint=e.fingerprint?Array.isArray(e.fingerprint)?e.fingerprint:[e.fingerprint]:[],t&&(e.fingerprint=e.fingerprint.concat(t));e.fingerprint.length||delete e.fingerprint}(e,n),function(e,t){const n=[...e.breadcrumbs||[],...t];e.breadcrumbs=n.length?n:void 0}(e,a),function(e,t){e.sdkProcessingMetadata={...e.sdkProcessingMetadata,...t}}(e,i)}function Pt(e,t){const{extra:n,tags:r,attributes:a,user:i,contexts:o,level:l,sdkProcessingMetadata:s,breadcrumbs:c,fingerprint:d,eventProcessors:u,attachments:p,propagationContext:h,transactionName:f,span:m}=t;Dt(e,"extra",n),Dt(e,"tags",r),Dt(e,"attributes",a),Dt(e,"user",i),Dt(e,"contexts",o),e.sdkProcessingMetadata=ee(e.sdkProcessingMetadata,s,2),l&&(e.level=l),f&&(e.transactionName=f),m&&(e.span=m),c.length&&(e.breadcrumbs=[...e.breadcrumbs,...c]),d.length&&(e.fingerprint=[...e.fingerprint,...d]),u.length&&(e.eventProcessors=[...e.eventProcessors,...u]),p.length&&(e.attachments=[...e.attachments,...p]),e.propagationContext={...e.propagationContext,...h}}function Dt(e,t,n){e[t]=ee(e[t],n,1)}function Rt(e,t){const n=d("globalScope",()=>new _e).getScopeData();return e&&Pt(n,e.getScopeData()),t&&Pt(n,t.getScopeData()),n}function Lt(e,t,n,r,a,i){const{normalizeDepth:o=3,normalizeMaxBreadth:l=1e3}=e,s={...t,event_id:t.event_id||n.event_id||V(),timestamp:t.timestamp||G()},c=n.integrations||e.integrations.map(e=>e.name);!function(e,t){const{environment:n,release:r,dist:a,maxValueLength:i}=t;e.environment=e.environment||n||Me,!e.release&&r&&(e.release=r);!e.dist&&a&&(e.dist=a);const o=e.request;o?.url&&i&&(o.url=je(o.url,i));i&&e.exception?.values?.forEach(e=>{e.value&&(e.value=je(e.value,i))})}(s,e),function(e,t){t.length>0&&(e.sdk=e.sdk||{},e.sdk.integrations=[...e.sdk.integrations||[],...t])}(s,c),a&&a.emit("applyFrameMetadata",t),void 0===t.type&&function(e,t){const n=Je(t);e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.filename&&(e.debug_id=n[e.filename])})})}(s,e.stackParser);const d=function(e,t){if(!t)return e;const n=e?e.clone():new _e;return n.update(t),n}(r,n.captureContext);n.mechanism&&q(s,n.mechanism);const u=a?a.getEventProcessors():[],p=Rt(i,d),h=[...n.attachments||[],...p.attachments];h.length&&(n.attachments=h),Tt(s,p);const f=[...u,...p.eventProcessors];return(n.data&&!0===n.data.__sentry__?Ue(s):He(f,s,n)).then(e=>(e&&function(e){const t={};if(e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.debug_id&&(e.abs_path?t[e.abs_path]=e.debug_id:e.filename&&(t[e.filename]=e.debug_id),delete e.debug_id)})}),0===Object.keys(t).length)return;e.debug_meta=e.debug_meta||{},e.debug_meta.images=e.debug_meta.images||[];const n=e.debug_meta.images;Object.entries(t).forEach(e=>{let[t,r]=e;n.push({type:"sourcemap",code_file:t,debug_id:r})})}(e),"number"===typeof o&&o>0?function(e,t,n){if(!e)return null;const r={...e,...e.breadcrumbs&&{breadcrumbs:e.breadcrumbs.map(e=>({...e,...e.data&&{data:ve(e.data,t,n)}}))},...e.user&&{user:ve(e.user,t,n)},...e.contexts&&{contexts:ve(e.contexts,t,n)},...e.extra&&{extra:ve(e.extra,t,n)}};e.contexts?.trace&&r.contexts&&(r.contexts.trace=e.contexts.trace,e.contexts.trace.data&&(r.contexts.trace.data=ve(e.contexts.trace.data,t,n)));e.spans&&(r.spans=e.spans.map(e=>({...e,...e.data&&{data:ve(e.data,t,n)}})));e.contexts?.flags&&r.contexts&&(r.contexts.flags=ve(e.contexts.flags,3,n));return r}(e,o,l):e))}function Ot(e){if(e)return function(e){return e instanceof _e||"function"===typeof e}(e)||function(e){return Object.keys(e).some(e=>It.includes(e))}(e)?{captureContext:e}:e}const It=["user","level","extra","contexts","tags","fingerprint","propagationContext"];function Bt(e,t){return Le().captureEvent(e,t)}function Mt(e){const t=Oe(),{user:n}=Rt(t,Le()),{userAgent:r}=l.navigator||{},a=X({user:n,...r&&{userAgent:r},...e}),i=t.getSession();return"ok"===i?.status&&Z(i,{status:"exited"}),Ut(),t.setSession(a),a}function Ut(){const e=Oe(),t=Le().getSession()||e.getSession();t&&function(e,t){let n={};t?n={status:t}:"ok"===e.status&&(n={status:"exited"}),Z(e,n)}(t),Vt(),e.setSession()}function Vt(){const e=Oe(),t=Ie(),n=e.getSession();n&&t&&t.captureSession(n)}function Kt(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]?Ut():Vt()}const Ht=[];function Wt(e){const t=e.defaultIntegrations||[],n=e.integrations;let r;if(t.forEach(e=>{e.isDefaultInstance=!0}),Array.isArray(n))r=[...t,...n];else if("function"===typeof n){const e=n(t);r=Array.isArray(e)?e:[e]}else r=t;return function(e){const t={};return e.forEach(e=>{const{name:n}=e,r=t[n];r&&!r.isDefaultInstance&&e.isDefaultInstance||(t[n]=e)}),Object.values(t)}(r)}function qt(e,t){for(const n of t)n?.afterAllSetup&&n.afterAllSetup(e)}function Yt(e,t,n){if(n[t.name])u&&v.log(`Integration skipped because it was already installed: ${t.name}`);else{if(n[t.name]=t,Ht.includes(t.name)||"function"!==typeof t.setupOnce||(t.setupOnce(),Ht.push(t.name)),t.setup&&"function"===typeof t.setup&&t.setup(e),"function"===typeof t.preprocessEvent){const n=t.preprocessEvent.bind(t);e.on("preprocessEvent",(t,r)=>n(t,r,e))}if("function"===typeof t.processEvent){const n=t.processEvent.bind(t),r=Object.assign((t,r)=>n(t,r,e),{id:t.name});e.addEventProcessor(r)}["processSpan","processSegmentSpan"].forEach(n=>{const r=t[n];"function"===typeof r&&e.on(n,n=>r.call(t,n,e))}),u&&v.log(`Integration installed: ${t.name}`)}}function Gt(e){const t=[];e.message&&t.push(e.message);try{const n=e.exception.values[e.exception.values.length-1];n?.value&&(t.push(n.value),n.type&&t.push(`${n.type}: ${n.value}`))}catch{}return t}const Qt=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,/can't redefine non-configurable property "solana"/,/vv\(\)\.getRestrictions is not a function/,/Can't find variable: _AutofillCallbackHandler/,/Object Not Found Matching Id:\d+, MethodName:simulateEvent/,/^Java exception was raised during method invocation$/],Jt=function(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{name:"EventFilters",setup(n){const r=n.getOptions();e=Zt(t,r)},processEvent(n,r,a){if(!e){const n=a.getOptions();e=Zt(t,n)}return function(e,t){if(e.type){if("transaction"===e.type&&function(e,t){if(!t?.length)return!1;const n=e.transaction;return!!n&&$e(n,t)}(e,t.ignoreTransactions))return u&&v.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${H(e)}`),!0}else{if(function(e,t){if(!t?.length)return!1;return Gt(e).some(e=>$e(e,t))}(e,t.ignoreErrors))return u&&v.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${H(e)}`),!0;if(function(e){if(!e.exception?.values?.length)return!1;return!e.message&&!e.exception.values.some(e=>e.stacktrace||e.type&&"Error"!==e.type||e.value)}(e))return u&&v.warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${H(e)}`),!0;if(function(e,t){if(!t?.length)return!1;const n=en(e);return!!n&&$e(n,t)}(e,t.denyUrls))return u&&v.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${H(e)}.\nUrl: ${en(e)}`),!0;if(!function(e,t){if(!t?.length)return!0;const n=en(e);return!n||$e(n,t)}(e,t.allowUrls))return u&&v.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${H(e)}.\nUrl: ${en(e)}`),!0}return!1}(n,e)?null:n}}},Xt=function(){return{...Jt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),name:"InboundFilters"}};function Zt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{allowUrls:[...e.allowUrls||[],...t.allowUrls||[]],denyUrls:[...e.denyUrls||[],...t.denyUrls||[]],ignoreErrors:[...e.ignoreErrors||[],...t.ignoreErrors||[],...e.disableErrorDefaults?[]:Qt],ignoreTransactions:[...e.ignoreTransactions||[],...t.ignoreTransactions||[]]}}function en(e){try{const t=[...e.exception?.values??[]].reverse().find(e=>void 0===e.mechanism?.parent_id&&e.stacktrace?.frames?.length),n=t?.stacktrace?.frames;return n?function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];for(let t=e.length-1;t>=0;t--){const n=e[t];if(n&&"<anonymous>"!==n.filename&&"[native code]"!==n.filename)return n.filename||null}return null}(n):null}catch{return u&&v.error(`Cannot extract url for event ${H(e)}`),null}}let tn;const nn=new WeakMap,rn=()=>({name:"FunctionToString",setupOnce(){tn=Function.prototype.toString;try{Function.prototype.toString=function(){const e=D(this),t=nn.has(Ie())&&void 0!==e?e:this;for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return tn.apply(t,r)}}catch{}},setup(e){nn.set(e,!0)}}),an=()=>({name:"ConversationId",setup(e){e.on("spanStart",e=>{const t=Le().getScopeData(),n=Oe().getScopeData(),r=t.conversationId||n.conversationId;if(r){const{op:t,data:n,description:a}=yt(e);if(!t?.startsWith("gen_ai.")&&!n["ai.operationId"]&&!a?.startsWith("ai."))return;e.setAttribute("gen_ai.conversation.id",r)}})}}),on=()=>{let e;return{name:"Dedupe",processEvent(t){if(t.type)return t;try{if(function(e,t){if(!t)return!1;if(function(e,t){const n=e.message,r=t.message;if(!n&&!r)return!1;if(n&&!r||!n&&r)return!1;if(n!==r)return!1;if(!sn(e,t))return!1;if(!ln(e,t))return!1;return!0}(e,t))return!0;if(function(e,t){const n=cn(t),r=cn(e);if(!n||!r)return!1;if(n.type!==r.type||n.value!==r.value)return!1;if(!sn(e,t))return!1;if(!ln(e,t))return!1;return!0}(e,t))return!0;return!1}(t,e))return u&&v.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return e=t}}};function ln(e,t){let n=me(e),r=me(t);if(!n&&!r)return!0;if(n&&!r||!n&&r)return!1;if(r.length!==n.length)return!1;for(let a=0;a<r.length;a++){const e=r[a],t=n[a];if(e.filename!==t.filename||e.lineno!==t.lineno||e.colno!==t.colno||e.function!==t.function)return!1}return!0}function sn(e,t){let n=e.fingerprint,r=t.fingerprint;if(!n&&!r)return!0;if(n&&!r||!n&&r)return!1;try{return!(n.join("")!==r.join(""))}catch{return!1}}function cn(e){return e.exception?.values?.[0]}function dn(e,t){!0===t.debug&&(u?v.enable():f(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")}));Le().update(t.initialScope);const n=new e(t);return function(e){Le().setClient(e)}(n),n.init(),n}function un(e){const t=e.protocol?`${e.protocol}:`:"",n=e.port?`:${e.port}`:"";return`${t}//${e.host}${n}${e.path?`/${e.path}`:""}/api/`}function pn(e,t,n){return t||`${function(e){return`${un(e)}${e.projectId}/envelope/`}(e)}?${function(e,t){const n={sentry_version:"7"};return e.publicKey&&(n.sentry_key=e.publicKey),t&&(n.sentry_client=`${t.name}/${t.version}`),new URLSearchParams(n).toString()}(e,n)}`}function hn(e){return[e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]]}function fn(e,t){const[n,r]=e;return[n,[...r,t]]}function mn(e,t){const n=e[1];for(const r of n){if(t(r,r[0].type))return!0}return!1}function gn(e){const t=c(l);return t.encodePolyfill?t.encodePolyfill(e):(new TextEncoder).encode(e)}function xn(e){const[t,n]=e;let r=JSON.stringify(t);function a(e){"string"===typeof r?r="string"===typeof e?r+e:[gn(r),e]:r.push("string"===typeof e?gn(e):e)}for(const i of n){const[e,t]=i;if(a(`\n${JSON.stringify(e)}\n`),"string"===typeof t||t instanceof Uint8Array)a(t);else{let e;try{e=JSON.stringify(t)}catch{e=JSON.stringify(ve(t))}a(e)}}return"string"===typeof r?r:function(e){const t=e.reduce((e,t)=>e+t.length,0),n=new Uint8Array(t);let r=0;for(const a of e)n.set(a,r),r+=a.length;return n}(r)}function vn(e){const t="string"===typeof e.data?gn(e.data):e.data;return[{type:"attachment",length:t.length,filename:e.filename,content_type:e.contentType,attachment_type:e.attachmentType},t]}const bn={sessions:"session",event:"error",client_report:"internal",user_report:"default",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",raw_security:"security",log:"log_item",trace_metric:"metric"};function yn(e){return function(e){return e in bn}(e)?bn[e]:e}function kn(e){if(!e?.sdk)return;const{name:t,version:n}=e.sdk;return{name:t,version:n}}function jn(e,t,n,r){const a=kn(n),i=e.type&&"replay_event"!==e.type?e.type:"event";!function(e,t){if(!t)return e;const n=e.sdk||{};e.sdk={...n,name:n.name||t.name,version:n.version||t.version,integrations:[...e.sdk?.integrations||[],...t.integrations||[]],packages:[...e.sdk?.packages||[],...t.packages||[]],settings:e.sdk?.settings||t.settings?{...e.sdk?.settings,...t.settings}:void 0}}(e,n?.sdk);const o=function(e,t,n,r){const a=e.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:e.event_id,sent_at:(new Date).toISOString(),...t&&{sdk:t},...!!n&&r&&{dsn:it(r)},...a&&{trace:a}}}(e,a,r,t);delete e.sdkProcessingMetadata;return hn(o,[[{type:i},e]])}function wn(){return!("undefined"!==typeof __SENTRY_BROWSER_BUNDLE__&&__SENTRY_BROWSER_BUNDLE__)&&"[object process]"===Object.prototype.toString.call("undefined"!==typeof process?process:0)}function Sn(){return"undefined"!==typeof window&&(!wn()||function(){const e=l.process;return"renderer"===e?.type}())}function $n(e,t){const n=t?"auto":"never";return[{type:"log",item_count:e.length,content_type:"application/vnd.sentry.items.log+json"},{version:2,...Sn()&&{ingest_settings:{infer_ip:n,infer_user_agent:n}},items:e}]}function _n(e,t){const n=t??En(e)??[];if(0===n.length)return;const r=e.getOptions(),a=function(e,t,n,r,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),n&&r&&(i.dsn=it(r)),hn(i,[$n(e,a)])}(n,r._metadata,r.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);zn().set(e,[]),e.emit("flushLogs"),e.sendEnvelope(a)}function En(e){return zn().get(e)}function zn(){return d("clientToLogBufferMap",()=>new WeakMap)}function Nn(e,t){const n=t?"auto":"never";return[{type:"trace_metric",item_count:e.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{version:2,...Sn()&&{ingest_settings:{infer_ip:n,infer_user_agent:n}},items:e}]}function An(e,t){const n=t??Cn(e)??[];if(0===n.length)return;const r=e.getOptions(),a=function(e,t,n,r,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),n&&r&&(i.dsn=it(r)),hn(i,[Nn(e,a)])}(n,r._metadata,r.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);Fn().set(e,[]),e.emit("flushMetrics"),e.sendEnvelope(a)}function Cn(e){return Fn().get(e)}function Fn(){return d("clientToMetricBufferMap",()=>new WeakMap)}function Tn(e){const t={trace_id:e.trace_id,span_id:e.span_id,parent_span_id:e.parent_span_id,name:e.description||"",start_timestamp:e.start_timestamp,end_timestamp:e.timestamp||e.start_timestamp,status:e.status&&"ok"!==e.status&&"cancelled"!==e.status?"error":"ok",is_segment:!1,attributes:{...e.data},links:e.links};return n=t,{...n,attributes:dt(n.attributes),links:n.links?.map(e=>({...e,attributes:dt(e.attributes)}))};var n}function Pn(e){return"object"===typeof e&&"function"===typeof e.unref&&e.unref(),e}const Dn=Symbol.for("SentryBufferFullError");function Rn(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;const t=new Set;function n(e){t.delete(e)}return{get $(){return Array.from(t)},add:function(r){if(!(t.size<e))return Ve(Dn);const a=r();return t.add(a),a.then(()=>n(a),()=>n(a)),a},drain:function(e){if(!t.size)return Ue(!0);const n=Promise.allSettled(Array.from(t)).then(()=>!0);if(!e)return n;const r=[n,new Promise(t=>Pn(setTimeout(()=>t(!1),e)))];return Promise.race(r)}}}function Ln(e,t){let{statusCode:n,headers:r}=t,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M();const i={...e},o=r?.["x-sentry-rate-limits"],l=r?.["retry-after"];if(o)for(const s of o.trim().split(",")){const[e,t,,,n]=s.split(":",5),r=parseInt(e,10),o=1e3*(isNaN(r)?60:r);if(t)for(const l of t.split(";"))"metric_bucket"===l&&n&&!n.split(";").includes("custom")||(i[l]=a+o);else i.all=a+o}else l?i.all=a+function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:M();const n=parseInt(`${e}`,10);if(!isNaN(n))return 1e3*n;const r=Date.parse(`${e}`);return isNaN(r)?6e4:r-t}(l,a):429===n&&(i.all=a+6e4);return i}function On(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Rn(e.bufferSize||64),r={};return{send:function(a){const i=[];if(mn(a,(t,n)=>{const a=yn(n);!function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M();return function(e,t){return e[t]||e.all||0}(e,t)>n}(r,a)?i.push(t):e.recordDroppedEvent("ratelimit_backoff",a)}),0===i.length)return Promise.resolve({});const o=hn(a[0],i),l=t=>{!function(e,t){return mn(e,(e,n)=>t.includes(n))}(o,["client_report"])?mn(o,(n,r)=>{e.recordDroppedEvent(t,yn(r))}):u&&v.warn(`Dropping client report. Will not send outcomes (reason: ${t}).`)};return n.add(()=>t({body:xn(o)}).then(e=>413===e.statusCode?(u&&v.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits."),l("send_error"),e):(u&&void 0!==e.statusCode&&(e.statusCode<200||e.statusCode>=300)&&v.warn(`Sentry responded with status code ${e.statusCode} to sent event.`),r=Ln(r,e),e),e=>{throw l("network_error"),u&&v.error("Encountered error running transport request:",e),e})).then(e=>e,e=>{if(e===Dn)return u&&v.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw e})},flush:e=>n.drain(e)}}function In(e){v.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`)}function Bn(e,t){if(!t?.length)return!1;for(const n of t){if(Vn(n)){if(e.description&&Se(e.description,n))return u&&In(e),!0;continue}const t=!!n.attributes&&Object.keys(n.attributes).length>0;if(!n.name&&!n.op&&!t)continue;const r=!n.name||e.description&&Se(e.description,n.name),a=!n.op||e.op&&Se(e.op,n.op),i=!n.attributes||Object.entries(n.attributes).every(t=>{let[n,r]=t;return Mn(e.attributes?.[n],r)});if(r&&a&&i)return u&&In(e),!0}return!1}function Mn(e,t){return"string"===typeof e&&("string"===typeof t||t instanceof RegExp)?Se(e,t):Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):e===t}function Un(e,t){const n=t.parent_span_id,r=t.span_id;if(n)for(const a of e)a.parent_span_id===r&&(a.parent_span_id=n)}function Vn(e){return"string"===typeof e||e instanceof RegExp}const Kn=["forwarded","-ip","remote-","via","-user"];const Hn={userInfo:!1,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:[],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5};function Wn(e){const t=null!=e.dataCollection?Hn:!0===e.sendDefaultPii?{userInfo:!0,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:["incomingRequest","outgoingRequest","incomingResponse","outgoingResponse"],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5}:{userInfo:!1,cookies:{deny:Kn},httpHeaders:{request:{deny:Kn},response:{deny:Kn}},httpBodies:[],queryParams:{deny:Kn},genAI:{inputs:!1,outputs:!1},stackFrameVariables:!0,frameContextLines:5};const n=e.dataCollection??{};return{userInfo:n.userInfo??t.userInfo,cookies:n.cookies??t.cookies,httpHeaders:{request:n.httpHeaders?.request??t.httpHeaders.request,response:n.httpHeaders?.response??t.httpHeaders.response},httpBodies:n.httpBodies??t.httpBodies,queryParams:n.queryParams??t.queryParams,genAI:{inputs:n.genAI?.inputs??t.genAI.inputs,outputs:n.genAI?.outputs??t.genAI.outputs},stackFrameVariables:n.stackFrameVariables??t.stackFrameVariables,frameContextLines:n.frameContextLines??t.frameContextLines}}const qn="Not capturing exception because it's already been captured.",Yn="Discarded session because of missing or non-string release",Gn=Symbol.for("SentryInternalError"),Qn=Symbol.for("SentryDoNotSendEventError");function Jn(e){return{message:e,[Gn]:!0}}function Xn(e){return{message:e,[Qn]:!0}}function Zn(e){return!!e&&"object"===typeof e&&Gn in e}function er(e){return!!e&&"object"===typeof e&&Qn in e}function tr(e,t,n,r,a){let i,o=0,l=!1;e.on(n,()=>{o=0,clearTimeout(i),l=!1}),e.on(t,t=>{if(o+=r(t),o>=8e5)a(e);else if(!l){const t=e.getOptions()._flushInterval??5e3;t>0&&(l=!0,i=Pn(setTimeout(()=>{a(e)},t)))}}),e.on("flush",()=>{a(e)})}class nr{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Rn(e.transportOptions?.bufferSize??64),this._dataCollection=Wn(e),e.dsn?this._dsn=st(e.dsn):u&&v.warn("No DSN provided, client will not send events."),this._dsn){const t=pn(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:t})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&tr(this,"afterCaptureLog","flushLogs",lr,_n);(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&tr(this,"afterCaptureMetric","flushMetrics",or,An)}captureException(e,t,n){const r=V();if(Y(e))return u&&v.log(qn),r;const a={event_id:r,...t};return this._process(()=>this.eventFromException(e,a).then(e=>this._captureEvent(e,a,n)).then(e=>e),"error"),a.event_id}captureMessage(e,t,n,r){const a={event_id:V(),...n},i=$(e)?e:String(e),o=_(e),l=o?this.eventFromMessage(i,t,a):this.eventFromException(e,a);return this._process(()=>l.then(e=>this._captureEvent(e,a,r)),o?"unknown":"error"),a.event_id}captureEvent(e,t,n){const r=V();if(t?.originalException&&Y(t.originalException))return u&&v.log(qn),r;const a={event_id:r,...t},i=e.sdkProcessingMetadata||{},o=i.capturedSpanScope,l=i.capturedSpanIsolationScope,s=rr(e.type);return this._process(()=>this._captureEvent(e,a,o||n,l),s),a.event_id}captureSession(e){this.sendSession(e),Z(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getDataCollectionOptions(){return this._dataCollection}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const t=this._transport;if(this.emit("flush"),!t)return!0;const n=await this._isClientDoneProcessing(e),r=await t.flush(e);return n&&r}async close(e){_n(this);const t=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),t}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(e=>{let{name:t}=e;return t.startsWith("Spotlight")}))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}getIntegrationNames(){return Object.keys(this._integrations)}addIntegration(e){const t=this._integrations[e.name];!t&&e.beforeSetup&&e.beforeSetup(this),Yt(this,e,this._integrations),t||qt(this,[e])}sendEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.emit("beforeSendEvent",e,t);const n=function(e,t){if("transaction"!==e.type||!e.spans?.length||!e.sdkProcessingMetadata?.hasGenAiSpans||!t.getOptions().streamGenAiSpans||function(e){return"stream"===e.getOptions().traceLifecycle}(t))return;const n=[],r=[];for(const i of e.spans)i.op?.startsWith("gen_ai.")?n.push(Tn(i)):r.push(i);if(0===n.length)return;e.spans=r;const a=t.getOptions().sendDefaultPii?"auto":"never";return[{type:"span",item_count:n.length,content_type:"application/vnd.sentry.items.span.v2+json"},{version:2,...Sn()&&{ingest_settings:{infer_ip:a,infer_user_agent:a}},items:n}]}(e,this);let r=jn(e,this._dsn,this._options._metadata,this._options.tunnel);for(const a of t.attachments||[])r=fn(r,vn(a));n&&(r=fn(r,n)),this.sendEnvelope(r).then(t=>this.emit("afterSendEvent",e,t))}sendSession(e){const{release:t,environment:n=Me}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!t)return void(u&&v.warn(Yn));r.release=r.release||t,r.environment=r.environment||n,e.attrs=r}else{if(!e.release&&!t)return void(u&&v.warn(Yn));e.release=e.release||t,e.environment=e.environment||n}this.emit("beforeSendSession",e);const r=function(e,t,n,r){const a=kn(n);return hn({sent_at:(new Date).toISOString(),...a&&{sdk:a},...!!r&&t&&{dsn:it(t)}},["aggregates"in e?[{type:"sessions"},e]:[{type:"session"},e.toJSON()]])}(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(this._options.sendClientReports){const r=`${e}:${t}`;u&&v.log(`Recording outcome: "${r}"${n>1?` (${n} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+n}}on(e,t){const n=this._hooks[e]=this._hooks[e]||new Set,r=function(){return t(...arguments)};return n.add(r),()=>{n.delete(r)}}emit(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];const a=this._hooks[e];a&&a.forEach(e=>e(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(t){return u&&v.error("Error while sending envelope:",t),{}}return u&&v.error("Transport disabled"),{}}registerCleanup(e){}dispose(){}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=function(e,t){const n={};return t.forEach(t=>{t?.beforeSetup&&t.beforeSetup(e)}),t.forEach(t=>{t&&Yt(e,t,n)}),n}(this,e),qt(this,e)}_updateSessionFromEvent(e,t){let n="fatal"===t.level,r=!1;const a=t.exception?.values;if(a){r=!0,n=!1;for(const e of a)if(!1===e.mechanism?.handled){n=!0;break}}const i="ok"===e.status;(i&&0===e.errors||i&&n)&&(Z(e,{...n&&{status:"crashed"},errors:e.errors||Number(r||n)}),this.captureSession(e))}async _isClientDoneProcessing(e){let t=0;for(;!e||t<e;){if(await new Promise(e=>setTimeout(e,1)),!this._numProcessing)return!0;t++}return!1}_isEnabled(){return!1!==this.getOptions().enabled&&void 0!==this._transport}_prepareEvent(e,t,n,r){const a=this.getOptions(),i=this.getIntegrationNames();return!t.integrations&&i.length&&(t.integrations=i),this.emit("preprocessEvent",e,t),e.type||r.setLastEventId(e.event_id||t.event_id),Lt(a,e,t,n,this,r).then(e=>{if(null===e)return e;this.emit("postprocessEvent",e,t),e.contexts={trace:{...e.contexts?.trace,...Be(n)},...e.contexts};const r=function(e,t){const n=t.getPropagationContext();return n.dsc||Ct(n.traceId,e)}(this,n);return e.sdkProcessingMetadata={dynamicSamplingContext:r,...e.sdkProcessingMetadata},e})}_captureEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Le(),r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Oe();return u&&ar(e)&&v.log(`Captured error event \`${Gt(e)[0]||"<unknown>"}\``),this._processEvent(e,t,n,r).then(e=>e.event_id,e=>{u&&(er(e)?v.log(e.message):Zn(e)?v.warn(e.message):v.warn(e))})}_processEvent(e,t,n,r){const a=this.getOptions(),{sampleRate:i}=a,o=ir(e),l=ar(e),s=`before send for type \`${e.type||"error"}\``,c="undefined"===typeof i?void 0:function(e){if("boolean"===typeof e)return Number(e);const t="string"===typeof e?parseFloat(e):e;return"number"!==typeof t||isNaN(t)||t<0||t>1?void 0:t}(i);if(l&&"number"===typeof c&&B()>c)return this.recordDroppedEvent("sample_rate","error"),Ve(Xn(`Discarding event because it's not included in the random sample (sampling rate = ${i})`));const d=rr(e.type);return this._prepareEvent(e,t,n,r).then(e=>{if(null===e)throw this.recordDroppedEvent("event_processor",d),Xn("An event processor returned `null`, will not send event.");if(!0===t.data?.__sentry__)return e;const n=function(e,t,n,r){const{beforeSend:a,beforeSendTransaction:i,ignoreSpans:o}=t,l=(s=t.beforeSendSpan,!(s&&"function"===typeof s&&"_streamed"in s&&s._streamed)&&t.beforeSendSpan);var s;let c=n;if(ar(c)&&a)return a(c,r);if(ir(c)){if(l||o){const t=function(e){const{trace_id:t,parent_span_id:n,span_id:r,status:a,origin:i,data:o,op:l}=e.contexts?.trace??{};return{data:o??{},description:e.transaction,op:l,parent_span_id:n,span_id:r??"",start_timestamp:e.start_timestamp??0,status:a,timestamp:e.timestamp,trace_id:t??"",origin:i,profile_id:o?.[Xe],exclusive_time:o?.[Ze],measurements:e.measurements,is_segment:!0}}(c);if(o?.length&&Bn({description:t.description,op:t.op,attributes:t.data},o))return null;if(l){const e=l(t);e?c=ee(n,{type:"transaction",timestamp:(d=e).timestamp,start_timestamp:d.start_timestamp,transaction:d.description,contexts:{trace:{trace_id:d.trace_id,span_id:d.span_id,parent_span_id:d.parent_span_id,op:d.op,status:d.status,origin:d.origin,data:{...d.data,...d.profile_id&&{[Xe]:d.profile_id},...d.exclusive_time&&{[Ze]:d.exclusive_time}}}},measurements:d.measurements}):Nt()}if(c.spans){const t=[],n=c.spans;for(const e of n)if(o?.length&&Bn({description:e.description,op:e.op,attributes:e.data},o))Un(n,e);else if(l){const n=l(e);n?t.push(n):(Nt(),t.push(e))}else t.push(e);const r=c.spans.length-t.length;r&&e.recordDroppedEvent("before_send","span",r),c.spans=t}}if(i){if(c.spans){const e=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:e}}return i(c,r)}}var d;return c}(this,a,e,t);return function(e,t){const n=`${t} must return \`null\` or a valid event.`;if(N(e))return e.then(e=>{if(!E(e)&&null!==e)throw Jn(n);return e},e=>{throw Jn(`${t} rejected with ${e}`)});if(!E(e)&&null!==e)throw Jn(n);return e}(n,s)}).then(a=>{if(null===a){if(this.recordDroppedEvent("before_send",d),o){const t=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",t)}throw Xn(`${s} returned \`null\`, will not send event.`)}const i=n.getSession()||r.getSession();if(l&&i&&this._updateSessionFromEvent(i,a),o){const e=(a.sdkProcessingMetadata?.spanCountBeforeProcessing||0)-(a.spans?a.spans.length:0);e>0&&this.recordDroppedEvent("before_send","span",e)}const c=a.transaction_info;if(o&&c&&a.transaction!==e.transaction){const e="custom";a.transaction_info={...c,source:e}}return this.sendEvent(a,t),a}).then(null,e=>{if(er(e)||Zn(e))throw e;throw this.captureException(e,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:e}),Jn(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${e}`)})}_process(e,t){this._numProcessing++,this._promiseBuffer.add(e).then(e=>(this._numProcessing--,e),e=>(this._numProcessing--,e===Dn&&this.recordDroppedEvent("queue_overflow",t),e))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(e=>{let[t,n]=e;const[r,a]=t.split(":");return{reason:r,category:a,quantity:n}})}_flushOutcomes(){u&&v.log("Flushing outcomes...");const e=this._clearOutcomes();if(0===e.length)return void(u&&v.log("No outcomes to send"));if(!this._dsn)return void(u&&v.log("No dsn provided, will not send outcomes"));u&&v.log("Sending outcomes:",e);const t=(n=e,hn((r=this._options.tunnel&&it(this._dsn))?{dsn:r}:{},[[{type:"client_report"},{timestamp:a||G(),discarded_events:n}]]));var n,r,a;this.sendEnvelope(t)}}function rr(e){return"replay_event"===e?"replay":e||"error"}function ar(e){return void 0===e.type}function ir(e){return"transaction"===e.type}function or(e){let t=0;return e.name&&(t+=2*e.name.length),t+=8,t+sr(e.attributes)}function lr(e){let t=0;return e.message&&(t+=2*e.message.length),t+sr(e.attributes)}function sr(e){if(!e)return 0;let t=0;return Object.values(e).forEach(e=>{Array.isArray(e)?t+=e.length*cr(e[0]):_(e)?t+=cr(e):t+=100}),t}function cr(e){return"string"===typeof e?2*e.length:"number"===typeof e?8:"boolean"===typeof e?4:0}function dr(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[t],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"npm";const a=(e._metadata=e._metadata||{}).sdk=e._metadata.sdk||{};a.name||(a.name=`sentry.javascript.${t}`,a.packages=n.map(e=>({name:`${r}:@sentry/${e}`,version:o})),a.version=o)}function ur(e){"aggregates"in e?void 0===e.attrs?.ip_address&&(e.attrs={...e.attrs,ip_address:"{{auto}}"}):void 0===e.ipAddress&&(e.ipAddress="{{auto}}")}function pr(e){return function(e){return y(e)&&"__sentry_fetch_url_host__"in e&&"string"===typeof e.__sentry_fetch_url_host__}(e)?`${e.message} (${e.__sentry_fetch_url_host__})`:e.message}function hr(e,t){const n=gr(e,t),r={type:br(t),value:yr(t)};return n.length&&(r.stacktrace={frames:n}),void 0===r.type&&""===r.value&&(r.value="Unrecoverable error caught"),r}function fr(e,t,n,r){const a=Ie(),i=a?.getOptions().normalizeDepth,o=(l=t,Object.values(l).find(e=>e instanceof Error));var l;const s={__serialized__:be(t,i)};if(o)return{exception:{values:[hr(e,o)]},extra:s};const c={exception:{values:[{type:z(t)?t.constructor.name:r?"UnhandledRejection":"Error",value:wr(t,{isUnhandledRejection:r})}]},extra:s};if(n){const t=gr(e,n);t.length&&(c.exception.values[0].stacktrace={frames:t})}return c}function mr(e,t){return{exception:{values:[hr(e,t)]}}}function gr(e,t){const n=t.stacktrace||t.stack||"",r=function(e){if(e&&xr.test(e.message))return 1;return 0}(t),a=function(e){if("number"===typeof e.framesToPop)return e.framesToPop;return 0}(t);try{return e(n,r,a)}catch{}return[]}const xr=/Minified React error #\d+;/i;function vr(e){return"undefined"!==typeof WebAssembly&&"undefined"!==typeof WebAssembly.Exception&&e instanceof WebAssembly.Exception}function br(e){const t=e?.name;if(!t&&vr(e)){return e.message&&Array.isArray(e.message)&&2==e.message.length?e.message[0]:"WebAssembly.Exception"}return t}function yr(e){const t=e?.message;return vr(e)?Array.isArray(e.message)&&2==e.message.length?e.message[1]:"wasm exception":t?t.error&&"string"===typeof t.error.message?pr(t.error):pr(e):"No error message"}function kr(e,t,n,r,a){let i;if(j(t)&&t.error){return mr(e,t.error)}if(w(t)||k(t,"DOMException")){const a=t;if("stack"in t){i=mr(e,t);const a=i.exception?.values?.[0];if(r&&n&&a&&!a.stacktrace){const t=gr(e,n);t.length&&(a.stacktrace={frames:t},q(i,{synthetic:!0}))}}else{const t=a.name||(w(a)?"DOMError":"DOMException"),o=a.message?`${t}: ${a.message}`:t;i=jr(e,o,n,r),W(i,o)}return"code"in a&&(i.tags={...i.tags,"DOMException.code":`${a.code}`}),i}if(y(t))return mr(e,t);if(E(t)||z(t)){return i=fr(e,t,n,a),q(i,{synthetic:!0}),i}return i=jr(e,t,n,r),W(i,`${t}`,void 0),q(i,{synthetic:!0}),i}function jr(e,t,n,r){const a={};if(r&&n){const r=gr(e,n);r.length&&(a.exception={values:[{value:t,stacktrace:{frames:r}}]}),q(a,{synthetic:!0})}if($(t)){const{__sentry_template_string__:e,__sentry_template_values__:n}=t;return a.logentry={message:e,params:n},a}return a.message=t,a}function wr(e,t){let{isUnhandledRejection:n}=t;const r=function(e){const t=Object.keys(R(e));return t.sort(),t[0]?t.join(", "):"[object has no keys]"}(e),a=n?"promise rejection":"exception";if(j(e))return`Event \`ErrorEvent\` captured as ${a} with message \`${e.message}\``;if(z(e)){return`Event \`${function(e){try{const t=Object.getPrototypeOf(e);return t?t.constructor.name:void 0}catch{}}(e)}\` (type=${e.type}) captured as ${a}`}return`Object captured as ${a} with keys: ${r}`}const Sr=l;function $r(){try{return Sr.document.location.href}catch{return""}}const _r=l;let Er=0;function zr(){return Er>0}function Nr(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!==typeof e)return e;try{const t=e.__sentry_wrapped__;if(t)return"function"===typeof t?t:e;if(D(e))return e}catch{return e}const n=function(){for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];l._sentryWrappedDepth=(l._sentryWrappedDepth||0)+1;try{const n=r.map(e=>Nr(e,t));return e.apply(this,n)}catch(i){throw Er++,setTimeout(()=>{Er--}),function(){const e=De(s());for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(2===n.length){const[t,r]=n;return t?e.withSetScope(t,r):e.withScope(r)}e.withScope(n[0])}(e=>{var n,a;e.addEventProcessor(e=>(t.mechanism&&(W(e,void 0,void 0),q(e,t.mechanism)),e.extra={...e.extra,arguments:r},e)),n=i,Le().captureException(n,Ot(a))}),i}finally{l._sentryWrappedDepth=(l._sentryWrappedDepth||0)-1}};try{for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}catch{}P(n,e),T(e,"__sentry_wrapped__",n);try{Object.getOwnPropertyDescriptor(n,"name").configurable&&Object.defineProperty(n,"name",{get:()=>e.name})}catch{}return n}function Ar(){const e=$r(),{referrer:t}=_r.document||{},{userAgent:n}=_r.navigator||{};return{url:e,headers:{...t&&{Referer:t},...n&&{"User-Agent":n}}}}class Cr extends nr{constructor(e){const t=(n=e,{release:"string"===typeof __SENTRY_RELEASE__?__SENTRY_RELEASE__:_r.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...n});var n;dr(t,"browser",["browser"],_r.SENTRY_SDK_SOURCE||"npm"),t._metadata?.sdk&&(t._metadata.sdk.settings={infer_ip:t.sendDefaultPii?"auto":"never",...t._metadata.sdk.settings}),super(t);const{sendDefaultPii:r,sendClientReports:a,enableLogs:i,_experiments:o,enableMetrics:l}=this._options,s=l??o?.enableMetrics??!0;_r.document&&(a||i||s)&&_r.document.addEventListener("visibilitychange",()=>{"hidden"===_r.document.visibilityState&&(a&&this._flushOutcomes(),i&&_n(this),s&&An(this))}),r&&this.on("beforeSendSession",ur)}eventFromException(e,t){return function(e,t,n,r){const a=kr(e,t,n?.syntheticException||void 0,r);return q(a),a.level="error",n?.event_id&&(a.event_id=n.event_id),Ue(a)}(this._options.stackParser,e,t,this._options.attachStacktrace)}eventFromMessage(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info",n=arguments.length>2?arguments[2]:void 0;return function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"info",r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;const i=jr(e,t,r?.syntheticException||void 0,a);return i.level=n,r?.event_id&&(i.event_id=r.event_id),Ue(i)}(this._options.stackParser,e,t,n,this._options.attachStacktrace)}_prepareEvent(e,t,n,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,t,n,r)}}const Fr={},Tr={};function Pr(e,t){return Fr[e]=Fr[e]||[],Fr[e].push(t),()=>{const n=Fr[e];if(n){const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}}function Dr(e,t){if(!Tr[e]){Tr[e]=!0;try{t()}catch(n){u&&v.error(`Error while instrumenting ${e}`,n)}}}function Rr(e,t){const n=e&&Fr[e];if(n)for(const a of n)try{a(t)}catch(r){u&&v.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${fe(a)}\nError:`,r)}}const Lr=new Set([]);function Or(){"console"in l&&p.forEach(function(e){e in l.console&&F(l.console,e,function(t){return h[e]=t,function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];const a=n[0],i=h[e],o=Lr.size&&"string"===typeof a&&$e(a,Lr);o||Rr("console",{args:n,level:e}),(!o||u&&v.isEnabled())&&i?.apply(l.console,n)}})})}const Ir=l;function Br(){if(!("fetch"in Ir))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Mr(e){return e&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())}function Ur(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&!function(){if("string"===typeof EdgeRuntime)return!0;if(!Br())return!1;if(Mr(Ir.fetch))return!0;let e=!1;const t=Ir.document;if(t&&"function"===typeof t.createElement)try{const n=t.createElement("iframe");n.hidden=!0,t.head.appendChild(n),n.contentWindow?.fetch&&(e=Mr(n.contentWindow.fetch)),t.head.removeChild(n)}catch(n){u&&v.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return e}()||F(l,"fetch",function(t){return function(){const n=new Error;for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];const{method:o,url:s}=function(e){if(0===e.length)return{method:"GET",url:""};if(2===e.length){const[t,n]=e;return{url:Kr(t),method:Vr(n,"method")?String(n.method).toUpperCase():C(t)&&Vr(t,"method")?String(t.method).toUpperCase():"GET"}}const t=e[0];return{url:Kr(t),method:Vr(t,"method")?String(t.method).toUpperCase():"GET"}}(a),c={args:a,fetchData:{method:o,url:s},startTimestamp:1e3*J(),virtualError:n,headers:Hr(a)};return e||Rr("fetch",{...c}),t.apply(l,a).then(async t=>(e?e(t):Rr("fetch",{...c,endTimestamp:1e3*J(),response:t}),t),e=>{Rr("fetch",{...c,endTimestamp:1e3*J(),error:e}),y(e)&&void 0===e.stack&&(e.stack=n.stack,T(e,"framesToPop",1));const t=Ie(),r=t?.getOptions().enhanceFetchErrorMessages??"always";if(!1!==r&&e instanceof TypeError&&("Failed to fetch"===e.message||"Load failed"===e.message||"NetworkError when attempting to fetch resource."===e.message))try{const t=new URL(c.fetchData.url).host;"always"===r?e.message=`${e.message} (${t})`:T(e,"__sentry_fetch_url_host__",t)}catch{}throw e})}})}function Vr(e,t){return!!e&&"object"===typeof e&&!!e[t]}function Kr(e){return"string"===typeof e?e:e?Vr(e,"url")?e.url:e.toString?e.toString():"":""}function Hr(e){const[t,n]=e;try{if("object"===typeof n&&null!==n&&"headers"in n&&n.headers)return new Headers(n.headers);if(C(t))return new Headers(t.headers)}catch{}}const Wr=100;function qr(e,t){const n=Ie(),r=Oe();if(!n)return;const{beforeBreadcrumb:a=null,maxBreadcrumbs:i=Wr}=n.getOptions();if(i<=0)return;const o={timestamp:G(),...e},l=a?f(()=>a(o,t)):o;null!==l&&(n.emit&&n.emit("beforeAddBreadcrumb",l,t),r.addBreadcrumb(l,i))}function Yr(e){return"warn"===e?"warning":["fatal","error","warning","log","info","debug"].includes(e)?e:"log"}function Gr(e){return void 0===e?void 0:e>=400&&e<500?"warning":e>=500?"error":void 0}function Qr(e){if(!e)return{};const t=e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!t)return{};const n=t[6]||"",r=t[8]||"";return{host:t[4],path:t[5],protocol:t[2],search:n,hash:r,relative:t[5]+n+r}}const Jr=l;let Xr,Zr,ea;function ta(){if(!Jr.document)return;const e=Rr.bind(null,"dom"),t=na(e,!0);Jr.document.addEventListener("click",t,!1),Jr.document.addEventListener("keypress",t,!1),["EventTarget","Node"].forEach(t=>{const n=Jr,r=n[t]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(F(r,"addEventListener",function(t){return function(n,r,a){if("click"===n||"keypress"==n)try{const r=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},i=r[n]=r[n]||{refCount:0};if(!i.handler){const r=na(e);i.handler=r,t.call(this,n,r,a)}i.refCount++}catch{}return t.call(this,n,r,a)}}),F(r,"removeEventListener",function(e){return function(t,n,r){if("click"===t||"keypress"==t)try{const n=this.__sentry_instrumentation_handlers__||{},a=n[t];a&&(a.refCount--,a.refCount<=0&&(e.call(this,t,a.handler,r),a.handler=void 0,delete n[t]),0===Object.keys(n).length&&delete this.__sentry_instrumentation_handlers__)}catch{}return e.call(this,t,n,r)}}))})}function na(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n=>{if(!n||n._sentryCaptured)return;const r=function(e){try{return e.target}catch{return null}}(n);if(function(e,t){return"keypress"===e&&(!t?.tagName||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName&&!t.isContentEditable)}(n.type,r))return;T(n,"_sentryCaptured",!0),r&&!r._sentryId&&T(r,"_sentryId",V());const a="keypress"===n.type?"input":n.type;if(!function(e){if(e.type!==Zr)return!1;try{if(!e.target||e.target._sentryId!==ea)return!1}catch{}return!0}(n)){e({event:n,name:a,global:t}),Zr=n.type,ea=r?r._sentryId:void 0}clearTimeout(Xr),Xr=Jr.setTimeout(()=>{ea=void 0,Zr=void 0},1e3)}}const ra="__sentry_xhr_v3__";function aa(){if(!Jr.XMLHttpRequest)return;const e=XMLHttpRequest.prototype;e.open=new Proxy(e.open,{apply(e,t,n){const r=new Error,a=1e3*J(),i=S(n[0])?n[0].toUpperCase():void 0,o=function(e){if(S(e))return e;try{return e.toString()}catch{}return}(n[1]);if(!i||!o)return e.apply(t,n);t[ra]={method:i,url:o,request_headers:{}},"POST"===i&&o.match(/sentry_key/)&&(t.__sentry_own_request__=!0);const l=()=>{const e=t[ra];if(e&&4===t.readyState){try{e.status_code=t.status}catch{}Rr("xhr",{endTimestamp:1e3*J(),startTimestamp:a,xhr:t,virtualError:r})}};return"onreadystatechange"in t&&"function"===typeof t.onreadystatechange?t.onreadystatechange=new Proxy(t.onreadystatechange,{apply:(e,t,n)=>(l(),e.apply(t,n))}):t.addEventListener("readystatechange",l),t.setRequestHeader=new Proxy(t.setRequestHeader,{apply(e,t,n){const[r,a]=n,i=t[ra];return i&&S(r)&&S(a)&&(i.request_headers[r.toLowerCase()]=a),e.apply(t,n)}}),e.apply(t,n)}}),e.send=new Proxy(e.send,{apply(e,t,n){const r=t[ra];if(!r)return e.apply(t,n);void 0!==n[0]&&(r.body=n[0]);return Rr("xhr",{startTimestamp:1e3*J(),xhr:t}),e.apply(t,n)}})}let ia;function oa(e){const t="history";Pr(t,e),Dr(t,la)}function la(){function e(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];const a=n.length>2?n[2]:void 0;if(a){const t=ia,r=function(e){try{return new URL(e,Jr.location.origin).toString()}catch{return e}}(String(a));if(ia=r,t===r)return e.apply(this,n);Rr("history",{from:t,to:r})}return e.apply(this,n)}}Jr.addEventListener("popstate",()=>{const e=Jr.location.href,t=ia;if(ia=e,t===e)return;Rr("history",{from:t,to:e})}),"history"in Ir&&Ir.history&&(F(Jr.history,"pushState",e),F(Jr.history,"replaceState",e))}function sa(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return"<unknown>";try{let n=e;const r=5,a=[];let i=0,o=0;const l=" > ",s=l.length;let c;const d=Array.isArray(t)?t:t.keyAttrs,u=!Array.isArray(t)&&t.maxStringLength||80;for(;n&&i++<r&&(c=ca(n,d),!("html"===c||i>1&&o+a.length*s+c.length>=u));)a.push(c),o+=c.length,n=n.parentNode;return a.reverse().join(l)}catch{return"<unknown>"}}function ca(e,t){const n=e,r=[];if(!n?.tagName)return"";if("undefined"!==typeof HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}r.push(n.tagName.toLowerCase());const a=t?.length?t.filter(e=>n.getAttribute(e)).map(e=>[e,n.getAttribute(e)]):null;if(a?.length)a.forEach(e=>{r.push(`[${e[0]}="${e[1]}"]`)});else{n.id&&r.push(`#${n.id}`);const e=n.className;if(e&&S(e)){const t=e.split(/\s+/);for(const e of t)r.push(`.${e}`)}}for(const i of["aria-label","type","name","title","alt"]){const e=n.getAttribute(i);e&&r.push(`[${i}="${e}"]`)}return r.join("")}const da="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,ua=1024,pa=function(){const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"Breadcrumbs",setup(t){var n;e.console&&function(e){const t="console",n=Pr(t,e);Dr(t,Or)}(function(e){return function(t){if(Ie()!==e)return;const n={category:"console",data:{arguments:t.args,logger:"console"},level:Yr(t.level),message:we(t.args," ")};if("assert"===t.level){if(!1!==t.args[0])return;n.message=`Assertion failed: ${we(t.args.slice(1)," ")||"console.assert"}`,n.data.arguments=t.args.slice(1)}qr(n,{input:t.args,level:t.level})}}(t)),e.dom&&(n=function(e,t){return function(n){if(Ie()!==e)return;let r,a,i="object"===typeof t?t.serializeAttribute:void 0,o="object"===typeof t&&"number"===typeof t.maxStringLength?t.maxStringLength:void 0;o&&o>ua&&(da&&v.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${o} was configured. Sentry will use 1024 instead.`),o=ua),"string"===typeof i&&(i=[i]);try{const e=n.event,t=function(e){return!!e&&!!e.target}(e)?e.target:e;r=sa(t,{keyAttrs:i,maxStringLength:o}),a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;if(!Sr.HTMLElement)return null;let n=e;for(let r=0;r<t;r++){if(!n)return null;if(n instanceof HTMLElement){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}n=n.parentNode}return null}(t)}catch{r="<unknown>"}if(0===r.length)return;const l={category:`ui.${n.name}`,message:r};a&&(l.data={"ui.component_name":a}),qr(l,{event:n.event,name:n.name,global:n.global})}}(t,e.dom),Pr("dom",n),Dr("dom",ta)),e.xhr&&function(e){Pr("xhr",e),Dr("xhr",aa)}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:n,endTimestamp:r}=t,a=t.xhr[ra];if(!n||!r||!a)return;const{method:i,url:o,status_code:l,body:s}=a,c={method:i,url:o,status_code:l},d={xhr:t.xhr,input:s,startTimestamp:n,endTimestamp:r},u={category:"xhr",data:c,type:"http",level:Gr(l)};e.emit("beforeOutgoingRequestBreadcrumb",u,d),qr(u,d)}}(t)),e.fetch&&function(e,t){const n="fetch",r=Pr(n,e);Dr(n,()=>Ur(void 0,t))}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:n,endTimestamp:r}=t;if(r&&(!t.fetchData.url.match(/sentry_key/)||"POST"!==t.fetchData.method))if(t.error){const a={data:t.error,input:t.args,startTimestamp:n,endTimestamp:r},i={category:"fetch",data:t.fetchData,level:"error",type:"http"};e.emit("beforeOutgoingRequestBreadcrumb",i,a),qr(i,a)}else{const a=t.response,i={...t.fetchData,status_code:a?.status},o={input:t.args,response:a,startTimestamp:n,endTimestamp:r},l={category:"fetch",data:i,type:"http",level:Gr(i.status_code)};e.emit("beforeOutgoingRequestBreadcrumb",l,o),qr(l,o)}}}(t)),e.history&&oa(function(e){return function(t){if(Ie()!==e)return;let n=t.from,r=t.to;const a=Qr(_r.location.href);let i=n?Qr(n):void 0;const o=Qr(r);i?.path||(i=a),a.protocol===o.protocol&&a.host===o.host&&(r=o.relative),a.protocol===i.protocol&&a.host===i.host&&(n=i.relative),qr({category:"navigation",data:{from:n,to:r}})}}(t)),e.sentry&&t.on("beforeSendEvent",function(e){return function(t){Ie()===e&&qr({category:"sentry."+("transaction"===t.type?"transaction":"event"),event_id:t.event_id,level:t.level,message:H(t)},{event:t})}}(t))}}};const ha="EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(","),fa=function(){const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"BrowserApiErrors",setupOnce(){e.setTimeout&&F(_r,"setTimeout",ma),e.setInterval&&F(_r,"setInterval",ma),e.requestAnimationFrame&&F(_r,"requestAnimationFrame",ga),e.XMLHttpRequest&&"XMLHttpRequest"in _r&&F(XMLHttpRequest.prototype,"send",xa);const t=e.eventTarget;if(t){(Array.isArray(t)?t:ha).forEach(t=>function(e,t){const n=_r,r=n[e]?.prototype;if(!r?.hasOwnProperty?.("addEventListener"))return;F(r,"addEventListener",function(n){return function(r,a,i){try{"function"===typeof a.handleEvent&&(a.handleEvent=Nr(a.handleEvent,{mechanism:{data:{handler:fe(a),target:e},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return t.unregisterOriginalCallbacks&&function(e,t,n){e&&"object"===typeof e&&"removeEventListener"in e&&"function"===typeof e.removeEventListener&&e.removeEventListener(t,n)}(this,r,a),n.apply(this,[r,Nr(a,{mechanism:{data:{handler:fe(a),target:e},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),i])}}),F(r,"removeEventListener",function(e){return function(t,n,r){try{const a=n.__sentry_wrapped__;a&&e.call(this,t,a,r)}catch{}return e.call(this,t,n,r)}})}(t,e))}}}};function ma(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];const a=n[0];return n[0]=Nr(a,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${fe(e)}`}}),e.apply(this,n)}}function ga(e){return function(t){return e.apply(this,[Nr(t,{mechanism:{data:{handler:fe(e)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function xa(e){return function(){const t=this;["onload","onerror","onprogress","onreadystatechange"].forEach(e=>{e in t&&"function"===typeof t[e]&&F(t,e,function(t){const n={mechanism:{data:{handler:fe(t)},handled:!1,type:`auto.browser.browserapierrors.xhr.${e}`}},r=D(t);return r&&(n.mechanism.data.handler=fe(r)),Nr(t,n)})});for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return e.apply(this,r)}}const va=function(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).lifecycle??"route";return{name:"BrowserSession",setupOnce(){if("undefined"===typeof _r.document)return void(da&&v.warn("Using the `browserSessionIntegration` in non-browser environments is not supported."));Mt({ignoreDuration:!0}),Kt();const t=Oe();let n=t.getUser();t.addScopeListener(e=>{const t=e.getUser();n?.id===t?.id&&n?.ip_address===t?.ip_address||(Kt(),n=t)}),"route"===e&&oa(e=>{let{from:t,to:n}=e;t!==n&&(Mt({ignoreDuration:!0}),Kt())})}}};function ba(e,t){const n=e.attributes??(e.attributes={});Object.entries(t).forEach(e=>{let[t,r]=e;null==r||t in n||(n[t]=r)})}const ya=()=>({name:"CultureContext",preprocessEvent(e){const t=ka();t&&(e.contexts={...e.contexts,culture:{...t,...e.contexts?.culture}})},processSegmentSpan(e){const t=ka();t&&ba(e,{"culture.locale":t.locale,"culture.timezone":t.timezone,"culture.calendar":t.calendar})}});function ka(){try{const e=_r.Intl;if(!e)return;const t=e.DateTimeFormat().resolvedOptions();return{locale:t.locale,timezone:t.timeZone,calendar:t.calendar}}catch{return}}let ja=null;function wa(){ja=l.onerror,l.onerror=function(e,t,n,r,a){return Rr("error",{column:r,error:a,line:n,msg:e,url:t}),!!ja&&ja.apply(this,arguments)},l.onerror.__SENTRY_INSTRUMENTED__=!0}let Sa=null;function $a(){Sa=l.onunhandledrejection,l.onunhandledrejection=function(e){return Rr("unhandledrejection",e),!Sa||Sa.apply(this,arguments)},l.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const _a=function(){const e={onerror:!0,onunhandledrejection:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"GlobalHandlers",setupOnce(){Error.stackTraceLimit=50},setup(t){e.onerror&&(!function(e){!function(e){const t="error";Pr(t,e),Dr(t,wa)}(t=>{const{stackParser:n,attachStacktrace:r}=za();if(Ie()!==e||zr())return;const{msg:a,url:i,line:o,column:l,error:s}=t,c=function(e,t,n,r){const a=e.exception=e.exception||{},i=a.values=a.values||[],o=i[0]=i[0]||{},l=o.stacktrace=o.stacktrace||{},s=l.frames=l.frames||[];0===s.length&&s.push({colno:r,lineno:n,filename:Na(t)??$r(),function:se,in_app:!0});return e}(kr(n,s||a,void 0,r,!1),i,o,l);c.level="error",Bt(c,{originalException:s,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}(t),Ea("onerror")),e.onunhandledrejection&&(!function(e){!function(e){const t="unhandledrejection";Pr(t,e),Dr(t,$a)}(t=>{const{stackParser:n,attachStacktrace:r}=za();if(Ie()!==e||zr())return;const a=function(e){if(_(e))return e;try{if("reason"in e)return e.reason;if("detail"in e&&"reason"in e.detail)return e.detail.reason}catch{}return e}(t),i=_(a)?{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(a)}`}]}}:kr(n,a,void 0,r,!0);i.level="error",Bt(i,{originalException:a,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}(t),Ea("onunhandledrejection"))}}};function Ea(e){da&&v.log(`Global Handler attached: ${e}`)}function za(){const e=Ie();return e?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function Na(e){if(S(e)&&0!==e.length)return e.startsWith("data:")?`<${function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(e.startsWith("data:")){const n=e.match(/^data:([^;,]+)/),r=n?n[1]:"text/plain",a=e.includes(";base64,"),i=e.indexOf(",");let o="";if(t&&-1!==i){const t=e.slice(i+1);o=t.length>10?`${t.slice(0,10)}... [truncated]`:t}return`data:${r}${a?",base64":""}${o?`,${o}`:""}`}return e}(e,!1)}>`:e}const Aa=()=>({name:"HttpContext",preprocessEvent(e){if(!_r.navigator&&!_r.location&&!_r.document)return;const t=Ar(),n={...t.headers,...e.request?.headers};e.request={...t,...e.request,headers:n}},processSegmentSpan(e){if(!_r.navigator&&!_r.location&&!_r.document)return;const t=Ar();ba(e,{"url.full":t.url||void 0,"http.request.header.user_agent":t.headers["User-Agent"],"http.request.header.referer":t.headers.Referer})}});function Ca(e,t,n,r,a,i){if(!a.exception?.values||!i||!A(i.originalException,Error))return;const o=a.exception.values.length>0?a.exception.values[a.exception.values.length-1]:void 0;o&&(a.exception.values=Fa(e,t,r,i.originalException,n,a.exception.values,o,0))}function Fa(e,t,n,r,a,i,o,l){if(i.length>=n+1)return i;let s=[...i];if(A(r[a],Error)){Pa(o,l,r);const i=e(t,r[a]),c=s.length;Da(i,a,c,l),s=Fa(e,t,n,r[a],a,[i,...s],i,c)}return Ta(r)&&r.errors.forEach((i,c)=>{if(A(i,Error)){Pa(o,l,r);const d=e(t,i),u=s.length;Da(d,`errors[${c}]`,u,l),s=Fa(e,t,n,i,a,[d,...s],d,u)}}),s}function Ta(e){return Array.isArray(e.errors)}function Pa(e,t,n){e.mechanism={handled:!0,type:"auto.core.linked_errors",...Ta(n)&&{is_exception_group:!0},...e.mechanism,exception_id:t}}function Da(e,t,n,r){e.mechanism={handled:!0,...e.mechanism,type:"chained",source:t,exception_id:n,parent_id:r}}const Ra=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=e.limit||5,n=e.key||"cause";return{name:"LinkedErrors",preprocessEvent(e,r,a){Ca(hr,a.getOptions().stackParser,n,t,e,r)}}};function La(e,t,n,r){const a={filename:e,function:"<anonymous>"===t?se:t,in_app:!0};return void 0!==n&&(a.lineno=n),void 0!==r&&(a.colno=r),a}const Oa=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Ia=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Ba=/\((\S*)(?::(\d+))(?::(\d+))\)/,Ma=/at (.+?) ?\(data:(.+?),/,Ua=[30,e=>{const t=e.match(Ma);if(t)return{filename:`<data:${t[2]}>`,function:t[1]};const n=Oa.exec(e);if(n){const[,e,t,r]=n;return La(e,se,+t,+r)}const r=Ia.exec(e);if(r){if(0===r[2]?.indexOf("eval")){const e=Ba.exec(r[2]);e&&(r[2]=e[1],r[3]=e[2],r[4]=e[3])}const[e,t]=qa(r[1]||se,r[2]);return La(t,e,r[3]?+r[3]:void 0,r[4]?+r[4]:void 0)}}],Va=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Ka=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Ha=[50,e=>{const t=Va.exec(e);if(t){if(t[3]&&t[3].indexOf(" > eval")>-1){const e=Ka.exec(t[3]);e&&(t[1]=t[1]||"eval",t[3]=e[1],t[4]=e[2],t[5]="")}let e=t[3],n=t[1]||se;return[n,e]=qa(n,e),La(e,n,t[4]?+t[4]:void 0,t[5]?+t[5]:void 0)}}],Wa=ue(...[Ua,Ha]),qa=(e,t)=>{const n=-1!==e.indexOf("safari-extension"),r=-1!==e.indexOf("safari-web-extension");return n||r?[-1!==e.indexOf("@")?e.split("@")[0]:se,n?`safari-extension:${t}`:`safari-web-extension:${t}`]:[e,t]},Ya="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,Ga={};function Qa(e){const t=Ga[e];if(t)return t;let n=Jr[e];if(Mr(n))return Ga[e]=n.bind(Jr);const r=Jr.document;if(r&&"function"===typeof r.createElement)try{const t=r.createElement("iframe");t.hidden=!0,r.head.appendChild(t);const a=t.contentWindow;a?.[e]&&(n=a[e]),r.head.removeChild(t)}catch(a){Ya&&v.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,a)}return n?Ga[e]=n.bind(Jr):n}function Ja(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Qa("fetch"),n=0,r=0;return On(e,async function(a){const i=a.body.length;n+=i,r++;const o={body:a.body,method:"POST",referrerPolicy:"strict-origin",headers:e.headers,keepalive:n<=6e4&&r<15,...e.fetchOptions};try{const n=await t(e.url,o);return{statusCode:n.status,headers:{"x-sentry-rate-limits":n.headers.get("X-Sentry-Rate-Limits"),"retry-after":n.headers.get("Retry-After")}}}catch(l){throw Ga["fetch"]=void 0,l}finally{n-=i,r--}},Rn(e.bufferSize||40))}const Xa=/^HTML(\w*)Element$/;function Za(e){if("undefined"!==typeof window&&e===window)return"[Window]";if("undefined"!==typeof document&&e===document)return"[Document]";if(function(e){if("undefined"===typeof Element)return!1;try{return e instanceof Element}catch{return!1}}(e)){const t=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(e);if(Xa.test(t))return`[HTMLElement: ${sa(e)}]`}}function ei(){return!!function(){if("undefined"===typeof _r.window)return!1;const e=_r;if(e.nw)return!1;const t=e.chrome||e.browser;if(!t?.runtime?.id)return!1;const n=$r();return!(_r===_r.top&&/^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(n))}()&&(da&&f(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0)}function ti(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=!e.skipBrowserExtensionCheck&&ei();let n=null==e.defaultIntegrations?[Xt(),rn(),an(),fa(),pa(),_a(),Ra(),on(),Aa(),ya(),va()]:e.defaultIntegrations;const r={...e,enabled:!t&&e.enabled,stackParser:(a=e.stackParser||Wa,Array.isArray(a)?ue(...a):a),integrations:Wt({integrations:e.integrations,defaultIntegrations:n}),transport:e.transport||Ja};var a;return xe(Za),dn(Cr,r)}function ni(e){const t={...e};var n,a;dr(t,"react"),n="react",a={version:r.version},Oe().setContext(n,a);const i=ti(t);return xe(ri),i}function ri(e){return E(t=e)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t?"[SyntheticEvent]":Za(e);var t}var ai="popstate";function ii(e){return"object"===typeof e&&null!=e&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function oi(){return hi(function(e,t){let n=t.state?.masked,{pathname:r,search:a,hash:i}=n||e.location;return di("",{pathname:r,search:a,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default",n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)},function(e,t){return"string"===typeof t?t:ui(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function li(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function si(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(n){}}}function ci(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function di(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?pi(t):t,state:n,key:t&&t.key||r||Math.random().toString(36).substring(2,10),unstable_mask:a}}function ui(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&"?"!==n&&(t+="?"===n.charAt(0)?n:"?"+n),r&&"#"!==r&&(t+="#"===r.charAt(0)?r:"#"+r),t}function pi(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function hi(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:a=document.defaultView,v5Compat:i=!1}=r,o=a.history,l="POP",s=null,c=d();function d(){return(o.state||{idx:null}).idx}function u(){l="POP";let e=d(),t=null==e?null:e-c;c=e,s&&s({action:l,location:h.location,delta:t})}function p(e){return fi(e)}null==c&&(c=0,o.replaceState({...o.state,idx:c},""));let h={get action(){return l},get location(){return e(a,o)},listen(e){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(ai,u),s=e,()=>{a.removeEventListener(ai,u),s=null}},createHref:e=>t(a,e),createURL:p,encodeLocation(e){let t=p(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){l="PUSH";let r=ii(e)?e:di(h.location,e,t);n&&n(r,e),c=d()+1;let u=ci(r,c),p=h.createHref(r.unstable_mask||r);try{o.pushState(u,"",p)}catch(f){if(f instanceof DOMException&&"DataCloneError"===f.name)throw f;a.location.assign(p)}i&&s&&s({action:l,location:h.location,delta:1})},replace:function(e,t){l="REPLACE";let r=ii(e)?e:di(h.location,e,t);n&&n(r,e),c=d();let a=ci(r,c),u=h.createHref(r.unstable_mask||r);o.replaceState(a,"",u),i&&s&&s({action:l,location:h.location,delta:0})},go:e=>o.go(e)};return h}function fi(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="http://localhost";"undefined"!==typeof window&&(n="null"!==window.location.origin?window.location.origin:window.location.href),li(n,"No window.location.(origin|href) available to create URL");let r="string"===typeof e?e:ui(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}new WeakMap;function mi(e,t){return gi(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function gi(e,t,n,r){let a=Ci(("string"===typeof t?pi(t):t).pathname||"/",n);if(null==a)return null;let i=xi(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let n=e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n]);return n?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(i);let o=null;for(let l=0;null==o&&l<i.length;++l){let e=Ai(a);o=Ei(i[l],e,r)}return o}function xi(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e,i){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,l=arguments.length>3?arguments[3]:void 0,s={relativePath:void 0===l?e.path||"":l,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};if(s.relativePath.startsWith("/")){if(!s.relativePath.startsWith(r)&&o)return;li(s.relativePath.startsWith(r),`Absolute route path "${s.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),s.relativePath=s.relativePath.slice(r.length)}let c=Oi([r,s.relativePath]),d=n.concat(s);e.children&&e.children.length>0&&(li(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${c}".`),xi(e.children,t,d,c,o)),(null!=e.path||e.index)&&t.push({path:c,score:_i(c,e.index),routesMeta:d})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let n of vi(e.path))i(e,t,!0,n);else i(e,t)}),t}function vi(e){let t=e.split("/");if(0===t.length)return[];let[n,...r]=t,a=n.endsWith("?"),i=n.replace(/\?$/,"");if(0===r.length)return a?[i,""]:[i];let o=vi(r.join("/")),l=[];return l.push(...o.map(e=>""===e?i:[i,e].join("/"))),a&&l.push(...o),l.map(t=>e.startsWith("/")&&""===t?"/":t)}var bi=/^:[\w-]+$/,yi=3,ki=2,ji=1,wi=10,Si=-2,$i=e=>"*"===e;function _i(e,t){let n=e.split("/"),r=n.length;return n.some($i)&&(r+=Si),t&&(r+=ki),n.filter(e=>!$i(e)).reduce((e,t)=>e+(bi.test(t)?yi:""===t?ji:wi),r)}function Ei(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:r}=e,a={},i="/",o=[];for(let l=0;l<r.length;++l){let e=r[l],s=l===r.length-1,c="/"===i?t:t.slice(i.length)||"/",d=zi({path:e.relativePath,caseSensitive:e.caseSensitive,end:s},c),u=e.route;if(!d&&s&&n&&!r[r.length-1].route.index&&(d=zi({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!d)return null;Object.assign(a,d.params),o.push({params:a,pathname:Oi([i,d.pathname]),pathnameBase:Ii(Oi([i,d.pathnameBase])),route:u}),"/"!==d.pathnameBase&&(i=Oi([i,d.pathnameBase]))}return o}function zi(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Ni(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:a}=t;if("*"===r){let e=l[n]||"";o=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const s=l[n];return e[r]=a&&!s?void 0:(s||"").replace(/%2F/g,"/"),e},{}),pathname:i,pathnameBase:o,pattern:e}}function Ni(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];si("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,n,a,i)=>{if(r.push({paramName:t,isOptional:null!=n}),n){let t=i.charAt(a+e.length);return t&&"/"!==t?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),a+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":""!==e&&"/"!==e&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function Ai(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return si(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ci(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&"/"!==r?null:e.slice(n)||"/"}var Fi=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Ti(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)}),n.length>1?n.join("/"):"/"}function Pi(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Di(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function Ri(e){let t=Di(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Li(e,t,n){let r,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?r=pi(e):(r={...e},li(!r.pathname||!r.pathname.includes("?"),Pi("?","pathname","search",r)),li(!r.pathname||!r.pathname.includes("#"),Pi("#","pathname","hash",r)),li(!r.search||!r.search.includes("#"),Pi("#","search","hash",r)));let i,o=""===e||""===r.pathname,l=o?"/":r.pathname;if(null==l)i=n;else{let e=t.length-1;if(!a&&l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;r.pathname=t.join("/")}i=e>=0?t[e]:"/"}let s=function(e){let t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:r,search:a="",hash:i=""}="string"===typeof e?pi(e):e;return r?(r=r.replace(/\/\/+/g,"/"),t=r.startsWith("/")?Ti(r.substring(1),"/"):Ti(r,n)):t=n,{pathname:t,search:Bi(a),hash:Mi(i)}}(r,i),c=l&&"/"!==l&&l.endsWith("/"),d=(o||"."===l)&&n.endsWith("/");return s.pathname.endsWith("/")||!c&&!d||(s.pathname+="/"),s}var Oi=e=>e.join("/").replace(/\/\/+/g,"/"),Ii=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Bi=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",Mi=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";var Ui=class{constructor(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Vi(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}function Ki(e){return e.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Hi="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;function Wi(e,t){let n=e;if("string"!==typeof n||!Fi.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,a=!1;if(Hi)try{let e=new URL(window.location.href),r=n.startsWith("//")?new URL(e.protocol+n):new URL(n),i=Ci(r.pathname,t);r.origin===e.origin&&null!=i?n=i+r.search+r.hash:a=!0}catch(i){si(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:a,to:n}}Symbol("Uninstrumented");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var qi=["POST","PUT","PATCH","DELETE"],Yi=(new Set(qi),["GET",...qi]);new Set(Yi),Symbol("ResetLoaderData");var Gi=r.createContext(null);Gi.displayName="DataRouter";var Qi=r.createContext(null);Qi.displayName="DataRouterState";var Ji=r.createContext(!1);function Xi(){return r.useContext(Ji)}var Zi=r.createContext({isTransitioning:!1});Zi.displayName="ViewTransition";var eo=r.createContext(new Map);eo.displayName="Fetchers";var to=r.createContext(null);to.displayName="Await";var no=r.createContext(null);no.displayName="Navigation";var ro=r.createContext(null);ro.displayName="Location";var ao=r.createContext({outlet:null,matches:[],isDataRoute:!1});ao.displayName="Route";var io=r.createContext(null);io.displayName="RouteError";var oo="REACT_ROUTER_ERROR";function lo(){return null!=r.useContext(ro)}function so(){return li(lo(),"useLocation() may be used only in the context of a <Router> component."),r.useContext(ro).location}var co="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function uo(e){r.useContext(no).static||r.useLayoutEffect(e)}function po(){let{isDataRoute:e}=r.useContext(ao);return e?function(){let{router:e}=So("useNavigate"),t=_o("useNavigate"),n=r.useRef(!1);uo(()=>{n.current=!0});let a=r.useCallback(async function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};si(n.current,co),n.current&&("number"===typeof r?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...a}))},[e,t]);return a}():function(){li(lo(),"useNavigate() may be used only in the context of a <Router> component.");let e=r.useContext(Gi),{basename:t,navigator:n}=r.useContext(no),{matches:a}=r.useContext(ao),{pathname:i}=so(),o=JSON.stringify(Ri(a)),l=r.useRef(!1);uo(()=>{l.current=!0});let s=r.useCallback(function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(si(l.current,co),!l.current)return;if("number"===typeof r)return void n.go(r);let s=Li(r,JSON.parse(o),i,"path"===a.relative);null==e&&"/"!==t&&(s.pathname="/"===s.pathname?t:Oi([t,s.pathname])),(a.replace?n.replace:n.push)(s,a.state,a)},[t,n,o,i,e]);return s}()}r.createContext(null);function ho(){let{matches:e}=r.useContext(ao),t=e[e.length-1];return t?t.params:{}}function fo(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:n}=r.useContext(ao),{pathname:a}=so(),i=JSON.stringify(Ri(n));return r.useMemo(()=>Li(e,JSON.parse(i),a,"path"===t),[e,i,a,t])}function mo(e,t,n){li(lo(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=r.useContext(no),{matches:i}=r.useContext(ao),o=i[i.length-1],l=o?o.params:{},s=o?o.pathname:"/",c=o?o.pathnameBase:"/",d=o&&o.route;{let e=d&&d.path||"";No(s,!d||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let u,p=so();if(t){let e="string"===typeof t?pi(t):t;li("/"===c||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),u=e}else u=p;let h=u.pathname||"/",f=h;if("/"!==c){let e=c.replace(/^\//,"").split("/");f="/"+h.replace(/^\//,"").split("/").slice(e.length).join("/")}let m=mi(e,{pathname:f});si(d||null!=m,`No routes matched location "${u.pathname}${u.search}${u.hash}" `),si(null==m||void 0!==m[m.length-1].route.element||void 0!==m[m.length-1].route.Component||void 0!==m[m.length-1].route.lazy,`Matched leaf route at location "${u.pathname}${u.search}${u.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let g=jo(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},l,e.params),pathname:Oi([c,a.encodeLocation?a.encodeLocation(e.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?c:Oi([c,a.encodeLocation?a.encodeLocation(e.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathnameBase])})),i,n);return t&&g?r.createElement(ro.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...u},navigationType:"POP"}},g):g}function go(){let e=Eo(),t=Vi(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},l=null;return console.error("Error handled by React Router default ErrorBoundary:",e),l=r.createElement(r.Fragment,null,r.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),r.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",r.createElement("code",{style:o},"ErrorBoundary")," or"," ",r.createElement("code",{style:o},"errorElement")," prop on your route.")),r.createElement(r.Fragment,null,r.createElement("h2",null,"Unexpected Application Error!"),r.createElement("h3",{style:{fontStyle:"italic"}},t),n?r.createElement("pre",{style:i},n):null,l)}var xo=r.createElement(go,null),vo=class extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&"object"===typeof e&&e&&"digest"in e&&"string"===typeof e.digest){const t=function(e){if(e.startsWith(`${oo}:ROUTE_ERROR_RESPONSE:{`))try{let t=JSON.parse(e.slice(40));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText)return new Ui(t.status,t.statusText,t.data)}catch{}}(e.digest);t&&(e=t)}let t=void 0!==e?r.createElement(ao.Provider,{value:this.props.routeContext},r.createElement(io.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?r.createElement(yo,{error:e},t):t}};vo.contextType=Ji;var bo=new WeakMap;function yo(e){let{children:t,error:n}=e,{basename:a}=r.useContext(no);if("object"===typeof n&&n&&"digest"in n&&"string"===typeof n.digest){let e=function(e){if(e.startsWith(`${oo}:REDIRECT:{`))try{let t=JSON.parse(e.slice(28));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText&&"string"===typeof t.location&&"boolean"===typeof t.reloadDocument&&"boolean"===typeof t.replace)return t}catch{}}(n.digest);if(e){let t=bo.get(n);if(t)throw t;let i=Wi(e.location,a);if(Hi&&!bo.get(n)){if(!i.isExternal&&!e.reloadDocument){const t=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw bo.set(n,t),t}window.location.href=i.absoluteURL||i.to}return r.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return t}function ko(e){let{routeContext:t,match:n,children:a}=e,i=r.useContext(Gi);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),r.createElement(ao.Provider,{value:t},a)}function jo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2?arguments[2]:void 0,a=n?.state;if(null==e){if(!a)return null;if(a.errors)e=a.matches;else{if(0!==t.length||a.initialized||!(a.matches.length>0))return null;e=a.matches}}let i=e,o=a?.errors;if(null!=o){let e=i.findIndex(e=>e.route.id&&void 0!==o?.[e.route.id]);li(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),i=i.slice(0,Math.min(i.length,e+1))}let l=!1,s=-1;if(n&&a){l=a.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:r}=a,o=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!r||void 0===r[t.route.id]);if(t.route.lazy||o){n.isStatic&&(l=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,d=a&&c?(e,t)=>{c(e,{location:a.location,params:a.matches?.[0]?.params??{},unstable_pattern:Ki(a.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,p=!1,h=null,f=null;a&&(u=o&&n.route.id?o[n.route.id]:void 0,h=n.route.errorElement||xo,l&&(s<0&&0===c?(No("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),p=!0,f=null):s===c&&(p=!0,f=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),g=()=>{let t;return t=u?h:p?f:n.route.Component?r.createElement(n.route.Component,null):n.route.element?n.route.element:e,r.createElement(ko,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:null!=a},children:t})};return a&&(n.route.ErrorBoundary||n.route.errorElement||0===c)?r.createElement(vo,{location:a.location,revalidation:a.revalidation,component:h,error:u,children:g(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:d}):g()},null)}function wo(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function So(e){let t=r.useContext(Gi);return li(t,wo(e)),t}function $o(e){let t=r.useContext(Qi);return li(t,wo(e)),t}function _o(e){let t=function(e){let t=r.useContext(ao);return li(t,wo(e)),t}(e),n=t.matches[t.matches.length-1];return li(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Eo(){let e=r.useContext(io),t=$o("useRouteError"),n=_o("useRouteError");return void 0!==e?e:t.errors?.[n]}var zo={};function No(e,t,n){t||zo[e]||(zo[e]=!0,si(!1,n))}var Ao={};function Co(e,t){e||Ao[t]||(Ao[t]=!0,console.warn(t))}a.useOptimistic;r.memo(Fo);function Fo(e){let{routes:t,future:n,state:r,isStatic:a,onError:i}=e;return mo(t,void 0,{state:r,isStatic:a,onError:i,future:n})}function To(e){let{to:t,replace:n,state:a,relative:i}=e;li(lo(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=r.useContext(no);si(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:l}=r.useContext(ao),{pathname:s}=so(),c=po(),d=Li(t,Ri(l),s,"path"===i),u=JSON.stringify(d);return r.useEffect(()=>{c(JSON.parse(u),{replace:n,state:a,relative:i})},[c,u,i,n,a]),null}function Po(e){li(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Do(e){let{basename:t="/",children:n=null,location:a,navigationType:i="POP",navigator:o,static:l=!1,unstable_useTransitions:s}=e;li(!lo(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let c=t.replace(/^\/*/,"/"),d=r.useMemo(()=>({basename:c,navigator:o,static:l,unstable_useTransitions:s,future:{}}),[c,o,l,s]);"string"===typeof a&&(a=pi(a));let{pathname:u="/",search:p="",hash:h="",state:f=null,key:m="default",unstable_mask:g}=a,x=r.useMemo(()=>{let e=Ci(u,c);return null==e?null:{location:{pathname:e,search:p,hash:h,state:f,key:m,unstable_mask:g},navigationType:i}},[c,u,p,h,f,m,i,g]);return si(null!=x,`<Router basename="${c}"> is not able to match the URL "${u}${p}${h}" because it does not start with the basename, so the <Router> won't render anything.`),null==x?null:r.createElement(no.Provider,{value:d},r.createElement(ro.Provider,{children:n,value:x}))}function Ro(e){let{children:t,location:n}=e;return mo(Lo(t),n)}r.Component;function Lo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[];return r.Children.forEach(e,(e,a)=>{if(!r.isValidElement(e))return;let i=[...t,a];if(e.type===r.Fragment)return void n.push.apply(n,Lo(e.props.children,i));li(e.type===Po,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),li(!e.props.index||!e.props.children,"An index route cannot have child routes.");let o={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(o.children=Lo(e.props.children,i)),n.push(o)}),n}var Oo="get",Io="application/x-www-form-urlencoded";function Bo(e){return"undefined"!==typeof HTMLElement&&e instanceof HTMLElement}function Mo(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new URLSearchParams("string"===typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}var Uo=null;var Vo=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ko(e){return null==e||Vo.has(e)?e:(si(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Io}"`),null)}function Ho(e,t){let n,r,a,i,o;if(Bo(l=e)&&"form"===l.tagName.toLowerCase()){let o=e.getAttribute("action");r=o?Ci(o,t):null,n=e.getAttribute("method")||Oo,a=Ko(e.getAttribute("enctype"))||Io,i=new FormData(e)}else if(function(e){return Bo(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Bo(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let o=e.form;if(null==o)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||o.getAttribute("action");if(r=l?Ci(l,t):null,n=e.getAttribute("formmethod")||o.getAttribute("method")||Oo,a=Ko(e.getAttribute("formenctype"))||Ko(o.getAttribute("enctype"))||Io,i=new FormData(o,e),!function(){if(null===Uo)try{new FormData(document.createElement("form"),0),Uo=!1}catch(e){Uo=!0}return Uo}()){let{name:t,type:n,value:r}=e;if("image"===n){let e=t?`${t}.`:"";i.append(`${e}x`,"0"),i.append(`${e}y`,"0")}else t&&i.append(t,r)}}else{if(Bo(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Oo,r=null,a=Io,o=e}var l;return i&&"text/plain"===a&&(o=i,i=void 0),{action:r,method:n.toLowerCase(),encType:a,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;function Wo(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}Symbol("SingleFetchRedirect");function qo(e,t,n,r){let a="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return n?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${r}`:a.pathname=`${a.pathname}.${r}`:"/"===a.pathname?a.pathname=`_root.${r}`:t&&"/"===Ci(a.pathname,t)?a.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${r}`,a}async function Yo(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Go(e){return null!=e&&"string"===typeof e.page}function Qo(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Jo(e,t,n,r,a,i){let o=(e,t)=>!n[t]||e.route.id!==n[t].route.id,l=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith("*")&&n[t].params["*"]!==e.params["*"];return"assets"===i?t.filter((e,t)=>o(e,t)||l(e,t)):"data"===i?t.filter((t,i)=>{let s=r.routes[t.route.id];if(!s||!s.hasLoader)return!1;if(o(t,i)||l(t,i))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof r)return r}return!0}):[]}function Xo(e,t){let{includeHydrateFallback:n}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r=e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let a=[r.module];return r.clientActionModule&&(a=a.concat(r.clientActionModule)),r.clientLoaderModule&&(a=a.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(a=a.concat(r.hydrateFallbackModule)),r.imports&&(a=a.concat(r.imports)),a}).flat(1),[...new Set(r)];var r}function Zo(e,t){let n=new Set,r=new Set(t);return e.reduce((e,a)=>{if(t&&!Go(a)&&"script"===a.as&&a.href&&r.has(a.href))return e;let i=JSON.stringify(function(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}(a));return n.has(i)||(n.add(i),e.push({key:i,link:a})),e},[])}function el(e,t){return"lazy"===e.mode&&!0===t}function tl(){let e=r.useContext(Gi);return Wo(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function nl(){let e=r.useContext(Qi);return Wo(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var rl=r.createContext(void 0);function al(){let e=r.useContext(rl);return Wo(e,"You must render this element inside a <HydratedRouter> element"),e}function il(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function ol(e,t,n){if(n&&!dl)return[e[0]];if(t){let n=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,n+1)}return e}rl.displayName="FrameworkContext";function ll(e){let{page:t,...n}=e,{router:a}=tl(),i=r.useMemo(()=>mi(a.routes,t,a.basename),[a.routes,t,a.basename]);return i?r.createElement(cl,{page:t,matches:i,...n}):null}function sl(e){let{manifest:t,routeModules:n}=al(),[a,i]=r.useState([]);return r.useEffect(()=>{let r=!1;return async function(e,t,n){let r=await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Yo(r,n);return e.links?e.links():[]}return[]}));return Zo(r.flat(1).filter(Qo).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),a}function cl(e){let{page:t,matches:n,...a}=e,i=so(),{future:o,manifest:l,routeModules:s}=al(),{basename:c}=tl(),{loaderData:d,matches:u}=nl(),p=r.useMemo(()=>Jo(t,n,u,l,i,"data"),[t,n,u,l,i]),h=r.useMemo(()=>Jo(t,n,u,l,i,"assets"),[t,n,u,l,i]),f=r.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let e=new Set,r=!1;if(n.forEach(t=>{let n=l.routes[t.route.id];n&&n.hasLoader&&(!p.some(e=>e.route.id===t.route.id)&&t.route.id in d&&s[t.route.id]?.shouldRevalidate||n.hasClientLoader?r=!0:e.add(t.route.id))}),0===e.size)return[];let a=qo(t,c,o.unstable_trailingSlashAwareDataRequests,"data");return r&&e.size>0&&a.searchParams.set("_routes",n.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[a.pathname+a.search]},[c,o.unstable_trailingSlashAwareDataRequests,d,i,l,p,n,t,s]),m=r.useMemo(()=>Xo(h,l),[h,l]),g=sl(h);return r.createElement(r.Fragment,null,f.map(e=>r.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...a})),m.map(e=>r.createElement("link",{key:e,rel:"modulepreload",href:e,...a})),g.map(e=>{let{key:t,link:n}=e;return r.createElement("link",{key:t,nonce:a.nonce,...n,crossOrigin:n.crossOrigin??a.crossOrigin})}))}var dl=!1;function ul(e){let{manifest:t,serverHandoffString:n,isSpaMode:a,renderMeta:i,routeDiscovery:o,ssr:l}=al(),{router:s,static:c,staticContext:d}=tl(),{matches:u}=nl(),p=Xi(),h=el(o,l);i&&(i.didRenderScripts=!0);let f=ol(u,null,a);r.useEffect(()=>{dl=!0},[]);let m=r.useMemo(()=>{if(p)return null;let a=d?`window.__reactRouterContext = ${n};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",i=c?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${h?"":`import ${JSON.stringify(t.url)}`};\n${f.map((e,n)=>{let r=`route${n}`,a=t.routes[e.route.id];Wo(a,`Route ${e.route.id} not found in manifest`);let{clientActionModule:i,clientLoaderModule:o,clientMiddlewareModule:l,hydrateFallbackModule:s,module:c}=a,d=[...i?[{module:i,varName:`${r}_clientAction`}]:[],...o?[{module:o,varName:`${r}_clientLoader`}]:[],...l?[{module:l,varName:`${r}_clientMiddleware`}]:[],...s?[{module:s,varName:`${r}_HydrateFallback`}]:[],{module:c,varName:`${r}_main`}];return 1===d.length?`import * as ${r} from ${JSON.stringify(c)};`:[d.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${r} = {${d.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${h?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:n,...r}=e,a=new Set(t.state.matches.map(e=>e.route.id)),i=t.state.location.pathname.split("/").filter(Boolean),o=["/"];for(i.pop();i.length>0;)o.push(`/${i.join("/")}`),i.pop();o.forEach(e=>{let n=mi(t.routes,e,t.basename);n&&n.forEach(e=>a.add(e.route.id))});let l=[...a].reduce((e,t)=>Object.assign(e,{[t]:r.routes[t]}),{});return{...r,routes:l,sri:!!n||void 0}}(t,s),null,2)};`:""}\n  window.__reactRouterRouteModules = {${f.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return r.createElement(r.Fragment,null,r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:a},type:void 0}),r.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:i},type:"module",async:!0}))},[]),g=dl||p?[]:(x=t.entry.imports.concat(Xo(f,t,{includeHydrateFallback:!0})),[...new Set(x)]);var x;let v="object"===typeof t.sri?t.sri:{};return Co(!p,"The <Scripts /> element is a no-op when using RSC and can be safely removed."),dl||p?null:r.createElement(r.Fragment,null,"object"===typeof t.sri?r.createElement("script",{...e,"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:v})}}):null,h?null:r.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:v[t.url],suppressHydrationWarning:!0}),r.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:v[t.entry.module],suppressHydrationWarning:!0}),g.map(t=>r.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:v[t],suppressHydrationWarning:!0})),m)}function pl(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}r.Component;function hl(e){let{error:t,isOutsideRemixApp:n}=e;console.error(t);let a,i=r.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(Vi(t))return r.createElement(fl,{title:"Unhandled Thrown Response!"},r.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),i);if(t instanceof Error)a=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);a=new Error(e)}return r.createElement(fl,{title:"Application Error!",isOutsideRemixApp:n},r.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),r.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},a.stack),i)}function fl(e){let{title:t,renderScripts:n,isOutsideRemixApp:a,children:i}=e,{routeModules:o}=al();return o.root?.Layout&&!a?i:r.createElement("html",{lang:"en"},r.createElement("head",null,r.createElement("meta",{charSet:"utf-8"}),r.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),r.createElement("title",null,t)),r.createElement("body",null,r.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},i,n?r.createElement(ul,null):null)))}var ml="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{ml&&(window.__reactRouterVersion="7.13.2")}catch(ok){}function gl(e){let{basename:t,children:n,unstable_useTransitions:a,window:i}=e,o=r.useRef();null==o.current&&(o.current=oi({window:i,v5Compat:!0}));let l=o.current,[s,c]=r.useState({action:l.action,location:l.location}),d=r.useCallback(e=>{!1===a?c(e):r.startTransition(()=>c(e))},[a]);return r.useLayoutEffect(()=>l.listen(d),[l,d]),r.createElement(Do,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:l,unstable_useTransitions:a})}var xl=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vl=r.forwardRef(function(e,t){let{onClick:n,discover:a="render",prefetch:i="none",relative:o,reloadDocument:l,replace:s,unstable_mask:c,state:d,target:u,to:p,preventScrollReset:h,viewTransition:f,unstable_defaultShouldRevalidate:m,...g}=e,{basename:x,navigator:v,unstable_useTransitions:b}=r.useContext(no),y="string"===typeof p&&xl.test(p),k=Wi(p,x);p=k.to;let j=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};li(lo(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=r.useContext(no),{hash:i,pathname:o,search:l}=fo(e,{relative:t}),s=o;return"/"!==n&&(s="/"===o?n:Oi([n,o])),a.createHref({pathname:s,search:l,hash:i})}(p,{relative:o}),w=so(),S=null;if(c){let e=Li(c,[],w.unstable_mask?w.unstable_mask.pathname:"/",!0);"/"!==x&&(e.pathname="/"===e.pathname?x:Oi([x,e.pathname])),S=v.createHref(e)}let[$,_,E]=function(e,t){let n=r.useContext(rl),[a,i]=r.useState(!1),[o,l]=r.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:d,onMouseLeave:u,onTouchStart:p}=t,h=r.useRef(null);r.useEffect(()=>{if("render"===e&&l(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{l(e.isIntersecting)})},{threshold:.5});return h.current&&e.observe(h.current),()=>{e.disconnect()}}},[e]),r.useEffect(()=>{if(a){let e=setTimeout(()=>{l(!0)},100);return()=>{clearTimeout(e)}}},[a]);let f=()=>{i(!0)},m=()=>{i(!1),l(!1)};return n?"intent"!==e?[o,h,{}]:[o,h,{onFocus:il(s,f),onBlur:il(c,m),onMouseEnter:il(d,f),onMouseLeave:il(u,m),onTouchStart:il(p,f)}]:[!1,h,{}]}(i,g),z=function(e){let{target:t,replace:n,unstable_mask:a,state:i,preventScrollReset:o,relative:l,viewTransition:s,unstable_defaultShouldRevalidate:c,unstable_useTransitions:d}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=po(),p=so(),h=fo(e,{relative:l});return r.useCallback(f=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(f,t)){f.preventDefault();let t=void 0!==n?n:ui(p)===ui(h),m=()=>u(e,{replace:t,unstable_mask:a,state:i,preventScrollReset:o,relative:l,viewTransition:s,unstable_defaultShouldRevalidate:c});d?r.startTransition(()=>m()):m()}},[p,u,h,n,a,i,t,e,o,l,s,c,d])}(p,{replace:s,unstable_mask:c,state:d,target:u,preventScrollReset:h,relative:o,viewTransition:f,unstable_defaultShouldRevalidate:m,unstable_useTransitions:b});let N=!(k.isExternal||l),A=r.createElement("a",{...g,...E,href:(N?S:void 0)||k.absoluteURL||j,onClick:N?function(e){n&&n(e),e.defaultPrevented||z(e)}:n,ref:pl(t,_),target:u,"data-discover":y||"render"!==a?void 0:"true"});return $&&!y?r.createElement(r.Fragment,null,A,r.createElement(ll,{page:j})):A});vl.displayName="Link",r.forwardRef(function(e,t){let{"aria-current":n="page",caseSensitive:a=!1,className:i="",end:o=!1,style:l,to:s,viewTransition:c,children:d,...u}=e,p=fo(s,{relative:u.relative}),h=so(),f=r.useContext(Qi),{navigator:m,basename:g}=r.useContext(no),x=null!=f&&function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.useContext(Zi);li(null!=n,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=kl("useViewTransitionState"),i=fo(e,{relative:t});if(!n.isTransitioning)return!1;let o=Ci(n.currentLocation.pathname,a)||n.currentLocation.pathname,l=Ci(n.nextLocation.pathname,a)||n.nextLocation.pathname;return null!=zi(i.pathname,l)||null!=zi(i.pathname,o)}(p)&&!0===c,v=m.encodeLocation?m.encodeLocation(p).pathname:p.pathname,b=h.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;a||(b=b.toLowerCase(),y=y?y.toLowerCase():null,v=v.toLowerCase()),y&&g&&(y=Ci(y,g)||y);const k="/"!==v&&v.endsWith("/")?v.length-1:v.length;let j,w=b===v||!o&&b.startsWith(v)&&"/"===b.charAt(k),S=null!=y&&(y===v||!o&&y.startsWith(v)&&"/"===y.charAt(v.length)),$={isActive:w,isPending:S,isTransitioning:x},_=w?n:void 0;j="function"===typeof i?i($):[i,w?"active":null,S?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let E="function"===typeof l?l($):l;return r.createElement(vl,{...u,"aria-current":_,className:j,ref:t,style:E,to:s,viewTransition:c},"function"===typeof d?d($):d)}).displayName="NavLink";var bl=r.forwardRef((e,t)=>{let{discover:n="render",fetcherKey:a,navigate:i,reloadDocument:o,replace:l,state:s,method:c=Oo,action:d,onSubmit:u,relative:p,preventScrollReset:h,viewTransition:f,unstable_defaultShouldRevalidate:m,...g}=e,{unstable_useTransitions:x}=r.useContext(no),v=$l(),b=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:n}=r.useContext(no),a=r.useContext(ao);li(a,"useFormAction must be used inside a RouteContext");let[i]=a.matches.slice(-1),o={...fo(e||".",{relative:t})},l=so();if(null==e){o.search=l.search;let e=new URLSearchParams(o.search),t=e.getAll("index"),n=t.some(e=>""===e);if(n){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let n=e.toString();o.search=n?`?${n}`:""}}e&&"."!==e||!i.route.index||(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index");"/"!==n&&(o.pathname="/"===o.pathname?n:Oi([n,o.pathname]));return ui(o)}(d,{relative:p}),y="get"===c.toLowerCase()?"get":"post",k="string"===typeof d&&xl.test(d);return r.createElement("form",{ref:t,method:y,action:b,onSubmit:o?u:e=>{if(u&&u(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,n=t?.getAttribute("formmethod")||c,o=()=>v(t||e.currentTarget,{fetcherKey:a,method:n,navigate:i,replace:l,state:s,relative:p,preventScrollReset:h,viewTransition:f,unstable_defaultShouldRevalidate:m});x&&!1!==i?r.startTransition(()=>o()):o()},...g,"data-discover":k||"render"!==n?void 0:"true"})});function yl(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function kl(e){let t=r.useContext(Gi);return li(t,yl(e)),t}function jl(e){si("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=r.useRef(Mo(e)),n=r.useRef(!1),a=so(),i=r.useMemo(()=>function(e,t){let n=Mo(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}(a.search,n.current?null:t.current),[a.search]),o=po(),l=r.useCallback((e,t)=>{const r=Mo("function"===typeof e?e(new URLSearchParams(i)):e);n.current=!0,o("?"+r,t)},[o,i]);return[i,l]}bl.displayName="Form";var wl=0,Sl=()=>`__${String(++wl)}__`;function $l(){let{router:e}=kl("useSubmit"),{basename:t}=r.useContext(no),n=_o("useRouteId"),a=e.fetch,i=e.navigate;return r.useCallback(async function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:o,method:l,encType:s,formData:c,body:d}=Ho(e,t);if(!1===r.navigate){let e=r.fetcherKey||Sl();await a(e,n,r.action||o,{unstable_defaultShouldRevalidate:r.unstable_defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:c,body:d,formMethod:r.method||l,formEncType:r.encType||s,flushSync:r.flushSync})}else await i(r.action||o,{unstable_defaultShouldRevalidate:r.unstable_defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:c,body:d,formMethod:r.method||l,formEncType:r.encType||s,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[a,i,t,n])}var _l=function(){return _l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},_l.apply(this,arguments)};Object.create;function El(e,t,n){if(n||2===arguments.length)for(var r,a=0,i=t.length;a<i;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var zl={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Nl="-ms-",Al="-moz-",Cl="-webkit-",Fl="comm",Tl="rule",Pl="decl",Dl="@keyframes",Rl=Math.abs,Ll=String.fromCharCode,Ol=Object.assign;function Il(e){return e.trim()}function Bl(e,t){return(e=t.exec(e))?e[0]:e}function Ml(e,t,n){return e.replace(t,n)}function Ul(e,t,n){return e.indexOf(t,n)}function Vl(e,t){return 0|e.charCodeAt(t)}function Kl(e,t,n){return e.slice(t,n)}function Hl(e){return e.length}function Wl(e){return e.length}function ql(e,t){return t.push(e),e}function Yl(e,t){return e.filter(function(e){return!Bl(e,t)})}var Gl=1,Ql=1,Jl=0,Xl=0,Zl=0,es="";function ts(e,t,n,r,a,i,o,l){return{value:e,root:t,parent:n,type:r,props:a,children:i,line:Gl,column:Ql,length:o,return:"",siblings:l}}function ns(e,t){return Ol(ts("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function rs(e){for(;e.root;)e=ns(e.root,{children:[e]});ql(e,e.siblings)}function as(){return Zl=Xl>0?Vl(es,--Xl):0,Ql--,10===Zl&&(Ql=1,Gl--),Zl}function is(){return Zl=Xl<Jl?Vl(es,Xl++):0,Ql++,10===Zl&&(Ql=1,Gl++),Zl}function os(){return Vl(es,Xl)}function ls(){return Xl}function ss(e,t){return Kl(es,e,t)}function cs(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ds(e){return Gl=Ql=1,Jl=Hl(es=e),Xl=0,[]}function us(e){return es="",e}function ps(e){return Il(ss(Xl-1,ms(91===e?e+2:40===e?e+1:e)))}function hs(e){for(;(Zl=os())&&Zl<33;)is();return cs(e)>2||cs(Zl)>3?"":" "}function fs(e,t){for(;--t&&is()&&!(Zl<48||Zl>102||Zl>57&&Zl<65||Zl>70&&Zl<97););return ss(e,ls()+(t<6&&32==os()&&32==is()))}function ms(e){for(;is();)switch(Zl){case e:return Xl;case 34:case 39:34!==e&&39!==e&&ms(Zl);break;case 40:41===e&&ms(e);break;case 92:is()}return Xl}function gs(e,t){for(;is()&&e+Zl!==57&&(e+Zl!==84||47!==os()););return"/*"+ss(t,Xl-1)+"*"+Ll(47===e?e:is())}function xs(e){for(;!cs(os());)is();return ss(e,Xl)}function vs(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function bs(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case"@namespace":case Pl:return e.return=e.return||e.value;case Fl:return"";case Dl:return e.return=e.value+"{"+vs(e.children,r)+"}";case Tl:if(!Hl(e.value=e.props.join(",")))return""}return Hl(n=vs(e.children,r))?e.return=e.value+"{"+n+"}":""}function ys(e,t,n){switch(function(e,t){return 45^Vl(e,0)?(((t<<2^Vl(e,0))<<2^Vl(e,1))<<2^Vl(e,2))<<2^Vl(e,3):0}(e,t)){case 5103:return Cl+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Cl+e+e;case 4855:return Cl+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return Al+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Cl+e+Al+e+Nl+e+e;case 5936:switch(Vl(e,t+11)){case 114:return Cl+e+Nl+Ml(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Cl+e+Nl+Ml(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Cl+e+Nl+Ml(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Cl+e+Nl+e+e;case 6165:return Cl+e+Nl+"flex-"+e+e;case 5187:return Cl+e+Ml(e,/(\w+).+(:[^]+)/,Cl+"box-$1$2"+Nl+"flex-$1$2")+e;case 5443:return Cl+e+Nl+"flex-item-"+Ml(e,/flex-|-self/g,"")+(Bl(e,/flex-|baseline/)?"":Nl+"grid-row-"+Ml(e,/flex-|-self/g,""))+e;case 4675:return Cl+e+Nl+"flex-line-pack"+Ml(e,/align-content|flex-|-self/g,"")+e;case 5548:return Cl+e+Nl+Ml(e,"shrink","negative")+e;case 5292:return Cl+e+Nl+Ml(e,"basis","preferred-size")+e;case 6060:return Cl+"box-"+Ml(e,"-grow","")+Cl+e+Nl+Ml(e,"grow","positive")+e;case 4554:return Cl+Ml(e,/([^-])(transform)/g,"$1"+Cl+"$2")+e;case 6187:return Ml(Ml(Ml(e,/(zoom-|grab)/,Cl+"$1"),/(image-set)/,Cl+"$1"),e,"")+e;case 5495:case 3959:return Ml(e,/(image-set\([^]*)/,Cl+"$1$`$1");case 4968:return Ml(Ml(e,/(.+:)(flex-)?(.*)/,Cl+"box-pack:$3"+Nl+"flex-pack:$3"),/space-between/,"justify")+Cl+e+e;case 4200:if(!Bl(e,/flex-|baseline/))return Nl+"grid-column-align"+Kl(e,t)+e;break;case 2592:case 3360:return Nl+Ml(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Bl(e.props,/grid-\w+-end/)})?~Ul(e+(n=n[t].value),"span",0)?e:Nl+Ml(e,"-start","")+e+Nl+"grid-row-span:"+(~Ul(n,"span",0)?Bl(n,/\d+/):+Bl(n,/\d+/)-+Bl(e,/\d+/))+";":Nl+Ml(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return Bl(e.props,/grid-\w+-start/)})?e:Nl+Ml(Ml(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ml(e,/(.+)-inline(.+)/,Cl+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Hl(e)-1-t>6)switch(Vl(e,t+1)){case 109:if(45!==Vl(e,t+4))break;case 102:return Ml(e,/(.+:)(.+)-([^]+)/,"$1"+Cl+"$2-$3$1"+Al+(108==Vl(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Ul(e,"stretch",0)?ys(Ml(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return Ml(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,a,i,o,l){return Nl+n+":"+r+l+(a?Nl+n+"-span:"+(i?o:+o-+r)+l:"")+e});case 4949:if(121===Vl(e,t+6))return Ml(e,":",":"+Cl)+e;break;case 6444:switch(Vl(e,45===Vl(e,14)?18:11)){case 120:return Ml(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Cl+(45===Vl(e,14)?"inline-":"")+"box$3$1"+Cl+"$2$3$1"+Nl+"$2box$3")+e;case 100:return Ml(e,":",":"+Nl)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ml(e,"scroll-","scroll-snap-")+e}return e}function ks(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Pl:return void(e.return=ys(e.value,e.length,n));case Dl:return vs([ns(e,{value:Ml(e.value,"@","@"+Cl)})],r);case Tl:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(Bl(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":rs(ns(e,{props:[Ml(t,/:(read-\w+)/,":-moz-$1")]})),rs(ns(e,{props:[t]})),Ol(e,{props:Yl(n,r)});break;case"::placeholder":rs(ns(e,{props:[Ml(t,/:(plac\w+)/,":"+Cl+"input-$1")]})),rs(ns(e,{props:[Ml(t,/:(plac\w+)/,":-moz-$1")]})),rs(ns(e,{props:[Ml(t,/:(plac\w+)/,Nl+"input-$1")]})),rs(ns(e,{props:[t]})),Ol(e,{props:Yl(n,r)})}return""})}}function js(e){return us(ws("",null,null,null,[""],e=ds(e),0,[0],e))}function ws(e,t,n,r,a,i,o,l,s){for(var c=0,d=0,u=o,p=0,h=0,f=0,m=1,g=1,x=1,v=0,b="",y=a,k=i,j=r,w=b;g;)switch(f=v,v=is()){case 40:if(108!=f&&58==Vl(w,u-1)){-1!=Ul(w+=Ml(ps(v),"&","&\f"),"&\f",Rl(c?l[c-1]:0))&&(x=-1);break}case 34:case 39:case 91:w+=ps(v);break;case 9:case 10:case 13:case 32:w+=hs(f);break;case 92:w+=fs(ls()-1,7);continue;case 47:switch(os()){case 42:case 47:ql($s(gs(is(),ls()),t,n,s),s),5!=cs(f||1)&&5!=cs(os()||1)||!Hl(w)||" "===Kl(w,-1,void 0)||(w+=" ");break;default:w+="/"}break;case 123*m:l[c++]=Hl(w)*x;case 125*m:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+d:-1==x&&(w=Ml(w,/\f/g,"")),h>0&&(Hl(w)-u||0===m&&47===f)&&ql(h>32?_s(w+";",r,n,u-1,s):_s(Ml(w," ","")+";",r,n,u-2,s),s);break;case 59:w+=";";default:if(ql(j=Ss(w,t,n,c,d,a,l,b,y=[],k=[],u,i),i),123===v)if(0===d)ws(w,t,j,j,y,i,u,l,k);else{switch(p){case 99:if(110===Vl(w,3))break;case 108:if(97===Vl(w,2))break;default:d=0;case 100:case 109:case 115:}d?ws(e,j,j,r&&ql(Ss(e,j,j,0,0,a,l,b,a,y=[],u,k),k),a,k,u,l,r?y:k):ws(w,j,j,j,[""],k,0,l,k)}}c=d=h=0,m=x=1,b=w="",u=o;break;case 58:u=1+Hl(w),h=f;default:if(m<1)if(123==v)--m;else if(125==v&&0==m++&&125==as())continue;switch(w+=Ll(v),v*m){case 38:x=d>0?1:(w+="\f",-1);break;case 44:l[c++]=(Hl(w)-1)*x,x=1;break;case 64:45===os()&&(w+=ps(is())),p=os(),d=u=Hl(b=w+=xs(ls())),v++;break;case 45:45===f&&2==Hl(w)&&(m=0)}}return i}function Ss(e,t,n,r,a,i,o,l,s,c,d,u){for(var p=a-1,h=0===a?i:[""],f=Wl(h),m=0,g=0,x=0;m<r;++m)for(var v=0,b=Kl(e,p+1,p=Rl(g=o[m])),y=e;v<f;++v)(y=Il(g>0?h[v]+" "+b:Ml(b,/&\f/g,h[v])))&&(s[x++]=y);return ts(e,t,n,0===a?Tl:l,s,c,d,u)}function $s(e,t,n,r){return ts(e,t,n,Fl,Ll(Zl),Kl(e,2,-2),0,r)}function _s(e,t,n,r,a){return ts(e,t,n,Pl,Kl(e,0,r),Kl(e,r+1,-1),r,a)}var Es="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",zs="active",Ns="data-styled-version",As="6.3.12",Cs="/*!sc*/\n",Fs="undefined"!=typeof window&&"undefined"!=typeof document,Ts=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),Ps={};function Ds(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Rs=new Map,Ls=new Map,Os=1,Is=function(e){if(Rs.has(e))return Rs.get(e);for(;Ls.has(Os);)Os++;var t=Os++;return Rs.set(e,t),Ls.set(t,e),t},Bs=function(e,t){Os=t+1,Rs.set(e,t),Ls.set(t,e)},Ms=(new Set,Object.freeze([])),Us=Object.freeze({});function Vs(e,t,n){return void 0===n&&(n=Us),e.theme!==n.theme&&e.theme||t||n.theme}var Ks=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),Hs=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ws=/(^-|-$)/g;function qs(e){return e.replace(Hs,"-").replace(Ws,"")}var Ys=/(a)(d)/gi,Gs=function(e){return String.fromCharCode(e+(e>25?39:97))};function Qs(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Gs(t%52)+n;return(Gs(t%52)+n).replace(Ys,"$1-$2")}var Js,Xs=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Zs=function(e){return Xs(5381,e)};function ec(e){return Qs(Zs(e)>>>0)}function tc(e){return e.displayName||e.name||"Component"}function nc(e){return"string"==typeof e&&!0}var rc="function"==typeof Symbol&&Symbol.for,ac=rc?Symbol.for("react.memo"):60115,ic=rc?Symbol.for("react.forward_ref"):60112,oc={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},lc={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},sc={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},cc=((Js={})[ic]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Js[ac]=sc,Js);function dc(e){return("type"in(t=e)&&t.type.$$typeof)===ac?sc:"$$typeof"in e?cc[e.$$typeof]:oc;var t}var uc=Object.defineProperty,pc=Object.getOwnPropertyNames,hc=Object.getOwnPropertySymbols,fc=Object.getOwnPropertyDescriptor,mc=Object.getPrototypeOf,gc=Object.prototype;function xc(e,t,n){if("string"!=typeof t){if(gc){var r=mc(t);r&&r!==gc&&xc(e,r,n)}var a=pc(t);hc&&(a=a.concat(hc(t)));for(var i=dc(e),o=dc(t),l=0;l<a.length;++l){var s=a[l];if(!(s in lc||n&&n[s]||o&&s in o||i&&s in i)){var c=fc(t,s);try{uc(e,s,c)}catch(e){}}}}return e}function vc(e){return"function"==typeof e}function bc(e){return"object"==typeof e&&"styledComponentId"in e}function yc(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function kc(e,t){return e.join(t||"")}function jc(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function wc(e,t,n){if(void 0===n&&(n=!1),!n&&!jc(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=wc(e[r],t[r]);else if(jc(t))for(var r in t)e[r]=wc(e[r],t[r]);return e}function Sc(e,t){Object.defineProperty(e,"toString",{value:t})}var $c=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,a=r;e>=a;)if((a<<=1)<0)throw Ds(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var i=r;i<a;i++)this.groupSizes[i]=0}for(var o=this.indexOfGroup(e+1),l=0,s=(i=0,t.length);i<s;i++)this.tag.insertRule(o,t[i])&&(this.groupSizes[e]++,o++,l++);l>0&&this._cGroup>e&&(this._cIndex+=l)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var a=n;a<r;a++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),a=r+n,i=r;i<a;i++)t+=this.tag.getRule(i)+Cs;return t},e}(),_c="style[".concat(Es,"][").concat(Ns,'="').concat(As,'"]'),Ec=new RegExp("^".concat(Es,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),zc=function(e){return"undefined"!=typeof ShadowRoot&&e instanceof ShadowRoot||"host"in e&&11===e.nodeType},Nc=function(e){if(!e)return document;if(zc(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(zc(t))return t}return document},Ac=function(e,t,n){for(var r,a=n.split(","),i=0,o=a.length;i<o;i++)(r=a[i])&&e.registerName(t,r)},Cc=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(Cs),a=[],i=0,o=r.length;i<o;i++){var l=r[i].trim();if(l){var s=l.match(Ec);if(s){var c=0|parseInt(s[1],10),d=s[2];0!==c&&(Bs(d,c),Ac(e,d,s[3]),e.getTag().insertRules(c,a)),a.length=0}else a.push(l)}}},Fc=function(e){for(var t=Nc(e.options.target).querySelectorAll(_c),n=0,r=t.length;n<r;n++){var a=t[n];a&&a.getAttribute(Es)!==zs&&(Cc(e,a),a.parentNode&&a.parentNode.removeChild(a))}};function Tc(){return n.nc}var Pc=function(e){var t=document.head,n=e||t,r=document.createElement("style"),a=function(e){var t=Array.from(e.querySelectorAll("style[".concat(Es,"]")));return t[t.length-1]}(n),i=void 0!==a?a.nextSibling:null;r.setAttribute(Es,zs),r.setAttribute(Ns,As);var o=Tc();return o&&r.setAttribute("nonce",o),n.insertBefore(r,i),r},Dc=function(){function e(e){this.element=Pc(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){var t;if(e.sheet)return e.sheet;for(var n=null!==(t=e.getRootNode().styleSheets)&&void 0!==t?t:document.styleSheets,r=0,a=n.length;r<a;r++){var i=n[r];if(i.ownerNode===e)return i}throw Ds(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Rc=function(){function e(e){this.element=Pc(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Lc=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Oc=Fs,Ic={isServer:!Fs,useCSSOMInjection:!Ts},Bc=function(){function e(e,t,n){void 0===e&&(e=Us),void 0===t&&(t={});var r=this;this.options=_l(_l({},Ic),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Fs&&Oc&&(Oc=!1,Fc(this)),Sc(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",a=function(n){var a=function(e){return Ls.get(e)}(n);if(void 0===a)return"continue";var i=e.names.get(a);if(void 0===i||!i.size)return"continue";var o=t.getGroup(n);if(0===o.length)return"continue";var l=Es+".g"+n+'[id="'+a+'"]',s="";i.forEach(function(e){e.length>0&&(s+=e+",")}),r+=o+l+'{content:"'+s+'"}'+Cs},i=0;i<n;i++)a(i);return r}(r)})}return e.registerId=function(e){return Is(e)},e.prototype.rehydrate=function(){!this.server&&Fs&&Fc(this)},e.prototype.reconstructWithOptions=function(t,n){void 0===n&&(n=!0);var r=new e(_l(_l({},this.options),t),this.gs,n&&this.names||void 0);return!this.server&&Fs&&t.target!==this.options.target&&Nc(this.options.target)!==Nc(t.target)&&Fc(r),r},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Lc(n):t?new Dc(n):new Rc(n)}(this.options),new $c(e)));var e},e.prototype.hasNameForId=function(e,t){var n,r;return null!==(r=null===(n=this.names.get(e))||void 0===n?void 0:n.has(t))&&void 0!==r&&r},e.prototype.registerName=function(e,t){Is(e);var n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Is(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Is(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function Mc(e,t){return null==t||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||e in zl||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Uc=function(e){return e>="A"&&e<="Z"};function Vc(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;Uc(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Kc=Symbol.for("sc-keyframes");var Hc=function(e){return null==e||!1===e||""===e},Wc=function(e){var t=[];for(var n in e){var r=e[n];e.hasOwnProperty(n)&&!Hc(r)&&(Array.isArray(r)&&r.isCss||vc(r)?t.push("".concat(Vc(n),":"),r,";"):jc(r)?t.push.apply(t,El(El(["".concat(n," {")],Wc(r),!1),["}"],!1)):t.push("".concat(Vc(n),": ").concat(Mc(n,r),";")))}return t};function qc(e,t,n,r,a){if(void 0===a&&(a=[]),"string"==typeof e)return e&&a.push(e),a;if(Hc(e))return a;if(bc(e))return a.push(".".concat(e.styledComponentId)),a;var i;if(vc(e))return!vc(i=e)||i.prototype&&i.prototype.isReactComponent||!t?(a.push(e),a):qc(e(t),t,n,r,a);if(function(e){return"object"==typeof e&&null!==e&&Kc in e}(e))return n?(e.inject(n,r),a.push(e.getName(r))):a.push(e),a;if(jc(e)){for(var o=Wc(e),l=0;l<o.length;l++)a.push(o[l]);return a}if(!Array.isArray(e))return a.push(e.toString()),a;for(l=0;l<e.length;l++)qc(e[l],t,n,r,a);return a}function Yc(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(vc(n)&&!bc(n))return!1}return!0}var Gc=Zs(As),Qc=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&Yc(e),this.componentId=t,this.baseHash=Xs(Gc,t),this.baseStyle=n,Bc.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n).className:"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=yc(r,this.staticRulesId);else{var a=kc(qc(this.rules,e,t,n)),i=Qs(Xs(this.baseHash,a)>>>0);if(!t.hasNameForId(this.componentId,i)){var o=n(a,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,o)}r=yc(r,i),this.staticRulesId=i}else{for(var l=Xs(this.baseHash,n.hash),s="",c=0;c<this.rules.length;c++){var d=this.rules[c];if("string"==typeof d)s+=d;else if(d){var u=kc(qc(d,e,t,n));l=Xs(Xs(l,String(c)),u),s+=u}}if(s){var p=Qs(l>>>0);if(!t.hasNameForId(this.componentId,p)){var h=n(s,".".concat(p),void 0,this.componentId);t.insertRules(this.componentId,p,h)}r=yc(r,p)}}return{className:r,css:"undefined"==typeof window?t.getTag().getGroup(Is(this.componentId)):""}},e}(),Jc=/&/g,Xc=47,Zc=42;function ed(e){if(-1===e.indexOf("}"))return!1;for(var t=e.length,n=0,r=0,a=!1,i=0;i<t;i++){var o=e.charCodeAt(i);if(0!==r||a||o!==Xc||e.charCodeAt(i+1)!==Zc)if(a)o===Zc&&e.charCodeAt(i+1)===Xc&&(a=!1,i++);else if(34!==o&&39!==o||0!==i&&92===e.charCodeAt(i-1)){if(0===r)if(123===o)n++;else if(125===o&&--n<0)return!0}else 0===r?r=o:r===o&&(r=0);else a=!0,i++}return 0!==n||0!==r}function td(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=td(e.children,t)),e})}function nd(e){var t,n,r,a=void 0===e?Us:e,i=a.options,o=void 0===i?Us:i,l=a.plugins,s=void 0===l?Ms:l,c=function(e,r,a){return a.startsWith(n)&&a.endsWith(n)&&a.replaceAll(n,"").length>0?".".concat(t):e},d=s.slice();d.push(function(e){e.type===Tl&&e.value.includes("&")&&(r||(r=new RegExp("\\".concat(n,"\\b"),"g")),e.props[0]=e.props[0].replace(Jc,n).replace(r,c))}),o.prefix&&d.push(ks),d.push(bs);var u,p=[],h=function(e){var t=Wl(e);return function(n,r,a,i){for(var o="",l=0;l<t;l++)o+=e[l](n,r,a,i)||"";return o}}(d.concat((u=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&u(e)}))),f=function(e,a,i,l){void 0===a&&(a=""),void 0===i&&(i=""),void 0===l&&(l="&"),t=l,n=a,r=void 0;var s=function(e){if(!ed(e))return e;for(var t=e.length,n="",r=0,a=0,i=0,o=!1,l=0;l<t;l++){var s=e.charCodeAt(l);if(0!==i||o||s!==Xc||e.charCodeAt(l+1)!==Zc)if(o)s===Zc&&e.charCodeAt(l+1)===Xc&&(o=!1,l++);else if(34!==s&&39!==s||0!==l&&92===e.charCodeAt(l-1)){if(0===i)if(123===s)a++;else if(125===s){if(--a<0){for(var c=l+1;c<t;){var d=e.charCodeAt(c);if(59===d||10===d)break;c++}c<t&&59===e.charCodeAt(c)&&c++,a=0,l=c-1,r=c;continue}0===a&&(n+=e.substring(r,l+1),r=l+1)}else 59===s&&0===a&&(n+=e.substring(r,l+1),r=l+1)}else 0===i?i=s:i===s&&(i=0);else o=!0,l++}if(r<t){var u=e.substring(r);ed(u)||(n+=u)}return n}(function(e){if(-1===e.indexOf("//"))return e;for(var t=e.length,n=[],r=0,a=0,i=0,o=0;a<t;){var l=e.charCodeAt(a);if(34!==l&&39!==l||0!==a&&92===e.charCodeAt(a-1))if(0===i)if(l===Xc&&a+1<t&&e.charCodeAt(a+1)===Zc){for(a+=2;a+1<t&&(e.charCodeAt(a)!==Zc||e.charCodeAt(a+1)!==Xc);)a++;a+=2}else if(40===l&&a>=3&&108==(32|e.charCodeAt(a-1))&&114==(32|e.charCodeAt(a-2))&&117==(32|e.charCodeAt(a-3)))o=1,a++;else if(o>0)41===l?o--:40===l&&o++,a++;else if(l===Zc&&a+1<t&&e.charCodeAt(a+1)===Xc)a>r&&n.push(e.substring(r,a)),r=a+=2;else if(l===Xc&&a+1<t&&e.charCodeAt(a+1)===Xc){for(a>r&&n.push(e.substring(r,a));a<t&&10!==e.charCodeAt(a);)a++;r=a}else a++;else a++;else 0===i?i=l:i===l&&(i=0),a++}return 0===r?e:(r<t&&n.push(e.substring(r)),n.join(""))}(e)),c=js(i||a?"".concat(i," ").concat(a," { ").concat(s," }"):s);return o.namespace&&(c=td(c,o.namespace)),p=[],vs(c,h),p};return f.hash=s.length?s.reduce(function(e,t){return t.name||Ds(15),Xs(e,t.name)},5381).toString():"",f}var rd=new Bc,ad=nd(),id=r.createContext({shouldForwardProp:void 0,styleSheet:rd,stylis:ad}),od=(id.Consumer,r.createContext(void 0));function ld(){return r.useContext(id)}function sd(e){if(!r.useMemo)return e.children;var t=ld().styleSheet,n=r.useMemo(function(){var n=t;return e.sheet?n=e.sheet:e.target&&(n=n.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(n=n.reconstructWithOptions({useCSSOMInjection:!1})),n},[e.disableCSSOMInjection,e.sheet,e.target,t]),a=r.useMemo(function(){return nd({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),i=r.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:n,stylis:a}},[e.shouldForwardProp,n,a]);return r.createElement(id.Provider,{value:i},r.createElement(od.Provider,{value:a},e.children))}var cd=r.createContext(void 0);cd.Consumer;function dd(e){var t=r.useContext(cd),n=r.useMemo(function(){return function(e,t){if(!e)throw Ds(14);if(vc(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw Ds(8);return t?_l(_l({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?r.createElement(cd.Provider,{value:n},e.children):null}var ud={};new Set;function pd(e,t,n){var a=bc(e),i=e,o=!nc(e),l=t.attrs,s=void 0===l?Ms:l,c=t.componentId,d=void 0===c?function(e,t){var n="string"!=typeof e?"sc":qs(e);ud[n]=(ud[n]||0)+1;var r="".concat(n,"-").concat(ec(As+n+ud[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):c,u=t.displayName,p=void 0===u?function(e){return nc(e)?"styled.".concat(e):"Styled(".concat(tc(e),")")}(e):u,h=t.displayName&&t.componentId?"".concat(qs(t.displayName),"-").concat(t.componentId):t.componentId||d,f=a&&i.attrs?i.attrs.concat(s).filter(Boolean):s,m=t.shouldForwardProp;if(a&&i.shouldForwardProp){var g=i.shouldForwardProp;if(t.shouldForwardProp){var x=t.shouldForwardProp;m=function(e,t){return g(e,t)&&x(e,t)}}else m=g}var v=new Qc(n,h,a?i.componentStyle:void 0);function b(e,t){return function(e,t,n){var a=e.attrs,i=e.componentStyle,o=e.defaultProps,l=e.foldedComponentIds,s=e.styledComponentId,c=e.target,d=r.useContext(cd),u=ld(),p=e.shouldForwardProp||u.shouldForwardProp,h=Vs(t,d,o)||Us,f=function(e,t,n){for(var r,a=_l(_l({},t),{className:void 0,theme:n}),i=0;i<e.length;i+=1){var o=vc(r=e[i])?r(a):r;for(var l in o)"className"===l?a.className=yc(a.className,o[l]):"style"===l?a.style=_l(_l({},a.style),o[l]):l in t&&void 0===t[l]||(a[l]=o[l])}return"className"in t&&"string"==typeof t.className&&(a.className=yc(a.className,t.className)),a}(a,t,h),m=f.as||c,g={};for(var x in f)void 0===f[x]||"$"===x[0]||"as"===x||"theme"===x&&f.theme===h||("forwardedAs"===x?g.as=f.forwardedAs:p&&!p(x,m)||(g[x]=f[x]));var v=function(e,t){var n=ld();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(i,f),b=v.className,y=yc(l,s);return b&&(y+=" "+b),f.className&&(y+=" "+f.className),g[nc(m)&&!Ks.has(m)?"class":"className"]=y,n&&(g.ref=n),(0,r.createElement)(m,g)}(y,e,t)}b.displayName=p;var y=r.forwardRef(b);return y.attrs=f,y.componentStyle=v,y.displayName=p,y.shouldForwardProp=m,y.foldedComponentIds=a?yc(i.foldedComponentIds,i.styledComponentId):"",y.styledComponentId=h,y.target=a?i.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,a=t;r<a.length;r++)wc(e,a[r],!0);return e}({},i.defaultProps,e):e}}),Sc(y,function(){return".".concat(y.styledComponentId)}),o&&xc(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function hd(e,t){for(var n=[e[0]],r=0,a=t.length;r<a;r+=1)n.push(t[r],e[r+1]);return n}var fd=function(e){return Object.assign(e,{isCss:!0})};function md(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(vc(e)||jc(e))return fd(qc(hd(Ms,El([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?qc(r):fd(qc(hd(r,t)))}function gd(e,t,n){if(void 0===n&&(n=Us),!t)throw Ds(1,t);var r=function(r){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,md.apply(void 0,El([r],a,!1)))};return r.attrs=function(r){return gd(e,t,_l(_l({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return gd(e,t,_l(_l({},n),r))},r}var xd=function(e){return gd(pd,e)},vd=xd;Ks.forEach(function(e){vd[e]=xd(e)});var bd,yd=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Yc(e),Bc.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var a=r(kc(qc(this.rules,t,n,r)),""),i=this.componentId+e;n.insertRules(i,i,a)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&Bc.registerId(this.componentId+e);var a=this.componentId+e;this.isStatic?n.hasNameForId(a,a)||this.createStyles(e,t,n,r):(this.removeStyles(e,n),this.createStyles(e,t,n,r))},e}();var kd=function(){function e(e,t){var n=this;this[bd]=!0,this.inject=function(e,t){void 0===t&&(t=ad);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Sc(this,function(){throw Ds(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=ad),this.name+e.hash},e}();function jd(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=kc(md.apply(void 0,El([e],t,!1))),a=ec(r);return new kd(a,r)}bd=Kc;(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=Tc(),r=kc([n&&'nonce="'.concat(n,'"'),"".concat(Es,'="true"'),"".concat(Ns,'="').concat(As,'"')].filter(Boolean)," ");return"<style ".concat(r,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Ds(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Ds(2);var n=e.instance.toString();if(!n)return[];var a=((t={})[Es]="",t[Ns]=As,t.dangerouslySetInnerHTML={__html:n},t),i=Tc();return i&&(a.nonce=i),[r.createElement("style",_l({},a,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Bc({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Ds(2);return r.createElement(sd,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Ds(3)}})(),"__sc-".concat(Es,"__");const wd={color:{bg:"#F1F6F3",surface:"#FFFFFF",surfaceAlt:"#E5EFEA",surfaceSunken:"#D8E6E0",ink:"#0E1A17",inkSoft:"#1F2E2A",muted:"#3F4B47",mutedSoft:"#5C6E68",border:"#D5E2DC",borderStrong:"#BACBC2",brand:"#1B7A6E",brandLight:"#4FBFB3",brandSoft:"#DCEEEA",brandInk:"#0E4F47",brandGradient:"linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)",brandGradientHover:"linear-gradient(135deg, #4FC9BD 0%, #155F58 100%)",accent:"#4FBFB3",accentSoft:"#E0F1ED",success:"#1B7A6E",successSoft:"#DCEEEA",danger:"#9F3B22",dangerSoft:"#F4DAD0",warning:"#A8761A",warningSoft:"#F3E5C7"},dossier:{bg:"#050B09",bgRaised:"#0B1612",surface:"#EDF3F0",card:"#FFFFFF",teal:"#2BC4AC",tealBright:"#5DD6CA",tealDeep:"#178A7B",inkOnDark:"#F2F8F6",mutedOnDark:"rgba(255,255,255,0.55)",faintOnDark:"rgba(255,255,255,0.38)",hairlineOnDark:"rgba(255,255,255,0.10)",metallicText:"linear-gradient(180deg, #FFFFFF 24%, #D9EFEA 58%, #9FD9CE 100%)",numberGradient:"linear-gradient(135deg, #7BEADB 0%, #2BC4AC 52%, #179580 100%)",keyline:"linear-gradient(90deg, transparent 0%, #2BC4AC 35%, #5DD6CA 50%, #2BC4AC 65%, transparent 100%)",aurora:"radial-gradient(ellipse 680px 400px at 50% 42%, rgba(43,196,172,0.15) 0%, transparent 62%),\n      radial-gradient(ellipse 520px 300px at 30% 96%, rgba(27,110,102,0.14) 0%, transparent 70%),\n      radial-gradient(ellipse 440px 260px at 72% 4%, rgba(93,214,202,0.06) 0%, transparent 70%)",glow:"0 0 0 4px rgba(93,214,202,0.18), 0 0 18px rgba(93,214,202,0.55)",ctaShadow:"0 18px 56px rgba(29,176,154,0.38), inset 0 1px 0 rgba(255,255,255,0.22)",ctaGradient:"linear-gradient(140deg, #4ECDC4 0%, #1DB09A 52%, #178A7B 100%)",column:"580px"},font:{display:"'Playfair Display', Georgia, 'Times New Roman', serif",sans:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",mono:"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"},size:{radius:{sm:"6px",md:"12px",lg:"20px",xl:"28px",pill:"999px"},space:{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px",9:"96px",10:"128px"},container:"1180px",containerNarrow:"960px"},shadow:{xs:"0 1px 2px rgba(14, 26, 23, 0.04)",sm:"0 2px 8px rgba(14, 26, 23, 0.06)",md:"0 8px 24px rgba(14, 26, 23, 0.08)",lg:"0 24px 60px rgba(14, 26, 23, 0.12)",brand:"0 12px 32px rgba(27, 122, 110, 0.28)",inset:"inset 0 1px 0 rgba(255, 255, 255, 0.6)"},motion:{fast:"160ms cubic-bezier(0.2, 0, 0, 1)",base:"240ms cubic-bezier(0.2, 0, 0, 1)",slow:"420ms cubic-bezier(0.2, 0, 0, 1)",spring:"520ms cubic-bezier(0.34, 1.56, 0.64, 1)"},z:{base:1,nav:50,overlay:80,modal:100}},Sd=(function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var a=md.apply(void 0,El([e],t,!1)),i="sc-global-".concat(ec(JSON.stringify(a))),o=new yd(a,i),l=new WeakMap,s=function(e){var t=ld(),n=r.useContext(cd),a=l.get(t.styleSheet);return void 0===a&&(a=t.styleSheet.allocateGSInstance(i),l.set(t.styleSheet,a)),r.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,n,r,a){if(o.isStatic)o.renderStyles(e,Ps,n,a);else{var i=_l(_l({},t),{theme:Vs(t,r,s.defaultProps)});o.renderStyles(e,i,n,a)}}(a,e,t.styleSheet,n,t.stylis),function(){o.removeStyles(a,t.styleSheet)}},[a,e,t.styleSheet,n,t.stylis]),null};return r.memo(s)})`
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
`;var $d=n(579);const _d=(0,r.createContext)(null),Ed="arvo_user_email",zd=(()=>{try{var e;return null!==(e=new URLSearchParams(window.location.search).get("magic"))&&void 0!==e?e:null}catch{return null}})();function Nd(e){let{children:t}=e;const[n,a]=(0,r.useState)(()=>{try{return localStorage.getItem(Ed)||null}catch{return null}}),[i,o]=(0,r.useState)("idle");(0,r.useEffect)(()=>{const e=zd;e&&(o("validating"),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})}).then(e=>{if(!e.ok)throw new Error(`HTTP ${e.status}`);return e.json()}).then(e=>{if(e.email){try{localStorage.setItem(Ed,e.email)}catch{}a(e.email),o("ok")}else o("error")}).catch(e=>{console.error("[auth] validate-magic misslyckades:",e.message),o("error")}))},[]);const l=(0,r.useCallback)(e=>{try{localStorage.setItem(Ed,e)}catch{}a(e)},[]),s=(0,r.useCallback)(()=>{try{localStorage.removeItem(Ed)}catch{}a(null)},[]);return(0,$d.jsx)(_d.Provider,{value:{email:n,login:l,logout:s,magicState:i},children:t})}function Ad(){return(0,r.useContext)(_d)}const Cd=vd.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: ${e=>{let{theme:t}=e;return t.font.display}};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.025em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
`,Fd=vd.svg`
  width: ${e=>{let{$size:t}=e;return t||30}}px;
  height: ${e=>{let{$size:t}=e;return t||30}}px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(14, 26, 23, 0.10));
`,Td=vd.span`
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  line-height: 1;
`,Pd=vd.em`
  font-style: italic;
  font-weight: 400;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Dd=e=>{let{showName:t=!0,showSuffix:n=!0,size:r}=e;return(0,$d.jsxs)(Cd,{children:[(0,$d.jsxs)(Fd,{$size:r,viewBox:"0 0 40 40",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"arvoMarkGradient",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#5DD6CA"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1B6E66"})]})}),(0,$d.jsx)("path",{fill:"url(#arvoMarkGradient)",fillRule:"evenodd",d:"M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"})]}),t&&(0,$d.jsxs)(Td,{children:["Arvo ",n&&(0,$d.jsx)(Pd,{children:"Flow"})]})]})},Rd={primary:md`
    background: ${e=>{let{theme:t}=e;return t.color.ink}};
    color: #FAFAF7;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.ink}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
    &:hover { transform: translateY(-1px); box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}}; }
    &:active { transform: translateY(0); }
  `,brand:md`
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
    &:hover { transform: translateY(-1px); box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}}; background: ${e=>{let{theme:t}=e;return t.color.brandInk}}; }
    &:active { transform: translateY(0); }
  `,gradient:md`
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
  `,secondary:md`
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  `,ghost:md`
    background: transparent;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    border: 1px solid transparent;
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  `,ghostInverse:md`
    background: transparent;
    color: rgba(250, 250, 247, 0.85);
    border: 1px solid rgba(250, 250, 247, 0.18);
    &:hover { background: rgba(250, 250, 247, 0.08); color: #FAFAF7; }
  `},Ld={sm:md`
    height: 36px;
    padding: 0 14px;
    font-size: 13.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  `,md:md`
    height: 44px;
    padding: 0 18px;
    font-size: 14.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  `,lg:md`
    height: 52px;
    padding: 0 24px;
    font-size: 15.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  `},Od=vd.button`
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
  ${e=>{let{$variant:t="primary"}=e;return Rd[t]}}
  ${e=>{let{$size:t="md"}=e;return Ld[t]}}
  ${e=>{let{$full:t}=e;return t&&"width: 100%;"}}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }
`,Id=Od,Bd=vd.header`
  position: sticky;
  top: 0;
  z-index: ${e=>{let{theme:t}=e;return t.z.nav}};
  background: rgba(250, 250, 247, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,Md=vd.div`
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
`,Ud=vd.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 740px) { display: none; }
`,Vd=vd(vl)`
  padding: 8px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  font-size: 14px;
  white-space: nowrap;
  color: ${e=>{let{theme:t,$active:n}=e;return n?t.color.ink:t.color.muted}};
  font-weight: ${e=>{let{$active:t}=e;return t?600:500}};
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}}, color ${e=>{let{theme:t}=e;return t.motion.fast}};
  background: ${e=>{let{theme:t,$active:n}=e;return n?t.color.surfaceAlt:"transparent"}};
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
`,Kd=vd.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Hd=(vd.span`
  @media (max-width: 600px) { display: none; }
`,vd.span`
  .short { display: none; }
  @media (max-width: 480px) {
    .full  { display: none; }
    .short { display: inline; }
  }
`),Wd=vd.div`
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
`,qd=vd.div`
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
`,Yd=vd.button`
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
`,Gd=vd.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  letter-spacing: -0.02em;
  margin: 0 0 8px;
`,Qd=vd.p`
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin: 0 0 28px;
  line-height: 1.5;
`,Jd=vd.label`
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.inkSoft)&&void 0!==t?t:n.color.ink}};
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 6px;
`,Xd=vd.div`
  margin-bottom: 16px;
`,Zd=vd.input`
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
`,eu=vd.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #D94F3C;
`,tu=vd.div`
  text-align: center;
  padding: 12px 0 4px;
`,nu=vd.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 26px;
`,ru=vd.p`
  font-size: 18px;
  font-weight: 700;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 8px;
  letter-spacing: -0.01em;
`,au=vd.p`
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin: 0;
  line-height: 1.55;
`,iu=vd.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ou=vd.span`
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
`,lu=vd.div`
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
`,su={company:"",name:"",email:""},cu={email:""},du=e=>{let{variant:t="public"}=e;const{pathname:n}=so(),{email:a,logout:i,magicState:o}=Ad(),[l,s]=(0,r.useState)(!1);(0,r.useEffect)(()=>{if("ok"===o||"error"===o){s(!0);const e=setTimeout(()=>s(!1),4e3);return()=>clearTimeout(e)}},[o]);const[c,d]=(0,r.useState)(!1),[u,p]=(0,r.useState)(!1),[h,f]=(0,r.useState)(cu),[m,g]=(0,r.useState)("idle"),[x,v]=(0,r.useState)(su),[b,y]=(0,r.useState)({}),[k,j]=(0,r.useState)("idle"),w=(0,r.useRef)(null);(0,r.useEffect)(()=>{c&&w.current&&w.current.focus()},[c]),(0,r.useEffect)(()=>{if(!c)return;const e=e=>{"Escape"===e.key&&S()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[c]);const S=()=>d(!1),$=(e,t)=>{const n=document.getElementById(t);n&&(e.preventDefault(),n.scrollIntoView({behavior:"smooth"}))};return(0,$d.jsxs)($d.Fragment,{children:[l&&(0,$d.jsx)(lu,{$error:"error"===o,children:"ok"===o?`\u2713 Inloggad som ${a}`:"\u2715 L\xe4nken fungerade inte \u2014 beg\xe4r en ny"}),(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Bd,{children:(0,$d.jsxs)(Md,{children:[(0,$d.jsx)(vl,{to:"/",children:(0,$d.jsx)(Dd,{})}),"public"===t&&(0,$d.jsxs)(Ud,{children:[(0,$d.jsx)(Vd,{to:"/",$active:"/"===n,children:"Hem"}),(0,$d.jsx)(Vd,{to:"/intelligence",$active:"/intelligence"===n,children:"Arvo Intelligence"}),(0,$d.jsx)(Vd,{to:"/#hur",$active:!1,onClick:e=>$(e,"hur"),children:"S\xe5 fungerar det"}),(0,$d.jsx)(Vd,{to:"/#priser",$active:!1,onClick:e=>$(e,"priser"),children:"Pris"}),(0,$d.jsx)(Vd,{to:"/#faq",$active:!1,onClick:e=>$(e,"faq"),children:"FAQ"})]}),"app"===t&&(0,$d.jsxs)(Ud,{children:[(0,$d.jsx)(Vd,{to:"/insights",$active:"/insights"===n,children:"Insikter"}),(0,$d.jsx)(Vd,{to:"/insights",$active:!1,children:"Historik"}),(0,$d.jsx)(Vd,{to:"/insights",$active:!1,children:"Inst\xe4llningar"})]}),(0,$d.jsxs)(Kd,{children:[a?(0,$d.jsxs)(iu,{children:[(0,$d.jsx)(ou,{children:a[0].toUpperCase()}),(0,$d.jsx)(Id,{$variant:"ghost",$size:"sm",onClick:i,children:"Logga ut"})]}):(0,$d.jsx)(Id,{$variant:"ghost",$size:"sm",onClick:()=>{f(cu),g("idle"),p(!0)},children:"Logga in"}),"public"===t&&(0,$d.jsx)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"sm",children:(0,$d.jsxs)(Hd,{children:[(0,$d.jsx)("span",{className:"full",children:"Se mina besparingar \u2192"}),(0,$d.jsx)("span",{className:"short",children:"Se besparingar \u2192"})]})})]})]})}),u&&(0,$d.jsx)(Wd,{onClick:e=>{e.target===e.currentTarget&&p(!1)},children:(0,$d.jsxs)(qd,{role:"dialog","aria-modal":"true","aria-labelledby":"auth-modal-title",children:[(0,$d.jsx)(Yd,{onClick:()=>p(!1),"aria-label":"St\xe4ng",children:"\u2715"}),"sent"===m?(0,$d.jsxs)(tu,{children:[(0,$d.jsx)(nu,{children:"\u2709"}),(0,$d.jsx)(ru,{children:"Kolla inkorgen."}),(0,$d.jsxs)(au,{children:["Vi har skickat en inloggningsl\xe4nk till ",h.email,".",(0,$d.jsx)("br",{}),"Klicka p\xe5 l\xe4nken i mejlet \u2014 det tar 10 sekunder."]})]}):(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=h.email.trim();if(t&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){g("submitting");try{await fetch("/api/auth/request-magic-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}),g("sent")}catch{g("error")}}},noValidate:!0,children:[(0,$d.jsx)(Gd,{id:"auth-modal-title",children:"Logga in p\xe5 Arvo Flow"}),(0,$d.jsx)(Qd,{children:"Ange din e-post \u2014 vi skickar en inloggningsl\xe4nk direkt. Inget l\xf6senord."}),(0,$d.jsxs)(Xd,{children:[(0,$d.jsx)(Jd,{htmlFor:"auth-email",children:"E-postadress"}),(0,$d.jsx)(Zd,{id:"auth-email",type:"email",placeholder:"anna@acme.se",value:h.email,onChange:e=>f({email:e.target.value}),autoComplete:"email",autoFocus:!0})]}),"error"===m&&(0,$d.jsx)(eu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===m,children:"submitting"===m?"Skickar\u2026":"Skicka inloggningsl\xe4nk \u2192"})]})]})}),c&&(0,$d.jsx)(Wd,{onClick:e=>{e.target===e.currentTarget&&S()},children:(0,$d.jsxs)(qd,{role:"dialog","aria-modal":"true","aria-labelledby":"early-access-title",children:[(0,$d.jsx)(Yd,{onClick:S,"aria-label":"St\xe4ng",children:"\u2715"}),"success"===k?(0,$d.jsxs)(tu,{children:[(0,$d.jsx)(nu,{children:"\u2713"}),(0,$d.jsx)(ru,{children:"Er plats \xe4r reserverad."}),(0,$d.jsx)(au,{children:"En av grundarna h\xf6r av sig inom 48 timmar f\xf6r att boka er onboarding. Kolla inkorgen \u2014 mejlet \xe4r p\xe5 v\xe4g."})]}):(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=(()=>{const e={};return x.company.trim()||(e.company="Fyll i f\xf6retagsnamn."),x.name.trim()||(e.name="Fyll i ditt namn."),x.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email.trim())||(e.email="E-postadressen ser inte r\xe4tt ut."):e.email="E-post saknas.",e})();if(y(t),!(Object.keys(t).length>0)){j("submitting");try{const e=await fetch("/api/founding-member",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company:x.company.trim(),name:x.name.trim(),email:x.email.trim(),referrer:"undefined"!==typeof document&&document.referrer||null,timestamp:(new Date).toISOString()})});if(!e.ok)throw new Error("API "+e.status);j("success")}catch{j("error")}}},noValidate:!0,children:[(0,$d.jsx)(Gd,{id:"early-access-title",children:"Bli Founding Member"}),(0,$d.jsx)(Qd,{children:"Reservera er plats och f\xe5 personlig onboarding, 6 m\xe5nader gratis och f\xf6rtur till Fortnox / Visma-kopplingen n\xe4r den \xf6ppnar."}),(0,$d.jsxs)(Xd,{children:[(0,$d.jsx)(Jd,{htmlFor:"ea-company",children:"F\xf6retag"}),(0,$d.jsx)(Zd,{id:"ea-company",ref:w,type:"text",placeholder:"Acme AB",value:x.company,onChange:e=>v(t=>({...t,company:e.target.value})),$error:!!b.company,autoComplete:"organization"}),b.company&&(0,$d.jsx)(eu,{children:b.company})]}),(0,$d.jsxs)(Xd,{children:[(0,$d.jsx)(Jd,{htmlFor:"ea-name",children:"Ditt namn"}),(0,$d.jsx)(Zd,{id:"ea-name",type:"text",placeholder:"Anna Andersson",value:x.name,onChange:e=>v(t=>({...t,name:e.target.value})),$error:!!b.name,autoComplete:"name"}),b.name&&(0,$d.jsx)(eu,{children:b.name})]}),(0,$d.jsxs)(Xd,{children:[(0,$d.jsx)(Jd,{htmlFor:"ea-email",children:"E-post"}),(0,$d.jsx)(Zd,{id:"ea-email",type:"email",placeholder:"anna@acme.se",value:x.email,onChange:e=>v(t=>({...t,email:e.target.value})),$error:!!b.email,autoComplete:"email"}),b.email&&(0,$d.jsx)(eu,{children:b.email})]}),"error"===k&&(0,$d.jsx)(eu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen om en stund."}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===k,children:"submitting"===k?"Skickar\u2026":"Reservera min plats \u2192"})]})]})})]})]})},uu=vd.footer`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  padding: 64px 28px 48px;
`,pu=vd.div`
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
`,hu=vd.div`
  p {
    margin-top: 14px;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    max-width: 320px;
  }
`,fu=vd.div`
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
`,mu=vd.div`
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
`,gu=vd.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 24px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  @media (max-width: 520px) { flex-direction: column; gap: 10px; }
`,xu=()=>(0,$d.jsxs)(uu,{children:[(0,$d.jsxs)(pu,{children:[(0,$d.jsxs)(hu,{children:[(0,$d.jsx)(Dd,{}),(0,$d.jsx)("p",{children:"Er proaktiva finansdirekt\xf6r f\xf6r leverant\xf6rskostnader. Bevakning p\xe5 prenumeration \u2014 genomf\xf6rt byte n\xe4r ni vill."})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"Produkt"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#hur",children:"S\xe5 fungerar det"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#priser",children:"Pris"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#hur",children:"Integrationer"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#sakerhet",children:"S\xe4kerhet"})})]})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"F\xf6retag"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/",children:"Om oss"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/bias",children:"Partners"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"mailto:hej@arvoflow.se",children:"Kontakt"})})]})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"Juridik"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/villkor",children:"Villkor"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/integritet",children:"Integritet (GDPR)"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/cookies",children:"Cookies"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/bias",children:"Rankningspolicy"})})]})]})]}),(0,$d.jsxs)(mu,{children:[(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," Ansvars- och cyberf\xf6rs\xe4krade via ",(0,$d.jsx)("strong",{children:"Hiscox"})]}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," GDPR-s\xe4krad infrastruktur i ",(0,$d.jsx)("strong",{children:"Sverige"})]}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," Krypterad data ",(0,$d.jsx)("strong",{children:"AES-256"})]})]}),(0,$d.jsxs)(gu,{children:[(0,$d.jsx)("span",{children:"\xa9 2026 Arvo Flow AB \xb7 Org.nr 559500-0000"}),(0,$d.jsx)("span",{children:"Stockholm \xb7 Made with care in Sweden"})]})]}),vu={shield:(0,$d.jsx)("path",{d:"M12 2.5l8 3v6.5c0 4.6-3.3 8.7-8 9.5-4.7-.8-8-4.9-8-9.5V5.5l8-3z"}),bolt:(0,$d.jsx)("path",{d:"M13 2L4 14h7l-1 8 9-12h-7l1-8z"}),phone:(0,$d.jsx)("path",{d:"M5 3h4l2 5-3 2c1.4 2.8 3.7 5.1 6.5 6.5l2-3 5 2v4c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2z"}),wifi:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M2 8.8a14 14 0 0120 0"}),(0,$d.jsx)("path",{d:"M5 12.6a9 9 0 0114 0"}),(0,$d.jsx)("path",{d:"M8.5 16.4a4 4 0 017 0"}),(0,$d.jsx)("circle",{cx:"12",cy:"20",r:"1"})]}),card:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),(0,$d.jsx)("path",{d:"M2 10h20"})]}),file:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$d.jsx)("path",{d:"M14 2v6h6"})]}),briefcase:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2"}),(0,$d.jsx)("path",{d:"M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"})]}),truck:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M1 3h15v13H1z"}),(0,$d.jsx)("path",{d:"M16 8h4l3 3v5h-7z"}),(0,$d.jsx)("circle",{cx:"6",cy:"18.5",r:"2"}),(0,$d.jsx)("circle",{cx:"18",cy:"18.5",r:"2"})]}),arrow:(0,$d.jsx)("path",{d:"M5 12h14M13 6l6 6-6 6"}),check:(0,$d.jsx)("path",{d:"M5 12l5 5L20 7"}),upload:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$d.jsx)("path",{d:"M14 2v6h6"}),(0,$d.jsx)("path",{d:"M12 17v-5M9.5 14.5L12 12l2.5 2.5"})]}),spark:(0,$d.jsx)("path",{d:"M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"}),lock:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"4",y:"11",width:"16",height:"11",rx:"2"}),(0,$d.jsx)("path",{d:"M8 11V7a4 4 0 018 0v4"})]}),fortnox:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"}),(0,$d.jsx)("path",{d:"M8 8h8M8 12h8M8 16h5"})]}),bankid:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M5 3h14v18H5z"}),(0,$d.jsx)("path",{d:"M9 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2"})]}),trend:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M3 17l6-6 4 4 8-8"}),(0,$d.jsx)("path",{d:"M14 7h7v7"})]}),"alert-circle":(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,$d.jsx)("path",{d:"M12 8v4"}),(0,$d.jsx)("path",{d:"M12 16h.01"})]}),pulse:(0,$d.jsx)("path",{d:"M2 13h4l2.5-7 4 14 2.5-7H22"}),benchmark:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M3 20h18"}),(0,$d.jsx)("path",{d:"M6.5 20v-4.5"}),(0,$d.jsx)("path",{d:"M11 20v-10"}),(0,$d.jsx)("path",{d:"M15.5 20v-6.5"}),(0,$d.jsx)("path",{d:"M20 20v-13"})]}),"calendar-clock":(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6.5"}),(0,$d.jsx)("path",{d:"M16 2v4M8 2v4M3 10h18"}),(0,$d.jsx)("circle",{cx:"17.5",cy:"17.5",r:"4.5"}),(0,$d.jsx)("path",{d:"M17.5 15.6v2l1.4 1"})]})},bu=e=>{let{name:t,size:n=20,stroke:r=1.6,color:a="currentColor",fill:i="none",...o}=e;const l=vu[t];return l?(0,$d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 24 24",fill:i,stroke:a,strokeWidth:r,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...o,children:l}):null},yu=jd`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,ku=jd`
  0%   { box-shadow: 0 0 0 0 rgba(27,122,110,0.28); }
  60%  { box-shadow: 0 0 0 7px rgba(27,122,110,0.10); }
  100% { box-shadow: 0 0 0 4px rgba(27,122,110,0.12); }
`,ju=jd`
  0%   { transform: scale(0); opacity: 0; }
  55%  { transform: scale(1.30); opacity: 1; }
  75%  { transform: scale(0.88); }
  100% { transform: scale(1); opacity: 1; }
`,wu=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  overflow-x: hidden;
`,Su=vd.section`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: ${e=>{let{$tight:t}=e;return t?"64px 28px":"120px 28px"}};
  @media (max-width: 740px) {
    padding: ${e=>{let{$tight:t}=e;return t?"48px 20px":"80px 20px"}};
  }
`,$u=vd.section`
  position: relative;
  padding: 96px 28px 80px;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 56px 20px 48px; }
`,_u=(vd.hr`
  border: none;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  margin: 0;
`,vd.div`
  position: relative;
  width: 100%;
  line-height: 0;
  overflow: hidden;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};

  svg { display: block; width: 100%; height: 56px; }
  path { fill: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
`),Eu=vd.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 30%, rgba(27, 122, 110, 0.10), transparent 50%),
    radial-gradient(circle at 82% 12%, rgba(93, 214, 202, 0.14), transparent 55%);
  z-index: 0;
`,zu=vd.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 48px; }
`,Nu=vd.span`
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
  animation: ${yu} 0.6s ease both;

  span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,Au=vd.h1`
  margin-top: 24px;
  font-size: clamp(40px, 5.2vw, 64px);
  line-height: 1.04;
  font-weight: 500;
  letter-spacing: -0.025em;
  animation: ${yu} 0.7s 0.1s ease both;

  .line {
    display: block;
    white-space: nowrap;
  }
  em {
    display: block;
    font-style: italic;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-weight: 500;
  }
`,Cu=vd.p`
  margin-top: 22px;
  font-size: 18.5px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  max-width: 540px;
  animation: ${yu} 0.7s 0.2s ease both;
`,Fu=vd.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: ${yu} 0.7s 0.3s ease both;
`,Tu=vd.div`
  margin-top: 28px;
  display: flex;
  gap: 0;
  flex-wrap: nowrap;
  animation: ${yu} 0.7s 0.4s ease both;

  div {
    display: flex;
    flex-direction: column;
    padding-right: 24px;
  }
  div + div {
    padding-left: 24px;
    border-left: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  }
  strong {
    font-size: 14.5px;
    font-weight: 650;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -.01em;
  }
  span {
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-top: 3px;
    line-height: 1.4;
  }
  @media (max-width: 580px) {
    flex-wrap: wrap;
    gap: 16px;
    div { padding-right: 0; }
    div + div { padding-left: 0; border-left: none; }
  }
`,Pu=vd.div`
  position: relative;
  margin-top: 58px; /* förankrar kortets topp mot rubrikens datumlinje */
  animation: ${yu} 0.8s 0.2s ease both;
  @media (max-width: 980px) { margin-top: 0; }
`,Du=vd.div`
  position: relative;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  padding: 28px 30px;

  .tl-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  }
  .tl-brand {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  .tl-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: .04em;
    text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}}33;
    padding: 4px 9px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    opacity: ${e=>{let{$visible:t}=e;return t?1:0}};
    transition: opacity .6s ease 3.3s;
    svg { color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  }

  .tl-body { padding: 18px 0 4px; }
  .tl-step {
    position: relative;
    display: flex;
    gap: 16px;
    padding-bottom: 22px;
    opacity: ${e=>{let{$visible:t}=e;return t?1:0}};
    transform: ${e=>{let{$visible:t}=e;return t?"none":"translateY(8px)"}};
    transition: opacity .9s ease, transform .9s ease;
  }
  .tl-step:nth-child(1) { transition-delay: .3s; }
  .tl-step:nth-child(2) { transition-delay: 1.2s; }
  .tl-step:nth-child(3) { transition-delay: 2.1s; }
  .tl-step:last-child { padding-bottom: 0; }

  /* alla tre steg är avklarade — fyllda brand-prickar med bock */
  .tl-marker {
    position: relative;
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    margin-top: 2px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    border: 2px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tl-marker::before {
    content: '';
    width: 5px;
    height: 2.5px;
    border-left: 1.5px solid #fff;
    border-bottom: 1.5px solid #fff;
    transform: translateY(-0.5px) rotate(-45deg);
  }
  .tl-step:nth-child(1) .tl-marker {
    animation: ${e=>{let{$visible:t}=e;return t?ju:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) .45s both;
  }
  .tl-step:nth-child(2) .tl-marker {
    animation: ${e=>{let{$visible:t}=e;return t?ju:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) 1.35s both;
  }
  .tl-step:not(:last-child) .tl-marker::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    width: 1.5px;
    height: calc(100% + 16px);
    background: ${e=>{let{theme:t}=e;return t.color.brand}}33;
  }
  .tl-step.done .tl-marker {
    box-shadow: 0 0 0 0 ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    animation:
      ${e=>{let{$visible:t}=e;return t?ju:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) 2.25s both,
      ${e=>{let{$visible:t}=e;return t?ku:"none"}} 1s cubic-bezier(0.34, 1.56, 0.64, 1) 2.9s both;
  }
  .tl-body-text { display: flex; flex-direction: column; gap: 1px; }
  .tl-date {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .03em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  .tl-title {
    font-size: 14.5px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -.01em;
    line-height: 1.2;
  }
  .tl-detail {
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.5;
  }

  .tl-foot {
    margin-top: 18px;
    padding-top: 20px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    opacity: ${e=>{let{$visible:t}=e;return t?1:0}};
    transition: opacity .6s ease 3.5s;
  }
  .tl-saving { display: flex; flex-direction: column; gap: 3px; }
  .tl-saving-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .1em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  .tl-saving-value {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -.02em;
    line-height: 1;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-feature-settings: "tnum";
    .unit { font-size: 14px; font-weight: 400; color: ${e=>{let{theme:t}=e;return t.color.muted}}; margin-left: 3px; letter-spacing: 0; }
  }
  .tl-cta {
    padding: 12px 18px;
    border-radius: 10px;
    background: linear-gradient(135deg, #1B7A6E 0%, #2DB59F 100%);
    color: #fff;
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: -.015em;
    cursor: default;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(27,122,110,.30);
  }
`,Ru=(vd.div`
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
`,vd.ul`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,vd.li`
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
`,vd.div`
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
`,vd.section`
  position: relative;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 88px 28px 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  &::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: calc(-50vw + 50%);
    right: calc(-50vw + 50%);
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    z-index: -1;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 64px 20px 56px;
  }
`),Lu=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow:
    0 0 0 1px rgba(27, 122, 110, 0.07),
    0 2px 4px rgba(14, 26, 23, 0.04),
    0 8px 28px rgba(14, 26, 23, 0.07);
  transition: transform ${e=>{let{theme:t}=e;return t.motion.base}},
              box-shadow ${e=>{let{theme:t}=e;return t.motion.base}};

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      0 0 0 1px rgba(27, 122, 110, 0.10),
      0 4px 8px rgba(14, 26, 23, 0.06),
      0 20px 48px rgba(14, 26, 23, 0.10);
  }

  div.icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
    flex-shrink: 0;
  }

  h3 {
    font-size: 19px;
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
  }

  p {
    font-size: 14px;
    line-height: 1.6;
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
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  ul li.group-label {
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    padding: 14px 0 8px;
    border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    margin-top: 2px;
  }
  ul li.group-label:first-child {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }
  ul li.group-label.blocked {
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  ul li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    font-weight: 500;
    padding: 5px 0;
  }
  ul li svg {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    flex-shrink: 0;
  }
  ul li.no {
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-weight: 400;
  }
  ul li.no svg {
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    opacity: 0.5;
  }
`,Ou=vd.section`
  position: relative;
  padding: 72px 28px;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: calc(-50vw + 50%);
    right: calc(-50vw + 50%);
    background: linear-gradient(160deg,
      ${e=>{let{theme:t}=e;return t.color.brandSoft}} 0%,
      ${e=>{let{theme:t}=e;return t.color.bg}} 65%);
    z-index: -1;
  }

  .inner {
    max-width: 680px;
    margin: 0 auto;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 20px;
  }

  h2 {
    font-size: clamp(26px, 3.5vw, 40px);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  p {
    margin-top: 16px;
    font-size: 16.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.65;
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 28px;
    font-size: 15px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-decoration: none;
    border-bottom: 1.5px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    padding-bottom: 2px;
    transition: opacity ${e=>{let{theme:t}=e;return t.motion.fast}};
    &:hover { opacity: 0.72; }
  }

  @media (max-width: 600px) { padding: 56px 20px; }
`,Iu=vd.div`
  max-width: ${e=>{let{$left:t}=e;return t?"none":"720px"}};
  margin: ${e=>{let{$left:t}=e;return t?"0 0 64px":"0 auto 64px"}};
  text-align: ${e=>{let{$left:t}=e;return t?"left":"center"}};

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
`,Bu=vd.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`,Mu=vd.div`
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
`,Uu=vd.div`
  max-width: 680px;
  margin: 80px 0 0;
  text-align: left;

  span.kicker {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 12px;
  }
  h3 {
    font-size: clamp(28px, 3.5vw, 40px);
    line-height: 1.12;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 14px;
    font-size: 16.5px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.55;
  }
`,Vu=vd.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 40px;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`,Ku=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-left: 4px solid ${e=>{let{$color:t}=e;return t}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 24px 20px;
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 18px;
  align-items: center;

  div.text {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  strong.level {
    font-size: 16px;
    font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  p {
    font-size: 13px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin: 0;
  }
`,Hu=vd.div`
  position: relative;
  width: 72px;
  height: 72px;
  flex-shrink: 0;

  svg {
    width: 72px;
    height: 72px;
    transform: rotate(-90deg);
    display: block;
  }
`,Wu=vd.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;

  .num {
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    font-feature-settings: "tnum";
    color: ${e=>{let{$color:t}=e;return t}};
  }
  .den {
    font-size: 10px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    font-weight: 500;
  }
`,qu=(vd.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 40px; }
`,vd.figure`
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
`,vd.section`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 0 28px 80px;
  @media (max-width: 740px) { padding: 0 20px 64px; }

  .card {
    background: ${e=>{let{theme:t}=e;return t.color.ink}};
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
    padding: 52px 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    position: relative;
    overflow: hidden;
    @media (max-width: 740px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 36px 28px;
    }

    &::after {
      content: '';
      position: absolute;
      top: -50%; right: 0;
      width: 50%; height: 200%;
      background: radial-gradient(circle, rgba(93, 214, 202, 0.14), transparent 60%);
      pointer-events: none;
    }
  }

  .stat {
    position: relative;
    z-index: 1;
    padding: 20px 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.09);
    &:last-child { border-right: none; }
    @media (max-width: 740px) {
      padding: 18px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      border-right: none;
      &:nth-child(odd) { border-right: 1px solid rgba(255, 255, 255, 0.09); }
      &:nth-last-child(-n+2) { border-bottom: none; }
    }
  }

  strong {
    display: block;
    font-size: clamp(40px, 5vw, 60px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-feature-settings: "tnum";
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    color: rgba(250, 250, 247, 0.48);
    line-height: 1.45;
    max-width: 140px;
    margin-left: auto;
    margin-right: auto;
  }
`,vd.div`
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
`,vd.div`
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
  p.tagline {
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
    font-size: 14.5px;
    font-style: italic;
    border-left: 2px solid ${e=>{let{theme:t}=e;return t.color.accent}};
    padding-left: 12px;
    margin-top: 20px;
    opacity: 0.9;
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
  div.promise {
    margin-top: 20px;
    padding: 14px 16px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.accent}}44;
    background: ${e=>{let{theme:t}=e;return t.color.accent}}12;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  div.promise strong {
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  div.promise span {
    color: rgba(250, 250, 247, 0.85);
    font-size: 14px;
    line-height: 1.5;
  }
`,vd.div`
  max-width: 960px;
  margin: 0 auto;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 48px;
  align-items: start;
  position: relative;
  overflow: hidden;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 24px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -40%; right: -25%;
    width: 60%; height: 200%;
    background: radial-gradient(circle, rgba(93, 214, 202, 0.12), transparent 60%);
    pointer-events: none;
  }
`),Yu=vd.div`
  position: relative;

  span.kicker {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    padding: 4px 12px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    margin-bottom: 18px;
  }
  h2 {
    font-size: clamp(28px, 3.6vw, 40px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p.lede {
    margin-top: 16px;
    font-size: 16px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  ul.benefits {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  ul.benefits li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 14.5px;
    line-height: 1.45;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  ul.benefits li svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
`,Gu=vd.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  input {
    height: 46px;
    padding: 0 14px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    font-family: inherit;
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    transition: border-color ${e=>{let{theme:t}=e;return t.motion.fast}},
                box-shadow ${e=>{let{theme:t}=e;return t.motion.fast}};
  }
  input::placeholder {
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
  }
  input:focus {
    border-color: ${e=>{let{theme:t}=e;return t.color.brand}};
    outline: none;
    box-shadow: 0 0 0 3px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
  input[aria-invalid="true"] {
    border-color: ${e=>{let{theme:t}=e;return t.color.danger}};
  }
  span.error {
    font-size: 12.5px;
    color: ${e=>{let{theme:t}=e;return t.color.danger}};
    margin-top: 2px;
  }
  p.fineprint {
    margin-top: 6px;
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    line-height: 1.5;
  }
`,Qu=vd.div`
  position: relative;
  text-align: center;
  padding: 24px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  div.check {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }
  h3 {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  p {
    font-size: 14.5px;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    line-height: 1.55;
    max-width: 360px;
  }
`,Ju=vd.div`
  max-width: 820px;
  margin: 0 auto;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,Xu=vd.details`
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
`,Zu=vd.section`
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
`,ep=vd.section`
  background: ${e=>{let{theme:t}=e;return t.color.ink}};
  padding: 120px 28px;
  position: relative;
  overflow: hidden;
  @media (max-width: 740px) { padding: 80px 20px; }

  &::before {
    content: '';
    position: absolute;
    top: -30%; left: -10%;
    width: 55%; height: 160%;
    background: radial-gradient(circle, rgba(27,122,110,.20), transparent 60%);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -20%; right: -8%;
    width: 50%; height: 160%;
    background: radial-gradient(circle, rgba(93,214,202,.08), transparent 60%);
    pointer-events: none;
  }
`,tp=vd.div`
  position: relative;
  z-index: 1;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 56px; }

  .eyebrow {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .22em;
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
    margin-bottom: 20px;
  }
  h2 {
    font-size: clamp(30px, 3.8vw, 50px);
    font-weight: 800;
    letter-spacing: -.03em;
    line-height: 1.08;
    color: #FAFAF7;
    margin: 0 0 20px;
  }
  p.sub {
    font-size: 16px;
    color: rgba(250,250,247,.58);
    line-height: 1.65;
    margin: 0 0 40px;
    max-width: 420px;
  }
`,np=vd.div`
  border-top: 1px solid rgba(250,250,247,.09);
`,rp=vd.div`
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(250,250,247,.09);

  .pillar-icon {
    width: 40px; height: 40px;
    border-radius: 11px;
    background: linear-gradient(150deg, rgba(45,181,159,.24), rgba(27,122,110,.10));
    border: 1px solid rgba(93,214,202,.24);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.07);
    display: flex; align-items: center; justify-content: center;
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
    flex-shrink: 0;
  }
  h4 {
    font-family: ${e=>{let{theme:t}=e;return t.font.sans}};
    font-size: 15.5px;
    font-weight: 700;
    color: #FAFAF7;
    margin: 0 0 4px;
    letter-spacing: -.01em;
    line-height: 1.2;
  }
  p {
    font-size: 13.5px;
    color: rgba(250,250,247,.72);
    line-height: 1.55;
    margin: 0;
  }
`,ap=jd`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,0); }
  50%       { box-shadow: 0 0 0 6px rgba(27,122,110,0.20); }
`,ip=jd`
  0%   { box-shadow: 0 0 0 0 rgba(45,181,159,0.55); }
  70%  { box-shadow: 0 0 0 6px rgba(45,181,159,0); }
  100% { box-shadow: 0 0 0 0 rgba(45,181,159,0); }
`,op=jd`
  0%   { transform: translateY(-130%); opacity: 0; }
  10%  { opacity: 1; }
  45%  { transform: translateY(280%); opacity: 1; }
  55%  { opacity: 0; }
  100% { transform: translateY(280%); opacity: 0; }
`,lp=vd.div`
  position: relative;
  overflow: hidden;
  background: rgba(250,250,247,.04);
  border: 1px solid rgba(250,250,247,.10);
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 26px 28px;
  opacity: ${e=>{let{$visible:t}=e;return!1===t?0:1}};
  transform: ${e=>{let{$visible:t}=e;return!1===t?"translateY(20px)":"none"}};
  transition: opacity 0.8s ease, transform 0.8s ease;

  /* realtids-scan som sveper nedför kortet */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 34%;
    pointer-events: none;
    background: linear-gradient(180deg, transparent, rgba(93,214,202,0.09) 55%, transparent);
    transform: translateY(-130%);
    animation: ${e=>{let{$visible:t}=e;return!1===t?"none":op}} 7s ease-in-out 1.6s infinite;
  }

  .preview-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(250,250,247,.08);
  }
  .preview-brand {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .22em;
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
  }
  .preview-brand .live {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.accent}};
    animation: ${ip} 2.4s ease-out infinite;
  }
  .preview-time {
    font-size: 11px;
    color: rgba(250,250,247,.35);
  }

  /* Tre intelligenssignaler — speglar pelarnas ikoner till vänster.
     Inga skiljelinjer — luft och ikoner bär strukturen. */
  .signal {
    display: flex;
    gap: 13px;
    align-items: flex-start;
    padding: 17px 0;
    opacity: ${e=>{let{$visible:t}=e;return!1===t?0:1}};
    transform: ${e=>{let{$visible:t}=e;return!1===t?"translateY(10px)":"none"}};
    transition: opacity .6s ease, transform .6s ease;
  }
  .signal:nth-child(2) { padding-top: 20px; transition-delay: .12s; }
  .signal:nth-child(3) { transition-delay: .30s; }
  .signal:nth-child(4) { transition-delay: .48s; }

  .signal-ico {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(150deg, rgba(45,181,159,.22), rgba(27,122,110,.08));
    border: 1px solid rgba(93,214,202,.22);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
  }
  .signal.alert .signal-ico {
    background: linear-gradient(150deg, rgba(217,119,6,.24), rgba(217,119,6,.06));
    border-color: rgba(245,158,11,.30);
    color: #FBBF24;
  }

  .signal-main { flex: 1; min-width: 0; }
  .signal-tag {
    display: block;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
    margin-bottom: 6px;
  }
  .signal.alert .signal-tag { color: #FBBF24; }

  .signal-line {
    font-size: 16px;
    font-weight: 700;
    color: #FAFAF7;
    letter-spacing: -.02em;
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }
  .signal-line.sm { font-size: 14.5px; font-weight: 600; }
  .signal-line strong { color: ${e=>{let{theme:t}=e;return t.color.accent}}; font-weight: 800; }

  .badge {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 700;
    border-radius: 6px;
    padding: 2px 7px;
    white-space: nowrap;
  }
  .badge.up {
    color: #FCA5A5;
    background: rgba(220,38,38,.20);
  }

  .signal-sub {
    margin: 5px 0 0;
    font-size: 12.5px;
    color: rgba(250,250,247,.55);
    line-height: 1.5;
  }
  .signal-sub strong { color: #FAFAF7; font-weight: 600; }

  /* Community Benchmark — unit chart: rutnät av 15 bolag, 8 drabbade (er ringad).
     Rutnät i stället för en rad → läses som population, inte ett betyg. */
  .bench-grid {
    display: grid;
    grid-template-columns: repeat(8, 9px);
    gap: 6px;
    margin: 11px 0 10px;
    width: max-content;
  }
  .bench-grid span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(250,250,247,.15);
    transform: scale(${e=>{let{$visible:t}=e;return!1===t?0:1}});
    opacity: ${e=>{let{$visible:t}=e;return!1===t?0:1}};
    transition:
      transform .45s cubic-bezier(.34,1.56,.64,1),
      opacity .3s ease;
  }
  .bench-grid span.on {
    background: #D9923C;
  }
  .bench-grid span.you {
    background: #E8A24A;
    box-shadow: 0 0 0 2px rgba(250,250,247,.9);
  }

  .alert-saving {
    margin-top: 8px;
    padding: 18px 0 2px;
    border-top: 1px solid rgba(250,250,247,.08);
    opacity: ${e=>{let{$visible:t}=e;return!1===t?0:1}};
    transition: opacity .6s ease .62s;
  }
  .saving-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(250,250,247,.40);
    margin-bottom: 4px;
  }
  .saving-amount {
    font-size: 34px;
    font-weight: 800;
    letter-spacing: -.04em;
    line-height: 1;
    color: ${e=>{let{theme:t}=e;return t.color.accent}};
    font-feature-settings: "tnum";
    .unit { font-size: 15px; font-weight: 400; color: rgba(250,250,247,.40); margin-left: 3px; letter-spacing: 0; }
  }

  .alert-actions {
    margin-top: 18px;
    display: flex;
    gap: 10px;
    opacity: ${e=>{let{$visible:t}=e;return!1===t?0:1}};
    transition: opacity .6s ease .74s;
  }
  .btn-primary {
    flex: 1;
    padding: 12px 0;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    background: linear-gradient(135deg, #1B7A6E 0%, #2DB59F 100%);
    border: none;
    color: #fff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -.015em;
    cursor: default;
    animation: ${ap} 2.8s ease-in-out 2s infinite;
  }
  .btn-secondary {
    padding: 12px 16px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    background: transparent;
    border: 1px solid rgba(250,250,247,.18);
    color: rgba(250,250,247,.80);
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: default;
    white-space: nowrap;
  }
`,sp=vd.section`
  position: relative;
  padding: 120px 28px;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 80px 20px; }
`,cp=vd.div`
  max-width: 720px;
  margin: 0 auto 52px;
  text-align: center;

  .kicker {
    display: inline-block;
    font-size: 12.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    margin-bottom: 16px;
  }
  h2 {
    font-size: clamp(32px, 4.4vw, 54px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    margin: 0;
  }
  p {
    margin: 18px auto 0;
    max-width: 600px;
    font-size: 16.5px;
    line-height: 1.6;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
`,dp=vd.p`
  max-width: 740px;
  margin: 56px auto 0;
  text-align: center;
  font-family: ${e=>{let{theme:t}=e;return t.font.display}};
  font-size: clamp(20px, 2.4vw, 27px);
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
`,up=vd.p`
  max-width: 720px;
  margin: 20px auto 0;
  text-align: center;
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.5;
`,pp=vd.div`
  max-width: 920px;
  margin: 0 auto;

  .spectrum-head {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding-bottom: 14px;
    border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

    .title { font-size: 14.5px; font-weight: 700; letter-spacing: -0.01em; color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
    .sub { font-size: 12px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; margin-right: auto; }
    .tag {
      font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
      color: ${e=>{let{theme:t}=e;return t.color.brand}}; background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
      padding: 4px 10px; border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    }
  }
`,hp=vd.div`
  display: flex;
  flex-direction: column;
`,fp=vd.div`
  display: grid;
  grid-template-columns: 150px 1fr 96px;
  gap: 20px;
  align-items: center;

  .cat-col { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .cat {
    font-size: 13.5px;
    font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .unit { font-size: 10px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; }

  /* delad axel — zon + branschsnitt-linje löper kontinuerligt genom alla rader */
  .axis { position: relative; height: 46px; }
  .axis .zone {
    position: absolute;
    top: 0; bottom: 0;
    left: 8%; width: 27%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}}14;
    border-radius: 2px;
  }
  .axis .line {
    position: absolute;
    top: 0; bottom: 0;
    left: 32%;
    width: 1.5px;
    background: ${e=>{let{theme:t}=e;return t.color.ink}};
    opacity: 0.22;
  }

  .delta { display: flex; flex-direction: column; align-items: flex-end; text-align: right; }
  .delta.over strong {
    font-size: 16px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
    color: #DC2626;
    font-feature-settings: "tnum";
  }
  .delta.inline strong {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
  }
  .delta.inline strong svg { color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  .delta small {
    margin-top: 3px;
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }

  @media (max-width: 740px) {
    grid-template-columns: minmax(84px, 1fr) 1.6fr 70px;
    gap: 12px;
    .axis { height: 42px; }
  }
`,mp=vd.span`
  position: absolute;
  top: 50%;
  z-index: 2;
  height: 2px;
  border-radius: 2px;
  transform: translateY(-50%);
  background: ${e=>{let{$over:t}=e;return t?"rgba(220,38,38,0.55)":"rgba(27,122,110,0.55)"}};
  ${e=>{let{$over:t,$line:n}=e;return t?`left: ${n};`:`right: calc(100% - ${n});`}}
  width: ${e=>{let{$visible:t,$span:n}=e;return t?n:"0%"}};
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${e=>{let{$delay:t}=e;return t}};
`,gp=vd.span`
  position: absolute;
  top: 50%;
  z-index: 3;
  width: ${e=>{let{$size:t}=e;return t}}px;
  height: ${e=>{let{$size:t}=e;return t}}px;
  border-radius: 50%;
  background: ${e=>{let{$over:t}=e;return t?"#DC2626":"#1B7A6E"}};
  border: 2.5px solid ${e=>{let{theme:t}=e;return t.color.bg}};
  box-shadow: 0 1px 6px ${e=>{let{$over:t}=e;return t?"rgba(220,38,38,0.50)":"rgba(27,122,110,0.45)"}};
  left: ${e=>{let{$x:t}=e;return t}};
  transform: translate(-50%, -50%) scale(${e=>{let{$visible:t}=e;return t?1:0}});
  opacity: ${e=>{let{$visible:t}=e;return t?1:0}};
  transition:
    transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${e=>{let{$delay:t}=e;return t}},
    opacity 0.4s ease ${e=>{let{$delay:t}=e;return t}};
`,xp=vd.div`
  display: grid;
  grid-template-columns: 150px 1fr 96px;
  gap: 20px;
  margin-top: 8px;

  .axis-cell {
    grid-column: 2;
    position: relative;
    height: 16px;
  }
  .axis-cell .lbl {
    position: absolute;
    top: 0;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  .axis-cell .zone { left: 8%; }
  .axis-cell .mid { left: 32%; transform: translateX(-50%); color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; }
  .axis-cell .right { right: 0; color: #DC2626; opacity: 0.75; }

  @media (max-width: 740px) {
    grid-template-columns: minmax(84px, 1fr) 1.6fr 70px;
    gap: 12px;
    .axis-cell .zone { display: none; }
  }
`,vp=vd.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

  .sum-meta {
    display: flex;
    align-items: center;
    gap: 0;
    flex-shrink: 0;
  }
  .sum-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 22px 0 0;
  }
  .sum-col + .sum-sep + .sum-col {
    padding: 0 22px;
  }
  .sum-col strong {
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.05em;
    font-feature-settings: "tnum";
  }
  .sum-col.bad strong  { color: #DC2626; }
  .sum-col.good strong { color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  .sum-col span {
    margin-top: 5px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    white-space: nowrap;
  }
  .sum-sep {
    width: 1px;
    height: 44px;
    background: ${e=>{let{theme:t}=e;return t.color.border}};
    flex-shrink: 0;
    margin: 0 4px;
  }
  p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.6;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    padding-left: 28px;
    border-left: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
    margin-left: 24px;
  }

  @media (max-width: 620px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    p { padding-left: 0; border-left: none; margin-left: 0; }
  }
`,bp=vd.div`
  max-width: 880px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 680px) { grid-template-columns: 1fr; }
`,yp=vd.div`
  background: ${e=>{let{$featured:t,theme:n}=e;return t?n.color.ink:n.color.surface}};
  border: ${e=>{let{$featured:t,theme:n}=e;return t?`2px solid ${n.color.brand}`:`1px solid ${n.color.border}`}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 36px 32px;
  position: relative;
  overflow: hidden;
  @media (max-width: 740px) { padding: 28px 22px; }

  &::after {
    content: '';
    position: absolute;
    top: -40%; right: -25%;
    width: 60%; height: 200%;
    background: ${e=>{let{$featured:t}=e;return t?"radial-gradient(circle, rgba(93,214,202,.14), transparent 60%)":"none"}};
    pointer-events: none;
  }

  .tier-badge {
    display: inline-block;
    position: relative;
    z-index: 1;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .14em;
    padding: 4px 10px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.pill}};
    background: ${e=>{let{$featured:t,theme:n}=e;return t?n.color.brand:n.color.brandSoft}};
    color: ${e=>{let{$featured:t,theme:n}=e;return t?"#FAFAF7":n.color.brand}};
    margin-bottom: 20px;
  }

  h3 {
    position: relative;
    z-index: 1;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -.025em;
    color: ${e=>{let{$featured:t}=e;return t?"#FAFAF7":"inherit"}};
    margin: 0 0 8px;
  }

  .tier-price {
    position: relative;
    z-index: 1;
    margin: 16px 0 6px;
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -.04em;
    font-feature-settings: "tnum";
    color: ${e=>{let{$featured:t}=e;return t?"#FAFAF7":"inherit"}};
    .period {
      font-size: 15px;
      font-weight: 400;
      color: ${e=>{let{$featured:t}=e;return t?"rgba(250,250,247,.45)":"inherit"}};
      letter-spacing: 0;
      margin-left: 4px;
    }
  }

  .tier-tagline {
    position: relative;
    z-index: 1;
    font-size: 14px;
    color: ${e=>{let{$featured:t}=e;return t?"rgba(250,250,247,.55)":"inherit"}};
    margin: 0 0 24px;
    line-height: 1.55;
  }

  ul {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 0 28px;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 13.5px;
    color: ${e=>{let{$featured:t}=e;return t?"rgba(250,250,247,.78)":"inherit"}};
    line-height: 1.45;
    svg {
      flex-shrink: 0;
      margin-top: 2px;
      color: ${e=>{let{$featured:t,theme:n}=e;return t?n.color.accent:n.color.brand}};
    }
  }

  .tier-note {
    position: relative;
    z-index: 1;
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    color: ${e=>{let{$featured:t}=e;return t?"rgba(250,250,247,.35)":"inherit"}};
    opacity: ${e=>{let{$featured:t}=e;return t?1:.6}};
  }

  .tier-addon {
    position: relative;
    z-index: 1;
    padding: 14px 16px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
    background: ${e=>{let{$featured:t}=e;return t?"rgba(250,250,247,.06)":"rgba(27,122,110,.06)"}};
    border: 1px solid ${e=>{let{$featured:t}=e;return t?"rgba(250,250,247,.09)":"rgba(27,122,110,.14)"}};
    font-size: 13px;
    color: ${e=>{let{$featured:t}=e;return t?"rgba(250,250,247,.60)":"inherit"}};
    line-height: 1.5;
    margin-top: 4px;
    strong {
      display: block;
      font-size: 14px;
      font-weight: 700;
      color: ${e=>{let{$featured:t}=e;return t?"#FAFAF7":"inherit"}};
      margin-bottom: 2px;
    }
  }
`,kp=[{step:"Steg 01",title:"Aktivera Arvo \u2014 klart p\xe5 2 min",body:"Ni s\xe4tter upp automatisk vidarebefordran fr\xe5n er faktura-inkorg. Varje ny leverant\xf6rsfaktura fl\xf6dar in till Arvo \u2014 helt automatiskt, ingen IT-integration kr\xe4vs. Vill ni ha fullst\xe4ndig t\xe4ckning kopplar ni enkelt in Fortnox eller Visma som komplement.",bullets:["Noll IT-projekt","GDPR-s\xe4krad infrastruktur i Sverige","Koppla bort n\xe4r som helst"]},{step:"Steg 02",title:"Arvo bevakar. Ni lever era liv.",body:"Varje faktura analyseras mot verifierade marknadsdata och prisdata fr\xe5n j\xe4mf\xf6rbara bolag i er bransch. Avviker ett pris \u2014 oavsett om det r\xf6r sig om ett par hundra eller tiotusentals kronor \u2014 identifieras det direkt.",bullets:["8 leverant\xf6rskategorier idag","Branschanpassad prisdata","L\xf6pande bevakning \u2014 ingen eng\xe5ngsscan"]},{step:"Steg 03",title:"Vi h\xf6r av oss. Ni best\xe4mmer.",body:"Identifierar Arvo en besparing skickar vi er en briefing med exakt vad ni betalar och vad som \xe4r m\xf6jligt. Varje pris \xe4r verifierat mot leverant\xf6rens officiella avtalspris \u2014 ni godk\xe4nner, Arvo f\xf6rbereder hela bytet.",bullets:["Ni beh\xe5ller full kontroll","Ni godk\xe4nner varje byte \u2014 inget sker utan er","Arvo Switch: 20 % av realiserad besparing"]}],jp=175.93,wp=e=>{let{score:t,color:n}=e;const a=(0,r.useRef)(null),i=parseFloat((jp*(1-t/100)).toFixed(2));return(0,r.useEffect)(()=>{const e=requestAnimationFrame(()=>{a.current&&(a.current.style.strokeDashoffset=i)});return()=>cancelAnimationFrame(e)},[i]),(0,$d.jsxs)(Hu,{children:[(0,$d.jsxs)("svg",{viewBox:"0 0 72 72",children:[(0,$d.jsx)("circle",{fill:"none",stroke:"#E5EFEA",strokeWidth:"6",cx:"36",cy:"36",r:"28"}),(0,$d.jsx)("circle",{ref:a,fill:"none",stroke:n,strokeWidth:"6",strokeLinecap:"round",strokeDasharray:jp,strokeDashoffset:jp,cx:"36",cy:"36",r:"28",style:{transition:"stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)"}})]}),(0,$d.jsxs)(Wu,{$color:n,children:[(0,$d.jsx)("span",{className:"num",children:t}),(0,$d.jsx)("span",{className:"den",children:"/100"})]})]})},Sp=[{label:"Optimalt",color:"#1B7A6E",score:91,desc:"Ni har ett kostnadsoptimerat leverant\xf6rsn\xe4tverk. Ni betalar under eller i niv\xe5 med branschsnittet."},{label:"F\xf6rb\xe4ttringsl\xe4ge",color:"#65A30D",score:72,desc:"Ni betalar mer \xe4n marknadspriset \u2014 en meningsfull besparing som Arvo kan realisera \xe5t er utan byr\xe5krati."},{label:"Suboptimerat",color:"#D97706",score:54,desc:"Ni betalar klart mer \xe4n branschsnittet. Arvo kan g\xf6ra ett byte som betalar sig fr\xe5n dag ett."},{label:"Kritisk",color:"#DC2626",score:28,desc:"Ni betalar kraftigt mer \xe4n marknadspriset och f\xf6rlorar pengar varje faktura. Arvo identifierar, f\xf6rhandlar och genomf\xf6r bytet \xe5t er."}],$p=[{q:"Vad kostar det?",a:"Arvo erbjuds i tv\xe5 lager. Arvo Intelligence kostar 1 995 kr/m\xe5n \u2014 l\xf6pande bevakning, smygh\xf6jningslarm och avtalsbevakning, ingen bindningstid. Arvo Switch \xe4r ett till\xe4gg: vill ni att Arvo genomf\xf6r ett identifierat leverant\xf6rsbyte tar vi 20 % av realiserad besparing, fakturerat efter att bytet \xe4r genomf\xf6rt. Hittar vi ingen besparing \u2014 kostar Switch inget."},{q:"Hur kan ni vara s\xe4kra p\xe5 att rekommendationerna \xe4r opartiska?",a:(0,$d.jsxs)($d.Fragment,{children:["Vi tj\xe4nar pengar bara n\xe4r ni sparar \u2014 det \xe4r beviset p\xe5 opartiskhet. Leverant\xf6rer kan inte k\xf6pa sig en h\xf6gre placering; vi s\xe4tter tak f\xf6r vad de f\xe5r betala oss och krediterar er direkt om n\xe5gon f\xf6rs\xf6ker g\xe5 \xf6ver. Policyn \xe4r \xf6ppet publicerad under ",(0,$d.jsx)(vl,{to:"/bias",children:"v\xe5r rankningspolicy"}),"."]})},{q:"Varf\xf6r ska jag lita p\xe5 era besparingskalkyler?",a:"Vi bygger p\xe5 verifierade marknadsdata \u2014 offentliga listpriser, ramavtalsdata och faktiska operat\xf6rspriser. Och eftersom vi tar 20 % av identifierad besparing har vi inget att vinna p\xe5 att \xf6verdriva: en projektion som inte h\xe5ller kostar oss f\xf6rtroendet, inte bara besparingsarvodet. Vi tj\xe4nar mer p\xe5 att lova lite och leverera fullt ut."},{q:"Vad h\xe4nder om den nya leverant\xf6ren h\xf6jer priset efter bytet?",a:"V\xe5r fee baseras p\xe5 kontrakterade priser vid avtalssignering. F\xf6r\xe4ndras marknadsl\xe4get efter bytet hj\xe4lper vi er med en ny analys \u2014 utan extra kostnad."},{q:"S\xe4ger ni upp avtal autonomt utan min godk\xe4nnande?",a:"Aldrig. Varje byte kr\xe4ver er BankID-signatur. Vi f\xf6rbereder, ni godk\xe4nner. Det \xe4r en h\xe5rd regel."},{q:"Vilka kategorier t\xe4cker ni idag?",a:"Elavtal, mobilabonnemang, f\xf6retagsbredband, programvarulicenser / SaaS, skrivare & Managed Print, kortterminaler, fakturatj\xe4nster och f\xf6retagsleasing \u2014 \xe5tta kategorier d\xe4r vi kan genomf\xf6ra hela bytesprocessen idag. F\xf6retags- och yrkesansvarsf\xf6rs\xe4kringar analyserar vi redan, men byten genomf\xf6rs n\xe4r v\xe5r FI-licens \xe4r klar. Fler kategorier l\xe4ggs till varje kvartal baserat p\xe5 var vi ser st\xf6rst besparingar i kunddatan."},{q:"Vad h\xe4nder med min data?",a:"Arvo ser endast det ni vidarebefordrar \u2014 leverant\xf6rsfakturor, inget annat. Datan lagras krypterad i Sverige (Bahnhof Stockholm). Kopplar ni in Fortnox eller Visma g\xe4ller samma princip: enbart l\xe4s-r\xe4ttigheter mot leverant\xf6rsfakturor. Vi s\xe4ljer aldrig identifierbar data \u2014 anonymiserade branschindex \xe4r v\xe5r enda dataprodukt ut\xf6ver tj\xe4nsten."}],_p=[{cat:"Mobilabonnemang",unit:"kr/SIM/\xe5r",p25:3408,median:4200,p75:5200,you:5760,max:7e3,status:"over"},{cat:"Skrivare & print",unit:"kr/m\xe5n",p25:1800,median:2400,p75:3200,you:3900,max:4600,status:"over"},{cat:"Microsoft 365",unit:"kr/seat/\xe5r",p25:1320,median:1680,p75:2100,you:2400,max:2800,status:"over"},{cat:"F\xf6retagsbredband",unit:"kr/m\xe5n",p25:380,median:510,p75:650,you:730,max:880,status:"over"},{cat:"Fakturatj\xe4nst",unit:"kr/m\xe5n",p25:180,median:240,p75:320,you:360,max:440,status:"over"},{cat:"Elavtal",unit:"\xf6re/kWh",p25:112,median:145,p75:178,you:195,max:230,status:"over"},{cat:"Kortterminal",unit:"kr/m\xe5n",p25:240,median:320,p75:420,you:298,max:520,status:"inline"},{cat:"F\xf6retagsleasing",unit:"kr/m\xe5n",p25:3200,median:4100,p75:5200,you:3850,max:6e3,status:"inline"}],Ep=e=>{let{row:t,i:n,visible:a}=e;const i="over"===t.status,o=t.you-t.median,l=((e,t)=>{const n=e/t;return Math.max(9,Math.min(94,32+68*(n-1)))})(t.you,t.median),s=Math.abs(l-32),c=Math.max(0,t.you/t.median-1),d=i?Math.round(12+Math.min(10*c,5)):12,u=75*n+250+"ms",p=75*n+420+"ms",h=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1100,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;const[i,o]=(0,r.useState)(0);return(0,r.useEffect)(()=>{if(!t)return;let r;const i=setTimeout(()=>{let t;const a=i=>{void 0===t&&(t=i);const l=Math.min((i-t)/n,1),s=1-Math.pow(1-l,3);o(Math.round(e*s)),l<1&&(r=requestAnimationFrame(a))};r=requestAnimationFrame(a)},a);return()=>{clearTimeout(i),r&&cancelAnimationFrame(r)}},[e,t,n,a]),i}(o,a&&i,850,75*n+450);return(0,$d.jsxs)(fp,{children:[(0,$d.jsxs)("div",{className:"cat-col",children:[(0,$d.jsx)("span",{className:"cat",children:t.cat}),(0,$d.jsx)("span",{className:"unit",children:t.unit})]}),(0,$d.jsxs)("div",{className:"axis",children:[(0,$d.jsx)("span",{className:"zone"}),(0,$d.jsx)("span",{className:"line"}),(0,$d.jsx)(mp,{$over:i,$span:`${s}%`,$line:"32%",$visible:a,$delay:u}),(0,$d.jsx)(gp,{$x:`${l}%`,$size:d,$over:i,$visible:a,$delay:p})]}),i?(0,$d.jsxs)("div",{className:"delta over",children:[(0,$d.jsxs)("strong",{children:["+",(a?h:0).toLocaleString("sv-SE")]}),(0,$d.jsx)("small",{children:"s\xe4mre \xe4n snittet"})]}):(0,$d.jsxs)("div",{className:"delta inline",children:[(0,$d.jsxs)("strong",{children:[(0,$d.jsx)(bu,{name:"check",size:13,stroke:2.6})," i niv\xe5"]}),(0,$d.jsx)("small",{children:"v\xe4lf\xf6rhandlat"})]})]})},zp=()=>{const[e,t]=(0,r.useState)(!1),n=(0,r.useRef)(null);(0,r.useEffect)(()=>{const e=n.current;if(!e)return;const r=new IntersectionObserver(e=>{let[n]=e;n.isIntersecting&&(t(!0),r.disconnect())},{threshold:.1});return r.observe(e),()=>r.disconnect()},[]);const a=_p.filter(e=>"over"===e.status).length;return(0,$d.jsxs)(pp,{ref:n,children:[(0,$d.jsxs)("div",{className:"spectrum-head",children:[(0,$d.jsx)("span",{className:"title",children:"Er leverant\xf6rsportf\xf6lj"}),(0,$d.jsx)("span",{className:"sub",children:"8 kategorier \xb7 bevakade dygnet runt"}),(0,$d.jsx)("span",{className:"tag",children:"Exempel"})]}),(0,$d.jsx)(hp,{children:_p.map((t,n)=>(0,$d.jsx)(Ep,{row:t,i:n,visible:e},t.cat))}),(0,$d.jsx)(xp,{children:(0,$d.jsxs)("span",{className:"axis-cell",children:[(0,$d.jsx)("span",{className:"lbl zone",children:"V\xe4lf\xf6rhandlat"}),(0,$d.jsx)("span",{className:"lbl mid",children:"Branschsnitt"}),(0,$d.jsx)("span",{className:"lbl right",children:"S\xe4mre \u2192"})]})}),(0,$d.jsxs)(vp,{children:[(0,$d.jsxs)("div",{className:"sum-meta",children:[(0,$d.jsxs)("div",{className:"sum-col bad",children:[(0,$d.jsx)("strong",{children:a}),(0,$d.jsx)("span",{children:"s\xe4mre \xe4n snittet"})]}),(0,$d.jsx)("div",{className:"sum-sep"}),(0,$d.jsxs)("div",{className:"sum-col good",children:[(0,$d.jsx)("strong",{children:_p.length-a}),(0,$d.jsx)("span",{children:"b\xe4ttre \xe4n snittet"})]})]}),(0,$d.jsx)("p",{children:"Sex av \xe5tta kategorier kostar mer \xe4n v\xe4lf\xf6rhandlade bolag i er bransch betalar \u2014 h\xf6jningen sker gradvis och m\xe4rks s\xe4llan i tid. Arvo identifierar det innan ni hunnit se det."})]})]})},Np=new Set([0,2,3,5,8,9,11,13]),Ap=()=>{const[e,t]=(0,r.useState)({company:"",name:"",email:""}),[n,a]=(0,r.useState)({}),[i,o]=(0,r.useState)("idle"),[l,s]=(0,r.useState)(!1),c=(0,r.useRef)(null),[d,u]=(0,r.useState)(!1);(0,r.useEffect)(()=>{const e=requestAnimationFrame(()=>u(!0));return()=>cancelAnimationFrame(e)},[]),(0,r.useEffect)(()=>{const e=c.current;if(!e)return;const t=new IntersectionObserver(e=>{let[n]=e;n.isIntersecting&&(s(!0),t.disconnect())},{threshold:.1});return t.observe(e),()=>t.disconnect()},[]);return(0,$d.jsxs)(wu,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)($u,{children:[(0,$d.jsx)(Eu,{}),(0,$d.jsxs)(zu,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsxs)(Nu,{children:[(0,$d.jsx)("span",{className:"dot"})," Arvo Intelligence \xb7 Proaktiv finansdirekt\xf6r f\xf6r svenska bolag"]}),(0,$d.jsxs)(Au,{children:[(0,$d.jsx)("span",{className:"line",children:"Er finansdirekt\xf6r."}),(0,$d.jsx)("em",{children:"Innan ni fr\xe5gar."})]}),(0,$d.jsx)(Cu,{children:"Era leverant\xf6rer justerar priser i det tysta. Arvo bevakar varje avtal dygnet runt \u2014 och h\xf6r av sig i samma stund en kostnad b\xf6rjar krypa upp\xe5t, ofta innan ni sj\xe4lva hunnit m\xe4rka n\xe5got. Vi identifierar l\xe4ckaget. Ni tar beslutet."}),(0,$d.jsxs)(Fu,{children:[(0,$d.jsxs)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"lg",children:["Testa med en faktura ",(0,$d.jsx)(bu,{name:"arrow",size:18})]}),(0,$d.jsx)(Id,{as:vl,to:"/intelligence",$variant:"secondary",$size:"lg",children:"Aktivera Arvo Intelligence"})]}),(0,$d.jsxs)(Tu,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Aktivera en g\xe5ng"}),(0,$d.jsx)("span",{children:"Arvo bevakar resten \u2014 klart p\xe5 2 min"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Aldrig utan er signatur"}),(0,$d.jsx)("span",{children:"ni beh\xe5ller full kontroll"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Betala bara n\xe4r ni sparat"}),(0,$d.jsx)("span",{children:"Switch: 0 kr tills bytet \xe4r klart"})]})]})]}),(0,$d.jsx)(Pu,{children:(0,$d.jsxs)(Du,{$visible:d,children:[(0,$d.jsxs)("div",{className:"tl-head",children:[(0,$d.jsx)("span",{className:"tl-brand",children:"Arvo Intelligence"}),(0,$d.jsxs)("span",{className:"tl-status",children:[(0,$d.jsx)(bu,{name:"check",size:11,stroke:3})," Exempel"]})]}),(0,$d.jsxs)("div",{className:"tl-body",children:[(0,$d.jsxs)("div",{className:"tl-step",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"2 maj \xb7 08:14"}),(0,$d.jsx)("span",{className:"tl-title",children:"Smygh\xf6jning identifierad"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Telia h\xf6jde er mobilflotta med 11\xa0% \u2014 utan att avisera"})]})]}),(0,$d.jsxs)("div",{className:"tl-step",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"4 maj"}),(0,$d.jsx)("span",{className:"tl-title",children:"Ni godk\xe4nde \xe5tg\xe4rden"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Arvo genomf\xf6rde resten \u2014 ni beh\xf6vde inte agera"})]})]}),(0,$d.jsxs)("div",{className:"tl-step done",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"9 maj"}),(0,$d.jsx)("span",{className:"tl-title",children:"Nytt pris bekr\xe4ftat"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Priset s\xe4nkt 14\xa0% \u2014 besparingen s\xe4krad"})]})]})]}),(0,$d.jsxs)("div",{className:"tl-foot",children:[(0,$d.jsxs)("div",{className:"tl-saving",children:[(0,$d.jsx)("span",{className:"tl-saving-label",children:"S\xe4krad besparing"}),(0,$d.jsxs)("span",{className:"tl-saving-value",children:["21\xa0360\xa0kr",(0,$d.jsx)("span",{className:"unit",children:"/\xe5r"})]})]}),(0,$d.jsx)("button",{className:"tl-cta",children:"Se hur Arvo l\xf6ste det \u2192"})]})]})})]})]}),(0,$d.jsx)(_u,{"aria-hidden":"true",children:(0,$d.jsx)("svg",{viewBox:"0 0 1440 56",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,$d.jsx)("path",{d:"M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z"})})}),(0,$d.jsxs)(Ru,{id:"sakerhet",children:[(0,$d.jsxs)(Lu,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"lock",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Vi ser bara det ni delar"}),(0,$d.jsx)("p",{children:"Ni vidarebefordrar era leverant\xf6rsfakturor \u2014 inget annat. Kundfakturor, l\xf6nedata, bankkonton och personnummer n\xe5r oss aldrig."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{className:"group-label",children:"Vad vi ser"}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Avtal & f\xf6rfallodatum"]}),(0,$d.jsx)("li",{className:"group-label blocked",children:"N\xe5r oss aldrig"}),(0,$d.jsxs)("li",{className:"no",children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," L\xf6n & personnummer"]}),(0,$d.jsxs)("li",{className:"no",children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," Kundfakturor"]})]})]}),(0,$d.jsxs)(Lu,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"bolt",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Aktivera en g\xe5ng. Arvo tar resten."}),(0,$d.jsx)("p",{children:"Ni kopplar in Arvo en enda g\xe5ng. D\xe4refter fl\xf6dar varje ny leverant\xf6rsfaktura in automatiskt och bevakas i realtid \u2014 ni beh\xf6ver aldrig ladda upp n\xe5got manuellt."}),(0,$d.jsx)("strong",{children:"Klart p\xe5 2 minuter. Sen sk\xf6ter Arvo resten."})]}),(0,$d.jsxs)(Lu,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"trend",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Betala bara f\xf6r v\xe4rdet"}),(0,$d.jsx)("p",{children:"Arvo Switch \xe4r 100 % prestationsbaserat \u2014 20 % av identifierad besparing, fakturerat efter genomf\xf6rt byte. Hittar vi inget kostar Switch ingenting."}),(0,$d.jsx)("strong",{children:"Gratis att starta. Ni betalar n\xe4r ni sparat."})]})]}),(0,$d.jsx)(Ou,{children:(0,$d.jsxs)("div",{className:"inner",children:[(0,$d.jsxs)("div",{className:"eyebrow",children:[(0,$d.jsx)(bu,{name:"shield",size:13,stroke:2})," Rankningspolicy"]}),(0,$d.jsx)("h2",{children:"100 % oberoende. V\xe5r algoritm styrs av er besparing, inte provisioner."}),(0,$d.jsx)("p",{children:"Vi st\xe5r p\xe5 er sida, inte leverant\xf6rens. Genom fasta tak f\xf6r ers\xe4ttningar s\xe4kerst\xe4ller vi att v\xe5r algoritm alltid \xe4r objektiv och enbart prioriterar er besparing. Om en leverant\xf6r erbjuder mer \xe4n v\xe5rt tak, krediteras \xf6verskottet direkt till er. Det \xe4r matematisk transparens \u2014 inga dolda agendor, bara l\xe4gre kostnader."}),(0,$d.jsxs)(vl,{to:"/bias",className:"cta-link",children:["L\xe4s hur v\xe5r algoritm rankar ",(0,$d.jsx)(bu,{name:"arrow",size:15})]})]})}),(0,$d.jsxs)(Su,{id:"hur",children:[(0,$d.jsxs)(Iu,{$left:!0,children:[(0,$d.jsx)("span",{className:"kicker",children:"S\xe5 fungerar Arvo Flow"}),(0,$d.jsx)("h2",{children:"Aktivera en g\xe5ng. Vi sk\xf6ter resten."}),(0,$d.jsx)("p",{children:"Ni beh\xf6ver inte byta system, l\xe4ra er n\xe5got nytt eller komma ih\xe5g att kolla n\xe5got. Arvo h\xf6r av sig \u2014 ni beh\xf6ver inte fr\xe5ga."})]}),(0,$d.jsx)(Bu,{children:kp.map(e=>(0,$d.jsxs)(Mu,{children:[(0,$d.jsx)("span",{className:"step",children:e.step}),(0,$d.jsx)("h3",{children:e.title}),(0,$d.jsx)("p",{children:e.body}),(0,$d.jsx)("ul",{children:e.bullets.map(e=>(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2}),e]},e))})]},e.step))}),(0,$d.jsxs)(Uu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvo Score\u2122"}),(0,$d.jsx)("h3",{children:"Vad ber\xe4ttar ert Score om era leverant\xf6rsavtal?"}),(0,$d.jsx)("p",{children:"Varje kategori i er bokf\xf6ring f\xe5r ett Score mellan 0\u2013100. Scoren baseras p\xe5 hur ert avtalspris f\xf6rh\xe5ller sig till branschsnittet \u2014 fyra niv\xe5er avg\xf6r om ni \xe4r optimala eller betalar f\xf6r mycket."})]}),(0,$d.jsx)(Vu,{children:Sp.map(e=>(0,$d.jsxs)(Ku,{$color:e.color,children:[(0,$d.jsx)(wp,{score:e.score,color:e.color}),(0,$d.jsxs)("div",{className:"text",children:[(0,$d.jsx)("strong",{className:"level",children:e.label}),(0,$d.jsx)("p",{children:e.desc})]})]},e.label))})]}),(0,$d.jsx)(ep,{id:"intelligence",children:(0,$d.jsxs)(tp,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h2",{children:"Arvo m\xe4rker det innan det kostar er."}),(0,$d.jsx)("p",{className:"sub",children:"Bokf\xf6ringsprogram registrerar vad ni betalar. Arvo Intelligence kontaktar er n\xe4r ni h\xe5ller p\xe5 att betala f\xf6r mycket."}),(0,$d.jsxs)(np,{children:[(0,$d.jsxs)(rp,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(bu,{name:"pulse",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Smygh\xf6jningslarm"}),(0,$d.jsx)("p",{children:"Vi j\xe4mf\xf6r varje ny faktura mot f\xf6reg\xe5ende period. Avviker priset \u2014 kontaktar vi er samma dag."})]})]}),(0,$d.jsxs)(rp,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(bu,{name:"benchmark",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Community Benchmark"}),(0,$d.jsx)("p",{children:"Er prisdata m\xe4ts mot anonymiserade data fr\xe5n j\xe4mf\xf6rbara bolag i er bransch. Ni vet alltid om ni betalar r\xe4tt."})]})]}),(0,$d.jsxs)(rp,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(bu,{name:"calendar-clock",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Proaktiv avtalsbevakning"}),(0,$d.jsx)("p",{children:"90 dagar innan ett avtal f\xf6rnyas automatiskt varnar vi er \u2014 och f\xf6rhandlar p\xe5 er beg\xe4ran."})]})]})]})]}),(0,$d.jsxs)(lp,{ref:c,$visible:l,children:[(0,$d.jsxs)("div",{className:"preview-header",children:[(0,$d.jsxs)("span",{className:"preview-brand",children:[(0,$d.jsx)("span",{className:"live"})," Arvo Intelligence"]}),(0,$d.jsx)("span",{className:"preview-time",children:"Exempel ur en briefing"})]}),(0,$d.jsxs)("div",{className:"signal alert",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"pulse",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Smygh\xf6jningslarm"}),(0,$d.jsxs)("div",{className:"signal-line",children:["Telia \xb7 Mobilflotta 24 abonnemang",(0,$d.jsx)("span",{className:"badge up",children:"+11\xa0%"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Priset h\xf6jt mot f\xf6rra perioden \u2014 utan avisering."})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"benchmark",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Community Benchmark"}),(0,$d.jsx)("div",{className:"bench-grid","aria-hidden":"true",children:Array.from({length:15}).map((e,t)=>(0,$d.jsx)("span",{className:Np.has(t)?"on":"",style:{transitionDelay:560+38*t+"ms"}},t))}),(0,$d.jsxs)("p",{className:"signal-sub",children:[(0,$d.jsx)("strong",{children:"8 av 15"})," bolag i samma kohort fick h\xf6jningen \u2014 Arvo ser m\xf6nstret innan det n\xe5r er."]})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"calendar-clock",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Avtalsbevakning"}),(0,$d.jsxs)("div",{className:"signal-line sm",children:["Avtalet f\xf6rnyas automatiskt om ",(0,$d.jsx)("strong",{children:"23\xa0dagar"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Arvo hinner omf\xf6rhandla innan bindningen l\xe5ses \xe4nnu ett \xe5r."})]})]}),(0,$d.jsxs)("div",{className:"alert-saving",children:[(0,$d.jsx)("div",{className:"saving-label",children:"Identifierad besparing"}),(0,$d.jsxs)("div",{className:"saving-amount",children:["21\xa0360\xa0kr",(0,$d.jsx)("span",{className:"unit",children:"/\xe5r"})]})]}),(0,$d.jsxs)("div",{className:"alert-actions",children:[(0,$d.jsx)("button",{className:"btn-primary",children:"Ja, Arvo agerar \u2192"}),(0,$d.jsx)("button",{className:"btn-secondary",children:"Visa underlag"})]})]})]})}),(0,$d.jsxs)(sp,{id:"prisintelligens",children:[(0,$d.jsxs)(cp,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvos prisintelligens"}),(0,$d.jsx)("h2",{children:"Vi vet vad era leverant\xf6rer tar av andra."}),(0,$d.jsx)("p",{children:"Varje faktura Arvo analyserar \xe4r en ny datapunkt. Vi vet inte bara vad Telia listar p\xe5 sin hemsida \u2014 vi vet vad de faktiskt tar betalt av bolag i er bransch och er storlek. H\xe4r \xe4r hela er leverant\xf6rsportf\xf6lj, m\xe4tt mot marknaden p\xe5 en och samma skala."})]}),(0,$d.jsx)(zp,{}),(0,$d.jsx)(dp,{children:"Ju fler fakturor Arvo ser, desto mer vet vi \u2014 och desto vassare blir varje rekommendation. Ett f\xf6rspr\xe5ng som inte g\xe5r att kopiera."}),(0,$d.jsx)(up,{children:"Visualiseringen \xe4r illustrativ \u2014 prisintervall baserade p\xe5 verifierade marknadsdata maj 2026."})]}),(0,$d.jsxs)(Su,{id:"priser",children:[(0,$d.jsxs)(Iu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Pris"}),(0,$d.jsx)("h2",{children:"Bevakning p\xe5 prenumeration. Genomf\xf6rt byte vid behov."}),(0,$d.jsx)("p",{children:"V\xe4lj det som passar er \u2014 eller kombinera b\xe5da."})]}),(0,$d.jsxs)(bp,{children:[(0,$d.jsxs)(yp,{$featured:!0,children:[(0,$d.jsx)("div",{className:"tier-badge",children:"Arvo Intelligence"}),(0,$d.jsx)("h3",{children:"Er proaktiva finansdirekt\xf6r."}),(0,$d.jsxs)("div",{className:"tier-price",children:["1\xa0995 kr",(0,$d.jsx)("span",{className:"period",children:"/ m\xe5n"})]}),(0,$d.jsx)("p",{className:"tier-tagline",children:"L\xf6pande bevakning av samtliga leverant\xf6rsfakturor. Arvo h\xf6r av sig \u2014 ni beh\xf6ver inte fr\xe5ga."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Smygh\xf6jningslarm \u2014 avvikelse detekteras direkt"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Community Benchmark mot er bransch"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Avtalsbevakning med 90-dagarsvarning"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," M\xe5nadsvis briefing med konkreta insikter"]})]}),(0,$d.jsx)(Id,{as:vl,to:"/intelligence",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},children:"Aktivera Arvo Intelligence \u2192"}),(0,$d.jsx)("p",{className:"tier-note",children:"Ingen bindningstid \xb7 Kom ig\xe5ng p\xe5 2 minuter"})]}),(0,$d.jsxs)(yp,{children:[(0,$d.jsx)("div",{className:"tier-badge",children:"Arvo Switch"}),(0,$d.jsx)("h3",{children:"Genomf\xf6rt leverant\xf6rsbyte."}),(0,$d.jsxs)("div",{className:"tier-price",children:["20 %",(0,$d.jsx)("span",{className:"period",children:"av besparing"})]}),(0,$d.jsx)("p",{className:"tier-tagline",children:"Varje pris verifieras mot leverant\xf6rens officiella avtalspris \u2014 ni godk\xe4nner, Arvo f\xf6rbereder bytet."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Identifierad besparing bekr\xe4ftas med verifierade marknadsdata"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Ni godk\xe4nner varje byte med BankID"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Fr.o.m. \xe5r 2 tillfaller hela besparingen er"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Hittar vi inget \u2014 kostar det inget"]})]}),(0,$d.jsx)(Id,{as:vl,to:"/testa-faktura",$variant:"secondary",$size:"lg",style:{width:"100%",justifyContent:"center"},children:"Testa med en faktura \u2192"}),(0,$d.jsxs)("div",{className:"tier-addon",children:[(0,$d.jsx)("strong",{children:"Till\xe4gg f\xf6r Intelligence-kunder"}),"Aktivera ett byte direkt fr\xe5n er m\xe5nadsbriefing. 20 % av realiserad besparing."]})]})]})]}),(0,$d.jsxs)(Su,{id:"founding-members",children:[(0,$d.jsxs)(Iu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Founding Members \xb7 Begr\xe4nsade platser"}),(0,$d.jsx)("h2",{children:"Vill du vara f\xf6rst ut?"}),(0,$d.jsx)("p",{children:"Vi tar in 50 svenska f\xf6retag innan publik lansering. Du f\xe5r personlig onboarding direkt med grundarna, tj\xe4nsten gratis de f\xf6rsta 6 m\xe5naderna, och p\xe5verkan \xf6ver vilka kategorier vi prioriterar h\xe4rn\xe4st."})]}),(0,$d.jsxs)(qu,{children:[(0,$d.jsxs)(Yu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Founding Member"}),(0,$d.jsx)("h2",{children:"50 platser. Du f\xe5r p\xe5verkan."}),(0,$d.jsx)("p",{className:"lede",children:"Vi sl\xe4pper Arvo Flow stegvis. Founding Members f\xe5r tillg\xe5ng f\xf6rst, tj\xe4nsten helt gratis de f\xf6rsta 6 m\xe5naderna, och hj\xe4lper oss prioritera vilka leverant\xf6rskategorier som ska in h\xe4rn\xe4st."}),(0,$d.jsxs)("ul",{className:"benefits",children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})," Personlig onboarding direkt med grundarna \u2014 30 min Teams"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})," Tj\xe4nsten \xe4r helt gratis de f\xf6rsta 6 m\xe5naderna \u2014 ingen success-fee, inga avgifter"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})," Du r\xf6star p\xe5 vilka kategorier vi \xf6ppnar n\xe4sta kvartal"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})," Garanterad f\xf6rtur till f\xf6rs\xe4krings\xadbyten n\xe4r FI-licensen \xe4r klar"]})]})]}),"success"===i?(0,$d.jsxs)(Qu,{children:[(0,$d.jsx)("div",{className:"check",children:(0,$d.jsx)(bu,{name:"check",size:28,stroke:2.5})}),(0,$d.jsx)("h3",{children:"Tack \u2014 du st\xe5r p\xe5 listan."}),(0,$d.jsx)("p",{children:"Vi h\xf6r av oss inom 48 timmar f\xf6r att boka en kort onboarding och hj\xe4lpa dig komma ig\xe5ng."})]}):(0,$d.jsxs)(Gu,{onSubmit:async t=>{t.preventDefault();const n=(e=>{const t={};return e.company.trim()||(t.company="F\xf6retagsnamn saknas."),e.name.trim()||(t.name="Namn saknas."),e.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.trim())||(t.email="E-postadressen ser inte r\xe4tt ut."):t.email="E-post saknas.",t})(e);if(a(n),!(Object.keys(n).length>0)){o("submitting");try{const t=await fetch("/api/founding-member",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company:e.company.trim(),name:e.name.trim(),email:e.email.trim(),referrer:"undefined"!==typeof document&&document.referrer||null,timestamp:(new Date).toISOString()})});if(!t.ok)throw new Error("API "+t.status);o("success")}catch(r){o("error")}}},noValidate:!0,children:[(0,$d.jsxs)("label",{children:["F\xf6retagsnamn",(0,$d.jsx)("input",{type:"text",name:"company",required:!0,autoComplete:"organization",placeholder:"t.ex. Lindberg VVS AB",value:e.company,onChange:e=>t(t=>({...t,company:e.target.value})),"aria-invalid":!!n.company||void 0,disabled:"submitting"===i}),n.company&&(0,$d.jsx)("span",{className:"error",children:n.company})]}),(0,$d.jsxs)("label",{children:["Namn",(0,$d.jsx)("input",{type:"text",name:"name",required:!0,autoComplete:"name",placeholder:"t.ex. Johan Lindberg",value:e.name,onChange:e=>t(t=>({...t,name:e.target.value})),"aria-invalid":!!n.name||void 0,disabled:"submitting"===i}),n.name&&(0,$d.jsx)("span",{className:"error",children:n.name})]}),(0,$d.jsxs)("label",{children:["E-post",(0,$d.jsx)("input",{type:"email",name:"email",required:!0,autoComplete:"email",placeholder:"johan@lindbergvvs.se",value:e.email,onChange:e=>t(t=>({...t,email:e.target.value})),"aria-invalid":!!n.email||void 0,disabled:"submitting"===i}),n.email&&(0,$d.jsx)("span",{className:"error",children:n.email})]}),(0,$d.jsxs)(Id,{type:"submit",$variant:"gradient",$size:"lg",disabled:"submitting"===i,children:["submitting"===i?"Skickar\u2026":"Reservera min plats","submitting"!==i&&(0,$d.jsx)(bu,{name:"arrow",size:18})]}),"error"===i&&(0,$d.jsx)("span",{className:"error",children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen eller mejla hej@arvoflow.se."}),(0,$d.jsx)("p",{className:"fineprint",children:"Vi anv\xe4nder dina uppgifter enbart f\xf6r att kontakta dig om Founding Member-platsen och raderar dem om du tackar nej. Inga utskick utan ditt godk\xe4nnande."})]})]})]}),(0,$d.jsxs)(Su,{id:"faq",children:[(0,$d.jsxs)(Iu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Vanliga fr\xe5gor"}),(0,$d.jsx)("h2",{children:"Det vi f\xe5r oftast \u2014 rakt p\xe5."})]}),(0,$d.jsx)(Ju,{children:$p.map((e,t)=>(0,$d.jsxs)(Xu,{children:[(0,$d.jsx)("summary",{children:e.q}),(0,$d.jsx)("p",{children:e.a})]},e.q))})]}),(0,$d.jsxs)(Zu,{children:[(0,$d.jsx)("h2",{children:"Betalar ni f\xf6r mycket just nu?"}),(0,$d.jsx)("p",{children:"Ni vet det inte f\xf6rr\xe4n Arvo har tittat. Ladda upp en faktura p\xe5 60 sekunder \u2014 vi visar er exakt var ni st\xe5r mot branschsnittet."}),(0,$d.jsx)("div",{className:"actions",children:(0,$d.jsxs)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"lg",children:["Testa med en faktura ",(0,$d.jsx)(bu,{name:"arrow",size:18})]})}),(0,$d.jsx)("div",{className:"fineprint",children:"Inga kreditkortsuppgifter. Ingen bindningstid. Avsluta n\xe4r ni vill."})]}),(0,$d.jsx)(xu,{})]})},Cp=jd`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,Fp=vd.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 60%),
    radial-gradient(circle at 0% 100%, ${e=>{let{theme:t}=e;return t.color.accentSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,Tp=vd.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`,Pp=vd.div`
  width: 100%;
  max-width: 640px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  animation: ${Cp} 0.5s ease both;
  @media (max-width: 600px) { padding: 32px 24px; }
`,Dp=vd.div`
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
`,Rp=vd.h1`
  margin-top: 14px;
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
`,Lp=vd.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Op=(vd.div`
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
`,vd.div`
  margin-top: 24px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow:
    0 0 0 1px rgba(27, 122, 110, 0.10),
    0 4px 16px rgba(14, 26, 23, 0.07);
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`),Ip=vd.div`
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
`,Bp=vd.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  svg { color: ${e=>{let{theme:t}=e;return t.color.brand}}; opacity: 0.7; }
`,Mp=vd.div`
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
`,Up=vd.div`
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
`,Vp=vd.div`
  margin-top: 22px;
  padding: 14px 16px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`,Kp=vd.div`
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
`,Hp=vd.div`
  margin-top: 24px;
`,Wp=vd.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin-bottom: 10px;
`,qp=vd.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`,Yp=vd.label`
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
`,Gp=vd.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Qp=vd.button`
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
`,Jp=(vd.ul`
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
`,vd.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`),Xp=vd.p`
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
`,Zp=vd.label`
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
`,eh=vd.p`
  margin-top: 8px;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  display: flex;
  align-items: center;
  gap: 6px;
`,th=jd`
  to { transform: rotate(360deg); }
`,nh=vd.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${th} 0.7s linear infinite;
`,rh=()=>{const e=po(),[t,n]=(0,r.useState)("fortnox"),[a,i]=(0,r.useState)(!1),[o,l]=(0,r.useState)(!1),[s,c]=(0,r.useState)(!1),[d,u]=(0,r.useState)(!1),[p,h]=(0,r.useState)("konsult"),[f,m]=(0,r.useState)(5);return(0,$d.jsxs)(Fp,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsx)(Tp,{children:(0,$d.jsxs)(Pp,{children:[(0,$d.jsxs)(Dp,{children:[(0,$d.jsx)("span",{className:"dot"})," Steg 1 av 3 \xb7 Anslut bokf\xf6ring"]}),(0,$d.jsx)(Rp,{children:"Koppla din bokf\xf6ring"}),(0,$d.jsx)(Lp,{children:"60 sekunders koppling via Fortnox eller Visma \u2014 och du kan st\xe4nga av den lika snabbt."}),(0,$d.jsxs)(Op,{children:[(0,$d.jsxs)(Ip,{$allow:!0,children:[(0,$d.jsxs)("span",{className:"head",children:[(0,$d.jsx)("div",{className:"dot",children:"\u2713"})," Vi l\xe4ser"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor (konton 4xxx\u20137xxx)"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Avtalskategorier & f\xf6rfallodatum"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Belopp & betalningshistorik"]})]})]}),(0,$d.jsxs)(Ip,{children:[(0,$d.jsxs)("span",{className:"head",children:[(0,$d.jsx)("div",{className:"dot",children:"\u2717"})," Vi l\xe4ser inte"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," Kundfakturor & int\xe4kter"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," L\xf6nedata & personnummer"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," Bankkonton & kassafl\xf6de"]})]})]})]}),(0,$d.jsxs)(Mp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"V\xe5rt l\xf6fte \u2014 hittar vi inga \xf6verpriser p\xe5 30 dagar?"}),(0,$d.jsx)("span",{children:"D\xe5 \xe4r ditt bolag redan optimerat. Vi raderar Fortnox-kopplingen och all din data automatiskt \u2014 du har inte betalat en krona."})]})]}),(0,$d.jsxs)(Hp,{children:[(0,$d.jsx)(Wp,{children:"Ber\xe4tta lite om bolaget"}),(0,$d.jsxs)(qp,{children:[(0,$d.jsxs)(Yp,{children:[(0,$d.jsx)("span",{className:"label",children:"Bransch"}),(0,$d.jsxs)("select",{value:p,onChange:e=>h(e.target.value),children:[(0,$d.jsx)("option",{value:"ehandel",children:"E-handel & Detaljhandel"}),(0,$d.jsx)("option",{value:"tillverkning",children:"Industri & Tillverkning"}),(0,$d.jsx)("option",{value:"it-tech",children:"IT, Tech & Mjukvara"}),(0,$d.jsx)("option",{value:"bygg",children:"Bygg, Hantverk & Fastighet"}),(0,$d.jsx)("option",{value:"hotell",children:"Hotell, Restaurang & Event"}),(0,$d.jsx)("option",{value:"konsult",children:"Konsult & F\xf6retagstj\xe4nster"}),(0,$d.jsx)("option",{value:"transport",children:"Transport & Logistik"}),(0,$d.jsx)("option",{value:"vard",children:"V\xe5rd, Omsorg & H\xe4lsa"}),(0,$d.jsx)("option",{value:"ovrigt",children:"\xd6vrigt / Annan bransch"})]})]}),(0,$d.jsxs)(Yp,{children:[(0,$d.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$d.jsx)("input",{type:"number",min:"1",max:"5000",value:f,onChange:e=>m(Number(e.target.value))})]})]})]}),(0,$d.jsxs)(Gp,{children:[(0,$d.jsxs)(Qp,{$active:"fortnox"===t,onClick:()=>n("fortnox"),children:[(0,$d.jsx)("span",{className:"badge",children:"Vanligast"}),(0,$d.jsx)(bu,{name:"fortnox",size:22,color:"#0F5132"}),(0,$d.jsx)("strong",{children:"Fortnox"}),(0,$d.jsx)("span",{children:"Direkt OAuth-koppling"})]}),(0,$d.jsxs)(Qp,{$active:"visma"===t,onClick:()=>n("visma"),children:[(0,$d.jsx)("span",{className:"badge",children:"Inom kort"}),(0,$d.jsx)(bu,{name:"fortnox",size:22,color:"#0F5132"}),(0,$d.jsx)("strong",{children:"Visma eEkonomi"}),(0,$d.jsx)("span",{children:"Lanseras inom kort"})]})]}),(0,$d.jsxs)(Vp,{children:[(0,$d.jsxs)(Kp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"bankid",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"BankID"}),(0,$d.jsx)("span",{children:"S\xe4ker identifiering"})]}),(0,$d.jsxs)(Kp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"shield",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"GDPR"}),(0,$d.jsx)("span",{children:"Fullt regelefterlevnad"})]}),(0,$d.jsxs)(Kp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"lock",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"AES-256"}),(0,$d.jsx)("span",{children:"Krypterad i vila & i transport"})]}),(0,$d.jsxs)(Kp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.2})}),(0,$d.jsx)("strong",{children:"Sverige"}),(0,$d.jsx)("span",{children:"Data hos Bahnhof, Stockholm"})]})]}),(0,$d.jsxs)(Up,{children:[(0,$d.jsx)("div",{className:"live"}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("strong",{children:"1 247"})," leverant\xf6rsfakturor analyserade denna vecka"]})]}),(0,$d.jsxs)(Zp,{$error:d&&!s,children:[(0,$d.jsx)("input",{type:"checkbox",checked:s,onChange:e=>{c(e.target.checked),e.target.checked&&u(!1)},"aria-describedby":"consent-text"}),(0,$d.jsxs)("span",{className:"text",id:"consent-text",children:["Jag accepterar ",(0,$d.jsx)(vl,{to:"/villkor",children:"de allm\xe4nna villkoren"})," och"," ",(0,$d.jsx)(vl,{to:"/integritet",children:"integritetspolicyn"})," och bekr\xe4ftar att jag har beh\xf6righet att utf\xe4rda fullmakt f\xf6r f\xf6retaget."]})]}),d&&!s&&(0,$d.jsxs)(eh,{children:[(0,$d.jsx)(bu,{name:"lock",size:12,stroke:2.4}),"Du m\xe5ste godk\xe4nna villkoren innan du g\xe5r vidare."]}),o&&(0,$d.jsxs)(eh,{as:"div",style:{background:"rgba(27,122,110,0.08)",color:"#1B7A6E"},children:[(0,$d.jsx)(bu,{name:"check",size:12,stroke:2.4}),"Visma-kopplingen lanseras inom kort \u2014 vi har noterat ert intresse och h\xf6r av oss. Tills dess: ",(0,$d.jsx)(vl,{to:"/testa-faktura",style:{color:"#1B7A6E",fontWeight:600},children:"analysera en faktura direkt"}),"."]}),(0,$d.jsxs)(Jp,{children:[(0,$d.jsx)(Id,{$variant:"gradient",$size:"lg",onClick:()=>{if(s){if("fortnox"===t){i(!0);const e=new URLSearchParams({industry:p,employees:String(f)});return void(window.location.href=`/api/fortnox/auth?${e}`)}fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:"visma_connect",industry:p,employees:f})}).catch(()=>{}),l(!0)}else u(!0)},disabled:a,$full:!0,children:a?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(nh,{})," Ansluter till ","fortnox"===t?"Fortnox":"Visma","\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Anslut ","fortnox"===t?"Fortnox":"Visma"," ",(0,$d.jsx)(bu,{name:"arrow",size:18})]})}),(0,$d.jsxs)(Bp,{children:[(0,$d.jsx)(bu,{name:"lock",size:12,stroke:2.2}),"Du skickas nu till ","fortnox"===t?"Fortnox":"Visma"," f\xf6r att godk\xe4nna l\xe4s\xe5tkomst. Inga \xe4ndringar g\xf6rs i din bokf\xf6ring."]}),(0,$d.jsx)(Id,{$variant:"ghost",$size:"md",onClick:()=>e("/"),children:"Tillbaka"})]}),(0,$d.jsxs)(Xp,{children:["L\xe4s ",(0,$d.jsx)(vl,{to:"/villkor",style:{textDecoration:"underline"},children:"allm\xe4nna villkoren"}),", v\xe5r ",(0,$d.jsx)(vl,{to:"/integritet",style:{textDecoration:"underline"},children:"integritetspolicy"})," ","och ",(0,$d.jsx)(vl,{to:"/cookies",style:{textDecoration:"underline"},children:"cookie-policy"}),"."]})]})})]})},ah=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,ih=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,oh=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 96px 28px 56px;
  text-align: center;
  animation: ${ah} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 32px; }
`,lh=vd.span`
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
`,sh=vd.h1`
  margin-top: 22px;
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,ch=vd.p`
  margin: 22px auto 0;
  max-width: 640px;
  font-size: 18px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.55;
`,dh=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 28px;
  @media (max-width: 740px) { padding: 32px 20px; }
`,uh=vd.div`
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
`,ph=(vd.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,vd.div`
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
`,vd.h2`
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
`),hh=vd.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin-bottom: 12px;
`,fh=vd.p`
  font-size: 16.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 640px;
  line-height: 1.55;
  margin-bottom: 32px;
`,mh=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
`,gh=vd.div`
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
`,xh=vd.section`
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
`,vh=[{cat:"F\xf6retagsf\xf6rs\xe4kring",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Elavtal",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Mobilabonnemang",detail:"Per abonnemang som flyttas",cap:"120 kr"},{cat:"F\xf6retagsbredband",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Kortterminal",detail:"Per genomf\xf6rt byte",cap:"400 kr"},{cat:"Fakturatj\xe4nst",detail:"Per genomf\xf6rt byte",cap:"300 kr"},{cat:"Yrkesansvarsf\xf6rs\xe4kring",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"F\xf6retagsleasing",detail:"Per genomf\xf6rt byte",cap:"500 kr"}],bh=()=>(0,$d.jsxs)(ih,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(oh,{children:[(0,$d.jsxs)(lh,{children:[(0,$d.jsx)("span",{className:"dot"})," Rankningspolicy \xb7 Senast uppdaterad 2026-04-24"]}),(0,$d.jsxs)(sh,{children:["Vi rankar leverant\xf6rer p\xe5 ",(0,$d.jsx)("em",{children:"din"})," totalkostnad \u2014 inte v\xe5r provision."]}),(0,$d.jsx)(ch,{children:'Det h\xe4r \xe4r hela v\xe5r policy. Inga undantag, inga gr\xe5zoner, inga "premium-partners". Om en journalist en dag granskar oss vill vi att de hittar exakt det vi skrev h\xe4r.'})]}),(0,$d.jsxs)(dh,{children:[(0,$d.jsx)(hh,{children:"De fyra reglerna"}),(0,$d.jsx)(ph,{children:"Hur vi f\xf6rhindrar bias fr\xe5n dag 1."}),(0,$d.jsx)(fh,{children:"Affiliate-int\xe4kter \xe4r bra f\xf6r aff\xe4rsmodellen \u2014 men en uppenbar intressekonflikt mot kunden. Vi l\xf6ste det strukturellt, inte bara i marknadsf\xf6ringstexten."}),(0,$d.jsxs)(uh,{children:[(0,$d.jsx)("div",{className:"num",children:"1"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"V\xe5r algoritm \xe4r publik. Och deterministisk."}),(0,$d.jsxs)("p",{children:["Vi rankar varje f\xf6rslag p\xe5 ",(0,$d.jsx)("strong",{children:"total cost of ownership \xf6ver 24 m\xe5nader minus switching cost"}),". Den som ger dig flest kronor \xf6ver p\xe5 kontot vinner \u2014 alltid. Affiliate-storlek \xe4r inte ett ing\xe5ngsv\xe4rde i scoring-funktionen."]}),(0,$d.jsxs)("pre",{children:["score(provider) =\n    annualCost(provider) * 2\n  + switchingCost(provider)        // eng\xe5ngskostnader, etablering, portering\n  - reliabilityBonus(provider)     // SLA, supportkvalitet (publik benchmark)\n  - coverageMatch(provider)        // % av nuvarande t\xe4ckning som beh\xe5lls\n\n",(0,$d.jsx)("b",{children:"// Affiliate-rate \xe4r aldrig en variabel i scoringen.\n// L\xe4gst score vinner. Vid likast\xe5nd: l\xe4gst nominellt pris f\xf6r dig."})]})]})]}),(0,$d.jsxs)(uh,{children:[(0,$d.jsx)("div",{className:"num",children:"2"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Affiliate-int\xe4kten \xe4r kapad \u2014 \xf6verskott g\xe5r till dig."}),(0,$d.jsx)("p",{children:"Vi accepterar en fast, kapad affiliate-avgift per leverant\xf6rskategori (se tabellen nedan). Om en leverant\xf6r vill betala mer f\xf6r att vinna oftare \u2014 d\xe5 har vi inte r\xe4tten att tj\xe4na mer p\xe5 det. \xd6verskottet l\xe4ggs i en kundbonus-pool och krediteras tillbaka p\xe5 din Besparingsavgift."})]})]}),(0,$d.jsxs)(uh,{children:[(0,$d.jsx)("div",{className:"num",children:"3"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Ett erbjudande. Inga val, inga kr\xe5ngel."}),(0,$d.jsxs)("p",{children:["Vi tar ",(0,$d.jsx)("strong",{children:"20 % av identifierad besparing"})," \u2014 en eng\xe5ngsavgift som faktureras 3 m\xe5nader efter aktiverat avtal. Det \xe4r det enda du beh\xf6ver godk\xe4nna."]}),(0,$d.jsx)("p",{children:"Om affiliate-int\xe4kter fr\xe5n leverant\xf6rer \xf6verstiger de tak som anges i tabellen nedan, krediteras \xf6verskottet automatiskt tillbaka till dig \u2014 du beh\xf6ver inte v\xe4lja, beg\xe4ra eller ens h\xe5lla koll. Systemet sk\xf6ter det."})]})]}),(0,$d.jsxs)(uh,{children:[(0,$d.jsx)("div",{className:"num",children:"4"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Vi publicerar v\xe5ra rekommendationsstatistik kvartalsvis."}),(0,$d.jsx)("p",{children:"Varje kvartal publiceras hur ofta varje leverant\xf6r rekommenderas, hur mycket affiliate som faktiskt utbetalats, och hur stor andel av besparing-poolen som rabatterats. Granska oss. Det g\xf6r branschen \xe4rligare."})]})]})]}),(0,$d.jsxs)(dh,{children:[(0,$d.jsx)(hh,{children:"Affiliate-tak per kategori"}),(0,$d.jsx)(ph,{children:"Det h\xe4r \xe4r max vi f\xe5r ta \u2014 oavsett vad leverant\xf6ren vill betala."}),(0,$d.jsx)(fh,{children:"Taken \xe4r satta f\xf6r att rymma normal industri-affiliate utan att skapa incitament att favorisera en viss leverant\xf6r."}),(0,$d.jsxs)(mh,{children:[(0,$d.jsxs)(gh,{className:"header",children:[(0,$d.jsx)("div",{children:"Kategori"}),(0,$d.jsx)("div",{children:"M\xe4tpunkt"}),(0,$d.jsx)("div",{style:{textAlign:"right"},children:"Tak"})]}),vh.map(e=>(0,$d.jsxs)(gh,{children:[(0,$d.jsx)("div",{className:"cat",children:e.cat}),(0,$d.jsx)("div",{className:"detail",children:e.detail}),(0,$d.jsx)("div",{className:"cap",children:e.cap})]},e.cat))]})]}),(0,$d.jsxs)(xh,{children:[(0,$d.jsx)("h2",{children:"Det h\xe4r \xe4r inte marknadsf\xf6ring. Det h\xe4r \xe4r arkitektur."}),(0,$d.jsxs)("p",{children:["Om du uppt\xe4cker att vi bryter mot n\xe5gon av reglerna ovan \u2014 mejla"," ",(0,$d.jsx)("a",{href:"mailto:transparens@arvo.flow",style:{textDecoration:"underline"},children:"transparens@arvo.flow"}),". Vi svarar inom 48 h, publikt."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsxs)(Id,{as:vl,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$d.jsx)(bu,{name:"arrow",size:18})]}),(0,$d.jsx)(Id,{as:vl,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(xu,{})]}),yh=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,kh=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,jh=vd.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 28px 40px;
  text-align: center;
  animation: ${yh} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 28px; }
`,wh=vd.span`
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
`,Sh=vd.h1`
  margin-top: 22px;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,$h=vd.p`
  margin: 22px auto 0;
  max-width: 600px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,_h=vd.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 28px 64px;
  @media (max-width: 740px) { padding: 24px 20px 48px; }
`,Eh=vd.div`
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
`,zh=vd.section`
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
`,Nh=(vd.div`
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
`,vd.div`
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
`),Ah=vd.section`
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
`,Ch=(vd.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin-bottom: 10px;
`,vd.h2`
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-top: 56px;
  margin-bottom: 8px;
  &:first-child { margin-top: 0; }
`),Fh=vd.p`
  font-size: 15.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin-bottom: 20px;
`,Th=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
  margin: 16px 0 8px;
`,Ph=vd.div`
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
`,Dh=()=>(0,$d.jsxs)(kh,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(jh,{children:[(0,$d.jsxs)(wh,{children:[(0,$d.jsx)("span",{className:"dot"})," Allm\xe4nna villkor \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$d.jsxs)(Sh,{children:["Klart, kort och ",(0,$d.jsx)("em",{children:"p\xe5 din sida"}),"."]}),(0,$d.jsx)($h,{children:"Det h\xe4r \xe4r hela avtalet mellan dig och Arvo Flow AB. Inga fasta avgifter, inga uppstartsavgifter, ingen inl\xe5sning. Vi tj\xe4nar pengar bara n\xe4r du faktiskt sparar."})]}),(0,$d.jsxs)(_h,{children:[(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r beh\xf6ver du veta innan du signerar med BankID:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Ombudskap."})," Arvo Flow agerar som ditt f\xf6retags ombud f\xf6r att optimera och ing\xe5 avtal inom el, telefoni, bredband, f\xf6rs\xe4kring och leasing. Vi verifierar din beh\xf6righet mot Bolagsverket i realtid."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Besparingsarvode."})," Vi tar ingen fast avgift. V\xe5rt arvode \xe4r 20 % av besparingsunderlaget (skillnaden mellan ditt nya och ditt gamla avtal) under de f\xf6rsta 12 m\xe5naderna efter ett byte."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"\xc5ngerr\xe4tt."})," Du har 24 timmars \xe5ngerr\xe4tt fr\xe5n BankID-signering innan vi p\xe5b\xf6rjar skarpa byten hos leverant\xf6rerna."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Ingen inl\xe5sning."})," Du kan s\xe4ga upp Arvo Flow-tj\xe4nsten n\xe4r som helst med 30 dagars upps\xe4gningstid."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Datas\xe4kerhet."})," Vi l\xe4ser endast n\xf6dv\xe4ndig fakturadata via Fortnox. Vid avslut raderas din transaktionsdata inom 24 timmar."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Trygghet."})," V\xe5rt skadest\xe5ndsansvar \xe4r begr\xe4nsat till 12 m\xe5naders betalda avgifter, dock l\xe4gst 50 000 SEK."]})]})]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"1. Definitioner"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.1 Tj\xe4nsten."})," Den digitala plattformen Arvo Flow samt tillh\xf6rande ombudstj\xe4nster f\xf6r att optimera Kundens leverant\xf6rsavtal."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.2 Besparingsunderlag."})," Det belopp som ligger till grund f\xf6r Besparingsavgiften, motsvarande skillnaden i avtalskostnad exkl. moms \xf6ver en 12-m\xe5nadersperiod mellan Kundens tidigare avtal och det nya avtalet."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.3 Besparingsarvode."})," Det r\xf6rliga arvode om 20 % av Besparingsunderlaget som tillfaller Arvo Flow, fakturerat efter Kundens f\xf6rsta faktura fr\xe5n den nya leverant\xf6ren."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"2. Uppdraget och Fullmakt"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"2.1"})," Genom signering via BankID ger Kunden Arvo Flow fullmakt att inh\xe4mta uppgifter, s\xe4ga upp befintliga avtal samt ing\xe5 nya avtal f\xf6r Kundens r\xe4kning inom de kategorier Kunden aktiverat i Tj\xe4nsten."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"2.2 \xc5ngerfrist."})," Kunden har r\xe4tt att \xe5terkalla sin accept av dessa villkor inom 24 timmar fr\xe5n signering. Under \xe5ngerfristen p\xe5b\xf6rjar Arvo Flow inga skarpa upps\xe4gningar eller avtalstecknanden hos tredje part."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"3. Arvode och Betalning"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.1"})," Tj\xe4nsten baseras p\xe5 identifierad besparing. Inga fasta avgifter, uppstartsavgifter eller licensavgifter utg\xe5r."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.2"})," Besparingsavgiften faktureras som en eng\xe5ngsavgift, 3 m\xe5nader efter att det nya avtalet aktiverats. Fr.o.m. \xe5r 2 tillfaller hela besparingen Kunden."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.3 F\xf6rtida avslut av leverant\xf6rsavtal."})," Om Kunden v\xe4ljer att avsluta ett av Arvo Flow tecknat leverant\xf6rsavtal i f\xf6rtid, eller p\xe5 annat s\xe4tt f\xf6rhindrar Tj\xe4nstens utf\xf6rande, f\xf6rfaller Besparingsavgiften i sin helhet. Detta g\xe4ller ej om Kunden avbryter samarbetet p\xe5 grund av v\xe4sentligt avtalsbrott fr\xe5n Arvo Flows sida."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"4. Beh\xf6righet och Upps\xe4gning av Tj\xe4nsten"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"4.1 Firmateckningsverifiering."})," Arvo Flow verifierar via BankID-signaturens personnummer mot Bolagsverkets aktuella firmatecknarregister. Avtal ing\xe5s endast om verifieringen godk\xe4nns."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"4.2 Upps\xe4gning."})," Avtalet l\xf6per tills vidare. B\xe5da parter kan s\xe4ga upp Tj\xe4nsten med 30 dagars upps\xe4gningstid. Redan p\xe5b\xf6rjade avtalsbyten slutf\xf6rs och debiteras enligt avtal."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"5. Ansvarsbegr\xe4nsning och Risksenarier"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.1 Missad upps\xe4gning."})," Om Arvo Flow missar att s\xe4ga upp ett befintligt avtal i tid, ers\xe4tter Arvo Flow mellanskillnaden upp till vid var tid g\xe4llande ansvarstak."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.2 Dubbel-leverans."})," Om Kunden under en period har tv\xe5 parallella leverant\xf6rsavtal f\xf6r samma tj\xe4nst till f\xf6ljd av fel fr\xe5n Arvo Flow, meddelar Kunden Arvo Flow, varvid Arvo Flow krediterar framtida avgifter eller, efter Kundens \xf6nskem\xe5l, utf\xf6r \xe5terbetalning inom 30 dagar."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.3 Ansvarstak."})," Arvo Flows totala skadest\xe5ndsansvar \xe4r begr\xe4nsat till ett belopp motsvarande 100 % av de senaste 12 m\xe5nadernas betalda Besparingsavgifter, dock l\xe4gst 50 000 SEK. Arvo Flow ansvarar ej f\xf6r indirekta skador s\xe5som utebliven vinst, produktionsbortfall eller goodwill-skada."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"6. Force Majeure"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"6.1"})," Arvo Flow \xe4r befriat fr\xe5n p\xe5f\xf6ljd vid underl\xe5tenhet orsakad av pandemi, krig, cyberattack, myndighetsbeslut eller fel hos tredjepartsleverant\xf6r (t.ex. BankID, Fortnox, Visma eller leverant\xf6r vars system Tj\xe4nsten \xe4r beroende av) som ligger utanf\xf6r Arvo Flows kontroll."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"7. Data och Tvist"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"7.1 Personuppgifter."})," Personuppgiftsbehandling regleras i separat Personuppgiftsbitr\xe4desavtal (DPA), tillg\xe4nglig som bilaga till"," ",(0,$d.jsx)(vl,{to:"/integritet",children:"v\xe5r integritetspolicy"}),"."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"7.2 Tvist."})," Tvister med anledning av dessa villkor avg\xf6rs i Stockholms tingsr\xe4tt enligt svensk lag."]})]}),(0,$d.jsxs)(Nh,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Allm\xe4nna villkor v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$d.jsx)("br",{}),"Tidigare versioner finns tillg\xe4ngliga p\xe5 beg\xe4ran fr\xe5n"," ",(0,$d.jsx)("a",{href:"mailto:juridik@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"juridik@arvo.flow"}),"."]})]}),(0,$d.jsxs)(Ah,{children:[(0,$d.jsx)("h2",{children:"Fr\xe5gor p\xe5 villkoren?"}),(0,$d.jsxs)("p",{children:["Mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:juridik@arvo.flow",children:"juridik@arvo.flow"})," s\xe5 svarar vi inom 48 h. Vi har en svensk aff\xe4rsjurist som granskat varje klausul."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsxs)(Id,{as:vl,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$d.jsx)(bu,{name:"arrow",size:18})]}),(0,$d.jsx)(Id,{as:vl,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(xu,{})]}),Rh=()=>(0,$d.jsxs)(kh,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(jh,{children:[(0,$d.jsxs)(wh,{children:[(0,$d.jsx)("span",{className:"dot"})," Integritetspolicy & DPA \xb7 Version 1.4 \xb7 Senast uppdaterad 2026-05-19"]}),(0,$d.jsxs)(Sh,{children:["Du ",(0,$d.jsx)("em",{children:"\xe4ger"})," din data. Vi f\xf6rvaltar den."]}),(0,$d.jsx)($h,{children:"Vi l\xe4ser bara den fakturadata vi beh\xf6ver f\xf6r att hitta \xf6verpriser \u2014 inget annat. Vid avslut raderas allt inom 24 timmar. Det h\xe4r \xe4r hur, var och varf\xf6r."})]}),(0,$d.jsxs)(_h,{children:[(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller f\xf6r dig som kund hos Arvo Flow:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vi l\xe4ser endast leverant\xf6rsfakturor"})," via Fortnox eller Visma \u2014 inte kundfakturor, l\xf6ner, bankkonton eller personnummer p\xe5 anst\xe4llda."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Faktura-PDF:er lagras aldrig."})," Vi extraherar den data vi beh\xf6ver och kastar filen direkt \u2014 noll persistent lagring av PDF-inneh\xe5ll hos Arvo Flow. By design."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Data lagras i EU/EES"})," eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer (Standard Contractual Clauses). Krypterad i vila (AES-256) och i transport (TLS 1.3)."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Du kan n\xe4r som helst"})," beg\xe4ra utdrag, r\xe4ttelse eller radering av dina personuppgifter via ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vid avslut"})," raderas all transaktionsdata inom 24 timmar. Bokf\xf6ringsm\xe4ssiga underlag (fakturor p\xe5 v\xe5rt arvode) sparas i 7 \xe5r enligt bokf\xf6ringslagen."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vi s\xe4ljer aldrig din data."})," Vi delar den heller inte med leverant\xf6rer, annons\xf6rer eller andra tredje parter \u2014 ut\xf6ver de vi \xe4r bundna till f\xf6r att leverera Tj\xe4nsten."]})]})]})]}),(0,$d.jsx)(Ch,{children:"Integritetspolicy"}),(0,$d.jsx)(Fh,{children:"Den h\xe4r policyn beskriver hur Arvo Flow AB behandlar personuppgifter och f\xf6retagsuppgifter i samband med att vi levererar Tj\xe4nsten."}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"1. Personuppgiftsansvarig"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"}),", org.nr 559500-0000, \xe4r personuppgiftsansvarig f\xf6r de uppgifter vi samlar in om dig som kund eller bes\xf6kare. Kontakt:"," ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$d.jsx)("p",{children:"F\xf6r personuppgifter som behandlas p\xe5 Kundens uppdrag (t.ex. namn p\xe5 Kundens kontaktpersoner och firmatecknare) \xe4r Arvo Flow personuppgiftsbitr\xe4de \u2014 se DPA l\xe4ngre ner."})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"2. Vilka uppgifter vi behandlar"}),(0,$d.jsxs)(Th,{children:[(0,$d.jsxs)(Ph,{className:"header",children:[(0,$d.jsx)("div",{children:"Kategori"}),(0,$d.jsx)("div",{children:"Syfte & r\xe4ttslig grund"})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"F\xf6retagsuppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["Organisationsnummer, bolagsnamn, registreringsdatum. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."]})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Firmatecknarens uppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["Namn, personnummer (via BankID), beh\xf6righet enligt Bolagsverket. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"})," samt r\xe4ttslig f\xf6rpliktelse vid signering."]})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Kontaktuppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["E-post, telefon, namn p\xe5 kontaktpersoner. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r kundkommunikation, ",(0,$d.jsx)("em",{children:"samtycke"})," f\xf6r marknadsf\xf6ring."]})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Leverant\xf6rsfakturor"}),(0,$d.jsxs)("div",{className:"v",children:["Belopp, leverant\xf6r, kategori, f\xf6rfallodatum, fakturarader. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."," ","Anonymiserade uppgifter (belopp, leverant\xf6r, kategori) anv\xe4nds \xe4ven f\xf6r att bygga Arvo Flows branschindex \u2014 se \xa7 4 nedan. R\xe4ttslig grund f\xf6r indexanv\xe4ndning: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"}),"."]})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Faktura-PDF (uppladdning)"}),(0,$d.jsxs)("div",{className:"v",children:["PDF-filen konverteras till text i realtid via Anthropic API och raderas omedelbart \u2014 den lagras ",(0,$d.jsx)("strong",{children:"aldrig"})," p\xe5 Arvo Flows infrastruktur. Analysresultatet (extraherade siffror, inte PDF-inneh\xe5llet) cachas i 6 timmar f\xf6r att undvika on\xf6diga API-anrop. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r Tj\xe4nstens leverans."]})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Tekniska data"}),(0,$d.jsxs)("div",{className:"v",children:["IP-adress, webbl\xe4sare, sidvisningar (anonymiserat). R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r s\xe4kerhet och drift."]})]})]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsxs)("h3",{children:["3. Vad vi ",(0,$d.jsx)("em",{children:"inte"})," behandlar"]}),(0,$d.jsxs)("p",{children:["Vi har medvetet begr\xe4nsat datainsamlingen. Vi l\xe4ser ",(0,$d.jsx)("strong",{children:"aldrig"}),":"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"Kundfakturor eller int\xe4ktsdata"}),(0,$d.jsx)("li",{children:"L\xf6nedata eller personnummer p\xe5 anst\xe4llda"}),(0,$d.jsx)("li",{children:"Bankkontosaldon eller transaktionshistorik"}),(0,$d.jsx)("li",{children:"Kundregister eller CRM-data"}),(0,$d.jsx)("li",{children:"Inneh\xe5llet i e-postkorrespondens"})]}),(0,$d.jsx)("p",{children:"OAuth-scopen mot Fortnox och Visma \xe4r konfigurerade s\xe5 att vi tekniskt inte ens kan l\xe4sa kategorierna ovan, \xe4ven om vi ville."})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"4. Hur l\xe4nge vi sparar data"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Aktiv kund:"})," S\xe5 l\xe4nge avtalet l\xf6per."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Vid upps\xe4gning:"})," Transaktionsdata raderas inom 24 timmar."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Bokf\xf6ringsunderlag:"})," 7 \xe5r enligt bokf\xf6ringslagen (2 kap. 1 \xa7 BFL)."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Marknadsf\xf6ringssamtycke:"})," Tills du \xe5terkallar samtycket."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Faktura-PDF:"})," Lagras aldrig \u2014 raderas direkt efter AI-extraktering. Analysresultatet (JSON med siffror) cachas i 6 timmar, d\xe4refter auto-raderats."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Anonymiserad statistik (branschindex):"})," Belopp, leverant\xf6r och kategori fr\xe5n leverant\xf6rsfakturor anonymiseras och anv\xe4nds f\xf6r att ber\xe4kna marknadsmedian och prispercentiler per bransch och bolagsstorlek. Detta aggregerade index \xe4r grunden f\xf6r Tj\xe4nstens j\xe4mf\xf6relser och rekommendationer. Inga uppgifter kan h\xe4rledas till ett enskilt bolag. Sparas obegr\xe4nsat."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Anthropic API (AI-behandling):"})," Data behandlas via Anthropic API med 30 dagars radering f\xf6r Trust & Safety, utan att anv\xe4ndas f\xf6r modelltr\xe4ning."]})]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"5. Var data lagras & s\xe4kerhet"}),(0,$d.jsx)("p",{children:"All data lagras inom EU/EES, prim\xe4rt hos Bahnhof i Stockholm. Vi anv\xe4nder:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"AES-256 kryptering i vila"}),(0,$d.jsx)("li",{children:"TLS 1.3 f\xf6r all data\xf6verf\xf6ring"}),(0,$d.jsx)("li",{children:"Tv\xe5faktorautentisering f\xf6r all intern access"}),(0,$d.jsx)("li",{children:"Loggning av all access till kunddata (audit trail)"}),(0,$d.jsx)("li",{children:"Penetrationstester av oberoende part minst \xe5rligen"})]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"6. Dina r\xe4ttigheter (GDPR)"}),(0,$d.jsx)("p",{children:"Du har r\xe4tt att:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:["Beg\xe4ra ut ",(0,$d.jsx)("strong",{children:"registerutdrag"})," \xf6ver dina personuppgifter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"r\xe4ttelse"})," av felaktiga uppgifter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"radering"})," (r\xe4tten att bli gl\xf6md), inom de gr\xe4nser bokf\xf6ringslagen till\xe5ter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"begr\xe4nsning"})," av behandling"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Inv\xe4nda"})," mot behandling som sker p\xe5 ber\xe4ttigat intresse"]}),(0,$d.jsxs)("li",{children:["F\xe5 ut din data i ett ",(0,$d.jsx)("strong",{children:"strukturerat, maskinl\xe4sbart format"})," (dataportabilitet)"]}),(0,$d.jsxs)("li",{children:["L\xe4mna in ",(0,$d.jsx)("strong",{children:"klagom\xe5l till Integritetsskyddsmyndigheten"})," (IMY)"]})]}),(0,$d.jsxs)("p",{children:["Kontakta ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," \u2014 vi svarar inom 30 dagar."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"7. Underbitr\xe4den"}),(0,$d.jsx)("p",{children:"Vi anv\xe4nder f\xf6ljande underbitr\xe4den f\xf6r att leverera Tj\xe4nsten. Samtliga \xe4r bundna av DPA och behandlar uppgifter inom EU/EES eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer:"}),(0,$d.jsxs)(Th,{children:[(0,$d.jsxs)(Ph,{className:"header",children:[(0,$d.jsx)("div",{children:"Leverant\xf6r"}),(0,$d.jsx)("div",{children:"Funktion & \xf6verf\xf6ringsmekanism"})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Anthropic PBC"}),(0,$d.jsx)("div",{className:"v",children:"AI-analys av faktura-PDF \u2014 USA. SCC. 30 dagars radering, tr\xe4nar ej modeller p\xe5 API-data."})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Vercel Inc."}),(0,$d.jsx)("div",{className:"v",children:"Serverless funktioner & KV-cache \u2014 USA/EU. SCC. Analysresultat cachas max 6 timmar."})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Neon Inc."}),(0,$d.jsx)("div",{className:"v",children:"Postgres-databas (leads, offertf\xf6rfr\xe5gningar, branschindex) \u2014 USA. SCC."})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Resend Inc."}),(0,$d.jsx)("div",{className:"v",children:"Transaktionell e-post (bekr\xe4ftelser, interna larm) \u2014 USA. SCC."})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Bahnhof AB"}),(0,$d.jsx)("div",{className:"v",children:"Hosting / databas (planerad, full produkt) \u2014 Sverige"})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Scrive AB"}),(0,$d.jsx)("div",{className:"v",children:"BankID-signering (planerad) \u2014 Sverige"})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Fortnox / Visma"}),(0,$d.jsx)("div",{className:"v",children:"OAuth-koppling till bokf\xf6ring (planerad) \u2014 Sverige"})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Stripe Payments Europe"}),(0,$d.jsx)("div",{className:"v",children:"Betalningar & fakturering (planerad) \u2014 Irland"})]})]})]}),(0,$d.jsx)(Ch,{children:"Personuppgiftsbitr\xe4desavtal (DPA) \u2014 Bilaga"}),(0,$d.jsx)(Fh,{children:"Detta avtal g\xe4ller automatiskt n\xe4r du som Kund tecknar Tj\xe4nsten. Det reglerar Arvo Flows behandling av personuppgifter p\xe5 Kundens uppdrag (t.ex. uppgifter om Kundens kontaktpersoner)."}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"1. Parter"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Personuppgiftsansvarig:"})," Kunden."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Personuppgiftsbitr\xe4de:"})," Arvo Flow AB, org.nr 559500-0000."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"2. Omfattning"}),(0,$d.jsx)("p",{children:"Bitr\xe4det behandlar personuppgifter (kontaktuppgifter, fakturarader, personnummer f\xf6r firmateckning) f\xf6r att utf\xf6ra Tj\xe4nsten enligt Allm\xe4nna villkor."})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"3. Instruktion"}),(0,$d.jsxs)("p",{children:["Bitr\xe4det f\xe5r behandla uppgifter f\xf6r att (i) optimera avtal och fakturera enligt de ",(0,$d.jsx)(vl,{to:"/villkor",children:"Allm\xe4nna villkoren"}),", samt (ii) anonymisera och aggregera fakturauppgifter (belopp, leverant\xf6r, kategori) f\xf6r Tj\xe4nstens branschindex enligt \xa7 4 i Integritetspolicyn. Ytterligare instruktioner fr\xe5n Kunden ska vara skriftliga."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"4. S\xe4kerhet"}),(0,$d.jsx)("p",{children:"Bitr\xe4det ska vidta l\xe4mpliga tekniska och organisatoriska \xe5tg\xe4rder f\xf6r att skydda data mot oavsiktlig eller olaglig f\xf6rst\xf6relse, f\xf6rlust, \xe4ndring, obeh\xf6rigt r\xf6jande eller obeh\xf6rig \xe5tkomst (jfr GDPR art. 32). Detta inkluderar kryptering, \xe5tkomstkontroll, loggning och regelbunden s\xe4kerhetsgranskning enligt \xa7 5 i Integritetspolicyn ovan."})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"5. Underbitr\xe4den"}),(0,$d.jsx)("p",{children:"Kunden godk\xe4nner att Bitr\xe4det anv\xe4nder underbitr\xe4den enligt listan under \xa7 7 i Integritetspolicyn. Bitr\xe4det ska underr\xe4tta Kunden vid byte av underbitr\xe4de, varvid Kunden har r\xe4tt att inv\xe4nda inom 30 dagar."})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"6. Radering"}),(0,$d.jsx)("p",{children:"Vid upps\xe4gning av Tj\xe4nsten eller p\xe5 Kundens beg\xe4ran ska Bitr\xe4det radera eller anonymisera all transaktionsdata inom 24 timmar, s\xe5vida inte lag kr\xe4ver lagring (t.ex. bokf\xf6ringslagen f\xf6r fakturaunderlag)."})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"7. Personuppgiftsincident"}),(0,$d.jsx)("p",{children:"Bitr\xe4det ska utan on\xf6digt dr\xf6jsm\xe5l, dock senast 48 timmar efter det att Bitr\xe4det f\xe5tt k\xe4nnedom om en personuppgiftsincident som r\xf6r Kunden, meddela Kunden om incidenten samt vidtagna \xe5tg\xe4rder."})]}),(0,$d.jsxs)(Nh,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Integritetspolicy & DPA v1.4 \xb7 Senast uppdaterad 2026-05-19. ",(0,$d.jsx)("br",{}),"Fr\xe5gor: ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)(Ah,{children:[(0,$d.jsx)("h2",{children:"Vill du veta exakt vad vi har om dig?"}),(0,$d.jsxs)("p",{children:["Mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," s\xe5 f\xe5r du ett komplett registerutdrag inom 30 dagar \u2014 utan kostnad."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsx)(Id,{as:vl,to:"/villkor",$variant:"primary",$size:"lg",children:"L\xe4s allm\xe4nna villkor"}),(0,$d.jsx)(Id,{as:vl,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(xu,{})]}),Lh=()=>(0,$d.jsxs)(kh,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(jh,{children:[(0,$d.jsxs)(wh,{children:[(0,$d.jsx)("span",{className:"dot"})," Cookie-policy \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$d.jsxs)(Sh,{children:["Vi anv\xe4nder bara ",(0,$d.jsx)("em",{children:"n\xf6dv\xe4ndiga"})," cookies."]}),(0,$d.jsx)($h,{children:"Inga marknadsf\xf6ringspixlar, inga remarketing-taggar, ingen f\xf6rs\xe4ljning av din surfdata till tredje part. Bara det som kr\xe4vs f\xf6r att Tj\xe4nsten ska fungera och vara s\xe4ker."})]}),(0,$d.jsxs)(_h,{children:[(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller cookies p\xe5 arvo.flow och arvoflow.se:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndiga cookies"})," anv\xe4nds alltid \u2014 utan dem fungerar inte inloggning eller s\xe4ker session."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Anonymiserad statistik"})," samlas in f\xf6r att f\xf6rst\xe5 hur Tj\xe4nsten anv\xe4nds (sidvisningar, felmeddelanden). Den kan inte kopplas till dig som individ."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Inga marknadsf\xf6ringscookies."})," Vi anv\xe4nder inte Facebook Pixel, Google Ads remarketing eller liknande sp\xe5rning."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Inga cookies fr\xe5n tredje part"})," s\xe4tts utan ditt aktiva samtycke."]})]})]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"1. Vad \xe4r cookies?"}),(0,$d.jsx)("p",{children:"Cookies \xe4r sm\xe5 textfiler som sparas i din webbl\xe4sare n\xe4r du bes\xf6ker en webbplats. De anv\xe4nds f\xf6r att webbplatsen ska fungera korrekt, f\xf6r s\xe4kerhet och f\xf6r att samla in anonymiserad anv\xe4ndarstatistik."})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"2. Cookies vi anv\xe4nder"}),(0,$d.jsxs)(Th,{children:[(0,$d.jsxs)(Ph,{className:"header",children:[(0,$d.jsx)("div",{children:"Namn / typ"}),(0,$d.jsx)("div",{children:"Syfte & livsl\xe4ngd"})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Session-cookie"}),(0,$d.jsxs)("div",{className:"v",children:["H\xe5ller dig inloggad under bes\xf6ket. Livsl\xe4ngd: tills du st\xe4nger webbl\xe4saren. ",(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"CSRF-token"}),(0,$d.jsxs)("div",{className:"v",children:["Skyddar mot f\xf6rfalskade formul\xe4rinskick. Livsl\xe4ngd: tills sessionen avslutas. ",(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Cookie-samtycke"}),(0,$d.jsxs)("div",{className:"v",children:["Sparar ditt val g\xe4llande statistik-cookies. Livsl\xe4ngd: 12 m\xe5nader.",(0,$d.jsx)("strong",{children:" N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)(Ph,{children:[(0,$d.jsx)("div",{className:"k",children:"Anonymiserad statistik"}),(0,$d.jsxs)("div",{className:"v",children:["Aggregerad data om sidvisningar och fel. Ingen IP, ingen individidentifiering. Livsl\xe4ngd: 90 dagar. ",(0,$d.jsx)("strong",{children:"Statistik (samtycke)."})]})]})]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"3. Hur du hanterar cookies"}),(0,$d.jsx)("p",{children:"Du kan n\xe4r som helst:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"\xc5terkalla samtycke till statistik-cookies via inst\xe4llningar i din profil n\xe4r du \xe4r inloggad"}),(0,$d.jsx)("li",{children:"Radera alla cookies fr\xe5n arvo.flow via din webbl\xe4sares inst\xe4llningar"}),(0,$d.jsx)("li",{children:"Blockera cookies helt \u2014 observera dock att inloggning d\xe5 inte kommer fungera"})]}),(0,$d.jsxs)("p",{children:["V\xe4gledning f\xf6r de vanligaste webbl\xe4sarna finns hos"," ",(0,$d.jsx)("a",{href:"https://www.imy.se/privatperson/dataskydd/det-har-galler-enligt-gdpr/cookies/",target:"_blank",rel:"noopener noreferrer",children:"Integritetsskyddsmyndigheten (IMY)"}),"."]})]}),(0,$d.jsxs)(zh,{children:[(0,$d.jsx)("h3",{children:"4. Lagst\xf6d"}),(0,$d.jsx)("p",{children:"Vi f\xf6ljer Lagen om elektronisk kommunikation (LEK) 9 kap. 28 \xa7. N\xf6dv\xe4ndiga cookies s\xe4tts utan samtycke eftersom de kr\xe4vs f\xf6r att tillhandah\xe5lla den tj\xe4nst du aktivt efterfr\xe5gat. F\xf6r \xf6vriga cookies inh\xe4mtar vi aktivt samtycke i enlighet med GDPR."})]}),(0,$d.jsxs)(Nh,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Cookie-policy v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$d.jsx)("br",{}),"Fr\xe5gor: ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)(Ah,{children:[(0,$d.jsx)("h2",{children:"Inga m\xf6rka m\xf6nster, inga dolda sp\xe5rare."}),(0,$d.jsxs)("p",{children:["Vi tycker att cookie-banners ska vara \xe4rliga. Om du uppt\xe4cker att vi s\xe4tter en cookie som inte st\xe5r med ovan \u2014 mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsx)(Id,{as:vl,to:"/integritet",$variant:"primary",$size:"lg",children:"L\xe4s integritetspolicy"}),(0,$d.jsx)(Id,{as:vl,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(xu,{})]}),Oh=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e)+" kr",Ih=e=>null!=e?new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e):"\u2013",Bh=["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];function Mh(e){if(!e)return null;const[t,n]=e.split("-");return`${Bh[parseInt(n,10)-1]} ${t}`}const Uh={microsoft365:"Microsoft 365",google:"Google Workspace",zoho:"Zoho Mail",other:"Anpassad e-postl\xf6sning"},Vh={mobil:{label:"Mobilabonnemang",partnerLabel:"Kvalificerad Mobiloperat\xf6r",segment:2,unit:"abonnemang",unitSingular:"abonnemang",inlineLabel:"mobilabonnemang",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade ramavtal f\xf6r mobilabonnemang kostar v\xe4sentligt mindre",variableChargeNote:"Roaming, \xf6vertrafik m.m. \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},bredband:{label:"F\xf6retagsbredband",partnerLabel:"Kvalificerad Bredbandsoperat\xf6r",segment:2,unit:"anslutningar",unitSingular:"anslutning",inlineLabel:"bredband",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Arvos riktv\xe4rde baserat p\xe5 benchmarkdata f\xf6r B2B-bredband \u2014 exakt pris beror p\xe5 adress och befintlig infrastruktur.",smfBenchmark:"v\xe4lf\xf6rhandlade f\xf6retagsbredbandsavtal kostar v\xe4sentligt mindre",variableChargeNote:"Datatrafik och \xf6verskottsavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"saas-productivity":{label:"Programvarulicenser / SaaS",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade avtal f\xf6r samma licenser kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-crm":{label:"CRM-system",partnerLabel:"Kvalificerad CRM-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade CRM-avtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-finance":{label:"Aff\xe4rssystem / Bokf\xf6ring",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade aff\xe4rssystemsavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-other":{label:"Programvarulicenser / SaaS \xb7 \xf6vrigt",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade programvaruavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-creative":{label:"Kreativ mjukvara / Design",partnerLabel:"Kvalificerad Mjukvaruleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade avtal f\xf6r kreativ mjukvara kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},el:{label:"Elavtal",partnerLabel:"Kvalificerad Elleverant\xf6r",segment:1,unit:"avtal",unitSingular:"avtal",inlineLabel:"el (energidel)",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade elavtal kostar v\xe4sentligt mindre",variableChargeNote:"R\xf6rliga energikostnader (spotpris, n\xe4tavgift) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!0},skrivarleasing:{label:"Skrivare & Managed Print",partnerLabel:"Kvalificerad Print-leverant\xf6r",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"skrivarl\xf6sning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",smfBenchmark:"v\xe4lf\xf6rhandlade utskriftsavtal kostar v\xe4sentligt mindre",variableChargeNote:"Klickkostnader per utskrift (volymbaserat) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},utrustningsleasing:{label:"IT-utrustningsleasing",partnerLabel:"Kvalificerad IT-partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"utrustningsleasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",smfBenchmark:"v\xe4lf\xf6rhandlade IT-leasingavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},kortterminal:{label:"Kortterminal",partnerLabel:"Kvalificerad Betaltj\xe4nstleverant\xf6r",segment:6,unit:"terminaler",unitSingular:"terminal",inlineLabel:"kortterminal",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:"Transaktionsavgifter och volymbaserade procentavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"faktura-tjanst":{label:"Fakturatj\xe4nst / Aff\xe4rssystem",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:6,unit:"licenser",unitSingular:"licens",inlineLabel:"fakturatj\xe4nst",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},"leasing-bil":{label:"F\xf6retagsleasing",partnerLabel:"Kvalificerad Leasingpartner",segment:5,unit:"fordon",unitSingular:"fordon",inlineLabel:"billeasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"it-support":{label:"IT-drift & Support",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"IT-support",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},serverhosting:{label:"Serverhosting & Cloud-infrastruktur",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"serverhosting",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"transport-frakt":{label:"Transport & Frakt",partnerLabel:"Kvalificerad Fraktleverant\xf6r",segment:5,unit:"avtal",unitSingular:"avtal",inlineLabel:"transport",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},kontorsmaterial:{label:"Kontorsmaterial & F\xf6rbrukning",partnerLabel:"Kvalificerad F\xf6rbrukningsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"kontorsmaterial",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"st\xe4d-reng\xf6ring":{label:"St\xe4d & Reng\xf6ring",partnerLabel:"Kvalificerad St\xe4dleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"st\xe4dtj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"larm-bevakning":{label:"Larm & Bevakning",partnerLabel:"Kvalificerad S\xe4kerhetsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"larm och bevakning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},foretagshalsovard:{label:"F\xf6retagsh\xe4lsov\xe5rd",partnerLabel:"Kvalificerad H\xe4lsov\xe5rdspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsh\xe4lsov\xe5rd",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},loneadmin:{label:"L\xf6neadministration",partnerLabel:"Kvalificerad L\xf6nesystemleverant\xf6r",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"l\xf6neadministration",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"forsakring-foretag":{label:"F\xf6retagsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},"forsakring-ansvar":{label:"Yrkesansvarsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"yrkesansvarsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},vaxel:{label:"Molnv\xe4xel",partnerLabel:"Kvalificerad Telekomleverant\xf6r",segment:2,unit:"licenser",unitSingular:"licens",inlineLabel:"molnv\xe4xel",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},bankavgifter:{label:"Bankavgifter & Betaltj\xe4nster",partnerLabel:"Kvalificerad Bankpartner",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"bankavgifter",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"avfall-atervinning":{label:"Avfall & \xc5tervinning",partnerLabel:"Kvalificerad Avfallsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"avfall och \xe5tervinning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},uncategorized:{label:"Okategoriserad",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}};function Kh(e){var t;return null!==(t=Vh[e])&&void 0!==t?t:{label:null!==e&&void 0!==e?e:"Ok\xe4nd kategori",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}}const Hh=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Wh=jd`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`,qh=jd`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
`,Yh=jd`
  to { transform: rotate(360deg); }
`,Gh=jd`
  0%   { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
`,Qh=jd`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,.5); }
  60%       { box-shadow: 0 0 0 4px rgba(27,122,110,.0); }
`,Jh=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  min-height: 100vh;
`,Xh=vd.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 80px 28px 32px;
  text-align: center;
  animation: ${Hh} 0.6s ease both;
  @media (max-width: 740px) { padding: 48px 20px 20px; }
`,Zh=vd.span`
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
`,ef=vd.h1`
  margin-top: 22px;
  font-size: clamp(38px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,tf=vd.p`
  margin: 22px auto 0;
  max-width: 580px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,nf=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 16px 28px 64px;
  @media (max-width: 740px) { padding: 12px 20px 48px; }
`,rf=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  margin-bottom: 16px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
  animation: ${Hh} 0.5s ease both;
  @media (max-width: 600px) { padding: 22px 20px; }
`,af=vd.div`
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
`,of=vd.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 18px;
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`,lf=vd.label`
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
`,sf=vd.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,cf=vd.div`
  animation: ${Wh} 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;
`,df=(vd.div`
  margin: 20px 0 6px;
  animation: ${Hh} .4s ease both;

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
`,vd.button`
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
`),uf=vd.p`
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
`,pf=vd.div`
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.dangerSoft}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.danger}};
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  line-height: 1.5;
`,hf=vd.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${Yh} 0.7s linear infinite;
`,ff=vd.ol`
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
`,mf=vd.li`
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
    animation: ${e=>{let{$state:t}=e;return"active"===t?qh:"none"}} 1.6s ease-in-out infinite;
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
`,gf=(vd.div`
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
`,vd.div`
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
`),xf=vd.div`
  position: relative;
  overflow: hidden;
  padding: 24px 26px 22px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
  color: #FAFAF7;
  margin-bottom: 12px;
  box-shadow: 0 8px 32px rgba(27,110,102,.22), 0 2px 6px rgba(27,110,102,.14);
  animation: ${Hh} 0.5s ease both;

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
    animation: ${Gh} 3.6s ease-in-out 1.2s infinite;
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
`,vf=vd.div`
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
`,bf=vd.p`
  margin-top: 10px;
  margin-bottom: ${e=>{let{$compact:t}=e;return t?"10px":"24px"}};
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  font-style: italic;
  text-align: center;
`,yf=(vd.div`
  margin-bottom: 24px;
`,vd.div`
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
`,vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 32px 26px;
  margin-bottom: 12px;
  box-shadow: 0 4px 24px rgba(14,26,23,.10), 0 1px 4px rgba(14,26,23,.06);
  animation: ${Hh} 0.5s ease 0.08s both;

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
`),kf=vd.div`
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
`,jf=vd.form`
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
`,wf=vd.div`
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
`,Sf=(vd.div`
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
`,vd.div`
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
`),$f=vd.div`
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
`,_f=vd.dl`
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
`,Ef=vd.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 8, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${Hh} 0.2s ease both;
`,zf=vd.div`
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
`,Nf=vd.div`
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
`,Af=(vd.a`
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
`,vd.div`
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
`),Cf=vd.div`
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
    animation: ${Wh} 0.2s ease both;
  }
  p {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 14px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin: 0;
  }
`,Ff=vd.div`
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
`,Tf=vd.div`
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
`,Pf=vd.div`
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
`,Df=(vd.div`
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
`,vd.ul`
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
`,vd.div`
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
`),Rf=(vd.div`
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
`,vd.div`
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
`),Lf=vd.div`
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
`,Of=vd.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`,If=vd.div`
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
`,Bf=vd.div`
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
`,Mf=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px 32px 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 24px rgba(14,26,23,.08), 0 1px 4px rgba(14,26,23,.04);
  animation: ${Hh} 0.5s ease 0.16s both;

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
    animation: ${Qh} 2s ease-in-out infinite;
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
`,Uf=vd.div`
  margin-bottom: 12px;
  padding: 30px 32px 26px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  animation: ${Hh} 0.5s ease 0.24s both;

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
`;const Vf={"business-premium":"Business Premium","business-standard":"Business Standard","business-basic":"Business Basic",e3:"E3",e5:"E5"},Kf=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);const Hf=3145728;async function Wf(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}function qf(e,t){if(!e||!t)return e;const n=t.split(/\s+/),r=[t];n[0].length>=4&&r.push(n[0]),n.length>=2&&r.push(`${n[0]} ${n[1]}`);let a=e;for(const i of[...new Set(r)])a=a.replace(new RegExp(i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),"Arvo-verifierad partner");return a}const Yf={ehandel:"E-handel & Detaljhandel",tillverkning:"Industri & Tillverkning","it-tech":"IT, Tech & Mjukvara",bygg:"Bygg, Hantverk & Fastighet",hotell:"Hotell, Restaurang & Event",konsult:"Konsult & F\xf6retagstj\xe4nster",transport:"Transport & Logistik",vard:"V\xe5rd, Omsorg & H\xe4lsa",ovrigt:"\xd6vrigt / Annan bransch"},Gf=[{label:"Skrivare",short:"Skrivare",icon:"file",cats:["skrivarleasing","utrustningsleasing"]},{label:"El",short:"El",icon:"bolt",cats:["el"]},{label:"Telefoni och bredband",short:"Telefoni",icon:"phone",cats:["mobil","bredband","vaxel"]},{label:"Programvara",short:"Programvara",icon:"spark",cats:["saas-productivity","saas-creative","saas-crm","saas-finance","saas-other","serverhosting","faktura-tjanst"]},{label:"IT",short:"IT",icon:"wifi",cats:["it-support"]},{label:"Fordon och frakt",short:"Fordon",icon:"truck",cats:["leasing-bil","transport-frakt"]},{label:"Kontor och st\xe4d",short:"Kontor",icon:"briefcase",cats:["kontorsmaterial","st\xe4d-reng\xf6ring","larm-bevakning","kortterminal","avfall-atervinning","bankavgifter"]},{label:"Personal och h\xe4lsa",short:"Personal",icon:"shield",cats:["foretagshalsovard","loneadmin","forsakring-foretag","forsakring-ansvar"]}],Qf=[{id:"extract",label:"Arvo l\xe4ser & klassificerar fakturan",sublabel:"Tolkar varje rad och post"},{id:"categorize",label:"Identifierar leverant\xf6r & kategori",sublabel:"Matchar mot 200+ leverant\xf6rsprofiler"},{id:"recommend",label:"Ber\xe4knar besparing mot branschindex",sublabel:"J\xe4mf\xf6r med svenska branschdata"}],Jf=e=>new Promise((t,n)=>{const r=new FileReader;r.onload=()=>{const e=String(r.result||""),n=e.includes(",")?e.split(",")[1]:e;t(n)},r.onerror=()=>n(new Error("Kunde inte l\xe4sa filen")),r.readAsDataURL(e)});function Xf(e){let{cc:t}=e;const[n,a]=r.useState(!1);return(0,$d.jsxs)(Tf,{children:[(0,$d.jsxs)("div",{className:"chain-header",onClick:()=>a(e=>!e),role:"button",tabIndex:0,onKeyDown:e=>"Enter"===e.key&&a(e=>!e),children:[(0,$d.jsx)("span",{className:"chain-title",children:"Ber\xe4kningsunderlag"}),(0,$d.jsx)("span",{className:"chain-toggle",children:n?"D\xf6lj \u25b2":"Visa hur vi r\xe4knar \u25bc"})]}),n&&(0,$d.jsxs)("div",{className:"chain-body",children:[(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Nuvarande kostnad"}),(0,$d.jsx)("div",{className:"chain-source",children:t.currentAnnualCost.source})]}),(0,$d.jsxs)("span",{className:"chain-value",children:[Oh(t.currentAnnualCost.value)," kr/\xe5r"]})]}),t.benchmarkAnnualCost&&(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Arvo-pris"}),t.benchmarkAnnualCost.formula&&(0,$d.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.formula}),(0,$d.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.source})]}),(0,$d.jsxs)("span",{className:"chain-value",children:[Oh(t.benchmarkAnnualCost.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsx)("div",{className:"chain-label",children:"Bruttobesparing"}),(0,$d.jsxs)("span",{className:"chain-value",children:[Oh(t.grossSaving.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Arvos arvode"}),(0,$d.jsx)("div",{className:"chain-source",children:t.arvoFee.formula})]}),(0,$d.jsxs)("span",{className:"chain-value",children:["\u2212",Oh(t.arvoFee.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row total",children:[(0,$d.jsx)("span",{children:"Er nettobesparing"}),(0,$d.jsxs)("span",{className:"chain-value",children:["+",Oh(t.netSaving.value)," kr/\xe5r"]})]})]})]})}function Zf(e){let{seatCount:t,employees:n,overage:a,term:i,termSing:o}=e;const[l,s]=r.useState(!1);return(0,$d.jsxs)(Cf,{children:[(0,$d.jsxs)("button",{className:"lon-trigger",onClick:()=>s(e=>!e),"aria-expanded":l,children:[(0,$d.jsxs)("span",{className:"lon-head",children:[(0,$d.jsxs)("span",{className:"kicker",children:["Notering om ",i]}),(0,$d.jsxs)("span",{className:"lon-teaser",children:[a," av ",t," ",i," verkar oanv\xe4nda"]})]}),(0,$d.jsx)("span",{className:"lon-chevron"+(l?" open":""),children:(0,$d.jsx)(bu,{name:"chevron-right",size:15,stroke:2.5})})]}),l&&(0,$d.jsx)("div",{className:"lon-body",children:(0,$d.jsxs)("p",{children:["Kalkylen ovan bygger p\xe5 att vi beh\xe5ller era ",t," ",i,", men s\xe4nker styckpriset genom att flytta er till r\xe4tt avtalsniv\xe5. Vi noterar dock att ni enligt uppgift \xe4r ",n," anst\xe4llda. Om man dessutom hade st\xe4dat bort",1===a?` detta ${a} \xf6verfl\xf6diga ${o}`:` dessa ${a} \xf6verfl\xf6diga ${i}`,", hade er kostnad s\xe4nkts ytterligare."]})})]})}const em=()=>{var e,t,n,a,i,o,l,s,c,d,u,p,h,f,m,g,x,v,b,y,k,j,w,S,$,_,E,z,N,A,C,F,T,P,D,R,L,O,I,B,M,U,V,K,H,W,q,Y,G,Q,J,X,Z,ee,te,ne,re,ae,ie,oe,le,se,ce,de,ue,pe,he,fe,me,ge,xe,ve,be,ye,ke,je,we,Se,$e,_e,Ee,ze,Ne,Ae,Ce,Fe,Te,Pe,De,Re,Le,Oe,Ie,Be,Me,Ue,Ve,Ke,He,We,qe,Ye,Ge,Qe,Je,Xe,Ze,et,tt,nt,rt,at,it,ot,lt,st,ct,dt,ut,pt,ht,ft,mt,gt,xt,vt,bt,yt,kt;const jt=(0,r.useRef)(null),wt=(0,r.useRef)(null),{email:St}=Ad(),[$t,_t]=(0,r.useState)(null),[Et,zt]=(0,r.useState)("konsult"),[Nt,At]=(0,r.useState)(5),[Ct,Ft]=(0,r.useState)(""),[Tt,Pt]=(0,r.useState)(null),[Dt,Rt]=(0,r.useState)(null),[Lt,Ot]=(0,r.useState)(null),[It,Bt]=(0,r.useState)(null),[Mt,Ut]=(0,r.useState)(""),[Vt,Kt]=(0,r.useState)("idle"),[Ht,Wt]=(0,r.useState)(!1),[qt,Yt]=(0,r.useState)(""),[Gt,Qt]=(0,r.useState)("idle"),[Jt,Xt]=(0,r.useState)(!1),[Zt,en]=(0,r.useState)(""),[tn,nn]=(0,r.useState)("idle"),[rn,an]=(0,r.useState)(null),[on,ln]=(0,r.useState)(!1),[sn,cn]=(0,r.useState)(!1),[dn,un]=(0,r.useState)("quota"),[pn,hn]=(0,r.useState)(""),[fn,mn]=(0,r.useState)(!1),[gn,xn]=(0,r.useState)(""),[vn,bn]=(0,r.useState)(""),[yn,kn]=(0,r.useState)(""),[jn,wn]=(0,r.useState)(!1),[Sn,$n]=(0,r.useState)("idle"),[_n,En]=(0,r.useState)(!1),[zn,Nn]=(0,r.useState)(""),[An,Cn]=(0,r.useState)("idle"),[Fn,Tn]=(0,r.useState)(""),[Pn,Dn]=(0,r.useState)("idle"),[Rn,Ln]=(0,r.useState)(null),[On,In]=(0,r.useState)("idle"),[Bn,Mn]=(0,r.useState)(!1),[Un,Vn]=(0,r.useState)(!1),[Kn,Hn]=(0,r.useState)(""),[Wn,qn]=(0,r.useState)("idle"),[Yn,Gn]=(0,r.useState)(null),[Qn,Jn]=(0,r.useState)([]),[Xn,Zn]=(0,r.useState)(null),[er,tr]=(0,r.useState)([]),[nr,rr]=(0,r.useState)(null),[ar,ir]=(0,r.useState)(!1),or=Qn.length>1;r.useEffect(()=>{var e,t,n;const r=new URLSearchParams(window.location.search),a=r.get("bypass");a&&(sessionStorage.setItem("arvo_bypass",a),window.history.replaceState({},"",window.location.pathname));const i=r.get("magic");i&&(window.history.replaceState({},"",window.location.pathname),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:i})}).then(e=>e.json()).then(e=>{e.ok&&e.bypass&&sessionStorage.setItem("arvo_bypass",e.bypass)}).catch(()=>{})),fetch("/api/token",{method:"POST"}).then(e=>e.json()).then(e=>{var t;return an(null!==(t=e.token)&&void 0!==t?t:null)}).catch(()=>{});const o=r.get("intelligence_connected"),l=r.get("oauth_pending"),s=r.get("oauth_error"),c=null!==(e=null!==(t=null!==(n=r.get("provider"))&&void 0!==n?n:o)&&void 0!==t?t:l)&&void 0!==e?e:"gmail";if(o||l||s){var d,u;const e=parseInt(null!==(d=r.get("invoices"))&&void 0!==d?d:"0",10)||0,t=null!==(u=r.get("email"))&&void 0!==u?u:"";o?Gn({type:"connected",provider:o,invoices:e,email:t}):l?Gn({type:"pending",provider:l}):s&&Gn({type:"error",provider:c,errorCode:s}),window.history.replaceState({},"",window.location.pathname)}},[]),r.useEffect(()=>{var e,t;if(!Lt||!wt.current)return;const n=null!==(e=null===(t=document.querySelector("header"))||void 0===t?void 0:t.offsetHeight)&&void 0!==e?e:64,r=wt.current.getBoundingClientRect().top+window.pageYOffset-n-8;window.scrollTo({top:r,behavior:"smooth"})},[Lt]);const lr=e=>{Rt(null),e&&("application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")?e.size>Hf?Rt(`PDF \xe4r f\xf6r stor (${(e.size/1024/1024).toFixed(1)} MB). Max: 3 MB.`):_t(e):Rt("Endast PDF-filer st\xf6ds."))},sr=e=>{Rt(null),rr(null);const t=Array.from(e).filter(e=>"application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")),n=t.filter(e=>e.size>Hf);n.length>0&&Rt(`${n.length} fil(er) \xe4r f\xf6r stora (max 3 MB per faktura).`);const r=t.filter(e=>e.size<=Hf);1===r.length?(_t(r[0]),Jn([])):r.length>1?(Jn(r),_t(null),Ot(null)):e.length>0&&Rt("Endast PDF-filer st\xf6ds.")},cr=async e=>{const t=await fetch("/api/send-analysis",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:Lt})});if(!t.ok)throw new Error("send-analysis "+t.status)},dr=async e=>{const t=await fetch("/api/send-confirmation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:Lt})});if(!t.ok)throw new Error("send-confirmation "+t.status)},ur=async e=>{var t;null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e);const n=(Zt||pn||"").trim();if(n&&"idle"===tn){nn("submitting");try{await Promise.all([dr(n),cr(n)]),nn("sent")}catch{nn("idle")}}},pr=Tt&&"done"!==Tt,hr="optimize"===(null===Lt||void 0===Lt||null===(e=Lt.recommendation)||void 0===e?void 0:e.recommendationType)&&(null!==(t=null===Lt||void 0===Lt||null===(n=Lt.recommendation)||void 0===n?void 0:n.optimizationSaving)&&void 0!==t?t:0)>0,fr=null!==(a=null===Lt||void 0===Lt||null===(i=Lt.recommendation)||void 0===i?void 0:i.optimizationSaving)&&void 0!==a?a:0,mr=hr?Math.round(.2*fr):0,gr=hr?fr-mr:0,xr=function(e){if(!Array.isArray(e))return[];const t=/[Mm]\xe5nad\s+(\d+)\s+av\s+(\d+)|[Mm]onth\s+(\d+)\s+of\s+(\d+)/;return e.flatMap(e=>{var n,r,a,i,o,l;if("hardware"!==e.type&&!(null===(n=e.description)||void 0===n?void 0:n.toLowerCase().includes("delbetalning")))return[];const s=t.exec(null!==(r=e.description)&&void 0!==r?r:"");if(!s)return[];const c=parseInt(null!==(a=s[1])&&void 0!==a?a:s[3]),d=parseInt(null!==(i=s[2])&&void 0!==i?i:s[4]);return isNaN(c)||isNaN(d)||d<=c?[]:[{description:e.description,monthlyCost:null!==(o=e.amount)&&void 0!==o?o:0,monthsRemaining:d-c,remainingCost:(d-c)*(null!==(l=e.amount)&&void 0!==l?l:0)}]})}(null!==(o=null===Lt||void 0===Lt||null===(l=Lt.extracted)||void 0===l?void 0:l.lineItems)&&void 0!==o?o:[]),vr=xr.reduce((e,t)=>e+12*t.monthlyCost,0),br=xr.reduce((e,t)=>e+t.remainingCost,0),yr=vr>0&&(null===Lt||void 0===Lt||null===(s=Lt.recommendation)||void 0===s?void 0:s.shouldSwitch),kr=yr?Math.max(0,(null!==(c=null===Lt||void 0===Lt||null===(d=Lt.extracted)||void 0===d?void 0:d.annualCost)&&void 0!==c?c:0)-vr):null!==(u=null===Lt||void 0===Lt||null===(p=Lt.extracted)||void 0===p?void 0:p.annualCost)&&void 0!==u?u:0,jr=yr?Math.max(0,kr-(null!==(h=null===Lt||void 0===Lt||null===(f=Lt.recommendation)||void 0===f?void 0:f.suggestedAnnualCost)&&void 0!==h?h:0)):null!==(m=null===Lt||void 0===Lt||null===(g=Lt.recommendation)||void 0===g?void 0:g.grossSaving)&&void 0!==m?m:0,wr=Math.round(.2*jr),Sr=jr-wr,$r=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1600;const[n,a]=r.useState(0);return r.useEffect(()=>{if(!e)return void a(0);const n=performance.now();let r;const i=o=>{const l=Math.min((o-n)/t,1),s=1-Math.pow(1-l,3);a(Math.round(e*s)),l<1?r=requestAnimationFrame(i):a(e)};return r=requestAnimationFrame(i),()=>{r&&cancelAnimationFrame(r)}},[e,t]),n}(yr?Sr:null!==(x=null===Lt||void 0===Lt||null===(v=Lt.recommendation)||void 0===v?void 0:v.netSaving)&&void 0!==x?x:0),_r=kr,Er=null!==(b=null===Lt||void 0===Lt||null===(y=Lt.recommendation)||void 0===y?void 0:y.suggestedAnnualCost)&&void 0!==b?b:0,zr=_r>0&&Er>0&&Er<_r?Math.round((_r-Er)/_r*100):0,Nr=null!==(k=null===Lt||void 0===Lt||null===(j=Lt.recommendation)||void 0===j||null===(w=j.clickRateAnalysis)||void 0===w?void 0:w.priceGapScore)&&void 0!==k?k:null,Ar=null!==Nr&&void 0!==Nr?Nr:Math.max(5,Math.round(100-1.5*zr)),Cr=null!=Nr?Nr:null!==Lt&&void 0!==Lt&&null!==(S=Lt.recommendation)&&void 0!==S&&S.shouldSwitch?(null!==($=null===Lt||void 0===Lt||null===(_=Lt.recommendation)||void 0===_?void 0:_.netSaving)&&void 0!==$?$:0)>0?Math.min(Ar,79):Ar:Math.min(Ar,85),Fr=Cr<45?{dot:"#DC2626",num:"#DC2626",label:"Kritisk",labelClr:"#991B1B",txt:"#7F1D1D",bg:"#FEF2F2",border:"rgba(220,38,38,.18)"}:Cr<65?{dot:"#D97706",num:"#D97706",label:"Suboptimerat",labelClr:"#92400E",txt:"#78350F",bg:"#FFFBEB",border:"rgba(217,119,6,.18)"}:Cr<80?{dot:"#65A30D",num:"#65A30D",label:"F\xf6rb\xe4ttringsl\xe4ge",labelClr:"#365314",txt:"#365314",bg:"#F7FEE7",border:"rgba(101,163,13,.18)"}:{dot:"#1B7A6E",num:"#1B7A6E",label:"Optimalt",labelClr:"#0E4F47",txt:"#0E4F47",bg:"#DCEEEA",border:"rgba(27,122,110,.18)"},Tr=(null===Lt||void 0===Lt?void 0:Lt.monitoringDate)&&new Date(Lt.monitoringDate)<new Date,Pr=null!==Lt&&void 0!==Lt&&Lt.servicePeriodEnd?Math.ceil((new Date(Lt.servicePeriodEnd)-new Date)/864e5):null,Dr=null!==(E=null===Lt||void 0===Lt||null===(z=Lt.recommendation)||void 0===z?void 0:z.secondarySaving)&&void 0!==E?E:null,Rr=Dr?(null!==(N=null===Lt||void 0===Lt||null===(A=Lt.recommendation)||void 0===A?void 0:A.grossSaving)&&void 0!==N?N:0)-Dr.grossSaving:null,Lr=Dr?"bredband"===Dr.category?"Bredband"+(Dr.speedMbit?` ${Dr.speedMbit} Mbit`:""):"Mobil"+(Dr.seatCount?` (${Dr.seatCount} st)`:""):null,Or=!(null===Lt||void 0===Lt||null===(C=Lt.recommendation)||void 0===C||!C.shouldSwitch||null!==Lt&&void 0!==Lt&&null!==(F=Lt.recommendation)&&void 0!==F&&F.suggestedSupplier||null==Dr),Ir=Kh(Or?Dr.category:null!==(T=null===Lt||void 0===Lt||null===(P=Lt.categorized)||void 0===P?void 0:P.category)&&void 0!==T?T:"uncategorized"),Br=Or?`Ert ${Kh(null!==(D=null===Lt||void 0===Lt||null===(R=Lt.categorized)||void 0===R?void 0:R.category)&&void 0!==D?D:"uncategorized").label.toLowerCase()} \xe4r konkurrenskraftigt \u2014 ${null!==Lr&&void 0!==Lr?Lr:"sekund\xe4rtj\xe4nsten"} kan optimeras.`:"monitoring"===(null===Lt||void 0===Lt?void 0:Lt.route)?Tr?`Avtalsl\xe5set lossnar snart${null!=Pr?` \u2014 ${Pr} dagar kvar`:""}. Arvo f\xf6rbereder omf\xf6rhandling.`:Cr>=80?"Ni betalar marknadsm\xe4ssigt i dag \u2014 Arvo bevakar och agerar inf\xf6r f\xf6rnyelsen.":`Ni betalar ${zr} % s\xe4mre \xe4n branschsnittet \u2014 Arvo f\xf6rhandlar v\xe4lf\xf6rhandlat avtalspris vid f\xf6rnyelsen.`:Cr<45?zr>0?`Ni betalar ${zr}% \xf6ver marknadspris \u2014 ${null!==(L=Ir.smfBenchmark)&&void 0!==L?L:"stor besparingspotential"}.`:"Ni betalar markant s\xe4mre \xe4n branschsnittet \u2014 stor besparingspotential.":Cr<80?zr>0?`Ni betalar ${zr}% \xf6ver marknadspris \u2014 ${null!==(O=Ir.smfBenchmark)&&void 0!==O?O:"v\xe4lf\xf6rhandlat avtalspris finns att h\xe4mta"}.`:"Ni betalar n\xe5got s\xe4mre \xe4n branschsnittet \u2014 v\xe4lf\xf6rhandlat avtalspris finns att h\xe4mta.":"Ni har ett v\xe4lf\xf6rhandlat avtal \u2014 b\xe4ttre \xe4n branschsnittet.",Mr=2*Math.PI*26,Ur=Cr/100*Mr,{score:Vr,gaugeReady:Kr}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;const[n,a]=r.useState(!1),[i,o]=r.useState(0);return r.useEffect(()=>{if(a(!1),o(0),!e)return;const n=setTimeout(()=>{a(!0);const t=performance.now();let n;const r=a=>{const i=Math.min((a-t)/1450,1),l=1-Math.pow(1-i,3);o(Math.round(e*l)),i<1?n=requestAnimationFrame(r):o(e)};return n=requestAnimationFrame(r),()=>{n&&cancelAnimationFrame(n)}},t);return()=>clearTimeout(n)},[e,t]),{score:i,gaugeReady:n}}(Cr,400),Hr=Ir.isRealPrice,Wr=!(null===Lt||void 0===Lt||null===(I=Lt.categorized)||void 0===I||!I.licensePending),qr=Ir.partnerLabel,Yr=(null!==(B=null===Lt||void 0===Lt||null===(M=Lt.recommendation)||void 0===M?void 0:M.suggestedSupplier)&&void 0!==B?B:"").toLowerCase().trim(),Gr=(null!==(U=null!==(V=null===Lt||void 0===Lt||null===(K=Lt.categorized)||void 0===K?void 0:K.normalizedSupplier)&&void 0!==V?V:null===Lt||void 0===Lt||null===(H=Lt.extracted)||void 0===H?void 0:H.supplier)&&void 0!==U?U:"").toLowerCase().trim(),Qr=Hr&&Yr&&Gr&&(Yr===Gr||Yr.includes(Gr)||Gr.includes(Yr)),Jr=Qr?`S\xe4nk er ${null===Lt||void 0===Lt||null===(W=Lt.recommendation)||void 0===W?void 0:W.suggestedSupplier}-kostnad`:Hr?"Aktivera bytet":"S\xe4kra besparingen",Xr=!!("auto"===(null===Lt||void 0===Lt?void 0:Lt.route)&&null!==Lt&&void 0!==Lt&&null!==(q=Lt.recommendation)&&void 0!==q&&q.suggestedAnnualCost&&!Wr&&Sr>0);"auto"!==(null===Lt||void 0===Lt?void 0:Lt.route)||null===Lt||void 0===Lt||null===(Y=Lt.recommendation)||void 0===Y||Y.isOptimize;return(0,$d.jsxs)(Jh,{children:[(0,$d.jsx)(du,{variant:"public"}),Yn&&(0,$d.jsxs)("div",{style:{background:"connected"===Yn.type?"#F0FDF9":"pending"===Yn.type?"#FFFBEB":"#FEF2F2",borderBottom:"1px solid "+("connected"===Yn.type?"#6EE7D1":"pending"===Yn.type?"#FCD34D":"#FECACA"),padding:"13px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[(0,$d.jsxs)("span",{style:{fontSize:14,color:"connected"===Yn.type?"#065F46":"pending"===Yn.type?"#92400E":"#991B1B",fontWeight:600,lineHeight:1.5},children:["connected"===Yn.type&&(0,$d.jsxs)($d.Fragment,{children:["gmail"===Yn.provider?"Gmail":"Outlook"," kopplat \u2014"," ",Yn.invoices>0?`Arvo hittade ${Yn.invoices} fakturor i er inkorg \u2014 analysera er f\xf6rsta nedan, det tar 2 minuter.`:"Inkorgen \xe4r kopplad. Analysera er f\xf6rsta faktura nedan \u2014 det tar 2 minuter."]}),"pending"===Yn.type&&(0,$d.jsxs)($d.Fragment,{children:["gmail"===Yn.provider?"Gmail":"Outlook","-anslutning kr\xe4ver konfiguration \u2014"," ","er aktivering \xe4r mottagen och Arvo kontaktar er inom kort."]}),"error"===Yn.type&&(0,$d.jsxs)($d.Fragment,{children:["Anslutning misslyckades (",Yn.errorCode,") \u2014 f\xf6rs\xf6k igen eller kontakta hej@arvoflow.se."]})]}),(0,$d.jsx)("button",{onClick:()=>Gn(null),style:{background:"none",border:"none",cursor:"pointer",fontSize:18,lineHeight:1,opacity:.5,padding:"0 4px"},"aria-label":"St\xe4ng",children:"\xd7"})]}),(0,$d.jsxs)(Xh,{children:[(0,$d.jsxs)(Zh,{children:[(0,$d.jsx)("span",{className:"dot"})," Arvo Intelligence \xb7 Analys p\xe5 60 sekunder"]}),(0,$d.jsxs)(ef,{children:["Ni betalar f\xf6r mycket. ",(0,$d.jsx)("em",{children:"En"})," faktura bevisar det."]}),(0,$d.jsx)(tf,{children:"Arvo Intelligence j\xe4mf\xf6r er faktura mot verkliga branschpriser och visar exakt vad ni betalar f\xf6r mycket \u2014 och hos vem ni kan spara."})]}),(0,$d.jsxs)(nf,{children:[!Lt&&(0,$d.jsx)(rf,{children:(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),await async function(){var e,t;let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!$t)return void Rt("V\xe4lj en PDF-faktura f\xf6rst.");const r=!!(null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:localStorage.getItem("arvo_gate_passed"));if(!n&&!r){var a;const e=localStorage.getItem("arvo_had_saving"),t=parseInt(null!==(a=localStorage.getItem("arvo_successful_count"))&&void 0!==a?a:"0");if(e||t>=2)return un("quota"),void ln(!0)}let i,o;n&&localStorage.setItem("arvo_gate_passed","1"),Rt(null),Ot(null),ln(!1),Ln(null),In("idle"),Pt("uploading");try{var l,s,c,d;const e=await Jf($t),t=await Wf(),r=null!==(l=null!==(s=null!==(c=sessionStorage.getItem("arvo_bypass"))&&void 0!==c?c:localStorage.getItem("arvo_bypass"))&&void 0!==s?s:localStorage.getItem("arvo_gate_passed"))&&void 0!==l?l:void 0;let a=rn;try{var u;const e=await fetch("/api/token",{method:"POST"});a=null!==(u=(await e.json()).token)&&void 0!==u?u:rn,an(a)}catch{}Pt("extract"),i=setTimeout(()=>Pt("categorize"),6e3),o=setTimeout(()=>Pt("recommend"),14e3);const g=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:Et,employees:Number(Nt),revenue:""===Ct?null:Number(Ct),token:a,fingerprint:t,bypass:r||void 0,email:n||void 0,userEmail:St||void 0})});clearTimeout(i),clearTimeout(o);const x=await g.json().catch(()=>({}));if(x.gate&&"saving_limit"===x.gateType)return Pt("done"),Ot(x),un("saving_limit"),void ln(!0);if(x.gate)return Pt(null),void ln(!0);if(x.timeout)return Pt(null),void Rt("Analysen tog lite f\xf6r l\xe5ng tid just nu. V\xe4nta ett \xf6gonblick och f\xf6rs\xf6k igen \u2014 det brukar g\xe5 snabbare vid andra f\xf6rs\xf6ket.");if(429===g.status||x.rateLimited)return Pt(null),void Rt("Du har analyserat f\xf6r m\xe5nga fakturor idag (max 5/dag). Kontakta oss p\xe5 hej@arvoflow.se f\xf6r att ut\xf6ka din kvot.");if(!g.ok||!x.ok)throw new Error(x.error||`Servern returnerade ${g.status}`);if(Pt("done"),Ot(x),Bt(null!==(d=x.analysisId)&&void 0!==d?d:null),Ut(""),Kt("idle"),"auto"===x.route){var p,h;const e=parseInt(null!==(p=localStorage.getItem("arvo_successful_count"))&&void 0!==p?p:"0")+1;var f,m;if(localStorage.setItem("arvo_successful_count",String(e)),(null===(h=x.recommendation)||void 0===h?void 0:h.netSaving)>0)localStorage.setItem("arvo_had_saving","1"),(null!==(f=null!==(m=sessionStorage.getItem("arvo_bypass"))&&void 0!==m?m:localStorage.getItem("arvo_bypass"))&&void 0!==f?f:localStorage.getItem("arvo_gate_passed"))||(un("saving"),ln(!0))}}catch(g){clearTimeout(i),clearTimeout(o),Pt(null),Rt(g.message||"N\xe5got gick fel. F\xf6rs\xf6k igen.")}}()},children:[(0,$d.jsxs)(af,{$active:Ht,$hasFile:!!$t||or,onClick:()=>{var e;return null===(e=jt.current)||void 0===e?void 0:e.click()},onDrop:e=>{e.preventDefault(),Wt(!1);const t=e.dataTransfer.files;(null===t||void 0===t?void 0:t.length)>1?sr(t):null!==t&&void 0!==t&&t[0]&&lr(t[0])},onDragOver:e=>{e.preventDefault(),Wt(!0)},onDragLeave:e=>{e.preventDefault(),Wt(!1)},role:"button",tabIndex:0,onKeyDown:e=>{var t;"Enter"!==e.key&&" "!==e.key||null===(t=jt.current)||void 0===t||t.click()},children:[(0,$d.jsx)("input",{ref:jt,type:"file",accept:"application/pdf,.pdf",multiple:!0,onChange:e=>{const t=e.target.files;(null===t||void 0===t?void 0:t.length)>1?sr(t):null!==t&&void 0!==t&&t[0]&&lr(t[0])}}),(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:$t||or?"check":"upload",size:28,stroke:1.75})}),or?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{className:"primary",children:[Qn.length," fakturor valda"]}),(0,$d.jsxs)("span",{className:"secondary",children:[Qn.map(e=>e.name).join(", ").slice(0,80),Qn.map(e=>e.name).join(", ").length>80?"\u2026":""]})]}):$t?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{className:"primary",children:"Faktura vald"}),(0,$d.jsxs)("span",{className:"filename",children:[$t.name," \xb7 ",($t.size/1024).toFixed(0)," kB"]})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{className:"primary",children:"undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"L\xe4gg till er faktura":"Dra hit er faktura"}),(0,$d.jsxs)("span",{className:"cta-pill",children:["undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"V\xe4lj faktura":"V\xe4lj fil"," \u2192"]}),(0,$d.jsx)("span",{className:"secondary",children:"PDF \xb7 max 3 MB \xb7 Vi sparar inte filen"})]})]}),($t||or)&&(0,$d.jsxs)(cf,{children:[(0,$d.jsxs)(of,{children:[(0,$d.jsxs)(lf,{children:[(0,$d.jsx)("span",{className:"label",children:"Bransch"}),(0,$d.jsx)("span",{className:"hint",children:"Vi j\xe4mf\xf6r mot bolag av er storlek i samma bransch."}),(0,$d.jsx)("select",{value:Et,onChange:e=>zt(e.target.value),children:Object.entries(Yf).map(e=>{let[t,n]=e;return(0,$d.jsx)("option",{value:t,children:n},t)})})]}),(0,$d.jsxs)(lf,{children:[(0,$d.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$d.jsx)("span",{className:"hint",children:"Prisniv\xe5n varierar med bolagets storlek."}),(0,$d.jsx)("input",{type:"number",min:"1",max:"5000",value:Nt,onChange:e=>At(e.target.value)})]})]}),Dt&&(0,$d.jsx)(pf,{children:Dt}),(0,$d.jsx)(sf,{children:or?(0,$d.jsx)(Id,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:ar,onClick:async()=>{var e,t;if(Qn.length<2)return;rr(null),Zn({status:"processing",total:Qn.length,done:0,failed:0}),tr(Qn.map((e,t)=>({index:t,filename:e.name,status:"pending"}))),ir(!0);let n=rn;try{var r;const e=await fetch("/api/token",{method:"POST"});n=null!==(r=(await e.json()).token)&&void 0!==r?r:rn,an(n)}catch{}const a=null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:void 0;let i=0,o=0;for(let c=0;c<Qn.length;c++){tr(e=>e.map((e,t)=>t===c?{...e,status:"extracting"}:e));try{var l;const e=await Jf(Qn[c]),t=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:Et,employees:parseInt(Nt,10)||5,token:null!==(l=n)&&void 0!==l?l:"dev",bypass:a})}),r=await t.json();r.route?(i++,tr(e=>e.map((e,t)=>t===c?{...e,status:"done",route:r.route,extracted:r.extracted,categorized:r.categorized,recommendation:r.recommendation}:e))):(o++,tr(e=>e.map((e,t)=>{var n;return t===c?{...e,status:"failed",error:null!==(n=r.error)&&void 0!==n?n:"Analys misslyckades"}:e})))}catch(s){o++,tr(e=>e.map((e,t)=>t===c?{...e,status:"failed",error:s.message}:e))}Zn({status:c===Qn.length-1?"done":"processing",total:Qn.length,done:i,failed:o})}ir(!1)},children:ar?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(hf,{})," Analyserar ",Qn.length," fakturor\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Analysera ",Qn.length," fakturor ",(0,$d.jsx)(bu,{name:"arrow",size:18})]})}):(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:pr||!$t,children:pr?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(hf,{})," Analyserar\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Analysera fakturan ",(0,$d.jsx)(bu,{name:"arrow",size:18})]})})})]}),pr&&(0,$d.jsx)(ff,{children:Qf.map(e=>{const t=(e=>{if(!Tt)return"pending";if("done"===Tt)return"done";const t=["uploading","extract","categorize","recommend"],n=t.indexOf(Tt),r=t.indexOf(e);return r<n?"done":r===n?"active":"pending"})(e.id);return(0,$d.jsxs)(mf,{$state:t,children:[(0,$d.jsx)("div",{className:"bullet",children:"done"===t?(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.5}):(0,$d.jsx)("span",{children:Qf.findIndex(t=>t.id===e.id)+1})}),(0,$d.jsxs)("div",{className:"label",children:[e.label,"active"===t&&e.sublabel&&(0,$d.jsx)("div",{style:{fontSize:11,opacity:.6,marginTop:2,fontWeight:400},children:e.sublabel})]}),(0,$d.jsx)("div",{className:"time",children:"done"===t?"\u2713":"active"===t?"\u2026":""})]},e.id)})}),(0,$d.jsxs)(uf,{children:["Genom att forts\xe4tta godk\xe4nner du v\xe5ra ",(0,$d.jsx)(vl,{to:"/villkor",children:"villkor"})," ","och v\xe5r ",(0,$d.jsx)(vl,{to:"/integritet",children:"integritetspolicy"}),". Fakturan analyseras av Arvo Intelligence och raderas omedelbart efter analysen."]})]})}),or&&(Xn||nr)&&(0,$d.jsxs)(rf,{style:{marginTop:20},children:[(0,$d.jsx)(Rf,{children:(0,$d.jsxs)("div",{children:[(0,$d.jsxs)("span",{className:"badge",children:[(0,$d.jsx)(bu,{name:"spark",size:10})," Batch-analys"]}),(0,$d.jsx)("h3",{children:"done"===(null===Xn||void 0===Xn?void 0:Xn.status)?"Analys klar":"failed"===(null===Xn||void 0===Xn?void 0:Xn.status)?"Analys misslyckades":"Analyserar fakturor\u2026"}),(0,$d.jsx)("div",{className:"sub",children:Xn?`${null!==(G=Xn.done)&&void 0!==G?G:0} av ${Xn.total} klara${Xn.failed?` \xb7 ${Xn.failed} misslyckades`:""}`:nr||`${Qn.length} fakturor k\xf6ade`})]})}),Xn&&(0,$d.jsx)(Lf,{$pct:Xn.total>0?Math.round(((null!==(Q=Xn.done)&&void 0!==Q?Q:0)+(null!==(J=Xn.failed)&&void 0!==J?J:0))/Xn.total*100):0,children:(0,$d.jsx)("div",{className:"fill"})}),nr&&(0,$d.jsx)(pf,{style:{marginBottom:16},children:nr}),"done"===(null===Xn||void 0===Xn?void 0:Xn.status)&&(()=>{const e=er.filter(e=>{var t;return null===e||void 0===e||null===(t=e.recommendation)||void 0===t?void 0:t.shouldSwitch}),t=e.reduce((e,t)=>{var n,r;return e+(null!==(n=null===(r=t.recommendation)||void 0===r?void 0:r.netSaving)&&void 0!==n?n:0)},0),n=er.filter(e=>"review_queue"===(null===e||void 0===e?void 0:e.route)).length;return(0,$d.jsxs)(Bf,{children:[(0,$d.jsxs)("div",{className:"stat highlight",children:[(0,$d.jsxs)("div",{className:"value",children:[Oh(Math.round(t/1e3)),"k"]}),(0,$d.jsx)("div",{className:"label",children:"Nettobesparing/\xe5r"})]}),(0,$d.jsxs)("div",{className:"stat",children:[(0,$d.jsx)("div",{className:"value",children:e.length}),(0,$d.jsx)("div",{className:"label",children:"Rekommenderar byte"})]}),(0,$d.jsxs)("div",{className:"stat",children:[(0,$d.jsx)("div",{className:"value",children:n}),(0,$d.jsx)("div",{className:"label",children:"Kr\xe4ver granskning"})]})]})})(),(0,$d.jsx)(Of,{children:(er.length>0?er:Qn.map((e,t)=>({index:t,filename:e.name,status:"pending"}))).map((e,t)=>{var n,r,a,i,o,l,s;const c=null!==(n=null===e||void 0===e?void 0:e.status)&&void 0!==n?n:"pending",d=null!==(r=null===e||void 0===e||null===(a=e.recommendation)||void 0===a?void 0:a.netSaving)&&void 0!==r?r:null,u="done"===c?"check":"failed"===c?"x":"processing"===c?"spark":"file",p="done"===c?"review_queue"===e.route?"Kr\xe4ver granskning":"unsupported"===e.route?"Utanf\xf6r scope":"Klar":"failed"===c?"Misslyckades":"processing"===c?"Kategoriserar\u2026":"extracting"===c?"L\xe4ser faktura\u2026":"V\xe4ntar\u2026";return(0,$d.jsxs)(If,{$status:c,children:[(0,$d.jsx)("div",{className:"icon-wrap",children:(0,$d.jsx)(bu,{name:u,size:14,stroke:2})}),(0,$d.jsx)("span",{className:"name",children:null!==(o=null!==(l=null===e||void 0===e?void 0:e.filename)&&void 0!==l?l:null===(s=Qn[t])||void 0===s?void 0:s.name)&&void 0!==o?o:`Faktura ${t+1}`}),(0,$d.jsx)("span",{className:"status-label",children:p}),d>0&&(0,$d.jsxs)("span",{className:"saving",children:["\u2212",Oh(d)," kr/\xe5r"]})]},null!==(i=null===e||void 0===e?void 0:e.index)&&void 0!==i?i:t)})}),"done"!==(null===Xn||void 0===Xn?void 0:Xn.status)&&"failed"!==(null===Xn||void 0===Xn?void 0:Xn.status)&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#888",textAlign:"center",margin:0},children:"Arvo analyserar fakturorna i bakgrunden. Uppdateras var 5:e sekund."})]}),Lt&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(rf,{ref:wt,children:[(0,$d.jsxs)(gf,{children:[(0,$d.jsxs)("div",{className:"bh-top",children:[(0,$d.jsxs)("span",{className:"bh-stamp",children:["Arvo-analys \xb7 ",(new Date).toLocaleDateString("sv-SE",{day:"numeric",month:"short",year:"numeric"}).toUpperCase()]}),(0,$d.jsx)("button",{className:"bh-dl",onClick:()=>En(!0),title:"Ladda ner analys",children:(0,$d.jsx)("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",children:(0,$d.jsx)("path",{d:"M12 5v14M5 12l7 7 7-7"})})})]}),(0,$d.jsx)("div",{className:"bh-main",children:(0,$d.jsx)("h2",{className:"bh-supplier",children:Lt.extracted.supplier})}),(0,$d.jsx)("div",{className:"bh-row",children:Lt.categorized&&(0,$d.jsxs)("span",{className:"bh-chip",children:["natavgift"===Lt.reason?"N\xe4tavgift":null!=Dr?`${Kh(Lt.categorized.category).label} & ${Lr}`:Kh(Lt.categorized.category).label||Lt.categorized.category,Lt.categorized.subType&&"natavgift"!==Lt.reason&&null==Dr?` \xb7 ${Lt.categorized.subType}`:""]})})]}),"monitoring"===Lt.route?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(Df,{style:{"--diag-color":Fr.dot},children:[(0,$d.jsxs)("div",{className:"gauge-wrap",children:[(0,$d.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E5E7EB",strokeWidth:"4.5"}),(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:Fr.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:`${Ur} ${Mr}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1s ease"}})]}),(0,$d.jsxs)("div",{className:"gauge-num",style:{color:Fr.dot},children:[(0,$d.jsx)("span",{className:"gauge-val",children:Cr}),(0,$d.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$d.jsxs)("div",{className:"diag-body",children:[(0,$d.jsxs)("div",{className:"diag-top",children:[(0,$d.jsx)("span",{className:"diag-score-label",children:"Arvo Score"}),(0,$d.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$d.jsxs)("span",{className:"diag-status",children:[(0,$d.jsx)(bu,{name:"alert-circle",size:13,color:Fr.dot,stroke:2}),(0,$d.jsx)("span",{className:"diag-label",style:{color:Fr.labelClr},children:Fr.label})]})]}),(0,$d.jsx)("p",{className:"diag-text",children:Br})]})]}),(0,$d.jsxs)(wf,{children:[(0,$d.jsxs)("div",{className:"monitoring-kicker",children:[(0,$d.jsx)("span",{className:"monitoring-dot"}),"Bevakning aktiverad"]}),"fixed_price"===Lt.contractType?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{children:["Fastprisavtal \u2014 bundet t.o.m. ",Lt.servicePeriodEnd?new Date(Lt.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):Lt.servicePeriodEnd,"."]}),(0,$d.jsx)("p",{children:Tr?`Fastprisavtal kan inte avslutas i f\xf6rtid. Avtalet l\xf6per ut om ${null!=Pr?`${Pr} dagar`:"kort tid"} \u2014 Arvo initierar nu f\xf6rhandling om nytt avtal.`:`Fastprisavtal kan inte avslutas i f\xf6rtid. Arvo bevakar avtalet och p\xe5minner er ${Lt.monitoringDate?new Date(Lt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):"3 m\xe5nader"} innan slutdatum s\xe5 ni hinner f\xf6rhandla fram ett nytt avtal i r\xe4tt tid.`})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:Tr?"Avtalet l\xf6per ut snart \u2014 Arvo agerar nu.":null!=Lt.cancellationNoticeDays?"Avtalet \xe4r l\xe5st \u2014 vi l\xe4gger det p\xe5 bevakning.":"\xc5rsavtal \u2014 Arvo bevakar inf\xf6r f\xf6rnyelse."}),(0,$d.jsx)("p",{children:(()=>{const e=Lt.servicePeriodEnd,t=Lt.cancellationNoticeDays,n=Lt.monitoringDate,r=e?new Date(e).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):null,a=n?new Date(n).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):null;return Tr?`Avtalet l\xf6per t.o.m. ${null!==r&&void 0!==r?r:e}${null!=Pr?` (${Pr} dagar kvar)`:""}. Arvo initierar omf\xf6rhandling och s\xe4krar b\xe4sta villkor innan f\xf6rnyelse.`:null!=t?`Avtalet l\xf6per t.o.m. ${null!==r&&void 0!==r?r:e}. Upps\xe4gningstiden (${t} dagar) har redan passerat. Arvo initierar omf\xf6rhandling ${null!==a&&void 0!==a?a:"90 dagar innan n\xe4sta f\xf6rnyelse"}.`:`Avtalet l\xf6per t.o.m. ${null!==r&&void 0!==r?r:e}. Vi p\xe5minner er i ${null!==a&&void 0!==a?a:"90 dagar innan slutdatum"} \u2014 i god tid f\xf6r att agera n\xe4r avtalet l\xf6per ut.`})()})]})]}),(0,$d.jsxs)(_f,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsxs)("dt",{children:["Ni betalar idag",Kh(null===(X=Lt.categorized)||void 0===X?void 0:X.category).elSuffix?" (energidel)":""]}),(0,$d.jsxs)("dd",{children:[Oh(Lt.extracted.annualCost)," / \xe5r","annual"!==Lt.extracted.billingPeriod&&(0,$d.jsx)("small",{style:{fontStyle:"italic"},children:"Projicerat fr\xe5n abonnemangsradernas listpris"})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturadatum"}),(0,$d.jsx)("dd",{children:Lt.extracted.date})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$d.jsx)("dd",{children:Oh(Lt.extracted.amount)})]}),Lt.extracted.servicePeriodEnd&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Avtalstid t.o.m."}),(0,$d.jsx)("dd",{children:new Date(Lt.extracted.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"})})]}),Lt.monitoringDate&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:Tr?"Bevakning":"Arvo p\xe5minner er"}),(0,$d.jsx)("dd",{children:Tr?null!=Pr?`Aktiv \u2014 avtal l\xf6per ut om ${Pr} dagar`:"Aktiv":(()=>{const e=new Date(Lt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"});return e.charAt(0).toUpperCase()+e.slice(1)})()})]})]}),((null===(Z=Lt.categorized)||void 0===Z?void 0:Z.reasoning)||Lt.potentialSavingNote)&&(0,$d.jsxs)(Af,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Avtals\xf6versikt"}),(null===(ee=Lt.categorized)||void 0===ee?void 0:ee.reasoning)&&(0,$d.jsxs)("p",{children:[Lt.categorized.normalizedSupplier||(null===(te=Lt.extracted)||void 0===te?void 0:te.supplier)," fakturerar"," ",Oh(null===(ne=Lt.extracted)||void 0===ne?void 0:ne.annualCost)," per \xe5r f\xf6r"," ",Kh(Lt.categorized.category).inlineLabel,"."," ","Avtalet \xe4r bevakat \u2014 Arvo tar kontakt"," ",null!=Pr&&Pr<=90?"nu inf\xf6r f\xf6rest\xe5ende f\xf6rnyelse":Lt.monitoringDate&&!Tr?`fr\xe5n ${new Date(Lt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"})}`:"inf\xf6r avtalets f\xf6rnyelse"," ","och s\xe4krar b\xe4sta villkor utan att ni beh\xf6ver l\xe4gga tid p\xe5 det."]}),Lt.potentialSavingNote&&(0,$d.jsxs)("p",{style:{marginTop:null!==(re=Lt.categorized)&&void 0!==re&&re.reasoning?10:0},children:[(0,$d.jsx)("strong",{children:"Potentiell nettobesparing vid avtalets slut:"})," ",Lt.potentialSavingNote]})]})]}):"unsupported"===Lt.route?(0,$d.jsx)(kf,{children:"natavgift"===Lt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"N\xe4tavgift \u2014 reglerat monopol, kan inte f\xf6rhandlas."}),(0,$d.jsxs)("p",{children:["Denna faktura \xe4r fr\xe5n er lokala n\xe4t\xe4gare (",null!==(ae=null===(ie=Lt.extracted)||void 0===ie?void 0:ie.supplier)&&void 0!==ae?ae:"n\xe4tbolaget",") och avser eln\xe4tets distributionskostnad. N\xe4tavgiften best\xe4ms av Energimarknadsinspektionen och \xe4r geografiskt bunden \u2014 den kan inte p\xe5verkas genom ett elleverant\xf6rsbyte."]}),(0,$d.jsxs)("p",{children:["Ladda upp er ",(0,$d.jsx)("strong",{children:"elhandelsfaktura"})," (fr\xe5n er elleverant\xf6r) f\xf6r att se om ni betalar r\xe4tt pris f\xf6r sj\xe4lva elen."]})]}):"credit_note"===Lt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Kreditnota \u2014 ingen analys m\xf6jlig."}),(0,$d.jsx)("p",{children:"Filen verkar vara en kreditnota med negativt belopp. Ladda upp den ordinarie fakturan f\xf6r en korrekt analys."})]}):"insurance"===Lt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"F\xf6rs\xe4kringar hanteras inte av Arvo \xe4nnu."}),(0,$d.jsx)("p",{children:"F\xf6rs\xe4kringsf\xf6rmedling kr\xe4ver tillst\xe5nd fr\xe5n Finansinspektionen. Arvo planerar att ans\xf6ka om detta tillst\xe5nd under 2027 \u2014 tills dess analyserar vi inte f\xf6rs\xe4kringsfakturor. Ladda upp en annan leverant\xf6rsfaktura f\xf6r att komma ig\xe5ng."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Utanf\xf6r analysr\xe4ckvidden."}),(0,$d.jsx)("p",{children:"Denna faktura avser en tj\xe4nst vi inte optimerar (t.ex. juridik, redovisning, bemanning eller myndighetsavgifter). Koppla Fortnox / Visma f\xf6r att analysera era \xf6vriga leverant\xf6rer."})]})}):"review_queue"===Lt.route?(0,$d.jsxs)(kf,{children:["volume_data_required"===Lt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Kr\xe4ver offert \u2014 v\xe5ra experter kikar p\xe5 detta."}),(0,$d.jsx)("p",{children:Lt.volumeDataNote||"Kostnaden f\xf6r denna kategori styrs av specifika volymer och specifikationer, inte antalet anst\xe4llda. V\xe5ra experter kikar p\xe5 detta manuellt f\xf6r att ge er en r\xe4ttvis analys."}),null!=Lt.creditExpiryMonths&&(0,$d.jsxs)(Sf,{style:Lt.creditWillExpireUnused?{background:"#FEF3C7",borderColor:"rgba(217,119,6,.25)"}:void 0,children:[(0,$d.jsx)("strong",{children:Lt.creditWillExpireUnused?`\u26a0 Krediter f\xf6rfaller ${Lt.creditExpiryDate} \u2014 ${Lt.creditExpiryMonths} ${1===Lt.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} kvar`:`Era startup-krediter r\xe4cker ca ${Lt.creditExpiryMonths} ${1===Lt.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} till`}),(0,$d.jsxs)("p",{children:["Ni f\xf6rbrukar ",Lt.startupCreditCurrency," ",null===(oe=Lt.startupCreditMonthlyBurn)||void 0===oe?void 0:oe.toLocaleString("sv-SE"),"/m\xe5n men betalar ingenting tack vare kvarvarande kredit (",Lt.startupCreditCurrency," ",null===(le=Lt.startupCreditBalance)||void 0===le?void 0:le.toLocaleString("sv-SE"),").",Lt.creditWillExpireUnused?` Vid nuvarande f\xf6rbrukningstakt f\xf6rfaller ca ${Lt.startupCreditCurrency} ${null===(se=Lt.creditUnusedAmount)||void 0===se?void 0:se.toLocaleString("sv-SE")} oanv\xe4nt. \xd6verv\xe4g att skala upp era resurser eller kontakta leverant\xf6ren om f\xf6rl\xe4ngning \u2014 sedan hj\xe4lper Arvo er att f\xf6rhandla r\xe4tt pris.`:" Nu \xe4r r\xe4tt tid att planera ert molnavtal \u2014 vi hj\xe4lper er att f\xf6rhandla r\xe4tt pris innan fakturorna b\xf6rjar landa."]})]})]}):"foreign_currency"===Lt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{children:["Fakturan \xe4r i ",Lt.currency," \u2014 kontakta oss."]}),(0,$d.jsx)("p",{children:"Vi st\xf6djer SEK och EUR. F\xf6r \xf6vriga valutor, kontakta oss s\xe5 hj\xe4lper vi er manuellt."})]}):"no_benchmark"===Lt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Utanf\xf6r v\xe5r nuvarande t\xe4ckning."}),(0,$d.jsx)("p",{children:"Vi har \xe4nnu inte benchmarkdata f\xf6r denna leverant\xf6rskategori. Vi noterar fakturan och \xe5terkommer n\xe4r vi kan g\xf6ra en fullst\xe4ndig analys."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Fakturan beh\xf6ver djupare analys."}),(0,$d.jsx)("p",{children:"V\xe5r algoritm \xe4r inte tillr\xe4ckligt s\xe4ker p\xe5 klassificeringen f\xf6r att visa automatiska besparingssiffror. Koppla Fortnox / Visma f\xf6r en komplett, felfri analys av hela er leverant\xf6rsreskontra."})]}),"sent"===Pn?(0,$d.jsx)("p",{style:{fontSize:13,color:"#1B6E66",fontWeight:600,marginTop:14,marginBottom:0},children:"\u2713 Vi h\xf6r av oss n\xe4r analysen \xe4r klar!"}):(0,$d.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Fn&&"idle"===Pn){Dn("submitting");try{await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:Fn,source:"review_queue",reason:null===Lt||void 0===Lt?void 0:Lt.reason})}),Dn("sent")}catch{Dn("sent")}}},style:{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@email.se \u2014 vi meddelar n\xe4r vi har ett svar",value:Fn,onChange:e=>Tn(e.target.value),required:!0,style:{flex:1,minWidth:180,padding:"9px 14px",borderRadius:100,border:"1.5px solid #D5E2DC",fontSize:13,outline:"none",background:"#fff",color:"#0E1A17"}}),(0,$d.jsx)("button",{type:"submit",disabled:!Fn||"submitting"===Pn,style:{padding:"9px 18px",borderRadius:100,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#5DD6CA,#1B6E66)",color:"#fff",fontSize:13,fontWeight:700,opacity:Fn&&"submitting"!==Pn?1:.55},children:"submitting"===Pn?"Skickar\u2026":"Meddela mig \u2192"})]})]}):null!==(ce=Lt.recommendation)&&void 0!==ce&&ce.requiresQuote?(0,$d.jsxs)($d.Fragment,{children:[((null===(de=Lt.recommendation)||void 0===de?void 0:de.clickRateAnalysis)||(null===(ue=Lt.recommendation)||void 0===ue?void 0:ue.shouldSwitch)&&(null!==(pe=null===(he=Lt.recommendation)||void 0===he?void 0:he.netSaving)&&void 0!==pe?pe:0)>0)&&(0,$d.jsx)($d.Fragment,{children:(0,$d.jsxs)(Af,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Vad analysen visar"}),(0,$d.jsx)("p",{children:Lt.recommendation.reasoning})]})}),(null===(fe=Lt.recommendation)||void 0===fe||null===(me=fe.clickRateAnalysis)||void 0===me?void 0:me.estimatedAnnualSavingsHigh)>0?(0,$d.jsxs)(vf,{children:[(0,$d.jsxs)("div",{className:"estimate-header",children:[(0,$d.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$d.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$d.jsxs)("span",{className:"amount",children:["\u2248 ",Kf(Lt.recommendation.clickRateAnalysis.estimatedAnnualSavingsLow),"\u2013",Kf(Lt.recommendation.clickRateAnalysis.estimatedAnnualSavingsHigh),"\xa0kr/\xe5r"]}),(0,$d.jsx)("span",{className:"unit",children:"Er faktiska klickkostnad p\xe5 \xe5rsbasis mot marknadsbandet (estimat) \xb7 exakt belopp bekr\xe4ftas med offert"})]}):(null!==(ge=null===(xe=Lt.recommendation)||void 0===xe?void 0:xe.netSaving)&&void 0!==ge?ge:0)>0?(0,$d.jsxs)(vf,{children:[(0,$d.jsxs)("div",{className:"estimate-header",children:[(0,$d.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$d.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$d.jsxs)("span",{className:"amount",children:["\u2248 +",Kf(Lt.recommendation.netSaving),"\xa0kr/\xe5r"]}),(0,$d.jsx)("span",{className:"unit",children:"J\xe4mf\xf6rt mot v\xe4lf\xf6rhandlat B2B-avtal \xb7 bekr\xe4ftas med faktisk offert"})]}):null,(0,$d.jsxs)(kf,{children:[(0,$d.jsx)("strong",{children:null!==(ve=Lt.recommendation)&&void 0!==ve&&ve.clickRateAnalysis?"Ber\xe4kna exakt besparing per \xe5r":(null!==(be=null===(ye=Lt.recommendation)||void 0===ye?void 0:ye.netSaving)&&void 0!==be?be:0)>0?"S\xe4kra besparingen \u2014 kr\xe4ver offert":"unaudited"===(null===(ke=Lt.recommendation)||void 0===ke?void 0:ke.revisionGate)?"Kr\xe4ver offert \u2014 Arvo g\xf6r en manuell genomg\xe5ng":"Kr\xe4ver offert \u2014 volymdata beh\xf6vs."}),(0,$d.jsx)("p",{children:null!==(je=Lt.recommendation)&&void 0!==je&&je.clickRateAnalysis?"Klickpriset \xe4r fastslaget. Fyll i nedan s\xe5 ber\xe4knar Arvo det exakta beloppet inklusive maskinleasing.":(null!==(we=null===(Se=Lt.recommendation)||void 0===Se?void 0:Se.netSaving)&&void 0!==we?we:0)>0?"Fyll i era uppgifter \u2014 Arvo beg\xe4r in och sammanst\xe4ller offerter fr\xe5n rikst\xe4ckande avfallspartners.":Lt.recommendation.reasoning}),(0,$d.jsx)(jf,{onSubmit:e=>{e.preventDefault(),yn&&jn&&"idle"===Sn&&($n("sent"),setTimeout(()=>{if(!wt.current)return;const e=wt.current.getBoundingClientRect().top+window.pageYOffset-16;window.scrollTo({top:e,behavior:"smooth"})},50),fetch("/api/quote-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contactEmail:yn.trim().toLowerCase(),contactName:gn.trim()||void 0,contactCompany:vn.trim()||void 0,mandateAccepted:!0,extractedData:null===Lt||void 0===Lt?void 0:Lt.extracted,categorized:null===Lt||void 0===Lt?void 0:Lt.categorized})}).catch(e=>console.error("[quote-request]",e)))},children:"sent"===Sn?(0,$d.jsxs)("div",{className:"qlf-sent",children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.5}),"Tack! Bekr\xe4ftelse \xe4r skickad till din e-post. Vi \xe5terkommer med offerter inom 1\u20132 arbetsdagar."]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{className:"qlf-fields",children:[(0,$d.jsx)("input",{type:"text",placeholder:"Ditt namn",value:gn,onChange:e=>xn(e.target.value)}),(0,$d.jsx)("input",{type:"text",placeholder:"F\xf6retag",value:vn,onChange:e=>bn(e.target.value)}),(0,$d.jsx)("input",{className:"qlf-full",type:"email",placeholder:"Din e-post (dit skickar vi offertsammanst\xe4llningen)",required:!0,value:yn,onChange:e=>kn(e.target.value)})]}),(0,$d.jsxs)("label",{className:"qlf-mandate",children:[(0,$d.jsx)("input",{type:"checkbox",checked:jn,onChange:e=>wn(e.target.checked)}),(0,$d.jsxs)("span",{children:["Jag ger ",(0,$d.jsx)("em",{children:"Arvo Flow"})," fullmakt att beg\xe4ra in, sammanst\xe4lla och presentera offerter fr\xe5n leverant\xf6rer \xe5 mitt bolags v\xe4gnar."]})]}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"sm",disabled:"submitting"===Sn||!jn,style:{width:"100%",justifyContent:"center"},children:"submitting"===Sn?"Startar...":"Starta offertprocessen \u2192"}),(0,$d.jsx)("p",{className:"qlf-zero-risk",children:"Ni betalar ingenting om vi inte hittar besparingar \u2014 20\xa0% av identifierad besparing."})]})})]})]}):hr?(0,$d.jsx)($d.Fragment,{children:(0,$d.jsxs)(xf,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Dold kostnad hittad"}),(0,$d.jsxs)("span",{className:"amount",children:["+",Oh(gr)]}),(0,$d.jsxs)("span",{className:"unit",children:["Ni betalar ",Kf(fr)," kr/\xe5r f\xf6r en tj\xe4nst som redan ing\xe5r i er licens"," ","\xb7 Arvos besparingsarvode ",Oh(mr)," (20 %)"]})]})}):null!==($e=Lt.recommendation)&&void 0!==$e&&$e.shouldSwitch&&(null===(_e=Lt.recommendation)||void 0===_e?void 0:_e.netSaving)>0?(0,$d.jsx)($d.Fragment,{children:((e,t,n,r,a,i)=>{const o=Ir.isRealPrice,l=Lt.categorized.licensePending,s=(Ir.partnerLabel,(null!==(e=Lt.recommendation.suggestedSupplier)&&void 0!==e?e:"").toLowerCase().trim()),c=(null!==(t=null!==(n=null===(r=Lt.categorized)||void 0===r?void 0:r.normalizedSupplier)&&void 0!==n?n:null===(a=Lt.extracted)||void 0===a?void 0:a.supplier)&&void 0!==t?t:"").toLowerCase().trim();o&&s&&c&&(s===c||s.includes(c)||c.includes(s))&&Lt.recommendation.suggestedSupplier;return(0,$d.jsxs)($d.Fragment,{children:[Br&&(0,$d.jsxs)(Df,{style:{"--diag-color":Fr.dot},children:[(0,$d.jsxs)("div",{className:"gauge-wrap",children:[(0,$d.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E9F1ED",strokeWidth:"4.5"}),(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:Fr.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:Kr?`${Vr/100*Mr} ${Mr}`:`0 ${Mr}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)"}})]}),(0,$d.jsxs)("div",{className:"gauge-num",style:{color:Fr.dot},children:[(0,$d.jsx)("span",{className:"gauge-val",children:Vr}),(0,$d.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$d.jsxs)("div",{className:"diag-body",children:[(0,$d.jsxs)("div",{className:"diag-top",children:[(0,$d.jsx)("span",{className:"diag-score-label",children:"Arvo Score\u2122"}),(0,$d.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$d.jsxs)("span",{className:"diag-status",children:[(0,$d.jsx)(bu,{name:"alert-circle",size:13,color:Fr.dot,stroke:2}),(0,$d.jsx)("span",{className:"diag-label",style:{color:Fr.labelClr},children:Fr.label})]})]}),(0,$d.jsx)("p",{className:"diag-text",children:Br})]})]}),(0,$d.jsxs)(xf,{children:[(0,$d.jsx)("span",{className:"kicker",children:l?"M\xf6jlig \xe5rlig besparing":"Din identifierade nettobesparing"}),(0,$d.jsxs)("span",{className:"amount",children:["+",Oh($r)]}),(0,$d.jsx)("span",{className:"unit",children:l?"F\xf6rs\xe4kring kr\xe4ver FI-licens \u2014 vi byter inte sj\xe4lva \xe4nnu, men visar gapet.":o&&Lt.recommendation.suggestedSupplier?(0,$d.jsxs)($d.Fragment,{children:[Kf(kr)," \u2192 ",Kf(Lt.recommendation.suggestedAnnualCost)," kr/\xe5r hos ",(0,$d.jsx)("strong",{children:Lt.recommendation.suggestedSupplier})," ","\xb7 Arvos besparingsarvode ",Oh(wr)," (20 %)",yr&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("br",{}),(0,$d.jsxs)("small",{style:{opacity:.85},children:["Avser abonnemang och licenser. Om ",Lt.recommendation.suggestedSupplier," absorberar er h\xe5rdvaruskuld (",Kf(br)," kr) uppg\xe5r nettobesparing till ",Oh(Lt.recommendation.netSaving)," kr/\xe5r."]})]})]}):(0,$d.jsxs)($d.Fragment,{children:[Kf(kr)," \u2192 ",Kf(Lt.recommendation.suggestedAnnualCost)," kr/\xe5r (Arvos kalkylerade riktpris)"," ","\xb7 Arvos besparingsarvode ",Oh(wr)," (20 %)"]})})]}),!l&&(0,$d.jsx)(bf,{$compact:!0,children:"list-verified"===Ir.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Vid genomf\xf6rt byte bekr\xe4ftas slutpriset i offert innan ni godk\xe4nner.":null!==(i=Ir.benchmarkNote)&&void 0!==i?i:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner."})]})})()}):"uncategorized"===(null===(Ee=Lt.categorized)||void 0===Ee?void 0:Ee.category)?(0,$d.jsxs)(kf,{children:[(0,$d.jsx)("strong",{children:"Kategorin \xe4r under analys."}),(0,$d.jsx)("p",{children:"Koppla Fortnox / Visma s\xe5 mappar vi era volymer mot marknadens b\xe4sta priser direkt."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(kf,{style:{marginTop:0},children:[(0,$d.jsx)("strong",{children:"V\xe4l f\xf6rhandlat."})," ",null!==(ze=null===(Ne=Lt.recommendation)||void 0===Ne?void 0:Ne.monitoringNote)&&void 0!==ze?ze:"Vi hittar inget prisgap mot marknadens b\xe4sta f\xf6rhandlade niv\xe5 \u2014 Arvo rekommenderar inget byte i dag."]}),!(null!==(Ae=Lt.recommendation)&&void 0!==Ae&&Ae.shouldSwitch)&&(null===(Ce=Lt.recommendation)||void 0===Ce?void 0:Ce.reasoning)&&(0,$d.jsxs)(Af,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$d.jsx)("p",{children:Kh(Lt.categorized.category).isRealPrice?Lt.recommendation.reasoning:qf(Lt.recommendation.reasoning,Lt.recommendation.suggestedSupplier)})]})]}),(null===(Fe=Lt.recommendation)||void 0===Fe?void 0:Fe.reasoning)&&(null===(Te=Lt.recommendation)||void 0===Te?void 0:Te.shouldSwitch)&&!hr&&!Or&&(0,$d.jsxs)(Af,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$d.jsx)("p",{children:Kh(Lt.categorized.category).isRealPrice?Lt.recommendation.reasoning:qf(Lt.recommendation.reasoning,Lt.recommendation.suggestedSupplier)})]}),(null===(Pe=Lt.recommendation)||void 0===Pe?void 0:Pe.shouldSwitch)&&!hr&&((e,t)=>{const n=null===(e=Lt.extracted)||void 0===e?void 0:e.seatCount,r=Number(Nt),a=null!=n&&n>r?n-r:0,i=Kh(null===(t=Lt.categorized)||void 0===t?void 0:t.category);return a>0?(0,$d.jsx)(Zf,{seatCount:n,employees:r,overage:a,term:i.unit,termSing:i.unitSingular}):null})(),(0,$d.jsx)(df,{onClick:()=>Mn(e=>!e),children:Bn?"\u2191 D\xf6lj underlag":"\u2193 Hur vi r\xe4knar"}),Bn&&(0,$d.jsxs)($d.Fragment,{children:["auto"===Lt.route&&!(null!==(De=Lt.categorized)&&void 0!==De&&De.licensePending)&&!(null!==(Re=Lt.recommendation)&&void 0!==Re&&Re.shouldSwitch&&(null===(Le=Lt.recommendation)||void 0===Le?void 0:Le.netSaving)>0&&!hr)&&(0,$d.jsx)(bf,{children:"list-verified"===Ir.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Vid genomf\xf6rt byte bekr\xe4ftas slutpriset i offert innan ni godk\xe4nner.":null!==(Oe=Ir.benchmarkNote)&&void 0!==Oe?Oe:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner."}),"auto"===Lt.route&&!(null!==(Ie=Lt.categorized)&&void 0!==Ie&&Ie.licensePending)&&!Ir.isRealPrice&&Lt.savingRange&&(0,$d.jsxs)(Pf,{children:[(0,$d.jsx)("span",{className:"range-label",children:"Intervall:"}),Kf(Lt.savingRange.low)," \u2013 ",Kf(Lt.savingRange.high)," kr/\xe5r netto"]}),"auto"===Lt.route&&!(null!==(Be=Lt.categorized)&&void 0!==Be&&Be.licensePending)&&Lt.calculationChain&&(0,$d.jsx)(Xf,{cc:Lt.calculationChain}),(null===(Me=Lt.extracted)||void 0===Me?void 0:Me.potentialMixedCategories)&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#9CA3AF",marginBottom:14,lineHeight:1.5,fontStyle:"italic"},children:Dr?(0,$d.jsxs)($d.Fragment,{children:["Kombinerad faktura \u2014"," ",Kh(null===(Ue=Lt.categorized)||void 0===Ue?void 0:Ue.category).label,null!=(null===(Ve=Lt.extracted)||void 0===Ve?void 0:Ve.primaryComponentMonthly)?` (${Oh(12*Lt.extracted.primaryComponentMonthly)}/\xe5r)`:""," ","+ ",Lr," (",Oh(Dr.currentAnnual),"/\xe5r)."," ","Besparing:"," ",Kh(null===(Ke=Lt.categorized)||void 0===Ke?void 0:Ke.category).label," ","\u2212",Oh(Rr),"/\xe5r"," ","|"," ",Lr," \u2212",Oh(Dr.grossSaving),"/\xe5r."]}):(0,$d.jsxs)($d.Fragment,{children:["Kombinerad faktura \u2014 analysen avser"," ",Kh(null===(He=Lt.categorized)||void 0===He?void 0:He.category).label,null!=(null===(We=Lt.extracted)||void 0===We?void 0:We.primaryComponentMonthly)?` (${Oh(12*Lt.extracted.primaryComponentMonthly)}/\xe5r)`:"",(null!==(qe=null===(Ye=Lt.recommendation)||void 0===Ye?void 0:Ye.nonPrimaryAnnual)&&void 0!==qe?qe:0)>0?`. \xd6vriga tj\xe4nster (${Oh(Lt.recommendation.nonPrimaryAnnual)}/\xe5r) analyseras via Fortnox/Visma.`:"."]})}),null!=(null===(Ge=Lt.extracted)||void 0===Ge?void 0:Ge.annualCost)&&"monitoring"!==Lt.route&&"unsupported"!==Lt.route&&(0,$d.jsxs)(_f,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Ni betalar idag"}),(0,$d.jsxs)("dd",{children:[Oh(kr)," / \xe5r",yr?(0,$d.jsxs)("small",{children:["Abonnemang och licenser. Exkl. h\xe5rdvaruavbetalningar (",Oh(vr),"/\xe5r)",Lt.extracted.variableCharges>0?` och r\xf6rliga avgifter (${Oh(Lt.extracted.variableCharges)} denna period)`:"","."]}):Lt.extracted.variableCharges>0&&(0,$d.jsxs)("small",{children:["Varav fasta abonnemang. Exkl. r\xf6rliga avgifter (",Oh(Lt.extracted.variableCharges)," denna period)."]})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturadatum"}),(0,$d.jsx)("dd",{children:Lt.extracted.date})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$d.jsxs)("dd",{children:[Oh(Lt.extracted.amount),Lt.extracted.oneTimeFees>0&&(0,$d.jsxs)("small",{children:["Inkl. ",Oh(Lt.extracted.oneTimeFees)," ",Lt.extracted.elSkatterKr>0?"lagstadgade avgifter":"eng\xe5ngskostnader"," \u2014 ing\xe5r ej i \xe5rsber\xe4kningen ovan."]})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"\xc5terkommande"}),(0,$d.jsx)("dd",{children:Lt.extracted.recurring?"Ja (abonnemang / premie)":"Nej"})]}),"EUR"===Lt.extracted.originalCurrency&&(0,$d.jsxs)("div",{style:{gridColumn:"1 / -1"},children:[(0,$d.jsx)("dt",{children:"Valutakonvertering"}),(0,$d.jsx)("dd",{children:(0,$d.jsxs)("small",{children:["Fakturan \xe4r i EUR \u2014 konverterad till SEK med kursen ",null===(Qe=Lt.extracted.fxRate)||void 0===Qe?void 0:Qe.toFixed(2)," SEK/EUR",Lt.extracted.fxSource&&"fallback"!==Lt.extracted.fxSource?` (Riksbanken/ECB ${null!==(Je=Lt.extracted.fxDate)&&void 0!==Je?Je:""})`:" (fallback-kurs)",". Alla belopp ovan \xe4r i SEK."]})})]}),xr.length>0&&(0,$d.jsx)("div",{style:{gridColumn:"1 / -1"},children:(0,$d.jsxs)(Sf,{children:[(0,$d.jsx)("strong",{children:"\u26a0 Aktiv h\xe5rdvaruleasing \u2014 kontrollera innan ni byter"}),(0,$d.jsxs)("p",{children:[xr.map((e,t)=>(0,$d.jsxs)("span",{style:{display:"block",marginBottom:xr.length>1&&t<xr.length-1?"6px":0},children:[e.description," \u2014 ",e.monthsRemaining," m\xe5nader kvar (",Kf(e.monthlyCost)," kr/m\xe5n = ",(0,$d.jsxs)("strong",{children:[Kf(e.remainingCost)," kr totalt"]}),")"]},t)),xr.length>1&&(0,$d.jsxs)("span",{style:{display:"block",marginTop:"6px",fontWeight:700},children:["Totalt kvar att betala: ",Kf(br)," kr"]})]}),yr&&jr>0&&((e,t)=>{const n=(br/jr).toFixed(1).replace(".",",");return(0,$d.jsxs)("p",{style:{marginTop:8,paddingTop:8,borderTop:"1px solid rgba(0,0,0,0.08)"},children:[(0,$d.jsx)("strong",{children:"Break-even om skulden l\xf6ses kontant:"})," ",Kf(br)," kr \xf7 ",Kf(jr)," kr/\xe5r = ",(0,$d.jsxs)("strong",{children:[n," \xe5r"]})," ","\u2014"," ","fr\xe5ga ",null!==(e=null===(t=Lt.recommendation)||void 0===t?void 0:t.suggestedSupplier)&&void 0!==e?e:"den nya leverant\xf6ren"," om de kan absorbera skulden vid avtalssignering. Om ja \xe4r besparingen ",Oh(Lt.recommendation.netSaving)," kr/\xe5r netto fr\xe5n dag ett."]})})()]})}),Lt.extracted.elUncertaintyNote&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"\xc5rsuppskattning"}),(0,$d.jsx)("dd",{children:(0,$d.jsx)("small",{children:Lt.extracted.elUncertaintyNote})})]}),Lt.extracted.elSkatterKr>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Skatter & lagstadgade avgifter"}),(0,$d.jsxs)("dd",{children:[Oh(Lt.extracted.elSkatterKr),(0,$d.jsx)("small",{children:"Energiskatt, elcertifikat m.m. \u2014 ej f\xf6rhandlingsbara, ing\xe5r ej i besparingskalkylen."})]})]}),Lt.extracted.elNatavgiftAnnual>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"N\xe4tavgift (ej valbar)"}),(0,$d.jsxs)("dd",{children:[Oh(Lt.extracted.elNatavgiftAnnual)," / \xe5r",(0,$d.jsx)("small",{children:"Eln\xe4tsavgiften best\xe4ms av din regionala n\xe4toperat\xf6r och kan inte bytas via elleverant\xf6rsbyte \u2014 ing\xe5r ej i besparingskalkylen."})]})]}),Lt.extracted.variableCharges>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"R\xf6rliga avgifter denna period"}),(0,$d.jsxs)("dd",{children:[Oh(Lt.extracted.variableCharges),(0,$d.jsx)("small",{children:null!==(Xe=Kh(null===(Ze=Lt.categorized)||void 0===Ze?void 0:Ze.category).variableChargeNote)&&void 0!==Xe?Xe:"R\xf6rliga avgifter denna period \u2014 ej inkluderat i \xe5rsber\xe4kningen."}),"mobil"===(null===(et=Lt.categorized)||void 0===et?void 0:et.category)&&((e,t)=>{const n=Lt.extracted.roamingZone,r=null!==(e=Lt.extracted.recurringAmount)&&void 0!==e?e:0,a=null!==(t=Lt.extracted.variableCharges)&&void 0!==t?t:0;return a<Math.max(.3*r,1e3)?null:n>=4?(0,$d.jsxs)($f,{$type:"satellite",children:[(0,$d.jsx)(bu,{name:"globe",size:14}),(0,$d.jsx)("span",{children:"Satellit- och maritim datatrafik (Zon 4) \xe4r teknikberoende \u2014 kan inte optimeras via operat\xf6rsbyte och ing\xe5r inte i Arvos besparing."})]}):(0,$d.jsxs)($f,{children:[(0,$d.jsx)(bu,{name:"info",size:14}),(0,$d.jsxs)("span",{children:["Roamingkostnader p\xe5 ",Oh(a)," denna period. Om detta \xe4r \xe5terkommande kan ett mobilavtal med b\xe4ttre EU-datapaket minska kostnaden \u2014 Arvo tittar p\xe5 detta vid ett leverant\xf6rsbyte."]})]})})()]})]}),"saas-productivity"===(null===(tt=Lt.categorized)||void 0===tt?void 0:tt.category)&&(null===(nt=Lt.extracted)||void 0===nt?void 0:nt.licenseType)&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Licensplan"}),(0,$d.jsxs)("dd",{children:[Lt.extracted.licenseType,"monthly"===Lt.extracted.billingCycleType&&(0,$d.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#A8761A",fontWeight:600},children:"M\xe5nadsvis"}),"annual"===Lt.extracted.billingCycleType&&(0,$d.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#1B7A6E",fontWeight:600},children:"\xc5rsavtal"})]})]}),"saas-productivity"===(null===(rt=Lt.categorized)||void 0===rt?void 0:rt.category)&&(null===(at=Lt.recommendation)||void 0===at?void 0:at.annualBillingSaving)>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"M\xf6jlighet \u2014 \xe5rsavtal"}),(0,$d.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",Oh(Lt.recommendation.annualBillingSaving),"/\xe5r utan leverant\xf6rsbyte"]})]}),"saas-productivity"===(null===(it=Lt.categorized)||void 0===it?void 0:it.category)&&(e=>{const t=null===(e=Lt.recommendation)||void 0===e?void 0:e.savingsBreakdown;if(!t)return null;const n=[{label:"Marknadsgap",value:t.cspDiscount},{label:"Tier-optimering (advisory)",value:t.tierOptimization},{label:"Licensrensning",value:t.licenseCleanup}].filter(e=>e.value>0);return n.length<2?null:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{style:{gridColumn:"1 / -1",borderTop:"1px solid #D5E2DC",marginTop:"4px",paddingTop:"10px"},children:(0,$d.jsx)("dt",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#5C6E68",marginBottom:"6px"},children:"Besparing per kanal"})}),n.map(e=>(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:e.label}),(0,$d.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",Oh(e.value),"/\xe5r"]})]},e.label))]})})()]}),(null===(ot=Lt.recommendation)||void 0===ot?void 0:ot.reasoning)&&(hr||Or)&&(0,$d.jsxs)(Af,{children:[(0,$d.jsx)("span",{className:"kicker",children:hr?"Vad vi hittade":"Kombinerad analys"}),(0,$d.jsx)("p",{children:Kh(Lt.categorized.category).isRealPrice?Lt.recommendation.reasoning:qf(Lt.recommendation.reasoning,Lt.recommendation.suggestedSupplier)})]}),"saas-productivity"===(null===(lt=Lt.categorized)||void 0===lt?void 0:lt.category)&&(null!==(st=null===(ct=Lt.recommendation)||void 0===ct?void 0:ct.tierOptimizationSaving)&&void 0!==st?st:0)>0&&(0,$d.jsxs)(Ff,{children:[(0,$d.jsxs)("button",{className:"acc-trigger",onClick:()=>cn(e=>!e),"aria-expanded":sn,children:[(0,$d.jsx)("span",{className:"acc-icon",children:"\u26a1"}),(0,$d.jsxs)("span",{className:"acc-label-group",children:[(0,$d.jsx)("span",{className:"acc-label",children:"Licensoptimering"}),!sn&&(0,$d.jsx)("span",{className:"acc-hint",children:"Klicka f\xf6r att se detaljer \u2192"})]}),(0,$d.jsxs)("span",{className:"acc-amount",children:["ytterligare +",Kf(Math.round(.8*Lt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]}),(0,$d.jsx)("span",{className:"acc-chevron"+(sn?" open":""),children:(0,$d.jsx)(bu,{name:"chevron-right",size:16,stroke:2.5})})]}),sn&&(0,$d.jsxs)("div",{className:"acc-body",children:[(0,$d.jsxs)("p",{className:"acc-intro",children:["Ni kan spara ytterligare"," ",(0,$d.jsxs)("strong",{children:[Kf(Math.round(.8*Lt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]})," ","(efter Arvos arvode om ",Kf(Math.round(.2*Lt.recommendation.tierOptimizationSaving)),"\xa0kr) genom att byta"," ","fr\xe5n\xa0",(0,$d.jsx)("strong",{children:null!==(dt=Vf[Lt.recommendation.tierOptimizationFromTier])&&void 0!==dt?dt:Lt.recommendation.tierOptimizationFromTier})," ","till\xa0",(0,$d.jsx)("strong",{children:null!==(ut=Vf[Lt.recommendation.tierOptimizationToTier])&&void 0!==ut?ut:Lt.recommendation.tierOptimizationToTier}),"."]}),(0,$d.jsxs)("div",{className:"acc-row",children:[(0,$d.jsx)("span",{className:"acc-row-icon",style:{color:"#1B7A6E"},children:(0,$d.jsx)(bu,{name:"check-circle",size:15,stroke:2.5})}),(0,$d.jsxs)("div",{className:"acc-row-content",children:[(0,$d.jsx)("div",{className:"acc-row-head keeps",children:"Vad ni beh\xe5ller"}),(0,$d.jsx)("p",{className:"acc-row-text",children:"Teams, Exchange, desktop Office, SharePoint, 1\xa0TB\xa0OneDrive/anv\xe4ndare"})]})]}),(0,$d.jsxs)("div",{className:"acc-row",children:[(0,$d.jsx)("span",{className:"acc-row-icon",style:{color:"#A8761A"},children:(0,$d.jsx)(bu,{name:"alert-triangle",size:15,stroke:2.5})}),(0,$d.jsxs)("div",{className:"acc-row-content",children:[(0,$d.jsx)("div",{className:"acc-row-head loses",children:"Vad ni tappar"}),(0,$d.jsx)("p",{className:"acc-row-text",children:"Intune MDM (centraliserad enhetshantering) och Defender for Business (endpoint-s\xe4kerhet)"})]})]}),(0,$d.jsxs)("p",{className:"acc-disclaimer",children:["Passar bolag utan aktiv MDM-policy eller externt hanterat s\xe4kerhetsansvar. \xc4r ni os\xe4kra \u2014 beh\xe5ll Premium och spara \xe4nd\xe5 ",Kf(null!==(pt=Lt.recommendation.netSaving)&&void 0!==pt?pt:0),"\xa0kr/\xe5r."]}),(0,$d.jsxs)("div",{className:"acc-combined",children:[(0,$d.jsx)("span",{className:"acc-combined-label",children:"Totalt om ni g\xf6r b\xe5da \xe5tg\xe4rderna"}),(0,$d.jsxs)("span",{className:"acc-combined-amount",children:["ca +",Kf((null!==(ht=Lt.recommendation.netSaving)&&void 0!==ht?ht:0)+Math.round(.8*Lt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]})]}),(0,$d.jsx)("div",{className:"acc-cta",children:(0,$d.jsx)(Id,{as:vl,to:"/connect",$variant:"gradient",$size:"sm",children:"Inkludera i bytet \u2192"})})]})]})]})," "]}),Xr&&(0,$d.jsxs)(yf,{children:[(0,$d.jsx)("div",{className:"switch-eyebrow",children:"Arvo Switch"}),(0,$d.jsx)("h3",{children:"Priset \xe4r verifierat. Arvo f\xf6rbereder bytet."}),(0,$d.jsx)("p",{className:"sub",children:"Priset \xe4r leverant\xf6rens officiella avtalspris \u2014 verifierat och tillg\xe4ngligt utan f\xf6rhandling. Ni beh\xf6ver inte kontakta er nuvarande leverant\xf6r \u2014 Arvo f\xf6rbereder hela bytet."}),(0,$d.jsxs)("div",{className:"switch-steps",children:[(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"1"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Ni aktiverar bytet"}),(0,$d.jsx)("span",{className:"step-detail",children:"Ett klick \u2014 Arvo tar det d\xe4rifr\xe5n."})]})]}),(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"2"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Arvo f\xf6rbereder allt"}),(0,$d.jsx)("span",{className:"step-detail",children:"Fullmakt och bytesplan i er inkorg inom 24 timmar \u2014 ni granskar och signerar."})]})]}),(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"3"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Nytt avtalspris aktivt"}),(0,$d.jsx)("span",{className:"step-detail",children:"Ni betalar 20\xa0% av den identifierade besparingen \u2014 inget annat."})]})]})]}),(0,$d.jsxs)("div",{className:"switch-offer",children:[(0,$d.jsxs)("div",{className:"switch-offer-head",children:[(0,$d.jsx)("span",{className:"switch-badge",children:(0,$d.jsx)(bu,{name:"check",size:13,stroke:2.5})}),(0,$d.jsxs)("div",{className:"switch-supplier",children:[(0,$d.jsx)("p",{className:"switch-supplier-name",children:Hr?Lt.recommendation.suggestedSupplier:qr}),(0,$d.jsxs)("span",{className:"switch-price-label",children:[(0,$d.jsx)(bu,{name:"shield",size:10,stroke:2}),Hr?"Verifierat listpris":"Arvo-verifierad leverant\xf6r"]})]})]}),(0,$d.jsxs)("div",{className:"switch-offer-body",children:[(0,$d.jsxs)("div",{className:"sp-from-row",children:[(0,$d.jsxs)("span",{className:"sp-old",children:[Oh(kr),"/\xe5r"]}),(0,$d.jsx)("span",{className:"sp-from-arrow",children:"\u2192"})]}),(0,$d.jsxs)("span",{className:"sp-new",children:[Kf(Lt.recommendation.suggestedAnnualCost),(0,$d.jsx)("small",{children:"kr/\xe5r"})]}),(0,$d.jsxs)("span",{className:"sp-save-note",children:["Ni sparar ",Oh(jr),"/\xe5r \u2014 Arvo tar 20\xa0% av det"]})]})]}),(0,$d.jsxs)(Id,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{en(pn||""),nn("idle"),Xt(!0)},children:[Jr," ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})]}),(0,$d.jsxs)(Mf,{children:[(0,$d.jsx)("div",{className:"eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h3",{children:"Det h\xe4r var en faktura."}),(0,$d.jsxs)("div",{className:"briefing-preview",children:[(0,$d.jsxs)("div",{className:"preview-header",children:[(0,$d.jsxs)("span",{children:[(0,$d.jsx)("span",{className:"preview-live-dot"}),(0,$d.jsx)("span",{className:"preview-brand-name",children:"Arvo Intelligence"})]}),(0,$d.jsx)("span",{className:"preview-time",children:"Exempel ur en briefing"})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"pulse",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Smygh\xf6jningslarm"}),(0,$d.jsxs)("div",{className:"signal-line",children:["Telia \xb7 Mobilflotta 24 abonnemang",(0,$d.jsx)("span",{className:"signal-badge",children:"+11\xa0%"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Pris h\xf6jt mot f\xf6reg\xe5ende period \u2014 utan avisering. S\xe5 h\xe4r ser larmet ut n\xe4r det h\xe4nder er."})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"benchmark",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Community Benchmark"}),(0,$d.jsx)("div",{className:"bench-grid",children:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(e=>(0,$d.jsx)("span",{className:[0,2,3,5,8,9,11,13].includes(e)?"on":""},e))}),(0,$d.jsxs)("p",{className:"signal-sub",children:[(0,$d.jsx)("strong",{children:"8 av 15"})," bolag i samma kohort fick h\xf6jningen \u2014 Arvo ser m\xf6nstret innan det n\xe5r er."]})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"calendar-clock",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Proaktiv avtalsbevakning"}),(0,$d.jsxs)("div",{className:"signal-line",children:["Avtalsbevakning \xb7 varnar 90 dagar f\xf6re f\xf6rnyelse",(0,$d.jsx)("span",{className:"signal-badge signal-badge--contract",children:"F\xf6rnyelse"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Arvo varnar automatiskt \u2014 och f\xf6rhandlar p\xe5 er beg\xe4ran."})]})]})]}),(0,$d.jsxs)("div",{className:"price-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"price",children:"1 995 kr"}),(0,$d.jsx)("span",{className:"price-period",children:"/ m\xe5n"})]}),(0,$d.jsx)("span",{className:"price-note",children:"Ingen bindningstid"})]}),(0,$d.jsx)(Id,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{Hn(null!==pn&&void 0!==pn?pn:""),qn("idle"),Vn(!0)},children:"Aktivera Arvo Intelligence \u2192"}),(0,$d.jsx)("p",{style:{fontSize:12,color:"#8A9E98",textAlign:"center",marginTop:10,lineHeight:1.5},children:"Arvo s\xf6ker igenom er inkorg \u2014 ni beh\xf6ver inte lyfta ett finger."})]}),(0,$d.jsxs)(Uf,{children:[(0,$d.jsx)("div",{className:"pb-eyebrow",children:"Helhetsbilden"}),(0,$d.jsx)("h2",{className:"pb-head",children:"Arvo bevakar \xe5tta kostnadskategorier. Den h\xe4r fakturan var en."}),(0,$d.jsx)("div",{className:"pb-grid",children:Gf.map(e=>{var t;const n=e.cats.includes(null===(t=Lt.categorized)||void 0===t?void 0:t.category);return(0,$d.jsxs)("div",{className:"pb-seg"+(n?" lit":""),children:[(0,$d.jsx)("span",{className:"pb-seg-ico",children:(0,$d.jsx)(bu,{name:e.icon,size:20,stroke:1.8})}),(0,$d.jsx)("span",{className:"pb-seg-label",children:e.short})]},e.label)})}),(0,$d.jsxs)("div",{className:"pb-foot",children:[(0,$d.jsx)("p",{className:"pb-note",children:"En faktura s\xe4ger en sak. Hela reskontran s\xe4ger var ni faktiskt bl\xf6der. Vidarebefordra era leverant\xf6rsfakturor s\xe5 kartl\xe4gger Arvo varje leverant\xf6r \u2014 och hittar varenda besparing, inte bara den h\xe4r."}),(0,$d.jsxs)(vl,{to:"/portfolio",className:"pb-link",children:["Kartl\xe4gg er reskontra ",(0,$d.jsx)(bu,{name:"arrow",size:15,stroke:2})]})]})]}),(0,$d.jsx)("p",{style:{textAlign:"center",fontSize:12,color:"#8A9E98",marginBottom:8},children:"sent"===On?(0,$d.jsx)("span",{style:{color:"#1B7A6E"},children:"\u2713 Noterat \u2014 vi justerar modellen"}):(0,$d.jsxs)($d.Fragment,{children:["Felklassificerad faktura?"," ",(0,$d.jsx)("button",{onClick:()=>(async e=>{if("idle"===On){Ln(e),In("submitting");try{var t,n;await fetch("/api/feedback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fingerprint:await Wf().catch(()=>""),supplier:null===Lt||void 0===Lt||null===(t=Lt.extracted)||void 0===t?void 0:t.supplier,category:null===Lt||void 0===Lt||null===(n=Lt.categorized)||void 0===n?void 0:n.category,vote:e})})}catch{}In("sent")}})("down"),disabled:"idle"!==On,style:{background:"none",border:"none",padding:0,cursor:"pointer",fontSize:12,color:"#5C6E68",textDecoration:"underline",textUnderlineOffset:2,fontFamily:"inherit"},children:"Ber\xe4tta \u2192"})]})})]})]}),(0,$d.jsx)(xu,{}),on&&(0,$d.jsx)(Ef,{children:(0,$d.jsxs)(zf,{children:["saving_limit"===dn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Ni har hittat er besparing \u2014 nu \xe4r det dags att ",(0,$d.jsx)("em",{children:"realisera"})," den."]}),(0,$d.jsx)("p",{className:"sub",children:"Arvo har identifierat besparingar i era fakturor. Koppla Fortnox eller Visma s\xe5 analyserar vi hela er leverant\xf6rsreskontra och sk\xf6ter varje byte \u2014 fr\xe5n upps\xe4gning till nytt avtal."})]}):"saving"===dn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{className:"gate-saving",children:[(0,$d.jsx)("span",{className:"gate-saving-label",children:"Identifierad nettobesparing"}),(0,$d.jsxs)("span",{className:"gate-saving-amount",children:["+",Oh(null!==(ft=null===Lt||void 0===Lt||null===(mt=Lt.recommendation)||void 0===mt?void 0:mt.netSaving)&&void 0!==ft?ft:0)]}),(0,$d.jsxs)("span",{className:"gate-saving-context",children:[null===Lt||void 0===Lt||null===(gt=Lt.extracted)||void 0===gt?void 0:gt.supplier,null!==Lt&&void 0!==Lt&&null!==(xt=Lt.categorized)&&void 0!==xt&&xt.category?` \xb7 ${null!==(vt=Kh(Lt.categorized.category).label)&&void 0!==vt?vt:Lt.categorized.category}`:""]})]}),(0,$d.jsx)("p",{className:"sub",children:"Ange din e-post \u2014 vi skickar analysen direkt och en r\xe5dgivare kontaktar dig f\xf6r att realisera besparingen."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Redo att ",(0,$d.jsx)("em",{children:"g\xe5 vidare"}),"?"]}),(0,$d.jsx)("p",{className:"sub",children:"Koppla Fortnox / Visma f\xf6r en komplett analys av hela er leverant\xf6rsreskontra \u2014 Arvo sk\xf6ter varje byte fr\xe5n upps\xe4gning till nytt avtal."})]}),(0,$d.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),!pn||fn)return;mn(!0);const t=pn.trim().toLowerCase();if(localStorage.setItem("arvo_gate_email",t),"saving"===dn){try{Lt&&await cr(t)}catch{}ln(!1),mn(!1)}else mn(!1),window.location.href="/connect"},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:pn,onChange:e=>hn(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:fn||!pn,children:fn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(hf,{})," Skickar\u2026"]}):"saving"===dn?(0,$d.jsxs)($d.Fragment,{children:["Skicka analysen ",(0,$d.jsx)(bu,{name:"arrow",size:16})]}):(0,$d.jsxs)($d.Fragment,{children:["Koppla Fortnox / Visma ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})}),(0,$d.jsx)("p",{className:"fine-print",children:"saving"===dn?"Ingen spam. Inga bindningstider. Ni betalar 20 % av identifierad besparing.":"Ingen spam. Inga fasta avgifter. Vi kontaktar dig bara om det finns besparingar att h\xe4mta."}),"saving_limit"===dn&&(0,$d.jsx)("p",{className:"fine-print",style:{marginTop:"8px",fontStyle:"italic"},children:"Ni har provat Arvo. Nu l\xe5ter vi siffrorna tala \u2014 utan kostnad tills ni sparar."})]})]})}),Jt&&Lt&&(0,$d.jsx)(Ef,{onClick:e=>{e.target===e.currentTarget&&Xt(!1)},children:(0,$d.jsxs)(zf,{children:[(0,$d.jsx)("button",{className:"close",onClick:()=>{Xt(!1)},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===tn?(0,$d.jsxs)("div",{className:"sent-state",children:[(0,$d.jsx)("span",{className:"sent-icon",children:(0,$d.jsx)(bu,{name:"check",size:20,stroke:2.5})}),(0,$d.jsx)("p",{className:"sent-title",children:Qr?"Optimeringen \xe4r aktiverad.":"Bytet \xe4r aktiverat."}),(0,$d.jsx)("p",{className:"sent-sub",children:"Arvo tar det h\xe4rifr\xe5n \u2014 ni h\xf6r av oss inom 48 timmar."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("p",{className:"bk-title",children:["Allt \xe4r f\xf6rberett.",(0,$d.jsx)("br",{}),"Er signatur aktiverar det."]}),(0,$d.jsxs)("div",{className:"bk-offer",children:[(0,$d.jsxs)("div",{className:"bk-offer-top",children:[(0,$d.jsx)("span",{className:"bk-partner-name",children:Hr?Lt.recommendation.suggestedSupplier:qr}),(0,$d.jsxs)("span",{className:"bk-verified",children:[(0,$d.jsx)(bu,{name:"shield",size:10,stroke:2}),Hr?"Verifierat listpris":"Arvo-verifierad leverant\xf6r"]})]}),(0,$d.jsxs)("div",{className:"bk-price-row",children:[(0,$d.jsxs)("span",{className:"bk-from",children:[Oh(kr),"/\xe5r"]}),(0,$d.jsx)("span",{className:"bk-arrow",children:"\u2192"}),(0,$d.jsxs)("span",{className:"bk-to",children:[Kf(Lt.recommendation.suggestedAnnualCost)," kr/\xe5r"]})]}),(0,$d.jsxs)("p",{className:"bk-savings-row",children:["Ni sparar ",Oh(jr)," \xb7 Arvo ",Oh(wr)]})]}),pn||Zt?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("p",{className:"bk-email-confirm",children:["Bekr\xe4ftelse till: ",(0,$d.jsx)("strong",{children:pn||Zt})]}),(0,$d.jsx)(Id,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===tn,onClick:ur,children:"submitting"===tn?"Aktiverar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Signera med BankID ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})})]}):(0,$d.jsxs)("form",{className:"modal-form",onSubmit:ur,children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:Zt,onChange:e=>en(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===tn,children:"submitting"===tn?"Aktiverar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Signera med BankID ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})})]}),(0,$d.jsx)("p",{className:"bk-fine-print",children:"Du har 24 timmars \xe5ngerr\xe4tt."})]})]})}),_n&&Lt&&(0,$d.jsx)(Ef,{onClick:e=>{e.target===e.currentTarget&&(En(!1),Cn("idle"))},children:(0,$d.jsxs)(zf,{children:[(0,$d.jsx)("button",{className:"close",onClick:()=>{En(!1),Cn("idle")},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===An?(0,$d.jsxs)("div",{className:"sent-state",children:[(0,$d.jsx)("span",{className:"sent-icon",children:(0,$d.jsx)(bu,{name:"check",size:20,stroke:2.5})}),(0,$d.jsx)("p",{className:"sent-title",children:"Analysen \xe4r skickad!"}),(0,$d.jsxs)("p",{className:"sent-sub",children:["Vi har skickat analysen till ",zn,"."]})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Ladda ner er ",(0,$d.jsx)("em",{children:"analys"})]}),(0,$d.jsx)("p",{className:"sub",children:"Ange er e-post s\xe5 skickar vi en sammanfattning av analysen direkt till er inkorg."}),(0,$d.jsxs)("div",{className:"context-badge",children:[Lt.extracted.supplier," \xb7 ",Kh(null===(bt=Lt.categorized)||void 0===bt?void 0:bt.category).label]}),(0,$d.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),zn&&"idle"===An){Cn("submitting");try{await cr(zn),Cn("sent")}catch{Cn("error")}}},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:zn,onChange:e=>Nn(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===An,children:"submitting"===An?"Skickar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Skicka analysen ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})}),"error"===An&&(0,$d.jsx)("p",{className:"fine-print",style:{color:"red"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$d.jsx)("p",{className:"fine-print",children:"Ingen spam. Vi skickar analysen direkt till din inkorg."})]})]})]})}),Un&&(0,$d.jsx)(Ef,{onClick:e=>{e.target===e.currentTarget&&Vn(!1)},children:(0,$d.jsxs)(Nf,{children:[(0,$d.jsx)("button",{className:"ac-close",onClick:()=>Vn(!1),"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===Wn?(0,$d.jsxs)("div",{className:"ac-success",children:[(0,$d.jsx)("div",{className:"ac-check",children:"\u2713"}),(0,$d.jsx)("h3",{children:"Briefing p\xe5 v\xe4g"}),(0,$d.jsx)("p",{className:"ac-email-sent",children:Kn||pn}),(0,$d.jsxs)("p",{className:"ac-success-sub",children:["Er Arvo Intelligence-briefing f\xf6r ",null!==(yt=null===Lt||void 0===Lt||null===(kt=Lt.extracted)||void 0===kt?void 0:kt.supplier)&&void 0!==yt?yt:"er leverant\xf6r"," \xe4r skickad. Koppla er inkorg s\xe5 bevakar Arvo alla era leverant\xf6rsfakturor l\xf6pande."]}),(0,$d.jsx)("span",{className:"ac-upgrade-label",children:"Koppla er inkorg"}),(0,$d.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(Kn||pn)}`,className:"ac-oauth-btn",style:{marginBottom:9,display:"flex"},children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(Kn||pn)}`,className:"ac-oauth-btn",style:{display:"flex"},children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsx)("p",{className:"ac-privacy",children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{className:"ac-eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h2",{className:"ac-heading",children:"Arvo s\xf6ker igenom er inkorg"}),(0,$d.jsx)("p",{className:"ac-sub",children:"Koppla Gmail eller Outlook \u2014 Arvo s\xf6ker er inkorg efter leverant\xf6rsfakturor och skickar er f\xf6rsta fullst\xe4ndiga briefing inom en timme."}),(0,$d.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(Kn||pn)}`,className:"ac-oauth-btn",children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(Kn||pn)}`,className:"ac-oauth-btn",children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsx)("div",{className:"ac-divider",children:"eller b\xf6rja nu"}),(0,$d.jsxs)("form",{onSubmit:async e=>{var t,n,r,a,i,o;e.preventDefault();const l=Kn.trim()||pn.trim();if(!l||"submitting"===Wn)return;qn("submitting");const s=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(!e)return"";const n=e.match(/[^.!?]+[.!?]+/g)||[];return 0===n.length?e.length>200?e.slice(0,200).trimEnd()+"\u2026":e:n.slice(0,t).join(" ").trim()}(null!==Lt&&void 0!==Lt&&null!==(t=Lt.categorized)&&void 0!==t&&t.category&&Kh(Lt.categorized.category).isRealPrice?null!==(n=null===Lt||void 0===Lt||null===(r=Lt.recommendation)||void 0===r?void 0:r.reasoning)&&void 0!==n?n:"":qf(null!==(a=null===Lt||void 0===Lt||null===(i=Lt.recommendation)||void 0===i?void 0:i.reasoning)&&void 0!==a?a:"",null===Lt||void 0===Lt||null===(o=Lt.recommendation)||void 0===o?void 0:o.suggestedSupplier));try{var c,d,u,p;if(!(await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:l,supplier:null===Lt||void 0===Lt||null===(c=Lt.extracted)||void 0===c?void 0:c.supplier,normalizedSupplier:null===Lt||void 0===Lt||null===(d=Lt.categorized)||void 0===d?void 0:d.normalizedSupplier,category:null===Lt||void 0===Lt||null===(u=Lt.categorized)||void 0===u?void 0:u.category,annualCost:kr,suggestedAnnualCost:null===Lt||void 0===Lt||null===(p=Lt.recommendation)||void 0===p?void 0:p.suggestedAnnualCost,grossSaving:jr,netSaving:Sr,arvoFee:wr,reasoning:s,diagScore:Cr,diagLabel:null===Fr||void 0===Fr?void 0:Fr.label,diagInsight:Br})})).ok)throw new Error;qn("sent")}catch{qn("error")}},children:[(0,$d.jsxs)("div",{className:"ac-email-row",children:[(0,$d.jsx)("input",{className:"ac-email-input",type:"email",placeholder:"er@foretag.se",value:Kn||pn,onChange:e=>Hn(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"md",disabled:"submitting"===Wn,style:{flexShrink:0},children:"submitting"===Wn?"\u2026":"Skicka \u2192"})]}),"error"===Wn&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#C41E1E",marginTop:8},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$d.jsx)("p",{className:"ac-privacy",children:"Vi skickar er f\xf6rsta Intelligence-briefing omedelbart \u2014 baserad p\xe5 denna analys. Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})]})})]})};function tm(e){return null==e?"\u2013":Math.round(e).toLocaleString("sv-SE")}const nm=[{id:0,label:"Skrivare & tryck"},{id:1,label:"El & energi"},{id:2,label:"Telekom"},{id:3,label:"SaaS & licenser"},{id:4,label:"Leasing"},{id:5,label:"IT-drift"},{id:6,label:"Transport & frakt"},{id:7,label:"F\xf6rs\xe4kring"}],rm=jd`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,am=jd`
  to { transform: rotate(360deg); }
`,im=jd`
  from { stroke-dashoffset: 283; }
`,om=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  min-height: 100vh;
`,lm=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 72px 28px 32px;
  animation: ${rm} 0.55s ease both;
  @media (max-width: 600px) { padding: 48px 20px 20px; }
`,sm=vd.span`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 12px; border-radius: 100px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  font-size: 12px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  letter-spacing: .04em; text-transform: uppercase; margin-bottom: 20px;
  span.dot { width: 6px; height: 6px; border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}}; }
`,cm=vd.h1`
  font-size: 34px; font-weight: 800; letter-spacing: -.03em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}}; margin: 0 0 10px;
  @media (max-width: 600px) { font-size: 26px; }
`,dm=vd.p`
  font-size: 16px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  line-height: 1.65; margin: 0 0 32px;
`,um=vd.section`
  max-width: 860px; margin: 0 auto; padding: 0 28px 80px;
  @media (max-width: 600px) { padding: 0 20px 60px; }
`,pm=vd.div`
  background: linear-gradient(145deg, #0E1A17 0%, #1B3A30 100%);
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  margin-bottom: 16px;
  display: flex; align-items: center; gap: 32px;
  box-shadow: 0 4px 24px rgba(14,26,23,.18);
  @media (max-width: 640px) { flex-direction: column; gap: 20px; padding: 24px 20px; }
`,hm=vd.div`
  position: relative; flex-shrink: 0;
  width: 140px; height: 140px;
  svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .gauge-track { fill: none; stroke: rgba(255,255,255,.1); stroke-width: 10; }
  .gauge-fill  { fill: none; stroke-width: 10; stroke-linecap: round;
    stroke: url(#scoreGrad);
    animation: ${im} 1.2s cubic-bezier(.4,0,.2,1) both; }
`,fm=vd.div`
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
`,mm=vd.span`
  font-size: 34px; font-weight: 900; letter-spacing: -.03em; color: #fff; line-height: 1;
`,gm=vd.span`
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: rgba(255,255,255,.5); margin-top: 3px;
`,xm=vd.div`
  flex: 1;
  h2 { font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 8px;
    letter-spacing: -.02em;
    sup { font-size: 10px; vertical-align: super; } }
  p { font-size: 14px; color: rgba(255,255,255,.6); line-height: 1.6; margin: 0 0 16px; }
`,vm=vd.div`
  display: flex; gap: 8px; flex-wrap: wrap;
`,bm=vd.span`
  padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600;
  background: rgba(93,214,202,.15); color: #5DD6CA;
  border: 1px solid rgba(93,214,202,.3);
`,ym=vd.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
  margin-bottom: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr 1fr; }
`,km=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 16px 18px;
  box-shadow: 0 1px 3px rgba(14,26,23,.04);
`,jm=vd.p`
  font-size: 10.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; margin: 0 0 5px;
`,wm=vd.p`
  font-size: 20px; font-weight: 800; letter-spacing: -.025em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}}; margin: 0;
  span.unit { font-size: 12px; font-weight: 500; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; margin-left: 3px; }
`,Sm=vd(wm)`
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
`,$m=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 18px 20px;
  margin-bottom: 16px;
`,_m=vd.div`
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
  h4 { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; margin: 0; }
  span { font-size: 12px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; }
`,Em=vd.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`,zm=vd.div`
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 8px;
  background: ${e=>{let{$covered:t,theme:n}=e;return t?n.color.brandSoft:n.color.bg}};
  border: 1px solid ${e=>{let{$covered:t,theme:n}=e;return t?"rgba(27,110,102,.25)":n.color.border}};
  transition: all .2s;
`,Nm=vd.div`
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  background: ${e=>{let{$covered:t,theme:n}=e;return t?n.color.brand:n.color.border}};
`,Am=vd.span`
  font-size: 11.5px; font-weight: ${e=>{let{$covered:t}=e;return t?600:400}};
  color: ${e=>{let{$covered:t,theme:n}=e;return t?n.color.ink:n.color.mutedSoft}};
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`,Cm=vd.div`
  display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;
`,Fm=vd.h3`
  font-size: 13px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; margin: 0 0 10px;
`,Tm=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 14px 18px 14px 0;
  display: flex; align-items: center; gap: 14px;
  box-shadow: 0 1px 3px rgba(14,26,23,.04);
  transition: box-shadow .15s ease;
  overflow: hidden;
  &:hover { box-shadow: 0 3px 12px rgba(14,26,23,.09); }
  @media (max-width: 540px) { flex-wrap: wrap; gap: 10px; }
`,Pm=vd.div`
  width: 4px; align-self: stretch; flex-shrink: 0; border-radius: 0 3px 3px 0;
  background: ${e=>{let{$saving:t}=e;return t?"linear-gradient(180deg,#5DD6CA,#1B6E66)":"#D5E2DC"}};
`,Dm=vd.div`
  width: 36px; height: 36px; border-radius: 9px;
  background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 16px;
`,Rm=vd.div`
  flex: 1; min-width: 0;
`,Lm=vd.p`
  font-size: 14px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`,Om=vd.p`
  font-size: 11.5px; color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; margin: 0;
`,Im=vd.div`
  text-align: right; flex-shrink: 0;
  @media (max-width: 540px) { width: 100%; text-align: left; padding-left: 54px; }
`,Bm=vd.p`
  font-size: 13.5px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 3px;
`,Mm=vd.span`
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 8px; border-radius: 100px; font-size: 11px; font-weight: 600;
  background: ${e=>{let{$pos:t,theme:n}=e;return t?n.color.brandSoft:n.color.surfaceAlt}};
  color: ${e=>{let{$pos:t,theme:n}=e;return t?n.color.brand:n.color.mutedSoft}};
`,Um=vd(Mm)`
  background: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.successSoft)&&void 0!==t?t:"#EDF7F1"}};
  color: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.success)&&void 0!==t?t:"#1B7A6E"}};
`,Vm=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 32px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(14,26,23,.06);
  @media (max-width: 580px) { padding: 22px 20px; }
`,Km=vd.p`
  font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.brand}}; margin: 0 0 6px;
`,Hm=vd.h3`
  font-size: 18px; font-weight: 800; color: ${e=>{let{theme:t}=e;return t.color.ink}};
  letter-spacing: -.02em; margin: 0 0 6px;
`,Wm=vd.p`
  font-size: 13.5px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  line-height: 1.65; margin: 0 0 18px;
`,qm=vd.form`
  display: flex; gap: 10px;
  @media (max-width: 520px) { flex-direction: column; }
`,Ym=vd.input`
  flex: 1; padding: 11px 16px; border-radius: 100px;
  border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.border}};
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.ink}};
  outline: none; transition: border-color .15s;
  &:focus { border-color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  &::placeholder { color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; }
`,Gm=vd.button`
  padding: 11px 22px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%);
  color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap;
  transition: opacity .15s;
  &:disabled { opacity: .55; cursor: not-allowed; }
`,Qm=vd.p`
  font-size: 13.5px; color: ${e=>{let{theme:t}=e;return t.color.brand}};
  font-weight: 600; margin: 0; padding: 10px 0;
`,Jm=vd.p`
  font-size: 12px; color: #C0392B; margin: 6px 0 0;
`,Xm=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 32px;
  display: flex; align-items: center; gap: 24px;
  box-shadow: 0 1px 3px rgba(14,26,23,.05);
  @media (max-width: 580px) { flex-direction: column; align-items: flex-start; gap: 16px; padding: 22px 20px; }
`,Zm=vd.div`
  flex: 1;
  h3 { font-size: 17px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0 0 6px; letter-spacing: -.015em;
    sup { font-size: 9px; font-weight: 800; color: ${e=>{let{theme:t}=e;return t.color.brand}}; vertical-align: super; } }
  p { font-size: 13.5px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    line-height: 1.6; margin: 0; }
`,eg=vd.div`
  text-align: center; padding: 64px 24px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  margin-bottom: 24px;
  h3 { font-size: 18px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}}; margin: 0 0 10px; }
  p { font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; margin: 0 0 24px; line-height: 1.6; }
`,tg=vd.div`
  width: 32px; height: 32px; border: 3px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top-color: ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: 50%; animation: ${am} .7s linear infinite; margin: 48px auto;
`,ng=vd.p`
  text-align: center; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  font-size: 14px; padding: 32px;
`,rg=["\ud83d\udda8","\u26a1","\ud83d\udcf1","\ud83d\udcbb","\ud83d\udda5","\ud83d\ude9b","\ud83c\udfe2","\ud83d\udc65"];function ag(e){var t,n;const r=Kh(e),a=null!==(t=null===r||void 0===r?void 0:r.segment)&&void 0!==t?t:0;return null!==(n=rg[a])&&void 0!==n?n:"\ud83d\udcc4"}function ig(e){let{score:t}=e;const n=2*Math.PI*45,r=n-t/100*n,a=t>=70?"#5DD6CA":t>=40?"#F59E0B":"#EF4444";return(0,$d.jsxs)(hm,{children:[(0,$d.jsxs)("svg",{viewBox:"0 0 100 100",children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"scoreGrad",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#5DD6CA"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1B6E66"})]})}),(0,$d.jsx)("circle",{className:"gauge-track",cx:"50",cy:"50",r:45}),(0,$d.jsx)("circle",{className:"gauge-fill",cx:"50",cy:"50",r:45,strokeDasharray:n,strokeDashoffset:r,stroke:t>=70?"url(#scoreGrad)":a})]}),(0,$d.jsxs)(fm,{children:[(0,$d.jsx)(mm,{children:t}),(0,$d.jsx)(gm,{children:"/ 100"})]})]})}function og(){const[e,t]=(0,r.useState)(null),[n,a]=(0,r.useState)(null),[i,o]=(0,r.useState)(""),[l,s]=(0,r.useState)(""),[c,d]=(0,r.useState)("idle"),[u,p]=(0,r.useState)("");(0,r.useEffect)(()=>{let e=!1;return(async()=>{try{var n;const r=await async function(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}();e||o(r);const a=new URLSearchParams(window.location.search).get("magic"),i=`fingerprint=${encodeURIComponent(r)}`+(a?`&magic=${encodeURIComponent(a)}`:""),l=await fetch(`/api/invoice-history?${i}`);if(!l.ok)throw new Error(`HTTP ${l.status}`);const s=await l.json();e||t(null!==(n=s.analyses)&&void 0!==n?n:[])}catch(r){e||a(r.message)}})(),()=>{e=!0}},[]);const h=(null!==e&&void 0!==e?e:[]).filter(e=>"auto"===e.route),f=h.reduce((e,t)=>{var n;return e+(null!==(n=t.annual_cost)&&void 0!==n?n:0)},0),m=h.reduce((e,t)=>{var n;return e+(null!==(n=t.net_saving)&&void 0!==n?n:0)},0),g=h.filter(e=>e.should_switch).length,x=function(e){if(!e.length)return 0;const t=new Set(e.map(e=>{var t,n;return null!==(t=null===(n=Kh(e.category))||void 0===n?void 0:n.segment)&&void 0!==t?t:-1}).filter(e=>e>=0)),n=Math.round(t.size/8*65),r=e.reduce((e,t)=>{var n;return e+(null!==(n=t.net_saving)&&void 0!==n?n:0)},0),a=r>5e3?25:r>0?15:0,i=e.length>=5?10:e.length>=3?5:0;return Math.min(100,n+a+i)}(h),v=f>0?Math.round(m/f*100):0,b=new Set(h.map(e=>{var t,n;return null!==(t=null===(n=Kh(e.category))||void 0===n?void 0:n.segment)&&void 0!==t?t:-1}).filter(e=>e>=0)),y=x>=80?"Excellent portf\xf6lj":x>=60?"Bra t\xe4ckning":x>=40?"Delvis t\xe4ckt":"Kom ig\xe5ng";return(0,$d.jsxs)(om,{children:[(0,$d.jsx)(du,{}),(0,$d.jsxs)(lm,{children:[(0,$d.jsxs)(sm,{children:[(0,$d.jsx)("span",{className:"dot"}),"Leverant\xf6rsportf\xf6lj"]}),(0,$d.jsx)(cm,{children:"Er Arvo Score\u2122"}),(0,$d.jsx)(dm,{children:"Alla fakturor ni analyserat samlade p\xe5 ett st\xe4lle. Koppla Fortnox eller Visma f\xf6r att l\xe5sa upp hela er leverant\xf6rsbild och automatisera varje byte."})]}),(0,$d.jsxs)(um,{children:[null===e&&!n&&(0,$d.jsx)(tg,{}),n&&(0,$d.jsx)(ng,{children:"Kunde inte ladda portf\xf6ljdata \u2014 f\xf6rs\xf6k igen om en stund."}),null!==e&&h.length>0&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(pm,{children:[(0,$d.jsx)(ig,{score:x}),(0,$d.jsxs)(xm,{children:[(0,$d.jsxs)("h2",{children:["Arvo Score",(0,$d.jsx)("sup",{children:"\u2122"})," \u2014 ",y]}),(0,$d.jsxs)("p",{children:["Baserat p\xe5 ",h.length," analyserade fakturor och t\xe4ckning av ",b.size," av 8 leverant\xf6rssegment.",m>0&&` Potentiell nettobesparing: ${tm(m)} kr/\xe5r.`]}),(0,$d.jsxs)(vm,{children:[(0,$d.jsxs)(bm,{children:[b.size,"/8 segment"]}),m>0&&(0,$d.jsxs)(bm,{children:["\u2212",v,"% kostnad m\xf6jlig"]}),g>0&&(0,$d.jsxs)(bm,{children:[g," byten rekommenderas"]})]})]})]}),(0,$d.jsxs)(ym,{children:[(0,$d.jsxs)(km,{children:[(0,$d.jsx)(jm,{children:"Fakturor analyserade"}),(0,$d.jsxs)(wm,{children:[h.length,(0,$d.jsx)("span",{className:"unit",children:"st"})]})]}),(0,$d.jsxs)(km,{children:[(0,$d.jsx)(jm,{children:"Total \xe5rskkostnad"}),(0,$d.jsxs)(wm,{children:[tm(f),(0,$d.jsx)("span",{className:"unit",children:"kr/\xe5r"})]})]}),(0,$d.jsxs)(km,{children:[(0,$d.jsx)(jm,{children:"Nettobesparing m\xf6jlig"}),(0,$d.jsxs)(Sm,{children:[tm(m),(0,$d.jsx)("span",{className:"unit",children:"kr/\xe5r"})]})]}),(0,$d.jsxs)(km,{children:[(0,$d.jsx)(jm,{children:"Besparingspotential"}),(0,$d.jsxs)(wm,{children:[v,(0,$d.jsx)("span",{className:"unit",children:"%"})]})]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsxs)(_m,{children:[(0,$d.jsx)("h4",{children:"Segmentt\xe4ckning"}),(0,$d.jsxs)("span",{children:[b.size," av 8 analyserade"]})]}),(0,$d.jsx)(Em,{children:nm.map(e=>{const t=b.has(e.id);return(0,$d.jsxs)(zm,{$covered:t,children:[(0,$d.jsx)(Nm,{$covered:t}),(0,$d.jsx)(Am,{$covered:t,children:e.label})]},e.id)})})]}),(0,$d.jsx)(Fm,{children:"Analyserade leverant\xf6rer"}),(0,$d.jsx)(Cm,{children:h.map(e=>{var t;const n=Kh(e.category),r=e.should_switch&&(null!==(t=e.net_saving)&&void 0!==t?t:0)>0;return(0,$d.jsxs)(Tm,{children:[(0,$d.jsx)(Pm,{$saving:r}),(0,$d.jsx)(Dm,{children:ag(e.category)}),(0,$d.jsxs)(Rm,{children:[(0,$d.jsx)(Lm,{children:e.supplier||e.normalized_supplier||"Ok\xe4nd leverant\xf6r"}),(0,$d.jsxs)(Om,{children:[n.label," \xb7 ",(a=e.created_at,a?new Date(a).toLocaleDateString("sv-SE",{day:"numeric",month:"short"}):"")]})]}),(0,$d.jsxs)(Im,{children:[null!=e.annual_cost&&(0,$d.jsxs)(Bm,{children:[tm(e.annual_cost)," kr/\xe5r"]}),r?(0,$d.jsxs)(Mm,{$pos:!0,children:["\u2212",tm(e.net_saving)," kr/\xe5r m\xf6jligt"]}):(0,$d.jsx)(Um,{children:"Optimerat"})]})]},e.id);var a})}),g>0&&(0,$d.jsxs)("p",{style:{fontSize:13,color:"#5C6E68",marginBottom:16},children:[g," av ",h.length," leverant\xf6rer har besparingspotential."," ","Arvo tar 20\xa0% av realiserad besparing \u2014 inga fasta avgifter."]}),(0,$d.jsxs)(Vm,{children:[(0,$d.jsx)(Km,{children:"Arvo-rapport"}),(0,$d.jsx)(Hm,{children:"F\xe5 din kompletta Arvo-rapport"}),(0,$d.jsx)(Wm,{children:"Vi sammanst\xe4ller en PDF med alla besparingar och kontaktar dig inom 24h."}),"success"===c?(0,$d.jsx)(Qm,{children:"\u2713 Rapporten \xe4r skickad! Kolla din inkorg."}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(qm,{onSubmit:async function(e){if(e.preventDefault(),"loading"!==c){d("loading"),p("");try{var t;const e=await fetch("/api/send-report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fingerprint:i,email:l})}),n=await e.json();if(!e.ok)throw new Error(null!==(t=n.error)&&void 0!==t?t:`HTTP ${e.status}`);d("success")}catch(n){p(n.message),d("error")}}},children:[(0,$d.jsx)(Ym,{type:"email",placeholder:"din@email.se",value:l,onChange:e=>s(e.target.value),required:!0,disabled:"loading"===c}),(0,$d.jsx)(Gm,{type:"submit",disabled:"loading"===c||!l,children:"loading"===c?"Skickar\u2026":"F\xe5 din kompletta Arvo-rapport \u2192"})]}),"error"===c&&u&&(0,$d.jsx)(Jm,{children:u})]})]})]}),null!==e&&0===h.length&&(0,$d.jsxs)(eg,{children:[(0,$d.jsx)("h3",{children:"Inga analyserade fakturor \xe4nnu"}),(0,$d.jsx)("p",{children:"Ladda upp din f\xf6rsta leverant\xf6rsfaktura p\xe5 PDF-format. Vi extraherar kostnad, kategori och sparar resultatet h\xe4r automatiskt."}),(0,$d.jsx)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"md",children:"Analysera din f\xf6rsta faktura \u2192"})]}),(0,$d.jsxs)(Xm,{children:[(0,$d.jsxs)(Zm,{children:[(0,$d.jsxs)("h3",{children:["L\xe5s upp er fullst\xe4ndiga Arvo Score",(0,$d.jsx)("sup",{children:"\u2122"})]}),(0,$d.jsx)("p",{children:"Koppla Fortnox eller Visma \u2014 vi skannar hela er leverant\xf6rsreskontra, ber\xe4knar er totala Arvo Score och levererar en komplett Leverant\xf6rsrapport. Vi sk\xf6ter varje byte fr\xe5n upps\xe4gning till nytt avtal."})]}),(0,$d.jsx)(Id,{as:vl,to:"/connect",$variant:"gradient",$size:"md",children:"Koppla Fortnox / Visma \u2192"})]})]}),(0,$d.jsx)(xu,{})]})}const lg=jd`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}`,sg=vd.div`min-height:100vh;background:#0E1A17;color:#fff;font-family:system-ui,sans-serif;padding:32px 24px;`,cg=vd.h1`font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 4px;`,dg=vd.p`font-size:13px;color:rgba(255,255,255,.45);margin:0 0 28px;`,ug=vd.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;@media(max-width:700px){grid-template-columns:1fr 1fr;}`,pg=vd.div`background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px 18px;`,hg=vd.p`font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.4);margin:0 0 4px;`,fg=vd.p`font-size:22px;font-weight:800;color:#5DD6CA;margin:0;letter-spacing:-.02em;`,mg=vd.div`margin-bottom:28px;animation:${lg} .4s ease both;`,gg=vd.h2`font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 10px;`,xg=vd.div`background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;`,vg=vd.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:10px 16px;background:rgba(255,255,255,.06);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);gap:12px;`,bg=vd.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:11px 16px;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;gap:12px;align-items:center;&:hover{background:rgba(255,255,255,.03);}`,yg=vd.span`display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600;background:${e=>{let{$c:t}=e;return null!==t&&void 0!==t?t:"rgba(255,255,255,.1)"}};color:#fff;`,kg=vd.form`display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;`,jg=vd.input`padding:10px 14px;border-radius:100px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;flex:1;min-width:200px;outline:none;&::placeholder{color:rgba(255,255,255,.3);}`,wg=vd.button`padding:10px 20px;border-radius:100px;border:none;cursor:pointer;font-size:13px;font-weight:700;background:linear-gradient(135deg,#5DD6CA,#1B6E66);color:#fff;white-space:nowrap;&:disabled{opacity:.5;cursor:not-allowed;}`,Sg=vd.div`margin-top:8px;background:rgba(93,214,202,.1);border:1px solid rgba(93,214,202,.25);border-radius:8px;padding:10px 14px;font-size:12px;color:#5DD6CA;word-break:break-all;`,$g=vd.div`max-width:360px;margin:80px auto;text-align:center;`,_g=vd.p`padding:20px 16px;font-size:13px;color:rgba(255,255,255,.3);margin:0;`;function Eg(e){return e?new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"\u2013"}function zg(e){return null==e?"\u2013":Math.round(e).toLocaleString("sv-SE")}function Ng(){var e,t,n,a,i,o,l,s,c,d,u,p,h,f,m,g,x,v,b,y,k,j;const[w,S]=(0,r.useState)(()=>{var e;return null!==(e=sessionStorage.getItem("arvo_admin_token"))&&void 0!==e?e:""}),[$,_]=(0,r.useState)(""),[E,z]=(0,r.useState)(!1),[N,A]=(0,r.useState)(null),[C,F]=(0,r.useState)(""),[T,P]=(0,r.useState)(""),[D,R]=(0,r.useState)(""),[L,O]=(0,r.useState)("72"),[I,B]=(0,r.useState)(""),[M,U]=(0,r.useState)("idle"),[V,K]=(0,r.useState)("queue"),[H,W]=(0,r.useState)("idle"),[q,Y]=(0,r.useState)(null),[G,Q]=(0,r.useState)(null),[J,X]=(0,r.useState)(null),[Z,ee]=(0,r.useState)("list"),[te,ne]=(0,r.useState)(""),[re,ae]=(0,r.useState)(null),[ie,oe]=(0,r.useState)(null),[le,se]=(0,r.useState)(null),[ce,de]=(0,r.useState)(null),[ue,pe]=(0,r.useState)(null),[he,fe]=(0,r.useState)("category"),[me,ge]=(0,r.useState)(""),[xe,ve]=(0,r.useState)(""),[be,ye]=(0,r.useState)(!1),[ke,je]=(0,r.useState)(null),[we,Se]=(0,r.useState)(null),[$e,_e]=(0,r.useState)(null),[Ee,ze]=(0,r.useState)({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),[Ne,Ae]=(0,r.useState)("idle"),[Ce,Fe]=(0,r.useState)(null),Te=(0,r.useCallback)(async e=>{F("");try{const n=await fetch("/api/admin/dashboard",{headers:{"x-admin-token":e}}),r=await n.json();var t;if(!n.ok)return void F(null!==(t=r.error)&&void 0!==t?t:"Ej beh\xf6rig");A(r),z(!0),sessionStorage.setItem("arvo_admin_token",e)}catch{F("N\xe4tverksfel")}},[]);(0,r.useEffect)(()=>{w&&Te(w)},[w,Te]);const[Pe,De]=(0,r.useState)(null),Re=(0,r.useCallback)(()=>{fetch("/api/admin/benchmark-stats",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(De).catch(()=>{})},[w]),Le=(0,r.useCallback)(()=>{fetch("/api/admin/prospects",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(e=>{var t,n;Se(null!==(t=e.prospects)&&void 0!==t?t:[]),_e(null!==(n=e.stats)&&void 0!==n?n:{})}).catch(()=>{})},[w]);if(!E)return(0,$d.jsx)(sg,{children:(0,$d.jsxs)($g,{children:[(0,$d.jsx)(cg,{children:"Arvo Admin"}),(0,$d.jsx)(dg,{children:"Ange ADMIN_TOKEN f\xf6r att forts\xe4tta"}),C&&(0,$d.jsx)("p",{style:{color:"#EF4444",fontSize:13,marginBottom:12},children:C}),(0,$d.jsxs)("form",{onSubmit:async function(e){e.preventDefault(),S($)},style:{display:"flex",flexDirection:"column",gap:10},children:[(0,$d.jsx)(jg,{type:"password",placeholder:"Admin-token",value:$,onChange:e=>_(e.target.value),style:{borderRadius:10,textAlign:"center"}}),(0,$d.jsx)(wg,{type:"submit",disabled:!$,children:"Logga in \u2192"})]})]})});const Oe=null!==(e=null===N||void 0===N?void 0:N.stats)&&void 0!==e?e:{},Ie="2fr 1.5fr 1fr 1fr 1fr 1.2fr 84px",Be={padding:"6px 10px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:12.5,cursor:"pointer",outline:"none"},Me=["saas-crm","saas-productivity","saas-finance","saas-devtools","saas-other","mobil","bredband","el","skrivarleasing","kortterminal","vaxel","loneadmin","utrustningsleasing","managed-workplace","larm-bevakning","foretagshalsovard","bankavgifter","forsakring-foretag","serverhosting","it-support","faktura-tjanst","leasing-bil"],Ue="2fr 1.5fr 1.5fr 1.5fr",Ve="2fr 1.5fr 0.5fr 2fr 1.5fr";return(0,$d.jsxs)(sg,{children:[(0,$d.jsx)(cg,{children:"Arvo Admin"}),(0,$d.jsxs)(dg,{children:["Live-data fr\xe5n Neon Postgres \xb7 senast laddad ",(new Date).toLocaleTimeString("sv-SE")]}),(0,$d.jsxs)(ug,{children:[(0,$d.jsxs)(pg,{children:[(0,$d.jsx)(hg,{children:"Totalt analyserade"}),(0,$d.jsx)(fg,{children:zg(Oe.total_analyses)})]}),(0,$d.jsxs)(pg,{children:[(0,$d.jsx)(hg,{children:"Auto (klara)"}),(0,$d.jsx)(fg,{children:zg(Oe.auto_count)})]}),(0,$d.jsxs)(pg,{children:[(0,$d.jsx)(hg,{children:"Review queue"}),(0,$d.jsx)(fg,{style:{color:"#F59E0B"},children:zg(Oe.review_count)})]}),(0,$d.jsxs)(pg,{children:[(0,$d.jsx)(hg,{children:"Unika anv\xe4ndare"}),(0,$d.jsx)(fg,{children:zg(Oe.unique_users)})]}),(0,$d.jsxs)(pg,{children:[(0,$d.jsx)(hg,{children:"Byten rekommenderade"}),(0,$d.jsx)(fg,{children:zg(Oe.switch_recommended)})]}),(0,$d.jsxs)(pg,{children:[(0,$d.jsx)(hg,{children:"Snitt nettobesparing"}),(0,$d.jsxs)(fg,{children:[zg(Oe.avg_net_saving)," kr"]})]}),(0,$d.jsxs)(pg,{children:[(0,$d.jsx)(hg,{children:"Waitlist"}),(0,$d.jsx)(fg,{children:null!==(t=null===N||void 0===N||null===(n=N.waitlist)||void 0===n?void 0:n.length)&&void 0!==t?t:"\u2013"})]}),(0,$d.jsxs)(pg,{children:[(0,$d.jsx)(hg,{children:"Feedback"}),(0,$d.jsx)(fg,{children:null!==(a=null===N||void 0===N||null===(i=N.feedback)||void 0===i?void 0:i.length)&&void 0!==a?a:"\u2013"})]})]}),(0,$d.jsxs)(mg,{children:[(0,$d.jsx)(gg,{children:"Databasmigration"}),(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)("div",{style:{padding:"16px 18px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[(0,$d.jsxs)("p",{style:{margin:0,fontSize:13,color:"rgba(255,255,255,.6)",flex:1},children:["Skapar tabellerna ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"waitlist"}),","," ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"invoice_feedback"})," och"," ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"magic_tokens"})," i databasen. S\xe4kert att k\xf6ra flera g\xe5nger (IF NOT EXISTS)."]}),(0,$d.jsx)(wg,{type:"button",onClick:async function(){W("loading"),Y(null);try{const e=await fetch("/api/admin/run-migration",{method:"POST",headers:{"x-admin-token":w}}),t=await e.json();Y(t),W(t.ok?"done":"error")}catch{W("error")}},disabled:"loading"===H,style:{background:"done"===H?"#16a34a":void 0},children:"loading"===H?"K\xf6r migration\u2026":"done"===H?"\u2713 Migration klar!":"K\xf6r migration \u2192"})]}),q&&(0,$d.jsx)("div",{style:{padding:"0 18px 16px",display:"flex",flexDirection:"column",gap:4},children:null===(o=q.results)||void 0===o?void 0:o.map(e=>(0,$d.jsxs)("div",{style:{fontSize:12,color:e.ok?"#5DD6CA":"#EF4444"},children:[e.ok?"\u2713":"\u2717"," ",e.name,e.error?` \u2014 ${e.error}`:""]},e.name))})]})]}),(0,$d.jsxs)(mg,{children:[(0,$d.jsx)(gg,{children:"Generera demo-l\xe4nk (Magic Link)"}),(0,$d.jsx)(xg,{children:(0,$d.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$d.jsx)("p",{style:{margin:"0 0 12px",fontSize:13,color:"rgba(255,255,255,.6)"},children:"Skickar en tidsbegr\xe4nsad l\xe4nk som ger direkt\xe5tkomst utan gate."}),(0,$d.jsxs)(kg,{onSubmit:async function(e){if(e.preventDefault(),T){U("loading"),B("");try{const e=await fetch("/api/admin/magic-link",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":w},body:JSON.stringify({email:T,note:D||void 0,expiresInHours:Number(L)})}),t=await e.json();if(!e.ok)return void U("error");B(t.link),U("done")}catch{U("error")}}},children:[(0,$d.jsx)(jg,{type:"email",placeholder:"mottagare@foretag.se",value:T,onChange:e=>P(e.target.value),required:!0}),(0,$d.jsx)(jg,{placeholder:"Notering (frivillig)",value:D,onChange:e=>R(e.target.value),style:{maxWidth:200}}),(0,$d.jsx)(jg,{type:"number",placeholder:"Timmar (default 72)",value:L,onChange:e=>O(e.target.value),style:{maxWidth:140}}),(0,$d.jsx)(wg,{type:"submit",disabled:!T||"loading"===M,children:"loading"===M?"Genererar\u2026":"Skicka magic link \u2192"})]}),I&&(0,$d.jsxs)(Sg,{children:["\u2713 L\xe4nk skickad till ",T,(0,$d.jsx)("br",{}),(0,$d.jsx)("strong",{children:I})]}),"error"===M&&(0,$d.jsx)("p",{style:{color:"#EF4444",fontSize:12,marginTop:8},children:"Misslyckades \u2014 kontrollera ADMIN_TOKEN och RESEND_API_KEY."})]})})]}),(0,$d.jsx)("div",{style:{display:"flex",gap:4,marginBottom:16},children:[["queue","Review Queue"],["waitlist","Waitlist"],["feedback","Feedback"],["corrections","Korrektioner \ud83e\udde0"],["connections","Anslutningar \ud83d\udd17"],["outbound","Outbound \ud83d\ude80"],["prisbok","Prisboken \ud83d\udcd2"]].map(e=>{let[t,n]=e;return(0,$d.jsx)("button",{onClick:()=>K(t),style:{padding:"7px 16px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,background:V===t?"#5DD6CA":"rgba(255,255,255,.08)",color:V===t?"#0E1A17":"rgba(255,255,255,.6)"},children:n},t)})}),"queue"===V&&(0,$d.jsx)(mg,{children:(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:Ie,children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"\xc5rskkostnad"}),(0,$d.jsx)("span",{children:"Bransch"}),(0,$d.jsx)("span",{children:"Anst\xe4llda"}),(0,$d.jsx)("span",{children:"Datum"}),(0,$d.jsx)("span",{children:"\xc5tg\xe4rd"})]}),0===(null!==(l=null===N||void 0===N?void 0:N.reviewQueue)&&void 0!==l?l:[]).length&&(0,$d.jsx)(_g,{children:"Inga review_queue-fakturor \xe4nnu."}),(null!==(s=null===N||void 0===N?void 0:N.reviewQueue)&&void 0!==s?s:[]).map(e=>(0,$d.jsxs)(r.Fragment,{children:[(0,$d.jsxs)(bg,{$cols:Ie,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.supplier||e.normalized_supplier||"\u2013"}),(0,$d.jsx)(yg,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$d.jsxs)("span",{children:[zg(e.annual_cost)," kr"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.industry}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.employees}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Eg(e.created_at)}),(0,$d.jsx)("button",{onClick:()=>{const t=ue===e.id;pe(t?null:e.id),ge(""),ve(""),fe("category"),je(null)},style:{padding:"4px 10px",borderRadius:100,border:"1px solid rgba(93,214,202,.3)",background:ue===e.id?"rgba(93,214,202,.15)":"transparent",color:"#5DD6CA",cursor:"pointer",fontSize:11.5,fontWeight:600},children:ue===e.id?"\u2715":"Korrigera"})]}),ue===e.id&&(0,$d.jsxs)("div",{style:{padding:"14px 16px",borderTop:"1px solid rgba(93,214,202,.12)",background:"rgba(93,214,202,.03)"},children:[(0,$d.jsx)("p",{style:{margin:"0 0 10px",fontSize:12,color:"rgba(255,255,255,.45)"},children:"Manuell korrektion \u2014 sparas som labeled data och tr\xe4nar systemet."}),(0,$d.jsxs)("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[(0,$d.jsxs)("select",{value:he,onChange:e=>{fe(e.target.value),ge("")},style:Be,children:[(0,$d.jsx)("option",{value:"category",children:"Kategori"}),(0,$d.jsx)("option",{value:"recurring",children:"\xc5terkommande"}),(0,$d.jsx)("option",{value:"route",children:"Route"})]}),"category"===he&&(0,$d.jsxs)("select",{value:me,onChange:e=>ge(e.target.value),style:Be,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj r\xe4tt kategori\u2026"}),Me.map(e=>(0,$d.jsx)("option",{value:e,children:e},e))]}),"recurring"===he&&(0,$d.jsxs)("select",{value:me,onChange:e=>ge(e.target.value),style:Be,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$d.jsx)("option",{value:"true",children:"true (\xe5terkommande)"}),(0,$d.jsx)("option",{value:"false",children:"false (eng\xe5ngskostnad)"})]}),"route"===he&&(0,$d.jsxs)("select",{value:me,onChange:e=>ge(e.target.value),style:Be,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$d.jsx)("option",{value:"auto",children:"auto"}),(0,$d.jsx)("option",{value:"review_queue",children:"review_queue"}),(0,$d.jsx)("option",{value:"unsupported",children:"unsupported"})]}),(0,$d.jsx)(jg,{placeholder:"Anledning (valfri)",value:xe,onChange:e=>ve(e.target.value),style:{flex:"1 1 140px",borderRadius:8,padding:"6px 12px",fontSize:12.5}}),(0,$d.jsx)(wg,{type:"button",onClick:()=>async function(e){if(me&&!be){ye(!0);try{var t,n;const r="category"===he?null!==(t=e.category)&&void 0!==t?t:"":"recurring"===he?"false":"";(await fetch("/api/admin/corrections",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":w},body:JSON.stringify({analysisId:e.id,field:he,originalValue:r,correctedValue:me,reason:xe||"operator_manual_review",category:"category"===he?me:null!==(n=e.category)&&void 0!==n?n:null,supplier:e.normalized_supplier||e.supplier||null,operatorReasoning:te||null})})).ok&&(je(e.id),setTimeout(()=>{je(null),pe(null),ge(""),ve(""),ne(""),fe("category")},2500))}catch{}finally{ye(!1)}}}(e),disabled:!me||be,style:{padding:"7px 18px",fontSize:12.5},children:be?"Sparar\u2026":"Spara \u2192"})]}),(0,$d.jsx)("textarea",{placeholder:"Resonemang / princip (valfri men v\xe4rdefullt \u2014 anv\xe4nds som few-shot-exempel i AI:n n\xe4sta g\xe5ng)",value:te,onChange:e=>ne(e.target.value),style:{marginTop:8,width:"100%",boxSizing:"border-box",padding:"8px 12px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.05)",color:"#fff",fontSize:12,fontFamily:"inherit",resize:"vertical",minHeight:56,outline:"none"}}),ke===e.id&&(0,$d.jsx)("p",{style:{color:"#5DD6CA",fontSize:12,margin:"8px 0 0"},children:"\u2713 Korrektion sparad \u2014 systemet l\xe4r sig."})]})]},e.id))]})}),"waitlist"===V&&(0,$d.jsx)(mg,{children:(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:Ue,children:[(0,$d.jsx)("span",{children:"E-post"}),(0,$d.jsx)("span",{children:"K\xe4lla"}),(0,$d.jsx)("span",{children:"Reason"}),(0,$d.jsx)("span",{children:"Datum"})]}),0===(null!==(c=null===N||void 0===N?void 0:N.waitlist)&&void 0!==c?c:[]).length&&(0,$d.jsx)(_g,{children:"Ingen waitlist \xe4nnu."}),(null!==(d=null===N||void 0===N?void 0:N.waitlist)&&void 0!==d?d:[]).map(e=>{var t;return(0,$d.jsxs)(bg,{$cols:Ue,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.email}),(0,$d.jsx)(yg,{$c:"rgba(245,158,11,.15)",children:e.source}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.reason)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Eg(e.created_at)})]},e.id)})]})}),"feedback"===V&&(0,$d.jsx)(mg,{children:(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:Ve,children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"R\xf6st"}),(0,$d.jsx)("span",{children:"Kommentar"}),(0,$d.jsx)("span",{children:"Datum"})]}),0===(null!==(u=null===N||void 0===N?void 0:N.feedback)&&void 0!==u?u:[]).length&&(0,$d.jsx)(_g,{children:"Ingen feedback \xe4nnu."}),(null!==(p=null===N||void 0===N?void 0:N.feedback)&&void 0!==p?p:[]).map(e=>{var t,n;return(0,$d.jsxs)(bg,{$cols:Ve,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.supplier||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.category)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{fontSize:18},children:"up"===e.vote?"\ud83d\udc4d":"\ud83d\udc4e"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(n=e.comment)&&void 0!==n?n:"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Eg(e.created_at)})]},e.id)})]})}),"corrections"===V&&(0,$d.jsxs)(mg,{children:[(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"},children:[(0,$d.jsx)(gg,{style:{margin:0},children:"Flywheel \u2014 Labeled Corrections"}),(0,$d.jsxs)("div",{style:{marginLeft:"auto",display:"flex",gap:4,flexWrap:"wrap"},children:[[["list","Lista"],["patterns","M\xf6nster"],["learning","Aktiv inl\xe4rning \ud83d\udd2c"],["market","Marknadsdata \ud83d\udcca"]].map(e=>{let[t,n]=e;return(0,$d.jsx)("button",{onClick:()=>{ee(t);const e={"x-admin-token":w};"patterns"!==t||J||fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return X(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"!==t||G||fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return Q(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"!==t||re||fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ae(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"!==t||ie||fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>oe(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:Z===t?"#5DD6CA":"rgba(255,255,255,.08)",color:Z===t?"#0E1A17":"rgba(255,255,255,.6)"},children:n},t)}),(0,$d.jsx)("button",{onClick:()=>{const e={"x-admin-token":w};"patterns"===Z&&fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return X(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"===Z&&fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return Q(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"===Z&&fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ae(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"===Z&&fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>oe(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]})]}),"list"===Z&&(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$d.jsx)("span",{children:"F\xe4lt"}),(0,$d.jsx)("span",{children:"Fr\xe5n"}),(0,$d.jsx)("span",{children:"Till"}),(0,$d.jsx)("span",{children:"Anledning"}),(0,$d.jsx)("span",{children:"Av"}),(0,$d.jsx)("span",{children:"Datum"})]}),null===G&&(0,$d.jsx)(_g,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta korrektioner."}),0===(null===G||void 0===G?void 0:G.length)&&(0,$d.jsx)(_g,{children:"Inga korrektioner \xe4nnu \u2014 systemet \xe4r nytt."}),(null!==G&&void 0!==G?G:[]).map(e=>(0,$d.jsxs)(r.Fragment,{children:[(0,$d.jsxs)(bg,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$d.jsx)(yg,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$d.jsx)("span",{style:{color:"rgba(255,100,100,.8)",fontSize:11.5},children:e.original_value||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(100,220,180,.8)",fontSize:11.5},children:e.corrected_value||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.45)",fontSize:11},children:e.reason}),(0,$d.jsx)(yg,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:Eg(e.created_at)})]}),e.operator_reasoning&&(0,$d.jsxs)("div",{style:{padding:"6px 16px 10px",borderTop:"1px solid rgba(255,255,255,.04)",background:"rgba(93,214,202,.02)"},children:[(0,$d.jsx)("span",{style:{fontSize:10.5,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",color:"rgba(93,214,202,.5)",marginRight:8},children:"Princip"}),(0,$d.jsx)("span",{style:{fontSize:12,color:"rgba(255,255,255,.55)"},children:e.operator_reasoning})]})]},e.id))]}),"patterns"===Z&&(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"1fr 2fr 80px 80px",children:[(0,$d.jsx)("span",{children:"F\xe4lt"}),(0,$d.jsx)("span",{children:"M\xf6nster (reason)"}),(0,$d.jsx)("span",{children:"Antal"}),(0,$d.jsx)("span",{children:"Av"})]}),null===J&&(0,$d.jsx)(_g,{children:"Klicka \u21bb Ladda f\xf6r att analysera m\xf6nster."}),0===(null===J||void 0===J?void 0:J.length)&&(0,$d.jsx)(_g,{children:"Inga m\xf6nster \xe4nnu."}),(null!==J&&void 0!==J?J:[]).map((e,t)=>(0,$d.jsxs)(bg,{$cols:"1fr 2fr 80px 80px",children:[(0,$d.jsx)(yg,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.6)",fontSize:11.5},children:e.reason}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.count>=5?"#F59E0B":"#5DD6CA"},children:[e.count,"\xd7"]}),(0,$d.jsx)(yg,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by})]},t))]}),"learning"===Z&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{style:{marginBottom:12,padding:"10px 14px",background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,fontSize:12.5,color:"rgba(255,255,255,.7)"},children:"Leverant\xf6rer som inte matchar n\xe5got k\xe4nt fingerprint \u2014 flaggade automatiskt av pipeline. L\xe4gg till korrektion f\xf6r att l\xe4ra systemet."}),(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"2fr 80px 1.5fr",children:[(0,$d.jsx)("span",{children:"Leverant\xf6r (ok\xe4nd)"}),(0,$d.jsx)("span",{children:"Sedd"}),(0,$d.jsx)("span",{children:"Senast"})]}),null===re&&(0,$d.jsx)(_g,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta k\xf6n."}),0===(null===re||void 0===re?void 0:re.length)&&(0,$d.jsx)(_g,{children:"Inga ok\xe4nda leverant\xf6rer \u2014 systemet k\xe4nner igen alla det sett."}),(null!==re&&void 0!==re?re:[]).map((e,t)=>(0,$d.jsxs)(bg,{$cols:"2fr 80px 1.5fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,color:"#F59E0B"},children:e.supplier}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.seen_count>=3?"#EF4444":"#F59E0B"},children:[e.seen_count,"\xd7"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Eg(e.last_seen)})]},t))]})]}),"market"===Z&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20},children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)(gg,{children:"Kategorif\xf6rdelning (operat\xf6rskorrektioner)"}),(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"2fr 80px",children:[(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"Antal"})]}),!ie&&(0,$d.jsx)(_g,{children:"Klicka \u21bb Ladda."}),0===(null===ie||void 0===ie||null===(h=ie.categoryDist)||void 0===h?void 0:h.length)&&(0,$d.jsx)(_g,{children:"Inga korrektioner \xe4nnu."}),(null!==(f=null===ie||void 0===ie?void 0:ie.categoryDist)&&void 0!==f?f:[]).map((e,t)=>(0,$d.jsxs)(bg,{$cols:"2fr 80px",children:[(0,$d.jsx)(yg,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:[e.count,"\xd7"]})]},t))]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)(gg,{children:"Mest korrigerade leverant\xf6rer"}),(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"2fr 80px 1fr",children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Korr."}),(0,$d.jsx)("span",{children:"Senast"})]}),!ie&&(0,$d.jsx)(_g,{children:"Klicka \u21bb Ladda."}),0===(null===ie||void 0===ie||null===(m=ie.topSuppliers)||void 0===m?void 0:m.length)&&(0,$d.jsx)(_g,{children:"Inga korrektioner \xe4nnu."}),(null!==(g=null===ie||void 0===ie?void 0:ie.topSuppliers)&&void 0!==g?g:[]).map((e,t)=>(0,$d.jsxs)(bg,{$cols:"2fr 80px 1fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12},children:e.supplier}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.correction_count>=5?"#F59E0B":"#5DD6CA"},children:[e.correction_count,"\xd7"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:Eg(e.last_corrected)})]},t))]})]})]}),(0,$d.jsx)(gg,{children:"Nya leverant\xf6rer per vecka (senaste 90 dagar)"}),(null===ie||void 0===ie||null===(x=ie.discoveryTrend)||void 0===x?void 0:x.length)>0?(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"2fr 1fr",children:[(0,$d.jsx)("span",{children:"Vecka"}),(0,$d.jsx)("span",{children:"Ny leverant\xf6rer"})]}),(null!==(v=ie.discoveryTrend)&&void 0!==v?v:[]).map((e,t)=>(0,$d.jsxs)(bg,{$cols:"2fr 1fr",children:[(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:12},children:e.week}),(0,$d.jsx)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:e.new_suppliers})]},t))]}):(0,$d.jsx)(_g,{children:ie?"Inga data \xe4nnu \u2014 skicka in fakturor f\xf6r att bygga marknadsdata.":"Klicka \u21bb Ladda."})]})]}),"connections"===V&&(0,$d.jsxs)(mg,{children:[(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center"},children:[(0,$d.jsx)(gg,{style:{margin:0},children:"OAuth-anslutningar \u2014 Gmail & Outlook"}),(0,$d.jsx)("button",{onClick:()=>{fetch("/api/admin/connections",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(e=>{var t,n;se(null!==(t=e.connections)&&void 0!==t?t:[]),de(null!==(n=e.stats)&&void 0!==n?n:[])}).catch(()=>{})},style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),ce&&ce.length>0&&(0,$d.jsx)("div",{style:{display:"flex",gap:10,marginBottom:14},children:ce.map(e=>(0,$d.jsxs)("div",{style:{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"10px 16px",minWidth:130},children:[(0,$d.jsx)(hg,{children:e.provider}),(0,$d.jsxs)("div",{style:{display:"flex",gap:12,marginTop:4},children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#5DD6CA"},children:e.total}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"totalt"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#4ADE80"},children:e.active}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"aktiva"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#F59E0B"},children:e.last_7d}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"7 dagar"})]})]})]},e.provider))}),(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$d.jsx)("span",{children:"E-post"}),(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Token"}),(0,$d.jsx)("span",{children:"Kopplad"}),(0,$d.jsx)("span",{children:"Uppdaterad"}),(0,$d.jsx)("span",{children:"Status"})]}),null===le&&(0,$d.jsx)(_g,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta anslutningar."}),0===(null===le||void 0===le?void 0:le.length)&&(0,$d.jsx)(_g,{children:"Inga anslutningar \xe4nnu \u2014 ingen har kopplat Gmail/Outlook."}),(null!==le&&void 0!==le?le:[]).map(e=>(0,$d.jsxs)(bg,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.email}),(0,$d.jsx)(yg,{$c:"gmail"===e.provider?"rgba(234,67,53,.2)":"rgba(0,120,212,.2)",children:e.provider}),(0,$d.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.4)"},children:e.token_expiry?new Date(e.token_expiry).toLocaleDateString("sv-SE"):"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Eg(e.created_at)}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Eg(e.updated_at)}),(0,$d.jsx)(yg,{$c:e.token_valid?"rgba(74,222,128,.2)":"rgba(239,68,68,.2)",children:e.token_valid?"OK":"Utg\xe5ngen"})]},e.id))]})]}),"prisbok"===V&&(0,$d.jsxs)(mg,{children:[(0,$d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:12},children:[(0,$d.jsx)(gg,{style:{margin:0},children:"Prisbokens cellteckning"}),(0,$d.jsx)("button",{onClick:Re,style:{marginLeft:"auto",padding:"6px 14px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)"},children:"Uppdatera"})]}),Pe?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("p",{style:{fontSize:12.5,color:"rgba(255,255,255,.55)",margin:"0 0 14px"},children:[null!==(b=Pe.total_datapoints)&&void 0!==b?b:0," datapunkter totalt \xb7 ",null!==(y=Pe.segments_with_real_data)&&void 0!==y?y:0," celler b\xe4r (\u2265",Pe.min_points_threshold,") \xb7 celler n\xe4ra tr\xf6skeln fylls medvetet \u2014 v\xe4lj n\xe4sta outbound-lista p\xe5 SNI-koder som tippar dem \xf6ver."]}),(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"1.2fr 1fr .8fr .5fr .8fr",children:[(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"Bransch"}),(0,$d.jsx)("span",{children:"Storlek"}),(0,$d.jsx)("span",{children:"n"}),(0,$d.jsx)("span",{children:"Status"})]}),0===(null!==(k=Pe.segments)&&void 0!==k?k:[]).length&&(0,$d.jsx)(_g,{children:"Prisboken \xe4r tom \u2014 varje analyserad faktura l\xe4gger en datapunkt."}),(null!==(j=Pe.segments)&&void 0!==j?j:[]).map((e,t)=>(0,$d.jsxs)(bg,{$cols:"1.2fr 1fr .8fr .5fr .8fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.category}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.6)"},children:e.industry}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.size_bucket}),(0,$d.jsx)("span",{style:{fontWeight:700},children:e.n}),(0,$d.jsx)(yg,{$c:"B\xc4R"===e.status?"rgba(93,214,202,.2)":"LIVE-LIGHT"===e.status?"rgba(93,214,202,.12)":"N\xc4RA"===e.status?"rgba(245,158,11,.15)":"rgba(255,255,255,.08)",children:e.status})]},t))]})]}):(0,$d.jsx)(_g,{children:"Klicka Uppdatera f\xf6r att l\xe4sa cellteckningen."})]}),"outbound"===V&&(0,$d.jsxs)(mg,{children:[(0,$d.jsx)("div",{style:{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"},children:[["Skapade",null===$e||void 0===$e?void 0:$e.total,"#5DD6CA"],["Mail skickade",null===$e||void 0===$e?void 0:$e.email_sent,"#5DD6CA"],["\xd6ppnade l\xe4nken",null===$e||void 0===$e?void 0:$e.opened,"#F59E0B"],["Konverterade",null===$e||void 0===$e?void 0:$e.converted,"#4ADE80"]].map(e=>{let[t,n,r]=e;return(0,$d.jsxs)(pg,{style:{minWidth:120},children:[(0,$d.jsx)(hg,{children:t}),(0,$d.jsx)(fg,{style:{color:r},children:null!==n&&void 0!==n?n:"\u2013"})]},t)})}),(0,$d.jsx)(gg,{children:"Skapa prospect"}),(0,$d.jsx)(xg,{children:(0,$d.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$d.jsxs)("form",{onSubmit:async function(e){if(e.preventDefault(),"loading"!==Ne&&Ee.companyName&&Ee.employees){Ae("loading"),Fe(null);try{const e=await fetch("/api/generate-prospect",{method:"POST",headers:{"Content-Type":"application/json","x-arvo-admin":w},body:JSON.stringify({companyName:Ee.companyName,sniCode:Ee.sniCode||void 0,employees:Number(Ee.employees),contactEmail:Ee.contactEmail||void 0,sendEmail:Ee.sendEmail,createdBy:"admin-ui"})}),t=await e.json();Fe(t),t.ok&&(ze({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),Le())}catch{Fe({ok:!1,error:"N\xe4tverksfel"})}finally{Ae("idle")}}},style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"},children:[(0,$d.jsx)(jg,{placeholder:"Bolagsnamn *",value:Ee.companyName,onChange:e=>ze(t=>({...t,companyName:e.target.value})),style:{minWidth:180,borderRadius:8}}),(0,$d.jsx)(jg,{placeholder:"SNI-kod (t.ex. 41)",value:Ee.sniCode,onChange:e=>ze(t=>({...t,sniCode:e.target.value})),style:{width:130,borderRadius:8}}),(0,$d.jsx)(jg,{placeholder:"Antal anst. *",type:"number",value:Ee.employees,onChange:e=>ze(t=>({...t,employees:e.target.value})),style:{width:110,borderRadius:8}}),(0,$d.jsx)(jg,{placeholder:"Kontakt-mail",value:Ee.contactEmail,onChange:e=>ze(t=>({...t,contactEmail:e.target.value})),style:{minWidth:200,borderRadius:8}}),(0,$d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"rgba(255,255,255,.6)",whiteSpace:"nowrap",cursor:"pointer"},children:[(0,$d.jsx)("input",{type:"checkbox",checked:Ee.sendEmail,onChange:e=>ze(t=>({...t,sendEmail:e.target.checked}))}),"Skicka mail"]}),(0,$d.jsx)(wg,{type:"submit",disabled:"loading"===Ne||!Ee.companyName||!Ee.employees,children:"loading"===Ne?"\u2026":"Skapa \u2192"})]}),Ce&&(0,$d.jsx)("div",{style:{marginTop:10,padding:"10px 14px",borderRadius:8,background:Ce.ok?"rgba(74,222,128,.1)":"rgba(239,68,68,.1)",border:"1px solid "+(Ce.ok?"rgba(74,222,128,.25)":"rgba(239,68,68,.25)")},children:Ce.ok?(0,$d.jsxs)("span",{style:{fontSize:12.5,color:"#4ADE80"},children:["\u2713 Skapad:\xa0",(0,$d.jsx)("a",{href:Ce.url,target:"_blank",rel:"noopener noreferrer",style:{color:"#5DD6CA",wordBreak:"break-all"},children:Ce.url}),Ce.emailSent&&" \xb7 mail skickat"]}):(0,$d.jsxs)("span",{style:{fontSize:12.5,color:"#F87171"},children:["Fel: ",Ce.error]})})]})}),(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:12,marginTop:20,alignItems:"center"},children:[(0,$d.jsx)(gg,{style:{margin:0},children:"Prospects"}),(0,$d.jsx)("button",{onClick:Le,style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)(vg,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$d.jsx)("span",{children:"Bolag"}),(0,$d.jsx)("span",{children:"Bransch"}),(0,$d.jsx)("span",{children:"Anst."}),(0,$d.jsx)("span",{children:"Mail skickat"}),(0,$d.jsx)("span",{children:"\xd6ppnat"}),(0,$d.jsx)("span",{children:"\xc5tg\xe4rd"}),(0,$d.jsx)("span",{children:"Skapad"})]}),null===we&&(0,$d.jsx)(_g,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta prospects."}),0===(null===we||void 0===we?void 0:we.length)&&(0,$d.jsx)(_g,{children:"Inga prospects \xe4n \u2014 skapa ett ovan."}),(null!==we&&void 0!==we?we:[]).map(e=>{var t;return(0,$d.jsxs)(bg,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.company_name}),(0,$d.jsx)("span",{style:{fontSize:11.5,color:"rgba(255,255,255,.50)"},children:e.industry}),(0,$d.jsx)("span",{style:{fontSize:12},children:e.employees}),(0,$d.jsx)("span",{style:{fontSize:11,color:e.email_sent_at?"rgba(255,255,255,.5)":"rgba(255,255,255,.2)"},children:Eg(e.email_sent_at)}),(0,$d.jsx)("span",{style:{fontSize:11,color:e.opened_at?"#F59E0B":"rgba(255,255,255,.2)"},children:Eg(e.opened_at)}),(0,$d.jsx)(yg,{$c:"upload"===e.action?"rgba(74,222,128,.25)":"activate"===e.action?"rgba(93,214,202,.25)":"rgba(255,255,255,.07)",children:null!==(t=e.action)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.30)"},children:Eg(e.created_at)})]},e.id)})]})]})]})}const Ag=vd.div`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`,Cg=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 48px 44px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 32px rgba(0,0,0,.07);
  @media (max-width: 520px) { padding: 36px 24px; }
`,Fg=vd.div`
  margin-bottom: 36px;
`,Tg=vd.p`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin: 0 0 10px;
`,Pg=vd.h1`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 10px;
  line-height: 1.3;
`,Dg=vd.p`
  font-size: 14.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin: 0 0 32px;
`,Rg=vd.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,Lg=vd.input`
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
`,Og=vd.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin-bottom: 8px;
  letter-spacing: 0.01em;
`,Ig=vd.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:n}=e;return null!==(t=n.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 0 24px;
`,Bg=vd(vl)`
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  text-decoration: none;
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`;function Mg(){const e=new URLSearchParams(window.location.search),t=e.get("id"),n=e.get("svar"),[a,i]=(0,r.useState)("ja"===n?"cost":"nej"===n?"submitting-no":"question"),[o,l]=(0,r.useState)(""),[s,c]=(0,r.useState)("idle"),[d,u]=(0,r.useState)("");async function p(e,n){if(t){c("submitting");try{const r=await fetch("/api/outcome-survey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:t,switched:e,actualAnnualCost:n?Number(String(n).replace(/\s/g,"")):null})}),a=await r.json();a.supplier&&u(a.supplier),c("done")}catch{c("error")}}else c("done")}return(0,r.useEffect)(()=>{"nej"===n&&t&&p(!1,null)},[]),"done"===s?(0,$d.jsx)(Ag,{children:(0,$d.jsxs)(Cg,{children:[(0,$d.jsx)(Fg,{children:(0,$d.jsx)(vl,{to:"/",children:(0,$d.jsx)(Dd,{})})}),(0,$d.jsx)(Ig,{children:"\u2713"}),(0,$d.jsx)(Pg,{children:"Tack \u2014 det hj\xe4lper oss mycket."}),(0,$d.jsxs)(Dg,{children:["Varje svar g\xf6r Arvo lite mer precis. N\xe4sta kund som analyserar en",d?` ${d}`:"","-faktura drar nytta av det ni just ber\xe4ttade."]}),(0,$d.jsx)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"md",children:"Analysera en ny faktura \u2192"})]})}):"submitting-no"===a||"nej"===n&&"done"!==s?(0,$d.jsx)(Ag,{children:(0,$d.jsxs)(Cg,{style:{textAlign:"center"},children:[(0,$d.jsx)(Fg,{style:{textAlign:"left"},children:(0,$d.jsx)(vl,{to:"/",children:(0,$d.jsx)(Dd,{})})}),(0,$d.jsx)(Dg,{style:{margin:"32px 0 0"},children:"Registrerar ert svar\u2026"})]})}):(0,$d.jsx)(Ag,{children:(0,$d.jsxs)(Cg,{children:[(0,$d.jsx)(Fg,{children:(0,$d.jsx)(vl,{to:"/",children:(0,$d.jsx)(Dd,{})})}),(0,$d.jsx)(Tg,{children:"60-dagars uppf\xf6ljning"}),"question"===a&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Pg,{children:"Bytte ni leverant\xf6r efter analysen?"}),(0,$d.jsx)(Dg,{children:"Det tar 30 sekunder och hj\xe4lper oss att bli mer precisa f\xf6r er och alla kommande kunder."}),(0,$d.jsxs)(Rg,{children:[(0,$d.jsx)(Id,{$variant:"gradient",$size:"md",onClick:()=>i("cost"),children:"Ja, vi bytte \u2192"}),(0,$d.jsx)(Id,{$variant:"ghost",$size:"md",onClick:()=>p(!1,null),children:"Inte \xe4n"})]})]}),"cost"===a&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Pg,{children:"Vad betalar ni nu per \xe5r?"}),(0,$d.jsx)(Dg,{children:"Ange er nya \xe5rskostnad (kr/\xe5r) \u2014 vi j\xe4mf\xf6r med vad vi f\xf6rutsp\xe5dde."}),(0,$d.jsx)(Og,{htmlFor:"actual-cost",children:"Ny \xe5rskostnad (kr)"}),(0,$d.jsx)(Lg,{id:"actual-cost",type:"text",inputMode:"numeric",placeholder:"t.ex. 48 000",value:o,onChange:e=>l(e.target.value),autoFocus:!0}),(0,$d.jsxs)(Rg,{children:[(0,$d.jsx)(Id,{$variant:"gradient",$size:"md",disabled:"submitting"===s,onClick:()=>p(!0,o),children:"submitting"===s?"Sparar\u2026":"Skicka \u2192"}),(0,$d.jsx)(Id,{$variant:"ghost",$size:"sm",onClick:()=>p(!0,null),children:"Hoppa \xf6ver kostnaden"})]}),"error"===s&&(0,$d.jsx)("p",{style:{color:"#D94F3C",fontSize:13,margin:"8px 0 0"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$d.jsx)(Bg,{to:"/",children:"\u2190 Tillbaka till startsidan"})]})})}const Ug=jd`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,Vg=jd`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
`,Kg=jd`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
`,Hg=jd`
  from { stroke-dashoffset: 24; }
  to   { stroke-dashoffset: 0; }
`,Wg=jd`
  to { transform: rotate(360deg); }
`,qg=vd.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: #0A1512;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`,Yg=vd.section`
  height: 100vh;
  min-height: 600px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`,Gg=vd(Yg)`
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
`,Qg=vd.p`
  margin: 16px 0 4px;
  font-size: 11px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .18em;
  animation: ${Ug} 0.7s ease both;
`,Jg=vd.p`
  margin: 0 0 48px;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  animation: ${Ug} 0.7s 0.1s ease both;
`,Xg=vd.p`
  margin: 0 0 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .12em;
  animation: ${Ug} 0.7s 0.2s ease both;
`,Zg=vd.p`
  margin: 0 0 6px;
  font-size: clamp(52px, 9vw, 80px);
  font-weight: 800;
  color: #fff;
  line-height: 1;
  letter-spacing: -.03em;
  animation: ${Ug} 0.7s 0.25s ease both;
`,ex=vd.span`
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 400;
  color: rgba(255,255,255,0.40);
  margin-left: 8px;
`,tx=vd.p`
  margin: 0 0 56px;
  font-size: 17px;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  animation: ${Ug} 0.7s 0.35s ease both;

  strong { color: #fff; }
`,nx=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: ${Ug} 0.7s 0.5s ease both;
`,rx=vd.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .06em;
`,ax=vd.div`
  width: 20px;
  height: 20px;
  color: rgba(29,176,154,0.5);
  animation: ${Vg} 1.6s ease-in-out infinite;
`,ix=vd.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;

  @media (max-width: 480px) { display: none; }
`,ox=vd.button`
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
`,lx=vd(Yg)`
  padding: 0;
  background: radial-gradient(ellipse at 80% 20%, rgba(29,176,154,0.07) 0%, transparent 60%),
              #0A1512;
`,sx=vd.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 56px 36px 36px;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) { padding: 48px 24px 28px; }
`,cx=vd.p`
  margin: 0 0 24px;
  font-size: 10px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .20em;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,dx=vd.span`
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

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,ux=vd.span`
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
`,px=vd.h1`
  margin: 0 0 12px;
  font-size: clamp(24px, 4.5vw, 38px);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -.02em;

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s 0.1s ease, transform 0.55s 0.1s ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,hx=vd.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.5;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.17s ease, transform 0.5s 0.17s ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,fx=vd.div`
  display: flex;
  gap: 16px;
  margin-bottom: 28px;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.24s ease, transform 0.5s 0.24s ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}

  @media (max-width: 480px) { flex-direction: column; gap: 12px; }
`,mx=vd.div`
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 18px 20px;
`,gx=vd.p`
  margin: 0 0 4px;
  font-size: ${e=>{let{$primary:t}=e;return t?"clamp(28px, 5vw, 40px)":"clamp(20px, 3.5vw, 28px)"}};
  font-weight: 800;
  color: ${e=>{let{$primary:t}=e;return t?"#fff":"rgba(255,255,255,0.75)"}};
  line-height: 1;
  letter-spacing: -.02em;
`,xx=vd.span`
  font-size: 0.55em;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  margin-left: 4px;
`,vx=vd.p`
  margin: 0;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .08em;
`,bx=vd.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  flex: 1;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.30s ease, transform 0.5s 0.30s ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,yx=vd.div`
  padding-top: 24px;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.38s ease, transform 0.5s 0.38s ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,kx=vd.button`
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
`,jx=vd.span`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${Wg} 0.7s linear infinite;
`,wx=(vd.button`
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
`,vd(Yg)`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 32px;
  background: radial-gradient(ellipse at 50% 40%, rgba(29,176,154,0.09) 0%, transparent 65%),
              #0A1512;
`),Sx=vd.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(29,176,154,0.15);
  border: 1.5px solid rgba(29,176,154,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: ${Ug} 0.6s ease both;

  svg { overflow: visible; }

  svg path {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: ${Hg} 0.5s 0.3s ease forwards;
  }
`,$x=vd.h2`
  margin: 0 0 12px;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  animation: ${Ug} 0.6s 0.1s ease both;
`,_x=vd.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  max-width: 440px;
  animation: ${Ug} 0.6s 0.2s ease both;
`,Ex=vd.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${Ug} 0.6s 0.3s ease both;
`,zx=vd.div`
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.20);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
`,Nx=vd.span`
  font-size: 16px;
  flex-shrink: 0;
`,Ax=vd.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.80);
  line-height: 1.4;

  strong { color: #fff; }
`,Cx=vd.p`
  margin: 0 0 36px;
  font-size: 14px;
  color: #1DB09A;
  animation: ${Ug} 0.6s 0.4s ease both;
`,Fx=vd.a`
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
  animation: ${Ug} 0.6s 0.45s ease both;

  &:hover {
    background: rgba(255,255,255,0.11);
    color: #fff;
  }
`,Tx=vd.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  gap: 20px;
`,Px=vd.div`
  display: flex;
  gap: 8px;
`,Dx=vd.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1DB09A;
  animation: ${Kg} 1.2s ${e=>{let{$i:t}=e;return.2*t}}s ease-in-out infinite;
`,Rx=vd.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  letter-spacing: .04em;
`,Lx=vd.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  padding: 32px;
  text-align: center;
`,Ox=vd.div`
  font-size: 40px;
  margin-bottom: 20px;
`,Ix=vd.h1`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`,Bx=vd.p`
  margin: 0 0 32px;
  font-size: 15px;
  color: rgba(255,255,255,0.45);
  max-width: 360px;
  line-height: 1.6;
`,Mx=vd.a`
  background: linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%);
  color: #fff;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  transition: opacity 0.2s;

  &:hover { opacity: 0.88; }
`,Ux=e=>Math.round(null!==e&&void 0!==e?e:0).toLocaleString("sv-SE");const Vx={recommendation:"Bytesrekommendation",cost_trend:"Prish\xf6jning",overpaying:"\xd6verpris",price_alert:"Prish\xf6jningsvarning"};function Kx(e){if(!e)return"";const[t,n]=e.split("-").map(Number),r=new Date(t,n-1,1).toLocaleString("sv-SE",{month:"long",year:"numeric"});return r.charAt(0).toUpperCase()+r.slice(1)}const Hx=e=>{let{size:t=36}=e;return(0,$d.jsxs)("svg",{width:t,height:t,viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"briefingGrad",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$d.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#briefingGrad)"})]})},Wx=()=>(0,$d.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:(0,$d.jsx)("path",{d:"M10 4v12M4 10l6 6 6-6",stroke:"#1DB09A",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),qx=()=>(0,$d.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",fill:"none",children:(0,$d.jsx)("path",{d:"M6 14l6 6 10-12",stroke:"#1DB09A",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})});function Yx(){var e;const{token:t}=ho(),[n,a]=(0,r.useState)("loading"),[i,o]=(0,r.useState)(null),[l,s]=(0,r.useState)(""),[c,d]=(0,r.useState)(0),[u,p]=(0,r.useState)({}),[h,f]=(0,r.useState)({}),[m,g]=(0,r.useState)({}),x=(0,r.useRef)(null),v=(0,r.useRef)([]),b=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1300;const[n,a]=(0,r.useState)(0);return(0,r.useEffect)(()=>{if(!e)return;const n=performance.now();let r;const i=o=>{const l=Math.min(1,(o-n)/t),s=1-Math.pow(1-l,3);a(Math.round(s*e)),l<1&&(r=requestAnimationFrame(i))};return r=requestAnimationFrame(i),()=>cancelAnimationFrame(r)},[e,t]),n}("ready"===n?null===i||void 0===i?void 0:i.totalSavingPotential:0);(0,r.useEffect)(()=>{if(!t)return a("error"),void s("Ogiltig l\xe4nk");fetch(`/api/briefing?token=${encodeURIComponent(t)}`).then(e=>e.json()).then(e=>{var t,n;if(!e.ok)return a("error"),void s(null!==(n=e.error)&&void 0!==n?n:"Ok\xe4nt fel");o(e.briefing),g(null!==(t=e.briefing.actionsTaken)&&void 0!==t?t:{}),a("ready")}).catch(()=>{a("error"),s("Kunde inte h\xe4mta briefingen")})},[t]),(0,r.useEffect)(()=>{if("ready"!==n)return;const e=new IntersectionObserver(e=>{e.forEach(e=>{const t=Number(e.target.dataset.cardIndex);e.isIntersecting&&(p(e=>({...e,[t]:!0})),d(t))})},{threshold:.4,root:x.current});return v.current.forEach(t=>{t&&e.observe(t)}),()=>e.disconnect()},[n,i]);const y=(0,r.useCallback)(async(e,n)=>{if("loading"!==h[e]&&"done"!==h[e]){f(t=>({...t,[e]:"loading"}));try{const a=await fetch(`/api/briefing?token=${encodeURIComponent(t)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({insightId:e,action:n})}),i=await a.json();var r;if(a.ok&&i.ok)f(t=>({...t,[e]:"done"})),g(null!==(r=i.actionsTaken)&&void 0!==r?r:{});else f(t=>({...t,[e]:"idle"}))}catch{f(t=>({...t,[e]:"idle"}))}}},[t,h]),k=(0,r.useCallback)(e=>{const t=v.current[e];t&&t.scrollIntoView({behavior:"smooth",block:"start"})},[]);if("loading"===n)return(0,$d.jsxs)(Tx,{children:[(0,$d.jsx)(Px,{children:[0,1,2].map(e=>(0,$d.jsx)(Dx,{$i:e},e))}),(0,$d.jsx)(Rx,{children:"H\xe4mtar din Arvo-briefing\u2026"})]});if("error"===n)return(0,$d.jsxs)(Lx,{children:[(0,$d.jsx)(Ox,{children:"\ud83d\udd12"}),(0,$d.jsx)(Ix,{children:"Briefingen hittades inte"}),(0,$d.jsxs)(Bx,{children:[l||"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig."," ","Ladda upp en ny faktura s\xe5 genererar Arvo en uppdaterad briefing \xe5t er."]}),(0,$d.jsx)(Mx,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const j=null!==(e=null===i||void 0===i?void 0:i.insights)&&void 0!==e?e:[],w=1+j.length+1,S=Object.keys(m).length>0;return(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(ix,{children:Array.from({length:w},(e,t)=>(0,$d.jsx)(ox,{$active:c===t,onClick:()=>k(t),"aria-label":`G\xe5 till kort ${t+1}`},t))}),(0,$d.jsxs)(qg,{ref:x,children:[(0,$d.jsxs)(Gg,{"data-card-index":"0",ref:e=>{v.current[0]=e},children:[(0,$d.jsx)(Hx,{size:44}),(0,$d.jsx)(Qg,{children:"Arvo Intelligence"}),(0,$d.jsx)(Jg,{children:Kx(null===i||void 0===i?void 0:i.period)}),(0,$d.jsx)(Xg,{children:"Potentiell besparing"}),(0,$d.jsxs)(Zg,{children:[Ux(b),(0,$d.jsx)(ex,{children:"kr/\xe5r"})]}),(0,$d.jsxs)(tx,{children:["Arvo har identifierat"," ",(0,$d.jsxs)("strong",{children:[j.length," ",1===j.length?"besparingsinsikt":"besparingsinsikter"]})," ","f\xf6r ert bolag"]}),(0,$d.jsxs)(nx,{children:[(0,$d.jsx)(rx,{children:"Scrolla f\xf6r att se insikterna"}),(0,$d.jsx)(ax,{children:(0,$d.jsx)(Wx,{})})]})]}),j.map((e,t)=>{var n,r,a,i,o,l,s,c,d,p,f,g;const x=t+1,b=!!u[x],k=null!==(n=h[e.id])&&void 0!==n?n:"idle",w="done"===k||!!m[e.id],S="loading"===k;return(0,$d.jsx)(lx,{"data-card-index":String(x),ref:e=>{v.current[x]=e},children:(0,$d.jsxs)(sx,{children:[(0,$d.jsxs)(cx,{$visible:b,children:["INSIKT ",t+1," AV ",j.length]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)(ux,{$type:e.type,children:null!==(r=Vx[e.type])&&void 0!==r?r:e.type}),(0,$d.jsx)(dx,{$visible:b,children:e.supplier})]}),(0,$d.jsx)(px,{$visible:b,children:e.headline}),(0,$d.jsx)(hx,{$visible:b,children:e.subheadline}),(0,$d.jsxs)(fx,{$visible:b,children:[(0,$d.jsxs)(mx,{children:[(0,$d.jsxs)(gx,{$primary:!0,children:[Ux(null===(a=e.metric)||void 0===a||null===(i=a.primary)||void 0===i?void 0:i.value),(0,$d.jsx)(xx,{children:"kr"})]}),(0,$d.jsx)(vx,{children:null===(o=e.metric)||void 0===o||null===(l=o.primary)||void 0===l?void 0:l.label})]}),null!=(null===(s=e.metric)||void 0===s||null===(c=s.secondary)||void 0===c?void 0:c.value)&&(0,$d.jsxs)(mx,{children:[(0,$d.jsxs)(gx,{children:["number"===typeof e.metric.secondary.value&&null!==(d=e.metric.secondary.label)&&void 0!==d&&d.includes("%")?`${e.metric.secondary.value}%`:Ux(e.metric.secondary.value),!(null!==(p=e.metric.secondary.label)&&void 0!==p&&p.includes("%"))&&(0,$d.jsx)(xx,{children:"kr"})]}),(0,$d.jsx)(vx,{children:null===(f=e.metric)||void 0===f||null===(g=f.secondary)||void 0===g?void 0:g.label})]})]}),(0,$d.jsx)(bx,{$visible:b,children:e.context}),e.action&&(0,$d.jsx)(yx,{$visible:b,children:(0,$d.jsxs)(kx,{$done:w,$loading:S,disabled:w||S,onClick:()=>y(e.id,e.action.label),children:[S&&(0,$d.jsx)(jx,{}),w?"\u2713 Arvo \xe4r p\xe5 det \u2014 vi \xe5terkommer inom 24 timmar":e.action.label]})})]})},e.id)}),(0,$d.jsxs)(wx,{"data-card-index":String(w-1),ref:e=>{v.current[w-1]=e},children:[(0,$d.jsx)(Sx,{children:(0,$d.jsx)(qx,{})}),(0,$d.jsx)($x,{children:"Er Arvo-briefing \xe4r klar"}),(0,$d.jsx)(_x,{children:S?"Bra jobbat \u2014 ni har aktiverat Arvo. Vi granskar era avtal och \xe5terkommer med en konkret handlingsplan.":"Era insikter v\xe4ntar p\xe5 er. Ni kan alltid komma tillbaka till denna sida via l\xe4nken i mailet."}),S&&(0,$d.jsx)(Ex,{children:Object.entries(m).map(e=>{let[t,n]=e;return(0,$d.jsxs)(zx,{children:[(0,$d.jsx)(Nx,{children:"\u2713"}),(0,$d.jsxs)(Ax,{children:[(0,$d.jsx)("strong",{children:"approve_switch"===n.type?"Bytesuppdrag":"F\xf6rhandlingsuppdrag"})," ","aktiverat f\xf6r ",(0,$d.jsx)("strong",{children:n.supplier}),n.estimatedNetSaving>0&&` \xb7 Potentiell besparing: ${Ux(n.estimatedNetSaving)} kr/\xe5r`]})]},t)})}),S&&(0,$d.jsx)(Cx,{children:"Arvo \xe5terkommer inom 24 timmar med n\xe4sta steg."}),(0,$d.jsx)(Fx,{href:"/testa-faktura",children:"Analysera fler fakturor \u2192"})]})]})]})}const Gx=jd`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`,Qx=jd`
  from { opacity: 0; transform: translateY(-24px) scale(0.95); }
  65%  { transform: translateY(4px) scale(1.005); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`,Jx=jd`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(29,176,154,0); }
`,Xx=jd`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,Zx=vd.div`
  background: #ffffff;
  color: #0E1A17;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
`,ev=vd.section`
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
`,tv=vd.div`
  position: relative;
  z-index: 1;
  max-width: 680px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`,nv=vd.div`
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
  animation: ${Qx} 0.75s cubic-bezier(0.34, 1.46, 0.64, 1) both;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.55) inset,
    0 -1px 0 rgba(255,255,255,0.06) inset,
    0 0 40px rgba(255,255,255,0.04),
    0 48px 120px rgba(0,0,0,0.70),
    0 8px 32px rgba(0,0,0,0.40);
`,rv=vd.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
`,av=vd.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${Jx} 2.2s ease-in-out infinite;
`,iv=vd.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: .02em;
  flex: 1;
`,ov=vd.span`
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .01em;
`,lv=vd.p`
  margin: 0 0 7px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -.015em;
`,sv=vd.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;

  strong {
    color: rgba(255,255,255,0.88);
    font-weight: 600;
  }
`,cv=vd.button`
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
`,dv=vd.h1`
  margin: 0 0 20px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(38px, 6.5vw, 76px);
  font-weight: 700;
  color: #fff;
  line-height: 1.10;
  letter-spacing: -.02em;
  animation: ${Gx} 0.8s 0.28s both ease-out;

  em {
    font-style: italic;
    font-weight: 400;
  }
`,uv=vd.p`
  margin: 0 0 52px;
  font-size: clamp(16px, 2.2vw, 20px);
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
  animation: ${Gx} 0.8s 0.42s both ease-out;
`,pv=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: ${Gx} 0.8s 0.56s both ease-out;
`,hv=vd.a`
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
`,fv=vd.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.52);
  letter-spacing: .01em;
`,mv=vd.section`
  padding: 80px 24px;
  background: #ffffff;

  @media (max-width: 640px) { padding: 64px 20px; }

  & > * {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
`,gv=vd.div`
  text-align: center;
  margin-bottom: 48px;
  @media (max-width: 640px) { margin-bottom: 36px; }
`,xv=vd.p`
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  color: #1B7A6E;
  text-transform: uppercase;
  letter-spacing: .20em;
  text-align: center;
`,vv=vd.h2`
  margin: 0 0 48px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  line-height: 1.12;
  letter-spacing: -.02em;
  text-align: center;

  @media (max-width: 640px) { margin-bottom: 36px; }
`,bv=(vd.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,vd.div`
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

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,vd.div`
  display: flex;
  align-items: baseline;
  gap: 7px;
  margin-bottom: 6px;
`,vd.span`
  font-size: 10px;
  font-weight: 700;
  color: #9F3B22;
  letter-spacing: .10em;
  flex-shrink: 0;
  opacity: 0.55;
`,vd.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 16px;
  font-weight: 600;
  color: #0E1A17;
  line-height: 1.25;
`,vd.p`
  margin: 6px 0 16px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: ${e=>{let{$isText:t}=e;return t?"clamp(20px,2.8vw,26px)":"clamp(24px,3.2vw,32px)"}};
  font-weight: 700;
  color: #9F3B22;
  letter-spacing: -.025em;
  line-height: 1.05;
`,vd.p`
  margin: 0;
  font-size: 13px;
  color: #5C6E68;
  line-height: 1.6;
  flex: 1;
`,vd.p`
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
`,vd.div`
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
`,vd.p`
  margin: 0 0 4px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(40px, 7vw, 60px);
  font-weight: 700;
  color: #9F3B22;
  letter-spacing: -.03em;
  line-height: 1;
`,vd.p`
  margin: 0;
  font-size: 14px;
  color: #5C6E68;
  font-style: italic;
  line-height: 1.4;
`,vd.p`
  margin: 0;
  font-size: 12px;
  color: #1B7A6E;
  font-weight: 600;
  letter-spacing: .01em;
  text-align: right;

  @media (max-width: 600px) { text-align: left; }
`,vd.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 620px) { grid-template-columns: 1fr; }
`),yv=vd.div`
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

  ${e=>{let{$visible:t}=e;return t&&md`
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
`,kv=vd.p`
  margin: 0;
  padding: 0 0 0 12px;
  border-left: 2.5px solid #9F3B22;
  font-size: 13px;
  font-style: italic;
  color: #4A5E58;
  line-height: 1.6;
`,jv=vd.div`
  height: 1px;
  background: #E4EDE9;
  margin: 16px 0;
`,wv=(vd.span`
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
`,vd.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 18px;
  font-weight: 600;
  color: #0E1A17;
  line-height: 1.25;
`),Sv=vd.p`
  margin: 0;
  font-size: 13.5px;
  color: #5C6E68;
  line-height: 1.6;
  flex: 1;
`,$v=vd.p`
  margin: 0;
  font-size: 12.5px;
  color: #1B7A6E;
  font-style: italic;
  line-height: 1.55;
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid #D5E2DC;
`,_v=vd.section`
  background: #000;
  padding: 88px 24px;

  @media (max-width: 640px) { padding: 72px 20px; }
`,Ev=vd.div`
  max-width: 760px;
  margin: 0 auto;
`,zv=vd.p`
  margin: 0 0 56px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.28);
  text-transform: uppercase;
  letter-spacing: .22em;
`,Nv=vd.div`
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease,
    transform 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Av=vd.span`
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #4FBFB3;
  text-transform: uppercase;
  letter-spacing: .20em;
  margin-bottom: 14px;
`,Cv=vd.p`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(30px, 5.5vw, 60px);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -.03em;
  text-align: left;
`,Fv=vd.div`
  width: 1px;
  height: 56px;
  background: rgba(255,255,255,0.10);
  margin: 52px 0;
`,Tv=vd.section`
  background: #ffffff;
  padding: 96px 24px;
  border-top: 1px solid #E8EFEC;
  text-align: center;

  @media (max-width: 640px) { padding: 72px 20px; }
`,Pv=vd.div`
  max-width: 480px;
  margin: 0 auto;
`,Dv=vd.h2`
  margin: 0 0 16px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  letter-spacing: -.025em;
  line-height: 1.12;
`,Rv=vd.p`
  margin: 0 0 40px;
  font-size: 16px;
  color: #5C6E68;
  line-height: 1.6;
`,Lv=vd.p`
  margin: 24px 0 0;
  font-size: 12px;
  color: #3F4B47;
  letter-spacing: .01em;
  opacity: 0.65;
`,Ov=vd.div`
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
`,Iv=vd.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 0;
`,Bv=vd.input`
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
`,Mv=vd.button`
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
`,Uv=vd.p`
  font-size: 12.5px;
  color: #9F3B22;
  margin: 4px 0 0;
  line-height: 1.5;
`,Vv=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
`,Kv=vd.div`
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
`,Hv=vd.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0E1A17;
`,Wv=vd.p`
  margin: 0;
  font-size: 14px;
  color: #5C6E68;
  line-height: 1.6;
`,qv=vd.p`
  margin: 0;
  font-size: 13px;
  color: #3F4B47;
  opacity: 0.55;
  font-style: italic;
`,Yv=[{context:"Telia h\xf6jer 11% i januari. Ni m\xe4rker det i september \u2014 \xe5tta m\xe5nader senare.",title:"Marknadsintelligens f\xf6re fakturan",body:"Arvo ser vad som h\xe4nder hos j\xe4mf\xf6rbara bolag i n\xe4tverket \u2014 och varnar er innan h\xf6jningen syns p\xe5 er faktura.",quote:'"6 av 14 bolag i er bransch fick Telias prish\xf6jning f\xf6rra m\xe5naden."'},{context:"Tele2-avtalet f\xf6rnyas automatiskt. Ni m\xe4rkte det inte. Nu \xe4r ni l\xe5sta ett \xe5r till.",title:"Kontraktskalender med handlingsplan",body:"Inte bara p\xe5minnelser \u2014 utan exakt vad som ska g\xf6ras, n\xe4r och varf\xf6r. Arvo r\xe4knar bakl\xe4nges fr\xe5n varje f\xf6rnyelsedatum.",quote:'"87 dagar kvar. Aktivera byte senast 15 september."'},{context:"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr. Ni betalar differensen utan att veta om det.",title:"Faktura mot avtal",body:"Leverant\xf6rer fakturerar fel \u2014 ofta. Arvo kontrollerar automatiskt varje faktura mot k\xe4nt avtalspris och flaggar avvikelser direkt.",quote:'"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr."'},{context:"Kostnaderna rullar p\xe5. Ingen sammanfattar. Styrelsen fr\xe5gar \u2014 ingen har svaret.",title:"M\xe5natlig CFO-brief",body:"En professionell rapport \u2014 klar f\xf6r styrelserummet \u2014 med vad Arvo hittat, vad som sparats och vad som \xe4r p\xe5 v\xe4g.",quote:'"Tre avtal bevakas. Ett flaggat f\xf6r \xe5tg\xe4rd n\xe4sta vecka."'}];function Gv(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.12;const t=(0,r.useRef)(null),[n,a]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{const n=t.current;if(!n)return;const r=new IntersectionObserver(e=>{let[t]=e;t.isIntersecting&&(a(!0),r.disconnect())},{threshold:e});return r.observe(n),()=>r.disconnect()},[e]),[t,n]}const Qv=()=>(0,$d.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",style:{flexShrink:0},children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"intelig",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$d.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#intelig)"})]}),Jv=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function Xv(){var e;const[t,n]=Gv(.08),[a,i]=Gv(.12),[o]=jl(),l=o.get("savings")?Number(o.get("savings")):null,s=null!==(e=o.get("supplier"))&&void 0!==e?e:null,[c,d]=(0,r.useState)(""),[u,p]=(0,r.useState)(""),[h,f]=(0,r.useState)("idle"),[m,g]=(0,r.useState)("");return(0,$d.jsxs)(Zx,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsx)(ev,{children:(0,$d.jsxs)(tv,{children:[(0,$d.jsxs)(nv,{children:[(0,$d.jsxs)(rv,{children:[(0,$d.jsx)(Qv,{}),(0,$d.jsx)(av,{}),(0,$d.jsx)(iv,{children:"Arvo Intelligence"}),(0,$d.jsx)(ov,{children:"Just nu"})]}),(0,$d.jsx)(lv,{children:"Arvo har detekterat n\xe5got"}),(0,$d.jsxs)(sv,{children:["Telia h\xf6jde priset f\xf6r ",(0,$d.jsx)("strong",{children:"8 av 14 bolag"})," i er bransch f\xf6rra m\xe5naden. Er n\xe4sta faktura tr\xe4ffar om"," ",(0,$d.jsx)("strong",{children:"12 dagar."})]}),(0,$d.jsx)(cv,{as:vl,to:"/testa-faktura",children:"Se vad det inneb\xe4r f\xf6r er \u2192"})]}),(0,$d.jsxs)(dv,{children:["Arvo m\xe4rkte det.",(0,$d.jsx)("br",{}),(0,$d.jsx)("em",{children:"Ni visste inte om det \xe4nnu."})]}),(0,$d.jsx)(uv,{children:"Ni ska inte beh\xf6va h\xe5lla koll. Det \xe4r Arvos jobb."}),(0,$d.jsxs)(pv,{children:[(0,$d.jsx)(hv,{as:"a",href:"#aktivera",children:"Aktivera Arvo Intelligence"}),(0,$d.jsx)(fv,{children:"1 995 kr/m\xe5n \xb7 Ingen bindningstid"})]})]})}),(0,$d.jsxs)(mv,{ref:t,children:[(0,$d.jsxs)(gv,{children:[(0,$d.jsx)(xv,{children:"Arvo Intelligence"}),(0,$d.jsx)(vv,{style:{marginBottom:0},children:"Det Arvo ser \u2014 som annars f\xf6rsvinner"})]}),(0,$d.jsx)(bv,{children:Yv.map((e,t)=>(0,$d.jsxs)(yv,{$i:t,$visible:n,children:[(0,$d.jsx)(kv,{children:e.context}),(0,$d.jsx)(jv,{}),(0,$d.jsx)(wv,{children:e.title}),(0,$d.jsx)(Sv,{children:e.body}),(0,$d.jsx)($v,{children:e.quote})]},t))})]}),(0,$d.jsx)(_v,{ref:a,children:(0,$d.jsxs)(Ev,{children:[(0,$d.jsx)(zv,{children:"Den enda finansiella partnern som..."}),(0,$d.jsxs)(Nv,{$i:0,$visible:i,children:[(0,$d.jsx)(Av,{children:"Regel 1"}),(0,$d.jsx)(Cv,{children:"Arvo vaktar er f\xf6r 1 995 kr/m\xe5n."})]}),(0,$d.jsx)(Fv,{}),(0,$d.jsxs)(Nv,{$i:1,$visible:i,children:[(0,$d.jsx)(Av,{children:"Regel 2"}),(0,$d.jsx)(Cv,{children:"Ni beh\xe5ller 80% av allt vi sparar er."})]})]})}),(0,$d.jsx)(Tv,{id:"aktivera",children:(0,$d.jsxs)(Pv,{children:["sent"!==h&&(0,$d.jsxs)(Dv,{children:["Arvo b\xf6rjar bevaka",(0,$d.jsx)("br",{}),"imorgon bitti."]}),"sent"===h?(0,$d.jsxs)(Vv,{children:[(0,$d.jsx)(Kv,{children:"\u2713"}),(0,$d.jsx)(Hv,{children:"Aktiverat."}),(0,$d.jsxs)(Wv,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$d.jsx)("br",{}),"Vi h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),c&&(0,$d.jsx)(qv,{children:c})]}):(0,$d.jsxs)($d.Fragment,{children:[null!=l?(0,$d.jsx)(Ov,{children:s?(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[Jv(l),"\xa0kr/\xe5r"]})," hos ",s,". Den besparingen v\xe4ntar."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[Jv(l),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})}):(0,$d.jsx)(Rv,{children:"E-post och bolagsnamn \u2014 klart p\xe5 30 sekunder."}),(0,$d.jsxs)(Iv,{onSubmit:async e=>{e.preventDefault();const t=c.trim();if(t&&"submitting"!==h){f("submitting"),g("");try{var n;const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==s&&void 0!==s?s:u.trim()||void 0,netSaving:null!==l&&void 0!==l?l:void 0,source:"intelligence-page"})});if(!e.ok)throw new Error(null!==(n=(await e.json().catch(()=>({}))).error)&&void 0!==n?n:"err");f("sent")}catch{g("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),f("error")}}},children:[(0,$d.jsx)(Bv,{type:"email",placeholder:"er@foretag.se",value:c,onChange:e=>d(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)(Bv,{type:"text",placeholder:"Bolagsnamn",value:u,onChange:e=>p(e.target.value),autoComplete:"organization"}),(0,$d.jsx)(Mv,{type:"submit",disabled:"submitting"===h,children:"submitting"===h?"\u2026":"Aktivera bevakningen \u2192"}),m&&(0,$d.jsx)(Uv,{children:m})]})]}),(0,$d.jsx)(Lv,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo startar bevakningen inom 24h"})]})}),(0,$d.jsx)(xu,{})]})}const Zv=jd`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`,eb=jd`
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`,tb=jd`
  from { stroke-dashoffset: 60; opacity: 0; }
  to   { stroke-dashoffset: 0;  opacity: 1; }
`,nb=jd`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,rb=jd`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(29,176,154,0); }
`,ab=vd.div`
  background: #060D0B;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
`,ib=vd.section`
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
`,ob=vd.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
`,lb=vd.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 32px;
  animation: ${Zv} 0.6s ease both;
`,sb=vd.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${rb} 2.4s ease-in-out infinite;
`,cb=vd.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #1DB09A;
`,db=vd.h1`
  font-size: clamp(30px, 6vw, 50px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #fff;
  text-align: center;
  margin: 0 0 16px;
  animation: ${Zv} 0.6s 0.08s ease both;
`,ub=vd.p`
  font-size: 15px;
  color: rgba(255,255,255,0.42);
  text-align: center;
  margin: 0 0 40px;
  line-height: 1.5;
  animation: ${Zv} 0.6s 0.14s ease both;
`,pb=vd.div`
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
`,hb=vd.span`
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1;
`,fb=vd.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.70);
  line-height: 1.55;

  strong {
    color: #1DB09A;
    font-weight: 700;
  }
`,mb=vd.div`
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
`,gb=vd.h2`
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 6px;
  line-height: 1.2;
`,xb=vd.p`
  font-size: 13px;
  color: rgba(255,255,255,0.40);
  margin: 0 0 24px;
  line-height: 1.5;
`,vb=vd.a`
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
`,bb=vd.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;

  ${e=>"google"===e.$provider&&md`
    background: #fff;
    color: #4285F4;
  `}
  ${e=>"outlook"===e.$provider&&md`
    background: #0078D4;
    color: #fff;
  `}
`,yb=vd.span`
  flex: 1;
`,kb=vd.span`
  color: rgba(255,255,255,0.25);
  font-size: 13px;
`,jb=vd.div`
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
`,wb=vd.form`
  display: flex;
  gap: 8px;
  align-items: stretch;
`,Sb=vd.input`
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
`,$b=vd.button`
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
`,_b=vd.p`
  font-size: 12px;
  color: #F87171;
  margin: 8px 0 0;
  line-height: 1.5;
`,Eb=vd.p`
  font-size: 11.5px;
  color: rgba(255,255,255,0.22);
  margin: 16px 0 0;
  line-height: 1.6;
  text-align: center;
`,zb=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 0 4px;
`,Nb=vd.div`
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
`,Ab=vd.h3`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 8px;
`,Cb=vd.p`
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  margin: 0 0 24px;
  line-height: 1.6;
`,Fb=vd.p`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
  margin: 0 0 24px;
  font-style: italic;
`,Tb=vd.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  margin: 0 0 10px;
  width: 100%;
  text-align: left;
`,Pb=vd.div`
  display: flex;
  gap: 0;
  margin-top: 40px;
  width: 100%;
  animation: ${Zv} 0.6s 0.4s ease both;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0;
  }
`,Db=vd.div`
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
`,Rb=vd.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 8px;
`,Lb=vd.p`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin: 0;
  line-height: 1.55;
`,Ob=vd.div`
  width: 100%;
  max-width: 460px;
  margin: 48px auto 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: ${Zv} 0.6s 0.5s ease both;
`,Ib=vd.p`
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
`,Bb=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function Mb(){return(0,$d.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:(0,$d.jsx)("polyline",{points:"5,14 11,20 23,8"})})}function Ub(){var e;const[t]=jl(),n=t.get("savings")?Number(t.get("savings")):null,a=null!==(e=t.get("supplier"))&&void 0!==e?e:null,i=t.get("score")?Number(t.get("score")):null,[o,l]=(0,r.useState)(""),[s,c]=(0,r.useState)("idle"),[d,u]=(0,r.useState)(""),p="/api/auth/gmail-init"+(o?`?email=${encodeURIComponent(o)}`:""),h="/api/auth/outlook-init"+(o?`?email=${encodeURIComponent(o)}`:"");return(0,$d.jsxs)(ab,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsx)(ib,{children:(0,$d.jsxs)(ob,{children:[(0,$d.jsxs)(lb,{children:[(0,$d.jsx)(sb,{}),(0,$d.jsx)(cb,{children:"Arvo Intelligence"})]}),"sent"!==s&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(db,{children:["Arvo b\xf6rjar bevaka er",(0,$d.jsx)("br",{}),"imorgon bitti."]}),(0,$d.jsx)(ub,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid"})]}),null!=n&&"sent"!==s&&(0,$d.jsxs)(pb,{children:[(0,$d.jsx)(hb,{children:"\u2192"}),(0,$d.jsx)(fb,{children:a?(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[Bb(n),"\xa0kr/\xe5r"]})," hos ",a,". Den besparingen v\xe4ntar."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[Bb(n),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})})]}),(0,$d.jsx)(mb,{children:"sent"===s?(0,$d.jsxs)(zb,{children:[(0,$d.jsx)(Nb,{children:(0,$d.jsx)(Mb,{})}),(0,$d.jsx)(Ab,{children:"Aktiverat."}),(0,$d.jsxs)(Cb,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$d.jsx)("br",{}),"Ni h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),(0,$d.jsx)(Fb,{children:o}),(0,$d.jsx)(Tb,{children:"Koppla er inkorg \u2014 Arvo hittar allt"}),(0,$d.jsxs)(vb,{href:p,style:{marginBottom:9},children:[(0,$d.jsx)(bb,{$provider:"google",children:"G"}),(0,$d.jsx)(yb,{children:"Koppla Gmail"}),(0,$d.jsx)(kb,{children:"\u2192"})]}),(0,$d.jsxs)(vb,{href:h,children:[(0,$d.jsx)(bb,{$provider:"outlook",children:"\u25a0"}),(0,$d.jsx)(yb,{children:"Koppla Outlook"}),(0,$d.jsx)(kb,{children:"\u2192"})]}),(0,$d.jsx)(Eb,{children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(gb,{children:"Koppla er inkorg \u2014 en g\xe5ng."}),(0,$d.jsx)(xb,{children:"Arvo s\xf6ker igenom era leverant\xf6rsfakturor och kontaktar er n\xe4r n\xe5got h\xe4nt."}),(0,$d.jsxs)(vb,{href:p,children:[(0,$d.jsx)(bb,{$provider:"google",children:"G"}),(0,$d.jsx)(yb,{children:"Koppla Gmail"}),(0,$d.jsx)(kb,{children:"\u2192"})]}),(0,$d.jsxs)(vb,{href:h,children:[(0,$d.jsx)(bb,{$provider:"outlook",children:"\u25a0"}),(0,$d.jsx)(yb,{children:"Koppla Outlook"}),(0,$d.jsx)(kb,{children:"\u2192"})]}),(0,$d.jsx)(jb,{children:(0,$d.jsx)("span",{children:"eller b\xf6rja med e-post"})}),(0,$d.jsxs)(wb,{onSubmit:async e=>{e.preventDefault();const t=o.trim();if(t&&"submitting"!==s){c("submitting"),u("");try{const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==a&&void 0!==a?a:void 0,netSaving:null!==n&&void 0!==n?n:void 0,diagScore:null!==i&&void 0!==i?i:void 0,source:"intelligence-page"})});if(!e.ok){var r;const t=await e.json().catch(()=>({}));throw new Error(null!==(r=t.error)&&void 0!==r?r:"server_error")}c("sent")}catch(l){u("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),c("error")}}},children:[(0,$d.jsx)(Sb,{type:"email",placeholder:"er@foretag.se",value:o,onChange:e=>l(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)($b,{type:"submit",disabled:"submitting"===s,children:"submitting"===s?"\u2026":"Aktivera \u2192"})]}),d&&(0,$d.jsx)(_b,{children:d}),(0,$d.jsx)(Eb,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})}),(0,$d.jsxs)(Pb,{children:[(0,$d.jsxs)(Db,{children:[(0,$d.jsx)(Rb,{children:"24h"}),(0,$d.jsx)(Lb,{children:"Arvo aktiverar er bevakning"})]}),(0,$d.jsxs)(Db,{children:[(0,$d.jsx)(Rb,{children:"Dag 7"}),(0,$d.jsx)(Lb,{children:"Ni f\xe5r er f\xf6rsta analys"})]}),(0,$d.jsxs)(Db,{children:[(0,$d.jsx)(Rb,{children:"L\xf6pande"}),(0,$d.jsx)(Lb,{children:"Arvo kontaktar er om n\xe5got h\xe4nt"})]})]})]})}),(0,$d.jsxs)(Ob,{children:[(0,$d.jsxs)(Ib,{children:[(0,$d.jsx)("strong",{children:"Regel 1:"})," Arvo vaktar er f\xf6r 1\xa0995\xa0kr/m\xe5n."]}),(0,$d.jsxs)(Ib,{children:[(0,$d.jsx)("strong",{children:"Regel 2:"})," Ni beh\xe5ller 80% av allt vi sparar er."]})]}),(0,$d.jsx)(xu,{})]})}const Vb=jd`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,Kb=jd`
  from { opacity: 0; }
  to   { opacity: 1; }
`,Hb=jd`
  0%,100% { opacity:0.3; transform:scale(0.8); }
  50%     { opacity:1;   transform:scale(1);   }
`,Wb=function(){return md`
  opacity: 0;
  animation: ${Vb} 0.75s ${arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`},qb=wd.font.mono,Yb=vd.div`
  min-height: 100vh;
  background: ${wd.dossier.bg};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
`,Gb=vd.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 10;
  height: calc(env(safe-area-inset-top, 0px) + 28px);
  background: linear-gradient(to bottom, rgba(5,11,9,0.94) 0%, rgba(5,11,9,0) 100%);
  pointer-events: none;
`,Qb=vd.div`
  background: ${wd.dossier.bg};
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
    background: ${wd.dossier.keyline};
    opacity: 0.85;
  }

  /* Aurora — px-bundna ljuskällor (procent-ellipser bandar på breda skärmar) */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${wd.dossier.aurora};
    pointer-events: none;
  }
`,Jb=vd.div`
  position: relative;
`,Xb=vd.div`
  font-family: ${qb};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-indent: 0.42em; /* kompenserar sista bokstavens spacing vid centrering */
  color: ${wd.dossier.tealBright};
  margin-bottom: 18px;
  ${Wb(0)}
`,Zb=vd.div`
  font-family: ${qb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.46);
  margin-bottom: 48px;
  ${Wb(.05)}
`,ey=vd.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(52px, 14vw, 76px);
  font-weight: 700;
  margin: 0 0 24px;
  line-height: 1.04;
  letter-spacing: -0.03em;

  /* Apple-metallisk text: vit som tonar mot teal-is i botten */
  color: ${wd.dossier.inkOnDark}; /* fallback när background-clip saknas */
  background: ${wd.dossier.metallicText};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  ${Wb(.1)}
`,ty=vd.div`
  font-size: 15px;
  color: rgba(255,255,255,0.58);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  ${Wb(.17)}
`,ny=vd.span`
  color: rgba(93,214,202,0.45);
`,ry=vd.div`
  font-family: ${qb};
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.36);
  margin-top: 32px;
  ${Wb(.24)}
`,ay=vd.div`
  background: ${wd.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 84px 28px 76px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 120px 28px 110px;
  }
`,iy=vd.div`
  font-family: ${qb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: ${wd.dossier.teal};
  margin-bottom: 40px;
`,oy=vd.div`
  margin-bottom: 44px;
  &:last-of-type { margin-bottom: 0; }
  ${e=>{let{$i:t}=e;return Wb(.08+.06*(null!==t&&void 0!==t?t:0))}}
`,ly=vd.div`
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(93,214,202,0.7), transparent);
  margin: 0 auto 30px;
`,sy=vd.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 6.4vw, 33px);
  font-weight: 500;
  color: ${wd.dossier.inkOnDark};
  line-height: 1.46;
  max-width: 560px;
  margin: 0 auto;
  letter-spacing: -0.012em;
`,cy=vd.div`
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
`,dy=vd.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`,uy=vd.span`
  font-size: 13px;
  color: rgba(255,255,255,0.48);
`,py=vd.span`
  font-family: ${qb};
  font-size: 12.5px;
  font-weight: 500;
  color: ${e=>{let{$highlight:t}=e;return t?wd.dossier.tealBright:"rgba(255,255,255,0.88)"}};
  text-align: right;
`,hy=vd.div`
  background: ${wd.dossier.bg};
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
`,fy=vd.div`
  position: relative;
  font-size: clamp(58px, 16.5vw, 92px);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;

  color: ${wd.dossier.teal};
  background: ${wd.dossier.numberGradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  ${Wb(.06)}
`,my=vd.span`
  font-size: 0.50em;
  font-weight: 600;
  vertical-align: 0.34em;
  margin-right: 0.10em;
`,gy=vd.div`
  max-width: 320px;
  margin: 40px auto 0;
  ${Wb(.14)}
`,xy=vd.div`
  position: relative;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(43,196,172,0.18) 0%, rgba(43,196,172,0.55) 50%, rgba(43,196,172,0.18) 100%);
`,vy=vd.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 11px; height: 11px;
  border-radius: 50%;
  background: ${wd.dossier.tealBright};
  box-shadow: ${wd.dossier.glow};
`,by=vd.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-family: ${qb};
  font-size: 11px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.52);
`,yy=vd.div`
  font-size: 13px;
  color: rgba(255,255,255,0.50);
  margin-top: 30px;
  ${Wb(.18)}
`,ky=vd.div`
  font-size: 12px;
  font-style: italic;
  color: rgba(255,255,255,0.38);
  margin-top: 10px;
`,jy=vd.div`
  background: ${wd.dossier.surface};
  padding: 56px 20px 48px;

  @media (min-width: 768px) {
    padding: 88px 28px 76px;
  }
`,wy=vd.div`
  font-family: ${qb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: rgba(14,26,23,0.52);
  margin-bottom: 26px;
  text-align: center;
`,Sy=vd.div`
  background: ${wd.dossier.card};
  border-radius: 24px;
  padding: 28px 24px 0;
  max-width: ${wd.dossier.column};
  margin: 0 auto 16px;
  overflow: hidden;
  box-shadow: 0 2px 24px rgba(11,22,18,0.07);
`,$y=vd.div`
  font-family: ${qb};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: ${wd.color.brand};
  margin-bottom: 10px;
`,_y=vd.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(14,26,23,0.06);

  &:last-of-type { border-bottom: none; }
`,Ey=vd.span`
  font-size: 13px;
  color: rgba(14,26,23,0.55);
`,zy=vd.span`
  font-family: ${qb};
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{$highlight:t}=e;return t?wd.color.brand:"rgba(14,26,23,0.84)"}};
  text-align: right;
`,Ny=vd.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: rgba(14,26,23,0.44);
  margin-top: 2px;
`,Ay=vd.div`
  background: ${wd.dossier.bgRaised};
  margin: 18px -24px 0;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  > div { text-align: right; }
`,Cy=vd.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.62);
`,Fy=vd.div`
  font-family: ${qb};
  font-size: 16px;
  font-weight: 600;
  color: ${wd.dossier.tealBright};
  letter-spacing: -0.01em;
`,Ty=vd.div`
  font-family: ${qb};
  font-size: 10.5px;
  color: rgba(255,255,255,0.46);
  margin-top: 3px;
`,Py=vd.div`
  font-size: 11px;
  color: rgba(14,26,23,0.46);
  margin: 12px 0 0;
  padding-bottom: 16px;
`,Dy=vd.div`
  background: ${wd.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 72px 24px 60px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 110px 24px 96px;
  }
`,Ry=vd.p`
  font-size: 12px;
  color: rgba(255,255,255,0.46);
  line-height: 1.80;
  max-width: 360px;
  margin: 0 auto 52px;
`,Ly=vd.div`
  margin-bottom: 10px;
`,Oy=vd.a`
  display: block;
  max-width: 400px;
  margin-inline: auto;
  background: ${wd.dossier.ctaGradient};
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  padding: 22px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  box-shadow: ${wd.dossier.ctaShadow};
  box-sizing: border-box;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:active {
    transform: scale(0.97);
    box-shadow: 0 8px 24px rgba(29,176,154,0.20);
  }
`,Iy=vd.div`
  font-size: 12px;
  color: rgba(255,255,255,0.50);
  margin-top: 14px;
`,By=vd.div`
  height: 36px;
`,My=vd.a`
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
`,Uy=vd.div`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin-top: 12px;
`,Vy=vd.div`
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 22px 28px calc(22px + env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${wd.dossier.bg};
`,Ky=vd.span`
  font-family: ${qb};
  font-size: 11px;
  color: rgba(255,255,255,0.32);
`,Hy=vd.span`
  font-family: ${qb};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
`,Wy=vd.div`
  min-height: 100vh;
  background: ${wd.dossier.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`,qy=vd.div`display: flex; gap: 8px;`,Yy=vd.div`
  width: 8px; height: 8px;
  border-radius: 50%;
  background: ${wd.dossier.teal};
  animation: ${Hb} 1.2s ${e=>{let{$i:t}=e;return.2*(null!==t&&void 0!==t?t:0)}}s ease-in-out infinite;
`,Gy=vd.div`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
`,Qy=vd.div`
  min-height: 100vh;
  background: ${wd.dossier.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
`,Jy=vd.div`
  font-size: 32px;
  margin-bottom: 20px;
  animation: ${Kb} 0.4s ease both;
`,Xy=vd.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
`,Zy=vd.p`
  font-size: 14px;
  color: rgba(255,255,255,0.40);
  line-height: 1.65;
  max-width: 300px;
  margin: 0 0 28px;
`,ek=vd.a`
  font-size: 15px;
  font-weight: 600;
  color: ${wd.dossier.teal};
  text-decoration: none;
  border-bottom: 1px solid rgba(29,176,154,0.3);
  padding-bottom: 2px;
`,tk=(e,t)=>500*Math.round((e+t)/2/500);function nk(e){if(!e)return"";return new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"})}function rk(){var e,t,n,a;const{token:i}=ho(),[o,l]=(0,r.useState)("loading"),[s,c]=(0,r.useState)(null),[d,u]=(0,r.useState)(!1);(0,r.useEffect)(()=>{i?fetch(`/api/prospect?token=${encodeURIComponent(i)}`).then(e=>e.json()).then(e=>{e.ok?(c(e.prospect),l("ready")):l("error")}).catch(()=>l("error")):l("error")},[i]);const p=e=>{d||(u(!0),fetch(`/api/prospect?token=${encodeURIComponent(i)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})}).catch(()=>{}))};if("loading"===o)return(0,$d.jsxs)(Wy,{children:[(0,$d.jsx)(qy,{children:[0,1,2].map(e=>(0,$d.jsx)(Yy,{$i:e},e))}),(0,$d.jsx)(Gy,{children:"H\xe4mtar er analys\u2026"})]});if("error"===o)return(0,$d.jsxs)(Qy,{children:[(0,$d.jsx)(Jy,{children:"\ud83d\udd12"}),(0,$d.jsx)(Xy,{children:"Analysen hittades inte"}),(0,$d.jsx)(Zy,{children:"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig. Analysera er faktura direkt \u2014 det tar 2 minuter."}),(0,$d.jsx)(ek,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const{companyName:h,industry:f,employees:m,estimates:g,generatedAt:x}=s,v=null!==(e=null===g||void 0===g?void 0:g.categories)&&void 0!==e?e:[],b=(null===g||void 0===g?void 0:g.hasEstimates)&&((null===g||void 0===g?void 0:g.totalSavingLow)>0||v.length>0),y=null===g||void 0===g?void 0:g.mxPlatform,k=null===g||void 0===g?void 0:g.mxSince,j=null===g||void 0===g?void 0:g.domainRegistered,w=null===g||void 0===g?void 0:g.foundedYear,S=null!==(t=null===g||void 0===g?void 0:g.findings)&&void 0!==t?t:[],$=(_=k)?Math.round((Date.now()-new Date(_).getTime())/2630016e3):0;var _;const E=null!==(n=Uh[y])&&void 0!==n?n:y,z=S.length>0,N=[];S.forEach(e=>N.push({text:e,key:e})),!z&&k?N.push({text:`${E}-konfiguration of\xf6r\xe4ndrad sedan ${Mh(k)} \u2014 ${$} m\xe5nader`,key:"mxSince"}):!z&&y&&N.push({text:`${E} identifierat f\xf6r er dom\xe4n \xb7 ${m} licenser`,key:"mxPlatform"});const A=N.length>0,C=z?"IDENTIFIERAT FYND":"INFRASTRUKTURANALYS",F=z&&(y||j||k),T=null!==(a=null===g||void 0===g?void 0:g.totalSavingCentral)&&void 0!==a?a:b?tk(g.totalSavingLow,g.totalSavingHigh):null,P=v.map(e=>`${e.estimatedSims} ${"m365"===e.category?"Microsoft 365-licenser":"mobilabonnemang"}`).join(" + ");return(0,$d.jsxs)(Yb,{children:[(0,$d.jsx)(Gb,{}),(0,$d.jsx)(Qb,{children:(0,$d.jsxs)(Jb,{children:[(0,$d.jsx)(Xb,{children:"ARVO"}),(0,$d.jsx)(Zb,{children:"Konfidentiell analys"}),(0,$d.jsx)(ey,{children:h}),(0,$d.jsxs)(ty,{children:[f&&(0,$d.jsx)("span",{children:f}),f&&m&&(0,$d.jsx)(ny,{children:"\xb7"}),m&&(0,$d.jsxs)("span",{children:[m," anst\xe4llda"]}),w&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(ny,{children:"\xb7"}),(0,$d.jsxs)("span",{children:["Grundat ",w]})]})]}),(0,$d.jsx)(ry,{children:nk(x)})]})}),A&&(0,$d.jsxs)(ay,{children:[(0,$d.jsx)(iy,{children:C}),N.map((e,t)=>(0,$d.jsxs)(oy,{$i:t,children:[t>0&&(0,$d.jsx)(ly,{}),(0,$d.jsx)(sy,{children:e.text})]},e.key)),F&&(0,$d.jsxs)(cy,{children:[y&&(0,$d.jsxs)(dy,{children:[(0,$d.jsx)(uy,{children:"E-postplattform"}),(0,$d.jsx)(py,{children:E})]}),k&&(0,$d.jsxs)(dy,{children:[(0,$d.jsx)(uy,{children:"Konfiguration sedan"}),(0,$d.jsxs)(py,{$highlight:!0,children:[Mh(k)," \u2014 ",$," m\xe5n"]})]}),j&&(0,$d.jsxs)(dy,{children:[(0,$d.jsx)(uy,{children:"Dom\xe4n registrerad"}),(0,$d.jsx)(py,{children:Mh(j)})]})]})]}),b&&(0,$d.jsxs)(hy,{children:[(0,$d.jsx)(iy,{children:"Sannolik kostnadspremie"}),(0,$d.jsxs)(fy,{children:[(0,$d.jsx)(my,{children:"\u2248"}),Ih(T)," ",(0,$d.jsx)("span",{style:{fontSize:"0.42em",letterSpacing:"0em",fontWeight:700},children:"kr/\xe5r"})]}),(0,$d.jsxs)(gy,{children:[(0,$d.jsx)(xy,{children:(0,$d.jsx)(vy,{style:{left:`${Math.min(88,Math.max(12,g.totalSavingHigh>g.totalSavingLow?(T-g.totalSavingLow)/(g.totalSavingHigh-g.totalSavingLow)*100:50))}%`}})}),(0,$d.jsxs)(by,{children:[(0,$d.jsx)("span",{children:Ih(g.totalSavingLow)}),(0,$d.jsxs)("span",{children:[Ih(g.totalSavingHigh)," kr/\xe5r"]})]})]}),P&&(0,$d.jsxs)(yy,{children:["Baserat p\xe5 ",P," mot verifierade listpriser"]}),(0,$d.jsx)(ky,{children:"Er faktiska avtalskostnad ser vi inte f\xf6rr\xe4n ni delar er faktura"})]}),v.length>0&&(0,$d.jsxs)(jy,{children:[(0,$d.jsx)(wy,{children:"Kostnadsanalys per kategori"}),v.map((e,t)=>{var n;const r="m365"===e.category?"licens":"abonnemang",a=null!==(n=e.savingCentral)&&void 0!==n?n:tk(e.savingLow,e.savingHigh);return(0,$d.jsxs)(Sy,{children:[(0,$d.jsx)($y,{children:e.label}),(0,$d.jsxs)(_y,{children:[(0,$d.jsx)(Ey,{children:"m365"===e.category?"Uppskattade licenser":"Uppskattade abonnemang"}),(0,$d.jsxs)(zy,{children:[e.estimatedSims," st"]})]}),(0,$d.jsxs)(_y,{children:[(0,$d.jsx)(Ey,{children:"Typisk marknadskostnad"}),(0,$d.jsxs)(zy,{children:[Ih(e.typicalLow),"\u2013",Ih(e.typicalHigh)," kr/\xe5r",(0,$d.jsx)(Ny,{children:"live"===e.source?`median av verifierade fakturor: ${e.pricePerSim.typical} kr/m\xe5n per ${r} \xb1 15 %`:`ordinarie listpris ${e.pricePerSim.typical} kr/m\xe5n per ${r} \xb1 15 %`})]})]}),(0,$d.jsxs)(_y,{children:[(0,$d.jsx)(Ey,{children:"Arvo-pris, verifierat listpris"}),(0,$d.jsxs)(zy,{$highlight:!0,children:[Ih(e.arvoAnnual)," kr/\xe5r",(0,$d.jsxs)(Ny,{children:[e.pricePerSim.arvo," kr/m\xe5n per ",r]})]})]}),(0,$d.jsx)(Py,{children:e.sourceNote}),(0,$d.jsxs)(Ay,{children:[(0,$d.jsx)(Cy,{children:"Sannolik premie"}),(0,$d.jsxs)("div",{children:[(0,$d.jsxs)(Fy,{children:["\u2248 ",Ih(a)," kr/\xe5r"]}),(0,$d.jsxs)(Ty,{children:["intervall ",Ih(e.savingLow),"\u2013",Ih(e.savingHigh)]})]})]})]},t)})]}),(0,$d.jsxs)(Dy,{children:[(0,$d.jsxs)(Ry,{children:["Arvo har analyserat den publika DNS-konfigurationen f\xf6r ",h,"s dom\xe4n. Ingen data har inh\xe4mtats fr\xe5n er eller era leverant\xf6rer utan ert tillst\xe5nd."]}),(0,$d.jsxs)(Ly,{children:[(0,$d.jsx)(Oy,{href:"/testa-faktura",onClick:()=>p("upload"),children:"Se er exakta premie"}),(0,$d.jsx)(Iy,{children:"Ladda upp en faktura \xb7 Kostnadsfritt \xb7 2 minuter \xb7 Ingen registrering"})]}),(0,$d.jsx)(By,{}),(0,$d.jsx)(My,{href:"/intelligence#aktivera",onClick:()=>p("activate"),children:"Eller l\xe5t Arvo bevaka er l\xf6pande \u2014 Arvo Intelligence, 1\xa0995 kr/m\xe5n \u2192"}),(0,$d.jsx)(Uy,{children:"Ingen bindningstid \xb7 Bevakningen b\xf6rjar inom 24 timmar"})]}),(0,$d.jsxs)(Vy,{children:[(0,$d.jsx)(Ky,{children:"arvoflow.se"}),(0,$d.jsx)(Hy,{children:"Arvo Intelligence"})]})]})}"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const ak=()=>{const{pathname:e}=so();return(0,r.useEffect)(()=>{window.scrollTo(0,0)},[e]),null},ik=()=>(0,$d.jsxs)(dd,{theme:wd,children:[(0,$d.jsx)(Sd,{}),(0,$d.jsx)(gl,{basename:"/flow",children:(0,$d.jsxs)(Nd,{children:[(0,$d.jsx)(ak,{}),(0,$d.jsxs)(Ro,{children:[(0,$d.jsx)(Po,{path:"/",element:(0,$d.jsx)(Ap,{})}),(0,$d.jsx)(Po,{path:"/connect",element:(0,$d.jsx)(rh,{})}),(0,$d.jsx)(Po,{path:"/bias",element:(0,$d.jsx)(bh,{})}),(0,$d.jsx)(Po,{path:"/villkor",element:(0,$d.jsx)(Dh,{})}),(0,$d.jsx)(Po,{path:"/integritet",element:(0,$d.jsx)(Rh,{})}),(0,$d.jsx)(Po,{path:"/cookies",element:(0,$d.jsx)(Lh,{})}),(0,$d.jsx)(Po,{path:"/testa-faktura",element:(0,$d.jsx)(em,{})}),(0,$d.jsx)(Po,{path:"/portfolio",element:(0,$d.jsx)(og,{})}),(0,$d.jsx)(Po,{path:"/admin",element:(0,$d.jsx)(Ng,{})}),(0,$d.jsx)(Po,{path:"/utfall",element:(0,$d.jsx)(Mg,{})}),(0,$d.jsx)(Po,{path:"/briefing/:token",element:(0,$d.jsx)(Yx,{})}),(0,$d.jsx)(Po,{path:"/intelligence",element:(0,$d.jsx)(Xv,{})}),(0,$d.jsx)(Po,{path:"/aktivera",element:(0,$d.jsx)(Ub,{})}),(0,$d.jsx)(Po,{path:"/prospect/:token",element:(0,$d.jsx)(rk,{})}),(0,$d.jsx)(Po,{path:"*",element:(0,$d.jsx)(To,{to:"/",replace:!0})})]})]})})]});!function(){var e;const t={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SENTRY_DSN;t&&ni({dsn:t,environment:null!==(e="production")?e:"production",release:{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_VERSION,tracesSampleRate:.1,beforeSend(e){var t,n,r,a;const i=null!==(t=null===(n=e.exception)||void 0===n||null===(r=n.values)||void 0===r||null===(a=r[0])||void 0===a?void 0:a.value)&&void 0!==t?t:"";return i.includes("Network request failed")||i.includes("Load failed")?null:e}})}();(0,i.createRoot)(document.getElementById("root")).render((0,$d.jsx)(ik,{}))})();
//# sourceMappingURL=main.4087c079.js.map