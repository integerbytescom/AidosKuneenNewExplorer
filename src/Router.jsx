import React from 'react';
import {Route,Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import NavbarTop from "./general-components/NavbarTop/NavbarTop";
import Web3 from "web3";
import { Web3ReactProvider } from '@web3-react/core';

const Router = () => {

    //ethereum
    function getLibrary(provider) {
        return new Web3('https://api1.mainnet.aidoskuneen.com:9443')
    }

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <NavbarTop />
            <Routes>
                <Route path={`/`} element={<Main />} />
            </Routes>
        </Web3ReactProvider>
    );
};

export default Router;
