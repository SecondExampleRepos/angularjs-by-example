import moment from 'moment';
import { useRootScope } from '../hooks/useRootScope';

interface AngularMomentConfig {
  preprocess: string | null;
  timezone: string;
  format: string | null;
}

interface AmMomentService {
  preprocessors: { [key: string]: (input: any, format?: string) => moment.Moment };
  changeLocale: (locale: string) => moment.Moment;
  changeLanguage: (language: string) => moment.Moment;
  preprocessDate: (date: any, preprocess: string, format: string) => moment.Moment;
  applyTimezone: (date: moment.Moment) => moment.Moment;
}

const angularMomentConfig: AngularMomentConfig = {
  preprocess: null,
  timezone: '',
  format: null,
};

const useAmMoment = (): AmMomentService => {
  const { exampleFunction } = useRootScope();

  const preprocessors = {
    utc: moment.utc,
    unix: moment.unix,
  };

  const changeLocale = (locale: string): moment.Moment => {
    const result = moment.locale(locale);
    // Broadcast equivalent in React
    const event = new CustomEvent('amMoment:localeChanged', { detail: locale });
    window.dispatchEvent(event);
    return result;
  };

  const changeLanguage = (language: string): moment.Moment => {
    console.warn('angular-moment: Usage of amMoment.changeLanguage() is deprecated. Please use changeLocale()');
    return changeLocale(language);
  };

  const preprocessDate = (date: any, preprocess: string = angularMomentConfig.preprocess, format: string): moment.Moment => {
    if (preprocessors[preprocess]) {
      return preprocessors[preprocess](date, format);
    } else {
      if (preprocess) {
        console.warn(`angular-moment: Ignoring unsupported value for preprocess: ${preprocess}`);
      }
      return !isNaN(parseFloat(date)) && isFinite(date) ? moment(parseInt(date, 10)) : moment(date, format);
    }
  };

  const applyTimezone = (date: moment.Moment): moment.Moment => {
    const timezone = angularMomentConfig.timezone;
    if (date && timezone) {
      if (date.tz) {
        return date.tz(timezone);
      } else {
        console.warn('angular-moment: timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?');
      }
    }
    return date;
  };

  return {
    preprocessors,
    changeLocale,
    changeLanguage,
    preprocessDate,
    applyTimezone,
  };
};

export default useAmMoment;