import React, {useState} from 'react';
import TransactionItem from "./components/TransactionItem";
import './Transactions.css';
import './TransactionsMedia.css';
import TransactionItemMore from "./components/TransactionItemMore";
import TransactionModal from "./components/TransactionModal/TransactionModal";
import PaginateItemMore from "./components/PaginateItemMore/PaginateItemMore";
import {Alert, Spinner} from "react-bootstrap";
import AccountsItem from "./components/AccountsItem";

const Transactions = ({showAllTrans,setShowAllTrans,transAll,transAllTokens,oldAccounts,sort,setQuery,setSearchFocus}) => {

    const [activeTrans,setActiveTrans] = useState(1);

    //modal for trans
    const [modalShow, setModalShow] = React.useState(false);

    //for modal data inner
    const [dataModal,setDataModal] = useState([])

    //for paginate
    const [currentPage,setCurrentPage] = useState(1)
    const [lengthPage] = useState(20)

    const getDataPaginate = (arr) =>{
        return arr.slice((currentPage - 1) * lengthPage,(currentPage - 1) * lengthPage + lengthPage)
    }

    // console.log(transAll,'List all transactions in Transactions.jsx');

    return (
        <div className={`Transactions`}>
            <header>
                <h6 onClick={() => setActiveTrans(1)} className={activeTrans===1?'act':''}>ADK Transactions</h6>
                <h6 onClick={() => setActiveTrans(2)} className={activeTrans===2?'act':''} >akTOKEN Transactions</h6>
                <h6 onClick={() => setActiveTrans(3)} className={activeTrans===3?'act':''} >Claim status AZ9</h6>
            </header>

            {/*warning alert tell you that trans.length === 0*/}
            {
                sort?
                    <>
                        {
                            (activeTrans===1 && !transAll.length) &&
                            <Alert variant={"success"} className={"alert-trans"}>
                                No data in ADK transactions for your request
                            </Alert>
                        }
                        {
                            (activeTrans===2 && !transAllTokens.length) &&
                            <Alert variant={"success"} className={"alert-trans"}>
                                No data in akTOKEN transactions for your request
                            </Alert>
                        }
                        {
                            (activeTrans===3 && !oldAccounts.length) &&
                            <Alert variant={"success"} className={"alert-trans"}>
                                No data claim in status AZ9 for your request
                            </Alert>
                        }
                    </>:
                    <>
                        {
                            (activeTrans===1 && !transAll.length) &&
                            <Alert variant={"success"} className={"alert-trans"}>
                                Loading information about ADK transactions
                                <Spinner animation={"border"} size={"sm"} variant={"success"} />
                            </Alert>
                        }
                        {
                            (activeTrans===2 && !transAllTokens.length) &&
                            <Alert variant={"success"} className={"alert-trans"}>
                                Loading information about akTOKEN transactions
                                <Spinner animation={"border"} size={"sm"} variant={"success"} />
                            </Alert>
                        }
                        {
                            (activeTrans===3 && !oldAccounts.length) &&
                            <Alert variant={"success"} className={"alert-trans"}>
                                Loading information about AZ9 status
                                <Spinner animation={"border"} size={"sm"} variant={"success"} />
                            </Alert>
                        }
                        </>
            }

            {/*content*/}
            <div className={`content ${showAllTrans?"show":""}`}>

                {/*header for big table*/}
                {
                    (showAllTrans && activeTrans!==3) &&
                    <div className={'header-show-table'}>
                        <p className={'small'}>TXID ID</p>
                        <p className={'small'}>Date</p>
                        <p className={'small'}>Status</p>
                        <p className={'small'}>Block</p>
                        <p className={'small'}>From To</p>
                        <p className={'small'}>Amount</p>
                        <p className={'gas small'}>Gas</p>
                        {/*<p className={'small'}>Gas Cost</p>*/}
                        <p className={'small'}>Contact Created</p>
                    </div>
                }

                {//show adk transactions
                    activeTrans===1 &&
                        Boolean(Object.values(getDataPaginate(transAll)).length) &&
                            getDataPaginate(transAll).map((elem,ids) =>(
                            showAllTrans?
                                <TransactionItemMore key={ids} data={elem} setDataModal={setDataModal} setModalShow={setModalShow} />:
                                <TransactionItem key={ids} data={elem} setDataModal={setDataModal} setModalShow={setModalShow} />
                        ))
                }

                {//show akTOKEN transactions
                    activeTrans===2 &&
                    Boolean(Object.values(getDataPaginate(transAllTokens)).length) &&
                    getDataPaginate(transAllTokens).map((elem,ids) =>(
                        showAllTrans?
                            <TransactionItemMore token={true} key={ids} data={elem} setDataModal={setDataModal} setModalShow={setModalShow} />:
                            <TransactionItem token={true} key={ids} data={elem} setDataModal={setDataModal} setModalShow={setModalShow} />
                    ))
                }

                {//show data with old accounts
                    activeTrans===3 &&
                    Boolean(Object.values(getDataPaginate(oldAccounts)).length) &&
                    getDataPaginate(oldAccounts).map((elem,ids) =>(
                        <AccountsItem key={ids} data={elem} />
                    ))
                }

                {/*modal for more info about trans*/}
                <TransactionModal
                    data={dataModal}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    setSearchFocus={setSearchFocus}
                    setQuery={setQuery}
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
                    allPages={Math.ceil((
                        activeTrans===1?transAll:
                            activeTrans===2?transAllTokens:
                                oldAccounts
                    ).length/lengthPage)}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            }
        </div>
    );
};

export default Transactions;
