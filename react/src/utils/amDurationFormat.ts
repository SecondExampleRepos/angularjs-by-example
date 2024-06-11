import moment from 'moment';

export function amDurationFormat(duration: moment.DurationInputArg1, unit?: moment.unitOfTime.DurationConstructor, withSuffix?: boolean): string {
    if (typeof duration === 'undefined' || duration === null) {
        return '';
    }
    return moment.duration(duration, unit).humanize(withSuffix);
}