import React from 'react';
import './NavbarTop.css';
import './NavbarTopMedia.css';
import {Navbar} from "react-bootstrap";
import {useState} from "react";
import ModalLogin from "../ModalLogin/ModalLogin";
import {useWeb3React} from "@web3-react/core";

const NavbarTop = () => {

    const {
        active,
        chainId,
    } = useWeb3React();

    const [showModalLogin,setShowModalLogin] = useState(false);

    return (
        <>
            <Navbar className={'NavbarTop'}>
                <div className="logo">
                    <img src="/images/general/logo.svg" alt="Aidos"/>
                    <span>
                        <h5>Aidos Kuneen</h5>
                        <div>Explorer</div>
                    </span>
                </div>

                {
                    active && chainId===40272 ?
                        <button onClick={() => setShowModalLogin(!showModalLogin)} className={`connect success`}>
                            {
                                !showModalLogin?
                                    <>
                                        <img src="/images/general/success.svg" alt=""/>
                                        Connected
                                    </>:'Close'
                            }
                        </button>:
                        <button onClick={() => setShowModalLogin(!showModalLogin)} className={`connect`}>
                            {
                                !showModalLogin?
                                    <>
                                        <img src="/images/general/user.svg" alt=""/>
                                        <span>Connect</span> Account
                                    </>:'Close'
                            }
                        </button>
                }
            </Navbar>

            <ModalLogin show={showModalLogin} onHide={() => setShowModalLogin(false)} />
        </>
    );
};

export default NavbarTop;