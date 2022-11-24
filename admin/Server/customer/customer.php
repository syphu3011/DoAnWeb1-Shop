<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

header('Content-Type: application/json; charset=utf-8');


// * get information on child and parent table (use inner join)
if ($_SERVER['REQUEST_METHOD'] === "GET"){	
	// * GET
	// ? http://localhost/doan/admin/Server/customer/customer.php
	echo Table::jsonifyCouple(
		$conn, 
		Table::tableQueryCouple(
			$conn, 
			// * connection
			'customer', 
			// * childtable
			'account', 
			// * parenttable
			'id_user',
			// * foreign key on child
			'id',
			// * foreign key on parent
			'*'), 
		'customer', 'account'
	);
}



// * database contains 1 parent table & 2 child tables
// * 1 or more parameters is all acceptable

// * UPDATE parent table
// ? http://localhost/doan/admin/Server/customer/customer.php?id=USR013&username=cicada&password=cicada3303&action=update&privilege=sales&status=active

// * UPDATE child table
// ? http://localhost/doan/admin/Server/customer/customer.php?action=update&name=cicada4&id=KH005

if ($_SERVER['REQUEST_METHOD'] === "POST") {
	if (isset($_REQUEST["action"])){
		
		// * UPDATE EXISTED CUSTOMERS
		if ($_REQUEST["action"] === "update" ){
			// * properties should be update 
			// * child table - customer: id, name, birthday, numberphone, 
			// * parent table - account: username, password

			// * fetch all table properties on account & customer table 

			if (!isset($_REQUEST["id"])) {
				echo "Specify id for updating.";
				exit();
			}

			$headerArrAccount = Table::describe($conn, 'account');
			$headerArrCustomer = Table::describe($conn, 'customer');
			
			// * if "id" value in POST request start with USR, update the parent table (account table)
			if (preg_match('/^USR/', $_REQUEST["id"])) 
				foreach($headerArrAccount as $key => $value) 
					if (isset($_REQUEST[$value]))
						ReqHandling::updateDb(
							$conn, 'account', $_REQUEST["id"], 
							$value, $_REQUEST[$value] 
						);

			// * if "id" value in POST request start with KH, update the child table (customer table)
			if (preg_match('/^KH/', $_REQUEST["id"])) 
				foreach($headerArrCustomer as $key => $value) 
					if (isset($_REQUEST[$value]))
						ReqHandling::updateDb(
							$conn, 'customer', $_REQUEST["id"], 
							$value, $_REQUEST[$value] 
						);
			
		}

		// * CREATE NEW CUSTOMER

		// ? http://localhost/doan/admin/Server/customer/customer.php?username=cicada2&password=cicada3303&action=create&privilege=sales&status=active&name=Lang Thang&birthday=2002-11-30 00:00:00&numberphone=394142891&address=HCM&gender=nam

		if ($_REQUEST["action"] === "create"){

			if (isset($_REQUEST["id"])) {
				echo "You don't need to provide ID for creating new record. Id auto-increasing is available. ";
				exit();
			}

			$maxIdAccount = Table::getMaxId($conn, 'account', 'id');
			$maxIdCustomer = Table::getMaxId($conn, 'customer', 'id');

			// * add new account id on REQUEST superglobal array
			$_REQUEST["id"] = "USR" . strval(sprintf("%03d", $maxIdAccount+1));
			// * update account table first (update parent table)
			ReqHandling::createRow($conn, 'account');
			
			$_REQUEST["id"] = "KH" . strval(sprintf("%03d", $maxIdCustomer+1));
			$_REQUEST["id_user"] = "USR" . strval(sprintf("%03d", $maxIdAccount+1));
			ReqHandling::createRow($conn, 'customer');
		}
	}

}


// * REMOVE CUSTOMERS FROM DATABASE

// ? http://localhost/doan/admin/Server/customer/customer.php?id=USR013

if ($_SERVER['REQUEST_METHOD'] === "PUT") {

	if (!isset($_REQUEST["id"])) {
		echo "Please specify the id of ACCOUNT for deleting.";
		exit();
	}
	
	echo "deleting";
	$_REQUEST['id_user'] = $_REQUEST['id'];

	// * delete from child table
	ReqHandling::deleteRowWithProperty($conn, 'customer', 'id_user', $_REQUEST['id_user']);
	
	// * delete from parent table
	ReqHandling::deleteRowWithProperty($conn, 'account', 'id', $_REQUEST['id']);

}

?>