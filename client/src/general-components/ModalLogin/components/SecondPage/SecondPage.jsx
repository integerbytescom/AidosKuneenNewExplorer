import React from 'react';
import './SecondPage.css';
import {coinsDataAdkNetwork, coinsDataBinanceNetwork} from "./SecondPageData";

const SecondPage = ({setShowPage}) => {

    const handleAddToken = (elem) => {
        if (window.ethereum){
            window.ethereum
                .request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: elem.adress,
                            symbol: elem.symbol,
                            decimals: elem.decimals,
                            image: elem.image,
                        },
                    },
                })
                .then((success) => {
                    if (success) {
                        console.log(elem.symbol + ' successfully added to wallet!');
                    } else {
                        alert('Something went wrong.');
                    }
                })
                .catch(() => alert('Add token error! '));
        }else {
            alert('You need install metamask extension!')
        }
    }

    return (
        <div className={`SecondPage`}>
            <div className="circle-text">
                <div className="circle">3</div>
                <p>Add Tokens</p>
            </div>

            <div className="table-buttons">
                <header>
                    <p>Aidos Network</p>
                    <p>Binance <br /> Smart Chain</p>
                </header>
                <div className="column">
                    {
                        coinsDataAdkNetwork.map(coin => (
                            <button
                                key={coin.symbol}
                                onClick={() => handleAddToken(coin)}
                            >
                                {coin.symbol}
                            </button>
                        ))
                    }
                </div>
                <div className="column bin">
                    {/*we cant use this buttons with adk network also binance*/}
                    {
                        coinsDataBinanceNetwork.map(coin => (
                            <button
                                key={coin.symbol}
                                onClick={() => handleAddToken(coin)}
                            >
                                {coin.symbol}
                            </button>
                        ))
                    }
                </div>
            </div>

            <button onClick={() => setShowPage(3)} className={'right-mod-but sm next'}>
                Next
            </button>
        </div>
    );
};

export default SecondPage;