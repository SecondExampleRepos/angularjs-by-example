(function() {
    "use strict";

    enum Preprocess {
        UTC = 'utc',
        UNIX = 'unix'
    }

    interface AngularMomentConfig {
        preprocess: Preprocess | null;
        timezone: string;
        format: string | null;
    }

    interface AmTimeAgoConfig {
        withoutSuffix: boolean;
        serverTime: number | null;
    }

    function angularMoment(angular: any, moment: any) {
        return angular.module("angularMoment", [])
            .constant("angularMomentConfig", {
                preprocess: null,
                timezone: "",
                format: null
            } as AngularMomentConfig)
            .constant("moment", moment)
            .constant("amTimeAgoConfig", {
                withoutSuffix: false,
                serverTime: null
            } as AmTimeAgoConfig)
            .directive("amTimeAgo", ["$window", "moment", "amMoment", "amTimeAgoConfig", "angularMomentConfig", function($window: any, moment: any, amMoment: any, amTimeAgoConfig: AmTimeAgoConfig, angularMomentConfig: AngularMomentConfig) {
                return function(scope: any, element: any, attrs: any) {
                    let currentTime: number = (new Date()).getTime();
                    let timeoutId: number | null = null;
                    let withoutSuffix: boolean = amTimeAgoConfig.withoutSuffix;
                    let format: string | null = angularMomentConfig.format;
                    let preprocess: Preprocess | null = angularMomentConfig.preprocess;
                    let timeAgo: string = attrs.amTimeAgo.replace(/^::/, "");
                    let isStatic: boolean = attrs.amTimeAgo.indexOf("::") === 0;
                    let isTimeElement: boolean = element[0].nodeName.toUpperCase() === "TIME";
                    let serverTime: number | null = amTimeAgoConfig.serverTime;
                    let unwatch: any;

                    function getCurrentTime() {
                        if (serverTime) {
                            let now = (new Date()).getTime();
                            return moment(now - currentTime + serverTime);
                        } else {
                            return moment();
                        }
                    }

                    function cancelTimer() {
                        if (timeoutId) {
                            $window.clearTimeout(timeoutId);
                            timeoutId = null;
                        }
                    }

                    function updateTime(momentInstance: any) {
                        element.text(momentInstance.from(getCurrentTime(), withoutSuffix));
                        if (!isStatic) {
                            let diff = Math.abs(getCurrentTime().diff(momentInstance, "minute"));
                            let timeout = 3600;
                            if (diff < 1) {
                                timeout = 1;
                            } else if (diff < 60) {
                                timeout = 30;
                            } else if (diff < 180) {
                                timeout = 300;
                            }
                            timeoutId = $window.setTimeout(function() {
                                updateTime(momentInstance);
                            }, 1000 * timeout);
                        }
                    }

                    function updateDatetimeAttribute(datetime: string) {
                        if (isTimeElement) {
                            element.attr("datetime", datetime);
                        }
                    }

                    function update() {
                        cancelTimer();
                        if (timeAgo) {
                            let momentInstance = amMoment.preprocessDate(timeAgo, preprocess, format);
                            updateTime(momentInstance);
                            updateDatetimeAttribute(momentInstance.toISOString());
                        }
                    }

                    unwatch = scope.$watch(timeAgo, function(newValue: any) {
                        if (newValue === undefined || newValue === null || newValue === "") {
                            cancelTimer();
                            if (timeAgo) {
                                element.text("");
                                updateDatetimeAttribute("");
                                timeAgo = null;
                            }
                        } else {
                            timeAgo = newValue;
                            update();
                            if (newValue !== undefined && isStatic && unwatch) {
                                unwatch();
                            }
                        }
                    });

                    if (attrs.amWithoutSuffix) {
                        scope.$watch(attrs.amWithoutSuffix, function(newValue: any) {
                            if (typeof newValue === "boolean") {
                                withoutSuffix = newValue;
                                update();
                            } else {
                                withoutSuffix = amTimeAgoConfig.withoutSuffix;
                            }
                        });
                    }

                    attrs.$observe("amFormat", function(newValue: any) {
                        if (newValue !== undefined) {
                            format = newValue;
                            update();
                        }
                    });

                    attrs.$observe("amPreprocess", function(newValue: any) {
                        preprocess = newValue;
                        update();
                    });

                    scope.$on("$destroy", function() {
                        cancelTimer();
                    });

                    scope.$on("amMoment:localeChanged", function() {
                        update();
                    });
                };
            }])
            .service("amMoment", ["moment", "$rootScope", "$log", "angularMomentConfig", function(moment: any, $rootScope: any, $log: any, angularMomentConfig: AngularMomentConfig) {
                this.preprocessors = {
                    utc: moment.utc,
                    unix: moment.unix
                };

                this.changeLocale = function(locale: string) {
                    let result = (moment.locale || moment.lang)(locale);
                    if (locale !== undefined) {
                        $rootScope.$broadcast("amMoment:localeChanged");
                        $rootScope.$broadcast("amMoment:languageChange");
                    }
                    return result;
                };

                this.changeLanguage = function(language: string) {
                    $log.warn("angular-moment: Usage of amMoment.changeLanguage() is deprecated. Please use changeLocale()");
                    return this.changeLocale(language);
                };

                this.preprocessDate = function(value: any, preprocess: Preprocess | null, format: string | null) {
                    if (preprocess === undefined) {
                        preprocess = angularMomentConfig.preprocess;
                    }
                    if (this.preprocessors[preprocess]) {
                        return this.preprocessors[preprocess](value, format);
                    } else {
                        if (preprocess) {
                            $log.warn("angular-moment: Ignoring unsupported value for preprocess: " + preprocess);
                        }
                        if (!isNaN(parseFloat(value)) && isFinite(value)) {
                            return moment(parseInt(value, 10));
                        } else {
                            return moment(value, format);
                        }
                    }
                };

                this.applyTimezone = function(momentInstance: any) {
                    let timezone = angularMomentConfig.timezone;
                    if (momentInstance && timezone) {
                        if (momentInstance.tz) {
                            momentInstance = momentInstance.tz(timezone);
                        } else {
                            $log.warn("angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?");
                        }
                    }
                    return momentInstance;
                };
            }])
            .filter("amCalendar", ["moment", "amMoment", function(moment: any, amMoment: any) {
                return function(value: any, preprocess: Preprocess | null) {
                    if (value === undefined || value === null) {
                        return "";
                    }
                    value = amMoment.preprocessDate(value, preprocess, null);
                    let momentInstance = moment(value);
                    return momentInstance.isValid() ? amMoment.applyTimezone(momentInstance).calendar() : "";
                };
            }])
            .filter("amDateFormat", ["moment", "amMoment", function(moment: any, amMoment: any) {
                return function(value: any, format: string, preprocess: Preprocess | null) {
                    if (value === undefined || value === null) {
                        return "";
                    }
                    value = amMoment.preprocessDate(value, preprocess, null);
                    let momentInstance = moment(value);
                    return momentInstance.isValid() ? amMoment.applyTimezone(momentInstance).format(format) : "";
                };
            }])
            .filter("amDurationFormat", ["moment", function(moment: any) {
                return function(value: any, unit: string, withSuffix: boolean) {
                    if (value === undefined || value === null) {
                        return "";
                    }
                    return moment.duration(value, unit).humanize(withSuffix);
                };
            }]);
    }

    if (typeof define === "function" && define.amd) {
        define("angular-moment", ["angular", "moment"], angularMoment);
    } else {
        angularMoment(angular, (window as any).moment);
    }
})();