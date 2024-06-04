import moment from 'moment';

/**
 * Formats a date using the specified format and optional preprocessing.
 * 
 * @param date - The date to format.
 * @param format - The format to apply.
 * @param preprocess - Optional preprocessing method (e.g., 'utc', 'unix').
 * @returns The formatted date string.
 */
export function amDateFormat(date: any, format: string, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    let processedDate: moment.Moment;

    if (preprocess) {
        switch (preprocess) {
            case 'utc':
                processedDate = moment.utc(date);
                break;
            case 'unix':
                processedDate = moment.unix(date);
                break;
            default:
                console.warn(`Unsupported preprocess value: ${preprocess}`);
                processedDate = moment(date);
        }
    } else {
        processedDate = moment(date);
    }

    if (!processedDate.isValid()) {
        return '';
    }

    return processedDate.format(format);
}