import React, { useEffect, useState } from "react";

type Props = {
    points: number,
    totalQuestions: number
    callbackFn: () => void
}

const ShowResults = (props: Props) => {
    const [header, setHeader] = useState('GREAT JOB');
    const [result, setResult] = useState('You answered all the questions correctly');
    const [image, setImage] = useState('../src/media/success_character.png');
    const [color, setColor] = useState('#228B22')

    const timer = () => {
        props.callbackFn()
    }
    useEffect(() => {
        setTimeout(timer, 5000)
    }, [])

    useEffect(() => {
        if(props.points !== props.totalQuestions){
            if((Math.floor(props.points * 100) / props.totalQuestions) >= 80){
                setResult(`You answered ${props.points} from ${props.totalQuestions} questions correct`);
            } else {
                setHeader('FAILED');
                setResult(`You need to have at least ${Math.floor((80 * props.totalQuestions) / 100)} correct answers`);
                setImage('../src/media/failed_character.png');
                setColor('#B22222')
            }
        }
    }, [])
  
    return (
        <>
        <div className='container-fluid' style={{background: `${color}`}}>
          <div className="row pt-2 pe-4 pb-2">
            <div className="col-10 pt-3">
            </div>
            <div className="col-2">
              <img src="../src/media/logo.png" alt="logo" width={75}/>
            </div>
          </div>
        </div>
        <div className='container'>
              <div className='row py-5'>
                <div className="col" style={{textAlign: 'center'}}>
                  <h1 style={{fontWeight: 'bold', fontSize: '70px', color: `${color}`}}>{header}</h1>
                  <p style={{fontSize: '35px'}} className="px-5 q-font">{result}</p>
                    <img className="py-5" src={image} alt="image"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default ShowResults;