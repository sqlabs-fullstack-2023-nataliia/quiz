import React, { useEffect, useState } from "react";
import { Question } from "../model/Question";
import Timer from "./Timer";


type Props = {
  question: Question,
  submitAnswer: (point: number) => void,
  total: number,
  current: number,
}

const QuestionCard = (props: Props) => {

    const [answers, setAnswers] = useState<string[]>([]);
    const [color, setColor] = useState('rgb(237, 156, 50)');

    useEffect(() => {
        const allAnswers = [...props.question.incorrect_answers]
        allAnswers.push(props.question.correct_answer);
        setAnswers(allAnswers.sort(() => Math.random() - 0.5))
        if(props.question.difficulty === 'hard'){
          setColor('#B22222');
        } else if(props.question.difficulty === 'easy'){
          setColor('#228B22');
        }
    }, [])

    const onSubmit = (answ: string) => {
        let point = 0;
          if(answ === props.question.correct_answer){
              point = 1;
          }
        props.submitAnswer(point);
    }  

    return (
        <>
        <div className='container-fluid blue-bg'>
          <div className="row pt-3 pe-4 pb-2">
            <div className="col-10 pt-3">
              <h1 style={{color: 'white', fontWeight: 'bold'}}>Question {props.current}/{props.total}</h1>
            </div>
            <div className="col-2">
              <img src="../src/media/logo.png" alt="logo" width={75}/>
            </div>
          </div>
        </div>

        <div className="container-fluid bg-light pt-4 pb-4 px-5">
          <p>Level: <span style={{color: `${color}`, fontWeight: 'bold'}}>{props.question.difficulty.toLocaleUpperCase()}</span></p>
          <p className="q-font" style={{fontSize: '30px'}}>{props.question.question}</p>
          {answers.map((e, i) => {
            return <div key={i} className="d-grid gap-2 mt-4 mb-4" style={{height: '85px'}}>
              <button 
                onClick={() => onSubmit(e)}
                className="btn btn-lg rounded-4" 
                style={{background: '#DCDCDC', fontWeight: 'bold', color: '#696969', fontSize: '25px'}}>
                  {e}</button>
              </div>
          })}
          <div className="d-flex justify-content-center"><Timer submitFn={onSubmit}/></div>
        </div>

      </>
    )
}

export default QuestionCard;
