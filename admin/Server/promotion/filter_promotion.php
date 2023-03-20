<?php
    if ($_SERVER["REQUEST_METHOD"] === 'POST') {    
        try {
            require_once('../../../init.php');
            $query_get_promotions = "
            SELECT *
            FROM promotion
            WHERE 
            name LIKE :name and 
            begin_date >= :begin_date and 
            finish_date <= :finish_date and
            id_status = :id_status
            ";
            $query_detail_promotions = "
            SELECT product.id, product.name, input_country.name made_in, GROUP_CONCAT(DISTINCT product_list_classify.id_classify SEPARATOR ',') classify
            FROM detail_promotion 
            LEFT JOIN product ON detail_promotion.id_product = product.id
            LEFT JOIN product_list_classify ON product.id = product_list_classify.id_product
            LEFT JOIN input_country ON input_country.id = madein
            LEFT JOIN promotion ON id_promotion = promotion.id
            WHERE detail_promotion.id_promotion = :id and 
            promotion.id_status = :id_status
            GROUP BY id_promotion, product.id
            ";
            $query_get_latest = "
            SELECT MAX(finish_date) last
            FROM `promotion` 
            ";
            $stmt = $conn->prepare($query_get_latest);
            $stmt->execute();
            $result_last = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $to_time = strtotime($result_last[0]['last']);
            $stmt = $conn->prepare($query_get_promotions);
            $data = $_POST;
            $data['filter_promotion']['begin_date'] = $_POST['filter_promotion']['begin_date'] !== '' ? $_POST['filter_promotion']['begin_date'] = date ('Y-m-d H:i:s', strtotime($_POST['filter_promotion']['begin_date'])) : date('Y-m-d H:i:s', strtotime('1-1-1970 00:00:00'));    
            $data['filter_promotion']['finish_date'] = $_POST['filter_promotion']['finish_date'] !== '' ? date ('Y-m-d H:i:s', strtotime($_POST['filter_promotion']['finish_date'])) : date ('Y-m-d H:i:s',$to_time);
            $data['filter_promotion']['name'] = '%'.$_POST['filter_promotion']['name'].'%';
            $response_array = new stdClass();
            $stmt->bindParam(':name', $data['filter_promotion']['name']);
            $stmt->bindParam(':begin_date', $data['filter_promotion']['begin_date']);
            $stmt->bindParam(':finish_date', $data['filter_promotion']['finish_date']);
            $stmt->bindParam(':id_status', $data['filter_promotion']['id_status']);
            if ($stmt->execute()) {
                $response_array->promotion = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $detail_promotion = array();
                $stmt = $conn->prepare($query_detail_promotions);
                foreach($response_array->promotion as $promote) {
                    $stmt->bindParam(':id', $promote['id']);
                    $stmt->bindParam(':id_status', $promote['id_status']);
                    $stmt->execute();
                    if ($stmt->rowCount() > 0) {
                        array_push($detail_promotion, $stmt->fetchAll(PDO::FETCH_ASSOC));
                    }
                }
                $response_array->detail_promotion = $detail_promotion;
                $json = json_encode($response_array, JSON_UNESCAPED_UNICODE);
                header('Content-Type: application/json; charset=utf-8');
                echo $json;
            }
            else {
                echo 'Lỗi khi lấy danh sách khuyến mãi';
            }
        }
        catch (Exception $e) {
            echo 'Lỗi tìm kiếm';
        }
    }
?>