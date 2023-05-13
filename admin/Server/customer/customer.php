<?php
require_once("../../../init.php");
require_once("../__class__/Table.php");
require_once("../__class__/ReqHandling.php");

header("Content-Type: application/json; charset=utf-8");


// * get information on child and parent table (use inner join)
if ($_SERVER["REQUEST_METHOD"] === "GET"){	
	// * GET
	
	$cusHeader = Table::describe($conn, "customer");
	$accHeader = Table::describe($conn, "account");
	$condition = "1=1";

	foreach($_GET as $key => $value) {
		if (in_array($key, $cusHeader))
			$condition .= " AND customer.$key = '$value'";
		if (in_array($key, $accHeader))
			$condition .= " AND account.$key = '$value'";
	}

	if ($condition === "1=1" && isset($_GET['search'])) {
		$toSearch = $_GET['search'];
		$condition = "";
		foreach($cusHeader as $key => $value) {
			$condition .= " OR customer.$value = '$toSearch'";
		}
		foreach($accHeader as $key => $value) {
			$condition .= " OR account.$value = '$toSearch'";
		}
		$condition = substr($condition, 4);
	}

	// echo $condition;

	// ? http://localhost/doan/admin/Server/customer/customer.php
	echo Table::jsonifyCouple(
		$conn, 
		Table::tableQueryCouple(
			// * connection
			$conn, 
			// * childtable
			"customer", 
			// * parenttable
			"account", 
			// * foreign key on child
			"id_user",
			// * foreign key on parent
			"id_user",
			// * column to select
			"*",
			// * condition to select
			$condition
			// "customer.id="KH001""
		), 
		"customer", "account"
	);
	
}



// * database contains 1 parent table & 2 child tables
// * 1 or more parameters is all acceptable

// * UPDATE parent table
// ? http://localhost/doan/admin/Server/customer/customer.php?id_user=USR013&username=cicada&password=cicada3303&action=update&privilege=sales&status=active
// * use both USR and KH in id, don"t use id_user


// * UPDATE child table
// ? http://localhost/doan/admin/Server/customer/customer.php?action=update&name=cicada4&id=KH005

if ($_SERVER["REQUEST_METHOD"] === "POST") {
	if (isset($_REQUEST["action"])){
		
		// * UPDATE EXISTED CUSTOMERS
		if ($_REQUEST["action"] === "update" ){
			// * properties should be update 
			// * child table - customer: id, name, birthday, numberphone, 
			// * parent table - account: username, password

			// * fetch all table properties on account & customer table 

			$headerArrAccount = Table::describe($conn, "account");
			$headerArrCustomer = Table::describe($conn, "customer");

			date_default_timezone_set("Asia/Ho_Chi_Minh");
			$today = gmdate("Y-m-d H:i:s", time());
			// * Y : year with 4 digits
			// * y : year with 2 digits
			// * m : month with 2 digits
			// * M : month with name
			// * H : format 24h
			// * h : format 12h
			$_REQUEST["date_created"] = $today;

			// * if "id" value in POST request start with USR, update the parent table (account table)
			if (isset($_REQUEST["id_user"]) && preg_match("/^USR/", $_REQUEST["id_user"])) 
				foreach($headerArrAccount as $key => $value) 
					if (isset($_REQUEST[$value]))
					ReqHandling::updateDbOnProperty(
						$conn, "account", $value, $_REQUEST[$value], "id_user", $_REQUEST["id_user"]
					);

			// * if "id" value in POST request start with KH, update the child table (customer table)
			if (isset($_REQUEST["id"]) && preg_match("/^KH/", $_REQUEST["id"])) 
				foreach($headerArrCustomer as $key => $value) 
					if (isset($_REQUEST[$value]))
						ReqHandling::updateDb(
							$conn, "customer", $_REQUEST["id"], $value, $_REQUEST[$value] 
						);


		}

		// * CREATE NEW CUSTOMER

		// ? http://localhost/doan/admin/Server/customer/customer.php?username=cicada2&password=cicada3303&action=create&privilege=sales&status=active&name=Lang Thang&birthday=2002-11-30 00:00:00&numberphone=394142891&address=HCM&gender=nam

		if ($_REQUEST["action"] === "create"){

			if (isset($_REQUEST["id"])) {
				echo json_encode(array("message" => "You don't need to provide ID for creating new record. Id auto-increasing is available. "), JSON_UNESCAPED_UNICODE);
				exit();
			}

			date_default_timezone_set("Asia/Ho_Chi_Minh");
			$today = gmdate("Y-m-d H:i:s", time());
			// * Y : year with 4 digits
			// * y : year with 2 digits
			// * m : month with 2 digits
			// * M : month with name
			// * H : format 24h
			// * h : format 12h
			$_REQUEST["date_created"] = $today;

			$maxIdAccount = Table::getMaxId($conn, "account", "id_user");
			$maxIdCustomer = Table::getMaxId($conn, "customer", "id");

			// * add new account id on REQUEST superglobal array
			$_REQUEST["id_user"] = "USR" . strval(sprintf("%03d", $maxIdAccount+1));
			// * update account table first (update parent table)
			ReqHandling::createRow($conn, "account");
			
			$_REQUEST["id"] = "KH" . strval(sprintf("%03d", $maxIdCustomer+1));
			$_REQUEST["id_user"] = "USR" . strval(sprintf("%03d", $maxIdAccount+1));
			ReqHandling::createRow($conn, "customer");
			
		}
	}

}


// * REMOVE CUSTOMERS FROM DATABASE

// ? http://localhost/doan/admin/Server/customer/customer.php?id_user=USR015

if ($_SERVER["REQUEST_METHOD"] === "PUT") {

	$data = json_decode(file_get_contents('php://input'), true);

	if (!isset($data["id_user"])) {
		echo json_encode(array("message" => "Please specify the id_user of ACCOUNT for deleting."), JSON_UNESCAPED_UNICODE);
		exit();
	}


	// * delete from child table
	ReqHandling::deleteRowWithProperty($conn, "customer", "id_user", $data["id_user"]);
	
	// * delete from parent table
	ReqHandling::deleteRowWithProperty($conn, "account", "id_user", $data["id_user"]);

}

?>