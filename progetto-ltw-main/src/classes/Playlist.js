

export class Playlist {
    //La playlist deve prendere la copertina dalla canzone con il nome alfabetico più basso
    constructor(name, type, coverUrl, songs, id, authorName) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.songs = songs;
        this.coverUrl = coverUrl;
        this.authorName = authorName;
    }
}