/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(y: Window, u: angular.IAngularStatic, z: any): void {
    'use strict';
    function s(h: string, k: number, p: string): void {
        n.directive(h, ["$parse", "$swipe", (d: angular.IParseService, e: any): angular.IDirective => {
            return (l: angular.IScope, m: JQLite, f: angular.IAttributes): void => {
                function g(a: any): boolean {
                    if (!c) return false;
                    const b: number = Math.abs(a.y - c.y);
                    const aX: number = (a.x - c.x) * k;
                    return q && 75 > b && 0 < aX && 30 < aX && .3 > b / aX;
                }
                let b: angular.ICompiledExpression = d(f[h]);
                let c: any, q: boolean, a: string[] = ["touch"];
                if (!u.isDefined(f.ngSwipeDisableMouse)) a.push("mouse");
                e.bind(m, {
                    start: function(a: any, b: any): void {
                        c = a;
                        q = true;
                    },
                    cancel: function(a: any): void {
                        q = false;
                    },
                    end: function(a: any, c: any): void {
                        if (g(a)) l.$apply((): void => {
                            m.triggerHandler(p);
                            b(l, { $event: c });
                        });
                    }
                }, a);
            }
        }])
    }
    const n: angular.IModule = u.module("ngTouch", []);
    n.factory("$swipe", [(): any => {
        function h(d: any): { x: number, y: number } {
            const e: any[] = d.touches && d.touches.length ? d.touches : [d];
            const dChanged: any = d.changedTouches && d.changedTouches[0] || d.originalEvent && d.originalEvent.changedTouches && d.originalEvent.changedTouches[0] || e[0].originalEvent || e[0];
            return { x: dChanged.clientX, y: dChanged.clientY };
        }
        function k(d: string[], e: string): string {
            const l: string[] = [];
            u.forEach(d, (d: string): void => {
                const dEvent: string | undefined = p[d][e];
                if (dEvent) l.push(dEvent);
            });
            return l.join(" ");
        }
        const p: { [key: string]: { [key: string]: string } } = {
            mouse: { start: "mousedown", move: "mousemove", end: "mouseup" },
            touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" }
        };
        return {
            bind: function(d: JQLite, e: any, l: string[] = ["mouse", "touch"]): void {
                let m: number, f: number, g: { x: number, y: number }, b: { x: number, y: number };
                let c: boolean = false;
                d.on(k(l, "start"), (a: any): void => {
                    g = h(a);
                    c = true;
                    f = m = 0;
                    b = g;
                    if (e.start) e.start(g, a);
                });
                const q: string = k(l, "cancel");
                if (q) d.on(q, (a: any): void => {
                    c = false;
                    if (e.cancel) e.cancel(a);
                });
                d.on(k(l, "move"), (a: any): void => {
                    if (c && g) {
                        const d: { x: number, y: number } = h(a);
                        m += Math.abs(d.x - b.x);
                        f += Math.abs(d.y - b.y);
                        b = d;
                        if (10 < m && 10 < f) {
                            if (f > m) {
                                c = false;
                                if (e.cancel) e.cancel(a);
                            } else {
                                a.preventDefault();
                                if (e.move) e.move(d, a);
                            }
                        }
                    }
                });
                d.on(k(l, "end"), (a: any): void => {
                    if (c) {
                        c = false;
                        if (e.end) e.end(h(a), a);
                    }
                });
            }
        };
    }]);
    n.config(["$provide", (h: angular.auto.IProvideService): void => {
        h.decorator("ngClickDirective", ["$delegate", (k: angular.IDirective[]): angular.IDirective[] => {
            k.shift();
            return k;
        }]);
    }]);
    n.directive("ngClick", ["$parse", "$timeout", "$rootElement", (h: angular.IParseService, k: angular.ITimeoutService, p: JQLite): angular.IDirective => {
        function d(b: number[], c: number, d: number): boolean {
            for (let a: number = 0; a < b.length; a += 2) {
                const e: number = b[a + 1], f: number = d;
                if (25 > Math.abs(b[a] - c) && 25 > Math.abs(e - f)) {
                    b.splice(a, a + 2);
                    return true;
                }
            }
            return false;
        }
        function e(b: TouchEvent): void {
            if (!(2500 < Date.now() - m)) {
                const c: TouchList = b.touches && b.touches.length ? b.touches : [b as any];
                const e: number = c[0].clientX, cY: number = c[0].clientY;
                if (1 < e && 1 < cY || g && g[0] === e && g[1] === cY) {
                    if (g) {
                        g = null;
                    } else if ("label" === b.target.tagName.toLowerCase()) {
                        g = [e, cY];
                    }
                    if (!d(f, e, cY)) {
                        b.stopPropagation();
                        b.preventDefault();
                        if (b.target) b.target.blur();
                    }
                }
            }
        }
        function l(b: TouchEvent): void {
            const c: TouchList = b.touches && b.touches.length ? b.touches : [b as any];
            const cX: number = c[0].clientX, d: number = c[0].clientY;
            f.push(cX, d);
            k((): void => {
                for (let a: number = 0; a < f.length; a += 2) {
                    if (f[a] == cX && f[a + 1] == d) {
                        f.splice(a, a + 2);
                        break;
                    }
                }
            }, 2500, false);
        }
        let m: number, f: number[], g: number[];
        return (b: angular.IScope, c: JQLite, g: angular.IAttributes): void => {
            function a(): void {
                n = false;
                c.removeClass("ng-click-active");
            }
            const k: angular.ICompiledExpression = h(g.ngClick);
            let n: boolean = false, r: Element, s: number, v: number, w: number;
            c.on("touchstart", (a: TouchEvent): void => {
                n = true;
                r = a.target ? a.target : a.srcElement;
                if (3 == r.nodeType) r = r.parentNode as Element;
                c.addClass("ng-click-active");
                s = Date.now();
                const aTouches: TouchList = a.touches && a.touches.length ? a.touches : [a as any];
                const aOriginal: any = aTouches[0].originalEvent || aTouches[0];
                v = aOriginal.clientX;
                w = aOriginal.clientY;
            });
            c.on("touchmove", (c: TouchEvent): void => {
                a();
            });
            c.on("touchcancel", (c: TouchEvent): void => {
                a();
            });
            c.on("touchend", (b: TouchEvent): void => {
                const k: number = Date.now() - s;
                const bChanged: TouchList = b.changedTouches && b.changedTouches.length ? b.changedTouches : b.touches && b.touches.length ? b.touches : [b as any];
                const bOriginal: any = bChanged[0].originalEvent || bChanged[0];
                const h: number = bOriginal.clientX, t: number = bOriginal.clientY;
                const x: number = Math.sqrt(Math.pow(h - v, 2) + Math.pow(t - w, 2));
                if (n && 750 > k && 12 > x) {
                    if (!f) {
                        p[0].addEventListener("click", e, true);
                        p[0].addEventListener("touchstart", l, true);
                        f = [];
                    }
                    m = Date.now();
                    d(f, h, t);
                    if (r) r.blur();
                    if (u.isDefined(g.disabled) && false !== g.disabled) c.triggerHandler("click", [b]);
                }
                a();
            });
            c.onclick = function(a: MouseEvent): void {};
            c.on("click", (a: MouseEvent, c: any): void => {
                b.$apply((): void => {
                    k(b, { $event: c || a });
                });
            });
            c.on("mousedown", (a: MouseEvent): void => {
                c.addClass("ng-click-active");
            });
            c.on("mousemove mouseup", (a: MouseEvent): void => {
                c.removeClass("ng-click-active");
            });
        }
    }]);
    s("ngSwipeLeft", -1, "swipeleft");
    s("ngSwipeRight", 1, "swiperight");
})(window, window.angular);