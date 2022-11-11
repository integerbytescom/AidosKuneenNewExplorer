import React from 'react';
import './FirstPage.css';

const FirstPage = ({setShowPage,connect,disconnect,active,addADKNetworkAUTO,chainId}) => {

    const handleShowInfoAdk = () =>{
        alert(
            '1. Open Metamask \n' +
            '2. Networks: Add custom RPC \n'+
            '3. Network Name: ADK Mainnet \n'+
            '4. RPC URL: https://api1.mainnet.aidoskuneen.com:9443 \n'+
            '5. Alternative RPC URL: http://162.55.164.222.9545 \n'+
            '6. Chain ID: 40272 \n'+
            '7. Currency Symbol: ADK'
        )
    }

    const handleShowInfoBinance = () =>{
        alert(
            '1. Open Metamask \n' +
            '2. Network Name: Smart Chain \n'+
            '4. RPC URL: https://bsc-dataseed.binance.org/ \n'+
            '5. Chain ID: 56 \n'+
            '6. Currency Symbol: BNB \n'+
            '7. Explorer Block URL: https://bscscan.com'
        )
    }

    return (
        <div className={`FirstPage`}>

            <div className="circle-text">
                <div className="circle">1</div>
                <p>Connect Metamask</p>
            </div>
            <button onClick={connect} className={'right-mod-but'}>
                {active && <img src="/images/general/success.svg" alt="success"/>}
                Connect
            </button>
            {   //disconnect button
                active &&
                    <button className={'right-mod-but'} onClick={disconnect}>
                        Disconnect
                    </button>
            }

            <div className="circle-text mt-5">
                <div className="circle">2</div>
                <p>Add Network</p>

                <img
                    width={23}
                    onClick={handleShowInfoAdk}
                    className={'info'}
                    src="/images/modal-login/info.svg"
                    alt="info"
                />
            </div>

            <button onClick={addADKNetworkAUTO} className={'right-mod-but aid'}>
                {chainId === 40272 && <img src="/images/general/success.svg" alt="success"/>}
                <img src="/images/modal-login/logo-white-png.png" alt="aidos"/>
                Aidos Kuneen
            </button>

            <button onClick={handleShowInfoBinance} className={'right-mod-but bin'}>
                <img src="/images/modal-login/bin-logo.svg" alt="binance"/>
                Binance Smart Chain
            </button>

            {/*<button*/}
            {/*    onClick={() => setShowPage(2)}*/}
            {/*    className={'right-mod-but sm next'}*/}
            {/*>*/}
            {/*    Next*/}
            {/*</button>*/}
        </div>
    );
};

export default FirstPage;