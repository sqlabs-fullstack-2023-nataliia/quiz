import React, { useEffect } from "react";
import { Question } from "../model/Question";
import { ToastContainer, toast } from 'react-toastify';


type Props = {
  question: Question,
  submitAnswer: (point: number, answer: string) => void,
  total: number,
  current: number,
}

const QuestionCard = (props: Props) => {

    const [answers, setAnswers] = React.useState<string[]>([]);
    const [answer, setAnswer] = React.useState(null);

    useEffect(() => {
        const allAnswers = [...props.question.incorrect_answers]
        allAnswers.push(props.question.correct_answer);
        setAnswers(allAnswers.sort(() => Math.random() - 0.5))
    }, [])

    const handleCheckboxChange = (event: any) => {
        setAnswer(event.target.value);
    };

    const onSubmit = () => {
        let point = 0;
        if(answer === null){
            toast.error('Answer was not chosen!') 
        } else {
            if(answer === props.question.correct_answer){
                point = 1;
            }
            if (props.submitAnswer) {
                props.submitAnswer(point, answer);
            }
        }    
    }

    return (
        <>
        <div className='d-flex center justify-content-center'>
        <ToastContainer />
        <h1>Quiz {props.question.category}</h1>
        </div>
        <div className='row'>
          <div className="col-xs-6 pt-5 pb-5 ">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Question {props.current}/{props.total}</h2>
                <h5 className="card-title">{props.question.question}</h5>
                <ul className="list-group list-group-flush">
                  {answers.map((a, i) => {
                    return <li key={i} className="list-group-item" >
                    <div className="form-check">
                      <input className="form-check-input"  
                        type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                        checked={a === answer}
                        value={a}
                        onChange={handleCheckboxChange}
                        />
                      <label className="form-check-label" htmlFor="flexRadioDefault2" >
                        {a}
                      </label>
                    </div>
                  </li>
                  })}
                </ul>
                <div className='container'>
                  <div className='row'>
                    <div className='col-10'></div>
                    <div className='col-2 d-flex justify-content-center'>
                    <button onClick={onSubmit} className="btn btn-success">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default QuestionCard;
