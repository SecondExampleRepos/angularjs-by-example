import moment from 'moment';
import { preprocessDate, applyTimezone } from '../services/amMoment';

export function amCalendar(date: any, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    date = preprocessDate(date, preprocess);
    const momentDate = moment(date);

    if (momentDate.isValid()) {
        return applyTimezone(momentDate).calendar();
    } else {
        return '';
    }
}