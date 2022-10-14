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
$file_path = '../files/';

$bodyJson = json_decode(file_get_contents("php://input"));

$response = [];

switch ($bodyJson->request) {

    case "MANAGE_LIKE_SONG":
        $query = "INSERT INTO Waveshare_DB.Like (Username, Titolo, IdAlbum)
                  VALUES (\"$bodyJson->username\", \"$bodyJson->titolo\", \"$bodyJson->idAlbum\")";

        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) $response["error"] = "There was an error inserting the data into the database";
        break;

    case "MANAGE_ADD_SONG_TO_PLAYLIST":
        $query = "INSERT INTO AppartenenzaCanzonePlaylist
                      VALUES (\"$bodyJson->titolo\", \"$bodyJson->idAlbum\", \"$bodyJson->idPlaylist\")";
        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;
        break;


    case "MANAGE_ADD_PROFILE_PIC":
        $file_handler->saveFileToPath($bodyJson->foto, $file_path . 'profilo/foto/' . $bodyJson->username);
        break;

    default:
        break;
}


echo json_encode($response);