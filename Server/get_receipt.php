<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $id_customer = $data_send["id_customer"];
    $result = new CRUD();
    $data["receipt"] = $result->read_data_receiptById($conn, $id_customer);
    if (count($data["receipt"]) > 0) {
        $id_receipt =  $data["receipt"]["id"];
        $data["detail_receipt"] = $result->read_data_detail_receiptById($conn, $id_receipt);
        $response = array(
            'success' => true,
            'data' => $data,
            'data_post' => $id_receipt
        );
    } else {
        $response = array(
            'success' => false,
            'error' => "No data found.",
            'id' => $id_customer
        );
    }
    echo json_encode($response);
?>
