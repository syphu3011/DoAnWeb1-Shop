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
				break;
			}
		}
		if (!$getAll)
			break;
	}

	if ($getAll) {
		// ? http://localhost/doan/admin/Server/staff/staff.php
		$arrFromDb = Table::tableQueryAll($conn, $tableName);
		echo Table::jsonify($conn, $arrFromDb, $tableName);
	} else {
		// ? http://localhost/doan/admin/Server/staff/staff.php
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
		// ? http://localhost/doan/admin/Server/parameters/parameters.php?id=TUOITEEN&variable1=19&variable2=22&action=update
		if ($_REQUEST["action"] === "update"){
			foreach($headerArr as $index => $value) 
				if (isset($_REQUEST[$value]))
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						$value, $_REQUEST[$value] 
					);
		} else
		// ? http://localhost/doan/admin/Server/parameters/parameters.php?id=TUOITEEN&variable1=19&variable2=21&action=create
		if ($_REQUEST["action"] === "create") {
			ReqHandling::createRow($conn, $tableName);
		}
	}
}



// ? http://localhost/doan/admin/Server/parameters/parameters.php?id=TUOITEEN
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
	if (isset($_REQUEST["id"])) {
		ReqHandling::deleteRow($conn, $tableName, $_REQUEST["id"]);
		exit();
	} else {
		echo "Please specify your id for erasion." . "</br>" ;
	}
}

?>