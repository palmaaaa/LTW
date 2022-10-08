import React, {useEffect, useState} from 'react';
import '../css/Navbar.css';
import {NavbarSection} from '../../components'

import homeIcon from "../../assets/img/home_icon.png";
import recommendationsIcon from "../../assets/img/reccomendations_icon.png";
import newReleasesIcon from "../../assets/img/new_release_icon.png";
import topChartsIcon from "../../assets/img/top_charts_icon.png";

import favouritesIcon from "../../assets/img/favourites_icon.png";
import historyIcon from "../../assets/img/history_icon.png";
// import
import {NavbarHeader} from "../../components/js/navbar/NavbarHeader";
import {NavbarSongCover} from "../../components/js/navbar/NavbarSongCover";
import {views} from "../../enums/views";


const browseMusicOptions = [views.HOME, views.FAVOURITES, views.YOUR_PLAYLISTS];
const browseMusicOptionIcons = [homeIcon, favouritesIcon, recommendationsIcon];


const uploadOptions = [views.CREATE_ARTIST, views.CREATE_ALBUM, views.UPLOAD_SONG_VIEW];
const uploadOptionIcons = [recommendationsIcon, recommendationsIcon, recommendationsIcon];


const Navbar = (props) => {

    return (
        <>
        <div className={"sidenav-container"}>
            <div className="container-fluid my-md-3 my-2 mx-0 ps-4 ps-md-3 ps-lg-4"> {/* each components first div is a row */}
                <NavbarHeader/>
                <NavbarSection options={browseMusicOptions} optionIcons={browseMusicOptionIcons} title="Browse Music" toggleNavbar={props.toggleNavbar}/>
                <hr/>
                <NavbarSection options={uploadOptions} optionIcons={uploadOptionIcons} title="Upload" toggleNavbar={props.toggleNavbar}/>
                <hr/>

            </div>
            <NavbarSongCover currentSong={props.currentSong} isCurrentSongLoading={props.isCurrentSongLoading}/>
        </div>
         <button className={"btn toggle-sidenav mt-2"} onClick={props.toggleNavbar}>
             <i className="fas fa-bars toggle-sidenav-icon"></i>
         </button>
         </>
    )
}
export default Navbar