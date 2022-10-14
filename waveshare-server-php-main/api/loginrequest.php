<?php

header('Access-Control-Allow-Headers: x-prototype-version,x-requested-with');
header('Access-Control-Allow-Methods: GET,POST');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
ini_set('memory_limit', '1024M');

include_once '../config/Database.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();
$conn = $database->getConn();


$bodyJson = json_decode(file_get_contents("php://input"));

$response = [];

$passwordHash = hash('sha256', $bodyJson->password);

$query = "SELECT PasswordHASH AS ServerPassword FROM User AS U WHERE U.username = \"$bodyJson->username\"";
$stmt = $database->executeQuery($query);
if (is_null($stmt)) {
    $response["error"] = "No user found";
}
else {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($row);

    if (strcmp($ServerPassword, $passwordHash) == 0) {
        $deviceQuery = "SELECT idDevice, Username, Nome, Tipo FROM Device WHERE Username = \"$bodyJson->username\";";
        $deviceStmt = $database->executeQuery($deviceQuery);
        $devices = [];
        $found = false;
        while ($deviceRow = $deviceStmt->fetch(PDO::FETCH_ASSOC)) {
            extract($deviceRow);
            if (strcmp($idDevice, $bodyJson->deviceId) == 0) $found = true;

            $device = [
                "idDevice" => $idDevice,
                "name" => $Nome,
                "tipo" => $Tipo
            ];
            $devices[] = $device;
        }
        if (!$found) {
            $response["devices"] = $devices;
        }

    }
    else {
        $response["error"] = "Wrong password";
    }
}

echo json_encode($response);