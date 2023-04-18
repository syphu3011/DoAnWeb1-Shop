<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $crud = new CRUD();
    $data_result = $crud 
        -> insert_data_to_cartById($conn, 
            $data_send["idkh"],
            $data_send["idsp"],
            $data_send["idm"],
            $data_send["ids"],
            $data_send["amount"],
            $data_send["price"]);
    if (count($data_result) > 0) {
    $response = array(
        'success' => true,
        'data' => $data_send
    );
} else {
    $response = array(
        'success' => false,
        'error' => "No data found."
    );
}
echo json_encode($response);
?>