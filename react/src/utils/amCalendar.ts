import moment from 'moment';
import { preprocessDate, applyTimezone } from '../services/amMoment';

/**
 * Converts a date to a calendar format using moment.js
 * @param date - The date to be converted
 * @param preprocess - Optional preprocessing method
 * @returns The date in calendar format or an empty string if the date is invalid
 */
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
