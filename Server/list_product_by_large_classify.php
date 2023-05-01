<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_received = json_decode(file_get_contents("php://input"), true);
    $crud = new CRUD();
    
    $data_result = $crud->read_productByIdLarge_classify(
        $conn, 
        $data_received["id_large_classify"]
    );
    
    if (count($data_result)>0){
        $response = array(
            'success' => true,
            'result' => $data_result,
            'data received' => $data_received

        );
    } else {
        $response = array(
            'success' => false,
            'result' => 'No data found',
            'data received' => $data_received
        );
    }
    echo json_encode($response);
?>
