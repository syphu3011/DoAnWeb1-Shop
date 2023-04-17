<?php
    require_once('../init.php');
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $crud = new CRUD();
    $dataResult = $crud->check_cartById($conn, $data_send["idkh"], $data_send["idpro"]);
    if (count($dataResult) > 0) {
        $response = [
            "success" => true,
            "data" => $dataResult,
        ];
    } else {
        $response = [
            "success" => false,
            "error" => "No data found",
        ];
    }
    echo json_encode($response);
?>