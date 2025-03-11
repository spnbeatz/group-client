import { useState, useEffect } from 'react';

export const usePolling = (initialInterval: number, onVisibilityChange: () => void) => {
  const [pollingIntervalTime, setPollingIntervalTime] = useState<number>(initialInterval);

  useEffect(() => {
    const intervalId = setInterval(() => {
      onVisibilityChange();
    }, pollingIntervalTime);

    return () => clearInterval(intervalId);
  }, [pollingIntervalTime, onVisibilityChange]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log('Strona widoczna:', !document.hidden);
      setPollingIntervalTime(document.hidden ? 60000 : 10000);
    };

    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return pollingIntervalTime;
};
