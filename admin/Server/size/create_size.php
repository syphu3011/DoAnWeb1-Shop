<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require_once('../../../init.php');
        require_once('../same_function.php');
        $username = $_POST["user"]["username"];
        if (check_privilege($username,$conn,'them','size')) {
            try {
                require_once('../../../init.php');
                $conn->beginTransaction();
                $query_insert_size = "
                INSERT INTO `size`(`id`, `breast`, `waist`, `butt`, `foot`, `hand`, `thigh`, `back`, `id_status`)
                VALUES (
                :id,
                :breast,
                :waist,
                :butt, 
                :foot, 
                :hand, 
                :thigh, 
                :back,
                :id_status)
                ";
                $stmt = $conn->prepare($query_insert_size);
                $data_size = $_POST["size"];
                $stmt->bindParam(':id', $data_size['id']);
                $stmt->bindParam(':breast', $data_size['breast']);
                $stmt->bindParam(':waist', $data_size['waist']);
                $stmt->bindParam(':butt', $data_size['butt']);
                $stmt->bindParam(':foot', $data_size['foot']);
                $stmt->bindParam(':hand', $data_size['hand']);
                $stmt->bindParam(':thigh', $data_size['thigh']);
                $stmt->bindParam(':back', $data_size['back']);
                $stmt->bindParam(':id_status', 'TT12');
                if ($stmt->execute()) {
                    echo 'Đã thêm kích thước thành công';
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
    }
?>