import React, {useContext, useEffect, useState} from 'react';
import Device from "../Device";
import {sendRequest} from "../../../scripts/serverInteraction";
import {DeviceUUID} from "device-uuid/lib/device-uuid";
import {pages} from "../../../enums/pages";
import {PageContext, UserDataContext} from "../../../context/context";

const DeviceList = (props) => {
    const {page, setPage} = useContext(PageContext)
    const {userData, setUserData} = useContext(UserDataContext);

    const [devices, setDevices] = useState(props.devices);

    useEffect(() => {
        if (!props.devices) {
            let requestObject = {
                request: "GET_DEVICES",
                username: userData.username
            }

            sendRequest('POST', 'getrequest', requestObject)
                .then(response => response.json())
                .then(json => {
                    setDevices(json.devices)
                }); // THIS WORKS!
        }
    }, [])

    function deleteDevice(device) {

        let requestObject = {
            request: "DELETE_DEVICE",
            idDevice: device.idDevice
        };

        sendRequest('POST', 'deleterequest', requestObject)
            .then(response => {
                if (response.status < 300) {
                    let newDevices = devices.filter(element => element.idDevice !== device.idDevice)
                    setDevices(newDevices);
                }
                if (device.idDevice === new DeviceUUID().get()) {
                    setPage({page: pages.LOGIN})
                }
            });

    }



    return (
        <div className="container-fluid text-center" id={"devices"}>
            <div className="row devices-header d-flex">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <h1 className="mb-3 bold-and-highlight">Your devices</h1>
                </div>
            </div>
            {devices === undefined && <div className="spinner-border text-primary" role="status"/>}
            {devices != null && devices.length === 0 && <div className="p">You currently have no devices registered.</div>}
            {devices != null && devices.length > 0 && devices.map(device => <Device device={device} deleteDevice={deleteDevice} key={device.idDevice}/>)}
        </div>
    )
}
export default DeviceList