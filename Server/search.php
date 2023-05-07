<?php
require_once "../init.php";
require_once "CRUD.php";
// echo file_get_contents("php://input");
// $data_received = implode('&',file_get_contents('php://input'));
$data_received = json_decode(file_get_contents("php://input"), true);
// echo '          ';
// echo $data_received . 'dfg';
$crud = new CRUD();

$min_price = $data_received["min_price"];
$max_price = $data_received["max_price"];
$type_value = $data_received["type_value"];
$sale_value = $data_received["sale_value"];
$key_search = $data_received["key_search"];
$total_product_on_page = $data_received["total_product_on_page"];
$current_page = $data_received["current_page"];
// echo $current_page;
$begin = ($current_page - 1) * $total_product_on_page;
// echo `xx/xxxxxxxx`;
// $response = array(
//         'success' => false,
//         'result' => 'No data found',
//         'data received' => $data_received
//     );
//     echo json_decode($response);
$data_result = $crud->read_data_advanced_search(
    $conn,
    $type_value,
    $sale_value,
    $key_search,
    $min_price,
    $max_price,
    $begin,
    $total_product_on_page
);
// $data_result = $crud->read_data_advanced_search(
//     $conn,
//     'Tất cả',
//     'Giảm 25%',
//     'mi',
//     0,
//     10000000,
//     0,
//     12
// );
if (count($data_result) > 0) {
    $response = [
        "success" => true,
        "result" => $data_result,
        "data received" => $data_received,
        "total_product" => $crud->read_data_advanced_search_pagination(
            $conn,
            $type_value,
            $sale_value,
            $key_search,
            $min_price,
            $max_price
        ),
    ];
} else {
    $response = [
        "success" => false,
        "result" => "No data found",
        "data received" => $data_received,
    ];
}
//  $response = array(
//         'success' => false,
//         'result' => 'No data found',
//         'data ' =>
//         $data_result

//     );
// echo $data_result;
echo json_encode($response);
?>



