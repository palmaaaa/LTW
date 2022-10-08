import React, {useEffect, useState, useContext} from 'react';
import '../../../css/views/social/YourProfile.css';
import {PlaylistCardList} from "../../../index";
import {sendRequest} from "../../../../scripts/serverInteraction";
import songPlaceholder from "../../../../assets/img/song_placeholder.png"
import {Playlist} from "../../../../classes/Playlist";
import LoadingWheel from "../../LoadingWheel";
import {createNewPlaylist, fetchPlaylistsByUsername} from "../../../../scripts/fetch";
import {UserDataContext} from "../../../../context/context";


const YourProfile = (props) => {
    const {userData, setUserData} = useContext(UserDataContext);

    const [playlists, setPlaylists] = useState(undefined);
    const [profileData, setProfileData] = useState(undefined);

    const changeTextButton = (e) => { e.target.textContent = "Change Picture"; }
    const removeTextButton = (e) => { e.target.textContent = ""; }

    useEffect(() => {
        fetchProfileData()
            .then(() => fetchPlaylistsByUsername(userData.username)
            .then(fetchedPlaylists => {
                setPlaylists(fetchedPlaylists)
            }
        ))

    }, [])

    async function fetchProfileData() {
        let getProfileObject = {
            request: "GET_PROFILE_INFO",
            username: userData.username
        };

        let response = await sendRequest('POST', 'getrequest', getProfileObject);
        let json = await response.json();
        let data = json.ProfileData;
        let fetchedUserData = {
            name: data.Nome,
            surname: data.Cognome,
            dateOfBirth: data.DataNascita,
            sex: data.Sesso,
            email: data.email,
            bio: data.Bio
        }

        let profilePicUrl = userData.profilePicUrl;
        setUserData((oldUserData) => ({...oldUserData, profilePicUrl}));
        setProfileData(fetchedUserData);
    }


    function handleClickOnNewPlaylist() {
        let playlistName = userData.username + " Playlist n. " + (playlists.length + 1);

        createNewPlaylist(userData.username, playlistName).then(json => {
            setPlaylists([...playlists, new Playlist(playlistName, "Privata",
                songPlaceholder, [], json.playlistId, userData.username)])
        });


    }

    function handleFilesSelected(event) {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.addEventListener('load', (event) => readFile(event, file));
        reader.readAsArrayBuffer(file)
    }

    function readFile(event, passedFile) {
        let file = event.target.result;
        const typedArray = new Uint8Array(file);
        updateProfilePicture([...typedArray], passedFile).then()
    }

    async function updateProfilePicture(binaryData, file) {
        let requestObject = {
            request: "MANAGE_ADD_PROFILE_PIC",
            foto: binaryData,
            username: userData.username
        }


        let response = await sendRequest("POST", 'managerequest', requestObject);
        let json = await response.json();

        if (response.status < 300) {
            setUserData((oldUserData) => ({...oldUserData, profilePicUrl: window.URL.createObjectURL(file)}));
        }
    }

    function selectFileImg(){
        document.getElementById("file-input-img").click();
    }

    if (profileData === undefined) {
        return <LoadingWheel/>
    }

    return (
        <div className="container-fluid" style={{marginTop: "5rem"}}>
            <hr/>
            <div className="row">
                <div className="col">
                    <div className="container-fluid">

                        <div className="row mb-3">
                            <div className="col-7 col-sm-4 col-md-3">
                                <button id={"profileChangeable"}
                                        onMouseEnter={changeTextButton} onMouseLeave={removeTextButton}
                                        style={{backgroundImage: "url(" + userData.profilePicUrl +")"}}
                                        className={"profile-view-profile-picture mb-2"} onClick={selectFileImg}></button>
                                <input id="file-input-img" type="file" style={{display: "none"}} onInput={handleFilesSelected}/>
                            </div>

                            <div className="col-5 col-sm-8 col-md-9">
                                <div className="container-fluid d-flex justify-content-start ">
                                    <div className="row">
                                        <div className="col your-profile-infos ">
                                            <h1 className={"artist-name mt-3 mb-5"}>{userData.username}</h1>
                                            <div className={"info-artist"}> 10 Followers</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {profileData.bio}
                        </div>

                    </div>

                </div>
            </div>


            <hr/>

            <div className="row">
                <div className="col">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <div className="h1 bold-and-highlight mt-2 me-3">Your playlists</div>
                                {playlists !== undefined &&
                                    <button className="btn no-decoration profile-add-playlist-button"
                                        onClick={handleClickOnNewPlaylist}>+
                                </button>
                                }
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                {playlists === undefined && <LoadingWheel/> /* TODO center loading verticalwise */}
                                {playlists !== undefined &&
                                    <PlaylistCardList playlists={playlists}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default YourProfile