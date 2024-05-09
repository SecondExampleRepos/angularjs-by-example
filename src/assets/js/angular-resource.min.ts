/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(I: Window, d: any, B: any): void {
    'use strict';
    function D(f: any, q: any = {}): any {
        d.forEach(q, function(d: any, h: string): void {
            delete q[h];
        });
        for (var h in f) {
            if (!f.hasOwnProperty(h) || "$" === h.charAt(0) && "$" === h.charAt(1)) continue;
            q[h] = f[h];
        }
        return q;
    }
    var w: any = d.$$minErr("$resource"),
        C: RegExp = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
    d.module("ngResource", ["ng"]).provider("$resource", function(): void {
        var f: any = this;
        this.defaults = {
            stripTrailingSlashes: true,
            actions: {
                get: { method: "GET" },
                save: { method: "POST" },
                query: { method: "GET", isArray: true },
                remove: { method: "DELETE" },
                "delete": { method: "DELETE" }
            }
        };
        this.$get = ["$http", "$q", function(q: any, h: any): any {
            function t(d: any, g: any): void {
                this.template = d;
                this.defaults = s({}, f.defaults, g);
                this.urlParams = {};
            }
            function v(x: any, g: any, l: any, m: any): any {
                function c(b: any, k: any): any {
                    var c: any = {};
                    k = s({}, g, k);
                    r(k, function(a: any, k: string): void {
                        if (u(a)) a = a();
                        var d: any;
                        if (a && a.charAt && "@" == a.charAt(0)) {
                            d = b;
                            var e: string = a.substr(1);
                            if (null == e || "" === e || "hasOwnProperty" === e || !C.test("." + e)) throw w("badmember", e);
                            for (var e = e.split("."), n = 0, g = e.length; n < g && d !== B; n++) {
                                var h = e[n];
                                d = null !== d ? d[h] : B;
                            }
                        } else d = a;
                        c[k] = d;
                    });
                    return c;
                }
                function F(b: any): any {
                    return b.resource;
                }
                function e(b: any): void {
                    D(b || {}, this);
                }
                var G: any = new t(x, m);
                l = s({}, f.defaults.actions, l);
                e.prototype.toJSON = function(): any {
                    var b: any = s({}, this);
                    delete b.$promise;
                    delete b.$resolved;
                    return b;
                };
                r(l, function(b: any, k: string): void {
                    var g: boolean = /^(POST|PUT|PATCH)$/i.test(b.method);
                    e[k] = function(a: any, y: any, m: any, x: any): any {
                        var n: any = {},
                            f: any,
                            l: any,
                            z: any;
                        switch (arguments.length) {
                            case 4:
                                z = x;
                                l = m;
                            case 3:
                            case 2:
                                if (u(y)) {
                                    if (u(a)) {
                                        l = a;
                                        z = y;
                                        break;
                                    }
                                    l = y;
                                    z = m;
                                } else {
                                    n = a;
                                    f = y;
                                    l = m;
                                    break;
                                }
                            case 1:
                                if (u(a)) l = a;
                                else if (g) f = a;
                                else n = a;
                                break;
                            case 0:
                                break;
                            default:
                                throw w("badargs", arguments.length);
                        }
                        var t: boolean = this instanceof e,
                            p: any = t ? f : b.isArray ? [] : new e(f),
                            A: any = {},
                            v: any = b.interceptor && b.interceptor.response || F,
                            C: any = b.interceptor && b.interceptor.responseError || B;
                        r(b, function(b: any, a: string): void {
                            if ("params" != a && "isArray" != a && "interceptor" != a) {
                                A[a] = H(b);
                            }
                        });
                        if (g) A.data = f;
                        G.setUrlParams(A, s({}, c(f, b.params || {}), n), b.url);
                        var n: any = q(A).then(function(a: any): any {
                            var c: any = a.data,
                                g: any = p.$promise;
                            if (c) {
                                if (d.isArray(c) !== !!b.isArray) throw w("badcfg", k, b.isArray ? "array" : "object", d.isArray(c) ? "array" : "object");
                                if (b.isArray) {
                                    p.length = 0;
                                    r(c, function(a: any): void {
                                        if (typeof a === "object") p.push(new e(a));
                                        else p.push(a);
                                    });
                                } else {
                                    D(c, p);
                                    p.$promise = g;
                                }
                            }
                            p.$resolved = true;
                            a.resource = p;
                            return a;
                        }, function(a: any): any {
                            p.$resolved = true;
                            (z || E)(a);
                            return h.reject(a);
                        });
                        n = n.then(function(a: any): any {
                            var b: any = v(a);
                            (l || E)(b, a.headers);
                            return b;
                        }, C);
                        return t ? n : (p.$promise = n, p.$resolved = false, p);
                    };
                    e.prototype["$" + k] = function(a: any, b: any, c: any): any {
                        if (u(a)) (c = b, b = a, a = {});
                        a = e[k].call(this, a, this, b, c);
                        return a.$promise || a;
                    };
                });
                e.bind = function(b: any): any {
                    return v(x, s({}, g, b), l);
                };
                return e;
            }
            var E: any = d.noop,
                r: any = d.forEach,
                s: any = d.extend,
                H: any = d.copy,
                u: any = d.isFunction;
            t.prototype = {
                setUrlParams: function(f: any, g: any, l: string): void {
                    var m: any = this,
                        c: string = l || m.template,
                        h: any,
                        e: any,
                        q: any = m.urlParams = {};
                    r(c.split(/\W/), function(b: string): void {
                        if ("hasOwnProperty" === b) throw w("badname");
                        if (!/^\d+$/.test(b) && b && (new RegExp("(^|[^\\\\]):" + b + "(\\W|$)")).test(c)) {
                            q[b] = true;
                        }
                    });
                    c = c.replace(/\\:/g, ":");
                    g = g || {};
                    r(m.urlParams, function(b: any, k: string): void {
                        h = g.hasOwnProperty(k) ? g[k] : m.defaults[k];
                        if (d.isDefined(h) && null !== h) {
                            e = encodeURIComponent(h).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "%20").replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
                            c = c.replace(new RegExp(":" + k + "(\\W|$)", "g"), function(b: string, a: string): string {
                                return e + a;
                            });
                        } else {
                            c = c.replace(new RegExp("(/?):" + k + "(\\W|$)", "g"), function(b: string, a: string, c: string): string {
                                return "/" == c.charAt(0) ? c : a + c;
                            });
                        }
                    });
                    m.defaults.stripTrailingSlashes && (c = c.replace(/\/+$/, "") || "/");
                    c = c.replace(/\/\.(?=\w+($|\?))/, ".");
                    f.url = c.replace(/\/\\\./, "/.");
                    r(g, function(b: any, c: string): void {
                        if (!m.urlParams[c]) {
                            f.params = f.params || {};
                            f.params[c] = b;
                        }
                    });
                }
            };
            return v;
        }]);
    })(window, window.angular);
