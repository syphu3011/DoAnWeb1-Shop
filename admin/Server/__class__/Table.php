<?php
class Table {

	public static function tableQueryAll($conn, $tableName) {
		$query = "SELECT * FROM " . $tableName;
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public static function tableQueryCustomer($conn, $childTable, $parentTable, $column) {
		$query = 
			"SELECT $column FROM $childTable INNER JOIN $parentTable 
			ON $childTable.id_user = $parentTable.id;";
		// echo $query . "</br>";
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public static function describe($conn, $tableName) {
		$query = $conn->prepare("DESCRIBE ". $tableName);
		$query->execute();
		return $query->fetchAll(PDO::FETCH_COLUMN);
	}
	
	public static function tableQueryProperty($conn, $tableName, $property, $content) {
		try {
			$query = "SELECT * FROM " . $tableName . " WHERE " . $property . " = '" . $content . "'";
			// echo $query . "</br>";
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
		} catch (Exception $e) {
			echo "Please change key value in parameters." . "</br>";
		}
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public static function tableQueryMultipleProperty($conn, $tableName, $arrProperty, $arrContent) {
		$query = "SELECT * FROM " . $tableName . " WHERE " ;
		$arrLength = count($arrProperty);	
		foreach($arrProperty as $index => $value) {
			if ($index === $arrLength - 1)
				$query = $query . $value . " = '" . $arrContent[$index] . "'";
			else 
				$query = $query . $value . " = '" . $arrContent[$index] . "' AND ";
		}
		$query = $query . ';';
		// echo $query . "</br>";
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}

	public static function jsonify($conn, $arrFromDb, $tableName) {
		$jsonItem = array();
		$propertiesArray = self::describe($conn, $tableName);
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

	public static function jsonifyChildAndParent($conn, $arrFromDb, $childTable, $parentTable) {
		$jsonItem = array();
		$propertiesArray = self::describe($conn, $childTable);
		$arrParent = self::describe($conn, $parentTable);
		foreach ($arrParent as $key => $value) {
			array_push($propertiesArray, $value);
		}
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
}
?>