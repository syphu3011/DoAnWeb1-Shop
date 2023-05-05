<?php
    require_once "../init.php";
    require_once "CRUD.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $idProduct = $data["id_product"];
    $idSize = $data["id_size"];
    $idColor = $data["id_color"];

    $crud = new CRUD();

    $dataResult["product"] = $crud->read_data_product_in_stockById($conn, $idProduct, $idSize, $idColor);
    if (count($dataResult["product"]) > 0) {
        $dataResult["promote"] = $crud->read_data_promotionById($conn,$idProduct);
        $response = [
            "success" => true,
            "data" => $dataResult,
        ];
    } else {
        $response = [
            "success" => false,
            "error" => "No data found",
            "data" => $data
        ];
    }
    echo json_encode($response);
?>