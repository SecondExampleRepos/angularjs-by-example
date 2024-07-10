import moment from 'moment';
import { preprocessDate, applyTimezone } from '../services/amMoment';

/**
 * Converts a date to a calendar time format.
 * 
 * @param date - The date to be converted.
 * @param preprocess - Optional preprocessing method.
 * @returns The calendar time format of the date.
 */
export function amCalendar(date: any, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    const preprocessedDate = preprocessDate(date, preprocess);
    const momentDate = moment(preprocessedDate);

    if (!momentDate.isValid()) {
        return '';
    }

    return applyTimezone(momentDate).calendar();
}
