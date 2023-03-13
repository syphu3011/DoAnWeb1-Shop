<?php
    require_once('../../../init.php');
    //Sản phẩm
    $sql = "SELECT id, name, madein made_in, description, idstatus, GROUP_CONCAT(DISTINCT id_classify SEPARATOR ',') clasify,GROUP_CONCAT(DISTINCT link_image SEPARATOR ',') images, MIN(price) price 
    FROM product 
    left join image_product on id = image_product.id_product 
    left join product_list_classify on id = product_list_classify.id_product 
    left join product_list on id = product_list.id_product 
    group by id
    
    ";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Chuyển chuỗi các link ảnh và loại sản phẩm thành mảng
    foreach ($products as &$product) {
        $product['images'] = explode(',', $product['images']);
        $product['clasify'] = explode(',', $product['clasify']);
        
    }

    //Sản phẩm trong kho
    $sql_prod_in_stock = "SELECT id_import_coupon idInput, id_product idProd, id_size idSize, amount, price_input price FROM product_in_stock";
    $stmt_prod_in_stock = $conn -> prepare($sql_prod_in_stock);
    $stmt_prod_in_stock->execute();
    $prodInStock = $stmt_prod_in_stock->fetchAll(PDO::FETCH_ASSOC);

    //Loại lớn
    $sql_big_classify = "SELECT id, name FROM classify WHERE id_big_classify is null";
    $stmt = $conn->prepare($sql_big_classify);
    $stmt->execute();
    $big_classify = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //Loại nhỏ
    foreach ($big_classify as &$value) {
        $value_id = $value["id"];
        $sql_mini_classify = "SELECT id, name FROM classify WHERE id_big_classify = '".$value_id."'";
        // echo $sql_mini_classify;
        $stmt_mini_classify = $conn -> prepare($sql_mini_classify);
        $stmt_mini_classify->execute();
        $mini_classify = $stmt_mini_classify->fetchAll(PDO::FETCH_ASSOC);
        $value['miniClassify'] = $mini_classify;
    }
    //tạo json 
    $result = array(
        'product' => $products, 
        'prodInStock' => $prodInStock, 
        'largeClassify' => $big_classify
    );
    //Chuyển kết quả thành JSON và xuất ra
    $json = json_encode($result, JSON_UNESCAPED_UNICODE);
    header('Content-Type: application/json; charset=utf-8');
    echo $json;
?>