import React from 'react';
import {Route,Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import NavbarTop from "./general-components/NavbarTop/NavbarTop";
import Web3 from "web3";
import { Web3ReactProvider } from '@web3-react/core'
import {web3} from "./constants/web3";

const Router = () => {

    //ethereum
    function getLibrary(provider) {
        return new Web3(provider)
    }

    return (
        <Web3ReactProvider getLibrary={web3}>
            <NavbarTop />
            <Routes>
                <Route path={`/`} element={<Main />} />
            </Routes>
        </Web3ReactProvider>
    );
};

export default Router;
