/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p: Window, f: any, n: any): void {
    'use strict';
    f.module("ngCookies", ["ng"]).factory("$cookies", ["$rootScope", "$browser", function(e: any, b: any): any {
        type CookieRecord = Record<string, string>;
        let c: CookieRecord = {};
        let g: CookieRecord = {};
        let h: string;
        let k: boolean = false;
        const l = f.copy;
        const m = f.isUndefined;
        b.addPollFn(function(): void {
            let a: string = b.cookies();
            if (h !== a) {
                h = a;
                l(a, g);
                l(a, c);
                if (k) e.$apply();
            }
        })();
        k = true;
        e.$watch(function(): void {
            let a: string, d: CookieRecord, e: boolean;
            for (a in g) if (m(c[a])) b.cookies(a, n);
            for (a in c) {
                let d: string = c[a];
                if (!f.isString(d)) d = "" + d;
                c[a] = d;
                if (d !== g[a]) {
                    b.cookies(a, d);
                    e = true;
                }
            }
            if (e) {
                d = b.cookies();
                for (a in c) {
                    if (c[a] !== d[a]) {
                        if (m(d[a])) delete c[a];
                        else c[a] = d[a];
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