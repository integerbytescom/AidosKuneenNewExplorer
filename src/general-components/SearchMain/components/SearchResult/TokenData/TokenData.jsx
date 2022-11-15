import React, {useEffect, useState} from 'react';
import './TokenData.css';
import './TokenDataMedia.css';
import {getStrAfterDot} from "../../../../../functions/getStrAfterDot";
import {tokenAbi, tokensAddresses, web3} from "../../../../../constants/web3";

const TokenData = ({searchRes}) => {

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

    //tokens balances data
    const [fcc,setFcc] = useState('');
    const [btl,setBtl] = useState('');
    const [usdt,setUsdt] = useState('');
    const [aadk,setAadk] = useState('');

    // console.log(fcc,'fcc');
    // console.log(btl,'btl');
    // console.log(usdt,'usdt');
    // console.log(aadk,'aadk');

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
        setTokensBalances()
        //eslint-disable-next-line
    },[])

    return (
        <div className={'TokenData'}>
            {//transaction data
                searchRes[0] === 'hash' &&
                <>
                    {getBlockToken(
                        "Block info",
                        "",
                        `Block number: ${(searchRes[1]['blockno'])}`,
                        "",
                        "",
                    )}
                    {getBlockToken(
                        "Gas",
                        "",
                        "",
                        (searchRes[1]['gas'] * searchRes[1]['gasprice'])/Math.pow(10,18) + 'ADK',
                        "Gas is a transaction fee"
                    )}
                    {getBlockToken(
                        "Transaction value",
                        "",
                        "",
                        searchRes[1].value/Math.pow(10,18) + 'ADK',
                        searchRes[1].value + ' units'
                    )}
                    {getBlockToken(
                        "Transaction date",
                        "",
                        "",
                        searchRes[1]['log_dat'],
                        ''
                    )}
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
                        `${Number(searchRes[1]['block']) === -1?'No info about block':searchRes[1]['block']}`,
                        ""
                    )}
                </>
            }

            {//address data
                searchRes[0] === 'address' &&
                <>
                    {getBlockToken(
                        "Date created",
                        "",
                        `${searchRes[1]['dt_created']}`,
                        "",
                        ``
                    )}
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
        </div>
    );
};

export default TokenData;
