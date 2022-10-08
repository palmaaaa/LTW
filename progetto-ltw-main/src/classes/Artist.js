
export class Artist {
    //La playlist deve prendere la copertina dalla canzone con il nome alfabetico più basso
    constructor(id, username, name, ascolatoriMensili, bio) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.ascoltatoriMensili = ascolatoriMensili;
        this.bio = bio;
    }
}