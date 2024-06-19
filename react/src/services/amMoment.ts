import moment from 'moment';
import { useRootScope } from '../hooks/useRootScope';
import { log } from '../utils/logger';
import { angularMomentConfig } from '../utils/constants/angularMomentConfig';

interface Preprocessors {
    [key: string]: (input: any, format?: any) => moment.Moment;
}

class AmMomentService {
    preprocessors: Preprocessors;

    constructor() {
        this.preprocessors = {
            utc: moment.utc,
            unix: moment.unix,
        };
    }

    changeLocale(locale: string): moment.Moment {
        const result = moment.locale(locale);
        if (locale) {
            // Assuming useRootScope provides a way to broadcast events
            const { someState, setSomeState } = useRootScope();
            // SECOND AGENT: [MISSING CONTEXT] - Define how to broadcast events using useRootScope
        }
        return result;
    }

    changeLanguage(language: string): moment.Moment {
        log.warn("angular-moment: Usage of amMoment.changeLanguage() is deprecated. Please use changeLocale()");
        return this.changeLocale(language);
    }

    preprocessDate(date: any, preprocess: string = angularMomentConfig.preprocess, format?: any): moment.Moment {
        if (this.preprocessors[preprocess]) {
            return this.preprocessors[preprocess](date, format);
        } else {
            if (preprocess) {
                log.warn(`angular-moment: Ignoring unsupported value for preprocess: ${preprocess}`);
            }
            return !isNaN(parseFloat(date)) && isFinite(date) ? moment(parseInt(date, 10)) : moment(date, format);
        }
    }

    applyTimezone(momentInstance: moment.Moment): moment.Moment {
        const timezone = angularMomentConfig.timezone;
        if (momentInstance && timezone) {
            if (momentInstance.tz) {
                return momentInstance.tz(timezone);
            } else {
                log.warn("angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?");
            }
        }
        return momentInstance;
    }
}

export default new AmMomentService();