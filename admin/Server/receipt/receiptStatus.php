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
// ? http://localhost/doan/admin/Server/receipt/receiptStatus.php

function perform_GET_receipt_status ($conn, $fromPost) {

	$child = "receipt";
	$parent = "status_receipt";
	$childHeader = Table::describe($conn, $child);
	$parrentHeader = Table::describe($conn, $parent);
	$condition = "1=1";

	if (isset($_GET["id_receipt"])) {
		$tempId = $_GET["id_receipt"];
		$condition .= " AND $child.id = '$tempId'";
	}

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

	// ? http://localhost/doan/admin/Server/customer/receiptStatus.php
	$childTableName = "receipt";
	$parentTableName = "status_receipt";
	$childProp = Table::describe($conn, $childTableName);
	$parentProp = Table::describe($conn, $parentTableName);
	$columnToSelect = "";
	$columnToSelect .= changeProp($childProp, $childTableName);
	$columnToSelect .= changeProp($parentProp, $parentTableName);
	$columnToSelect = substr($columnToSelect, 0, -2);
	if (!$fromPost) {
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
				"id_status",
				// * foreign key on parent
				"id",
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
	} else {
			return Table::tableQueryCouple(
				// * connection
				$conn, 
				// * childtable
				$childTableName, 
				// * parenttable
				$parentTableName, 
				// * foreign key on child
				"id_status",
				// * foreign key on parent
				"id",
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
			); 
	}
}








if ($_SERVER["REQUEST_METHOD"] === "GET"){	

	perform_GET_receipt_status($conn, false);

} else if ($_SERVER["REQUEST_METHOD"] === "POST") {

	// ? http://localhost/doan/admin/Server/receipt/receiptStatus.php?action=update&id_receipt=HD001&status=Đã hủy

	if (isset($_REQUEST["action"])){
		if ($_REQUEST["action"] === "update" ){
			try {
				$receiptArr = Table::describe($conn, "receipt");
				$statusArr = Table::describe($conn, "status_receipt");
				if (isset($_POST["id"])) 
				$id = $_POST["id"];
				if (isset($_POST["id_receipt"])) 
				$id = $_POST["id_receipt"];
				
				unset($_POST["id"]);
				unset($_POST["id_receipt"]);
				
				if (!isset($_POST["status"])) {
					echo json_encode(
						array(
							"message" => "Vui lòng thêm status cần sửa. (status)"
						), JSON_UNESCAPED_UNICODE
					);
					exit();
				}
				$tempArr = Table::tableQueryPropertyWithColSel($conn, "status_receipt", "name", $_POST["status"], "id");
				$tempArr = $tempArr[0]["id"];

				date_default_timezone_set('Asia/Ho_Chi_Minh');
				$today = gmdate('Y-m-d H:i:s', time());
				// * Y : year with 4 digits
				// * y : year with 2 digits
				// * m : month with 2 digits
				// * M : month with name
				// * H : format 24h
				// * h : format 12h

				try {
					ReqHandling::updateDb($conn, "receipt", $id, "id_status", $tempArr);
					ReqHandling::updateDb($conn, "receipt", $id, "date_confirm", $today);
					ReqHandling::updateDb($conn, "receipt", $id, "id_staff", $id_staff);
				} catch (Exception $e) {
					Table::json_fire_exception($e);
					exit();
				}
				echo json_encode(array(
					"message" => "Update trạng thái đơn hàng thành công."
				), JSON_UNESCAPED_UNICODE);
			} catch (Exception $e) {
				Table::json_fire_exception($e);
			}
		}
	}
}	



?>