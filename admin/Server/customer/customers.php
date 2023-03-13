<?php
	require_once('../../../init.php');
	function customerConnect($conn, $tableName) {
		$query = "SELECT * FROM " . $tableName;
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}
	
	function describe($conn, $tableName) {
		$query = $conn->prepare("DESCRIBE ". $tableName);
		$query->execute();
		return $query->fetchAll(PDO::FETCH_COLUMN);
	}

	function jsonify($conn, $customersArray, $tableName) {
		$jsonItem = array();
		$propertiesArray = describe($conn, $tableName);
		foreach ($customersArray as $index => $item) {
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
	$tableName = 'staff';
	$customersArray = customerConnect($conn, $tableName);
	echo jsonify($conn, $customersArray, $tableName);
?>