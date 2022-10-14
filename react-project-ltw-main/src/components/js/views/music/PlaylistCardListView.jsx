import React, {useEffect, useState, useContext} from 'react';
import {PlaylistCardList} from "../../../index";
import '../../../css/views/music/PlaylistCardListView.css'
import {createNewPlaylist} from "../../../../scripts/fetch";
import {Playlist} from "../../../../classes/Playlist";
import songPlaceholder from "../../../../assets/img/song_placeholder.png";
import {UserDataContext} from "../../../../context/context";
import LoadingWheel from "../../LoadingWheel";

const PlaylistCardListView = (props) => {
    const {userData, setUserdata} = useContext(UserDataContext);

    const [playlists, setPlaylists] = useState(undefined);

    useEffect(() => {
        props.fetchPlaylists().then(playlists =>
        {
            setPlaylists(playlists)
        })
    }, [])


    function handleClickOnNewPlaylist() {
        let playlistName = userData.username + " Playlist n. " + (playlists.length + 1);

        createNewPlaylist(userData.username, playlistName).then(json => {
            setPlaylists([...playlists, new Playlist(playlistName, "Privata",
                    songPlaceholder, [], json.playlistId, userData.username)])
        });

    }




    return (
            <div className="playlist-card-list-view-container pt-3 px-3 px-sm-5">
                <div className="container-fluid song-list-view-header mt-5">
                    <div className="row playlist-card-list-title">
                        <div className="col d-flex align-items-center">
                            <div className="h1 song-list-title me-3">
                                {props.title}
                            </div>
                            {props.canAdd && playlists !== undefined &&
                                <button className="btn no-decoration profile-add-playlist-button" onClick={handleClickOnNewPlaylist}>+</button>}
                        </div>
                    </div>
                </div>

                <hr className="mt-5"/>

                <div className="container-fluid song-list-view-songs mt-3">
                    {playlists === undefined && <LoadingWheel/>}
                    {playlists !== undefined && <PlaylistCardList playlists={playlists}/>}
                </div>
            </div>
    )
}
export default PlaylistCardListView