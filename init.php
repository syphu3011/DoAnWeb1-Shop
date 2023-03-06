<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "shop";

    try {
        $data=array();
        $custonmers=array();
        $largeClassify=array();
        $product=array();
        $conn =  mysqli_connect($servername, $username, $password, $dbname);
            //Lấy data khách hàng
            $result_customers=mysqli_query($conn,"select * from customer");
            if (mysqli_num_rows($result_customers) > 0) {
                // Trả về dữ liệu dưới dạng JSON
                while ($row = mysqli_fetch_assoc($result_customers)){
                    array_push($custonmers,$row);
                }
                $data["customers"]=$custonmers;
            } 
            //Lấy dữ liệu large và mini classify
            //Lấy dữ liệu largeClassify
            $result_largeClassify=mysqli_query($conn,"select id, name from classify where id_big_classify is null");
            if (mysqli_num_rows($result_largeClassify) > 0) {
                // Trả về dữ liệu dưới dạng JSON
                while ($row_largeClassify = mysqli_fetch_assoc($result_largeClassify)){
                    //Lấy dữ liệu miniClassify
                    $miniClassify=array();
                    $result_miniClassify=mysqli_query($conn,"select * from classify where id_big_classify = '".$row_largeClassify["id"]."'");
                    while ($row_miniClassify=mysqli_fetch_assoc($result_miniClassify)){
                        array_push($miniClassify,$row_miniClassify);
                    }
                    // $classiffy=array();
                    // $classiffy["miniClassify"]=$miniClassify;
                    // array_push($classiffy,$row_largeClassify);
                    array_push($largeClassify,$row_largeClassify);
                    $largeClassify["miniClassify"]=$miniClassify;
                }
                $data["largeClassify"]=$largeClassify;
            } 
            $result=mysqli_query($conn,"select * from product");
            if (mysqli_num_rows($result) > 0) {
                // Trả về dữ liệu dưới dạng JSON
                while ($row = mysqli_fetch_assoc($result)){
                    array_push($product,$row);
                }
                $data["product"]=$product;
            } 
        echo json_encode($data);
                header('Content-Type: application/json; charset=utf-8');

    }
    catch(PDOException $e)
    {
        echo "Kết nối thất bại: " . $e->getMessage();
    }
    // mysqli_close($conn);
?>
