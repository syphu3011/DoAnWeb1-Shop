<?php
    require_once('../../../init.php');
    require_once('../same_function.php');
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $id_user = $_POST['id_user'];
        $password_user = $_POST['password'];
        try {
            if (check_privilege($id_user, $password_user, $conn, 'xem', 'product')) {
                //Sản phẩm
                $sql = "SELECT product.id, product.name, input_country.name made_in, description, idstatus, GROUP_CONCAT(DISTINCT classify.name SEPARATOR ', ') clasify,GROUP_CONCAT(DISTINCT link_image SEPARATOR ',') images, MIN(price) price 
                FROM product 
                left join image_product on product.id = image_product.id_product 
                left join product_list_classify on product.id = product_list_classify.id_product 
                left join classify on product_list_classify.id_classify = classify.id
                left join product_list on product.id = product_list.id_product 
                left join input_country on product.madein = input_country.id
                where product.idstatus = 'TT01'
                group by product.id
                ";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Chuyển chuỗi các link ảnh và loại sản phẩm thành mảng
                foreach ($products as $product) {
                    $product['images'] = explode(', ', $product['images']);
                    $product['clasify'] = explode(', ', $product['clasify']);
                    
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
                }//Xuất xứ
                $sql_made_in = "SELECT id, name FROM input_country";
                $stmt = $conn->prepare($sql_made_in);
                $stmt->execute();
                $made_in = $stmt->fetchAll(PDO::FETCH_ASSOC);
                //Kích thước
                $sql_size = "SELECT id, name FROM input_country";
                $stmt = $conn->prepare($sql_made_in);
                $stmt->execute();
                $made_in = $stmt->fetchAll(PDO::FETCH_ASSOC);
                //tạo json 
                $result = array('product' => $products, 'prodInStock' => $prodInStock, 'largeClassify' => $big_classify, 'input_country' => $made_in);
                //Chuyển kết quả thành JSON và xuất ra
                $json = json_encode($result, JSON_UNESCAPED_UNICODE);
                header('Content-Type: application/json; charset=utf-8');
                echo $json;
            }
        }
        catch(Exception $e) {
            echo "Đã có lỗi xảy ra!";

        }
    }
?>