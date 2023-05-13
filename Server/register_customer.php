<?php
require_once('../init.php');
require_once('CRUD.php');
function isValidPhoneNumber($phoneNumber) {
  $pattern = '/^0\d{9,10}$/';
  return preg_match($pattern, $phoneNumber);
}
function isValidBirthdate($birthdate) {
  $pattern = '/^\d{2}\/\d{2}\/\d{4}$/'; // or '/^\d{2}\/\d{2}\/\d{2}$/' for mm/dd/yy format
  if (!preg_match($pattern, $birthdate)) {
    return false;
  }
  $dateObj = DateTime::createFromFormat('d/m/Y', $birthdate); // or 'm/d/y' for mm/dd/yy format
  if (!$dateObj) {
    return false;
  }
  return true;
}

// example usage:
var_dump(isValidBirthdate('13/05/2000')); // bool(true)
var_dump(isValidBirthdate('05/13/2000')); // bool(false) (for dd/mm/yyyy format)
$crud = new CRUD();
$data_received = json_decode(file_get_contents('php://input'),true);
$name = "Minh Thao";
$username = "minhthao0";
$number_phone = "0395932376";
$password = "minhthao";
$reinput_password = "minhthao";
$birthday = "2002-06-29 00:00:00";
$gender = "Nam";
$address = "Q5";
$date_created = date('Y-m-d H:i:s');
$max_id_customer = $crud -> read_max_id_customer($conn);
$privilege = "customer";
// echo $max_id_customer;
$number = ((int)substr($max_id_customer,2)+1);
$id_customer = "KH".str_pad($number, 3, "0", STR_PAD_LEFT);
$max_id_account = $crud -> read_max_id_account($conn);
$number_account = ((int)substr($max_id_account,3)+1);
$id_account = "USR".str_pad($number_account, 3, "0", STR_PAD_LEFT);
$account_data = [
    'id_user' => $id_account,
    'username' => $username,
    'password' => $password,
    'date_created' => $date_created,
    'privilege' => $privilege,
    'session' => '',
    'status' => 'active'
];

$customer_data = [
    'id' => $id_customer,
    'name' => $name,
    'birthday' => $birthday,
    'numberphone' => $number_phone,
    'image' => '',
    'address' => $address,
    'gender' => $gender,
    'id_user' => $id_account
];
if (count($crud->read_data_account_for_update($conn, $username))<1){
    if (isValidPhoneNumber($number_phone)){
        if (count($crud->check_number_phone_when_register($conn, $number_phone))<1){
            // check same password
            if ($password == $reinput_password){
                // echo $id_account;
                // if (count($crud->insert_data_to_account($conn, $id_account, $username, sha256($password), $date_created, $privilege,"", "active"))>0){
                    if (count(
                            $crud->insert_data_to_account_and_customer($conn, $account_data, $customer_data))>0){
                        $response = array(
                            "success" => true,
                            "message" => "Đăng ký thành công"
                        );
                    // }else{
                    //     $response = array(
                    //         "success" => false,
                    //         "message" => "Đăng ký thất bại - customer"
                    //     );
                    // }
                } else {
                    $response = array(
                            "success" => false,
                            "message" => "Đăng ký thất bại"
                        );
                }
                // if (count($crud->))
            }else{
                $response = array(
                    'status' => 'error',
                    'message' => 'Mật khẩu không trùng khớp',
                    "success" => false
                );
            }
        } else {
            $response = array(
                "status" => "error",
                "message" => "Số điện thoại đã được sử dụng",
                "success" => false
            );
        }
    }else{
        $response = array(
            'status' => 'error',
            'message' => 'Số điện thoại không hợp lệ',
            'success' => false
        );
    }
}else{
    $response = array(
        'success' => false,
        'message' => 'Tài khoản đã tồn tại'
    );
}
header()
echo json_encode($response);
?>