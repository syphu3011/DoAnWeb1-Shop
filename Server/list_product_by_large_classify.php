<?php
require_once "../init.php";
require_once "CRUD.php";
// echo file_get_contents("php://input");
$data_received = json_decode(file_get_contents("php://input"), true);
$crud = new CRUD();
// echo $data_received;
$data_result = $crud->read_productByIdLarge_classify(
    $conn,
    $data_received["id_large_classify"],
    ($data_received["current_page"] - 1 ) * $data_received["total_product_on_page"],
    $data_received["total_product_on_page"]
);

if (count($data_result) > 0) {
    $response = [
        "success" => true,
        "result" => $data_result,
        "data received" => $data_received,
        "total_product" => $crud -> read_productByIdLarge_classify_pagination($conn, $data_received["id_large_classify"])
    ];
} else {
    $response = [
        "success" => false,
        "result" => "No data found",
        "data received" => $data_received,
    ];
}
echo json_encode($response);
?>
