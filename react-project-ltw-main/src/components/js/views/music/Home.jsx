import React, {useEffect, useState} from 'react';
import '../../../css/views/music/Home.css'
import {Searchbar} from "../../../index";
import PlaylistCardList from "../../songs/PlaylistCardList";
import SongList from "../../songs/SongList";
import LoadingWheel from "../../LoadingWheel";
import {fetchTopSongs} from "../../../../scripts/fetch";
import {sendRequest} from "../../../../scripts/serverInteraction";
import {Album} from "../../../../classes/Album";

const Home = (props) => {
    const [topSongs, setTopSongs] = useState(undefined);
    const [topAlbums, setTopAlbums] = useState(undefined);


    useEffect(() => {
        fetchTopAlbums().then(albums => setTopAlbums(albums))
            .then(() => fetchTopSongs().then(songs => setTopSongs(songs))
        );



    }, []);

    async function fetchTopAlbums() {
        let requestObject = {
            request: "GET_POPULAR_ALBUMS"
        }

        let response = await sendRequest('POST', 'getrequest', requestObject);
        let json = await response.json();
        let fetchedAlbums = [];
        for (let jsonAlbum of json.albums) {
            let uintArray = new Uint8Array(jsonAlbum.coverFile);
            const blob = new Blob([uintArray], {type: "application/octet-stream"})
            fetchedAlbums.push(new Album(jsonAlbum.id, jsonAlbum.name, jsonAlbum.description,[],
                jsonAlbum.publicationDate, window.URL.createObjectURL(blob), jsonAlbum.artistName, jsonAlbum.artistId))
        }

        return fetchedAlbums;

    }


    return (
        <div className="home-container pt-3 px-3 px-sm-5">
            <div className="container-fluid home-header-container ms-sm-1 ps-0 ps-sm-2">
                <Searchbar/>

                <div className="row home-slogan-container">
                    <div className="col-12 d-flex flex-column justify-content-center">
                        <p className="h1 home-slogan">The best music of 2022</p>
                        <p className="h1 home-slogan">Get into the wave.</p>
                    </div>
                </div>

            </div>
            <div className="container-fluid d-flex justify-content-center">
                {topAlbums === undefined && <LoadingWheel/>}
                {topAlbums !== undefined && <PlaylistCardList playlists={topAlbums} scrollable={true}/>}
            </div>

            <div className="container-fluid mt-4">
                <div className="row g-0">
                    <div className="col">
                        <div className="h5 home-top-music-text">Top Music</div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col">
                        {topSongs === undefined && <LoadingWheel/>}
                        {topSongs !== undefined && <SongList songs={topSongs} isCurrentSongLoading={props.isCurrentSongLoading}
                                                             setIsCurrentSongLoading={props.setIsCurrentSongLoading} currentSong={props.currentSong}
                                                             setCurrentSong={props.setCurrentSong}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home