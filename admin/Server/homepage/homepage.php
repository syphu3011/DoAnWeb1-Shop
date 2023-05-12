<?php
    if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            $id_user = $_POST["id_user"];
            $password_user = $_POST["password"];
            if (check_privilege($id_user, $password_user, $conn, 'xem','product')) {
                $query = "
                SELECT name 
                FROM account, staff
                WHERE 
                account.id_user = staff.id_user and 
                account.username = :username";
                $stmt = $conn -> prepare($query);
                $stmt -> bindParam(":username", $id_user);
                if ($stmt -> execute()) {
                    $response = $stmt -> fetchAll(PDO::FETCH_ASSOC);
                    $json = json_encode($response, JSON_UNESCAPED_UNICODE);
                    header('Content-Type: application/json; charset=utf-8');
                    echo $json;
                }
            }
        }
        catch(Exception $e) {
            echo "Có lỗi xảy ra!";
        }
    }
?>