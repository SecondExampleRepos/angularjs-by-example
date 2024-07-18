import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface AmTimeAgoProps {
  date: string | number | Date;
  format?: string;
  withoutSuffix?: boolean;
  preprocess?: 'utc' | 'unix' | null;
}

const AmTimeAgo: React.FC<AmTimeAgoProps> = ({ date, format, withoutSuffix = false, preprocess = null }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');
  const [serverTime, setServerTime] = useState<number | null>(null);

  useEffect(() => {
    const updateTimeAgo = () => {
      let now = moment();
      if (serverTime) {
        const currentTime = new Date().getTime();
        const adjustedTime = currentTime - serverTime + serverTime;
        now = moment(adjustedTime);
      }

      let processedDate = moment(date);
      if (preprocess === 'utc') {
        processedDate = moment.utc(date);
      } else if (preprocess === 'unix') {
        processedDate = moment.unix(Number(date));
      }

      setTimeAgo(processedDate.from(now, withoutSuffix));
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000); // Update every minute

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
