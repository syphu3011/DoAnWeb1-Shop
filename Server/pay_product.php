<?php
require_once('../init.php');
require_once('CRUD.php');
$crud = new CRUD();
// echo json_encode($crud->get_id_import_product($conn, "AO00000001", "#ffffff", "AOS")["id_import_coupon"]);
$data_received = json_decode(file_get_contents("php://input"), true);
// // $id_customer = 'KH001';
$id_customer = $data_received["id_customer"];
// $id_customer = "KH004";
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
// $address = "kkkkkk";
// Tạo mảng các thông tin cần thiết
$data = array(
    'id' => $id_receipt,
    'date_init' => $date_time,
    'date_confirm' => null,
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
    // $id_product = $data_received["product"][$i]["idProduct"];
    $product = array(
        'id_product' => $data_received["product"][$i]["idProduct"],
        'id_import_coupon' => 
            $crud->get_id_import_product(
                $conn,$data_received["product"][$i]["idProduct"],
                $data_received["product"][$i]["idColor"],
                $data_received["product"][$i]["idSize"])["id_import_coupon"],
        'id_size' => $data_received["product"][$i]["idSize"],
        'id_color' => $data_received["product"][$i]["idColor"],
        'id_receipt' => $id_receipt,
        'amount' => $data_received["product"][$i]["amount"],
        'price' => $data_received["product"][$i]["price"]
    );
    // $product = array(
    //     'id_product' => $data_received["product"][$i]["id_product"],
    //     'id_size' => $data_received["product"][$i]["id_size"],
    //     'id_color' => $data_received["product"][$i]["id_color"],
    //     'id_receipt' => $id_receipt,
    //     'amount' => $data_received["product"][$i]["amount"],
    //     'price' => $data_received["product"][$i]["price"]
    // );
    $crud->delete_product_in_cartById(
        $conn,
        $id_customer,[
        $data_received["product"][$i]["idProduct"]]
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
// $product = array([
//     'id_receipt' => "HD006",
//     'id_size' => "AOS",
//     'id_color' => "#ffffff",
//     'id_product' => "AO00000002",
//     'id_import_coupon' => null,
//     'amount' => 10,
//     'price' => 100000]
// );
// $crud->insert_data_to_detail_receipt(
//     $conn,
//     $product[0]
//     );

?>