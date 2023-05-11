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
	// * just 1 property
	public static function updateDb($conn, $tableName, $id, $property, $value) {
		try {
			$conn->beginTransaction();
			$query = "UPDATE " . $tableName . " SET " . $property . " = '" . $value . "'" 
				. " WHERE id = " . "'" . $id . "'";
			// echo $query . "</br>";
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
			$conn->commit();
		} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}

	public static function updateDbOnProperty($conn, $tableName, $propertySet, $valueSet, $propertyCondition, $conditionVal) {
		try {
			$conn->beginTransaction();
			$query = "UPDATE " . $tableName . " SET " . $propertySet . " = '" . $valueSet . "'" 
				. " WHERE $propertyCondition = " . "'" . $conditionVal . "'";
				$query_statement = $conn->prepare($query);
				$query_statement->execute();
				// echo json_encode(array("query" => $query), JSON_UNESCAPED_UNICODE);
				$conn->commit();		
			} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}

	public static function subtractSession($conn, $tableName, $propertySet, $valueSet, $propertyCondition, $conditionVal) {
		try {
			$conn->beginTransaction();
			$query = "UPDATE " . $tableName . " SET " . $propertySet . " = '" . $valueSet . "'" 
				. " WHERE $propertyCondition = " . "'" . $conditionVal . "'";
				$query_statement = $conn->prepare($query);
				$query_statement->execute();
				// echo json_encode(array("query" => $query), JSON_UNESCAPED_UNICODE);
				$conn->commit();		
			} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}

	public static function concatSession($conn, $tableName, $propertySet, $valueSet, $propertyCondition, $conditionVal) {
		try {
			$conn->beginTransaction();
			$query = "UPDATE $tableName 
				SET $propertySet = CONCAT($propertySet, '$valueSet')
				WHERE $propertyCondition = '$conditionVal'";
				$query_statement = $conn->prepare($query);
				$query_statement->execute();
				// echo json_encode(array("query" => $query), JSON_UNESCAPED_UNICODE);
				$conn->commit();		
			} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}

	// ? DELETE SECTION DEFAULT ON ID (DEFAULT)
	public static function deleteRow($conn, $tableName, $id) {
		try {
			$conn->beginTransaction();
			$query = "DELETE FROM " . $tableName . " WHERE id = " . "'" . $id . "'";
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
			// echo json_encode(array(
			// 	"query" => $query
			// ), JSON_UNESCAPED_UNICODE);
			$conn->commit();
		} catch (Exception $e) {
			echo "Please specify correct id." . "</br>";
			$conn->rollback();
			exit();
		}
	}

	// ? DELETE SECTION WITH SPECIFIC PROPERTY & VALUE
	public static function deleteRowWithProperty($conn, $tableName, $property, $value) {
		try {
			$conn->beginTransaction();
			$query = "DELETE FROM " . $tableName . " WHERE $property = " . "'" . $value . "'";
			// echo json_encode(array(
			// 	"query" => $query
			// ), JSON_UNESCAPED_UNICODE);
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
			$conn->commit();
		} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}

	// * design for privilege table row erasion
	public static function deleteRowPrivilege(
			$conn, 
			$tableName = "privilege_general_detail", 
			$id_table, 
			$id_feature, 
			$id_user) {
		try {
			$conn->beginTransaction();
			$query = 
			"DELETE FROM $tableName WHERE 
			id_table ='$id_table' AND
			id_feature ='$id_feature' AND
			id_user ='$id_user';
			";
			// echo json_encode(array(
			// 	"query" => $query
			// ), JSON_UNESCAPED_UNICODE);
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
			$conn->commit();
		} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}
	public static function deleteRowPrivilegeGeneral(
			$conn, 
			$tableName = "privilege_general", 
			$id_table, 
			$id_feature, 
			$id_user) {
		try {
			$conn->beginTransaction();
			$query = 
			"DELETE FROM $tableName WHERE 
			id_table ='$id_table' AND
			id_feature ='$id_feature' AND
			id_user ='$id_user';
			";
			// echo json_encode(array(
			// 	"query" => $query
			// ), JSON_UNESCAPED_UNICODE);
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
			$conn->commit();
		} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}
	

	// ? ADD NEW RECORD
	public static function createRow($conn, $tableName) {
		try {
			$conn->beginTransaction();
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
			echo json_encode(array(
				"query" => $query
			), JSON_UNESCAPED_UNICODE);
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
			$conn->commit();
		} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}
	public static function createRowPost($conn, $tableName) {
		try {
			$conn->beginTransaction();
			$header = Table::describe($conn, $tableName);
			$queryArr = array();
			foreach ($header as $index => $value) {
				if (isset($_POST[$value])) {
					array_push($queryArr, $_POST[$value]);
				} else
					array_push($queryArr, "");
					// * những value người dùng không điền sẽ để trống * //
			}
			$query = "INSERT INTO " . $tableName . " (" . implode(",", $header) . ") VALUES ('" .
				implode("','", $queryArr) . "');";
			// echo $query;
			$query_statement = $conn->prepare($query);
			$query_statement->execute();
			$conn->commit();
		} catch (Exception $e) {
			Table::json_fire_exception($e);
			$conn->rollback();
			exit();
		}
	}
}

?>