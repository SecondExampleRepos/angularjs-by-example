import moment from 'moment';
import { preprocessDate, applyTimezone } from './amMoment';

export function amDateFormat(date: any, format: string, preprocess?: string): string {
  if (typeof date === 'undefined' || date === null) {
    return '';
  }

  const preprocessedDate = preprocessDate(date, preprocess);
  const momentDate = moment(preprocessedDate);

  if (!momentDate.isValid()) {
    return '';
  }

  return applyTimezone(momentDate).format(format);
}