<?php

header('Access-Control-Allow-Headers: x-prototype-version,x-requested-with');
header('Access-Control-Allow-Methods: GET,POST');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
ini_set('memory_limit', '1024M');

include_once '../config/Database.php';
include_once '../scripts/FileHandler.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();
$conn = $database->getConn();
$file_handler = new FileHandler();

$bodyJson = json_decode(file_get_contents("php://input"));

$file_path = '../files/';

$response = [];

switch ($bodyJson->request) {

    case "GET_ARTISTS_BY_USERNAME":
        $query = "SELECT Id, Nome FROM Artista WHERE Username = \"$bodyJson->username\"";

        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $artists = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $artist = [
                "idArtista" => $Id,
                "nomeArtista" => $Nome
            ];
            $artists[] = $artist;
        }
        $response["artists"] = $artists;
        break;

    case "GET_ALBUM_NAMES":
        $query = "SELECT idAlbum, Nome FROM Album WHERE User = \"$bodyJson->username\"";
        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $albums = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $album = [
                "id" => $idAlbum,
                "nome" => $Nome
            ];
            $albums[] = $album;
        }
        $response["albums"] = $albums;
        break;


    case "GET_DEVICES": //done
        $query = "SELECT * FROM Device WHERE username = \"$bodyJson->username\";";
        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $devices = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $device = [
                "idDevice" => $idDevice,
                "name" => $Nome,
                "tipo" => $Tipo
            ];
            $devices[] = $device;
        }
        $response["devices"] = $devices;
        break;

    case "GET_POPULAR_ALBUMS":
        $query = "SELECT Album.idAlbum, Album.Copertina, Album.Nome, Album.Descrizione AS AlbumDesc, " .
            "Album.DataPubblicazione, Artista.Id AS ArtistId," .
            " Artista.Nome AS ArtistName FROM Album JOIN incisionealbum ON ((album.idAlbum = incisionealbum.idAlbum))" .
            " JOIN Artista ON ((incisionealbum.idArtista = Artista.Id)) LIMIT 6";
        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;


        $albums = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $byteArr = $file_handler->getFileFromPath($file_path . 'album/copertina/' . $idAlbum);

            $album = [
                "id" => $idAlbum,
                "coverFile" => $byteArr,
                "name" => $Nome,
                "pubblicationDate" => $DataPubblicazione,
                "artistId" => $ArtistId,
                "description" => $AlbumDesc,
                "artistName" => $ArtistName
            ];
            $albums[] = $album;
        }
        $response["albums"] = $albums;
        break;


    case "GET_SONG":
        $byteArr = $file_handler->getFileFromPath($file_path . 'canzone/file_audio/' . $bodyJson->idAlbum . "." . $bodyJson->titolo);

        $response["FileAudio"] = $byteArr;
        break;


     case "GET_SONGS_OF_ALBUM":
                 $queryAlbum = "SELECT CA.Titolo, CA.IdAlbum, CA.Copertina, CA.NumeroAScolti, CA.Durata, CA.Descrizione, 
                    CA.Nome, CA.Copertina, CA.DataPubblicazione, CA.NomeEtichettaDiscografica FROM CanzoneAlbum AS CA 
                    WHERE CA.IdAlbum = \"$bodyJson->idAlbum\"";

                 $stmtAlbum = $database->executeQuery($queryAlbum);
                 if (is_null($stmtAlbum)) break;

                 $queryIncisori = "SELECT Artista.Nome as ArtistName, Artista.Id AS ArtistId FROM IncisioneAlbum, Artista 
                                                          WHERE IncisioneAlbum.IdAlbum = \"$bodyJson->idAlbum\" 
                                                            AND IncisioneAlbum.IdArtista = Artista.Id";

                 $stmtIncisori = $database->executeQuery($queryIncisori);
                 $arrayIncisori = [];

                 while ($row = $stmtIncisori->fetch(PDO::FETCH_ASSOC)) {
                     extract($row);
                     $arrayIncisori[] = [
                       "artistName" => $ArtistName,
                       "artistId" => $ArtistId
                     ];
                 }

                 $songs = [];
                 while($row = $stmtAlbum->fetch(PDO::FETCH_ASSOC)) {
                     extract($row);
                     $byteArr = $file_handler->getFileFromPath($file_path . 'album/copertina/' . $IdAlbum);

                     $song = [
                         "Titolo" => $Titolo,
                         "IdAlbum" => $IdAlbum,
                         "NumeroAscolti" => $NumeroAscolti,
                         "Durata" => $Durata,
                         "Descrizione" => $Descrizione,
                         "NomeAlbum" => $Nome,
                         "Copertina" => $byteArr,
                         "DataPubblicazione" => $DataPubblicazione,
                         "NomeEtichettaDiscografica" => $NomeEtichettaDiscografica
                     ];
                     $songs[] = $song;
                 }
                 $response["Songs"] = $songs;
                 $response["Incisori"] = $arrayIncisori;
                 break;

    case "GET_SONGS_OF_PLAYLIST":
        $query = "SELECT CP.Titolo, CP.IdAlbum AS IdAlbum, CP.NumeroAscolti, CP.Durata, CP.IdPlaylist, CP.Data,
            CP.Nome AS NomePlaylist, CP.Tipo, CP.Username, CA.Descrizione, CA.Nome AS NomeAlbum,
            CA.Copertina, CA.DataPubblicazione, CA.NomeEtichettaDiscografica
            FROM CanzonePlaylist AS CP, CanzoneAlbum AS CA 
            WHERE CA.IdAlbum = CP.IdAlbum AND CA.Titolo = CP.Titolo AND CP.IdPlaylist = $bodyJson->idPlaylist";
        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $songs = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $byteArr = $file_handler->getFileFromPath($file_path . 'album/copertina/' . $IdAlbum);

            $song = [
                "Titolo" => $Titolo,
                "Copertina" => $byteArr,
                "IdAlbum" => $IdAlbum,
                "NumeroAscolti" => $NumeroAscolti,
                "Durata" => $Durata,
                "Descrizione" => $Descrizione,
                "NomeAlbum" => $NomeAlbum,
                "DataPubblicazione" => $DataPubblicazione,
                "NomeEtichettaDiscografica" => $NomeEtichettaDiscografica
            ];
            $songs[] = $song;
        }
        $response["Songs"] = $songs;
        break;


    case "GET_PROFILE_INFO": // non so bene come procedere
        $query = "SELECT username, Nome, Cognome, DataNascita, sesso, email, JSONSettings, NomePiano, Foto, Bio 
                        FROM UserProfilo WHERE UserProfilo.username = \"$bodyJson->username\"";
        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        extract($row);

        $profile = [
            "Nome" => $Nome,
            "Cognome" => $Cognome,
            "DataNascita" => $DataNascita,
            "Sesso" => $Sesso,
            "Email" => $Email,
            "Bio" => $Bio
        ];

        $photoPath = $file_path . 'profilo/foto/' . $bodyJson->username;
        if (file_exists($photoPath)) {
            $profile["Foto"] = $file_handler->getFileFromPath($photoPath);
        }
        $response["ProfileData"] = $profile;
        break;

    case "GET_PROFILE_PIC":
        //sia in un array
        $photoPath = $file_path . 'profilo/foto/' . $bodyJson->username;
        if (file_exists($photoPath)) {
            $response["Foto"] = $file_handler->getFileFromPath($photoPath);
        }

        break;


    case "GET_SONG_LIKED_BY": //done
        $query = "SELECT CA.Titolo, CA.IdAlbum AS IdAlbum, CA.Copertina, CA.NumeroAscolti, CA.Durata, CA.Nome, " .
            "CA.DataPubblicazione, CA.NomeEtichettaDiscografica, CA.Descrizione " .
            "FROM CanzoneAlbum AS CA JOIN Waveshare_DB.Like AS L " .
            "ON CA.IdAlbum = L.IdAlbum AND CA.Titolo = L.Titolo AND L.Username = \"$bodyJson->username\"";
        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $songs = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $byteArr = $file_handler->getFileFromPath($file_path . 'album/copertina/' . $IdAlbum);

            $song = [
                "Titolo" => $Titolo,
                "Copertina" => $byteArr,
                "IdAlbum" => $IdAlbum,
                "NumeroAscolti" => $NumeroAscolti,
                "Durata" => $Durata,
                "Descrizione" => $Descrizione,
                "NomeAlbum" => $Nome,
                "DataPubblicazione" => $DataPubblicazione,
                "NomeEtichettaDiscografica" => $NomeEtichettaDiscografica
            ];
            $songs[] = $song;
        }
        $response["Songs"] = $songs;
        break;

    case "GET_PROFILE_PLAYLIST":
        $query = "SELECT idPlaylist, Nome, Tipo, PlaylistProfilo.Data FROM PlaylistProfilo 
                                                    where PlaylistProfilo.username = \"$bodyJson->username\"";
        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $playlists = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $playlistCoverQuery = "SELECT CA.IdAlbum AS IdAlbum FROM CanzonePlaylist AS CP, CanzoneAlbum AS CA
                WHERE CA.IdAlbum = CP.IdAlbum AND CA.Titolo = CP.Titolo AND CP.IdPlaylist = $idPlaylist LIMIT 1;";

            $stmt = $database->executeQuery($playlistCoverQuery);
            $coverRow = $stmt->fetch(PDO::FETCH_ASSOC);
            extract($coverRow);

            $byteArr = $file_handler->getFileFromPath($file_path . 'album/copertina/' . $IdAlbum);

            $playlist = [
                "IdPlaylist" => $idPlaylist,
                "Nome" => $Nome,
                "Tipo" => $Tipo,
                "Data" => $Data,
                "Copertina" => $byteArr

            ];
            $playlists[] = $playlist;
        }
        $response["Playlists"] = $playlists;
        break;


    default:
        break;
}


echo json_encode($response);
