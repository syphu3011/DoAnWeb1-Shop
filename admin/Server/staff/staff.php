<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

$tableName = basename(dirname(__FILE__));
$headerArr = Table::describe($conn, $tableName);

header('Content-Type: application/json; charset=utf-8');



if ($_SERVER['REQUEST_METHOD'] === "GET"){	
	$staHeader = Table::describe($conn, "staff");
	$accHeader = Table::describe($conn, "account");
	$condition = "1=1";

	foreach($_GET as $key => $value) {
		if (in_array($key, $staHeader))
			$condition .= " AND staff.$key = '$value'";
		if (in_array($key, $accHeader))
			$condition .= " AND account.$key = '$value'";
	}

	if ($condition === "1=1" && isset($_GET['search'])) {
		$toSearch = $_GET['search'];
		$condition = "";
		foreach($staHeader as $key => $value) {
			$condition .= " OR staff.$value = '$toSearch'";
		}
		foreach($accHeader as $key => $value) {
			$condition .= " OR account.$value = '$toSearch'";
		}
		$condition = substr($condition, 4);
	}

	// echo $condition;

	// ? http://localhost/doan/admin/Server/staff/staff.php
	echo Table::jsonifyCouple(
		$conn, 
		Table::tableQueryCouple(
			// * connection
			$conn, 
			// * childtable
			"staff", 
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
			// "staff.id="NV001""
		), 
		"staff", "account"
	);
	
}




// * database contains 1 parent table & 2 child tables
// * 1 or more parameters is all acceptable

// * UPDATE parent table
// ? http://localhost/doan/admin/Server/staff/staff.php?action=update&id=NV005&name=Sy Phi

// * UPDATE child table
// ? http://localhost/doan/admin/Server/staff/staff.php?action=update&id=USR013&password=11223344

if ($_SERVER['REQUEST_METHOD'] === "POST") {
	if (isset($_REQUEST["action"])){
		
		// * UPDATE EXISTED CUSTOMERS
		if ($_REQUEST["action"] === "update" ){
			// * properties should be update 
			// * child table - staff: name, birthday, phone, gender, address, note, id_user 
			// * parent table - account: username, password, privilege, session

			// * fetch all table properties on account & customer table 

			$headerArrAccount = Table::describe($conn, 'account');
			$headerArrCustomer = Table::describe($conn, 'staff');
			
			// * if "id" value in POST request start with USR, update the parent table (account table)
			if (isset($_REQUEST["id_user"]) && preg_match('/^USR/', $_REQUEST["id_user"])) 
				foreach($headerArrAccount as $key => $value) 
					if (isset($_REQUEST[$value]))
					ReqHandling::updateDbOnProperty(
						$conn, 'staff', $value, $_REQUEST[$value], 'id_user', $_REQUEST["id_user"]
					);

			// * if "id" value in POST request start with KH, update the child table (customer table)
			if (isset($_REQUEST["id"]) && preg_match('/^NV/', $_REQUEST["id"])) 
				foreach($headerArrCustomer as $key => $value) 
					if (isset($_REQUEST[$value]))
						ReqHandling::updateDb(
							$conn, 'staff', $_REQUEST["id"], 
							$value, $_REQUEST[$value] 
						);
			
		}

		// * CREATE NEW CUSTOMER

		// ? http://localhost/doan/admin/Server/staff/staff.php?action=create&username=admin3&password=123123&privilege=admin&session&status=active&name=Sỹ Phú&birthday=2002-11-30 00:00:00&gender=nam&phone=828049515&address=HCM

		if ($_REQUEST["action"] === "create"){

			if (isset($_REQUEST["id_user"]) || isset($_REQUEST["id"])) {
				echo "You don't need to provide ID for creating new record. Id auto-increasing is available. ";
				exit();
			}

			$maxIdAccount = Table::getMaxId($conn, 'account', 'id_user');
			$maxIdCustomer = Table::getMaxId($conn, 'staff', 'id');

			// * add new account id on REQUEST superglobal array
			$_REQUEST["id_user"] = "USR" . strval(sprintf("%03d", $maxIdAccount+1));
			// * update account table first (update parent table)
			ReqHandling::createRow($conn, 'account');
			
			$_REQUEST["id"] = "NV" . strval(sprintf("%03d", $maxIdCustomer+1));
			$_REQUEST["id_user"] = "USR" . strval(sprintf("%03d", $maxIdAccount+1));
			ReqHandling::createRow($conn, 'staff');
		}
	}

}




// * REMOVE CUSTOMERS FROM DATABASE

// ? http://localhost/doan/admin/Server/staff/staff.php?id=USR013

if ($_SERVER['REQUEST_METHOD'] === "PUT") {

	if (!isset($_REQUEST["id"])) {
		echo "Please specify the id of ACCOUNT for deleting.";
		exit();
	}
	
	echo "deleting";
	$_REQUEST['id_user'] = $_REQUEST['id'];

	// * delete from child table
	ReqHandling::deleteRowWithProperty($conn, 'staff', 'id_user', $_REQUEST['id_user']);
	
	// * delete from parent table
	ReqHandling::deleteRowWithProperty($conn, 'account', 'id_user', $_REQUEST['id_user']);

}

?>