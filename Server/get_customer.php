<?php
    // Lấy dữ liệu từ biểu mẫu
    $username_form = $_POST['username'];
    $password_form = $_POST['password'];
    //
    $status=false;
    //Lấy dữ liệu từ Database
    require_once("../init.php");
    $sql="SELECT *  FROM customer WHERE username_customer = '$username_form' AND password_customer= '$password_form'";
    $stmt=$conn->prepare($sql);
    $stmt->execute();
    $user_account=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($stmt->rowCount()>0){
        $status=true;
    }else{
        $stmt=null;
        $sql="SELECT *  FROM staff WHERE username_staff = '$username_form' AND password_staff= '$password_form'";
        $stmt=$conn->prepare($sql);
        $stmt->execute();
        $user_account=$stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($stmt->rowCount()>0){
            $status=true;
        }
    }
    $stmt=null;
    // $response;
    $response = array(
            'success' => $status,
            'data'=>$user_account
        );
    echo json_encode($response);
?>