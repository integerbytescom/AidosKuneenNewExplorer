import React, {useState} from 'react';
import {Button, FormControl} from "react-bootstrap";
import {web3} from "../../../../constants/web3";

const TransStatus = () => {

    const [data,setData] = useState({})
    const [inputValue,setInputValue] = useState('')

    // good hash for check = 0xdafff78579d611cc4feaccbc8bef8d8c9782439c355c94d568c7717500dd7915
    //hash with failed = 0x5c1d4bf9809ba9ed77415bb7a7a64e336427aaffbc0ac3cd90256b25e8950a91

    const handleGetStatus = value => {
        setData(value)
        web3.eth.getTransactionReceipt(inputValue).then(res => setData(res));
    }

    // console.log(data)

    return (
        <div className={`FormPage TransStatus`}>
            <h6 className={'mb-5'}>
                Query Transfer
                Transaction Status
            </h6>

            <p className="small-small opacity-75 mb-2">
                Enter transaction Hash of Transfer Transaction
                (on BSC or AIDOS Network)
            </p>

            <FormControl
                as={'textarea'}
                rows={2}
                style={{fontSize:12,resize:'none',borderRadius:'.25em'}}
                className={'mb-3'}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />

            <Button disabled={inputValue.length !== 66} onClick={handleGetStatus} className={'right-mod-but bigWid blue mb-4'}>
                Query Transfer Transaction Status
            </Button>

            <p className="small-small opacity-75 mb-1">Transaction</p>
            <h6>
                Status:
                <span style={{color:'#D63026'}}>{data===null && ' Invalid hash'}</span>
                {
                    data?
                        data.status?
                        <span style={{color:'#04CA73'}}> Confirmed</span>:
                        <span style={{color:'#D63026'}}> Failed</span>:
                        false
                }
            </h6>
        </div>
    );
};

export default TransStatus;