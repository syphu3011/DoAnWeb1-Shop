<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_received = json_decode(file_get_contents('php://input'), true);
    $crud = new CRUD();
    $min_price = $data_received["min_price"];
    $max_price = $data_received["max_price"];
    $type_value = $data_received["type_value"];
    $sale_value = $data_received["sale_value"];
    $key_search=$data_received["key_search"];
    $data_result = $crud -> read_data_advanced_search($conn, $key_search, $type_value, $sale_value, $min_price, $max_price);
    if (count($data_result)>0){
        $respone = array(
            'success' => true,
            'result' => $data_result,
            'data received' => $data_received

        );
    } else {
        $respone = array(
            'success' => false,
            'result' => 'No data found',
            'data received' => $data_received
        );
    }
    //  $respone = array(
    //         'success' => false,
    //         'result' => 'No data found',
    //         'data received' => $data_received
    //     );
    echo json_encode($respone);
?>