import React, { useRef } from 'react';
import QuestionCard from './components/QuestionCard';
import { Question } from './model/Question';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {

  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isData, setIsData] = React.useState<boolean>(true);
  const [showHeader, setShowHeader] = React.useState<boolean>(true);
  const [points, setPoints] = React.useState(0);
  const [question, setQuestion] = React.useState<Question>();
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [showAnswers, setShowAnswers] = React.useState(false);
  const index = useRef(0);

  const loadData = async () => {
        setIsLoading(true);
        await axios.get<Question[]>('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
        .then(result => {
          setQuestions(result.data.results);
          setQuestion(result.data.results[0]);
          setIsLoading(false);
          setIsData(true);
          setErrorMsg('');
          setShowHeader(false);
        })
        .catch(err => {
          setErrorMsg(err.message);
          setIsLoading(false);
          setQuestions([]);
          setIsData(false);
          setShowHeader(true);
        })
  }

  const submitAnswer = (point: number, answer: string) => {
    let copyAnswers: string[] = [...answers];
    copyAnswers.push(answer);
    setAnswers(copyAnswers);
    let newPoints = points + point;
    setPoints(newPoints);
    if(index.current < questions.length){
      index.current +=1;
      setQuestion(questions[index.current])
    }
  }

  return (
    <div className='container-fluid' style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      {
        showHeader && <h1 style={{textAlign: 'center', padding: '10px', background: '#DCDCDC'}}>Press button to start quiz!</h1>
      }
      <div className="row">
        <div className="col" style={{textAlign: 'center', margin: '25px'}}>
        {
        isLoading ? <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
        </div> : showHeader && <button onClick={loadData} className="btn btn-success">Start Quiz</button>
        }
        </div>
      </div>
      {
        questions.length === 0
        ? <h2 style={{textAlign: 'center'}}>{!isData && 'No data found.'}</h2>
        :  <div className='container'>
          { index.current < questions.length 
          ? <QuestionCard question={question} submitAnswer={submitAnswer} total={questions.length} current={index.current + 1} key={index.current}/>
          : <div className='container'>
              <div className='row'>
                <div className="col" style={{textAlign: 'center'}}>
                  <h1 >Result</h1>
                  <h2>Total questions: {questions.length}</h2>
                  <h2>Correct answers: {points}</h2>
                  {
                    !showAnswers && <button className="btn btn-primary" onClick={() => setShowAnswers(true)}>Show answers</button>
                  }
                  {
                    showAnswers &&
                    <div className='container' style={{textAlign: 'left', margin: '25px'}}>
                      <ol className="list-group list-group-numbered">
                        {questions.map((q, i)=> {
                          return <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                              <div className="fw-bold">{q.question}</div>
                              <span style={{borderBottom: '3px solid green'}}>Correct answer: {q.correct_answer}</span><br/>
                                {q.correct_answer !== answers[i] 
                                ? <span style={{borderBottom: '3px solid red'}}>Your answer: {answers[i]}</span> 
                                : <></>}  
                            </div>
                          </li>
                        })}     
                      </ol>     
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default App;
