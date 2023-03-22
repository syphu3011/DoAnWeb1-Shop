<?php
// TODO https://www.youtube.com/watch?v=QF1eP9f-0EI
// TODO reduce quality image later

function updateImageInRow($conn, $tableName) {
	echo "upload function";	
	$nameInForm = "ImageToUpload";
	$target_dir = "./Image/avt";
	$target_file = $target_dir . basename($_FILES[$nameInForm]["name"]);
	move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
}

require('../../../init.php');

function showPropertyOfFILES() {
	foreach ($_FILES["fileToUpload"] as $key => $value) {
		echo $key . " " . $value . "</br>";
	}
}

function updateOnDb($conn, $tableName, $id, $property, $value) {
		$query = "UPDATE " . $tableName . " SET " . $property . " = '" . $value . "'" 
			. " WHERE id = " . "'" . $id . "'";
		echo $query . "</br>";
		$query_statement = $conn->prepare($query);
		$query_statement->execute();
		echo $id . "</br>";
}

function updateImage($conn){
	if ($_SERVER['REQUEST_METHOD']==='POST') {
		$target_folder = "./uploads/";
		$target_dir = $target_folder . uniqid(id) . basename($_FILES["fileToUpload"]["name"]);
		$extenstion = strtolower(end(explode(".", $target_dir)));
		
		// showPropertyOfFILES();
		updateOnDb($conn, 'customer', $_REQUEST["id"], 'image', $target_dir);
		// print_r($_REQUEST);

		move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir);
		// echo $target_dir . "</br>";
		echo "Update image successfully.";
	}
}

updateImage($conn);



?>