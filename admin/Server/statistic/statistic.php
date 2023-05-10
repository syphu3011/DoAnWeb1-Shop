<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require_once('../../../init.php');
        require_once('../same_function.php');
        $id_user = $_POST['id_user'];
        $password_user = $_POST['password'];
        $order = $_POST['order'];
        $direction = $_POST['direction'];
        try {
            if (check_privilege($id_user, $password_user, $conn, 'xem','statistic')) {
                $query_statistic = "
                SELECT
                    *, (price_output * amount_output) revenue, (price_input * amount_input) expense, (isnull(price_output * amount_output, 0) - isnull(price_input * amount_input,0)) profit
                FROM
                    (
                    SELECT
                        id, 
                        name,
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
                ORDER BY $order $direction
                ";
                $begin_date = $_POST['begin_date'];
                $end_date = $_POST['end_date'];
                if ($begin_date == null) {
                    $begin_date = '1970-01-01 00:00:00';
                }
                if (($end_date == null)) {
                    $end_date = date('Y/m/d h:i:sa');
                }
                $stmt = $conn->prepare($query_statistic);
                $stmt->bindParam(":beginDate", $begin_date);
                $stmt->bindParam(":endDate", $end_date);
                $response_array = new stdClass();
                if ($stmt->execute()) {
                    $response_array -> statistic = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $json = json_encode($response_array, JSON_UNESCAPED_UNICODE);
                    header('Content-Type: application/json; charset=utf-8');
                    echo $json;
                }
                else {
                    echo 'Lỗi khi lấy danh sách thống kê';
                }
            }
        }
        catch(Exception $e) {
            echo 'Đã có lỗi xảy ra!';
        }
    }
?>