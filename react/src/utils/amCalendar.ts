import moment from 'moment';
import { preprocessDate, applyTimezone } from '../services/amMoment';

export function amCalendar(date: any, preprocess?: string): string {
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    const processedDate = preprocessDate(date, preprocess);
    const momentDate = moment(processedDate);

    if (!momentDate.isValid()) {
        return '';
    }

    return applyTimezone(momentDate).calendar();
}
