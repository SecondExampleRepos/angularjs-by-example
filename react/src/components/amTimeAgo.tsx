import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRootScope } from '../hooks/useRootScope';

interface AmTimeAgoProps {
  date: string | number | Date;
  format?: string;
  withoutSuffix?: boolean;
  preprocess?: 'utc' | 'unix' | null;
}

const AmTimeAgo: React.FC<AmTimeAgoProps> = ({ date, format, withoutSuffix = false, preprocess = null }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');
  const { exampleFunction } = useRootScope(); // Example usage of useRootScope hook

  useEffect(() => {
    const getCurrentTime = () => {
      return moment();
    };

    const updateTimeAgo = (date: moment.Moment) => {
      setTimeAgo(date.from(getCurrentTime(), withoutSuffix));
    };

    const preprocessDate = (date: string | number | Date, preprocess: 'utc' | 'unix' | null) => {
      if (preprocess === 'utc') {
        return moment.utc(date);
      } else if (preprocess === 'unix') {
        return moment.unix(typeof date === 'number' ? date : parseInt(date as string, 10));
      } else {
        return moment(date);
      }
    };

    const dateMoment = preprocessDate(date, preprocess);
    updateTimeAgo(dateMoment);

    const interval = setInterval(() => {
      updateTimeAgo(dateMoment);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [date, format, withoutSuffix, preprocess]);

  return (
    <time dateTime={moment(date).toISOString()}>
      {timeAgo}
    </time>
  );
};

export default AmTimeAgo;