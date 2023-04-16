<?php
    // $idproduct=$_POST['id_product'];
    require_once("../init.php");
    require_once("CRUD.php");
    $data_send = json_decode(file_get_contents('php://input'), true);
    $idproduct = $data_send["id_product"];
    $result = new CRUD();
    $status = false;

    $product = array(
        "product" => array(),
        "image_product" => array(),
        "madein_product" => array(),
        "attribute_product" => array()
    );

    $product["product"] = $result->read_productById($conn, $idproduct);
    if (count($product["product"]) > 0) {
        $status = true;
        $id_country = $product["product"][0]["madein"];
        $product["image_product"] = $result->read_image_productByProductId($conn, $idproduct);
        $product["madein_product"] = $result->read_input_countryById($conn, $id_country);
        $product["attribute_product"] = $result->read_product_listByProductId($conn, $idproduct);
    }

    $response = array(
        'success' => $status,
        'data'=>$product
    );

    echo json_encode($response);

?>