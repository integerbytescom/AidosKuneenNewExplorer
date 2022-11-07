import React from 'react';
import MainData from "./MainData/MainData";
import TokenData from "./TokenData/TokenData";
import {Alert, Spinner} from "react-bootstrap";


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
                searchRes[1]?
                    <>
                        <MainData query={query} searchRes={searchRes} />
                        <TokenData query={query} searchRes={searchRes} tokensData={tokensData} />
                    </>:
                        !window.ethereum ?
                            <Alert variant={"danger"} className={"small p-2"}>
                                You need install Metamask extension!
                            </Alert>:
                            <Alert
                                className={'small p-2 opacity-75s d-flex justify-content-between align-items-center'}
                                variant={"success"}
                            >
                                Enter the correct query and the data will be displayed here.
                                Txid must contain 66 chars, the address 42 chars, AZ9 address 90 chars.
                                <Spinner animation={'border'} variant={"success"} size={"sm"} />
                            </Alert>
            }
        </div>
    );
};

export default SearchResult;