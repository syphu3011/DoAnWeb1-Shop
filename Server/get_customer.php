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
            // if ($is_user === "customer") {
            //     $data["customer"] = $rs_account->read_data_customer($conn, $id_user);
            // } else {
            //     $data["staff"] = $rs_account->read_data_staff($conn, $id_user);
            // }
            // $response;
            $response = array(
                'success' => $status,
                'data' => $data,
                'message' => "Đã tạo phiên đăng nhập mới"
            );
            // echo json_encode($response);

            $exp = time() + (86400 * 30);
            $token = bin2hex(random_bytes(16));
            // setcookie('login_cookie', base64_encode("$username:$password:$privilege:$exp:$token"), time() + (86400 * 30), '/');
            // ReqHandling::concatSession($conn, "account", "session", $token, "username", $username);
            if ($data['account'] == false) {
                echo json_encode(array('message' => 'Username and password are required.'));
                return;
            }
            $account = $data['account'];
            $id_user_h = $account['id_user'];
            $passw = $account['password'];
            $id_cus = $account['id'];
            $name = $account['name'];
            $numberphone = $account['numberphone'];
            $birthday = $account['birthday'];
            $gender = $account['gender'];
            $image = $account['image'];
            $cookie_string = "$id_user_h?$passw?customer?$id_cus?$name?$numberphone?$birthday?$gender?$image";
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array("message" => "Đăng nhập thành công. Đã tạo phiên đăng nhập mới.", "cookie" => $cookie_string, "success" => true, 'data' => $data,), JSON_UNESCAPED_UNICODE);
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array('error' => 'Username and password are required.'));
        }
    } else {
        header("HTTP/1.1 405 Method Not Allowed");
        echo json_encode(array('error' => 'Method Not Allowed.'));
    }

?>