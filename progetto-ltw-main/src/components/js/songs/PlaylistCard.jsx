import React, {useContext} from 'react';
import '../../css/songs/PlaylistCard.css'
import {views} from "../../../enums/views";
import {ViewContext} from "../../../context/context";

function PlaylistCard(props) {
    const {view, setView} = useContext(ViewContext)

    function openPlaylist() {
        setView({view: views.PLAYLIST_VIEW, playlist: props.playlist})
    }

    return (
        <div className="card playlist-card-container" onClick={openPlaylist}>
            <img src={props.playlist.coverUrl} className="card-img-top playlist-card-image" alt="playlist cover"/>
            <div className="card-body">
                <h5 className="card-title playlist-card-name">{props.playlist.name}</h5>
                <p className="card-text playlist-card-authorName">{props.playlist?.authorName}</p>
            </div>
        </div>
    );
}

export default PlaylistCard;