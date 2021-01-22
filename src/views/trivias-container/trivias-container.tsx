/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import './trivias-container.css';

import { Trivia } from '../../types';

import CustomButton from '../../components/custom-button/custom-button';
import TriviaCard from '../../components/trivia-card/trivia-card';

function TriviasContainer(props: Props) {
  const {
    trivias,
    questionNumber,
    addUserAnswer,
    removeLastAnswer,
    time,
  } = props;

  return (
    <div className="trivias-container">
      <div className="trivias-container-header">
        <span className="question-number">
          Question: {questionNumber + 1} / {trivias.length}
        </span>
        <span className="chronometer">Time: {time}</span>
      </div>
      <div className="trivia-wrapper">
        <TriviaCard
          trivia={trivias[questionNumber]}
          setUserAnswer={addUserAnswer}
        />
      </div>
      <div className="button-container">
        {questionNumber > 0 && (
          <CustomButton onClick={removeLastAnswer}>
            Previous Question
          </CustomButton>
        )}
      </div>
    </div>
  );
}

type Props = {
  trivias: Trivia[];
  time: string;
  questionNumber: number;
  addUserAnswer(answer: string): void;
  removeLastAnswer(): void;
};

export default TriviasContainer;
