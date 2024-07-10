import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { amMoment, amTimeAgoConfig, angularMomentConfig } from '../services/amMoment';

interface AmTimeAgoProps {
  date: string | number | Date;
  format?: string;
  withoutSuffix?: boolean;
  preprocess?: string;
}

const AmTimeAgo: React.FC<AmTimeAgoProps> = ({ date, format, withoutSuffix, preprocess }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');
  const [serverTime, setServerTime] = useState<number | null>(null);

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = serverTime ? moment(Date.now() - serverTime + serverTime) : moment();
      const processedDate = amMoment.preprocessDate(date, preprocess, format);
      setTimeAgo(processedDate.from(now, withoutSuffix));
    };

    const interval = setInterval(updateTimeAgo, 60000); // Update every minute
    updateTimeAgo();

    return () => clearInterval(interval);
  }, [date, format, withoutSuffix, preprocess, serverTime]);

  useEffect(() => {
    // Placeholder for server time fetching logic if needed
    fetch('/api/server-time')
      .then(response => response.json())
      .then(data => {
        if (data && data.serverTime) {
          setServerTime(data.serverTime);
        }
      })
      .catch(error => {
        console.error('Error fetching server time:', error);
      });

  return (
    <time dateTime={moment(date).toISOString()}>
      {timeAgo}
    </time>
  );
};

export default AmTimeAgo;
