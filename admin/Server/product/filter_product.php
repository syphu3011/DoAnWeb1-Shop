<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            require_once("../../../init.php");
            $query = "SELECT id, name, madein as made_in, description, idstatus, GROUP_CONCAT(DISTINCT id_classify SEPARATOR ',') clasify,GROUP_CONCAT(DISTINCT link_image SEPARATOR ',') images, MIN(price) price
                FROM product 
                left join image_product on id = image_product.id_product 
                left join product_list_classify on id = product_list_classify.id_product 
                left join product_list on id = product_list.id_product 
                where product_list.price >= :min_price and product_list.price <= :max_price and product.madein = :made_in and product.id LIKE :id and product.name LIKE :name and id_status = :id_status
                group by id
            ";
            $stmt = $conn->prepare($query);
            $id = '%'.$_POST['id'].'%';
            $name = '%'.$_POST['name'].'%';
            $stmt -> bindParam(':id',$id);
            $stmt -> bindParam(':name', $name);
            $stmt -> bindParam(':made_in', $_POST['made_in']);
            $stmt -> bindParam(':min_price', $_POST['min_price']);
            $stmt -> bindParam(':max_price', $_POST['max_price']);
            $stmt -> bindParam(':id_status', $_POST['id_status']);
            if ($stmt -> execute()) {
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Chuyển chuỗi các link ảnh và loại sản phẩm thành mảng
                foreach ($products as $product) {
                    $product['images'] = explode(',', $product['images']);
                    $product['clasify'] = explode(',', $product['clasify']);
                }
                $return_array = array_filter($products, function($product) {
                    if (is_array($_POST['clasify'])) {
                        foreach ($_POST['clasify'] as $classify) {
                            if (is_array($product['clasify'])) {
                                if (in_array($classify,$product['clasify'])) {
                                    return true;
                                }
                            }
                            else {
                                if ($classify === $product['clasify']) {
                                    return true;
                                }
                            }
                        }
                    }
                    else {
                        if (in_array($_POST['clasify'],$product['clasify'])) {
                            return true;
                        }
                    }
                    return false;
                });
                $result = array('product' => $return_array);
                $json = json_encode($result, JSON_UNESCAPED_UNICODE);
                header('Content-Type: application/json; charset=utf-8');
                echo $json;
            }
            else {
                echo 'Tìm kiếm thất bại';
            }
        }
        catch (Error $e) {
            echo 'Tìm kiếm thất bại';
        }
    }
?>