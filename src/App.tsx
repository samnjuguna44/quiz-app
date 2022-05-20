import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//components
import QuestionCard from './components/QuestionCard';

//Types
import { QuestionState, Difficulty } from './API';

//styles
import { GlobalStyle, Wrapper } from './components/App.styles';

//object defining the user answers types
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;


const App = () => {
  //loading state
  const [loading, setLoading] = useState(false);

  //question state
  const [questions, setQuestions] = useState<QuestionState[]>([]);

  //state showing what question number the user is on
  const [number, setNumber] = useState(0);

  //state to show the users answer
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);

  //state to set the user score
  const [score, setScore] = useState(0);

  //state to set whether the game is over
  const [gameOver, setGameOver] = useState(true);

  
  //console.log(questions);

  //making API call from this function to start up the quiz
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  //function triggered when user selects an answer and when not on game over
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement >) => {
    if(!gameOver) {
      //User answer => calling the callback onClick in QuestionCard.tsx
      const answer = e.currentTarget.value;
      //Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      //Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  //function that is triggered when person clicks next question
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>TRIVIA QUIZ</h1>

      {/*Button to be displayed if game is over or if user has answered last question*/}
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className='start' onClick={startTrivia}>
        Start
      </button>
      ) : null}
       
       {/*show the score if we are not in game over mode*/}
      {!gameOver ? <p className='score'>Score: {score}</p> : null}

      {/*loading section to be shown when loading something*/}
      {loading && <p>Loading Questions ....</p>}

      {/*Question card to be shown only if we are not loading or in game over*/}
      {!loading && !gameOver && (
        <QuestionCard 
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      
      {/*next button to be shown if we are not in game over or loading or when user hasn't provided answer to question*/}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
      
    </Wrapper>
    </>
  );
}

export default App;
