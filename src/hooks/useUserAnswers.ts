import { useState } from 'react';

export default function useUserAnswers() {
  const [userAnswers, setUserAnswers] = useState([] as string[]);

  return { userAnswers, addUserAnswer, removeLastAnswer };

  function addUserAnswer(userAnswer: string) {
    setUserAnswers(prev => ([...prev, userAnswer]));
  }

  function removeLastAnswer() {
    setUserAnswers(prev => prev.slice(0, prev.length - 1));
  }
}
