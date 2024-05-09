/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p: Window, f: any, n: any): void {
    'use strict';
    f.module("ngCookies", ["ng"]).factory("$cookies", ["$rootScope", "$browser", function(e: any, b: any): any {
        interface CookieMap {
            [key: string]: string;
        }

        let c: CookieMap = {};
        let g: CookieMap = {};
        let h: string;
        let k: boolean = false;
        let l = f.copy;
        let m = f.isUndefined;

        b.addPollFn(function(): void {
            let a: string = b.cookies();
            if (h !== a) {
                h = a;
                l(a, g);
                l(a, c);
                if (k) {
                    e.$apply();
                }
            }
        })();
        k = true;

        e.$watch(function(): void {
            let a: string;
            let d: string;
            let e: boolean;
            for (a in g) {
                if (m(c[a])) {
                    b.cookies(a, n);
                }
            }
            for (a in c) {
                let d: string = c[a];
                if (!f.isString(d)) {
                    d = "" + d;
                    c[a] = d;
                }
                if (d !== g[a]) {
                    b.cookies(a, d);
                    e = true;
                }
            }
            if (e) {
                for (a in d = b.cookies(), c) {
                    if (c[a] !== d[a]) {
                        if (m(d[a])) {
                            delete c[a];
                        } else {
                            c[a] = d[a];
                        }
                    }
                }
            }
        });
        return c;
    }]).factory("$cookieStore", ["$cookies", function(e: any): any {
        return {
            get: function(b: string): any {
                let result = e[b];
                return result ? f.fromJson(result) : result;
            },
            put: function(b: string, c: any): void {
                e[b] = f.toJson(c);
            },
            remove: function(b: string): void {
                delete e[b];
            }
        };
    }]);
})(window, window.angular);