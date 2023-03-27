<?php
    function check_privilege($query, $id_privilege,$conn) {
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id',$id_privilege);
        if ($stmt->execute()) {
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($response as $value) {
                if ($value['obviously'] == 'them') {
                    return true;
                }
            }
            return false;
        }
    }
?>