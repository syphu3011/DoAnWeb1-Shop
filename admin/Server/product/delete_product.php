<?php
     require_once("../../../init.php");
     require_once('./same_function_product.php');
     require_once('../same_function.php');
    function delete_product($conn, $action) {
        try {
            // bắt đầu phiên
            $conn -> beginTransaction();
            $id = $_POST["id"];
            // Kiểm tra quyền
            $id_user = $_POST["id_user"];
            if ($id_user == null) {
                $data_json = json_decode(file_get_contents('php://input'), true);
                $id_user = $data_json['id_user'];
                $id = $data_json['id'];
            }
            if (check_privilege($id_user, $conn, $action,'product')) {
                $query_delete_classify = 'DELETE FROM product_list_classify WHERE id_product = :id';
                $query_get_image = 'SELECT link_image FROM image_product WHERE id_product = :id';
                $query_delete_image = 'DELETE FROM image_product WHERE id_product = :id';
                $query_delete_product = 'DELETE FROM product WHERE id = :id';
                // Xóa loại
                $stmt_delete_classify = $conn -> prepare($query_delete_classify);
                $stmt_delete_classify -> bindParam(':id', $id);
                $stmt_delete_classify -> execute();
                // Lấy tên ảnh và xóa ảnh 
                $stmt_get_image = $conn -> prepare($query_get_image);
                $stmt_get_image -> bindParam(":id", $id);
                $stmt_get_image -> execute();
                $images_name = $stmt_get_image -> fetchAll(PDO::FETCH_ASSOC);
                $images_name = array($images_name);
                $desired_dir="../../Image";
                $stmt_delete_image = $conn -> prepare($query_delete_image);
                $stmt_delete_image -> bindParam(":id", $id);
                $stmt_delete_image -> execute();
                foreach($images_name as $value) {
                    if ($value != null) {
                        if (is_dir("$desired_dir/".$value)) {
                            $data_image_delete = array('id_product' => $id, 'link_image' => $value);
                            $stmt_delete_image->execute($data_image_delete);
                            chmod($desired_dir, 0777);

                            $link_to_image = $desired_dir.'/'.$value;
                            $delete_file_status = unlink($link_to_image);
                            if (!$delete_file_status) {
                                chmod($desired_dir, 0644);
                                $conn -> rollBack();
                                die ('Xóa ảnh không thành công!');
                            }
                            chmod($desired_dir, 0644);
                        }
                    }
                }
                // Xóa sản phẩm 
                $stmt_delete_product = $conn -> prepare($query_delete_product);
                $stmt_delete_product -> bindParam(":id", $id);
                if ($stmt_delete_product -> execute()) {
                    $conn -> commit();
                    echo "Xóa sản phẩm thành công!";
                }
                else {
                    // set trạng thái ngưng bán
                    set_status_product($conn, $id);
                    echo "Xóa sản phẩm không thành công! Đặt trạng thái về ngưng bán!";
                }
            }
            else {
                echo 'Bạn chưa được cấp quyền!';
                $conn -> rollBack();
            }
        }
        catch(Exception $exception){
            set_status_product($conn, $id);
            echo "Xóa sản phẩm không thành công vì sản phẩm này đã được mua hoặc nhập! Đặt trạng thái về ngưng bán!";
        }
    }
    function set_status_product($conn, $id) {
        $query = "UPDATE product 
        SET idstatus = :idstatus
        WHERE id = :id";
        $status = 'TT02';
        $stmt_delete = $conn -> prepare($query);
        $stmt_delete -> bindParam(':idstatus', $status);
        $stmt_delete -> bindParam(':id', $id);
        $stmt_delete -> execute();
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES)) {
        delete_product($conn,'xoa');
    }

?>