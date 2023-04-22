<?php
header('Content-Type: application/json; charset=utf-8');

require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

// * get information on child and parent table (use inner join)
if ($_SERVER["REQUEST_METHOD"] === "GET"){	
	// * GET
	
	$child = "receipt";
	$parent = "detail_receipt";
	$childHeader = Table::describe($conn, $child); // child header
	$parntHeader = Table::describe($conn, $parent); // parent header
	$condition = "1=1";

	foreach($_GET as $key => $value) {
		if (in_array($key, $parntHeader))
			$condition .= " AND $parent.$key = '$value'";
		if (in_array($key, $childHeader))
			$condition .= " AND $child.$key = '$value'";
	}

	if ($condition === "1=1" && isset($_GET['search'])) {
		$toSearch = $_GET['search'];
		$condition = "";
		foreach($parntHeader as $key => $value) {
			$condition .= " OR $parent.$value = '$toSearch'";
		}
		foreach($childHeader as $key => $value) {
			$condition .= " OR $child.$value = '$toSearch'";
		}
		$condition = substr($condition, 4);
	}

	// echo $condition;

	// ? http://localhost/doan/admin/Server/customer/customerDetail.php
	echo Table::jsonifyCouple(
		$conn, 
		Table::tableQueryCouple(
			// * connection
			$conn, 
			// * childtable
			"receipt", 
			// * parenttable
			"detail_receipt", 
			// * foreign key on child
			"id",
			// * foreign key on parent
			"id_receipt",
			// * column to select
			"*",
			// * condition to select
			$condition
		), 
		"receipt", "detail_receipt"
	);
	
}



?>