<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

header('Content-Type: application/json; charset=utf-8');



if ($_SERVER['REQUEST_METHOD'] === "GET"){	
	// ? http://localhost/doan/admin/Server/customer/customer.php
	echo Table::jsonifyCouple(
		$conn, 
		Table::tableQueryCouple(
			$conn, 
			// * connection
			'customer', 
			// * childtable
			'account', 
			// * parenttable
			'id_user',
			// * foreign key on child
			'id',
			// * foreign key on parent
			'*'), 
		'customer', 'account'
	);
}

// ! haven't done yet.

if ($_SERVER['REQUEST_METHOD'] === "POST") {
	if (isset($_REQUEST["action"])){
		if ($_REQUEST["action"] === "update"){}
		if ($_REQUEST["action"] === "create"){}
	}
}

?>