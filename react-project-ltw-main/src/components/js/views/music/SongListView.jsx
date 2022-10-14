import React, {useEffect, useState} from "react";
import '../../../css/views/music/SongListView.css'
import {SongList} from "../../../index";
import LoadingWheel from "../../LoadingWheel";

const SongListView = (props) => {
    const [songs, setSongs] = useState(undefined);

    useEffect(() => {
        props.fetchSongs.then(songs => setSongs(songs))

    }, [])
    return (
        <div className="song-list-view-container pt-3 px-3 px-sm-5">
            <div className="container-fluid song-list-view-header mt-5">
                <div className="row song-list-title-row">
                    <div className="h1 song-list-title">
                        {props.title}
                    </div>
                </div>
            </div>

            <hr className="mt-5"/>

            <div className="container-fluid song-list-view-songs mt-3">
                {songs === undefined && <LoadingWheel/>}
                {songs !== undefined &&
                    <SongList songs={songs} isCurrentSongLoading={props.isCurrentSongLoading}
                              setIsCurrentSongLoading={props.setIsCurrentSongLoading}
                              currentSong={props.currentSong} setCurrentSong={props.setCurrentSong}/>}
            </div>
        </div>
    )
}
export default SongListView