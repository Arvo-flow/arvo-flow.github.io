/*! For license information please see main.1eaf480c.js.LICENSE.txt */
(()=>{"use strict";var e={4(e,t,r){var n=r(853),a=r(43),i=r(950);function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function s(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!==(4098&(t=e).flags)&&(r=t.return),e=t.return}while(e)}return 3===t.tag?r:null}function c(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function d(e){if(31===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function u(e){if(s(e)!==e)throw Error(o(188))}function p(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e;for(e=e.child;null!==e;){if(null!==(t=p(e)))return t;e=e.sibling}return null}var h=Object.assign,f=Symbol.for("react.element"),m=Symbol.for("react.transitional.element"),g=Symbol.for("react.portal"),x=Symbol.for("react.fragment"),v=Symbol.for("react.strict_mode"),b=Symbol.for("react.profiler"),y=Symbol.for("react.consumer"),k=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),S=Symbol.for("react.suspense_list"),$=Symbol.for("react.memo"),z=Symbol.for("react.lazy");Symbol.for("react.scope");var E=Symbol.for("react.activity");Symbol.for("react.legacy_hidden"),Symbol.for("react.tracing_marker");var _=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var N=Symbol.iterator;function A(e){return null===e||"object"!==typeof e?null:"function"===typeof(e=N&&e[N]||e["@@iterator"])?e:null}var C=Symbol.for("react.client.reference");function F(e){if(null==e)return null;if("function"===typeof e)return e.$$typeof===C?null:e.displayName||e.name||null;if("string"===typeof e)return e;switch(e){case x:return"Fragment";case b:return"Profiler";case v:return"StrictMode";case w:return"Suspense";case S:return"SuspenseList";case E:return"Activity"}if("object"===typeof e)switch(e.$$typeof){case g:return"Portal";case k:return e.displayName||"Context";case y:return(e._context.displayName||"Context")+".Consumer";case j:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case $:return null!==(t=e.displayName||null)?t:F(e.type)||"Memo";case z:t=e._payload,e=e._init;try{return F(e(t))}catch(qs){}}return null}var T=Array.isArray,P=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L={pending:!1,data:null,method:null,action:null},R=[],O=-1;function I(e){return{current:e}}function M(e){0>O||(e.current=R[O],R[O]=null,O--)}function B(e,t){O++,R[O]=e.current,e.current=t}var V,U,K=I(null),H=I(null),W=I(null),q=I(null);function Y(e,t){switch(B(W,t),B(H,e),B(K,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?vu(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)e=bu(t=vu(t),e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}M(K),B(K,e)}function G(){M(K),M(H),M(W)}function Q(e){null!==e.memoizedState&&B(q,e);var t=K.current,r=bu(t,e.type);t!==r&&(B(H,e),B(K,r))}function J(e){H.current===e&&(M(K),M(H)),q.current===e&&(M(q),up._currentValue=L)}function X(e){if(void 0===V)try{throw Error()}catch(qs){var t=qs.stack.trim().match(/\n( *(at )?)/);V=t&&t[1]||"",U=-1<qs.stack.indexOf("\n    at")?" (<anonymous>)":-1<qs.stack.indexOf("@")?"@unknown:0:0":""}return"\n"+V+e+U}var Z=!1;function ee(e,t){if(!e||Z)return"";Z=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var r=function(){throw Error()};if(Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(r,[])}catch(qs){var n=qs}Reflect.construct(e,[],r)}else{try{r.call()}catch(a){n=a}e.call(r.prototype)}}else{try{throw Error()}catch(i){n=i}(r=e())&&"function"===typeof r.catch&&r.catch(function(){})}}catch(o){if(o&&n&&"string"===typeof o.stack)return[o.stack,n.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=n.DetermineComponentFrameRoot(),o=i[0],l=i[1];if(o&&l){var s=o.split("\n"),c=l.split("\n");for(a=n=0;n<s.length&&!s[n].includes("DetermineComponentFrameRoot");)n++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(n===s.length||a===c.length)for(n=s.length-1,a=c.length-1;1<=n&&0<=a&&s[n]!==c[a];)a--;for(;1<=n&&0<=a;n--,a--)if(s[n]!==c[a]){if(1!==n||1!==a)do{if(n--,0>--a||s[n]!==c[a]){var d="\n"+s[n].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}}while(1<=n&&0<=a);break}}}finally{Z=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?X(r):""}function te(e,t){switch(e.tag){case 26:case 27:case 5:return X(e.type);case 16:return X("Lazy");case 13:return e.child!==t&&null!==t?X("Suspense Fallback"):X("Suspense");case 19:return X("SuspenseList");case 0:case 15:return ee(e.type,!1);case 11:return ee(e.type.render,!1);case 1:return ee(e.type,!0);case 31:return X("Activity");default:return""}}function re(e){try{var t="",r=null;do{t+=te(e,r),r=e,e=e.return}while(e);return t}catch(qs){return"\nError generating stack: "+qs.message+"\n"+qs.stack}}var ne=Object.prototype.hasOwnProperty,ae=n.unstable_scheduleCallback,ie=n.unstable_cancelCallback,oe=n.unstable_shouldYield,le=n.unstable_requestPaint,se=n.unstable_now,ce=n.unstable_getCurrentPriorityLevel,de=n.unstable_ImmediatePriority,ue=n.unstable_UserBlockingPriority,pe=n.unstable_NormalPriority,he=n.unstable_LowPriority,fe=n.unstable_IdlePriority,me=n.log,ge=n.unstable_setDisableYieldValue,xe=null,ve=null;function be(e){if("function"===typeof me&&ge(e),ve&&"function"===typeof ve.setStrictMode)try{ve.setStrictMode(xe,e)}catch(t){}}var ye=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ke(e)/je|0)|0},ke=Math.log,je=Math.LN2;var we=256,Se=262144,$e=4194304;function ze(e){var t=42&e;if(0!==t)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return 261888&e;case 262144:case 524288:case 1048576:case 2097152:return 3932160&e;case 4194304:case 8388608:case 16777216:case 33554432:return 62914560&e;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ee(e,t,r){var n=e.pendingLanes;if(0===n)return 0;var a=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var l=134217727&n;return 0!==l?0!==(n=l&~i)?a=ze(n):0!==(o&=l)?a=ze(o):r||0!==(r=l&~e)&&(a=ze(r)):0!==(l=n&~i)?a=ze(l):0!==o?a=ze(o):r||0!==(r=n&~e)&&(a=ze(r)),0===a?0:0!==t&&t!==a&&0===(t&i)&&((i=a&-a)>=(r=t&-t)||32===i&&0!==(4194048&r))?t:a}function _e(e,t){return 0===(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)}function Ne(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function Ae(){var e=$e;return 0===(62914560&($e<<=1))&&($e=4194304),e}function Ce(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Fe(e,t){e.pendingLanes|=t,268435456!==t&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Te(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-ye(t);e.entangledLanes|=t,e.entanglements[n]=1073741824|e.entanglements[n]|261930&r}function Pe(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-ye(r),a=1<<n;a&t|e[n]&t&&(e[n]|=t),r&=~a}}function De(e,t){var r=t&-t;return 0!==((r=0!==(42&r)?1:Le(r))&(e.suspendedLanes|t))?0:r}function Le(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Re(e){return 2<(e&=-e)?8<e?0!==(134217727&e)?32:268435456:8:2}function Oe(){var e=D.p;return 0!==e?e:void 0===(e=window.event)?32:Ep(e.type)}function Ie(e,t){var r=D.p;try{return D.p=e,t()}finally{D.p=r}}var Me=Math.random().toString(36).slice(2),Be="__reactFiber$"+Me,Ve="__reactProps$"+Me,Ue="__reactContainer$"+Me,Ke="__reactEvents$"+Me,He="__reactListeners$"+Me,We="__reactHandles$"+Me,qe="__reactResources$"+Me,Ye="__reactMarker$"+Me;function Ge(e){delete e[Be],delete e[Ve],delete e[Ke],delete e[He],delete e[We]}function Qe(e){var t=e[Be];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Ue]||r[Be]){if(r=t.alternate,null!==t.child||null!==r&&null!==r.child)for(e=Ru(e);null!==e;){if(r=e[Be])return r;e=Ru(e)}return t}r=(e=r).parentNode}return null}function Je(e){if(e=e[Be]||e[Ue]){var t=e.tag;if(5===t||6===t||13===t||31===t||26===t||27===t||3===t)return e}return null}function Xe(e){var t=e.tag;if(5===t||26===t||27===t||6===t)return e.stateNode;throw Error(o(33))}function Ze(e){var t=e[qe];return t||(t=e[qe]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function et(e){e[Ye]=!0}var tt=new Set,rt={};function nt(e,t){at(e,t),at(e+"Capture",t)}function at(e,t){for(rt[e]=t,e=0;e<t.length;e++)tt.add(t[e])}var it=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ot={},lt={};function st(e,t,r){if(a=t,ne.call(lt,a)||!ne.call(ot,a)&&(it.test(a)?lt[a]=!0:(ot[a]=!0,0)))if(null===r)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":return void e.removeAttribute(t);case"boolean":var n=t.toLowerCase().slice(0,5);if("data-"!==n&&"aria-"!==n)return void e.removeAttribute(t)}e.setAttribute(t,""+r)}var a}function ct(e,t,r){if(null===r)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(t)}e.setAttribute(t,""+r)}}function dt(e,t,r,n){if(null===n)e.removeAttribute(r);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":return void e.removeAttribute(r)}e.setAttributeNS(t,r,""+n)}}function ut(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function pt(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function ht(e){if(!e._valueTracker){var t=pt(e)?"checked":"value";e._valueTracker=function(e,t,r){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&"undefined"!==typeof n&&"function"===typeof n.get&&"function"===typeof n.set){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){r=""+e,i.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e,t,""+e[t])}}function ft(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=pt(e)?e.checked?"true":"false":e.value),(e=n)!==r&&(t.setValue(e),!0)}function mt(e){if("undefined"===typeof(e=e||("undefined"!==typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var gt=/[\n"\\]/g;function xt(e){return e.replace(gt,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function vt(e,t,r,n,a,i,o,l){e.name="",null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o?e.type=o:e.removeAttribute("type"),null!=t?"number"===o?(0===t&&""===e.value||e.value!=t)&&(e.value=""+ut(t)):e.value!==""+ut(t)&&(e.value=""+ut(t)):"submit"!==o&&"reset"!==o||e.removeAttribute("value"),null!=t?yt(e,o,ut(t)):null!=r?yt(e,o,ut(r)):null!=n&&e.removeAttribute("value"),null==a&&null!=i&&(e.defaultChecked=!!i),null!=a&&(e.checked=a&&"function"!==typeof a&&"symbol"!==typeof a),null!=l&&"function"!==typeof l&&"symbol"!==typeof l&&"boolean"!==typeof l?e.name=""+ut(l):e.removeAttribute("name")}function bt(e,t,r,n,a,i,o,l){if(null!=i&&"function"!==typeof i&&"symbol"!==typeof i&&"boolean"!==typeof i&&(e.type=i),null!=t||null!=r){if(!("submit"!==i&&"reset"!==i||void 0!==t&&null!==t))return void ht(e);r=null!=r?""+ut(r):"",t=null!=t?""+ut(t):r,l||t===e.value||(e.value=t),e.defaultValue=t}n="function"!==typeof(n=null!=n?n:a)&&"symbol"!==typeof n&&!!n,e.checked=l?e.checked:!!n,e.defaultChecked=!!n,null!=o&&"function"!==typeof o&&"symbol"!==typeof o&&"boolean"!==typeof o&&(e.name=o),ht(e)}function yt(e,t,r){"number"===t&&mt(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function kt(e,t,r,n){if(e=e.options,t){t={};for(var a=0;a<r.length;a++)t["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=t.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&n&&(e[r].defaultSelected=!0)}else{for(r=""+ut(r),t=null,a=0;a<e.length;a++){if(e[a].value===r)return e[a].selected=!0,void(n&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function jt(e,t,r){null==t||((t=""+ut(t))!==e.value&&(e.value=t),null!=r)?e.defaultValue=null!=r?""+ut(r):"":e.defaultValue!==t&&(e.defaultValue=t)}function wt(e,t,r,n){if(null==t){if(null!=n){if(null!=r)throw Error(o(92));if(T(n)){if(1<n.length)throw Error(o(93));n=n[0]}r=n}null==r&&(r=""),t=r}r=ut(t),e.defaultValue=r,(n=e.textContent)===r&&""!==n&&null!==n&&(e.value=n),ht(e)}function St(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&3===r.nodeType)return void(r.nodeValue=t)}e.textContent=t}var $t=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function zt(e,t,r){var n=0===t.indexOf("--");null==r||"boolean"===typeof r||""===r?n?e.setProperty(t,""):"float"===t?e.cssFloat="":e[t]="":n?e.setProperty(t,r):"number"!==typeof r||0===r||$t.has(t)?"float"===t?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function Et(e,t,r){if(null!=t&&"object"!==typeof t)throw Error(o(62));if(e=e.style,null!=r){for(var n in r)!r.hasOwnProperty(n)||null!=t&&t.hasOwnProperty(n)||(0===n.indexOf("--")?e.setProperty(n,""):"float"===n?e.cssFloat="":e[n]="");for(var a in t)n=t[a],t.hasOwnProperty(a)&&r[a]!==n&&zt(e,a,n)}else for(var i in t)t.hasOwnProperty(i)&&zt(e,i,t[i])}function _t(e){if(-1===e.indexOf("-"))return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nt=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),At=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ct(e){return At.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ft(){}var Tt=null;function Pt(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Dt=null,Lt=null;function Rt(e){var t=Je(e);if(t&&(e=t.stateNode)){var r=e[Ve]||null;e:switch(e=t.stateNode,t.type){case"input":if(vt(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,"radio"===r.type&&null!=t){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+xt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var a=n[Ve]||null;if(!a)throw Error(o(90));vt(n,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<r.length;t++)(n=r[t]).form===e.form&&ft(n)}break e;case"textarea":jt(e,r.value,r.defaultValue);break e;case"select":null!=(t=r.value)&&kt(e,!!r.multiple,t,!1)}}}var Ot=!1;function It(e,t,r){if(Ot)return e(t,r);Ot=!0;try{return e(t)}finally{if(Ot=!1,(null!==Dt||null!==Lt)&&(ed(),Dt&&(t=Dt,e=Lt,Lt=Dt=null,Rt(t),e)))for(t=0;t<e.length;t++)Rt(e[t])}}function Mt(e,t){var r=e.stateNode;if(null===r)return null;var n=r[Ve]||null;if(null===n)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(n=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!n;break e;default:e=!1}if(e)return null;if(r&&"function"!==typeof r)throw Error(o(231,t,typeof r));return r}var Bt=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Vt=!1;if(Bt)try{var Ut={};Object.defineProperty(Ut,"passive",{get:function(){Vt=!0}}),window.addEventListener("test",Ut,Ut),window.removeEventListener("test",Ut,Ut)}catch(Xp){Vt=!1}var Kt=null,Ht=null,Wt=null;function qt(){if(Wt)return Wt;var e,t,r=Ht,n=r.length,a="value"in Kt?Kt.value:Kt.textContent,i=a.length;for(e=0;e<n&&r[e]===a[e];e++);var o=n-e;for(t=1;t<=o&&r[n-t]===a[i-t];t++);return Wt=a.slice(e,1<t?1-t:void 0)}function Yt(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function Gt(){return!0}function Qt(){return!1}function Jt(e){function t(t,r,n,a,i){for(var o in this._reactName=t,this._targetInst=n,this.type=r,this.nativeEvent=a,this.target=i,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(a):a[o]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?Gt:Qt,this.isPropagationStopped=Qt,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!==typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=Gt)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!==typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=Gt)},persist:function(){},isPersistent:Gt}),t}var Xt,Zt,er,tr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rr=Jt(tr),nr=h({},tr,{view:0,detail:0}),ar=Jt(nr),ir=h({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gr,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==er&&(er&&"mousemove"===e.type?(Xt=e.screenX-er.screenX,Zt=e.screenY-er.screenY):Zt=Xt=0,er=e),Xt)},movementY:function(e){return"movementY"in e?e.movementY:Zt}}),or=Jt(ir),lr=Jt(h({},ir,{dataTransfer:0})),sr=Jt(h({},nr,{relatedTarget:0})),cr=Jt(h({},tr,{animationName:0,elapsedTime:0,pseudoElement:0})),dr=Jt(h({},tr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),ur=Jt(h({},tr,{data:0})),pr={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hr={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fr={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function mr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=fr[e])&&!!t[e]}function gr(){return mr}var xr=Jt(h({},nr,{key:function(e){if(e.key){var t=pr[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=Yt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?hr[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gr,charCode:function(e){return"keypress"===e.type?Yt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Yt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}})),vr=Jt(h({},ir,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),br=Jt(h({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gr})),yr=Jt(h({},tr,{propertyName:0,elapsedTime:0,pseudoElement:0})),kr=Jt(h({},ir,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),jr=Jt(h({},tr,{newState:0,oldState:0})),wr=[9,13,27,32],Sr=Bt&&"CompositionEvent"in window,$r=null;Bt&&"documentMode"in document&&($r=document.documentMode);var zr=Bt&&"TextEvent"in window&&!$r,Er=Bt&&(!Sr||$r&&8<$r&&11>=$r),_r=String.fromCharCode(32),Nr=!1;function Ar(e,t){switch(e){case"keyup":return-1!==wr.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Cr(e){return"object"===typeof(e=e.detail)&&"data"in e?e.data:null}var Fr=!1;var Tr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Tr[e.type]:"textarea"===t}function Dr(e,t,r,n){Dt?Lt?Lt.push(n):Lt=[n]:Dt=n,0<(t=au(t,"onChange")).length&&(r=new rr("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Lr=null,Rr=null;function Or(e){Qd(e,0)}function Ir(e){if(ft(Xe(e)))return e}function Mr(e,t){if("change"===e)return t}var Br=!1;if(Bt){var Vr;if(Bt){var Ur="oninput"in document;if(!Ur){var Kr=document.createElement("div");Kr.setAttribute("oninput","return;"),Ur="function"===typeof Kr.oninput}Vr=Ur}else Vr=!1;Br=Vr&&(!document.documentMode||9<document.documentMode)}function Hr(){Lr&&(Lr.detachEvent("onpropertychange",Wr),Rr=Lr=null)}function Wr(e){if("value"===e.propertyName&&Ir(Rr)){var t=[];Dr(t,Rr,e,Pt(e)),It(Or,t)}}function qr(e,t,r){"focusin"===e?(Hr(),Rr=r,(Lr=t).attachEvent("onpropertychange",Wr)):"focusout"===e&&Hr()}function Yr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Ir(Rr)}function Gr(e,t){if("click"===e)return Ir(t)}function Qr(e,t){if("input"===e||"change"===e)return Ir(t)}var Jr="function"===typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e===1/t)||e!==e&&t!==t};function Xr(e,t){if(Jr(e,t))return!0;if("object"!==typeof e||null===e||"object"!==typeof t||null===t)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var a=r[n];if(!ne.call(t,a)||!Jr(e[a],t[a]))return!1}return!0}function Zr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function en(e,t){var r,n=Zr(e);for(e=0;n;){if(3===n.nodeType){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Zr(n)}}function tn(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?tn(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function rn(e){for(var t=mt((e=null!=e&&null!=e.ownerDocument&&null!=e.ownerDocument.defaultView?e.ownerDocument.defaultView:window).document);t instanceof e.HTMLIFrameElement;){try{var r="string"===typeof t.contentWindow.location.href}catch(n){r=!1}if(!r)break;t=mt((e=t.contentWindow).document)}return t}function nn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var an=Bt&&"documentMode"in document&&11>=document.documentMode,on=null,ln=null,sn=null,cn=!1;function dn(e,t,r){var n=r.window===r?r.document:9===r.nodeType?r:r.ownerDocument;cn||null==on||on!==mt(n)||("selectionStart"in(n=on)&&nn(n)?n={start:n.selectionStart,end:n.selectionEnd}:n={anchorNode:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset},sn&&Xr(sn,n)||(sn=n,0<(n=au(ln,"onSelect")).length&&(t=new rr("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=on)))}function un(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var pn={animationend:un("Animation","AnimationEnd"),animationiteration:un("Animation","AnimationIteration"),animationstart:un("Animation","AnimationStart"),transitionrun:un("Transition","TransitionRun"),transitionstart:un("Transition","TransitionStart"),transitioncancel:un("Transition","TransitionCancel"),transitionend:un("Transition","TransitionEnd")},hn={},fn={};function mn(e){if(hn[e])return hn[e];if(!pn[e])return e;var t,r=pn[e];for(t in r)if(r.hasOwnProperty(t)&&t in fn)return hn[e]=r[t];return e}Bt&&(fn=document.createElement("div").style,"AnimationEvent"in window||(delete pn.animationend.animation,delete pn.animationiteration.animation,delete pn.animationstart.animation),"TransitionEvent"in window||delete pn.transitionend.transition);var gn=mn("animationend"),xn=mn("animationiteration"),vn=mn("animationstart"),bn=mn("transitionrun"),yn=mn("transitionstart"),kn=mn("transitioncancel"),jn=mn("transitionend"),wn=new Map,Sn="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $n(e,t){wn.set(e,t),nt(t,[e])}Sn.push("scrollEnd");var zn="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},En=[],_n=0,Nn=0;function An(){for(var e=_n,t=Nn=_n=0;t<e;){var r=En[t];En[t++]=null;var n=En[t];En[t++]=null;var a=En[t];En[t++]=null;var i=En[t];if(En[t++]=null,null!==n&&null!==a){var o=n.pending;null===o?a.next=a:(a.next=o.next,o.next=a),n.pending=a}0!==i&&Pn(r,a,i)}}function Cn(e,t,r,n){En[_n++]=e,En[_n++]=t,En[_n++]=r,En[_n++]=n,Nn|=n,e.lanes|=n,null!==(e=e.alternate)&&(e.lanes|=n)}function Fn(e,t,r,n){return Cn(e,t,r,n),Dn(e)}function Tn(e,t){return Cn(e,null,null,t),Dn(e)}function Pn(e,t,r){e.lanes|=r;var n=e.alternate;null!==n&&(n.lanes|=r);for(var a=!1,i=e.return;null!==i;)i.childLanes|=r,null!==(n=i.alternate)&&(n.childLanes|=r),22===i.tag&&(null===(e=i.stateNode)||1&e._visibility||(a=!0)),e=i,i=i.return;return 3===e.tag?(i=e.stateNode,a&&null!==t&&(a=31-ye(r),null===(n=(e=i.hiddenUpdates)[a])?e[a]=[t]:n.push(t),t.lane=536870912|r),i):null}function Dn(e){if(50<Hc)throw Hc=0,Wc=null,Error(o(185));for(var t=e.return;null!==t;)t=(e=t).return;return 3===e.tag?e.stateNode:null}var Ln={};function Rn(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function On(e,t,r,n){return new Rn(e,t,r,n)}function In(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Mn(e,t){var r=e.alternate;return null===r?((r=On(e.tag,t,e.key,e.mode)).elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=65011712&e.flags,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Bn(e,t){e.flags&=65011714;var r=e.alternate;return null===r?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Vn(e,t,r,n,a,i){var l=0;if(n=e,"function"===typeof e)In(e)&&(l=1);else if("string"===typeof e)l=function(e,t,r){if(1===r||null!=t.itemProp)return!1;switch(e){case"meta":case"title":return!0;case"style":if("string"!==typeof t.precedence||"string"!==typeof t.href||""===t.href)break;return!0;case"link":if("string"!==typeof t.rel||"string"!==typeof t.href||""===t.href||t.onLoad||t.onError)break;return"stylesheet"!==t.rel||(e=t.disabled,"string"===typeof t.precedence&&null==e);case"script":if(t.async&&"function"!==typeof t.async&&"symbol"!==typeof t.async&&!t.onLoad&&!t.onError&&t.src&&"string"===typeof t.src)return!0}return!1}(e,r,K.current)?26:"html"===e||"head"===e||"body"===e?27:5;else e:switch(e){case E:return(e=On(31,r,t,a)).elementType=E,e.lanes=i,e;case x:return Un(r.children,a,i,t);case v:l=8,a|=24;break;case b:return(e=On(12,r,t,2|a)).elementType=b,e.lanes=i,e;case w:return(e=On(13,r,t,a)).elementType=w,e.lanes=i,e;case S:return(e=On(19,r,t,a)).elementType=S,e.lanes=i,e;default:if("object"===typeof e&&null!==e)switch(e.$$typeof){case k:l=10;break e;case y:l=9;break e;case j:l=11;break e;case $:l=14;break e;case z:l=16,n=null;break e}l=29,r=Error(o(130,null===e?"null":typeof e,"")),n=null}return(t=On(l,r,t,a)).elementType=e,t.type=n,t.lanes=i,t}function Un(e,t,r,n){return(e=On(7,e,n,t)).lanes=r,e}function Kn(e,t,r){return(e=On(6,e,null,t)).lanes=r,e}function Hn(e){var t=On(18,null,null,0);return t.stateNode=e,t}function Wn(e,t,r){return(t=On(4,null!==e.children?e.children:[],e.key,t)).lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qn=new WeakMap;function Yn(e,t){if("object"===typeof e&&null!==e){var r=qn.get(e);return void 0!==r?r:(t={value:e,source:t,stack:re(t)},qn.set(e,t),t)}return{value:e,source:t,stack:re(t)}}var Gn=[],Qn=0,Jn=null,Xn=0,Zn=[],ea=0,ta=null,ra=1,na="";function aa(e,t){Gn[Qn++]=Xn,Gn[Qn++]=Jn,Jn=e,Xn=t}function ia(e,t,r){Zn[ea++]=ra,Zn[ea++]=na,Zn[ea++]=ta,ta=e;var n=ra;e=na;var a=32-ye(n)-1;n&=~(1<<a),r+=1;var i=32-ye(t)+a;if(30<i){var o=a-a%5;i=(n&(1<<o)-1).toString(32),n>>=o,a-=o,ra=1<<32-ye(t)+a|r<<a|n,na=i+e}else ra=1<<i|r<<a|n,na=e}function oa(e){null!==e.return&&(aa(e,1),ia(e,1,0))}function la(e){for(;e===Jn;)Jn=Gn[--Qn],Gn[Qn]=null,Xn=Gn[--Qn],Gn[Qn]=null;for(;e===ta;)ta=Zn[--ea],Zn[ea]=null,na=Zn[--ea],Zn[ea]=null,ra=Zn[--ea],Zn[ea]=null}function sa(e,t){Zn[ea++]=ra,Zn[ea++]=na,Zn[ea++]=ta,ra=t.id,na=t.overflow,ta=e}var ca=null,da=null,ua=!1,pa=null,ha=!1,fa=Error(o(519));function ma(e){throw ka(Yn(Error(o(418,1<arguments.length&&void 0!==arguments[1]&&arguments[1]?"text":"HTML","")),e)),fa}function ga(e){var t=e.stateNode,r=e.type,n=e.memoizedProps;switch(t[Be]=e,t[Ve]=n,r){case"dialog":Jd("cancel",t),Jd("close",t);break;case"iframe":case"object":case"embed":Jd("load",t);break;case"video":case"audio":for(r=0;r<Yd.length;r++)Jd(Yd[r],t);break;case"source":Jd("error",t);break;case"img":case"image":case"link":Jd("error",t),Jd("load",t);break;case"details":Jd("toggle",t);break;case"input":Jd("invalid",t),bt(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":Jd("invalid",t);break;case"textarea":Jd("invalid",t),wt(t,n.value,n.defaultValue,n.children)}"string"!==typeof(r=n.children)&&"number"!==typeof r&&"bigint"!==typeof r||t.textContent===""+r||!0===n.suppressHydrationWarning||du(t.textContent,r)?(null!=n.popover&&(Jd("beforetoggle",t),Jd("toggle",t)),null!=n.onScroll&&Jd("scroll",t),null!=n.onScrollEnd&&Jd("scrollend",t),null!=n.onClick&&(t.onclick=Ft),t=!0):t=!1,t||ma(e,!0)}function xa(e){for(ca=e.return;ca;)switch(ca.tag){case 5:case 31:case 13:return void(ha=!1);case 27:case 3:return void(ha=!0);default:ca=ca.return}}function va(e){if(e!==ca)return!1;if(!ua)return xa(e),ua=!0,!1;var t,r=e.tag;if((t=3!==r&&27!==r)&&((t=5===r)&&(t=!("form"!==(t=e.type)&&"button"!==t)||yu(e.type,e.memoizedProps)),t=!t),t&&da&&ma(e),xa(e),13===r){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));da=Lu(e)}else if(31===r){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(o(317));da=Lu(e)}else 27===r?(r=da,Eu(e.type)?(e=Du,Du=null,da=e):da=r):da=ca?Pu(e.stateNode.nextSibling):null;return!0}function ba(){da=ca=null,ua=!1}function ya(){var e=pa;return null!==e&&(null===Cc?Cc=e:Cc.push.apply(Cc,e),pa=null),e}function ka(e){null===pa?pa=[e]:pa.push(e)}var ja=I(null),wa=null,Sa=null;function $a(e,t,r){B(ja,t._currentValue),t._currentValue=r}function za(e){e._currentValue=ja.current,M(ja)}function Ea(e,t,r){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==n&&(n.childLanes|=t)):null!==n&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function _a(e,t,r,n){var a=e.child;for(null!==a&&(a.return=e);null!==a;){var i=a.dependencies;if(null!==i){var l=a.child;i=i.firstContext;e:for(;null!==i;){var s=i;i=a;for(var c=0;c<t.length;c++)if(s.context===t[c]){i.lanes|=r,null!==(s=i.alternate)&&(s.lanes|=r),Ea(i.return,r,e),n||(l=null);break e}i=s.next}}else if(18===a.tag){if(null===(l=a.return))throw Error(o(341));l.lanes|=r,null!==(i=l.alternate)&&(i.lanes|=r),Ea(l,r,e),l=null}else l=a.child;if(null!==l)l.return=a;else for(l=a;null!==l;){if(l===e){l=null;break}if(null!==(a=l.sibling)){a.return=l.return,l=a;break}l=l.return}a=l}}function Na(e,t,r,n){e=null;for(var a=t,i=!1;null!==a;){if(!i)if(0!==(524288&a.flags))i=!0;else if(0!==(262144&a.flags))break;if(10===a.tag){var l=a.alternate;if(null===l)throw Error(o(387));if(null!==(l=l.memoizedProps)){var s=a.type;Jr(a.pendingProps.value,l.value)||(null!==e?e.push(s):e=[s])}}else if(a===q.current){if(null===(l=a.alternate))throw Error(o(387));l.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(null!==e?e.push(up):e=[up])}a=a.return}null!==e&&_a(t,e,r,n),t.flags|=262144}function Aa(e){for(e=e.firstContext;null!==e;){if(!Jr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ca(e){wa=e,Sa=null,null!==(e=e.dependencies)&&(e.firstContext=null)}function Fa(e){return Pa(wa,e)}function Ta(e,t){return null===wa&&Ca(e),Pa(e,t)}function Pa(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},null===Sa){if(null===e)throw Error(o(308));Sa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Sa=Sa.next=t;return r}var Da="undefined"!==typeof AbortController?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,r){e.push(r)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},La=n.unstable_scheduleCallback,Ra=n.unstable_NormalPriority,Oa={$$typeof:k,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ia(){return{controller:new Da,data:new Map,refCount:0}}function Ma(e){e.refCount--,0===e.refCount&&La(Ra,function(){e.controller.abort()})}var Ba=null,Va=0,Ua=0,Ka=null;function Ha(){if(0===--Va&&null!==Ba){null!==Ka&&(Ka.status="fulfilled");var e=Ba;Ba=null,Ua=0,Ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}var Wa=P.S;P.S=function(e,t){Pc=se(),"object"===typeof t&&null!==t&&"function"===typeof t.then&&function(e,t){if(null===Ba){var r=Ba=[];Va=0,Ua=Ud(),Ka={status:"pending",value:void 0,then:function(e){r.push(e)}}}Va++,t.then(Ha,Ha)}(0,t),null!==Wa&&Wa(e,t)};var qa=I(null);function Ya(){var e=qa.current;return null!==e?e:mc.pooledCache}function Ga(e,t){B(qa,null===t?qa.current:t.pool)}function Qa(){var e=Ya();return null===e?null:{parent:Oa._currentValue,pool:e}}var Ja=Error(o(460)),Xa=Error(o(474)),Za=Error(o(542)),ei={then:function(){}};function ti(e){return"fulfilled"===(e=e.status)||"rejected"===e}function ri(e,t,r){switch(void 0===(r=e[r])?e.push(t):r!==t&&(t.then(Ft,Ft),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e;default:if("string"===typeof t.status)t.then(Ft,Ft);else{if(null!==(e=mc)&&100<e.shellSuspendCounter)throw Error(o(482));(e=t).status="pending",e.then(function(e){if("pending"===t.status){var r=t;r.status="fulfilled",r.value=e}},function(e){if("pending"===t.status){var r=t;r.status="rejected",r.reason=e}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw oi(e=t.reason),e}throw ai=t,Ja}}function ni(e){try{return(0,e._init)(e._payload)}catch(qs){if(null!==qs&&"object"===typeof qs&&"function"===typeof qs.then)throw ai=qs,Ja;throw qs}}var ai=null;function ii(){if(null===ai)throw Error(o(459));var e=ai;return ai=null,e}function oi(e){if(e===Ja||e===Za)throw Error(o(483))}var li=null,si=0;function ci(e){var t=si;return si+=1,null===li&&(li=[]),ri(li,e,t)}function di(e,t){t=t.props.ref,e.ref=void 0!==t?t:null}function ui(e,t){if(t.$$typeof===f)throw Error(o(525));throw e=Object.prototype.toString.call(t),Error(o(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function pi(e){function t(t,r){if(e){var n=t.deletions;null===n?(t.deletions=[r],t.flags|=16):n.push(r)}}function r(r,n){if(!e)return null;for(;null!==n;)t(r,n),n=n.sibling;return null}function n(e){for(var t=new Map;null!==e;)null!==e.key?t.set(e.key,e):t.set(e.index,e),e=e.sibling;return t}function a(e,t){return(e=Mn(e,t)).index=0,e.sibling=null,e}function i(t,r,n){return t.index=n,e?null!==(n=t.alternate)?(n=n.index)<r?(t.flags|=67108866,r):n:(t.flags|=67108866,r):(t.flags|=1048576,r)}function l(t){return e&&null===t.alternate&&(t.flags|=67108866),t}function s(e,t,r,n){return null===t||6!==t.tag?((t=Kn(r,e.mode,n)).return=e,t):((t=a(t,r)).return=e,t)}function c(e,t,r,n){var i=r.type;return i===x?u(e,t,r.props.children,n,r.key):null!==t&&(t.elementType===i||"object"===typeof i&&null!==i&&i.$$typeof===z&&ni(i)===t.type)?(di(t=a(t,r.props),r),t.return=e,t):(di(t=Vn(r.type,r.key,r.props,null,e.mode,n),r),t.return=e,t)}function d(e,t,r,n){return null===t||4!==t.tag||t.stateNode.containerInfo!==r.containerInfo||t.stateNode.implementation!==r.implementation?((t=Wn(r,e.mode,n)).return=e,t):((t=a(t,r.children||[])).return=e,t)}function u(e,t,r,n,i){return null===t||7!==t.tag?((t=Un(r,e.mode,n,i)).return=e,t):((t=a(t,r)).return=e,t)}function p(e,t,r){if("string"===typeof t&&""!==t||"number"===typeof t||"bigint"===typeof t)return(t=Kn(""+t,e.mode,r)).return=e,t;if("object"===typeof t&&null!==t){switch(t.$$typeof){case m:return di(r=Vn(t.type,t.key,t.props,null,e.mode,r),t),r.return=e,r;case g:return(t=Wn(t,e.mode,r)).return=e,t;case z:return p(e,t=ni(t),r)}if(T(t)||A(t))return(t=Un(t,e.mode,r,null)).return=e,t;if("function"===typeof t.then)return p(e,ci(t),r);if(t.$$typeof===k)return p(e,Ta(e,t),r);ui(e,t)}return null}function h(e,t,r,n){var a=null!==t?t.key:null;if("string"===typeof r&&""!==r||"number"===typeof r||"bigint"===typeof r)return null!==a?null:s(e,t,""+r,n);if("object"===typeof r&&null!==r){switch(r.$$typeof){case m:return r.key===a?c(e,t,r,n):null;case g:return r.key===a?d(e,t,r,n):null;case z:return h(e,t,r=ni(r),n)}if(T(r)||A(r))return null!==a?null:u(e,t,r,n,null);if("function"===typeof r.then)return h(e,t,ci(r),n);if(r.$$typeof===k)return h(e,t,Ta(e,r),n);ui(e,r)}return null}function f(e,t,r,n,a){if("string"===typeof n&&""!==n||"number"===typeof n||"bigint"===typeof n)return s(t,e=e.get(r)||null,""+n,a);if("object"===typeof n&&null!==n){switch(n.$$typeof){case m:return c(t,e=e.get(null===n.key?r:n.key)||null,n,a);case g:return d(t,e=e.get(null===n.key?r:n.key)||null,n,a);case z:return f(e,t,r,n=ni(n),a)}if(T(n)||A(n))return u(t,e=e.get(r)||null,n,a,null);if("function"===typeof n.then)return f(e,t,r,ci(n),a);if(n.$$typeof===k)return f(e,t,r,Ta(t,n),a);ui(t,n)}return null}function v(s,c,d,u){if("object"===typeof d&&null!==d&&d.type===x&&null===d.key&&(d=d.props.children),"object"===typeof d&&null!==d){switch(d.$$typeof){case m:e:{for(var b=d.key;null!==c;){if(c.key===b){if((b=d.type)===x){if(7===c.tag){r(s,c.sibling),(u=a(c,d.props.children)).return=s,s=u;break e}}else if(c.elementType===b||"object"===typeof b&&null!==b&&b.$$typeof===z&&ni(b)===c.type){r(s,c.sibling),di(u=a(c,d.props),d),u.return=s,s=u;break e}r(s,c);break}t(s,c),c=c.sibling}d.type===x?((u=Un(d.props.children,s.mode,u,d.key)).return=s,s=u):(di(u=Vn(d.type,d.key,d.props,null,s.mode,u),d),u.return=s,s=u)}return l(s);case g:e:{for(b=d.key;null!==c;){if(c.key===b){if(4===c.tag&&c.stateNode.containerInfo===d.containerInfo&&c.stateNode.implementation===d.implementation){r(s,c.sibling),(u=a(c,d.children||[])).return=s,s=u;break e}r(s,c);break}t(s,c),c=c.sibling}(u=Wn(d,s.mode,u)).return=s,s=u}return l(s);case z:return v(s,c,d=ni(d),u)}if(T(d))return function(a,o,l,s){for(var c=null,d=null,u=o,m=o=0,g=null;null!==u&&m<l.length;m++){u.index>m?(g=u,u=null):g=u.sibling;var x=h(a,u,l[m],s);if(null===x){null===u&&(u=g);break}e&&u&&null===x.alternate&&t(a,u),o=i(x,o,m),null===d?c=x:d.sibling=x,d=x,u=g}if(m===l.length)return r(a,u),ua&&aa(a,m),c;if(null===u){for(;m<l.length;m++)null!==(u=p(a,l[m],s))&&(o=i(u,o,m),null===d?c=u:d.sibling=u,d=u);return ua&&aa(a,m),c}for(u=n(u);m<l.length;m++)null!==(g=f(u,a,m,l[m],s))&&(e&&null!==g.alternate&&u.delete(null===g.key?m:g.key),o=i(g,o,m),null===d?c=g:d.sibling=g,d=g);return e&&u.forEach(function(e){return t(a,e)}),ua&&aa(a,m),c}(s,c,d,u);if(A(d)){if("function"!==typeof(b=A(d)))throw Error(o(150));return function(a,l,s,c){if(null==s)throw Error(o(151));for(var d=null,u=null,m=l,g=l=0,x=null,v=s.next();null!==m&&!v.done;g++,v=s.next()){m.index>g?(x=m,m=null):x=m.sibling;var b=h(a,m,v.value,c);if(null===b){null===m&&(m=x);break}e&&m&&null===b.alternate&&t(a,m),l=i(b,l,g),null===u?d=b:u.sibling=b,u=b,m=x}if(v.done)return r(a,m),ua&&aa(a,g),d;if(null===m){for(;!v.done;g++,v=s.next())null!==(v=p(a,v.value,c))&&(l=i(v,l,g),null===u?d=v:u.sibling=v,u=v);return ua&&aa(a,g),d}for(m=n(m);!v.done;g++,v=s.next())null!==(v=f(m,a,g,v.value,c))&&(e&&null!==v.alternate&&m.delete(null===v.key?g:v.key),l=i(v,l,g),null===u?d=v:u.sibling=v,u=v);return e&&m.forEach(function(e){return t(a,e)}),ua&&aa(a,g),d}(s,c,d=b.call(d),u)}if("function"===typeof d.then)return v(s,c,ci(d),u);if(d.$$typeof===k)return v(s,c,Ta(s,d),u);ui(s,d)}return"string"===typeof d&&""!==d||"number"===typeof d||"bigint"===typeof d?(d=""+d,null!==c&&6===c.tag?(r(s,c.sibling),(u=a(c,d)).return=s,s=u):(r(s,c),(u=Kn(d,s.mode,u)).return=s,s=u),l(s)):r(s,c)}return function(e,t,r,n){try{si=0;var a=v(e,t,r,n);return li=null,a}catch(qs){if(qs===Ja||qs===Za)throw qs;var i=On(29,qs,null,e.mode);return i.lanes=n,i.return=e,i}}}var hi=pi(!0),fi=pi(!1),mi=!1;function gi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xi(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function vi(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function bi(e,t,r){var n=e.updateQueue;if(null===n)return null;if(n=n.shared,0!==(2&fc)){var a=n.pending;return null===a?t.next=t:(t.next=a.next,a.next=t),n.pending=t,t=Dn(e),Pn(e,null,r),t}return Cn(e,n,t,r),Dn(e)}function yi(e,t,r){if(null!==(t=t.updateQueue)&&(t=t.shared,0!==(4194048&r))){var n=t.lanes;r|=n&=e.pendingLanes,t.lanes=r,Pe(e,r)}}function ki(e,t){var r=e.updateQueue,n=e.alternate;if(null!==n&&r===(n=n.updateQueue)){var a=null,i=null;if(null!==(r=r.firstBaseUpdate)){do{var o={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};null===i?a=i=o:i=i.next=o,r=r.next}while(null!==r);null===i?a=i=t:i=i.next=t}else a=i=t;return r={baseState:n.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:n.shared,callbacks:n.callbacks},void(e.updateQueue=r)}null===(e=r.lastBaseUpdate)?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var ji=!1;function wi(){if(ji){if(null!==Ka)throw Ka}}function Si(e,t,r,n){ji=!1;var a=e.updateQueue;mi=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,l=a.shared.pending;if(null!==l){a.shared.pending=null;var s=l,c=s.next;s.next=null,null===o?i=c:o.next=c,o=s;var d=e.alternate;null!==d&&((l=(d=d.updateQueue).lastBaseUpdate)!==o&&(null===l?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=s))}if(null!==i){var u=a.baseState;for(o=0,d=c=s=null,l=i;;){var p=-536870913&l.lane,f=p!==l.lane;if(f?(xc&p)===p:(n&p)===p){0!==p&&p===Ua&&(ji=!0),null!==d&&(d=d.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});e:{var m=e,g=l;p=t;var x=r;switch(g.tag){case 1:if("function"===typeof(m=g.payload)){u=m.call(x,u,p);break e}u=m;break e;case 3:m.flags=-65537&m.flags|128;case 0:if(null===(p="function"===typeof(m=g.payload)?m.call(x,u,p):m)||void 0===p)break e;u=h({},u,p);break e;case 2:mi=!0}}null!==(p=l.callback)&&(e.flags|=64,f&&(e.flags|=8192),null===(f=a.callbacks)?a.callbacks=[p]:f.push(p))}else f={lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},null===d?(c=d=f,s=u):d=d.next=f,o|=p;if(null===(l=l.next)){if(null===(l=a.shared.pending))break;l=(f=l).next,f.next=null,a.lastBaseUpdate=f,a.shared.pending=null}}null===d&&(s=u),a.baseState=s,a.firstBaseUpdate=c,a.lastBaseUpdate=d,null===i&&(a.shared.lanes=0),$c|=o,e.lanes=o,e.memoizedState=u}}function $i(e,t){if("function"!==typeof e)throw Error(o(191,e));e.call(t)}function zi(e,t){var r=e.callbacks;if(null!==r)for(e.callbacks=null,e=0;e<r.length;e++)$i(r[e],t)}var Ei=I(null),_i=I(0);function Ni(e,t){B(_i,e=wc),B(Ei,t),wc=e|t.baseLanes}function Ai(){B(_i,wc),B(Ei,Ei.current)}function Ci(){wc=_i.current,M(Ei),M(_i)}var Fi=I(null),Ti=null;function Pi(e){var t=e.alternate;B(Ii,1&Ii.current),B(Fi,e),null===Ti&&(null===t||null!==Ei.current||null!==t.memoizedState)&&(Ti=e)}function Di(e){B(Ii,Ii.current),B(Fi,e),null===Ti&&(Ti=e)}function Li(e){22===e.tag?(B(Ii,Ii.current),B(Fi,e),null===Ti&&(Ti=e)):Ri()}function Ri(){B(Ii,Ii.current),B(Fi,Fi.current)}function Oi(e){M(Fi),Ti===e&&(Ti=null),M(Ii)}var Ii=I(0);function Mi(e){for(var t=e;null!==t;){if(13===t.tag){var r=t.memoizedState;if(null!==r&&(null===(r=r.dehydrated)||Fu(r)||Tu(r)))return t}else if(19!==t.tag||"forwards"!==t.memoizedProps.revealOrder&&"backwards"!==t.memoizedProps.revealOrder&&"unstable_legacy-backwards"!==t.memoizedProps.revealOrder&&"together"!==t.memoizedProps.revealOrder){if(null!==t.child){t.child.return=t,t=t.child;continue}}else if(0!==(128&t.flags))return t;if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bi=0,Vi=null,Ui=null,Ki=null,Hi=!1,Wi=!1,qi=!1,Yi=0,Gi=0,Qi=null,Ji=0;function Xi(){throw Error(o(321))}function Zi(e,t){if(null===t)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Jr(e[r],t[r]))return!1;return!0}function eo(e,t,r,n,a,i){return Bi=i,Vi=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,P.H=null===e||null===e.memoizedState?gl:xl,qi=!1,i=r(n,a),qi=!1,Wi&&(i=ro(t,r,n,a)),to(e),i}function to(e){P.H=ml;var t=null!==Ui&&null!==Ui.next;if(Bi=0,Ki=Ui=Vi=null,Hi=!1,Gi=0,Qi=null,t)throw Error(o(300));null===e||Tl||null!==(e=e.dependencies)&&Aa(e)&&(Tl=!0)}function ro(e,t,r,n){Vi=e;var a=0;do{if(Wi&&(Qi=null),Gi=0,Wi=!1,25<=a)throw Error(o(301));if(a+=1,Ki=Ui=null,null!=e.updateQueue){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,null!=i.memoCache&&(i.memoCache.index=0)}P.H=vl,i=t(r,n)}while(Wi);return i}function no(){var e=P.H,t=e.useState()[0];return t="function"===typeof t.then?co(t):t,e=e.useState()[0],(null!==Ui?Ui.memoizedState:null)!==e&&(Vi.flags|=1024),t}function ao(){var e=0!==Yi;return Yi=0,e}function io(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function oo(e){if(Hi){for(e=e.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}Hi=!1}Bi=0,Ki=Ui=Vi=null,Wi=!1,Gi=Yi=0,Qi=null}function lo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===Ki?Vi.memoizedState=Ki=e:Ki=Ki.next=e,Ki}function so(){if(null===Ui){var e=Vi.alternate;e=null!==e?e.memoizedState:null}else e=Ui.next;var t=null===Ki?Vi.memoizedState:Ki.next;if(null!==t)Ki=t,Ui=e;else{if(null===e){if(null===Vi.alternate)throw Error(o(467));throw Error(o(310))}e={memoizedState:(Ui=e).memoizedState,baseState:Ui.baseState,baseQueue:Ui.baseQueue,queue:Ui.queue,next:null},null===Ki?Vi.memoizedState=Ki=e:Ki=Ki.next=e}return Ki}function co(e){var t=Gi;return Gi+=1,null===Qi&&(Qi=[]),e=ri(Qi,e,t),t=Vi,null===(null===Ki?t.memoizedState:Ki.next)&&(t=t.alternate,P.H=null===t||null===t.memoizedState?gl:xl),e}function uo(e){if(null!==e&&"object"===typeof e){if("function"===typeof e.then)return co(e);if(e.$$typeof===k)return Fa(e)}throw Error(o(438,String(e)))}function po(e){var t=null,r=Vi.updateQueue;if(null!==r&&(t=r.memoCache),null==t){var n=Vi.alternate;null!==n&&(null!==(n=n.updateQueue)&&(null!=(n=n.memoCache)&&(t={data:n.data.map(function(e){return e.slice()}),index:0})))}if(null==t&&(t={data:[],index:0}),null===r&&(r={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=r),r.memoCache=t,void 0===(r=t.data[t.index]))for(r=t.data[t.index]=Array(e),n=0;n<e;n++)r[n]=_;return t.index++,r}function ho(e,t){return"function"===typeof t?t(e):t}function fo(e){return mo(so(),Ui,e)}function mo(e,t,r){var n=e.queue;if(null===n)throw Error(o(311));n.lastRenderedReducer=r;var a=e.baseQueue,i=n.pending;if(null!==i){if(null!==a){var l=a.next;a.next=i.next,i.next=l}t.baseQueue=a=i,n.pending=null}if(i=e.baseState,null===a)e.memoizedState=i;else{var s=l=null,c=null,d=t=a.next,u=!1;do{var p=-536870913&d.lane;if(p!==d.lane?(xc&p)===p:(Bi&p)===p){var h=d.revertLane;if(0===h)null!==c&&(c=c.next={lane:0,revertLane:0,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),p===Ua&&(u=!0);else{if((Bi&h)===h){d=d.next,h===Ua&&(u=!0);continue}p={lane:0,revertLane:d.revertLane,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},null===c?(s=c=p,l=i):c=c.next=p,Vi.lanes|=h,$c|=h}p=d.action,qi&&r(i,p),i=d.hasEagerState?d.eagerState:r(i,p)}else h={lane:p,revertLane:d.revertLane,gesture:d.gesture,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},null===c?(s=c=h,l=i):c=c.next=h,Vi.lanes|=p,$c|=p;d=d.next}while(null!==d&&d!==t);if(null===c?l=i:c.next=s,!Jr(i,e.memoizedState)&&(Tl=!0,u&&null!==(r=Ka)))throw r;e.memoizedState=i,e.baseState=l,e.baseQueue=c,n.lastRenderedState=i}return null===a&&(n.lanes=0),[e.memoizedState,n.dispatch]}function go(e){var t=so(),r=t.queue;if(null===r)throw Error(o(311));r.lastRenderedReducer=e;var n=r.dispatch,a=r.pending,i=t.memoizedState;if(null!==a){r.pending=null;var l=a=a.next;do{i=e(i,l.action),l=l.next}while(l!==a);Jr(i,t.memoizedState)||(Tl=!0),t.memoizedState=i,null===t.baseQueue&&(t.baseState=i),r.lastRenderedState=i}return[i,n]}function xo(e,t,r){var n=Vi,a=so(),i=ua;if(i){if(void 0===r)throw Error(o(407));r=r()}else r=t();var l=!Jr((Ui||a).memoizedState,r);if(l&&(a.memoizedState=r,Tl=!0),a=a.queue,Vo(yo.bind(null,n,a,e),[e]),a.getSnapshot!==t||l||null!==Ki&&1&Ki.memoizedState.tag){if(n.flags|=2048,Ro(9,{destroy:void 0},bo.bind(null,n,a,r,t),null),null===mc)throw Error(o(349));i||0!==(127&Bi)||vo(n,t,r)}return r}function vo(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},null===(t=Vi.updateQueue)?(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.stores=[e]):null===(r=t.stores)?t.stores=[e]:r.push(e)}function bo(e,t,r,n){t.value=r,t.getSnapshot=n,ko(t)&&jo(e)}function yo(e,t,r){return r(function(){ko(t)&&jo(e)})}function ko(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Jr(e,r)}catch(n){return!0}}function jo(e){var t=Tn(e,2);null!==t&&Gc(t,e,2)}function wo(e){var t=lo();if("function"===typeof e){var r=e;if(e=r(),qi){be(!0);try{r()}finally{be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:e},t}function So(e,t,r,n){return e.baseState=r,mo(e,Ui,"function"===typeof n?n:ho)}function $o(e,t,r,n,a){if(pl(e))throw Error(o(485));if(null!==(e=t.action)){var i={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(e){i.listeners.push(e)}};null!==P.T?r(!0):i.isTransition=!1,n(i),null===(r=t.pending)?(i.next=t.pending=i,zo(t,i)):(i.next=r.next,t.pending=r.next=i)}}function zo(e,t){var r=t.action,n=t.payload,a=e.state;if(t.isTransition){var i=P.T,o={};P.T=o;try{var l=r(a,n),s=P.S;null!==s&&s(o,l),Eo(e,t,l)}catch(c){No(e,t,c)}finally{null!==i&&null!==o.types&&(i.types=o.types),P.T=i}}else try{Eo(e,t,i=r(a,n))}catch(d){No(e,t,d)}}function Eo(e,t,r){null!==r&&"object"===typeof r&&"function"===typeof r.then?r.then(function(r){_o(e,t,r)},function(r){return No(e,t,r)}):_o(e,t,r)}function _o(e,t,r){t.status="fulfilled",t.value=r,Ao(t),e.state=r,null!==(t=e.pending)&&((r=t.next)===t?e.pending=null:(r=r.next,t.next=r,zo(e,r)))}function No(e,t,r){var n=e.pending;if(e.pending=null,null!==n){n=n.next;do{t.status="rejected",t.reason=r,Ao(t),t=t.next}while(t!==n)}e.action=null}function Ao(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Co(e,t){return t}function Fo(e,t){if(ua){var r=mc.formState;if(null!==r){e:{var n=Vi;if(ua){if(da){t:{for(var a=da,i=ha;8!==a.nodeType;){if(!i){a=null;break t}if(null===(a=Pu(a.nextSibling))){a=null;break t}}a="F!"===(i=a.data)||"F"===i?a:null}if(a){da=Pu(a.nextSibling),n="F!"===a.data;break e}}ma(n)}n=!1}n&&(t=r[0])}}return(r=lo()).memoizedState=r.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Co,lastRenderedState:t},r.queue=n,r=cl.bind(null,Vi,n),n.dispatch=r,n=wo(!1),i=ul.bind(null,Vi,!1,n.queue),a={state:t,dispatch:null,action:e,pending:null},(n=lo()).queue=a,r=$o.bind(null,Vi,a,i,r),a.dispatch=r,n.memoizedState=e,[t,r,!1]}function To(e){return Po(so(),Ui,e)}function Po(e,t,r){if(t=mo(e,t,Co)[0],e=fo(ho)[0],"object"===typeof t&&null!==t&&"function"===typeof t.then)try{var n=co(t)}catch(qs){if(qs===Ja)throw Za;throw qs}else n=t;var a=(t=so()).queue,i=a.dispatch;return r!==t.memoizedState&&(Vi.flags|=2048,Ro(9,{destroy:void 0},Do.bind(null,a,r),null)),[n,i,e]}function Do(e,t){e.action=t}function Lo(e){var t=so(),r=Ui;if(null!==r)return Po(t,r,e);so(),t=t.memoizedState;var n=(r=so()).queue.dispatch;return r.memoizedState=e,[t,n,!1]}function Ro(e,t,r,n){return e={tag:e,create:r,deps:n,inst:t,next:null},null===(t=Vi.updateQueue)&&(t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t),null===(r=t.lastEffect)?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e),e}function Oo(){return so().memoizedState}function Io(e,t,r,n){var a=lo();Vi.flags|=e,a.memoizedState=Ro(1|t,{destroy:void 0},r,void 0===n?null:n)}function Mo(e,t,r,n){var a=so();n=void 0===n?null:n;var i=a.memoizedState.inst;null!==Ui&&null!==n&&Zi(n,Ui.memoizedState.deps)?a.memoizedState=Ro(t,i,r,n):(Vi.flags|=e,a.memoizedState=Ro(1|t,i,r,n))}function Bo(e,t){Io(8390656,8,e,t)}function Vo(e,t){Mo(2048,8,e,t)}function Uo(e){var t=so().memoizedState;return function(e){Vi.flags|=4;var t=Vi.updateQueue;if(null===t)t={lastEffect:null,events:null,stores:null,memoCache:null},Vi.updateQueue=t,t.events=[e];else{var r=t.events;null===r?t.events=[e]:r.push(e)}}({ref:t,nextImpl:e}),function(){if(0!==(2&fc))throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Ko(e,t){return Mo(4,2,e,t)}function Ho(e,t){return Mo(4,4,e,t)}function Wo(e,t){if("function"===typeof t){e=e();var r=t(e);return function(){"function"===typeof r?r():t(null)}}if(null!==t&&void 0!==t)return e=e(),t.current=e,function(){t.current=null}}function qo(e,t,r){r=null!==r&&void 0!==r?r.concat([e]):null,Mo(4,4,Wo.bind(null,t,e),r)}function Yo(){}function Go(e,t){var r=so();t=void 0===t?null:t;var n=r.memoizedState;return null!==t&&Zi(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Qo(e,t){var r=so();t=void 0===t?null:t;var n=r.memoizedState;if(null!==t&&Zi(t,n[1]))return n[0];if(n=e(),qi){be(!0);try{e()}finally{be(!1)}}return r.memoizedState=[n,t],n}function Jo(e,t,r){return void 0===r||0!==(1073741824&Bi)&&0===(261930&xc)?e.memoizedState=t:(e.memoizedState=r,e=Yc(),Vi.lanes|=e,$c|=e,r)}function Xo(e,t,r,n){return Jr(r,t)?r:null!==Ei.current?(e=Jo(e,r,n),Jr(e,t)||(Tl=!0),e):0===(42&Bi)||0!==(1073741824&Bi)&&0===(261930&xc)?(Tl=!0,e.memoizedState=r):(e=Yc(),Vi.lanes|=e,$c|=e,t)}function Zo(e,t,r,n,a){var i=D.p;D.p=0!==i&&8>i?i:8;var o=P.T,l={};P.T=l,ul(e,!1,t,r);try{var s=a(),c=P.S;if(null!==c&&c(l,s),null!==s&&"object"===typeof s&&"function"===typeof s.then){var d=function(e,t){var r=[],n={status:"pending",value:null,reason:null,then:function(e){r.push(e)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var e=0;e<r.length;e++)(0,r[e])(t)},function(e){for(n.status="rejected",n.reason=e,e=0;e<r.length;e++)(0,r[e])(void 0)}),n}(s,n);dl(e,t,d,qc())}else dl(e,t,n,qc())}catch(u){dl(e,t,{then:function(){},status:"rejected",reason:u},qc())}finally{D.p=i,null!==o&&null!==l.types&&(o.types=l.types),P.T=o}}function el(){}function tl(e,t,r,n){if(5!==e.tag)throw Error(o(476));var a=rl(e).queue;Zo(e,a,t,L,null===r?el:function(){return nl(e),r(n)})}function rl(e){var t=e.memoizedState;if(null!==t)return t;var r={};return(t={memoizedState:L,baseState:L,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:L},next:null}).next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ho,lastRenderedState:r},next:null},e.memoizedState=t,null!==(e=e.alternate)&&(e.memoizedState=t),t}function nl(e){var t=rl(e);null===t.next&&(t=e.alternate.memoizedState),dl(e,t.next.queue,{},qc())}function al(){return Fa(up)}function il(){return so().memoizedState}function ol(){return so().memoizedState}function ll(e){for(var t=e.return;null!==t;){switch(t.tag){case 24:case 3:var r=qc(),n=bi(t,e=vi(r),r);return null!==n&&(Gc(n,t,r),yi(n,t,r)),t={cache:Ia()},void(e.payload=t)}t=t.return}}function sl(e,t,r){var n=qc();r={lane:n,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},pl(e)?hl(t,r):null!==(r=Fn(e,t,r,n))&&(Gc(r,e,n),fl(r,t,n))}function cl(e,t,r){dl(e,t,r,qc())}function dl(e,t,r,n){var a={lane:n,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(pl(e))hl(t,a);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)&&null!==(i=t.lastRenderedReducer))try{var o=t.lastRenderedState,l=i(o,r);if(a.hasEagerState=!0,a.eagerState=l,Jr(l,o))return Cn(e,t,a,0),null===mc&&An(),!1}catch(s){}if(null!==(r=Fn(e,t,a,n)))return Gc(r,e,n),fl(r,t,n),!0}return!1}function ul(e,t,r,n){if(n={lane:2,revertLane:Ud(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},pl(e)){if(t)throw Error(o(479))}else null!==(t=Fn(e,r,n,2))&&Gc(t,e,2)}function pl(e){var t=e.alternate;return e===Vi||null!==t&&t===Vi}function hl(e,t){Wi=Hi=!0;var r=e.pending;null===r?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function fl(e,t,r){if(0!==(4194048&r)){var n=t.lanes;r|=n&=e.pendingLanes,t.lanes=r,Pe(e,r)}}var ml={readContext:Fa,use:uo,useCallback:Xi,useContext:Xi,useEffect:Xi,useImperativeHandle:Xi,useLayoutEffect:Xi,useInsertionEffect:Xi,useMemo:Xi,useReducer:Xi,useRef:Xi,useState:Xi,useDebugValue:Xi,useDeferredValue:Xi,useTransition:Xi,useSyncExternalStore:Xi,useId:Xi,useHostTransitionStatus:Xi,useFormState:Xi,useActionState:Xi,useOptimistic:Xi,useMemoCache:Xi,useCacheRefresh:Xi};ml.useEffectEvent=Xi;var gl={readContext:Fa,use:uo,useCallback:function(e,t){return lo().memoizedState=[e,void 0===t?null:t],e},useContext:Fa,useEffect:Bo,useImperativeHandle:function(e,t,r){r=null!==r&&void 0!==r?r.concat([e]):null,Io(4194308,4,Wo.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Io(4194308,4,e,t)},useInsertionEffect:function(e,t){Io(4,2,e,t)},useMemo:function(e,t){var r=lo();t=void 0===t?null:t;var n=e();if(qi){be(!0);try{e()}finally{be(!1)}}return r.memoizedState=[n,t],n},useReducer:function(e,t,r){var n=lo();if(void 0!==r){var a=r(t);if(qi){be(!0);try{r(t)}finally{be(!1)}}}else a=t;return n.memoizedState=n.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},n.queue=e,e=e.dispatch=sl.bind(null,Vi,e),[n.memoizedState,e]},useRef:function(e){return e={current:e},lo().memoizedState=e},useState:function(e){var t=(e=wo(e)).queue,r=cl.bind(null,Vi,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Yo,useDeferredValue:function(e,t){return Jo(lo(),e,t)},useTransition:function(){var e=wo(!1);return e=Zo.bind(null,Vi,e.queue,!0,!1),lo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var n=Vi,a=lo();if(ua){if(void 0===r)throw Error(o(407));r=r()}else{if(r=t(),null===mc)throw Error(o(349));0!==(127&xc)||vo(n,t,r)}a.memoizedState=r;var i={value:r,getSnapshot:t};return a.queue=i,Bo(yo.bind(null,n,i,e),[e]),n.flags|=2048,Ro(9,{destroy:void 0},bo.bind(null,n,i,r,t),null),r},useId:function(){var e=lo(),t=mc.identifierPrefix;if(ua){var r=na;t="_"+t+"R_"+(r=(ra&~(1<<32-ye(ra)-1)).toString(32)+r),0<(r=Yi++)&&(t+="H"+r.toString(32)),t+="_"}else t="_"+t+"r_"+(r=Ji++).toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:al,useFormState:Fo,useActionState:Fo,useOptimistic:function(e){var t=lo();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=ul.bind(null,Vi,!0,r),r.dispatch=t,[e,t]},useMemoCache:po,useCacheRefresh:function(){return lo().memoizedState=ll.bind(null,Vi)},useEffectEvent:function(e){var t=lo(),r={impl:e};return t.memoizedState=r,function(){if(0!==(2&fc))throw Error(o(440));return r.impl.apply(void 0,arguments)}}},xl={readContext:Fa,use:uo,useCallback:Go,useContext:Fa,useEffect:Vo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Qo,useReducer:fo,useRef:Oo,useState:function(){return fo(ho)},useDebugValue:Yo,useDeferredValue:function(e,t){return Xo(so(),Ui.memoizedState,e,t)},useTransition:function(){var e=fo(ho)[0],t=so().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:il,useHostTransitionStatus:al,useFormState:To,useActionState:To,useOptimistic:function(e,t){return So(so(),0,e,t)},useMemoCache:po,useCacheRefresh:ol};xl.useEffectEvent=Uo;var vl={readContext:Fa,use:uo,useCallback:Go,useContext:Fa,useEffect:Vo,useImperativeHandle:qo,useInsertionEffect:Ko,useLayoutEffect:Ho,useMemo:Qo,useReducer:go,useRef:Oo,useState:function(){return go(ho)},useDebugValue:Yo,useDeferredValue:function(e,t){var r=so();return null===Ui?Jo(r,e,t):Xo(r,Ui.memoizedState,e,t)},useTransition:function(){var e=go(ho)[0],t=so().memoizedState;return["boolean"===typeof e?e:co(e),t]},useSyncExternalStore:xo,useId:il,useHostTransitionStatus:al,useFormState:Lo,useActionState:Lo,useOptimistic:function(e,t){var r=so();return null!==Ui?So(r,0,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:po,useCacheRefresh:ol};function bl(e,t,r,n){r=null===(r=r(n,t=e.memoizedState))||void 0===r?t:h({},t,r),e.memoizedState=r,0===e.lanes&&(e.updateQueue.baseState=r)}vl.useEffectEvent=Uo;var yl={enqueueSetState:function(e,t,r){e=e._reactInternals;var n=qc(),a=vi(n);a.payload=t,void 0!==r&&null!==r&&(a.callback=r),null!==(t=bi(e,a,n))&&(Gc(t,e,n),yi(t,e,n))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=qc(),a=vi(n);a.tag=1,a.payload=t,void 0!==r&&null!==r&&(a.callback=r),null!==(t=bi(e,a,n))&&(Gc(t,e,n),yi(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=qc(),n=vi(r);n.tag=2,void 0!==t&&null!==t&&(n.callback=t),null!==(t=bi(e,n,r))&&(Gc(t,e,r),yi(t,e,r))}};function kl(e,t,r,n,a,i,o){return"function"===typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(n,i,o):!t.prototype||!t.prototype.isPureReactComponent||(!Xr(r,n)||!Xr(a,i))}function jl(e,t,r,n){e=t.state,"function"===typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(r,n),"function"===typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&yl.enqueueReplaceState(t,t.state,null)}function wl(e,t){var r=t;if("ref"in t)for(var n in r={},t)"ref"!==n&&(r[n]=t[n]);if(e=e.defaultProps)for(var a in r===t&&(r=h({},r)),e)void 0===r[a]&&(r[a]=e[a]);return r}function Sl(e){zn(e)}function $l(e){console.error(e)}function zl(e){zn(e)}function El(e,t){try{(0,e.onUncaughtError)(t.value,{componentStack:t.stack})}catch(r){setTimeout(function(){throw r})}}function _l(e,t,r){try{(0,e.onCaughtError)(r.value,{componentStack:r.stack,errorBoundary:1===t.tag?t.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Nl(e,t,r){return(r=vi(r)).tag=3,r.payload={element:null},r.callback=function(){El(e,t)},r}function Al(e){return(e=vi(e)).tag=3,e}function Cl(e,t,r,n){var a=r.type.getDerivedStateFromError;if("function"===typeof a){var i=n.value;e.payload=function(){return a(i)},e.callback=function(){_l(t,r,n)}}var o=r.stateNode;null!==o&&"function"===typeof o.componentDidCatch&&(e.callback=function(){_l(t,r,n),"function"!==typeof a&&(null===Rc?Rc=new Set([this]):Rc.add(this));var e=n.stack;this.componentDidCatch(n.value,{componentStack:null!==e?e:""})})}var Fl=Error(o(461)),Tl=!1;function Pl(e,t,r,n){t.child=null===e?fi(t,null,r,n):hi(t,e.child,r,n)}function Dl(e,t,r,n,a){r=r.render;var i=t.ref;if("ref"in n){var o={};for(var l in n)"ref"!==l&&(o[l]=n[l])}else o=n;return Ca(t),n=eo(e,t,r,o,i,a),l=ao(),null===e||Tl?(ua&&l&&oa(t),t.flags|=1,Pl(e,t,n,a),t.child):(io(e,t,a),as(e,t,a))}function Ll(e,t,r,n,a){if(null===e){var i=r.type;return"function"!==typeof i||In(i)||void 0!==i.defaultProps||null!==r.compare?((e=Vn(r.type,null,n,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=i,Rl(e,t,i,n,a))}if(i=e.child,!is(e,a)){var o=i.memoizedProps;if((r=null!==(r=r.compare)?r:Xr)(o,n)&&e.ref===t.ref)return as(e,t,a)}return t.flags|=1,(e=Mn(i,n)).ref=t.ref,e.return=t,t.child=e}function Rl(e,t,r,n,a){if(null!==e){var i=e.memoizedProps;if(Xr(i,n)&&e.ref===t.ref){if(Tl=!1,t.pendingProps=n=i,!is(e,a))return t.lanes=e.lanes,as(e,t,a);0!==(131072&e.flags)&&(Tl=!0)}}return Kl(e,t,r,n,a)}function Ol(e,t,r,n){var a=n.children,i=null!==e?e.memoizedState:null;if(null===e&&null===t.stateNode&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),"hidden"===n.mode){if(0!==(128&t.flags)){if(i=null!==i?i.baseLanes|r:r,null!==e){for(n=t.child=e.child,a=0;null!==n;)a=a|n.lanes|n.childLanes,n=n.sibling;n=a&~i}else n=0,t.child=null;return Ml(e,t,i,r,n)}if(0===(536870912&r))return n=t.lanes=536870912,Ml(e,t,null!==i?i.baseLanes|r:r,r,n);t.memoizedState={baseLanes:0,cachePool:null},null!==e&&Ga(0,null!==i?i.cachePool:null),null!==i?Ni(t,i):Ai(),Li(t)}else null!==i?(Ga(0,i.cachePool),Ni(t,i),Ri(),t.memoizedState=null):(null!==e&&Ga(0,null),Ai(),Ri());return Pl(e,t,a,r),t.child}function Il(e,t){return null!==e&&22===e.tag||null!==t.stateNode||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ml(e,t,r,n,a){var i=Ya();return i=null===i?null:{parent:Oa._currentValue,pool:i},t.memoizedState={baseLanes:r,cachePool:i},null!==e&&Ga(0,null),Ai(),Li(t),null!==e&&Na(e,t,n,!0),t.childLanes=a,null}function Bl(e,t){return(t=Zl({mode:t.mode,children:t.children},e.mode)).ref=e.ref,e.child=t,t.return=e,t}function Vl(e,t,r){return hi(t,e.child,null,r),(e=Bl(t,t.pendingProps)).flags|=2,Oi(t),t.memoizedState=null,e}function Ul(e,t){var r=t.ref;if(null===r)null!==e&&null!==e.ref&&(t.flags|=4194816);else{if("function"!==typeof r&&"object"!==typeof r)throw Error(o(284));null!==e&&e.ref===r||(t.flags|=4194816)}}function Kl(e,t,r,n,a){return Ca(t),r=eo(e,t,r,n,void 0,a),n=ao(),null===e||Tl?(ua&&n&&oa(t),t.flags|=1,Pl(e,t,r,a),t.child):(io(e,t,a),as(e,t,a))}function Hl(e,t,r,n,a,i){return Ca(t),t.updateQueue=null,r=ro(t,n,r,a),to(e),n=ao(),null===e||Tl?(ua&&n&&oa(t),t.flags|=1,Pl(e,t,r,i),t.child):(io(e,t,i),as(e,t,i))}function Wl(e,t,r,n,a){if(Ca(t),null===t.stateNode){var i=Ln,o=r.contextType;"object"===typeof o&&null!==o&&(i=Fa(o)),i=new r(n,i),t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,i.updater=yl,t.stateNode=i,i._reactInternals=t,(i=t.stateNode).props=n,i.state=t.memoizedState,i.refs={},gi(t),o=r.contextType,i.context="object"===typeof o&&null!==o?Fa(o):Ln,i.state=t.memoizedState,"function"===typeof(o=r.getDerivedStateFromProps)&&(bl(t,r,o,n),i.state=t.memoizedState),"function"===typeof r.getDerivedStateFromProps||"function"===typeof i.getSnapshotBeforeUpdate||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||(o=i.state,"function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),o!==i.state&&yl.enqueueReplaceState(i,i.state,null),Si(t,n,i,a),wi(),i.state=t.memoizedState),"function"===typeof i.componentDidMount&&(t.flags|=4194308),n=!0}else if(null===e){i=t.stateNode;var l=t.memoizedProps,s=wl(r,l);i.props=s;var c=i.context,d=r.contextType;o=Ln,"object"===typeof d&&null!==d&&(o=Fa(d));var u=r.getDerivedStateFromProps;d="function"===typeof u||"function"===typeof i.getSnapshotBeforeUpdate,l=t.pendingProps!==l,d||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(l||c!==o)&&jl(t,i,n,o),mi=!1;var p=t.memoizedState;i.state=p,Si(t,n,i,a),wi(),c=t.memoizedState,l||p!==c||mi?("function"===typeof u&&(bl(t,r,u,n),c=t.memoizedState),(s=mi||kl(t,r,s,n,p,c,o))?(d||"function"!==typeof i.UNSAFE_componentWillMount&&"function"!==typeof i.componentWillMount||("function"===typeof i.componentWillMount&&i.componentWillMount(),"function"===typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"===typeof i.componentDidMount&&(t.flags|=4194308)):("function"===typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=c),i.props=n,i.state=c,i.context=o,n=s):("function"===typeof i.componentDidMount&&(t.flags|=4194308),n=!1)}else{i=t.stateNode,xi(e,t),d=wl(r,o=t.memoizedProps),i.props=d,u=t.pendingProps,p=i.context,c=r.contextType,s=Ln,"object"===typeof c&&null!==c&&(s=Fa(c)),(c="function"===typeof(l=r.getDerivedStateFromProps)||"function"===typeof i.getSnapshotBeforeUpdate)||"function"!==typeof i.UNSAFE_componentWillReceiveProps&&"function"!==typeof i.componentWillReceiveProps||(o!==u||p!==s)&&jl(t,i,n,s),mi=!1,p=t.memoizedState,i.state=p,Si(t,n,i,a),wi();var h=t.memoizedState;o!==u||p!==h||mi||null!==e&&null!==e.dependencies&&Aa(e.dependencies)?("function"===typeof l&&(bl(t,r,l,n),h=t.memoizedState),(d=mi||kl(t,r,d,n,p,h,s)||null!==e&&null!==e.dependencies&&Aa(e.dependencies))?(c||"function"!==typeof i.UNSAFE_componentWillUpdate&&"function"!==typeof i.componentWillUpdate||("function"===typeof i.componentWillUpdate&&i.componentWillUpdate(n,h,s),"function"===typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(n,h,s)),"function"===typeof i.componentDidUpdate&&(t.flags|=4),"function"===typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=h),i.props=n,i.state=h,i.context=s,n=d):("function"!==typeof i.componentDidUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!==typeof i.getSnapshotBeforeUpdate||o===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),n=!1)}return i=n,Ul(e,t),n=0!==(128&t.flags),i||n?(i=t.stateNode,r=n&&"function"!==typeof r.getDerivedStateFromError?null:i.render(),t.flags|=1,null!==e&&n?(t.child=hi(t,e.child,null,a),t.child=hi(t,null,r,a)):Pl(e,t,r,a),t.memoizedState=i.state,e=t.child):e=as(e,t,a),e}function ql(e,t,r,n){return ba(),t.flags|=256,Pl(e,t,r,n),t.child}var Yl={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Gl(e){return{baseLanes:e,cachePool:Qa()}}function Ql(e,t,r){return e=null!==e?e.childLanes&~r:0,t&&(e|=_c),e}function Jl(e,t,r){var n,a=t.pendingProps,i=!1,l=0!==(128&t.flags);if((n=l)||(n=(null===e||null!==e.memoizedState)&&0!==(2&Ii.current)),n&&(i=!0,t.flags&=-129),n=0!==(32&t.flags),t.flags&=-33,null===e){if(ua){if(i?Pi(t):Ri(),(e=da)?null!==(e=null!==(e=Cu(e,ha))&&"&"!==e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:ra,overflow:na}:null,retryLane:536870912,hydrationErrors:null},(r=Hn(e)).return=t,t.child=r,ca=t,da=null):e=null,null===e)throw ma(t);return Tu(e)?t.lanes=32:t.lanes=536870912,null}var s=a.children;return a=a.fallback,i?(Ri(),s=Zl({mode:"hidden",children:s},i=t.mode),a=Un(a,i,r,null),s.return=t,a.return=t,s.sibling=a,t.child=s,(a=t.child).memoizedState=Gl(r),a.childLanes=Ql(e,n,r),t.memoizedState=Yl,Il(null,a)):(Pi(t),Xl(t,s))}var c=e.memoizedState;if(null!==c&&null!==(s=c.dehydrated)){if(l)256&t.flags?(Pi(t),t.flags&=-257,t=es(e,t,r)):null!==t.memoizedState?(Ri(),t.child=e.child,t.flags|=128,t=null):(Ri(),s=a.fallback,i=t.mode,a=Zl({mode:"visible",children:a.children},i),(s=Un(s,i,r,null)).flags|=2,a.return=t,s.return=t,a.sibling=s,t.child=a,hi(t,e.child,null,r),(a=t.child).memoizedState=Gl(r),a.childLanes=Ql(e,n,r),t.memoizedState=Yl,t=Il(null,a));else if(Pi(t),Tu(s)){if(n=s.nextSibling&&s.nextSibling.dataset)var d=n.dgst;n=d,(a=Error(o(419))).stack="",a.digest=n,ka({value:a,source:null,stack:null}),t=es(e,t,r)}else if(Tl||Na(e,t,r,!1),n=0!==(r&e.childLanes),Tl||n){if(null!==(n=mc)&&(0!==(a=De(n,r))&&a!==c.retryLane))throw c.retryLane=a,Tn(e,a),Gc(n,e,a),Fl;Fu(s)||ld(),t=es(e,t,r)}else Fu(s)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,da=Pu(s.nextSibling),ca=t,ua=!0,pa=null,ha=!1,null!==e&&sa(t,e),(t=Xl(t,a.children)).flags|=4096);return t}return i?(Ri(),s=a.fallback,i=t.mode,d=(c=e.child).sibling,(a=Mn(c,{mode:"hidden",children:a.children})).subtreeFlags=65011712&c.subtreeFlags,null!==d?s=Mn(d,s):(s=Un(s,i,r,null)).flags|=2,s.return=t,a.return=t,a.sibling=s,t.child=a,Il(null,a),a=t.child,null===(s=e.child.memoizedState)?s=Gl(r):(null!==(i=s.cachePool)?(c=Oa._currentValue,i=i.parent!==c?{parent:c,pool:c}:i):i=Qa(),s={baseLanes:s.baseLanes|r,cachePool:i}),a.memoizedState=s,a.childLanes=Ql(e,n,r),t.memoizedState=Yl,Il(e.child,a)):(Pi(t),e=(r=e.child).sibling,(r=Mn(r,{mode:"visible",children:a.children})).return=t,r.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r)}function Xl(e,t){return(t=Zl({mode:"visible",children:t},e.mode)).return=e,e.child=t}function Zl(e,t){return(e=On(22,e,null,t)).lanes=0,e}function es(e,t,r){return hi(t,e.child,null,r),(e=Xl(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function ts(e,t,r){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),Ea(e.return,t,r)}function rs(e,t,r,n,a,i){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:a,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=r,o.tailMode=a,o.treeForkCount=i)}function ns(e,t,r){var n=t.pendingProps,a=n.revealOrder,i=n.tail;n=n.children;var o=Ii.current,l=0!==(2&o);if(l?(o=1&o|2,t.flags|=128):o&=1,B(Ii,o),Pl(e,t,n,r),n=ua?Xn:0,!l&&null!==e&&0!==(128&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&ts(e,r,t);else if(19===e.tag)ts(e,r,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(r=t.child,a=null;null!==r;)null!==(e=r.alternate)&&null===Mi(e)&&(a=r),r=r.sibling;null===(r=a)?(a=t.child,t.child=null):(a=r.sibling,r.sibling=null),rs(t,!1,a,r,i,n);break;case"backwards":case"unstable_legacy-backwards":for(r=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Mi(e)){t.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}rs(t,!0,r,null,i,n);break;case"together":rs(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function as(e,t,r){if(null!==e&&(t.dependencies=e.dependencies),$c|=t.lanes,0===(r&t.childLanes)){if(null===e)return null;if(Na(e,t,r,!1),0===(r&t.childLanes))return null}if(null!==e&&t.child!==e.child)throw Error(o(153));if(null!==t.child){for(r=Mn(e=t.child,e.pendingProps),t.child=r,r.return=t;null!==e.sibling;)e=e.sibling,(r=r.sibling=Mn(e,e.pendingProps)).return=t;r.sibling=null}return t.child}function is(e,t){return 0!==(e.lanes&t)||!(null===(e=e.dependencies)||!Aa(e))}function os(e,t,r){if(null!==e)if(e.memoizedProps!==t.pendingProps)Tl=!0;else{if(!is(e,r)&&0===(128&t.flags))return Tl=!1,function(e,t,r){switch(t.tag){case 3:Y(t,t.stateNode.containerInfo),$a(0,Oa,e.memoizedState.cache),ba();break;case 27:case 5:Q(t);break;case 4:Y(t,t.stateNode.containerInfo);break;case 10:$a(0,t.type,t.memoizedProps.value);break;case 31:if(null!==t.memoizedState)return t.flags|=128,Di(t),null;break;case 13:var n=t.memoizedState;if(null!==n)return null!==n.dehydrated?(Pi(t),t.flags|=128,null):0!==(r&t.child.childLanes)?Jl(e,t,r):(Pi(t),null!==(e=as(e,t,r))?e.sibling:null);Pi(t);break;case 19:var a=0!==(128&e.flags);if((n=0!==(r&t.childLanes))||(Na(e,t,r,!1),n=0!==(r&t.childLanes)),a){if(n)return ns(e,t,r);t.flags|=128}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),B(Ii,Ii.current),n)break;return null;case 22:return t.lanes=0,Ol(e,t,r,t.pendingProps);case 24:$a(0,Oa,e.memoizedState.cache)}return as(e,t,r)}(e,t,r);Tl=0!==(131072&e.flags)}else Tl=!1,ua&&0!==(1048576&t.flags)&&ia(t,Xn,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=ni(t.elementType),t.type=e,"function"!==typeof e){if(void 0!==e&&null!==e){var a=e.$$typeof;if(a===j){t.tag=11,t=Dl(null,t,e,n,r);break e}if(a===$){t.tag=14,t=Ll(null,t,e,n,r);break e}}throw t=F(e)||e,Error(o(306,t,""))}In(e)?(n=wl(e,n),t.tag=1,t=Wl(null,t,e,n,r)):(t.tag=0,t=Kl(null,t,e,n,r))}return t;case 0:return Kl(e,t,t.type,t.pendingProps,r);case 1:return Wl(e,t,n=t.type,a=wl(n,t.pendingProps),r);case 3:e:{if(Y(t,t.stateNode.containerInfo),null===e)throw Error(o(387));n=t.pendingProps;var i=t.memoizedState;a=i.element,xi(e,t),Si(t,n,null,r);var l=t.memoizedState;if(n=l.cache,$a(0,Oa,n),n!==i.cache&&_a(t,[Oa],r,!0),wi(),n=l.element,i.isDehydrated){if(i={element:n,isDehydrated:!1,cache:l.cache},t.updateQueue.baseState=i,t.memoizedState=i,256&t.flags){t=ql(e,t,n,r);break e}if(n!==a){ka(a=Yn(Error(o(424)),t)),t=ql(e,t,n,r);break e}if(9===(e=t.stateNode.containerInfo).nodeType)e=e.body;else e="HTML"===e.nodeName?e.ownerDocument.body:e;for(da=Pu(e.firstChild),ca=t,ua=!0,pa=null,ha=!0,r=fi(t,null,n,r),t.child=r;r;)r.flags=-3&r.flags|4096,r=r.sibling}else{if(ba(),n===a){t=as(e,t,r);break e}Pl(e,t,n,r)}t=t.child}return t;case 26:return Ul(e,t),null===e?(r=Wu(t.type,null,t.pendingProps,null))?t.memoizedState=r:ua||(r=t.type,e=t.pendingProps,(n=xu(W.current).createElement(r))[Be]=t,n[Ve]=e,hu(n,r,e),et(n),t.stateNode=n):t.memoizedState=Wu(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Q(t),null===e&&ua&&(n=t.stateNode=Ou(t.type,t.pendingProps,W.current),ca=t,ha=!0,a=da,Eu(t.type)?(Du=a,da=Pu(n.firstChild)):da=a),Pl(e,t,t.pendingProps.children,r),Ul(e,t),null===e&&(t.flags|=4194304),t.child;case 5:return null===e&&ua&&((a=n=da)&&(null!==(n=function(e,t,r,n){for(;1===e.nodeType;){var a=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&("INPUT"!==e.nodeName||"hidden"!==e.type))break}else if(n){if(!e[Ye])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if("stylesheet"===(i=e.getAttribute("rel"))&&e.hasAttribute("data-precedence"))break;if(i!==a.rel||e.getAttribute("href")!==(null==a.href||""===a.href?null:a.href)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin)||e.getAttribute("title")!==(null==a.title?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(((i=e.getAttribute("src"))!==(null==a.src?null:a.src)||e.getAttribute("type")!==(null==a.type?null:a.type)||e.getAttribute("crossorigin")!==(null==a.crossOrigin?null:a.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else{if("input"!==t||"hidden"!==e.type)return e;var i=null==a.name?null:""+a.name;if("hidden"===a.type&&e.getAttribute("name")===i)return e}if(null===(e=Pu(e.nextSibling)))break}return null}(n,t.type,t.pendingProps,ha))?(t.stateNode=n,ca=t,da=Pu(n.firstChild),ha=!1,a=!0):a=!1),a||ma(t)),Q(t),a=t.type,i=t.pendingProps,l=null!==e?e.memoizedProps:null,n=i.children,yu(a,i)?n=null:null!==l&&yu(a,l)&&(t.flags|=32),null!==t.memoizedState&&(a=eo(e,t,no,null,null,r),up._currentValue=a),Ul(e,t),Pl(e,t,n,r),t.child;case 6:return null===e&&ua&&((e=r=da)&&(null!==(r=function(e,t,r){if(""===t)return null;for(;3!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!r)return null;if(null===(e=Pu(e.nextSibling)))return null}return e}(r,t.pendingProps,ha))?(t.stateNode=r,ca=t,da=null,e=!0):e=!1),e||ma(t)),null;case 13:return Jl(e,t,r);case 4:return Y(t,t.stateNode.containerInfo),n=t.pendingProps,null===e?t.child=hi(t,null,n,r):Pl(e,t,n,r),t.child;case 11:return Dl(e,t,t.type,t.pendingProps,r);case 7:return Pl(e,t,t.pendingProps,r),t.child;case 8:case 12:return Pl(e,t,t.pendingProps.children,r),t.child;case 10:return n=t.pendingProps,$a(0,t.type,n.value),Pl(e,t,n.children,r),t.child;case 9:return a=t.type._context,n=t.pendingProps.children,Ca(t),n=n(a=Fa(a)),t.flags|=1,Pl(e,t,n,r),t.child;case 14:return Ll(e,t,t.type,t.pendingProps,r);case 15:return Rl(e,t,t.type,t.pendingProps,r);case 19:return ns(e,t,r);case 31:return function(e,t,r){var n=t.pendingProps,a=0!==(128&t.flags);if(t.flags&=-129,null===e){if(ua){if("hidden"===n.mode)return e=Bl(t,n),t.lanes=536870912,Il(null,e);if(Di(t),(e=da)?null!==(e=null!==(e=Cu(e,ha))&&"&"===e.data?e:null)&&(t.memoizedState={dehydrated:e,treeContext:null!==ta?{id:ra,overflow:na}:null,retryLane:536870912,hydrationErrors:null},(r=Hn(e)).return=t,t.child=r,ca=t,da=null):e=null,null===e)throw ma(t);return t.lanes=536870912,null}return Bl(t,n)}var i=e.memoizedState;if(null!==i){var l=i.dehydrated;if(Di(t),a)if(256&t.flags)t.flags&=-257,t=Vl(e,t,r);else{if(null===t.memoizedState)throw Error(o(558));t.child=e.child,t.flags|=128,t=null}else if(Tl||Na(e,t,r,!1),a=0!==(r&e.childLanes),Tl||a){if(null!==(n=mc)&&0!==(l=De(n,r))&&l!==i.retryLane)throw i.retryLane=l,Tn(e,l),Gc(n,e,l),Fl;ld(),t=Vl(e,t,r)}else e=i.treeContext,da=Pu(l.nextSibling),ca=t,ua=!0,pa=null,ha=!1,null!==e&&sa(t,e),(t=Bl(t,n)).flags|=4096;return t}return(e=Mn(e.child,{mode:n.mode,children:n.children})).ref=t.ref,t.child=e,e.return=t,e}(e,t,r);case 22:return Ol(e,t,r,t.pendingProps);case 24:return Ca(t),n=Fa(Oa),null===e?(null===(a=Ya())&&(a=mc,i=Ia(),a.pooledCache=i,i.refCount++,null!==i&&(a.pooledCacheLanes|=r),a=i),t.memoizedState={parent:n,cache:a},gi(t),$a(0,Oa,a)):(0!==(e.lanes&r)&&(xi(e,t),Si(t,null,null,r),wi()),a=e.memoizedState,i=t.memoizedState,a.parent!==n?(a={parent:n,cache:n},t.memoizedState=a,0===t.lanes&&(t.memoizedState=t.updateQueue.baseState=a),$a(0,Oa,n)):(n=i.cache,$a(0,Oa,n),n!==a.cache&&_a(t,[Oa],r,!0))),Pl(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function ls(e){e.flags|=4}function ss(e,t,r,n,a){if((t=0!==(32&e.mode))&&(t=!1),t){if(e.flags|=16777216,(335544128&a)===a)if(e.stateNode.complete)e.flags|=8192;else{if(!ad())throw ai=ei,Xa;e.flags|=8192}}else e.flags&=-16777217}function cs(e,t){if("stylesheet"!==t.type||0!==(4&t.state.loading))e.flags&=-16777217;else if(e.flags|=16777216,!ip(t)){if(!ad())throw ai=ei,Xa;e.flags|=8192}}function ds(e,t){null!==t&&(e.flags|=4),16384&e.flags&&(t=22!==e.tag?Ae():536870912,e.lanes|=t,Nc|=t)}function us(e,t){if(!ua)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;null!==t;)null!==t.alternate&&(r=t),t=t.sibling;null===r?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;null!==r;)null!==r.alternate&&(n=r),r=r.sibling;null===n?t||null===e.tail?e.tail=null:e.tail.sibling=null:n.sibling=null}}function ps(e){var t=null!==e.alternate&&e.alternate.child===e.child,r=0,n=0;if(t)for(var a=e.child;null!==a;)r|=a.lanes|a.childLanes,n|=65011712&a.subtreeFlags,n|=65011712&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)r|=a.lanes|a.childLanes,n|=a.subtreeFlags,n|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function hs(e,t,r){var n=t.pendingProps;switch(la(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:case 1:return ps(t),null;case 3:return r=t.stateNode,n=null,null!==e&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),za(Oa),G(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(va(t)?ls(t):null===e||e.memoizedState.isDehydrated&&0===(256&t.flags)||(t.flags|=1024,ya())),ps(t),null;case 26:var a=t.type,i=t.memoizedState;return null===e?(ls(t),null!==i?(ps(t),cs(t,i)):(ps(t),ss(t,a,0,0,r))):i?i!==e.memoizedState?(ls(t),ps(t),cs(t,i)):(ps(t),t.flags&=-16777217):((e=e.memoizedProps)!==n&&ls(t),ps(t),ss(t,a,0,0,r)),null;case 27:if(J(t),r=W.current,a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==n&&ls(t);else{if(!n){if(null===t.stateNode)throw Error(o(166));return ps(t),null}e=K.current,va(t)?ga(t):(e=Ou(a,n,r),t.stateNode=e,ls(t))}return ps(t),null;case 5:if(J(t),a=t.type,null!==e&&null!=t.stateNode)e.memoizedProps!==n&&ls(t);else{if(!n){if(null===t.stateNode)throw Error(o(166));return ps(t),null}if(i=K.current,va(t))ga(t);else{var l=xu(W.current);switch(i){case 1:i=l.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=l.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=l.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=l.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":(i=l.createElement("div")).innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i="string"===typeof n.is?l.createElement("select",{is:n.is}):l.createElement("select"),n.multiple?i.multiple=!0:n.size&&(i.size=n.size);break;default:i="string"===typeof n.is?l.createElement(a,{is:n.is}):l.createElement(a)}}i[Be]=t,i[Ve]=n;e:for(l=t.child;null!==l;){if(5===l.tag||6===l.tag)i.appendChild(l.stateNode);else if(4!==l.tag&&27!==l.tag&&null!==l.child){l.child.return=l,l=l.child;continue}if(l===t)break e;for(;null===l.sibling;){if(null===l.return||l.return===t)break e;l=l.return}l.sibling.return=l.return,l=l.sibling}t.stateNode=i;e:switch(hu(i,a,n),a){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&ls(t)}}return ps(t),ss(t,t.type,null===e||e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&null!=t.stateNode)e.memoizedProps!==n&&ls(t);else{if("string"!==typeof n&&null===t.stateNode)throw Error(o(166));if(e=W.current,va(t)){if(e=t.stateNode,r=t.memoizedProps,n=null,null!==(a=ca))switch(a.tag){case 27:case 5:n=a.memoizedProps}e[Be]=t,(e=!!(e.nodeValue===r||null!==n&&!0===n.suppressHydrationWarning||du(e.nodeValue,r)))||ma(t,!0)}else(e=xu(e).createTextNode(n))[Be]=t,t.stateNode=e}return ps(t),null;case 31:if(r=t.memoizedState,null===e||null!==e.memoizedState){if(n=va(t),null!==r){if(null===e){if(!n)throw Error(o(318));if(!(e=null!==(e=t.memoizedState)?e.dehydrated:null))throw Error(o(557));e[Be]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;ps(t),e=!1}else r=ya(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return 256&t.flags?(Oi(t),t):(Oi(t),null);if(0!==(128&t.flags))throw Error(o(558))}return ps(t),null;case 13:if(n=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(a=va(t),null!==n&&null!==n.dehydrated){if(null===e){if(!a)throw Error(o(318));if(!(a=null!==(a=t.memoizedState)?a.dehydrated:null))throw Error(o(317));a[Be]=t}else ba(),0===(128&t.flags)&&(t.memoizedState=null),t.flags|=4;ps(t),a=!1}else a=ya(),null!==e&&null!==e.memoizedState&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return 256&t.flags?(Oi(t),t):(Oi(t),null)}return Oi(t),0!==(128&t.flags)?(t.lanes=r,t):(r=null!==n,e=null!==e&&null!==e.memoizedState,r&&(a=null,null!==(n=t.child).alternate&&null!==n.alternate.memoizedState&&null!==n.alternate.memoizedState.cachePool&&(a=n.alternate.memoizedState.cachePool.pool),i=null,null!==n.memoizedState&&null!==n.memoizedState.cachePool&&(i=n.memoizedState.cachePool.pool),i!==a&&(n.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),ds(t,t.updateQueue),ps(t),null);case 4:return G(),null===e&&eu(t.stateNode.containerInfo),ps(t),null;case 10:return za(t.type),ps(t),null;case 19:if(M(Ii),null===(n=t.memoizedState))return ps(t),null;if(a=0!==(128&t.flags),null===(i=n.rendering))if(a)us(n,!1);else{if(0!==Sc||null!==e&&0!==(128&e.flags))for(e=t.child;null!==e;){if(null!==(i=Mi(e))){for(t.flags|=128,us(n,!1),e=i.updateQueue,t.updateQueue=e,ds(t,e),t.subtreeFlags=0,e=r,r=t.child;null!==r;)Bn(r,e),r=r.sibling;return B(Ii,1&Ii.current|2),ua&&aa(t,n.treeForkCount),t.child}e=e.sibling}null!==n.tail&&se()>Dc&&(t.flags|=128,a=!0,us(n,!1),t.lanes=4194304)}else{if(!a)if(null!==(e=Mi(i))){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ds(t,e),us(n,!0),null===n.tail&&"hidden"===n.tailMode&&!i.alternate&&!ua)return ps(t),null}else 2*se()-n.renderingStartTime>Dc&&536870912!==r&&(t.flags|=128,a=!0,us(n,!1),t.lanes=4194304);n.isBackwards?(i.sibling=t.child,t.child=i):(null!==(e=n.last)?e.sibling=i:t.child=i,n.last=i)}return null!==n.tail?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=se(),e.sibling=null,r=Ii.current,B(Ii,a?1&r|2:1&r),ua&&aa(t,n.treeForkCount),e):(ps(t),null);case 22:case 23:return Oi(t),Ci(),n=null!==t.memoizedState,null!==e?null!==e.memoizedState!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?0!==(536870912&r)&&0===(128&t.flags)&&(ps(t),6&t.subtreeFlags&&(t.flags|=8192)):ps(t),null!==(r=t.updateQueue)&&ds(t,r.retryQueue),r=null,null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(r=e.memoizedState.cachePool.pool),n=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(n=t.memoizedState.cachePool.pool),n!==r&&(t.flags|=2048),null!==e&&M(qa),null;case 24:return r=null,null!==e&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),za(Oa),ps(t),null;case 25:case 30:return null}throw Error(o(156,t.tag))}function fs(e,t){switch(la(t),t.tag){case 1:return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return za(Oa),G(),0!==(65536&(e=t.flags))&&0===(128&e)?(t.flags=-65537&e|128,t):null;case 26:case 27:case 5:return J(t),null;case 31:if(null!==t.memoizedState){if(Oi(t),null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 13:if(Oi(t),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(o(340));ba()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return M(Ii),null;case 4:return G(),null;case 10:return za(t.type),null;case 22:case 23:return Oi(t),Ci(),null!==e&&M(qa),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 24:return za(Oa),null;default:return null}}function ms(e,t){switch(la(t),t.tag){case 3:za(Oa),G();break;case 26:case 27:case 5:J(t);break;case 4:G();break;case 31:null!==t.memoizedState&&Oi(t);break;case 13:Oi(t);break;case 19:M(Ii);break;case 10:za(t.type);break;case 22:case 23:Oi(t),Ci(),null!==e&&M(qa);break;case 24:za(Oa)}}function gs(e,t){try{var r=t.updateQueue,n=null!==r?r.lastEffect:null;if(null!==n){var a=n.next;r=a;do{if((r.tag&e)===e){n=void 0;var i=r.create,o=r.inst;n=i(),o.destroy=n}r=r.next}while(r!==a)}}catch(l){Sd(t,t.return,l)}}function xs(e,t,r){try{var n=t.updateQueue,a=null!==n?n.lastEffect:null;if(null!==a){var i=a.next;n=i;do{if((n.tag&e)===e){var o=n.inst,l=o.destroy;if(void 0!==l){o.destroy=void 0,a=t;var s=r,c=l;try{c()}catch(d){Sd(a,s,d)}}}n=n.next}while(n!==i)}}catch(d){Sd(t,t.return,d)}}function vs(e){var t=e.updateQueue;if(null!==t){var r=e.stateNode;try{zi(t,r)}catch(n){Sd(e,e.return,n)}}}function bs(e,t,r){r.props=wl(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(n){Sd(e,t,n)}}function ys(e,t){try{var r=e.ref;if(null!==r){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;default:n=e.stateNode}"function"===typeof r?e.refCleanup=r(n):r.current=n}}catch(a){Sd(e,t,a)}}function ks(e,t){var r=e.ref,n=e.refCleanup;if(null!==r)if("function"===typeof n)try{n()}catch(a){Sd(e,t,a)}finally{e.refCleanup=null,null!=(e=e.alternate)&&(e.refCleanup=null)}else if("function"===typeof r)try{r(null)}catch(i){Sd(e,t,i)}else r.current=null}function js(e){var t=e.type,r=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&n.focus();break e;case"img":r.src?n.src=r.src:r.srcSet&&(n.srcset=r.srcSet)}}catch(a){Sd(e,e.return,a)}}function ws(e,t,r){try{var n=e.stateNode;!function(e,t,r,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,l=null,s=null,c=null,d=null,u=null;for(f in r){var p=r[f];if(r.hasOwnProperty(f)&&null!=p)switch(f){case"checked":case"value":break;case"defaultValue":c=p;default:n.hasOwnProperty(f)||uu(e,t,f,null,n,p)}}for(var h in n){var f=n[h];if(p=r[h],n.hasOwnProperty(h)&&(null!=f||null!=p))switch(h){case"type":i=f;break;case"name":a=f;break;case"checked":d=f;break;case"defaultChecked":u=f;break;case"value":l=f;break;case"defaultValue":s=f;break;case"children":case"dangerouslySetInnerHTML":if(null!=f)throw Error(o(137,t));break;default:f!==p&&uu(e,t,h,f,n,p)}}return void vt(e,l,s,c,d,u,i,a);case"select":for(i in f=l=s=h=null,r)if(c=r[i],r.hasOwnProperty(i)&&null!=c)switch(i){case"value":break;case"multiple":f=c;default:n.hasOwnProperty(i)||uu(e,t,i,null,n,c)}for(a in n)if(i=n[a],c=r[a],n.hasOwnProperty(a)&&(null!=i||null!=c))switch(a){case"value":h=i;break;case"defaultValue":s=i;break;case"multiple":l=i;default:i!==c&&uu(e,t,a,i,n,c)}return t=s,r=l,n=f,void(null!=h?kt(e,!!r,h,!1):!!n!==!!r&&(null!=t?kt(e,!!r,t,!0):kt(e,!!r,r?[]:"",!1)));case"textarea":for(s in f=h=null,r)if(a=r[s],r.hasOwnProperty(s)&&null!=a&&!n.hasOwnProperty(s))switch(s){case"value":case"children":break;default:uu(e,t,s,null,n,a)}for(l in n)if(a=n[l],i=r[l],n.hasOwnProperty(l)&&(null!=a||null!=i))switch(l){case"value":h=a;break;case"defaultValue":f=a;break;case"children":break;case"dangerouslySetInnerHTML":if(null!=a)throw Error(o(91));break;default:a!==i&&uu(e,t,l,a,n,i)}return void jt(e,h,f);case"option":for(var m in r)if(h=r[m],r.hasOwnProperty(m)&&null!=h&&!n.hasOwnProperty(m))if("selected"===m)e.selected=!1;else uu(e,t,m,null,n,h);for(c in n)if(h=n[c],f=r[c],n.hasOwnProperty(c)&&h!==f&&(null!=h||null!=f))if("selected"===c)e.selected=h&&"function"!==typeof h&&"symbol"!==typeof h;else uu(e,t,c,h,n,f);return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in r)h=r[g],r.hasOwnProperty(g)&&null!=h&&!n.hasOwnProperty(g)&&uu(e,t,g,null,n,h);for(d in n)if(h=n[d],f=r[d],n.hasOwnProperty(d)&&h!==f&&(null!=h||null!=f))switch(d){case"children":case"dangerouslySetInnerHTML":if(null!=h)throw Error(o(137,t));break;default:uu(e,t,d,h,n,f)}return;default:if(_t(t)){for(var x in r)h=r[x],r.hasOwnProperty(x)&&void 0!==h&&!n.hasOwnProperty(x)&&pu(e,t,x,void 0,n,h);for(u in n)h=n[u],f=r[u],!n.hasOwnProperty(u)||h===f||void 0===h&&void 0===f||pu(e,t,u,h,n,f);return}}for(var v in r)h=r[v],r.hasOwnProperty(v)&&null!=h&&!n.hasOwnProperty(v)&&uu(e,t,v,null,n,h);for(p in n)h=n[p],f=r[p],!n.hasOwnProperty(p)||h===f||null==h&&null==f||uu(e,t,p,h,n,f)}(n,e.type,r,t),n[Ve]=t}catch(a){Sd(e,e.return,a)}}function Ss(e){return 5===e.tag||3===e.tag||26===e.tag||27===e.tag&&Eu(e.type)||4===e.tag}function $s(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||Ss(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(27===e.tag&&Eu(e.type))continue e;if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function zs(e,t,r){var n=e.tag;if(5===n||6===n)e=e.stateNode,t?(9===r.nodeType?r.body:"HTML"===r.nodeName?r.ownerDocument.body:r).insertBefore(e,t):((t=9===r.nodeType?r.body:"HTML"===r.nodeName?r.ownerDocument.body:r).appendChild(e),null!==(r=r._reactRootContainer)&&void 0!==r||null!==t.onclick||(t.onclick=Ft));else if(4!==n&&(27===n&&Eu(e.type)&&(r=e.stateNode,t=null),null!==(e=e.child)))for(zs(e,t,r),e=e.sibling;null!==e;)zs(e,t,r),e=e.sibling}function Es(e,t,r){var n=e.tag;if(5===n||6===n)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(4!==n&&(27===n&&Eu(e.type)&&(r=e.stateNode),null!==(e=e.child)))for(Es(e,t,r),e=e.sibling;null!==e;)Es(e,t,r),e=e.sibling}function _s(e){var t=e.stateNode,r=e.memoizedProps;try{for(var n=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);hu(t,n,r),t[Be]=e,t[Ve]=r}catch(i){Sd(e,e.return,i)}}var Ns=!1,As=!1,Cs=!1,Fs="function"===typeof WeakSet?WeakSet:Set,Ts=null;function Ps(e,t,r){var n=r.flags;switch(r.tag){case 0:case 11:case 15:Gs(e,r),4&n&&gs(5,r);break;case 1:if(Gs(e,r),4&n)if(e=r.stateNode,null===t)try{e.componentDidMount()}catch(o){Sd(r,r.return,o)}else{var a=wl(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(l){Sd(r,r.return,l)}}64&n&&vs(r),512&n&&ys(r,r.return);break;case 3:if(Gs(e,r),64&n&&null!==(e=r.updateQueue)){if(t=null,null!==r.child)switch(r.child.tag){case 27:case 5:case 1:t=r.child.stateNode}try{zi(e,t)}catch(o){Sd(r,r.return,o)}}break;case 27:null===t&&4&n&&_s(r);case 26:case 5:Gs(e,r),null===t&&4&n&&js(r),512&n&&ys(r,r.return);break;case 12:Gs(e,r);break;case 31:Gs(e,r),4&n&&Ms(e,r);break;case 13:Gs(e,r),4&n&&Bs(e,r),64&n&&(null!==(e=r.memoizedState)&&(null!==(e=e.dehydrated)&&function(e,t){var r=e.ownerDocument;if("$~"===e.data)e._reactRetry=t;else if("$?"!==e.data||"loading"!==r.readyState)t();else{var n=function(){t(),r.removeEventListener("DOMContentLoaded",n)};r.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}(e,r=_d.bind(null,r))));break;case 22:if(!(n=null!==r.memoizedState||Ns)){t=null!==t&&null!==t.memoizedState||As,a=Ns;var i=As;Ns=n,(As=t)&&!i?Js(e,r,0!==(8772&r.subtreeFlags)):Gs(e,r),Ns=a,As=i}break;case 30:break;default:Gs(e,r)}}function Ds(e){var t=e.alternate;null!==t&&(e.alternate=null,Ds(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&Ge(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ls=null,Rs=!1;function Os(e,t,r){for(r=r.child;null!==r;)Is(e,t,r),r=r.sibling}function Is(e,t,r){if(ve&&"function"===typeof ve.onCommitFiberUnmount)try{ve.onCommitFiberUnmount(xe,r)}catch(i){}switch(r.tag){case 26:As||ks(r,t),Os(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode).parentNode.removeChild(r);break;case 27:As||ks(r,t);var n=Ls,a=Rs;Eu(r.type)&&(Ls=r.stateNode,Rs=!1),Os(e,t,r),Iu(r.stateNode),Ls=n,Rs=a;break;case 5:As||ks(r,t);case 6:if(n=Ls,a=Rs,Ls=null,Os(e,t,r),Rs=a,null!==(Ls=n))if(Rs)try{(9===Ls.nodeType?Ls.body:"HTML"===Ls.nodeName?Ls.ownerDocument.body:Ls).removeChild(r.stateNode)}catch(o){Sd(r,t,o)}else try{Ls.removeChild(r.stateNode)}catch(o){Sd(r,t,o)}break;case 18:null!==Ls&&(Rs?(_u(9===(e=Ls).nodeType?e.body:"HTML"===e.nodeName?e.ownerDocument.body:e,r.stateNode),Hp(e)):_u(Ls,r.stateNode));break;case 4:n=Ls,a=Rs,Ls=r.stateNode.containerInfo,Rs=!0,Os(e,t,r),Ls=n,Rs=a;break;case 0:case 11:case 14:case 15:xs(2,r,t),As||xs(4,r,t),Os(e,t,r);break;case 1:As||(ks(r,t),"function"===typeof(n=r.stateNode).componentWillUnmount&&bs(r,t,n)),Os(e,t,r);break;case 21:Os(e,t,r);break;case 22:As=(n=As)||null!==r.memoizedState,Os(e,t,r),As=n;break;default:Os(e,t,r)}}function Ms(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&null!==(e=e.memoizedState))){e=e.dehydrated;try{Hp(e)}catch(r){Sd(t,t.return,r)}}}function Bs(e,t){if(null===t.memoizedState&&(null!==(e=t.alternate)&&(null!==(e=e.memoizedState)&&null!==(e=e.dehydrated))))try{Hp(e)}catch(r){Sd(t,t.return,r)}}function Vs(e,t){var r=function(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return null===t&&(t=e.stateNode=new Fs),t;case 22:return null===(t=(e=e.stateNode)._retryCache)&&(t=e._retryCache=new Fs),t;default:throw Error(o(435,e.tag))}}(e);t.forEach(function(t){if(!r.has(t)){r.add(t);var n=Nd.bind(null,e,t);t.then(n,n)}})}function Us(e,t){var r=t.deletions;if(null!==r)for(var n=0;n<r.length;n++){var a=r[n],i=e,l=t,s=l;e:for(;null!==s;){switch(s.tag){case 27:if(Eu(s.type)){Ls=s.stateNode,Rs=!1;break e}break;case 5:Ls=s.stateNode,Rs=!1;break e;case 3:case 4:Ls=s.stateNode.containerInfo,Rs=!0;break e}s=s.return}if(null===Ls)throw Error(o(160));Is(i,l,a),Ls=null,Rs=!1,null!==(i=a.alternate)&&(i.return=null),a.return=null}if(13886&t.subtreeFlags)for(t=t.child;null!==t;)Hs(t,e),t=t.sibling}var Ks=null;function Hs(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Us(t,e),Ws(e),4&n&&(xs(3,e,e.return),gs(3,e),xs(5,e,e.return));break;case 1:Us(t,e),Ws(e),512&n&&(As||null===r||ks(r,r.return)),64&n&&Ns&&(null!==(e=e.updateQueue)&&(null!==(n=e.callbacks)&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=null===r?n:r.concat(n))));break;case 26:var a=Ks;if(Us(t,e),Ws(e),512&n&&(As||null===r||ks(r,r.return)),4&n){var i=null!==r?r.memoizedState:null;if(n=e.memoizedState,null===r)if(null===n)if(null===e.stateNode){e:{n=e.type,r=e.memoizedProps,a=a.ownerDocument||a;t:switch(n){case"title":(!(i=a.getElementsByTagName("title")[0])||i[Ye]||i[Be]||"http://www.w3.org/2000/svg"===i.namespaceURI||i.hasAttribute("itemprop"))&&(i=a.createElement(n),a.head.insertBefore(i,a.querySelector("head > title"))),hu(i,n,r),i[Be]=e,et(i),n=i;break e;case"link":var l=np("link","href",a).get(n+(r.href||""));if(l)for(var s=0;s<l.length;s++)if((i=l[s]).getAttribute("href")===(null==r.href||""===r.href?null:r.href)&&i.getAttribute("rel")===(null==r.rel?null:r.rel)&&i.getAttribute("title")===(null==r.title?null:r.title)&&i.getAttribute("crossorigin")===(null==r.crossOrigin?null:r.crossOrigin)){l.splice(s,1);break t}hu(i=a.createElement(n),n,r),a.head.appendChild(i);break;case"meta":if(l=np("meta","content",a).get(n+(r.content||"")))for(s=0;s<l.length;s++)if((i=l[s]).getAttribute("content")===(null==r.content?null:""+r.content)&&i.getAttribute("name")===(null==r.name?null:r.name)&&i.getAttribute("property")===(null==r.property?null:r.property)&&i.getAttribute("http-equiv")===(null==r.httpEquiv?null:r.httpEquiv)&&i.getAttribute("charset")===(null==r.charSet?null:r.charSet)){l.splice(s,1);break t}hu(i=a.createElement(n),n,r),a.head.appendChild(i);break;default:throw Error(o(468,n))}i[Be]=e,et(i),n=i}e.stateNode=n}else ap(a,e.type,e.stateNode);else e.stateNode=Xu(a,n,e.memoizedProps);else i!==n?(null===i?null!==r.stateNode&&(r=r.stateNode).parentNode.removeChild(r):i.count--,null===n?ap(a,e.type,e.stateNode):Xu(a,n,e.memoizedProps)):null===n&&null!==e.stateNode&&ws(e,e.memoizedProps,r.memoizedProps)}break;case 27:Us(t,e),Ws(e),512&n&&(As||null===r||ks(r,r.return)),null!==r&&4&n&&ws(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Us(t,e),Ws(e),512&n&&(As||null===r||ks(r,r.return)),32&e.flags){a=e.stateNode;try{St(a,"")}catch(m){Sd(e,e.return,m)}}4&n&&null!=e.stateNode&&ws(e,a=e.memoizedProps,null!==r?r.memoizedProps:a),1024&n&&(Cs=!0);break;case 6:if(Us(t,e),Ws(e),4&n){if(null===e.stateNode)throw Error(o(162));n=e.memoizedProps,r=e.stateNode;try{r.nodeValue=n}catch(m){Sd(e,e.return,m)}}break;case 3:if(rp=null,a=Ks,Ks=Vu(t.containerInfo),Us(t,e),Ks=a,Ws(e),4&n&&null!==r&&r.memoizedState.isDehydrated)try{Hp(t.containerInfo)}catch(m){Sd(e,e.return,m)}Cs&&(Cs=!1,Ys(e));break;case 4:n=Ks,Ks=Vu(e.stateNode.containerInfo),Us(t,e),Ws(e),Ks=n;break;case 12:default:Us(t,e),Ws(e);break;case 31:case 19:Us(t,e),Ws(e),4&n&&(null!==(n=e.updateQueue)&&(e.updateQueue=null,Vs(e,n)));break;case 13:Us(t,e),Ws(e),8192&e.child.flags&&null!==e.memoizedState!==(null!==r&&null!==r.memoizedState)&&(Tc=se()),4&n&&(null!==(n=e.updateQueue)&&(e.updateQueue=null,Vs(e,n)));break;case 22:a=null!==e.memoizedState;var c=null!==r&&null!==r.memoizedState,d=Ns,u=As;if(Ns=d||a,As=u||c,Us(t,e),As=u,Ns=d,Ws(e),8192&n)e:for(t=e.stateNode,t._visibility=a?-2&t._visibility:1|t._visibility,a&&(null===r||c||Ns||As||Qs(e)),r=null,t=e;;){if(5===t.tag||26===t.tag){if(null===r){c=r=t;try{if(i=c.stateNode,a)"function"===typeof(l=i.style).setProperty?l.setProperty("display","none","important"):l.display="none";else{s=c.stateNode;var p=c.memoizedProps.style,h=void 0!==p&&null!==p&&p.hasOwnProperty("display")?p.display:null;s.style.display=null==h||"boolean"===typeof h?"":(""+h).trim()}}catch(m){Sd(c,c.return,m)}}}else if(6===t.tag){if(null===r){c=t;try{c.stateNode.nodeValue=a?"":c.memoizedProps}catch(m){Sd(c,c.return,m)}}}else if(18===t.tag){if(null===r){c=t;try{var f=c.stateNode;a?Nu(f,!0):Nu(c.stateNode,!1)}catch(m){Sd(c,c.return,m)}}}else if((22!==t.tag&&23!==t.tag||null===t.memoizedState||t===e)&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;null===t.sibling;){if(null===t.return||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}4&n&&(null!==(n=e.updateQueue)&&(null!==(r=n.retryQueue)&&(n.retryQueue=null,Vs(e,r))));case 30:case 21:}}function Ws(e){var t=e.flags;if(2&t){try{for(var r,n=e.return;null!==n;){if(Ss(n)){r=n;break}n=n.return}if(null==r)throw Error(o(160));switch(r.tag){case 27:var a=r.stateNode;Es(e,$s(e),a);break;case 5:var i=r.stateNode;32&r.flags&&(St(i,""),r.flags&=-33),Es(e,$s(e),i);break;case 3:case 4:var l=r.stateNode.containerInfo;zs(e,$s(e),l);break;default:throw Error(o(161))}}catch(s){Sd(e,e.return,s)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function Ys(e){if(1024&e.subtreeFlags)for(e=e.child;null!==e;){var t=e;Ys(t),5===t.tag&&1024&t.flags&&t.stateNode.reset(),e=e.sibling}}function Gs(e,t){if(8772&t.subtreeFlags)for(t=t.child;null!==t;)Ps(e,t.alternate,t),t=t.sibling}function Qs(e){for(e=e.child;null!==e;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:xs(4,t,t.return),Qs(t);break;case 1:ks(t,t.return);var r=t.stateNode;"function"===typeof r.componentWillUnmount&&bs(t,t.return,r),Qs(t);break;case 27:Iu(t.stateNode);case 26:case 5:ks(t,t.return),Qs(t);break;case 22:null===t.memoizedState&&Qs(t);break;default:Qs(t)}e=e.sibling}}function Js(e,t,r){for(r=r&&0!==(8772&t.subtreeFlags),t=t.child;null!==t;){var n=t.alternate,a=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:Js(a,i,r),gs(4,i);break;case 1:if(Js(a,i,r),"function"===typeof(a=(n=i).stateNode).componentDidMount)try{a.componentDidMount()}catch(c){Sd(n,n.return,c)}if(null!==(a=(n=i).updateQueue)){var l=n.stateNode;try{var s=a.shared.hiddenCallbacks;if(null!==s)for(a.shared.hiddenCallbacks=null,a=0;a<s.length;a++)$i(s[a],l)}catch(c){Sd(n,n.return,c)}}r&&64&o&&vs(i),ys(i,i.return);break;case 27:_s(i);case 26:case 5:Js(a,i,r),r&&null===n&&4&o&&js(i),ys(i,i.return);break;case 12:Js(a,i,r);break;case 31:Js(a,i,r),r&&4&o&&Ms(a,i);break;case 13:Js(a,i,r),r&&4&o&&Bs(a,i);break;case 22:null===i.memoizedState&&Js(a,i,r),ys(i,i.return);break;case 30:break;default:Js(a,i,r)}t=t.sibling}}function Xs(e,t){var r=null;null!==e&&null!==e.memoizedState&&null!==e.memoizedState.cachePool&&(r=e.memoizedState.cachePool.pool),e=null,null!==t.memoizedState&&null!==t.memoizedState.cachePool&&(e=t.memoizedState.cachePool.pool),e!==r&&(null!=e&&e.refCount++,null!=r&&Ma(r))}function Zs(e,t){e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ma(e))}function ec(e,t,r,n){if(10256&t.subtreeFlags)for(t=t.child;null!==t;)tc(e,t,r,n),t=t.sibling}function tc(e,t,r,n){var a=t.flags;switch(t.tag){case 0:case 11:case 15:ec(e,t,r,n),2048&a&&gs(9,t);break;case 1:case 31:case 13:default:ec(e,t,r,n);break;case 3:ec(e,t,r,n),2048&a&&(e=null,null!==t.alternate&&(e=t.alternate.memoizedState.cache),(t=t.memoizedState.cache)!==e&&(t.refCount++,null!=e&&Ma(e)));break;case 12:if(2048&a){ec(e,t,r,n),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,l=i.onPostCommit;"function"===typeof l&&l(o,null===t.alternate?"mount":"update",e.passiveEffectDuration,-0)}catch(s){Sd(t,t.return,s)}}else ec(e,t,r,n);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,null!==t.memoizedState?2&i._visibility?ec(e,t,r,n):nc(e,t):2&i._visibility?ec(e,t,r,n):(i._visibility|=2,rc(e,t,r,n,0!==(10256&t.subtreeFlags)||!1)),2048&a&&Xs(o,t);break;case 24:ec(e,t,r,n),2048&a&&Zs(t.alternate,t)}}function rc(e,t,r,n,a){for(a=a&&(0!==(10256&t.subtreeFlags)||!1),t=t.child;null!==t;){var i=e,o=t,l=r,s=n,c=o.flags;switch(o.tag){case 0:case 11:case 15:rc(i,o,l,s,a),gs(8,o);break;case 23:break;case 22:var d=o.stateNode;null!==o.memoizedState?2&d._visibility?rc(i,o,l,s,a):nc(i,o):(d._visibility|=2,rc(i,o,l,s,a)),a&&2048&c&&Xs(o.alternate,o);break;case 24:rc(i,o,l,s,a),a&&2048&c&&Zs(o.alternate,o);break;default:rc(i,o,l,s,a)}t=t.sibling}}function nc(e,t){if(10256&t.subtreeFlags)for(t=t.child;null!==t;){var r=e,n=t,a=n.flags;switch(n.tag){case 22:nc(r,n),2048&a&&Xs(n.alternate,n);break;case 24:nc(r,n),2048&a&&Zs(n.alternate,n);break;default:nc(r,n)}t=t.sibling}}var ac=8192;function ic(e,t,r){if(e.subtreeFlags&ac)for(e=e.child;null!==e;)oc(e,t,r),e=e.sibling}function oc(e,t,r){switch(e.tag){case 26:ic(e,t,r),e.flags&ac&&null!==e.memoizedState&&function(e,t,r,n){if("stylesheet"===r.type&&("string"!==typeof n.media||!1!==matchMedia(n.media).matches)&&0===(4&r.state.loading)){if(null===r.instance){var a=qu(n.href),i=t.querySelector(Yu(a));if(i)return null!==(t=i._p)&&"object"===typeof t&&"function"===typeof t.then&&(e.count++,e=lp.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=i,void et(i);i=t.ownerDocument||t,n=Gu(n),(a=Mu.get(a))&&ep(n,a),et(i=i.createElement("link"));var o=i;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),hu(i,"link",n),r.instance=i}null===e.stylesheets&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&0===(3&r.state.loading)&&(e.count++,r=lp.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}(r,Ks,e.memoizedState,e.memoizedProps);break;case 5:default:ic(e,t,r);break;case 3:case 4:var n=Ks;Ks=Vu(e.stateNode.containerInfo),ic(e,t,r),Ks=n;break;case 22:null===e.memoizedState&&(null!==(n=e.alternate)&&null!==n.memoizedState?(n=ac,ac=16777216,ic(e,t,r),ac=n):ic(e,t,r))}}function lc(e){var t=e.alternate;if(null!==t&&null!==(e=t.child)){t.child=null;do{t=e.sibling,e.sibling=null,e=t}while(null!==e)}}function sc(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var r=0;r<t.length;r++){var n=t[r];Ts=n,uc(n,e)}lc(e)}if(10256&e.subtreeFlags)for(e=e.child;null!==e;)cc(e),e=e.sibling}function cc(e){switch(e.tag){case 0:case 11:case 15:sc(e),2048&e.flags&&xs(9,e,e.return);break;case 3:case 12:default:sc(e);break;case 22:var t=e.stateNode;null!==e.memoizedState&&2&t._visibility&&(null===e.return||13!==e.return.tag)?(t._visibility&=-3,dc(e)):sc(e)}}function dc(e){var t=e.deletions;if(0!==(16&e.flags)){if(null!==t)for(var r=0;r<t.length;r++){var n=t[r];Ts=n,uc(n,e)}lc(e)}for(e=e.child;null!==e;){switch((t=e).tag){case 0:case 11:case 15:xs(8,t,t.return),dc(t);break;case 22:2&(r=t.stateNode)._visibility&&(r._visibility&=-3,dc(t));break;default:dc(t)}e=e.sibling}}function uc(e,t){for(;null!==Ts;){var r=Ts;switch(r.tag){case 0:case 11:case 15:xs(8,r,t);break;case 23:case 22:if(null!==r.memoizedState&&null!==r.memoizedState.cachePool){var n=r.memoizedState.cachePool.pool;null!=n&&n.refCount++}break;case 24:Ma(r.memoizedState.cache)}if(null!==(n=r.child))n.return=r,Ts=n;else e:for(r=e;null!==Ts;){var a=(n=Ts).sibling,i=n.return;if(Ds(n),n===r){Ts=null;break e}if(null!==a){a.return=i,Ts=a;break e}Ts=i}}}var pc={getCacheForType:function(e){var t=Fa(Oa),r=t.data.get(e);return void 0===r&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return Fa(Oa).controller.signal}},hc="function"===typeof WeakMap?WeakMap:Map,fc=0,mc=null,gc=null,xc=0,vc=0,bc=null,yc=!1,kc=!1,jc=!1,wc=0,Sc=0,$c=0,zc=0,Ec=0,_c=0,Nc=0,Ac=null,Cc=null,Fc=!1,Tc=0,Pc=0,Dc=1/0,Lc=null,Rc=null,Oc=0,Ic=null,Mc=null,Bc=0,Vc=0,Uc=null,Kc=null,Hc=0,Wc=null;function qc(){return 0!==(2&fc)&&0!==xc?xc&-xc:null!==P.T?Ud():Oe()}function Yc(){if(0===_c)if(0===(536870912&xc)||ua){var e=Se;0===(3932160&(Se<<=1))&&(Se=262144),_c=e}else _c=536870912;return null!==(e=Fi.current)&&(e.flags|=32),_c}function Gc(e,t,r){(e!==mc||2!==vc&&9!==vc)&&null===e.cancelPendingCommit||(rd(e,0),Zc(e,xc,_c,!1)),Fe(e,r),0!==(2&fc)&&e===mc||(e===mc&&(0===(2&fc)&&(zc|=r),4===Sc&&Zc(e,xc,_c,!1)),Ld(e))}function Qc(e,t,r){if(0!==(6&fc))throw Error(o(327));for(var n=!r&&0===(127&t)&&0===(t&e.expiredLanes)||_e(e,t),a=n?function(e,t){var r=fc;fc|=2;var n=id(),a=od();mc!==e||xc!==t?(Lc=null,Dc=se()+500,rd(e,t)):kc=_e(e,t);e:for(;;)try{if(0!==vc&&null!==gc){t=gc;var i=bc;t:switch(vc){case 1:vc=0,bc=null,hd(e,t,i,1);break;case 2:case 9:if(ti(i)){vc=0,bc=null,pd(t);break}t=function(){2!==vc&&9!==vc||mc!==e||(vc=7),Ld(e)},i.then(t,t);break e;case 3:vc=7;break e;case 4:vc=5;break e;case 7:ti(i)?(vc=0,bc=null,pd(t)):(vc=0,bc=null,hd(e,t,i,7));break;case 5:var l=null;switch(gc.tag){case 26:l=gc.memoizedState;case 5:case 27:var s=gc;if(l?ip(l):s.stateNode.complete){vc=0,bc=null;var c=s.sibling;if(null!==c)gc=c;else{var d=s.return;null!==d?(gc=d,fd(d)):gc=null}break t}}vc=0,bc=null,hd(e,t,i,5);break;case 6:vc=0,bc=null,hd(e,t,i,6);break;case 8:td(),Sc=6;break e;default:throw Error(o(462))}}dd();break}catch(u){nd(e,u)}return Sa=wa=null,P.H=n,P.A=a,fc=r,null!==gc?0:(mc=null,xc=0,An(),Sc)}(e,t):sd(e,t,!0),i=n;;){if(0===a){kc&&!n&&Zc(e,t,0,!1);break}if(r=e.current.alternate,!i||Xc(r)){if(2===a){if(i=t,e.errorRecoveryDisabledLanes&i)var l=0;else l=0!==(l=-536870913&e.pendingLanes)?l:536870912&l?536870912:0;if(0!==l){t=l;e:{var s=e;a=Ac;var c=s.current.memoizedState.isDehydrated;if(c&&(rd(s,l).flags|=256),2!==(l=sd(s,l,!1))){if(jc&&!c){s.errorRecoveryDisabledLanes|=i,zc|=i,a=4;break e}i=Cc,Cc=a,null!==i&&(null===Cc?Cc=i:Cc.push.apply(Cc,i))}a=l}if(i=!1,2!==a)continue}}if(1===a){rd(e,0),Zc(e,t,0,!0);break}e:{switch(n=e,i=a){case 0:case 1:throw Error(o(345));case 4:if((4194048&t)!==t)break;case 6:Zc(n,t,_c,!yc);break e;case 2:Cc=null;break;case 3:case 5:break;default:throw Error(o(329))}if((62914560&t)===t&&10<(a=Tc+300-se())){if(Zc(n,t,_c,!yc),0!==Ee(n,0,!0))break e;Bc=t,n.timeoutHandle=ju(Jc.bind(null,n,r,Cc,Lc,Fc,t,_c,zc,Nc,yc,i,"Throttled",-0,0),a)}else Jc(n,r,Cc,Lc,Fc,t,_c,zc,Nc,yc,i,null,-0,0)}break}a=sd(e,t,!1),i=!1}Ld(e)}function Jc(e,t,r,n,a,i,o,l,s,c,d,u,p,h){if(e.timeoutHandle=-1,8192&(u=t.subtreeFlags)||16785408===(16785408&u)){oc(t,i,u={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ft});var f=(62914560&i)===i?Tc-se():(4194048&i)===i?Pc-se():0;if(null!==(f=function(e,t){return e.stylesheets&&0===e.count&&cp(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var n=setTimeout(function(){if(e.stylesheets&&cp(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&0===op&&(op=62500*function(){if("function"===typeof performance.getEntriesByType){for(var e=0,t=0,r=performance.getEntriesByType("resource"),n=0;n<r.length;n++){var a=r[n],i=a.transferSize,o=a.initiatorType,l=a.duration;if(i&&l&&fu(o)){for(o=0,l=a.responseEnd,n+=1;n<r.length;n++){var s=r[n],c=s.startTime;if(c>l)break;var d=s.transferSize,u=s.initiatorType;d&&fu(u)&&(o+=d*((s=s.responseEnd)<l?1:(l-c)/(s-c)))}if(--n,t+=8*(i+o)/(a.duration/1e3),10<++e)break}}if(0<e)return t/e/1e6}return navigator.connection&&"number"===typeof(e=navigator.connection.downlink)?e:5}());var a=setTimeout(function(){if(e.waitingForImages=!1,0===e.count&&(e.stylesheets&&cp(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>op?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(a)}}:null}(u,f)))return Bc=i,e.cancelPendingCommit=f(gd.bind(null,e,t,i,r,n,a,o,l,s,d,u,null,p,h)),void Zc(e,i,o,!c)}gd(e,t,i,r,n,a,o,l,s)}function Xc(e){for(var t=e;;){var r=t.tag;if((0===r||11===r||15===r)&&16384&t.flags&&(null!==(r=t.updateQueue)&&null!==(r=r.stores)))for(var n=0;n<r.length;n++){var a=r[n],i=a.getSnapshot;a=a.value;try{if(!Jr(i(),a))return!1}catch(o){return!1}}if(r=t.child,16384&t.subtreeFlags&&null!==r)r.return=t,t=r;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zc(e,t,r,n){t&=~Ec,t&=~zc,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var a=t;0<a;){var i=31-ye(a),o=1<<i;n[i]=-1,a&=~o}0!==r&&Te(e,r,t)}function ed(){return 0!==(6&fc)||(Rd(0,!1),!1)}function td(){if(null!==gc){if(0===vc)var e=gc.return;else Sa=wa=null,oo(e=gc),li=null,si=0,e=gc;for(;null!==e;)ms(e.alternate,e),e=e.return;gc=null}}function rd(e,t){var r=e.timeoutHandle;-1!==r&&(e.timeoutHandle=-1,wu(r)),null!==(r=e.cancelPendingCommit)&&(e.cancelPendingCommit=null,r()),Bc=0,td(),mc=e,gc=r=Mn(e.current,null),xc=t,vc=0,bc=null,yc=!1,kc=_e(e,t),jc=!1,Nc=_c=Ec=zc=$c=Sc=0,Cc=Ac=null,Fc=!1,0!==(8&t)&&(t|=32&t);var n=e.entangledLanes;if(0!==n)for(e=e.entanglements,n&=t;0<n;){var a=31-ye(n),i=1<<a;t|=e[a],n&=~i}return wc=t,An(),r}function nd(e,t){Vi=null,P.H=ml,t===Ja||t===Za?(t=ii(),vc=3):t===Xa?(t=ii(),vc=4):vc=t===Fl?8:null!==t&&"object"===typeof t&&"function"===typeof t.then?6:1,bc=t,null===gc&&(Sc=1,El(e,Yn(t,e.current)))}function ad(){var e=Fi.current;return null===e||((4194048&xc)===xc?null===Ti:((62914560&xc)===xc||0!==(536870912&xc))&&e===Ti)}function id(){var e=P.H;return P.H=ml,null===e?ml:e}function od(){var e=P.A;return P.A=pc,e}function ld(){Sc=4,yc||(4194048&xc)!==xc&&null!==Fi.current||(kc=!0),0===(134217727&$c)&&0===(134217727&zc)||null===mc||Zc(mc,xc,_c,!1)}function sd(e,t,r){var n=fc;fc|=2;var a=id(),i=od();mc===e&&xc===t||(Lc=null,rd(e,t)),t=!1;var o=Sc;e:for(;;)try{if(0!==vc&&null!==gc){var l=gc,s=bc;switch(vc){case 8:td(),o=6;break e;case 3:case 2:case 9:case 6:null===Fi.current&&(t=!0);var c=vc;if(vc=0,bc=null,hd(e,l,s,c),r&&kc){o=0;break e}break;default:c=vc,vc=0,bc=null,hd(e,l,s,c)}}cd(),o=Sc;break}catch(d){nd(e,d)}return t&&e.shellSuspendCounter++,Sa=wa=null,fc=n,P.H=a,P.A=i,null===gc&&(mc=null,xc=0,An()),o}function cd(){for(;null!==gc;)ud(gc)}function dd(){for(;null!==gc&&!oe();)ud(gc)}function ud(e){var t=os(e.alternate,e,wc);e.memoizedProps=e.pendingProps,null===t?fd(e):gc=t}function pd(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=Hl(r,t,t.pendingProps,t.type,void 0,xc);break;case 11:t=Hl(r,t,t.pendingProps,t.type.render,t.ref,xc);break;case 5:oo(t);default:ms(r,t),t=os(r,t=gc=Bn(t,wc),wc)}e.memoizedProps=e.pendingProps,null===t?fd(e):gc=t}function hd(e,t,r,n){Sa=wa=null,oo(t),li=null,si=0;var a=t.return;try{if(function(e,t,r,n,a){if(r.flags|=32768,null!==n&&"object"===typeof n&&"function"===typeof n.then){if(null!==(t=r.alternate)&&Na(t,r,a,!0),null!==(r=Fi.current)){switch(r.tag){case 31:case 13:return null===Ti?ld():null===r.alternate&&0===Sc&&(Sc=3),r.flags&=-257,r.flags|=65536,r.lanes=a,n===ei?r.flags|=16384:(null===(t=r.updateQueue)?r.updateQueue=new Set([n]):t.add(n),$d(e,n,a)),!1;case 22:return r.flags|=65536,n===ei?r.flags|=16384:(null===(t=r.updateQueue)?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},r.updateQueue=t):null===(r=t.retryQueue)?t.retryQueue=new Set([n]):r.add(n),$d(e,n,a)),!1}throw Error(o(435,r.tag))}return $d(e,n,a),ld(),!1}if(ua)return null!==(t=Fi.current)?(0===(65536&t.flags)&&(t.flags|=256),t.flags|=65536,t.lanes=a,n!==fa&&ka(Yn(e=Error(o(422),{cause:n}),r))):(n!==fa&&ka(Yn(t=Error(o(423),{cause:n}),r)),(e=e.current.alternate).flags|=65536,a&=-a,e.lanes|=a,n=Yn(n,r),ki(e,a=Nl(e.stateNode,n,a)),4!==Sc&&(Sc=2)),!1;var i=Error(o(520),{cause:n});if(i=Yn(i,r),null===Ac?Ac=[i]:Ac.push(i),4!==Sc&&(Sc=2),null===t)return!0;n=Yn(n,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=a&-a,r.lanes|=e,ki(r,e=Nl(r.stateNode,n,e)),!1;case 1:if(t=r.type,i=r.stateNode,0===(128&r.flags)&&("function"===typeof t.getDerivedStateFromError||null!==i&&"function"===typeof i.componentDidCatch&&(null===Rc||!Rc.has(i))))return r.flags|=65536,a&=-a,r.lanes|=a,Cl(a=Al(a),e,r,n),ki(r,a),!1}r=r.return}while(null!==r);return!1}(e,a,t,r,xc))return Sc=1,El(e,Yn(r,e.current)),void(gc=null)}catch(i){if(null!==a)throw gc=a,i;return Sc=1,El(e,Yn(r,e.current)),void(gc=null)}32768&t.flags?(ua||1===n?e=!0:kc||0!==(536870912&xc)?e=!1:(yc=e=!0,(2===n||9===n||3===n||6===n)&&(null!==(n=Fi.current)&&13===n.tag&&(n.flags|=16384))),md(t,e)):fd(t)}function fd(e){var t=e;do{if(0!==(32768&t.flags))return void md(t,yc);e=t.return;var r=hs(t.alternate,t,wc);if(null!==r)return void(gc=r);if(null!==(t=t.sibling))return void(gc=t);gc=t=e}while(null!==t);0===Sc&&(Sc=5)}function md(e,t){do{var r=fs(e.alternate,e);if(null!==r)return r.flags&=32767,void(gc=r);if(null!==(r=e.return)&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&null!==(e=e.sibling))return void(gc=e);gc=e=r}while(null!==e);Sc=6,gc=null}function gd(e,t,r,n,a,i,l,s,c){e.cancelPendingCommit=null;do{kd()}while(0!==Oc);if(0!==(6&fc))throw Error(o(327));if(null!==t){if(t===e.current)throw Error(o(177));if(i=t.lanes|t.childLanes,function(e,t,r,n,a,i){var o=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var l=e.entanglements,s=e.expirationTimes,c=e.hiddenUpdates;for(r=o&~r;0<r;){var d=31-ye(r),u=1<<d;l[d]=0,s[d]=-1;var p=c[d];if(null!==p)for(c[d]=null,d=0;d<p.length;d++){var h=p[d];null!==h&&(h.lane&=-536870913)}r&=~u}0!==n&&Te(e,n,0),0!==i&&0===a&&0!==e.tag&&(e.suspendedLanes|=i&~(o&~t))}(e,r,i|=Nn,l,s,c),e===mc&&(gc=mc=null,xc=0),Mc=t,Ic=e,Bc=r,Vc=i,Uc=a,Kc=n,0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?(e.callbackNode=null,e.callbackPriority=0,ae(pe,function(){return jd(),null})):(e.callbackNode=null,e.callbackPriority=0),n=0!==(13878&t.flags),0!==(13878&t.subtreeFlags)||n){n=P.T,P.T=null,a=D.p,D.p=2,l=fc,fc|=4;try{!function(e,t){if(e=e.containerInfo,mu=yp,nn(e=rn(e))){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{var n=(r=(r=e.ownerDocument)&&r.defaultView||window).getSelection&&r.getSelection();if(n&&0!==n.rangeCount){r=n.anchorNode;var a=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch(g){r=null;break e}var l=0,s=-1,c=-1,d=0,u=0,p=e,h=null;t:for(;;){for(var f;p!==r||0!==a&&3!==p.nodeType||(s=l+a),p!==i||0!==n&&3!==p.nodeType||(c=l+n),3===p.nodeType&&(l+=p.nodeValue.length),null!==(f=p.firstChild);)h=p,p=f;for(;;){if(p===e)break t;if(h===r&&++d===a&&(s=l),h===i&&++u===n&&(c=l),null!==(f=p.nextSibling))break;h=(p=h).parentNode}p=f}r=-1===s||-1===c?null:{start:s,end:c}}else r=null}r=r||{start:0,end:0}}else r=null;for(gu={focusedElem:e,selectionRange:r},yp=!1,Ts=t;null!==Ts;)if(e=(t=Ts).child,0!==(1028&t.subtreeFlags)&&null!==e)e.return=t,Ts=e;else for(;null!==Ts;){switch(i=(t=Ts).alternate,e=t.flags,t.tag){case 0:if(0!==(4&e)&&null!==(e=null!==(e=t.updateQueue)?e.events:null))for(r=0;r<e.length;r++)(a=e[r]).ref.impl=a.nextImpl;break;case 11:case 15:case 5:case 26:case 27:case 6:case 4:case 17:break;case 1:if(0!==(1024&e)&&null!==i){e=void 0,r=t,a=i.memoizedProps,i=i.memoizedState,n=r.stateNode;try{var m=wl(r.type,a);e=n.getSnapshotBeforeUpdate(m,i),n.__reactInternalSnapshotBeforeUpdate=e}catch(x){Sd(r,r.return,x)}}break;case 3:if(0!==(1024&e))if(9===(r=(e=t.stateNode.containerInfo).nodeType))Au(e);else if(1===r)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Au(e);break;default:e.textContent=""}break;default:if(0!==(1024&e))throw Error(o(163))}if(null!==(e=t.sibling)){e.return=t.return,Ts=e;break}Ts=t.return}}(e,t)}finally{fc=l,D.p=a,P.T=n}}Oc=1,xd(),vd(),bd()}}function xd(){if(1===Oc){Oc=0;var e=Ic,t=Mc,r=0!==(13878&t.flags);if(0!==(13878&t.subtreeFlags)||r){r=P.T,P.T=null;var n=D.p;D.p=2;var a=fc;fc|=4;try{Hs(t,e);var i=gu,o=rn(e.containerInfo),l=i.focusedElem,s=i.selectionRange;if(o!==l&&l&&l.ownerDocument&&tn(l.ownerDocument.documentElement,l)){if(null!==s&&nn(l)){var c=s.start,d=s.end;if(void 0===d&&(d=c),"selectionStart"in l)l.selectionStart=c,l.selectionEnd=Math.min(d,l.value.length);else{var u=l.ownerDocument||document,p=u&&u.defaultView||window;if(p.getSelection){var h=p.getSelection(),f=l.textContent.length,m=Math.min(s.start,f),g=void 0===s.end?m:Math.min(s.end,f);!h.extend&&m>g&&(o=g,g=m,m=o);var x=en(l,m),v=en(l,g);if(x&&v&&(1!==h.rangeCount||h.anchorNode!==x.node||h.anchorOffset!==x.offset||h.focusNode!==v.node||h.focusOffset!==v.offset)){var b=u.createRange();b.setStart(x.node,x.offset),h.removeAllRanges(),m>g?(h.addRange(b),h.extend(v.node,v.offset)):(b.setEnd(v.node,v.offset),h.addRange(b))}}}}for(u=[],h=l;h=h.parentNode;)1===h.nodeType&&u.push({element:h,left:h.scrollLeft,top:h.scrollTop});for("function"===typeof l.focus&&l.focus(),l=0;l<u.length;l++){var y=u[l];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}yp=!!mu,gu=mu=null}finally{fc=a,D.p=n,P.T=r}}e.current=t,Oc=2}}function vd(){if(2===Oc){Oc=0;var e=Ic,t=Mc,r=0!==(8772&t.flags);if(0!==(8772&t.subtreeFlags)||r){r=P.T,P.T=null;var n=D.p;D.p=2;var a=fc;fc|=4;try{Ps(e,t.alternate,t)}finally{fc=a,D.p=n,P.T=r}}Oc=3}}function bd(){if(4===Oc||3===Oc){Oc=0,le();var e=Ic,t=Mc,r=Bc,n=Kc;0!==(10256&t.subtreeFlags)||0!==(10256&t.flags)?Oc=5:(Oc=0,Mc=Ic=null,yd(e,e.pendingLanes));var a=e.pendingLanes;if(0===a&&(Rc=null),Re(r),t=t.stateNode,ve&&"function"===typeof ve.onCommitFiberRoot)try{ve.onCommitFiberRoot(xe,t,void 0,128===(128&t.current.flags))}catch(s){}if(null!==n){t=P.T,a=D.p,D.p=2,P.T=null;try{for(var i=e.onRecoverableError,o=0;o<n.length;o++){var l=n[o];i(l.value,{componentStack:l.stack})}}finally{P.T=t,D.p=a}}0!==(3&Bc)&&kd(),Ld(e),a=e.pendingLanes,0!==(261930&r)&&0!==(42&a)?e===Wc?Hc++:(Hc=0,Wc=e):Hc=0,Rd(0,!1)}}function yd(e,t){0===(e.pooledCacheLanes&=t)&&(null!=(t=e.pooledCache)&&(e.pooledCache=null,Ma(t)))}function kd(){return xd(),vd(),bd(),jd()}function jd(){if(5!==Oc)return!1;var e=Ic,t=Vc;Vc=0;var r=Re(Bc),n=P.T,a=D.p;try{D.p=32>r?32:r,P.T=null,r=Uc,Uc=null;var i=Ic,l=Bc;if(Oc=0,Mc=Ic=null,Bc=0,0!==(6&fc))throw Error(o(331));var s=fc;if(fc|=4,cc(i.current),tc(i,i.current,l,r),fc=s,Rd(0,!1),ve&&"function"===typeof ve.onPostCommitFiberRoot)try{ve.onPostCommitFiberRoot(xe,i)}catch(c){}return!0}finally{D.p=a,P.T=n,yd(e,t)}}function wd(e,t,r){t=Yn(r,t),null!==(e=bi(e,t=Nl(e.stateNode,t,2),2))&&(Fe(e,2),Ld(e))}function Sd(e,t,r){if(3===e.tag)wd(e,e,r);else for(;null!==t;){if(3===t.tag){wd(t,e,r);break}if(1===t.tag){var n=t.stateNode;if("function"===typeof t.type.getDerivedStateFromError||"function"===typeof n.componentDidCatch&&(null===Rc||!Rc.has(n))){e=Yn(r,e),null!==(n=bi(t,r=Al(2),2))&&(Cl(r,n,t,e),Fe(n,2),Ld(n));break}}t=t.return}}function $d(e,t,r){var n=e.pingCache;if(null===n){n=e.pingCache=new hc;var a=new Set;n.set(t,a)}else void 0===(a=n.get(t))&&(a=new Set,n.set(t,a));a.has(r)||(jc=!0,a.add(r),e=zd.bind(null,e,t,r),t.then(e,e))}function zd(e,t,r){var n=e.pingCache;null!==n&&n.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,mc===e&&(xc&r)===r&&(4===Sc||3===Sc&&(62914560&xc)===xc&&300>se()-Tc?0===(2&fc)&&rd(e,0):Ec|=r,Nc===xc&&(Nc=0)),Ld(e)}function Ed(e,t){0===t&&(t=Ae()),null!==(e=Tn(e,t))&&(Fe(e,t),Ld(e))}function _d(e){var t=e.memoizedState,r=0;null!==t&&(r=t.retryLane),Ed(e,r)}function Nd(e,t){var r=0;switch(e.tag){case 31:case 13:var n=e.stateNode,a=e.memoizedState;null!==a&&(r=a.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(o(314))}null!==n&&n.delete(t),Ed(e,r)}var Ad=null,Cd=null,Fd=!1,Td=!1,Pd=!1,Dd=0;function Ld(e){e!==Cd&&null===e.next&&(null===Cd?Ad=Cd=e:Cd=Cd.next=e),Td=!0,Fd||(Fd=!0,$u(function(){0!==(6&fc)?ae(de,Od):Id()}))}function Rd(e,t){if(!Pd&&Td){Pd=!0;do{for(var r=!1,n=Ad;null!==n;){if(!t)if(0!==e){var a=n.pendingLanes;if(0===a)var i=0;else{var o=n.suspendedLanes,l=n.pingedLanes;i=(1<<31-ye(42|e)+1)-1,i=201326741&(i&=a&~(o&~l))?201326741&i|1:i?2|i:0}0!==i&&(r=!0,Vd(n,i))}else i=xc,0===(3&(i=Ee(n,n===mc?i:0,null!==n.cancelPendingCommit||-1!==n.timeoutHandle)))||_e(n,i)||(r=!0,Vd(n,i));n=n.next}}while(r);Pd=!1}}function Od(){Id()}function Id(){Td=Fd=!1;var e=0;0!==Dd&&function(){var e=window.event;if(e&&"popstate"===e.type)return e!==ku&&(ku=e,!0);return ku=null,!1}()&&(e=Dd);for(var t=se(),r=null,n=Ad;null!==n;){var a=n.next,i=Md(n,t);0===i?(n.next=null,null===r?Ad=a:r.next=a,null===a&&(Cd=r)):(r=n,(0!==e||0!==(3&i))&&(Td=!0)),n=a}0!==Oc&&5!==Oc||Rd(e,!1),0!==Dd&&(Dd=0)}function Md(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,a=e.expirationTimes,i=-62914561&e.pendingLanes;0<i;){var o=31-ye(i),l=1<<o,s=a[o];-1===s?0!==(l&r)&&0===(l&n)||(a[o]=Ne(l,t)):s<=t&&(e.expiredLanes|=l),i&=~l}if(r=xc,r=Ee(e,e===(t=mc)?r:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle),n=e.callbackNode,0===r||e===t&&(2===vc||9===vc)||null!==e.cancelPendingCommit)return null!==n&&null!==n&&ie(n),e.callbackNode=null,e.callbackPriority=0;if(0===(3&r)||_e(e,r)){if((t=r&-r)===e.callbackPriority)return t;switch(null!==n&&ie(n),Re(r)){case 2:case 8:r=ue;break;case 32:default:r=pe;break;case 268435456:r=fe}return n=Bd.bind(null,e),r=ae(r,n),e.callbackPriority=t,e.callbackNode=r,t}return null!==n&&null!==n&&ie(n),e.callbackPriority=2,e.callbackNode=null,2}function Bd(e,t){if(0!==Oc&&5!==Oc)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(kd()&&e.callbackNode!==r)return null;var n=xc;return 0===(n=Ee(e,e===mc?n:0,null!==e.cancelPendingCommit||-1!==e.timeoutHandle))?null:(Qc(e,n,t),Md(e,se()),null!=e.callbackNode&&e.callbackNode===r?Bd.bind(null,e):null)}function Vd(e,t){if(kd())return null;Qc(e,t,!0)}function Ud(){if(0===Dd){var e=Ua;0===e&&(e=we,0===(261888&(we<<=1))&&(we=256)),Dd=e}return Dd}function Kd(e){return null==e||"symbol"===typeof e||"boolean"===typeof e?null:"function"===typeof e?e:Ct(""+e)}function Hd(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}for(var Wd=0;Wd<Sn.length;Wd++){var qd=Sn[Wd];$n(qd.toLowerCase(),"on"+(qd[0].toUpperCase()+qd.slice(1)))}$n(gn,"onAnimationEnd"),$n(xn,"onAnimationIteration"),$n(vn,"onAnimationStart"),$n("dblclick","onDoubleClick"),$n("focusin","onFocus"),$n("focusout","onBlur"),$n(bn,"onTransitionRun"),$n(yn,"onTransitionStart"),$n(kn,"onTransitionCancel"),$n(jn,"onTransitionEnd"),at("onMouseEnter",["mouseout","mouseover"]),at("onMouseLeave",["mouseout","mouseover"]),at("onPointerEnter",["pointerout","pointerover"]),at("onPointerLeave",["pointerout","pointerover"]),nt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),nt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),nt("onBeforeInput",["compositionend","keypress","textInput","paste"]),nt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),nt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),nt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yd="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gd=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yd));function Qd(e,t){t=0!==(4&t);for(var r=0;r<e.length;r++){var n=e[r],a=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var o=n.length-1;0<=o;o--){var l=n[o],s=l.instance,c=l.currentTarget;if(l=l.listener,s!==i&&a.isPropagationStopped())break e;i=l,a.currentTarget=c;try{i(a)}catch(d){zn(d)}a.currentTarget=null,i=s}else for(o=0;o<n.length;o++){if(s=(l=n[o]).instance,c=l.currentTarget,l=l.listener,s!==i&&a.isPropagationStopped())break e;i=l,a.currentTarget=c;try{i(a)}catch(d){zn(d)}a.currentTarget=null,i=s}}}}function Jd(e,t){var r=t[Ke];void 0===r&&(r=t[Ke]=new Set);var n=e+"__bubble";r.has(n)||(tu(t,e,2,!1),r.add(n))}function Xd(e,t,r){var n=0;t&&(n|=4),tu(r,e,n,t)}var Zd="_reactListening"+Math.random().toString(36).slice(2);function eu(e){if(!e[Zd]){e[Zd]=!0,tt.forEach(function(t){"selectionchange"!==t&&(Gd.has(t)||Xd(t,!1,e),Xd(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Zd]||(t[Zd]=!0,Xd("selectionchange",!1,t))}}function tu(e,t,r,n){switch(Ep(t)){case 2:var a=kp;break;case 8:a=jp;break;default:a=wp}r=a.bind(null,t,r,e),a=void 0,!Vt||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),n?void 0!==a?e.addEventListener(t,r,{capture:!0,passive:a}):e.addEventListener(t,r,!0):void 0!==a?e.addEventListener(t,r,{passive:a}):e.addEventListener(t,r,!1)}function ru(e,t,r,n,a){var i=n;if(0===(1&t)&&0===(2&t)&&null!==n)e:for(;;){if(null===n)return;var o=n.tag;if(3===o||4===o){var l=n.stateNode.containerInfo;if(l===a)break;if(4===o)for(o=n.return;null!==o;){var c=o.tag;if((3===c||4===c)&&o.stateNode.containerInfo===a)return;o=o.return}for(;null!==l;){if(null===(o=Qe(l)))return;if(5===(c=o.tag)||6===c||26===c||27===c){n=i=o;continue e}l=l.parentNode}}n=n.return}It(function(){var n=i,a=Pt(r),o=[];e:{var l=wn.get(e);if(void 0!==l){var c=rr,d=e;switch(e){case"keypress":if(0===Yt(r))break e;case"keydown":case"keyup":c=xr;break;case"focusin":d="focus",c=sr;break;case"focusout":d="blur",c=sr;break;case"beforeblur":case"afterblur":c=sr;break;case"click":if(2===r.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":c=or;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":c=lr;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":c=br;break;case gn:case xn:case vn:c=cr;break;case jn:c=yr;break;case"scroll":case"scrollend":c=ar;break;case"wheel":c=kr;break;case"copy":case"cut":case"paste":c=dr;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":c=vr;break;case"toggle":case"beforetoggle":c=jr}var u=0!==(4&t),p=!u&&("scroll"===e||"scrollend"===e),h=u?null!==l?l+"Capture":null:l;u=[];for(var f,m=n;null!==m;){var g=m;if(f=g.stateNode,5!==(g=g.tag)&&26!==g&&27!==g||null===f||null===h||null!=(g=Mt(m,h))&&u.push(nu(m,g,f)),p)break;m=m.return}0<u.length&&(l=new c(l,d,null,r,a),o.push({event:l,listeners:u}))}}if(0===(7&t)){if(c="mouseout"===e||"pointerout"===e,(!(l="mouseover"===e||"pointerover"===e)||r===Tt||!(d=r.relatedTarget||r.fromElement)||!Qe(d)&&!d[Ue])&&(c||l)&&(l=a.window===a?a:(l=a.ownerDocument)?l.defaultView||l.parentWindow:window,c?(c=n,null!==(d=(d=r.relatedTarget||r.toElement)?Qe(d):null)&&(p=s(d),u=d.tag,d!==p||5!==u&&27!==u&&6!==u)&&(d=null)):(c=null,d=n),c!==d)){if(u=or,g="onMouseLeave",h="onMouseEnter",m="mouse","pointerout"!==e&&"pointerover"!==e||(u=vr,g="onPointerLeave",h="onPointerEnter",m="pointer"),p=null==c?l:Xe(c),f=null==d?l:Xe(d),(l=new u(g,m+"leave",c,r,a)).target=p,l.relatedTarget=f,g=null,Qe(a)===n&&((u=new u(h,m+"enter",d,r,a)).target=f,u.relatedTarget=p,g=u),p=g,c&&d)e:{for(u=iu,m=d,f=0,g=h=c;g;g=u(g))f++;g=0;for(var x=m;x;x=u(x))g++;for(;0<f-g;)h=u(h),f--;for(;0<g-f;)m=u(m),g--;for(;f--;){if(h===m||null!==m&&h===m.alternate){u=h;break e}h=u(h),m=u(m)}u=null}else u=null;null!==c&&ou(o,l,c,u,!1),null!==d&&null!==p&&ou(o,p,d,u,!0)}if("select"===(c=(l=n?Xe(n):window).nodeName&&l.nodeName.toLowerCase())||"input"===c&&"file"===l.type)var v=Mr;else if(Pr(l))if(Br)v=Qr;else{v=Yr;var b=qr}else!(c=l.nodeName)||"input"!==c.toLowerCase()||"checkbox"!==l.type&&"radio"!==l.type?n&&_t(n.elementType)&&(v=Mr):v=Gr;switch(v&&(v=v(e,n))?Dr(o,v,r,a):(b&&b(e,l,n),"focusout"===e&&n&&"number"===l.type&&null!=n.memoizedProps.value&&yt(l,"number",l.value)),b=n?Xe(n):window,e){case"focusin":(Pr(b)||"true"===b.contentEditable)&&(on=b,ln=n,sn=null);break;case"focusout":sn=ln=on=null;break;case"mousedown":cn=!0;break;case"contextmenu":case"mouseup":case"dragend":cn=!1,dn(o,r,a);break;case"selectionchange":if(an)break;case"keydown":case"keyup":dn(o,r,a)}var y;if(Sr)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else Fr?Ar(e,r)&&(k="onCompositionEnd"):"keydown"===e&&229===r.keyCode&&(k="onCompositionStart");k&&(Er&&"ko"!==r.locale&&(Fr||"onCompositionStart"!==k?"onCompositionEnd"===k&&Fr&&(y=qt()):(Ht="value"in(Kt=a)?Kt.value:Kt.textContent,Fr=!0)),0<(b=au(n,k)).length&&(k=new ur(k,e,null,r,a),o.push({event:k,listeners:b}),y?k.data=y:null!==(y=Cr(r))&&(k.data=y))),(y=zr?function(e,t){switch(e){case"compositionend":return Cr(t);case"keypress":return 32!==t.which?null:(Nr=!0,_r);case"textInput":return(e=t.data)===_r&&Nr?null:e;default:return null}}(e,r):function(e,t){if(Fr)return"compositionend"===e||!Sr&&Ar(e,t)?(e=qt(),Wt=Ht=Kt=null,Fr=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Er&&"ko"!==t.locale?null:t.data}}(e,r))&&(0<(k=au(n,"onBeforeInput")).length&&(b=new ur("onBeforeInput","beforeinput",null,r,a),o.push({event:b,listeners:k}),b.data=y)),function(e,t,r,n,a){if("submit"===t&&r&&r.stateNode===a){var i=Kd((a[Ve]||null).action),o=n.submitter;o&&null!==(t=(t=o[Ve]||null)?Kd(t.formAction):o.getAttribute("formAction"))&&(i=t,o=null);var l=new rr("action","action",null,n,a);e.push({event:l,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(0!==Dd){var e=o?Hd(a,o):new FormData(a);tl(r,{pending:!0,data:e,method:a.method,action:i},null,e)}}else"function"===typeof i&&(l.preventDefault(),e=o?Hd(a,o):new FormData(a),tl(r,{pending:!0,data:e,method:a.method,action:i},i,e))},currentTarget:a}]})}}(o,e,n,r,a)}Qd(o,t)})}function nu(e,t,r){return{instance:e,listener:t,currentTarget:r}}function au(e,t){for(var r=t+"Capture",n=[];null!==e;){var a=e,i=a.stateNode;if(5!==(a=a.tag)&&26!==a&&27!==a||null===i||(null!=(a=Mt(e,r))&&n.unshift(nu(e,a,i)),null!=(a=Mt(e,t))&&n.push(nu(e,a,i))),3===e.tag)return n;e=e.return}return[]}function iu(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag&&27!==e.tag);return e||null}function ou(e,t,r,n,a){for(var i=t._reactName,o=[];null!==r&&r!==n;){var l=r,s=l.alternate,c=l.stateNode;if(l=l.tag,null!==s&&s===n)break;5!==l&&26!==l&&27!==l||null===c||(s=c,a?null!=(c=Mt(r,i))&&o.unshift(nu(r,c,s)):a||null!=(c=Mt(r,i))&&o.push(nu(r,c,s))),r=r.return}0!==o.length&&e.push({event:t,listeners:o})}var lu=/\r\n?/g,su=/\u0000|\uFFFD/g;function cu(e){return("string"===typeof e?e:""+e).replace(lu,"\n").replace(su,"")}function du(e,t){return t=cu(t),cu(e)===t}function uu(e,t,r,n,a,i){switch(r){case"children":"string"===typeof n?"body"===t||"textarea"===t&&""===n||St(e,n):("number"===typeof n||"bigint"===typeof n)&&"body"!==t&&St(e,""+n);break;case"className":ct(e,"class",n);break;case"tabIndex":ct(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":ct(e,r,n);break;case"style":Et(e,n,i);break;case"data":if("object"!==t){ct(e,"data",n);break}case"src":case"href":if(""===n&&("a"!==t||"href"!==r)){e.removeAttribute(r);break}if(null==n||"function"===typeof n||"symbol"===typeof n||"boolean"===typeof n){e.removeAttribute(r);break}n=Ct(""+n),e.setAttribute(r,n);break;case"action":case"formAction":if("function"===typeof n){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}if("function"===typeof i&&("formAction"===r?("input"!==t&&uu(e,t,"name",a.name,a,null),uu(e,t,"formEncType",a.formEncType,a,null),uu(e,t,"formMethod",a.formMethod,a,null),uu(e,t,"formTarget",a.formTarget,a,null)):(uu(e,t,"encType",a.encType,a,null),uu(e,t,"method",a.method,a,null),uu(e,t,"target",a.target,a,null))),null==n||"symbol"===typeof n||"boolean"===typeof n){e.removeAttribute(r);break}n=Ct(""+n),e.setAttribute(r,n);break;case"onClick":null!=n&&(e.onclick=Ft);break;case"onScroll":null!=n&&Jd("scroll",e);break;case"onScrollEnd":null!=n&&Jd("scrollend",e);break;case"dangerouslySetInnerHTML":if(null!=n){if("object"!==typeof n||!("__html"in n))throw Error(o(61));if(null!=(r=n.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=r}}break;case"multiple":e.multiple=n&&"function"!==typeof n&&"symbol"!==typeof n;break;case"muted":e.muted=n&&"function"!==typeof n&&"symbol"!==typeof n;break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":case"autoFocus":break;case"xlinkHref":if(null==n||"function"===typeof n||"boolean"===typeof n||"symbol"===typeof n){e.removeAttribute("xlink:href");break}r=Ct(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":null!=n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,""+n):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":!0===n?e.setAttribute(r,""):!1!==n&&null!=n&&"function"!==typeof n&&"symbol"!==typeof n?e.setAttribute(r,n):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":null!=n&&"function"!==typeof n&&"symbol"!==typeof n&&!isNaN(n)&&1<=n?e.setAttribute(r,n):e.removeAttribute(r);break;case"rowSpan":case"start":null==n||"function"===typeof n||"symbol"===typeof n||isNaN(n)?e.removeAttribute(r):e.setAttribute(r,n);break;case"popover":Jd("beforetoggle",e),Jd("toggle",e),st(e,"popover",n);break;case"xlinkActuate":dt(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":dt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":dt(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":dt(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":dt(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":dt(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":dt(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":dt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":dt(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":st(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<r.length)||"o"!==r[0]&&"O"!==r[0]||"n"!==r[1]&&"N"!==r[1])&&st(e,r=Nt.get(r)||r,n)}}function pu(e,t,r,n,a,i){switch(r){case"style":Et(e,n,i);break;case"dangerouslySetInnerHTML":if(null!=n){if("object"!==typeof n||!("__html"in n))throw Error(o(61));if(null!=(r=n.__html)){if(null!=a.children)throw Error(o(60));e.innerHTML=r}}break;case"children":"string"===typeof n?St(e,n):("number"===typeof n||"bigint"===typeof n)&&St(e,""+n);break;case"onScroll":null!=n&&Jd("scroll",e);break;case"onScrollEnd":null!=n&&Jd("scrollend",e);break;case"onClick":null!=n&&(e.onclick=Ft);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":case"innerText":case"textContent":break;default:rt.hasOwnProperty(r)||("o"!==r[0]||"n"!==r[1]||(a=r.endsWith("Capture"),t=r.slice(2,a?r.length-7:void 0),"function"===typeof(i=null!=(i=e[Ve]||null)?i[r]:null)&&e.removeEventListener(t,i,a),"function"!==typeof n)?r in e?e[r]=n:!0===n?e.setAttribute(r,""):st(e,r,n):("function"!==typeof i&&null!==i&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,n,a)))}}function hu(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Jd("error",e),Jd("load",e);var n,a=!1,i=!1;for(n in r)if(r.hasOwnProperty(n)){var l=r[n];if(null!=l)switch(n){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,n,l,r,null)}}return i&&uu(e,t,"srcSet",r.srcSet,r,null),void(a&&uu(e,t,"src",r.src,r,null));case"input":Jd("invalid",e);var s=n=l=i=null,c=null,d=null;for(a in r)if(r.hasOwnProperty(a)){var u=r[a];if(null!=u)switch(a){case"name":i=u;break;case"type":l=u;break;case"checked":c=u;break;case"defaultChecked":d=u;break;case"value":n=u;break;case"defaultValue":s=u;break;case"children":case"dangerouslySetInnerHTML":if(null!=u)throw Error(o(137,t));break;default:uu(e,t,a,u,r,null)}}return void bt(e,n,s,c,d,l,i,!1);case"select":for(i in Jd("invalid",e),a=l=n=null,r)if(r.hasOwnProperty(i)&&null!=(s=r[i]))switch(i){case"value":n=s;break;case"defaultValue":l=s;break;case"multiple":a=s;default:uu(e,t,i,s,r,null)}return t=n,r=l,e.multiple=!!a,void(null!=t?kt(e,!!a,t,!1):null!=r&&kt(e,!!a,r,!0));case"textarea":for(l in Jd("invalid",e),n=i=a=null,r)if(r.hasOwnProperty(l)&&null!=(s=r[l]))switch(l){case"value":a=s;break;case"defaultValue":i=s;break;case"children":n=s;break;case"dangerouslySetInnerHTML":if(null!=s)throw Error(o(91));break;default:uu(e,t,l,s,r,null)}return void wt(e,a,i,n);case"option":for(c in r)if(r.hasOwnProperty(c)&&null!=(a=r[c]))if("selected"===c)e.selected=a&&"function"!==typeof a&&"symbol"!==typeof a;else uu(e,t,c,a,r,null);return;case"dialog":Jd("beforetoggle",e),Jd("toggle",e),Jd("cancel",e),Jd("close",e);break;case"iframe":case"object":Jd("load",e);break;case"video":case"audio":for(a=0;a<Yd.length;a++)Jd(Yd[a],e);break;case"image":Jd("error",e),Jd("load",e);break;case"details":Jd("toggle",e);break;case"embed":case"source":case"link":Jd("error",e),Jd("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in r)if(r.hasOwnProperty(d)&&null!=(a=r[d]))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:uu(e,t,d,a,r,null)}return;default:if(_t(t)){for(u in r)r.hasOwnProperty(u)&&(void 0!==(a=r[u])&&pu(e,t,u,a,r,void 0));return}}for(s in r)r.hasOwnProperty(s)&&(null!=(a=r[s])&&uu(e,t,s,a,r,null))}function fu(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}var mu=null,gu=null;function xu(e){return 9===e.nodeType?e:e.ownerDocument}function vu(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function bu(e,t){if(0===e)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return 1===e&&"foreignObject"===t?0:e}function yu(e,t){return"textarea"===e||"noscript"===e||"string"===typeof t.children||"number"===typeof t.children||"bigint"===typeof t.children||"object"===typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ku=null;var ju="function"===typeof setTimeout?setTimeout:void 0,wu="function"===typeof clearTimeout?clearTimeout:void 0,Su="function"===typeof Promise?Promise:void 0,$u="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Su?function(e){return Su.resolve(null).then(e).catch(zu)}:ju;function zu(e){setTimeout(function(){throw e})}function Eu(e){return"head"===e}function _u(e,t){var r=t,n=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&8===a.nodeType)if("/$"===(r=a.data)||"/&"===r){if(0===n)return e.removeChild(a),void Hp(t);n--}else if("$"===r||"$?"===r||"$~"===r||"$!"===r||"&"===r)n++;else if("html"===r)Iu(e.ownerDocument.documentElement);else if("head"===r){Iu(r=e.ownerDocument.head);for(var i=r.firstChild;i;){var o=i.nextSibling,l=i.nodeName;i[Ye]||"SCRIPT"===l||"STYLE"===l||"LINK"===l&&"stylesheet"===i.rel.toLowerCase()||r.removeChild(i),i=o}}else"body"===r&&Iu(e.ownerDocument.body);r=a}while(r);Hp(t)}function Nu(e,t){var r=e;e=0;do{var n=r.nextSibling;if(1===r.nodeType?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",""===r.getAttribute("style")&&r.removeAttribute("style")):3===r.nodeType&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),n&&8===n.nodeType)if("/$"===(r=n.data)){if(0===e)break;e--}else"$"!==r&&"$?"!==r&&"$~"!==r&&"$!"!==r||e++;r=n}while(r)}function Au(e){var t=e.firstChild;for(t&&10===t.nodeType&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Au(r),Ge(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if("stylesheet"===r.rel.toLowerCase())continue}e.removeChild(r)}}function Cu(e,t){for(;8!==e.nodeType;){if((1!==e.nodeType||"INPUT"!==e.nodeName||"hidden"!==e.type)&&!t)return null;if(null===(e=Pu(e.nextSibling)))return null}return e}function Fu(e){return"$?"===e.data||"$~"===e.data}function Tu(e){return"$!"===e.data||"$?"===e.data&&"loading"!==e.ownerDocument.readyState}function Pu(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t||"$~"===t||"&"===t||"F!"===t||"F"===t)break;if("/$"===t||"/&"===t)return null}}return e}var Du=null;function Lu(e){e=e.nextSibling;for(var t=0;e;){if(8===e.nodeType){var r=e.data;if("/$"===r||"/&"===r){if(0===t)return Pu(e.nextSibling);t--}else"$"!==r&&"$!"!==r&&"$?"!==r&&"$~"!==r&&"&"!==r||t++}e=e.nextSibling}return null}function Ru(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var r=e.data;if("$"===r||"$!"===r||"$?"===r||"$~"===r||"&"===r){if(0===t)return e;t--}else"/$"!==r&&"/&"!==r||t++}e=e.previousSibling}return null}function Ou(e,t,r){switch(t=xu(r),e){case"html":if(!(e=t.documentElement))throw Error(o(452));return e;case"head":if(!(e=t.head))throw Error(o(453));return e;case"body":if(!(e=t.body))throw Error(o(454));return e;default:throw Error(o(451))}}function Iu(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ge(e)}var Mu=new Map,Bu=new Set;function Vu(e){return"function"===typeof e.getRootNode?e.getRootNode():9===e.nodeType?e:e.ownerDocument}var Uu=D.d;D.d={f:function(){var e=Uu.f(),t=ed();return e||t},r:function(e){var t=Je(e);null!==t&&5===t.tag&&"form"===t.type?nl(t):Uu.r(e)},D:function(e){Uu.D(e),Hu("dns-prefetch",e,null)},C:function(e,t){Uu.C(e,t),Hu("preconnect",e,t)},L:function(e,t,r){Uu.L(e,t,r);var n=Ku;if(n&&e&&t){var a='link[rel="preload"][as="'+xt(t)+'"]';"image"===t&&r&&r.imageSrcSet?(a+='[imagesrcset="'+xt(r.imageSrcSet)+'"]',"string"===typeof r.imageSizes&&(a+='[imagesizes="'+xt(r.imageSizes)+'"]')):a+='[href="'+xt(e)+'"]';var i=a;switch(t){case"style":i=qu(e);break;case"script":i=Qu(e)}Mu.has(i)||(e=h({rel:"preload",href:"image"===t&&r&&r.imageSrcSet?void 0:e,as:t},r),Mu.set(i,e),null!==n.querySelector(a)||"style"===t&&n.querySelector(Yu(i))||"script"===t&&n.querySelector(Ju(i))||(hu(t=n.createElement("link"),"link",e),et(t),n.head.appendChild(t)))}},m:function(e,t){Uu.m(e,t);var r=Ku;if(r&&e){var n=t&&"string"===typeof t.as?t.as:"script",a='link[rel="modulepreload"][as="'+xt(n)+'"][href="'+xt(e)+'"]',i=a;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Qu(e)}if(!Mu.has(i)&&(e=h({rel:"modulepreload",href:e},t),Mu.set(i,e),null===r.querySelector(a))){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Ju(i)))return}hu(n=r.createElement("link"),"link",e),et(n),r.head.appendChild(n)}}},X:function(e,t){Uu.X(e,t);var r=Ku;if(r&&e){var n=Ze(r).hoistableScripts,a=Qu(e),i=n.get(a);i||((i=r.querySelector(Ju(a)))||(e=h({src:e,async:!0},t),(t=Mu.get(a))&&tp(e,t),et(i=r.createElement("script")),hu(i,"link",e),r.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(a,i))}},S:function(e,t,r){Uu.S(e,t,r);var n=Ku;if(n&&e){var a=Ze(n).hoistableStyles,i=qu(e);t=t||"default";var o=a.get(i);if(!o){var l={loading:0,preload:null};if(o=n.querySelector(Yu(i)))l.loading=5;else{e=h({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Mu.get(i))&&ep(e,r);var s=o=n.createElement("link");et(s),hu(s,"link",e),s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),s.addEventListener("load",function(){l.loading|=1}),s.addEventListener("error",function(){l.loading|=2}),l.loading|=4,Zu(o,t,n)}o={type:"stylesheet",instance:o,count:1,state:l},a.set(i,o)}}},M:function(e,t){Uu.M(e,t);var r=Ku;if(r&&e){var n=Ze(r).hoistableScripts,a=Qu(e),i=n.get(a);i||((i=r.querySelector(Ju(a)))||(e=h({src:e,async:!0,type:"module"},t),(t=Mu.get(a))&&tp(e,t),et(i=r.createElement("script")),hu(i,"link",e),r.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(a,i))}}};var Ku="undefined"===typeof document?null:document;function Hu(e,t,r){var n=Ku;if(n&&"string"===typeof t&&t){var a=xt(t);a='link[rel="'+e+'"][href="'+a+'"]',"string"===typeof r&&(a+='[crossorigin="'+r+'"]'),Bu.has(a)||(Bu.add(a),e={rel:e,crossOrigin:r,href:t},null===n.querySelector(a)&&(hu(t=n.createElement("link"),"link",e),et(t),n.head.appendChild(t)))}}function Wu(e,t,r,n){var a,i,l,s,c=(c=W.current)?Vu(c):null;if(!c)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return"string"===typeof r.precedence&&"string"===typeof r.href?(t=qu(r.href),(n=(r=Ze(c).hoistableStyles).get(t))||(n={type:"style",instance:null,count:0,state:null},r.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if("stylesheet"===r.rel&&"string"===typeof r.href&&"string"===typeof r.precedence){e=qu(r.href);var d=Ze(c).hoistableStyles,u=d.get(e);if(u||(c=c.ownerDocument||c,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,u),(d=c.querySelector(Yu(e)))&&!d._p&&(u.instance=d,u.state.loading=5),Mu.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Mu.set(e,r),d||(a=c,i=e,l=r,s=u.state,a.querySelector('link[rel="preload"][as="style"]['+i+"]")?s.loading=1:(i=a.createElement("link"),s.preload=i,i.addEventListener("load",function(){return s.loading|=1}),i.addEventListener("error",function(){return s.loading|=2}),hu(i,"link",l),et(i),a.head.appendChild(i))))),t&&null===n)throw Error(o(528,""));return u}if(t&&null!==n)throw Error(o(529,""));return null;case"script":return t=r.async,"string"===typeof(r=r.src)&&t&&"function"!==typeof t&&"symbol"!==typeof t?(t=Qu(r),(n=(r=Ze(c).hoistableScripts).get(t))||(n={type:"script",instance:null,count:0,state:null},r.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function qu(e){return'href="'+xt(e)+'"'}function Yu(e){return'link[rel="stylesheet"]['+e+"]"}function Gu(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Qu(e){return'[src="'+xt(e)+'"]'}function Ju(e){return"script[async]"+e}function Xu(e,t,r){if(t.count++,null===t.instance)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+xt(r.href)+'"]');if(n)return t.instance=n,et(n),n;var a=h({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return et(n=(e.ownerDocument||e).createElement("style")),hu(n,"style",a),Zu(n,r.precedence,e),t.instance=n;case"stylesheet":a=qu(r.href);var i=e.querySelector(Yu(a));if(i)return t.state.loading|=4,t.instance=i,et(i),i;n=Gu(r),(a=Mu.get(a))&&ep(n,a),et(i=(e.ownerDocument||e).createElement("link"));var l=i;return l._p=new Promise(function(e,t){l.onload=e,l.onerror=t}),hu(i,"link",n),t.state.loading|=4,Zu(i,r.precedence,e),t.instance=i;case"script":return i=Qu(r.src),(a=e.querySelector(Ju(i)))?(t.instance=a,et(a),a):(n=r,(a=Mu.get(i))&&tp(n=h({},r),a),et(a=(e=e.ownerDocument||e).createElement("script")),hu(a,"link",n),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(o(443,t.type))}else"stylesheet"===t.type&&0===(4&t.state.loading)&&(n=t.instance,t.state.loading|=4,Zu(n,r.precedence,e));return t.instance}function Zu(e,t,r){for(var n=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=n.length?n[n.length-1]:null,i=a,o=0;o<n.length;o++){var l=n[o];if(l.dataset.precedence===t)i=l;else if(i!==a)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=9===r.nodeType?r.head:r).insertBefore(e,t.firstChild)}function ep(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.title&&(e.title=t.title)}function tp(e,t){null==e.crossOrigin&&(e.crossOrigin=t.crossOrigin),null==e.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),null==e.integrity&&(e.integrity=t.integrity)}var rp=null;function np(e,t,r){if(null===rp){var n=new Map,a=rp=new Map;a.set(r,n)}else(n=(a=rp).get(r))||(n=new Map,a.set(r,n));if(n.has(e))return n;for(n.set(e,null),r=r.getElementsByTagName(e),a=0;a<r.length;a++){var i=r[a];if(!(i[Ye]||i[Be]||"link"===e&&"stylesheet"===i.getAttribute("rel"))&&"http://www.w3.org/2000/svg"!==i.namespaceURI){var o=i.getAttribute(t)||"";o=e+o;var l=n.get(o);l?l.push(i):n.set(o,[i])}}return n}function ap(e,t,r){(e=e.ownerDocument||e).head.insertBefore(r,"title"===t?e.querySelector("head > title"):null)}function ip(e){return"stylesheet"!==e.type||0!==(3&e.state.loading)}var op=0;function lp(){if(this.count--,0===this.count&&(0===this.imgCount||!this.waitingForImages))if(this.stylesheets)cp(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}var sp=null;function cp(e,t){e.stylesheets=null,null!==e.unsuspend&&(e.count++,sp=new Map,t.forEach(dp,e),sp=null,lp.call(e))}function dp(e,t){if(!(4&t.state.loading)){var r=sp.get(e);if(r)var n=r.get(null);else{r=new Map,sp.set(e,r);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var o=a[i];"LINK"!==o.nodeName&&"not all"===o.getAttribute("media")||(r.set(o.dataset.precedence,o),n=o)}n&&r.set(null,n)}o=(a=t.instance).getAttribute("data-precedence"),(i=r.get(o)||n)===n&&r.set(null,a),r.set(o,a),this.count++,n=lp.bind(this),a.addEventListener("load",n),a.addEventListener("error",n),i?i.parentNode.insertBefore(a,i.nextSibling):(e=9===e.nodeType?e.head:e).insertBefore(a,e.firstChild),t.state.loading|=4}}var up={$$typeof:k,Provider:null,Consumer:null,_currentValue:L,_currentValue2:L,_threadCount:0};function pp(e,t,r,n,a,i,o,l,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ce(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ce(0),this.hiddenUpdates=Ce(null),this.identifierPrefix=n,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function hp(e,t,r,n,a,i,o,l,s,c,d,u){return e=new pp(e,t,r,o,s,c,d,u,l),t=1,!0===i&&(t|=24),i=On(3,null,null,t),e.current=i,i.stateNode=e,(t=Ia()).refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:n,isDehydrated:r,cache:t},gi(i),e}function fp(e){return e?e=Ln:Ln}function mp(e,t,r,n,a,i){a=fp(a),null===n.context?n.context=a:n.pendingContext=a,(n=vi(t)).payload={element:r},null!==(i=void 0===i?null:i)&&(n.callback=i),null!==(r=bi(e,n,t))&&(Gc(r,0,t),yi(r,e,t))}function gp(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var r=e.retryLane;e.retryLane=0!==r&&r<t?r:t}}function xp(e,t){gp(e,t),(e=e.alternate)&&gp(e,t)}function vp(e){if(13===e.tag||31===e.tag){var t=Tn(e,67108864);null!==t&&Gc(t,0,67108864),xp(e,67108864)}}function bp(e){if(13===e.tag||31===e.tag){var t=qc(),r=Tn(e,t=Le(t));null!==r&&Gc(r,0,t),xp(e,t)}}var yp=!0;function kp(e,t,r,n){var a=P.T;P.T=null;var i=D.p;try{D.p=2,wp(e,t,r,n)}finally{D.p=i,P.T=a}}function jp(e,t,r,n){var a=P.T;P.T=null;var i=D.p;try{D.p=8,wp(e,t,r,n)}finally{D.p=i,P.T=a}}function wp(e,t,r,n){if(yp){var a=Sp(n);if(null===a)ru(e,t,n,$p,r),Lp(e,n);else if(function(e,t,r,n,a){switch(t){case"focusin":return Np=Rp(Np,e,t,r,n,a),!0;case"dragenter":return Ap=Rp(Ap,e,t,r,n,a),!0;case"mouseover":return Cp=Rp(Cp,e,t,r,n,a),!0;case"pointerover":var i=a.pointerId;return Fp.set(i,Rp(Fp.get(i)||null,e,t,r,n,a)),!0;case"gotpointercapture":return i=a.pointerId,Tp.set(i,Rp(Tp.get(i)||null,e,t,r,n,a)),!0}return!1}(a,e,t,r,n))n.stopPropagation();else if(Lp(e,n),4&t&&-1<Dp.indexOf(e)){for(;null!==a;){var i=Je(a);if(null!==i)switch(i.tag){case 3:if((i=i.stateNode).current.memoizedState.isDehydrated){var o=ze(i.pendingLanes);if(0!==o){var l=i;for(l.pendingLanes|=2,l.entangledLanes|=2;o;){var s=1<<31-ye(o);l.entanglements[1]|=s,o&=~s}Ld(i),0===(6&fc)&&(Dc=se()+500,Rd(0,!1))}}break;case 31:case 13:null!==(l=Tn(i,2))&&Gc(l,0,2),ed(),xp(i,2)}if(null===(i=Sp(n))&&ru(e,t,n,$p,r),i===a)break;a=i}null!==a&&n.stopPropagation()}else ru(e,t,n,null,r)}}function Sp(e){return zp(e=Pt(e))}var $p=null;function zp(e){if($p=null,null!==(e=Qe(e))){var t=s(e);if(null===t)e=null;else{var r=t.tag;if(13===r){if(null!==(e=c(t)))return e;e=null}else if(31===r){if(null!==(e=d(t)))return e;e=null}else if(3===r){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return $p=e,null}function Ep(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ce()){case de:return 2;case ue:return 8;case pe:case he:return 32;case fe:return 268435456;default:return 32}default:return 32}}var _p=!1,Np=null,Ap=null,Cp=null,Fp=new Map,Tp=new Map,Pp=[],Dp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Lp(e,t){switch(e){case"focusin":case"focusout":Np=null;break;case"dragenter":case"dragleave":Ap=null;break;case"mouseover":case"mouseout":Cp=null;break;case"pointerover":case"pointerout":Fp.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Tp.delete(t.pointerId)}}function Rp(e,t,r,n,a,i){return null===e||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[a]},null!==t&&(null!==(t=Je(t))&&vp(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function Op(e){var t=Qe(e.target);if(null!==t){var r=s(t);if(null!==r)if(13===(t=r.tag)){if(null!==(t=c(r)))return e.blockedOn=t,void Ie(e.priority,function(){bp(r)})}else if(31===t){if(null!==(t=d(r)))return e.blockedOn=t,void Ie(e.priority,function(){bp(r)})}else if(3===t&&r.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===r.tag?r.stateNode.containerInfo:null)}e.blockedOn=null}function Ip(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var r=Sp(e.nativeEvent);if(null!==r)return null!==(t=Je(r))&&vp(t),e.blockedOn=r,!1;var n=new(r=e.nativeEvent).constructor(r.type,r);Tt=n,r.target.dispatchEvent(n),Tt=null,t.shift()}return!0}function Mp(e,t,r){Ip(e)&&r.delete(t)}function Bp(){_p=!1,null!==Np&&Ip(Np)&&(Np=null),null!==Ap&&Ip(Ap)&&(Ap=null),null!==Cp&&Ip(Cp)&&(Cp=null),Fp.forEach(Mp),Tp.forEach(Mp)}function Vp(e,t){e.blockedOn===t&&(e.blockedOn=null,_p||(_p=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,Bp)))}var Up=null;function Kp(e){Up!==e&&(Up=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Up===e&&(Up=null);for(var t=0;t<e.length;t+=3){var r=e[t],n=e[t+1],a=e[t+2];if("function"!==typeof n){if(null===zp(n||r))continue;break}var i=Je(r);null!==i&&(e.splice(t,3),t-=3,tl(i,{pending:!0,data:a,method:r.method,action:n},n,a))}}))}function Hp(e){function t(t){return Vp(t,e)}null!==Np&&Vp(Np,e),null!==Ap&&Vp(Ap,e),null!==Cp&&Vp(Cp,e),Fp.forEach(t),Tp.forEach(t);for(var r=0;r<Pp.length;r++){var n=Pp[r];n.blockedOn===e&&(n.blockedOn=null)}for(;0<Pp.length&&null===(r=Pp[0]).blockedOn;)Op(r),null===r.blockedOn&&Pp.shift();if(null!=(r=(e.ownerDocument||e).$$reactFormReplay))for(n=0;n<r.length;n+=3){var a=r[n],i=r[n+1],o=a[Ve]||null;if("function"===typeof i)o||Kp(r);else if(o){var l=null;if(i&&i.hasAttribute("formAction")){if(a=i,o=i[Ve]||null)l=o.formAction;else if(null!==zp(a))continue}else l=o.action;"function"===typeof l?r[n+1]=l:(r.splice(n,3),n-=3),Kp(r)}}}function Wp(){function e(e){e.canIntercept&&"react-transition"===e.info&&e.intercept({handler:function(){return new Promise(function(e){return a=e})},focusReset:"manual",scroll:"manual"})}function t(){null!==a&&(a(),a=null),n||setTimeout(r,20)}function r(){if(!n&&!navigation.transition){var e=navigation.currentEntry;e&&null!=e.url&&navigation.navigate(e.url,{state:e.getState(),info:"react-transition",history:"replace"})}}if("object"===typeof navigation){var n=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),null!==a&&(a(),a=null)}}}function qp(e){this._internalRoot=e}function Yp(e){this._internalRoot=e}Yp.prototype.render=qp.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(o(409));mp(t.current,qc(),e,t,null,null)},Yp.prototype.unmount=qp.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;mp(e.current,2,null,e,null,null),ed(),t[Ue]=null}},Yp.prototype.unstable_scheduleHydration=function(e){if(e){var t=Oe();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Pp.length&&0!==t&&t<Pp[r].priority;r++);Pp.splice(r,0,e),0===r&&Op(e)}};var Gp=a.version;if("19.2.4"!==Gp)throw Error(o(527,Gp,"19.2.4"));D.findDOMNode=function(e){var t=e._reactInternals;if(void 0===t){if("function"===typeof e.render)throw Error(o(188));throw e=Object.keys(e).join(","),Error(o(268,e))}return e=function(e){var t=e.alternate;if(!t){if(null===(t=s(e)))throw Error(o(188));return t!==e?null:e}for(var r=e,n=t;;){var a=r.return;if(null===a)break;var i=a.alternate;if(null===i){if(null!==(n=a.return)){r=n;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===r)return u(a),e;if(i===n)return u(a),t;i=i.sibling}throw Error(o(188))}if(r.return!==n.return)r=a,n=i;else{for(var l=!1,c=a.child;c;){if(c===r){l=!0,r=a,n=i;break}if(c===n){l=!0,n=a,r=i;break}c=c.sibling}if(!l){for(c=i.child;c;){if(c===r){l=!0,r=i,n=a;break}if(c===n){l=!0,n=i,r=a;break}c=c.sibling}if(!l)throw Error(o(189))}}if(r.alternate!==n)throw Error(o(190))}if(3!==r.tag)throw Error(o(188));return r.stateNode.current===r?e:t}(t),e=null===(e=null!==e?p(e):null)?null:e.stateNode};var Qp={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.4"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var Jp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jp.isDisabled&&Jp.supportsFiber)try{xe=Jp.inject(Qp),ve=Jp}catch(Zp){}}t.createRoot=function(e,t){if(!l(e))throw Error(o(299));var r=!1,n="",a=Sl,i=$l,s=zl;return null!==t&&void 0!==t&&(!0===t.unstable_strictMode&&(r=!0),void 0!==t.identifierPrefix&&(n=t.identifierPrefix),void 0!==t.onUncaughtError&&(a=t.onUncaughtError),void 0!==t.onCaughtError&&(i=t.onCaughtError),void 0!==t.onRecoverableError&&(s=t.onRecoverableError)),t=hp(e,1,!1,null,0,r,n,null,a,i,s,Wp),e[Ue]=t.current,eu(e),new qp(t)}},672(e,t,r){var n=r(43);function a(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var o={d:{f:i,r:function(){throw Error(a(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");var s=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){return"font"===e?"":"string"===typeof t?"use-credentials"===t?t:"":void 0}t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,t.createPortal=function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(a(299));return function(e,t,r){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:l,key:null==n?null:""+n,children:e,containerInfo:t,implementation:r}}(e,t,null,r)},t.flushSync=function(e){var t=s.T,r=o.p;try{if(s.T=null,o.p=2,e)return e()}finally{s.T=t,o.p=r,o.d.f()}},t.preconnect=function(e,t){"string"===typeof e&&(t?t="string"===typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:t=null,o.d.C(e,t))},t.prefetchDNS=function(e){"string"===typeof e&&o.d.D(e)},t.preinit=function(e,t){if("string"===typeof e&&t&&"string"===typeof t.as){var r=t.as,n=c(r,t.crossOrigin),a="string"===typeof t.integrity?t.integrity:void 0,i="string"===typeof t.fetchPriority?t.fetchPriority:void 0;"style"===r?o.d.S(e,"string"===typeof t.precedence?t.precedence:void 0,{crossOrigin:n,integrity:a,fetchPriority:i}):"script"===r&&o.d.X(e,{crossOrigin:n,integrity:a,fetchPriority:i,nonce:"string"===typeof t.nonce?t.nonce:void 0})}},t.preinitModule=function(e,t){if("string"===typeof e)if("object"===typeof t&&null!==t){if(null==t.as||"script"===t.as){var r=c(t.as,t.crossOrigin);o.d.M(e,{crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0})}}else null==t&&o.d.M(e)},t.preload=function(e,t){if("string"===typeof e&&"object"===typeof t&&null!==t&&"string"===typeof t.as){var r=t.as,n=c(r,t.crossOrigin);o.d.L(e,r,{crossOrigin:n,integrity:"string"===typeof t.integrity?t.integrity:void 0,nonce:"string"===typeof t.nonce?t.nonce:void 0,type:"string"===typeof t.type?t.type:void 0,fetchPriority:"string"===typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"===typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"===typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"===typeof t.imageSizes?t.imageSizes:void 0,media:"string"===typeof t.media?t.media:void 0})}},t.preloadModule=function(e,t){if("string"===typeof e)if(t){var r=c(t.as,t.crossOrigin);o.d.m(e,{as:"string"===typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:r,integrity:"string"===typeof t.integrity?t.integrity:void 0})}else o.d.m(e)},t.requestFormReset=function(e){o.d.r(e)},t.unstable_batchedUpdates=function(e,t){return e(t)},t.useFormState=function(e,t,r){return s.H.useFormState(e,t,r)},t.useFormStatus=function(){return s.H.useHostTransitionStatus()},t.version="19.2.4"},391(e,t,r){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=r(4)},950(e,t,r){!function e(){if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),e.exports=r(672)},799(e,t){var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function a(e,t,n){var a=null;if(void 0!==n&&(a=""+n),void 0!==t.key&&(a=""+t.key),"key"in t)for(var i in n={},t)"key"!==i&&(n[i]=t[i]);else n=t;return t=n.ref,{$$typeof:r,type:e,key:a,ref:void 0!==t?t:null,props:n}}t.Fragment=n,t.jsx=a,t.jsxs=a},288(e,t){var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.consumer"),s=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.for("react.activity"),f=Symbol.iterator;var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,x={};function v(e,t,r){this.props=e,this.context=t,this.refs=x,this.updater=r||m}function b(){}function y(e,t,r){this.props=e,this.context=t,this.refs=x,this.updater=r||m}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!==typeof e&&"function"!==typeof e&&null!=e)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},b.prototype=v.prototype;var k=y.prototype=new b;k.constructor=y,g(k,v.prototype),k.isPureReactComponent=!0;var j=Array.isArray;function w(){}var S={H:null,A:null,T:null,S:null},$=Object.prototype.hasOwnProperty;function z(e,t,n){var a=n.ref;return{$$typeof:r,type:e,key:t,ref:void 0!==a?a:null,props:n}}function E(e){return"object"===typeof e&&null!==e&&e.$$typeof===r}var _=/\/+/g;function N(e,t){return"object"===typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function A(e,t,a,i,o){var l=typeof e;"undefined"!==l&&"boolean"!==l||(e=null);var s,c,d=!1;if(null===e)d=!0;else switch(l){case"bigint":case"string":case"number":d=!0;break;case"object":switch(e.$$typeof){case r:case n:d=!0;break;case p:return A((d=e._init)(e._payload),t,a,i,o)}}if(d)return o=o(e),d=""===i?"."+N(e,0):i,j(o)?(a="",null!=d&&(a=d.replace(_,"$&/")+"/"),A(o,t,a,"",function(e){return e})):null!=o&&(E(o)&&(s=o,c=a+(null==o.key||e&&e.key===o.key?"":(""+o.key).replace(_,"$&/")+"/")+d,o=z(s.type,c,s.props)),t.push(o)),1;d=0;var u,h=""===i?".":i+":";if(j(e))for(var m=0;m<e.length;m++)d+=A(i=e[m],t,a,l=h+N(i,m),o);else if("function"===typeof(m=null===(u=e)||"object"!==typeof u?null:"function"===typeof(u=f&&u[f]||u["@@iterator"])?u:null))for(e=m.call(e),m=0;!(i=e.next()).done;)d+=A(i=i.value,t,a,l=h+N(i,m++),o);else if("object"===l){if("function"===typeof e.then)return A(function(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch("string"===typeof e.status?e.then(w,w):(e.status="pending",e.then(function(t){"pending"===e.status&&(e.status="fulfilled",e.value=t)},function(t){"pending"===e.status&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}(e),t,a,i,o);throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return d}function C(e,t,r){if(null==e)return e;var n=[],a=0;return A(e,n,"","",function(e){return t.call(r,e,a++)}),n}function F(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var T="function"===typeof reportError?reportError:function(e){if("object"===typeof window&&"function"===typeof window.ErrorEvent){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:"object"===typeof e&&null!==e&&"string"===typeof e.message?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if("object"===typeof process&&"function"===typeof process.emit)return void process.emit("uncaughtException",e);console.error(e)},P={map:C,forEach:function(e,t,r){C(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return C(e,function(){t++}),t},toArray:function(e){return C(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};t.Activity=h,t.Children=P,t.Component=v,t.Fragment=a,t.Profiler=o,t.PureComponent=y,t.StrictMode=i,t.Suspense=d,t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,t.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},t.cache=function(e){return function(){return e.apply(null,arguments)}},t.cacheSignal=function(){return null},t.cloneElement=function(e,t,r){if(null===e||void 0===e)throw Error("The argument must be a React element, but you passed "+e+".");var n=g({},e.props),a=e.key;if(null!=t)for(i in void 0!==t.key&&(a=""+t.key),t)!$.call(t,i)||"key"===i||"__self"===i||"__source"===i||"ref"===i&&void 0===t.ref||(n[i]=t[i]);var i=arguments.length-2;if(1===i)n.children=r;else if(1<i){for(var o=Array(i),l=0;l<i;l++)o[l]=arguments[l+2];n.children=o}return z(e.type,a,n)},t.createContext=function(e){return(e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider=e,e.Consumer={$$typeof:l,_context:e},e},t.createElement=function(e,t,r){var n,a={},i=null;if(null!=t)for(n in void 0!==t.key&&(i=""+t.key),t)$.call(t,n)&&"key"!==n&&"__self"!==n&&"__source"!==n&&(a[n]=t[n]);var o=arguments.length-2;if(1===o)a.children=r;else if(1<o){for(var l=Array(o),s=0;s<o;s++)l[s]=arguments[s+2];a.children=l}if(e&&e.defaultProps)for(n in o=e.defaultProps)void 0===a[n]&&(a[n]=o[n]);return z(e,i,a)},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:F}},t.memo=function(e,t){return{$$typeof:u,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=S.T,r={};S.T=r;try{var n=e(),a=S.S;null!==a&&a(r,n),"object"===typeof n&&null!==n&&"function"===typeof n.then&&n.then(w,T)}catch(i){T(i)}finally{null!==t&&null!==r.types&&(t.types=r.types),S.T=t}},t.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},t.use=function(e){return S.H.use(e)},t.useActionState=function(e,t,r){return S.H.useActionState(e,t,r)},t.useCallback=function(e,t){return S.H.useCallback(e,t)},t.useContext=function(e){return S.H.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},t.useEffect=function(e,t){return S.H.useEffect(e,t)},t.useEffectEvent=function(e){return S.H.useEffectEvent(e)},t.useId=function(){return S.H.useId()},t.useImperativeHandle=function(e,t,r){return S.H.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},t.useMemo=function(e,t){return S.H.useMemo(e,t)},t.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},t.useReducer=function(e,t,r){return S.H.useReducer(e,t,r)},t.useRef=function(e){return S.H.useRef(e)},t.useState=function(e){return S.H.useState(e)},t.useSyncExternalStore=function(e,t,r){return S.H.useSyncExternalStore(e,t,r)},t.useTransition=function(){return S.H.useTransition()},t.version="19.2.4"},43(e,t,r){e.exports=r(288)},579(e,t,r){e.exports=r(799)},896(e,t){function r(e,t){var r=e.length;e.push(t);e:for(;0<r;){var n=r-1>>>1,a=e[n];if(!(0<i(a,t)))break e;e[n]=t,e[r]=a,r=n}}function n(e){return 0===e.length?null:e[0]}function a(e){if(0===e.length)return null;var t=e[0],r=e.pop();if(r!==t){e[0]=r;e:for(var n=0,a=e.length,o=a>>>1;n<o;){var l=2*(n+1)-1,s=e[l],c=l+1,d=e[c];if(0>i(s,r))c<a&&0>i(d,s)?(e[n]=d,e[c]=r,n=c):(e[n]=s,e[l]=r,n=l);else{if(!(c<a&&0>i(d,r)))break e;e[n]=d,e[c]=r,n=c}}}return t}function i(e,t){var r=e.sortIndex-t.sortIndex;return 0!==r?r:e.id-t.id}if(t.unstable_now=void 0,"object"===typeof performance&&"function"===typeof performance.now){var o=performance;t.unstable_now=function(){return o.now()}}else{var l=Date,s=l.now();t.unstable_now=function(){return l.now()-s}}var c=[],d=[],u=1,p=null,h=3,f=!1,m=!1,g=!1,x=!1,v="function"===typeof setTimeout?setTimeout:null,b="function"===typeof clearTimeout?clearTimeout:null,y="undefined"!==typeof setImmediate?setImmediate:null;function k(e){for(var t=n(d);null!==t;){if(null===t.callback)a(d);else{if(!(t.startTime<=e))break;a(d),t.sortIndex=t.expirationTime,r(c,t)}t=n(d)}}function j(e){if(g=!1,k(e),!m)if(null!==n(c))m=!0,S||(S=!0,w());else{var t=n(d);null!==t&&F(j,t.startTime-e)}}var w,S=!1,$=-1,z=5,E=-1;function _(){return!!x||!(t.unstable_now()-E<z)}function N(){if(x=!1,S){var e=t.unstable_now();E=e;var r=!0;try{e:{m=!1,g&&(g=!1,b($),$=-1),f=!0;var i=h;try{t:{for(k(e),p=n(c);null!==p&&!(p.expirationTime>e&&_());){var o=p.callback;if("function"===typeof o){p.callback=null,h=p.priorityLevel;var l=o(p.expirationTime<=e);if(e=t.unstable_now(),"function"===typeof l){p.callback=l,k(e),r=!0;break t}p===n(c)&&a(c),k(e)}else a(c);p=n(c)}if(null!==p)r=!0;else{var s=n(d);null!==s&&F(j,s.startTime-e),r=!1}}break e}finally{p=null,h=i,f=!1}r=void 0}}finally{r?w():S=!1}}}if("function"===typeof y)w=function(){y(N)};else if("undefined"!==typeof MessageChannel){var A=new MessageChannel,C=A.port2;A.port1.onmessage=N,w=function(){C.postMessage(null)}}else w=function(){v(N,0)};function F(e,r){$=v(function(){e(t.unstable_now())},r)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var r=h;h=t;try{return e()}finally{h=r}},t.unstable_requestPaint=function(){x=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var r=h;h=e;try{return t()}finally{h=r}},t.unstable_scheduleCallback=function(e,a,i){var o=t.unstable_now();switch("object"===typeof i&&null!==i?i="number"===typeof(i=i.delay)&&0<i?o+i:o:i=o,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return e={id:u++,callback:a,priorityLevel:e,startTime:i,expirationTime:l=i+l,sortIndex:-1},i>o?(e.sortIndex=i,r(d,e),null===n(c)&&e===n(d)&&(g?(b($),$=-1):g=!0,F(j,i-o))):(e.sortIndex=l,r(c,e),m||f||(m=!0,S||(S=!0,w()))),e},t.unstable_shouldYield=_,t.unstable_wrapCallback=function(e){var t=h;return function(){var r=h;h=t;try{return e.apply(this,arguments)}finally{h=r}}}},853(e,t,r){e.exports=r(896)}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(n,a){if(1&a&&(n=this(n)),8&a)return n;if("object"===typeof n&&n){if(4&a&&n.__esModule)return n;if(16&a&&"function"===typeof n.then)return n}var i=Object.create(null);r.r(i);var o={};e=e||[null,t({}),t([]),t(t)];for(var l=2&a&&n;("object"==typeof l||"function"==typeof l)&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach(e=>o[e]=()=>n[e]);return o.default=()=>n,r.d(i,o),i}})(),r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.nc=void 0;var n=r(43),a=r.t(n,2),i=r(391);const o="10.55.0",l=globalThis;function s(){return c(l),l}function c(e){const t=e.__SENTRY__=e.__SENTRY__||{};return t.version=t.version||o,t[o]=t[o]||{}}function d(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:l;const n=r.__SENTRY__=r.__SENTRY__||{},a=n[o]=n[o]||{};return a[e]||(a[e]=t())}const u="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,p=["debug","info","warn","error","log","assert","trace"],h={};function f(e){if(!("console"in l))return e();const t=l.console,r={},n=Object.keys(h);n.forEach(e=>{const n=h[e];r[e]=t[e],t[e]=n});try{return e()}finally{n.forEach(e=>{t[e]=r[e]})}}function m(){return x().enabled}function g(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];u&&m()&&f(()=>{l.console[e](`Sentry Logger [${e}]:`,...r)})}function x(){return u?d("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const v={enable:function(){x().enabled=!0},disable:function(){x().enabled=!1},isEnabled:m,log:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("log",...t)},warn:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("warn",...t)},error:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];g("error",...t)}},b=Object.prototype.toString;function y(e){switch(b.call(e)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return A(e,Error)}}function k(e,t){return b.call(e)===`[object ${t}]`}function j(e){return k(e,"ErrorEvent")}function w(e){return k(e,"DOMError")}function S(e){return k(e,"String")}function $(e){return"object"===typeof e&&null!==e&&"__sentry_template_string__"in e&&"__sentry_template_values__"in e}function z(e){return null===e||$(e)||"object"!==typeof e&&"function"!==typeof e}function E(e){return k(e,"Object")}function _(e){return"undefined"!==typeof Event&&A(e,Event)}function N(e){return Boolean(e?.then&&"function"===typeof e.then)}function A(e,t){try{return e instanceof t}catch{return!1}}function C(e){return"undefined"!==typeof Request&&A(e,Request)}function F(e,t,r){if(!(t in e))return;const n=e[t];if("function"!==typeof n)return;const a=r(n);"function"===typeof a&&P(a,n);try{e[t]=a}catch{u&&v.log(`Failed to replace method "${t}" in object`,e)}}function T(e,t,r){try{Object.defineProperty(e,t,{value:r,writable:!0,configurable:!0})}catch{u&&v.log(`Failed to add non-enumerable property "${String(t)}" to object`,e)}}function P(e,t){try{const r=t.prototype||{};e.prototype=t.prototype=r,T(e,"__sentry_original__",t)}catch{}}function D(e){return e.__sentry_original__}function L(e){if(y(e))return{message:e.message,name:e.name,stack:e.stack,...R(e)};if(_(e)){const{type:t,target:r,currentTarget:n,detail:a}=e;return{type:t,target:r,currentTarget:n,...a?{detail:a}:{},...R(e)}}return e}function R(e){return"object"===typeof e&&null!==e?Object.fromEntries(Object.entries(e)):{}}let O;function I(e){if(void 0!==O)return O?O(e):e();const t=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),r=l;return t in r&&"function"===typeof r[t]?(O=r[t],O(e)):(O=null,e())}function M(){return I(()=>Math.random())}function B(){return I(()=>Date.now())}let V;function U(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){const e=l;return e.crypto||e.msCrypto}();try{if(e?.randomUUID)return I(()=>e.randomUUID()).replace(/-/g,"")}catch{}return V||(V="10000000100040008000100000000000"),V.replace(/[018]/g,e=>(e^(16*M()&15)>>e/4).toString(16))}function K(e){return e.exception?.values?.[0]}function H(e){const{message:t,event_id:r}=e;if(t)return t;const n=K(e);return n?n.type&&n.value?`${n.type}: ${n.value}`:n.type||n.value||r||"<unknown>":r||"<unknown>"}function W(e,t,r){const n=e.exception=e.exception||{},a=n.values=n.values||[],i=a[0]=a[0]||{};i.value||(i.value=t||""),i.type||(i.type=r||"Error")}function q(e,t){const r=K(e);if(!r)return;const n=r.mechanism;if(r.mechanism={type:"generic",handled:!0,...n,...t},t&&"data"in t){const e={...n?.data,...t.data};r.mechanism.data=e}}function Y(e){if(function(e){try{return e.__sentry_captured__}catch{}}(e))return!0;try{T(e,"__sentry_captured__",!0)}catch{}return!1}function G(){return B()/1e3}let Q;function J(){return(Q??(Q=function(){const{performance:e}=l;if(!e?.now||!e.timeOrigin)return G;const t=e.timeOrigin;return()=>(t+I(()=>e.now()))/1e3}()))()}function X(e){const t=J(),r={sid:U(),init:!0,timestamp:t,started:t,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>function(e){return{sid:`${e.sid}`,init:e.init,started:new Date(1e3*e.started).toISOString(),timestamp:new Date(1e3*e.timestamp).toISOString(),status:e.status,errors:e.errors,did:"number"===typeof e.did||"string"===typeof e.did?`${e.did}`:void 0,duration:e.duration,abnormal_mechanism:e.abnormal_mechanism,attrs:{release:e.release,environment:e.environment,ip_address:e.ipAddress,user_agent:e.userAgent}}}(r)};return e&&Z(r,e),r}function Z(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t.user&&(!e.ipAddress&&t.user.ip_address&&(e.ipAddress=t.user.ip_address),e.did||t.did||(e.did=t.user.id||t.user.email||t.user.username)),e.timestamp=t.timestamp||J(),t.abnormal_mechanism&&(e.abnormal_mechanism=t.abnormal_mechanism),t.ignoreDuration&&(e.ignoreDuration=t.ignoreDuration),t.sid&&(e.sid=32===t.sid.length?t.sid:U()),void 0!==t.init&&(e.init=t.init),!e.did&&t.did&&(e.did=`${t.did}`),"number"===typeof t.started&&(e.started=t.started),e.ignoreDuration)e.duration=void 0;else if("number"===typeof t.duration)e.duration=t.duration;else{const t=e.timestamp-e.started;e.duration=t>=0?t:0}t.release&&(e.release=t.release),t.environment&&(e.environment=t.environment),!e.ipAddress&&t.ipAddress&&(e.ipAddress=t.ipAddress),!e.userAgent&&t.userAgent&&(e.userAgent=t.userAgent),"number"===typeof t.errors&&(e.errors=t.errors),t.status&&(e.status=t.status)}function ee(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;if(!t||"object"!==typeof t||r<=0)return t;if(e&&0===Object.keys(t).length)return e;const n={...e};for(const a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=ee(n[a],t[a],r-1));return n}function te(){return U()}function re(){return U().substring(16)}const ne="_sentrySpan";function ae(e,t){t?T(e,ne,t):delete e[ne]}function ie(e){return e[ne]}const oe=Symbol.for("sentry.skipNormalization"),le=Symbol.for("sentry.overrideNormalizationDepth");const se="?",ce=/\(error: (.*)\)/,de=/captureMessage|captureException/;function ue(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];const n=t.sort((e,t)=>e[0]-t[0]).map(e=>e[1]);return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;const a=[],i=e.split("\n");for(let o=t;o<i.length;o++){let e=i[o];e.length>1024&&(e=e.slice(0,1024));const t=ce.test(e)?e.replace(ce,"$1"):e;if(!t.includes("Error: ")){for(const e of n){const r=e(t);if(r){a.push(r);break}}if(a.length>=50+r)break}}return function(e){if(!e.length)return[];const t=Array.from(e);/sentryWrapped/.test(pe(t).function||"")&&t.pop();t.reverse(),de.test(pe(t).function||"")&&(t.pop(),de.test(pe(t).function||"")&&t.pop());return t.slice(0,50).map(e=>({...e,filename:e.filename||pe(t).filename,function:e.function||se}))}(a.slice(r))}}function pe(e){return e[e.length-1]||{}}const he="<anonymous>";function fe(e){try{return e&&"function"===typeof e&&e.name||he}catch{return he}}function me(e){const t=e.exception;if(t){const e=[];try{return t.values.forEach(t=>{t.stacktrace.frames&&e.push(...t.stacktrace.frames)}),e}catch{return}}}let ge;function xe(e){ge=e}function ve(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0;try{return ye("",e,t,r)}catch(n){return{ERROR:`**non-serializable** (${n})`}}}function be(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:102400;const n=ve(e,t);return a=n,function(e){return~-encodeURI(e).split(/%..|./).length}(JSON.stringify(a))>r?be(e,t-1,r):n;var a}function ye(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1/0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){const e=new WeakSet;function t(t){return!!e.has(t)||(e.add(t),!1)}function r(t){e.delete(t)}return[t,r]}();const[i,o]=a;if(null==t||["boolean","string"].includes(typeof t)||"number"===typeof t&&Number.isFinite(t))return t;const l=ke(e,t);if(!l.startsWith("[object "))return l;if(function(e){return Boolean(e[oe])}(t))return t;const s=function(e){const t=e[le];return"number"===typeof t?t:void 0}(t),c=void 0!==s?s:r;if(0===c)return l.replace("object ","");if(i(t))return"[Circular ~]";const d=t;if(d&&"function"===typeof d.toJSON)try{return ye("",d.toJSON(),c-1,n,a)}catch{}const u=Array.isArray(t)?[]:{};let p=0;const h=L(t);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(p>=n){u[f]="[MaxProperties ~]";break}const e=h[f];u[f]=ye(f,e,c-1,n,a),p++}return o(t),u}function ke(e,t){try{if(ge){const e=ge(t);if(e)return e}if("undefined"!==typeof globalThis&&t===globalThis)return"[Global]";if("number"===typeof t&&!Number.isFinite(t))return`[${t}]`;if("function"===typeof t)return`[Function: ${fe(t)}]`;if("symbol"===typeof t)return`[${String(t)}]`;if("bigint"===typeof t)return`[BigInt: ${String(t)}]`;const e=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(t);return`[object ${e}]`}catch(r){return`**non-serializable** (${r})`}}function je(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"string"!==typeof e||0===t||e.length<=t?e:`${e.slice(0,t)}...`}function we(e,t){if(!Array.isArray(e))return"";const r=[];for(let n=0;n<e.length;n++){const t=e[n];z(t)?r.push(String(t)):t instanceof Error?r.push(t.message?`${t.name}: ${t.message}`:t.name):r.push(ke(0,t))}return r.join(t)}function Se(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return!!S(e)&&(k(t,"RegExp")?t.test(e):S(t)?r?e===t:e.includes(t):"function"===typeof t&&t(e))}function $e(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(const n of t)if(Se(e,n,r))return!0;return!1}class ze{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:te(),sampleRand:M()}}clone(){const e=new ze;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,e._conversationId=this._conversationId,ae(e,ie(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Z(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setConversationId(e){return this._conversationId=e||void 0,this._notifyScopeListeners(),this}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,t){return this.setTags({[e]:t})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,t){return this.setAttributes({[e]:t})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,t){return this._extra={...this._extra,[e]:t},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,t){return null===t?delete this._contexts[e]:this._contexts[e]=t,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const t="function"===typeof e?e(this):e,r=t instanceof ze?t.getScopeData():E(t)?e:void 0,{tags:n,attributes:a,extra:i,user:o,contexts:l,level:s,fingerprint:c=[],propagationContext:d,conversationId:u}=r||{};return this._tags={...this._tags,...n},this._attributes={...this._attributes,...a},this._extra={...this._extra,...i},this._contexts={...this._contexts,...l},o&&Object.keys(o).length&&(this._user=o),s&&(this._level=s),c.length&&(this._fingerprint=c),d&&(this._propagationContext=d),u&&(this._conversationId=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,this._conversationId=void 0,ae(this,void 0),this._attachments=[],this.setPropagationContext({traceId:te(),sampleRand:M()}),this._notifyScopeListeners(),this}addBreadcrumb(e,t){const r="number"===typeof t?t:100;if(r<=0)return this;const n={timestamp:G(),...e,message:e.message?je(e.message,2048):e.message};return this._breadcrumbs.push(n),this._breadcrumbs.length>r&&(this._breadcrumbs=this._breadcrumbs.slice(-r),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:ie(this),conversationId:this._conversationId}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=ee(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,t){const r=t?.event_id||U();if(!this._client)return u&&v.warn("No client configured on scope - will not capture exception!"),r;const n=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:n,...t,event_id:r},this),r}captureMessage(e,t,r){const n=r?.event_id||U();if(!this._client)return u&&v.warn("No client configured on scope - will not capture message!"),n;const a=r?.syntheticException??new Error(e);return this._client.captureMessage(e,t,{originalException:e,syntheticException:a,...r,event_id:n},this),n}captureEvent(e,t){const r=e.event_id||t?.event_id||U();return this._client?(this._client.captureEvent(e,{...t,event_id:r},this),r):(u&&v.warn("No client configured on scope - will not capture event!"),r)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}const Ee=e=>e instanceof Promise&&!e[_e],_e=Symbol("chained PromiseLike"),Ne=(e,t)=>{if(!t)return e;let r=!1;for(const n in e){if(n in t)continue;r=!0;const a=e[n];"function"===typeof a?Object.defineProperty(t,n,{value:function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return a.apply(e,r)},enumerable:!0,configurable:!0,writable:!0}):t[n]=a}return r&&Object.assign(t,{[_e]:!0}),t};class Ae{constructor(e,t){let r,n;r=e||new ze,n=t||new ze,this._stack=[{scope:r}],this._isolationScope=n}withScope(e){const t=this._pushScope();let r;try{r=e(t)}catch(n){throw this._popScope(),n}return N(r)?((e,t,r)=>{const n=e.then(e=>(t(e),e),e=>{throw r(e),e});return Ee(n)&&Ee(e)?n:Ne(e,n)})(r,()=>this._popScope(),()=>this._popScope()):(this._popScope(),r)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return!(this._stack.length<=1)&&!!this._stack.pop()}}function Ce(){const e=c(s());return e.stack=e.stack||new Ae(d("defaultCurrentScope",()=>new ze),d("defaultIsolationScope",()=>new ze))}function Fe(e){return Ce().withScope(e)}function Te(e,t){const r=Ce();return r.withScope(()=>(r.getStackTop().scope=e,t(e)))}function Pe(e){return Ce().withScope(()=>e(Ce().getIsolationScope()))}function De(e){const t=c(e);return t.acs?t.acs:{withIsolationScope:Pe,withScope:Fe,withSetScope:Te,withSetIsolationScope:(e,t)=>Pe(t),getCurrentScope:()=>Ce().getScope(),getIsolationScope:()=>Ce().getIsolationScope()}}let Le;function Re(){return De(s()).getCurrentScope()}function Oe(){return De(s()).getIsolationScope()}function Ie(){return Re().getClient()}function Me(e){const t=Le?.();if(t)return{trace_id:t.traceId,span_id:t.spanId};const r=e.getPropagationContext(),{traceId:n,parentSpanId:a,propagationSpanId:i}=r,o={trace_id:n,span_id:i||re()};return a&&(o.parent_span_id=a),o}const Be="production";function Ve(e){return new Ke(t=>{t(e)})}function Ue(e){return new Ke((t,r)=>{r(e)})}class Ke{constructor(e){this._state=0,this._handlers=[],this._runExecutor(e)}then(e,t){return new Ke((r,n)=>{this._handlers.push([!1,t=>{if(e)try{r(e(t))}catch(a){n(a)}else r(t)},e=>{if(t)try{r(t(e))}catch(a){n(a)}else n(e)}]),this._executeHandlers()})}catch(e){return this.then(e=>e,e)}finally(e){return new Ke((t,r)=>{let n,a;return this.then(t=>{a=!1,n=t,e&&e()},t=>{a=!0,n=t,e&&e()}).then(()=>{a?r(n):t(n)})})}_executeHandlers(){if(0===this._state)return;const e=this._handlers.slice();this._handlers=[],e.forEach(e=>{e[0]||(1===this._state&&e[1](this._value),2===this._state&&e[2](this._value),e[0]=!0)})}_runExecutor(e){const t=(e,t)=>{0===this._state&&(N(t)?t.then(r,n):(this._state=e,this._value=t,this._executeHandlers()))},r=e=>{t(1,e)},n=e=>{t(2,e)};try{e(r,n)}catch(a){n(a)}}}function He(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;try{const a=We(t,r,e,n);return N(a)?a:Ve(a)}catch(a){return Ue(a)}}function We(e,t,r,n){const a=r[n];if(!e||!a)return e;const i=a({...e},t);return u&&null===i&&v.log(`Event processor "${a.id||"?"}" dropped event`),N(i)?i.then(e=>We(e,t,r,n+1)):We(i,t,r,n+1)}let qe,Ye,Ge,Qe;function Je(e){const t=l._sentryDebugIds,r=l._debugIds;if(!t&&!r)return{};const n=t?Object.keys(t):[],a=r?Object.keys(r):[];if(Qe&&n.length===Ye&&a.length===Ge)return Qe;Ye=n.length,Ge=a.length,Qe={},qe||(qe={});const i=(t,r)=>{for(const n of t){const t=r[n],a=qe?.[n];if(a&&Qe&&t)Qe[a[0]]=t,qe&&(qe[n]=[a[0],t]);else if(t){const r=e(n);for(let e=r.length-1;e>=0;e--){const a=r[e],i=a?.filename;if(i&&Qe&&qe){Qe[i]=t,qe[n]=[i,t];break}}}}};return t&&i(n,t),r&&i(a,r),Qe}const Xe="sentry.profile_id",Ze="sentry.exclusive_time";const et="sentry-";function tt(e){if(e&&(S(e)||Array.isArray(e)))return Array.isArray(e)?e.reduce((e,t)=>{const r=rt(t);return Object.entries(r).forEach(t=>{let[r,n]=t;e[r]=n}),e},{}):rt(e)}function rt(e){return e.split(",").map(e=>{const t=e.indexOf("=");if(-1===t)return[];return[e.slice(0,t),e.slice(t+1)].map(e=>{try{return decodeURIComponent(e.trim())}catch{return}})}).reduce((e,t)=>{let[r,n]=t;return r&&n&&(e[r]=n),e},{})}const nt=/^o(\d+)\./,at=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function it(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const{host:r,path:n,pass:a,port:i,projectId:o,protocol:l,publicKey:s}=e;return`${l}://${s}${t&&a?`:${a}`:""}@${r}${i?`:${i}`:""}/${n?`${n}/`:n}${o}`}function ot(e){return{protocol:e.protocol,publicKey:e.publicKey||"",pass:e.pass||"",host:e.host,port:e.port||"",path:e.path||"",projectId:e.projectId}}function lt(e){const t=e.getOptions(),{host:r}=e.getDsn()||{};let n;return t.orgId?n=String(t.orgId):r&&(n=function(e){const t=e.match(nt);return t?.[1]}(r)),n}function st(e){const t="string"===typeof e?function(e){const t=at.exec(e);if(!t)return void f(()=>{console.error(`Invalid Sentry Dsn: ${e}`)});const[r,n,a="",i="",o="",l=""]=t.slice(1);let s="",c=l;const d=c.split("/");if(d.length>1&&(s=d.slice(0,-1).join("/"),c=d.pop()),c){const e=c.match(/^\d+/);e&&(c=e[0])}return ot({host:i,pass:a,path:s,projectId:c,port:o,protocol:r,publicKey:n})}(e):ot(e);if(t&&function(e){if(!u)return!0;const{port:t,projectId:r,protocol:n}=e;return!["protocol","publicKey","host","projectId"].find(t=>!e[t]&&(v.error(`Invalid Sentry Dsn: ${t} missing`),!0))&&(r.match(/^\d+$/)?function(e){return"http"===e||"https"===e}(n)?!t||!isNaN(parseInt(t,10))||(v.error(`Invalid Sentry Dsn: Invalid port ${t}`),!1):(v.error(`Invalid Sentry Dsn: Invalid protocol ${n}`),!1):(v.error(`Invalid Sentry Dsn: Invalid projectId ${r}`),!1))}(t))return t}function ct(e,t){const{value:r,unit:n}="object"===typeof(a=e)&&null!=a&&!Array.isArray(a)&&Object.keys(a).includes("value")?e:{value:e,unit:void 0};var a;const i=function(e){if(Array.isArray(e))return{value:e,type:"array"};const t="string"===typeof e?"string":"boolean"===typeof e?"boolean":"number"!==typeof e||Number.isNaN(e)?null:Number.isInteger(e)?"integer":"double";if(t)return{value:e,type:t}}(r),o=n&&"string"===typeof n?{unit:n}:{};if(i)return{...i,...o};if(!t||"skip-undefined"===t&&void 0===r)return;let l="";try{l=JSON.stringify(r)??""}catch{}return{value:l,type:"string",...o}}function dt(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const r={};for(const[n,a]of Object.entries(e??{})){const e=ct(a,t);e&&(r[n]=e)}return r}function ut(e){if(e){if("object"===typeof e&&"deref"in e&&"function"===typeof e.deref)try{return e.deref()}catch{return}return e}}const pt="_sentryScope",ht="_sentryIsolationScope";function ft(e){const t=e;return{scope:t[pt],isolationScope:ut(t[ht])}}let mt=!1;function gt(e){const{spanId:t,traceId:r,isRemote:n}=e.spanContext(),a=n?t:yt(e).parent_span_id,i=ft(e).scope;return{parent_span_id:a,span_id:n?i?.getPropagationContext().propagationSpanId||re():t,trace_id:r}}function xt(e){return e&&e.length>0?e.map(e=>{let{context:{spanId:t,traceId:r,traceFlags:n,...a},attributes:i}=e;return{span_id:t,trace_id:r,sampled:1===n,attributes:i,...a}}):void 0}function vt(e){return"number"===typeof e?bt(e):Array.isArray(e)?e[0]+e[1]/1e9:e instanceof Date?bt(e.getTime()):J()}function bt(e){return e>9999999999?e/1e3:e}function yt(e){if(wt(e))return e.getSpanJSON();const{spanId:t,traceId:r}=e.spanContext();if(jt(e)){const{attributes:n,startTime:a,name:i,endTime:o,status:l,links:s}=e;return{span_id:t,trace_id:r,data:n,description:i,parent_span_id:kt(e),start_timestamp:vt(a),timestamp:vt(o)||void 0,status:$t(l),op:n["sentry.op"],origin:n["sentry.origin"],links:xt(s)}}return{span_id:t,trace_id:r,start_timestamp:0,data:{}}}function kt(e){return"parentSpanId"in e?e.parentSpanId:"parentSpanContext"in e?e.parentSpanContext?.spanId:void 0}function jt(e){const t=e;return!!t.attributes&&!!t.startTime&&!!t.name&&!!t.endTime&&!!t.status}function wt(e){return"function"===typeof e.getSpanJSON}function St(e){const{traceFlags:t}=e.spanContext();return 1===t}function $t(e){if(e&&0!==e.code)return 1===e.code?"ok":e.message||"internal_error"}const zt="_sentryRootSpan";const Et=_t;function _t(e){return e[zt]||e}function Nt(){mt||(f(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),mt=!0)}const At="_frozenDsc";function Ct(e,t){const r=t.getOptions(),{publicKey:n}=t.getDsn()||{},a={environment:r.environment||Be,release:r.release,public_key:n,trace_id:e,org_id:lt(t)};return t.emit("createDsc",a),a}function Ft(e){const t=Ie();if(!t)return{};const r=Et(e),n=yt(r),a=n.data,i=r.spanContext().traceState,o=i?.get("sentry.sample_rate")??a["sentry.sample_rate"]??a["sentry.previous_trace_sample_rate"];function l(e){return"number"!==typeof o&&"string"!==typeof o||(e.sample_rate=`${o}`),e}const s=r[At];if(s)return l(s);const c=i?.get("sentry.dsc"),d=c&&function(e){const t=tt(e);if(!t)return;const r=Object.entries(t).reduce((e,t)=>{let[r,n]=t;return r.startsWith(et)&&(e[r.slice(7)]=n),e},{});return Object.keys(r).length>0?r:void 0}(c);if(d)return l(d);const u=Ct(e.spanContext().traceId,t),p=a["sentry.source"]??a["sentry.span.source"],h=n.description;return"url"!==p&&h&&(u.transaction=h),function(e){if("boolean"===typeof __SENTRY_TRACING__&&!__SENTRY_TRACING__)return!1;const t=e||Ie()?.getOptions();return!!t&&(null!=t.tracesSampleRate||!!t.tracesSampler)}()&&(u.sampled=String(St(r)),u.sample_rand=i?.get("sentry.sample_rand")??ft(r).scope?.getPropagationContext().sampleRand.toString()),l(u),t.emit("createDsc",u,r),u}function Tt(e,t){const{fingerprint:r,span:n,breadcrumbs:a,sdkProcessingMetadata:i}=t;!function(e,t){const{extra:r,tags:n,user:a,contexts:i,level:o,transactionName:l}=t;Object.keys(r).length&&(e.extra={...r,...e.extra});Object.keys(n).length&&(e.tags={...n,...e.tags});Object.keys(a).length&&(e.user={...a,...e.user});Object.keys(i).length&&(e.contexts={...i,...e.contexts});o&&(e.level=o);l&&"transaction"!==e.type&&(e.transaction=l)}(e,t),n&&function(e,t){e.contexts={trace:gt(t),...e.contexts},e.sdkProcessingMetadata={dynamicSamplingContext:Ft(t),...e.sdkProcessingMetadata};const r=Et(t),n=yt(r).description;n&&!e.transaction&&"transaction"===e.type&&(e.transaction=n)}(e,n),function(e,t){e.fingerprint=e.fingerprint?Array.isArray(e.fingerprint)?e.fingerprint:[e.fingerprint]:[],t&&(e.fingerprint=e.fingerprint.concat(t));e.fingerprint.length||delete e.fingerprint}(e,r),function(e,t){const r=[...e.breadcrumbs||[],...t];e.breadcrumbs=r.length?r:void 0}(e,a),function(e,t){e.sdkProcessingMetadata={...e.sdkProcessingMetadata,...t}}(e,i)}function Pt(e,t){const{extra:r,tags:n,attributes:a,user:i,contexts:o,level:l,sdkProcessingMetadata:s,breadcrumbs:c,fingerprint:d,eventProcessors:u,attachments:p,propagationContext:h,transactionName:f,span:m}=t;Dt(e,"extra",r),Dt(e,"tags",n),Dt(e,"attributes",a),Dt(e,"user",i),Dt(e,"contexts",o),e.sdkProcessingMetadata=ee(e.sdkProcessingMetadata,s,2),l&&(e.level=l),f&&(e.transactionName=f),m&&(e.span=m),c.length&&(e.breadcrumbs=[...e.breadcrumbs,...c]),d.length&&(e.fingerprint=[...e.fingerprint,...d]),u.length&&(e.eventProcessors=[...e.eventProcessors,...u]),p.length&&(e.attachments=[...e.attachments,...p]),e.propagationContext={...e.propagationContext,...h}}function Dt(e,t,r){e[t]=ee(e[t],r,1)}function Lt(e,t){const r=d("globalScope",()=>new ze).getScopeData();return e&&Pt(r,e.getScopeData()),t&&Pt(r,t.getScopeData()),r}function Rt(e,t,r,n,a,i){const{normalizeDepth:o=3,normalizeMaxBreadth:l=1e3}=e,s={...t,event_id:t.event_id||r.event_id||U(),timestamp:t.timestamp||G()},c=r.integrations||e.integrations.map(e=>e.name);!function(e,t){const{environment:r,release:n,dist:a,maxValueLength:i}=t;e.environment=e.environment||r||Be,!e.release&&n&&(e.release=n);!e.dist&&a&&(e.dist=a);const o=e.request;o?.url&&i&&(o.url=je(o.url,i));i&&e.exception?.values?.forEach(e=>{e.value&&(e.value=je(e.value,i))})}(s,e),function(e,t){t.length>0&&(e.sdk=e.sdk||{},e.sdk.integrations=[...e.sdk.integrations||[],...t])}(s,c),a&&a.emit("applyFrameMetadata",t),void 0===t.type&&function(e,t){const r=Je(t);e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.filename&&(e.debug_id=r[e.filename])})})}(s,e.stackParser);const d=function(e,t){if(!t)return e;const r=e?e.clone():new ze;return r.update(t),r}(n,r.captureContext);r.mechanism&&q(s,r.mechanism);const u=a?a.getEventProcessors():[],p=Lt(i,d),h=[...r.attachments||[],...p.attachments];h.length&&(r.attachments=h),Tt(s,p);const f=[...u,...p.eventProcessors];return(r.data&&!0===r.data.__sentry__?Ve(s):He(f,s,r)).then(e=>(e&&function(e){const t={};if(e.exception?.values?.forEach(e=>{e.stacktrace?.frames?.forEach(e=>{e.debug_id&&(e.abs_path?t[e.abs_path]=e.debug_id:e.filename&&(t[e.filename]=e.debug_id),delete e.debug_id)})}),0===Object.keys(t).length)return;e.debug_meta=e.debug_meta||{},e.debug_meta.images=e.debug_meta.images||[];const r=e.debug_meta.images;Object.entries(t).forEach(e=>{let[t,n]=e;r.push({type:"sourcemap",code_file:t,debug_id:n})})}(e),"number"===typeof o&&o>0?function(e,t,r){if(!e)return null;const n={...e,...e.breadcrumbs&&{breadcrumbs:e.breadcrumbs.map(e=>({...e,...e.data&&{data:ve(e.data,t,r)}}))},...e.user&&{user:ve(e.user,t,r)},...e.contexts&&{contexts:ve(e.contexts,t,r)},...e.extra&&{extra:ve(e.extra,t,r)}};e.contexts?.trace&&n.contexts&&(n.contexts.trace=e.contexts.trace,e.contexts.trace.data&&(n.contexts.trace.data=ve(e.contexts.trace.data,t,r)));e.spans&&(n.spans=e.spans.map(e=>({...e,...e.data&&{data:ve(e.data,t,r)}})));e.contexts?.flags&&n.contexts&&(n.contexts.flags=ve(e.contexts.flags,3,r));return n}(e,o,l):e))}function Ot(e){if(e)return function(e){return e instanceof ze||"function"===typeof e}(e)||function(e){return Object.keys(e).some(e=>It.includes(e))}(e)?{captureContext:e}:e}const It=["user","level","extra","contexts","tags","fingerprint","propagationContext"];function Mt(e,t){return Re().captureEvent(e,t)}function Bt(e){const t=Oe(),{user:r}=Lt(t,Re()),{userAgent:n}=l.navigator||{},a=X({user:r,...n&&{userAgent:n},...e}),i=t.getSession();return"ok"===i?.status&&Z(i,{status:"exited"}),Vt(),t.setSession(a),a}function Vt(){const e=Oe(),t=Re().getSession()||e.getSession();t&&function(e,t){let r={};t?r={status:t}:"ok"===e.status&&(r={status:"exited"}),Z(e,r)}(t),Ut(),e.setSession()}function Ut(){const e=Oe(),t=Ie(),r=e.getSession();r&&t&&t.captureSession(r)}function Kt(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]?Vt():Ut()}const Ht=[];function Wt(e){const t=e.defaultIntegrations||[],r=e.integrations;let n;if(t.forEach(e=>{e.isDefaultInstance=!0}),Array.isArray(r))n=[...t,...r];else if("function"===typeof r){const e=r(t);n=Array.isArray(e)?e:[e]}else n=t;return function(e){const t={};return e.forEach(e=>{const{name:r}=e,n=t[r];n&&!n.isDefaultInstance&&e.isDefaultInstance||(t[r]=e)}),Object.values(t)}(n)}function qt(e,t){for(const r of t)r?.afterAllSetup&&r.afterAllSetup(e)}function Yt(e,t,r){if(r[t.name])u&&v.log(`Integration skipped because it was already installed: ${t.name}`);else{if(r[t.name]=t,Ht.includes(t.name)||"function"!==typeof t.setupOnce||(t.setupOnce(),Ht.push(t.name)),t.setup&&"function"===typeof t.setup&&t.setup(e),"function"===typeof t.preprocessEvent){const r=t.preprocessEvent.bind(t);e.on("preprocessEvent",(t,n)=>r(t,n,e))}if("function"===typeof t.processEvent){const r=t.processEvent.bind(t),n=Object.assign((t,n)=>r(t,n,e),{id:t.name});e.addEventProcessor(n)}["processSpan","processSegmentSpan"].forEach(r=>{const n=t[r];"function"===typeof n&&e.on(r,r=>n.call(t,r,e))}),u&&v.log(`Integration installed: ${t.name}`)}}function Gt(e){const t=[];e.message&&t.push(e.message);try{const r=e.exception.values[e.exception.values.length-1];r?.value&&(t.push(r.value),r.type&&t.push(`${r.type}: ${r.value}`))}catch{}return t}const Qt=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,/can't redefine non-configurable property "solana"/,/vv\(\)\.getRestrictions is not a function/,/Can't find variable: _AutofillCallbackHandler/,/Object Not Found Matching Id:\d+, MethodName:simulateEvent/,/^Java exception was raised during method invocation$/],Jt=function(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{name:"EventFilters",setup(r){const n=r.getOptions();e=Zt(t,n)},processEvent(r,n,a){if(!e){const r=a.getOptions();e=Zt(t,r)}return function(e,t){if(e.type){if("transaction"===e.type&&function(e,t){if(!t?.length)return!1;const r=e.transaction;return!!r&&$e(r,t)}(e,t.ignoreTransactions))return u&&v.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${H(e)}`),!0}else{if(function(e,t){if(!t?.length)return!1;return Gt(e).some(e=>$e(e,t))}(e,t.ignoreErrors))return u&&v.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${H(e)}`),!0;if(function(e){if(!e.exception?.values?.length)return!1;return!e.message&&!e.exception.values.some(e=>e.stacktrace||e.type&&"Error"!==e.type||e.value)}(e))return u&&v.warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${H(e)}`),!0;if(function(e,t){if(!t?.length)return!1;const r=er(e);return!!r&&$e(r,t)}(e,t.denyUrls))return u&&v.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${H(e)}.\nUrl: ${er(e)}`),!0;if(!function(e,t){if(!t?.length)return!0;const r=er(e);return!r||$e(r,t)}(e,t.allowUrls))return u&&v.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${H(e)}.\nUrl: ${er(e)}`),!0}return!1}(r,e)?null:r}}},Xt=function(){return{...Jt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),name:"InboundFilters"}};function Zt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{allowUrls:[...e.allowUrls||[],...t.allowUrls||[]],denyUrls:[...e.denyUrls||[],...t.denyUrls||[]],ignoreErrors:[...e.ignoreErrors||[],...t.ignoreErrors||[],...e.disableErrorDefaults?[]:Qt],ignoreTransactions:[...e.ignoreTransactions||[],...t.ignoreTransactions||[]]}}function er(e){try{const t=[...e.exception?.values??[]].reverse().find(e=>void 0===e.mechanism?.parent_id&&e.stacktrace?.frames?.length),r=t?.stacktrace?.frames;return r?function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];for(let t=e.length-1;t>=0;t--){const r=e[t];if(r&&"<anonymous>"!==r.filename&&"[native code]"!==r.filename)return r.filename||null}return null}(r):null}catch{return u&&v.error(`Cannot extract url for event ${H(e)}`),null}}let tr;const rr=new WeakMap,nr=()=>({name:"FunctionToString",setupOnce(){tr=Function.prototype.toString;try{Function.prototype.toString=function(){const e=D(this),t=rr.has(Ie())&&void 0!==e?e:this;for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return tr.apply(t,n)}}catch{}},setup(e){rr.set(e,!0)}}),ar=()=>({name:"ConversationId",setup(e){e.on("spanStart",e=>{const t=Re().getScopeData(),r=Oe().getScopeData(),n=t.conversationId||r.conversationId;if(n){const{op:t,data:r,description:a}=yt(e);if(!t?.startsWith("gen_ai.")&&!r["ai.operationId"]&&!a?.startsWith("ai."))return;e.setAttribute("gen_ai.conversation.id",n)}})}}),ir=()=>{let e;return{name:"Dedupe",processEvent(t){if(t.type)return t;try{if(function(e,t){if(!t)return!1;if(function(e,t){const r=e.message,n=t.message;if(!r&&!n)return!1;if(r&&!n||!r&&n)return!1;if(r!==n)return!1;if(!lr(e,t))return!1;if(!or(e,t))return!1;return!0}(e,t))return!0;if(function(e,t){const r=sr(t),n=sr(e);if(!r||!n)return!1;if(r.type!==n.type||r.value!==n.value)return!1;if(!lr(e,t))return!1;if(!or(e,t))return!1;return!0}(e,t))return!0;return!1}(t,e))return u&&v.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return e=t}}};function or(e,t){let r=me(e),n=me(t);if(!r&&!n)return!0;if(r&&!n||!r&&n)return!1;if(n.length!==r.length)return!1;for(let a=0;a<n.length;a++){const e=n[a],t=r[a];if(e.filename!==t.filename||e.lineno!==t.lineno||e.colno!==t.colno||e.function!==t.function)return!1}return!0}function lr(e,t){let r=e.fingerprint,n=t.fingerprint;if(!r&&!n)return!0;if(r&&!n||!r&&n)return!1;try{return!(r.join("")!==n.join(""))}catch{return!1}}function sr(e){return e.exception?.values?.[0]}function cr(e,t){!0===t.debug&&(u?v.enable():f(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")}));Re().update(t.initialScope);const r=new e(t);return function(e){Re().setClient(e)}(r),r.init(),r}function dr(e){const t=e.protocol?`${e.protocol}:`:"",r=e.port?`:${e.port}`:"";return`${t}//${e.host}${r}${e.path?`/${e.path}`:""}/api/`}function ur(e,t,r){return t||`${function(e){return`${dr(e)}${e.projectId}/envelope/`}(e)}?${function(e,t){const r={sentry_version:"7"};return e.publicKey&&(r.sentry_key=e.publicKey),t&&(r.sentry_client=`${t.name}/${t.version}`),new URLSearchParams(r).toString()}(e,r)}`}function pr(e){return[e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]]}function hr(e,t){const[r,n]=e;return[r,[...n,t]]}function fr(e,t){const r=e[1];for(const n of r){if(t(n,n[0].type))return!0}return!1}function mr(e){const t=c(l);return t.encodePolyfill?t.encodePolyfill(e):(new TextEncoder).encode(e)}function gr(e){const[t,r]=e;let n=JSON.stringify(t);function a(e){"string"===typeof n?n="string"===typeof e?n+e:[mr(n),e]:n.push("string"===typeof e?mr(e):e)}for(const i of r){const[e,t]=i;if(a(`\n${JSON.stringify(e)}\n`),"string"===typeof t||t instanceof Uint8Array)a(t);else{let e;try{e=JSON.stringify(t)}catch{e=JSON.stringify(ve(t))}a(e)}}return"string"===typeof n?n:function(e){const t=e.reduce((e,t)=>e+t.length,0),r=new Uint8Array(t);let n=0;for(const a of e)r.set(a,n),n+=a.length;return r}(n)}function xr(e){const t="string"===typeof e.data?mr(e.data):e.data;return[{type:"attachment",length:t.length,filename:e.filename,content_type:e.contentType,attachment_type:e.attachmentType},t]}const vr={sessions:"session",event:"error",client_report:"internal",user_report:"default",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",raw_security:"security",log:"log_item",trace_metric:"metric"};function br(e){return function(e){return e in vr}(e)?vr[e]:e}function yr(e){if(!e?.sdk)return;const{name:t,version:r}=e.sdk;return{name:t,version:r}}function kr(e,t,r,n){const a=yr(r),i=e.type&&"replay_event"!==e.type?e.type:"event";!function(e,t){if(!t)return e;const r=e.sdk||{};e.sdk={...r,name:r.name||t.name,version:r.version||t.version,integrations:[...e.sdk?.integrations||[],...t.integrations||[]],packages:[...e.sdk?.packages||[],...t.packages||[]],settings:e.sdk?.settings||t.settings?{...e.sdk?.settings,...t.settings}:void 0}}(e,r?.sdk);const o=function(e,t,r,n){const a=e.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:e.event_id,sent_at:(new Date).toISOString(),...t&&{sdk:t},...!!r&&n&&{dsn:it(n)},...a&&{trace:a}}}(e,a,n,t);delete e.sdkProcessingMetadata;return pr(o,[[{type:i},e]])}function jr(){return!("undefined"!==typeof __SENTRY_BROWSER_BUNDLE__&&__SENTRY_BROWSER_BUNDLE__)&&"[object process]"===Object.prototype.toString.call("undefined"!==typeof process?process:0)}function wr(){return"undefined"!==typeof window&&(!jr()||function(){const e=l.process;return"renderer"===e?.type}())}function Sr(e,t){const r=t?"auto":"never";return[{type:"log",item_count:e.length,content_type:"application/vnd.sentry.items.log+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:r,infer_user_agent:r}},items:e}]}function $r(e,t){const r=t??zr(e)??[];if(0===r.length)return;const n=e.getOptions(),a=function(e,t,r,n,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),r&&n&&(i.dsn=it(n)),pr(i,[Sr(e,a)])}(r,n._metadata,n.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);Er().set(e,[]),e.emit("flushLogs"),e.sendEnvelope(a)}function zr(e){return Er().get(e)}function Er(){return d("clientToLogBufferMap",()=>new WeakMap)}function _r(e,t){const r=t?"auto":"never";return[{type:"trace_metric",item_count:e.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:r,infer_user_agent:r}},items:e}]}function Nr(e,t){const r=t??Ar(e)??[];if(0===r.length)return;const n=e.getOptions(),a=function(e,t,r,n,a){const i={};return t?.sdk&&(i.sdk={name:t.sdk.name,version:t.sdk.version}),r&&n&&(i.dsn=it(n)),pr(i,[_r(e,a)])}(r,n._metadata,n.tunnel,e.getDsn(),e.getDataCollectionOptions().userInfo);Cr().set(e,[]),e.emit("flushMetrics"),e.sendEnvelope(a)}function Ar(e){return Cr().get(e)}function Cr(){return d("clientToMetricBufferMap",()=>new WeakMap)}function Fr(e){const t={trace_id:e.trace_id,span_id:e.span_id,parent_span_id:e.parent_span_id,name:e.description||"",start_timestamp:e.start_timestamp,end_timestamp:e.timestamp||e.start_timestamp,status:e.status&&"ok"!==e.status&&"cancelled"!==e.status?"error":"ok",is_segment:!1,attributes:{...e.data},links:e.links};return r=t,{...r,attributes:dt(r.attributes),links:r.links?.map(e=>({...e,attributes:dt(e.attributes)}))};var r}function Tr(e){return"object"===typeof e&&"function"===typeof e.unref&&e.unref(),e}const Pr=Symbol.for("SentryBufferFullError");function Dr(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;const t=new Set;function r(e){t.delete(e)}return{get $(){return Array.from(t)},add:function(n){if(!(t.size<e))return Ue(Pr);const a=n();return t.add(a),a.then(()=>r(a),()=>r(a)),a},drain:function(e){if(!t.size)return Ve(!0);const r=Promise.allSettled(Array.from(t)).then(()=>!0);if(!e)return r;const n=[r,new Promise(t=>Tr(setTimeout(()=>t(!1),e)))];return Promise.race(n)}}}function Lr(e,t){let{statusCode:r,headers:n}=t,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:B();const i={...e},o=n?.["x-sentry-rate-limits"],l=n?.["retry-after"];if(o)for(const s of o.trim().split(",")){const[e,t,,,r]=s.split(":",5),n=parseInt(e,10),o=1e3*(isNaN(n)?60:n);if(t)for(const l of t.split(";"))"metric_bucket"===l&&r&&!r.split(";").includes("custom")||(i[l]=a+o);else i.all=a+o}else l?i.all=a+function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:B();const r=parseInt(`${e}`,10);if(!isNaN(r))return 1e3*r;const n=Date.parse(`${e}`);return isNaN(n)?6e4:n-t}(l,a):429===r&&(i.all=a+6e4);return i}function Rr(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Dr(e.bufferSize||64),n={};return{send:function(a){const i=[];if(fr(a,(t,r)=>{const a=br(r);!function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:B();return function(e,t){return e[t]||e.all||0}(e,t)>r}(n,a)?i.push(t):e.recordDroppedEvent("ratelimit_backoff",a)}),0===i.length)return Promise.resolve({});const o=pr(a[0],i),l=t=>{!function(e,t){return fr(e,(e,r)=>t.includes(r))}(o,["client_report"])?fr(o,(r,n)=>{e.recordDroppedEvent(t,br(n))}):u&&v.warn(`Dropping client report. Will not send outcomes (reason: ${t}).`)};return r.add(()=>t({body:gr(o)}).then(e=>413===e.statusCode?(u&&v.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits."),l("send_error"),e):(u&&void 0!==e.statusCode&&(e.statusCode<200||e.statusCode>=300)&&v.warn(`Sentry responded with status code ${e.statusCode} to sent event.`),n=Lr(n,e),e),e=>{throw l("network_error"),u&&v.error("Encountered error running transport request:",e),e})).then(e=>e,e=>{if(e===Pr)return u&&v.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw e})},flush:e=>r.drain(e)}}function Or(e){v.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`)}function Ir(e,t){if(!t?.length)return!1;for(const r of t){if(Vr(r)){if(e.description&&Se(e.description,r))return u&&Or(e),!0;continue}const t=!!r.attributes&&Object.keys(r.attributes).length>0;if(!r.name&&!r.op&&!t)continue;const n=!r.name||e.description&&Se(e.description,r.name),a=!r.op||e.op&&Se(e.op,r.op),i=!r.attributes||Object.entries(r.attributes).every(t=>{let[r,n]=t;return Mr(e.attributes?.[r],n)});if(n&&a&&i)return u&&Or(e),!0}return!1}function Mr(e,t){return"string"===typeof e&&("string"===typeof t||t instanceof RegExp)?Se(e,t):Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,r)=>e===t[r]):e===t}function Br(e,t){const r=t.parent_span_id,n=t.span_id;if(r)for(const a of e)a.parent_span_id===n&&(a.parent_span_id=r)}function Vr(e){return"string"===typeof e||e instanceof RegExp}const Ur=["forwarded","-ip","remote-","via","-user"];const Kr={userInfo:!1,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:[],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5};function Hr(e){const t=null!=e.dataCollection?Kr:!0===e.sendDefaultPii?{userInfo:!0,cookies:!0,httpHeaders:{request:!0,response:!0},httpBodies:["incomingRequest","outgoingRequest","incomingResponse","outgoingResponse"],queryParams:!0,genAI:{inputs:!0,outputs:!0},stackFrameVariables:!0,frameContextLines:5}:{userInfo:!1,cookies:{deny:Ur},httpHeaders:{request:{deny:Ur},response:{deny:Ur}},httpBodies:[],queryParams:{deny:Ur},genAI:{inputs:!1,outputs:!1},stackFrameVariables:!0,frameContextLines:5};const r=e.dataCollection??{};return{userInfo:r.userInfo??t.userInfo,cookies:r.cookies??t.cookies,httpHeaders:{request:r.httpHeaders?.request??t.httpHeaders.request,response:r.httpHeaders?.response??t.httpHeaders.response},httpBodies:r.httpBodies??t.httpBodies,queryParams:r.queryParams??t.queryParams,genAI:{inputs:r.genAI?.inputs??t.genAI.inputs,outputs:r.genAI?.outputs??t.genAI.outputs},stackFrameVariables:r.stackFrameVariables??t.stackFrameVariables,frameContextLines:r.frameContextLines??t.frameContextLines}}const Wr="Not capturing exception because it's already been captured.",qr="Discarded session because of missing or non-string release",Yr=Symbol.for("SentryInternalError"),Gr=Symbol.for("SentryDoNotSendEventError");function Qr(e){return{message:e,[Yr]:!0}}function Jr(e){return{message:e,[Gr]:!0}}function Xr(e){return!!e&&"object"===typeof e&&Yr in e}function Zr(e){return!!e&&"object"===typeof e&&Gr in e}function en(e,t,r,n,a){let i,o=0,l=!1;e.on(r,()=>{o=0,clearTimeout(i),l=!1}),e.on(t,t=>{if(o+=n(t),o>=8e5)a(e);else if(!l){const t=e.getOptions()._flushInterval??5e3;t>0&&(l=!0,i=Tr(setTimeout(()=>{a(e)},t)))}}),e.on("flush",()=>{a(e)})}class tn{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Dr(e.transportOptions?.bufferSize??64),this._dataCollection=Hr(e),e.dsn?this._dsn=st(e.dsn):u&&v.warn("No DSN provided, client will not send events."),this._dsn){const t=ur(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:t})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&en(this,"afterCaptureLog","flushLogs",ln,$r);(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&en(this,"afterCaptureMetric","flushMetrics",on,Nr)}captureException(e,t,r){const n=U();if(Y(e))return u&&v.log(Wr),n;const a={event_id:n,...t};return this._process(()=>this.eventFromException(e,a).then(e=>this._captureEvent(e,a,r)).then(e=>e),"error"),a.event_id}captureMessage(e,t,r,n){const a={event_id:U(),...r},i=$(e)?e:String(e),o=z(e),l=o?this.eventFromMessage(i,t,a):this.eventFromException(e,a);return this._process(()=>l.then(e=>this._captureEvent(e,a,n)),o?"unknown":"error"),a.event_id}captureEvent(e,t,r){const n=U();if(t?.originalException&&Y(t.originalException))return u&&v.log(Wr),n;const a={event_id:n,...t},i=e.sdkProcessingMetadata||{},o=i.capturedSpanScope,l=i.capturedSpanIsolationScope,s=rn(e.type);return this._process(()=>this._captureEvent(e,a,o||r,l),s),a.event_id}captureSession(e){this.sendSession(e),Z(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getDataCollectionOptions(){return this._dataCollection}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const t=this._transport;if(this.emit("flush"),!t)return!0;const r=await this._isClientDoneProcessing(e),n=await t.flush(e);return r&&n}async close(e){$r(this);const t=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),t}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(e=>{let{name:t}=e;return t.startsWith("Spotlight")}))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}getIntegrationNames(){return Object.keys(this._integrations)}addIntegration(e){const t=this._integrations[e.name];!t&&e.beforeSetup&&e.beforeSetup(this),Yt(this,e,this._integrations),t||qt(this,[e])}sendEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.emit("beforeSendEvent",e,t);const r=function(e,t){if("transaction"!==e.type||!e.spans?.length||!e.sdkProcessingMetadata?.hasGenAiSpans||!t.getOptions().streamGenAiSpans||function(e){return"stream"===e.getOptions().traceLifecycle}(t))return;const r=[],n=[];for(const i of e.spans)i.op?.startsWith("gen_ai.")?r.push(Fr(i)):n.push(i);if(0===r.length)return;e.spans=n;const a=t.getOptions().sendDefaultPii?"auto":"never";return[{type:"span",item_count:r.length,content_type:"application/vnd.sentry.items.span.v2+json"},{version:2,...wr()&&{ingest_settings:{infer_ip:a,infer_user_agent:a}},items:r}]}(e,this);let n=kr(e,this._dsn,this._options._metadata,this._options.tunnel);for(const a of t.attachments||[])n=hr(n,xr(a));r&&(n=hr(n,r)),this.sendEnvelope(n).then(t=>this.emit("afterSendEvent",e,t))}sendSession(e){const{release:t,environment:r=Be}=this._options;if("aggregates"in e){const n=e.attrs||{};if(!n.release&&!t)return void(u&&v.warn(qr));n.release=n.release||t,n.environment=n.environment||r,e.attrs=n}else{if(!e.release&&!t)return void(u&&v.warn(qr));e.release=e.release||t,e.environment=e.environment||r}this.emit("beforeSendSession",e);const n=function(e,t,r,n){const a=yr(r);return pr({sent_at:(new Date).toISOString(),...a&&{sdk:a},...!!n&&t&&{dsn:it(t)}},["aggregates"in e?[{type:"sessions"},e]:[{type:"session"},e.toJSON()]])}(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(n)}recordDroppedEvent(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(this._options.sendClientReports){const n=`${e}:${t}`;u&&v.log(`Recording outcome: "${n}"${r>1?` (${r} times)`:""}`),this._outcomes[n]=(this._outcomes[n]||0)+r}}on(e,t){const r=this._hooks[e]=this._hooks[e]||new Set,n=function(){return t(...arguments)};return r.add(n),()=>{r.delete(n)}}emit(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];const a=this._hooks[e];a&&a.forEach(e=>e(...r))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(t){return u&&v.error("Error while sending envelope:",t),{}}return u&&v.error("Transport disabled"),{}}registerCleanup(e){}dispose(){}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=function(e,t){const r={};return t.forEach(t=>{t?.beforeSetup&&t.beforeSetup(e)}),t.forEach(t=>{t&&Yt(e,t,r)}),r}(this,e),qt(this,e)}_updateSessionFromEvent(e,t){let r="fatal"===t.level,n=!1;const a=t.exception?.values;if(a){n=!0,r=!1;for(const e of a)if(!1===e.mechanism?.handled){r=!0;break}}const i="ok"===e.status;(i&&0===e.errors||i&&r)&&(Z(e,{...r&&{status:"crashed"},errors:e.errors||Number(n||r)}),this.captureSession(e))}async _isClientDoneProcessing(e){let t=0;for(;!e||t<e;){if(await new Promise(e=>setTimeout(e,1)),!this._numProcessing)return!0;t++}return!1}_isEnabled(){return!1!==this.getOptions().enabled&&void 0!==this._transport}_prepareEvent(e,t,r,n){const a=this.getOptions(),i=this.getIntegrationNames();return!t.integrations&&i.length&&(t.integrations=i),this.emit("preprocessEvent",e,t),e.type||n.setLastEventId(e.event_id||t.event_id),Rt(a,e,t,r,this,n).then(e=>{if(null===e)return e;this.emit("postprocessEvent",e,t),e.contexts={trace:{...e.contexts?.trace,...Me(r)},...e.contexts};const n=function(e,t){const r=t.getPropagationContext();return r.dsc||Ct(r.traceId,e)}(this,r);return e.sdkProcessingMetadata={dynamicSamplingContext:n,...e.sdkProcessingMetadata},e})}_captureEvent(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Re(),n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Oe();return u&&nn(e)&&v.log(`Captured error event \`${Gt(e)[0]||"<unknown>"}\``),this._processEvent(e,t,r,n).then(e=>e.event_id,e=>{u&&(Zr(e)?v.log(e.message):Xr(e)?v.warn(e.message):v.warn(e))})}_processEvent(e,t,r,n){const a=this.getOptions(),{sampleRate:i}=a,o=an(e),l=nn(e),s=`before send for type \`${e.type||"error"}\``,c="undefined"===typeof i?void 0:function(e){if("boolean"===typeof e)return Number(e);const t="string"===typeof e?parseFloat(e):e;return"number"!==typeof t||isNaN(t)||t<0||t>1?void 0:t}(i);if(l&&"number"===typeof c&&M()>c)return this.recordDroppedEvent("sample_rate","error"),Ue(Jr(`Discarding event because it's not included in the random sample (sampling rate = ${i})`));const d=rn(e.type);return this._prepareEvent(e,t,r,n).then(e=>{if(null===e)throw this.recordDroppedEvent("event_processor",d),Jr("An event processor returned `null`, will not send event.");if(!0===t.data?.__sentry__)return e;const r=function(e,t,r,n){const{beforeSend:a,beforeSendTransaction:i,ignoreSpans:o}=t,l=(s=t.beforeSendSpan,!(s&&"function"===typeof s&&"_streamed"in s&&s._streamed)&&t.beforeSendSpan);var s;let c=r;if(nn(c)&&a)return a(c,n);if(an(c)){if(l||o){const t=function(e){const{trace_id:t,parent_span_id:r,span_id:n,status:a,origin:i,data:o,op:l}=e.contexts?.trace??{};return{data:o??{},description:e.transaction,op:l,parent_span_id:r,span_id:n??"",start_timestamp:e.start_timestamp??0,status:a,timestamp:e.timestamp,trace_id:t??"",origin:i,profile_id:o?.[Xe],exclusive_time:o?.[Ze],measurements:e.measurements,is_segment:!0}}(c);if(o?.length&&Ir({description:t.description,op:t.op,attributes:t.data},o))return null;if(l){const e=l(t);e?c=ee(r,{type:"transaction",timestamp:(d=e).timestamp,start_timestamp:d.start_timestamp,transaction:d.description,contexts:{trace:{trace_id:d.trace_id,span_id:d.span_id,parent_span_id:d.parent_span_id,op:d.op,status:d.status,origin:d.origin,data:{...d.data,...d.profile_id&&{[Xe]:d.profile_id},...d.exclusive_time&&{[Ze]:d.exclusive_time}}}},measurements:d.measurements}):Nt()}if(c.spans){const t=[],r=c.spans;for(const e of r)if(o?.length&&Ir({description:e.description,op:e.op,attributes:e.data},o))Br(r,e);else if(l){const r=l(e);r?t.push(r):(Nt(),t.push(e))}else t.push(e);const n=c.spans.length-t.length;n&&e.recordDroppedEvent("before_send","span",n),c.spans=t}}if(i){if(c.spans){const e=c.spans.length;c.sdkProcessingMetadata={...r.sdkProcessingMetadata,spanCountBeforeProcessing:e}}return i(c,n)}}var d;return c}(this,a,e,t);return function(e,t){const r=`${t} must return \`null\` or a valid event.`;if(N(e))return e.then(e=>{if(!E(e)&&null!==e)throw Qr(r);return e},e=>{throw Qr(`${t} rejected with ${e}`)});if(!E(e)&&null!==e)throw Qr(r);return e}(r,s)}).then(a=>{if(null===a){if(this.recordDroppedEvent("before_send",d),o){const t=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",t)}throw Jr(`${s} returned \`null\`, will not send event.`)}const i=r.getSession()||n.getSession();if(l&&i&&this._updateSessionFromEvent(i,a),o){const e=(a.sdkProcessingMetadata?.spanCountBeforeProcessing||0)-(a.spans?a.spans.length:0);e>0&&this.recordDroppedEvent("before_send","span",e)}const c=a.transaction_info;if(o&&c&&a.transaction!==e.transaction){const e="custom";a.transaction_info={...c,source:e}}return this.sendEvent(a,t),a}).then(null,e=>{if(Zr(e)||Xr(e))throw e;throw this.captureException(e,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:e}),Qr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${e}`)})}_process(e,t){this._numProcessing++,this._promiseBuffer.add(e).then(e=>(this._numProcessing--,e),e=>(this._numProcessing--,e===Pr&&this.recordDroppedEvent("queue_overflow",t),e))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(e=>{let[t,r]=e;const[n,a]=t.split(":");return{reason:n,category:a,quantity:r}})}_flushOutcomes(){u&&v.log("Flushing outcomes...");const e=this._clearOutcomes();if(0===e.length)return void(u&&v.log("No outcomes to send"));if(!this._dsn)return void(u&&v.log("No dsn provided, will not send outcomes"));u&&v.log("Sending outcomes:",e);const t=(r=e,pr((n=this._options.tunnel&&it(this._dsn))?{dsn:n}:{},[[{type:"client_report"},{timestamp:a||G(),discarded_events:r}]]));var r,n,a;this.sendEnvelope(t)}}function rn(e){return"replay_event"===e?"replay":e||"error"}function nn(e){return void 0===e.type}function an(e){return"transaction"===e.type}function on(e){let t=0;return e.name&&(t+=2*e.name.length),t+=8,t+sn(e.attributes)}function ln(e){let t=0;return e.message&&(t+=2*e.message.length),t+sn(e.attributes)}function sn(e){if(!e)return 0;let t=0;return Object.values(e).forEach(e=>{Array.isArray(e)?t+=e.length*cn(e[0]):z(e)?t+=cn(e):t+=100}),t}function cn(e){return"string"===typeof e?2*e.length:"number"===typeof e?8:"boolean"===typeof e?4:0}function dn(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[t],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"npm";const a=(e._metadata=e._metadata||{}).sdk=e._metadata.sdk||{};a.name||(a.name=`sentry.javascript.${t}`,a.packages=r.map(e=>({name:`${n}:@sentry/${e}`,version:o})),a.version=o)}function un(e){"aggregates"in e?void 0===e.attrs?.ip_address&&(e.attrs={...e.attrs,ip_address:"{{auto}}"}):void 0===e.ipAddress&&(e.ipAddress="{{auto}}")}function pn(e){return function(e){return y(e)&&"__sentry_fetch_url_host__"in e&&"string"===typeof e.__sentry_fetch_url_host__}(e)?`${e.message} (${e.__sentry_fetch_url_host__})`:e.message}function hn(e,t){const r=gn(e,t),n={type:bn(t),value:yn(t)};return r.length&&(n.stacktrace={frames:r}),void 0===n.type&&""===n.value&&(n.value="Unrecoverable error caught"),n}function fn(e,t,r,n){const a=Ie(),i=a?.getOptions().normalizeDepth,o=(l=t,Object.values(l).find(e=>e instanceof Error));var l;const s={__serialized__:be(t,i)};if(o)return{exception:{values:[hn(e,o)]},extra:s};const c={exception:{values:[{type:_(t)?t.constructor.name:n?"UnhandledRejection":"Error",value:wn(t,{isUnhandledRejection:n})}]},extra:s};if(r){const t=gn(e,r);t.length&&(c.exception.values[0].stacktrace={frames:t})}return c}function mn(e,t){return{exception:{values:[hn(e,t)]}}}function gn(e,t){const r=t.stacktrace||t.stack||"",n=function(e){if(e&&xn.test(e.message))return 1;return 0}(t),a=function(e){if("number"===typeof e.framesToPop)return e.framesToPop;return 0}(t);try{return e(r,n,a)}catch{}return[]}const xn=/Minified React error #\d+;/i;function vn(e){return"undefined"!==typeof WebAssembly&&"undefined"!==typeof WebAssembly.Exception&&e instanceof WebAssembly.Exception}function bn(e){const t=e?.name;if(!t&&vn(e)){return e.message&&Array.isArray(e.message)&&2==e.message.length?e.message[0]:"WebAssembly.Exception"}return t}function yn(e){const t=e?.message;return vn(e)?Array.isArray(e.message)&&2==e.message.length?e.message[1]:"wasm exception":t?t.error&&"string"===typeof t.error.message?pn(t.error):pn(e):"No error message"}function kn(e,t,r,n,a){let i;if(j(t)&&t.error){return mn(e,t.error)}if(w(t)||k(t,"DOMException")){const a=t;if("stack"in t){i=mn(e,t);const a=i.exception?.values?.[0];if(n&&r&&a&&!a.stacktrace){const t=gn(e,r);t.length&&(a.stacktrace={frames:t},q(i,{synthetic:!0}))}}else{const t=a.name||(w(a)?"DOMError":"DOMException"),o=a.message?`${t}: ${a.message}`:t;i=jn(e,o,r,n),W(i,o)}return"code"in a&&(i.tags={...i.tags,"DOMException.code":`${a.code}`}),i}if(y(t))return mn(e,t);if(E(t)||_(t)){return i=fn(e,t,r,a),q(i,{synthetic:!0}),i}return i=jn(e,t,r,n),W(i,`${t}`,void 0),q(i,{synthetic:!0}),i}function jn(e,t,r,n){const a={};if(n&&r){const n=gn(e,r);n.length&&(a.exception={values:[{value:t,stacktrace:{frames:n}}]}),q(a,{synthetic:!0})}if($(t)){const{__sentry_template_string__:e,__sentry_template_values__:r}=t;return a.logentry={message:e,params:r},a}return a.message=t,a}function wn(e,t){let{isUnhandledRejection:r}=t;const n=function(e){const t=Object.keys(L(e));return t.sort(),t[0]?t.join(", "):"[object has no keys]"}(e),a=r?"promise rejection":"exception";if(j(e))return`Event \`ErrorEvent\` captured as ${a} with message \`${e.message}\``;if(_(e)){return`Event \`${function(e){try{const t=Object.getPrototypeOf(e);return t?t.constructor.name:void 0}catch{}}(e)}\` (type=${e.type}) captured as ${a}`}return`Object captured as ${a} with keys: ${n}`}const Sn=l;function $n(){try{return Sn.document.location.href}catch{return""}}const zn=l;let En=0;function _n(){return En>0}function Nn(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!==typeof e)return e;try{const t=e.__sentry_wrapped__;if(t)return"function"===typeof t?t:e;if(D(e))return e}catch{return e}const r=function(){for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];l._sentryWrappedDepth=(l._sentryWrappedDepth||0)+1;try{const r=n.map(e=>Nn(e,t));return e.apply(this,r)}catch(i){throw En++,setTimeout(()=>{En--}),function(){const e=De(s());for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];if(2===r.length){const[t,n]=r;return t?e.withSetScope(t,n):e.withScope(n)}e.withScope(r[0])}(e=>{var r,a;e.addEventProcessor(e=>(t.mechanism&&(W(e,void 0,void 0),q(e,t.mechanism)),e.extra={...e.extra,arguments:n},e)),r=i,Re().captureException(r,Ot(a))}),i}finally{l._sentryWrappedDepth=(l._sentryWrappedDepth||0)-1}};try{for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])}catch{}P(r,e),T(e,"__sentry_wrapped__",r);try{Object.getOwnPropertyDescriptor(r,"name").configurable&&Object.defineProperty(r,"name",{get:()=>e.name})}catch{}return r}function An(){const e=$n(),{referrer:t}=zn.document||{},{userAgent:r}=zn.navigator||{};return{url:e,headers:{...t&&{Referer:t},...r&&{"User-Agent":r}}}}class Cn extends tn{constructor(e){const t=(r=e,{release:"string"===typeof __SENTRY_RELEASE__?__SENTRY_RELEASE__:zn.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...r});var r;dn(t,"browser",["browser"],zn.SENTRY_SDK_SOURCE||"npm"),t._metadata?.sdk&&(t._metadata.sdk.settings={infer_ip:t.sendDefaultPii?"auto":"never",...t._metadata.sdk.settings}),super(t);const{sendDefaultPii:n,sendClientReports:a,enableLogs:i,_experiments:o,enableMetrics:l}=this._options,s=l??o?.enableMetrics??!0;zn.document&&(a||i||s)&&zn.document.addEventListener("visibilitychange",()=>{"hidden"===zn.document.visibilityState&&(a&&this._flushOutcomes(),i&&$r(this),s&&Nr(this))}),n&&this.on("beforeSendSession",un)}eventFromException(e,t){return function(e,t,r,n){const a=kn(e,t,r?.syntheticException||void 0,n);return q(a),a.level="error",r?.event_id&&(a.event_id=r.event_id),Ve(a)}(this._options.stackParser,e,t,this._options.attachStacktrace)}eventFromMessage(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info",r=arguments.length>2?arguments[2]:void 0;return function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"info",n=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;const i=jn(e,t,n?.syntheticException||void 0,a);return i.level=r,n?.event_id&&(i.event_id=n.event_id),Ve(i)}(this._options.stackParser,e,t,r,this._options.attachStacktrace)}_prepareEvent(e,t,r,n){return e.platform=e.platform||"javascript",super._prepareEvent(e,t,r,n)}}const Fn={},Tn={};function Pn(e,t){return Fn[e]=Fn[e]||[],Fn[e].push(t),()=>{const r=Fn[e];if(r){const e=r.indexOf(t);-1!==e&&r.splice(e,1)}}}function Dn(e,t){if(!Tn[e]){Tn[e]=!0;try{t()}catch(r){u&&v.error(`Error while instrumenting ${e}`,r)}}}function Ln(e,t){const r=e&&Fn[e];if(r)for(const a of r)try{a(t)}catch(n){u&&v.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${fe(a)}\nError:`,n)}}const Rn=new Set([]);function On(){"console"in l&&p.forEach(function(e){e in l.console&&F(l.console,e,function(t){return h[e]=t,function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r[0],i=h[e],o=Rn.size&&"string"===typeof a&&$e(a,Rn);o||Ln("console",{args:r,level:e}),(!o||u&&v.isEnabled())&&i?.apply(l.console,r)}})})}const In=l;function Mn(){if(!("fetch"in In))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Bn(e){return e&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())}function Vn(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&!function(){if("string"===typeof EdgeRuntime)return!0;if(!Mn())return!1;if(Bn(In.fetch))return!0;let e=!1;const t=In.document;if(t&&"function"===typeof t.createElement)try{const r=t.createElement("iframe");r.hidden=!0,t.head.appendChild(r),r.contentWindow?.fetch&&(e=Bn(r.contentWindow.fetch)),t.head.removeChild(r)}catch(r){u&&v.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",r)}return e}()||F(l,"fetch",function(t){return function(){const r=new Error;for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];const{method:o,url:s}=function(e){if(0===e.length)return{method:"GET",url:""};if(2===e.length){const[t,r]=e;return{url:Kn(t),method:Un(r,"method")?String(r.method).toUpperCase():C(t)&&Un(t,"method")?String(t.method).toUpperCase():"GET"}}const t=e[0];return{url:Kn(t),method:Un(t,"method")?String(t.method).toUpperCase():"GET"}}(a),c={args:a,fetchData:{method:o,url:s},startTimestamp:1e3*J(),virtualError:r,headers:Hn(a)};return e||Ln("fetch",{...c}),t.apply(l,a).then(async t=>(e?e(t):Ln("fetch",{...c,endTimestamp:1e3*J(),response:t}),t),e=>{Ln("fetch",{...c,endTimestamp:1e3*J(),error:e}),y(e)&&void 0===e.stack&&(e.stack=r.stack,T(e,"framesToPop",1));const t=Ie(),n=t?.getOptions().enhanceFetchErrorMessages??"always";if(!1!==n&&e instanceof TypeError&&("Failed to fetch"===e.message||"Load failed"===e.message||"NetworkError when attempting to fetch resource."===e.message))try{const t=new URL(c.fetchData.url).host;"always"===n?e.message=`${e.message} (${t})`:T(e,"__sentry_fetch_url_host__",t)}catch{}throw e})}})}function Un(e,t){return!!e&&"object"===typeof e&&!!e[t]}function Kn(e){return"string"===typeof e?e:e?Un(e,"url")?e.url:e.toString?e.toString():"":""}function Hn(e){const[t,r]=e;try{if("object"===typeof r&&null!==r&&"headers"in r&&r.headers)return new Headers(r.headers);if(C(t))return new Headers(t.headers)}catch{}}const Wn=100;function qn(e,t){const r=Ie(),n=Oe();if(!r)return;const{beforeBreadcrumb:a=null,maxBreadcrumbs:i=Wn}=r.getOptions();if(i<=0)return;const o={timestamp:G(),...e},l=a?f(()=>a(o,t)):o;null!==l&&(r.emit&&r.emit("beforeAddBreadcrumb",l,t),n.addBreadcrumb(l,i))}function Yn(e){return"warn"===e?"warning":["fatal","error","warning","log","info","debug"].includes(e)?e:"log"}function Gn(e){return void 0===e?void 0:e>=400&&e<500?"warning":e>=500?"error":void 0}function Qn(e){if(!e)return{};const t=e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!t)return{};const r=t[6]||"",n=t[8]||"";return{host:t[4],path:t[5],protocol:t[2],search:r,hash:n,relative:t[5]+r+n}}const Jn=l;let Xn,Zn,ea;function ta(){if(!Jn.document)return;const e=Ln.bind(null,"dom"),t=ra(e,!0);Jn.document.addEventListener("click",t,!1),Jn.document.addEventListener("keypress",t,!1),["EventTarget","Node"].forEach(t=>{const r=Jn,n=r[t]?.prototype;n?.hasOwnProperty?.("addEventListener")&&(F(n,"addEventListener",function(t){return function(r,n,a){if("click"===r||"keypress"==r)try{const n=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},i=n[r]=n[r]||{refCount:0};if(!i.handler){const n=ra(e);i.handler=n,t.call(this,r,n,a)}i.refCount++}catch{}return t.call(this,r,n,a)}}),F(n,"removeEventListener",function(e){return function(t,r,n){if("click"===t||"keypress"==t)try{const r=this.__sentry_instrumentation_handlers__||{},a=r[t];a&&(a.refCount--,a.refCount<=0&&(e.call(this,t,a.handler,n),a.handler=void 0,delete r[t]),0===Object.keys(r).length&&delete this.__sentry_instrumentation_handlers__)}catch{}return e.call(this,t,r,n)}}))})}function ra(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r=>{if(!r||r._sentryCaptured)return;const n=function(e){try{return e.target}catch{return null}}(r);if(function(e,t){return"keypress"===e&&(!t?.tagName||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName&&!t.isContentEditable)}(r.type,n))return;T(r,"_sentryCaptured",!0),n&&!n._sentryId&&T(n,"_sentryId",U());const a="keypress"===r.type?"input":r.type;if(!function(e){if(e.type!==Zn)return!1;try{if(!e.target||e.target._sentryId!==ea)return!1}catch{}return!0}(r)){e({event:r,name:a,global:t}),Zn=r.type,ea=n?n._sentryId:void 0}clearTimeout(Xn),Xn=Jn.setTimeout(()=>{ea=void 0,Zn=void 0},1e3)}}const na="__sentry_xhr_v3__";function aa(){if(!Jn.XMLHttpRequest)return;const e=XMLHttpRequest.prototype;e.open=new Proxy(e.open,{apply(e,t,r){const n=new Error,a=1e3*J(),i=S(r[0])?r[0].toUpperCase():void 0,o=function(e){if(S(e))return e;try{return e.toString()}catch{}return}(r[1]);if(!i||!o)return e.apply(t,r);t[na]={method:i,url:o,request_headers:{}},"POST"===i&&o.match(/sentry_key/)&&(t.__sentry_own_request__=!0);const l=()=>{const e=t[na];if(e&&4===t.readyState){try{e.status_code=t.status}catch{}Ln("xhr",{endTimestamp:1e3*J(),startTimestamp:a,xhr:t,virtualError:n})}};return"onreadystatechange"in t&&"function"===typeof t.onreadystatechange?t.onreadystatechange=new Proxy(t.onreadystatechange,{apply:(e,t,r)=>(l(),e.apply(t,r))}):t.addEventListener("readystatechange",l),t.setRequestHeader=new Proxy(t.setRequestHeader,{apply(e,t,r){const[n,a]=r,i=t[na];return i&&S(n)&&S(a)&&(i.request_headers[n.toLowerCase()]=a),e.apply(t,r)}}),e.apply(t,r)}}),e.send=new Proxy(e.send,{apply(e,t,r){const n=t[na];if(!n)return e.apply(t,r);void 0!==r[0]&&(n.body=r[0]);return Ln("xhr",{startTimestamp:1e3*J(),xhr:t}),e.apply(t,r)}})}let ia;function oa(e){const t="history";Pn(t,e),Dn(t,la)}function la(){function e(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r.length>2?r[2]:void 0;if(a){const t=ia,n=function(e){try{return new URL(e,Jn.location.origin).toString()}catch{return e}}(String(a));if(ia=n,t===n)return e.apply(this,r);Ln("history",{from:t,to:n})}return e.apply(this,r)}}Jn.addEventListener("popstate",()=>{const e=Jn.location.href,t=ia;if(ia=e,t===e)return;Ln("history",{from:t,to:e})}),"history"in In&&In.history&&(F(Jn.history,"pushState",e),F(Jn.history,"replaceState",e))}function sa(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return"<unknown>";try{let r=e;const n=5,a=[];let i=0,o=0;const l=" > ",s=l.length;let c;const d=Array.isArray(t)?t:t.keyAttrs,u=!Array.isArray(t)&&t.maxStringLength||80;for(;r&&i++<n&&(c=ca(r,d),!("html"===c||i>1&&o+a.length*s+c.length>=u));)a.push(c),o+=c.length,r=r.parentNode;return a.reverse().join(l)}catch{return"<unknown>"}}function ca(e,t){const r=e,n=[];if(!r?.tagName)return"";if("undefined"!==typeof HTMLElement&&r instanceof HTMLElement&&r.dataset){if(r.dataset.sentryComponent)return r.dataset.sentryComponent;if(r.dataset.sentryElement)return r.dataset.sentryElement}n.push(r.tagName.toLowerCase());const a=t?.length?t.filter(e=>r.getAttribute(e)).map(e=>[e,r.getAttribute(e)]):null;if(a?.length)a.forEach(e=>{n.push(`[${e[0]}="${e[1]}"]`)});else{r.id&&n.push(`#${r.id}`);const e=r.className;if(e&&S(e)){const t=e.split(/\s+/);for(const e of t)n.push(`.${e}`)}}for(const i of["aria-label","type","name","title","alt"]){const e=r.getAttribute(i);e&&n.push(`[${i}="${e}"]`)}return n.join("")}const da="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,ua=1024,pa=function(){const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"Breadcrumbs",setup(t){var r;e.console&&function(e){const t="console",r=Pn(t,e);Dn(t,On)}(function(e){return function(t){if(Ie()!==e)return;const r={category:"console",data:{arguments:t.args,logger:"console"},level:Yn(t.level),message:we(t.args," ")};if("assert"===t.level){if(!1!==t.args[0])return;r.message=`Assertion failed: ${we(t.args.slice(1)," ")||"console.assert"}`,r.data.arguments=t.args.slice(1)}qn(r,{input:t.args,level:t.level})}}(t)),e.dom&&(r=function(e,t){return function(r){if(Ie()!==e)return;let n,a,i="object"===typeof t?t.serializeAttribute:void 0,o="object"===typeof t&&"number"===typeof t.maxStringLength?t.maxStringLength:void 0;o&&o>ua&&(da&&v.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${o} was configured. Sentry will use 1024 instead.`),o=ua),"string"===typeof i&&(i=[i]);try{const e=r.event,t=function(e){return!!e&&!!e.target}(e)?e.target:e;n=sa(t,{keyAttrs:i,maxStringLength:o}),a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;if(!Sn.HTMLElement)return null;let r=e;for(let n=0;n<t;n++){if(!r)return null;if(r instanceof HTMLElement){if(r.dataset.sentryComponent)return r.dataset.sentryComponent;if(r.dataset.sentryElement)return r.dataset.sentryElement}r=r.parentNode}return null}(t)}catch{n="<unknown>"}if(0===n.length)return;const l={category:`ui.${r.name}`,message:n};a&&(l.data={"ui.component_name":a}),qn(l,{event:r.event,name:r.name,global:r.global})}}(t,e.dom),Pn("dom",r),Dn("dom",ta)),e.xhr&&function(e){Pn("xhr",e),Dn("xhr",aa)}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:r,endTimestamp:n}=t,a=t.xhr[na];if(!r||!n||!a)return;const{method:i,url:o,status_code:l,body:s}=a,c={method:i,url:o,status_code:l},d={xhr:t.xhr,input:s,startTimestamp:r,endTimestamp:n},u={category:"xhr",data:c,type:"http",level:Gn(l)};e.emit("beforeOutgoingRequestBreadcrumb",u,d),qn(u,d)}}(t)),e.fetch&&function(e,t){const r="fetch",n=Pn(r,e);Dn(r,()=>Vn(void 0,t))}(function(e){return function(t){if(Ie()!==e)return;const{startTimestamp:r,endTimestamp:n}=t;if(n&&(!t.fetchData.url.match(/sentry_key/)||"POST"!==t.fetchData.method))if(t.error){const a={data:t.error,input:t.args,startTimestamp:r,endTimestamp:n},i={category:"fetch",data:t.fetchData,level:"error",type:"http"};e.emit("beforeOutgoingRequestBreadcrumb",i,a),qn(i,a)}else{const a=t.response,i={...t.fetchData,status_code:a?.status},o={input:t.args,response:a,startTimestamp:r,endTimestamp:n},l={category:"fetch",data:i,type:"http",level:Gn(i.status_code)};e.emit("beforeOutgoingRequestBreadcrumb",l,o),qn(l,o)}}}(t)),e.history&&oa(function(e){return function(t){if(Ie()!==e)return;let r=t.from,n=t.to;const a=Qn(zn.location.href);let i=r?Qn(r):void 0;const o=Qn(n);i?.path||(i=a),a.protocol===o.protocol&&a.host===o.host&&(n=o.relative),a.protocol===i.protocol&&a.host===i.host&&(r=i.relative),qn({category:"navigation",data:{from:r,to:n}})}}(t)),e.sentry&&t.on("beforeSendEvent",function(e){return function(t){Ie()===e&&qn({category:"sentry."+("transaction"===t.type?"transaction":"event"),event_id:t.event_id,level:t.level,message:H(t)},{event:t})}}(t))}}};const ha="EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(","),fa=function(){const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"BrowserApiErrors",setupOnce(){e.setTimeout&&F(zn,"setTimeout",ma),e.setInterval&&F(zn,"setInterval",ma),e.requestAnimationFrame&&F(zn,"requestAnimationFrame",ga),e.XMLHttpRequest&&"XMLHttpRequest"in zn&&F(XMLHttpRequest.prototype,"send",xa);const t=e.eventTarget;if(t){(Array.isArray(t)?t:ha).forEach(t=>function(e,t){const r=zn,n=r[e]?.prototype;if(!n?.hasOwnProperty?.("addEventListener"))return;F(n,"addEventListener",function(r){return function(n,a,i){try{"function"===typeof a.handleEvent&&(a.handleEvent=Nn(a.handleEvent,{mechanism:{data:{handler:fe(a),target:e},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return t.unregisterOriginalCallbacks&&function(e,t,r){e&&"object"===typeof e&&"removeEventListener"in e&&"function"===typeof e.removeEventListener&&e.removeEventListener(t,r)}(this,n,a),r.apply(this,[n,Nn(a,{mechanism:{data:{handler:fe(a),target:e},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),i])}}),F(n,"removeEventListener",function(e){return function(t,r,n){try{const a=r.__sentry_wrapped__;a&&e.call(this,t,a,n)}catch{}return e.call(this,t,r,n)}})}(t,e))}}}};function ma(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=r[0];return r[0]=Nn(a,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${fe(e)}`}}),e.apply(this,r)}}function ga(e){return function(t){return e.apply(this,[Nn(t,{mechanism:{data:{handler:fe(e)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function xa(e){return function(){const t=this;["onload","onerror","onprogress","onreadystatechange"].forEach(e=>{e in t&&"function"===typeof t[e]&&F(t,e,function(t){const r={mechanism:{data:{handler:fe(t)},handled:!1,type:`auto.browser.browserapierrors.xhr.${e}`}},n=D(t);return n&&(r.mechanism.data.handler=fe(n)),Nn(t,r)})});for(var r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return e.apply(this,n)}}const va=function(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).lifecycle??"route";return{name:"BrowserSession",setupOnce(){if("undefined"===typeof zn.document)return void(da&&v.warn("Using the `browserSessionIntegration` in non-browser environments is not supported."));Bt({ignoreDuration:!0}),Kt();const t=Oe();let r=t.getUser();t.addScopeListener(e=>{const t=e.getUser();r?.id===t?.id&&r?.ip_address===t?.ip_address||(Kt(),r=t)}),"route"===e&&oa(e=>{let{from:t,to:r}=e;t!==r&&(Bt({ignoreDuration:!0}),Kt())})}}};function ba(e,t){const r=e.attributes??(e.attributes={});Object.entries(t).forEach(e=>{let[t,n]=e;null==n||t in r||(r[t]=n)})}const ya=()=>({name:"CultureContext",preprocessEvent(e){const t=ka();t&&(e.contexts={...e.contexts,culture:{...t,...e.contexts?.culture}})},processSegmentSpan(e){const t=ka();t&&ba(e,{"culture.locale":t.locale,"culture.timezone":t.timezone,"culture.calendar":t.calendar})}});function ka(){try{const e=zn.Intl;if(!e)return;const t=e.DateTimeFormat().resolvedOptions();return{locale:t.locale,timezone:t.timeZone,calendar:t.calendar}}catch{return}}let ja=null;function wa(){ja=l.onerror,l.onerror=function(e,t,r,n,a){return Ln("error",{column:n,error:a,line:r,msg:e,url:t}),!!ja&&ja.apply(this,arguments)},l.onerror.__SENTRY_INSTRUMENTED__=!0}let Sa=null;function $a(){Sa=l.onunhandledrejection,l.onunhandledrejection=function(e){return Ln("unhandledrejection",e),!Sa||Sa.apply(this,arguments)},l.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const za=function(){const e={onerror:!0,onunhandledrejection:!0,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}};return{name:"GlobalHandlers",setupOnce(){Error.stackTraceLimit=50},setup(t){e.onerror&&(!function(e){!function(e){const t="error";Pn(t,e),Dn(t,wa)}(t=>{const{stackParser:r,attachStacktrace:n}=_a();if(Ie()!==e||_n())return;const{msg:a,url:i,line:o,column:l,error:s}=t,c=function(e,t,r,n){const a=e.exception=e.exception||{},i=a.values=a.values||[],o=i[0]=i[0]||{},l=o.stacktrace=o.stacktrace||{},s=l.frames=l.frames||[];0===s.length&&s.push({colno:n,lineno:r,filename:Na(t)??$n(),function:se,in_app:!0});return e}(kn(r,s||a,void 0,n,!1),i,o,l);c.level="error",Mt(c,{originalException:s,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}(t),Ea("onerror")),e.onunhandledrejection&&(!function(e){!function(e){const t="unhandledrejection";Pn(t,e),Dn(t,$a)}(t=>{const{stackParser:r,attachStacktrace:n}=_a();if(Ie()!==e||_n())return;const a=function(e){if(z(e))return e;try{if("reason"in e)return e.reason;if("detail"in e&&"reason"in e.detail)return e.detail.reason}catch{}return e}(t),i=z(a)?{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(a)}`}]}}:kn(r,a,void 0,n,!0);i.level="error",Mt(i,{originalException:a,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}(t),Ea("onunhandledrejection"))}}};function Ea(e){da&&v.log(`Global Handler attached: ${e}`)}function _a(){const e=Ie();return e?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function Na(e){if(S(e)&&0!==e.length)return e.startsWith("data:")?`<${function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(e.startsWith("data:")){const r=e.match(/^data:([^;,]+)/),n=r?r[1]:"text/plain",a=e.includes(";base64,"),i=e.indexOf(",");let o="";if(t&&-1!==i){const t=e.slice(i+1);o=t.length>10?`${t.slice(0,10)}... [truncated]`:t}return`data:${n}${a?",base64":""}${o?`,${o}`:""}`}return e}(e,!1)}>`:e}const Aa=()=>({name:"HttpContext",preprocessEvent(e){if(!zn.navigator&&!zn.location&&!zn.document)return;const t=An(),r={...t.headers,...e.request?.headers};e.request={...t,...e.request,headers:r}},processSegmentSpan(e){if(!zn.navigator&&!zn.location&&!zn.document)return;const t=An();ba(e,{"url.full":t.url||void 0,"http.request.header.user_agent":t.headers["User-Agent"],"http.request.header.referer":t.headers.Referer})}});function Ca(e,t,r,n,a,i){if(!a.exception?.values||!i||!A(i.originalException,Error))return;const o=a.exception.values.length>0?a.exception.values[a.exception.values.length-1]:void 0;o&&(a.exception.values=Fa(e,t,n,i.originalException,r,a.exception.values,o,0))}function Fa(e,t,r,n,a,i,o,l){if(i.length>=r+1)return i;let s=[...i];if(A(n[a],Error)){Pa(o,l,n);const i=e(t,n[a]),c=s.length;Da(i,a,c,l),s=Fa(e,t,r,n[a],a,[i,...s],i,c)}return Ta(n)&&n.errors.forEach((i,c)=>{if(A(i,Error)){Pa(o,l,n);const d=e(t,i),u=s.length;Da(d,`errors[${c}]`,u,l),s=Fa(e,t,r,i,a,[d,...s],d,u)}}),s}function Ta(e){return Array.isArray(e.errors)}function Pa(e,t,r){e.mechanism={handled:!0,type:"auto.core.linked_errors",...Ta(r)&&{is_exception_group:!0},...e.mechanism,exception_id:t}}function Da(e,t,r,n){e.mechanism={handled:!0,...e.mechanism,type:"chained",source:t,exception_id:r,parent_id:n}}const La=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=e.limit||5,r=e.key||"cause";return{name:"LinkedErrors",preprocessEvent(e,n,a){Ca(hn,a.getOptions().stackParser,r,t,e,n)}}};function Ra(e,t,r,n){const a={filename:e,function:"<anonymous>"===t?se:t,in_app:!0};return void 0!==r&&(a.lineno=r),void 0!==n&&(a.colno=n),a}const Oa=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Ia=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Ma=/\((\S*)(?::(\d+))(?::(\d+))\)/,Ba=/at (.+?) ?\(data:(.+?),/,Va=[30,e=>{const t=e.match(Ba);if(t)return{filename:`<data:${t[2]}>`,function:t[1]};const r=Oa.exec(e);if(r){const[,e,t,n]=r;return Ra(e,se,+t,+n)}const n=Ia.exec(e);if(n){if(0===n[2]?.indexOf("eval")){const e=Ma.exec(n[2]);e&&(n[2]=e[1],n[3]=e[2],n[4]=e[3])}const[e,t]=qa(n[1]||se,n[2]);return Ra(t,e,n[3]?+n[3]:void 0,n[4]?+n[4]:void 0)}}],Ua=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Ka=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Ha=[50,e=>{const t=Ua.exec(e);if(t){if(t[3]&&t[3].indexOf(" > eval")>-1){const e=Ka.exec(t[3]);e&&(t[1]=t[1]||"eval",t[3]=e[1],t[4]=e[2],t[5]="")}let e=t[3],r=t[1]||se;return[r,e]=qa(r,e),Ra(e,r,t[4]?+t[4]:void 0,t[5]?+t[5]:void 0)}}],Wa=ue(...[Va,Ha]),qa=(e,t)=>{const r=-1!==e.indexOf("safari-extension"),n=-1!==e.indexOf("safari-web-extension");return r||n?[-1!==e.indexOf("@")?e.split("@")[0]:se,r?`safari-extension:${t}`:`safari-web-extension:${t}`]:[e,t]},Ya="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,Ga={};function Qa(e){const t=Ga[e];if(t)return t;let r=Jn[e];if(Bn(r))return Ga[e]=r.bind(Jn);const n=Jn.document;if(n&&"function"===typeof n.createElement)try{const t=n.createElement("iframe");t.hidden=!0,n.head.appendChild(t);const a=t.contentWindow;a?.[e]&&(r=a[e]),n.head.removeChild(t)}catch(a){Ya&&v.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,a)}return r?Ga[e]=r.bind(Jn):r}function Ja(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Qa("fetch"),r=0,n=0;return Rr(e,async function(a){const i=a.body.length;r+=i,n++;const o={body:a.body,method:"POST",referrerPolicy:"strict-origin",headers:e.headers,keepalive:r<=6e4&&n<15,...e.fetchOptions};try{const r=await t(e.url,o);return{statusCode:r.status,headers:{"x-sentry-rate-limits":r.headers.get("X-Sentry-Rate-Limits"),"retry-after":r.headers.get("Retry-After")}}}catch(l){throw Ga["fetch"]=void 0,l}finally{r-=i,n--}},Dr(e.bufferSize||40))}const Xa=/^HTML(\w*)Element$/;function Za(e){if("undefined"!==typeof window&&e===window)return"[Window]";if("undefined"!==typeof document&&e===document)return"[Document]";if(function(e){if("undefined"===typeof Element)return!1;try{return e instanceof Element}catch{return!1}}(e)){const t=function(e){const t=Object.getPrototypeOf(e);return t?.constructor?t.constructor.name:"null prototype"}(e);if(Xa.test(t))return`[HTMLElement: ${sa(e)}]`}}function ei(){return!!function(){if("undefined"===typeof zn.window)return!1;const e=zn;if(e.nw)return!1;const t=e.chrome||e.browser;if(!t?.runtime?.id)return!1;const r=$n();return!(zn===zn.top&&/^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(r))}()&&(da&&f(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0)}function ti(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=!e.skipBrowserExtensionCheck&&ei();let r=null==e.defaultIntegrations?[Xt(),nr(),ar(),fa(),pa(),za(),La(),ir(),Aa(),ya(),va()]:e.defaultIntegrations;const n={...e,enabled:!t&&e.enabled,stackParser:(a=e.stackParser||Wa,Array.isArray(a)?ue(...a):a),integrations:Wt({integrations:e.integrations,defaultIntegrations:r}),transport:e.transport||Ja};var a;return xe(Za),cr(Cn,n)}function ri(e){const t={...e};var r,a;dn(t,"react"),r="react",a={version:n.version},Oe().setContext(r,a);const i=ti(t);return xe(ni),i}function ni(e){return E(t=e)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t?"[SyntheticEvent]":Za(e);var t}var ai="popstate";function ii(e){return"object"===typeof e&&null!=e&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function oi(){return hi(function(e,t){let r=t.state?.masked,{pathname:n,search:a,hash:i}=r||e.location;return di("",{pathname:n,search:a,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||"default",r?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)},function(e,t){return"string"===typeof t?t:ui(t)},null,arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function li(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}function si(e,t){if(!e){"undefined"!==typeof console&&console.warn(t);try{throw new Error(t)}catch(r){}}}function ci(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function di(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;return{pathname:"string"===typeof e?e:e.pathname,search:"",hash:"",..."string"===typeof t?pi(t):t,state:r,key:t&&t.key||n||Math.random().toString(36).substring(2,10),unstable_mask:a}}function ui(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&"?"!==r&&(t+="?"===r.charAt(0)?r:"?"+r),n&&"#"!==n&&(t+="#"===n.charAt(0)?n:"#"+n),t}function pi(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substring(r),e=e.substring(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substring(n),e=e.substring(0,n)),e&&(t.pathname=e)}return t}function hi(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{window:a=document.defaultView,v5Compat:i=!1}=n,o=a.history,l="POP",s=null,c=d();function d(){return(o.state||{idx:null}).idx}function u(){l="POP";let e=d(),t=null==e?null:e-c;c=e,s&&s({action:l,location:h.location,delta:t})}function p(e){return fi(e)}null==c&&(c=0,o.replaceState({...o.state,idx:c},""));let h={get action(){return l},get location(){return e(a,o)},listen(e){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(ai,u),s=e,()=>{a.removeEventListener(ai,u),s=null}},createHref:e=>t(a,e),createURL:p,encodeLocation(e){let t=p(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:function(e,t){l="PUSH";let n=ii(e)?e:di(h.location,e,t);r&&r(n,e),c=d()+1;let u=ci(n,c),p=h.createHref(n.unstable_mask||n);try{o.pushState(u,"",p)}catch(f){if(f instanceof DOMException&&"DataCloneError"===f.name)throw f;a.location.assign(p)}i&&s&&s({action:l,location:h.location,delta:1})},replace:function(e,t){l="REPLACE";let n=ii(e)?e:di(h.location,e,t);r&&r(n,e),c=d();let a=ci(n,c),u=h.createHref(n.unstable_mask||n);o.replaceState(a,"",u),i&&s&&s({action:l,location:h.location,delta:0})},go:e=>o.go(e)};return h}function fi(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r="http://localhost";"undefined"!==typeof window&&(r="null"!==window.location.origin?window.location.origin:window.location.href),li(r,"No window.location.(origin|href) available to create URL");let n="string"===typeof e?e:ui(e);return n=n.replace(/ $/,"%20"),!t&&n.startsWith("//")&&(n=r+n),new URL(n,r)}new WeakMap;function mi(e,t){return gi(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/",!1)}function gi(e,t,r,n){let a=Ci(("string"===typeof t?pi(t):t).pathname||"/",r);if(null==a)return null;let i=xi(e);!function(e){e.sort((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){let r=e.length===t.length&&e.slice(0,-1).every((e,r)=>e===t[r]);return r?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)))}(i);let o=null;for(let l=0;null==o&&l<i.length;++l){let e=Ai(a);o=Ei(i[l],e,n)}return o}function xi(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e,i){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,l=arguments.length>3?arguments[3]:void 0,s={relativePath:void 0===l?e.path||"":l,caseSensitive:!0===e.caseSensitive,childrenIndex:i,route:e};if(s.relativePath.startsWith("/")){if(!s.relativePath.startsWith(n)&&o)return;li(s.relativePath.startsWith(n),`Absolute route path "${s.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),s.relativePath=s.relativePath.slice(n.length)}let c=Oi([n,s.relativePath]),d=r.concat(s);e.children&&e.children.length>0&&(li(!0!==e.index,`Index routes must not have child routes. Please remove all child routes from route path "${c}".`),xi(e.children,t,d,c,o)),(null!=e.path||e.index)&&t.push({path:c,score:zi(c,e.index),routesMeta:d})};return e.forEach((e,t)=>{if(""!==e.path&&e.path?.includes("?"))for(let r of vi(e.path))i(e,t,!0,r);else i(e,t)}),t}function vi(e){let t=e.split("/");if(0===t.length)return[];let[r,...n]=t,a=r.endsWith("?"),i=r.replace(/\?$/,"");if(0===n.length)return a?[i,""]:[i];let o=vi(n.join("/")),l=[];return l.push(...o.map(e=>""===e?i:[i,e].join("/"))),a&&l.push(...o),l.map(t=>e.startsWith("/")&&""===t?"/":t)}var bi=/^:[\w-]+$/,yi=3,ki=2,ji=1,wi=10,Si=-2,$i=e=>"*"===e;function zi(e,t){let r=e.split("/"),n=r.length;return r.some($i)&&(n+=Si),t&&(n+=ki),r.filter(e=>!$i(e)).reduce((e,t)=>e+(bi.test(t)?yi:""===t?ji:wi),n)}function Ei(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{routesMeta:n}=e,a={},i="/",o=[];for(let l=0;l<n.length;++l){let e=n[l],s=l===n.length-1,c="/"===i?t:t.slice(i.length)||"/",d=_i({path:e.relativePath,caseSensitive:e.caseSensitive,end:s},c),u=e.route;if(!d&&s&&r&&!n[n.length-1].route.index&&(d=_i({path:e.relativePath,caseSensitive:e.caseSensitive,end:!1},c)),!d)return null;Object.assign(a,d.params),o.push({params:a,pathname:Oi([i,d.pathname]),pathnameBase:Ii(Oi([i,d.pathnameBase])),route:u}),"/"!==d.pathnameBase&&(i=Oi([i,d.pathnameBase]))}return o}function _i(e,t){"string"===typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Ni(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:n.reduce((e,t,r)=>{let{paramName:n,isOptional:a}=t;if("*"===n){let e=l[r]||"";o=i.slice(0,i.length-e.length).replace(/(.)\/+$/,"$1")}const s=l[r];return e[n]=a&&!s?void 0:(s||"").replace(/%2F/g,"/"),e},{}),pathname:i,pathnameBase:o,pattern:e}}function Ni(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];si("*"===e||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let n=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(e,t,r,a,i)=>{if(n.push({paramName:t,isOptional:null!=r}),r){let t=i.charAt(a+e.length);return t&&"/"!==t?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(n.push({paramName:"*"}),a+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":""!==e&&"/"!==e&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),n]}function Ai(e){try{return e.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(t){return si(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Ci(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&"/"!==n?null:e.slice(r)||"/"}var Fi=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Ti(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(e=>{".."===e?r.length>1&&r.pop():"."!==e&&r.push(e)}),r.length>1?r.join("/"):"/"}function Pi(e,t,r,n){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Di(e){return e.filter((e,t)=>0===t||e.route.path&&e.route.path.length>0)}function Li(e){let t=Di(e);return t.map((e,r)=>r===t.length-1?e.pathname:e.pathnameBase)}function Ri(e,t,r){let n,a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];"string"===typeof e?n=pi(e):(n={...e},li(!n.pathname||!n.pathname.includes("?"),Pi("?","pathname","search",n)),li(!n.pathname||!n.pathname.includes("#"),Pi("#","pathname","hash",n)),li(!n.search||!n.search.includes("#"),Pi("#","search","hash",n)));let i,o=""===e||""===n.pathname,l=o?"/":n.pathname;if(null==l)i=r;else{let e=t.length-1;if(!a&&l.startsWith("..")){let t=l.split("/");for(;".."===t[0];)t.shift(),e-=1;n.pathname=t.join("/")}i=e>=0?t[e]:"/"}let s=function(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/",{pathname:n,search:a="",hash:i=""}="string"===typeof e?pi(e):e;return n?(n=n.replace(/\/\/+/g,"/"),t=n.startsWith("/")?Ti(n.substring(1),"/"):Ti(n,r)):t=r,{pathname:t,search:Mi(a),hash:Bi(i)}}(n,i),c=l&&"/"!==l&&l.endsWith("/"),d=(o||"."===l)&&r.endsWith("/");return s.pathname.endsWith("/")||!c&&!d||(s.pathname+="/"),s}var Oi=e=>e.join("/").replace(/\/\/+/g,"/"),Ii=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Mi=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",Bi=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";var Vi=class{constructor(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.status=e,this.statusText=t||"",this.internal=n,r instanceof Error?(this.data=r.toString(),this.error=r):this.data=r}};function Ui(e){return null!=e&&"number"===typeof e.status&&"string"===typeof e.statusText&&"boolean"===typeof e.internal&&"data"in e}function Ki(e){return e.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Hi="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;function Wi(e,t){let r=e;if("string"!==typeof r||!Fi.test(r))return{absoluteURL:void 0,isExternal:!1,to:r};let n=r,a=!1;if(Hi)try{let e=new URL(window.location.href),n=r.startsWith("//")?new URL(e.protocol+r):new URL(r),i=Ci(n.pathname,t);n.origin===e.origin&&null!=i?r=i+n.search+n.hash:a=!0}catch(i){si(!1,`<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:n,isExternal:a,to:r}}Symbol("Uninstrumented");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var qi=["POST","PUT","PATCH","DELETE"],Yi=(new Set(qi),["GET",...qi]);new Set(Yi),Symbol("ResetLoaderData");var Gi=n.createContext(null);Gi.displayName="DataRouter";var Qi=n.createContext(null);Qi.displayName="DataRouterState";var Ji=n.createContext(!1);function Xi(){return n.useContext(Ji)}var Zi=n.createContext({isTransitioning:!1});Zi.displayName="ViewTransition";var eo=n.createContext(new Map);eo.displayName="Fetchers";var to=n.createContext(null);to.displayName="Await";var ro=n.createContext(null);ro.displayName="Navigation";var no=n.createContext(null);no.displayName="Location";var ao=n.createContext({outlet:null,matches:[],isDataRoute:!1});ao.displayName="Route";var io=n.createContext(null);io.displayName="RouteError";var oo="REACT_ROUTER_ERROR";function lo(){return null!=n.useContext(no)}function so(){return li(lo(),"useLocation() may be used only in the context of a <Router> component."),n.useContext(no).location}var co="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function uo(e){n.useContext(ro).static||n.useLayoutEffect(e)}function po(){let{isDataRoute:e}=n.useContext(ao);return e?function(){let{router:e}=So("useNavigate"),t=zo("useNavigate"),r=n.useRef(!1);uo(()=>{r.current=!0});let a=n.useCallback(async function(n){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};si(r.current,co),r.current&&("number"===typeof n?await e.navigate(n):await e.navigate(n,{fromRouteId:t,...a}))},[e,t]);return a}():function(){li(lo(),"useNavigate() may be used only in the context of a <Router> component.");let e=n.useContext(Gi),{basename:t,navigator:r}=n.useContext(ro),{matches:a}=n.useContext(ao),{pathname:i}=so(),o=JSON.stringify(Li(a)),l=n.useRef(!1);uo(()=>{l.current=!0});let s=n.useCallback(function(n){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(si(l.current,co),!l.current)return;if("number"===typeof n)return void r.go(n);let s=Ri(n,JSON.parse(o),i,"path"===a.relative);null==e&&"/"!==t&&(s.pathname="/"===s.pathname?t:Oi([t,s.pathname])),(a.replace?r.replace:r.push)(s,a.state,a)},[t,r,o,i,e]);return s}()}n.createContext(null);function ho(){let{matches:e}=n.useContext(ao),t=e[e.length-1];return t?t.params:{}}function fo(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{matches:r}=n.useContext(ao),{pathname:a}=so(),i=JSON.stringify(Li(r));return n.useMemo(()=>Ri(e,JSON.parse(i),a,"path"===t),[e,i,a,t])}function mo(e,t,r){li(lo(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=n.useContext(ro),{matches:i}=n.useContext(ao),o=i[i.length-1],l=o?o.params:{},s=o?o.pathname:"/",c=o?o.pathnameBase:"/",d=o&&o.route;{let e=d&&d.path||"";No(s,!d||e.endsWith("*")||e.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${"/"===e?"*":`${e}/*`}">.`)}let u,p=so();if(t){let e="string"===typeof t?pi(t):t;li("/"===c||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),u=e}else u=p;let h=u.pathname||"/",f=h;if("/"!==c){let e=c.replace(/^\//,"").split("/");f="/"+h.replace(/^\//,"").split("/").slice(e.length).join("/")}let m=mi(e,{pathname:f});si(d||null!=m,`No routes matched location "${u.pathname}${u.search}${u.hash}" `),si(null==m||void 0!==m[m.length-1].route.element||void 0!==m[m.length-1].route.Component||void 0!==m[m.length-1].route.lazy,`Matched leaf route at location "${u.pathname}${u.search}${u.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let g=jo(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},l,e.params),pathname:Oi([c,a.encodeLocation?a.encodeLocation(e.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?c:Oi([c,a.encodeLocation?a.encodeLocation(e.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:e.pathnameBase])})),i,r);return t&&g?n.createElement(no.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...u},navigationType:"POP"}},g):g}function go(){let e=Eo(),t=Ui(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},l=null;return console.error("Error handled by React Router default ErrorBoundary:",e),l=n.createElement(n.Fragment,null,n.createElement("p",null,"\ud83d\udcbf Hey developer \ud83d\udc4b"),n.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",n.createElement("code",{style:o},"ErrorBoundary")," or"," ",n.createElement("code",{style:o},"errorElement")," prop on your route.")),n.createElement(n.Fragment,null,n.createElement("h2",null,"Unexpected Application Error!"),n.createElement("h3",{style:{fontStyle:"italic"}},t),r?n.createElement("pre",{style:i},r):null,l)}var xo=n.createElement(go,null),vo=class extends n.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||"idle"!==t.revalidation&&"idle"===e.revalidation?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:void 0!==e.error?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&"object"===typeof e&&e&&"digest"in e&&"string"===typeof e.digest){const t=function(e){if(e.startsWith(`${oo}:ROUTE_ERROR_RESPONSE:{`))try{let t=JSON.parse(e.slice(40));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText)return new Vi(t.status,t.statusText,t.data)}catch{}}(e.digest);t&&(e=t)}let t=void 0!==e?n.createElement(ao.Provider,{value:this.props.routeContext},n.createElement(io.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?n.createElement(yo,{error:e},t):t}};vo.contextType=Ji;var bo=new WeakMap;function yo(e){let{children:t,error:r}=e,{basename:a}=n.useContext(ro);if("object"===typeof r&&r&&"digest"in r&&"string"===typeof r.digest){let e=function(e){if(e.startsWith(`${oo}:REDIRECT:{`))try{let t=JSON.parse(e.slice(28));if("object"===typeof t&&t&&"number"===typeof t.status&&"string"===typeof t.statusText&&"string"===typeof t.location&&"boolean"===typeof t.reloadDocument&&"boolean"===typeof t.replace)return t}catch{}}(r.digest);if(e){let t=bo.get(r);if(t)throw t;let i=Wi(e.location,a);if(Hi&&!bo.get(r)){if(!i.isExternal&&!e.reloadDocument){const t=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw bo.set(r,t),t}window.location.href=i.absoluteURL||i.to}return n.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return t}function ko(e){let{routeContext:t,match:r,children:a}=e,i=n.useContext(Gi);return i&&i.static&&i.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=r.route.id),n.createElement(ao.Provider,{value:t},a)}function jo(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0,a=r?.state;if(null==e){if(!a)return null;if(a.errors)e=a.matches;else{if(0!==t.length||a.initialized||!(a.matches.length>0))return null;e=a.matches}}let i=e,o=a?.errors;if(null!=o){let e=i.findIndex(e=>e.route.id&&void 0!==o?.[e.route.id]);li(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),i=i.slice(0,Math.min(i.length,e+1))}let l=!1,s=-1;if(r&&a){l=a.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:n}=a,o=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!n||void 0===n[t.route.id]);if(t.route.lazy||o){r.isStatic&&(l=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=r?.onError,d=a&&c?(e,t)=>{c(e,{location:a.location,params:a.matches?.[0]?.params??{},unstable_pattern:Ki(a.matches),errorInfo:t})}:void 0;return i.reduceRight((e,r,c)=>{let u,p=!1,h=null,f=null;a&&(u=o&&r.route.id?o[r.route.id]:void 0,h=r.route.errorElement||xo,l&&(s<0&&0===c?(No("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),p=!0,f=null):s===c&&(p=!0,f=r.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),g=()=>{let t;return t=u?h:p?f:r.route.Component?n.createElement(r.route.Component,null):r.route.element?r.route.element:e,n.createElement(ko,{match:r,routeContext:{outlet:e,matches:m,isDataRoute:null!=a},children:t})};return a&&(r.route.ErrorBoundary||r.route.errorElement||0===c)?n.createElement(vo,{location:a.location,revalidation:a.revalidation,component:h,error:u,children:g(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:d}):g()},null)}function wo(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function So(e){let t=n.useContext(Gi);return li(t,wo(e)),t}function $o(e){let t=n.useContext(Qi);return li(t,wo(e)),t}function zo(e){let t=function(e){let t=n.useContext(ao);return li(t,wo(e)),t}(e),r=t.matches[t.matches.length-1];return li(r.route.id,`${e} can only be used on routes that contain a unique "id"`),r.route.id}function Eo(){let e=n.useContext(io),t=$o("useRouteError"),r=zo("useRouteError");return void 0!==e?e:t.errors?.[r]}var _o={};function No(e,t,r){t||_o[e]||(_o[e]=!0,si(!1,r))}var Ao={};function Co(e,t){e||Ao[t]||(Ao[t]=!0,console.warn(t))}a.useOptimistic;n.memo(Fo);function Fo(e){let{routes:t,future:r,state:n,isStatic:a,onError:i}=e;return mo(t,void 0,{state:n,isStatic:a,onError:i,future:r})}function To(e){let{to:t,replace:r,state:a,relative:i}=e;li(lo(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=n.useContext(ro);si(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:l}=n.useContext(ao),{pathname:s}=so(),c=po(),d=Ri(t,Li(l),s,"path"===i),u=JSON.stringify(d);return n.useEffect(()=>{c(JSON.parse(u),{replace:r,state:a,relative:i})},[c,u,i,r,a]),null}function Po(e){li(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Do(e){let{basename:t="/",children:r=null,location:a,navigationType:i="POP",navigator:o,static:l=!1,unstable_useTransitions:s}=e;li(!lo(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let c=t.replace(/^\/*/,"/"),d=n.useMemo(()=>({basename:c,navigator:o,static:l,unstable_useTransitions:s,future:{}}),[c,o,l,s]);"string"===typeof a&&(a=pi(a));let{pathname:u="/",search:p="",hash:h="",state:f=null,key:m="default",unstable_mask:g}=a,x=n.useMemo(()=>{let e=Ci(u,c);return null==e?null:{location:{pathname:e,search:p,hash:h,state:f,key:m,unstable_mask:g},navigationType:i}},[c,u,p,h,f,m,i,g]);return si(null!=x,`<Router basename="${c}"> is not able to match the URL "${u}${p}${h}" because it does not start with the basename, so the <Router> won't render anything.`),null==x?null:n.createElement(ro.Provider,{value:d},n.createElement(no.Provider,{children:r,value:x}))}function Lo(e){let{children:t,location:r}=e;return mo(Ro(t),r)}n.Component;function Ro(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=[];return n.Children.forEach(e,(e,a)=>{if(!n.isValidElement(e))return;let i=[...t,a];if(e.type===n.Fragment)return void r.push.apply(r,Ro(e.props.children,i));li(e.type===Po,`[${"string"===typeof e.type?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),li(!e.props.index||!e.props.children,"An index route cannot have child routes.");let o={id:e.props.id||i.join("-"),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:!0===e.props.hasErrorBoundary||null!=e.props.ErrorBoundary||null!=e.props.errorElement,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(o.children=Ro(e.props.children,i)),r.push(o)}),r}var Oo="get",Io="application/x-www-form-urlencoded";function Mo(e){return"undefined"!==typeof HTMLElement&&e instanceof HTMLElement}function Bo(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new URLSearchParams("string"===typeof e||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,r)=>{let n=e[r];return t.concat(Array.isArray(n)?n.map(e=>[r,e]):[[r,n]])},[]))}var Vo=null;var Uo=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Ko(e){return null==e||Uo.has(e)?e:(si(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Io}"`),null)}function Ho(e,t){let r,n,a,i,o;if(Mo(l=e)&&"form"===l.tagName.toLowerCase()){let o=e.getAttribute("action");n=o?Ci(o,t):null,r=e.getAttribute("method")||Oo,a=Ko(e.getAttribute("enctype"))||Io,i=new FormData(e)}else if(function(e){return Mo(e)&&"button"===e.tagName.toLowerCase()}(e)||function(e){return Mo(e)&&"input"===e.tagName.toLowerCase()}(e)&&("submit"===e.type||"image"===e.type)){let o=e.form;if(null==o)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||o.getAttribute("action");if(n=l?Ci(l,t):null,r=e.getAttribute("formmethod")||o.getAttribute("method")||Oo,a=Ko(e.getAttribute("formenctype"))||Ko(o.getAttribute("enctype"))||Io,i=new FormData(o,e),!function(){if(null===Vo)try{new FormData(document.createElement("form"),0),Vo=!1}catch(e){Vo=!0}return Vo}()){let{name:t,type:r,value:n}=e;if("image"===r){let e=t?`${t}.`:"";i.append(`${e}x`,"0"),i.append(`${e}y`,"0")}else t&&i.append(t,n)}}else{if(Mo(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');r=Oo,n=null,a=Io,o=e}var l;return i&&"text/plain"===a&&(o=i,i=void 0),{action:n,method:r.toLowerCase(),encType:a,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");"undefined"!==typeof window?window:"undefined"!==typeof globalThis&&globalThis;function Wo(e,t){if(!1===e||null===e||"undefined"===typeof e)throw new Error(t)}Symbol("SingleFetchRedirect");function qo(e,t,r,n){let a="string"===typeof e?new URL(e,"undefined"===typeof window?"server://singlefetch/":window.location.origin):e;return r?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${n}`:a.pathname=`${a.pathname}.${n}`:"/"===a.pathname?a.pathname=`_root.${n}`:t&&"/"===Ci(a.pathname,t)?a.pathname=`${t.replace(/\/$/,"")}/_root.${n}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${n}`,a}async function Yo(e,t){if(e.id in t)return t[e.id];try{let r=await import(e.module);return t[e.id]=r,r}catch(r){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(r),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Go(e){return null!=e&&"string"===typeof e.page}function Qo(e){return null!=e&&(null==e.href?"preload"===e.rel&&"string"===typeof e.imageSrcSet&&"string"===typeof e.imageSizes:"string"===typeof e.rel&&"string"===typeof e.href)}function Jo(e,t,r,n,a,i){let o=(e,t)=>!r[t]||e.route.id!==r[t].route.id,l=(e,t)=>r[t].pathname!==e.pathname||r[t].route.path?.endsWith("*")&&r[t].params["*"]!==e.params["*"];return"assets"===i?t.filter((e,t)=>o(e,t)||l(e,t)):"data"===i?t.filter((t,i)=>{let s=n.routes[t.route.id];if(!s||!s.hasLoader)return!1;if(o(t,i)||l(t,i))return!0;if(t.route.shouldRevalidate){let n=t.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:r[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if("boolean"===typeof n)return n}return!0}):[]}function Xo(e,t){let{includeHydrateFallback:r}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n=e.map(e=>{let n=t.routes[e.route.id];if(!n)return[];let a=[n.module];return n.clientActionModule&&(a=a.concat(n.clientActionModule)),n.clientLoaderModule&&(a=a.concat(n.clientLoaderModule)),r&&n.hydrateFallbackModule&&(a=a.concat(n.hydrateFallbackModule)),n.imports&&(a=a.concat(n.imports)),a}).flat(1),[...new Set(n)];var n}function Zo(e,t){let r=new Set,n=new Set(t);return e.reduce((e,a)=>{if(t&&!Go(a)&&"script"===a.as&&a.href&&n.has(a.href))return e;let i=JSON.stringify(function(e){let t={},r=Object.keys(e).sort();for(let n of r)t[n]=e[n];return t}(a));return r.has(i)||(r.add(i),e.push({key:i,link:a})),e},[])}function el(e,t){return"lazy"===e.mode&&!0===t}function tl(){let e=n.useContext(Gi);return Wo(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function rl(){let e=n.useContext(Qi);return Wo(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var nl=n.createContext(void 0);function al(){let e=n.useContext(nl);return Wo(e,"You must render this element inside a <HydratedRouter> element"),e}function il(e,t){return r=>{e&&e(r),r.defaultPrevented||t(r)}}function ol(e,t,r){if(r&&!dl)return[e[0]];if(t){let r=e.findIndex(e=>void 0!==t[e.route.id]);return e.slice(0,r+1)}return e}nl.displayName="FrameworkContext";function ll(e){let{page:t,...r}=e,{router:a}=tl(),i=n.useMemo(()=>mi(a.routes,t,a.basename),[a.routes,t,a.basename]);return i?n.createElement(cl,{page:t,matches:i,...r}):null}function sl(e){let{manifest:t,routeModules:r}=al(),[a,i]=n.useState([]);return n.useEffect(()=>{let n=!1;return async function(e,t,r){let n=await Promise.all(e.map(async e=>{let n=t.routes[e.route.id];if(n){let e=await Yo(n,r);return e.links?e.links():[]}return[]}));return Zo(n.flat(1).filter(Qo).filter(e=>"stylesheet"===e.rel||"preload"===e.rel).map(e=>"stylesheet"===e.rel?{...e,rel:"prefetch",as:"style"}:{...e,rel:"prefetch"}))}(e,t,r).then(e=>{n||i(e)}),()=>{n=!0}},[e,t,r]),a}function cl(e){let{page:t,matches:r,...a}=e,i=so(),{future:o,manifest:l,routeModules:s}=al(),{basename:c}=tl(),{loaderData:d,matches:u}=rl(),p=n.useMemo(()=>Jo(t,r,u,l,i,"data"),[t,r,u,l,i]),h=n.useMemo(()=>Jo(t,r,u,l,i,"assets"),[t,r,u,l,i]),f=n.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let e=new Set,n=!1;if(r.forEach(t=>{let r=l.routes[t.route.id];r&&r.hasLoader&&(!p.some(e=>e.route.id===t.route.id)&&t.route.id in d&&s[t.route.id]?.shouldRevalidate||r.hasClientLoader?n=!0:e.add(t.route.id))}),0===e.size)return[];let a=qo(t,c,o.unstable_trailingSlashAwareDataRequests,"data");return n&&e.size>0&&a.searchParams.set("_routes",r.filter(t=>e.has(t.route.id)).map(e=>e.route.id).join(",")),[a.pathname+a.search]},[c,o.unstable_trailingSlashAwareDataRequests,d,i,l,p,r,t,s]),m=n.useMemo(()=>Xo(h,l),[h,l]),g=sl(h);return n.createElement(n.Fragment,null,f.map(e=>n.createElement("link",{key:e,rel:"prefetch",as:"fetch",href:e,...a})),m.map(e=>n.createElement("link",{key:e,rel:"modulepreload",href:e,...a})),g.map(e=>{let{key:t,link:r}=e;return n.createElement("link",{key:t,nonce:a.nonce,...r,crossOrigin:r.crossOrigin??a.crossOrigin})}))}var dl=!1;function ul(e){let{manifest:t,serverHandoffString:r,isSpaMode:a,renderMeta:i,routeDiscovery:o,ssr:l}=al(),{router:s,static:c,staticContext:d}=tl(),{matches:u}=rl(),p=Xi(),h=el(o,l);i&&(i.didRenderScripts=!0);let f=ol(u,null,a);n.useEffect(()=>{dl=!0},[]);let m=n.useMemo(()=>{if(p)return null;let a=d?`window.__reactRouterContext = ${r};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`:" ",i=c?`${t.hmr?.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}${h?"":`import ${JSON.stringify(t.url)}`};\n${f.map((e,r)=>{let n=`route${r}`,a=t.routes[e.route.id];Wo(a,`Route ${e.route.id} not found in manifest`);let{clientActionModule:i,clientLoaderModule:o,clientMiddlewareModule:l,hydrateFallbackModule:s,module:c}=a,d=[...i?[{module:i,varName:`${n}_clientAction`}]:[],...o?[{module:o,varName:`${n}_clientLoader`}]:[],...l?[{module:l,varName:`${n}_clientMiddleware`}]:[],...s?[{module:s,varName:`${n}_HydrateFallback`}]:[],{module:c,varName:`${n}_main`}];return 1===d.length?`import * as ${n} from ${JSON.stringify(c)};`:[d.map(e=>`import * as ${e.varName} from "${e.module}";`).join("\n"),`const ${n} = {${d.map(e=>`...${e.varName}`).join(",")}};`].join("\n")}).join("\n")}\n  ${h?`window.__reactRouterManifest = ${JSON.stringify(function(e,t){let{sri:r,...n}=e,a=new Set(t.state.matches.map(e=>e.route.id)),i=t.state.location.pathname.split("/").filter(Boolean),o=["/"];for(i.pop();i.length>0;)o.push(`/${i.join("/")}`),i.pop();o.forEach(e=>{let r=mi(t.routes,e,t.basename);r&&r.forEach(e=>a.add(e.route.id))});let l=[...a].reduce((e,t)=>Object.assign(e,{[t]:n.routes[t]}),{});return{...n,routes:l,sri:!!r||void 0}}(t,s),null,2)};`:""}\n  window.__reactRouterRouteModules = {${f.map((e,t)=>`${JSON.stringify(e.route.id)}:route${t}`).join(",")}};\n\nimport(${JSON.stringify(t.entry.module)});`:" ";return n.createElement(n.Fragment,null,n.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:a},type:void 0}),n.createElement("script",{...e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:i},type:"module",async:!0}))},[]),g=dl||p?[]:(x=t.entry.imports.concat(Xo(f,t,{includeHydrateFallback:!0})),[...new Set(x)]);var x;let v="object"===typeof t.sri?t.sri:{};return Co(!p,"The <Scripts /> element is a no-op when using RSC and can be safely removed."),dl||p?null:n.createElement(n.Fragment,null,"object"===typeof t.sri?n.createElement("script",{...e,"rr-importmap":"",type:"importmap",suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:JSON.stringify({integrity:v})}}):null,h?null:n.createElement("link",{rel:"modulepreload",href:t.url,crossOrigin:e.crossOrigin,integrity:v[t.url],suppressHydrationWarning:!0}),n.createElement("link",{rel:"modulepreload",href:t.entry.module,crossOrigin:e.crossOrigin,integrity:v[t.entry.module],suppressHydrationWarning:!0}),g.map(t=>n.createElement("link",{key:t,rel:"modulepreload",href:t,crossOrigin:e.crossOrigin,integrity:v[t],suppressHydrationWarning:!0})),m)}function pl(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return e=>{t.forEach(t=>{"function"===typeof t?t(e):null!=t&&(t.current=e)})}}n.Component;function hl(e){let{error:t,isOutsideRemixApp:r}=e;console.error(t);let a,i=n.createElement("script",{dangerouslySetInnerHTML:{__html:'\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."\n        );\n      '}});if(Ui(t))return n.createElement(fl,{title:"Unhandled Thrown Response!"},n.createElement("h1",{style:{fontSize:"24px"}},t.status," ",t.statusText),i);if(t instanceof Error)a=t;else{let e=null==t?"Unknown Error":"object"===typeof t&&"toString"in t?t.toString():JSON.stringify(t);a=new Error(e)}return n.createElement(fl,{title:"Application Error!",isOutsideRemixApp:r},n.createElement("h1",{style:{fontSize:"24px"}},"Application Error"),n.createElement("pre",{style:{padding:"2rem",background:"hsla(10, 50%, 50%, 0.1)",color:"red",overflow:"auto"}},a.stack),i)}function fl(e){let{title:t,renderScripts:r,isOutsideRemixApp:a,children:i}=e,{routeModules:o}=al();return o.root?.Layout&&!a?i:n.createElement("html",{lang:"en"},n.createElement("head",null,n.createElement("meta",{charSet:"utf-8"}),n.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,viewport-fit=cover"}),n.createElement("title",null,t)),n.createElement("body",null,n.createElement("main",{style:{fontFamily:"system-ui, sans-serif",padding:"2rem"}},i,r?n.createElement(ul,null):null)))}var ml="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement;try{ml&&(window.__reactRouterVersion="7.13.2")}catch(vw){}function gl(e){let{basename:t,children:r,unstable_useTransitions:a,window:i}=e,o=n.useRef();null==o.current&&(o.current=oi({window:i,v5Compat:!0}));let l=o.current,[s,c]=n.useState({action:l.action,location:l.location}),d=n.useCallback(e=>{!1===a?c(e):n.startTransition(()=>c(e))},[a]);return n.useLayoutEffect(()=>l.listen(d),[l,d]),n.createElement(Do,{basename:t,children:r,location:s.location,navigationType:s.action,navigator:l,unstable_useTransitions:a})}var xl=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vl=n.forwardRef(function(e,t){let{onClick:r,discover:a="render",prefetch:i="none",relative:o,reloadDocument:l,replace:s,unstable_mask:c,state:d,target:u,to:p,preventScrollReset:h,viewTransition:f,unstable_defaultShouldRevalidate:m,...g}=e,{basename:x,navigator:v,unstable_useTransitions:b}=n.useContext(ro),y="string"===typeof p&&xl.test(p),k=Wi(p,x);p=k.to;let j=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};li(lo(),"useHref() may be used only in the context of a <Router> component.");let{basename:r,navigator:a}=n.useContext(ro),{hash:i,pathname:o,search:l}=fo(e,{relative:t}),s=o;return"/"!==r&&(s="/"===o?r:Oi([r,o])),a.createHref({pathname:s,search:l,hash:i})}(p,{relative:o}),w=so(),S=null;if(c){let e=Ri(c,[],w.unstable_mask?w.unstable_mask.pathname:"/",!0);"/"!==x&&(e.pathname="/"===e.pathname?x:Oi([x,e.pathname])),S=v.createHref(e)}let[$,z,E]=function(e,t){let r=n.useContext(nl),[a,i]=n.useState(!1),[o,l]=n.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:d,onMouseLeave:u,onTouchStart:p}=t,h=n.useRef(null);n.useEffect(()=>{if("render"===e&&l(!0),"viewport"===e){let e=new IntersectionObserver(e=>{e.forEach(e=>{l(e.isIntersecting)})},{threshold:.5});return h.current&&e.observe(h.current),()=>{e.disconnect()}}},[e]),n.useEffect(()=>{if(a){let e=setTimeout(()=>{l(!0)},100);return()=>{clearTimeout(e)}}},[a]);let f=()=>{i(!0)},m=()=>{i(!1),l(!1)};return r?"intent"!==e?[o,h,{}]:[o,h,{onFocus:il(s,f),onBlur:il(c,m),onMouseEnter:il(d,f),onMouseLeave:il(u,m),onTouchStart:il(p,f)}]:[!1,h,{}]}(i,g),_=function(e){let{target:t,replace:r,unstable_mask:a,state:i,preventScrollReset:o,relative:l,viewTransition:s,unstable_defaultShouldRevalidate:c,unstable_useTransitions:d}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=po(),p=so(),h=fo(e,{relative:l});return n.useCallback(f=>{if(function(e,t){return 0===e.button&&(!t||"_self"===t)&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)}(f,t)){f.preventDefault();let t=void 0!==r?r:ui(p)===ui(h),m=()=>u(e,{replace:t,unstable_mask:a,state:i,preventScrollReset:o,relative:l,viewTransition:s,unstable_defaultShouldRevalidate:c});d?n.startTransition(()=>m()):m()}},[p,u,h,r,a,i,t,e,o,l,s,c,d])}(p,{replace:s,unstable_mask:c,state:d,target:u,preventScrollReset:h,relative:o,viewTransition:f,unstable_defaultShouldRevalidate:m,unstable_useTransitions:b});let N=!(k.isExternal||l),A=n.createElement("a",{...g,...E,href:(N?S:void 0)||k.absoluteURL||j,onClick:N?function(e){r&&r(e),e.defaultPrevented||_(e)}:r,ref:pl(t,z),target:u,"data-discover":y||"render"!==a?void 0:"true"});return $&&!y?n.createElement(n.Fragment,null,A,n.createElement(ll,{page:j})):A});vl.displayName="Link",n.forwardRef(function(e,t){let{"aria-current":r="page",caseSensitive:a=!1,className:i="",end:o=!1,style:l,to:s,viewTransition:c,children:d,...u}=e,p=fo(s,{relative:u.relative}),h=so(),f=n.useContext(Qi),{navigator:m,basename:g}=n.useContext(ro),x=null!=f&&function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.useContext(Zi);li(null!=r,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=kl("useViewTransitionState"),i=fo(e,{relative:t});if(!r.isTransitioning)return!1;let o=Ci(r.currentLocation.pathname,a)||r.currentLocation.pathname,l=Ci(r.nextLocation.pathname,a)||r.nextLocation.pathname;return null!=_i(i.pathname,l)||null!=_i(i.pathname,o)}(p)&&!0===c,v=m.encodeLocation?m.encodeLocation(p).pathname:p.pathname,b=h.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;a||(b=b.toLowerCase(),y=y?y.toLowerCase():null,v=v.toLowerCase()),y&&g&&(y=Ci(y,g)||y);const k="/"!==v&&v.endsWith("/")?v.length-1:v.length;let j,w=b===v||!o&&b.startsWith(v)&&"/"===b.charAt(k),S=null!=y&&(y===v||!o&&y.startsWith(v)&&"/"===y.charAt(v.length)),$={isActive:w,isPending:S,isTransitioning:x},z=w?r:void 0;j="function"===typeof i?i($):[i,w?"active":null,S?"pending":null,x?"transitioning":null].filter(Boolean).join(" ");let E="function"===typeof l?l($):l;return n.createElement(vl,{...u,"aria-current":z,className:j,ref:t,style:E,to:s,viewTransition:c},"function"===typeof d?d($):d)}).displayName="NavLink";var bl=n.forwardRef((e,t)=>{let{discover:r="render",fetcherKey:a,navigate:i,reloadDocument:o,replace:l,state:s,method:c=Oo,action:d,onSubmit:u,relative:p,preventScrollReset:h,viewTransition:f,unstable_defaultShouldRevalidate:m,...g}=e,{unstable_useTransitions:x}=n.useContext(ro),v=$l(),b=function(e){let{relative:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{basename:r}=n.useContext(ro),a=n.useContext(ao);li(a,"useFormAction must be used inside a RouteContext");let[i]=a.matches.slice(-1),o={...fo(e||".",{relative:t})},l=so();if(null==e){o.search=l.search;let e=new URLSearchParams(o.search),t=e.getAll("index"),r=t.some(e=>""===e);if(r){e.delete("index"),t.filter(e=>e).forEach(t=>e.append("index",t));let r=e.toString();o.search=r?`?${r}`:""}}e&&"."!==e||!i.route.index||(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index");"/"!==r&&(o.pathname="/"===o.pathname?r:Oi([r,o.pathname]));return ui(o)}(d,{relative:p}),y="get"===c.toLowerCase()?"get":"post",k="string"===typeof d&&xl.test(d);return n.createElement("form",{ref:t,method:y,action:b,onSubmit:o?u:e=>{if(u&&u(e),e.defaultPrevented)return;e.preventDefault();let t=e.nativeEvent.submitter,r=t?.getAttribute("formmethod")||c,o=()=>v(t||e.currentTarget,{fetcherKey:a,method:r,navigate:i,replace:l,state:s,relative:p,preventScrollReset:h,viewTransition:f,unstable_defaultShouldRevalidate:m});x&&!1!==i?n.startTransition(()=>o()):o()},...g,"data-discover":k||"render"!==r?void 0:"true"})});function yl(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function kl(e){let t=n.useContext(Gi);return li(t,yl(e)),t}function jl(e){si("undefined"!==typeof URLSearchParams,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=n.useRef(Bo(e)),r=n.useRef(!1),a=so(),i=n.useMemo(()=>function(e,t){let r=Bo(e);return t&&t.forEach((e,n)=>{r.has(n)||t.getAll(n).forEach(e=>{r.append(n,e)})}),r}(a.search,r.current?null:t.current),[a.search]),o=po(),l=n.useCallback((e,t)=>{const n=Bo("function"===typeof e?e(new URLSearchParams(i)):e);r.current=!0,o("?"+n,t)},[o,i]);return[i,l]}bl.displayName="Form";var wl=0,Sl=()=>`__${String(++wl)}__`;function $l(){let{router:e}=kl("useSubmit"),{basename:t}=n.useContext(ro),r=zo("useRouteId"),a=e.fetch,i=e.navigate;return n.useCallback(async function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{action:o,method:l,encType:s,formData:c,body:d}=Ho(e,t);if(!1===n.navigate){let e=n.fetcherKey||Sl();await a(e,r,n.action||o,{unstable_defaultShouldRevalidate:n.unstable_defaultShouldRevalidate,preventScrollReset:n.preventScrollReset,formData:c,body:d,formMethod:n.method||l,formEncType:n.encType||s,flushSync:n.flushSync})}else await i(n.action||o,{unstable_defaultShouldRevalidate:n.unstable_defaultShouldRevalidate,preventScrollReset:n.preventScrollReset,formData:c,body:d,formMethod:n.method||l,formEncType:n.encType||s,replace:n.replace,state:n.state,fromRouteId:r,flushSync:n.flushSync,viewTransition:n.viewTransition})},[a,i,t,r])}var zl=function(){return zl=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},zl.apply(this,arguments)};Object.create;function El(e,t,r){if(r||2===arguments.length)for(var n,a=0,i=t.length;a<i;a++)!n&&a in t||(n||(n=Array.prototype.slice.call(t,0,a)),n[a]=t[a]);return e.concat(n||Array.prototype.slice.call(t))}Object.create;"function"===typeof SuppressedError&&SuppressedError;var _l={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Nl="-ms-",Al="-moz-",Cl="-webkit-",Fl="comm",Tl="rule",Pl="decl",Dl="@keyframes",Ll=Math.abs,Rl=String.fromCharCode,Ol=Object.assign;function Il(e){return e.trim()}function Ml(e,t){return(e=t.exec(e))?e[0]:e}function Bl(e,t,r){return e.replace(t,r)}function Vl(e,t,r){return e.indexOf(t,r)}function Ul(e,t){return 0|e.charCodeAt(t)}function Kl(e,t,r){return e.slice(t,r)}function Hl(e){return e.length}function Wl(e){return e.length}function ql(e,t){return t.push(e),e}function Yl(e,t){return e.filter(function(e){return!Ml(e,t)})}var Gl=1,Ql=1,Jl=0,Xl=0,Zl=0,es="";function ts(e,t,r,n,a,i,o,l){return{value:e,root:t,parent:r,type:n,props:a,children:i,line:Gl,column:Ql,length:o,return:"",siblings:l}}function rs(e,t){return Ol(ts("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function ns(e){for(;e.root;)e=rs(e.root,{children:[e]});ql(e,e.siblings)}function as(){return Zl=Xl>0?Ul(es,--Xl):0,Ql--,10===Zl&&(Ql=1,Gl--),Zl}function is(){return Zl=Xl<Jl?Ul(es,Xl++):0,Ql++,10===Zl&&(Ql=1,Gl++),Zl}function os(){return Ul(es,Xl)}function ls(){return Xl}function ss(e,t){return Kl(es,e,t)}function cs(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ds(e){return Gl=Ql=1,Jl=Hl(es=e),Xl=0,[]}function us(e){return es="",e}function ps(e){return Il(ss(Xl-1,ms(91===e?e+2:40===e?e+1:e)))}function hs(e){for(;(Zl=os())&&Zl<33;)is();return cs(e)>2||cs(Zl)>3?"":" "}function fs(e,t){for(;--t&&is()&&!(Zl<48||Zl>102||Zl>57&&Zl<65||Zl>70&&Zl<97););return ss(e,ls()+(t<6&&32==os()&&32==is()))}function ms(e){for(;is();)switch(Zl){case e:return Xl;case 34:case 39:34!==e&&39!==e&&ms(Zl);break;case 40:41===e&&ms(e);break;case 92:is()}return Xl}function gs(e,t){for(;is()&&e+Zl!==57&&(e+Zl!==84||47!==os()););return"/*"+ss(t,Xl-1)+"*"+Rl(47===e?e:is())}function xs(e){for(;!cs(os());)is();return ss(e,Xl)}function vs(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function bs(e,t,r,n){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case"@namespace":case Pl:return e.return=e.return||e.value;case Fl:return"";case Dl:return e.return=e.value+"{"+vs(e.children,n)+"}";case Tl:if(!Hl(e.value=e.props.join(",")))return""}return Hl(r=vs(e.children,n))?e.return=e.value+"{"+r+"}":""}function ys(e,t,r){switch(function(e,t){return 45^Ul(e,0)?(((t<<2^Ul(e,0))<<2^Ul(e,1))<<2^Ul(e,2))<<2^Ul(e,3):0}(e,t)){case 5103:return Cl+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Cl+e+e;case 4855:return Cl+e.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+e;case 4789:return Al+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Cl+e+Al+e+Nl+e+e;case 5936:switch(Ul(e,t+11)){case 114:return Cl+e+Nl+Bl(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Cl+e+Nl+Bl(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Cl+e+Nl+Bl(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Cl+e+Nl+e+e;case 6165:return Cl+e+Nl+"flex-"+e+e;case 5187:return Cl+e+Bl(e,/(\w+).+(:[^]+)/,Cl+"box-$1$2"+Nl+"flex-$1$2")+e;case 5443:return Cl+e+Nl+"flex-item-"+Bl(e,/flex-|-self/g,"")+(Ml(e,/flex-|baseline/)?"":Nl+"grid-row-"+Bl(e,/flex-|-self/g,""))+e;case 4675:return Cl+e+Nl+"flex-line-pack"+Bl(e,/align-content|flex-|-self/g,"")+e;case 5548:return Cl+e+Nl+Bl(e,"shrink","negative")+e;case 5292:return Cl+e+Nl+Bl(e,"basis","preferred-size")+e;case 6060:return Cl+"box-"+Bl(e,"-grow","")+Cl+e+Nl+Bl(e,"grow","positive")+e;case 4554:return Cl+Bl(e,/([^-])(transform)/g,"$1"+Cl+"$2")+e;case 6187:return Bl(Bl(Bl(e,/(zoom-|grab)/,Cl+"$1"),/(image-set)/,Cl+"$1"),e,"")+e;case 5495:case 3959:return Bl(e,/(image-set\([^]*)/,Cl+"$1$`$1");case 4968:return Bl(Bl(e,/(.+:)(flex-)?(.*)/,Cl+"box-pack:$3"+Nl+"flex-pack:$3"),/space-between/,"justify")+Cl+e+e;case 4200:if(!Ml(e,/flex-|baseline/))return Nl+"grid-column-align"+Kl(e,t)+e;break;case 2592:case 3360:return Nl+Bl(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(e,r){return t=r,Ml(e.props,/grid-\w+-end/)})?~Vl(e+(r=r[t].value),"span",0)?e:Nl+Bl(e,"-start","")+e+Nl+"grid-row-span:"+(~Vl(r,"span",0)?Ml(r,/\d+/):+Ml(r,/\d+/)-+Ml(e,/\d+/))+";":Nl+Bl(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(e){return Ml(e.props,/grid-\w+-start/)})?e:Nl+Bl(Bl(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Bl(e,/(.+)-inline(.+)/,Cl+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Hl(e)-1-t>6)switch(Ul(e,t+1)){case 109:if(45!==Ul(e,t+4))break;case 102:return Bl(e,/(.+:)(.+)-([^]+)/,"$1"+Cl+"$2-$3$1"+Al+(108==Ul(e,t+3)?"$3":"$2-$3"))+e;case 115:return~Vl(e,"stretch",0)?ys(Bl(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return Bl(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,r,n,a,i,o,l){return Nl+r+":"+n+l+(a?Nl+r+"-span:"+(i?o:+o-+n)+l:"")+e});case 4949:if(121===Ul(e,t+6))return Bl(e,":",":"+Cl)+e;break;case 6444:switch(Ul(e,45===Ul(e,14)?18:11)){case 120:return Bl(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Cl+(45===Ul(e,14)?"inline-":"")+"box$3$1"+Cl+"$2$3$1"+Nl+"$2box$3")+e;case 100:return Bl(e,":",":"+Nl)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Bl(e,"scroll-","scroll-snap-")+e}return e}function ks(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Pl:return void(e.return=ys(e.value,e.length,r));case Dl:return vs([rs(e,{value:Bl(e.value,"@","@"+Cl)})],n);case Tl:if(e.length)return function(e,t){return e.map(t).join("")}(r=e.props,function(t){switch(Ml(t,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ns(rs(e,{props:[Bl(t,/:(read-\w+)/,":-moz-$1")]})),ns(rs(e,{props:[t]})),Ol(e,{props:Yl(r,n)});break;case"::placeholder":ns(rs(e,{props:[Bl(t,/:(plac\w+)/,":"+Cl+"input-$1")]})),ns(rs(e,{props:[Bl(t,/:(plac\w+)/,":-moz-$1")]})),ns(rs(e,{props:[Bl(t,/:(plac\w+)/,Nl+"input-$1")]})),ns(rs(e,{props:[t]})),Ol(e,{props:Yl(r,n)})}return""})}}function js(e){return us(ws("",null,null,null,[""],e=ds(e),0,[0],e))}function ws(e,t,r,n,a,i,o,l,s){for(var c=0,d=0,u=o,p=0,h=0,f=0,m=1,g=1,x=1,v=0,b="",y=a,k=i,j=n,w=b;g;)switch(f=v,v=is()){case 40:if(108!=f&&58==Ul(w,u-1)){-1!=Vl(w+=Bl(ps(v),"&","&\f"),"&\f",Ll(c?l[c-1]:0))&&(x=-1);break}case 34:case 39:case 91:w+=ps(v);break;case 9:case 10:case 13:case 32:w+=hs(f);break;case 92:w+=fs(ls()-1,7);continue;case 47:switch(os()){case 42:case 47:ql($s(gs(is(),ls()),t,r,s),s),5!=cs(f||1)&&5!=cs(os()||1)||!Hl(w)||" "===Kl(w,-1,void 0)||(w+=" ");break;default:w+="/"}break;case 123*m:l[c++]=Hl(w)*x;case 125*m:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+d:-1==x&&(w=Bl(w,/\f/g,"")),h>0&&(Hl(w)-u||0===m&&47===f)&&ql(h>32?zs(w+";",n,r,u-1,s):zs(Bl(w," ","")+";",n,r,u-2,s),s);break;case 59:w+=";";default:if(ql(j=Ss(w,t,r,c,d,a,l,b,y=[],k=[],u,i),i),123===v)if(0===d)ws(w,t,j,j,y,i,u,l,k);else{switch(p){case 99:if(110===Ul(w,3))break;case 108:if(97===Ul(w,2))break;default:d=0;case 100:case 109:case 115:}d?ws(e,j,j,n&&ql(Ss(e,j,j,0,0,a,l,b,a,y=[],u,k),k),a,k,u,l,n?y:k):ws(w,j,j,j,[""],k,0,l,k)}}c=d=h=0,m=x=1,b=w="",u=o;break;case 58:u=1+Hl(w),h=f;default:if(m<1)if(123==v)--m;else if(125==v&&0==m++&&125==as())continue;switch(w+=Rl(v),v*m){case 38:x=d>0?1:(w+="\f",-1);break;case 44:l[c++]=(Hl(w)-1)*x,x=1;break;case 64:45===os()&&(w+=ps(is())),p=os(),d=u=Hl(b=w+=xs(ls())),v++;break;case 45:45===f&&2==Hl(w)&&(m=0)}}return i}function Ss(e,t,r,n,a,i,o,l,s,c,d,u){for(var p=a-1,h=0===a?i:[""],f=Wl(h),m=0,g=0,x=0;m<n;++m)for(var v=0,b=Kl(e,p+1,p=Ll(g=o[m])),y=e;v<f;++v)(y=Il(g>0?h[v]+" "+b:Bl(b,/&\f/g,h[v])))&&(s[x++]=y);return ts(e,t,r,0===a?Tl:l,s,c,d,u)}function $s(e,t,r,n){return ts(e,t,r,Fl,Rl(Zl),Kl(e,2,-2),0,n)}function zs(e,t,r,n,a){return ts(e,t,r,Pl,Kl(e,0,n),Kl(e,n+1,-1),n,a)}var Es="undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&({NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_ATTR||{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_ATTR)||"data-styled",_s="active",Ns="data-styled-version",As="6.3.12",Cs="/*!sc*/\n",Fs="undefined"!=typeof window&&"undefined"!=typeof document,Ts=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}&&void 0!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&""!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&("false"!=={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY&&{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.SC_DISABLE_SPEEDY)),Ps={};function Ds(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Ls=new Map,Rs=new Map,Os=1,Is=function(e){if(Ls.has(e))return Ls.get(e);for(;Rs.has(Os);)Os++;var t=Os++;return Ls.set(e,t),Rs.set(t,e),t},Ms=function(e,t){Os=t+1,Ls.set(e,t),Rs.set(t,e)},Bs=(new Set,Object.freeze([])),Vs=Object.freeze({});function Us(e,t,r){return void 0===r&&(r=Vs),e.theme!==r.theme&&e.theme||t||r.theme}var Ks=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]),Hs=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ws=/(^-|-$)/g;function qs(e){return e.replace(Hs,"-").replace(Ws,"")}var Ys=/(a)(d)/gi,Gs=function(e){return String.fromCharCode(e+(e>25?39:97))};function Qs(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=Gs(t%52)+r;return(Gs(t%52)+r).replace(Ys,"$1-$2")}var Js,Xs=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Zs=function(e){return Xs(5381,e)};function ec(e){return Qs(Zs(e)>>>0)}function tc(e){return e.displayName||e.name||"Component"}function rc(e){return"string"==typeof e&&!0}var nc="function"==typeof Symbol&&Symbol.for,ac=nc?Symbol.for("react.memo"):60115,ic=nc?Symbol.for("react.forward_ref"):60112,oc={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},lc={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},sc={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},cc=((Js={})[ic]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Js[ac]=sc,Js);function dc(e){return("type"in(t=e)&&t.type.$$typeof)===ac?sc:"$$typeof"in e?cc[e.$$typeof]:oc;var t}var uc=Object.defineProperty,pc=Object.getOwnPropertyNames,hc=Object.getOwnPropertySymbols,fc=Object.getOwnPropertyDescriptor,mc=Object.getPrototypeOf,gc=Object.prototype;function xc(e,t,r){if("string"!=typeof t){if(gc){var n=mc(t);n&&n!==gc&&xc(e,n,r)}var a=pc(t);hc&&(a=a.concat(hc(t)));for(var i=dc(e),o=dc(t),l=0;l<a.length;++l){var s=a[l];if(!(s in lc||r&&r[s]||o&&s in o||i&&s in i)){var c=fc(t,s);try{uc(e,s,c)}catch(e){}}}}return e}function vc(e){return"function"==typeof e}function bc(e){return"object"==typeof e&&"styledComponentId"in e}function yc(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function kc(e,t){return e.join(t||"")}function jc(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function wc(e,t,r){if(void 0===r&&(r=!1),!r&&!jc(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=wc(e[n],t[n]);else if(jc(t))for(var n in t)e[n]=wc(e[n],t[n]);return e}function Sc(e,t){Object.defineProperty(e,"toString",{value:t})}var $c=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var r=this._cGroup;r<e;r++)t+=this.groupSizes[r];else for(r=this._cGroup-1;r>=e;r--)t-=this.groupSizes[r];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var r=this.groupSizes,n=r.length,a=n;e>=a;)if((a<<=1)<0)throw Ds(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(r),this.length=a;for(var i=n;i<a;i++)this.groupSizes[i]=0}for(var o=this.indexOfGroup(e+1),l=0,s=(i=0,t.length);i<s;i++)this.tag.insertRule(o,t[i])&&(this.groupSizes[e]++,o++,l++);l>0&&this._cGroup>e&&(this._cIndex+=l)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],r=this.indexOfGroup(e),n=r+t;this.groupSizes[e]=0;for(var a=r;a<n;a++)this.tag.deleteRule(r);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var r=this.groupSizes[e],n=this.indexOfGroup(e),a=n+r,i=n;i<a;i++)t+=this.tag.getRule(i)+Cs;return t},e}(),zc="style[".concat(Es,"][").concat(Ns,'="').concat(As,'"]'),Ec=new RegExp("^".concat(Es,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),_c=function(e){return"undefined"!=typeof ShadowRoot&&e instanceof ShadowRoot||"host"in e&&11===e.nodeType},Nc=function(e){if(!e)return document;if(_c(e))return e;if("getRootNode"in e){var t=e.getRootNode();if(_c(t))return t}return document},Ac=function(e,t,r){for(var n,a=r.split(","),i=0,o=a.length;i<o;i++)(n=a[i])&&e.registerName(t,n)},Cc=function(e,t){for(var r,n=(null!==(r=t.textContent)&&void 0!==r?r:"").split(Cs),a=[],i=0,o=n.length;i<o;i++){var l=n[i].trim();if(l){var s=l.match(Ec);if(s){var c=0|parseInt(s[1],10),d=s[2];0!==c&&(Ms(d,c),Ac(e,d,s[3]),e.getTag().insertRules(c,a)),a.length=0}else a.push(l)}}},Fc=function(e){for(var t=Nc(e.options.target).querySelectorAll(zc),r=0,n=t.length;r<n;r++){var a=t[r];a&&a.getAttribute(Es)!==_s&&(Cc(e,a),a.parentNode&&a.parentNode.removeChild(a))}};function Tc(){return r.nc}var Pc=function(e){var t=document.head,r=e||t,n=document.createElement("style"),a=function(e){var t=Array.from(e.querySelectorAll("style[".concat(Es,"]")));return t[t.length-1]}(r),i=void 0!==a?a.nextSibling:null;n.setAttribute(Es,_s),n.setAttribute(Ns,As);var o=Tc();return o&&n.setAttribute("nonce",o),r.insertBefore(n,i),n},Dc=function(){function e(e){this.element=Pc(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){var t;if(e.sheet)return e.sheet;for(var r=null!==(t=e.getRootNode().styleSheets)&&void 0!==t?t:document.styleSheets,n=0,a=r.length;n<a;n++){var i=r[n];if(i.ownerNode===e)return i}throw Ds(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Lc=function(){function e(e){this.element=Pc(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var r=document.createTextNode(t);return this.element.insertBefore(r,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Rc=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Oc=Fs,Ic={isServer:!Fs,useCSSOMInjection:!Ts},Mc=function(){function e(e,t,r){void 0===e&&(e=Vs),void 0===t&&(t={});var n=this;this.options=zl(zl({},Ic),e),this.gs=t,this.names=new Map(r),this.server=!!e.isServer,!this.server&&Fs&&Oc&&(Oc=!1,Fc(this)),Sc(this,function(){return function(e){for(var t=e.getTag(),r=t.length,n="",a=function(r){var a=function(e){return Rs.get(e)}(r);if(void 0===a)return"continue";var i=e.names.get(a);if(void 0===i||!i.size)return"continue";var o=t.getGroup(r);if(0===o.length)return"continue";var l=Es+".g"+r+'[id="'+a+'"]',s="";i.forEach(function(e){e.length>0&&(s+=e+",")}),n+=o+l+'{content:"'+s+'"}'+Cs},i=0;i<r;i++)a(i);return n}(n)})}return e.registerId=function(e){return Is(e)},e.prototype.rehydrate=function(){!this.server&&Fs&&Fc(this)},e.prototype.reconstructWithOptions=function(t,r){void 0===r&&(r=!0);var n=new e(zl(zl({},this.options),t),this.gs,r&&this.names||void 0);return!this.server&&Fs&&t.target!==this.options.target&&Nc(this.options.target)!==Nc(t.target)&&Fc(n),n},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,r=e.target;return e.isServer?new Rc(r):t?new Dc(r):new Lc(r)}(this.options),new $c(e)));var e},e.prototype.hasNameForId=function(e,t){var r,n;return null!==(n=null===(r=this.names.get(e))||void 0===r?void 0:r.has(t))&&void 0!==n&&n},e.prototype.registerName=function(e,t){Is(e);var r=this.names.get(e);r?r.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,r){this.registerName(e,t),this.getTag().insertRules(Is(e),r)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Is(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function Bc(e,t){return null==t||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||e in _l||e.startsWith("--")?String(t).trim():"".concat(t,"px")}var Vc=function(e){return e>="A"&&e<="Z"};function Uc(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(1===r&&"-"===n&&"-"===e[0])return e;Vc(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Kc=Symbol.for("sc-keyframes");var Hc=function(e){return null==e||!1===e||""===e},Wc=function(e){var t=[];for(var r in e){var n=e[r];e.hasOwnProperty(r)&&!Hc(n)&&(Array.isArray(n)&&n.isCss||vc(n)?t.push("".concat(Uc(r),":"),n,";"):jc(n)?t.push.apply(t,El(El(["".concat(r," {")],Wc(n),!1),["}"],!1)):t.push("".concat(Uc(r),": ").concat(Bc(r,n),";")))}return t};function qc(e,t,r,n,a){if(void 0===a&&(a=[]),"string"==typeof e)return e&&a.push(e),a;if(Hc(e))return a;if(bc(e))return a.push(".".concat(e.styledComponentId)),a;var i;if(vc(e))return!vc(i=e)||i.prototype&&i.prototype.isReactComponent||!t?(a.push(e),a):qc(e(t),t,r,n,a);if(function(e){return"object"==typeof e&&null!==e&&Kc in e}(e))return r?(e.inject(r,n),a.push(e.getName(n))):a.push(e),a;if(jc(e)){for(var o=Wc(e),l=0;l<o.length;l++)a.push(o[l]);return a}if(!Array.isArray(e))return a.push(e.toString()),a;for(l=0;l<e.length;l++)qc(e[l],t,r,n,a);return a}function Yc(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(vc(r)&&!bc(r))return!1}return!0}var Gc=Zs(As),Qc=function(){function e(e,t,r){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===r||r.isStatic)&&Yc(e),this.componentId=t,this.baseHash=Xs(Gc,t),this.baseStyle=r,Mc.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,r){var n=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,r).className:"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))n=yc(n,this.staticRulesId);else{var a=kc(qc(this.rules,e,t,r)),i=Qs(Xs(this.baseHash,a)>>>0);if(!t.hasNameForId(this.componentId,i)){var o=r(a,".".concat(i),void 0,this.componentId);t.insertRules(this.componentId,i,o)}n=yc(n,i),this.staticRulesId=i}else{for(var l=Xs(this.baseHash,r.hash),s="",c=0;c<this.rules.length;c++){var d=this.rules[c];if("string"==typeof d)s+=d;else if(d){var u=kc(qc(d,e,t,r));l=Xs(Xs(l,String(c)),u),s+=u}}if(s){var p=Qs(l>>>0);if(!t.hasNameForId(this.componentId,p)){var h=r(s,".".concat(p),void 0,this.componentId);t.insertRules(this.componentId,p,h)}n=yc(n,p)}}return{className:n,css:"undefined"==typeof window?t.getTag().getGroup(Is(this.componentId)):""}},e}(),Jc=/&/g,Xc=47,Zc=42;function ed(e){if(-1===e.indexOf("}"))return!1;for(var t=e.length,r=0,n=0,a=!1,i=0;i<t;i++){var o=e.charCodeAt(i);if(0!==n||a||o!==Xc||e.charCodeAt(i+1)!==Zc)if(a)o===Zc&&e.charCodeAt(i+1)===Xc&&(a=!1,i++);else if(34!==o&&39!==o||0!==i&&92===e.charCodeAt(i-1)){if(0===n)if(123===o)r++;else if(125===o&&--r<0)return!0}else 0===n?n=o:n===o&&(n=0);else a=!0,i++}return 0!==r||0!==n}function td(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=td(e.children,t)),e})}function rd(e){var t,r,n,a=void 0===e?Vs:e,i=a.options,o=void 0===i?Vs:i,l=a.plugins,s=void 0===l?Bs:l,c=function(e,n,a){return a.startsWith(r)&&a.endsWith(r)&&a.replaceAll(r,"").length>0?".".concat(t):e},d=s.slice();d.push(function(e){e.type===Tl&&e.value.includes("&")&&(n||(n=new RegExp("\\".concat(r,"\\b"),"g")),e.props[0]=e.props[0].replace(Jc,r).replace(n,c))}),o.prefix&&d.push(ks),d.push(bs);var u,p=[],h=function(e){var t=Wl(e);return function(r,n,a,i){for(var o="",l=0;l<t;l++)o+=e[l](r,n,a,i)||"";return o}}(d.concat((u=function(e){return p.push(e)},function(e){e.root||(e=e.return)&&u(e)}))),f=function(e,a,i,l){void 0===a&&(a=""),void 0===i&&(i=""),void 0===l&&(l="&"),t=l,r=a,n=void 0;var s=function(e){if(!ed(e))return e;for(var t=e.length,r="",n=0,a=0,i=0,o=!1,l=0;l<t;l++){var s=e.charCodeAt(l);if(0!==i||o||s!==Xc||e.charCodeAt(l+1)!==Zc)if(o)s===Zc&&e.charCodeAt(l+1)===Xc&&(o=!1,l++);else if(34!==s&&39!==s||0!==l&&92===e.charCodeAt(l-1)){if(0===i)if(123===s)a++;else if(125===s){if(--a<0){for(var c=l+1;c<t;){var d=e.charCodeAt(c);if(59===d||10===d)break;c++}c<t&&59===e.charCodeAt(c)&&c++,a=0,l=c-1,n=c;continue}0===a&&(r+=e.substring(n,l+1),n=l+1)}else 59===s&&0===a&&(r+=e.substring(n,l+1),n=l+1)}else 0===i?i=s:i===s&&(i=0);else o=!0,l++}if(n<t){var u=e.substring(n);ed(u)||(r+=u)}return r}(function(e){if(-1===e.indexOf("//"))return e;for(var t=e.length,r=[],n=0,a=0,i=0,o=0;a<t;){var l=e.charCodeAt(a);if(34!==l&&39!==l||0!==a&&92===e.charCodeAt(a-1))if(0===i)if(l===Xc&&a+1<t&&e.charCodeAt(a+1)===Zc){for(a+=2;a+1<t&&(e.charCodeAt(a)!==Zc||e.charCodeAt(a+1)!==Xc);)a++;a+=2}else if(40===l&&a>=3&&108==(32|e.charCodeAt(a-1))&&114==(32|e.charCodeAt(a-2))&&117==(32|e.charCodeAt(a-3)))o=1,a++;else if(o>0)41===l?o--:40===l&&o++,a++;else if(l===Zc&&a+1<t&&e.charCodeAt(a+1)===Xc)a>n&&r.push(e.substring(n,a)),n=a+=2;else if(l===Xc&&a+1<t&&e.charCodeAt(a+1)===Xc){for(a>n&&r.push(e.substring(n,a));a<t&&10!==e.charCodeAt(a);)a++;n=a}else a++;else a++;else 0===i?i=l:i===l&&(i=0),a++}return 0===n?e:(n<t&&r.push(e.substring(n)),r.join(""))}(e)),c=js(i||a?"".concat(i," ").concat(a," { ").concat(s," }"):s);return o.namespace&&(c=td(c,o.namespace)),p=[],vs(c,h),p};return f.hash=s.length?s.reduce(function(e,t){return t.name||Ds(15),Xs(e,t.name)},5381).toString():"",f}var nd=new Mc,ad=rd(),id=n.createContext({shouldForwardProp:void 0,styleSheet:nd,stylis:ad}),od=(id.Consumer,n.createContext(void 0));function ld(){return n.useContext(id)}function sd(e){if(!n.useMemo)return e.children;var t=ld().styleSheet,r=n.useMemo(function(){var r=t;return e.sheet?r=e.sheet:e.target&&(r=r.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(r=r.reconstructWithOptions({useCSSOMInjection:!1})),r},[e.disableCSSOMInjection,e.sheet,e.target,t]),a=n.useMemo(function(){return rd({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),i=n.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:r,stylis:a}},[e.shouldForwardProp,r,a]);return n.createElement(id.Provider,{value:i},n.createElement(od.Provider,{value:a},e.children))}var cd=n.createContext(void 0);cd.Consumer;function dd(e){var t=n.useContext(cd),r=n.useMemo(function(){return function(e,t){if(!e)throw Ds(14);if(vc(e))return e(t);if(Array.isArray(e)||"object"!=typeof e)throw Ds(8);return t?zl(zl({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?n.createElement(cd.Provider,{value:r},e.children):null}var ud={};new Set;function pd(e,t,r){var a=bc(e),i=e,o=!rc(e),l=t.attrs,s=void 0===l?Bs:l,c=t.componentId,d=void 0===c?function(e,t){var r="string"!=typeof e?"sc":qs(e);ud[r]=(ud[r]||0)+1;var n="".concat(r,"-").concat(ec(As+r+ud[r]));return t?"".concat(t,"-").concat(n):n}(t.displayName,t.parentComponentId):c,u=t.displayName,p=void 0===u?function(e){return rc(e)?"styled.".concat(e):"Styled(".concat(tc(e),")")}(e):u,h=t.displayName&&t.componentId?"".concat(qs(t.displayName),"-").concat(t.componentId):t.componentId||d,f=a&&i.attrs?i.attrs.concat(s).filter(Boolean):s,m=t.shouldForwardProp;if(a&&i.shouldForwardProp){var g=i.shouldForwardProp;if(t.shouldForwardProp){var x=t.shouldForwardProp;m=function(e,t){return g(e,t)&&x(e,t)}}else m=g}var v=new Qc(r,h,a?i.componentStyle:void 0);function b(e,t){return function(e,t,r){var a=e.attrs,i=e.componentStyle,o=e.defaultProps,l=e.foldedComponentIds,s=e.styledComponentId,c=e.target,d=n.useContext(cd),u=ld(),p=e.shouldForwardProp||u.shouldForwardProp,h=Us(t,d,o)||Vs,f=function(e,t,r){for(var n,a=zl(zl({},t),{className:void 0,theme:r}),i=0;i<e.length;i+=1){var o=vc(n=e[i])?n(a):n;for(var l in o)"className"===l?a.className=yc(a.className,o[l]):"style"===l?a.style=zl(zl({},a.style),o[l]):l in t&&void 0===t[l]||(a[l]=o[l])}return"className"in t&&"string"==typeof t.className&&(a.className=yc(a.className,t.className)),a}(a,t,h),m=f.as||c,g={};for(var x in f)void 0===f[x]||"$"===x[0]||"as"===x||"theme"===x&&f.theme===h||("forwardedAs"===x?g.as=f.forwardedAs:p&&!p(x,m)||(g[x]=f[x]));var v=function(e,t){var r=ld();return e.generateAndInjectStyles(t,r.styleSheet,r.stylis)}(i,f),b=v.className,y=yc(l,s);return b&&(y+=" "+b),f.className&&(y+=" "+f.className),g[rc(m)&&!Ks.has(m)?"class":"className"]=y,r&&(g.ref=r),(0,n.createElement)(m,g)}(y,e,t)}b.displayName=p;var y=n.forwardRef(b);return y.attrs=f,y.componentStyle=v,y.displayName=p,y.shouldForwardProp=m,y.foldedComponentIds=a?yc(i.foldedComponentIds,i.styledComponentId):"",y.styledComponentId=h,y.target=a?i.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];for(var n=0,a=t;n<a.length;n++)wc(e,a[n],!0);return e}({},i.defaultProps,e):e}}),Sc(y,function(){return".".concat(y.styledComponentId)}),o&&xc(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function hd(e,t){for(var r=[e[0]],n=0,a=t.length;n<a;n+=1)r.push(t[n],e[n+1]);return r}var fd=function(e){return Object.assign(e,{isCss:!0})};function md(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(vc(e)||jc(e))return fd(qc(hd(Bs,El([e],t,!0))));var n=e;return 0===t.length&&1===n.length&&"string"==typeof n[0]?qc(n):fd(qc(hd(n,t)))}function gd(e,t,r){if(void 0===r&&(r=Vs),!t)throw Ds(1,t);var n=function(n){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,r,md.apply(void 0,El([n],a,!1)))};return n.attrs=function(n){return gd(e,t,zl(zl({},r),{attrs:Array.prototype.concat(r.attrs,n).filter(Boolean)}))},n.withConfig=function(n){return gd(e,t,zl(zl({},r),n))},n}var xd=function(e){return gd(pd,e)},vd=xd;Ks.forEach(function(e){vd[e]=xd(e)});var bd,yd=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Yc(e),Mc.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,r,n){var a=n(kc(qc(this.rules,t,r,n)),""),i=this.componentId+e;r.insertRules(i,i,a)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,r,n){e>2&&Mc.registerId(this.componentId+e);var a=this.componentId+e;this.isStatic?r.hasNameForId(a,a)||this.createStyles(e,t,r,n):(this.removeStyles(e,r),this.createStyles(e,t,r,n))},e}();var kd=function(){function e(e,t){var r=this;this[bd]=!0,this.inject=function(e,t){void 0===t&&(t=ad);var n=r.name+t.hash;e.hasNameForId(r.id,n)||e.insertRules(r.id,n,t(r.rules,n,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Sc(this,function(){throw Ds(12,String(r.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=ad),this.name+e.hash},e}();function jd(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=kc(md.apply(void 0,El([e],t,!1))),a=ec(n);return new kd(a,n)}bd=Kc;(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var r=Tc(),n=kc([r&&'nonce="'.concat(r,'"'),"".concat(Es,'="true"'),"".concat(Ns,'="').concat(As,'"')].filter(Boolean)," ");return"<style ".concat(n,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw Ds(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Ds(2);var r=e.instance.toString();if(!r)return[];var a=((t={})[Es]="",t[Ns]=As,t.dangerouslySetInnerHTML={__html:r},t),i=Tc();return i&&(a.nonce=i),[n.createElement("style",zl({},a,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Mc({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw Ds(2);return n.createElement(sd,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Ds(3)}})(),"__sc-".concat(Es,"__");const wd={color:{bg:"#F1F6F3",surface:"#FFFFFF",surfaceAlt:"#E5EFEA",surfaceSunken:"#D8E6E0",ink:"#0E1A17",inkSoft:"#1F2E2A",muted:"#3F4B47",mutedSoft:"#5C6E68",border:"#D5E2DC",borderStrong:"#BACBC2",brand:"#1B7A6E",brandLight:"#4FBFB3",brandSoft:"#DCEEEA",brandInk:"#0E4F47",brandGradient:"linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)",brandGradientHover:"linear-gradient(135deg, #4FC9BD 0%, #155F58 100%)",accent:"#4FBFB3",accentSoft:"#E0F1ED",success:"#1B7A6E",successSoft:"#DCEEEA",danger:"#9F3B22",dangerSoft:"#F4DAD0",warning:"#A8761A",warningSoft:"#F3E5C7"},font:{display:"'Playfair Display', Georgia, 'Times New Roman', serif",sans:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",mono:"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"},size:{radius:{sm:"6px",md:"12px",lg:"20px",xl:"28px",pill:"999px"},space:{1:"4px",2:"8px",3:"12px",4:"16px",5:"24px",6:"32px",7:"48px",8:"64px",9:"96px",10:"128px"},container:"1180px",containerNarrow:"960px"},shadow:{xs:"0 1px 2px rgba(14, 26, 23, 0.04)",sm:"0 2px 8px rgba(14, 26, 23, 0.06)",md:"0 8px 24px rgba(14, 26, 23, 0.08)",lg:"0 24px 60px rgba(14, 26, 23, 0.12)",brand:"0 12px 32px rgba(27, 122, 110, 0.28)",inset:"inset 0 1px 0 rgba(255, 255, 255, 0.6)"},motion:{fast:"160ms cubic-bezier(0.2, 0, 0, 1)",base:"240ms cubic-bezier(0.2, 0, 0, 1)",slow:"420ms cubic-bezier(0.2, 0, 0, 1)",spring:"520ms cubic-bezier(0.34, 1.56, 0.64, 1)"},z:{base:1,nav:50,overlay:80,modal:100}},Sd=(function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var a=md.apply(void 0,El([e],t,!1)),i="sc-global-".concat(ec(JSON.stringify(a))),o=new yd(a,i),l=new WeakMap,s=function(e){var t=ld(),r=n.useContext(cd),a=l.get(t.styleSheet);return void 0===a&&(a=t.styleSheet.allocateGSInstance(i),l.set(t.styleSheet,a)),n.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,r,n,a){if(o.isStatic)o.renderStyles(e,Ps,r,a);else{var i=zl(zl({},t),{theme:Us(t,n,s.defaultProps)});o.renderStyles(e,i,r,a)}}(a,e,t.styleSheet,r,t.stylis),function(){o.removeStyles(a,t.styleSheet)}},[a,e,t.styleSheet,r,t.stylis]),null};return n.memo(s)})`
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
`;var $d=r(579);const zd=(0,n.createContext)(null),Ed="arvo_user_email",_d=(()=>{try{var e;return null!==(e=new URLSearchParams(window.location.search).get("magic"))&&void 0!==e?e:null}catch{return null}})();function Nd(e){let{children:t}=e;const[r,a]=(0,n.useState)(()=>{try{return localStorage.getItem(Ed)||null}catch{return null}}),[i,o]=(0,n.useState)("idle");(0,n.useEffect)(()=>{const e=_d;e&&(o("validating"),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})}).then(e=>{if(!e.ok)throw new Error(`HTTP ${e.status}`);return e.json()}).then(e=>{if(e.email){try{localStorage.setItem(Ed,e.email)}catch{}a(e.email),o("ok")}else o("error")}).catch(e=>{console.error("[auth] validate-magic misslyckades:",e.message),o("error")}))},[]);const l=(0,n.useCallback)(e=>{try{localStorage.setItem(Ed,e)}catch{}a(e)},[]),s=(0,n.useCallback)(()=>{try{localStorage.removeItem(Ed)}catch{}a(null)},[]);return(0,$d.jsx)(zd.Provider,{value:{email:r,login:l,logout:s,magicState:i},children:t})}function Ad(){return(0,n.useContext)(zd)}const Cd=vd.span`
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
`,Dd=e=>{let{showName:t=!0,showSuffix:r=!0,size:n}=e;return(0,$d.jsxs)(Cd,{children:[(0,$d.jsxs)(Fd,{$size:n,viewBox:"0 0 40 40",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"arvoMarkGradient",x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#5DD6CA"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1B6E66"})]})}),(0,$d.jsx)("path",{fill:"url(#arvoMarkGradient)",fillRule:"evenodd",d:"M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"})]}),t&&(0,$d.jsxs)(Td,{children:["Arvo ",r&&(0,$d.jsx)(Pd,{children:"Flow"})]})]})},Ld={primary:md`
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
  `},Rd={sm:md`
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
  ${e=>{let{$variant:t="primary"}=e;return Ld[t]}}
  ${e=>{let{$size:t="md"}=e;return Rd[t]}}
  ${e=>{let{$full:t}=e;return t&&"width: 100%;"}}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }
`,Id=Od,Md=vd.header`
  position: sticky;
  top: 0;
  z-index: ${e=>{let{theme:t}=e;return t.z.nav}};
  background: rgba(250, 250, 247, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,Bd=vd.div`
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
`,Vd=vd.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 740px) { display: none; }
`,Ud=vd(vl)`
  padding: 8px 14px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.sm}};
  font-size: 14px;
  white-space: nowrap;
  color: ${e=>{let{theme:t,$active:r}=e;return r?t.color.ink:t.color.muted}};
  font-weight: ${e=>{let{$active:t}=e;return t?600:500}};
  transition: background ${e=>{let{theme:t}=e;return t.motion.fast}}, color ${e=>{let{theme:t}=e;return t.motion.fast}};
  background: ${e=>{let{theme:t,$active:r}=e;return r?t.color.surfaceAlt:"transparent"}};
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
  color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.inkSoft)&&void 0!==t?t:r.color.ink}};
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 6px;
`,Xd=vd.div`
  margin-bottom: 16px;
`,Zd=vd.input`
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
`,eu=vd.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #D94F3C;
`,tu=vd.div`
  text-align: center;
  padding: 12px 0 4px;
`,ru=vd.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 26px;
`,nu=vd.p`
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
  background: ${e=>{let{$error:t,theme:r}=e;return t?"#D94F3C":"linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%)"}};
  pointer-events: none;
`,su={company:"",name:"",email:""},cu={email:""},du=e=>{let{variant:t="public"}=e;const{pathname:r}=so(),{email:a,logout:i,magicState:o}=Ad(),[l,s]=(0,n.useState)(!1);(0,n.useEffect)(()=>{if("ok"===o||"error"===o){s(!0);const e=setTimeout(()=>s(!1),4e3);return()=>clearTimeout(e)}},[o]);const[c,d]=(0,n.useState)(!1),[u,p]=(0,n.useState)(!1),[h,f]=(0,n.useState)(cu),[m,g]=(0,n.useState)("idle"),[x,v]=(0,n.useState)(su),[b,y]=(0,n.useState)({}),[k,j]=(0,n.useState)("idle"),w=(0,n.useRef)(null);(0,n.useEffect)(()=>{c&&w.current&&w.current.focus()},[c]),(0,n.useEffect)(()=>{if(!c)return;const e=e=>{"Escape"===e.key&&S()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[c]);const S=()=>d(!1),$=(e,t)=>{const r=document.getElementById(t);r&&(e.preventDefault(),r.scrollIntoView({behavior:"smooth"}))};return(0,$d.jsxs)($d.Fragment,{children:[l&&(0,$d.jsx)(lu,{$error:"error"===o,children:"ok"===o?`\u2713 Inloggad som ${a}`:"\u2715 L\xe4nken fungerade inte \u2014 beg\xe4r en ny"}),(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Md,{children:(0,$d.jsxs)(Bd,{children:[(0,$d.jsx)(vl,{to:"/",children:(0,$d.jsx)(Dd,{})}),"public"===t&&(0,$d.jsxs)(Vd,{children:[(0,$d.jsx)(Ud,{to:"/",$active:"/"===r,children:"Hem"}),(0,$d.jsx)(Ud,{to:"/intelligence",$active:"/intelligence"===r,children:"Arvo Intelligence"}),(0,$d.jsx)(Ud,{to:"/#hur",$active:!1,onClick:e=>$(e,"hur"),children:"S\xe5 fungerar det"}),(0,$d.jsx)(Ud,{to:"/#priser",$active:!1,onClick:e=>$(e,"priser"),children:"Pris"}),(0,$d.jsx)(Ud,{to:"/#faq",$active:!1,onClick:e=>$(e,"faq"),children:"FAQ"})]}),"app"===t&&(0,$d.jsxs)(Vd,{children:[(0,$d.jsx)(Ud,{to:"/insights",$active:"/insights"===r,children:"Insikter"}),(0,$d.jsx)(Ud,{to:"/insights",$active:!1,children:"Historik"}),(0,$d.jsx)(Ud,{to:"/insights",$active:!1,children:"Inst\xe4llningar"})]}),(0,$d.jsxs)(Kd,{children:[a?(0,$d.jsxs)(iu,{children:[(0,$d.jsx)(ou,{children:a[0].toUpperCase()}),(0,$d.jsx)(Id,{$variant:"ghost",$size:"sm",onClick:i,children:"Logga ut"})]}):(0,$d.jsx)(Id,{$variant:"ghost",$size:"sm",onClick:()=>{f(cu),g("idle"),p(!0)},children:"Logga in"}),"public"===t&&(0,$d.jsx)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"sm",children:(0,$d.jsxs)(Hd,{children:[(0,$d.jsx)("span",{className:"full",children:"Se mina besparingar \u2192"}),(0,$d.jsx)("span",{className:"short",children:"Se besparingar \u2192"})]})})]})]})}),u&&(0,$d.jsx)(Wd,{onClick:e=>{e.target===e.currentTarget&&p(!1)},children:(0,$d.jsxs)(qd,{role:"dialog","aria-modal":"true","aria-labelledby":"auth-modal-title",children:[(0,$d.jsx)(Yd,{onClick:()=>p(!1),"aria-label":"St\xe4ng",children:"\u2715"}),"sent"===m?(0,$d.jsxs)(tu,{children:[(0,$d.jsx)(ru,{children:"\u2709"}),(0,$d.jsx)(nu,{children:"Kolla inkorgen."}),(0,$d.jsxs)(au,{children:["Vi har skickat en inloggningsl\xe4nk till ",h.email,".",(0,$d.jsx)("br",{}),"Klicka p\xe5 l\xe4nken i mejlet \u2014 det tar 10 sekunder."]})]}):(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=h.email.trim();if(t&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){g("submitting");try{await fetch("/api/auth/request-magic-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})}),g("sent")}catch{g("error")}}},noValidate:!0,children:[(0,$d.jsx)(Gd,{id:"auth-modal-title",children:"Logga in p\xe5 Arvo Flow"}),(0,$d.jsx)(Qd,{children:"Ange din e-post \u2014 vi skickar en inloggningsl\xe4nk direkt. Inget l\xf6senord."}),(0,$d.jsxs)(Xd,{children:[(0,$d.jsx)(Jd,{htmlFor:"auth-email",children:"E-postadress"}),(0,$d.jsx)(Zd,{id:"auth-email",type:"email",placeholder:"anna@acme.se",value:h.email,onChange:e=>f({email:e.target.value}),autoComplete:"email",autoFocus:!0})]}),"error"===m&&(0,$d.jsx)(eu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===m,children:"submitting"===m?"Skickar\u2026":"Skicka inloggningsl\xe4nk \u2192"})]})]})}),c&&(0,$d.jsx)(Wd,{onClick:e=>{e.target===e.currentTarget&&S()},children:(0,$d.jsxs)(qd,{role:"dialog","aria-modal":"true","aria-labelledby":"early-access-title",children:[(0,$d.jsx)(Yd,{onClick:S,"aria-label":"St\xe4ng",children:"\u2715"}),"success"===k?(0,$d.jsxs)(tu,{children:[(0,$d.jsx)(ru,{children:"\u2713"}),(0,$d.jsx)(nu,{children:"Er plats \xe4r reserverad."}),(0,$d.jsx)(au,{children:"En av grundarna h\xf6r av sig inom 48 timmar f\xf6r att boka er onboarding. Kolla inkorgen \u2014 mejlet \xe4r p\xe5 v\xe4g."})]}):(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault();const t=(()=>{const e={};return x.company.trim()||(e.company="Fyll i f\xf6retagsnamn."),x.name.trim()||(e.name="Fyll i ditt namn."),x.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email.trim())||(e.email="E-postadressen ser inte r\xe4tt ut."):e.email="E-post saknas.",e})();if(y(t),!(Object.keys(t).length>0)){j("submitting");try{const e=await fetch("/api/founding-member",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company:x.company.trim(),name:x.name.trim(),email:x.email.trim(),referrer:"undefined"!==typeof document&&document.referrer||null,timestamp:(new Date).toISOString()})});if(!e.ok)throw new Error("API "+e.status);j("success")}catch{j("error")}}},noValidate:!0,children:[(0,$d.jsx)(Gd,{id:"early-access-title",children:"Bli Founding Member"}),(0,$d.jsx)(Qd,{children:"Reservera er plats och f\xe5 personlig onboarding, 6 m\xe5nader gratis och f\xf6rtur till Fortnox / Visma-kopplingen n\xe4r den \xf6ppnar."}),(0,$d.jsxs)(Xd,{children:[(0,$d.jsx)(Jd,{htmlFor:"ea-company",children:"F\xf6retag"}),(0,$d.jsx)(Zd,{id:"ea-company",ref:w,type:"text",placeholder:"Acme AB",value:x.company,onChange:e=>v(t=>({...t,company:e.target.value})),$error:!!b.company,autoComplete:"organization"}),b.company&&(0,$d.jsx)(eu,{children:b.company})]}),(0,$d.jsxs)(Xd,{children:[(0,$d.jsx)(Jd,{htmlFor:"ea-name",children:"Ditt namn"}),(0,$d.jsx)(Zd,{id:"ea-name",type:"text",placeholder:"Anna Andersson",value:x.name,onChange:e=>v(t=>({...t,name:e.target.value})),$error:!!b.name,autoComplete:"name"}),b.name&&(0,$d.jsx)(eu,{children:b.name})]}),(0,$d.jsxs)(Xd,{children:[(0,$d.jsx)(Jd,{htmlFor:"ea-email",children:"E-post"}),(0,$d.jsx)(Zd,{id:"ea-email",type:"email",placeholder:"anna@acme.se",value:x.email,onChange:e=>v(t=>({...t,email:e.target.value})),$error:!!b.email,autoComplete:"email"}),b.email&&(0,$d.jsx)(eu,{children:b.email})]}),"error"===k&&(0,$d.jsx)(eu,{style:{marginBottom:12},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen om en stund."}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"md",$full:!0,disabled:"submitting"===k,children:"submitting"===k?"Skickar\u2026":"Reservera min plats \u2192"})]})]})})]})]})},uu=vd.footer`
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
`,xu=()=>(0,$d.jsxs)(uu,{children:[(0,$d.jsxs)(pu,{children:[(0,$d.jsxs)(hu,{children:[(0,$d.jsx)(Dd,{}),(0,$d.jsx)("p",{children:"Er proaktiva finansdirekt\xf6r f\xf6r leverant\xf6rskostnader. Bevakning p\xe5 prenumeration \u2014 genomf\xf6rt byte n\xe4r ni vill."})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"Produkt"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#hur",children:"S\xe5 fungerar det"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#priser",children:"Pris"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#hur",children:"Integrationer"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"/#sakerhet",children:"S\xe4kerhet"})})]})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"F\xf6retag"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/",children:"Om oss"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/bias",children:"Partners"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)("a",{href:"mailto:hej@arvoflow.se",children:"Kontakt"})})]})]}),(0,$d.jsxs)(fu,{children:[(0,$d.jsx)("h4",{children:"Juridik"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/villkor",children:"Villkor"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/integritet",children:"Integritet (GDPR)"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/cookies",children:"Cookies"})}),(0,$d.jsx)("li",{children:(0,$d.jsx)(vl,{to:"/bias",children:"Rankningspolicy"})})]})]})]}),(0,$d.jsxs)(mu,{children:[(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," Ansvars- och cyberf\xf6rs\xe4krade via ",(0,$d.jsx)("strong",{children:"Hiscox"})]}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," GDPR-s\xe4krad infrastruktur i ",(0,$d.jsx)("strong",{children:"Sverige"})]}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot"})," Krypterad data ",(0,$d.jsx)("strong",{children:"AES-256"})]})]}),(0,$d.jsxs)(gu,{children:[(0,$d.jsx)("span",{children:"\xa9 2026 Arvo Flow AB \xb7 Org.nr 559500-0000"}),(0,$d.jsx)("span",{children:"Stockholm \xb7 Made with care in Sweden"})]})]}),vu={shield:(0,$d.jsx)("path",{d:"M12 2.5l8 3v6.5c0 4.6-3.3 8.7-8 9.5-4.7-.8-8-4.9-8-9.5V5.5l8-3z"}),bolt:(0,$d.jsx)("path",{d:"M13 2L4 14h7l-1 8 9-12h-7l1-8z"}),phone:(0,$d.jsx)("path",{d:"M5 3h4l2 5-3 2c1.4 2.8 3.7 5.1 6.5 6.5l2-3 5 2v4c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2z"}),wifi:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M2 8.8a14 14 0 0120 0"}),(0,$d.jsx)("path",{d:"M5 12.6a9 9 0 0114 0"}),(0,$d.jsx)("path",{d:"M8.5 16.4a4 4 0 017 0"}),(0,$d.jsx)("circle",{cx:"12",cy:"20",r:"1"})]}),card:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}),(0,$d.jsx)("path",{d:"M2 10h20"})]}),file:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$d.jsx)("path",{d:"M14 2v6h6"})]}),briefcase:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"2",y:"7",width:"20",height:"14",rx:"2"}),(0,$d.jsx)("path",{d:"M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"})]}),truck:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M1 3h15v13H1z"}),(0,$d.jsx)("path",{d:"M16 8h4l3 3v5h-7z"}),(0,$d.jsx)("circle",{cx:"6",cy:"18.5",r:"2"}),(0,$d.jsx)("circle",{cx:"18",cy:"18.5",r:"2"})]}),arrow:(0,$d.jsx)("path",{d:"M5 12h14M13 6l6 6-6 6"}),check:(0,$d.jsx)("path",{d:"M5 12l5 5L20 7"}),upload:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"}),(0,$d.jsx)("path",{d:"M14 2v6h6"}),(0,$d.jsx)("path",{d:"M12 17v-5M9.5 14.5L12 12l2.5 2.5"})]}),spark:(0,$d.jsx)("path",{d:"M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"}),lock:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"4",y:"11",width:"16",height:"11",rx:"2"}),(0,$d.jsx)("path",{d:"M8 11V7a4 4 0 018 0v4"})]}),fortnox:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"3"}),(0,$d.jsx)("path",{d:"M8 8h8M8 12h8M8 16h5"})]}),bankid:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M5 3h14v18H5z"}),(0,$d.jsx)("path",{d:"M9 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2"})]}),trend:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M3 17l6-6 4 4 8-8"}),(0,$d.jsx)("path",{d:"M14 7h7v7"})]}),"alert-circle":(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,$d.jsx)("path",{d:"M12 8v4"}),(0,$d.jsx)("path",{d:"M12 16h.01"})]}),pulse:(0,$d.jsx)("path",{d:"M2 13h4l2.5-7 4 14 2.5-7H22"}),benchmark:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M3 20h18"}),(0,$d.jsx)("path",{d:"M6.5 20v-4.5"}),(0,$d.jsx)("path",{d:"M11 20v-10"}),(0,$d.jsx)("path",{d:"M15.5 20v-6.5"}),(0,$d.jsx)("path",{d:"M20 20v-13"})]}),"calendar-clock":(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("path",{d:"M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6.5"}),(0,$d.jsx)("path",{d:"M16 2v4M8 2v4M3 10h18"}),(0,$d.jsx)("circle",{cx:"17.5",cy:"17.5",r:"4.5"}),(0,$d.jsx)("path",{d:"M17.5 15.6v2l1.4 1"})]})},bu=e=>{let{name:t,size:r=20,stroke:n=1.6,color:a="currentColor",fill:i="none",...o}=e;const l=vu[t];return l?(0,$d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:r,height:r,viewBox:"0 0 24 24",fill:i,stroke:a,strokeWidth:n,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...o,children:l}):null},yu="Lindberg VVS AB",ku="556789-1234",ju=412,wu=38,Su=[{id:"insurance-foretag",category:"F\xf6retagsf\xf6rs\xe4kring",icon:"shield",licensePending:!0,currentSupplier:"Trygg-Hansa",currentAnnualCost:84600,suggestedSupplier:"If Skadef\xf6rs\xe4kring",suggestedAnnualCost:52400,savingPerYear:32200,overpaymentPercent:49,confidence:"high",benchmark:{yourCost:84600,industryMedian:56800,industryLow:49200},contractEndsIn:41,cancellationNotice:30,why:"Din premie ligger 49 % \xf6ver branschsnittet f\xf6r VVS-firmor med 10\u201320 anst\xe4llda. Estimerad \xf6verbetalning baserad p\xe5 faktisk skadehistorik och branschindex.",coverage:["Egendom 12 MSEK","Avbrott 3 m\xe5n","Ansvar 10 MSEK","R\xe4ttsskydd 5 prisbasbelopp"],switchSteps:["Vi f\xf6rbereder upps\xe4gning av nuvarande avtal","Du signerar nytt avtal med BankID","Vi koordinerar \xf6verg\xe5ngen utan avbrott i skydd"]},{id:"el",category:"Elavtal",icon:"bolt",currentSupplier:"Vattenfall (r\xf6rligt)",currentAnnualCost:218400,suggestedSupplier:"Tibber Pulse F\xf6retag",suggestedAnnualCost:162800,savingPerYear:55600,confidence:"high",benchmark:{yourCost:218400,industryMedian:168e3,industryLow:152e3},contractEndsIn:14,cancellationNotice:30,why:"Du betalar ett p\xe5slag p\xe5 12,4 \xf6re/kWh \u2014 Tibber tar 5,9 \xf6re med samma timdebitering. Med 247 MWh/\xe5r ger det 55 600 kr/\xe5r.",coverage:["Spotpris timme f\xf6r timme","Ingen bindningstid","F\xf6rbrukningsapp ing\xe5r"],switchSteps:["Vi s\xe4ger upp ditt nuvarande avtal","Tibber tar \xf6ver leverans n\xe4sta m\xe5nadsskifte","Inget str\xf6mavbrott \u2014 du m\xe4rker bara den l\xe4gre fakturan"]},{id:"mobil",category:"Mobilabonnemang",icon:"phone",currentSupplier:"Telia F\xf6retag",currentAnnualCost:38400,suggestedSupplier:"Tele2 F\xf6retag Obegr\xe4nsad",suggestedAnnualCost:22800,savingPerYear:15600,confidence:"high",benchmark:{yourCost:38400,industryMedian:26400,industryLow:21600},contractEndsIn:0,cancellationNotice:30,why:"14 abonnemang \xe1 229 kr/m\xe5n vs. Tele2:s 135 kr/m\xe5n med samma data och EU-roaming.",coverage:["Obegr\xe4nsat tal & SMS","50 GB data","EU-roaming ing\xe5r","F\xf6retagssupport"],switchSteps:["Vi s\xe4ger upp Telia-avtalen samordnat","Tele2 portar nummer utan avbrott","SIM-kort skickas med bud till kontoret"]},{id:"bredband",category:"F\xf6retagsbredband",icon:"wifi",currentSupplier:"Telenor Business 1000",currentAnnualCost:14988,suggestedSupplier:"Bahnhof F\xf6retag 1000",suggestedAnnualCost:8388,savingPerYear:6600,confidence:"medium",benchmark:{yourCost:14988,industryMedian:10800,industryLow:8388},contractEndsIn:67,cancellationNotice:30,why:"Identisk hastighet (1 Gbit) p\xe5 samma fiberinfrastruktur. Bahnhof har dessutom svensk support och b\xe4ttre SLA.",coverage:["1 Gbit symmetrisk","Statisk IPv4","SLA 99,9 %","Svensk support"],switchSteps:["Bahnhof best\xe4ller porting av befintlig fiber","\xd6verg\xe5ng inom 14 dagar","Vi s\xe4ger upp Telenor n\xe4r Bahnhof \xe4r live"]},{id:"kortterminal",category:"Kortterminal",icon:"card",currentSupplier:"Worldline (Bambora)",currentAnnualCost:27360,suggestedSupplier:"Zettle by PayPal",suggestedAnnualCost:13200,savingPerYear:14160,confidence:"medium",benchmark:{yourCost:27360,industryMedian:16800,industryLow:11400},contractEndsIn:92,cancellationNotice:30,why:"Du betalar 1,95 % per transaktion vs. Zettles 1,25 %. Vid 1,9 MSEK kortvolym/\xe5r = 13 300 kr i ren avgift\xadbesparing + l\xe4gre m\xe5nadsavgift.",coverage:["Kortavgift 1,25 %","Ingen m\xe5nadsavgift","Utbetalning inom 1 dag"],switchSteps:["Ny terminal levereras inom 3 dagar","Vi s\xe4ger upp Worldline n\xe4r allt \xe4r testat","Bokf\xf6ring i Fortnox uppdateras automatiskt"]},{id:"saas-bokforing",category:"Fakturatj\xe4nst",icon:"file",currentSupplier:"Kivra F\xf6retag Premium",currentAnnualCost:8940,suggestedSupplier:"Direkt via Fortnox e-faktura",suggestedAnnualCost:1740,savingPerYear:7200,confidence:"high",benchmark:{yourCost:8940,industryMedian:2400,industryLow:1740},contractEndsIn:0,cancellationNotice:0,why:"Du betalar f\xf6r utskick via Kivra som Fortnox redan st\xf6djer inbyggt. Ingen funktionsf\xf6rlust, samma mottagare.",coverage:["Obegr\xe4nsade e-fakturor","P\xe5minnelser ing\xe5r","PDF-arkiv 7 \xe5r"],switchSteps:["Vi aktiverar Fortnox e-faktura","Befintliga mottagare migreras automatiskt","Kivra-abonnemanget s\xe4gs upp"]},{id:"forsakring-ansvar",category:"Yrkesansvarsf\xf6rs\xe4kring",icon:"briefcase",licensePending:!0,currentSupplier:"L\xe4nsf\xf6rs\xe4kringar",currentAnnualCost:26400,suggestedSupplier:"Gjensidige F\xf6retag",suggestedAnnualCost:19800,savingPerYear:6600,overpaymentPercent:22,confidence:"medium",benchmark:{yourCost:26400,industryMedian:21600,industryLow:18400},contractEndsIn:122,cancellationNotice:60,why:"Din premie ligger 22 % \xf6ver branschsnittet f\xf6r VVS-firmor med liknande oms\xe4ttning. Estimerad \xf6verbetalning baserad p\xe5 branschspecifik skadestatistik.",coverage:["10 MSEK","Tillkommande skydd VVS","R\xe4ttsskydd ing\xe5r"],switchSteps:["Vi f\xf6rbereder nytt avtal hos Gjensidige","Du signerar med BankID","\xd6verg\xe5ng samordnas vid avtalsslut"]},{id:"leasing-bil",category:"F\xf6retagsleasing",icon:"truck",currentSupplier:"ALD Automotive",currentAnnualCost:412800,suggestedSupplier:"Arval Sverige",suggestedAnnualCost:363200,savingPerYear:49600,confidence:"medium",benchmark:{yourCost:412800,industryMedian:384e3,industryLow:348e3},contractEndsIn:184,cancellationNotice:90,why:"8 servicebilar med samma specifikation kostar 11 % mindre hos Arval just nu \u2014 restv\xe4rden r\xe4knade.",coverage:["Full service","Vinterd\xe4ck","F\xf6rs\xe4kring","H\xe4mtning vid skada"],switchSteps:["Vi f\xf6rbereder nya leasingavtal vid avtalsslut","Inget byte under p\xe5g\xe5ende leasing","Bilarna ers\xe4tts succesivt under 6 m\xe5n"]}],$u=[{week:1,label:"Ig\xe5ng",status:"completed",detail:"Fortnox kopplat"},{week:1,label:"Besparingar identifierade",status:"completed",detail:"8 m\xf6jligheter, 187 340 kr/\xe5r"},{week:2,label:"F\xf6rsta byte godk\xe4nt",status:"current",detail:"Vi v\xe4ntar p\xe5 dig"},{week:4,label:"F\xf6rsta besparing utbetald",status:"pending",detail:"Cirka 4 veckor efter aktivering"},{week:12,label:"Kvartalsrapport",status:"pending",detail:"Ny scanning + nya f\xf6rslag"}],zu=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e)+" kr",Eu=e=>e.licensePending?e.savingPerYear:Math.round(.8*e.savingPerYear),_u=e=>e.licensePending?0:Math.round(.2*e.savingPerYear),Nu=e=>e.reduce((e,t)=>e+Eu(t),0),Au=Su.filter(e=>!e.licensePending),Cu=Su.filter(e=>e.licensePending),Fu=Object.freeze({activeNet:Nu(Au),activeFee:Au.reduce((e,t)=>e+_u(t),0),activeGross:Au.reduce((e,t)=>e+t.savingPerYear,0),lockedOverpayment:(Tu=Cu,Tu.filter(e=>e.licensePending).reduce((e,t)=>e+t.savingPerYear,0)),activeCount:Au.length,lockedCount:Cu.length});var Tu;const Pu=jd`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,Du=jd`
  0%   { box-shadow: 0 0 0 0 rgba(27,122,110,0.28); }
  60%  { box-shadow: 0 0 0 7px rgba(27,122,110,0.10); }
  100% { box-shadow: 0 0 0 4px rgba(27,122,110,0.12); }
`,Lu=jd`
  0%   { transform: scale(0); opacity: 0; }
  55%  { transform: scale(1.30); opacity: 1; }
  75%  { transform: scale(0.88); }
  100% { transform: scale(1); opacity: 1; }
`,Ru=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  overflow-x: hidden;
`,Ou=vd.section`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: ${e=>{let{$tight:t}=e;return t?"64px 28px":"120px 28px"}};
  @media (max-width: 740px) {
    padding: ${e=>{let{$tight:t}=e;return t?"48px 20px":"80px 20px"}};
  }
`,Iu=vd.section`
  position: relative;
  padding: 96px 28px 80px;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 56px 20px 48px; }
`,Mu=(vd.hr`
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
`),Bu=vd.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 30%, rgba(27, 122, 110, 0.10), transparent 50%),
    radial-gradient(circle at 82% 12%, rgba(93, 214, 202, 0.14), transparent 55%);
  z-index: 0;
`,Vu=vd.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 48px; }
`,Uu=vd.span`
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
  animation: ${Pu} 0.6s ease both;

  span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  }
`,Ku=vd.h1`
  margin-top: 24px;
  font-size: clamp(40px, 5.2vw, 64px);
  line-height: 1.04;
  font-weight: 500;
  letter-spacing: -0.025em;
  animation: ${Pu} 0.7s 0.1s ease both;

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
`,Hu=vd.p`
  margin-top: 22px;
  font-size: 18.5px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  max-width: 540px;
  animation: ${Pu} 0.7s 0.2s ease both;
`,Wu=vd.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: ${Pu} 0.7s 0.3s ease both;
`,qu=vd.div`
  margin-top: 28px;
  display: flex;
  gap: 0;
  flex-wrap: nowrap;
  animation: ${Pu} 0.7s 0.4s ease both;

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
`,Yu=vd.div`
  position: relative;
  margin-top: 58px; /* förankrar kortets topp mot rubrikens datumlinje */
  animation: ${Pu} 0.8s 0.2s ease both;
  @media (max-width: 980px) { margin-top: 0; }
`,Gu=vd.div`
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
    animation: ${e=>{let{$visible:t}=e;return t?Lu:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) .45s both;
  }
  .tl-step:nth-child(2) .tl-marker {
    animation: ${e=>{let{$visible:t}=e;return t?Lu:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) 1.35s both;
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
      ${e=>{let{$visible:t}=e;return t?Lu:"none"}} .9s cubic-bezier(0.34, 1.56, 0.64, 1) 2.25s both,
      ${e=>{let{$visible:t}=e;return t?Du:"none"}} 1s cubic-bezier(0.34, 1.56, 0.64, 1) 2.9s both;
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
`,Qu=(vd.div`
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
`),Ju=vd.div`
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
`,Xu=vd.section`
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
`,Zu=vd.div`
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
`,ep=vd.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`,tp=vd.div`
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
`,rp=vd.div`
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
`,np=vd.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 40px;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`,ap=vd.div`
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
`,ip=vd.div`
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
`,op=vd.div`
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
`,lp=(vd.div`
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
`),sp=vd.div`
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
`,cp=vd.form`
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
`,dp=vd.div`
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
`,up=vd.div`
  max-width: 820px;
  margin: 0 auto;
  border-top: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
`,pp=vd.details`
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
`,hp=vd.section`
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
`,fp=vd.section`
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
`,mp=vd.div`
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
`,gp=vd.div`
  border-top: 1px solid rgba(250,250,247,.09);
`,xp=vd.div`
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
`,vp=jd`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,0); }
  50%       { box-shadow: 0 0 0 6px rgba(27,122,110,0.20); }
`,bp=jd`
  0%   { box-shadow: 0 0 0 0 rgba(45,181,159,0.55); }
  70%  { box-shadow: 0 0 0 6px rgba(45,181,159,0); }
  100% { box-shadow: 0 0 0 0 rgba(45,181,159,0); }
`,yp=jd`
  0%   { transform: translateY(-130%); opacity: 0; }
  10%  { opacity: 1; }
  45%  { transform: translateY(280%); opacity: 1; }
  55%  { opacity: 0; }
  100% { transform: translateY(280%); opacity: 0; }
`,kp=vd.div`
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
    animation: ${e=>{let{$visible:t}=e;return!1===t?"none":yp}} 7s ease-in-out 1.6s infinite;
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
    animation: ${bp} 2.4s ease-out infinite;
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
    animation: ${vp} 2.8s ease-in-out 2s infinite;
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
`,jp=vd.section`
  position: relative;
  padding: 120px 28px;
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 80px 20px; }
`,wp=vd.div`
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
`,Sp=vd.p`
  max-width: 740px;
  margin: 56px auto 0;
  text-align: center;
  font-family: ${e=>{let{theme:t}=e;return t.font.display}};
  font-size: clamp(20px, 2.4vw, 27px);
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
`,$p=vd.p`
  max-width: 720px;
  margin: 20px auto 0;
  text-align: center;
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.5;
`,zp=vd.div`
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
`,Ep=vd.div`
  display: flex;
  flex-direction: column;
`,_p=vd.div`
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
`,Np=vd.span`
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
`,Ap=vd.span`
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
`,Cp=vd.div`
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
`,Fp=vd.div`
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
`,Tp=vd.div`
  max-width: 880px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 680px) { grid-template-columns: 1fr; }
`,Pp=vd.div`
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
`,Dp=[{step:"Steg 01",title:"Aktivera Arvo \u2014 klart p\xe5 2 min",body:"Ni s\xe4tter upp automatisk vidarebefordran fr\xe5n er faktura-inkorg. Varje ny leverant\xf6rsfaktura fl\xf6dar in till Arvo \u2014 helt automatiskt, ingen IT-integration kr\xe4vs. Vill ni ha fullst\xe4ndig t\xe4ckning kopplar ni enkelt in Fortnox eller Visma som komplement.",bullets:["Noll IT-projekt","GDPR-s\xe4krad infrastruktur i Sverige","Koppla bort n\xe4r som helst"]},{step:"Steg 02",title:"Arvo bevakar. Ni lever era liv.",body:"Varje faktura analyseras mot verifierade marknadsdata och prisdata fr\xe5n j\xe4mf\xf6rbara bolag i er bransch. Avviker ett pris \u2014 oavsett om det r\xf6r sig om ett par hundra eller tiotusentals kronor \u2014 identifieras det direkt.",bullets:["8 leverant\xf6rskategorier idag","Branschanpassad prisdata","L\xf6pande bevakning \u2014 ingen eng\xe5ngsscan"]},{step:"Steg 03",title:"Vi h\xf6r av oss. Ni best\xe4mmer.",body:"Identifierar Arvo en besparing skickar vi er en briefing med exakt vad ni betalar och vad som \xe4r m\xf6jligt. Priset \xe4r redan s\xe4krat via Arvos partnern\xe4tverk \u2014 er BankID-signatur aktiverar bytet. Arvo tar det h\xe4rifr\xe5n.",bullets:["Ni beh\xe5ller full kontroll","Er BankID-signatur aktiverar bytet \u2014 inget mer","Arvo Switch: 20 % av realiserad besparing"]}],Lp=175.93,Rp=e=>{let{score:t,color:r}=e;const a=(0,n.useRef)(null),i=parseFloat((Lp*(1-t/100)).toFixed(2));return(0,n.useEffect)(()=>{const e=requestAnimationFrame(()=>{a.current&&(a.current.style.strokeDashoffset=i)});return()=>cancelAnimationFrame(e)},[i]),(0,$d.jsxs)(ip,{children:[(0,$d.jsxs)("svg",{viewBox:"0 0 72 72",children:[(0,$d.jsx)("circle",{fill:"none",stroke:"#E5EFEA",strokeWidth:"6",cx:"36",cy:"36",r:"28"}),(0,$d.jsx)("circle",{ref:a,fill:"none",stroke:r,strokeWidth:"6",strokeLinecap:"round",strokeDasharray:Lp,strokeDashoffset:Lp,cx:"36",cy:"36",r:"28",style:{transition:"stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)"}})]}),(0,$d.jsxs)(op,{$color:r,children:[(0,$d.jsx)("span",{className:"num",children:t}),(0,$d.jsx)("span",{className:"den",children:"/100"})]})]})},Op=[{label:"Optimalt",color:"#1B7A6E",score:91,desc:"Ni har ett kostnadsoptimerat leverant\xf6rsn\xe4tverk. Ni betalar under eller i niv\xe5 med branschsnittet."},{label:"F\xf6rb\xe4ttringsl\xe4ge",color:"#65A30D",score:72,desc:"Ni betalar mer \xe4n marknadspriset \u2014 en meningsfull besparing som Arvo kan realisera \xe5t er utan byr\xe5krati."},{label:"Suboptimerat",color:"#D97706",score:54,desc:"Ni betalar klart mer \xe4n branschsnittet. Arvo kan g\xf6ra ett byte som betalar sig fr\xe5n dag ett."},{label:"Kritisk",color:"#DC2626",score:28,desc:"Ni betalar kraftigt mer \xe4n marknadspriset och f\xf6rlorar pengar varje faktura. Arvo identifierar, f\xf6rhandlar och genomf\xf6r bytet \xe5t er."}],Ip=[{q:"Vad kostar det?",a:"Arvo erbjuds i tv\xe5 lager. Arvo Intelligence kostar 1 995 kr/m\xe5n \u2014 l\xf6pande bevakning, smygh\xf6jningslarm och avtalsbevakning, ingen bindningstid. Arvo Switch \xe4r ett till\xe4gg: vill ni att Arvo genomf\xf6r ett identifierat leverant\xf6rsbyte tar vi 20 % av realiserad besparing, fakturerat efter att bytet \xe4r genomf\xf6rt. Hittar vi ingen besparing \u2014 kostar Switch inget."},{q:"Hur kan ni vara s\xe4kra p\xe5 att rekommendationerna \xe4r opartiska?",a:(0,$d.jsxs)($d.Fragment,{children:["Vi tj\xe4nar pengar bara n\xe4r ni sparar \u2014 det \xe4r beviset p\xe5 opartiskhet. Leverant\xf6rer kan inte k\xf6pa sig en h\xf6gre placering; vi s\xe4tter tak f\xf6r vad de f\xe5r betala oss och krediterar er direkt om n\xe5gon f\xf6rs\xf6ker g\xe5 \xf6ver. Policyn \xe4r \xf6ppet publicerad under ",(0,$d.jsx)(vl,{to:"/bias",children:"v\xe5r rankningspolicy"}),"."]})},{q:"Varf\xf6r ska jag lita p\xe5 era besparingskalkyler?",a:"Vi bygger p\xe5 verifierade marknadsdata \u2014 offentliga listpriser, ramavtalsdata och faktiska operat\xf6rspriser. Och eftersom vi tar 20 % av identifierad besparing har vi inget att vinna p\xe5 att \xf6verdriva: en projektion som inte h\xe5ller kostar oss f\xf6rtroendet, inte bara besparingsarvodet. Vi tj\xe4nar mer p\xe5 att lova lite och leverera fullt ut."},{q:"Vad h\xe4nder om den nya leverant\xf6ren h\xf6jer priset efter bytet?",a:"V\xe5r fee baseras p\xe5 kontrakterade priser vid avtalssignering. F\xf6r\xe4ndras marknadsl\xe4get efter bytet hj\xe4lper vi er med en ny analys \u2014 utan extra kostnad."},{q:"S\xe4ger ni upp avtal autonomt utan min godk\xe4nnande?",a:"Aldrig. Varje byte kr\xe4ver er BankID-signatur. Vi f\xf6rbereder, ni godk\xe4nner. Det \xe4r en h\xe5rd regel."},{q:"Vilka kategorier t\xe4cker ni idag?",a:"Elavtal, mobilabonnemang, f\xf6retagsbredband, programvarulicenser / SaaS, skrivare & Managed Print, kortterminaler, fakturatj\xe4nster och f\xf6retagsleasing \u2014 \xe5tta kategorier d\xe4r vi kan genomf\xf6ra hela bytesprocessen idag. F\xf6retags- och yrkesansvarsf\xf6rs\xe4kringar analyserar vi redan, men byten genomf\xf6rs n\xe4r v\xe5r FI-licens \xe4r klar. Fler kategorier l\xe4ggs till varje kvartal baserat p\xe5 var vi ser st\xf6rst besparingar i kunddatan."},{q:"Vad h\xe4nder med min data?",a:"Arvo ser endast det ni vidarebefordrar \u2014 leverant\xf6rsfakturor, inget annat. Datan lagras krypterad i Sverige (Bahnhof Stockholm). Kopplar ni in Fortnox eller Visma g\xe4ller samma princip: enbart l\xe4s-r\xe4ttigheter mot leverant\xf6rsfakturor. Vi s\xe4ljer aldrig identifierbar data \u2014 anonymiserade branschindex \xe4r v\xe5r enda dataprodukt ut\xf6ver tj\xe4nsten."}],Mp=[{cat:"Mobilabonnemang",unit:"kr/SIM/\xe5r",p25:3408,median:4200,p75:5200,you:5760,max:7e3,status:"over"},{cat:"Skrivare & print",unit:"kr/m\xe5n",p25:1800,median:2400,p75:3200,you:3900,max:4600,status:"over"},{cat:"Microsoft 365",unit:"kr/seat/\xe5r",p25:1320,median:1680,p75:2100,you:2400,max:2800,status:"over"},{cat:"F\xf6retagsbredband",unit:"kr/m\xe5n",p25:380,median:510,p75:650,you:730,max:880,status:"over"},{cat:"Fakturatj\xe4nst",unit:"kr/m\xe5n",p25:180,median:240,p75:320,you:360,max:440,status:"over"},{cat:"Elavtal",unit:"\xf6re/kWh",p25:112,median:145,p75:178,you:195,max:230,status:"over"},{cat:"Kortterminal",unit:"kr/m\xe5n",p25:240,median:320,p75:420,you:298,max:520,status:"inline"},{cat:"F\xf6retagsleasing",unit:"kr/m\xe5n",p25:3200,median:4100,p75:5200,you:3850,max:6e3,status:"inline"}],Bp=e=>{let{row:t,i:r,visible:a}=e;const i="over"===t.status,o=t.you-t.median,l=((e,t)=>{const r=e/t;return Math.max(9,Math.min(94,32+68*(r-1)))})(t.you,t.median),s=Math.abs(l-32),c=Math.max(0,t.you/t.median-1),d=i?Math.round(12+Math.min(10*c,5)):12,u=75*r+250+"ms",p=75*r+420+"ms",h=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1100,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;const[i,o]=(0,n.useState)(0);return(0,n.useEffect)(()=>{if(!t)return;let n;const i=setTimeout(()=>{let t;const a=i=>{void 0===t&&(t=i);const l=Math.min((i-t)/r,1),s=1-Math.pow(1-l,3);o(Math.round(e*s)),l<1&&(n=requestAnimationFrame(a))};n=requestAnimationFrame(a)},a);return()=>{clearTimeout(i),n&&cancelAnimationFrame(n)}},[e,t,r,a]),i}(o,a&&i,850,75*r+450);return(0,$d.jsxs)(_p,{children:[(0,$d.jsxs)("div",{className:"cat-col",children:[(0,$d.jsx)("span",{className:"cat",children:t.cat}),(0,$d.jsx)("span",{className:"unit",children:t.unit})]}),(0,$d.jsxs)("div",{className:"axis",children:[(0,$d.jsx)("span",{className:"zone"}),(0,$d.jsx)("span",{className:"line"}),(0,$d.jsx)(Np,{$over:i,$span:`${s}%`,$line:"32%",$visible:a,$delay:u}),(0,$d.jsx)(Ap,{$x:`${l}%`,$size:d,$over:i,$visible:a,$delay:p})]}),i?(0,$d.jsxs)("div",{className:"delta over",children:[(0,$d.jsxs)("strong",{children:["+",(a?h:0).toLocaleString("sv-SE")]}),(0,$d.jsx)("small",{children:"s\xe4mre \xe4n snittet"})]}):(0,$d.jsxs)("div",{className:"delta inline",children:[(0,$d.jsxs)("strong",{children:[(0,$d.jsx)(bu,{name:"check",size:13,stroke:2.6})," i niv\xe5"]}),(0,$d.jsx)("small",{children:"v\xe4lf\xf6rhandlat"})]})]})},Vp=()=>{const[e,t]=(0,n.useState)(!1),r=(0,n.useRef)(null);(0,n.useEffect)(()=>{const e=r.current;if(!e)return;const n=new IntersectionObserver(e=>{let[r]=e;r.isIntersecting&&(t(!0),n.disconnect())},{threshold:.1});return n.observe(e),()=>n.disconnect()},[]);const a=Mp.filter(e=>"over"===e.status).length;return(0,$d.jsxs)(zp,{ref:r,children:[(0,$d.jsxs)("div",{className:"spectrum-head",children:[(0,$d.jsx)("span",{className:"title",children:"Er leverant\xf6rsportf\xf6lj"}),(0,$d.jsx)("span",{className:"sub",children:"8 kategorier \xb7 bevakade dygnet runt"}),(0,$d.jsx)("span",{className:"tag",children:"Exempel"})]}),(0,$d.jsx)(Ep,{children:Mp.map((t,r)=>(0,$d.jsx)(Bp,{row:t,i:r,visible:e},t.cat))}),(0,$d.jsx)(Cp,{children:(0,$d.jsxs)("span",{className:"axis-cell",children:[(0,$d.jsx)("span",{className:"lbl zone",children:"V\xe4lf\xf6rhandlat"}),(0,$d.jsx)("span",{className:"lbl mid",children:"Branschsnitt"}),(0,$d.jsx)("span",{className:"lbl right",children:"S\xe4mre \u2192"})]})}),(0,$d.jsxs)(Fp,{children:[(0,$d.jsxs)("div",{className:"sum-meta",children:[(0,$d.jsxs)("div",{className:"sum-col bad",children:[(0,$d.jsx)("strong",{children:a}),(0,$d.jsx)("span",{children:"s\xe4mre \xe4n snittet"})]}),(0,$d.jsx)("div",{className:"sum-sep"}),(0,$d.jsxs)("div",{className:"sum-col good",children:[(0,$d.jsx)("strong",{children:Mp.length-a}),(0,$d.jsx)("span",{children:"b\xe4ttre \xe4n snittet"})]})]}),(0,$d.jsx)("p",{children:"Sex av \xe5tta kategorier kostar mer \xe4n v\xe4lf\xf6rhandlade bolag i er bransch betalar \u2014 h\xf6jningen sker gradvis och m\xe4rks s\xe4llan i tid. Arvo identifierar det innan ni hunnit se det."})]})]})},Up=new Set([0,2,3,5,8,9,11,13]),Kp=()=>{const[e,t]=(0,n.useState)({company:"",name:"",email:""}),[r,a]=(0,n.useState)({}),[i,o]=(0,n.useState)("idle"),[l,s]=(0,n.useState)(!1),c=(0,n.useRef)(null),[d,u]=(0,n.useState)(!1);(0,n.useEffect)(()=>{const e=requestAnimationFrame(()=>u(!0));return()=>cancelAnimationFrame(e)},[]),(0,n.useEffect)(()=>{const e=c.current;if(!e)return;const t=new IntersectionObserver(e=>{let[r]=e;r.isIntersecting&&(s(!0),t.disconnect())},{threshold:.1});return t.observe(e),()=>t.disconnect()},[]);return(0,$d.jsxs)(Ru,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(Iu,{children:[(0,$d.jsx)(Bu,{}),(0,$d.jsxs)(Vu,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsxs)(Uu,{children:[(0,$d.jsx)("span",{className:"dot"})," Arvo Intelligence \xb7 Proaktiv finansdirekt\xf6r f\xf6r svenska bolag"]}),(0,$d.jsxs)(Ku,{children:[(0,$d.jsx)("span",{className:"line",children:"Er finansdirekt\xf6r."}),(0,$d.jsx)("em",{children:"Innan ni fr\xe5gar."})]}),(0,$d.jsx)(Hu,{children:"Era leverant\xf6rer justerar priser i det tysta. Arvo bevakar varje avtal dygnet runt \u2014 och h\xf6r av sig i samma stund en kostnad b\xf6rjar krypa upp\xe5t, ofta innan ni sj\xe4lva hunnit m\xe4rka n\xe5got. Vi identifierar l\xe4ckaget. Ni tar beslutet."}),(0,$d.jsxs)(Wu,{children:[(0,$d.jsxs)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"lg",children:["Testa med en faktura ",(0,$d.jsx)(bu,{name:"arrow",size:18})]}),(0,$d.jsx)(Id,{as:vl,to:"/intelligence",$variant:"secondary",$size:"lg",children:"Aktivera Arvo Intelligence"})]}),(0,$d.jsxs)(qu,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Aktivera en g\xe5ng"}),(0,$d.jsx)("span",{children:"Arvo bevakar resten \u2014 klart p\xe5 2 min"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Aldrig utan er signatur"}),(0,$d.jsx)("span",{children:"ni beh\xe5ller full kontroll"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Betala bara n\xe4r ni sparat"}),(0,$d.jsx)("span",{children:"Switch: 0 kr tills bytet \xe4r klart"})]})]})]}),(0,$d.jsx)(Yu,{children:(0,$d.jsxs)(Gu,{$visible:d,children:[(0,$d.jsxs)("div",{className:"tl-head",children:[(0,$d.jsx)("span",{className:"tl-brand",children:"Arvo Intelligence"}),(0,$d.jsxs)("span",{className:"tl-status",children:[(0,$d.jsx)(bu,{name:"check",size:11,stroke:3})," \xc5tg\xe4rdat"]})]}),(0,$d.jsxs)("div",{className:"tl-body",children:[(0,$d.jsxs)("div",{className:"tl-step",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"2 maj \xb7 08:14"}),(0,$d.jsx)("span",{className:"tl-title",children:"Smygh\xf6jning identifierad"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Telia h\xf6jde er mobilflotta med 11\xa0% \u2014 utan att avisera"})]})]}),(0,$d.jsxs)("div",{className:"tl-step",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"4 maj"}),(0,$d.jsx)("span",{className:"tl-title",children:"Ni godk\xe4nde \xe5tg\xe4rden"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Arvo genomf\xf6rde resten \u2014 ni beh\xf6vde inte agera"})]})]}),(0,$d.jsxs)("div",{className:"tl-step done",children:[(0,$d.jsx)("span",{className:"tl-marker"}),(0,$d.jsxs)("div",{className:"tl-body-text",children:[(0,$d.jsx)("span",{className:"tl-date",children:"9 maj"}),(0,$d.jsx)("span",{className:"tl-title",children:"Nytt pris bekr\xe4ftat"}),(0,$d.jsx)("span",{className:"tl-detail",children:"Priset s\xe4nkt 14\xa0% \u2014 besparingen s\xe4krad"})]})]})]}),(0,$d.jsxs)("div",{className:"tl-foot",children:[(0,$d.jsxs)("div",{className:"tl-saving",children:[(0,$d.jsx)("span",{className:"tl-saving-label",children:"S\xe4krad besparing"}),(0,$d.jsxs)("span",{className:"tl-saving-value",children:["21\xa0360\xa0kr",(0,$d.jsx)("span",{className:"unit",children:"/\xe5r"})]})]}),(0,$d.jsx)("button",{className:"tl-cta",children:"Se hur Arvo l\xf6ste det \u2192"})]})]})})]})]}),(0,$d.jsx)(Mu,{"aria-hidden":"true",children:(0,$d.jsx)("svg",{viewBox:"0 0 1440 56",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,$d.jsx)("path",{d:"M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z"})})}),(0,$d.jsxs)(Qu,{id:"sakerhet",children:[(0,$d.jsxs)(Ju,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"lock",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Vi ser bara det ni delar"}),(0,$d.jsx)("p",{children:"Ni vidarebefordrar era leverant\xf6rsfakturor \u2014 inget annat. Kundfakturor, l\xf6nedata, bankkonton och personnummer n\xe5r oss aldrig."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{className:"group-label",children:"Vad vi ser"}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Avtal & f\xf6rfallodatum"]}),(0,$d.jsx)("li",{className:"group-label blocked",children:"N\xe5r oss aldrig"}),(0,$d.jsxs)("li",{className:"no",children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," L\xf6n & personnummer"]}),(0,$d.jsxs)("li",{className:"no",children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," Kundfakturor"]})]})]}),(0,$d.jsxs)(Ju,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"bolt",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Aktivera en g\xe5ng. Arvo tar resten."}),(0,$d.jsx)("p",{children:"Ni kopplar in Arvo en enda g\xe5ng. D\xe4refter fl\xf6dar varje ny leverant\xf6rsfaktura in automatiskt och bevakas i realtid \u2014 ni beh\xf6ver aldrig ladda upp n\xe5got manuellt."}),(0,$d.jsx)("strong",{children:"Klart p\xe5 2 minuter. Sen sk\xf6ter Arvo resten."})]}),(0,$d.jsxs)(Ju,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"trend",size:22,stroke:2})}),(0,$d.jsx)("h3",{children:"Betala bara f\xf6r v\xe4rdet"}),(0,$d.jsx)("p",{children:"Arvo Switch \xe4r 100 % prestationsbaserat \u2014 20 % av identifierad besparing, fakturerat efter genomf\xf6rt byte. Hittar vi inget kostar Switch ingenting."}),(0,$d.jsx)("strong",{children:"Gratis att starta. Ni betalar n\xe4r ni sparat."})]})]}),(0,$d.jsx)(Xu,{children:(0,$d.jsxs)("div",{className:"inner",children:[(0,$d.jsxs)("div",{className:"eyebrow",children:[(0,$d.jsx)(bu,{name:"shield",size:13,stroke:2})," Rankningspolicy"]}),(0,$d.jsx)("h2",{children:"100 % oberoende. V\xe5r algoritm styrs av er besparing, inte provisioner."}),(0,$d.jsx)("p",{children:"Vi st\xe5r p\xe5 er sida, inte leverant\xf6rens. Genom fasta tak f\xf6r ers\xe4ttningar s\xe4kerst\xe4ller vi att v\xe5r algoritm alltid \xe4r objektiv och enbart prioriterar er besparing. Om en leverant\xf6r erbjuder mer \xe4n v\xe5rt tak, krediteras \xf6verskottet direkt till er. Det \xe4r matematisk transparens \u2014 inga dolda agendor, bara l\xe4gre kostnader."}),(0,$d.jsxs)(vl,{to:"/bias",className:"cta-link",children:["L\xe4s hur v\xe5r algoritm rankar ",(0,$d.jsx)(bu,{name:"arrow",size:15})]})]})}),(0,$d.jsxs)(Ou,{id:"hur",children:[(0,$d.jsxs)(Zu,{$left:!0,children:[(0,$d.jsx)("span",{className:"kicker",children:"S\xe5 fungerar Arvo Flow"}),(0,$d.jsx)("h2",{children:"Aktivera en g\xe5ng. Vi sk\xf6ter resten."}),(0,$d.jsx)("p",{children:"Ni beh\xf6ver inte byta system, l\xe4ra er n\xe5got nytt eller komma ih\xe5g att kolla n\xe5got. Arvo h\xf6r av sig \u2014 ni beh\xf6ver inte fr\xe5ga."})]}),(0,$d.jsx)(ep,{children:Dp.map(e=>(0,$d.jsxs)(tp,{children:[(0,$d.jsx)("span",{className:"step",children:e.step}),(0,$d.jsx)("h3",{children:e.title}),(0,$d.jsx)("p",{children:e.body}),(0,$d.jsx)("ul",{children:e.bullets.map(e=>(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2}),e]},e))})]},e.step))}),(0,$d.jsxs)(rp,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvo Score\u2122"}),(0,$d.jsx)("h3",{children:"Vad ber\xe4ttar ert Score om era leverant\xf6rsavtal?"}),(0,$d.jsx)("p",{children:"Varje kategori i er bokf\xf6ring f\xe5r ett Score mellan 0\u2013100. Scoren baseras p\xe5 hur ert avtalspris f\xf6rh\xe5ller sig till branschsnittet \u2014 fyra niv\xe5er avg\xf6r om ni \xe4r optimala eller betalar f\xf6r mycket."})]}),(0,$d.jsx)(np,{children:Op.map(e=>(0,$d.jsxs)(ap,{$color:e.color,children:[(0,$d.jsx)(Rp,{score:e.score,color:e.color}),(0,$d.jsxs)("div",{className:"text",children:[(0,$d.jsx)("strong",{className:"level",children:e.label}),(0,$d.jsx)("p",{children:e.desc})]})]},e.label))})]}),(0,$d.jsx)(fp,{id:"intelligence",children:(0,$d.jsxs)(mp,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h2",{children:"Arvo m\xe4rker det innan det kostar er."}),(0,$d.jsx)("p",{className:"sub",children:"Bokf\xf6ringsprogram registrerar vad ni betalar. Arvo Intelligence kontaktar er n\xe4r ni h\xe5ller p\xe5 att betala f\xf6r mycket."}),(0,$d.jsxs)(gp,{children:[(0,$d.jsxs)(xp,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(bu,{name:"pulse",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Smygh\xf6jningslarm"}),(0,$d.jsx)("p",{children:"Vi j\xe4mf\xf6r varje ny faktura mot f\xf6reg\xe5ende period. Avviker priset \u2014 kontaktar vi er samma dag."})]})]}),(0,$d.jsxs)(xp,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(bu,{name:"benchmark",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Community Benchmark"}),(0,$d.jsx)("p",{children:"Er prisdata m\xe4ts mot anonymiserade data fr\xe5n j\xe4mf\xf6rbara bolag i er bransch. Ni vet alltid om ni betalar r\xe4tt."})]})]}),(0,$d.jsxs)(xp,{children:[(0,$d.jsx)("div",{className:"pillar-icon",children:(0,$d.jsx)(bu,{name:"calendar-clock",size:19,stroke:1.9})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h4",{children:"Proaktiv avtalsbevakning"}),(0,$d.jsx)("p",{children:"90 dagar innan ett avtal f\xf6rnyas automatiskt varnar vi er \u2014 och f\xf6rhandlar p\xe5 er beg\xe4ran."})]})]})]})]}),(0,$d.jsxs)(kp,{ref:c,$visible:l,children:[(0,$d.jsxs)("div",{className:"preview-header",children:[(0,$d.jsxs)("span",{className:"preview-brand",children:[(0,$d.jsx)("span",{className:"live"})," Arvo Intelligence"]}),(0,$d.jsx)("span",{className:"preview-time",children:"i morse \xb7 08:14"})]}),(0,$d.jsxs)("div",{className:"signal alert",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"pulse",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Smygh\xf6jningslarm"}),(0,$d.jsxs)("div",{className:"signal-line",children:["Telia \xb7 Er mobilflotta",(0,$d.jsx)("span",{className:"badge up",children:"+11\xa0%"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Priset h\xf6jt mot f\xf6rra perioden \u2014 utan avisering."})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"benchmark",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Community Benchmark"}),(0,$d.jsx)("div",{className:"bench-grid","aria-hidden":"true",children:Array.from({length:15}).map((e,t)=>(0,$d.jsx)("span",{className:`${Up.has(t)?"on":""}${8===t?" you":""}`,style:{transitionDelay:560+38*t+"ms"}},t))}),(0,$d.jsxs)("p",{className:"signal-sub",children:[(0,$d.jsx)("strong",{children:"8 av 15"})," j\xe4mf\xf6rbara bolag i er bransch fick samma h\xf6jning den h\xe4r m\xe5naden \u2014 ",(0,$d.jsx)("strong",{children:"inklusive er"}),"."]})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"calendar-clock",size:16,stroke:2})}),(0,$d.jsxs)("div",{className:"signal-main",children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Avtalsbevakning"}),(0,$d.jsxs)("div",{className:"signal-line sm",children:["Avtalet f\xf6rnyas automatiskt om ",(0,$d.jsx)("strong",{children:"23\xa0dagar"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Arvo hinner omf\xf6rhandla innan bindningen l\xe5ses \xe4nnu ett \xe5r."})]})]}),(0,$d.jsxs)("div",{className:"alert-saving",children:[(0,$d.jsx)("div",{className:"saving-label",children:"Identifierad besparing"}),(0,$d.jsxs)("div",{className:"saving-amount",children:["21\xa0360\xa0kr",(0,$d.jsx)("span",{className:"unit",children:"/\xe5r"})]})]}),(0,$d.jsxs)("div",{className:"alert-actions",children:[(0,$d.jsx)("button",{className:"btn-primary",children:"Ja, Arvo agerar \u2192"}),(0,$d.jsx)("button",{className:"btn-secondary",children:"Visa underlag"})]})]})]})}),(0,$d.jsxs)(jp,{id:"prisintelligens",children:[(0,$d.jsxs)(wp,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvos prisintelligens"}),(0,$d.jsx)("h2",{children:"Vi vet vad era leverant\xf6rer tar av andra."}),(0,$d.jsx)("p",{children:"Varje faktura Arvo analyserar \xe4r en ny datapunkt. Vi vet inte bara vad Telia listar p\xe5 sin hemsida \u2014 vi vet vad de faktiskt tar betalt av bolag i er bransch och er storlek. H\xe4r \xe4r hela er leverant\xf6rsportf\xf6lj, m\xe4tt mot marknaden p\xe5 en och samma skala."})]}),(0,$d.jsx)(Vp,{}),(0,$d.jsx)(Sp,{children:"Ju fler fakturor Arvo ser, desto mer vet vi \u2014 och desto vassare blir varje rekommendation. Ett f\xf6rspr\xe5ng som inte g\xe5r att kopiera."}),(0,$d.jsx)($p,{children:"Visualiseringen \xe4r illustrativ \u2014 prisintervall baserade p\xe5 verifierade marknadsdata maj 2026."})]}),(0,$d.jsxs)(Ou,{id:"priser",children:[(0,$d.jsxs)(Zu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Pris"}),(0,$d.jsx)("h2",{children:"Bevakning p\xe5 prenumeration. Genomf\xf6rt byte vid behov."}),(0,$d.jsx)("p",{children:"V\xe4lj det som passar er \u2014 eller kombinera b\xe5da."})]}),(0,$d.jsxs)(Tp,{children:[(0,$d.jsxs)(Pp,{$featured:!0,children:[(0,$d.jsx)("div",{className:"tier-badge",children:"Arvo Intelligence"}),(0,$d.jsx)("h3",{children:"Er proaktiva finansdirekt\xf6r."}),(0,$d.jsxs)("div",{className:"tier-price",children:["1\xa0995 kr",(0,$d.jsx)("span",{className:"period",children:"/ m\xe5n"})]}),(0,$d.jsx)("p",{className:"tier-tagline",children:"L\xf6pande bevakning av samtliga leverant\xf6rsfakturor. Arvo h\xf6r av sig \u2014 ni beh\xf6ver inte fr\xe5ga."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Smygh\xf6jningslarm \u2014 avvikelse detekteras direkt"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Community Benchmark mot er bransch"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Avtalsbevakning med 90-dagarsvarning"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," M\xe5nadsvis briefing med konkreta insikter"]})]}),(0,$d.jsx)(Id,{as:vl,to:"/intelligence",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},children:"Aktivera Arvo Intelligence \u2192"}),(0,$d.jsx)("p",{className:"tier-note",children:"Ingen bindningstid \xb7 Kom ig\xe5ng p\xe5 2 minuter"})]}),(0,$d.jsxs)(Pp,{children:[(0,$d.jsx)("div",{className:"tier-badge",children:"Arvo Switch"}),(0,$d.jsx)("h3",{children:"Genomf\xf6rt leverant\xf6rsbyte."}),(0,$d.jsxs)("div",{className:"tier-price",children:["20 %",(0,$d.jsx)("span",{className:"period",children:"av besparing"})]}),(0,$d.jsx)("p",{className:"tier-tagline",children:"Priset \xe4r s\xe4krat via Arvos partnern\xe4tverk \u2014 er BankID-signatur aktiverar bytet."}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Identifierad besparing bekr\xe4ftas med verifierade marknadsdata"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Ni godk\xe4nner varje byte med BankID"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Fr.o.m. \xe5r 2 tillfaller hela besparingen er"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:15,stroke:2.4})," Hittar vi inget \u2014 kostar det inget"]})]}),(0,$d.jsx)(Id,{as:vl,to:"/testa-faktura",$variant:"secondary",$size:"lg",style:{width:"100%",justifyContent:"center"},children:"Testa med en faktura \u2192"}),(0,$d.jsxs)("div",{className:"tier-addon",children:[(0,$d.jsx)("strong",{children:"Till\xe4gg f\xf6r Intelligence-kunder"}),"Aktivera ett byte direkt fr\xe5n er m\xe5nadsbriefing. 20 % av realiserad besparing."]})]})]})]}),(0,$d.jsxs)(Ou,{id:"founding-members",children:[(0,$d.jsxs)(Zu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Founding Members \xb7 Begr\xe4nsade platser"}),(0,$d.jsx)("h2",{children:"Vill du vara f\xf6rst ut?"}),(0,$d.jsx)("p",{children:"Vi tar in 50 svenska f\xf6retag innan publik lansering. Du f\xe5r personlig onboarding direkt med grundarna, tj\xe4nsten gratis de f\xf6rsta 6 m\xe5naderna, och p\xe5verkan \xf6ver vilka kategorier vi prioriterar h\xe4rn\xe4st."})]}),(0,$d.jsxs)(lp,{children:[(0,$d.jsxs)(sp,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Founding Member"}),(0,$d.jsx)("h2",{children:"50 platser. Du f\xe5r p\xe5verkan."}),(0,$d.jsx)("p",{className:"lede",children:"Vi sl\xe4pper Arvo Flow stegvis. Founding Members f\xe5r tillg\xe5ng f\xf6rst, tj\xe4nsten helt gratis de f\xf6rsta 6 m\xe5naderna, och hj\xe4lper oss prioritera vilka leverant\xf6rskategorier som ska in h\xe4rn\xe4st."}),(0,$d.jsxs)("ul",{className:"benefits",children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})," Personlig onboarding direkt med grundarna \u2014 30 min Teams"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})," Tj\xe4nsten \xe4r helt gratis de f\xf6rsta 6 m\xe5naderna \u2014 ingen success-fee, inga avgifter"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})," Du r\xf6star p\xe5 vilka kategorier vi \xf6ppnar n\xe4sta kvartal"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})," Garanterad f\xf6rtur till f\xf6rs\xe4krings\xadbyten n\xe4r FI-licensen \xe4r klar"]})]})]}),"success"===i?(0,$d.jsxs)(dp,{children:[(0,$d.jsx)("div",{className:"check",children:(0,$d.jsx)(bu,{name:"check",size:28,stroke:2.5})}),(0,$d.jsx)("h3",{children:"Tack \u2014 du st\xe5r p\xe5 listan."}),(0,$d.jsx)("p",{children:"Vi h\xf6r av oss inom 48 timmar f\xf6r att boka en kort onboarding och hj\xe4lpa dig komma ig\xe5ng."})]}):(0,$d.jsxs)(cp,{onSubmit:async t=>{t.preventDefault();const r=(e=>{const t={};return e.company.trim()||(t.company="F\xf6retagsnamn saknas."),e.name.trim()||(t.name="Namn saknas."),e.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.trim())||(t.email="E-postadressen ser inte r\xe4tt ut."):t.email="E-post saknas.",t})(e);if(a(r),!(Object.keys(r).length>0)){o("submitting");try{const t=await fetch("/api/founding-member",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company:e.company.trim(),name:e.name.trim(),email:e.email.trim(),referrer:"undefined"!==typeof document&&document.referrer||null,timestamp:(new Date).toISOString()})});if(!t.ok)throw new Error("API "+t.status);o("success")}catch(n){o("error")}}},noValidate:!0,children:[(0,$d.jsxs)("label",{children:["F\xf6retagsnamn",(0,$d.jsx)("input",{type:"text",name:"company",required:!0,autoComplete:"organization",placeholder:"t.ex. Lindberg VVS AB",value:e.company,onChange:e=>t(t=>({...t,company:e.target.value})),"aria-invalid":!!r.company||void 0,disabled:"submitting"===i}),r.company&&(0,$d.jsx)("span",{className:"error",children:r.company})]}),(0,$d.jsxs)("label",{children:["Namn",(0,$d.jsx)("input",{type:"text",name:"name",required:!0,autoComplete:"name",placeholder:"t.ex. Johan Lindberg",value:e.name,onChange:e=>t(t=>({...t,name:e.target.value})),"aria-invalid":!!r.name||void 0,disabled:"submitting"===i}),r.name&&(0,$d.jsx)("span",{className:"error",children:r.name})]}),(0,$d.jsxs)("label",{children:["E-post",(0,$d.jsx)("input",{type:"email",name:"email",required:!0,autoComplete:"email",placeholder:"johan@lindbergvvs.se",value:e.email,onChange:e=>t(t=>({...t,email:e.target.value})),"aria-invalid":!!r.email||void 0,disabled:"submitting"===i}),r.email&&(0,$d.jsx)("span",{className:"error",children:r.email})]}),(0,$d.jsxs)(Id,{type:"submit",$variant:"gradient",$size:"lg",disabled:"submitting"===i,children:["submitting"===i?"Skickar\u2026":"Reservera min plats","submitting"!==i&&(0,$d.jsx)(bu,{name:"arrow",size:18})]}),"error"===i&&(0,$d.jsx)("span",{className:"error",children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen eller mejla hej@arvoflow.se."}),(0,$d.jsx)("p",{className:"fineprint",children:"Vi anv\xe4nder dina uppgifter enbart f\xf6r att kontakta dig om Founding Member-platsen och raderar dem om du tackar nej. Inga utskick utan ditt godk\xe4nnande."})]})]})]}),(0,$d.jsxs)(Ou,{id:"faq",children:[(0,$d.jsxs)(Zu,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Vanliga fr\xe5gor"}),(0,$d.jsx)("h2",{children:"Det vi f\xe5r oftast \u2014 rakt p\xe5."})]}),(0,$d.jsx)(up,{children:Ip.map((e,t)=>(0,$d.jsxs)(pp,{children:[(0,$d.jsx)("summary",{children:e.q}),(0,$d.jsx)("p",{children:e.a})]},e.q))})]}),(0,$d.jsxs)(hp,{children:[(0,$d.jsx)("h2",{children:"Betalar ni f\xf6r mycket just nu?"}),(0,$d.jsx)("p",{children:"Ni vet det inte f\xf6rr\xe4n Arvo har tittat. Ladda upp en faktura p\xe5 60 sekunder \u2014 vi visar er exakt var ni st\xe5r mot branschsnittet."}),(0,$d.jsx)("div",{className:"actions",children:(0,$d.jsxs)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"lg",children:["Testa med en faktura ",(0,$d.jsx)(bu,{name:"arrow",size:18})]})}),(0,$d.jsx)("div",{className:"fineprint",children:"Inga kreditkortsuppgifter. Ingen bindningstid. Avsluta n\xe4r ni vill."})]}),(0,$d.jsx)(xu,{})]})},Hp=jd`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,Wp=vd.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 60%),
    radial-gradient(circle at 0% 100%, ${e=>{let{theme:t}=e;return t.color.accentSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,qp=vd.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`,Yp=vd.div`
  width: 100%;
  max-width: 640px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.lg}};
  animation: ${Hp} 0.5s ease both;
  @media (max-width: 600px) { padding: 32px 24px; }
`,Gp=vd.div`
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
`,Qp=vd.h1`
  margin-top: 14px;
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
`,Jp=vd.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.55;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
`,Xp=(vd.div`
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
`),Zp=vd.div`
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
`,eh=vd.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  svg { color: ${e=>{let{theme:t}=e;return t.color.brand}}; opacity: 0.7; }
`,th=vd.div`
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
`,rh=vd.div`
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
`,nh=vd.div`
  margin-top: 22px;
  padding: 14px 16px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`,ah=vd.div`
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
`,ih=vd.div`
  margin-top: 24px;
`,oh=vd.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin-bottom: 10px;
`,lh=vd.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`,sh=vd.label`
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
`,ch=vd.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,dh=vd.button`
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
`,uh=(vd.ul`
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
`),ph=vd.p`
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}};
`,hh=vd.label`
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
`,fh=vd.p`
  margin-top: 8px;
  font-size: 12.5px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  display: flex;
  align-items: center;
  gap: 6px;
`,mh=jd`
  to { transform: rotate(360deg); }
`,gh=vd.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${mh} 0.7s linear infinite;
`,xh=()=>{const e=po(),[t,r]=(0,n.useState)("fortnox"),[a,i]=(0,n.useState)(!1),[o,l]=(0,n.useState)(!1),[s,c]=(0,n.useState)(!1),[d,u]=(0,n.useState)("konsult"),[p,h]=(0,n.useState)(5);return(0,$d.jsxs)(Wp,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsx)(qp,{children:(0,$d.jsxs)(Yp,{children:[(0,$d.jsxs)(Gp,{children:[(0,$d.jsx)("span",{className:"dot"})," Steg 1 av 3 \xb7 Anslut bokf\xf6ring"]}),(0,$d.jsx)(Qp,{children:"Koppla din bokf\xf6ring"}),(0,$d.jsx)(Jp,{children:"60 sekunders koppling via Fortnox eller Visma \u2014 och du kan st\xe4nga av den lika snabbt."}),(0,$d.jsxs)(Xp,{children:[(0,$d.jsxs)(Zp,{$allow:!0,children:[(0,$d.jsxs)("span",{className:"head",children:[(0,$d.jsx)("div",{className:"dot",children:"\u2713"})," Vi l\xe4ser"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Leverant\xf6rsfakturor (konton 4xxx\u20137xxx)"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Avtalskategorier & f\xf6rfallodatum"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.4})," Belopp & betalningshistorik"]})]})]}),(0,$d.jsxs)(Zp,{children:[(0,$d.jsxs)("span",{className:"head",children:[(0,$d.jsx)("div",{className:"dot",children:"\u2717"})," Vi l\xe4ser inte"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," Kundfakturor & int\xe4kter"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," L\xf6nedata & personnummer"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"lock",size:14,stroke:2})," Bankkonton & kassafl\xf6de"]})]})]})]}),(0,$d.jsxs)(th,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"V\xe5rt l\xf6fte \u2014 hittar vi inga \xf6verpriser p\xe5 30 dagar?"}),(0,$d.jsx)("span",{children:"D\xe5 \xe4r ditt bolag redan optimerat. Vi raderar Fortnox-kopplingen och all din data automatiskt \u2014 du har inte betalat en krona."})]})]}),(0,$d.jsxs)(ih,{children:[(0,$d.jsx)(oh,{children:"Ber\xe4tta lite om bolaget"}),(0,$d.jsxs)(lh,{children:[(0,$d.jsxs)(sh,{children:[(0,$d.jsx)("span",{className:"label",children:"Bransch"}),(0,$d.jsxs)("select",{value:d,onChange:e=>u(e.target.value),children:[(0,$d.jsx)("option",{value:"ehandel",children:"E-handel & Detaljhandel"}),(0,$d.jsx)("option",{value:"tillverkning",children:"Industri & Tillverkning"}),(0,$d.jsx)("option",{value:"it-tech",children:"IT, Tech & Mjukvara"}),(0,$d.jsx)("option",{value:"bygg",children:"Bygg, Hantverk & Fastighet"}),(0,$d.jsx)("option",{value:"hotell",children:"Hotell, Restaurang & Event"}),(0,$d.jsx)("option",{value:"konsult",children:"Konsult & F\xf6retagstj\xe4nster"}),(0,$d.jsx)("option",{value:"transport",children:"Transport & Logistik"}),(0,$d.jsx)("option",{value:"vard",children:"V\xe5rd, Omsorg & H\xe4lsa"}),(0,$d.jsx)("option",{value:"ovrigt",children:"\xd6vrigt / Annan bransch"})]})]}),(0,$d.jsxs)(sh,{children:[(0,$d.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$d.jsx)("input",{type:"number",min:"1",max:"5000",value:p,onChange:e=>h(Number(e.target.value))})]})]})]}),(0,$d.jsxs)(ch,{children:[(0,$d.jsxs)(dh,{$active:"fortnox"===t,onClick:()=>r("fortnox"),children:[(0,$d.jsx)("span",{className:"badge",children:"Vanligast"}),(0,$d.jsx)(bu,{name:"fortnox",size:22,color:"#0F5132"}),(0,$d.jsx)("strong",{children:"Fortnox"}),(0,$d.jsx)("span",{children:"Direkt OAuth-koppling"})]}),(0,$d.jsxs)(dh,{$active:"visma"===t,onClick:()=>r("visma"),children:[(0,$d.jsx)(bu,{name:"fortnox",size:22,color:"#0F5132"}),(0,$d.jsx)("strong",{children:"Visma eEkonomi"}),(0,$d.jsx)("span",{children:"Direkt OAuth-koppling"})]})]}),(0,$d.jsxs)(nh,{children:[(0,$d.jsxs)(ah,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"bankid",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"BankID"}),(0,$d.jsx)("span",{children:"S\xe4ker identifiering"})]}),(0,$d.jsxs)(ah,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"shield",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"GDPR"}),(0,$d.jsx)("span",{children:"Fullt regelefterlevnad"})]}),(0,$d.jsxs)(ah,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"lock",size:16,stroke:2})}),(0,$d.jsx)("strong",{children:"AES-256"}),(0,$d.jsx)("span",{children:"Krypterad i vila & i transport"})]}),(0,$d.jsxs)(ah,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.2})}),(0,$d.jsx)("strong",{children:"Sverige"}),(0,$d.jsx)("span",{children:"Data hos Bahnhof, Stockholm"})]})]}),(0,$d.jsxs)(rh,{children:[(0,$d.jsx)("div",{className:"live"}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("strong",{children:"1 247"})," leverant\xf6rsfakturor analyserade denna vecka"]})]}),(0,$d.jsxs)(hh,{$error:s&&!o,children:[(0,$d.jsx)("input",{type:"checkbox",checked:o,onChange:e=>{l(e.target.checked),e.target.checked&&c(!1)},"aria-describedby":"consent-text"}),(0,$d.jsxs)("span",{className:"text",id:"consent-text",children:["Jag accepterar ",(0,$d.jsx)(vl,{to:"/villkor",children:"de allm\xe4nna villkoren"})," och"," ",(0,$d.jsx)(vl,{to:"/integritet",children:"integritetspolicyn"})," och bekr\xe4ftar att jag har beh\xf6righet att utf\xe4rda fullmakt f\xf6r f\xf6retaget."]})]}),s&&!o&&(0,$d.jsxs)(fh,{children:[(0,$d.jsx)(bu,{name:"lock",size:12,stroke:2.4}),"Du m\xe5ste godk\xe4nna villkoren innan du g\xe5r vidare."]}),(0,$d.jsxs)(uh,{children:[(0,$d.jsx)(Id,{$variant:"gradient",$size:"lg",onClick:()=>{if(o){if("fortnox"===t){const e=new URLSearchParams({industry:d,employees:String(p)});return void(window.location.href=`/api/fortnox/auth?${e}`)}i(!0),setTimeout(()=>e("/scanning"),900)}else c(!0)},disabled:a,$full:!0,children:a?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(gh,{})," Ansluter till ","fortnox"===t?"Fortnox":"Visma","\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Anslut ","fortnox"===t?"Fortnox":"Visma"," ",(0,$d.jsx)(bu,{name:"arrow",size:18})]})}),(0,$d.jsxs)(eh,{children:[(0,$d.jsx)(bu,{name:"lock",size:12,stroke:2.2}),"Du skickas nu till ","fortnox"===t?"Fortnox":"Visma"," f\xf6r att godk\xe4nna l\xe4s\xe5tkomst. Inga \xe4ndringar g\xf6rs i din bokf\xf6ring."]}),(0,$d.jsx)(Id,{$variant:"ghost",$size:"md",onClick:()=>e("/"),children:"Tillbaka"})]}),(0,$d.jsxs)(ph,{children:["L\xe4s ",(0,$d.jsx)(vl,{to:"/villkor",style:{textDecoration:"underline"},children:"allm\xe4nna villkoren"}),", v\xe5r ",(0,$d.jsx)(vl,{to:"/integritet",style:{textDecoration:"underline"},children:"integritetspolicy"})," ","och ",(0,$d.jsx)(vl,{to:"/cookies",style:{textDecoration:"underline"},children:"cookie-policy"}),"."]})]})})]})},vh=jd`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`,bh=jd`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.06); opacity: 1; }
`,yh=jd`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`,kh=jd`
  0% { stroke-dashoffset: 380; }
  100% { stroke-dashoffset: 0; }
`,jh=vd.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 50% 20%, ${e=>{let{theme:t}=e;return t.color.brandSoft}}, transparent 55%),
    ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
`,wh=vd.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
`,Sh=vd.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin-bottom: 44px;
`,$h=vd.svg`
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
    animation: ${kh} 6s ease-in-out forwards;
    transform: rotate(-90deg);
    transform-origin: center;
  }
`,zh=vd.div`
  position: absolute;
  inset: 0;
  animation: ${yh} 4s linear infinite;
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
`,Eh=vd.div`
  position: absolute;
  inset: 32px;
  border-radius: 50%;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  animation: ${bh} 2.4s ease-in-out infinite;

  span {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 38px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    font-feature-settings: "tnum";
  }
`,_h=vd.h1`
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.02em;
  line-height: 1.1;
  max-width: 640px;
`,Nh=vd.p`
  margin-top: 14px;
  font-size: 16px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 520px;
`,Ah=vd.ul`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 460px;
`,Ch=vd.li`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t,$state:r,$type:n}=e;return"pending"===r?"transparent":"skip"===n?t.color.surfaceSunken:t.color.surface}};
  border: 1px solid ${e=>{let{theme:t,$state:r,$type:n}=e;return"pending"===r?"transparent":t.color.borderStrong}};
  text-align: left;
  animation: ${vh} 0.4s ease both;
  opacity: ${e=>{let{$state:t}=e;return"pending"===t?.55:1}};
  transition: opacity ${e=>{let{theme:t}=e;return t.motion.base}},
              background ${e=>{let{theme:t}=e;return t.motion.base}};

  div.idx {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${e=>{let{theme:t,$state:r,$type:n}=e;return"skip"===n?"pending"===r?t.color.surfaceAlt:t.color.muted:"done"===r?t.color.brand:"active"===r?t.color.brandSoft:t.color.surfaceAlt}};
    color: ${e=>{let{theme:t,$state:r,$type:n}=e;return"skip"===n?"#FFFFFF":"done"===r?"#FAFAF7":t.color.muted}};
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
    color: ${e=>{let{theme:t,$state:r,$type:n}=e;return"skip"===n||"pending"===r?t.color.muted:t.color.ink}};
    font-style: ${e=>{let{$type:t}=e;return"skip"===t?"italic":"normal"}};
  }
  div.detail {
    font-size: 12.5px;
    color: ${e=>{let{theme:t,$type:r}=e;return"skip"===r?t.color.mutedSoft:t.color.muted}};
    font-feature-settings: "tnum";
    font-weight: ${e=>{let{$type:t}=e;return"skip"===t?500:400}};
    text-transform: ${e=>{let{$type:t}=e;return"skip"===t?"uppercase":"none"}};
    letter-spacing: ${e=>{let{$type:t}=e;return"skip"===t?"0.06em":"0"}};
    font-size: ${e=>{let{$type:t}=e;return"skip"===t?"11px":"12.5px"}};
  }
`,Fh=[{type:"read",label:"L\xe4ser leverant\xf6rsfakturor fr\xe5n Fortnox",target:412},{type:"skip",label:"Hoppar \xf6ver kundfakturor & int\xe4kter"},{type:"read",label:"Identifierar leverant\xf6rer & avtalstyper",target:38},{type:"skip",label:"Hoppar \xf6ver l\xf6nedata & personnummer"},{type:"read",label:"J\xe4mf\xf6r mot branschindex (50 000+ SMB)",target:8},{type:"skip",label:"Hoppar \xf6ver bankkonton & kassafl\xf6de"},{type:"read",label:"Sammanst\xe4ller dina besparingsm\xf6jligheter",target:8}],Th=900,Ph=600,Dh=()=>{const e=po(),[t,r]=(0,n.useState)(0),[a,i]=(0,n.useState)(0),[o,l]=(0,n.useState)(()=>Fh.map(()=>0));return(0,n.useEffect)(()=>{const e=Ph+Th*Fh.length-600,t=performance.now();let n;const a=i=>{const o=Math.min(1,(i-t)/e),l=1-Math.pow(1-o,3);r(Math.round(187340*l)),o<1&&(n=requestAnimationFrame(a))};return n=requestAnimationFrame(a),()=>cancelAnimationFrame(n)},[]),(0,n.useEffect)(()=>{const t=[];return Fh.forEach((e,r)=>{t.push(setTimeout(()=>i(r+1),Ph+r*Th)),"read"===e.type&&e.target&&t.push(setTimeout(()=>{l(t=>{const n=[...t];return n[r]=e.target,n})},1e3+r*Th))}),t.push(setTimeout(()=>{try{sessionStorage.setItem("arvo:scanCompleted","1")}catch(vw){}e("/insights")},Ph+Th*Fh.length+400)),()=>t.forEach(clearTimeout)},[e]),(0,$d.jsxs)(jh,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(wh,{children:[(0,$d.jsxs)(Sh,{children:[(0,$d.jsxs)($h,{viewBox:"0 0 220 220",children:[(0,$d.jsx)("circle",{className:"track",cx:"110",cy:"110",r:"100"}),(0,$d.jsx)("circle",{className:"progress",cx:"110",cy:"110",r:"100"})]}),(0,$d.jsx)(zh,{}),(0,$d.jsx)(Eh,{children:(0,$d.jsx)("span",{children:t.toLocaleString("sv-SE")})})]}),(0,$d.jsx)(_h,{children:"Vi skannar din bokf\xf6ring just nu\u2026"}),(0,$d.jsx)(Nh,{children:"Arvo Flow analyserar bara dina leverant\xf6rsfakturor \u2014 ingenting annat. Du ser exakt vad vi r\xf6r och vad vi g\xe5r f\xf6rbi."}),(0,$d.jsx)(Ah,{children:Fh.map((e,t)=>{const r=t<a?"done":t===a?"active":"pending";return(0,$d.jsxs)(Ch,{$state:r,$type:e.type,children:[(0,$d.jsx)("div",{className:"idx",children:"skip"===e.type?(0,$d.jsx)(bu,{name:"lock",size:12,stroke:2.4,color:"#FFFFFF"}):"done"===r?(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.5}):Math.floor(t/2)+1}),(0,$d.jsx)("div",{className:"label",children:e.label}),(0,$d.jsx)("div",{className:"detail",children:"skip"===e.type?"pending"===r?"":"Skyddat":o[t]>0?o[t].toLocaleString("sv-SE"):""})]},t)})})]})]})},Lh=jd`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,Rh=jd`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`,Oh=jd`
  0% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
`,Ih=jd`
  0% { opacity: 0; transform: translateY(4px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
`,Mh=vd.div`
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
  animation: ${Oh} 0.5s ease forwards 3.8s;

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
    animation: ${Ih} 1s ease-in-out forwards;
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
    animation: ${Rh} 1.4s ease-in-out infinite;
  }
  ul.skeletonRows li:nth-child(1) { width: 100%; }
  ul.skeletonRows li:nth-child(2) { width: 88%; }
  ul.skeletonRows li:nth-child(3) { width: 76%; }
  ul.skeletonRows li:nth-child(4) { width: 92%; }
`,Bh=vd.main`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,Vh=vd.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.container}};
  margin: 0 auto;
  padding: 40px 28px 80px;
  @media (max-width: 740px) { padding: 24px 18px 60px; }
`,Uh=vd.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  animation: ${Lh} 0.5s ease both;

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
`,Kh=vd.section`
  margin-top: 32px;
  background: ${e=>{let{theme:t}=e;return t.color.ink}};
  color: #FAFAF7;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.xl}};
  padding: 48px 40px;
  position: relative;
  overflow: hidden;
  animation: ${Lh} 0.6s 0.05s ease both;
  @media (max-width: 740px) { padding: 32px 24px; }

  &::before {
    content: '';
    position: absolute;
    top: -30%; right: -10%;
    width: 60%; height: 180%;
    background: radial-gradient(circle, rgba(93, 214, 202, 0.22), transparent 60%);
    pointer-events: none;
  }
`,Hh=vd.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: end;
  @media (max-width: 740px) { grid-template-columns: 1fr; gap: 24px; }
`,Wh=vd.div`
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
`,qh=(vd.dl`
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
`,vd.section`
  margin-top: 56px;
  animation: ${Lh} 0.6s 0.15s ease both;

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
`),Yh=vd.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`,Gh=vd.button`
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
`,Qh=vd.div`
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
    background: ${e=>{let{theme:t,$high:r}=e;return r?t.color.brandSoft:t.color.warningSoft}};
    color: ${e=>{let{theme:t,$high:r}=e;return r?t.color.brand:t.color.warning}};
  }
`,Jh=vd.div`
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
`,Xh=vd.div`
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
`,Zh=vd.span`
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
`,ef=vd.div`
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
`,tf=vd.div`
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
`,rf=vd.button`
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
`,nf=vd.div`
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
`,af=vd.div`
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
`,of=vd.div`
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
`,lf=vd.div`
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
`,sf=jd`
  0% { transform: translate3d(0, -40px, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate3d(var(--drift, 0px), 480px, 0) rotate(var(--spin, 720deg)); opacity: 0; }
`,cf=vd.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`,df=vd.span`
  position: absolute;
  top: 0;
  left: ${e=>{let{$x:t}=e;return t}}%;
  width: ${e=>{let{$size:t}=e;return t}}px;
  height: ${e=>{let{$size:t}=e;return.4*t}}px;
  background: ${e=>{let{$color:t}=e;return t}};
  border-radius: 1px;
  --drift: ${e=>{let{$drift:t}=e;return t}}px;
  --spin: ${e=>{let{$spin:t}=e;return t}}deg;
  animation: ${sf} ${e=>{let{$dur:t}=e;return t}}s cubic-bezier(0.2, 0.6, 0.4, 1) ${e=>{let{$delay:t}=e;return t}}s forwards;
`,uf=vd.div`
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
`,pf=vd.div`
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
`,hf=vd.div`
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
`,ff=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px;
`,mf=vd.ol`
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
`,gf=vd.li`
  position: relative;
  padding: 12px 0 12px 24px;

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 18px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: ${e=>{let{theme:t,$state:r}=e;return"completed"===r?t.color.brand:t.color.surface}};
    border: 2px solid ${e=>{let{theme:t,$state:r}=e;return"completed"===r||"current"===r?t.color.brand:t.color.border}};
    box-shadow: ${e=>{let{theme:t,$state:r}=e;return"current"===r?`0 0 0 5px ${t.color.brandSoft}`:"none"}};
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
`,xf=["#5DD6CA","#1B7A6E","#C8804A","#F5D598","#1B6E66"],vf=[{id:"all",label:"Alla"},{id:"high",label:"H\xf6g s\xe4kerhet"},{id:"urgent",label:"Br\xe5dskande"}],bf=()=>{const e=po(),[t,r]=(0,n.useState)("all"),[a,i]=(0,n.useState)(0),[o,l]=(0,n.useState)(()=>{try{return"1"!==sessionStorage.getItem("arvo:scanCompleted")}catch(vw){return!1}}),[s,c]=(0,n.useState)(0);(0,n.useEffect)(()=>{if(!o)return;const e=[setTimeout(()=>c(1),1e3),setTimeout(()=>c(2),2e3),setTimeout(()=>c(3),3e3)],t=setTimeout(()=>{l(!1);try{sessionStorage.setItem("arvo:scanCompleted","1")}catch(vw){}},4200);return()=>{e.forEach(clearTimeout),clearTimeout(t)}},[o]);(0,n.useEffect)(()=>{if(o)return;const e=Fu.activeNet,t=performance.now();let r;const n=a=>{const o=Math.min(1,(a-t)/1400),l=1-Math.pow(1-o,3);i(Math.round(l*e)),o<1&&(r=requestAnimationFrame(n))};return r=requestAnimationFrame(n),()=>cancelAnimationFrame(r)},[o]);const[d,u]=(0,n.useState)(null),[p,h]=(0,n.useState)("idle"),[f,m]=(0,n.useState)([]),g=(0,n.useMemo)(()=>"high"===t?Su.filter(e=>"high"===e.confidence):"urgent"===t?Su.filter(e=>e.contractEndsIn<60):Su,[t]),x=g.filter(e=>!e.licensePending),v=g.filter(e=>e.licensePending),b=Nu(x),y=v.reduce((e,t)=>e+t.savingPerYear,0),k=()=>{u(null),h("idle"),m([])};return(0,$d.jsxs)(Bh,{children:[o&&(0,$d.jsxs)(Mh,{children:[(0,$d.jsx)("div",{className:"spinner"}),(0,$d.jsx)("h2",{children:"Analyserar din leverant\xf6rsdata"}),(0,$d.jsx)("div",{className:"lineTrack",children:(0,$d.jsx)("p",{children:["H\xe4mtar data via krypterad anslutning\u2026","Skannar 412 leverant\xf6rsfakturor fr\xe5n senaste 12 m\xe5naderna\u2026","J\xe4mf\xf6r avtal mot branschindex (50 000+ SMB)\u2026","Identifierar \xf6verbetalningar\u2026"][s]},s)}),(0,$d.jsxs)("ul",{className:"skeletonRows",children:[(0,$d.jsx)("li",{}),(0,$d.jsx)("li",{}),(0,$d.jsx)("li",{}),(0,$d.jsx)("li",{})]})]}),(0,$d.jsx)(du,{variant:"app"}),(0,$d.jsxs)(Vh,{children:[(0,$d.jsxs)(Uh,{children:[(0,$d.jsxs)("div",{className:"left",children:[(0,$d.jsxs)("small",{children:[yu," \xb7 Org ",ku]}),(0,$d.jsx)("h1",{children:"God morgon, Johan."})]}),(0,$d.jsx)("div",{className:"right",children:(0,$d.jsx)("span",{className:"live",children:"Scanning klar 09:14"})})]}),(0,$d.jsx)(Kh,{children:(0,$d.jsxs)(Hh,{children:[(0,$d.jsxs)(Wh,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Din nettobesparing \xe5r 1"}),(0,$d.jsxs)("div",{className:"amount tabular",children:[(0,$d.jsx)("em",{children:Math.round(.8*a).toLocaleString("sv-SE")}),(0,$d.jsx)("span",{className:"unit",children:"kr"})]}),(0,$d.jsxs)("p",{className:"netMath",children:["Bruttobesparing ",Fu.activeGross.toLocaleString("sv-SE")," kr",(0,$d.jsx)("span",{className:"dash",children:" \u2212 "}),"Arvos besparingsarvode ",Fu.activeFee.toLocaleString("sv-SE")," kr (20 %)"]}),(0,$d.jsxs)("p",{children:["Vi gick igenom ",ju," leverant\xf6rsfakturor fr\xe5n"," ",wu," olika leverant\xf6rer det senaste \xe5ret och hittade"," ",Su.length," tydliga bytesm\xf6jligheter. F\xf6rs\xe4kring (2 m\xf6jligheter) kan inte aktiveras \xe4n \u2014 vi v\xe4ntar p\xe5 FI-godk\xe4nnande och tar ingen avgift f\xf6r dem."]})]}),(0,$d.jsxs)(hf,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsxs)("span",{className:"lbl",children:["Redo nu \u2014 netto ",(0,$d.jsx)("em",{className:"live",children:"Live"})]}),(0,$d.jsxs)("div",{className:"value",children:[b.toLocaleString("sv-SE"),(0,$d.jsxs)("small",{children:["kr \xb7 ",x.length," m\xf6jligheter"]})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsxs)("span",{className:"lbl",children:["Estimerad \xf6verbetalning ",(0,$d.jsx)("em",{className:"beta",children:"V\xe4ntar p\xe5 FI"})]}),(0,$d.jsxs)("div",{className:"value",children:["~",y.toLocaleString("sv-SE"),(0,$d.jsxs)("small",{children:["kr \xb7 ",v.length," m\xf6jligheter"]})]})]})]})]})}),(0,$d.jsxs)(qh,{children:[(0,$d.jsxs)("header",{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h2",{children:"Dina besparingsm\xf6jligheter"}),(0,$d.jsx)("p",{children:"Sorterade efter besparing per \xe5r. Klicka f\xf6r detaljer + signera bytet."})]}),(0,$d.jsx)("div",{className:"filters",children:vf.map(e=>(0,$d.jsx)("button",{className:t===e.id?"active":"",onClick:()=>r(e.id),children:e.label},e.id))})]}),(0,$d.jsxs)(tf,{children:[(0,$d.jsx)("h3",{children:"Redo att aktiveras idag"}),(0,$d.jsx)("span",{className:"badge",children:"Live \xb7 netto efter Arvos avgift"}),(0,$d.jsxs)("span",{className:"subtle",children:[x.length," m\xf6jligheter \xb7 ",b.toLocaleString("sv-SE")," kr/\xe5r"]})]}),(0,$d.jsx)(Yh,{children:x.map(t=>(0,$d.jsxs)(Gh,{onClick:()=>e(`/opportunity/${t.id}`),children:[(0,$d.jsxs)(Qh,{$high:"high"===t.confidence,children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:t.icon,size:22})}),(0,$d.jsxs)("div",{className:"text",children:[(0,$d.jsx)("span",{className:"cat",children:t.category}),(0,$d.jsx)("strong",{children:t.suggestedSupplier})]}),(0,$d.jsx)("span",{className:"confidence",children:"high"===t.confidence?"H\xf6g":"Medel"})]}),(0,$d.jsxs)(Jh,{children:[(0,$d.jsxs)("div",{className:"amount",children:["+",Eu(t).toLocaleString("sv-SE")," kr"]}),(0,$d.jsxs)("div",{className:"unit",children:["netto \xe5r 1 efter Arvos avgift \xb7 ",Math.round(Eu(t)/t.currentAnnualCost*100)," % l\xe4gre kostnad"]})]}),(0,$d.jsxs)(ef,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{children:"Idag"}),(0,$d.jsx)("strong",{children:zu(t.currentAnnualCost)})]}),(0,$d.jsx)(bu,{name:"arrow",size:18}),(0,$d.jsxs)("div",{className:"right",children:[(0,$d.jsx)("span",{children:"Med Arvo"}),(0,$d.jsx)("strong",{children:zu(t.suggestedAnnualCost)})]})]}),(0,$d.jsxs)(Xh,{children:[(0,$d.jsx)("div",{className:"delta",children:0===t.contractEndsIn?(0,$d.jsxs)($d.Fragment,{children:["Avtalet kan s\xe4gas upp ",(0,$d.jsx)("span",{children:"nu"})]}):(0,$d.jsxs)($d.Fragment,{children:["Avtal l\xf6per i ",(0,$d.jsxs)("span",{children:[t.contractEndsIn," dgr"]})]})}),(0,$d.jsxs)("div",{className:"cta",children:["Granska bytet ",(0,$d.jsx)(bu,{name:"arrow",size:14,stroke:2.4,color:"#FFFFFF"})]})]}),(0,$d.jsxs)(Zh,{children:[(0,$d.jsx)(bu,{name:"check",size:12,stroke:2}),(0,$d.jsxs)("span",{onClick:e=>e.stopPropagation(),children:["Hur r\xe4knas detta? ",(0,$d.jsx)(vl,{to:"/bias",children:"Bias-policy"})]})]})]},t.id))}),v.length>0&&(0,$d.jsxs)("div",{style:{marginTop:48},children:[(0,$d.jsxs)(tf,{children:[(0,$d.jsx)("h3",{children:"Snart tillg\xe4ngligt"}),(0,$d.jsx)("span",{className:"badge warning",children:"Beta \xb7 V\xe4ntar p\xe5 FI"}),(0,$d.jsxs)("span",{className:"subtle",children:[v.length," m\xf6jligheter \xb7 ~",y.toLocaleString("sv-SE")," kr/\xe5r estimerad \xf6verbetalning"]})]}),(0,$d.jsx)(Yh,{children:v.map(e=>(0,$d.jsxs)(rf,{onClick:()=>(u(e),h("idle"),void m([])),children:[(0,$d.jsxs)(nf,{children:[(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:e.icon,size:22})}),(0,$d.jsxs)("div",{className:"text",children:[(0,$d.jsx)("span",{className:"cat",children:e.category}),(0,$d.jsx)("strong",{children:e.currentSupplier})]}),(0,$d.jsx)("span",{className:"beta",children:"Beta"})]}),(0,$d.jsxs)(af,{children:[(0,$d.jsxs)("div",{className:"amount",children:["~",(0,$d.jsx)("em",{children:e.savingPerYear.toLocaleString("sv-SE")})," kr"]}),(0,$d.jsxs)("div",{className:"unit",children:["estimerad \xf6verbetalning \xb7 ",(0,$d.jsxs)("strong",{children:[e.overpaymentPercent," % \xf6ver branschsnittet"]})]})]}),(0,$d.jsxs)(of,{children:[(0,$d.jsx)(bu,{name:"lock",size:16,stroke:2}),(0,$d.jsx)("span",{children:"Vi v\xe4ntar p\xe5 godk\xe4nnande fr\xe5n Finansinspektionen f\xf6r att f\xe5 byta din f\xf6rs\xe4kring \xe5t dig. Estimat baserat p\xe5 din premie + branschindex."})]}),(0,$d.jsxs)(lf,{children:[(0,$d.jsx)("div",{className:"delta",children:"Lansering Q4 2026"}),(0,$d.jsxs)("div",{className:"cta",children:["Prioritera mitt bolag ",(0,$d.jsx)(bu,{name:"arrow",size:14})]})]}),(0,$d.jsxs)(Zh,{children:[(0,$d.jsx)(bu,{name:"check",size:12,stroke:2}),(0,$d.jsxs)("span",{onClick:e=>e.stopPropagation(),children:["Hur r\xe4knas detta? ",(0,$d.jsx)(vl,{to:"/bias",children:"Bias-policy"})]})]})]},e.id))})]})]}),(0,$d.jsxs)(qh,{children:[(0,$d.jsx)("header",{children:(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h2",{children:"Din resa med Arvo"}),(0,$d.jsx)("p",{children:"S\xe5 h\xe4r ser tidslinjen ut \u2014 vi f\xf6ljer upp varje vecka och rapporterar."})]})}),(0,$d.jsx)(ff,{children:(0,$d.jsx)(mf,{children:$u.map((e,t)=>(0,$d.jsxs)(gf,{$state:e.status,children:[(0,$d.jsx)("div",{className:"label",children:e.label}),(0,$d.jsx)("div",{className:"detail",children:e.detail}),(0,$d.jsxs)("div",{className:"week",children:["v ",e.week]})]},t))})})]})]}),d&&(0,$d.jsx)(uf,{onClick:e=>{e.target===e.currentTarget&&k()},children:(0,$d.jsxs)(pf,{children:["confirmed"===p&&(0,$d.jsx)(cf,{children:f.map(e=>(0,$d.jsx)(df,{$x:e.x,$size:e.size,$drift:e.drift,$spin:e.spin,$dur:e.dur,$delay:e.delay,$color:e.color},e.id))}),"idle"===p?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{className:"crown",children:(0,$d.jsx)(bu,{name:"spark",size:28,stroke:2})}),(0,$d.jsx)("span",{className:"tag",children:"Beta \xb7 VIP-k\xf6"}),(0,$d.jsxs)("h3",{children:["Vi byter din ",d.category.toLowerCase()," n\xe4r FI \xe4r klart."]}),(0,$d.jsxs)("p",{children:["Din nuvarande premie hos ",d.currentSupplier," ligger",(0,$d.jsxs)("strong",{children:[" ",d.overpaymentPercent," % \xf6ver branschsnittet"]})," \u2014 en estimerad \xf6verbetalning p\xe5 cirka ",(0,$d.jsxs)("strong",{children:[d.savingPerYear.toLocaleString("sv-SE")," kr/\xe5r"]}),". Vi f\xe5r inte teckna det nya avtalet \xe5t dig f\xf6rr\xe4n vi \xe4r registrerade f\xf6rs\xe4kringsf\xf6rmedlare hos Finansinspektionen (FI)."]}),(0,$d.jsxs)("ul",{className:"benefits",children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.2})," Din plats i k\xf6n reserveras med Fortnox-data redan analyserad"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.2})," Du f\xe5r mejl n\xe4r vi g\xe5r live \u2014 bytet utf\xf6rs samma dag"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.2})," Garanterad placering f\xf6re \xf6ppen lansering"]})]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsx)(Id,{onClick:()=>{h("confirmed"),m(Array.from({length:36}).map((e,t)=>({id:t,x:100*Math.random(),size:6+8*Math.random(),drift:240*(Math.random()-.5),spin:360+540*Math.random()*(Math.random()>.5?1:-1),dur:1.4+1*Math.random(),delay:.25*Math.random(),color:xf[t%xf.length]})))},$variant:"gradient",$size:"lg",$full:!0,children:"Prioritera mitt bolag"}),(0,$d.jsx)(Id,{onClick:k,$variant:"ghost",$size:"md",$full:!0,children:"St\xe4ng"})]})]}):(0,$d.jsxs)("div",{className:"confirmed",children:[(0,$d.jsx)("div",{className:"checkmark",children:(0,$d.jsx)(bu,{name:"check",size:36,stroke:2.5})}),(0,$d.jsx)("h3",{children:"Du st\xe5r f\xf6rst i k\xf6n."}),(0,$d.jsx)("p",{children:"Vi h\xf6r av oss direkt n\xe4r vi aktiverar f\xf6rs\xe4kringsbyten \u2014 d\xe5 f\xe5r du mellanskillnaden tillbaka utan att lyfta ett finger. Tills dess forts\xe4tter vi optimera dina \xf6vriga leverant\xf6rsavtal."}),(0,$d.jsx)("div",{style:{marginTop:24},children:(0,$d.jsx)(Id,{onClick:k,$variant:"gradient",$size:"md",$full:!0,children:"Tillbaka till insikter"})})]})]})}),(0,$d.jsx)(xu,{})]})},yf=jd`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`,kf=jd`
  0%, 100% { box-shadow: 0 0 0 0 rgba(15, 81, 50, 0.5); }
  50% { box-shadow: 0 0 0 14px rgba(15, 81, 50, 0); }
`,jf=vd.main`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,wf=vd.div`
  max-width: ${e=>{let{theme:t}=e;return t.size.containerNarrow}};
  margin: 0 auto;
  padding: 32px 28px 80px;
  @media (max-width: 740px) { padding: 20px 18px 60px; }
`,Sf=vd.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin-bottom: 24px;
  transition: color ${e=>{let{theme:t}=e;return t.motion.fast}};
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`,$f=vd.header`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;
  padding-bottom: 24px;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  animation: ${yf} 0.5s ease both;

  @media (max-width: 740px) { grid-template-columns: 1fr; }
`,zf=vd.div`
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
`,Ef=vd.aside`
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
`,_f=vd.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 28px;
  align-items: start;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`,Nf=vd.section`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px;
  animation: ${yf} 0.5s 0.1s ease both;
  & + & { margin-top: 16px; }

  h3 {
    font-size: 19px;
    line-height: 1.3;
  }
  h3 + p { margin-top: 8px; font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; line-height: 1.55; }
`,Af=vd.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 90px;
  @media (max-width: 860px) { position: static; }
`,Cf=vd.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`,Ff=vd.div`
  border: 1px solid ${e=>{let{theme:t,$best:r}=e;return r?t.color.brand:t.color.border}};
  background: ${e=>{let{theme:t,$best:r}=e;return r?t.color.brandSoft:t.color.surface}};
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
`,Tf=vd.div`
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
`,Pf=vd.div`
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
`,Df=vd.div`
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
`,Lf=vd.ul`
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
`,Rf=vd.ol`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`,Of=vd.li`
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
`,If=vd(Nf)`
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
`,Mf=vd.dl`
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
`,Bf=vd.div`
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
`,Vf=vd.div`
  position: relative;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Uf=vd.button`
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
  animation: ${kf} 2.4s ease-in-out infinite;
  transition: transform ${e=>{let{theme:t}=e;return t.motion.fast}}, box-shadow ${e=>{let{theme:t}=e;return t.motion.fast}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.brand}};
  &:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(27, 122, 110, 0.36); }
`,Kf=vd.p`
  position: relative;
  font-size: 12px;
  color: rgba(250, 250, 247, 0.75);
  margin-top: 8px;
  text-align: center;
`,Hf=(vd.a`
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
`,vd.div`
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
`),Wf=vd.div`
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
`,qf=vd.div`
  margin-top: 24px;
  padding: 16px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 12px;
  text-align: left;

  svg { color: ${e=>{let{theme:t}=e;return t.color.brand}}; margin-top: 2px; flex-shrink: 0; }

  strong {
    display: block;
    font-size: 14px;
    color: ${e=>{let{theme:t}=e;return t.color.brandInk}};
    font-weight: 600;
    margin-bottom: 4px;
  }
  span.body {
    font-size: 13px;
    line-height: 1.55;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  }
  span.body a {
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`,Yf=()=>{const{id:e}=ho(),t=po(),r=Su.find(t=>t.id===e),[a,i]=(0,n.useState)("idle");if(n.useEffect(()=>{r&&r.licensePending&&t("/insights",{replace:!0})},[r,t]),!r)return(0,$d.jsxs)(jf,{children:[(0,$d.jsx)(du,{variant:"app"}),(0,$d.jsxs)(wf,{children:[(0,$d.jsx)("p",{children:"M\xf6jligheten kunde inte hittas."}),(0,$d.jsx)(Id,{onClick:()=>t("/insights"),$variant:"secondary",children:"Tillbaka"})]})]});if(r.licensePending)return null;const o=r.benchmark.yourCost-r.benchmark.industryLow,l=e=>Math.max(2,Math.min(98,(e-r.benchmark.industryLow)/o*100)),s=l(r.benchmark.yourCost),c=l(r.benchmark.industryMedian),d=l(r.suggestedAnnualCost),u=Eu(r),p=_u(r);return(0,$d.jsxs)(jf,{children:[(0,$d.jsx)(du,{variant:"app"}),(0,$d.jsxs)(wf,{children:[(0,$d.jsxs)(Sf,{onClick:()=>t("/insights"),children:[(0,$d.jsx)(bu,{name:"arrow",size:14,stroke:2,style:{transform:"rotate(180deg)"}}),"Tillbaka till insikter"]}),(0,$d.jsxs)($f,{children:[(0,$d.jsxs)(zf,{children:[(0,$d.jsxs)("div",{className:"tag",children:[(0,$d.jsx)(bu,{name:r.icon,size:14,stroke:2.2}),r.category]}),(0,$d.jsxs)("h1",{children:["Byt till ",r.suggestedSupplier,".",(0,$d.jsx)("br",{}),"Spara ",zu(r.savingPerYear)," per \xe5r."]}),(0,$d.jsx)("p",{className:"lede",children:r.why})]}),(0,$d.jsxs)(Ef,{children:[(0,$d.jsx)("div",{className:"kicker",children:"Din nettobesparing \xe5r 1"}),(0,$d.jsxs)("div",{className:"amount",children:["+",u.toLocaleString("sv-SE")]}),(0,$d.jsxs)("div",{className:"unit",children:["kr \xb7 efter Arvos besparingsarvode ",p.toLocaleString("sv-SE")," kr (20 %)"]})]})]}),(0,$d.jsxs)(_f,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsxs)(Nf,{children:[(0,$d.jsx)("h3",{children:"Sida vid sida"}),(0,$d.jsx)("p",{children:"Identiskt t\xe4ckningsomf\xe5ng och serviceniv\xe5 \u2014 bara ett b\xe4ttre pris."}),(0,$d.jsxs)(Cf,{children:[(0,$d.jsxs)(Ff,{children:[(0,$d.jsx)("span",{className:"lbl",children:"Idag"}),(0,$d.jsx)("strong",{className:"name",children:r.currentSupplier}),(0,$d.jsx)("div",{className:"cost",children:zu(r.currentAnnualCost)}),(0,$d.jsx)("div",{className:"unit",children:"per \xe5r"})]}),(0,$d.jsxs)(Ff,{$best:!0,children:[(0,$d.jsx)("span",{className:"badge",children:"Rekommenderad"}),(0,$d.jsx)("span",{className:"lbl",children:"Med Arvo Flow"}),(0,$d.jsx)("strong",{className:"name",children:r.suggestedSupplier}),(0,$d.jsx)("div",{className:"cost",children:zu(r.suggestedAnnualCost)}),(0,$d.jsxs)("div",{className:"unit",children:["per \xe5r \xb7 spara ",zu(u)," netto"]})]})]}),(0,$d.jsxs)(Tf,{children:[(0,$d.jsxs)("div",{className:"hero",children:[(0,$d.jsx)("span",{className:"kicker",children:"Du betalar idag"}),(0,$d.jsxs)("strong",{className:"overpay",children:[Math.round((r.benchmark.yourCost-r.benchmark.industryMedian)/r.benchmark.industryMedian*100)," %"]}),(0,$d.jsx)("span",{className:"overpayLabel",children:"\xf6ver branschsnittet"})]}),(0,$d.jsxs)("div",{className:"track",children:[(0,$d.jsx)("div",{className:"suggested",style:{left:`${d}%`}}),(0,$d.jsx)("div",{className:"median",style:{left:`${Math.max(20,Math.min(80,c))}%`}}),(0,$d.jsx)("div",{className:"you",style:{left:`${s}%`}})]}),(0,$d.jsxs)("div",{className:"legend",children:[(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot suggested"})," Med Arvo ",zu(r.suggestedAnnualCost)]}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot median"})," Snitt ",zu(r.benchmark.industryMedian)]}),(0,$d.jsxs)("span",{children:[(0,$d.jsx)("div",{className:"dot you"})," Du ",zu(r.benchmark.yourCost)]})]})]}),(0,$d.jsxs)(Df,{children:[(0,$d.jsx)("span",{children:"Varf\xf6r Arvo rekommenderar bytet"}),(0,$d.jsx)("p",{children:r.why})]})]}),(0,$d.jsxs)(Nf,{children:[(0,$d.jsxs)("h3",{children:["Vad du f\xe5r hos ",r.suggestedSupplier]}),(0,$d.jsx)("p",{children:"Vi har verifierat att t\xe4ckning och serviceniv\xe5 motsvarar eller \xf6vertr\xe4ffar ditt nuvarande avtal."}),(0,$d.jsx)(Lf,{children:r.coverage.map(e=>(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.2})," ",e]},e))})]}),(0,$d.jsxs)(Nf,{children:[(0,$d.jsx)("h3",{children:"S\xe5 g\xe5r bytet till"}),(0,$d.jsx)("p",{children:"Arvo f\xf6rbereder allt \u2014 du signerar med BankID och vi sk\xf6ter resten."}),(0,$d.jsx)(Rf,{children:r.switchSteps.map((e,t)=>(0,$d.jsxs)(Of,{children:[(0,$d.jsx)("div",{className:"idx",children:t+1}),(0,$d.jsx)("div",{className:"text",children:e})]},t))})]})]}),(0,$d.jsx)(Af,{children:(0,$d.jsxs)(If,{children:[(0,$d.jsx)("h3",{children:"Godk\xe4nn bytet"}),(0,$d.jsxs)("p",{children:["Vi f\xf6rbereder allt och hanterar \xf6verg\xe5ngen. Du signerar med BankID och har 24 timmars \xe5ngerr\xe4tt innan vi p\xe5b\xf6rjar upps\xe4gning hos ",r.currentSupplier,"."]}),(0,$d.jsxs)(Bf,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Din nettobesparing \xe5r 1"}),(0,$d.jsx)("span",{className:"amount",children:zu(u)}),(0,$d.jsxs)("span",{className:"fineprint",children:["Bruttobesparing ",zu(r.savingPerYear)," \u2212 Arvos besparingsarvode ",zu(p)," (20 %)"]})]}),(0,$d.jsxs)(Mf,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Avtalstid kvar"}),(0,$d.jsx)("dd",{children:0===r.contractEndsIn?"Kan s\xe4gas upp nu":`${r.contractEndsIn} dagar`})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Upps\xe4gningstid"}),(0,$d.jsxs)("dd",{children:[r.cancellationNotice," dagar"]})]})]}),(0,$d.jsx)(Vf,{children:(0,$d.jsxs)(Uf,{onClick:()=>{i("signing"),setTimeout(()=>i("done"),2400)},children:[(0,$d.jsx)(bu,{name:"bankid",size:20,stroke:2,color:"#FFFFFF"}),"Godk\xe4nn byte med BankID"]})}),(0,$d.jsxs)(Kf,{children:["Vi sk\xf6ter all onboarding hos ",r.suggestedSupplier," \xe5t dig. 24h \xe5ngerr\xe4tt p\xe5 fullmakten \u2014 bytet aktiveras inte f\xf6rr\xe4n det nya avtalet \xe4r p\xe5 plats."]}),(0,$d.jsx)(Pf,{children:(0,$d.jsx)("a",{href:"#",onClick:e=>e.preventDefault(),children:"Mejla mig sammanfattningen ist\xe4llet"})})]})})]})]}),"signing"===a&&(0,$d.jsx)(Hf,{children:(0,$d.jsxs)(Wf,{children:[(0,$d.jsx)("div",{className:"bankid",children:"B"}),(0,$d.jsx)("h3",{children:"\xd6ppna BankID-appen"}),(0,$d.jsxs)("p",{children:["Bekr\xe4fta f\xf6r att godk\xe4nna bytet till ",r.suggestedSupplier,". Du beh\xf6ver bara signera en g\xe5ng \u2014 vi sk\xf6ter resten."]}),(0,$d.jsxs)("div",{className:"dots",children:[(0,$d.jsx)("span",{}),(0,$d.jsx)("span",{}),(0,$d.jsx)("span",{})]})]})}),"done"===a&&(0,$d.jsx)(Hf,{children:(0,$d.jsxs)(Wf,{children:[(0,$d.jsx)("div",{className:"success",children:(0,$d.jsx)(bu,{name:"check",size:36,stroke:2.5,color:"#1B7A6E"})}),(0,$d.jsx)("h3",{children:"Bytet \xe4r ig\xe5ngsatt."}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Du beh\xf6ver inte g\xf6ra n\xe5got mer."})," Vi f\xf6rhandlar upps\xe4gningen med ",r.currentSupplier," och tecknar det nya avtalet med ",r.suggestedSupplier," ","\xe5t dig. Du f\xe5r bekr\xe4ftelse p\xe5 mejl n\xe4r bytet \xe4r aktiverat."]}),(0,$d.jsxs)(qf,{children:[(0,$d.jsx)(bu,{name:"lock",size:16,stroke:2.2}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Du har 24 timmar att \xe5ngra."}),(0,$d.jsxs)("span",{className:"body",children:['Vi p\xe5b\xf6rjar ingen upps\xe4gning eller nytt avtal f\xf6rr\xe4n \xe5ngerfristen l\xf6pt ut. Vill du avbryta \u2014 svara "\xc5NGRA" p\xe5 bekr\xe4ftelsemejlet eller mejla'," ",(0,$d.jsx)("a",{href:"mailto:support@arvo.flow",children:"support@arvo.flow"}),". Mer i"," ",(0,$d.jsx)("a",{href:"/villkor",target:"_blank",rel:"noopener noreferrer",children:"allm\xe4nna villkoren \xa72.2"}),"."]})]})]}),(0,$d.jsx)("div",{style:{marginTop:24,display:"flex",flexDirection:"column",gap:10},children:(0,$d.jsx)(Id,{onClick:()=>{i("idle"),t("/insights")},$variant:"gradient",$size:"md",$full:!0,children:"Tillbaka till insikter"})})]})}),(0,$d.jsx)(xu,{})]})},Gf=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Qf=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,Jf=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 96px 28px 56px;
  text-align: center;
  animation: ${Gf} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 32px; }
`,Xf=vd.span`
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
`,Zf=vd.h1`
  margin-top: 22px;
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,em=vd.p`
  margin: 22px auto 0;
  max-width: 640px;
  font-size: 18px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.55;
`,tm=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 28px;
  @media (max-width: 740px) { padding: 32px 20px; }
`,rm=vd.div`
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
`,nm=(vd.div`
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
`),am=vd.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin-bottom: 12px;
`,im=vd.p`
  font-size: 16.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  max-width: 640px;
  line-height: 1.55;
  margin-bottom: 32px;
`,om=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
`,lm=vd.div`
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
`,sm=vd.section`
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
`,cm=[{cat:"F\xf6retagsf\xf6rs\xe4kring",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Elavtal",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Mobilabonnemang",detail:"Per abonnemang som flyttas",cap:"120 kr"},{cat:"F\xf6retagsbredband",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"Kortterminal",detail:"Per genomf\xf6rt byte",cap:"400 kr"},{cat:"Fakturatj\xe4nst",detail:"Per genomf\xf6rt byte",cap:"300 kr"},{cat:"Yrkesansvarsf\xf6rs\xe4kring",detail:"Per genomf\xf6rt byte",cap:"500 kr"},{cat:"F\xf6retagsleasing",detail:"Per genomf\xf6rt byte",cap:"500 kr"}],dm=()=>(0,$d.jsxs)(Qf,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(Jf,{children:[(0,$d.jsxs)(Xf,{children:[(0,$d.jsx)("span",{className:"dot"})," Rankningspolicy \xb7 Senast uppdaterad 2026-04-24"]}),(0,$d.jsxs)(Zf,{children:["Vi rankar leverant\xf6rer p\xe5 ",(0,$d.jsx)("em",{children:"din"})," totalkostnad \u2014 inte v\xe5r provision."]}),(0,$d.jsx)(em,{children:'Det h\xe4r \xe4r hela v\xe5r policy. Inga undantag, inga gr\xe5zoner, inga "premium-partners". Om en journalist en dag granskar oss vill vi att de hittar exakt det vi skrev h\xe4r.'})]}),(0,$d.jsxs)(tm,{children:[(0,$d.jsx)(am,{children:"De fyra reglerna"}),(0,$d.jsx)(nm,{children:"Hur vi f\xf6rhindrar bias fr\xe5n dag 1."}),(0,$d.jsx)(im,{children:"Affiliate-int\xe4kter \xe4r bra f\xf6r aff\xe4rsmodellen \u2014 men en uppenbar intressekonflikt mot kunden. Vi l\xf6ste det strukturellt, inte bara i marknadsf\xf6ringstexten."}),(0,$d.jsxs)(rm,{children:[(0,$d.jsx)("div",{className:"num",children:"1"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"V\xe5r algoritm \xe4r publik. Och deterministisk."}),(0,$d.jsxs)("p",{children:["Vi rankar varje f\xf6rslag p\xe5 ",(0,$d.jsx)("strong",{children:"total cost of ownership \xf6ver 24 m\xe5nader minus switching cost"}),". Den som ger dig flest kronor \xf6ver p\xe5 kontot vinner \u2014 alltid. Affiliate-storlek \xe4r inte ett ing\xe5ngsv\xe4rde i scoring-funktionen."]}),(0,$d.jsxs)("pre",{children:["score(provider) =\n    annualCost(provider) * 2\n  + switchingCost(provider)        // eng\xe5ngskostnader, etablering, portering\n  - reliabilityBonus(provider)     // SLA, supportkvalitet (publik benchmark)\n  - coverageMatch(provider)        // % av nuvarande t\xe4ckning som beh\xe5lls\n\n",(0,$d.jsx)("b",{children:"// Affiliate-rate \xe4r aldrig en variabel i scoringen.\n// L\xe4gst score vinner. Vid likast\xe5nd: l\xe4gst nominellt pris f\xf6r dig."})]})]})]}),(0,$d.jsxs)(rm,{children:[(0,$d.jsx)("div",{className:"num",children:"2"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Affiliate-int\xe4kten \xe4r kapad \u2014 \xf6verskott g\xe5r till dig."}),(0,$d.jsx)("p",{children:"Vi accepterar en fast, kapad affiliate-avgift per leverant\xf6rskategori (se tabellen nedan). Om en leverant\xf6r vill betala mer f\xf6r att vinna oftare \u2014 d\xe5 har vi inte r\xe4tten att tj\xe4na mer p\xe5 det. \xd6verskottet l\xe4ggs i en kundbonus-pool och krediteras tillbaka p\xe5 din Besparingsavgift."})]})]}),(0,$d.jsxs)(rm,{children:[(0,$d.jsx)("div",{className:"num",children:"3"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Ett erbjudande. Inga val, inga kr\xe5ngel."}),(0,$d.jsxs)("p",{children:["Vi tar ",(0,$d.jsx)("strong",{children:"20 % av identifierad besparing"})," \u2014 en eng\xe5ngsavgift som faktureras 3 m\xe5nader efter aktiverat avtal. Det \xe4r det enda du beh\xf6ver godk\xe4nna."]}),(0,$d.jsx)("p",{children:"Om affiliate-int\xe4kter fr\xe5n leverant\xf6rer \xf6verstiger de tak som anges i tabellen nedan, krediteras \xf6verskottet automatiskt tillbaka till dig \u2014 du beh\xf6ver inte v\xe4lja, beg\xe4ra eller ens h\xe5lla koll. Systemet sk\xf6ter det."})]})]}),(0,$d.jsxs)(rm,{children:[(0,$d.jsx)("div",{className:"num",children:"4"}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("h3",{children:"Vi publicerar v\xe5ra rekommendationsstatistik kvartalsvis."}),(0,$d.jsx)("p",{children:"Varje kvartal publiceras hur ofta varje leverant\xf6r rekommenderas, hur mycket affiliate som faktiskt utbetalats, och hur stor andel av besparing-poolen som rabatterats. Granska oss. Det g\xf6r branschen \xe4rligare."})]})]})]}),(0,$d.jsxs)(tm,{children:[(0,$d.jsx)(am,{children:"Affiliate-tak per kategori"}),(0,$d.jsx)(nm,{children:"Det h\xe4r \xe4r max vi f\xe5r ta \u2014 oavsett vad leverant\xf6ren vill betala."}),(0,$d.jsx)(im,{children:"Taken \xe4r satta f\xf6r att rymma normal industri-affiliate utan att skapa incitament att favorisera en viss leverant\xf6r."}),(0,$d.jsxs)(om,{children:[(0,$d.jsxs)(lm,{className:"header",children:[(0,$d.jsx)("div",{children:"Kategori"}),(0,$d.jsx)("div",{children:"M\xe4tpunkt"}),(0,$d.jsx)("div",{style:{textAlign:"right"},children:"Tak"})]}),cm.map(e=>(0,$d.jsxs)(lm,{children:[(0,$d.jsx)("div",{className:"cat",children:e.cat}),(0,$d.jsx)("div",{className:"detail",children:e.detail}),(0,$d.jsx)("div",{className:"cap",children:e.cap})]},e.cat))]})]}),(0,$d.jsxs)(sm,{children:[(0,$d.jsx)("h2",{children:"Det h\xe4r \xe4r inte marknadsf\xf6ring. Det h\xe4r \xe4r arkitektur."}),(0,$d.jsxs)("p",{children:["Om du uppt\xe4cker att vi bryter mot n\xe5gon av reglerna ovan \u2014 mejla"," ",(0,$d.jsx)("a",{href:"mailto:transparens@arvo.flow",style:{textDecoration:"underline"},children:"transparens@arvo.flow"}),". Vi svarar inom 48 h, publikt."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsxs)(Id,{as:vl,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$d.jsx)(bu,{name:"arrow",size:18})]}),(0,$d.jsx)(Id,{as:vl,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(xu,{})]}),um=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,pm=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,hm=vd.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 28px 40px;
  text-align: center;
  animation: ${um} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 28px; }
`,fm=vd.span`
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
`,mm=vd.h1`
  margin-top: 22px;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,gm=vd.p`
  margin: 22px auto 0;
  max-width: 600px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,xm=vd.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 28px 64px;
  @media (max-width: 740px) { padding: 24px 20px 48px; }
`,vm=vd.div`
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
`,bm=vd.section`
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
`,ym=(vd.div`
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
`),km=vd.section`
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
`,jm=(vd.span`
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
`),wm=vd.p`
  font-size: 15.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin-bottom: 20px;
`,Sm=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  overflow: hidden;
  margin: 16px 0 8px;
`,$m=vd.div`
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
`,zm=()=>(0,$d.jsxs)(pm,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(hm,{children:[(0,$d.jsxs)(fm,{children:[(0,$d.jsx)("span",{className:"dot"})," Allm\xe4nna villkor \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$d.jsxs)(mm,{children:["Klart, kort och ",(0,$d.jsx)("em",{children:"p\xe5 din sida"}),"."]}),(0,$d.jsx)(gm,{children:"Det h\xe4r \xe4r hela avtalet mellan dig och Arvo Flow AB. Inga fasta avgifter, inga uppstartsavgifter, ingen inl\xe5sning. Vi tj\xe4nar pengar bara n\xe4r du faktiskt sparar."})]}),(0,$d.jsxs)(xm,{children:[(0,$d.jsxs)(vm,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r beh\xf6ver du veta innan du signerar med BankID:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Ombudskap."})," Arvo Flow agerar som ditt f\xf6retags ombud f\xf6r att optimera och ing\xe5 avtal inom el, telefoni, bredband, f\xf6rs\xe4kring och leasing. Vi verifierar din beh\xf6righet mot Bolagsverket i realtid."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Besparingsarvode."})," Vi tar ingen fast avgift. V\xe5rt arvode \xe4r 20 % av besparingsunderlaget (skillnaden mellan ditt nya och ditt gamla avtal) under de f\xf6rsta 12 m\xe5naderna efter ett byte."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"\xc5ngerr\xe4tt."})," Du har 24 timmars \xe5ngerr\xe4tt fr\xe5n BankID-signering innan vi p\xe5b\xf6rjar skarpa byten hos leverant\xf6rerna."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Ingen inl\xe5sning."})," Du kan s\xe4ga upp Arvo Flow-tj\xe4nsten n\xe4r som helst med 30 dagars upps\xe4gningstid."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Datas\xe4kerhet."})," Vi l\xe4ser endast n\xf6dv\xe4ndig fakturadata via Fortnox. Vid avslut raderas din transaktionsdata inom 24 timmar."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Trygghet."})," V\xe5rt skadest\xe5ndsansvar \xe4r begr\xe4nsat till 12 m\xe5naders betalda avgifter, dock l\xe4gst 50 000 SEK."]})]})]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"1. Definitioner"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.1 Tj\xe4nsten."})," Den digitala plattformen Arvo Flow samt tillh\xf6rande ombudstj\xe4nster f\xf6r att optimera Kundens leverant\xf6rsavtal."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.2 Besparingsunderlag."})," Det belopp som ligger till grund f\xf6r Besparingsavgiften, motsvarande skillnaden i avtalskostnad exkl. moms \xf6ver en 12-m\xe5nadersperiod mellan Kundens tidigare avtal och det nya avtalet."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"1.3 Besparingsarvode."})," Det r\xf6rliga arvode om 20 % av Besparingsunderlaget som tillfaller Arvo Flow, fakturerat efter Kundens f\xf6rsta faktura fr\xe5n den nya leverant\xf6ren."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"2. Uppdraget och Fullmakt"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"2.1"})," Genom signering via BankID ger Kunden Arvo Flow fullmakt att inh\xe4mta uppgifter, s\xe4ga upp befintliga avtal samt ing\xe5 nya avtal f\xf6r Kundens r\xe4kning inom de kategorier Kunden aktiverat i Tj\xe4nsten."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"2.2 \xc5ngerfrist."})," Kunden har r\xe4tt att \xe5terkalla sin accept av dessa villkor inom 24 timmar fr\xe5n signering. Under \xe5ngerfristen p\xe5b\xf6rjar Arvo Flow inga skarpa upps\xe4gningar eller avtalstecknanden hos tredje part."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"3. Arvode och Betalning"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.1"})," Tj\xe4nsten baseras p\xe5 identifierad besparing. Inga fasta avgifter, uppstartsavgifter eller licensavgifter utg\xe5r."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.2"})," Besparingsavgiften faktureras som en eng\xe5ngsavgift, 3 m\xe5nader efter att det nya avtalet aktiverats. Fr.o.m. \xe5r 2 tillfaller hela besparingen Kunden."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"3.3 F\xf6rtida avslut av leverant\xf6rsavtal."})," Om Kunden v\xe4ljer att avsluta ett av Arvo Flow tecknat leverant\xf6rsavtal i f\xf6rtid, eller p\xe5 annat s\xe4tt f\xf6rhindrar Tj\xe4nstens utf\xf6rande, f\xf6rfaller Besparingsavgiften i sin helhet. Detta g\xe4ller ej om Kunden avbryter samarbetet p\xe5 grund av v\xe4sentligt avtalsbrott fr\xe5n Arvo Flows sida."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"4. Beh\xf6righet och Upps\xe4gning av Tj\xe4nsten"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"4.1 Firmateckningsverifiering."})," Arvo Flow verifierar via BankID-signaturens personnummer mot Bolagsverkets aktuella firmatecknarregister. Avtal ing\xe5s endast om verifieringen godk\xe4nns."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"4.2 Upps\xe4gning."})," Avtalet l\xf6per tills vidare. B\xe5da parter kan s\xe4ga upp Tj\xe4nsten med 30 dagars upps\xe4gningstid. Redan p\xe5b\xf6rjade avtalsbyten slutf\xf6rs och debiteras enligt avtal."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"5. Ansvarsbegr\xe4nsning och Risksenarier"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.1 Missad upps\xe4gning."})," Om Arvo Flow missar att s\xe4ga upp ett befintligt avtal i tid, ers\xe4tter Arvo Flow mellanskillnaden upp till vid var tid g\xe4llande ansvarstak."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.2 Dubbel-leverans."})," Om Kunden under en period har tv\xe5 parallella leverant\xf6rsavtal f\xf6r samma tj\xe4nst till f\xf6ljd av fel fr\xe5n Arvo Flow, meddelar Kunden Arvo Flow, varvid Arvo Flow krediterar framtida avgifter eller, efter Kundens \xf6nskem\xe5l, utf\xf6r \xe5terbetalning inom 30 dagar."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"5.3 Ansvarstak."})," Arvo Flows totala skadest\xe5ndsansvar \xe4r begr\xe4nsat till ett belopp motsvarande 100 % av de senaste 12 m\xe5nadernas betalda Besparingsavgifter, dock l\xe4gst 50 000 SEK. Arvo Flow ansvarar ej f\xf6r indirekta skador s\xe5som utebliven vinst, produktionsbortfall eller goodwill-skada."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"6. Force Majeure"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"6.1"})," Arvo Flow \xe4r befriat fr\xe5n p\xe5f\xf6ljd vid underl\xe5tenhet orsakad av pandemi, krig, cyberattack, myndighetsbeslut eller fel hos tredjepartsleverant\xf6r (t.ex. BankID, Fortnox, Visma eller leverant\xf6r vars system Tj\xe4nsten \xe4r beroende av) som ligger utanf\xf6r Arvo Flows kontroll."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"7. Data och Tvist"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"7.1 Personuppgifter."})," Personuppgiftsbehandling regleras i separat Personuppgiftsbitr\xe4desavtal (DPA), tillg\xe4nglig som bilaga till"," ",(0,$d.jsx)(vl,{to:"/integritet",children:"v\xe5r integritetspolicy"}),"."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"7.2 Tvist."})," Tvister med anledning av dessa villkor avg\xf6rs i Stockholms tingsr\xe4tt enligt svensk lag."]})]}),(0,$d.jsxs)(ym,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Allm\xe4nna villkor v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$d.jsx)("br",{}),"Tidigare versioner finns tillg\xe4ngliga p\xe5 beg\xe4ran fr\xe5n"," ",(0,$d.jsx)("a",{href:"mailto:juridik@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"juridik@arvo.flow"}),"."]})]}),(0,$d.jsxs)(km,{children:[(0,$d.jsx)("h2",{children:"Fr\xe5gor p\xe5 villkoren?"}),(0,$d.jsxs)("p",{children:["Mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:juridik@arvo.flow",children:"juridik@arvo.flow"})," s\xe5 svarar vi inom 48 h. Vi har en svensk aff\xe4rsjurist som granskat varje klausul."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsxs)(Id,{as:vl,to:"/connect",$variant:"primary",$size:"lg",children:["Koppla Fortnox / Visma ",(0,$d.jsx)(bu,{name:"arrow",size:18})]}),(0,$d.jsx)(Id,{as:vl,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(xu,{})]}),Em=()=>(0,$d.jsxs)(pm,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(hm,{children:[(0,$d.jsxs)(fm,{children:[(0,$d.jsx)("span",{className:"dot"})," Integritetspolicy & DPA \xb7 Version 1.4 \xb7 Senast uppdaterad 2026-05-19"]}),(0,$d.jsxs)(mm,{children:["Du ",(0,$d.jsx)("em",{children:"\xe4ger"})," din data. Vi f\xf6rvaltar den."]}),(0,$d.jsx)(gm,{children:"Vi l\xe4ser bara den fakturadata vi beh\xf6ver f\xf6r att hitta \xf6verpriser \u2014 inget annat. Vid avslut raderas allt inom 24 timmar. Det h\xe4r \xe4r hur, var och varf\xf6r."})]}),(0,$d.jsxs)(xm,{children:[(0,$d.jsxs)(vm,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller f\xf6r dig som kund hos Arvo Flow:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vi l\xe4ser endast leverant\xf6rsfakturor"})," via Fortnox eller Visma \u2014 inte kundfakturor, l\xf6ner, bankkonton eller personnummer p\xe5 anst\xe4llda."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Faktura-PDF:er lagras aldrig."})," Vi extraherar den data vi beh\xf6ver och kastar filen direkt \u2014 noll persistent lagring av PDF-inneh\xe5ll hos Arvo Flow. By design."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Data lagras i EU/EES"})," eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer (Standard Contractual Clauses). Krypterad i vila (AES-256) och i transport (TLS 1.3)."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Du kan n\xe4r som helst"})," beg\xe4ra utdrag, r\xe4ttelse eller radering av dina personuppgifter via ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vid avslut"})," raderas all transaktionsdata inom 24 timmar. Bokf\xf6ringsm\xe4ssiga underlag (fakturor p\xe5 v\xe5rt arvode) sparas i 7 \xe5r enligt bokf\xf6ringslagen."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Vi s\xe4ljer aldrig din data."})," Vi delar den heller inte med leverant\xf6rer, annons\xf6rer eller andra tredje parter \u2014 ut\xf6ver de vi \xe4r bundna till f\xf6r att leverera Tj\xe4nsten."]})]})]})]}),(0,$d.jsx)(jm,{children:"Integritetspolicy"}),(0,$d.jsx)(wm,{children:"Den h\xe4r policyn beskriver hur Arvo Flow AB behandlar personuppgifter och f\xf6retagsuppgifter i samband med att vi levererar Tj\xe4nsten."}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"1. Personuppgiftsansvarig"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"}),", org.nr 559500-0000, \xe4r personuppgiftsansvarig f\xf6r de uppgifter vi samlar in om dig som kund eller bes\xf6kare. Kontakt:"," ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$d.jsx)("p",{children:"F\xf6r personuppgifter som behandlas p\xe5 Kundens uppdrag (t.ex. namn p\xe5 Kundens kontaktpersoner och firmatecknare) \xe4r Arvo Flow personuppgiftsbitr\xe4de \u2014 se DPA l\xe4ngre ner."})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"2. Vilka uppgifter vi behandlar"}),(0,$d.jsxs)(Sm,{children:[(0,$d.jsxs)($m,{className:"header",children:[(0,$d.jsx)("div",{children:"Kategori"}),(0,$d.jsx)("div",{children:"Syfte & r\xe4ttslig grund"})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"F\xf6retagsuppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["Organisationsnummer, bolagsnamn, registreringsdatum. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Firmatecknarens uppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["Namn, personnummer (via BankID), beh\xf6righet enligt Bolagsverket. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"})," samt r\xe4ttslig f\xf6rpliktelse vid signering."]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Kontaktuppgifter"}),(0,$d.jsxs)("div",{className:"v",children:["E-post, telefon, namn p\xe5 kontaktpersoner. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r kundkommunikation, ",(0,$d.jsx)("em",{children:"samtycke"})," f\xf6r marknadsf\xf6ring."]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Leverant\xf6rsfakturor"}),(0,$d.jsxs)("div",{className:"v",children:["Belopp, leverant\xf6r, kategori, f\xf6rfallodatum, fakturarader. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"fullg\xf6rande av avtal"}),"."," ","Anonymiserade uppgifter (belopp, leverant\xf6r, kategori) anv\xe4nds \xe4ven f\xf6r att bygga Arvo Flows branschindex \u2014 se \xa7 4 nedan. R\xe4ttslig grund f\xf6r indexanv\xe4ndning: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"}),"."]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Faktura-PDF (uppladdning)"}),(0,$d.jsxs)("div",{className:"v",children:["PDF-filen konverteras till text i realtid via Anthropic API och raderas omedelbart \u2014 den lagras ",(0,$d.jsx)("strong",{children:"aldrig"})," p\xe5 Arvo Flows infrastruktur. Analysresultatet (extraherade siffror, inte PDF-inneh\xe5llet) cachas i 6 timmar f\xf6r att undvika on\xf6diga API-anrop. R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r Tj\xe4nstens leverans."]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Tekniska data"}),(0,$d.jsxs)("div",{className:"v",children:["IP-adress, webbl\xe4sare, sidvisningar (anonymiserat). R\xe4ttslig grund: ",(0,$d.jsx)("em",{children:"ber\xe4ttigat intresse"})," f\xf6r s\xe4kerhet och drift."]})]})]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsxs)("h3",{children:["3. Vad vi ",(0,$d.jsx)("em",{children:"inte"})," behandlar"]}),(0,$d.jsxs)("p",{children:["Vi har medvetet begr\xe4nsat datainsamlingen. Vi l\xe4ser ",(0,$d.jsx)("strong",{children:"aldrig"}),":"]}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"Kundfakturor eller int\xe4ktsdata"}),(0,$d.jsx)("li",{children:"L\xf6nedata eller personnummer p\xe5 anst\xe4llda"}),(0,$d.jsx)("li",{children:"Bankkontosaldon eller transaktionshistorik"}),(0,$d.jsx)("li",{children:"Kundregister eller CRM-data"}),(0,$d.jsx)("li",{children:"Inneh\xe5llet i e-postkorrespondens"})]}),(0,$d.jsx)("p",{children:"OAuth-scopen mot Fortnox och Visma \xe4r konfigurerade s\xe5 att vi tekniskt inte ens kan l\xe4sa kategorierna ovan, \xe4ven om vi ville."})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"4. Hur l\xe4nge vi sparar data"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Aktiv kund:"})," S\xe5 l\xe4nge avtalet l\xf6per."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Vid upps\xe4gning:"})," Transaktionsdata raderas inom 24 timmar."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Bokf\xf6ringsunderlag:"})," 7 \xe5r enligt bokf\xf6ringslagen (2 kap. 1 \xa7 BFL)."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Marknadsf\xf6ringssamtycke:"})," Tills du \xe5terkallar samtycket."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Faktura-PDF:"})," Lagras aldrig \u2014 raderas direkt efter AI-extraktering. Analysresultatet (JSON med siffror) cachas i 6 timmar, d\xe4refter auto-raderats."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Anonymiserad statistik (branschindex):"})," Belopp, leverant\xf6r och kategori fr\xe5n leverant\xf6rsfakturor anonymiseras och anv\xe4nds f\xf6r att ber\xe4kna marknadsmedian och prispercentiler per bransch och bolagsstorlek. Detta aggregerade index \xe4r grunden f\xf6r Tj\xe4nstens j\xe4mf\xf6relser och rekommendationer. Inga uppgifter kan h\xe4rledas till ett enskilt bolag. Sparas obegr\xe4nsat."]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Anthropic API (AI-behandling):"})," Data behandlas via Anthropic API med 30 dagars radering f\xf6r Trust & Safety, utan att anv\xe4ndas f\xf6r modelltr\xe4ning."]})]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"5. Var data lagras & s\xe4kerhet"}),(0,$d.jsx)("p",{children:"All data lagras inom EU/EES, prim\xe4rt hos Bahnhof i Stockholm. Vi anv\xe4nder:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"AES-256 kryptering i vila"}),(0,$d.jsx)("li",{children:"TLS 1.3 f\xf6r all data\xf6verf\xf6ring"}),(0,$d.jsx)("li",{children:"Tv\xe5faktorautentisering f\xf6r all intern access"}),(0,$d.jsx)("li",{children:"Loggning av all access till kunddata (audit trail)"}),(0,$d.jsx)("li",{children:"Penetrationstester av oberoende part minst \xe5rligen"})]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"6. Dina r\xe4ttigheter (GDPR)"}),(0,$d.jsx)("p",{children:"Du har r\xe4tt att:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:["Beg\xe4ra ut ",(0,$d.jsx)("strong",{children:"registerutdrag"})," \xf6ver dina personuppgifter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"r\xe4ttelse"})," av felaktiga uppgifter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"radering"})," (r\xe4tten att bli gl\xf6md), inom de gr\xe4nser bokf\xf6ringslagen till\xe5ter"]}),(0,$d.jsxs)("li",{children:["Beg\xe4ra ",(0,$d.jsx)("strong",{children:"begr\xe4nsning"})," av behandling"]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)("strong",{children:"Inv\xe4nda"})," mot behandling som sker p\xe5 ber\xe4ttigat intresse"]}),(0,$d.jsxs)("li",{children:["F\xe5 ut din data i ett ",(0,$d.jsx)("strong",{children:"strukturerat, maskinl\xe4sbart format"})," (dataportabilitet)"]}),(0,$d.jsxs)("li",{children:["L\xe4mna in ",(0,$d.jsx)("strong",{children:"klagom\xe5l till Integritetsskyddsmyndigheten"})," (IMY)"]})]}),(0,$d.jsxs)("p",{children:["Kontakta ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," \u2014 vi svarar inom 30 dagar."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"7. Underbitr\xe4den"}),(0,$d.jsx)("p",{children:"Vi anv\xe4nder f\xf6ljande underbitr\xe4den f\xf6r att leverera Tj\xe4nsten. Samtliga \xe4r bundna av DPA och behandlar uppgifter inom EU/EES eller under EU-godk\xe4nda \xf6verf\xf6ringsmekanismer:"}),(0,$d.jsxs)(Sm,{children:[(0,$d.jsxs)($m,{className:"header",children:[(0,$d.jsx)("div",{children:"Leverant\xf6r"}),(0,$d.jsx)("div",{children:"Funktion & \xf6verf\xf6ringsmekanism"})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Anthropic PBC"}),(0,$d.jsx)("div",{className:"v",children:"AI-analys av faktura-PDF \u2014 USA. SCC. 30 dagars radering, tr\xe4nar ej modeller p\xe5 API-data."})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Vercel Inc."}),(0,$d.jsx)("div",{className:"v",children:"Serverless funktioner & KV-cache \u2014 USA/EU. SCC. Analysresultat cachas max 6 timmar."})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Neon Inc."}),(0,$d.jsx)("div",{className:"v",children:"Postgres-databas (leads, offertf\xf6rfr\xe5gningar, branschindex) \u2014 USA. SCC."})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Resend Inc."}),(0,$d.jsx)("div",{className:"v",children:"Transaktionell e-post (bekr\xe4ftelser, interna larm) \u2014 USA. SCC."})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Bahnhof AB"}),(0,$d.jsx)("div",{className:"v",children:"Hosting / databas (planerad, full produkt) \u2014 Sverige"})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Scrive AB"}),(0,$d.jsx)("div",{className:"v",children:"BankID-signering (planerad) \u2014 Sverige"})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Fortnox / Visma"}),(0,$d.jsx)("div",{className:"v",children:"OAuth-koppling till bokf\xf6ring (planerad) \u2014 Sverige"})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Stripe Payments Europe"}),(0,$d.jsx)("div",{className:"v",children:"Betalningar & fakturering (planerad) \u2014 Irland"})]})]})]}),(0,$d.jsx)(jm,{children:"Personuppgiftsbitr\xe4desavtal (DPA) \u2014 Bilaga"}),(0,$d.jsx)(wm,{children:"Detta avtal g\xe4ller automatiskt n\xe4r du som Kund tecknar Tj\xe4nsten. Det reglerar Arvo Flows behandling av personuppgifter p\xe5 Kundens uppdrag (t.ex. uppgifter om Kundens kontaktpersoner)."}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"1. Parter"}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Personuppgiftsansvarig:"})," Kunden."]}),(0,$d.jsxs)("p",{children:[(0,$d.jsx)("strong",{children:"Personuppgiftsbitr\xe4de:"})," Arvo Flow AB, org.nr 559500-0000."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"2. Omfattning"}),(0,$d.jsx)("p",{children:"Bitr\xe4det behandlar personuppgifter (kontaktuppgifter, fakturarader, personnummer f\xf6r firmateckning) f\xf6r att utf\xf6ra Tj\xe4nsten enligt Allm\xe4nna villkor."})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"3. Instruktion"}),(0,$d.jsxs)("p",{children:["Bitr\xe4det f\xe5r behandla uppgifter f\xf6r att (i) optimera avtal och fakturera enligt de ",(0,$d.jsx)(vl,{to:"/villkor",children:"Allm\xe4nna villkoren"}),", samt (ii) anonymisera och aggregera fakturauppgifter (belopp, leverant\xf6r, kategori) f\xf6r Tj\xe4nstens branschindex enligt \xa7 4 i Integritetspolicyn. Ytterligare instruktioner fr\xe5n Kunden ska vara skriftliga."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"4. S\xe4kerhet"}),(0,$d.jsx)("p",{children:"Bitr\xe4det ska vidta l\xe4mpliga tekniska och organisatoriska \xe5tg\xe4rder f\xf6r att skydda data mot oavsiktlig eller olaglig f\xf6rst\xf6relse, f\xf6rlust, \xe4ndring, obeh\xf6rigt r\xf6jande eller obeh\xf6rig \xe5tkomst (jfr GDPR art. 32). Detta inkluderar kryptering, \xe5tkomstkontroll, loggning och regelbunden s\xe4kerhetsgranskning enligt \xa7 5 i Integritetspolicyn ovan."})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"5. Underbitr\xe4den"}),(0,$d.jsx)("p",{children:"Kunden godk\xe4nner att Bitr\xe4det anv\xe4nder underbitr\xe4den enligt listan under \xa7 7 i Integritetspolicyn. Bitr\xe4det ska underr\xe4tta Kunden vid byte av underbitr\xe4de, varvid Kunden har r\xe4tt att inv\xe4nda inom 30 dagar."})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"6. Radering"}),(0,$d.jsx)("p",{children:"Vid upps\xe4gning av Tj\xe4nsten eller p\xe5 Kundens beg\xe4ran ska Bitr\xe4det radera eller anonymisera all transaktionsdata inom 24 timmar, s\xe5vida inte lag kr\xe4ver lagring (t.ex. bokf\xf6ringslagen f\xf6r fakturaunderlag)."})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"7. Personuppgiftsincident"}),(0,$d.jsx)("p",{children:"Bitr\xe4det ska utan on\xf6digt dr\xf6jsm\xe5l, dock senast 48 timmar efter det att Bitr\xe4det f\xe5tt k\xe4nnedom om en personuppgiftsincident som r\xf6r Kunden, meddela Kunden om incidenten samt vidtagna \xe5tg\xe4rder."})]}),(0,$d.jsxs)(ym,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Integritetspolicy & DPA v1.4 \xb7 Senast uppdaterad 2026-05-19. ",(0,$d.jsx)("br",{}),"Fr\xe5gor: ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)(km,{children:[(0,$d.jsx)("h2",{children:"Vill du veta exakt vad vi har om dig?"}),(0,$d.jsxs)("p",{children:["Mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"})," s\xe5 f\xe5r du ett komplett registerutdrag inom 30 dagar \u2014 utan kostnad."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsx)(Id,{as:vl,to:"/villkor",$variant:"primary",$size:"lg",children:"L\xe4s allm\xe4nna villkor"}),(0,$d.jsx)(Id,{as:vl,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(xu,{})]}),_m=()=>(0,$d.jsxs)(pm,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsxs)(hm,{children:[(0,$d.jsxs)(fm,{children:[(0,$d.jsx)("span",{className:"dot"})," Cookie-policy \xb7 Version 1.2 \xb7 Senast uppdaterad 2026-05-13"]}),(0,$d.jsxs)(mm,{children:["Vi anv\xe4nder bara ",(0,$d.jsx)("em",{children:"n\xf6dv\xe4ndiga"})," cookies."]}),(0,$d.jsx)(gm,{children:"Inga marknadsf\xf6ringspixlar, inga remarketing-taggar, ingen f\xf6rs\xe4ljning av din surfdata till tredje part. Bara det som kr\xe4vs f\xf6r att Tj\xe4nsten ska fungera och vara s\xe4ker."})]}),(0,$d.jsxs)(xm,{children:[(0,$d.jsxs)(vm,{children:[(0,$d.jsx)("h2",{children:"Sammanfattning"}),(0,$d.jsx)("p",{className:"intro",children:"Det h\xe4r g\xe4ller cookies p\xe5 arvo.flow och arvoflow.se:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndiga cookies"})," anv\xe4nds alltid \u2014 utan dem fungerar inte inloggning eller s\xe4ker session."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Anonymiserad statistik"})," samlas in f\xf6r att f\xf6rst\xe5 hur Tj\xe4nsten anv\xe4nds (sidvisningar, felmeddelanden). Den kan inte kopplas till dig som individ."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Inga marknadsf\xf6ringscookies."})," Vi anv\xe4nder inte Facebook Pixel, Google Ads remarketing eller liknande sp\xe5rning."]})]}),(0,$d.jsxs)("li",{children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.4}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("strong",{children:"Inga cookies fr\xe5n tredje part"})," s\xe4tts utan ditt aktiva samtycke."]})]})]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"1. Vad \xe4r cookies?"}),(0,$d.jsx)("p",{children:"Cookies \xe4r sm\xe5 textfiler som sparas i din webbl\xe4sare n\xe4r du bes\xf6ker en webbplats. De anv\xe4nds f\xf6r att webbplatsen ska fungera korrekt, f\xf6r s\xe4kerhet och f\xf6r att samla in anonymiserad anv\xe4ndarstatistik."})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"2. Cookies vi anv\xe4nder"}),(0,$d.jsxs)(Sm,{children:[(0,$d.jsxs)($m,{className:"header",children:[(0,$d.jsx)("div",{children:"Namn / typ"}),(0,$d.jsx)("div",{children:"Syfte & livsl\xe4ngd"})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Session-cookie"}),(0,$d.jsxs)("div",{className:"v",children:["H\xe5ller dig inloggad under bes\xf6ket. Livsl\xe4ngd: tills du st\xe4nger webbl\xe4saren. ",(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"CSRF-token"}),(0,$d.jsxs)("div",{className:"v",children:["Skyddar mot f\xf6rfalskade formul\xe4rinskick. Livsl\xe4ngd: tills sessionen avslutas. ",(0,$d.jsx)("strong",{children:"N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Cookie-samtycke"}),(0,$d.jsxs)("div",{className:"v",children:["Sparar ditt val g\xe4llande statistik-cookies. Livsl\xe4ngd: 12 m\xe5nader.",(0,$d.jsx)("strong",{children:" N\xf6dv\xe4ndig."})]})]}),(0,$d.jsxs)($m,{children:[(0,$d.jsx)("div",{className:"k",children:"Anonymiserad statistik"}),(0,$d.jsxs)("div",{className:"v",children:["Aggregerad data om sidvisningar och fel. Ingen IP, ingen individidentifiering. Livsl\xe4ngd: 90 dagar. ",(0,$d.jsx)("strong",{children:"Statistik (samtycke)."})]})]})]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"3. Hur du hanterar cookies"}),(0,$d.jsx)("p",{children:"Du kan n\xe4r som helst:"}),(0,$d.jsxs)("ul",{children:[(0,$d.jsx)("li",{children:"\xc5terkalla samtycke till statistik-cookies via inst\xe4llningar i din profil n\xe4r du \xe4r inloggad"}),(0,$d.jsx)("li",{children:"Radera alla cookies fr\xe5n arvo.flow via din webbl\xe4sares inst\xe4llningar"}),(0,$d.jsx)("li",{children:"Blockera cookies helt \u2014 observera dock att inloggning d\xe5 inte kommer fungera"})]}),(0,$d.jsxs)("p",{children:["V\xe4gledning f\xf6r de vanligaste webbl\xe4sarna finns hos"," ",(0,$d.jsx)("a",{href:"https://www.imy.se/privatperson/dataskydd/det-har-galler-enligt-gdpr/cookies/",target:"_blank",rel:"noopener noreferrer",children:"Integritetsskyddsmyndigheten (IMY)"}),"."]})]}),(0,$d.jsxs)(bm,{children:[(0,$d.jsx)("h3",{children:"4. Lagst\xf6d"}),(0,$d.jsx)("p",{children:"Vi f\xf6ljer Lagen om elektronisk kommunikation (LEK) 9 kap. 28 \xa7. N\xf6dv\xe4ndiga cookies s\xe4tts utan samtycke eftersom de kr\xe4vs f\xf6r att tillhandah\xe5lla den tj\xe4nst du aktivt efterfr\xe5gat. F\xf6r \xf6vriga cookies inh\xe4mtar vi aktivt samtycke i enlighet med GDPR."})]}),(0,$d.jsxs)(ym,{children:[(0,$d.jsx)("strong",{children:"Arvo Flow AB"})," \xb7 Org.nr 559500-0000 \xb7 Stockholm \xb7 Cookie-policy v1.2 \xb7 Senast uppdaterad 2026-05-13. ",(0,$d.jsx)("br",{}),"Fr\xe5gor: ",(0,$d.jsx)("a",{href:"mailto:gdpr@arvo.flow",style:{color:"inherit",textDecoration:"underline"},children:"gdpr@arvo.flow"}),"."]})]}),(0,$d.jsxs)(km,{children:[(0,$d.jsx)("h2",{children:"Inga m\xf6rka m\xf6nster, inga dolda sp\xe5rare."}),(0,$d.jsxs)("p",{children:["Vi tycker att cookie-banners ska vara \xe4rliga. Om du uppt\xe4cker att vi s\xe4tter en cookie som inte st\xe5r med ovan \u2014 mejla ",(0,$d.jsx)("a",{className:"mail",href:"mailto:gdpr@arvo.flow",children:"gdpr@arvo.flow"}),"."]}),(0,$d.jsxs)("div",{className:"actions",children:[(0,$d.jsx)(Id,{as:vl,to:"/integritet",$variant:"primary",$size:"lg",children:"L\xe4s integritetspolicy"}),(0,$d.jsx)(Id,{as:vl,to:"/",$variant:"secondary",$size:"lg",children:"Tillbaka till startsidan"})]})]}),(0,$d.jsx)(xu,{})]}),Nm={mobil:{label:"Mobilabonnemang",partnerLabel:"Kvalificerad Mobiloperat\xf6r",segment:2,unit:"abonnemang",unitSingular:"abonnemang",inlineLabel:"mobilabonnemang",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade ramavtal f\xf6r mobilabonnemang kostar v\xe4sentligt mindre",variableChargeNote:"Roaming, \xf6vertrafik m.m. \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},bredband:{label:"F\xf6retagsbredband",partnerLabel:"Kvalificerad Bredbandsoperat\xf6r",segment:2,unit:"anslutningar",unitSingular:"anslutning",inlineLabel:"bredband",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Arvos riktv\xe4rde baserat p\xe5 benchmarkdata f\xf6r B2B-bredband \u2014 exakt pris beror p\xe5 adress och befintlig infrastruktur.",smfBenchmark:"v\xe4lf\xf6rhandlade f\xf6retagsbredbandsavtal kostar v\xe4sentligt mindre",variableChargeNote:"Datatrafik och \xf6verskottsavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"saas-productivity":{label:"Programvarulicenser / SaaS",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!0,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade avtal f\xf6r samma licenser kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-crm":{label:"CRM-system",partnerLabel:"Kvalificerad CRM-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade CRM-avtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-finance":{label:"Aff\xe4rssystem / Bokf\xf6ring",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade aff\xe4rssystemsavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-other":{label:"Programvarulicenser / SaaS \xb7 \xf6vrigt",partnerLabel:"Kvalificerad SaaS-leverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade programvaruavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},"saas-creative":{label:"Kreativ mjukvara / Design",partnerLabel:"Kvalificerad Mjukvaruleverant\xf6r",segment:3,unit:"licenser",unitSingular:"licens",inlineLabel:"programvarulicenser",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade avtal f\xf6r kreativ mjukvara kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},el:{label:"Elavtal",partnerLabel:"Kvalificerad Elleverant\xf6r",segment:1,unit:"avtal",unitSingular:"avtal",inlineLabel:"el (energidel)",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,smfBenchmark:"v\xe4lf\xf6rhandlade elavtal kostar v\xe4sentligt mindre",variableChargeNote:"R\xf6rliga energikostnader (spotpris, n\xe4tavgift) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!0},skrivarleasing:{label:"Skrivare & Managed Print",partnerLabel:"Kvalificerad Print-leverant\xf6r",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"skrivarl\xf6sning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",smfBenchmark:"v\xe4lf\xf6rhandlade utskriftsavtal kostar v\xe4sentligt mindre",variableChargeNote:"Klickkostnader per utskrift (volymbaserat) \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},utrustningsleasing:{label:"IT-utrustningsleasing",partnerLabel:"Kvalificerad IT-partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"utrustningsleasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",smfBenchmark:"v\xe4lf\xf6rhandlade IT-leasingavtal kostar v\xe4sentligt mindre",variableChargeNote:null,licensePending:!1,elSuffix:!1},kortterminal:{label:"Kortterminal",partnerLabel:"Kvalificerad Betaltj\xe4nstleverant\xf6r",segment:6,unit:"terminaler",unitSingular:"terminal",inlineLabel:"kortterminal",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:"Transaktionsavgifter och volymbaserade procentavgifter \u2014 ej inkluderat i \xe5rsber\xe4kningen.",licensePending:!1,elSuffix:!1},"faktura-tjanst":{label:"Fakturatj\xe4nst / Aff\xe4rssystem",partnerLabel:"Kvalificerad Aff\xe4rssystemsleverant\xf6r",segment:6,unit:"licenser",unitSingular:"licens",inlineLabel:"fakturatj\xe4nst",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},"leasing-bil":{label:"F\xf6retagsleasing",partnerLabel:"Kvalificerad Leasingpartner",segment:5,unit:"fordon",unitSingular:"fordon",inlineLabel:"billeasing",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"it-support":{label:"IT-drift & Support",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"IT-support",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},serverhosting:{label:"Serverhosting & Cloud-infrastruktur",partnerLabel:"Kvalificerad IT-partner",segment:4,unit:"avtal",unitSingular:"avtal",inlineLabel:"serverhosting",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"transport-frakt":{label:"Transport & Frakt",partnerLabel:"Kvalificerad Fraktleverant\xf6r",segment:5,unit:"avtal",unitSingular:"avtal",inlineLabel:"transport",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},kontorsmaterial:{label:"Kontorsmaterial & F\xf6rbrukning",partnerLabel:"Kvalificerad F\xf6rbrukningsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"kontorsmaterial",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"st\xe4d-reng\xf6ring":{label:"St\xe4d & Reng\xf6ring",partnerLabel:"Kvalificerad St\xe4dleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"st\xe4dtj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"larm-bevakning":{label:"Larm & Bevakning",partnerLabel:"Kvalificerad S\xe4kerhetsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"larm och bevakning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},foretagshalsovard:{label:"F\xf6retagsh\xe4lsov\xe5rd",partnerLabel:"Kvalificerad H\xe4lsov\xe5rdspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsh\xe4lsov\xe5rd",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},loneadmin:{label:"L\xf6neadministration",partnerLabel:"Kvalificerad L\xf6nesystemleverant\xf6r",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"l\xf6neadministration",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"forsakring-foretag":{label:"F\xf6retagsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"f\xf6retagsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},"forsakring-ansvar":{label:"Yrkesansvarsf\xf6rs\xe4kring",partnerLabel:"Arvo-verifierad F\xf6rs\xe4kringspartner",segment:7,unit:"avtal",unitSingular:"avtal",inlineLabel:"yrkesansvarsf\xf6rs\xe4kring",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing \u2014 byte kr\xe4ver FI-licens och genomf\xf6rs n\xe4r denna finns p\xe5 plats.",variableChargeNote:null,licensePending:!0,elSuffix:!1},vaxel:{label:"Molnv\xe4xel",partnerLabel:"Kvalificerad Telekomleverant\xf6r",segment:2,unit:"licenser",unitSingular:"licens",inlineLabel:"molnv\xe4xel",isRealPrice:!1,benchmarkType:"list-verified",benchmarkNote:null,variableChargeNote:null,licensePending:!1,elSuffix:!1},bankavgifter:{label:"Bankavgifter & Betaltj\xe4nster",partnerLabel:"Kvalificerad Bankpartner",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"bankavgifter",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},"avfall-atervinning":{label:"Avfall & \xc5tervinning",partnerLabel:"Kvalificerad Avfallsleverant\xf6r",segment:6,unit:"avtal",unitSingular:"avtal",inlineLabel:"avfall och \xe5tervinning",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Uppskattad besparing baserad p\xe5 branschsnitt \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner.",variableChargeNote:null,licensePending:!1,elSuffix:!1},uncategorized:{label:"Okategoriserad",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}};function Am(e){var t;return null!==(t=Nm[e])&&void 0!==t?t:{label:null!==e&&void 0!==e?e:"Ok\xe4nd kategori",partnerLabel:"Arvo-verifierad Partner",segment:0,unit:"enheter",unitSingular:"enhet",inlineLabel:"denna tj\xe4nst",isRealPrice:!1,benchmarkType:"negotiated-target",benchmarkNote:"Prisuppskattning baserad p\xe5 tillg\xe4nglig branschdata.",variableChargeNote:null,licensePending:!1,elSuffix:!1}}const Cm=jd`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`,Fm=jd`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`,Tm=jd`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
`,Pm=jd`
  to { transform: rotate(360deg); }
`,Dm=jd`
  0%   { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
`,Lm=jd`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,.5); }
  60%       { box-shadow: 0 0 0 4px rgba(27,122,110,.0); }
`,Rm=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  min-height: 100vh;
`,Om=vd.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 80px 28px 32px;
  text-align: center;
  animation: ${Cm} 0.6s ease both;
  @media (max-width: 740px) { padding: 48px 20px 20px; }
`,Im=vd.span`
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
`,Mm=vd.h1`
  margin-top: 22px;
  font-size: clamp(38px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${e=>{let{theme:t}=e;return t.color.brand}}; font-weight: 500; }
`,Bm=vd.p`
  margin: 22px auto 0;
  max-width: 580px;
  font-size: 17px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
`,Vm=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 16px 28px 64px;
  @media (max-width: 740px) { padding: 12px 20px 48px; }
`,Um=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  margin-bottom: 16px;
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.sm}};
  animation: ${Cm} 0.5s ease both;
  @media (max-width: 600px) { padding: 22px 20px; }
`,Km=vd.div`
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
`,Hm=vd.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 18px;
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`,Wm=vd.label`
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
`,qm=vd.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Ym=vd.div`
  animation: ${Fm} 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;
`,Gm=(vd.div`
  margin: 20px 0 6px;
  animation: ${Cm} .4s ease both;

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
`),Qm=vd.p`
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
`,Jm=vd.div`
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  background: ${e=>{let{theme:t}=e;return t.color.dangerSoft}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.danger}};
  font-size: 14px;
  color: ${e=>{let{theme:t}=e;return t.color.danger}};
  line-height: 1.5;
`,Xm=vd.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${Pm} 0.7s linear infinite;
`,Zm=vd.ol`
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
`,eg=vd.li`
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
    animation: ${e=>{let{$state:t}=e;return"active"===t?Tm:"none"}} 1.6s ease-in-out infinite;
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
`,tg=(vd.div`
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
`),rg=vd.div`
  position: relative;
  overflow: hidden;
  padding: 24px 26px 22px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.brandGradient}};
  color: #FAFAF7;
  margin-bottom: 12px;
  box-shadow: 0 8px 32px rgba(27,110,102,.22), 0 2px 6px rgba(27,110,102,.14);
  animation: ${Cm} 0.5s ease both;

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
    animation: ${Dm} 3.6s ease-in-out 1.2s infinite;
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
`,ng=vd.div`
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
`,ag=vd.p`
  margin-top: 10px;
  margin-bottom: ${e=>{let{$compact:t}=e;return t?"10px":"24px"}};
  font-size: 12px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  font-style: italic;
  text-align: center;
`,ig=(vd.div`
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
  animation: ${Cm} 0.5s ease 0.08s both;

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
`),og=vd.div`
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
`,lg=vd.form`
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
`,sg=vd.div`
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
`,cg=(vd.div`
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
`),dg=vd.div`
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
`,ug=vd.dl`
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
`,pg=vd.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 8, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${Cm} 0.2s ease both;
`,hg=vd.div`
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
`,fg=vd.div`
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
`,mg=(vd.a`
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
`),gg=vd.div`
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
    animation: ${Fm} 0.2s ease both;
  }
  p {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: 14px;
    line-height: 1.65;
    color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    margin: 0;
  }
`,xg=vd.div`
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
`,vg=vd.div`
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
`,bg=vd.div`
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
`,yg=(vd.div`
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
`),kg=(vd.div`
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
`),jg=vd.div`
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
`,wg=vd.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`,Sg=vd.div`
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
`,$g=vd.div`
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
`,zg=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px 32px 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 24px rgba(14,26,23,.08), 0 1px 4px rgba(14,26,23,.04);
  animation: ${Cm} 0.5s ease 0.16s both;

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
    animation: ${Lm} 2s ease-in-out infinite;
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
`,Eg=vd.div`
  margin-bottom: 12px;
  padding: 30px 32px 26px;
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top: 3px solid ${e=>{let{theme:t}=e;return t.color.brand}};
  box-shadow: ${e=>{let{theme:t}=e;return t.shadow.md}};
  animation: ${Cm} 0.5s ease 0.24s both;

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
`;const _g={"business-premium":"Business Premium","business-standard":"Business Standard","business-basic":"Business Basic",e3:"E3",e5:"E5"},Ng=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);const Ag=3145728;async function Cg(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}function Fg(e,t){if(!e||!t)return e;const r=t.split(/\s+/),n=[t];r[0].length>=4&&n.push(r[0]),r.length>=2&&n.push(`${r[0]} ${r[1]}`);let a=e;for(const i of[...new Set(n)])a=a.replace(new RegExp(i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),"Arvo-verifierad partner");return a}const Tg={ehandel:"E-handel & Detaljhandel",tillverkning:"Industri & Tillverkning","it-tech":"IT, Tech & Mjukvara",bygg:"Bygg, Hantverk & Fastighet",hotell:"Hotell, Restaurang & Event",konsult:"Konsult & F\xf6retagstj\xe4nster",transport:"Transport & Logistik",vard:"V\xe5rd, Omsorg & H\xe4lsa",ovrigt:"\xd6vrigt / Annan bransch"},Pg=[{label:"Skrivare",short:"Skrivare",icon:"file",cats:["skrivarleasing","utrustningsleasing"]},{label:"El",short:"El",icon:"bolt",cats:["el"]},{label:"Telefoni och bredband",short:"Telefoni",icon:"phone",cats:["mobil","bredband","vaxel"]},{label:"Programvara",short:"Programvara",icon:"spark",cats:["saas-productivity","saas-creative","saas-crm","saas-finance","saas-other","serverhosting","faktura-tjanst"]},{label:"IT",short:"IT",icon:"wifi",cats:["it-support"]},{label:"Fordon och frakt",short:"Fordon",icon:"truck",cats:["leasing-bil","transport-frakt"]},{label:"Kontor och st\xe4d",short:"Kontor",icon:"briefcase",cats:["kontorsmaterial","st\xe4d-reng\xf6ring","larm-bevakning","kortterminal","avfall-atervinning","bankavgifter"]},{label:"Personal och h\xe4lsa",short:"Personal",icon:"shield",cats:["foretagshalsovard","loneadmin","forsakring-foretag","forsakring-ansvar"]}],Dg=[{id:"extract",label:"Arvo l\xe4ser & klassificerar fakturan",sublabel:"Tolkar varje rad och post"},{id:"categorize",label:"Identifierar leverant\xf6r & kategori",sublabel:"Matchar mot 200+ leverant\xf6rsprofiler"},{id:"recommend",label:"Ber\xe4knar besparing mot branschindex",sublabel:"J\xe4mf\xf6r med svenska branschdata"}],Lg=e=>new Promise((t,r)=>{const n=new FileReader;n.onload=()=>{const e=String(n.result||""),r=e.includes(",")?e.split(",")[1]:e;t(r)},n.onerror=()=>r(new Error("Kunde inte l\xe4sa filen")),n.readAsDataURL(e)});function Rg(e){let{cc:t}=e;const[r,a]=n.useState(!1);return(0,$d.jsxs)(vg,{children:[(0,$d.jsxs)("div",{className:"chain-header",onClick:()=>a(e=>!e),role:"button",tabIndex:0,onKeyDown:e=>"Enter"===e.key&&a(e=>!e),children:[(0,$d.jsx)("span",{className:"chain-title",children:"Ber\xe4kningsunderlag"}),(0,$d.jsx)("span",{className:"chain-toggle",children:r?"D\xf6lj \u25b2":"Visa hur vi r\xe4knar \u25bc"})]}),r&&(0,$d.jsxs)("div",{className:"chain-body",children:[(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Nuvarande kostnad"}),(0,$d.jsx)("div",{className:"chain-source",children:t.currentAnnualCost.source})]}),(0,$d.jsxs)("span",{className:"chain-value",children:[zu(t.currentAnnualCost.value)," kr/\xe5r"]})]}),t.benchmarkAnnualCost&&(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Arvo-pris"}),t.benchmarkAnnualCost.formula&&(0,$d.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.formula}),(0,$d.jsx)("div",{className:"chain-source",children:t.benchmarkAnnualCost.source})]}),(0,$d.jsxs)("span",{className:"chain-value",children:[zu(t.benchmarkAnnualCost.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsx)("div",{className:"chain-label",children:"Bruttobesparing"}),(0,$d.jsxs)("span",{className:"chain-value",children:[zu(t.grossSaving.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chain-label",children:"Arvos arvode"}),(0,$d.jsx)("div",{className:"chain-source",children:t.arvoFee.formula})]}),(0,$d.jsxs)("span",{className:"chain-value",children:["\u2212",zu(t.arvoFee.value)," kr/\xe5r"]})]}),(0,$d.jsxs)("div",{className:"chain-row total",children:[(0,$d.jsx)("span",{children:"Er nettobesparing"}),(0,$d.jsxs)("span",{className:"chain-value",children:["+",zu(t.netSaving.value)," kr/\xe5r"]})]})]})]})}function Og(e){let{seatCount:t,employees:r,overage:a,term:i,termSing:o}=e;const[l,s]=n.useState(!1);return(0,$d.jsxs)(gg,{children:[(0,$d.jsxs)("button",{className:"lon-trigger",onClick:()=>s(e=>!e),"aria-expanded":l,children:[(0,$d.jsxs)("span",{className:"lon-head",children:[(0,$d.jsxs)("span",{className:"kicker",children:["Notering om ",i]}),(0,$d.jsxs)("span",{className:"lon-teaser",children:[a," av ",t," ",i," verkar oanv\xe4nda"]})]}),(0,$d.jsx)("span",{className:"lon-chevron"+(l?" open":""),children:(0,$d.jsx)(bu,{name:"chevron-right",size:15,stroke:2.5})})]}),l&&(0,$d.jsx)("div",{className:"lon-body",children:(0,$d.jsxs)("p",{children:["Kalkylen ovan bygger p\xe5 att vi beh\xe5ller era ",t," ",i,", men s\xe4nker styckpriset genom att flytta er till r\xe4tt avtalsniv\xe5. Vi noterar dock att ni enligt uppgift \xe4r ",r," anst\xe4llda. Om man dessutom hade st\xe4dat bort",1===a?` detta ${a} \xf6verfl\xf6diga ${o}`:` dessa ${a} \xf6verfl\xf6diga ${i}`,", hade er kostnad s\xe4nkts ytterligare."]})})]})}const Ig=()=>{var e,t,r,a,i,o,l,s,c,d,u,p,h,f,m,g,x,v,b,y,k,j,w,S,$,z,E,_,N,A,C,F,T,P,D,L,R,O,I,M,B,V,U,K,H,W,q,Y,G,Q,J,X,Z,ee,te,re,ne,ae,ie,oe,le,se,ce,de,ue,pe,he,fe,me,ge,xe,ve,be,ye,ke,je,we,Se,$e,ze,Ee,_e,Ne,Ae,Ce,Fe,Te,Pe,De,Le,Re,Oe,Ie,Me,Be,Ve,Ue,Ke,He,We,qe,Ye,Ge,Qe,Je,Xe,Ze,et,tt,rt,nt,at,it,ot,lt,st,ct,dt,ut,pt,ht,ft,mt,gt,xt,vt,bt;const yt=(0,n.useRef)(null),kt=(0,n.useRef)(null),{email:jt}=Ad(),[wt,St]=(0,n.useState)(null),[$t,zt]=(0,n.useState)("konsult"),[Et,_t]=(0,n.useState)(5),[Nt,At]=(0,n.useState)(""),[Ct,Ft]=(0,n.useState)(null),[Tt,Pt]=(0,n.useState)(null),[Dt,Lt]=(0,n.useState)(null),[Rt,Ot]=(0,n.useState)(null),[It,Mt]=(0,n.useState)(""),[Bt,Vt]=(0,n.useState)("idle"),[Ut,Kt]=(0,n.useState)(!1),[Ht,Wt]=(0,n.useState)(""),[qt,Yt]=(0,n.useState)("idle"),[Gt,Qt]=(0,n.useState)(!1),[Jt,Xt]=(0,n.useState)(""),[Zt,er]=(0,n.useState)("idle"),[tr,rr]=(0,n.useState)(null),[nr,ar]=(0,n.useState)(!1),[ir,or]=(0,n.useState)(!1),[lr,sr]=(0,n.useState)("quota"),[cr,dr]=(0,n.useState)(""),[ur,pr]=(0,n.useState)(!1),[hr,fr]=(0,n.useState)(""),[mr,gr]=(0,n.useState)(""),[xr,vr]=(0,n.useState)(""),[br,yr]=(0,n.useState)(!1),[kr,jr]=(0,n.useState)("idle"),[wr,Sr]=(0,n.useState)(!1),[$r,zr]=(0,n.useState)(""),[Er,_r]=(0,n.useState)("idle"),[Nr,Ar]=(0,n.useState)(""),[Cr,Fr]=(0,n.useState)("idle"),[Tr,Pr]=(0,n.useState)(null),[Dr,Lr]=(0,n.useState)("idle"),[Rr,Or]=(0,n.useState)(!1),[Ir,Mr]=(0,n.useState)(!1),[Br,Vr]=(0,n.useState)(""),[Ur,Kr]=(0,n.useState)("idle"),[Hr,Wr]=(0,n.useState)(null),[qr,Yr]=(0,n.useState)([]),[Gr,Qr]=(0,n.useState)(null),[Jr,Xr]=(0,n.useState)([]),[Zr,en]=(0,n.useState)(null),[tn,rn]=(0,n.useState)(!1),nn=qr.length>1;n.useEffect(()=>{var e,t,r;const n=new URLSearchParams(window.location.search),a=n.get("bypass");a&&(sessionStorage.setItem("arvo_bypass",a),window.history.replaceState({},"",window.location.pathname));const i=n.get("magic");i&&(window.history.replaceState({},"",window.location.pathname),fetch("/api/validate-magic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:i})}).then(e=>e.json()).then(e=>{e.ok&&e.bypass&&sessionStorage.setItem("arvo_bypass",e.bypass)}).catch(()=>{})),fetch("/api/token",{method:"POST"}).then(e=>e.json()).then(e=>{var t;return rr(null!==(t=e.token)&&void 0!==t?t:null)}).catch(()=>{});const o=n.get("intelligence_connected"),l=n.get("oauth_pending"),s=n.get("oauth_error"),c=null!==(e=null!==(t=null!==(r=n.get("provider"))&&void 0!==r?r:o)&&void 0!==t?t:l)&&void 0!==e?e:"gmail";if(o||l||s){var d,u;const e=parseInt(null!==(d=n.get("invoices"))&&void 0!==d?d:"0",10)||0,t=null!==(u=n.get("email"))&&void 0!==u?u:"";o?Wr({type:"connected",provider:o,invoices:e,email:t}):l?Wr({type:"pending",provider:l}):s&&Wr({type:"error",provider:c,errorCode:s}),window.history.replaceState({},"",window.location.pathname)}},[]),n.useEffect(()=>{var e,t;if(!Dt||!kt.current)return;const r=null!==(e=null===(t=document.querySelector("header"))||void 0===t?void 0:t.offsetHeight)&&void 0!==e?e:64,n=kt.current.getBoundingClientRect().top+window.pageYOffset-r-8;window.scrollTo({top:n,behavior:"smooth"})},[Dt]);const an=e=>{Pt(null),e&&("application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")?e.size>Ag?Pt(`PDF \xe4r f\xf6r stor (${(e.size/1024/1024).toFixed(1)} MB). Max: 3 MB.`):St(e):Pt("Endast PDF-filer st\xf6ds."))},on=e=>{Pt(null),en(null);const t=Array.from(e).filter(e=>"application/pdf"===e.type||e.name.toLowerCase().endsWith(".pdf")),r=t.filter(e=>e.size>Ag);r.length>0&&Pt(`${r.length} fil(er) \xe4r f\xf6r stora (max 3 MB per faktura).`);const n=t.filter(e=>e.size<=Ag);1===n.length?(St(n[0]),Yr([])):n.length>1?(Yr(n),St(null),Lt(null)):e.length>0&&Pt("Endast PDF-filer st\xf6ds.")},ln=async e=>{const t=await fetch("/api/send-analysis",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:Dt})});if(!t.ok)throw new Error("send-analysis "+t.status)},sn=async e=>{const t=await fetch("/api/send-confirmation",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,result:Dt})});if(!t.ok)throw new Error("send-confirmation "+t.status)},cn=async e=>{var t;null===e||void 0===e||null===(t=e.preventDefault)||void 0===t||t.call(e);const r=(Jt||cr||"").trim();if(r&&"idle"===Zt){er("submitting");try{await Promise.all([sn(r),ln(r)]),er("sent")}catch{er("idle")}}},dn=Ct&&"done"!==Ct,un="optimize"===(null===Dt||void 0===Dt||null===(e=Dt.recommendation)||void 0===e?void 0:e.recommendationType)&&(null!==(t=null===Dt||void 0===Dt||null===(r=Dt.recommendation)||void 0===r?void 0:r.optimizationSaving)&&void 0!==t?t:0)>0,pn=null!==(a=null===Dt||void 0===Dt||null===(i=Dt.recommendation)||void 0===i?void 0:i.optimizationSaving)&&void 0!==a?a:0,hn=un?Math.round(.2*pn):0,fn=un?pn-hn:0,mn=function(e){if(!Array.isArray(e))return[];const t=/[Mm]\xe5nad\s+(\d+)\s+av\s+(\d+)|[Mm]onth\s+(\d+)\s+of\s+(\d+)/;return e.flatMap(e=>{var r,n,a,i,o,l;if("hardware"!==e.type&&!(null===(r=e.description)||void 0===r?void 0:r.toLowerCase().includes("delbetalning")))return[];const s=t.exec(null!==(n=e.description)&&void 0!==n?n:"");if(!s)return[];const c=parseInt(null!==(a=s[1])&&void 0!==a?a:s[3]),d=parseInt(null!==(i=s[2])&&void 0!==i?i:s[4]);return isNaN(c)||isNaN(d)||d<=c?[]:[{description:e.description,monthlyCost:null!==(o=e.amount)&&void 0!==o?o:0,monthsRemaining:d-c,remainingCost:(d-c)*(null!==(l=e.amount)&&void 0!==l?l:0)}]})}(null!==(o=null===Dt||void 0===Dt||null===(l=Dt.extracted)||void 0===l?void 0:l.lineItems)&&void 0!==o?o:[]),gn=mn.reduce((e,t)=>e+12*t.monthlyCost,0),xn=mn.reduce((e,t)=>e+t.remainingCost,0),vn=gn>0&&(null===Dt||void 0===Dt||null===(s=Dt.recommendation)||void 0===s?void 0:s.shouldSwitch),bn=vn?Math.max(0,(null!==(c=null===Dt||void 0===Dt||null===(d=Dt.extracted)||void 0===d?void 0:d.annualCost)&&void 0!==c?c:0)-gn):null!==(u=null===Dt||void 0===Dt||null===(p=Dt.extracted)||void 0===p?void 0:p.annualCost)&&void 0!==u?u:0,yn=vn?Math.max(0,bn-(null!==(h=null===Dt||void 0===Dt||null===(f=Dt.recommendation)||void 0===f?void 0:f.suggestedAnnualCost)&&void 0!==h?h:0)):null!==(m=null===Dt||void 0===Dt||null===(g=Dt.recommendation)||void 0===g?void 0:g.grossSaving)&&void 0!==m?m:0,kn=Math.round(.2*yn),jn=yn-kn,wn=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1600;const[r,a]=n.useState(0);return n.useEffect(()=>{if(!e)return void a(0);const r=performance.now();let n;const i=o=>{const l=Math.min((o-r)/t,1),s=1-Math.pow(1-l,3);a(Math.round(e*s)),l<1?n=requestAnimationFrame(i):a(e)};return n=requestAnimationFrame(i),()=>{n&&cancelAnimationFrame(n)}},[e,t]),r}(vn?jn:null!==(x=null===Dt||void 0===Dt||null===(v=Dt.recommendation)||void 0===v?void 0:v.netSaving)&&void 0!==x?x:0),Sn=bn,$n=null!==(b=null===Dt||void 0===Dt||null===(y=Dt.recommendation)||void 0===y?void 0:y.suggestedAnnualCost)&&void 0!==b?b:0,zn=Sn>0&&$n>0&&$n<Sn?Math.round((Sn-$n)/Sn*100):0,En=null!==(k=null===Dt||void 0===Dt||null===(j=Dt.recommendation)||void 0===j||null===(w=j.clickRateAnalysis)||void 0===w?void 0:w.priceGapScore)&&void 0!==k?k:null,_n=null!==En&&void 0!==En?En:Math.max(5,Math.round(100-1.5*zn)),Nn=null!=En?En:null!==Dt&&void 0!==Dt&&null!==(S=Dt.recommendation)&&void 0!==S&&S.shouldSwitch?(null!==($=null===Dt||void 0===Dt||null===(z=Dt.recommendation)||void 0===z?void 0:z.netSaving)&&void 0!==$?$:0)>0?Math.min(_n,79):_n:Math.min(_n,85),An=Nn<45?{dot:"#DC2626",num:"#DC2626",label:"Kritisk",labelClr:"#991B1B",txt:"#7F1D1D",bg:"#FEF2F2",border:"rgba(220,38,38,.18)"}:Nn<65?{dot:"#D97706",num:"#D97706",label:"Suboptimerat",labelClr:"#92400E",txt:"#78350F",bg:"#FFFBEB",border:"rgba(217,119,6,.18)"}:Nn<80?{dot:"#65A30D",num:"#65A30D",label:"F\xf6rb\xe4ttringsl\xe4ge",labelClr:"#365314",txt:"#365314",bg:"#F7FEE7",border:"rgba(101,163,13,.18)"}:{dot:"#1B7A6E",num:"#1B7A6E",label:"Optimalt",labelClr:"#0E4F47",txt:"#0E4F47",bg:"#DCEEEA",border:"rgba(27,122,110,.18)"},Cn=(null===Dt||void 0===Dt?void 0:Dt.monitoringDate)&&new Date(Dt.monitoringDate)<new Date,Fn=null!==Dt&&void 0!==Dt&&Dt.servicePeriodEnd?Math.ceil((new Date(Dt.servicePeriodEnd)-new Date)/864e5):null,Tn=null!==(E=null===Dt||void 0===Dt||null===(_=Dt.recommendation)||void 0===_?void 0:_.secondarySaving)&&void 0!==E?E:null,Pn=Tn?(null!==(N=null===Dt||void 0===Dt||null===(A=Dt.recommendation)||void 0===A?void 0:A.grossSaving)&&void 0!==N?N:0)-Tn.grossSaving:null,Dn=Tn?"bredband"===Tn.category?"Bredband"+(Tn.speedMbit?` ${Tn.speedMbit} Mbit`:""):"Mobil"+(Tn.seatCount?` (${Tn.seatCount} st)`:""):null,Ln=!(null===Dt||void 0===Dt||null===(C=Dt.recommendation)||void 0===C||!C.shouldSwitch||null!==Dt&&void 0!==Dt&&null!==(F=Dt.recommendation)&&void 0!==F&&F.suggestedSupplier||null==Tn),Rn=Am(Ln?Tn.category:null!==(T=null===Dt||void 0===Dt||null===(P=Dt.categorized)||void 0===P?void 0:P.category)&&void 0!==T?T:"uncategorized"),On=Ln?`Ert ${Am(null!==(D=null===Dt||void 0===Dt||null===(L=Dt.categorized)||void 0===L?void 0:L.category)&&void 0!==D?D:"uncategorized").label.toLowerCase()} \xe4r konkurrenskraftigt \u2014 ${null!==Dn&&void 0!==Dn?Dn:"sekund\xe4rtj\xe4nsten"} kan optimeras.`:"monitoring"===(null===Dt||void 0===Dt?void 0:Dt.route)?Cn?`Avtalsl\xe5set lossnar snart${null!=Fn?` \u2014 ${Fn} dagar kvar`:""}. Arvo f\xf6rbereder omf\xf6rhandling.`:Nn>=80?"Ni betalar marknadsm\xe4ssigt i dag \u2014 Arvo bevakar och agerar inf\xf6r f\xf6rnyelsen.":`Ni betalar ${zn} % s\xe4mre \xe4n branschsnittet \u2014 Arvo f\xf6rhandlar v\xe4lf\xf6rhandlat avtalspris vid f\xf6rnyelsen.`:Nn<45?zn>0?`Ni betalar ${zn}% \xf6ver marknadspris \u2014 ${null!==(R=Rn.smfBenchmark)&&void 0!==R?R:"stor besparingspotential"}.`:"Ni betalar markant s\xe4mre \xe4n branschsnittet \u2014 stor besparingspotential.":Nn<80?zn>0?`Ni betalar ${zn}% \xf6ver marknadspris \u2014 ${null!==(O=Rn.smfBenchmark)&&void 0!==O?O:"v\xe4lf\xf6rhandlat avtalspris finns att h\xe4mta"}.`:"Ni betalar n\xe5got s\xe4mre \xe4n branschsnittet \u2014 v\xe4lf\xf6rhandlat avtalspris finns att h\xe4mta.":"Ni har ett v\xe4lf\xf6rhandlat avtal \u2014 b\xe4ttre \xe4n branschsnittet.",In=2*Math.PI*26,Mn=Nn/100*In,{score:Bn,gaugeReady:Vn}=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;const[r,a]=n.useState(!1),[i,o]=n.useState(0);return n.useEffect(()=>{if(a(!1),o(0),!e)return;const r=setTimeout(()=>{a(!0);const t=performance.now();let r;const n=a=>{const i=Math.min((a-t)/1450,1),l=1-Math.pow(1-i,3);o(Math.round(e*l)),i<1?r=requestAnimationFrame(n):o(e)};return r=requestAnimationFrame(n),()=>{r&&cancelAnimationFrame(r)}},t);return()=>clearTimeout(r)},[e,t]),{score:i,gaugeReady:r}}(Nn,400),Un=Rn.isRealPrice,Kn=!(null===Dt||void 0===Dt||null===(I=Dt.categorized)||void 0===I||!I.licensePending),Hn=Rn.partnerLabel,Wn=(null!==(M=null===Dt||void 0===Dt||null===(B=Dt.recommendation)||void 0===B?void 0:B.suggestedSupplier)&&void 0!==M?M:"").toLowerCase().trim(),qn=(null!==(V=null!==(U=null===Dt||void 0===Dt||null===(K=Dt.categorized)||void 0===K?void 0:K.normalizedSupplier)&&void 0!==U?U:null===Dt||void 0===Dt||null===(H=Dt.extracted)||void 0===H?void 0:H.supplier)&&void 0!==V?V:"").toLowerCase().trim(),Yn=Un&&Wn&&qn&&(Wn===qn||Wn.includes(qn)||qn.includes(Wn)),Gn=Yn?`S\xe4nk er ${null===Dt||void 0===Dt||null===(W=Dt.recommendation)||void 0===W?void 0:W.suggestedSupplier}-kostnad`:Un?"Aktivera bytet":"S\xe4kra besparingen",Qn=!!("auto"===(null===Dt||void 0===Dt?void 0:Dt.route)&&null!==Dt&&void 0!==Dt&&null!==(q=Dt.recommendation)&&void 0!==q&&q.suggestedAnnualCost&&!Kn&&jn>0);"auto"!==(null===Dt||void 0===Dt?void 0:Dt.route)||null===Dt||void 0===Dt||null===(Y=Dt.recommendation)||void 0===Y||Y.isOptimize;return(0,$d.jsxs)(Rm,{children:[(0,$d.jsx)(du,{variant:"public"}),Hr&&(0,$d.jsxs)("div",{style:{background:"connected"===Hr.type?"#F0FDF9":"pending"===Hr.type?"#FFFBEB":"#FEF2F2",borderBottom:"1px solid "+("connected"===Hr.type?"#6EE7D1":"pending"===Hr.type?"#FCD34D":"#FECACA"),padding:"13px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[(0,$d.jsxs)("span",{style:{fontSize:14,color:"connected"===Hr.type?"#065F46":"pending"===Hr.type?"#92400E":"#991B1B",fontWeight:600,lineHeight:1.5},children:["connected"===Hr.type&&(0,$d.jsxs)($d.Fragment,{children:["gmail"===Hr.provider?"Gmail":"Outlook"," kopplat \u2014"," ",Hr.invoices>0?`Arvo hittade ${Hr.invoices} fakturor i er inkorg. Er briefing skickas inom kort.`:"Arvo bevakar nu er inkorg. Er briefing skickas inom kort."]}),"pending"===Hr.type&&(0,$d.jsxs)($d.Fragment,{children:["gmail"===Hr.provider?"Gmail":"Outlook","-anslutning kr\xe4ver konfiguration \u2014"," ","er aktivering \xe4r mottagen och Arvo kontaktar er inom kort."]}),"error"===Hr.type&&(0,$d.jsxs)($d.Fragment,{children:["Anslutning misslyckades (",Hr.errorCode,") \u2014 f\xf6rs\xf6k igen eller kontakta hej@arvoflow.se."]})]}),(0,$d.jsx)("button",{onClick:()=>Wr(null),style:{background:"none",border:"none",cursor:"pointer",fontSize:18,lineHeight:1,opacity:.5,padding:"0 4px"},"aria-label":"St\xe4ng",children:"\xd7"})]}),(0,$d.jsxs)(Om,{children:[(0,$d.jsxs)(Im,{children:[(0,$d.jsx)("span",{className:"dot"})," Arvo Intelligence \xb7 Analys p\xe5 60 sekunder"]}),(0,$d.jsxs)(Mm,{children:["Ni betalar f\xf6r mycket. ",(0,$d.jsx)("em",{children:"En"})," faktura bevisar det."]}),(0,$d.jsx)(Bm,{children:"Arvo Intelligence j\xe4mf\xf6r er faktura mot verkliga branschpriser och visar exakt vad ni betalar f\xf6r mycket \u2014 och hos vem ni kan spara."})]}),(0,$d.jsxs)(Vm,{children:[!Dt&&(0,$d.jsx)(Um,{children:(0,$d.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),await async function(){var e,t;let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!wt)return void Pt("V\xe4lj en PDF-faktura f\xf6rst.");const n=!!(null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:localStorage.getItem("arvo_gate_passed"));if(!r&&!n){var a;const e=localStorage.getItem("arvo_had_saving"),t=parseInt(null!==(a=localStorage.getItem("arvo_successful_count"))&&void 0!==a?a:"0");if(e||t>=2)return sr("quota"),void ar(!0)}let i,o;r&&localStorage.setItem("arvo_gate_passed","1"),Pt(null),Lt(null),ar(!1),Pr(null),Lr("idle"),Ft("uploading");try{var l,s,c,d;const e=await Lg(wt),t=await Cg(),n=null!==(l=null!==(s=null!==(c=sessionStorage.getItem("arvo_bypass"))&&void 0!==c?c:localStorage.getItem("arvo_bypass"))&&void 0!==s?s:localStorage.getItem("arvo_gate_passed"))&&void 0!==l?l:void 0;let a=tr;try{var u;const e=await fetch("/api/token",{method:"POST"});a=null!==(u=(await e.json()).token)&&void 0!==u?u:tr,rr(a)}catch{}Ft("extract"),i=setTimeout(()=>Ft("categorize"),6e3),o=setTimeout(()=>Ft("recommend"),14e3);const g=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:$t,employees:Number(Et),revenue:""===Nt?null:Number(Nt),token:a,fingerprint:t,bypass:n||void 0,email:r||void 0,userEmail:jt||void 0})});clearTimeout(i),clearTimeout(o);const x=await g.json().catch(()=>({}));if(x.gate&&"saving_limit"===x.gateType)return Ft("done"),Lt(x),sr("saving_limit"),void ar(!0);if(x.gate)return Ft(null),void ar(!0);if(x.timeout)return Ft(null),void Pt("Analysen tog lite f\xf6r l\xe5ng tid just nu. V\xe4nta ett \xf6gonblick och f\xf6rs\xf6k igen \u2014 det brukar g\xe5 snabbare vid andra f\xf6rs\xf6ket.");if(429===g.status||x.rateLimited)return Ft(null),void Pt("Du har analyserat f\xf6r m\xe5nga fakturor idag (max 5/dag). Kontakta oss p\xe5 hej@arvoflow.se f\xf6r att ut\xf6ka din kvot.");if(!g.ok||!x.ok)throw new Error(x.error||`Servern returnerade ${g.status}`);if(Ft("done"),Lt(x),Ot(null!==(d=x.analysisId)&&void 0!==d?d:null),Mt(""),Vt("idle"),"auto"===x.route){var p,h;const e=parseInt(null!==(p=localStorage.getItem("arvo_successful_count"))&&void 0!==p?p:"0")+1;var f,m;if(localStorage.setItem("arvo_successful_count",String(e)),(null===(h=x.recommendation)||void 0===h?void 0:h.netSaving)>0)localStorage.setItem("arvo_had_saving","1"),(null!==(f=null!==(m=sessionStorage.getItem("arvo_bypass"))&&void 0!==m?m:localStorage.getItem("arvo_bypass"))&&void 0!==f?f:localStorage.getItem("arvo_gate_passed"))||(sr("saving"),ar(!0))}}catch(g){clearTimeout(i),clearTimeout(o),Ft(null),Pt(g.message||"N\xe5got gick fel. F\xf6rs\xf6k igen.")}}()},children:[(0,$d.jsxs)(Km,{$active:Ut,$hasFile:!!wt||nn,onClick:()=>{var e;return null===(e=yt.current)||void 0===e?void 0:e.click()},onDrop:e=>{e.preventDefault(),Kt(!1);const t=e.dataTransfer.files;(null===t||void 0===t?void 0:t.length)>1?on(t):null!==t&&void 0!==t&&t[0]&&an(t[0])},onDragOver:e=>{e.preventDefault(),Kt(!0)},onDragLeave:e=>{e.preventDefault(),Kt(!1)},role:"button",tabIndex:0,onKeyDown:e=>{var t;"Enter"!==e.key&&" "!==e.key||null===(t=yt.current)||void 0===t||t.click()},children:[(0,$d.jsx)("input",{ref:yt,type:"file",accept:"application/pdf,.pdf",multiple:!0,onChange:e=>{const t=e.target.files;(null===t||void 0===t?void 0:t.length)>1?on(t):null!==t&&void 0!==t&&t[0]&&an(t[0])}}),(0,$d.jsx)("div",{className:"icon",children:(0,$d.jsx)(bu,{name:wt||nn?"check":"upload",size:28,stroke:1.75})}),nn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{className:"primary",children:[qr.length," fakturor valda"]}),(0,$d.jsxs)("span",{className:"secondary",children:[qr.map(e=>e.name).join(", ").slice(0,80),qr.map(e=>e.name).join(", ").length>80?"\u2026":""]})]}):wt?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{className:"primary",children:"Faktura vald"}),(0,$d.jsxs)("span",{className:"filename",children:[wt.name," \xb7 ",(wt.size/1024).toFixed(0)," kB"]})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{className:"primary",children:"undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"L\xe4gg till er faktura":"Dra hit er faktura"}),(0,$d.jsxs)("span",{className:"cta-pill",children:["undefined"!==typeof navigator&&navigator.maxTouchPoints>0?"V\xe4lj faktura":"V\xe4lj fil"," \u2192"]}),(0,$d.jsx)("span",{className:"secondary",children:"PDF \xb7 max 3 MB \xb7 Vi sparar inte filen"})]})]}),(wt||nn)&&(0,$d.jsxs)(Ym,{children:[(0,$d.jsxs)(Hm,{children:[(0,$d.jsxs)(Wm,{children:[(0,$d.jsx)("span",{className:"label",children:"Bransch"}),(0,$d.jsx)("span",{className:"hint",children:"Vi j\xe4mf\xf6r mot bolag av er storlek i samma bransch."}),(0,$d.jsx)("select",{value:$t,onChange:e=>zt(e.target.value),children:Object.entries(Tg).map(e=>{let[t,r]=e;return(0,$d.jsx)("option",{value:t,children:r},t)})})]}),(0,$d.jsxs)(Wm,{children:[(0,$d.jsx)("span",{className:"label",children:"Antal anst\xe4llda"}),(0,$d.jsx)("span",{className:"hint",children:"Prisniv\xe5n varierar med bolagets storlek."}),(0,$d.jsx)("input",{type:"number",min:"1",max:"5000",value:Et,onChange:e=>_t(e.target.value)})]})]}),Tt&&(0,$d.jsx)(Jm,{children:Tt}),(0,$d.jsx)(qm,{children:nn?(0,$d.jsx)(Id,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:tn,onClick:async()=>{var e,t;if(qr.length<2)return;en(null),Qr({status:"processing",total:qr.length,done:0,failed:0}),Xr(qr.map((e,t)=>({index:t,filename:e.name,status:"pending"}))),rn(!0);let r=tr;try{var n;const e=await fetch("/api/token",{method:"POST"});r=null!==(n=(await e.json()).token)&&void 0!==n?n:tr,rr(r)}catch{}const a=null!==(e=null!==(t=sessionStorage.getItem("arvo_bypass"))&&void 0!==t?t:localStorage.getItem("arvo_bypass"))&&void 0!==e?e:void 0;let i=0,o=0;for(let c=0;c<qr.length;c++){Xr(e=>e.map((e,t)=>t===c?{...e,status:"extracting"}:e));try{var l;const e=await Lg(qr[c]),t=await fetch("/api/test-invoice",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfBase64:e,industry:$t,employees:parseInt(Et,10)||5,token:null!==(l=r)&&void 0!==l?l:"dev",bypass:a})}),n=await t.json();n.route?(i++,Xr(e=>e.map((e,t)=>t===c?{...e,status:"done",route:n.route,extracted:n.extracted,categorized:n.categorized,recommendation:n.recommendation}:e))):(o++,Xr(e=>e.map((e,t)=>{var r;return t===c?{...e,status:"failed",error:null!==(r=n.error)&&void 0!==r?r:"Analys misslyckades"}:e})))}catch(s){o++,Xr(e=>e.map((e,t)=>t===c?{...e,status:"failed",error:s.message}:e))}Qr({status:c===qr.length-1?"done":"processing",total:qr.length,done:i,failed:o})}rn(!1)},children:tn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Xm,{})," Analyserar ",qr.length," fakturor\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Analysera ",qr.length," fakturor ",(0,$d.jsx)(bu,{name:"arrow",size:18})]})}):(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:dn||!wt,children:dn?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Xm,{})," Analyserar\u2026"]}):(0,$d.jsxs)($d.Fragment,{children:["Analysera fakturan ",(0,$d.jsx)(bu,{name:"arrow",size:18})]})})})]}),dn&&(0,$d.jsx)(Zm,{children:Dg.map(e=>{const t=(e=>{if(!Ct)return"pending";if("done"===Ct)return"done";const t=["uploading","extract","categorize","recommend"],r=t.indexOf(Ct),n=t.indexOf(e);return n<r?"done":n===r?"active":"pending"})(e.id);return(0,$d.jsxs)(eg,{$state:t,children:[(0,$d.jsx)("div",{className:"bullet",children:"done"===t?(0,$d.jsx)(bu,{name:"check",size:14,stroke:2.5}):(0,$d.jsx)("span",{children:Dg.findIndex(t=>t.id===e.id)+1})}),(0,$d.jsxs)("div",{className:"label",children:[e.label,"active"===t&&e.sublabel&&(0,$d.jsx)("div",{style:{fontSize:11,opacity:.6,marginTop:2,fontWeight:400},children:e.sublabel})]}),(0,$d.jsx)("div",{className:"time",children:"done"===t?"\u2713":"active"===t?"\u2026":""})]},e.id)})}),(0,$d.jsxs)(Qm,{children:["Genom att forts\xe4tta godk\xe4nner du v\xe5ra ",(0,$d.jsx)(vl,{to:"/villkor",children:"villkor"})," ","och v\xe5r ",(0,$d.jsx)(vl,{to:"/integritet",children:"integritetspolicy"}),". Fakturan analyseras av Arvo Intelligence och raderas omedelbart efter analysen."]})]})}),nn&&(Gr||Zr)&&(0,$d.jsxs)(Um,{style:{marginTop:20},children:[(0,$d.jsx)(kg,{children:(0,$d.jsxs)("div",{children:[(0,$d.jsxs)("span",{className:"badge",children:[(0,$d.jsx)(bu,{name:"spark",size:10})," Batch-analys"]}),(0,$d.jsx)("h3",{children:"done"===(null===Gr||void 0===Gr?void 0:Gr.status)?"Analys klar":"failed"===(null===Gr||void 0===Gr?void 0:Gr.status)?"Analys misslyckades":"Analyserar fakturor\u2026"}),(0,$d.jsx)("div",{className:"sub",children:Gr?`${null!==(G=Gr.done)&&void 0!==G?G:0} av ${Gr.total} klara${Gr.failed?` \xb7 ${Gr.failed} misslyckades`:""}`:Zr||`${qr.length} fakturor k\xf6ade`})]})}),Gr&&(0,$d.jsx)(jg,{$pct:Gr.total>0?Math.round(((null!==(Q=Gr.done)&&void 0!==Q?Q:0)+(null!==(J=Gr.failed)&&void 0!==J?J:0))/Gr.total*100):0,children:(0,$d.jsx)("div",{className:"fill"})}),Zr&&(0,$d.jsx)(Jm,{style:{marginBottom:16},children:Zr}),"done"===(null===Gr||void 0===Gr?void 0:Gr.status)&&(()=>{const e=Jr.filter(e=>{var t;return null===e||void 0===e||null===(t=e.recommendation)||void 0===t?void 0:t.shouldSwitch}),t=e.reduce((e,t)=>{var r,n;return e+(null!==(r=null===(n=t.recommendation)||void 0===n?void 0:n.netSaving)&&void 0!==r?r:0)},0),r=Jr.filter(e=>"review_queue"===(null===e||void 0===e?void 0:e.route)).length;return(0,$d.jsxs)($g,{children:[(0,$d.jsxs)("div",{className:"stat highlight",children:[(0,$d.jsxs)("div",{className:"value",children:[zu(Math.round(t/1e3)),"k"]}),(0,$d.jsx)("div",{className:"label",children:"Nettobesparing/\xe5r"})]}),(0,$d.jsxs)("div",{className:"stat",children:[(0,$d.jsx)("div",{className:"value",children:e.length}),(0,$d.jsx)("div",{className:"label",children:"Rekommenderar byte"})]}),(0,$d.jsxs)("div",{className:"stat",children:[(0,$d.jsx)("div",{className:"value",children:r}),(0,$d.jsx)("div",{className:"label",children:"Kr\xe4ver granskning"})]})]})})(),(0,$d.jsx)(wg,{children:(Jr.length>0?Jr:qr.map((e,t)=>({index:t,filename:e.name,status:"pending"}))).map((e,t)=>{var r,n,a,i,o,l,s;const c=null!==(r=null===e||void 0===e?void 0:e.status)&&void 0!==r?r:"pending",d=null!==(n=null===e||void 0===e||null===(a=e.recommendation)||void 0===a?void 0:a.netSaving)&&void 0!==n?n:null,u="done"===c?"check":"failed"===c?"x":"processing"===c?"spark":"file",p="done"===c?"review_queue"===e.route?"Kr\xe4ver granskning":"unsupported"===e.route?"Utanf\xf6r scope":"Klar":"failed"===c?"Misslyckades":"processing"===c?"Kategoriserar\u2026":"extracting"===c?"L\xe4ser faktura\u2026":"V\xe4ntar\u2026";return(0,$d.jsxs)(Sg,{$status:c,children:[(0,$d.jsx)("div",{className:"icon-wrap",children:(0,$d.jsx)(bu,{name:u,size:14,stroke:2})}),(0,$d.jsx)("span",{className:"name",children:null!==(o=null!==(l=null===e||void 0===e?void 0:e.filename)&&void 0!==l?l:null===(s=qr[t])||void 0===s?void 0:s.name)&&void 0!==o?o:`Faktura ${t+1}`}),(0,$d.jsx)("span",{className:"status-label",children:p}),d>0&&(0,$d.jsxs)("span",{className:"saving",children:["\u2212",zu(d)," kr/\xe5r"]})]},null!==(i=null===e||void 0===e?void 0:e.index)&&void 0!==i?i:t)})}),"done"!==(null===Gr||void 0===Gr?void 0:Gr.status)&&"failed"!==(null===Gr||void 0===Gr?void 0:Gr.status)&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#888",textAlign:"center",margin:0},children:"Arvo analyserar fakturorna i bakgrunden. Uppdateras var 5:e sekund."})]}),Dt&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(Um,{ref:kt,children:[(0,$d.jsxs)(tg,{children:[(0,$d.jsxs)("div",{className:"bh-top",children:[(0,$d.jsxs)("span",{className:"bh-stamp",children:["Arvo-analys \xb7 ",(new Date).toLocaleDateString("sv-SE",{day:"numeric",month:"short",year:"numeric"}).toUpperCase()]}),(0,$d.jsx)("button",{className:"bh-dl",onClick:()=>Sr(!0),title:"Ladda ner analys",children:(0,$d.jsx)("svg",{width:13,height:13,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round",children:(0,$d.jsx)("path",{d:"M12 5v14M5 12l7 7 7-7"})})})]}),(0,$d.jsx)("div",{className:"bh-main",children:(0,$d.jsx)("h2",{className:"bh-supplier",children:Dt.extracted.supplier})}),(0,$d.jsx)("div",{className:"bh-row",children:Dt.categorized&&(0,$d.jsxs)("span",{className:"bh-chip",children:["natavgift"===Dt.reason?"N\xe4tavgift":null!=Tn?`${Am(Dt.categorized.category).label} & ${Dn}`:Am(Dt.categorized.category).label||Dt.categorized.category,Dt.categorized.subType&&"natavgift"!==Dt.reason&&null==Tn?` \xb7 ${Dt.categorized.subType}`:""]})})]}),"monitoring"===Dt.route?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(yg,{style:{"--diag-color":An.dot},children:[(0,$d.jsxs)("div",{className:"gauge-wrap",children:[(0,$d.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E5E7EB",strokeWidth:"4.5"}),(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:An.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:`${Mn} ${In}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1s ease"}})]}),(0,$d.jsxs)("div",{className:"gauge-num",style:{color:An.dot},children:[(0,$d.jsx)("span",{className:"gauge-val",children:Nn}),(0,$d.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$d.jsxs)("div",{className:"diag-body",children:[(0,$d.jsxs)("div",{className:"diag-top",children:[(0,$d.jsx)("span",{className:"diag-score-label",children:"Arvo Score"}),(0,$d.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$d.jsxs)("span",{className:"diag-status",children:[(0,$d.jsx)(bu,{name:"alert-circle",size:13,color:An.dot,stroke:2}),(0,$d.jsx)("span",{className:"diag-label",style:{color:An.labelClr},children:An.label})]})]}),(0,$d.jsx)("p",{className:"diag-text",children:On})]})]}),(0,$d.jsxs)(sg,{children:[(0,$d.jsxs)("div",{className:"monitoring-kicker",children:[(0,$d.jsx)("span",{className:"monitoring-dot"}),"Bevakning aktiverad"]}),"fixed_price"===Dt.contractType?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{children:["Fastprisavtal \u2014 bundet t.o.m. ",Dt.servicePeriodEnd?new Date(Dt.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):Dt.servicePeriodEnd,"."]}),(0,$d.jsx)("p",{children:Cn?`Fastprisavtal kan inte avslutas i f\xf6rtid. Avtalet l\xf6per ut om ${null!=Fn?`${Fn} dagar`:"kort tid"} \u2014 Arvo initierar nu f\xf6rhandling om nytt avtal.`:`Fastprisavtal kan inte avslutas i f\xf6rtid. Arvo bevakar avtalet och p\xe5minner er ${Dt.monitoringDate?new Date(Dt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):"3 m\xe5nader"} innan slutdatum s\xe5 ni hinner f\xf6rhandla fram ett nytt avtal i r\xe4tt tid.`})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:Cn?"Avtalet l\xf6per ut snart \u2014 Arvo agerar nu.":null!=Dt.cancellationNoticeDays?"Avtalet \xe4r l\xe5st \u2014 vi l\xe4gger det p\xe5 bevakning.":"\xc5rsavtal \u2014 Arvo bevakar inf\xf6r f\xf6rnyelse."}),(0,$d.jsx)("p",{children:(()=>{const e=Dt.servicePeriodEnd,t=Dt.cancellationNoticeDays,r=Dt.monitoringDate,n=e?new Date(e).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"}):null,a=r?new Date(r).toLocaleDateString("sv-SE",{year:"numeric",month:"long"}):null;return Cn?`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}${null!=Fn?` (${Fn} dagar kvar)`:""}. Arvo initierar omf\xf6rhandling och s\xe4krar b\xe4sta villkor innan f\xf6rnyelse.`:null!=t?`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}. Upps\xe4gningstiden (${t} dagar) har redan passerat. Arvo initierar omf\xf6rhandling ${null!==a&&void 0!==a?a:"90 dagar innan n\xe4sta f\xf6rnyelse"}.`:`Avtalet l\xf6per t.o.m. ${null!==n&&void 0!==n?n:e}. Vi p\xe5minner er i ${null!==a&&void 0!==a?a:"90 dagar innan slutdatum"} \u2014 i god tid f\xf6r att agera n\xe4r avtalet l\xf6per ut.`})()})]})]}),(0,$d.jsxs)(ug,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsxs)("dt",{children:["Ni betalar idag",Am(null===(X=Dt.categorized)||void 0===X?void 0:X.category).elSuffix?" (energidel)":""]}),(0,$d.jsxs)("dd",{children:[zu(Dt.extracted.annualCost)," / \xe5r","annual"!==Dt.extracted.billingPeriod&&(0,$d.jsx)("small",{style:{fontStyle:"italic"},children:"Projicerat fr\xe5n abonnemangsradernas listpris"})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturadatum"}),(0,$d.jsx)("dd",{children:Dt.extracted.date})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$d.jsx)("dd",{children:zu(Dt.extracted.amount)})]}),Dt.extracted.servicePeriodEnd&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Avtalstid t.o.m."}),(0,$d.jsx)("dd",{children:new Date(Dt.extracted.servicePeriodEnd).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"})})]}),Dt.monitoringDate&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:Cn?"Bevakning":"Arvo p\xe5minner er"}),(0,$d.jsx)("dd",{children:Cn?null!=Fn?`Aktiv \u2014 avtal l\xf6per ut om ${Fn} dagar`:"Aktiv":(()=>{const e=new Date(Dt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long",day:"numeric"});return e.charAt(0).toUpperCase()+e.slice(1)})()})]})]}),((null===(Z=Dt.categorized)||void 0===Z?void 0:Z.reasoning)||Dt.potentialSavingNote)&&(0,$d.jsxs)(mg,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Avtals\xf6versikt"}),(null===(ee=Dt.categorized)||void 0===ee?void 0:ee.reasoning)&&(0,$d.jsxs)("p",{children:[Dt.categorized.normalizedSupplier||(null===(te=Dt.extracted)||void 0===te?void 0:te.supplier)," fakturerar"," ",zu(null===(re=Dt.extracted)||void 0===re?void 0:re.annualCost)," per \xe5r f\xf6r"," ",Am(Dt.categorized.category).inlineLabel,"."," ","Avtalet \xe4r bevakat \u2014 Arvo tar kontakt"," ",null!=Fn&&Fn<=90?"nu inf\xf6r f\xf6rest\xe5ende f\xf6rnyelse":Dt.monitoringDate&&!Cn?`fr\xe5n ${new Date(Dt.monitoringDate).toLocaleDateString("sv-SE",{year:"numeric",month:"long"})}`:"inf\xf6r avtalets f\xf6rnyelse"," ","och s\xe4krar b\xe4sta villkor utan att ni beh\xf6ver l\xe4gga tid p\xe5 det."]}),Dt.potentialSavingNote&&(0,$d.jsxs)("p",{style:{marginTop:null!==(ne=Dt.categorized)&&void 0!==ne&&ne.reasoning?10:0},children:[(0,$d.jsx)("strong",{children:"Potentiell nettobesparing vid avtalets slut:"})," ",Dt.potentialSavingNote]})]})]}):"unsupported"===Dt.route?(0,$d.jsx)(og,{children:"natavgift"===Dt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"N\xe4tavgift \u2014 reglerat monopol, kan inte f\xf6rhandlas."}),(0,$d.jsxs)("p",{children:["Denna faktura \xe4r fr\xe5n er lokala n\xe4t\xe4gare (",null!==(ae=null===(ie=Dt.extracted)||void 0===ie?void 0:ie.supplier)&&void 0!==ae?ae:"n\xe4tbolaget",") och avser eln\xe4tets distributionskostnad. N\xe4tavgiften best\xe4ms av Energimarknadsinspektionen och \xe4r geografiskt bunden \u2014 den kan inte p\xe5verkas genom ett elleverant\xf6rsbyte."]}),(0,$d.jsxs)("p",{children:["Ladda upp er ",(0,$d.jsx)("strong",{children:"elhandelsfaktura"})," (fr\xe5n er elleverant\xf6r) f\xf6r att se om ni betalar r\xe4tt pris f\xf6r sj\xe4lva elen."]})]}):"credit_note"===Dt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Kreditnota \u2014 ingen analys m\xf6jlig."}),(0,$d.jsx)("p",{children:"Filen verkar vara en kreditnota med negativt belopp. Ladda upp den ordinarie fakturan f\xf6r en korrekt analys."})]}):"insurance"===Dt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"F\xf6rs\xe4kringar hanteras inte av Arvo \xe4nnu."}),(0,$d.jsx)("p",{children:"F\xf6rs\xe4kringsf\xf6rmedling kr\xe4ver tillst\xe5nd fr\xe5n Finansinspektionen. Arvo planerar att ans\xf6ka om detta tillst\xe5nd under 2027 \u2014 tills dess analyserar vi inte f\xf6rs\xe4kringsfakturor. Ladda upp en annan leverant\xf6rsfaktura f\xf6r att komma ig\xe5ng."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Utanf\xf6r analysr\xe4ckvidden."}),(0,$d.jsx)("p",{children:"Denna faktura avser en tj\xe4nst vi inte optimerar (t.ex. juridik, redovisning, bemanning eller myndighetsavgifter). Koppla Fortnox / Visma f\xf6r att analysera era \xf6vriga leverant\xf6rer."})]})}):"review_queue"===Dt.route?(0,$d.jsxs)(og,{children:["volume_data_required"===Dt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Kr\xe4ver offert \u2014 v\xe5ra experter kikar p\xe5 detta."}),(0,$d.jsx)("p",{children:Dt.volumeDataNote||"Kostnaden f\xf6r denna kategori styrs av specifika volymer och specifikationer, inte antalet anst\xe4llda. V\xe5ra experter kikar p\xe5 detta manuellt f\xf6r att ge er en r\xe4ttvis analys."}),null!=Dt.creditExpiryMonths&&(0,$d.jsxs)(cg,{style:Dt.creditWillExpireUnused?{background:"#FEF3C7",borderColor:"rgba(217,119,6,.25)"}:void 0,children:[(0,$d.jsx)("strong",{children:Dt.creditWillExpireUnused?`\u26a0 Krediter f\xf6rfaller ${Dt.creditExpiryDate} \u2014 ${Dt.creditExpiryMonths} ${1===Dt.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} kvar`:`Era startup-krediter r\xe4cker ca ${Dt.creditExpiryMonths} ${1===Dt.creditExpiryMonths?"m\xe5nad":"m\xe5nader"} till`}),(0,$d.jsxs)("p",{children:["Ni f\xf6rbrukar ",Dt.startupCreditCurrency," ",null===(oe=Dt.startupCreditMonthlyBurn)||void 0===oe?void 0:oe.toLocaleString("sv-SE"),"/m\xe5n men betalar ingenting tack vare kvarvarande kredit (",Dt.startupCreditCurrency," ",null===(le=Dt.startupCreditBalance)||void 0===le?void 0:le.toLocaleString("sv-SE"),").",Dt.creditWillExpireUnused?` Vid nuvarande f\xf6rbrukningstakt f\xf6rfaller ca ${Dt.startupCreditCurrency} ${null===(se=Dt.creditUnusedAmount)||void 0===se?void 0:se.toLocaleString("sv-SE")} oanv\xe4nt. \xd6verv\xe4g att skala upp era resurser eller kontakta leverant\xf6ren om f\xf6rl\xe4ngning \u2014 sedan hj\xe4lper Arvo er att f\xf6rhandla r\xe4tt pris.`:" Nu \xe4r r\xe4tt tid att planera ert molnavtal \u2014 vi hj\xe4lper er att f\xf6rhandla r\xe4tt pris innan fakturorna b\xf6rjar landa."]})]})]}):"foreign_currency"===Dt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("strong",{children:["Fakturan \xe4r i ",Dt.currency," \u2014 kontakta oss."]}),(0,$d.jsx)("p",{children:"Vi st\xf6djer SEK och EUR. F\xf6r \xf6vriga valutor, kontakta oss s\xe5 hj\xe4lper vi er manuellt."})]}):"no_benchmark"===Dt.reason?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Utanf\xf6r v\xe5r nuvarande t\xe4ckning."}),(0,$d.jsx)("p",{children:"Vi har \xe4nnu inte benchmarkdata f\xf6r denna leverant\xf6rskategori. Vi noterar fakturan och \xe5terkommer n\xe4r vi kan g\xf6ra en fullst\xe4ndig analys."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("strong",{children:"Fakturan beh\xf6ver djupare analys."}),(0,$d.jsx)("p",{children:"V\xe5r algoritm \xe4r inte tillr\xe4ckligt s\xe4ker p\xe5 klassificeringen f\xf6r att visa automatiska besparingssiffror. Koppla Fortnox / Visma f\xf6r en komplett, felfri analys av hela er leverant\xf6rsreskontra."})]}),"sent"===Cr?(0,$d.jsx)("p",{style:{fontSize:13,color:"#1B6E66",fontWeight:600,marginTop:14,marginBottom:0},children:"\u2713 Vi h\xf6r av oss n\xe4r analysen \xe4r klar!"}):(0,$d.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Nr&&"idle"===Cr){Fr("submitting");try{await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:Nr,source:"review_queue",reason:null===Dt||void 0===Dt?void 0:Dt.reason})}),Fr("sent")}catch{Fr("sent")}}},style:{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@email.se \u2014 vi meddelar n\xe4r vi har ett svar",value:Nr,onChange:e=>Ar(e.target.value),required:!0,style:{flex:1,minWidth:180,padding:"9px 14px",borderRadius:100,border:"1.5px solid #D5E2DC",fontSize:13,outline:"none",background:"#fff",color:"#0E1A17"}}),(0,$d.jsx)("button",{type:"submit",disabled:!Nr||"submitting"===Cr,style:{padding:"9px 18px",borderRadius:100,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#5DD6CA,#1B6E66)",color:"#fff",fontSize:13,fontWeight:700,opacity:Nr&&"submitting"!==Cr?1:.55},children:"submitting"===Cr?"Skickar\u2026":"Meddela mig \u2192"})]})]}):null!==(ce=Dt.recommendation)&&void 0!==ce&&ce.requiresQuote?(0,$d.jsxs)($d.Fragment,{children:[((null===(de=Dt.recommendation)||void 0===de?void 0:de.clickRateAnalysis)||(null===(ue=Dt.recommendation)||void 0===ue?void 0:ue.shouldSwitch)&&(null!==(pe=null===(he=Dt.recommendation)||void 0===he?void 0:he.netSaving)&&void 0!==pe?pe:0)>0)&&(0,$d.jsx)($d.Fragment,{children:(0,$d.jsxs)(mg,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Vad analysen visar"}),(0,$d.jsx)("p",{children:Dt.recommendation.reasoning})]})}),(null===(fe=Dt.recommendation)||void 0===fe||null===(me=fe.clickRateAnalysis)||void 0===me?void 0:me.estimatedAnnualSavingsGross)>0?(0,$d.jsxs)(ng,{children:[(0,$d.jsxs)("div",{className:"estimate-header",children:[(0,$d.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$d.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$d.jsxs)("span",{className:"amount",children:["\u2248 +",Ng(Math.round(.8*Dt.recommendation.clickRateAnalysis.estimatedAnnualSavingsGross)),"\xa0kr/\xe5r"]}),(0,$d.jsx)("span",{className:"unit",children:"Baserat p\xe5 er faktiska klickkostnad \xd7 12 m\xe5nader \xb7 exakt belopp bekr\xe4ftas med offert"})]}):(null!==(ge=null===(xe=Dt.recommendation)||void 0===xe?void 0:xe.netSaving)&&void 0!==ge?ge:0)>0?(0,$d.jsxs)(ng,{children:[(0,$d.jsxs)("div",{className:"estimate-header",children:[(0,$d.jsx)("span",{className:"kicker",children:"Identifierat besparingsgap"}),(0,$d.jsx)("span",{className:"estimate-badge",children:"Uppskattning"})]}),(0,$d.jsxs)("span",{className:"amount",children:["\u2248 +",Ng(Dt.recommendation.netSaving),"\xa0kr/\xe5r"]}),(0,$d.jsx)("span",{className:"unit",children:"J\xe4mf\xf6rt mot v\xe4lf\xf6rhandlat B2B-avtal \xb7 bekr\xe4ftas med faktisk offert"})]}):null,(0,$d.jsxs)(og,{children:[(0,$d.jsx)("strong",{children:null!==(ve=Dt.recommendation)&&void 0!==ve&&ve.clickRateAnalysis?"Ber\xe4kna exakt besparing per \xe5r":(null!==(be=null===(ye=Dt.recommendation)||void 0===ye?void 0:ye.netSaving)&&void 0!==be?be:0)>0?"S\xe4kra besparingen \u2014 kr\xe4ver offert":"Kr\xe4ver offert \u2014 volymdata beh\xf6vs."}),(0,$d.jsx)("p",{children:null!==(ke=Dt.recommendation)&&void 0!==ke&&ke.clickRateAnalysis?"Klickpriset \xe4r fastslaget. Fyll i nedan s\xe5 ber\xe4knar Arvo det exakta beloppet inklusive maskinleasing.":(null!==(je=null===(we=Dt.recommendation)||void 0===we?void 0:we.netSaving)&&void 0!==je?je:0)>0?"Fyll i era uppgifter \u2014 Arvo beg\xe4r in och sammanst\xe4ller offerter fr\xe5n rikst\xe4ckande avfallspartners.":Dt.recommendation.reasoning}),(0,$d.jsx)(lg,{onSubmit:e=>{e.preventDefault(),xr&&br&&"idle"===kr&&(jr("sent"),setTimeout(()=>{if(!kt.current)return;const e=kt.current.getBoundingClientRect().top+window.pageYOffset-16;window.scrollTo({top:e,behavior:"smooth"})},50),fetch("/api/quote-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contactEmail:xr.trim().toLowerCase(),contactName:hr.trim()||void 0,contactCompany:mr.trim()||void 0,mandateAccepted:!0,extractedData:null===Dt||void 0===Dt?void 0:Dt.extracted,categorized:null===Dt||void 0===Dt?void 0:Dt.categorized})}).catch(e=>console.error("[quote-request]",e)))},children:"sent"===kr?(0,$d.jsxs)("div",{className:"qlf-sent",children:[(0,$d.jsx)(bu,{name:"check",size:16,stroke:2.5}),"Tack! Bekr\xe4ftelse \xe4r skickad till din e-post. Vi \xe5terkommer med offerter inom 1\u20132 arbetsdagar."]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{className:"qlf-fields",children:[(0,$d.jsx)("input",{type:"text",placeholder:"Ditt namn",value:hr,onChange:e=>fr(e.target.value)}),(0,$d.jsx)("input",{type:"text",placeholder:"F\xf6retag",value:mr,onChange:e=>gr(e.target.value)}),(0,$d.jsx)("input",{className:"qlf-full",type:"email",placeholder:"Din e-post (dit skickar vi offertsammanst\xe4llningen)",required:!0,value:xr,onChange:e=>vr(e.target.value)})]}),(0,$d.jsxs)("label",{className:"qlf-mandate",children:[(0,$d.jsx)("input",{type:"checkbox",checked:br,onChange:e=>yr(e.target.checked)}),(0,$d.jsxs)("span",{children:["Jag ger ",(0,$d.jsx)("em",{children:"Arvo Flow"})," fullmakt att beg\xe4ra in, sammanst\xe4lla och presentera offerter fr\xe5n leverant\xf6rer \xe5 mitt bolags v\xe4gnar."]})]}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"sm",disabled:"submitting"===kr||!br,style:{width:"100%",justifyContent:"center"},children:"submitting"===kr?"Startar...":"Starta offertprocessen \u2192"}),(0,$d.jsx)("p",{className:"qlf-zero-risk",children:"Ni betalar ingenting om vi inte hittar besparingar \u2014 20\xa0% av identifierad besparing."})]})})]})]}):un?(0,$d.jsx)($d.Fragment,{children:(0,$d.jsxs)(rg,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Dold kostnad hittad"}),(0,$d.jsxs)("span",{className:"amount",children:["+",zu(fn)]}),(0,$d.jsxs)("span",{className:"unit",children:["Ni betalar ",Ng(pn)," kr/\xe5r f\xf6r en tj\xe4nst som redan ing\xe5r i er licens"," ","\xb7 Arvos besparingsarvode ",zu(hn)," (20 %)"]})]})}):null!==(Se=Dt.recommendation)&&void 0!==Se&&Se.shouldSwitch&&(null===($e=Dt.recommendation)||void 0===$e?void 0:$e.netSaving)>0?(0,$d.jsx)($d.Fragment,{children:((e,t,r,n,a,i)=>{const o=Rn.isRealPrice,l=Dt.categorized.licensePending,s=(Rn.partnerLabel,(null!==(e=Dt.recommendation.suggestedSupplier)&&void 0!==e?e:"").toLowerCase().trim()),c=(null!==(t=null!==(r=null===(n=Dt.categorized)||void 0===n?void 0:n.normalizedSupplier)&&void 0!==r?r:null===(a=Dt.extracted)||void 0===a?void 0:a.supplier)&&void 0!==t?t:"").toLowerCase().trim();o&&s&&c&&(s===c||s.includes(c)||c.includes(s))&&Dt.recommendation.suggestedSupplier;return(0,$d.jsxs)($d.Fragment,{children:[On&&(0,$d.jsxs)(yg,{style:{"--diag-color":An.dot},children:[(0,$d.jsxs)("div",{className:"gauge-wrap",children:[(0,$d.jsxs)("svg",{className:"gauge-svg",width:"60",height:"60",viewBox:"0 0 60 60",children:[(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:"#E9F1ED",strokeWidth:"4.5"}),(0,$d.jsx)("circle",{cx:"30",cy:"30",r:26,fill:"none",stroke:An.dot,strokeWidth:"4.5",strokeLinecap:"round",strokeDasharray:Vn?`${Bn/100*In} ${In}`:`0 ${In}`,style:{transform:"rotate(-90deg)",transformOrigin:"30px 30px",transition:"stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)"}})]}),(0,$d.jsxs)("div",{className:"gauge-num",style:{color:An.dot},children:[(0,$d.jsx)("span",{className:"gauge-val",children:Bn}),(0,$d.jsx)("span",{className:"gauge-denom",children:"/100"})]})]}),(0,$d.jsxs)("div",{className:"diag-body",children:[(0,$d.jsxs)("div",{className:"diag-top",children:[(0,$d.jsx)("span",{className:"diag-score-label",children:"Arvo Score\u2122"}),(0,$d.jsx)("span",{className:"diag-sep",children:"\xb7"}),(0,$d.jsxs)("span",{className:"diag-status",children:[(0,$d.jsx)(bu,{name:"alert-circle",size:13,color:An.dot,stroke:2}),(0,$d.jsx)("span",{className:"diag-label",style:{color:An.labelClr},children:An.label})]})]}),(0,$d.jsx)("p",{className:"diag-text",children:On})]})]}),(0,$d.jsxs)(rg,{children:[(0,$d.jsx)("span",{className:"kicker",children:l?"M\xf6jlig \xe5rlig besparing":"Din identifierade nettobesparing"}),(0,$d.jsxs)("span",{className:"amount",children:["+",zu(wn)]}),(0,$d.jsx)("span",{className:"unit",children:l?"F\xf6rs\xe4kring kr\xe4ver FI-licens \u2014 vi byter inte sj\xe4lva \xe4nnu, men visar gapet.":o&&Dt.recommendation.suggestedSupplier?(0,$d.jsxs)($d.Fragment,{children:[Ng(bn)," \u2192 ",Ng(Dt.recommendation.suggestedAnnualCost)," kr/\xe5r hos ",(0,$d.jsx)("strong",{children:Dt.recommendation.suggestedSupplier})," ","\xb7 Arvos besparingsarvode ",zu(kn)," (20 %)",vn&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("br",{}),(0,$d.jsxs)("small",{style:{opacity:.85},children:["Avser abonnemang och licenser. Om ",Dt.recommendation.suggestedSupplier," absorberar er h\xe5rdvaruskuld (",Ng(xn)," kr) uppg\xe5r nettobesparing till ",zu(Dt.recommendation.netSaving)," kr/\xe5r."]})]})]}):(0,$d.jsxs)($d.Fragment,{children:[Ng(bn)," \u2192 ",Ng(Dt.recommendation.suggestedAnnualCost)," kr/\xe5r (Arvos kalkylerade riktpris)"," ","\xb7 Arvos besparingsarvode ",zu(kn)," (20 %)"]})})]}),!l&&(0,$d.jsx)(ag,{$compact:!0,children:"list-verified"===Rn.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Arvo f\xf6rhandlar ytterligare rabatter vid ett faktiskt leverant\xf6rsbyte.":null!==(i=Rn.benchmarkNote)&&void 0!==i?i:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner."})]})})()}):"uncategorized"===(null===(ze=Dt.categorized)||void 0===ze?void 0:ze.category)?(0,$d.jsxs)(og,{children:[(0,$d.jsx)("strong",{children:"Kategorin \xe4r under analys."}),(0,$d.jsx)("p",{children:"Koppla Fortnox / Visma s\xe5 mappar vi era volymer mot marknadens b\xe4sta priser direkt."})]}):(0,$d.jsx)($d.Fragment,{children:(null===(Ee=Dt.recommendation)||void 0===Ee?void 0:Ee.monitoringNote)&&(0,$d.jsx)(og,{style:{marginTop:0},children:Dt.recommendation.monitoringNote})}),(null===(_e=Dt.recommendation)||void 0===_e?void 0:_e.reasoning)&&(null===(Ne=Dt.recommendation)||void 0===Ne?void 0:Ne.shouldSwitch)&&!un&&!Ln&&(0,$d.jsxs)(mg,{children:[(0,$d.jsx)("span",{className:"kicker",children:"Arvo bed\xf6mer"}),(0,$d.jsx)("p",{children:Am(Dt.categorized.category).isRealPrice?Dt.recommendation.reasoning:Fg(Dt.recommendation.reasoning,Dt.recommendation.suggestedSupplier)})]}),(null===(Ae=Dt.recommendation)||void 0===Ae?void 0:Ae.shouldSwitch)&&!un&&((e,t)=>{const r=null===(e=Dt.extracted)||void 0===e?void 0:e.seatCount,n=Number(Et),a=null!=r&&r>n?r-n:0,i=Am(null===(t=Dt.categorized)||void 0===t?void 0:t.category);return a>0?(0,$d.jsx)(Og,{seatCount:r,employees:n,overage:a,term:i.unit,termSing:i.unitSingular}):null})(),(0,$d.jsx)(Gm,{onClick:()=>Or(e=>!e),children:Rr?"\u2191 D\xf6lj underlag":"\u2193 Hur vi r\xe4knar"}),Rr&&(0,$d.jsxs)($d.Fragment,{children:["auto"===Dt.route&&!(null!==(Ce=Dt.categorized)&&void 0!==Ce&&Ce.licensePending)&&!(null!==(Fe=Dt.recommendation)&&void 0!==Fe&&Fe.shouldSwitch&&(null===(Te=Dt.recommendation)||void 0===Te?void 0:Te.netSaving)>0&&!un)&&(0,$d.jsx)(ag,{children:"list-verified"===Rn.benchmarkType?"Priset baseras p\xe5 verifierade offentliga listpriser hos ledande leverant\xf6rer. Arvo f\xf6rhandlar ytterligare rabatter vid ett faktiskt leverant\xf6rsbyte.":null!==(Pe=Rn.benchmarkNote)&&void 0!==Pe?Pe:"Uppskattad besparing baserad p\xe5 Arvos branschdata \u2014 exakt utfall via offert fr\xe5n Arvo-verifierad partner."}),"auto"===Dt.route&&!(null!==(De=Dt.categorized)&&void 0!==De&&De.licensePending)&&!Rn.isRealPrice&&Dt.savingRange&&(0,$d.jsxs)(bg,{children:[(0,$d.jsx)("span",{className:"range-label",children:"Intervall:"}),Ng(Dt.savingRange.low)," \u2013 ",Ng(Dt.savingRange.high)," kr/\xe5r netto"]}),"auto"===Dt.route&&!(null!==(Le=Dt.categorized)&&void 0!==Le&&Le.licensePending)&&Dt.calculationChain&&(0,$d.jsx)(Rg,{cc:Dt.calculationChain}),(null===(Re=Dt.extracted)||void 0===Re?void 0:Re.potentialMixedCategories)&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#9CA3AF",marginBottom:14,lineHeight:1.5,fontStyle:"italic"},children:Tn?(0,$d.jsxs)($d.Fragment,{children:["Kombinerad faktura \u2014"," ",Am(null===(Oe=Dt.categorized)||void 0===Oe?void 0:Oe.category).label,null!=(null===(Ie=Dt.extracted)||void 0===Ie?void 0:Ie.primaryComponentMonthly)?` (${zu(12*Dt.extracted.primaryComponentMonthly)}/\xe5r)`:""," ","+ ",Dn," (",zu(Tn.currentAnnual),"/\xe5r)."," ","Besparing:"," ",Am(null===(Me=Dt.categorized)||void 0===Me?void 0:Me.category).label," ","\u2212",zu(Pn),"/\xe5r"," ","|"," ",Dn," \u2212",zu(Tn.grossSaving),"/\xe5r."]}):(0,$d.jsxs)($d.Fragment,{children:["Kombinerad faktura \u2014 analysen avser"," ",Am(null===(Be=Dt.categorized)||void 0===Be?void 0:Be.category).label,null!=(null===(Ve=Dt.extracted)||void 0===Ve?void 0:Ve.primaryComponentMonthly)?` (${zu(12*Dt.extracted.primaryComponentMonthly)}/\xe5r)`:"",(null!==(Ue=null===(Ke=Dt.recommendation)||void 0===Ke?void 0:Ke.nonPrimaryAnnual)&&void 0!==Ue?Ue:0)>0?`. \xd6vriga tj\xe4nster (${zu(Dt.recommendation.nonPrimaryAnnual)}/\xe5r) analyseras via Fortnox/Visma.`:"."]})}),null!=(null===(He=Dt.extracted)||void 0===He?void 0:He.annualCost)&&"monitoring"!==Dt.route&&"unsupported"!==Dt.route&&(0,$d.jsxs)(ug,{children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Ni betalar idag"}),(0,$d.jsxs)("dd",{children:[zu(bn)," / \xe5r",vn?(0,$d.jsxs)("small",{children:["Abonnemang och licenser. Exkl. h\xe5rdvaruavbetalningar (",zu(gn),"/\xe5r)",Dt.extracted.variableCharges>0?` och r\xf6rliga avgifter (${zu(Dt.extracted.variableCharges)} denna period)`:"","."]}):Dt.extracted.variableCharges>0&&(0,$d.jsxs)("small",{children:["Varav fasta abonnemang. Exkl. r\xf6rliga avgifter (",zu(Dt.extracted.variableCharges)," denna period)."]})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturadatum"}),(0,$d.jsx)("dd",{children:Dt.extracted.date})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Fakturerat denna period (ex moms)"}),(0,$d.jsxs)("dd",{children:[zu(Dt.extracted.amount),Dt.extracted.oneTimeFees>0&&(0,$d.jsxs)("small",{children:["Inkl. ",zu(Dt.extracted.oneTimeFees)," ",Dt.extracted.elSkatterKr>0?"lagstadgade avgifter":"eng\xe5ngskostnader"," \u2014 ing\xe5r ej i \xe5rsber\xe4kningen ovan."]})]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"\xc5terkommande"}),(0,$d.jsx)("dd",{children:Dt.extracted.recurring?"Ja (abonnemang / premie)":"Nej"})]}),"EUR"===Dt.extracted.originalCurrency&&(0,$d.jsxs)("div",{style:{gridColumn:"1 / -1"},children:[(0,$d.jsx)("dt",{children:"Valutakonvertering"}),(0,$d.jsx)("dd",{children:(0,$d.jsxs)("small",{children:["Fakturan \xe4r i EUR \u2014 konverterad till SEK med kursen ",null===(We=Dt.extracted.fxRate)||void 0===We?void 0:We.toFixed(2)," SEK/EUR",Dt.extracted.fxSource&&"fallback"!==Dt.extracted.fxSource?` (Riksbanken/ECB ${null!==(qe=Dt.extracted.fxDate)&&void 0!==qe?qe:""})`:" (fallback-kurs)",". Alla belopp ovan \xe4r i SEK."]})})]}),mn.length>0&&(0,$d.jsx)("div",{style:{gridColumn:"1 / -1"},children:(0,$d.jsxs)(cg,{children:[(0,$d.jsx)("strong",{children:"\u26a0 Aktiv h\xe5rdvaruleasing \u2014 kontrollera innan ni byter"}),(0,$d.jsxs)("p",{children:[mn.map((e,t)=>(0,$d.jsxs)("span",{style:{display:"block",marginBottom:mn.length>1&&t<mn.length-1?"6px":0},children:[e.description," \u2014 ",e.monthsRemaining," m\xe5nader kvar (",Ng(e.monthlyCost)," kr/m\xe5n = ",(0,$d.jsxs)("strong",{children:[Ng(e.remainingCost)," kr totalt"]}),")"]},t)),mn.length>1&&(0,$d.jsxs)("span",{style:{display:"block",marginTop:"6px",fontWeight:700},children:["Totalt kvar att betala: ",Ng(xn)," kr"]})]}),vn&&yn>0&&((e,t)=>{const r=(xn/yn).toFixed(1).replace(".",",");return(0,$d.jsxs)("p",{style:{marginTop:8,paddingTop:8,borderTop:"1px solid rgba(0,0,0,0.08)"},children:[(0,$d.jsx)("strong",{children:"Break-even om skulden l\xf6ses kontant:"})," ",Ng(xn)," kr \xf7 ",Ng(yn)," kr/\xe5r = ",(0,$d.jsxs)("strong",{children:[r," \xe5r"]})," ","\u2014"," ","fr\xe5ga ",null!==(e=null===(t=Dt.recommendation)||void 0===t?void 0:t.suggestedSupplier)&&void 0!==e?e:"den nya leverant\xf6ren"," om de kan absorbera skulden vid avtalssignering. Om ja \xe4r besparingen ",zu(Dt.recommendation.netSaving)," kr/\xe5r netto fr\xe5n dag ett."]})})()]})}),Dt.extracted.elUncertaintyNote&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"\xc5rsuppskattning"}),(0,$d.jsx)("dd",{children:(0,$d.jsx)("small",{children:Dt.extracted.elUncertaintyNote})})]}),Dt.extracted.elSkatterKr>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Skatter & lagstadgade avgifter"}),(0,$d.jsxs)("dd",{children:[zu(Dt.extracted.elSkatterKr),(0,$d.jsx)("small",{children:"Energiskatt, elcertifikat m.m. \u2014 ej f\xf6rhandlingsbara, ing\xe5r ej i besparingskalkylen."})]})]}),Dt.extracted.elNatavgiftAnnual>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"N\xe4tavgift (ej valbar)"}),(0,$d.jsxs)("dd",{children:[zu(Dt.extracted.elNatavgiftAnnual)," / \xe5r",(0,$d.jsx)("small",{children:"Eln\xe4tsavgiften best\xe4ms av din regionala n\xe4toperat\xf6r och kan inte bytas via elleverant\xf6rsbyte \u2014 ing\xe5r ej i besparingskalkylen."})]})]}),Dt.extracted.variableCharges>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"R\xf6rliga avgifter denna period"}),(0,$d.jsxs)("dd",{children:[zu(Dt.extracted.variableCharges),(0,$d.jsx)("small",{children:null!==(Ye=Am(null===(Ge=Dt.categorized)||void 0===Ge?void 0:Ge.category).variableChargeNote)&&void 0!==Ye?Ye:"R\xf6rliga avgifter denna period \u2014 ej inkluderat i \xe5rsber\xe4kningen."}),"mobil"===(null===(Qe=Dt.categorized)||void 0===Qe?void 0:Qe.category)&&((e,t)=>{const r=Dt.extracted.roamingZone,n=null!==(e=Dt.extracted.recurringAmount)&&void 0!==e?e:0,a=null!==(t=Dt.extracted.variableCharges)&&void 0!==t?t:0;return a<Math.max(.3*n,1e3)?null:r>=4?(0,$d.jsxs)(dg,{$type:"satellite",children:[(0,$d.jsx)(bu,{name:"globe",size:14}),(0,$d.jsx)("span",{children:"Satellit- och maritim datatrafik (Zon 4) \xe4r teknikberoende \u2014 kan inte optimeras via operat\xf6rsbyte och ing\xe5r inte i Arvos besparing."})]}):(0,$d.jsxs)(dg,{children:[(0,$d.jsx)(bu,{name:"info",size:14}),(0,$d.jsxs)("span",{children:["Roamingkostnader p\xe5 ",zu(a)," denna period. Om detta \xe4r \xe5terkommande kan ett mobilavtal med b\xe4ttre EU-datapaket minska kostnaden \u2014 Arvo tittar p\xe5 detta vid ett leverant\xf6rsbyte."]})]})})()]})]}),"saas-productivity"===(null===(Je=Dt.categorized)||void 0===Je?void 0:Je.category)&&(null===(Xe=Dt.extracted)||void 0===Xe?void 0:Xe.licenseType)&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"Licensplan"}),(0,$d.jsxs)("dd",{children:[Dt.extracted.licenseType,"monthly"===Dt.extracted.billingCycleType&&(0,$d.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#A8761A",fontWeight:600},children:"M\xe5nadsvis"}),"annual"===Dt.extracted.billingCycleType&&(0,$d.jsx)("span",{style:{marginLeft:"6px",fontSize:"11px",color:"#1B7A6E",fontWeight:600},children:"\xc5rsavtal"})]})]}),"saas-productivity"===(null===(Ze=Dt.categorized)||void 0===Ze?void 0:Ze.category)&&(null===(et=Dt.recommendation)||void 0===et?void 0:et.annualBillingSaving)>0&&(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:"M\xf6jlighet \u2014 \xe5rsavtal"}),(0,$d.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",zu(Dt.recommendation.annualBillingSaving),"/\xe5r utan leverant\xf6rsbyte"]})]}),"saas-productivity"===(null===(tt=Dt.categorized)||void 0===tt?void 0:tt.category)&&(e=>{const t=null===(e=Dt.recommendation)||void 0===e?void 0:e.savingsBreakdown;if(!t)return null;const r=[{label:"Marknadsgap",value:t.cspDiscount},{label:"Tier-optimering (advisory)",value:t.tierOptimization},{label:"Licensrensning",value:t.licenseCleanup}].filter(e=>e.value>0);return r.length<2?null:(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{style:{gridColumn:"1 / -1",borderTop:"1px solid #D5E2DC",marginTop:"4px",paddingTop:"10px"},children:(0,$d.jsx)("dt",{style:{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#5C6E68",marginBottom:"6px"},children:"Besparing per kanal"})}),r.map(e=>(0,$d.jsxs)("div",{children:[(0,$d.jsx)("dt",{children:e.label}),(0,$d.jsxs)("dd",{style:{color:"#1B7A6E",fontWeight:600},children:["+",zu(e.value),"/\xe5r"]})]},e.label))]})})()]}),(null===(rt=Dt.recommendation)||void 0===rt?void 0:rt.reasoning)&&(un||Ln)&&(0,$d.jsxs)(mg,{children:[(0,$d.jsx)("span",{className:"kicker",children:un?"Vad vi hittade":"Kombinerad analys"}),(0,$d.jsx)("p",{children:Am(Dt.categorized.category).isRealPrice?Dt.recommendation.reasoning:Fg(Dt.recommendation.reasoning,Dt.recommendation.suggestedSupplier)})]}),"saas-productivity"===(null===(nt=Dt.categorized)||void 0===nt?void 0:nt.category)&&(null!==(at=null===(it=Dt.recommendation)||void 0===it?void 0:it.tierOptimizationSaving)&&void 0!==at?at:0)>0&&(0,$d.jsxs)(xg,{children:[(0,$d.jsxs)("button",{className:"acc-trigger",onClick:()=>or(e=>!e),"aria-expanded":ir,children:[(0,$d.jsx)("span",{className:"acc-icon",children:"\u26a1"}),(0,$d.jsxs)("span",{className:"acc-label-group",children:[(0,$d.jsx)("span",{className:"acc-label",children:"Licensoptimering"}),!ir&&(0,$d.jsx)("span",{className:"acc-hint",children:"Klicka f\xf6r att se detaljer \u2192"})]}),(0,$d.jsxs)("span",{className:"acc-amount",children:["ytterligare +",Ng(Math.round(.8*Dt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]}),(0,$d.jsx)("span",{className:"acc-chevron"+(ir?" open":""),children:(0,$d.jsx)(bu,{name:"chevron-right",size:16,stroke:2.5})})]}),ir&&(0,$d.jsxs)("div",{className:"acc-body",children:[(0,$d.jsxs)("p",{className:"acc-intro",children:["Ni kan spara ytterligare"," ",(0,$d.jsxs)("strong",{children:[Ng(Math.round(.8*Dt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]})," ","(efter Arvos arvode om ",Ng(Math.round(.2*Dt.recommendation.tierOptimizationSaving)),"\xa0kr) genom att byta"," ","fr\xe5n\xa0",(0,$d.jsx)("strong",{children:null!==(ot=_g[Dt.recommendation.tierOptimizationFromTier])&&void 0!==ot?ot:Dt.recommendation.tierOptimizationFromTier})," ","till\xa0",(0,$d.jsx)("strong",{children:null!==(lt=_g[Dt.recommendation.tierOptimizationToTier])&&void 0!==lt?lt:Dt.recommendation.tierOptimizationToTier}),"."]}),(0,$d.jsxs)("div",{className:"acc-row",children:[(0,$d.jsx)("span",{className:"acc-row-icon",style:{color:"#1B7A6E"},children:(0,$d.jsx)(bu,{name:"check-circle",size:15,stroke:2.5})}),(0,$d.jsxs)("div",{className:"acc-row-content",children:[(0,$d.jsx)("div",{className:"acc-row-head keeps",children:"Vad ni beh\xe5ller"}),(0,$d.jsx)("p",{className:"acc-row-text",children:"Teams, Exchange, desktop Office, SharePoint, 1\xa0TB\xa0OneDrive/anv\xe4ndare"})]})]}),(0,$d.jsxs)("div",{className:"acc-row",children:[(0,$d.jsx)("span",{className:"acc-row-icon",style:{color:"#A8761A"},children:(0,$d.jsx)(bu,{name:"alert-triangle",size:15,stroke:2.5})}),(0,$d.jsxs)("div",{className:"acc-row-content",children:[(0,$d.jsx)("div",{className:"acc-row-head loses",children:"Vad ni tappar"}),(0,$d.jsx)("p",{className:"acc-row-text",children:"Intune MDM (centraliserad enhetshantering) och Defender for Business (endpoint-s\xe4kerhet)"})]})]}),(0,$d.jsxs)("p",{className:"acc-disclaimer",children:["Passar bolag utan aktiv MDM-policy eller externt hanterat s\xe4kerhetsansvar. \xc4r ni os\xe4kra \u2014 beh\xe5ll Premium och spara \xe4nd\xe5 ",Ng(null!==(st=Dt.recommendation.netSaving)&&void 0!==st?st:0),"\xa0kr/\xe5r."]}),(0,$d.jsxs)("div",{className:"acc-combined",children:[(0,$d.jsx)("span",{className:"acc-combined-label",children:"Totalt om ni g\xf6r b\xe5da \xe5tg\xe4rderna"}),(0,$d.jsxs)("span",{className:"acc-combined-amount",children:["ca +",Ng((null!==(ct=Dt.recommendation.netSaving)&&void 0!==ct?ct:0)+Math.round(.8*Dt.recommendation.tierOptimizationSaving)),"\xa0kr/\xe5r netto"]})]}),(0,$d.jsx)("div",{className:"acc-cta",children:(0,$d.jsx)(Id,{as:vl,to:"/connect",$variant:"gradient",$size:"sm",children:"Inkludera i bytet \u2192"})})]})]})]})," "]}),Qn&&(0,$d.jsxs)(ig,{children:[(0,$d.jsx)("div",{className:"switch-eyebrow",children:"Arvo Switch"}),(0,$d.jsx)("h3",{children:"Priset \xe4r s\xe4krat. Ni aktiverar det."}),(0,$d.jsx)("p",{className:"sub",children:"Arvo har redan f\xf6rhandlat fram priset via partnern\xe4tverket. Ni beh\xf6ver inte kontakta er nuvarande leverant\xf6r \u2014 Arvo sk\xf6ter allt."}),(0,$d.jsxs)("div",{className:"switch-steps",children:[(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"1"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Ni godk\xe4nner bytet"}),(0,$d.jsx)("span",{className:"step-detail",children:"Ett klick \u2014 inget mer kr\xe4vs av er."})]})]}),(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"2"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Arvo genomf\xf6r bytet"}),(0,$d.jsx)("span",{className:"step-detail",children:"Via partnern\xe4tverket, klart inom 48 timmar. Ni beh\xf6ver inte lyfta ett finger."})]})]}),(0,$d.jsxs)("div",{className:"switch-step",children:[(0,$d.jsx)("span",{className:"step-num",children:"3"}),(0,$d.jsxs)("span",{className:"step-body",children:[(0,$d.jsx)("span",{className:"step-title",children:"Nytt avtalspris aktivt"}),(0,$d.jsx)("span",{className:"step-detail",children:"Ni betalar 20\xa0% av den identifierade besparingen \u2014 inget annat."})]})]})]}),(0,$d.jsxs)("div",{className:"switch-offer",children:[(0,$d.jsxs)("div",{className:"switch-offer-head",children:[(0,$d.jsx)("span",{className:"switch-badge",children:(0,$d.jsx)(bu,{name:"check",size:13,stroke:2.5})}),(0,$d.jsxs)("div",{className:"switch-supplier",children:[(0,$d.jsx)("p",{className:"switch-supplier-name",children:Un?Dt.recommendation.suggestedSupplier:Hn}),(0,$d.jsxs)("span",{className:"switch-price-label",children:[(0,$d.jsx)(bu,{name:"shield",size:10,stroke:2}),Un?"Verifierat marknadspris":"Arvo-verifierad partner"]})]})]}),(0,$d.jsxs)("div",{className:"switch-offer-body",children:[(0,$d.jsxs)("div",{className:"sp-from-row",children:[(0,$d.jsxs)("span",{className:"sp-old",children:[zu(bn),"/\xe5r"]}),(0,$d.jsx)("span",{className:"sp-from-arrow",children:"\u2192"})]}),(0,$d.jsxs)("span",{className:"sp-new",children:[Ng(Dt.recommendation.suggestedAnnualCost),(0,$d.jsx)("small",{children:"kr/\xe5r"})]}),(0,$d.jsxs)("span",{className:"sp-save-note",children:["Ni sparar ",zu(yn),"/\xe5r \u2014 Arvo tar 20\xa0% av det"]})]})]}),(0,$d.jsxs)(Id,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{Xt(cr||""),er("idle"),Qt(!0)},children:[Gn," ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})]}),(0,$d.jsxs)(zg,{children:[(0,$d.jsx)("div",{className:"eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h3",{children:"Det h\xe4r var en faktura."}),(0,$d.jsxs)("div",{className:"briefing-preview",children:[(0,$d.jsxs)("div",{className:"preview-header",children:[(0,$d.jsxs)("span",{children:[(0,$d.jsx)("span",{className:"preview-live-dot"}),(0,$d.jsx)("span",{className:"preview-brand-name",children:"Arvo Intelligence"})]}),(0,$d.jsx)("span",{className:"preview-time",children:"i morse \xb7 08:14"})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"pulse",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Smygh\xf6jningslarm"}),(0,$d.jsxs)("div",{className:"signal-line",children:[(null===Dt||void 0===Dt||null===(dt=Dt.categorized)||void 0===dt?void 0:dt.normalizedSupplier)||"Telia"," \xb7 Er faktura",(0,$d.jsx)("span",{className:"signal-badge",children:"+11\xa0%"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Priset h\xf6jt mot f\xf6rra perioden \u2014 utan avisering."})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"benchmark",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Community Benchmark"}),(0,$d.jsx)("div",{className:"bench-grid",children:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(e=>(0,$d.jsx)("span",{className:`${[0,2,3,5,8,9,11,13].includes(e)?"on":""}${8===e?" you":""}`},e))}),(0,$d.jsxs)("p",{className:"signal-sub",children:[(0,$d.jsx)("strong",{children:"8 av 15"})," j\xe4mf\xf6rbara bolag i er bransch fick samma h\xf6jning \u2014 inklusive er."]})]})]}),(0,$d.jsxs)("div",{className:"signal",children:[(0,$d.jsx)("div",{className:"signal-ico",children:(0,$d.jsx)(bu,{name:"calendar-clock",size:14,stroke:2})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"signal-tag",children:"Proaktiv avtalsbevakning"}),(0,$d.jsxs)("div",{className:"signal-line",children:[(null===Dt||void 0===Dt||null===(ut=Dt.categorized)||void 0===ut?void 0:ut.normalizedSupplier)||"Er leverant\xf6r"," \xb7 F\xf6rnyelse om 90 dagar",(0,$d.jsx)("span",{className:"signal-badge signal-badge--contract",children:"F\xf6rnyelse"})]}),(0,$d.jsx)("p",{className:"signal-sub",children:"Arvo varnar automatiskt \u2014 och f\xf6rhandlar p\xe5 er beg\xe4ran."})]})]})]}),(0,$d.jsxs)("div",{className:"price-row",children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("span",{className:"price",children:"1 995 kr"}),(0,$d.jsx)("span",{className:"price-period",children:"/ m\xe5n"})]}),(0,$d.jsx)("span",{className:"price-note",children:"Ingen bindningstid"})]}),(0,$d.jsx)(Id,{type:"button",$variant:"gradient",$size:"lg",style:{width:"100%",justifyContent:"center"},onClick:()=>{Vr(null!==cr&&void 0!==cr?cr:""),Kr("idle"),Mr(!0)},children:"Aktivera Arvo Intelligence \u2192"}),(0,$d.jsx)("p",{style:{fontSize:12,color:"#8A9E98",textAlign:"center",marginTop:10,lineHeight:1.5},children:"Arvo s\xf6ker igenom er inkorg \u2014 ni beh\xf6ver inte lyfta ett finger."})]}),(0,$d.jsxs)(Eg,{children:[(0,$d.jsx)("div",{className:"pb-eyebrow",children:"Helhetsbilden"}),(0,$d.jsx)("h2",{className:"pb-head",children:"Arvo bevakar \xe5tta kostnadskategorier. Den h\xe4r fakturan var en."}),(0,$d.jsx)("div",{className:"pb-grid",children:Pg.map(e=>{var t;const r=e.cats.includes(null===(t=Dt.categorized)||void 0===t?void 0:t.category);return(0,$d.jsxs)("div",{className:"pb-seg"+(r?" lit":""),children:[(0,$d.jsx)("span",{className:"pb-seg-ico",children:(0,$d.jsx)(bu,{name:e.icon,size:20,stroke:1.8})}),(0,$d.jsx)("span",{className:"pb-seg-label",children:e.short})]},e.label)})}),(0,$d.jsxs)("div",{className:"pb-foot",children:[(0,$d.jsx)("p",{className:"pb-note",children:"En faktura s\xe4ger en sak. Hela reskontran s\xe4ger var ni faktiskt bl\xf6der. Vidarebefordra era leverant\xf6rsfakturor s\xe5 kartl\xe4gger Arvo varje leverant\xf6r \u2014 och hittar varenda besparing, inte bara den h\xe4r."}),(0,$d.jsxs)(vl,{to:"/portfolio",className:"pb-link",children:["Kartl\xe4gg er reskontra ",(0,$d.jsx)(bu,{name:"arrow",size:15,stroke:2})]})]})]}),(0,$d.jsx)("p",{style:{textAlign:"center",fontSize:12,color:"#8A9E98",marginBottom:8},children:"sent"===Dr?(0,$d.jsx)("span",{style:{color:"#1B7A6E"},children:"\u2713 Noterat \u2014 vi justerar modellen"}):(0,$d.jsxs)($d.Fragment,{children:["Felklassificerad faktura?"," ",(0,$d.jsx)("button",{onClick:()=>(async e=>{if("idle"===Dr){Pr(e),Lr("submitting");try{var t,r;await fetch("/api/feedback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fingerprint:await Cg().catch(()=>""),supplier:null===Dt||void 0===Dt||null===(t=Dt.extracted)||void 0===t?void 0:t.supplier,category:null===Dt||void 0===Dt||null===(r=Dt.categorized)||void 0===r?void 0:r.category,vote:e})})}catch{}Lr("sent")}})("down"),disabled:"idle"!==Dr,style:{background:"none",border:"none",padding:0,cursor:"pointer",fontSize:12,color:"#5C6E68",textDecoration:"underline",textUnderlineOffset:2,fontFamily:"inherit"},children:"Ber\xe4tta \u2192"})]})})]})]}),(0,$d.jsx)(xu,{}),nr&&(0,$d.jsx)(pg,{children:(0,$d.jsxs)(hg,{children:["saving_limit"===lr?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Ni har hittat er besparing \u2014 nu \xe4r det dags att ",(0,$d.jsx)("em",{children:"realisera"})," den."]}),(0,$d.jsx)("p",{className:"sub",children:"Arvo har identifierat besparingar i era fakturor. Koppla Fortnox eller Visma s\xe5 analyserar vi hela er leverant\xf6rsreskontra och sk\xf6ter varje byte \u2014 fr\xe5n upps\xe4gning till nytt avtal."})]}):"saving"===lr?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{className:"gate-saving",children:[(0,$d.jsx)("span",{className:"gate-saving-label",children:"Identifierad nettobesparing"}),(0,$d.jsxs)("span",{className:"gate-saving-amount",children:["+",zu(null!==(pt=null===Dt||void 0===Dt||null===(ht=Dt.recommendation)||void 0===ht?void 0:ht.netSaving)&&void 0!==pt?pt:0)]}),(0,$d.jsxs)("span",{className:"gate-saving-context",children:[null===Dt||void 0===Dt||null===(ft=Dt.extracted)||void 0===ft?void 0:ft.supplier,null!==Dt&&void 0!==Dt&&null!==(mt=Dt.categorized)&&void 0!==mt&&mt.category?` \xb7 ${null!==(gt=Am(Dt.categorized.category).label)&&void 0!==gt?gt:Dt.categorized.category}`:""]})]}),(0,$d.jsx)("p",{className:"sub",children:"Ange din e-post \u2014 vi skickar analysen direkt och en r\xe5dgivare kontaktar dig f\xf6r att realisera besparingen."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Redo att ",(0,$d.jsx)("em",{children:"g\xe5 vidare"}),"?"]}),(0,$d.jsx)("p",{className:"sub",children:"Koppla Fortnox / Visma f\xf6r en komplett analys av hela er leverant\xf6rsreskontra \u2014 Arvo sk\xf6ter varje byte fr\xe5n upps\xe4gning till nytt avtal."})]}),(0,$d.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),!cr||ur)return;pr(!0);const t=cr.trim().toLowerCase();if(localStorage.setItem("arvo_gate_email",t),"saving"===lr){try{Dt&&await ln(t)}catch{}ar(!1),pr(!1)}else pr(!1),window.location.href="/connect"},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:cr,onChange:e=>dr(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:ur||!cr,children:ur?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Xm,{})," Skickar\u2026"]}):"saving"===lr?(0,$d.jsxs)($d.Fragment,{children:["Skicka analysen ",(0,$d.jsx)(bu,{name:"arrow",size:16})]}):(0,$d.jsxs)($d.Fragment,{children:["Koppla Fortnox / Visma ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})}),(0,$d.jsx)("p",{className:"fine-print",children:"saving"===lr?"Ingen spam. Inga bindningstider. Ni betalar 20 % av identifierad besparing.":"Ingen spam. Inga fasta avgifter. Vi kontaktar dig bara om det finns besparingar att h\xe4mta."}),"saving_limit"===lr&&(0,$d.jsx)("p",{className:"fine-print",style:{marginTop:"8px",fontStyle:"italic"},children:"Ni har provat Arvo. Nu l\xe5ter vi siffrorna tala \u2014 utan kostnad tills ni sparar."})]})]})}),Gt&&Dt&&(0,$d.jsx)(pg,{onClick:e=>{e.target===e.currentTarget&&Qt(!1)},children:(0,$d.jsxs)(hg,{children:[(0,$d.jsx)("button",{className:"close",onClick:()=>{Qt(!1)},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===Zt?(0,$d.jsxs)("div",{className:"sent-state",children:[(0,$d.jsx)("span",{className:"sent-icon",children:(0,$d.jsx)(bu,{name:"check",size:20,stroke:2.5})}),(0,$d.jsx)("p",{className:"sent-title",children:Yn?"Optimeringen \xe4r aktiverad.":"Bytet \xe4r aktiverat."}),(0,$d.jsx)("p",{className:"sent-sub",children:"Arvo tar det h\xe4rifr\xe5n \u2014 ni h\xf6r av oss inom 48 timmar."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("p",{className:"bk-title",children:["Allt \xe4r f\xf6rberett.",(0,$d.jsx)("br",{}),"Er signatur aktiverar det."]}),(0,$d.jsxs)("div",{className:"bk-offer",children:[(0,$d.jsxs)("div",{className:"bk-offer-top",children:[(0,$d.jsx)("span",{className:"bk-partner-name",children:Un?Dt.recommendation.suggestedSupplier:Hn}),(0,$d.jsxs)("span",{className:"bk-verified",children:[(0,$d.jsx)(bu,{name:"shield",size:10,stroke:2}),Un?"Verifierat marknadspris":"Arvo-verifierad partner"]})]}),(0,$d.jsxs)("div",{className:"bk-price-row",children:[(0,$d.jsxs)("span",{className:"bk-from",children:[zu(bn),"/\xe5r"]}),(0,$d.jsx)("span",{className:"bk-arrow",children:"\u2192"}),(0,$d.jsxs)("span",{className:"bk-to",children:[Ng(Dt.recommendation.suggestedAnnualCost)," kr/\xe5r"]})]}),(0,$d.jsxs)("p",{className:"bk-savings-row",children:["Ni sparar ",zu(yn)," \xb7 Arvo ",zu(kn)]})]}),cr||Jt?(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("p",{className:"bk-email-confirm",children:["Bekr\xe4ftelse till: ",(0,$d.jsx)("strong",{children:cr||Jt})]}),(0,$d.jsx)(Id,{type:"button",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===Zt,onClick:cn,children:"submitting"===Zt?"Aktiverar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Signera med BankID ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})})]}):(0,$d.jsxs)("form",{className:"modal-form",onSubmit:cn,children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:Jt,onChange:e=>Xt(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===Zt,children:"submitting"===Zt?"Aktiverar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Signera med BankID ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})})]}),(0,$d.jsx)("p",{className:"bk-fine-print",children:"Du har 24 timmars \xe5ngerr\xe4tt."})]})]})}),wr&&Dt&&(0,$d.jsx)(pg,{onClick:e=>{e.target===e.currentTarget&&(Sr(!1),_r("idle"))},children:(0,$d.jsxs)(hg,{children:[(0,$d.jsx)("button",{className:"close",onClick:()=>{Sr(!1),_r("idle")},"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===Er?(0,$d.jsxs)("div",{className:"sent-state",children:[(0,$d.jsx)("span",{className:"sent-icon",children:(0,$d.jsx)(bu,{name:"check",size:20,stroke:2.5})}),(0,$d.jsx)("p",{className:"sent-title",children:"Analysen \xe4r skickad!"}),(0,$d.jsxs)("p",{className:"sent-sub",children:["Vi har skickat analysen till ",$r,"."]})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("h3",{children:["Ladda ner er ",(0,$d.jsx)("em",{children:"analys"})]}),(0,$d.jsx)("p",{className:"sub",children:"Ange er e-post s\xe5 skickar vi en sammanfattning av analysen direkt till er inkorg."}),(0,$d.jsxs)("div",{className:"context-badge",children:[Dt.extracted.supplier," \xb7 ",Am(null===(xt=Dt.categorized)||void 0===xt?void 0:xt.category).label]}),(0,$d.jsxs)("form",{className:"modal-form",onSubmit:async e=>{if(e.preventDefault(),$r&&"idle"===Er){_r("submitting");try{await ln($r),_r("sent")}catch{_r("error")}}},children:[(0,$d.jsx)("input",{type:"email",placeholder:"din@epost.se",value:$r,onChange:e=>zr(e.target.value),required:!0,autoFocus:!0}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"lg",$full:!0,disabled:"submitting"===Er,children:"submitting"===Er?"Skickar\u2026":(0,$d.jsxs)($d.Fragment,{children:["Skicka analysen ",(0,$d.jsx)(bu,{name:"arrow",size:16})]})}),"error"===Er&&(0,$d.jsx)("p",{className:"fine-print",style:{color:"red"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."}),(0,$d.jsx)("p",{className:"fine-print",children:"Ingen spam. Vi skickar analysen direkt till din inkorg."})]})]})]})}),Ir&&(0,$d.jsx)(pg,{onClick:e=>{e.target===e.currentTarget&&Mr(!1)},children:(0,$d.jsxs)(fg,{children:[(0,$d.jsx)("button",{className:"ac-close",onClick:()=>Mr(!1),"aria-label":"St\xe4ng",children:"\xd7"}),"sent"===Ur?(0,$d.jsxs)("div",{className:"ac-success",children:[(0,$d.jsx)("div",{className:"ac-check",children:"\u2713"}),(0,$d.jsx)("h3",{children:"Briefing p\xe5 v\xe4g"}),(0,$d.jsx)("p",{className:"ac-email-sent",children:Br||cr}),(0,$d.jsxs)("p",{className:"ac-success-sub",children:["Er Arvo Intelligence-briefing f\xf6r ",null!==(vt=null===Dt||void 0===Dt||null===(bt=Dt.extracted)||void 0===bt?void 0:bt.supplier)&&void 0!==vt?vt:"er leverant\xf6r"," \xe4r skickad. Koppla er inkorg s\xe5 bevakar Arvo alla era leverant\xf6rsfakturor l\xf6pande."]}),(0,$d.jsx)("span",{className:"ac-upgrade-label",children:"Koppla er inkorg"}),(0,$d.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(Br||cr)}`,className:"ac-oauth-btn",style:{marginBottom:9,display:"flex"},children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(Br||cr)}`,className:"ac-oauth-btn",style:{display:"flex"},children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsx)("p",{className:"ac-privacy",children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{className:"ac-eyebrow",children:"Arvo Intelligence"}),(0,$d.jsx)("h2",{className:"ac-heading",children:"Arvo s\xf6ker igenom er inkorg"}),(0,$d.jsx)("p",{className:"ac-sub",children:"Koppla Gmail eller Outlook \u2014 Arvo s\xf6ker er inkorg efter leverant\xf6rsfakturor och skickar er f\xf6rsta fullst\xe4ndiga briefing inom en timme."}),(0,$d.jsxs)("a",{href:`/api/auth/gmail-init?email=${encodeURIComponent(Br||cr)}`,className:"ac-oauth-btn",children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--google",children:"G"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Gmail"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsxs)("a",{href:`/api/auth/outlook-init?email=${encodeURIComponent(Br||cr)}`,className:"ac-oauth-btn",children:[(0,$d.jsx)("span",{className:"ac-provider-badge ac-provider-badge--outlook",children:"M"}),(0,$d.jsx)("span",{className:"ac-oauth-label",children:"Koppla Outlook"}),(0,$d.jsx)("span",{className:"ac-oauth-arrow",children:"\u2192"})]}),(0,$d.jsx)("div",{className:"ac-divider",children:"eller b\xf6rja nu"}),(0,$d.jsxs)("form",{onSubmit:async e=>{var t,r,n,a,i,o;e.preventDefault();const l=Br.trim()||cr.trim();if(!l||"submitting"===Ur)return;Kr("submitting");const s=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(!e)return"";const r=e.match(/[^.!?]+[.!?]+/g)||[];return 0===r.length?e.length>200?e.slice(0,200).trimEnd()+"\u2026":e:r.slice(0,t).join(" ").trim()}(null!==Dt&&void 0!==Dt&&null!==(t=Dt.categorized)&&void 0!==t&&t.category&&Am(Dt.categorized.category).isRealPrice?null!==(r=null===Dt||void 0===Dt||null===(n=Dt.recommendation)||void 0===n?void 0:n.reasoning)&&void 0!==r?r:"":Fg(null!==(a=null===Dt||void 0===Dt||null===(i=Dt.recommendation)||void 0===i?void 0:i.reasoning)&&void 0!==a?a:"",null===Dt||void 0===Dt||null===(o=Dt.recommendation)||void 0===o?void 0:o.suggestedSupplier));try{var c,d,u,p;if(!(await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:l,supplier:null===Dt||void 0===Dt||null===(c=Dt.extracted)||void 0===c?void 0:c.supplier,normalizedSupplier:null===Dt||void 0===Dt||null===(d=Dt.categorized)||void 0===d?void 0:d.normalizedSupplier,category:null===Dt||void 0===Dt||null===(u=Dt.categorized)||void 0===u?void 0:u.category,annualCost:bn,suggestedAnnualCost:null===Dt||void 0===Dt||null===(p=Dt.recommendation)||void 0===p?void 0:p.suggestedAnnualCost,grossSaving:yn,netSaving:jn,arvoFee:kn,reasoning:s,diagScore:Nn,diagLabel:null===An||void 0===An?void 0:An.label,diagInsight:On})})).ok)throw new Error;Kr("sent")}catch{Kr("error")}},children:[(0,$d.jsxs)("div",{className:"ac-email-row",children:[(0,$d.jsx)("input",{className:"ac-email-input",type:"email",placeholder:"er@foretag.se",value:Br||cr,onChange:e=>Vr(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)(Id,{type:"submit",$variant:"gradient",$size:"md",disabled:"submitting"===Ur,style:{flexShrink:0},children:"submitting"===Ur?"\u2026":"Skicka \u2192"})]}),"error"===Ur&&(0,$d.jsx)("p",{style:{fontSize:12,color:"#C41E1E",marginTop:8},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$d.jsx)("p",{className:"ac-privacy",children:"Vi skickar er f\xf6rsta Intelligence-briefing omedelbart \u2014 baserad p\xe5 denna analys. Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})]})})]})};function Mg(e){return null==e?"\u2013":Math.round(e).toLocaleString("sv-SE")}const Bg=[{id:0,label:"Skrivare & tryck"},{id:1,label:"El & energi"},{id:2,label:"Telekom"},{id:3,label:"SaaS & licenser"},{id:4,label:"Leasing"},{id:5,label:"IT-drift"},{id:6,label:"Transport & frakt"},{id:7,label:"F\xf6rs\xe4kring"}],Vg=jd`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,Ug=jd`
  to { transform: rotate(360deg); }
`,Kg=jd`
  from { stroke-dashoffset: 283; }
`,Hg=vd.main`
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  min-height: 100vh;
`,Wg=vd.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 72px 28px 32px;
  animation: ${Vg} 0.55s ease both;
  @media (max-width: 600px) { padding: 48px 20px 20px; }
`,qg=vd.span`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 12px; border-radius: 100px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.borderStrong}};
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  font-size: 12px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  letter-spacing: .04em; text-transform: uppercase; margin-bottom: 20px;
  span.dot { width: 6px; height: 6px; border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    box-shadow: 0 0 0 4px ${e=>{let{theme:t}=e;return t.color.brandSoft}}; }
`,Yg=vd.h1`
  font-size: 34px; font-weight: 800; letter-spacing: -.03em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}}; margin: 0 0 10px;
  @media (max-width: 600px) { font-size: 26px; }
`,Gg=vd.p`
  font-size: 16px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  line-height: 1.65; margin: 0 0 32px;
`,Qg=vd.section`
  max-width: 860px; margin: 0 auto; padding: 0 28px 80px;
  @media (max-width: 600px) { padding: 0 20px 60px; }
`,Jg=vd.div`
  background: linear-gradient(145deg, #0E1A17 0%, #1B3A30 100%);
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 32px;
  margin-bottom: 16px;
  display: flex; align-items: center; gap: 32px;
  box-shadow: 0 4px 24px rgba(14,26,23,.18);
  @media (max-width: 640px) { flex-direction: column; gap: 20px; padding: 24px 20px; }
`,Xg=vd.div`
  position: relative; flex-shrink: 0;
  width: 140px; height: 140px;
  svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .gauge-track { fill: none; stroke: rgba(255,255,255,.1); stroke-width: 10; }
  .gauge-fill  { fill: none; stroke-width: 10; stroke-linecap: round;
    stroke: url(#scoreGrad);
    animation: ${Kg} 1.2s cubic-bezier(.4,0,.2,1) both; }
`,Zg=vd.div`
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
`,ex=vd.span`
  font-size: 34px; font-weight: 900; letter-spacing: -.03em; color: #fff; line-height: 1;
`,tx=vd.span`
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: rgba(255,255,255,.5); margin-top: 3px;
`,rx=vd.div`
  flex: 1;
  h2 { font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 8px;
    letter-spacing: -.02em;
    sup { font-size: 10px; vertical-align: super; } }
  p { font-size: 14px; color: rgba(255,255,255,.6); line-height: 1.6; margin: 0 0 16px; }
`,nx=vd.div`
  display: flex; gap: 8px; flex-wrap: wrap;
`,ax=vd.span`
  padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600;
  background: rgba(93,214,202,.15); color: #5DD6CA;
  border: 1px solid rgba(93,214,202,.3);
`,ix=vd.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
  margin-bottom: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr 1fr; }
`,ox=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 16px 18px;
  box-shadow: 0 1px 3px rgba(14,26,23,.04);
`,lx=vd.p`
  font-size: 10.5px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; margin: 0 0 5px;
`,sx=vd.p`
  font-size: 20px; font-weight: 800; letter-spacing: -.025em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}}; margin: 0;
  span.unit { font-size: 12px; font-weight: 500; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; margin-left: 3px; }
`,cx=vd(sx)`
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
`,dx=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.md}};
  padding: 18px 20px;
  margin-bottom: 16px;
`,ux=vd.div`
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
  h4 { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; margin: 0; }
  span { font-size: 12px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; }
`,px=vd.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`,hx=vd.div`
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 8px;
  background: ${e=>{let{$covered:t,theme:r}=e;return t?r.color.brandSoft:r.color.bg}};
  border: 1px solid ${e=>{let{$covered:t,theme:r}=e;return t?"rgba(27,110,102,.25)":r.color.border}};
  transition: all .2s;
`,fx=vd.div`
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  background: ${e=>{let{$covered:t,theme:r}=e;return t?r.color.brand:r.color.border}};
`,mx=vd.span`
  font-size: 11.5px; font-weight: ${e=>{let{$covered:t}=e;return t?600:400}};
  color: ${e=>{let{$covered:t,theme:r}=e;return t?r.color.ink:r.color.mutedSoft}};
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`,gx=vd.div`
  display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;
`,xx=vd.h3`
  font-size: 13px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; margin: 0 0 10px;
`,vx=vd.div`
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
`,bx=vd.div`
  width: 4px; align-self: stretch; flex-shrink: 0; border-radius: 0 3px 3px 0;
  background: ${e=>{let{$saving:t}=e;return t?"linear-gradient(180deg,#5DD6CA,#1B6E66)":"#D5E2DC"}};
`,yx=vd.div`
  width: 36px; height: 36px; border-radius: 9px;
  background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 16px;
`,kx=vd.div`
  flex: 1; min-width: 0;
`,jx=vd.p`
  font-size: 14px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`,wx=vd.p`
  font-size: 11.5px; color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; margin: 0;
`,Sx=vd.div`
  text-align: right; flex-shrink: 0;
  @media (max-width: 540px) { width: 100%; text-align: left; padding-left: 54px; }
`,$x=vd.p`
  font-size: 13.5px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 3px;
`,zx=vd.span`
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 8px; border-radius: 100px; font-size: 11px; font-weight: 600;
  background: ${e=>{let{$pos:t,theme:r}=e;return t?r.color.brandSoft:r.color.surfaceAlt}};
  color: ${e=>{let{$pos:t,theme:r}=e;return t?r.color.brand:r.color.mutedSoft}};
`,Ex=vd(zx)`
  background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.successSoft)&&void 0!==t?t:"#EDF7F1"}};
  color: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.success)&&void 0!==t?t:"#1B7A6E"}};
`,_x=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 32px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(14,26,23,.06);
  @media (max-width: 580px) { padding: 22px 20px; }
`,Nx=vd.p`
  font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.brand}}; margin: 0 0 6px;
`,Ax=vd.h3`
  font-size: 18px; font-weight: 800; color: ${e=>{let{theme:t}=e;return t.color.ink}};
  letter-spacing: -.02em; margin: 0 0 6px;
`,Cx=vd.p`
  font-size: 13.5px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  line-height: 1.65; margin: 0 0 18px;
`,Fx=vd.form`
  display: flex; gap: 10px;
  @media (max-width: 520px) { flex-direction: column; }
`,Tx=vd.input`
  flex: 1; padding: 11px 16px; border-radius: 100px;
  border: 1.5px solid ${e=>{let{theme:t}=e;return t.color.border}};
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.ink}};
  outline: none; transition: border-color .15s;
  &:focus { border-color: ${e=>{let{theme:t}=e;return t.color.brand}}; }
  &::placeholder { color: ${e=>{let{theme:t}=e;return t.color.mutedSoft}}; }
`,Px=vd.button`
  padding: 11px 22px; border-radius: 100px; border: none; cursor: pointer;
  background: linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%);
  color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap;
  transition: opacity .15s;
  &:disabled { opacity: .55; cursor: not-allowed; }
`,Dx=vd.p`
  font-size: 13.5px; color: ${e=>{let{theme:t}=e;return t.color.brand}};
  font-weight: 600; margin: 0; padding: 10px 0;
`,Lx=vd.p`
  font-size: 12px; color: #C0392B; margin: 6px 0 0;
`,Rx=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 28px 32px;
  display: flex; align-items: center; gap: 24px;
  box-shadow: 0 1px 3px rgba(14,26,23,.05);
  @media (max-width: 580px) { flex-direction: column; align-items: flex-start; gap: 16px; padding: 22px 20px; }
`,Ox=vd.div`
  flex: 1;
  h3 { font-size: 17px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}};
    margin: 0 0 6px; letter-spacing: -.015em;
    sup { font-size: 9px; font-weight: 800; color: ${e=>{let{theme:t}=e;return t.color.brand}}; vertical-align: super; } }
  p { font-size: 13.5px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
    line-height: 1.6; margin: 0; }
`,Ix=vd.div`
  text-align: center; padding: 64px 24px;
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  margin-bottom: 24px;
  h3 { font-size: 18px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}}; margin: 0 0 10px; }
  p { font-size: 14px; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}}; margin: 0 0 24px; line-height: 1.6; }
`,Mx=vd.div`
  width: 32px; height: 32px; border: 3px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-top-color: ${e=>{let{theme:t}=e;return t.color.brand}};
  border-radius: 50%; animation: ${Ug} .7s linear infinite; margin: 48px auto;
`,Bx=vd.p`
  text-align: center; color: ${e=>{let{theme:t}=e;return t.color.inkSoft}};
  font-size: 14px; padding: 32px;
`,Vx=["\ud83d\udda8","\u26a1","\ud83d\udcf1","\ud83d\udcbb","\ud83d\udda5","\ud83d\ude9b","\ud83c\udfe2","\ud83d\udc65"];function Ux(e){var t,r;const n=Am(e),a=null!==(t=null===n||void 0===n?void 0:n.segment)&&void 0!==t?t:0;return null!==(r=Vx[a])&&void 0!==r?r:"\ud83d\udcc4"}function Kx(e){let{score:t}=e;const r=2*Math.PI*45,n=r-t/100*r,a=t>=70?"#5DD6CA":t>=40?"#F59E0B":"#EF4444";return(0,$d.jsxs)(Xg,{children:[(0,$d.jsxs)("svg",{viewBox:"0 0 100 100",children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"scoreGrad",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#5DD6CA"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1B6E66"})]})}),(0,$d.jsx)("circle",{className:"gauge-track",cx:"50",cy:"50",r:45}),(0,$d.jsx)("circle",{className:"gauge-fill",cx:"50",cy:"50",r:45,strokeDasharray:r,strokeDashoffset:n,stroke:t>=70?"url(#scoreGrad)":a})]}),(0,$d.jsxs)(Zg,{children:[(0,$d.jsx)(ex,{children:t}),(0,$d.jsx)(tx,{children:"/ 100"})]})]})}function Hx(){const[e,t]=(0,n.useState)(null),[r,a]=(0,n.useState)(null),[i,o]=(0,n.useState)(""),[l,s]=(0,n.useState)(""),[c,d]=(0,n.useState)("idle"),[u,p]=(0,n.useState)("");(0,n.useEffect)(()=>{let e=!1;return(async()=>{try{var r;const n=await async function(){var e;const t=[navigator.userAgent,navigator.language,`${window.screen.width}x${window.screen.height}`,Intl.DateTimeFormat().resolvedOptions().timeZone,String(null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:"")].join("|");try{const e=await crypto.subtle.digest("SHA-256",(new TextEncoder).encode(t));return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,"0")).join("").slice(0,24)}catch{return Math.random().toString(36).slice(2,14)}}();e||o(n);const a=await fetch(`/api/invoice-history?fingerprint=${encodeURIComponent(n)}`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.json();e||t(null!==(r=i.analyses)&&void 0!==r?r:[])}catch(n){e||a(n.message)}})(),()=>{e=!0}},[]);const h=(null!==e&&void 0!==e?e:[]).filter(e=>"auto"===e.route),f=h.reduce((e,t)=>{var r;return e+(null!==(r=t.annual_cost)&&void 0!==r?r:0)},0),m=h.reduce((e,t)=>{var r;return e+(null!==(r=t.net_saving)&&void 0!==r?r:0)},0),g=h.filter(e=>e.should_switch).length,x=function(e){if(!e.length)return 0;const t=new Set(e.map(e=>{var t,r;return null!==(t=null===(r=Am(e.category))||void 0===r?void 0:r.segment)&&void 0!==t?t:-1}).filter(e=>e>=0)),r=Math.round(t.size/8*65),n=e.reduce((e,t)=>{var r;return e+(null!==(r=t.net_saving)&&void 0!==r?r:0)},0),a=n>5e3?25:n>0?15:0,i=e.length>=5?10:e.length>=3?5:0;return Math.min(100,r+a+i)}(h),v=f>0?Math.round(m/f*100):0,b=new Set(h.map(e=>{var t,r;return null!==(t=null===(r=Am(e.category))||void 0===r?void 0:r.segment)&&void 0!==t?t:-1}).filter(e=>e>=0)),y=x>=80?"Excellent portf\xf6lj":x>=60?"Bra t\xe4ckning":x>=40?"Delvis t\xe4ckt":"Kom ig\xe5ng";return(0,$d.jsxs)(Hg,{children:[(0,$d.jsx)(du,{}),(0,$d.jsxs)(Wg,{children:[(0,$d.jsxs)(qg,{children:[(0,$d.jsx)("span",{className:"dot"}),"Leverant\xf6rsportf\xf6lj"]}),(0,$d.jsx)(Yg,{children:"Er Arvo Score\u2122"}),(0,$d.jsx)(Gg,{children:"Alla fakturor ni analyserat samlade p\xe5 ett st\xe4lle. Koppla Fortnox eller Visma f\xf6r att l\xe5sa upp hela er leverant\xf6rsbild och automatisera varje byte."})]}),(0,$d.jsxs)(Qg,{children:[null===e&&!r&&(0,$d.jsx)(Mx,{}),r&&(0,$d.jsx)(Bx,{children:"Kunde inte ladda portf\xf6ljdata \u2014 f\xf6rs\xf6k igen om en stund."}),null!==e&&h.length>0&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(Jg,{children:[(0,$d.jsx)(Kx,{score:x}),(0,$d.jsxs)(rx,{children:[(0,$d.jsxs)("h2",{children:["Arvo Score",(0,$d.jsx)("sup",{children:"\u2122"})," \u2014 ",y]}),(0,$d.jsxs)("p",{children:["Baserat p\xe5 ",h.length," analyserade fakturor och t\xe4ckning av ",b.size," av 8 leverant\xf6rssegment.",m>0&&` Potentiell nettobesparing: ${Mg(m)} kr/\xe5r.`]}),(0,$d.jsxs)(nx,{children:[(0,$d.jsxs)(ax,{children:[b.size,"/8 segment"]}),m>0&&(0,$d.jsxs)(ax,{children:["\u2212",v,"% kostnad m\xf6jlig"]}),g>0&&(0,$d.jsxs)(ax,{children:[g," byten rekommenderas"]})]})]})]}),(0,$d.jsxs)(ix,{children:[(0,$d.jsxs)(ox,{children:[(0,$d.jsx)(lx,{children:"Fakturor analyserade"}),(0,$d.jsxs)(sx,{children:[h.length,(0,$d.jsx)("span",{className:"unit",children:"st"})]})]}),(0,$d.jsxs)(ox,{children:[(0,$d.jsx)(lx,{children:"Total \xe5rskkostnad"}),(0,$d.jsxs)(sx,{children:[Mg(f),(0,$d.jsx)("span",{className:"unit",children:"kr/\xe5r"})]})]}),(0,$d.jsxs)(ox,{children:[(0,$d.jsx)(lx,{children:"Nettobesparing m\xf6jlig"}),(0,$d.jsxs)(cx,{children:[Mg(m),(0,$d.jsx)("span",{className:"unit",children:"kr/\xe5r"})]})]}),(0,$d.jsxs)(ox,{children:[(0,$d.jsx)(lx,{children:"Besparingspotential"}),(0,$d.jsxs)(sx,{children:[v,(0,$d.jsx)("span",{className:"unit",children:"%"})]})]})]}),(0,$d.jsxs)(dx,{children:[(0,$d.jsxs)(ux,{children:[(0,$d.jsx)("h4",{children:"Segmentt\xe4ckning"}),(0,$d.jsxs)("span",{children:[b.size," av 8 analyserade"]})]}),(0,$d.jsx)(px,{children:Bg.map(e=>{const t=b.has(e.id);return(0,$d.jsxs)(hx,{$covered:t,children:[(0,$d.jsx)(fx,{$covered:t}),(0,$d.jsx)(mx,{$covered:t,children:e.label})]},e.id)})})]}),(0,$d.jsx)(xx,{children:"Analyserade leverant\xf6rer"}),(0,$d.jsx)(gx,{children:h.map(e=>{var t;const r=Am(e.category),n=e.should_switch&&(null!==(t=e.net_saving)&&void 0!==t?t:0)>0;return(0,$d.jsxs)(vx,{children:[(0,$d.jsx)(bx,{$saving:n}),(0,$d.jsx)(yx,{children:Ux(e.category)}),(0,$d.jsxs)(kx,{children:[(0,$d.jsx)(jx,{children:e.supplier||e.normalized_supplier||"Ok\xe4nd leverant\xf6r"}),(0,$d.jsxs)(wx,{children:[r.label," \xb7 ",(a=e.created_at,a?new Date(a).toLocaleDateString("sv-SE",{day:"numeric",month:"short"}):"")]})]}),(0,$d.jsxs)(Sx,{children:[null!=e.annual_cost&&(0,$d.jsxs)($x,{children:[Mg(e.annual_cost)," kr/\xe5r"]}),n?(0,$d.jsxs)(zx,{$pos:!0,children:["\u2212",Mg(e.net_saving)," kr/\xe5r m\xf6jligt"]}):(0,$d.jsx)(Ex,{children:"Optimerat"})]})]},e.id);var a})}),g>0&&(0,$d.jsxs)("p",{style:{fontSize:13,color:"#5C6E68",marginBottom:16},children:[g," av ",h.length," leverant\xf6rer har besparingspotential."," ","Arvo tar 20\xa0% av realiserad besparing \u2014 inga fasta avgifter."]}),(0,$d.jsxs)(_x,{children:[(0,$d.jsx)(Nx,{children:"Arvo-rapport"}),(0,$d.jsx)(Ax,{children:"F\xe5 din kompletta Arvo-rapport"}),(0,$d.jsx)(Cx,{children:"Vi sammanst\xe4ller en PDF med alla besparingar och kontaktar dig inom 24h."}),"success"===c?(0,$d.jsx)(Dx,{children:"\u2713 Rapporten \xe4r skickad! Kolla din inkorg."}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(Fx,{onSubmit:async function(e){if(e.preventDefault(),"loading"!==c){d("loading"),p("");try{var t;const e=await fetch("/api/send-report",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fingerprint:i,email:l})}),r=await e.json();if(!e.ok)throw new Error(null!==(t=r.error)&&void 0!==t?t:`HTTP ${e.status}`);d("success")}catch(r){p(r.message),d("error")}}},children:[(0,$d.jsx)(Tx,{type:"email",placeholder:"din@email.se",value:l,onChange:e=>s(e.target.value),required:!0,disabled:"loading"===c}),(0,$d.jsx)(Px,{type:"submit",disabled:"loading"===c||!l,children:"loading"===c?"Skickar\u2026":"F\xe5 din kompletta Arvo-rapport \u2192"})]}),"error"===c&&u&&(0,$d.jsx)(Lx,{children:u})]})]})]}),null!==e&&0===h.length&&(0,$d.jsxs)(Ix,{children:[(0,$d.jsx)("h3",{children:"Inga analyserade fakturor \xe4nnu"}),(0,$d.jsx)("p",{children:"Ladda upp din f\xf6rsta leverant\xf6rsfaktura p\xe5 PDF-format. Vi extraherar kostnad, kategori och sparar resultatet h\xe4r automatiskt."}),(0,$d.jsx)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"md",children:"Analysera din f\xf6rsta faktura \u2192"})]}),(0,$d.jsxs)(Rx,{children:[(0,$d.jsxs)(Ox,{children:[(0,$d.jsxs)("h3",{children:["L\xe5s upp er fullst\xe4ndiga Arvo Score",(0,$d.jsx)("sup",{children:"\u2122"})]}),(0,$d.jsx)("p",{children:"Koppla Fortnox eller Visma \u2014 vi skannar hela er leverant\xf6rsreskontra, ber\xe4knar er totala Arvo Score och levererar en komplett Leverant\xf6rsrapport. Vi sk\xf6ter varje byte fr\xe5n upps\xe4gning till nytt avtal."})]}),(0,$d.jsx)(Id,{as:vl,to:"/connect",$variant:"gradient",$size:"md",children:"Koppla Fortnox / Visma \u2192"})]})]}),(0,$d.jsx)(xu,{})]})}const Wx=jd`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}`,qx=vd.div`min-height:100vh;background:#0E1A17;color:#fff;font-family:system-ui,sans-serif;padding:32px 24px;`,Yx=vd.h1`font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 4px;`,Gx=vd.p`font-size:13px;color:rgba(255,255,255,.45);margin:0 0 28px;`,Qx=vd.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;@media(max-width:700px){grid-template-columns:1fr 1fr;}`,Jx=vd.div`background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px 18px;`,Xx=vd.p`font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.4);margin:0 0 4px;`,Zx=vd.p`font-size:22px;font-weight:800;color:#5DD6CA;margin:0;letter-spacing:-.02em;`,ev=vd.div`margin-bottom:28px;animation:${Wx} .4s ease both;`,tv=vd.h2`font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 10px;`,rv=vd.div`background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;`,nv=vd.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:10px 16px;background:rgba(255,255,255,.06);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);gap:12px;`,av=vd.div`display:grid;grid-template-columns:${e=>{let{$cols:t}=e;return t}};padding:11px 16px;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;gap:12px;align-items:center;&:hover{background:rgba(255,255,255,.03);}`,iv=vd.span`display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600;background:${e=>{let{$c:t}=e;return null!==t&&void 0!==t?t:"rgba(255,255,255,.1)"}};color:#fff;`,ov=vd.form`display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;`,lv=vd.input`padding:10px 14px;border-radius:100px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;flex:1;min-width:200px;outline:none;&::placeholder{color:rgba(255,255,255,.3);}`,sv=vd.button`padding:10px 20px;border-radius:100px;border:none;cursor:pointer;font-size:13px;font-weight:700;background:linear-gradient(135deg,#5DD6CA,#1B6E66);color:#fff;white-space:nowrap;&:disabled{opacity:.5;cursor:not-allowed;}`,cv=vd.div`margin-top:8px;background:rgba(93,214,202,.1);border:1px solid rgba(93,214,202,.25);border-radius:8px;padding:10px 14px;font-size:12px;color:#5DD6CA;word-break:break-all;`,dv=vd.div`max-width:360px;margin:80px auto;text-align:center;`,uv=vd.p`padding:20px 16px;font-size:13px;color:rgba(255,255,255,.3);margin:0;`;function pv(e){return e?new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"\u2013"}function hv(e){return null==e?"\u2013":Math.round(e).toLocaleString("sv-SE")}function fv(){var e,t,r,a,i,o,l,s,c,d,u,p,h,f,m,g,x,v;const[b,y]=(0,n.useState)(()=>{var e;return null!==(e=sessionStorage.getItem("arvo_admin_token"))&&void 0!==e?e:""}),[k,j]=(0,n.useState)(""),[w,S]=(0,n.useState)(!1),[$,z]=(0,n.useState)(null),[E,_]=(0,n.useState)(""),[N,A]=(0,n.useState)(""),[C,F]=(0,n.useState)(""),[T,P]=(0,n.useState)("72"),[D,L]=(0,n.useState)(""),[R,O]=(0,n.useState)("idle"),[I,M]=(0,n.useState)("queue"),[B,V]=(0,n.useState)("idle"),[U,K]=(0,n.useState)(null),[H,W]=(0,n.useState)(null),[q,Y]=(0,n.useState)(null),[G,Q]=(0,n.useState)("list"),[J,X]=(0,n.useState)(""),[Z,ee]=(0,n.useState)(null),[te,re]=(0,n.useState)(null),[ne,ae]=(0,n.useState)(null),[ie,oe]=(0,n.useState)(null),[le,se]=(0,n.useState)(null),[ce,de]=(0,n.useState)("category"),[ue,pe]=(0,n.useState)(""),[he,fe]=(0,n.useState)(""),[me,ge]=(0,n.useState)(!1),[xe,ve]=(0,n.useState)(null),[be,ye]=(0,n.useState)(null),[ke,je]=(0,n.useState)(null),[we,Se]=(0,n.useState)({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),[$e,ze]=(0,n.useState)("idle"),[Ee,_e]=(0,n.useState)(null),Ne=(0,n.useCallback)(async e=>{_("");try{const r=await fetch("/api/admin/dashboard",{headers:{"x-admin-token":e}}),n=await r.json();var t;if(!r.ok)return void _(null!==(t=n.error)&&void 0!==t?t:"Ej beh\xf6rig");z(n),S(!0),sessionStorage.setItem("arvo_admin_token",e)}catch{_("N\xe4tverksfel")}},[]);(0,n.useEffect)(()=>{b&&Ne(b)},[b,Ne]);const Ae=(0,n.useCallback)(()=>{fetch("/api/admin/prospects",{headers:{"x-admin-token":b}}).then(e=>e.json()).then(e=>{var t,r;ye(null!==(t=e.prospects)&&void 0!==t?t:[]),je(null!==(r=e.stats)&&void 0!==r?r:{})}).catch(()=>{})},[b]);if(!w)return(0,$d.jsx)(qx,{children:(0,$d.jsxs)(dv,{children:[(0,$d.jsx)(Yx,{children:"Arvo Admin"}),(0,$d.jsx)(Gx,{children:"Ange ADMIN_TOKEN f\xf6r att forts\xe4tta"}),E&&(0,$d.jsx)("p",{style:{color:"#EF4444",fontSize:13,marginBottom:12},children:E}),(0,$d.jsxs)("form",{onSubmit:async function(e){e.preventDefault(),y(k)},style:{display:"flex",flexDirection:"column",gap:10},children:[(0,$d.jsx)(lv,{type:"password",placeholder:"Admin-token",value:k,onChange:e=>j(e.target.value),style:{borderRadius:10,textAlign:"center"}}),(0,$d.jsx)(sv,{type:"submit",disabled:!k,children:"Logga in \u2192"})]})]})});const Ce=null!==(e=null===$||void 0===$?void 0:$.stats)&&void 0!==e?e:{},Fe="2fr 1.5fr 1fr 1fr 1fr 1.2fr 84px",Te={padding:"6px 10px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.15)",background:"rgba(255,255,255,.06)",color:"#fff",fontSize:12.5,cursor:"pointer",outline:"none"},Pe=["saas-crm","saas-productivity","saas-finance","saas-devtools","saas-other","mobil","bredband","el","skrivarleasing","kortterminal","vaxel","loneadmin","utrustningsleasing","managed-workplace","larm-bevakning","foretagshalsovard","bankavgifter","forsakring-foretag","serverhosting","it-support","faktura-tjanst","leasing-bil"],De="2fr 1.5fr 1.5fr 1.5fr",Le="2fr 1.5fr 0.5fr 2fr 1.5fr";return(0,$d.jsxs)(qx,{children:[(0,$d.jsx)(Yx,{children:"Arvo Admin"}),(0,$d.jsxs)(Gx,{children:["Live-data fr\xe5n Neon Postgres \xb7 senast laddad ",(new Date).toLocaleTimeString("sv-SE")]}),(0,$d.jsxs)(Qx,{children:[(0,$d.jsxs)(Jx,{children:[(0,$d.jsx)(Xx,{children:"Totalt analyserade"}),(0,$d.jsx)(Zx,{children:hv(Ce.total_analyses)})]}),(0,$d.jsxs)(Jx,{children:[(0,$d.jsx)(Xx,{children:"Auto (klara)"}),(0,$d.jsx)(Zx,{children:hv(Ce.auto_count)})]}),(0,$d.jsxs)(Jx,{children:[(0,$d.jsx)(Xx,{children:"Review queue"}),(0,$d.jsx)(Zx,{style:{color:"#F59E0B"},children:hv(Ce.review_count)})]}),(0,$d.jsxs)(Jx,{children:[(0,$d.jsx)(Xx,{children:"Unika anv\xe4ndare"}),(0,$d.jsx)(Zx,{children:hv(Ce.unique_users)})]}),(0,$d.jsxs)(Jx,{children:[(0,$d.jsx)(Xx,{children:"Byten rekommenderade"}),(0,$d.jsx)(Zx,{children:hv(Ce.switch_recommended)})]}),(0,$d.jsxs)(Jx,{children:[(0,$d.jsx)(Xx,{children:"Snitt nettobesparing"}),(0,$d.jsxs)(Zx,{children:[hv(Ce.avg_net_saving)," kr"]})]}),(0,$d.jsxs)(Jx,{children:[(0,$d.jsx)(Xx,{children:"Waitlist"}),(0,$d.jsx)(Zx,{children:null!==(t=null===$||void 0===$||null===(r=$.waitlist)||void 0===r?void 0:r.length)&&void 0!==t?t:"\u2013"})]}),(0,$d.jsxs)(Jx,{children:[(0,$d.jsx)(Xx,{children:"Feedback"}),(0,$d.jsx)(Zx,{children:null!==(a=null===$||void 0===$||null===(i=$.feedback)||void 0===i?void 0:i.length)&&void 0!==a?a:"\u2013"})]})]}),(0,$d.jsxs)(ev,{children:[(0,$d.jsx)(tv,{children:"Databasmigration"}),(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)("div",{style:{padding:"16px 18px",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},children:[(0,$d.jsxs)("p",{style:{margin:0,fontSize:13,color:"rgba(255,255,255,.6)",flex:1},children:["Skapar tabellerna ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"waitlist"}),","," ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"invoice_feedback"})," och"," ",(0,$d.jsx)("code",{style:{background:"rgba(255,255,255,.1)",padding:"1px 6px",borderRadius:4},children:"magic_tokens"})," i databasen. S\xe4kert att k\xf6ra flera g\xe5nger (IF NOT EXISTS)."]}),(0,$d.jsx)(sv,{type:"button",onClick:async function(){V("loading"),K(null);try{const e=await fetch("/api/admin/run-migration",{method:"POST",headers:{"x-admin-token":b}}),t=await e.json();K(t),V(t.ok?"done":"error")}catch{V("error")}},disabled:"loading"===B,style:{background:"done"===B?"#16a34a":void 0},children:"loading"===B?"K\xf6r migration\u2026":"done"===B?"\u2713 Migration klar!":"K\xf6r migration \u2192"})]}),U&&(0,$d.jsx)("div",{style:{padding:"0 18px 16px",display:"flex",flexDirection:"column",gap:4},children:null===(o=U.results)||void 0===o?void 0:o.map(e=>(0,$d.jsxs)("div",{style:{fontSize:12,color:e.ok?"#5DD6CA":"#EF4444"},children:[e.ok?"\u2713":"\u2717"," ",e.name,e.error?` \u2014 ${e.error}`:""]},e.name))})]})]}),(0,$d.jsxs)(ev,{children:[(0,$d.jsx)(tv,{children:"Generera demo-l\xe4nk (Magic Link)"}),(0,$d.jsx)(rv,{children:(0,$d.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$d.jsx)("p",{style:{margin:"0 0 12px",fontSize:13,color:"rgba(255,255,255,.6)"},children:"Skickar en tidsbegr\xe4nsad l\xe4nk som ger direkt\xe5tkomst utan gate."}),(0,$d.jsxs)(ov,{onSubmit:async function(e){if(e.preventDefault(),N){O("loading"),L("");try{const e=await fetch("/api/admin/magic-link",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":b},body:JSON.stringify({email:N,note:C||void 0,expiresInHours:Number(T)})}),t=await e.json();if(!e.ok)return void O("error");L(t.link),O("done")}catch{O("error")}}},children:[(0,$d.jsx)(lv,{type:"email",placeholder:"mottagare@foretag.se",value:N,onChange:e=>A(e.target.value),required:!0}),(0,$d.jsx)(lv,{placeholder:"Notering (frivillig)",value:C,onChange:e=>F(e.target.value),style:{maxWidth:200}}),(0,$d.jsx)(lv,{type:"number",placeholder:"Timmar (default 72)",value:T,onChange:e=>P(e.target.value),style:{maxWidth:140}}),(0,$d.jsx)(sv,{type:"submit",disabled:!N||"loading"===R,children:"loading"===R?"Genererar\u2026":"Skicka magic link \u2192"})]}),D&&(0,$d.jsxs)(cv,{children:["\u2713 L\xe4nk skickad till ",N,(0,$d.jsx)("br",{}),(0,$d.jsx)("strong",{children:D})]}),"error"===R&&(0,$d.jsx)("p",{style:{color:"#EF4444",fontSize:12,marginTop:8},children:"Misslyckades \u2014 kontrollera ADMIN_TOKEN och RESEND_API_KEY."})]})})]}),(0,$d.jsx)("div",{style:{display:"flex",gap:4,marginBottom:16},children:[["queue","Review Queue"],["waitlist","Waitlist"],["feedback","Feedback"],["corrections","Korrektioner \ud83e\udde0"],["connections","Anslutningar \ud83d\udd17"],["outbound","Outbound \ud83d\ude80"]].map(e=>{let[t,r]=e;return(0,$d.jsx)("button",{onClick:()=>M(t),style:{padding:"7px 16px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:600,background:I===t?"#5DD6CA":"rgba(255,255,255,.08)",color:I===t?"#0E1A17":"rgba(255,255,255,.6)"},children:r},t)})}),"queue"===I&&(0,$d.jsx)(ev,{children:(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:Fe,children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"\xc5rskkostnad"}),(0,$d.jsx)("span",{children:"Bransch"}),(0,$d.jsx)("span",{children:"Anst\xe4llda"}),(0,$d.jsx)("span",{children:"Datum"}),(0,$d.jsx)("span",{children:"\xc5tg\xe4rd"})]}),0===(null!==(l=null===$||void 0===$?void 0:$.reviewQueue)&&void 0!==l?l:[]).length&&(0,$d.jsx)(uv,{children:"Inga review_queue-fakturor \xe4nnu."}),(null!==(s=null===$||void 0===$?void 0:$.reviewQueue)&&void 0!==s?s:[]).map(e=>(0,$d.jsxs)(n.Fragment,{children:[(0,$d.jsxs)(av,{$cols:Fe,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.supplier||e.normalized_supplier||"\u2013"}),(0,$d.jsx)(iv,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$d.jsxs)("span",{children:[hv(e.annual_cost)," kr"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.industry}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)"},children:e.employees}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:pv(e.created_at)}),(0,$d.jsx)("button",{onClick:()=>{const t=le===e.id;se(t?null:e.id),pe(""),fe(""),de("category"),ve(null)},style:{padding:"4px 10px",borderRadius:100,border:"1px solid rgba(93,214,202,.3)",background:le===e.id?"rgba(93,214,202,.15)":"transparent",color:"#5DD6CA",cursor:"pointer",fontSize:11.5,fontWeight:600},children:le===e.id?"\u2715":"Korrigera"})]}),le===e.id&&(0,$d.jsxs)("div",{style:{padding:"14px 16px",borderTop:"1px solid rgba(93,214,202,.12)",background:"rgba(93,214,202,.03)"},children:[(0,$d.jsx)("p",{style:{margin:"0 0 10px",fontSize:12,color:"rgba(255,255,255,.45)"},children:"Manuell korrektion \u2014 sparas som labeled data och tr\xe4nar systemet."}),(0,$d.jsxs)("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[(0,$d.jsxs)("select",{value:ce,onChange:e=>{de(e.target.value),pe("")},style:Te,children:[(0,$d.jsx)("option",{value:"category",children:"Kategori"}),(0,$d.jsx)("option",{value:"recurring",children:"\xc5terkommande"}),(0,$d.jsx)("option",{value:"route",children:"Route"})]}),"category"===ce&&(0,$d.jsxs)("select",{value:ue,onChange:e=>pe(e.target.value),style:Te,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj r\xe4tt kategori\u2026"}),Pe.map(e=>(0,$d.jsx)("option",{value:e,children:e},e))]}),"recurring"===ce&&(0,$d.jsxs)("select",{value:ue,onChange:e=>pe(e.target.value),style:Te,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$d.jsx)("option",{value:"true",children:"true (\xe5terkommande)"}),(0,$d.jsx)("option",{value:"false",children:"false (eng\xe5ngskostnad)"})]}),"route"===ce&&(0,$d.jsxs)("select",{value:ue,onChange:e=>pe(e.target.value),style:Te,children:[(0,$d.jsx)("option",{value:"",children:"V\xe4lj\u2026"}),(0,$d.jsx)("option",{value:"auto",children:"auto"}),(0,$d.jsx)("option",{value:"review_queue",children:"review_queue"}),(0,$d.jsx)("option",{value:"unsupported",children:"unsupported"})]}),(0,$d.jsx)(lv,{placeholder:"Anledning (valfri)",value:he,onChange:e=>fe(e.target.value),style:{flex:"1 1 140px",borderRadius:8,padding:"6px 12px",fontSize:12.5}}),(0,$d.jsx)(sv,{type:"button",onClick:()=>async function(e){if(ue&&!me){ge(!0);try{var t,r;const n="category"===ce?null!==(t=e.category)&&void 0!==t?t:"":"recurring"===ce?"false":"";(await fetch("/api/admin/corrections",{method:"POST",headers:{"Content-Type":"application/json","x-admin-token":b},body:JSON.stringify({analysisId:e.id,field:ce,originalValue:n,correctedValue:ue,reason:he||"operator_manual_review",category:"category"===ce?ue:null!==(r=e.category)&&void 0!==r?r:null,supplier:e.normalized_supplier||e.supplier||null,operatorReasoning:J||null})})).ok&&(ve(e.id),setTimeout(()=>{ve(null),se(null),pe(""),fe(""),X(""),de("category")},2500))}catch{}finally{ge(!1)}}}(e),disabled:!ue||me,style:{padding:"7px 18px",fontSize:12.5},children:me?"Sparar\u2026":"Spara \u2192"})]}),(0,$d.jsx)("textarea",{placeholder:"Resonemang / princip (valfri men v\xe4rdefullt \u2014 anv\xe4nds som few-shot-exempel i AI:n n\xe4sta g\xe5ng)",value:J,onChange:e=>X(e.target.value),style:{marginTop:8,width:"100%",boxSizing:"border-box",padding:"8px 12px",borderRadius:8,border:"1.5px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.05)",color:"#fff",fontSize:12,fontFamily:"inherit",resize:"vertical",minHeight:56,outline:"none"}}),xe===e.id&&(0,$d.jsx)("p",{style:{color:"#5DD6CA",fontSize:12,margin:"8px 0 0"},children:"\u2713 Korrektion sparad \u2014 systemet l\xe4r sig."})]})]},e.id))]})}),"waitlist"===I&&(0,$d.jsx)(ev,{children:(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:De,children:[(0,$d.jsx)("span",{children:"E-post"}),(0,$d.jsx)("span",{children:"K\xe4lla"}),(0,$d.jsx)("span",{children:"Reason"}),(0,$d.jsx)("span",{children:"Datum"})]}),0===(null!==(c=null===$||void 0===$?void 0:$.waitlist)&&void 0!==c?c:[]).length&&(0,$d.jsx)(uv,{children:"Ingen waitlist \xe4nnu."}),(null!==(d=null===$||void 0===$?void 0:$.waitlist)&&void 0!==d?d:[]).map(e=>{var t;return(0,$d.jsxs)(av,{$cols:De,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.email}),(0,$d.jsx)(iv,{$c:"rgba(245,158,11,.15)",children:e.source}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.reason)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:pv(e.created_at)})]},e.id)})]})}),"feedback"===I&&(0,$d.jsx)(ev,{children:(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:Le,children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"R\xf6st"}),(0,$d.jsx)("span",{children:"Kommentar"}),(0,$d.jsx)("span",{children:"Datum"})]}),0===(null!==(u=null===$||void 0===$?void 0:$.feedback)&&void 0!==u?u:[]).length&&(0,$d.jsx)(uv,{children:"Ingen feedback \xe4nnu."}),(null!==(p=null===$||void 0===$?void 0:$.feedback)&&void 0!==p?p:[]).map(e=>{var t,r;return(0,$d.jsxs)(av,{$cols:Le,children:[(0,$d.jsx)("span",{style:{fontWeight:600},children:e.supplier||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(t=e.category)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{fontSize:18},children:"up"===e.vote?"\ud83d\udc4d":"\ud83d\udc4e"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:11.5},children:null!==(r=e.comment)&&void 0!==r?r:"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:pv(e.created_at)})]},e.id)})]})}),"corrections"===I&&(0,$d.jsxs)(ev,{children:[(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"},children:[(0,$d.jsx)(tv,{style:{margin:0},children:"Flywheel \u2014 Labeled Corrections"}),(0,$d.jsxs)("div",{style:{marginLeft:"auto",display:"flex",gap:4,flexWrap:"wrap"},children:[[["list","Lista"],["patterns","M\xf6nster"],["learning","Aktiv inl\xe4rning \ud83d\udd2c"],["market","Marknadsdata \ud83d\udcca"]].map(e=>{let[t,r]=e;return(0,$d.jsx)("button",{onClick:()=>{Q(t);const e={"x-admin-token":b};"patterns"!==t||q||fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return Y(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"!==t||H||fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return W(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"!==t||Z||fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ee(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"!==t||te||fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>re(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:G===t?"#5DD6CA":"rgba(255,255,255,.08)",color:G===t?"#0E1A17":"rgba(255,255,255,.6)"},children:r},t)}),(0,$d.jsx)("button",{onClick:()=>{const e={"x-admin-token":b};"patterns"===G&&fetch("/api/admin/corrections?patterns",{headers:e}).then(e=>e.json()).then(e=>{var t;return Y(null!==(t=e.patterns)&&void 0!==t?t:[])}).catch(()=>{}),"list"===G&&fetch("/api/admin/corrections",{headers:e}).then(e=>e.json()).then(e=>{var t;return W(null!==(t=e.corrections)&&void 0!==t?t:[])}).catch(()=>{}),"learning"===G&&fetch("/api/admin/corrections?learning",{headers:e}).then(e=>e.json()).then(e=>{var t;return ee(null!==(t=e.queue)&&void 0!==t?t:[])}).catch(()=>{}),"market"===G&&fetch("/api/admin/corrections?market",{headers:e}).then(e=>e.json()).then(e=>re(e)).catch(()=>{})},style:{padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]})]}),"list"===G&&(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$d.jsx)("span",{children:"F\xe4lt"}),(0,$d.jsx)("span",{children:"Fr\xe5n"}),(0,$d.jsx)("span",{children:"Till"}),(0,$d.jsx)("span",{children:"Anledning"}),(0,$d.jsx)("span",{children:"Av"}),(0,$d.jsx)("span",{children:"Datum"})]}),null===H&&(0,$d.jsx)(uv,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta korrektioner."}),0===(null===H||void 0===H?void 0:H.length)&&(0,$d.jsx)(uv,{children:"Inga korrektioner \xe4nnu \u2014 systemet \xe4r nytt."}),(null!==H&&void 0!==H?H:[]).map(e=>(0,$d.jsxs)(n.Fragment,{children:[(0,$d.jsxs)(av,{$cols:"1fr 1fr 1fr 1fr 80px 110px",children:[(0,$d.jsx)(iv,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$d.jsx)("span",{style:{color:"rgba(255,100,100,.8)",fontSize:11.5},children:e.original_value||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(100,220,180,.8)",fontSize:11.5},children:e.corrected_value||"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.45)",fontSize:11},children:e.reason}),(0,$d.jsx)(iv,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:pv(e.created_at)})]}),e.operator_reasoning&&(0,$d.jsxs)("div",{style:{padding:"6px 16px 10px",borderTop:"1px solid rgba(255,255,255,.04)",background:"rgba(93,214,202,.02)"},children:[(0,$d.jsx)("span",{style:{fontSize:10.5,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase",color:"rgba(93,214,202,.5)",marginRight:8},children:"Princip"}),(0,$d.jsx)("span",{style:{fontSize:12,color:"rgba(255,255,255,.55)"},children:e.operator_reasoning})]})]},e.id))]}),"patterns"===G&&(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:"1fr 2fr 80px 80px",children:[(0,$d.jsx)("span",{children:"F\xe4lt"}),(0,$d.jsx)("span",{children:"M\xf6nster (reason)"}),(0,$d.jsx)("span",{children:"Antal"}),(0,$d.jsx)("span",{children:"Av"})]}),null===q&&(0,$d.jsx)(uv,{children:"Klicka \u21bb Ladda f\xf6r att analysera m\xf6nster."}),0===(null===q||void 0===q?void 0:q.length)&&(0,$d.jsx)(uv,{children:"Inga m\xf6nster \xe4nnu."}),(null!==q&&void 0!==q?q:[]).map((e,t)=>(0,$d.jsxs)(av,{$cols:"1fr 2fr 80px 80px",children:[(0,$d.jsx)(iv,{$c:"rgba(93,214,202,.15)",children:e.field}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.6)",fontSize:11.5},children:e.reason}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.count>=5?"#F59E0B":"#5DD6CA"},children:[e.count,"\xd7"]}),(0,$d.jsx)(iv,{$c:"operator"===e.corrected_by?"rgba(245,158,11,.2)":"rgba(93,214,202,.1)",children:e.corrected_by})]},t))]}),"learning"===G&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)("div",{style:{marginBottom:12,padding:"10px 14px",background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:10,fontSize:12.5,color:"rgba(255,255,255,.7)"},children:"Leverant\xf6rer som inte matchar n\xe5got k\xe4nt fingerprint \u2014 flaggade automatiskt av pipeline. L\xe4gg till korrektion f\xf6r att l\xe4ra systemet."}),(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:"2fr 80px 1.5fr",children:[(0,$d.jsx)("span",{children:"Leverant\xf6r (ok\xe4nd)"}),(0,$d.jsx)("span",{children:"Sedd"}),(0,$d.jsx)("span",{children:"Senast"})]}),null===Z&&(0,$d.jsx)(uv,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta k\xf6n."}),0===(null===Z||void 0===Z?void 0:Z.length)&&(0,$d.jsx)(uv,{children:"Inga ok\xe4nda leverant\xf6rer \u2014 systemet k\xe4nner igen alla det sett."}),(null!==Z&&void 0!==Z?Z:[]).map((e,t)=>(0,$d.jsxs)(av,{$cols:"2fr 80px 1.5fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,color:"#F59E0B"},children:e.supplier}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.seen_count>=3?"#EF4444":"#F59E0B"},children:[e.seen_count,"\xd7"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:pv(e.last_seen)})]},t))]})]}),"market"===G&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20},children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)(tv,{children:"Kategorif\xf6rdelning (operat\xf6rskorrektioner)"}),(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:"2fr 80px",children:[(0,$d.jsx)("span",{children:"Kategori"}),(0,$d.jsx)("span",{children:"Antal"})]}),!te&&(0,$d.jsx)(uv,{children:"Klicka \u21bb Ladda."}),0===(null===te||void 0===te||null===(h=te.categoryDist)||void 0===h?void 0:h.length)&&(0,$d.jsx)(uv,{children:"Inga korrektioner \xe4nnu."}),(null!==(f=null===te||void 0===te?void 0:te.categoryDist)&&void 0!==f?f:[]).map((e,t)=>(0,$d.jsxs)(av,{$cols:"2fr 80px",children:[(0,$d.jsx)(iv,{$c:"rgba(93,214,202,.15)",children:e.category}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:[e.count,"\xd7"]})]},t))]})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)(tv,{children:"Mest korrigerade leverant\xf6rer"}),(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:"2fr 80px 1fr",children:[(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Korr."}),(0,$d.jsx)("span",{children:"Senast"})]}),!te&&(0,$d.jsx)(uv,{children:"Klicka \u21bb Ladda."}),0===(null===te||void 0===te||null===(m=te.topSuppliers)||void 0===m?void 0:m.length)&&(0,$d.jsx)(uv,{children:"Inga korrektioner \xe4nnu."}),(null!==(g=null===te||void 0===te?void 0:te.topSuppliers)&&void 0!==g?g:[]).map((e,t)=>(0,$d.jsxs)(av,{$cols:"2fr 80px 1fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12},children:e.supplier}),(0,$d.jsxs)("span",{style:{fontWeight:700,color:e.correction_count>=5?"#F59E0B":"#5DD6CA"},children:[e.correction_count,"\xd7"]}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11},children:pv(e.last_corrected)})]},t))]})]})]}),(0,$d.jsx)(tv,{children:"Nya leverant\xf6rer per vecka (senaste 90 dagar)"}),(null===te||void 0===te||null===(x=te.discoveryTrend)||void 0===x?void 0:x.length)>0?(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:"2fr 1fr",children:[(0,$d.jsx)("span",{children:"Vecka"}),(0,$d.jsx)("span",{children:"Ny leverant\xf6rer"})]}),(null!==(v=te.discoveryTrend)&&void 0!==v?v:[]).map((e,t)=>(0,$d.jsxs)(av,{$cols:"2fr 1fr",children:[(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.5)",fontSize:12},children:e.week}),(0,$d.jsx)("span",{style:{fontWeight:700,color:"#5DD6CA"},children:e.new_suppliers})]},t))]}):(0,$d.jsx)(uv,{children:te?"Inga data \xe4nnu \u2014 skicka in fakturor f\xf6r att bygga marknadsdata.":"Klicka \u21bb Ladda."})]})]}),"connections"===I&&(0,$d.jsxs)(ev,{children:[(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:14,alignItems:"center"},children:[(0,$d.jsx)(tv,{style:{margin:0},children:"OAuth-anslutningar \u2014 Gmail & Outlook"}),(0,$d.jsx)("button",{onClick:()=>{fetch("/api/admin/connections",{headers:{"x-admin-token":b}}).then(e=>e.json()).then(e=>{var t,r;ae(null!==(t=e.connections)&&void 0!==t?t:[]),oe(null!==(r=e.stats)&&void 0!==r?r:[])}).catch(()=>{})},style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),ie&&ie.length>0&&(0,$d.jsx)("div",{style:{display:"flex",gap:10,marginBottom:14},children:ie.map(e=>(0,$d.jsxs)("div",{style:{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"10px 16px",minWidth:130},children:[(0,$d.jsx)(Xx,{children:e.provider}),(0,$d.jsxs)("div",{style:{display:"flex",gap:12,marginTop:4},children:[(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#5DD6CA"},children:e.total}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"totalt"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#4ADE80"},children:e.active}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"aktiva"})]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{style:{fontSize:18,fontWeight:800,color:"#F59E0B"},children:e.last_7d}),(0,$d.jsx)("div",{style:{fontSize:10,color:"rgba(255,255,255,.35)"},children:"7 dagar"})]})]})]},e.provider))}),(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$d.jsx)("span",{children:"E-post"}),(0,$d.jsx)("span",{children:"Leverant\xf6r"}),(0,$d.jsx)("span",{children:"Token"}),(0,$d.jsx)("span",{children:"Kopplad"}),(0,$d.jsx)("span",{children:"Uppdaterad"}),(0,$d.jsx)("span",{children:"Status"})]}),null===ne&&(0,$d.jsx)(uv,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta anslutningar."}),0===(null===ne||void 0===ne?void 0:ne.length)&&(0,$d.jsx)(uv,{children:"Inga anslutningar \xe4nnu \u2014 ingen har kopplat Gmail/Outlook."}),(null!==ne&&void 0!==ne?ne:[]).map(e=>(0,$d.jsxs)(av,{$cols:"2fr 1fr 1fr 1.5fr 1.5fr 80px",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.email}),(0,$d.jsx)(iv,{$c:"gmail"===e.provider?"rgba(234,67,53,.2)":"rgba(0,120,212,.2)",children:e.provider}),(0,$d.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.4)"},children:e.token_expiry?new Date(e.token_expiry).toLocaleDateString("sv-SE"):"\u2013"}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:pv(e.created_at)}),(0,$d.jsx)("span",{style:{color:"rgba(255,255,255,.4)",fontSize:11.5},children:pv(e.updated_at)}),(0,$d.jsx)(iv,{$c:e.token_valid?"rgba(74,222,128,.2)":"rgba(239,68,68,.2)",children:e.token_valid?"OK":"Utg\xe5ngen"})]},e.id))]})]}),"outbound"===I&&(0,$d.jsxs)(ev,{children:[(0,$d.jsx)("div",{style:{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"},children:[["Skapade",null===ke||void 0===ke?void 0:ke.total,"#5DD6CA"],["Mail skickade",null===ke||void 0===ke?void 0:ke.email_sent,"#5DD6CA"],["\xd6ppnade l\xe4nken",null===ke||void 0===ke?void 0:ke.opened,"#F59E0B"],["Konverterade",null===ke||void 0===ke?void 0:ke.converted,"#4ADE80"]].map(e=>{let[t,r,n]=e;return(0,$d.jsxs)(Jx,{style:{minWidth:120},children:[(0,$d.jsx)(Xx,{children:t}),(0,$d.jsx)(Zx,{style:{color:n},children:null!==r&&void 0!==r?r:"\u2013"})]},t)})}),(0,$d.jsx)(tv,{children:"Skapa prospect"}),(0,$d.jsx)(rv,{children:(0,$d.jsxs)("div",{style:{padding:"16px 18px"},children:[(0,$d.jsxs)("form",{onSubmit:async function(e){if(e.preventDefault(),"loading"!==$e&&we.companyName&&we.employees){ze("loading"),_e(null);try{const e=await fetch("/api/generate-prospect",{method:"POST",headers:{"Content-Type":"application/json","x-arvo-admin":b},body:JSON.stringify({companyName:we.companyName,sniCode:we.sniCode||void 0,employees:Number(we.employees),contactEmail:we.contactEmail||void 0,sendEmail:we.sendEmail,createdBy:"admin-ui"})}),t=await e.json();_e(t),t.ok&&(Se({companyName:"",sniCode:"",employees:"",contactEmail:"",sendEmail:!1}),Ae())}catch{_e({ok:!1,error:"N\xe4tverksfel"})}finally{ze("idle")}}},style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"},children:[(0,$d.jsx)(lv,{placeholder:"Bolagsnamn *",value:we.companyName,onChange:e=>Se(t=>({...t,companyName:e.target.value})),style:{minWidth:180,borderRadius:8}}),(0,$d.jsx)(lv,{placeholder:"SNI-kod (t.ex. 41)",value:we.sniCode,onChange:e=>Se(t=>({...t,sniCode:e.target.value})),style:{width:130,borderRadius:8}}),(0,$d.jsx)(lv,{placeholder:"Antal anst. *",type:"number",value:we.employees,onChange:e=>Se(t=>({...t,employees:e.target.value})),style:{width:110,borderRadius:8}}),(0,$d.jsx)(lv,{placeholder:"Kontakt-mail",value:we.contactEmail,onChange:e=>Se(t=>({...t,contactEmail:e.target.value})),style:{minWidth:200,borderRadius:8}}),(0,$d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"rgba(255,255,255,.6)",whiteSpace:"nowrap",cursor:"pointer"},children:[(0,$d.jsx)("input",{type:"checkbox",checked:we.sendEmail,onChange:e=>Se(t=>({...t,sendEmail:e.target.checked}))}),"Skicka mail"]}),(0,$d.jsx)(sv,{type:"submit",disabled:"loading"===$e||!we.companyName||!we.employees,children:"loading"===$e?"\u2026":"Skapa \u2192"})]}),Ee&&(0,$d.jsx)("div",{style:{marginTop:10,padding:"10px 14px",borderRadius:8,background:Ee.ok?"rgba(74,222,128,.1)":"rgba(239,68,68,.1)",border:"1px solid "+(Ee.ok?"rgba(74,222,128,.25)":"rgba(239,68,68,.25)")},children:Ee.ok?(0,$d.jsxs)("span",{style:{fontSize:12.5,color:"#4ADE80"},children:["\u2713 Skapad:\xa0",(0,$d.jsx)("a",{href:Ee.url,target:"_blank",rel:"noopener noreferrer",style:{color:"#5DD6CA",wordBreak:"break-all"},children:Ee.url}),Ee.emailSent&&" \xb7 mail skickat"]}):(0,$d.jsxs)("span",{style:{fontSize:12.5,color:"#F87171"},children:["Fel: ",Ee.error]})})]})}),(0,$d.jsxs)("div",{style:{display:"flex",gap:8,marginBottom:12,marginTop:20,alignItems:"center"},children:[(0,$d.jsx)(tv,{style:{margin:0},children:"Prospects"}),(0,$d.jsx)("button",{onClick:Ae,style:{marginLeft:"auto",padding:"5px 12px",borderRadius:100,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)"},children:"\u21bb Ladda"})]}),(0,$d.jsxs)(rv,{children:[(0,$d.jsxs)(nv,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$d.jsx)("span",{children:"Bolag"}),(0,$d.jsx)("span",{children:"Bransch"}),(0,$d.jsx)("span",{children:"Anst."}),(0,$d.jsx)("span",{children:"Mail skickat"}),(0,$d.jsx)("span",{children:"\xd6ppnat"}),(0,$d.jsx)("span",{children:"\xc5tg\xe4rd"}),(0,$d.jsx)("span",{children:"Skapad"})]}),null===be&&(0,$d.jsx)(uv,{children:"Klicka \u21bb Ladda f\xf6r att h\xe4mta prospects."}),0===(null===be||void 0===be?void 0:be.length)&&(0,$d.jsx)(uv,{children:"Inga prospects \xe4n \u2014 skapa ett ovan."}),(null!==be&&void 0!==be?be:[]).map(e=>{var t;return(0,$d.jsxs)(av,{$cols:"2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr",children:[(0,$d.jsx)("span",{style:{fontWeight:600,fontSize:12.5},children:e.company_name}),(0,$d.jsx)("span",{style:{fontSize:11.5,color:"rgba(255,255,255,.50)"},children:e.industry}),(0,$d.jsx)("span",{style:{fontSize:12},children:e.employees}),(0,$d.jsx)("span",{style:{fontSize:11,color:e.email_sent_at?"rgba(255,255,255,.5)":"rgba(255,255,255,.2)"},children:pv(e.email_sent_at)}),(0,$d.jsx)("span",{style:{fontSize:11,color:e.opened_at?"#F59E0B":"rgba(255,255,255,.2)"},children:pv(e.opened_at)}),(0,$d.jsx)(iv,{$c:"upload"===e.action?"rgba(74,222,128,.25)":"activate"===e.action?"rgba(93,214,202,.25)":"rgba(255,255,255,.07)",children:null!==(t=e.action)&&void 0!==t?t:"\u2013"}),(0,$d.jsx)("span",{style:{fontSize:11,color:"rgba(255,255,255,.30)"},children:pv(e.created_at)})]},e.id)})]})]})]})}const mv=vd.div`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`,gv=vd.div`
  background: ${e=>{let{theme:t}=e;return t.color.surface}};
  border: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  border-radius: ${e=>{let{theme:t}=e;return t.size.radius.lg}};
  padding: 48px 44px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 32px rgba(0,0,0,.07);
  @media (max-width: 520px) { padding: 36px 24px; }
`,xv=vd.div`
  margin-bottom: 36px;
`,vv=vd.p`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  margin: 0 0 10px;
`,bv=vd.h1`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin: 0 0 10px;
  line-height: 1.3;
`,yv=vd.p`
  font-size: 14.5px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  line-height: 1.6;
  margin: 0 0 32px;
`,kv=vd.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,jv=vd.input`
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
`,wv=vd.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{theme:t}=e;return t.color.ink}};
  margin-bottom: 8px;
  letter-spacing: 0.01em;
`,Sv=vd.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${e=>{var t;let{theme:r}=e;return null!==(t=r.color.brandSoft)&&void 0!==t?t:"#DCEEEA"}};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 0 24px;
`,$v=vd(vl)`
  font-size: 13px;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  text-decoration: none;
  &:hover { color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
`;function zv(){const e=new URLSearchParams(window.location.search),t=e.get("id"),r=e.get("svar"),[a,i]=(0,n.useState)("ja"===r?"cost":"nej"===r?"submitting-no":"question"),[o,l]=(0,n.useState)(""),[s,c]=(0,n.useState)("idle"),[d,u]=(0,n.useState)("");async function p(e,r){if(t){c("submitting");try{const n=await fetch("/api/outcome-survey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysisId:t,switched:e,actualAnnualCost:r?Number(String(r).replace(/\s/g,"")):null})}),a=await n.json();a.supplier&&u(a.supplier),c("done")}catch{c("error")}}else c("done")}return(0,n.useEffect)(()=>{"nej"===r&&t&&p(!1,null)},[]),"done"===s?(0,$d.jsx)(mv,{children:(0,$d.jsxs)(gv,{children:[(0,$d.jsx)(xv,{children:(0,$d.jsx)(vl,{to:"/",children:(0,$d.jsx)(Dd,{})})}),(0,$d.jsx)(Sv,{children:"\u2713"}),(0,$d.jsx)(bv,{children:"Tack \u2014 det hj\xe4lper oss mycket."}),(0,$d.jsxs)(yv,{children:["Varje svar g\xf6r Arvo lite mer precis. N\xe4sta kund som analyserar en",d?` ${d}`:"","-faktura drar nytta av det ni just ber\xe4ttade."]}),(0,$d.jsx)(Id,{as:vl,to:"/testa-faktura",$variant:"gradient",$size:"md",children:"Analysera en ny faktura \u2192"})]})}):"submitting-no"===a||"nej"===r&&"done"!==s?(0,$d.jsx)(mv,{children:(0,$d.jsxs)(gv,{style:{textAlign:"center"},children:[(0,$d.jsx)(xv,{style:{textAlign:"left"},children:(0,$d.jsx)(vl,{to:"/",children:(0,$d.jsx)(Dd,{})})}),(0,$d.jsx)(yv,{style:{margin:"32px 0 0"},children:"Registrerar ert svar\u2026"})]})}):(0,$d.jsx)(mv,{children:(0,$d.jsxs)(gv,{children:[(0,$d.jsx)(xv,{children:(0,$d.jsx)(vl,{to:"/",children:(0,$d.jsx)(Dd,{})})}),(0,$d.jsx)(vv,{children:"60-dagars uppf\xf6ljning"}),"question"===a&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(bv,{children:"Bytte ni leverant\xf6r efter analysen?"}),(0,$d.jsx)(yv,{children:"Det tar 30 sekunder och hj\xe4lper oss att bli mer precisa f\xf6r er och alla kommande kunder."}),(0,$d.jsxs)(kv,{children:[(0,$d.jsx)(Id,{$variant:"gradient",$size:"md",onClick:()=>i("cost"),children:"Ja, vi bytte \u2192"}),(0,$d.jsx)(Id,{$variant:"ghost",$size:"md",onClick:()=>p(!1,null),children:"Inte \xe4n"})]})]}),"cost"===a&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(bv,{children:"Vad betalar ni nu per \xe5r?"}),(0,$d.jsx)(yv,{children:"Ange er nya \xe5rskostnad (kr/\xe5r) \u2014 vi j\xe4mf\xf6r med vad vi f\xf6rutsp\xe5dde."}),(0,$d.jsx)(wv,{htmlFor:"actual-cost",children:"Ny \xe5rskostnad (kr)"}),(0,$d.jsx)(jv,{id:"actual-cost",type:"text",inputMode:"numeric",placeholder:"t.ex. 48 000",value:o,onChange:e=>l(e.target.value),autoFocus:!0}),(0,$d.jsxs)(kv,{children:[(0,$d.jsx)(Id,{$variant:"gradient",$size:"md",disabled:"submitting"===s,onClick:()=>p(!0,o),children:"submitting"===s?"Sparar\u2026":"Skicka \u2192"}),(0,$d.jsx)(Id,{$variant:"ghost",$size:"sm",onClick:()=>p(!0,null),children:"Hoppa \xf6ver kostnaden"})]}),"error"===s&&(0,$d.jsx)("p",{style:{color:"#D94F3C",fontSize:13,margin:"8px 0 0"},children:"N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."})]}),(0,$d.jsx)($v,{to:"/",children:"\u2190 Tillbaka till startsidan"})]})})}const Ev=jd`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`,_v=vd.div`
  min-height: 100vh;
  background: ${e=>{let{theme:t}=e;return t.color.bg}};
`,Nv=vd.div`
  max-width: 540px;
  margin: 0 auto;
  padding: 0 16px 64px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Av=vd.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(14,26,23,.10);
  padding: 12px 16px 12px 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  .chip-icon {
    width: 38px; height: 38px;
    border-radius: 11px;
    background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .chip-title { font-size: 14px; font-weight: 700; color: ${e=>{let{theme:t}=e;return t.color.ink}}; line-height: 1.2; }
  .chip-sub   { font-size: 12px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; margin-top: 2px; }
`,Cv=vd.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 28px rgba(14,26,23,.08);
  overflow: hidden;
`,Fv=vd.div`
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};

  .company { font-size: 12px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
  .sep     { margin: 0 6px; color: ${e=>{let{theme:t}=e;return t.color.borderStrong}}; }
  .live    { font-size: 12px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.muted}}; }
`,Tv=vd.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px; font-weight: 700;
  color: ${e=>{let{theme:t}=e;return t.color.brand}};
  background: ${e=>{let{theme:t}=e;return t.color.brandSoft}};
  padding: 4px 10px;
  border-radius: 999px;

  &::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${e=>{let{theme:t}=e;return t.color.brand}};
    flex-shrink: 0;
    animation: ${Ev} 2.4s ease infinite;
  }
`,Pv=vd.div`
  padding: 26px 22px 24px;

  .savings-label { font-size: 13px; font-weight: 500; color: ${e=>{let{theme:t}=e;return t.color.muted}}; margin: 0 0 10px; }
  .savings-row   { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; }
  .savings-num   {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(52px, 13vw, 80px);
    font-weight: 400; color: ${e=>{let{theme:t}=e;return t.color.brand}};
    line-height: 0.95; letter-spacing: -0.02em; font-feature-settings: "tnum";
  }
  .savings-unit  {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(24px, 5vw, 34px);
    font-weight: 400; color: ${e=>{let{theme:t}=e;return t.color.brand}}; opacity: 0.6;
  }
  .savings-sub   { font-size: 12px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; line-height: 1.5; margin: 0; }
`,Dv=vd.p`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: ${e=>{let{theme:t}=e;return t.color.muted}};
  margin: 8px 4px 0;
`,Lv=vd.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(14,26,23,.07);
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: ${e=>{let{$locked:t}=e;return t?.6:1}};
`,Rv=vd.div`
  width: 44px; height: 44px;
  border-radius: 50%;
  background: ${e=>{let{$locked:t,theme:r}=e;return t?r.color.surfaceAlt:r.color.brandSoft}};
  color: ${e=>{let{$locked:t,theme:r}=e;return t?r.color.borderStrong:r.color.brand}};
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
`,Ov=vd.div`
  flex: 1; min-width: 0;

  .meta-title {
    font-size: 14.5px; font-weight: 700;
    color: ${e=>{let{theme:t}=e;return t.color.ink}};
    line-height: 1.3;
  }
  .meta-sub {
    font-size: 12px;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
    margin-top: 2px; line-height: 1.3;
  }
`,Iv=vd.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
  flex-shrink: 0;

  .right-amount {
    font-size: 15px; font-weight: 800;
    color: ${e=>{let{theme:t}=e;return t.color.brand}};
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    white-space: nowrap;
  }
  .right-status {
    font-size: 13px; font-weight: 600;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
`,Mv=vd.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(14,26,23,.07);
  overflow: hidden;
`,Bv=vd.div`
  display: flex;
  overflow-x: auto;
  padding: 16px;
  position: relative;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  &::before {
    content: '';
    position: absolute;
    top: 55px;
    left: 56px; right: 56px;
    height: 1.5px;
    background: ${e=>{let{theme:t}=e;return t.color.border}};
    z-index: 0;
  }
`,Vv=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 80px;
  flex: 1;
  position: relative;
  z-index: 1;

  .cal-tag {
    font-size: 10.5px; font-weight: 700;
    padding: 2px 7px; border-radius: 999px;
    background: ${e=>{let{$tagBg:t}=e;return null!==t&&void 0!==t?t:"#E8EDEC"}};
    color: ${e=>{let{$tagColor:t}=e;return null!==t&&void 0!==t?t:"#3F4B47"}};
    white-space: nowrap;
  }
  .cal-circle {
    width: 18px; height: 18px;
    border-radius: 50%;
    border: 2.5px solid ${e=>{let{$color:t}=e;return null!==t&&void 0!==t?t:"#BACBC2"}};
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 1;

    &::before {
      content: '';
      width: 7px; height: 7px;
      border-radius: 50%;
      background: ${e=>{let{$color:t}=e;return null!==t&&void 0!==t?t:"#BACBC2"}};
      opacity: 0.55;
    }
  }
  .cal-name  { font-size: 11px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.ink}}; text-align: center; line-height: 1.3; }
  .cal-date  { font-size: 10px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; text-align: center; margin-top: -4px; }
`,Uv=vd.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 20px rgba(14,26,23,.07);
  border-left: 4px solid ${e=>{let{$borderColor:t}=e;return t}};
  padding: 16px 18px 16px 14px;
  display: flex;
  align-items: center;
  gap: 16px;

  .seg-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px; }
  .seg-score-label {
    font-size: 10px; font-weight: 800;
    letter-spacing: .08em; text-transform: uppercase;
    color: ${e=>{let{theme:t}=e;return t.color.muted}};
  }
  .seg-name  { font-size: 12px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.muted}}; }
  .seg-desc  { font-size: 12px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; line-height: 1.5; margin-top: 1px; }
`,Kv=vd.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px; font-weight: 700;
  color: ${e=>{let{$color:t}=e;return t}};
  background: ${e=>{let{$bg:t}=e;return t}};
  padding: 3px 10px;
  border-radius: 999px;
  align-self: flex-start;

  &::before {
    content: '';
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${e=>{let{$color:t}=e;return t}};
    flex-shrink: 0;
  }
`,Hv=vd.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 20px rgba(14,26,23,.07);
  overflow: hidden;
`,Wv=vd.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid ${e=>{let{theme:t}=e;return t.color.border}};
  opacity: 0.42;
  &:last-child { border-bottom: none; }

  .und-icon {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: ${e=>{let{theme:t}=e;return t.color.surfaceAlt}};
    color: ${e=>{let{theme:t}=e;return t.color.borderStrong}};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .und-name   { flex: 1; font-size: 13.5px; font-weight: 600; color: ${e=>{let{theme:t}=e;return t.color.ink}}; }
  .und-status { font-size: 12px; color: ${e=>{let{theme:t}=e;return t.color.muted}}; flex-shrink: 0; }
`,qv=vd.div`
  background: linear-gradient(160deg, #0E3D38 0%, #1B7A6E 100%);
  border-radius: 20px;
  padding: 24px 22px;
  text-align: center;

  h2 {
    font-family: ${e=>{let{theme:t}=e;return t.font.display}};
    font-size: clamp(19px, 4vw, 24px);
    color: #fff; margin: 0 0 7px;
    letter-spacing: -0.02em; font-weight: 700;
  }
  p { font-size: 13px; color: rgba(255,255,255,.65); margin: 0 0 20px; line-height: 1.6; }
`,Yv=vd.div`
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .bar-row   { display: flex; align-items: center; justify-content: space-between; }
  .bar-label { font-size: 12px; color: rgba(255,255,255,.6); }
  .bar-value { font-size: 16px; font-weight: 800; color: #5DD6CA; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
`,Gv=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function Qv(e){let{score:t,color:r,size:n=68}=e;const a=n/2-8,i=2*Math.PI*a,o=i*(1-t/100),l=n/2,s=n/2;return(0,$d.jsxs)("div",{style:{position:"relative",width:n,height:n,flexShrink:0},children:[(0,$d.jsxs)("svg",{width:n,height:n,style:{position:"absolute",inset:0},children:[(0,$d.jsx)("circle",{cx:l,cy:s,r:a,fill:"none",stroke:"#E8EDEC",strokeWidth:6}),(0,$d.jsx)("circle",{cx:l,cy:s,r:a,fill:"none",stroke:r,strokeWidth:6,strokeDasharray:i,strokeDashoffset:o,strokeLinecap:"round",transform:`rotate(-90 ${l} ${s})`})]}),(0,$d.jsxs)("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",lineHeight:1},children:[(0,$d.jsx)("span",{style:{fontSize:18,fontWeight:800,color:r,letterSpacing:"-0.02em"},children:t}),(0,$d.jsx)("span",{style:{fontSize:10,color:"#8A988F",marginTop:2},children:"/100"})]})]})}const Jv=[{id:1,category:"Mobil",icon:"phone",title:"Tele2 F\xf6retag",sub:"Byter fr\xe5n Telia \xb7 avtal l\xf6per ut om 47 dagar",btnLabel:"Aktivera bytet",gross:156e3,locked:!1},{id:2,category:"SaaS",icon:"spark",title:"Tier-optimering",sub:"12 oanv\xe4nda Microsoft 365-licenser",btnLabel:"Aktivera optimeringen",gross:89e3,locked:!1},{id:3,category:"Skrivarleasing",icon:"file",title:"Ricoh",sub:"Bundet t.o.m. dec 2026 \u2014 Arvo agerar vid f\xf6rfall",btnLabel:"Bevakas",gross:39e3,locked:!0}],Xv=[{name:"Telia Mobil",date:"Jul 2026",color:"#1B7A6E",tag:"47 dagar",tagBg:"#DCEEEA",tagColor:"#0E4F47"},{name:"Bredband Com Hem",date:"Sep 2026",color:"#1B7A6E",tag:"3 m\xe5n",tagBg:"#DCEEEA",tagColor:"#0E4F47"},{name:"El \u2014 Vattenfall",date:"Jan 2027",color:"#A8761A",tag:"7 m\xe5n",tagBg:"#F3E5C7",tagColor:"#6B4A0E"},{name:"Ricoh Leasing",date:"Dec 2026",color:"#A8761A",tag:"6 m\xe5n",tagBg:"#F3E5C7",tagColor:"#6B4A0E"},{name:"Fortnox ERP",date:"L\xf6pande",color:"#BACBC2",tag:"M\xe5nadsvis",tagBg:"#E8EDEC",tagColor:"#3F4B47"}],Zv=[{label:"Telefoni och bredband",icon:"phone",score:58,analyzed:!0},{label:"Programvara",icon:"spark",score:52,analyzed:!0},{label:"Skrivare",icon:"file",score:47,analyzed:!0},{label:"El",icon:"bolt",score:65,analyzed:!0},{label:"IT",icon:"wifi",score:null,analyzed:!1},{label:"Fordon och frakt",icon:"truck",score:null,analyzed:!1},{label:"Kontor och st\xe4d",icon:"briefcase",score:null,analyzed:!1},{label:"Personal och h\xe4lsa",icon:"shield",score:null,analyzed:!1}],eb=()=>{const e=Jv.reduce((e,t)=>e+t.gross,0),t=Math.round(.2*e),r=e-t,n=Zv.filter(e=>e.analyzed),a=Zv.filter(e=>!e.analyzed);return(0,$d.jsxs)(_v,{children:[(0,$d.jsx)(du,{}),(0,$d.jsxs)(Nv,{children:[(0,$d.jsxs)(Av,{children:[(0,$d.jsx)("div",{className:"chip-icon",children:(0,$d.jsx)(bu,{name:"spark",size:18,stroke:1.5})}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)("div",{className:"chip-title",children:"847 fakturor analyserade"}),(0,$d.jsx)("div",{className:"chip-sub",children:"scanning klar idag"})]})]}),(0,$d.jsxs)(Cv,{children:[(0,$d.jsxs)(Fv,{children:[(0,$d.jsxs)("span",{children:[(0,$d.jsx)("span",{className:"company",children:"Andersson & Partners AB"}),(0,$d.jsx)("span",{className:"sep",children:"\xb7"}),(0,$d.jsx)("span",{className:"live",children:"Live"})]}),(0,$d.jsx)(Tv,{children:"Aktiv"})]}),(0,$d.jsxs)(Pv,{children:[(0,$d.jsx)("p",{className:"savings-label",children:"Er nettobesparing / \xe5r"}),(0,$d.jsxs)("div",{className:"savings-row",children:[(0,$d.jsx)("span",{className:"savings-num",children:Gv(r)}),(0,$d.jsx)("span",{className:"savings-unit",children:"kr"})]}),(0,$d.jsxs)("p",{className:"savings-sub",children:["Bruttobesparing ",Gv(e),"\xa0kr \xb7 Arvos arvode ",Gv(t),"\xa0kr (20\xa0%)"]})]})]}),(0,$d.jsx)(Dv,{children:"ER AKTIONSPLAN \u2014 PRIORITERAD AV ARVO"}),Jv.map(e=>(0,$d.jsxs)(Lv,{$locked:e.locked,children:[(0,$d.jsx)(Rv,{$locked:e.locked,children:(0,$d.jsx)(bu,{name:e.locked?"lock":e.icon,size:18,stroke:2})}),(0,$d.jsxs)(Ov,{children:[(0,$d.jsxs)("div",{className:"meta-title",children:[e.category," \xb7 ",e.title]}),(0,$d.jsx)("div",{className:"meta-sub",children:e.sub})]}),(0,$d.jsx)(Iv,{children:e.locked?(0,$d.jsx)("span",{className:"right-status",children:"Bevakas"}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)("span",{className:"right-amount",children:["+",Gv(Math.round(.8*e.gross))," kr"]}),(0,$d.jsx)(Id,{$variant:"brand",$size:"sm",children:e.btnLabel})]})})]},e.id)),(0,$d.jsx)(Dv,{children:"KONTRAKTSKALENDER"}),(0,$d.jsx)(Mv,{children:(0,$d.jsx)(Bv,{children:Xv.map(e=>(0,$d.jsxs)(Vv,{$color:e.color,$tagBg:e.tagBg,$tagColor:e.tagColor,children:[(0,$d.jsx)("span",{className:"cal-tag",children:e.tag}),(0,$d.jsx)("span",{className:"cal-circle"}),(0,$d.jsx)("span",{className:"cal-name",children:e.name}),(0,$d.jsx)("span",{className:"cal-date",children:e.date})]},e.name))})}),(0,$d.jsxs)(Dv,{children:["ARVO SCORE\u2122 PER SEGMENT \u2014 ",n.length," AV ",Zv.length]}),n.map(e=>{const t=(r=e.score)>=80?{label:"Optimalt",desc:"Ni har ett kostnadsoptimerat leverant\xf6rsn\xe4tverk. Ni betalar under eller i niv\xe5 med branschsnittet.",color:"#1B7A6E",bg:"rgba(27,122,110,.1)"}:r>=65?{label:"F\xf6rb\xe4ttringsl\xe4ge",desc:"Ni betalar mer \xe4n marknadspriset \u2014 en meningsfull besparing som Arvo kan realisera \xe5t er utan byr\xe5krati.",color:"#65A30D",bg:"rgba(101,163,13,.1)"}:r>=45?{label:"Suboptimerat",desc:"Ni betalar klart mer \xe4n branschsnittet. Arvo kan g\xf6ra ett byte som betalar sig fr\xe5n dag ett.",color:"#D97706",bg:"rgba(217,119,6,.1)"}:{label:"Kritisk",desc:"Ni betalar kraftigt mer och f\xf6rlorar pengar varje faktura. Arvo identifierar, f\xf6rhandlar och genomf\xf6r bytet \xe5t er.",color:"#DC2626",bg:"rgba(220,38,38,.1)"};var r;return(0,$d.jsxs)(Uv,{$borderColor:t.color,children:[(0,$d.jsx)(Qv,{score:e.score,color:t.color,size:68}),(0,$d.jsxs)("div",{className:"seg-body",children:[(0,$d.jsx)("span",{className:"seg-score-label",children:"Arvo Score\u2122"}),(0,$d.jsx)(Kv,{$color:t.color,$bg:t.bg,children:t.label}),(0,$d.jsx)("div",{className:"seg-name",children:e.label}),(0,$d.jsx)("div",{className:"seg-desc",children:t.desc})]})]},e.label)}),(0,$d.jsx)(Hv,{children:a.map(e=>(0,$d.jsxs)(Wv,{children:[(0,$d.jsx)("div",{className:"und-icon",children:(0,$d.jsx)(bu,{name:e.icon,size:14,stroke:1.5})}),(0,$d.jsx)("span",{className:"und-name",children:e.label}),(0,$d.jsx)("span",{className:"und-status",children:"Ej analyserat"})]},e.label))}),(0,$d.jsxs)(qv,{children:[(0,$d.jsxs)(Yv,{children:[(0,$d.jsxs)("div",{className:"bar-row",children:[(0,$d.jsx)("span",{className:"bar-label",children:"Nettobesparing (\xe5r 1)"}),(0,$d.jsxs)("span",{className:"bar-value",children:["+",Gv(r),"\xa0kr"]})]}),(0,$d.jsxs)("div",{className:"bar-row",children:[(0,$d.jsx)("span",{className:"bar-label",children:"Arvos arvode"}),(0,$d.jsxs)("span",{className:"bar-value",style:{color:"rgba(255,255,255,.45)",fontSize:14},children:["\u2212",Gv(t),"\xa0kr"]})]})]}),(0,$d.jsx)("h2",{children:"Aktivera aktionsplanen"}),(0,$d.jsx)("p",{children:"Arvo f\xf6rhandlar och sk\xf6ter varje leverant\xf6rsbyte \xe5t er \u2014 fr\xe5n upps\xe4gning till nytt avtal. Ni betalar 20\xa0% av realiserad besparing. Inget annars."}),(0,$d.jsxs)(Id,{$variant:"gradient",$size:"lg",$full:!0,style:{background:"#fff",color:"#0E3D38",border:"none",boxShadow:"0 8px 28px rgba(0,0,0,.25)"},children:["Aktivera alla byten",(0,$d.jsxs)("span",{style:{fontSize:11,fontWeight:500,color:"#5C6E68",opacity:.8},children:["\xa0\xb7 20\xa0% av ",Gv(e),"\xa0kr"]})]})]})]}),(0,$d.jsx)(xu,{})]})},tb=jd`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`,rb=jd`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
`,nb=jd`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
`,ab=jd`
  from { stroke-dashoffset: 24; }
  to   { stroke-dashoffset: 0; }
`,ib=jd`
  to { transform: rotate(360deg); }
`,ob=vd.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: #0A1512;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`,lb=vd.section`
  height: 100vh;
  min-height: 600px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`,sb=vd(lb)`
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
`,cb=vd.p`
  margin: 16px 0 4px;
  font-size: 11px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .18em;
  animation: ${tb} 0.7s ease both;
`,db=vd.p`
  margin: 0 0 48px;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  animation: ${tb} 0.7s 0.1s ease both;
`,ub=vd.p`
  margin: 0 0 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .12em;
  animation: ${tb} 0.7s 0.2s ease both;
`,pb=vd.p`
  margin: 0 0 6px;
  font-size: clamp(52px, 9vw, 80px);
  font-weight: 800;
  color: #fff;
  line-height: 1;
  letter-spacing: -.03em;
  animation: ${tb} 0.7s 0.25s ease both;
`,hb=vd.span`
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 400;
  color: rgba(255,255,255,0.40);
  margin-left: 8px;
`,fb=vd.p`
  margin: 0 0 56px;
  font-size: 17px;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  animation: ${tb} 0.7s 0.35s ease both;

  strong { color: #fff; }
`,mb=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: ${tb} 0.7s 0.5s ease both;
`,gb=vd.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .06em;
`,xb=vd.div`
  width: 20px;
  height: 20px;
  color: rgba(29,176,154,0.5);
  animation: ${rb} 1.6s ease-in-out infinite;
`,vb=vd.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;

  @media (max-width: 480px) { display: none; }
`,bb=vd.button`
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
`,yb=vd(lb)`
  padding: 0;
  background: radial-gradient(ellipse at 80% 20%, rgba(29,176,154,0.07) 0%, transparent 60%),
              #0A1512;
`,kb=vd.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 56px 36px 36px;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) { padding: 48px 24px 28px; }
`,jb=vd.p`
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
`,wb=vd.span`
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
`,Sb=vd.span`
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
`,$b=vd.h1`
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
`,zb=vd.p`
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
`,Eb=vd.div`
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
`,_b=vd.div`
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 18px 20px;
`,Nb=vd.p`
  margin: 0 0 4px;
  font-size: ${e=>{let{$primary:t}=e;return t?"clamp(28px, 5vw, 40px)":"clamp(20px, 3.5vw, 28px)"}};
  font-weight: 800;
  color: ${e=>{let{$primary:t}=e;return t?"#fff":"rgba(255,255,255,0.75)"}};
  line-height: 1;
  letter-spacing: -.02em;
`,Ab=vd.span`
  font-size: 0.55em;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  margin-left: 4px;
`,Cb=vd.p`
  margin: 0;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .08em;
`,Fb=vd.p`
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
`,Tb=vd.div`
  padding-top: 24px;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.38s ease, transform 0.5s 0.38s ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Pb=vd.button`
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
`,Db=vd.span`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${ib} 0.7s linear infinite;
`,Lb=(vd.button`
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
`,vd(lb)`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 32px;
  background: radial-gradient(ellipse at 50% 40%, rgba(29,176,154,0.09) 0%, transparent 65%),
              #0A1512;
`),Rb=vd.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(29,176,154,0.15);
  border: 1.5px solid rgba(29,176,154,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: ${tb} 0.6s ease both;

  svg { overflow: visible; }

  svg path {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: ${ab} 0.5s 0.3s ease forwards;
  }
`,Ob=vd.h2`
  margin: 0 0 12px;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  animation: ${tb} 0.6s 0.1s ease both;
`,Ib=vd.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  max-width: 440px;
  animation: ${tb} 0.6s 0.2s ease both;
`,Mb=vd.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${tb} 0.6s 0.3s ease both;
`,Bb=vd.div`
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.20);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
`,Vb=vd.span`
  font-size: 16px;
  flex-shrink: 0;
`,Ub=vd.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.80);
  line-height: 1.4;

  strong { color: #fff; }
`,Kb=vd.p`
  margin: 0 0 36px;
  font-size: 14px;
  color: #1DB09A;
  animation: ${tb} 0.6s 0.4s ease both;
`,Hb=vd.a`
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
  animation: ${tb} 0.6s 0.45s ease both;

  &:hover {
    background: rgba(255,255,255,0.11);
    color: #fff;
  }
`,Wb=vd.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  gap: 20px;
`,qb=vd.div`
  display: flex;
  gap: 8px;
`,Yb=vd.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1DB09A;
  animation: ${nb} 1.2s ${e=>{let{$i:t}=e;return.2*t}}s ease-in-out infinite;
`,Gb=vd.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  letter-spacing: .04em;
`,Qb=vd.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  padding: 32px;
  text-align: center;
`,Jb=vd.div`
  font-size: 40px;
  margin-bottom: 20px;
`,Xb=vd.h1`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`,Zb=vd.p`
  margin: 0 0 32px;
  font-size: 15px;
  color: rgba(255,255,255,0.45);
  max-width: 360px;
  line-height: 1.6;
`,ey=vd.a`
  background: linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%);
  color: #fff;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  transition: opacity 0.2s;

  &:hover { opacity: 0.88; }
`,ty=e=>Math.round(null!==e&&void 0!==e?e:0).toLocaleString("sv-SE");const ry={recommendation:"Bytesrekommendation",cost_trend:"Prish\xf6jning",overpaying:"\xd6verpris",price_alert:"Prish\xf6jningsvarning"};function ny(e){if(!e)return"";const[t,r]=e.split("-").map(Number),n=new Date(t,r-1,1).toLocaleString("sv-SE",{month:"long",year:"numeric"});return n.charAt(0).toUpperCase()+n.slice(1)}const ay=e=>{let{size:t=36}=e;return(0,$d.jsxs)("svg",{width:t,height:t,viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"briefingGrad",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$d.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#briefingGrad)"})]})},iy=()=>(0,$d.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",children:(0,$d.jsx)("path",{d:"M10 4v12M4 10l6 6 6-6",stroke:"#1DB09A",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})}),oy=()=>(0,$d.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",fill:"none",children:(0,$d.jsx)("path",{d:"M6 14l6 6 10-12",stroke:"#1DB09A",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})});function ly(){var e;const{token:t}=ho(),[r,a]=(0,n.useState)("loading"),[i,o]=(0,n.useState)(null),[l,s]=(0,n.useState)(""),[c,d]=(0,n.useState)(0),[u,p]=(0,n.useState)({}),[h,f]=(0,n.useState)({}),[m,g]=(0,n.useState)({}),x=(0,n.useRef)(null),v=(0,n.useRef)([]),b=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1300;const[r,a]=(0,n.useState)(0);return(0,n.useEffect)(()=>{if(!e)return;const r=performance.now();let n;const i=o=>{const l=Math.min(1,(o-r)/t),s=1-Math.pow(1-l,3);a(Math.round(s*e)),l<1&&(n=requestAnimationFrame(i))};return n=requestAnimationFrame(i),()=>cancelAnimationFrame(n)},[e,t]),r}("ready"===r?null===i||void 0===i?void 0:i.totalSavingPotential:0);(0,n.useEffect)(()=>{if(!t)return a("error"),void s("Ogiltig l\xe4nk");fetch(`/api/briefing?token=${encodeURIComponent(t)}`).then(e=>e.json()).then(e=>{var t,r;if(!e.ok)return a("error"),void s(null!==(r=e.error)&&void 0!==r?r:"Ok\xe4nt fel");o(e.briefing),g(null!==(t=e.briefing.actionsTaken)&&void 0!==t?t:{}),a("ready")}).catch(()=>{a("error"),s("Kunde inte h\xe4mta briefingen")})},[t]),(0,n.useEffect)(()=>{if("ready"!==r)return;const e=new IntersectionObserver(e=>{e.forEach(e=>{const t=Number(e.target.dataset.cardIndex);e.isIntersecting&&(p(e=>({...e,[t]:!0})),d(t))})},{threshold:.4,root:x.current});return v.current.forEach(t=>{t&&e.observe(t)}),()=>e.disconnect()},[r,i]);const y=(0,n.useCallback)(async(e,r)=>{if("loading"!==h[e]&&"done"!==h[e]){f(t=>({...t,[e]:"loading"}));try{const a=await fetch(`/api/briefing?token=${encodeURIComponent(t)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({insightId:e,action:r})}),i=await a.json();var n;if(a.ok&&i.ok)f(t=>({...t,[e]:"done"})),g(null!==(n=i.actionsTaken)&&void 0!==n?n:{});else f(t=>({...t,[e]:"idle"}))}catch{f(t=>({...t,[e]:"idle"}))}}},[t,h]),k=(0,n.useCallback)(e=>{const t=v.current[e];t&&t.scrollIntoView({behavior:"smooth",block:"start"})},[]);if("loading"===r)return(0,$d.jsxs)(Wb,{children:[(0,$d.jsx)(qb,{children:[0,1,2].map(e=>(0,$d.jsx)(Yb,{$i:e},e))}),(0,$d.jsx)(Gb,{children:"H\xe4mtar din Arvo-briefing\u2026"})]});if("error"===r)return(0,$d.jsxs)(Qb,{children:[(0,$d.jsx)(Jb,{children:"\ud83d\udd12"}),(0,$d.jsx)(Xb,{children:"Briefingen hittades inte"}),(0,$d.jsxs)(Zb,{children:[l||"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig."," ","Ladda upp en ny faktura s\xe5 genererar Arvo en uppdaterad briefing \xe5t er."]}),(0,$d.jsx)(ey,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const j=null!==(e=null===i||void 0===i?void 0:i.insights)&&void 0!==e?e:[],w=1+j.length+1,S=Object.keys(m).length>0;return(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(vb,{children:Array.from({length:w},(e,t)=>(0,$d.jsx)(bb,{$active:c===t,onClick:()=>k(t),"aria-label":`G\xe5 till kort ${t+1}`},t))}),(0,$d.jsxs)(ob,{ref:x,children:[(0,$d.jsxs)(sb,{"data-card-index":"0",ref:e=>{v.current[0]=e},children:[(0,$d.jsx)(ay,{size:44}),(0,$d.jsx)(cb,{children:"Arvo Intelligence"}),(0,$d.jsx)(db,{children:ny(null===i||void 0===i?void 0:i.period)}),(0,$d.jsx)(ub,{children:"Potentiell besparing"}),(0,$d.jsxs)(pb,{children:[ty(b),(0,$d.jsx)(hb,{children:"kr/\xe5r"})]}),(0,$d.jsxs)(fb,{children:["Arvo har identifierat"," ",(0,$d.jsxs)("strong",{children:[j.length," ",1===j.length?"besparingsinsikt":"besparingsinsikter"]})," ","f\xf6r ert bolag"]}),(0,$d.jsxs)(mb,{children:[(0,$d.jsx)(gb,{children:"Scrolla f\xf6r att se insikterna"}),(0,$d.jsx)(xb,{children:(0,$d.jsx)(iy,{})})]})]}),j.map((e,t)=>{var r,n,a,i,o,l,s,c,d,p,f,g;const x=t+1,b=!!u[x],k=null!==(r=h[e.id])&&void 0!==r?r:"idle",w="done"===k||!!m[e.id],S="loading"===k;return(0,$d.jsx)(yb,{"data-card-index":String(x),ref:e=>{v.current[x]=e},children:(0,$d.jsxs)(kb,{children:[(0,$d.jsxs)(jb,{$visible:b,children:["INSIKT ",t+1," AV ",j.length]}),(0,$d.jsxs)("div",{children:[(0,$d.jsx)(Sb,{$type:e.type,children:null!==(n=ry[e.type])&&void 0!==n?n:e.type}),(0,$d.jsx)(wb,{$visible:b,children:e.supplier})]}),(0,$d.jsx)($b,{$visible:b,children:e.headline}),(0,$d.jsx)(zb,{$visible:b,children:e.subheadline}),(0,$d.jsxs)(Eb,{$visible:b,children:[(0,$d.jsxs)(_b,{children:[(0,$d.jsxs)(Nb,{$primary:!0,children:[ty(null===(a=e.metric)||void 0===a||null===(i=a.primary)||void 0===i?void 0:i.value),(0,$d.jsx)(Ab,{children:"kr"})]}),(0,$d.jsx)(Cb,{children:null===(o=e.metric)||void 0===o||null===(l=o.primary)||void 0===l?void 0:l.label})]}),null!=(null===(s=e.metric)||void 0===s||null===(c=s.secondary)||void 0===c?void 0:c.value)&&(0,$d.jsxs)(_b,{children:[(0,$d.jsxs)(Nb,{children:["number"===typeof e.metric.secondary.value&&null!==(d=e.metric.secondary.label)&&void 0!==d&&d.includes("%")?`${e.metric.secondary.value}%`:ty(e.metric.secondary.value),!(null!==(p=e.metric.secondary.label)&&void 0!==p&&p.includes("%"))&&(0,$d.jsx)(Ab,{children:"kr"})]}),(0,$d.jsx)(Cb,{children:null===(f=e.metric)||void 0===f||null===(g=f.secondary)||void 0===g?void 0:g.label})]})]}),(0,$d.jsx)(Fb,{$visible:b,children:e.context}),e.action&&(0,$d.jsx)(Tb,{$visible:b,children:(0,$d.jsxs)(Pb,{$done:w,$loading:S,disabled:w||S,onClick:()=>y(e.id,e.action.label),children:[S&&(0,$d.jsx)(Db,{}),w?"\u2713 Arvo \xe4r p\xe5 det \u2014 vi \xe5terkommer inom 24 timmar":e.action.label]})})]})},e.id)}),(0,$d.jsxs)(Lb,{"data-card-index":String(w-1),ref:e=>{v.current[w-1]=e},children:[(0,$d.jsx)(Rb,{children:(0,$d.jsx)(oy,{})}),(0,$d.jsx)(Ob,{children:"Er Arvo-briefing \xe4r klar"}),(0,$d.jsx)(Ib,{children:S?"Bra jobbat \u2014 ni har aktiverat Arvo. Vi granskar era avtal och \xe5terkommer med en konkret handlingsplan.":"Era insikter v\xe4ntar p\xe5 er. Ni kan alltid komma tillbaka till denna sida via l\xe4nken i mailet."}),S&&(0,$d.jsx)(Mb,{children:Object.entries(m).map(e=>{let[t,r]=e;return(0,$d.jsxs)(Bb,{children:[(0,$d.jsx)(Vb,{children:"\u2713"}),(0,$d.jsxs)(Ub,{children:[(0,$d.jsx)("strong",{children:"approve_switch"===r.type?"Bytesuppdrag":"F\xf6rhandlingsuppdrag"})," ","aktiverat f\xf6r ",(0,$d.jsx)("strong",{children:r.supplier}),r.estimatedNetSaving>0&&` \xb7 Potentiell besparing: ${ty(r.estimatedNetSaving)} kr/\xe5r`]})]},t)})}),S&&(0,$d.jsx)(Kb,{children:"Arvo \xe5terkommer inom 24 timmar med n\xe4sta steg."}),(0,$d.jsx)(Hb,{href:"/testa-faktura",children:"Analysera fler fakturor \u2192"})]})]})]})}const sy=jd`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`,cy=jd`
  from { opacity: 0; transform: translateY(-24px) scale(0.95); }
  65%  { transform: translateY(4px) scale(1.005); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`,dy=jd`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(29,176,154,0); }
`,uy=jd`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,py=vd.div`
  background: #ffffff;
  color: #0E1A17;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
`,hy=vd.section`
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
`,fy=vd.div`
  position: relative;
  z-index: 1;
  max-width: 680px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`,my=vd.div`
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
  animation: ${cy} 0.75s cubic-bezier(0.34, 1.46, 0.64, 1) both;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.55) inset,
    0 -1px 0 rgba(255,255,255,0.06) inset,
    0 0 40px rgba(255,255,255,0.04),
    0 48px 120px rgba(0,0,0,0.70),
    0 8px 32px rgba(0,0,0,0.40);
`,gy=vd.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
`,xy=vd.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${dy} 2.2s ease-in-out infinite;
`,vy=vd.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: .02em;
  flex: 1;
`,by=vd.span`
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .01em;
`,yy=vd.p`
  margin: 0 0 7px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -.015em;
`,ky=vd.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;

  strong {
    color: rgba(255,255,255,0.88);
    font-weight: 600;
  }
`,jy=vd.button`
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
`,wy=vd.h1`
  margin: 0 0 20px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(38px, 6.5vw, 76px);
  font-weight: 700;
  color: #fff;
  line-height: 1.10;
  letter-spacing: -.02em;
  animation: ${sy} 0.8s 0.28s both ease-out;

  em {
    font-style: italic;
    font-weight: 400;
  }
`,Sy=vd.p`
  margin: 0 0 52px;
  font-size: clamp(16px, 2.2vw, 20px);
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
  animation: ${sy} 0.8s 0.42s both ease-out;
`,$y=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: ${sy} 0.8s 0.56s both ease-out;
`,zy=vd.a`
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
`,Ey=vd.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.52);
  letter-spacing: .01em;
`,_y=vd.section`
  padding: 80px 24px;
  background: #ffffff;

  @media (max-width: 640px) { padding: 64px 20px; }

  & > * {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
`,Ny=vd.div`
  text-align: center;
  margin-bottom: 48px;
  @media (max-width: 640px) { margin-bottom: 36px; }
`,Ay=vd.p`
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  color: #1B7A6E;
  text-transform: uppercase;
  letter-spacing: .20em;
  text-align: center;
`,Cy=vd.h2`
  margin: 0 0 48px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  line-height: 1.12;
  letter-spacing: -.02em;
  text-align: center;

  @media (max-width: 640px) { margin-bottom: 36px; }
`,Fy=(vd.div`
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
`),Ty=vd.div`
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
`,Py=vd.p`
  margin: 0;
  padding: 0 0 0 12px;
  border-left: 2.5px solid #9F3B22;
  font-size: 13px;
  font-style: italic;
  color: #4A5E58;
  line-height: 1.6;
`,Dy=vd.div`
  height: 1px;
  background: #E4EDE9;
  margin: 16px 0;
`,Ly=(vd.span`
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
`),Ry=vd.p`
  margin: 0;
  font-size: 13.5px;
  color: #5C6E68;
  line-height: 1.6;
  flex: 1;
`,Oy=vd.p`
  margin: 0;
  font-size: 12.5px;
  color: #1B7A6E;
  font-style: italic;
  line-height: 1.55;
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid #D5E2DC;
`,Iy=vd.section`
  background: #000;
  padding: 88px 24px;

  @media (max-width: 640px) { padding: 72px 20px; }
`,My=vd.div`
  max-width: 760px;
  margin: 0 auto;
`,By=vd.p`
  margin: 0 0 56px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.28);
  text-transform: uppercase;
  letter-spacing: .22em;
`,Vy=vd.div`
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease,
    transform 0.7s ${e=>{let{$i:t}=e;return.18*t+"s"}} ease;

  ${e=>{let{$visible:t}=e;return t&&md`
    opacity: 1;
    transform: translateY(0);
  `}}
`,Uy=vd.span`
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #4FBFB3;
  text-transform: uppercase;
  letter-spacing: .20em;
  margin-bottom: 14px;
`,Ky=vd.p`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(30px, 5.5vw, 60px);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -.03em;
  text-align: left;
`,Hy=vd.div`
  width: 1px;
  height: 56px;
  background: rgba(255,255,255,0.10);
  margin: 52px 0;
`,Wy=vd.section`
  background: #ffffff;
  padding: 96px 24px;
  border-top: 1px solid #E8EFEC;
  text-align: center;

  @media (max-width: 640px) { padding: 72px 20px; }
`,qy=vd.div`
  max-width: 480px;
  margin: 0 auto;
`,Yy=vd.h2`
  margin: 0 0 16px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 700;
  color: #0E1A17;
  letter-spacing: -.025em;
  line-height: 1.12;
`,Gy=vd.p`
  margin: 0 0 40px;
  font-size: 16px;
  color: #5C6E68;
  line-height: 1.6;
`,Qy=vd.p`
  margin: 24px 0 0;
  font-size: 12px;
  color: #3F4B47;
  letter-spacing: .01em;
  opacity: 0.65;
`,Jy=vd.div`
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
`,Xy=vd.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 0;
`,Zy=vd.input`
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
`,ek=vd.button`
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
`,tk=vd.p`
  font-size: 12.5px;
  color: #9F3B22;
  margin: 4px 0 0;
  line-height: 1.5;
`,rk=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
`,nk=vd.div`
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
  animation: ${uy} 0.55s cubic-bezier(0.34,1.46,0.64,1) both;
`,ak=vd.h3`
  margin: 0;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0E1A17;
`,ik=vd.p`
  margin: 0;
  font-size: 14px;
  color: #5C6E68;
  line-height: 1.6;
`,ok=vd.p`
  margin: 0;
  font-size: 13px;
  color: #3F4B47;
  opacity: 0.55;
  font-style: italic;
`,lk=[{context:"Telia h\xf6jer 11% i januari. Ni m\xe4rker det i september \u2014 \xe5tta m\xe5nader senare.",title:"Marknadsintelligens f\xf6re fakturan",body:"Arvo ser vad som h\xe4nder hos j\xe4mf\xf6rbara bolag i n\xe4tverket \u2014 och varnar er innan h\xf6jningen syns p\xe5 er faktura.",quote:'"6 av 14 bolag i er bransch fick Telias prish\xf6jning f\xf6rra m\xe5naden."'},{context:"Tele2-avtalet f\xf6rnyas automatiskt. Ni m\xe4rkte det inte. Nu \xe4r ni l\xe5sta ett \xe5r till.",title:"Kontraktskalender med handlingsplan",body:"Inte bara p\xe5minnelser \u2014 utan exakt vad som ska g\xf6ras, n\xe4r och varf\xf6r. Arvo r\xe4knar bakl\xe4nges fr\xe5n varje f\xf6rnyelsedatum.",quote:'"87 dagar kvar. Aktivera byte senast 15 september."'},{context:"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr. Ni betalar differensen utan att veta om det.",title:"Faktura mot avtal",body:"Leverant\xf6rer fakturerar fel \u2014 ofta. Arvo kontrollerar automatiskt varje faktura mot k\xe4nt avtalspris och flaggar avvikelser direkt.",quote:'"Telia fakturerar 349 kr/SIM. Ert avtal s\xe4ger 299 kr."'},{context:"Kostnaderna rullar p\xe5. Ingen sammanfattar. Styrelsen fr\xe5gar \u2014 ingen har svaret.",title:"M\xe5natlig CFO-brief",body:"En professionell rapport \u2014 klar f\xf6r styrelserummet \u2014 med vad Arvo hittat, vad som sparats och vad som \xe4r p\xe5 v\xe4g.",quote:'"Tre avtal bevakas. Ett flaggat f\xf6r \xe5tg\xe4rd n\xe4sta vecka."'}];function sk(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.12;const t=(0,n.useRef)(null),[r,a]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{const r=t.current;if(!r)return;const n=new IntersectionObserver(e=>{let[t]=e;t.isIntersecting&&(a(!0),n.disconnect())},{threshold:e});return n.observe(r),()=>n.disconnect()},[e]),[t,r]}const ck=()=>(0,$d.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 100 100",fill:"none","aria-hidden":"true",style:{flexShrink:0},children:[(0,$d.jsx)("defs",{children:(0,$d.jsxs)("linearGradient",{id:"intelig",x1:"50",y1:"5",x2:"50",y2:"95",gradientUnits:"userSpaceOnUse",children:[(0,$d.jsx)("stop",{offset:"0%",stopColor:"#4ECDC4"}),(0,$d.jsx)("stop",{offset:"100%",stopColor:"#1DB09A"})]})}),(0,$d.jsx)("path",{d:"M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z",fill:"url(#intelig)"})]}),dk=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function uk(){var e;const[t,r]=sk(.08),[a,i]=sk(.12),[o]=jl(),l=o.get("savings")?Number(o.get("savings")):null,s=null!==(e=o.get("supplier"))&&void 0!==e?e:null,[c,d]=(0,n.useState)(""),[u,p]=(0,n.useState)(""),[h,f]=(0,n.useState)("idle"),[m,g]=(0,n.useState)("");return(0,$d.jsxs)(py,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsx)(hy,{children:(0,$d.jsxs)(fy,{children:[(0,$d.jsxs)(my,{children:[(0,$d.jsxs)(gy,{children:[(0,$d.jsx)(ck,{}),(0,$d.jsx)(xy,{}),(0,$d.jsx)(vy,{children:"Arvo Intelligence"}),(0,$d.jsx)(by,{children:"Just nu"})]}),(0,$d.jsx)(yy,{children:"Arvo har detekterat n\xe5got"}),(0,$d.jsxs)(ky,{children:["Telia h\xf6jde priset f\xf6r ",(0,$d.jsx)("strong",{children:"8 av 14 bolag"})," i er bransch f\xf6rra m\xe5naden. Er n\xe4sta faktura tr\xe4ffar om"," ",(0,$d.jsx)("strong",{children:"12 dagar."})]}),(0,$d.jsx)(jy,{as:vl,to:"/testa-faktura",children:"Se vad det inneb\xe4r f\xf6r er \u2192"})]}),(0,$d.jsxs)(wy,{children:["Arvo m\xe4rkte det.",(0,$d.jsx)("br",{}),(0,$d.jsx)("em",{children:"Ni visste inte om det \xe4nnu."})]}),(0,$d.jsx)(Sy,{children:"Ni ska inte beh\xf6va h\xe5lla koll. Det \xe4r Arvos jobb."}),(0,$d.jsxs)($y,{children:[(0,$d.jsx)(zy,{as:"a",href:"#aktivera",children:"Aktivera Arvo Intelligence"}),(0,$d.jsx)(Ey,{children:"1 995 kr/m\xe5n \xb7 Ingen bindningstid"})]})]})}),(0,$d.jsxs)(_y,{ref:t,children:[(0,$d.jsxs)(Ny,{children:[(0,$d.jsx)(Ay,{children:"Arvo Intelligence"}),(0,$d.jsx)(Cy,{style:{marginBottom:0},children:"Det Arvo ser \u2014 som annars f\xf6rsvinner"})]}),(0,$d.jsx)(Fy,{children:lk.map((e,t)=>(0,$d.jsxs)(Ty,{$i:t,$visible:r,children:[(0,$d.jsx)(Py,{children:e.context}),(0,$d.jsx)(Dy,{}),(0,$d.jsx)(Ly,{children:e.title}),(0,$d.jsx)(Ry,{children:e.body}),(0,$d.jsx)(Oy,{children:e.quote})]},t))})]}),(0,$d.jsx)(Iy,{ref:a,children:(0,$d.jsxs)(My,{children:[(0,$d.jsx)(By,{children:"Den enda finansiella partnern som..."}),(0,$d.jsxs)(Vy,{$i:0,$visible:i,children:[(0,$d.jsx)(Uy,{children:"Regel 1"}),(0,$d.jsx)(Ky,{children:"Arvo vaktar er f\xf6r 1 995 kr/m\xe5n."})]}),(0,$d.jsx)(Hy,{}),(0,$d.jsxs)(Vy,{$i:1,$visible:i,children:[(0,$d.jsx)(Uy,{children:"Regel 2"}),(0,$d.jsx)(Ky,{children:"Ni beh\xe5ller 80% av allt vi sparar er."})]})]})}),(0,$d.jsx)(Wy,{id:"aktivera",children:(0,$d.jsxs)(qy,{children:["sent"!==h&&(0,$d.jsxs)(Yy,{children:["Arvo b\xf6rjar bevaka",(0,$d.jsx)("br",{}),"imorgon bitti."]}),"sent"===h?(0,$d.jsxs)(rk,{children:[(0,$d.jsx)(nk,{children:"\u2713"}),(0,$d.jsx)(ak,{children:"Aktiverat."}),(0,$d.jsxs)(ik,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$d.jsx)("br",{}),"Vi h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),c&&(0,$d.jsx)(ok,{children:c})]}):(0,$d.jsxs)($d.Fragment,{children:[null!=l?(0,$d.jsx)(Jy,{children:s?(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[dk(l),"\xa0kr/\xe5r"]})," hos ",s,". Den besparingen v\xe4ntar."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[dk(l),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})}):(0,$d.jsx)(Gy,{children:"E-post och bolagsnamn \u2014 klart p\xe5 30 sekunder."}),(0,$d.jsxs)(Xy,{onSubmit:async e=>{e.preventDefault();const t=c.trim();if(t&&"submitting"!==h){f("submitting"),g("");try{var r;const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==s&&void 0!==s?s:u.trim()||void 0,netSaving:null!==l&&void 0!==l?l:void 0,source:"intelligence-page"})});if(!e.ok)throw new Error(null!==(r=(await e.json().catch(()=>({}))).error)&&void 0!==r?r:"err");f("sent")}catch{g("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),f("error")}}},children:[(0,$d.jsx)(Zy,{type:"email",placeholder:"er@foretag.se",value:c,onChange:e=>d(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)(Zy,{type:"text",placeholder:"Bolagsnamn",value:u,onChange:e=>p(e.target.value),autoComplete:"organization"}),(0,$d.jsx)(ek,{type:"submit",disabled:"submitting"===h,children:"submitting"===h?"\u2026":"Aktivera bevakningen \u2192"}),m&&(0,$d.jsx)(tk,{children:m})]})]}),(0,$d.jsx)(Qy,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo startar bevakningen inom 24h"})]})}),(0,$d.jsx)(xu,{})]})}const pk=jd`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`,hk=jd`
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`,fk=jd`
  from { stroke-dashoffset: 60; opacity: 0; }
  to   { stroke-dashoffset: 0;  opacity: 1; }
`,mk=jd`
  from { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.08); }
  to   { transform: scale(1);   opacity: 1; }
`,gk=jd`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(29,176,154,0); }
`,xk=vd.div`
  background: #060D0B;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
`,vk=vd.section`
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
`,bk=vd.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
`,yk=vd.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 32px;
  animation: ${pk} 0.6s ease both;
`,kk=vd.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${gk} 2.4s ease-in-out infinite;
`,jk=vd.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #1DB09A;
`,wk=vd.h1`
  font-size: clamp(30px, 6vw, 50px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #fff;
  text-align: center;
  margin: 0 0 16px;
  animation: ${pk} 0.6s 0.08s ease both;
`,Sk=vd.p`
  font-size: 15px;
  color: rgba(255,255,255,0.42);
  text-align: center;
  margin: 0 0 40px;
  line-height: 1.5;
  animation: ${pk} 0.6s 0.14s ease both;
`,$k=vd.div`
  width: 100%;
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.22);
  border-radius: 14px;
  padding: 14px 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${pk} 0.6s 0.18s ease both;
`,zk=vd.span`
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1;
`,Ek=vd.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.70);
  line-height: 1.55;

  strong {
    color: #1DB09A;
    font-weight: 700;
  }
`,_k=vd.div`
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
  animation: ${hk} 0.65s 0.1s cubic-bezier(0.34,1.28,0.64,1) both;
`,Nk=vd.h2`
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 6px;
  line-height: 1.2;
`,Ak=vd.p`
  font-size: 13px;
  color: rgba(255,255,255,0.40);
  margin: 0 0 24px;
  line-height: 1.5;
`,Ck=vd.a`
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
`,Fk=vd.span`
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
`,Tk=vd.span`
  flex: 1;
`,Pk=vd.span`
  color: rgba(255,255,255,0.25);
  font-size: 13px;
`,Dk=vd.div`
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
`,Lk=vd.form`
  display: flex;
  gap: 8px;
  align-items: stretch;
`,Rk=vd.input`
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
`,Ok=vd.button`
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
`,Ik=vd.p`
  font-size: 12px;
  color: #F87171;
  margin: 8px 0 0;
  line-height: 1.5;
`,Mk=vd.p`
  font-size: 11.5px;
  color: rgba(255,255,255,0.22);
  margin: 16px 0 0;
  line-height: 1.6;
  text-align: center;
`,Bk=vd.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 0 4px;
`,Vk=vd.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: rgba(29,176,154,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: ${mk} 0.55s cubic-bezier(0.34,1.46,0.64,1) both;

  svg {
    stroke: #1DB09A;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
    animation: ${fk} 0.5s 0.2s ease both;
  }
`,Uk=vd.h3`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  margin: 0 0 8px;
`,Kk=vd.p`
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  margin: 0 0 24px;
  line-height: 1.6;
`,Hk=vd.p`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
  margin: 0 0 24px;
  font-style: italic;
`,Wk=vd.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  margin: 0 0 10px;
  width: 100%;
  text-align: left;
`,qk=vd.div`
  display: flex;
  gap: 0;
  margin-top: 40px;
  width: 100%;
  animation: ${pk} 0.6s 0.4s ease both;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0;
  }
`,Yk=vd.div`
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
`,Gk=vd.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 8px;
`,Qk=vd.p`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin: 0;
  line-height: 1.55;
`,Jk=vd.div`
  width: 100%;
  max-width: 460px;
  margin: 48px auto 80px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: ${pk} 0.6s 0.5s ease both;
`,Xk=vd.p`
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
`,Zk=e=>new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e);function ej(){return(0,$d.jsx)("svg",{width:"28",height:"28",viewBox:"0 0 28 28",children:(0,$d.jsx)("polyline",{points:"5,14 11,20 23,8"})})}function tj(){var e;const[t]=jl(),r=t.get("savings")?Number(t.get("savings")):null,a=null!==(e=t.get("supplier"))&&void 0!==e?e:null,i=t.get("score")?Number(t.get("score")):null,[o,l]=(0,n.useState)(""),[s,c]=(0,n.useState)("idle"),[d,u]=(0,n.useState)(""),p="/api/auth/gmail-init"+(o?`?email=${encodeURIComponent(o)}`:""),h="/api/auth/outlook-init"+(o?`?email=${encodeURIComponent(o)}`:"");return(0,$d.jsxs)(xk,{children:[(0,$d.jsx)(du,{variant:"public"}),(0,$d.jsx)(vk,{children:(0,$d.jsxs)(bk,{children:[(0,$d.jsxs)(yk,{children:[(0,$d.jsx)(kk,{}),(0,$d.jsx)(jk,{children:"Arvo Intelligence"})]}),"sent"!==s&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsxs)(wk,{children:["Arvo b\xf6rjar bevaka er",(0,$d.jsx)("br",{}),"imorgon bitti."]}),(0,$d.jsx)(Sk,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid"})]}),null!=r&&"sent"!==s&&(0,$d.jsxs)($k,{children:[(0,$d.jsx)(zk,{children:"\u2192"}),(0,$d.jsx)(Ek,{children:a?(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[Zk(r),"\xa0kr/\xe5r"]})," hos ",a,". Den besparingen v\xe4ntar."]}):(0,$d.jsxs)($d.Fragment,{children:["Vi identifierade redan ",(0,$d.jsxs)("strong",{children:[Zk(r),"\xa0kr/\xe5r"]})," i besparing \xe5t er. Den v\xe4ntar p\xe5 att aktiveras."]})})]}),(0,$d.jsx)(_k,{children:"sent"===s?(0,$d.jsxs)(Bk,{children:[(0,$d.jsx)(Vk,{children:(0,$d.jsx)(ej,{})}),(0,$d.jsx)(Uk,{children:"Aktiverat."}),(0,$d.jsxs)(Kk,{children:["Arvo b\xf6rjar bevaka er inom 24\xa0timmar.",(0,$d.jsx)("br",{}),"Ni h\xf6r av oss n\xe4r det finns n\xe5got att agera p\xe5."]}),(0,$d.jsx)(Hk,{children:o}),(0,$d.jsx)(Wk,{children:"Koppla er inkorg \u2014 Arvo hittar allt"}),(0,$d.jsxs)(Ck,{href:p,style:{marginBottom:9},children:[(0,$d.jsx)(Fk,{$provider:"google",children:"G"}),(0,$d.jsx)(Tk,{children:"Koppla Gmail"}),(0,$d.jsx)(Pk,{children:"\u2192"})]}),(0,$d.jsxs)(Ck,{href:h,children:[(0,$d.jsx)(Fk,{$provider:"outlook",children:"\u25a0"}),(0,$d.jsx)(Tk,{children:"Koppla Outlook"}),(0,$d.jsx)(Pk,{children:"\u2192"})]}),(0,$d.jsx)(Mk,{children:"Arvo l\xe4ser bara faktura-mail \u2014 aldrig personlig korrespondens."})]}):(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(Nk,{children:"Koppla er inkorg \u2014 en g\xe5ng."}),(0,$d.jsx)(Ak,{children:"Arvo s\xf6ker igenom era leverant\xf6rsfakturor och kontaktar er n\xe4r n\xe5got h\xe4nt."}),(0,$d.jsxs)(Ck,{href:p,children:[(0,$d.jsx)(Fk,{$provider:"google",children:"G"}),(0,$d.jsx)(Tk,{children:"Koppla Gmail"}),(0,$d.jsx)(Pk,{children:"\u2192"})]}),(0,$d.jsxs)(Ck,{href:h,children:[(0,$d.jsx)(Fk,{$provider:"outlook",children:"\u25a0"}),(0,$d.jsx)(Tk,{children:"Koppla Outlook"}),(0,$d.jsx)(Pk,{children:"\u2192"})]}),(0,$d.jsx)(Dk,{children:(0,$d.jsx)("span",{children:"eller b\xf6rja med e-post"})}),(0,$d.jsxs)(Lk,{onSubmit:async e=>{e.preventDefault();const t=o.trim();if(t&&"submitting"!==s){c("submitting"),u("");try{const e=await fetch("/api/activate-intelligence",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,supplier:null!==a&&void 0!==a?a:void 0,netSaving:null!==r&&void 0!==r?r:void 0,diagScore:null!==i&&void 0!==i?i:void 0,source:"intelligence-page"})});if(!e.ok){var n;const t=await e.json().catch(()=>({}));throw new Error(null!==(n=t.error)&&void 0!==n?n:"server_error")}c("sent")}catch(l){u("N\xe5got gick fel \u2014 f\xf6rs\xf6k igen."),c("error")}}},children:[(0,$d.jsx)(Rk,{type:"email",placeholder:"er@foretag.se",value:o,onChange:e=>l(e.target.value),required:!0,autoComplete:"email"}),(0,$d.jsx)(Ok,{type:"submit",disabled:"submitting"===s,children:"submitting"===s?"\u2026":"Aktivera \u2192"})]}),d&&(0,$d.jsx)(Ik,{children:d}),(0,$d.jsx)(Mk,{children:"1\xa0995\xa0kr/m\xe5n \xb7 Ingen bindningstid \xb7 Arvo l\xe4ser bara faktura-mail, aldrig personlig korrespondens."})]})}),(0,$d.jsxs)(qk,{children:[(0,$d.jsxs)(Yk,{children:[(0,$d.jsx)(Gk,{children:"24h"}),(0,$d.jsx)(Qk,{children:"Arvo aktiverar er bevakning"})]}),(0,$d.jsxs)(Yk,{children:[(0,$d.jsx)(Gk,{children:"Dag 7"}),(0,$d.jsx)(Qk,{children:"Ni f\xe5r er f\xf6rsta analys"})]}),(0,$d.jsxs)(Yk,{children:[(0,$d.jsx)(Gk,{children:"L\xf6pande"}),(0,$d.jsx)(Qk,{children:"Arvo kontaktar er om n\xe5got h\xe4nt"})]})]})]})}),(0,$d.jsxs)(Jk,{children:[(0,$d.jsxs)(Xk,{children:[(0,$d.jsx)("strong",{children:"Regel 1:"})," Arvo vaktar er f\xf6r 1\xa0995\xa0kr/m\xe5n."]}),(0,$d.jsxs)(Xk,{children:[(0,$d.jsx)("strong",{children:"Regel 2:"})," Ni beh\xe5ller 80% av allt vi sparar er."]})]}),(0,$d.jsx)(xu,{})]})}const rj=jd`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`,nj=jd`
  from { opacity: 0; }
  to   { opacity: 1; }
`,aj=jd`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1); }
`,ij="#040A09",oj="#1DB09A",lj="#4ECDC4",sj=vd.div`
  min-height: 100vh;
  background: ${ij};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
`,cj=vd.div`
  background: ${ij};
  padding: 64px 32px 56px;
  text-align: center;
  position: relative;
  animation: ${rj} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, ${oj} 30%, ${lj} 60%, transparent 100%);
  }
`,dj=vd.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`,uj=vd.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${oj};
`,pj=vd.div`
  font-size: 11px;
  color: rgba(255,255,255,0.22);
  letter-spacing: 0.04em;
`,hj=vd.h1`
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(40px, 11vw, 56px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px;
  line-height: 1.06;
  letter-spacing: -0.025em;
  animation: ${rj} 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
`,fj=vd.div`
  font-size: 13px;
  color: rgba(255,255,255,0.28);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  letter-spacing: 0.01em;
  animation: ${rj} 0.5s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
`,mj=vd.span`
  color: rgba(255,255,255,0.15);
`,gj=vd.div`
  background: ${ij};
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 56px 32px 52px;
  text-align: center;
`,xj=vd.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  margin-bottom: 28px;
`,vj=vd.div`
  margin-bottom: 20px;
  animation: ${rj} 0.5s ${e=>{let{$i:t}=e;return.1+.08*(null!==t&&void 0!==t?t:0)}}s cubic-bezier(0.22, 1, 0.36, 1) both;
`,bj=vd.div`
  font-size: 14px;
  color: ${oj};
  margin-bottom: 10px;
  letter-spacing: 0.08em;
`,yj=vd.p`
  font-size: 20px;
  font-weight: 500;
  color: rgba(255,255,255,0.92);
  line-height: 1.50;
  margin: 0;
  letter-spacing: -0.01em;
  max-width: 480px;
  margin-inline: auto;
`,kj=vd.div`
  margin-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 380px;
  margin-inline: auto;
`,jj=vd.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`,wj=vd.span`
  font-size: 12px;
  color: rgba(255,255,255,0.30);
  flex-shrink: 0;
`,Sj=vd.span`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{let{$highlight:t}=e;return t?oj:"rgba(255,255,255,0.70)"}};
  text-align: right;
`,$j=vd.div`
  background: linear-gradient(180deg, ${ij} 0%, #06120E 100%);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 64px 32px 60px;
  text-align: center;
`,zj=vd.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
  margin-bottom: 20px;
  animation: ${rj} 0.5s 0.05s cubic-bezier(0.22, 1, 0.36, 1) both;
`,Ej=vd.div`
  font-size: clamp(44px, 13vw, 68px);
  font-weight: 800;
  color: ${oj};
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 4px;
  animation: ${rj} 0.6s 0.10s cubic-bezier(0.22, 1, 0.36, 1) both;
`,_j=vd.span`
  font-size: 0.40em;
  font-weight: 500;
  color: rgba(29,176,154,0.65);
  letter-spacing: -0.01em;
  vertical-align: baseline;
`,Nj=vd.div`
  font-size: 12px;
  color: rgba(255,255,255,0.28);
  margin-top: 12px;
  letter-spacing: 0.01em;
`,Aj=vd.div`
  font-size: 12px;
  font-style: italic;
  color: rgba(255,255,255,0.22);
  margin-top: 20px;
  max-width: 320px;
  margin-inline: auto;
  line-height: 1.6;
`,Cj=vd.div`
  background: #F5F8F6;
  padding: 48px 24px 40px;
`,Fj=vd.div`
  max-width: 520px;
  margin: 0 auto;
`,Tj=vd.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(14,26,23,0.35);
  margin-bottom: 24px;
  text-align: center;
`,Pj=vd.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${oj} 0%, ${lj} 100%);
  }
`,Dj=vd.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #1B7A6E;
  margin-bottom: 20px;
`,Lj=vd.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);

  &:last-of-type {
    border-bottom: none;
  }
`,Rj=vd.span`
  font-size: 13px;
  color: rgba(14,26,23,0.45);
  flex-shrink: 0;
`,Oj=vd.span`
  font-size: 14px;
  font-weight: 600;
  color: ${e=>{let{$highlight:t}=e;return t?"#1B7A6E":"#0E1A17"}};
  text-align: right;
`,Ij=vd.div`
  background: #0E1A17;
  border-radius: 12px;
  padding: 14px 18px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`,Mj=vd.span`
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  font-weight: 500;
`,Bj=vd.span`
  font-size: 15px;
  font-weight: 700;
  color: ${lj};
  letter-spacing: -0.01em;
`,Vj=vd.div`
  font-size: 11px;
  color: rgba(14,26,23,0.28);
  margin-top: 12px;
  line-height: 1.5;
`,Uj=vd.div`
  background: ${ij};
  padding: 56px 28px 48px;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.05);
`,Kj=vd.p`
  font-size: 12px;
  color: rgba(255,255,255,0.20);
  line-height: 1.75;
  max-width: 380px;
  margin: 0 auto 40px;
`,Hj=vd.div`
  margin-bottom: 8px;
`,Wj=vd.a`
  display: block;
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
  background: linear-gradient(135deg, ${lj} 0%, ${oj} 55%, #1B6E66 100%);
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  padding: 20px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.01em;
  box-shadow: 0 12px 40px rgba(29,176,154,0.35);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-sizing: border-box;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 6px 24px rgba(29,176,154,0.25);
  }
`,qj=vd.div`
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  margin-top: 10px;
  letter-spacing: 0.01em;
`,Yj=vd.div`
  height: 20px;
`,Gj=vd.div`
  margin-bottom: 8px;
`,Qj=vd.a`
  display: block;
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
  border: 1px solid rgba(255,255,255,0.18);
  background: transparent;
  color: rgba(255,255,255,0.80);
  font-size: 15px;
  font-weight: 600;
  padding: 18px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: border-color 0.18s ease, color 0.18s ease;
  box-sizing: border-box;

  &:active {
    border-color: rgba(255,255,255,0.35);
    color: #fff;
  }
`,Jj=vd.div`
  font-size: 12px;
  color: rgba(255,255,255,0.20);
  margin-top: 10px;
  letter-spacing: 0.01em;
`,Xj=vd.div`
  background: ${ij};
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Zj=vd.span`
  font-size: 11px;
  color: rgba(255,255,255,0.18);
  letter-spacing: 0.04em;
`,ew=vd.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.15);
`,tw=vd.div`
  min-height: 100vh;
  background: ${ij};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`,rw=vd.div`
  display: flex;
  gap: 8px;
`,nw=vd.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${oj};
  animation: ${aj} 1.2s ${e=>{let{$i:t}=e;return.2*(null!==t&&void 0!==t?t:0)}}s ease-in-out infinite;
`,aw=vd.div`
  font-size: 13px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.04em;
`,iw=vd.div`
  min-height: 100vh;
  background: ${ij};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
  gap: 0;
`,ow=vd.div`
  font-size: 32px;
  margin-bottom: 20px;
  animation: ${nj} 0.4s ease both;
`,lw=vd.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
`,sw=vd.p`
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  line-height: 1.65;
  max-width: 320px;
  margin: 0 0 28px;
`,cw=vd.a`
  font-size: 15px;
  font-weight: 600;
  color: ${oj};
  text-decoration: none;
  border-bottom: 1px solid rgba(29,176,154,0.3);
  padding-bottom: 2px;
`,dw=e=>null!=e?new Intl.NumberFormat("sv-SE",{maximumFractionDigits:0}).format(e):"\u2013",uw={microsoft365:"Microsoft 365",google:"Google Workspace",zoho:"Zoho Mail",other:"Anpassad e-postl\xf6sning"},pw=["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];function hw(e){if(!e)return null;const[t,r]=e.split("-");return`${pw[parseInt(r)-1]} ${t}`}function fw(e){if(!e)return"";return new Date(e).toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"})}function mw(){var e,t,r;const{token:a}=ho(),[i,o]=(0,n.useState)("loading"),[l,s]=(0,n.useState)(null),[c,d]=(0,n.useState)(!1);(0,n.useEffect)(()=>{a?fetch(`/api/prospect?token=${encodeURIComponent(a)}`).then(e=>e.json()).then(e=>{e.ok?(s(e.prospect),o("ready")):o("error")}).catch(()=>o("error")):o("error")},[a]);const u=e=>{c||(d(!0),fetch(`/api/prospect?token=${encodeURIComponent(a)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e})}).catch(()=>{}))};if("loading"===i)return(0,$d.jsxs)(tw,{children:[(0,$d.jsx)(rw,{children:[0,1,2].map(e=>(0,$d.jsx)(nw,{$i:e},e))}),(0,$d.jsx)(aw,{children:"H\xe4mtar er analys\u2026"})]});if("error"===i)return(0,$d.jsxs)(iw,{children:[(0,$d.jsx)(ow,{children:"\ud83d\udd12"}),(0,$d.jsx)(lw,{children:"Analysen hittades inte"}),(0,$d.jsx)(sw,{children:"L\xe4nken kan ha g\xe5tt ut eller \xe4r ogiltig. Analysera er faktura direkt \u2014 det tar 2 minuter."}),(0,$d.jsx)(cw,{href:"/testa-faktura",children:"Analysera en faktura \u2192"})]});const{companyName:p,industry:h,employees:f,estimates:m,generatedAt:g}=l,x=null!==(e=null===m||void 0===m?void 0:m.categories)&&void 0!==e?e:[],v=(null===m||void 0===m?void 0:m.hasEstimates)&&((null===m||void 0===m?void 0:m.totalSavingLow)>0||x.length>0),b=null===m||void 0===m?void 0:m.mxPlatform,y=null===m||void 0===m?void 0:m.mxSince,k=null===m||void 0===m?void 0:m.domainRegistered,j=null===m||void 0===m?void 0:m.foundedYear,w=null!==(t=null===m||void 0===m?void 0:m.findings)&&void 0!==t?t:[],S=($=y)?Math.round((Date.now()-new Date($).getTime())/2630016e3):0;var $;const z=null!==(r=uw[b])&&void 0!==r?r:b,E=w.length>0,_=[];w.forEach(e=>_.push({text:e,key:e})),!E&&y?_.push({text:`${z}-konfiguration of\xf6r\xe4ndrad sedan ${hw(y)} \u2014 ${S} m\xe5nader`,key:"mxSince"}):!E&&b&&_.push({text:`${z} identifierat f\xf6r er dom\xe4n \xb7 ${f} licenser`,key:"mxPlatform"});const N=_.length>0,A=E?"IDENTIFIERAT FYND":"INFRASTRUKTURANALYS",C=E&&(b||k||y);return(0,$d.jsxs)(sj,{children:[(0,$d.jsxs)(cj,{children:[(0,$d.jsxs)(dj,{children:[(0,$d.jsx)(uj,{children:"Konfidentiell analys"}),(0,$d.jsx)(pj,{children:fw(g)})]}),(0,$d.jsx)(hj,{children:p}),(0,$d.jsxs)(fj,{children:[h&&(0,$d.jsx)("span",{children:h}),h&&f&&(0,$d.jsx)(mj,{children:"\xb7"}),f&&(0,$d.jsxs)("span",{children:[f," anst\xe4llda"]}),j&&(0,$d.jsxs)($d.Fragment,{children:[(0,$d.jsx)(mj,{children:"\xb7"}),(0,$d.jsxs)("span",{children:["Grundat ",j]})]})]})]}),N&&(0,$d.jsxs)(gj,{children:[(0,$d.jsx)(xj,{children:A}),_.map((e,t)=>(0,$d.jsxs)(vj,{$i:t,children:[(0,$d.jsx)(bj,{children:"\u2605"}),(0,$d.jsx)(yj,{children:e.text})]},e.key)),C&&(0,$d.jsxs)(kj,{children:[b&&(0,$d.jsxs)(jj,{children:[(0,$d.jsx)(wj,{children:"E-postplattform"}),(0,$d.jsx)(Sj,{children:z})]}),y&&(0,$d.jsxs)(jj,{children:[(0,$d.jsx)(wj,{children:"Konfiguration sedan"}),(0,$d.jsxs)(Sj,{$highlight:!0,children:[hw(y)," \u2014 ",S," m\xe5n"]})]}),k&&(0,$d.jsxs)(jj,{children:[(0,$d.jsx)(wj,{children:"Dom\xe4n registrerad"}),(0,$d.jsx)(Sj,{children:hw(k)})]})]})]}),v&&(0,$d.jsxs)($j,{children:[(0,$d.jsx)(zj,{children:"Ber\xe4knad kostnadspremie"}),(0,$d.jsxs)(Ej,{children:[dw(m.totalSavingLow),"\u2013",dw(m.totalSavingHigh)," ",(0,$d.jsx)(_j,{children:"kr/\xe5r"})]}),b&&f&&(0,$d.jsxs)(Nj,{children:["Baserat p\xe5 ",f," licenser \xd7 marknadspris ",z]}),(0,$d.jsx)(Aj,{children:"Er faktiska avtalskostnad ser vi inte f\xf6rr\xe4n ni delar er faktura"})]}),x.length>0&&(0,$d.jsx)(Cj,{children:(0,$d.jsxs)(Fj,{children:[(0,$d.jsx)(Tj,{children:"Kostnadsanalys per kategori"}),x.map((e,t)=>(0,$d.jsxs)(Pj,{children:[(0,$d.jsx)(Dj,{children:e.label}),(0,$d.jsxs)(Lj,{children:[(0,$d.jsx)(Rj,{children:"m365"===e.category?"Uppskattade licenser":"Uppskattade abonnemang"}),(0,$d.jsxs)(Oj,{children:[e.estimatedSims," st"]})]}),(0,$d.jsxs)(Lj,{children:[(0,$d.jsx)(Rj,{children:"Typisk marknadskostnad"}),(0,$d.jsxs)(Oj,{children:[dw(e.typicalLow),"\u2013",dw(e.typicalHigh)," kr/\xe5r"]})]}),(0,$d.jsxs)(Lj,{children:[(0,$d.jsx)(Rj,{children:"Arvo-priset (verifierat listpris)"}),(0,$d.jsxs)(Oj,{$highlight:!0,children:[dw(e.arvoAnnual)," kr/\xe5r"]})]}),(0,$d.jsxs)(Lj,{children:[(0,$d.jsx)(Rj,{children:"m365"===e.category?"Pris per licens":"Pris per abonnemang"}),(0,$d.jsxs)(Oj,{children:[e.pricePerSim.arvo," kr/m\xe5n"," ",(0,$d.jsxs)("span",{style:{color:"rgba(0,0,0,0.22)",fontWeight:400,fontSize:11},children:["(typiskt ",e.pricePerSim.typical," kr/m\xe5n)"]})]})]}),(0,$d.jsxs)(Ij,{children:[(0,$d.jsx)(Mj,{children:"Potentiell besparing"}),(0,$d.jsxs)(Bj,{children:["upp till ",dw(e.savingHigh)," kr/\xe5r"]})]}),(0,$d.jsx)(Vj,{children:e.sourceNote})]},t))]})}),(0,$d.jsxs)(Uj,{children:[(0,$d.jsxs)(Kj,{children:["Arvo har analyserat den publika DNS-konfigurationen f\xf6r ",p,"s dom\xe4n. Ingen data har inh\xe4mtats fr\xe5n er eller era leverant\xf6rer utan ert tillst\xe5nd. Er faktiska avtalskostnad k\xe4nner vi inte till f\xf6rr\xe4n ni visar oss er faktura."]}),(0,$d.jsxs)(Hj,{children:[(0,$d.jsx)(Wj,{href:"/testa-faktura",onClick:()=>u("upload"),children:"Verifiera er kostnad \u2014 ladda upp faktura"}),(0,$d.jsx)(qj,{children:"Kostnadsfritt \xb7 2 minuter \xb7 Ingen registrering kr\xe4vs"})]}),(0,$d.jsx)(Yj,{}),(0,$d.jsxs)(Gj,{children:[(0,$d.jsx)(Qj,{href:"/intelligence#aktivera",onClick:()=>u("activate"),children:"Aktivera Arvo Intelligence \u2014 1 995 kr/m\xe5n"}),(0,$d.jsx)(Jj,{children:"L\xf6pande bevakning \xb7 Ingen bindningstid \xb7 Arvo b\xf6rjar bevaka er inom 24 timmar"})]})]}),(0,$d.jsxs)(Xj,{children:[(0,$d.jsx)(Zj,{children:"arvoflow.se"}),(0,$d.jsx)(ew,{children:"Arvo Intelligence"})]})]})}"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const gw=()=>{const{pathname:e}=so();return(0,n.useEffect)(()=>{window.scrollTo(0,0)},[e]),null},xw=()=>(0,$d.jsxs)(dd,{theme:wd,children:[(0,$d.jsx)(Sd,{}),(0,$d.jsx)(gl,{basename:"/flow",children:(0,$d.jsxs)(Nd,{children:[(0,$d.jsx)(gw,{}),(0,$d.jsxs)(Lo,{children:[(0,$d.jsx)(Po,{path:"/",element:(0,$d.jsx)(Kp,{})}),(0,$d.jsx)(Po,{path:"/connect",element:(0,$d.jsx)(xh,{})}),(0,$d.jsx)(Po,{path:"/scanning",element:(0,$d.jsx)(Dh,{})}),(0,$d.jsx)(Po,{path:"/insights",element:(0,$d.jsx)(bf,{})}),(0,$d.jsx)(Po,{path:"/opportunity/:id",element:(0,$d.jsx)(Yf,{})}),(0,$d.jsx)(Po,{path:"/bias",element:(0,$d.jsx)(dm,{})}),(0,$d.jsx)(Po,{path:"/villkor",element:(0,$d.jsx)(zm,{})}),(0,$d.jsx)(Po,{path:"/integritet",element:(0,$d.jsx)(Em,{})}),(0,$d.jsx)(Po,{path:"/cookies",element:(0,$d.jsx)(_m,{})}),(0,$d.jsx)(Po,{path:"/testa-faktura",element:(0,$d.jsx)(Ig,{})}),(0,$d.jsx)(Po,{path:"/portfolio",element:(0,$d.jsx)(Hx,{})}),(0,$d.jsx)(Po,{path:"/admin",element:(0,$d.jsx)(fv,{})}),(0,$d.jsx)(Po,{path:"/utfall",element:(0,$d.jsx)(zv,{})}),(0,$d.jsx)(Po,{path:"/arvo-score",element:(0,$d.jsx)(eb,{})}),(0,$d.jsx)(Po,{path:"/briefing/:token",element:(0,$d.jsx)(ly,{})}),(0,$d.jsx)(Po,{path:"/intelligence",element:(0,$d.jsx)(uk,{})}),(0,$d.jsx)(Po,{path:"/aktivera",element:(0,$d.jsx)(tj,{})}),(0,$d.jsx)(Po,{path:"/prospect/:token",element:(0,$d.jsx)(mw,{})}),(0,$d.jsx)(Po,{path:"*",element:(0,$d.jsx)(To,{to:"/",replace:!0})})]})]})})]});!function(){var e;const t={NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SENTRY_DSN;t&&ri({dsn:t,environment:null!==(e="production")?e:"production",release:{NODE_ENV:"production",PUBLIC_URL:"/flow",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_VERSION,tracesSampleRate:.1,beforeSend(e){var t,r,n,a;const i=null!==(t=null===(r=e.exception)||void 0===r||null===(n=r.values)||void 0===n||null===(a=n[0])||void 0===a?void 0:a.value)&&void 0!==t?t:"";return i.includes("Network request failed")||i.includes("Load failed")?null:e}})}();(0,i.createRoot)(document.getElementById("root")).render((0,$d.jsx)(xw,{}))})();
//# sourceMappingURL=main.1eaf480c.js.map