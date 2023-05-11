<?php
    require_once('../../init.php');
    require_once('./same_function.php');
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $id_user = $_POST['id_user'];
        $password_user = $_POST['password'];
        if (check_privilege($id_user, $password_user, $conn, 'sua', 'receipt')) {
            $id_product = $_POST['idProd'];
            $id_size = $_POST['idSize'];
            $id_color = $_POST['idColor'];
            $amount = $_POST['amount'];
            $query_get_product_in_stock = "
            SELECT * 
            FROM product_in_stock, import_coupon
            WHERE product_in_stock.id_import_coupon = import_coupon.id 
            and id_product = :id_product
            ";
            $query_update_product_in_stock = "
            UPDATE `product_in_stock`(`id_import_coupon`, `id_product`, `id_size`, `id_color`, `amount`, `price_input`)
            SET amount = :amount
            WHERE id_product
            ";
            $stmt_get_product_in_stock = $conn -> prepare($query_get_product_in_stock);
            if ($stmt_get_product_in_stock -> execute()) {
                $list_product_in_stock = $stmt_get_product_in_stock -> fetchAll(PDO::FETCH_ASSOC);

            }
        }
    }
?>