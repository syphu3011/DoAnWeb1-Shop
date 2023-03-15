<?php
    if ($_SERVER('REQUEST_METHOD') == 'GET') {
        $query = "SELECT id, name, madein made_in, description, idstatus, GROUP_CONCAT(DISTINCT id_classify SEPARATOR ',') clasify,GROUP_CONCAT(DISTINCT link_image SEPARATOR ',') images, MIN(price) price
        FROM product 
        left join image_product on id = image_product.id_product 
        left join product_list_classify on id = product_list_classify.id_product 
        left join product_list on id = product_list.id_product 
        group by id
    ";

    }
?>