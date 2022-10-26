import React, {useState,useEffect} from 'react';
import './ModalLogin.css';
import './ModalLoginMedia.css';
import Dots from "./components/Dots/Dots";
import FirstPage from "./components/FirstPage/FirstPage";
import SecondPage from "./components/SecondPage/SecondPage";
import {useWeb3React} from "@web3-react/core";
import {injected} from "../../functions/connectors";
import {Alert} from "react-bootstrap";
import ModalLoginHeader from "./components/ModalLoginHeader";
import ThirdPage from "./components/ThirdPage/ThirdPage";
import HeaderBack from "./formComponents/HeaderBack/HeaderBack";
import SendAdk from "./formComponents/SendAdk/SendAdk";
import './formComponents/FormComponents.css';
import ReceiveClaim from "./formComponents/ReceiveClaim/ReceiveClaim";
import TransferBalance from "./formComponents/TransferBalance/TransferBalance";
import TransStatus from "./formComponents/TransStatus/TransStatus";
import ConvertAdk from "./formComponents/ConvertAdk/ConvertAdk";
import {web3} from "../../constants/web3";

const ModalLogin = ({show,onHide}) => {

    const [dataTrans,setDataTrans] = useState([])
    // console.log(dataTrans)

    //show page with dots and header
    const [showPage,setShowPage] = useState(1)

    //show page with hedaer back
    const [showFormPage,setShowFormPage] = useState({show:false,page:''})

    // https://github.com/Shmoji/web3-react-example/blob/main/pages/index.js
    const {
        active,
        account,
        chainId,
        activate,
        deactivate
    } = useWeb3React();

    const [error,setError] = useState('')

    //transaction count for one account
    // if (window.ethereum && account){
    //     web3.eth.getTransactionCount(account).then(console.log);
    // }

    // console.info(
    //     '(ETH PROVIDER) active: ' + active + '\n',
    //     '(ETH PROVIDER) account: ' + account + '\n',
    //     '(ETH PROVIDER) chainId: ' + chainId + '\n',
    // )

    //for connect account
    async function connect() {
        if (window.ethereum){
            try {
                await activate(injected)
                window.localStorage.setItem('isWalletConnected', 'true')
            } catch (ex) {
                setError('Connect error button!')
            }
        }else {
            setError('Install metamask extension!')
        }
    }

    //for disconnect account
    async function disconnect() {
        if (window.ethereum){
            try {
                deactivate()
                window.localStorage.setItem('isWalletConnected', 'false')
            } catch (ex) {
                setError('Disconnect error!')
            }
        }else {
            setError('Install metamask extension!')
        }
    }

    //for add adk network (auto)
    const addADKNetworkAUTO = async () => {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x9d50',
                chainName: 'ADK Mainnet v2.1',
                nativeCurrency: {
                    name: 'ADK',
                    symbol: 'ADK',
                    decimals: 18
                },
                rpcUrls: ['https://api1.mainnet.aidoskuneen.com:9443'],
                blockExplorerUrls: ['https://explorer.mainnet.aidoskuneen.com']
            }]
        })
            .then(res => console.log(res))
            .catch((error) => {
                setError('Network connect error!');
            })
    }


    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (window.ethereum){
                if (window.localStorage.getItem('isWalletConnected') === 'true') {
                    try {
                        await activate(injected)
                        window.localStorage.setItem('isWalletConnected', 'true')
                    } catch (ex) {
                        setError('Connect error useEffect!')
                    }
                }
            }else {
                setError('Install metamask extension!')
            }
        }
        connectWalletOnPageLoad()

        //transactions from getTransactionCount()
        if (account){
            web3.eth.getTransactionCount(account)
                .then(count =>{
                    setDataTrans([]);
                    for(let i=0; i<count; i++){
                        web3.eth.getBlock(count-i).then(block=> {
                            // console.log(block,'block info');
                            for (let trans in block.transactions){
                                setDataTrans(old => [...old,block.transactions[trans]])
                            }
                        });
                    }
                })
                // .then(console.log(Array.from(new Set(dataTrans))))
        }

    }, [activate,account])

    return (
        <div className={`ModalLogin`} hidden={!show}>
            <img className={'wave-bg'} src="/images/modal-login/waves.svg" alt=""/>

            {/*{//check show blocks with header back button (if this true not show dots)*/}
            {/*    !showFormPage.show &&*/}
            {/*    <Dots showPage={showPage} setShowPage={setShowPage} />*/}
            {/*}*/}

            <div className="content py-4">

                <ModalLoginHeader
                    chainId={chainId}
                    account={account}
                    active={active}
                />

                <FirstPage
                    setShowPage={setShowPage}
                    active={active}
                    connect={connect}
                    disconnect={disconnect}
                    addADKNetworkAUTO={addADKNetworkAUTO}
                    chainId={chainId}
                />
            </div>

            {/*{//if show pages with header back button === true show other block*/}
            {/*    !showFormPage.show?*/}
            {/*        <div className="content">*/}
            {/*            <ModalLoginHeader*/}
            {/*                chainId={chainId}*/}
            {/*                account={account}*/}
            {/*                active={active}*/}
            {/*            />*/}
            {/*            {*/}
            {/*                showPage===1?*/}
            {/*                    <FirstPage*/}
            {/*                        setShowPage={setShowPage}*/}
            {/*                        active={active}*/}
            {/*                        connect={connect}*/}
            {/*                        disconnect={disconnect}*/}
            {/*                        addADKNetworkAUTO={addADKNetworkAUTO}*/}
            {/*                        chainId={chainId}*/}
            {/*                    />:showPage===2?*/}
            {/*                        <SecondPage*/}
            {/*                            setShowPage={setShowPage}*/}
            {/*                        />:*/}
            {/*                        <ThirdPage*/}
            {/*                            setShowFormPage={setShowFormPage}*/}
            {/*                        />*/}
            {/*            }*/}

            {/*            {*/}
            {/*                error &&*/}
            {/*                <Alert className={'p-1 w-100 mt-3 text-center font-monospace'} variant={'danger'}>*/}
            {/*                    {error}*/}
            {/*                </Alert>*/}
            {/*            }*/}
            {/*        </div>:*/}
            {/*        <>*/}
            {/*            <HeaderBack setShowFormPage={setShowFormPage} setShowPage={setShowPage} />*/}
            {/*            <div className="content" style={{minHeight:350}}>*/}
            {/*                {showFormPage.page === 'send' && <SendAdk />}*/}
            {/*                {showFormPage.page === 'receive' && <ReceiveClaim />}*/}
            {/*                {showFormPage.page === 'transfer' && <TransferBalance />}*/}
            {/*                {showFormPage.page === 'status' && <TransStatus />}*/}
            {/*                {showFormPage.page === 'convert' && <ConvertAdk />}*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*}*/}
        </div>
    );
};

export default ModalLogin;