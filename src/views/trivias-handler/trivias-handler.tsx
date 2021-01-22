import React, { useEffect } from 'react';

import { UserInfo } from '../../types';

import useTrivias from '../../hooks/useTrivias';
import useUserAnswers from '../../hooks/useUserAnswers';
import useChronometer from '../../hooks/useChronometer';

import LoaderAnimation from '../../components/loader-animation/loader-animation';
import TriviasContainer from '../trivias-container/trivias-container';
import Summary from '../summary/summary';

function TriviasHandler(props: Props) {
  const { userInfo, categoryId } = props;

  const chronometer = useChronometer();
  const { trivias, error, isLoading } = useTrivias(categoryId);
  const { userAnswers, ...userAnwserOptions } = useUserAnswers();

  useEffect(() => {
    if (!isLoading) {
      if (userAnswers.length < trivias.length) chronometer.start();
      else chronometer.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, userAnswers]);

  if (isLoading) return <LoaderAnimation />;
  if (error) return <h1>{error}</h1>;

  if (userAnswers.length < trivias.length)
    return (
      <TriviasContainer
        trivias={trivias}
        questionNumber={userAnswers.length}
        time={chronometer.formattedTime()}
        {...userAnwserOptions}
      />
    );

  return (
    <Summary
      userInfo={userInfo}
      result={{
        correctAnswers: countCorrectUserAnswers(),
        time: chronometer.value,
      }}
    />
  );

  function countCorrectUserAnswers(): number {
    return userAnswers.reduce(
      (count, answer, index) =>
        answer === trivias[index].correctAnswer ? count + 1 : count,
      0
    );
  }
}

type Props = {
  categoryId: number;
  userInfo: UserInfo;
};

export default TriviasHandler;
