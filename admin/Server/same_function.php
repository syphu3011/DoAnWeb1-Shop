<?php
    function check_privilege($id_user, $hash_pass,$conn, $action, $privilege_group) {
        $query ="
        SELECT account.id_user, id_feature
        FROM privilege_general_detail, account
        WHERE 
        privilege_general_detail.id_user = account.id_user and
        username = :username and 
        password = :hash_pass and
        id_table = :privilege_group
        ";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':username',$id_user);
        $stmt->bindParam(':hash_pass',$hash_pass);
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