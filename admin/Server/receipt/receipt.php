<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

$tableName = basename(dirname(__FILE__));
$headerArr = Table::describe($conn, $tableName);

header('Content-Type: application/json; charset=utf-8');



if ($_SERVER['REQUEST_METHOD'] === "GET"){	
	$getAll = True;
	$arrHeader = Table::describe($conn, $tableName);

	foreach ($_REQUEST as $key => $value) {
		foreach ($arrHeader as $key2 => $value2) {
			if ($key === $value2) {
				$getAll = False;
			}
		}
	}

	if ($getAll) {
		// ? http://localhost/doan/admin/Server/receipt/receipt.php
		$arrFromDb = Table::tableQueryAll($conn, $tableName);
		echo Table::jsonify($conn, $arrFromDb, $tableName);
	} else {
		// ? http://localhost/doan/admin/Server/receipt/receipt.php?date_confirm=2023-02-12 00:00:00
		$arrProperty = array();
		$arrContent = array();
		foreach ($_REQUEST as $key => $value) {
			array_push($arrProperty, $key);
			array_push($arrContent, $value);
		}
		$arrFromDb = Table::tableQueryMultipleProperty(
			$conn, 
			$tableName,
			$arrProperty,
			$arrContent
		);
		echo Table::jsonify($conn, $arrFromDb, $tableName);
	}
	
}




if ($_SERVER['REQUEST_METHOD'] === "POST") {
	if (isset($_REQUEST["action"])){
		if ($_REQUEST["action"] === "update"){
			echo "Update is not supported.";
		} else
		// ? http://localhost/doan/admin/Server/receipt/receipt.php?action=create&date_init=2023-02-24 00:00:00&date_confirm=2023-02-24 00:00:00&note&id_staff=NV001&id_customer=KH001&id_status=TT07
		if ($_REQUEST["action"] === "create") {
			$maxId = Table::getMaxId($conn, $tableName, 'id');
			$_REQUEST["id"] = "HD" . sprintf("%03d", strval($maxId+1));
			ReqHandling::createRow($conn, $tableName);
		}
	}
}



// ? http://localhost/doan/admin/Server/receipt/receipt.php?id=TUOITEEN
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
	if (isset($_REQUEST["id"])) {
		ReqHandling::deleteRow($conn, $tableName, $_REQUEST["id"]);
		exit();
	} else {
		echo "Please specify your id for erasion." . "</br>" ;
	}
}
?>