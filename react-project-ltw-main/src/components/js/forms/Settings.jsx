import React, {useState} from 'react';
import '../../css/Settings.css';
import {DeviceList} from "../../index";
import WrongInputError from "../utility/WrongInputError";

const Settings = (props) => {

    const [bio,setBio] = useState({"bioText":"", "lenBio":0, "bioErr":false,"bioErrMsg":""});

    const saveChanges = (e) =>{
        const bioField = document.getElementById("bioChange");

        let newData = {};
        newData["bioText"] = bioField.value;
        newData["lenBio"] = bioField.value.length
        newData["bioErr"] = bioField.value.length >300 || bioField.value.length <= 0;

        if(bioField.value.length >300){
            newData["bioErrMsg"]  = "Biography has exceeded 300 characters ["+bio["lenBio"]+"]";
        }else{
            newData["bioErrMsg"] = "Biography can't be empty";
        }

        setBio(newData);

        if(!bio["bioErr"]){
            console.log("Aggiorna la bio")
        }else{

        }
    };


    return (
        <div className="container-fluid w-100" style={{margin:0,padding:0}}>
            <div className="row" style={{marginTop: "3rem"}}>
                <div className="col text-center spacedOutRow" style={{position:"relative"}}></div></div>

            <div className="row spacedOutRow">
                <div className="col">
                    <DeviceList/>
                </div>
            </div>

            <div className="row spacedOutRow">
                <div className="col-1 col-md-3"></div>
                <div className="col-10 col-md-6 text-center">
                    <h3 className={"mb-3 bioTitle"}> Change Bio </h3>
                    <textarea className="form-control" id="bioChange" rows="3" placeholder="Max 300 characters"></textarea>
                    <WrongInputError vis={bio["bioErr"]} errorMessage = {bio["bioErrMsg"]}/>
                </div>
            </div>

            <div className="row spacedOutRow">
                <div className="text-center">
                    <button className="btn btn-dark saveBtn" type="button" onClick={saveChanges}>Save Changes</button>
                </div>
            </div>

        </div>
    )
}
export default Settings