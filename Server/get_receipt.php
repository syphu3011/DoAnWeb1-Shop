<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $id_customer=$_POST['id_customer'];
    $result = new CRUD();
    $status = false;

    $data["receipt"] = $result -> read_data_receiptById($conn, $id_customer);
    if (count($data["receipt"])>0){
        $status = true;
    }
     $response = array(
        'success' => $status,
        'data'=>$data
    );
    echo json_encode($response);
?>
