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

    case "NEW_ALBUM": //dubbio sulla correttezza, mancherebbe la copertina in ogni caso (?)
        $query = "INSERT INTO Album (Nome, Descrizione, DataPubblicazione, NomeEtichettaDiscografica, User)
        Values (\"$bodyJson->nome\",\"$bodyJson->descrizione\",\"$bodyJson->dataPubblicazione\",\"default\",\"$bodyJson->username\"); ";


        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $file_handler->saveFileToPath($bodyJson->copertina, $file_path . 'album/copertina/' . $database->getConn()->lastInsertId());
        break;


    case "NEW_ARTIST":
        $query = "INSERT INTO Artista (Nome, AscoltatoriMensili, Biografia, username)
            Values (\"$bodyJson->nome\", 0, \"$bodyJson->biografia\", \"$bodyJson->username\");";

        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $artistId = $database->getConn()->lastInsertId();


        if($bodyJson->isGruppo) {
            $queryTwo = "INSERT INTO Gruppo (IdArtista, DataFondazione) Values (\"$artistId\", \"$bodyJson->dataFondazione\");";
        }
        else {
            $queryTwo =  "INSERT INTO Musicista (IdArtista, TipoMusicista) Values (\"$artistId\",\"$bodyJson->tipoMusicista\");";
        }
        $database->executeQuery($queryTwo);
        break;


    case "NEW_DEVICE":
        $query = "INSERT INTO Device (idDevice, Username, Nome, Tipo)
                Values (\"$bodyJson->idDevice\", \"$bodyJson->username\", \"$bodyJson->name\", \"$bodyJson->tipo\");";

        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $response["Success"] = "Device added successfully";
        break;


    case "NEW_USER":
        $passwordHash = hash('sha256', $bodyJson->password);
        $defaultJsonSettings = [
            "VisibleRealName" => false,
            "VisibleBirthDate" => false,
            "VisibleSex" => false,
            "VisibleEmail" => false
        ];

        $query = "INSERT INTO User (Username, PasswordHash, Email, JSONSettings, NomePiano, IdIndirizzo)
            VALUES (\"$bodyJson->username\",\"$passwordHash\",\"$bodyJson->email\", '" . json_encode($defaultJsonSettings) . "',\"free\",1);";

        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        //create profile
        $queryProfile = "INSERT INTO Profilo (Username, nome, cognome, datanascita, sesso) " .
            "VALUES(\"$bodyJson->username\",\"$bodyJson->name\",\"$bodyJson->surname\",\"$bodyJson->birthDate\",
            \"$bodyJson->sex\");";
        $database->executeQuery($queryProfile);

        break;


    case "NEW_SONG_FOR_ALBUM":
        $query = "INSERT INTO Canzone (Titolo, IdAlbum, Durata, NumeroAscolti)
            Values (\"$bodyJson->titolo\", $bodyJson->idAlbum, $bodyJson->durata, 0);";

        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;

        $file_handler->saveFileToPath($bodyJson->fileAudio, $file_path . 'canzone/file_audio/' . $bodyJson->idAlbum . "." . $bodyJson->titolo);
        break;


    case "NEW_PLAYLIST":
        $query = "INSERT INTO Playlist (Nome, Tipo, Username)
            Values (\"$bodyJson->nome\", \"Privata\", \"$bodyJson->username\");";

        $stmt = $database->executeQuery($query);
        if (is_null($stmt)) break;


        $response["playlistId"] = $database->getConn()->lastInsertId();
        break;

    default:
        break;
}

echo json_encode($response);
