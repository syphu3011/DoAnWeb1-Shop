// let firstName = document.getElementById("inp-firstname")
// let lastName = document.getElementById("inp-lastname")
let username = document.getElementById("inp-username")
// let number_phone = document.getElementById("phone-mail-regis")
// let password_regis = document.getElementById("passwd-regis")
// let same_passwd = document.getElementById("same-passwd")
// let birthday = document.getElementById("birthday")
// let btnsigup = document.getElementById("btn-regis")


// Đăng ký đẩy thông tin lên server
$(document).ready(function() {

	$('#form-signup').submit(function(e) {
		e.preventDefault();
        if(Checkavai()==true){
		// Gửi thông tin đăng ký lên server
        $.ajax({
            url: './Server/dangky.php',
            method: 'POST',
            data:{
                id:'KH00010',
                name:firstName.value + ' ' + lastName.value,
                dateinit: getCurrentDate(),
                username: $('#inp-username').val(),
                password: password_regis.value,
                birthday: birthday.value,
                numberphone: number_phone.value,
                gender: sex
            },
			success: function(response) {
				if (response === 'success') {
                    notifition();
				} else {
					alert('Đăng ký thất bại! ' + response);
				}
			}
		});
    }
	});
});


function getCurrentDate() {
    function formatNumber(number) {
        return number < 10 ? "0" + number : number
    }
    var today = new Date();
    var hour = formatNumber(today.getHours())
    var minute = formatNumber(today.getMinutes())
    var second = formatNumber(today.getSeconds())
    var dd = formatNumber(today.getDate())
    var mm = formatNumber(today.getMonth()+1)
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy + " " + hour + ':' + minute + ':' + second;
    return today
}

function Customer(id, name, number_phone, username, password, sex, birth_day, address = "", image = "", cart = [], status = "Đang hoạt động") {
    this.id = id
    this.name = name
    this.number_phone = number_phone
    this.username = username
    this.password = password
    this.sex = sex
    this.birth_day = birth_day
    this.address = address
    this.image = image
    this.cart = cart
    this.status = status
    this.data_init = getCurrentDate()
}

function checkValid(firstName, lastName, username, password, same_password, number_phone, birth_day, sex) {
    if (
        firstName == "" ||
        lastName == "" ||
        username == "" ||
        password == "" ||
        same_password == "" ||
        number_phone == "" ||
        birth_day == "" ||
        sex == "") {
        return false
    }
    return true
}

function checkConstraintRegis(customer) {
    for (element of data.customer) {
        if (element.username == customer.username || element.number_phone == customer.number_phone) {
            return false
        }
    }
    return true
}

function checkSamePassword(password, same_password) {
    if (password == same_password) {
        return true
    }
    return false
}

function initId() {
    if (data.customer.length == 0) {
        return "KH0001"
    }
    let number = parseInt(data.customer[data.customer.length - 1].id.replace("KH", ""))
    let newId = "KH" + String(number + 1).padStart(4, "0")
    return newId
}

function checkDate(birthday) {
    if (parseInt(birthday.split("-")[0]) < 1900 || parseInt(birthday.split("-")[0]) > 2017) {
        return false
    }
    return true
}
let sex = ""
document.getElementsByName("sex").forEach(e => {
    e.onclick = function() {
        sex = e.value
    }
})
// btnsigup.onclick = function() {

//     let username = document.getElementById("inp-username")
//     if (checkValid(
//             firstName.value,
//             lastName.value,
//             username.value,
//             password_regis.value,
//             same_passwd.value,
//             number_phone.value,
//             birthday.value)) {
//         if (checkSamePassword(password_regis.value, same_passwd.value)) {
//             if (checkDate(birthday.value)) {
//                 let customer = new Customer(
//                     initId(),
//                     firstName.value.trim() + " " + lastName.value.trim(),
//                     number_phone.value.trim(),
//                     username.value.trim(),
//                     password_regis.value,
//                     sex,
//                     birthday.value)
//                 if (checkConstraintRegis(customer) == true) {
//                     data.customer.push(customer)
//                     localStorage.setItem("data", JSON.stringify(data))
//                     showacc(signup, 0, 1200)
//                     setTimeout(() => {
//                         signup.style.display = ""
//                         account.style.display = ""
//                     }, 450);
//                 } else {
//                     alert("Tài khoản đã tồn tại")
//                 }
//             } else {
//                 alert("Ngày sinh không hợp lệ")
//             }
//         } else {
//             alert("Bạn đã nhập 2 mật khẩu không giống nhau!")
//         }
//     } else {
//         alert("Không được bỏ trống bất cứ thông tin nào!")
//     }
// }

function notifition(){
    showacc(signup, 0, 1200);
              setTimeout(() => {
                signup.style.display = "";
                account.style.display = "";
                document.getElementById("noti").style.display = "flex";
                document.getElementById("noti-noti").innerHTML =
                  "Đăng ký thành công";
                showacc(document.getElementById("noti-noti"), -500, 0);
                document.getElementById("noti-noti").style.display = "flex";
                setTimeout(() => {
                  document.getElementById("noti").style.display = "";
                  account.style.display = "flex";
                  showacc(signin, -500, 0);
                }, 700);
              }, 450);
}
function Checkavai(){
    let flag=true
    if (checkValid(
                    firstName.value,
                    lastName.value,
                    username.value,
                    password_regis.value,
                    same_passwd.value,
                    number_phone.value,
                    birthday.value)) {
                if (checkSamePassword(password_regis.value, same_passwd.value)) {
                    if (checkDate(birthday.value)) {
                        let customer = new Customer(
                            initId(),
                            firstName.value.trim() + " " + lastName.value.trim(),
                            number_phone.value.trim(),
                            username.value.trim(),
                            password_regis.value,
                            sex,
                            birthday.value)
                        if (checkConstraintRegis(customer) == true) {
                            data.customer.push(customer)
                            localStorage.setItem("data", JSON.stringify(data))
                            showacc(signup, 0, 1200)
                            setTimeout(() => {
                                signup.style.display = ""
                                account.style.display = ""
                            }, 450);
                        } else {
                            alert("Tài khoản đã tồn tại")
                            flag=false;
                        }
                    } else {
                        alert("Ngày sinh không hợp lệ")
                        flag=false;
                    }
                } else {
                    alert("Bạn đã nhập 2 mật khẩu không giống nhau!")
                    flag=false;
                }
            } else {
                alert("Không được bỏ trống bất cứ thông tin nào!")
                flag=false;
            }
            return flag
}