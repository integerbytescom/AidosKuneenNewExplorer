import React, {useEffect,useState} from 'react';
import SearchMain from "../../general-components/SearchMain/SearchMain";
import ApiDataBlock from "../../general-components/ApiDataBlock/ApiDataBlock";
import Transactions from "../../pages-components/Main/Transactions/Transactions";
import './Main.css';
import axios from "axios";

const Main = () => {

    //query for searchMain input
    const [query,setQuery] = useState('');

    //all transactions from database
    const [transAll,setTransAll] = useState([]);
    const [transAllTokens,setTransAllTokens] = useState([]);
    const [oldAccounts,setOldAccounts] = useState([]);
    // console.log(transAll);
    // console.log(transAllTokens);

    //search
    const [searchFocus,setSearchFocus] = useState(false);
    const [showAllTrans,setShowAllTrans] = useState(false);

    // 0x888888881f8af02398dc3fee2a243b66356717f8

    useEffect(() => {
        //get all transactions from mysql
        axios.get('http://localhost:5000/getTransAll').then(result => setTransAll([...result.data]));
        //token transactions from mysql
        axios.get('http://localhost:5000/getTransAllTokens').then(result => setTransAllTokens([...result.data]));
        //old data about accounts from mysql
        axios.get('http://localhost:5000/getAccountsOld').then(result => setOldAccounts([...result.data]));

        //queries from https://blockscout.com
        axios.get(`https://blockscout.com/eth/mainnet/api?module=account&action=txlist&address=0x888888881f8af02398dc3fee2a243b66356717f8`).then(res => console.log(res));
    },[])

    //0x5ca9b465ac500f0536cb4c2e549fc8456a34a91c - 1usdt 5332akadk
    //0xacfc3866cb9b53e589c9c7c2acacc5d6775a0d25 - 5000btl
    //0x73501c407da847717ae2c21f84d287112ea0ba20

    // good hash = 0xdafff78579d611cc4feaccbc8bef8d8c9782439c355c94d568c7717500dd7915
    // bad hash = 0xdafff78579d611cc4feaccbc8bef8d8c97834391355c94d568c7717500dd7915
    // good adress = 0x00a8a137490a3870a4cd9d73a75a563d1f017053
    // good adress = 0x1786d0ca2b790e80e8c78c4eaa496cae806ff668
    // bad adress = 0x1786d0ca2b490e80e8c78c4eaa496cae806ff663
    // good old adress = FEVDFPYCDKYPSYPV9STTPYYMNZLXESYOBNLSAYFNSB9N9TSEGZMMHWBJVWBBZNW9SNHBXMEOHQEJUCLQ9THKEJAYTD
    // bad old adress = FEVDFPYCDKYPSYPV9STTPYYMNZLXESYOBNLSAYFNSB9N9TSEGZMKLWBJVWBBZNW9SNHBXMEOHQEJUCLQ9THKEJAYTX

    return (
        <div className={`Main ${searchFocus?"focus":""}`}>
            <div className="container-small">
                <SearchMain
                    query={query}
                    setQuery={setQuery}
                    searchFocus={searchFocus}
                    setSearchFocus={setSearchFocus}
                    // old accounts res with filter with queris on search
                    oldAccounts={oldAccounts.filter(acc => (acc['AZ9Address']===query || acc['az9_hash']===query))}
                />
                {!(query && searchFocus) && <ApiDataBlock />}
            </div>
            <div className={showAllTrans?'container':'container-small'}>

                {
                    !(query.length !== 42 && query && searchFocus) &&
                    (
                        (query.length === 42  && searchFocus)?
                            // with sort for search
                            <Transactions
                                transAll={transAll.filter(trans => (trans['txto']===query || trans['txfrom']===query))}
                                transAllTokens={transAllTokens.filter(trans => (trans['txto']===query || trans['txfrom']===query))}
                                oldAccounts={oldAccounts.filter(acc => (acc['AZ9Address']===query || acc['az9_hash']===query))}
                                showAllTrans={showAllTrans}
                                setShowAllTrans={setShowAllTrans}
                            />:
                            // without sort for search (show all results)
                            <Transactions
                                transAll={transAll}
                                transAllTokens={transAllTokens}
                                showAllTrans={showAllTrans}
                                setShowAllTrans={setShowAllTrans}
                                oldAccounts={oldAccounts.sort((a, b) => b['balance'] - a['balance'])}
                            />
                    )
                }
            </div>
        </div>
    );
};

export default Main;
