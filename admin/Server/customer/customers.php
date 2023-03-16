<?php
	// ? GET SECTION
	require_once('../../../init.php');
	function tableQueryAll($conn, $tableName) {
		$query = "SELECT * FROM " . $tableName;
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}

	function tableQueryProperty($conn, $tableName, $property, $content) {
		try {
			$query = "SELECT * FROM " . $tableName . " WHERE " . $property . " = \"" . $content . "\"";
			// echo $query . "</br>";
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
		} catch (Exception $e) {
			echo "Please change key value in parameters." . "</br>";
		}
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}
	
	function describe($conn, $tableName) {
		$query = $conn->prepare("DESCRIBE ". $tableName);
		$query->execute();
		return $query->fetchAll(PDO::FETCH_COLUMN);
	}

	function jsonify($conn, $arrFromDb, $tableName) {
		$jsonItem = array();
		$propertiesArray = describe($conn, $tableName);
		foreach ($arrFromDb as $index => $item) {
			$tempArray = array();
			foreach ($propertiesArray as $index2 => $item2){	
				$tempArray[$item2] = $item[$item2];
			}
			$jsonItem += array(
				$index => $tempArray
			);
		}
		return json_encode($jsonItem, JSON_UNESCAPED_UNICODE);
	}
	
// ? GET SECTION WITH ID, USERNAME PAPRAS.

	// * request with parameter which based on id and username of customer
	// * just handle one of two.
	// ! need to change when reusing.
	function reqWithPara($conn, $tableName) {
		// echo $_GET["id"];
		// echo gettype($_GET["id"]);
		// echo $_GET["username_customer"];
		$iterator_sample = array(
			"id", "username_customer"
		);
		foreach ($iterator_sample as $index => $value) {
			if (isset($_GET[$value])) {
				return tableQueryProperty($conn, $tableName, $value, $_GET[$value]);
			}
		};
	}

// ? POST UPDATE SECTION

function updateDb($conn, $tableName, $id, $property, $value) {
	try {
		$query = "UPDATE " . $tableName . " SET " . $property . " = \"" . $value . "\"" 
			. " WHERE id = " . "\"" . $id . "\"";
		// echo $query . "</br>";
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
	} catch (Exception $e) {
		echo "Please change key value in parameters." . "</br>";
	}
}

// ? DELETE SECTION

function deleteDb($conn, $tableName, $id) {
	try {
		$query = "DELETE FROM " . $tableName . " WHERE id = " . "\"" . $id . "\"";
		// echo $query . "</br>";
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
	} catch (Exception $e) {
		echo "Please specify correct id." . "</br>";
	}
}

function createRow($conn, $tableName) {
	try {
		$header = describe($conn, $tableName);
		$queryArr = array();
		foreach ($header as $index => $value) {
			if (isset($_REQUEST[$value])) {
				array_push($queryArr, $_REQUEST[$value]);
			} else
				array_push($queryArr, "");
		}
		$query = "INSERT INTO " . $tableName . " (" . implode(",", $header) . ") VALUES ('" .
			implode("','", $queryArr) . "');";
		echo $query;
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
	} catch (Exception $e) {
		echo $e . "</br>";
		// ! chua handle exception double phone number same type.
	}
}


	// * table query name depends on folder name on server
	$tableName = basename(dirname(__FILE__));

	header('Content-Type: application/json; charset=utf-8');

	if ($_SERVER['REQUEST_METHOD'] === "GET"){	
		if (count($_GET) > 0) {
			if (!reqWithPara($conn, $tableName)) {
				echo "Please change your key & value" ;
				exit() ;
			}
			echo jsonify($conn, reqWithPara($conn, $tableName), $tableName);
		}
		else {
			$arrFromDb = tableQueryAll($conn, $tableName);
			echo jsonify($conn, $arrFromDb, $tableName);
		}
	} else
	if ($_SERVER['REQUEST_METHOD'] === "POST") {
		if (isset($_REQUEST["action"])){
			if ($_REQUEST["action"] === "update"){
				if (isset($_REQUEST["name"]))
					updateDb($conn, $tableName, $_REQUEST["id"], "name", $_REQUEST["name"] );
				if (isset($_REQUEST["username_customer"])) 
					updateDb($conn, $tableName, $_REQUEST["id"], "username_customer", $_REQUEST["username_customer"] );
				if (isset($_REQUEST["password_customer"])) 
					updateDb($conn, $tableName, $_REQUEST["id"], "password_customer", $_REQUEST["password_customer"] );
				if (isset($_REQUEST["numberphone"])) 
					updateDb($conn, $tableName, $_REQUEST["id"], "numberphone", $_REQUEST["numberphone"] );
				if (isset($_REQUEST["address"])) 
					updateDb($conn, $tableName, $_REQUEST["id"], "address", $_REQUEST["address"] );
				if (isset($_REQUEST["gender"])) 
					updateDb($conn, $tableName, $_REQUEST["id"], "gender", $_REQUEST["address"] );
				if (isset($_REQUEST["id_status"])) 
					updateDb($conn, $tableName, $_REQUEST["id"], "id_status", $_REQUEST["address"] );
				if (isset($_REQUEST["image"])) 
					updateDb($conn, $tableName, $_REQUEST["id"], "image", $_REQUEST["image"] );
			} else
			if ($_REQUEST["action"] === "create") {
				createRow($conn, $tableName);
			}
		}
	} else 
	if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
		if (isset($_REQUEST["id"])) {
			deleteDb($conn, $tableName, $_REQUEST["id"]);
			exit();
		} else {
			echo "Please specify your id for erasion." . "</br>" ;
		}
	}
?>