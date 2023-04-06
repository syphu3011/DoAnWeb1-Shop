<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];
  if ($username==="admin" && $password === "admin") {
    if (isset($_POST["remember"])) {
			$expiration = time() + 3600;
			$user_id = "admin";
			$timestamp_value = bin2hex(time());
			$cookie_value = $expiration . ':' . $user_id . ':' . $timestamp_value;
			setcookie('admin', $cookie_value, $expiration, '/');
			echo "Login success. Redirecting..." . "</br>" ;
    }
		header("Location: http://localhost/doan/Server/user_login.php");
    exit();
  } else {
    echo "Invalid username or password";
  }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	echo json_encode($_COOKIE);
	header('Content-Type: application/json');
}
?>
