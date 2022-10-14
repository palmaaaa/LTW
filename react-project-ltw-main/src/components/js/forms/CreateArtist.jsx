import React, {useEffect, useContext} from 'react';
import '../../css/forms/CreateArtist.css';
import WrongInputError from "../utility/WrongInputError";
import {useState} from "react";
import {views} from "../../../enums/views";
import {sendRequest} from "../../../scripts/serverInteraction";
import {UserDataContext, ViewContext} from "../../../context/context";

const musicianTypes = ['Cantante', 'Cantautore', 'Producer', 'Chitarrista', 'Bassista', 'Batterista', 'Tastierista', 'Flautista', 'Trombettista', 'Altro'];

const CreateArtist = (props) => {
    const {view, setView} = useContext(ViewContext)
    const {userData, setUserData} = useContext(UserDataContext);

    const[error,setError] = useState({ artistErr:false, bioErr:false, mgErr:false, typeErr:false});


    function validateArtist(e) {

        let newError = {}

        let bioArtist = document.getElementById("bioArtist").value;
        let artistName = document.getElementById("artistName").value;
        let isMusician = document.getElementById("musician").checked;
        let isGroup = document.getElementById("group").checked;
        let artistType = document.getElementById("artistSource").value;

        newError["bioErr"] = bioArtist === "";
        newError["artistErr"] = artistName === "";
        newError["mgErr"] = !isGroup && !isMusician;
        newError["typeErr"] = artistType === "Choose...";

        setError(newError);

        let canCreate = false;
        for (const item in newError) {
            canCreate |= newError[item];
        }

        if(!canCreate){
            let registerObject = {
                request: "NEW_ARTIST",
                nome: artistName,
                username: userData.username,
                tipoMusicista: artistType,
                dataFondazione: "2022-05-15",
                biografia: bioArtist,
                isGruppo: isGroup

            }

            sendRequest('POST', 'newrequest', registerObject)
                .then(response => {
                    if (response.status < 300) {
                        setView({view: views.HOME});
                    }
                });


        }
    }



    return (
        <div className="createArtistContainer d-flex align-items-center">
            <div className="container-fluid">
                <div className="row text-center mb-3">
                    <h2> Create Artist </h2>
                </div>


                <div className="row d-flex justify-content-center mb-5">

                    <div className="col-11 col-sm-8 col-md-4 mb-3">

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">

                                    <div className="input-group ">
                                        <input type="text" className="form-control" id="artistName"
                                               placeholder={"Artist Name"}/>
                                    </div>
                                    <WrongInputError vis = { error["artistErr"]}
                                                     errorMessage = {"Artist name can't be empty"}/>


                                    <div className="form-group mt-3 mb-3">
                                        <textarea className="form-control" placeholder="Artist Biography" rows={6}
                                        id={"bioArtist"}  ></textarea>
                                        <WrongInputError vis = { error["bioErr"]}
                                                         errorMessage = {"Bio can't be empty"}/>
                                    </div>

                                    <div className=" create-artist-mg-positioning">
                                        <div className="form-check">
                                            <input className="form-check-input" name="flexRadioDefault" type="radio"
                                                   id="musician"/>
                                            <label className="form-check-label" htmlFor={"musician"}>Musician</label>
                                        </div>
                                        <div className="form-check ms-5">
                                            <input className="form-check-input" name="flexRadioDefault" type="radio" id="group"/>
                                            <label className="form-check-label " htmlFor={"group"}>Group</label>
                                        </div>

                                    </div>

                                    {/*<div className="">*/}
                                        <WrongInputError vis = { error["mgErr"]}
                                                         errorMessage = {"Select one of the options"}/>
                                    {/*</div>*/}

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-8 col-sm-6 col-md-4">
                        <div className="input-group ">
                            <label className="input-group-text">Musician Type</label>
                            <select className="form-select" id="artistSource">
                                {musicianTypes.map((type, index) => {
                                    return <option key={type}>{type}</option>
                                })}
                            </select>

                        </div>
                        <WrongInputError vis = { error["typeErr"]}
                                         errorMessage = {"Select your field"}/>
                    </div>
                </div>


                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <button className={"btn btn-dark btnSend "} onClick={validateArtist}> Create Artist </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CreateArtist