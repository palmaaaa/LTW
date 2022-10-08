import React from 'react';
import '../css/Device.css';

const Device = (props) => {

    return (
        <div className={"container-fluid device"} >
            <div className="row">
                <div className="col-6 d-flex justify-content-end">
                    <p className={"device-name"}> {props.device.name} </p>
                </div>
                <div className="col-6 d-flex justify-content-start">
                    <button className={"btn btn-dark btn933"} onClick={() => props.deleteDevice(props.device)}>Remove</button>
                </div>
            </div>
        </div>
    )};

export default Device
