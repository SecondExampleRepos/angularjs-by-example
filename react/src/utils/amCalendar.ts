// react/src/utils/amMoment.ts

import moment from 'moment';

/**
 * Preprocesses the date based on the given method.
 * 
 * @param date - The date to preprocess.
 * @param method - The preprocessing method.
 * @returns The preprocessed date.
 */
export function preprocessDate(date: any, method?: string): any {
    if (method === 'utc') {
        return moment.utc(date);
    } else if (method === 'unix') {
        return moment.unix(date);
    } else if (method) {
        console.warn(`Unsupported preprocessing method: ${method}`);
    }
    return moment(date);
    return date;
}

    const timezone = 'YOUR_TIMEZONE_HERE'; // Replace with the actual timezone if needed
        if (timezone) {
            if (momentDate.tz) {
                return momentDate.tz(timezone);
            } else {
                console.warn("Timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?");
            }
        }
 * Applies the timezone to the given moment object.
 * 
 * @param momentDate - The moment object to apply the timezone to.
 * @returns The moment object with the timezone applied.
 */
export function applyTimezone(momentDate: moment.Moment): moment.Moment {
    const timezone = 'YOUR_TIMEZONE_HERE'; // Replace with the actual timezone if needed
    if (timezone) {
        if (momentDate.tz) {
            return momentDate.tz(timezone);
        } else {
            console.warn("Timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?");
        }
    }
    return momentDate;
}