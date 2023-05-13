<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            $data_post = json_decode(file_get_contents('php://input'), true);
            $id_user = $data_post["id_user"];
            $password_user = $data_post["password"];
            if (check_privilege($id_user, $password_user, $conn, 'them','import_product')) {
                $conn -> beginTransaction();
                $id_input = initId($conn);
                $query_import_coupon = "
                INSERT INTO `import_coupon`(`id`, `date_init`, `id_staff`, `note`)
                VALUES (:id,:date_init,:id_staff, :note)";
                $query_import_detail = "
                INSERT INTO `detail_import_coupon`(`id_import_coupon`, `id_product`, `id_size`, `id_color`, `amount`, `price_input`)
                VALUES (:idInput,:idProd,:idSize,:idColor,:amount,:price)
                ";
                $query_insert_product_list = "
                INSERT INTO `product_list`(`id_product`, `id_size`, `id_color`)
                VALUES (:idProd,:idSize,:idColor)
                ";
                // $query_update_product_list = "
                // UPDATE `product_list`
                // SET price = :price
                // WHERE
                // id_product = :idProd 
                // and id_size = :idSize
                // and id_color = :idColor
                // ";  
                $query_product_in_stock = "
                INSERT INTO `product_in_stock`(`id_import_coupon`, `id_product`, `id_size`, `id_color`, `amount`, `price_input`)
                VALUES (:idInput,:idProd,:idSize,:idColor,:amount,:price)
                ";
                // Xử lý thêm phiếu nhập
                $stmt = $conn->prepare($query_import_coupon);
                $input_product = $data_post['InputProduct'];
                $date_init = date('Y-m-d H:i:s');
                $id_staff = getIdUser($conn, $id_user);
                $note = $input_product['note'];
                $stmt->bindParam(':id',$id_input);
                $stmt->bindParam(':date_init', $date_init);
                $stmt->bindParam(':id_staff', $id_staff);
                $stmt->bindParam(':note', $note);
                $stmt->execute();
                // Xử lý thêm và cập nhật hàng

                // Phân loại
                $array_insert = array();
                $array_update = array();
                $query_check_exist = 
                    "SELECT *
                    FROM product_list
                    WHERE id_product = :idProd 
                    and id_size = :idSize 
                    and id_color = :idColor";
                $stmt = $conn->prepare($query_check_exist);
                foreach($data_post['Stuff'] as $prod_list) {
                    $stmt->bindParam(':idProd', $prod_list['idProd']);
                    $stmt->bindParam(':idSize', $prod_list['idSize']);
                    $stmt->bindParam(':idColor', $prod_list['idColor']);
                    $stmt->execute();
                    if ($stmt->rowCount() > 0) {
                        array_push($array_update, $prod_list);
                    }
                    else {
                        array_push($array_insert, $prod_list);
                    }
                }

                    //Thêm vào danh sách sản phẩm chưa có
                $stmt = $conn->prepare($query_insert_product_list);
                foreach($array_insert as $prod_list_insert) {
                    // $stmt->bindParam(':price', $prod_list_insert['price']);
                    $stmt->bindParam(':idProd', $prod_list_insert['idProd']);
                    $stmt->bindParam(':idSize', $prod_list_insert['idSize']);
                    $stmt->bindParam(':idColor', $prod_list_insert['idColor']);
                    $stmt->execute();
                }
                // Xử lý thêm chi tiết
                $stmt = $conn->prepare($query_import_detail);
                foreach($data_post['Stuff'] as $import_product) {
                    // Thêm màu
                    if (!check_color($import_product['idColor'], $conn)) {
                        if (!insert_color($import_product['idColor'], $conn)) {
                            $conn -> rollBack();
                            die('Lỗi khi thêm màu!');
                        }
                    }
                    $id_prod = $import_product['idProd'];
                    $id_size = $import_product['idSize'];
                    $id_color = $import_product['idColor'];
                    $amount = $import_product['amount'];
                    $price = $import_product['price'];
                    $stmt->bindParam(':idInput', $id_input);
                    $stmt->bindParam(':idProd', $id_prod);
                    $stmt->bindParam(':idSize', $id_size);
                    $stmt->bindParam(':idColor', $id_color);
                    $stmt->bindParam(':amount', $amount);
                    $stmt->bindParam(':price', $price);
                    $stmt->execute();
                }

                // Xử lý thêm hàng vào kho
                $stmt = $conn->prepare($query_product_in_stock);
                foreach($data_post['Stuff'] as $prod_in_stock) {
                    $id_prod = $import_product['idProd'];
                    $id_size = $import_product['idSize'];
                    $id_color = $import_product['idColor'];
                    $amount = $import_product['amount'];
                    $price = $import_product['price'];
                    $stmt->bindParam(':idInput', $id_input);
                    $stmt->bindParam(':idProd', $id_prod);
                    $stmt->bindParam(':idSize', $id_size);
                    $stmt->bindParam(':idColor', $id_color);
                    $stmt->bindParam(':amount', $amount);
                    $stmt->bindParam(':price', $price);
                    $stmt->execute();
                }
                //     //Cập nhật danh sách sản phẩm
                // $stmt = $conn->prepare($query_update_product_list);
                // foreach($array_update as $prod_list_update) {
                //     $stmt->bindParam(':price', $prod_list_update['price']);
                //     $stmt->bindParam(':idProd', $prod_list_update['idProd']);
                //     $stmt->bindParam(':idSize', $prod_list_update['idSize']);
                //     $stmt->bindParam(':idColor', $prod_list_update['idColor']);
                //     $stmt->execute();
                // }
                echo 'Đã nhập hàng thành công! Mã nhập hàng là '.$id_input;
                $conn->commit();
            }
        } catch (Exception $e) {
            $conn->rollBack();
            die('Không thể hoàn thành nhập hàng');
        }
    }

    function check_color($hexColor, $conn) {
        $query_check_color = "
        SELECT *
        FROM color
        WHERE id = :hexColor
        ";
        $stmt_check_color = $conn -> prepare($query_check_color);
        $stmt_check_color -> bindParam(":hexColor", $hexColor);
        if ($stmt_check_color -> execute()) {
            if ($stmt_check_color -> rowCount() > 0) {
                return true;
            }
            return false;
        }
        return false;
    }
    function insert_color($hexColor, $conn) {
        try {
            $query_insert_color = "
            INSERT INTO `color`(`id`)
            VALUES (:id)
            ";
            $stmt_insert_color = $conn -> prepare($query_insert_color);
            $stmt_insert_color -> bindParam(":id", $hexColor);
            if ($stmt_insert_color -> execute()) {
                return true;
            }
            return false;
        }
        catch(Exception $e) {
            return false;
        }
    }
    function initId($conn) {
        $query = "SELECT id FROM import_coupon order by id desc limit 1";
        $stmt = $conn -> prepare($query);
        if ($stmt -> execute()) {
            if ($stmt -> rowCount() > 0) {
                $response = $stmt -> fetchAll(PDO::FETCH_ASSOC);
                $id_int = (int)explode('NHAP',$response[0]['id'])[1];
                $id = 'NHAP'. str_pad(''.($id_int+1),3,'0',STR_PAD_LEFT);
                return $id;
            }
        }
    }
    function getIdUser($conn,$username) {
        $query = "SELECT id FROM staff, account where staff.id_user = account.id_user and username = '$username'";
        $stmt = $conn -> prepare($query);
        if ($stmt -> execute()) {
            if ($stmt -> rowCount() > 0) {
                $response = $stmt -> fetchAll(PDO::FETCH_ASSOC);
                return $response[0]['id'];
            }
        }
    }
?>