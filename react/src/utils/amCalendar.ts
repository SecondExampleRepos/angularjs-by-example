import moment from 'moment';
import { preprocessDate } from './amMoment'; // Assuming amMoment.ts contains the preprocessDate function

/**
 * Converts a date to a calendar format.
 * 
 * @param date - The date to be converted.
 * @param preprocess - Optional preprocessing method.
 * @returns The date in calendar format or an empty string if the date is invalid.
 */
export function amCalendar(date: any, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    const preprocessedDate = preprocessDate(date, preprocess);
    const momentDate = moment(preprocessedDate);

    return momentDate.isValid() ? momentDate.calendar() : '';
}