<?php
header('Content-Type: application/json; charset=utf-8');

require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

function changeProp($arr, $tableName) {
	$temp = "";
	foreach ($arr as $key => $value) {
		$temp .= " $tableName.$value as $value" . "_" . "$tableName, ";
	}
	return $temp;
}

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

	// ? http://localhost/doan/admin/Server/customer/receiptDetail.php
	$childTableName = "receipt";
	$parentTableName = "detail_receipt";
	$childProp = Table::describe($conn, $childTableName);
	$parentProp = Table::describe($conn, $parentTableName);
	$columnToSelect = "";
	$columnToSelect .= changeProp($childProp, $childTableName);
	$columnToSelect .= changeProp($parentProp, $parentTableName);
	$columnToSelect = substr($columnToSelect, 0, -2);
	echo Table::jsonifyCoupleWithTableName(
		$conn, 
		Table::tableQueryCouple(
			// * connection
			$conn, 
			// * childtable
			$childTableName, 
			// * parenttable
			$parentTableName, 
			// * foreign key on child
			"id",
			// * foreign key on parent
			"id_receipt",
			// * column to select
			// "
			// $childTableName.id as id_$childTableName, 
			// $childTableName.date_init as date_init_$childTableName, 
			// $childTableName.date_confirm as date_confirm_$childTableName, 
			// $childTableName.address as address_$childTableName, 
			// $childTableName.note as note_$childTableName, 
			// $childTableName.id_staff as id_staff_$childTableName,
			// $childTableName.id_customer as id_customer_$childTableName,
			// $childTableName.id_status as id_status_$childTableName,
			// $parentTableName.id as id_$parentTableName,
			// $parentTableName.name as name_$parentTableName,
			// $parentTableName.birthday as birthday_$parentTableName,
			// $parentTableName.numberphone as numberphone_$parentTableName,
			// $parentTableName.image as image_$parentTableName,
			// $parentTableName.address as address_$parentTableName,
			// $parentTableName.gender as gender_$parentTableName,
			// $parentTableName.id_user as id_user_$parentTableName
			// ",
			$columnToSelect
			,
			// * condition to select
			$condition
		), 
		$childTableName, $parentTableName
	);
	
}



?>