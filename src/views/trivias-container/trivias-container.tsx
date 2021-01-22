import React from 'react';

import './trivias-container.css';
import { Result } from '../../types';

import useTrivias from '../../hooks/useTrivias';
import useUserAnswers from '../../hooks/useUserAnswers';
import useChronometer from '../../hooks/useChronometer';

import CustomButton from '../../components/custom-button/custom-button';
import TriviaCard from '../../components/trivia-card/trivia-card';
import LoaderAnimation from '../../components/loader-animation/loader-animation';

function TriviasContainer(props: Props) {
  const { categoryId, setResult } = props;
  const chronometer = useChronometer();
  const { trivias, error, isLoading } = useTrivias(categoryId);
  const { userAnswers, addUserAnswer, removeLastAnswer } = useUserAnswers();

  switch (true) {
    case isLoading:
      return <LoaderAnimation />;
    case !!error:
      return <h1>{error}</h1>;
    case !chronometer.isRunning:
      chronometer.start();
      break;
    case userAnswers.length === trivias.length:
      chronometer.stop();
      setResult({
        correctAnswers: validateUserAnswers(),
        time: chronometer.value,
      });
      break;
  }

  return (
    <div className="trivias-container">
      <div className="trivias-container-header">
        <span className="question-number">
          Question: {userAnswers.length + 1} / {trivias.length}
        </span>
        <span className="chronometer">Time: {chronometer.formattedTime()}</span>
      </div>
      <div className="trivia-wrapper">
        <TriviaCard
          trivia={trivias[userAnswers.length]}
          setUserAnswer={addUserAnswer}
        />
      </div>
      <div className="button-container">
        {userAnswers.length > 0 && (
          <CustomButton onClick={removeLastAnswer}>
            Previous Question
          </CustomButton>
        )}
      </div>
    </div>
  );

  function validateUserAnswers(): number {
    return userAnswers.reduce((counter, answer, index) => {
      if (answer === trivias[index].correctAnswer) return counter++;
      return counter;
    }, 0);
  }
}

type Props = {
  categoryId: number;
  setResult(result: Result): void;
};

export default TriviasContainer;
