

export class Song {
    constructor(title, albumId, albumName, coverUrl, numberOfListens, duration, publicationDate, recordLabelName, fileUrl) {
        this.title = title
        this.albumId = albumId
        this.albumName = albumName
        this.coverUrl = coverUrl
        this.numberOfListens = numberOfListens
        this.duration = duration
        this.publicationDate = publicationDate
        this.recordLabelName = recordLabelName
        this.fileUrl = fileUrl;
    }
}