import React from 'react';

const ReceiveClaim = () => {
    return (
        <div className={'FormPage ReceiveClaim'}>
            <h6 style={{marginBottom:80}}>
                Claim/Receive on Binance Chain
            </h6>

            <p className={'small mb-3 fw-normal'}>
                This TAB requires you<br />
                to be connected to Binance Chain
            </p>

            <button className={'right-mod-but bigWid blue'}>
                Change Network
            </button>
        </div>
    );
};

export default ReceiveClaim;