<?php
function check_name($conn, $name, $id = '') {
    $stmt = $conn->prepare("SELECT * FROM classify WHERE name = :name and id <> :id");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':id', $id);
    $stmt -> execute();
    $row_fetch = $stmt -> rowCount();
    if ($row_fetch > 0) {
        $conn->rollBack();
        return false;
    }
    return true;
}
function check_id($conn, $id) {
    $stmt = $conn->prepare("SELECT * FROM classify id = :id");
    $stmt->bindParam(':id', $id);
    $stmt -> execute();
    $row_fetch = $stmt -> rowCount();
    if ($row_fetch > 0) {
        $conn->rollBack();
        return false;
    }
    return true;
}
?>