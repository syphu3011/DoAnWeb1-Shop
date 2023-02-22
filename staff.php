<?php
// Kết nối đến CSDL
$conn = mysqli_connect("localhost", "root", "", "Shop");

// Kiểm tra kết nối
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());

}

// Truy vấn dữ liệu từ bảng "users"
$sql = "SELECT id,name,date_init,username_staff,birthday,gender,phone,address,id_status,note,GROUP_CONCAT(staff_position_list.id_position SEPARATOR ', ') as position FROM staff,staff_position_list WHERE id = id_staff GROUP BY id_staff;";
$result = mysqli_query($conn, $sql);

// Kiểm tra kết quả truy vấn
if (mysqli_num_rows($result) > 0) {
    // Dữ liệu trả về là một mảng các đối tượng
    $data1 = array();
    while ($row = mysqli_fetch_object($result)) {
        $data1[] = $row;
    }
    // Chuyển đổi dữ liệu thành chuỗi JSON
    $json_data = json_encode($data1, JSON_UNESCAPED_UNICODE);

    // Đặt kiểu dữ liệu trả về là "application/json"
    header('Content-Type: application/json;charset=utf-8');

    // Trả về chuỗi JSON
    echo $json_data;
} else {
    echo "No results found.";
}

// Đóng kết nối
mysqli_close($conn);
?>