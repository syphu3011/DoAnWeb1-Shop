<?php
    if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            $id_user = $_POST["id_user"];
            $password_user = $_POST["password"];
            if (check_privilege($id_user, $password_user, $conn, 'xem','product')) {
                $query = "SELECT 
                product_list.id_product, 
                product_list.id_size, 
                product_list.id_color, 
                ifnull(amount, 0)  amount,
                ifnull(price_input,0) price_input,
                ifnull(product_list.price,0) price 
                FROM product_list
                LEFT JOIN 
                (SELECT id_product, id_size, id_color, max(ifnull(price_input,0)) price_input, sum(ifnull(amount, 0)) amount
                FROM product_in_stock
                GROUP BY id_product, id_size, id_color
                ) product_in_stock
                ON 
                product_list.id_product = product_in_stock.id_product and
                product_list.id_size = product_in_stock.id_size and 
                product_list.id_color = product_in_stock.id_color and 
                product_list.price = product_in_stock.price_input
                ";
                $stmt = $conn -> prepare($query);
                if ($stmt -> execute()) {
                    $response = $stmt -> fetchAll(PDO::FETCH_ASSOC);
                    $json = json_encode($response, JSON_UNESCAPED_UNICODE);
                    header('Content-Type: application/json; charset=utf-8');
                    echo $json;
                }
            }
        }
        catch(Exception $e) {
            echo "Không thể lấy danh sách mặt hàng!";
        }
    }
?>