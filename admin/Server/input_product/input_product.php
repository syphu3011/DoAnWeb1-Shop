<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            require_once('../../../init.php');
            $conn -> beginTransaction();
            $query_import_coupon = "
            INSERT INTO `import_coupon`(`id`, `date_init`, `id_staff`)
            VALUES (:id,:date_init,:id_staff)";
            $query_import_detail = "
            INSERT INTO `detail_import_coupon`(`id_import_coupon`, `id_product`, `id_size`, `id_color`, `amount`, `price_input`)
            VALUES (:idInput,:idProd,:idSize,:idColor,:amount,:price)
            ";
            $query_insert_product_list = "
            INSERT INTO `product_list`(`id_product`, `id_size`, `id_color`, `price`)
            VALUES (:idProd,:idSize,:idColor,:price)
            ";
            $query_update_product_list = "
            UPDATE `product_list`
            SET price = :price
            WHERE
            id_product = :idProd 
            and id_size = :idSize
            and id_color = :idColor
            ";  
            $query_product_in_stock = "
            INSERT INTO `product_in_stock`(`id_import_coupon`, `id_product`, `id_size`, `id_color`, `amount`, `price_input`)
            VALUES (:idInput,:idProd,:idSize,:idColor,:amount,:price)
            ";
            // Xử lý thêm phiếu nhập
            $stmt = $conn->prepare($query_import_coupon);
            $import_product = $_POST['InputProduct'];
            $date_init = date('Y-m-d H:i:s');
            $stmt->bindParam(':id',$input_product['id']);
            $stmt->bindParam(':date_init', $date_init);
            $stmt->bindParam(':id_staff', $input_product['id_staff']);
            $stmt->execute();
            // Xử lý thêm chi tiết
            $stmt = $conn->prepare($query_import_detail);
            foreach($_POST['Stuff'] as $import_product) {
                // Thêm màu
                if (!check_color($import_product['idColor'], $conn)) {
                    if (!insert_color($import_product['idColor'], $con)) {
                        $conn -> rollBack();
                        die('Lỗi khi thêm màu!');
                    }
                }
                $id_input = $import_product['id'];
                $id_prod = $import_product['idProd'];
                $id_size = $import_product['idSize'];
                $id_color = $import_product['idColor'];
                $amount['amount'];
                $price = $import_product['price'];
                $stmt->bindParam(':idInput', $id_input);
                $stmt->bindParam(':idProd', $id_prod);
                $stmt->bindParam(':idSize', $id_size);
                $stmt->bindParam(':idColor', $id_color);
                $stmt->bindParam(':amount', $amount);
                $stmt->bindParam(':price', $price);
                $stmt->execute();
            }

            // Xử lý thêm hàng vào kho
            $stmt = $conn->prepare($query_product_in_stock);
            foreach($_POST['ProdInStock'] as $prod_in_stock) {
                $stmt->bindParam(':idInput', $prod_in_stock['id']);
                $stmt->bindParam(':idProd', $prod_in_stock['idProd']);
                $stmt->bindParam(':idSize', $prod_in_stock['idSize']);
                $stmt->bindParam(':idColor', $prod_in_stock['idColor']);
                $stmt->bindParam(':amount', $prod_in_stock['amount']);
                $stmt->bindParam(':price', $prod_in_stock['price']);
                $stmt->execute();
            }
            // Xử lý thêm và cập nhật hàng

                // Phân loại
            $array_insert = array();
            $array_update = array();
            $query_check_exist = 
                "SELECT *
                FROM product_list
                WHERE id_product = :idProd 
                and id_size = :idSize 
                and id_color = :idColor";
            $stmt = $conn->prepare($query_check_exist);
            foreach($_POST['ProductList'] as $prod_list) {
                $stmt->bindParam(':idProd', $prod_list['idProd']);
                $stmt->bindParam(':idSize', $prod_list['idSize']);
                $stmt->bindParam(':idColor', $prod_list['idColor']);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    array_push($array_update, $prod_list);
                }
                else {
                    array_push($array_insert, $prod_list);
                }
            }

                //Thêm vào danh sách sản phẩm chưa có
            $stmt = $conn->prepare($query_insert_product_list);
            foreach($array_insert as $prod_list_insert) {
                $stmt->bindParam(':price', $prod_list_insert['price']);
                $stmt->bindParam(':idProd', $prod_list_insert['idProd']);
                $stmt->bindParam(':idSize', $prod_list_insert['idSize']);
                $stmt->bindParam(':idColor', $prod_list_insert['idColor']);
                $stmt->execute();
            }
                //Cập nhật danh sách sản phẩm
            $stmt = $conn->prepare($query_update_product_list);
            foreach($array_update as $prod_list_update) {
                $stmt->bindParam(':price', $prod_list_update['price']);
                $stmt->bindParam(':idProd', $prod_list_update['idProd']);
                $stmt->bindParam(':idSize', $prod_list_update['idSize']);
                $stmt->bindParam(':idColor', $prod_list_update['idColor']);
                $stmt->execute();
            }
            echo 'Đã nhập hàng thành công! Mã nhập hàng là '.$_POST['InputProduct']['id'];
            $conn->commit();
        } catch (Exception $e) {
            $conn->rollBack();
            die('Không thể hoàn thành nhập hàng');
        }
        function check_color($hexColor, $conn) {
            $query_check_color = "
            SELECT *
            FROM color
            WHERE id = :hexColor
            ";
            $stmt_check_color = $conn -> prepare($query_check_color);
            $stmt_check_color -> bindParam(":hexColor", $hexColor);
            if ($stmt_check_color -> execute()) {
                if ($stmt_check_color -> rowCount() > 0) {
                    return true;
                }
                return false;
            }
            return false;
        }
        function insert_color($hexColor, $conn) {
            try {
                $query_insert_color = "
                INSERT INTO `color`(`id`)
                VALUES (:id)
                ";
                $stmt_insert_color = $conn -> prepare($query_insert_color);
                $stmt_insert_color -> bindParam(":id", $hexColor);
                if ($stmt_insert_color -> execute()) {
                    return true;
                }
                return false;
            }
            catch(Exception $e) {
                return false;
            }
        }
    }
?>