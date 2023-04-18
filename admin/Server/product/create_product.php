<?php
require_once("../../../init.php");
require_once("./same_function_product.php");
require_once("../same_function.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES)) {
    try {
        $conn -> beginTransaction();
        // kiểm tra quyền 
        $username = $_POST["user"]["username"];
        if (check_privilege($username, $conn, 'them','product')) {
            //Khai báo các thuộc tính sản phẩm
            $id = $_POST["product"]["id"];
            $name = $_POST["product"]["name"];
            $made_in = $_POST["product"]["made_in"];
            $description = $_POST["product"]["description"];
            $status = "TT01";
            // Kiểm tra tên
            if (!check_name($conn, $name)){
                die("Tên không được trùng lặp");
            }
            // Kiểm tra xuất xứ
            check_input_country($conn, $made_in);
            // Chuẩn bị truy vấn với prepared statement product
            $stmt = $conn->prepare("INSERT INTO product(id,name,madein,description,idstatus) VALUES(:id,:name,:made_in,:description,:status)");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':made_in', $made_in);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':status', $status);
            // Thực thi truy vấn thêm sản phẩm các thông tin chính và kiểm tra kết quả
            if ($stmt->execute()) {
                // Thành công
                $response = array('status' => 'success', 'message' => 'Data inserted.');
                echo json_encode($response);
            } else {
                // Thất bại
                $response = array('status' => 'error', 'message' => 'Failed to insert data.');
                echo json_encode($response);
                $conn -> rollBack();
            }
            //Upload ảnh
            $errors= array();
            $stmt_image = $conn->prepare("INSERT INTO image_product(id_product,link_image) VALUES(:id,:name_img)");
            $desired_dir="../../Image";
            $absolute_dir = realpath($desired_dir);
            foreach($_FILES['images_ar']['tmp_name'] as $key => $tmp_name ){
                $file_name = $key.$_FILES['images_ar']['name'][$key];
                $file_tmp =$_FILES['images_ar']['tmp_name'][$key];
                $file_type=$_FILES['images_ar']['type'][$key]; 
                $name_image = $file_name;
                echo $file_tmp;
                if(is_dir($desired_dir)==false){
                    mkdir("$desired_dir", 0700);    // Create directory if it does not exist
                }
                if(is_dir("$desired_dir/".$file_name)==false){
                    move_uploaded_file($file_tmp,$desired_dir.'/'.$file_name);
                    chmod($desired_dir.'/'.$file_name, 0644);
                }else{                  
                    //đặt tên lại khi trùng lặp
                    $new_dir=$desired_dir.'/'.$file_name.time();
                    rename($file_tmp,$new_dir) ;   
                    $name_image .= time();
                    chmod($desired_dir.'/'.$file_name, 0644);      
                }
                //Thêm vào cơ sở dữ liệu
                $_POST_image = ['id' => $id, 'name_img' => $name_image];
                $stmt_image->execute($_POST_image);
            }
            //Thêm loại
            $stmt_classify = $conn->prepare("INSERT INTO product_list_classify(id_product,id_classify) VALUES (:id_product_arg,:id_classify_arg)");
            if (is_array($_POST["product"]['clasify'])) {
                foreach($_POST["product"]["clasify"] as $key) {
                    $_POST_classify = ['id_product_arg' => $id, 'id_classify_arg' => $key];
                    $stmt_classify->execute($_POST_classify);
                }
            }
            else {
                $_POST_classify = ['id_product_arg' => $id, 'id_classify_arg' => $_POST["product"]["clasify"]];
                $stmt_classify->execute($_POST_classify);
            }
            echo "okokokok";
            $conn -> commit();
        }
        else {
            $conn->rollBack();
            die("Bạn không có quyền về thao tác này");
        }
    }
    catch(Exception $e) {
        $response = array('status' => 'error', 'message' => 'Thất bại');
        // echo json_encode($response);
        echo "Thua";
        $conn -> rollBack();
    }
} else {
    $response = array('status' => 'error', 'message' => 'Invalid request method.');
    // echo json_encode($response);
    echo "Thua luôn";
    $conn -> rollBack();
}
?>