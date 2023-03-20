<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        require_once('../../../init.php');
        $query_get_sizes = "
        SELECT *
        FROM size
        WHERE id_status = 'TT12'
        ";
        $stmt = $conn->prepare($query_get_sizes);
        $response_array = new stdClass();
        if ($stmt->execute()) {
            $response_array->sizes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($response_array, JSON_UNESCAPED_UNICODE);
            header('Content-Type: application/json; charset=utf-8');
            echo $json;
        }
        else {
            echo 'Lỗi khi lấy danh sách khuyến mãi';
        }
    }
?>