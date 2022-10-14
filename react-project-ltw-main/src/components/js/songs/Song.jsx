import React, {useState, useContext} from 'react';
import '../../css/songs/Song.css'
import moreIcon from '../../../assets/img/more_icon.png'
import like from '../../../assets/img/favourites_icon.png'
import DropDown from "../utility/DropDown";
import {sendRequest} from "../../../scripts/serverInteraction";
import {getUrlFromByteArray} from "../../../scripts/fileProcessing";
import {UserDataContext} from "../../../context/context";

function Song(props) {
    const [show,setShow] = useState(false);
    const {userData, setUserdata} = useContext(UserDataContext);

    let song = props.song;


    function disableOptions( ){
        if (show){ setShow(!show);}
    }

    function showOptions (toggle){
        setShow(!show);
    }


    async function fetchSongAudioFile() {
        if (props.isCurrentSongLoading) return;
        props.setIsCurrentSongLoading(true);
        let requestObject = {
            request: "GET_SONG",
            idAlbum: song.albumId,
            titolo: song.title
        }

        let response = await sendRequest('POST', 'getrequest', requestObject);
        let json = await response.json();

        song.fileUrl = getUrlFromByteArray(json.FileAudio);
        // downloadSong(song.fileUrl, song.albumId + "." + song.title)
        props.setCurrentSong(song);
        props.setIsCurrentSongLoading(false);
    }

    function downloadSong(data, fileName) {
        const downloadElement = document.createElement('a');
        downloadElement.href = data;
        downloadElement.download = fileName;
        document.body.appendChild(downloadElement);
        downloadElement.style.display = 'none';
        downloadElement.click();
        downloadElement.remove();
    }

    async function handleLikeSong() {
        let requestObject = {
            request: "MANAGE_LIKE_SONG",
            username: userData.username,
            titolo: song.title,
            idAlbum: song.albumId
        }

        let response = await sendRequest("POST", "managerequest", requestObject);
        let json = await response.json();

    }


    async function addSongToPlaylist(playlistId){
        let requestObject = {
            request: "MANAGE_ADD_SONG_TO_PLAYLIST",
            idPlaylist: playlistId,
            titolo: song.title,
            idAlbum: song.albumId
        }

        let response = await sendRequest("POST", "managerequest", requestObject);
        let json = await response.json();

        // if (json.Error) {
        //     alert("Error adding song to the playlist. Is it already in the playlist?")
        // }
    }


    function generateData() {
        let result={}
        for (let i= 0; i<props.playlists.length; i++){
            let element = props.playlists[i]
            result[element.name] = ()=>{ addSongToPlaylist(element.id).then()}
        }

        return result;
    }

    function formatSongDuration(duration) {
        if (duration >= 3600) {
            return new Date(duration * 1000).toISOString().substr(11, 8);
        }
        else {
            return new Date(duration * 1000).toISOString().substr(14, 5);
        }
    }


    return (
        <div className="row mb-1 g-0 song-row px-3" onMouseLeave={disableOptions} >
            <div className="col-2 col-sm-1 d-flex align-items-center" onClick={fetchSongAudioFile}>
                <div className="d-none d-lg-block p">{props.index}</div>
                <div className="song-icon-container">
                    <img className="song-cover-icon" src={song.coverUrl}/>
                </div>

            </div>
            <div className="col d-flex flex-column justify-content-center ps-3" onClick={fetchSongAudioFile} >
                <div className="p m-o song-info-text song-name-text">{song.title}</div>
                {/*<div className="p m-o song-info-text">{"artist"}</div>*/}
            </div>
            <div className="col d-none d-sm-flex align-items-center">
                <p className="song-info-text">{song.albumName}</p>
            </div>
            <div className="col-4 col-sm-2 col-lg-2 d-flex justify-content-between align-items-center ">
                <p className="mb-0 me-2 song-info-text">{formatSongDuration(song.duration)}</p>
                <img src={moreIcon} alt="more" className="song-more-icon"  onClick={showOptions}/>
                {show ? (<DropDown offsetX={-30} offsetY={-60} id={"dropDownSong"} data={generateData()}/>) : (null)}

                <img src={like} alt="likeSong" className="song-like-icon ms-2 pe-1" onClick={handleLikeSong} />

            </div>
        </div>
    );
}

export default Song;