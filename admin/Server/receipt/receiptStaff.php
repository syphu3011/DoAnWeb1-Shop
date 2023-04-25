<?php
header('Content-Type: application/json; charset=utf-8');

require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

// * get information on child and parent table (use inner join)
if ($_SERVER["REQUEST_METHOD"] === "GET"){	
	// * GET
	
	$child = "receipt";
	$parent = "staff";
	$rcpHeader = Table::describe($conn, $child);
	$staffHeader = Table::describe($conn, $parent);
	$condition = "1=1";

	foreach($_GET as $key => $value) {
		if (in_array($key, $staffHeader))
			$condition .= " AND $parent.$key = '$value'";
		if (in_array($key, $rcpHeader))
			$condition .= " AND $child.$key = '$value'";
	}

	if ($condition === "1=1" && isset($_GET['search'])) {
		$toSearch = $_GET['search'];
		$condition = "";
		foreach($staffHeader as $key => $value) {
			$condition .= " OR $parent.$value = '$toSearch'";
		}
		foreach($rcpHeader as $key => $value) {
			$condition .= " OR $child.$value = '$toSearch'";
		}
		$condition = substr($condition, 4);
	}

	// echo $condition;

	// ? http://localhost/doan/admin/Server/customer/customerStaff.php
	echo Table::jsonifyCouple(
		$conn, 
		Table::tableQueryCouple(
			// * connection
			$conn, 
			// * childtable
			"receipt", 
			// * parenttable
			"staff", 
			// * foreign key on child
			"id_staff",
			// * foreign key on parent
			"id",
			// * column to select
			// TODO: reduce overload here
			"*",
			// * condition to select
			$condition
		), 
		"receipt", "staff"
	);
	
}



?>