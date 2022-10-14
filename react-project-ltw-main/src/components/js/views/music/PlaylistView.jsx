import React, {useEffect, useState} from 'react';
import {SongList} from "../../../index";
import '../../../css/views/music/PlaylistView.css'
import LoadingWheel from "../../LoadingWheel";
import {sendRequest} from "../../../../scripts/serverInteraction";
import {Song} from "../../../../classes/Song"

function PlaylistView(props) {
    const [songs, setSongs] = useState(undefined)

    useEffect(() => {
        async function fetchAlbumSongs() {
            let requestObject = {
                request: "GET_SONGS_OF_ALBUM",
                idAlbum: props.playlist.id
            }

            let response = await sendRequest('POST','getrequest' ,requestObject)
            let json = await response.json();
            let fetchedSongs = [];
            for (let jsonSong of json.Songs) {
                let uintArray = new Uint8Array(jsonSong.Copertina);
                const blob = new Blob([uintArray], {type: "application/octet-stream"})
                fetchedSongs.push(new Song(jsonSong.Titolo, jsonSong.IdAlbum, jsonSong.NomeAlbum,
                    window.URL.createObjectURL(blob), Math.round(Math.random() * 100), jsonSong.Durata, jsonSong.DataPubblicazione,
                    jsonSong.NomeEtichettaDiscografica, undefined))
            }
            return fetchedSongs;
        }


        async function fetchPlaylistSongs() {
            let playlistRequest = {
                idPlaylist : props.playlist.id,
                request: "GET_SONGS_OF_PLAYLIST"
            };
            let response = await sendRequest('POST', 'getrequest', playlistRequest);
            let json = await response.json();

            let fetchedSongs = []

            for (let jsonSong of json.Songs) {
                let uintArray = new Uint8Array(jsonSong.Copertina);
                const blob = new Blob([uintArray], {type: "application/octet-stream"})
                let songCoverUrl = window.URL.createObjectURL(blob);
                let song = new Song(jsonSong.Titolo, jsonSong.IdAlbum, jsonSong.NomeAlbum, songCoverUrl, Math.round(Math.random() * 100), jsonSong.Durata,
                    jsonSong.DataPubblicazione, jsonSong.NomeEtichettaDiscografica, undefined);
                fetchedSongs.push(song)
            }


            return fetchedSongs;
        }

        if (props.playlist.type !== undefined) { // playlist
            fetchPlaylistSongs().then(fetched => setSongs(fetched))
        }
        else { // album
            fetchAlbumSongs().then(fetched => setSongs(fetched))
        }
    }, [props.playlist])



    return (
        <div className="playlist-view-container pt-3 px-3 px-sm-5">
            <div className="container-fluid playlist-header mt-5">
                <div className="row playlist-title-row">
                    <div className="img-fluid">

                    </div>
                    <div className="h1 song-list-title">
                        {props.playlist.name}
                    </div>
                </div>
            </div>

            <hr className="mt-5"/>

            <div className="container-fluid playlist-songs mt-3">
                {songs === undefined && <LoadingWheel/>}
                {songs !== undefined && <SongList songs={songs} isCurrentSongLoading={props.isCurrentSongLoading}
                                                  setIsCurrentSongLoading={props.setIsCurrentSongLoading} currentSong={props.currentSong}
                                                  setCurrentSong={props.setCurrentSong}/>}

            </div>
        </div>
    );
}

export default PlaylistView;