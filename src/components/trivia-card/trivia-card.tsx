import React, { useMemo } from 'react';

import './trivia-card.css';

import { Trivia } from '../../types';

function TriviaCard(props: Props) {
  const {
    setUserAnswer,
    trivia: { question, correctAnswer, incorrectAnswers },
  } = props;

  const answers = useMemo(
    () => [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [correctAnswer]
  );

  return (
    <div className="trivia-card">
      <div className="question-container">
        <span className="question">{question}</span>
      </div>
      <div className="answers-container">
        {answers.map((answer, index) => (
          <span
            key={index}
            className="answer"
            onClick={() => setUserAnswer(answer)}
          >
            {answer}
          </span>
        ))}
      </div>
    </div>
  );
}

type Props = {
  trivia: Trivia;
  setUserAnswer(answer: string): void;
};

export default TriviaCard;
