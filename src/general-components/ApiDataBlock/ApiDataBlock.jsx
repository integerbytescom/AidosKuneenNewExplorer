import React, {useEffect, useState} from 'react';
import './ApiDataBlock.css';
import './ApiDataBlockMedia.css';
import {useApi} from "../../hooks/useApi";
import axios from "axios";

const ApiDataBlock = () => {

    //api data
    const dataCoin = useApi('/coins/aidos-kuneen').data["market_data"];
    // console.log(dataCoin)

    const [coinrangoData,setCoinrangoData] = useState('');

    //for market cap or volume
    const getSliceStr = (str,aftDot = 3) =>{
        return String(str).slice(0,String(str).indexOf('.')+aftDot)
    }

    const rangIndOf = str => coinrangoData.indexOf(str)
    //coin rango data
    const currentPriceRangoUsd = coinrangoData.slice(rangIndOf(`[usd] => `) + `[usd] => `.length, rangIndOf(`[usd] => `) + `[usd] => `.length + 5);
    const currentPriceRangoUsdPct = coinrangoData.slice(rangIndOf(`[usd_pct_24] => `) + `[usd_pct_24] => `.length, rangIndOf(`[usd_pct_24] => `) + `[usd_pct_24] => `.length + 5);
    const currentRangoMkt = coinrangoData.slice(rangIndOf(`[marketcap] => `) + `[marketcap] => `.length, rangIndOf(`[marketcap] => `) + `[marketcap] => `.length + 15);
    const currentRangoTTVal = coinrangoData.slice(rangIndOf(`[total_value] => `) + `[total_value] => `.length, rangIndOf(`[total_value] => `) + `[total_value] => `.length + 15);
    const currentPriceRangoBtc = coinrangoData.slice(rangIndOf(`[btc] => `) + `[btc] => `.length, rangIndOf(`[btc] => `) + `[btc] => `.length + 10);

    useEffect(() =>{
        axios.get("https://coinrango.com/api/public/crypto.php?symbols=ADK").then(res => setCoinrangoData(res.data))

    },[dataCoin])

    if(dataCoin){
        return (
            <div className={'ApiDataBlock'}>
                <div className="block">
                    <img src="/images/general/circle-logo.png" alt="aidos kuneen"/>
                    <div>
                        <span className={"d-flex align-items-center"}>
                            <h4>
                                {
                                    currentPriceRangoUsd ?
                                        "$" + getSliceStr(currentPriceRangoUsd,5):
                                        "-"
                                }
                            </h4>
                            {
                                currentPriceRangoUsdPct &&
                                <h6 className={currentPriceRangoUsdPct.startsWith("-")?"red":""}>
                                    (
                                    {currentPriceRangoUsdPct.startsWith("-")?'':'+'}
                                    {getSliceStr(currentPriceRangoUsdPct)}%
                                    )
                                </h6>
                            }
                        </span>
                        {
                            currentPriceRangoBtc &&
                            <h6 className={"btc-text"}>{currentPriceRangoBtc} BTC</h6>
                        }
                    </div>
                </div>

                <div className="line" />

                <div className="block cent">
                    <h5>
                        Market cap:
                        <strong>
                            {
                                currentRangoMkt ?
                                    "$" + getSliceStr(currentRangoMkt/1000000) + "M":
                                    "-"
                            }
                        </strong>
                    </h5>
                </div>

                <div className="line last" />

                <div className="block">
                    <h5>
                        Volume:
                        <strong>
                            {
                                currentRangoTTVal ?
                                    "$" + getSliceStr(currentRangoTTVal/1000000) + "M":
                                    "-"
                            }
                        </strong>
                    </h5>
                </div>
            </div>
        );
    }
};

export default ApiDataBlock;
