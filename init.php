?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "shop";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // Thiết lập chế độ lỗi PDO thành ngoại lệ
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Kết nối thành công";
    }
    catch(PDOException $e)
    {
        echo "Kết nối thất bại: " . $e->getMessage();
    }

?>