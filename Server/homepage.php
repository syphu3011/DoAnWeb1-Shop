<?php
    require_once("../init.php");
    //
    //Lấy dữ liệu loại sản phẩm
    $stm=$conn->prepare("SELECT * FROM `classify` WHERE id_big_classify is NULL");
    $stm->execute();
    $largeClassify = $stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
    $data["customer"]=$customer;
    $classify=array();
    //
    //Loại nhỏ
    foreach ($largeClassify as $value){
        $stm=$conn->prepare("SELECT * FROM `classify` WHERE id_big_classify = '".$value["id"]."'");
        $stm->execute();
        $miniClassify = $stm->fetchAll(PDO::FETCH_ASSOC);
        $value["miniClassify"]=$miniClassify;
        array_push($classify,$value);
        $stm=null;
    }
    $data["largeClassify"]=$classify;
    //
    //Lấy dữ liệu màu
    $stm=$conn->prepare("SELECT * FROM `color`");
    $stm->execute();
    $color=$stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
    $data["color"]=$color;
    //
    //Lấy dữ liệu size
    $stm=$conn->prepare("SELECT * FROM `size`");
    $stm->execute();
    $size=$stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
    $data["size"]=$size;
    //
    //Lấy dữ liệu sản phẩm
    $stm=$conn->prepare("SELECT * FROM `product`");
    $stm->execute();
    $product=$stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
    $data["product"]=$product;
    //
    //Lấy dữ liệu sản phẩm trong kho
    $stm=$conn->prepare("SELECT * FROM `product_in_stock`");
    $stm->execute();
    $product_in_stock=$stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
    $data["product_in_stock"]=$product_in_stock;
    //
    //Lấy dữ liệu khuyến mãi
    $stm=$conn->prepare("SELECT * FROM `promotion`");
    $stm->execute();
    $promotion=$stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
    $data["promotion"]=$promotion;
    //
    //Lấy dữ liệu hoá đơn
    $stm=$conn->prepare("SELECT * FROM `receipt`");
    $stm->execute();
    $receipt=$stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
    $data["receipt"]=$receipt;
    //
    //Lấy dữ liệu hình ảnh sản phẩm
    $stm=$conn->prepare("SELECT * FROM `image_product`");
    $stm->execute();
    $image_product=$stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
    $data["image_product"]=$image_product;
    echo json_encode($data);
?>