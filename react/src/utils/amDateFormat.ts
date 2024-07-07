import moment from 'moment';
import { preprocessDate } from '../services/amMoment';

/**
 * Formats a date using the given format and optional preprocessing.
 * 
 * @param date - The date to format.
 * @param format - The format to apply.
 * @param preprocess - Optional preprocessing method.
 * @returns The formatted date string.
 */
export function amDateFormat(date: any, format: string, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    const preprocessedDate = preprocessDate(date, preprocess);
    const momentDate = moment(preprocessedDate);

    return momentDate.isValid() ? momentDate.format(format) : '';
}
