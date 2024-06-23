import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRootScope } from '../hooks/useRootScope';

interface AmTimeAgoProps {
  date: string | number | Date;
  format?: string;
  withoutSuffix?: boolean;
  preprocess?: string;
}

const AmTimeAgo: React.FC<AmTimeAgoProps> = ({ date, format, withoutSuffix, preprocess }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');
  const { exampleFunction } = useRootScope(); // Example usage of useRootScope hook

  useEffect(() => {
    const calculateTimeAgo = () => {
      let processedDate = moment(date);

      if (preprocess) {
        switch (preprocess) {
          case 'utc':
            processedDate = moment.utc(date);
            break;
          case 'unix':
            processedDate = moment.unix(Number(date));
            break;
          default:
            break;
        }
      }

      setTimeAgo(processedDate.fromNow(withoutSuffix));
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [date, format, withoutSuffix, preprocess]);

  return (
    <time dateTime={moment(date).toISOString()}>
      {timeAgo}
    </time>
  );
};

export default AmTimeAgo;