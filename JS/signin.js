let currentUser = null
btnlogin.onclick = function() {
    if (mailorphone.value == "" || passwd.value == "") {
        alert("vui lòng nhập đủ thông tin")
    } else {
        let checkOk = false
        data.customer.forEach(element => {
            if ((element.username == mailorphone.value || element.number_phone == mailorphone.value) && element.password == passwd.value) {
                showacc(signin, 0, 1200)
                setTimeout(() => {
                    signin.style.display = ""
                    account.style.display = ""
                }, 450);
                username = element.username
                currentUser = element
                document.getElementById("name-in4").innerHTML = currentUser.name
                document.getElementById("update-name").value = currentUser.name
                document.getElementById("update-contact").value = currentUser.number_phone
                let birthday = currentUser.birth_day.split("-")[2] + "-" + currentUser.birth_day.split("-")[1] + "-" + currentUser.birth_day.split("-")[0]
                document.getElementById("birthday-in4").innerHTML = birthday
                document.getElementById("phone-in4").innerHTML = currentUser.number_phone
                localStorage.setItem("currentIdUser", JSON.stringify(currentUser))

                checkOk = true
            }
        })
        if (!checkOk) {
            alert("Tài khoản hoặc mật khẩu không chính xác")
        }
    }
}
document.getElementById("hide-show").onclick = function() {
    if (document.getElementById("passwd").type == "password") {
        document.getElementById("passwd").type = "text"
        document.getElementById("img-hideshow").src = "Image/eye.png"
    } else {
        document.getElementById("passwd").type = "password"
        document.getElementById("img-hideshow").src = "Image/hidden.png"
    }
}