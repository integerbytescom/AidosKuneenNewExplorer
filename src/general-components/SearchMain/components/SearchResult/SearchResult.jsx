import React from 'react';
import MainData from "./MainData/MainData";
import TokenData from "./TokenData/TokenData";
import {Alert} from "react-bootstrap";


const SearchResult = ({searchRes,query,tokensData}) => {

    // console.log(searchRes);

    return (
        <div
            className={`SearchResult`}
            style={{marginBottom:"2em",}}
        >
            {
                searchRes[1] &&
                <h5 className={"text-white fw-light"}>
                    Information about <strong className={"fw-semibold"}>{searchRes[0]}</strong>:
                </h5>
            }

            {
                (searchRes[1])?
                    <>
                        <MainData query={query} searchRes={searchRes} />
                        <TokenData query={query} searchRes={searchRes} tokensData={tokensData} />
                    </>:
                    <Alert
                        className={"small p-2 opacity-75s text-center"}
                        variant={"primary"}
                    >
                        {
                            query.length?
                                'No results found for this query.':
                                'Enter a request. The request must contain 42, 66 or 90 characters.'
                        }
                    </Alert>
            }
        </div>
    );
};

export default SearchResult;
