import React from 'react';
import './MainData.css';
import './MainDataMedia.css';
import {getStrAfterDot} from "../../../../../functions/getStrAfterDot";

const MainData = ({searchRes}) => {
    return (
        <div className={'MainData'}>

            <div className="block">
                <header>
                    <div>
                        <img src="/images/search/edit.svg" alt=""/>
                        <h5>
                            {searchRes[0]==='address'?'Address':'From'}
                        </h5>
                    </div>
                    {/*<span>*/}
                    {/*    <p>Old AZ9 Address</p>*/}
                    {/*    <img src="/images/search/eye.svg" alt=""/>*/}
                    {/*</span>*/}
                </header>
                <footer>
                    <p>
                        {(searchRes[0]==='address'?searchRes[1].address:searchRes[1].from).slice(0,30) + '...'}
                    </p>
                </footer>
            </div>

            <div className="block">
                <header>
                    <div>
                        <img src="/images/search/credit-card.svg" alt=""/>
                        <h5>{searchRes[0]==='address'?'Total Balance':'To'}</h5>
                    </div>
                </header>
                <footer className={"right"}>
                    <h5>
                        {
                            searchRes[0] === 'address' ?
                                searchRes[1].balance + ' units' :
                                'Sended: ' + searchRes[1].value/Math.pow(10,18) + ' ADK'
                        }
                    </h5>
                    {
                        searchRes[0] === 'address' ?
                            <h4>{(searchRes[1] && getStrAfterDot(searchRes[1].balance/Math.pow(10,18))) + ' ADK'}</h4> :
                            <p style={{color:'white',fontWeight:400,textAlign:"right"}}>
                                {(searchRes[1].to).slice(0,30) + '...'}
                            </p>
                    }
                </footer>
            </div>
        </div>
    );
};

export default MainData;