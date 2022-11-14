import React from 'react';
import './TokenData.css';
import './TokenDataMedia.css';
import {getStrAfterDot} from "../../../../../functions/getStrAfterDot";

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
                </>
            }
        </div>
    );
};

export default TokenData;
