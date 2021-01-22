import { useRef, useState } from 'react';

import { formatSeconds } from '../utils';

export default function useChronometer() {
  const [value, setValue] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const countRef = useRef({} as NodeJS.Timeout);

  return { value, start, stop, isRunning, formattedTime };

  function start() {
    if (isRunning) return;

    countRef.current = setInterval(() => {
      setValue((prev) => prev + 1);
    }, 1000);
    setIsRunning(true);
  }

  function stop() {
    if (!isRunning) return;

    clearInterval(countRef.current);
    setIsRunning(false);
  }

  function formattedTime() {
    return formatSeconds(value);
  }

}