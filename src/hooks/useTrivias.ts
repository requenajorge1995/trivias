import { useState, useEffect } from 'react';
import { Trivia } from '../types';
import { decodeEntities } from '../utils';


import useFetch from './useFetch';

export default function useTrivias(categoryId: number) {
  const { data, isLoading, error } = useFetch<ApiDataResponse>(`https://opentdb.com/api.php?amount=20&category=${categoryId}&type=multiple`);

  const [trivias, setTrivias] = useState<Trivia[]>([]);

  useEffect(() => {
    if (isLoading || error || !data) return;

    setTrivias(
      data.results.map(trivia => ({
        question: decodeEntities(trivia.question),
        correctAnswer: decodeEntities(trivia.correct_answer),
        incorrectAnswers: trivia.incorrect_answers.map(decodeEntities)
      }))

    );
  }, [data, isLoading, error]);

  return { trivias, isLoading, error };
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