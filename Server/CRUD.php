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
        public function read_data_product($conn) {
            $sql="SELECT * FROM product";
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
            $sql="SELECT id_size, price, id_color FROM product_list WHERE id_product = :idproduct";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(":idproduct", $idproduct);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
        public function read_data_product_list($conn) {
            $sql="SELECT * FROM product_list";
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
            $sql="SELECT pis.amount, pis.price_input FROM product_in_stock pis 
                    where id_product = ? and
                        id_size = ? and
                        id_color = ? ";
            $stmt=$conn->prepare($sql);
            $stmt->execute([$id_product, $id_size, $id_color]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
    }
?>
