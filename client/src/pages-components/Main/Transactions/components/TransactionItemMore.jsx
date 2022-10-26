import React from 'react';
import {getStrAfterDot} from "../../../../functions/getStrAfterDot";

const TransactionItemMore = ({data,setModalShow,setDataModal}) => {

    // console.log(data,'TransactionItemMore');

    const sliceStrCenter = (value) =>{
        const str = String(value)
        return str.slice(0,5) + '...' + str.slice(str.length-5,str.length)
    }

    const setModal = data =>{
        setModalShow(true)
        setDataModal(data)
    }

    return (
        <>
            <tr className={'TransactionItem more'} onClick={()=>setModal(data)}>
                <span className={'adress'}>
                    <p>{sliceStrCenter(data['transactionhash'])}</p>
                </span>
                <span className={'date'}>
                    <p>{data['log_dat'] || data['timestamp']}</p>
                </span>
                <span className={'status'}>
                    {
                        data['status'] ?
                            <p style={data['status']==='0x1'?{color:"#04CA73"}:{color:'#9a2929'}}>
                                {data['status']==='0x1'?'Confirmed':'Rejected'}
                            </p>:
                            <p className={"text-white"}>-</p>
                    }
                </span>
                <span className={'block'}>
                    <p>{data['blockno']}</p>
                </span>
                <div className={'from-to'}>
                    <span className={`d-flex`}>
                        <p className={'opacity-50 fw-light'}>From:</p>
                        <p>{sliceStrCenter(data['txfrom'])}</p>
                    </span>
                    <span className={`d-flex`}>
                        <p className={'opacity-50 fw-light'}>To:</p>
                        <p>{sliceStrCenter(data['txto'])}</p>
                    </span>
                </div>
                <span className={'adk'}>
                    <p>
                        {
                            (data['tokenname']==='akBTL')?
                                getStrAfterDot(data['value']/Math.pow(10,6)):
                                getStrAfterDot(data['value']/Math.pow(10,18))
                        }
                        <small style={{fontSize:10,fontWeight:200}}>
                            {data['tokenname']?data['tokenname']:'ADK'}
                        </small>
                    </p>
                </span>
                <span className={'gas'}>
                    <p>{data['gas'] || '-'}</p>
                </span>
                {/*<span className={'adkCost'}>*/}
                {/*    <p>{data.adkCost}</p>*/}
                {/*</span>*/}
                <span className={'cont-creat'}>
                    <p>{data['contract'] || '-'}</p>
                </span>
            </tr>
        </>
    );
};

export default TransactionItemMore;