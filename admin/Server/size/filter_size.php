<?php
    if ($_SERVER["REQUEST_METHOD"] === 'POST') {  
        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            if (check_privilege($id_user, $conn, 'xem', 'product')) {  
                $query_get_promotions = "
                SELECT *
                FROM size
                WHERE 
                id LIKE :id and 
                id_status = :id_status
                ";
                $stmt = $conn->prepare($query_get_promotions);
                $data = $_POST['filter_size'];
                $id = '%'.$data['id'].'%';
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':id_status', $data['id_status']);
                $response_array = new stdClass();
                if ($stmt->execute()) {
                    $response_array->size = $stmt -> fetchAll(PDO::FETCH_ASSOC);
                    $json = json_encode($response_array, JSON_UNESCAPED_UNICODE);
                    header('Content-Type: application/json; charset=utf-8');
                    echo $json;
                }
                else {
                    echo 'Lỗi khi lấy danh sách kích thước';
                }
            }
        }
        catch (Exception $e) {
            echo 'Lỗi tìm kiếm kích thước';
        }
    }
?>