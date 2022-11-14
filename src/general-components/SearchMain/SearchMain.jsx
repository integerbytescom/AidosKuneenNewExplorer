import React, {useEffect, useState} from 'react';
import './SearchMain.css';
import './SearchMainMedia.css';
import SearchResult from "./components/SearchResult/SearchResult";
import axios from "axios";


const SearchMain = ({query,setQuery,searchFocus,setSearchFocus,oldAccounts,mysqlSearch,setMysqlSearch}) => {

    // console.log(mysqlSearch);

    const [queryTable,setQueryTable] = useState('');


    const handleSearchMySql = value => {
        if(value.length === 42){
            setQueryTable('address')
            return true
        }else if(value.length === 66){
            setQueryTable('hash')
            return true
        }else if(value.length === 90){
            setMysqlSearch(['oldAccounts', oldAccounts[0]])
        }
        else return false
    }

    //clear search and search res close search
    const handleClearSearch = () => {
        setSearchFocus(false)
        setMysqlSearch([])
        setQuery('')
    }

    useEffect(() => {
        //mysql search get data
        if (handleSearchMySql(query) && queryTable && query){
            axios.get(`https://explorer.aidoskuneen.com//back.php?module=${queryTable}&${queryTable}=${query}`)
                .then(result => setMysqlSearch([queryTable,...result.data]));
        }

        //eslint-disable-next-line
    },[query,queryTable])


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
                                onClick={() => handleClearSearch(false)}
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

            {searchFocus && <SearchResult query={query} searchRes={mysqlSearch} />}
        </>
    );
};

export default SearchMain;
