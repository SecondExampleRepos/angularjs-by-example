// react/src/utils/amDateFormat.ts

import moment from 'moment';
import { preprocessDate, applyTimezone } from './amMoment'; // Assuming these utilities are available

/**
 * Formats a date using the given format and optional preprocessing.
 * 
 * @param date - The date to format.
 * @param format - The format to apply.
 * @param preprocess - Optional preprocessing method.
 * @returns The formatted date string or an empty string if the date is invalid.
 */
const amDateFormat = (date: any, format: string, preprocess?: string): string => {
  if (typeof date === 'undefined' || date === null) {
    return '';
  }

  const preprocessedDate = preprocessDate(date, preprocess);
  const momentDate = moment(preprocessedDate);

  if (!momentDate.isValid()) {
    return '';
  }

  return applyTimezone(momentDate).format(format);
};

export default amDateFormat;