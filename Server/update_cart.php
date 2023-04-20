<?php
require_once('../init.php');
require_once("CRUD.php");
$data_send = json_decode(file_get_contents('php://input'), true);
$crud = new CRUD();
$crud->update_cartById($conn, $data_send["id_customer"], $data_send["product_in_cart"]);
$response = [
    "success" => true
];
echo json_encode($response);
?>
