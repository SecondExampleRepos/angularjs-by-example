!function() {
    "use strict";
    type Moment = any;
    type AngularModule = any;
    interface AngularMomentConfig {
        preprocess: string | null;
        timezone: string;
        format: string | null;
    }
    interface AmTimeAgoConfig {
        withoutSuffix: boolean;
        serverTime: number | null;
    }
    function a(angular: AngularModule, moment: Moment): void {
        const module = angular.module("angularMoment", []) as AngularModule;
        module.constant("angularMomentConfig", { preprocess: null, timezone: "", format: null } as AngularMomentConfig);
        module.constant("moment", moment);
        module.constant("amTimeAgoConfig", { withoutSuffix: false, serverTime: null } as AmTimeAgoConfig);
        module.directive("amTimeAgo", ["$window", "moment", "amMoment", "amTimeAgoConfig", "angularMomentConfig", function (window: Window, moment: Moment, amMoment: any, amTimeAgoConfig: AmTimeAgoConfig, angularMomentConfig: AngularMomentConfig) {
            return function (scope: any, element: any, attrs: any) {
                let timeoutId: number | null = null;
                const serverTimeOffset = amTimeAgoConfig.serverTime ? (new Date()).getTime() - serverTimeOffset + amTimeAgoConfig.serverTime : null;
                function getCurrentMoment(): Moment {
                    return moment(serverTimeOffset || undefined);
                }
                function clearTimer(): void {
                    if (timeoutId) {
                        window.clearTimeout(timeoutId);
                        timeoutId = null;
                    }
                }
                function updateText(momentInstance: Moment): void {
                    const fromNow = momentInstance.from(getCurrentMoment(), amTimeAgoConfig.withoutSuffix);
                    element.text(fromNow);
                    const diffMinutes = Math.abs(getCurrentMoment().diff(momentInstance, "minute"));
                    let nextUpdateInMs = 3600;
                    if (diffMinutes < 1) nextUpdateInMs = 1000;
                    else if (diffMinutes < 60) nextUpdateInMs = 30000;
                    else if (diffMinutes < 180) nextUpdateInMs = 300000;
                    timeoutId = window.setTimeout(() => updateText(momentInstance), nextUpdateInMs);
                }
                function setDatetimeAttribute(datetime: string): void {
                    if (element[0].nodeName.toUpperCase() === "TIME") {
                        element.attr("datetime", datetime);
                    }
                }
                function refresh(): void {
                    clearTimer();
                    const value = attrs.amTimeAgo;
                    if (typeof value === "undefined" || value === null || value === "") {
                        clearTimer();
                        element.text("");
                        setDatetimeAttribute("");
                    } else {
                        const processedDate = amMoment.preprocessDate(value, angularMomentConfig.preprocess, angularMomentConfig.format);
                        updateText(processedDate);
                        setDatetimeAttribute(processedDate.toISOString());
                    }
                }
                attrs.$observe("amTimeAgo", refresh);
                scope.$on("$destroy", clearTimer);
            };
        }]);
        module.service("amMoment", ["moment", "$rootScope", "$log", "angularMomentConfig", function (moment: Moment, $rootScope: any, $log: Console, config: AngularMomentConfig) {
            this.preprocessors = { utc: moment.utc, unix: moment.unix };
            this.changeLocale = function (locale: string): string {
                const newLocale = (moment.locale || moment.lang)(locale);
                if (locale) {
                    $rootScope.$broadcast("amMoment:localeChanged");
                    $rootScope.$broadcast("amMoment:languageChange");
                }
                return newLocale;
            };
            this.preprocessDate = function (date: any, preprocess: string, format: string): Moment {
                if (!preprocess) preprocess = config.preprocess;
                if (this.preprocessors[preprocess]) {
                    return this.preprocessors[preprocess](date, format);
                } else {
                    $log.warn(`angular-moment: Ignoring unsupported value for preprocess: ${preprocess}`);
                    return isNaN(parseFloat(date)) || !isFinite(date) ? moment(date, format) : moment(parseInt(date, 10));
                }
            };
            this.applyTimezone = function (date: Moment): Moment {
                const timezone = config.timezone;
                if (date && timezone) {
                    return date.tz ? date.tz(timezone) : (function () { $log.warn("angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?"); return date; })();
                }
                return date;
            };
        }]);
        module.filter("amCalendar", ["moment", "amMoment", function (moment: Moment, amMoment: any) {
            return function (date: any, format: string): string {
                if (typeof date === "undefined" || date === null) return "";
                const processedDate = amMoment.preprocessDate(date, format);
                const momentDate = moment(processedDate);
                if (momentDate.isValid()) {
                    return amMoment.applyTimezone(momentDate).calendar();
                } else {
                    return "";
                }
            };
        }]);
        module.filter("amDateFormat", ["moment", "amMoment", function (moment: Moment, amMoment: any) {
            return function (date: any, format: string, preprocess: string): string {
                if (typeof date === "undefined" || date === null) return "";
                const processedDate = amMoment.preprocessDate(date, preprocess);
                const momentDate = moment(processedDate);
                if (momentDate.isValid()) {
                    return amMoment.applyTimezone(momentDate).format(format);
                } else {
                    return "";
                }
            };
        }]);
        module.filter("amDurationFormat", ["moment", function (moment: Moment) {
            return function (duration: any, units: string, suffix: boolean): string {
                if (typeof duration === "undefined" || duration === null) return "";
                return moment.duration(duration, units).humanize(suffix);
            };
        }]);
    }
    if (typeof define === "function" && define.amd) {
        define("angular-moment", ["angular", "moment"], a);
    } else {
        a(angular, window.moment);
    }
}();