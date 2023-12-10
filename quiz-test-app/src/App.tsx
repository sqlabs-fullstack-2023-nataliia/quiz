import React, { useRef, useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import { Question } from './model/Question';
import 'react-toastify/dist/ReactToastify.css';
import StartPage from './components/StartPage';
import { ToastContainer, toast } from 'react-toastify';
import ShowResults from './components/ShowResults';
import axios from 'axios';
import './App.css';


function App() {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isData, setIsData] = useState(true);
  const [points, setPoints] = useState(0);
  const [question, setQuestion] = useState<Question>();
  const [showResult, setShowResult] = useState(true);
  const [startPage, setStartPage] = useState(true);
  const index = useRef(0);

  const loadData = async () => {
        setIsLoading(true);
        await axios.get<Question[]>('https://opentdb.com/api.php?amount=10&category=18')
        .then(result => {
          setQuestions(result.data.results);
          setQuestion(result.data.results[0]);
          setIsLoading(false);
          setIsData(true);
          setErrorMsg('');
          setShowResult(true);
          setStartPage(false);
          index.current = 0
        })
        .catch(err => {
          setStartPage(true);
          setErrorMsg(err.message);
          setIsLoading(false);
          setQuestions([]);
          setIsData(false);
        })
  }

  const submitAnswer = (point: number) => {
    let newPoints = points + point;
    setPoints(newPoints);
    if(index.current < questions.length){
      index.current +=1;
      setQuestion(questions[index.current])
    } 
  }

  const gameOverFn = () => {
    index.current = questions.length;
  }

  const setStatrtPage = () => {
    setIsLoading(false);
    setShowResult(false);
    setQuestions([]);
    setIsData(true);
    setPoints(0);
    setStartPage(true);
  }

  useEffect(() => {
    if(!isData){
      toast.error("No data found.");
    }
  }, [isData])

  return (
    <div >
        <ToastContainer />
      {startPage && <StartPage loadData={loadData} isLoading={isLoading}/>}
      {isLoading && <div className='d-flex justify-content-center pt-5'>
        <div className="spinner-border text-danger" role="status">
        </div>
        </div>}
      {
        questions.length !== 0
        &&
         <div>
          { index.current < questions.length 
          ? <QuestionCard 
              question={question} 
              submitAnswer={submitAnswer} 
              total={questions.length} 
              current={index.current + 1} 
              gameOverFn={gameOverFn}
              key={index.current}/>
          : showResult && <ShowResults 
            callbackFn={setStatrtPage}
            points={points} 
            totalQuestions={questions.length}/>
          }
        </div>
      }
    
    </div>
  )
}

export default App;
