<?php
// dữ liệu được post lên bằng form data với kiểu
// {
//     id: "",
//     breast: "",
//     waist: "",
//     butt: "",
//     foot: "",
//     hand: "",
//     thigh: "",
//     back: "",
//     id_user: "",
//     password: ""
// }
// để convert về form data thì dùng to_form_data bên product.js
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        require_once('../../../init.php');
        require_once('../same_function.php');
        $id_user = $_POST["id_user"];
        $password_user = $_POST["password"];
        if (check_privilege($id_user, $password_user,$conn,'them','product')) {
            try {
                require_once('../../../init.php');
                $conn->beginTransaction();
                $query_insert_size = "
                INSERT INTO `size`(`id`, `breast`, `waist`, `butt`, `foot`, `hand`, `thigh`, `back`, `id_status`)
                VALUES (
                :id,
                :breast,
                :waist,
                :butt, 
                :foot, 
                :hand, 
                :thigh, 
                :back,
                :id_status)
                ";
                $stmt = $conn->prepare($query_insert_size);
                $data_size = $_POST;
                $id_status = 'TT12';
                $stmt->bindParam(':id', $data_size['id']);
                $stmt->bindParam(':breast', $data_size['breast']);
                $stmt->bindParam(':waist', $data_size['waist']);
                $stmt->bindParam(':butt', $data_size['butt']);
                $stmt->bindParam(':foot', $data_size['foot']);
                $stmt->bindParam(':hand', $data_size['hand']);
                $stmt->bindParam(':thigh', $data_size['thigh']);
                $stmt->bindParam(':back', $data_size['back']);
                $stmt->bindParam(':id_status', $id_status);
                if ($stmt->execute()) {
                    echo 'Đã thêm kích thước thành công';
                    $conn->commit();
                }
                else {
                    echo 'Lỗi thêm kích thước !';
                    $conn->rollBack();
                }
            }
            catch (Exception $e) {
                echo 'Đã xảy ra lỗi!';
                $conn->rollBack();
            }
        }
    }
?>