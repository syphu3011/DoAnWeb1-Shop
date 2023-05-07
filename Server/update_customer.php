<?php
require_once("../init.php");
require_once("CRUD.php");
$crud = new CRUD();
$data_received = json_decode(file_get_contents("php://input"), true);
$customer = $data_received["update_customer"];

// $customer = array(
//     'name' => 'Sỹ Phú',
//     'birthday' => '2002-11-30',
//     'numberphone' => '0123456789',
//     'image' => 'http://localhost/doanweb1-shop/Image/avt/User_light@3x.png',
//     'address' => '',
//     'gender' => 'unisex',
//     'id' => 'KH001',
//     'status' => '',
//     'username' => '',
//     'password' => '123123',
//     'lastpassword' => '1',
//     'samepassword' => '123123'
// );
// echo $data_received;
// echo $crud -> check_number_phone_when_update($conn, 'KH001', '0000394142898');
if (($crud -> check_number_phone_when_update($conn, $customer["id"], $customer['numberphone']))>0){
    $response = array (
        "success" => false,
        "Message" => "Số điện thoại này đã tồn tại",
        "Data received" => $data_received
    );
} else {
    if ( $customer["lastpassword"] != "" && $customer["password"] != ""&& $customer["samepassword"] != ""){
        if ($crud -> check_password($conn, $customer) > 0){
            if ($customer["samepassword"] == $customer['password']){
                $response = array (
                    "Change in database" => $crud -> update_customer($conn, $customer),
                    "success" => true,
                    "Message" => "Cập nhật thành công",
                    "Data received" => $data_received
                );
            } else {
                $response = array (
                    "success" => false,
                    "Message" => "Bạn đã nhập 2 mật khẩu không giống nhau",
                    "Data received" => $data_received
                );
            }
        }else {
            $response = array (
                "success" => false,
                "Message" => "Bạn đã nhập sai mật khẩu cũ",
                "Data received" => $data_received
            );
            
        } 
    } else {
        $response = array (
            "Change in database" => $crud -> update_customer($conn, $customer),
            "success" => true,
            "Message" => "Cập nhật thành công",
            "Data received" => $data_received
        );
    }
// echo json_encode($data_received);

//                 echo `jztr`;
// $customer = array(
//     'name' => 'Sỹ Phú',
//     'birthday' => '2002-11-30',
//     'numberphone' => '0123456789',
//     'image' => 'http://localhost/doanweb1-shop/Image/avt/User_light@3x.png',
//     'address' => '',
//     'gender' => 'unisex',
//     'id' => 'KH001',
//     'status' => '',
//     'username' => '',
//     'password' => ''
// );
   
}

// echo $crud -> check_account($conn, $id, $data_received["number_phone"]);
echo json_encode($response);
// echo json_encode($data_received);
// echo json_encode($customer);
?>



