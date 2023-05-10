<?php
    function delete_size($action) {

        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            $id_user = $_POST['id_user'];
            $password_user = $_POST['password'];
            if (check_privilege($id_user, $password_user, $conn, $action,'product')) {
                try {
                    $conn -> beginTransaction();
                    $id = $_POST['id'];
                    $query_delete_size = 'DELETE FROM size WHERE id = :id';
                    $stmt_delete_size = $conn -> prepare($query_delete_size);
                    $stmt_delete_size -> bindParam(":id", $id);
                    $stmt_delete_size -> execute();
                }
                catch (Exception $e) {
                    echo 'Không thể xóa kích cỡ này! Đặt về trạng thái ngưng sử dụng!';
                    $query_delete_size = 'UPDATE size SET id_status WHERE id = :id';
                    $stmt_delete_size = $conn -> prepare($query_delete_size);
                    $status = 'TT13';
                    $stmt_delete_size -> bindParam(":id", $status);
                    $stmt_delete_size -> execute();
                    $conn -> commit();
                }
            }
        }
        catch (Exception $e) {
            echo 'Đã có lỗi xảy ra!';
            
            $conn->rollBack();
        }
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        delete_size('xoa');
    }
?>