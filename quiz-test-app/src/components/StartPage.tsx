import React from "react";

type Props = {
    loadData: () => void,
    isLoading: boolean
}
const StartPage = (props: Props) => {

    return (
        <>
            {!props.isLoading 
            && <div className="container text-center blue-bg" style={{paddingBottom: '36vh'}}>
                <div className="row justify-content-center">
                    <div className="col-12-xs pt-4" >
                        <img src="../src/media/splash_logo.png" alt="image"/>
                    </div>
                    <div className="col-12-xs d-grid gap-2 col-10 mx-auto pt-5 pb-5">
                        <button onClick={props.loadData} 
                            className="btn btn-light rounded-4" 
                            style={{color: '#696969', fontWeight: 'bold', fontSize: '35px', height: '85px'}}>
                                Let's Play</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default StartPage;