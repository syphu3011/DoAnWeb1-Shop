<?php
require_once("../init.php");
require_once("CRUD.php");
$data_request = json_decode(file_get_contents("php://input"),true);
$crud = new CRUD();
if (count($crud->read_data_promotion($conn))>0){
    $response = array(
        "success" => true,
        "data" => $crud->read_data_promotion($conn)
    );
}else{
    $response = array(
        "success" => false,
        "data received" => $data_request);
}
echo json_encode($response);
?>