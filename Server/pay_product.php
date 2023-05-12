<?php
require_once('../init.php');
require_once('CRUD.php');
$crud = new CRUD();
$data_received = json_decode(file_get_contents("php://input"), true);
// $id_customer = 'KH001';
// $id_customer = $data_received["id_customer"];
$id_customer = "KH004";
// Lấy số hoá đơn lớn nhất trong danh sách
$max_id_hd = $crud->read_max_receipt($conn);
// Tạo chỉ số kế tiếp
$number = ((int)substr($max_id_hd,2)+1);
// Điền số vào phần đuôi của id và lấp đầy với số 0 nếu cần
$number = str_pad($number, 3, '0', STR_PAD_LEFT);
// Tạo id mới
$id_receipt = "HD".$number;
// Tạo trạng thái đơn hàng 
$id_status = "TT09";
// Tạo ngày hiện tại
$date_time = date('Y-m-d H:i:s');
// Địa chỉ
$address = $data_received["address"];
$address = "kkkkkk";
// Tạo mảng các thông tin cần thiết
$data = array(
    'id' => $id_receipt,
    'date_init' => $date_time,
    'date_confirm' => $date_time,
    'address' => $address,
    'note' => null,
    'id_staff' => null,
    'id_customer' => $id_customer,
    'id_status' => $id_status
);
// Thêm mới dữ liệu vào bảng hoá đơn
$crud->insert_data_to_receipt(
    $conn,
    $data
);
  
for ($i = 0;$i<count($data_received["product"]);$i++){
    $product = array(
        'id_product' => $data_received["product"][$i]["id_product"],
        'id_size' => $data_received["product"][$i]["id_size"],
        'id_color' => $data_received["product"][$i]["id_color"],
        'id_receipt' => $id_receipt,
        'amount' => $data_received["product"][$i]["amount"],
        'price' => $data_received["product"][$i]["price"]
    );
    $product = array(
        'id_product' => $data_received["product"][$i]["id_product"],
        'id_size' => $data_received["product"][$i]["id_size"],
        'id_color' => $data_received["product"][$i]["id_color"],
        'id_receipt' => $id_receipt,
        'amount' => $data_received["product"][$i]["amount"],
        'price' => $data_received["product"][$i]["price"]
    );
    $crud->insert_data_to_detail_receipt(
        $conn,
        $product
    );
}
 $response = array(
        "success" => true,
        "message" => "Đặt mua thành công",
        "data" => $data,
    );
// Thêm mới dữ liệu vào bảng receipt
// $product = array([
//     'id_receipt' => $id_receipt,
//     'id_size' => 2,
//     'id_color' => 3,
//     'id_product' => 4,
//     'id_import_coupon' => null,
//     'amount' => 10,
//     'price' => 100000]
// );

echo json_encode($response);
?>