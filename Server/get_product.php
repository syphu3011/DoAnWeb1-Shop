<?php
// require_once('../init.php');
// require_once('CRUD.php');
// $crud = new CRUD;
// $data_received=json_decode(file_get_contents('php://input'), true);
// // $product=$crud->read_product_listByProductId($conn, $data_received['id_product']);
// if (count($crud->read_product_listByProductId($conn, $data_received['id_product']))>0){
//     $response=array(
//         'success' => true,
//         'data'  => $crud->read_product_listByProductId($conn, $data_received['id_product'])
//     );

// }else{
//     $response= array(
//         'success'=>false,
//         'data_received'=>$data_received
//     );
// }
// echo $response;

    // $idproduct=$_POST['id_product'];
    require_once("../init.php");
    require_once("CRUD.php");
    // try {
    //     # code...
    // } catch (\Throwable $e) {
    //     # code...
    // }
    $data_send = json_decode(file_get_contents('php://input'), true);
    // $idproduct = "AO00000001";
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
        $product["promotion"]=$result->read_data_promotionById($conn, $idproduct);
    }

    $response = array(
        'success' => $status,
        'data'=>$product
    );

    echo json_encode($response);

?>