<?php
class CRUDtaikhoan
{
    function insert_data($conn, $username, $password,$name,
    $birthday,$numberphone, $gender) {
        $privilege= "custommer";
        $status="active";
        // Insert into account table
        $sql_account = "INSERT INTO account (username, password, 
        privilege, status) 
        VALUES (
        :username,
        :password, 
        :privilege, 
        :status
        )";
        $stmt_ac = $conn->prepare($sql_account);
        $stmt_ac->bindParam(":username", $username);
        $stmt_ac->bindParam(":password", $password);
        $stmt_ac->bindParam(":privilege", $privilege);
        $stmt_ac->bindParam(":status", $status);
        if ($stmt_ac->execute() === FALSE) {
            echo "Error: " . $stmt_ac->error;
            $stmt_ac->close();
            return;
        }
        // Lấy id dòng cuối của bảng account
        $id = $stmt_ac->lastInsertId();  
        // Insert into customer table
        $sql_cus = "INSERT INTO customer (name, birthday, numberphone, gender, id_user) 
        VALUES (
            :name,
            :birthday,
            :numberphone,
            :gender,
            :id_user
        )";
        $stmt_cus = $conn->prepare($sql_cus);
        $stmt_cus->bindParam(":name", $name);
        $stmt_cus->bindParam(":birthday", $birthday);
        $stmt_cus->bindParam(":numberphone",$numberphone);
        $stmt_cus->bindParam(":gender",$gender);
        $stmt_cus->bindParam(":id_user",$id);
        if ($stmt_cus->execute() === FALSE) {
            echo "Error: " . $stmt_cus->error;
            $stmt_cus->close();
            return;
        }    
    
    } 

//     public function updateUser($name,$numberphone,$birthday,$gender,id)
//     {
//         try {
//             $sql = "UPDATE customer
//                     SET column1=:column1, column2=:column2
//                     WHERE id=:id";
//             $stmt = $this->conn->prepare($sql);
//             $stmt->bindParam(":column1", $name);
//             $stmt->bindParam(":column2", $value2);
//             $stmt->bindParam(":id", $id);
//             $stmt->execute();
//             return "Record updated successfully";
//         } catch (PDOException $e) {
//             echo "Error: " . $e->getMessage();
//         }
//     }
}
?>