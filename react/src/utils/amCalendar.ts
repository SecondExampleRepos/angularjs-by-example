import moment from 'moment';

/**
 * Converts a date into a calendar format using moment.js.
 * 
 * @param date - The date to be converted.
 * @param preprocess - Optional preprocessing method.
 * @returns The date in calendar format or an empty string if the date is invalid.
 */
export function amCalendar(date: any, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    // Preprocess the date if a method is provided
    if (preprocess) {
        switch (preprocess) {
            case 'utc':
                date = moment.utc(date);
                break;
            case 'unix':
                date = moment.unix(date);
                break;
            default:
                console.warn(`Unsupported preprocess method: ${preprocess}`);
                break;
        }
    } else {
        date = moment(date);
    }

    // Check if the date is valid
    if (!date.isValid()) {
        return '';
    }

    // Apply timezone if needed (assuming timezone is handled elsewhere in the application)
    // SECOND AGENT: [MISSING CONTEXT] - Apply timezone if needed

    return date.calendar();
}