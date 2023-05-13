<?php
    function update_promotion($action) {
        require_once("../../../init.php");
        require_once('./same_function_product.php');
        require_once('../same_function.php');
        $username = $_POST["username"];
        $password = $_POST["password"];
        if (check_privilege($username, $password,$conn,$action,'promotion')) {
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
                    $data_detail_promotion = $_POST["update_detail_promotion"];
                    $stmt = $conn->prepare($query_update_detail_promotion);
                    $stmt->bindParam(':id_promotion', $data_detail_promotion['id_promotion']);
                    $stmt->bindParam(':id_product', $data_detail_promotion['id_product']);
                    if ($stmt->execute()) {
                        $stmt = $conn->prepare($query_delete_detail_promotion);
                        $data_detail_promotion = $_POST["delete_detail_promotion"];
                        $stmt->bindParam(':id_promotion', $data_detail_promotion['id_promotion']);
                        $stmt->bindParam(':id_product', $data_detail_promotion['id_product']);
                        if ($stmt->execute()) {
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
    }
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        update_promotion('sua');
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        update_promotion('xoa');
    }
?>