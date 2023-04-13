<?php
    //Request từ server
    require_once("../init.php");
    //
    require_once("CRUD.php");
    // Kiểm tra nếu người dùng đã gửi dữ liệu POST
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Lấy dữ liệu từ biểu mẫu
        $username_form = trim($_POST['username']);
        $password_form = trim($_POST['password']);
        // Kiểm tra nếu username và password được gửi lên
        if (!empty($username_form) && !empty($password_form)) {
            //Trang thai kiem tra tai khoan
            $status = false;
            //Lấy dữ liệu từ Database
            $rs_account = new CRUD();
            //Tai khoan
            $data["account"] = $rs_account->read_data_account($conn, $username_form, $password_form, $status);
            $id_user=$data["account"]["id_user"];
            $is_user=$data["account"]["privilege"];
            //Tai khoan dang nhap la tai khoan khach hang
            if ($is_user=="customer"){
                $data["customer"] = $rs_account->read_data_customer($conn, $id_user);
            }else{//Tai khoan dang nhap la tai khoan admin
                $data["staff"] = $rs_account->read_data_staff($conn, $id_user);
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