//! moment.js
//! version : 2.8.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a: any) {
    function b(a: any, b: any, c?: any): any {
        switch (arguments.length) {
            case 2:
                return a != null ? a : b;
            case 3:
                return a != null ? a : b != null ? b : c;
            default:
                throw new Error("Implement me");
        }
    }
    function c(a: any, b: any): boolean {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    function d(): ParsingFlags {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        };
    }
    function e(a: string): void {
        if (tb.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + a);
        }
    }
    function f(a: string, b: Function): Function {
        let c = true;
        return function() {
            if (c) {
                e(a);
                c = false;
            }
            return b.apply(this, arguments);
        };
01     }
03     function g(a: string, b: string): void {
05         if (!qc[a]) {
07             e(b);
09             qc[a] = true;
11         }
13     }
15     function h(a: Function, b: string): Function {
17         return function(c: any) {
19             return p(a.call(this, c), b);
21         };
23     }
25     function i(a: Function, b: string): Function {
27         return function(c: any) {
29             return this.localeData().ordinal(a.call(this, c), b);
31         };
33     }
35     function j() {}
37     function k(a: any, b: boolean): void {
39         if (b !== false) {
41             F(a);
43         }
45         n(this, a);
47         this._d = new Date(+a._d);
49     }
51     function l(a: any): void {
53         const b = y(a);
55         const c = b.year || 0;
57         const d = b.quarter || 0;
59         const e = b.month || 0;
61         const f = b.week || 0;
63         const g = b.day || 0;
65         const h = b.hour || 0;
67         const i = b.minute || 0;
69         const j = b.second || 0;
71         const k = b.millisecond || 0;
73         this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h;
75         this._days = +g + 7 * f;
77         this._months = +e + 3 * d + 12 * c;
79         this._data = {};
81         this._locale = tb.localeData();
83         this._bubble();
85     }
87     function m(a: any, b: any): any {
89         for (const d in b) {
91             if (c(b, d)) {
93                 a[d] = b[d];
95             }
97         }
99         if (c(b, "toString")) {
01             a.toString = b.toString;
03         }
05         if (c(b, "valueOf")) {
07             a.valueOf = b.valueOf;
09         }
11         return a;
13     }
15     function n(a: any, b: any): any {
17         let c, d, e;
19         if (typeof b._isAMomentObject !== "undefined") {
21             a._isAMomentObject = b._isAMomentObject;
23         }
25         if (typeof b._i !== "undefined") {
27             a._i = b._i;
29         }
31         if (typeof b._f !== "undefined") {
33             a._f = b._f;
35         }
37         if (typeof b._l !== "undefined") {
39             a._l = b._l;
41         }
43         if (typeof b._strict !== "undefined") {
45             a._strict = b._strict;
47         }
49         if (typeof b._tzm !== "undefined") {
51             a._tzm = b._tzm;
53         }
55         if (typeof b._isUTC !== "undefined") {
57             a._isUTC = b._isUTC;
59         }
61         if (typeof b._offset !== "undefined") {
63             a._offset = b._offset;
65         }
67         if (typeof b._pf !== "undefined") {
69             a._pf = b._pf;
71         }
73         if (typeof b._locale !== "undefined") {
75             a._locale = b._locale;
77         }
79         if (Ib.length > 0) {
81             for (c in Ib) {
83                 d = Ib[c];
85                 e = b[d];
87                 if (typeof e !== "undefined") {
89                     a[d] = e;
91                 }
93             }
95         }
97         return a;
99     }
01     function o(a: number): number {
03         return a < 0 ? Math.ceil(a) : Math.floor(a);
05     }
07     function p(a: number, b: number, c?: boolean): string {
09         let d = "" + Math.abs(a);
11         const e = a >= 0;
13         while (d.length < b) {
15             d = "0" + d;
17         }
19         return (e ? (c ? "+" : "") : "-") + d;
21     }
23     function q(a: any, b: any): Duration {
25         const c: Duration = { milliseconds: 0, months: 0 };
27         c.months = b.month() - a.month() + 12 * (b.year() - a.year());
29         if (a.clone().add(c.months, "M").isAfter(b)) {
31             --c.months;
33         }
35         c.milliseconds = +b - +a.clone().add(c.months, "M");
37         return c;
39     }
41     function r(a: any, b: any): Duration {
43         let c: Duration;
45         b = K(b, a);
47         if (a.isBefore(b)) {
49             c = q(a, b);
51         } else {
53             c = q(b, a);
55             c.milliseconds = -c.milliseconds;
57             c.months = -c.months;
59         }
61         return c;
63     }
65     function s(a: number, b: string): Function {
67         return function(c: any, d: any): any {
69             let e, f;
71             if (d === null || isNaN(+d)) {
73                 g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period).");
75                 f = c;
77                 c = d;
79                 d = f;
81             }
83             c = typeof c === "string" ? +c : c;
85             e = tb.duration(c, d);
87             t(this, e, a);
89             return this;
91         };
93     }
95     function t(a: any, b: any, c: number, d?: boolean): void {
97         const e = b._milliseconds;
99         const f = b._days;
01         const g = b._months;
03         d = d == null ? true : d;
05         if (e) {
07             a._d.setTime(+a._d + e * c);
09         }
11         if (f) {
13             nb(a, "Date", mb(a, "Date") + f * c);
15         }
17         if (g) {
19             lb(a, mb(a, "Month") + g * c);
21         }
23         if (d) {
25             tb.updateOffset(a, f || g);
27         }
29     }
31     function u(a: any): boolean {
33         return Object.prototype.toString.call(a) === "[object Array]";
35     }
37     function v(a: any): boolean {
39         return Object.prototype.toString.call(a) === "[object Date]" || a instanceof Date;
41     }
43     function w(a: any, b: any, c: boolean): number {
45         let d, e = Math.min(a.length, b.length);
47         const f = Math.abs(a.length - b.length);
49         let g = 0;
51         for (d = 0; d < e; d++) {
53             if ((c && a[d] !== b[d]) || (!c && A(a[d]) !== A(b[d]))) {
55                 g++;
57             }
59         }
61         return g + f;
63     }
65     function x(a: string): string {
67         if (a) {
69             const b = a.toLowerCase().replace(/(.)s$/, "$1");
71             a = jc[a] || kc[b] || b;
73         }
75         return a;
77     }
79     function y(a: any): any {
81         const b: any = {};
83         let d;
85         for (d in a) {
87             if (c(a, d)) {
89                 const b = x(d);
91                 if (b) {
93                     b[d] = a[d];
95                 }
97             }
99         }
01         return b;
03     }
05     function z(b: string): void {
07         let c, d;
09         if (b.indexOf("week") === 0) {
11             c = 7;
13             d = "day";
15         } else {
17             if (b.indexOf("month") !== 0) {
19                 return;
21             }
23             c = 12;
25             d = "month";
27         }
29         tb[b] = function(e: any, f: any): any {
31             let g, h, i = tb._locale[b];
33             const j: any[] = [];
35             if (typeof e === "number") {
37                 f = e;
39                 e = a;
41             }
43             h = function(a: any): any {
45                 const b = tb().utc().set(d, a);
47                 return i.call(tb._locale, b, e || "");
49             };
51             if (f != null) {
53                 return h(f);
55             }
57             for (g = 0; g < c; g++) {
59                 j.push(h(g));
61             }
63             return j;
65         };
67     }
69     function A(a: any): number {
71         const b = +a;
73         let c = 0;
75         if (b !== 0 && isFinite(b)) {
77             c = b >= 0 ? Math.floor(b) : Math.ceil(b);
79         }
81         return c;
83     }
85     function B(a: number, b: number): number {
87         return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
89     }
91     function C(a: number, b: number, c: number): number {
93         return hb(tb([a, 11, 31 + b - c]), b, c).week;
95     }
97     function D(a: number): number {
99         return E(a) ? 366 : 365;
01     }
03     function E(a: number): boolean {
05         return (a % 4 === 0 && a % 100 !== 0) || a % 400 === 0;
07     }
09     function F(a: any): void {
11         let b;
13         if (a._a && a._pf.overflow === -2) {
15             b = a._a[Bb] < 0 || a._a[Bb] > 11 ? Bb : a._a[Cb] < 1 || a._a[Cb] > B(a._a[Ab], a._a[Bb]) ? Cb : a._a[Db] < 0 || a._a[Db] > 23 ? Db : a._a[Eb] < 0 || a._a[Eb] > 59 ? Eb : a._a[Fb] < 0 || a._a[Fb] > 59 ? Fb : a._a[Gb] < 0 || a._a[Gb] > 999 ? Gb : -1;
17             if (a._pf._overflowDayOfYear && (Ab > b || b > Cb)) {
19                 b = Cb;
21             }
23             a._pf.overflow = b;
25         }
27     }
29     function G(a: any): boolean {
31         if (a._isValid == null) {
33             a._isValid = !isNaN(a._d.getTime()) && a._pf.overflow < 0 && !a._pf.empty && !a._pf.invalidMonth && !a._pf.nullInput && !a._pf.invalidFormat && !a._pf.userInvalidated;
35             if (a._strict) {
37                 a._isValid = a._isValid && a._pf.charsLeftOver === 0 && a._pf.unusedTokens.length === 0;
39             }
41         }
43         return a._isValid;
45     }
47     function H(a: string): string {
49         return a ? a.toLowerCase().replace("_", "-") : a;
51     }
53     function I(a: string[]): any {
55         let b, c, d, e, f = 0;
57         while (f < a.length) {
59             e = H(a[f]).split("-");
61             b = e.length;
63             c = H(a[f + 1]);
65             c = c ? c.split("-") : null;
67             while (b > 0) {
69                 d = J(e.slice(0, b).join("-"));
71                 if (d) {
73                     return d;
75                 }
77                 if (c && c.length >= b && w(e, c, true) >= b - 1) {
79                     break;
81                 }
83                 b--;
85             }
87             f++;
89         }
91         return null;
93     }
95     function J(a: string): any {
97         let b = null;
99         if (!Hb[a] && Jb) {
01             try {
03                 b = tb.locale();
05                 require("./locale/" + a);
07                 tb.locale(b);
09             } catch (c) {}
11         }
13         return Hb[a];
15     }
17     function K(a: any, b: any): any {
19         return b._isUTC ? tb(a).zone(b._offset || 0) : tb(a).local();
21     }
23     function L(a: string): string {
25         return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
27     }
29     function M(a: string): Function {
31         const b = a.match(Nb);
33         for (let c = 0, d = b.length; c < d; c++) {
35             b[c] = pc[b[c]] ? pc[b[c]] : L(b[c]);
37         }
39         return function(e: any): string {
41             let f = "";
43             for (let c = 0, d = b.length; c < d; c++) {
45                 f += b[c] instanceof Function ? b[c].call(e, a) : b[c];
47             }
49             return f;
51         };
53     }
55     function N(a: any, b: string): string {
57         if (!a.isValid()) {
59             return a.localeData().invalidDate();
61         }
63         b = O(b, a.localeData());
65         if (!lc[b]) {
67             lc[b] = M(b);
69         }
71         return lc[b](a);
73     }
75     function O(a: string, b: any): string {
77         function c(a: string): string {
79             return b.longDateFormat(a) || a;
81         }
83         let d = 5;
85         Ob.last``` 
79             return b.longDateFormat(a) || a;
81         }
83         let d = 5;
85         Ob.lastIndex = 0;
87         while (d >= 0 && Ob.test(a)) {
89             a = a.replace(Ob, c);
91             Ob.lastIndex = 0;
93             d -= 1;
95         }
97         return a;
99     }
01     function P(a: string, b: any): RegExp {
03         let c;
05         const d = b._strict;
07         switch (a) {
09             case "Q":
11                 return Zb;
13             case "DDDD":
15                 return _b;
17             case "YYYY":
19             case "GGGG":
21             case "gggg":
23                 return d ? ac : Rb;
25             case "Y":
27             case "G":
29             case "g":
31                 return cc;
33             case "YYYYYY":
35             case "YYYYY":
37             case "GGGGG":
39             case "ggggg":
41                 return d ? bc : Sb;
43             case "S":
45                 if (d) return Zb;
47             case "SS":
49                 if (d) return $b;
51             case "SSS":
53                 if (d) return _b;
55             case "DDD":
57                 return Qb;
59             case "MMM":
61             case "MMMM":
63             case "dd":
65             case "ddd":
67             case "dddd":
69                 return Ub;
71             case "a":
73             case "A":
75                 return b._locale._meridiemParse;
77             case "X":
79                 return Xb;
81             case "Z":
83             case "ZZ":
85                 return Vb;
87             case "T":
89                 return Wb;
91             case "SSSS":
93                 return Tb;
95             case "MM":
97             case "DD":
99             case "YY":
01             case "GG":
03             case "gg":
05             case "HH":
07             case "hh":
09             case "mm":
11             case "ss":
13             case "ww":
15             case "WW":
17                 return d ? $b : Pb;
19             case "M":
21             case "D":
23             case "d":
25             case "H":
27             case "h":
29             case "m":
31             case "s":
33             case "w":
35             case "W":
37             case "e":
39             case "E":
41                 return Pb;
43             case "Do":
45                 return Yb;
47             default:
49                 c = new RegExp(Y(X(a.replace("\\", ""))), "i");
51                 return c;
53         }
55     }
57     function Q(a: string): number {
59         const b = a.match(Vb) || [];
61         const c = b[b.length - 1] || [];
63         const d = (c + "").match(hc) || ["-", 0, 0];
65         const e = +(60 * +d[1]) + A(d[2]);
67         return d[0] === "+" ? -e : e;
69     }
71     function R(a: string, b: any, c: any): void {
73         let d;
75         const e = c._a;
77         switch (a) {
79             case "Q":
81                 if (b != null) e[Bb] = 3 * (A(b) - 1);
83                 break;
85             case "M":
87             case "MM":
89                 if (b != null) e[Bb] = A(b) - 1;
91                 break;
93             case "MMM":
95             case "MMMM":
97                 d = c._locale.monthsParse(b);
99                 if (d != null) e[Bb] = d;
1001                 else c._pf.invalidMonth = b;
1003                 break;
1005             case "D":
1007             case "DD":
1009                 if (b != null) e[Cb] = A(b);
1011                 break;
1013             case "Do":
1015                 if (b != null) e[Cb] = A(parseInt(b, 10));
1017                 break;
1019             case "DDD":
1021             case "DDDD":
1023                 if (b != null) c._dayOfYear = A(b);
1025                 break;
1027             case "YY":
1029                 e[Ab] = tb.parseTwoDigitYear(b);
1031                 break;
1033             case "YYYY":
1035             case "YYYYY":
1037             case "YYYYYY":
1039                 e[Ab] = A(b);
1041                 break;
1043             case "a":
1045             case "A":
1047                 c._isPm = c._locale.isPM(b);
1049                 break;
1051             case "H":
1053             case "HH":
1055             case "h":
1057             case "hh":
1059                 e[Db] = A(b);
1061                 break;
1063             case "m":
1065             case "mm":
1067                 e[Eb] = A(b);
1069                 break;
1071             case "s":
1073             case "ss":
1075                 e[Fb] = A(b);
1077                 break;
1079             case "S":
1081             case "SS":
1083             case "SSS":
1085             case "SSSS":
1087                 e[Gb] = A(1e3 * ("0." + b));
1089                 break;
1091             case "X":
1093                 c._d = new Date(1e3 * parseFloat(b));
1095                 break;
1097             case "Z":
1099             case "ZZ":
1101                 c._useUTC = true;
1103                 c._tzm = Q(b);
1105                 break;
1107             case "dd":
1109             case "ddd":
1111             case "dddd":
1113                 d = c._locale.weekdaysParse(b);
1115                 if (d != null) {
1117                     c._w = c._w || {};
1119                     c._w.d = d;
1121                 } else c._pf.invalidWeekday = b;
1123                 break;
1125             case "w":
1127             case "ww":
1129             case "W":
1131             case "WW":
1133             case "d":
1135             case "e":
1137             case "E":
1139                 a = a.substr(0, 1);
1141             case "gggg":
1143             case "GGGG":
1145             case "GGGGG":
1147                 a = a.substr(0, 2);
1149                 if (b) {
1151                     c._w = c._w || {};
1153                     c._w[a] = A(b);
1155                 }
1157                 break;
1159             case "gg":
1161             case "GG":
1163                 c._w = c._w || {};
1165                 c._w[a] = tb.parseTwoDigitYear(b);
1167                 break;
1169         }
1171     }
1173     function S(a: any): void {
1175         let c, d, e, f, g, h, i;
1177         c = a._w;
1179         if (c.GG != null || c.W != null || c.E != null) {
1181             g = 1;
1183             h = 4;
1185             d = b(c.GG, a._a[Ab], hb(tb(), 1, 4).year);
1187             e = b(c.W, 1);
1189             f = b(c.E, 1);
1191         } else {
1193             g = a._locale._week.dow;
1195             h = a._locale._week.doy;
1197             d = b(c.gg, a._a[Ab], hb(tb(), g, h).year);
1199             e = b(c.w, 1);
1201             if (c.d != null) {
1203                 f = c.d;
1205                 if (g > f) ++e;
1207             } else {
1209                 f = c.e != null ? c.e + g : g;
1211             }
1213         }
1215         i = ib(d, e, f, h, g);
1217         a._a[Ab] = i.year;
1219         a._dayOfYear = i.dayOfYear;
1221     }
1223     function T(a: any): void {
1225         let c, d, e, f, g = [];
1227         if (!a._d) {
1229             e = V(a);
1231             if (a._w && a._a[Cb] == null && a._a[Bb] == null) {
1233                 S(a);
1235             }
1237             if (a._dayOfYear != null) {
1239                 f = b(a._a[Ab], e[Ab]);
1241                 if (a._dayOfYear > D(f)) {
1243                     a._pf._overflowDayOfYear = true;
1245                 }
1247                 d = db(f, 0, a._dayOfYear);
1249                 a._a[Bb] = d.getUTCMonth();
1251                 a._a[Cb] = d.getUTCDate();
1253             }
1255             for (c = 0; c < 3 && a._a[c] == null; ++c) {
1257                 a._a[c] = g[c] = e[c];
1259             }
1261             for (; c < 7; c++) {
1263                 a._a[c] = g[c] = a._a[c] == null ? (c === 2 ? 1 : 0) : a._a[c];
1265             }
1267             a._d = (a._useUTC ? db : cb).apply(null, g);
1269             if (a._tzm != null) {
1271                 a._d.setUTCMinutes(a._d.getUTCMinutes() + a._tzm);
1273             }
1275         }
1277     }
1279     function U(a: any): void {
1281         let b;
1283         if (!a._d) {
1285             b = y(a._i);
1287             a._a = [b.year, b.month, b.day, b.hour, b.minute, b.second, b.millisecond];
1289             T(a);
1291         }
1293     }
1295     function V(a: any): any[] {
1297         const b = new Date();
1299         return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()];
1301     }
1303     function W(a: any): void {
1305         if (a._f === tb.ISO_8601) {
1307             $(a);
1309             return;
1311         }
1313         a._a = [];
1315         a._pf.empty = true;
1317         const b = "" + a._i;
1319         const c = b.length;
1321         let d = 0;
1323         let e, f, g, h, i;
1325         const j = O(a._f, a._locale).match(Nb) || [];
1327         for (e = 0; e < j.length; e++) {
1329             g = j[e];
1331             f = (b.match(P(g, a)) || [])[0];
1333             if (f) {
1335                 h = b.substr(0, b.indexOf(f));
1337                 if (h.length > 0) {
1339                     a._pf.unusedInput.push(h);
1341                 }
1343                 b = b.slice(b.indexOf(f) + f.length);
1345                 d += f.length;
1347             }
1349             if (pc[g]) {
1351                 if (f) {
1353                     a._pf.empty = false;
1355                 } else {
1357                     a._pf.unusedTokens.push(g);
1359                 }
1361                 R(g, f, a);
1363             } else if (a._strict && !f) {
1365                 a._pf.unusedTokens.push(g);
1367             }
1369         }
1371         a._pf.charsLeftOver = c - d;
1373         if (b.length > 0) {
1375             a._pf.unusedInput.push(b);
1377         }
1379         if (a._isPm && a._a[Db] < 12) {
1381             a._a[Db] += 12;
1383         }
1385         if (a._isPm === false && a._a[Db] === 12) {
1387             a._a[Db] = 0;
1389         }
1391         T(a);
1393         F(a);
1395     }
1397     function X(a: string): string {
1399         return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
1401             return b || c || d || e;
1403         });
1405     }
1407     function Y(a: string): string {
1409         return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
1411     }
1413     function Z(a: any): void {
1415         let b, c, d, e, f;
1417         if (a._f.length === 0) {
1419             a._pf.invalidFormat = true;
1421             a._d = new Date(NaN);
1423             return;
1425         }
1427         for (e = 0; e < a._f.length; e++) {
1429             f = 0;
1431             b = n({}, a);
1433             if (a._useUTC != null) {
1435                 b._useUTC = a._useUTC;
1437             }
1439             b._pf = d();
1441             b._f = a._f[e];
1443             W(b);
1445             if (G(b)) {
1447                 f += b._pf.charsLeftOver;
1449                 f += 10 * b._pf.unusedTokens.length;
1451                 b._pf.score = f;
1453                 if (d == null || d > f) {
1455                     d = f;
1457                     c = b;
1459                 }
1461             }
1463         }
1465         m(a, c || b);
1467     }
1469     function $(a: any): void {
1471         const b = dc.exec(a._i);
1473         if (b) {
1475             a._pf.iso = true;
1477             for (let c = 0, d = fc.length; c < d; c++) {
1479                 if (fc[c][1].exec(a._i)) {
1481                     a._f = fc[c][0] + (b[6] || " ");
1483                     break;
1485                 }
1487             }
1489             for (let c = 0, d = gc.length; c < d; c++) {
1491                 if (gc[c][1].exec(a._i)) {
1493                     a._f += gc[c][0];
1495                     break;
1497                 }
1499             }
1501             if (a._i.match(Vb)) {
1503                 a._f += "Z";
1505             }
1507             W(a);
1509         } else {
1511             a._isValid = false;
1513         }
1515     }
1517     function _(a: any): void {
1519         $(a);
1521         if (a._isValid === false) {
1523             delete a._isValid;
1525             tb.createFromInputFallback(a);
1527         }
1529     }
1531     function ab(a: any[], b: Function): any[] {
1533         const c: any[] = [];
1535         for (let d = 0; d < a.length; ++d) {
1537             c.push(b(a[d], d));
1539         }
1541         return c;
1543     }
1545     function bb(b: any): void {
1547         const c = b._i;
1549         if (c === a) {
1551             b._d = new Date();
1553         } else if (v(c)) {
1555             b._d = new Date(+c);
1557         } else if (Kb.exec(c) != null) {
5561557             b._d = new Date(+c);
1559         } else if (Kb.exec(c) != null) {
1561             b._d = new Date(+Kb.exec(c)![1]);
1563         } else if (typeof c === "string") {
1565             _(b);
1567         } else if (u(c)) {
1569             b._a = ab(c.slice(0), function(a: any) {
1571                 return parseInt(a, 10);
1573             });
1575             T(b);
1577         } else if (typeof c === "object") {
1579             U(b);
1581         } else if (typeof c === "number") {
1583             b._d = new Date(c);
1585         } else {
1587             tb.createFromInputFallback(b);
1589         }
1591     }
1593     function cb(a: number, b: number, c: number, d: number, e: number, f: number, g: number): Date {
1595         const h = new Date(a, b, c, d, e, f, g);
1597         if (a < 1970) {
1599             h.setFullYear(a);
1601         }
1603         return h;
1605     }
1607     function db(a: number): Date {
1609         const b = new Date(Date.UTC.apply(null, arguments as any));
1611         if (a < 1970) {
1613             b.setUTCFullYear(a);
1615         }
1617         return b;
1619     }
1621     function eb(a: any, b: any): number | null {
1623         if (typeof a === "string") {
1625             if (isNaN(a)) {
1627                 a = b.weekdaysParse(a);
1629                 if (typeof a !== "number") {
1631                     return null;
1633                 }
1635             } else {
1637                 a = parseInt(a, 10);
1639             }
1641         }
1643         return a;
1645     }
1647     function fb(a: string, b: number, c: boolean, d: boolean, e: any): string {
1649         return e.relativeTime(b || 1, !!c, a, d);
1651     }
1653     function gb(a: any, b: boolean, c: any): string {
1655         const d = tb.duration(a).abs();
1657         const e = yb(d.as("s"));
1659         const f = yb(d.as("m"));
1661         const g = yb(d.as("h"));
1663         const h = yb(d.as("d"));
1665         const i = yb(d.as("M"));
1667         const j = yb(d.as("y"));
1669         const k = e < mc.s && ["s", e] || f === 1 && ["m"] || f < mc.m && ["mm", f] || g === 1 && ["h"] || g < mc.h && ["hh", g] || h === 1 && ["d"] || h < mc.d && ["dd", h] || i === 1 && ["M"] || i < mc.M && ["MM", i] || j === 1 && ["y"] || ["yy", j];
1671         k[2] = b;
1673         k[3] = +a > 0;
1675         k[4] = c;
1677         return fb.apply({}, k);
1679     }
1681     function hb(a: any, b: number, c: number): { week: number; year: number } {
1683         const d = tb(a).add(b, "d");
1685         return { week: Math.ceil(d.dayOfYear() / 7), year: d.year() };
1687     }
1689     function ib(a: number, b: number, c: number, d: number, e: number): { year: number; dayOfYear: number } {
1691         const f = db(a, 0, 1).getUTCDay();
1693         const g = f === 0 ? 7 : f;
1695         const h = c != null ? c : e;
1697         const i = e - g + (g > d ? 7 : 0) - (e > g ? 7 : 0);
1699         const j = 7 * (b - 1) + (h - e) + i + 1;
1701         return { year: j > 0 ? a : a - 1, dayOfYear: j > 0 ? j : D(a - 1) + j };
1703     }
1705     function jb(b: any): any {
1707         const c = b._i;
1709         const d = b._f;
1711         b._locale = b._locale || tb.localeData(b._l);
1713         if (c === null || (d === undefined && c === "")) {
1715             return tb.invalid({ nullInput: true });
1717         }
1719         if (typeof c === "string") {
1721             b._i = c = b._locale.preparse(c);
1723         }
1725         if (tb.isMoment(c)) {
1727             return new k(c, true);
1729         }
1731         if (d) {
1733             if (u(d)) {
1735                 Z(b);
1737             } else {
1739                 W(b);
1741             }
1743         } else {
1745             bb(b);
1747         }
1749         return new k(b);
1751     }
1753     function kb(a: string, b: any[]): any {
1755         let c, d;
1757         if (b.length === 1 && u(b[0])) {
1759             b = b[0];
1761         }
1763         if (b.length === 0) {
1765             return tb();
1767         }
1769         c = b[0];
1771         for (d = 1; d < b.length; ++d) {
1773             if (b[d][a](c)) {
1775                 c = b[d];
1777             }
1779         }
1781         return c;
1783     }
1785     function lb(a: any, b: any): any {
1787         if (typeof b === "string") {
1789             b = a.localeData().monthsParse(b);
1791             if (typeof b !== "number") {
1793                 return a;
1795             }
1797         }
1799         const c = Math.min(a.date(), B(a.year(), b));
1801         a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c);
1803         return a;
1805     }
1807     function mb(a: any, b: string): number {
1809         return a._d["get" + (a._isUTC ? "UTC" : "") + b]();
1811     }
1813     function nb(a: any, b: string, c: number): void {
1815         if (b === "Month") {
1817             lb(a, c);
1819         } else {
1821             a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
1823         }
1825     }
1827     function ob(a: string, b: boolean): Function {
1829         return function(c: any): any {
1831             if (c != null) {
1833                 nb(this, a, c);
1835                 tb.updateOffset(this, b);
1837                 return this;
1839             } else {
1841                 return mb(this, a);
1843             }
1845         };
1847     }
1849     function pb(a: number): number {
1851         return 400 * a / 146097;
1853     }
1855     function qb(a: number): number {
1857         return 146097 * a / 400;
1859     }
1861     function rb(a: string): void {
1863         tb.duration.fn[a] = function(): number {
1865             return this._data[a];
1867         };
1869     }
1871     function sb(a: boolean): void {
1873         if (typeof ender === "undefined") {
1875             ub = xb.moment;
1877             xb.moment = a ? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", tb) : tb;
1879         }
1881     }
1883     for (let vb = rc.length - 1; vb >= 0; --vb) {
1885         z(rc[vb]);
1887     }
1889     tb.normalizeUnits = function(a: string): string {
1891         return x(a);
1893     };
1895     tb.invalid = function(a: any): any {
1897         const b = tb.utc(NaN);
1899         if (a != null) {
1901             m(b._pf, a);
1903         } else {
1905             b._pf.userInvalidated = true;
1907         }
1909         return b;
1911     };
1913     tb.parseZone = function(): any {
1915         return tb.apply(null, arguments).parseZone();
1917     };
1919     tb.parseTwoDigitYear = function(a: string): number {
1921         return A(a) + (A(a) > 68 ? 1900 : 2000);
1923     };
1925     m(tb.fn = k.prototype, {
1927         clone: function(): any {
1929             return tb(this);
1931         },
1933         valueOf: function(): number {
1935             return +this._d + 6e4 * (this._offset || 0);
1937         },
1939         unix: function(): number {
1941             return Math.floor(+this / 1e3);
1943         },
1945         toString: function(): string {
1947             return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
1949         },
1951         toDate: function(): Date {
1953             return this._offset ? new Date(+this) : this._d;
1955         },
1957         toISOString: function(): string {
1959             const a = tb(this).utc();
1961             return a.year() > 0 && a.year() <= 9999 ? N(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : N(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
1963         },
1965         toArray: function(): number[] {
1967             const a = this;
1969             return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()];
1971         },
1973         isValid: function(): boolean {
1975             return G(this);
1977         },
1979         isDSTShifted: function(): boolean {
1981             return this._a ? this.isValid() && w(this._a, (this._isUTC ? tb.utc(this._a) : tb(this._a)).toArray()) > 0 : false;
1983         },
1985         parsingFlags: function(): any {
1987             return m({}, this._pf);
1989         },
1991         invalidAt: function(): number {
1993             return this._pf.overflow;
1995         },
1997         utc: function(a: boolean): any {
1999             return this.zone(0, a);
2001         },
2003         local: function(a: boolean): any {
2005             if (this._isUTC) {
2007                 this.zone(0, a);
2009                 this._isUTC = false;
2111                 if (a) {
2113                     this.add(this._dateTzOffset(), "m");
2115                 }
2117             }
2119             return this;
2121         },
2123         format: function(a: string): string {
2125             const b = N(this, a || tb.defaultFormat);
2127             return this.localeData().postformat(b);
2129         },
2131         add: s(1, "add"),
2133         subtract: s(-1, "subtract"),
2135         diff: function(a: any, b: string, c: boolean): number {
2137             const d = K(a, this);
2139             const e = 6e4 * (this.zone() - d.zone());
2141             let f;
2143             let g;
2145             b = x(b);
2147             if (b === "year" || b === "month") {
2149                 f = 432e5 * (this.daysInMonth() + d.daysInMonth());
2151                 g = 12 * (this.year() - d.year()) + (this.month() - d.month());
2153                 const h = this - tb(this).startOf("month") - (d - tb(d).startOf("month"));
2155                 h -= 6e4 * (this.zone() - tb(this).startOf("month").zone() - (d.zone() - tb(d).startOf("month").zone()));
2157                 g += h / f;
2159                 if (b === "year") {
2161                     g /= 12;
2163                 }
2165             } else {
2167                 f = this - d;
2169                 g = b === "second" ? f / 1e3 : b === "minute" ? f / 6e4 : b === "hour" ? f / 36e5 : b === "day" ? (f - e) / 864e5 : b === "week" ? (f - e) / 6048e5 : f;
2171             }
2173             return c ? g : o(g);
2175         },
2177         from: function(a: any, b: boolean): string {
2179             return tb.duration({ to: this, from: a }).locale(this.locale()).humanize(!b);
2181         },
2183         fromNow: function(a: boolean): string {
2185             return this.from(tb(), a);
2187         },
2189         calendar: function(a: any): string {
2191             const b = a || tb();
2193             const c = K(b, this).startOf("day");
2195             const d = this.diff(c, "days", true);
2197             const e = d < -6 ? "sameElse" : d < -1 ? "lastWeek" : d < 0 ? "lastDay" : d < 1 ? "sameDay" : d < 2 ? "nextDay" : d < 7 ? "nextWeek" : "sameElse";
2199             return this.format(this.localeData().calendar(e, this));
2201         },
2203         isLeapYear: function(): boolean {
2205             return E(this.year());
2207         },
2209         isDST: function(): boolean {
2211             return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
2213         },
2215         day: function(a: any): any {
2217             const b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
2219             if (a != null) {
2221                 a = eb(a, this.localeData());
2223                 return this.add(a - b, "d");
2225             } else {
2227                 return b;
2229             }
2231         },
2233         month: ob("Month", true),
2235         startOf: function(a: string): any {
2237             switch (a = x(a)) {
2239                 case "year":
2241                     this.month(0);
2243                 case "quarter":
2245                 case "month":
2247                     this.date(1);
2249                 case "week":
2251                 case "isoWeek":
2253                 case "day":
2255                     this.hours(0);
2257                 case "hour":
2259                     this.minutes(0);
2261                 case "minute":
2263                     this.seconds(0);
2265                 case "second":
2267                     this.milliseconds(0);
2269             }
2271             if (a === "week") {
2273                 this.weekday(0);
2275             } else if (a === "isoWeek") {
2277                 this.isoWeekday(1);
2279             } else if (a === "quarter") {
2281                 this.month(3 * Math.floor(this.month() / 3));
2283             }
2285             return this;
2287         },
2289         endOf: function(a: string): any {
2291             return this.startOf(a).add(1, a === "isoWeek" ? "week" : a).subtract(1, "ms");
2293         },
2295         isAfter: function(a: any, b: string): boolean {
2297             b = x(b !== undefined ? b : "millisecond");
2299             if (b === "millisecond") {
2301                 a = tb.isMoment(a) ? a : tb(a);
2303                 return +this > +a;
2305             } else {
2307                 return +this.clone().startOf(b) > +tb(a).startOf(b);
2309             }
2311         },
2313         isBefore: function(a: any, b: string): boolean {
2315             b = x(b !== undefined ? b : "millisecond");
2317             if (b === "millisecond") {
2319                 a = tb.isMoment(a) ? a : tb(a);
2321                 return +this < +a;
2323             } else {
2325                 return +this.clone().startOf(b) < +tb(a).startOf(b);
2327             }
2329         },
2331         isSame: function(a: any, b: string): boolean {
2333             b = x(b || "millisecond");
2335             if (b === "millisecond") {
2337                 a = tb.isMoment(a) ? a : tb(a);
2339                 return +this === +a;
2341             } else {
2343                 return +this.clone().startOf(b) === +K(a, this).startOf(b);
2345             }
2347         },
2349         min: f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(a: any): any {
2351             a = tb.apply(null, arguments);
2353             return this > a ? this : a;
2355         }),
2357         max: f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(a: any): any {
2359             a = tb.apply(null, arguments);
2361             return a > this ? a : this;
2363         }),
2365         zone: function(a: any, b: boolean): any {
2367             let c;
2369             const d = this._offset || 0;
2371             if (a == null) {
2373                 return this._isUTC ? d : this._dateTzOffset();
2375             }
2377             if (typeof a === "string") {
2379                 a = Q(a);
2381             }
2383             if (Math.abs(a) < 16) {
2385                 a = a * 60;
2387             }
2389             if (!this._isUTC && b) {
2391                 c = this._dateTzOffset();
2393             }
2395             this._offset = a;
2397             this._isUTC = true;
2399             if (c != null) {
2401                 this.subtract(c, "m");
2403             }
2405             if (d !== a) {
2407                 if (!b || this._changeInProgress) {
2409                     t(this, tb.duration(d - a, "m"), 1, false);
2411                 } else if (!this._changeInProgress) {
2413                     this._changeInProgress = true;
2415                     tb.updateOffset(this, true);
2417                     this._changeInProgress = null;
2419                 }
2421             }
2423             return this;
2425         },
2427         zoneAbbr: function(): string {
2429             return this._isUTC ? "UTC" : "";
2431         },
2433         zoneName: function(): string {
2435             return this._isUTC ? "Coordinated Universal Time" : "";
2437         },
2439         parseZone: function(): any {
2441             if (this._tzm) {
2443                 this.zone(this._tzm);
2445             } else if (typeof this._i === "string") {
2447                 this.zone(this._i);
2449             }
2451             return this;
2453         },
2455         hasAlignedHourOffset: function(a: any): boolean {
2457             a = a ? tb(a).zone() : 0;
2459             return (this.zone() - a) % 60 === 0;
2461         },
2463         daysInMonth: function(): number {
2465             return B(this.year(), this.month());
2467         },
2469         dayOfYear: function(a: number): any {
2471             const b = yb((tb(this).startOf("day") - tb(this).startOf("year")) / 864e5) + 1;
2473             return a == null ? b : this.add(a - b, "d");
2475         },
2477         quarter: function(a: number): any {
2479             return a == null ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
2481         },
2483         weekYear: function(a: number): any {
2485             const b = hb(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
2487             return a == null ? b : this.add(a - b, "y");
2489         },
2491         isoWeekYear: function(a: number): any {
2493             const b = hb(this, 1, 4).year;
2495             return a == null ? b : this.add(a - b, "y");
2497         },
2499         week: function(a: number): any {
2501             const b = this.localeData().week(this);
2503             return a == null ? b : this.add(7 * (a - b), "d");
2505         },
2507         isoWeek: function(a: number): any {
2509             const b = hb(this, 1, 4).week;
2511             return a == null ? b : this.add(7 * (a - b), "d");
2513         },
2515         weekday: function(a: number): any {
2517             const b = (this.day() + 7 - this.localeData()._week.dow) % 7;
2519             return a == null ? b : this.add(a - b, "d");
2521         },
2523         isoWeekday: function(a: number): any {
2525             return a == null ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7);
2527         },
2529         isoWeeksInYear: function(): number {
2531             return C(this.year(), 1, 4);
2533         },
2535         weeksInYear: function(): number {
2537             const a = this.localeData()._week;
2539             return C(this.year(), a.dow, a.doy);
2541         },
2543         get: function(a: string): any {
2545             a = x(a);
2547             return this[a]();
2549         },
2551         set: function(a: string, b: any): any {
2553             a = x(a);
2555             if (typeof this[a] === "function") {
2557                 this[a](b);
2559             }
2561             return this;
2563         },
2565         locale: function(b: string): any {
2567             let c;
2569             if (b === a) {
2571                 return this._locale._abbr;
2573             }
2575             c = tb.localeData(b);
2577             if (c != null) {
2579                 this._locale = c;
2581             }
2583             return this;
2585         },
2587         lang: f("moment().lang() is deprecated. Use moment().localeData() instead.", function(b: string): any {
2589             if (b === a) {
2591                 return this.localeData();
2593             }
2595             return this.locale(b);
2597         }),
2599         localeData: function(): any {
2601             return this._locale;
2603         },
2605         _dateTzOffset: function(): number {
2607             return 15 * Math.round(this._d.getTimezoneOffset() / 15);
2609         }
2611     });
2613     tb.fn.millisecond = tb.fn.milliseconds = ob("Milliseconds", false);
2615     tb.fn.second = tb.fn.seconds = ob("Seconds", false);
2617     tb.fn.minute = tb.fn.minutes = ob("Minutes", false);
2619     tb.fn.hour = tb.fn.hours = ob("Hours", true);
2621     tb.fn.date = ob("Date", true);
2623     tb.fn.dates = f("dates accessor is deprecated. Use date instead.", ob("Date", true));
2625     tb.fn.year = ob("FullYear", true);
2627     tb.fn.years = f("years accessor is deprecated. Use year instead.", ob("FullYear", true));
2629     tb.fn.days = tb.fn.day;
2631     tb.fn.months = tb.fn.month;
2633     tb.fn.weeks = tb.fn.week;
2635     tb.fn.isoWeeks = tb.fn.isoWeek;
2637     tb.fn.quarters = tb.fn.quarter;
2639     tb.fn.toJSON = tb.fn.toISOString;
2641     m(tb.duration.fn = l.prototype, {
2643         _bubble: function(): void {
2645             let a, b, c, d = this._milliseconds, e = this._days, f = this._months, g = this._data, h = 0;
2647             g.milliseconds = d % 1e3;
2649             a = o(d / 1e3);
2651             g.seconds = a % 60;
2653             b = o(a / 60);
2655             g.minutes = b % 60;
2657             c = o(b / 60);
2659             g.hours = c % 24;
2661             e += o(c / 24);
2663             h = o(pb(e));
2665             e -= o(qb(h));
2667             f += o(e / 30);
2669             e %= 30;
2671             h += o(f / 12);
2673             f %= 12;
2675             g.days = e;
2677             g.months = f;
2679             g.years = h;
2681         },
2683         abs: function(): any {
2685             this._milliseconds = Math.abs(this._milliseconds);
2687             this._days = Math.abs(this._days);
2689             this._months = Math.abs(this._months);
2691             this._data.milliseconds = Math.abs(this._data.milliseconds);
2693             this._data.seconds = Math.abs(this._data.seconds);
2695             this._data.minutes = Math.abs(this._data.minutes);
2697             this._data.hours = Math.abs(this._data.hours);
2699             this._data.months = Math.abs(this._data.months);
2701             this._data.years = Math.abs(this._data.years);
2703             return this;
2705         },
2707         weeks: function(): number {
2709             return o(this.days() / 7);
2711         },
2713         valueOf: function(): number {
2715             return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * A(this._months / 12);
2717         },
2719         humanize: function(a: boolean): string {
2721             const b = gb(this, !a, this.localeData());
2723             if (a) {
2725                 return this.localeData().pastFuture(+this, b);
2727             }
2729             return this.localeData().postformat(b);
2731         },
2733         add: function(a: any, b: any): any {
2735             const c = tb.duration(a, b);
2737             this._milliseconds += c._milliseconds;
2739             this._days += c._days;
2741             this._months += c._months;
2743             this._bubble();
2745             return this;
2747         },
2749         subtract: function(a: any, b: any): any {
2751             const c = tb.duration(a, b);
2753             this._milliseconds -= c._milliseconds;
2755             this._days -= c._days;
2757             this._months -= c._months;
2759             this._bubble();
2761             return this;
2763         },
2765         get: function(a: string): number {
2767             a = x(a);
2769             return this[a.toLowerCase() + "s"]();
2771         },
2773         as: function(a: string): number {
2775             let b, c;
2777             a = x(a);
2779             if (a === "month" || a === "year") {
2781                 b = this._days + this._milliseconds / 864e5;
2783                 c = this._months + 12 * pb(b);
2785                 return a === "month" ? c : c / 12;
2787             }
2789             b = this._days + qb(this._months / 12);
2791             switch (a) {
2793                 case "week":
2795                     return b / 7 + this._milliseconds / 6048e5;
2797                 case "day":
2799                     return b + this._milliseconds / 864e5;
2801                 case "hour":
2803                     return 24 * b + this._milliseconds / 36e5;
2805                 case "minute":
2807                     return 24 * b * 60 + this._milliseconds / 6e4;
2809                 case "second":
2811                     return 24 * b * 60 * 60 + this._milliseconds / 1e3;
2813                 case "millisecond":
2815                     return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;
2817                 default:
2819                     throw new Error("Unknown unit " + a);
2821             }
2823         },
2825         lang: tb.fn.lang,
2827         locale: tb.fn.locale,
2829         toIsoString: f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function(): string {
2831             return this.toISOString();
2833         }),
2835         toISOString: function(): string {
2837             const a = Math.abs(this.years());
2839             const b = Math.abs(this.months());
2841             const c = Math.abs(this.days());
2843             const d = Math.abs(this.hours());
2845             const e = Math.abs(this.minutes());
2847             const f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
2849             return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D";
2851         },
2853         localeData: function(): any {
2855             return this._locale;
2857         }
2859     });
2861     tb.duration.fn.toString = tb.duration.fn.toISOString;
2863     for (let vb in ic) {
2865         if (c(ic, vb)) {
2867             rb(vb.toLowerCase());
2869         }
2871     }
2873     tb.duration.fn.asMilliseconds = function(): number {
2875         return this.as("ms");
2877     };
2879     tb.duration.fn.asSeconds = function(): number {
2881         return this.as("s");
2883     };
2885     tb.duration.fn.asMinutes = function(): number {
2887         return this.as("m");
2889     };
2891     tb.duration.fn.asHours = function(): number {
2893         return this.as("h");
2895     };
2897     tb.duration.fn.asDays = function(): number {
2899         return this.as("d");
2901     };
2903     tb.duration.fn.asWeeks = function(): number {
2905         return this.as("weeks");
2907     };
2909     tb.duration.fn.asMonths = function(): number {
2911         return this.as("M");
2913     };
2915     tb.duration.fn.asYears = function(): number {
2917         return this.as("y");
2919     };
2921     tb.locale("en", {
2923         ordinal: function(a: number): string {
2925             const b = a % 10;
2927             const c = A(a % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
2929             return a + c;
2931         }
2933     });
2935     if (Jb) {
2937         module.exports = tb;
2939     } else if (typeof define === "function" && define.amd) {
2941         define("moment", function(a: any, b: any, c: any): any {
2943             if (c.config && c.config().noGlobal === true) {
2945                 xb.moment = ub;
2947             }
2949            2849             return tb;
        });
        sb(true);
    } else {
        sb();
    }
}).call(this);