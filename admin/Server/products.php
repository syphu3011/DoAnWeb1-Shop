<?php
    require_once('../../init.php');
    //Sản phẩm
    $sql = "SELECT id, name, madein made_in, description, idstatus, GROUP_CONCAT(id_classify SEPARATOR ',') clasify,GROUP_CONCAT(link_image SEPARATOR ',') images, MIN(price) price FROM product, image_product, product_list_classify, product_list WHERE id = image_product.id_product and id = product_list_classify.id_product and id = product_list.id_product group by id";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $product = $stmt->fetchAll(PDO::FETCH_ASSOC);
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

    //tạo json 
    $result = array('product' => $product, 'prodInStock' => $prodInStock);
    //Chuyển kết quả thành JSON và xuất ra
    $json = json_encode($result, JSON_UNESCAPED_UNICODE);
    header('Content-Type: application/json; charset=utf-8');
    echo $json;
?>