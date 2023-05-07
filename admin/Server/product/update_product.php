<?php
     require_once("../../../init.php");
     require_once('./same_function_product.php');
     require_once('../same_function.php');
    function update_product($conn, $action) {
        try {
            // bắt đầu phiên
            $conn -> beginTransaction();
            $name = $_POST["name"];
            $id = $_POST["id"];
            $made_in = $_POST["made_in"];
            $description = $_POST["description"];
            $status = $_POST["status"];
            // Kiểm tra quyền
            $username = $_POST["id_user"];
            if (check_privilege($username, $conn, $action,'product')) {
                if (!check_name($conn, $name, $id)) {
                    die("Tên không được trùng lặp với các sản phẩm khác!");
                }
                // Kiểm tra xuất xứ
                check_input_country($conn, $made_in);
                // thiết lập query
                $query = "UPDATE product 
                SET name = :name, madein = :made_in, description = :description, idstatus = :idstatus
                WHERE id = :id";
                $stmt = $conn -> prepare($query);
                // thiết lập các biến prepare
                $stmt -> bindParam(":name", $name);
                $stmt -> bindParam(":made_in", $made_in);
                $stmt -> bindParam(":description", $description);
                $stmt -> bindParam(":idstatus", $status);
                // thực thi query
                if ($stmt -> execute()) {
                    echo 'Dữ liệu đã được thay đổi!';
                }
                else {
                    $conn -> rollBack();
                    die('Có lỗi xảy ra! Dữ liệu chưa được thay đổi!');
                }
                $conn -> commit();
            }
            else {
                echo 'Bạn chưa được cấp quyền!';
                $conn -> rollBack();
            }
        }
        catch (Exception $e) {
            //giao dịch thất bại, rollback
            $conn -> rollBack();
            die('Có lỗi trong quá trình thay đổi dữ liệu!');
        }
    }
    if ($_SERVER('REQUEST_METHOD') === 'PUT') {
        update_product($conn,'sua');
    }
    else if ($_SERVER('REQUEST_METHOD') === 'DELETE') {
        update_product($conn,'xoa');
    }
?>