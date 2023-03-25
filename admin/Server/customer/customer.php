<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === "GET"){	
	echo Table::jsonifyChildAndParent(
		$conn, 
		Table::tableQueryCustomer($conn, 'customer', 'account', '*'), 
		'customer', 'account'
	);
}

?>