<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');

header('Content-Type: application/json; charset=utf-8');

$tableName = 'account';

function verifyCredential($conn, $tableName = "account", $username, $password, $privilege, $exp, $ses) {
  $arrProperty = array();
  $arrContent = array();
  array_push($arrProperty, 'username');
  array_push($arrContent, $username);
  $arrFromDb = array();
  $arrFromDb = Table::tableQueryMultipleProperty(
    $conn, 
    $tableName,
    $arrProperty,
    $arrContent
  );
  if (!$arrFromDb) {
    echo json_encode(array("message" => "Tên tài khoản không tồn tại."), JSON_UNESCAPED_UNICODE);
    exit();
  // } 
  // else if ($password != $arrFromDb[0]["password"]) {
  //   echo json_encode(array("message" => "Cookie sai mật khẩu."), JSON_UNESCAPED_UNICODE);
  //   exit();
  } else if ($privilege != $arrFromDb[0]["privilege"]) {
    echo json_encode(array("message" => "Cookie không khớp dữ liệu về quyền tài khoản trên server."), JSON_UNESCAPED_UNICODE);
    exit();
  } else if ($exp < time()) {
    echo json_encode(array("message" => "Đã hết hạn phiên đăng nhập."), JSON_UNESCAPED_UNICODE);
    exit();
  } else if (strpos($arrFromDb[0]["session"], $ses) === false) {
    echo json_encode(array("message" => "Bạn đang làm giả cookie. Session không đúng so với CSDL."), JSON_UNESCAPED_UNICODE);
    
    exit();
  } else if ($privilege === "customer") {
    echo json_encode(array("message" => "Bạn đang làm giả cookie. Khách hàng không đăng nhập tại đây."), JSON_UNESCAPED_UNICODE);
    exit();
  } else {
    echo json_encode(array(
      "message" => "Cookie khớp thông tin tài khoản.",
      "exp" => $exp,
      "client_session" => $ses,
      "server_session" => $arrFromDb[0]["session"],
      "privilege" => $privilege,
      "password" => $password
    ), JSON_UNESCAPED_UNICODE);
    exit();
  }
}

function decodeCookie() {
  $decodedCookie = base64_decode($_COOKIE["login_cookie"]);
}

function setCookieLogin($conn, $username, $password, $privilege) {
  // $_SESSION[$username] = $password;
  $exp = time() + (86400 * 30);
  $token = bin2hex(random_bytes(16));
  setcookie('login_cookie', base64_encode("$username:$password:$privilege:$exp:$token"), time() + (86400 * 30), './admin/');
  ReqHandling::concatSession($conn, "account", "session", $token, "username", $username);
}





if ($_SERVER['REQUEST_METHOD'] === "POST") {
  if (isset($_COOKIE["login_cookie"]) || isset($_POST["login_cookie"])) {
    // * nó chạy là được rồi, đừng có hỏi (:
    $cookieStrDecoded = base64_decode($_COOKIE["login_cookie"]);
    $arrSplit = explode(":", $cookieStrDecoded);
    // echo json_encode(array("cookie" => $_COOKIE["login_cookie"]), JSON_UNESCAPED_UNICODE);
    // echo json_encode(array("cookie" => $cookieStrDecoded), JSON_UNESCAPED_UNICODE);
    verifyCredential(
      $conn, 
      "account", 
      $arrSplit[0], 
      $arrSplit[1], 
      $arrSplit[2],
      $arrSplit[3], 
      $arrSplit[4] 
    );
    exit();
  } else if (!isset($_POST["username"])) {
    echo json_encode(array("message" => "Vui lòng thêm username trong body request."), JSON_UNESCAPED_UNICODE);
    // echo json_encode($_SERVER, JSON_UNESCAPED_UNICODE);
    exit();
  }
  if (!isset($_POST["password"])) {
    echo json_encode(array("message" => "Vui lòng thêm password trong para hoặc body request."), JSON_UNESCAPED_UNICODE);
    exit();
  }
  

  $remember = $_POST["remember"];
  $username = $_POST["username"];
  $password = $_POST["password"];
  $password = hash("sha256", $password);
  $arrProperty = array();
  $arrContent = array();
  array_push($arrProperty, 'username');
  array_push($arrContent, $username);
  $arrFromDb = array();
  $arrFromDb = Table::tableQueryMultipleProperty(
    $conn, 
    $tableName,
    $arrProperty,
    $arrContent
  );
  // echo json_encode($arrFromDb, JSON_UNESCAPED_UNICODE);
  if (!$arrFromDb) {
    echo json_encode(array("message" => "Tên tài khoản không tồn tại."), JSON_UNESCAPED_UNICODE);
    exit();
  } else if ($password != $arrFromDb[0]["password"]) {
    echo json_encode(array("message" => "Sai mật khẩu."), JSON_UNESCAPED_UNICODE);
    exit();
  } else if ($arrFromDb[0]["privilege"] === "customer") {
    echo json_encode(array("message" => "Khách hàng không đăng nhập tại đây."), JSON_UNESCAPED_UNICODE);
    exit();
  // } else if ($remember == "true"){
  } else {
    // setCookieLogin($conn, $username, $password, $arrFromDb[0]["privilege"]);
    // echo json_encode(array("cookie" => $_COOKIE, "session" => $_SESSION), JSON_UNESCAPED_UNICODE);
    $cookie_string = "$username:$password";
    echo json_encode(array("message" => "Đăng nhập thành công. Đã tạo phiên đăng nhập mới.", "cookie" => $cookie_string), JSON_UNESCAPED_UNICODE);
    exit();
  }
} else {
  echo json_encode(array("message" => "Vui lòng dùng POST method để xác thực."), JSON_UNESCAPED_UNICODE);
  exit();
}

?>