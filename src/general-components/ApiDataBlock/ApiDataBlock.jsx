import React, {useEffect, useState} from 'react';
import './ApiDataBlock.css';
import './ApiDataBlockMedia.css';
import axios from "axios";

const ApiDataBlock = () => {

    const [data,setData] = useState({});
    console.log(data,'coinrangoData')

    //for market cap or volume
    const getSliceStr = (str,aftDot = 3) =>{
        return String(str).slice(0,String(str).indexOf('.')+aftDot)
    }

    useEffect(() =>{
        axios.get("https://coinrango.com/api/public/crypto.php?symbols=ADK").then(res => setData(res.data[0]['market']))
    },[])

    if(Object.values(data).length){
        return (
            <div className={'ApiDataBlock'}>
                <div className="block">
                    <img src="/images/general/circle-logo.png" alt="aidos kuneen"/>
                    <div>
                        <span className={"d-flex align-items-center"}>
                            <h4>
                                {
                                    data['usd'] ?
                                        "$" + getSliceStr(data['usd'],3):
                                        "-"
                                }
                            </h4>
                            {
                                data['usd_pct_24'] &&
                                <h6 className={data['usd_pct_24'].startsWith("-")?"red":""}>
                                    (
                                    {data['usd_pct_24'].startsWith("-")?'':'+'}
                                    {getSliceStr(data['usd_pct_24'])}% 24h
                                    )
                                </h6>
                            }
                        </span>
                        {
                            data['btc'] &&
                            <h6 className={"btc-text"}>{data['btc']} BTC</h6>
                        }
                    </div>
                </div>

                <div className="line" />

                <div className="block cent">
                    <h5>
                        Market cap:
                        <strong>
                            {
                                data['marketcap'] ?
                                    "$" + getSliceStr(data['marketcap']/1000000) + "M":
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
                                data['total_value'] ?
                                    "$" + getSliceStr(data['total_value']/1000000) + "M":
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
