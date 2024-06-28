import moment from 'moment';
import { preprocessDate } from '../services/amMoment';

export function amDateFormat(date: any, format: string, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    date = preprocessDate(date, preprocess);
    const momentDate = moment(date);

    return momentDate.isValid() ? momentDate.format(format) : '';
}
