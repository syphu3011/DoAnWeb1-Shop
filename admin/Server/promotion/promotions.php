<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        require_once('../../../init.php');
        $query_get_promotions = "
        SELECT *
        FROM promotion
        ";
        $query_detail_promotions = "
        SELECT *
        FROM detail_promotion
        ";
        $stmt = $conn->prepare($query_get_promotions);
        if ($stmt->execute()) {
            $stmt = $conn->prepare($query_detail_promotions);
            if (!$stmt->execute()) {
                echo 'Lỗi khi lấy danh sách áp dụng';
            }
        }
        else {
            echo 'Lỗi khi lấy danh sách khuyến mãi';
        }
    }
?>