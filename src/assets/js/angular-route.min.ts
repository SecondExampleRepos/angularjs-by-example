/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p: Window, d: ng.IAngularStatic, C: any): void {
    'use strict';
    type Route = {
        current?: any;
        locals?: any;
        redirectTo?: any;
        template?: any;
        templateUrl?: any;
        controller?: any;
        controllerAs?: any;
        resolve?: any;
        keys?: any[];
        regexp?: RegExp;
        pathParams?: any;
        params?: any;
        $$route?: Route;
    };
    type Locals = {
        $template?: string;
    };
    enum Priority {
        High = 400,
        Low = -400
    };
    function v(r: any, h: any, g: ng.animate.IAnimateService): any {
        return {
            restrict: "ECA",
            terminal: true,
            priority: Priority.High,
            transclude: "element",
            link: function(a: ng.IScope, c: JQLite, b: any, f: any, y: any): void {
                let z: () => void = function(): void {
                    if (k) {
                        g.cancel(k);
                        k = null;
                    }
                    if (l) {
                        l.$destroy();
                        l = null;
                    }
                    if (m) {
                        k = g.leave(m);
                        k.then(function(): void {
                            k = null;
                        });
                        m = null;
                    }
                };
                let x: () => void = function(): void {
                    let b: Locals = r.current && r.current.locals;
                    if (d.isDefined(b && b.$template)) {
                        let b: ng.IScope = a.$new();
                        let f: Route = r.current;
                        m = y(b, function(b: JQLite): void {
                            g.enter(b, null, m || c).then(function(): void {
                                if (!d.isDefined(t) || t && !a.$eval(t) || h()) {
                                    z();
                                }
                            });
                        });
                        l = f.scope = b;
                        l.$emit("$viewContentLoaded");
                        l.$eval(w);
                    } else {
                        z();
                    }
                };
                let l: ng.IScope, m: JQLite, k: ng.IPromise<any>, t: string = b.autoscroll, w: string = b.onload || "";
                a.$on("$routeChangeSuccess", x);
                x();
            }
        };
    }
    function A(d: ng.ICompileService, h: ng.IControllerService, g: any): any {
        return {
            restrict: "ECA",
            priority: Priority.Low,
            link: function(a: ng.IScope, c: JQLite): void {
                let b: Route = g.current;
                let f: Locals = b.locals;
                c.html(f.$template);
                let y: ng.ICompiledExpression = d(c.contents());
                if (b.controller) {
                    let f: any = h(b.controller, f);
                    if (b.controllerAs) {
                        a[b.controllerAs] = f;
                    }
                    c.data("$ngControllerController", f);
                    c.children().data("$ngControllerController", f);
                }
                y(a);
            }
        };
    }
    p = d.module("ngRoute", ["ng"]).provider("$route", function(): void {
        let g: { [key: string]: Route } = {};
        this.when = function(a: string, c: any): any {
            let b: any = d.copy(c);
            if (d.isUndefined(b.reloadOnSearch)) {
                b.reloadOnSearch = true;
            }
            if (d.isUndefined(b.caseInsensitiveMatch)) {
                b.caseInsensitiveMatch = this.caseInsensitiveMatch;
            }
            g[a] = d.extend(b, a && h(a, b));
            if (a) {
                let f: string = a[a.length - 1] === '/' ? a.substr(0, a.length - 1) : a + '/';
                g[f] = d.extend({ redirectTo: a }, h(f, b));
            }
            return this;
        };
        this.caseInsensitiveMatch = false;
        this.otherwise = function(a: any): any {
            if (typeof a === 'string') {
                a = { redirectTo: a };
            }
            this.when(null, a);
            return this;
        };
        this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function(a: ng.IRootScopeService, c: ng.ILocationService, b: any, f: ng.IQService, h: ng.auto.IInjectorService, p: any, x: ng.ISCEService): any {
            let l: (b: Event) => void = function(b: Event): void {
                let e: Route = s.current;
                let v: boolean = (n = k()) && e && n.$$route === e.$$route && d.equals(n.pathParams, e.pathParams) && !n.reloadOnSearch && !w;
                if (!v && (!e || n)) {
                    if (a.$broadcast("$routeChangeStart", n, e).defaultPrevented && b) {
                        b.preventDefault();
                    }
                }
            };
            let m: () => void = function(): void {
                let u: Route = s.current;
                let e: Route = n;
                if (v) {
                    u.params = e.params;
                    d.copy(u.params, b);
                    a.$broadcast("$routeUpdate", u);
                } else if (e || u) {
                    w = false;
                    s.current = e;
                    if (e && e.redirectTo) {
                        if (d.isString(e.redirectTo)) {
                            c.path(t(e.redirectTo, e.params)).search(e.params).replace();
                        } else {
                            c.url(e.redirectTo(e.pathParams, c.path(), c.search())).replace();
                        }
                    }
                    f.when(e).then(function(): any {
                        if (e) {
                            let a: any = d.extend({}, e.resolve);
                            let b: any, c: any;
                            d.forEach(a, function(b: any, e: string): void {
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
                    }).then(function(c: any): void {
                        if (e == s.current) {
                            if (e) {
                                e.locals = c;
                                d.copy(e.params, b);
                                a.$broadcast("$routeChangeSuccess", e, u);
                            }
                        }
                    }, function(b: any): void {
                        if (e == s.current) {
                            a.$broadcast("$routeChangeError", e, u, b);
                        }
                    });
                }
            };
            let k: () => Route = function(): Route {
                let a: Route, b: Route;
                d.forEach(g, function(f: Route, g: string): void {
                    let q: boolean;
                    if (!b) {
                        let h: string = c.path();
                        let q: any = f.keys;
                        let l: any = {};
                        if (f.regexp) {
                            if (h = f.regexp.exec(h)) {
                                for (let k: number = 1, m: number = h.length; k < m; ++k) {
                                    let n: any = q[k - 1], p: string = h[k];
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
            };
            let t: (a: string, b: any) => string = function(a: string, b: any): string {
                let c: string[] = [];
                d.forEach((a || "").split(":"), function(a: string, d: number): void {
                    if (d === 0) {
                        c.push(a);
                    } else {
                        let f: RegExpExecArray = /(\w+)(?:[?*])?(.*)/.exec(a);
                        let g: string = f[1];
                        c.push(b[g]);
                        c.push(f[2] || "");
                        delete b[g];
                    }
                });
                return c.join("");
            };
            let w: boolean = false, n: Route, v: boolean, s: { routes: { [key: string]: Route }, reload: () => void, updateParams: (a: any) => void } = {
                routes: g,
                reload: function(): void {
                    w = true;
                    a.$evalAsync(function(): void {
                        l();
                        m();
                    });
                },
                updateParams: function(a: any): void {
                    if (this.current && this.current.$$route) {
                        let b: any = {};
                        let f: any = this;
                        d.forEach(Object.keys(a), function(c: string): void {
                            if (!f.current.pathParams[c]) {
                                b[c] = a[c];
                            }
                        });
                        a = d.extend({}, this.current.params, a);
                        c.path(t(this.current.$$route.originalPath, a));
                        c.search(d.extend({}, c.search(), b));
                    } else {
                        throw new Error("norout");
                    }
                }
            };
            a.$on("$locationChangeStart", l);
            a.$on("$locationChangeSuccess", m);
            return s;
        }];
    });
    let B: (a: string) => ng.IMinErr = d.$$minErr("ngRoute");
    p.provider("$routeParams", function(): any {
        this.$get = function(): any {
            return {};
        };
    });
    p.directive("ngView", v);
    p.directive("ngView", A);
    v.$inject = ["$route", "$anchorScroll", "$animate"];
    A.$inject = ["$compile", "$controller", "$route"];
})(window, window.angular);