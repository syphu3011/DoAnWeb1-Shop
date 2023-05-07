<?php
    function check_privilege($id_user,$conn, $action, $privilege_group) {
        $query ="
        SELECT *
        FROM privilege_general_detail
        WHERE 
        id_user = :username and 
        id_table = :privilege_group
        ";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':username',$id_user);
        $stmt->bindParam(':privilege_group',$privilege_group);
        if ($stmt->execute()) {
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($response as $value) {
                if ($value['id_feature'] == $action) {
                    return true;
                }
            }
            return false;
        }
    }
?>