<?php
    function update_size($action) {

        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            $username = $_POST["user"]["username"];
            if (check_privilege($username,$conn,$action,'size'))
            $conn->beginTransaction();
            $query_update_size = "
            UPDATE `size`
            SET
            breast = :breast,
            waist = :waist,
            butt = :butt, 
            foot = :foot, 
            hand = :hand, 
            thigh = :thigh, 
            back = :back,
            id_status = :id_status
            WHERE id = :id
            ";
            $stmt = $conn->prepare($query_update_size);
            $data_size = $_POST["size"];
            $stmt->bindParam(':id', $data_size['id']);
            $stmt->bindParam(':breast', $data_size['breast']);
            $stmt->bindParam(':waist', $data_size['waist']);
            $stmt->bindParam(':butt', $data_size['butt']);
            $stmt->bindParam(':foot', $data_size['foot']);
            $stmt->bindParam(':hand', $data_size['hand']);
            $stmt->bindParam(':thigh', $data_size['thigh']);
            $stmt->bindParam(':back', $data_size['back']);
            $stmt->bindParam(':id_status', $data_size['id_status']);
            if ($stmt->execute()) {
                echo 'Đã sửa kích thước thành công';
                $conn->commit();
            }
            else {
                echo 'Lỗi thêm kích thước !';
                $conn->rollBack();
            }
        }
        catch (Exception $e) {
            echo 'Đã xảy ra lỗi!';
            $conn->rollBack();
        }
    }
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        update_size('sua');
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        update_size('xoa');
    }
?>