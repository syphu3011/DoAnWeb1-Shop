<?php
class Table {

	// * query all 
	// * -------------------------------
	// * $conn : connection from init.php
	// * $tableName: targeted table name
	public static function tableQueryAll($conn, $tableName) {
		$query = "SELECT * FROM " . $tableName;
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}
	
	// * query 1 child table inner join with 
	// * 1 parent tables on keys with SPECIFIC COLUMNS
	// * child key and parent key are required
	public static function tableQueryCouple($conn, $childTable, $parentTable, $childkey, $parentkey, $column) {
		$query = 
			"SELECT $column FROM $childTable INNER JOIN $parentTable 
			ON $childTable.$childkey = $parentTable.$parentkey;";
		// echo $query . "</br>";
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}

	// * query 1 child table inner join with 2 parent tables on keys
	public static function tableQueryTriple($conn, $childTable, $parentTable, $parentTable2, $key1, $key2, $key3, $key4, $column) {
		$query = 
			"SELECT $column FROM $childTable 
			INNER JOIN $parentTable 
			ON $childTable.$key1 = $parentTable.$key3
			INNER JOIN $parentTable2
			ON $childTable.$key2 = $parentTable2.$key4;";
		// echo $query . "</br>";
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		return $query_statement->fetchAll(PDO::FETCH_ASSOC);
	}

	// * fetch all table properties
	public static function describe($conn, $tableName) {
		$query = $conn->prepare("DESCRIBE ". $tableName);
		$query->execute();
		return $query->fetchAll(PDO::FETCH_COLUMN);
	}
	
	// * get max size of table
	public static function getSizeTable($conn, $tableName) {
		$query = $conn->prepare("SELECT COUNT(*) FROM ". $tableName);
		$query->execute();
		return $query->fetchColumn();
	}
	
	// * get max id in table
	public static function getMaxId($conn, $tableName, $property) {
		$query = $conn->prepare("SELECT $property FROM $tableName");
		$query->execute();
		$max = 0;
		foreach ($query->fetchAll(PDO::FETCH_COLUMN, 0) as $key => $value) {
			preg_match_all('/\d+/', $value, $matches);
			if ($matches[0][0] > $max)
				$max = $matches[0][0];
		};
		return $max;
	}


	// * query one table with one condition
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

	// * query one table with multiple properties and conditions
	// * -----------------------------------------------------
	// * 
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

	// * convert array list into json
	// * -------------------------------------------------
	// * $conn : connection from init.php
	// * $arrFromDb : array fetch from database
	// * $tableName : table name in database for jsonify		
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


	// * merge two array from two table into one json
	public static function jsonifyCouple($conn, $arrFromDb, $childTable, $parentTable) {
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
	
	// * merge 3 array from two table into 1 json
	// * 1 child table and 2 parent tables
	public static function jsonifyTriple($conn, $arrFromDb, $childTable, $parentTable, $parentTable2) {
		$jsonItem = array();
		$propertiesArray = self::describe($conn, $childTable);
		$arrParent = self::describe($conn, $parentTable);
		$arrParent2 = self::describe($conn, $parentTable2);

		foreach ($arrParent as $key => $value) {
			array_push($propertiesArray, "$parentTable" . "." . $value);
		}
		foreach ($arrParent2 as $key => $value) {
			array_push($propertiesArray, "$parentTable2" . "." . $value);
		}

		foreach ($arrFromDb as $index => $record) {
			$tempArray = array();
			foreach ($propertiesArray as $index2 => $colName){	
				if (!array_key_exists($colName, $tempArray)) {
						$explodeArr = explode('.', $colName);
						if (isset($explodeArr[1]))
							$tempArray[$colName] = $record[$explodeArr[1]];
						else
							$tempArray[$colName] = $record[$explodeArr[0]];
					}
			}
			$jsonItem += array(
				$index => $tempArray
			);
		}
		return json_encode($jsonItem, JSON_UNESCAPED_UNICODE);
	}

}
?>