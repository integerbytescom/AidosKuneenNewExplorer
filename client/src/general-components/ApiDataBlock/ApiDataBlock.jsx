import React from 'react';
import './ApiDataBlock.css';
import './ApiDataBlockMedia.css';
import {useApi} from "../../hooks/useApi";
import {Spinner} from "react-bootstrap";

const ApiDataBlock = () => {

    //api data
    const dataCoin = useApi('/coins/aidos-kuneen').data["market_data"];
    // console.log(dataCoin)


    //for market cap or volume
    const getSliceStr = (str,aftDot = 3) =>{
        return String(str).slice(0,String(str).indexOf('.')+aftDot)
    }

    return (
        <div className={'ApiDataBlock'}>
            {
                dataCoin?
                    <>
                        <div className="block">
                            <img src="/images/general/logo-circle.svg" alt=""/>
                            <h4>
                                ${getSliceStr(dataCoin["current_price"]["usd"],5)}
                            </h4>
                            <h6 className={getSliceStr(dataCoin["price_change_percentage_24h"]).startsWith("-")?"red":""}>
                                (
                                    {getSliceStr(dataCoin["price_change_percentage_24h"]).startsWith("-")?'':'+'}
                                    {getSliceStr(dataCoin["price_change_percentage_24h"])}%
                                )
                            </h6>
                        </div>

                        <div className="line" />

                        <div className="block cent">
                            <h5>
                                Market cap:
                                <strong>
                                    $
                                    {getSliceStr((dataCoin["market_cap"]["usd"])/1000000)}
                                    M USD
                                </strong>
                            </h5>
                        </div>

                        <div className="line last" />

                        <div className="block">
                            <h5>
                                Volume:
                                <strong>
                                    $
                                    {getSliceStr((dataCoin["total_volume"]["usd"])/1000)}
                                    K USD
                                </strong>
                            </h5>
                        </div>
                    </>:
                    <Spinner animation={"border"} variant={"success"} />
            }
        </div>
    );
};

export default ApiDataBlock;