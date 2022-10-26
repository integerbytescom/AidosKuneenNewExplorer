import React from 'react';
import './HeaderBack.css';

const HeaderBack = ({setShowFormPage,setShowPage}) => {

    const handleBack = () =>{
        setShowFormPage({show:false,page:''})
        setShowPage(3)
    }

    return (
        <button className={`HeaderBack`} onClick={handleBack}>
            <img src="/images/modal-login/arrow-left.svg" alt="arrow-left"/>
            Back
        </button>
    );
};

export default HeaderBack;