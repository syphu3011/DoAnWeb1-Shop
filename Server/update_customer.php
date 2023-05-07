<?php
require_once("../init.php");
require_once("CRUD.php");
$crud = new CRUD();
$data_received = json_decode(file_get_contents("php://input"), true);
// echo $data_received;
// echo $crud -> check_number_phone_when_update($conn, 'KH001', '0000394142898');
if (($crud -> check_number_phone_when_update($conn, 'KH000', '0000394142898'))>0){
    $response = array (
        "success" => false,
        "Message" => "Số điện thoại này đã tồn tại",
        "Data received" => $data_received
    );
} else {
echo json_encode($data_received);

                // echo `jztr`;
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
$customer = json_decode($data_received["update_customer"]);


    // $response = array (
    //     "test" => $crud -> update_customer($conn, $customer),
    //     "success" => true,
    //     "Message" => "Cập nhật thành công",
    // );
}

// echo $crud -> check_account($conn, $id, $data_received["number_phone"]);
// echo json_encode($response);
echo json_encode($customer);
?>



