import React, {useEffect, useState} from 'react';
import './TokenData.css';
import './TokenDataMedia.css';
import {web3} from "../../../../../constants/web3";
import {getStrAfterDot} from "../../../../../functions/getStrAfterDot";

const TokenData = ({searchRes}) => {

    //status data
    const [statusData,setStatusData] = useState({})

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

    useEffect(() => {
        if (searchRes[0] === 'transaction'){
            web3.eth.getTransactionReceipt(searchRes[1].hash).then(res => setStatusData(res));
        }
        // console.log(statusData)
        //eslint-disable-next-line
    },[searchRes[0]])

    return (
        <div className={'TokenData'}>
            {
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

            {
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