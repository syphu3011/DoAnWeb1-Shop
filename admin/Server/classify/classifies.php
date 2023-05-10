<?php 
require_once("../../../init.php");
require_once("../same_function.php");
require_once("../same_function.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_user = $_POST['id_user'];
    $password_user = $_POST['password'];
    try {
        if (check_privilege($id_user, $password_user, $conn, 'xem','product')) {
            $query = 'SELECT * FROM classify WHERE id_big_classify is not null';
            $stmt = $conn -> prepare(($query));
            if ($stmt -> execute()) {
                $response = $stmt -> fetchAll((PDO::FETCH_ASSOC));
                $result = array('clasify' => $response);
                $json = json_encode($result, JSON_UNESCAPED_UNICODE);
                header('Content-Type: application/json; charset=utf-8');
                echo $json;
            }
        }
    }
    catch (Exception $e) {
        echo 'Đã có lỗi xảy ra!';
    }
}
?>