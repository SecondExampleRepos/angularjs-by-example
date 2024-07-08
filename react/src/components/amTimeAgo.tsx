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
      let currentTime = moment();
      if (serverTime) {
        const now = new Date().getTime();
        const adjustedTime = now - serverTime + serverTime;
        currentTime = moment(adjustedTime);
      }
      const processedDate = amMoment.preprocessDate(date, preprocess, format);
      setTimeAgo(processedDate.from(currentTime, withoutSuffix));
    };

    const interval = setInterval(updateTimeAgo, 1000);
    updateTimeAgo();

    return () => clearInterval(interval);
  }, [date, format, withoutSuffix, preprocess, serverTime]);

  useEffect(() => {
    // Placeholder for server time logic if needed
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
