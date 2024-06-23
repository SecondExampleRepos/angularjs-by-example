// react/src/utils/amDurationFormat.ts

import moment from 'moment';

export function amDurationFormat(duration: any, unit: any, suffix: boolean): string {
    if (typeof duration === 'undefined' || duration === null) {
        return '';
    }
    return moment.duration(duration, unit).humanize(suffix);
}