/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p: any, d: any, C: any) {
    'use strict';

    interface Route {
        originalPath: string;
        regexp: RegExp;
        keys: Array<{ name: string; optional: boolean }>;
        caseInsensitiveMatch?: boolean;
        reloadOnSearch?: boolean;
        redirectTo?: string | ((params: any, path: string, search: any) => string);
        resolve?: { [key: string]: any };
        template?: string | ((params: any) => string);
        templateUrl?: string | ((params: any) => string);
        controller?: string | Function;
        controllerAs?: string;
        locals?: any;
        loadedTemplateUrl?: string;
    }

    interface CurrentRoute extends Route {
        params: any;
        pathParams: any;
        $$route: Route;
    }

    function v($route: any, $anchorScroll: any, $animate: any) {
        return {
            restrict: "ECA",
            terminal: true,
            priority: 400,
            transclude: "element",
            link: function(a: any, c: any, b: any, f: any, y: any) {
                function z() {
                    if (k) {
                        $animate.cancel(k);
                        k = null;
                    }
                    if (l) {
                        l.$destroy();
                        l = null;
                    }
                    if (m) {
                        k = $animate.leave(m);
                        k.then(function() {
                            k = null;
                        });
                        m = null;
                    }
                }

                function x() {
                    const b = $route.current && $route.current.locals;
                    if (d.isDefined(b && b.$template)) {
                        const b = a.$new();
                        const f = $route.current;
                        m = y(b, function(b: any) {
                            $animate.enter(b, null, m || c).then(function() {
                                if (!d.isDefined(t) || (t && !a.$eval(t))) {
                                    $anchorScroll();
                                }
                            });
                            z();
                        });
                        l = f.scope = b;
                        l.$emit("$viewContentLoaded");
                        l.$eval(w);
                    } else {
                        z();
                    }
                }

                let l: any, m: any, k: any, t = b.autoscroll, w = b.onload || "";
                a.$on("$routeChangeSuccess", x);
                x();
            }
        };
    }

    function A($compile: any, $controller: any, $route: any) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(a: any, c: any) {
                const b = $route.current;
                const f = b.locals;
                c.html(f.$template);
                const y = $compile(c.contents());
                if (b.controller) {
                    f.$scope = a;
                    const controller = $controller(b.controller, f);
                    if (b.controllerAs) {
                        a[b.controllerAs] = controller;
                    }
                    c.data("$ngControllerController", controller);
                    c.children().data("$ngControllerController", controller);
                }
                y(a);
            }
        };
    }

    p = d.module("ngRoute", ["ng"]).provider("$route", function() {
        function r(a: any, c: any) {
            return d.extend(Object.create(a), c);
        }

        function h(a: string, d: any) {
            const b = d.caseInsensitiveMatch;
            const f: Route = { originalPath: a, regexp: a, keys: [] };
            const g = f.keys;
            a = a.replace(/([().])/g, "\\$1")
                .replace(/(\/)?:(\w+)([\?\*])?/g, function(a: any, d: any, b: any, c: any) {
                    a = "?" === c ? c : null;
                    c = "*" === c ? c : null;
                    g.push({ name: b, optional: !!a });
                    d = d || "";
                    return "" + (a ? "" : d) + "(?:" + (a ? d : "") + (c && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "");
                })
                .replace(/([\/$\*])/g, "\\$1");
            f.regexp = new RegExp("^" + a + "$", b ? "i" : "");
            return f;
        }

        const g: { [key: string]: Route } = {};
        this.when = function(a: string, c: any) {
            const b = d.copy(c);
            if (d.isUndefined(b.reloadOnSearch)) {
                b.reloadOnSearch = true;
            }
            if (d.isUndefined(b.caseInsensitiveMatch)) {
                b.caseInsensitiveMatch = this.caseInsensitiveMatch;
            }
            g[a] = d.extend(b, a && h(a, b));
            if (a) {
                const f = "/" === a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                g[f] = d.extend({ redirectTo: a }, h(f, b));
            }
            return this;
        };
        this.caseInsensitiveMatch = false;
        this.otherwise = function(a: any) {
            if (typeof a === "string") {
                a = { redirectTo: a };
            }
            this.when(null, a);
            return this;
        };
        this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce",
            function(a: any, c: any, b: any, f: any, h: any, p: any, x: any) {
                function l(b: any) {
                    const e = s.current;
                    (v = (n = k()) && e && n.$$route === e.$$route && d.equals(n.pathParams, e.pathParams) && !n.reloadOnSearch && !w) || !e && !n || a.$broadcast("$routeChangeStart", n, e).defaultPrevented && b && b.preventDefault();
                }

                function m() {
                    const u = s.current;
                    const e = n;
                    if (v) {
                        u.params = e.params;
                        d.copy(u.params, b);
                        a.$broadcast("$routeUpdate", u);
                    } else if (e || u) {
                        w = false;
                        (s.current = e) && e.redirectTo && (d.isString(e.redirectTo) ? c.path(t(e.redirectTo, e.params)).search(e.params).replace() : c.url(e.redirectTo(e.pathParams, c.path(), c.search())).replace());
                        f.when(e).then(function() {
                            if (e) {
                                const a = d.extend({}, e.resolve);
                                let b: any, c: any;
                                d.forEach(a, function(b: any, e: any) {
                                    a[e] = d.isString(b) ? h.get(b) : h.invoke(b, null, null, e);
                                });
                                if (d.isDefined(b = e.template)) {
                                    if (d.isFunction(b)) {
                                        b = b(e.params);
                                    }
                                } else if (d.isDefined(c = e.templateUrl)) {
                                    if (d.isFunction(c)) {
                                        c = c(e.params);
                                    }
                                    c = x.getTrustedResourceUrl(c);
                                    if (d.isDefined(c)) {
                                        e.loadedTemplateUrl = c;
                                        b = p(c);
                                    }
                                }
                                if (d.isDefined(b)) {
                                    a.$template = b;
                                }
                                return f.all(a);
                            }
                        }).then(function(c: any) {
                            if (e === s.current) {
                                if (e) {
                                    e.locals = c;
                                    d.copy(e.params, b);
                                }
                                a.$broadcast("$routeChangeSuccess", e, u);
                            }
                        }, function(b: any) {
                            if (e === s.current) {
                                a.$broadcast("$routeChangeError", e, u, b);
                            }
                        });
                    }
                }

                function k() {
                    let a: any, b: any;
                    d.forEach(g, function(f: Route, g: string) {
                        let q: any;
                        if (!b) {
                            const h = c.path();
                            q = f.keys;
                            const l: any = {};
                            if (f.regexp) {
                                if (h = f.regexp.exec(h)) {
                                    for (let k = 1, m = h.length; k < m; ++k) {
                                        const n = q[k - 1];
                                        const p = h[k];
                                        if (n && p) {
                                            l[n.name] = p;
                                        }
                                    }
                                    q = l;
                                } else {
                                    q = null;
                                }
                            } else {
                                q = null;
                            }
                            q = a = q;
                        }
                        if (q) {
                            b = r(f, { params: d.extend({}, c.search(), a), pathParams: a });
                            b.$$route = f;
                        }
                    });
                    return b || g[null] && r(g[null], { params: {}, pathParams: {} });
                }

                function t(a: string, b: any) {
                    const c: string[] = [];
                    d.forEach((a || "").split(":"), function(a: string, d: number) {
                        if (0 === d) {
                            c.push(a);
                        } else {
                            const f = a.match(/(\w+)(?:[?*])?(.*)/);
                            const g = f[1];
                            c.push(b[g]);
                            c.push(f[2] || "");
                            delete b[g];
                        }
                    });
                    return c.join("");
                }

                let w = false, n: any, v: any;
                const s = {
                    routes: g,
                    reload: function() {
                        w = true;
                        a.$evalAsync(function() {
                            l();
                            m();
                        });
                    },
                    updateParams: function(a: any) {
                        if (this.current && this.current.$$route) {
                            const b: any = {};
                            const f = this;
                            d.forEach(Object.keys(a), function(c: string) {
                                if (!f.current.pathParams[c]) {
                                    b[c] = a[c];
                                }
                            });
                            a = d.extend({}, this.current.params, a);
                            c.path(t(this.current.$$route.originalPath, a));
                            c.search(d.extend({}, c.search(), b));
                        } else {
                            throw B("norout");
                        }
                    }
                };
                a.$on("$locationChangeStart", l);
                a.$on("$locationChangeSuccess", m);
                return s;
            }
        ];
    });

    const B = d.$$minErr("ngRoute");
    p.provider("$routeParams", function() {
        this.$get = function() {
            return {};
        };
    });
    p.directive("ngView", v);
    p.directive("ngView", A);
    v.$inject = ["$route", "$anchorScroll", "$animate"];
    A.$inject = ["$compile", "$controller", "$route"];
})(window, window.angular);