<?php
    require_once("../init.php");
    require_once("CRUD.php");
    require_once("../admin/Server/__class__/ReqHandling.php");
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $username_form = trim($_POST['username']);
        $password_form = trim($_POST['password']);
        if (!empty($username_form) && !empty($password_form)) {

            $status = false;
            $rs_account = new CRUD();
            // $data["account"] = 
            //     $rs_account->read_data_account(
            //         $conn, 
            //         $username_form, 
            //         $password_form, 
            //         $status
            //     );
            $data["account"] = 
                $rs_account->read_data_account(
                    $conn, 
                    $username_form, 
                    $password_form, 
                    $status
                );
            $id_user = $data["account"]["id_user"];
            $is_user = $data["account"]["privilege"];
            if ($is_user === "customer") {
                $data["customer"] = $rs_account->read_data_customer($conn, $id_user);
            } else {
                $data["staff"] = $rs_account->read_data_staff($conn, $id_user);
            }
            // $response;
            $response = array(
                'success' => $status,
                'data' => $data,
                'message' => "Đã tạo phiên đăng nhập mới"
            );
            echo json_encode($response);

            $exp = time() + (86400 * 30);
            $token = bin2hex(random_bytes(16));
            setcookie('login_cookie', base64_encode("$username:$password:$privilege:$exp:$token"), time() + (86400 * 30), '/');
            ReqHandling::concatSession($conn, "account", "session", $token, "username", $username);

        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array('error' => 'Username and password are required.'));
        }
    } else {
        header("HTTP/1.1 405 Method Not Allowed");
        echo json_encode(array('error' => 'Method Not Allowed.'));
    }

?>