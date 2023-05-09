<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require_once('../../../init.php');
        require_once('../same_function.php');
        try {
            $id_user = $_POST['id_user'];
            if (check_privilege($id_user, $conn, 'xem', 'product')) {
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
                    echo 'Lỗi khi lấy danh sách kích thước!';
                }
            }
        }catch(Exception $e) {
            echo 'Lỗi khi lấy danh sách kích thước!';
        }
    }
?>