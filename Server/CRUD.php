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

        public function read_image_productByProductId($conn, $idproduct) {
            $sql="SELECT link_image, name_image FROM image_product WHERE id_product= :idproduct";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(":idproduct", $idproduct);
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
            $sql="SELECT id_size, price, id_color FROM product_list WHERE id_product= :idproduct";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(":idproduct", $idproduct);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }

        public function read_data_receiptById($conn, $id)
        {
            # code...
            $sql = "SELECT * FROM `receipt` WHERE `id_customer`= :id";
            $stmt = $conn->prepare($sql);
            $stmt = bindParam(":id",$id);
            $stmt -> excute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
            return $result;
        }
    }
?>
