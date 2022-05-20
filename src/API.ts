//function that will grab data from API

import { shuffleArray } from './utils';

//specifying the type for each question
export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

//having correct and incorrect answer in the same array so as to map through array and create answers in the UI in JSX
export type QuestionState = Question & { answers: string[] };

//specifying the difficulty
export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

//async function to specify how many questions to grab
export const fetchQuizQuestions = async (
    amount: number,
    difficulty: Difficulty
  ) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        }
    ))
};