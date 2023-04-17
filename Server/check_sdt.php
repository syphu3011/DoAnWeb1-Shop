<?php
require_once('../init.php');
require_once('CRUD.php');
$data_send = json_decode(file_get_contents('php://input'), true);
$sdt = $data_send["numberphone"];
$result = new CRUD();
$data = $result -> check_sdt($conn, $sdt);
if (count($data) > 0) {
    $response = array(
        'success' => true,
        'data' => $data
    );
} else {
    $response = array(
        'success' => false,
        'error' => "No data found."
    );
}
echo json_encode($response);
?>