<?php
require_once("../../../init.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        // Chuẩn bị truy vấn với prepared statement product
        $stmt = $conn->prepare("INSERT INTO product(id,name,madein,description,idstatus) VALUES(:id,:name,:made_in,:description,:status)");
        // $id = $data["id"];
        // $name = $data["name"];
        // $made_in = $data["made_in"];
        // $description = $data["description"];
        // $status = "TT01";
        // $stmt->bindParam(':val1', $id);
        // $stmt->bindParam(':val2', $name);
        // $stmt->bindParam(':val3', $made_in);
        // $stmt->bindParam(':val4', $description);
        // $stmt->bindParam(':val5', $status);
        //Upload ảnh
        $errors= array();
        $stmt_image = $conn->prepare("INSERT INTO product(id_product,link_image) VALUES(:id,:name)");
        $desired_dir="../../Image/";
        foreach($data['images']['tmp_name'] as $key => $tmp_name ){
            $file_name = $key.$data['images']['name'][$key];
            $file_tmp =$data['images']['tmp_name'][$key];
            $file_type=$data['images']['type'][$key]; 
            
            $name_image = $file_name;
            if(is_dir($desired_dir.$file_name)==false){
                move_uploaded_file($file_tmp,$desired_dir.$file_name);
            }else{                  
                //đặt tên lại khi trùng lặp
                $new_dir=$desired_dir.$file_name.time();
                rename($file_tmp,$new_dir) ;   
                $name_image .= time();      
            }
            //Thêm vào cơ sở dữ liệu
            $data_image = ['id' => $id, 'name' => $name];
            $stmt_image->execute($data_image);
        }
        //Thêm loại
        $stmt_classify = $conn->prepare("INSERT INTO product_list_classify(id_product,id_classify) VALUES (:id_product,:id_classify)");
        foreach($data["clasify"] as $key) {
            $data_classify = ['id_product' => $id, 'id_classify' => $key];
            $stmt_classify->execute($data_classify);
        }
        // Thực thi truy vấn thêm sản phẩm các thông tin chính và kiểm tra kết quả
        if ($stmt->execute()) {
            // Thành công
            $response = array('status' => 'success', 'message' => 'Data inserted.');
            echo json_encode($response);
        } else {
            // Thất bại
            $response = array('status' => 'error', 'message' => 'Failed to insert data.');
            echo json_encode($response);
        }
    }
    catch(Exception $e) {
        die($e);
    }
} else {
    $response = array('status' => 'error', 'message' => 'Invalid request method.');
    echo json_encode($response);
}
?>