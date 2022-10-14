import React, {useEffect, useState, useContext} from 'react';
import {Song} from "../../index";
import {fetchPlaylistsByUsername} from "../../../scripts/fetch";
import {UserDataContext} from "../../../context/context";


function SongList(props) {

    const [playlists, setPlaylists] = useState();
    const {userData, setUserdata} = useContext(UserDataContext);


    useEffect(()=>{
        fetchPlaylistsByUsername(userData.username).then(result=> {setPlaylists(result)});

    },[]);

    return (
        <div className="container-fluid my-4 px-0">
            {props.songs.map((song, index) => {
                return <Song song={song} index={index+1} key={song.title+song.albumId}
                             isCurrentSongLoading={props.isCurrentSongLoading}
                             setIsCurrentSongLoading={props.setIsCurrentSongLoading} currentSong={props.currentSong}
                             setCurrentSong={props.setCurrentSong}
                             playlists={playlists}/>
            })}
        </div>
    );
}

export default SongList;