import React, {useContext} from 'react';
import '../../css/forms/Login.css'
import logo from '../../../assets/img/logo.png';
import {pages} from "../../../enums/pages";
import {DeviceUUID} from "../../../../node_modules/device-uuid/lib/device-uuid"
import {sendRequest} from "../../../scripts/serverInteraction";
import {getUrlFromByteArray} from "../../../scripts/fileProcessing";
import {views} from "../../../enums/views";
import {PageContext, UserDataContext} from "../../../context/context";

const Login = (props) => {
    const {page, setPage} = useContext(PageContext)
    const {userData, setUserData} = useContext(UserDataContext);

    async function handleClickLogIn(e) {
        e.preventDefault();
        let loginForm = document.forms.login;
        let uuid = new DeviceUUID().get();
        let username = loginForm.elements.username.value;

        let loginObject = {
            username,
            password: loginForm.elements.password.value,
            deviceId: uuid
        };


        let loginResponse = await sendRequest('POST', 'loginrequest', loginObject);
        let loginJson = await loginResponse.json();

        if (loginResponse.status < 300) {
            setUserData((oldUserData) => ({...oldUserData, username}));
            let requestObject = {
                request: "GET_PROFILE_PIC",
                username
            }

            let profilePicResponse = await sendRequest("POST", "getrequest", requestObject);
            let profilePicJson = await profilePicResponse.json();

            if (profilePicJson.Foto) {
                let uintArray = new Uint8Array(profilePicJson.Foto);
                const blob = new Blob([uintArray], {type: "application/octet-stream"})
                setUserData((oldUserData) => ({...oldUserData, profilePicUrl: window.URL.createObjectURL(blob)}));
            }

            if (loginJson.devices) {
                setPage({page: pages.NEW_DEVICE, devices: loginJson.devices})
                // TODO Handle ModifyDevices!!
            }
            else {
                setPage({page: pages.MUSIC_CONTENT})
                props.setView({view: views.HOME});
            }
        }
        else {
            if (loginJson.error === "username") {
                alert("Username does not exist. Please enter a valid username.");
            }
            else if (loginJson.error === "password") {
                alert("Password does not match with username!");
            }
        }
    }

    return (
        <div className="container-fluid w-100 h-100 d-flex flex-column justify-content-center">

            <div className="row">
                <div className="col login-center-elements">
                    <div className="waveshareText" >
                        <h1> <img src={logo} width={33} height={33}/> Waveshare</h1>
                        <p> Your place to share music! </p>
                    </div>
                </div>
            </div>

           <div className="row">
               <div className="col">
                   <div className="container-fluid d-flex justify-content-center" style={{marginTop:'3rem'}}>

                       <div className="col-lg-4 col-md-8">
                           <form name="login" onSubmit={handleClickLogIn}>
                               <div className="mb-3">
                                   <input  type="username" className="form-control " name="username" aria-describedby="usernameHelp"
                                           placeholder="Username" required/>
                               </div>

                               <div className="mb-3">
                                   <input type="password" className="form-control" name="password" placeholder="Password" required/>
                               </div>

                               {/*<div className="mb-3 form-check" >*/}
                               {/*    <input type="checkbox" className="form-check-input" id="checkbox" />*/}
                               {/*    <label className="form-check-label" htmlFor="checkbox" >Remember me</label>*/}
                               {/*</div>*/}

                               <button type="submit" className="btn btn-dark w-100 register-btn" name="submit">Log in</button>
                           </form>

                           <p style={{marginTop:'1rem'}}> Don't have an account yet?
                               <button className="waveshare-signup-text" style={{marginLeft:'0.5rem'}}
                                       onClick={() => setPage({page: pages.REGISTER})}>Sign up</button> </p>
                       </div>
                   </div>
               </div>
           </div>

        </div>
    )
}
export default Login