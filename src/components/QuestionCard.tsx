import React from 'react';

//styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles'

//types
import { AnswerObject } from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement >) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}


const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNr, 
    totalQuestions,
}) => (
   <Wrapper>
       <p className='number'>
           {/*Indicates question the user is on*/}
           Question: {questionNr} / {totalQuestions}
       </p>
       <p dangerouslySetInnerHTML={{ __html: question }} />
       {/*wrapped div to show the answers to the question*/}
       <div>
          {answers.map(answer => (
              <ButtonWrapper 
              key={answer}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
              >
                  {/*button is disabled depending on whether the user has made a choice*/}
                  <button disabled={!!userAnswer} value={answer} onClick={callback}>
                      {/*text for the button which is set to HTML thus the usage of dangerouslySetHTML*/}
                      <span dangerouslySetInnerHTML={{ __html: answer}} />
                  </button>
              </ButtonWrapper>
          ))}
       </div>
   </Wrapper>
);




export default QuestionCard;