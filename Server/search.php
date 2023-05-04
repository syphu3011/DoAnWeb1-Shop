<?php
    require_once("../init.php");
    require_once("CRUD.php");
    // echo file_get_contents("php://input");
    // $data_received = implode('&',file_get_contents('php://input'));
    $data_received = json_decode(file_get_contents('php://input'), true);
    // echo '          ';
    // echo $data_received . 'dfg';
    $crud = new CRUD();

    $min_price = $data_received["min_price"];
    $max_price = $data_received["max_price"];
    $type_value = $data_received["type_value"];
    $sale_value = $data_received["sale_value"];
    $key_search = $data_received["key_search"];
    $total_product_on_page = $data_received['total_product_on_page'];
    $current_page = $data_received['current_page'];
    // echo $current_page;
    $begin = $current_page+($current_page-1)*$total_product_on_page;
            // echo `xx/xxxxxxxx`;
    // $response = array(
    //         'success' => false,
    //         'result' => 'No data found',
    //         'data received' => $data_received
    //     );
    //     echo json_decode($response);
    $data_result = 
        $crud -> read_data_advanced_search(
            $conn, 
            $key_search, $type_value, $sale_value, 
            $min_price, $max_price,
            $begin,
            $total_product_on_page
        );
    // if (count($data_result)>0){
    //     $response = array(
    //         'success' => true,
    //         'result' => $data_result,
    //         'data received' => $data_received

    //     );
    // } else {
    //     $response = array(
    //         'success' => false,
    //         'result' => 'No data found',
    //         'data received' => $data_received
    //     );
    // }
     $response = array(
            'success' => false,
            'result' => 'No data found',
            'data ' => $data_result
        );
    echo json_encode($response);
?>



