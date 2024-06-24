// react/src/utils/amDurationFormat.ts

import moment from 'moment';

/**
 * Formats a duration using moment.js.
 * 
 * @param duration - The duration to format.
 * @param units - The units of the duration.
 * @param humanize - Whether to humanize the duration.
 * @returns The formatted duration string.
 */
export function amDurationFormat(duration: any, units?: any, humanize?: boolean): string {
    if (typeof duration === 'undefined' || duration === null) {
        return '';
    }
    return moment.duration(duration, units).humanize(humanize);
}