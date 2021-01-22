import { useState, useEffect } from 'react';
import { Trivia } from '../types';

export default function useTrivias(categoryId: number) {
  const [trivias, setTrivias] = useState([] as Trivia[]);
  const [error, setError] = useState(null as Error | null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`https://opentdb.com/api.php?amount=20&category=${categoryId}&type=multiple`);
        if (!res.ok) throw new Error(res.statusText);

        const trivias = ((await res.json()) as ApiDataResponse)
          .results.map(trivia => ({
            question: decodeURI(trivia.question),
            correctAnswer: decodeURI(trivia.correct_answer),
            incorrectAnswers: trivia.incorrect_answers.map(decodeURI)
          }));

        setTrivias(trivias);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [categoryId]);

  return { trivias, error, isLoading };
}

interface ApiDataResponse {
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    [x: string]: any;
  }[];
  [x: string]: any;
}