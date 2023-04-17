<?php
    require_once('../init.php');
    require_once('CRUD.php');
    $data_send = json_decode(file_get_contents('php://input'), true);
    // $usr = $data_send["username"];
    $result = new CRUD();
    $data = $result -> check_username($conn, $data_send["numberphone"],$data_send["username"]);
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
    // echo json_encode($data_send);
?>