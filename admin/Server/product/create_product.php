<?php
require_once("../../../init.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_FILES['file']) {
    $data = json_decode(file_get_contents('php://input'), true);
    // Chuẩn bị truy vấn với prepared statement product
    $stmt = $conn->prepare("INSERT INTO product(id,name,madein,description,idstatus) VALUES(:val1,:val2,:val3,:val4,:val5)");
    $id = $data["id"];
    $name = $data["name"];
    $made_in = $data["made_in"];
    $description = $data["description"];
    $status = "TT01";
    $stmt->bindParam(':val1', $id);
    $stmt->bindParam(':val2', $name);
    $stmt->bindParam(':val3', $made_in);
    $stmt->bindParam(':val4', $description);
    $stmt->bindParam(':val5', $status);

    // Thực thi truy vấn và kiểm tra kết quả
    if ($stmt->execute()) {
        // Thành công
        $response = array('status' => 'success', 'message' => 'Data inserted.');
        echo json_encode($response);
    } else {
        // Thất bại
        $response = array('status' => 'error', 'message' => 'Failed to insert data.');
        echo json_encode($response);
    }
} else {
    $response = array('status' => 'error', 'message' => 'Invalid request method.');
    echo json_encode($response);
}
?>