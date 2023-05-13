<?php
require_once "../init.php";
require_once "CRUD.php";
function isValidPhoneNumber($phoneNumber)
{
    $pattern = '/^0\d{9,10}$/';
    return preg_match($pattern, $phoneNumber);
}
function isValidBirthdate($birthdate)
{
    $pattern = '/^\d{2}\/\d{2}\/\d{4}$/'; // or '/^\d{2}\/\d{2}\/\d{2}$/' for mm/dd/yy format
    if (!preg_match($pattern, $birthdate)) {
        return false;
    }
    $dateObj = DateTime::createFromFormat("d/m/Y", $birthdate); // or 'm/d/y' for mm/dd/yy format
    if (!$dateObj) {
        return false;
    }
    return true;
}

// example usage:
// var_dump(isValidBirthdate("13/05/2000")); // bool(true)
// var_dump(isValidBirthdate("05/13/2000")); // bool(false) (for dd/mm/yyyy format)
$crud = new CRUD();
$data_received = json_decode(file_get_contents("php://input"), true);

// Kiểm tra tên được nhập hay không
if ($name == "") {
    $response = [
        "status" => "error",
        "message" => "Vui lòng nhập tên",
        "success" => false,
    ];
}
// Kiểm tra tên đăng nhập được nhập hay không
elseif ($username == "") {
    $response = [
        "status" => "error",
        "message" => "Vui lòng nhập tên đăng nhập",
        "success" => false,
    ];
}
// Kiểm tra số điện thoại được nhập hay không
elseif ($number_phone == "") {
    $response = [
        "status" => "error",
        "message" => "Vui lòng nhập số điện thoại",
        "success" => false,
    ];
}
// Kiểm tra mật khẩu được nhập hay không
elseif ($password == "") {
    $response = [
        "status" => "error",
        "message" => "Vui lòng nhập mật khẩu",
        "success" => false,
    ];
}
// Kiểm tra ngày sinh được nhập hay không
elseif ($birthday == "") {
    $response = [
        "status" => "error",
        "message" => "Vui lòng nhập ngày sinh",
        "success" => false,
    ];
}
// Kiểm tra giới tính được chọn hay không
elseif ($gender == "") {
    $response = [
        "status" => "error",
        "message" => "Vui lòng chọn giới tính",
        "success" => false,
    ];
}
// Nếu tất cả các trường đều được nhập đầy đủ, thực hiện các kiểm tra khác
else {
    // Thực hiện các kiểm tra khác
    $name = $data_received["name"];
    $username = $data_received["user_name"];
    $number_phone = $data_received["number_phone"];
    $password = $data_received["password"];
    $reinput_password = $data_received["reinput_password"];
    $birthday = $data_received["birthday"];
    $gender = $data_received["gender"];
    $address = "";
    $date_created = date("Y-m-d H:i:s");
    $max_id_customer = $crud->read_max_id_customer($conn);
    $privilege = "customer";
    // echo $max_id_customer;
    $number = (int) substr($max_id_customer, 2) + 1;
    $id_customer = "KH" . str_pad($number, 3, "0", STR_PAD_LEFT);
    $max_id_account = $crud->read_max_id_account($conn);
    $number_account = (int) substr($max_id_account, 3) + 1;
    $id_account = "USR" . str_pad($number_account, 3, "0", STR_PAD_LEFT);
    $account_data = [
        "id_user" => $id_account,
        "username" => $username,
        "password" => $password,
        "date_created" => $date_created,
        "privilege" => $privilege,
        "session" => "",
        "status" => "active",
    ];

    $customer_data = [
        "id" => $id_customer,
        "name" => $name,
        "birthday" => $birthday,
        "numberphone" => $number_phone,
        "image" => "",
        "address" => $address,
        "gender" => $gender,
        "id_user" => $id_account,
    ];
    if (count($crud->read_data_account_for_update($conn, $username)) == 0) {
        if (isValidPhoneNumber($number_phone)) {
            if (
                count(
                    $crud->check_number_phone_when_register(
                        $conn,
                        $number_phone
                    )
                ) == 0
            ) {
                if ($password == $reinput_password) {
                    // if (
                    //     count(

                    //         )
                    //     ) > 0
                    // ) {
                    $response = [
                        "success" => true,
                        "message" => "Đăng ký thành công",
                        "value" => $crud->insert_data_to_account_and_customer(
                            $conn,
                            $account_data,
                            $customer_data
                        ),
                    ];
                    // } else {
                    //     $response = [
                    //         "success" => false,
                    //         "message" => "Đăng ký thất bại",
                    //     ];
                    // }
                } else {
                    $response = [
                        "status" => "error",
                        "message" => "Mật khẩu không trùng khớp",
                        "success" => false,
                    ];
                }
            } else {
                $response = [
                    "status" => "error",
                    "message" => "Số điện thoại đã được sử dụng",
                    "success" => false,
                ];
            }
        } else {
            $response = [
                "status" => "error",
                "message" => "Số điện thoại không hợp lệ",
                "success" => false,
            ];
        }
    } else {
        $response = [
            "success" => false,
            "message" => "Tài khoản đã tồn tại",
        ];
    }
    // header("HTTP/1.1 400 Bad Request");
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($response);
}
?>
