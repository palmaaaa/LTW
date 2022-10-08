import React, {useContext, useEffect, useState} from 'react';
import '../../css/forms/UploadSong.css';
import WrongInputError from "../utility/WrongInputError";
import {sendRequest} from "../../../scripts/serverInteraction";
import {Album} from "../../../classes/Album";
import {views} from "../../../enums/views";
import {UserDataContext, ViewContext} from "../../../context/context";

const UploadSong = (props) => {
    const {view, setView} = useContext(ViewContext);
    const {userData, setUserdata} = useContext(UserDataContext);

    const [createSongData,setSongData] = useState({
        "songErr":false,
        "fileErr":false,
        "fromAlbumErr":false,
    });

    const [albums, setAlbums] = useState(undefined);
    const [isFileLoaded, setIsFileLoaded] = useState(false);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [selectedFileDuration, setSelectedFileDuration] = useState(undefined);
    const [songBinaryData, setSongBinaryData] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function fetchAlbums() {
            let fetchedAlbums = []
            let requestObject = {
                request: 'GET_ALBUM_NAMES',
                username: userData.username
            }
            let response = await sendRequest('POST', 'getrequest', requestObject);
            let json = await response.json();
            let albumsList = json.albums;
            for (let album of albumsList) {
                fetchedAlbums.push(new Album(album.id, album.nome));
            }
            setAlbums(fetchedAlbums)
        }

        fetchAlbums().then()

    }, [])

    function validateSong() {
        setIsSubmitting(true)
        let tempSongData = {}
        const optSong = document.getElementById("albumSource");

        let selectedAlbumId = albums[optSong.selectedIndex - 1].id;
        let fileName = document.getElementById("fileSong").value;
        let songName = document.getElementById("songName").value;


        tempSongData["songErr"] = songName === "" ;
        tempSongData["fromAlbumErr"] = selectedAlbumId === "Choose..." ;

        setSongData(tempSongData);

        let canCreate = false;
        for (const item in createSongData) {
            canCreate |= tempSongData[item];
        }

        if (!canCreate){
            let requestObject = {
                request: "NEW_SONG_FOR_ALBUM",
                titolo: songName,
                idAlbum: selectedAlbumId,
                fileAudio: songBinaryData,
                durata: selectedFileDuration
            }

            sendRequest('POST', 'newrequest', requestObject)
                .then(response => {
                    if (response.status < 300) {
                        setView({view: views.HOME});
                    }

                    setIsSubmitting(false);
            });

        }
    }

    function handleFilesSelected(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        let reader = new FileReader();
        reader.addEventListener('load', (event) => readFile(event, file));
        reader.readAsArrayBuffer(file)
    }

    function readFile(event, passedFile) {
        let file = event.target.result;
        let audioElement = document.createElement('audio');
        audioElement.src = window.URL.createObjectURL(passedFile);
        audioElement.addEventListener('loadedmetadata', () => {
            setSelectedFileDuration(Math.ceil(audioElement.duration));
        })

        const typedArray = new Uint8Array(file);
        setSongBinaryData([...typedArray]);
        setIsFileLoaded(true);
    }

    return (
        <div className={"uploadSongContainer h-100"}>
            <div className={"container-fluid p-5 songUpload"}>

                <div className="row text-center mb-3">
                    <h2> Upload Your Song! </h2>
                </div>


                <div className="row d-flex justify-content-center mb-3">
                    <div className="col-md-3 mb-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Song title" id={"songName"}
                                   accept=".mp3,audio/*"/>
                        </div>
                        <WrongInputError vis={createSongData["songErr"]} errorMessage ={"Name can't be empty"}/>
                    </div>

                    <div className="col-md-3">
                        <div className="input-group">
                            <input type="file" className="form-control" id="fileSong" onInput={handleFilesSelected}/>
                        </div>
                        <WrongInputError vis={createSongData["fileErr"]} errorMessage ={"File must be a mp3"}/>
                    </div>
                </div>

                <div className="row d-flex justify-content-center mb-3">
                    <div className="col-md-6 col-lg-3">
                        <div className="input-group">
                            <label className="input-group-text">From Album</label>
                            <select className="form-select" id="albumSource">
                                <option> Choose...</option>
                                {albums !== undefined && albums.map((album, index) => {
                                    return <option key={album.id}>{album.name}</option>
                                })}
                            </select>
                        </div>
                        <WrongInputError vis={createSongData["fromAlbumErr"]} errorMessage ={"Select an album"}/>
                    </div>
                </div>


                <div className="row ">
                    <div className="col d-flex justify-content-center">
                        <button className={"btn btn-dark btnSend"} onClick={validateSong}
                                disabled={!isFileLoaded || isSubmitting}> Upload </button>
                    </div>
                </div>



                <p style={{display:'flex',marginTop:'1rem',justifyContent:'center'}}> You haven't created an Album for the song yet?
                    <button
                        style={{color:'white',border:'none',background:'none', marginLeft:'0.5rem', fontWeight:'550'}}>
                        Click here!</button> </p>
            </div>
        </div>
    )
}
export default UploadSong