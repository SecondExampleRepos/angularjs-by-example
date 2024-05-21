// react/src/utils/amCalendar.ts

import moment from 'moment';
import { preprocessDate, applyTimezone } from './amMoment'; // Assuming these utilities are defined in amMoment.ts

/**
 * Converts a date to a calendar format using moment.js
 * 
 * @param date - The date to be formatted
 * @param preprocess - Optional preprocessing method
 * @returns The formatted date string
 */
const amCalendar = (date: any, preprocess?: string): string => {
  if (typeof date === 'undefined' || date === null) {
    return '';
  }

  const preprocessedDate = preprocessDate(date, preprocess);
  const momentDate = moment(preprocessedDate);

  if (!momentDate.isValid()) {
    return '';
  }

  return applyTimezone(momentDate).calendar();
};

export default amCalendar;