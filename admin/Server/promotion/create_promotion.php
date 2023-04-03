<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require_once('../../../init.php');
        require_once('../same_function.php');
        $username = $_POST["user"]["username"];
        if (check_privilege($username,$conn,'them','promotion')) {
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
                $data_promotion = $_POST["promotion"];
                $stmt->bindParam(':id', $data_promotion['id']);
                $stmt->bindParam(':name', $data_promotion['name']);
                $stmt->bindParam(':image', $data_promotion['image']);
                $stmt->bindParam(':content', $data_promotion['content']);
                $stmt->bindParam(':discount_price', $data_promotion['discount_price']);
                $stmt->bindParam(':discount_percent', $data_promotion['discount_percent']);
                $stmt->bindParam(':begin_date', $data_promotion['begin_date']);
                $stmt->bindParam(':finish_date', $data_promotion['finish_date']);
                $stmt->bindParam(':id_status', $data_promotion['id_status']);
                if ($stmt->execute()) {
                    $stmt = $conn->prepare($query_insert_detail_promotion);
                    $data_detail_promotion = $_POST["detail_promotion"];
                    $stmt->bindParam(':id_promotion', $data_detail_promotion['id_promotion']);
                    $stmt->bindParam(':id_product', $data_detail_promotion['id_product']);
                    if ($stmt->execute()) {
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
        else {
            die("Bạn không được cấp quyền!");
        }
    }
?>