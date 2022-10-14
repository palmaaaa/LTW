
export class Album {
    constructor(id, name, descrizione, songs, dataPubblicazione, coverUrl, authorName, authorId) {
        this.id = id;
        this.name = name;
        this.descrizione = descrizione;
        this.songs = songs;
        this.dataPubblicazione = dataPubblicazione;
        this.coverUrl = coverUrl;
        this.authorName = authorName;
        this.authorId = authorId;
    }
}