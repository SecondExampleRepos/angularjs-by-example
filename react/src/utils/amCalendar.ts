// react/src/utils/amCalendar.ts

import moment from 'moment';

/**
 * Converts a date into a calendar format using moment.js.
 * 
 * @param date - The date to be converted.
 * @param preprocess - Optional preprocessing method for the date.
 * @returns The date in calendar format or an empty string if the date is invalid.
 */
export function amCalendar(date: any, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    // Preprocess the date if a method is provided
    let processedDate;
    if (preprocess) {
        switch (preprocess) {
            case 'utc':
                processedDate = moment.utc(date);
                break;
            case 'unix':
                processedDate = moment.unix(date);
                break;
            default:
                processedDate = moment(date);
                break;
        }
    } else {
        processedDate = moment(date);
    }

    // Check if the processed date is valid
    if (!processedDate.isValid()) {
        return '';
    }

    // Return the date in calendar format
    return processedDate.calendar();
}