/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(I, d, B) {
    'use strict';

    function D<T>(f: T, q: Partial<T> = {}): T {
        d.forEach(q, function(d, h) {
            delete q[h];
        });
        for (const h in f) {
            if (f.hasOwnProperty(h) && !("$" === h.charAt(0) && "$" === h.charAt(1))) {
                q[h] = f[h];
            }
        }
        return q as T;
    }

    const w = d.$$minErr("$resource");
    const C = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;

    d.module("ngResource", ["ng"]).provider("$resource", function() {
        const f = this;
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

        this.$get = ["$http", "$q", function($http, $q) {
            function t(d, g) {
                this.template = d;
                this.defaults = s({}, f.defaults, g);
                this.urlParams = {};
            }

            function v(x, g, l, m) {
                function c(b, k) {
                    const c = {};
                    k = s({}, g, k);
                    r(k, function(a, k) {
                        u(a) && (a = a());
                        let d;
                        if (a && a.charAt && "@" == a.charAt(0)) {
                            d = b;
                            const e = a.substr(1);
                            if (null == e || "" === e || "hasOwnProperty" === e || !C.test("." + e)) throw w("badmember", e);
                            const eArr = e.split(".");
                            for (let n = 0, g = eArr.length; n < g && d !== B; n++) {
                                const h = eArr[n];
                                d = null !== d ? d[h] : B;
                            }
                        } else {
                            d = a;
                        }
                        c[k] = d;
                    });
                    return c;
                }

                function F(b) {
                    return b.resource;
                }

                function e(b) {
                    D(b || {}, this);
                }

                const G = new t(x, m);
                l = s({}, f.defaults.actions, l);

                e.prototype.toJSON = function() {
                    const b = s({}, this);
                    delete b.$promise;
                    delete b.$resolved;
                    return b;
                };

                r(l, function(b, k) {
                    const g = /^(POST|PUT|PATCH)$/i.test(b.method);
                    e[k] = function(a, y, m, x) {
                        let n = {}, f, l, z;
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
                                u(a) ? l = a : g ? f = a : n = a;
                                break;
                            case 0:
                                break;
                            default:
                                throw w("badargs", arguments.length);
                        }

                        const t = this instanceof e;
                        const p = t ? f : b.isArray ? [] : new e(f);
                        const A = {};
                        const v = b.interceptor && b.interceptor.response || F;
                        const C = b.interceptor && b.interceptor.responseError || B;

                        r(b, function(b, a) {
                            if ("params" != a && "isArray" != a && "interceptor" != a) {
                                A[a] = H(b);
                            }
                        });

                        if (g) {
                            A.data = f;
                        }

                        G.setUrlParams(A, s({}, c(f, b.params || {}), n), b.url);

                        n = $http(A).then(function(a) {
                            const c = a.data;
                            const g = p.$promise;
                            if (c) {
                                if (d.isArray(c) !== !!b.isArray) throw w("badcfg", k, b.isArray ? "array" : "object", d.isArray(c) ? "array" : "object");
                                if (b.isArray) {
                                    p.length = 0;
                                    r(c, function(a) {
                                        "object" === typeof a ? p.push(new e(a)) : p.push(a);
                                    });
                                } else {
                                    D(c, p);
                                    p.$promise = g;
                                }
                            }
                            p.$resolved = true;
                            a.resource = p;
                            return a;
                        }, function(a) {
                            p.$resolved = true;
                            (z || E)(a);
                            return $q.reject(a);
                        });

                        n = n.then(function(a) {
                            const b = v(a);
                            (l || E)(b, a.headers);
                            return b;
                        }, C);

                        return t ? n : (p.$promise = n, p.$resolved = false, p);
                    };

                    e.prototype["$" + k] = function(a, b, c) {
                        u(a) && (c = b, b = a, a = {});
                        a = e[k].call(this, a, this, b, c);
                        return a.$promise || a;
                    };
                });

                e.bind = function(b) {
                    return v(x, s({}, g, b), l);
                };

                return e;
            }

            const E = d.noop;
            const r = d.forEach;
            const s = d.extend;
            const H = d.copy;
            const u = d.isFunction;

            t.prototype = {
                setUrlParams: function(f, g, l) {
                    const m = this;
                    const c = l || m.template;
                    let h, e;
                    const q = m.urlParams = {};

                    r(c.split(/\W/), function(b) {
                        if ("hasOwnProperty" === b) throw w("badname");
                        if (!/^\d+$/.test(b) && b && (new RegExp("(^|[^\\\\]):" + b + "(\\W|$)")).test(c)) {
                            q[b] = true;
                        }
                    });

                    c = c.replace(/\\:/g, ":");
                    g = g || {};

                    r(m.urlParams, function(b, k) {
                        h = g.hasOwnProperty(k) ? g[k] : m.defaults[k];
                        if (d.isDefined(h) && null !== h) {
                            e = encodeURIComponent(h).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "%20").replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
                            c = c.replace(new RegExp(":" + k + "(\\W|$)", "g"), function(b, a) {
                                return e + a;
                            });
                        } else {
                            c = c.replace(new RegExp("(/?):" + k + "(\\W|$)", "g"), function(b, a, c) {
                                return "/" == c.charAt(0) ? c : a + c;
                            });
                        }
                    });

                    m.defaults.stripTrailingSlashes && (c = c.replace(/\/+$/, "") || "/");
                    c = c.replace(/\/\.(?=\w+($|\?))/, ".");
                    f.url = c.replace(/\/\\\./, "/.");
                    r(g, function(b, c) {
                        m.urlParams[c] || (f.params = f.params || {}, f.params[c] = b);
                    });
                }
            };

            return v;
        }];
    });
})(window, window.angular);