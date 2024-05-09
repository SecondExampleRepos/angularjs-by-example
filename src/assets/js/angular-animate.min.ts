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
            return f(() => {
                g()
            })
        }
    }]).config(["$provide", "$animateProvider", (X: any, C: any): void => {
        const g = (f: HTMLElement[]): HTMLElement | undefined => {
            for (let n = 0; n < f.length; n++) {
                const g = f[n];
                if (g.nodeType === 1) return g;
            }
        };

        const ba = (f: HTMLElement, n: HTMLElement): boolean => g([f]) === g([n]);

        const t = (): void => {};
        const n = (array: any[], callback: Function): void => {
            array.forEach((item) => {
                callback(item);
            });
        };

        const da: { [key: string]: any } = C.$$selectors;
        const aa = Array.isArray;
        const ea = (input: any): input is string => typeof input === 'string';
        const ga = (input: any): input is object => typeof input === 'object' && !Array.isArray(input);
        const r = { running: true };
        let u: any;

        X.decorator("$animate", ["$delegate", "$$q", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", "$templateRequest", "$$jqLite", (O: any, N: any, M: any, Y: any, y: any, H: any, P: any, W: any, Z: any, Q: any): any => {
            const R = (a: any, c: boolean): boolean => {
                const b = a.data("$$ngAnimateState") || {};
                if (c) {
                    b.running = true;
                    b.structural = true;
                    a.data("$$ngAnimateState", b);
                }
                return b.disabled || (b.running && b.structural);
            };

            const D = (a: Function): any => {
                const b = N.defer();
                b.promise.$$cancelFn = (): void => {
                    if (c) c();
                };
                P.$$postDigest(() => {
                    c = a(() => {
                        b.resolve();
                    });
                });
                return b.promise;
            };

            const I = (a: any): any => {
                if (ga(a)) {
                    if (ea(a.tempClasses)) {
                        a.tempClasses = a.tempClasses.split(/\s+/);
                    }
                    return a;
                }
            };

            const S = (a: any, c: any[], b: any): [string, string] | undefined => {
                b = b || {};
                const d: { [key: string]: boolean } = {};
                n(b, (e: any, a: string) => {
                    n(a.split(" "), (a: string) => {
                        d[a] = e;
                    });
                });
                const h: { [key: string]: boolean } = {};
                n((a.attr("class") || "").split(/\s+/), (e: string) => {
                    h[e] = true;
                });
                const f: string[] = [];
                const l: string[] = [];
                n(c && c.classes || [], (e: boolean, a: string) => {
                    const b = h[a];
                    const c = d[a] || {};
                    if (e === false) {
                        if (b || c.event === "addClass") {
                            l.push(a);
                        }
                    } else if (e === true) {
                        if (b && c.event !== "removeClass" || f.push(a));
                    }
                });
                if (f.length + l.length > 0) {
                    return [f.join(" "), l.join(" ")];
                }
            };

            const T = (a: string): any[] => {
                if (a) {
                    const c: any[] = [];
                    const b: { [key: string]: boolean } = {};
                    a = a.substr(1).split(".");
                    if (Y.transitions || Y.animations) {
                        c.push(M.get(da[""]));
                    }
                    for (let d = 0; d < a.length; d++) {
                        const f = a[d];
                        const k = da[f];
                        if (k && !b[f]) {
                            c.push(M.get(k));
                            b[f] = true;
                        }
                    }
                    return c;
                }
            };

            const U = (a: any, c: string, b: any, d: any): any => {
                const h = (e: any, a: string): boolean => {
                    const b = e[a];
                    const c = e["before" + a.charAt(0).toUpperCase() + a.substr(1)];
                    if (b || c) {
                        if (a === "leave") {
                            c = b;
                            b = null;
                        }
                        u.push({ event: a, fn: b });
                        J.push({ event: a, fn: c });
                        return true;
                    }
                };

                const k = (c: any, l: any[], w: Function): void => {
                    const E: any[] = [];
                    n(c, (a: any) => {
                        if (a.fn) E.push(a);
                    });
                    let m = 0;
                    n(E, (c: any, f: number) => {
                        const p = (): void => {
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
                };

                const l = a[0];
                if (l) {
                    d = d || {};
                    d.to = d.to || {};
                    d.from = d.from || {};
                    let e: any, A: any;
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
                    const w = c === "setClass";
                    const E = w || c === "addClass" || c === "removeClass" || c === "animate";
                    const p = a.attr("class") + " " + b;
                    if (x(p)) {
                        const ca = t;
                        const m: any[] = [];
                        const J: any[] = [];
                        const g = t;
                        const s: any[] = [];
                        const u: any[] = [];
                        const p = (" " + p).replace(/\s+/g, ".");
                        n(T(p), (a: any) => {
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
                                k(J, m, () => {
                                    ca = t;
                                    a();
                                });
                            },
                            after: (a: Function): void => {
                                g = a;
                                k(u, s, () => {
                                    g = t;
                                    a();
                                });
                            },
                            cancel: (): void => {
                                if (m) {
                                    n(m, (a: Function) => {
                                        (a || t)(true);
                                    });
                                    ca(true);
                                }
                                if (s) {
                                    n(s, (a: Function) => {
                                        (a || t)(true);
                                    });
                                    g(true);
                                }
                            }
                        };
                    }
                }
            };

            const G = (a: string, c: string, b: any, d: any, h: any, k: Function, l: any): any => {
                const A = (e: string): void => {
                    const l = "$animate:" + e;
                    J && J[l] && J[l].length > 0 && H(() => {
                        b.triggerHandler(l, { event: a, className: c });
                    });
                };

                const w = (): void => {
                    A("before");
                };

                const E = (): void => {
                    A("after");
                };

                const p = (): void => {
                    if (!p.hasBeenRun) {
                        p.hasBeenRun = true;
                        k();
                    }
                };

                const g = (): void => {
                    if (!g.hasBeenRun) {
                        m && m.applyStyles();
                        g.hasBeenRun = true;
                        l && l.tempClasses && n(l.tempClasses, (a: string) => {
                            u.removeClass(b, a);
                        });
                        const w = b.data("$$ngAnimateState");
                        if (w) {
                            if (m && m.isClassBased) {
                                B(b, c);
                            } else {
                                H(() => {
                                    const e = b.data("$$ngAnimateState") || {};
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
                };

                const m = U(b, a, c, l);
                if (!m) return p(), w(), E(), g(), t;
                a = m.event;
                c = m.className;
                const J = f.element._data(m.node);
                const J = J && J.events;
                if (!d) {
                    d = h ? h.parent() : b.parent();
                    if (z(b, d)) return p(), w(), E(), g(), t;
                }
                d = b.data("$$ngAnimateState") || {};
                const L = d.active || {};
                const s = d.totalActive || 0;
                const q = d.last;
                let h = false;
                if (s > 0) {
                    const s: any[] = [];
                    if (m.isClassBased) {
                        if (q.event === "setClass") {
                            s.push(q);
                            B(b, c);
                        } else if (L[c]) {
                            const v = L[c];
                            if (v.event === a) {
                                h = true;
                            } else {
                                s.push(v);
                                B(b, c);
                            }
                        }
                    } else {
                        if (a === "leave" && L["ng-leave"]) {
                            h = true;
                        } else {
                            for (const v in L) {
                                s.push(L[v]);
                            }
                            d = {};
                            B(b, true);
                        }
                    }
                    if (s.length > 0) {
                        n(s, (a: any) => {
                            a.cancel();
                        });
                    }
                }
                if (!m.isClassBased || m.isSetClassOperation || a === "animate" || h) {
                    if (h) return p(), w(), E(), A("close"), e(), t;
                }
                L = d.active || {};
                s = d.totalActive || 0;
                if (a === "leave") {
                    b.one("$destroy", (a: Event) => {
                        const a = f.element(this);
                        const e = a.data("$$ngAnimateState");
                        if (e) {
                            const e = e.active["ng-leave"];
                            if (e) {
                                e.cancel();
                                B(a, "ng-leave");
                            }
                        }
                    });
                }
                u.addClass(b, "ng-animate");
                l && l.tempClasses && n(l.tempClasses, (a: string) => {
                    u.addClass(b, a);
                });
                const fa = K++;
                s++;
                L[c] = m;
                b.data("$$ngAnimateState", { last: m, active: L, index: fa, totalActive: s });
                w();
                m.before((e: boolean) => {
                    const l = b.data("$$ngAnimateState");
                    e = e || !l || !l.active[c] || m.isClassBased && l.active[c].event !== a;
                    p();
                    if (e === true) {
                        g();
                    } else {
                        E();
                        m.after(g);
                    }
                });
                return m.cancel;
            };

            const q = (a: any): void => {
                if (a = g(a)) {
                    a = f.isFunction(a.getElementsByClassName) ? a.getElementsByClassName("ng-animate") : a.querySelectorAll(".ng-animate");
                    n(a, (a: any) => {
                        a = f.element(a);
                        const a = a.data("$$ngAnimateState");
                        if (a && a.active) {
                            n(a.active, (a: any) => {
                                a.cancel();
                            });
                        }
                    });
                }
            };

            const B = (a: any, c: string | boolean, b?: string): void => {
                if (ba(a, y)) {
                    if (!r.disabled) {
                        r.running = false;
                        r.structural = false;
                    }
                } else if (c) {
                    const b = a.data("$$ngAnimateState") || {};
                    const d = c === true;
                    if (!d && b.active && b.active[c]) {
                        b.totalActive--;
                        delete b.active[c];
                    }
                    if (d || !b.totalActive) {
                        u.removeClass(a, "ng-animate");
                        a.removeData("$$ngAnimateState");
                    }
                }
            };

            const z = (a: any, c: any): boolean => {
                if (r.disabled) return true;
                if (ba(a, y)) return r.running;
                let b: boolean | undefined;
                let d: boolean | undefined;
                let g: boolean | undefined;
                do {
                    if (c.length === 0) break;
                    const k = ba(c, y);
                    const l = k ? r : c.data("$$ngAnimateState") || {};
                    if (l.disabled) return true;
                    if (k) g = true;
                    if (b !== false) {
                        const k = c.data("$$ngAnimateChildren");
                        if (f.isDefined(k)) b = k;
                    }
                    d = d || l.running || l.last && !l.last.isClassBased;
                } while (c = c.parent());
                return g && !b && d;
            };

            u = Q;
            y.data("$$ngAnimateState", r);
            const $ = P.$watch(() => {
                return Z.totalPendingRequests;
            }, (a: number, c: number) => {
                if (a === 0) {
                    $();
                    P.$$postDigest(() => {
                        P.$$postDigest(() => {
                            r.running = false;
                        });
                    });
                }
            });
            let K = 0;
            const V = C.classNameFilter();
            const x = V ? (a: string): boolean => {
                return V.test(a);
            } : (): boolean => {
                return true;
            };
            return {
                animate: (a: any, c: string, b: any, d: any, h: any): any => {
                    d = d || "ng-inline-animate";
                    h = I(h) || {};
                    h.from = b ? c : null;
                    h.to = b ? b : c;
                    return D((b: Function) => {
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
                    return D((h: Function) => {
                        return G("enter", "ng-enter", f.element(g(a)), c, b, t, d, h);
                    });
                },
                leave: (a: any, c: any): any => {
                    c = I(c);
                    a = f.element(a);
                    q(a);
                    R(a, true);
                    return D((b: Function) => {
                        return G("leave", "ng-leave", f.element(g(a)), null, null, () => {
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
                    return D((h: Function) => {
                        return G("move", "ng-move", f.element(g(a)), c, b, t, d, h);
                    });
                },
                addClass: (a: any, c: string, b: any): any => {
                    return this.setClass(a, c, [], b);
                },
                removeClass: (a: any, c: string, b: any): any => {
                    return this.setClass(a, [], c, b);
                },
                setClass: (a: any, c: string[], b: string[], d: any): any => {
                    d = I(d);
                    a = f.element(a);
                    a = f.element(g(a));
                    if (R(a)) return O.$$setClassImmediately(a, c, b, d);
                    let h: any;
                    let k = a.data("$$animateClasses");
                    const l = !!k;
                    if (!k) {
                        k = { classes: {} };
                    }
                    h = k.classes;
                    c = aa(c) ? c : c.split(" ");
                    n(c, (a: string) => {
                        if (a && a.length) {
                            h[a] = true;
                        }
                    });
                    b = aa(b) ? b : b.split(" ");
                    n(b, (a: string) => {
                        if (a && a.length) {
                            h[a] = false;
                        }
                    });
                    if (l) {
                        if (d && k.options) {
                            k.options = f.extend(k.options || {}, d);
                        }
                        return k.promise;
                    }
                    a.data("$$animateClasses", k = { classes: h, options: d });
                    return k.promise = D((e: Function) => {
                        const l = a.parent();
                        const b = g(a);
                        const c = b.parentNode;
                        if (!c || c.$$NG_REMOVED || b.$$NG_REMOVED) {
                            e();
                        } else {
                            b = a.data("$$animateClasses");
                            a.removeData("$$animateClasses");
                            const c = a.data("$$ngAnimateState") || {};
                            const d = S(a, b, c.active);
                            if (d) {
                                return G("setClass", d, a, l, null, () => {
                                    d[0] && O.$$addClassImmediately(a, d[0]);
                                    d[1] && O.$$removeClassImmediately(a, d[1]);
                                }, b.options, e);
                            }
                            return e();
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
                                const b = c.data("$$ngAnimateState") || {};
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
            const y = (): void => {
                if (!b) {
                    b = Y(() => {
                        c = [];
                        b = null;
                        x = {};
                    });
                }
            };

            const H = (a: any, e: Function): void => {
                if (b) b();
                c.push(e);
                b = Y(() => {
                    n(c, (a: Function) => {
                        a();
                    });
                    c = [];
                    b = null;
                    x = {};
                });
            };

            const P = (a: any, e: number): void => {
                const b = g(a);
                a = f.element(b);
                k.push(a);
                const b = Date.now() + e;
                if (b <= h) {
                    M.cancel(d);
                    h = b;
                    d = M(() => {
                        X(k);
                        k = [];
                    }, e, false);
                }
            };

            const X = (a: any[]): void => {
                n(a, (a: any) => {
                    const a = a.data("$$ngAnimateCSS3Data");
                    if (a) {
                        n(a.closeAnimationFns, (a: Function) => {
                            a();
                        });
                    }
                });
            };

            const Z = (a: any, e: string): any => {
                const b = e ? x[e] : null;
                if (!b) {
                    let c = 0;
                    let d = 0;
                    let f = 0;
                    let g = 0;
                    n(a, (a: any) => {
                        if (a.nodeType === 1) {
                            const a = r.getComputedStyle(a) || {};
                            c = Math.max(Q(a[z + "Duration"]), c);
                            d = Math.max(Q(a[z + "Delay"]), d);
                            g = Math.max(Q(a[K + "Delay"]), g);
                            const e = Q(a[K + "Duration"]);
                            if (e > 0) {
                                e *= parseInt(a[K + "IterationCount"], 10) || 1;
                                f = Math.max(e, f);
                            }
                        }
                    });
                    b = { total: 0, transitionDelay: d, transitionDuration: c, animationDelay: g, animationDuration: f };
                    if (e) {
                        x[e] = b;
                    }
                }
                return b;
            };

            const Q = (a: string): number => {
                let e = 0;
                a = ea(a) ? a.split(/\s*,\s*/) : [];
                n(a, (a: string) => {
                    e = Math.max(parseFloat(a) || 0, e);
                });
                return e;
            };

            const R = (b: any, e: any, c: string, d: any): boolean => {
                b = 0 <= ["ng-enter", "ng-leave", "ng-move"].indexOf(c);
                let f: any;
                let p = e.parent();
                let h = p.data("$$ngAnimateKey");
                if (!h) {
                    p.data("$$ngAnimateKey", ++a);
                    h = a;
                }
                const f = h + "-" + g(e).getAttribute("class");
                const p = f + " " + c;
                const h = x[p] ? ++x[p].total : 0;
                let m: any = {};
                if (h > 0) {
                    const n = c + "-stagger";
                    const m = f + " " + n;
                    const f = !x[m];
                    u.addClass(e, n);
                    m = Z(e, m);
                    f && u.removeClass(e, n);
                }
                u.addClass(e, c);
                const n = e.data("$$ngAnimateCSS3Data") || {};
                const k = Z(e, p);
                f = k.transitionDuration;
                k = k.animationDuration;
                if (b && f === 0 && k === 0) {
                    u.removeClass(e, c);
                    G(e, b);
                    d();
                } else {
                    if (!h && d) {
                        if (k.transitionDuration === 0) {
                            e.css("transition", k.animationDuration + "s linear all");
                            s.push("transition");
                        }
                        e.css(d);
                    }
                    const q = Math.max(k.transitionDelay, k.animationDelay);
                    const C = 1000 * q;
                    if (s.length > 0) {
                        const v = m.getAttribute("style") || "";
                        if (v.charAt(v.length - 1) !== ";") {
                            v += ";";
                        }
                        m.setAttribute("style", v + " ");
                    }
                    const H = Date.now();
                    const D = V + " " + $;
                    const q = 1000 * (h + 1.5 * (q + k));
                    let z: any;
                    if (h > 0) {
                        u.addClass(e, t);
                        z = M(() => {
                            z = null;
                            if (k.transitionDuration > 0) I(m, false);
                            if (k.animationDuration > 0) m.style[K + "PlayState"] = "";
                            u.addClass(e, k);
                            u.removeClass(e, t);
                            if (d) {
                                if (k.transitionDuration === 0) e.css("transition", k.animationDuration + "s linear all");
                                e.css(d);
                                s.push("transition");
                            }
                        }, 1000 * h, false);
                    }
                    e.on(D, h);
                    a.closeAnimationFns.push(() => {
                        f();
                        d();
                    });
                    a.running++;
                    P(e, q);
                    return f;
                }
            };

            const D = (a: any, e: any, b: string, c: any, d: any): any => {
                if (e.data("$$ngAnimateCSS3Data")) return D(a, e, b, c, d);
                G(e, b);
                c();
                d();
            };

            const I = (a: HTMLElement, b: boolean): void => {
                a.style[z + "Property"] = b ? "none" : "";
            };

            const S = (a: any, b: any, c: string, d: any): Function | undefined => {
                if (R(a, b, c, d)) return (a: any): void => {
                    a && G(b, c);
                };
            };

            const T = (a: any, b: any, c: string, d: any, f: any): void => {
                if (b.data("$$ngAnimateCSS3Data")) return D(a, b, c, d, f);
                G(b, c);
                d();
            };

            const U = (a: any, b: any, c: string, d: any, f: any): void => {
                const g = S(a, b, c, f.from);
                if (g) {
                    const h = g;
                    H(b, () => {
                        h = T(a, b, c, d, f.to);
                    });
                    return (a: any): void => {
                        (h || t)(a);
                    };
                }
                y();
                d();
            };

            const G = (a: any, b: string): void => {
                u.removeClass(a, b);
                const c = a.data("$$ngAnimateCSS3Data");
                if (c) {
                    c.running && c.running--;
                    if (c.running && c.running !== 0) return;
                    a.removeData("$$ngAnimateCSS3Data");
                }
            };

            const q = (a: string[], b: string): string => {
                let c = "";
                a = aa(a) ? a : a.split(/\s+/);
                n(a, (a: string, d: number) => {
                    a && a.length && (c += (d > 0 ? " " : "") + a + b);
                });
                return c;
            };

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
            let x: { [key: string]: any } = {};
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
                beforeSetClass: (a: any, b: string[], c: string[], d: any, f: any): void => {
                    f = f || {};
                    b = q(c, "-remove") + " " + q(b, "-add");
                    if (f = S("setClass", a, b, f.from)) {
                        H(a, d);
                        f;
                    }
                    y();
                    d();
                },
                beforeAddClass: (a: any, b: string, c: any, d: any): void => {
                    d = d || {};
                    if (b = S("addClass", a, q(b, "-add"), d.from)) {
                        H(a, c);
                        b;
                    }
                    y();
                    c();
                },
                beforeRemoveClass: (a: any, b: string, c: any, d: any): void => {
                    d = d || {};
                    if (b = S("removeClass", a, q(b, "-remove"), d.from)) {
                        H(a, c);
                        b;
                    }
                    y();
                    c();
                },
                setClass: (a: any, b: string[], c: string[], d: any, f: any): void => {
                    f = f || {};
                    c = q(c, "-remove");
                    b = q(b, "-add");
                    return T("setClass", a, c + " " + b, d, f.to);
                },
                addClass: (a: any, b: string, c: any, d: any): void => {
                    d = d || {};
                    return T("addClass", a, q(b, "-add"), c, d.to);
                },
                removeClass: (a: any, b: string, c: any, d: any): void => {
                    d = d || {};
                    return T("removeClass", a, q(b, "-remove"), c, d.to);
                }
            };
        }]);
    }]);
})(window, window.angular);