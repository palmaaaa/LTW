import React from 'react';
import {PlaylistCard} from "../../index";
import '../../css/songs/PlaylistCardList.css'

function PlaylistCardList(props) {

    return (
        <div className={"row g-5 justify-content-start playlist-card-row" + (props.scrollable ? " x-scrollable-row" : "")}>
            {props.playlists.map((playlist, index) => {
                return (
                    <div className={"col-auto playlist-card-col" + (props.scrollable ? " x-scrollable-col" : "")}
                         key={playlist.id + "" + index}>
                        <PlaylistCard playlist={playlist}/>
                    </div>
                );
            })}
        </div>
    );
}

export default PlaylistCardList;