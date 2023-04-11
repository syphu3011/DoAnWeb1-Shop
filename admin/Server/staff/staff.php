<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

$tableName = basename(dirname(__FILE__));
$headerArr = Table::describe($conn, $tableName);

header('Content-Type: application/json; charset=utf-8');



if ($_SERVER['REQUEST_METHOD'] === "GET"){	
	$getAll = True;
	$arrHeader = Table::describe($conn, $tableName);

	foreach ($_REQUEST as $key => $value) {
		foreach ($arrHeader as $key2 => $value2) {
			if ($key === $value2) {
				$getAll = False;
				break;
			}
		}
		if (!$getAll)
			break;
	}

	if ($getAll) {
		// ? http://localhost/doan/admin/Server/staff/staff.php
		$arrFromDb = Table::tableQueryAll($conn, $tableName);
		echo Table::jsonify($conn, $arrFromDb, $tableName);
	} else {
		// ? http://localhost/doan/admin/Server/staff/staff.php?variable2=70&variable1=16
		$arrProperty = array();
		$arrContent = array();
		foreach ($_REQUEST as $key => $value) {
			array_push($arrProperty, $key);
			array_push($arrContent, $value);
		}
		$arrFromDb = Table::tableQueryMultipleProperty(
			$conn, 
			$tableName,
			$arrProperty,
			$arrContent
		);
		echo Table::jsonify($conn, $arrFromDb, $tableName);
	}
	
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

			if (!isset($_REQUEST["id"])) {
				echo "Specify id for updating.";
				exit();
			}

			$headerArrAccount = Table::describe($conn, 'account');
			$headerArrCustomer = Table::describe($conn, 'staff');
			
			// * if "id" value in POST request start with USR, update the parent table (account table)
			if (preg_match('/^USR/', $_REQUEST["id"])) 
				foreach($headerArrAccount as $key => $value) 
					if (isset($_REQUEST[$value]))
						ReqHandling::updateDb(
							$conn, 'account', $_REQUEST["id"], 
							$value, $_REQUEST[$value] 
						);

			// * if "id" value in POST request start with KH, update the child table (customer table)
			if (preg_match('/^NV/', $_REQUEST["id"])) 
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

			if (isset($_REQUEST["id"])) {
				echo "You don't need to provide ID for creating new record. Id auto-increasing is available. ";
				exit();
			}

			$maxIdAccount = Table::getMaxId($conn, 'account', 'id');
			$maxIdCustomer = Table::getMaxId($conn, 'staff', 'id');

			// * add new account id on REQUEST superglobal array
			$_REQUEST["id"] = "USR" . strval(sprintf("%03d", $maxIdAccount+1));
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
	ReqHandling::deleteRowWithProperty($conn, 'account', 'id', $_REQUEST['id']);

}

?>