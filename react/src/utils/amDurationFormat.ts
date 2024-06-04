import moment from 'moment';

/**
 * Formats a duration using moment.js
 * 
 * @param duration - The duration to format
 * @param unit - The unit of the duration (optional)
 * @param withSuffix - Whether to include a suffix (optional)
 * @returns The formatted duration as a string
 */
export function amDurationFormat(duration: any, unit?: moment.unitOfTime.DurationConstructor, withSuffix?: boolean): string {
    if (typeof duration === 'undefined' || duration === null) {
        return '';
    }
    return moment.duration(duration, unit).humanize(withSuffix);
}