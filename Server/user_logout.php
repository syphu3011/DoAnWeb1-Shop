<?php
if (isset($_POST['logout'])) {
	// Delete the login cookie
	// unset($_SESSION['admin']);
	// session_destroy();
	setcookie('admin', '', time() - 3600, '/');
	echo "log out success";
}
// Redirect the user to the login page
// header("Location: login.php");
exit();
?>
