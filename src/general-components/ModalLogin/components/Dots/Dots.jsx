import React from 'react';
import './Dots.css';

const Dots = ({showPage,setShowPage}) => {
    return (
        <div className={'Dots'}>
            <div onClick={() => setShowPage(1)} className={`dot ${showPage===1?'active':''}`} />
            <div onClick={() => setShowPage(2)} className={`dot ${showPage===2?'active':''}`} />
            <div onClick={() => setShowPage(3)} className={`dot ${showPage===3?'active':''}`} />
        </div>
    );
};

export default Dots;