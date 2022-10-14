export function generatePlaylistObjects(number) {
    let result = [];
    for (let i = 0; i < number; i++) {
        result.push({
            id: i,
            name: "playlist" + i,
            type: "public",
            songs: [],
            coverUrl: "https://m.media-amazon.com/images/I/71SP04tsQlL._AC_SY450_.jpg",
            authorName: "juanjozo"
        },)
    }
    return result;
}

export function generateSongObjects(number) {
    let result = [];
    for (let i = 0; i < number; i++) {
        result.push({
            title: "canzone" + i,
            id:  i,
            albumName: "nomeAlbum" + i,
            coverUrl: "https://m.media-amazon.com/images/I/71SP04tsQlL._AC_SY450_.jpg",
            numberOfListens: i,
            duration: 400 + i,
            publicationDate: "boh",
            recordLabelName: "etichetta " + i,
            fileUrl: "n/a"
        })
    }
    return result;

}

