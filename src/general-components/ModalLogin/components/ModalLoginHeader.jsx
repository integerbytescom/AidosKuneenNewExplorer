import React,{useState} from 'react';

const ModalLoginHeader = ({chainId,active,account}) => {

    //for copies adress
    const [copy,setCopy] = useState(false)
    const handleCopy =() =>{
        setCopy(true)
        navigator.clipboard.writeText(account)
        setTimeout(() => setCopy(false),3000)
    }

    return (
        <>
            <header>
                {
                    chainId === 40272?
                        <div className="block">
                            <img src="/images/general/globe.svg" alt="globe"/>
                            <span>
                                        <h6>Connect to</h6>
                                        <p className={'small'}>Aidos Network</p>
                                    </span>
                        </div>:''
                }
                {
                    active?
                        <div className="block acc">
                            <p className={'small'}>
                                {account ?
                                    copy?'Copied': account.slice(0,18)+'...'
                                    :
                                    'Account not connected'
                                }
                            </p>
                            <img onClick={handleCopy}
                                 style={{cursor:"grab"}}
                                 src="/images/general/copy.svg"
                                 alt="copy"
                            />
                        </div>:''
                }
            </header>
            </>
    );
};

export default ModalLoginHeader;