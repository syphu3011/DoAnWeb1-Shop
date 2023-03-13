<?php
    require_once("../init.php");
    $data;
    //
    //Lấy dữ liệu customers
    $stm=$conn->prepare("SELECT * FROM `customer`");
    $stm->execute();
    $customer = $stm->fetchAll(PDO::FETCH_ASSOC);
    $stm=null;
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
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
?>