import React, {useContext, useState} from 'react';
import '../css/ProfileAndSettings.css';
import {views} from "../../enums/views";
import {pages} from "../../enums/pages";
import DropDown from "./utility/DropDown";
import {PageContext, UserDataContext, ViewContext} from "../../context/context";


function ProfileAndSettings(props) {
    const {view, setView} = useContext(ViewContext);
    const {userData, setUserdata} = useContext(UserDataContext);

    const [show,setShow] = useState(false);
    const {page,setPage} = useContext(PageContext);


    const showOptions = (e) =>{
        setShow(!show);
    }

    const disableDrop = (e) =>{
        if (show){
            setShow(!show);
        }

    }

    const goToLogout = (e) =>{
        setPage({page: pages.LOGIN});
    }

    const goToProfile = (e)=>{
        setView({view: views.PROFILE_VIEW});
    }

    const goToSettings = (e)=>{
        setView({view: views.SETTINGS_VIEW});
    }


    const data = {"Profile": goToProfile, "Log out": goToLogout};

    return (
        <div className="profile-settings-container mt-3 me-2" id="pas" onMouseLeave={disableDrop}>
            <button className="btn no-decoration">
                <i className="fa-solid fa-gear settings-button-icon" onClick={goToSettings}></i>
            </button>
            <button className="btn profile-button no-decoration" onClick={showOptions}>
                <img  src={userData.profilePicUrl} className="profile-picture-icon" alt="" />
            </button>
            <div className="container-fluid " id="list-options-for-profile" >

                {show && ( <DropDown offsetX={-30} offsetY={0} id={"dropDownProfile"} data={data}/>)}

            </div>
        </div>
    );
}

export default ProfileAndSettings;