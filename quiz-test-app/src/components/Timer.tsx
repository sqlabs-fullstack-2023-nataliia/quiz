import React, { useState, useEffect} from "react";

type Props = {
    submitFn: (answer: string) => void;
    gameOverFn: () => void;
}

const Timer = (props: Props) => {

    const [time, setTime] = useState(5);

    const timer = () => {
        let tmp = time - 1;
        setTime(tmp);
        if(tmp < 0){
            props.submitFn('');
            props.gameOverFn();
        }
    }

    useEffect(() => {
        setTimeout(timer, 1000)
    }, [time])

    return (
        <>
        <div className="px-3 py-4" style={{border: '10px solid #1E90FF', borderRadius: '25rem', color: '#1E90FF', fontSize: '30px', fontWeight: 'bold'}}>
            <span>0:{time < 10 ? "0" : ""}{time}</span>
        </div>
        </>
    )
}

export default Timer;