<?php
require_once('../init.php');
require_once('CRUD.php');
$crud = new CRUD();
$id_customer = 'KH001';
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
// Tạo mảng các thông tin cần thiết
$data = array(
    'id' => $id_receipt,
    'date_init' => $date_time,
    'date_confirm' => $date_time,
    'address' => '123 Main St',
    'note' => 'Some notes here',
    'id_staff' => null,
    'id_customer' => $id_customer,
    'id_status' => $id_status
);
// Thêm mới dữ liệu vào bảng receipt
$product = array([
    'id_receipt' => $id_receipt,
    'id_size' => 2,
    'id_color' => 3,
    'id_product' => 4,
    'id_import_coupon' => null,
    'amount' => 10,
    'price' => 100000]
);
echo json_encode($product[0]);
?>