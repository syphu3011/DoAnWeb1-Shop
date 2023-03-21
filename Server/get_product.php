<?php
    //lấy dữ liệu từ biểu mẫu
    $idproduct=$_POST['id_product'];
    //trạng thái
    $status_product=false;
    //Lấy dữ liệu từ Database
    require_once("../init.php");
    $sql="SELECT *  FROM product WHERE id= '$idproduct'";
    $stmt=$conn->prepare($sql);
    $stmt->execute();
    $product["product"]=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($stmt->rowCount()>0){
        $status=true;
        $sql="SELECT *  FROM image_product WHERE id_product= '$idproduct'";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        $product["image_product"]=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    $stmt=null;
    // $response;
    $response = array(
            'success' => $status,
            'data'=>$product
        );
    echo json_encode($response);
?>