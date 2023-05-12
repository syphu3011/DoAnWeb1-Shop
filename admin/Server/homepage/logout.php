<?php
    if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            $id_user = $_POST["id_user"];
            $query = "UPDATE account
            set `session` = '' 
            where username = :username";
            $stmt = $conn -> prepare($query);
            $stmt -> bindParam(":username", $id_user);
            $stmt -> execute();
        }
        catch(Exception $e) {
            echo "Có lỗi xảy ra!";
        }
    }
?>