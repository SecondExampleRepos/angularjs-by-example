/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(I: Window, d: any, B: any): void {
    'use strict';
    type Resource = { [key: string]: any };
    type Action = { method: string, isArray?: boolean };
    type Actions = { [action: string]: Action };
    type Params = { [key: string]: any };

    function D(f: Resource, q: Resource = {}): Resource {
        Object.keys(q).forEach((key: string) => { delete q[key]; });
        Object.keys(f).forEach((h: string) => {
            if (!f.hasOwnProperty(h) || h.charAt(0) === "$" && h.charAt(1) === "$") return;
            q[h] = f[h];
        });
        return q;
    }

    const w = d.$$minErr("$resource");
    const C = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;

    d.module("ngResource", ["ng"]).provider("$resource", function() {
        var f = this;
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
            function t(template: string, defaults: any): void {
                this.template = template;
                this.defaults = { ...f.defaults, ...defaults };
                this.urlParams = {};
            }

            function v(x: string, g: any, l: Actions, m: any): any {
                function c(b: any, k: Params): Params {
                    const c: Params = {};
                    const kExtended = { ...g, ...k };
                    Object.keys(kExtended).forEach((key: string) => {
                        let a = kExtended[key];
                        if (typeof a === "function") a = a();
                        let d;
                        if (a && typeof a === "string" && a.charAt(0) === "@") {
                            d = b;
                            let e = a.substr(1);
                            if (e === null || e === "" || e === "hasOwnProperty" || !C.test("." + e)) {
                                throw w("badmember", e);
                            }
                            const eParts = e.split(".");
                            eParts.forEach((part: string) => {
                                d = d !== null ? d[part] : B;
                            });
                        } else {
                            d = a;
                        }
                        c[key] = d;
                    });
                    return c;
                }

                function F(b: any): any {
                    return b.resource;
                }

                function e(b: Resource = {}): void {
                    D(b, this);
                }

                const G = new t(x, m);
                l = { ...f.defaults.actions, ...l };
                e.prototype.toJSON = function(): Resource {
                    const b = { ...this };
                    delete b.$promise;
                    delete b.$resolved;
                    return b;
                };

                Object.keys(l).forEach((k: string) => {
                    const b = l[k];
                    const g = /^(POST|PUT|PATCH)$/i.test(b.method);
                    e[k] = function(a: any, y: any, m: any, x: any): any {
                        let n: Params = {}, f: any, l: any, z: any;
                        switch (arguments.length) {
                            case 4:
                                z = x;
                                l = m;
                            case 3:
                            case 2:
                                if (typeof y === "function") {
                                    if (typeof a === "function") {
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
                                if (typeof a === "function") {
                                    l = a;
                                } else if (g) {
                                    f = a;
                                } else {
                                    n = a;
                                }
                                break;
                            case 0:
                                break;
                            default:
                                throw w("badargs", arguments.length);
                        }
                        const t = this instanceof e;
                        const p = t ? f : b.isArray ? [] : new e(f);
                        const A: any = {};
                        const v = b.interceptor && b.interceptor.response || F;
                        const C = b.interceptor && b.interceptor.responseError || B;
                        Object.keys(b).forEach((key: string) => {
                            if (key !== "params" && key !== "isArray" && key !== "interceptor") {
                                A[key] = b[key];
                            }
                        });
                        if (g) {
                            A.data = f;
                        }
                        G.setUrlParams(A, { ...c(f, b.params || {}), ...n }, b.url);
                        let nPromise = q(A).then((a: any) => {
                            const c = a.data;
                            const g = p.$promise;
                            if (c) {
                                if (Array.isArray(c) !== !!b.isArray) {
                                    throw w("badcfg", k, b.isArray ? "array" : "object", Array.isArray(c) ? "array" : "object");
                                }
                                if (b.isArray) {
                                    p.length = 0;
                                    c.forEach((item: any) => {
                                        if (typeof item === "object") {
                                            p.push(new e(item));
                                        } else {
                                            p.push(item);
                                        }
                                    });
                                } else {
                                    D(c, p);
                                    p.$promise = g;
                                }
                            }
                            p.$resolved = true;
                            a.resource = p;
                            return a;
                        }, (a: any) => {
                            p.$resolved = true;
                            (z || (() => {}))(a);
                            return h.reject(a);
                        });
                        nPromise = nPromise.then((a: any) => {
                            const b = v(a);
                            (l || (() => {}))(b, a.headers);
                            return b;
                        }, C);
                        return t ? nPromise : (p.$promise = nPromise, p.$resolved = false, p);
                    };
                });
                e.prototype["$" + k] = function(a: any, b: any, c: any): any {
                    if (typeof a === "function") {
                        c = b;
                        b = a;
                        a = {};
                    }
                    a = e[k].call(this, a, this, b, c);
                    return a.$promise || a;
                };
                return e;
            }
            const E = d.noop;
            const r = d.forEach;
            const s = d.extend;
            const H = d.copy;
            const u = d.isFunction;
            t.prototype = {
                setUrlParams: function(f: Params, g: Params, l: string): void {
                    const m = this;
                    let c = l || m.template;
                    let h: any, e: string;
                    const q: Params = m.urlParams = {};
                    c.split(/\W/).forEach((b: string) => {
                        if (b === "hasOwnProperty") throw w("badname");
                        if (!/^\d+$/.test(b) && b && new RegExp("(^|[^\\\\]):" + b + "(\\W|$)").test(c)) {
                            q[b] = true;
                        }
                    });
                    c = c.replace(/\\:/g, ":");
                    g = g || {};
                    Object.keys(m.urlParams).forEach((k: string) => {
                        h = g.hasOwnProperty(k) ? g[k] : m.defaults[k];
                        if (d.isDefined(h) && h !== null) {
                            e = encodeURIComponent(h).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "%20").replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
                            c = c.replace(new RegExp(":" + k + "(\\W|$)", "g"), (b: string, a: string) => e + a);
                        } else {
                            c = c.replace(new RegExp("(/?):" + k + "(\\W|$)", "g"), (b: string, a: string, c: string) => c.charAt(0) === "/" ? c : a + c);
                        }
                    });
                    m.defaults.stripTrailingSlashes && (c = c.replace(/\/+$/, "") || "/");
                    c = c.replace(/\/\.(?=\w+($|\?))/, ".");
                    f.url = c.replace(/\/\\\./, "/.");
                    Object.keys(g).forEach((b: string) => {
                        if (!m.urlParams[b]) {
                            f.params = f.params || {};
                            f.params[b] = g[b];
                        }
                    });
                }
            };
            return v;
        }]);
    })(window, window.angular);
