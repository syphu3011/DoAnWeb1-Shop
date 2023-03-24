<?php
    //lấy dữ liệu từ biểu mẫu
    $idproduct=$_POST['id_product'];
    //trạng thái
    $status_product=false;
    //Lấy dữ liệu từ Database
    require_once("../init.php");
    //id, name, madein, description, idstatus
    $sql="SELECT *  FROM product WHERE id= '$idproduct'";
    $stmt=$conn->prepare($sql);
    $stmt->execute();
    $product["product"]=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($stmt->rowCount()>0){
        $stmt=null;
        $status=true;
        $id_country=$product["product"][0]["madein"];
        //link_image, name_image
        $sql="SELECT link_image, name_image  FROM image_product WHERE id_product= '$idproduct'";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        $product["image_product"]=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt=null;
        //name
        $sql="SELECT ic.name  FROM input_country ic WHERE id= '$id_country'";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        $product["madein_product"]=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt=null;
        //id_size, price,id_color
        $sql="SELECT id_size, price,id_color FROM product_list WHERE id_product= '$idproduct'";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        $product["attribute_product"]=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt=null;
    }
    // $response;
    $response = array(
            'success' => $status,
            'data'=>$product
        );
    echo json_encode($response);
?>