import moment from 'moment';

/**
 * Formats a duration using moment.js.
 * 
 * @param duration - The duration to format.
 * @param units - The units of the duration.
 * @param withSuffix - Whether to include a suffix in the formatted duration.
 * @returns The humanized duration string.
 */
export function amDurationFormat(duration: moment.DurationInputArg1, units?: moment.unitOfTime.DurationConstructor, withSuffix?: boolean): string {
    if (duration === undefined || duration === null) {
        return '';
    }
    return moment.duration(duration, units).humanize(withSuffix);
}