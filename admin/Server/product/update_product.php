<?php
     require_once("../../../init.php");
     require_once('./same_function_product.php');
     require_once('../same_function.php');
    function update_product($conn, $action) {
        try {
            // bắt đầu phiên
            $conn -> beginTransaction();
            $name = $_POST["product"]["name"];
            $id = $_POST["product"]["id"];
            $made_in = $_POST["product"]["made_in"];
            $description = $_POST["product"]["description"];
            $status = $_POST["product"]["status"];
            // Kiểm tra quyền
            $username = $_POST["user"]["username"];
            if (!check_name($conn, $name, $id)) {
                die("Tên không được trùng lặp với các sản phẩm khác!");
            }
            if (check_privilege($username, $conn, $action,'product')) {
                // hoàn tất giao dịch
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
                    $json_response = ["Trạng thái" => "thành công", "Thông báo" => "Dữ liệu đã được sửa"];
                    echo json_encode($json_response);
                }
                else {
                    $json_response = ["Trạng thái" => "không thành công", "Thông báo" => "Dữ liệu không được sửa"];
                    $conn -> rollBack();
                    die(json_encode($json_response));
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
            $json_response = ["Trạng thái" => "không thành công", "Thông báo" => "Dữ liệu không được sửa", "Lỗi người phát triển" => $e];
            die(json_encode($json_response));
        }
    }
    if ($_SERVER('REQUEST_METHOD') === 'PUT') {
        update_product($conn,'sua');
    }
    else if ($_SERVER('REQUEST_METHOD') === 'DELETE') {
        update_product($conn,'xoa');
    }
?>