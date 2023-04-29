<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');






if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $tableName = "privilege_general_detail";
  $arrFromDb = Table::tableQueryAll($conn, $tableName);
  echo json_encode(array($tableName => $arrFromDb), JSON_UNESCAPED_UNICODE);






} else if ($_SERVER["REQUEST_METHOD"] === "POST"){
  if (!isset($_POST["id_table"])) {
    echo json_encode(array(
      "message" => "Lỗi. Thêm bảng."
    ), JSON_UNESCAPED_UNICODE);
  } else if (!isset($_POST["id_feature"])) {
    echo json_encode(array(
      "message" => "Lỗi. Thêm chức năng."
    ), JSON_UNESCAPED_UNICODE);
  }  else if (!isset($_POST["id_user"])) {
    echo json_encode(array(
      "message" => "Lỗi. Thêm id người dùng."
    ), JSON_UNESCAPED_UNICODE);
  };

  ReqHandling::createRowPost($conn, "privilege_general_detail");
  echo json_encode(array(
    "message" => "Chỉ định quyền thành công."
  ), JSON_UNESCAPED_UNICODE);



} else if ($_SERVER["REQUEST_METHOD"] === "PUT") {
  try {
    $data = file_get_contents('php://input');
    $json = json_decode($data, true);
    ReqHandling::deleteRowPrivilege(
      $conn, 
      "privilege_general_detail", 
      $json["id_table"],
      $json["id_feature"],
      $json["id_user"]
    );
    echo json_encode(array(
      "message" => "Xóa thành công id."
    ), JSON_UNESCAPED_UNICODE);
  } catch (Exception $e) {
    Table::json_fire_exception($e);
    exit();
  }
}

?>