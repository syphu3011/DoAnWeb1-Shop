<?php
    require_once('../init.php');
    require_once('./CRUDtaikhoan.php');
    $data_send = json_decode(file_get_contents('php://input'), true);
    $usr = $data_send["username"];
    $result = new CRUD();
    $data = $result -> check_username($conn, $usr);
    if (count($data) > 0) {
        $response = array(
            'success' => true,
            'data' => $data
        );
    } else {
        $response = array(
            'success' => false,
            'error' => "No data found."
        );
    }
    echo json_encode($response);
?>