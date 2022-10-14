import React, {useContext} from 'react';
import '../css/Content.css';
import {views} from '../../enums/views'
import {
    AddSocial,
    CreateAlbum,
    CreateArtist,
    Home,
    PlaylistCardListView,
    PlaylistView,
    Settings,
    SongListView,
    UploadSong,
    YourProfile
} from "../../components";
import {fetchPlaylistsByUsername, fetchTopSongs} from "../../scripts/fetch";
import {sendRequest} from "../../scripts/serverInteraction";
import {getUrlFromByteArray} from "../../scripts/fileProcessing";
import {Song} from "../../classes/Song"
import {UserDataContext, ViewContext} from "../../context/context";

const Content = (props) => {
    const {view, } = useContext(ViewContext);
    const {userData, } = useContext(UserDataContext);


    let contentContainer = document.getElementById("content-container");

    function renderView() {
        contentContainer?.scrollTo(0, 0);

        switch (view.view) {

            case views.HOME:
                return <Home isCurrentSongLoading={props.isCurrentSongLoading} setIsCurrentSongLoading={props.setIsCurrentSongLoading}
                             currentSong={props.currentSong} setCurrentSong={props.setCurrentSong}/>;

            case views.ADD_SOCIAL:
                return <AddSocial/>;

            case views.FAVOURITES:
                return  <SongListView title={"Favourites"} fetchSongs={fetchLikedSongs()} isCurrentSongLoading={props.isCurrentSongLoading}
                                      setIsCurrentSongLoading={props.setIsCurrentSongLoading} currentSong={props.currentSong}
                                      setCurrentSong={props.setCurrentSong}/>;
            case views.PROFILE_VIEW:
                return <YourProfile/>;

            case views.SETTINGS_VIEW:
                return <Settings/>;

            case views.UPLOAD_SONG_VIEW:
                return <UploadSong/>;

            case views.CREATE_ALBUM:
                return <CreateAlbum/>;

            case views.CREATE_ARTIST:
                return <CreateArtist/>;

            case views.YOUR_PLAYLISTS:
                return <PlaylistCardListView title={"Your playlists"} fetchPlaylists={() => fetchPlaylistsByUsername(userData.username)} canAdd={true}/>;

            case views.TOP_CHARTS:
                return  <SongListView title={"Top Charts"} fetchSongs={fetchTopSongs} isCurrentSongLoading={props.isCurrentSongLoading}
                                      setIsCurrentSongLoading={props.setIsCurrentSongLoading} currentSong={props.currentSong}
                                      setCurrentSong={props.setCurrentSong}/>;

            // case views.HISTORY:
            //     return  <SongListView title={"History"} fetchSongs={fetchHistorySongs} isCurrentSongLoading={props.isCurrentSongLoading}
            //                           setIsCurrentSongLoading={props.setIsCurrentSongLoading} currentSong={props.currentSong}
            //                           setCurrentSong={props.setCurrentSong}/>;

            case views.PLAYLIST_VIEW:
                return <PlaylistView playlist={view.playlist} isCurrentSongLoading={props.isCurrentSongLoading}
                                     setIsCurrentSongLoading={props.setIsCurrentSongLoading} currentSong={props.currentSong}
                                     setCurrentSong={props.setCurrentSong}/>;

            default:
                return <Home isCurrentSongLoading={props.isCurrentSongLoading} setIsCurrentSongLoading={props.setIsCurrentSongLoading}
                             currentSong={props.currentSong}
                             setCurrentSong={props.setCurrentSong}/>;
        }
    }


    async function fetchLikedSongs() {
        let likedRequest = {
            username: userData.username,
            request: "GET_SONG_LIKED_BY"
        };

        let likedResponse = await sendRequest('POST', 'getrequest', likedRequest);
        let json = await likedResponse.json();

        let songs = [];

        for (let jsonSong of json.Songs) {
            let imageUrl = getUrlFromByteArray(jsonSong.Copertina);
            let song = new Song(jsonSong.Titolo, jsonSong.IdAlbum, jsonSong.NomeAlbum, imageUrl,
                jsonSong.NumeroAscolti, jsonSong.Durata, jsonSong.DataPubblicazione, jsonSong.NomeEtichettaDiscografica)

            songs.push(song)
        }
        return songs;

    }


    return (
        <div id="content-container">
            {renderView()}
            <div className="row" id="content-footer"></div>
        </div>
    )
}
export default Content