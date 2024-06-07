
/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(M: any, Y: any, t: any) {'use strict';
function T(b: string) {
return function() {
var a = arguments[0], c;
7 c = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.3.8/" + (b ? b + "/" : "") + a;
7 for (a = 1; a < arguments.length; a++) {
7 c = c + (1 == a ? "?" : "&") + "p" + (a - 1) + "=";
7 var d = encodeURIComponent, e;
7 e = arguments[a];
7 e = "function" == typeof e ? e.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof e ? "undefined" : "string" != typeof e ? JSON.stringify(e) : e;
7 c += d(e)
7 }
7 return Error(c)
7 }
7 }
7 function Ta(b: any) {
7 if (null == b || Ua(b)) return !1;
7 var a = b.length;
7 return b.nodeType ===
7 na && a ? !0 : F(b) || x(b) || 0 === a || "number" === typeof a && 0 < a && a - 1 in b
7 }
7 function s(b: any, a: any, c: any) {
7 var d, e;
7 if (b) if (G(b)) for (d in b) "prototype" == d || "length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d) || a.call(c, b[d], d, b);
7 else if (x(b) || Ta(b)) {
7 var f = "object" !== typeof b;
7 d = 0;
7 for (e = b.length; d < e; d++) (f || d in b) && a.call(c, b[d], d, b)
7 } else if (b.forEach && b.forEach !== s) b.forEach(a, c, b);
7 else for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d, b);
7 return b
7 }
7 function Ed(b: any, a: any, c: any) {
7 for (var d = Object.keys(b).sort(), e = 0; e < d.length; e++) a.call(c,
7 b[d[e]], d[e]);
7 return d
7 }
7 function kc(b: any) {
7 return function(a: any, c: any) {
7 b(c, a)
7 }
7 }
7 function Fd() {
7 return ++nb
7 }
7 function lc(b: any, a: any) {
7 a ? b.$$hashKey = a : delete b.$$hashKey
7 }
7 function z(b: any) {
7 for (var a = b.$$hashKey, c = 1, d = arguments.length; c < d; c++) {
7 var e = arguments[c];
7 if (e) for (var f = Object.keys(e), g = 0, h = f.length; g < h; g++) {
7 var l = f[g];
7 b[l] = e[l]
7 }
7 }
7 lc(b, a);
7 return b
7 }
7 function ba(b: any) {
7 return parseInt(b, 10)
7 }
7 function C() {}
7 function oa(b: any) {
7 return b
7 }
7 function da(b: any) {
7 return function() {
7 return b
7 }
7 }
7 function D(b: any) {
7 return "undefined" === typeof b
7 }
7 function y(b: any) {
7 return "undefined" !==
7 typeof b
7 }
7 function H(b: any) {
7 return null !== b && "object" === typeof b
7 }
7 function F(b: any) {
7 return "string" === typeof b
7 }
7 function V(b: any) {
7 return "number" === typeof b
7 }
7 function pa(b: any) {
7 return "[object Date]" === Da.call(b)
7 }
7 function G(b: any) {
7 return "function" === typeof b
7 }
7 function ob(b: any) {
47 return "[object RegExp]" === Da.call(b)
47 }
47 function Ua(b: any) {
47 return b && b.window === b
47 }
47 function Va(b: any) {
47 return b && b.$evalAsync && b.$watch
47 }
47 function Wa(b: any) {
47 return "boolean" === typeof b
47 }
47 function mc(b: any) {
47 return !(!b || !(b.nodeName || b.prop && b.attr && b.find))
47 }
47 function Gd(b: any) {
47 var a: any = {};
47 b = b.split(",");
47 var c;
47 for (c = 0; c < b.length; c++) a[b[c]] = !0;
47 return a
47 }
47 function ua(b: any) {
47 return Q(b.nodeName || b[0] && b[0].nodeName)
47 }
47 function Xa(b: any, a: any) {
47 var c = b.indexOf(a);
47 0 <= c && b.splice(c, 1);
47 return a
47 }
47 function Ea(b: any, a: any, c: any, d: any) {
47 if (Ua(b) || Va(b)) throw Ka("cpws");
47 if (a) {
47 if (b === a) throw Ka("cpi");
47 c = c || [];
47 d = d || [];
47 if (H(b)) {
47 var e = c.indexOf(b);
47 if (-1 !== e) return d[e];
47 c.push(b);
47 d.push(a)
47 }
47 if (x(b)) for (var f = a.length = 0; f < b.length; f++) e = Ea(b[f], null, c, d), H(b[f]) && (c.push(b[f]), d.push(e)), a.push(e);
47 else {
47 var g = a.$$hashKey;
47 x(a) ? a.length =
47 0 : s(a, function(b: any, c: any) {
47 delete a[c]
47 });
47 for (f in b) b.hasOwnProperty(f) && (e = Ea(b[f], null, c, d), H(b[f]) && (c.push(b[f]), d.push(e)), a[f] = e);
47 lc(a, g)
47 }
47 } else if (a = b) x(b) ? a = Ea(b, [], c, d) : pa(b) ? a = new Date(b.getTime()) : ob(b) ? (a = new RegExp(b.source, b.toString().match(/[^\/]*$/)[0]), a.lastIndex = b.lastIndex) : H(b) && (e = Object.create(Object.getPrototypeOf(b)), a = Ea(b, e, c, d));
47 return a
47 }
47 function qa(b: any, a: any) {
47 if (x(b)) {
47 a = a || [];
47 for (var c = 0, d = b.length; c < d; c++) a[c] = b[c]
47 } else if (H(b)) for (c in a = a || {}, b) if ("$" !== c.charAt(0) || "$" !== c.charAt(1)) a[c] =
47 b[c];
47 return a || b
47 }
47 function fa(b: any, a: any) {
47 if (b === a) return !0;
47 if (null === b || null === a) return !1;
47 if (b !== b && a !== a) return !0;
47 var c = typeof b, d;
47 if (c == typeof a && "object" == c) if (x(b)) {
47 if (!x(a)) return !1;
47 if ((c = b.length) == a.length) {
47 for (d = 0; d < c; d++) if (!fa(b[d], a[d])) return !1;
47 return !0
47 }
47 } else {
47 if (pa(b)) return pa(a) ? fa(b.getTime(), a.getTime()) : !1;
47 if (ob(b) && ob(a)) return b.toString() == a.toString();
47 if (Va(b) || Va(a) || Ua(b) || Ua(a) || x(a)) return !1;
47 c = {};
47 for (d in b) if ("$" !== d.charAt(0) && !G(b[d])) {
47 if (!fa(b[d], a[d])) return !1;
47 c[d] = !0
47 }
47 for (d in a) if (!c.hasOwnProperty(d) &&
47 "$" !== d.charAt(0) && a[d] !== t && !G(a[d])) return !1;
47 return !0
47 }
47 return !1
47 }
47 function Ya(b: any, a: any, c: any) {
47 return b.concat(Za.call(a, c))
47 }
47 function nc(b: any, a: any) {
47 var c = 2 < arguments.length ? Za.call(arguments, 2) : [];
47 return !G(a) || a instanceof RegExp ? a : c.length ? function() {
47 return arguments.length ? a.apply(b, Ya(c, arguments, 0)) : a.apply(b, c)
47 } : function() {
47 return arguments.length ? a.apply(b, arguments) : a.call(b)
47 }
47 }
47 function Hd(b: any, a: any) {
47 var c = a;
47 "string" === typeof b && "$" === b.charAt(0) && "$" === b.charAt(1) ? c = t : Ua(a) ? c = "$WINDOW" : a && Y === a ? c = "$DOCUMENT" : Va(a) &&
47 (c = "$SCOPE");
47 return c
47 }
47 function $a(b: any, a: any) {
47 if ("undefined" === typeof b) return t;
47 V(a) || (a = a ? 2 : null);
47 return JSON.stringify(b, Hd, a)
47 }
47 function oc(b: any) {
47 return F(b) ? JSON.parse(b) : b
47 }
47 function va(b: any) {
47 b = B(b).clone();
47 try {
47 b.empty()
47 } catch (a) {}
47 var c = B("<div>").append(b).html();
47 try {
47 return b[0].nodeType === pb ? Q(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
47 return "<" + Q(b)
47 })
47 } catch (d) {
47 return Q(c)
47 }
47 }
47 function pc(b: any) {
47 try {
47 return decodeURIComponent(b)
47 } catch (a) {}
47 }
47 function qc(b: any) {
47 var a: any = {}, c, d;
47 s((b || "").split("&"), function(b: any) {
47 b &&
47 (c = b.replace(/\+/g, "%20").split("="), d = pc(c[0]), y(d) && (b = y(c[1]) ? pc(c[1]) : !0, rc.call(a, d) ? x(a[d]) ? a[d].push(b) : a[d] = [a[d], b] : a[d] = b))
47 });
47 return a
47 }
47 function Nb(b: any) {
47 var a: any = [];
47 s(b, function(b: any, d: any) {
47 x(b) ? s(b, function(b: any) {
47 a.push(Fa(d, !0) + (!0 === b ? "" : "=" + Fa(b, !0)))
47 }) : a.push(Fa(d, !0) + (!0 === b ? "" : "=" + Fa(b, !0)))
47 });
47 return a.length ? a.join("&") : ""
47 }
47 function qb(b: any) {
47 return Fa(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
47 }
47 function Fa(b: any, a: any) {
47 return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi,
47 ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, a ? "%20" : "+")
47 }
47 function Id(b: any, a: any) {
47 var c, d, e = rb.length;
47 b = B(b);
47 for (d = 0; d < e; ++d) if (c = rb[d] + a, F(c = b.attr(c))) return c;
47 return null
47 }
47 function Jd(b: any, a: any) {
47 var c, d, e: any = {};
47 s(rb, function(a: any) {
47 a += "app";
47 !c && b.hasAttribute && b.hasAttribute(a) && (c = b, d = b.getAttribute(a))
47 });
47 s(rb, function(a: any) {
47 a += "app";
47 var e;
47 !c && (e = b.querySelector("[" + a.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(a))
47 });
47 c && (e.strictDi = null !== Id(c, "strict-di"), a(c, d ? [d] : [], e))
47 }
47 function sc(b: any,
47 a: any, c: any) {
47 H(c) || (c = {});
47 c = z({ strictDi: !1 }, c);
47 var d = function() {
47 b = B(b);
47 if (b.injector()) {
47 var d = b[0] === Y ? "document" : va(b);
47 throw Ka("btstrpd", d.replace(/</, "&lt;").replace(/>/, "&gt;"));
47 }
47 a = a || [];
47 a.unshift(["$provide", function(a: any) {
47 a.value("$rootElement", b)
47 }]);
47 c.debugInfoEnabled && a.push(["$compileProvider", function(a: any) {
47 a.debugInfoEnabled(!0)
47 }]);
47 a.unshift("ng");
47 d = Ob(a, c.strictDi);
47 d.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(a: any, b: any, c: any, d: any) {
47 a.$apply(function() {
47 b.data("$injector", d);
47 c(b)(a)
47 })
47 }]);
47 return d
47 },
47 e = /^NG_ENABLE_DEBUG_INFO!/, f = /^NG_DEFER_BOOTSTRAP!/;
47 M && e.test(M.name) && (c.debugInfoEnabled = !0, M.name = M.name.replace(e, ""));
47 if (M && !f.test(M.name)) return d();
47 M.name = M.name.replace(f, "");
47 ga.resumeBootstrap = function(b: any) {
47 s(b, function(b: any) {
47 a.push(b)
47 });
47 d()
47 }
47 }
47 function Kd() {
47 M.name = "NG_ENABLE_DEBUG_INFO!" + M.name;
47 M.location.reload()
47 }
47 function Ld(b: any) {
47 b = ga.element(b).injector();
47 if (!b) throw Ka("test");
47 return b.get("$$testability")
47 }
47 function tc(b: any, a: any) {
47 a = a || "_";
47 return b.replace(Md, function(b: any, d: any) {
47 return (d ? a : "") + b.toLowerCase()
47 })
47 }
47 function Nd() {
47 var b;
47 uc || ((ra = M.jQuery) && ra.fn.on ? (B = ra, z(ra.fn, { scope: La.scope, isolateScope: La.isolateScope, controller: La.controller, injector: La.injector, inheritedData: La.inheritedData }), b = ra.cleanData, ra.cleanData = function(a: any) {
47 var c;
47 if (Pb) Pb = !1;
47 else for (var d = 0, e; null != (e = a[d]); d++) (c = ra._data(e, "events")) && c.$destroy && ra(e).triggerHandler("$destroy");
47 b(a)
47 }) : B = R, ga.element = B, uc = !0)
47 }
47 function Qb(b: any, a: any, c: any) {
47 if (!b) throw Ka("areq", a || "?", c || "required");
47 return b
47 }
47 function sb(b: any, a: any, c: any) {
47 c && x(b)343847 ? (a = b.length - 1, sb(b[a], "fn"), d = b.slice(0, a))
47 : sb(b, "fn", !0);
47 return d
47 }
47 function Ma(b: any, a: any) {
47 if ("hasOwnProperty" === b) throw Ka("badname", a);
47 }
47 function vc(b: any, a: any, c: any) {
47 if (!a) return b;
47 a = a.split(".");
47 for (var d, e = b, f = a.length, g = 0; g < f; g++) d = a[g], b && (b = (e = b)[d]);
47 return !c && G(b) ? nc(e, b) : b
47 }
47 function tb(b: any) {
47 var a = b[0];
47 b = b[b.length - 1];
47 var c = [a];
47 do {
47 a = a.nextSibling;
47 if (!a) break;
47 c.push(a)
47 } while (a !== b);
47 return B(c)
47 }
47 function ha() {
47 return Object.create(null)
47 }
47 function Od(b: any) {
47 function a(a: any, b: any, c: any) {
47 return a[b] || (a[b] = c())
47 }
47 var c = T("$injector"), d = T("ng");
47 b = a(b, "angular", Object);
47 b.$$minErr = b.$$minErr || T;
47 return a(b, "module", function() {
47 var b: any = {};
47 return function(f: any, g: any, h: any) {
47 if ("hasOwnProperty" === f) throw d("badname", f);
47 g && b.hasOwnProperty(f) && (b[f] = null);
47 return a(b, f, function() {
47 function a(c: any, d: any, e: any, f: any) {
47 f || (f = b);
47 return function() {
47 f[e || "push"]([c, d, arguments]);
47 return u
47 }
47 }
47 if (!g) throw c("nomod", f);
47 var b: any = [], d: any = [], e: any = [], q = a("$injector", "invoke", "push", d), u = {
47 _invokeQueue: b,
47 _configBlocks: d,
47 _runBlocks: e,
47 requires: g,
47 name: f,
47 provider: a("$provide", "provider"),
47 factory: a("$provide", "factory"),
47 service: a("$provide", "service"),
47 value: a("$provide", "value"),
47 constant: a("$provide", "constant", "unshift"),
47 animation: a("$animateProvider", "register"),
47 filter: a("$filterProvider", "register"),
47 controller: a("$controllerProvider", "register"),
47 directive: a("$compileProvider", "directive"),
47 config: q,
47 run: function(a: any) {
47 e.push(a);
47 return this
47 }
47 };
47 h && q(h);
47 return u
47 })
47 }
47 })
47 }
47 function Pd(b: any) {
47 z(b, {
47 bootstrap: sc,
47 copy: Ea,
47 extend: z,
47 equals: fa,
47 element: B,
47 forEach: s,
47 injector: Ob,
47 noop: C,
47 bind: nc,
47 toJson: $a,
47 fromJson: oc,
47 identity: oa,
47 isUndefined: D,
47 isDefined: y,
47 isString: F,
47 isFunction: G,
47 isObject: H,
47 isNumber: V,
47 isElement: mc,
47 isArray: x,
47 version: Qd,
47 isDate: pa,
47 lowercase: Q,
47 uppercase: ub,
47 callbacks: { counter: 0 },
47 getTestability: Ld,
47 $$minErr: T,
47 $$csp: ab,
47 reloadWithDebugInfo: Kd
47 });
47 bb = Od(M);
47 try {
47 bb("ngLocale")
47 } catch (a) {
47 bb("ngLocale", []).provider("$locale", Rd)
47 }
47 bb("ng", ["ngLocale"], ["$provide", function(a: any) {
47 a.provider({ $$sanitizeUri: Sd });
47 a.provider("$compile", wc).directive({ a: Td, input: xc, textarea: xc, form: Ud, script: Vd, select: Wd, style: Xd, option: Yd, ngBind: Zd, ngBindHtml: $d, ngBindTemplate: ae, ngClass: be, ngClassEven: ce, ngClassOdd: de, ngCloak: ee, ngController: fe, ngForm: ge, ngHide: he, ngIf: ie, ngInclude: je, ngInit: ke, ngNonBindable: le, ngPluralize: me, ngRepeat: ne, ngShow: oe, ngStyle: pe, ngSwitch: qe, ngSwitchWhen: re, ngSwitchDefault: se, ngOptions: te, ngTransclude: ue, ngModel: ve, ngList: we, ngChange: xe, pattern: yc, ngPattern: yc, required: zc, ngRequired: zc, minlength: Ac, ngMinlength: Ac, maxlength: Bc, ngMaxlength: Bc, ngValue: ye, ngModelOptions: ze }).directive({ ngInclude: Ae }).directive(vb).directive(Cc);
47 a.provider({ $anchorScroll: Be, $animate: Ce, $browser: De, $cacheFactory: Ee, $controller: Fe, $document: Ge, $exceptionHandler: He, $filter: Dc, $interpolate: Ie, $interval: Je, $http: Ke, $httpBackend: Le, $location: Me, $log: Ne, $parse: Oe, $rootScope: Pe, $q: Qe, $$q: Re, $sce: Se, $sceDelegate: Te, $sniffer: Ue, $templateCache: Ve, $templateRequest: We, $$testability: Xe, $timeout: Ye, $window: Ze, $$rAF: $e, $$asyncCallback: af, $$jqLite: bf })
47 }])
47 }
47 function cb(b: any) {
47 return b.replace(cf, function(a: any, b: any, d: any, e: any) {
47 return e ? d.toUpperCase() : d
47 }).replace(df, "Moz$1")
47 }
47 function Ec(b: any) {
47 b = b.nodeType;
47 return b === na || !b || 9 === b
47 }
47 function Fc(b: any, a: any) {
47 var c, d, e = a.createDocumentFragment(), f: any = [];
47 if (Rb.test(b)) {
47 c = c || e.appendChild(a.createElement("div"));
47 d = (ef.exec(b) || ["", ""])[1].toLowerCase();
47 d = ia[d] || ia._default;
47 c.innerHTML = d[1] + b.replace(ff, "<$1></$2>") + d[2];
47 for (d = d[0]; d--;) c = c.lastChild;
47 f = Ya(f, c.childNodes);
47 c = e.firstChild;
47 c.textContent = ""
47 } else f.push(a.createTextNode(b));
47 e.textContent = "";
47 e.innerHTML = "";
47 s(f, function(a: any) {
47 e.appendChild(a)
47 });
47 return e
47 }
47 function R(b: any) {
47 if (b instanceof R) return b;
47 var a;
47 F(b) && (b = U(b), a = !0);
47 if (!(this instanceof R)) {
47 if (a && "<" != b.charAt(0)) throw Sb("nosel");
47 return new R(b)
47 }
47 if (a) {
47 a = Y;
47 var c;
47 b = (c = gf.exec(b)) ? [a.createElement(c[1])] : (c = Fc(b, a)) ? c.childNodes : []
47 }
47 Gc(this, b)
47 }
47 function Tb(b: any) {
47 return b.cloneNode(!0)
47 }
47 function wb(b: any, a: any) {
47 a || xb(b);
47 if (b.querySelectorAll) for (var c = b.querySelectorAll("*"), d = 0, e = c.length; d < e; d++) xb(c[d])
47 }
47 function Hc(b: any, a: any, c: any, d: any) {
47 if (y(d)) throw Sb("offargs");
47 var e = (d = yb(b)) && d.events, f = d && d.handle;
47 if (f) if (a) s(a.split(" "), function(a: any) {
47 if (y(c)) {
47 var d = e[a];
47 Xa(d || [], c);
47 if (d && 0 < d.length) return
47 }
47 b.removeEventListener(a, f, !1);
47 delete e[a]
47 });
47 else for (a in e) "$destroy" !== a && b.removeEventListener(a, f, !1), delete e[a]
47 }
47 function xb(b: any, a: any) {
47 var c = b.ng339, d = c && zb[c];
47 d && (a ? delete d.data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), Hc(b)), delete zb[c], b.ng339 = t))
47 }
47 function yb(b: any, a: any) {
47 var c = b.ng339, c = c && zb[c];
47 a && !c && (b.ng339 = c = ++hf, c = zb[c] = { events: {}, data: {}, handle: t });
47 return c
47 }
47 function Ub(b: any, a: any, c: any) {
47 if (Ec(b)) {
47 var d = y(c), e = !d && a && !H(a), f = !a;
47 b = (b = yb(b, !e)) && b.data;
47 if (d) b[a] = c;
47 else {
47 if (f) return b;
47 if (e) return b && b[a];
47 z(b, a)
47 }
47 }
47 }
47 function Ab(b: any, a: any) {
47 return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1
47 }
47 function Bb(b: any, a: any) {
47 a && b.setAttribute && s(a.split(" "), function(a: any) {
47 b.setAttribute("class", U((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + U(a) + " ", " ")))
47 })
47 }
47 function Cb(b: any, a: any) {
47 if (a && b.setAttribute) {
47 var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
47 s(a.split(" "), function(a: any) {
47 a = U(a);
47 -1 === c.indexOf(" " + a + " ") && (c += a + " ")
47 });
47 b.setAttribute("class", U(c))
47 }
47 }
47 function Gc(b: any, a: any) {
47 if (a) if (a.nodeType) b[b.length++] = a;
47 else {
47 var c = a.length;
47 if ("number" === typeof c && a.window !== a) {
47 if (c) for (var d = 0; d < c; d++) b[b.length++] = a[d]
47 } else b[b.length++] = a
47 }
47 }
47 function Ic(b: any, a: any) {
47 return Db(b, "$" + (a || "ngController") + "Controller")
47 }
47 function Db(b: any, a: any, c: any) {
47 9 == b.nodeType && (b = b.documentElement);
47 for (a = x(a) ? a : [a]; b;) {
47 for (var d = 0, e = a.length; d < e; d++) if ((c = B.data(b, a[d])) !== t) return c;
47 b = b.parentNode || 11 === b.nodeType && b.host
47 }
47 }
47 function Jc(b: any) {
47 for (wb(b, !0); b.firstChild;) b.removeChild(b.firstChild)
47 }
47 function Kc(b: any, a: any) {
47 a || wb(b);
47 var c = b.parentNode;
47 c && c.removeChild(b)
47 }
47 function jf(b: any, a: any) {
47 a = a || M;
47 if ("complete" === a.document.readyState) a.setTimeout(b);
47 else B(a).on("load", b)
47 }
47 function Lc(b: any, a: any) {
47 var c = Eb[a.toLowerCase()];
47 return c && Mc[ua(b)] && c
47 }
47 function kf(b: any, a: any) {
47 var c = b.nodeName;
47 return ("INPUT" === c || "TEXTAREA" === c) && Nc[a]
47 }
47 function lf(b: any, a: any) {
47 var c = function(c: any, e: any) {
47 c.isDefaultPrevented = function() {
47 return c.defaultPrevented
47 };
47 var f = a[e || c.type], g = f ? f.length : 0;
47 if (g) {
47 if (D(c.immediatePropagationStopped)) {
47 var h = c.stopImmediatePropagation;
47 c.stopImmediatePropagation = function() {
47 c.immediatePropagationStopped = !0;
47 c.stopPropagation && c.stopPropagation();
47 h && h.call(c)
47 }
47 }
47 c.isImmediatePropagationStopped = function() {
47 return !0 === c.immediatePropagationStopped
47 };
47 1 < g && (f = qa(f));
47 for (var l = 0; l < g; l++) c.isImmediatePropagationStopped() || f[l].call(b, c)
47 }
47 c.elem = b;
47 return c
47 }
47 function bf() {
47 this.$get = function() {
47 return z(R, {
47 hasClass: function(b: any, a: any) {
47 b.attr && (b = b[0]);
47 return Ab(b, a)
47 },
47 addClass: function(b: any, a: any) {
47 b.attr && (b = b[0]);
47 return Cb(b, a)
47 },
47 removeClass: function(b: any, a: any) {
47 b.attr && (b = b[0]);
47 return Bb(b, a)
47 }
47 })
47 }
47 }
47 function Na(b: any, a: any) {
47 var c = b && b.$$hashKey;
47 if (c) return "function" === typeof c && (c = b.$$hashKey()), c;
47 c = typeof b;
47 return c = "function" == c || "object" == c && null !== b ? b.$$hashKey = c + ":" + (a || Fd()) : c + ":" + b
47 }
47 function db(b: any, a: any) {
47 if (a) {
47 var c = 0;
47 this.nextUid = function() {
47 return ++c
47 }
47 }
47 s(b, this.put, this)
47 }
47 function mf(b: any) {
47 return (b = b.toString().replace(Oc, "").match(Pc)) ? "function(" + (b[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
47 }
47 function Vb(b: any, a: any, c: any) {
47 var d;
47 if ("function" === typeof b) {
47 if (!(d = b.$inject)) {
47 d = [];
47 if (b.length) {
47 if (a) throw F(c) && c || (c = b.name || mf(b)), Ga("strictdi", c);
47 a = b.toString().replace(Oc, "");
47 a = a.match(Pc);
47 s(a[1].split(nf), function(a: any) {
47 a.replace(of, function(a: any, b: any, c: any) {
47 d.push(c)
47 })
47 })
47 }
47 b.$inject = d
47 }
47 } else x(b) ? (a = b.length - 1, sb(b[a], "fn"), d = b.slice(0, a)) : sb(b, "fn", !0);
47 return d
47 }
47 function Ob(b: any, a: any) {
47 function c(a: any) {
47 return function(b: any, c: any) {
47 if (H(b)) s(b, kc(a));
47 else return a(b, c