// react/src/utils/amMoment.ts

import moment from 'moment';

/**
 * Preprocesses the date based on the given method.
 * 
 * @param date - The date to be preprocessed.
 * @param method - The preprocessing method.
 * @returns The preprocessed date.
 */
export function preprocessDate(date: any, method?: string): any {
    if (method === 'utc') {
        return moment.utc(date);
    } else if (method === 'unix') {
        return moment.unix(date);
    } else {
        return moment(date);
    }
    return date;
}

/**
import moment from 'moment-timezone';

const TIMEZONE = 'America/New_York'; // Example timezone, replace with actual timezone if needed

if (momentDate && moment.tz) {
    momentDate = momentDate.tz(TIMEZONE);
} else {
    console.warn("Timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?");
}
 * 
 * @param momentDate - The moment object to apply the timezone to.
 * @returns The moment object with the timezone applied.
 */
export function applyTimezone(momentDate: moment.Moment): moment.Moment {
if (momentDate && moment.tz) {
    const TIMEZONE = 'America/New_York'; // Example timezone, replace with actual timezone if needed
    momentDate = momentDate.tz(TIMEZONE);
} else {
    console.warn("Timezone specified but moment.tz() is undefined. Did you forget to include moment-timezone.js?");
}
    return momentDate;
}