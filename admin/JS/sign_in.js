window.onload = function() {
  document.querySelector('.fade-in').classList.add('show');
};

function checkCookie(name) {
  var cookies = document.cookie.split(';');
  for(var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if(cookie.indexOf(name) === 0) {
      return true;
    }
  }
  return false;
}

if(checkCookie('login_cookie')) {
  $("#login-redirect").css("display", "flex");
} else {
  $("#login-redirect").css("display", "none");
}

$("#manage").click(function () {
  window.location.href = "./admin/";
})

$("#log-out-but").click(function () {
  $("#login-redirect").css("display", "none");
  $.ajax({
    url: "../admin/Server/account/logout.php",
    method: "POST",
    success: function (response) {
      console.log(response);
    },
    error: function (response) {
      console.log(response)
    }
  })
})

function cookieToObject(cookieString) {
  const cookieArr = cookieString.split("; ");
  const cookieObj = {};

  cookieArr.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookieObj[key] = value;
  });

  return cookieObj;
}


$(document).ready(function () {
  

  $.ajax({
    url: "../admin/Server/account/login.php",
    method: "POST",
    success: function (response) {
      if (response.message === 'Bạn đang làm giả cookie. Session không đúng so với CSDL.') {
        $("#login-redirect").css("display", "none");
      }
    },
    error: function (response) {
      console.log(response)
    }
  })
})

// Cookies.set('admin_shop_cookie', 'anhphideptrai nek', { expires: 7, path: '/doan/admin/sign_in.html' });

// if (Cookies.get('login_cookie') !== undefined) {
// }

$("#log-but").click(function () {
    let data = {
      username: $("#username").val(),
      password: $("#password").val(),
      remember: $("#remember").prop("checked")
    }
    $.post("../admin/Server/account/login.php", data, (response) => {
      console.log(response);
      $("#sign-in-noti-content").html(`${response.message}`)
      if (response.message == "Đăng nhập thành công. Đã tạo phiên đăng nhập mới.") {
        document.cookie = response.cookie
        location.href = './'
      }
      else if (response.message == "Tên tài khoản không tồn tại.") {
        $("#username").focus();
      } else if (response.message == "Sai mật khẩu.") {
        $("#password").focus();
      }
      $("#notification-wrapper").fadeIn(1000);
      $("#notification-wrapper").css("display", "flex");
      $("#notification-wrapper").fadeOut(1000);
    });
  }
); 