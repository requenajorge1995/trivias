export interface UserInfo {
  name: string;
  country: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Result {
  correctAnswers: number;
  time: number;
}

export interface Trivia {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export type TriviasApiDataResponse = {
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    [x: string]: any;
  }[];
  [x: string]: any;
};