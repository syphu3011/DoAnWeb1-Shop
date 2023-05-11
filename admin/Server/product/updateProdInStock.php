<?php
// {
// idProd:"",
// idSize:"",
// idColor:"",
// amount:"",
// id_user:"",
// password:""
// }
    require_once('../../../init.php');
    require_once('../same_function.php');
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $id_user = $_POST['id_user'];
        $password_user = $_POST['password'];
        try {
            if (check_privilege($id_user, $password_user, $conn, 'sua', 'receipt')) {
                $conn -> beginTransaction();
                $id_product = $_POST['idProd'];
                $id_size = $_POST['idSize'];
                $id_color = $_POST['idColor'];
                $amount = $_POST['amount'];
                $query_get_product_in_stock = "
                SELECT * 
                FROM product_in_stock, import_coupon
                WHERE product_in_stock.id_import_coupon = import_coupon.id 
                and id_product = :id_product
                and id_size = :id_size
                and id_color = :id_color
                and amount > 0
                order by date_init asc
                ";
                $query_update_product_in_stock = "
                UPDATE `product_in_stock` 
                SET amount = :amount
                WHERE id_product = :id_product
                and id_size = :id_size
                and id_color = :id_color
                and id_import_coupon = :id_import_coupon
                ";
                $stmt_get_product_in_stock = $conn -> prepare($query_get_product_in_stock);
                $stmt_get_product_in_stock -> bindParam(":id_product", $id_product);
                $stmt_get_product_in_stock -> bindParam(":id_size", $id_size);
                $stmt_get_product_in_stock -> bindParam(":id_color", $id_color);
                if ($stmt_get_product_in_stock -> execute() && $stmt_get_product_in_stock -> rowCount() > 0) {
                    $list_product_in_stock = $stmt_get_product_in_stock -> fetchAll(PDO::FETCH_ASSOC);
                    // $list_product_in_stock = $list_product_in_stock;
                    foreach($list_product_in_stock as $value) {
                        $amount_update = 0;
                        $use_loop = false;
                        if ($value["amount"] - $amount >= 0) {
                            $amount_update = $value["amount"] - $amount;
                            $amount = 0;
                        }
                        else {
                            $amount_update = 0;
                            $amount -= $value["amount"];
                        }
                        $id_import_coupon = $value["id_import_coupon"];
                        $stmt_update_product_in_stock = $conn -> prepare($query_update_product_in_stock);
                        $stmt_update_product_in_stock -> bindParam(":amount", $amount_update);
                        $stmt_update_product_in_stock -> bindParam(":id_product", $id_product);
                        $stmt_update_product_in_stock -> bindParam(":id_size", $id_size);
                        $stmt_update_product_in_stock -> bindParam(":id_color", $id_color);
                        $stmt_update_product_in_stock -> bindParam(":id_import_coupon", $id_import_coupon);
                        $stmt_update_product_in_stock -> execute();
                        if (!$use_loop) {
                            break;
                        }
                    }
                    $conn -> commit();
                    die("Đã cập nhật hàng trong kho!");
                }
            }
        }
        catch(Exception $e) {
            $conn -> rollBack();
            die("Đã có lỗi xảy ra!");
        }
    }
?>