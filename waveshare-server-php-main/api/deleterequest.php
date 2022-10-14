<?php

header('Access-Control-Allow-Headers: x-prototype-version,x-requested-with');
header('Access-Control-Allow-Methods: GET,POST');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../config/Database.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();
$conn = $database->getConn();


$bodyJson = json_decode(file_get_contents("php://input"));

$response = [];

switch ($bodyJson->request) {

    case "DELETE_DEVICE":
        $query = "DELETE FROM Device WHERE idDevice = \"$bodyJson->idDevice\"";
        $stmt = $database->executeQuery($query);
            if (is_null($stmt)) break;

         $response["Success"] = "Device deleted successfully";
        break;

    default:
        break;
}

echo json_encode($response);