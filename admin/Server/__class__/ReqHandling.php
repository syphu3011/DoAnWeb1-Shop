<?php

class ReqHandling {

	// ? GET request with parameter which based on id and username of customer
	// * just handle one of two.
	public static function reqWithPara($conn, $tableName, $iterator_sample) {
		// echo $_GET["id"];
		// echo gettype($_GET["id"]);
		// echo $_GET["username_customer"];
		foreach ($iterator_sample as $index => $value) {
			if (isset($_GET[$value])) {
				return Table::tableQueryProperty($conn, $tableName, $value, $_GET[$value]);
			}
		};
	}

	// ? POST UPDATE SECTION
	// * update just 1 property
	public static function updateDb($conn, $tableName, $id, $property, $value) {
		try {
			$query = "UPDATE " . $tableName . " SET " . $property . " = '" . $value . "'" 
				. " WHERE id = " . "'" . $id . "'";
			// echo $query . "</br>";
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
		} catch (Exception $e) {
			echo "Please change key value in parameters." . "</br>";
		}
	}

	public static function updateDbOnProperty($conn, $tableName, $propertySet, $valueSet, $propertyCondition, $conditionVal) {
		try {
			$query = "UPDATE " . $tableName . " SET " . $propertySet . " = '" . $valueSet . "'" 
				. " WHERE $propertyCondition = " . "'" . $conditionVal . "'";
			// echo $query . "</br>";
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
		} catch (Exception $e) {
			echo "Please change key value in parameters." . "</br>";
		}
	}

	// ? DELETE SECTION DEFAULT ON ID (DEFAULT)
	public static function deleteRow($conn, $tableName, $id) {
		try {
			$query = "DELETE FROM " . $tableName . " WHERE id = " . "'" . $id . "'";
			// echo $query . "</br>";
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
		} catch (Exception $e) {
			echo "Please specify correct id." . "</br>";
		}
	}

	// ? DELETE SECTION WITH SPECIFIC PROPERTY & VALUE
	public static function deleteRowWithProperty($conn, $tableName, $property, $value) {
		try {
			$query = "DELETE FROM " . $tableName . " WHERE $property = " . "'" . $value . "'";
			// echo $query . "</br>";
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
		} catch (Exception $e) {
			echo "Please specify correct id." . "</br>";
		}
	}

	// ? ADD NEW RECORD
	public static function createRow($conn, $tableName) {
		try {
			$header = Table::describe($conn, $tableName);
			$queryArr = array();
			foreach ($header as $index => $value) {
				if (isset($_REQUEST[$value])) {
					array_push($queryArr, $_REQUEST[$value]);
				} else
					array_push($queryArr, "");
					// * những value người dùng không điền sẽ để trống * //
			}
			$query = "INSERT INTO " . $tableName . " (" . implode(",", $header) . ") VALUES ('" .
				implode("','", $queryArr) . "');";
			// echo $query;
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
		} catch (Exception $e) {
			echo $e . "</br>";
			// ! chua handle exception double phone number same.
		}
	}
}

?>