// @flow
import React from 'react';
import '../../css/navbar/NavbarSongCover.css'
import '../../../containers/css/Navbar.css'
import songPlaceholder from '../../../assets/img/song_placeholder.png'
import LoadingWheel from "../LoadingWheel";


export function NavbarSongCover(props) {
    return (
        <div className="container-fluid m-0 sidenav-song-cover-container pb-4">
            <div className="row g-0 h-100">
                <div className="col-12 d-flex flex-column align-items-center justify-content-end">
                    <p className="ps-3 ps-md-2 ps-lg-3 align-self-start sidenav-options-title sidenav-options">Now playing</p>
                    <div className="sidenav-song-cover-img-container">
                        {!props.isCurrentSongLoading && props.currentSong === undefined &&
                            <img src={songPlaceholder} className="sidenav-song-cover" alt="Image song cover"/>}
                        {props.isCurrentSongLoading &&
                            <div className="h-100 d-flex align-items-center">
                                <LoadingWheel/>
                            </div>}
                        {!props.isCurrentSongLoading && props.currentSong !== undefined &&
                            <img src={props.currentSong.coverUrl} className="sidenav-song-cover" alt="Image song cover"/>}
                    </div>
                </div>
            </div>
        </div>
    );
};