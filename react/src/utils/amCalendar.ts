import moment from 'moment';

/**
 * Converts a date to a calendar format.
 * @param date - The date to be converted.
 * @param preprocess - Optional preprocessing method.
 * @returns The date in calendar format or an empty string if the date is invalid.
 */
export function amCalendar(date: any, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    // Preprocess the date if a valid preprocess method is provided
    if (preprocess) {
        switch (preprocess) {
            case 'utc':
                date = moment.utc(date);
                break;
            case 'unix':
                date = moment.unix(date);
                break;
            default:
                // SECOND AGENT: [MISSING CONTEXT] - Handle other preprocess methods if needed
                break;
        }
    } else {
        date = moment(date);
    }

    // Check if the date is valid
    if (!date.isValid()) {
        return '';
    }

    // Apply timezone if needed
    // SECOND AGENT: [MISSING CONTEXT] - Apply timezone if needed

    return date.calendar();
}