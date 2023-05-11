<?php
require_once('../../../init.php');
require_once('../__class__/Table.php');
require_once('../__class__/ReqHandling.php');


header('Content-Type: application/json; charset=utf-8');

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
  // } else if (strpos($arrFromDb[0]["session"], $ses) === false) {
  //   echo json_encode(array("message" => "Session không đúng so với CSDL."), JSON_UNESCAPED_UNICODE);
  //   exit();
  } else {
    echo json_encode(array(
      "message" => "Cookie khớp thông tin tài khoản.",
      "username" => $username,
      "exp" => $exp,
      "client_session" => $ses,
      "server_session" => $arrFromDb[0]["session"],
      "privilege" => $privilege,
      "password" => $password
    ), JSON_UNESCAPED_UNICODE);
    return array(
      "message" => "Cookie khớp thông tin tài khoản.",
      "username" => $username,
      "exp" => $exp,
      "client_session" => $ses,
      "server_session" => $arrFromDb[0]["session"],
      "privilege" => $privilege,
      "password" => $password
    );
  }
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $cookieStrDecoded = base64_decode($_COOKIE["login_cookie"]);
  $arrSplit = explode(":", $cookieStrDecoded);
  $afterCredential = verifyCredential(
    $conn, 
    "account", 
    $arrSplit[0], 
    $arrSplit[1], 
    $arrSplit[2],
    $arrSplit[3], 
    $arrSplit[4] 
  );
  $username = $afterCredential["username"];
  // * clear the token on server side
  $clientSession = $afterCredential["client_session"];
  $serverSession = $afterCredential["server_session"];
  $newServerSession = 
  str_replace($clientSession, "", $serverSession);  

  // echo $serverSession;
  ReqHandling::subtractSession($conn, "account", "session", $newServerSession, "username", $username);
  // * clear the cookie on client side
  setcookie("login_cookie", "");
  // *
  echo json_encode(array("message" => "Đã xóa cookie."), JSON_UNESCAPED_UNICODE);
  exit();
} else {
  echo json_encode(array("message" => "Vui lòng dùng POST method để xác thực."), JSON_UNESCAPED_UNICODE);
  exit();
}
?>