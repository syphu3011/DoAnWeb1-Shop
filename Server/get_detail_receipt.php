<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $id_receipt = $data_send["id_receipt"];
    $result = new CRUD();
    $data = $result -> read_data_detail_receiptById($conn, $id_receipt);
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