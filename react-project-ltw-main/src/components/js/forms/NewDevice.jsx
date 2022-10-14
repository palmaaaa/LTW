import React, {useContext, useEffect, useState} from 'react';
import '../../css/forms/NewDevice.css'
import {DeviceList} from "../../index";
import WrongInputError from "../utility/WrongInputError";
import {DeviceUUID} from "device-uuid/lib/device-uuid";
import {sendRequest} from "../../../scripts/serverInteraction";
import {pages} from "../../../enums/pages";
import {PageContext, UserDataContext} from "../../../context/context";


function NewDevice(props) {
    const {page, setPage} = useContext(PageContext)
    const {userData, setUserdata} = useContext(UserDataContext);

    const [nameEmptyError, setNameEmptyError] = useState(false);
    // const [devices, setDevices] = useState(props.devices)
    const [devices, setDevices] = useState(props.devices)

    function addDevice() {
        let deviceName = document.getElementById("new-device-input").value;
        if (!deviceName) {
            setNameEmptyError(true);
            return;
        }
        let idDevice = new DeviceUUID().get();
        let requestObject = {
            request: "NEW_DEVICE",
            username: userData.username,
            name: deviceName,
            idDevice: idDevice,
            tipo: "Telefono"
        };

        sendRequest('POST', 'newrequest', requestObject)
            .then(response => {
                if (response.status < 300) {
                    // setDevices([...devices, requestObject]) not necessary since we are changing anyways the page
                    setPage({page: pages.MUSIC_CONTENT});
                }
            });
    }



    return (
        <div className="container h-100 d-flex flex-column justify-content-center p-4">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <div className="h1 bold-and-highlight">Welcome back!</div>
                </div>
            </div>
            <div className="row g-0 p-0 mt-2">
                <div className="col-12 d-flex justify-content-center new-device-text-container">
                    <div className="p">Looks like you are logging in from a new device.</div>
                </div>
                <div className="col-12 d-flex justify-content-center mt-2 new-device-text-container">
                    <div className="p">Give your new device a name so we can remember it!</div>
                </div>
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-center">
                        <input type="text" id="new-device-input" className="no-decoration px-1" maxLength="20"/>
                        <button className="btn no-decoration add-device-button new-device-input" onClick={addDevice}>Add device</button>
                    </div>
                    <div className={(nameEmptyError ? "d-flex " : "d-none ") + "justify-content-center mt-2"}>
                        <WrongInputError vis={nameEmptyError} errorMessage={"The name can't be emtpy!"}/>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3"/>
                <div className="col-6">
                    <hr/>
                </div>
                <div className="col-3"/>
            </div>
            <div className="row">
                <div className="device-list-container mt-4">
                    <DeviceList devices={devices}/>
                </div>
            </div>

        </div>
    );
}

export default NewDevice;