<?php
    $id=$_POST['id'];
    $name=$_POST['name'];
    $dateinit=$_POST['date-init'];
    $username=$_POST['username'];
    $password=$_POST['password'];
    $birthday=$_POST['brithday'];
    $numberphone=$_POST['numberphone'];
    $gender=$_POST['gender'];

    $sql= " INSERT INTO customer(id,name,date_init,username_customer,
    password_customer,brithday,numberphone,gender,id_status) 
    VALUES ('$id','$name','$dateinit','$username','$password','$brithday','$numberphone','$gender','TT04')";
    if ($conn->query($sql) === TRUE) {
        // Trả về kết quả cho AJAX request
        echo "success";
      } else {
        // Trả về lỗi nếu có
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
?>