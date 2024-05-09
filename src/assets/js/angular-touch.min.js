/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(y: Window, u: angular.IAngularStatic, z: any): void {
    'use strict';
    function s(h: string, k: number, p: string): void {
        n.directive(h, ["$parse", "$swipe", (d: angular.IParseService, e: any): angular.IDirectiveLinkFn => {
            return (l: angular.IScope, m: JQLite, f: angular.IAttributes): void => {
                function g(a: any): boolean {
                    if (!c) return false;
                    const b: number = Math.abs(a.y - c.y);
                    const aX: number = (a.x - c.x) * k;
                    return q && 75 > b && 0 < aX && 30 < aX && .3 > b / aX;
                }
                let b: angular.ICompiledExpression = d(f[h]);
                let c: any, q: boolean;
                const a: string[] = ["touch"];
                u.isDefined(f.ngSwipeDisableMouse) || a.push("mouse");
                e.bind(m, {
                    start: (a: any, b: any) => {
                        c = a;
                        q = true;
                    },
                    cancel: (a: any) => {
                        q = false;
                    },
                    end: (a: any, c: any) => {
                        if (g(a)) {
                            l.$apply(() => {
                                m.triggerHandler(p);
                                b(l, { $event: c });
                            });
                        }
                    }
                }, a);
            }
        }])
    }
    const n: angular.IModule = u.module("ngTouch", []);
    n.factory("$swipe", [(): any => {
        function h(d: any): { x: number; y: number } {
            const e: TouchList = d.touches && d.touches.length ? d.touches : [d];
            const dChanged: Touch = d.changedTouches && d.changedTouches[0] || d.originalEvent && d.originalEvent.changedTouches && d.originalEvent.changedTouches[0] || e[0].originalEvent || e[0];
            return { x: dChanged.clientX, y: dChanged.clientY };
        }
        function k(d: string[], e: string): string {
            const l: string[] = [];
            u.forEach(d, (d: string) => {
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
            bind: (d: JQLite, e: any, l: string[] = ["mouse", "touch"]): void => {
                let m: number, f: number, g: { x: number; y: number }, b: { x: number; y: number };
                let c: boolean = false;
                const q: string = k(l, "start");
                d.on(q, (a: any) => {
                    g = h(a);
                    c = true;
                    f = m = 0;
                    b = g;
                    if (e.start) e.start(g, a);
                });
                const r: string = k(l, "cancel");
                if (r) d.on(r, (a: any) => {
                    c = false;
                    if (e.cancel) e.cancel(a);
                });
                d.on(k(l, "move"), (a: any) => {
                    if (c && g) {
                        const d: { x: number; y: number } = h(a);
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
                d.on(k(l, "end"), (a: any) => {
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
    n.directive("ngClick", ["$parse", "$timeout", "$rootElement", (h: angular.IParseService, k: angular.ITimeoutService, p: JQLite): angular.IDirectiveFactory => {
        function d(b: number[], c: number, d: number): boolean {
            for (let a: number = 0; a < b.length; a += 2) {
                const e: number = b[a + 1];
                const f: number = d;
                if (25 > Math.abs(b[a] - c) && 25 > Math.abs(e - f)) {
                    b.splice(a, a + 2);
                    return true;
                }
            }
            return false;
        }
        function e(b: TouchEvent): void {
            if (!(2500 < Date.now() - m)) {
                const c: TouchList = b.touches && b.touches.length ? b.touches : [b];
                const e: number = c[0].clientX;
                const cY: number = c[0].clientY;
                if (1 < e && 1 < cY || g && g[0] === e && g[1] === cY) {
                    if (!g) {
                        if ("label" === b.target.tagName.toLowerCase()) {
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
        }
        function l(b: TouchEvent): void {
            const bTouches: TouchList = b.touches && b.touches.length ? b.touches : [b];
            const cX: number = bTouches[0].clientX;
            const dY: number = bTouches[0].clientY;
            f.push(cX, dY);
            k(() => {
                for (let a: number = 0; a < f.length; a += 2) {
                    if (f[a] == cX && f[a + 1] == dY) {
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
            let n: boolean = false;
            let r: Element, s: number, v: number, w: number;
            c.on("touchstart", (a: TouchEvent) => {
                n = true;
                r = a.target ? a.target : a.srcElement;
                if (3 == r.nodeType) {
                    r = r.parentNode as Element;
                }
                c.addClass("ng-click-active");
                s = Date.now();
                const aTouches: TouchList = a.touches && a.touches.length ? a.touches : [a];
                const aEvent: Touch = aTouches[0].originalEvent || aTouches[0];
                v = aEvent.clientX;
                w = aEvent.clientY;
            });
            c.on("touchmove", (c: TouchEvent) => {
                a();
            });
            c.on("touchcancel", (c: TouchEvent) => {
                a();
            });
            c.on("touchend", (b: TouchEvent) => {
                const k: number = Date.now() - s;
                const bChangedTouches: TouchList = b.changedTouches && b.changedTouches.length ? b.changedTouches : b.touches && b.touches.length ? b.touches : [b];
                const bEvent: Touch = bChangedTouches[0].originalEvent || bChangedTouches[0];
                const h: number = bEvent.clientX;
                const t: number = bEvent.clientY;
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
                    if (u.isDefined(g.disabled) && false !== g.disabled) {
                        c.triggerHandler("click", [b]);
                    }
                }
                a();
            });
            c.onclick = (a: MouseEvent): void => {};
            c.on("click", (a: MouseEvent, c: any) => {
                b.$apply(() => {
                    k(b, { $event: c || a });
                });
            });
            c.on("mousedown", (a: MouseEvent) => {
                c.addClass("ng-click-active");
            });
            c.on("mousemove mouseup", (a: MouseEvent) => {
                c.removeClass("ng-click-active");
            });
        };
    }]);
    s("ngSwipeLeft", -1, "swipeleft");
    s("ngSwipeRight", 1, "swiperight");
})(window, window.angular);