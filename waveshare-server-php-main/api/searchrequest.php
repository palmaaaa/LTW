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
$file_path = '../files/';
$file_handler = new FileHandler();


$bodyJson = json_decode(file_get_contents("php://input"));

$response = [];

switch ($bodyJson->request) {

    case "SEARCH_BY_FEED_POPULAR_SONGS":
        $query = "SELECT CA.*, COUNT(Username) as likecount" .
                                 " FROM CanzoneAlbum AS CA LEFT JOIN Waveshare_DB.Like AS L ON CA.IdAlbum = L.IdAlbum AND CA.Titolo = L.Titolo" .
                                 " GROUP BY CA.IdAlbum, CA.Titolo" .
                                 " ORDER BY likecount DESC " .
                                 "LIMIT 50;";
        $stmt = $database->executeQuery($query);
            if (is_null($stmt)) return;

        $songs = [];
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $byteArr = $file_handler->getFileFromPath($file_path . 'album/copertina/' . $IdAlbum);

            $song = [
                "albumId" => $IdAlbum,
                "title" => $Titolo,
                "numberOfListens" => $NumeroAscolti,
                "duration" => $Durata,
                "albumName" => $Nome,
                "descrizione" => $Descrizione,
                 "coverImage" => $byteArr,
                "publicationDate" => $DataPubblicazione,
                "recordLabelName" => $NomeEtichettaDiscografica
            ];
            $songs[] = $song;
        }
        $response["SongFeed"] = $songs;
        break;

    default:
        break;
}


echo json_encode($response);