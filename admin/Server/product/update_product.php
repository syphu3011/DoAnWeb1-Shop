<?php
    if ($_SERVER('REQUEST_METHOD') === 'PUT') {
        require_once("../../../init.php");
        require_once('./same_function_product.php');
        try {
            // bắt đầu phiên
            $conn -> beginTransaction();
            // Kiểm tra tên
            if (!check_name($conn, $_POST["name"], $_POST["id"])) {
                die("Tên không được trùng lặp với các sản phẩm khác!");
            };
            check_input_country($conn, $_POST["made_in"]);
            // thiết lập query
            $query = "UPDATE product 
            SET name = :name, madein = :made_in, description = :description, idstatus = :idstatus
            WHERE id = :id";
            $stmt = $conn -> prepare($query);
            // thiết lập các biến prepare
            $stmt -> bindParam(":name", $_POST["name"]);
            $stmt -> bindParam(":made_in", $_POST["made_in"]);
            $stmt -> bindParam(":description", $_POST["description"]);
            $stmt -> bindParam(":idstatus", $_POST["status"]);
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
            // hoàn tất giao dịch
            $conn -> commit();
        }
        catch (Exception $e) {
            //giao dịch thất bại, rollback
            $conn -> rollBack();
            $json_response = ["Trạng thái" => "không thành công", "Thông báo" => "Dữ liệu không được sửa", "Lỗi người phát triển" => $e];
            die(json_encode($json_response));
        }
    }
?>