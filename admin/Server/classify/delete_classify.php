<?php 
require_once("../../../init.php");
require_once("../same_function.php");
require_once("./same_function_classify.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_user = $_POST['id_user'];
    $password_user = $_POST['password'];
    $id = $_POST['id'];
    try {
        if (check_privilege($id_user, $password_user, $conn, 'xem','product')) {
            $conn -> beginTransaction();
            $query = 'DELETE FROM classify WHERE id = :id';
            $stmt = $conn -> prepare($query);
            $stmt -> bindParam(':id', $id);
            if ($stmt -> execute()) {
                echo 'Xóa loại thành công!';
                $conn -> commit();
            }
        }
    }
    catch (Exception $e) {
        echo 'Đã có lỗi xảy ra!';
    }
}
?>