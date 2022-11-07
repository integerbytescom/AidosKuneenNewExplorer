import React from 'react';
import {FormControl} from "react-bootstrap";

const ConvertAdk = () => {
    return (
        <div className={'FormPage ConvertAdk'}>
            <h6 className={'mb-5'}>
                Convert ADK/akADK
            </h6>

            <p className={'mb-2'}>Convert ADK to akADK Token</p>
            <p className="small-small opacity-75 mb-2">
                Amount of native ADK to convert<br/>
                to akADK Token
            </p>
            <FormControl placeholder={'0.0 ADK (to akADK)'} />

            <hr className={'mt-4 mb-3'}/>

            <p className={'mb-2'}>Convert akADK Token to ADK</p>
            <p className="small-small opacity-75 mb-2">
                Amount of akADK Token to convert<br />
                to native ADK
            </p>
            <FormControl placeholder={'0.0 akADK (to ADK)'} />
        </div>
    );
};

export default ConvertAdk;