<?php
    require_once('../init.php');
    $id=$_POST['id'];
    $name=$_POST['name'];
    $dateinit=date('Y-m-d H:i:s');
    $username=$_POST['username'];
    $password=$_POST['password'];
    $birthday=$_POST['birthday'];
    $numberphone=$_POST['numberphone'];
    $gender=$_POST['gender'];
    $status="TT04";
    $sql= "
    INSERT INTO customer(id,name,date_init,username_customer,password_customer,birthday,numberphone,gender,id_status) 
    VALUES (
    :id,
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
    $stmt->bindParam(':id_status',$status);   
    if ($stmt->execute()) {
        // Trả về kết quả cho AJAX request
        echo "success";
      } else {
        // Trả về lỗi nếu có
        echo "Error: " . $sql . "<br>" . $stmt->error;
    }
?>