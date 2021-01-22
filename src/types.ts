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

