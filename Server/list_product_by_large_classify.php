<?php
    require_once("../init.php");
    require_once("CRUD.php");
    $data_received = json_decode(file_get_contents("php://input"), true);
    $crud = new CRUD();
    
    $dataResult["product"] = $crud->read_productByIdLarge_classify(
        $conn, 
        $data_received["id_large_classify"]
    );
    
    if (count($dataResult["product"]) > 0) { // Fixed the condition to check count of "product" array inside the $dataResult array 
        foreach ($dataResult["product"] as &$product) { // Added a reference (&) to modify the original value of $product inside the loop
            $product["promotion"] = $crud->read_data_promotionById($conn, $product["id_product"]);
        }
        
        $response = [
            "success" => true,
            "data" => $dataResult,
        ];
    } else {
        $response = [
            "success" => false,
            "error" => "No data found",
            "data received" => $data_received
        ];
    }
    
    echo json_encode($response);
?>
