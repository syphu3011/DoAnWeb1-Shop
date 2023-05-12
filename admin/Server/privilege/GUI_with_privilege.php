<?php
     if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        try {
            require_once('../../../init.php');
            require_once('../same_function.php');
            $id_user = $_POST["id_user"];
            $password_user = $_POST["password"];
            $response = '';
            $first_pri = '';
            if (check_privilege($id_user, $password_user, $conn, 'xem','product')) {
                $response .= '<li id="product">
                    <img src="./Image/Box_alt_fill.png" alt="" class="img-li"> Sản phẩm
                </li>
                <li id="classify">
                    <img src="./Image/classyfi_icon.png" alt="" class="img-li"> Loại sản phẩm
                </li>
                <li id="size">
                    <img src="./Image/iconmonstr-ruler-16-240 1.png " alt="" class="img-li"> Kích thước
                </li>';
                $first_pri = 'sanpham';
            }
            if (check_privilege($id_user, $password_user, $conn, 'xem','import_product')) {
                $response .= '
                <li id="input">
                    <img src="./Image/input_prod.png" alt="" class="img-li"> Nhập hàng
                </li>
                ';
                $first_pri = $first_pri == 'nhaphang';
            }
            if (check_privilege($id_user, $password_user, $conn, 'xem','receipt')) {
                $response .= '
                <li id="orderr">
                    <img src="./Image/Order.png" alt="" class="img-li"> Đơn hàng
                 </li>
                ';
            }
            if (check_privilege($id_user, $password_user, $conn, 'xem','customer')) {
                $response .= '
                <li id="consumer">
                    <img src="./Image/Consumer.png" alt="" class="img-li"> Khách hàng
                </li>
                ';
            }
            if (check_privilege($id_user, $password_user, $conn, 'xem','staff')) {
                $response .= '
                <li id="staff">
                    <img src="./Image/staff-icon-black 1.png" alt="" class="img-li"> Nhân viên
                </li>
                <li id="privilege">
                    <img src="./Image/pri_icon.png" alt="" class="img-li"> Phân quyền
                </li>
                ';
            }
            if (check_privilege($id_user, $password_user, $conn, 'xem','promotion')) {
                $response .= '
                <li id="promote">
                    <img src="./Image/promote.png" alt="" class="img-li"> Khuyến mãi
                </li>
                ';
            }
            if (check_privilege($id_user, $password_user, $conn, 'xem','statistic')) {
                $response .= '
                <li id="stats">
                    <img src="./Image/Chart_fill.png" alt="" class="img-li"> Thống kê
                </li>
                ';
            }
            echo $response;
        }
        catch(Exception $e) {
            echo "Đã có lỗi xảy ra !";
        }
    }
?>