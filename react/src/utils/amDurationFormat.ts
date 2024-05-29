// react/src/utils/amDurationFormat.ts

import moment from 'moment';

/**
 * Formats a duration using moment.js.
 * 
 * @param {number | string} duration - The duration to format.
 * @param {string} [units] - The units of the duration (optional).
 * @param {boolean} [withSuffix] - Whether to include a suffix (optional).
 * @returns {string} - The formatted duration.
 */
export function amDurationFormat(duration: number | string, units?: string, withSuffix?: boolean): string {
    if (duration === undefined || duration === null) {
        return '';
    }
    return moment.duration(duration, units).humanize(withSuffix);
}