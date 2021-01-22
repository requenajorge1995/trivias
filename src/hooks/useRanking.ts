import { useEffect } from 'react';
import { Result, UserInfo } from '../types';
import useLocalStorage from './useLocalStorage';

export default function useRanking(userInfo: UserInfo, result: Result) {

  const { value, setValue } = useLocalStorage("ranking", [] as Record[]);

  useEffect(() => {
    setValue(prev =>
      [...prev, { ...userInfo, ...result }].sort((a, b) => {
        switch (true) {
          case a.correctAnswers > b.correctAnswers:
            return -1;
          case a.country < b.country:
            return 1;
          case a.time < b.time:
            return -1;
          case a.time > b.time:
            return 1;
          default:
            return 0;
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const position = value.findIndex(record => record.name === userInfo.name && record.country === userInfo.country);

  return { ranking: value, position };
}

interface Record extends UserInfo, Result { }