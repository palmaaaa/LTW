import {sendRequest} from "./serverInteraction";
import {getUrlFromByteArray} from "./fileProcessing";
import songPlaceholder from "../assets/img/song_placeholder.png";
import {Playlist} from "../classes/Playlist";


export async function fetchPlaylistsByUsername(username) {
    let playlistRequest = {
        username,
        request: "GET_PROFILE_PLAYLIST"
    };

    let response = await sendRequest('POST', 'getrequest', playlistRequest);
    let json = await response.json();
    let fetchedPlaylists = []
    for (let el of json.Playlists) {
        let imageUrl = el.Copertina.length > 0 ? getUrlFromByteArray(el.Copertina) : songPlaceholder;
        let newPlaylist = new Playlist(el.Nome, el.Tipo, imageUrl, [], el.IdPlaylist, username)
        fetchedPlaylists.push(newPlaylist);
    }
    return fetchedPlaylists;
}

export async function createNewPlaylist(username, playlistName) {
    let requestObject = {
        request: "NEW_PLAYLIST",
        username,
        nome: playlistName
    }

    let response = await sendRequest("POST", "newrequest", requestObject);
    let json = await response.json();
    return json;
}

export async function fetchTopSongs() {
    let requestObject = {
        request: "SEARCH_BY_FEED_POPULAR_SONGS"
    }
    let response = await sendRequest('POST', 'searchrequest', requestObject);
    let json = await response.json()

    for (let jsonSong of json.SongFeed) {
        let uintArray = new Uint8Array(jsonSong.coverImage);
        const blob = new Blob([uintArray], {type: "application/octet-stream"})
        jsonSong.coverUrl = window.URL.createObjectURL(blob);
    }
    return json.SongFeed;
}