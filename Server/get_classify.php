<?php
require_once("../init.php");
require_once("CRUD.php");
$data_request = json_decode(file_get_contents("php://input"),true);
$crud = new CRUD();
if (count($crud -> read_data_classify($conn))>0){
    $response = array(
        "success" => true,
        "data" => $crud -> read_data_classify($conn)
    );
}else{
    $response = array(
        "success" => false,
        "message" => "Lỗi khi kết nối server"
    );
}
echo json_encode($response);
?>