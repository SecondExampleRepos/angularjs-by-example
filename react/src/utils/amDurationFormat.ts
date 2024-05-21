import moment from 'moment';

/**
 * Converts a duration to a human-readable format.
 * 
 * @param duration - The duration to format.
 * @param unit - The unit of the duration (optional).
 * @param withSuffix - Whether to include a suffix (optional).
 * @returns The human-readable duration string.
 */
const amDurationFormat = (duration: moment.DurationInputArg1, unit?: moment.unitOfTime.DurationConstructor, withSuffix?: boolean): string => {
  if (duration === undefined || duration === null) {
    return '';
  }
  return moment.duration(duration, unit).humanize(withSuffix);
};

export default amDurationFormat;