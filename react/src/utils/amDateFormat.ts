import moment from 'moment';

/**
 * Formats a date using moment.js
 * @param date - The date to format
 * @param format - The format string
 * @param preprocess - Optional preprocessing method
 * @returns The formatted date string
 */
export function amDateFormat(date: any, format: string, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    let processedDate = preprocessDate(date, preprocess);
    let momentDate = moment(processedDate);

    return momentDate.isValid() ? momentDate.format(format) : '';
}

/**
 * Preprocesses the date based on the given method
 * @param date - The date to preprocess
 * @param method - The preprocessing method
 * @returns The preprocessed date
 */
function preprocessDate(date: any, method?: string): any {
    switch (method) {
        case 'utc':
            return moment.utc(date);
        case 'unix':
            return moment.unix(date);
        default:
            return !isNaN(parseFloat(date)) && isFinite(date) ? moment(parseInt(date, 10)) : moment(date);
    }
}