// react/src/utils/amCalendar.ts

import moment from 'moment';

/**
 * Converts a date to a calendar format using moment.js.
 * 
 * @param date - The date to be converted.
 * @param preprocess - Optional preprocessing method.
 * @returns The date in calendar format or an empty string if the date is invalid.
 */
const amCalendar = (date: any, preprocess?: string): string => {
  if (typeof date === 'undefined' || date === null) {
    return '';
  }

  let processedDate = moment(date);

  if (preprocess) {
    switch (preprocess) {
      case 'utc':
        processedDate = moment.utc(date);
        break;
      case 'unix':
        processedDate = moment.unix(date);
        break;
      default:
        console.warn(`Unsupported preprocess method: ${preprocess}`);
    }
  }

  if (!processedDate.isValid()) {
    return '';
  }

  return processedDate.calendar();
};

export default amCalendar;