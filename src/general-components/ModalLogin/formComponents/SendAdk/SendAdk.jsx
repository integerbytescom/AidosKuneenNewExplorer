import React from 'react';
import {Form, FormControl} from "react-bootstrap";

const SendAdk = () => {
    return (
        <div className={'FormPage SendAdk'}>
            <h6 className={'mb-1'}>
                Send from Aidos Kuneen
            </h6>

            <p className={'small mb-3 opacity-75'}>
                Transfer Token
            </p>

            <Form.Select className={'mb-3'}>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>

            <p className={'small mb-1 opacity-75'}>
                Selected Token
            </p>
            <p className="small-small">
                Bitlocus(akBTL) 0x62AC3C41AD0E2eCC4681fD215 96415501BEc3cC4
            </p>

            <button className={'right-mod-but bigWid blue'}>
                Change Network
            </button>

            <hr/>

            <FormControl
                placeholder={'0.0 akBTL'}
            />

            <button className={'right-mod-but bigWid blue'}>
                Transfer akBTL to Binance Chain
            </button>
        </div>
    );
};

export default SendAdk;