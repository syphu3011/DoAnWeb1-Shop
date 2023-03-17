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
            $query_product_in_stock = "
            INSERT INTO `product_in_stock`(`id_import_coupon`, `id_product`, `id_size`, `id_color`, `amount`, `price_input`)
            VALUES (:idInput,:idProd,:idSize,:idColor,:amount,:price)
            ";
            // Xử lý thêm phiếu nhập
            $stmt = $conn->prepare($query_import_coupon);
            $stmt->execute($_POST['InputProduct']);
            // Xử lý thêm chi tiết
            $stmt = $conn->prepare($query_import_detail);
            foreach($_POST['Stuff'] as $import_product) {
                $stmt->execute($import_product);
            }
            // Xử lý thêm hàng vào kho
            $stmt = $conn->prepare($query_product_in_stock);
            foreach($_POST['ProdInStock'] as $prod_in_stock) {
                $stmt->execute($prod_in_stock);
            }
            echo 'Đã nhập hàng thành công! Mã nhập hàng là '.$_POST['InputProduct']['id'];
            $conn->commit();
        } catch (Exception $e) {
            $conn->rollBack();
            die('Không thể hoàn thành nhập hàng');
        }
        
    }
?>