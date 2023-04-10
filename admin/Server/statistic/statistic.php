<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        require_once('../../../init.php');
        $query_statistic = "
        SELECT
            *
        FROM
            (
            SELECT
                id,
                id_classify
            FROM
                product_list_classify
            LEFT JOIN product ON product.id = product_list_classify.id_product
            WHERE  product_list_classify.id_classify LIKE '%%'
        ) product_with_classify
        LEFT JOIN(
            SELECT detail_import_coupon_price.id_product,
                detail_import_coupon_price.price_input, detail_import_coupon_price.amount_input,
                detail_receipt_price.price_output, detail_receipt_price.amount_output
            FROM
                (
                SELECT
                    id_product,
                    SUM((amount * price_input)) price_input, SUM(amount) amount_input
                FROM
                    import_coupon,
                    detail_import_coupon
                WHERE
                    import_coupon.date_init >= :beginDate AND import_coupon.date_init <= :endDate AND import_coupon.id = detail_import_coupon.id_import_coupon
                GROUP BY
                    id_product
            ) detail_import_coupon_price
        LEFT JOIN(
            SELECT
                id_product,
                SUM((amount * price)) price_output, SUM(amount) amount_output
            FROM
                receipt,
                detail_receipt
            WHERE
                receipt.date_init >= :beginDate AND receipt.date_init <= :endDate AND receipt.id = detail_receipt.id_receipt
            GROUP BY
                id_product
        ) detail_receipt_price
        ON
            detail_import_coupon_price.id_product = detail_receipt_price.id_product
        GROUP BY
            detail_import_coupon_price.id_product
        ) product_with_price
        ON
            product_with_classify.id = product_with_price.id_product
        ORDER BY amount_output DESC
        ";
        $begin_date = "2022-04-03 00:00:00";
        $end_date = "2023-04-03 00:00:00";
        $stmt = $conn->prepare($query_statistic);
        $stmt->bindParam(":beginDate", $begin_date);
        $stmt->bindParam(":endDate", $end_date);
        $response_array = new stdClass();
        if ($stmt->execute()) {
            $response_array->sizes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($response_array, JSON_UNESCAPED_UNICODE);
            header('Content-Type: application/json; charset=utf-8');
            echo $json;
        }
        else {
            echo 'Lỗi khi lấy danh sách thống kê';
        }
    }
?>