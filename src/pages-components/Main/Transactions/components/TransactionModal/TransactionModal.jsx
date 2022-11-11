import React from 'react';
import {Modal} from "react-bootstrap";
import './TransactionModal.css';
import {getStrAfterDot} from "../../../../../functions/getStrAfterDot";


const TransactionModal = ({data,show,onHide,setQuery,setSearchFocus}) => {

    // console.log(data,'TransactionModal');

    //get in search
    const handleSearch = value =>{
        onHide();
        setQuery(value);
        setSearchFocus(true);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            className={`TransactionModal`}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h4>Transaction Details</h4>
                {
                    data['status'] &&
                    <div className={`success`}>

                        {
                            data['status'] === '0x1' &&
                            <img src="/images/modal/success.svg" alt="Denied"/>
                        }
                        {
                            data['status'] === '0x1'?
                                <h5>Confirmed</h5>:
                                <h5 style={{color:'#9a2929',fontWeight:'700',marginLeft:0}}>Rejected</h5>
                        }
                    </div>
                }
            </Modal.Header>
            <Modal.Body>
                <div className="block">
                    <div className="inner">
                        <p className="left">Transaction Hash:</p>
                        <p className="right copy" onClick={() => handleSearch(data['transactionhash'])}>
                            {data['transactionhash']}
                        </p>
                    </div>
                    <div className="inner">
                        <p className="left">Timestamp:</p>
                        <p className="right">{data['log_dat'] || data['timestamp']}</p>
                    </div>
                    <div className="inner">
                        <p className="left">Block:</p>
                        <p className="right">{data['blockno']}</p>
                    </div>
                </div>
                <div className="block">
                    <div className="inner">
                        <p className="left">From:</p>
                        <p className="right copy" onClick={() => handleSearch(data['txfrom'])}>
                            {data['txfrom']}
                        </p>
                    </div>
                    <div className="inner">
                        <p className="left">To:</p>
                        <p className="right copy" onClick={() => handleSearch(data['txto'])}>
                            {data['txto']}
                        </p>
                    </div>
                </div>
                <div className="block">
                    <div className="inner">
                        <p className="left">Amount:</p>
                        <p className="right">
                            {
                                (data['tokenname']==='akBTL')?
                                    getStrAfterDot(data['value']/Math.pow(10,6)):
                                    getStrAfterDot(data['value']/Math.pow(10,18))
                            }
                            <small style={{fontSize:12,fontWeight:200,marginLeft:3}}>
                                {data['tokenname']?data['tokenname']:'ADK'}
                            </small>
                        </p>
                    </div>
                    <div className="inner">
                        <p className="left">Transaction Fee:</p>
                        <p className="right">{data.adkCost || '-'}</p>
                    </div>
                </div>
                <div className="block">
                    <div className="inner">
                        <p className="left">Gas:</p>
                        <p className="right">{data['gas'] || '-'}</p>
                    </div>
                    <div className="inner">
                        <p className="left">Gas price:</p>
                        <p className="right">{data['gasprice'] || '-'}</p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default TransactionModal;