/*
 AngularJS v1.3.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p: Window, f: angular.IAngularStatic, n: any) {
    'use strict';

    interface ICookieStore {
        get(key: string): any;
        put(key: string, value: any): void;
        remove(key: string): void;
    }

    interface ICookies {
        [key: string]: string;
    }

    f.module("ngCookies", ["ng"]).factory("$cookies", ["$rootScope", "$browser", function(e: angular.IRootScopeService, b: any): ICookies {
        let c: ICookies = {};
        let g: ICookies = {};
        let h: string;
        let k: boolean = false;
        const l = f.copy;
        const m = f.isUndefined;

        b.addPollFn(function() {
            const a = b.cookies();
            if (h !== a) {
                h = a;
                l(a, g);
                l(a, c);
                if (k) e.$apply();
            }
        })();

        k = true;

        e.$watch(function() {
            let a: string;
            let d: string;
            let e: boolean;

            for (a in g) {
                if (m(c[a])) b.cookies(a, n);
            }

            for (a in c) {
                d = c[a];
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
                const d = b.cookies();
                for (a in c) {
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
    }]).factory("$cookieStore", ["$cookies", function(e: ICookies): ICookieStore {
        return {
            get: function(b: string) {
                return (b = e[b]) ? f.fromJson(b) : b;
            },
            put: function(b: string, c: any) {
                e[b] = f.toJson(c);
            },
            remove: function(b: string) {
                delete e[b];
            }
        };
    }]);
})(window, window.angular);