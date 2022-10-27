import React, {useEffect, useState} from 'react';
import './SearchMain.css';
import './SearchMainMedia.css';
import SearchResult from "./components/SearchResult/SearchResult";
import {useWeb3React} from "@web3-react/core";
import {web3} from "../../constants/web3";


const SearchMain = ({query,setQuery,searchFocus,setSearchFocus,oldAccounts}) => {


    const {
        //eslint-disable-next-line
        active,
        //eslint-disable-next-line
        account,
    } = useWeb3React();

    // web3.eth.getBlockNumber()
    //     .then(res => web3.eth.getBlock(res).then(res => console.log(res,'getBlock dataBlock')))

    // if (account){
    //     web3.eth.getBlockNumber().then(block =>
    //         web3.eth.getTransactionCount(account, block).then(res => console.log(res))
    //     ).then()
    // }

    // if (active && account){
    //     web3.eth.getBalance(account).then(res => console.log(Number(res),'getBalance'));
    //     web3.eth.getTransactionCount(account).then(res => console.log(res,'getTransactionCount'))
    // }

    const [searchRes,setSearchRes] = useState([]);

    const handleSearch = value => {
        if(value.length === 42){
            web3.eth.getBalance(value).then(res => setSearchRes(['address',{address:value,balance:res}]))
        }else if(value.length === 66){
            web3.eth.getTransaction(value).then(res => setSearchRes(['transaction', res]))
        }else if(value.length === 90){
            setSearchRes(['oldAccounts', oldAccounts])
        }
        else return false
    }

    useEffect(() => {
        handleSearch(query)
        //eslint-disable-next-line
    },[query])

    return (
        <>
            <div className={`SearchMain`}>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder={`0x style txid, address or AZ9 Address`}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onFocus={() => setSearchFocus(true)}
                    />
                    {
                        searchFocus &&
                            <img
                                className={`close img-inp`}
                                src="/images/general/x.svg"
                                alt="close"
                                onClick={() => setSearchFocus(false)}
                            />
                    }
                    <img
                        onClick={() => setSearchFocus(true)}
                        className={`search img-inp`}
                        src="/images/general/search.svg"
                        alt="search"
                    />
                </div>
            </div>

            {searchFocus && <SearchResult searchRes={searchRes} />}
        </>
    );
};

export default SearchMain;