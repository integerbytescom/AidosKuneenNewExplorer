import React, {useState} from 'react';
import './ThirdPage.css';

const ThirdPage = ({setShowFormPage}) => {

    const [selectNet,setSelectNet] = useState('adk')

    //for change select net
    const handleSetSelectNet = () =>{
        if (selectNet === 'adk'){
            setSelectNet('bin')
        }else {
            setSelectNet('adk')
        }
    }

    //for getting button verstka
    const getButton = (text,pageShow) =>{
        return(
            <button
                className={'right-mod-but bigWid'}
                onClick={() => setShowFormPage({show:true,page:pageShow})}
            >
                {text}
            </button>
        )
    }

    return (
        <div className={'ThirdPage'}>
            <header>
                <span>
                    <p className="small">From</p>
                    {
                        selectNet==='adk'?
                            <p className="net adk">Aidos Network</p>:
                            <p className="net bin">Binance Chain</p>
                    }
                </span>

                {/*refresh button*/}
                <img
                    className={'refresh'}
                    src="/images/modal-login/refresh.svg"
                    alt="refresh"
                    onClick={handleSetSelectNet}
                />

                <span>
                    <p className="small">To</p>
                    {
                        selectNet==='adk'?
                            <p className="net bin">Binance Chain</p>:
                            <p className="net adk">Aidos Network</p>
                    }
                </span>
            </header>

            <div className="but-container">
                {getButton('Send from Aidos Kuneen','send')}
                {getButton('Receive on Binance Chain','receive')}
                {getButton('Your Transfer Fee Balance','transfer')}
                {getButton('Transaction Status','status')}
                {getButton('Convert ADK/akADK','convert')}
            </div>

        </div>
    );
};

export default ThirdPage;