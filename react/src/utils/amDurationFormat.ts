// react/src/utils/amDurationFormat.ts

import moment from 'moment';

/**
 * Formats a duration using moment.js
 * 
 * @param duration - The duration to format
 * @param unit - The unit of the duration (optional)
 * @param withSuffix - Whether to include a suffix (optional)
 * @returns The formatted duration as a string
 */
export function amDurationFormat(duration: number | string | undefined | null, unit?: moment.unitOfTime.DurationConstructor, withSuffix?: boolean): string {
    if (duration === undefined || duration === null) {
        return "";
    }
    return moment.duration(duration, unit).humanize(withSuffix);
}