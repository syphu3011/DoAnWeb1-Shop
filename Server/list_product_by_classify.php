<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_received = json_decode(file_get_contents("php://input"), true);
    $crud = new CRUD();
    // echo json_encode($data_received);
    $dataResult = $crud->read_productByIdClassify($conn, $data_received["gender"],$data_received["id_classify"]);
    if (count($dataResult) > 0) {
        $response = [
            "success" => true,
            "data" => $dataResult,
        ];
    } else {
        $response = [
            "success" => false,
            "error" => "No data found",
            "data received" => $data_received
        ];
    }
    echo json_encode($response);
?>