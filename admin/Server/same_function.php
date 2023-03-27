<?php
    function check_privilege($username,$conn, $action) {
        $query ="
        SELECT *
        FROM account, privilege_list
        WHERE 
        username = :username and 
        privilege_list.id_primilege = account.id_privilege and 
        privilege_list.id_privilege_group = 'product'
        ";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':username',$username);
        if ($stmt->execute()) {
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($response as $value) {
                if ($value['action'] == $action) {
                    return true;
                }
            }
            return false;
        }
    }
?>