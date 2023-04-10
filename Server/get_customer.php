<?php
    require_once("../init.php");

    function get_account($username, $password, &$status) {
        global $conn;
        $sql = "SELECT * FROM `account` WHERE `username` = ? AND `password`= ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$username, $password]);
        $user_account = $stmt->fetch(PDO::FETCH_ASSOC);
        $status = $stmt->rowCount() > 0;
        $stmt = null;
        return $user_account;
    }
    function get_customer($iduser) {
        global $conn;
        $sql = "SELECT * FROM `customer` WHERE `id_user` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$iduser]);
        $customer_account = $stmt->fetch(PDO::FETCH_ASSOC);
        $status = $stmt->rowCount() > 0;
        $stmt = null;
        return $customer_account;
    }
    function get_staff($iduser) {
        global $conn;
        $sql = "SELECT * FROM `staff` WHERE `id_user` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$iduser]);
        $staff_account = $stmt->fetch(PDO::FETCH_ASSOC);
        $status = $stmt->rowCount() > 0;
        $stmt = null;
        return $staff_account;
    }

    // Kiểm tra nếu người dùng đã gửi dữ liệu POST
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Lấy dữ liệu từ biểu mẫu
        $username_form = trim($_POST['username']);
        $password_form = trim($_POST['password']);

        // Kiểm tra nếu username và password được gửi lên
        if (!empty($username_form) && !empty($password_form)) {
            $status = false;
            //Lấy dữ liệu từ Database
            $data["account"] = get_account($username_form, $password_form, $status);
            $id_user=$data["account"]["id"];
            if ($id_user=="customer"){
                $data["customer"] = get_customer($id_user);
            }else{
                $data["staff"] = get_staff($id_user);
            }
            // $response;
            $response = array(
                'success' => $status,
                'data' => $data
            );
            echo json_encode($response);
        } else {
            // Nếu username và password không được gửi lên thì trả về lỗi
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array('error' => 'Username and password are required.'));
        }
    } else {
        // Nếu không phải là phương thức POST thì trả về lỗi
        header("HTTP/1.1 405 Method Not Allowed");
        echo json_encode(array('error' => 'Method Not Allowed.'));
    }

?>