<?php
    function check_name($conn, $name, $id = '') {
        $stmt = $conn->prepare("SELECT * FROM product WHERE name = :name and id <> :id");
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
    function check_input_country($conn, &$made_in) {
        $stmt = $conn->prepare("SELECT * FROM input_country WHERE name = :name");
        $stmt->bindParam(':name', $made_in);
        $stmt -> execute();
        if ($stmt -> rowCount() == 0) {
            $stmt = $conn->prepare("SELECT * FROM input_country order by id");
            $stmt->execute();
            $result_made_in = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $last_id = $result_made_in[sizeof($result_made_in) - 1]['id'];
            $number_of_id = (int)explode('ct', $last_id)[1] + 1;
            $id_made_in = 'ct'.str_pad($number_of_id, 3, 0,STR_PAD_LEFT);
            $stmt = $conn->prepare("INSERT INTO input_country VALUES (:id, :name)");
            $stmt->bindParam(':id', $id_made_in);
            $stmt->bindParam(':name', $made_in);
            $stmt->execute();
            $made_in = $id_made_in;
        }
        else {
            $result_made_in = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $made_in = $result_made_in[0]['id'];
        }
    }
?>