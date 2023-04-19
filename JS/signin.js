// let test;
document
  .getElementById("form_login")
  .addEventListener("submit", function (event) {
    //Ngăn chặn hành vi mặc định của trình duyệt
    event.preventDefault();
    // Lấy giá trị của tên đăng nhập và mật khẩu từ form
    var username = document.getElementById("mailorphone").value;
    var password = document.getElementById("passwd").value;
    if (username != "") {
      if (password != "") {
        // Tạo đối tượng XMLHttpRequest để gửi yêu cầu Ajax
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            // Xử lý kết quả trả về từ server
            //kiểm tra xem request được gửi đi đã thành công hay chưa
            if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              console.log(response);
              //   test = response;
              if (response.success) {
                // console.log(response.data);
                //Đăng nhập với vai trò nhân viên
                if (response.data.account.privilege.indexOf("customer") != -1) {
                  //Đăng nhập vào enduser
                  currentUser = response.data.customer;
                  // localStorage.setItem("ID", response.data.customer.id);
                  //Ẩn giao diện đăng nhập
                  showacc(signin, 0, 1200);
                  // Thông báo đăng nhập thành công
                  //Bảng thông báo
                  setTimeout(() => {
                    signin.style.display = "";
                    account.style.display = "";
                    document.getElementById("noti").style.display = "flex";
                    document.getElementById("noti-noti").innerHTML =
                      "Đăng nhập thành công";
                    showacc(document.getElementById("noti-noti"), -500, 0);
                    document.getElementById("noti-noti").style.display = "flex";
                    setTimeout(() => {
                      document.getElementById("noti").style.display = "";
                    }, 700);
                  }, 450);
                  // alert("Đăng nhập thành công!");
                  fill_infor(
                    currentUser.id,
                    currentUser.name,
                    currentUser.numberphone,
                    currentUser.birthday,
                    currentUser.gender,
                    currentUser.image
                  );
                } else {
                  console.log("Bạn đang đăng nhập với vai trò nhân viên");
                  localStorage.setItem(
                    "currentStaff",
                    JSON.stringify(response.data.staff)
                  );
                  localStorage.setItem("checkLogin", true);
                  window.location.href = "./admin/index.html";
                }
              } else {
                // Thông báo đăng nhập thất bại
                document.getElementById("mailorphone").focus();
                alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
              }
            } else {
              // Thông báo lỗi nếu có
              alert("Lỗi khi kết nối đến server!");
            }
          }
        };
        // Gửi yêu cầu Ajax đến server để xác thực đăng nhập
        xhr.open("POST", "./Server/get_customer.php");
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send("username=" + username + "&password=" + password);
      } else {
        document.getElementById("passwd").focus();
        alert("Mật khẩu không được bỏ trống");
      }
    } else {
      document.getElementById("mailorphone").focus();
      alert("Tên đăng nhập không được bỏ trống");
    }
  });
function fill_infor(
  id,
  name,
  number_phone,
  birth_day,
  gender,
  password_customer
) {
  document.getElementById("update-name").value = name;
  document.getElementById("update-contact").value = number_phone;
  birth_day = birth_day.split(" ")[0];
  document.getElementById("update-birthday").value = birth_day;
  if (gender == "nam") {
    document.getElementById("male").checked = true;
  } else if (gender == "nữ") {
    document.getElementById("female").checked = true;
  } else {
    document.getElementById("other").checked = true;
  }
  document.getElementById("save-update").onclick = function () {
    $.ajax({
      url: "./admin/Server/customer/customer.php?action=update",
      method: "POST",
      dataType: "json",
      data: {
        id: id,
        name: name,
        numberphone: number_phone,
        birthday: birth_day,
        gender: gender,
        // password: password_customer
      },
      success: function (response) {
        console.log(response);
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  };
}
