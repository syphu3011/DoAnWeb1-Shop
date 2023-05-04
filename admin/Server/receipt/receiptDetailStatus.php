<?php
header('Content-Type: application/json; charset=utf-8');

require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');


if ($_SERVER['REQUEST_METHOD'] === "GET") {
	// ? http://localhost/doan/admin/Server/receipt/receiptCustomerStaff.php

	$condition = "1=1";
	$toReplace = array(
		"staff_", 
		"customer_", 
		"status_receipt_", 
		"detail_receipt_", 
		"product_", 
		"product_list_",
		"promotion_",
		"privilege_",
		"parameters_",
		"product_in_stock_"
	);
	$replace = array(
		"staff.", 
		"customer.", 
		"status_receipt.", 
		"detail_receipt.", 
		"product.", 
		"product_list.",
		"promotion.",
		"privilege.",
		"parameters.",
		"product_in_stock."
	);

	foreach($_GET as $key => $value) {
		$condition .= " AND $key = '$value'";
	}

	$condition = str_replace($toReplace, $replace, $condition);

	echo Table::jsonifyTriple(
		$conn, 
		Table::tableQueryTriple(
			$conn, 
			// * connection
			'receipt', 
			// * child table
			'detail_receipt',
			// * parent table 1
			'status_receipt',
			// * parent table 2
			'id',
			// * foreign key 1 on child
			'id_status',
			// * foreign key 2 on child
			'id_receipt',
			// * primary key 1 on parent table 1
			'id',
			// * primary key 2 on parent table 2
			'*',
			// * column for selection
			$condition
			// * condtion for filtering
		), 
		'receipt', 
		'detail_receipt', 
		'status_receipt'
	);
}



?>