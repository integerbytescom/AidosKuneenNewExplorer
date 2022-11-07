import React from 'react';
import {FormControl} from "react-bootstrap";

const TransferBalance = () => {
    return (
        <div className={'FormPage TransferBalance'}>
            <h6 className={'mb-3'}>Your Transfer Fee Balance</h6>
            <p className="small-small mb-0">Transfer fee credits available for account</p>
            <p className="small">{'0x62AC3C41AD0E2eCC4681fD21596415501BEc3cC4'.slice(0,25) + '...'}</p>
            <hr/>

            <p className="small-small mb-2">Your current BNB fee credits:</p>
            <FormControl placeholder={'0.0 BNB'} />

            <p className="small-small mt-4 mb-2">
                Current fee required to RECEIVE token
                on Binance Chain side (per transfer)
            </p>
            <FormControl placeholder={'0.0 BNB'} />

            <button className={'right-mod-but bigWid blue mt-4'}>
                Change Network
            </button>
        </div>
    );
};

export default TransferBalance;