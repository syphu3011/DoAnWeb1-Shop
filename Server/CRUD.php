<?php
class CRUD
{
    // read
    public function read_data_homepage($conn){
        $sql = "SELECT DISTINCT classify.id_big_classify,product.idstatus,
	product.name,
                    classify.id,
                    promotion.name AS name_promotion,
                    classify.name AS name_classify,
                    product_list_classify.id_product,
                    product_list.price,
                    (
                	SELECT image_product.link_image 
                    FROM image_product
                    WHERE image_product.id_product=product.id
                    limit 1
                ) AS link_image,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.name
                        ELSE NULL 
                    END AS name_promotion,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.image
                        ELSE NULL 
                    END AS image,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.content
                        ELSE NULL 
                    END AS content,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.discount_price
                        ELSE NULL 
                    END AS discount_price,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.discount_percent
                        ELSE NULL 
                    END AS discount_percent,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.begin_date
                        ELSE NULL 
                    END AS begin_date,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.finish_date
                        ELSE NULL 
                    END AS finish_date
                FROM 
                                                classify
                                LEFT JOIN product_list_classify ON product_list_classify.id_classify=classify.id
                                LEFT JOIN product_list ON product_list.id_product = product_list_classify.id_product
				LEFT JOIN product ON product.id = product_list_classify.id_product

                LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
                LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
                WHERE 
                    product.idstatus = 'TT01'
                    AND product_list.id_size IS NOT NULL
                    AND product_list.id_color IS NOT NULL
                ORDER BY product_list.price
            ";
                // -- GROUP BY product_list_classify.id_product

            $stmt = $conn -> prepare($sql);
            $stmt -> execute();
            $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
            $conn = null;
            return $result;
    }
    //Tai khoan
    public function read_data_account($conn, $username, $password, &$status)
    {
        $sql = "SELECT * FROM account WHERE username = ? AND password= ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$username, $password]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $status = $stmt->rowCount() > 0;
        $stmt = null;
        return $result;
    }

