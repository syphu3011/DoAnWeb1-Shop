<?php
class CRUDtaikhoan
{
    public function insertUser($conn,$id,$name,$dateinit,$username,$password,$birthday
    ,$numberphone,$gender,$id_status)
    {
        try {
            $sql = "INSERT INTO  customer(id,name,date_init,username_customer,
            password_customer,birthday
            ,numberphone,gender,id_status)
                    VALUES ( :id,
                    :name,
                    :dateinit,
                    :username,
                    :password,
                    :birthday,
                    :numberphone,
                    :gender,
                    :id_status)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':name',$name);
            $stmt->bindParam(':dateinit',$dateinit);    
            $stmt->bindParam(':username',$username);
            $stmt->bindParam(':password',$password);
            $stmt->bindParam(':birthday',$birthday);
            $stmt->bindParam(':numberphone',$numberphone);
            $stmt->bindParam(':gender',$gender);
            $stmt->bindParam(':id_status',$id_status);
            $stmt->execute();
            return "success";
            // echo "success";
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
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