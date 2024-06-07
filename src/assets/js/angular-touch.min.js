/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(y: Window, u: angular.IAngularStatic, z: any) {
    'use strict';

    type SwipeEvent = 'start' | 'move' | 'end' | 'cancel';

    interface SwipeHandlers {
        start?: (coords: Coordinates, event: Event) => void;
        move?: (coords: Coordinates, event: Event) => void;
        end?: (coords: Coordinates, event: Event) => void;
        cancel?: (event: Event) => void;
    }

    interface Coordinates {
        x: number;
        y: number;
    }

    function s(h: string, k: number, p: string) {
        n.directive(h, ["$parse", "$swipe", function(d: angular.IParseService, e: any) {
            return function(l: angular.IScope, m: JQLite, f: angular.IAttributes) {
                function g(a: Coordinates) {
                    if (!c) return false;
                    const b = Math.abs(a.y - c.y);
                    a = (a.x - c.x) * k;
                    return q && 75 > b && 0 < a && 30 < a && 0.3 > b / a;
                }
                const b = d(f[h]);
                let c: Coordinates | null = null;
                let q = false;
                const a = ["touch"];
                u.isDefined(f.ngSwipeDisableMouse) || a.push("mouse");
                e.bind(m, {
                    start: function(a: Coordinates, b: Event) {
                        c = a;
                        q = true;
                    },
                    cancel: function(a: Event) {
                        q = false;
                    },
                    end: function(a: Coordinates, c: Event) {
                        g(a) && l.$apply(function() {
                            m.triggerHandler(p);
                            b(l, { $event: c });
                        });
                    }
                }, a);
            };
        }]);
    }

    const n = u.module("ngTouch", []);
    n.factory("$swipe", [function() {
        function h(d: any): Coordinates {
            const e = d.touches && d.touches.length ? d.touches : [d];
            d = d.changedTouches && d.changedTouches[0] || d.originalEvent && d.originalEvent.changedTouches && d.originalEvent.changedTouches[0] || e[0].originalEvent || e[0];
            return { x: d.clientX, y: d.clientY };
        }

        function k(d: string[], e: SwipeEvent): string {
            const l: string[] = [];
            u.forEach(d, function(d) {
                const event = p[d][e];
                if (event) l.push(event);
            });
            return l.join(" ");
        }

        const p: { [key: string]: { [key in SwipeEvent]?: string } } = {
            mouse: { start: "mousedown", move: "mousemove", end: "mouseup" },
            touch: { start: "touchstart", move: "touchmove", end: "touchend", cancel: "touchcancel" }
        };

        return {
            bind: function(d: JQLite, e: SwipeHandlers, l: string[] = ["mouse", "touch"]) {
                let m: number, f: number, g: Coordinates, b: Coordinates, c = false;
                d.on(k(l, "start"), function(a: Event) {
                    g = h(a);
                    c = true;
                    f = m = 0;
                    b = g;
                    e.start && e.start(g, a);
                });

                const q = k(l, "cancel");
                if (q) d.on(q, function(a: Event) {
                    c = false;
                    e.cancel && e.cancel(a);
                });

                d.on(k(l, "move"), function(a: Event) {
                    if (c && g) {
                        const d = h(a);
                        m += Math.abs(d.x - b.x);
                        f += Math.abs(d.y - b.y);
                        b = d;
                        if (10 > m && 10 > f) return;
                        if (f > m) {
                            c = false;
                            e.cancel && e.cancel(a);
                        } else {
                            a.preventDefault();
                            e.move && e.move(d, a);
                        }
                    }
                });

                d.on(k(l, "end"), function(a: Event) {
                    if (c) {
                        c = false;
                        e.end && e.end(h(a), a);
                    }
                });
            }
        };
    }]);

    n.config(["$provide", function(h: angular.auto.IProvideService) {
        h.decorator("ngClickDirective", ["$delegate", function(k: any[]) {
            k.shift();
            return k;
        }]);
    }]);

    n.directive("ngClick", ["$parse", "$timeout", "$rootElement", function(h: angular.IParseService, k: angular.ITimeoutService, p: JQLite) {
        function d(b: number[], c: number, d: number): boolean {
            for (let a = 0; a < b.length; a += 2) {
                const e = b[a + 1];
                if (25 > Math.abs(b[a] - c) && 25 > Math.abs(e - d)) {
                    b.splice(a, a + 2);
                    return true;
                }
            }
            return false;
        }

        function e(b: Event) {
            if (!(2500 < Date.now() - m)) {
                const c = b.touches && b.touches.length ? b.touches : [b];
                const e = c[0].clientX;
                const cY = c[0].clientY;
                if (1 > e && 1 > cY || g && g[0] === e && g[1] === cY) return;
                if (g) g = null;
                if ("label" === b.target.tagName.toLowerCase()) g = [e, cY];
                if (!d(f, e, cY)) {
                    b.stopPropagation();
                    b.preventDefault();
                    if (b.target) b.target.blur();
                }
            }
        }

        function l(b: Event) {
            const c = b.touches && b.touches.length ? b.touches : [b];
            const d = c[0].clientX;
            const e = c[0].clientY;
            f.push(d, e);
            k(function() {
                for (let a = 0; a < f.length; a += 2) {
                    if (f[a] === d && f[a + 1] === e) {
                        f.splice(a, a + 2);
                        break;
                    }
                }
            }, 2500, false);
        }

        let m: number;
        let f: number[] | null = null;
        let g: number[] | null = null;

        return function(b: angular.IScope, c: JQLite, g: angular.IAttributes) {
            function a() {
                n = false;
                c.removeClass("ng-click-active");
            }

            const k = h(g.ngClick);
            let n = false;
            let r: HTMLElement | null = null;
            let s: number;
            let v: number;
            let w: number;

            c.on("touchstart", function(a: Event) {
                n = true;
                r = a.target ? a.target as HTMLElement : a.srcElement as HTMLElement;
                if (r.nodeType === 3) r = r.parentNode as HTMLElement;
                c.addClass("ng-click-active");
                s = Date.now();
                const touches = a.touches && a.touches.length ? a.touches : [a];
                const touch = touches[0].originalEvent || touches[0];
                v = touch.clientX;
                w = touch.clientY;
            });

            c.on("touchmove", function() {
                a();
            });

            c.on("touchcancel", function() {
                a();
            });

            c.on("touchend", function(b: Event) {
                const k = Date.now() - s;
                const h = b.changedTouches && b.changedTouches.length ? b.changedTouches : b.touches && b.touches.length ? b.touches : [b];
                const t = h[0].originalEvent || h[0];
                const hX = t.clientX;
                const tY = t.clientY;
                const x = Math.sqrt(Math.pow(hX - v, 2) + Math.pow(tY - w, 2));
                if (n && 750 > k && 12 > x) {
                    if (!f) {
                        p[0].addEventListener("click", e, true);
                        p[0].addEventListener("touchstart", l, true);
                        f = [];
                    }
                    m = Date.now();
                    d(f, hX, tY);
                    if (r) r.blur();
                    if (u.isDefined(g.disabled) && g.disabled !== false) {
                        c.triggerHandler("click", [b]);
                    }
                }
                a();
            });

            c.onclick = function() {};

            c.on("click", function(a: Event, c: Event) {
                b.$apply(function() {
                    k(b, { $event: c || a });
                });
            });

            c.on("mousedown", function() {
                c.addClass("ng-click-active");
            });

            c.on("mousemove mouseup", function() {
                c.removeClass("ng-click-active");
            });
        };
    }]);

    s("ngSwipeLeft", -1, "swipeleft");
    s("ngSwipeRight", 1, "swiperight");
})(window, window.angular);