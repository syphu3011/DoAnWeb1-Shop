<?php
    if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            $id_user = $_POST["id_user"];
            $password_user = $_POST["password"];
            $conn -> beginTransaction();
            if (check_privilege($id_user, $password_user, $conn, 'sua','product')) {

                $query = "
                UPDATE product_list
                SET price = :price
                WHERE 
                id_product = :id_product and 
                id_size = :id_size and 
                id_color = :id_color
                ";
                $stmt = $conn -> prepare($query);
                $price = $_POST["price"];
                $id_product = $_POST["id_product"];
                $id_size = $_POST["id_size"];
                $id_color = $_POST["id_color"];
                $stmt -> bindParam(":id_product", $id_product);
                $stmt -> bindParam(":price", $price);
                $stmt -> bindParam(":id_size", $id_size);
                $stmt -> bindParam(":id_color", $id_color);
                if ($stmt -> execute()) {
                    echo 'Cập nhật giá thành công !';
                    $conn -> commit();
                }
            }
        }
        catch(Exception $e) {
            echo "Không thể lấy danh sách mặt hàng!";
            $conn -> rollBack();
        }
    }
?>