import React, {useEffect, useState} from 'react';
import TransactionItem from "./components/TransactionItem";
import './Transactions.css';
import './TransactionsMedia.css';
import TransactionItemMore from "./components/TransactionItemMore";
import TransactionModal from "./components/TransactionModal/TransactionModal";
import PaginateItemMore from "./components/PaginateItemMore/PaginateItemMore";
import {Alert, Spinner} from "react-bootstrap";
import axios from "axios";

const Transactions = ({showAllTrans,setShowAllTrans}) => {

    const [activeTrans,setActiveTrans] = useState(1)

    //modal for trans
    const [modalShow, setModalShow] = React.useState(false);

    //for modal data inner
    const [dataModal,setDataModal] = useState([])

    //all transactions from database
    const [transAll,setTransAll] = useState([])
    const [transAllTokens,setTransAllTokens] = useState([])
    // console.log(transAll);
    // console.log(transAllTokens);

    //for paginate
    const [currentPage,setCurrentPage] = useState(1)
    const [lengthPage] = useState(20)

    const getDataPaginate = (arr) =>{
        return arr.slice((currentPage - 1) * lengthPage,(currentPage - 1) * lengthPage + lengthPage)
    }

    useEffect(() => {
        //get all transactions from mysql
        axios.get('http://localhost:8000/getTransAll').then(result => setTransAll([...result.data]));
        axios.get('http://localhost:8000/getTransAllTokens').then(result => setTransAllTokens([...result.data]));
    },[])

    // console.log(transAll,'List all transactions in Transactions.jsx');

    return (
        <div className={`Transactions`}>
            <header>
                <h6 onClick={() => setActiveTrans(1)} className={activeTrans===1?'act':''}>ADK Transactions</h6>
                <h6 onClick={() => setActiveTrans(2)} className={activeTrans===2?'act':''} >akTOKEN Transactions</h6>
            </header>

            <div className={`content ${showAllTrans?"show":""}`}>

                {/*header for big table*/}
                {
                    showAllTrans &&
                    <div className={'header-show-table'}>
                        <p className={'small'}>TXID ID</p>
                        <p className={'small'}>Data</p>
                        <p className={'small'}>Status</p>
                        <p className={'small'}>Block</p>
                        <p className={'small'}>From To</p>
                        <p className={'small'}>Amount</p>
                        <p className={'gas small'}>Gas</p>
                        {/*<p className={'small'}>Gas Cost</p>*/}
                        <p className={'small'}>Contact Created</p>
                    </div>
                }

                {
                    activeTrans===1?
                        Object.values(getDataPaginate(transAll)).length?
                            getDataPaginate(transAll).map((elem,ids) =>(
                            showAllTrans?
                                <TransactionItemMore key={ids} data={elem} setDataModal={setDataModal} setModalShow={setModalShow} />:
                                <TransactionItem key={ids} data={elem} setDataModal={setDataModal} setModalShow={setModalShow} />
                        )):<Spinner variant={'success'} animation={"border"} className={"mt-4"} />
                        :
                        Object.values(getDataPaginate(transAllTokens)).length?
                            getDataPaginate(transAllTokens).map((elem,ids) =>(
                                showAllTrans?
                                    <TransactionItemMore token={true} key={ids} data={elem} setDataModal={setDataModal} setModalShow={setModalShow} />:
                                    <TransactionItem token={true} key={ids} data={elem} setDataModal={setDataModal} setModalShow={setModalShow} />
                            )):<Spinner variant={'success'} animation={"border"} className={"mt-4"} />
                        // <Alert variant={"success"} className={"fw-light p-2 small m-0 mt-3"}>
                        //     No information about this transactions
                        // </Alert>
                }

                <TransactionModal
                    data={dataModal}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>

            <footer>
                <button onClick={() => setShowAllTrans(!showAllTrans)}>
                    {showAllTrans?'Close':'View all transactions'}
                </button>
            </footer>

            {/*paginate*/}
            {
                showAllTrans &&
                <PaginateItemMore
                    allPages={Math.ceil((activeTrans===1?transAll:transAllTokens).length/lengthPage)}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            }
        </div>
    );
};

export default Transactions;