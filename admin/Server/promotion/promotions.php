<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        require_once('../../../init.php');
        $query_get_promotions = "
        SELECT *
        FROM promotion
        WHERE id_status = 'TT10'
        ";
        $query_detail_promotions = "
        SELECT id_promotion,product.id, product.name, input_country.name made_in, GROUP_CONCAT(DISTINCT product_list_classify.id_classify SEPARATOR ',') classify
        FROM detail_promotion 
        LEFT JOIN product ON detail_promotion.id_product = product.id
        LEFT JOIN product_list_classify ON product.id = product_list_classify.id_product
        LEFT JOIN input_country ON input_country.id = madein
        LEFT JOIN promotion ON id_promotion = promotion.id
        WHERE promotion.id_status = 'TT10'
        GROUP BY id_promotion, product.id
        ";
        $stmt = $conn->prepare($query_get_promotions);
        $response_array = new stdClass();
        if ($stmt->execute()) {
            $response_array->promote = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = $conn->prepare($query_detail_promotions);
            if (!$stmt->execute()) {
                echo 'Lỗi khi lấy danh sách áp dụng';
            }
            else {
                $response_array->detail_promotion = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $json = json_encode($response_array, JSON_UNESCAPED_UNICODE);
                header('Content-Type: application/json; charset=utf-8');
                echo $json;
            }
        }
        else {
            echo 'Lỗi khi lấy danh sách khuyến mãi';
        }
    }
?>