    public function read_data_customer($conn, $iduser)
    {
        $sql = "SELECT * FROM `customer` WHERE `id_user` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$iduser]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }

    public function read_data_staff($conn, $iduser)
    {
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
        $sql = "SELECT * FROM classify WHERE id_big_classify is NULL";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }

    //Loai san pham

    public function read_data_mini_classifyById($conn, $id)
    {
        # code...
        $sql = "SELECT * 
                    FROM classify
                    WHERE id_big_classify = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function read_data_classify($conn)
    {
        # code...
        $sql = "SELECT * 
            FROM classify 
            WHERE classify.id_big_classify IS NOT NULL";
        $stmt = $conn -> prepare($sql);
        $stmt->execute();
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
    public function read_productById($conn, $id)
    {
        $sql = "SELECT * FROM product WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    //lay du lieu san pham theo gioi tinh, ma loai
    public function read_productByIdClassify($conn, $gender, $id_classify, $begin, $total)
    {
        $sql = "SELECT 
	product.name,
                    classify.name AS name_classify,
                    product_list_classify.id_product,
                    product_list.id_size,
                    product_list.price,
                    (
                	SELECT image_product.link_image 
                    FROM image_product
                    WHERE image_product.id_product = product.id
                    limit 1
                ) AS link_image,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.name
                        ELSE NULL 
                    END AS name_promotion,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.image
                        ELSE NULL 
                    END AS image,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.content
                        ELSE NULL 
                    END AS content,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.discount_price
                        ELSE NULL 
                    END AS discount_price,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.discount_percent
                        ELSE NULL 
                    END AS discount_percent,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.begin_date
                        ELSE NULL 
                    END AS begin_date,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.finish_date
                        ELSE NULL 
                    END AS finish_date
                FROM 
                                                classify
                                LEFT JOIN product_list_classify ON product_list_classify.id_classify=classify.id
                                LEFT JOIN product_list ON product_list.id_product = product_list_classify.id_product
				LEFT JOIN product ON product.id = product_list_classify.id_product
                LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
                LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
                WHERE 
                    product.idstatus = 'TT01'
                    AND product_list.id_size IS NOT NULL
                    AND product_list.id_color IS NOT NULL
                    AND classify.gender = '$gender'
                    AND classify.id = '$id_classify'
                        LIMIT $begin, $total
                    "; 
                    // echo $sql;
                    // echo 'lll';
        $stmt = $conn->prepare($sql);
        // $stmt->execute([$gender, $id_classify, (int)$begin, (int)$total]);
        // $stmt->bind_param($gender, $id_classify, (int)$begin, (int)$total);
        $stmt->execute();
//         echo "<pre>";
// $stmt->debugDumpParams();
// echo "</pre>";
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function read_productByIdLarge_classify($conn, $id_large_classify, $begin, $total_product_on_page)
    {
        $sql = "SELECT product.idstatus,
	product.name,
                    classify.id,
                    classify.name AS name_classify,
                    product_list_classify.id_product,
                    product_list.id_size,
                    product_list.id_size,
                    product_list.price,
                    (
                	SELECT image_product.link_image 
                    FROM image_product
                    WHERE image_product.id_product=product.id
                    limit 1
                ) AS link_image,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.name
                        ELSE NULL 
                    END AS name_promotion,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.image
                        ELSE NULL 
                    END AS image,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.content
                        ELSE NULL 
                    END AS content,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.discount_price
                        ELSE NULL 
                    END AS discount_price,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.discount_percent
                        ELSE NULL 
                    END AS discount_percent,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.begin_date
                        ELSE NULL 
                    END AS begin_date,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.finish_date
                        ELSE NULL 
                    END AS finish_date
                FROM 
                                                classify
                                LEFT JOIN product_list_classify ON product_list_classify.id_classify=classify.id
                                LEFT JOIN product_list ON product_list.id_product = product_list_classify.id_product
				LEFT JOIN product ON product.id = product_list_classify.id_product

                LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
                LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
                WHERE 
                    classify.id_big_classify = ?
                    AND product.idstatus = 'TT01'
                    AND product_list.id_size IS NOT NULL
                    AND product_list.id_color IS NOT NULL
                GROUP BY product_list_classify.id_product
                LIMIT ".$begin.", ". $total_product_on_page;
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id_large_classify]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function read_productByIdLarge_classify_pagination($conn, $id_large_classify)
    {
        $sql = "SELECT COUNT(*)
                FROM 
                                                classify
                                LEFT JOIN product_list_classify ON product_list_classify.id_classify=classify.id
                                LEFT JOIN product_list ON product_list.id_product = product_list_classify.id_product
				LEFT JOIN product ON product.id = product_list_classify.id_product

                LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
                LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
                WHERE 
                    classify.id_big_classify = ?
                    AND (
                        (promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10')
                        OR promotion.id IS NULL)
                    AND product.idstatus = 'TT01'
                    AND product_list.id_size IS NOT NULL
                GROUP BY product_list_classify.id_product";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id_large_classify]);
        // $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result = $stmt->rowCount();
        $stmt = null;
        return $result;
    }
    public function read_data_product($conn)
    {
        $sql = "SELECT * FROM product ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }

    public function read_image_productByProductId($conn, $idproduct)
    {
        $sql =
            "SELECT link_image, name_image FROM image_product WHERE id_product= :idproduct";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":idproduct", $idproduct);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function read_data_image_product($conn)
    {
        $sql = "SELECT * FROM image_product";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function read_input_countryById($conn, $id_country)
    {
        $sql = "SELECT ic.name FROM input_country ic WHERE id = :id_country";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":id_country", $id_country);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function read_product_listByProductId($conn, $idproduct)
    {
        $sql = "SELECT id_size, price, id_color 
            FROM product_list 
            WHERE id_product = ?";
        $stmt = $conn->prepare($sql);
        // $stmt->bindParam(":idproduct", $idproduct);
        $stmt->execute([$idproduct]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function read_data_product_list($conn)
    {
        $sql = "SELECT * FROM product_list ORDER BY product_list.price";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    //Khuyen mai
    public function read_data_promotion($conn)
    {
        # code...
        $sql = "SELECT * 
                FROM promotion
                WHERE promotion.finish_date >= CURRENT_DATE()
                AND promotion.id_status = 'TT10'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
                (
                    (promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10')
                OR promotion.id IS NULL)
            ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
    public function read_data_advanced_search(
        $conn,
        $type,
        $sale,
        $key,
        $min_price,
        $max_price,
        $begin,
        $total_product_on_page
    ) {
        $type_value = $type;
        $sale_value = "";
        $key_value = $key;
        // $params = [$min_price, $max_price, $type, $sale, $key, $begin, $amount];
        if ($type == "Tất cả") {
            $type_value = "% %";
            // $params[] = $type;
        }
        if ($sale != "Tất cả") {
            // $sale = trim($sale);
            $sale_value = "AND promotion.name = '" . $sale ."'";
            // $params[] = $sale;
        }
        // if ($key == '') {
        //     // $k÷ey = trim($key);
        $key_value = "%" . $key . "%";
        $params = "LIMIT " . (int)$begin . ", " . (int)$total_product_on_page;
        // $params[]=$amount;
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
                   (
                    SELECT image_product.link_image 
                    FROM image_product
                    WHERE image_product.id_product=product.id
                    LIMIT 1
                        ) AS link_image,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.name
                        ELSE NULL 
                    END AS name_promotion,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.image
                        ELSE NULL 
                    END AS image,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.content
                        ELSE NULL 
                    END AS content,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.discount_price
                        ELSE NULL 
                    END AS discount_price,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.discount_percent
                        ELSE NULL 
                    END AS discount_percent,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.begin_date
                        ELSE NULL 
                    END AS begin_date,
                    CASE 
                        WHEN promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10' 
                            THEN promotion.finish_date
                        ELSE NULL 
                    END AS finish_date
               FROM 
                   product_list_classify
                   LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product

                   LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
                   LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
                   LEFT JOIN product ON product.id = product_list_classify.id_product
                   LEFT JOIN status_product ON status_product.id = product.idstatus
                   LEFT JOIN input_country ON input_country.id = product.madein
                   LEFT JOIN classify ON classify.id = product_list_classify.id_classify
               WHERE 
                    product_list.price BETWEEN '$min_price' AND '$max_price'
                    AND product_list.id_size IS NOT NULL
                    AND product_list.id_color IS NOT NULL
                    AND classify.name LIKE '$type_value'
                    $sale_value
                    AND product.name LIKE '$key_value'
                $params
                    ";
        $stmt = $conn->prepare($sql);
        // $stmt->execute([$min_price, $max_price, $type_value, $key_value]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        // echo $sql;
        return $result;
    }
    // public function read_data_advanced_search(
    //     $conn,
    //     $type,
    //     $sale,
    //     $key,
    //     $min_price,
    //     $max_price,
    //     $begin,
    //     $total_product_on_page
    // ) {
    //     $type_value = $type;
    //     $sale_value = '';
    //     $key_value = $key;
    //     // $params = [$min_price, $max_price, $type, $sale, $key, $begin, $amount];
    //     if ($type == "Tất cả") {
    //         $type_value = "% %";
    //         // $params[] = $type;
    //     }
    //     // if ($sale == "Tất cả") {
    //     //     $sale_value = "% %";
    //     //     // $params[] = $type;
    //     // }
    //     if ($sale != "Tất cả") {
    //         // $sale = trim($sale);
    //         $sale_value = "AND promotion.content LIKE '". $sale ."'";
    //         // $params[] = $sale;
    //     }
    //     // if ($key == '') {
    //     //     // $k÷ey = trim($key);
    //     $key_value = "%" . $key . "%";
    //     $params = "LIMIT " . $begin . "," . $total_product_on_page;
    //     // $params[]=$amount;
    //     $sql1 = "SELECT 
    //                product_list_classify.id_classify, 
    //                product_list_classify.id_product,
    //                product.name,
    //                input_country.name AS country,
    //                product.description,
    //                status_product.name AS name_status,
    //                product_list.id_size,
    //                product_list.id_color,
    //                product_list.price,
    //               (
    //             	SELECT image_product.link_image 
    //                 FROM image_product
    //                 WHERE image_product.id_product=product.id
    //                 limit 1
    //             ) AS link_image,
    //                promotion.name AS name_promotion,
    //                promotion.image,
    //                promotion.content,
    //                promotion.discount_price,
    //                promotion.discount_percent,
    //                promotion.begin_date,
    //                promotion.finish_date
    //            FROM 
    //                product_list_classify
    //                LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product
    //                LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
    //                LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
    //                LEFT JOIN product ON product.id = product_list_classify.id_product
    //                LEFT JOIN status_product ON status_product.id = product.idstatus
    //                LEFT JOIN input_country ON input_country.id = product.madein
    //                LEFT JOIN classify ON classify.id = product_list_classify.id_classify
    //            WHERE 
    //                 product_list.price BETWEEN ? AND ?
    //                 AND (
    //                     (promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10')
    //                 OR promotion.id IS NULL)
    //                 AND classify.name LIKE ?
    //                 AND promotion.content LIKE ?
    //                 AND product.name LIKE ?
    //                 LIMIT ?, ?
    //                 ";
    //     $sql2 = "SELECT 
    //                product_list_classify.id_classify, 
    //                product_list_classify.id_product,
    //                product.name,
    //                input_country.name AS country,
    //                product.description,
    //                status_product.name AS name_status,
    //                product_list.id_size,
    //                product_list.id_color,
    //                product_list.price,
    //               (
    //             	SELECT image_product.link_image 
    //                 FROM image_product
    //                 WHERE image_product.id_product=product.id
    //                 limit 1
    //             ) AS link_image,
    //                promotion.name AS name_promotion,
    //                promotion.image,
    //                promotion.content,
    //                promotion.discount_price,
    //                promotion.discount_percent,
    //                promotion.begin_date,
    //                promotion.finish_date
    //            FROM 
    //                product_list_classify
    //                LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product
    //                LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
    //                LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
    //                LEFT JOIN product ON product.id = product_list_classify.id_product
    //                LEFT JOIN status_product ON status_product.id = product.idstatus
    //                LEFT JOIN input_country ON input_country.id = product.madein
    //                LEFT JOIN classify ON classify.id = product_list_classify.id_classify
    //            WHERE 
    //                 product_list.price BETWEEN ? AND ?
    //                 AND (
    //                     (promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10')
    //                 OR promotion.id IS NULL)
    //                 AND classify.name LIKE ?
    //                 AND product.name LIKE ?
    //                 LIMIT ?, ?
    //                 ";
    //                 // echo $min_price;
    //                 // echo $max_price;
    //                 // echo $type_value;
    //                 // echo $key_value;
    //                 // echo $begin;
    //                 // echo $total_product_on_page;
    //                 // echo $sql;
        
    //     // $stmt->bindParam('iiisssssss', $min_price, $max_price, $type_value, $key_value, $begin, $total_product_on_page);
    //     $sql3 = "SELECT 
    //     product_list_classify.id_classify, 
    //     product_list_classify.id_product,
    //     product.name,
    //     input_country.name AS country,
    //     product.description,
    //     status_product.name AS name_status,
    //     product_list.id_size,
    //     product_list.id_color,
    //     product_list.price,
    //    (
    //      SELECT image_product.link_image 
    //      FROM image_product
    //      WHERE image_product.id_product=product.id
    //      limit 1
    //  ) AS link_image,
    //     promotion.name AS name_promotion,
    //     promotion.image,
    //     promotion.content,
    //     promotion.discount_price,
    //     promotion.discount_percent,
    //     promotion.begin_date,
    //     promotion.finish_date
    // FROM 
    //     product_list_classify
    //     LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product
    //     LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
    //     LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
    //     LEFT JOIN product ON product.id = product_list_classify.id_product
    //     LEFT JOIN status_product ON status_product.id = product.idstatus
    //     LEFT JOIN input_country ON input_country.id = product.madein
    //     LEFT JOIN classify ON classify.id = product_list_classify.id_classify
    // WHERE 
    //      product_list.price BETWEEN 0 AND 10000000
    //      AND (
    //          (promotion.finish_date >= CURRENT_DATE() AND promotion.id_status='TT10')
    //      OR promotion.id IS NULL)
    //      AND classify.name LIKE '%%'
    //      AND promotion.content LIKE 'Giảm 25%'
    //      AND product.name LIKE '%%'
    //      LIMIT 0, 12
    //      ";
    //     if ($sale != "Tất cả") {
    //         // $sale = trim($sale);
    //         // echo 'okkkkk1';
    //         // $response = $conn->query($sql3);
    //         // $result = $response -> fetchAll(PDO::FETCH_ASSOC);
    //         // echo $result;
    //         $_begin = (int)$begin;
    //         $_total_product_on_page = (int)$total_product_on_page;
    //         $stmt = $conn->prepare($sql1);
    //         $stmt -> bindParam(1, $min_price);
    //         $stmt -> bindParam(2, $max_price);
    //         $stmt -> bindParam(3, $type_value);
    //         $stmt -> bindParam(4, $sale);
    //         $stmt -> bindParam(5, $key_value);
    //         $stmt -> bindParam(6, $_begin, PDO::PARAM_INT);
    //         $stmt -> bindParam(7, $_total_product_on_page, PDO::PARAM_INT);
    //         $stmt->execute();
    //         // $params[] = $sale;
    //     }
    //     else {
    //         // echo 'okkkkk12';
    //         $stmt = $conn->prepare($sql2);
    //         $stmt->execute([$min_price, $max_price, $type_value, $key_value, $begin, $total_product_on_page]);
    //     }
    //     // echo 'okkkkk13';
    //         // $stmt->execute        
    //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     $stmt = null;
    //     return $result;
    // }
    public function read_data_advanced_search_pagination(
        $conn,
        $type,
        $sale,
        $key,
        $min_price,
        $max_price
    ) {
        $type_value = $type;
        $sale_value = "";
        $key_value = $key;
        // $params = [$min_price, $max_price, $type, $sale, $key, $begin, $amount];
        if ($type == "Tất cả") {
            $type_value = "% %";
            // $params[] = $type;
        }
        if ($sale != "Tất cả") {
            // $sale = trim($sale);
            $sale_value = "AND promotion.content = '" . $sale ."'";
            // $params[] = $sale;
        }
        // if ($key == '') {
        //     // $k÷ey = trim($key);
        $key_value = "%" . $key . "%";

        // $params[]=$amount;
        $sql = "SELECT 
                   COUNT(*) AS count
               FROM 
                   product_list_classify
                   LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product

                   LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
                   LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
                   LEFT JOIN product ON product.id = product_list_classify.id_product
                   LEFT JOIN status_product ON status_product.id = product.idstatus
                   LEFT JOIN input_country ON input_country.id = product.madein
                   LEFT JOIN classify ON classify.id = product_list_classify.id_classify
               WHERE 
                    product_list.price BETWEEN '$min_price' AND '$max_price'
                    AND classify.name LIKE '$type_value'
                    $sale_value
                    AND product.name LIKE '$key_value'
                    ";
        $stmt = $conn->prepare($sql);
        // $stmt->execute([$min_price, $max_price, $type_value, $key_value]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        // echo $sql;
        return $result[0]["count"];
    }

    //    public function read_data_advanced_search($conn, $key, $type, $sale, $min_price, $max_price, $begin, $amount)
    // {
    //     $type_value = '';
    //     $sale_value = '';
    //     $key_value = '';
    //     $params = [$min_price, $max_price];
    //     if ($type != 'Tất cả') {
    //         $type = trim($type);
    //         $type_value = 'AND classify.name = ?';
    //         $params[] = $type;
    //     }
    //     if ($sale != 'Tất cả') {
    //         $sale = trim($sale);
    //         $sale_value = 'AND promotion.content = ?';
    //         $params[] = $sale;
    //     }
    //     if ($key != '') {
    //         $key = trim($key);
    //         $key_value = 'AND product.name LIKE "%' . $key . '%"';

    //         // $key_value = 'AND product.name like %  %';
    //         // $params[] = $key;
    //     }
    //     $params[]=$begin;
    //     $params[]=$amount;
    //     $sql = "SELECT
    //             product_list_classify.id_classify,
    //             product_list_classify.id_product,
    //             product.name,
    //             input_country.name AS country,
    //             product.description,
    //             status_product.name AS name_status,
    //             product_list.id_size,
    //             product_list.id_color,
    //             product_list.price,
    //             image_product.link_image AS link_image,
    //             promotion.name AS name_promotion,
    //             promotion.image,
    //             promotion.content,
    //             promotion.discount_price,
    //             promotion.discount_percent,
    //             promotion.begin_date,
    //             promotion.finish_date
    //         FROM
    //             product_list_classify
    //             LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product
    //             LEFT JOIN image_product ON image_product.id_product=product_list_classify.id_product
    //             LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
    //             LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
    //             LEFT JOIN product ON product.id = product_list_classify.id_product
    //             LEFT JOIN status_product ON status_product.id = product.idstatus
    //             LEFT JOIN input_country ON input_country.id = product.madein
    //             LEFT JOIN classify ON classify.id = product_list_classify.id_classify
    //         WHERE
    //             product_list.price BETWEEN ? AND ?
    //             AND (
    //                 promotion.id IS NULL
    //                 OR (promotion.begin_date <= CURDATE() AND promotion.finish_date > CURDATE())
    //             ) $type_value $sale_value $key_value AND LIMIT ?, ?";
    //     $stmt = $conn->prepare($sql);
    //     $stmt->execute($params);
    //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     $stmt = null;
    //     return $result;
    //     // return $sql;
    // }
    // public function
    //     read_data_advanced_search_pagination(
    //         $conn,
    //         $key, $type, $sale,
    //         $min_price, $max_price,
    //         $begin
    //     )
    // {
    //     $type_value = '';
    //     $sale_value = '';
    //     $key_value = '';
    //     $params = [$min_price, $max_price];

    //     if ($type != 'Tất cả') {
    //         $type = trim($type);
    //         $type_value = 'AND classify.name = ?';
    //         $params[] = $type;
    //     }
    //     if ($sale != 'Tất cả') {
    //         $sale = trim($sale);
    //         $sale_value = 'AND promotion.content = ?';
    //         $params[] = $sale;
    //     }
    //     if ($key != '') {
    //         $key = trim($key);
    //         $key_value = 'AND product.name LIKE "%' . $key . '%"';

    //         // $key_value = 'AND product.name like %  %';
    //         // $params[] = $key;
    //     }

    //     $sql = "SELECT
    //             product_list_classify.id_classify,
    //             product_list_classify.id_product,
    //             product.name,
    //             input_country.name AS country,
    //             product.description,
    //             status_product.name AS name_status,
    //             product_list.id_size,
    //             product_list.id_color,
    //             product_list.price,
    //             image_product.link_image AS link_image,
    //             promotion.name AS name_promotion,
    //             promotion.image,
    //             promotion.content,
    //             promotion.discount_price,
    //             promotion.discount_percent,
    //             promotion.begin_date,
    //             promotion.finish_date
    //         FROM
    //             product_list_classify
    //             LEFT JOIN product_list ON product_list_classify.id_product=product_list.id_product
    //             LEFT JOIN image_product ON image_product.id_product=product_list_classify.id_product
    //             LEFT JOIN detail_promotion ON detail_promotion.id_product = product_list.id_product
    //             LEFT JOIN promotion ON promotion.id = detail_promotion.id_promotion
    //             LEFT JOIN product ON product.id = product_list_classify.id_product
    //             LEFT JOIN status_product ON status_product.id = product.idstatus
    //             LEFT JOIN input_country ON input_country.id = product.madein
    //             LEFT JOIN classify ON classify.id = product_list_classify.id_classify
    //         WHERE
    //             product_list.price BETWEEN ? AND ?
    //             AND (
    //                 promotion.id IS NULL
    //                 OR (promotion.begin_date <= CURDATE() AND promotion.finish_date > CURDATE())
    //             ) $type_value $sale_value $key_value";
    //     $stmt = $conn->prepare($sql);
    //     $stmt->execute($params);
    //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     $stmt = null;
    //     return $result;
    // }

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
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
                        AND promotion.finish_date > CURRENT_DATE()
                        AND promotion.id_status = status_promotion.id
                        AND detail_promotion.id_product = product_list.id_product
                        AND detail_promotion.id_product = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
                    receipt.date_confirm,
                    receipt.address
                FROM 
                    detail_receipt, receipt, status_receipt 
                WHERE 
                        detail_receipt.id_receipt = receipt.id
                    AND status_receipt.id = receipt.id_status
                    AND receipt.id_customer = ? ;
                    AND ";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
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
                amount, 
                price, 
                (amount * price) AS Tong, 
                (
                    SELECT 
                    image_product.link_image 
                    FROM 
                    image_product 
                    WHERE 
                    image_product.id_product = detail_receipt.id_product 
                    LIMIT 
                    1
                ) AS link_image ,
                product.name,
                color.name AS name_color
                FROM 
                detail_receipt 
                LEFT JOIN receipt ON receipt.id = detail_receipt.id_receipt 
                LEFT JOIN status_receipt ON receipt.id_status = status_receipt.id 
                LEFT JOIN product ON product.id = detail_receipt.id_product
                LEFT JOIN color ON detail_receipt.id_color = color.id
                WHERE 
                detail_receipt.id_receipt = ?

";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    //San pham trong kho
    public function read_data_product_in_stockById(
        $conn,
        $id_product,
        $id_size,
        $id_color
    ) {
        # code...
        $sql = "SELECT 
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
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id_product, $id_size, $id_color]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    //San pham trong gio hang
    public function read_data_cartById($conn, $id_kh)
    {
        # code...
        $sql = "SELECT cart.id_product,
            product_list.id_size,
            product_list.id_color,
            product.name, 
                            (
                            SELECT image_product.link_image 
                            FROM image_product
                            WHERE image_product.id_product=product.id
                            limit 1
                        ) AS link_image,
                        product_in_stock.amount as amount_in_stock,
                            product_list.price as cost,
                            cart.id_color, 
                            cart.id_size,
                            cart.amount,
                            cart.price
        FROM cart
        LEFT JOIN product ON product.id = cart.id_product
        LEFT JOIN product_list ON product_list.id_product = cart.id_product 
            AND product_list.id_size = cart.id_size
            AND product_list.id_color = cart.id_color
        LEFT JOIN product_in_stock ON product_in_stock.id_product = cart.id_product
            AND product_in_stock.id_size = cart.id_size
            AND product_in_stock.id_color = cart.id_color
        WHERE cart.id_customer = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id_kh]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    // check
    public function check_cartById($conn, $id_kh, $id_product)
    {
        # code...
        $sql = "SELECT * 
                FROM cart 
                WHERE cart.id_customer = ?
                AND cart.id_product = ? ";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id_kh, $id_product]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function check_number_phone_when_update($conn, $id_customer, $number_phone)
    {
        # code...
        $sql = "SELECT COUNT(*) AS count
            FROM customer
            WHERE customer.id != '$id_customer'
            AND customer.numberphone = '$number_phone'";
        // echo $sql;
        $stmt = $conn -> prepare($sql);
        $stmt -> execute();
        $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        // echo $sql;
        // echo "/n";
        return $result[0]["count"];
    }
    public function check_password($conn, $customer)
    {
        # code...
        $sql = "SELECT * 
            FROM customer, account
            WHERE account.id_user = customer.id_user
            AND customer.id = '".$customer['id']."'
            AND account.password = '" .$customer['lastpassword']."';'";
        // $sql = "SELECT * 
        //     FROM customer, account
        //     WHERE account.id_user = customer.id_user
        //     AND customer.id = :id
        //     AND account.password = :lastpassword";
        //     echo $customer['id'];

            $stmt = $conn -> prepare($sql);
            // echo json_encode($customer);
            // $stmt -> execute($customer);
            $stmt->execute();
            // $stmt->execute([
            //     ':id' => $customer['id'],
            //     ':lastpassword' => $customer['lastpassword']
            // ]);
            // echo json_encode($customer);

            $result = $stmt -> rowCount();
            // echo $sql;
            $stmt = null;
            return $result;
    }
    public function insert_data_to_cartById(
        $conn,
        $id_kh,
        $id_product,
        $id_color,
        $id_size,
        $amount,
        $price
    ) {
        # code...
        $sql = "INSERT INTO cart (id_customer, id_product, id_color, id_size, amount, price) 
                VALUES ( ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            $id_kh,
            $id_product,
            $id_color,
            $id_size,
            $amount,
            $price,
        ]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt = null;
        return $result;
    }
    public function check_account($conn, $sdt, $username)
    {
        # code...
        $sql = "SELECT * 
                FROM customer, account 
                WHERE customer.numberphone=? 
                AND account.username=?";
        $stmt = $conn->prepare($sql);
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
            $sql = "UPDATE cart 
                        SET id_color = ?,
                            id_size = ?,
                            amount = ?,
                            price = ? 
                        WHERE 
                            id_customer = ? AND id_product = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                $key["id_color"],
                $key["id_size"],
                $key["amount"],
                $key["price"],
                $username,
                $key["id_product"],
            ]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt = null;
        }
        return $result;
    }
    public function update_customer($conn, $customer)
    {
        $sql = "UPDATE customer 
                JOIN account ON account.id_user = customer.id_user
                SET     
                    account.password = IF(NULLIF(:password, '') IS NOT NULL, :password, password),
                    name = IF(NULLIF(:name, '') IS NOT NULL, :name, name),
                    birthday = IF(NULLIF(:birthday, '') IS NOT NULL, :birthday, birthday),
                    numberphone = IF(NULLIF(:numberphone, '') IS NOT NULL, :numberphone, numberphone),
                    image = IF(NULLIF(:image, '') IS NOT NULL, :image, image),
                    address = IF(NULLIF(:address, '') IS NOT NULL, :address, address),
                    gender = IF(NULLIF(:gender, '') IS NOT NULL, :gender, gender)
                WHERE id = :id";
                
        $stmt = $conn->prepare($sql);
        $stmt->execute($customer);
        $result = $stmt->rowCount();
        $stmt = null;
        return $result;
    }


    // xoa san pham trong gio
    public function delete_product_in_cartById($conn, $username, $id_product)
{
    $where_sql = "";
    for ($i=0; $i < count($id_product); $i++) { 
        $where_sql .= "'".$id_product[$i] ."', ";
    }
    $where_sql = rtrim($where_sql, ", ");
    $sql = "DELETE FROM cart
            WHERE cart.id_customer = ? 
            AND id_product IN (". $where_sql .")";
            // echo $sql;
    $stmt = $conn->prepare($sql);
    $stmt->execute([$username]);
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
