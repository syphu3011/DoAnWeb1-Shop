<?php

require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');


$tableName = 'customer';

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === "GET") {
	// ? http://localhost/doan/admin/Server/customer/filter.php?username_customer=khaphi&address=HCM
	$keyArr = array();
	$valArr = array();
	foreach($_REQUEST as $key => $value) {
		array_push($keyArr, $key);
		array_push($valArr, $value);
	}
	echo Table::jsonify(
		$conn, 
		Table::tableQueryMultipleProperty($conn, $tableName, $keyArr, $valArr), 
		$tableName
	);
}

?>