<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $crud = new CRUD();
    $crud -> 
        delete_product_in_cartById(
            $conn, 
            $data_send["id_customer"], 
            $data_send["id_product"]);
    $respone = [
        "success" => true,
        "data received" => $data_send
    ];
    echo json_encode($respone);
?>