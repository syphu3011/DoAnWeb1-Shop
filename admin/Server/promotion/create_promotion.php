<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            require_once('../../../init.php');
            $conn->beginTransaction();
            $query_insert_promotion = "
            INSERT INTO promotion
            VALUES (:id,
            :name,
            :image,
            :content,
            :discount_price,
            :discount_percent,
            :begin_date,
            :finish_date,
            :id_status)
            ";
            $query_insert_detail_promotion = "
            INSERT INTO detail_promotion
            VALUES (
            :id_promotion,
            :id_product)
            ";
            $stmt = $conn->prepare($query_insert_promotion);
            if ($stmt->execute($_POST["promotion"])) {
                $stmt = $conn->prepare($query_insert_detail_promotion);
                if ($stmt->execute($_POST["detail_promotion"])) {
                    echo 'Đã thêm khuyến mãi thành công';
                    $conn->commit();
                }
                else {
                    echo 'Lỗi thêm sản phẩm khuyến mãi';
                    $conn->rollBack();
                }
            }
            else {
                echo 'Lỗi thêm khuyến mãi ';
                $conn->rollBack();
            }
        }
        catch (Exception $e) {
            echo 'Đã xảy ra lỗi!';
            $conn->rollBack();
        }
    }
?>