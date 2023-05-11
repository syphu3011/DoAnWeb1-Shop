<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $tableName = "privilege_general";
  $arrFromDb = Table::tableQueryAll($conn, $tableName);
  echo json_encode(array($tableName => $arrFromDb), JSON_UNESCAPED_UNICODE);
} else if ($_SERVER["REQUEST_METHOD"] === "POST"){
  $action = $_REQUEST["action"];
  $id_table = $_REQUEST["id_table"];
  $id_feature = $_REQUEST["id_feature"];
  if ($action === "check")
    ReqHandling::createRow($conn, "privilege_general");
  else if ($action === "check") {
    ReqHandling::deleteRowPrivilegeGeneral(
      $conn,
      "privilege_general",
      $id_table,
      $id_feature
    );
  }
}

?>