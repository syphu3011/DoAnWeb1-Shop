<?php 
require_once("../../../init.php");
require_once("../same_function.php");
require_once("./same_function_classify.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_user = $_POST['id_user'];
    $password_user = $_POST['password'];
    $id = $_POST['id'];
    $name = $_POST['name'];
    $gender = $_POST['gender'];
    $big_classify = $_POST['id_big_classify'];
    try {
        if (check_privilege($id_user, $password_user, $conn, 'xem','product')) {
            if (check_id($conn, $id)) {
                if (check_name($conn, $name)) {
                    $conn -> beginTransaction();
                    $query = 'UPDATE classify SET id = :id, name = :name, id_big_classify = :id_big_classify, gender = :gender)';
                    $stmt = $conn -> prepare($query);
                    $stmt -> bindParam(':id', $id);
                    $stmt -> bindParam(':name', $name);
                    $stmt -> bindParam(':id_big_classify', $big_classify);
                    $stmt -> bindParam(':gender', $gender);
                    if ($stmt -> execute()) {
                        echo 'Dữ liệu đã được thay đổi!';
                        $conn -> commit();
                    }
                }
                else {
                    die('Tên không được trùng lặp');
                }
            }
            else {
                die('ID không được trùng lặp');
            }
        }
    }
    catch (Exception $e) {
        echo 'Đã có lỗi xảy ra!';
    }
}
?>