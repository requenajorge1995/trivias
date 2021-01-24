import React, { useEffect } from 'react';

import { TriviasApiDataResponse, UserInfo } from '../../types';

import useUserAnswers from '../../hooks/useUserAnswers';
import useChronometer from '../../hooks/useChronometer';

import TriviasContainer from '../trivias-container/trivias-container';
import Summary from '../summary/summary';
import { decodeEntities } from '../../utils';

function TriviasHandler(props: Props) {
  const { userInfo, fetchedData } = props;

  const chronometer = useChronometer();
  const { userAnswers, ...userAnwserOptions } = useUserAnswers();

  const trivias = fetchedData.results.map((trivia) => ({
    question: decodeEntities(trivia.question),
    correctAnswer: decodeEntities(trivia.correct_answer),
    incorrectAnswers: trivia.incorrect_answers.map(decodeEntities),
  }));

  useEffect(() => {
    chronometer.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  userInfo: UserInfo;
  fetchedData: TriviasApiDataResponse;
};

export default TriviasHandler;
