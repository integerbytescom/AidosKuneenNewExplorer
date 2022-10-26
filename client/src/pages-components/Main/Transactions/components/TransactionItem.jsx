import React from 'react';
import {getStrAfterDot} from "../../../../functions/getStrAfterDot";

const TransactionItem = ({token,data,setModalShow,setDataModal}) => {

    // console.log(data,'TransactionItem');

    const sliceStr = (value) =>{
        return String(value).slice(0,20) + '...'
    }

    const setModal = data =>{
        setModalShow(true)
        setDataModal(data)
    }

    return (
        <>
            <div onClick={()=>setModal(data)} className={`TransactionItem`}>
                <span>
                    <p>{sliceStr(data['transactionhash'])}</p>
                    {
                        token?
                            <p className={'date'}>{data['timestamp']}</p>:
                            <p className={'date'}>{data['log_dat']}</p>
                    }
                </span>

                <span>
                    <p><span>From: </span>{sliceStr(data['txfrom'])}</p>
                    <p><span>To: </span>{sliceStr(data['txto'])}</p>
                </span>

                <div className="button-container">
                    <button>
                        {
                            (token && data['tokenname']==='akBTL')?
                                getStrAfterDot(data['value']/Math.pow(10,6)):
                                getStrAfterDot(data['value']/Math.pow(10,18))
                        }
                        {/*{getStrAfterDot(data['value']/Math.pow(10,18))}*/}
                        <small style={{fontSize:11,fontWeight:200,marginLeft:1}}>{token?data['tokenname']:'ADK'}</small>
                    </button>
                </div>
            </div>
        </>
    );
};

export default TransactionItem;