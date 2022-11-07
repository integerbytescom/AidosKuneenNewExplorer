import React, {useEffect} from 'react';
import './MainData.css';
import './MainDataMedia.css';
import {getStrAfterDot} from "../../../../../functions/getStrAfterDot";

const MainData = ({searchRes,query}) => {

    // console.log(searchRes,'searchRes in MainData');

    //get str resresres...resresres
    const getStrCenterDot = str => {
        return str.slice(0,15) + '...' + str.slice(str.length - 15,str.length)
    }

    useEffect(() => {},[searchRes,query])

    return (
        <div className={'MainData'}>

            <div className="block">
                <header>
                    <div>
                        <img src="/images/search/edit.svg" alt=""/>
                        <h5>
                            {searchRes[0]==='address' && 'Address'}
                            {searchRes[0]==='transaction' && 'From'}
                            {searchRes[0]==='oldAccounts' && 'AZ9 Address'}
                        </h5>
                    </div>
                </header>
                <footer>
                    <p>
                        {searchRes[0] === 'address' && searchRes[1].address}
                        {searchRes[0] === 'transaction' && getStrCenterDot(searchRes[1].from)}
                        {
                            searchRes[0] === 'oldAccounts' &&
                            getStrCenterDot(searchRes[1]['AZ9Address'])
                        }
                    </p>
                </footer>
            </div>

            <div className="block">
                <header>
                    <div>
                        <img src="/images/search/credit-card.svg" alt=""/>
                        <h5>
                            {searchRes[0]==='address' && 'Total Balance'}
                            {searchRes[0]==='transaction' && 'To'}
                            {searchRes[0]==='oldAccounts' && 'AZ9 Hash'}
                        </h5>
                    </div>
                </header>
                <footer className={"right"}>
                    <h5>
                        {searchRes[0] === 'address' && searchRes[1].balance + ' units'}
                        {searchRes[0] === 'transaction' && 'Sended: ' + searchRes[1].value/Math.pow(10,18) + ' ADK'}
                        {searchRes[0] === 'oldAccounts' && (searchRes[1]['az9_hash']).slice(0,30) + '...'}
                    </h5>
                    {
                        searchRes[0] === 'address' &&
                            <h4>{(searchRes[1] && getStrAfterDot(searchRes[1].balance/Math.pow(10,18))) + ' ADK'}</h4>
                    }

                    {
                        searchRes[0] === 'transaction' &&
                        <p style={{color:'white',fontWeight:400,textAlign:"right"}}>
                            {getStrCenterDot(searchRes[1].to)}
                        </p>
                    }
                </footer>
            </div>
        </div>
    );
};

export default MainData;