<?php
    
    require_once("../init.php");
    //Lấy dữ liệu
    $idproduct=$_POST['id_product'];
    $idsize=$_POST['id_size'];
    $idcolor=$_POST['id_color'];
    
    //trạng thái
    $status=false;
    // //
    $sql="SELECT pis.amount, pis.price_input FROM product_in_stock pis 
        where id_product='$idproduct' and
         id_size='$idsize' and
         id_color='$idcolor'";
    $stmt=$conn->prepare($sql);
    $stmt->execute();
    if ($stmt->rowCount()>0){
        $status=true;
        $product_instock=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt=null;
    }
    // respone data
    $response = array(
            'success' => $status,
            'data'=>$product_instock
        );
    echo json_encode($response);
?>