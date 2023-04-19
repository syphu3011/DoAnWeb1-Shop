<?php
require_once('../init.php');
require_once("CRUD.php");
$data_send = json_decode(file_get_contents('php://input'), true);
$crud = new CRUD();
$dataResult["product"] = $crud->read_data_cartById($conn, $data_send["idkh"]);
if (count($dataResult["product"]) > 0) {
    $temp = array();

    foreach ($dataResult["product"] as $value) {
        array_push($temp, $crud->read_product_listByProductId($conn, $value["id_product"]));
    }
    $dataResult["att"] = $temp;
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
