<?php
header('Content-Type: application/json; charset=utf-8');

require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');


if ($_SERVER['REQUEST_METHOD'] === "GET") {
	// ? http://localhost/doan/admin/Server/receipt/receiptCustomerStaff.php
	echo json_encode(
		array(
			"status" => "deprecated api.",
			"author" => "Phi Huynh"
		),
		JSON_UNESCAPED_UNICODE
	);
	// $condition = "1=1";
	// $toReplace = array(
	// 	"staff_", 
	// 	"customer_", 
	// 	"status_receipt_", 
	// 	"detail_receipt_", 
	// 	"product_", 
	// 	"product_list_",
	// 	"promotion_",
	// 	"privilege_",
	// 	"parameters_",
	// 	"product_in_stock_"
	// );
	// $replace = array(
	// 	"staff.", 
	// 	"customer.", 
	// 	"status_receipt.", 
	// 	"detail_receipt.", 
	// 	"product.", 
	// 	"product_list.",
	// 	"promotion.",
	// 	"privilege.",
	// 	"parameters.",
	// 	"product_in_stock."
	// );

	// foreach($_GET as $key => $value) {
	// 	if (in_array($key, array("price")))
	// 	$condition .= " AND $key = '$value'";
	// }

	// $condition = str_replace($toReplace, $replace, $condition);

	// // echo $condition;

	// echo Table::jsonifyTriple(
	// 	$conn, 
	// 	Table::tableQueryTriple(
	// 		$conn, 
	// 		// * connection
	// 		'receipt', 
	// 		// * child table
	// 		'customer',
	// 		// * parent table 1
	// 		'staff',
	// 		// * parent table 2
	// 		'id_customer',
	// 		// * foreign key 1 on child
	// 		'id_staff',
	// 		// * foreign key 2 on child
	// 		'id',
	// 		// * primary key 1 on parent table 1
	// 		'id',
	// 		// * primary key 2 on parent table 2
	// 		'*',
	// 		// * column for selection
	// 		$condition
	// 		// * filter condition
	// 	), 
	// 	'receipt', 
	// 	'customer', 
	// 	'staff'
	// );
}



?>