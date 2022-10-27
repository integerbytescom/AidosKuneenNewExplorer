import React from 'react';
import {getStrAfterDot} from "../../../../functions/getStrAfterDot";

const AccountsItem = ({data}) => {

    // console.log(data,'AccountsItem data');

    //str slice functions
    const sliceStr = (value) =>{
        return String(value).slice(0,20) + '...'
    }

    //redact balance format
    const getBalance = value => {
        return Number(getStrAfterDot(value/Math.pow(10,8))).toLocaleString("RU")
    }

    return (
        <>
            <div className={`TransactionItem`}>
                <span>
                    <p>AZ9 Address: {sliceStr(data['AZ9Address'])}</p>
                    <p className={'date'}>AZ9 Hash: {sliceStr(data['az9_hash'])}</p>
                </span>

                <span>
                    <p><span>Block: </span>{data['block']===-1?'-':data['block']}</p>
                    <p><span>Claimed: </span>{data['claimed']}</p>
                </span>

                <div className="button-container w-25">
                    <button>
                        {'Balance: ' + getBalance(data['balance'])}
                        <small style={{fontSize:11,fontWeight:200,marginLeft:1}}>ADK</small>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccountsItem;
