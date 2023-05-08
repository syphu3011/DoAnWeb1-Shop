<?php
     require_once("../../../init.php");
     require_once('./same_function_product.php');
     require_once('../same_function.php');
    function update_product($conn, $action) {
        try {
            // bắt đầu phiên
            $conn -> beginTransaction();
            $name = $_POST["name"];
            $id = $_POST["id"];
            $made_in = $_POST["made_in"];
            $description = $_POST["description"];
            $status = $_POST["status"];
            // Kiểm tra quyền
            $username = $_POST["id_user"];
            if (check_privilege($username, $conn, $action,'product')) {
                if (!check_name($conn, $name, $id)) {
                    die("Tên không được trùng lặp với các sản phẩm khác!");
                }
                // Kiểm tra xuất xứ
                check_input_country($conn, $made_in);
                // thiết lập query
                $query = "UPDATE product 
                SET name = :name, madein = :made_in, description = :description, idstatus = :idstatus
                WHERE id = :id";
                $stmt = $conn -> prepare($query);
                // thiết lập các biến prepare
                $stmt -> bindParam(":name", $name);
                $stmt -> bindParam(":made_in", $made_in);
                $stmt -> bindParam(":description", $description);
                $stmt -> bindParam(":idstatus", $status);
                $stmt -> bindParam(":id", $id);
                // thực thi query
                if ($stmt -> execute()) {
                    //Upload ảnh
                    // $errors= array();
                    $stmt_image = $conn->prepare("INSERT INTO image_product(id_product,link_image) VALUES(:id,:name_img)");
                    $desired_dir="../../Image";
                    $absolute_dir = realpath($desired_dir);
                    foreach($_FILES['images_ar']['tmp_name'] as $key => $tmp_name ){
                        $file_name = $key.$_FILES['images_ar']['name'][$key];
                        $file_tmp =$_FILES['images_ar']['tmp_name'][$key];
                        $file_type=$_FILES['images_ar']['type'][$key]; 
                        $name_image = $file_name;
                        if(is_dir("$desired_dir/".$file_name)==false){
                            chmod($desired_dir.'/'.$file_name, 0777);
                            move_uploaded_file($file_tmp,$desired_dir.'/'.$file_name);
                            chmod($desired_dir.'/'.$file_name, 0644);
                            //Thêm vào cơ sở dữ liệu
                            $_POST_image = ['id' => $id, 'name_img' => $name_image];
                            $stmt_image->execute($_POST_image);
                        }
                    }
                    //Xóa ảnh
                    $stmt_delete_image = $conn->prepare("DELETE FROM image_product WHERE id_product = :id_product and link_image = :link_image");
                    $image_delete = $_POST["image_delete"];
                    foreach($image_delete as $value) {
                        $data_image_delete = array('id_product' => $id, 'link_image' => $value);
                        $stmt_delete_image->execute($data_image_delete);
                        chmod($desired_dir.'/'.$file_name, 0777);
                        $delete_file_status = unlink($absolute_dir);
                        if (!$delete_file_status) {
                            chmod($desired_dir.'/'.$file_name, 0644);
                            $conn -> rollBack();
                            die ('Xóa ảnh không thành công!');
                        }
                        chmod($desired_dir.'/'.$file_name, 0644);
                    }
                }
                else {
                    $conn -> rollBack();
                    die('Có lỗi xảy ra! Dữ liệu chưa được thay đổi!');
                }
                echo 'Dữ liệu đã được thay đổi!';
                $conn -> commit();
            }
            else {
                echo 'Bạn chưa được cấp quyền!';
                $conn -> rollBack();
            }
        }
        catch (Exception $e) {
            //giao dịch thất bại, rollback
            $conn -> rollBack();
            die('Có lỗi trong quá trình thay đổi dữ liệu!');
        }
    }
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        update_product($conn,'sua');
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        update_product($conn,'xoa');
    }
?>