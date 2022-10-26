import React, {useState} from 'react';
import SearchMain from "../../general-components/SearchMain/SearchMain";
import ApiDataBlock from "../../general-components/ApiDataBlock/ApiDataBlock";
import Transactions from "../../pages-components/Main/Transactions/Transactions";
import './Main.css';

const Main = () => {

    const [searchFocus,setSearchFocus] = useState(false);
    const [showAllTrans,setShowAllTrans] = useState(false);


    return (
        <div className={`Main ${searchFocus?"focus":""}`}>
            <div className="container-small">
                <SearchMain searchFocus={searchFocus} setSearchFocus={setSearchFocus} />
                <ApiDataBlock />
            </div>
            <div className={showAllTrans?'container':'container-small'}>
                <Transactions showAllTrans={showAllTrans} setShowAllTrans={setShowAllTrans} />
            </div>
        </div>
    );
};

export default Main;