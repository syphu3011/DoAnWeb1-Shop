<?php
     try {
        $conn = new PDO("mysql:host= localhost;dbname=qlsp;root");
        // Thiết lập chế độ lỗi PDO thành ngoại lệ
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
        echo "Kết nối thất bại: " . $e->getMessage();
    }
?>

