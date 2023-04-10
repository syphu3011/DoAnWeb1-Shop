<?php
header('Content-Type: application/json; charset=utf-8');

require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');



if ($_SERVER['REQUEST_METHOD'] === "GET") {
	// ? http://localhost/doan/admin/Server/receipt/receipt.php
	echo Table::jsonifyTriple(
		$conn, 
		Table::tableQueryTriple(
			$conn, 
			// * connection
			'receipt', 
			// * child table
			'customer',
			// * parent table 1
			'staff',
			// * parent table 2
			'id_customer',
			// * foreign key 1 on child
			'id_staff',
			// * foreign key 2 on child
			'id',
			// * primary key 1 on parent table 1
			'id',
			// * primary key 2 on parent table 2
			'*'
			// * column for selection
		), 
		'receipt', 
		'customer', 
		'staff'
	);
}



if ($_SERVER["REQUEST_METHOD"] === "POST") {
	if ($_REQUEST["action"] == "update") {}
	if ($_REQUEST["action"] == "create") {
		if (isset($_REQUEST["id"])) {
			echo "The id shouldn't be here.";
			exit();
		}
	}
}
?>