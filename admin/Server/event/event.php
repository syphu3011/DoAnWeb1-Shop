<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

$tableName = basename(dirname(__FILE__));
$headerArr = Table::describe($conn, $tableName);

header('Content-Type: application/json; charset=utf-8');



// * GET SECTION

if ($_SERVER["REQUEST_METHOD"] === "GET") {
	// * get lastest event
	// ? http://localhost/doan/admin/Server/event/event.php?amount=1
	if (isset($_REQUEST["amount"])) {
		echo Table::jsonify(
			$conn,
			Table::tableQueryTop($conn, $tableName, 'timestamp', $_REQUEST["amount"], '*'),
			$tableName
		);
	} else {
		// ? http://localhost/doan/admin/Server/event/event.php
		$arrFromDb = Table::tableQueryAll($conn, $tableName);
		echo Table::jsonify($conn, $arrFromDb, $tableName);
	}
}



// * CREATE NEW EVENT
// * auto generate time stamp
// ? http://localhost/doan/admin/Server/event/event.php?detail=Add new account - USR007&severity=harmless&type=add&actor=admin2
if ($_SERVER["REQUEST_METHOD"] === "POST") {
	$_REQUEST["timestamp"] = time();
	ReqHandling::createRow($conn, $tableName);
}
?>