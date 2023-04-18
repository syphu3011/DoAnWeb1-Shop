<?php
    require_once('../init.php');
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $crud = new CRUD();
    $dataResult = $crud->read_data_cartById($conn, $data_send["idkh"]);
    if (count($dataResult) > 0) {
        $response = [
            "success" => true,
            "data" => $dataResult,
        ];
    } else {
        $response = [
            "success" => false,
            "error" => "No data found",
            "data received" => $data_send
        ];
    }
    echo json_encode($response);
?>