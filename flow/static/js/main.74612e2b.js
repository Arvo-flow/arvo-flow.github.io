/*! For license information please see main.74612e2b.js.LICENSE.txt */
(()=>{"use strict";var e={4(e,t,r){var n=r(853),a=r(43),i=r(950);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function l(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(r=t.return),e=t.return}while(e)}return 3===t.tag?r:null}function c(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function d(e){if(31===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function u(e){if(l(e)!==e)throw Error(o(188))}function p(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=p(e)))return t;e=e.sibling}return null}var h=Object.assign,m=Symbol.for("react.element"),f=Symbol.for("react.transitional.element"),g=Symbol.for("react.portal"),x=Symbol.for("react.fragment"),v=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),y=Symbol.for("react.consumer"),k=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),S=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),z=Symbol.for("react.lazy");Symbol.for("react.scope");var _=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var N=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var E=Symbol.iterator;function A(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=E&&e[E]||e["@@iterator"])?e:null}var C=Symbol.for("react.client.reference");function D(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===C?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case x:return"Fragment";case b:return"Profiler";case v:return"StrictMode";case w:return"Suspense";case S:return"SuspenseList";case _:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case g:return"Portal";case k:return e.displayName||"Context";case y:return(e._context.displayName||"Context")+".Consumer";case j:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case $:return null!==(t=e.displayName||null)?t:D(e.type)||"Memo";case z:t=e._payload,e=e._init;try{return D(e(t))}catch(ql){}}return null}var F=Array.isArray,T=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,O=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P={pending:!1,data:null,method:null,action:null},L=[],R=-1;function I(e){return{current:e}}function M(e){0>R||(e.current=L[R],L[R]=null,R--)}function B(e,t){R++,L[R]=e.current,e.current=t}var V,U,K=I(null),H=I(null),W=I(null),q=I(null);function Y(e,t){switch(B(W,t),B(H,e),B(K,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?vu(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=bu(t=vu(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}M(K),B(K,e)}function G(){M(K),M(H),M(W)}function Q(e){null!==e.memoizedState&&B(q,e);var t=K.current,r=bu(t,e.type);t!==r&&(B(H,e),B(K,r))}function J(e){H.current===e&&(M(K),M(H)),q.current===e&&(M(q),up._currentValue=P)}function X(e){if(void 0===V)try{throw Error()}catch(ql){var t=ql.stack.trim().match(/\n( *(at )?)/);V=t&&t[1]||"",U=-1<ql.stack.indexOf("\n    at")?" (<anonymous>)":-1<ql.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+V+e+U}var Z=!1;function ee(e,t){if(!e||Z)return"";Z=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var r=function(){throw Error()};if(Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(r,[])}catch(ql){var n=ql}Reflect.construct(e,[],r)}else{try{r.call()}catch(a){n=a}e.call(r.prototype)}}else{try{throw Error()}catch(i){n=i}(r=e())&&"function"===typeof r.catch&&r.catch(function(){})}}catch(o){if(o&&n&&"string"===typeof o.stack)return[o.stack,n.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=n.DetermineComponentFrameRoot(),o=i[0],s=i[1];if(o&&s){var l=o.split("\n"),c=s.split("\n");for(a=n=0;n<l.length&&!l[n].includes("DetermineComponentFrameRoot");)n++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(n===l.length||a===c.length)for(n=l.length-1,a=c.length-1;1<=n&&0<=a&&l[n]!==c[a];)a--;for(;1<=n&&0<=a;n--,a--)if(l[n]!==c[a]){if(1!==n||1!==a)do{if(n--,0>--a||l[n]!==c[a]){var d="\n"+l[n].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}}while(1<=n&&0<=a);break}}}finally{Z=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?X(r):""}function te(e,t){switch(e.tag){case 26:case 27:case 5:return X(e.type);case 16:return X("Lazy");case 13:return e.child!==t&&null!==t?X("Suspense Fallback"):X("Suspense");case 19:return X("SuspenseList");case 0:case 15:return ee(e.type,!1);case 11:return ee(e.type.render,!1);case 1:return ee(e.type,!0);case 31:return X("Activity");default:return""}}function re(e){try{var t="",r=null;do{t+=te(e,r),r=e,e=e.return}while(e);return t}catch(ql){return"\nError generating stack: "+ql.message+"\n"+ql.stack}}var ne=Object.prototype.hasOwnProperty,ae=n.unstable_scheduleCallback,ie=n.unstable_cancelCallback,oe=n.unstable_shouldYield,se=n.unstable_requestPaint,le=n.unstable_now,ce=n.unstable_getCurrentPriorityLevel,de=n.unstable_ImmediatePriority,ue=n.unstable_UserBlockingPriority,pe=n.unstable_NormalPriority,he=n.unstable_LowPriority,me=n.unstable_IdlePriority,fe=n.log,ge=n.unstable_setDisableYieldValue,xe=null,ve=null;function be(e){if("function"===typeof fe&&ge(e),ve&&"function"===typeof ve.setStrictMode)try{ve.setStrictMode(xe,e)}catch(t){}}var ye=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ke(e)/je|0)|0},ke=Math.log,je=Math.LN2;var we=256,Se=262144,$e=4194304;function ze(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return 261888&e;case 262144:case 524288:case 1048576:case 2097152:return 3932160&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function _e(e,t,r){var n=e.pendingLanes;if(0===n)return 0;var a=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=134217727&n;return 0!==s?0!==(n=s&~i)?a=ze(n):0!==(o&=s)?a=ze(o):r||0!==(r=s&~e)&&(a=ze(r)):0!==(s=n&~i)?a=ze(s):0!==o?a=ze(o):r||0!==(r=n&~e)&&(a=ze(r)),0===a?0:0!==t&&t!==a&&0===(t&i)&&((i=a&-a)>=(r=t&-t)||32===i&&0!==(4194048&r))?t:a}function Ne(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function Ee(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function Ae(){var e=$e;return 0===(62914560&($e<<=1))&&($e=4194304),e}function Ce(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function De(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Fe(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-ye(t);e.entangledLanes|=t,e.entanglements[n]=1073741824|e.entanglements[n]|261930&r}function Te(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-ye(r),a=1<<n;a&t|e[n]&t&&(e[n]|=t),r&=~a}}function Oe(e,t){var r=t&-t;return 0!==((r=0!==(42&r)?1:Pe(r))&(e.suspendedLanes|t))?0:r}function Pe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Le(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function Re(){var e=O.p;return 0!==e?e:void 0===(e=window.event)?32:_p(e.type)}function Ie(e,t){var r=O.p;try{return O.p=e,t()}finally{O.p=r}}var Me=Math.random().toString(36).slice(2),Be="__reactFiber$"+Me,Ve="__reactProps$"+Me,Ue="__reactContainer$"+Me,Ke="__reactEvents$"+Me,He="__reactListeners$"+Me,We="__reactHandles$"+Me,qe="__reactResources$"+Me,Ye="__reactMarker$"+Me;function Ge(e){delete e[Be],delete e[Ve],delete e[Ke],delete e[He],delete e[We]}function Qe(e){var t=e[Be];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Ue]||r[Be]){if(r=t.alternate,null!==t.child||null!==r&&null!==r.child)for(e=Lu(e);null!==e;){if(r=e[Be])return r;e=Lu(e)}return t}r=(e=r).parentNode}return null}function Je(e){if(e=e[Be]||e[Ue]){var t=e.tag;if(5===t||6===t||13===t||31===t||26===t||27===t||3===t)return e}return null}function Xe(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(o(33))}function Ze(e){var t=e[qe];return t||(t=e[qe]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function et(e){e[Ye]=!0}var tt=new Set,rt={};function nt(e,t){at(e,t),at(e+"Capture",t)}function at(e,t){for(rt[e]=t,e=0;e<t.length;e++)tt.add(t[e])}var it=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ot={},st={};function lt(e,t,r){if(a=t,ne.call(st,a)||!ne.call(ot,a)&&(it.test(a)?st[a]=!0:(ot[a]=!0,0)))if(null===r)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var n=t.toLowerCase().slice(0,5);if("data-"!==n&&"aria-"!==n)return void e.removeAttribute(t)}e.setAttribute(t,""+r)}var a}function ct(e,t,r){if(null===r)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+r)}}function dt(e,t,r,n){if(null===n)e.removeAttribute(r);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(r)}e.setAttributeNS(t,r,""+n)}}function ut(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function pt(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function ht(e){if(!e._valueTracker){var t=pt(e)?"checked":"value";e._valueTracker=function(e,t,r){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){r=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e,t,""+e[t])}}function mt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=pt(e)?e.checked?"true":"false":e.value),(e=n)!==r&&(t.setValue(e),!0)}function ft(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var gt=/[\n"\\]/g;function xt(e){return e.replace(gt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vt(e,t,r,n,a,i,o,s){e.name="",null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o?e.type=o:e.removeAttribute("type"),null!=t?"number"===o?(0===t&&""===e.value||e.value!=t)&&(e.value=""+ut(t)):e.value!==""+ut(t)&&(e.value=""+ut(t)):"submit"!==o&&"reset"!==o||e.removeAttribute("value"),null!=t?yt(e,o,ut(t)):null!=r?yt(e,o,ut(r)):null!=n&&e.removeAttribute("value"),null==a&&null!=i&&(e.defaultChecked=!!i),null!=a&&(e.checked=a&&"function"!==typeof a&&"symbol"!==typeof a),null!=s&&"function"!==typeof s&&"symbol"!==typeof s&&"boolean"!==typeof s?e.name=""+ut(s):e.removeAttribute("name")}function bt(e,t,r,n,a,i,o,s){if(null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.type=i),null!=t||null!=r){if(!("submit"!==i&&"reset"!==i||void 0!==t&&null!==t))return void ht(e);r=null!=r?""+ut(r):"",t=null!=t?""+ut(t):r,s||t===e.value||(e.value=t),e.defaultValue=t}n="function"!==typeof(n=null!=n?n:a)&&"symbol"!==typeof n&&!!n,e.checked=s?e.checked:!!n,e.defaultChecked=!!n,null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o&&(e.name=o),ht(e)}function yt(e,t,r){"number"===t&&ft(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function kt(e,t,r,n){if(e=e.options,t){t={};for(var a=0;a<r.length;a++)t["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=t.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&n&&(e[r].defaultSelected=!0)}else{for(r=""+ut(r),t=null,a=0;a<e.length;a++){if(e[a].value===r)return e[a].selected=!0,void(n&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function jt(e,t,r){null==t||((t=""+ut(t))!==e.value&&(e.value=t),null!=r)?e.defaultValue=null!=r?""+ut(r):"":e.defaultValue!==t&&(e.defaultValue=t)}function wt(e,t,r,n){if(null==t){if(null!=n){if(null!=r)throw Error(o(92));if(F(n)){if(1<n.length)throw Error(o(93));n=n[0]}r=n}null==r&&(r=""),t=r}r=ut(t),e.defaultValue=r,(n=e.textContent)===r&&""!==n&&null!==n&&(e.value=n),ht(e)}function St(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&3===r.nodeType)return void(r.nodeValue=t)}e.textContent=t}var $t=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function zt(e,t,r){var n=0===t.indexOf("--");null==r||"boolean"===typeof r||""===r?n?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":n?e.setProperty(t,r):"number"!==typeof r||0===r||$t.has(t)?"float"===t?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function _t(e,t,r){if(null!=t&&"object"!==typeof t)throw Error(o(62));if(e=e.style,null!=r){for(var n in r)!r.hasOwnProperty(n)||null!=t&&t.hasOwnProperty(n)||(0===n.indexOf("--")?e.setProperty(n,""):"float"===n?e.cssFloat="":e[n]="");for(var a in t)n=t[a],t.hasOwnProperty(a)&&r[a]!==n&&zt(e,a,n)}else for(var i in t)t.hasOwnProperty(i)&&zt(e,i,t[i])}function Nt(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Et=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),At=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ct(e){return At.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Dt(){}var Ft=null;function Tt(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Ot=null,Pt=null;function Lt(e){var t=Je(e);if(t&&(e=t.stateNode)){var r=e[Ve]||null;e:switch(e=t.stateNode,t.type){case"input":if(vt(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,"radio"===r.type&&null!=t){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+xt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var a=n[Ve]||null;if(!a)throw Error(o(90));vt(n,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<r.length;t++)(n=r[t]).form===e.form&&mt(n)}break e;case"textarea":jt(e,r.value,r.defaultValue);break e;case"select":null!=(t=r.value)&&kt(e,!!r.multiple,t,!1)}}}var Rt=!1;function It(e,t,r){if(Rt)return e(t,r);Rt=!0;try{return e(t)}finally{if(Rt=!1,(null!==Ot||null!==Pt)&&(ed(),Ot&&(t=Ot,e=Pt,Pt=Ot=null,Lt(t),e)))for(t=0;t<e.length;t++)Lt(e[t])}}function Mt(e,t){var r=e.stateNode;if(null===r)return null;var n=r[Ve]||null;if(null===n)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(n=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!n;break e;default:e=!1}if(e)return null;if(r&&"function"!==typeof r)throw Error(o(231,t,typeof r));return r}var Bt=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Vt=!1;if(Bt)try{var Ut={};Object.defineProperty(Ut,"passive",{get:function(){Vt=!0}}),window.addEventListener("test",Ut,Ut),window.removeEventListener("test",Ut,Ut)}catch(Xp){Vt=!1}var Kt=null,Ht=null,Wt=null;function qt(){if(Wt)return Wt;var e,t,r=Ht,n=r.length,a="value"in Kt?Kt.value:Kt.textContent,i=a.length;for(e=0;e<n&&r[e]===a[e];e++);var o=n-e;for(t=1;t<=o&&r[n-t]===a[i-t];t++);return Wt=a.slice(e,1<t?1-t:void 0)}function Yt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Gt(){return!0}function Qt(){return!1}function Jt(e){function t(t,r,n,a,i){for(var o in this._reactName=t,this._targetInst=n,this.type=r,this.nativeEvent=a,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(a):a[o]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?Gt:Qt,this.isPropagationStopped=Qt,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Gt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Gt)},persist:function(){},isPersistent:Gt}),t}var Xt,Zt,er,tr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rr=Jt(tr),nr=h({},tr,{view:0,detail:0}),ar=Jt(nr),ir=h({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gr,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==er&&(er&&"mousemove"===e.type?(Xt=e.screenX-er.screenX,Zt=e.screenY-er.screenY):Zt=Xt=0,er=e),Xt)},movementY:function(e){return"movementY"in e?e.movementY:Zt}}),or=Jt(ir),sr=Jt(h({},ir,{dataTransfer:0})),lr=Jt(h({},nr,{relatedTarget:0})),cr=Jt(h({},tr,{animationName:0,elapsedTime:0,pseudoElement:0})),dr=Jt(h({},tr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),ur=Jt(h({},tr,{data:0})),pr={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hr={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mr={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=mr[e])&&!!t[e]}function gr(){return fr}var xr=Jt(h({},nr,{key:function(e){if(e.key){var t=pr[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Yt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?hr[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gr,charCode:function(e){return"keypress"===e.type?Yt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Yt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),vr=Jt(h({},ir,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),br=Jt(h({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gr})),yr=Jt(h({},tr,{propertyName:0,elapsedTime:0,pseudoElement:0})),kr=Jt(h({},ir,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),jr=Jt(h({},tr,{newState:0,oldState:0})),wr=[9,13,27,32],Sr=Bt&&"CompositionEvent"in window,$r=null;Bt&&"documentMode"in document&&($r=document.documentMode);var zr=Bt&&"TextEvent"in window&&!$r,_r=Bt&&(!Sr||$r&&8<$r&&11>=$r),Nr=String.fromCharCode(32),Er=!1;function Ar(e,t){switch(e){case"keyup":return-1!==wr.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Cr(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Dr=!1;var Fr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Fr[e.type]:"textarea"===t}function Or(e,t,r,n){Ot?Pt?Pt.push(n):Pt=[n]:Ot=n,0<(t=au(t,"onChange")).length&&(r=new rr("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Pr=null,Lr=null;function Rr(e){Qd(e,0)}function Ir(e){if(mt(Xe(e)))return e}function Mr(e,t){if("change"===e)return t}var Br=!1;if(Bt){var Vr;if(Bt){var Ur="oninput"in document;if(!Ur){var Kr=document.createElement("div");Kr.setAttribute("oninput","return;"),Ur="function"===typeof Kr.oninput}Vr=Ur}else Vr=!1;Br=Vr&&(!document.documentMode||9<document.documentMode)}function Hr(){Pr&&(Pr.detachEvent("onpropertychange",Wr),Lr=Pr=null)}function Wr(e){if("value"===e.propertyName&&Ir(Lr)){var t=[];Or(t,Lr,e,Tt(e)),It(Rr,t)}}function qr(e,t,r){"focusin"===e?(Hr(),Lr=r,(Pr=t).attachEvent("onpropertychange",Wr)):"focusout"===e&&Hr()}function Yr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Ir(Lr)}function Gr(e,t){if("click"===e)return Ir(t)}function Qr(e,t){if("input"===e||"change"===e)return Ir(t)}var Jr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function Xr(e,t){if(Jr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var a=r[n];if(!ne.call(t,a)||!Jr(e[a],t[a]))return!1}return!0}function Zr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function en(e,t){var r,n=Zr(e);for(e=0;n;){if(3===n.nodeType){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Zr(n)}}function tn(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?tn(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function rn(e){for(var t=ft((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var r="string"===typeof t.contentWindow.location.href}catch(n){r=!1}if(!r)break;t=ft((e=t.contentWindow).document)}return t}function nn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var an=Bt&&"documentMode"in document&&11>=document.documentMode,on=null,sn=null,ln=null,cn=!1;function dn(e,t,r){var n=r.window===r?r.document:9===r.nodeType?r:r.ownerDocument;cn||null==on||on!==ft(n)||("selectionStart"in(n=on)&&nn(n)?n={start:n.selectionStart,end:n.selectionEnd}:n={anchorNode:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset},ln&&Xr(ln,n)||(ln=n,0<(n=au(sn,"onSelect")).length&&(t=new rr("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=on)))}function un(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var pn={animationend:un("Animation","AnimationEnd"),animationiteration:un("Animation","AnimationIteration"),animationstart:un("Animation","AnimationStart"),transitionrun:un("Transition","TransitionRun"),transitionstart:un("Transition","TransitionStart"),transitioncancel:un("Transition","TransitionCancel"),transitionend:un("Transition","TransitionEnd")},hn={},mn={};function fn(e){if(hn[e])return hn[e];if(!pn[e])return e;var t,r=pn[e];for(t in r)if(r.hasOwnProperty(t)&&t in mn)return hn[e]=r[t];return e}Bt&&(mn=document.createElement("div").style,"AnimationEvent"in window||(delete pn.animationend.animation,delete pn.animationiteration.animation,delete pn.animationstart.animation),"TransitionEvent"in window||delete pn.transitionend.transition);var gn=fn("animationend"),xn=fn("animationiteration"),vn=fn("animationstart"),bn=fn("transitionrun"),yn=fn("transitionstart"),kn=fn("transitioncancel"),jn=fn("transitionend"),wn=new Map,Sn="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $n(e,t){wn.set(e,t),nt(t,[e])}Sn.push("scrollEnd");var zn="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},_n=[],Nn=0,En=0;function An(){for(var e=Nn,t=En=Nn=0;t<e;){var r=_n[t];_n[t++]=null;var n=_n[t];_n[t++]=null;var a=_n[t];_n[t++]=null;var i=_n[t];if(_n[t++]=null,null!==n&&null!==a){var o=n.pending;null===o?a.next=a:(a.next=o.next,o.next=a),n.pending=a}0!==i&&Tn(r,a,i)}}function Cn(e,t,r,n){_n[Nn++]=e,_n[Nn++]=t,_n[Nn++]=r,_n[Nn++]=n,En|=n,e.lanes|=n,null!==(e=e.alternate)&&(e.lanes|=n)}function Dn(e,t,r,n){return Cn(e,t,r,n),On(e)}function Fn(e,t){return Cn(e,null,null,t),On(e)}function Tn(e,t,r){e.lanes|=r;var n=e.alternate;null!==n&&(n.lanes|=r);for(var a=!1,i=e.return;null!==i;)i.childLanes|=r,null!==(n=i.alternate)&&(n.childLanes|=r),22===i.tag&&(null===(e=i.stateNode)||1&e._visibility||(a=!0)),e=i,i=i.return;return 3===e.tag?(i=e.stateNode,a&&null!==t&&(a=31-ye(r),null===(n=(e=i.hiddenUpdates)[a])?e[a]=[t]:n.push(t),t.lane=536870912|r),i):null}function On(e){if(50<Hc)throw Hc=0,Wc=null,Error(o(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Pn={};function Ln(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rn(e,t,r,n){return new Ln(e,t,r,n)}function In(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Mn(e,t){var r=e.alternate;return null===r?((r=Rn(e.tag,t,e.key,e.mode)).elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=65011712&e.flags,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Bn(e,t){e.flags&=65011714;var r=e.alternate;return null===r?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Vn(e,t,r,n,a,i){var s=0;if(n=e,"function"===typeof e)In(e)&&(s=1);else if("string"===typeof e)s=function(e,t,r){if(1===r||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,r,K.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case _:return(e=Rn(31,r,t,a)).elementType=_,e.lanes=i,e;case x:return Un(r.children,a,i,t);case v:s=8,a|=24;break;case b:return(e=Rn(12,r,t,2|a)).elementType=b,e.lanes=i,e;case w:return(e=Rn(13,r,t,a)).elementType=w,e.lanes=i,e;case S:return(e=Rn(19,r,t,a)).elementType=S,e.lanes=i,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case k:s=10;break e;case y:s=9;break e;case j:s=11;break e;case $:s=14;break e;case z:s=16,n=null;break e}s=29,r=Error(o(130,null===e?"null":typeof e,"")),n=null}return(t=Rn(s,r,t,a)).elementType=e,t.type=n,t.lanes=i,t}function Un(e,t,r,n){return(e=Rn(7,e,n,t)).lanes=r,e}function Kn(e,t,r){return(e=Rn(6,e,null,t)).lanes=r,e}function Hn(e){var t=Rn(18,null,null,0);return t.stateNode=e,t}function Wn(e,t,r){return(t=Rn(4,null!==e.children?e.children:[],e.key,t)).lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qn=new WeakMap;function Yn(e,t){if("object"===typeof e&&null!==e){var r=qn.get(e);return void 0!==r?r:(t={value:e,source:t,stack:re(t)},qn.set(e,t),t)}return{value:e,source:t,stack:re(t)}}var Gn=[],Qn=0,Jn=null,Xn=0,Zn=[],ea=0,ta=null,ra=1,na="";function aa(e,t){Gn[Qn++]=Xn,Gn[Qn++]=Jn,Jn=e,Xn=t}function ia(e,t,r){Zn[ea++]=ra,Zn[ea++]=na,Zn[ea++]=ta,ta=e;var n=ra;e=na;var a=32-ye(n)-1;n&=~(1<<a),r+=1;var i=32-ye(t)+a;if(30<i){var o=a-a%5;i=(n&(1<<o)-1).toString(32),n>>=o,a-=o,ra=1<<32-ye(t)+a|r<<a|n,na=i+e}else ra=1<<i|r<<a|n,na=e}function oa(e){null!==e.return&&(aa(e,1),ia(e,1,0))}function sa(e){for(;e===Jn;)Jn=Gn[--Qn],Gn[Qn]=null,Xn=Gn[--Qn],Gn[Qn]=null;for(;e===ta;)ta=Zn[--ea],Zn[ea]=null,na=Zn[--ea],Zn[ea]=null,ra=Zn[--ea],Zn[ea]=null}function la(e,t){Zn[ea++]=ra,Zn[ea++]=na,Zn[ea++]=ta,ra=t.id,na=t.overflow,ta=e}var ca=null,da=null,ua=!1,pa=null,ha=!1,ma=Error(o(519));function fa(e){throw ka(Yn(Error(o(418,1<arguments.length&&void 0!==arguments[1]&&arguments[1]?"text":"HTML","")),e)),ma}function ga(e){var t=e.stateNode,r=e.type,n=e.memoizedProps;switch(t[Be]=e,t[Ve]=n,r){case"dialog":Jd("cancel",t),Jd("close",t);break;case"iframe":case"object":case"embed":Jd("load",t);break;case"video":case"audio":for(r=0;r<Yd.length;r++)Jd(Yd[r],t);break;case"source":Jd("error",t);break;case"img":case"image":case"link":Jd("error",t),Jd("load",t);break;case"details":Jd("toggle",t);break;case"input":Jd("invalid",t),bt(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":Jd("invalid",t);break;case"textarea":Jd("invalid",t),wt(t,n.value,n.defaultValue,n.children)}"string"!==typeof(r=n.children)&&"number"!==typeof r&&"bigint"!==typeof r||t.textContent===""+r||!0===n.suppressHydrationWarning||du(t.textContent,r)?(null!=n.popover&&(Jd("beforetoggle",t),Jd("toggle",t)),null!=n.onScroll&&Jd("scroll",t),null!=n.onScrollEnd&&Jd("scrollend",t),null!=n.onClick&&(t.onclick=Dt),t=!0):t=!1,t||fa(e,!0)}function xa(e){for(ca=e.return;ca;)switch(ca.tag){case 5:case 31:case 13:return void(ha=!1);case 27:case 3:return void(ha=!0);default:ca=ca.return}}function va(e){if(e!==ca)return!1;if(!ua)return xa(e),ua=!0,!1;var t,r=e.tag;if((t=3!==r&&27!==r)&&((t=5===r)&&(t=!("form"!==(t=e.type)&&"button"!==t)||yu(e.type,e.memoizedProps)),t=!t),t&&da&&fa(e),xa(e),13===r){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));da=Pu(e)}else if(31===r){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));da=Pu(e)}else 27===r?(r=da,_u(e.type)?(e=Ou,Ou=null,da=e):da=r):da=ca?Tu(e.stateNode.nextSibling):null;return!0}function ba(){da=ca=null,ua=!1}function ya(){var e=pa;return null!==e&&(null===Cc?Cc=e:Cc.push.apply(Cc,e),pa=null),e}function ka(e){null===pa?pa=[e]:pa.push(e)}var ja=I(null),wa=null,Sa=null;function $a(e,t,r){B(ja,t._currentValue),t._currentValue=r}function za(e){e._currentValue=ja.current,M(ja)}function _a(e,t,r){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==n&&(n.childLanes|=t)):null!==n&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function Na(e,t,r,n){var a=e.child;for(null!==a&&(a.return=e);null!==a;){var i=a.dependencies;if(null!==i){var s=a.child;i=i.firstContext;e:for(;null!==i;){var l=i;i=a;for(var c=0;c<t.length;c++)if(l.context===t[c]){i.lanes|=r,null!==(l=i.alternate)&&(l.lanes|=r),_a(i.return,r,e),n||(s=null);break e}i=l.next}}else if(18===a.tag){if(null===(s=a.return))throw Error(o(341));s.lanes|=r,null!==(i=s.alternate)&&(i.lanes|=r),_a(s,r,e),s=null}else s=a.child;if(null!==s)s.return=a;else for(s=a;null!==s;){if(s===e){s=null;break}if(null!==(a=s.sibling)){a.return=s.return,s=a;break}s=s.return}a=s}}function Ea(e,t,r,n){e=null;for(var a=t,i=!1;null!==a;){if(!i)if(0!==(524288&a.flags))i=!0;else if(0!==(262144&a.flags))break;if(10===a.tag){var s=a.alternate;if(null===s)throw Error(o(387));if(null!==(s=s.memoizedProps)){var l=a.type;Jr(a.pendingProps.value,s.value)||(null!==e?e.push(l):e=[l])}}else if(a===q.current){if(null===(s=a.alternate))throw Error(o(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(null!==e?e.push(up):e=[up])}a=a.return}null!==e&&Na(t,e,r,n),t.flags|=262144}function Aa(e){for(e=e.firstContext;null!==e;){if(!Jr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ca(e){wa=e,Sa=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Da(e){return Ta(wa,e)}function Fa(e,t){return null===wa&&Ca(e),Ta(e,t)}function Ta(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},null===Sa){if(null===e)throw Error(o(308));Sa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Sa=Sa.next=t;return r}var Oa="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,r){e.push(r)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Pa=n.unstable_scheduleCallback,La=n.unstable_NormalPriority,Ra={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ia(){return{controller:new Oa,data:new Map,refCount:0}}function Ma(e){e.refCount--,0===e.refCount&&Pa(La,function(){e.controller.abort()})}var Ba=null,Va=0,Ua=0,Ka=null;function Ha(){if(0===--Va&&null!==Ba){null!==Ka&&(Ka.status="fulfilled");var e=Ba;Ba=null,Ua=0,Ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Wa=T.S;T.S=function(e,t){Tc=le(),"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Ba){var r=Ba=[];Va=0,Ua=Ud(),Ka={status:"pending",value:void 0,then:function(e){r.push(e)}}}Va++,t.then(Ha,Ha)}(0,t),null!==Wa&&Wa(e,t)};var qa=I(null);function Ya(){var e=qa.current;return null!==e?e:fc.pooledCache}function Ga(e,t){B(qa,null===t?qa.current:t.pool)}function Qa(){var e=Ya();return null===e?null:{parent:Ra._currentValue,pool:e}}var Ja=Error(o(460)),Xa=Error(o(474)),Za=Error(o(542)),ei={then:function(){}};function ti(e){return"fulfilled"===(e=e.status)||"rejected"===e}function ri(e,t,r){switch(void 0===(r=e[r])?e.push(t):r!==t&&(t.then(Dt,Dt),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e;default:if("string"===typeof t.status)t.then(Dt,Dt);else{if(null!==(e=fc)&&100<e.shellSuspendCounter)throw Error(o(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var r=t;r.status="fulfilled",r.value=e}},function(e){if("pending"===t.status){var r=t;r.status="rejected",r.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e}throw ai=t,Ja}}function ni(e){try{return(0,e._init)(e._payload)}catch(ql){if(null!==ql&&"object"===typeof ql&&"function"===typeof ql.then)throw ai=ql,Ja;throw ql}}var ai=null;function ii(){if(null===ai)throw Error(o(459));var e=ai;return ai=null,e}function oi(e){if(e===Ja||e===Za)throw Error(o(483))}var si=null,li=0;function ci(e){var t=li;return li+=1,null===si&&(si=[]),ri(si,e,t)}function di(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function ui(e,t){if(t.$$typeof===m)throw Error(o(525));throw e=Object.prototype.toString.call(t),Error(o(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function pi(e){function t(t,r){if(e){var n=t.deletions;null===n?(t.deletions=[r],t.flags|=16):n.push(r)}}function r(r,n){if(!e)return null;for(;null!==n;)t(r,n),n=n.sibling;return null}function n(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function a(e,t){return(e=Mn(e,t)).index=0,e.sibling=null,e}function i(t,r,n){return t.index=n,e?null!==(n=t.alternate)?(n=n.index)<r?(t.flags|=67108866,r):n:(t.flags|=67108866,r):(t.flags|=1048576,r)}function s(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function l(e,t,r,n){return null===t||6!==t.tag?((t=Kn(r,e.mode,n)).return=e,t):((t=a(t,r)).return=e,t)}function c(e,t,r,n){var i=r.type;return i===x?u(e,t,r.props.children,n,r.key):null!==t&&(t.elementType===i||"object"===typeof i&&null!==i&&i.$$typeof===z&&ni(i)===t.type)?(di(t=a(t,r.props),r),t.return=e,t):(di(t=Vn(r.type,r.key,r.props,null,e.mode,n),r),t.return=e,t)}function d(e,t,r,n){return null===t||4!==t.tag||t.stateNode.containerInfo!==r.containerInfo||t.stateNode.implementation!==r.implementation?((t=Wn(r,e.mode,n)).return=e,t):((t=a(t,r.children||[])).return=e,t)}function u(e,t,r,n,i){return null===t||7!==t.tag?((t=Un(r,e.mode,n,i)).return=e,t):((t=a(t,r)).return=e,t)}function p(e,t,r){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=Kn(""+t,e.mode,r)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case f:return di(r=Vn(t.type,t.key,t.props,null,e.mode,r),t),r.return=e,r;case g:return(t=Wn(t,e.mode,r)).return=e,t;case z:return p(e,t=ni(t),r)}if(F(t)||A(t))return(t=Un(t,e.mode,r,null)).return=e,t;if("function"===typeof t.then)return p(e,ci(t),r);if(t.$$typeof===k)return p(e,Fa(e,t),r);ui(e,t)}return null}function h(e,t,r,n){var a=null!==t?t.key:null;if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return null!==a?null:l(e,t,""+r,n);if("object"===typeof r&&null!==r){switch(r.$$typeof){case f:return r.key===a?c(e,t,r,n):null;case g:return r.key===a?d(e,t,r,n):null;case z:return h(e,t,r=ni(r),n)}if(F(r)||A(r))return null!==a?null:u(e,t,r,n,null);if("function"===typeof r.then)return h(e,t,ci(r),n);if(r.$$typeof===k)return h(e,t,Fa(e,r),n);ui(e,r)}return null}function m(e,t,r,n,a){if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return l(t,e=e.get(r)||null,""+n,a);if("object"===typeof n&&null!==n){switch(n.$$typeof){case f:return c(t,e=e.get(null===n.key?r:n.key)||null,n,a);case g:return d(t,e=e.get(null===n.key?r:n.key)||null,n,a);case z:return m(e,t,r,n=ni(n),a)}if(F(n)||A(n))return u(t,e=e.get(r)||null,n,a,null);if("function"===typeof n.then)return m(e,t,r,ci(n),a);if(n.$$typeof===k)return m(e,t,r,Fa(t,n),a);ui(t,n)}return null}function v(l,c,d,u){if("object"===typeof d&&null!==d&&d.type===x&&null===d.key&&(d=d.props.children),"object"===typeof d&&null!==d){switch(d.$$typeof){case f:e:{for(var b=d.key;null!==c;){if(c.key===b){if((b=d.type)===x){if(7===c.tag){r(l,c.sibling),(u=a(c,d.props.children)).return=l,l=u;break e}}else if(c.elementType===b||"object"===typeof b&&null!==b&&b.$$typeof===z&&ni(b)===c.type){r(l,c.sibling),di(u=a(c,d.props),d),u.return=l,l=u;break e}r(l,c);break}t(l,c),c=c.sibling}d.type===x?((u=Un(d.props.children,l.mode,u,d.key)).return=l,l=u):(di(u=Vn(d.type,d.key,d.props,null,l.mode,u),d),u.return=l,l=u)}return s(l);case g:e:{for(b=d.key;null!==c;){if(c.key===b){if(4===c.tag&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){r(l,c.sibling),(u=a(c,d.children||[])).return=l,l=u;break e}r(l,c);break}t(l,c),c=c.sibling}(u=Wn(d,l.mode,u)).return=l,l=u}return s(l);case z:return v(l,c,d=ni(d),u)}if(F(d))return function(a,o,s,l){for(var c=null,d=null,u=o,f=o=0,g=null;null!==u&&f<s.length;f++){u.index>f?(g=u,u=null):g=u.sibling;var x=h(a,u,s[f],l);if(null===x){null===u&&(u=g);break}e&&u&&null===x.alternate&&t(a,u),o=i(x,o,f),null===d?c=x:d.sibling=x,d=x,u=g}if(f===s.length)return r(a,u),ua&&aa(a,f),c;if(null===u){for(;f<s.length;f++)null!==(u=p(a,s[f],l))&&(o=i(u,o,f),null===d?c=u:d.sibling=u,d=u);return ua&&aa(a,f),c}for(u=n(u);f<s.length;f++)null!==(g=m(u,a,f,s[f],l))&&(e&&null!==g.alternate&&u.delete(null===g.key?f:g.key),o=i(g,o,f),null===d?c=g:d.sibling=g,d=g);return e&&u.forEach(function(e){return t(a,e)}),ua&&aa(a,f),c}(l,c,d,u);if(A(d)){if("function"!==typeof(b=A(d)))throw Error(o(150));return function(a,s,l,c){if(null==l)throw Error(o(151));for(var d=null,u=null,f=s,g=s=0,x=null,v=l.next();null!==f&&!v.done;g++,v=l.next()){f.index>g?(x=f,f=null):x=f.sibling;var b=h(a,f,v.value,c);if(null===b){null===f&&(f=x);break}e&&f&&null===b.alternate&&t(a,f),s=i(b,s,g),null===u?d=b:u.sibling=b,u=b,f=x}if(v.done)return r(a,f),ua&&aa(a,g),d;if(null===f){for(;!v.done;g++,v=l.next())null!==(v=p(a,v.value,c))&&(s=i(v,s,g),null===u?d=v:u.sibling=v,u=v);return ua&&aa(a,g),d}for(f=n(f);!v.done;g++,v=l.next())null!==(v=m(f,a,g,v.value,c))&&(e&&null!==v.alternate&&f.delete(null===v.key?g:v.key),s=i(v,s,g),null===u?d=v:u.sibling=v,u=v);return e&&f.forEach(function(e){return t(a,e)}),ua&&aa(a,g),d}(l,c,d=b.call(d),u)}if("function"===typeof d.then)return v(l,c,ci(d),u);if(d.$$typeof===k)return v(l,c,Fa(l,d),u);ui(l,d)}return"string"===typeof d&&""!==d||"number"===typeof d||"bigint"===typeof d?(d=""+d,null!==c&&6===c.tag?(r(l,c.sibling),(u=a(c,d)).return=l,l=u):(r(l,c),(u=Kn(d,l.mode,u)).return=l,l=u),s(l)):r(l,c)}return function(e,t,r,n){try{li=0;var a=v(e,t,r,n);return si=null,a}catch(ql){if(ql===Ja||ql===Za)throw ql;var i=Rn(29,ql,null,e.mode);return i.lanes=n,i.return=e,i}}}var hi=pi(!0),mi=pi(!1),fi=!1;function gi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xi(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function vi(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function bi(e,t,r){var n=e.updateQueue;if(null===n)return null;if(n=n.shared,0!==(2&mc)){var a=n.pending;return null===a?t.next=t:(t.next=a.next,a.next=t),n.pending=t,t=On(e),Tn(e,null,r),t}return Cn(e,n,t,r),On(e)}function yi(e,t,r){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&r))){var n=t.lanes;r|=n&=e.pendingLanes,t.lanes=r,Te(e,r)}}function ki(e,t){var r=e.updateQueue,n=e.alternate;if(null!==n&&r===(n=n.updateQueue)){var a=null,i=null;if(null!==(r=r.firstBaseUpdate)){do{var o={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};null===i?a=i=o:i=i.next=o,r=r.next}while(null!==r);null===i?a=i=t:i=i.next=t}else a=i=t;return r={baseState:n.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:n.shared,callbacks:n.callbacks},void(e.updateQueue=r)}null===(e=r.lastBaseUpdate)?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var ji=!1;function wi(){if(ji){if(null!==Ka)throw Ka}}function Si(e,t,r,n){ji=!1;var a=e.updateQueue;fi=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,s=a.shared.pending;if(null!==s){a.shared.pending=null;var l=s,c=l.next;l.next=null,null===o?i=c:o.next=c,o=l;var d=e.alternate;null!==d&&((s=(d=d.updateQueue).lastBaseUpdate)!==o&&(null===s?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=l))}if(null!==i){var u=a.baseState;for(o=0,d=c=l=null,s=i;;){var p=-536870913&s.lane,m=p!==s.lane;if(m?(xc&p)===p:(n&p)===p){0!==p&&p===Ua&&(ji=!0),null!==d&&(d=d.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var f=e,g=s;p=t;var x=r;switch(g.tag){case 1:if("function"===typeof(f=g.payload)){u=f.call(x,u,p);break e}u=f;break e;case 3:f.flags=-65537&f.flags|128;case 0:if(null===(p="function"===typeof(f=g.payload)?f.call(x,u,p):f)||void 0===p)break e;u=h({},u,p);break e;case 2:fi=!0}}null!==(p=s.callback)&&(e.flags|=64,m&&(e.flags|=8192),null===(m=a.callbacks)?a.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},null===d?(c=d=m,l=u):d=d.next=m,o|=p;if(null===(s=s.next)){if(null===(s=a.shared.pending))break;s=(m=s).next,m.next=null,a.lastBaseUpdate=m,a.shared.pending=null}}null===d&&(l=u),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=d,null===i&&(a.shared.lanes=0),$c|=o,e.lanes=o,e.memoizedState=u}}function $i(e,t){if("function"!==typeof e)throw Error(o(191,e));e.call(t)}function zi(e,t){var r=e.callbacks;if(null!==r)for(e.callbacks=null,e=0;e<r.length;e++)$i(r[e],t)}var _i=I(null),Ni=I(0);function Ei(e,t){B(Ni,e=wc),B(_i,t),wc=e|t.baseLanes}function Ai(){B(Ni,wc),B(_i,_i.current)}function Ci(){wc=Ni.current,M(_i),M(Ni)}var Di=I(null),Fi=null;function Ti(e){var t=e.alternate;B(Ii,1&Ii.current),B(Di,e),null===Fi&&(null===t||null!==_i.current||null!==t.memoizedState)&&(Fi=e)}function Oi(e){B(Ii,Ii.current),B(Di,e),null===Fi&&(Fi=e)}function Pi(e){22===e.tag?(B(Ii,Ii.current),B(Di,e),null===Fi&&(Fi=e)):Li()}function Li(){B(Ii,Ii.current),B(Di,Di.current)}function Ri(e){M(Di),Fi===e&&(Fi=null),M(Ii)}var Ii=I(0);function Mi(e){for(var t=e;null!==t;){if(13===t.tag){var r=t.memoizedState;if(null!==r&&(null===(r=r.dehydrated)||Du(r)||Fu(r)))return t}else if(19!==t.tag||"forwards"!==t.memoizedProps.revealOrder&&"backwards"!==t.memoizedProps.revealOrder&&"unstable_legacy-backwards"!==t.memoizedProps.revealOrder&&"together"!==t.memoizedProps.revealOrder){if(null!==t.child){t.child.return=t,t=t.child;continue}}else if(0!==(128&t.flags))return t;if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bi=0,Vi=null,Ui=null,Ki=null,Hi=!1,Wi=!1,qi=!1,Yi=0,Gi=0,Qi=null,Ji=0;function Xi(){throw Error(o(321))}function Zi(e,t){if(null===t)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Jr(e[r],t[r]))return!1;return!0}function eo(e,t,r,n,a,i){return Bi=i,Vi=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,T.H=null===e||null===e.memoizedState?gs:xs,qi=!1,i=r(n,a),qi=!1,Wi&&(i=ro(t,r,n,a)),to(e),i}function to(e){T.H=fs;var t=null!==Ui&&null!==Ui.next;if(Bi=0,Ki=Ui=Vi=null,Hi=!1,Gi=0,Qi=null,t)throw Error(o(300));null===e||Fs||null!==(e=e.dependencies)&&Aa(e)&&(Fs=!0)}function ro(e,t,r,n){Vi=e;var a=0;do{if(Wi&&(Qi=null),Gi=0,Wi=!1,25<=a)throw Error(o(301));if(a+=1,Ki=Ui=null,null!=e.updateQueue){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,null!=i.memoCache&&(i.memoCache.index=0)}T.H=vs,i=t(r,n)}while(Wi);return i}function no(){var e=T.H,t=e.useState()[0];return t="function"===typeof t.then?co(t):t,e=e.useState()[0],(null!==Ui?Ui.memoizedState:null)!==e&&(Vi.flags|=1024),t}function ao(){var e=0!==Yi;return Yi=0,e}function io(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function oo(e){if(Hi){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Hi=!1}Bi=0,Ki=Ui=Vi=null,Wi=!1,Gi=Yi=0,Qi=null}function so(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Ki?Vi.memoizedState=Ki=e:Ki=Ki.next=e,Ki}function lo(){if(null===Ui){var e=Vi.alternate;e=null!==e?e.memoizedState:null}else e=Ui.next;var t=null===Ki?Vi.memoizedState:Ki.next;if(null!==t)Ki=t,Ui=e;else{if(null===e){if(null===Vi.alternate)throw Error(o(467));throw Error(o(310))}e={memoizedState:(Ui=e).memoizedState,baseState:Ui.baseState,baseQueue:Ui.baseQueue,queue:Ui.queue,next:null},null===Ki?Vi.memoizedState=Ki=e:Ki=Ki.next=e}return Ki}function co(e){var t=Gi;return Gi+=1,null===Qi&&(Qi=[]),e=ri(Qi,e,t),t=Vi,null===(null===Ki?t.memoizedState:Ki.next)&&(t=t.alternate,T.H=null===t||null===t.memoizedState?gs:xs),e}function uo(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return co(e);if(e.$$typeof===k)return Da(e)}throw Error(o(438,String(e)))}function po(e){var t=null,r=Vi.updateQueue;if(null!==r&&(t=r.memoCache),null==t){var n=Vi.alternate;null!==n&&(null!==(n=n.updateQueue)&&(null!=(n=n.memoCache)&&(t={data:n.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===r&&(r={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=r),r.memoCache=t,void 0===(r=t.data[t.index]))for(r=t.data[t.index]=Array(e),n=0;n<e;n++)r[n]=N;return t.index++,r}function ho(e,t){return"function"===typeof t?t(e):t}function mo(e){return fo(lo(),Ui,e)}function fo(e,t,r){var n=e.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=r;var a=e.baseQueue,i=n.pending;if(null!==i){if(null!==a){var s=a.next;a.next=i.next,i.next=s}t.baseQueue=a=i,n.pending=null}if(i=e.baseState,null===a)e.memoizedState=i;else{var l=s=null,c=null,d=t=a.next,u=!1;do{var p=-536870913&d.lane;if(p!==d.lane?(xc&p)===p:(Bi&p)===p){var h=d.revertLane;if(0===h)null!==c&&(c=c.next={lane:0,revertLane:0,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),p===Ua&&(u=!0);else{if((Bi&h)===h){d=d.next,h===Ua&&(u=!0);continue}p={lane:0,revertLane:d.revertLane,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},null===c?(l=c=p,s=i):c=c.next=p,Vi.lanes|=h,$c|=h}p=d.action,qi&&r(i,p),i=d.hasEagerState?d.eagerState:r(i,p)}else h={lane:p,revertLane:d.revertLane,gesture:d.gesture,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},null===c?(l=c=h,s=i):c=c.next=h,Vi.lanes|=p,$c|=p;d=d.next}while(null!==d&&d!==t);if(null===c?s=i:c.next=l,!Jr(i,e.memoizedState)&&(Fs=!0,u&&null!==(r=Ka)))throw r;e.memoizedState=i,e.baseState=s,e.baseQueue=c,n.lastRenderedState=i}return null===a&&(n.lanes=0),[e.memoizedState,n.dispatch]}function go(e){var t=lo(),r=t.queue;if(null===r)throw Error(o(311));r.lastRenderedReducer=e;var n=r.dispatch,a=r.pending,i=t.memoizedState;if(null!==a){r.pending=null;var s=a=a.next;do{i=e(i,s.action),s=s.next}while(s!==a);Jr(i,t.memoizedState)||(Fs=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),r.lastRenderedState=i}return[i,n]}function xo(e,t,r){var n=Vi,a=lo(),i=ua;if(i){if(void 0===r)throw Error(o(407));r=r()}else r=t();var s=!Jr((Ui||a).memoizedState,r);if(s&&(a.memoizedState=r,Fs=!0),a=a.queue,Vo(yo.bind(null,n,a,e),[e]),a.getSnapshot!==t||s||null!==Ki&&1&Ki.memoizedState.tag){if(n.flags|=2048,Lo(9,{destroy:void 0},bo.bind(null,n,a,r,t),null),null===fc)throw Error(o(349));i||0!==(127&Bi)||vo(n,t,r)}return r}function vo(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},null===(t=Vi.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.stores=[e]):null===(r=t.stores)?t.stores=[e]:r.push(e)}function bo(e,t,r,n){t.value=r,t.getSnapshot=n,ko(t)&&jo(e)}function yo(e,t,r){return r(function(){ko(t)&&jo(e)})}function ko(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Jr(e,r)}catch(n){return!0}}function jo(e){var t=Fn(e,2);null!==t&&Gc(t,e,2)}function wo(e){var t=so();if("function"===typeof e){var r=e;if(e=r(),qi){be(!0);try{r()}finally{be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:e},t}function So(e,t,r,n){return e.baseState=r,fo(e,Ui,"function"===typeof n?n:ho)}function $o(e,t,r,n,a){if(ps(e))throw Error(o(485));if(null!==(e=t.action)){var i={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){i.listeners.push(e)}};null!==T.T?r(!0):i.isTransition=!1,n(i),null===(r=t.pending)?(i.next=t.pending=i,zo(t,i)):(i.next=r.next,t.pending=r.next=i)}}function zo(e,t){var r=t.action,n=t.payload,a=e.state;if(t.isTransition){var i=T.T,o={};T.T=o;try{var s=r(a,n),l=T.S;null!==l&&l(o,s),_o(e,t,s)}catch(c){Eo(e,t,c)}finally{null!==i&&null!==o.types&&(i.types=o.types),T.T=i}}else try{_o(e,t,i=r(a,n))}catch(d){Eo(e,t,d)}}function _o(e,t,r){null!==r&&"object"===typeof r&&"function"===typeof r.then?r.then(function(r){No(e,t,r)},function(r){return Eo(e,t,r)}):No(e,t,r)}function No(e,t,r){t.status="fulfilled",t.value=r,Ao(t),e.state=r,null!==(t=e.pending)&&((r=t.next)===t?e.pending=null:(r=r.next,t.next=r,zo(e,r)))}function Eo(e,t,r){var n=e.pending;if(e.pending=null,null!==n){n=n.next;do{t.status="rejected",t.reason=r,Ao(t),t=t.next}while(t!==n)}e.action=null}function Ao(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Co(e,t){return t}function Do(e,t){if(ua){var r=fc.formState;if(null!==r){e:{var n=Vi;if(ua){if(da){t:{for(var a=da,i=ha;8!==a.nodeType;){if(!i){a=null;break t}if(null===(a=Tu(a.nextSibling))){a=null;break t}}a="F!"===(i=a.data)||"F"===i?a:null}if(a){da=Tu(a.nextSibling),n="F!"===a.data;break e}}fa(n)}n=!1}n&&(t=r[0])}}return(r=so()).memoizedState=r.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Co,lastRenderedState:t},r.queue=n,r=cs.bind(null,Vi,n),n.dispatch=r,n=wo(!1),i=us.bind(null,Vi,!1,n.queue),a={state:t,dispatch:null,action:e,pending:null},(n=so()).queue=a,r=$o.bind(null,Vi,a,i,r),a.dispatch=r,n.memoizedState=e,[t,r,!1]}function Fo(e){return To(lo(),Ui,e)}function To(e,t,r){if(t=fo(e,t,Co)[0],e=mo(ho)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var n=co(t)}catch(ql){if(ql===Ja)throw Za;throw ql}else n=t;var a=(t=lo()).queue,i=a.dispatch;return r!==t.memoizedState&&(Vi.flags|=2048,Lo(9,{destroy:void 0},Oo.bind(null,a,r),null)),[n,i,e]}function Oo(e,t){e.action=t}function Po(e){var t=lo(),r=Ui;if(null!==r)return To(t,r,e);lo(),t=t.memoizedState;var n=(r=lo()).queue.dispatch;return r.memoizedState=e,[t,n,!1]}function Lo(e,t,r,n){return e={tag:e,create:r,deps:n,inst:t,next:null},null===(t=Vi.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t),null===(r=t.lastEffect)?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e),e}function Ro(){return lo().memoizedState}function Io(e,t,r,n){var a=so();Vi.flags|=e,a.memoizedState=Lo(1|t,{destroy:void 0},r,void 0===n?null:n)}function Mo(e,t,r,n){var a=lo();n=void 0===n?null:n;var i=a.memoizedState.inst;null!==Ui&&null!==n&&Zi(n,Ui.memoizedState.deps)?a.memoizedState=Lo(t,i,r,n):(Vi.flags|=e,a.memoizedState=Lo(1|t,i,r,n))}function Bo(e,t){Io(8390656,8,e,t)}function Vo(e,t){Mo(2048,8,e,t)}function Uo(e){var t=lo().memoizedState;return function(e){Vi.flags|=4;var t=Vi.updateQueue;if(null===t)t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.events=[e];else{var r=t.events;null===r?t.events=[e]:r.push(e)}}({ref:t,nextImpl:e}),function(){if(0!==(2&mc))throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Ko(e,t){return Mo(4,2,e,t)}function Ho(e,t){return Mo(4,4,e,t)}function Wo(e,t){if("function"===typeof t){e=e();var r=t(e);return function(){"function"===typeof r?r():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function qo(e,t,r){r=null!==r&&void 0!==r?r.concat([e]):null,Mo(4,4,Wo.bind(null,t,e),r)}function Yo(){}function Go(e,t){var r=lo();t=void 0===t?null:t;var n=r.memoizedState;return null!==t&&Zi(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Qo(e,t){var r=lo();t=void 0===t?null:t;var n=r.memoizedState;if(null!==t&&Zi(t,n[1]))return n[0];if(n=e(),qi){be(!0);try{e()}finally{be(!1)}}return r.memoizedState=[n,t],n}function Jo(e,t,r){return void 0===r||0!==(1073741824&Bi)&&0===(261930&xc)?e.memoizedState=t:(e.memoizedState=r,e=Yc(),Vi.lanes|=e,$c|=e,r)}function Xo(e,t,r,n){return Jr(r,t)?r:null!==_i.current?(e=Jo(e,r,n),Jr(e,t)||(Fs=!0),e):0===(42&Bi)||0!==(1073741824&Bi)&&0===(261930&xc)?(Fs=!0,e.memoizedState=r):(e=Yc(),Vi.lanes|=e,$c|=e,t)}function Zo(e,t,r,n,a){var i=O.p;O.p=0!==i&&8>i?i:8;var o=T.T,s={};T.T=s,us(e,!1,t,r);try{var l=a(),c=T.S;if(null!==c&&c(s,l),null!==l&&"object"===typeof l&&"function"===typeof l.then){var d=function(e,t){var r=[],n={status:"pending",value:null,reason:null,then:function(e){r.push(e)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var e=0;e<r.length;e++)(0,r[e])(t)},function(e){for(n.status="rejected",n.reason=e,e=0;e<r.length;e++)(0,r[e])(void 0)}),n}(l,n);ds(e,t,d,qc())}else ds(e,t,n,qc())}catch(u){ds(e,t,{then:function(){},status:"rejected",reason:u},qc())}finally{O.p=i,null!==o&&null!==s.types&&(o.types=s.types),T.T=o}}function es(){}function ts(e,t,r,n){if(5!==e.tag)throw Error(o(476));var a=rs(e).queue;Zo(e,a,t,P,null===r?es:function(){return ns(e),r(n)})}function rs(e){var t=e.memoizedState;if(null!==t)return t;var r={};return(t={memoizedState:P,baseState:P,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:P},next:null}).next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:r},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function ns(e){var t=rs(e);null===t.next&&(t=e.alternate.memoizedState),ds(e,t.next.queue,{},qc())}function as(){return Da(up)}function is(){return lo().memoizedState}function os(){return lo().memoizedState}function ss(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var r=qc(),n=bi(t,e=vi(r),r);return null!==n&&(Gc(n,t,r),yi(n,t,r)),t={cache:Ia()},void(e.payload=t)}t=t.return}}function ls(e,t,r){var n=qc();r={lane:n,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},ps(e)?hs(t,r):null!==(r=Dn(e,t,r,n))&&(Gc(r,e,n),ms(r,t,n))}function cs(e,t,r){ds(e,t,r,qc())}function ds(e,t,r,n){var a={lane:n,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(ps(e))hs(t,a);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)&&null!==(i=t.lastRenderedReducer))try{var o=t.lastRenderedState,s=i(o,r);if(a.hasEagerState=!0,a.eagerState=s,Jr(s,o))return Cn(e,t,a,0),null===fc&&An(),!1}catch(l){}if(null!==(r=Dn(e,t,a,n)))return Gc(r,e,n),ms(r,t,n),!0}return!1}function us(e,t,r,n){if(n={lane:2,revertLane:Ud(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ps(e)){if(t)throw Error(o(479))}else null!==(t=Dn(e,r,n,2))&&Gc(t,e,2)}function ps(e){var t=e.alternate;return e===Vi||null!==t&&t===Vi}function hs(e,t){Wi=Hi=!0;var r=e.pending;null===r?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function ms(e,t,r){if(0!==(4194048&r)){var n=t.lanes;r|=n&=e.pendingLanes,t.lanes=r,Te(e,r)}}var fs={readContext:Da,use:uo,useCallback:Xi,useContext:Xi,useEffect:Xi,useImperativeHandle:Xi,useLayoutEffect:Xi,useInsertionEffect:Xi,useMemo:Xi,useReducer:Xi,useRef:Xi,useState:Xi,useDebugValue:Xi,useDeferredValue:Xi,useTransition:Xi,useSyncExternalStore:Xi,useId:Xi,useHostTransitionStatus:Xi,useFormState:Xi,useActionState:Xi,useOptimistic:Xi,useMemoCache:Xi,useCacheRefresh:Xi};fs.useEffectEvent=Xi;var gs={readContext:Da,use:uo,useCallback:function(e,t){return so().memoizedState=[e,void 0===t?null:t],e},useContext:Da,useEffect:Bo,useImperativeHandle:function(e,t,r){r=null!==r&&void 0!==r?r.concat([e]):null,Io(4194308,4,Wo.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Io(4194308,4,e,t)},useInsertionEffect:function(e,t){Io(4,2,e,t)},useMemo:function(e,t){var r=so();t=void 0===t?null:t;var n=e();if(qi){be(!0);try{e()}finally{be(!1)}}return r.memoizedState=[n,t],n},useReducer:function(e,t,r){var n=so();if(void 0!==r){var a=r(t);if(qi){be(!0);try{r(t)}finally{be(!1)}}}else a=t;return n.memoizedState=n.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},n.queue=e,e=e.dispatch=ls.bind(null,Vi,e),[n.memoizedState,e]},useRef:function(e){return e={current:e},so().memoizedState=e},useState:function(e){var t=(e=wo(e)).queue,r=cs.bind(null,Vi,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Yo,useDeferredValue:function(e,t){return Jo(so(),e,t)},useTransition:function(){var e=wo(!1);return e=Zo.bind(null,Vi,e.queue,!0,!1),so().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var n=Vi,a=so();if(ua){if(void 0===r)throw Error(o(407));r=r()}else{if(r=t(),null===fc)throw Error(o(349));0!==(127&xc)||vo(n,t,r)}a.memoizedState=r;var i={value:r,getSnapshot:t};return a.queue=i,Bo(yo.bind(null,n,i,e),[e]),n.flags|=2048,Lo(9,{destroy:void 0},bo.bind(null,n,i,r,t),null),r},useId:function(){var e=so(),t=fc.identifierPrefix;if(ua){var r=na;t="_"+t+"R_"+(r=(ra&~(1<<32-ye(ra)-1)).toString(32)+r),0<(r=Yi++)&&(t+="H"+r.toString(32)),t+="_"}else t="_"+t+"r_"+(r=Ji++).toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:as,useFormState:Do,useActionState:Do,useOptimistic:function(e){var t=so();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=us.bind(null,Vi,!0,r),r.dispatch=t,[e,t]},useMemoCache:po,useCacheRefresh:function(){return so().memoizedState=ss.bind(null,Vi)},useEffectEvent:function(e){var t=so(),r={impl:e};return t.memoizedState=r,function(){if(0!==(2&mc))throw Error(o(440));return r.impl.apply(void 0,arguments)}}},xs={readContext:Da,use:uo,useCallback:Go,useContext:Da,useEffect:Vo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Qo,useReducer:mo,useRef:Ro,useState:function(){return mo(ho)},useDebugValue:Yo,useDeferredValue:function(e,t){return Xo(lo(),Ui.memoizedState,e,t)},useTransition:function(){var e=mo(ho)[0],t=lo().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:is,useHostTransitionStatus:as,useFormState:Fo,useActionState:Fo,useOptimistic:function(e,t){return So(lo(),0,e,t)},useMemoCache:po,useCacheRefresh:os};xs.useEffectEvent=Uo;var vs={readContext:Da,use:uo,useCallback:Go,useContext:Da,useEffect:Vo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Qo,useReducer:go,useRef:Ro,useState:function(){return go(ho)},useDebugValue:Yo,useDeferredValue:function(e,t){var r=lo();return null===Ui?Jo(r,e,t):Xo(r,Ui.memoizedState,e,t)},useTransition:function(){var e=go(ho)[0],t=lo().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:is,useHostTransitionStatus:as,useFormState:Po,useActionState:Po,useOptimistic:function(e,t){var r=lo();return null!==Ui?So(r,0,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:po,useCacheRefresh:os};function bs(e,t,r,n){r=null===(r=r(n,t=e.memoizedState))||void 0===r?t:h({},t,r),e.memoizedState=r,0===e.lanes&&(e.updateQueue.baseState=r)}vs.useEffectEvent=Uo;var ys={enqueueSetState:function(e,t,r){e=e._reactInternals;var n=qc(),a=vi(n);a.payload=t,void 0!==r&&null!==r&&(a.callback=r),null!==(t=bi(e,a,n))&&(Gc(t,e,n),yi(t,e,n))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=qc(),a=vi(n);a.tag=1,a.payload=t,void 0!==r&&null!==r&&(a.callback=r),null!==(t=bi(e,a,n))&&(Gc(t,e,n),yi(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=qc(),n=vi(r);n.tag=2,void 0!==t&&null!==t&&(n.callback=t),null!==(t=bi(e,n,r))&&(Gc(t,e,r),yi(t,e,r))}};function ks(e,t,r,n,a,i,o){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(n,i,o):!t.prototype||!t.prototype.isPureReactComponent||(!Xr(r,n)||!Xr(a,i))}function js(e,t,r,n){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(r,n),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&ys.enqueueReplaceState(t,t.state,null)}function ws(e,t){var r=t;if("ref"in t)for(var n in r={},t)"ref"!==n&&(r[n]=t[n]);if(e=e.defaultProps)for(var a in r===t&&(r=h({},r)),e)void 0===r[a]&&(r[a]=e[a]);return r}function Ss(e){zn(e)}function $s(e){console.error(e)}function zs(e){zn(e)}function _s(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(r){setTimeout(function(){throw r})}}function Ns(e,t,r){try{(0,e.onCaughtError)(r.value,{componentStack:r.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Es(e,t,r){return(r=vi(r)).tag=3,r.payload={element:null},r.callback=function(){_s(e,t)},r}function As(e){return(e=vi(e)).tag=3,e}function Cs(e,t,r,n){var a=r.type.getDerivedStateFromError;if("function"===typeof a){var i=n.value;e.payload=function(){return a(i)},e.callback=function(){Ns(t,r,n)}}var o=r.stateNode;null!==o&&"function"===typeof o.componentDidCatch&&(e.callback=function(){Ns(t,r,n),"function"!==typeof a&&(null===Lc?Lc=new Set([this]):Lc.add(this));var e=n.stack;this.componentDidCatch(n.value,{componentStack:null!==e?e:""})})}var Ds=Error(o(461)),Fs=!1;function Ts(e,t,r,n){t.child=null===e?mi(t,null,r,n):hi(t,e.child,r,n)}function Os(e,t,r,n,a){r=r.render;var i=t.ref;if("ref"in n){var o={};for(var s in n)"ref"!==s&&(o[s]=n[s])}else o=n;return Ca(t),n=eo(e,t,r,o,i,a),s=ao(),null===e||Fs?(ua&&s&&oa(t),t.flags|=1,Ts(e,t,n,a),t.child):(io(e,t,a),al(e,t,a))}function Ps(e,t,r,n,a){if(null===e){var i=r.type;return"function"!==typeof i||In(i)||void 0!==i.defaultProps||null!==r.compare?((e=Vn(r.type,null,n,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=i,Ls(e,t,i,n,a))}if(i=e.child,!il(e,a)){var o=i.memoizedProps;if((r=null!==(r=r.compare)?r:Xr)(o,n)&&e.ref===t.ref)return al(e,t,a)}return t.flags|=1,(e=Mn(i,n)).ref=t.ref,e.return=t,t.child=e}function Ls(e,t,r,n,a){if(null!==e){var i=e.memoizedProps;if(Xr(i,n)&&e.ref===t.ref){if(Fs=!1,t.pendingProps=n=i,!il(e,a))return t.lanes=e.lanes,al(e,t,a);0!==(131072&e.flags)&&(Fs=!0)}}return Ks(e,t,r,n,a)}function Rs(e,t,r,n){var a=n.children,i=null!==e?e.memoizedState:null;if(null===e&&null===t.stateNode&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),"hidden"===n.mode){if(0!==(128&t.flags)){if(i=null!==i?i.baseLanes|r:r,null!==e){for(n=t.child=e.child,a=0;null!==n;)a=a|n.lanes|n.childLanes,n=n.sibling;n=a&~i}else n=0,t.child=null;return Ms(e,t,i,r,n)}if(0===(536870912&r))return n=t.lanes=536870912,Ms(e,t,null!==i?i.baseLanes|r:r,r,n);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Ga(0,null!==i?i.cachePool:null),null!==i?Ei(t,i):Ai(),Pi(t)}else null!==i?(Ga(0,i.cachePool),Ei(t,i),Li(),t.memoizedState=null):(null!==e&&Ga(0,null),Ai(),Li());return Ts(e,t,a,r),t.child}function Is(e,t){return null!==e&&22===e.tag||null!==t.stateNode||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ms(e,t,r,n,a){var i=Ya();return i=null===i?null:{parent:Ra._currentValue,pool:i},t.memoizedState={baseLanes:r,cachePool:i},null!==e&&Ga(0,null),Ai(),Pi(t),null!==e&&Ea(e,t,n,!0),t.childLanes=a,null}function Bs(e,t){return(t=Zs({mode:t.mode,children:t.children},e.mode)).ref=e.ref,e.child=t,t.return=e,t}function Vs(e,t,r){return hi(t,e.child,null,r),(e=Bs(t,t.pendingProps)).flags|=2,Ri(t),t.memoizedState=null,e}function Us(e,t){var r=t.ref;if(null===r)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof r&&"object"!==typeof r)throw Error(o(284));null!==e&&e.ref===r||(t.flags|=4194816)}}function Ks(e,t,r,n,a){return Ca(t),r=eo(e,t,r,n,void 0,a),n=ao(),null===e||Fs?(ua&&n&&oa(t),t.flags|=1,Ts(e,t,r,a),t.child):(io(e,t,a),al(e,t,a))}function Hs(e,t,r,n,a,i){return Ca(t),t.updateQueue=null,r=ro(t,n,r,a),to(e),n=ao(),null===e||Fs?(ua&&n&&oa(t),t.flags|=1,Ts(e,t,r,i),t.child):(io(e,t,i),al(e,t,i))}function Ws(e,t,r,n,a){if(Ca(t),null===t.stateNode){var i=Pn,o=r.contextType;"object"===typeof o&&null!==o&&(i=Da(o)),i=new r(n,i),t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,i.updater=ys,t.stateNode=i,i._reactInternals=t,(i=t.stateNode).props=n,i.state=t.memoizedState,i.refs={},gi(t),o=r.contextType,i.context="object"===typeof o&&null!==o?Da(o):Pn,i.state=t.memoizedState,"function"===typeof(o=r.getDerivedStateFromProps)&&(bs(t,r,o,n),i.state=t.memoizedState),"function"===typeof r.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(o=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),o!==i.state&&ys.enqueueReplaceState(i,i.state,null),Si(t,n,i,a),wi(),i.state=t.memoizedState),"function"===typeof i.componentDidMount&&(t.flags|=4194308),n=!0}else if(null===e){i=t.stateNode;var s=t.memoizedProps,l=ws(r,s);i.props=l;var c=i.context,d=r.contextType;o=Pn,"object"===typeof d&&null!==d&&(o=Da(d));var u=r.getDerivedStateFromProps;d="function"===typeof u||"function"===typeof i.getSnapshotBeforeUpdate,s=t.pendingProps!==s,d||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(s||c!==o)&&js(t,i,n,o),fi=!1;var p=t.memoizedState;i.state=p,Si(t,n,i,a),wi(),c=t.memoizedState,s||p!==c||fi?("function"===typeof u&&(bs(t,r,u,n),c=t.memoizedState),(l=fi||ks(t,r,l,n,p,c,o))?(d||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||("function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"===typeof i.componentDidMount&&(t.flags|=4194308)):("function"===typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),i.props=n,i.state=c,i.context=o,n=l):("function"===typeof i.componentDidMount&&(t.flags|=4194308),n=!1)}else{i=t.stateNode,xi(e,t),d=ws(r,o=t.memoizedProps),i.props=d,u=t.pendingProps,p=i.context,c=r.contextType,l=Pn,"object"===typeof c&&null!==c&&(l=Da(c)),(c="function"===typeof(s=r.getDerivedStateFromProps)||"function"===typeof i.getSnapshotBeforeUpdate)||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(o!==u||p!==l)&&js(t,i,n,l),fi=!1,p=t.memoizedState,i.state=p,Si(t,n,i,a),wi();var h=t.memoizedState;o!==u||p!==h||fi||null!==e&&null!==e.dependencies&&Aa(e.dependencies)?("function"===typeof s&&(bs(t,r,s,n),h=t.memoizedState),(d=fi||ks(t,r,d,n,p,h,l)||null!==e&&null!==e.dependencies&&Aa(e.dependencies))?(c||"function"!==typeof i.UNSAFE_componentWillUpdate&&"function"!==typeof i.componentWillUpdate||("function"===typeof i.componentWillUpdate&&i.componentWillUpdate(n,h,l),"function"===typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(n,h,l)),"function"===typeof i.componentDidUpdate&&(t.flags|=4),"function"===typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=h),i.props=n,i.state=h,i.context=l,n=d):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),n=!1)}return i=n,Us(e,t),n=0!==(128&t.flags),i||n?(i=t.stateNode,r=n&&"function"!==typeof r.getDerivedStateFromError?null:i.render(),t.flags|=1,null!==e&&n?(t.child=hi(t,e.child,null,a),t.child=hi(t,null,r,a)):Ts(e,t,r,a),t.memoizedState=i.state,e=t.child):e=al(e,t,a),e}function qs(e,t,r,n){return ba(),t.flags|=256,Ts(e,t,r,n),t.child}var Ys={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Gs(e){return{baseLanes:e,cachePool:Qa()}}function Qs(e,t,r){return e=null!==e?e.childLanes&~r:0,t&&(e|=Nc),e}function Js(e,t,r){var n,a=t.pendingProps,i=!1,s=0!==(128&t.flags);if((n=s)||(n=(null===e||null!==e.memoizedState)&&0!==(2&Ii.current)),n&&(i=!0,t.flags&=-129),n=0!==(32&t.flags),t.flags&=-33,null===e){if(ua){if(i?Ti(t):Li(),(e=da)?null!==(e=null!==(e=Cu(e,ha))&&"&"!==e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:ra,overflow:na}:null,retryLane:536870912,hydrationErrors:null},(r=Hn(e)).return=t,t.child=r,ca=t,da=null):e=null,null===e)throw fa(t);return Fu(e)?t.lanes=32:t.lanes=536870912,null}var l=a.children;return a=a.fallback,i?(Li(),l=Zs({mode:"hidden",children:l},i=t.mode),a=Un(a,i,r,null),l.return=t,a.return=t,l.sibling=a,t.child=l,(a=t.child).memoizedState=Gs(r),a.childLanes=Qs(e,n,r),t.memoizedState=Ys,Is(null,a)):(Ti(t),Xs(t,l))}var c=e.memoizedState;if(null!==c&&null!==(l=c.dehydrated)){if(s)256&t.flags?(Ti(t),t.flags&=-257,t=el(e,t,r)):null!==t.memoizedState?(Li(),t.child=e.child,t.flags|=128,t=null):(Li(),l=a.fallback,i=t.mode,a=Zs({mode:"visible",children:a.children},i),(l=Un(l,i,r,null)).flags|=2,a.return=t,l.return=t,a.sibling=l,t.child=a,hi(t,e.child,null,r),(a=t.child).memoizedState=Gs(r),a.childLanes=Qs(e,n,r),t.memoizedState=Ys,t=Is(null,a));else if(Ti(t),Fu(l)){if(n=l.nextSibling&&l.nextSibling.dataset)var d=n.dgst;n=d,(a=Error(o(419))).stack="",a.digest=n,ka({value:a,source:null,stack:null}),t=el(e,t,r)}else if(Fs||Ea(e,t,r,!1),n=0!==(r&e.childLanes),Fs||n){if(null!==(n=fc)&&(0!==(a=Oe(n,r))&&a!==c.retryLane))throw c.retryLane=a,Fn(e,a),Gc(n,e,a),Ds;Du(l)||sd(),t=el(e,t,r)}else Du(l)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,da=Tu(l.nextSibling),ca=t,ua=!0,pa=null,ha=!1,null!==e&&la(t,e),(t=Xs(t,a.children)).flags|=4096);return t}return i?(Li(),l=a.fallback,i=t.mode,d=(c=e.child).sibling,(a=Mn(c,{mode:"hidden",children:a.children})).subtreeFlags=65011712&c.subtreeFlags,null!==d?l=Mn(d,l):(l=Un(l,i,r,null)).flags|=2,l.return=t,a.return=t,a.sibling=l,t.child=a,Is(null,a),a=t.child,null===(l=e.child.memoizedState)?l=Gs(r):(null!==(i=l.cachePool)?(c=Ra._currentValue,i=i.parent!==c?{parent:c,pool:c}:i):i=Qa(),l={baseLanes:l.baseLanes|r,cachePool:i}),a.memoizedState=l,a.childLanes=Qs(e,n,r),t.memoizedState=Ys,Is(e.child,a)):(Ti(t),e=(r=e.child).sibling,(r=Mn(r,{mode:"visible",children:a.children})).return=t,r.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r)}function Xs(e,t){return(t=Zs({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Zs(e,t){return(e=Rn(22,e,null,t)).lanes=0,e}function el(e,t,r){return hi(t,e.child,null,r),(e=Xs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function tl(e,t,r){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),_a(e.return,t,r)}function rl(e,t,r,n,a,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:a,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=r,o.tailMode=a,o.treeForkCount=i)}function nl(e,t,r){var n=t.pendingProps,a=n.revealOrder,i=n.tail;n=n.children;var o=Ii.current,s=0!==(2&o);if(s?(o=1&o|2,t.flags|=128):o&=1,B(Ii,o),Ts(e,t,n,r),n=ua?Xn:0,!s&&null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&tl(e,r,t);else if(19===e.tag)tl(e,r,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(r=t.child,a=null;null!==r;)null!==(e=r.alternate)&&null===Mi(e)&&(a=r),r=r.sibling;null===(r=a)?(a=t.child,t.child=null):(a=r.sibling,r.sibling=null),rl(t,!1,a,r,i,n);break;case"backwards":case"unstable_legacy-backwards":for(r=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Mi(e)){t.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}rl(t,!0,r,null,i,n);break;case"together":rl(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function al(e,t,r){if(null!==e&&(t.dependencies=e.dependencies),$c|=t.lanes,0===(r&t.childLanes)){if(null===e)return null;if(Ea(e,t,r,!1),0===(r&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(o(153));if(null!==t.child){for(r=Mn(e=t.child,e.pendingProps),t.child=r,r.return=t;null!==e.sibling;)e=e.sibling,(r=r.sibling=Mn(e,e.pendingProps)).return=t;r.sibling=null}return t.child}function il(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Aa(e))}function ol(e,t,r){if(null!==e)if(e.memoizedProps!==t.pendingProps)Fs=!0;else{if(!il(e,r)&&0===(128&t.flags))return Fs=!1,function(e,t,r){switch(t.tag){case 3:Y(t,t.stateNode.containerInfo),$a(0,Ra,e.memoizedState.cache),ba();break;case 27:case 5:Q(t);break;case 4:Y(t,t.stateNode.containerInfo);break;case 10:$a(0,t.type,t.memoizedProps.value);break;case 31:if(null!==t.memoizedState)return t.flags|=128,Oi(t),null;break;case 13:var n=t.memoizedState;if(null!==n)return null!==n.dehydrated?(Ti(t),t.flags|=128,null):0!==(r&t.child.childLanes)?Js(e,t,r):(Ti(t),null!==(e=al(e,t,r))?e.sibling:null);Ti(t);break;case 19:var a=0!==(128&e.flags);if((n=0!==(r&t.childLanes))||(Ea(e,t,r,!1),n=0!==(r&t.childLanes)),a){if(n)return nl(e,t,r);t.flags|=128}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),B(Ii,Ii.current),n)break;return null;case 22:return t.lanes=0,Rs(e,t,r,t.pendingProps);case 24:$a(0,Ra,e.memoizedState.cache)}return al(e,t,r)}(e,t,r);Fs=0!==(131072&e.flags)}else Fs=!1,ua&&0!==(1048576&t.flags)&&ia(t,Xn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=ni(t.elementType),t.type=e,"function"!==typeof e){if(void 0!==e&&null!==e){var a=e.$$typeof;if(a===j){t.tag=11,t=Os(null,t,e,n,r);break e}if(a===$){t.tag=14,t=Ps(null,t,e,n,r);break e}}throw t=D(e)||e,Error(o(306,t,""))}In(e)?(n=ws(e,n),t.tag=1,t=Ws(null,t,e,n,r)):(t.tag=0,t=Ks(null,t,e,n,r))}return t;case 0:return Ks(e,t,t.type,t.pendingProps,r);case 1:return Ws(e,t,n=t.type,a=ws(n,t.pendingProps),r);case 3:e:{if(Y(t,t.stateNode.containerInfo),null===e)throw Error(o(387));n=t.pendingProps;var i=t.memoizedState;a=i.element,xi(e,t),Si(t,n,null,r);var s=t.memoizedState;if(n=s.cache,$a(0,Ra,n),n!==i.cache&&Na(t,[Ra],r,!0),wi(),n=s.element,i.isDehydrated){if(i={element:n,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=qs(e,t,n,r);break e}if(n!==a){ka(a=Yn(Error(o(424)),t)),t=qs(e,t,n,r);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(da=Tu(e.firstChild),ca=t,ua=!0,pa=null,ha=!0,r=mi(t,null,n,r),t.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(ba(),n===a){t=al(e,t,r);break e}Ts(e,t,n,r)}t=t.child}return t;case 26:return Us(e,t),null===e?(r=Wu(t.type,null,t.pendingProps,null))?t.memoizedState=r:ua||(r=t.type,e=t.pendingProps,(n=xu(W.current).createElement(r))[Be]=t,n[Ve]=e,hu(n,r,e),et(n),t.stateNode=n):t.memoizedState=Wu(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Q(t),null===e&&ua&&(n=t.stateNode=Ru(t.type,t.pendingProps,W.current),ca=t,ha=!0,a=da,_u(t.type)?(Ou=a,da=Tu(n.firstChild)):da=a),Ts(e,t,t.pendingProps.children,r),Us(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&ua&&((a=n=da)&&(null!==(n=function(e,t,r,n){for(;1===e.nodeType;){var a=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(n){if(!e[Ye])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(i=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(i!==a.rel||e.getAttribute("href")!==(null==a.href||""===a.href?null:a.href)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin)||e.getAttribute("title")!==(null==a.title?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((i=e.getAttribute("src"))!==(null==a.src?null:a.src)||e.getAttribute("type")!==(null==a.type?null:a.type)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var i=null==a.name?null:""+a.name;if("hidden"===a.type&&e.getAttribute("name")===i)return e}if(null===(e=Tu(e.nextSibling)))break}return null}(n,t.type,t.pendingProps,ha))?(t.stateNode=n,ca=t,da=Tu(n.firstChild),ha=!1,a=!0):a=!1),a||fa(t)),Q(t),a=t.type,i=t.pendingProps,s=null!==e?e.memoizedProps:null,n=i.children,yu(a,i)?n=null:null!==s&&yu(a,s)&&(t.flags|=32),null!==t.memoizedState&&(a=eo(e,t,no,null,null,r),up._currentValue=a),Us(e,t),Ts(e,t,n,r),t.child;case 6:return null===e&&ua&&((e=r=da)&&(null!==(r=function(e,t,r){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!r)return null;if(null===(e=Tu(e.nextSibling)))return null}return e}(r,t.pendingProps,ha))?(t.stateNode=r,ca=t,da=null,e=!0):e=!1),e||fa(t)),null;case 13:return Js(e,t,r);case 4:return Y(t,t.stateNode.containerInfo),n=t.pendingProps,null===e?t.child=hi(t,null,n,r):Ts(e,t,n,r),t.child;case 11:return Os(e,t,t.type,t.pendingProps,r);case 7:return Ts(e,t,t.pendingProps,r),t.child;case 8:case 12:return Ts(e,t,t.pendingProps.children,r),t.child;case 10:return n=t.pendingProps,$a(0,t.type,n.value),Ts(e,t,n.children,r),t.child;case 9:return a=t.type._context,n=t.pendingProps.children,Ca(t),n=n(a=Da(a)),t.flags|=1,Ts(e,t,n,r),t.child;case 14:return Ps(e,t,t.type,t.pendingProps,r);case 15:return Ls(e,t,t.type,t.pendingProps,r);case 19:return nl(e,t,r);case 31:return function(e,t,r){var n=t.pendingProps,a=0!==(128&t.flags);if(t.flags&=-129,null===e){if(ua){if("hidden"===n.mode)return e=Bs(t,n),t.lanes=536870912,Is(null,e);if(Oi(t),(e=da)?null!==(e=null!==(e=Cu(e,ha))&&"&"===e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:ra,overflow:na}:null,retryLane:536870912,hydrationErrors:null},(r=Hn(e)).return=t,t.child=r,ca=t,da=null):e=null,null===e)throw fa(t);return t.lanes=536870912,null}return Bs(t,n)}var i=e.memoizedState;if(null!==i){var s=i.dehydrated;if(Oi(t),a)if(256&t.flags)t.flags&=-257,t=Vs(e,t,r);else{if(null===t.memoizedState)throw Error(o(558));t.child=e.child,t.flags|=128,t=null}else if(Fs||Ea(e,t,r,!1),a=0!==(r&e.childLanes),Fs||a){if(null!==(n=fc)&&0!==(s=Oe(n,r))&&s!==i.retryLane)throw i.retryLane=s,Fn(e,s),Gc(n,e,s),Ds;sd(),t=Vs(e,t,r)}else e=i.treeContext,da=Tu(s.nextSibling),ca=t,ua=!0,pa=null,ha=!1,null!==e&&la(t,e),(t=Bs(t,n)).flags|=4096;return t}return(e=Mn(e.child,{mode:n.mode,children:n.children})).ref=t.ref,t.child=e,e.return=t,e}(e,t,r);case 22:return Rs(e,t,r,t.pendingProps);case 24:return Ca(t),n=Da(Ra),null===e?(null===(a=Ya())&&(a=fc,i=Ia(),a.pooledCache=i,i.refCount++,null!==i&&(a.pooledCacheLanes|=r),a=i),t.memoizedState={parent:n,cache:a},gi(t),$a(0,Ra,a)):(0!==(e.lanes&r)&&(xi(e,t),Si(t,null,null,r),wi()),a=e.memoizedState,i=t.memoizedState,a.parent!==n?(a={parent:n,cache:n},t.memoizedState=a,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=a),$a(0,Ra,n)):(n=i.cache,$a(0,Ra,n),n!==a.cache&&Na(t,[Ra],r,!0))),Ts(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function sl(e){e.flags|=4}function ll(e,t,r,n,a){if((t=0!==(32&e.mode))&&(t=!1),t){if(e.flags|=16777216,(335544128&a)===a)if(e.stateNode.complete)e.flags|=8192;else{if(!ad())throw ai=ei,Xa;e.flags|=8192}}else e.flags&=-16777217}function cl(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!ip(t)){if(!ad())throw ai=ei,Xa;e.flags|=8192}}function dl(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?Ae():536870912,e.lanes|=t,Ec|=t)}function ul(e,t){if(!ua)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling;null===r?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;null!==r;)null!==r.alternate&&(n=r),r=r.sibling;null===n?t||null===e.tail?e.tail=null:e.tail.sibling=null:n.sibling=null}}function pl(e){var t=null!==e.alternate&&e.alternate.child===e.child,r=0,n=0;if(t)for(var a=e.child;null!==a;)r|=a.lanes|a.childLanes,n|=65011712&a.subtreeFlags,n|=65011712&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)r|=a.lanes|a.childLanes,n|=a.subtreeFlags,n|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function hl(e,t,r){var n=t.pendingProps;switch(sa(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return pl(t),null;case 3:return r=t.stateNode,n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),za(Ra),G(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(va(t)?sl(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,ya())),pl(t),null;case 26:var a=t.type,i=t.memoizedState;return null===e?(sl(t),null!==i?(pl(t),cl(t,i)):(pl(t),ll(t,a,0,0,r))):i?i!==e.memoizedState?(sl(t),pl(t),cl(t,i)):(pl(t),t.flags&=-16777217):((e=e.memoizedProps)!==n&&sl(t),pl(t),ll(t,a,0,0,r)),null;case 27:if(J(t),r=W.current,a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==n&&sl(t);else{if(!n){if(null===t.stateNode)throw Error(o(166));return pl(t),null}e=K.current,va(t)?ga(t):(e=Ru(a,n,r),t.stateNode=e,sl(t))}return pl(t),null;case 5:if(J(t),a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==n&&sl(t);else{if(!n){if(null===t.stateNode)throw Error(o(166));return pl(t),null}if(i=K.current,va(t))ga(t);else{var s=xu(W.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":(i=s.createElement("div")).innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i="string"===typeof n.is?s.createElement("select",{is:n.is}):s.createElement("select"),n.multiple?i.multiple=!0:n.size&&(i.size=n.size);break;default:i="string"===typeof n.is?s.createElement(a,{is:n.is}):s.createElement(a)}}i[Be]=t,i[Ve]=n;e:for(s=t.child;null!==s;){if(5===s.tag||6===s.tag)i.appendChild(s.stateNode);else if(4!==s.tag&&27!==s.tag&&null!==s.child){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;null===s.sibling;){if(null===s.return||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=i;e:switch(hu(i,a,n),a){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&sl(t)}}return pl(t),ll(t,t.type,null===e||e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==n&&sl(t);else{if("string"!==typeof n&&null===t.stateNode)throw Error(o(166));if(e=W.current,va(t)){if(e=t.stateNode,r=t.memoizedProps,n=null,null!==(a=ca))switch(a.tag){case 27:case 5:n=a.memoizedProps}e[Be]=t,(e=!!(e.nodeValue===r||null!==n&&!0===n.suppressHydrationWarning||du(e.nodeValue,r)))||fa(t,!0)}else(e=xu(e).createTextNode(n))[Be]=t,t.stateNode=e}return pl(t),null;case 31:if(r=t.memoizedState,null===e||null!==e.memoizedState){if(n=va(t),null!==r){if(null===e){if(!n)throw Error(o(318));if(!(e=null!==(e=t.memoizedState)?e.dehydrated:null))throw Error(o(557));e[Be]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;pl(t),e=!1}else r=ya(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return 256&t.flags?(Ri(t),t):(Ri(t),null);if(0!==(128&t.flags))throw Error(o(558))}return pl(t),null;case 13:if(n=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(a=va(t),null!==n&&null!==n.dehydrated){if(null===e){if(!a)throw Error(o(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(o(317));a[Be]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;pl(t),a=!1}else a=ya(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return 256&t.flags?(Ri(t),t):(Ri(t),null)}return Ri(t),0!==(128&t.flags)?(t.lanes=r,t):(r=null!==n,e=null!==e&&null!==e.memoizedState,r&&(a=null,null!==(n=t.child).alternate&&null!==n.alternate.memoizedState&&null!==n.alternate.memoizedState.cachePool&&(a=n.alternate.memoizedState.cachePool.pool),i=null,null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(i=n.memoizedState.cachePool.pool),i!==a&&(n.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),dl(t,t.updateQueue),pl(t),null);case 4:return G(),null===e&&eu(t.stateNode.containerInfo),pl(t),null;case 10:return za(t.type),pl(t),null;case 19:if(M(Ii),null===(n=t.memoizedState))return pl(t),null;if(a=0!==(128&t.flags),null===(i=n.rendering))if(a)ul(n,!1);else{if(0!==Sc||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(i=Mi(e))){for(t.flags|=128,ul(n,!1),e=i.updateQueue,t.updateQueue=e,dl(t,e),t.subtreeFlags=0,e=r,r=t.child;null!==r;)Bn(r,e),r=r.sibling;return B(Ii,1&Ii.current|2),ua&&aa(t,n.treeForkCount),t.child}e=e.sibling}null!==n.tail&&le()>Oc&&(t.flags|=128,a=!0,ul(n,!1),t.lanes=4194304)}else{if(!a)if(null!==(e=Mi(i))){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,dl(t,e),ul(n,!0),null===n.tail&&"hidden"===n.tailMode&&!i.alternate&&!ua)return pl(t),null}else 2*le()-n.renderingStartTime>Oc&&536870912!==r&&(t.flags|=128,a=!0,ul(n,!1),t.lanes=4194304);n.isBackwards?(i.sibling=t.child,t.child=i):(null!==(e=n.last)?e.sibling=i:t.child=i,n.last=i)}return null!==n.tail?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=le(),e.sibling=null,r=Ii.current,B(Ii,a?1&r|2:1&r),ua&&aa(t,n.treeForkCount),e):(pl(t),null);case 22:case 23:return Ri(t),Ci(),n=null!==t.memoizedState,null!==e?null!==e.memoizedState!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?0!==(536870912&r)&&0===(128&t.flags)&&(pl(t),6&t.subtreeFlags&&(t.flags|=8192)):pl(t),null!==(r=t.updateQueue)&&dl(t,r.retryQueue),r=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(r=e.memoizedState.cachePool.pool),n=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(n=t.memoizedState.cachePool.pool),n!==r&&(t.flags|=2048),null!==e&&M(qa),null;case 24:return r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),za(Ra),pl(t),null;case 25:case 30:return null}throw Error(o(156,t.tag))}function ml(e,t){switch(sa(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return za(Ra),G(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return J(t),null;case 31:if(null!==t.memoizedState){if(Ri(t),null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 13:if(Ri(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return M(Ii),null;case 4:return G(),null;case 10:return za(t.type),null;case 22:case 23:return Ri(t),Ci(),null!==e&&M(qa),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return za(Ra),null;default:return null}}function fl(e,t){switch(sa(t),t.tag){case 3:za(Ra),G();break;case 26:case 27:case 5:J(t);break;case 4:G();break;case 31:null!==t.memoizedState&&Ri(t);break;case 13:Ri(t);break;case 19:M(Ii);break;case 10:za(t.type);break;case 22:case 23:Ri(t),Ci(),null!==e&&M(qa);break;case 24:za(Ra)}}function gl(e,t){try{var r=t.updateQueue,n=null!==r?r.lastEffect:null;if(null!==n){var a=n.next;r=a;do{if((r.tag&e)===e){n=void 0;var i=r.create,o=r.inst;n=i(),o.destroy=n}r=r.next}while(r!==a)}}catch(s){Sd(t,t.return,s)}}function xl(e,t,r){try{var n=t.updateQueue,a=null!==n?n.lastEffect:null;if(null!==a){var i=a.next;n=i;do{if((n.tag&e)===e){var o=n.inst,s=o.destroy;if(void 0!==s){o.destroy=void 0,a=t;var l=r,c=s;try{c()}catch(d){Sd(a,l,d)}}}n=n.next}while(n!==i)}}catch(d){Sd(t,t.return,d)}}function vl(e){var t=e.updateQueue;if(null!==t){var r=e.stateNode;try{zi(t,r)}catch(n){Sd(e,e.return,n)}}}function bl(e,t,r){r.props=ws(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(n){Sd(e,t,n)}}function yl(e,t){try{var r=e.ref;if(null!==r){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;default:n=e.stateNode}"function"===typeof r?e.refCleanup=r(n):r.current=n}}catch(a){Sd(e,t,a)}}function kl(e,t){var r=e.ref,n=e.refCleanup;if(null!==r)if("function"===typeof n)try{n()}catch(a){Sd(e,t,a)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof r)try{r(null)}catch(i){Sd(e,t,i)}else r.current=null}function jl(e){var t=e.type,r=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&n.focus();break e;case"img":r.src?n.src=r.src:r.srcSet&&(n.srcset=r.srcSet)}}catch(a){Sd(e,e.return,a)}}function wl(e,t,r){try{var n=e.stateNode;!function(e,t,r,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,s=null,l=null,c=null,d=null,u=null;for(m in r){var p=r[m];if(r.hasOwnProperty(m)&&null!=p)switch(m){case"checked":case"value":break;case"defaultValue":c=p;default:n.hasOwnProperty(m)||uu(e,t,m,null,n,p)}}for(var h in n){var m=n[h];if(p=r[h],n.hasOwnProperty(h)&&(null!=m||null!=p))switch(h){case"type":i=m;break;case"name":a=m;break;case"checked":d=m;break;case"defaultChecked":u=m;break;case"value":s=m;break;case"defaultValue":l=m;break;case"children":case"dangerouslySetInnerHTML":if(null!=m)throw Error(o(137,t));break;default:m!==p&&uu(e,t,h,m,n,p)}}return void vt(e,s,l,c,d,u,i,a);case"select":for(i in m=s=l=h=null,r)if(c=r[i],r.hasOwnProperty(i)&&null!=c)switch(i){case"value":break;case"multiple":m=c;default:n.hasOwnProperty(i)||uu(e,t,i,null,n,c)}for(a in n)if(i=n[a],c=r[a],n.hasOwnProperty(a)&&(null!=i||null!=c))switch(a){case"value":h=i;break;case"defaultValue":l=i;break;case"multiple":s=i;default:i!==c&&uu(e,t,a,i,n,c)}return t=l,r=s,n=m,void(null!=h?kt(e,!!r,h,!1):!!n!==!!r&&(null!=t?kt(e,!!r,t,!0):kt(e,!!r,r?[]:"",!1)));case"textarea":for(l in m=h=null,r)if(a=r[l],r.hasOwnProperty(l)&&null!=a&&!n.hasOwnProperty(l))switch(l){case"value":case"children":break;default:uu(e,t,l,null,n,a)}for(s in n)if(a=n[s],i=r[s],n.hasOwnProperty(s)&&(null!=a||null!=i))switch(s){case"value":h=a;break;case"defaultValue":m=a;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=a)throw Error(o(91));break;default:a!==i&&uu(e,t,s,a,n,i)}return void jt(e,h,m);case"option":for(var f in r)if(h=r[f],r.hasOwnProperty(f)&&null!=h&&!n.hasOwnProperty(f))if("selected"===f)e.selected=!1;else uu(e,t,f,null,n,h);for(c in n)if(h=n[c],m=r[c],n.hasOwnProperty(c)&&h!==m&&(null!=h||null!=m))if("selected"===c)e.selected=h&&"function"!==typeof h&&"symbol"!==typeof h;else uu(e,t,c,h,n,m);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in r)h=r[g],r.hasOwnProperty(g)&&null!=h&&!n.hasOwnProperty(g)&&uu(e,t,g,null,n,h);for(d in n)if(h=n[d],m=r[d],n.hasOwnProperty(d)&&h!==m&&(null!=h||null!=m))switch(d){case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(o(137,t));break;default:uu(e,t,d,h,n,m)}return;default:if(Nt(t)){for(var x in r)h=r[x],r.hasOwnProperty(x)&&void 0!==h&&!n.hasOwnProperty(x)&&pu(e,t,x,void 0,n,h);for(u in n)h=n[u],m=r[u],!n.hasOwnProperty(u)||h===m||void 0===h&&void 0===m||pu(e,t,u,h,n,m);return}}for(var v in r)h=r[v],r.hasOwnProperty(v)&&null!=h&&!n.hasOwnProperty(v)&&uu(e,t,v,null,n,h);for(p in n)h=n[p],m=r[p],!n.hasOwnProperty(p)||h===m||null==h&&null==m||uu(e,t,p,h,n,m)}(n,e.type,r,t),n[Ve]=t}catch(a){Sd(e,e.return,a)}}function Sl(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&_u(e.type)||4===e.tag}function $l(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Sl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&_u(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function zl(e,t,r){var n=e.tag;if(5===n||6===n)e=e.stateNode,t?(9===r.nodeType?r.body:"HTML"===r.nodeName?r.ownerDocument.body:r).insertBefore(e,t):((t=9===r.nodeType?r.body:"HTML"===r.nodeName?r.ownerDocument.body:r).appendChild(e),null!==(r=r._reactRootContainer)&&void 0!==r||null!==t.onclick||(t.onclick=Dt));else if(4!==n&&(27===n&&_u(e.type)&&(r=e.stateNode,t=null),null!==(e=e.child)))for(zl(e,t,r),e=e.sibling;null!==e;)zl(e,t,r),e=e.sibling}function _l(e,t,r){var n=e.tag;if(5===n||6===n)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(4!==n&&(27===n&&_u(e.type)&&(r=e.stateNode),null!==(e=e.child)))for(_l(e,t,r),e=e.sibling;null!==e;)_l(e,t,r),e=e.sibling}function Nl(e){var t=e.stateNode,r=e.memoizedProps;try{for(var n=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);hu(t,n,r),t[Be]=e,t[Ve]=r}catch(i){Sd(e,e.return,i)}}var El=!1,Al=!1,Cl=!1,Dl="function"===typeof WeakSet?WeakSet:Set,Fl=null;function Tl(e,t,r){var n=r.flags;switch(r.tag){case 0:case 11:case 15:Gl(e,r),4&n&&gl(5,r);break;case 1:if(Gl(e,r),4&n)if(e=r.stateNode,null===t)try{e.componentDidMount()}catch(o){Sd(r,r.return,o)}else{var a=ws(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){Sd(r,r.return,s)}}64&n&&vl(r),512&n&&yl(r,r.return);break;case 3:if(Gl(e,r),64&n&&null!==(e=r.updateQueue)){if(t=null,null!==r.child)switch(r.child.tag){case 27:case 5:case 1:t=r.child.stateNode}try{zi(e,t)}catch(o){Sd(r,r.return,o)}}break;case 27:null===t&&4&n&&Nl(r);case 26:case 5:Gl(e,r),null===t&&4&n&&jl(r),512&n&&yl(r,r.return);break;case 12:Gl(e,r);break;case 31:Gl(e,r),4&n&&Ml(e,r);break;case 13:Gl(e,r),4&n&&Bl(e,r),64&n&&(null!==(e=r.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var r=e.ownerDocument;if("$~"===e.data)e._reactRetry=t;else if("$?"!==e.data||"loading"!==r.readyState)t();else{var n=function(){t(),r.removeEventListener("DOMContentLoaded",n)};r.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}(e,r=Nd.bind(null,r))));break;case 22:if(!(n=null!==r.memoizedState||El)){t=null!==t&&null!==t.memoizedState||Al,a=El;var i=Al;El=n,(Al=t)&&!i?Jl(e,r,0!==(8772&r.subtreeFlags)):Gl(e,r),El=a,Al=i}break;case 30:break;default:Gl(e,r)}}function Ol(e){var t=e.alternate;null!==t&&(e.alternate=null,Ol(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Ge(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Pl=null,Ll=!1;function Rl(e,t,r){for(r=r.child;null!==r;)Il(e,t,r),r=r.sibling}function Il(e,t,r){if(ve&&"function"===typeof ve.onCommitFiberUnmount)try{ve.onCommitFiberUnmount(xe,r)}catch(i){}switch(r.tag){case 26:Al||kl(r,t),Rl(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode).parentNode.removeChild(r);break;case 27:Al||kl(r,t);var n=Pl,a=Ll;_u(r.type)&&(Pl=r.stateNode,Ll=!1),Rl(e,t,r),Iu(r.stateNode),Pl=n,Ll=a;break;case 5:Al||kl(r,t);case 6:if(n=Pl,a=Ll,Pl=null,Rl(e,t,r),Ll=a,null!==(Pl=n))if(Ll)try{(9===Pl.nodeType?Pl.body:"HTML"===Pl.nodeName?Pl.ownerDocument.body:Pl).removeChild(r.stateNode)}catch(o){Sd(r,t,o)}else try{Pl.removeChild(r.stateNode)}catch(o){Sd(r,t,o)}break;case 18:null!==Pl&&(Ll?(Nu(9===(e=Pl).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,r.stateNode),Hp(e)):Nu(Pl,r.stateNode));break;case 4:n=Pl,a=Ll,Pl=r.stateNode.containerInfo,Ll=!0,Rl(e,t,r),Pl=n,Ll=a;break;case 0:case 11:case 14:case 15:xl(2,r,t),Al||xl(4,r,t),Rl(e,t,r);break;case 1:Al||(kl(r,t),"function"===typeof(n=r.stateNode).componentWillUnmount&&bl(r,t,n)),Rl(e,t,r);break;case 21:Rl(e,t,r);break;case 22:Al=(n=Al)||null!==r.memoizedState,Rl(e,t,r),Al=n;break;default:Rl(e,t,r)}}function Ml(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&null!==(e=e.memoizedState))){e=e.dehydrated;try{Hp(e)}catch(r){Sd(t,t.return,r)}}}function Bl(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Hp(e)}catch(r){Sd(t,t.return,r)}}function Vl(e,t){var r=function(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new Dl),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new Dl),t;default:throw Error(o(435,e.tag))}}(e);t.forEach(function(t){if(!r.has(t)){r.add(t);var n=Ed.bind(null,e,t);t.then(n,n)}})}function Ul(e,t){var r=t.deletions;if(null!==r)for(var n=0;n<r.length;n++){var a=r[n],i=e,s=t,l=s;e:for(;null!==l;){switch(l.tag){case 27:if(_u(l.type)){Pl=l.stateNode,Ll=!1;break e}break;case 5:Pl=l.stateNode,Ll=!1;break e;case 3:case 4:Pl=l.stateNode.containerInfo,Ll=!0;break e}l=l.return}if(null===Pl)throw Error(o(160));Il(i,s,a),Pl=null,Ll=!1,null!==(i=a.alternate)&&(i.return=null),a.return=null}if(13886&t.subtreeFlags)for(t=t.child;null!==t;)Hl(t,e),t=t.sibling}var Kl=null;function Hl(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ul(t,e),Wl(e),4&n&&(xl(3,e,e.return),gl(3,e),xl(5,e,e.return));break;case 1:Ul(t,e),Wl(e),512&n&&(Al||null===r||kl(r,r.return)),64&n&&El&&(null!==(e=e.updateQueue)&&(null!==(n=e.callbacks)&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===r?n:r.concat(n))));break;case 26:var a=Kl;if(Ul(t,e),Wl(e),512&n&&(Al||null===r||kl(r,r.return)),4&n){var i=null!==r?r.memoizedState:null;if(n=e.memoizedState,null===r)if(null===n)if(null===e.stateNode){e:{n=e.type,r=e.memoizedProps,a=a.ownerDocument||a;t:switch(n){case"title":(!(i=a.getElementsByTagName("title")[0])||i[Ye]||i[Be]||"http://www.w3.org/2000/svg"===i.namespaceURI||i.hasAttribute("itemprop"))&&(i=a.createElement(n),a.head.insertBefore(i,a.querySelector("head > title"))),hu(i,n,r),i[Be]=e,et(i),n=i;break e;case"link":var s=np("link","href",a).get(n+(r.href||""));if(s)for(var l=0;l<s.length;l++)if((i=s[l]).getAttribute("href")===(null==r.href||""===r.href?null:r.href)&&i.getAttribute("rel")===(null==r.rel?null:r.rel)&&i.getAttribute("title")===(null==r.title?null:r.title)&&i.getAttribute("crossorigin")===(null==r.crossOrigin?null:r.crossOrigin)){s.splice(l,1);break t}hu(i=a.createElement(n),n,r),a.head.appendChild(i);break;case"meta":if(s=np("meta","content",a).get(n+(r.content||"")))for(l=0;l<s.length;l++)if((i=s[l]).getAttribute("content")===(null==r.content?null:""+r.content)&&i.getAttribute("name")===(null==r.name?null:r.name)&&i.getAttribute("property")===(null==r.property?null:r.property)&&i.getAttribute("http-equiv")===(null==r.httpEquiv?null:r.httpEquiv)&&i.getAttribute("charset")===(null==r.charSet?null:r.charSet)){s.splice(l,1);break t}hu(i=a.createElement(n),n,r),a.head.appendChild(i);break;default:throw Error(o(468,n))}i[Be]=e,et(i),n=i}e.stateNode=n}else ap(a,e.type,e.stateNode);else e.stateNode=Xu(a,n,e.memoizedProps);else i!==n?(null===i?null!==r.stateNode&&(r=r.stateNode).parentNode.removeChild(r):i.count--,null===n?ap(a,e.type,e.stateNode):Xu(a,n,e.memoizedProps)):null===n&&null!==e.stateNode&&wl(e,e.memoizedProps,r.memoizedProps)}break;case 27:Ul(t,e),Wl(e),512&n&&(Al||null===r||kl(r,r.return)),null!==r&&4&n&&wl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Ul(t,e),Wl(e),512&n&&(Al||null===r||kl(r,r.return)),32&e.flags){a=e.stateNode;try{St(a,"")}catch(f){Sd(e,e.return,f)}}4&n&&null!=e.stateNode&&wl(e,a=e.memoizedProps,null!==r?r.memoizedProps:a),1024&n&&(Cl=!0);break;case 6:if(Ul(t,e),Wl(e),4&n){if(null===e.stateNode)throw Error(o(162));n=e.memoizedProps,r=e.stateNode;try{r.nodeValue=n}catch(f){Sd(e,e.return,f)}}break;case 3:if(rp=null,a=Kl,Kl=Vu(t.containerInfo),Ul(t,e),Kl=a,Wl(e),4&n&&null!==r&&r.memoizedState.isDehydrated)try{Hp(t.containerInfo)}catch(f){Sd(e,e.return,f)}Cl&&(Cl=!1,Yl(e));break;case 4:n=Kl,Kl=Vu(e.stateNode.containerInfo),Ul(t,e),Wl(e),Kl=n;break;case 12:default:Ul(t,e),Wl(e);break;case 31:case 19:Ul(t,e),Wl(e),4&n&&(null!==(n=e.updateQueue)&&(e.updateQueue=null,Vl(e,n)));break;case 13:Ul(t,e),Wl(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==r&&null!==r.memoizedState)&&(Fc=le()),4&n&&(null!==(n=e.updateQueue)&&(e.updateQueue=null,Vl(e,n)));break;case 22:a=null!==e.memoizedState;var c=null!==r&&null!==r.memoizedState,d=El,u=Al;if(El=d||a,Al=u||c,Ul(t,e),Al=u,El=d,Wl(e),8192&n)e:for(t=e.stateNode,t._visibility=a?-2&t._visibility:1|t._visibility,a&&(null===r||c||El||Al||Ql(e)),r=null,t=e;;){if(5===t.tag||26===t.tag){if(null===r){c=r=t;try{if(i=c.stateNode,a)"function"===typeof(s=i.style).setProperty?s.setProperty("display","none","important"):s.display="none";else{l=c.stateNode;var p=c.memoizedProps.style,h=void 0!==p&&null!==p&&p.hasOwnProperty("display")?p.display:null;l.style.display=null==h||"boolean"===typeof h?"":(""+h).trim()}}catch(f){Sd(c,c.return,f)}}}else if(6===t.tag){if(null===r){c=t;try{c.stateNode.nodeValue=a?"":c.memoizedProps}catch(f){Sd(c,c.return,f)}}}else if(18===t.tag){if(null===r){c=t;try{var m=c.stateNode;a?Eu(m,!0):Eu(c.stateNode,!1)}catch(f){Sd(c,c.return,f)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}4&n&&(null!==(n=e.updateQueue)&&(null!==(r=n.retryQueue)&&(n.retryQueue=null,Vl(e,r))));case 30:case 21:}}function Wl(e){var t=e.flags;if(2&t){try{for(var r,n=e.return;null!==n;){if(Sl(n)){r=n;break}n=n.return}if(null==r)throw Error(o(160));switch(r.tag){case 27:var a=r.stateNode;_l(e,$l(e),a);break;case 5:var i=r.stateNode;32&r.flags&&(St(i,""),r.flags&=-33),_l(e,$l(e),i);break;case 3:case 4:var s=r.stateNode.containerInfo;zl(e,$l(e),s);break;default:throw Error(o(161))}}catch(l){Sd(e,e.return,l)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Yl(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Yl(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Gl(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Tl(e,t.alternate,t),t=t.sibling}function Ql(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:xl(4,t,t.return),Ql(t);break;case 1:kl(t,t.return);var r=t.stateNode;"function"===typeof r.componentWillUnmount&&bl(t,t.return,r),Ql(t);break;case 27:Iu(t.stateNode);case 26:case 5:kl(t,t.return),Ql(t);break;case 22:null===t.memoizedState&&Ql(t);break;default:Ql(t)}e=e.sibling}}function Jl(e,t,r){for(r=r&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var n=t.alternate,a=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:Jl(a,i,r),gl(4,i);break;case 1:if(Jl(a,i,r),"function"===typeof(a=(n=i).stateNode).componentDidMount)try{a.componentDidMount()}catch(c){Sd(n,n.return,c)}if(null!==(a=(n=i).updateQueue)){var s=n.stateNode;try{var l=a.shared.hiddenCallbacks;if(null!==l)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)$i(l[a],s)}catch(c){Sd(n,n.return,c)}}r&&64&o&&vl(i),yl(i,i.return);break;case 27:Nl(i);case 26:case 5:Jl(a,i,r),r&&null===n&&4&o&&jl(i),yl(i,i.return);break;case 12:Jl(a,i,r);break;case 31:Jl(a,i,r),r&&4&o&&Ml(a,i);break;case 13:Jl(a,i,r),r&&4&o&&Bl(a,i);break;case 22:null===i.memoizedState&&Jl(a,i,r),yl(i,i.return);break;case 30:break;default:Jl(a,i,r)}t=t.sibling}}function Xl(e,t){var r=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(r=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==r&&(null!=e&&e.refCount++,null!=r&&Ma(r))}function Zl(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ma(e))}function ec(e,t,r,n){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)tc(e,t,r,n),t=t.sibling}function tc(e,t,r,n){var a=t.flags;switch(t.tag){case 0:case 11:case 15:ec(e,t,r,n),2048&a&&gl(9,t);break;case 1:case 31:case 13:default:ec(e,t,r,n);break;case 3:ec(e,t,r,n),2048&a&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ma(e)));break;case 12:if(2048&a){ec(e,t,r,n),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,s=i.onPostCommit;"function"===typeof s&&s(o,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(l){Sd(t,t.return,l)}}else ec(e,t,r,n);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,null!==t.memoizedState?2&i._visibility?ec(e,t,r,n):nc(e,t):2&i._visibility?ec(e,t,r,n):(i._visibility|=2,rc(e,t,r,n,0!==(10256&t.subtreeFlags)||!1)),2048&a&&Xl(o,t);break;case 24:ec(e,t,r,n),2048&a&&Zl(t.alternate,t)}}function rc(e,t,r,n,a){for(a=a&&(0!==(10256&t.subtreeFlags)||!1),t=t.child;null!==t;){var i=e,o=t,s=r,l=n,c=o.flags;switch(o.tag){case 0:case 11:case 15:rc(i,o,s,l,a),gl(8,o);break;case 23:break;case 22:var d=o.stateNode;null!==o.memoizedState?2&d._visibility?rc(i,o,s,l,a):nc(i,o):(d._visibility|=2,rc(i,o,s,l,a)),a&&2048&c&&Xl(o.alternate,o);break;case 24:rc(i,o,s,l,a),a&&2048&c&&Zl(o.alternate,o);break;default:rc(i,o,s,l,a)}t=t.sibling}}function nc(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var r=e,n=t,a=n.flags;switch(n.tag){case 22:nc(r,n),2048&a&&Xl(n.alternate,n);break;case 24:nc(r,n),2048&a&&Zl(n.alternate,n);break;default:nc(r,n)}t=t.sibling}}var ac=8192;function ic(e,t,r){if(e.subtreeFlags&ac)for(e=e.child;null!==e;)oc(e,t,r),e=e.sibling}function oc(e,t,r){switch(e.tag){case 26:ic(e,t,r),e.flags&ac&&null!==e.memoizedState&&function(e,t,r,n){if("stylesheet"===r.type&&("string"!==typeof n.media||!1!==matchMedia(n.media).matches)&&0===(4&r.state.loading)){if(null===r.instance){var a=qu(n.href),i=t.querySelector(Yu(a));if(i)return null!==(t=i._p)&&"object"===typeof t&&"function"===typeof t.then&&(e.count++,e=sp.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=i,void et(i);i=t.ownerDocument||t,n=Gu(n),(a=Mu.get(a))&&ep(n,a),et(i=i.createElement("link"));var o=i;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),hu(i,"link",n),r.instance=i}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&0===(3&r.state.loading)&&(e.count++,r=sp.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}(r,Kl,e.memoizedState,e.memoizedProps);break;case 5:default:ic(e,t,r);break;case 3:case 4:var n=Kl;Kl=Vu(e.stateNode.containerInfo),ic(e,t,r),Kl=n;break;case 22:null===e.memoizedState&&(null!==(n=e.alternate)&&null!==n.memoizedState?(n=ac,ac=16777216,ic(e,t,r),ac=n):ic(e,t,r))}}function sc(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function lc(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var r=0;r<t.length;r++){var n=t[r];Fl=n,uc(n,e)}sc(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)cc(e),e=e.sibling}function cc(e){switch(e.tag){case 0:case 11:case 15:lc(e),2048&e.flags&&xl(9,e,e.return);break;case 3:case 12:default:lc(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,dc(e)):lc(e)}}function dc(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var r=0;r<t.length;r++){var n=t[r];Fl=n,uc(n,e)}sc(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:xl(8,t,t.return),dc(t);break;case 22:2&(r=t.stateNode)._visibility&&(r._visibility&=-3,dc(t));break;default:dc(t)}e=e.sibling}}function uc(e,t){for(;null!==Fl;){var r=Fl;switch(r.tag){case 0:case 11:case 15:xl(8,r,t);break;case 23:case 22:if(null!==r.memoizedState&&null!==r.memoizedState.cachePool){var n=r.memoizedState.cachePool.pool;null!=n&&n.refCount++}break;case 24:Ma(r.memoizedState.cache)}if(null!==(n=r.child))n.return=r,Fl=n;else e:for(r=e;null!==Fl;){var a=(n=Fl).sibling,i=n.return;if(Ol(n),n===r){Fl=null;break e}if(null!==a){a.return=i,Fl=a;break e}Fl=i}}}var pc={getCacheForType:function(e){var t=Da(Ra),r=t.data.get(e);return void 0===r&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return Da(Ra).controller.signal}},hc="function"===typeof WeakMap?WeakMap:Map,mc=0,fc=null,gc=null,xc=0,vc=0,bc=null,yc=!1,kc=!1,jc=!1,wc=0,Sc=0,$c=0,zc=0,_c=0,Nc=0,Ec=0,Ac=null,Cc=null,Dc=!1,Fc=0,Tc=0,Oc=1/0,Pc=null,Lc=null,Rc=0,Ic=null,Mc=null,Bc=0,Vc=0,Uc=null,Kc=null,Hc=0,Wc=null;function qc(){return 0!==(2&mc)&&0!==xc?xc&-xc:null!==T.T?Ud():Re()}function Yc(){if(0===Nc)if(0===(536870912&xc)||ua){var e=Se;0===(3932160&(Se<<=1))&&(Se=262144),Nc=e}else Nc=536870912;return null!==(e=Di.current)&&(e.flags|=32),Nc}function Gc(e,t,r){(e!==fc||2!==vc&&9!==vc)&&null===e.cancelPendingCommit||(rd(e,0),Zc(e,xc,Nc,!1)),De(e,r),0!==(2&mc)&&e===fc||(e===fc&&(0===(2&mc)&&(zc|=r),4===Sc&&Zc(e,xc,Nc,!1)),Pd(e))}function Qc(e,t,r){if(0!==(6&mc))throw Error(o(327));for(var n=!r&&0===(127&t)&&0===(t&e.expiredLanes)||Ne(e,t),a=n?function(e,t){var r=mc;mc|=2;var n=id(),a=od();fc!==e||xc!==t?(Pc=null,Oc=le()+500,rd(e,t)):kc=Ne(e,t);e:for(;;)try{if(0!==vc&&null!==gc){t=gc;var i=bc;t:switch(vc){case 1:vc=0,bc=null,hd(e,t,i,1);break;case 2:case 9:if(ti(i)){vc=0,bc=null,pd(t);break}t=function(){2!==vc&&9!==vc||fc!==e||(vc=7),Pd(e)},i.then(t,t);break e;case 3:vc=7;break e;case 4:vc=5;break e;case 7:ti(i)?(vc=0,bc=null,pd(t)):(vc=0,bc=null,hd(e,t,i,7));break;case 5:var s=null;switch(gc.tag){case 26:s=gc.memoizedState;case 5:case 27:var l=gc;if(s?ip(s):l.stateNode.complete){vc=0,bc=null;var c=l.sibling;if(null!==c)gc=c;else{var d=l.return;null!==d?(gc=d,md(d)):gc=null}break t}}vc=0,bc=null,hd(e,t,i,5);break;case 6:vc=0,bc=null,hd(e,t,i,6);break;case 8:td(),Sc=6;break e;default:throw Error(o(462))}}dd();break}catch(u){nd(e,u)}return Sa=wa=null,T.H=n,T.A=a,mc=r,null!==gc?0:(fc=null,xc=0,An(),Sc)}(e,t):ld(e,t,!0),i=n;;){if(0===a){kc&&!n&&Zc(e,t,0,!1);break}if(r=e.current.alternate,!i||Xc(r)){if(2===a){if(i=t,e.errorRecoveryDisabledLanes&i)var s=0;else s=0!==(s=-536870913&e.pendingLanes)?s:536870912&s?536870912:0;if(0!==s){t=s;e:{var l=e;a=Ac;var c=l.current.memoizedState.isDehydrated;if(c&&(rd(l,s).flags|=256),2!==(s=ld(l,s,!1))){if(jc&&!c){l.errorRecoveryDisabledLanes|=i,zc|=i,a=4;break e}i=Cc,Cc=a,null!==i&&(null===Cc?Cc=i:Cc.push.apply(Cc,i))}a=s}if(i=!1,2!==a)continue}}if(1===a){rd(e,0),Zc(e,t,0,!0);break}e:{switch(n=e,i=a){case 0:case 1:throw Error(o(345));case 4:if((4194048&t)!==t)break;case 6:Zc(n,t,Nc,!yc);break e;case 2:Cc=null;break;case 3:case 5:break;default:throw Error(o(329))}if((62914560&t)===t&&10<(a=Fc+300-le())){if(Zc(n,t,Nc,!yc),0!==_e(n,0,!0))break e;Bc=t,n.timeoutHandle=ju(Jc.bind(null,n,r,Cc,Pc,Dc,t,Nc,zc,Ec,yc,i,"Throttled",-0,0),a)}else Jc(n,r,Cc,Pc,Dc,t,Nc,zc,Ec,yc,i,null,-0,0)}break}a=ld(e,t,!1),i=!1}Pd(e)}function Jc(e,t,r,n,a,i,o,s,l,c,d,u,p,h){if(e.timeoutHandle=-1,8192&(u=t.subtreeFlags)||16785408===(16785408&u)){oc(t,i,u={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Dt});var m=(62914560&i)===i?Fc-le():(4194048&i)===i?Tc-le():0;if(null!==(m=function(e,t){return e.stylesheets&&0===e.count&&cp(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var n=setTimeout(function(){if(e.stylesheets&&cp(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&0===op&&(op=62500*function(){if("function"===typeof performance.getEntriesByType){for(var e=0,t=0,r=performance.getEntriesByType("resource"),n=0;n<r.length;n++){var a=r[n],i=a.transferSize,o=a.initiatorType,s=a.duration;if(i&&s&&mu(o)){for(o=0,s=a.responseEnd,n+=1;n<r.length;n++){var l=r[n],c=l.startTime;if(c>s)break;var d=l.transferSize,u=l.initiatorType;d&&mu(u)&&(o+=d*((l=l.responseEnd)<s?1:(s-c)/(l-c)))}if(--n,t+=8*(i+o)/(a.duration/1e3),10<++e)break}}if(0<e)return t/e/1e6}return navigator.connection&&"number"===typeof(e=navigator.connection.downlink)?e:5}());var a=setTimeout(function(){if(e.waitingForImages=!1,0===e.count&&(e.stylesheets&&cp(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>op?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(a)}}:null}(u,m)))return Bc=i,e.cancelPendingCommit=m(gd.bind(null,e,t,i,r,n,a,o,s,l,d,u,null,p,h)),void Zc(e,i,o,!c)}gd(e,t,i,r,n,a,o,s,l)}function Xc(e){for(var t=e;;){var r=t.tag;if((0===r||11===r||15===r)&&16384&t.flags&&(null!==(r=t.updateQueue)&&null!==(r=r.stores)))for(var n=0;n<r.length;n++){var a=r[n],i=a.getSnapshot;a=a.value;try{if(!Jr(i(),a))return!1}catch(o){return!1}}if(r=t.child,16384&t.subtreeFlags&&null!==r)r.return=t,t=r;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zc(e,t,r,n){t&=~_c,t&=~zc,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var a=t;0<a;){var i=31-ye(a),o=1<<i;n[i]=-1,a&=~o}0!==r&&Fe(e,r,t)}function ed(){return 0!==(6&mc)||(Ld(0,!1),!1)}function td(){if(null!==gc){if(0===vc)var e=gc.return;else Sa=wa=null,oo(e=gc),si=null,li=0,e=gc;for(;null!==e;)fl(e.alternate,e),e=e.return;gc=null}}function rd(e,t){var r=e.timeoutHandle;-1!==r&&(e.timeoutHandle=-1,wu(r)),null!==(r=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,r()),Bc=0,td(),fc=e,gc=r=Mn(e.current,null),xc=t,vc=0,bc=null,yc=!1,kc=Ne(e,t),jc=!1,Ec=Nc=_c=zc=$c=Sc=0,Cc=Ac=null,Dc=!1,0!==(8&t)&&(t|=32&t);var n=e.entangledLanes;if(0!==n)for(e=e.entanglements,n&=t;0<n;){var a=31-ye(n),i=1<<a;t|=e[a],n&=~i}return wc=t,An(),r}function nd(e,t){Vi=null,T.H=fs,t===Ja||t===Za?(t=ii(),vc=3):t===Xa?(t=ii(),vc=4):vc=t===Ds?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,bc=t,null===gc&&(Sc=1,_s(e,Yn(t,e.current)))}function ad(){var e=Di.current;return null===e||((4194048&xc)===xc?null===Fi:((62914560&xc)===xc||0!==(536870912&xc))&&e===Fi)}function id(){var e=T.H;return T.H=fs,null===e?fs:e}function od(){var e=T.A;return T.A=pc,e}function sd(){Sc=4,yc||(4194048&xc)!==xc&&null!==Di.current||(kc=!0),0===(134217727&$c)&&0===(134217727&zc)||null===fc||Zc(fc,xc,Nc,!1)}function ld(e,t,r){var n=mc;mc|=2;var a=id(),i=od();fc===e&&xc===t||(Pc=null,rd(e,t)),t=!1;var o=Sc;e:for(;;)try{if(0!==vc&&null!==gc){var s=gc,l=bc;switch(vc){case 8:td(),o=6;break e;case 3:case 2:case 9:case 6:null===Di.current&&(t=!0);var c=vc;if(vc=0,bc=null,hd(e,s,l,c),r&&kc){o=0;break e}break;default:c=vc,vc=0,bc=null,hd(e,s,l,c)}}cd(),o=Sc;break}catch(d){nd(e,d)}return t&&e.shellSuspendCounter++,Sa=wa=null,mc=n,T.H=a,T.A=i,null===gc&&(fc=null,xc=0,An()),o}function cd(){for(;null!==gc;)ud(gc)}function dd(){for(;null!==gc&&!oe();)ud(gc)}function ud(e){var t=ol(e.alternate,e,wc);e.memoizedProps=e.pendingProps,null===t?md(e):gc=t}function pd(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=Hs(r,t,t.pendingProps,t.type,void 0,xc);break;case 11:t=Hs(r,t,t.pendingProps,t.type.render,t.ref,xc);break;case 5:oo(t);default:fl(r,t),t=ol(r,t=gc=Bn(t,wc),wc)}e.memoizedProps=e.pendingProps,null===t?md(e):gc=t}function hd(e,t,r,n){Sa=wa=null,oo(t),si=null,li=0;var a=t.return;try{if(function(e,t,r,n,a){if(r.flags|=32768,null!==n&&"object"===typeof n&&"function"===typeof n.then){if(null!==(t=r.alternate)&&Ea(t,r,a,!0),null!==(r=Di.current)){switch(r.tag){case 31:case 13:return null===Fi?sd():null===r.alternate&&0===Sc&&(Sc=3),r.flags&=-257,r.flags|=65536,r.lanes=a,n===ei?r.flags|=16384:(null===(t=r.updateQueue)?r.updateQueue=new Set([n]):t.add(n),$d(e,n,a)),!1;case 22:return r.flags|=65536,n===ei?r.flags|=16384:(null===(t=r.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},r.updateQueue=t):null===(r=t.retryQueue)?t.retryQueue=new Set([n]):r.add(n),$d(e,n,a)),!1}throw Error(o(435,r.tag))}return $d(e,n,a),sd(),!1}if(ua)return null!==(t=Di.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=a,n!==ma&&ka(Yn(e=Error(o(422),{cause:n}),r))):(n!==ma&&ka(Yn(t=Error(o(423),{cause:n}),r)),(e=e.current.alternate).flags|=65536,a&=-a,e.lanes|=a,n=Yn(n,r),ki(e,a=Es(e.stateNode,n,a)),4!==Sc&&(Sc=2)),!1;var i=Error(o(520),{cause:n});if(i=Yn(i,r),null===Ac?Ac=[i]:Ac.push(i),4!==Sc&&(Sc=2),null===t)return!0;n=Yn(n,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=a&-a,r.lanes|=e,ki(r,e=Es(r.stateNode,n,e)),!1;case 1:if(t=r.type,i=r.stateNode,0===(128&r.flags)&&("function"===typeof t.getDerivedStateFromError||null!==i&&"function"===typeof i.componentDidCatch&&(null===Lc||!Lc.has(i))))return r.flags|=65536,a&=-a,r.lanes|=a,Cs(a=As(a),e,r,n),ki(r,a),!1}r=r.return}while(null!==r);return!1}(e,a,t,r,xc))return Sc=1,_s(e,Yn(r,e.current)),void(gc=null)}catch(i){if(null!==a)throw gc=a,i;return Sc=1,_s(e,Yn(r,e.current)),void(gc=null)}32768&t.flags?(ua||1===n?e=!0:kc||0!==(536870912&xc)?e=!1:(yc=e=!0,(2===n||9===n||3===n||6===n)&&(null!==(n=Di.current)&&13===n.tag&&(n.flags|=16384))),fd(t,e)):md(t)}function md(e){var t=e;do{if(0!==(32768&t.flags))return void fd(t,yc);e=t.return;var r=hl(t.alternate,t,wc);if(null!==r)return void(gc=r);if(null!==(t=t.sibling))return void(gc=t);gc=t=e}while(null!==t);0===Sc&&(Sc=5)}function fd(e,t){do{var r=ml(e.alternate,e);if(null!==r)return r.flags&=32767,void(gc=r);if(null!==(r=e.return)&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&null!==(e=e.sibling))return void(gc=e);gc=e=r}while(null!==e);Sc=6,gc=null}function gd(e,t,r,n,a,i,s,l,c){e.cancelPendingCommit=null;do{kd()}while(0!==Rc);if(0!==(6&mc))throw Error(o(327));if(null!==t){if(t===e.current)throw Error(o(177));if(i=t.lanes|t.childLanes,function(e,t,r,n,a,i){var o=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var s=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(r=o&~r;0<r;){var d=31-ye(r),u=1<<d;s[d]=0,l[d]=-1;var p=c[d];if(null!==p)for(c[d]=null,d=0;d<p.length;d++){var h=p[d];null!==h&&(h.lane&=-536870913)}r&=~u}0!==n&&Fe(e,n,0),0!==i&&0===a&&0!==e.tag&&(e.suspendedLanes|=i&~(o&~t))}(e,r,i|=En,s,l,c),e===fc&&(gc=fc=null,xc=0),Mc=t,Ic=e,Bc=r,Vc=i,Uc=a,Kc=n,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,ae(pe,function(){return jd(),null})):(e.callbackNode=null,e.callbackPriority=0),n=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||n){n=T.T,T.T=null,a=O.p,O.p=2,s=mc,mc|=4;try{!function(e,t){if(e=e.containerInfo,fu=yp,nn(e=rn(e))){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{var n=(r=(r=e.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection();if(n&&0!==n.rangeCount){r=n.anchorNode;var a=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch(g){r=null;break e}var s=0,l=-1,c=-1,d=0,u=0,p=e,h=null;t:for(;;){for(var m;p!==r||0!==a&&3!==p.nodeType||(l=s+a),p!==i||0!==n&&3!==p.nodeType||(c=s+n),3===p.nodeType&&(s+=p.nodeValue.length),null!==(m=p.firstChild);)h=p,p=m;for(;;){if(p===e)break t;if(h===r&&++d===a&&(l=s),h===i&&++u===n&&(c=s),null!==(m=p.nextSibling))break;h=(p=h).parentNode}p=m}r=-1===l||-1===c?null:{start:l,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(gu={focusedElem:e,selectionRange:r},yp=!1,Fl=t;null!==Fl;)if(e=(t=Fl).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Fl=e;else for(;null!==Fl;){switch(i=(t=Fl).alternate,e=t.flags,t.tag){case 0:if(0!==(4&e)&&null!==(e=null!==(e=t.updateQueue)?e.events:null))for(r=0;r<e.length;r++)(a=e[r]).ref.impl=a.nextImpl;break;case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==i){e=void 0,r=t,a=i.memoizedProps,i=i.memoizedState,n=r.stateNode;try{var f=ws(r.type,a);e=n.getSnapshotBeforeUpdate(f,i),n.__reactInternalSnapshotBeforeUpdate=e}catch(x){Sd(r,r.return,x)}}break;case 3:if(0!==(1024&e))if(9===(r=(e=t.stateNode.containerInfo).nodeType))Au(e);else if(1===r)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Au(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(o(163))}if(null!==(e=t.sibling)){e.return=t.return,Fl=e;break}Fl=t.return}}(e,t)}finally{mc=s,O.p=a,T.T=n}}Rc=1,xd(),vd(),bd()}}function xd(){if(1===Rc){Rc=0;var e=Ic,t=Mc,r=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||r){r=T.T,T.T=null;var n=O.p;O.p=2;var a=mc;mc|=4;try{Hl(t,e);var i=gu,o=rn(e.containerInfo),s=i.focusedElem,l=i.selectionRange;if(o!==s&&s&&s.ownerDocument&&tn(s.ownerDocument.documentElement,s)){if(null!==l&&nn(s)){var c=l.start,d=l.end;if(void 0===d&&(d=c),"selectionStart"in s)s.selectionStart=c,s.selectionEnd=Math.min(d,s.value.length);else{var u=s.ownerDocument||document,p=u&&u.defaultView||window;if(p.getSelection){var h=p.getSelection(),m=s.textContent.length,f=Math.min(l.start,m),g=void 0===l.end?f:Math.min(l.end,m);!h.extend&&f>g&&(o=g,g=f,f=o);var x=en(s,f),v=en(s,g);if(x&&v&&(1!==h.rangeCount||h.anchorNode!==x.node||h.anchorOffset!==x.offset||h.focusNode!==v.node||h.focusOffset!==v.offset)){var b=u.createRange();b.setStart(x.node,x.offset),h.removeAllRanges(),f>g?(h.addRange(b),h.extend(v.node,v.offset)):(b.setEnd(v.node,v.offset),h.addRange(b))}}}}for(u=[],h=s;h=h.parentNode;)1===h.nodeType&&u.push({element:h,left:h.scrollLeft,top:h.scrollTop});for("function"===typeof s.focus&&s.focus(),s=0;s<u.length;s++){var y=u[s];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}yp=!!fu,gu=fu=null}finally{mc=a,O.p=n,T.T=r}}e.current=t,Rc=2}}function vd(){if(2===Rc){Rc=0;var e=Ic,t=Mc,r=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||r){r=T.T,T.T=null;var n=O.p;O.p=2;var a=mc;mc|=4;try{Tl(e,t.alternate,t)}finally{mc=a,O.p=n,T.T=r}}Rc=3}}function bd(){if(4===Rc||3===Rc){Rc=0,se();var e=Ic,t=Mc,r=Bc,n=Kc;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Rc=5:(Rc=0,Mc=Ic=null,yd(e,e.pendingLanes));var a=e.pendingLanes;if(0===a&&(Lc=null),Le(r),t=t.stateNode,ve&&"function"===typeof ve.onCommitFiberRoot)try{ve.onCommitFiberRoot(xe,t,void 0,128===(128&t.current.flags))}catch(l){}if(null!==n){t=T.T,a=O.p,O.p=2,T.T=null;try{for(var i=e.onRecoverableError,o=0;o<n.length;o++){var s=n[o];i(s.value,{componentStack:s.stack})}}finally{T.T=t,O.p=a}}0!==(3&Bc)&&kd(),Pd(e),a=e.pendingLanes,0!==(261930&r)&&0!==(42&a)?e===Wc?Hc++:(Hc=0,Wc=e):Hc=0,Ld(0,!1)}}function yd(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Ma(t)))}function kd(){return xd(),vd(),bd(),jd()}function jd(){if(5!==Rc)return!1;var e=Ic,t=Vc;Vc=0;var r=Le(Bc),n=T.T,a=O.p;try{O.p=32>r?32:r,T.T=null,r=Uc,Uc=null;var i=Ic,s=Bc;if(Rc=0,Mc=Ic=null,Bc=0,0!==(6&mc))throw Error(o(331));var l=mc;if(mc|=4,cc(i.current),tc(i,i.current,s,r),mc=l,Ld(0,!1),ve&&"function"===typeof ve.onPostCommitFiberRoot)try{ve.onPostCommitFiberRoot(xe,i)}catch(c){}return!0}finally{O.p=a,T.T=n,yd(e,t)}}function wd(e,t,r){t=Yn(r,t),null!==(e=bi(e,t=Es(e.stateNode,t,2),2))&&(De(e,2),Pd(e))}function Sd(e,t,r){if(3===e.tag)wd(e,e,r);else for(;null!==t;){if(3===t.tag){wd(t,e,r);break}if(1===t.tag){var n=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof n.componentDidCatch&&(null===Lc||!Lc.has(n))){e=Yn(r,e),null!==(n=bi(t,r=As(2),2))&&(Cs(r,n,t,e),De(n,2),Pd(n));break}}t=t.return}}function $d(e,t,r){var n=e.pingCache;if(null===n){n=e.pingCache=new hc;var a=new Set;n.set(t,a)}else void 0===(a=n.get(t))&&(a=new Set,n.set(t,a));a.has(r)||(jc=!0,a.add(r),e=zd.bind(null,e,t,r),t.then(e,e))}function zd(e,t,r){var n=e.pingCache;null!==n&&n.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,fc===e&&(xc&r)===r&&(4===Sc||3===Sc&&(62914560&xc)===xc&&300>le()-Fc?0===(2&mc)&&rd(e,0):_c|=r,Ec===xc&&(Ec=0)),Pd(e)}function _d(e,t){0===t&&(t=Ae()),null!==(e=Fn(e,t))&&(De(e,t),Pd(e))}function Nd(e){var t=e.memoizedState,r=0;null!==t&&(r=t.retryLane),_d(e,r)}function Ed(e,t){var r=0;switch(e.tag){case 31:case 13:var n=e.stateNode,a=e.memoizedState;null!==a&&(r=a.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(o(314))}null!==n&&n.delete(t),_d(e,r)}var Ad=null,Cd=null,Dd=!1,Fd=!1,Td=!1,Od=0;function Pd(e){e!==Cd&&null===e.next&&(null===Cd?Ad=Cd=e:Cd=Cd.next=e),Fd=!0,Dd||(Dd=!0,$u(function(){0!==(6&mc)?ae(de,Rd):Id()}))}function Ld(e,t){if(!Td&&Fd){Td=!0;do{for(var r=!1,n=Ad;null!==n;){if(!t)if(0!==e){var a=n.pendingLanes;if(0===a)var i=0;else{var o=n.suspendedLanes,s=n.pingedLanes;i=(1<<31-ye(42|e)+1)-1,i=201326741&(i&=a&~(o&~s))?201326741&i|1:i?2|i:0}0!==i&&(r=!0,Vd(n,i))}else i=xc,0===(3&(i=_e(n,n===fc?i:0,null!==n.cancelPendingCommit||-1!==n.timeoutHandle)))||Ne(n,i)||(r=!0,Vd(n,i));n=n.next}}while(r);Td=!1}}function Rd(){Id()}function Id(){Fd=Dd=!1;var e=0;0!==Od&&function(){var e=window.event;if(e&&"popstate"===e.type)return e!==ku&&(ku=e,!0);return ku=null,!1}()&&(e=Od);for(var t=le(),r=null,n=Ad;null!==n;){var a=n.next,i=Md(n,t);0===i?(n.next=null,null===r?Ad=a:r.next=a,null===a&&(Cd=r)):(r=n,(0!==e||0!==(3&i))&&(Fd=!0)),n=a}0!==Rc&&5!==Rc||Ld(e,!1),0!==Od&&(Od=0)}function Md(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,a=e.expirationTimes,i=-62914561&e.pendingLanes;0<i;){var o=31-ye(i),s=1<<o,l=a[o];-1===l?0!==(s&r)&&0===(s&n)||(a[o]=Ee(s,t)):l<=t&&(e.expiredLanes|=s),i&=~s}if(r=xc,r=_e(e,e===(t=fc)?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),n=e.callbackNode,0===r||e===t&&(2===vc||9===vc)||null!==e.cancelPendingCommit)return null!==n&&null!==n&&ie(n),e.callbackNode=null,e.callbackPriority=0;if(0===(3&r)||Ne(e,r)){if((t=r&-r)===e.callbackPriority)return t;switch(null!==n&&ie(n),Le(r)){case 2:case 8:r=ue;break;case 32:default:r=pe;break;case 268435456:r=me}return n=Bd.bind(null,e),r=ae(r,n),e.callbackPriority=t,e.callbackNode=r,t}return null!==n&&null!==n&&ie(n),e.callbackPriority=2,e.callbackNode=null,2}function Bd(e,t){if(0!==Rc&&5!==Rc)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(kd()&&e.callbackNode!==r)return null;var n=xc;return 0===(n=_e(e,e===fc?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Qc(e,n,t),Md(e,le()),null!=e.callbackNode&&e.callbackNode===r?Bd.bind(null,e):null)}function Vd(e,t){if(kd())return null;Qc(e,t,!0)}function Ud(){if(0===Od){var e=Ua;0===e&&(e=we,0===(261888&(we<<=1))&&(we=256)),Od=e}return Od}function Kd(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:Ct(""+e)}function Hd(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}for(var Wd=0;Wd<Sn.length;Wd++){var qd=Sn[Wd];$n(qd.toLowerCase(),"on"+(qd[0].toUpperCase()+qd.slice(1)))}$n(gn,"onAnimationEnd"),$n(xn,"onAnimationIteration"),$n(vn,"onAnimationStart"),$n("dblclick","onDoubleClick"),$n("focusin","onFocus"),$n("focusout","onBlur"),$n(bn,"onTransitionRun"),$n(yn,"onTransitionStart"),$n(kn,"onTransitionCancel"),$n(jn,"onTransitionEnd"),at("onMouseEnter",["mouseout","mouseover"]),at("onMouseLeave",["mouseout","mouseover"]),at("onPointerEnter",["pointerout","pointerover"]),at("onPointerLeave",["pointerout","pointerover"]),nt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),nt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),nt("onBeforeInput",["compositionend","keypress","textInput","paste"]),nt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),nt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),nt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yd="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gd=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yd));function Qd(e,t){t=0!==(4&t);for(var r=0;r<e.length;r++){var n=e[r],a=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var o=n.length-1;0<=o;o--){var s=n[o],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==i&&a.isPropagationStopped())break e;i=s,a.currentTarget=c;try{i(a)}catch(d){zn(d)}a.currentTarget=null,i=l}else for(o=0;o<n.length;o++){if(l=(s=n[o]).instance,c=s.currentTarget,s=s.listener,l!==i&&a.isPropagationStopped())break e;i=s,a.currentTarget=c;try{i(a)}catch(d){zn(d)}a.currentTarget=null,i=l}}}}function Jd(e,t){var r=t[Ke];void 0===r&&(r=t[Ke]=new Set);var n=e+"__bubble";r.has(n)||(tu(t,e,2,!1),r.add(n))}function Xd(e,t,r){var n=0;t&&(n|=4),tu(r,e,n,t)}var Zd="_reactListening"+Math.random().toString(36).slice(2);function eu(e){if(!e[Zd]){e[Zd]=!0,tt.forEach(function(t){"selectionchange"!==t&&(Gd.has(t)||Xd(t,!1,e),Xd(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Zd]||(t[Zd]=!0,Xd("selectionchange",!1,t))}}function tu(e,t,r,n){switch(_p(t)){case 2:var a=kp;break;case 8:a=jp;break;default:a=wp}r=a.bind(null,t,r,e),a=void 0,!Vt||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),n?void 0!==a?e.addEventListener(t,r,{capture:!0,passive:a}):e.addEventListener(t,r,!0):void 0!==a?e.addEventListener(t,r,{passive:a}):e.addEventListener(t,r,!1)}function ru(e,t,r,n,a){var i=n;if(0===(1&t)&&0===(2&t)&&null!==n)e:for(;;){if(null===n)return;var o=n.tag;if(3===o||4===o){var s=n.stateNode.containerInfo;if(s===a)break;if(4===o)for(o=n.return;null!==o;){var c=o.tag;if((3===c||4===c)&&o.stateNode.containerInfo===a)return;o=o.return}for(;null!==s;){if(null===(o=Qe(s)))return;if(5===(c=o.tag)||6===c||26===c||27===c){n=i=o;continue e}s=s.parentNode}}n=n.return}It(function(){var n=i,a=Tt(r),o=[];e:{var s=wn.get(e);if(void 0!==s){var c=rr,d=e;switch(e){case"keypress":if(0===Yt(r))break e;case"keydown":case"keyup":c=xr;break;case"focusin":d="focus",c=lr;break;case"focusout":d="blur",c=lr;break;case"beforeblur":case"afterblur":c=lr;break;case"click":if(2===r.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=or;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=sr;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=br;break;case gn:case xn:case vn:c=cr;break;case jn:c=yr;break;case"scroll":case"scrollend":c=ar;break;case"wheel":c=kr;break;case"copy":case"cut":case"paste":c=dr;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=vr;break;case"toggle":case"beforetoggle":c=jr}var u=0!==(4&t),p=!u&&("scroll"===e||"scrollend"===e),h=u?null!==s?s+"Capture":null:s;u=[];for(var m,f=n;null!==f;){var g=f;if(m=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===m||null===h||null!=(g=Mt(f,h))&&u.push(nu(f,g,m)),p)break;f=f.return}0<u.length&&(s=new c(s,d,null,r,a),o.push({event:s,listeners:u}))}}if(0===(7&t)){if(c="mouseout"===e||"pointerout"===e,(!(s="mouseover"===e||"pointerover"===e)||r===Ft||!(d=r.relatedTarget||r.fromElement)||!Qe(d)&&!d[Ue])&&(c||s)&&(s=a.window===a?a:(s=a.ownerDocument)?s.defaultView||s.parentWindow:window,c?(c=n,null!==(d=(d=r.relatedTarget||r.toElement)?Qe(d):null)&&(p=l(d),u=d.tag,d!==p||5!==u&&27!==u&&6!==u)&&(d=null)):(c=null,d=n),c!==d)){if(u=or,g="onMouseLeave",h="onMouseEnter",f="mouse","pointerout"!==e&&"pointerover"!==e||(u=vr,g="onPointerLeave",h="onPointerEnter",f="pointer"),p=null==c?s:Xe(c),m=null==d?s:Xe(d),(s=new u(g,f+"leave",c,r,a)).target=p,s.relatedTarget=m,g=null,Qe(a)===n&&((u=new u(h,f+"enter",d,r,a)).target=m,u.relatedTarget=p,g=u),p=g,c&&d)e:{for(u=iu,f=d,m=0,g=h=c;g;g=u(g))m++;g=0;for(var x=f;x;x=u(x))g++;for(;0<m-g;)h=u(h),m--;for(;0<g-m;)f=u(f),g--;for(;m--;){if(h===f||null!==f&&h===f.alternate){u=h;break e}h=u(h),f=u(f)}u=null}else u=null;null!==c&&ou(o,s,c,u,!1),null!==d&&null!==p&&ou(o,p,d,u,!0)}if("select"===(c=(s=n?Xe(n):window).nodeName&&s.nodeName.toLowerCase())||"input"===c&&"file"===s.type)var v=Mr;else if(Tr(s))if(Br)v=Qr;else{v=Yr;var b=qr}else!(c=s.nodeName)||"input"!==c.toLowerCase()||"checkbox"!==s.type&&"radio"!==s.type?n&&Nt(n.elementType)&&(v=Mr):v=Gr;switch(v&&(v=v(e,n))?Or(o,v,r,a):(b&&b(e,s,n),"focusout"===e&&n&&"number"===s.type&&null!=n.memoizedProps.value&&yt(s,"number",s.value)),b=n?Xe(n):window,e){case"focusin":(Tr(b)||"true"===b.contentEditable)&&(on=b,sn=n,ln=null);break;case"focusout":ln=sn=on=null;break;case"mousedown":cn=!0;break;case"contextmenu":case"mouseup":case"dragend":cn=!1,dn(o,r,a);break;case"selectionchange":if(an)break;case"keydown":case"keyup":dn(o,r,a)}var y;if(Sr)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else Dr?Ar(e,r)&&(k="onCompositionEnd"):"keydown"===e&&229===r.keyCode&&(k="onCompositionStart");k&&(_r&&"ko"!==r.locale&&(Dr||"onCompositionStart"!==k?"onCompositionEnd"===k&&Dr&&(y=qt()):(Ht="value"in(Kt=a)?Kt.value:Kt.textContent,Dr=!0)),0<(b=au(n,k)).length&&(k=new ur(k,e,null,r,a),o.push({event:k,listeners:b}),y?k.data=y:null!==(y=Cr(r))&&(k.data=y))),(y=zr?function(e,t){switch(e){case"compositionend":return Cr(t);case"keypress":return 32!==t.which?null:(Er=!0,Nr);case"textInput":return(e=t.data)===Nr&&Er?null:e;default:return null}}(e,r):function(e,t){if(Dr)return"compositionend"===e||!Sr&&Ar(e,t)?(e=qt(),Wt=Ht=Kt=null,Dr=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return _r&&"ko"!==t.locale?null:t.data}}(e,r))&&(0<(k=au(n,"onBeforeInput")).length&&(b=new ur("onBeforeInput","beforeinput",null,r,a),o.push({event:b,listeners:k}),b.data=y)),function(e,t,r,n,a){if("submit"===t&&r&&r.stateNode===a){var i=Kd((a[Ve]||null).action),o=n.submitter;o&&null!==(t=(t=o[Ve]||null)?Kd(t.formAction):o.getAttribute("formAction"))&&(i=t,o=null);var s=new rr("action","action",null,n,a);e.push({event:s,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(0!==Od){var e=o?Hd(a,o):new FormData(a);ts(r,{pending:!0,data:e,method:a.method,action:i},null,e)}}else"function"===typeof i&&(s.preventDefault(),e=o?Hd(a,o):new FormData(a),ts(r,{pending:!0,data:e,method:a.method,action:i},i,e))},currentTarget:a}]})}}(o,e,n,r,a)}Qd(o,t)})}function nu(e,t,r){return{instance:e,listener:t,currentTarget:r}}function au(e,t){for(var r=t+"Capture",n=[];null!==e;){var a=e,i=a.stateNode;if(5!==(a=a.tag)&&26!==a&&27!==a||null===i||(null!=(a=Mt(e,r))&&n.unshift(nu(e,a,i)),null!=(a=Mt(e,t))&&n.push(nu(e,a,i))),3===e.tag)return n;e=e.return}return[]}function iu(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function ou(e,t,r,n,a){for(var i=t._reactName,o=[];null!==r&&r!==n;){var s=r,l=s.alternate,c=s.stateNode;if(s=s.tag,null!==l&&l===n)break;5!==s&&26!==s&&27!==s||null===c||(l=c,a?null!=(c=Mt(r,i))&&o.unshift(nu(r,c,l)):a||null!=(c=Mt(r,i))&&o.push(nu(r,c,l))),r=r.return}0!==o.length&&e.push({event:t,listeners:o})}var su=/\r\n?/g,lu=/\u0000|\uFFFD/g;function cu(e){return("string"===typeof e?e:""+e).replace(su,"\n").replace(lu,"")}function du(e,t){return t=cu(t),cu(e)===t}function uu(e,t,r,n,a,i){switch(r){case"children":"string"===typeof n?"body"===t||"textarea"===t&&""===n||St(e,n):("number"===typeof n||"bigint"===typeof n)&&"body"!==t&&St(e,""+n);break;case"className":ct(e,"class",n);break;case"tabIndex":ct(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":ct(e,r,n);break;case"style":_t(e,n,i);break;case"data":if("object"!==t){ct(e,"data",n);break}case"src":case"href":if(""===n&&("a"!==t||"href"!==r)){e.removeAttribute(r);break}if(null==n||"function"===typeof n||"symbol"===typeof n||"boolean"===typeof n){e.removeAttribute(r);break}n=Ct(""+n),e.setAttribute(r,n);break;case"action":case"formAction":if("function"===typeof n){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof i&&("formAction"===r?("input"!==t&&uu(e,t,"name",a.name,a,null),uu(e,t,"formEncType",a.formEncType,a,null),uu(e,t,"formMethod",a.formMethod,a,null),uu(e,t,"formTarget",a.formTarget,a,null)):(uu(e,t,"encType",a.encType,a,null),uu(e,t,"method",a.method,a,null),uu(e,t,"target",a.target,a,null))),null==n||"symbol"===typeof n||"boolean"===typeof n){e.removeAttribute(r);break}n=Ct(""+n),e.setAttribute(r,n);break;case"onClick":null!=n&&(e.onclick=Dt);break;case"onScroll":null!=n&&Jd("scroll",e);break;case"onScrollEnd":null!=n&&Jd("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=n){if("object"!==typeof n||!("__html"in n))throw Error(o(61));if(null!=(r=n.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=r}}break;case"multiple":e.multiple=n&&"function"!==typeof n&&"symbol"!==typeof n;break;case"muted":e.muted=n&&"function"!==typeof n&&"symbol"!==typeof n;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==n||"function"===typeof n||"boolean"===typeof n||"symbol"===typeof n){e.removeAttribute("xlink:href");break}r=Ct(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,""+n):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":!0===n?e.setAttribute(r,""):!1!==n&&null!=n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,n):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":null!=n&&"function"!==typeof n&&"symbol"!==typeof n&&!isNaN(n)&&1<=n?e.setAttribute(r,n):e.removeAttribute(r);break;case"rowSpan":case"start":null==n||"function"===typeof n||"symbol"===typeof n||isNaN(n)?e.removeAttribute(r):e.setAttribute(r,n);break;case"popover":Jd("beforetoggle",e),Jd("toggle",e),lt(e,"popover",n);break;case"xlinkActuate":dt(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":dt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":dt(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":dt(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":dt(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":dt(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":dt(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":dt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":dt(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":lt(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<r.length)||"o"!==r[0]&&"O"!==r[0]||"n"!==r[1]&&"N"!==r[1])&&lt(e,r=Et.get(r)||r,n)}}function pu(e,t,r,n,a,i){switch(r){case"style":_t(e,n,i);break;case"dangerouslySetInnerHTML":if(null!=n){if("object"!==typeof n||!("__html"in n))throw Error(o(61));if(null!=(r=n.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=r}}break;case"children":"string"===typeof n?St(e,n):("number"===typeof n||"bigint"===typeof n)&&St(e,""+n);break;case"onScroll":null!=n&&Jd("scroll",e);break;case"onScrollEnd":null!=n&&Jd("scrollend",e);break;case"onClick":null!=n&&(e.onclick=Dt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:rt.hasOwnProperty(r)||("o"!==r[0]||"n"!==r[1]||(a=r.endsWith("Capture"),t=r.slice(2,a?r.length-7:void 0),"function"===typeof(i=null!=(i=e[Ve]||null)?i[r]:null)&&e.removeEventListener(t,i,a),"function"!==typeof n)?r in e?e[r]=n:!0===n?e.setAttribute(r,""):lt(e,r,n):("function"!==typeof i&&null!==i&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,n,a)))}}function hu(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Jd("error",e),Jd("load",e);var n,a=!1,i=!1;for(n in r)if(r.hasOwnProperty(n)){var s=r[n];if(null!=s)switch(n){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,n,s,r,null)}}return i&&uu(e,t,"srcSet",r.srcSet,r,null),void(a&&uu(e,t,"src",r.src,r,null));case"input":Jd("invalid",e);var l=n=s=i=null,c=null,d=null;for(a in r)if(r.hasOwnProperty(a)){var u=r[a];if(null!=u)switch(a){case"name":i=u;break;case"type":s=u;break;case"checked":c=u;break;case"defaultChecked":d=u;break;case"value":n=u;break;case"defaultValue":l=u;break;case"children":case"dangerouslySetInnerHTML":if(null!=u)throw Error(o(137,t));break;default:uu(e,t,a,u,r,null)}}return void bt(e,n,l,c,d,s,i,!1);case"select":for(i in Jd("invalid",e),a=s=n=null,r)if(r.hasOwnProperty(i)&&null!=(l=r[i]))switch(i){case"value":n=l;break;case"defaultValue":s=l;break;case"multiple":a=l;default:uu(e,t,i,l,r,null)}return t=n,r=s,e.multiple=!!a,void(null!=t?kt(e,!!a,t,!1):null!=r&&kt(e,!!a,r,!0));case"textarea":for(s in Jd("invalid",e),n=i=a=null,r)if(r.hasOwnProperty(s)&&null!=(l=r[s]))switch(s){case"value":a=l;break;case"defaultValue":i=l;break;case"children":n=l;break;case"dangerouslySetInnerHTML":if(null!=l)throw Error(o(91));break;default:uu(e,t,s,l,r,null)}return void wt(e,a,i,n);case"option":for(c in r)if(r.hasOwnProperty(c)&&null!=(a=r[c]))if("selected"===c)e.selected=a&&"function"!==typeof a&&"symbol"!==typeof a;else uu(e,t,c,a,r,null);return;case"dialog":Jd("beforetoggle",e),Jd("toggle",e),Jd("cancel",e),Jd("close",e);break;case"iframe":case"object":Jd("load",e);break;case"video":case"audio":for(a=0;a<Yd.length;a++)Jd(Yd[a],e);break;case"image":Jd("error",e),Jd("load",e);break;case"details":Jd("toggle",e);break;case"embed":case"source":case"link":Jd("error",e),Jd("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in r)if(r.hasOwnProperty(d)&&null!=(a=r[d]))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,d,a,r,null)}return;default:if(Nt(t)){for(u in r)r.hasOwnProperty(u)&&(void 0!==(a=r[u])&&pu(e,t,u,a,r,void 0));return}}for(l in r)r.hasOwnProperty(l)&&(null!=(a=r[l])&&uu(e,t,l,a,r,null))}function mu(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}var fu=null,gu=null;function xu(e){return 9===e.nodeType?e:e.ownerDocument}function vu(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function bu(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function yu(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ku=null;var ju="function"===typeof setTimeout?setTimeout:void 0,wu="function"===typeof clearTimeout?clearTimeout:void 0,Su="function"===typeof Promise?Promise:void 0,$u="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Su?function(e){return Su.resolve(null).then(e).catch(zu)}:ju;function zu(e){setTimeout(function(){throw e})}function _u(e){return"head"===e}function Nu(e,t){var r=t,n=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&8===a.nodeType)if("/$"===(r=a.data)||"/&"===r){if(0===n)return e.removeChild(a),void Hp(t);n--}else if("$"===r||"$?"===r||"$~"===r||"$!"===r||"&"===r)n++;else if("html"===r)Iu(e.ownerDocument.documentElement);else if("head"===r){Iu(r=e.ownerDocument.head);for(var i=r.firstChild;i;){var o=i.nextSibling,s=i.nodeName;i[Ye]||"SCRIPT"===s||"STYLE"===s||"LINK"===s&&"stylesheet"===i.rel.toLowerCase()||r.removeChild(i),i=o}}else"body"===r&&Iu(e.ownerDocument.body);r=a}while(r);Hp(t)}function Eu(e,t){var r=e;e=0;do{var n=r.nextSibling;if(1===r.nodeType?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",""===r.getAttribute("style")&&r.removeAttribute("style")):3===r.nodeType&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),n&&8===n.nodeType)if("/$"===(r=n.data)){if(0===e)break;e--}else"$"!==r&&"$?"!==r&&"$~"!==r&&"$!"!==r||e++;r=n}while(r)}function Au(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Au(r),Ge(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===r.rel.toLowerCase())continue}e.removeChild(r)}}function Cu(e,t){for(;8!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null;if(null===(e=Tu(e.nextSibling)))return null}return e}function Du(e){return"$?"===e.data||"$~"===e.data}function Fu(e){return"$!"===e.data||"$?"===e.data&&"loading"!==e.ownerDocument.readyState}function Tu(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"$~"===t||"&"===t||"F!"===t||"F"===t)break;if("/$"===t||"/&"===t)return null}}return e}var Ou=null;function Pu(e){e=e.nextSibling;for(var t=0;e;){if(8===e.nodeType){var r=e.data;if("/$"===r||"/&"===r){if(0===t)return Tu(e.nextSibling);t--}else"$"!==r&&"$!"!==r&&"$?"!==r&&"$~"!==r&&"&"!==r||t++}e=e.nextSibling}return null}function Lu(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var r=e.data;if("$"===r||"$!"===r||"$?"===r||"$~"===r||"&"===r){if(0===t)return e;t--}else"/$"!==r&&"/&"!==r||t++}e=e.previousSibling}return null}function Ru(e,t,r){switch(t=xu(r),e){case"html":if(!(e=t.documentElement))throw Error(o(452));return e;case"head":if(!(e=t.head))throw Error(o(453));return e;case"body":if(!(e=t.body))throw Error(o(454));return e;default:throw Error(o(451))}}function Iu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ge(e)}var Mu=new Map,Bu=new Set;function Vu(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Uu=O.d;O.d={f:function(){var e=Uu.f(),t=ed();return e||t},r:function(e){var t=Je(e);null!==t&&5===t.tag&&"form"===t.type?ns(t):Uu.r(e)},D:function(e){Uu.D(e),Hu("dns-prefetch",e,null)},C:function(e,t){Uu.C(e,t),Hu("preconnect",e,t)},L:function(e,t,r){Uu.L(e,t,r);var n=Ku;if(n&&e&&t){var a='link[rel="preload"][as="'+xt(t)+'"]';"image"===t&&r&&r.imageSrcSet?(a+='[imagesrcset="'+xt(r.imageSrcSet)+'"]',"string"===typeof r.imageSizes&&(a+='[imagesizes="'+xt(r.imageSizes)+'"]')):a+='[href="'+xt(e)+'"]';var i=a;switch(t){case"style":i=qu(e);break;case"script":i=Qu(e)}Mu.has(i)||(e=h({rel:"preload",href:"image"===t&&r&&r.imageSrcSet?void 0:e,as:t},r),Mu.set(i,e),null!==n.querySelector(a)||"style"===t&&n.querySelector(Yu(i))||"script"===t&&n.querySelector(Ju(i))||(hu(t=n.createElement("link"),"link",e),et(t),n.head.appendChild(t)))}},m:function(e,t){Uu.m(e,t);var r=Ku;if(r&&e){var n=t&&"string"===typeof t.as?t.as:"script",a='link[rel="modulepreload"][as="'+xt(n)+'"][href="'+xt(e)+'"]',i=a;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Qu(e)}if(!Mu.has(i)&&(e=h({rel:"modulepreload",href:e},t),Mu.set(i,e),null===r.querySelector(a))){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Ju(i)))return}hu(n=r.createElement("link"),"link",e),et(n),r.head.appendChild(n)}}},X:function(e,t){Uu.X(e,t);var r=Ku;if(r&&e){var n=Ze(r).hoistableScripts,a=Qu(e),i=n.get(a);i||((i=r.querySelector(Ju(a)))||(e=h({src:e,async:!0},t),(t=Mu.get(a))&&tp(e,t),et(i=r.createElement("script")),hu(i,"link",e),r.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(a,i))}},S:function(e,t,r){Uu.S(e,t,r);var n=Ku;if(n&&e){var a=Ze(n).hoistableStyles,i=qu(e);t=t||"default";var o=a.get(i);if(!o){var s={loading:0,preload:null};if(o=n.querySelector(Yu(i)))s.loading=5;else{e=h({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Mu.get(i))&&ep(e,r);var l=o=n.createElement("link");et(l),hu(l,"link",e),l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),l.addEventListener("load",function(){s.loading|=1}),l.addEventListener("error",function(){s.loading|=2}),s.loading|=4,Zu(o,t,n)}o={type:"stylesheet",instance:o,count:1,state:s},a.set(i,o)}}},M:function(e,t){Uu.M(e,t);var r=Ku;if(r&&e){var n=Ze(r).hoistableScripts,a=Qu(e),i=n.get(a);i||((i=r.querySelector(Ju(a)))||(e=h({src:e,async:!0,type:"module"},t),(t=Mu.get(a))&&tp(e,t),et(i=r.createElement("script")),hu(i,"link",e),r.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(a,i))}}};var Ku="undefined"===typeof document?null:document;function Hu(e,t,r){var n=Ku;if(n&&"string"===typeof t&&t){var a=xt(t);a='link[rel="'+e+'"][href="'+a+'"]',"string"===typeof r&&(a+='[crossorigin="'+r+'"]'),Bu.has(a)||(Bu.add(a),e={rel:e,crossOrigin:r,href:t},null===n.querySelector(a)&&(hu(t=n.createElement("link"),"link",e),et(t),n.head.appendChild(t)))}}function Wu(e,t,r,n){var a,i,s,l,c=(c=W.current)?Vu(c):null;if(!c)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof r.precedence&&"string"===typeof r.href?(t=qu(r.href),(n=(r=Ze(c).hoistableStyles).get(t))||(n={type:"style",instance:null,count:0,state:null},r.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===r.rel&&"string"===typeof r.href&&"string"===typeof r.precedence){e=qu(r.href);var d=Ze(c).hoistableStyles,u=d.get(e);if(u||(c=c.ownerDocument||c,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,u),(d=c.querySelector(Yu(e)))&&!d._p&&(u.instance=d,u.state.loading=5),Mu.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Mu.set(e,r),d||(a=c,i=e,s=r,l=u.state,a.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=a.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),hu(i,"link",s),et(i),a.head.appendChild(i))))),t&&null===n)throw Error(o(528,""));return u}if(t&&null!==n)throw Error(o(529,""));return null;case"script":return t=r.async,"string"===typeof(r=r.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Qu(r),(n=(r=Ze(c).hoistableScripts).get(t))||(n={type:"script",instance:null,count:0,state:null},r.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function qu(e){return'href="'+xt(e)+'"'}function Yu(e){return'link[rel="stylesheet"]['+e+"]"}function Gu(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Qu(e){return'[src="'+xt(e)+'"]'}function Ju(e){return"script[async]"+e}function Xu(e,t,r){if(t.count++,null===t.instance)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+xt(r.href)+'"]');if(n)return t.instance=n,et(n),n;var a=h({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return et(n=(e.ownerDocument||e).createElement("style")),hu(n,"style",a),Zu(n,r.precedence,e),t.instance=n;case"stylesheet":a=qu(r.href);var i=e.querySelector(Yu(a));if(i)return t.state.loading|=4,t.instance=i,et(i),i;n=Gu(r),(a=Mu.get(a))&&ep(n,a),et(i=(e.ownerDocument||e).createElement("link"));var s=i;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),hu(i,"link",n),t.state.loading|=4,Zu(i,r.precedence,e),t.instance=i;case"script":return i=Qu(r.src),(a=e.querySelector(Ju(i)))?(t.instance=a,et(a),a):(n=r,(a=Mu.get(i))&&tp(n=h({},r),a),et(a=(e=e.ownerDocument||e).createElement("script")),hu(a,"link",n),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(o(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(n=t.instance,t.state.loading|=4,Zu(n,r.precedence,e));return t.instance}function Zu(e,t,r){for(var n=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=n.length?n[n.length-1]:null,i=a,o=0;o<n.length;o++){var s=n[o];if(s.dataset.precedence===t)i=s;else if(i!==a)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=9===r.nodeType?r.head:r).insertBefore(e,t.firstChild)}function ep(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function tp(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var rp=null;function np(e,t,r){if(null===rp){var n=new Map,a=rp=new Map;a.set(r,n)}else(n=(a=rp).get(r))||(n=new Map,a.set(r,n));if(n.has(e))return n;for(n.set(e,null),r=r.getElementsByTagName(e),a=0;a<r.length;a++){var i=r[a];if(!(i[Ye]||i[Be]||"link"===e&&"stylesheet"===i.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==i.namespaceURI){var o=i.getAttribute(t)||"";o=e+o;var s=n.get(o);s?s.push(i):n.set(o,[i])}}return n}function ap(e,t,r){(e=e.ownerDocument||e).head.insertBefore(r,"title"===t?e.querySelector("head > title"):null)}function ip(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var op=0;function sp(){if(this.count--,0===this.count&&(0===this.imgCount||!this.waitingForImages))if(this.stylesheets)cp(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var lp=null;function cp(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,lp=new Map,t.forEach(dp,e),lp=null,sp.call(e))}function dp(e,t){if(!(4&t.state.loading)){var r=lp.get(e);if(r)var n=r.get(null);else{r=new Map,lp.set(e,r);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var o=a[i];"LINK"!==o.nodeName&&"not all"===o.getAttribute("media")||(r.set(o.dataset.precedence,o),n=o)}n&&r.set(null,n)}o=(a=t.instance).getAttribute("data-precedence"),(i=r.get(o)||n)===n&&r.set(null,a),r.set(o,a),this.count++,n=sp.bind(this),a.addEventListener("load",n),a.addEventListener("error",n),i?i.parentNode.insertBefore(a,i.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(a,e.firstChild),t.state.loading|=4}}var up={$$typeof:k,Provider:null,Consumer:null,_currentValue:P,_currentValue2:P,_threadCount:0};function pp(e,t,r,n,a,i,o,s,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ce(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ce(0),this.hiddenUpdates=Ce(null),this.identifierPrefix=n,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function hp(e,t,r,n,a,i,o,s,l,c,d,u){return e=new pp(e,t,r,o,l,c,d,u,s),t=1,!0===i&&(t|=24),i=Rn(3,null,null,t),e.current=i,i.stateNode=e,(t=Ia()).refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:n,isDehydrated:r,cache:t},gi(i),e}function mp(e){return e?e=Pn:Pn}function fp(e,t,r,n,a,i){a=mp(a),null===n.context?n.context=a:n.pendingContext=a,(n=vi(t)).payload={element:r},null!==(i=void 0===i?null:i)&&(n.callback=i),null!==(r=bi(e,n,t))&&(Gc(r,0,t),yi(r,e,t))}function gp(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var r=e.retryLane;e.retryLane=0!==r&&r<t?r:t}}function xp(e,t){gp(e,t),(e=e.alternate)&&gp(e,t)}function vp(e){if(13===e.tag||31===e.tag){var t=Fn(e,67108864);null!==t&&Gc(t,0,67108864),xp(e,67108864)}}function bp(e){if(13===e.tag||31===e.tag){var t=qc(),r=Fn(e,t=Pe(t));null!==r&&Gc(r,0,t),xp(e,t)}}var yp=!0;function kp(e,t,r,n){var a=T.T;T.T=null;var i=O.p;try{O.p=2,wp(e,t,r,n)}finally{O.p=i,T.T=a}}function jp(e,t,r,n){var a=T.T;T.T=null;var i=O.p;try{O.p=8,wp(e,t,r,n)}finally{O.p=i,T.T=a}}function wp(e,t,r,n){if(yp){var a=Sp(n);if(null===a)ru(e,t,n,$p,r),Pp(e,n);else if(function(e,t,r,n,a){switch(t){case"focusin":return Ep=Lp(Ep,e,t,r,n,a),!0;case"dragenter":return Ap=Lp(Ap,e,t,r,n,a),!0;case"mouseover":return Cp=Lp(Cp,e,t,r,n,a),!0;case"pointerover":var i=a.pointerId;return Dp.set(i,Lp(Dp.get(i)||null,e,t,r,n,a)),!0;case"gotpointercapture":return i=a.pointerId,Fp.set(i,Lp(Fp.get(i)||null,e,t,r,n,a)),!0}return!1}(a,e,t,r,n))n.stopPropagation();else if(Pp(e,n),4&t&&-1<Op.indexOf(e)){for(;null!==a;){var i=Je(a);if(null!==i)switch(i.tag){case 3:if((i=i.stateNode).current.memoizedState.isDehydrated){var o=ze(i.pendingLanes);if(0!==o){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var l=1<<31-ye(o);s.entanglements[1]|=l,o&=~l}Pd(i),0===(6&mc)&&(Oc=le()+500,Ld(0,!1))}}break;case 31:case 13:null!==(s=Fn(i,2))&&Gc(s,0,2),ed(),xp(i,2)}if(null===(i=Sp(n))&&ru(e,t,n,$p,r),i===a)break;a=i}null!==a&&n.stopPropagation()}else ru(e,t,n,null,r)}}function Sp(e){return zp(e=Tt(e))}var $p=null;function zp(e){if($p=null,null!==(e=Qe(e))){var t=l(e);if(null===t)e=null;else{var r=t.tag;if(13===r){if(null!==(e=c(t)))return e;e=null}else if(31===r){if(null!==(e=d(t)))return e;e=null}else if(3===r){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return $p=e,null}function _p(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ce()){case de:return 2;case ue:return 8;case pe:case he:return 32;case me:return 268435456;default:return 32}default:return 32}}var Np=!1,Ep=null,Ap=null,Cp=null,Dp=new Map,Fp=new Map,Tp=[],Op="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Pp(e,t){switch(e){case"focusin":case"focusout":Ep=null;break;case"dragenter":case"dragleave":Ap=null;break;case"mouseover":case"mouseout":Cp=null;break;case"pointerover":case"pointerout":Dp.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fp.delete(t.pointerId)}}function Lp(e,t,r,n,a,i){return null===e||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[a]},null!==t&&(null!==(t=Je(t))&&vp(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function Rp(e){var t=Qe(e.target);if(null!==t){var r=l(t);if(null!==r)if(13===(t=r.tag)){if(null!==(t=c(r)))return e.blockedOn=t,void Ie(e.priority,function(){bp(r)})}else if(31===t){if(null!==(t=d(r)))return e.blockedOn=t,void Ie(e.priority,function(){bp(r)})}else if(3===t&&r.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===r.tag?r.stateNode.containerInfo:null)}e.blockedOn=null}function Ip(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var r=Sp(e.nativeEvent);if(null!==r)return null!==(t=Je(r))&&vp(t),e.blockedOn=r,!1;var n=new(r=e.nativeEvent).constructor(r.type,r);Ft=n,r.target.dispatchEvent(n),Ft=null,t.shift()}return!0}function Mp(e,t,r){Ip(e)&&r.delete(t)}function Bp(){Np=!1,null!==Ep&&Ip(Ep)&&(Ep=null),null!==Ap&&Ip(Ap)&&(Ap=null),null!==Cp&&Ip(Cp)&&(Cp=null),Dp.forEach(Mp),Fp.forEach(Mp)}function Vp(e,t){e.blockedOn===t&&(e.blockedOn=null,Np||(Np=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,Bp)))}var Up=null;function Kp(e){Up!==e&&(Up=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Up===e&&(Up=null);for(var t=0;t<e.length;t+=3){var r=e[t],n=e[t+1],a=e[t+2];if("function"!==typeof n){if(null===zp(n||r))continue;break}var i=Je(r);null!==i&&(e.splice(t,3),t-=3,ts(i,{pending:!0,data:a,method:r.method,action:n},n,a))}}))}function Hp(e){function t(t){return Vp(t,e)}null!==Ep&&Vp(Ep,e),null!==Ap&&Vp(Ap,e),null!==Cp&&Vp(Cp,e),Dp.forEach(t),Fp.forEach(t);for(var r=0;r<Tp.length;r++){var n=Tp[r];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Tp.length&&null===(r=Tp[0]).blockedOn;)Rp(r),null===r.blockedOn&&Tp.shift();if(null!=(r=(e.ownerDocument||e).$$reactFormReplay))for(n=0;n<r.length;n+=3){var a=r[n],i=r[n+1],o=a[Ve]||null;if("function"===typeof i)o||Kp(r);else if(o){var s=null;if(i&&i.hasAttribute("formAction")){if(a=i,o=i[Ve]||null)s=o.formAction;else if(null!==zp(a))continue}else s=o.action;"function"===typeof s?r[n+1]=s:(r.splice(n,3),n-=3),Kp(r)}}}function Wp(){function e(e){e.canIntercept&&"react-transition"===e.info&&e.intercept({handler:function(){return new Promise(function(e){return a=e})},focusReset:"manual",scroll:"manual"})}function t(){null!==a&&(a(),a=null),n||setTimeout(r,20)}function r(){if(!n&&!navigation.transition){var e=navigation.currentEntry;e&&null!=e.url&&navigation.navigate(e.url,{state:e.getState(),info:"react-transition",history:"replace"})}}if("object"===typeof navigation){var n=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),null!==a&&(a(),a=null)}}}function qp(e){this._internalRoot=e}function Yp(e){this._internalRoot=e}Yp.prototype.render=qp.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(o(409));fp(t.current,qc(),e,t,null,null)},Yp.prototype.unmount=qp.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;fp(e.current,2,null,e,null,null),ed(),t[Ue]=null}},Yp.prototype.unstable_scheduleHydration=function(e){if(e){var t=Re();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Tp.length&&0!==t&&t<Tp[r].priority;r++);Tp.splice(r,0,e),0===r&&Rp(e)}};var Gp=a.version;if("19.2.4"!==Gp)throw Error(o(527,Gp,"19.2.4"));O.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(o(188));throw e=Object.keys(e).join(","),Error(o(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=l(e)))throw Error(o(188));return t!==e?null:e}for(var r=e,n=t;;){var a=r.return;if(null===a)break;var i=a.alternate;if(null===i){if(null!==(n=a.return)){r=n;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===r)return u(a),e;if(i===n)return u(a),t;i=i.sibling}throw Error(o(188))}if(r.return!==n.return)r=a,n=i;else{for(var s=!1,c=a.child;c;){if(c===r){s=!0,r=a,n=i;break}if(c===n){s=!0,n=a,r=i;break}c=c.sibling}if(!s){for(c=i.child;c;){if(c===r){s=!0,r=i,n=a;break}if(c===n){s=!0,n=i,r=a;break}c=c.sibling}if(!s)throw Error(o(189))}}if(r.alternate!==n)throw Error(o(190))}if(3!==r.tag)throw Error(o(188));return r.stateNode.current===r?e:t}(t),e=null===(e=null!==e?p(e):null)?null:e.stateNode};var Qp={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:T,reconcilerVersion:"19.2.4"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Jp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jp.isDisabled&&Jp.supportsFiber)try{xe=Jp.inject(Qp),ve=Jp}catch(Zp){}}t.createRoot=function(e,t){if(!s(e))throw Error(o(299));var r=!1,n="",a=Ss,i=$s,l=zs;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(r=!0),void 0!==t.identifierPrefix&&(n=t.identifierPrefix),void 0!==t.onUncaughtError&&(a=t.onUncaughtError),void 0!==t.onCaughtError&&(i=t.onCaughtError),void 0!==t.onRecoverableError&&(l=t.onRecoverableError)),t=hp(e,1,!1,null,0,r,n,null,a,i,l,Wp),e[Ue]=t.current,eu(e),new qp(t)}},672(e,t,r){var n=r(43);function a(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var o={d:{f:i,r:function(){throw Error(a(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},s=Symbol.for("react.portal");var l=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,t.createPortal=function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(a(299));return function(e,t,r){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:s,key:null==n?null:""+n,children:e,containerInfo:t,implementation:r}}(e,t,null,r)},t.flushSync=function(e){var t=l.T,r=o.p;try{if(l.T=null,o.p=2,e)return e()}finally{l.T=t,o.p=r,o.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,o.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&o.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var r=t.as,n=c(r,t.crossOrigin),a="string"===typeof t.integrity?t.integrity:void 0,i="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===r?o.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:n,integrity:a,fetchPriority:i}):"script"===r&&o.d.X(e,{crossOrigin:n,integrity:a,fetchPriority:i,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var r=c(t.as,t.crossOrigin);o.d.M(e,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&o.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var r=t.as,n=c(r,t.crossOrigin);o.d.L(e,r,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var r=c(t.as,t.crossOrigin);o.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else o.d.m(e)},t.requestFormReset=function(e){o.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,r){return l.H.useFormState(e,t,r)},t.useFormStatus=function(){return l.H.useHostTransitionStatus()},t.version="19.2.4"},391(e,t,r){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=r(4)},950(e,t,r){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=r(672)},799(e,t){var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function a(e,t,n){var a=null;if(void 0!==n&&(a=""+n),void 0!==t.key&&(a=""+t.key),"key"in t)for(var i in n={},t)"key"!==i&&(n[i]=t[i]);else n=t;return t=n.ref,{$$typeof:r,type:e,key:a,ref:void 0!==t?t:null,props:n}}t.Fragment=n,t.jsx=a,t.jsxs=a},288(e,t){var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),s=Symbol.for("react.consumer"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.for("react.activity"),m=Symbol.iterator;var f={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,x={};function v(e,t,r){this.props=e,this.context=t,this.refs=x,this.updater=r||f}function b(){}function y(e,t,r){this.props=e,this.context=t,this.refs=x,this.updater=r||f}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var k=y.prototype=new b;k.constructor=y,g(k,v.prototype),k.isPureReactComponent=!0;var j=Array.isArray;function w(){}var S={H:null,A:null,T:null,S:null},$=Object.prototype.hasOwnProperty;function z(e,t,n){var a=n.ref;return{$$typeof:r,type:e,key:t,ref:void 0!==a?a:null,props:n}}function _(e){return"object"===typeof e&&null!==e&&e.$$typeof===r}var N=/\/+/g;function E(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function A(e,t,a,i,o){var s=typeof e;"undefined"!==s&&"boolean"!==s||(e=null);var l,c,d=!1;if(null===e)d=!0;else switch(s){case"bigint":case"string":case"number":d=!0;break;case"object":switch(e.$$typeof){case r:case n:d=!0;break;case p:return A((d=e._init)(e._payload),t,a,i,o)}}if(d)return o=o(e),d=""===i?"."+E(e,0):i,j(o)?(a="",null!=d&&(a=d.replace(N,"$&/")+"/"),A(o,t,a,"",function(e){return e})):null!=o&&(_(o)&&(l=o,c=a+(null==o.key||e&&e.key===o.key?"":(""+o.key).replace(N,"$&/")+"/")+d,o=z(l.type,c,l.props)),t.push(o)),1;d=0;var u,h=""===i?".":i+":";if(j(e))for(var f=0;f<e.length;f++)d+=A(i=e[f],t,a,s=h+E(i,f),o);else if("function"===typeof(f=null===(u=e)||"object"!==typeof u?null:"function"===typeof(u=m&&u[m]||u["@@iterator"])?u:null))for(e=f.call(e),f=0;!(i=e.next()).done;)d+=A(i=i.value,t,a,s=h+E(i,f++),o);else if("object"===s){if("function"===typeof e.then)return A(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(w,w):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,a,i,o);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return d}function C(e,t,r){if(null==e)return e;var n=[],a=0;return A(e,n,"","",function(e){return t.call(r,e,a++)}),n}function D(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var F="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},T={map:C,forEach:function(e,t,r){C(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return C(e,function(){t++}),t},toArray:function(e){return C(e,function(e){return e})||[]},only:function(e){if(!_(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};t.Activity=h,t.Children=T,t.Component=v,t.Fragment=a,t.Profiler=o,t.PureComponent=y,t.StrictMode=i,t.Suspense=d,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cacheSignal=function(){return null},t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var n=g({},e.props),a=e.key;if(null!=t)for(i in void 0!==t.key&&(a=""+t.key),t)!$.call(t,i)||"key"===i||"__self"===i||"__source"===i||"ref"===i&&void 0===t.ref||(n[i]=t[i]);var i=arguments.length-2;if(1===i)n.children=r;else if(1<i){for(var o=Array(i),s=0;s<i;s++)o[s]=arguments[s+2];n.children=o}return z(e.type,a,n)},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:s,_context:e},e},t.createElement=function(e,t,r){var n,a={},i=null;if(null!=t)for(n in void 0!==t.key&&(i=""+t.key),t)$.call(t,n)&&"key"!==n&&"__self"!==n&&"__source"!==n&&(a[n]=t[n]);var o=arguments.length-2;if(1===o)a.children=r;else if(1<o){for(var s=Array(o),l=0;l<o;l++)s[l]=arguments[l+2];a.children=s}if(e&&e.defaultProps)for(n in o=e.defaultProps)void 0===a[n]&&(a[n]=o[n]);return z(e,i,a)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=_,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:D}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=S.T,r={};S.T=r;try{var n=e(),a=S.S;null!==a&&a(r,n),"object"===typeof n&&null!==n&&"function"===typeof n.then&&n.then(w,F)}catch(i){F(i)}finally{null!==t&&null!==r.types&&(t.types=r.types),S.T=t}},t.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},t.use=function(e){return S.H.use(e)},t.useActionState=function(e,t,r){return S.H.useActionState(e,t,r)},t.useCallback=function(e,t){return S.H.useCallback(e,t)},t.useContext=function(e){return S.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},t.useEffect=function(e,t){return S.H.useEffect(e,t)},t.useEffectEvent=function(e){return S.H.useEffectEvent(e)},t.useId=function(){return S.H.useId()},t.useImperativeHandle=function(e,t,r){return S.H.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return S.H.useMemo(e,t)},t.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},t.useReducer=function(e,t,r){return S.H.useReducer(e,t,r)},t.useRef=function(e){return S.H.useRef(e)},t.useState=function(e){return S.H.useState(e)},t.useSyncExternalStore=function(e,t,r){return S.H.useSyncExternalStore(e,t,r)},t.useTransition=function(){return S.H.useTransition()},t.version="19.2.4"},43(e,t,r){e.exports=r(288)},579(e,t,r){e.exports=r(799)},896(e,t){function r(e,t){var r=e.length;e.push(t);e:for(;0<r;){var n=r-1>>>1,a=e[n];if(!(0<i(a,t)))break e;e[n]=t,e[r]=a,r=n}}function n(e){return 0===e.length?null:e[0]}function a(e){if(0===e.length)return null;var t=e[0],r=e.pop();if(r!==t){e[0]=r;e:for(var n=0,a=e.length,o=a>>>1;n<o;){var s=2*(n+1)-1,l=e[s],c=s+1,d=e[c];if(0>i(l,r))c<a&&0>i(d,l)?(e[n]=d,e[c]=r,n=c):(e[n]=l,e[s]=r,n=s);else{if(!(c<a&&0>i(d,r)))break e;e[n]=d,e[c]=r,n=c}}}return t}function i(e,t){var r=e.sortIndex-t.sortIndex;return 0!==r?r:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var o=performance;t.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var c=[],d=[],u=1,p=null,h=3,m=!1,f=!1,g=!1,x=!1,v="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,y="undefined"!==typeof setImmediate?setImmediate:null;function k(e){for(var t=n(d);null!==t;){if(null===t.callback)a(d);else{if(!(t.startTime<=e))break;a(d),t.sortIndex=t.expirationTime,r(c,t)}t=n(d)}}function j(e){if(g=!1,k(e),!f)if(null!==n(c))f=!0,S||(S=!0,w());else{var t=n(d);null!==t&&D(j,t.startTime-e)}}var w,S=!1,$=-1,z=5,_=-1;function N(){return!!x||!(t.unstable_now()-_<z)}function E(){if(x=!1,S){var e=t.unstable_now();_=e;var r=!0;try{e:{f=!1,g&&(g=!1,b($),$=-1),m=!0;var i=h;try{t:{for(k(e),p=n(c);null!==p&&!(p.expirationTime>e&&N());){var o=p.callback;if("function"===typeof o){p.callback=null,h=p.priorityLevel;var s=o(p.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof s){p.callback=s,k(e),r=!0;break t}p===n(c)&&a(c),k(e)}else a(c);p=n(c)}if(null!==p)r=!0;else{var l=n(d);null!==l&&D(j,l.startTime-e),r=!1}}break e}finally{p=null,h=i,m=!1}r=void 0}}finally{r?w():S=!1}}}if("function"===typeof y)w=function(){y(E)};else if("undefined"!==typeof MessageChannel){var A=new MessageChannel,C=A.port2;A.port1.onmessage=E,w=function(){C.postMessage(null)}}else w=function(){v(E,0)};function D(e,r){$=v(function(){e(t.unstable_now())},r)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var r=h;h=t;try{return e()}finally{h=r}},t.unstable_requestPaint=function(){x=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var r=h;h=e;try{return t()}finally{h=r}},t.unstable_scheduleCallback=function(e,a,i){var o=t.unstable_now();switch("object"===typeof i&&null!==i?i="number"===typeof(i=i.delay)&&0<i?o+i:o:i=o,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return e={id:u++,callback:a,priorityLevel:e,startTime:i,expirationTime:s=i+s,sortIndex:-1},i>o?(e.sortIndex=i,r(d,e),null===n(c)&&e===n(d)&&(g?(b($),$=-1):g=!0,D(j,i-o))):(e.sortIndex=s,r(c,e),f||m||(f=!0,S||(S=!0,w()))),e},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(e){var t=h;return function(){var r=h;h=t;try{return e.apply(this,arguments)}finally{h=r}}}},853(e,t,r){e.exports=r(896)}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(n,a){if(1&a&&(n=this(n)),8&a)return n;if("object"===typeof n&&n){if(4&a&&n.__esModule)return n;if(16&a&&"function"===typeof n.then)return n}var i=Object.create(null);r.r(i);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&a&&n;("object"==typeof s||"function"==typeof s)&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(e=>o[e]=()=>n[e]);return o.default=()=>n,r.d(i,o),i}})(),r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nc=void 0;var n=r(43),a=r.t(n,2),i=r(391);const o="10.55.0",s=globalThis;function l(){return c(s),s}function c(e){const t=e.__SENTRY__=e.__SENTRY__||{};return t.version=t.version||o,t[o]=t[o]||{}}function d(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s;const n=r.__SENTRY__=r.__SENTRY__||{},a=n[o]=n[o]||{};return a[e]||(a[e]=t())}const u="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,p=["debug","info","warn","error","log","assert","trace"],h={};function m(e){if(!("console"in s))return e();const t=s.console,r={},n=Object.keys(h);n.forEach(e=>{const n=h[e];r[e]=t[e],t[e]=n});try{return e()}finally{n.forEach(e=>{t[e]=r[e]})}}function f(){return x().enabled}function g(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];u&&f()&&m(()=>{s.console[e](`Sentry Logger [${e}]:`,...r)})}function x(){return u?d("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const v={enable:function(){x().enabled=!0},disable:function(){x().enabled=!1},isEnabled:f,log:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("log",...t)},warn:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("warn",...t)},error:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("error",...t)}},b=Object.prototype.toString;function y(e){switch(b.call(e)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return A(e,Error)}}function k(e,t){return b.call(e)===`[object ${t}]`}function j(e){return k(e,"ErrorEvent")}function w(e){return k(e,"DOMError")}function S(e){return k(e,"String")}function $(e){return"object"===typeof e&&null!==e&&"__sentry_template_string__"in e&&"__sentry_template_values__"in e}function z(e){return null===e||$(e)||"object"!==typeof e&&"function"!==typeof e}function _(e){return k(e,"Object")}function N(e){return"undefined"!==typeof Event&&A(e,Event)}function E(e){return Boolean(e?.then&&"function"===typeof e.then)}function A(e,t){try{return e instanceof t}catch{return!1}}function C(e){return"undefined"!==typeof Request&&A(e,Request)}function D(e,t,r){if(!(t in e))return;const n=e[t];if("function"!==typeof n)return;const a=r(n);"function"===typeof a&&T(a,n);try{e[t]=a}catch{u&&v.log(`Failed to replace method "${t}" in object`,e)}}function F(e,t,r){try{Object.defineProperty(e,t,{value:r,writable:!0,configurable:!0})}catch{u&&v.log(`Failed to add non-enumerable property "${String(t)}" to object`,e)}}function T(e,t){try{const r=t.prototype||{};e.prototype=t.prototype=r,F(e,"__sentry_original__",t)}catch{}}function O(e){return e.__sentry_original__}function P(e){if(y(e))return{message:e.message,name:e.name,stack:e.stack,...L(e)};if(N(e)){const{type:t,target:r,currentTarget:n,detail:a}=e;return{type:t,target:r,currentTarget:n,...a?{detail:a}:{},...L(e)}}return e}function L(e){return"object"===typeof e&&null!==e?Object.fromEntries(Object.entries(e)):{}}let R;function I(e){if(void 0!==R)return R?R(e):e();const t=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),r=s;return t in r&&"function"===typeof r[t]?(R=r[t],R(e)):(R=null,e())}function M(){return I(()=>Math.random())}function B(){return I(()=>Date.now())}let V;function U(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){const e=s;return e.crypto||e.msCrypto}();try{if(e?.randomUUID)return I(()=>e.randomUUID()).replace(/-/g,"")}catch{}return V||(V="10000000100040008000100000000000"),V.replace(/[018]/g,e=>(e^(16*M()&15)>>e/4).toString(16))}function K(e){return e.exception?.values?.[0]}function H(e){const{message:t,event_id:r}=e;if(t)return t;const n=K(e);return n?n.type&&n.value?`${n.type}: ${n.value}`:n.type||n.value||r||"<unknown>":r||"<unknown>"}function W(e,t,r){const n=e.exception=e.exception||{},a=n.values=n.values||[],i=a[0]=a[0]||{};i.value||(i.value=t||""),i.type||(i.type=r||"Error")}function q(e,t){const r=K(e);if(!r)return;const n=r.mechanism;if(r.mechanism={type:"generic",handled:!0,...n,...t},t&&"data"in t){const e={...n?.data,...t.data};r.mechanism.data=e}}function Y(e){if(function(e){try{return e.__sentry_captured__}catch{}}(e))return!0;try{F(e,"__sentry_captured__",!0)}catch{}return!1}function G(){return B()/1e3}let Q;function J(){return(Q??(Q=function(){const{performance:e}=s;if(!e?.now||!e.timeOrigin)return G;const t=e.timeOrigin;return()=>(t+I(()=>e.now()))/1e3}()))()}function X(e){const t=J(),r={sid:U(),init:!0,timestamp:t,started:t,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>function(e){return{sid:`${e.sid}`,init:e.init,started:new Date(1e3*e.started).toISOString(),timestamp:new Date(1e3*e.timestamp).toISOString(),status:e.status,errors:e.errors,did:"number"===typeof e.did||"string"===typeof e.did?`${e.did}`:void 0,duration:e.duration,abnormal_mechanism:e.abnormal_mechanism,attrs:{release:e.release,environment:e.environment,ip_address:e.ipAddress,user_agent:e.userAgent}}}(r)};return e&&Z(r,e),r}function Z(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.user&&(!e.ipAddress&&t.user.ip_address&&(e.ipAddress=t.user.ip_address),e.did||t.did||(e.did=t.user.id||t.user.email||t.user.username)),e.timestamp=t.timestamp||J(),t.abnormal_mechanism&&(e.abnormal_mechanism=t.abnormal_mechanism),t.ignoreDuration&&(e.ignoreDuration=t.ignoreDuration),t.sid&&(e.sid=32===t.sid.length?t.sid:U()),void 0!==t.init&&(e.init=t.init),!e.did&&t.did&&(e.did=`${t.did}`),"number"===typeof t.started&&(e.started=t.started),e.ignoreDuration)e.duration=void 0;else if("number"===typeof t.duration)e.duration=t.duration;else{const t=e.timestamp-e.started;e.duration=t>=0?t:0}t.release&&(e.release=t.release),t.environment&&(e.environment=t.environment),!e.ipAddress&&t.ipAddress&&(e.ipAddress=t.ipAddress),!e.userAgent&&t.userAgent&&(e.userAgent=t.userAgent),"number"===typeof t.errors&&(e.errors=t.errors),t.status&&(e.status=t.status)}function ee(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;if(!t||"object"!==typeof t||r<=0)return t;if(e&&0===Object.keys(t).length)return e;const n={...e};for(const a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=ee(n[a],t[a],r-1));return n}function te(){return U()}function re(){return U().substring(16)}const ne="_sentrySpan";function ae(e,t){t?F(e,ne,t):delete e[ne]}function ie(e){return e[ne]}const oe=Symbol.for("sentry.skipNormalization"),se=Symbol.for("sentry.overrideNormalizationDepth");const le="?",ce=/\(error: (.*)\)/,de=/captureMessage|captureException/;function ue(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const n=t.sort((e,t)=>e[0]-t[0]).map(e=>e[1]);return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;const a=[],i=e.split("\n");for(let o=t;o<i.length;o++){let e=i[o];e.length>1024&&(e=e.slice(0,1024));const t=ce.test(e)?e.replace(ce,"$1"):e;if(!t.includes("Error: ")){for(const e of n){const r=e(t);if(r){a.push(r);break}}if(a.length>=50+r)break}}return function(e){if(!e.length)return[];const t=Array.from(e);/sentryWrapped/.test(pe(t).function||"")&&t.pop();t.reverse(),de.test(pe(t).function||"")&&(t.pop(),de.test(pe(t).function||"")&&t.pop());return t.slice(0,50).map(e=>({...e,filename:e.filename||pe(t).filename,function:e.function||le}))}(a.slice(r))}}function pe(e){return e[e.length-1]||{}}const he="<anonymous>";function me(e){try{return e&&"function"===typeof e&&e.name||he}catch{return he}}function fe(e){const t=e.exception;if(t){const e=[];try{return t.values.forEach(t=>{t.stacktrace.frames&&e.push(...t.stacktrace.frames)}),e}catch{return}}}let ge;function xe(e){ge=e}function ve(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0;try{return ye("",e,t,r)}catch(n){return{ERROR:`**non-serializable** (${n})`}}}function be(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:102400;const n=ve(e,t);return a=n,function(e){return~-encodeURI(e).split(/%..|./).length}(JSON.stringify(a))>r?be(e,t-1,r):n;var a}function ye(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1/0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){const e=new WeakSet;function t(t){return!!e.has(t)||(e.add(t),!1)}function r(t){e.delete(t)}return[t,r]}();const[i,o]=a;if(null==t||["boolean","string"].includes(typeof t)||"number"===typeof t&&Number.isFinite(t))return t;const s=ke(e,t);if(!s.startsWith("[object "))return s;if(function(e){return Boolean(e[oe])}(t))return t;const l=function(e){const t=e[se];return"number"===typeof t?t:void 0}(t),c=void 0!==l?l:r;if(0===c)return s.replace("object ","");if(i(t))return"[Circular ~]";const d=t;if(d&&"function"===typeof d.toJSON)try{return ye("",d.toJSON(),c-1,n,a)}catch{}const u=Array.isArray(t)?[]:{};let p=0;const h=P(t);for(const m in h){if(!Object.prototype.hasOwnProperty.call(h,m))continue;if(p>=n){u[m]="[MaxProperties ~]";break}const e=h[m];u[m]=ye(m,e,c-1,n,a),p++}return o(t),u}function ke(e,t){try{if(ge){const e=ge(t);if(e)return e}if("undefined"!==typeof globalThis&&t===globalThis)return"[Global]";if("number"===typeof t&&!Number.isFinite(t))return`[${t}]`;if("function"===typeof t)return`[Function: ${me(t)}]`;if("symbol"===typeof t)return`[${String(t)}]`;if("bigint"===typeof t)return`[BigInt: ${String(t)}]`;const e=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(t);return`[object ${e}]`}catch(r){return`**non-serializable** (${r})`}}function je(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"string"!==typeof e||0===t||e.length<=t?e:`${e.slice(0,t)}...`}function we(e,t){if(!Array.isArray(e))return"";const r=[];for(let n=0;n<e.length;n++){const t=e[n];z(t)?r.push(String(t)):t instanceof Error?r.push(t.message?`${t.name}: ${t.message}`:t.name):r.push(ke(0,t))}return r.join(t)}function Se(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return!!S(e)&&(k(t,"RegExp")?t.test(e):S(t)?r?e===t:e.includes(t):"function"===typeof t&&t(e))}function $e(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(const n of t)if(Se(e,n,r))return!0;return!1}class ze{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:te(),sampleRand:M()}}clone(){const e=new ze;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,e._conversationId=this._conversationId,ae(e,ie(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Z(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setConversationId(e){return this._conversationId=e||void 0,this._notifyScopeListeners(),this}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,t){return this.setTags({[e]:t})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,t){return this.setAttributes({[e]:t})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,t){return this._extra={...this._extra,[e]:t},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,t){return null===t?delete this._contexts[e]:this._contexts[e]=t,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const t="function"===typeof e?e(this):e,r=t instanceof ze?t.getScopeData():_(t)?e:void 0,{tags:n,attributes:a,extra:i,user:o,contexts:s,level:l,fingerprint:c=[],propagationContext:d,conversationId:u}=r||{};return this._tags={...this._tags,...n},this._attributes={...this._attributes,...a},this._extra={...this._extra,...i},this._contexts={...this._contexts,...s},o&&Object.keys(o).length&&(this._user=o),l&&(this._level=l),c.length&&(this._fingerprint=c),d&&(this._propagationContext=d),u&&(this._conversationId=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,this._conversationId=void 0,ae(this,void 0),this._attachments=[],this.setPropagationContext({traceId:te(),sampleRand:M()}),this._notifyScopeListeners(),this}addBreadcrumb(e,t){const r="number"===typeof t?t:100;if(r<=0)return this;const n={timestamp:G(),...e,message:e.message?je(e.message,2048):e.message};return this._breadcrumbs.push(n),this._breadcrumbs.length>r&&(this._breadcrumbs=this._breadcrumbs.slice(-r),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:ie(this),conversationId:this._conversationId}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=ee(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,t){const r=t?.event_id||U();if(!this._client)return u&&v.warn("No client configured on scope - will not capture exception!"),r;const n=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:n,...t,event_id:r},this),r}captureMessage(e,t,r){const n=r?.event_id||U();if(!this._client)return u&&v.warn("No client configured on scope - will not capture message!"),n;const a=r?.syntheticException??new Error(e);return this._client.captureMessage(e,t,{originalException:e,syntheticException:a,...r,event_id:n},this),n}captureEvent(e,t){const r=e.event_id||t?.event_id||U();return this._client?(this._client.captureEvent(e,{...t,event_id:r},this),r):(u&&v.warn("No client configured on scope - will not capture event!"),r)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}const _e=e=>e instanceof Promise&&!e[Ne],Ne=Symbol("chained PromiseLike"),Ee=(e,t)=>{if(!t)return e;let r=!1;for(const n in e){if(n in t)continue;r=!0;const a=e[n];"function"===typeof a?Object.defineProperty(t,n,{value:function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return a.apply(e,r)},enumerable:!0,configurable:!0,writable:!0}):t[n]=a}return r&&Object.assign(t,{[Ne]:!0}),t};class Ae{constructor(e,t){let r,n;r=e||new ze,n=t||new ze,this._stack=[{scope:r}],this._isolationScope=n}withScope(e){const t=this._pushScope();let r;try{r=e(t)}catch(n){throw this._popScope(),n}return E(r)?((e,t,r)=>{const n=e.then(e=>(t(e),e),e=>{throw r(e),e});return _e(n)&&_e(e)?n:Ee(e,n)})(r,()=>this._popScope(),()=>this._popScope()):(this._popScope(),r)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return!(this._stack.length<=1)&&!!this._stack.pop()}}function Ce(){const e=c(l());return e.stack=e.stack||new Ae(d("defaultCurrentScope",()=>new ze),d("defaultIsolationScope",()=>new ze))}function De(e){return Ce().withScope(e)}function Fe(e,t){const r=Ce();return r.withScope(()=>(r.getStackTop().scope=e,t(e)))}function Te(e){return Ce().withScope(()=>e(Ce().getIsolationScope()))}function Oe(e){const t=c(e);return t.acs?t.acs:{withIsolationScope:Te,withScope:De,withSetScope:Fe,withSetIsolationScope:(e,t)=>Te(t),getCurrentScope:()=>Ce().getScope(),getIsolationScope:()=>Ce().getIsolationScope()}}let Pe;function Le(){return Oe(l()).getCurrentScope()}function Re(){return Oe(l()).getIsolationScope()}function Ie(){return Le().getClient()}function Me(e){const t=Pe?.();if(t)return{trace_id:t.traceId,span_id:t.spanId};const r=e.getPropagationContext(),{traceId:n,parentSpanId:a,propagationSpanId:i}=r,o={trace_id:n,span_id:i||re()};return a&&(o.parent_span_id=a),o}const Be="production";function Ve(e){return new Ke(t=>{t(e)})}function Ue(e){return new Ke((t,r)=>{r(e)})}class Ke{constructor(e){this._state=0,this._handlers=[],this._runExecutor(e)}then(e,t){return new Ke((r,n)=>{this._handlers.push([!1,t=>{if(e)try{r(e(t))}catch(a){n(a)}else r(t)},e=>{if(t)try{r(t(e))}catch(a){n(a)}else n(e)}]),this._executeHandlers()})}catch(e){return this.then(e=>e,e)}finally(e){return new Ke((t,r)=>{let n,a;return this.then(t=>{a=!1,n=t,e&&e()},t=>{a=!0,n=t,e&&e()}).then(()=>{a?r(n):t(n)})})}_executeHandlers(){if(0===this._state)return;const e=this._handlers.slice();this._handlers=[],e.forEach(e=>{e[0]||(1===this._state&&e[1](this._value),2===this._state&&e[2](this._value),e[0]=!0)})}_runExecutor(e){const t=(e,t)=>{0===this._state&&(E(t)?t.then(r,n):(this._state=e,this._value=t,this._executeHandlers()))},r=e=>{t(1,e)},n=e=>{t(2,e)};try{e(r,n)}catch(a){n(a)}}}function He(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;try{const a=We(t,r,e,n);return E(a)?a:Ve(a)}catch(a){return Ue(a)}}function We(e,t,r,n){const a=r[n];if(!e||!a)return e;const i=a({...e},t);return u&&null===i&&v.log(`Event processor "${a.id||"?"}" dropped event`),E(i)?i.then(e=>We(e,t,r,n+1)):We(i,t,r,n+1)}let qe,Ye,Ge,Qe;function Je(e){const t=s._sentryDebugIds,r=s._debugIds;if(!t&&!r)return{};const n=t?Object.keys(t):[],a=r?Object.keys(r):[];if(Qe&&n.length===Ye&&a.length===Ge)return Qe;Ye=n.length,Ge=a.length,Qe={},qe||(qe={});const i=(t,r)=>{for(const n of t){const t=r[n],a=qe?.[n];if(a&&Qe&&t)Qe[a[0]]=t,qe&&(qe[n]=[a[0],t]);else if(t){const r=e(n);for(let e=r.length-1;e>=0;e--){const a=r[e],i=a?.filename;if(i&&Qe&&qe){Qe[i]=t,qe[n]=[i,t];break}}}}};return t&&i(n,t),r&&i(a,r),Qe}const Xe="sentry.profile_id",Ze="sentry.exclusive_time";const et="sentry-";function tt(e){if(e&&(S(e)||Array.isArray(e)))return Array.isArray(e)?e.reduce((e,t)=>{const r=rt(t);return Object.entries(r).forEach(t=>{let[r,n]=t;e[r]=n}),e},{}):rt(e)}function rt(e){return e.split(",").map(e=>{const t=e.indexOf("=");if(-1===t)return[];return[e.slice(0,t),e.slice(t+1)].map(e=>{try{return decodeURIComponent(e.trim())}catch{return}})}).reduce((e,t)=>{let[r,n]=t;return r&&n&&(e[r]=n),e},{})}const nt=/^o(\d+)\./,at=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function it(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{host:r,path:n,pass:a,port:i,projectId:o,protocol:s,publicKey:l}=e;return`${s}://${l}${t&&a?`:${a}`:""}@${r}${i?`:${i}`:""}/${n?`${n}/`:n}${o}`}function ot(e){return{protocol:e.protocol,publicKey:e.publicKey||"",pass:e.pass||"",host:e.host,port:e.port||"",path:e.path||"",projectId:e.projectId}}function st(e){const t=e.getOptions(),{host:r}=e.getDsn()||{};let n;return t.orgId?n=String(t.orgId):r&&(n=function(e){const t=e.match(nt);return t?.[1]}(r)),n}function lt(e){const t="string"===typeof e?function(e){const t=at.exec(e);if(!t)return void m(()=>{console.error(`Invalid Sentry Dsn: ${e}`)});const[r,n,a="",i="",o="",s=""]=t.slice(1);let l="",c=s;const d=c.split("/");if(d.length>1&&(l=d.slice(0,-1).join("/"),c=d.pop()),c){const e=c.match(/^\d+/);e&&(c=e[0])}return ot({host:i,pass:a,path:l,projectId:c,port:o,protocol:r,publicKey:n})}(e):ot(e);if(t&&function(e){if(!u)return!0;const{port:t,projectId:r,protocol:n}=e;return!["protocol","publicKey","host","projectId"].find(t=>!e[t]&&(v.error(`Invalid Sentry Dsn: ${t} missing`),!0))&&(r.match(/^\d+$/)?function(e){return"http"===e||"https"===e}(n)?!t||!isNaN(parseInt(t,10))||(v.error(`Invalid Sentry Dsn: Invalid port ${t}`),!1):(v.error(`Invalid Sentry Dsn: Invalid protocol ${n}`),!1):(v.error(`Invalid Sentry Dsn: Invalid projectId ${r}`),!1))}(t))return t}function ct(e,t){const{value:r,unit:n}="object"===typeof(a=e)&&null!=a&&!Array.isArray(a)&&Object.keys(a).includes("value")?e:{value:e,unit:void 0};var a;const i=function(e){if(Array.isArray(e))return{value:e,type:"array"};const t="string"===typeof e?"string":"boolean"===typeof e?"boolean":"number"!==typeof e||Number.isNaN(e)?null:Number.isInteger(e)?"integer":"double";if(t)return{value:e,type:t}}(r),o=n&&"string"===typeof n?{unit:n}:{};if(i)return{...i,...o};if(!t||"skip-undefined"===t&&void 0===r)return;let s="";try{s=JSON.stringify(r)??""}catch{}return{value:s,type:"string",...o}}function dt(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const r={};for(const[n,a]of Object.entries(e??{})){const e=ct(a,t);e&&(r[n]=e)}return r}function ut(e){if(e){if("object"===typeof e&&"deref"in e&&"function"===typeof e.deref)try{return e.deref()}catch{return}return e}}const pt="_sentryScope",ht="_sentryIsolationScope";function mt(e){const t=e;return{scope:t[pt],isolationScope:ut(t[ht])}}let ft=!1;function gt(e){const{spanId:t,traceId:r,isRemote:n}=e.spanContext(),a=n?t:yt(e).parent_span_id,i=mt(e).scope;return{parent_span_id:a,span_id:n?i?.getPropagationContext().propagationSpanId||re():t,trace_id:r}}function xt(e){return e&&e.length>0?e.map(e=>{let{context:{spanId:t,traceId:r,traceFlags:n,...a},attributes:i}=e;return{span_id:t,trace_id:r,sampled:1===n,attributes:i,...a}}):void 0}function vt(e){return"number"===typeof e?bt(e):Array.isArray(e)?e[0]+e[1]/1e9:e instanceof Date?bt(e.getTime()):J()}function bt(e){return e>9999999999?e/1e3:e}function yt(e){if(wt(e))return e.getSpanJSON();const{spanId:t,traceId:r}=e.spanContext();if(jt(e)){const{attributes:n,startTime:a,name:i,endTime:o,status:s,links:l}=e;return{span_id:t,trace_id:r,data:n,description:i,parent_span_id:kt(e),start_timestamp:vt(a),timestamp:vt(o)||void 0,status:$t(s),op:n["sentry.op"],origin:n["sentry.origin"],links:xt(l)}}return{span_id:t,trace_id:r,start_timestamp:0,data:{}}}function kt(e){return"parentSpanId"in e?e.parentSpanId:"parentSpanContext"in e?e.parentSpanContext?.spanId:void 0}function jt(e){const t=e;return!!t.attributes&&!!t.startTime&&!!t.name&&!!t.endTime&&!!t.status}function wt(e){return"function"===typeof e.getSpanJSON}function St(e){const{traceFlags:t}=e.spanContext();return 1===t}function $t(e){if(e&&0!==e.code)return 1===e.code?"ok":e.message||"internal_error"}const zt="_sentryRootSpan";const _t=Nt;function Nt(e){return e[zt]||e}function Et(){ft||(m(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),ft=!0)}const At="_frozenDsc";function Ct(e,t){const r=t.getOptions(),{publicKey:n}=t.getDsn()||{},a={environment:r.environment||Be,release:r.release,public_key:n,trace_id:e,org_id:st(t)};return t.emit("createDsc",a),a}function Dt(e){const t=Ie();if(!t)return{};const r=_t(e),n=yt(r),a=n.data,i=r.spanContext().traceState,o=i?.get("sentry.sample_rate")??a["sentry.sample_rate"]??a["sentry.previous_trace_sample_rate"];function s(e){return"number"!==typeof o&&"string"!==typeof o||(e.sample_rate=`${o}`),e}const l=r[At];if(l)return s(l);const c=i?.get("sentry.dsc"),d=c&&function(e){const t=tt(e);if(!t)return;const r=Object.entries(t).reduce((e,t)=>{let[r,n]=t;return r.startsWith(et)&&(e[r.slice(7)]=n),e},{});return Object.keys(r).length>0?r:void 0}(c);if(d)return s(d);const u=Ct(e.spanContext().traceId,t),p=a["sentry.source"]??a["sentry.span.source"],h=n.description;return"url"!==p&&h&&(u.transaction=h),function(e){if("boolean"===typeof __SENTRY_TRACING__&&!__SENTRY_TRACING__)return!1;const t=e||Ie()?.getOptions();return!!t&&(null!=t.tracesSampleRate||!!t.tracesSampler)}()&&(u.sampled=String(St(r)),u.sample_rand=i?.get("sentry.sample_rand")??mt(r).scope?.getPropagationContext().sampleRand.toString()),s(u),t.emit("createDsc",u,r),u}function Ft(e,t){const{fingerprint:r,span:n,breadcrumbs:a,sdkProcessingMetadata:i}=t;!function(e,t){const{extra:r,tags:n,user:a,contexts:i,level:o,transactionName:s}=t;Object.keys(r).length&&(e.extra={...r,...e.extra});Object.keys(n).length&&(e.tags={...n,...e.tags});Object.keys(a).length&&(e.user={...a,...e.user});Object.keys(i).length&&(e.contexts={...i,...e.contexts});o&&(e.level=o);s&&"transaction"!==e.type&&(e.transaction=s)}(e,t),n&&function(e,t){e.contexts={trace:gt(t),...e.contexts},e.sdkProcessingMetadata={dynamicSamplingContext:Dt(t),...e.sdkProcessingMetadata};const r=_t(t),n=yt(r).description;n&&!e.transaction&&"transaction"===e.type&&(e.transaction=n)}(e,n),function(e,t){e.fingerprint=e.fingerprint?Array.isArray(e.fingerprint)?e.fingerprint:[e.fingerprint]:[],t&&(e.fingerprint=e.fingerprint.concat(t));e.fingerprint.length||delete e.fingerprint}(e,r),function(e,t){const r=[...e.breadcrumbs||[],...t];e.breadcrumbs=r.length?r:void 0}(e,a),function(e,t){e.sdkProcessingMetadata={...e.sdkProcessingMetadata,...t}}(e,i)}function Tt(e,t){const{extra:r,tags:n,attributes:a,user:i,contexts:o,level:s,sdkProcessingMetadata:l,breadcrumbs:c,fingerprint:d,eventProcessors:u,attachments:p,propagationContext:h,transactionName:m,span:f}=t;Ot(e,"extra",r),Ot(e,"tags",n),Ot(e,"attributes",a),Ot(e,"user",i),Ot(e,"contexts",o),e.sdkProcessingMetadata=ee(e.sdkProcessingMetadata,l,2),s&&(e.level=s),m&&(e.transactionName=m),f&&(e.span=f),c.length&&(e.breadcrumbs=[...e.breadcrumbs,...c]),d.length&&(e.fingerprint=[...e.fingerprint,...d]),u.length&&(e.eventProcessors=[...e.eventProcessors,...u]),p.length&&(e.attachments=[...e.attachments,...p]),e.propagationContext={...e.propagationContext,...h}}function Ot(e,t,r){e[t]=ee(e[t],r,1)}function Pt(e,t){const r=d("globalScope",()=>new ze).getScopeData();return e&&Tt(r,e.getScopeData()),t&&Tt(r,t.getScopeData()),r}function Lt(e,t,r,n,a,i){const{normalizeDepth:o=3,normalizeMaxBreadth:s=1e3}=e,l={...t,event_id:t.event_id||r.event_id||U(),timestamp:t.timestamp||G()},c=r.integrations||e.integrations.map(e=>e.name);!function(e,t){const{environment:r,release:n,dist:a,maxValueLength:i}=t;e.environment=e.environment||r||Be,!e.release&&n&&(e.release=n);!e.dist&&a&&(e.dist=a);const o=e.request;o?.url&&i&&(o.url=je(o.url,i));i&&e.exception?.values?.forEach(e=>{e.value&&(e.value=je(e.value,i))})}(l,e),function(e,t){t.length>0&&(e.sdk=e.sdk||{},e.sdk.integrations=[...e.sdk.integrations||[],...t])}(l,c),a&&a.emit("applyFrameMetadata",t),void 0===t.type&&function(e,t){const r=Je(t);e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.filename&&(e.debug_id=r[e.filename])})})}(l,e.stackParser);const d=function(e,t){if(!t)return e;const r=e?e.clone():new ze;return r.update(t),r}(n,r.captureContext);r.mechanism&&q(l,r.mechanism);const u=a?a.getEventProcessors():[],p=Pt(i,d),h=[...r.attachments||[],...p.attachments];h.length&&(r.attachments=h),Ft(l,p);const m=[...u,...p.eventProcessors];return(r.data&&!0===r.data.__sentry__?Ve(l):He(m,l,r)).then(e=>(e&&function(e){const t={};if(e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.debug_id&&(e.abs_path?t[e.abs_path]=e.debug_id:e.filename&&(t[e.filename]=e.debug_id),delete e.debug_id)})}),0===Object.keys(t).length)return;e.debug_meta=e.debug_meta||{},e.debug_meta.images=e.debug_meta.images||[];const r=e.debug_meta.images;Object.entries(t).forEach(e=>{let[t,n]=e;r.push({type:"sourcemap",code_file:t,debug_id:n})})}(e),"number"===typeof o&&o>0?function(e,t,r){if(!e)return null;const n={...e,...e.breadcrumbs&&{breadcrumbs:e.breadcrumbs.map(e=>({...e,...e.data&&{data:ve(e.data,t,r)}}))},...e.user&&{user:ve(e.user,t,r)},...e.contexts&&{contexts:ve(e.contexts,t,r)},...e.extra&&{extra:ve(e.extra,t,r)}};e.contexts?.trace&&n.contexts&&(n.contexts.trace=e.contexts.trace,e.contexts.trace.data&&(n.contexts.trace.data=ve(e.contexts.trace.data,t,r)));e.spans&&(n.spans=e.spans.map(e=>({...e,...e.data&&{data:ve(e.data,t,r)}})));e.contexts?.flags&&n.contexts&&(n.contexts.flags=ve(e.contexts.flags,3,r));return n}(e,o,s):e))}function Rt(e){if(e)return function(e){return e instanceof ze||"function"===typeof e}(e)||function(e){return Object.keys(e).some(e=>It.includes(e))}(e)?{captureContext:e}:e}const It=["user","level","extra","contexts","tags","fingerprint","propagationContext"];function Mt(e,t){return Le().captureEvent(e,t)}function Bt(e){const t=Re(),{user:r}=Pt(t,Le()),{userAgent:n}=s.navigator||{},a=X({user:r,...n&&{userAgent:n},...e}),i=t.getSession();return"ok"===i?.status&&Z(i,{status:"exited"}),Vt(),t.setSession(a),a}function Vt(){const e=Re(),t=Le().getSession()||e.getSession();t&&function(e,t){let r={};t?r={status:t}:"ok"===e.status&&(r={status:"exited"}),Z(e,r)}(t),Ut(),e.setSession()}function Ut(){const e=Re(),t=Ie(),r=e.getSession();r&&t&&t.captureSession(r)}function Kt(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]?Vt():Ut()}const Ht=[];function Wt(e){const t=e.defaultIntegrations||[],r=e.integrations;let n;if(t.forEach(e=>{e.isDefaultInstance=!0}),Array.isArray(r))n=[...t,...r];else if("function"===typeof r){const e=r(t);n=Array.isArray(e)?e:[e]}else n=t;return function(e){const t={};return e.forEach(e=>{const{name:r}=e,n=t[r];n&&!n.isDefaultInstance&&e.isDefaultInstance||(t[r]=e)}),Object.values(t)}(n)}function qt(e,t){for(const r of t)r?.afterAllSetup&&r.afterAllSetup(e)}function Yt(e,t,r){if(r[t.name])u&&v.log(`Integration skipped because it was already installed: ${t.name}`);else{if(r[t.name]=t,Ht.includes(t.name)||"function"!==typeof t.setupOnce||(t.setupOnce(),Ht.push(t.name)),t.setup&&"function"===typeof t.setup&&t.setup(e),"function"===typeof t.preprocessEvent){const r=t.preprocessEvent.bind(t);e.on("preprocessEvent",(t,n)=>r(t,n,e))}if("function"===typeof t.processEvent){const r=t.processEvent.bind(t),n=Object.assign((t,n)=>r(t,n,e),{id:t.name});e.addEventProcessor(n)}["processSpan","processSegmentSpan"].forEach(r=>{const n=t[r];"function"===typeof n&&e.on(r,r=>n.call(t,r,e))}),u&&v.log(`Integration installed: ${t.name}`)}}function Gt(e){const t=[];e.message&&t.push(e.message);try{const r=e.exception.values[e.exception.values.length-1];r?.value&&(t.push(r.value),r.type&&t.push(`${r.type}: ${r.value}`))}catch{}return t}const Qt=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,/can't redefine non-configurable property "solana"/,/vv\(\)\.getRestrictions is not a function/,/Can't find variable: _AutofillCallbackHandler/,/Object Not Found Matching Id:\d+, MethodName:simulateEvent/,/^Java exception was raised during method invocation$/],Jt=function(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{name:"EventFilters",setup(r){const n=r.getOptions();e=Zt(t,n)},processEvent(r,n,a){if(!e){const r=a.getOptions();e=Zt(t,r)}return function(e,t){if(e.type){if("transaction"===e.type&&function(e,t){if(!t?.length)return!1;const r=e.transaction;return!!r&&$e(r,t)}(e,t.ignoreTransactions))return u&&v.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${H(e)}`),!0}else{if(function(e,t){if(!t?.length)return!1;return Gt(e).some(e=>$e(e,t))}(e,t.ignoreErrors))return u&&v.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${H(e)}`),!0;if(function(e){if(!e.exception?.values?.length)return!1;return!e.message&&!e.exception.values.some(e=>e.stacktrace||e.type&&"Error"!==e.type||e.value)}(e))return u&&v.warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${H(e)}`),!0;if(function(e,t){if(!t?.length)return!1;const r=er(e);return!!r&&$e(r,t)}(e,t.denyUrls))return u&&v.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${H(e)}.\nUrl: ${er(e)}`),!0;if(!function(e,t){if(!t?.length)return!0;const r=er(e);return!r||$e(r,t)}(e,t.allowUrls))return u&&v.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${H(e)}.\nUrl: ${er(e)}`),!0}return!1}(r,e)?null:r}}},Xt=function(){return{...Jt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),name:"InboundFilters"}};function Zt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{allowUrls:[...e.allowUrls||[],...t.allowUrls||[]],denyUrls:[...e.denyUrls||[],...t.denyUrls||[]],ignoreErrors:[...e.ignoreErrors||[],...t.ignoreErrors||[],...e.disableErrorDefaults?[]:Qt],ignoreTransactions:[...e.ignoreTransactions||[],...t.ignoreTransactions||[]]}}function er(e){try{const t=[...e.exception?.values??[]].reverse().find(e=>void 0===e.mechanism?.parent_id&&e.stacktrace?.frames?.length),r=t?.stacktrace?.frames;return r?function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];for(let t=e.length-1;t>=0;t--){const r=e[t];if(r&&"<anonymous>"!==r.filename&&"[native code]"!==r.filename)return r.filename||null}return null}(r):null}catch{return u&&v.error(`Cannot extract url for event ${H(e)}`),null}}let tr;const rr=new WeakMap,nr=()=>({name:"FunctionToString",setupOnce(){tr=Function.prototype.toString;try{Function.prototype.toString=function(){const e=O(this),t=rr.has(Ie())&&void 0!==e?e:this;for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return tr.apply(t,n)}}catch{}},setup(e){rr.set(e,!0)}}),ar=()=>({name:"ConversationId",setup(e){e.on("spanStart",e=>{const t=Le().getScopeData(),r=Re().getScopeData(),n=t.conversationId||r.conversationId;if(n){const{op:t,data:r,description:a}=yt(e);if(!t?.startsWith("gen_ai.")&&!r["ai.operationId"]&&!a?.startsWith("ai."))return;e.setAttribute("gen_ai.conversation.id",n)}})}}),ir=()=>{let e;return{name:"Dedupe",processEvent(t){if(t.type)return t;try{if(function(e,t){if(!t)return!1;if(function(e,t){const r=e.message,n=t.message;if(!r&&!n)return!1;if(r&&!n||!r&&n)return!1;if(r!==n)return!1;if(!sr(e,t))return!1;if(!or(e,t))return!1;return!0}(e,t))return!0;if(function(e,t){const r=lr(t),n=lr(e);if(!r||!n)return!1;if(r.type!==n.type||r.value!==n.value)return!1;if(!sr(e,t))return!1;if(!or(e,t))return!1;return!0}(e,t))return!0;return!1}(t,e))return u&&v.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return e=t}}};function or(e,t){let r=fe(e),n=fe(t);if(!r&&!n)return!0;if(r&&!n||!r&&n)return!1;if(n.length!==r.length)return!1;for(let a=0;a<n.length;a++){const e=n[a],t=r[a];if(e.filename!==t.filename||e.lineno!==t.lineno||e.colno!==t.colno||e.function!==t.function)return!1}return!0}function sr(e,t){let r=e.fingerprint,n=t.fingerprint;if(!r&&!n)return!0;if(r&&!n||!r&&n)return!1;try{return!(r.join("")!==n.join(""))}catch{return!1}}function lr(e){return e.exception?.values?.[0]}function cr(e,t){!0===t.debug&&(u?v.enable():m(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")}));Le().update(t.initialScope);const r=new e(t);return function(e){Le().setClient(e)}(r),r.init(),r}function dr(e){const t=e.protocol?`${e.protocol}:`:"",r=e.port?`:${e.port}`:"";return`${t}//${e.host}${r}${e.path?`/${e.path}`:""}/api/`}function ur(e,t,r){return t||`${function(e){return`${dr(e)}${e.projectId}/envelope/`}(e)}?${function(e,t){const r={sentry_version:"7"};return e.publicKey&&(r.sentry_key=e.publicKey),t&&(r.sentry_client=`${t.name}/${t.version}`),new URLSearchParams(r).toString()}(e,r)}`}function pr(e){return[e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]]}function hr(e,t){const[r,n]=e;return[r,[...n,t]]}function mr(e,t){const r=e[1];for(const n of r){if(t(n,n[0].type))return!0}return!1}function fr(e){const t=c(s);return t.encodePolyfill?t.encodePolyfill(e):(new TextEncoder).encode(e)}function gr(e){const[t,r]=e;let n=JSON.stringify(t);function a(e){"string"===typeof n?n="string"===typeof e?n+e:[fr(n),e]:n.push("string"===typeof e?fr(e):e)}for(const i of r){const[e,t]=i;if(a(`\n${JSON.stringify(e)}\n`),"string"===typeof t||t instanceof Uint8Array)a(t);else{let e;try{e=JSON.stringify(t)}catch{e=JSON.stringify(ve(t))}a(e)}}return"string"===typeof n?n:function(e){const t=e.reduce((e,t)=>e+t.length,0),r=new Uint8Array(t);let n=0;for(const a of e)r.set(a,n),n+=a.length;return r}(n)}function xr(e){const t="string"===typeof e.data?fr(e.data):e.data;return[{type:"attachment",length:t.length,filename:e.filename,content_type:e.contentType,attachment_type:e.attachmentType},t]}const vr={sessions:"session",event:"error",client_report:"internal",user_report:"default",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",raw_security:"security",log:"log_item",trace_metric:"metric"};function br(e){return function(e){return e in vr}(e)?vr[e]:e}function yr(e){if(!e?.sdk)return;const{name:t,version:r}=e.sdk;return{name:t,version:r}}function kr(e,t,r,n){const a=yr(r),i=e.type&&"replay_event"!==e.type?e.type:"event";!function(e,t){if(!t)return e;const r=e.sdk||{};e.sdk={...r,name:r.name||t.name,version:r.version||t.version,integrations:[...e.sdk?.integrations||[],...t.integrations||[]],packages:[...e.sdk?.packages||[],...t.packages||[]],settings:e.sdk?.settings||t.settings?{...e.sdk?.settings,...t.settings}:void 0}}(e,r?.sdk);const o=function(e,t,r,n){const a=e.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:e.event_id,sent_at:(new Date).toISOString(),...t&&{sdk:t},...!!r&&n&&{dsn:it(n)},...a&&{trace:a}}}(e,a,n,t);delete e.sdkProcessingMetadata;return pr(o,[[{type:i},e]])}function jr(){return!("undefined"!==typeof __SENTRY_BROWSER_BUNDLE__&&__SENTRY_BROWSER_BUNDLE__)&&"[object process]"===Object.prototype.toString.call("undefined"!==typeof process?process:0)}function wr(){return"undefined"!==typeof window&&(!jr()||function(){const e=s.process;return"renderer"===e?.type}())}function Sr(e,t){const r=t?"auto":"never";return[{type:"log",item_count:e.length,content_type:"application/vnd.sentry.items.log+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:r,infer_user_agent:r}},items:e}]}function $r(e,t){const r=t??zr(e)??[];if(0===r.length)return;const n=e.getOptions(),a=function(e,t,r,n,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),r&&n&&(i.dsn=it(n)),pr(i,[Sr(e,a)])}(r,n._metadata,n.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);_r().set(e,[]),e.emit("flushLogs"),e.sendEnvelope(a)}function zr(e){return _r().get(e)}function _r(){return d("clientToLogBufferMap",()=>new WeakMap)}function Nr(e,t){const r=t?"auto":"never";return[{type:"trace_metric",item_count:e.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:r,infer_user_agent:r}},items:e}]}function Er(e,t){const r=t??Ar(e)??[];if(0===r.length)return;const n=e.getOptions(),a=function(e,t,r,n,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),r&&n&&(i.dsn=it(n)),pr(i,[Nr(e,a)])}(r,n._metadata,n.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);Cr().set(e,[]),e.emit("flushMetrics"),e.sendEnvelope(a)}function Ar(e){return Cr().get(e)}function Cr(){return d("clientToMetricBufferMap",()=>new WeakMap)}function Dr(e){const t={trace_id:e.trace_id,span_id:e.span_id,parent_span_id:e.parent_span_id,name:e.description||"",start_timestamp:e.start_timestamp,end_timestamp:e.timestamp||e.start_timestamp,status:e.status&&"ok"!==e.status&&"cancelled"!==e.status?"error":"ok",is_segment:!1,attributes:{...e.data},links:e.links};return r=t,{...r,attributes:dt(r.attributes),links:r.links?.map(e=>({...e,attributes:dt(e.attributes)}))};var r}function Fr(e){return"object"===typeof e&&"function"===typeof e.unref&&e.unref(),e}const Tr=Symbol.for("SentryBufferFullError");function Or(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;const t=new Set;function r(e){t.delete(e)}return{get $(){return Array.from(t)},add:function(n){if(!(t.size<e))return Ue(Tr);const a=n();return t.add(a),a.then(()=>r(a),()=>r(a)),a},drain:function(e){if(!t.size)return Ve(!0);const r=Promise.allSettled(Array.from(t)).then(()=>!0);if(!e)return r;const n=[r,new Promise(t=>Fr(setTimeout(()=>t(!1),e)))];return Promise.race(n)}}}function Pr(e,t){let{statusCode:r,headers:n}=t,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:B();const i={...e},o=n?.["x-sentry-rate-limits"],s=n?.["retry-after"];if(o)for(const l of o.trim().split(",")){const[e,t,,,r]=l.split(":",5),n=parseInt(e,10),o=1e3*(isNaN(n)?60:n);if(t)for(const s of t.split(";"))"metric_bucket"===s&&r&&!r.split(";").includes("custom")||(i[s]=a+o);else i.all=a+o}else s?i.all=a+function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:B();const r=parseInt(`${e}`,10);if(!isNaN(r))return 1e3*r;const n=Date.parse(`${e}`);return isNaN(n)?6e4:n-t}(s,a):429===r&&(i.all=a+6e4);return i}function Lr(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Or(e.bufferSize||64),n={};return{send:function(a){const i=[];if(mr(a,(t,r)=>{const a=br(r);!function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:B();return function(e,t){return e[t]||e.all||0}(e,t)>r}(n,a)?i.push(t):e.recordDroppedEvent("ratelimit_backoff",a)}),0===i.length)return Promise.resolve({});const o=pr(a[0],i),s=t=>{!function(e,t){return mr(e,(e,r)=>t.includes(r))}(o,["client_report"])?mr(o,(r,n)=>{e.recordDroppedEvent(t,br(n))}):u&&v.warn(`Dropping client report. Will not send outcomes (reason: ${t}).`)};return r.add(()=>t({body:gr(o)}).then(e=>413===e.statusCode?(u&&v.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits."),s("send_error"),e):(u&&void 0!==e.statusCode&&(e.statusCode<200||e.statusCode>=300)&&v.warn(`Sentry responded with status code ${e.statusCode} to sent event.`),n=Pr(n,e),e),e=>{throw s("network_error"),u&&v.error("Encountered error running transport request:",e),e})).then(e=>e,e=>{if(e===Tr)return u&&v.error("Skipped sending event because buffer is full."),s("queue_overflow"),Promise.resolve({});throw e})},flush:e=>r.drain(e)}}function Rr(e){v.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`)}function Ir(e,t){if(!t?.length)return!1;for(const r of t){if(Vr(r)){if(e.description&&Se(e.description,r))return u&&Rr(e),!0;continue}const t=!!r.attributes&&Object.keys(r.attributes).length>0;if(!r.name&&!r.op&&!t)continue;const n=!r.name||e.description&&Se(e.description,r.name),a=!r.op||e.op&&Se(e.op,r.op),i=!r.attributes||Object.entries(r.attributes).every(t=>{let[r,n]=t;return Mr(e.attributes?.[r],n)});if(n&&a&&i)return u&&Rr(e),!0}return!1}function Mr(e,t){return"string"===typeof e&&("string"===typeof t||t instanceof RegExp)?Se(e,t):Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,r)=>e===t[r]):e===t}function Br(e,t){const r=t.parent_span_id,n=t.span_id;if(r)for(const a of e)a.parent_span_id===n&&(a.parent_span_id=r)}function Vr(e){return"string"===typeof e||e instanceof RegExp}const Ur=["forwarded","-ip","remote-","via","-user"];const Kr={userInfo:!1,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:[],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5};function Hr(e){const t=null!=e.dataCollection?Kr:!0===e.sendDefaultPii?{userInfo:!0,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:["incomingRequest","outgoingRequest","incomingResponse","outgoingResponse"],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5}:{userInfo:!1,cookies:{deny:Ur},httpHeaders:{request:{deny:Ur},response:{deny:Ur}},httpBodies:[],queryParams:{deny:Ur},genAI:{inputs:!1,outputs:!1},stackFrameVariables:!0,frameContextLines:5};const r=e.dataCollection??{};return{userInfo:r.userInfo??t.userInfo,cookies:r.cookies??t.cookies,httpHeaders:{request:r.httpHeaders?.request??t.httpHeaders.request,response:r.httpHeaders?.response??t.httpHeaders.response},httpBodies:r.httpBodies??t.httpBodies,queryParams:r.queryParams??t.queryParams,genAI:{inputs:r.genAI?.inputs??t.genAI.inputs,outputs:r.genAI?.outputs??t.genAI.outputs},stackFrameVariables:r.stackFrameVariables??t.stackFrameVariables,frameContextLines:r.frameContextLines??t.frameContextLines}}const Wr="Not capturing exception because it's already been captured.",qr="Discarded session because of missing or non-string release",Yr=Symbol.for("SentryInternalError"),Gr=Symbol.for("SentryDoNotSendEventError");function Qr(e){return{message:e,[Yr]:!0}}function Jr(e){return{message:e,[Gr]:!0}}function Xr(e){return!!e&&"object"===typeof e&&Yr in e}function Zr(e){return!!e&&"object"===typeof e&&Gr in e}function en(e,t,r,n,a){let i,o=0,s=!1;e.on(r,()=>{o=0,clearTimeout(i),s=!1}),e.on(t,t=>{if(o+=n(t),o>=8e5)a(e);else if(!s){const t=e.getOptions()._flushInterval??5e3;t>0&&(s=!0,i=Fr(setTimeout(()=>{a(e)},t)))}}),e.on("flush",()=>{a(e)})}class tn{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Or(e.transportOptions?.bufferSize??64),this._dataCollection=Hr(e),e.dsn?this._dsn=lt(e.dsn):u&&v.warn("No DSN provided, client will not send events."),this._dsn){const t=ur(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:t})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&en(this,"afterCaptureLog","flushLogs",sn,$r);(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&en(this,"afterCaptureMetric","flushMetrics",on,Er)}captureException(e,t,r){const n=U();if(Y(e))return u&&v.log(Wr),n;const a={event_id:n,...t};return this._process(()=>this.eventFromException(e,a).then(e=>this._captureEvent(e,a,r)).then(e=>e),"error"),a.event_id}captureMessage(e,t,r,n){const a={event_id:U(),...r},i=$(e)?e:String(e),o=z(e),s=o?this.eventFromMessage(i,t,a):this.eventFromException(e,a);return this._process(()=>s.then(e=>this._captureEvent(e,a,n)),o?"unknown":"error"),a.event_id}captureEvent(e,t,r){const n=U();if(t?.originalException&&Y(t.originalException))return u&&v.log(Wr),n;const a={event_id:n,...t},i=e.sdkProcessingMetadata||{},o=i.capturedSpanScope,s=i.capturedSpanIsolationScope,l=rn(e.type);return this._process(()=>this._captureEvent(e,a,o||r,s),l),a.event_id}captureSession(e){this.sendSession(e),Z(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getDataCollectionOptions(){return this._dataCollection}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const t=this._transport;if(this.emit("flush"),!t)return!0;const r=await this._isClientDoneProcessing(e),n=await t.flush(e);return r&&n}async close(e){$r(this);const t=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),t}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(e=>{let{name:t}=e;return t.startsWith("Spotlight")}))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}getIntegrationNames(){return Object.keys(this._integrations)}addIntegration(e){const t=this._integrations[e.name];!t&&e.beforeSetup&&e.beforeSetup(this),Yt(this,e,this._integrations),t||qt(this,[e])}sendEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.emit("beforeSendEvent",e,t);const r=function(e,t){if("transaction"!==e.type||!e.spans?.length||!e.sdkProcessingMetadata?.hasGenAiSpans||!t.getOptions().streamGenAiSpans||function(e){return"stream"===e.getOptions().traceLifecycle}(t))return;const r=[],n=[];for(const i of e.spans)i.op?.startsWith("gen_ai.")?r.push(Dr(i)):n.push(i);if(0===r.length)return;e.spans=n;const a=t.getOptions().sendDefaultPii?"auto":"never";return[{type:"span",item_count:r.length,content_type:"application/vnd.sentry.items.span.v2+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:a,infer_user_agent:a}},items:r}]}(e,this);let n=kr(e,this._dsn,this._options._metadata,this._options.tunnel);for(const a of t.attachments||[])n=hr(n,xr(a));r&&(n=hr(n,r)),this.sendEnvelope(n).then(t=>this.emit("afterSendEvent",e,t))}sendSession(e){const{release:t,environment:r=Be}=this._options;if("aggregates"in e){const n=e.attrs||{};if(!n.release&&!t)return void(u&&v.warn(qr));n.release=n.release||t,n.environment=n.environment||r,e.attrs=n}else{if(!e.release&&!t)return void(u&&v.warn(qr));e.release=e.release||t,e.environment=e.environment||r}this.emit("beforeSendSession",e);const n=function(e,t,r,n){const a=yr(r);return pr({sent_at:(new Date).toISOString(),...a&&{sdk:a},...!!n&&t&&{dsn:it(t)}},["aggregates"in e?[{type:"sessions"},e]:[{type:"session"},e.toJSON()]])}(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(n)}recordDroppedEvent(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(this._options.sendClientReports){const n=`${e}:${t}`;u&&v.log(`Recording outcome: "${n}"${r>1?` (${r} times)`:""}`),this._outcomes[n]=(this._outcomes[n]||0)+r}}on(e,t){const r=this._hooks[e]=this._hooks[e]||new Set,n=function(){return t(...arguments)};return r.add(n),()=>{r.delete(n)}}emit(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];const a=this._hooks[e];a&&a.forEach(e=>e(...r))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(t){return u&&v.error("Error while sending envelope:",t),{}}return u&&v.error("Transport disabled"),{}}registerCleanup(e){}dispose(){}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=function(e,t){const r={};return t.forEach(t=>{t?.beforeSetup&&t.beforeSetup(e)}),t.forEach(t=>{t&&Yt(e,t,r)}),r}(this,e),qt(this,e)}_updateSessionFromEvent(e,t){let r="fatal"===t.level,n=!1;const a=t.exception?.values;if(a){n=!0,r=!1;for(const e of a)if(!1===e.mechanism?.handled){r=!0;break}}const i="ok"===e.status;(i&&0===e.errors||i&&r)&&(Z(e,{...r&&{status:"crashed"},errors:e.errors||Number(n||r)}),this.captureSession(e))}async _isClientDoneProcessing(e){let t=0;for(;!e||t<e;){if(await new Promise(e=>setTimeout(e,1)),!this._numProcessing)return!0;t++}return!1}_isEnabled(){return!1!==this.getOptions().enabled&&void 0!==this._transport}_prepareEvent(e,t,r,n){const a=this.getOptions(),i=this.getIntegrationNames();return!t.integrations&&i.length&&(t.integrations=i),this.emit("preprocessEvent",e,t),e.type||n.setLastEventId(e.event_id||t.event_id),Lt(a,e,t,r,this,n).then(e=>{if(null===e)return e;this.emit("postprocessEvent",e,t),e.contexts={trace:{...e.contexts?.trace,...Me(r)},...e.contexts};const n=function(e,t){const r=t.getPropagationContext();return r.dsc||Ct(r.traceId,e)}(this,r);return e.sdkProcessingMetadata={dynamicSamplingContext:n,...e.sdkProcessingMetadata},e})}_captureEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Le(),n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Re();return u&&nn(e)&&v.log(`Captured error event \`${Gt(e)[0]||"<unknown>"}\``),this._processEvent(e,t,r,n).then(e=>e.event_id,e=>{u&&(Zr(e)?v.log(e.message):Xr(e)?v.warn(e.message):v.warn(e))})}_processEvent(e,t,r,n){const a=this.getOptions(),{sampleRate:i}=a,o=an(e),s=nn(e),l=`before send for type \`${e.type||"error"}\``,c="undefined"===typeof i?void 0:function(e){if("boolean"===typeof e)return Number(e);const t="string"===typeof e?parseFloat(e):e;return"number"!==typeof t||isNaN(t)||t<0||t>1?void 0:t}(i);if(s&&"number"===typeof c&&M()>c)return this.recordDroppedEvent("sample_rate","error"),Ue(Jr(`Discarding event because it's not included in the random sample (sampling rate = ${i})`));const d=rn(e.type);return this._prepareEvent(e,t,r,n).then(e=>{if(null===e)throw this.recordDroppedEvent("event_processor",d),Jr("An event processor returned `null`, will not send event.");if(!0===t.data?.__sentry__)return e;const r=function(e,t,r,n){const{beforeSend:a,beforeSendTransaction:i,ignoreSpans:o}=t,s=(l=t.beforeSendSpan,!(l&&"function"===typeof l&&"_streamed"in l&&l._streamed)&&t.beforeSendSpan);var l;let c=r;if(nn(c)&&a)return a(c,n);if(an(c)){if(s||o){const t=function(e){const{trace_id:t,parent_span_id:r,span_id:n,status:a,origin:i,data:o,op:s}=e.contexts?.trace??{};return{data:o??{},description:e.transaction,op:s,parent_span_id:r,span_id:n??"",start_timestamp:e.start_timestamp??0,status:a,timestamp:e.timestamp,trace_id:t??"",origin:i,profile_id:o?.[Xe],exclusive_time:o?.[Ze],measurements:e.measurements,is_segment:!0}}(c);if(o?.length&&Ir({description:t.description,op:t.op,attributes:t.data},o))return null;if(s){const e=s(t);e?c=ee(r,{type:"transaction",timestamp:(d=e).timestamp,start_timestamp:d.start_timestamp,transaction:d.description,contexts:{trace:{trace_id:d.trace_id,span_id:d.span_id,parent_span_id:d.parent_span_id,op:d.op,status:d.status,origin:d.origin,data:{...d.data,...d.profile_id&&{[Xe]:d.profile_id},...d.exclusive_time&&{[Ze]:d.exclusive_time}}}},measurements:d.measurements}):Et()}if(c.spans){const t=[],r=c.spans;for(const e of r)if(o?.length&&Ir({description:e.description,op:e.op,attributes:e.data},o))Br(r,e);else if(s){const r=s(e);r?t.push(r):(Et(),t.push(e))}else t.push(e);const n=c.spans.length-t.length;n&&e.recordDroppedEvent("before_send","span",n),c.spans=t}}if(i){if(c.spans){const e=c.spans.length;c.sdkProcessingMetadata={...r.sdkProcessingMetadata,spanCountBeforeProcessing:e}}return i(c,n)}}var d;return c}(this,a,e,t);return function(e,t){const r=`${t} must return \`null\` or a valid event.`;if(E(e))return e.then(e=>{if(!_(e)&&null!==e)throw Qr(r);return e},e=>{throw Qr(`${t} rejected with ${e}`)});if(!_(e)&&null!==e)throw Qr(r);return e}(r,l)}).then(a=>{if(null===a){if(this.recordDroppedEvent("before_send",d),o){const t=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",t)}throw Jr(`${l} returned \`null\`, will not send event.`)}const i=r.getSession()||n.getSession();if(s&&i&&this._updateSessionFromEvent(i,a),o){const e=(a.sdkProcessingMetadata?.spanCountBeforeProcessing||0)-(a.spans?a.spans.length:0);e>0&&this.recordDroppedEvent("before_send","span",e)}const c=a.transaction_info;if(o&&c&&a.transaction!==e.transaction){const e="custom";a.transaction_info={...c,source:e}}return this.sendEvent(a,t),a}).then(null,e=>{if(Zr(e)||Xr(e))throw e;throw this.captureException(e,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:e}),Qr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${e}`)})}_process(e,t){this._numProcessing++,this._promiseBuffer.add(e).then(e=>(this._numProcessing--,e),e=>(this._numProcessing--,e===Tr&&this.recordDroppedEvent("queue_overflow",t),e))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(e=>{let[t,r]=e;const[n,a]=t.split(":");return{reason:n,category:a,quantity:r}})}_flushOutcomes(){u&&v.log("Flushing outcomes...");const e=this._clearOutcomes();if(0===e.length)return void(u&&v.log("No outcomes to send"));if(!this._dsn)return void(u&&v.log("No dsn provided, will not send outcomes"));u&&v.log("Sending outcomes:",e);const t=(r=e,pr((n=this._options.tunnel&&it(this._dsn))?{dsn:n}:{},[[{type:"client_report"},{timestamp:a||G(),discarded_events:r}]]));var r,n,a;this.sendEnvelope(t)}}function rn(e){return"replay_event"===e?"replay":e||"error"}function nn(e){return void 0===e.type}function an(e){return"transaction"===e.type}function on(e){let t=0;return e.name&&(t+=2*e.name.length),t+=8,t+ln(e.attributes)}function sn(e){let t=0;return e.message&&(t+=2*e.message.length),t+ln(e.attributes)}function ln(e){if(!e)return 0;let t=0;return Object.values(e).forEach(e=>{Array.isArray(e)?t+=e.length*cn(e[0]):z(e)?t+=cn(e):t+=100}),t}function cn(e){return"string"===typeof e?2*e.length:"number"===typeof e?8:"boolean"===typeof e?4:0}function dn(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[t],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"npm";const a=(e._metadata=e._metadata||{}).sdk=e._metadata.sdk||{};a.name||(a.name=`sentry.javascript.${t}`,a.packages=r.map(e=>({name:`${n}:@sentry/${e}`,version:o})),a.version=o)}function un(e){"aggregates"in e?void 0===e.attrs?.ip_address&&(e.attrs={...e.attrs,ip_address:"{{auto}}"}):void 0===e.ipAddress&&(e.ipAddress="{{auto}}")}function pn(e){return function(e){return y(e)&&"__sentry_fetch_url_host__"in e&&"string"===typeof e.__sentry_fetch_url_host__}(e)?`${e.message} (${e.__sentry_fetch_url_host__})`:e.message}function hn(e,t){const r=gn(e,t),n={type:bn(t),value:yn(t)};return r.length&&(n.stacktrace={frames:r}),void 0===n.type&&""===n.value&&(n.value="Unrecoverable error caught"),n}function mn(e,t,r,n){const a=Ie(),i=a?.getOptions().normalizeDepth,o=(s=t,Object.values(s).find(e=>e instanceof Error));var s;const l={__serialized__:be(t,i)};if(o)return{exception:{values:[hn(e,o)]},extra:l};const c={exception:{values:[{type:N(t)?t.constructor.name:n?"UnhandledRejection":"Error",value:wn(t,{isUnhandledRejection:n})}]},extra:l};if(r){const t=gn(e,r);t.length&&(c.exception.values[0].stacktrace={frames:t})}return c}function fn(e,t){return{exception:{values:[hn(e,t)]}}}function gn(e,t){const r=t.stacktrace||t.stack||"",n=function(e){if(e&&xn.test(e.message))return 1;return 0}(t),a=function(e){if("number"===typeof e.framesToPop)return e.framesToPop;return 0}(t);try{return e(r,n,a)}catch{}return[]}const xn=/Minified React error #\d+;/i;function vn(e){return"undefined"!==typeof WebAssembly&&"undefined"!==typeof WebAssembly.Exception&&e instanceof WebAssembly.Exception}function bn(e){const t=e?.name;if(!t&&vn(e)){return e.message&&Array.isArray(e.message)&&2==e.message.length?e.message[0]:"WebAssembly.Exception"}return t}function yn(e){const t=e?.message;return vn(e)?Array.isArray(e.message)&&2==e.message.length?e.message[1]:"wasm exception":t?t.error&&"string"===typeof t.error.message?pn(t.error):pn(e):"No error message"}function kn(e,t,r,n,a){let i;if(j(t)&&t.error){return fn(e,t.error)}if(w(t)||k(t,"DOMException")){const a=t;if("stack"in t){i=fn(e,t);const a=i.exception?.values?.[0];if(n&&r&&a&&!a.stacktrace){const t=gn(e,r);t.length&&(a.stacktrace={frames:t},q(i,{synthetic:!0}))}}else{const t=a.name||(w(a)?"DOMError":"DOMException"),o=a.message?`${t}: ${a.message}`:t;i=jn(e,o,r,n),W(i,o)}return"code"in a&&(i.tags={...i.tags,"DOMException.code":`${a.code}`}),i}if(y(t))return fn(e,t);if(_(t)||N(t)){return i=mn(e,t,r,a),q(i,{synthetic:!0}),i}return i=jn(e,t,r,n),W(i,`${t}`,void 0),q(i,{synthetic:!0}),i}function jn(e,t,r,n){const a={};if(n&&r){const n=gn(e,r);n.length&&(a.exception={values:[{value:t,stacktrace:{frames:n}}]}),q(a,{synthetic:!0})}if($(t)){const{__sentry_template_string__:e,__sentry_template_values__:r}=t;return a.logentry={message:e,params:r},a}return a.message=t,a}function wn(e,t){let{isUnhandledRejection:r}=t;const n=function(e){const t=Object.keys(P(e));return t.sort(),t[0]?t.join(", "):"[object has no keys]"}(e),a=r?"promise rejection":"exception";if(j(e))return`Event \`ErrorEvent\` captured as ${a} with message \`${e.message}\``;if(N(e)){return`Event \`${function(e){try{const t=Object.getPrototypeOf(e);return t?t.constructor.name:void 0}catch{}}(e)}\` (type=${e.type}) captured as ${a}`}return`Object captured as ${a} with keys: ${n}`}const Sn=s;function $n(){try{return Sn.document.location.href}catch{return""}}const zn=s;let _n=0;function Nn(){return _n>0}function En(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!==typeof e)return e;try{const t=e.__sentry_wrapped__;if(t)return"function"===typeof t?t:e;if(O(e))return e}catch{return e}const r=function(){for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];s._sentryWrappedDepth=(s._sentryWrappedDepth||0)+1;try{const r=n.map(e=>En(e,t));return e.apply(this,r)}catch(i){throw _n++,setTimeout(()=>{_n--}),function(){const e=Oe(l());for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];if(2===r.length){const[t,n]=r;return t?e.withSetScope(t,n):e.withScope(n)}e.withScope(r[0])}(e=>{var r,a;e.addEventProcessor(e=>(t.mechanism&&(W(e,void 0,void 0),q(e,t.mechanism)),e.extra={...e.extra,arguments:n},e)),r=i,Le().captureException(r,Rt(a))}),i}finally{s._sentryWrappedDepth=(s._sentryWrappedDepth||0)-1}};try{for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])}catch{}T(r,e),F(e,"__sentry_wrapped__",r);try{Object.getOwnPropertyDescriptor(r,"name").configurable&&Object.defineProperty(r,"name",{get:()=>e.name})}catch{}return r}function An(){const e=$n(),{referrer:t}=zn.document||{},{userAgent:r}=zn.navigator||{};return{url:e,headers:{...t&&{Referer:t},...r&&{"User-Agent":r}}}}class Cn extends tn{constructor(e){const t=(r=e,{release:"string"===typeof __SENTRY_RELEASE__?__SENTRY_RELEASE__:zn.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...r});var r;dn(t,"browser",["browser"],zn.SENTRY_SDK_SOURCE||"npm"),t._metadata?.sdk&&(t._metadata.sdk.settings={infer_ip:t.sendDefaultPii?"auto":"never",...t._metadata.sdk.settings}),super(t);const{sendDefaultPii:n,sendClientReports:a,enableLogs:i,_experiments:o,enableMetrics:s}=this._options,l=s??o?.enableMetrics??!0;zn.document&&(a||i||l)&&zn.document.addEventListener("visibilitychange",()=>{"hidden"===zn.document.visibilityState&&(a&&this._flushOutcomes(),i&&$r(this),l&&Er(this))}),n&&this.on("beforeSendSession",un)}eventFromException(e,t){return function(e,t,r,n){const a=kn(e,t,r?.syntheticException||void 0,n);return q(a),a.level="error",r?.event_id&&(a.event_id=r.event_id),Ve(a)}(this._options.stackParser,e,t,this._options.attachStacktrace)}eventFromMessage(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info",r=arguments.length>2?arguments[2]:void 0;return function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"info",n=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;const i=jn(e,t,n?.syntheticException||void 0,a);return i.level=r,n?.event_id&&(i.event_id=n.event_id),Ve(i)}(this._options.stackParser,e,t,r,this._options.attachStacktrace)}_prepareEvent(e,t,r,n){return e.platform=e.platform||"javascript",super._prepareEvent(e,t,r,n)}}const Dn={},Fn={};function Tn(e,t){return Dn[e]=Dn[e]||[],Dn[e].push(t),()=>{const r=Dn[e];if(r){const e=r.indexOf(t);-1!==e&&r.splice(e,1)}}}function On(e,t){if(!Fn[e]){Fn[e]=!0;try{t()}catch(r){u&&v.error(`Error while instrumenting ${e}`,r)}}}function Pn(e,t){const r=e&&Dn[e];if(r)for(const a of r)try{a(t)}catch(n){u&&v.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${me(a)}\nError:`,n)}}const Ln=new Set([]);function Rn(){"console"in s&&p.forEach(function(e){e in s.console&&D(s.console,e,function(t){return h[e]=t,function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r[0],i=h[e],o=Ln.size&&"string"===typeof a&&$e(a,Ln);o||Pn("console",{args:r,level:e}),(!o||u&&v.isEnabled())&&i?.apply(s.console,r)}})})}const In=s;function Mn(){if(!("fetch"in In))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Bn(e){return e&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())}function Vn(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&!function(){if("string"===typeof EdgeRuntime)return!0;if(!Mn())return!1;if(Bn(In.fetch))return!0;let e=!1;const t=In.document;if(t&&"function"===typeof t.createElement)try{const r=t.createElement("iframe");r.hidden=!0,t.head.appendChild(r),r.contentWindow?.fetch&&(e=Bn(r.contentWindow.fetch)),t.head.removeChild(r)}catch(r){u&&v.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",r)}return e}()||D(s,"fetch",function(t){return function(){const r=new Error;for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];const{method:o,url:l}=function(e){if(0===e.length)return{method:"GET",url:""};if(2===e.length){const[t,r]=e;return{url:Kn(t),method:Un(r,"method")?String(r.method).toUpperCase():C(t)&&Un(t,"method")?String(t.method).toUpperCase():"GET"}}const t=e[0];return{url:Kn(t),method:Un(t,"method")?String(t.method).toUpperCase():"GET"}}(a),c={args:a,fetchData:{method:o,url:l},startTimestamp:1e3*J(),virtualError:r,headers:Hn(a)};return e||Pn("fetch",{...c}),t.apply(s,a).then(async t=>(e?e(t):Pn("fetch",{...c,endTimestamp:1e3*J(),response:t}),t),e=>{Pn("fetch",{...c,endTimestamp:1e3*J(),error:e}),y(e)&&void 0===e.stack&&(e.stack=r.stack,F(e,"framesToPop",1));const t=Ie(),n=t?.getOptions().enhanceFetchErrorMessages??"always";if(!1!==n&&e instanceof TypeError&&("Failed to fetch"===e.message||"Load failed"===e.message||"NetworkError when attempting to fetch resource."===e.message))try{const t=new URL(c.fetchData.url).host;"always"===n?e.message=`${e.message} (${t})`:F(e,"__sentry_fetch_url_host__",t)}catch{}throw e})}})}function Un(e,t){return!!e&&"object"===typeof e&&!!e[t]}function Kn(e){return"string"===typeof e?e:e?Un(e,"url")?e.url:e.toString?e.toString():"":""}function Hn(e){const[t,r]=e;try{if("object"===typeof r&&null!==r&&"headers"in r&&r.headers)return new Headers(r.headers);if(C(t))return new Headers(t.headers)}catch{}}const Wn=100;function qn(e,t){const r=Ie(),n=Re();if(!r)return;const{beforeBreadcrumb:a=null,maxBreadcrumbs:i=Wn}=r.getOptions();if(i<=0)return;const o={timestamp:G(),...e},s=a?m(()=>a(o,t)):o;null!==s&&(r.emit&&r.emit("beforeAddBreadcrumb",s,t),n.addBreadcrumb(s,i))}function Yn(e){return"warn"===e?"warning":["fatal","error","warning","log","info","debug"].includes(e)?e:"log"}function Gn(e){return void 0===e?void 0:e>=400&&e<500?"warning":e>=500?"error":void 0}function Qn(e){if(!e)return{};const t=e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!t)return{};const r=t[6]||"",n=t[8]||"";return{host:t[4],path:t[5],protocol:t[2],search:r,hash:n,relative:t[5]+r+n}}const Jn=s;let Xn,Zn,ea;function ta(){if(!Jn.document)return;const e=Pn.bind(null,"dom"),t=ra(e,!0);Jn.document.addEventListener("click",t,!1),Jn.document.addEventListener("keypress",t,!1),["EventTarget","Node"].forEach(t=>{const r=Jn,n=r[t]?.prototype;n?.hasOwnProperty?.("addEventListener")&&(D(n,"addEventListener",function(t){return function(r,n,a){if("click"===r||"keypress"==r)try{const n=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},i=n[r]=n[r]||{refCount:0};if(!i.handler){const n=ra(e);i.handler=n,t.call(this,r,n,a)}i.refCount++}catch{}return t.call(this,r,n,a)}}),D(n,"removeEventListener",function(e){return function(t,r,n){if("click"===t||"keypress"==t)try{const r=this.__sentry_instrumentation_handlers__||{},a=r[t];a&&(a.refCount--,a.refCount<=0&&(e.call(this,t,a.handler,n),a.handler=void 0,delete r[t]),0===Object.keys(r).length&&delete this.__sentry_instrumentation_handlers__)}catch{}return e.call(this,t,r,n)}}))})}function ra(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r=>{if(!r||r._sentryCaptured)return;const n=function(e){try{return e.target}catch{return null}}(r);if(function(e,t){return"keypress"===e&&(!t?.tagName||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName&&!t.isContentEditable)}(r.type,n))return;F(r,"_sentryCaptured",!0),n&&!n._sentryId&&F(n,"_sentryId",U());const a="keypress"===r.type?"input":r.type;if(!function(e){if(e.type!==Zn)return!1;try{if(!e.target||e.target._sentryId!==ea)return!1}catch{}return!0}(r)){e({event:r,name:a,global:t}),Zn=r.type,ea=n?n._sentryId:void 0}clearTimeout(Xn),Xn=Jn.setTimeout(()=>{ea=void 0,Zn=void 0},1e3)}}const na="__sentry_xhr_v3__";function aa(){if(!Jn.XMLHttpRequest)return;const e=XMLHttpRequest.prototype;e.open=new Proxy(e.open,{apply(e,t,r){const n=new Error,a=1e3*J(),i=S(r[0])?r[0].toUpperCase():void 0,o=function(e){if(S(e))return e;try{return e.toString()}catch{}return}(r[1]);if(!i||!o)return e.apply(t,r);t[na]={method:i,url:o,request_headers:{}},"POST"===i&&o.match(/sentry_key/)&&(t.__sentry_own_request__=!0);const s=()=>{const e=t[na];if(e&&4===t.readyState){try{e.status_code=t.status}catch{}Pn("xhr",{endTimestamp:1e3*J(),startTimestamp:a,xhr:t,virtualError:n})}};return"onreadystatechange"in t&&"function"===typeof t.onreadystatechange?t.onreadystatechange=new Proxy(t.onreadystatechange,{apply:(e,t,r)=>(s(),e.apply(t,r))}):t.addEventListener("readystatechange",s),t.setRequestHeader=new Proxy(t.setRequestHeader,{apply(e,t,r){const[n,a]=r,i=t[na];return i&&S(n)&&S(a)&&(i.request_headers[n.toLowerCase()]=a),e.apply(t,r)}}),e.apply(t,r)}}),e.send=new Proxy(e.send,{apply(e,t,r){const n=t[na];if(!n)return e.apply(t,r);void 0!==r[0]&&(n.body=r[0]);return Pn("xhr",{startTimestamp:1e3*J(),xhr:t}),e.apply(t,r)}})}let ia;function oa(e){const t="history";Tn(t,e),On(t,sa)}function sa(){function e(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r.length>2?r[2]:void 0;if(a){const t=ia,n=function(e){try{return new URL(e,Jn.location.origin).toString()}catch{return e}}(String(a));if(ia=n,t===n)return e.apply(this,r);Pn("history",{from:t,to:n})}return e.apply(this,r)}}Jn.addEventListener("popstate",()=>{const e=Jn.location.href,t=ia;if(ia=e,t===e)return;Pn("history",{from:t,to:e})}),"history"in In&&In.history&&(D(Jn.history,"pushState",e),D(Jn.history,"replaceState",e))}function la(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return"<unknown>";try{let r=e;const n=5,a=[];let i=0,o=0;const s=" > ",l=s.length;let c;const d=Array.isArray(t)?t:t.keyAttrs,u=!Array.isArray(t)&&t.maxStringLength||80;for(;r&&i++<n&&(c=ca(r,d),!("html"===c||i>1&&o+a.length*l+c.length>=u));)a.push(c),o+=c.length,r=r.parentNode;return a.reverse().join(s)}catch{return"<unknown>"}}function ca(e,t){const r=e,n=[];if(!r?.tagName)return"";if("undefined"!==typeof HTMLElement&&r instanceof HTMLElement&&r.dataset){if(r.dataset.sentryComponent)return r.dataset.sentryComponent;if(r.dataset.sentryElement)return r.dataset.sentryElement}n.push(r.tagName.toLowerCase());const a=t?.length?t.filter(e=>r.getAttribute(e)).map(e=>[e,r.getAttribute(e)]):null;if(a?.length)a.forEach(e=>{n.push(`[${e[0]}="${e[1]}"]`)});else{r.id&&n.push(`#${r.id}`);const e=r.className;if(e&&S(e)){const t=e.split(/\s+/);for(const e of t)n.push(`.${e}`)}}for(const i of["aria-label","type","name","title","alt"]){const e=r.getAttribute(i);e&&n.push(`[${i}="${e}"]`)}return n.join("")}const da="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,ua=1024,pa=function(){const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"Breadcrumbs",setup(t){var r;e.console&&function(e){const t="console",r=Tn(t,e);On(t,Rn)}(function(e){return function(t){if(Ie()!==e)return;const r={category:"console",data:{arguments:t.args,logger:"console"},level:Yn(t.level),message:we(t.args," ")};if("assert"===t.level){if(!1!==t.args[0])return;r.message=`Assertion failed: ${we(t.args.slice(1)," ")||"console.assert"}`,r.data.arguments=t.args.slice(1)}qn(r,{input:t.args,level:t.level})}}(t)),e.dom&&(r=function(e,t){return function(r){if(Ie()!==e)return;let n,a,i="object"===typeof t?t.serializeAttribute:void 0,o="object"===typeof t&&"number"===typeof t.maxStringLength?t.maxStringLength:void 0;o&&o>ua&&(da&&v.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${o} was configured. Sentry will use 1024 instead.`),o=ua),"string"===typeof i&&(i=[i]);try{const e=r.event,t=function(e){return!!e&&!!e.target}(e)?e.target:e;n=la(t,{keyAttrs:i,maxStringLength:o}),a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;if(!Sn.HTMLElement)return null;let r=e;for(let n=0;n<t;n++){if(!r)return null;if(r instanceof HTMLElement){if(r.dataset.sentryComponent)return r.dataset.sentryComponent;if(r.dataset.sentryElement)return r.dataset.sentryElement}r=r.parentNode}return null}(t)}catch{n="<unknown>"}if(0===n.length)return;const s={category:`ui.${r.name}`,message:n};a&&(s.data={"ui.component_name":a}),qn(s,{event:r.event,name:r.name,global:r.global})}}(t,e.dom),Tn("dom",r),On("dom",ta)),e.xhr&&function(e){Tn("xhr",e),On("xhr",aa)}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:r,endTimestamp:n}=t,a=t.xhr[na];if(!r||!n||!a)return;const{method:i,url:o,status_code:s,body:l}=a,c={method:i,url:o,status_code:s},d={xhr:t.xhr,input:l,startTimestamp:r,endTimestamp:n},u={category:"xhr",data:c,type:"http",level:Gn(s)};e.emit("beforeOutgoingRequestBreadcrumb",u,d),qn(u,d)}}(t)),e.fetch&&function(e,t){const r="fetch",n=Tn(r,e);On(r,()=>Vn(void 0,t))}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:r,endTimestamp:n}=t;if(n&&(!t.fetchData.url.match(/sentry_key/)||"POST"!==t.fetchData.method))if(t.error){const a={data:t.error,input:t.args,startTimestamp:r,endTimestamp:n},i={category:"fetch",data:t.fetchData,level:"error",type:"http"};e.emit("beforeOutgoingRequestBreadcrumb",i,a),qn(i,a)}else{const a=t.response,i={...t.fetchData,status_code:a?.status},o={input:t.args,response:a,startTimestamp:r,endTimestamp:n},s={category:"fetch",data:i,type:"http",level:Gn(i.status_code)};e.emit("beforeOutgoingRequestBreadcrumb",s,o),qn(s,o)}}}(t)),e.history&&oa(function(e){return function(t){if(Ie()!==e)return;let r=t.from,n=t.to;const a=Qn(zn.location.href);let i=r?Qn(r):void 0;const o=Qn(n);i?.path||(i=a),a.protocol===o.protocol&&a.host===o.host&&(n=o.relative),a.protocol===i.protocol&&a.host===i.host&&(r=i.relative),qn({category:"navigation",data:{from:r,to:n}})}}(t)),e.sentry&&t.on("beforeSendEvent",function(e){return function(t){Ie()===e&&qn({category:"sentry."+("transaction"===t.type?"transaction":"event"),event_id:t.event_id,level:t.level,message:H(t)},{event:t})}}(t))}}};const ha="EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(","),ma=function(){const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"BrowserApiErrors",setupOnce(){e.setTimeout&&D(zn,"setTimeout",fa),e.setInterval&&D(zn,"setInterval",fa),e.requestAnimationFrame&&D(zn,"requestAnimationFrame",ga),e.XMLHttpRequest&&"XMLHttpRequest"in zn&&D(XMLHttpRequest.prototype,"send",xa);const t=e.eventTarget;if(t){(Array.isArray(t)?t:ha).forEach(t=>function(e,t){const r=zn,n=r[e]?.prototype;if(!n?.hasOwnProperty?.("addEventListener"))return;D(n,"addEventListener",function(r){return function(n,a,i){try{"function"===typeof a.handleEvent&&(a.handleEvent=En(a.handleEvent,{mechanism:{data:{handler:me(a),target:e},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return t.unregisterOriginalCallbacks&&function(e,t,r){e&&"object"===typeof e&&"removeEventListener"in e&&"function"===typeof e.removeEventListener&&e.removeEventListener(t,r)}(this,n,a),r.apply(this,[n,En(a,{mechanism:{data:{handler:me(a),target:e},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),i])}}),D(n,"removeEventListener",function(e){return function(t,r,n){try{const a=r.__sentry_wrapped__;a&&e.call(this,t,a,n)}catch{}return e.call(this,t,r,n)}})}(t,e))}}}};function fa(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r[0];return r[0]=En(a,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${me(e)}`}}),e.apply(this,r)}}function ga(e){return function(t){return e.apply(this,[En(t,{mechanism:{data:{handler:me(e)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function xa(e){return function(){const t=this;["onload","onerror","onprogress","onreadystatechange"].forEach(e=>{e in t&&"function"===typeof t[e]&&D(t,e,function(t){const r={mechanism:{data:{handler:me(t)},handled:!1,type:`auto.browser.browserapierrors.xhr.${e}`}},n=O(t);return n&&(r.mechanism.data.handler=me(n)),En(t,r)})});for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return e.apply(this,n)}}const va=function(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).lifecycle??"route";return{name:"BrowserSession",setupOnce(){if("undefined"===typeof zn.document)return void(da&&v.warn("Using the `browserSessionIntegration` in non-browser environments is not supported."));Bt({ignoreDuration:!0}),Kt();const t=Re();let r=t.getUser();t.addScopeListener(e=>{const t=e.getUser();r?.id===t?.id&&r?.ip_address===t?.ip_address||(Kt(),r=t)}),"route"===e&&oa(e=>{let{from:t,to:r}=e;t!==r&&(Bt({ignoreDuration:!0}),Kt())})}}};function ba(e,t){const r=e.attributes??(e.attributes={});Object.entries(t).forEach(e=>{let[t,n]=e;null==n||t in r||(r[t]=n)})}const ya=()=>({name:"CultureContext",preprocessEvent(e){const t=ka();t&&(e.contexts={...e.contexts,culture:{...t,...e.contexts?.culture}})},processSegmentSpan(e){const t=ka();t&&ba(e,{"culture.locale":t.locale,"culture.timezone":t.timezone,"culture.calendar":t.calendar})}});function ka(){try{const e=zn.Intl;if(!e)return;const t=e.DateTimeFormat().resolvedOptions();return{locale:t.locale,timezone:t.timeZone,calendar:t.calendar}}catch{return}}let ja=null;function wa(){ja=s.onerror,s.onerror=function(e,t,r,n,a){return Pn("error",{column:n,error:a,line:r,msg:e,url:t}),!!ja&&ja.apply(this,arguments)},s.onerror.__SENTRY_INSTRUMENTED__=!0}let Sa=null;function $a(){Sa=s.onunhandledrejection,s.onunhandledrejection=function(e){return Pn("unhandledrejection",e),!Sa||Sa.apply(this,arguments)},s.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const za=function(){const e={onerror:!0,onunhandledrejection:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"GlobalHandlers",setupOnce(){Error.stackTraceLimit=50},setup(t){e.onerror&&(!function(e){!function(e){const t="error";Tn(t,e),On(t,wa)}(t=>{const{stackParser:r,attachStacktrace:n}=Na();if(Ie()!==e||Nn())return;const{msg:a,url:i,line:o,column:s,error:l}=t,c=function(e,t,r,n){const a=e.exception=e.exception||{},i=a.values=a.values||[],o=i[0]=i[0]||{},s=o.stacktrace=o.stacktrace||{},l=s.frames=s.frames||[];0===l.length&&l.push({colno:n,lineno:r,filename:Ea(t)??$n(),function:le,in_app:!0});return e}(kn(r,l||a,void 0,n,!1),i,o,s);c.level="error",Mt(c,{originalException:l,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}(t),_a("onerror")),e.onunhandledrejection&&(!function(e){!function(e){const t="unhandledrejection";Tn(t,e),On(t,$a)}(t=>{const{stackParser:r,attachStacktrace:n}=Na();if(Ie()!==e||Nn())return;const a=function(e){if(z(e))return e;try{if("reason"in e)return e.reason;if("detail"in e&&"reason"in e.detail)return e.detail.reason}catch{}return e}(t),i=z(a)?{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(a)}`}]}}:kn(r,a,void 0,n,!0);i.level="error",Mt(i,{originalException:a,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}(t),_a("onunhandledrejection"))}}};function _a(e){da&&v.log(`Global Handler attached: ${e}`)}function Na(){const e=Ie();return e?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function Ea(e){if(S(e)&&0!==e.length)return e.startsWith("data:")?`<${function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(e.startsWith("data:")){const r=e.match(/^data:([^;,]+)/),n=r?r[1]:"text/plain",a=e.includes(";base64,"),i=e.indexOf(",");let o="";if(t&&-1!==i){const t=e.slice(i+1);o=t.length>10?`${t.slice(0,10)}... [truncated]`:t}return`data:${n}${a?",base64":""}${o?`,${o}`:""}`}return e}(e,!1)}>`:e}const Aa=()=>({name:"HttpContext",preprocessEvent(e){if(!zn.navigator&&!zn.location&&!zn.document)return;const t=An(),r={...t.headers,...e.request?.headers};e.request={...t,...e.request,headers:r}},processSegmentSpan(e){if(!zn.navigator&&!zn.location&&!zn.document)return;const t=An();ba(e,{"url.full":t.url||void 0,"http.request.header.user_agent":t.headers["User-Agent"],"http.request.header.referer":t.headers.Referer})}});function Ca(e,t,r,n,a,i){if(!a.exception?.values||!i||!A(i.originalException,Error))return;const o=a.exception.values.length>0?a.exception.values[a.exception.values.length-1]:void 0;o&&(a.exception.values=Da(e,t,n,i.originalException,r,a.exception.values,o,0))}function Da(e,t,r,n,a,i,o,s){if(i.length>=r+1)return i;let l=[...i];if(A(n[a],Error)){Ta(o,s,n);const i=e(t,n[a]),c=l.length;Oa(i,a,c,s),l=Da(e,t,r,n[a],a,[i,...l],i,c)}return Fa(n)&&n.errors.forEach((i,c)=>{if(A(i,Error)){Ta(o,s,n);const d=e(t,i),u=l.length;Oa(d,`errors[${c}]`,u,s),l=Da(e,t,r,i,a,[d,...l],d,u)}}),l}function Fa(e){return Array.isArray(e.errors)}function Ta(e,t,r){e.mechanism={handled:!0,type:"auto.core.linked_errors",...Fa(r)&&{is_exception_group:!0},...e.mechanism,exception_id:t}}function Oa(e,t,r,n){e.mechanism={handled:!0,...e.mechanism,type:"chained",source:t,exception_id:r,parent_id:n}}const Pa=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=e.limit||5,r=e.key||"cause";return{name:"LinkedErrors",preprocessEvent(e,n,a){Ca(hn,a.getOptions().stackParser,r,t,e,n)}}};function La(e,t,r,n){const a={filename:e,function:"<anonymous>"===t?le:t,in_app:!0};return void 0!==r&&(a.lineno=r),void 0!==n&&(a.colno=n),a}const Ra=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Ia=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Ma=/\((\S*)(?::(\d+))(?::(\d+))\)/,Ba=/at (.+?) ?\(data:(.+?),/,Va=[30,e=>{const t=e.match(Ba);if(t)return{filename:`<data:${t[2]}>`,function:t[1]};const r=Ra.exec(e);if(r){const[,e,t,n]=r;return La(e,le,+t,+n)}const n=Ia.exec(e);if(n){if(0===n[2]?.indexOf("eval")){const e=Ma.exec(n[2]);e&&(n[2]=e[1],n[3]=e[2],n[4]=e[3])}const[e,t]=qa(n[1]||le,n[2]);return La(t,e,n[3]?+n[3]:void 0,n[4]?+n[4]:void 0)}}],Ua=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Ka=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Ha=[50,e=>{const t=Ua.exec(e);if(t){if(t[3]&&t[3].indexOf(" > eval")>-1){const e=Ka.exec(t[3]);e&&(t[1]=t[1]||"eval",t[3]=e[1],t[4]=e[2],t[5]="")}let e=t[3],r=t[1]||le;return[r,e]=qa(r,e),La(e,r,t[4]?+t[4]:void 0,t[5]?+t[5]:void 0)}}],Wa=ue(...[Va,Ha]),qa=(e,t)=>{const r=-1!==e.indexOf("safari-extension"),n=-1!==e.indexOf("safari-web-extension");return r||n?[-1!==e.indexOf("@")?e.split("@")[0]:le,r?`safari-extension:${t}`:`safari-web-extension:${t}`]:[e,t]},Ya="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,Ga={};function Qa(e){const t=Ga[e];if(t)return t;let r=Jn[e];if(Bn(r))return Ga[e]=r.bind(Jn);const n=Jn.document;if(n&&"function"===typeof n.createElement)try{const t=n.createElement("iframe");t.hidden=!0,n.head.appendChild(t);const a=t.contentWindow;a?.[e]&&(r=a[e]),n.head.removeChild(t)}catch(a){Ya&&v.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,a)}return r?Ga[e]=r.bind(Jn):r}function Ja(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Qa("fetch"),r=0,n=0;return Lr(e,async function(a){const i=a.body.length;r+=i,n++;const o={body:a.body,method:"POST",referrerPolicy:"strict-origin",headers:e.headers,keepalive:r<=6e4&&n<15,...e.fetchOptions};try{const r=await t(e.url,o);return{statusCode:r.status,headers:{"x-sentry-rate-limits":r.headers.get("X-Sentry-Rate-Limits"),"retry-after":r.headers.get("Retry-After")}}}catch(s){throw Ga["fetch"]=void 0,s}finally{r-=i,n--}},Or(e.bufferSize||40))}const Xa=/^HTML(\w*)Element$/;function Za(e){if("undefined"!==typeof window&&e===window)return"[Window]";if("undefined"!==typeof document&&e===document)return"[Document]";if(function(e){if("undefined"===typeof Element)return!1;try{return e instanceof Element}catch{return!1}}(e)){const t=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(e);if(Xa.test(t))return`[HTMLElement: ${la(e)}]`}}function ei(){return!!function(){if("undefined"===typeof zn.window)return!1;const e=zn;if(e.nw)return!1;const t=e.chrome||e.browser;if(!t?.runtime?.id)return!1;const r=$n();return!(zn===zn.top&&/^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(r))}()&&(da&&m(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0)}function ti(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=!e.skipBrowserExtensionCheck&&ei();let r=null==e.defaultIntegrations?[Xt(),nr(),ar(),ma(),pa(),za(),Pa(),ir(),Aa(),ya(),va()]:e.defaultIntegrations;const n={...e,enabled:!t&&e.enabled,stackParser:(a=e.stackParser||Wa,Array.isArray(a)?ue(...a):a),integrations:Wt({integrations:e.integrations,defaultIntegrations:r}),transport:e.transport||Ja};var a;return xe(Za),cr(Cn,n)}function ri(e){const t={...e};var r,a;dn(t,"react"),r="react",a={version:n.version},Re().setContext(r,a);const i=ti(t);return xe(ni),i}function ni(e){return _(t=e)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t?"[SyntheticEvent]":Za(e);var t}var ai="popstate";function ii(e){return"object"===typeof e&&null!=e&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function oi(){return hi(function(e,t){let r=t.state?.masked,{pathname:n,search:a,hash:i}=r||e.location;return di("",{pathname:n,search:a,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default",r?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)},function(e,t){return"string"===typeof t?t:ui(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function si(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function li(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(r){}}}function ci(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function di(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?pi(t):t,state:r,key:t&&t.key||n||Math.random().toString(36).substring(2,10),unstable_mask:a}}function ui(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&"?"!==r&&(t+="?"===r.charAt(0)?r:"?"+r),n&&"#"!==n&&(t+="#"===n.charAt(0)?n:"#"+n),t}function pi(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function hi(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:a=document.defaultView,v5Compat:i=!1}=n,o=a.history,s="POP",l=null,c=d();function d(){return(o.state||{idx:null}).idx}function u(){s="POP";let e=d(),t=null==e?null:e-c;c=e,l&&l({action:s,location:h.location,delta:t})}function p(e){return mi(e)}null==c&&(c=0,o.replaceState({...o.state,idx:c},""));let h={get action(){return s},get location(){return e(a,o)},listen(e){if(l)throw new Error("A history only accepts one active listener");return a.addEventListener(ai,u),l=e,()=>{a.removeEventListener(ai,u),l=null}},createHref:e=>t(a,e),createURL:p,encodeLocation(e){let t=p(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){s="PUSH";let n=ii(e)?e:di(h.location,e,t);r&&r(n,e),c=d()+1;let u=ci(n,c),p=h.createHref(n.unstable_mask||n);try{o.pushState(u,"",p)}catch(m){if(m instanceof DOMException&&"DataCloneError"===m.name)throw m;a.location.assign(p)}i&&l&&l({action:s,location:h.location,delta:1})},replace:function(e,t){s="REPLACE";let n=ii(e)?e:di(h.location,e,t);r&&r(n,e),c=d();let a=ci(n,c),u=h.createHref(n.unstable_mask||n);o.replaceState(a,"",u),i&&l&&l({action:s,location:h.location,delta:0})},go:e=>o.go(e)};return h}function mi(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r="http://localhost";"undefined"!==typeof window&&(r="null"!==window.location.origin?window.location.origin:window.location.href),si(r,"No window.location.(origin|href) available to create URL");let n="string"===typeof e?e:ui(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}new WeakMap;function fi(e,t){return gi(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function gi(e,t,r,n){let a=Ci(("string"===typeof t?pi(t):t).pathname||"/",r);if(null==a)return null;let i=xi(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let r=e.length===t.length&&e.slice(0,-1).every((e,r)=>e===t[r]);return r?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(i);let o=null;for(let s=0;null==o&&s<i.length;++s){let e=Ai(a);o=_i(i[s],e,n)}return o}function xi(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e,i){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,s=arguments.length>3?arguments[3]:void 0,l={relativePath:void 0===s?e.path||"":s,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};if(l.relativePath.startsWith("/")){if(!l.relativePath.startsWith(n)&&o)return;si(l.relativePath.startsWith(n),`Absolute route path "${l.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),l.relativePath=l.relativePath.slice(n.length)}let c=Ri([n,l.relativePath]),d=r.concat(l);e.children&&e.children.length>0&&(si(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${c}".`),xi(e.children,t,d,c,o)),(null!=e.path||e.index)&&t.push({path:c,score:zi(c,e.index),routesMeta:d})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let r of vi(e.path))i(e,t,!0,r);else i(e,t)}),t}function vi(e){let t=e.split("/");if(0===t.length)return[];let[r,...n]=t,a=r.endsWith("?"),i=r.replace(/\?$/,"");if(0===n.length)return a?[i,""]:[i];let o=vi(n.join("/")),s=[];return s.push(...o.map(e=>""===e?i:[i,e].join("/"))),a&&s.push(...o),s.map(t=>e.startsWith("/")&&""===t?"/":t)}var bi=/^:[\w-]+$/,yi=3,ki=2,ji=1,wi=10,Si=-2,$i=e=>"*"===e;function zi(e,t){let r=e.split("/"),n=r.length;return r.some($i)&&(n+=Si),t&&(n+=ki),r.filter(e=>!$i(e)).reduce((e,t)=>e+(bi.test(t)?yi:""===t?ji:wi),n)}function _i(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:n}=e,a={},i="/",o=[];for(let s=0;s<n.length;++s){let e=n[s],l=s===n.length-1,c="/"===i?t:t.slice(i.length)||"/",d=Ni({path:e.relativePath,caseSensitive:e.caseSensitive,end:l},c),u=e.route;if(!d&&l&&r&&!n[n.length-1].route.index&&(d=Ni({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!d)return null;Object.assign(a,d.params),o.push({params:a,pathname:Ri([i,d.pathname]),pathnameBase:Ii(Ri([i,d.pathnameBase])),route:u}),"/"!==d.pathnameBase&&(i=Ri([i,d.pathnameBase]))}return o}function Ni(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Ei(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:n.reduce((e,t,r)=>{let{paramName:n,isOptional:a}=t;if("*"===n){let e=s[r]||"";o=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const l=s[r];return e[n]=a&&!l?void 0:(l||"").replace(/%2F/g,"/"),e},{}),pathname:i,pathnameBase:o,pattern:e}}function Ei(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];li("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,r,a,i)=>{if(n.push({paramName:t,isOptional:null!=r}),r){let t=i.charAt(a+e.length);return t&&"/"!==t?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(n.push({paramName:"*"}),a+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":""!==e&&"/"!==e&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),n]}function Ai(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return li(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ci(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&"/"!==n?null:e.slice(r)||"/"}var Di=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Fi(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?r.length>1&&r.pop():"."!==e&&r.push(e)}),r.length>1?r.join("/"):"/"}function Ti(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Oi(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function Pi(e){let t=Oi(e);return t.map((e,r)=>r===t.length-1?e.pathname:e.pathnameBase)}function Li(e,t,r){let n,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?n=pi(e):(n={...e},si(!n.pathname||!n.pathname.includes("?"),Ti("?","pathname","search",n)),si(!n.pathname||!n.pathname.includes("#"),Ti("#","pathname","hash",n)),si(!n.search||!n.search.includes("#"),Ti("#","search","hash",n)));let i,o=""===e||""===n.pathname,s=o?"/":n.pathname;if(null==s)i=r;else{let e=t.length-1;if(!a&&s.startsWith("..")){let t=s.split("/");for(;".."===t[0];)t.shift(),e-=1;n.pathname=t.join("/")}i=e>=0?t[e]:"/"}let l=function(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:n,search:a="",hash:i=""}="string"===typeof e?pi(e):e;return n?(n=n.replace(/\/\/+/g,"/"),t=n.startsWith("/")?Fi(n.substring(1),"/"):Fi(n,r)):t=r,{pathname:t,search:Mi(a),hash:Bi(i)}}(n,i),c=s&&"/"!==s&&s.endsWith("/"),d=(o||"."===s)&&r.endsWith("/");return l.pathname.endsWith("/")||!c&&!d||(l.pathname+="/"),l}var Ri=e=>e.join("/").replace(/\/\/+/g,"/"),Ii=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Mi=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",Bi=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";var Vi=class{constructor(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.status=e,this.statusText=t||"",this.internal=n,r instanceof Error?(this.data=r.toString(),this.error=r):this.data=r}};function Ui(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}function Ki(e){return e.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Hi="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;function Wi(e,t){let r=e;if("string"!==typeof r||!Di.test(r))return{absoluteURL:void 0,isExternal:!1,to:r};let n=r,a=!1;if(Hi)try{let e=new URL(window.location.href),n=r.startsWith("//")?new URL(e.protocol+r):new URL(r),i=Ci(n.pathname,t);n.origin===e.origin&&null!=i?r=i+n.search+n.hash:a=!0}catch(i){li(!1,`<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:n,isExternal:a,to:r}}Symbol("Uninstrumented");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var qi=["POST","PUT","PATCH","DELETE"],Yi=(new Set(qi),["GET",...qi]);new Set(Yi),Symbol("ResetLoaderData");var Gi=n.createContext(null);Gi.displayName="DataRouter";var Qi=n.createContext(null);Qi.displayName="DataRouterState";var Ji=n.createContext(!1);function Xi(){return n.useContext(Ji)}var Zi=n.createContext({isTransitioning:!1});Zi.displayName="ViewTransition";var eo=n.createContext(new Map);eo.displayName="Fetchers";var to=n.createContext(null);to.displayName="Await";var ro=n.createContext(null);ro.displayName="Navigation";var no=n.createContext(null);no.displayName="Location";var ao=n.createContext({outlet:null,matches:[],isDataRoute:!1});ao.displayName="Route";var io=n.createContext(null);io.displayName="RouteError";var oo="REACT_ROUTER_ERROR";function so(){return null!=n.useContext(no)}function lo(){return si(so(),"useLocation() may be used only in the context of a <Router> component."),n.useContext(no).location}var co="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function uo(e){n.useContext(ro).static||n.useLayoutEffect(e)}function po(){let{isDataRoute:e}=n.useContext(ao);return e?function(){let{router:e}=So("useNavigate"),t=zo("useNavigate"),r=n.useRef(!1);uo(()=>{r.current=!0});let a=n.useCallback(async function(n){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};li(r.current,co),r.current&&("number"===typeof n?await e.navigate(n):await e.navigate(n,{fromRouteId:t,...a}))},[e,t]);return a}():function(){si(so(),"useNavigate() may be used only in the context of a <Router> component.");let e=n.useContext(Gi),{basename:t,navigator:r}=n.useContext(ro),{matches:a}=n.useContext(ao),{pathname:i}=lo(),o=JSON.stringify(Pi(a)),s=n.useRef(!1);uo(()=>{s.current=!0});let l=n.useCallback(function(n){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(li(s.current,co),!s.current)return;if("number"===typeof n)return void r.go(n);let l=Li(n,JSON.parse(o),i,"path"===a.relative);null==e&&"/"!==t&&(l.pathname="/"===l.pathname?t:Ri([t,l.pathname])),(a.replace?r.replace:r.push)(l,a.state,a)},[t,r,o,i,e]);return l}()}n.createContext(null);function ho(){let{matches:e}=n.useContext(ao),t=e[e.length-1];return t?t.params:{}}function mo(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:r}=n.useContext(ao),{pathname:a}=lo(),i=JSON.stringify(Pi(r));return n.useMemo(()=>Li(e,JSON.parse(i),a,"path"===t),[e,i,a,t])}function fo(e,t,r){si(so(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=n.useContext(ro),{matches:i}=n.useContext(ao),o=i[i.length-1],s=o?o.params:{},l=o?o.pathname:"/",c=o?o.pathnameBase:"/",d=o&&o.route;{let e=d&&d.path||"";Eo(l,!d||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let u,p=lo();if(t){let e="string"===typeof t?pi(t):t;si("/"===c||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),u=e}else u=p;let h=u.pathname||"/",m=h;if("/"!==c){let e=c.replace(/^\//,"").split("/");m="/"+h.replace(/^\//,"").split("/").slice(e.length).join("/")}let f=fi(e,{pathname:m});li(d||null!=f,`No routes matched location "${u.pathname}${u.search}${u.hash}" `),li(null==f||void 0!==f[f.length-1].route.element||void 0!==f[f.length-1].route.Component||void 0!==f[f.length-1].route.lazy,`Matched leaf route at location "${u.pathname}${u.search}${u.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let g=jo(f&&f.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:Ri([c,a.encodeLocation?a.encodeLocation(e.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?c:Ri([c,a.encodeLocation?a.encodeLocation(e.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathnameBase])})),i,r);return t&&g?n.createElement(no.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...u},navigationType:"POP"}},g):g}function go(){let e=_o(),t=Ui(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=n.createElement(n.Fragment,null,n.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),n.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",n.createElement("code",{style:o},"ErrorBoundary")," or"," ",n.createElement("code",{style:o},"errorElement")," prop on your route.")),n.createElement(n.Fragment,null,n.createElement("h2",null,"Unexpected Application Error!"),n.createElement("h3",{style:{fontStyle:"italic"}},t),r?n.createElement("pre",{style:i},r):null,s)}var xo=n.createElement(go,null),vo=class extends n.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&"object"===typeof e&&e&&"digest"in e&&"string"===typeof e.digest){const t=function(e){if(e.startsWith(`${oo}:ROUTE_ERROR_RESPONSE:{`))try{let t=JSON.parse(e.slice(40));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText)return new Vi(t.status,t.statusText,t.data)}catch{}}(e.digest);t&&(e=t)}let t=void 0!==e?n.createElement(ao.Provider,{value:this.props.routeContext},n.createElement(io.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?n.createElement(yo,{error:e},t):t}};vo.contextType=Ji;var bo=new WeakMap;function yo(e){let{children:t,error:r}=e,{basename:a}=n.useContext(ro);if("object"===typeof r&&r&&"digest"in r&&"string"===typeof r.digest){let e=function(e){if(e.startsWith(`${oo}:REDIRECT:{`))try{let t=JSON.parse(e.slice(28));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText&&"string"===typeof t.location&&"boolean"===typeof t.reloadDocument&&"boolean"===typeof t.replace)return t}catch{}}(r.digest);if(e){let t=bo.get(r);if(t)throw t;let i=Wi(e.location,a);if(Hi&&!bo.get(r)){if(!i.isExternal&&!e.reloadDocument){const t=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw bo.set(r,t),t}window.location.href=i.absoluteURL||i.to}return n.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return t}function ko(e){let{routeContext:t,match:r,children:a}=e,i=n.useContext(Gi);return i&&i.static&&i.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=r.route.id),n.createElement(ao.Provider,{value:t},a)}function jo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0,a=r?.state;if(null==e){if(!a)return null;if(a.errors)e=a.matches;else{if(0!==t.length||a.initialized||!(a.matches.length>0))return null;e=a.matches}}let i=e,o=a?.errors;if(null!=o){let e=i.findIndex(e=>e.route.id&&void 0!==o?.[e.route.id]);si(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),i=i.slice(0,Math.min(i.length,e+1))}let s=!1,l=-1;if(r&&a){s=a.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(l=e),t.route.id){let{loaderData:e,errors:n}=a,o=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!n||void 0===n[t.route.id]);if(t.route.lazy||o){r.isStatic&&(s=!0),i=l>=0?i.slice(0,l+1):[i[0]];break}}}}let c=r?.onError,d=a&&c?(e,t)=>{c(e,{location:a.location,params:a.matches?.[0]?.params??{},unstable_pattern:Ki(a.matches),errorInfo:t})}:void 0;return i.reduceRight((e,r,c)=>{let u,p=!1,h=null,m=null;a&&(u=o&&r.route.id?o[r.route.id]:void 0,h=r.route.errorElement||xo,s&&(l<0&&0===c?(Eo("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),p=!0,m=null):l===c&&(p=!0,m=r.route.hydrateFallbackElement||null)));let f=t.concat(i.slice(0,c+1)),g=()=>{let t;return t=u?h:p?m:r.route.Component?n.createElement(r.route.Component,null):r.route.element?r.route.element:e,n.createElement(ko,{match:r,routeContext:{outlet:e,matches:f,isDataRoute:null!=a},children:t})};return a&&(r.route.ErrorBoundary||r.route.errorElement||0===c)?n.createElement(vo,{location:a.location,revalidation:a.revalidation,component:h,error:u,children:g(),routeContext:{outlet:null,matches:f,isDataRoute:!0},onError:d}):g()},null)}function wo(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function So(e){let t=n.useContext(Gi);return si(t,wo(e)),t}function $o(e){let t=n.useContext(Qi);return si(t,wo(e)),t}function zo(e){let t=function(e){let t=n.useContext(ao);return si(t,wo(e)),t}(e),r=t.matches[t.matches.length-1];return si(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function _o(){let e=n.useContext(io),t=$o("useRouteError"),r=zo("useRouteError");return void 0!==e?e:t.errors?.[r]}var No={};function Eo(e,t,r){t||No[e]||(No[e]=!0,li(!1,r))}var Ao={};function Co(e,t){e||Ao[t]||(Ao[t]=!0,console.warn(t))}a.useOptimistic;n.memo(Do);function Do(e){let{routes:t,future:r,state:n,isStatic:a,onError:i}=e;return fo(t,void 0,{state:n,isStatic:a,onError:i,future:r})}function Fo(e){let{to:t,replace:r,state:a,relative:i}=e;si(so(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=n.useContext(ro);li(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:s}=n.useContext(ao),{pathname:l}=lo(),c=po(),d=Li(t,Pi(s),l,"path"===i),u=JSON.stringify(d);return n.useEffect(()=>{c(JSON.parse(u),{replace:r,state:a,relative:i})},[c,u,i,r,a]),null}function To(e){si(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Oo(e){let{basename:t="/",children:r=null,location:a,navigationType:i="POP",navigator:o,static:s=!1,unstable_useTransitions:l}=e;si(!so(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let c=t.replace(/^\/*/,"/"),d=n.useMemo(()=>({basename:c,navigator:o,static:s,unstable_useTransitions:l,future:{}}),[c,o,s,l]);"string"===typeof a&&(a=pi(a));let{pathname:u="/",search:p="",hash:h="",state:m=null,key:f="default",unstable_mask:g}=a,x=n.useMemo(()=>{let e=Ci(u,c);return null==e?null:{location:{pathname:e,search:p,hash:h,state:m,key:f,unstable_mask:g},navigationType:i}},[c,u,p,h,m,f,i,g]);return li(null!=x,`<Router basename="${c}"> is not able to match the URL "${u}${p}${h}" because it does not start with the basename, so the <Router> won't render anything.`),null==x?null:n.createElement(ro.Provider,{value:d},n.createElement(no.Provider,{children:r,value:x}))}function Po(e){let{children:t,location:r}=e;return fo(Lo(t),r)}n.Component;function Lo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=[];return n.Children.forEach(e,(e,a)=>{if(!n.isValidElement(e))return;let i=[...t,a];if(e.type===n.Fragment)return void r.push.apply(r,Lo(e.props.children,i));si(e.type===To,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),si(!e.props.index||!e.props.children,"An index route cannot have child routes.");let o={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(o.children=Lo(e.props.children,i)),r.push(o)}),r}var Ro="get",Io="application/x-www-form-urlencoded";function Mo(e){return"undefined"!==typeof HTMLElement&&e instanceof HTMLElement}function Bo(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new URLSearchParams("string"===typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,r)=>{let n=e[r];return t.concat(Array.isArray(n)?n.map(e=>[r,e]):[[r,n]])},[]))}var Vo=null;var Uo=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ko(e){return null==e||Uo.has(e)?e:(li(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Io}"`),null)}function Ho(e,t){let r,n,a,i,o;if(Mo(s=e)&&"form"===s.tagName.toLowerCase()){let o=e.getAttribute("action");n=o?Ci(o,t):null,r=e.getAttribute("method")||Ro,a=Ko(e.getAttribute("enctype"))||Io,i=new FormData(e)}else if(function(e){return Mo(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Mo(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let o=e.form;if(null==o)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let s=e.getAttribute("formaction")||o.getAttribute("action");if(n=s?Ci(s,t):null,r=e.getAttribute("formmethod")||o.getAttribute("method")||Ro,a=Ko(e.getAttribute("formenctype"))||Ko(o.getAttribute("enctype"))||Io,i=new FormData(o,e),!function(){if(null===Vo)try{new FormData(document.createElement("form"),0),Vo=!1}catch(e){Vo=!0}return Vo}()){let{name:t,type:r,value:n}=e;if("image"===r){let e=t?`${t}.`:"";i.append(`${e}x`,"0"),i.append(`${e}y`,"0")}else t&&i.append(t,n)}}else{if(Mo(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Ro,n=null,a=Io,o=e}var s;return i&&"text/plain"===a&&(o=i,i=void 0),{action:n,method:r.toLowerCase(),encType:a,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;function Wo(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}Symbol("SingleFetchRedirect");function qo(e,t,r,n){let a="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return r?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${n}`:a.pathname=`${a.pathname}.${n}`:"/"===a.pathname?a.pathname=`_root.${n}`:t&&"/"===Ci(a.pathname,t)?a.pathname=`${t.replace(/\/$/,"")}/_root.${n}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${n}`,a}async function Yo(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Go(e){return null!=e&&"string"===typeof e.page}function Qo(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Jo(e,t,r,n,a,i){let o=(e,t)=>!r[t]||e.route.id!==r[t].route.id,s=(e,t)=>r[t].pathname!==e.pathname||r[t].route.path?.endsWith("*")&&r[t].params["*"]!==e.params["*"];return"assets"===i?t.filter((e,t)=>o(e,t)||s(e,t)):"data"===i?t.filter((t,i)=>{let l=n.routes[t.route.id];if(!l||!l.hasLoader)return!1;if(o(t,i)||s(t,i))return!0;if(t.route.shouldRevalidate){let n=t.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof n)return n}return!0}):[]}function Xo(e,t){let{includeHydrateFallback:r}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n=e.map(e=>{let n=t.routes[e.route.id];if(!n)return[];let a=[n.module];return n.clientActionModule&&(a=a.concat(n.clientActionModule)),n.clientLoaderModule&&(a=a.concat(n.clientLoaderModule)),r&&n.hydrateFallbackModule&&(a=a.concat(n.hydrateFallbackModule)),n.imports&&(a=a.concat(n.imports)),a}).flat(1),[...new Set(n)];var n}function Zo(e,t){let r=new Set,n=new Set(t);return e.reduce((e,a)=>{if(t&&!Go(a)&&"script"===a.as&&a.href&&n.has(a.href))return e;let i=JSON.stringify(function(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}(a));return r.has(i)||(r.add(i),e.push({key:i,link:a})),e},[])}function es(e,t){return"lazy"===e.mode&&!0===t}function ts(){let e=n.useContext(Gi);return Wo(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function rs(){let e=n.useContext(Qi);return Wo(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var ns=n.createContext(void 0);function as(){let e=n.useContext(ns);return Wo(e,"You must render this element inside a <HydratedRouter> element"),e}function is(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function os(e,t,r){if(r&&!ds)return[e[0]];if(t){let r=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,r+1)}return e}ns.displayName="FrameworkContext";function ss(e){let{page:t,...r}=e,{router:a}=ts(),i=n.useMemo(()=>fi(a.routes,t,a.basename),[a.routes,t,a.basename]);return i?n.createElement(cs,{page:t,matches:i,...r}):null}function ls(e){let{manifest:t,routeModules:r}=as(),[a,i]=n.useState([]);return n.useEffect(()=>{let n=!1;return async function(e,t,r){let n=await Promise.all(e.map(async e=>{let n=t.routes[e.route.id];if(n){let e=await Yo(n,r);return e.links?e.links():[]}return[]}));return Zo(n.flat(1).filter(Qo).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,r).then(e=>{n||i(e)}),()=>{n=!0}},[e,t,r]),a}function cs(e){let{page:t,matches:r,...a}=e,i=lo(),{future:o,manifest:s,routeModules:l}=as(),{basename:c}=ts(),{loaderData:d,matches:u}=rs(),p=n.useMemo(()=>Jo(t,r,u,s,i,"data"),[t,r,u,s,i]),h=n.useMemo(()=>Jo(t,r,u,s,i,"assets"),[t,r,u,s,i]),m=n.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let e=new Set,n=!1;if(r.forEach(t=>{let r=s.routes[t.route.id];r&&r.hasLoader&&(!p.some(e=>e.route.id===t.route.id)&&t.route.id in d&&l[t.route.id]?.shouldRevalidate||r.hasClientLoader?n=!0:e.add(t.route.id))}),0===e.size)return[];let a=qo(t,c,o.unstable_trailingSlashAwareDataRequests,"data");return n&&e.size>0&&a.searchParams.set("_routes",r.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[a.pathname+a.search]},[c,o.unstable_trailingSlashAwareDataRequests,d,i,s,p,r,t,l]),f=n.useMemo(()=>Xo(h,s),[h,s]),g=ls(h);return n.createElement(n.Fragment,null,m.map(e=>n.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...a})),f.map(e=>n.createElement("link",{key:e,rel:"modulepreload",href:e,...a})),g.map(e=>{let{key:t,link:r}=e;return n.createElement("link",{key:t,nonce:a.nonce,...r,crossOrigin:r.crossOrigin??a.crossOrigin})}))}var ds=!1;function us(e){let{manifest:t,serverHandoffString:r,isSpaMode:a,renderMeta:i,routeDiscovery:o,ssr:s}=as(),{router:l,static:c,staticContext:d}=ts(),{matches:u}=rs(),p=Xi(),h=es(o,s);i&&(i.didRenderScripts=!0);let m=os(u,null,a);n.useEffect(()=>{ds=!0},[]);let f=n.useMemo(()=>{if(p)return null;let a=d?`window.__reactRouterContext = ${r};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",i=c?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${h?"":`import ${JSON.stringify(t.url)}`};\n${m.map((e,r)=>{let n=`route${r}`,a=t.routes[e.route.id];Wo(a,`Route ${e.route.id} not found in manifest`);let{clientActionModule:i,clientLoaderModule:o,clientMiddlewareModule:s,hydrateFallbackModule:l,module:c}=a,d=[...i?[{module:i,varName:`${n}_clientAction`}]:[],...o?[{module:o,varName:`${n}_clientLoader`}]:[],...s?[{module:s,varName:`${n}_clientMiddleware`}]:[],...l?[{module:l,varName:`${n}_HydrateFallback`}]:[],{module:c,varName:`${n}_main`}];return 1===d.length?`import * as ${n} from ${JSON.stringify(c)};`:[d.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${n} = {${d.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${h?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:r,...n}=e,a=new Set(t.state.matches.map(e=>e.route.id)),i=t.state.location.pathname.split("/").filter(Boolean),o=["/"];for(i.pop();i.length>0;)o.push(`/${i.join("/")}`),i.pop();o.forEach(e=>{let r=fi(t.routes,e,t.basename);r&&r.forEach(e=>a.add(e.route.id))});let s=[...a].reduce((e,t)=>Object.assign(e,{[t]:n.routes[t]}),{});return{...n,routes:s,sri:!!r||void 0}}(t,l),null,2)};`:""}\n  window.__reactRouterRouteModules = {${m.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return n.createElement(n.Fragment,null,n.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:a},type:void 0}),n.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:i},type:"module",async:!0}))},[]),g=ds||p?[]:(x=t.entry.imports.concat(Xo(m,t,{includeHydrateFallback:!0})),[...new Set(x)]);var x;let v="object"===typeof t.sri?t.sri:{};return Co(!p,"The <Scripts /> element is a no-op when using RSC and can be safely removed."),ds||p?null:n.createElement(n.Fragment,null,"object"===typeof t.sri?n.createElement("script",{...e,"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:v})}}):null,h?null:n.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:v[t.url],suppressHydrationWarning:!0}),n.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:v[t.entry.module],suppressHydrationWarning:!0}),g.map(t=>n.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:v[t],suppressHydrationWarning:!0})),f)}function ps(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}n.Component;function hs(e){let{error:t,isOutsideRemixApp:r}=e;console.error(t);let a,i=n.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(Ui(t))return n.createElement(ms,{title:"Unhandled Thrown Response!"},n.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),i);if(t instanceof Error)a=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);a=new Error(e)}return n.createElement(ms,{title:"Application Error!",isOutsideRemixApp:r},n.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),n.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},a.stack),i)}function ms(e){let{title:t,renderScripts:r,isOutsideRemixApp:a,children:i}=e,{routeModules:o}=as();return o.root?.Layout&&!a?i:n.createElement("html",{lang:"en"},n.createElement("head",null,n.createElement("meta",{charSet:"utf-8"}),n.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),n.createElement("title",null,t)),n.createElement("body",null,n.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},i,r?n.createElement(us,null):null)))}var fs="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{fs&&(window.__reactRouterVersion="7.13.2")}catch(bk){}function gs(e){let{basename:t,children:r,unstable_useTransitions:a,window:i}=e,o=n.useRef();null==o.current&&(o.current=oi({window:i,v5Compat:!0}));let s=o.current,[l,c]=n.useState({action:s.action,location:s.location}),d=n.useCallback(e=>{!1===a?c(e):n.startTransition(()=>c(e))},[a]);return n.useLayoutEffect(()=>s.listen(d),[s,d]),n.createElement(Oo,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:s,unstable_useTransitions:a})}var xs=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vs=n.forwardRef(function(e,t){let{onClick:r,discover:a="render",prefetch:i="none",relative:o,reloadDocument:s,replace:l,unstable_mask:c,state:d,target:u,to:p,preventScrollReset:h,viewTransition:m,unstable_defaultShouldRevalidate:f,...g}=e,{basename:x,navigator:v,unstable_useTransitions:b}=n.useContext(ro),y="string"===typeof p&&xs.test(p),k=Wi(p,x);p=k.to;let j=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};si(so(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:a}=n.useContext(ro),{hash:i,pathname:o,search:s}=mo(e,{relative:t}),l=o;return"/"!==r&&(l="/"===o?r:Ri([r,o])),a.createHref({pathname:l,search:s,hash:i})}(p,{relative:o}),w=lo(),S=null;if(c){let e=Li(c,[],w.unstable_mask?w.unstable_mask.pathname:"/",!0);"/"!==x&&(e.pathname="/"===e.pathname?x:Ri([x,e.pathname])),S=v.createHref(e)}let[$,z,_]=function(e,t){let r=n.useContext(ns),[a,i]=n.useState(!1),[o,s]=n.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:d,onMouseLeave:u,onTouchStart:p}=t,h=n.useRef(null);n.useEffect(()=>{if("render"===e&&s(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{s(e.isIntersecting)})},{threshold:.5});return h.current&&e.observe(h.current),()=>{e.disconnect()}}},[e]),n.useEffect(()=>{if(a){let e=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(e)}}},[a]);let m=()=>{i(!0)},f=()=>{i(!1),s(!1)};return r?"intent"!==e?[o,h,{}]:[o,h,{onFocus:is(l,m),onBlur:is(c,f),onMouseEnter:is(d,m),onMouseLeave:is(u,f),onTouchStart:is(p,m)}]:[!1,h,{}]}(i,g),N=function(e){let{target:t,replace:r,unstable_mask:a,state:i,preventScrollReset:o,relative:s,viewTransition:l,unstable_defaultShouldRevalidate:c,unstable_useTransitions:d}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=po(),p=lo(),h=mo(e,{relative:s});return n.useCallback(m=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(m,t)){m.preventDefault();let t=void 0!==r?r:ui(p)===ui(h),f=()=>u(e,{replace:t,unstable_mask:a,state:i,preventScrollReset:o,relative:s,viewTransition:l,unstable_defaultShouldRevalidate:c});d?n.startTransition(()=>f()):f()}},[p,u,h,r,a,i,t,e,o,s,l,c,d])}(p,{replace:l,unstable_mask:c,state:d,target:u,preventScrollReset:h,relative:o,viewTransition:m,unstable_defaultShouldRevalidate:f,unstable_useTransitions:b});let E=!(k.isExternal||s),A=n.createElement("a",{...g,..._,href:(E?S:void 0)||k.absoluteURL||j,onClick:E?function(e){r&&r(e),e.defaultPrevented||N(e)}:r,ref:ps(t,z),target:u,"data-discover":y||"render"!==a?void 0:"true"});return $&&!y?n.createElement(n.Fragment,null,A,n.createElement(ss,{page:j})):A});vs.displayName="Link",n.forwardRef(function(e,t){let{"aria-current":r="page",caseSensitive:a=!1,className:i="",end:o=!1,style:s,to:l,viewTransition:c,children:d,...u}=e,p=mo(l,{relative:u.relative}),h=lo(),m=n.useContext(Qi),{navigator:f,basename:g}=n.useContext(ro),x=null!=m&&function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.useContext(Zi);si(null!=r,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=ks("useViewTransitionState"),i=mo(e,{relative:t});if(!r.isTransitioning)return!1;let o=Ci(r.currentLocation.pathname,a)||r.currentLocation.pathname,s=Ci(r.nextLocation.pathname,a)||r.nextLocation.pathname;return null!=Ni(i.pathname,s)||null!=Ni(i.pathname,o)}(p)&&!0===c,v=f.encodeLocation?f.encodeLocation(p).pathname:p.pathname,b=h.pathname,y=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;a||(b=b.toLowerCase(),y=y?y.toLowerCase():null,v=v.toLowerCase()),y&&g&&(y=Ci(y,g)||y);const k="/"!==v&&v.endsWith("/")?v.length-1:v.length;let j,w=b===v||!o&&b.startsWith(v)&&"/"===b.charAt(k),S=null!=y&&(y===v||!o&&y.startsWith(v)&&"/"===y.charAt(v.length)),$={isActive:w,isPending:S,isTransitioning:x},z=w?r:void 0;j="function"===typeof i?i($):[i,w?"active":null,S?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let _="function"===typeof s?s($):s;return n.createElement(vs,{...u,"aria-current":z,className:j,ref:t,style:_,to:l,viewTransition:c},"function"===typeof d?d($):d)}).displayName="NavLink";var bs=n.forwardRef((e,t)=>{let{discover:r="render",fetcherKey:a,navigate:i,reloadDocument:o,replace:s,state:l,method:c=Ro,action:d,onSubmit:u,relative:p,preventScrollReset:h,viewTransition:m,unstable_defaultShouldRevalidate:f,...g}=e,{unstable_useTransitions:x}=n.useContext(ro),v=$s(),b=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:r}=n.useContext(ro),a=n.useContext(ao);si(a,"useFormAction must be used inside a RouteContext");let[i]=a.matches.slice(-1),o={...mo(e||".",{relative:t})},s=lo();if(null==e){o.search=s.search;let e=new URLSearchParams(o.search),t=e.getAll("index"),r=t.some(e=>""===e);if(r){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let r=e.toString();o.search=r?`?${r}`:""}}e&&"."!==e||!i.route.index||(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index");"/"!==r&&(o.pathname="/"===o.pathname?r:Ri([r,o.pathname]));return ui(o)}(d,{relative:p}),y="get"===c.toLowerCase()?"get":"post",k="string"===typeof d&&xs.test(d);return n.createElement("form",{ref:t,method:y,action:b,onSubmit:o?u:e=>{if(u&&u(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,r=t?.getAttribute("formmethod")||c,o=()=>v(t||e.currentTarget,{fetcherKey:a,method:r,navigate:i,replace:s,state:l,relative:p,preventScrollReset:h,viewTransition:m,unstable_defaultShouldRevalidate:f});x&&!1!==i?n.startTransition(()=>o()):o()},...g,"data-discover":k||"render"!==r?void 0:"true"})});function ys(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ks(e){let t=n.useContext(Gi);return si(t,ys(e)),t}function js(e){li("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=n.useRef(Bo(e)),r=n.useRef(!1),a=lo(),i=n.useMemo(()=>function(e,t){let r=Bo(e);return t&&t.forEach((e,n)=>{r.has(n)||t.getAll(n).forEach(e=>{r.append(n,e)})}),r}(a.search,r.current?null:t.current),[a.search]),o=po(),s=n.useCallback((e,t)=>{const n=Bo("function"===typeof e?e(new URLSearchParams(i)):e);r.current=!0,o("?"+n,t)},[o,i]);return[i,s]}bs.displayName="Form";var ws=0,Ss=()=>`__${String(++ws)}__`;function $s(){let{router:e}=ks("useSubmit"),{basename:t}=n.useContext(ro),r=zo("useRouteId"),a=e.fetch,i=e.navigate;return n.useCallback(async function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:o,method:s,encType:l,formData:c,body:d}=Ho(e,t);if(!1===n.navigate){let e=n.fetcherKey||Ss();await a(e,r,n.action||o,{unstable_defaultShouldRevalidate:n.unstable_defaultShouldRevalidate,preventScrollReset:n.preventScrollReset,formData:c,body:d,formMethod:n.method||s,formEncType:n.encType||l,flushSync:n.flushSync})}else await i(n.action||o,{unstable_defaultShouldRevalidate:n.unstable_defaultShouldRevalidate,preventScrollReset:n.preventScrollReset,formData:c,body:d,formMethod:n.method||s,formEncType:n.encType||l,replace:n.replace,state:n.state,fromRouteId:r,flushSync:n.flushSync,viewTransition:n.viewTransition})},[a,i,t,r])}var zs=function(){return zs=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},zs.apply(this,arguments)};Object.create;function _s(e,t,r){if(r||2===arguments.length)for(var n,a=0,i=t.length;a<i;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var Ns={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Es="-ms-",As="-moz-",Cs="-webkit-",Ds="comm",Fs="rule",Ts="decl",Os="@keyframes",Ps=Math.abs,Ls=String.fromCharCode,Rs=Object.assign;function Is(e){return e.trim()}function Ms(e,t){return(e=t.exec(e))?e[0]:e}function Bs(e,t,r){return e.replace(t,r)}function Vs(e,t,r){return e.indexOf(t,r)}function Us(e,t){return 0|e.charCodeAt(t)}function Ks(e,t,r){return e.slice(t,r)}function Hs(e){return e.length}function Ws(e){return e.length}function qs(e,t){return t.push(e),e}function Ys(e,t){return e.filter(function(e){return!Ms(e,t)})}var Gs=1,Qs=1,Js=0,Xs=0,Zs=0,el="";function tl(e,t,r,n,a,i,o,s){return{value:e,root:t,parent:r,type:n,props:a,children:i,line:Gs,column:Qs,length:o,return:"",siblings:s}}function rl(e,t){return Rs(tl("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function nl(e){for(;e.root;)e=rl(e.root,{children:[e]});qs(e,e.siblings)}function al(){return Zs=Xs>0?Us(el,--Xs):0,Qs--,10===Zs&&(Qs=1,Gs--),Zs}function il(){return Zs=Xs<Js?Us(el,Xs++):0,Qs++,10===Zs&&(Qs=1,Gs++),Zs}function ol(){return Us(el,Xs)}function sl(){return Xs}function ll(e,t){return Ks(el,e,t)}function cl(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function dl(e){return Gs=Qs=1,Js=Hs(el=e),Xs=0,[]}function ul(e){return el="",e}function pl(e){return Is(ll(Xs-1,fl(91===e?e+2:40===e?e+1:e)))}function hl(e){for(;(Zs=ol())&&Zs<33;)il();return cl(e)>2||cl(Zs)>3?"":" "}function ml(e,t){for(;--t&&il()&&!(Zs<48||Zs>102||Zs>57&&Zs<65||Zs>70&&Zs<97););return ll(e,sl()+(t<6&&32==ol()&&32==il()))}function fl(e){for(;il();)switch(Zs){case e:return Xs;case 34:case 39:34!==e&&39!==e&&fl(Zs);break;case 40:41===e&&fl(e);break;case 92:il()}return Xs}function gl(e,t){for(;il()&&e+Zs!==57&&(e+Zs!==84||47!==ol()););return"/*"+ll(t,Xs-1)+"*"+Ls(47===e?e:il())}function xl(e){for(;!cl(ol());)il();return ll(e,Xs)}function vl(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function bl(e,t,r,n){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case"@namespace":case Ts:return e.return=e.return||e.value;case Ds:return"";case Os:return e.return=e.value+"{"+vl(e.children,n)+"}";case Fs:if(!Hs(e.value=e.props.join(",")))return""}return Hs(r=vl(e.children,n))?e.return=e.value+"{"+r+"}":""}function yl(e,t,r){switch(function(e,t){return 45^Us(e,0)?(((t<<2^Us(e,0))<<2^Us(e,1))<<2^Us(e,2))<<2^Us(e,3):0}(e,t)){case 5103:return Cs+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Cs+e+e;case 4855:return Cs+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return As+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Cs+e+As+e+Es+e+e;case 5936:switch(Us(e,t+11)){case 114:return Cs+e+Es+Bs(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Cs+e+Es+Bs(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Cs+e+Es+Bs(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Cs+e+Es+e+e;case 6165:return Cs+e+Es+"flex-"+e+e;case 5187:return Cs+e+Bs(e,/(\w+).+(:[^]+)/,Cs+"box-$1$2"+Es+"flex-$1$2")+e;case 5443:return Cs+e+Es+"flex-item-"+Bs(e,/flex-|-self/g,"")+(Ms(e,/flex-|baseline/)?"":Es+"grid-row-"+Bs(e,/flex-|-self/g,""))+e;case 4675:return Cs+e+Es+"flex-line-pack"+Bs(e,/align-content|flex-|-self/g,"")+e;case 5548:return Cs+e+Es+Bs(e,"shrink","negative")+e;case 5292:return Cs+e+Es+Bs(e,"basis","preferred-size")+e;case 6060:return Cs+"box-"+Bs(e,"-grow","")+Cs+e+Es+Bs(e,"grow","positive")+e;case 4554:return Cs+Bs(e,/([^-])(transform)/g,"$1"+Cs+"$2")+e;case 6187:return Bs(Bs(Bs(e,/(zoom-|grab)/,Cs+"$1"),/(image-set)/,Cs+"$1"),e,"")+e;case 5495:case 3959:return Bs(e,/(image-set\([^]*)/,Cs+"$1$`$1");case 4968:return Bs(Bs(e,/(.+:)(flex-)?(.*)/,Cs+"box-pack:$3"+Es+"flex-pack:$3"),/space-between/,"justify")+Cs+e+e;case 4200:if(!Ms(e,/flex-|baseline/))return Es+"grid-column-align"+Ks(e,t)+e;break;case 2592:case 3360:return Es+Bs(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(e,r){return t=r,Ms(e.props,/grid-\w+-end/)})?~Vs(e+(r=r[t].value),"span",0)?e:Es+Bs(e,"-start","")+e+Es+"grid-row-span:"+(~Vs(r,"span",0)?Ms(r,/\d+/):+Ms(r,/\d+/)-+Ms(e,/\d+/))+";":Es+Bs(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(e){return Ms(e.props,/grid-\w+-start/)})?e:Es+Bs(Bs(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Bs(e,/(.+)-inline(.+)/,Cs+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Hs(e)-1-t>6)switch(Us(e,t+1)){case 109:if(45!==Us(e,t+4))break;case 102:return Bs(e,/(.+:)(.+)-([^]+)/,"$1"+Cs+"$2-$3$1"+As+(108==Us(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Vs(e,"stretch",0)?yl(Bs(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return Bs(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,r,n,a,i,o,s){return Es+r+":"+n+s+(a?Es+r+"-span:"+(i?o:+o-+n)+s:"")+e});case 4949:if(121===Us(e,t+6))return Bs(e,":",":"+Cs)+e;break;case 6444:switch(Us(e,45===Us(e,14)?18:11)){case 120:return Bs(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Cs+(45===Us(e,14)?"inline-":"")+"box$3$1"+Cs+"$2$3$1"+Es+"$2box$3")+e;case 100:return Bs(e,":",":"+Es)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Bs(e,"scroll-","scroll-snap-")+e}return e}function kl(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Ts:return void(e.return=yl(e.value,e.length,r));case Os:return vl([rl(e,{value:Bs(e.value,"@","@"+Cs)})],n);case Fs:if(e.length)return function(e,t){return e.map(t).join("")}(r=e.props,function(t){switch(Ms(t,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":nl(rl(e,{props:[Bs(t,/:(read-\w+)/,":-moz-$1")]})),nl(rl(e,{props:[t]})),Rs(e,{props:Ys(r,n)});break;case"::placeholder":nl(rl(e,{props:[Bs(t,/:(plac\w+)/,":"+Cs+"input-$1")]})),nl(rl(e,{props:[Bs(t,/:(plac\w+)/,":-moz-$1")]})),nl(rl(e,{props:[Bs(t,/:(plac\w+)/,Es+"input-$1")]})),nl(rl(e,{props:[t]})),Rs(e,{props:Ys(r,n)})}return""})}}function jl(e){return ul(wl("",null,null,null,[""],e=dl(e),0,[0],e))}function wl(e,t,r,n,a,i,o,s,l){for(var c=0,d=0,u=o,p=0,h=0,m=0,f=1,g=1,x=1,v=0,b="",y=a,k=i,j=n,w=b;g;)switch(m=v,v=il()){case 40:if(108!=m&&58==Us(w,u-1)){-1!=Vs(w+=Bs(pl(v),"&","&\f"),"&\f",Ps(c?s[c-1]:0))&&(x=-1);break}case 34:case 39:case 91:w+=pl(v);break;case 9:case 10:case 13:case 32:w+=hl(m);break;case 92:w+=ml(sl()-1,7);continue;case 47:switch(ol()){case 42:case 47:qs($l(gl(il(),sl()),t,r,l),l),5!=cl(m||1)&&5!=cl(ol()||1)||!Hs(w)||" "===Ks(w,-1,void 0)||(w+=" ");break;default:w+="/"}break;case 123*f:s[c++]=Hs(w)*x;case 125*f:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+d:-1==x&&(w=Bs(w,/\f/g,"")),h>0&&(Hs(w)-u||0===f&&47===m)&&qs(h>32?zl(w+";",n,r,u-1,l):zl(Bs(w," ","")+";",n,r,u-2,l),l);break;case 59:w+=";";default:if(qs(j=Sl(w,t,r,c,d,a,s,b,y=[],k=[],u,i),i),123===v)if(0===d)wl(w,t,j,j,y,i,u,s,k);else{switch(p){case 99:if(110===Us(w,3))break;case 108:if(97===Us(w,2))break;default:d=0;case 100:case 109:case 115:}d?wl(e,j,j,n&&qs(Sl(e,j,j,0,0,a,s,b,a,y=[],u,k),k),a,k,u,s,n?y:k):wl(w,j,j,j,[""],k,0,s,k)}}c=d=h=0,f=x=1,b=w="",u=o;break;case 58:u=1+Hs(w),h=m;default:if(f<1)if(123==v)--f;else if(125==v&&0==f++&&125==al())continue;switch(w+=Ls(v),v*f){case 38:x=d>0?1:(w+="\f",-1);break;case 44:s[c++]=(Hs(w)-1)*x,x=1;break;case 64:45===ol()&&(w+=pl(il())),p=ol(),d=u=Hs(b=w+=xl(sl())),v++;break;case 45:45===m&&2==Hs(w)&&(f=0)}}return i}function Sl(e,t,r,n,a,i,o,s,l,c,d,u){for(var p=a-1,h=0===a?i:[""],m=Ws(h),f=0,g=0,x=0;f<n;++f)for(var v=0,b=Ks(e,p+1,p=Ps(g=o[f])),y=e;v<m;++v)(y=Is(g>0?h[v]+" "+b:Bs(b,/&\f/g,h[v])))&&(l[x++]=y);return tl(e,t,r,0===a?Fs:s,l,c,d,u)}function $l(e,t,r,n){return tl(e,t,r,Ds,Ls(Zs),Ks(e,2,-2),0,n)}function zl(e,t,r,n,a){return tl(e,t,r,Ts,Ks(e,0,n),Ks(e,n+1,-1),n,a)}var _l="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",Nl="active",El="data-styled-version",Al="6.3.12",Cl="/*!sc*/\n",Dl="undefined"!=typeof window&&"undefined"!=typeof document,Fl=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),Tl={};function Ol(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Pl=new Map,Ll=new Map,Rl=1,Il=function(e){if(Pl.has(e))return Pl.get(e);for(;Ll.has(Rl);)Rl++;var t=Rl++;return Pl.set(e,t),Ll.set(t,e),t},Ml=function(e,t){Rl=t+1,Pl.set(e,t),Ll.set(t,e)},Bl=(new Set,Object.freeze([])),Vl=Object.freeze({});function Ul(e,t,r){return void 0===r&&(r=Vl),e.theme!==r.theme&&e.theme||t||r.theme}var Kl=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),Hl=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Wl=/(^-|-$)/g;function ql(e){return e.replace(Hl,"-").replace(Wl,"")}var Yl=/(a)(d)/gi,Gl=function(e){return String.fromCharCode(e+(e>25?39:97))};function Ql(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=Gl(t%52)+r;return(Gl(t%52)+r).replace(Yl,"$1-$2")}var Jl,Xl=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Zl=function(e){return Xl(5381,e)};function ec(e){return Ql(Zl(e)>>>0)}function tc(e){return e.displayName||e.name||"Component"}function rc(e){return"string"==typeof e&&!0}var nc="function"==typeof Symbol&&Symbol.for,ac=nc?Symbol.for("react.memo"):60115,ic=nc?Symbol.for("react.forward_ref"):60112,oc={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},sc={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},lc={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},cc=((Jl={})[ic]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Jl[ac]=lc,Jl);function dc(e){return("type"in(t=e)&&t.type.$$typeof)===ac?lc:"$$typeof"in e?cc[e.$$typeof]:oc;var t}var uc=Object.defineProperty,pc=Object.getOwnPropertyNames,hc=Object.getOwnPropertySymbols,mc=Object.getOwnPropertyDescriptor,fc=Object.getPrototypeOf,gc=Object.prototype;function xc(e,t,r){if("string"!=typeof t){if(gc){var n=fc(t);n&&n!==gc&&xc(e,n,r)}var a=pc(t);hc&&(a=a.concat(hc(t)));for(var i=dc(e),o=dc(t),s=0;s<a.length;++s){var l=a[s];if(!(l in sc||r&&r[l]||o&&l in o||i&&l in i)){var c=mc(t,l);try{uc(e,l,c)}catch(e){}}}}return e}function vc(e){return"function"==typeof e}function bc(e){return"object"==typeof e&&"styledComponentId"in e}function yc(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function kc(e,t){return e.join(t||"")}function jc(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function wc(e,t,r){if(void 0===r&&(r=!1),!r&&!jc(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=wc(e[n],t[n]);else if(jc(t))for(var n in t)e[n]=wc(e[n],t[n]);return e}function Sc(e,t){Object.defineProperty(e,"toString",{value:t})}var $c=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var r=this._cGroup;r<e;r++)t+=this.groupSizes[r];else for(r=this._cGroup-1;r>=e;r--)t-=this.groupSizes[r];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var r=this.groupSizes,n=r.length,a=n;e>=a;)if((a<<=1)<0)throw Ol(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(r),this.length=a;for(var i=n;i<a;i++)this.groupSizes[i]=0}for(var o=this.indexOfGroup(e+1),s=0,l=(i=0,t.length);i<l;i++)this.tag.insertRule(o,t[i])&&(this.groupSizes[e]++,o++,s++);s>0&&this._cGroup>e&&(this._cIndex+=s)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],r=this.indexOfGroup(e),n=r+t;this.groupSizes[e]=0;for(var a=r;a<n;a++)this.tag.deleteRule(r);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var r=this.groupSizes[e],n=this.indexOfGroup(e),a=n+r,i=n;i<a;i++)t+=this.tag.getRule(i)+Cl;return t},e}(),zc="style[".concat(_l,"][").concat(El,'="').concat(Al,'"]'),_c=new RegExp("^".concat(_l,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Nc=function(e){return"undefined"!=typeof ShadowRoot&&e instanceof ShadowRoot||"host"in e&&11===e.nodeType},Ec=function(e){if(!e)return document;if(Nc(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(Nc(t))return t}return document},Ac=function(e,t,r){for(var n,a=r.split(","),i=0,o=a.length;i<o;i++)(n=a[i])&&e.registerName(t,n)},Cc=function(e,t){for(var r,n=(null!==(r=t.textContent)&&void 0!==r?r:"").split(Cl),a=[],i=0,o=n.length;i<o;i++){var s=n[i].trim();if(s){var l=s.match(_c);if(l){var c=0|parseInt(l[1],10),d=l[2];0!==c&&(Ml(d,c),Ac(e,d,l[3]),e.getTag().insertRules(c,a)),a.length=0}else a.push(s)}}},Dc=function(e){for(var t=Ec(e.options.target).querySelectorAll(zc),r=0,n=t.length;r<n;r++){var a=t[r];a&&a.getAttribute(_l)!==Nl&&(Cc(e,a),a.parentNode&&a.parentNode.removeChild(a))}};function Fc(){return r.nc}var Tc=function(e){var t=document.head,r=e||t,n=document.createElement("style"),a=function(e){var t=Array.from(e.querySelectorAll("style[".concat(_l,"]")));return t[t.length-1]}(r),i=void 0!==a?a.nextSibling:null;n.setAttribute(_l,Nl),n.setAttribute(El,Al);var o=Fc();return o&&n.setAttribute("nonce",o),r.insertBefore(n,i),n},Oc=function(){function e(e){this.element=Tc(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){var t;if(e.sheet)return e.sheet;for(var r=null!==(t=e.getRootNode().styleSheets)&&void 0!==t?t:document.styleSheets,n=0,a=r.length;n<a;n++){var i=r[n];if(i.ownerNode===e)return i}throw Ol(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Pc=function(){function e(e){this.element=Tc(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var r=document.createTextNode(t);return this.element.insertBefore(r,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Lc=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Rc=Dl,Ic={isServer:!Dl,useCSSOMInjection:!Fl},Mc=function(){function e(e,t,r){void 0===e&&(e=Vl),void 0===t&&(t={});var n=this;this.options=zs(zs({},Ic),e),this.gs=t,this.names=new Map(r),this.server=!!e.isServer,!this.server&&Dl&&Rc&&(Rc=!1,Dc(this)),Sc(this,function(){return function(e){for(var t=e.getTag(),r=t.length,n="",a=function(r){var a=function(e){return Ll.get(e)}(r);if(void 0===a)return"continue";var i=e.names.get(a);if(void 0===i||!i.size)return"continue";var o=t.getGroup(r);if(0===o.length)return"continue";var s=_l+".g"+r+'[id="'+a+'"]',l="";i.forEach(function(e){e.length>0&&(l+=e+",")}),n+=o+s+'{content:"'+l+'"}'+Cl},i=0;i<r;i++)a(i);return n}(n)})}return e.registerId=function(e){return Il(e)},e.prototype.rehydrate=function(){!this.server&&Dl&&Dc(this)},e.prototype.reconstructWithOptions=function(t,r){void 0===r&&(r=!0);var n=new e(zs(zs({},this.options),t),this.gs,r&&this.names||void 0);return!this.server&&Dl&&t.target!==this.options.target&&Ec(this.options.target)!==Ec(t.target)&&Dc(n),n},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,r=e.target;return e.isServer?new Lc(r):t?new Oc(r):new Pc(r)}(this.options),new $c(e)));var e},e.prototype.hasNameForId=function(e,t){var r,n;return null!==(n=null===(r=this.names.get(e))||void 0===r?void 0:r.has(t))&&void 0!==n&&n},e.prototype.registerName=function(e,t){Il(e);var r=this.names.get(e);r?r.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,r){this.registerName(e,t),this.getTag().insertRules(Il(e),r)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Il(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function Bc(e,t){return null==t||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||e in Ns||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Vc=function(e){return e>="A"&&e<="Z"};function Uc(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(1===r&&"-"===n&&"-"===e[0])return e;Vc(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Kc=Symbol.for("sc-keyframes");var Hc=function(e){return null==e||!1===e||""===e},Wc=function(e){var t=[];for(var r in e){var n=e[r];e.hasOwnProperty(r)&&!Hc(n)&&(Array.isArray(n)&&n.isCss||vc(n)?t.push("".concat(Uc(r),":"),n,";"):jc(n)?t.push.apply(t,_s(_s(["".concat(r," {")],Wc(n),!1),["}"],!1)):t.push("".concat(Uc(r),": ").concat(Bc(r,n),";")))}return t};function qc(e,t,r,n,a){if(void 0===a&&(a=[]),"string"==typeof e)return e&&a.push(e),a;if(Hc(e))return a;if(bc(e))return a.push(".".concat(e.styledComponentId)),a;var i;if(vc(e))return!vc(i=e)||i.prototype&&i.prototype.isReactComponent||!t?(a.push(e),a):qc(e(t),t,r,n,a);if(function(e){return"object"==typeof e&&null!==e&&Kc in e}(e))return r?(e.inject(r,n),a.push(e.getName(n))):a.push(e),a;if(jc(e)){for(var o=Wc(e),s=0;s<o.length;s++)a.push(o[s]);return a}if(!Array.isArray(e))return a.push(e.toString()),a;for(s=0;s<e.length;s++)qc(e[s],t,r,n,a);return a}function Yc(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(vc(r)&&!bc(r))return!1}return!0}var Gc=Zl(Al),Qc=function(){function e(e,t,r){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===r||r.isStatic)&&Yc(e),this.componentId=t,this.baseHash=Xl(Gc,t),this.baseStyle=r,Mc.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,r){var n=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,r).className:"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))n=yc(n,this.staticRulesId);else{var a=kc(qc(this.rules,e,t,r)),i=Ql(Xl(this.baseHash,a)>>>0);if(!t.hasNameForId(this.componentId,i)){var o=r(a,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,o)}n=yc(n,i),this.staticRulesId=i}else{for(var s=Xl(this.baseHash,r.hash),l="",c=0;c<this.rules.length;c++){var d=this.rules[c];if("string"==typeof d)l+=d;else if(d){var u=kc(qc(d,e,t,r));s=Xl(Xl(s,String(c)),u),l+=u}}if(l){var p=Ql(s>>>0);if(!t.hasNameForId(this.componentId,p)){var h=r(l,".".concat(p),void 0,this.componentId);t.insertRules(this.componentId,p,h)}n=yc(n,p)}}return{className:n,css:"undefined"==typeof window?t.getTag().getGroup(Il(this.componentId)):""}},e}(),Jc=/&/g,Xc=47,Zc=42;function ed(e){if(-1===e.indexOf("}"))return!1;for(var t=e.length,r=0,n=0,a=!1,i=0;i<t;i++){var o=e.charCodeAt(i);if(0!==n||a||o!==Xc||e.charCodeAt(i+1)!==Zc)if(a)o===Zc&&e.charCodeAt(i+1)===Xc&&(a=!1,i++);else if(34!==o&&39!==o||0!==i&&92===e.charCodeAt(i-1)){if(0===n)if(123===o)r++;else if(125===o&&--r<0)return!0}else 0===n?n=o:n===o&&(n=0);else a=!0,i++}return 0!==r||0!==n}function td(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=td(e.children,t)),e})}function rd(e){var t,r,n,a=void 0===e?Vl:e,i=a.options,o=void 0===i?Vl:i,s=a.plugins,l=void 0===s?Bl:s,c=function(e,n,a){return a.startsWith(r)&&a.endsWith(r)&&a.replaceAll(r,"").length>0?".".concat(t):e},d=l.slice();d.push(function(e){e.type===Fs&&e.value.includes("&")&&(n||(n=new RegExp("\\".concat(r,"\\b"),"g")),e.props[0]=e.props[0].replace(Jc,r).replace(n,c))}),o.prefix&&d.push(kl),d.push(bl);var u,p=[],h=function(e){var t=Ws(e);return function(r,n,a,i){for(var o="",s=0;s<t;s++)o+=e[s](r,n,a,i)||"";return o}}(d.concat((u=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&u(e)}))),m=function(e,a,i,s){void 0===a&&(a=""),void 0===i&&(i=""),void 0===s&&(s="&"),t=s,r=a,n=void 0;var l=function(e){if(!ed(e))return e;for(var t=e.length,r="",n=0,a=0,i=0,o=!1,s=0;s<t;s++){var l=e.charCodeAt(s);if(0!==i||o||l!==Xc||e.charCodeAt(s+1)!==Zc)if(o)l===Zc&&e.charCodeAt(s+1)===Xc&&(o=!1,s++);else if(34!==l&&39!==l||0!==s&&92===e.charCodeAt(s-1)){if(0===i)if(123===l)a++;else if(125===l){if(--a<0){for(var c=s+1;c<t;){var d=e.charCodeAt(c);if(59===d||10===d)break;c++}c<t&&59===e.charCodeAt(c)&&c++,a=0,s=c-1,n=c;continue}0===a&&(r+=e.substring(n,s+1),n=s+1)}else 59===l&&0===a&&(r+=e.substring(n,s+1),n=s+1)}else 0===i?i=l:i===l&&(i=0);else o=!0,s++}if(n<t){var u=e.substring(n);ed(u)||(r+=u)}return r}(function(e){if(-1===e.indexOf("//"))return e;for(var t=e.length,r=[],n=0,a=0,i=0,o=0;a<t;){var s=e.charCodeAt(a);if(34!==s&&39!==s||0!==a&&92===e.charCodeAt(a-1))if(0===i)if(s===Xc&&a+1<t&&e.charCodeAt(a+1)===Zc){for(a+=2;a+1<t&&(e.charCodeAt(a)!==Zc||e.charCodeAt(a+1)!==Xc);)a++;a+=2}else if(40===s&&a>=3&&108==(32|e.charCodeAt(a-1))&&114==(32|e.charCodeAt(a-2))&&117==(32|e.charCodeAt(a-3)))o=1,a++;else if(o>0)41===s?o--:40===s&&o++,a++;else if(s===Zc&&a+1<t&&e.charCodeAt(a+1)===Xc)a>n&&r.push(e.substring(n,a)),n=a+=2;else if(s===Xc&&a+1<t&&e.charCodeAt(a+1)===Xc){for(a>n&&r.push(e.substring(n,a));a<t&&10!==e.charCodeAt(a);)a++;n=a}else a++;else a++;else 0===i?i=s:i===s&&(i=0),a++}return 0===n?e:(n<t&&r.push(e.substring(n)),r.join(""))}(e)),c=jl(i||a?"".concat(i," ").concat(a," { ").concat(l," }"):l);return o.namespace&&(c=td(c,o.namespace)),p=[],vl(c,h),p};return m.hash=l.length?l.reduce(function(e,t){return t.name||Ol(15),Xl(e,t.name)},5381).toString():"",m}var nd=new Mc,ad=rd(),id=n.createContext({shouldForwardProp:void 0,styleSheet:nd,stylis:ad}),od=(id.Consumer,n.createContext(void 0));function sd(){return n.useContext(id)}function ld(e){if(!n.useMemo)return e.children;var t=sd().styleSheet,r=n.useMemo(function(){var r=t;return e.sheet?r=e.sheet:e.target&&(r=r.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(r=r.reconstructWithOptions({useCSSOMInjection:!1})),r},[e.disableCSSOMInjection,e.sheet,e.target,t]),a=n.useMemo(function(){return rd({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),i=n.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:r,stylis:a}},[e.shouldForwardProp,r,a]);return n.createElement(id.Provider,{value:i},n.createElement(od.Provider,{value:a},e.children))}var cd=n.createContext(void 0);cd.Consumer;function dd(e){var t=n.useContext(cd),r=n.useMemo(function(){return function(e,t){if(!e)throw Ol(14);if(vc(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw Ol(8);return t?zs(zs({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?n.createElement(cd.Provider,{value:r},e.children):null}var ud={};new Set;function pd(e,t,r){var a=bc(e),i=e,o=!rc(e),s=t.attrs,l=void 0===s?Bl:s,c=t.componentId,d=void 0===c?function(e,t){var r="string"!=typeof e?"sc":ql(e);ud[r]=(ud[r]||0)+1;var n="".concat(r,"-").concat(ec(Al+r+ud[r]));return t?"".concat(t,"-").concat(n):n}(t.displayName,t.parentComponentId):c,u=t.displayName,p=void 0===u?function(e){return rc(e)?"styled.".concat(e):"Styled(".concat(tc(e),")")}(e):u,h=t.displayName&&t.componentId?"".concat(ql(t.displayName),"-").concat(t.componentId):t.componentId||d,m=a&&i.attrs?i.attrs.concat(l).filter(Boolean):l,f=t.shouldForwardProp;if(a&&i.shouldForwardProp){var g=i.shouldForwardProp;if(t.shouldForwardProp){var x=t.shouldForwardProp;f=function(e,t){return g(e,t)&&x(e,t)}}else f=g}var v=new Qc(r,h,a?i.componentStyle:void 0);function b(e,t){return function(e,t,r){var a=e.attrs,i=e.componentStyle,o=e.defaultProps,s=e.foldedComponentIds,l=e.styledComponentId,c=e.target,d=n.useContext(cd),u=sd(),p=e.shouldForwardProp||u.shouldForwardProp,h=Ul(t,d,o)||Vl,m=function(e,t,r){for(var n,a=zs(zs({},t),{className:void 0,theme:r}),i=0;i<e.length;i+=1){var o=vc(n=e[i])?n(a):n;for(var s in o)"className"===s?a.className=yc(a.className,o[s]):"style"===s?a.style=zs(zs({},a.style),o[s]):s in t&&void 0===t[s]||(a[s]=o[s])}return"className"in t&&"string"==typeof t.className&&(a.className=yc(a.className,t.className)),a}(a,t,h),f=m.as||c,g={};for(var x in m)void 0===m[x]||"$"===x[0]||"as"===x||"theme"===x&&m.theme===h||("forwardedAs"===x?g.as=m.forwardedAs:p&&!p(x,f)||(g[x]=m[x]));var v=function(e,t){var r=sd();return e.generateAndInjectStyles(t,r.styleSheet,r.stylis)}(i,m),b=v.className,y=yc(s,l);return b&&(y+=" "+b),m.className&&(y+=" "+m.className),g[rc(f)&&!Kl.has(f)?"class":"className"]=y,r&&(g.ref=r),(0,n.createElement)(f,g)}(y,e,t)}b.displayName=p;var y=n.forwardRef(b);return y.attrs=m,y.componentStyle=v,y.displayName=p,y.shouldForwardProp=f,y.foldedComponentIds=a?yc(i.foldedComponentIds,i.styledComponentId):"",y.styledComponentId=h,y.target=a?i.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];for(var n=0,a=t;n<a.length;n++)wc(e,a[n],!0);return e}({},i.defaultProps,e):e}}),Sc(y,function(){return".".concat(y.styledComponentId)}),o&&xc(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function hd(e,t){for(var r=[e[0]],n=0,a=t.length;n<a;n+=1)r.push(t[n],e[n+1]);return r}var md=function(e){return Object.assign(e,{isCss:!0})};function fd(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(vc(e)||jc(e))return md(qc(hd(Bl,_s([e],t,!0))));var n=e;return 0===t.length&&1===n.length&&"string"==typeof n[0]?qc(n):md(qc(hd(n,t)))}function gd(e,t,r){if(void 0===r&&(r=Vl),!t)throw Ol(1,t);var n=function(n){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,r,fd.apply(void 0,_s([n],a,!1)))};return n.attrs=function(n){return gd(e,t,zs(zs({},r),{attrs:Array.prototype.concat(r.attrs,n).filter(Boolean)}))},n.withConfig=function(n){return gd(e,t,zs(zs({},r),n))},n}var xd=function(e){return gd(pd,e)},vd=xd;Kl.forEach(function(e){vd[e]=xd(e)});var bd,yd=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Yc(e),Mc.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,r,n){var a=n(kc(qc(this.rules,t,r,n)),""),i=this.componentId+e;r.insertRules(i,i,a)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,r,n){e>2&&Mc.registerId(this.componentId+e);var a=this.componentId+e;this.isStatic?r.hasNameForId(a,a)||this.createStyles(e,t,r,n):(this.removeStyles(e,r),this.createStyles(e,t,r,n))},e}();var kd=function(){function e(e,t){var r=this;this[bd]=!0,this.inject=function(e,t){void 0===t&&(t=ad);var n=r.name+t.hash;e.hasNameForId(r.id,n)||e.insertRules(r.id,n,t(r.rules,n,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Sc(this,function(){throw Ol(12,String(r.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=ad),this.name+e.hash},e}();function jd(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=kc(fd.apply(void 0,_s([e],t,!1))),a=ec(n);return new kd(a,n)}bd=Kc;(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var r=Fc(),n=kc([r&&'nonce="'.concat(r,'"'),"".concat(_l,'="true"'),"".concat(El,'="').concat(Al,'"')].filter(Boolean)," ");return"<style ".concat(n,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Ol(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Ol(2);var r=e.instance.toString();if(!r)return[];var a=((t={})[_l]="",t[El]=Al,t.dangerouslySetInnerHTML={__html:r},t),i=Fc();return i&&(a.nonce=i),[n.createElement("style",zs({},a,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Mc({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Ol(2);return n.createElement(ld,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Ol(3)}})(),"__sc-".concat(_l,"__");const wd={color:{bg:"#F1F6F3",surface:"#FFFFFF",surfaceAlt:"#E5EFEA",surfaceSunken:"#D8E6E0",ink:"#0E1A17",inkSoft:"#1F2E2A",muted:"#3F4B47",mutedSoft:"#5C6E68",border:"#D5E2DC",borderStrong:"#BACBC2",brand:"#1B7A6E",brandLight:"#4FBFB3",brandSoft:"#DCEEEA",brandInk:"#0E4F47",brandGradient:"linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)",brandGradientHover:"linear-gradient(135deg, #4FC9BD 0%, #155F58 100%)",accent:"#4FBFB3",accentSoft:"#E0F1ED",success:"#1B7A6E",successSoft:"#DCEEEA",danger:"#9F3B22",dangerSoft:"#F4DAD0",warning:"#A8761A",warningSoft:"#F3E5C7"},dossier:{bg:"#050B09",bgRaised:"#0B1612",surface:"#EDF3F0",card:"#FFFFFF",teal:"#2BC4AC",tealBright:"#5DD6CA",tealDeep:"#178A7B",signal:"#E0A23C",inkOnDark:"#F4F9F7",mutedOnDark:"rgba(236,244,241,0.80)",faintOnDark:"rgba(228,238,234,0.62)",hairlineOnDark:"rgba(255,255,255,0.12)",metallicText:"linear-gradient(180deg, #FFFFFF 24%, #D9EFEA 58%, #9FD9CE 100%)",numberGradient:"linear-gradient(135deg, #7BEADB 0%, #2BC4AC 52%, #179580 100%)",keyline:"linear-gradient(90deg, transparent 0%, #2BC4AC 35%, #5DD6CA 50%, #2BC4AC 65%, transparent 100%)",aurora:"radial-gradient(ellipse 680px 400px at 50% 42%, rgba(43,196,172,0.15) 0%, transparent 62%),\n      radial-gradient(ellipse 520px 300px at 30% 96%, rgba(27,110,102,0.14) 0%, transparent 70%),\n      radial-gradient(ellipse 440px 260px at 72% 4%, rgba(93,214,202,0.06) 0%, transparent 70%)",glow:"0 0 0 4px rgba(93,214,202,0.18), 0 0 18px rgba(93,214,202,0.55)",ctaShadow:"0 18px 56px rgba(29,176,154,0.38), inset 0 1px 0 rgba(255,255,255,0.22)",ctaGradient:"linear-gradient(140deg, #4ECDC4 0%, #1DB09A 52%, #178A7B 100%)",column:"580px"},font:{display:"'Playfair Display', Georgia, 'Times New Roman', serif",sans:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",mono:"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"},size:{radius:{sm:"6px",md:"12px",lg:"20px",xl:"28px",pill:"999px"},space:{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px",9:"96px",10:"128px"},container:"1180px",containerNarrow:"960px"},shadow:{xs:"0 1px 2px rgba(14, 26, 23, 0.04)",sm:"0 2px 8px rgba(14, 26, 23, 0.06)",md:"0 8px 24px rgba(14, 26, 23, 0.08)",lg:"0 24px 60px rgba(14, 26, 23, 0.12)",brand:"0 12px 32px rgba(27, 122, 110, 0.28)",inset:"inset 0 1px 0 rgba(255, 255, 255, 0.6)"},motion:{fast:"160ms cubic-bezier(0.2, 0, 0, 1)",base:"240ms cubic-bezier(0.2, 0, 0, 1)",slow:"420ms cubic-bezier(0.2, 0, 0, 1)",spring:"520ms cubic-bezier(0.34, 1.56, 0.64, 1)"},z:{base:1,nav:50,overlay:80,modal:100}},Sd=(function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var a=fd.apply(void 0,_s([e],t,!1)),i="sc-global-".concat(ec(JSON.stringify(a))),o=new yd(a,i),s=new WeakMap,l=function(e){var t=sd(),r=n.useContext(cd),a=s.get(t.styleSheet);return void 0===a&&(a=t.styleSheet.allocateGSInstance(i),s.set(t.styleSheet,a)),n.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,r,n,a){if(o.isStatic)o.renderStyles(e,Tl,r,a);else{var i=zs(zs({},t),{theme:Ul(t,n,l.defaultProps)});o.renderStyles(e,i,r,a)}}(a,e,t.styleSheet,r,t.stylis),function(){o.removeStyles(a,t.styleSheet)}},[a,e,t.styleSheet,r,t.stylis]),null};return n.memo(l)})`
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
`;var $d=r(579);const zd=(0,n.createContext)(null),_d="arvo_user_email",Nd="arvo_session",Ed=(()=>{try{var e;return null!==(e=new URLSearchParams(window.location.search).get("magic"))&&void 0!==e?e:null}catch{return null}})();function Ad(e){let{children:t}=e;const[r,a]=(0,n.useState)(()=>{try{return localStorage.getItem(_d)||null}catch{return null}}),[i,o]=(0,n.useState)(()=>{try{return localStorage.getItem(Nd)||null}catch{return null}}),[s,l]=(0,n.useState)("idle");(0,n.useEffect)(()=>{const e=Ed;e&&(l("validating"),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})}).then(e=>{if(!e.ok)throw new Error(`HTTP ${e.status}`);return e.json()}).then(e=>{if(e.email){try{localStorage.setItem(_d,e.email)}catch{}if(a(e.email),e.session){try{localStorage.setItem(Nd,e.session)}catch{}o(e.session)}l("ok")}else l("error")}).catch(e=>{console.error("[auth] validate-magic misslyckades:",e.message),l("error")}))},[]);const c=(0,n.useCallback)((e,t)=>{try{localStorage.setItem(_d,e)}catch{}if(a(e),t){try{localStorage.setItem(Nd,t)}catch{}o(t)}},[]),d=(0,n.useCallback)(()=>{try{localStorage.removeItem(_d),localStorage.removeItem(Nd)}catch{}a(null),o(null)},[]);return(0,$d.jsx)(zd.Provider,{value:{email:r,sessionToken:i,login:c,logout:d,magicState:s},children:t})}function Cd(){return(0,n.useContext)(zd)}const Dd=vd.span`
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
`,Od=vd.em`
  font-style: italic;
  font-weight: 400;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Pd=e=>{let{showName:t=!0,showSuffix:r=!0,size:n}=e;return(0,$d.jsxs)(Dd,{children:[(0,$d.jsxs)(Fd,{$size:n,viewBox:"0 0 40 40",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"arvoMarkGradient",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#5DD6CA"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1B6E66"})]})}),(0,$d.jsx)("path",{fill:"url(#arvoMarkGradient)",fillRule:"evenodd",d:"M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"})]}),t&&(0,$d.jsxs)(Td,{children:["Arvo ",r&&(0,$d.jsx)(Od,{children:"Flow"})]})]})},Ld={primary:fd`
    background: ${e=>{let{theme:t}=e;return t.color.ink}};
    color: #FAFAF7;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.ink}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
    &:hover { transform: translateY(-1px); box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}}; }
    &:active { transform: translateY(0); }
  `,brand:fd`
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    color: #FAFAF7;
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
    &:hover { transform: translateY(-1px); box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}}; background: ${e=>{let{theme:t}=e;return t.color.brandInk}}; }
    &:active { transform: translateY(0); }
  `,gradient:fd`
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
  `,secondary:fd`
    background: ${e=>{let{theme:t}=e;return t.color.surface}};
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  `,ghost:fd`
    background: transparent;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    border: 1px solid transparent;
    &:hover { background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
  `,ghostInverse:fd`
    background: transparent;
    color: rgba(250, 250, 247, 0.85);
    border: 1px solid rgba(250, 250, 247, 0.18);
    &:hover { background: rgba(250, 250, 247, 0.08); color: #FAFAF7; }
  `},Rd={sm:fd`
    height: 36px;
    padding: 0 14px;
    font-size: 13.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  `,md:fd`
    height: 44px;
    padding: 0 18px;
    font-size: 14.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  `,lg:fd`
    height: 52px;
    padding: 0 24px;
    font-size: 15.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  `},Id=vd.button`
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
  ${e=>{let{$variant:t="primary"}=e;return Ld[t]}}
  ${e=>{let{$size:t="md"}=e;return Rd[t]}}
  ${e=>{let{$full:t}=e;return t&&"width: 100%;"}}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }
`,Md=Id,Bd=vd.header`
  position: sticky;
  top: 0;
  z-index: ${e=>{let{theme:t}=e;return t.z.nav}};
  background: rgba(250, 250, 247, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,Vd=vd.div`
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
`,Kd=vd(vs)`
  padding: 8px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  font-size: 14px;
  white-space: nowrap;
  color: ${e=>{let{theme:t,$active:r}=e;return r?t.color.ink:t.color.muted}};
  font-weight: ${e=>{let{$active:t}=e;return t?600:500}};
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}}, color ${e=>{let{theme:t}=e;return t.motion.fast}};
  background: ${e=>{let{theme:t,$active:r}=e;return r?t.color.surfaceAlt:"transparent"}};
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}}; }
`,Hd=vd.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Wd=(vd.span`
  @media (max-width: 600px) { display: none; }
`,vd.span`
  .short { display: none; }
  @media (max-width: 480px) {
    .full  { display: none; }
    .short { display: inline; }
  }
`),qd=vd.div`
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
`,Yd=vd.div`
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
`,Gd=vd.button`
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
`,Qd=vd.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  letter-spacing: -0.02em;
  margin: 0 0 8px;
`,Jd=vd.p`
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin: 0 0 28px;
  line-height: 1.5;
`,Xd=vd.label`
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.inkSoft)&&void 0!==t?t:r.color.ink}};
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 6px;
`,Zd=vd.div`
  margin-bottom: 16px;
`,eu=vd.input`
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
`,tu=vd.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #D94F3C;
`,ru=vd.div`
  text-align: center;
  padding: 12px 0 4px;
`,nu=vd.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 26px;
`,au=vd.p`
  font-size: 18px;
  font-weight: 700;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 8px;
  letter-spacing: -0.01em;
`,iu=vd.p`
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin: 0;
  line-height: 1.55;
`,ou=vd.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,su=vd.span`
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
  background: ${e=>{let{$error:t,theme:r}=e;return t?"#D94F3C":"linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%)"}};
  pointer-events: none;
`,cu={company:"",name:"",email:""},du={email:""},uu=e=>{let{variant:t="public"}=e;const{pathname:r}=lo(),{email:a,logout:i,magicState:o}=Cd(),[s,l]=(0,n.useState)(!1);(0,n.useEffect)(()=>{if("ok"===o||"error"===o){l(!0);const e=setTimeout(()=>l(!1),4e3);return()=>clearTimeout(e)}},[o]);const[c,d]=(0,n.useState)(!1),[u,p]=(0,n.useState)(!1),[h,m]=(0,n.useState)(du),[f,g]=(0,n.useState)("idle"),[x,v]=(0,n.useState)(cu),[b,y]=(0,n.useState)({}),[k,j]=(0,n.useState)("idle"),w=(0,n.useRef)(null);(0,n.useEffect)(()=>{c&&w.current&&w.current.focus()},[c]),(0,n.useEffect)(()=>{if(!c)return;const e=e=>{"Escape"===e.key&&S()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[c]);const S=()=>d(!1),$=(e,t)=>{const r=document.getElementById(t);r&&(e.preventDefault(),r.scrollIntoView({behavior:"smooth"}))};return(0,$d.jsxs)($d.Fragment,{children:[s&&(0,$d.jsx)(lu,{$error:"error"===o,children:"ok"===o?`\u2713 Inloggad som ${a}`:"\u2715 L\xe4nken fungerade inte \u2014 beg\xe4r en ny"}),(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Bd,{children:(0,$d.jsxs)(Vd,{children:[(0,$d.jsx)(vs,{to:"/",children:(0,$d.jsx)(Pd,{})}),"public"===t&&(0,$d.jsxs)(Ud,{children:[(0,$d.jsx)(Kd,{to:"/",$active:"/"===r,children:"Hem"}),(0,$d.jsx)(Kd,{to:"/intelligence",$active:"/intelligence"===r,children:"Arvo Intelligence"}),(0,$d.jsx)(Kd,{to:"/#hur",$active:!1,onClick:e=>$(e,"hur"),children:"S\xe5 fungerar det"}),(0,$d.jsx)(Kd,{to:"/#priser",$active:!1,onClick:e=>$(e,"priser"),children:"Pris"}),(0,$d.jsx)(Kd,{to:"/#faq",$active:!1,onClick:e=>$(e,"faq"),children:"FAQ"})]}),"app"===t&&(0,$d.jsxs)(Ud,{children:[(0,$d.jsx)(Kd,{to:"/insights",$active:"/insights"===r,children:"Insikter"}),(0,$d.jsx)(Kd,{to:"/insights",$active:!1,children:"Historik"}),(0,$d.jsx)(Kd,{to:"/insights",$active:!1,children:"Inst\xe4llningar"})]}),(0,$d.jsxs)(Hd,{children:[a?(0,$d.jsxs)(ou,{children:[(0,$d.jsx)(su,{children:a[0].toUpperCase()}),(0,$d.jsx)(Md,{$variant:"ghost",$size:"sm",onClick:i,children:"Logga ut"})]}):(0,$d.jsx)(Md,{$variant:"ghost",$size:"sm",onClick:()=>{m(du),g("idle"),p(!0)},children:"Logga in"}),"public"===t&&(0,$d.jsx)(Md,{as:vs,to:"/testa-faktura",$variant:"gradient",$size:"sm",children:(0,$d.jsxs)(Wd,{children:[(0,$d.jsx)("span",{className:"full",children:"Se mina besparingar \u2192"}),(0,$d.jsx)("span",{className:"short",children:"Se besparingar \u2192"})]})})]})]})}),u&&(0,$d.jsx)(qd,{onClick:e=>{e.target===e.currentTarget&&p(!1)},children:(0,$d.jsxs)(Yd,{role:"dialog","aria-modal":"true","aria-labelledby":"auth-modal-title",children:[(0,$d.jsx)(Gd,{onClick:()=>p(!1),"aria-label":"St\xe4ng",children:"\u2715"}),"sent"===f?(0,$d.jsxs)(ru,{children:[(0,$d.jsx)(nu,{children:"\u2709"}),(0,$d.jsx)(au,{children:"Kolla inkorgen."}),(0,$d.jsxs)(iu,{children:["Vi har skickat en inloggningsl\xe4nk till ",h.email,".",(0,$d.jsx)("br",{}),"Klicka p\xe5 l\xe4nken i mejlet \u2014 det tar 10 sekunder."]})]}):(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=h.email.trim();if(t&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){g("submitting");try{await fetch("/api/auth/request-magic-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}),g("sent")}catch{g("error")}}},noValidate:!0,children:[(0,$d.jsx)(Qd,{id:"auth-modal-title",children:"Logga in p\xe5 Arvo Flow"}),(0,$d.jsx)(Jd,{children:"Ange din e-post \u2014 vi skickar en inloggningsl\xe4nk direkt. Inget l\xf6senord."}),(0,$d.jsxs)(Zd,{children:[(0,$d.jsx)(Xd,{htmlFor:"auth-email",children:"E-postadress"}),(0,$d.jsx)(eu,{id:"auth-email",type:"email",placeholder:"anna@acme.se",value:h.email,onChange:e=>m({email:e.target.value}),autoComplete:"email",autoFocus:!0})]}),"error"===f&&(0,$d.jsx)(tu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$d.jsx)(Md,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===f,children:"submitting"===f?"Skickar\u2026":"Skicka inloggningsl\xe4nk \u2192"})]})]})}),c&&(0,$d.jsx)(qd,{onClick:e=>{e.target===e.currentTarget&&S()},children:(0,$d.jsxs)(Yd,{role:"dialog","aria-modal":"true","aria-labelledby":"early-access-title",children:[(0,$d.jsx)(Gd,{onClick:S,"aria-label":"St\xe4ng",children:"\u2715"}),"success"===k?(0,$d.jsxs)(ru,{children:[(0,$d.jsx)(nu,{children:"\u2713"}),(0,$d.jsx)(au,{children:"Er plats \xe4r reserverad."}),(0,$d.jsx)(iu,{children:"En av grundarna h\xf6r av sig inom 48 timmar f\xf6r att boka er onboarding. Kolla inkorgen \u2014 mejlet \xe4r p\xe5 v\xe4g."})]}):(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=(()=>{const e={};return x.company.trim()||(e.company="Fyll i f\xf6retagsnamn."),x.name.trim()||(e.name="Fyll i ditt namn."),x.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email.trim())||(e.email="E-postadressen ser inte r\xe4tt ut."):e.email="E-post saknas.",e})();if(y(t),!(Object.keys(t).length>0)){j("submitting");try{const e=await fetch("/api/founding-member",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company:x.company.trim(),name:x.name.trim(),email:x.email.trim(),referrer:"undefined"!==typeof document&&document.referrer||null,timestamp:(new Date).toISOString()})});if(!e.ok)throw new Error("API "+e.status);j("success")}catch{j("error")}}},noValidate:!0,children:[(0,$d.jsx)(Qd,{id:"early-access-title",children:"Bli Founding Member"}),(0,$d.jsx)(Jd,{children:"Reservera er plats och f\xe5 personlig onboarding, 6 m\xe5nader gratis och f\xf6rtur till Fortnox / Visma-kopplingen n\xe4r den \xf6ppnar."}),(0,$d.jsxs)(Zd,{children:[(0,$d.jsx)(Xd,{htmlFor:"ea-company",children:"F\xf6retag"}),(0,$d.jsx)(eu,{id:"ea-company",ref:w,type:"text",placeholder:"Acme AB",value:x.company,onChange:e=>v(t=>({...t,company:e.target.value})),$error:!!b.company,autoComplete:"organization"}),b.company&&(0,$d.jsx)(tu,{children:b.company})]}),(0,$d.jsxs)(Zd,{children:[(0,$d.jsx)(Xd,{htmlFor:"ea-name",children:"Ditt namn"}),(0,$d.jsx)(eu,{id:"ea-name",type:"text",placeholder:"Anna Andersson",value:x.name,onChange:e=>v(t=>({...t,name:e.target.value})),$error:!!b.name,autoComplete:"name"}),b.name&&(0,$d.jsx)(tu,{children:b.name})]}),(0,$d.jsxs)(Zd,{children:[(0,$d.jsx)(Xd,{htmlFor:"ea-email",children:"E-post"}),(0,$d.jsx)(eu,{id:"ea-email",type:"email",placeholder:"anna@acme.se",value:x.email,onChange:e=>v(t=>({...t,email:e.target.value})),$error:!!b.email,autoComplete:"email"}),b.email&&(0,$d.jsx)(tu,{children:b.email})]}),"error"===k&&(0,$d.jsx)(tu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen om en stund."}),(0,$d.jsx)(Md,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===k,children:"submitting"===k?"Skickar\u2026":"Reservera min plats \u2192"})]})]})})]})]})},pu=vd.footer`
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  padding: 64px 28px 48px;
`,hu=vd.div`
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
`,mu=vd.div`
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
`,gu=vd.div`
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
`,xu=vd.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 24px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  @media (max-width: 520px) { flex-direction: column; gap: 10px; }
`,vu=()=>(0,$d.jsxs)(pu,{children:[(0,$d.jsxs)(hu,{children:[(0,$d.jsxs)(mu,{children:[(0,$d.jsx)(Pd,{}),(0,$d.jsx)("p",{children:"Er proaktiva finansdirekt\xf6r f\xf6r leverant\xf6rskostnader. Bevakning p\xe5 prenumeration \u2014 genomf\xf6rt byte n\xe4r ni vill."})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"Produkt"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#hur",children:"S\xe5 fungerar det"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#priser",children:"Pris"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#hur",children:"Integrationer"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#sakerhet",children:"S\xe4kerhet"})})]})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"F\xf6retag"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)(vs,{to:"/",children:"Om oss"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vs,{to:"/bias",children:"Partners"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"mailto:hej@arvoflow.se",children:"Kontakt"})})]})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"Juridik"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)(vs,{to:"/villkor",children:"Villkor"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vs,{to:"/integritet",children:"Integritet (GDPR)"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vs,{to:"/cookies",children:"Cookies"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vs,{to:"/bias",children:"Rankningspolicy"})})]})]})]}),(0,$d.jsxs)(gu,{children:[(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," Ansvars- och cyberf\xf6rs\xe4krade via ",(0,$d.jsx)("strong",{children:"Hiscox"})]}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," GDPR-s\xe4krad infrastruktur i ",(0,$d.jsx)("strong",{children:"Sverige"})]}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," Krypterad data ",(0,$d.jsx)("strong",{children:"AES-256"})]})]}),(0,$d.jsxs)(xu,{children:[(0,$d.jsx)("span",{children:"\xa9 2026 Arvo Flow AB \xb7 Org.nr 559500-0000"}),(0,$d.jsx)("span",{children:"Stockholm \xb7 Made with care in Sweden"})]})]}),bu={shield:(0,$d.jsx)("path",{d:"M12 2.5l8 3v6.5c0 4.6-3.3 8.7-8 9.5-4.7-.8-8-4.9-8-9.5V5.5l8-3z"}),bolt:(0,$d.jsx)("path",{d:"M13 2L4 14h7l-1 8 9-12h-7l1-8z"}),phone:(0,$d.jsx)("path",{d:"M5 3h4l2 5-3 2c1.4 2.8 3.7 5.1 6.5 6.5l2-3 5 2v4c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2z"}),wifi:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M2 8.8a14 14 0 0120 0"}),(0,$d.jsx)("path",{d:"M5 12.6a9 9 0 0114 0"}),(0,$d.jsx)("path",{d:"M8.5 16.4a4 4 0 017 0"}),(0,$d.jsx)("circle",{cx:"12",cy:"20",r:"1"})]}),card:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),(0,$d.jsx)("path",{d:"M2 10h20"})]}),file:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$d.jsx)("path",{d:"M14 2v6h6"})]}),briefcase:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2"}),(0,$d.jsx)("path",{d:"M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"})]}),truck:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M1 3h15v13H1z"}),(0,$d.jsx)("path",{d:"M16 8h4l3 3v5h-7z"}),(0,$d.jsx)("circle",{cx:"6",cy:"18.5",r:"2"}),(0,$d.jsx)("circle",{cx:"18",cy:"18.5",r:"2"})]}),arrow:(0,$d.jsx)("path",{d:"M5 12h14M13 6l6 6-6 6"}),check:(0,$d.jsx)("path",{d:"M5 12l5 5L20 7"}),upload:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$d.jsx)("path",{d:"M14 2v6h6"}),(0,$d.jsx)("path",{d:"M12 17v-5M9.5 14.5L12 12l2.5 2.5"})]}),spark:(0,$d.jsx)("path",{d:"M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"}),lock:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"4",y:"11",width:"16",height:"11",rx:"2"}),(0,$d.jsx)("path",{d:"M8 11V7a4 4 0 018 0v4"})]}),fortnox:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"}),(0,$d.jsx)("path",{d:"M8 8h8M8 12h8M8 16h5"})]}),bankid:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M5 3h14v18H5z"}),(0,$d.jsx)("path",{d:"M9 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2"})]}),trend:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M3 17l6-6 4 4 8-8"}),(0,$d.jsx)("path",{d:"M14 7h7v7"})]}),"alert-circle":(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,$d.jsx)("path",{d:"M12 8v4"}),(0,$d.jsx)("path",{d:"M12 16h.01"})]}),pulse:(0,$d.jsx)("path",{d:"M2 13h4l2.5-7 4 14 2.5-7H22"}),benchmark:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M3 20h18"}),(0,$d.jsx)("path",{d:"M6.5 20v-4.5"}),(0,$d.jsx)("path",{d:"M11 20v-10"}),(0,$d.jsx)("path",{d:"M15.5 20v-6.5"}),(0,$d.jsx)("path",{d:"M20 20v-13"})]}),"chevron-down":(0,$d.jsx)("path",{d:"M6 9l6 6 6-6"}),"calendar-clock":(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6.5"}),(0,$d.jsx)("path",{d:"M16 2v4M8 2v4M3 10h18"}),(0,$d.jsx)("circle",{cx:"17.5",cy:"17.5",r:"4.5"}),(0,$d.jsx)("path",{d:"M17.5 15.6v2l1.4 1"})]})},yu=e=>{let{name:t,size:r=20,stroke:n=1.6,color:a="currentColor",fill:i="none",...o}=e;const s=bu[t];return s?(0,$d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:r,viewBox:"0 0 24 24",fill:i,stroke:a,strokeWidth:n,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...o,children:s}):null},ku=jd`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,ju=jd`
  0%   { box-shadow: 0 0 0 0 rgba(27,122,110,0.28); }
  60%  { box-shadow: 0 0 0 7px rgba(27,122,110,0.10); }
  100% { box-shadow: 0 0 0 4px rgba(27,122,110,0.12); }
`,wu=jd`
  0%   { transform: scale(0); opacity: 0; }
  55%  { transform: scale(1.30); opacity: 1; }
  75%  { transform: scale(0.88); }
  100% { transform: scale(1); opacity: 1; }
`,Su=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  overflow-x: hidden;
`,$u=vd.section`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: ${e=>{let{$tight:t}=e;return t?"64px 28px":"120px 28px"}};
  @media (max-width: 740px) {
    padding: ${e=>{let{$tight:t}=e;return t?"48px 20px":"80px 20px"}};
  }
`,zu=vd.section`
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
`),Nu=vd.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 30%, rgba(27, 122, 110, 0.10), transparent 50%),
    radial-gradient(circle at 82% 12%, rgba(93, 214, 202, 0.14), transparent 55%);
  z-index: 0;
`,Eu=vd.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 48px; }
`,Au=vd.span`
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
  animation: ${ku} 0.6s ease both;

  span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,Cu=vd.h1`
  margin-top: 24px;
  font-size: clamp(40px, 5.2vw, 64px);
  line-height: 1.04;
  font-weight: 500;
  letter-spacing: -0.025em;
  animation: ${ku} 0.7s 0.1s ease both;

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
`,Du=vd.p`
  margin-top: 22px;
  font-size: 18.5px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  max-width: 540px;
  animation: ${ku} 0.7s 0.2s ease both;
`,Fu=vd.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: ${ku} 0.7s 0.3s ease both;
`,Tu=vd.div`
  margin-top: 28px;
  display: flex;
  gap: 0;
  flex-wrap: nowrap;
  animation: ${ku} 0.7s 0.4s ease both;

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
`,Ou=vd.div`
  position: relative;
  margin-top: 58px; /* förankrar kortets topp mot rubrikens datumlinje */
  animation: ${ku} 0.8s 0.2s ease both;
  @media (max-width: 980px) { margin-top: 0; }
`,Pu=vd.div`
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
    animation: ${e=>{let{$visible:t}=e;return t?wu:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) .45s both;
  }
  .tl-step:nth-child(2) .tl-marker {
    animation: ${e=>{let{$visible:t}=e;return t?wu:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) 1.35s both;
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
      ${e=>{let{$visible:t}=e;return t?wu:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) 2.25s both,
      ${e=>{let{$visible:t}=e;return t?ju:"none"}} 1s cubic-bezier(0.34, 1.56, 0.64, 1) 2.9s both;
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
`,Lu=(vd.div`
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
`),Ru=vd.div`
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
`,Iu=vd.section`
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
`,Mu=vd.div`
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
`,Vu=vd.div`
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
`,Ku=vd.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 40px;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`,Hu=vd.div`
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
`,Wu=vd.div`
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
`,qu=vd.div`
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
`,Yu=(vd.div`
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
`),Gu=vd.div`
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
`,Qu=vd.form`
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
`,Ju=vd.div`
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
`,Xu=vd.div`
  max-width: 820px;
  margin: 0 auto;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,Zu=vd.details`
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
`,ep=vd.section`
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
`,tp=vd.section`
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
`,rp=vd.div`
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
`,ap=vd.div`
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
`,ip=jd`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,0); }
  50%       { box-shadow: 0 0 0 6px rgba(27,122,110,0.20); }
`,op=jd`
  0%   { box-shadow: 0 0 0 0 rgba(45,181,159,0.55); }
  70%  { box-shadow: 0 0 0 6px rgba(45,181,159,0); }
  100% { box-shadow: 0 0 0 0 rgba(45,181,159,0); }
`,sp=jd`
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
    animation: ${e=>{let{$visible:t}=e;return!1===t?"none":sp}} 7s ease-in-out 1.6s infinite;
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
    animation: ${op} 2.4s ease-out infinite;
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
    animation: ${ip} 2.8s ease-in-out 2s infinite;
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
`,cp=vd.section`
  position: relative;
  padding: 120px 28px;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 80px 20px; }
`,dp=vd.div`
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
`,up=vd.p`
  max-width: 740px;
  margin: 56px auto 0;
  text-align: center;
  font-family: ${e=>{let{theme:t}=e;return t.font.display}};
  font-size: clamp(20px, 2.4vw, 27px);
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
`,pp=vd.p`
  max-width: 720px;
  margin: 20px auto 0;
  text-align: center;
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.5;
`,hp=vd.div`
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
`,mp=vd.div`
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
`,gp=vd.span`
  position: absolute;
  top: 50%;
  z-index: 2;
  height: 2px;
  border-radius: 2px;
  transform: translateY(-50%);
  background: ${e=>{let{$over:t}=e;return t?"rgba(220,38,38,0.55)":"rgba(27,122,110,0.55)"}};
  ${e=>{let{$over:t,$line:r}=e;return t?`left: ${r};`:`right: calc(100% - ${r});`}}
  width: ${e=>{let{$visible:t,$span:r}=e;return t?r:"0%"}};
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${e=>{let{$delay:t}=e;return t}};
`,xp=vd.span`
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
`,vp=vd.div`
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
`,bp=vd.div`
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
`,yp=vd.div`
  max-width: 880px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 680px) { grid-template-columns: 1fr; }
`,kp=vd.div`
  background: ${e=>{let{$featured:t,theme:r}=e;return t?r.color.ink:r.color.surface}};
  border: ${e=>{let{$featured:t,theme:r}=e;return t?`2px solid ${r.color.brand}`:`1px solid ${r.color.border}`}};
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
    background: ${e=>{let{$featured:t,theme:r}=e;return t?r.color.brand:r.color.brandSoft}};
    color: ${e=>{let{$featured:t,theme:r}=e;return t?"#FAFAF7":r.color.brand}};
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
      color: ${e=>{let{$featured:t,theme:r}=e;return t?r.color.accent:r.color.brand}};
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
`,jp=[{step:"Steg 01",title:"Aktivera Arvo \u2014 klart p\xe5 2 min",body:"Ni s\xe4tter upp automatisk vidarebefordran fr\xe5n er faktura-inkorg. Varje ny leverant\xf6rsfaktura fl\xf6dar in till Arvo \u2014 helt automatiskt, ingen IT-integration kr\xe4vs. Vill ni ha fullst\xe4ndig t\xe4ckning kopplar ni enkelt in Fortnox eller Visma som komplement.",bullets:["Noll IT-projekt","GDPR-s\xe4krad infrastruktur i Sverige","Koppla bort n\xe4r som helst"]},{step:"Steg 02",title:"Arvo bevakar. Ni lever era liv.",body:"Varje faktura analyseras mot verifierade marknadsdata och prisdata fr\xe5n j\xe4mf\xf6rbara bolag i er bransch. Avviker ett pris \u2014 oavsett om det r\xf6r sig om ett par hundra eller tiotusentals kronor \u2014 identifieras det direkt.",bullets:["8 leverant\xf6rskategorier idag","Branschanpassad prisdata","L\xf6pande bevakning \u2014 ingen eng\xe5ngsscan"]},{step:"Steg 03",title:"Vi h\xf6r av oss. Ni best\xe4mmer.",body:"Identifierar Arvo en besparing skickar vi er en briefing med exakt vad ni betalar och vad som \xe4r m\xf6jligt. Varje pris \xe4r verifierat mot leverant\xf6rens officiella avtalspris \u2014 ni godk\xe4nner, Arvo f\xf6rbereder hela bytet.",bullets:["Ni beh\xe5ller full kontroll","Ni godk\xe4nner varje byte \u2014 inget sker utan er","Arvo Switch: 20 % av realiserad besparing"]}],wp=175.93,Sp=e=>{let{score:t,color:r}=e;const a=(0,n.useRef)(null),i=parseFloat((wp*(1-t/100)).toFixed(2));return(0,n.useEffect)(()=>{const e=requestAnimationFrame(()=>{a.current&&(a.current.style.strokeDashoffset=i)});return()=>cancelAnimationFrame(e)},[i]),(0,$d.jsxs)(Wu,{children:[(0,$d.jsxs)("svg",{viewBox:"0 0 72 72",children:[(0,$d.jsx)("circle",{fill:"none",stroke:"#E5EFEA",strokeWidth:"6",cx:"36",cy:"36",r:"28"}),(0,$d.jsx)("circle",{ref:a,fill:"none",stroke:r,strokeWidth:"6",strokeLinecap:"round",strokeDasharray:wp,strokeDashoffset:wp,cx:"36",cy:"36",r:"28",style:{transition:"stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)"}})]}),(0,$d.jsxs)(qu,{$color:r,children:[(0,$d.jsx)("span",{className:"num",children:t}),(0,$d.jsx)("span",{className:"den",children:"/100"})]})]})},$p=[{label:"Optimalt",color:"#1B7A6E",score:91,desc:"Ni har ett kostnadsoptimerat leverant\xf6rsn\xe4tverk. Ni betalar under eller i niv\xe5 med branschsnittet."},{label:"F\xf6rb\xe4ttringsl\xe4ge",color:"#65A30D",score:72,desc:"Ni betalar mer \xe4n marknadspriset \u2014 en meningsfull besparing som Arvo kan realisera \xe5t er utan byr\xe5krati."},{label:"Suboptimerat",color:"#D97706",score:54,desc:"Ni betalar klart mer \xe4n branschsnittet. Arvo kan g\xf6ra ett byte som betalar sig fr\xe5n dag ett."},{label:"Kritisk",color:"#DC2626",score:28,desc:"Ni betalar kraftigt mer \xe4n marknadspriset och f\xf6rlorar pengar varje faktura. Arvo identifierar l\xe4ckan och genomf\xf6r bytet \xe5t er \u2014 utan f\xf6rhandling, utan telefonk\xf6er."}],zp=[{q:"Vad kostar det?",a:"Arvo erbjuds i tv\xe5 lager. Arvo Intelligence kostar 1 995 kr/m\xe5n \u2014 l\xf6pande bevakning, smygh\xf6jningslarm och avtalsbevakning, ingen bindningstid. Arvo Switch \xe4r ett till\xe4gg: i kategorier d\xe4r bytet \xe4r systematiserat genomf\xf6r eller f\xf6rbereder Arvo bytet \xe5t er, och vi tar 20 % av realiserad besparing \u2014 fakturerat f\xf6rst n\xe4r besparingen faktiskt syns i era egna b\xf6cker. Landar ingen besparing kostar Switch ingenting."},{q:"Hur kan ni vara s\xe4kra p\xe5 att rekommendationerna \xe4r opartiska?",a:(0,$d.jsxs)($d.Fragment,{children:["Vi tj\xe4nar pengar bara n\xe4r ni sparar \u2014 det \xe4r beviset p\xe5 opartiskhet. Leverant\xf6rer kan inte k\xf6pa sig en h\xf6gre placering, f\xf6r vi tar aldrig en krona fr\xe5n dem: noll provision, noll partner-avgift, ingen d\xf6rr in. V\xe5r enda int\xe4kt \xe4r er besparing. Policyn \xe4r \xf6ppet publicerad under ",(0,$d.jsx)(vs,{to:"/bias",children:"v\xe5r rankningspolicy"}),"."]})},{q:"Varf\xf6r ska jag lita p\xe5 era besparingskalkyler?",a:"Vi bygger p\xe5 verifierade marknadsdata \u2014 offentliga listpriser, ramavtalsdata och faktiska operat\xf6rspriser. Och eftersom vi tar 20 % av realiserad besparing \u2014 den som faktiskt syns i era b\xf6cker, inte den vi gissar \u2014 har vi inget att vinna p\xe5 att \xf6verdriva: en projektion som inte h\xe5ller kostar oss f\xf6rtroendet och arvodet. Vi tj\xe4nar mer p\xe5 att lova lite och leverera fullt ut."},{q:"Vad h\xe4nder om den nya leverant\xf6ren h\xf6jer priset efter bytet?",a:"V\xe5r fee baseras p\xe5 kontrakterade priser vid avtalssignering. F\xf6r\xe4ndras marknadsl\xe4get efter bytet hj\xe4lper vi er med en ny analys \u2014 utan extra kostnad."},{q:"S\xe4ger ni upp avtal autonomt utan min godk\xe4nnande?",a:"Aldrig. Varje byte kr\xe4ver er BankID-signatur. Vi f\xf6rbereder, ni godk\xe4nner. Det \xe4r en h\xe5rd regel."},{q:"Vilka kategorier t\xe4cker ni idag?",a:"Vi bevakar er kostnad i tre l\xe4gen. I el, mobil och f\xf6retagsbredband genomf\xf6r Arvo bytet \xe5t er \u2014 ni godk\xe4nner med BankID, den vinnande leverant\xf6ren sk\xf6ter resten. I programvara / SaaS, kortterminaler, fakturatj\xe4nster och l\xf6neadministration f\xf6rbereder Arvo hela bytet \u2014 ni formaliserar med ett klick. I f\xf6rs\xe4kring, leasing, larm och tj\xe4nsteavtal levererar vi fyndet, tajmingen och det exakta motbudet och bev\xe4pnar er att agera (f\xf6rs\xe4kringsbyten genomf\xf6rs n\xe4r v\xe5r FI-licens \xe4r klar). Fler kategorier l\xe4ggs till varje kvartal baserat p\xe5 var vi ser st\xf6rst besparingar i kunddatan."},{q:"Vad h\xe4nder med min data?",a:"Arvo ser endast det ni vidarebefordrar \u2014 leverant\xf6rsfakturor, inget annat. Datan lagras krypterad i Sverige (Bahnhof Stockholm). Kopplar ni in Fortnox eller Visma g\xe4ller samma princip: enbart l\xe4s-r\xe4ttigheter mot leverant\xf6rsfakturor. Vi s\xe4ljer aldrig identifierbar data \u2014 anonymiserade branschindex \xe4r v\xe5r enda dataprodukt ut\xf6ver tj\xe4nsten."}],_p=[{cat:"Mobilabonnemang",unit:"kr/SIM/\xe5r",p25:3408,median:4200,p75:5200,you:5760,max:7e3,status:"over"},{cat:"Skrivare & print",unit:"kr/m\xe5n",p25:1800,median:2400,p75:3200,you:3900,max:4600,status:"over"},{cat:"Microsoft 365",unit:"kr/seat/\xe5r",p25:1320,median:1680,p75:2100,you:2400,max:2800,status:"over"},{cat:"F\xf6retagsbredband",unit:"kr/m\xe5n",p25:380,median:510,p75:650,you:730,max:880,status:"over"},{cat:"Fakturatj\xe4nst",unit:"kr/m\xe5n",p25:180,median:240,p75:320,you:360,max:440,status:"over"},{cat:"Elavtal",unit:"\xf6re/kWh",p25:112,median:145,p75:178,you:195,max:230,status:"over"},{cat:"Kortterminal",unit:"kr/m\xe5n",p25:240,median:320,p75:420,you:298,max:520,status:"inline"},{cat:"F\xf6retagsleasing",unit:"kr/m\xe5n",p25:3200,median:4100,p75:5200,you:3850,max:6e3,status:"inline"}],Np=e=>{let{row:t,i:r,visible:a}=e;const i="over"===t.status,o=t.you-t.median,s=((e,t)=>{const r=e/t;return Math.max(9,Math.min(94,32+68*(r-1)))})(t.you,t.median),l=Math.abs(s-32),c=Math.max(0,t.you/t.median-1),d=i?Math.round(12+Math.min(10*c,5)):12,u=75*r+250+"ms",p=75*r+420+"ms",h=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1100,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;const[i,o]=(0,n.useState)(0);return(0,n.useEffect)(()=>{if(!t)return;let n;const i=setTimeout(()=>{let t;const a=i=>{void 0===t&&(t=i);const s=Math.min((i-t)/r,1),l=1-Math.pow(1-s,3);o(Math.round(e*l)),s<1&&(n=requestAnimationFrame(a))};n=requestAnimationFrame(a)},a);return()=>{clearTimeout(i),n&&cancelAnimationFrame(n)}},[e,t,r,a]),i}(o,a&&i,850,75*r+450);return(0,$d.jsxs)(fp,{children:[(0,$d.jsxs)("div",{className:"cat-col",children:[(0,$d.jsx)("span",{className:"cat",children:t.cat}),(0,$d.jsx)("span",{className:"unit",children:t.unit})]}),(0,$d.jsxs)("div",{className:"axis",children:[(0,$d.jsx)("span",{className:"zone"}),(0,$d.jsx)("span",{className:"line"}),(0,$d.jsx)(gp,{$over:i,$span:`${l}%`,$line:"32%",$visible:a,$delay:u}),(0,$d.jsx)(xp,{$x:`${s}%`,$size:d,$over:i,$visible:a,$delay:p})]}),i?(0,$d.jsxs)("div",{className:"delta over",children:[(0,$d.jsxs)("strong",{children:["+",(a?h:0).toLocaleString("sv-SE")]}),(0,$d.jsx)("small",{children:"s\xe4mre \xe4n snittet"})]}):(0,$d.jsxs)("div",{className:"delta inline",children:[(0,$d.jsxs)("strong",{children:[(0,$d.jsx)(yu,{name:"check",size:13,stroke:2.6})," i niv\xe5"]}),(0,$d.jsx)("small",{children:"marknadspris"})]})]})},Ep=()=>{const[e,t]=(0,n.useState)(!1),r=(0,n.useRef)(null);(0,n.useEffect)(()=>{const e=r.current;if(!e)return;const n=new IntersectionObserver(e=>{let[r]=e;r.isIntersecting&&(t(!0),n.disconnect())},{threshold:.1});return n.observe(e),()=>n.disconnect()},[]);const a=_p.filter(e=>"over"===e.status).length;return(0,$d.jsxs)(hp,{ref:r,children:[(0,$d.jsxs)("div",{className:"spectrum-head",children:[(0,$d.jsx)("span",{className:"title",children:"Er leverant\xf6rsportf\xf6lj"}),(0,$d.jsx)("span",{className:"sub",children:"8 kategorier \xb7 bevakade dygnet runt"}),(0,$d.jsx)("span",{className:"tag",children:"Exempel"})]}),(0,$d.jsx)(mp,{children:_p.map((t,r)=>(0,$d.jsx)(Np,{row:t,i:r,visible:e},t.cat))}),(0,$d.jsx)(vp,{children:(0,$d.jsxs)("span",{className:"axis-cell",children:[(0,$d.jsx)("span",{className:"lbl zone",children:"Marknadspris"}),(0,$d.jsx)("span",{className:"lbl mid",children:"Branschsnitt"}),(0,$d.jsx)("span",{className:"lbl right",children:"S\xe4mre \u2192"})]})}),(0,$d.jsxs)(bp,{children:[(0,$d.jsxs)("div",{className:"sum-meta",children:[(0,$d.jsxs)("div",{className:"sum-col bad",children:[(0,$d.jsx)("strong",{children:a}),(0,$d.jsx)("span",{children:"s\xe4mre \xe4n snittet"})]}),(0,$d.jsx)("div",{className:"sum-sep"}),(0,$d.jsxs)("div",{className:"sum-col good",children:[(0,$d.jsx)("strong",{children:_p.length-a}),(0,$d.jsx)("span",{children:"b\xe4ttre \xe4n snittet"})]})]}),(0,$d.jsx)("p",{children:"Sex av \xe5tta kategorier kostar mer \xe4n bolag som betalar marknadspris i er bransch \u2014 h\xf6jningen sker gradvis och m\xe4rks s\xe4llan i tid. Arvo identifierar det innan ni hunnit se det."})]})]})},Ap=new Set([0,2,3,5,8,9,11,13]),Cp=()=>{const[e,t]=(0,n.useState)({company:"",name:"",email:""}),[r,a]=(0,n.useState)({}),[i,o]=(0,n.useState)("idle"),[s,l]=(0,n.useState)(!1),c=(0,n.useRef)(null),[d,u]=(0,n.useState)(!1);(0,n.useEffect)(()=>{const e=requestAnimationFrame(()=>u(!0));return()=>cancelAnimationFrame(e)},[]),(0,n.useEffect)(()=>{const e=c.current;if(!e)return;const t=new IntersectionObserver(e=>{let[r]=e;r.isIntersecting&&(l(!0),t.disconnect())},{threshold:.1});return t.observe(e),()=>t.disconnect()},[]);return(0,$d.jsxs)(Su,{children:[(0,$d.jsx)(uu,{variant:"public"}),(0,$d.jsxs)(zu,{children:[(0,$d.jsx)(Nu,{}),(0,$d.jsxs)(Eu,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsxs)(Au,{children:[(0,$d.jsx)("span",{className:"dot"})," Arvo Intelligence \xb7 Proaktiv finansdirekt\xf6r f\xf6r svenska bolag"]}),(0,$d.jsxs)(Cu,{children:[(0,$d.jsx)("span",{className:"line",children:"Er finansdirekt\xf6r."}),(0,$d.jsx)("em",{children:"Innan ni fr\xe5gar."})]}),(0,$d.jsx)(Du,{children:"Era leverant\xf6rer justerar priser i det tysta. Arvo bevakar varje avtal dygnet runt \u2014 och h\xf6r av sig i samma stund en kostnad b\xf6rjar krypa upp\xe5t, ofta innan ni sj\xe4lva hunnit m\xe4rka n\xe5got. Vi identifierar l\xe4ckaget. Ni tar beslutet."}),(0,$d.jsxs)(Fu,{children:[(0,$d.jsxs)(Md,{as:vs,to:"/testa-faktura",$variant:"gradient",$size:"lg",children:["Testa med en faktura ",(0,$d.jsx)(yu,{name:"arrow",size:18})]}),(0,$d.jsx)(Md,{as:vs,to:"/intelligence",$variant:"secondary",$size:"lg",children:"Aktivera Arvo Intelligence"})]}),(0,$d.jsxs)(Tu,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Aktivera en g\xe5ng"}),(0,$d.jsx)("span",{children:"Arvo bevakar resten \u2014 klart p\xe5 2 min"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Aldrig utan er signatur"}),(0,$d.jsx)("span",{children:"ni beh\xe5ller full kontroll"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Betala bara n\xe4r ni sparat"}),(0,$d.jsx)("span",{children:"Switch: 0 kr tills bytet \xe4r klart"})]})]})]}),(0,$d.jsx)(Ou,{children:(0,$d.jsxs)(Pu,{$visible:d,children:[(0,$d.jsxs)("div",{className:"tl-head",children:[(0,$d.jsx)("span",{className:"tl-brand",children:"Arvo Intelligence"}),(0,$d.jsxs)("span",{className:"tl-status",children:[(0,$d.jsx)(yu,{name:"check",size:11,stroke:3})," Exempel"]})]}),(0,$d.jsxs)("div",{className:"tl-body",children:[(0,$d.jsxs)("div",{className:"tl-step",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"2 maj \xb7 08:14"}),(0,$d.jsx)("span",{className:"tl-title",children:"Smygh\xf6jning identifierad"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Telia h\xf6jde er mobilflotta med 11\xa0% \u2014 utan att avisera"})]})]}),(0,$d.jsxs)("div",{className:"tl-step",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"4 maj"}),(0,$d.jsx)("span",{className:"tl-title",children:"Ni godk\xe4nde \xe5tg\xe4rden"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Arvo genomf\xf6rde resten \u2014 ni beh\xf6vde inte agera"})]})]}),(0,$d.jsxs)("div",{className:"tl-step done",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"9 maj"}),(0,$d.jsx)("span",{className:"tl-title",children:"Nytt pris bekr\xe4ftat"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Priset s\xe4nkt 14\xa0% \u2014 besparingen s\xe4krad"})]})]})]}),(0,$d.jsxs)("div",{className:"tl-foot",children:[(0,$d.jsxs)("div",{className:"tl-saving",children:[(0,$d.jsx)("span",{className:"tl-saving-label",children:"S\xe4krad besparing"}),(0,$d.jsxs)("span",{className:"tl-saving-value",children:["21\xa0360\xa0kr",(0,$d.jsx)("span",{className:"unit",children:"/\xe5r"})]})]}),(0,$d.jsx)("button",{className:"tl-cta",children:"Se hur Arvo l\xf6ste det \u2192"})]})]})})]})]}),(0,$d.jsx)(_u,{"aria-hidden":"true",children:(0,$d.jsx)("svg",{viewBox:"0 0 1440 56",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,$d.jsx)("path",{d:"M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z"})})}),(0,$d.jsxs)(Lu,{id:"sakerhet",children:[(0,$d.jsxs)(Ru,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:"lock",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Vi ser bara det ni delar"}),(0,$d.jsx)("p",{children:"Ni vidarebefordrar era leverant\xf6rsfakturor \u2014 inget annat. Kundfakturor, l\xf6nedata, bankkonton och personnummer n\xe5r oss aldrig."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{className:"group-label",children:"Vad vi ser"}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:14,stroke:2.4})," Avtal & f\xf6rfallodatum"]}),(0,$d.jsx)("li",{className:"group-label blocked",children:"N\xe5r oss aldrig"}),(0,$d.jsxs)("li",{className:"no",children:[(0,$d.jsx)(yu,{name:"lock",size:14,stroke:2})," L\xf6n & personnummer"]}),(0,$d.jsxs)("li",{className:"no",children:[(0,$d.jsx)(yu,{name:"lock",size:14,stroke:2})," Kundfakturor"]})]})]}),(0,$d.jsxs)(Ru,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:"bolt",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Aktivera en g\xe5ng. Arvo tar resten."}),(0,$d.jsx)("p",{children:"Ni kopplar in Arvo en enda g\xe5ng. D\xe4refter fl\xf6dar varje ny leverant\xf6rsfaktura in automatiskt och bevakas i realtid \u2014 ni beh\xf6ver aldrig ladda upp n\xe5got manuellt."}),(0,$d.jsx)("strong",{children:"Klart p\xe5 2 minuter. Sen sk\xf6ter Arvo resten."})]}),(0,$d.jsxs)(Ru,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:"trend",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Betala bara f\xf6r v\xe4rdet"}),(0,$d.jsx)("p",{children:"Arvo Switch \xe4r 100 % prestationsbaserat \u2014 20 % av realiserad besparing, fakturerat f\xf6rst n\xe4r den syns i era egna b\xf6cker. Landar inget kostar Switch ingenting."}),(0,$d.jsx)("strong",{children:"Gratis att starta. Ni betalar n\xe4r ni sparat."})]})]}),(0,$d.jsx)(Iu,{children:(0,$d.jsxs)("div",{className:"inner",children:[(0,$d.jsxs)("div",{className:"eyebrow",children:[(0,$d.jsx)(yu,{name:"shield",size:13,stroke:2})," Rankningspolicy"]}),(0,$d.jsx)("h2",{children:"100 % oberoende. V\xe5r algoritm styrs av er besparing, inte provisioner."}),(0,$d.jsx)("p",{children:"Vi st\xe5r p\xe5 er sida, inte leverant\xf6rens. Arvo tar aldrig en krona fr\xe5n en leverant\xf6r \u2014 noll provision, noll partner-avgift, ingen d\xf6rr in. V\xe5r enda int\xe4kt \xe4r er realiserade besparing, s\xe5 algoritmen kan bara prioritera en enda sak: era kronor. Det \xe4r strukturell oberoende \u2014 inga dolda agendor, bara l\xe4gre kostnader."}),(0,$d.jsxs)(vs,{to:"/bias",className:"cta-link",children:["L\xe4s hur v\xe5r algoritm rankar ",(0,$d.jsx)(yu,{name:"arrow",size:15})]})]})}),(0,$d.jsxs)($u,{id:"hur",children:[(0,$d.jsxs)(Mu,{$left:!0,children:[(0,$d.jsx)("span",{className:"kicker",children:"S\xe5 fungerar Arvo Flow"}),(0,$d.jsx)("h2",{children:"Aktivera en g\xe5ng. Vi sk\xf6ter resten."}),(0,$d.jsx)("p",{children:"Ni beh\xf6ver inte byta system, l\xe4ra er n\xe5got nytt eller komma ih\xe5g att kolla n\xe5got. Arvo h\xf6r av sig \u2014 ni beh\xf6ver inte fr\xe5ga."})]}),(0,$d.jsx)(Bu,{children:jp.map(e=>(0,$d.jsxs)(Vu,{children:[(0,$d.jsx)("span",{className:"step",children:e.step}),(0,$d.jsx)("h3",{children:e.title}),(0,$d.jsx)("p",{children:e.body}),(0,$d.jsx)("ul",{children:e.bullets.map(e=>(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2}),e]},e))})]},e.step))}),(0,$d.jsxs)(Uu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvo Score\u2122"}),(0,$d.jsx)("h3",{children:"Vad ber\xe4ttar ert Score om era leverant\xf6rsavtal?"}),(0,$d.jsx)("p",{children:"Varje kategori i er bokf\xf6ring f\xe5r ett Score mellan 0\u2013100. Scoren baseras p\xe5 hur ert avtalspris f\xf6rh\xe5ller sig till branschsnittet \u2014 fyra niv\xe5er avg\xf6r om ni \xe4r optimala eller betalar f\xf6r mycket."})]}),(0,$d.jsx)(Ku,{children:$p.map(e=>(0,$d.jsxs)(Hu,{$color:e.color,children:[(0,$d.jsx)(Sp,{score:e.score,color:e.color}),(0,$d.jsxs)("div",{className:"text",children:[(0,$d.jsx)("strong",{className:"level",children:e.label}),(0,$d.jsx)("p",{children:e.desc})]})]},e.label))})]}),(0,$d.jsx)(tp,{id:"intelligence",children:(0,$d.jsxs)(rp,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h2",{children:"Arvo m\xe4rker det innan det kostar er."}),(0,$d.jsx)("p",{className:"sub",children:"Bokf\xf6ringsprogram registrerar vad ni betalar. Arvo Intelligence kontaktar er n\xe4r ni h\xe5ller p\xe5 att betala f\xf6r mycket."}),(0,$d.jsxs)(np,{children:[(0,$d.jsxs)(ap,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(yu,{name:"pulse",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Smygh\xf6jningslarm"}),(0,$d.jsx)("p",{children:"Vi j\xe4mf\xf6r varje ny faktura mot f\xf6reg\xe5ende period. Avviker priset \u2014 kontaktar vi er samma dag."})]})]}),(0,$d.jsxs)(ap,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(yu,{name:"benchmark",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Community Benchmark"}),(0,$d.jsx)("p",{children:"Er prisdata m\xe4ts mot anonymiserade data fr\xe5n j\xe4mf\xf6rbara bolag i er bransch. Ni vet alltid om ni betalar r\xe4tt."})]})]}),(0,$d.jsxs)(ap,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(yu,{name:"calendar-clock",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Proaktiv avtalsbevakning"}),(0,$d.jsx)("p",{children:"90 dagar innan ett avtal f\xf6rnyas automatiskt varnar vi er \u2014 i tid att byta eller agera innan bindningen l\xe5ser \xe4nnu ett \xe5r."})]})]})]})]}),(0,$d.jsxs)(lp,{ref:c,$visible:s,children:[(0,$d.jsxs)("div",{className:"preview-header",children:[(0,$d.jsxs)("span",{className:"preview-brand",children:[(0,$d.jsx)("span",{className:"live"})," Arvo Intelligence"]}),(0,$d.jsx)("span",{className:"preview-time",children:"Exempel ur en briefing"})]}),(0,$d.jsxs)("div",{className:"signal alert",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(yu,{name:"pulse",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Smygh\xf6jningslarm"}),(0,$d.jsxs)("div",{className:"signal-line",children:["Telia \xb7 Mobilflotta 24 abonnemang",(0,$d.jsx)("span",{className:"badge up",children:"+11\xa0%"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Priset h\xf6jt mot f\xf6rra perioden \u2014 utan avisering."})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(yu,{name:"benchmark",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Community Benchmark"}),(0,$d.jsx)("div",{className:"bench-grid","aria-hidden":"true",children:Array.from({length:15}).map((e,t)=>(0,$d.jsx)("span",{className:Ap.has(t)?"on":"",style:{transitionDelay:560+38*t+"ms"}},t))}),(0,$d.jsxs)("p",{className:"signal-sub",children:[(0,$d.jsx)("strong",{children:"8 av 15"})," bolag i samma kohort fick h\xf6jningen \u2014 Arvo ser m\xf6nstret innan det n\xe5r er."]})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(yu,{name:"calendar-clock",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Avtalsbevakning"}),(0,$d.jsxs)("div",{className:"signal-line sm",children:["Avtalet f\xf6rnyas automatiskt om ",(0,$d.jsx)("strong",{children:"23\xa0dagar"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Arvo hinner agera innan bindningen l\xe5ses \xe4nnu ett \xe5r."})]})]}),(0,$d.jsxs)("div",{className:"alert-saving",children:[(0,$d.jsx)("div",{className:"saving-label",children:"M\xf6jlig besparing"}),(0,$d.jsxs)("div",{className:"saving-amount",children:["21\xa0360\xa0kr",(0,$d.jsx)("span",{className:"unit",children:"/\xe5r"})]})]}),(0,$d.jsxs)("div",{className:"alert-actions",children:[(0,$d.jsx)("button",{className:"btn-primary",children:"Ja, Arvo agerar \u2192"}),(0,$d.jsx)("button",{className:"btn-secondary",children:"Visa underlag"})]})]})]})}),(0,$d.jsxs)(cp,{id:"prisintelligens",children:[(0,$d.jsxs)(dp,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvos prisintelligens"}),(0,$d.jsx)("h2",{children:"Vi vet vad era leverant\xf6rer tar av andra."}),(0,$d.jsx)("p",{children:"Varje faktura Arvo analyserar g\xf6r bilden skarpare. Vi ser inte bara vad Telia listar p\xe5 sin hemsida \u2014 vi ser vad de faktiskt tar betalt av bolag i er bransch och er storlek. H\xe4r \xe4r hela er leverant\xf6rsportf\xf6lj, m\xe4tt mot marknaden p\xe5 en och samma skala."})]}),(0,$d.jsx)(Ep,{}),(0,$d.jsx)(up,{children:"Ju fler fakturor Arvo ser, desto mer vet vi \u2014 och desto vassare blir varje rekommendation. Ett f\xf6rspr\xe5ng som inte g\xe5r att kopiera."}),(0,$d.jsx)(pp,{children:"Visualiseringen \xe4r illustrativ \u2014 prisintervall baserade p\xe5 verifierade marknadsdata maj 2026."})]}),(0,$d.jsxs)($u,{id:"priser",children:[(0,$d.jsxs)(Mu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Pris"}),(0,$d.jsx)("h2",{children:"Bevakning p\xe5 prenumeration. Genomf\xf6rt byte vid behov."}),(0,$d.jsx)("p",{children:"V\xe4lj det som passar er \u2014 eller kombinera b\xe5da."})]}),(0,$d.jsxs)(yp,{children:[(0,$d.jsxs)(kp,{$featured:!0,children:[(0,$d.jsx)("div",{className:"tier-badge",children:"Arvo Intelligence"}),(0,$d.jsx)("h3",{children:"Er proaktiva finansdirekt\xf6r."}),(0,$d.jsxs)("div",{className:"tier-price",children:["1\xa0995 kr",(0,$d.jsx)("span",{className:"period",children:"/ m\xe5n"})]}),(0,$d.jsx)("p",{className:"tier-tagline",children:"L\xf6pande bevakning av samtliga leverant\xf6rsfakturor. Arvo h\xf6r av sig \u2014 ni beh\xf6ver inte fr\xe5ga."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:15,stroke:2.4})," Smygh\xf6jningslarm \u2014 avvikelse detekteras direkt"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:15,stroke:2.4})," Community Benchmark mot er bransch"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:15,stroke:2.4})," Avtalsbevakning med 90-dagarsvarning"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:15,stroke:2.4})," M\xe5nadsvis briefing med konkreta insikter"]})]}),(0,$d.jsx)(Md,{as:vs,to:"/intelligence",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},children:"Aktivera Arvo Intelligence \u2192"}),(0,$d.jsx)("p",{className:"tier-note",children:"Ingen bindningstid \xb7 Kom ig\xe5ng p\xe5 2 minuter"})]}),(0,$d.jsxs)(kp,{children:[(0,$d.jsx)("div",{className:"tier-badge",children:"Arvo Switch"}),(0,$d.jsx)("h3",{children:"Genomf\xf6rt leverant\xf6rsbyte."}),(0,$d.jsxs)("div",{className:"tier-price",children:["20 %",(0,$d.jsx)("span",{className:"period",children:"av besparing"})]}),(0,$d.jsx)("p",{className:"tier-tagline",children:"Varje pris verifieras mot leverant\xf6rens officiella avtalspris \u2014 ni godk\xe4nner, Arvo f\xf6rbereder bytet."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:15,stroke:2.4})," Arvodet faktureras f\xf6rst n\xe4r besparingen syns i era egna b\xf6cker"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:15,stroke:2.4})," Ni godk\xe4nner varje byte med BankID"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:15,stroke:2.4})," Fr.o.m. \xe5r 2 tillfaller hela besparingen er"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:15,stroke:2.4})," Hittar vi inget \u2014 kostar det inget"]})]}),(0,$d.jsx)(Md,{as:vs,to:"/testa-faktura",$variant:"secondary",$size:"lg",style:{width:"100%",justifyContent:"center"},children:"Testa med en faktura \u2192"}),(0,$d.jsxs)("div",{className:"tier-addon",children:[(0,$d.jsx)("strong",{children:"Till\xe4gg f\xf6r Intelligence-kunder"}),"Aktivera ett byte direkt fr\xe5n er m\xe5nadsbriefing. 20 % av realiserad besparing."]})]})]})]}),(0,$d.jsxs)($u,{id:"founding-members",children:[(0,$d.jsxs)(Mu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Founding Members \xb7 Begr\xe4nsade platser"}),(0,$d.jsx)("h2",{children:"Vill du vara f\xf6rst ut?"}),(0,$d.jsx)("p",{children:"Vi tar in 50 svenska f\xf6retag innan publik lansering. Du f\xe5r personlig onboarding direkt med grundarna, tj\xe4nsten gratis de f\xf6rsta 6 m\xe5naderna, och p\xe5verkan \xf6ver vilka kategorier vi prioriterar h\xe4rn\xe4st."})]}),(0,$d.jsxs)(Yu,{children:[(0,$d.jsxs)(Gu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Founding Member"}),(0,$d.jsx)("h2",{children:"50 platser. Du f\xe5r p\xe5verkan."}),(0,$d.jsx)("p",{className:"lede",children:"Vi sl\xe4pper Arvo Flow stegvis. Founding Members f\xe5r tillg\xe5ng f\xf6rst, tj\xe4nsten helt gratis de f\xf6rsta 6 m\xe5naderna, och hj\xe4lper oss prioritera vilka leverant\xf6rskategorier som ska in h\xe4rn\xe4st."}),(0,$d.jsxs)("ul",{className:"benefits",children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4})," Personlig onboarding direkt med grundarna \u2014 30 min Teams"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4})," Tj\xe4nsten \xe4r helt gratis de f\xf6rsta 6 m\xe5naderna \u2014 ingen success-fee, inga avgifter"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4})," Du r\xf6star p\xe5 vilka kategorier vi \xf6ppnar n\xe4sta kvartal"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4})," Garanterad f\xf6rtur till f\xf6rs\xe4krings\xadbyten n\xe4r FI-licensen \xe4r klar"]})]})]}),"success"===i?(0,$d.jsxs)(Ju,{children:[(0,$d.jsx)("div",{className:"check",children:(0,$d.jsx)(yu,{name:"check",size:28,stroke:2.5})}),(0,$d.jsx)("h3",{children:"Tack \u2014 du st\xe5r p\xe5 listan."}),(0,$d.jsx)("p",{children:"Vi h\xf6r av oss inom 48 timmar f\xf6r att boka en kort onboarding och hj\xe4lpa dig komma ig\xe5ng."})]}):(0,$d.jsxs)(Qu,{onSubmit:async t=>{t.preventDefault();const r=(e=>{const t={};return e.company.trim()||(t.company="F\xf6retagsnamn saknas."),e.name.trim()||(t.name="Namn saknas."),e.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.trim())||(t.email="E-postadressen ser inte r\xe4tt ut."):t.email="E-post saknas.",t})(e);if(a(r),!(Object.keys(r).length>0)){o("submitting");try{const t=await fetch("/api/founding-member",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company:e.company.trim(),name:e.name.trim(),email:e.email.trim(),referrer:"undefined"!==typeof document&&document.referrer||null,timestamp:(new Date).toISOString()})});if(!t.ok)throw new Error("API "+t.status);o("success")}catch(n){o("error")}}},noValidate:!0,children:[(0,$d.jsxs)("label",{children:["F\xf6retagsnamn",(0,$d.jsx)("input",{type:"text",name:"company",required:!0,autoComplete:"organization",placeholder:"t.ex. Lindberg VVS AB",value:e.company,onChange:e=>t(t=>({...t,company:e.target.value})),"aria-invalid":!!r.company||void 0,disabled:"submitting"===i}),r.company&&(0,$d.jsx)("span",{className:"error",children:r.company})]}),(0,$d.jsxs)("label",{children:["Namn",(0,$d.jsx)("input",{type:"text",name:"name",required:!0,autoComplete:"name",placeholder:"t.ex. Johan Lindberg",value:e.name,onChange:e=>t(t=>({...t,name:e.target.value})),"aria-invalid":!!r.name||void 0,disabled:"submitting"===i}),r.name&&(0,$d.jsx)("span",{className:"error",children:r.name})]}),(0,$d.jsxs)("label",{children:["E-post",(0,$d.jsx)("input",{type:"email",name:"email",required:!0,autoComplete:"email",placeholder:"johan@lindbergvvs.se",value:e.email,onChange:e=>t(t=>({...t,email:e.target.value})),"aria-invalid":!!r.email||void 0,disabled:"submitting"===i}),r.email&&(0,$d.jsx)("span",{className:"error",children:r.email})]}),(0,$d.jsxs)(Md,{type:"submit",$variant:"gradient",$size:"lg",disabled:"submitting"===i,children:["submitting"===i?"Skickar\u2026":"Reservera min plats","submitting"!==i&&(0,$d.jsx)(yu,{name:"arrow",size:18})]}),"error"===i&&(0,$d.jsx)("span",{className:"error",children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen eller mejla hej@arvoflow.se."}),(0,$d.jsx)("p",{className:"fineprint",children:"Vi anv\xe4nder dina uppgifter enbart f\xf6r att kontakta dig om Founding Member-platsen och raderar dem om du tackar nej. Inga utskick utan ditt godk\xe4nnande."})]})]})]}),(0,$d.jsxs)($u,{id:"faq",children:[(0,$d.jsxs)(Mu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Vanliga fr\xe5gor"}),(0,$d.jsx)("h2",{children:"Det vi f\xe5r oftast \u2014 rakt p\xe5."})]}),(0,$d.jsx)(Xu,{children:zp.map((e,t)=>(0,$d.jsxs)(Zu,{children:[(0,$d.jsx)("summary",{children:e.q}),(0,$d.jsx)("p",{children:e.a})]},e.q))})]}),(0,$d.jsxs)(ep,{children:[(0,$d.jsx)("h2",{children:"Betalar ni f\xf6r mycket just nu?"}),(0,$d.jsx)("p",{children:"Ni vet det inte f\xf6rr\xe4n Arvo har tittat. Ladda upp en faktura p\xe5 60 sekunder \u2014 vi visar er exakt var ni st\xe5r mot branschsnittet."}),(0,$d.jsx)("div",{className:"actions",children:(0,$d.jsxs)(Md,{as:vs,to:"/testa-faktura",$variant:"gradient",$size:"lg",children:["Testa med en faktura ",(0,$d.jsx)(yu,{name:"arrow",size:18})]})}),(0,$d.jsx)("div",{className:"fineprint",children:"Inga kreditkortsuppgifter. Ingen bindningstid. Avsluta n\xe4r ni vill."})]}),(0,$d.jsx)(vu,{})]})},Dp=jd`
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
`,Op=vd.div`
  width: 100%;
  max-width: 640px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  animation: ${Dp} 0.5s ease both;
  @media (max-width: 600px) { padding: 32px 24px; }
`,Pp=vd.div`
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
`,Lp=vd.h1`
  margin-top: 14px;
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
`,Rp=vd.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Ip=(vd.div`
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
`),Mp=vd.div`
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
`,Vp=vd.div`
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
`,Kp=vd.div`
  margin-top: 22px;
  padding: 14px 16px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`,Hp=vd.div`
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
`,Wp=vd.div`
  margin-top: 24px;
`,qp=vd.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin-bottom: 10px;
`,Yp=vd.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`,Gp=vd.label`
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
`,Qp=vd.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Jp=vd.button`
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
`,Xp=(vd.ul`
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
`),Zp=vd.p`
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
`,eh=vd.label`
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
`,th=vd.p`
  margin-top: 8px;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  display: flex;
  align-items: center;
  gap: 6px;
`,rh=jd`
  to { transform: rotate(360deg); }
`,nh=vd.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${rh} 0.7s linear infinite;
`,ah=()=>{const e=po(),[t,r]=(0,n.useState)("fortnox"),[a,i]=(0,n.useState)(!1),[o,s]=(0,n.useState)(!1),[l,c]=(0,n.useState)(!1),[d,u]=(0,n.useState)(!1),[p,h]=(0,n.useState)("konsult"),[m,f]=(0,n.useState)(5);return(0,$d.jsxs)(Fp,{children:[(0,$d.jsx)(uu,{variant:"public"}),(0,$d.jsx)(Tp,{children:(0,$d.jsxs)(Op,{children:[(0,$d.jsxs)(Pp,{children:[(0,$d.jsx)("span",{className:"dot"})," Steg 1 av 3 \xb7 Anslut bokf\xf6ring"]}),(0,$d.jsx)(Lp,{children:"Koppla din bokf\xf6ring"}),(0,$d.jsx)(Rp,{children:"60 sekunders koppling via Fortnox eller Visma \u2014 och du kan st\xe4nga av den lika snabbt."}),(0,$d.jsxs)(Ip,{children:[(0,$d.jsxs)(Mp,{$allow:!0,children:[(0,$d.jsxs)("span",{className:"head",children:[(0,$d.jsx)("div",{className:"dot",children:"\u2713"})," Vi l\xe4ser"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor (konton 4xxx\u20137xxx)"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:14,stroke:2.4})," Avtalskategorier & f\xf6rfallodatum"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:14,stroke:2.4})," Belopp & betalningshistorik"]})]})]}),(0,$d.jsxs)(Mp,{children:[(0,$d.jsxs)("span",{className:"head",children:[(0,$d.jsx)("div",{className:"dot",children:"\u2717"})," Vi l\xe4ser inte"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"lock",size:14,stroke:2})," Kundfakturor & int\xe4kter"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"lock",size:14,stroke:2})," L\xf6nedata & personnummer"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"lock",size:14,stroke:2})," Bankkonton & kassafl\xf6de"]})]})]})]}),(0,$d.jsxs)(Vp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"V\xe5rt l\xf6fte \u2014 hittar vi inga \xf6verpriser p\xe5 30 dagar?"}),(0,$d.jsx)("span",{children:"D\xe5 \xe4r ditt bolag redan optimerat. Vi raderar Fortnox-kopplingen och all din data automatiskt \u2014 du har inte betalat en krona."})]})]}),(0,$d.jsxs)(Wp,{children:[(0,$d.jsx)(qp,{children:"Ber\xe4tta lite om bolaget"}),(0,$d.jsxs)(Yp,{children:[(0,$d.jsxs)(Gp,{children:[(0,$d.jsx)("span",{className:"label",children:"Bransch"}),(0,$d.jsxs)("select",{value:p,onChange:e=>h(e.target.value),children:[(0,$d.jsx)("option",{value:"ehandel",children:"E-handel & Detaljhandel"}),(0,$d.jsx)("option",{value:"tillverkning",children:"Industri & Tillverkning"}),(0,$d.jsx)("option",{value:"it-tech",children:"IT, Tech & Mjukvara"}),(0,$d.jsx)("option",{value:"bygg",children:"Bygg, Hantverk & Fastighet"}),(0,$d.jsx)("option",{value:"hotell",children:"Hotell, Restaurang & Event"}),(0,$d.jsx)("option",{value:"konsult",children:"Konsult & F\xf6retagstj\xe4nster"}),(0,$d.jsx)("option",{value:"transport",children:"Transport & Logistik"}),(0,$d.jsx)("option",{value:"vard",children:"V\xe5rd, Omsorg & H\xe4lsa"}),(0,$d.jsx)("option",{value:"ovrigt",children:"\xd6vrigt / Annan bransch"})]})]}),(0,$d.jsxs)(Gp,{children:[(0,$d.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$d.jsx)("input",{type:"number",min:"1",max:"5000",value:m,onChange:e=>f(Number(e.target.value))})]})]})]}),(0,$d.jsxs)(Qp,{children:[(0,$d.jsxs)(Jp,{$active:"fortnox"===t,onClick:()=>r("fortnox"),children:[(0,$d.jsx)("span",{className:"badge",children:"Vanligast"}),(0,$d.jsx)(yu,{name:"fortnox",size:22,color:"#0F5132"}),(0,$d.jsx)("strong",{children:"Fortnox"}),(0,$d.jsx)("span",{children:"Direkt OAuth-koppling"})]}),(0,$d.jsxs)(Jp,{$active:"visma"===t,onClick:()=>r("visma"),children:[(0,$d.jsx)("span",{className:"badge",children:"Inom kort"}),(0,$d.jsx)(yu,{name:"fortnox",size:22,color:"#0F5132"}),(0,$d.jsx)("strong",{children:"Visma eEkonomi"}),(0,$d.jsx)("span",{children:"Lanseras inom kort"})]})]}),(0,$d.jsxs)(Kp,{children:[(0,$d.jsxs)(Hp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:"bankid",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"BankID"}),(0,$d.jsx)("span",{children:"S\xe4ker identifiering"})]}),(0,$d.jsxs)(Hp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:"shield",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"GDPR"}),(0,$d.jsx)("span",{children:"Fullt regelefterlevnad"})]}),(0,$d.jsxs)(Hp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:"lock",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"AES-256"}),(0,$d.jsx)("span",{children:"Krypterad i vila & i transport"})]}),(0,$d.jsxs)(Hp,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.2})}),(0,$d.jsx)("strong",{children:"Sverige"}),(0,$d.jsx)("span",{children:"Data hos Bahnhof, Stockholm"})]})]}),(0,$d.jsxs)(Up,{children:[(0,$d.jsx)("div",{className:"live"}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("strong",{children:"1 247"})," leverant\xf6rsfakturor analyserade denna vecka"]})]}),(0,$d.jsxs)(eh,{$error:d&&!l,children:[(0,$d.jsx)("input",{type:"checkbox",checked:l,onChange:e=>{c(e.target.checked),e.target.checked&&u(!1)},"aria-describedby":"consent-text"}),(0,$d.jsxs)("span",{className:"text",id:"consent-text",children:["Jag accepterar ",(0,$d.jsx)(vs,{to:"/villkor",children:"de allm\xe4nna villkoren"})," och"," ",(0,$d.jsx)(vs,{to:"/integritet",children:"integritetspolicyn"})," och bekr\xe4ftar att jag har beh\xf6righet att utf\xe4rda fullmakt f\xf6r f\xf6retaget."]})]}),d&&!l&&(0,$d.jsxs)(th,{children:[(0,$d.jsx)(yu,{name:"lock",size:12,stroke:2.4}),"Du m\xe5ste godk\xe4nna villkoren innan du g\xe5r vidare."]}),o&&(0,$d.jsxs)(th,{as:"div",style:{background:"rgba(27,122,110,0.08)",color:"#1B7A6E"},children:[(0,$d.jsx)(yu,{name:"check",size:12,stroke:2.4}),"Visma-kopplingen lanseras inom kort \u2014 vi har noterat ert intresse och h\xf6r av oss. Tills dess: ",(0,$d.jsx)(vs,{to:"/testa-faktura",style:{color:"#1B7A6E",fontWeight:600},children:"analysera en faktura direkt"}),"."]}),(0,$d.jsxs)(Xp,{children:[(0,$d.jsx)(Md,{$variant:"gradient",$size:"lg",onClick:()=>{if(l){if("fortnox"===t){i(!0);const e=new URLSearchParams({industry:p,employees:String(m)});return void(window.location.href=`/api/fortnox/auth?${e}`)}fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({source:"visma_connect",industry:p,employees:m})}).catch(()=>{}),s(!0)}else u(!0)},disabled:a,$full:!0,children:a?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(nh,{})," Ansluter till ","fortnox"===t?"Fortnox":"Visma","\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Anslut ","fortnox"===t?"Fortnox":"Visma"," ",(0,$d.jsx)(yu,{name:"arrow",size:18})]})}),(0,$d.jsxs)(Bp,{children:[(0,$d.jsx)(yu,{name:"lock",size:12,stroke:2.2}),"Du skickas nu till ","fortnox"===t?"Fortnox":"Visma"," f\xf6r att godk\xe4nna l\xe4s\xe5tkomst. Inga \xe4ndringar g\xf6rs i din bokf\xf6ring."]}),(0,$d.jsx)(Md,{$variant:"ghost",$size:"md",onClick:()=>e("/"),children:"Tillbaka"})]}),(0,$d.jsxs)(Zp,{children:["L\xe4s ",(0,$d.jsx)(vs,{to:"/villkor",style:{textDecoration:"underline"},children:"allm\xe4nna villkoren"}),", v\xe5r ",(0,$d.jsx)(vs,{to:"/integritet",style:{textDecoration:"underline"},children:"integritetspolicy"})," ","och ",(0,$d.jsx)(vs,{to:"/cookies",style:{textDecoration:"underline"},children:"cookie-policy"}),"."]})]})})]})},ih=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,oh=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,sh=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 96px 28px 56px;
  text-align: center;
  animation: ${ih} 0.6s ease both;
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
`,ch=vd.h1`
  margin-top: 22px;
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,dh=vd.p`
  margin: 22px auto 0;
  max-width: 640px;
  font-size: 18px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.55;
`,uh=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 28px;
  @media (max-width: 740px) { padding: 32px 20px; }
`,ph=vd.div`
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
`,hh=(vd.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`,vd.div`
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
`,vd.h2`
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
`),mh=vd.span`
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
`,gh=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
`,xh=vd.div`
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
`,vh=vd.section`
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
`,bh=[{cat:"Elavtal",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"Mobilabonnemang",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"F\xf6retagsbredband",detail:"Arvo genomf\xf6r bytet (BankID)",pay:"20 % av realiserad besparing"},{cat:"Programvara / SaaS",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"Kortterminal",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"Fakturatj\xe4nst",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"L\xf6neadministration",detail:"Arvo f\xf6rbereder, ni formaliserar",pay:"20 % av realiserad besparing"},{cat:"F\xf6retagsf\xf6rs\xe4kring",detail:"Arvo bev\xe4pnar er med exakt motbud",pay:"Ing\xe5r i prenumerationen"},{cat:"F\xf6retagsleasing",detail:"Arvo bev\xe4pnar er med exakt motbud",pay:"Ing\xe5r i prenumerationen"}],yh=()=>(0,$d.jsxs)(oh,{children:[(0,$d.jsx)(uu,{variant:"public"}),(0,$d.jsxs)(sh,{children:[(0,$d.jsxs)(lh,{children:[(0,$d.jsx)("span",{className:"dot"})," Rankningspolicy \xb7 Senast uppdaterad 2026-04-24"]}),(0,$d.jsxs)(ch,{children:["Vi rankar leverant\xf6rer p\xe5 ",(0,$d.jsx)("em",{children:"din"})," totalkostnad \u2014 inte v\xe5r provision."]}),(0,$d.jsx)(dh,{children:'Det h\xe4r \xe4r hela v\xe5r policy. Inga undantag, inga gr\xe5zoner, inga "premium-partners". Om en journalist en dag granskar oss vill vi att de hittar exakt det vi skrev h\xe4r.'})]}),(0,$d.jsxs)(uh,{children:[(0,$d.jsx)(mh,{children:"De fyra reglerna"}),(0,$d.jsx)(hh,{children:"Hur vi f\xf6rhindrar bias fr\xe5n dag 1."}),(0,$d.jsxs)(fh,{children:["Provision fr\xe5n leverant\xf6rer \xe4r en uppenbar intressekonflikt mot kunden. ","Vi l\xf6ste den inte med tak eller l\xf6ften \u2014 vi tog bort d\xf6rren helt. Arvo tar aldrig en krona fr\xe5n en leverant\xf6r."]}),(0,$d.jsxs)(ph,{children:[(0,$d.jsx)("div",{className:"num",children:"1"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"V\xe5r algoritm \xe4r publik. Och f\xf6ruts\xe4gbar."}),(0,$d.jsxs)("p",{children:["Vi rankar varje f\xf6rslag p\xe5 ",(0,$d.jsx)("strong",{children:"vad det kostar er totalt \xf6ver tv\xe5 \xe5r \u2014 minus vad sj\xe4lva bytet kostar"}),". Den som ger er flest kronor kvar p\xe5 kontot vinner \u2014 alltid. Vad en leverant\xf6r skulle vilja betala oss r\xe4knas aldrig in: de betalar oss aldrig n\xe5got."]}),(0,$d.jsxs)("pre",{children:["score(provider) =\n    annualCost(provider) * 2\n  + switchingCost(provider)        // eng\xe5ngskostnader, etablering, portering\n  - reliabilityBonus(provider)     // SLA, supportkvalitet (publik benchmark)\n  - coverageMatch(provider)        // % av nuvarande t\xe4ckning som beh\xe5lls\n\n",(0,$d.jsx)("b",{children:"// Vad en leverant\xf6r betalar oss \xe4r aldrig en variabel \u2014 de betalar oss aldrig n\xe5got.\n// L\xe4gst score vinner. Vid lika: l\xe4gst pris f\xf6r er."})]})]})]}),(0,$d.jsxs)(ph,{children:[(0,$d.jsx)("div",{className:"num",children:"2"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Noll kronor fr\xe5n leverant\xf6rer. Inget tak \u2014 f\xf6r det finns inget att kapa."}),(0,$d.jsxs)("p",{children:["Arvo tar aldrig en kickback, provision eller partner-avgift fr\xe5n en leverant\xf6r ","\u2014 inte nu, inte kapat, aldrig. V\xe5r enda int\xe4kt \xe4r success fee fr\xe5n dig. Vi kan inte k\xf6pas, f\xf6r det finns ingen d\xf6rr in. I samma sekund vi tj\xe4nade en krona p\xe5 att styra dig mot en leverant\xf6r vore v\xe5r oberoende r\xf6st d\xf6d \u2014 och med den hela v\xe5rt existensber\xe4ttigande."]})]})]}),(0,$d.jsxs)(ph,{children:[(0,$d.jsx)("div",{className:"num",children:"3"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Ett erbjudande. Inga val, inga kr\xe5ngel."}),(0,$d.jsxs)("p",{children:["Vi tar ",(0,$d.jsx)("strong",{children:"20 % av realiserad besparing"})," \u2014 och fakturerar f\xf6rst n\xe4r besparingen faktiskt syns i dina egna b\xf6cker (den gamla leverant\xf6rsraden f\xf6rsvinner, den nya dyker upp). Aldrig p\xe5 en siffra vi bara gissat. Landar ingen besparing kostar Switch ingenting. Det \xe4r det enda du beh\xf6ver godk\xe4nna."]})]})]}),(0,$d.jsxs)(ph,{children:[(0,$d.jsx)("div",{className:"num",children:"4"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Vi publicerar v\xe5r rekommendationsstatistik kvartalsvis."}),(0,$d.jsx)("p",{children:"Varje kvartal publiceras hur ofta varje leverant\xf6r rekommenderas och hur mycket besparing som faktiskt realiserats hos v\xe5ra kunder. Inga affiliate-utbetalningar att redovisa \u2014 det finns inga. Granska oss. Det g\xf6r branschen \xe4rligare."})]})]})]}),(0,$d.jsxs)(uh,{children:[(0,$d.jsx)(mh,{children:"Vad vi g\xf6r \u2014 och hur vi betalas \u2014 per kategori"}),(0,$d.jsx)(hh,{children:"Olika kategorier, olika mekanik. Samma int\xe4kt: bara fr\xe5n dig."}),(0,$d.jsx)(fh,{children:"I vissa kategorier genomf\xf6r vi bytet, i andra f\xf6rbereder vi det, i n\xe5gra bev\xe4pnar vi dig att agera sj\xe4lv. Vi lovar bara den mekanik vi \xe4ger \u2014 och tar betalt bara p\xe5 besparing som landat."}),(0,$d.jsxs)(gh,{children:[(0,$d.jsxs)(xh,{className:"header",children:[(0,$d.jsx)("div",{children:"Kategori"}),(0,$d.jsx)("div",{children:"Vad Arvo g\xf6r"}),(0,$d.jsx)("div",{style:{textAlign:"right"},children:"Hur vi betalas"})]}),bh.map(e=>(0,$d.jsxs)(xh,{children:[(0,$d.jsx)("div",{className:"cat",children:e.cat}),(0,$d.jsx)("div",{className:"detail",children:e.detail}),(0,$d.jsx)("div",{className:"cap",children:e.pay})]},e.cat))]})]}),(0,$d.jsxs)(vh,{children:[(0,$d.jsx)("h2",{children:"Det h\xe4r \xe4r inte marknadsf\xf6ring. Det h\xe4r \xe4r arkitektur."}),(0,$d.jsxs)("p",{children:["Om du uppt\xe4cker att vi bryter mot n\xe5gon av reglerna ovan \u2014 mejla"," ",(0,$d.jsx)("a",{href:"mailto:transparens@arvo.flow",style:{textDecoration:"underline"},children:"transparens@arvo.flow"}),". Vi svarar inom 48 h, publikt."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsxs)(Md,{as:vs,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$d.jsx)(yu,{name:"arrow",size:18})]}),(0,$d.jsx)(Md,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(vu,{})]}),kh=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,jh=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,wh=vd.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 28px 40px;
  text-align: center;
  animation: ${kh} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 28px; }
`,Sh=vd.span`
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
`,$h=vd.h1`
  margin-top: 22px;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,zh=vd.p`
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
`,Nh=vd.div`
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
`,Eh=vd.section`
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
`,Ah=(vd.div`
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
`),Ch=vd.section`
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
`,Dh=(vd.span`
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
`,Oh=vd.div`
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
`,Ph=()=>(0,$d.jsxs)(jh,{children:[(0,$d.jsx)(uu,{variant:"public"}),(0,$d.jsxs)(wh,{children:[(0,$d.jsxs)(Sh,{children:[(0,$d.jsx)("span",{className:"dot"})," Allm\xe4nna villkor \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$d.jsxs)($h,{children:["Klart, kort och ",(0,$d.jsx)("em",{children:"p\xe5 din sida"}),"."]}),(0,$d.jsx)(zh,{children:"Det h\xe4r \xe4r hela avtalet mellan dig och Arvo Flow AB. Inga fasta avgifter, inga uppstartsavgifter, ingen inl\xe5sning. Vi tj\xe4nar pengar bara n\xe4r du faktiskt sparar."})]}),(0,$d.jsxs)(_h,{children:[(0,$d.jsxs)(Nh,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r beh\xf6ver du veta innan du signerar med BankID:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Ombudskap."})," Arvo Flow agerar som ditt f\xf6retags ombud f\xf6r att optimera och ing\xe5 avtal inom el, telefoni, bredband, f\xf6rs\xe4kring och leasing. Vi verifierar din beh\xf6righet mot Bolagsverket i realtid."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Besparingsarvode."})," Vi tar ingen fast avgift. V\xe5rt arvode \xe4r 20 % av besparingsunderlaget (skillnaden mellan ditt nya och ditt gamla avtal) under de f\xf6rsta 12 m\xe5naderna efter ett byte."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"\xc5ngerr\xe4tt."})," Du har 24 timmars \xe5ngerr\xe4tt fr\xe5n BankID-signering innan vi p\xe5b\xf6rjar skarpa byten hos leverant\xf6rerna."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Ingen inl\xe5sning."})," Du kan s\xe4ga upp Arvo Flow-tj\xe4nsten n\xe4r som helst med 30 dagars upps\xe4gningstid."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Datas\xe4kerhet."})," Vi l\xe4ser endast n\xf6dv\xe4ndig fakturadata via Fortnox. Vid avslut raderas din transaktionsdata inom 24 timmar."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Trygghet."})," V\xe5rt skadest\xe5ndsansvar \xe4r begr\xe4nsat till 12 m\xe5naders betalda avgifter, dock l\xe4gst 50 000 SEK."]})]})]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"1. Definitioner"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.1 Tj\xe4nsten."})," Den digitala plattformen Arvo Flow samt tillh\xf6rande ombudstj\xe4nster f\xf6r att optimera Kundens leverant\xf6rsavtal."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.2 Besparingsunderlag."})," Det belopp som ligger till grund f\xf6r Besparingsavgiften, motsvarande skillnaden i avtalskostnad exkl. moms \xf6ver en 12-m\xe5nadersperiod mellan Kundens tidigare avtal och det nya avtalet."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.3 Besparingsarvode."})," Det r\xf6rliga arvode om 20 % av Besparingsunderlaget som tillfaller Arvo Flow, fakturerat efter Kundens f\xf6rsta faktura fr\xe5n den nya leverant\xf6ren."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"2. Uppdraget och Fullmakt"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"2.1"})," Genom signering via BankID ger Kunden Arvo Flow fullmakt att inh\xe4mta uppgifter, s\xe4ga upp befintliga avtal samt ing\xe5 nya avtal f\xf6r Kundens r\xe4kning inom de kategorier Kunden aktiverat i Tj\xe4nsten."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"2.2 \xc5ngerfrist."})," Kunden har r\xe4tt att \xe5terkalla sin accept av dessa villkor inom 24 timmar fr\xe5n signering. Under \xe5ngerfristen p\xe5b\xf6rjar Arvo Flow inga skarpa upps\xe4gningar eller avtalstecknanden hos tredje part."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"3. Arvode och Betalning"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.1"})," Tj\xe4nsten baseras p\xe5 realiserad besparing \u2014 den skillnad som faktiskt uppst\xe5r mellan tidigare och nytt avtal. Inga fasta avgifter, uppstartsavgifter eller licensavgifter utg\xe5r."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.2"})," Besparingsavgiften faktureras som en eng\xe5ngsavgift, 3 m\xe5nader efter att det nya avtalet aktiverats. Fr.o.m. \xe5r 2 tillfaller hela besparingen Kunden."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.3 F\xf6rtida avslut av leverant\xf6rsavtal."})," Om Kunden v\xe4ljer att avsluta ett av Arvo Flow tecknat leverant\xf6rsavtal i f\xf6rtid, eller p\xe5 annat s\xe4tt f\xf6rhindrar Tj\xe4nstens utf\xf6rande, f\xf6rfaller Besparingsavgiften i sin helhet. Detta g\xe4ller ej om Kunden avbryter samarbetet p\xe5 grund av v\xe4sentligt avtalsbrott fr\xe5n Arvo Flows sida."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"4. Beh\xf6righet och Upps\xe4gning av Tj\xe4nsten"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"4.1 Firmateckningsverifiering."})," Arvo Flow verifierar via BankID-signaturens personnummer mot Bolagsverkets aktuella firmatecknarregister. Avtal ing\xe5s endast om verifieringen godk\xe4nns."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"4.2 Upps\xe4gning."})," Avtalet l\xf6per tills vidare. B\xe5da parter kan s\xe4ga upp Tj\xe4nsten med 30 dagars upps\xe4gningstid. Redan p\xe5b\xf6rjade avtalsbyten slutf\xf6rs och debiteras enligt avtal."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"5. Ansvarsbegr\xe4nsning och Risksenarier"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.1 Missad upps\xe4gning."})," Om Arvo Flow missar att s\xe4ga upp ett befintligt avtal i tid, ers\xe4tter Arvo Flow mellanskillnaden upp till vid var tid g\xe4llande ansvarstak."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.2 Dubbel-leverans."})," Om Kunden under en period har tv\xe5 parallella leverant\xf6rsavtal f\xf6r samma tj\xe4nst till f\xf6ljd av fel fr\xe5n Arvo Flow, meddelar Kunden Arvo Flow, varvid Arvo Flow krediterar framtida avgifter eller, efter Kundens \xf6nskem\xe5l, utf\xf6r \xe5terbetalning inom 30 dagar."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.3 Ansvarstak."})," Arvo Flows totala skadest\xe5ndsansvar \xe4r begr\xe4nsat till ett belopp motsvarande 100 % av de senaste 12 m\xe5nadernas betalda Besparingsavgifter, dock l\xe4gst 50 000 SEK. Arvo Flow ansvarar ej f\xf6r indirekta skador s\xe5som utebliven vinst, produktionsbortfall eller goodwill-skada."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"6. Force Majeure"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"6.1"})," Arvo Flow \xe4r befriat fr\xe5n p\xe5f\xf6ljd vid underl\xe5tenhet orsakad av pandemi, krig, cyberattack, myndighetsbeslut eller fel hos tredjepartsleverant\xf6r (t.ex. BankID, Fortnox, Visma eller leverant\xf6r vars system Tj\xe4nsten \xe4r beroende av) som ligger utanf\xf6r Arvo Flows kontroll."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"7. Data och Tvist"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"7.1 Personuppgifter."})," Personuppgiftsbehandling regleras i separat Personuppgiftsbitr\xe4desavtal (DPA), tillg\xe4nglig som bilaga till"," ",(0,$d.jsx)(vs,{to:"/integritet",children:"v\xe5r integritetspolicy"}),"."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"7.2 Tvist."})," Tvister med anledning av dessa villkor avg\xf6rs i Stockholms tingsr\xe4tt enligt svensk lag."]})]}),(0,$d.jsxs)(Ah,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Allm\xe4nna villkor v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$d.jsx)("br",{}),"Tidigare versioner finns tillg\xe4ngliga p\xe5 beg\xe4ran fr\xe5n"," ",(0,$d.jsx)("a",{href:"mailto:juridik@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"juridik@arvo.flow"}),"."]})]}),(0,$d.jsxs)(Ch,{children:[(0,$d.jsx)("h2",{children:"Fr\xe5gor p\xe5 villkoren?"}),(0,$d.jsxs)("p",{children:["Mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:juridik@arvo.flow",children:"juridik@arvo.flow"})," s\xe5 svarar vi inom 48 h. Vi har en svensk aff\xe4rsjurist som granskat varje klausul."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsxs)(Md,{as:vs,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$d.jsx)(yu,{name:"arrow",size:18})]}),(0,$d.jsx)(Md,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(vu,{})]}),Lh=()=>(0,$d.jsxs)(jh,{children:[(0,$d.jsx)(uu,{variant:"public"}),(0,$d.jsxs)(wh,{children:[(0,$d.jsxs)(Sh,{children:[(0,$d.jsx)("span",{className:"dot"})," Integritetspolicy & DPA \xb7 Version 1.4 \xb7 Senast uppdaterad 2026-05-19"]}),(0,$d.jsxs)($h,{children:["Du ",(0,$d.jsx)("em",{children:"\xe4ger"})," din data. Vi f\xf6rvaltar den."]}),(0,$d.jsx)(zh,{children:"Vi l\xe4ser bara den fakturadata vi beh\xf6ver f\xf6r att hitta \xf6verpriser \u2014 inget annat. Vid avslut raderas allt inom 24 timmar. Det h\xe4r \xe4r hur, var och varf\xf6r."})]}),(0,$d.jsxs)(_h,{children:[(0,$d.jsxs)(Nh,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller f\xf6r dig som kund hos Arvo Flow:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vi l\xe4ser endast leverant\xf6rsfakturor"})," via Fortnox eller Visma \u2014 inte kundfakturor, l\xf6ner, bankkonton eller personnummer p\xe5 anst\xe4llda."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Faktura-PDF:er lagras aldrig."})," Vi extraherar den data vi beh\xf6ver och kastar filen direkt \u2014 noll persistent lagring av PDF-inneh\xe5ll hos Arvo Flow. By design."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Data lagras i EU/EES"})," eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer (Standard Contractual Clauses). Krypterad i vila (AES-256) och i transport (TLS 1.3)."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Du kan n\xe4r som helst"})," beg\xe4ra utdrag, r\xe4ttelse eller radering av dina personuppgifter via ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vid avslut"})," raderas all transaktionsdata inom 24 timmar. Bokf\xf6ringsm\xe4ssiga underlag (fakturor p\xe5 v\xe5rt arvode) sparas i 7 \xe5r enligt bokf\xf6ringslagen."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vi s\xe4ljer aldrig din data."})," Vi delar den heller inte med leverant\xf6rer, annons\xf6rer eller andra tredje parter \u2014 ut\xf6ver de vi \xe4r bundna till f\xf6r att leverera Tj\xe4nsten."]})]})]})]}),(0,$d.jsx)(Dh,{children:"Integritetspolicy"}),(0,$d.jsx)(Fh,{children:"Den h\xe4r policyn beskriver hur Arvo Flow AB behandlar personuppgifter och f\xf6retagsuppgifter i samband med att vi levererar Tj\xe4nsten."}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"1. Personuppgiftsansvarig"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"}),", org.nr 559500-0000, \xe4r personuppgiftsansvarig f\xf6r de uppgifter vi samlar in om dig som kund eller bes\xf6kare. Kontakt:"," ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$d.jsx)("p",{children:"F\xf6r personuppgifter som behandlas p\xe5 Kundens uppdrag (t.ex. namn p\xe5 Kundens kontaktpersoner och firmatecknare) \xe4r Arvo Flow personuppgiftsbitr\xe4de \u2014 se DPA l\xe4ngre ner."})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"2. Vilka uppgifter vi behandlar"}),(0,$d.jsxs)(Th,{children:[(0,$d.jsxs)(Oh,{className:"header",children:[(0,$d.jsx)("div",{children:"Kategori"}),(0,$d.jsx)("div",{children:"Syfte & r\xe4ttslig grund"})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"F\xf6retagsuppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["Organisationsnummer, bolagsnamn, registreringsdatum. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."]})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Firmatecknarens uppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["Namn, personnummer (via BankID), beh\xf6righet enligt Bolagsverket. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"})," samt r\xe4ttslig f\xf6rpliktelse vid signering."]})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Kontaktuppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["E-post, telefon, namn p\xe5 kontaktpersoner. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r kundkommunikation, ",(0,$d.jsx)("em",{children:"samtycke"})," f\xf6r marknadsf\xf6ring."]})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Leverant\xf6rsfakturor"}),(0,$d.jsxs)("div",{className:"v",children:["Belopp, leverant\xf6r, kategori, f\xf6rfallodatum, fakturarader. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."," ","Anonymiserade uppgifter (belopp, leverant\xf6r, kategori) anv\xe4nds \xe4ven f\xf6r att bygga Arvo Flows branschindex \u2014 se \xa7 4 nedan. R\xe4ttslig grund f\xf6r indexanv\xe4ndning: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"}),"."]})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Faktura-PDF (uppladdning)"}),(0,$d.jsxs)("div",{className:"v",children:["PDF-filen konverteras till text i realtid via Anthropic API och raderas omedelbart \u2014 den lagras ",(0,$d.jsx)("strong",{children:"aldrig"})," p\xe5 Arvo Flows infrastruktur. Analysresultatet (extraherade siffror, inte PDF-inneh\xe5llet) cachas i 6 timmar f\xf6r att undvika on\xf6diga API-anrop. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r Tj\xe4nstens leverans."]})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Tekniska data"}),(0,$d.jsxs)("div",{className:"v",children:["IP-adress, webbl\xe4sare, sidvisningar (anonymiserat). R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r s\xe4kerhet och drift."]})]})]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsxs)("h3",{children:["3. Vad vi ",(0,$d.jsx)("em",{children:"inte"})," behandlar"]}),(0,$d.jsxs)("p",{children:["Vi har medvetet begr\xe4nsat datainsamlingen. Vi l\xe4ser ",(0,$d.jsx)("strong",{children:"aldrig"}),":"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"Kundfakturor eller int\xe4ktsdata"}),(0,$d.jsx)("li",{children:"L\xf6nedata eller personnummer p\xe5 anst\xe4llda"}),(0,$d.jsx)("li",{children:"Bankkontosaldon eller transaktionshistorik"}),(0,$d.jsx)("li",{children:"Kundregister eller CRM-data"}),(0,$d.jsx)("li",{children:"Inneh\xe5llet i e-postkorrespondens"})]}),(0,$d.jsx)("p",{children:"OAuth-scopen mot Fortnox och Visma \xe4r konfigurerade s\xe5 att vi tekniskt inte ens kan l\xe4sa kategorierna ovan, \xe4ven om vi ville."})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"4. Hur l\xe4nge vi sparar data"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Aktiv kund:"})," S\xe5 l\xe4nge avtalet l\xf6per."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Vid upps\xe4gning:"})," Transaktionsdata raderas inom 24 timmar."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Bokf\xf6ringsunderlag:"})," 7 \xe5r enligt bokf\xf6ringslagen (2 kap. 1 \xa7 BFL)."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Marknadsf\xf6ringssamtycke:"})," Tills du \xe5terkallar samtycket."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Faktura-PDF:"})," Lagras aldrig \u2014 raderas direkt efter AI-extraktering. Analysresultatet (JSON med siffror) cachas i 6 timmar, d\xe4refter auto-raderats."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Anonymiserad statistik (branschindex):"})," Belopp, leverant\xf6r och kategori fr\xe5n leverant\xf6rsfakturor anonymiseras och anv\xe4nds f\xf6r att ber\xe4kna marknadsmedian och prispercentiler per bransch och bolagsstorlek. Detta aggregerade index \xe4r grunden f\xf6r Tj\xe4nstens j\xe4mf\xf6relser och rekommendationer. Inga uppgifter kan h\xe4rledas till ett enskilt bolag. Sparas obegr\xe4nsat."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Anthropic API (AI-behandling):"})," Data behandlas via Anthropic API med 30 dagars radering f\xf6r Trust & Safety, utan att anv\xe4ndas f\xf6r modelltr\xe4ning."]})]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"5. Var data lagras & s\xe4kerhet"}),(0,$d.jsx)("p",{children:"All data lagras inom EU/EES, prim\xe4rt hos Bahnhof i Stockholm. Vi anv\xe4nder:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"AES-256 kryptering i vila"}),(0,$d.jsx)("li",{children:"TLS 1.3 f\xf6r all data\xf6verf\xf6ring"}),(0,$d.jsx)("li",{children:"Tv\xe5faktorautentisering f\xf6r all intern access"}),(0,$d.jsx)("li",{children:"Loggning av all access till kunddata (audit trail)"}),(0,$d.jsx)("li",{children:"Penetrationstester av oberoende part minst \xe5rligen"})]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"6. Dina r\xe4ttigheter (GDPR)"}),(0,$d.jsx)("p",{children:"Du har r\xe4tt att:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:["Beg\xe4ra ut ",(0,$d.jsx)("strong",{children:"registerutdrag"})," \xf6ver dina personuppgifter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"r\xe4ttelse"})," av felaktiga uppgifter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"radering"})," (r\xe4tten att bli gl\xf6md), inom de gr\xe4nser bokf\xf6ringslagen till\xe5ter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"begr\xe4nsning"})," av behandling"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Inv\xe4nda"})," mot behandling som sker p\xe5 ber\xe4ttigat intresse"]}),(0,$d.jsxs)("li",{children:["F\xe5 ut din data i ett ",(0,$d.jsx)("strong",{children:"strukturerat, maskinl\xe4sbart format"})," (dataportabilitet)"]}),(0,$d.jsxs)("li",{children:["L\xe4mna in ",(0,$d.jsx)("strong",{children:"klagom\xe5l till Integritetsskyddsmyndigheten"})," (IMY)"]})]}),(0,$d.jsxs)("p",{children:["Kontakta ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," \u2014 vi svarar inom 30 dagar."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"7. Underbitr\xe4den"}),(0,$d.jsx)("p",{children:"Vi anv\xe4nder f\xf6ljande underbitr\xe4den f\xf6r att leverera Tj\xe4nsten. Samtliga \xe4r bundna av DPA och behandlar uppgifter inom EU/EES eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer:"}),(0,$d.jsxs)(Th,{children:[(0,$d.jsxs)(Oh,{className:"header",children:[(0,$d.jsx)("div",{children:"Leverant\xf6r"}),(0,$d.jsx)("div",{children:"Funktion & \xf6verf\xf6ringsmekanism"})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Anthropic PBC"}),(0,$d.jsx)("div",{className:"v",children:"AI-analys av faktura-PDF \u2014 USA. SCC. 30 dagars radering, tr\xe4nar ej modeller p\xe5 API-data."})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Vercel Inc."}),(0,$d.jsx)("div",{className:"v",children:"Serverless funktioner & KV-cache \u2014 USA/EU. SCC. Analysresultat cachas max 6 timmar."})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Neon Inc."}),(0,$d.jsx)("div",{className:"v",children:"Postgres-databas (leads, offertf\xf6rfr\xe5gningar, branschindex) \u2014 USA. SCC."})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Resend Inc."}),(0,$d.jsx)("div",{className:"v",children:"Transaktionell e-post (bekr\xe4ftelser, interna larm) \u2014 USA. SCC."})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Bahnhof AB"}),(0,$d.jsx)("div",{className:"v",children:"Hosting / databas (planerad, full produkt) \u2014 Sverige"})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Scrive AB"}),(0,$d.jsx)("div",{className:"v",children:"BankID-signering (planerad) \u2014 Sverige"})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Fortnox / Visma"}),(0,$d.jsx)("div",{className:"v",children:"OAuth-koppling till bokf\xf6ring (planerad) \u2014 Sverige"})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Stripe Payments Europe"}),(0,$d.jsx)("div",{className:"v",children:"Betalningar & fakturering (planerad) \u2014 Irland"})]})]})]}),(0,$d.jsx)(Dh,{children:"Personuppgiftsbitr\xe4desavtal (DPA) \u2014 Bilaga"}),(0,$d.jsx)(Fh,{children:"Detta avtal g\xe4ller automatiskt n\xe4r du som Kund tecknar Tj\xe4nsten. Det reglerar Arvo Flows behandling av personuppgifter p\xe5 Kundens uppdrag (t.ex. uppgifter om Kundens kontaktpersoner)."}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"1. Parter"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Personuppgiftsansvarig:"})," Kunden."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Personuppgiftsbitr\xe4de:"})," Arvo Flow AB, org.nr 559500-0000."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"2. Omfattning"}),(0,$d.jsx)("p",{children:"Bitr\xe4det behandlar personuppgifter (kontaktuppgifter, fakturarader, personnummer f\xf6r firmateckning) f\xf6r att utf\xf6ra Tj\xe4nsten enligt Allm\xe4nna villkor."})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"3. Instruktion"}),(0,$d.jsxs)("p",{children:["Bitr\xe4det f\xe5r behandla uppgifter f\xf6r att (i) optimera avtal och fakturera enligt de ",(0,$d.jsx)(vs,{to:"/villkor",children:"Allm\xe4nna villkoren"}),", samt (ii) anonymisera och aggregera fakturauppgifter (belopp, leverant\xf6r, kategori) f\xf6r Tj\xe4nstens branschindex enligt \xa7 4 i Integritetspolicyn. Ytterligare instruktioner fr\xe5n Kunden ska vara skriftliga."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"4. S\xe4kerhet"}),(0,$d.jsx)("p",{children:"Bitr\xe4det ska vidta l\xe4mpliga tekniska och organisatoriska \xe5tg\xe4rder f\xf6r att skydda data mot oavsiktlig eller olaglig f\xf6rst\xf6relse, f\xf6rlust, \xe4ndring, obeh\xf6rigt r\xf6jande eller obeh\xf6rig \xe5tkomst (jfr GDPR art. 32). Detta inkluderar kryptering, \xe5tkomstkontroll, loggning och regelbunden s\xe4kerhetsgranskning enligt \xa7 5 i Integritetspolicyn ovan."})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"5. Underbitr\xe4den"}),(0,$d.jsx)("p",{children:"Kunden godk\xe4nner att Bitr\xe4det anv\xe4nder underbitr\xe4den enligt listan under \xa7 7 i Integritetspolicyn. Bitr\xe4det ska underr\xe4tta Kunden vid byte av underbitr\xe4de, varvid Kunden har r\xe4tt att inv\xe4nda inom 30 dagar."})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"6. Radering"}),(0,$d.jsx)("p",{children:"Vid upps\xe4gning av Tj\xe4nsten eller p\xe5 Kundens beg\xe4ran ska Bitr\xe4det radera eller anonymisera all transaktionsdata inom 24 timmar, s\xe5vida inte lag kr\xe4ver lagring (t.ex. bokf\xf6ringslagen f\xf6r fakturaunderlag)."})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"7. Personuppgiftsincident"}),(0,$d.jsx)("p",{children:"Bitr\xe4det ska utan on\xf6digt dr\xf6jsm\xe5l, dock senast 48 timmar efter det att Bitr\xe4det f\xe5tt k\xe4nnedom om en personuppgiftsincident som r\xf6r Kunden, meddela Kunden om incidenten samt vidtagna \xe5tg\xe4rder."})]}),(0,$d.jsxs)(Ah,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Integritetspolicy & DPA v1.4 \xb7 Senast uppdaterad 2026-05-19. ",(0,$d.jsx)("br",{}),"Fr\xe5gor: ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)(Ch,{children:[(0,$d.jsx)("h2",{children:"Vill du veta exakt vad vi har om dig?"}),(0,$d.jsxs)("p",{children:["Mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," s\xe5 f\xe5r du ett komplett registerutdrag inom 30 dagar \u2014 utan kostnad."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsx)(Md,{as:vs,to:"/villkor",$variant:"primary",$size:"lg",children:"L\xe4s allm\xe4nna villkor"}),(0,$d.jsx)(Md,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(vu,{})]}),Rh=()=>(0,$d.jsxs)(jh,{children:[(0,$d.jsx)(uu,{variant:"public"}),(0,$d.jsxs)(wh,{children:[(0,$d.jsxs)(Sh,{children:[(0,$d.jsx)("span",{className:"dot"})," Cookie-policy \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$d.jsxs)($h,{children:["Vi anv\xe4nder bara ",(0,$d.jsx)("em",{children:"n\xf6dv\xe4ndiga"})," cookies."]}),(0,$d.jsx)(zh,{children:"Inga marknadsf\xf6ringspixlar, inga remarketing-taggar, ingen f\xf6rs\xe4ljning av din surfdata till tredje part. Bara det som kr\xe4vs f\xf6r att Tj\xe4nsten ska fungera och vara s\xe4ker."})]}),(0,$d.jsxs)(_h,{children:[(0,$d.jsxs)(Nh,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller cookies p\xe5 arvo.flow och arvoflow.se:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndiga cookies"})," anv\xe4nds alltid \u2014 utan dem fungerar inte inloggning eller s\xe4ker session."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Anonymiserad statistik"})," samlas in f\xf6r att f\xf6rst\xe5 hur Tj\xe4nsten anv\xe4nds (sidvisningar, felmeddelanden). Den kan inte kopplas till dig som individ."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Inga marknadsf\xf6ringscookies."})," Vi anv\xe4nder inte Facebook Pixel, Google Ads remarketing eller liknande sp\xe5rning."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Inga cookies fr\xe5n tredje part"})," s\xe4tts utan ditt aktiva samtycke."]})]})]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"1. Vad \xe4r cookies?"}),(0,$d.jsx)("p",{children:"Cookies \xe4r sm\xe5 textfiler som sparas i din webbl\xe4sare n\xe4r du bes\xf6ker en webbplats. De anv\xe4nds f\xf6r att webbplatsen ska fungera korrekt, f\xf6r s\xe4kerhet och f\xf6r att samla in anonymiserad anv\xe4ndarstatistik."})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"2. Cookies vi anv\xe4nder"}),(0,$d.jsxs)(Th,{children:[(0,$d.jsxs)(Oh,{className:"header",children:[(0,$d.jsx)("div",{children:"Namn / typ"}),(0,$d.jsx)("div",{children:"Syfte & livsl\xe4ngd"})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Session-cookie"}),(0,$d.jsxs)("div",{className:"v",children:["H\xe5ller dig inloggad under bes\xf6ket. Livsl\xe4ngd: tills du st\xe4nger webbl\xe4saren. ",(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"CSRF-token"}),(0,$d.jsxs)("div",{className:"v",children:["Skyddar mot f\xf6rfalskade formul\xe4rinskick. Livsl\xe4ngd: tills sessionen avslutas. ",(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Cookie-samtycke"}),(0,$d.jsxs)("div",{className:"v",children:["Sparar ditt val g\xe4llande statistik-cookies. Livsl\xe4ngd: 12 m\xe5nader.",(0,$d.jsx)("strong",{children:" N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)(Oh,{children:[(0,$d.jsx)("div",{className:"k",children:"Anonymiserad statistik"}),(0,$d.jsxs)("div",{className:"v",children:["Aggregerad data om sidvisningar och fel. Ingen IP, ingen individidentifiering. Livsl\xe4ngd: 90 dagar. ",(0,$d.jsx)("strong",{children:"Statistik (samtycke)."})]})]})]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"3. Hur du hanterar cookies"}),(0,$d.jsx)("p",{children:"Du kan n\xe4r som helst:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"\xc5terkalla samtycke till statistik-cookies via inst\xe4llningar i din profil n\xe4r du \xe4r inloggad"}),(0,$d.jsx)("li",{children:"Radera alla cookies fr\xe5n arvo.flow via din webbl\xe4sares inst\xe4llningar"}),(0,$d.jsx)("li",{children:"Blockera cookies helt \u2014 observera dock att inloggning d\xe5 inte kommer fungera"})]}),(0,$d.jsxs)("p",{children:["V\xe4gledning f\xf6r de vanligaste webbl\xe4sarna finns hos"," ",(0,$d.jsx)("a",{href:"https://www.imy.se/privatperson/dataskydd/det-har-galler-enligt-gdpr/cookies/",target:"_blank",rel:"noopener noreferrer",children:"Integritetsskyddsmyndigheten (IMY)"}),"."]})]}),(0,$d.jsxs)(Eh,{children:[(0,$d.jsx)("h3",{children:"4. Lagst\xf6d"}),(0,$d.jsx)("p",{children:"Vi f\xf6ljer Lagen om elektronisk kommunikation (LEK) 9 kap. 28 \xa7. N\xf6dv\xe4ndiga cookies s\xe4tts utan samtycke eftersom de kr\xe4vs f\xf6r att tillhandah\xe5lla den tj\xe4nst du aktivt efterfr\xe5gat. F\xf6r \xf6vriga cookies inh\xe4mtar vi aktivt samtycke i enlighet med GDPR."})]}),(0,$d.jsxs)(Ah,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Cookie-policy v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$d.jsx)("br",{}),"Fr\xe5gor: ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)(Ch,{children:[(0,$d.jsx)("h2",{children:"Inga m\xf6rka m\xf6nster, inga dolda sp\xe5rare."}),(0,$d.jsxs)("p",{children:["Vi tycker att cookie-banners ska vara \xe4rliga. Om du uppt\xe4cker att vi s\xe4tter en cookie som inte st\xe5r med ovan \u2014 mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsx)(Md,{as:vs,to:"/integritet",$variant:"primary",$size:"lg",children:"L\xe4s integritetspolicy"}),(0,$d.jsx)(Md,{as:vs,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(vu,{})]}),Ih=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e)+" kr",Mh=e=>null!=e?new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e):"\u2013",Bh=["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];function Vh(e){if(!e)return null;const[t,r]=e.split("-");return`${Bh[parseInt(r,10)-1]} ${t}`}const Uh={microsoft365:"Microsoft 365",google:"Google Workspace",zoho:"Zoho Mail",other:"Anpassad e-postl\xf6sning"},Kh={mobil:{label:"Mobilabonnemang",partnerLabel:"Kvalificerad Mobiloperat\xf6r",segment:2,unit:"abonnemang",unitSingular:"abonnemang",inlineLabel:"mobilabonnemang",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga ramavtal f\xf6r mobilabonnemang kostar v\xe4sentligt mindre",variableChargeNote:"Roaming, \xf6vertrafik m.m. \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},molnvaxel:{label:"F\xf6retagsv\xe4xel (molnv\xe4xel)",partnerLabel:"Kvalificerad V\xe4xeloperat\xf6r",segment:2,unit:"anv\xe4ndare",unitSingular:"anv\xe4ndare",inlineLabel:"molnv\xe4xel",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat instegspris: Telia Smart Connect fr\xe5n 89 kr/anv/m\xe5n exkl moms (telia.se). Exakt pris beror p\xe5 niv\xe5 och tillval.",smfBenchmark:"marknadens instegsv\xe4xel (Telia Smart Connect) kostar fr\xe5n 89 kr/anv\xe4ndare/m\xe5n exkl moms",variableChargeNote:"Samtalsavgifter och tillval ut\xf6ver licensen \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},bredband:{label:"F\xf6retagsbredband",partnerLabel:"Kvalificerad Bredbandsoperat\xf6r",segment:2,unit:"anslutningar",unitSingular:"anslutning",inlineLabel:"bredband",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat mot leverant\xf6rens publika listpris (Tele2 address-API) \u2014 exakt pris beror p\xe5 adress och befintlig infrastruktur.",smfBenchmark:"leverant\xf6rens eget publika listpris f\xf6r samma hastighet \xe4r v\xe4sentligt l\xe4gre",variableChargeNote:"Datatrafik och \xf6verskottsavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"saas-productivity":{label:"Programvarulicenser / SaaS",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga avtal f\xf6r samma licenser kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-crm":{label:"CRM-system",partnerLabel:"Kvalificerad CRM-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga CRM-avtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-finance":{label:"Aff\xe4rssystem / Bokf\xf6ring",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga aff\xe4rssystemsavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-other":{label:"Programvarulicenser / SaaS \xb7 \xf6vrigt",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga programvaruavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-creative":{label:"Kreativ mjukvara / Design",partnerLabel:"Kvalificerad Mjukvaruleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga avtal f\xf6r kreativ mjukvara kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},el:{label:"Elavtal",partnerLabel:"Kvalificerad Elleverant\xf6r",segment:1,unit:"avtal",unitSingular:"avtal",inlineLabel:"el (energidel)",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"marknadsm\xe4ssiga elavtal kostar v\xe4sentligt mindre",variableChargeNote:"R\xf6rliga energikostnader (spotpris, n\xe4tavgift) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!0},skrivarleasing:{label:"Skrivare & Managed Print",partnerLabel:"Kvalificerad Print-leverant\xf6r",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"skrivarl\xf6sning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",smfBenchmark:"marknadsm\xe4ssiga utskriftsavtal kostar v\xe4sentligt mindre",variableChargeNote:"Klickkostnader per utskrift (volymbaserat) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},utrustningsleasing:{label:"IT-utrustningsleasing",partnerLabel:"Kvalificerad IT-partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"utrustningsleasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",smfBenchmark:"marknadsm\xe4ssiga IT-leasingavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},kortterminal:{label:"Kortterminal",partnerLabel:"Kvalificerad Betaltj\xe4nstleverant\xf6r",segment:6,unit:"terminaler",unitSingular:"terminal",inlineLabel:"kortterminal",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:"Transaktionsavgifter och volymbaserade procentavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"faktura-tjanst":{label:"Fakturatj\xe4nst / Aff\xe4rssystem",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:6,unit:"licenser",unitSingular:"licens",inlineLabel:"fakturatj\xe4nst",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},"leasing-bil":{label:"F\xf6retagsleasing",partnerLabel:"Kvalificerad Leasingpartner",segment:5,unit:"fordon",unitSingular:"fordon",inlineLabel:"billeasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"it-support":{label:"IT-drift & Support",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"IT-support",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},serverhosting:{label:"Serverhosting & Cloud-infrastruktur",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"serverhosting",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"transport-frakt":{label:"Transport & Frakt",partnerLabel:"Kvalificerad Fraktleverant\xf6r",segment:5,unit:"avtal",unitSingular:"avtal",inlineLabel:"transport",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},kontorsmaterial:{label:"Kontorsmaterial & F\xf6rbrukning",partnerLabel:"Kvalificerad F\xf6rbrukningsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"kontorsmaterial",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"st\xe4d-reng\xf6ring":{label:"St\xe4d & Reng\xf6ring",partnerLabel:"Kvalificerad St\xe4dleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"st\xe4dtj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"larm-bevakning":{label:"Larm & Bevakning",partnerLabel:"Kvalificerad S\xe4kerhetsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"larm och bevakning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},foretagshalsovard:{label:"F\xf6retagsh\xe4lsov\xe5rd",partnerLabel:"Kvalificerad H\xe4lsov\xe5rdspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsh\xe4lsov\xe5rd",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},loneadmin:{label:"L\xf6neadministration",partnerLabel:"Kvalificerad L\xf6nesystemleverant\xf6r",segment:7,unit:"anst\xe4llda",unitSingular:"anst\xe4lld",inlineLabel:"l\xf6neadministration",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:"Verifierat golv: Fortnox L\xf6n 199 kr/m\xe5n + 25 kr/anst\xe4lld/m\xe5n exkl moms (fortnox.se). Exakt utfall beror p\xe5 om behovet ryms i Fortnox L\xf6n.",smfBenchmark:"Fortnox L\xf6n \u2014 verifierat l\xe4gst \u2014 kostar 199 kr/m\xe5n + 25 kr/anst\xe4lld/m\xe5n exkl moms",variableChargeNote:"L\xf6nebesked-/utskicksavgifter (Kivra) \xe4r r\xf6rliga \u2014 ej inkluderat i golvj\xe4mf\xf6relsen.",licensePending:!1,elSuffix:!1},"forsakring-foretag":{label:"F\xf6retagsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},"forsakring-ansvar":{label:"Yrkesansvarsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"yrkesansvarsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},vaxel:{label:"Molnv\xe4xel",partnerLabel:"Kvalificerad Telekomleverant\xf6r",segment:2,unit:"licenser",unitSingular:"licens",inlineLabel:"molnv\xe4xel",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},bankavgifter:{label:"Bankavgifter & Betaltj\xe4nster",partnerLabel:"Kvalificerad Bankpartner",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"bankavgifter",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"avfall-atervinning":{label:"Avfall & \xc5tervinning",partnerLabel:"Kvalificerad Avfallsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"avfall och \xe5tervinning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert vi inh\xe4mtar fr\xe5n leverant\xf6rer.",variableChargeNote:null,licensePending:!1,elSuffix:!1},uncategorized:{label:"Okategoriserad",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}};function Hh(e){var t;return null!==(t=Kh[e])&&void 0!==t?t:{label:null!==e&&void 0!==e?e:"Ok\xe4nd kategori",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}}const Wh=[{key:"mjukvara",label:"Programvara & licenser",short:"Mjukvara",icon:"spark",mode:"verdict",hint:"Microsoft 365 \xb7 Adobe \xb7 Fortnox",know:"verifierat listpris",cats:["saas-productivity","saas-creative","saas-crm","saas-finance","saas-other","faktura-tjanst","managed-workplace"]},{key:"telefoni",label:"Telefoni & bredband",short:"Telefoni",icon:"phone",mode:"verdict",hint:"Mobil \xb7 v\xe4xel \xb7 bredband",know:"verifierat marknadspris",cats:["mobil","bredband","molnvaxel"]},{key:"lon",label:"L\xf6n & HR",short:"L\xf6n",icon:"fortnox",mode:"verdict",hint:"L\xf6nesystem \xb7 f\xf6retagsh\xe4lsa",know:"verifierat golv",cats:["loneadmin","foretagshalsovard","forsakring-foretag","forsakring-ansvar"]},{key:"el",label:"El",short:"El",icon:"bolt",mode:"verdict",hint:"F\xf6retagsel",know:"Nordpool-verifierat",cats:["el"]},{key:"itdrift",label:"IT-drift & hosting",short:"IT-drift",icon:"wifi",mode:"offert",hint:"Support \xb7 server \xb7 moln",know:null,cats:["it-support","serverhosting"]},{key:"skrivare",label:"Skrivare & print",short:"Skrivare",icon:"file",mode:"offert",hint:"Leasing \xb7 klickavtal",know:null,cats:["skrivarleasing","utrustningsleasing"]},{key:"fordon",label:"Fordon & frakt",short:"Fordon",icon:"truck",mode:"offert",hint:"Leasing \xb7 transport",know:null,cats:["leasing-bil","transport-frakt"]},{key:"ovrigt",label:"Kontor & \xf6vrigt",short:"Kontor",icon:"shield",mode:"offert",hint:"F\xf6rbrukning \xb7 larm \xb7 terminal",know:null,cats:["kontorsmaterial","st\xe4d-reng\xf6ring","larm-bevakning","kortterminal","avfall-atervinning","bankavgifter"]}];const qh=(e,t,r)=>"watch"===t?"dossier"===r?e.dossier.teal:e.color.brand:e.color.warning,Yh=vd.section`
  position: relative;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  border: 1px solid ${e=>{let{theme:t,$tone:r,$variant:n}=e;return qh(t,r,n)}};
  padding: 18px 20px;
  margin: ${e=>{let{$variant:t}=e;return"dossier"===t?"26px 0 4px":"0 0 20px"}};
  background: ${e=>{let{theme:t,$variant:r,$tone:n}=e;return"dossier"===r?t.dossier.bgRaised:((e,t)=>"watch"===t?e.color.brandSoft:e.color.warningSoft)(t,n)}};

  .fc-eyebrow {
    display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;
    text-transform: uppercase; color: ${e=>{let{theme:t,$tone:r,$variant:n}=e;return qh(t,r,n)}};
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?fd`font-family: ${t.font.mono}; font-size: 11px; letter-spacing: .22em;`:fd`font-size: 10px; font-weight: 800; letter-spacing: .1em;`}}
  }
  .fc-eyebrow::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: ${e=>{let{theme:t,$tone:r,$variant:n}=e;return qh(t,r,n)}}; }

  .fc-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
  .fc-title {
    line-height: 1.18;
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?fd`font-family: ${t.font.display}; font-weight: 600; font-size: clamp(20px, 3.4vw, 27px); color: ${t.dossier.inkOnDark};`:fd`font-weight: 700; font-size: 17px; color: ${t.color.ink};`}}
  }
  .fc-impact {
    flex-shrink: 0; font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-weight: 600; letter-spacing: -.02em;
    font-feature-settings: 'tnum'; color: ${e=>{let{theme:t,$tone:r,$variant:n}=e;return qh(t,r,n)}}; white-space: nowrap;
    font-size: ${e=>{let{$variant:t}=e;return"dossier"===t?"clamp(20px, 3.6vw, 26px)":"clamp(18px, 4vw, 24px)"}};
  }
  .fc-line {
    display: inline-block; font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 12.5px;
    border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}}; padding: 4px 9px; margin-bottom: 12px; word-break: break-word;
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?fd`color: ${t.dossier.mutedOnDark}; border: 1px solid ${t.dossier.hairlineOnDark};`:fd`color: ${t.color.inkSoft}; background: ${t.color.surface}; border: 1px solid ${t.color.border};`}}
  }
  .fc-text {
    margin: 0; line-height: 1.6;
    ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?fd`font-size: 14.5px; color: ${t.dossier.mutedOnDark};`:fd`font-size: 13.5px; color: ${t.color.inkSoft};`}}
    strong { color: ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.inkOnDark:t.color.ink}}; font-weight: 700; }
  }
  .fc-more {
    margin: 12px 0 0; padding-top: 10px; font-size: 12px;
    border-top: 1px solid ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.hairlineOnDark:t.color.border}};
    color: ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.mutedOnDark:t.color.muted}};
    strong { color: ${e=>{let{theme:t,$variant:r}=e;return"dossier"===r?t.dossier.inkOnDark:t.color.ink}}; font-weight: 700; }
  }
`;function Gh(e){let{finding:t,extraCount:r=0,variant:n="light",eyebrow:a}=e;if(!t||!t.title)return null;const i="watch"===t.tone?"watch":"leak",o=null!==a&&void 0!==a?a:"watch"===i?"Avtalsbevakning":"dossier"===n?"Fynd p\xe5 era fakturor":"Fynd p\xe5 er faktura",s=t.annualImpact>0;return(0,$d.jsxs)(Yh,{$variant:n,$tone:i,children:[(0,$d.jsx)("div",{className:"fc-eyebrow",children:o}),(0,$d.jsxs)("div",{className:"fc-row",children:[(0,$d.jsx)("div",{className:"fc-title",children:t.title}),s?(0,$d.jsxs)("div",{className:"fc-impact",children:[(l=t.annualImpact,new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(l))," kr/\xe5r"]}):t.metricText?(0,$d.jsx)("div",{className:"fc-impact",children:t.metricText}):null]}),t.lineDescription&&(0,$d.jsxs)("div",{className:"fc-line",children:["\u201d",t.lineDescription,"\u201d"]}),(0,$d.jsx)("p",{className:"fc-text",children:t.text}),r>0&&(0,$d.jsxs)("p",{className:"fc-more",children:[(0,$d.jsxs)("strong",{children:["+",r," fler fynd"]})," p\xe5 fakturan \u2014 vi g\xe5r igenom dem i er genomg\xe5ng."]})]});var l}const Qh=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Jh=jd`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`,Xh=jd`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
`,Zh=jd`
  to { transform: rotate(360deg); }
`,em=jd`
  0%   { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
`,tm=jd`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,.5); }
  60%       { box-shadow: 0 0 0 4px rgba(27,122,110,.0); }
`,rm=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  min-height: 100vh;
`,nm=vd.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 80px 28px 32px;
  text-align: center;
  animation: ${Qh} 0.6s ease both;
  @media (max-width: 740px) { padding: 48px 20px 20px; }
`,am=vd.span`
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
`,im=vd.h1`
  margin-top: 22px;
  font-size: clamp(38px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,om=vd.p`
  margin: 22px auto 0;
  max-width: 580px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,sm=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 16px 28px 64px;
  @media (max-width: 740px) { padding: 12px 20px 48px; }
`,lm=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  margin-bottom: 16px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
  animation: ${Qh} 0.5s ease both;
  @media (max-width: 600px) { padding: 22px 20px; }
`,cm=vd.div`
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
`,dm=vd.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 18px;
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`,um=vd.label`
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
`,pm=vd.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,hm=vd.div`
  animation: ${Jh} 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;
`,mm=(vd.div`
  margin: 20px 0 6px;
  animation: ${Qh} .4s ease both;

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
`),fm=vd.p`
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
`,gm=vd.div`
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.dangerSoft}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.danger}};
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  line-height: 1.5;
`,xm=vd.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${Zh} 0.7s linear infinite;
`,vm=vd.ol`
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
`,bm=vd.li`
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
    animation: ${e=>{let{$state:t}=e;return"active"===t?Xh:"none"}} 1.6s ease-in-out infinite;
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
`,ym=(vd.div`
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
`),km=vd.div`
  position: relative;
  overflow: hidden;
  padding: 24px 26px 22px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
  color: #FAFAF7;
  margin-bottom: 12px;
  box-shadow: 0 8px 32px rgba(27,110,102,.22), 0 2px 6px rgba(27,110,102,.14);
  animation: ${Qh} 0.5s ease both;

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
    animation: ${em} 3.6s ease-in-out 1.2s infinite;
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
`,jm=vd.div`
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
`,wm=vd.div`
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
`,Sm=vd.div`
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
`,$m=vd.p`
  margin-top: 10px;
  margin-bottom: ${e=>{let{$compact:t}=e;return t?"10px":"24px"}};
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  font-style: italic;
  text-align: center;
`,zm=(vd.div`
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
  animation: ${Qh} 0.5s ease 0.08s both;

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
`),_m=vd.div`
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
`,Nm=vd.form`
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
`,Em=vd.div`
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
`,Am=(vd.div`
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
`),Cm=vd.div`
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
`,Dm=vd.dl`
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
`,Fm=vd.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 8, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${Qh} 0.2s ease both;
`,Tm=vd.div`
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
`,Om=vd.div`
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
`,Pm=(vd.a`
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
`),Lm=vd.div`
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
    animation: ${Jh} 0.2s ease both;
  }
  p {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 14px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin: 0;
  }
`,Rm=vd.div`
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
`,Im=vd.div`
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
`,Mm=vd.div`
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
`,Bm=(vd.div`
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
`),Vm=(vd.div`
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
`),Um=vd.div`
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
`,Km=vd.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`,Hm=vd.div`
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
`,Wm=vd.div`
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
`,qm=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px 32px 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 24px rgba(14,26,23,.08), 0 1px 4px rgba(14,26,23,.04);
  animation: ${Qh} 0.5s ease 0.16s both;

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
    animation: ${tm} 2s ease-in-out infinite;
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
`,Ym=vd.div`
  margin-bottom: 12px;
  padding: 30px 32px 26px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  animation: ${Qh} 0.5s ease 0.24s both;

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
`;const Gm={"business-premium":"Business Premium","business-standard":"Business Standard","business-basic":"Business Basic",e3:"E3",e5:"E5"},Qm=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);const Jm=3145728;async function Xm(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}function Zm(e,t){if(!e||!t)return e;const r=t.split(/\s+/),n=[t];r[0].length>=4&&n.push(r[0]),r.length>=2&&n.push(`${r[0]} ${r[1]}`);let a=e;for(const i of[...new Set(n)])a=a.replace(new RegExp(i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),"en verifierad l\xe4gre leverant\xf6r");return a}const ef={ehandel:"E-handel & Detaljhandel",tillverkning:"Industri & Tillverkning","it-tech":"IT, Tech & Mjukvara",bygg:"Bygg, Hantverk & Fastighet",hotell:"Hotell, Restaurang & Event",konsult:"Konsult & F\xf6retagstj\xe4nster",transport:"Transport & Logistik",vard:"V\xe5rd, Omsorg & H\xe4lsa",ovrigt:"\xd6vrigt / Annan bransch"},tf=Wh,rf=[{id:"extract",label:"Arvo l\xe4ser & klassificerar fakturan",sublabel:"Tolkar varje rad och post"},{id:"categorize",label:"Identifierar leverant\xf6r & kategori",sublabel:"Matchar mot 200+ leverant\xf6rsprofiler"},{id:"recommend",label:"Ber\xe4knar besparing mot branschindex",sublabel:"J\xe4mf\xf6r med svenska branschdata"}],nf=e=>new Promise((t,r)=>{const n=new FileReader;n.onload=()=>{const e=String(n.result||""),r=e.includes(",")?e.split(",")[1]:e;t(r)},n.onerror=()=>r(new Error("Kunde inte l\xe4sa filen")),n.readAsDataURL(e)});function af(e){let{cc:t}=e;const[r,a]=n.useState(!1);return(0,$d.jsxs)(Im,{children:[(0,$d.jsxs)("div",{className:"chain-header",onClick:()=>a(e=>!e),role:"button",tabIndex:0,onKeyDown:e=>"Enter"===e.key&&a(e=>!e),children:[(0,$d.jsx)("span",{className:"chain-title",children:"Ber\xe4kningsunderlag"}),(0,$d.jsx)("span",{className:"chain-toggle",children:r?"D\xf6lj \u25b2":"Visa hur vi r\xe4knar \u25bc"})]}),r&&(0,$d.jsxs)("div",{className:"chain-body",children:[(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Nuvarande kostnad"}),(0,$d.jsx)("div",{className:"chain-source",children:t.currentAnnualCost.source})]}),(0,$d.jsxs)("span",{className:"chain-value",children:[Ih(t.currentAnnualCost.value)," kr/\xe5r"]})]}),t.benchmarkAnnualCost&&(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Arvo-pris"}),t.benchmarkAnnualCost.formula&&(0,$d.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.formula}),(0,$d.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.source})]}),(0,$d.jsxs)("span",{className:"chain-value",children:[Ih(t.benchmarkAnnualCost.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsx)("div",{className:"chain-label",children:"Bruttobesparing"}),(0,$d.jsxs)("span",{className:"chain-value",children:[Ih(t.grossSaving.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Arvos arvode"}),(0,$d.jsx)("div",{className:"chain-source",children:t.arvoFee.formula})]}),(0,$d.jsxs)("span",{className:"chain-value",children:["\u2212",Ih(t.arvoFee.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row total",children:[(0,$d.jsx)("span",{children:"Er nettobesparing"}),(0,$d.jsxs)("span",{className:"chain-value",children:["+",Ih(t.netSaving.value)," kr/\xe5r"]})]})]})]})}function of(e){let{seatCount:t,employees:r,overage:a,term:i,termSing:o}=e;const[s,l]=n.useState(!1);return(0,$d.jsxs)(Lm,{children:[(0,$d.jsxs)("button",{className:"lon-trigger",onClick:()=>l(e=>!e),"aria-expanded":s,children:[(0,$d.jsxs)("span",{className:"lon-head",children:[(0,$d.jsxs)("span",{className:"kicker",children:["Notering om ",i]}),(0,$d.jsxs)("span",{className:"lon-teaser",children:[a," av ",t," ",i," verkar oanv\xe4nda"]})]}),(0,$d.jsx)("span",{className:"lon-chevron"+(s?" open":""),children:(0,$d.jsx)(yu,{name:"chevron-right",size:15,stroke:2.5})})]}),s&&(0,$d.jsx)("div",{className:"lon-body",children:(0,$d.jsxs)("p",{children:["Kalkylen ovan bygger p\xe5 att vi beh\xe5ller era ",t," ",i,", men s\xe4nker styckpriset genom att flytta er till r\xe4tt avtalsniv\xe5. Vi noterar dock att ni enligt uppgift \xe4r ",r," anst\xe4llda. Om man dessutom hade st\xe4dat bort",1===a?` detta ${a} \xf6verfl\xf6diga ${o}`:` dessa ${a} \xf6verfl\xf6diga ${i}`,", hade er kostnad s\xe4nkts ytterligare."]})})]})}const sf=()=>{var e,t,r,a,i,o,s,l,c,d,u,p,h,m,f,g,x,v,b,y,k,j,w,S,$,z,_,N,E,A,C,D,F,T,O,P,L,R,I,M,B,V,U,K,H,W,q,Y,G,Q,J,X,Z,ee,te,re,ne,ae,ie,oe,se,le,ce,de,ue,pe,he,me,fe,ge,xe,ve,be,ye,ke,je,we,Se,$e,ze,_e,Ne,Ee,Ae,Ce,De,Fe,Te,Oe,Pe,Le,Re,Ie,Me,Be,Ve,Ue,Ke,He,We,qe,Ye,Ge,Qe,Je,Xe,Ze,et,tt,rt,nt,at,it,ot,st,lt,ct,dt,ut,pt,ht,mt,ft,gt,xt,vt,bt,yt,kt,jt,wt,St,$t,zt,_t,Nt,Et,At,Ct,Dt,Ft,Tt,Ot;const Pt=(0,n.useRef)(null),Lt=(0,n.useRef)(null),{email:Rt}=Cd(),[It,Mt]=(0,n.useState)(null),[Bt,Vt]=(0,n.useState)("konsult"),[Ut,Kt]=(0,n.useState)(5),[Ht,Wt]=(0,n.useState)(""),[qt,Yt]=(0,n.useState)(null),[Gt,Qt]=(0,n.useState)(null),[Jt,Xt]=(0,n.useState)(null),[Zt,er]=(0,n.useState)(null),[tr,rr]=(0,n.useState)(""),[nr,ar]=(0,n.useState)("idle"),[ir,or]=(0,n.useState)(!1),[sr,lr]=(0,n.useState)(""),[cr,dr]=(0,n.useState)("idle"),[ur,pr]=(0,n.useState)(!1),[hr,mr]=(0,n.useState)(""),[fr,gr]=(0,n.useState)("idle"),[xr,vr]=(0,n.useState)(null),[br,yr]=(0,n.useState)(!1),[kr,jr]=(0,n.useState)(!1),[wr,Sr]=(0,n.useState)("quota"),[$r,zr]=(0,n.useState)(""),[_r,Nr]=(0,n.useState)(!1),[Er,Ar]=(0,n.useState)(""),[Cr,Dr]=(0,n.useState)(""),[Fr,Tr]=(0,n.useState)(""),[Or,Pr]=(0,n.useState)(!1),[Lr,Rr]=(0,n.useState)("idle"),[Ir,Mr]=(0,n.useState)(!1),[Br,Vr]=(0,n.useState)(""),[Ur,Kr]=(0,n.useState)("idle"),[Hr,Wr]=(0,n.useState)(""),[qr,Yr]=(0,n.useState)("idle"),[Gr,Qr]=(0,n.useState)(null),[Jr,Xr]=(0,n.useState)("idle"),[Zr,en]=(0,n.useState)(!1),[tn,rn]=(0,n.useState)(!1),[nn,an]=(0,n.useState)(""),[on,sn]=(0,n.useState)("idle"),[ln,cn]=(0,n.useState)(null),[dn,un]=(0,n.useState)(null),[pn,hn]=(0,n.useState)(""),[mn,fn]=(0,n.useState)("idle"),[gn,xn]=(0,n.useState)([]),[vn,bn]=(0,n.useState)(null),[yn,kn]=(0,n.useState)([]),[jn,wn]=(0,n.useState)(null),[Sn,$n]=(0,n.useState)(!1),zn=gn.length>1;n.useEffect(()=>{var e,t,r;const n=new URLSearchParams(window.location.search),a=n.get("bypass");a&&(sessionStorage.setItem("arvo_bypass",a),window.history.replaceState({},"",window.location.pathname));const i=n.get("magic");i&&(window.history.replaceState({},"",window.location.pathname),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:i})}).then(e=>e.json()).then(e=>{e.ok&&e.bypass&&sessionStorage.setItem("arvo_bypass",e.bypass)}).catch(()=>{})),fetch("/api/token",{method:"POST"}).then(e=>e.json()).then(e=>{var t;return vr(null!==(t=e.token)&&void 0!==t?t:null)}).catch(()=>{});const o=n.get("intelligence_connected"),s=n.get("oauth_pending"),l=n.get("oauth_error"),c=null!==(e=null!==(t=null!==(r=n.get("provider"))&&void 0!==r?r:o)&&void 0!==t?t:s)&&void 0!==e?e:"gmail";if(o||s||l){var d,u;const e=parseInt(null!==(d=n.get("invoices"))&&void 0!==d?d:"0",10)||0,t=null!==(u=n.get("email"))&&void 0!==u?u:"";o?cn({type:"connected",provider:o,invoices:e,email:t}):s?cn({type:"pending",provider:s}):l&&cn({type:"error",provider:c,errorCode:l}),window.history.replaceState({},"",window.location.pathname)}},[]),n.useEffect(()=>{var e,t;if(!Jt||!Lt.current)return;const r=null!==(e=null===(t=document.querySelector("header"))||void 0===t?void 0:t.offsetHeight)&&void 0!==e?e:64,n=Lt.current.getBoundingClientRect().top+window.pageYOffset-r-8;window.scrollTo({top:n,behavior:"smooth"})},[Jt]);const _n=e=>{Qt(null),e&&("application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")?e.size>Jm?Qt(`PDF \xe4r f\xf6r stor (${(e.size/1024/1024).toFixed(1)} MB). Max: 3 MB.`):Mt(e):Qt("Endast PDF-filer st\xf6ds."))},Nn=e=>{Qt(null),wn(null);const t=Array.from(e).filter(e=>"application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")),r=t.filter(e=>e.size>Jm);r.length>0&&Qt(`${r.length} fil(er) \xe4r f\xf6r stora (max 3 MB per faktura).`);const n=t.filter(e=>e.size<=Jm);1===n.length?(Mt(n[0]),xn([])):n.length>1?(xn(n),Mt(null),Xt(null)):e.length>0&&Qt("Endast PDF-filer st\xf6ds.")},En=async e=>{const t=await fetch("/api/send-analysis",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:Jt})});if(!t.ok)throw new Error("send-analysis "+t.status)},An=async e=>{const t=await fetch("/api/send-confirmation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:Jt})});if(!t.ok)throw new Error("send-confirmation "+t.status)},Cn=async e=>{var t;null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e);const r=(hr||$r||"").trim();if(r&&"idle"===fr){gr("submitting");try{await Promise.all([An(r),En(r)]),gr("sent")}catch{gr("idle")}}},Dn=async e=>{var t;e.preventDefault();const r=null===Jt||void 0===Jt||null===(t=Jt.recommendation)||void 0===t?void 0:t.shelfware;if(r&&"submitting"!==mn){fn("submitting");try{var n;const e=await fetch("/api/recompute-shelfware",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({seatCount:r.paidSeats,pricePerSeatMonthly:r.perSeatMonthly,employees:r.employees,knownExceptions:""===pn?0:Number(pn)})});if(!e.ok)throw new Error("recompute failed");const t=await e.json();un(null!==(n=t.shelfware)&&void 0!==n?n:{cleared:!0}),fn("done")}catch{fn("error")}}},Fn=qt&&"done"!==qt,Tn="optimize"===(null===Jt||void 0===Jt||null===(e=Jt.recommendation)||void 0===e?void 0:e.recommendationType)&&(null!==(t=null===Jt||void 0===Jt||null===(r=Jt.recommendation)||void 0===r?void 0:r.optimizationSaving)&&void 0!==t?t:0)>0,On=null!==(a=null===Jt||void 0===Jt||null===(i=Jt.recommendation)||void 0===i?void 0:i.optimizationSaving)&&void 0!==a?a:0,Pn=Tn?Math.round(.2*On):0,Ln=Tn?On-Pn:0,Rn=function(e){if(!Array.isArray(e))return[];const t=/[Mm]\xe5nad\s+(\d+)\s+av\s+(\d+)|[Mm]onth\s+(\d+)\s+of\s+(\d+)/;return e.flatMap(e=>{var r,n,a,i,o,s;if("hardware"!==e.type&&!(null===(r=e.description)||void 0===r?void 0:r.toLowerCase().includes("delbetalning")))return[];const l=t.exec(null!==(n=e.description)&&void 0!==n?n:"");if(!l)return[];const c=parseInt(null!==(a=l[1])&&void 0!==a?a:l[3]),d=parseInt(null!==(i=l[2])&&void 0!==i?i:l[4]);return isNaN(c)||isNaN(d)||d<=c?[]:[{description:e.description,monthlyCost:null!==(o=e.amount)&&void 0!==o?o:0,monthsRemaining:d-c,remainingCost:(d-c)*(null!==(s=e.amount)&&void 0!==s?s:0)}]})}(null!==(o=null===Jt||void 0===Jt||null===(s=Jt.extracted)||void 0===s?void 0:s.lineItems)&&void 0!==o?o:[]),In=Rn.reduce((e,t)=>e+12*t.monthlyCost,0),Mn=Rn.reduce((e,t)=>e+t.remainingCost,0),Bn=In>0&&(null===Jt||void 0===Jt||null===(l=Jt.recommendation)||void 0===l?void 0:l.shouldSwitch),Vn=Bn?Math.max(0,(null!==(c=null===Jt||void 0===Jt||null===(d=Jt.extracted)||void 0===d?void 0:d.annualCost)&&void 0!==c?c:0)-In):null!==(u=null===Jt||void 0===Jt||null===(p=Jt.extracted)||void 0===p?void 0:p.annualCost)&&void 0!==u?u:0,Un=Bn?Math.max(0,Vn-(null!==(h=null===Jt||void 0===Jt||null===(m=Jt.recommendation)||void 0===m?void 0:m.suggestedAnnualCost)&&void 0!==h?h:0)):null!==(f=null===Jt||void 0===Jt||null===(g=Jt.recommendation)||void 0===g?void 0:g.grossSaving)&&void 0!==f?f:0,Kn=Math.round(.2*Un),Hn=Un-Kn,Wn=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1600;const[r,a]=n.useState(0);return n.useEffect(()=>{if(!e)return void a(0);const r=performance.now();let n;const i=o=>{const s=Math.min((o-r)/t,1),l=1-Math.pow(1-s,3);a(Math.round(e*l)),s<1?n=requestAnimationFrame(i):a(e)};return n=requestAnimationFrame(i),()=>{n&&cancelAnimationFrame(n)}},[e,t]),r}(Bn?Hn:null!==(x=null===Jt||void 0===Jt||null===(v=Jt.recommendation)||void 0===v?void 0:v.netSaving)&&void 0!==x?x:0),qn=Vn,Yn=null!==(b=null===Jt||void 0===Jt||null===(y=Jt.recommendation)||void 0===y?void 0:y.suggestedAnnualCost)&&void 0!==b?b:0,Gn=qn>0&&Yn>0&&Yn<qn?Math.round((qn-Yn)/qn*100):0,Qn=qn>0&&Yn>0&&Yn<qn?Math.round((qn-Yn)/Yn*100):0,Jn=null!==(k=null===Jt||void 0===Jt||null===(j=Jt.recommendation)||void 0===j||null===(w=j.clickRateAnalysis)||void 0===w?void 0:w.priceGapScore)&&void 0!==k?k:null,Xn=null!==Jn&&void 0!==Jn?Jn:Math.max(5,Math.round(100-1.5*Gn)),Zn=null!=Jn?Jn:null!==Jt&&void 0!==Jt&&null!==(S=Jt.recommendation)&&void 0!==S&&S.shouldSwitch?(null!==($=null===Jt||void 0===Jt||null===(z=Jt.recommendation)||void 0===z?void 0:z.netSaving)&&void 0!==$?$:0)>0?Math.min(Xn,79):Xn:Math.min(Xn,85),ea=Zn<45?{dot:"#DC2626",num:"#DC2626",label:"Kritisk",labelClr:"#991B1B",txt:"#7F1D1D",bg:"#FEF2F2",border:"rgba(220,38,38,.18)"}:Zn<65?{dot:"#D97706",num:"#D97706",label:"Suboptimerat",labelClr:"#92400E",txt:"#78350F",bg:"#FFFBEB",border:"rgba(217,119,6,.18)"}:Zn<80?{dot:"#65A30D",num:"#65A30D",label:"F\xf6rb\xe4ttringsl\xe4ge",labelClr:"#365314",txt:"#365314",bg:"#F7FEE7",border:"rgba(101,163,13,.18)"}:{dot:"#1B7A6E",num:"#1B7A6E",label:"Optimalt",labelClr:"#0E4F47",txt:"#0E4F47",bg:"#DCEEEA",border:"rgba(27,122,110,.18)"},ta=(null===Jt||void 0===Jt?void 0:Jt.monitoringDate)&&new Date(Jt.monitoringDate)<new Date,ra=null!==Jt&&void 0!==Jt&&Jt.servicePeriodEnd?Math.ceil((new Date(Jt.servicePeriodEnd)-new Date)/864e5):null,na=null!==(_=null===Jt||void 0===Jt||null===(N=Jt.recommendation)||void 0===N?void 0:N.secondarySaving)&&void 0!==_?_:null,aa=na?(null!==(E=null===Jt||void 0===Jt||null===(A=Jt.recommendation)||void 0===A?void 0:A.grossSaving)&&void 0!==E?E:0)-na.grossSaving:null,ia=na?"bredband"===na.category?"Bredband"+(na.speedMbit?` ${na.speedMbit} Mbit`:""):"Mobil"+(na.seatCount?` (${na.seatCount} st)`:""):null,oa=!(null===Jt||void 0===Jt||null===(C=Jt.recommendation)||void 0===C||!C.shouldSwitch||null!==Jt&&void 0!==Jt&&null!==(D=Jt.recommendation)&&void 0!==D&&D.suggestedSupplier||null==na),sa=Hh(oa?na.category:null!==(F=null===Jt||void 0===Jt||null===(T=Jt.categorized)||void 0===T?void 0:T.category)&&void 0!==F?F:"uncategorized"),la=Gn>=15?null!==(O=sa.smfBenchmark)&&void 0!==O?O:"ett l\xe4gre verifierat marknadspris finns att h\xe4mta":"samma avtal kostar mindre till leverant\xf6rens publika \xe5rsavtalspris",ca=oa?`Ert ${Hh(null!==(P=null===Jt||void 0===Jt||null===(L=Jt.categorized)||void 0===L?void 0:L.category)&&void 0!==P?P:"uncategorized").label.toLowerCase()} \xe4r konkurrenskraftigt \u2014 ${null!==ia&&void 0!==ia?ia:"sekund\xe4rtj\xe4nsten"} kan optimeras.`:"monitoring"===(null===Jt||void 0===Jt?void 0:Jt.route)?ta?`Avtalsl\xe5set lossnar snart${null!=ra?` \u2014 ${ra} dagar kvar`:""}. Arvo f\xf6rbereder bytet inf\xf6r f\xf6rnyelsen.`:Zn>=80?"Ni betalar marknadsm\xe4ssigt i dag \u2014 Arvo bevakar och agerar inf\xf6r f\xf6rnyelsen.":`Ni betalar ${Qn}% \xf6ver verifierat marknadspris \u2014 ett l\xe4gre pris finns att s\xe4kra inf\xf6r f\xf6rnyelsen.`:Zn<45?Qn>0?`Ni betalar ${Qn}% \xf6ver marknadspris \u2014 ${Gn>=15?null!==(R=sa.smfBenchmark)&&void 0!==R?R:"stor besparingspotential":la}.`:"Ni betalar markant s\xe4mre \xe4n branschsnittet \u2014 stor besparingspotential.":Zn<80?Qn>0?`Ni betalar ${Qn}% \xf6ver marknadspris \u2014 ${la}.`:"Ni betalar n\xe5got s\xe4mre \xe4n branschsnittet \u2014 ett l\xe4gre verifierat marknadspris finns att h\xe4mta.":"Ni har ett marknadsm\xe4ssigt avtal \u2014 b\xe4ttre \xe4n branschsnittet.",da=2*Math.PI*26,ua=Zn/100*da,{score:pa,gaugeReady:ha}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;const[r,a]=n.useState(!1),[i,o]=n.useState(0);return n.useEffect(()=>{if(a(!1),o(0),!e)return;const r=setTimeout(()=>{a(!0);const t=performance.now();let r;const n=a=>{const i=Math.min((a-t)/1450,1),s=1-Math.pow(1-i,3);o(Math.round(e*s)),i<1?r=requestAnimationFrame(n):o(e)};return r=requestAnimationFrame(n),()=>{r&&cancelAnimationFrame(r)}},t);return()=>clearTimeout(r)},[e,t]),{score:i,gaugeReady:r}}(Zn,400),ma=sa.isRealPrice,fa=!(null===Jt||void 0===Jt||null===(I=Jt.categorized)||void 0===I||!I.licensePending),ga=sa.partnerLabel,xa=(null!==(M=null===Jt||void 0===Jt||null===(B=Jt.recommendation)||void 0===B?void 0:B.suggestedSupplier)&&void 0!==M?M:"").toLowerCase().trim(),va=(null!==(V=null!==(U=null===Jt||void 0===Jt||null===(K=Jt.categorized)||void 0===K?void 0:K.normalizedSupplier)&&void 0!==U?U:null===Jt||void 0===Jt||null===(H=Jt.extracted)||void 0===H?void 0:H.supplier)&&void 0!==V?V:"").toLowerCase().trim(),ba=ma&&xa&&va&&(xa===va||xa.includes(va)||va.includes(xa)),ya=ba?`S\xe4nk er ${null===Jt||void 0===Jt||null===(W=Jt.recommendation)||void 0===W?void 0:W.suggestedSupplier}-kostnad`:ma?"Aktivera bytet":"S\xe4kra besparingen",ka=!!("auto"===(null===Jt||void 0===Jt?void 0:Jt.route)&&null!==Jt&&void 0!==Jt&&null!==(q=Jt.recommendation)&&void 0!==q&&q.suggestedAnnualCost&&!fa&&Hn>0);"auto"!==(null===Jt||void 0===Jt?void 0:Jt.route)||null===Jt||void 0===Jt||null===(Y=Jt.recommendation)||void 0===Y||Y.isOptimize;return(0,$d.jsxs)(rm,{children:[(0,$d.jsx)(uu,{variant:"public"}),ln&&(0,$d.jsxs)("div",{style:{background:"connected"===ln.type?"#F0FDF9":"pending"===ln.type?"#FFFBEB":"#FEF2F2",borderBottom:"1px solid "+("connected"===ln.type?"#6EE7D1":"pending"===ln.type?"#FCD34D":"#FECACA"),padding:"13px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[(0,$d.jsxs)("span",{style:{fontSize:14,color:"connected"===ln.type?"#065F46":"pending"===ln.type?"#92400E":"#991B1B",fontWeight:600,lineHeight:1.5},children:["connected"===ln.type&&(0,$d.jsxs)($d.Fragment,{children:["gmail"===ln.provider?"Gmail":"Outlook"," kopplat \u2014"," ",ln.invoices>0?`Arvo hittade ${ln.invoices} fakturor i er inkorg \u2014 analysera er f\xf6rsta nedan, det tar 2 minuter.`:"Inkorgen \xe4r kopplad. Analysera er f\xf6rsta faktura nedan \u2014 det tar 2 minuter."]}),"pending"===ln.type&&(0,$d.jsxs)($d.Fragment,{children:["gmail"===ln.provider?"Gmail":"Outlook","-anslutning kr\xe4ver konfiguration \u2014"," ","er aktivering \xe4r mottagen och Arvo kontaktar er inom kort."]}),"error"===ln.type&&(0,$d.jsxs)($d.Fragment,{children:["Anslutning misslyckades (",ln.errorCode,") \u2014 f\xf6rs\xf6k igen eller kontakta hej@arvoflow.se."]})]}),(0,$d.jsx)("button",{onClick:()=>cn(null),style:{background:"none",border:"none",cursor:"pointer",fontSize:18,lineHeight:1,opacity:.5,padding:"0 4px"},"aria-label":"St\xe4ng",children:"\xd7"})]}),(0,$d.jsxs)(nm,{children:[(0,$d.jsxs)(am,{children:[(0,$d.jsx)("span",{className:"dot"})," Arvo Intelligence \xb7 Analys p\xe5 60 sekunder"]}),(0,$d.jsxs)(im,{children:["Ni betalar f\xf6r mycket. ",(0,$d.jsx)("em",{children:"En"})," faktura bevisar det."]}),(0,$d.jsx)(om,{children:"Arvo Intelligence j\xe4mf\xf6r er faktura mot verkliga branschpriser och visar exakt vad ni betalar f\xf6r mycket \u2014 och hos vem ni kan spara."})]}),(0,$d.jsxs)(sm,{children:[!Jt&&(0,$d.jsx)(lm,{children:(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),await async function(){var e,t;let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!It)return void Qt("V\xe4lj en PDF-faktura f\xf6rst.");const n=!!(null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:localStorage.getItem("arvo_gate_passed"));if(!r&&!n){var a;const e=localStorage.getItem("arvo_had_saving"),t=parseInt(null!==(a=localStorage.getItem("arvo_successful_count"))&&void 0!==a?a:"0");if(e||t>=2)return Sr("quota"),void yr(!0)}let i,o;r&&localStorage.setItem("arvo_gate_passed","1"),Qt(null),Xt(null),yr(!1),Qr(null),Xr("idle"),Yt("uploading");try{var s,l,c,d;const e=await nf(It),t=await Xm(),n=null!==(s=null!==(l=null!==(c=sessionStorage.getItem("arvo_bypass"))&&void 0!==c?c:localStorage.getItem("arvo_bypass"))&&void 0!==l?l:localStorage.getItem("arvo_gate_passed"))&&void 0!==s?s:void 0;let a=xr;try{var u;const e=await fetch("/api/token",{method:"POST"});a=null!==(u=(await e.json()).token)&&void 0!==u?u:xr,vr(a)}catch{}Yt("extract"),i=setTimeout(()=>Yt("categorize"),6e3),o=setTimeout(()=>Yt("recommend"),14e3);const g=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:Bt,employees:Number(Ut),revenue:""===Ht?null:Number(Ht),token:a,fingerprint:t,bypass:n||void 0,email:r||void 0,userEmail:Rt||void 0})});clearTimeout(i),clearTimeout(o);const x=await g.json().catch(()=>({}));if(x.gate&&"saving_limit"===x.gateType)return Yt("done"),Xt(x),Sr("saving_limit"),void yr(!0);if(x.gate)return Yt(null),void yr(!0);if(x.timeout)return Yt(null),void Qt("Analysen tog lite f\xf6r l\xe5ng tid just nu. V\xe4nta ett \xf6gonblick och f\xf6rs\xf6k igen \u2014 det brukar g\xe5 snabbare vid andra f\xf6rs\xf6ket.");if(429===g.status||x.rateLimited)return Yt(null),void Qt("Du har analyserat f\xf6r m\xe5nga fakturor idag (max 5/dag). Kontakta oss p\xe5 hej@arvoflow.se f\xf6r att ut\xf6ka din kvot.");if(!g.ok||!x.ok)throw new Error(x.error||`Servern returnerade ${g.status}`);if(Yt("done"),Xt(x),er(null!==(d=x.analysisId)&&void 0!==d?d:null),rr(""),ar("idle"),"auto"===x.route){var p,h;const e=parseInt(null!==(p=localStorage.getItem("arvo_successful_count"))&&void 0!==p?p:"0")+1;var m,f;if(localStorage.setItem("arvo_successful_count",String(e)),(null===(h=x.recommendation)||void 0===h?void 0:h.netSaving)>0)localStorage.setItem("arvo_had_saving","1"),(null!==(m=null!==(f=sessionStorage.getItem("arvo_bypass"))&&void 0!==f?f:localStorage.getItem("arvo_bypass"))&&void 0!==m?m:localStorage.getItem("arvo_gate_passed"))||(Sr("saving"),yr(!0))}}catch(g){clearTimeout(i),clearTimeout(o),Yt(null),Qt(g.message||"N\xe5got gick fel. F\xf6rs\xf6k igen.")}}()},children:[(0,$d.jsxs)(cm,{$active:ir,$hasFile:!!It||zn,onClick:()=>{var e;return null===(e=Pt.current)||void 0===e?void 0:e.click()},onDrop:e=>{e.preventDefault(),or(!1);const t=e.dataTransfer.files;(null===t||void 0===t?void 0:t.length)>1?Nn(t):null!==t&&void 0!==t&&t[0]&&_n(t[0])},onDragOver:e=>{e.preventDefault(),or(!0)},onDragLeave:e=>{e.preventDefault(),or(!1)},role:"button",tabIndex:0,onKeyDown:e=>{var t;"Enter"!==e.key&&" "!==e.key||null===(t=Pt.current)||void 0===t||t.click()},children:[(0,$d.jsx)("input",{ref:Pt,type:"file",accept:"application/pdf,.pdf",multiple:!0,onChange:e=>{const t=e.target.files;(null===t||void 0===t?void 0:t.length)>1?Nn(t):null!==t&&void 0!==t&&t[0]&&_n(t[0])}}),(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(yu,{name:It||zn?"check":"upload",size:28,stroke:1.75})}),zn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{className:"primary",children:[gn.length," fakturor valda"]}),(0,$d.jsxs)("span",{className:"secondary",children:[gn.map(e=>e.name).join(", ").slice(0,80),gn.map(e=>e.name).join(", ").length>80?"\u2026":""]})]}):It?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{className:"primary",children:"Faktura vald"}),(0,$d.jsxs)("span",{className:"filename",children:[It.name," \xb7 ",(It.size/1024).toFixed(0)," kB"]})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{className:"primary",children:"undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"L\xe4gg till er faktura":"Dra hit er faktura"}),(0,$d.jsxs)("span",{className:"cta-pill",children:["undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"V\xe4lj faktura":"V\xe4lj fil"," \u2192"]}),(0,$d.jsx)("span",{className:"secondary",children:"PDF \xb7 max 3 MB \xb7 Vi sparar inte filen"})]})]}),(It||zn)&&(0,$d.jsxs)(hm,{children:[(0,$d.jsxs)(dm,{children:[(0,$d.jsxs)(um,{children:[(0,$d.jsx)("span",{className:"label",children:"Bransch"}),(0,$d.jsx)("span",{className:"hint",children:"Vi j\xe4mf\xf6r mot bolag av er storlek i samma bransch."}),(0,$d.jsx)("select",{value:Bt,onChange:e=>Vt(e.target.value),children:Object.entries(ef).map(e=>{let[t,r]=e;return(0,$d.jsx)("option",{value:t,children:r},t)})})]}),(0,$d.jsxs)(um,{children:[(0,$d.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$d.jsx)("span",{className:"hint",children:"Prisniv\xe5n varierar med bolagets storlek."}),(0,$d.jsx)("input",{type:"number",min:"1",max:"5000",value:Ut,onChange:e=>Kt(e.target.value)})]})]}),Gt&&(0,$d.jsx)(gm,{children:Gt}),(0,$d.jsx)(pm,{children:zn?(0,$d.jsx)(Md,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:Sn,onClick:async()=>{var e,t;if(gn.length<2)return;wn(null),bn({status:"processing",total:gn.length,done:0,failed:0}),kn(gn.map((e,t)=>({index:t,filename:e.name,status:"pending"}))),$n(!0);let r=xr;try{var n;const e=await fetch("/api/token",{method:"POST"});r=null!==(n=(await e.json()).token)&&void 0!==n?n:xr,vr(r)}catch{}const a=null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:void 0;let i=0,o=0;for(let c=0;c<gn.length;c++){kn(e=>e.map((e,t)=>t===c?{...e,status:"extracting"}:e));try{var s;const e=await nf(gn[c]),t=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:Bt,employees:parseInt(Ut,10)||5,token:null!==(s=r)&&void 0!==s?s:"dev",bypass:a})}),n=await t.json();n.route?(i++,kn(e=>e.map((e,t)=>t===c?{...e,status:"done",route:n.route,extracted:n.extracted,categorized:n.categorized,recommendation:n.recommendation}:e))):(o++,kn(e=>e.map((e,t)=>{var r;return t===c?{...e,status:"failed",error:null!==(r=n.error)&&void 0!==r?r:"Analys misslyckades"}:e})))}catch(l){o++,kn(e=>e.map((e,t)=>t===c?{...e,status:"failed",error:l.message}:e))}bn({status:c===gn.length-1?"done":"processing",total:gn.length,done:i,failed:o})}$n(!1)},children:Sn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(xm,{})," Analyserar ",gn.length," fakturor\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Analysera ",gn.length," fakturor ",(0,$d.jsx)(yu,{name:"arrow",size:18})]})}):(0,$d.jsx)(Md,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:Fn||!It,children:Fn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(xm,{})," Analyserar\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Analysera fakturan ",(0,$d.jsx)(yu,{name:"arrow",size:18})]})})})]}),Fn&&(0,$d.jsx)(vm,{children:rf.map(e=>{const t=(e=>{if(!qt)return"pending";if("done"===qt)return"done";const t=["uploading","extract","categorize","recommend"],r=t.indexOf(qt),n=t.indexOf(e);return n<r?"done":n===r?"active":"pending"})(e.id);return(0,$d.jsxs)(bm,{$state:t,children:[(0,$d.jsx)("div",{className:"bullet",children:"done"===t?(0,$d.jsx)(yu,{name:"check",size:14,stroke:2.5}):(0,$d.jsx)("span",{children:rf.findIndex(t=>t.id===e.id)+1})}),(0,$d.jsxs)("div",{className:"label",children:[e.label,"active"===t&&e.sublabel&&(0,$d.jsx)("div",{style:{fontSize:11,opacity:.6,marginTop:2,fontWeight:400},children:e.sublabel})]}),(0,$d.jsx)("div",{className:"time",children:"done"===t?"\u2713":"active"===t?"\u2026":""})]},e.id)})}),(0,$d.jsxs)(fm,{children:["Genom att forts\xe4tta godk\xe4nner du v\xe5ra ",(0,$d.jsx)(vs,{to:"/villkor",children:"villkor"})," ","och v\xe5r ",(0,$d.jsx)(vs,{to:"/integritet",children:"integritetspolicy"}),". Fakturan analyseras av Arvo Intelligence och raderas omedelbart efter analysen."]})]})}),zn&&(vn||jn)&&(0,$d.jsxs)(lm,{style:{marginTop:20},children:[(0,$d.jsx)(Vm,{children:(0,$d.jsxs)("div",{children:[(0,$d.jsxs)("span",{className:"badge",children:[(0,$d.jsx)(yu,{name:"spark",size:10})," Batch-analys"]}),(0,$d.jsx)("h3",{children:"done"===(null===vn||void 0===vn?void 0:vn.status)?"Analys klar":"failed"===(null===vn||void 0===vn?void 0:vn.status)?"Analys misslyckades":"Analyserar fakturor\u2026"}),(0,$d.jsx)("div",{className:"sub",children:vn?`${null!==(G=vn.done)&&void 0!==G?G:0} av ${vn.total} klara${vn.failed?` \xb7 ${vn.failed} misslyckades`:""}`:jn||`${gn.length} fakturor k\xf6ade`})]})}),vn&&(0,$d.jsx)(Um,{$pct:vn.total>0?Math.round(((null!==(Q=vn.done)&&void 0!==Q?Q:0)+(null!==(J=vn.failed)&&void 0!==J?J:0))/vn.total*100):0,children:(0,$d.jsx)("div",{className:"fill"})}),jn&&(0,$d.jsx)(gm,{style:{marginBottom:16},children:jn}),"done"===(null===vn||void 0===vn?void 0:vn.status)&&(()=>{const e=yn.filter(e=>{var t;return null===e||void 0===e||null===(t=e.recommendation)||void 0===t?void 0:t.shouldSwitch}),t=e.reduce((e,t)=>{var r,n;return e+(null!==(r=null===(n=t.recommendation)||void 0===n?void 0:n.netSaving)&&void 0!==r?r:0)},0),r=yn.filter(e=>"review_queue"===(null===e||void 0===e?void 0:e.route)).length;return(0,$d.jsxs)(Wm,{children:[(0,$d.jsxs)("div",{className:"stat highlight",children:[(0,$d.jsxs)("div",{className:"value",children:[Ih(Math.round(t/1e3)),"k"]}),(0,$d.jsx)("div",{className:"label",children:"Nettobesparing/\xe5r"})]}),(0,$d.jsxs)("div",{className:"stat",children:[(0,$d.jsx)("div",{className:"value",children:e.length}),(0,$d.jsx)("div",{className:"label",children:"Rekommenderar byte"})]}),(0,$d.jsxs)("div",{className:"stat",children:[(0,$d.jsx)("div",{className:"value",children:r}),(0,$d.jsx)("div",{className:"label",children:"Kr\xe4ver granskning"})]})]})})(),(0,$d.jsx)(Km,{children:(yn.length>0?yn:gn.map((e,t)=>({index:t,filename:e.name,status:"pending"}))).map((e,t)=>{var r,n,a,i,o,s,l;const c=null!==(r=null===e||void 0===e?void 0:e.status)&&void 0!==r?r:"pending",d=null!==(n=null===e||void 0===e||null===(a=e.recommendation)||void 0===a?void 0:a.netSaving)&&void 0!==n?n:null,u="done"===c?"check":"failed"===c?"x":"processing"===c?"spark":"file",p="done"===c?"review_queue"===e.route?"Kr\xe4ver granskning":"unsupported"===e.route?"Utanf\xf6r scope":"Klar":"failed"===c?"Misslyckades":"processing"===c?"Kategoriserar\u2026":"extracting"===c?"L\xe4ser faktura\u2026":"V\xe4ntar\u2026";return(0,$d.jsxs)(Hm,{$status:c,children:[(0,$d.jsx)("div",{className:"icon-wrap",children:(0,$d.jsx)(yu,{name:u,size:14,stroke:2})}),(0,$d.jsx)("span",{className:"name",children:null!==(o=null!==(s=null===e||void 0===e?void 0:e.filename)&&void 0!==s?s:null===(l=gn[t])||void 0===l?void 0:l.name)&&void 0!==o?o:`Faktura ${t+1}`}),(0,$d.jsx)("span",{className:"status-label",children:p}),d>0&&(0,$d.jsxs)("span",{className:"saving",children:["\u2212",Ih(d)," kr/\xe5r"]})]},null!==(i=null===e||void 0===e?void 0:e.index)&&void 0!==i?i:t)})}),"done"!==(null===vn||void 0===vn?void 0:vn.status)&&"failed"!==(null===vn||void 0===vn?void 0:vn.status)&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#888",textAlign:"center",margin:0},children:"Arvo analyserar fakturorna i bakgrunden. Uppdateras var 5:e sekund."})]}),Jt&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(lm,{ref:Lt,children:[(0,$d.jsxs)(ym,{children:[(0,$d.jsxs)("div",{className:"bh-top",children:[(0,$d.jsxs)("span",{className:"bh-stamp",children:["Arvo-analys \xb7 ",(new Date).toLocaleDateString("sv-SE",{day:"numeric",month:"short",year:"numeric"}).toUpperCase()]}),(0,$d.jsx)("button",{className:"bh-dl",onClick:()=>Mr(!0),title:"Ladda ner analys",children:(0,$d.jsx)("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",children:(0,$d.jsx)("path",{d:"M12 5v14M5 12l7 7 7-7"})})})]}),(0,$d.jsx)("div",{className:"bh-main",children:(0,$d.jsx)("h2",{className:"bh-supplier",children:Jt.extracted.supplier})}),(0,$d.jsx)("div",{className:"bh-row",children:Jt.categorized&&(0,$d.jsxs)("span",{className:"bh-chip",children:["natavgift"===Jt.reason?"N\xe4tavgift":null!=na?`${Hh(Jt.categorized.category).label} & ${ia}`:Hh(Jt.categorized.category).label||Jt.categorized.category,Jt.categorized.subType&&"natavgift"!==Jt.reason&&null==na?` \xb7 ${Jt.categorized.subType}`:""]})})]}),(0,$d.jsx)(Gh,{finding:null===(X=Jt.recommendation)||void 0===X?void 0:X.leadFinding,extraCount:(null!==(Z=null===(ee=Jt.recommendation)||void 0===ee||null===(te=ee.forensicFindings)||void 0===te?void 0:te.length)&&void 0!==Z?Z:0)-1,variant:"light"}),"monitoring"!==Jt.route&&(0,$d.jsx)(Gh,{finding:Jt.contractClock,variant:"light"}),"monitoring"===Jt.route?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(Bm,{style:{"--diag-color":ea.dot},children:[(0,$d.jsxs)("div",{className:"gauge-wrap",children:[(0,$d.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E5E7EB",strokeWidth:"4.5"}),(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:ea.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:`${ua} ${da}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1s ease"}})]}),(0,$d.jsxs)("div",{className:"gauge-num",style:{color:ea.dot},children:[(0,$d.jsx)("span",{className:"gauge-val",children:Zn}),(0,$d.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$d.jsxs)("div",{className:"diag-body",children:[(0,$d.jsxs)("div",{className:"diag-top",children:[(0,$d.jsx)("span",{className:"diag-score-label",children:"Arvo Score"}),(0,$d.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$d.jsxs)("span",{className:"diag-status",children:[(0,$d.jsx)(yu,{name:"alert-circle",size:13,color:ea.dot,stroke:2}),(0,$d.jsx)("span",{className:"diag-label",style:{color:ea.labelClr},children:ea.label})]})]}),(0,$d.jsx)("p",{className:"diag-text",children:ca})]})]}),(0,$d.jsxs)(Em,{children:[(0,$d.jsxs)("div",{className:"monitoring-kicker",children:[(0,$d.jsx)("span",{className:"monitoring-dot"}),"Bevakning aktiverad"]}),"fixed_price"===Jt.contractType?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{children:["Fastprisavtal \u2014 bundet t.o.m. ",Jt.servicePeriodEnd?new Date(Jt.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):Jt.servicePeriodEnd,"."]}),(0,$d.jsx)("p",{children:ta?`Fastprisavtal kan inte avslutas i f\xf6rtid. Avtalet l\xf6per ut om ${null!=ra?`${ra} dagar`:"kort tid"} \u2014 Arvo f\xf6rbereder bytet till ett b\xe4ttre avtal nu.`:`Fastprisavtal kan inte avslutas i f\xf6rtid. Arvo bevakar avtalet och p\xe5minner er ${Jt.monitoringDate?new Date(Jt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):"3 m\xe5nader"} innan slutdatum s\xe5 ni hinner byta till ett b\xe4ttre avtal i r\xe4tt tid.`})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:ta?"Avtalet l\xf6per ut snart \u2014 Arvo agerar nu.":null!=Jt.cancellationNoticeDays?"Avtalet \xe4r l\xe5st \u2014 vi l\xe4gger det p\xe5 bevakning.":"\xc5rsavtal \u2014 Arvo bevakar inf\xf6r f\xf6rnyelse."}),(0,$d.jsx)("p",{children:(()=>{const e=Jt.servicePeriodEnd,t=Jt.cancellationNoticeDays,r=Jt.monitoringDate,n=e?new Date(e).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):null,a=r?new Date(r).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):null;return ta?`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}${null!=ra?` (${ra} dagar kvar)`:""}. Arvo f\xf6rbereder bytet till b\xe4sta verifierade villkor innan f\xf6rnyelse.`:null!=t?`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}. Upps\xe4gningstiden (${t} dagar) har redan passerat. Arvo f\xf6rbereder bytet ${null!==a&&void 0!==a?a:"90 dagar innan n\xe4sta f\xf6rnyelse"}.`:`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}. Vi p\xe5minner er i ${null!==a&&void 0!==a?a:"90 dagar innan slutdatum"} \u2014 i god tid f\xf6r att agera n\xe4r avtalet l\xf6per ut.`})()})]})]}),(0,$d.jsxs)(Dm,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsxs)("dt",{children:["Ni betalar idag",Hh(null===(re=Jt.categorized)||void 0===re?void 0:re.category).elSuffix?" (energidel)":""]}),(0,$d.jsxs)("dd",{children:[Ih(Jt.extracted.annualCost)," / \xe5r","annual"!==Jt.extracted.billingPeriod&&(0,$d.jsxs)("small",{style:{fontStyle:"italic"},children:["Projicerat fr\xe5n abonnemangsradernas listpris",Jt.extracted.billingPeriodAssumed?" \xb7 antaget m\xe5nadsvis (fakturan saknar period)":""]})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturadatum"}),(0,$d.jsx)("dd",{children:Jt.extracted.date})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$d.jsx)("dd",{children:Ih(Jt.extracted.amount)})]}),Jt.extracted.servicePeriodEnd&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Avtalstid t.o.m."}),(0,$d.jsx)("dd",{children:new Date(Jt.extracted.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"})})]}),Jt.monitoringDate&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:ta?"Bevakning":"Arvo p\xe5minner er"}),(0,$d.jsx)("dd",{children:ta?null!=ra?`Aktiv \u2014 avtal l\xf6per ut om ${ra} dagar`:"Aktiv":(()=>{const e=new Date(Jt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"});return e.charAt(0).toUpperCase()+e.slice(1)})()})]})]}),((null===(ne=Jt.categorized)||void 0===ne?void 0:ne.reasoning)||Jt.potentialSavingNote)&&(0,$d.jsxs)(Pm,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Avtals\xf6versikt"}),(null===(ae=Jt.categorized)||void 0===ae?void 0:ae.reasoning)&&(0,$d.jsxs)("p",{children:[Jt.categorized.normalizedSupplier||(null===(ie=Jt.extracted)||void 0===ie?void 0:ie.supplier)," fakturerar"," ",Ih(null===(oe=Jt.extracted)||void 0===oe?void 0:oe.annualCost)," per \xe5r f\xf6r"," ",Hh(Jt.categorized.category).inlineLabel,"."," ","Avtalet \xe4r bevakat \u2014 Arvo tar kontakt"," ",null!=ra&&ra<=90?"nu inf\xf6r f\xf6rest\xe5ende f\xf6rnyelse":Jt.monitoringDate&&!ta?`fr\xe5n ${new Date(Jt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"})}`:"inf\xf6r avtalets f\xf6rnyelse"," ","och s\xe4krar b\xe4sta villkor utan att ni beh\xf6ver l\xe4gga tid p\xe5 det."]}),Jt.potentialSavingNote&&(0,$d.jsxs)("p",{style:{marginTop:null!==(se=Jt.categorized)&&void 0!==se&&se.reasoning?10:0},children:[(0,$d.jsx)("strong",{children:"Potentiell nettobesparing vid avtalets slut:"})," ",Jt.potentialSavingNote]})]})]}):"unsupported"===Jt.route?(0,$d.jsx)(_m,{children:"natavgift"===Jt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"N\xe4tavgift \u2014 reglerat monopol, kan inte f\xf6rhandlas."}),(0,$d.jsxs)("p",{children:["Denna faktura \xe4r fr\xe5n er lokala n\xe4t\xe4gare (",null!==(le=null===(ce=Jt.extracted)||void 0===ce?void 0:ce.supplier)&&void 0!==le?le:"n\xe4tbolaget",") och avser eln\xe4tets distributionskostnad. N\xe4tavgiften best\xe4ms av Energimarknadsinspektionen och \xe4r geografiskt bunden \u2014 den kan inte p\xe5verkas genom ett elleverant\xf6rsbyte."]}),(0,$d.jsxs)("p",{children:["Ladda upp er ",(0,$d.jsx)("strong",{children:"elhandelsfaktura"})," (fr\xe5n er elleverant\xf6r) f\xf6r att se om ni betalar r\xe4tt pris f\xf6r sj\xe4lva elen."]})]}):"credit_note"===Jt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Kreditnota \u2014 ingen analys m\xf6jlig."}),(0,$d.jsx)("p",{children:"Filen verkar vara en kreditnota med negativt belopp. Ladda upp den ordinarie fakturan f\xf6r en korrekt analys."})]}):"insurance"===Jt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"F\xf6rs\xe4kringar hanteras inte av Arvo \xe4nnu."}),(0,$d.jsx)("p",{children:"F\xf6rs\xe4kringsf\xf6rmedling kr\xe4ver tillst\xe5nd fr\xe5n Finansinspektionen. Arvo planerar att ans\xf6ka om detta tillst\xe5nd under 2027 \u2014 tills dess analyserar vi inte f\xf6rs\xe4kringsfakturor. Ladda upp en annan leverant\xf6rsfaktura f\xf6r att komma ig\xe5ng."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Utanf\xf6r analysr\xe4ckvidden."}),(0,$d.jsx)("p",{children:"Denna faktura avser en tj\xe4nst vi inte optimerar (t.ex. juridik, redovisning, bemanning eller myndighetsavgifter). Koppla Fortnox / Visma f\xf6r att analysera era \xf6vriga leverant\xf6rer."})]})}):"review_queue"===Jt.route?(0,$d.jsxs)(_m,{children:["volume_data_required"===Jt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Kr\xe4ver offert \u2014 v\xe5ra experter kikar p\xe5 detta."}),(0,$d.jsx)("p",{children:Jt.volumeDataNote||"Kostnaden f\xf6r denna kategori styrs av specifika volymer och specifikationer, inte antalet anst\xe4llda. V\xe5ra experter kikar p\xe5 detta manuellt f\xf6r att ge er en r\xe4ttvis analys."}),null!=Jt.creditExpiryMonths&&(0,$d.jsxs)(Am,{style:Jt.creditWillExpireUnused?{background:"#FEF3C7",borderColor:"rgba(217,119,6,.25)"}:void 0,children:[(0,$d.jsx)("strong",{children:Jt.creditWillExpireUnused?`\u26a0 Krediter f\xf6rfaller ${Jt.creditExpiryDate} \u2014 ${Jt.creditExpiryMonths} ${1===Jt.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} kvar`:`Era startup-krediter r\xe4cker ca ${Jt.creditExpiryMonths} ${1===Jt.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} till`}),(0,$d.jsxs)("p",{children:["Ni f\xf6rbrukar ",Jt.startupCreditCurrency," ",null===(de=Jt.startupCreditMonthlyBurn)||void 0===de?void 0:de.toLocaleString("sv-SE"),"/m\xe5n men betalar ingenting tack vare kvarvarande kredit (",Jt.startupCreditCurrency," ",null===(ue=Jt.startupCreditBalance)||void 0===ue?void 0:ue.toLocaleString("sv-SE"),").",Jt.creditWillExpireUnused?` Vid nuvarande f\xf6rbrukningstakt f\xf6rfaller ca ${Jt.startupCreditCurrency} ${null===(pe=Jt.creditUnusedAmount)||void 0===pe?void 0:pe.toLocaleString("sv-SE")} oanv\xe4nt. \xd6verv\xe4g att skala upp era resurser eller kontakta leverant\xf6ren om f\xf6rl\xe4ngning \u2014 sedan bev\xe4pnar Arvo er med exakt vilken prisniv\xe5 ni ska kr\xe4va.`:" Nu \xe4r r\xe4tt tid att planera ert molnavtal \u2014 vi visar er exakt vilken prisniv\xe5 ni ska kr\xe4va innan fakturorna b\xf6rjar landa."]})]})]}):"foreign_currency"===Jt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{children:["Fakturan \xe4r i ",Jt.currency," \u2014 kontakta oss."]}),(0,$d.jsx)("p",{children:"Vi st\xf6djer SEK och EUR. F\xf6r \xf6vriga valutor, kontakta oss s\xe5 hj\xe4lper vi er manuellt."})]}):"no_benchmark"===Jt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Utanf\xf6r v\xe5r nuvarande t\xe4ckning."}),(0,$d.jsx)("p",{children:"Vi har \xe4nnu inte benchmarkdata f\xf6r denna leverant\xf6rskategori. Vi noterar fakturan och \xe5terkommer n\xe4r vi kan g\xf6ra en fullst\xe4ndig analys."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Fakturan beh\xf6ver djupare analys."}),(0,$d.jsx)("p",{children:"V\xe5r algoritm \xe4r inte tillr\xe4ckligt s\xe4ker p\xe5 klassificeringen f\xf6r att visa automatiska besparingssiffror. Koppla Fortnox / Visma f\xf6r en komplett, felfri analys av hela er leverant\xf6rsreskontra."})]}),"sent"===qr?(0,$d.jsx)("p",{style:{fontSize:13,color:"#1B6E66",fontWeight:600,marginTop:14,marginBottom:0},children:"\u2713 Vi h\xf6r av oss n\xe4r analysen \xe4r klar!"}):(0,$d.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Hr&&"idle"===qr){Yr("submitting");try{await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:Hr,source:"review_queue",reason:null===Jt||void 0===Jt?void 0:Jt.reason})}),Yr("sent")}catch{Yr("sent")}}},style:{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@email.se \u2014 vi meddelar n\xe4r vi har ett svar",value:Hr,onChange:e=>Wr(e.target.value),required:!0,style:{flex:1,minWidth:180,padding:"9px 14px",borderRadius:100,border:"1.5px solid #D5E2DC",fontSize:13,outline:"none",background:"#fff",color:"#0E1A17"}}),(0,$d.jsx)("button",{type:"submit",disabled:!Hr||"submitting"===qr,style:{padding:"9px 18px",borderRadius:100,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#5DD6CA,#1B6E66)",color:"#fff",fontSize:13,fontWeight:700,opacity:Hr&&"submitting"!==qr?1:.55},children:"submitting"===qr?"Skickar\u2026":"Meddela mig \u2192"})]})]}):null!==(he=Jt.recommendation)&&void 0!==he&&he.requiresQuote?(0,$d.jsxs)($d.Fragment,{children:[((null===(me=Jt.recommendation)||void 0===me?void 0:me.clickRateAnalysis)||(null===(fe=Jt.recommendation)||void 0===fe?void 0:fe.shouldSwitch)&&(null!==(ge=null===(xe=Jt.recommendation)||void 0===xe?void 0:xe.netSaving)&&void 0!==ge?ge:0)>0)&&(0,$d.jsx)($d.Fragment,{children:(0,$d.jsxs)(Pm,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Vad analysen visar"}),(0,$d.jsx)("p",{children:Jt.recommendation.reasoning})]})}),(null===(ve=Jt.recommendation)||void 0===ve||null===(be=ve.clickRateAnalysis)||void 0===be?void 0:be.estimatedAnnualSavingsHigh)>0?(0,$d.jsxs)(jm,{children:[(0,$d.jsxs)("div",{className:"estimate-header",children:[(0,$d.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$d.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$d.jsxs)("span",{className:"amount",children:["\u2248 ",Qm(Jt.recommendation.clickRateAnalysis.estimatedAnnualSavingsLow),"\u2013",Qm(Jt.recommendation.clickRateAnalysis.estimatedAnnualSavingsHigh),"\xa0kr/\xe5r"]}),(0,$d.jsx)("span",{className:"unit",children:"Er faktiska klickkostnad p\xe5 \xe5rsbasis mot marknadsbandet (estimat) \xb7 exakt belopp bekr\xe4ftas med offert"})]}):(null!==(ye=null===(ke=Jt.recommendation)||void 0===ke?void 0:ke.netSaving)&&void 0!==ye?ye:0)>0?(0,$d.jsxs)(jm,{children:[(0,$d.jsxs)("div",{className:"estimate-header",children:[(0,$d.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$d.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$d.jsxs)("span",{className:"amount",children:["\u2248 +",Qm(Jt.recommendation.netSaving),"\xa0kr/\xe5r"]}),(0,$d.jsx)("span",{className:"unit",children:"J\xe4mf\xf6rt mot verifierat B2B-marknadspris \xb7 bekr\xe4ftas med faktisk offert"})]}):null,(null===(je=Jt.recommendation)||void 0===je?void 0:je.storageSubstitution)&&(()=>{const e=Jt.recommendation.storageSubstitution;return(0,$d.jsxs)("div",{style:{gridColumn:"1 / -1",marginBottom:"20px",padding:"18px 22px",background:"#0E1A17",borderRadius:"20px",border:"1.5px solid #1B7A6E"},children:[(0,$d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px",flexWrap:"wrap"},children:[(0,$d.jsx)("span",{style:{fontSize:"12px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",color:"#5DD6CA"},children:"Arkitektonisk insikt"}),(0,$d.jsxs)("span",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#0E1A17",background:"#5DD6CA",borderRadius:"4px",padding:"2px 6px"},children:[e.vendor," \xb7 USD"]})]}),(0,$d.jsx)("p",{style:{margin:0,fontSize:"15px",lineHeight:1.55,color:"#F1F6F3",fontWeight:600},children:e.usdPain}),(0,$d.jsx)("p",{style:{margin:"10px 0 0",fontSize:"14px",lineHeight:1.55,color:"#C7D6D0"},children:e.substitution}),(0,$d.jsx)("p",{style:{margin:"12px 0 0",paddingTop:"12px",borderTop:"1px solid #2A3A35",fontSize:"12px",lineHeight:1.5,color:"#8FA39C"},children:e.note})]})})(),(null===(we=Jt.recommendation)||void 0===we?void 0:we.m365Equivalent)&&(0,$d.jsxs)(wm,{children:[(0,$d.jsxs)("div",{className:"ref-header",children:[(0,$d.jsx)("span",{className:"kicker",children:"Verifierad referens \u2014 likv\xe4rdig svit"}),(0,$d.jsx)("span",{className:"ref-badge",children:"Microsoft listpris"})]}),(0,$d.jsx)("div",{className:"ref-tier",children:Jt.recommendation.m365Equivalent.m365TierLabel}),(0,$d.jsx)("div",{className:"ref-figure",children:null!=Jt.recommendation.m365Equivalent.monthlyTotal?(0,$d.jsxs)($d.Fragment,{children:[Qm(Jt.recommendation.m365Equivalent.monthlyTotal),"\xa0kr",(0,$d.jsxs)("span",{className:"per",children:["/m\xe5n f\xf6r ",Jt.recommendation.m365Equivalent.seats," anv\xe4ndare"]})]}):(0,$d.jsxs)($d.Fragment,{children:[Jt.recommendation.m365Equivalent.perSeatMonthlyLabel,"\xa0kr",(0,$d.jsx)("span",{className:"per",children:"/anv\xe4ndare/m\xe5n"})]})}),(0,$d.jsxs)("div",{className:"ref-sub",children:[Jt.recommendation.m365Equivalent.perSeatMonthlyLabel,"\xa0kr/anv\xe4ndare/m\xe5n vid \xe5rsavtal \xb7 ",Jt.recommendation.m365Equivalent.equivalenceNote]}),(0,$d.jsxs)("div",{className:"ref-disclaimer",children:[(0,$d.jsx)("strong",{children:"Detta \xe4r Microsofts publika listpris f\xf6r den likv\xe4rdiga sviten \u2014 inte ert Google-pris."})," Google publicerar bara listpris i USD; ert faktiska kronpris j\xe4mf\xf6r vi mot i offerten nedan."]})]}),(0,$d.jsxs)(_m,{children:[(0,$d.jsx)("strong",{children:null!==(Se=Jt.recommendation)&&void 0!==Se&&Se.clickRateAnalysis?"Ber\xe4kna exakt besparing per \xe5r":(null!==($e=null===(ze=Jt.recommendation)||void 0===ze?void 0:ze.netSaving)&&void 0!==$e?$e:0)>0?"S\xe4kra besparingen \u2014 kr\xe4ver offert":null!==(_e=Jt.recommendation)&&void 0!==_e&&_e.m365Equivalent?"Exakt Google-pris kr\xe4ver offert":"unaudited"===(null===(Ne=Jt.recommendation)||void 0===Ne?void 0:Ne.revisionGate)?"Kr\xe4ver offert \u2014 Arvo g\xf6r en manuell genomg\xe5ng":"Kr\xe4ver offert \u2014 volymdata beh\xf6vs."}),(0,$d.jsx)("p",{children:null!==(Ee=Jt.recommendation)&&void 0!==Ee&&Ee.clickRateAnalysis?"Klickpriset \xe4r fastslaget. Fyll i nedan s\xe5 ber\xe4knar Arvo det exakta beloppet inklusive maskinleasing.":(null!==(Ae=null===(Ce=Jt.recommendation)||void 0===Ce?void 0:Ce.netSaving)&&void 0!==Ae?Ae:0)>0?"Fyll i era uppgifter \u2014 Arvo beg\xe4r in och sammanst\xe4ller offerter fr\xe5n rikst\xe4ckande avfallspartners.":null!==(De=Jt.recommendation)&&void 0!==De&&De.m365Equivalent?"Vi j\xe4mf\xf6r referensen ovan mot ert faktiska Google-pris och tar fram en exakt besparing i offerten.":Jt.recommendation.reasoning}),(0,$d.jsx)(Nm,{onSubmit:e=>{e.preventDefault(),Fr&&Or&&"idle"===Lr&&(Rr("sent"),setTimeout(()=>{if(!Lt.current)return;const e=Lt.current.getBoundingClientRect().top+window.pageYOffset-16;window.scrollTo({top:e,behavior:"smooth"})},50),fetch("/api/quote-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contactEmail:Fr.trim().toLowerCase(),contactName:Er.trim()||void 0,contactCompany:Cr.trim()||void 0,mandateAccepted:!0,extractedData:null===Jt||void 0===Jt?void 0:Jt.extracted,categorized:null===Jt||void 0===Jt?void 0:Jt.categorized})}).catch(e=>console.error("[quote-request]",e)))},children:"sent"===Lr?(0,$d.jsxs)("div",{className:"qlf-sent",children:[(0,$d.jsx)(yu,{name:"check",size:16,stroke:2.5}),"Tack! Bekr\xe4ftelse \xe4r skickad till din e-post. Vi \xe5terkommer med offerter inom 1\u20132 arbetsdagar."]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{className:"qlf-fields",children:[(0,$d.jsx)("input",{type:"text",placeholder:"Ditt namn",value:Er,onChange:e=>Ar(e.target.value)}),(0,$d.jsx)("input",{type:"text",placeholder:"F\xf6retag",value:Cr,onChange:e=>Dr(e.target.value)}),(0,$d.jsx)("input",{className:"qlf-full",type:"email",placeholder:"Din e-post (dit skickar vi offertsammanst\xe4llningen)",required:!0,value:Fr,onChange:e=>Tr(e.target.value)})]}),(0,$d.jsxs)("label",{className:"qlf-mandate",children:[(0,$d.jsx)("input",{type:"checkbox",checked:Or,onChange:e=>Pr(e.target.checked)}),(0,$d.jsxs)("span",{children:["Jag ger ",(0,$d.jsx)("em",{children:"Arvo Flow"})," fullmakt att beg\xe4ra in, sammanst\xe4lla och presentera offerter fr\xe5n leverant\xf6rer \xe5 mitt bolags v\xe4gnar."]})]}),(0,$d.jsx)(Md,{type:"submit",$variant:"gradient",$size:"sm",disabled:"submitting"===Lr||!Or,style:{width:"100%",justifyContent:"center"},children:"submitting"===Lr?"Startar...":"Starta offertprocessen \u2192"}),(0,$d.jsx)("p",{className:"qlf-zero-risk",children:"Ni betalar ingenting om vi inte hittar besparingar \u2014 20\xa0% av realiserad besparing."})]})})]})]}):Tn?(0,$d.jsx)($d.Fragment,{children:(0,$d.jsxs)(km,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Dold kostnad hittad"}),(0,$d.jsxs)("span",{className:"amount",children:["+",Ih(Ln)]}),(0,$d.jsxs)("span",{className:"unit",children:["Ni betalar ",Qm(On)," kr/\xe5r f\xf6r en tj\xe4nst som redan ing\xe5r i er licens"," ","\xb7 Arvos besparingsarvode ",Ih(Pn)," (20 %)"]})]})}):null!==(Fe=Jt.recommendation)&&void 0!==Fe&&Fe.shouldSwitch&&(null===(Te=Jt.recommendation)||void 0===Te?void 0:Te.netSaving)>0?(0,$d.jsx)($d.Fragment,{children:((e,t,r,n,a,i)=>{const o=sa.isRealPrice,s=Jt.categorized.licensePending,l=(sa.partnerLabel,(null!==(e=Jt.recommendation.suggestedSupplier)&&void 0!==e?e:"").toLowerCase().trim()),c=(null!==(t=null!==(r=null===(n=Jt.categorized)||void 0===n?void 0:n.normalizedSupplier)&&void 0!==r?r:null===(a=Jt.extracted)||void 0===a?void 0:a.supplier)&&void 0!==t?t:"").toLowerCase().trim();o&&l&&c&&(l===c||l.includes(c)||c.includes(l))&&Jt.recommendation.suggestedSupplier;return(0,$d.jsxs)($d.Fragment,{children:[ca&&(0,$d.jsxs)(Bm,{style:{"--diag-color":ea.dot},children:[(0,$d.jsxs)("div",{className:"gauge-wrap",children:[(0,$d.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E9F1ED",strokeWidth:"4.5"}),(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:ea.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:ha?`${pa/100*da} ${da}`:`0 ${da}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)"}})]}),(0,$d.jsxs)("div",{className:"gauge-num",style:{color:ea.dot},children:[(0,$d.jsx)("span",{className:"gauge-val",children:pa}),(0,$d.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$d.jsxs)("div",{className:"diag-body",children:[(0,$d.jsxs)("div",{className:"diag-top",children:[(0,$d.jsx)("span",{className:"diag-score-label",children:"Arvo Score\u2122"}),(0,$d.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$d.jsxs)("span",{className:"diag-status",children:[(0,$d.jsx)(yu,{name:"alert-circle",size:13,color:ea.dot,stroke:2}),(0,$d.jsx)("span",{className:"diag-label",style:{color:ea.labelClr},children:ea.label})]})]}),(0,$d.jsx)("p",{className:"diag-text",children:ca})]})]}),(0,$d.jsxs)(km,{children:[(0,$d.jsx)("span",{className:"kicker",children:s?"M\xf6jlig \xe5rlig besparing":"Din identifierade nettobesparing"}),(0,$d.jsxs)("span",{className:"amount",children:["+",Ih(Wn)]}),(0,$d.jsx)("span",{className:"unit",children:s?"F\xf6rs\xe4kring kr\xe4ver FI-licens \u2014 vi byter inte sj\xe4lva \xe4nnu, men visar gapet.":o&&Jt.recommendation.suggestedSupplier?(0,$d.jsxs)($d.Fragment,{children:[Qm(Vn)," \u2192 ",Qm(Jt.recommendation.suggestedAnnualCost)," kr/\xe5r hos ",(0,$d.jsx)("strong",{children:Jt.recommendation.suggestedSupplier})," ","\xb7 Arvos besparingsarvode ",Ih(Kn)," (20 %)",Bn&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("br",{}),(0,$d.jsxs)("small",{style:{opacity:.85},children:["Avser abonnemang och licenser. Om ",Jt.recommendation.suggestedSupplier," absorberar er h\xe5rdvaruskuld (",Qm(Mn)," kr) uppg\xe5r nettobesparing till ",Ih(Jt.recommendation.netSaving)," kr/\xe5r."]})]})]}):(0,$d.jsxs)($d.Fragment,{children:[Qm(Vn)," \u2192 ",Qm(Jt.recommendation.suggestedAnnualCost)," kr/\xe5r (Arvos kalkylerade riktpris)"," ","\xb7 Arvos besparingsarvode ",Ih(Kn)," (20 %)"]})})]}),!s&&(0,$d.jsx)($m,{$compact:!0,children:"list-verified"===sa.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Vid genomf\xf6rt byte bekr\xe4ftas slutpriset i offert innan ni godk\xe4nner.":null!==(i=sa.benchmarkNote)&&void 0!==i?i:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n en verifierad l\xe4gre leverant\xf6r."})]})})()}):"uncategorized"===(null===(Oe=Jt.categorized)||void 0===Oe?void 0:Oe.category)?(0,$d.jsxs)(_m,{children:[(0,$d.jsx)("strong",{children:"Kategorin \xe4r under analys."}),(0,$d.jsx)("p",{children:"Koppla Fortnox / Visma s\xe5 mappar vi era volymer mot marknadens b\xe4sta priser direkt."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(_m,{style:{marginTop:0},children:[(0,$d.jsx)("strong",{children:"Marknadsm\xe4ssigt pris."})," ",null!==(Pe=null===(Le=Jt.recommendation)||void 0===Le?void 0:Le.monitoringNote)&&void 0!==Pe?Pe:"Vi hittar inget prisgap mot marknadens b\xe4sta verifierade niv\xe5 \u2014 Arvo rekommenderar inget byte i dag."]}),!(null!==(Re=Jt.recommendation)&&void 0!==Re&&Re.shouldSwitch)&&(null===(Ie=Jt.recommendation)||void 0===Ie?void 0:Ie.reasoning)&&(0,$d.jsxs)(Pm,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$d.jsx)("p",{children:Hh(Jt.categorized.category).isRealPrice?Jt.recommendation.reasoning:Zm(Jt.recommendation.reasoning,Jt.recommendation.suggestedSupplier)})]})]}),(null===(Me=Jt.recommendation)||void 0===Me?void 0:Me.reasoning)&&(null===(Be=Jt.recommendation)||void 0===Be?void 0:Be.shouldSwitch)&&!Tn&&!oa&&(0,$d.jsxs)(Pm,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$d.jsx)("p",{children:Hh(Jt.categorized.category).isRealPrice?Jt.recommendation.reasoning:Zm(Jt.recommendation.reasoning,Jt.recommendation.suggestedSupplier)})]}),(null===(Ve=Jt.recommendation)||void 0===Ve?void 0:Ve.shouldSwitch)&&!Tn&&((e,t)=>{const r=null===(e=Jt.extracted)||void 0===e?void 0:e.seatCount,n=Number(Ut),a=null!=r&&r>n?r-n:0,i=Hh(null===(t=Jt.categorized)||void 0===t?void 0:t.category);return a>0?(0,$d.jsx)(of,{seatCount:r,employees:n,overage:a,term:i.unit,termSing:i.unitSingular}):null})(),(0,$d.jsx)(mm,{onClick:()=>en(e=>!e),children:Zr?"\u2191 D\xf6lj underlag":"\u2193 Hur vi r\xe4knar"}),Zr&&(0,$d.jsxs)($d.Fragment,{children:["auto"===Jt.route&&!(null!==(Ue=Jt.categorized)&&void 0!==Ue&&Ue.licensePending)&&!(null!==(Ke=Jt.recommendation)&&void 0!==Ke&&Ke.shouldSwitch&&(null===(He=Jt.recommendation)||void 0===He?void 0:He.netSaving)>0&&!Tn)&&(0,$d.jsx)($m,{children:"list-verified"===sa.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Vid genomf\xf6rt byte bekr\xe4ftas slutpriset i offert innan ni godk\xe4nner.":null!==(We=sa.benchmarkNote)&&void 0!==We?We:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n en verifierad l\xe4gre leverant\xf6r."}),"auto"===Jt.route&&!(null!==(qe=Jt.categorized)&&void 0!==qe&&qe.licensePending)&&!sa.isRealPrice&&Jt.savingRange&&(0,$d.jsxs)(Mm,{children:[(0,$d.jsx)("span",{className:"range-label",children:"Intervall:"}),Qm(Jt.savingRange.low)," \u2013 ",Qm(Jt.savingRange.high)," kr/\xe5r netto"]}),"auto"===Jt.route&&!(null!==(Ye=Jt.categorized)&&void 0!==Ye&&Ye.licensePending)&&Jt.calculationChain&&(0,$d.jsx)(af,{cc:Jt.calculationChain}),(null===(Ge=Jt.extracted)||void 0===Ge?void 0:Ge.potentialMixedCategories)&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#9CA3AF",marginBottom:14,lineHeight:1.5,fontStyle:"italic"},children:na?(0,$d.jsxs)($d.Fragment,{children:["Kombinerad faktura \u2014"," ",Hh(null===(Qe=Jt.categorized)||void 0===Qe?void 0:Qe.category).label,null!=(null===(Je=Jt.extracted)||void 0===Je?void 0:Je.primaryComponentMonthly)?` (${Ih(12*Jt.extracted.primaryComponentMonthly)}/\xe5r)`:""," ","+ ",ia," (",Ih(na.currentAnnual),"/\xe5r)."," ","Besparing:"," ",Hh(null===(Xe=Jt.categorized)||void 0===Xe?void 0:Xe.category).label," ","\u2212",Ih(aa),"/\xe5r"," ","|"," ",ia," \u2212",Ih(na.grossSaving),"/\xe5r."]}):(0,$d.jsxs)($d.Fragment,{children:["Kombinerad faktura \u2014 analysen avser"," ",Hh(null===(Ze=Jt.categorized)||void 0===Ze?void 0:Ze.category).label,null!=(null===(et=Jt.extracted)||void 0===et?void 0:et.primaryComponentMonthly)?` (${Ih(12*Jt.extracted.primaryComponentMonthly)}/\xe5r)`:"",(null!==(tt=null===(rt=Jt.recommendation)||void 0===rt?void 0:rt.nonPrimaryAnnual)&&void 0!==tt?tt:0)>0?`. \xd6vriga tj\xe4nster (${Ih(Jt.recommendation.nonPrimaryAnnual)}/\xe5r) analyseras via Fortnox/Visma.`:"."]})}),null!=(null===(nt=Jt.extracted)||void 0===nt?void 0:nt.annualCost)&&"monitoring"!==Jt.route&&"unsupported"!==Jt.route&&(0,$d.jsxs)(Dm,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Ni betalar idag"}),(0,$d.jsxs)("dd",{children:[Ih(Vn)," / \xe5r",Bn?(0,$d.jsxs)("small",{children:["Abonnemang och licenser. Exkl. h\xe5rdvaruavbetalningar (",Ih(In),"/\xe5r)",Jt.extracted.variableCharges>0?` och r\xf6rliga avgifter (${Ih(Jt.extracted.variableCharges)} denna period)`:"","."]}):Jt.extracted.variableCharges>0&&(0,$d.jsxs)("small",{children:["Varav fasta abonnemang. Exkl. r\xf6rliga avgifter (",Ih(Jt.extracted.variableCharges)," denna period)."]})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturadatum"}),(0,$d.jsx)("dd",{children:Jt.extracted.date})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$d.jsxs)("dd",{children:[Ih(Jt.extracted.amount),Jt.extracted.oneTimeFees>0&&(0,$d.jsxs)("small",{children:["Inkl. ",Ih(Jt.extracted.oneTimeFees)," ",Jt.extracted.elSkatterKr>0?"lagstadgade avgifter":"eng\xe5ngskostnader"," \u2014 ing\xe5r ej i \xe5rsber\xe4kningen ovan."]})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"\xc5terkommande"}),(0,$d.jsx)("dd",{children:Jt.extracted.recurring?"Ja (abonnemang / premie)":"Nej"})]}),"EUR"===Jt.extracted.originalCurrency&&(0,$d.jsxs)("div",{style:{gridColumn:"1 / -1"},children:[(0,$d.jsx)("dt",{children:"Valutakonvertering"}),(0,$d.jsx)("dd",{children:(0,$d.jsxs)("small",{children:["Fakturan \xe4r i EUR \u2014 konverterad till SEK med kursen ",null===(at=Jt.extracted.fxRate)||void 0===at?void 0:at.toFixed(2)," SEK/EUR",Jt.extracted.fxSource&&"fallback"!==Jt.extracted.fxSource?` (Riksbanken/ECB ${null!==(it=Jt.extracted.fxDate)&&void 0!==it?it:""})`:" (fallback-kurs)",". Alla belopp ovan \xe4r i SEK."]})})]}),Rn.length>0&&(0,$d.jsx)("div",{style:{gridColumn:"1 / -1"},children:(0,$d.jsxs)(Am,{children:[(0,$d.jsx)("strong",{children:"\u26a0 Aktiv h\xe5rdvaruleasing \u2014 kontrollera innan ni byter"}),(0,$d.jsxs)("p",{children:[Rn.map((e,t)=>(0,$d.jsxs)("span",{style:{display:"block",marginBottom:Rn.length>1&&t<Rn.length-1?"6px":0},children:[e.description," \u2014 ",e.monthsRemaining," m\xe5nader kvar (",Qm(e.monthlyCost)," kr/m\xe5n = ",(0,$d.jsxs)("strong",{children:[Qm(e.remainingCost)," kr totalt"]}),")"]},t)),Rn.length>1&&(0,$d.jsxs)("span",{style:{display:"block",marginTop:"6px",fontWeight:700},children:["Totalt kvar att betala: ",Qm(Mn)," kr"]})]}),Bn&&Un>0&&((e,t)=>{const r=(Mn/Un).toFixed(1).replace(".",",");return(0,$d.jsxs)("p",{style:{marginTop:8,paddingTop:8,borderTop:"1px solid rgba(0,0,0,0.08)"},children:[(0,$d.jsx)("strong",{children:"Break-even om skulden l\xf6ses kontant:"})," ",Qm(Mn)," kr \xf7 ",Qm(Un)," kr/\xe5r = ",(0,$d.jsxs)("strong",{children:[r," \xe5r"]})," ","\u2014"," ","fr\xe5ga ",null!==(e=null===(t=Jt.recommendation)||void 0===t?void 0:t.suggestedSupplier)&&void 0!==e?e:"den nya leverant\xf6ren"," om de kan absorbera skulden vid avtalssignering. Om ja \xe4r besparingen ",Ih(Jt.recommendation.netSaving)," kr/\xe5r netto fr\xe5n dag ett."]})})()]})}),Jt.extracted.elUncertaintyNote&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"\xc5rsuppskattning"}),(0,$d.jsx)("dd",{children:(0,$d.jsx)("small",{children:Jt.extracted.elUncertaintyNote})})]}),Jt.extracted.elSkatterKr>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Skatter & lagstadgade avgifter"}),(0,$d.jsxs)("dd",{children:[Ih(Jt.extracted.elSkatterKr),(0,$d.jsx)("small",{children:"Energiskatt, elcertifikat m.m. \u2014 ej f\xf6rhandlingsbara, ing\xe5r ej i besparingskalkylen."})]})]}),Jt.extracted.elNatavgiftAnnual>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"N\xe4tavgift (ej valbar)"}),(0,$d.jsxs)("dd",{children:[Ih(Jt.extracted.elNatavgiftAnnual)," / \xe5r",(0,$d.jsx)("small",{children:"Eln\xe4tsavgiften best\xe4ms av din regionala n\xe4toperat\xf6r och kan inte bytas via elleverant\xf6rsbyte \u2014 ing\xe5r ej i besparingskalkylen."})]})]}),Jt.extracted.variableCharges>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"R\xf6rliga avgifter denna period"}),(0,$d.jsxs)("dd",{children:[Ih(Jt.extracted.variableCharges),(0,$d.jsx)("small",{children:null!==(ot=Hh(null===(st=Jt.categorized)||void 0===st?void 0:st.category).variableChargeNote)&&void 0!==ot?ot:"R\xf6rliga avgifter denna period \u2014 ej inkluderat i \xe5rsber\xe4kningen."}),"mobil"===(null===(lt=Jt.categorized)||void 0===lt?void 0:lt.category)&&((e,t)=>{const r=Jt.extracted.roamingZone,n=null!==(e=Jt.extracted.recurringAmount)&&void 0!==e?e:0,a=null!==(t=Jt.extracted.variableCharges)&&void 0!==t?t:0;return a<Math.max(.3*n,1e3)?null:r>=4?(0,$d.jsxs)(Cm,{$type:"satellite",children:[(0,$d.jsx)(yu,{name:"globe",size:14}),(0,$d.jsx)("span",{children:"Satellit- och maritim datatrafik (Zon 4) \xe4r teknikberoende \u2014 kan inte optimeras via operat\xf6rsbyte och ing\xe5r inte i Arvos besparing."})]}):(0,$d.jsxs)(Cm,{children:[(0,$d.jsx)(yu,{name:"info",size:14}),(0,$d.jsxs)("span",{children:["Roamingkostnader p\xe5 ",Ih(a)," denna period. Om detta \xe4r \xe5terkommande kan ett mobilavtal med b\xe4ttre EU-datapaket minska kostnaden \u2014 Arvo tittar p\xe5 detta vid ett leverant\xf6rsbyte."]})]})})()]})]}),"saas-productivity"===(null===(ct=Jt.categorized)||void 0===ct?void 0:ct.category)&&(null===(dt=Jt.extracted)||void 0===dt?void 0:dt.licenseType)&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Licensplan"}),(0,$d.jsxs)("dd",{children:[Jt.extracted.licenseType,"monthly"===Jt.extracted.billingCycleType&&(0,$d.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#A8761A",fontWeight:600},children:"M\xe5nadsvis"}),"annual"===Jt.extracted.billingCycleType&&(0,$d.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#1B7A6E",fontWeight:600},children:"\xc5rsavtal"})]})]}),"saas-productivity"===(null===(ut=Jt.categorized)||void 0===ut?void 0:ut.category)&&(null===(pt=Jt.recommendation)||void 0===pt?void 0:pt.annualBillingSaving)>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"M\xf6jlighet \u2014 \xe5rsavtal"}),(0,$d.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",Ih(Jt.recommendation.annualBillingSaving),"/\xe5r utan leverant\xf6rsbyte"]})]}),"saas-productivity"===(null===(ht=Jt.categorized)||void 0===ht?void 0:ht.category)&&(e=>{const t=null===(e=Jt.recommendation)||void 0===e?void 0:e.savingsBreakdown;if(!t)return null;const r=[{label:"Marknadsgap",value:t.cspDiscount},{label:"Tier-optimering (advisory)",value:t.tierOptimization},{label:"Licensrensning",value:t.licenseCleanup}].filter(e=>e.value>0);return r.length<2?null:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{style:{gridColumn:"1 / -1",borderTop:"1px solid #D5E2DC",marginTop:"4px",paddingTop:"10px"},children:(0,$d.jsx)("dt",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#5C6E68",marginBottom:"6px"},children:"Besparing per kanal"})}),r.map(e=>(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:e.label}),(0,$d.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",Ih(e.value),"/\xe5r"]})]},e.label))]})})()]}),(null===(mt=Jt.recommendation)||void 0===mt?void 0:mt.shelfware)&&(()=>{const e=Jt.recommendation.shelfware,t=null!==dn?dn:e,r=null!==dn,n={gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},a={fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"};return r&&t&&!t.cleared&&t.annualWaste>0?(0,$d.jsxs)("div",{style:n,children:[(0,$d.jsx)("div",{style:a,children:"Licensrevision \u2014 bekr\xe4ftat"}),(0,$d.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:[(0,$d.jsxs)("strong",{children:[t.confirmedIdle," bekr\xe4ftat oanv\xe4nda platser"]})," \xe0 ",t.perSeatMonthly," kr/plats/m\xe5n"," ","= ",(0,$d.jsxs)("strong",{style:{color:"#1B7A6E"},children:[Ih(t.annualWaste)," kr/\xe5r"]})," i verifierat svinn att avveckla."]})]}):r?(0,$d.jsxs)("div",{style:n,children:[(0,$d.jsx)("div",{style:a,children:"Licensrevision \u2014 klar"}),(0,$d.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:"Tack \u2014 d\xe5 \xe4r \xf6verskottet f\xf6rklarat. Vi flaggar inget svinn p\xe5 era licenser."})]}):e.needsReview?(0,$d.jsxs)("div",{style:n,children:[(0,$d.jsx)("div",{style:a,children:"Licensrevision \u2014 vi beh\xf6ver er bekr\xe4ftelse"}),(0,$d.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:e.reviewPrompt}),(0,$d.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Om de st\xe5r oanv\xe4nda motsvarar det upp till ",Ih(e.potentialAnnualWaste)," kr/\xe5r. Vi r\xe4knar ingen besparing f\xf6rr\xe4n ni bekr\xe4ftat \u2014 siffror utan k\xe4lla visar vi aldrig."]}),(0,$d.jsxs)("form",{onSubmit:Dn,style:{display:"flex",gap:"8px",alignItems:"center",marginTop:"12px",flexWrap:"wrap"},children:[(0,$d.jsxs)("label",{htmlFor:"shelfware-exc",style:{fontSize:"13px",color:"#0E1A17"},children:["Hur m\xe5nga av de ",e.unverifiedGap," anv\xe4nds till annat?"]}),(0,$d.jsx)("input",{id:"shelfware-exc",type:"number",min:"0",max:e.unverifiedGap,inputMode:"numeric",value:pn,onChange:e=>hn(e.target.value),placeholder:"0",style:{width:"72px",padding:"7px 9px",fontSize:"14px",border:"1px solid #BFD8D0",borderRadius:"8px",background:"#fff"}}),(0,$d.jsx)("button",{type:"submit",disabled:"submitting"===mn,style:{padding:"8px 16px",fontSize:"13px",fontWeight:600,color:"#fff",background:"#1B7A6E",border:"none",borderRadius:"8px",cursor:"pointer",opacity:"submitting"===mn?.6:1},children:"submitting"===mn?"R\xe4knar\u2026":"Bekr\xe4fta"})]}),"error"===mn&&(0,$d.jsx)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#B4341F"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}):null})(),(null===(ft=Jt.recommendation)||void 0===ft?void 0:ft.fortnoxRightsizing)&&(()=>{const e=Jt.recommendation.fortnoxRightsizing;return(0,$d.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$d.jsxs)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:["R\xe4tt-storlek \u2014 ",e.vendor]}),(0,$d.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$d.jsxs)("strong",{children:[e.vendor," ",e.currentPaket]})," (",e.currentMonthly," kr/m\xe5n). Niv\xe5n under,"," ",(0,$d.jsx)("strong",{children:e.targetPaket})," (",e.targetMonthly," kr/m\xe5n), \xe4r ",e.deltaMonthly," kr/m\xe5n billigare."]}),(0,$d.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Ryms er anv\xe4ndning (moduler, antal anv\xe4ndare, verifikationsvolym) i ",e.targetPaket,"? D\xe5 realiserar vi upp till"," ",(0,$d.jsxs)("strong",{style:{color:"#1B7A6E"},children:[Ih(e.annualSaving)," kr/\xe5r"]}),". Verifierad prisskillnad mot Fortnox publika listpris \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(gt=Jt.recommendation)||void 0===gt?void 0:gt.m365Rightsizing)&&(()=>{const e=Jt.recommendation.m365Rightsizing;return(0,$d.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$d.jsx)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:"R\xe4tt-storlek \u2014 Microsoft 365 (r\xe5dgivning)"}),(0,$d.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$d.jsx)("strong",{children:e.currentLabel})," (",e.currentPerSeatLabel," kr/anv/m\xe5n) \u2014 full enterprise-svit."," ",(0,$d.jsx)("strong",{children:e.targetLabel})," (",e.targetPerSeatLabel," kr/anv/m\xe5n) ger Intune MDM + Defender, s\xe4kerheten de flesta SMF beh\xf6ver."]}),(0,$d.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:["Kr\xe4ver ni inte ",e.currentTier.toUpperCase(),":s enterprise-funktioner (compliance, eDiscovery)? D\xe5 realiserar vi upp till"," ",(0,$d.jsxs)("strong",{style:{color:"#1B7A6E"},children:[e.annualSavingLabel," kr/\xe5r"]})," f\xf6r era ",e.seats," anv\xe4ndare. Verifierad prisskillnad mot Microsofts publika listpris \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(xt=Jt.recommendation)||void 0===xt?void 0:xt.molnvaxel)&&(()=>{const e=Jt.recommendation.molnvaxel,t=(e.addons||[]).filter(e=>null!=e.monthlyExVat),r=!e.bundled&&null!=e.teliaFloorLabel&&null!=e.teliaFloor,n=null!=e.overFloorPct&&e.overFloorPct>=30,a=Math.max(e.perUserMonthlyExVat||0,e.teliaFloor||0)||1,i=Math.max(6,Math.round((e.perUserMonthlyExVat||0)/a*100)),o=Math.max(6,Math.round((e.teliaFloor||0)/a*100));return(0,$d.jsxs)(Sm,{$over:n,children:[(0,$d.jsxs)("div",{className:"adv-top",children:[(0,$d.jsxs)("span",{className:"adv-eyebrow",children:["F\xf6retagsv\xe4xel \xb7 ",e.tierLabel,"-niv\xe5"]}),(0,$d.jsx)("span",{className:"adv-badge",children:"Verifierad referens"})]}),(0,$d.jsxs)("div",{className:"adv-figure",children:[e.perUserLabel," kr",(0,$d.jsxs)("span",{className:"unit",children:["per anv\xe4ndare/m\xe5n \xb7 exkl moms \xb7 ",e.seats," anv\xe4ndare"]})]}),r&&(0,$d.jsxs)("div",{className:"adv-compare",children:[(0,$d.jsxs)("div",{className:"adv-bar you",children:[(0,$d.jsx)("span",{className:"lbl",children:"Ni betalar"}),(0,$d.jsx)("span",{className:"track",children:(0,$d.jsx)("span",{className:"fill",style:{width:`${i}%`}})}),(0,$d.jsxs)("span",{className:"amt",children:[e.perUserLabel," kr"]})]}),(0,$d.jsxs)("div",{className:"adv-bar floor",children:[(0,$d.jsx)("span",{className:"lbl",children:"Telia-golv"}),(0,$d.jsx)("span",{className:"track",children:(0,$d.jsx)("span",{className:"fill",style:{width:`${o}%`}})}),(0,$d.jsxs)("span",{className:"amt",children:[e.teliaFloorLabel," kr"]})]})]}),e.bundled?(0,$d.jsx)("span",{className:"adv-pill neutral",children:"Buntat pris \u2014 j\xe4mf\xf6rs i genomg\xe5ng, inte mot golv"}):r?n?(0,$d.jsxs)("span",{className:"adv-pill warn",children:["~",e.overFloorPct," % \xf6ver Telias instegsgolv"]}):(0,$d.jsx)("span",{className:"adv-pill ok",children:"I niv\xe5 med marknadens instegsv\xe4xel"}):(0,$d.jsx)("span",{className:"adv-pill neutral",children:"Kontaktcenter \u2014 pris s\xe4tts via offert"}),(0,$d.jsx)("p",{className:"adv-prose",children:e.bundled?(0,$d.jsxs)($d.Fragment,{children:["Priset buntar v\xe4xel ",(0,$d.jsx)("strong",{children:"och"})," mobilabonnemang (inkl. surf) \u2014 inte direkt j\xe4mf\xf6rbart med en ren v\xe4xellicens. Vi j\xe4mf\xf6r mot ert faktiska pris i en genomg\xe5ng ist\xe4llet f\xf6r en missvisande siffra."]}):r?(0,$d.jsxs)($d.Fragment,{children:["Telia Smart Connect \u2014 marknadens instegsv\xe4xel f\xf6r motsvarande niv\xe5 \u2014 kostar ",(0,$d.jsxs)("strong",{children:["fr\xe5n ",e.teliaFloorLabel," kr/anv/m\xe5n"]})," (exkl moms)",n?(0,$d.jsx)($d.Fragment,{children:". Glappet \xe4r v\xe4rt en offertj\xe4mf\xf6relse."}):(0,$d.jsx)($d.Fragment,{children:". Ni ligger redan r\xe4tt \u2014 vi bevakar att det f\xf6rblir s\xe5."})]}):(0,$d.jsx)($d.Fragment,{children:"P\xe5 kontaktcenter-niv\xe5 s\xe4tter leverant\xf6rerna pris via offert \u2014 vi j\xe4mf\xf6r mot er faktiska kostnad i en genomg\xe5ng."})}),t.length>0&&(0,$d.jsxs)("p",{className:"adv-addons",children:["Ni betalar f\xf6r ",t.map(e=>`${e.label} (${e.monthlyExVat} kr/m\xe5n)`).join(", ")," \u2014 bekr\xe4fta att de anv\xe4nds, annars \xe4r det ren besparing."]}),(0,$d.jsx)("div",{className:"adv-foot",children:"Telias instegspris exkl moms verifierat mot telia.se. \u201dFr\xe5n\u201d-pris = golv; exakt j\xe4mf\xf6relse mot er bransch g\xf6rs n\xe4r underlaget r\xe4cker."})]})})(),(null===(vt=Jt.recommendation)||void 0===vt?void 0:vt.adobeRightsizing)&&(()=>{const e=Jt.recommendation.adobeRightsizing;return(0,$d.jsxs)("div",{style:{gridColumn:"1 / -1",marginTop:"14px",padding:"16px 18px",background:"#F1F6F3",border:"1px solid #BFD8D0",borderRadius:"12px"},children:[(0,$d.jsx)("div",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#1B7A6E",marginBottom:"8px"},children:"R\xe4tt-storlek \u2014 Adobe Creative Cloud (r\xe5dgivning)"}),(0,$d.jsxs)("p",{style:{margin:0,fontSize:"14px",lineHeight:1.55,color:"#0E1A17"},children:["Ni betalar f\xf6r ",(0,$d.jsx)("strong",{children:e.currentLabel})," (",e.currentMonthlyLabel," ",e.unit," exkl moms) \u2014 hela sviten."," ","Anv\xe4nder era anv\xe4ndare i praktiken bara ",(0,$d.jsx)("strong",{children:"ett program"}),"? D\xe5 r\xe4cker ",(0,$d.jsx)("strong",{children:e.targetLabel})," (",e.targetMonthlyLabel," ",e.unit," exkl moms)."]}),(0,$d.jsxs)("p",{style:{margin:"8px 0 0",fontSize:"12px",color:"#5C6E68"},children:[e.annualSavingLabel?(0,$d.jsxs)($d.Fragment,{children:["Bekr\xe4fta s\xe5 realiserar vi upp till ",(0,$d.jsxs)("strong",{style:{color:"#1B7A6E"},children:[e.annualSavingLabel," kr/\xe5r"]})," f\xf6r era ",e.seats," licenser. "]}):(0,$d.jsx)($d.Fragment,{children:"Bekr\xe4fta antal licenser s\xe5 r\xe4knar vi hem beloppet. "}),"Verifierad prisskillnad mot Adobes publika listpris (adobe.com/se) \u2014 vi visar ingen siffra vi inte kan st\xe5 f\xf6r."]})]})})(),(null===(bt=Jt.recommendation)||void 0===bt?void 0:bt.loneadminRightsizing)&&(()=>{const e=Jt.recommendation.loneadminRightsizing,t=e.aboveFloor&&null!=e.overFloorPct&&e.overFloorPct>=15,r=Math.max(e.perEmployeeMonthly||0,e.floorPerEmployee||0)||1,n=Math.max(6,Math.round((e.perEmployeeMonthly||0)/r*100)),a=Math.max(6,Math.round((e.floorPerEmployee||0)/r*100));return(0,$d.jsxs)(Sm,{$over:t,children:[(0,$d.jsxs)("div",{className:"adv-top",children:[(0,$d.jsx)("span",{className:"adv-eyebrow",children:"L\xf6neadministration \xb7 per anst\xe4lld"}),(0,$d.jsx)("span",{className:"adv-badge",children:"Verifierad referens"})]}),(0,$d.jsxs)("div",{className:"adv-figure",children:[e.perEmployeeLabel," kr",(0,$d.jsxs)("span",{className:"unit",children:["per anst\xe4lld/m\xe5n \xb7 exkl moms \xb7 ",e.headcount," anst\xe4llda"]})]}),(0,$d.jsxs)("div",{className:"adv-compare",children:[(0,$d.jsxs)("div",{className:"adv-bar you",children:[(0,$d.jsx)("span",{className:"lbl",children:"Ni betalar"}),(0,$d.jsx)("span",{className:"track",children:(0,$d.jsx)("span",{className:"fill",style:{width:`${n}%`}})}),(0,$d.jsxs)("span",{className:"amt",children:[e.perEmployeeLabel," kr"]})]}),(0,$d.jsxs)("div",{className:"adv-bar floor",children:[(0,$d.jsx)("span",{className:"lbl",children:"Fortnox-golv"}),(0,$d.jsx)("span",{className:"track",children:(0,$d.jsx)("span",{className:"fill",style:{width:`${a}%`}})}),(0,$d.jsxs)("span",{className:"amt",children:[e.floorPerEmployeeLabel," kr"]})]})]}),e.alreadyFortnox?(0,$d.jsx)("span",{className:"adv-pill neutral",children:"Redan p\xe5 Fortnox L\xf6ns verifierade niv\xe5"}):t?(0,$d.jsxs)("span",{className:"adv-pill warn",children:["~",e.overFloorPct," % \xf6ver Fortnox-golvet"]}):(0,$d.jsx)("span",{className:"adv-pill ok",children:"I niv\xe5 med Fortnox-golvet"}),(0,$d.jsx)("p",{className:"adv-prose",children:e.alreadyFortnox?(0,$d.jsx)($d.Fragment,{children:"Ni ligger redan p\xe5 Fortnox L\xf6ns verifierade niv\xe5 \u2014 vi bevakar att det f\xf6rblir s\xe5."}):e.aboveFloor?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:e.fortnoxProduct})," \u2014 verifierat l\xe4gst \u2014 kostar 199 kr/m\xe5n + 25 kr/anst\xe4lld. Ryms er l\xf6nehantering (kollektivavtal, integrationer) d\xe4r? Bekr\xe4fta s\xe5 realiserar vi upp till ",(0,$d.jsxs)("strong",{children:[Ih(e.annualSaving)," kr/\xe5r"]}),"."]}):(0,$d.jsx)($d.Fragment,{children:"Ni ligger i niv\xe5 med Fortnox L\xf6ns verifierade golv \u2014 ni ligger r\xe4tt, vi bevakar."})}),e.hasPayslip&&(0,$d.jsx)("p",{className:"adv-addons",children:"L\xf6nebesked-/utskicksavgifter (Kivra) \xe4r r\xf6rliga och ing\xe5r inte i golvj\xe4mf\xf6relsen."}),(0,$d.jsx)("div",{className:"adv-foot",children:"Fortnox L\xf6ns listpris exkl moms verifierat mot fortnox.se. Golvet \xe4r ett fast pris; exakt utfall beror p\xe5 om behovet ryms i Fortnox L\xf6n."})]})})(),(null===(yt=Jt.recommendation)||void 0===yt?void 0:yt.reasoning)&&(Tn||oa)&&(0,$d.jsxs)(Pm,{children:[(0,$d.jsx)("span",{className:"kicker",children:Tn?"Vad vi hittade":"Kombinerad analys"}),(0,$d.jsx)("p",{children:Hh(Jt.categorized.category).isRealPrice?Jt.recommendation.reasoning:Zm(Jt.recommendation.reasoning,Jt.recommendation.suggestedSupplier)})]}),"saas-productivity"===(null===(kt=Jt.categorized)||void 0===kt?void 0:kt.category)&&(null!==(jt=null===(wt=Jt.recommendation)||void 0===wt?void 0:wt.tierOptimizationSaving)&&void 0!==jt?jt:0)>0&&(0,$d.jsxs)(Rm,{children:[(0,$d.jsxs)("button",{className:"acc-trigger",onClick:()=>jr(e=>!e),"aria-expanded":kr,children:[(0,$d.jsx)("span",{className:"acc-icon",children:"\u26a1"}),(0,$d.jsxs)("span",{className:"acc-label-group",children:[(0,$d.jsx)("span",{className:"acc-label",children:"Licensoptimering"}),!kr&&(0,$d.jsx)("span",{className:"acc-hint",children:"Klicka f\xf6r att se detaljer \u2192"})]}),(0,$d.jsxs)("span",{className:"acc-amount",children:["ytterligare +",Qm(Math.round(.8*Jt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]}),(0,$d.jsx)("span",{className:"acc-chevron"+(kr?" open":""),children:(0,$d.jsx)(yu,{name:"chevron-right",size:16,stroke:2.5})})]}),kr&&(0,$d.jsxs)("div",{className:"acc-body",children:[(0,$d.jsxs)("p",{className:"acc-intro",children:["Ni kan spara ytterligare"," ",(0,$d.jsxs)("strong",{children:[Qm(Math.round(.8*Jt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]})," ","(efter Arvos arvode om ",Qm(Math.round(.2*Jt.recommendation.tierOptimizationSaving)),"\xa0kr) genom att byta"," ","fr\xe5n\xa0",(0,$d.jsx)("strong",{children:null!==(St=Gm[Jt.recommendation.tierOptimizationFromTier])&&void 0!==St?St:Jt.recommendation.tierOptimizationFromTier})," ","till\xa0",(0,$d.jsx)("strong",{children:null!==($t=Gm[Jt.recommendation.tierOptimizationToTier])&&void 0!==$t?$t:Jt.recommendation.tierOptimizationToTier}),"."]}),(0,$d.jsxs)("div",{className:"acc-row",children:[(0,$d.jsx)("span",{className:"acc-row-icon",style:{color:"#1B7A6E"},children:(0,$d.jsx)(yu,{name:"check-circle",size:15,stroke:2.5})}),(0,$d.jsxs)("div",{className:"acc-row-content",children:[(0,$d.jsx)("div",{className:"acc-row-head keeps",children:"Vad ni beh\xe5ller"}),(0,$d.jsx)("p",{className:"acc-row-text",children:"Teams, Exchange, desktop Office, SharePoint, 1\xa0TB\xa0OneDrive/anv\xe4ndare"})]})]}),(0,$d.jsxs)("div",{className:"acc-row",children:[(0,$d.jsx)("span",{className:"acc-row-icon",style:{color:"#A8761A"},children:(0,$d.jsx)(yu,{name:"alert-triangle",size:15,stroke:2.5})}),(0,$d.jsxs)("div",{className:"acc-row-content",children:[(0,$d.jsx)("div",{className:"acc-row-head loses",children:"Vad ni tappar"}),(0,$d.jsx)("p",{className:"acc-row-text",children:"Intune MDM (centraliserad enhetshantering) och Defender for Business (endpoint-s\xe4kerhet)"})]})]}),(0,$d.jsxs)("p",{className:"acc-disclaimer",children:["Passar bolag utan aktiv MDM-policy eller externt hanterat s\xe4kerhetsansvar. \xc4r ni os\xe4kra \u2014 beh\xe5ll Premium och spara \xe4nd\xe5 ",Qm(null!==(zt=Jt.recommendation.netSaving)&&void 0!==zt?zt:0),"\xa0kr/\xe5r."]}),(0,$d.jsxs)("div",{className:"acc-combined",children:[(0,$d.jsx)("span",{className:"acc-combined-label",children:"Totalt om ni g\xf6r b\xe5da \xe5tg\xe4rderna"}),(0,$d.jsxs)("span",{className:"acc-combined-amount",children:["ca +",Qm((null!==(_t=Jt.recommendation.netSaving)&&void 0!==_t?_t:0)+Math.round(.8*Jt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]})]}),(0,$d.jsx)("div",{className:"acc-cta",children:(0,$d.jsx)(Md,{as:vs,to:"/connect",$variant:"gradient",$size:"sm",children:"Inkludera i bytet \u2192"})})]})]})]})," "]}),ka&&(0,$d.jsxs)(zm,{children:[(0,$d.jsx)("div",{className:"switch-eyebrow",children:"Arvo Switch"}),(0,$d.jsx)("h3",{children:"Priset \xe4r verifierat. Arvo f\xf6rbereder bytet."}),(0,$d.jsx)("p",{className:"sub",children:"Priset \xe4r leverant\xf6rens officiella avtalspris \u2014 verifierat och tillg\xe4ngligt utan f\xf6rhandling. Ni beh\xf6ver inte kontakta er nuvarande leverant\xf6r \u2014 Arvo f\xf6rbereder hela bytet."}),(0,$d.jsxs)("div",{className:"switch-steps",children:[(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"1"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Ni aktiverar bytet"}),(0,$d.jsx)("span",{className:"step-detail",children:"Ett klick \u2014 Arvo tar det d\xe4rifr\xe5n."})]})]}),(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"2"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Arvo f\xf6rbereder allt"}),(0,$d.jsx)("span",{className:"step-detail",children:"Fullmakt och bytesplan i er inkorg inom 24 timmar \u2014 ni granskar och signerar."})]})]}),(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"3"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Nytt avtalspris aktivt"}),(0,$d.jsx)("span",{className:"step-detail",children:"Ni betalar 20\xa0% av den identifierade besparingen \u2014 inget annat."})]})]})]}),(0,$d.jsxs)("div",{className:"switch-offer",children:[(0,$d.jsxs)("div",{className:"switch-offer-head",children:[(0,$d.jsx)("span",{className:"switch-badge",children:(0,$d.jsx)(yu,{name:"check",size:13,stroke:2.5})}),(0,$d.jsxs)("div",{className:"switch-supplier",children:[(0,$d.jsx)("p",{className:"switch-supplier-name",children:ma?Jt.recommendation.suggestedSupplier:ga}),(0,$d.jsxs)("span",{className:"switch-price-label",children:[(0,$d.jsx)(yu,{name:"shield",size:10,stroke:2}),ma?"Verifierat listpris":"Arvo-verifierad leverant\xf6r"]})]})]}),(0,$d.jsxs)("div",{className:"switch-offer-body",children:[(0,$d.jsxs)("div",{className:"sp-from-row",children:[(0,$d.jsxs)("span",{className:"sp-old",children:[Ih(Vn),"/\xe5r"]}),(0,$d.jsx)("span",{className:"sp-from-arrow",children:"\u2192"})]}),(0,$d.jsxs)("span",{className:"sp-new",children:[Qm(Jt.recommendation.suggestedAnnualCost),(0,$d.jsx)("small",{children:"kr/\xe5r"})]}),(0,$d.jsxs)("span",{className:"sp-save-note",children:["Ni sparar ",Ih(Un),"/\xe5r \u2014 Arvo tar 20\xa0% av det"]})]})]}),(0,$d.jsxs)(Md,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{mr($r||""),gr("idle"),pr(!0)},children:[ya," ",(0,$d.jsx)(yu,{name:"arrow",size:16})]})]}),(0,$d.jsxs)(qm,{children:[(0,$d.jsx)("div",{className:"eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h3",{children:"Det h\xe4r var en faktura."}),(0,$d.jsxs)("div",{className:"briefing-preview",children:[(0,$d.jsxs)("div",{className:"preview-header",children:[(0,$d.jsxs)("span",{children:[(0,$d.jsx)("span",{className:"preview-live-dot"}),(0,$d.jsx)("span",{className:"preview-brand-name",children:"Arvo Intelligence"})]}),(0,$d.jsx)("span",{className:"preview-time",children:"Exempel ur en briefing"})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(yu,{name:"pulse",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Smygh\xf6jningslarm"}),(0,$d.jsxs)("div",{className:"signal-line",children:["Telia \xb7 Mobilflotta 24 abonnemang",(0,$d.jsx)("span",{className:"signal-badge",children:"+11\xa0%"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Pris h\xf6jt mot f\xf6reg\xe5ende period \u2014 utan avisering. S\xe5 h\xe4r ser larmet ut n\xe4r det h\xe4nder er."})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(yu,{name:"benchmark",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Community Benchmark"}),(0,$d.jsx)("div",{className:"bench-grid",children:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(e=>(0,$d.jsx)("span",{className:[0,2,3,5,8,9,11,13].includes(e)?"on":""},e))}),(0,$d.jsxs)("p",{className:"signal-sub",children:[(0,$d.jsx)("strong",{children:"8 av 15"})," bolag i samma kohort fick h\xf6jningen \u2014 Arvo ser m\xf6nstret innan det n\xe5r er."]})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(yu,{name:"calendar-clock",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Proaktiv avtalsbevakning"}),(0,$d.jsxs)("div",{className:"signal-line",children:["Avtalsbevakning \xb7 varnar 90 dagar f\xf6re f\xf6rnyelse",(0,$d.jsx)("span",{className:"signal-badge signal-badge--contract",children:"F\xf6rnyelse"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Arvo varnar automatiskt \u2014 och f\xf6rbereder bytet p\xe5 er beg\xe4ran."})]})]})]}),(0,$d.jsxs)("div",{className:"price-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"price",children:"1 995 kr"}),(0,$d.jsx)("span",{className:"price-period",children:"/ m\xe5n"})]}),(0,$d.jsx)("span",{className:"price-note",children:"Ingen bindningstid"})]}),(0,$d.jsx)(Md,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{an(null!==$r&&void 0!==$r?$r:""),sn("idle"),rn(!0)},children:"Aktivera Arvo Intelligence \u2192"}),(0,$d.jsx)("p",{style:{fontSize:12,color:"#8A9E98",textAlign:"center",marginTop:10,lineHeight:1.5},children:"Arvo s\xf6ker igenom er inkorg \u2014 ni beh\xf6ver inte lyfta ett finger."})]}),(0,$d.jsxs)(Ym,{children:[(0,$d.jsx)("div",{className:"pb-eyebrow",children:"Helhetsbilden"}),(0,$d.jsx)("h2",{className:"pb-head",children:"Arvo bevakar \xe5tta kostnadskategorier. Den h\xe4r fakturan var en."}),(0,$d.jsx)("div",{className:"pb-grid",children:tf.map(e=>{var t;const r=e.cats.includes(null===(t=Jt.categorized)||void 0===t?void 0:t.category);return(0,$d.jsxs)("div",{className:"pb-seg"+(r?" lit":""),children:[(0,$d.jsx)("span",{className:"pb-seg-ico",children:(0,$d.jsx)(yu,{name:e.icon,size:20,stroke:1.8})}),(0,$d.jsx)("span",{className:"pb-seg-label",children:e.short})]},e.label)})}),(0,$d.jsxs)("div",{className:"pb-foot",children:[(0,$d.jsx)("p",{className:"pb-note",children:"En faktura s\xe4ger en sak. Hela reskontran s\xe4ger var ni faktiskt bl\xf6der. Vidarebefordra era leverant\xf6rsfakturor s\xe5 kartl\xe4gger Arvo varje leverant\xf6r \u2014 och hittar varenda besparing, inte bara den h\xe4r."}),(0,$d.jsxs)(vs,{to:"/portfolio",className:"pb-link",children:["Kartl\xe4gg er reskontra ",(0,$d.jsx)(yu,{name:"arrow",size:15,stroke:2})]})]})]}),(0,$d.jsx)("p",{style:{textAlign:"center",fontSize:12,color:"#8A9E98",marginBottom:8},children:"sent"===Jr?(0,$d.jsx)("span",{style:{color:"#1B7A6E"},children:"\u2713 Noterat \u2014 vi justerar modellen"}):(0,$d.jsxs)($d.Fragment,{children:["Felklassificerad faktura?"," ",(0,$d.jsx)("button",{onClick:()=>(async e=>{if("idle"===Jr){Qr(e),Xr("submitting");try{var t,r;await fetch("/api/feedback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fingerprint:await Xm().catch(()=>""),supplier:null===Jt||void 0===Jt||null===(t=Jt.extracted)||void 0===t?void 0:t.supplier,category:null===Jt||void 0===Jt||null===(r=Jt.categorized)||void 0===r?void 0:r.category,vote:e})})}catch{}Xr("sent")}})("down"),disabled:"idle"!==Jr,style:{background:"none",border:"none",padding:0,cursor:"pointer",fontSize:12,color:"#5C6E68",textDecoration:"underline",textUnderlineOffset:2,fontFamily:"inherit"},children:"Ber\xe4tta \u2192"})]})})]})]}),(0,$d.jsx)(vu,{}),br&&(0,$d.jsx)(Fm,{children:(0,$d.jsxs)(Tm,{children:["saving_limit"===wr?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Ni har hittat er besparing \u2014 nu \xe4r det dags att ",(0,$d.jsx)("em",{children:"realisera"})," den."]}),(0,$d.jsx)("p",{className:"sub",children:"Arvo har identifierat besparingar i era fakturor. Koppla Fortnox eller Visma s\xe5 analyserar vi hela er leverant\xf6rsreskontra och sk\xf6ter varje byte \u2014 fr\xe5n upps\xe4gning till nytt avtal."})]}):"saving"===wr?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{className:"gate-saving",children:[(0,$d.jsx)("span",{className:"gate-saving-label",children:"M\xf6jlig nettobesparing"}),(0,$d.jsxs)("span",{className:"gate-saving-amount",children:["+",Ih(null!==(Nt=null===Jt||void 0===Jt||null===(Et=Jt.recommendation)||void 0===Et?void 0:Et.netSaving)&&void 0!==Nt?Nt:0)]}),(0,$d.jsxs)("span",{className:"gate-saving-context",children:[null===Jt||void 0===Jt||null===(At=Jt.extracted)||void 0===At?void 0:At.supplier,null!==Jt&&void 0!==Jt&&null!==(Ct=Jt.categorized)&&void 0!==Ct&&Ct.category?` \xb7 ${null!==(Dt=Hh(Jt.categorized.category).label)&&void 0!==Dt?Dt:Jt.categorized.category}`:""]})]}),(0,$d.jsx)("p",{className:"sub",children:"Ange din e-post \u2014 vi skickar analysen direkt och en r\xe5dgivare kontaktar dig f\xf6r att realisera besparingen."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Redo att ",(0,$d.jsx)("em",{children:"g\xe5 vidare"}),"?"]}),(0,$d.jsx)("p",{className:"sub",children:"Koppla Fortnox / Visma f\xf6r en komplett analys av hela er leverant\xf6rsreskontra \u2014 Arvo sk\xf6ter varje byte fr\xe5n upps\xe4gning till nytt avtal."})]}),(0,$d.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),!$r||_r)return;Nr(!0);const t=$r.trim().toLowerCase();if(localStorage.setItem("arvo_gate_email",t),"saving"===wr){try{Jt&&await En(t)}catch{}yr(!1),Nr(!1)}else Nr(!1),window.location.href="/connect"},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:$r,onChange:e=>zr(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Md,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:_r||!$r,children:_r?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(xm,{})," Skickar\u2026"]}):"saving"===wr?(0,$d.jsxs)($d.Fragment,{children:["Skicka analysen ",(0,$d.jsx)(yu,{name:"arrow",size:16})]}):(0,$d.jsxs)($d.Fragment,{children:["Koppla Fortnox / Visma ",(0,$d.jsx)(yu,{name:"arrow",size:16})]})}),(0,$d.jsx)("p",{className:"fine-print",children:"saving"===wr?"Ingen spam. Inga bindningstider. Ni betalar 20 % av realiserad besparing \u2014 f\xf6rst n\xe4r den syns i era b\xf6cker.":"Ingen spam. Inga fasta avgifter. Vi kontaktar dig bara om det finns besparingar att h\xe4mta."}),"saving_limit"===wr&&(0,$d.jsx)("p",{className:"fine-print",style:{marginTop:"8px",fontStyle:"italic"},children:"Ni har provat Arvo. Nu l\xe5ter vi siffrorna tala \u2014 utan kostnad tills ni sparar."})]})]})}),ur&&Jt&&(0,$d.jsx)(Fm,{onClick:e=>{e.target===e.currentTarget&&pr(!1)},children:(0,$d.jsxs)(Tm,{children:[(0,$d.jsx)("button",{className:"close",onClick:()=>{pr(!1)},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===fr?(0,$d.jsxs)("div",{className:"sent-state",children:[(0,$d.jsx)("span",{className:"sent-icon",children:(0,$d.jsx)(yu,{name:"check",size:20,stroke:2.5})}),(0,$d.jsx)("p",{className:"sent-title",children:ba?"Optimeringen \xe4r aktiverad.":"Bytet \xe4r aktiverat."}),(0,$d.jsx)("p",{className:"sent-sub",children:"Arvo tar det h\xe4rifr\xe5n \u2014 ni h\xf6r av oss inom 48 timmar."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("p",{className:"bk-title",children:["Allt \xe4r f\xf6rberett.",(0,$d.jsx)("br",{}),"Er signatur aktiverar det."]}),(0,$d.jsxs)("div",{className:"bk-offer",children:[(0,$d.jsxs)("div",{className:"bk-offer-top",children:[(0,$d.jsx)("span",{className:"bk-partner-name",children:ma?Jt.recommendation.suggestedSupplier:ga}),(0,$d.jsxs)("span",{className:"bk-verified",children:[(0,$d.jsx)(yu,{name:"shield",size:10,stroke:2}),ma?"Verifierat listpris":"Arvo-verifierad leverant\xf6r"]})]}),(0,$d.jsxs)("div",{className:"bk-price-row",children:[(0,$d.jsxs)("span",{className:"bk-from",children:[Ih(Vn),"/\xe5r"]}),(0,$d.jsx)("span",{className:"bk-arrow",children:"\u2192"}),(0,$d.jsxs)("span",{className:"bk-to",children:[Qm(Jt.recommendation.suggestedAnnualCost)," kr/\xe5r"]})]}),(0,$d.jsxs)("p",{className:"bk-savings-row",children:["Ni sparar ",Ih(Un)," \xb7 Arvo ",Ih(Kn)]})]}),$r||hr?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("p",{className:"bk-email-confirm",children:["Bekr\xe4ftelse till: ",(0,$d.jsx)("strong",{children:$r||hr})]}),(0,$d.jsx)(Md,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===fr,onClick:Cn,children:"submitting"===fr?"Aktiverar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Signera med BankID ",(0,$d.jsx)(yu,{name:"arrow",size:16})]})})]}):(0,$d.jsxs)("form",{className:"modal-form",onSubmit:Cn,children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:hr,onChange:e=>mr(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Md,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===fr,children:"submitting"===fr?"Aktiverar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Signera med BankID ",(0,$d.jsx)(yu,{name:"arrow",size:16})]})})]}),(0,$d.jsx)("p",{className:"bk-fine-print",children:"Du har 24 timmars \xe5ngerr\xe4tt."})]})]})}),Ir&&Jt&&(0,$d.jsx)(Fm,{onClick:e=>{e.target===e.currentTarget&&(Mr(!1),Kr("idle"))},children:(0,$d.jsxs)(Tm,{children:[(0,$d.jsx)("button",{className:"close",onClick:()=>{Mr(!1),Kr("idle")},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===Ur?(0,$d.jsxs)("div",{className:"sent-state",children:[(0,$d.jsx)("span",{className:"sent-icon",children:(0,$d.jsx)(yu,{name:"check",size:20,stroke:2.5})}),(0,$d.jsx)("p",{className:"sent-title",children:"Analysen \xe4r skickad!"}),(0,$d.jsxs)("p",{className:"sent-sub",children:["Vi har skickat analysen till ",Br,"."]})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Ladda ner er ",(0,$d.jsx)("em",{children:"analys"})]}),(0,$d.jsx)("p",{className:"sub",children:"Ange er e-post s\xe5 skickar vi en sammanfattning av analysen direkt till er inkorg."}),(0,$d.jsxs)("div",{className:"context-badge",children:[Jt.extracted.supplier," \xb7 ",Hh(null===(Ft=Jt.categorized)||void 0===Ft?void 0:Ft.category).label]}),(0,$d.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),Br&&"idle"===Ur){Kr("submitting");try{await En(Br),Kr("sent")}catch{Kr("error")}}},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:Br,onChange:e=>Vr(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Md,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===Ur,children:"submitting"===Ur?"Skickar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Skicka analysen ",(0,$d.jsx)(yu,{name:"arrow",size:16})]})}),"error"===Ur&&(0,$d.jsx)("p",{className:"fine-print",style:{color:"red"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$d.jsx)("p",{className:"fine-print",children:"Ingen spam. Vi skickar analysen direkt till din inkorg."})]})]})]})}),tn&&(0,$d.jsx)(Fm,{onClick:e=>{e.target===e.currentTarget&&rn(!1)},children:(0,$d.jsxs)(Om,{children:[(0,$d.jsx)("button",{className:"ac-close",onClick:()=>rn(!1),"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===on?(0,$d.jsxs)("div",{className:"ac-success",children:[(0,$d.jsx)("div",{className:"ac-check",children:"\u2713"}),(0,$d.jsx)("h3",{children:"Briefing p\xe5 v\xe4g"}),(0,$d.jsx)("p",{className:"ac-email-sent",children:nn||$r}),(0,$d.jsxs)("p",{className:"ac-success-sub",children:["Er Arvo Intelligence-briefing f\xf6r ",null!==(Tt=null===Jt||void 0===Jt||null===(Ot=Jt.extracted)||void 0===Ot?void 0:Ot.supplier)&&void 0!==Tt?Tt:"er leverant\xf6r"," \xe4r skickad. Koppla er inkorg s\xe5 bevakar Arvo alla era leverant\xf6rsfakturor l\xf6pande."]}),(0,$d.jsx)("span",{className:"ac-upgrade-label",children:"Koppla er inkorg"}),(0,$d.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(nn||$r)}`,className:"ac-oauth-btn",style:{marginBottom:9,display:"flex"},children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(nn||$r)}`,className:"ac-oauth-btn",style:{display:"flex"},children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsx)("p",{className:"ac-privacy",children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{className:"ac-eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h2",{className:"ac-heading",children:"Arvo s\xf6ker igenom er inkorg"}),(0,$d.jsx)("p",{className:"ac-sub",children:"Koppla Gmail eller Outlook \u2014 Arvo s\xf6ker er inkorg efter leverant\xf6rsfakturor och skickar er f\xf6rsta fullst\xe4ndiga briefing inom en timme."}),(0,$d.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(nn||$r)}`,className:"ac-oauth-btn",children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(nn||$r)}`,className:"ac-oauth-btn",children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsx)("div",{className:"ac-divider",children:"eller b\xf6rja nu"}),(0,$d.jsxs)("form",{onSubmit:async e=>{var t,r,n,a,i,o;e.preventDefault();const s=nn.trim()||$r.trim();if(!s||"submitting"===on)return;sn("submitting");const l=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(!e)return"";const r=e.match(/[^.!?]+[.!?]+/g)||[];return 0===r.length?e.length>200?e.slice(0,200).trimEnd()+"\u2026":e:r.slice(0,t).join(" ").trim()}(null!==Jt&&void 0!==Jt&&null!==(t=Jt.categorized)&&void 0!==t&&t.category&&Hh(Jt.categorized.category).isRealPrice?null!==(r=null===Jt||void 0===Jt||null===(n=Jt.recommendation)||void 0===n?void 0:n.reasoning)&&void 0!==r?r:"":Zm(null!==(a=null===Jt||void 0===Jt||null===(i=Jt.recommendation)||void 0===i?void 0:i.reasoning)&&void 0!==a?a:"",null===Jt||void 0===Jt||null===(o=Jt.recommendation)||void 0===o?void 0:o.suggestedSupplier));try{var c,d,u,p;if(!(await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,supplier:null===Jt||void 0===Jt||null===(c=Jt.extracted)||void 0===c?void 0:c.supplier,normalizedSupplier:null===Jt||void 0===Jt||null===(d=Jt.categorized)||void 0===d?void 0:d.normalizedSupplier,category:null===Jt||void 0===Jt||null===(u=Jt.categorized)||void 0===u?void 0:u.category,annualCost:Vn,suggestedAnnualCost:null===Jt||void 0===Jt||null===(p=Jt.recommendation)||void 0===p?void 0:p.suggestedAnnualCost,grossSaving:Un,netSaving:Hn,arvoFee:Kn,reasoning:l,diagScore:Zn,diagLabel:null===ea||void 0===ea?void 0:ea.label,diagInsight:ca})})).ok)throw new Error;sn("sent")}catch{sn("error")}},children:[(0,$d.jsxs)("div",{className:"ac-email-row",children:[(0,$d.jsx)("input",{className:"ac-email-input",type:"email",placeholder:"er@foretag.se",value:nn||$r,onChange:e=>an(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)(Md,{type:"submit",$variant:"gradient",$size:"md",disabled:"submitting"===on,style:{flexShrink:0},children:"submitting"===on?"\u2026":"Skicka \u2192"})]}),"error"===on&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#C41E1E",marginTop:8},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$d.jsx)("p",{className:"ac-privacy",children:"Vi skickar er f\xf6rsta Intelligence-briefing omedelbart \u2014 baserad p\xe5 denna analys. Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})]})})]})},lf=[[/\btelia\b/i,"Telia"],[/\btele\s*2\b/i,"Tele2"],[/\btelenor\b/i,"Telenor"],[/\bmicrosoft\b/i,"Microsoft"],[/\bgoogle\b/i,"Google"],[/\badobe\b/i,"Adobe"],[/\bdustin\b/i,"Dustin"]];function cf(e){return function(e){const t=String(e||"").trim();if(!t)return"Ok\xe4nd leverant\xf6r";for(const[r,n]of lf)if(r.test(t))return n;return t}(e.normalized_supplier||e.supplier)}function df(e){var t,r;if("monitoring"===e.route)return 72;if(null!=e.health_score&&Number.isFinite(Number(e.health_score))){var n;const t=Number(e.health_score);return e.should_switch&&(null!==(n=e.net_saving)&&void 0!==n?n:0)>0?Math.min(t,79):t}const a=null!==(t=e.gross_saving)&&void 0!==t?t:null!=e.net_saving?e.net_saving/.8:0;if(!e.should_switch||!e.annual_cost||!(a>0))return e.annual_cost>0?75:50;const i=Math.round(a/e.annual_cost*100),o=Math.max(5,Math.round(100-1.5*i));return(null!==(r=e.net_saving)&&void 0!==r?r:0)>0?Math.min(o,79):o}const uf=vd.section`
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
  }
  .rv-title {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}}; font-weight: 600; font-size: 17px;
    color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; line-height: 1.25;
  }
  .rv-detail { font-size: 13.5px; line-height: 1.5; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}}; margin-top: 3px; }
  .rv-source {
    font-family: ${e=>{let{theme:t}=e;return t.font.mono}}; font-size: 11px; letter-spacing: .01em;
    color: ${e=>{let{theme:t}=e;return t.dossier.faintOnDark}}; margin-top: 6px; word-break: break-word;
  }
  .rv-source b { color: ${e=>{let{theme:t}=e;return t.dossier.teal}}; font-weight: 600; }

  .rv-foot {
    margin: 16px 0 0; padding-top: 14px; border-top: 1px solid ${e=>{let{theme:t}=e;return t.dossier.hairlineOnDark}};
    font-size: 13px; line-height: 1.55; color: ${e=>{let{theme:t}=e;return t.dossier.mutedOnDark}};
    b { color: ${e=>{let{theme:t}=e;return t.dossier.inkOnDark}}; }
  }
`,pf=vd.form`
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
`;function hf(e){let{email:t,setEmail:r,onSubmit:n,loading:a,reveal:i,note:o}=e;return(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(pf,{onSubmit:n,children:[(0,$d.jsx)("div",{className:"rp-k",children:"Innan f\xf6rsta fakturan"}),(0,$d.jsxs)("p",{className:"rp-lede",children:["Ett underlag om ert bolag ligger redan framme. Ange er ",(0,$d.jsx)("b",{children:"f\xf6retagsmejl"}),", s\xe5 \xf6ppnar vi det \u2014 h\xe4mtat ur \xf6ppna k\xe4llor."]}),(0,$d.jsxs)("div",{className:"rp-row",children:[(0,$d.jsx)("input",{type:"email",inputMode:"email",autoComplete:"email",placeholder:"namn@ertbolag.se",value:t,onChange:e=>r(e.target.value),disabled:a}),(0,$d.jsx)("button",{type:"submit",disabled:a||!t.trim(),children:a?"\xd6ppnar\u2026":"\xd6ppna underlaget \u2192"})]}),o&&(0,$d.jsx)("p",{className:"rp-note",children:o})]}),i&&(0,$d.jsx)(mf,{domain:i.domain,findings:i.findings})]})}function mf(e){let{domain:t,findings:r}=e;return t&&null!==r&&void 0!==r&&r.length?(0,$d.jsxs)(uf,{children:[(0,$d.jsxs)("div",{className:"rv-eyebrow",children:["Underlag \xb7 ",t]}),r.map((e,t)=>(0,$d.jsxs)("div",{className:"rv-find",children:[(0,$d.jsx)("div",{className:"rv-title",children:e.title}),e.detail&&(0,$d.jsx)("div",{className:"rv-detail",children:e.detail}),(0,$d.jsxs)("div",{className:"rv-source",children:[(0,$d.jsx)("b",{children:"K\xe4lla:"})," ",e.source]})]},t)),(0,$d.jsxs)("p",{className:"rv-foot",children:["Allt ovan \xe4r ",(0,$d.jsx)("b",{children:"offentlig information"}),", sammanst\xe4lld p\xe5 sekunder \u2014 innan ni loggat in, utan att ni l\xe4mnat ifr\xe5n er n\xe5got. T\xe4nk er vad vakten ser den dag ni delar en faktura."]})]}):null}const ff=vd.div`
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
`;function gf(e){let{email:t,onLogout:r}=e;const[a,i]=(0,n.useState)(""),[o,s]=(0,n.useState)(!1),[l,c]=(0,n.useState)(!1);if(t)return(0,$d.jsxs)(ff,{children:[(0,$d.jsxs)("span",{className:"ab-who",children:[(0,$d.jsx)("span",{className:"ab-dot"}),"Inloggad som ",(0,$d.jsx)("b",{children:t})]}),(0,$d.jsx)("button",{className:"ab-out",onClick:r,children:"Logga ut"})]});return(0,$d.jsx)(ff,{children:(0,$d.jsxs)("form",{onSubmit:async function(e){e.preventDefault();const t=a.trim();if(t&&!l){c(!0);try{await fetch("/api/auth/request-magic-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,dest:"portfolio"})}),s(!0)}catch{s(!0)}finally{c(!1)}}},children:[(0,$d.jsx)("div",{className:"ab-k",children:"Redan kund?"}),o?(0,$d.jsxs)("p",{className:"ab-msg",children:["Kolla er inkorg \u2014 en inloggningsl\xe4nk \xe4r p\xe5 v\xe4g till ",(0,$d.jsx)("b",{children:a.trim()}),". Den \xf6ppnar ert kontor p\xe5 vilken enhet som helst."]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("input",{type:"email",inputMode:"email",autoComplete:"email",placeholder:"Logga in med er f\xf6retagsmejl",value:a,onChange:e=>i(e.target.value),disabled:l}),(0,$d.jsx)("button",{className:"ab-in",type:"submit",disabled:l||!a.trim(),children:l?"Skickar\u2026":"Skicka l\xe4nk"})]})]})})}const xf=wd.font.mono,vf=wd.font.display,bf=jd`from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); }`,yf=jd`to { transform: rotate(360deg); }`,kf=(jd`0%,100% { opacity:.25; } 50% { opacity:1; }`,jd`0%,100% { opacity:.6; } 50% { opacity:1; }`),jf=(jd`0% { background-position:-200% 0; } 100% { background-position:200% 0; }`,function(){return fd`opacity:0; animation:${bf} .7s ${arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}s cubic-bezier(0.16,1,0.3,1) forwards;`}),wf=vd.main`
  min-height: 100vh;
  background: ${wd.dossier.bg};
  font-family: ${wd.font.sans};
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow: hidden;
  &::before {
    content: ''; position: absolute; inset: 0;
    background: ${wd.dossier.aurora};
    pointer-events: none;
  }
  &::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: ${wd.dossier.keyline}; opacity: .85;
  }
`,Sf=vd.div`
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 22px 90px;
  @media (min-width: 768px) { padding: 56px 32px 120px; }
`,$f=(vd.div`
  position: relative; z-index: 2;
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${xf}; font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
  color: ${wd.dossier.faintOnDark};
  border: 1px solid ${wd.dossier.hairlineOnDark};
  border-radius: ${wd.size.radius.pill};
  padding: 6px 14px; margin-bottom: 28px;
  span.dot { width: 5px; height: 5px; border-radius: 50%; background: ${wd.dossier.tealBright}; }
`,vd.div`
  display: flex; align-items: flex-start; justify-content: space-between; gap: 28px;
  ${jf(0)}
  @media (max-width: 820px) { flex-direction: column; gap: 22px; }
`),zf=vd.div`
  .brand {
    font-family: ${xf}; font-size: 11px; font-weight: 600;
    letter-spacing: .40em; text-indent: .40em; color: ${wd.dossier.tealBright};
    margin-bottom: 16px;
  }
  .confidential {
    font-family: ${xf}; font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    color: ${wd.dossier.faintOnDark}; margin-bottom: 18px;
  }
  /* Hälsningen — borttagen av misstag i dom-först-omstruktureringen (2026-06-30) när den
     tävlande statusrubriken ("Allt är under kontroll") rensades bort. De satt i samma <h1>,
     men hälsningen är RELATION (välkomnande), inte INFORMATION (statuspåstående) — den ska
     finnas kvar, bara tyst underordnad domen, inte tävla med den. */
  .greeting {
    font-family: ${vf}; font-weight: 500; font-size: clamp(17px, 2vw, 21px);
    color: ${wd.dossier.faintOnDark}; margin-bottom: 22px;
  }
  h1 {
    font-family: ${vf}; font-weight: 700; line-height: 1.02; letter-spacing: -.03em;
    font-size: clamp(40px, 7vw, 62px); margin: 0;
    color: ${wd.dossier.inkOnDark};
    background: ${wd.dossier.metallicText};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
`,_f=vd.div`
  flex-shrink: 0; width: 300px; max-width: 100%;
  border: 1px solid ${wd.dossier.hairlineOnDark};
  border-radius: ${wd.size.radius.lg};
  background: ${wd.dossier.bgRaised};
  padding: 18px 20px;
  @media (max-width: 820px) { width: 100%; }

  .radar-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .disc { position: relative; width: 46px; height: 46px; flex-shrink: 0; }
  .disc svg { position: absolute; inset: 0; }
  .disc .sweep {
    position: absolute; inset: 0; border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(93,214,202,.0) 270deg, rgba(93,214,202,.55) 360deg);
    animation: ${yf} 3.2s linear infinite;
    mask: radial-gradient(circle, #000 62%, transparent 63%);
    -webkit-mask: radial-gradient(circle, #000 62%, transparent 63%);
  }
  .radar-title {
    font-family: ${xf}; font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
    color: ${wd.dossier.mutedOnDark}; line-height: 1.5;
    strong { color: ${wd.dossier.inkOnDark}; display: block; letter-spacing: .14em; }
  }
  /* Minimal separation (variant C): två namngivna grupper i SAMMA kort — era avtal vs marknaden.
     Hårfin men SYNLIG mono-etikett (faintOnDark, inte osynlig) så de två sanningarna aldrig blandas. */
  .rgroup-label { font-family: ${xf}; font-size: 9.5px; letter-spacing: .2em; text-transform: uppercase;
    color: ${wd.dossier.faintOnDark}; margin-bottom: 9px; }
  .radar-stats { display: flex; flex-direction: column; gap: 7px; }
  .rstat {
    display: flex; align-items: baseline; justify-content: space-between;
    font-size: 12px; color: ${wd.dossier.mutedOnDark};
    span.v { font-family: ${xf}; color: ${wd.dossier.inkOnDark}; font-feature-settings:'tnum'; }
  }
  .radar-foot {
    margin-top: 16px; padding-top: 14px; border-top: 1px solid ${wd.dossier.hairlineOnDark};
    display: flex; flex-direction: column; align-items: flex-start;
    font-size: 12px; color: ${wd.dossier.inkOnDark};
    .foot-line { display: flex; align-items: baseline; gap: 8px; line-height: 1.5;
      b { color: ${wd.dossier.inkOnDark}; font-weight: 600; } }
    .live { flex-shrink: 0; transform: translateY(2px); width: 7px; height: 7px; border-radius: 50%;
      background: ${wd.dossier.tealBright}; box-shadow: ${wd.dossier.glow}; animation: ${kf} 2.4s ease-in-out infinite; }
  }
`,Nf=vd.section`
  margin-top: 26px; padding: 0 0 4px;
  ${jf(.04)}

  .eyebrow {
    font-family: ${xf}; font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: ${wd.dossier.teal}; margin-bottom: 18px;
    display: flex; align-items: center; gap: 12px;
  }
  .eyebrow::after { content:''; flex:1; height:1px; background:${wd.dossier.hairlineOnDark}; }

  /* h1 = det fyllda rummet (sidans ENDA rubrik, domen leder — hjälte-vikt).
     h2 = tomma-kontoret-läget (Ident äger redan sidans h1 där — domen blir subordinerad, oförändrad storlek). */
  h1, h2 {
    font-family: ${vf}; font-weight: 700; letter-spacing: -.025em;
    line-height: 1.05; margin: 0 0 20px; max-width: 20ch; color: ${wd.dossier.inkOnDark};
  }
  h1 { font-size: clamp(36px, 6.4vw, 58px); }
  h2 { font-size: clamp(30px, 5vw, 48px); font-weight: 600; }
  h1 em, h2 em { font-style: normal; color: ${wd.dossier.tealBright}; }

  p.work {
    font-size: 16px; line-height: 1.7; color: ${wd.dossier.mutedOnDark};
    max-width: 56ch; margin: 0 0 22px;
    b { color: ${wd.dossier.inkOnDark}; font-weight: 600; }
  }
`,Ef=vd.section`
  margin-top: 36px; padding-top: 26px;
  border-top: 1px solid ${wd.dossier.hairlineOnDark};
  ${jf(.1)}
  .ev-eyebrow {
    font-family: ${xf}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wd.dossier.faintOnDark}; margin-bottom: 18px;
  }
`,Af=vd.span`
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${xf}; font-size: 11px; letter-spacing: .04em;
  color: ${wd.dossier.mutedOnDark};
  border: 1px solid ${wd.dossier.hairlineOnDark};
  border-radius: ${wd.size.radius.pill};
  padding: 7px 14px;
  .pct { color: ${wd.dossier.tealBright}; font-weight: 600; }
`,Cf=vd.div`
  margin-top: 40px;
  display: grid; gap: 18px;
  grid-template-columns: minmax(0,1fr);
  ${jf(.16)}
  @media (min-width: 880px) { grid-template-columns: 1.25fr 1fr; }
`,Df=fd`
  position: relative;
  background: ${wd.dossier.bgRaised};
  border: 1px solid ${wd.dossier.hairlineOnDark};
  border-radius: ${wd.size.radius.lg};
  padding: 26px 26px 24px;
`,Ff=vd.div`
  ${Df}
  grid-column: ${e=>{let{$full:t}=e;return t?"1 / -1":"auto"}};

  .card-eyebrow {
    font-family: ${xf}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wd.dossier.teal}; margin-bottom: 16px;
    display: flex; align-items: center; justify-content: space-between;
    .src { color: ${wd.dossier.faintOnDark}; letter-spacing: .12em; }
  }
`,Tf=vd(Ff)`
  overflow: hidden;
  &::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(ellipse 380px 200px at 88% 0%, rgba(43,196,172,.10), transparent 70%);
  }
  h3 {
    font-family: ${vf}; font-weight: 600; font-size: clamp(21px, 2.6vw, 27px);
    line-height: 1.22; letter-spacing: -.01em; margin: 0 0 22px; max-width: 26ch;
    color: ${wd.dossier.inkOnDark};
    em { font-style: normal; color: ${wd.dossier.tealBright}; }
  }
  .bars { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
  .barrow {
    display: grid; grid-template-columns: 130px 1fr auto; align-items: center; gap: 14px;
    font-size: 13px; color: ${wd.dossier.mutedOnDark};
    @media (max-width: 480px) { grid-template-columns: 96px 1fr auto; gap: 10px; font-size: 12px; }
    .lbl { white-space: nowrap; }
    .track { height: 8px; border-radius: ${wd.size.radius.pill};
      background: rgba(255,255,255,.06); overflow: hidden; }
    .fill { height: 100%; border-radius: inherit; }
    .amt { font-family: ${xf}; font-feature-settings:'tnum'; color: ${wd.dossier.inkOnDark};
      white-space: nowrap; }
    &.you .lbl { color: ${wd.dossier.tealBright}; font-weight: 600; }
    &.you .fill { background: ${wd.dossier.numberGradient}; box-shadow: 0 0 14px rgba(93,214,202,.4); }
    &:not(.you) .fill { background: rgba(255,255,255,.22); }
  }
  .truth-note { font-size: 13px; line-height: 1.6; color: ${wd.dossier.mutedOnDark};
    padding-top: 16px; border-top: 1px solid ${wd.dossier.hairlineOnDark};
    b { color: ${wd.dossier.inkOnDark}; } }
`,Of=vd(Ff)`
  display: flex; flex-direction: column;
  .idx-main { display: flex; align-items: flex-end; gap: 14px; margin-bottom: 6px; }
  .idx-num {
    font-family: ${xf}; font-weight: 700; font-size: 72px; line-height: .9;
    letter-spacing: -.04em; font-feature-settings:'tnum';
    background: ${wd.dossier.numberGradient};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .idx-denom { font-family: ${xf}; font-size: 22px; font-weight: 500; letter-spacing: -.02em;
    color: ${wd.dossier.faintOnDark}; padding-bottom: 8px; }
  .idx-delta {
    font-family: ${xf}; font-size: 13px; color: ${wd.dossier.tealBright};
    padding-bottom: 10px; margin-left: auto; text-align: right;
    .d { display:block; } .dl { color: ${wd.dossier.faintOnDark}; font-size:11px; letter-spacing:.1em; }
  }
  .spark { display: flex; align-items: flex-end; gap: 4px; height: 34px; margin: 12px 0 18px; }
  .spark span { flex: 1; border-radius: 2px 2px 0 0; background: rgba(255,255,255,.14); }
  .spark span.hot { background: ${wd.dossier.numberGradient}; }

  /* Marknadsläge — under / i nivå / över marknaden */
  .mkt-k { font-family: ${xf}; font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
    color: ${wd.dossier.faintOnDark}; margin-bottom: 9px; }
  .mkt-track {
    position: relative; height: 6px; border-radius: ${wd.size.radius.pill};
    background: linear-gradient(90deg, rgba(159,217,206,.16), rgba(255,255,255,.08) 50%, rgba(43,196,172,.30));
    margin-bottom: 9px;
  }
  .mkt-ptr {
    position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%;
    background: ${wd.dossier.tealBright}; box-shadow: ${wd.dossier.glow};
    transform: translate(-50%, -50%);
  }
  .mkt-scale { display: flex; justify-content: space-between;
    font-family: ${xf}; font-size: 9.5px; letter-spacing: .08em; text-transform: uppercase;
    color: ${wd.dossier.faintOnDark};
    .on { color: ${wd.dossier.tealBright}; } }
  .idx-note { font-size: 12.5px; line-height: 1.6; color: ${wd.dossier.mutedOnDark};
    margin-top: 16px; b { color: ${wd.dossier.inkOnDark}; } }
`,Pf=vd(Ff)`
  .cal-row {
    display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px;
    padding: 16px 0; border-top: 1px solid ${wd.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
    @media (max-width: 480px) { grid-template-columns: auto 1fr; gap: 10px 12px; }
  }
  .cal-prob {
    font-family: ${xf}; font-size: 15px; font-weight: 600; font-feature-settings:'tnum';
    color: ${wd.dossier.tealBright};
    width: 52px; text-align: right;
    @media (max-width: 480px) { grid-row: 1 / 3; }
  }
  .cal-body {
    .t { font-size: 14.5px; color: ${wd.dossier.inkOnDark}; font-weight: 600; margin-bottom: 3px; }
    .s { font-size: 12.5px; color: ${wd.dossier.mutedOnDark}; line-height: 1.45; }
  }
  .cal-when {
    font-family: ${xf}; font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
    color: ${wd.dossier.faintOnDark}; white-space: nowrap;
    @media (max-width: 480px) { grid-column: 2; text-align: left; }
  }
`,Lf=vd(Ff)`
  .rcpt {
    display: grid; grid-template-columns: 70px 1fr; gap: 14px; align-items: baseline;
    padding: 13px 0; border-top: 1px solid ${wd.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
  }
  .rcpt .day { font-family: ${xf}; font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
    color: ${wd.dossier.teal}; }
  .rcpt .what { font-size: 13.5px; line-height: 1.5; color: ${wd.dossier.mutedOnDark};
    b { color: ${wd.dossier.inkOnDark}; font-weight: 600; } }
`,Rf=vd(Ff)`
  display: flex; flex-direction: column; justify-content: center;
  background: linear-gradient(150deg, ${wd.dossier.bgRaised} 0%, rgba(23,138,123,.16) 100%);
  .tally-k { font-family: ${xf}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wd.dossier.teal}; margin-bottom: 14px; }
  .tally-num { font-family: ${vf}; font-weight: 600; font-size: clamp(36px, 6vw, 52px);
    line-height: 1; letter-spacing: -.02em; color: ${wd.dossier.inkOnDark}; margin-bottom: 10px;
    small { font-family: ${wd.font.sans}; font-size: 16px; color: ${wd.dossier.mutedOnDark};
      font-weight: 400; margin-left: 6px; } }
  .tally-sub { font-size: 14px; line-height: 1.55; color: ${wd.dossier.mutedOnDark};
    b { color: ${wd.dossier.inkOnDark}; } }
`,If=vd.section`
  margin-top: 40px; padding-top: 28px; border-top: 1px solid ${wd.dossier.hairlineOnDark};
  ${jf(.24)}
  .h-eyebrow { font-family: ${xf}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${wd.dossier.teal}; margin-bottom: 18px; }
  .h-row {
    display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 18px;
    padding: 14px 0; border-top: 1px solid ${wd.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
    @media (max-width: 560px) { grid-template-columns: 1fr auto; gap: 6px 12px; }
  }
  .h-name { color: ${wd.dossier.inkOnDark}; font-size: 14.5px; font-weight: 600; }
  .h-cat { font-size: 12px; color: ${wd.dossier.faintOnDark}; }
  .h-cost { font-family: ${xf}; font-size: 13.5px; color: ${wd.dossier.mutedOnDark};
    font-feature-settings:'tnum'; white-space: nowrap;
    @media (max-width:560px){ grid-column:2; grid-row:1; } }
  .h-state { font-family: ${xf}; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase;
    white-space: nowrap; padding: 4px 10px; border-radius: ${wd.size.radius.pill};
    border: 1px solid ${wd.dossier.hairlineOnDark};
    &.opt { color: ${wd.dossier.tealBright}; }
    &.watch { color: ${wd.dossier.mutedOnDark}; }
    @media (max-width:560px){ grid-column:2; } }
`,Mf=vd.div`
  margin-top: 56px; text-align: center;
  .keyline { height: 1px; background: ${wd.dossier.keyline}; opacity: .5; margin-bottom: 22px; }
  .mark { font-family: ${xf}; font-size: 11px; letter-spacing: .36em; text-indent: .36em;
    color: ${wd.dossier.faintOnDark}; }
  .tagline { font-family: ${vf}; font-style: italic; font-size: 16px;
    color: ${wd.dossier.mutedOnDark}; margin-top: 14px; }
`,Bf=vd.div`
  border-top: 1px solid ${wd.dossier.hairlineOnDark};
  &:first-of-type { border-top: none; }
`,Vf=vd.button`
  width:100%; background:none; border:none; cursor:pointer; text-align:left;
  display:grid; grid-template-columns:auto 1fr auto auto auto; align-items:center; gap:16px;
  padding:15px 0; color:inherit; transition:opacity .15s;
  &:hover { opacity:.82; }
  @media (max-width: 760px){ grid-template-columns:auto 1fr auto; gap:8px 12px; padding:14px 0; }

  .h-name { color:${wd.dossier.inkOnDark}; font-size:15px; font-weight:600; letter-spacing:-.005em;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .h-cat { font-size:12px; color:${wd.dossier.faintOnDark}; margin-top:2px; }
  .h-cost { font-family:${xf}; font-size:13.5px; color:${wd.dossier.mutedOnDark};
    font-feature-settings:'tnum'; white-space:nowrap;
    @media (max-width:760px){ grid-column:2; grid-row:1; text-align:right; } }
  .h-badge { font-family:${xf}; font-size:13px; letter-spacing:.06em;
    white-space:nowrap; padding:5px 11px; border-radius:${wd.size.radius.pill};
    border:1px solid ${wd.dossier.hairlineOnDark};
    /* sparbadgen bär ett tal (kr/år) → aldrig versaler; statusord versaliseras */
    &.save { color:${wd.dossier.bg}; background:${wd.dossier.tealBright}; border-color:transparent; font-weight:600; font-feature-settings:'tnum'; }
    &.watch { color:${wd.dossier.mutedOnDark}; text-transform:uppercase; }
    /* pillen högerställs under kostnaden → kostnad + pill bildar en ren högerkolumn (i linje) */
    @media (max-width:760px){ grid-column:2; grid-row:2; justify-self:end; } }
  .h-chev { color:${wd.dossier.faintOnDark}; display:flex; transition:transform .22s ease;
    transform:${e=>{let{$open:t}=e;return t?"rotate(180deg)":"none"}};
    @media (max-width:760px){ grid-column:3; grid-row:1 / 3; } }
`,Uf=vd.div`
  position:relative; width:42px; height:42px; flex-shrink:0;
  span.v { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    font-family:${xf}; font-size:15px; font-weight:700; font-feature-settings:'tnum'; }
`,Kf=vd.div`
  padding:6px 0 24px; animation:${bf} .28s ease both;
  display:flex; flex-direction:column; gap:18px;

  /* Arvo bedömer — bara omdömet (score-ringen bor i radhuvudet, ej dubblerad) */
  .diag { padding:0 2px; }
  .diag .dbody .dtop { font-family:${xf}; font-size:10px; letter-spacing:.18em; text-transform:uppercase;
    color:${wd.dossier.teal}; margin-bottom:8px; }
  .diag .dbody .dtxt { font-size:14px; line-height:1.6; color:${wd.dossier.mutedOnDark};
    max-width:64ch; b { color:${wd.dossier.inkOnDark}; } }

  /* Faktatabell — råa tal, varje en gång */
  .facts { display:flex; flex-direction:column; gap:0;
    border-top:1px solid ${wd.dossier.hairlineOnDark}; }
  .fact { display:flex; justify-content:space-between; align-items:baseline; gap:14px;
    padding:10px 0; border-bottom:1px solid ${wd.dossier.hairlineOnDark}; font-size:13px;
    dt { color:${wd.dossier.mutedOnDark}; }
    dd { font-family:${xf}; color:${wd.dossier.inkOnDark}; font-feature-settings:'tnum'; margin:0; } }
`,Hf=(vd.div`
  border:1px solid ${wd.dossier.hairlineOnDark}; border-radius:${wd.size.radius.md};
  background: linear-gradient(160deg, rgba(43,196,172,.10), rgba(23,138,123,.04));
  padding:18px 20px; display:flex; flex-direction:column;

  .si-k { font-family:${xf}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wd.dossier.teal}; margin-bottom:14px; }
  .si-steps { display:flex; flex-direction:column; gap:14px; margin-bottom:18px; }
  .si-step { display:flex; gap:12px; align-items:flex-start; }
  .si-n { flex-shrink:0; width:22px; height:22px; border-radius:50%;
    border:1.5px solid ${wd.dossier.teal}; color:${wd.dossier.tealBright};
    font-family:${xf}; font-size:11px; font-weight:600; display:flex; align-items:center; justify-content:center; }
  .si-body { display:flex; flex-direction:column; gap:2px; }
  .si-t { display:block; font-size:13px; color:${wd.dossier.inkOnDark}; font-weight:600; line-height:1.3; }
  .si-d { display:block; font-size:12px; color:${wd.dossier.mutedOnDark}; line-height:1.45; }
  .si-offer { display:flex; align-items:baseline; gap:8px; margin-bottom:6px;
    padding-top:16px; border-top:1px solid ${wd.dossier.hairlineOnDark}; flex-wrap:wrap;
    .old { font-family:${xf}; font-size:13px; color:${wd.dossier.faintOnDark};
      text-decoration:line-through; }
    .arr { color:${wd.dossier.faintOnDark}; }
    .new { font-family:${xf}; font-size:20px; font-weight:700; font-feature-settings:'tnum';
      color:${wd.dossier.tealBright}; }
    .new small { font-family:${wd.font.sans}; font-size:12px; font-weight:400;
      color:${wd.dossier.mutedOnDark}; margin-left:3px; } }
  .si-save { font-size:12.5px; color:${wd.dossier.mutedOnDark}; line-height:1.5; margin-bottom:16px;
    b { color:${wd.dossier.inkOnDark}; font-feature-settings:'tnum'; } }
`,vd.div`
  border:1px solid ${wd.dossier.hairlineOnDark}; border-radius:${wd.size.radius.md};
  background:${wd.dossier.bgRaised}; padding:18px 20px; margin-bottom:14px;
  display:flex; flex-direction:column;

  .st-k { font-family:${xf}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wd.dossier.teal}; margin-bottom:14px; }
  .st-alt { padding:12px 0; border-top:1px solid ${wd.dossier.hairlineOnDark}; }
  .st-alt:first-of-type { border-top:none; padding-top:0; }
  .st-sup { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:14px; font-weight:600;
    color:${wd.dossier.inkOnDark}; margin-bottom:3px; }
  .st-tag { font-family:${xf}; font-size:9px; letter-spacing:.12em; text-transform:uppercase;
    color:${wd.dossier.bg}; background:${wd.dossier.teal}; border-radius:${wd.size.radius.sm};
    padding:2px 7px; }
  .st-pos { font-size:12.5px; color:${wd.dossier.mutedOnDark}; line-height:1.5; }
  .st-src { margin-top:14px; padding-top:12px; border-top:1px solid ${wd.dossier.hairlineOnDark};
    font-size:11.5px; color:${wd.dossier.faintOnDark}; line-height:1.55;
    b { color:${wd.dossier.mutedOnDark}; } }
`,vd.div`
  position:relative; border:1px solid ${wd.dossier.hairlineOnDark};
  border-radius:${wd.size.radius.md}; overflow:hidden;
  background: radial-gradient(560px 260px at 8% -22%,
      ${e=>{let{$known:t}=e;return t?"rgba(43,196,172,0.10)":"rgba(224,162,60,0.09)"}}, transparent 60%),
    ${wd.dossier.bgRaised};
  padding:22px 22px 18px; display:flex; flex-direction:column;

  .sv-eyebrow { display:flex; align-items:center; gap:9px; font-family:${xf}; font-size:10px;
    letter-spacing:.26em; text-transform:uppercase; color:${wd.dossier.faintOnDark}; margin-bottom:15px; }
  .sv-dot { flex-shrink:0; width:6px; height:6px; border-radius:50%;
    background:${e=>{let{$known:t}=e;return t?wd.dossier.teal:wd.dossier.signal}};
    box-shadow:0 0 0 4px ${e=>{let{$known:t}=e;return t?"rgba(43,196,172,0.13)":"rgba(224,162,60,0.13)"}},
      0 0 12px ${e=>{let{$known:t}=e;return t?wd.dossier.tealBright:wd.dossier.signal}}; }
  .sv-dom { font-family:${vf}; font-weight:500; font-size:clamp(20px,2.6vw,25px); line-height:1.22;
    letter-spacing:-.01em; color:${wd.dossier.inkOnDark}; margin-bottom:13px;
    em { font-style:normal; color:${e=>{let{$known:t}=e;return t?wd.dossier.teal:wd.dossier.tealBright}}; } }
  .sv-support { font-size:13.5px; line-height:1.62; color:${wd.dossier.mutedOnDark}; margin:0;
    b { color:${wd.dossier.inkOnDark}; } }

  .sv-proof { margin-top:12px; border-top:1px solid ${wd.dossier.hairlineOnDark}; }
  .sv-proof > summary { list-style:none; cursor:pointer; font-family:${xf}; font-size:10px;
    letter-spacing:.2em; text-transform:uppercase; color:${wd.dossier.teal};
    padding:13px 0 0; display:flex; align-items:center; }
  .sv-proof > summary::-webkit-details-marker { display:none; }
  .sv-proof > summary::after { content:'+'; margin-left:auto; font-size:15px; line-height:1;
    color:${wd.dossier.faintOnDark}; }
  .sv-proof[open] > summary::after { content:'\\2013'; }
  .sv-proof-body { padding-top:4px; }
  .sv-sec { padding:13px 0 2px; border-top:1px solid ${wd.dossier.hairlineOnDark}; }
  .sv-sec:first-child { border-top:none; }
  .sv-lbl { font-family:${xf}; font-size:9.5px; letter-spacing:.2em; text-transform:uppercase;
    color:${wd.dossier.faintOnDark}; margin-bottom:8px; }
  .sv-alt { margin-bottom:8px; }
  .sv-sup { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:13.5px; font-weight:600;
    color:${wd.dossier.inkOnDark}; }
  .sv-tag { font-family:${xf}; font-size:9px; letter-spacing:.12em; text-transform:uppercase;
    color:${wd.dossier.bg}; background:${wd.dossier.teal}; border-radius:${wd.size.radius.sm}; padding:2px 7px; }
  .sv-pos { display:block; font-size:12px; color:${wd.dossier.mutedOnDark}; line-height:1.5; margin-top:3px; }
  .sv-fine { margin-top:6px; font-size:11.5px; color:${wd.dossier.faintOnDark}; line-height:1.5;
    b { color:${wd.dossier.mutedOnDark}; } }
  .sv-note { font-size:12.5px; line-height:1.6; color:${wd.dossier.mutedOnDark}; margin:2px 0 0; }
  .sv-row { display:flex; justify-content:space-between; align-items:baseline; padding:7px 0; gap:14px;
    & > span:first-child { font-size:12.5px; color:${wd.dossier.mutedOnDark}; display:flex; flex-direction:column; }
    small { font-size:10.5px; color:${wd.dossier.faintOnDark}; margin-top:2px; } }
  .sv-v { font-family:${xf}; font-size:13px; color:${wd.dossier.inkOnDark}; font-feature-settings:'tnum'; white-space:nowrap; }
  .sv-keep .sv-v { font-size:15px; color:${wd.dossier.tealBright}; }

  .sv-act { margin-top:18px; }
`),Wf=vd.section`
  margin-top:40px;
  .w-eyebrow { font-family:${xf}; font-size:11px; letter-spacing:.24em; text-transform:uppercase;
    color:${wd.dossier.teal}; padding-bottom:14px; border-bottom:1px solid ${wd.dossier.hairlineOnDark}; }
  .w-manifesto { margin:16px 0 22px; font-size:14px; line-height:1.65; color:${wd.dossier.mutedOnDark};
    max-width:64ch; b { color:${wd.dossier.inkOnDark}; font-weight:700; } }
  .w-row { padding:18px 0; border-top:1px solid ${wd.dossier.hairlineOnDark}; }
  .w-row:first-of-type { border-top:none; }
  .w-top { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px; }
  .w-sup { font-size:15px; font-weight:600; color:${wd.dossier.inkOnDark}; }
  .w-kind { font-family:${xf}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${wd.dossier.faintOnDark}; border:1px solid ${wd.dossier.hairlineOnDark};
    border-radius:${wd.size.radius.sm}; padding:3px 8px; white-space:nowrap; }
  .w-head { font-family:${wd.font.display}; font-size:17px; font-weight:600; line-height:1.3;
    color:${wd.dossier.inkOnDark}; margin-bottom:7px; }
  .w-detail { margin:0 0 10px; font-size:13px; line-height:1.6; color:${wd.dossier.mutedOnDark}; max-width:68ch; }
  .w-list { font-family:${xf}; font-size:12px; letter-spacing:.02em; color:${wd.dossier.faintOnDark};
    margin-bottom:10px; line-height:1.7; }
  .w-action { font-size:12.5px; color:${wd.dossier.teal}; display:flex; gap:7px; align-items:baseline;
    .w-arrow { font-family:${xf}; } }
`,qf=vd.a`
  display:flex; align-items:center; justify-content:center; gap:8px;
  text-decoration:none; cursor:pointer;
  font-size:14px; font-weight:600; color:${wd.dossier.bg};
  background:${wd.dossier.ctaGradient}; box-shadow:${wd.dossier.ctaShadow};
  border-radius:${wd.size.radius.pill}; padding:13px 20px; border:none;
  transition:transform .15s ease, filter .15s ease;
  &:hover { transform:translateY(-1px); filter:brightness(1.05); }
`,Yf=vd.div`
  margin-top:40px; padding:30px 0 4px; border-top:1px solid ${wd.dossier.hairlineOnDark};
  ${jf(.1)}
  .iq-k { font-family:${xf}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wd.dossier.teal}; margin-bottom:14px; }
  h3 { font-family:${vf}; font-weight:600; font-size:clamp(22px,3.2vw,30px); line-height:1.16;
    letter-spacing:-.02em; margin:0 0 14px; max-width:24ch; color:${wd.dossier.inkOnDark};
    em { font-style:normal; color:${wd.dossier.tealBright}; } }
  p { font-size:15px; line-height:1.65; color:${wd.dossier.mutedOnDark}; max-width:54ch; margin:0 0 22px;
    b { color:${wd.dossier.inkOnDark}; } }
  .iq-row { display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
  /* Priset gömmer sig aldrig — krispig off-white som poppar ur mörkret */
  .iq-price { font-family:${xf}; font-size:19px; font-weight:600; letter-spacing:-.01em;
    color:${wd.dossier.inkOnDark}; font-feature-settings:'tnum';
    span { color:${wd.dossier.mutedOnDark}; font-size:12.5px; font-weight:400; letter-spacing:0; } }
`,Gf=vd.div`
  width:30px; height:30px; border:3px solid ${wd.dossier.hairlineOnDark};
  border-top-color:${wd.dossier.tealBright}; border-radius:50%;
  animation:${yf} .8s linear infinite; margin:120px auto;
`,Qf=vd.div`
  margin-top:34px; padding-top:28px; border-top:1px solid ${wd.dossier.hairlineOnDark};
  ${jf(.06)}
  .cm-eyebrow { font-family:${xf}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wd.dossier.teal}; margin-bottom:16px; }
  .cm-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px;
    @media (max-width:600px){ grid-template-columns:repeat(2,1fr); } }
  .cm-cell { position:relative; border:1px solid ${wd.dossier.hairlineOnDark};
    border-radius:${wd.size.radius.md}; padding:14px 15px 15px;
    display:flex; flex-direction:column; gap:9px; background:${wd.dossier.bgRaised}; }
  .cm-cell.hot { border-color:rgba(43,196,172,.42);
    background:linear-gradient(155deg, rgba(43,196,172,.11), rgba(23,138,123,.03));
    box-shadow:0 0 0 1px rgba(43,196,172,.10); }
  .cm-top { display:flex; align-items:center; justify-content:space-between; min-height:24px; }
  .cm-ico { color:${wd.dossier.faintOnDark}; display:flex; }
  .cm-cell.hot .cm-ico { color:${wd.dossier.tealBright}; }
  .cm-label { font-size:13.5px; font-weight:600; color:${wd.dossier.mutedOnDark}; letter-spacing:-.005em; line-height:1.2; }
  .cm-cell.hot .cm-label { color:${wd.dossier.inkOnDark}; }
  .cm-hint { font-size:11px; color:${wd.dossier.faintOnDark}; letter-spacing:.01em; }
  .cm-tag { font-family:${xf}; font-size:8.5px; letter-spacing:.12em; text-transform:uppercase;
    color:${wd.dossier.tealBright}; border:1px solid rgba(43,196,172,.4);
    border-radius:${wd.size.radius.pill}; padding:3px 8px; white-space:nowrap; }
  .cm-tag.offert { color:${wd.dossier.faintOnDark}; border-color:${wd.dossier.hairlineOnDark}; }
  .cm-verified { font-family:${xf}; font-size:9px; letter-spacing:.07em; text-transform:uppercase;
    color:${wd.dossier.tealBright}; margin-top:1px; }
`,Jf=vd.div`
  margin-top:20px; display:grid; gap:18px; grid-template-columns:1fr 1fr;
  ${jf(.12)}
  @media (max-width:760px){ grid-template-columns:1fr; }
  .door { border:1px solid ${wd.dossier.hairlineOnDark}; border-radius:${wd.size.radius.lg};
    background:${wd.dossier.bgRaised}; padding:24px 24px 22px; display:flex; flex-direction:column; }
  .door-k { font-family:${xf}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${wd.dossier.teal}; margin-bottom:12px; }
  .door h4 { font-family:${vf}; font-weight:600; font-size:18px; letter-spacing:-.01em;
    color:${wd.dossier.inkOnDark}; margin:0 0 8px; }
  .door p { font-size:13px; line-height:1.55; color:${wd.dossier.mutedOnDark}; margin:0 0 16px; }
  .door .spacer { flex:1; }
`,Xf=vd.div`
  font-family:${xf}; font-size:14px; letter-spacing:.01em; color:${wd.dossier.tealBright};
  background:rgba(43,196,172,.06); border:1px dashed rgba(43,196,172,.45);
  border-radius:${wd.size.radius.md}; padding:13px 16px; text-align:center; user-select:all;
`,Zf=vd.label`
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
  border:1.5px dashed rgba(43,196,172,.38); border-radius:${wd.size.radius.md};
  padding:26px 18px; cursor:pointer; text-align:center;
  background:rgba(43,196,172,.04); transition:border-color .15s, background .15s;
  &:hover, &.over { border-color:${wd.dossier.tealBright}; background:rgba(43,196,172,.10); }
  &.over { box-shadow:0 0 0 1px ${wd.dossier.tealBright}; }
  .dz-ico { color:${wd.dossier.tealBright}; }
  .dz-t { font-size:14px; font-weight:600; color:${wd.dossier.inkOnDark}; }
  .dz-s { font-size:12px; color:${wd.dossier.mutedOnDark}; }
  input { display:none; }
`,eg=vd.div`
  margin-top:14px; display:flex; flex-direction:column; gap:7px;
  .dp-row { display:flex; align-items:center; justify-content:space-between; gap:12px;
    font-size:12.5px; color:${wd.dossier.mutedOnDark}; }
  .dp-name { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; }
  .dp-stat { font-family:${xf}; font-size:11px; letter-spacing:.06em; white-space:nowrap; }
  .dp-stat.done { color:${wd.dossier.tealBright}; }
  .dp-stat.work { color:${wd.dossier.faintOnDark}; }
  .dp-stat.fail { color:#E06A4D; }
  .dp-note { margin-top:6px; font-size:12px; color:${wd.dossier.faintOnDark}; line-height:1.5; }
`,tg=vd.div`
  margin-top:24px; display:flex; align-items:center; gap:14px;
  padding:15px 18px; border:1px solid ${wd.dossier.hairlineOnDark};
  border-radius:${wd.size.radius.md}; ${jf(.18)}
  .ft-ico { color:${wd.dossier.faintOnDark}; flex-shrink:0; display:flex; }
  .ft-txt { flex:1; font-size:13px; line-height:1.5; color:${wd.dossier.mutedOnDark};
    b { color:${wd.dossier.inkOnDark}; } }
  .ft-soon { font-family:${xf}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${wd.dossier.tealBright}; border:1px solid rgba(43,196,172,.4);
    border-radius:${wd.size.radius.pill}; padding:5px 11px; white-space:nowrap; }
`,rg=Wh,ng=e=>new Promise((t,r)=>{const n=new FileReader;n.onload=()=>{const e=String(n.result||"");t(e.includes(",")?e.split(",")[1]:e)},n.onerror=()=>r(new Error("Kunde inte l\xe4sa filen")),n.readAsDataURL(e)});function ag(e,t,r){switch(e){case 429:return["Dagskvot n\xe5dd",t||"Ni har n\xe5tt max antal fria analyser idag \u2014 f\xf6rs\xf6k igen imorgon eller aktivera ert konto."];case 504:return["Tog f\xf6r l\xe5ng tid","Analysen hann inte klart i tid. V\xe4nta en stund och f\xf6rs\xf6k igen."];case 401:return["Sessionen l\xf6pte ut","Ladda om sidan och f\xf6rs\xf6k igen."+(r?` (orsak: ${r})`:"")];case 413:return["Filen f\xf6r stor",t||"PDF:en \xf6verstiger maxstorleken \u2014 komprimera eller dela upp den."];case 400:return["Kunde inte l\xe4sas",t||"Filen gick inte att tolka som en faktura. Kontrollera att det \xe4r en PDF-faktura."];case 404:return["Tj\xe4nsten n\xe5s inte h\xe4r","\xd6ppna ert kontor via arvoflow.se s\xe5 fungerar analysen."];case 500:case 502:case 503:return["Tillf\xe4lligt serverfel","N\xe5got gick fel p\xe5 v\xe5r sida \u2014 f\xf6rs\xf6k igen om en stund."];default:return["Misslyckades",t||`Servern svarade ${e||"ov\xe4ntat"}.`]}}const ig=new Set(["gmail.com","hotmail.com","outlook.com","yahoo.com","yahoo.se","icloud.com","live.com","msn.com","me.com","proton.me","protonmail.com"]);async function og(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}const sg="arvo_fp_override";const lg=e=>null==e?"\u2013":Math.round(e).toLocaleString("sv-SE"),cg=e=>e?new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"short"}):"",dg=e=>e.toLocaleDateString("sv-SE",{month:"long",year:"numeric"}),ug=e=>{if(!e)return"";const t=new Date(e);if(Number.isNaN(t.getTime()))return"";const r=t.toLocaleTimeString("sv-SE",{hour:"2-digit",minute:"2-digit"}),n=e=>{const t=new Date(e);return t.setHours(0,0,0,0),t},a=Math.round((n(new Date)-n(t))/864e5);return a<=0?`i dag ${r}`:1===a?`i natt ${r}`:`${t.toLocaleDateString("sv-SE",{day:"numeric",month:"short"})} ${r}`},pg={per_user_month:"kr/anv./m\xe5n",per_subscription_month:"kr/abonn./m\xe5n",ore_per_kwh:"\xf6re/kWh"},hg={"ramavtal-stat":"statliga ramavtal","ramavtal-kommun":"kommunala ramavtal","reskontra-kommun":"kommunal leverant\xf6rsreskontra",upphandling:"offentliga upphandlingar",eurostat:"officiell statistik (Eurostat/SCB)"},mg=e=>null==e?"\u2013":Number(e).toLocaleString("sv-SE",{maximumFractionDigits:2});function fg(e){return e<45?"#E06A4D":e<65?"#E0A23C":e<80?"#5DD6CA":"#2BC4AC"}const gg=17;function xg(e){let{score:t,size:r=42,r:n=gg,sw:a=3.2}=e;const i=2*Math.PI*n,o=fg(t);return(0,$d.jsxs)("svg",{width:r,height:r,viewBox:`0 0 ${r} ${r}`,children:[(0,$d.jsx)("circle",{cx:r/2,cy:r/2,r:n,fill:"none",stroke:"rgba(255,255,255,.12)",strokeWidth:a}),(0,$d.jsx)("circle",{cx:r/2,cy:r/2,r:n,fill:"none",stroke:o,strokeWidth:a,strokeLinecap:"round",strokeDasharray:`${t/100*i} ${i}`,style:{transform:"rotate(-90deg)",transformOrigin:"center",transition:"stroke-dasharray 1s ease"}})]})}function vg(e){var t,r;const n=Hh(e.category),a=(null!==(t=null===n||void 0===n?void 0:n.label)&&void 0!==t?t:e.category).toLowerCase();if("monitoring"===e.route)return"Avtalet \xe4r tidsbegr\xe4nsat. Arvo bevakar och f\xf6rbereder bytet inf\xf6r f\xf6rnyelsen \u2014 ni betalar konkurrenskraftigt till dess.";if("review_queue"===e.route)return"Kategorin kr\xe4ver manuell granskning \u2014 Arvo inh\xe4mtar offert f\xf6r exakt prisj\xe4mf\xf6relse. Ni kontaktas n\xe4r det \xe4r klart.";if(e.should_switch&&(null!==(r=e.net_saving)&&void 0!==r?r:0)>0){const t=e.annual_cost>0&&e.suggested_annual_cost>0?Math.round((e.annual_cost-e.suggested_annual_cost)/e.annual_cost*100):0;return t>=10?`Ni betalar <b>${t}% mer</b> \xe4n verifierat marknadspris f\xf6r ${a}. Arvo rekommenderar byte \u2014 det l\xe4gre priset finns f\xf6rberett nedan.`:`Ni betalar ${t>0?`${t}% mer`:"n\xe5got mer"} \xe4n verifierat marknadspris f\xf6r ${a} \u2014 ett litet gap. Ett l\xe4gre avtalspris finns att s\xe4kra om ni vill, men ingen br\xe5dska; avv\xe4rjt \xe4r \xe4nd\xe5 avv\xe4rjt.`}return`Priset \xe4r konkurrenskraftigt mot verifierat marknadspris f\xf6r ${a}. Inget byte rekommenderas i dag \u2014 dela en ny faktura vid n\xe4sta avtalsperiod s\xe5 kontrollerar Arvo igen.`}function bg(){var e,t,r,a,i;const[o,s]=(0,n.useState)(null),[l,c]=(0,n.useState)(null),[d,u]=(0,n.useState)({}),[p,h]=(0,n.useState)({}),[m,f]=(0,n.useState)({}),[g,x]=(0,n.useState)({}),[v,b]=(0,n.useState)({}),[y,k]=(0,n.useState)({}),[j,w]=(0,n.useState)([]),[S,$]=(0,n.useState)(null),[z,_]=(0,n.useState)(0),[N,E]=(0,n.useState)(0),[A,C]=(0,n.useState)([]),[D,F]=(0,n.useState)(!1),[T,O]=(0,n.useState)(null),[P,L]=(0,n.useState)(new Set),[R,I]=(0,n.useState)(""),[M,B]=(0,n.useState)([]),[V,U]=(0,n.useState)(!1),[K,H]=(0,n.useState)(""),[W,q]=(0,n.useState)(!1),[Y,G]=(0,n.useState)(!1),[Q,J]=(0,n.useState)(""),[X,Z]=(0,n.useState)(null),[ee,te]=(0,n.useState)(!1),[re,ne]=(0,n.useState)(""),ae=(0,n.useMemo)(()=>new URLSearchParams(window.location.search).get("magic"),[]),{email:ie,sessionToken:oe,logout:se}=Cd(),le=(0,n.useCallback)(async e=>{var t,r,n,a,i,o,l,d,p,m,g,v,y;const j=new URLSearchParams;if(oe)j.set("session",oe);else{const t=e||R||await og();t&&j.set("fingerprint",t)}ae&&j.set("magic",ae);const S=await fetch(`/api/invoice-history?${j.toString()}`);if(!S.ok)throw new Error(`HTTP ${S.status}`);const z=await S.json();s(null!==(t=z.analyses)&&void 0!==t?t:[]),c(null!==(r=z.email)&&void 0!==r?r:null),u(null!==(n=z.cohort)&&void 0!==n?n:{}),h(null!==(a=z.publicBench)&&void 0!==a?a:{}),f(null!==(i=z.forecasts)&&void 0!==i?i:{}),x(null!==(o=z.branchAnchors)&&void 0!==o?o:{}),b(null!==(l=z.movements)&&void 0!==l?l:{}),k(null!==(d=z.switchTargets)&&void 0!==d?d:{}),w(null!==(p=z.watched)&&void 0!==p?p:[]),$(null!==(m=z.vakt)&&void 0!==m?m:null),_(null!==(g=z.ingesting)&&void 0!==g?g:0),E(null!==(v=z.ingestFailed)&&void 0!==v?v:0),C(null!==(y=z.ingestFailedFiles)&&void 0!==y?y:[])},[R,ae,oe]),ce=(0,n.useCallback)(async()=>{F(!0);try{await fetch("/api/ingest/retry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session:oe,magic:ae})}),E(0),C([]),_(e=>e||1),await le()}catch{}finally{F(!1)}},[oe,ae,le]);(0,n.useEffect)(()=>{let e=!1;return(async()=>{try{const t=function(){try{const e=new URLSearchParams(window.location.search);if(e.has("reset")){const t=(e.get("reset")||"1").toLowerCase();if("off"===t||"0"===t||"real"===t)localStorage.removeItem(sg);else{const e="test"+Array.from(crypto.getRandomValues(new Uint8Array(10))).map(e=>e.toString(16).padStart(2,"0")).join("");localStorage.setItem(sg,e),["arvo_successful_count","arvo_had_saving","arvo_gate_passed"].forEach(e=>localStorage.removeItem(e))}e.delete("reset");const r=e.toString();window.history.replaceState({},"",window.location.pathname+(r?`?${r}`:""))}return localStorage.getItem(sg)||null}catch{return null}}();e||G(!!t);const r=t||await og();e||I(r),e||await le(r)}catch(t){e||O(t.message)}})(),()=>{e=!0}},[]),(0,n.useEffect)(()=>{oe&&le().catch(e=>O(e.message))},[oe]),(0,n.useEffect)(()=>{if(z<=0)return;const e=setInterval(()=>{le().catch(()=>{})},12e3);return()=>clearInterval(e)},[z,le]);const de=(0,n.useCallback)(()=>{se();const e=window.location.pathname;window.history.replaceState({},"",e),window.location.reload()},[se]);async function ue(e){const t=[...e||[]].filter(e=>"application/pdf"===e.type||/\.pdf$/i.test(e.name)).slice(0,20);if(!t.length)return;H(""),U(!0),B(t.map(e=>({name:e.name,status:"work"})));const r=!(!ae&&!oe);let n=null;if(!r)try{var a;const e=await fetch("/api/token",{method:"POST"});n=null===(a=await e.json())||void 0===a?void 0:a.token}catch{}let i=!1,o="",s=0;for(let l=0;l<t.length;l++)try{const e=await ng(t[l]);let a="fail",c="Misslyckades",d="";const u=r?"/api/kontor-ingest":"/api/test-invoice",p=r?{pdfBase64:e,magic:ae,session:oe,fingerprint:R}:{pdfBase64:e,industry:"ovrigt",employees:10,token:n,fingerprint:R},h=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}),m=await h.json().catch(()=>({}));r?m.ok?a="done":([c,d]=ag(h.status,null===m||void 0===m?void 0:m.error,null===m||void 0===m?void 0:m.code),o=d):m.gate?(a="gate",i=!0):"auto"===m.route||"monitoring"===m.route?a="done":"review_queue"===m.route||"unsupported"===m.route?(a="review",s++):([c,d]=ag(h.status,null===m||void 0===m?void 0:m.error,null===m||void 0===m?void 0:m.code),o=d),B(e=>e.map((e,t)=>t===l?{...e,status:a,label:c,hint:d}:e))}catch{o="Kunde inte n\xe5 servern \u2014 kontrollera n\xe4tet och f\xf6rs\xf6k igen.",B(e=>e.map((e,t)=>t===l?{...e,status:"fail",label:"N\xe4tverksfel",hint:o}:e))}U(!1),i?H("Ni har n\xe5tt gr\xe4nsen f\xf6r fria analyser. Vidarebefordra resten till faktura@inbox.arvoflow.se \u2014 eller aktivera ert konto \u2014 s\xe5 forts\xe4tter vi."):s>0?H("En eller flera fakturor beh\xf6ver manuell granskning (t.ex. utl\xe4ndsk valuta eller l\xe5g l\xe4sbarhet). Vi tittar p\xe5 dem och \xe5terkommer \u2014 ladda g\xe4rna upp fler under tiden."):o&&H(o);try{await le()}catch{}}const pe=(0,n.useMemo)(()=>(null!==o&&void 0!==o?o:[]).filter(e=>"auto"===e.route||"monitoring"===e.route),[o]),he=(0,n.useMemo)(()=>function(e){const t=new Map;for(const r of null!==e&&void 0!==e?e:[]){const e=`${cf(r).trim().toLowerCase()}|${String(r.category||"").toLowerCase()}`,n=t.get(e);n?(n.count+=1,new Date(r.created_at)>new Date(n.latest.created_at)&&(n.latest=r)):t.set(e,{key:e,latest:r,count:1})}return[...t.values()].sort((e,t)=>{var r,n;return(null!==(r=t.latest.net_saving)&&void 0!==r?r:0)-(null!==(n=e.latest.net_saving)&&void 0!==n?n:0)})}(pe),[pe]),me=(0,n.useMemo)(()=>{const e=new Map;for(const t of null!==j&&void 0!==j?j:[]){e.has(t.kind)||e.set(t.kind,{kind:t.kind,headline:t.headline,detail:t.detail,action:t.action,suppliers:[]});const r=e.get(t.kind);r.suppliers.includes(t.supplier)||r.suppliers.push(t.supplier)}return[...e.values()]},[j]),fe=(0,n.useMemo)(()=>{var e;const t={high:0,medium:1,low:2};return null!==(e=(null!==pe&&void 0!==pe?pe:[]).map(e=>e.lead_finding_json).filter(e=>e&&"object"===typeof e&&e.title).sort((e,r)=>t[e.severity]-t[r.severity]||(r.annualImpact||0)-(e.annualImpact||0))[0])&&void 0!==e?e:null},[pe]),ge=(0,n.useMemo)(()=>{var e;return null!==(e=(null!==o&&void 0!==o?o:[]).map(e=>e.contractClock).filter(e=>e&&"object"===typeof e&&e.title&&e.daysLeft>0).sort((e,t)=>e.daysLeft-t.daysLeft)[0])&&void 0!==e?e:null},[o]),xe=(0,n.useMemo)(()=>{var e;return null!==(e=Object.values(null!==v&&void 0!==v?v:{}).filter(e=>e&&"object"===typeof e&&e.title).sort((e,t)=>{var r,n;return new Date(t.changedAt)-new Date(e.changedAt)||(null!==(r=t.withSupplier)&&void 0!==r?r:0)-(null!==(n=e.withSupplier)&&void 0!==n?n:0)})[0])&&void 0!==e?e:null},[v]),ve=(0,n.useMemo)(()=>{var e;const t={high:0,medium:1,low:2};return null!==(e=Object.values(null!==m&&void 0!==m?m:{}).filter(e=>e&&"object"===typeof e&&e.title&&e.category!==(null===xe||void 0===xe?void 0:xe.category)).sort((e,r)=>{var n,a;return(null!==(n=t[e.confidence])&&void 0!==n?n:3)-(null!==(a=t[r.confidence])&&void 0!==a?a:3)})[0])&&void 0!==e?e:null},[m,xe]),be=he.reduce((e,t)=>{var r;return e+(null!==(r=t.latest.net_saving)&&void 0!==r?r:0)},0),ye=function(e){if(!e.length)return 0;let t=0,r=0;for(const n of e){const e=n.latest.annual_cost>0?n.latest.annual_cost:0;t+=e,r+=df(n.latest)*e}return 0===t?Math.round(e.reduce((e,t)=>e+df(t.latest),0)/e.length):Math.round(r/t)}(he),ke=(je=ye,{pointer:Math.max(4,Math.min(96,je)),label:je>=67?"B\xe4ttre \xe4n marknaden":je>=45?"I niv\xe5":"S\xe4mre \xe4n marknaden"});var je;const we=function(e){var t;if(!e)return null;const r=(null!==(t=e.split("@")[1])&&void 0!==t?t:"").toLowerCase();if(!r||ig.has(r))return null;const n=r.split(".")[0];return n.charAt(0).toUpperCase()+n.slice(1)}(l),Se=he.filter(e=>{var t;return e.latest.should_switch&&(null!==(t=e.latest.net_saving)&&void 0!==t?t:0)>0}),$e=(0,n.useMemo)(()=>{let e=null;for(const t of he){const r=t.latest,n=d[`${r.normalized_supplier}|${r.category}`],a=(null===n||void 0===n?void 0:n.supplierMedian)||(null===n||void 0===n?void 0:n.supplierAvgCost);if(!n||!a||!r.annual_cost)continue;const i=Math.round((r.annual_cost-a)/a*100),o={supplier:cf(r),cost:r.annual_cost,median:a,p25:n.supplierP25,n:n.supplierDataPoints,pct:i};(!e||i>e.pct)&&(e=o)}return e},[he,d]),ze=(0,n.useMemo)(()=>{if($e)return null;for(const r of he){var e;const n=r.latest,a=p[n.category];if(a&&a.n>=3&&null!==(e=a.observations)&&void 0!==e&&e.length){var t;const e="eurostat"===(null===(t=a.observations[0])||void 0===t?void 0:t.source),r=e&&"supplier"===a.scope&&n.price_per_seat_monthly>0?n.price_per_seat_monthly:null,i=r?Math.round((r-a.median)/a.median*100):null;return{...a,category:n.category,supplier:cf(n),customerUnit:r,pct:i,isPeer:e}}}return null},[$e,he,p]),_e=(0,n.useMemo)(()=>{if($e||ze)return null;let e=null;for(const r of he){var t;const n=g[r.latest.category];if(!n||!(n.median>0))continue;const a=null!==(t=n.customerCost)&&void 0!==t?t:0;(!e||a>e._material)&&(e={...n,_material:a})}return e},[$e,ze,he,g]),Ne=(0,n.useMemo)(()=>he.filter(e=>"annual"===e.latest.billing_period&&e.latest.created_at).map(e=>{const t=e.latest,r=new Date(t.created_at);return r.setMonth(r.getMonth()+12),{id:t.id,supplier:cf(t),when:r,cost:t.annual_cost}}).sort((e,t)=>e.when-t.when),[he]),Ee=he.length?cg(he.map(e=>e.latest.created_at).sort().reverse()[0]):"",Ae=(new Date).toLocaleDateString("sv-SE",{day:"numeric",month:"short",year:"numeric"}).toUpperCase(),{hasSwitchAction:Ce,hasFindingAction:De,acting:Fe}=function(e){var t;let{switchablesCount:r,roomFinding:n}=e;const a=(null!==r&&void 0!==r?r:0)>0,i=!!(n&&(null!==(t=n.annualImpact)&&void 0!==t?t:0)>0);return{hasSwitchAction:a,hasFindingAction:i,acting:a||i}}({switchablesCount:Se.length,roomFinding:fe}),Te=(0,n.useMemo)(()=>{const e=[];return e.push({tag:"Bevakar",what:null!==S&&void 0!==S&&S.sweptAt?(0,$d.jsxs)($d.Fragment,{children:["Svepte ",(0,$d.jsxs)("b",{children:[S.sources," marknadsk\xe4llor"]})," ",ug(S.sweptAt)," \u2014 ",S.changes>0?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("b",{children:S.changes})," ",1===S.changes?"prisavvikelse":"prisavvikelser"," i marknaden f\xe5ngad",1===S.changes?"":"e","."]}):"allt lugnt, inget kr\xe4vde er uppm\xe4rksamhet."]}):(0,$d.jsx)($d.Fragment,{children:"Sveper marknaden nattligt mot fyrtiotalet marknadsk\xe4llor \u2014 er bevakning \xe4r aktiv."})}),pe.length>0&&e.push({tag:"Analys",what:(0,$d.jsxs)($d.Fragment,{children:["V\xe4gde ",(0,$d.jsxs)("b",{children:[pe.length," ",1===pe.length?"faktura":"fakturor"]})," mot verifierat marknadspris",Ee?(0,$d.jsxs)($d.Fragment,{children:[" \xb7 senast ",Ee]}):null,"."]})}),$e&&e.push({tag:"Kohort",what:(0,$d.jsxs)($d.Fragment,{children:["J\xe4mf\xf6rde era priser mot ",(0,$d.jsxs)("b",{children:[$e.n," bolag"]})," hos ",$e.supplier," via n\xe4tverket \u2014 sanningen ingen j\xe4mf\xf6relsesajt kan ge."]})}),xe&&e.push({tag:"R\xf6relse",what:(0,$d.jsxs)($d.Fragment,{children:["F\xe5ngade en marknadsr\xf6relse: ",(0,$d.jsx)("b",{children:xe.title})," \u2014 ",xe.withSupplier," av ",xe.total," bolag vi f\xf6ljer ber\xf6rs."]})}),ve&&e.push({tag:"Prognos",what:(0,$d.jsxs)($d.Fragment,{children:["K\xf6ade ett motdrag inf\xf6r en trolig h\xf6jning: ",(0,$d.jsx)("b",{children:ve.title}),"."]})}),ge&&e.push({tag:"Klocka",what:(0,$d.jsxs)($d.Fragment,{children:["Bevakar avtalsklockan \u2014 ",(0,$d.jsxs)("b",{children:[ge.daysLeft," dagar"]})," kvar p\xe5 bindningen, agerar i f\xf6nstret."]})}),e},[he.length,pe.length,Ee,S,$e,xe,ve,ge]),Oe=Fe?Ce?"B\xe4ttre \xe4n marknaden"===ke.label?(0,$d.jsxs)($d.Fragment,{children:["Sammantaget st\xe5r ni ",(0,$d.jsx)("em",{children:"starkt"})," \u2014 men ",Se.length," avtal kostar mer \xe4n de borde."]}):"I niv\xe5"===ke.label?(0,$d.jsxs)($d.Fragment,{children:["Ni ligger ",(0,$d.jsx)("em",{children:"i niv\xe5"})," med marknaden \u2014 ",Se.length," avtal kan sk\xe4rpas."]}):(0,$d.jsxs)($d.Fragment,{children:["Ni betalar ",(0,$d.jsx)("em",{children:"mer \xe4n marknaden"})," \u2014 ",Se.length," avtal drar mest."]}):(0,$d.jsxs)($d.Fragment,{children:["Era avtal st\xe5r sig \u2014 men vi f\xe5ngade ",(0,$d.jsxs)("em",{children:[lg(fe.annualImpact)," kr/\xe5r"]})," v\xe4rt att \xe5tg\xe4rda."]}):(0,$d.jsxs)($d.Fragment,{children:["H\xe5ll kursen. Era priser ",(0,$d.jsx)("em",{children:"st\xe5r sig mot marknaden."})]}),Pe=Fe?Ce?(0,$d.jsxs)($d.Fragment,{children:["Vi j\xe4mf\xf6rde era ",(0,$d.jsxs)("b",{children:[he.length," leverant\xf6rer"]})," mot verifierat marknadspris.",(0,$d.jsxs)("b",{children:[" ",lg(be)," kr/\xe5r"]})," i m\xf6jlig nettobesparing ligger p\xe5 bordet \u2014 det st\xf6rsta bytet tar tv\xe5 minuter att signera. Resten h\xe5ller m\xe5ttet; dem r\xf6r vi inte."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi j\xe4mf\xf6rde era ",(0,$d.jsxs)("b",{children:[he.length," leverant\xf6rer"]})," mot verifierat marknadspris \u2014 priserna st\xe5r sig. Men vi l\xe4ste varje rad p\xe5 era fakturor och f\xe5ngade en kostnad v\xe4rd ",(0,$d.jsxs)("b",{children:[lg(fe.annualImpact)," kr/\xe5r"]})," \u2014 se vad domen bygger p\xe5 nedan."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi j\xe4mf\xf6rde era ",(0,$d.jsxs)("b",{children:[he.length," leverant\xf6rer"]})," mot verifierat marknadspris. Inget byte rekommenderas i dag. Vi h\xf6r av oss om l\xe4get f\xf6r\xe4ndras \u2014 ni beh\xf6ver inte g\xf6ra n\xe5got."]});return(0,$d.jsx)(wf,{children:(0,$d.jsxs)(Sf,{children:[(0,$d.jsx)(gf,{email:ie,onLogout:de}),N>0&&(0,$d.jsxs)("div",{style:{border:"1px solid rgba(245,180,90,0.45)",borderRadius:12,background:"rgba(245,180,90,0.07)",padding:"16px 18px",margin:"0 0 18px",color:"#E8C9A0",fontSize:13.5,lineHeight:1.55},children:[(0,$d.jsxs)("strong",{style:{color:"#F5B45A"},children:[N," ",1===N?"faktura kunde":"fakturor kunde"," inte l\xe4sas in."]})," ","Oftast ett tillf\xe4lligt fel (ett tekniskt avbrott) \u2014 s\xe4llan att filen inte var en l\xe4sbar faktura.",A.length>0&&(0,$d.jsx)("ul",{style:{margin:"10px 0 0",paddingLeft:18},children:A.map((e,t)=>(0,$d.jsx)("li",{style:{fontFamily:"monospace",fontSize:12.5,color:"#D9B98A",marginBottom:2},children:e},t))}),(0,$d.jsxs)("div",{style:{marginTop:12,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"},children:[(0,$d.jsx)("button",{onClick:ce,disabled:D,style:{cursor:D?"default":"pointer",border:"1px solid #F5B45A",background:"transparent",color:"#F5B45A",borderRadius:100,padding:"9px 20px",fontSize:13,fontWeight:600,opacity:D?.6:1},children:D?"K\xf6r om\u2026":`F\xf6rs\xf6k igen \u2014 Arvo k\xf6r om ${1===N?"den":"dem"} \xe5t er`}),(0,$d.jsx)("span",{style:{fontSize:12,color:"#B89B72"},children:"Inget nytt mejl beh\xf6vs."})]})]}),null===o&&!T&&(0,$d.jsx)(Gf,{}),T&&(0,$d.jsx)(Nf,{children:(0,$d.jsx)("h2",{style:{fontSize:26},children:"Kunde inte ladda ert kontor \u2014 f\xf6rs\xf6k igen om en stund."})}),null!==o&&he.length>0&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)($f,{children:[(0,$d.jsxs)(zf,{children:[(0,$d.jsx)("div",{className:"brand",children:"ARVO-KONTORET"}),(0,$d.jsxs)("div",{className:"confidential",children:["Konfidentiellt \xb7 ",null!==we&&void 0!==we?we:"Ert konto"," \xb7 ",Ae,Y?" \xb7 TESTKONTO (?reset=off f\xf6r skarpt)":""]}),(0,$d.jsx)("div",{className:"greeting",children:"God morgon."})]}),(0,$d.jsxs)(_f,{children:[(0,$d.jsxs)("div",{className:"radar-head",children:[(0,$d.jsxs)("div",{className:"disc",children:[(0,$d.jsxs)("svg",{width:"46",height:"46",viewBox:"0 0 46 46",children:[(0,$d.jsx)("circle",{cx:"23",cy:"23",r:"21",fill:"none",stroke:"rgba(93,214,202,.18)",strokeWidth:"1"}),(0,$d.jsx)("circle",{cx:"23",cy:"23",r:"13",fill:"none",stroke:"rgba(93,214,202,.14)",strokeWidth:"1"}),(0,$d.jsx)("circle",{cx:"23",cy:"23",r:"2",fill:"#5DD6CA"})]}),(0,$d.jsx)("div",{className:"sweep"})]}),(0,$d.jsxs)("div",{className:"radar-title",children:[(0,$d.jsx)("strong",{children:"Vakten"}),"bevakar era avtal"]})]}),(0,$d.jsxs)("div",{className:"radar-stats",children:[(0,$d.jsx)("div",{className:"rgroup-label",children:"Era avtal"}),(0,$d.jsxs)("div",{className:"rstat",children:[(0,$d.jsx)("span",{children:"Leverant\xf6rer"}),(0,$d.jsx)("span",{className:"v",children:he.length})]}),(0,$d.jsxs)("div",{className:"rstat",children:[(0,$d.jsx)("span",{children:j.length>0?"Prissatta":"Analyser"}),(0,$d.jsx)("span",{className:"v",children:pe.length})]}),j.length>0&&(0,$d.jsxs)("div",{className:"rstat",children:[(0,$d.jsx)("span",{children:"Under uppsikt"}),(0,$d.jsx)("span",{className:"v",children:j.length})]})]}),(0,$d.jsxs)("div",{className:"radar-foot",children:[(0,$d.jsx)("div",{className:"rgroup-label",children:"Marknaden"}),(0,$d.jsxs)("div",{className:"foot-line",children:[(0,$d.jsx)("span",{className:"live"}),(0,$d.jsx)("span",{children:null!==S&&void 0!==S&&S.sweptAt?(0,$d.jsxs)($d.Fragment,{children:["Senaste svep ",ug(S.sweptAt)," \xb7 ",(0,$d.jsxs)("b",{children:[null!==(e=S.sources)&&void 0!==e?e:40," marknadsk\xe4llor"]})," svepta",S.changes>0?(0,$d.jsxs)($d.Fragment,{children:[" \xb7 ",S.changes," ",1===S.changes?"prisr\xf6relse":"prisr\xf6relser"," i marknaden"]}):" \xb7 allt lugnt"]}):Ee?(0,$d.jsxs)($d.Fragment,{children:["Senaste analys ",Ee," \xb7 bevakning aktiv"]}):"Bevakning aktiv"})]})]})]})]}),(0,$d.jsxs)(Nf,{children:[(0,$d.jsx)("div",{className:"eyebrow",children:"Arvo bed\xf6mer"}),(0,$d.jsx)("h1",{children:Oe}),(0,$d.jsx)("p",{className:"work",children:Pe}),(0,$d.jsxs)(Af,{children:[(0,$d.jsx)("span",{className:"pct",children:"Verifierat"})," \xb7 grundat p\xe5 ",he.length," analyserade leverant\xf6rer \xb7 publika listpriser"]})]}),(fe||xe||ge||ve)&&(0,$d.jsxs)(Ef,{children:[(0,$d.jsx)("div",{className:"ev-eyebrow",children:"Vad domen bygger p\xe5"}),(0,$d.jsx)(Gh,{finding:fe,variant:"dossier"}),(0,$d.jsx)(Gh,{finding:xe,variant:"dossier",eyebrow:"Marknadsr\xf6relsen \xb7 n\xe4tverket"}),(0,$d.jsx)(Gh,{finding:ge,variant:"dossier",eyebrow:"Maktkalendern \xb7 avtalsbevakning"}),(0,$d.jsx)(Gh,{finding:ve,variant:"dossier",eyebrow:"Maktkalendern \xb7 prognos"})]}),(0,$d.jsxs)(Cf,{children:[(0,$d.jsxs)(Of,{children:[(0,$d.jsxs)("div",{className:"card-eyebrow",children:[(0,$d.jsx)("span",{children:"Arvo Score"}),(0,$d.jsx)("span",{className:"src",children:"mot verifierat listpris"})]}),(0,$d.jsxs)("div",{className:"idx-main",children:[(0,$d.jsx)("span",{className:"idx-num",children:ye}),(0,$d.jsx)("span",{className:"idx-denom",children:"/100"})]}),(0,$d.jsx)("div",{className:"mkt-k",children:"Marknadsl\xe4ge"}),(0,$d.jsx)("div",{className:"mkt-track",children:(0,$d.jsx)("span",{className:"mkt-ptr",style:{left:`${ke.pointer}%`}})}),(0,$d.jsxs)("div",{className:"mkt-scale",children:[(0,$d.jsx)("span",{className:"S\xe4mre \xe4n marknaden"===ke.label?"on":"",children:"S\xe4mre"}),(0,$d.jsx)("span",{className:"I niv\xe5"===ke.label?"on":"",children:"I niv\xe5"}),(0,$d.jsx)("span",{className:"B\xe4ttre \xe4n marknaden"===ke.label?"on":"",children:"B\xe4ttre"})]}),(0,$d.jsx)("p",{className:"idx-note",children:Se.length>0?(0,$d.jsxs)($d.Fragment,{children:["Sammanv\xe4gt ",ye>=67?"starkt":ye>=45?"godk\xe4nt":"svagt"," \u2014 men ",(0,$d.jsxs)("b",{children:[Se.length," avtal kostar mer \xe4n marknaden"]}),". De ligger f\xf6rberedda i innehavet nedan."]}):(0,$d.jsxs)($d.Fragment,{children:["Era priser ligger ",(0,$d.jsx)("b",{children:"i niv\xe5 med eller b\xe4ttre \xe4n verifierat listpris"}),". Inget enskilt avtal sticker ut i dag."]})})]}),(0,$d.jsxs)(Rf,{children:[(0,$d.jsx)("div",{className:"tally-k",children:Ce?"M\xf6jlig nettobesparing":Fe?"F\xe5ngad kostnad":"Avtal under bevakning"}),(0,$d.jsx)("div",{className:"tally-num",children:Ce?(0,$d.jsxs)($d.Fragment,{children:[lg(be)," kr",(0,$d.jsx)("small",{children:"per \xe5r"})]}):Fe?(0,$d.jsxs)($d.Fragment,{children:[lg(fe.annualImpact)," kr",(0,$d.jsx)("small",{children:"per \xe5r"})]}):(0,$d.jsxs)($d.Fragment,{children:[he.length,(0,$d.jsx)("small",{children:(he.length,"avtal")})]})}),(0,$d.jsx)("div",{className:"tally-sub",children:Ce?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("b",{children:[Se.length," byte",Se.length>1?"n":""," f\xf6rberedda"]})," \xb7 netto efter Arvos arvode (20% av f\xf6rsta \xe5rets besparing). Fr\xe5n \xe5r tv\xe5 \xe4r hela besparingen er."]}):Fe?(0,$d.jsx)($d.Fragment,{children:"Inget leverant\xf6rsbyte kr\xe4vs \u2014 kostnaden \xe5tg\xe4rdas direkt mot fakturan. Se fyndet ovan."}):(0,$d.jsx)($d.Fragment,{children:"Era priser st\xe5r sig \u2014 inga byten p\xe5 bordet just nu. Lugnet att ni ligger r\xe4tt \xe4r ocks\xe5 en leverans."})})]})]}),(0,$d.jsxs)(Lf,{children:[(0,$d.jsxs)("div",{className:"card-eyebrow",children:[(0,$d.jsx)("span",{children:"Vaktens kvitton"}),(0,$d.jsx)("span",{className:"src",children:"medan ni drev bolaget"})]}),Te.map((e,t)=>(0,$d.jsxs)("div",{className:"rcpt",children:[(0,$d.jsx)("span",{className:"day",children:e.tag}),(0,$d.jsx)("span",{className:"what",children:e.what})]},t))]}),($e||ze||_e||Ne.length>0)&&(0,$d.jsxs)(Cf,{children:[ze&&(0,$d.jsxs)(Tf,{$full:0===Ne.length,children:[(0,$d.jsxs)("div",{className:"card-eyebrow",children:[(0,$d.jsx)("span",{children:ze.isPeer?"Den kollektiva sanningen":"Golv-referens"}),(0,$d.jsxs)("span",{className:"src",children:[ze.isPeer?"svenska f\xf6retag":"offentlig sektor"," \xb7 ",ze.n," pris",ze.n>1?"punkter":"punkt"]})]}),(0,$d.jsx)("h3",{children:(e=>{const t=((null===(e=Hh(ze.category))||void 0===e?void 0:e.label)||ze.category).toLowerCase(),r=pg[ze.unit]||"";return ze.isPeer?ze.customerUnit&&ze.pct>=8?(0,$d.jsxs)($d.Fragment,{children:["Svenska f\xf6retag betalar ",mg(ze.median)," ",r," f\xf6r ",t,". Ni betalar ",(0,$d.jsxs)("em",{children:[ze.pct,"% mer."]})]}):ze.customerUnit&&ze.pct<=-8?(0,$d.jsxs)($d.Fragment,{children:["Ni betalar ",(0,$d.jsxs)("em",{children:[Math.abs(ze.pct),"% mindre"]})," \xe4n svenska f\xf6retag f\xf6r ",t,"."]}):ze.customerUnit?(0,$d.jsxs)($d.Fragment,{children:["Ni betalar ",(0,$d.jsx)("em",{children:"i niv\xe5"})," med svenska f\xf6retag f\xf6r ",t,"."]}):(0,$d.jsxs)($d.Fragment,{children:["Svenska f\xf6retag betalar ",(0,$d.jsxs)("em",{children:[mg(ze.min),"\u2013",mg(ze.max)," ",r]})," f\xf6r ",t,"."]}):(0,$d.jsxs)($d.Fragment,{children:["Offentlig sektor pressar samma ",t," till ",(0,$d.jsxs)("em",{children:[mg(ze.min),"\u2013",mg(ze.max)," ",r]}),". Beviset att priset \xe4r ",(0,$d.jsx)("em",{children:"f\xf6rhandlingsbart."})]})})()}),(()=>{const e=[...ze.customerUnit?[{lbl:"Ni betalar",amt:ze.customerUnit,you:!0}]:[],...(ze.observations||[]).map(e=>({lbl:e.product||e.buyer,amt:e.unitPrice,you:!1}))];if(!e.length)return null;const t=Math.max(...e.map(e=>e.amt))||1;return(0,$d.jsx)("div",{className:"bars",children:e.map((e,r)=>(0,$d.jsxs)("div",{className:"barrow"+(e.you?" you":""),children:[(0,$d.jsx)("span",{className:"lbl",children:e.lbl}),(0,$d.jsx)("span",{className:"track",children:(0,$d.jsx)("span",{className:"fill",style:{width:`${Math.max(8,e.amt/t*100)}%`}})}),(0,$d.jsx)("span",{className:"amt",children:mg(e.amt)})]},r))})})(),(0,$d.jsxs)("p",{className:"truth-note",children:["Verkliga priser ur ",(0,$d.jsx)("b",{children:"\xf6ppen data"})," \u2014 ",hg[null===(t=ze.observations)||void 0===t||null===(r=t[0])||void 0===r?void 0:r.source]||"offentliga avtal",null!==(a=ze.observations)&&void 0!==a&&null!==(i=a[0])&&void 0!==i&&i.buyer?`, ${ze.observations[0].buyer}`:"",".",ze.isPeer?ze.customerUnit?" J\xe4mf\xf6rt per enhet mot er faktura.":"":" Golvet \u2014 inte ett m\xe5l ni n\xe5r i er storlek, men beviset att listpriset \xe4r f\xf6rhandlingsbart."]})]}),$e&&(0,$d.jsxs)(Tf,{$full:0===Ne.length,children:[(0,$d.jsxs)("div",{className:"card-eyebrow",children:[(0,$d.jsx)("span",{children:"Den kollektiva sanningen"}),(0,$d.jsxs)("span",{className:"src",children:[$e.n," bolag \xb7 live"]})]}),(0,$d.jsx)("h3",{children:$e.pct>=8?(0,$d.jsxs)($d.Fragment,{children:[$e.n," bolag hos ",$e.supplier," betalar i snitt ",lg($e.median)," kr. Ni betalar ",(0,$d.jsxs)("em",{children:[$e.pct,"% mer."]})]}):$e.pct<=-8?(0,$d.jsxs)($d.Fragment,{children:["Ni betalar ",(0,$d.jsxs)("em",{children:[Math.abs($e.pct),"% mindre"]})," \xe4n snittet hos ",$e.supplier," \u2014 ",$e.n," bolag j\xe4mf\xf6rda."]}):(0,$d.jsxs)($d.Fragment,{children:["Ni betalar ",(0,$d.jsx)("em",{children:"i niv\xe5"})," med vad ",$e.n," bolag betalar hos ",$e.supplier,"."]})}),(()=>{const e=Math.max($e.cost,$e.median,$e.p25||0)||1,t=[{lbl:"Ni betalar",amt:$e.cost,you:!0},{lbl:`Snitt \xb7 ${$e.n} bolag`,amt:$e.median,you:!1},...$e.p25?[{lbl:"L\xe4gst 25 %",amt:$e.p25,you:!1}]:[]];return(0,$d.jsx)("div",{className:"bars",children:t.map(t=>(0,$d.jsxs)("div",{className:"barrow"+(t.you?" you":""),children:[(0,$d.jsx)("span",{className:"lbl",children:t.lbl}),(0,$d.jsx)("span",{className:"track",children:(0,$d.jsx)("span",{className:"fill",style:{width:`${Math.max(8,t.amt/e*100)}%`}})}),(0,$d.jsxs)("span",{className:"amt",children:[lg(t.amt)," kr"]})]},t.lbl))})})(),(0,$d.jsxs)("p",{className:"truth-note",children:["Den h\xe4r raden kr\xe4ver att man ser ",(0,$d.jsx)("b",{children:"m\xe5nga bolags faktiska fakturor samtidigt"}),". Ingen j\xe4mf\xf6relsesajt och ingen konsult kan ge den \u2014 bara Arvo, tack vare n\xe4tverket."]})]}),_e&&(()=>{const e=Hh(_e.category),t=(null===e||void 0===e?void 0:e.inlineLabel)||((null===e||void 0===e?void 0:e.label)||_e.category).toLowerCase(),r=_e.seats,n=_e.customerCost,a=r>0?_e.median*r:null,i=null!=a&&n>0;return(0,$d.jsxs)(Tf,{$full:0===Ne.length,children:[(0,$d.jsxs)("div",{className:"card-eyebrow",children:[(0,$d.jsx)("span",{children:"Den kollektiva sanningen"}),(0,$d.jsx)("span",{className:"src",children:"branschestimat"})]}),i?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Ni betalar ",(0,$d.jsxs)("em",{children:[lg(n)," kr/\xe5r"]})," f\xf6r ",t,". Branschen betalar typiskt"," ",(0,$d.jsxs)("em",{children:[lg(a)," kr/\xe5r"]})," f\xf6r motsvarande ",r," ",1===r?_e.unitNoun:_e.unitNounPl,"."]}),(()=>{const e=Math.max(n,a)||1,t=[{lbl:"Ni betalar",amt:n,you:!0},{lbl:"Branschen typiskt",amt:a,you:!1}];return(0,$d.jsx)("div",{className:"bars",children:t.map(t=>(0,$d.jsxs)("div",{className:"barrow"+(t.you?" you":""),children:[(0,$d.jsx)("span",{className:"lbl",children:t.lbl}),(0,$d.jsx)("span",{className:"track",children:(0,$d.jsx)("span",{className:"fill",style:{width:`${Math.max(8,t.amt/e*100)}%`}})}),(0,$d.jsxs)("span",{className:"amt",children:[lg(t.amt)," kr"]})]},t.lbl))})})(),(0,$d.jsxs)("p",{className:"truth-note",children:["Branschtypiskt = verifierat publikt listpris (",lg(_e.median)," kr ",_e.unitLabel,")"," ","\xd7 era ",r," ",1===r?_e.unitNoun:_e.unitNounPl,". Ett ankare, inte er exakta position \u2014 den st\xe5r i innehavet nedan. N\xe4r fler bolag i er bransch delar sina fakturor blir det h\xe4r ",(0,$d.jsx)("b",{children:"er levande kohort"}),"."]})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Branschen betalar typiskt ",(0,$d.jsxs)("em",{children:[lg(_e.median)," kr"]})," ",_e.unitLabel," f\xf6r ",t," \u2014 verifierat publikt listpris."]}),n>0&&(0,$d.jsxs)("p",{className:"truth-note",style:{borderTop:"none",paddingTop:0,marginTop:4},children:["Er kostnad i dag: ",(0,$d.jsxs)("b",{children:[lg(n)," kr/\xe5r"]}),"."]}),(0,$d.jsxs)("p",{className:"truth-note",children:["Branschtypiskt ",_e.unitLabel,", ur verifierade publika listpriser \u2014 ett ankare, inte er exakta position (den st\xe5r i innehavet nedan). N\xe4r fler bolag i er bransch delar sina fakturor blir det h\xe4r ",(0,$d.jsx)("b",{children:"er levande kohort"}),"."]})]})]})})(),Ne.length>0&&(0,$d.jsxs)(Pf,{$full:!$e&&!ze&&!_e,children:[(0,$d.jsxs)("div",{className:"card-eyebrow",children:[(0,$d.jsx)("span",{children:"Maktkalendern \xb7 era \xe5rsavtal"}),(0,$d.jsx)("span",{className:"src",children:"uppskattat"})]}),Ne.map(e=>(0,$d.jsxs)("div",{className:"cal-row",children:[(0,$d.jsx)("span",{className:"cal-prob",children:(0,$d.jsx)(yu,{name:"calendar-clock",size:18,stroke:1.8})}),(0,$d.jsxs)("div",{className:"cal-body",children:[(0,$d.jsx)("div",{className:"t",children:e.supplier}),(0,$d.jsxs)("div",{className:"s",children:["\xc5rsavtal \u2014 bytesl\xe4get \xe5terkommer \xe5rligen. ",lg(e.cost)," kr/\xe5r."]})]}),(0,$d.jsxs)("span",{className:"cal-when",children:["~ ",dg(e.when)]})]},e.id))]})]}),(0,$d.jsxs)(If,{children:[(0,$d.jsxs)("div",{className:"h-eyebrow",children:["Innehavet \xb7 ",he.length," analyserade leverant\xf6rer"]}),he.map(e=>{var t;const r=e.latest,n=Hh(r.category),a=df(r),i=fg(a),o=P.has(r.id),s=r.should_switch&&(null!==(t=r.net_saving)&&void 0!==t?t:0)>0;return(0,$d.jsxs)(Bf,{$saving:s,children:[(0,$d.jsxs)(Vf,{$open:o,onClick:()=>{return e=r.id,void L(t=>{const r=new Set(t);return r.has(e)?r.delete(e):r.add(e),r});var e},"aria-expanded":o,children:[(0,$d.jsxs)(Uf,{children:[(0,$d.jsx)(xg,{score:a}),(0,$d.jsx)("span",{className:"v",style:{color:i},children:a})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"h-name",children:cf(r)}),(0,$d.jsxs)("div",{className:"h-cat",children:[n.label," \xb7 ",cg(r.created_at),e.count>1?` \xb7 ${e.count} analyser`:""]})]}),(0,$d.jsx)("div",{className:"h-cost",children:null!=r.annual_cost?`${lg(r.annual_cost)} kr/\xe5r`:""}),(0,$d.jsx)("div",{className:"h-badge "+(s?"save":"watch"),children:s?`+${lg(r.net_saving)} kr/\xe5r`:"monitoring"===r.route?"Avtalsbevakad":"R\xe4tt prissatt"}),(0,$d.jsx)("span",{className:"h-chev",children:(0,$d.jsx)(yu,{name:"chevron-down",size:16,stroke:2})})]}),o&&(0,$d.jsxs)(Kf,{children:[(0,$d.jsx)("div",{className:"diag",children:(0,$d.jsxs)("div",{className:"dbody",children:[(0,$d.jsx)("div",{className:"dtop",children:"Arvo bed\xf6mer"}),(0,$d.jsx)("div",{className:"dtxt",dangerouslySetInnerHTML:{__html:vg(r)}})]})}),(0,$d.jsxs)("dl",{className:"facts",children:[!s&&null!=r.annual_cost&&(0,$d.jsxs)("div",{className:"fact",children:[(0,$d.jsx)("dt",{children:"Ni betalar idag"}),(0,$d.jsxs)("dd",{children:[lg(r.annual_cost)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"fact",children:[(0,$d.jsx)("dt",{children:"Kategori"}),(0,$d.jsx)("dd",{style:{fontFamily:"inherit"},children:n.label})]}),(0,$d.jsxs)("div",{className:"fact",children:[(0,$d.jsx)("dt",{children:"Analyserad"}),(0,$d.jsx)("dd",{children:cg(r.created_at)})]})]}),s&&(e=>{const t=!!r.contract_end_date,n=y[r.category];return(0,$d.jsxs)(Hf,{$known:t,children:[(0,$d.jsxs)("div",{className:"sv-eyebrow",children:[(0,$d.jsx)("span",{className:"sv-dot"}),t?"Vakten \xb7 ert byte":"Vakten \xb7 ett drag kvar"]}),(0,$d.jsx)("div",{className:"sv-dom",children:t?(0,$d.jsxs)($d.Fragment,{children:["Ni kan byta \u2014 och vi vet ",(0,$d.jsx)("em",{children:"exakt n\xe4r"}),"."]}):(0,$d.jsxs)($d.Fragment,{children:["En sak st\xe5r mellan er och ",(0,$d.jsxs)("em",{children:[lg(r.net_saving)," kr"]}),": vad ert avtal s\xe4ger."]})}),(0,$d.jsx)("p",{className:"sv-support",children:t?(0,$d.jsxs)($d.Fragment,{children:["Ert ",cf(r),"-avtal l\xf6per till ",(0,$d.jsx)("b",{children:cg(r.contract_end_date)})," \u2014 vi avfyrar bytet p\xe5 dagen, i ert namn. Ni betalar ",(0,$d.jsx)("b",{children:"aldrig en dag dubbelt"}),", och vi flyttar er",(0,$d.jsx)("b",{children:" aldrig in i en avgift"}),"."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi ser besparingen tydligt \u2014 men inget bindningsdatum p\xe5 er faktura. Skicka avtalet, s\xe5",(0,$d.jsx)("b",{children:" l\xe4ser vi bindningstiden"})," och tajmar bytet s\xe5 ni ",(0,$d.jsx)("b",{children:"aldrig betalar dubbelt"})," och aldrig hamnar i en brytavgift."]})}),(0,$d.jsxs)("details",{className:"sv-proof",children:[(0,$d.jsx)("summary",{children:"F\xf6ruts\xe4ttningar inf\xf6r bytet"}),(0,$d.jsxs)("div",{className:"sv-proof-body",children:[(null===n||void 0===n||null===(e=n.alternatives)||void 0===e?void 0:e.length)>0&&(0,$d.jsxs)("div",{className:"sv-sec",children:[(0,$d.jsx)("div",{className:"sv-lbl",children:"Vad ni f\xe5r"}),n.alternatives.map((e,t)=>(0,$d.jsxs)("div",{className:"sv-alt",children:[(0,$d.jsxs)("span",{className:"sv-sup",children:[e.supplier,0===t&&(0,$d.jsx)("span",{className:"sv-tag",children:"b\xe4st matchning"})]}),(0,$d.jsx)("span",{className:"sv-pos",children:e.positioning})]},e.supplier)),(0,$d.jsxs)("div",{className:"sv-fine",children:["Matchat mot er nuvarande niv\xe5 \u2014 ",(0,$d.jsx)("b",{children:"samma eller b\xe4ttre, aldrig en nedgradering."})]})]}),(0,$d.jsxs)("div",{className:"sv-sec",children:[(0,$d.jsx)("div",{className:"sv-lbl",children:"Vad bytet ger er"}),(0,$d.jsxs)("div",{className:"sv-row",children:[(0,$d.jsxs)("span",{children:["Ni betalar idag",(0,$d.jsx)("small",{children:"er faktura"})]}),(0,$d.jsxs)("span",{className:"sv-v",children:[lg(r.annual_cost)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"sv-row",children:[(0,$d.jsxs)("span",{children:["Samma niv\xe5 kostar idag",(0,$d.jsxs)("small",{children:["verifierat \xf6ppet pris",null!==n&&void 0!==n&&n.lastVerified?` \xb7 ${n.lastVerified}`:""]})]}),(0,$d.jsxs)("span",{className:"sv-v",children:[lg(r.suggested_annual_cost)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"sv-row sv-keep",children:[(0,$d.jsxs)("span",{children:["Ni beh\xe5ller",(0,$d.jsx)("small",{children:"efter Arvos arvode \xb7 vi tar betalt f\xf6rst n\xe4r pengarna landat"})]}),(0,$d.jsxs)("span",{className:"sv-v",children:["+",lg(r.net_saving)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"sv-fine",children:["bredband"===r.category?(0,$d.jsx)($d.Fragment,{children:"Exakt pris s\xe4tts per adress i offert \u2014 "}):(0,$d.jsx)($d.Fragment,{children:"Det slutliga priset s\xe4tts i offert \u2014 "}),"det ",(0,$d.jsx)("b",{children:"bekr\xe4ftas innan ni skriver under."})]})]}),(0,$d.jsxs)("div",{className:"sv-sec",children:[(0,$d.jsx)("div",{className:"sv-lbl",children:t?"Er enda handling":"Varf\xf6r vi v\xe4ntar p\xe5 datumet"}),(0,$d.jsx)("p",{className:"sv-note",children:t?(0,$d.jsx)($d.Fragment,{children:"En signatur med BankID. Inget \xe4r bindande f\xf6rr\xe4n ni skriver under, ni kan tacka nej utan kostnad, och sj\xe4lva bytet ger ingen driftst\xf6rning \u2014 den nya leverant\xf6ren sk\xf6ter flytten."}):(0,$d.jsx)($d.Fragment,{children:"En bindningstid eller brytavgift kan \xe4ta besparingen om bytet sker fel dag. Vi r\xf6r er aldrig f\xf6rr\xe4n vi vet att kalkylen h\xe5ller \u2014 bristen \xe4r n\xe4sta drag, inte ett hinder."})})]})]})]}),(0,$d.jsx)("div",{className:"sv-act",children:(0,$d.jsxs)(qf,{as:vs,to:"/aktivera",children:[t?"Aktivera bytet":"F\xf6rbered bytet"," ",(0,$d.jsx)(yu,{name:"arrow",size:16})]})})]})})()]})]},r.id)})]}),j.length>0&&(0,$d.jsxs)(Wf,{children:[(0,$d.jsxs)("div",{className:"w-eyebrow",children:["Bevakat \u2014 inte prissatt \xb7 ",j.length]}),(0,$d.jsxs)("p",{className:"w-manifesto",children:["Vi l\xe4ste varje faktura ni skickade. Dessa ",(0,$d.jsx)("b",{children:j.length})," priss\xe4tter vi medvetet inte \u2014 vi gissar aldrig p\xe5 utl\xe4ndsk valuta eller en kategori utan verifierat svenskt golv. Vakten h\xe5ller dem under uppsikt, med ett \xe4rligt sk\xe4l och en v\xe4g fram\xe5t. Inget f\xf6ll mellan stolarna."]}),me.map(e=>(0,$d.jsxs)("div",{className:"w-row",children:[(0,$d.jsxs)("div",{className:"w-top",children:[(0,$d.jsx)("span",{className:"w-sup",children:1===e.suppliers.length?e.suppliers[0]:`${e.suppliers.length} fakturor`}),(0,$d.jsx)("span",{className:"w-kind",children:e.kind})]}),(0,$d.jsx)("div",{className:"w-head",children:e.headline}),(0,$d.jsx)("p",{className:"w-detail",children:e.detail}),e.suppliers.length>1&&(0,$d.jsx)("div",{className:"w-list",children:e.suppliers.join(" \xb7 ")}),(0,$d.jsxs)("div",{className:"w-action",children:[(0,$d.jsx)("span",{className:"w-arrow",children:"\u2192"})," ",e.action]})]},e.kind))]}),(0,$d.jsxs)(Yf,{children:[(0,$d.jsx)("div",{className:"iq-k",children:"Arvo Intelligence"}),(0,$d.jsxs)("h3",{children:["Hela reskontran, ",(0,$d.jsx)("em",{children:"bevakad dygnet runt."})]}),(0,$d.jsx)("p",{children:Fe?(0,$d.jsxs)($d.Fragment,{children:["I dag vaktar Arvo de avtal ni delat. Arvo Intelligence vidgar vakten till ",(0,$d.jsx)("b",{children:"resten av boken"})," \u2014 varenda avtal ni har \u2014 och larmar er innan n\xe4sta h\xf6jning n\xe5r er. Varje m\xe5nad: ett brev med exakt vad som r\xf6rt sig, och vad vi gjort \xe5t det."]}):(0,$d.jsxs)($d.Fragment,{children:["Era priser st\xe5r sig i dag, och Arvo vaktar de avtal ni delat. Arvo Intelligence vidgar vakten till ",(0,$d.jsx)("b",{children:"resten av boken"}),", s\xe5 att inget avtal l\xe4mnas obevakat \u2014 och skickar varje m\xe5nad ett brev med vad som r\xf6rt sig."]})}),(0,$d.jsxs)("div",{className:"iq-row",children:[(0,$d.jsxs)("span",{className:"iq-price",children:["1 995 kr ",(0,$d.jsx)("span",{children:"/ m\xe5n \xb7 ingen bindningstid"})]}),(0,$d.jsxs)(qf,{as:vs,to:"/aktivera",children:["Aktivera Arvo Intelligence ",(0,$d.jsx)(yu,{name:"arrow",size:16})]})]})]}),(0,$d.jsxs)(Mf,{children:[(0,$d.jsx)("div",{className:"keyline"}),(0,$d.jsx)("div",{className:"mark",children:"ARVO"}),(0,$d.jsx)("div",{className:"tagline",children:"Finansiell intelligens som aldrig sover."})]})]}),null!==o&&0===he.length&&!T&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)($f,{children:(0,$d.jsxs)(zf,{children:[(0,$d.jsx)("div",{className:"brand",children:"ARVO-KONTORET"}),(0,$d.jsxs)("div",{className:"confidential",children:["Konfidentiellt \xb7 ",null!==we&&void 0!==we?we:"Ert konto"," \xb7 ",Ae,Y?" \xb7 TESTKONTO (?reset=off f\xf6r skarpt)":""]}),(0,$d.jsx)("h1",{children:z>0?(0,$d.jsxs)($d.Fragment,{children:["Arvo analyserar",(0,$d.jsx)("br",{}),z," ",1===z?"faktura":"fakturor","\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Ert kontor v\xe4ntar",(0,$d.jsx)("br",{}),"p\xe5 f\xf6rsta analysen."]})})]})}),z>0?(0,$d.jsxs)(Nf,{children:[(0,$d.jsxs)("div",{className:"eyebrow",children:[(0,$d.jsx)("span",{className:"live",style:{display:"inline-block",width:8,height:8,borderRadius:"50%",background:"#5DD6CA",marginRight:8}}),"Arbetar nu"]}),(0,$d.jsxs)("h2",{children:["Vi v\xe4ger era ",(0,$d.jsxs)("em",{children:[z," ",1===z?"faktura":"fakturor"]})," mot verifierat marknadspris."]}),(0,$d.jsx)("p",{className:"work",children:"Kontoret fylls i takt med att varje analys blir klar \u2014 sidan uppdateras automatiskt, ni beh\xf6ver inte g\xf6ra n\xe5got. Det tar oftast n\xe5gon minut."})]}):(0,$d.jsx)(hf,{email:Q,setEmail:J,onSubmit:async function(e){var t;null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e);const r=Q.trim();if(r&&!ee){te(!0),Z(null),ne("");try{var n;const e=await fetch("/api/reveal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r})}),t=await e.json().catch(()=>({}));null!==(n=t.findings)&&void 0!==n&&n.length?Z(t):ne(t.note||"Vi kunde inte l\xe4sa av den dom\xe4nen just nu \u2014 kontrollera adressen och f\xf6rs\xf6k igen.")}catch{ne("Vi n\xe5r inte Arvo just nu \u2014 f\xf6rs\xf6k igen om en stund.")}finally{te(!1)}}},loading:ee,reveal:X,note:re}),(0,$d.jsxs)(Nf,{children:[(0,$d.jsx)("div",{className:"eyebrow",children:"Var pengarna oftast rinner"}),(0,$d.jsxs)("h2",{children:["\xd6verbetalningen sitter oftast i ",(0,$d.jsx)("em",{children:"IT-licenser, telefoni och mjukvara."})]}),(0,$d.jsx)("p",{className:"work",children:"B\xf6rja d\xe4r \u2014 en enda faktura r\xe4cker f\xf6r ert f\xf6rsta fynd, ofta inom minuter. L\xe4gg sedan till resten: ju fler avtal Arvo ser, desto skarpare blir bilden av var ni betalar mer \xe4n marknaden."})]}),(0,$d.jsxs)(Qf,{children:[(0,$d.jsxs)("div",{className:"cm-eyebrow",children:["Er kostnadskarta \xb7 ",rg.length," kategorier"]}),(0,$d.jsx)("div",{className:"cm-grid",children:rg.map(e=>(0,$d.jsxs)("div",{className:"cm-cell"+("verdict"===e.mode?" hot":""),children:[(0,$d.jsxs)("div",{className:"cm-top",children:[(0,$d.jsx)("span",{className:"cm-ico",children:(0,$d.jsx)(yu,{name:e.icon,size:19,stroke:1.7})}),"verdict"===e.mode?(0,$d.jsx)("span",{className:"cm-tag",children:"B\xf6rja h\xe4r"}):(0,$d.jsx)("span",{className:"cm-tag offert",children:"via offert"})]}),(0,$d.jsx)("span",{className:"cm-label",children:e.label}),(0,$d.jsx)("span",{className:"cm-hint",children:e.hint}),e.know&&(0,$d.jsx)("span",{className:"cm-verified",children:e.know})]},e.label))})]}),(0,$d.jsxs)(Jf,{children:[(0,$d.jsxs)("div",{className:"door",children:[(0,$d.jsx)("div",{className:"door-k",children:"Snabbast \xb7 vidarebefordra"}),(0,$d.jsx)("h4",{children:"T\xf6m m\xe5nadens fakturor i ett mejl."}),(0,$d.jsx)("p",{children:"Markera era leverant\xf6rsfakturor (PDF) i inkorgen och vidarebefordra allt p\xe5 en g\xe5ng \u2014 analyserna landar h\xe4r."}),(0,$d.jsx)("div",{className:"spacer"}),(0,$d.jsx)(Xf,{children:"faktura@inbox.arvoflow.se"})]}),(0,$d.jsxs)("div",{className:"door",children:[(0,$d.jsx)("div",{className:"door-k",children:"Eller \xb7 ladda upp direkt"}),(0,$d.jsx)("h4",{children:"Dra in flera fakturor h\xe4r."}),(0,$d.jsx)("p",{children:"PDF \xb7 upp till 20 \xe5t g\xe5ngen \xb7 vi sparar aldrig filen efter analysen."}),(0,$d.jsx)("div",{className:"spacer"}),(0,$d.jsxs)(Zf,{className:`${V?"busy":""}${W?" over":""}`,onDrop:e=>{var t;e.preventDefault(),q(!1),ue(null===(t=e.dataTransfer)||void 0===t?void 0:t.files)},onDragOver:e=>{e.preventDefault(),W||q(!0)},onDragLeave:()=>q(!1),children:[(0,$d.jsx)("span",{className:"dz-ico",children:(0,$d.jsx)(yu,{name:"upload",size:22,stroke:1.7})}),(0,$d.jsx)("span",{className:"dz-t",children:V?"Analyserar\u2026":W?"Sl\xe4pp h\xe4r":"Sl\xe4pp eller v\xe4lj PDF-fakturor"}),(0,$d.jsx)("span",{className:"dz-s",children:"Flera samtidigt g\xe5r bra"}),(0,$d.jsx)("input",{type:"file",accept:"application/pdf",multiple:!0,disabled:V,onChange:e=>{const t=e.target.files;e.target.value="",ue(t)}})]}),M.length>0&&(0,$d.jsx)(eg,{children:M.map((e,t)=>(0,$d.jsxs)("div",{className:"dp-row",children:[(0,$d.jsx)("span",{className:"dp-name",children:e.name}),(0,$d.jsx)("span",{className:"dp-stat "+("done"===e.status?"done":"work"===e.status||"gate"===e.status||"review"===e.status?"work":"fail"),title:"fail"===e.status&&e.hint||"",children:"done"===e.status?"Klar":"review"===e.status?"Manuell granskning":"fail"===e.status?e.label||"Misslyckades":"gate"===e.status?"Gr\xe4ns n\xe5dd":"Analyserar\u2026"})]},`${e.name}-${t}`))}),K&&(0,$d.jsx)(eg,{children:(0,$d.jsx)("p",{className:"dp-note",children:K})})]})]}),(0,$d.jsxs)(tg,{children:[(0,$d.jsx)("span",{className:"ft-ico",children:(0,$d.jsx)(yu,{name:"lock",size:18,stroke:1.7})}),(0,$d.jsxs)("span",{className:"ft-txt",children:[(0,$d.jsx)("b",{children:"Snart: koppla Fortnox."})," N\xe4r integrationen \xe4r p\xe5 plats l\xe4ses hela leverant\xf6rsreskontran automatiskt \u2014 d\xe5 slutar ni ladda upp."]}),(0,$d.jsx)("span",{className:"ft-soon",children:"Lanseras inom kort"})]}),(0,$d.jsxs)(Mf,{children:[(0,$d.jsx)("div",{className:"keyline"}),(0,$d.jsx)("div",{className:"mark",children:"ARVO"}),(0,$d.jsx)("div",{className:"tagline",children:"Finansiell intelligens som aldrig sover."})]})]})]})})}const yg=jd`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}`,kg=vd.div`min-height:100vh;background:#0E1A17;color:#fff;font-family:system-ui,sans-serif;padding:32px 24px;`,jg=vd.h1`font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 4px;`,wg=vd.p`font-size:13px;color:rgba(255,255,255,.45);margin:0 0 28px;`,Sg=vd.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;@media(max-width:700px){grid-template-columns:1fr 1fr;}`,$g=vd.div`background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px 18px;`,zg=vd.p`font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.4);margin:0 0 4px;`,_g=vd.p`font-size:22px;font-weight:800;color:#5DD6CA;margin:0;letter-spacing:-.02em;`,Ng=vd.div`margin-bottom:28px;animation:${yg} .4s ease both;`,Eg=vd.h2`font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 10px;`,Ag=vd.div`background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;`,Cg=vd.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:10px 16px;background:rgba(255,255,255,.06);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);gap:12px;`,Dg=vd.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:11px 16px;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;gap:12px;align-items:center;&:hover{background:rgba(255,255,255,.03);}`,Fg=vd.span`display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600;background:${e=>{let{$c:t}=e;return null!==t&&void 0!==t?t:"rgba(255,255,255,.1)"}};color:#fff;`,Tg=vd.form`display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;`,Og=vd.input`padding:10px 14px;border-radius:100px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;flex:1;min-width:200px;outline:none;&::placeholder{color:rgba(255,255,255,.3);}`,Pg=vd.button`padding:10px 20px;border-radius:100px;border:none;cursor:pointer;font-size:13px;font-weight:700;background:linear-gradient(135deg,#5DD6CA,#1B6E66);color:#fff;white-space:nowrap;&:disabled{opacity:.5;cursor:not-allowed;}`,Lg=vd.div`margin-top:8px;background:rgba(93,214,202,.1);border:1px solid rgba(93,214,202,.25);border-radius:8px;padding:10px 14px;font-size:12px;color:#5DD6CA;word-break:break-all;`,Rg=vd.div`max-width:360px;margin:80px auto;text-align:center;`,Ig=vd.p`padding:20px 16px;font-size:13px;color:rgba(255,255,255,.3);margin:0;`;function Mg(e){return e?new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"\u2013"}function Bg(e){return null==e?"\u2013":Math.round(e).toLocaleString("sv-SE")}function Vg(){var e,t,r,a,i,o,s,l,c,d,u,p,h,m,f,g,x,v,b,y,k,j;const[w,S]=(0,n.useState)(()=>{var e;return null!==(e=sessionStorage.getItem("arvo_admin_token"))&&void 0!==e?e:""}),[$,z]=(0,n.useState)(""),[_,N]=(0,n.useState)(!1),[E,A]=(0,n.useState)(null),[C,D]=(0,n.useState)(""),[F,T]=(0,n.useState)(""),[O,P]=(0,n.useState)(""),[L,R]=(0,n.useState)("72"),[I,M]=(0,n.useState)(""),[B,V]=(0,n.useState)("idle"),[U,K]=(0,n.useState)("queue"),[H,W]=(0,n.useState)("idle"),[q,Y]=(0,n.useState)(null),[G,Q]=(0,n.useState)(null),[J,X]=(0,n.useState)(null),[Z,ee]=(0,n.useState)("list"),[te,re]=(0,n.useState)(""),[ne,ae]=(0,n.useState)(null),[ie,oe]=(0,n.useState)(null),[se,le]=(0,n.useState)(null),[ce,de]=(0,n.useState)(null),[ue,pe]=(0,n.useState)(null),[he,me]=(0,n.useState)("category"),[fe,ge]=(0,n.useState)(""),[xe,ve]=(0,n.useState)(""),[be,ye]=(0,n.useState)(!1),[ke,je]=(0,n.useState)(null),[we,Se]=(0,n.useState)(null),[$e,ze]=(0,n.useState)(null),[_e,Ne]=(0,n.useState)({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),[Ee,Ae]=(0,n.useState)("idle"),[Ce,De]=(0,n.useState)(null),Fe=(0,n.useCallback)(async e=>{D("");try{const r=await fetch("/api/admin/dashboard",{headers:{"x-admin-token":e}}),n=await r.json();var t;if(!r.ok)return void D(null!==(t=n.error)&&void 0!==t?t:"Ej beh\xf6rig");A(n),N(!0),sessionStorage.setItem("arvo_admin_token",e)}catch{D("N\xe4tverksfel")}},[]);(0,n.useEffect)(()=>{w&&Fe(w)},[w,Fe]);const[Te,Oe]=(0,n.useState)(null),Pe=(0,n.useCallback)(()=>{fetch("/api/admin/benchmark-stats",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(Oe).catch(()=>{})},[w]),Le=(0,n.useCallback)(()=>{fetch("/api/admin/prospects",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(e=>{var t,r;Se(null!==(t=e.prospects)&&void 0!==t?t:[]),ze(null!==(r=e.stats)&&void 0!==r?r:{})}).catch(()=>{})},[w]);if(!_)return(0,$d.jsx)(kg,{children:(0,$d.jsxs)(Rg,{children:[(0,$d.jsx)(jg,{children:"Arvo Admin"}),(0,$d.jsx)(wg,{children:"Ange ADMIN_TOKEN f\xf6r att forts\xe4tta"}),C&&(0,$d.jsx)("p",{style:{color:"#EF4444",fontSize:13,marginBottom:12},children:C}),(0,$d.jsxs)("form",{onSubmit:async function(e){e.preventDefault(),S($)},style:{display:"flex",flexDirection:"column",gap:10},children:[(0,$d.jsx)(Og,{type:"password",placeholder:"Admin-token",value:$,onChange:e=>z(e.target.value),style:{borderRadius:10,textAlign:"center"}}),(0,$d.jsx)(Pg,{type:"submit",disabled:!$,children:"Logga in \u2192"})]})]})});const Re=null!==(e=null===E||void 0===E?void 0:E.stats)&&void 0!==e?e:{},Ie="2fr 1.5fr 1fr 1fr 1fr 1.2fr 84px",Me={padding:"6px 10px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:12.5,cursor:"pointer",outline:"none"},Be=["saas-crm","saas-productivity","saas-finance","saas-devtools","saas-other","mobil","bredband","el","skrivarleasing","kortterminal","molnvaxel","loneadmin","utrustningsleasing","managed-workplace","larm-bevakning","foretagshalsovard","bankavgifter","forsakring-foretag","serverhosting","it-support","faktura-tjanst","leasing-bil"],Ve="2fr 1.5fr 1.5fr 1.5fr",Ue="2fr 1.5fr 0.5fr 2fr 1.5fr";return(0,$d.jsxs)(kg,{children:[(0,$d.jsx)(jg,{children:"Arvo Admin"}),(0,$d.jsxs)(wg,{children:["Live-data fr\xe5n Neon Postgres \xb7 senast laddad ",(new Date).toLocaleTimeString("sv-SE")]}),(0,$d.jsxs)(Sg,{children:[(0,$d.jsxs)($g,{children:[(0,$d.jsx)(zg,{children:"Totalt analyserade"}),(0,$d.jsx)(_g,{children:Bg(Re.total_analyses)})]}),(0,$d.jsxs)($g,{children:[(0,$d.jsx)(zg,{children:"Auto (klara)"}),(0,$d.jsx)(_g,{children:Bg(Re.auto_count)})]}),(0,$d.jsxs)($g,{children:[(0,$d.jsx)(zg,{children:"Review queue"}),(0,$d.jsx)(_g,{style:{color:"#F59E0B"},children:Bg(Re.review_count)})]}),(0,$d.jsxs)($g,{children:[(0,$d.jsx)(zg,{children:"Unika anv\xe4ndare"}),(0,$d.jsx)(_g,{children:Bg(Re.unique_users)})]}),(0,$d.jsxs)($g,{children:[(0,$d.jsx)(zg,{children:"Byten rekommenderade"}),(0,$d.jsx)(_g,{children:Bg(Re.switch_recommended)})]}),(0,$d.jsxs)($g,{children:[(0,$d.jsx)(zg,{children:"Snitt nettobesparing"}),(0,$d.jsxs)(_g,{children:[Bg(Re.avg_net_saving)," kr"]})]}),(0,$d.jsxs)($g,{children:[(0,$d.jsx)(zg,{children:"Waitlist"}),(0,$d.jsx)(_g,{children:null!==(t=null===E||void 0===E||null===(r=E.waitlist)||void 0===r?void 0:r.length)&&void 0!==t?t:"\u2013"})]}),(0,$d.jsxs)($g,{children:[(0,$d.jsx)(zg,{children:"Feedback"}),(0,$d.jsx)(_g,{children:null!==(a=null===E||void 0===E||null===(i=E.feedback)||void 0===i?void 0:i.length)&&void 0!==a?a:"\u2013"})]})]}),(0,$d.jsxs)(Ng,{children:[(0,$d.jsx)(Eg,{children:"Databasmigration"}),(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)("div",{style:{padding:"16px 18px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[(0,$d.jsxs)("p",{style:{margin:0,fontSize:13,color:"rgba(255,255,255,.6)",flex:1},children:["Skapar tabellerna ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"waitlist"}),","," ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"invoice_feedback"})," och"," ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"magic_tokens"})," i databasen. S\xe4kert att k\xf6ra flera g\xe5nger (IF NOT EXISTS)."]}),(0,$d.jsx)(Pg,{type:"button",onClick:async function(){W("loading"),Y(null);try{const e=await fetch("/api/admin/run-migration",{method:"POST",headers:{"x-admin-token":w}}),t=await e.json();Y(t),W(t.ok?"done":"error")}catch{W("error")}},disabled:"loading"===H,style:{background:"done"===H?"#16a34a":void 0},children:"loading"===H?"K\xf6r migration\u2026":"done"===H?"\u2713 Migration klar!":"K\xf6r migration \u2192"})]}),q&&(0,$d.jsx)("div",{style:{padding:"0 18px 16px",display:"flex",flexDirection:"column",gap:4},children:null===(o=q.results)||void 0===o?void 0:o.map(e=>(0,$d.jsxs)("div",{style:{fontSize:12,color:e.ok?"#5DD6CA":"#EF4444"},children:[e.ok?"\u2713":"\u2717"," ",e.name,e.error?` \u2014 ${e.error}`:""]},e.name))})]})]}),(0,$d.jsxs)(Ng,{children:[(0,$d.jsx)(Eg,{children:"Generera demo-l\xe4nk (Magic Link)"}),(0,$d.jsx)(Ag,{children:(0,$d.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$d.jsx)("p",{style:{margin:"0 0 12px",fontSize:13,color:"rgba(255,255,255,.6)"},children:"Skickar en tidsbegr\xe4nsad l\xe4nk som ger direkt\xe5tkomst utan gate."}),(0,$d.jsxs)(Tg,{onSubmit:async function(e){if(e.preventDefault(),F){V("loading"),M("");try{const e=await fetch("/api/admin/magic-link",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":w},body:JSON.stringify({email:F,note:O||void 0,expiresInHours:Number(L)})}),t=await e.json();if(!e.ok)return void V("error");M(t.link),V("done")}catch{V("error")}}},children:[(0,$d.jsx)(Og,{type:"email",placeholder:"mottagare@foretag.se",value:F,onChange:e=>T(e.target.value),required:!0}),(0,$d.jsx)(Og,{placeholder:"Notering (frivillig)",value:O,onChange:e=>P(e.target.value),style:{maxWidth:200}}),(0,$d.jsx)(Og,{type:"number",placeholder:"Timmar (default 72)",value:L,onChange:e=>R(e.target.value),style:{maxWidth:140}}),(0,$d.jsx)(Pg,{type:"submit",disabled:!F||"loading"===B,children:"loading"===B?"Genererar\u2026":"Skicka magic link \u2192"})]}),I&&(0,$d.jsxs)(Lg,{children:["\u2713 L\xe4nk skickad till ",F,(0,$d.jsx)("br",{}),(0,$d.jsx)("strong",{children:I})]}),"error"===B&&(0,$d.jsx)("p",{style:{color:"#EF4444",fontSize:12,marginTop:8},children:"Misslyckades \u2014 kontrollera ADMIN_TOKEN och RESEND_API_KEY."})]})})]}),(0,$d.jsx)("div",{style:{display:"flex",gap:4,marginBottom:16},children:[["queue","Review Queue"],["waitlist","Waitlist"],["feedback","Feedback"],["corrections","Korrektioner \ud83e\udde0"],["connections","Anslutningar \ud83d\udd17"],["outbound","Outbound \ud83d\ude80"],["prisbok","Prisboken \ud83d\udcd2"]].map(e=>{let[t,r]=e;return(0,$d.jsx)("button",{onClick:()=>K(t),style:{padding:"7px 16px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,background:U===t?"#5DD6CA":"rgba(255,255,255,.08)",color:U===t?"#0E1A17":"rgba(255,255,255,.6)"},children:r},t)})}),"queue"===U&&(0,$d.jsx)(Ng,{children:(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:Ie,children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"\xc5rskkostnad"}),(0,$d.jsx)("span",{children:"Bransch"}),(0,$d.jsx)("span",{children:"Anst\xe4llda"}),(0,$d.jsx)("span",{children:"Datum"}),(0,$d.jsx)("span",{children:"\xc5tg\xe4rd"})]}),0===(null!==(s=null===E||void 0===E?void 0:E.reviewQueue)&&void 0!==s?s:[]).length&&(0,$d.jsx)(Ig,{children:"Inga review_queue-fakturor \xe4nnu."}),(null!==(l=null===E||void 0===E?void 0:E.reviewQueue)&&void 0!==l?l:[]).map(e=>(0,$d.jsxs)(n.Fragment,{children:[(0,$d.jsxs)(Dg,{$cols:Ie,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.supplier||e.normalized_supplier||"\u2013"}),(0,$d.jsx)(Fg,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$d.jsxs)("span",{children:[Bg(e.annual_cost)," kr"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.industry}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.employees}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Mg(e.created_at)}),(0,$d.jsx)("button",{onClick:()=>{const t=ue===e.id;pe(t?null:e.id),ge(""),ve(""),me("category"),je(null)},style:{padding:"4px 10px",borderRadius:100,border:"1px solid rgba(93,214,202,.3)",background:ue===e.id?"rgba(93,214,202,.15)":"transparent",color:"#5DD6CA",cursor:"pointer",fontSize:11.5,fontWeight:600},children:ue===e.id?"\u2715":"Korrigera"})]}),ue===e.id&&(0,$d.jsxs)("div",{style:{padding:"14px 16px",borderTop:"1px solid rgba(93,214,202,.12)",background:"rgba(93,214,202,.03)"},children:[(0,$d.jsx)("p",{style:{margin:"0 0 10px",fontSize:12,color:"rgba(255,255,255,.45)"},children:"Manuell korrektion \u2014 sparas som labeled data och tr\xe4nar systemet."}),(0,$d.jsxs)("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[(0,$d.jsxs)("select",{value:he,onChange:e=>{me(e.target.value),ge("")},style:Me,children:[(0,$d.jsx)("option",{value:"category",children:"Kategori"}),(0,$d.jsx)("option",{value:"recurring",children:"\xc5terkommande"}),(0,$d.jsx)("option",{value:"route",children:"Route"})]}),"category"===he&&(0,$d.jsxs)("select",{value:fe,onChange:e=>ge(e.target.value),style:Me,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj r\xe4tt kategori\u2026"}),Be.map(e=>(0,$d.jsx)("option",{value:e,children:e},e))]}),"recurring"===he&&(0,$d.jsxs)("select",{value:fe,onChange:e=>ge(e.target.value),style:Me,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$d.jsx)("option",{value:"true",children:"true (\xe5terkommande)"}),(0,$d.jsx)("option",{value:"false",children:"false (eng\xe5ngskostnad)"})]}),"route"===he&&(0,$d.jsxs)("select",{value:fe,onChange:e=>ge(e.target.value),style:Me,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$d.jsx)("option",{value:"auto",children:"auto"}),(0,$d.jsx)("option",{value:"review_queue",children:"review_queue"}),(0,$d.jsx)("option",{value:"unsupported",children:"unsupported"})]}),(0,$d.jsx)(Og,{placeholder:"Anledning (valfri)",value:xe,onChange:e=>ve(e.target.value),style:{flex:"1 1 140px",borderRadius:8,padding:"6px 12px",fontSize:12.5}}),(0,$d.jsx)(Pg,{type:"button",onClick:()=>async function(e){if(fe&&!be){ye(!0);try{var t,r;const n="category"===he?null!==(t=e.category)&&void 0!==t?t:"":"recurring"===he?"false":"";(await fetch("/api/admin/corrections",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":w},body:JSON.stringify({analysisId:e.id,field:he,originalValue:n,correctedValue:fe,reason:xe||"operator_manual_review",category:"category"===he?fe:null!==(r=e.category)&&void 0!==r?r:null,supplier:e.normalized_supplier||e.supplier||null,operatorReasoning:te||null})})).ok&&(je(e.id),setTimeout(()=>{je(null),pe(null),ge(""),ve(""),re(""),me("category")},2500))}catch{}finally{ye(!1)}}}(e),disabled:!fe||be,style:{padding:"7px 18px",fontSize:12.5},children:be?"Sparar\u2026":"Spara \u2192"})]}),(0,$d.jsx)("textarea",{placeholder:"Resonemang / princip (valfri men v\xe4rdefullt \u2014 anv\xe4nds som few-shot-exempel i AI:n n\xe4sta g\xe5ng)",value:te,onChange:e=>re(e.target.value),style:{marginTop:8,width:"100%",boxSizing:"border-box",padding:"8px 12px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.05)",color:"#fff",fontSize:12,fontFamily:"inherit",resize:"vertical",minHeight:56,outline:"none"}}),ke===e.id&&(0,$d.jsx)("p",{style:{color:"#5DD6CA",fontSize:12,margin:"8px 0 0"},children:"\u2713 Korrektion sparad \u2014 systemet l\xe4r sig."})]})]},e.id))]})}),"waitlist"===U&&(0,$d.jsx)(Ng,{children:(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:Ve,children:[(0,$d.jsx)("span",{children:"E-post"}),(0,$d.jsx)("span",{children:"K\xe4lla"}),(0,$d.jsx)("span",{children:"Reason"}),(0,$d.jsx)("span",{children:"Datum"})]}),0===(null!==(c=null===E||void 0===E?void 0:E.waitlist)&&void 0!==c?c:[]).length&&(0,$d.jsx)(Ig,{children:"Ingen waitlist \xe4nnu."}),(null!==(d=null===E||void 0===E?void 0:E.waitlist)&&void 0!==d?d:[]).map(e=>{var t;return(0,$d.jsxs)(Dg,{$cols:Ve,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.email}),(0,$d.jsx)(Fg,{$c:"rgba(245,158,11,.15)",children:e.source}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.reason)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Mg(e.created_at)})]},e.id)})]})}),"feedback"===U&&(0,$d.jsx)(Ng,{children:(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:Ue,children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"R\xf6st"}),(0,$d.jsx)("span",{children:"Kommentar"}),(0,$d.jsx)("span",{children:"Datum"})]}),0===(null!==(u=null===E||void 0===E?void 0:E.feedback)&&void 0!==u?u:[]).length&&(0,$d.jsx)(Ig,{children:"Ingen feedback \xe4nnu."}),(null!==(p=null===E||void 0===E?void 0:E.feedback)&&void 0!==p?p:[]).map(e=>{var t,r;return(0,$d.jsxs)(Dg,{$cols:Ue,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.supplier||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.category)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{fontSize:18},children:"up"===e.vote?"\ud83d\udc4d":"\ud83d\udc4e"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(r=e.comment)&&void 0!==r?r:"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Mg(e.created_at)})]},e.id)})]})}),"corrections"===U&&(0,$d.jsxs)(Ng,{children:[(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"},children:[(0,$d.jsx)(Eg,{style:{margin:0},children:"Flywheel \u2014 Labeled Corrections"}),(0,$d.jsxs)("div",{style:{marginLeft:"auto",display:"flex",gap:4,flexWrap:"wrap"},children:[[["list","Lista"],["patterns","M\xf6nster"],["learning","Aktiv inl\xe4rning \ud83d\udd2c"],["market","Marknadsdata \ud83d\udcca"]].map(e=>{let[t,r]=e;return(0,$d.jsx)("button",{onClick:()=>{ee(t);const e={"x-admin-token":w};"patterns"!==t||J||fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return X(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"!==t||G||fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return Q(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"!==t||ne||fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ae(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"!==t||ie||fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>oe(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:Z===t?"#5DD6CA":"rgba(255,255,255,.08)",color:Z===t?"#0E1A17":"rgba(255,255,255,.6)"},children:r},t)}),(0,$d.jsx)("button",{onClick:()=>{const e={"x-admin-token":w};"patterns"===Z&&fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return X(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"===Z&&fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return Q(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"===Z&&fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ae(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"===Z&&fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>oe(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]})]}),"list"===Z&&(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$d.jsx)("span",{children:"F\xe4lt"}),(0,$d.jsx)("span",{children:"Fr\xe5n"}),(0,$d.jsx)("span",{children:"Till"}),(0,$d.jsx)("span",{children:"Anledning"}),(0,$d.jsx)("span",{children:"Av"}),(0,$d.jsx)("span",{children:"Datum"})]}),null===G&&(0,$d.jsx)(Ig,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta korrektioner."}),0===(null===G||void 0===G?void 0:G.length)&&(0,$d.jsx)(Ig,{children:"Inga korrektioner \xe4nnu \u2014 systemet \xe4r nytt."}),(null!==G&&void 0!==G?G:[]).map(e=>(0,$d.jsxs)(n.Fragment,{children:[(0,$d.jsxs)(Dg,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$d.jsx)(Fg,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$d.jsx)("span",{style:{color:"rgba(255,100,100,.8)",fontSize:11.5},children:e.original_value||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(100,220,180,.8)",fontSize:11.5},children:e.corrected_value||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.45)",fontSize:11},children:e.reason}),(0,$d.jsx)(Fg,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:Mg(e.created_at)})]}),e.operator_reasoning&&(0,$d.jsxs)("div",{style:{padding:"6px 16px 10px",borderTop:"1px solid rgba(255,255,255,.04)",background:"rgba(93,214,202,.02)"},children:[(0,$d.jsx)("span",{style:{fontSize:10.5,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",color:"rgba(93,214,202,.5)",marginRight:8},children:"Princip"}),(0,$d.jsx)("span",{style:{fontSize:12,color:"rgba(255,255,255,.55)"},children:e.operator_reasoning})]})]},e.id))]}),"patterns"===Z&&(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"1fr 2fr 80px 80px",children:[(0,$d.jsx)("span",{children:"F\xe4lt"}),(0,$d.jsx)("span",{children:"M\xf6nster (reason)"}),(0,$d.jsx)("span",{children:"Antal"}),(0,$d.jsx)("span",{children:"Av"})]}),null===J&&(0,$d.jsx)(Ig,{children:"Klicka \u21bb Ladda f\xf6r att analysera m\xf6nster."}),0===(null===J||void 0===J?void 0:J.length)&&(0,$d.jsx)(Ig,{children:"Inga m\xf6nster \xe4nnu."}),(null!==J&&void 0!==J?J:[]).map((e,t)=>(0,$d.jsxs)(Dg,{$cols:"1fr 2fr 80px 80px",children:[(0,$d.jsx)(Fg,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.6)",fontSize:11.5},children:e.reason}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.count>=5?"#F59E0B":"#5DD6CA"},children:[e.count,"\xd7"]}),(0,$d.jsx)(Fg,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by})]},t))]}),"learning"===Z&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{style:{marginBottom:12,padding:"10px 14px",background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,fontSize:12.5,color:"rgba(255,255,255,.7)"},children:"Leverant\xf6rer som inte matchar n\xe5got k\xe4nt fingerprint \u2014 flaggade automatiskt av pipeline. L\xe4gg till korrektion f\xf6r att l\xe4ra systemet."}),(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"2fr 80px 1.5fr",children:[(0,$d.jsx)("span",{children:"Leverant\xf6r (ok\xe4nd)"}),(0,$d.jsx)("span",{children:"Sedd"}),(0,$d.jsx)("span",{children:"Senast"})]}),null===ne&&(0,$d.jsx)(Ig,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta k\xf6n."}),0===(null===ne||void 0===ne?void 0:ne.length)&&(0,$d.jsx)(Ig,{children:"Inga ok\xe4nda leverant\xf6rer \u2014 systemet k\xe4nner igen alla det sett."}),(null!==ne&&void 0!==ne?ne:[]).map((e,t)=>(0,$d.jsxs)(Dg,{$cols:"2fr 80px 1.5fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,color:"#F59E0B"},children:e.supplier}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.seen_count>=3?"#EF4444":"#F59E0B"},children:[e.seen_count,"\xd7"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Mg(e.last_seen)})]},t))]})]}),"market"===Z&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20},children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)(Eg,{children:"Kategorif\xf6rdelning (operat\xf6rskorrektioner)"}),(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"2fr 80px",children:[(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"Antal"})]}),!ie&&(0,$d.jsx)(Ig,{children:"Klicka \u21bb Ladda."}),0===(null===ie||void 0===ie||null===(h=ie.categoryDist)||void 0===h?void 0:h.length)&&(0,$d.jsx)(Ig,{children:"Inga korrektioner \xe4nnu."}),(null!==(m=null===ie||void 0===ie?void 0:ie.categoryDist)&&void 0!==m?m:[]).map((e,t)=>(0,$d.jsxs)(Dg,{$cols:"2fr 80px",children:[(0,$d.jsx)(Fg,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:[e.count,"\xd7"]})]},t))]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)(Eg,{children:"Mest korrigerade leverant\xf6rer"}),(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"2fr 80px 1fr",children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Korr."}),(0,$d.jsx)("span",{children:"Senast"})]}),!ie&&(0,$d.jsx)(Ig,{children:"Klicka \u21bb Ladda."}),0===(null===ie||void 0===ie||null===(f=ie.topSuppliers)||void 0===f?void 0:f.length)&&(0,$d.jsx)(Ig,{children:"Inga korrektioner \xe4nnu."}),(null!==(g=null===ie||void 0===ie?void 0:ie.topSuppliers)&&void 0!==g?g:[]).map((e,t)=>(0,$d.jsxs)(Dg,{$cols:"2fr 80px 1fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12},children:e.supplier}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.correction_count>=5?"#F59E0B":"#5DD6CA"},children:[e.correction_count,"\xd7"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:Mg(e.last_corrected)})]},t))]})]})]}),(0,$d.jsx)(Eg,{children:"Nya leverant\xf6rer per vecka (senaste 90 dagar)"}),(null===ie||void 0===ie||null===(x=ie.discoveryTrend)||void 0===x?void 0:x.length)>0?(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"2fr 1fr",children:[(0,$d.jsx)("span",{children:"Vecka"}),(0,$d.jsx)("span",{children:"Ny leverant\xf6rer"})]}),(null!==(v=ie.discoveryTrend)&&void 0!==v?v:[]).map((e,t)=>(0,$d.jsxs)(Dg,{$cols:"2fr 1fr",children:[(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:12},children:e.week}),(0,$d.jsx)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:e.new_suppliers})]},t))]}):(0,$d.jsx)(Ig,{children:ie?"Inga data \xe4nnu \u2014 skicka in fakturor f\xf6r att bygga marknadsdata.":"Klicka \u21bb Ladda."})]})]}),"connections"===U&&(0,$d.jsxs)(Ng,{children:[(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center"},children:[(0,$d.jsx)(Eg,{style:{margin:0},children:"OAuth-anslutningar \u2014 Gmail & Outlook"}),(0,$d.jsx)("button",{onClick:()=>{fetch("/api/admin/connections",{headers:{"x-admin-token":w}}).then(e=>e.json()).then(e=>{var t,r;le(null!==(t=e.connections)&&void 0!==t?t:[]),de(null!==(r=e.stats)&&void 0!==r?r:[])}).catch(()=>{})},style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),ce&&ce.length>0&&(0,$d.jsx)("div",{style:{display:"flex",gap:10,marginBottom:14},children:ce.map(e=>(0,$d.jsxs)("div",{style:{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"10px 16px",minWidth:130},children:[(0,$d.jsx)(zg,{children:e.provider}),(0,$d.jsxs)("div",{style:{display:"flex",gap:12,marginTop:4},children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#5DD6CA"},children:e.total}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"totalt"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#4ADE80"},children:e.active}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"aktiva"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#F59E0B"},children:e.last_7d}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"7 dagar"})]})]})]},e.provider))}),(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$d.jsx)("span",{children:"E-post"}),(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Token"}),(0,$d.jsx)("span",{children:"Kopplad"}),(0,$d.jsx)("span",{children:"Uppdaterad"}),(0,$d.jsx)("span",{children:"Status"})]}),null===se&&(0,$d.jsx)(Ig,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta anslutningar."}),0===(null===se||void 0===se?void 0:se.length)&&(0,$d.jsx)(Ig,{children:"Inga anslutningar \xe4nnu \u2014 ingen har kopplat Gmail/Outlook."}),(null!==se&&void 0!==se?se:[]).map(e=>(0,$d.jsxs)(Dg,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.email}),(0,$d.jsx)(Fg,{$c:"gmail"===e.provider?"rgba(234,67,53,.2)":"rgba(0,120,212,.2)",children:e.provider}),(0,$d.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.4)"},children:e.token_expiry?new Date(e.token_expiry).toLocaleDateString("sv-SE"):"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Mg(e.created_at)}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:Mg(e.updated_at)}),(0,$d.jsx)(Fg,{$c:e.token_valid?"rgba(74,222,128,.2)":"rgba(239,68,68,.2)",children:e.token_valid?"OK":"Utg\xe5ngen"})]},e.id))]})]}),"prisbok"===U&&(0,$d.jsxs)(Ng,{children:[(0,$d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:12},children:[(0,$d.jsx)(Eg,{style:{margin:0},children:"Prisbokens cellteckning"}),(0,$d.jsx)("button",{onClick:Pe,style:{marginLeft:"auto",padding:"6px 14px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)"},children:"Uppdatera"})]}),Te?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("p",{style:{fontSize:12.5,color:"rgba(255,255,255,.55)",margin:"0 0 14px"},children:[null!==(b=Te.total_datapoints)&&void 0!==b?b:0," datapunkter totalt \xb7 ",null!==(y=Te.segments_with_real_data)&&void 0!==y?y:0," celler b\xe4r (\u2265",Te.min_points_threshold,") \xb7 celler n\xe4ra tr\xf6skeln fylls medvetet \u2014 v\xe4lj n\xe4sta outbound-lista p\xe5 SNI-koder som tippar dem \xf6ver."]}),(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"1.2fr 1fr .8fr .5fr .8fr",children:[(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"Bransch"}),(0,$d.jsx)("span",{children:"Storlek"}),(0,$d.jsx)("span",{children:"n"}),(0,$d.jsx)("span",{children:"Status"})]}),0===(null!==(k=Te.segments)&&void 0!==k?k:[]).length&&(0,$d.jsx)(Ig,{children:"Prisboken \xe4r tom \u2014 varje analyserad faktura l\xe4gger en datapunkt."}),(null!==(j=Te.segments)&&void 0!==j?j:[]).map((e,t)=>(0,$d.jsxs)(Dg,{$cols:"1.2fr 1fr .8fr .5fr .8fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.category}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.6)"},children:e.industry}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.size_bucket}),(0,$d.jsx)("span",{style:{fontWeight:700},children:e.n}),(0,$d.jsx)(Fg,{$c:"B\xc4R"===e.status?"rgba(93,214,202,.2)":"LIVE-LIGHT"===e.status?"rgba(93,214,202,.12)":"N\xc4RA"===e.status?"rgba(245,158,11,.15)":"rgba(255,255,255,.08)",children:e.status})]},t))]})]}):(0,$d.jsx)(Ig,{children:"Klicka Uppdatera f\xf6r att l\xe4sa cellteckningen."})]}),"outbound"===U&&(0,$d.jsxs)(Ng,{children:[(0,$d.jsx)("div",{style:{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"},children:[["Skapade",null===$e||void 0===$e?void 0:$e.total,"#5DD6CA"],["Mail skickade",null===$e||void 0===$e?void 0:$e.email_sent,"#5DD6CA"],["\xd6ppnade l\xe4nken",null===$e||void 0===$e?void 0:$e.opened,"#F59E0B"],["Konverterade",null===$e||void 0===$e?void 0:$e.converted,"#4ADE80"]].map(e=>{let[t,r,n]=e;return(0,$d.jsxs)($g,{style:{minWidth:120},children:[(0,$d.jsx)(zg,{children:t}),(0,$d.jsx)(_g,{style:{color:n},children:null!==r&&void 0!==r?r:"\u2013"})]},t)})}),(0,$d.jsx)(Eg,{children:"Skapa prospect"}),(0,$d.jsx)(Ag,{children:(0,$d.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$d.jsxs)("form",{onSubmit:async function(e){if(e.preventDefault(),"loading"!==Ee&&_e.companyName&&_e.employees){Ae("loading"),De(null);try{const e=await fetch("/api/generate-prospect",{method:"POST",headers:{"Content-Type":"application/json","x-arvo-admin":w},body:JSON.stringify({companyName:_e.companyName,sniCode:_e.sniCode||void 0,employees:Number(_e.employees),contactEmail:_e.contactEmail||void 0,sendEmail:_e.sendEmail,createdBy:"admin-ui"})}),t=await e.json();De(t),t.ok&&(Ne({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),Le())}catch{De({ok:!1,error:"N\xe4tverksfel"})}finally{Ae("idle")}}},style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"},children:[(0,$d.jsx)(Og,{placeholder:"Bolagsnamn *",value:_e.companyName,onChange:e=>Ne(t=>({...t,companyName:e.target.value})),style:{minWidth:180,borderRadius:8}}),(0,$d.jsx)(Og,{placeholder:"SNI-kod (t.ex. 41)",value:_e.sniCode,onChange:e=>Ne(t=>({...t,sniCode:e.target.value})),style:{width:130,borderRadius:8}}),(0,$d.jsx)(Og,{placeholder:"Antal anst. *",type:"number",value:_e.employees,onChange:e=>Ne(t=>({...t,employees:e.target.value})),style:{width:110,borderRadius:8}}),(0,$d.jsx)(Og,{placeholder:"Kontakt-mail",value:_e.contactEmail,onChange:e=>Ne(t=>({...t,contactEmail:e.target.value})),style:{minWidth:200,borderRadius:8}}),(0,$d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"rgba(255,255,255,.6)",whiteSpace:"nowrap",cursor:"pointer"},children:[(0,$d.jsx)("input",{type:"checkbox",checked:_e.sendEmail,onChange:e=>Ne(t=>({...t,sendEmail:e.target.checked}))}),"Skicka mail"]}),(0,$d.jsx)(Pg,{type:"submit",disabled:"loading"===Ee||!_e.companyName||!_e.employees,children:"loading"===Ee?"\u2026":"Skapa \u2192"})]}),Ce&&(0,$d.jsx)("div",{style:{marginTop:10,padding:"10px 14px",borderRadius:8,background:Ce.ok?"rgba(74,222,128,.1)":"rgba(239,68,68,.1)",border:"1px solid "+(Ce.ok?"rgba(74,222,128,.25)":"rgba(239,68,68,.25)")},children:Ce.ok?(0,$d.jsxs)("span",{style:{fontSize:12.5,color:"#4ADE80"},children:["\u2713 Skapad:\xa0",(0,$d.jsx)("a",{href:Ce.url,target:"_blank",rel:"noopener noreferrer",style:{color:"#5DD6CA",wordBreak:"break-all"},children:Ce.url}),Ce.emailSent&&" \xb7 mail skickat"]}):(0,$d.jsxs)("span",{style:{fontSize:12.5,color:"#F87171"},children:["Fel: ",Ce.error]})})]})}),(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:12,marginTop:20,alignItems:"center"},children:[(0,$d.jsx)(Eg,{style:{margin:0},children:"Prospects"}),(0,$d.jsx)("button",{onClick:Le,style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),(0,$d.jsxs)(Ag,{children:[(0,$d.jsxs)(Cg,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$d.jsx)("span",{children:"Bolag"}),(0,$d.jsx)("span",{children:"Bransch"}),(0,$d.jsx)("span",{children:"Anst."}),(0,$d.jsx)("span",{children:"Mail skickat"}),(0,$d.jsx)("span",{children:"\xd6ppnat"}),(0,$d.jsx)("span",{children:"\xc5tg\xe4rd"}),(0,$d.jsx)("span",{children:"Skapad"})]}),null===we&&(0,$d.jsx)(Ig,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta prospects."}),0===(null===we||void 0===we?void 0:we.length)&&(0,$d.jsx)(Ig,{children:"Inga prospects \xe4n \u2014 skapa ett ovan."}),(null!==we&&void 0!==we?we:[]).map(e=>{var t;return(0,$d.jsxs)(Dg,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.company_name}),(0,$d.jsx)("span",{style:{fontSize:11.5,color:"rgba(255,255,255,.50)"},children:e.industry}),(0,$d.jsx)("span",{style:{fontSize:12},children:e.employees}),(0,$d.jsx)("span",{style:{fontSize:11,color:e.email_sent_at?"rgba(255,255,255,.5)":"rgba(255,255,255,.2)"},children:Mg(e.email_sent_at)}),(0,$d.jsx)("span",{style:{fontSize:11,color:e.opened_at?"#F59E0B":"rgba(255,255,255,.2)"},children:Mg(e.opened_at)}),(0,$d.jsx)(Fg,{$c:"upload"===e.action?"rgba(74,222,128,.25)":"activate"===e.action?"rgba(93,214,202,.25)":"rgba(255,255,255,.07)",children:null!==(t=e.action)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.30)"},children:Mg(e.created_at)})]},e.id)})]})]})]})}const Ug=vd.div`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`,Kg=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 48px 44px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 32px rgba(0,0,0,.07);
  @media (max-width: 520px) { padding: 36px 24px; }
`,Hg=vd.div`
  margin-bottom: 36px;
`,Wg=vd.p`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin: 0 0 10px;
`,qg=vd.h1`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 10px;
  line-height: 1.3;
`,Yg=vd.p`
  font-size: 14.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin: 0 0 32px;
`,Gg=vd.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,Qg=vd.input`
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
`,Jg=vd.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin-bottom: 8px;
  letter-spacing: 0.01em;
`,Xg=vd.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 0 24px;
`,Zg=vd(vs)`
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  text-decoration: none;
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`;function ex(){const e=new URLSearchParams(window.location.search),t=e.get("id"),r=e.get("svar"),[a,i]=(0,n.useState)("ja"===r?"cost":"nej"===r?"submitting-no":"question"),[o,s]=(0,n.useState)(""),[l,c]=(0,n.useState)("idle"),[d,u]=(0,n.useState)("");async function p(e,r){if(t){c("submitting");try{const n=await fetch("/api/outcome-survey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:t,switched:e,actualAnnualCost:r?Number(String(r).replace(/\s/g,"")):null})}),a=await n.json();a.supplier&&u(a.supplier),c("done")}catch{c("error")}}else c("done")}return(0,n.useEffect)(()=>{"nej"===r&&t&&p(!1,null)},[]),"done"===l?(0,$d.jsx)(Ug,{children:(0,$d.jsxs)(Kg,{children:[(0,$d.jsx)(Hg,{children:(0,$d.jsx)(vs,{to:"/",children:(0,$d.jsx)(Pd,{})})}),(0,$d.jsx)(Xg,{children:"\u2713"}),(0,$d.jsx)(qg,{children:"Tack \u2014 det hj\xe4lper oss mycket."}),(0,$d.jsxs)(Yg,{children:["Varje svar g\xf6r Arvo lite mer precis. N\xe4sta kund som analyserar en",d?` ${d}`:"","-faktura drar nytta av det ni just ber\xe4ttade."]}),(0,$d.jsx)(Md,{as:vs,to:"/testa-faktura",$variant:"gradient",$size:"md",children:"Analysera en ny faktura \u2192"})]})}):"submitting-no"===a||"nej"===r&&"done"!==l?(0,$d.jsx)(Ug,{children:(0,$d.jsxs)(Kg,{style:{textAlign:"center"},children:[(0,$d.jsx)(Hg,{style:{textAlign:"left"},children:(0,$d.jsx)(vs,{to:"/",children:(0,$d.jsx)(Pd,{})})}),(0,$d.jsx)(Yg,{style:{margin:"32px 0 0"},children:"Registrerar ert svar\u2026"})]})}):(0,$d.jsx)(Ug,{children:(0,$d.jsxs)(Kg,{children:[(0,$d.jsx)(Hg,{children:(0,$d.jsx)(vs,{to:"/",children:(0,$d.jsx)(Pd,{})})}),(0,$d.jsx)(Wg,{children:"60-dagars uppf\xf6ljning"}),"question"===a&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(qg,{children:"Bytte ni leverant\xf6r efter analysen?"}),(0,$d.jsx)(Yg,{children:"Det tar 30 sekunder och hj\xe4lper oss att bli mer precisa f\xf6r er och alla kommande kunder."}),(0,$d.jsxs)(Gg,{children:[(0,$d.jsx)(Md,{$variant:"gradient",$size:"md",onClick:()=>i("cost"),children:"Ja, vi bytte \u2192"}),(0,$d.jsx)(Md,{$variant:"ghost",$size:"md",onClick:()=>p(!1,null),children:"Inte \xe4n"})]})]}),"cost"===a&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(qg,{children:"Vad betalar ni nu per \xe5r?"}),(0,$d.jsx)(Yg,{children:"Ange er nya \xe5rskostnad (kr/\xe5r) \u2014 vi j\xe4mf\xf6r med vad vi f\xf6rutsp\xe5dde."}),(0,$d.jsx)(Jg,{htmlFor:"actual-cost",children:"Ny \xe5rskostnad (kr)"}),(0,$d.jsx)(Qg,{id:"actual-cost",type:"text",inputMode:"numeric",placeholder:"t.ex. 48 000",value:o,onChange:e=>s(e.target.value),autoFocus:!0}),(0,$d.jsxs)(Gg,{children:[(0,$d.jsx)(Md,{$variant:"gradient",$size:"md",disabled:"submitting"===l,onClick:()=>p(!0,o),children:"submitting"===l?"Sparar\u2026":"Skicka \u2192"}),(0,$d.jsx)(Md,{$variant:"ghost",$size:"sm",onClick:()=>p(!0,null),children:"Hoppa \xf6ver kostnaden"})]}),"error"===l&&(0,$d.jsx)("p",{style:{color:"#D94F3C",fontSize:13,margin:"8px 0 0"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$d.jsx)(Zg,{to:"/",children:"\u2190 Tillbaka till startsidan"})]})})}const tx=jd`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,rx=jd`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
`,nx=jd`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
`,ax=jd`
  from { stroke-dashoffset: 24; }
  to   { stroke-dashoffset: 0; }
`,ix=jd`
  to { transform: rotate(360deg); }
`,ox=vd.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: #0A1512;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`,sx=vd.section`
  height: 100vh;
  min-height: 600px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`,lx=vd(sx)`
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
`,cx=vd.p`
  margin: 16px 0 4px;
  font-size: 11px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .18em;
  animation: ${tx} 0.7s ease both;
`,dx=vd.p`
  margin: 0 0 48px;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  animation: ${tx} 0.7s 0.1s ease both;
`,ux=vd.p`
  margin: 0 0 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .12em;
  animation: ${tx} 0.7s 0.2s ease both;
`,px=vd.p`
  margin: 0 0 6px;
  font-size: clamp(52px, 9vw, 80px);
  font-weight: 800;
  color: #fff;
  line-height: 1;
  letter-spacing: -.03em;
  animation: ${tx} 0.7s 0.25s ease both;
`,hx=vd.span`
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 400;
  color: rgba(255,255,255,0.40);
  margin-left: 8px;
`,mx=vd.p`
  margin: 0 0 56px;
  font-size: 17px;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  animation: ${tx} 0.7s 0.35s ease both;

  strong { color: #fff; }
`,fx=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: ${tx} 0.7s 0.5s ease both;
`,gx=vd.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .06em;
`,xx=vd.div`
  width: 20px;
  height: 20px;
  color: rgba(29,176,154,0.5);
  animation: ${rx} 1.6s ease-in-out infinite;
`,vx=vd.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;

  @media (max-width: 480px) { display: none; }
`,bx=vd.button`
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
`,yx=vd(sx)`
  padding: 0;
  background: radial-gradient(ellipse at 80% 20%, rgba(29,176,154,0.07) 0%, transparent 60%),
              #0A1512;
`,kx=vd.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 56px 36px 36px;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) { padding: 48px 24px 28px; }
`,jx=vd.p`
  margin: 0 0 24px;
  font-size: 10px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .20em;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  ${e=>{let{$visible:t}=e;return t&&fd`
    opacity: 1;
    transform: translateY(0);
  `}}
`,wx=vd.span`
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

  ${e=>{let{$visible:t}=e;return t&&fd`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Sx=vd.span`
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
`,$x=vd.h1`
  margin: 0 0 12px;
  font-size: clamp(24px, 4.5vw, 38px);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -.02em;

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s 0.1s ease, transform 0.55s 0.1s ease;

  ${e=>{let{$visible:t}=e;return t&&fd`
    opacity: 1;
    transform: translateY(0);
  `}}
`,zx=vd.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.5;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.17s ease, transform 0.5s 0.17s ease;

  ${e=>{let{$visible:t}=e;return t&&fd`
    opacity: 1;
    transform: translateY(0);
  `}}
`,_x=vd.div`
  display: flex;
  gap: 16px;
  margin-bottom: 28px;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.24s ease, transform 0.5s 0.24s ease;

  ${e=>{let{$visible:t}=e;return t&&fd`
    opacity: 1;
    transform: translateY(0);
  `}}

  @media (max-width: 480px) { flex-direction: column; gap: 12px; }
`,Nx=vd.div`
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 18px 20px;
`,Ex=vd.p`
  margin: 0 0 4px;
  font-size: ${e=>{let{$primary:t}=e;return t?"clamp(28px, 5vw, 40px)":"clamp(20px, 3.5vw, 28px)"}};
  font-weight: 800;
  color: ${e=>{let{$primary:t}=e;return t?"#fff":"rgba(255,255,255,0.75)"}};
  line-height: 1;
  letter-spacing: -.02em;
`,Ax=vd.span`
  font-size: 0.55em;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  margin-left: 4px;
`,Cx=vd.p`
  margin: 0;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .08em;
`,Dx=vd.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  flex: 1;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.30s ease, transform 0.5s 0.30s ease;

  ${e=>{let{$visible:t}=e;return t&&fd`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Fx=vd.div`
  padding-top: 24px;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.38s ease, transform 0.5s 0.38s ease;

  ${e=>{let{$visible:t}=e;return t&&fd`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Tx=vd.button`
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
`,Ox=vd.span`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${ix} 0.7s linear infinite;
`,Px=(vd.button`
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
`,vd(sx)`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 32px;
  background: radial-gradient(ellipse at 50% 40%, rgba(29,176,154,0.09) 0%, transparent 65%),
              #0A1512;
`),Lx=vd.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(29,176,154,0.15);
  border: 1.5px solid rgba(29,176,154,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: ${tx} 0.6s ease both;

  svg { overflow: visible; }

  svg path {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: ${ax} 0.5s 0.3s ease forwards;
  }
`,Rx=vd.h2`
  margin: 0 0 12px;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  animation: ${tx} 0.6s 0.1s ease both;
`,Ix=vd.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  max-width: 440px;
  animation: ${tx} 0.6s 0.2s ease both;
`,Mx=vd.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${tx} 0.6s 0.3s ease both;
`,Bx=vd.div`
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.20);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
`,Vx=vd.span`
  font-size: 16px;
  flex-shrink: 0;
`,Ux=vd.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.80);
  line-height: 1.4;

  strong { color: #fff; }
`,Kx=vd.p`
  margin: 0 0 36px;
  font-size: 14px;
  color: #1DB09A;
  animation: ${tx} 0.6s 0.4s ease both;
`,Hx=vd.a`
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
  animation: ${tx} 0.6s 0.45s ease both;

  &:hover {
    background: rgba(255,255,255,0.11);
    color: #fff;
  }
`,Wx=vd.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  gap: 20px;
`,qx=vd.div`
  display: flex;
  gap: 8px;
`,Yx=vd.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1DB09A;
  animation: ${nx} 1.2s ${e=>{let{$i:t}=e;return.2*t}}s ease-in-out infinite;
`,Gx=vd.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  letter-spacing: .04em;
`,Qx=vd.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  padding: 32px;
  text-align: center;
`,Jx=vd.div`
  font-size: 40px;
  margin-bottom: 20px;
`,Xx=vd.h1`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`,Zx=vd.p`
  margin: 0 0 32px;
  font-size: 15px;
  color: rgba(255,255,255,0.45);
  max-width: 360px;
  line-height: 1.6;
`,ev=vd.a`
  background: linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%);
  color: #fff;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  transition: opacity 0.2s;

  &:hover { opacity: 0.88; }
`,tv=e=>Math.round(null!==e&&void 0!==e?e:0).toLocaleString("sv-SE");const rv={recommendation:"Bytesrekommendation",cost_trend:"Prish\xf6jning",overpaying:"\xd6verpris",price_alert:"Prish\xf6jningsvarning"};function nv(e){if(!e)return"";const[t,r]=e.split("-").map(Number),n=new Date(t,r-1,1).toLocaleString("sv-SE",{month:"long",year:"numeric"});return n.charAt(0).toUpperCase()+n.slice(1)}const av=e=>{let{size:t=36}=e;return(0,$d.jsxs)("svg",{width:t,height:t,viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"briefingGrad",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$d.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#briefingGrad)"})]})},iv=()=>(0,$d.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:(0,$d.jsx)("path",{d:"M10 4v12M4 10l6 6 6-6",stroke:"#1DB09A",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),ov=()=>(0,$d.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",fill:"none",children:(0,$d.jsx)("path",{d:"M6 14l6 6 10-12",stroke:"#1DB09A",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})});function sv(){var e;const{token:t}=ho(),[r,a]=(0,n.useState)("loading"),[i,o]=(0,n.useState)(null),[s,l]=(0,n.useState)(""),[c,d]=(0,n.useState)(0),[u,p]=(0,n.useState)({}),[h,m]=(0,n.useState)({}),[f,g]=(0,n.useState)({}),x=(0,n.useRef)(null),v=(0,n.useRef)([]),b=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1300;const[r,a]=(0,n.useState)(0);return(0,n.useEffect)(()=>{if(!e)return;const r=performance.now();let n;const i=o=>{const s=Math.min(1,(o-r)/t),l=1-Math.pow(1-s,3);a(Math.round(l*e)),s<1&&(n=requestAnimationFrame(i))};return n=requestAnimationFrame(i),()=>cancelAnimationFrame(n)},[e,t]),r}("ready"===r?null===i||void 0===i?void 0:i.totalSavingPotential:0);(0,n.useEffect)(()=>{if(!t)return a("error"),void l("Ogiltig l\xe4nk");fetch(`/api/briefing?token=${encodeURIComponent(t)}`).then(e=>e.json()).then(e=>{var t,r;if(!e.ok)return a("error"),void l(null!==(r=e.error)&&void 0!==r?r:"Ok\xe4nt fel");o(e.briefing),g(null!==(t=e.briefing.actionsTaken)&&void 0!==t?t:{}),a("ready")}).catch(()=>{a("error"),l("Kunde inte h\xe4mta briefingen")})},[t]),(0,n.useEffect)(()=>{if("ready"!==r)return;const e=new IntersectionObserver(e=>{e.forEach(e=>{const t=Number(e.target.dataset.cardIndex);e.isIntersecting&&(p(e=>({...e,[t]:!0})),d(t))})},{threshold:.4,root:x.current});return v.current.forEach(t=>{t&&e.observe(t)}),()=>e.disconnect()},[r,i]);const y=(0,n.useCallback)(async(e,r)=>{if("loading"!==h[e]&&"done"!==h[e]){m(t=>({...t,[e]:"loading"}));try{const a=await fetch(`/api/briefing?token=${encodeURIComponent(t)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({insightId:e,action:r})}),i=await a.json();var n;if(a.ok&&i.ok)m(t=>({...t,[e]:"done"})),g(null!==(n=i.actionsTaken)&&void 0!==n?n:{});else m(t=>({...t,[e]:"idle"}))}catch{m(t=>({...t,[e]:"idle"}))}}},[t,h]),k=(0,n.useCallback)(e=>{const t=v.current[e];t&&t.scrollIntoView({behavior:"smooth",block:"start"})},[]);if("loading"===r)return(0,$d.jsxs)(Wx,{children:[(0,$d.jsx)(qx,{children:[0,1,2].map(e=>(0,$d.jsx)(Yx,{$i:e},e))}),(0,$d.jsx)(Gx,{children:"H\xe4mtar din Arvo-briefing\u2026"})]});if("error"===r)return(0,$d.jsxs)(Qx,{children:[(0,$d.jsx)(Jx,{children:"\ud83d\udd12"}),(0,$d.jsx)(Xx,{children:"Briefingen hittades inte"}),(0,$d.jsxs)(Zx,{children:[s||"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig."," ","Ladda upp en ny faktura s\xe5 genererar Arvo en uppdaterad briefing \xe5t er."]}),(0,$d.jsx)(ev,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const j=null!==(e=null===i||void 0===i?void 0:i.insights)&&void 0!==e?e:[],w=1+j.length+1,S=Object.keys(f).length>0;return(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(vx,{children:Array.from({length:w},(e,t)=>(0,$d.jsx)(bx,{$active:c===t,onClick:()=>k(t),"aria-label":`G\xe5 till kort ${t+1}`},t))}),(0,$d.jsxs)(ox,{ref:x,children:[(0,$d.jsxs)(lx,{"data-card-index":"0",ref:e=>{v.current[0]=e},children:[(0,$d.jsx)(av,{size:44}),(0,$d.jsx)(cx,{children:"Arvo Intelligence"}),(0,$d.jsx)(dx,{children:nv(null===i||void 0===i?void 0:i.period)}),(0,$d.jsx)(ux,{children:"Potentiell besparing"}),(0,$d.jsxs)(px,{children:[tv(b),(0,$d.jsx)(hx,{children:"kr/\xe5r"})]}),(0,$d.jsxs)(mx,{children:["Arvo har identifierat"," ",(0,$d.jsxs)("strong",{children:[j.length," ",1===j.length?"besparingsinsikt":"besparingsinsikter"]})," ","f\xf6r ert bolag"]}),(0,$d.jsxs)(fx,{children:[(0,$d.jsx)(gx,{children:"Scrolla f\xf6r att se insikterna"}),(0,$d.jsx)(xx,{children:(0,$d.jsx)(iv,{})})]})]}),j.map((e,t)=>{var r,n,a,i,o,s,l,c,d,p,m,g;const x=t+1,b=!!u[x],k=null!==(r=h[e.id])&&void 0!==r?r:"idle",w="done"===k||!!f[e.id],S="loading"===k;return(0,$d.jsx)(yx,{"data-card-index":String(x),ref:e=>{v.current[x]=e},children:(0,$d.jsxs)(kx,{children:[(0,$d.jsxs)(jx,{$visible:b,children:["INSIKT ",t+1," AV ",j.length]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)(Sx,{$type:e.type,children:null!==(n=rv[e.type])&&void 0!==n?n:e.type}),(0,$d.jsx)(wx,{$visible:b,children:e.supplier})]}),(0,$d.jsx)($x,{$visible:b,children:e.headline}),(0,$d.jsx)(zx,{$visible:b,children:e.subheadline}),(0,$d.jsxs)(_x,{$visible:b,children:[(0,$d.jsxs)(Nx,{children:[(0,$d.jsxs)(Ex,{$primary:!0,children:[tv(null===(a=e.metric)||void 0===a||null===(i=a.primary)||void 0===i?void 0:i.value),(0,$d.jsx)(Ax,{children:"kr"})]}),(0,$d.jsx)(Cx,{children:null===(o=e.metric)||void 0===o||null===(s=o.primary)||void 0===s?void 0:s.label})]}),null!=(null===(l=e.metric)||void 0===l||null===(c=l.secondary)||void 0===c?void 0:c.value)&&(0,$d.jsxs)(Nx,{children:[(0,$d.jsxs)(Ex,{children:["number"===typeof e.metric.secondary.value&&null!==(d=e.metric.secondary.label)&&void 0!==d&&d.includes("%")?`${e.metric.secondary.value}%`:tv(e.metric.secondary.value),!(null!==(p=e.metric.secondary.label)&&void 0!==p&&p.includes("%"))&&(0,$d.jsx)(Ax,{children:"kr"})]}),(0,$d.jsx)(Cx,{children:null===(m=e.metric)||void 0===m||null===(g=m.secondary)||void 0===g?void 0:g.label})]})]}),(0,$d.jsx)(Dx,{$visible:b,children:e.context}),e.action&&(0,$d.jsx)(Fx,{$visible:b,children:(0,$d.jsxs)(Tx,{$done:w,$loading:S,disabled:w||S,onClick:()=>y(e.id,e.action.label),children:[S&&(0,$d.jsx)(Ox,{}),w?"\u2713 Arvo \xe4r p\xe5 det \u2014 vi \xe5terkommer inom 24 timmar":e.action.label]})})]})},e.id)}),(0,$d.jsxs)(Px,{"data-card-index":String(w-1),ref:e=>{v.current[w-1]=e},children:[(0,$d.jsx)(Lx,{children:(0,$d.jsx)(ov,{})}),(0,$d.jsx)(Rx,{children:"Er Arvo-briefing \xe4r klar"}),(0,$d.jsx)(Ix,{children:S?"Bra jobbat \u2014 ni har aktiverat Arvo. Vi granskar era avtal och \xe5terkommer med en konkret handlingsplan.":"Era insikter v\xe4ntar p\xe5 er. Ni kan alltid komma tillbaka till denna sida via l\xe4nken i mailet."}),S&&(0,$d.jsx)(Mx,{children:Object.entries(f).map(e=>{let[t,r]=e;return(0,$d.jsxs)(Bx,{children:[(0,$d.jsx)(Vx,{children:"\u2713"}),(0,$d.jsxs)(Ux,{children:[(0,$d.jsx)("strong",{children:"approve_switch"===r.type?"Bytesuppdrag":"Bevakningsuppdrag"})," ","aktiverat f\xf6r ",(0,$d.jsx)("strong",{children:r.supplier}),r.estimatedNetSaving>0&&` \xb7 Potentiell besparing: ${tv(r.estimatedNetSaving)} kr/\xe5r`]})]},t)})}),S&&(0,$d.jsx)(Kx,{children:"Arvo \xe5terkommer inom 24 timmar med n\xe4sta steg."}),(0,$d.jsx)(Hx,{href:"/testa-faktura",children:"Analysera fler fakturor \u2192"})]})]})]})}const lv=jd`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`,cv=jd`
  from { opacity: 0; transform: translateY(-24px) scale(0.95); }
  65%  { transform: translateY(4px) scale(1.005); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`,dv=jd`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(29,176,154,0); }
`,uv=jd`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,pv=vd.div`
  background: #ffffff;
  color: #0E1A17;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
`,hv=vd.section`
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
`,mv=vd.div`
  position: relative;
  z-index: 1;
  max-width: 680px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`,fv=vd.div`
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
  animation: ${cv} 0.75s cubic-bezier(0.34, 1.46, 0.64, 1) both;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.55) inset,
    0 -1px 0 rgba(255,255,255,0.06) inset,
    0 0 40px rgba(255,255,255,0.04),
    0 48px 120px rgba(0,0,0,0.70),
    0 8px 32px rgba(0,0,0,0.40);
`,gv=vd.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
`,xv=vd.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${dv} 2.2s ease-in-out infinite;
`,vv=vd.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: .02em;
  flex: 1;
`,bv=vd.span`
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .01em;
`,yv=vd.p`
  margin: 0 0 7px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -.015em;
`,kv=vd.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;

  strong {
    color: rgba(255,255,255,0.88);
    font-weight: 600;
  }
`,jv=vd.button`
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
`,wv=vd.h1`
  margin: 0 0 20px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(38px, 6.5vw, 76px);
  font-weight: 700;
  color: #fff;
  line-height: 1.10;
  letter-spacing: -.02em;
  animation: ${lv} 0.8s 0.28s both ease-out;

  em {
    font-style: italic;
    font-weight: 400;
  }
`,Sv=vd.p`
  margin: 0 0 52px;
  font-size: clamp(16px, 2.2vw, 20px);
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
  animation: ${lv} 0.8s 0.42s both ease-out;
`,$v=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: ${lv} 0.8s 0.56s both ease-out;
`,zv=vd.a`
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
`,_v=vd.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.52);
  letter-spacing: .01em;
`,Nv=vd.section`
  padding: 80px 24px;
  background: #ffffff;

  @media (max-width: 640px) { padding: 64px 20px; }

  & > * {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
`,Ev=vd.div`
  text-align: center;
  margin-bottom: 48px;
  @media (max-width: 640px) { margin-bottom: 36px; }
`,Av=vd.p`
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  color: #1B7A6E;
  text-transform: uppercase;
  letter-spacing: .20em;
  text-align: center;
`,Cv=vd.h2`
  margin: 0 0 48px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  line-height: 1.12;
  letter-spacing: -.02em;
  text-align: center;

  @media (max-width: 640px) { margin-bottom: 36px; }
`,Dv=(vd.div`
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

  ${e=>{let{$visible:t}=e;return t&&fd`
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
`),Fv=vd.div`
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

  ${e=>{let{$visible:t}=e;return t&&fd`
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
`,Tv=vd.p`
  margin: 0;
  padding: 0 0 0 12px;
  border-left: 2.5px solid #9F3B22;
  font-size: 13px;
  font-style: italic;
  color: #4A5E58;
  line-height: 1.6;
`,Ov=vd.div`
  height: 1px;
  background: #E4EDE9;
  margin: 16px 0;
`,Pv=(vd.span`
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
`),Lv=vd.p`
  margin: 0;
  font-size: 13.5px;
  color: #5C6E68;
  line-height: 1.6;
  flex: 1;
`,Rv=vd.p`
  margin: 0;
  font-size: 12.5px;
  color: #1B7A6E;
  font-style: italic;
  line-height: 1.55;
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid #D5E2DC;
`,Iv=vd.section`
  background: #000;
  padding: 88px 24px;

  @media (max-width: 640px) { padding: 72px 20px; }
`,Mv=vd.div`
  max-width: 760px;
  margin: 0 auto;
`,Bv=vd.p`
  margin: 0 0 56px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.28);
  text-transform: uppercase;
  letter-spacing: .22em;
`,Vv=vd.div`
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease,
    transform 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease;

  ${e=>{let{$visible:t}=e;return t&&fd`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Uv=vd.span`
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #4FBFB3;
  text-transform: uppercase;
  letter-spacing: .20em;
  margin-bottom: 14px;
`,Kv=vd.p`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(30px, 5.5vw, 60px);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -.03em;
  text-align: left;
`,Hv=vd.div`
  width: 1px;
  height: 56px;
  background: rgba(255,255,255,0.10);
  margin: 52px 0;
`,Wv=vd.section`
  background: #ffffff;
  padding: 96px 24px;
  border-top: 1px solid #E8EFEC;
  text-align: center;

  @media (max-width: 640px) { padding: 72px 20px; }
`,qv=vd.div`
  max-width: 480px;
  margin: 0 auto;
`,Yv=vd.h2`
  margin: 0 0 16px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  letter-spacing: -.025em;
  line-height: 1.12;
`,Gv=vd.p`
  margin: 0 0 40px;
  font-size: 16px;
  color: #5C6E68;
  line-height: 1.6;
`,Qv=vd.p`
  margin: 24px 0 0;
  font-size: 12px;
  color: #3F4B47;
  letter-spacing: .01em;
  opacity: 0.65;
`,Jv=vd.div`
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
`,Xv=vd.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 0;
`,Zv=vd.input`
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
`,eb=vd.button`
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
`,tb=vd.p`
  font-size: 12.5px;
  color: #9F3B22;
  margin: 4px 0 0;
  line-height: 1.5;
`,rb=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
`,nb=vd.div`
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
  animation: ${uv} 0.55s cubic-bezier(0.34,1.46,0.64,1) both;
`,ab=vd.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0E1A17;
`,ib=vd.p`
  margin: 0;
  font-size: 14px;
  color: #5C6E68;
  line-height: 1.6;
`,ob=vd.p`
  margin: 0;
  font-size: 13px;
  color: #3F4B47;
  opacity: 0.55;
  font-style: italic;
`,sb=[{context:"Telia h\xf6jer 11% i januari. Ni m\xe4rker det i september \u2014 \xe5tta m\xe5nader senare.",title:"Marknadsintelligens f\xf6re fakturan",body:"Arvo ser vad som h\xe4nder hos j\xe4mf\xf6rbara bolag i n\xe4tverket \u2014 och varnar er innan h\xf6jningen syns p\xe5 er faktura.",quote:'"6 av 14 bolag i er bransch fick Telias prish\xf6jning f\xf6rra m\xe5naden."'},{context:"Tele2-avtalet f\xf6rnyas automatiskt. Ni m\xe4rkte det inte. Nu \xe4r ni l\xe5sta ett \xe5r till.",title:"Kontraktskalender med handlingsplan",body:"Inte bara p\xe5minnelser \u2014 utan exakt vad som ska g\xf6ras, n\xe4r och varf\xf6r. Arvo r\xe4knar bakl\xe4nges fr\xe5n varje f\xf6rnyelsedatum.",quote:'"87 dagar kvar. Aktivera byte senast 15 september."'},{context:"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr. Ni betalar differensen utan att veta om det.",title:"Faktura mot avtal",body:"Leverant\xf6rer fakturerar fel \u2014 ofta. Arvo kontrollerar automatiskt varje faktura mot k\xe4nt avtalspris och flaggar avvikelser direkt.",quote:'"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr."'},{context:"Kostnaderna rullar p\xe5. Ingen sammanfattar. Styrelsen fr\xe5gar \u2014 ingen har svaret.",title:"M\xe5natlig CFO-brief",body:"En professionell rapport \u2014 klar f\xf6r styrelserummet \u2014 med vad Arvo hittat, vad som sparats och vad som \xe4r p\xe5 v\xe4g.",quote:'"Tre avtal bevakas. Ett flaggat f\xf6r \xe5tg\xe4rd n\xe4sta vecka."'}];function lb(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.12;const t=(0,n.useRef)(null),[r,a]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{const r=t.current;if(!r)return;const n=new IntersectionObserver(e=>{let[t]=e;t.isIntersecting&&(a(!0),n.disconnect())},{threshold:e});return n.observe(r),()=>n.disconnect()},[e]),[t,r]}const cb=()=>(0,$d.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",style:{flexShrink:0},children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"intelig",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$d.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#intelig)"})]}),db=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function ub(){var e;const[t,r]=lb(.08),[a,i]=lb(.12),[o]=js(),s=o.get("savings")?Number(o.get("savings")):null,l=null!==(e=o.get("supplier"))&&void 0!==e?e:null,[c,d]=(0,n.useState)(""),[u,p]=(0,n.useState)(""),[h,m]=(0,n.useState)("idle"),[f,g]=(0,n.useState)("");return(0,$d.jsxs)(pv,{children:[(0,$d.jsx)(uu,{variant:"public"}),(0,$d.jsx)(hv,{children:(0,$d.jsxs)(mv,{children:[(0,$d.jsxs)(fv,{children:[(0,$d.jsxs)(gv,{children:[(0,$d.jsx)(cb,{}),(0,$d.jsx)(xv,{}),(0,$d.jsx)(vv,{children:"Arvo Intelligence"}),(0,$d.jsx)(bv,{children:"Just nu"})]}),(0,$d.jsx)(yv,{children:"Arvo har detekterat n\xe5got"}),(0,$d.jsxs)(kv,{children:["Telia h\xf6jde priset f\xf6r ",(0,$d.jsx)("strong",{children:"8 av 14 bolag"})," i er bransch f\xf6rra m\xe5naden. Er n\xe4sta faktura tr\xe4ffar om"," ",(0,$d.jsx)("strong",{children:"12 dagar."})]}),(0,$d.jsx)(jv,{as:vs,to:"/testa-faktura",children:"Se vad det inneb\xe4r f\xf6r er \u2192"})]}),(0,$d.jsxs)(wv,{children:["Arvo m\xe4rkte det.",(0,$d.jsx)("br",{}),(0,$d.jsx)("em",{children:"Ni visste inte om det \xe4nnu."})]}),(0,$d.jsx)(Sv,{children:"Ni ska inte beh\xf6va h\xe5lla koll. Det \xe4r Arvos jobb."}),(0,$d.jsxs)($v,{children:[(0,$d.jsx)(zv,{as:"a",href:"#aktivera",children:"Aktivera Arvo Intelligence"}),(0,$d.jsx)(_v,{children:"1 995 kr/m\xe5n \xb7 Ingen bindningstid"})]})]})}),(0,$d.jsxs)(Nv,{ref:t,children:[(0,$d.jsxs)(Ev,{children:[(0,$d.jsx)(Av,{children:"Arvo Intelligence"}),(0,$d.jsx)(Cv,{style:{marginBottom:0},children:"Det Arvo ser \u2014 som annars f\xf6rsvinner"})]}),(0,$d.jsx)(Dv,{children:sb.map((e,t)=>(0,$d.jsxs)(Fv,{$i:t,$visible:r,children:[(0,$d.jsx)(Tv,{children:e.context}),(0,$d.jsx)(Ov,{}),(0,$d.jsx)(Pv,{children:e.title}),(0,$d.jsx)(Lv,{children:e.body}),(0,$d.jsx)(Rv,{children:e.quote})]},t))})]}),(0,$d.jsx)(Iv,{ref:a,children:(0,$d.jsxs)(Mv,{children:[(0,$d.jsx)(Bv,{children:"Den enda finansiella partnern som..."}),(0,$d.jsxs)(Vv,{$i:0,$visible:i,children:[(0,$d.jsx)(Uv,{children:"Regel 1"}),(0,$d.jsx)(Kv,{children:"Arvo vaktar er f\xf6r 1 995 kr/m\xe5n."})]}),(0,$d.jsx)(Hv,{}),(0,$d.jsxs)(Vv,{$i:1,$visible:i,children:[(0,$d.jsx)(Uv,{children:"Regel 2"}),(0,$d.jsx)(Kv,{children:"Ni beh\xe5ller 80% av allt vi sparar er."})]})]})}),(0,$d.jsx)(Wv,{id:"aktivera",children:(0,$d.jsxs)(qv,{children:["sent"!==h&&(0,$d.jsxs)(Yv,{children:["Arvo b\xf6rjar bevaka",(0,$d.jsx)("br",{}),"imorgon bitti."]}),"sent"===h?(0,$d.jsxs)(rb,{children:[(0,$d.jsx)(nb,{children:"\u2713"}),(0,$d.jsx)(ab,{children:"Aktiverat."}),(0,$d.jsxs)(ib,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$d.jsx)("br",{}),"Vi h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),c&&(0,$d.jsx)(ob,{children:c})]}):(0,$d.jsxs)($d.Fragment,{children:[null!=s?(0,$d.jsx)(Jv,{children:l?(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[db(s),"\xa0kr/\xe5r"]})," hos ",l,". Den besparingen v\xe4ntar."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[db(s),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})}):(0,$d.jsx)(Gv,{children:"E-post och bolagsnamn \u2014 klart p\xe5 30 sekunder."}),(0,$d.jsxs)(Xv,{onSubmit:async e=>{e.preventDefault();const t=c.trim();if(t&&"submitting"!==h){m("submitting"),g("");try{var r;const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==l&&void 0!==l?l:u.trim()||void 0,netSaving:null!==s&&void 0!==s?s:void 0,source:"intelligence-page"})});if(!e.ok)throw new Error(null!==(r=(await e.json().catch(()=>({}))).error)&&void 0!==r?r:"err");m("sent")}catch{g("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),m("error")}}},children:[(0,$d.jsx)(Zv,{type:"email",placeholder:"er@foretag.se",value:c,onChange:e=>d(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)(Zv,{type:"text",placeholder:"Bolagsnamn",value:u,onChange:e=>p(e.target.value),autoComplete:"organization"}),(0,$d.jsx)(eb,{type:"submit",disabled:"submitting"===h,children:"submitting"===h?"\u2026":"Aktivera bevakningen \u2192"}),f&&(0,$d.jsx)(tb,{children:f})]})]}),(0,$d.jsx)(Qv,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo startar bevakningen inom 24h"})]})}),(0,$d.jsx)(vu,{})]})}const pb=jd`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`,hb=jd`
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`,mb=jd`
  from { stroke-dashoffset: 60; opacity: 0; }
  to   { stroke-dashoffset: 0;  opacity: 1; }
`,fb=jd`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,gb=jd`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(29,176,154,0); }
`,xb=vd.div`
  background: #060D0B;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
`,vb=vd.section`
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
`,bb=vd.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
`,yb=vd.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 32px;
  animation: ${pb} 0.6s ease both;
`,kb=vd.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${gb} 2.4s ease-in-out infinite;
`,jb=vd.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #1DB09A;
`,wb=vd.h1`
  font-size: clamp(30px, 6vw, 50px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #fff;
  text-align: center;
  margin: 0 0 16px;
  animation: ${pb} 0.6s 0.08s ease both;
`,Sb=vd.p`
  font-size: 15px;
  color: rgba(255,255,255,0.42);
  text-align: center;
  margin: 0 0 40px;
  line-height: 1.5;
  animation: ${pb} 0.6s 0.14s ease both;
`,$b=vd.div`
  width: 100%;
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.22);
  border-radius: 14px;
  padding: 14px 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${pb} 0.6s 0.18s ease both;
`,zb=vd.span`
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1;
`,_b=vd.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.70);
  line-height: 1.55;

  strong {
    color: #1DB09A;
    font-weight: 700;
  }
`,Nb=vd.div`
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
  animation: ${hb} 0.65s 0.1s cubic-bezier(0.34,1.28,0.64,1) both;
`,Eb=vd.h2`
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 6px;
  line-height: 1.2;
`,Ab=vd.p`
  font-size: 13px;
  color: rgba(255,255,255,0.40);
  margin: 0 0 24px;
  line-height: 1.5;
`,Cb=vd.a`
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
`,Db=vd.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;

  ${e=>"google"===e.$provider&&fd`
    background: #fff;
    color: #4285F4;
  `}
  ${e=>"outlook"===e.$provider&&fd`
    background: #0078D4;
    color: #fff;
  `}
`,Fb=vd.span`
  flex: 1;
`,Tb=vd.span`
  color: rgba(255,255,255,0.25);
  font-size: 13px;
`,Ob=vd.div`
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
`,Pb=vd.form`
  display: flex;
  gap: 8px;
  align-items: stretch;
`,Lb=vd.input`
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
`,Rb=vd.button`
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
`,Ib=vd.p`
  font-size: 12px;
  color: #F87171;
  margin: 8px 0 0;
  line-height: 1.5;
`,Mb=vd.p`
  font-size: 11.5px;
  color: rgba(255,255,255,0.22);
  margin: 16px 0 0;
  line-height: 1.6;
  text-align: center;
`,Bb=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 0 4px;
`,Vb=vd.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: rgba(29,176,154,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: ${fb} 0.55s cubic-bezier(0.34,1.46,0.64,1) both;

  svg {
    stroke: #1DB09A;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
    animation: ${mb} 0.5s 0.2s ease both;
  }
`,Ub=vd.h3`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 8px;
`,Kb=vd.p`
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  margin: 0 0 24px;
  line-height: 1.6;
`,Hb=vd.p`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
  margin: 0 0 24px;
  font-style: italic;
`,Wb=vd.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  margin: 0 0 10px;
  width: 100%;
  text-align: left;
`,qb=vd.div`
  display: flex;
  gap: 0;
  margin-top: 40px;
  width: 100%;
  animation: ${pb} 0.6s 0.4s ease both;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0;
  }
`,Yb=vd.div`
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
`,Gb=vd.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 8px;
`,Qb=vd.p`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin: 0;
  line-height: 1.55;
`,Jb=vd.div`
  width: 100%;
  max-width: 460px;
  margin: 48px auto 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: ${pb} 0.6s 0.5s ease both;
`,Xb=vd.p`
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
`,Zb=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function ey(){return(0,$d.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:(0,$d.jsx)("polyline",{points:"5,14 11,20 23,8"})})}function ty(){var e;const[t]=js(),r=t.get("savings")?Number(t.get("savings")):null,a=null!==(e=t.get("supplier"))&&void 0!==e?e:null,i=t.get("score")?Number(t.get("score")):null,[o,s]=(0,n.useState)(""),[l,c]=(0,n.useState)("idle"),[d,u]=(0,n.useState)(""),p="/api/auth/gmail-init"+(o?`?email=${encodeURIComponent(o)}`:""),h="/api/auth/outlook-init"+(o?`?email=${encodeURIComponent(o)}`:"");return(0,$d.jsxs)(xb,{children:[(0,$d.jsx)(uu,{variant:"public"}),(0,$d.jsx)(vb,{children:(0,$d.jsxs)(bb,{children:[(0,$d.jsxs)(yb,{children:[(0,$d.jsx)(kb,{}),(0,$d.jsx)(jb,{children:"Arvo Intelligence"})]}),"sent"!==l&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(wb,{children:["Arvo b\xf6rjar bevaka er",(0,$d.jsx)("br",{}),"imorgon bitti."]}),(0,$d.jsx)(Sb,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid"})]}),null!=r&&"sent"!==l&&(0,$d.jsxs)($b,{children:[(0,$d.jsx)(zb,{children:"\u2192"}),(0,$d.jsx)(_b,{children:a?(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[Zb(r),"\xa0kr/\xe5r"]})," hos ",a,". Den besparingen v\xe4ntar."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[Zb(r),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})})]}),(0,$d.jsx)(Nb,{children:"sent"===l?(0,$d.jsxs)(Bb,{children:[(0,$d.jsx)(Vb,{children:(0,$d.jsx)(ey,{})}),(0,$d.jsx)(Ub,{children:"Aktiverat."}),(0,$d.jsxs)(Kb,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$d.jsx)("br",{}),"Ni h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),(0,$d.jsx)(Hb,{children:o}),(0,$d.jsx)(Wb,{children:"Koppla er inkorg \u2014 Arvo hittar allt"}),(0,$d.jsxs)(Cb,{href:p,style:{marginBottom:9},children:[(0,$d.jsx)(Db,{$provider:"google",children:"G"}),(0,$d.jsx)(Fb,{children:"Koppla Gmail"}),(0,$d.jsx)(Tb,{children:"\u2192"})]}),(0,$d.jsxs)(Cb,{href:h,children:[(0,$d.jsx)(Db,{$provider:"outlook",children:"\u25a0"}),(0,$d.jsx)(Fb,{children:"Koppla Outlook"}),(0,$d.jsx)(Tb,{children:"\u2192"})]}),(0,$d.jsx)(Mb,{children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Eb,{children:"Koppla er inkorg \u2014 en g\xe5ng."}),(0,$d.jsx)(Ab,{children:"Arvo s\xf6ker igenom era leverant\xf6rsfakturor och kontaktar er n\xe4r n\xe5got h\xe4nt."}),(0,$d.jsxs)(Cb,{href:p,children:[(0,$d.jsx)(Db,{$provider:"google",children:"G"}),(0,$d.jsx)(Fb,{children:"Koppla Gmail"}),(0,$d.jsx)(Tb,{children:"\u2192"})]}),(0,$d.jsxs)(Cb,{href:h,children:[(0,$d.jsx)(Db,{$provider:"outlook",children:"\u25a0"}),(0,$d.jsx)(Fb,{children:"Koppla Outlook"}),(0,$d.jsx)(Tb,{children:"\u2192"})]}),(0,$d.jsx)(Ob,{children:(0,$d.jsx)("span",{children:"eller b\xf6rja med e-post"})}),(0,$d.jsxs)(Pb,{onSubmit:async e=>{e.preventDefault();const t=o.trim();if(t&&"submitting"!==l){c("submitting"),u("");try{const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==a&&void 0!==a?a:void 0,netSaving:null!==r&&void 0!==r?r:void 0,diagScore:null!==i&&void 0!==i?i:void 0,source:"intelligence-page"})});if(!e.ok){var n;const t=await e.json().catch(()=>({}));throw new Error(null!==(n=t.error)&&void 0!==n?n:"server_error")}c("sent")}catch(s){u("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),c("error")}}},children:[(0,$d.jsx)(Lb,{type:"email",placeholder:"er@foretag.se",value:o,onChange:e=>s(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)(Rb,{type:"submit",disabled:"submitting"===l,children:"submitting"===l?"\u2026":"Aktivera \u2192"})]}),d&&(0,$d.jsx)(Ib,{children:d}),(0,$d.jsx)(Mb,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})}),(0,$d.jsxs)(qb,{children:[(0,$d.jsxs)(Yb,{children:[(0,$d.jsx)(Gb,{children:"24h"}),(0,$d.jsx)(Qb,{children:"Arvo aktiverar er bevakning"})]}),(0,$d.jsxs)(Yb,{children:[(0,$d.jsx)(Gb,{children:"Dag 7"}),(0,$d.jsx)(Qb,{children:"Ni f\xe5r er f\xf6rsta analys"})]}),(0,$d.jsxs)(Yb,{children:[(0,$d.jsx)(Gb,{children:"L\xf6pande"}),(0,$d.jsx)(Qb,{children:"Arvo kontaktar er om n\xe5got h\xe4nt"})]})]})]})}),(0,$d.jsxs)(Jb,{children:[(0,$d.jsxs)(Xb,{children:[(0,$d.jsx)("strong",{children:"Regel 1:"})," Arvo vaktar er f\xf6r 1\xa0995\xa0kr/m\xe5n."]}),(0,$d.jsxs)(Xb,{children:[(0,$d.jsx)("strong",{children:"Regel 2:"})," Ni beh\xe5ller 80% av allt vi sparar er."]})]}),(0,$d.jsx)(vu,{})]})}const ry=jd`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,ny=jd`
  from { opacity: 0; }
  to   { opacity: 1; }
`,ay=jd`
  0%,100% { opacity:0.3; transform:scale(0.8); }
  50%     { opacity:1;   transform:scale(1);   }
`,iy=function(){return fd`
  opacity: 0;
  animation: ${ry} 0.75s ${arguments.length>0&&void 0!==arguments[0]?arguments[0]:0}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`},oy=wd.font.mono,sy=vd.div`
  min-height: 100vh;
  background: ${wd.dossier.bg};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
`,ly=vd.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 10;
  height: calc(env(safe-area-inset-top, 0px) + 28px);
  background: linear-gradient(to bottom, rgba(5,11,9,0.94) 0%, rgba(5,11,9,0) 100%);
  pointer-events: none;
`,cy=vd.div`
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
`,dy=vd.div`
  position: relative;
`,uy=vd.div`
  font-family: ${oy};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-indent: 0.42em; /* kompenserar sista bokstavens spacing vid centrering */
  color: ${wd.dossier.tealBright};
  margin-bottom: 18px;
  ${iy(0)}
`,py=vd.div`
  font-family: ${oy};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.46);
  margin-bottom: 48px;
  ${iy(.05)}
`,hy=vd.h1`
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

  ${iy(.1)}
`,my=vd.div`
  font-size: 15px;
  color: rgba(255,255,255,0.58);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  ${iy(.17)}
`,fy=vd.span`
  color: rgba(93,214,202,0.45);
`,gy=vd.div`
  font-family: ${oy};
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.36);
  margin-top: 32px;
  ${iy(.24)}
`,xy=vd.div`
  background: ${wd.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 84px 28px 76px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 120px 28px 110px;
  }
`,vy=vd.div`
  font-family: ${oy};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: ${wd.dossier.teal};
  margin-bottom: 40px;
`,by=vd.div`
  margin-bottom: 44px;
  &:last-of-type { margin-bottom: 0; }
  ${e=>{let{$i:t}=e;return iy(.08+.06*(null!==t&&void 0!==t?t:0))}}
`,yy=vd.div`
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(93,214,202,0.7), transparent);
  margin: 0 auto 30px;
`,ky=vd.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 6.4vw, 33px);
  font-weight: 500;
  color: ${wd.dossier.inkOnDark};
  line-height: 1.46;
  max-width: 560px;
  margin: 0 auto;
  letter-spacing: -0.012em;
`,jy=vd.div`
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
`,wy=vd.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`,Sy=vd.span`
  font-size: 13px;
  color: rgba(255,255,255,0.48);
`,$y=vd.span`
  font-family: ${oy};
  font-size: 12.5px;
  font-weight: 500;
  color: ${e=>{let{$highlight:t}=e;return t?wd.dossier.tealBright:"rgba(255,255,255,0.88)"}};
  text-align: right;
`,zy=vd.div`
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
`,_y=vd.div`
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

  ${iy(.06)}
`,Ny=vd.span`
  font-size: 0.50em;
  font-weight: 600;
  vertical-align: 0.34em;
  margin-right: 0.10em;
`,Ey=vd.div`
  max-width: 320px;
  margin: 40px auto 0;
  ${iy(.14)}
`,Ay=vd.div`
  position: relative;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(43,196,172,0.18) 0%, rgba(43,196,172,0.55) 50%, rgba(43,196,172,0.18) 100%);
`,Cy=vd.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 11px; height: 11px;
  border-radius: 50%;
  background: ${wd.dossier.tealBright};
  box-shadow: ${wd.dossier.glow};
`,Dy=vd.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-family: ${oy};
  font-size: 11px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.52);
`,Fy=vd.div`
  font-size: 13px;
  color: rgba(255,255,255,0.50);
  margin-top: 30px;
  ${iy(.18)}
`,Ty=vd.div`
  font-size: 12px;
  font-style: italic;
  color: rgba(255,255,255,0.38);
  margin-top: 10px;
`,Oy=vd.div`
  background: ${wd.dossier.surface};
  padding: 56px 20px 48px;

  @media (min-width: 768px) {
    padding: 88px 28px 76px;
  }
`,Py=vd.div`
  font-family: ${oy};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: rgba(14,26,23,0.52);
  margin-bottom: 26px;
  text-align: center;
`,Ly=vd.div`
  background: ${wd.dossier.card};
  border-radius: 24px;
  padding: 28px 24px 0;
  max-width: ${wd.dossier.column};
  margin: 0 auto 16px;
  overflow: hidden;
  box-shadow: 0 2px 24px rgba(11,22,18,0.07);
`,Ry=vd.div`
  font-family: ${oy};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: ${wd.color.brand};
  margin-bottom: 10px;
`,Iy=vd.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(14,26,23,0.06);

  &:last-of-type { border-bottom: none; }
`,My=vd.span`
  font-size: 13px;
  color: rgba(14,26,23,0.55);
`,By=vd.span`
  font-family: ${oy};
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{$highlight:t}=e;return t?wd.color.brand:"rgba(14,26,23,0.84)"}};
  text-align: right;
`,Vy=vd.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: rgba(14,26,23,0.44);
  margin-top: 2px;
`,Uy=vd.div`
  background: ${wd.dossier.bgRaised};
  margin: 18px -24px 0;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  > div { text-align: right; }
`,Ky=vd.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.62);
`,Hy=vd.div`
  font-family: ${oy};
  font-size: 16px;
  font-weight: 600;
  color: ${wd.dossier.tealBright};
  letter-spacing: -0.01em;
`,Wy=vd.div`
  font-family: ${oy};
  font-size: 10.5px;
  color: rgba(255,255,255,0.46);
  margin-top: 3px;
`,qy=vd.div`
  font-size: 11px;
  color: rgba(14,26,23,0.46);
  margin: 12px 0 0;
  padding-bottom: 16px;
`,Yy=vd.div`
  background: ${wd.dossier.bg};
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 72px 24px 60px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 110px 24px 96px;
  }
`,Gy=vd.p`
  font-size: 12px;
  color: rgba(255,255,255,0.46);
  line-height: 1.80;
  max-width: 360px;
  margin: 0 auto 52px;
`,Qy=vd.div`
  margin-bottom: 10px;
`,Jy=vd.a`
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
`,Xy=vd.div`
  font-size: 12px;
  color: rgba(255,255,255,0.50);
  margin-top: 14px;
`,Zy=vd.div`
  height: 36px;
`,ek=vd.a`
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
`,tk=vd.div`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin-top: 12px;
`,rk=vd.div`
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 22px 28px calc(22px + env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${wd.dossier.bg};
`,nk=vd.span`
  font-family: ${oy};
  font-size: 11px;
  color: rgba(255,255,255,0.32);
`,ak=vd.span`
  font-family: ${oy};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
`,ik=vd.div`
  min-height: 100vh;
  background: ${wd.dossier.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`,ok=vd.div`display: flex; gap: 8px;`,sk=vd.div`
  width: 8px; height: 8px;
  border-radius: 50%;
  background: ${wd.dossier.teal};
  animation: ${ay} 1.2s ${e=>{let{$i:t}=e;return.2*(null!==t&&void 0!==t?t:0)}}s ease-in-out infinite;
`,lk=vd.div`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
`,ck=vd.div`
  min-height: 100vh;
  background: ${wd.dossier.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
`,dk=vd.div`
  font-size: 32px;
  margin-bottom: 20px;
  animation: ${ny} 0.4s ease both;
`,uk=vd.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
`,pk=vd.p`
  font-size: 14px;
  color: rgba(255,255,255,0.40);
  line-height: 1.65;
  max-width: 300px;
  margin: 0 0 28px;
`,hk=vd.a`
  font-size: 15px;
  font-weight: 600;
  color: ${wd.dossier.teal};
  text-decoration: none;
  border-bottom: 1px solid rgba(29,176,154,0.3);
  padding-bottom: 2px;
`,mk=(e,t)=>500*Math.round((e+t)/2/500);function fk(e){if(!e)return"";return new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"})}function gk(){var e,t,r,a;const{token:i}=ho(),[o,s]=(0,n.useState)("loading"),[l,c]=(0,n.useState)(null),[d,u]=(0,n.useState)(!1);(0,n.useEffect)(()=>{i?fetch(`/api/prospect?token=${encodeURIComponent(i)}`).then(e=>e.json()).then(e=>{e.ok?(c(e.prospect),s("ready")):s("error")}).catch(()=>s("error")):s("error")},[i]);const p=e=>{d||(u(!0),fetch(`/api/prospect?token=${encodeURIComponent(i)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})}).catch(()=>{}))};if("loading"===o)return(0,$d.jsxs)(ik,{children:[(0,$d.jsx)(ok,{children:[0,1,2].map(e=>(0,$d.jsx)(sk,{$i:e},e))}),(0,$d.jsx)(lk,{children:"H\xe4mtar er analys\u2026"})]});if("error"===o)return(0,$d.jsxs)(ck,{children:[(0,$d.jsx)(dk,{children:"\ud83d\udd12"}),(0,$d.jsx)(uk,{children:"Analysen hittades inte"}),(0,$d.jsx)(pk,{children:"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig. Analysera er faktura direkt \u2014 det tar 2 minuter."}),(0,$d.jsx)(hk,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const{companyName:h,industry:m,employees:f,estimates:g,generatedAt:x}=l,v=null!==(e=null===g||void 0===g?void 0:g.categories)&&void 0!==e?e:[],b=(null===g||void 0===g?void 0:g.hasEstimates)&&((null===g||void 0===g?void 0:g.totalSavingLow)>0||v.length>0),y=null===g||void 0===g?void 0:g.mxPlatform,k=null===g||void 0===g?void 0:g.mxSince,j=null===g||void 0===g?void 0:g.domainRegistered,w=null===g||void 0===g?void 0:g.foundedYear,S=null!==(t=null===g||void 0===g?void 0:g.findings)&&void 0!==t?t:[],$=(z=k)?Math.round((Date.now()-new Date(z).getTime())/2630016e3):0;var z;const _=null!==(r=Uh[y])&&void 0!==r?r:y,N=S.length>0,E=[];S.forEach(e=>E.push({text:e,key:e})),!N&&k?E.push({text:`${_}-upps\xe4ttningen or\xf6rd sedan ${Vh(k)} \u2014 ${$} m\xe5nader`,key:"mxSince"}):!N&&y&&E.push({text:`Ni k\xf6r ${_} \xb7 ${f} licenser`,key:"mxPlatform"});const A=E.length>0,C=N?"IDENTIFIERAT FYND":"INFRASTRUKTURANALYS",D=N&&(y||j||k),F=null!==(a=null===g||void 0===g?void 0:g.totalSavingCentral)&&void 0!==a?a:b?mk(g.totalSavingLow,g.totalSavingHigh):null,T=v.map(e=>`${e.estimatedSims} ${"m365"===e.category?"Microsoft 365-licenser":"mobilabonnemang"}`).join(" + ");return(0,$d.jsxs)(sy,{children:[(0,$d.jsx)(ly,{}),(0,$d.jsx)(cy,{children:(0,$d.jsxs)(dy,{children:[(0,$d.jsx)(uy,{children:"ARVO"}),(0,$d.jsx)(py,{children:"Konfidentiell analys"}),(0,$d.jsx)(hy,{children:h}),(0,$d.jsxs)(my,{children:[m&&(0,$d.jsx)("span",{children:m}),m&&f&&(0,$d.jsx)(fy,{children:"\xb7"}),f&&(0,$d.jsxs)("span",{children:[f," anst\xe4llda"]}),w&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(fy,{children:"\xb7"}),(0,$d.jsxs)("span",{children:["Grundat ",w]})]})]}),(0,$d.jsx)(gy,{children:fk(x)})]})}),A&&(0,$d.jsxs)(xy,{children:[(0,$d.jsx)(vy,{children:C}),E.map((e,t)=>(0,$d.jsxs)(by,{$i:t,children:[t>0&&(0,$d.jsx)(yy,{}),(0,$d.jsx)(ky,{children:e.text})]},e.key)),D&&(0,$d.jsxs)(jy,{children:[y&&(0,$d.jsxs)(wy,{children:[(0,$d.jsx)(Sy,{children:"E-postplattform"}),(0,$d.jsx)($y,{children:_})]}),k&&(0,$d.jsxs)(wy,{children:[(0,$d.jsx)(Sy,{children:"Of\xf6r\xe4ndrad sedan"}),(0,$d.jsxs)($y,{$highlight:!0,children:[Vh(k)," \u2014 ",$," m\xe5n"]})]}),j&&(0,$d.jsxs)(wy,{children:[(0,$d.jsx)(Sy,{children:"Dom\xe4n registrerad"}),(0,$d.jsx)($y,{children:Vh(j)})]})]})]}),b&&(0,$d.jsxs)(zy,{children:[(0,$d.jsx)(vy,{children:"Sannolik kostnadspremie"}),(0,$d.jsxs)(_y,{children:[(0,$d.jsx)(Ny,{children:"\u2248"}),Mh(F)," ",(0,$d.jsx)("span",{style:{fontSize:"0.42em",letterSpacing:"0em",fontWeight:700},children:"kr/\xe5r"})]}),(0,$d.jsxs)(Ey,{children:[(0,$d.jsx)(Ay,{children:(0,$d.jsx)(Cy,{style:{left:`${Math.min(88,Math.max(12,g.totalSavingHigh>g.totalSavingLow?(F-g.totalSavingLow)/(g.totalSavingHigh-g.totalSavingLow)*100:50))}%`}})}),(0,$d.jsxs)(Dy,{children:[(0,$d.jsx)("span",{children:Mh(g.totalSavingLow)}),(0,$d.jsxs)("span",{children:[Mh(g.totalSavingHigh)," kr/\xe5r"]})]})]}),T&&(0,$d.jsxs)(Fy,{children:["Baserat p\xe5 ",T," mot verifierade listpriser"]}),(0,$d.jsx)(Ty,{children:"Er faktiska avtalskostnad ser vi inte f\xf6rr\xe4n ni delar er faktura"})]}),v.length>0&&(0,$d.jsxs)(Oy,{children:[(0,$d.jsx)(Py,{children:"Kostnadsanalys per kategori"}),v.map((e,t)=>{var r;const n="m365"===e.category?"licens":"abonnemang",a=null!==(r=e.savingCentral)&&void 0!==r?r:mk(e.savingLow,e.savingHigh);return(0,$d.jsxs)(Ly,{children:[(0,$d.jsx)(Ry,{children:e.label}),(0,$d.jsxs)(Iy,{children:[(0,$d.jsx)(My,{children:"m365"===e.category?"Uppskattade licenser":"Uppskattade abonnemang"}),(0,$d.jsxs)(By,{children:[e.estimatedSims," st"]})]}),(0,$d.jsxs)(Iy,{children:[(0,$d.jsx)(My,{children:"Typisk marknadskostnad"}),(0,$d.jsxs)(By,{children:[Mh(e.typicalLow),"\u2013",Mh(e.typicalHigh)," kr/\xe5r",(0,$d.jsx)(Vy,{children:"live"===e.source?`median av verifierade fakturor: ${e.pricePerSim.typical} kr/m\xe5n per ${n} \xb1 15 %`:`ordinarie listpris ${e.pricePerSim.typical} kr/m\xe5n per ${n} \xb1 15 %`})]})]}),(0,$d.jsxs)(Iy,{children:[(0,$d.jsx)(My,{children:"Arvo-pris, verifierat listpris"}),(0,$d.jsxs)(By,{$highlight:!0,children:[Mh(e.arvoAnnual)," kr/\xe5r",(0,$d.jsxs)(Vy,{children:[e.pricePerSim.arvo," kr/m\xe5n per ",n]})]})]}),(0,$d.jsx)(qy,{children:e.sourceNote}),(0,$d.jsxs)(Uy,{children:[(0,$d.jsx)(Ky,{children:"Sannolik premie"}),(0,$d.jsxs)("div",{children:[(0,$d.jsxs)(Hy,{children:["\u2248 ",Mh(a)," kr/\xe5r"]}),(0,$d.jsxs)(Wy,{children:["intervall ",Mh(e.savingLow),"\u2013",Mh(e.savingHigh)]})]})]})]},t)})]}),(0,$d.jsxs)(Yy,{children:[(0,$d.jsxs)(Gy,{children:["Arvo har g\xe5tt igenom den publika digitala upps\xe4ttningen f\xf6r ",h,"s dom\xe4n. Ingen data har h\xe4mtats fr\xe5n er eller era leverant\xf6rer utan ert tillst\xe5nd."]}),(0,$d.jsxs)(Qy,{children:[(0,$d.jsx)(Jy,{href:"/testa-faktura",onClick:()=>p("upload"),children:"Se er exakta premie"}),(0,$d.jsx)(Xy,{children:"Ladda upp en faktura \xb7 Kostnadsfritt \xb7 2 minuter \xb7 Ingen registrering"})]}),(0,$d.jsx)(Zy,{}),(0,$d.jsx)(ek,{href:"/intelligence#aktivera",onClick:()=>p("activate"),children:"Eller l\xe5t Arvo bevaka er l\xf6pande \u2014 Arvo Intelligence, 1\xa0995 kr/m\xe5n \u2192"}),(0,$d.jsx)(tk,{children:"Ingen bindningstid \xb7 Bevakningen b\xf6rjar inom 24 timmar"})]}),(0,$d.jsxs)(rk,{children:[(0,$d.jsx)(nk,{children:"arvoflow.se"}),(0,$d.jsx)(ak,{children:"Arvo Intelligence"})]})]})}"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const xk=()=>{const{pathname:e}=lo();return(0,n.useEffect)(()=>{window.scrollTo(0,0)},[e]),null},vk=()=>(0,$d.jsxs)(dd,{theme:wd,children:[(0,$d.jsx)(Sd,{}),(0,$d.jsx)(gs,{basename:"/flow",children:(0,$d.jsxs)(Ad,{children:[(0,$d.jsx)(xk,{}),(0,$d.jsxs)(Po,{children:[(0,$d.jsx)(To,{path:"/",element:(0,$d.jsx)(Cp,{})}),(0,$d.jsx)(To,{path:"/connect",element:(0,$d.jsx)(ah,{})}),(0,$d.jsx)(To,{path:"/bias",element:(0,$d.jsx)(yh,{})}),(0,$d.jsx)(To,{path:"/villkor",element:(0,$d.jsx)(Ph,{})}),(0,$d.jsx)(To,{path:"/integritet",element:(0,$d.jsx)(Lh,{})}),(0,$d.jsx)(To,{path:"/cookies",element:(0,$d.jsx)(Rh,{})}),(0,$d.jsx)(To,{path:"/testa-faktura",element:(0,$d.jsx)(sf,{})}),(0,$d.jsx)(To,{path:"/portfolio",element:(0,$d.jsx)(bg,{})}),(0,$d.jsx)(To,{path:"/admin",element:(0,$d.jsx)(Vg,{})}),(0,$d.jsx)(To,{path:"/utfall",element:(0,$d.jsx)(ex,{})}),(0,$d.jsx)(To,{path:"/briefing/:token",element:(0,$d.jsx)(sv,{})}),(0,$d.jsx)(To,{path:"/intelligence",element:(0,$d.jsx)(ub,{})}),(0,$d.jsx)(To,{path:"/aktivera",element:(0,$d.jsx)(ty,{})}),(0,$d.jsx)(To,{path:"/prospect/:token",element:(0,$d.jsx)(gk,{})}),(0,$d.jsx)(To,{path:"/kontoret",element:(0,$d.jsx)(Fo,{to:"/portfolio",replace:!0})}),(0,$d.jsx)(To,{path:"*",element:(0,$d.jsx)(Fo,{to:"/",replace:!0})})]})]})})]});!function(){var e;const t={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SENTRY_DSN;t&&ri({dsn:t,environment:null!==(e="production")?e:"production",release:{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_VERSION,tracesSampleRate:.1,beforeSend(e){var t,r,n,a;const i=null!==(t=null===(r=e.exception)||void 0===r||null===(n=r.values)||void 0===n||null===(a=n[0])||void 0===a?void 0:a.value)&&void 0!==t?t:"";return i.includes("Network request failed")||i.includes("Load failed")?null:e}})}();(0,i.createRoot)(document.getElementById("root")).render((0,$d.jsx)(vk,{}))})();
//# sourceMappingURL=main.74612e2b.js.map