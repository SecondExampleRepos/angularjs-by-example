/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
((N: Window, f: any, W: any): void => {
    'use strict';
    f.module("ngAnimate", ["ng"]).directive("ngAnimateChildren", (): Function => {
        return (X: any, C: any, g: any): void => {
            g = g.ngAnimateChildren;
            f.isString(g) && g.length === 0 ? C.data("$$ngAnimateChildren", true) : X.$watch(g, (f: boolean) => {
                C.data("$$ngAnimateChildren", !!f)
            });
        }
    }).factory("$$animateReflow", ["$$rAF", "$document", (f: any, C: any): Function => {
        return (g: Function): Function => {
            return f((): void => {
                g()
            })
        }
    }]).config(["$provide", "$animateProvider", (X: any, C: any): void => {
        function g(f: any): Element | null {
            for (let n = 0; n < f.length; n++) {
                let g = f[n];
                if (g.nodeType === 1) return g;
            }
            return null;
        }

        function ba(f: any, n: any): boolean {
            return g(f) === g(n);
        }

        let t: Function = (): void => {};
        let n: Function = (a: any[], cb: Function): void => {
            a.forEach(cb);
        };
        let da: any = C.$$selectors;
        let aa: Function = Array.isArray;
        let ea: Function = (a: any): a is string => typeof a === 'string';
        let ga: Function = (a: any): a is object => typeof a === 'object' && a !== null;
        let r: any = { running: true };
        let u: any;

        X.decorator("$animate", ["$delegate", "$$q", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", "$templateRequest", "$$jqLite", (O: any, N: any, M: any, Y: any, y: any, H: any, P: any, W: any, Z: any, Q: any): any => {
            function R(a: any, c: boolean): boolean {
                let b = a.data("$$ngAnimateState") || {};
                if (c) {
                    b.running = true;
                    b.structural = true;
                    a.data("$$ngAnimateState", b);
                }
                return b.disabled || (b.running && b.structural);
            }

            function D(a: Function): any {
                let c: any, b = N.defer();
                b.promise.$$cancelFn = (): void => {
                    c && c();
                };
                P.$$postDigest((): void => {
                    c = a((): void => {
                        b.resolve();
                    });
                });
                return b.promise;
            }

            function I(a: any): any {
                if (ga(a)) {
                    if (ea(a.tempClasses)) {
                        a.tempClasses = a.tempClasses.split(/\s+/);
                    }
                    return a;
                }
            }

            function S(a: any, c: any, b: any): any {
                b = b || {};
                let d: any = {};
                n(b, (e: any, a: string): void => {
                    n(a.split(" "), (a: string): void => {
                        d[a] = e;
                    });
                });
                let h: any = Object.create(null);
                n((a.attr("class") || "").split(/\s+/), (e: string): void => {
                    h[e] = true;
                });
                let f: string[] = [];
                let l: string[] = [];
                n(c && c.classes || [], (e: boolean, a: string): void => {
                    let b = h[a];
                    let c = d[a] || {};
                    if (e === false) {
                        if (b || c.event === "addClass") {
                            l.push(a);
                        }
                    } else if (e === true) {
                        if (b && c.event !== "removeClass" || f.push(a));
                    }
                });
                return f.length + l.length && [f.join(" "), l.join(" ")];
            }

            function T(a: string): any[] {
                if (!a) return [];
                let c: any[] = [];
                let b: any = {};
                a = a.substr(1).split(".");
                if (Y.transitions || Y.animations) {
                    c.push(M.get(da[""]));
                }
                for (let d = 0; d < a.length; d++) {
                    let f = a[d];
                    let k = da[f];
                    if (k && !b[f]) {
                        c.push(M.get(k));
                        b[f] = true;
                    }
                }
                return c;
            }

            function U(a: any, c: string, b: any, d: any): any {
                function h(e: any, a: string): boolean {
                    let b = e[a];
                    let c = e["before" + a.charAt(0).toUpperCase() + a.substr(1)];
                    if (b || c) {
                        if (a === "leave") {
                            c = b;
                            b = null;
                        }
                        u.push({ event: a, fn: b });
                        J.push({ event: a, fn: c });
                        return true;
                    }
                    return false;
                }

                function k(c: any, l: any, w: Function): void {
                    let E: any[] = [];
                    n(c, (a: any): void => {
                        if (a.fn) E.push(a);
                    });
                    let m = 0;
                    n(E, (c: any, f: number): void => {
                        let p = (): void => {
                            if (l) {
                                (l[f] || t)();
                                if (++m < E.length) return;
                                l = null;
                            }
                            w();
                        };
                        switch (c.event) {
                            case "setClass":
                                l.push(c.fn(a, e, A, p, d));
                                break;
                            case "animate":
                                l.push(c.fn(a, b, d.from, d.to, p));
                                break;
                            case "addClass":
                                l.push(c.fn(a, e || b, p, d));
                                break;
                            case "removeClass":
                                l.push(c.fn(a, A || b, p, d));
                                break;
                            default:
                                l.push(c.fn(a, p, d));
                        }
                    });
                    if (l && l.length === 0) w();
                }

                let l = a[0];
                if (!l) return;
                if (d) {
                    d.to = d.to || {};
                    d.from = d.from || {};
                }
                let e: string, A: string;
                if (aa(b)) {
                    e = b[0];
                    A = b[1];
                    if (e) {
                        if (A) {
                            b = e + " " + A;
                        } else {
                            b = e;
                            c = "addClass";
                        }
                    } else {
                        b = A;
                        c = "removeClass";
                    }
                }
                let w = c === "setClass";
                let E = w || c === "addClass" || c === "removeClass" || c === "animate";
                let p = a.attr("class") + " " + b;
                if (!x(p)) {
                    return;
                }
                let ca = t;
                let m: any[] = [];
                let J: any[] = [];
                let g = t;
                let s: any[] = [];
                let u: any[] = [];
                p = (" " + p).replace(/\s+/g, ".");
                n(T(p), (a: any): void => {
                    if (!h(a, c) && w) {
                        h(a, "addClass");
                        h(a, "removeClass");
                    }
                });
                return {
                    node: l,
                    event: c,
                    className: b,
                    isClassBased: E,
                    isSetClassOperation: w,
                    applyStyles: (): void => {
                        if (d) {
                            a.css(f.extend(d.from || {}, d.to || {}));
                        }
                    },
                    before: (a: Function): void => {
                        ca = a;
                        k(J, m, (): void => {
                            ca = t;
                            a();
                        });
                    },
                    after: (a: Function): void => {
                        g = a;
                        k(u, s, (): void => {
                            g = t;
                            a();
                        });
                    },
                    cancel: (): void => {
                        if (m) {
                            n(m, (a: Function): void => {
                                (a || t)(true);
                            });
                            ca(true);
                        }
                        if (s) {
                            n(s, (a: Function): void => {
                                (a || t)(true);
                            });
                            g(true);
                        }
                    }
                };
            }

            function G(a: string, c: string, b: any, d: any, h: Function, k: Function, l: any): any {
                function A(e: string): void {
                    let l = "$animate:" + e;
                    J && J[l] && J[l].length > 0 && H((): void => {
                        b.triggerHandler(l, { event: a, className: c });
                    });
                }

                function w(): void {
                    A("before");
                }

                function E(): void {
                    A("after");
                }

                function p(): void {
                    if (!p.hasBeenRun) {
                        p.hasBeenRun = true;
                        k();
                    }
                }

                function g(): void {
                    if (!g.hasBeenRun) {
                        m && m.applyStyles();
                        g.hasBeenRun = true;
                        l && l.tempClasses && n(l.tempClasses, (a: string): void => {
                            u.removeClass(b, a);
                        });
                        let w = b.data("$$ngAnimateState");
                        if (w) {
                            if (m && m.isClassBased) {
                                B(b, c);
                            } else {
                                H((): void => {
                                    let e = b.data("$$ngAnimateState") || {};
                                    if (fa === e.index) {
                                        B(b, c, a);
                                    }
                                });
                                b.data("$$ngAnimateState", w);
                            }
                            A("close");
                            e();
                        }
                    }
                }

                let m = U(b, a, c, l);
                if (!m) return p(), w(), E(), g(), t;
                a = m.event;
                c = m.className;
                let J = f.element._data(m.node);
                J = J && J.events;
                if (!d) {
                    d = h ? h.parent() : b.parent();
                    if (z(b, d)) return p(), w(), E(), g(), t;
                }
                d = b.data("$$ngAnimateState") || {};
                let L = d.active || {};
                let s = d.totalActive || 0;
                let q = d.last;
                let h = false;
                if (s > 0) {
                    s = [];
                    if (m.isClassBased) {
                        if (q.event === "setClass") {
                            s.push(q);
                            B(b, c);
                        }
                    } else if (q.event === "leave" && L["ng-leave"]) {
                        h = true;
                    } else {
                        for (let v in L) s.push(L[v]);
                        d = {};
                        B(b, true);
                    }
                    s.length > 0 && n(s, (a: any): void => {
                        a.cancel();
                    });
                }
                if (!m.isClassBased || m.isSetClassOperation || a === "animate" || h) {
                    if (h) return p(), w(), E(), A("close"), e(), t;
                }
                L = d.active || {};
                s = d.totalActive || 0;
                if (a === "leave") b.one("$destroy", (a: Event): void => {
                    let a = f.element(this);
                    let e = a.data("$$ngAnimateState");
                    if (e) {
                        e = e.active["ng-leave"];
                        if (e) {
                            e.cancel();
                            B(a, "ng-leave");
                        }
                    }
                });
                u.addClass(b, "ng-animate");
                l && l.tempClasses && n(l.tempClasses, (a: string): void => {
                    u.addClass(b, a);
                });
                let fa = K++;
                s++;
                L[c] = m;
                b.data("$$ngAnimateState", { last: m, active: L, index: fa, totalActive: s });
                w();
                m.before((e: boolean): void => {
                    let l = b.data("$$ngAnimateState");
                    e = e || !l || !l.active[c] || m.isClassBased && l.active[c].event !== a;
                    p();
                    if (e === true) g();
                    else {
                        E();
                        m.after(g);
                    }
                });
                return m.cancel;
            }

            function q(a: any): void {
                if (a = g(a)) {
                    a = f.isFunction(a.getElementsByClassName) ? a.getElementsByClassName("ng-animate") : a.querySelectorAll(".ng-animate");
                    n(a, (a: any): void => {
                        a = f.element(a);
                        (a = a.data("$$ngAnimateState")) && a.active && n(a.active, (a: any): void => {
                            a.cancel();
                        });
                    });
                }
            }

            function B(a: any, c: string | boolean, b?: string): void {
                if (ba(a, y)) {
                    if (!r.disabled) {
                        r.running = false;
                        r.structural = false;
                    }
                } else if (c) {
                    let b = a.data("$$ngAnimateState") || {};
                    let d = c === true;
                    if (!d && b.active && b.active[c]) {
                        b.totalActive--;
                        delete b.active[c];
                    }
                    if (d || !b.totalActive) {
                        u.removeClass(a, "ng-animate");
                        a.removeData("$$ngAnimateState");
                    }
                }
            }

            function z(a: any, c: any): boolean {
                if (r.disabled) return true;
                if (ba(a, y)) return r.running;
                let b: boolean;
                let d: boolean;
                do {
                    if (c.length === 0) break;
                    let k = ba(c, y);
                    let l = k ? r : c.data("$$ngAnimateState") || {};
                    if (l.disabled) return true;
                    if (k) d = true;
                    if (b !== false) {
                        let k = c.data("$$ngAnimateChildren");
                        if (f.isDefined(k)) b = k;
                    }
                    b = b || l.running || l.last && !l.last.isClassBased;
                } while (c = c.parent());
                return !d || !b && b;
            }

            u = Q;
            y.data("$$ngAnimateState", r);
            let $ = P.$watch((): number => {
                return Z.totalPendingRequests;
            }, (a: number, c: number): void => {
                if (a === 0) {
                    $();
                    P.$$postDigest((): void => {
                        P.$$postDigest((): void => {
                            r.running = false;
                        });
                    });
                }
            });
            let K = 0;
            let V = C.classNameFilter();
            let x = V ? (a: string): boolean => {
                return V.test(a);
            } : (): boolean => {
                return true;
            };
            return {
                animate: (a: any, c: string, b: any, d: any, h: Function): any => {
                    d = d || "ng-inline-animate";
                    h = I(h) || {};
                    h.from = b ? c : null;
                    h.to = b ? b : c;
                    return D((b: Function): any => {
                        return G("animate", d, f.element(g(a)), null, null, t, h, b);
                    });
                },
                enter: (a: any, c: any, b: any, d: any): any => {
                    d = I(d);
                    a = f.element(a);
                    c = c && f.element(c);
                    b = b && f.element(b);
                    R(a, true);
                    O.enter(a, c, b);
                    return D((h: Function): any => {
                        return G("enter", "ng-enter", f.element(g(a)), c, b, t, d, h);
                    });
                },
                leave: (a: any, c: any): any => {
                    c = I(c);
                    a = f.element(a);
                    q(a);
                    R(a, true);
                    return D((b: Function): any => {
                        return G("leave", "ng-leave", f.element(g(a)), null, null, (): void => {
                            O.leave(a);
                        }, c, b);
                    });
                },
                move: (a: any, c: any, b: any, d: any): any => {
                    d = I(d);
                    a = f.element(a);
                    c = c && f.element(c);
                    b = b && f.element(b);
                    q(a);
                    R(a, true);
                    O.move(a, c, b);
                    return D((h: Function): any => {
                        return G("move", "ng-move", f.element(g(a)), c, b, t, d, h);
                    });
                },
                addClass: (a: any, c: string, b: any): any => {
                    return this.setClass(a, c, [], b);
                },
                removeClass: (a: any, c: string, b: any): any => {
                    return this.setClass(a, [], c, b);
                },
                setClass: (a: any, c: string, b: string, d: any): any => {
                    d = I(d);
                    a = f.element(a);
                    a = f.element(g(a));
                    if (R(a)) return O.$$setClassImmediately(a, c, b, d);
                    let h: any;
                    let k = a.data("$$animateClasses");
                    let l = !!k;
                    if (!k) {
                        k = { classes: {} };
                    }
                    h = k.classes;
                    c = aa(c) ? c : c.split(" ");
                    n(c, (a: string): void => {
                        if (a && a.length) {
                            h[a] = true;
                        }
                    });
                    b =```typescript
                    aa(b) ? b : b.split(" ");
                    n(b, (a: string): void => {
                        if (a && a.length) {
                            h[a] = false;
                        }
                    });
                    if (l) return d && k.options && (k.options = f.extend(k.options || {}, d)), k.promise;
                    a.data("$$animateClasses", k = { classes: h, options: d });
                    return k.promise = D((e: Function): any => {
                        let l = a.parent();
                        let b = g(a);
                        let c = b.parentNode;
                        if (!c || c.$$NG_REMOVED || b.$$NG_REMOVED) e();
                        else {
                            b = a.data("$$animateClasses");
                            a.removeData("$$animateClasses");
                            let c = a.data("$$ngAnimateState") || {};
                            let d = S(a, b, c.active);
                            return d ? G("setClass", d, a, l, null, (): void => {
                                d[0] && O.$$addClassImmediately(a, d[0]);
                                d[1] && O.$$removeClassImmediately(a, d[1]);
                            }, b.options, e) : e();
                        }
                    });
                },
                cancel: (a: any): void => {
                    a.$$cancelFn();
                },
                enabled: (a: boolean, c: any): boolean => {
                    switch (arguments.length) {
                        case 2:
                            if (a) B(c);
                            else {
                                let b = c.data("$$ngAnimateState") || {};
                                b.disabled = true;
                                c.data("$$ngAnimateState", b);
                            }
                            break;
                        case 1:
                            r.disabled = !a;
                            break;
                        default:
                            a = !r.disabled;
                    }
                    return !!a;
                }
            };
        }]);
        C.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", (r: any, C: any, M: any, Y: any): any => {
            function y(): void {
                if (!b) {
                    b = Y((): void => {
                        c = [];
                        b = null;
                        x = {};
                    });
                }
            }

            function H(a: any, e: Function): void {
                b && b();
                c.push(e);
                b = Y((): void => {
                    n(c, (a: Function): void => {
                        a();
                    });
                    c = [];
                    b = null;
                    x = {};
                });
            }

            function P(a: any, e: number): void {
                let b = g(a);
                a = f.element(b);
                k.push(a);
                b = Date.now() + e;
                if (b <= h) {
                    M.cancel(d);
                    h = b;
                    d = M((): void => {
                        X(k);
                        k = [];
                    }, e, false);
                }
            }

            function X(a: any[]): void {
                n(a, (a: any): void => {
                    let b = a.data("$$ngAnimateCSS3Data");
                    if (b) {
                        n(b.closeAnimationFns, (a: Function): void => {
                            a();
                        });
                    }
                });
            }

            function Z(a: any, e: string): any {
                let b = e ? x[e] : null;
                if (!b) {
                    let c = 0;
                    let d = 0;
                    let f = 0;
                    let g = 0;
                    n(a, (a: any): void => {
                        if (a.nodeType === 1) {
                            let e = r.getComputedStyle(a) || {};
                            c = Math.max(Q(e[z + "Duration"]), c);
                            d = Math.max(Q(e[z + "Delay"]), d);
                            g = Math.max(Q(e[K + "Delay"]), g);
                            let h = Q(e[K + "Duration"]);
                            if (h > 0) {
                                h *= parseInt(e[K + "IterationCount"], 10) || 1;
                                f = Math.max(h, f);
                            }
                        }
                    });
                    b = { total: 0, transitionDelay: d, transitionDuration: c, animationDelay: g, animationDuration: f };
                    if (e) {
                        x[e] = b;
                    }
                }
                return b;
            }

            function Q(a: string): number {
                let e = 0;
                a = ea(a) ? a.split(/\s*,\s*/) : [];
                n(a, (a: string): void => {
                    e = Math.max(parseFloat(a) || 0, e);
                });
                return e;
            }

            function R(b: any, e: string, c: string, d: any): any {
                b = 0 <= ["ng-enter", "ng-leave", "ng-move"].indexOf(c);
                let f: any;
                let p = e.parent();
                let h = p.data("$$ngAnimateKey");
                if (!h) {
                    p.data("$$ngAnimateKey", ++a);
                    h = a;
                }
                let m = h + "-" + g(e).getAttribute("class");
                let k = m + " " + c;
                let t = x[k] ? ++x[k].total : 0;
                let s: any = {};
                if (t > 0) {
                    let v = c + "-stagger";
                    let m = m + " " + v;
                    let f = !x[m];
                    u.addClass(e, v);
                    s = Z(e, m);
                    f && u.removeClass(e, v);
                }
                u.addClass(e, c);
                let n = e.data("$$ngAnimateCSS3Data") || {};
                let k = Z(e, k);
                f = k.transitionDuration;
                k = k.animationDuration;
                if (b && f === 0 && k === 0) {
                    u.removeClass(e, c);
                    G(e, b);
                    return false;
                }
                c = d || b && f > 0;
                b = k > 0 && s.animationDelay > 0 && s.animationDuration === 0;
                e.data("$$ngAnimateCSS3Data", { stagger: s, cacheKey: k, running: n.running || 0, itemIndex: t, blockTransition: c, closeAnimationFns: n.closeAnimationFns || [] });
                p = g(e);
                if (c) {
                    I(p, true);
                    d && e.css(d);
                }
                if (b) {
                    p.style[K + "PlayState"] = "paused";
                }
                return true;
            }

            function D(a: any, e: any, b: string, c: any, d: any): any {
                function f(): void {
                    e.off(D, h);
                    u.removeClass(e, k);
                    u.removeClass(e, t);
                    z && M.cancel(z);
                    G(e, b);
                    let a = g(e);
                    let c;
                    for (c in s) a.style.removeProperty(s[c]);
                }

                function h(a: Event): void {
                    a.stopPropagation();
                    let b = a as any;
                    a = b.$manualTimeStamp || b.timeStamp || Date.now();
                    b = parseFloat(b.elapsedTime.toFixed(3));
                    if (Math.max(a - H, 0) >= C && b >= x) c();
                }

                let m = g(e);
                a = e.data("$$ngAnimateCSS3Data");
                if (m.getAttribute("class").indexOf(b) !== -1 && a) {
                    let k = "";
                    let t = "";
                    n(b.split(" "), (a: string, b: number): void => {
                        let e = (b > 0 ? " " : "") + a;
                        k += e + "-active";
                        t += e + "-pending";
                    });
                    let s: any[] = [];
                    let q = a.itemIndex;
                    let v = a.stagger;
                    let r = 0;
                    if (q > 0) {
                        r = 0;
                        if (v.transitionDelay > 0 && v.transitionDuration === 0) {
                            r = v.transitionDelay * q;
                        }
                        let y = 0;
                        if (v.animationDelay > 0 && v.animationDuration === 0) {
                            y = v.animationDelay * q;
                            s.push(B + "animation-play-state");
                        }
                        r = Math.round(100 * Math.max(r, y)) / 100;
                    }
                    if (r === 0) {
                        u.addClass(e, k);
                        a.blockTransition && I(m, false);
                    }
                    let F = Z(e, a.cacheKey + " " + k);
                    x = Math.max(F.transitionDuration, F.animationDuration);
                    if (x === 0) {
                        u.removeClass(e, k);
                        G(e, b);
                        c();
                    } else {
                        if (!r && d) {
                            if (F.transitionDuration === 0) {
                                e.css("transition", F.animationDuration + "s linear all");
                                s.push("transition");
                            }
                            e.css(d);
                        }
                        let q = Math.max(F.transitionDelay, F.animationDelay);
                        let C = 1000 * q;
                        if (s.length > 0) {
                            let v = m.getAttribute("style") || "";
                            if (v.charAt(v.length - 1) !== ";") {
                                v += ";";
                            }
                            m.setAttribute("style", v + " ");
                        }
                        let H = Date.now();
                        let D = V + " " + $;
                        let q = 1000 * (r + 1.5 * (q + x));
                        let z: any;
                        if (r > 0) {
                            u.addClass(e, t);
                            z = M((): void => {
                                z = null;
                                if (F.transitionDuration > 0) I(m, false);
                                if (F.animationDuration > 0) {
                                    m.style[K + "PlayState"] = "";
                                }
                                u.addClass(e, k);
                                u.removeClass(e, t);
                                if (d) {
                                    if (F.transitionDuration === 0) {
                                        e.css("transition", F.animationDuration + "s linear all");
                                    }
                                    e.css(d);
                                    s.push("transition");
                                }
                            }, 1000 * r, false);
                        }
                        e.on(D, h);
                        a.closeAnimationFns.push((): void => {
                            f();
                            c();
                        });
                        a.running++;
                        P(e, q);
                        return f;
                    }
                } else c();
            }

            function I(a: any, b: boolean): void {
                a.style[z + "Property"] = b ? "none" : "";
            }

            function S(a: any, b: any, c: any): any {
                if (R(a, b, c, d)) return (a: any): void => {
                    G(b, c);
                };
            }

            function T(a: any, b: any, c: string, d: any, f: any): any {
                if (b.data("$$ngAnimateCSS3Data")) return D(a, b, c, d, f);
                G(b, c);
                d();
            }

            function U(a: any, b: any, c: string, d: any, f: any): any {
                let g = S(a, b, c, f.from);
                if (g) {
                    let h = g;
                    H(b, (): void => {
                        h = T(a, b, c, d, f.to);
                    });
                    return (a: any): void => {
                        (h || t)(a);
                    };
                }
                y();
                d();
            }

            function G(a: any, b: string): void {
                u.removeClass(a, b);
                let c = a.data("$$ngAnimateCSS3Data");
                if (c) {
                    c.running && c.running--;
                    if (c.running && c.running !== 0) return;
                    a.removeData("$$ngAnimateCSS3Data");
                }
            }

            function q(a: string, b: string): string {
                let c = "";
                a = aa(a) ? a : a.split(/\s+/);
                n(a, (a: string, d: number): void => {
                    a && a.length && (c += (d > 0 ? " " : "") + a + b);
                });
                return c;
            }

            let B = "";
            let z = "";
            let $ = "";
            let K = "";
            let V = "";
            if (C.ontransitionend === W && C.onwebkittransitionend !== W) {
                B = "-webkit-";
                z = "WebkitTransition";
                $ = "webkitTransitionEnd transitionend";
            } else {
                z = "transition";
                $ = "transitionend";
            }
            if (C.onanimationend === W && C.onwebkitanimationend !== W) {
                B = "-webkit-";
                K = "WebkitAnimation";
                V = "webkitAnimationEnd animationend";
            } else {
                K = "animation";
                V = "animationend";
            }
            let x: any = {};
            let a = 0;
            let c: any[] = [];
            let b: any;
            let d: any = null;
            let h = 0;
            let k: any[] = [];
            return {
                animate: (a: any, b: string, c: any, d: any, f: any, g: any): any => {
                    g = g || {};
                    g.from = c;
                    g.to = d;
                    return U("animate", a, b, f, g);
                },
                enter: (a: any, b: any, c: any): any => {
                    c = c || {};
                    return U("enter", a, "ng-enter", b, c);
                },
                leave: (a: any, b: any, c: any): any => {
                    c = c || {};
                    return U("leave", a, "ng-leave", b, c);
                },
                move: (a: any, b: any, c: any): any => {
                    c = c || {};
                    return U("move", a, "ng-move", b, c);
                },
                beforeSetClass: (a: any, b: string, c: string, d: any, f: any): any => {
                    f = f || {};
                    b = q(c, "-remove") + " " + q(b, "-add");
                    if (f = S("setClass", a, b, f.from)) return H(a, d), f;
                    y();
                    d();
                },
                beforeAddClass: (a: any, b: string, c: any, d: any): any => {
                    d = d || {};
                    if (b = S("addClass", a, q(b, "-add"), d.from)) return H(a, c), b;
                    y();
                    c();
                },
                beforeRemoveClass: (a: any, b: string, c: any, d: any): any => {
                    d = d || {};
                    if (b = S("removeClass", a, q(b, "-remove"), d.from)) return H(a, c), b;
                    y();
                    c();
                },
                setClass: (a: any, b: string, c: string, d: any, f: any): any => {
                    f = f || {};
                    c = q(c, "-remove");
                    b = q(b, "-add");
                    return T("setClass", a, c + " " + b, d, f.to);
                },
                addClass: (a: any, b: string, c: any, d: any): any => {
                    d = d || {};
                    return T("addClass", a, q(b, "-add"), c, d.to);
                },
                removeClass: (a: any, b: string, c: any, d: any): any => {
                    d = d || {};
                    return T("removeClass", a, q(b, "-remove"), c, d.to);
                }
            };
        }]);
    }]);
})(window, window.angular);