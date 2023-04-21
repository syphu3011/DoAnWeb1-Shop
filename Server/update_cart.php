<?php
    require_once('../init.php');
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $crud = new CRUD();
    $status=$crud->update_cartById($conn, $data_send["id_customer"], $data_send["product_in_cart"]);
    $response = [
        "success" => true,
        "status" => $status
    ];
    echo json_encode($response);
?>
