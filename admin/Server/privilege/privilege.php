<?php
require_once('../../../init.php');
// Lấy ID người dùng từ phía frontend
$user_id = $_GET['user_id'];

// Prepare and execute query
$stmt = mysqli_prepare($conn, "SELECT id_table, id_feature FROM privilege_general_detail WHERE id_user = ?");
mysqli_stmt_bind_param($stmt, 'i', $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

// Fetch data as associative array
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Close statement and connection
mysqli_stmt_close($stmt);
mysqli_close($conn);

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);

?>