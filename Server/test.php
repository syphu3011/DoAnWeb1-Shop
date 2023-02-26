<?php
    require_once('../init.php');
    // echo pathinfo("../init.php");
    // // $db = Database::getInstance();
    // // $conn = $db->getConnection();
    // echo "vãi";
    // $host = "localhost";
    // $dbname = "Shop";
    // $user = "root";
    // $pass = "";

    // $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $sql = "SELECT id, name, madein made_in, description, idstatus, GROUP_CONCAT(id_classify SEPARATOR ',') classify,GROUP_CONCAT(link_image SEPARATOR ',') images, MIN(price) price FROM product, image_product, product_list_classify, product_list WHERE id = image_product.id_product and id = product_list_classify.id_product and id = product_list.id_product group by id";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Chuyển chuỗi các link ảnh thành mảng
    foreach ($products as &$product) {
        $product['images'] = explode(',', $product['images']);
    }
    //Chuyển kết quả thành JSON và xuất ra
    $json = json_encode($products, JSON_UNESCAPED_UNICODE);
    header('Content-Type: application/json; charset=utf-8');
    echo $json;
?>