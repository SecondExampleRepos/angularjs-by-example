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
    const updateServerTime = () => {
      if (amTimeAgoConfig.serverTime) {
        const currentTime = new Date().getTime();
        const serverTimeOffset = currentTime - serverTime! + amTimeAgoConfig.serverTime;
        setServerTime(serverTimeOffset);
      } else {
        setServerTime(null);
      }
    };

    updateServerTime();
    const interval = setInterval(updateServerTime, 60000); // Update server time every minute

    return () => clearInterval(interval);
  }, [serverTime]);

  useEffect(() => {
    const updateTimeAgo = () => {
      const currentMoment = serverTime ? moment(serverTime) : moment();
      const processedDate = amMoment.preprocessDate(date, preprocess, format);
      const timeAgoText = processedDate.from(currentMoment, withoutSuffix);
      setTimeAgo(timeAgoText);
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000); // Update time ago every minute

    return () => clearInterval(interval);
  }, [date, format, withoutSuffix, preprocess, serverTime]);

  return (
    <time dateTime={moment(date).toISOString()}>
      {timeAgo}
    </time>
  );
};

export default AmTimeAgo;
