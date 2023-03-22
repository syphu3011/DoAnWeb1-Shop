<?php
	// ? GET SECTION
	require_once('../../../init.php');
	require_once('../__class__/Table.php');
	require_once('../__class__/ReqHandling.php');
	
	// * table query name depends on folder name on server
	$tableName = basename(dirname(__FILE__));
	$iterator_sample = array(
		"id", "username_customer"
	);
	header('Content-Type: application/json; charset=utf-8');

	if ($_SERVER['REQUEST_METHOD'] === "GET"){	
		// ? http://localhost/doan/admin/Server/customer/customers.php
		if (count($_GET) > 0) {
			if (!ReqHandling::reqWithPara($conn, $tableName, $iterator_sample)) {
				echo "Please change your key & value" ;
				exit() ;
			}
			echo Table::jsonify($conn, ReqHandling::reqWithPara($conn, $tableName, $iterator_sample), $tableName);
		}
		// ? http://localhost/doan/admin/Server/customer/customers.php
		// ? http://localhost/doan/admin/Server/customer/customers.php?id=KH001
		// ? http://localhost/doan/admin/Server/customer/customers.php?username_customer=khaphi
		else {
			$arrFromDb = Table::tableQueryAll($conn, $tableName);
			echo Table::jsonify($conn, $arrFromDb, $tableName);
		}
	} else
	
	if ($_SERVER['REQUEST_METHOD'] === "POST") {
		if (isset($_REQUEST["action"])){
			// ? http://localhost/doan/admin/Server/customer/customers.php?action=update&id=KH006&name=hehe
			if ($_REQUEST["action"] === "update"){
				if (isset($_REQUEST["name"]))
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						"name", $_REQUEST["name"] 
					);
				if (isset($_REQUEST["username_customer"])) 
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						"username_customer", $_REQUEST["username_customer"] 
					);
				if (isset($_REQUEST["password_customer"])) 
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						"password_customer", $_REQUEST["password_customer"] 
					);
				if (isset($_REQUEST["numberphone"])) 
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						"numberphone", $_REQUEST["numberphone"] 
					);
				if (isset($_REQUEST["address"])) 
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						"address", $_REQUEST["address"] 
					);
				if (isset($_REQUEST["gender"])) 
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						"gender", $_REQUEST["address"] 
					);
				if (isset($_REQUEST["id_status"])) 
					ReqHandling::updateDb(
						$conn, $tableName, $_REQUEST["id"], 
						"id_status", $_REQUEST["address"] 
					);
			} else
			// ? http://localhost/doan/admin/Server/customer/customers.php?action=create&id=KH006&name=hehe lun nek nekk&date_init=2023-02-12 00:00:00&username_customer=hehe&password_customer=123123&birthday=2002-11-30&numberphone=394142882&image=&address=HCM&gender=nam&id_status=TT04
			if ($_REQUEST["action"] === "create") {
				ReqHandling::createRow($conn, $tableName);
			}
		}
	} else 
	// ? http://localhost/doan/admin/Server/customer/customers.php?id=KH006
	if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
		if (isset($_REQUEST["id"])) {
			ReqHandling::deleteRow($conn, $tableName, $_REQUEST["id"]);
			exit();
		} else {
			echo "Please specify your id for erasion." . "</br>" ;
		}
	}
?>