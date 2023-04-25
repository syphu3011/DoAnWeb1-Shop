<?php
header('Content-Type: application/json; charset=utf-8');

require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

// * get information on child and parent table (use inner join)
if ($_SERVER["REQUEST_METHOD"] === "GET"){	
	// * GET
	
	$child = "receipt";
	$parent = "customer";
	$childHeader = Table::describe($conn, $child);
	$parrentHeader = Table::describe($conn, $parent);
	$condition = "1=1";

	foreach($_GET as $key => $value) {
		if (in_array($key, $parrentHeader))
			$condition .= " AND $parent.$key = '$value'";
		if (in_array($key, $childHeader))
			$condition .= " AND $child.$key = '$value'";
	}

	if ($condition === "1=1" && isset($_GET['search'])) {
		$toSearch = $_GET['search'];
		$condition = "";
		foreach($parrentHeader as $key => $value) {
			$condition .= " OR $parent.$value = '$toSearch'";
		}
		foreach($childHeader as $key => $value) {
			$condition .= " OR $child.$value = '$toSearch'";
		}
		$condition = substr($condition, 4);
	}

	// echo $condition;

	// ? http://localhost/doan/admin/Server/customer/receiptCustomer.php
	echo Table::jsonifyCouple(
		$conn, 
		Table::tableQueryCouple(
			// * connection
			$conn, 
			// * childtable
			"receipt", 
			// * parenttable
			"customer", 
			// * foreign key on child
			"id_customer",
			// * foreign key on parent
			"id",
			// * column to select
			"*",
			// * condition to select
			$condition
		), 
		"receipt", "customer"
	);
	
}



?>