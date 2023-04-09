<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

$tableName = basename(dirname(__FILE__));
$headerArr = Table::describe($conn, $tableName);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === "GET"){	
	// ? http://localhost/doan/admin/Server/account/account.php
	$arrFromDb = Table::tableQueryAll($conn, $tableName);
	echo Table::jsonify($conn, $arrFromDb, $tableName);
} else 
if ($_SERVER['REQUEST_METHOD'] === "POST") {
	if (isset($_REQUEST["action"])){
		// ? http://localhost/doan/admin/Server/account/account.php?action=update&id=USR014&username=phideptraihehee&password=123123&privilege=sales&session&status=idle
		if ($_REQUEST["action"] === "update"){
			foreach($headerArr as $index => $value) 
				if ($index !== 0 && isset($_REQUEST[$value]))
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						$value, $_REQUEST[$value] 
					);
		} else
		// ? http://localhost/doan/admin/Server/account/account.php?action=create&username=someoneyoulove&password=123123&privilege=admin&session&status=idle
		if ($_REQUEST["action"] === "create") {
			$maxId = Table::getMaxId($conn, $tableName, 'id');
			$_REQUEST["id"] = "USR" . sprintf("%03d", strval($maxId+1));
			ReqHandling::createRow($conn, $tableName);
		}
	}
} else
// ? http://localhost/doan/admin/Server/account/account.php?id=USR014
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
	if (isset($_REQUEST["id"])) {
		ReqHandling::deleteRow($conn, $tableName, $_REQUEST["id"]);
		exit();
	} else {
		echo "Please specify your id for erasion." . "</br>" ;
	}
}

?>