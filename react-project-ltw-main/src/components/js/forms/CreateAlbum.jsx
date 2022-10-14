import React, {useEffect, useState, useContext} from 'react';
import '../../css/forms/CreateAlbum.css';
import WrongInputError from "../utility/WrongInputError";
import {sendRequest} from "../../../scripts/serverInteraction";
import {views} from "../../../enums/views";
import {UserDataContext, ViewContext} from "../../../context/context";

const CreateAlbum = (props) => {
    const {view, setView} = useContext(ViewContext)
    const {userData, setUserData} = useContext(UserDataContext);

    const [createAlbumErrors,setCreateAlbumErrors] = useState({
        "albumErr":false,
        "fileErr":false,
        "descErr":false,
        "artistErr":false
    });

    const [artists, setArtists] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copertinaBinaryData, setCopertinaBinaryData] = useState(undefined)
    const [isFileLoaded, setIsFileLoaded] = useState(false);

    useEffect(() => {
        async function requestArtists() {
            let requestObject = {
                request: "GET_ARTISTS_BY_USERNAME",
                username: userData.username
            }


            let response = await sendRequest('POST', 'getrequest', requestObject);

            if (response.status < 300) {
                let json = await response.json();
                setArtists(json.artists);
            }
        }

        requestArtists().then();
    }, []);

    function validateAlbum() {
        setIsSubmitting(true);
        let errors = {}
        const optionElement = document.getElementById("artistSource");

        let selectedOpt = optionElement.options[optionElement.selectedIndex].text;
        let fileName = document.getElementById("fileAlbum").value;
        let albumName = document.getElementById("albumName").value;
        let desc = document.getElementById("albumDescription").value;


        errors["albumErr"] = albumName === "" ;
        errors["descErr"] = desc === "" ;
        // errors["fileErr"] = fileName.slice(-3) !== "png" ;
        errors["artistErr"] = selectedOpt === "Choose..." ;

        setCreateAlbumErrors(errors);

        let cantCreate = false;
        for (const item in createAlbumErrors) {
            cantCreate |= errors[item];
        }

        if (!cantCreate) {
            let registerObject = {
                request: "NEW_ALBUM",
                nome: albumName,
                dataPubblicazione: new Date().toISOString().slice(0, 10),
                copertina: copertinaBinaryData,
                descrizione: desc,
                username: userData.username
            }

            sendRequest('POST', 'newrequest', registerObject)
                .then(response => {
                    setIsSubmitting(false)
                    if (response.status < 300) {
                        setView({view: views.HOME});
                    }
                });
        }
    }

    function handleFilesSelected(event) {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.addEventListener('load', readFile);
        reader.readAsArrayBuffer(file)
    }

    function readFile(event) {
        const typedArray = new Uint8Array(event.target.result);
        setCopertinaBinaryData([...typedArray]);
        setIsFileLoaded(true);
    }

    return (
        <div className={"createAlbumContainer"}>
            <div className="container-fluid h-100 d-flex flex-column justify-content-center">
                <div className="row text-center mb-3">
                    <h2> Create your Album! </h2>
                </div>

                <div className="row d-flex justify-content-center">
                    <div className="col-9 col-md-4 mb-3">
                        <div className="input-group">
                            <input type="text" className="form-control" id={"albumName"} placeholder="Album name"/>
                        </div>
                        <WrongInputError vis={createAlbumErrors["albumErr"]} errorMessage = {"Album name can't be empty"}/>
                    </div>

                    <div className="col-8 col-md-4 mb-2">
                        <div className="input-group ">
                            <input type="file" onInput={handleFilesSelected} className="form-control" id="fileAlbum"
                                   accept="image/png, image/jpeg"/>
                        </div>

                        <div className="mb-2">
                            <WrongInputError vis={createAlbumErrors["fileErr"]} errorMessage = {"Please select a file png"}/>
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center mb-3">
                    <div className="col-10 col-md-5 col-lg-3" >
                        <div className="input-group ">
                            <label className="input-group-text">Artist</label>
                            <select className="form-select" id="artistSource">
                                <option> Choose...</option>
                                {artists !== undefined && artists.map((artist, index) => {
                                   return <option key={artist + index}>{artist.nomeArtista}</option>
                                })}
                            </select>
                        </div>
                        <WrongInputError vis={createAlbumErrors["artistErr"]} errorMessage = {"Select an option"}/>
                    </div>
                </div>

                <div className="row d-flex justify-content-center mb-3">
                    <div className="col-10 col-md-4">
                        <div className="form-group mb-3">
                            <textarea className="form-control" id={"albumDescription"} placeholder="Album description"
                                      rows={2}></textarea>
                            <WrongInputError vis={createAlbumErrors["descErr"]}
                                             errorMessage= {"Description can't be empty"}/>
                        </div>
                    </div>
                </div>


                <div className="row ">
                    <div className="col d-flex justify-content-center">
                        <button className={"btn btn-dark btnSend mb-3"} onClick={validateAlbum}
                                disabled={isSubmitting || !isFileLoaded}>Create Album </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CreateAlbum