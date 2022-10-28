import React, {useEffect, useState} from 'react';
import './TokenData.css';
import './TokenDataMedia.css';
import {tokenAbi, tokensAddresses, web3} from "../../../../../constants/web3";
import {getStrAfterDot} from "../../../../../functions/getStrAfterDot";

const TokenData = ({searchRes,query}) => {

    //status data
    const [statusData,setStatusData] = useState({});

    //tokens balances data
    const [fcc,setFcc] = useState('');
    const [btl,setBtl] = useState('');
    const [usdt,setUsdt] = useState('');
    const [aadk,setAadk] = useState('');

    const getBlockToken = (token,coin,balance,balCoin,adress) =>{
        return (
            <div className="block">
                <header>
                    <h4>{token}</h4>
                    <p>{coin}</p>
                </header>

                <footer>
                    <h4 className={'m-0'}>{balance} {balCoin}</h4>
                    <p>{adress}</p>
                </footer>
            </div>
        )
    }

    const setTokensBalances = () =>{
        if (searchRes[0] === 'address' && searchRes[1].address){
            //get token balances and write in state
            let tokenContractFCC = new web3.eth.Contract(tokenAbi, tokensAddresses.FCC);
            let tokenContractBTL = new web3.eth.Contract(tokenAbi, tokensAddresses.BTL);
            let tokenContractUSDT = new web3.eth.Contract(tokenAbi, tokensAddresses.USDT);
            let tokenContractAADK = new web3.eth.Contract(tokenAbi, tokensAddresses.AADK);

            tokenContractFCC.methods.balanceOf(searchRes[1].address).call().then(res => setFcc(res));
            tokenContractBTL.methods.balanceOf(searchRes[1].address).call().then(res => setBtl(res));
            tokenContractUSDT.methods.balanceOf(searchRes[1].address).call().then(res => setUsdt(res));
            tokenContractAADK.methods.balanceOf(searchRes[1].address).call().then(res => setAadk(res));
        }
    }

    useEffect(() => {

        if (searchRes[0] === 'transaction'){
            web3.eth.getTransactionReceipt(searchRes[1].hash).then(res => setStatusData(res));
        }

        setTokensBalances()

        // console.log(statusData)
        //eslint-disable-next-line
    },[searchRes,query])

    return (
        <div className={'TokenData'}>
            {//transaction data
                searchRes[0] === 'transaction' &&
                <>
                    {getBlockToken(
                        "Block info",
                        "",
                        `Num: ${searchRes[1].blockNumber}`,
                        "",
                        `Hash: ${(searchRes[1].blockHash).slice(0,25) + '...'}`
                    )}
                    {getBlockToken(
                        "Gas",
                        "",
                        "",
                        (searchRes[1].gas * searchRes[1].gasPrice)/Math.pow(10,18) + 'ADK',
                        "Gas is a transaction fee"
                    )}
                    {getBlockToken(
                        "Transaction value",
                        "",
                        "",
                        searchRes[1].value/Math.pow(10,18) + 'ADK',
                        searchRes[1].value + ' units'
                    )}
                    {
                        Object.values(statusData).length &&
                        getBlockToken(
                            "Transaction status",
                            "",
                            "",
                            statusData.status?"Confirmed":"Failed",
                            ""
                        )
                    }
                </>
            }

            {//old account data
                searchRes[0] === 'oldAccounts' &&
                <>
                    {getBlockToken(
                        "Account Balance",
                        "",
                        `${Number(getStrAfterDot(searchRes[1]['balance']/Math.pow(10,8))).toLocaleString("RU")} ADK`,
                        "",
                        `${searchRes[1]['claimed']}`
                    )}
                    {getBlockToken(
                        "Block",
                        "",
                        "",
                        `${searchRes[1]['block']===-1?'No info about block':searchRes[1]['block']}`,
                        ""
                    )}
                </>
            }

            {//account new data
                (searchRes[0] === 'address') &&
                <>
                    {getBlockToken(
                        `FCC (4-ChanCoin)`,
                        "balance",
                        `${(Number(fcc)/Math.pow(10,18)).toLocaleString()} FCC`,
                        "",
                        `${fcc + ' units'}`
                    )}
                    {getBlockToken(
                        `akBTL (Bitlocus)`,
                        "balance",
                        `${(Number(btl)/Math.pow(10,6)).toLocaleString()} BTL`,
                        "",
                        `${btl + ' units'}`
                    )}
                    {getBlockToken(
                        `akBSC-USDT (Binance USDT)`,
                        "balance",
                        `${(Number(usdt)/Math.pow(10,18)).toLocaleString()} USDT`,
                        "",
                        `${usdt + ' units'}`
                    )}
                    {getBlockToken(
                        `akADK (Wrapped ADK)`,
                        "balance",
                        `${(Number(aadk)/Math.pow(10,18)).toLocaleString()} aADK`,
                        "",
                        `${aadk + ' units'}`
                    )}
                </>
            }

            {/*{getBlockToken(*/}
            {/*    "FCC",*/}
            {/*    "4-ChanCoin",*/}
            {/*    0,*/}
            {/*    "FCC",*/}
            {/*    "0x93b4d92bfF7CB86039043b30adf63b73139Ee4AD"*/}
            {/*)}*/}
        </div>
    );
};

export default TokenData;