!function() {
    "use strict";
    type Moment = any; // Placeholder type, replace with actual Moment.js type definitions
    type AngularModule = any; // Placeholder type, replace with actual AngularJS type definitions
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
        const module = angular.module("angularMoment", [])
            .constant("angularMomentConfig", { preprocess: null, timezone: "", format: null } as AngularMomentConfig)
            .constant("moment", moment)
            .constant("amTimeAgoConfig", { withoutSuffix: false, serverTime: null } as AmTimeAgoConfig)
            .directive("amTimeAgo", ["$window", "moment", "amMoment", "amTimeAgoConfig", "angularMomentConfig", function ($window: Window, moment: Moment, amMoment: any, amTimeAgoConfig: AmTimeAgoConfig, angularMomentConfig: AngularMomentConfig) {
                return function (scope: any, element: any, attrs: any) {
                    function getCurrentTime(): Moment {
                        let now: Moment;
                        if (amTimeAgoConfig.serverTime) {
                            const currentTime = (new Date()).getTime();
                            const adjustedTime = currentTime - initialLoadTime + amTimeAgoConfig.serverTime;
                            now = moment(adjustedTime);
                        } else {
                            now = moment();
                        }
                        return now;
                    }
                    function clearTimer(): void {
                        if (timer) {
                            $window.clearTimeout(timer);
                            timer = null;
                        }
                    }
                    function updateTime(elementText: string): void {
                        if (element.textContent !== elementText) {
                            element.textContent = elementText;
                        }
                    }
                    function updateDateTimeAttribute(dateTime: string): void {
                        if (element.nodeName.toUpperCase() === "TIME") {
                            element.setAttribute("datetime", dateTime);
                        }
                    }
                    function refreshTime(): void {
                        clearTimer();
                        if (timeString) {
                            const parsedDate = amMoment.preprocessDate(timeString, formatOption, angularMomentConfig);
                            updateTime(parsedDate.from(getCurrentTime(), withoutSuffix));
                            updateDateTimeAttribute(parsedDate.toISOString());
                            const nextUpdateInMs = getNextUpdateInterval(parsedDate);
                            timer = $window.setTimeout(refreshTime, nextUpdateInMs);
                        }
                    }
                    let timeString: string | null = null;
                    let formatOption: string | null = angularMomentConfig.format;
                    let withoutSuffix: boolean = amTimeAgoConfig.withoutSuffix;
                    const initialLoadTime: number = (new Date()).getTime();
                    let timer: number | null = null;
                    const watchExpression = attrs.amTimeAgo.replace(/^::/, "");
                    const isOneTimeBinding = attrs.amTimeAgo.startsWith("::");
                    const isTimeElement = element.nodeName.toUpperCase() === "TIME";
                    const unwatch = scope.$watch(watchExpression, function (newValue: string) {
                        if (typeof newValue === "undefined" || newValue === null || newValue === "") {
                            clearTimer();
                            updateTime("");
                            updateDateTimeAttribute("");
                            timeString = null;
                        } else {
                            timeString = newValue;
                            refreshTime();
                            if (newValue !== undefined && isOneTimeBinding) {
                                unwatch();
                            }
                        }
                    });
                    if (angular.isDefined(attrs.amWithoutSuffix)) {
                        scope.$watch(attrs.amWithoutSuffix, function (newVal: boolean) {
                            if (typeof newVal === "boolean") {
                                withoutSuffix = newVal;
                                refreshTime();
                            } else {
                                withoutSuffix = amTimeAgoConfig.withoutSuffix;
                            }
                        });
                    }
                    attrs.$observe("amFormat", function (newFormat: string) {
                        if (typeof newFormat !== "undefined") {
                            formatOption = newFormat;
                            refreshTime();
                        }
                    });
                    attrs.$observe("amPreprocess", function (newPreprocess: string) {
                        formatOption = newPreprocess;
                        refreshTime();
                    });
                    scope.$on("$destroy", function () {
                        clearTimer();
                    });
                    scope.$on("amMoment:localeChanged", function () {
                        refreshTime();
                    });
                };
            }])
            .service("amMoment", ["moment", "$rootScope", "$log", "angularMomentConfig", function (moment: Moment, $rootScope: any, $log: Console, angularMomentConfig: AngularMomentConfig) {
                this.preprocessors = {
                    utc: moment.utc,
                    unix: moment.unix
                };
                this.changeLocale = function (locale: string): string {
                    const newLocale = (moment.locale || moment.lang)(locale);
                    if (angular.isDefined(locale)) {
                        $rootScope.$broadcast("amMoment:localeChanged");
                        $rootScope.$broadcast("amMoment:languageChange");
                    }
                    return newLocale;
                };
                this.changeLanguage = function (language: string): string {
                    $log.warn("angular-moment: Usage of amMoment.changeLanguage() is deprecated. Please use changeLocale()");
                    return this.changeLocale(language);
                };
                this.preprocessDate = function (date: string | number, preprocess: string, config: any): Moment {
                    if (angular.isUndefined(preprocess)) {
                        preprocess = angularMomentConfig.preprocess;
                    }
                    if (this.preprocessors[preprocess]) {
                        return this.preprocessors[preprocess](date, config);
                    } else {
                        if (preprocess) {
                            $log.warn("angular-moment: Ignoring unsupported value for preprocess: " + preprocess);
                        }
                        return !isNaN(parseFloat(date as string)) && isFinite(date as number) ? moment(parseInt(date as string, 10)) : moment(date, config);
                    }
                };
                this.applyTimezone = function (date: Moment): Moment {
                    const timezone = angularMomentConfig.timezone;
                    if (date && timezone) {
                        if (date.tz) {
                            return date.tz(timezone);
                        } else {
                            $log.warn("angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?");
                        }
                    }
                    return date;
                };
            }])
            .filter("amCalendar", ["moment", "amMoment", function (moment: Moment, amMoment: any) {
                return function (date: string | number, preprocess: string): string {
                    if (typeof date === "undefined" || date === null) return "";
                    const processedDate = amMoment.preprocessDate(date, preprocess);
                    const momentDate = moment(processedDate);
                    if (momentDate.isValid()) {
                        return amMoment.applyTimezone(momentDate).calendar();
                    } else {
                        return "";
                    }
                };
            }])
            .filter("amDateFormat", ["moment", "amMoment", function (moment: Moment, amMoment: any) {
                return function (date: string | number, format: string, preprocess: string): string {
                    if (typeof date === "undefined" || date === null) return "";
                    const processedDate = amMoment.preprocessDate(date, preprocess);
                    const momentDate = moment(processedDate);
                    if (momentDate.isValid()) {
                        return amMoment.applyTimezone(momentDate).format(format);
                    } else {
                        return "";
                    }
                };
            }])
            .filter("amDurationFormat", ["moment", function (moment: Moment) {
                return function (duration: number, unit: string, suffix: boolean): string {
                    if (typeof duration === "undefined" || duration === null) return "";
                    const durationMoment = moment.duration(duration, unit);
                    return durationMoment.humanize(suffix);
                };
            }]);
    }
    if (typeof define === "function" && define.amd) {
        define("angular-moment", ["angular", "moment"], a);
    } else {
        a(angular, window.moment);
    }
}();