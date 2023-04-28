<?php
    class CRUD {
        //Tai khoan
        public function read_data_account($conn, $username, $password, &$status) {
            $sql = "SELECT * FROM `account` WHERE `username` = ? AND `password`= ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$username, $password]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $status = $stmt->rowCount() > 0;
            $stmt = null;
            return $result;
        }

        public function read_data_customer($conn, $iduser){
            $sql = "SELECT * FROM `customer` WHERE `id_user` = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$iduser]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }

        public function read_data_staff($conn, $iduser){
            $sql = "SELECT * FROM `staff` WHERE `id_user` = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$iduser]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        //Phan loai san pham
        public function read_data_large_classify($conn)
        {
            # code...
            $sql="SELECT * FROM classify WHERE id_big_classify is NULL";
            $stmt=$conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        
        //Loai san pham
        
        public function read_data_mini_classifyById($conn, $id)
        {
            # code...
            $sql="SELECT * 
                    FROM classify
                    WHERE id_big_classify = ?";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$id]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        //Mau
        public function read_data_color($conn)
        {
            # code...
            // $sql = "SELECT "
        }
        //San pham
        public function read_productById($conn, $id) {
            $sql="SELECT * FROM product WHERE id = :id";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        //lay du lieu san pham theo gioi tinh, ma loai
        public function read_productByIdClassify($conn, $gender, $id_classify) {
            $sql="SELECT 
                product_list_classify.id_product, 
                product.name, 
                product_list.price, (
                	SELECT DISTINCT image_product.link_image 
                    FROM image_product
                    WHERE image_product.id_product=product.id
                ) AS link_image,
                classify.name as name_classify,
                classify.gender
            FROM 
                product_list_classify, 
                product, 
                product_list,
                classify
                 
            WHERE product_list_classify.id_classify=classify.id
                AND product_list_classify.id_product=product.id
                AND product.idstatus = 'TT01'
                AND product_list.id_product = product_list_classify.id_product
                AND classify.gender = ?
                AND classify.id = ?
                    ";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$gender, $id_classify]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_productByIdLarge_classify($conn, $id_large_classify) {
            $sql="SELECT
                classify.id,
                classify.name,
                product_list_classify.id_product,
                product_list.id_size,
                product_list.id_size,
                product_list.price, (
                                SELECT DISTINCT image_product.link_image 
                                FROM image_product
                                WHERE image_product.id_product=product_list.id_product
                            ) AS link_image
            FROM 
                classify,
                product_list_classify,
                product_list
            WHERE 
                classify.id_big_classify= ? AND
                classify.id=product_list_classify.id_classify
                AND product_list.id_product = product_list_classify.id_product
                    ";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$id_large_classify]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_data_product($conn) {
            $sql="SELECT * FROM product ";
            $stmt=$conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }

        public function read_image_productByProductId($conn, $idproduct) {
            $sql="SELECT link_image, name_image FROM image_product WHERE id_product= :idproduct";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(":idproduct", $idproduct);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_data_image_product($conn) {
            $sql="SELECT * FROM image_product";
            $stmt=$conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_input_countryById($conn, $id_country) {
            $sql="SELECT ic.name FROM input_country ic WHERE id = :id_country";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(":id_country", $id_country);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_product_listByProductId($conn, $idproduct) {
            $sql="SELECT id_size, price, id_color 
            FROM product_list 
            WHERE id_product = ?";
            $stmt=$conn->prepare($sql);
            // $stmt->bindParam(":idproduct", $idproduct);
            $stmt->execute([$idproduct]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_data_product_list($conn) {
            $sql="SELECT * FROM product_list ORDER BY product_list.price";
            $stmt=$conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        //Khuyen mai
        public function read_data_promotion($conn)
        {
            # code...
            $sql = "SELECT 
                        promotion.id, 
                        promotion.content, 
                        promotion.name, 
                        promotion.discount_price, 		
                        promotion.discount_percent, 
                        promotion.begin_date,
                        promotion.finish_date,
                        detail_promotion.id_product,
                        status_promotion.name,
                        product_list.price
                    FROM 
                        promotion, 
                        detail_promotion,
                        status_promotion,
                        product_list
                    WHERE 
                        promotion.id = detail_promotion.id_promotion
                        AND promotion.id_status = status_promotion.id
                        AND detail_promotion.id_product = product_list.id_product";
            $stmt = $conn -> prepare($sql);
            $stmt -> execute();
            $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_data($conn)
        {
            # code...
            $sql = "SELECT 
                promotion.id AS id_promotion,
                product.id AS id_product,
                image_product.link_image,
                image_product.name_image,
                promotion.name,
                promotion.image,
                promotion.content,
                promotion.discount_price,
                promotion.discount_percent,
                promotion.begin_date,
                promotion.finish_date,
                status_promotion.name AS status_promotion
            FROM 
                promotion
            LEFT JOIN detail_promotion ON promotion.id = detail_promotion.id_promotion
            LEFT JOIN product ON product.id = detail_promotion.id_product
            LEFT JOIN status_promotion ON status_promotion.id=promotion.id_status
            LEFT JOIN image_product ON product.id=image_product.id_product
            WHERE 
                promotion.finish_date >= CURDATE()
            ";
            $stmt = $conn -> prepare($sql);
            $stmt -> execute();
            $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        // public function read_data_advanced_search($conn, $type, $min_price, $max_price)
        // {
        //     # code...
        //     if ($type == 'Tất cả'){
        //         $type_value ='';
        //     } else {
        //         $type = trim($type);
        //         $type_value = 'AND classify.name = ?';
        //     }

        //     $sql = "SELECT 
        //         product_list_classify.id_classify, 
        //         product_list_classify.id_product,
        //         product.name,
        //         input_country.name,
        //         product.description,
        //         status_product.name,
        //         product_list.id_size,
        //         product_list.id_color,
        //         product_list.price,
        //         image_product.link_image AS link_image,
        //         promotion.name AS name_promotion,
        //         promotion.image,
        //         promotion.content,
        //         promotion.discount_price,
        //         promotion.discount_percent,
        //         promotion.begin_date,
        //         promotion.finish_date
        //     FROM 
        //         product_list_classify
        //         LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product
        //         LEFT JOIN image_product ON image_product.id_product=product_list_classify.id_product
        //         LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
        //         LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
        //         LEFT JOIN product ON product.id = product_list_classify.id_product
        //         LEFT JOIN status_product ON status_product.id = product.idstatus
        //         LEFT JOIN input_country ON input_country.id = product.madein
        //         LEFT JOIN classify ON classify.id = product_list_classify.id_classify
        //     WHERE 
        //         product_list.price BETWEEN ? AND ?
        //         AND (
        //             promotion.id IS NULL
        //             OR (promotion.begin_date <= CURDATE() AND promotion.finish_date > CURDATE())
        //         )
        //     .$type_value.";
        //     $stmt = $conn -> prepare($sql);
        //     $stmt -> execute([$min_price, $max_price, $type]);
        //     $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
        //     $stmt = null;
        //     return $result;
        // }
        public function read_data_advanced_search($conn, $key, $type, $sale, $min_price, $max_price)
        {
            $type_value = '';
            $sale_value = '';
            $key_value = '';
            $params = [$min_price, $max_price];

            if ($type != 'Tất cả') {
                $type = trim($type);
                $type_value = 'AND classify.name = ?';
                $params[] = $type;
            }
            if ($sale != 'Tất cả') {
                $sale = trim($sale);
                $sale_value = 'AND promotion.content = ?';
                $params[] = $sale;
            }
            if ($key != '') {
                $key = trim($key);
                $key_value = 'AND product.name LIKE "%' . $key . '%"';

                // $key_value = 'AND product.name like %  %';
                // $params[] = $key;
            }

            $sql = "SELECT 
                    product_list_classify.id_classify, 
                    product_list_classify.id_product,
                    product.name,
                    input_country.name AS country,
                    product.description,
                    status_product.name AS name_status,
                    product_list.id_size,
                    product_list.id_color,
                    product_list.price,
                    image_product.link_image AS link_image,
                    promotion.name AS name_promotion,
                    promotion.image,
                    promotion.content,
                    promotion.discount_price,
                    promotion.discount_percent,
                    promotion.begin_date,
                    promotion.finish_date
                FROM 
                    product_list_classify
                    LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product
                    LEFT JOIN image_product ON image_product.id_product=product_list_classify.id_product
                    LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
                    LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
                    LEFT JOIN product ON product.id = product_list_classify.id_product
                    LEFT JOIN status_product ON status_product.id = product.idstatus
                    LEFT JOIN input_country ON input_country.id = product.madein
                    LEFT JOIN classify ON classify.id = product_list_classify.id_classify
                WHERE 
                    product_list.price BETWEEN ? AND ?
                    AND (
                        promotion.id IS NULL
                        OR (promotion.begin_date <= CURDATE() AND promotion.finish_date > CURDATE())
                    ) $type_value $sale_value $key_value";
            $stmt = $conn->prepare($sql);
            $stmt->execute($params);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }


        public function read_data_all_promotion($conn)
        {
            # code...
            $sql = "SELECT 
                        promotion.id, 
                        promotion.content, 
                        promotion.name, 
                        promotion.discount_price, 		
                        promotion.discount_percent, 
                        promotion.begin_date,
                        promotion.finish_date,
                        status_promotion.name
                    FROM 
                        promotion, 
                        status_promotion

                    WHERE 
                         promotion.id_status = status_promotion.id
";
            $stmt = $conn -> prepare($sql);
            $stmt -> execute();
            $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_data_promotionById($conn, $id)
        {
            # code...
            $sql = "SELECT 
                        promotion.id, 
                        promotion.content, 
                        promotion.name, 
                        promotion.discount_price, 		
                        promotion.discount_percent, 
                        promotion.begin_date,
                        promotion.finish_date,
                        detail_promotion.id_product,
                        status_promotion.name,
                        product_list.price
                    FROM 
                        promotion, 
                        detail_promotion,
                        status_promotion,
                        product_list
                    WHERE 
                        promotion.id = detail_promotion.id_promotion
                        AND promotion.id_status = status_promotion.id
                        AND detail_promotion.id_product = product_list.id_product
                        AND detail_promotion.id_product = ?";
            $stmt = $conn -> prepare($sql);
            $stmt -> execute([$id]);
            $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        //Hoa don
        // public function read_data_receiptById($conn, $id)
        // {
        //     $sql = "SELECT * FROM receipt WHERE id_customer = ?";
        //     $stmt = $conn->prepare($sql);
        //     $stmt->execute([$id]);
        //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     $stmt = null;
        //     return $result;
        // }
        public function read_data_receiptById($conn, $id)
        {
            $sql = "SELECT 
                    receipt.id, 
                    SUM(detail_receipt.amount*detail_receipt.price) as Tong, 
                    status_receipt.name AS name_status,
                    receipt.date_init,
                    receipt.date_confirm
                FROM 
                    detail_receipt, receipt, status_receipt 
                WHERE 
                        detail_receipt.id_receipt = receipt.id
                    AND status_receipt.id = receipt.id_status
                    AND receipt.id_customer = ? ;";
            $stmt = $conn->prepare($sql);
            $stmt -> execute([$id]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_data_detail_receiptById($conn, $id)
        {
            $sql = "SELECT 
                        id_size, 
                        id_color, 
                        id_product, 
                        amount, price, 
                        (amount*price) AS Tong
                    FROM 
                        detail_receipt, receipt, status_receipt 
                    WHERE 
                            detail_receipt.id_receipt = ? 
                        AND 
                            receipt.id=detail_receipt.id_receipt
                        AND 
                            receipt.id_status = status_receipt.id";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$id]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        //San pham trong kho
        public function read_data_product_in_stockById($conn, $id_product, $id_size, $id_color)
        {
            # code...
            $sql="SELECT 
                product_in_stock.amount, 
                product_in_stock.price_input ,
                product_list.price
            FROM 
                product_in_stock, 
                product_list
            WHERE 
                product_in_stock.id_product = ? and
                product_in_stock.id_size = ? and
                product_in_stock.id_color = ? AND
                product_list.id_product = product_in_stock.id_product";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$id_product, $id_size, $id_color]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        //San pham trong gio hang
        public function read_data_cartById($conn, $id_kh)
        {
            # code...
            $sql="SELECT 
                    cart.id_product,
                    product.name, 
                    image_product.link_image,
                    product_in_stock.amount as amount_in_stock,
                    product_list.price as cost,
                    cart.id_color, 
                    cart.id_size,
                    cart.amount,
                    cart.price
                FROM cart, product, 
                    image_product, product_in_stock,
                    product_list
                WHERE cart.id_customer= ?
                    AND cart.id_product=product.id
                    AND image_product.id_product=cart.id_product
                    AND product_in_stock.id_product=cart.id_product
                    AND product_in_stock.id_size = cart.id_size
                    AND product_in_stock.id_color = cart.id_color
                    AND product_list.id_product=cart.id_product";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$id_kh]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function check_cartById($conn, $id_kh, $id_product)
        {
            # code...
            $sql="SELECT * 
                FROM cart 
                WHERE cart.id_customer = ?
                AND cart.id_product = ? ";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$id_kh, $id_product]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function insert_data_to_cartById($conn, $id_kh, $id_product, $id_color, $id_size, $amount, $price)
        {
            # code...
            $sql="INSERT INTO cart (id_customer, id_product, id_color, id_size, amount, price) 
                VALUES ( ?, ?, ?, ?, ?, ?);";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$id_kh, $id_product, $id_color, $id_size, $amount, $price]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function check_account($conn, $sdt, $username)
        {
            # code...
            $sql="SELECT * 
                FROM customer, account 
                WHERE customer.numberphone=? 
                AND account.username=?";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$sdt, $username]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        // cap nhat gio hang
        public function update_cartById($conn, $username, $product_in_cart)
        {
            # code...
            foreach ($product_in_cart as $key) {
                # code...
                $sql="UPDATE cart 
                        SET id_color = ?,
                            id_size = ?,
                            amount = ?,
                            price = ? 
                        WHERE 
                            id_customer = ? AND id_product = ?";
                $stmt=$conn->prepare($sql);
                $stmt->execute([
                    $key["id_color"],
                    $key["id_size"],
                    $key["amount"],
                    $key["price"],
                    $username,
                    $key["id_product"]]);
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $stmt = null;
            }
            return $result;
        }
        // xoa san pham trong gio 
        public function delete_product_in_cartById($conn, $username, $id_product)
        {
            # code...
            $sql="DELETE FROM cart
                WHERE cart.id_customer = ? 
                AND cart.id_product = ?";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$username, $id_product]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        // public function check_username($conn, $username)
        // {
        //     # code...
        //      $sql="SELECT username
        //      from account 
        //      where account.username = ? ";
        //     $stmt=$conn->prepare($sql);
        //     $stmt->execute([$username]);
        //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     $stmt = null;
        //     return $result;
        // }
    }
?>
