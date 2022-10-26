import React from 'react';
import MainData from "./MainData/MainData";
import TokenData from "./TokenData/TokenData";
import {Alert, Spinner} from "react-bootstrap";


const SearchResult = ({searchRes}) => {
    return (
        <div
            className={`SearchResult`}
            style={{
                marginBottom:"2em",
            }}
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
                        <MainData searchRes={searchRes} />
                        <TokenData searchRes={searchRes} />
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
                                Txid must contain 66 characters and the address 42 characters.
                                <Spinner animation={'border'} variant={"success"} size={"sm"} />
                            </Alert>
            }
        </div>
    );
};

export default SearchResult;