/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p: Window, d: angular.IAngularStatic, C: any): void {
    'use strict';
    function v(r: any, h: Function, g: angular.animate.IAnimateService): object {
        return {
            restrict: "ECA",
            terminal: true,
            priority: 400,
            transclude: "element",
            link: function(a: angular.IScope, c: JQLite, b: angular.IAttributes, f: any, y: angular.ITranscludeFunction): void {
                function z(): void {
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
                }
                function x(): void {
                    const b: any = r.current && r.current.locals;
                    if (d.isDefined(b && b.$template)) {
                        const b: angular.IScope = a.$new(),
                              f: any = r.current;
                        m = y(b, function(b: JQLite): void {
                            g.enter(b, null, m || c).then(function(): void {
                                if (!d.isDefined(t) || t && !a.$eval(t) || h())
                                    h();
                            });
                            z();
                        });
                        l = f.scope = b;
                        l.$emit("$viewContentLoaded");
                        l.$eval(w);
                    } else z();
                }
                let l: angular.IScope | null = null,
                    m: JQLite | null = null,
                    k: angular.IPromise<any> | null = null,
                    t: string = b.autoscroll,
                    w: string = b.onload || "";
                a.$on("$routeChangeSuccess", x);
                x();
            }
        }
    }
    function A(d: angular.ICompileService, h: angular.IControllerService, g: any): object {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(a: angular.IScope, c: JQLite, b: angular.IAttributes): void {
                const b: any = g.current,
                      f: any = b.locals;
                c.html(f.$template);
                const y: Function = d(c.contents());
                if (b.controller) {
                    const f: any = h(b.controller, f);
                    if (b.controllerAs) {
                        a[b.controllerAs] = f;
                    }
                    c.data("$ngControllerController", f);
                    c.children().data("$ngControllerController", f);
                }
                y(a);
            }
        }
    }
    p = d.module("ngRoute", ["ng"]).provider("$route", function(): void {
        const g: { [key: string]: any } = {};
        this.when = function(a: string, c: any): any {
            const b: any = d.copy(c);
            if (d.isUndefined(b.reloadOnSearch))
                b.reloadOnSearch = true;
            if (d.isUndefined(b.caseInsensitiveMatch))
                b.caseInsensitiveMatch = this.caseInsensitiveMatch;
            g[a] = d.extend(b, a && h(a, b));
            if (a) {
                const f: string = a[a.length - 1] == '/' ? a.substr(0, a.length - 1) : a + '/';
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
        this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function(a: angular.IRootScopeService, c: angular.ILocationService, b: angular.route.IRouteParamsService, f: angular.IQService, h: angular.auto.IInjectorService, p: angular.ITemplateRequestService, x: angular.ISCEService): any {
            function l(b: Event): void {
                const e: any = s.current;
                const v: boolean = (n = k()) && e && n.$$route === e.$$route && d.equals(n.pathParams, e.pathParams) && !n.reloadOnSearch && !w;
                if (!v && (!e || n)) {
                    w = false;
                    if (s.current = n) {
                        if (n.redirectTo) {
                            if (d.isString(n.redirectTo)) {
                                c.path(t(n.redirectTo, n.params)).search(n.params).replace();
                            } else {
                                c.url(n.redirectTo(n.pathParams, c.path(), c.search())).replace();
                            }
                        }
                        f.when(n).then(function(): any {
                            if (n === s.current) {
                                const a: any = d.extend({}, n.resolve),
                                      b: any = {},
                                      c: any = {};
                                d.forEach(a, function(b: any, e: string): void {
                                    a[e] = d.isString(b) ? h.get(b) : h.invoke(b, null, null, e);
                                });
                                if (d.isDefined(b = n.template)) {
                                    if (d.isFunction(b)) {
                                        b = b(n.params);
                                    }
                                } else if (d.isDefined(c = n.templateUrl)) {
                                    if (d.isFunction(c)) {
                                        c = c(n.params);
                                    }
                                    c = x.getTrustedResourceUrl(c);
                                    if (d.isDefined(c)) {
                                        n.loadedTemplateUrl = c;
                                        b = p(c);
                                    }
                                }
                                if (d.isDefined(b)) {
                                    a.$template = b;
                                }
                                return f.all(a);
                            }
                        }).then(function(c: any): void {
                            if (n === s.current) {
                                if (n) {
                                    n.locals = c;
                                    d.copy(n.params, b);
                                }
                                a.$broadcast("$routeChangeSuccess", n, u);
                            }
                        }, function(b: any): void {
                            if (n === s.current) {
                                a.$broadcast("$routeChangeError", n, u, b);
                            }
                        });
                    }
                }
            }
            function m(): void {
                const u: any = s.current,
                      e: any = n;
                if (v) {
                    u.params = e.params;
                    d.copy(u.params, b);
                    a.$broadcast("$routeUpdate", u);
                } else if (e || u) {
                    w = false;
                    s.current = e;
                    if (e.redirectTo) {
                        if (d.isString(e.redirectTo)) {
                            c.path(t(e.redirectTo, e.params)).search(e.params).replace();
                        } else {
                            c.url(e.redirectTo(e.pathParams, c.path(), c.search())).replace();
                        }
                    }
                    f.when(e).then(function(): any {
                        if (e === s.current) {
                            const a: any = d.extend({}, e.resolve),
                                  b: any = {},
                                  c: any = {};
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
                        if (e === s.current) {
                            if (e) {
                                e.locals = c;
                                d.copy(e.params, b);
                            }
                            a.$broadcast("$routeChangeSuccess", e, u);
                        }
                    }, function(b: any): void {
                        if (e === s.current) {
                            a.$broadcast("$routeChangeError", e, u, b);
                        }
                    });
                }
            }
            function k(): any {
                let a: any,
                    b: any;
                d.forEach(g, function(f: any, g: string): void {
                    let q: boolean;
                    if (!b) {
                        const h: string = c.path();
                        const q: any[] = f.keys;
                        let l: { [key: string]: string } = {};
                        if (f.regexp) {
                            if (h = f.regexp.exec(h)) {
                                for (let k: number = 1, m: number = h.length; k < m; ++k) {
                                    const n: any = q[k - 1],
                                          p: string = h[k];
                                    if (n && p) {
                                        l[n.name] = p;
                                    }
                                }
                                q = l;
                            } else q = null;
                        } else q = null;
                        q = a = q;
                    }
                    if (q) {
                        b = r(f, { params: d.extend({}, c.search(), a), pathParams: a });
                        b.$$route = f;
                    }
                });
                return b || g[null] && r(g[null], { params: {}, pathParams: {} });
            }
            function t(a: string, b: { [key: string]: any }): string {
                let c: string[] = [];
                d.forEach((a || "").split(":"), function(a: string, d: number): void {
                    if (d === 0) {
                        c.push(a);
                    } else {
                        const f: RegExpMatchArray | null = a.match(/(\w+)(?:[?*])?(.*)/),
                              g: string = f ? f[1] : '',
                              h: string = f ? f[2] : '';
                        c.push(b[g]);
                        c.push(h || "");
                        delete b[g];
                    }
                });
                return c.join("");
            }
            let w: boolean = false,
                n: any,
                v: boolean,
                s: { routes: { [key: string]: any }, reload: Function, updateParams: Function } = { routes: g, reload: function(): void {
                    w = true;
                    a.$evalAsync(function(): void {
                        l();
                        m();
                    });
                }, updateParams: function(a: { [key: string]: any }): void {
                    if (this.current && this.current.$$route) {
                        let b: { [key: string]: any } = {},
                            f: this;
                        d.forEach(Object.keys(a), function(c: string): void {
                            if (!f.current.pathParams[c]) {
                                b[c] = a[c];
                            }
                        });
                        a = d.extend({}, this.current.params, a);
                        c.path(t(this.current.$$route.originalPath, a));
                        c.search(d.extend({}, c.search(), b));
                    } else throw B("norout");
                } };
            a.$on("$locationChangeStart", l);
            a.$on("$locationChangeSuccess", m);
            return s;
        }];
    });
    const B: Function = d.$$minErr("ngRoute");
    p.provider("$routeParams", function(): void {
        this.$get = function(): any {
            return {};
        };
    });
    p.directive("ngView", v);
    p.directive("ngView", A);
    v.$inject = ["$route", "$anchorScroll", "$animate"];
    A.$inject = ["$compile", "$controller", "$route"];
})(window, window.angular);