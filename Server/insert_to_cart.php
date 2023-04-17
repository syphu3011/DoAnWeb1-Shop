<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $crud = new CRUD();
    $data_result = $crud -> insert_data_to_cartById($conn);
?>