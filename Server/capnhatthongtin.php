<?php
    require_once('../init.php');
    $id=$_POST['id'];
    $name=$_POST['name'];
    $numberphone=$_POST['numberphone'];
    $birthday=$_POST['birthday'];
    $gender=$_POST['gender'];
    $sql="UPDATE customer 
    SET name = :name, numberphone= :numberphone, birthday= :birthday, 
    gender = :gender  
    WHERE id =:id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name',$name);
    $stmt->bindParam(':numberphone',$numberphone);
    $stmt->bindParam(':birthday',$birthday);
    $stmt->bindParam(':gender',$gender);
    $stmt->bindParam(':id',$id);
    if ($stmt->execute()) {
        // Trả về kết quả cho AJAX request
        echo "success";
      } else {
        // Trả về lỗi nếu có
        echo "Error: " . $sql . "<br>" . $stmt->error;
    }
?>