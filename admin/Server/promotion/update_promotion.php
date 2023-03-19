<?php
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        try {
            require_once('../../../init.php');
            $conn->beginTransaction();
            $query_update_promotion = "
            UPDATE promotion
            SET 
            name = :name,
            image = :image,
            content = :content,
            discount_price = :discount_price,
            discount_percent =  :discount_percent,
            begin_date = :begin_date,
            finish_date = :finish_date,
            id_status = :id_status  
            WHERE id = :id
            ";
            $query_update_detail_promotion = "
            INSERT INTO detail_promotion
            VALUES (
            :id_promotion,
            :id_product)
            ";
            $query_delete_detail_promotion = "
            DELETE detail_promotion
            WHERE 
            id_promotion = :id_promotion and
            id_product = :id_product)
            ";
            $stmt = $conn->prepare($query_update_promotion);
            if ($stmt->execute($_POST["promotion"])) {
                $stmt = $conn->prepare($query_update_detail_promotion);
                if ($stmt->execute($_POST["update_detail_promotion"])) {
                    $stmt = $conn->prepare($query_update_detail_promotion);
                    if ($stmt->execute($_POST["delete_detail_promotion"])) {
                        echo 'Đã sửa khuyến mãi thành công';
                        $conn->commit();
                    }
                    else {
                        echo 'Lỗi xóa sản phẩm ra khỏi khuyến mãi';
                        $conn->rollBack();
                    }
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