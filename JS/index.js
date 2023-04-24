let exit = document.getElementById("exit-log");
let divAcc = document.getElementById("account");
let signup = document.getElementById("signup");
let btnsignup = document.getElementById("btn-signup");
let btnlogin = document.getElementById("btn-login");
let mailorphone = document.getElementById("mailorphone");
let passwd = document.getElementById("passwd");
let btnlogout = document.getElementById("log-out");
let btnback =
    '<div id="back"><img style="height: 15px; transform: rotate(180deg);" src="Image/btn-next-prev.png" alt=""><div>quay lại</div></div>';
let showtype = document.getElementById("show-type");
let showprice = document.getElementById("show-price");
let showsale = document.getElementById("show-sale");
let btnprodw = document.getElementById("choose-product-women");
let prod = document.getElementById("product");
let btnprodm = document.getElementById("choose-product-men");
let prodm = document.getElementById("men-product");
let btnuser = document.getElementById("user");
let showuser = document.getElementById("show-user");
let btnshowfilter = document.getElementById("show-filter");
let filterbar = document.getElementById("filter-bar");
let poster = document.getElementById("poster");
let uname = document.getElementById("name");
let btncart = document.getElementById("cart");
let account = document.getElementById("account");
let signin = document.getElementById("signin");
let listtype = document.getElementById("list-type");
let listprice = document.getElementById("list-price");
let listsale = document.getElementById("list-sale");
let in4 = document.getElementById("in4");
let showcart = document.getElementById("show-cart");
let updateinf = document.getElementById("update-in4");
let inStock = new Array();
let arrImg = [
    "Unknown.jpeg",
    "poster.png",
    "img_banner_watch_women.jpeg",
    "img_banner_watch_men.jpeg",
    "balo-img.png",
    "sale-0.jpeg",
];
let x = 1;
let y = 2;
let btnPrevious = document.getElementById("btn-previous");
let btnNext = document.getElementById("btn-next");
let isClicked = false;
let interv = setInterval(function () {
    inter();
}, 5000);
let pathImage = new Array();
let arrProduct = new Array();
let currentPage = 1;
let checkInCart = false;
// data = JSON.parse(localStorage.getItem("data"));
let currentUser = null;
let firstName = document.getElementById("inp-firstname");
let lastName = document.getElementById("inp-lastname");
let number_phone = document.getElementById("phone-mail-regis");
let password_regis = document.getElementById("passwd-regis");
let same_passwd = document.getElementById("same-passwd");
let birthday = document.getElementById("birthday");
let btnsigup = document.getElementById("btn-regis");
let mouse_enter_gender_product = "";
document.getElementById("product").onmouseenter = function () {
    document.getElementById("product").style.display = "block";
};
document.getElementById("product").onmouseleave = function () {
    document.getElementById("product").style.display = "";
    mouse_enter_gender_product = "";
};
function getCurrentDate() {
    function formatNumber(number) {
        return number < 10 ? "0" + number : number;
    }
    var today = new Date();
    var hour = formatNumber(today.getHours());
    var minute = formatNumber(today.getMinutes());
    var second = formatNumber(today.getSeconds());
    var dd = formatNumber(today.getDate());
    var mm = formatNumber(today.getMonth() + 1);
    var yyyy = today.getFullYear();

    today =
        dd + "/" + mm + "/" + yyyy + " " + hour + ":" + minute + ":" + second;
    return today;
}

function checkValid(
    firstName,
    lastName,
    username,
    password,
    same_password,
    number_phone,
    birth_day,
    sex
) {
    if (
        firstName == "" ||
        lastName == "" ||
        username == "" ||
        password == "" ||
        same_password == "" ||
        number_phone == "" ||
        birth_day == "" ||
        sex == ""
    ) {
        return false;
    }
    return true;
}

function checkConstraintRegis(customer) {
    for (element of data.customer) {
        if (
            element.username == customer.username ||
            element.number_phone == customer.number_phone
        ) {
            return false;
        }
    }
    for (element of data.staff) {
        if (
            element.username == customer.username ||
            element.number_phone == customer.number_phone
        ) {
            return false;
        }
    }
    return true;
}

function checkSamePassword(password, same_password) {
    if (password == same_password) {
        return true;
    }
    return false;
}

function initId() {
    if (data.customer.length == 0) {
        return "KH0001";
    }
    let number = parseInt(
        data.customer[data.customer.length - 1].id.replace("KH", "")
    );
    let newId = "KH" + String(number + 1).padStart(6, "0");
    return newId;
}

function checkDate(birthday) {
    if (
        parseInt(getCurrentDate().split(" ")[0].split("/")[2]) -
            parseInt(birthday.split("-")[0]) <
            parseInt(data.variable[0].gh_duoi) ||
        parseInt(getCurrentDate().split(" ")[0].split("/")[2]) -
            parseInt(birthday.split("-")[0]) >
            parseInt(data.variable[0].gh_tren)
    ) {
        return false;
    }

    return true;
}

function checkValidPhoneNumber(number) {
    if (data.variable[1].var1.indexOf(number[0]) != -1) {
        if (number.length != 12) {
            return false;
        }
        if (data.variable[1].var1 != number.slice(0, 3)) {
            return false;
        }
        for (let i = 3; i < number.length; i++) {
            if (data.variable[1].var3.indexOf(number[i]) == -1) {
                return false;
            }
        }
        return true;
    }
    if (number[0] == data.variable[1].var2) {
        if (number.length != 10) {
            return false;
        }
        for (let i = 1; i < number.length; i++) {
            if (data.variable[1].var3.indexOf(number[i]) == -1) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function checkValidNameU(f_name, l_name) {
    f_name = f_name.replaceAll(" ", "");
    l_name = l_name.replaceAll(" ", "");
    console.log(lastName, f_name);
    if (l_name == null && l_name == null) {
        return false;
    }
    return true;
}
//
//
//
//Đăng ký tài khoản
// btnsigup.onclick = function () {
//   let username = document.getElementById("inp-username");
//   let sex = "";
//   let s = document.getElementsByName("sex");
//   for (let i = 0; i < 3; i++) {
//     if (s[i].checked) {
//       sex = document.getElementById("update-in4").getElementsByTagName("label")[
//         i
//       ].textContent;
//     }
//   }
//   if (
//     checkValid(
//       firstName.value,
//       lastName.value,
//       username.value,
//       password_regis.value,
//       same_passwd.value,
//       number_phone.value,
//       birthday.value,
//       sex
//     )
//   ) {
//     if (checkValidNameU(firstName.value, lastName.value)) {
//       if (checkValidPhoneNumber(number_phone.value)) {
//         if (checkSamePassword(password_regis.value, same_passwd.value)) {
//           if (checkDate(birthday.value)) {
//             let customer = new Customer(
//               initId(),
//               firstName.value.trim() + " " + lastName.value.trim(),
//               number_phone.value.replace("+84", "0").trim(),
//               username.value.trim(),
//               password_regis.value,
//               sex,
//               birthday.value.split("-")[2] +
//                 "/" +
//                 birthday.value.split("-")[1] +
//                 "/" +
//                 birthday.value.split("-")[0]
//             );
//             if (checkConstraintRegis(customer) == true) {
//               data.customer.push(customer);
//               localStorage.setItem("data", JSON.stringify(data));
// showacc(signup, 0, 1200);
// setTimeout(() => {
//   signup.style.display = "";
//   account.style.display = "";
//   document.getElementById("noti").style.display = "flex";
//   document.getElementById("noti-noti").innerHTML =
//     "Đăng ký thành công";
//   showacc(document.getElementById("noti-noti"), -500, 0);
//   document.getElementById("noti-noti").style.display = "flex";
//   setTimeout(() => {
//     document.getElementById("noti").style.display = "";
//     account.style.display = "flex";
//     showacc(signin, -500, 0);
//   }, 700);
// }, 450);
//             } else {
//               alert("Tài khoản đã tồn tại");
//             }
//           } else {
//             alert("Ngày sinh không hợp lệ");
//           }
//         } else {
//           alert("Bạn đã nhập 2 mật khẩu không giống nhau!");
//         }
//       } else {
//         alert("Số điện thoại không hợp lệ");
//       }
//     } else {
//       alert("Tên không được chứa kí tự đặc biệt hoặc chữ số");
//     }
//   } else {
//     alert("Không được bỏ trống bất cứ thông tin nào!");
//   }
// };
//
//
//
//đăng nhập
// document
//   .getElementById("mailorphone")
//   .addEventListener("keypress", function (ev) {
//     if (ev.key === "Enter") {
//       // login();
//     }
//   });
// document.getElementById("passwd").addEventListener("keypress", function (ev) {
//   if (ev.key === "Enter") {
//     // login();
//   }
// });

// function login() {
//   if (mailorphone.value == "" || passwd.value == "") {
//     alert("vui lòng nhập đủ thông tin");
//   } else {
//     let login = false;
//     let users = new Array();
//     data.customer.forEach((element) => {
//       users.push(element);
//     });
//     data.staff.forEach((element) => {
//       users.push(element);
//     });
//     for (let user of users) {
//       //kiểm tra tồn tại tài khoản
//       if (
//         user.username == mailorphone.value ||
//         user.numberphone == mailorphone.value
//       ) {
//         //Kiểm tra tài khoản chính xác
//         if (user.password == passwd.value) {
//           //Kiểm tra trạng thái tài khoản
//           if (user.id_status == "TT04" || user.id_status == "TT05") {
//             console.log("Đăng nhập thành công");
//             currentUser = user;
//             login = true;
//           } else {
//             alert("Khoản của bạn hiện đang bị khóa!");
//             return;
//           }
//         } else {
//           alert("Bạn đã nhập sai mật khẩu!");
//           return;
//         }
//       }
//     }
//     if (login) {
//       //Đăng nhập vào khách hàng
//       if (currentUser.id.indexOf("KH") != -1) {
//         // alert("Đăng nhập thành công!");
//         showacc(signin, 0, 1200);
//         //Bảng thông báo
//         setTimeout(() => {
//           signin.style.display = "";
//           account.style.display = "";
//           document.getElementById("noti").style.display = "flex";
//           document.getElementById("noti-noti").innerHTML =
//             "Đăng nhập thành công";
//           showacc(document.getElementById("noti-noti"), -500, 0);
//           document.getElementById("noti-noti").style.display = "flex";
//           setTimeout(() => {
//             document.getElementById("noti").style.display = "";
//           }, 700);
//         }, 450);
//       } else {
//         //Đăng nhập vào nhân viên
//         currentUser = null;
//         console.log("Bạn đang đăng nhập với vai trò nhân viên");
//         localStorage.setItem("currentStaff", JSON.stringify(currentUser));
//         localStorage.setItem("checkLogin", true);
//         window.location.href = "./admin/index.html";
//       }
//     } else {
//       alert("Không tìm thấy tài khoản");
//     }
//     // let lock = false;
//     // let isStaff = false;
//     // data.customer.forEach((element) => {
//     //   if (
//     //     (element.username == mailorphone.value ||
//     //       element.number_phone == mailorphone.value) &&
//     //     element.password == passwd.value
//     //   ) {
//     //     if (element.status.toLowerCase() == "đã khóa") {
//     //       lock = true;
//     //     } else {
//     //       username = element.username;
//     //       currentUser = element;
//     //     }
//     //     count = 1;
//     //   }
//     // });
//     // data.staff.forEach((element) => {
//     //   if (
//     //     (element.username == mailorphone.value ||
//     //       element.number_phone == mailorphone.value) &&
//     //     element.password == passwd.value
//     //   ) {
//     //     if (element.status.toLowerCase() == "đã khóa") {
//     //       lock = true;
//     //     } else {
//     //       isStaff = true;
//     //       username = element.username;
//     //       currentStaff = element;
//     //     }
//     //     count = 1;
//     //   }
//     // });
//     // if (count != 1) {
//     //   alert("Tài khoản hoặc mật khẩu không chính xác");
//     //   return;
//     // }
//     // console.log(currentUser);
//     // if (!lock) {
//     //   if (!isStaff) {
//     //     console.log("Bạn đang đăng nhập với vai trò khách hàng");
//     //     showacc(signin, 0, 1200);
//     //     setTimeout(() => {
//     //       signin.style.display = "";
//     //       account.style.display = "";
//     //       document.getElementById("noti").style.display = "flex";
//     //       document.getElementById("noti-noti").innerHTML =
//     //         "Đăng nhập thành công";
//     //       showacc(document.getElementById("noti-noti"), -500, 0);
//     //       document.getElementById("noti-noti").style.display = "flex";
//     //       setTimeout(() => {
//     //         document.getElementById("noti").style.display = "";
//     //       }, 700);
//     //     }, 450);

//     //     document.getElementById("name-in4").innerHTML = currentUser.name;
//     //     document.getElementById("update-name").value = currentUser.name;

//     //     document.getElementById("update-contact").value =
//     //       currentUser.number_phone;
//     //     let birthday =
//     //       currentUser.birth_day.split("-")[2] +
//     //       "-" +
//     //       currentUser.birth_day.split("-")[1] +
//     //       "-" +
//     //       currentUser.birth_day.split("-")[0];
//     //     document.getElementById("update-birthday").value = birthday;
//     //     document.getElementById("birthday-in4").innerHTML = birthday;
//     //     document.getElementById("phone-in4").innerHTML =
//     //       currentUser.number_phone;
//     //     localStorage.setItem("currentIdUser", JSON.stringify(currentUser));
//     //     let se = document
//     //       .getElementById("update-in4")
//     //       .getElementsByTagName("label");
//     //     for (let i = 0; i < 3; i++) {
//     //       if (se[i].textContent == currentUser.sex) {
//     //         document.getElementsByName("sex")[i + 3].checked = true;
//     //       }
//     //     }
//     //   } else {
//     //     console.log("Bạn đang đăng nhập với vai trò nhân viên");
//     //     localStorage.setItem("currentStaff", JSON.stringify(currentStaff));
//     //     localStorage.setItem("checkLogin", true);
//     //     window.location.href = "admin/index.html";
//     //   }
//     //   checkOk = true;
//     // } else {
//     //   alert("Tài khoản hiện đang bị khóa");
//     // }
//   }
// }

// btnlogin.onclick = function () {
//   // login();
// };
document.getElementById("hide-show").onclick = function () {
    if (document.getElementById("passwd").type == "password") {
        document.getElementById("passwd").type = "text";
        document.getElementById("img-hideshow").src = "Image/eye.png";
    } else {
        document.getElementById("passwd").type = "password";
        document.getElementById("img-hideshow").src = "Image/hidden.png";
    }
};

function inter() {
    if (x >= arrImg.length) {
        x = 0;
    }
    if (y >= arrImg.length) {
        y = 0;
    }
    document.getElementById("ps1").src = "Image/poster/" + arrImg[x];
    document.getElementById("ps2").src = "Image/poster/" + arrImg[y];
    x++;
    y++;
}

function createButtonBack(cur, newele) {
    let div = document.createElement("div");
    div.style.alignItems = "center";
    div.id = "back";
    let img = document.createElement("img");
    img.src = "Image/btn-next-prev.png";
    img.style.transform = "rotate(180deg)";
    img.style.height = "15px";
    let node = document.createElement("div");
    node.appendChild(document.createTextNode("quay lại"));
    div.appendChild(img);
    div.appendChild(node);
    div.onclick = function () {
        showacc(cur, 0, 1200);
        setTimeout(() => {
            cur.style.display = "";
            document.getElementById("back").style.display = "";
            showacc(newele, -500, 0);
        }, 450);
    };
    return div;
}

exit.onclick = function () {
    if (signin.style.display == "block") {
        showacc(signin, 0, 1200);
    }
    if (signup.style.display == "block") {
        showacc(signup, 0, 1200);
    }
    if (in4.style.display == "block") {
        showacc(in4, 0, 1200);
    }
    if (updateinf.style.display == "block") {
        showacc(updateinf, 0, 1200);
    }
    if (onclickProduct.style.display == "block") {
        showacc(onclickProduct, 0, 1200);
    }
    if (setnewpass.style.display == "block") {
        showacc(setnewpass, 0, 1200);
    }
    setTimeout(() => {
        signin.style.display = "";
        divAcc.style.display = "";
        signup.style.display = "";
        setnewpass.style.display = "";
        onclickProduct.style.display = "";
        in4.style.display = "";
        updateinf.style.display = "";
    }, 450);
};
btnsignup.onclick = function () {
    document.getElementById("inp-firstname").value = "";
    document.getElementById("inp-lastname").value = "";
    document.getElementById("inp-username").value = "";
    document.getElementById("phone-mail-regis").value = "";
    document.getElementById("passwd-regis").value = "";
    document.getElementById("same-passwd").value = "";
    document.getElementById("birthday").value = "";
    showacc(signin, 0, 1200);
    setTimeout(() => {
        signin.style.display = "";
        signup.appendChild(createButtonBack(signup, signin));
        showacc(signup, -500, 0);
    }, 450);
};
btnback.onclick = function () {
    showacc(signup, 0, 1200);
    setTimeout(() => {
        signup.style.display = "";
        showacc(signin, -500, 0);
    }, 450);
};

btnlogout.onclick = function () {
    currentUser = null;
    username = "";
    document.getElementById("passwd").value = "";
    showuser.style.display = "";
};
document.getElementById("forgot-pass").onclick = function () {
    let setnewpass = document.getElementById("setnewpass");
    showacc(signin, 0, 1200);
    setTimeout(() => {
        signin.style.display = "";
        setnewpass.appendChild(createButtonBack(setnewpass, signin));
        showacc(setnewpass, -500, 0);
    }, 300);
};
//Bộ lọc loại
showtype.onclick = function () {
    let arrType = new Array();
    data.largeClassify.forEach((e) => {
        e.miniClassify.forEach((el) => {
            arrType.push(el.name);
        });
    });
    showFilter(
        listtype,
        arrType,
        "id-type",
        listprice,
        listsale,
        document.getElementById("selected-type")
    );
};
showprice.onclick = function () {
    showFilter(listprice, itemsprice, "", listsale, listtype);
};
//bộ lọc khuyến mãi
showsale.onclick = function () {
    let arrPromo = new Array();
    data.promote.forEach((e) => {
        arrPromo.push(e.content);
    });
    showFilter(
        listsale,
        arrPromo,
        "id-sale",
        listtype,
        listprice,
        document.getElementById("selected-sale")
    );
};

function showFilter(list1, arr, id, list2, list3, select) {
    if (list1.style.display == "block") {
        list1.style.display = "";
        if (document.getElementById(id) != null) {
            document.getElementById(id).remove();
        }
    } else {
        list1.style.display = "block";
        if (id != "") {
            let ul = document.createElement("ul");
            ul.id = id;
            ul.className = "list-list";
            arr.forEach((e) => {
                let li = document.createElement("li");
                li.className = "list-item";
                li.appendChild(document.createTextNode(e));
                ul.appendChild(li);
            });
            let di = document.createElement("div");
            di.appendChild(ul);
            list1.innerHTML = di.innerHTML;
            list1.innerHTML += `<div style="display: flex; justify-content: center;">
            <img src="Image/icon-show.png" alt="">
        </div>`;
            let t = document
                .getElementById(id)
                .getElementsByClassName("list-item");

            for (let k = 0; k < t.length; k++) {
                document.getElementById(id).getElementsByClassName("list-item")[
                    k
                ].onclick = function () {
                    console.log(
                        document
                            .getElementById(id)
                            .getElementsByClassName("list-item")[k].textContent
                    );
                    select.innerHTML = document
                        .getElementById(id)
                        .getElementsByClassName("list-item")[k].textContent;
                    offlist();
                    timkhiem();
                };
            }
        }
    }
    list2.style.display = "";
    list3.style.display = "";
    showuser.style.display = "";
    showcart.style.display = "";
}

var itemstype = new Array();
itemstype.push("tất cả");

//
//
//
//
//
//
var itemsprice = document
    .getElementById("list-price")
    .getElementsByClassName("list-item");
var itemssale = new Array();
itemssale.push("tất cả");
// data.promote.forEach((e) => {
//   itemssale.push(e.name);
// });
// document.getElementById("list-sale").getElementsByClassName("list-item")
select(itemstype, document.getElementById("selected-type"), listtype);
select(itemsprice, document.getElementById("selected-price"), listprice);
select(itemssale, document.getElementById("selected-sale"), listsale);

function select(items, selected, list) {
    // select
    for (let i = 0; i < items.length; i++) {
        items[i].onclick = function () {
            selected.innerHTML = items[i].textContent;
            list.style.display = "";
            timkhiem();
        };
    }
}

function offlist() {
    listtype.style.display = "";
    listprice.style.display = "";
    listsale.style.display = "";
}
btnprodw.onmouseenter = function () {
    prod.style.display = "block";
    offlist();
    createListType("nu");
    mouse_enter_gender_product = "nữ";
    showuser.style.display = "";
    showcart.style.display = "";
};
btnprodw.onmouseleave = function () {
    prod.style.display = "";
    mouse_enter_gender_product = "";
};

btnprodm.onmouseenter = function () {
    prod.style.display = "block";
    createListType("nam");
    mouse_enter_gender_product = "nam";

    showuser.style.display = "";
    showcart.style.display = "";
    offlist();
};
btnprodm.onmouseleave = function () {
    prod.style.display = "";
    mouse_enter_gender_product = "";
};

let isProductShow = false;
//
//
//
//
//
//
function createListType(gender) {
    // document.getElementById("")
    for (let i = 0; i < data.largeClassify.length; i++) {
        let largeClassify = data.largeClassify[i];
        document.getElementsByClassName("ul_list_container")[i].innerHTML = "";
        for (let j = 0; j < largeClassify.miniClassify.length; j++) {
            let miniClassify = largeClassify.miniClassify[j];
            document.getElementsByClassName("ul_list_container")[i].innerHTML +=
                `<li id="` +
                miniClassify.id +
                `" class="list-item-container">
                                        ` +
                miniClassify.name +
                `
                                    </li>`;
        }
    }
    choice_type_product(gender);
    // let sp = document.createElement("div");
    // sp.id = "sanpham";
    // //
    // for (let i = 0; i < data.largeClassify.length; i++) {
    //     let div = document.createElement("div");
    //     div.style.borderRight = "1px solid gray";
    //     div.style.height = "250px";
    //     div.style.padding = "0 20% 5px 20px";
    //     div.style.margin = "10px";
    //     let divType = document.createElement("div");
    //     divType.style.fontSize = "18px";
    //     divType.style.marginTop = "20px";
    //     divType.style.color = "black";
    //     divType.appendChild(
    //         document.createTextNode(data.largeClassify[i].name)
    //     );
    //     div.appendChild(divType);
    //     let ul = document.createElement("ul");
    //     ul.style.padding = "0";
    //     ul.style.listStyle = "none";
    //     div.appendChild(ul);
    //     for (let j = 0; j < data.largeClassify[i].miniClassify.length; j++) {
    //         if (
    //             data.largeClassify[i].miniClassify[j].id.indexOf(
    //                 sex.toUpperCase()
    //             ) != -1
    //         ) {
    //             let li = document.createElement("li");
    //             li.className = "list-item";
    //             li.onclick = function () {
    //                 document.getElementsByClassName("middle")[0].style.display =
    //                     "flex";
    //                 if (isHomePage) {
    //                     isProductShow = true;
    //                     isHomePage = false;
    //                     if (document.getElementById("div-main") != null) {
    //                         document.getElementById("div-main").remove();
    //                     }
    //                 } else if (isProductShow) {
    //                     if (arrProduct.length > 0) {
    //                         if (
    //                             document.getElementById("page-number") != null
    //                         ) {
    //                             document.getElementById("page-number").remove();
    //                         }
    //                         if (document.getElementById("div-list")) {
    //                             document.getElementById("div-list").remove();
    //                         }
    //                     }
    //                     if (document.getElementById("div-title") != null) {
    //                         document.getElementById("div-title").remove();
    //                     }
    //                 } else if (isSearch) {
    //                     isProductShow = true;
    //                     isHomePage = false;
    //                     isSearch = false;
    //                     if (document.getElementById("searc") != null) {
    //                         document.getElementById("searc").remove();
    //                     }
    //                 }
    //                 currentPage = 1;
    //                 pathImage.length = 0;
    //                 arrProduct.length = 0;
    //                 let pos = document.documentElement.scrollTop;
    //                 let id = setInterval(function frame() {
    //                     if (pos <= 300) {
    //                         clearInterval(id);
    //                         createPageProduct(
    //                             spaceProduct,
    //                             data.largeClassify[i].name +
    //                                 " - " +
    //                                 data.largeClassify[i].miniClassify[j].name,
    //                             data.largeClassify[i].miniClassify[j].id,
    //                             12
    //                         );
    //                         if (data.largeClassify[i].id == "PK") {
    //                             if (arrProduct.length > 0) {
    //                                 document.getElementById(
    //                                     "list-product"
    //                                 ).style.gridTemplateColumns =
    //                                     "1fr 1fr 1fr 1fr";
    //                             }
    //                             document.getElementById(
    //                                 "space-product"
    //                             ).style.width = "100%";
    //                         }
    //                     } else {
    //                         pos -= 10;
    //                         document.documentElement.scrollTop = pos;
    //                     }
    //                 }, 1);
    //             };
    //             li.appendChild(
    //                 document.createTextNode(
    //                     data.largeClassify[i].miniClassify[j].name
    //                 )
    //             );
    //             ul.appendChild(li);
    //         }
    //     }
    //     sp.appendChild(div);
    // }
    // prod.appendChild(sp);
    // prod.onmouseenter = function () {
    //     prod.style.display = "block";
    //     createListType(sex);
    // };
    // prod.onmouseleave = function () {
    //     prod.style.display = "";
    //     if (document.getElementById("sanpham") != null) {
    //         document.getElementById("sanpham").remove();
    //     }
    // };
}
function choice_type_product(gender) {
    let classify = document.getElementsByClassName("list-item-container");
    for (let i = 0; i < classify.length; i++) {
        classify[i].onclick = function () {
            console.log(gender);

            getDataFromServer(
                "./Server/list_product_by_classify.php",
                {
                    id_classify: classify[i].id,
                    gender: gender,
                },
                function (respone) {
                    console.log(respone);
                    create_main_onclick_classify(respone);
                }
            );
        };
    }
}

function create_main_onclick_classify(data) {
    if (data.success) {
        let li = "";

        document.getElementById("main").innerHTML = `<ul class="container">
		<li class="main_list_product_product" id="AO00000001">
        <div class="promo_stamp" id="stamp_AO00000001" style="display: block;">Giảm 25%</div>
        <img class="main_list_product_product_image" style="" src="./admin/image/ao-thun-nu-local-brand-dep-davies.jpeg" alt="">
       <div class="main_list_product_product_infor"> 
       <label class="product_infor_name">Áo thun</label>
         <div>
         <del class="del_price" id="del_AO00000001">320.000 VND</del>
         <label id="price_AO00000001">240.000 VND</label>
         </div>
        </div>
      </li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>

		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>

		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
		<li class="item"><img src="https://via.placeholder.com/300x200"></li>
	</ul>`;
    } else {
        alert("Comming soon");
    }
}
function pushAmount(value) {
    inStock.push(value);
}

function getAmount(id) {
    for (let i = 0; i < data.prodInStock.length; i++) {
        if (data.prodInStock[i].idProd == id) {
            pushAmount(data.prodInStock[i]);
        }
    }
}

function getAmountWithSize(id, size) {
    let amountSize = 0;
    for (let i = 0; i < data.prodInStock.length; i++) {
        if (
            data.prodInStock[i].idProd == id &&
            data.prodInStock[i].idSize == size
        ) {
            amountSize += parseInt(data.prodInStock[i].amount);
        }
    }

    function createStockWithAmount() {
        let amount = amountSize;
        return { amount };
    }
    pushAmount(createStockWithAmount());
}

function TongTien(cart) {
    let tong = 0;
    cart.forEach((e) => {
        tong += parseInt(e.price);
    });
    return tong;
}
let thanhtoansp = new Array();
//
//
//
//
//thanh toán giỏ hàng
function ttGioHang(thanhtoansp) {
    document.getElementById("body_product_table").innerHTML = "";
    console.log(product_in_cart);
    for (let i = 0; i < thanhtoansp.product_is_selected.length; i++) {
        document.getElementById("body_product_table").innerHTML +=
            `<tr class="product-row">
                                <td>` +
            data.product.find(
                (product) => product.id === thanhtoansp.product_is_selected[i]
            ).name +
            `</td>
                                <td>` +
            product_in_cart.find(
                (product) =>
                    product.id_product === thanhtoansp.product_is_selected[i]
            ).amount +
            `</td>
                                <td>` +
            product_in_cart.find(
                (product) =>
                    product.id_product === thanhtoansp.product_is_selected[i]
            ).id_size +
            `</td>
                                <td>Đen</td>
                                <td>` +
            calculated(
                product_in_cart.find(
                    (product) =>
                        product.id_product ===
                        thanhtoansp.product_is_selected[i]
                ).price
            ) +
            ` VNĐ</td>
                            </tr>`;
    }
    // let div = document.createElement("div");
    // let table = document.createElement("table");
    // thanhtoansp.forEach((e) => {
    //   // arrProduct.length = 0;
    //   // getProduct(e.idProd);
    //   let tr = document.createElement("tr");
    //   let divPro = document.createElement("div");
    //   let ima = document.createElement("img");
    //   ima.src = "Image/SANPHAM/" + arrProduct[0].images[0];
    //   ima.style.height = "100px";
    //   divPro.appendChild(ima);
    //   let di = document.createElement("div");
    //   let name = document.createElement("div");
    //   name.appendChild(document.createTextNode(arrProduct[0].name));
    //   name.style.fontSize = "12px";
    //   di.appendChild(name);
    //   console.log(e.idSize);
    //   if (e.idSize != "") {
    //     let siz = document.createElement("div");
    //     siz.style.fontSize = "12px";
    //     data.size.forEach((el) => {
    //       if (el.id == e.idSize) {
    //         siz.appendChild(document.createTextNode("Size: " + el.name));
    //       }
    //     });
    //     di.appendChild(siz);
    //   }
    //   let pri = document.createElement("div");
    //   pri.appendChild(
    //     document.createTextNode("Giá: " + calculated(e.price) + " VND")
    //   );
    //   pri.style.fontSize = "12px";
    //   di.style.padding = "10px";
    //   di.style.display = "flex";
    //   di.style.flexDirection = "column";
    //   di.style.justifyContent = "space-between";
    //   di.appendChild(pri);
    //   let div0 = document.createElement("div");
    //   div0.appendChild(di);
    //   div0.style.display = "flex";
    //   div0.style.justifyContent = "space-between";
    //   let am = document.createElement("div");
    //   am.style.padding = "10px";
    //   am.appendChild(document.createTextNode("Số lượng: " + e.amount));
    //   am.style.fontSize = "12px";
    //   div0.appendChild(am);
    //   div0.style.width = "410px";
    //   divPro.appendChild(div0);
    //   divPro.style.display = "flex";
    //   divPro.style.padding = "10px 0";
    //   divPro.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
    //   tr.appendChild(divPro);
    //   table.appendChild(tr);
    // });
    // let dd = document.createElement("div");
    // dd.appendChild(table);
    // dd.style.overflowY = "scroll";
    // dd.style.height = "360px";
    // dd.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
    // let div1 = document.createElement("div");
    // div1.style.display = "flex";
    // div1.style.flexDirection = "column";
    // div1.style.justifyContent = "space-between";
    // div1.style.padding = "10px";
    // //ô nhập mã
    // let inp0 = document.createElement("input");
    // inp0.id = "inp-code";
    // inp0.style.padding = "5px 10px";
    // inp0.style.outline = "none";
    // inp0.placeholder = "Nhập mã giảm giá";
    // let div11 = document.createElement("div");
    // div11.style.display = "flex";
    // div11.style.justifyContent = "space-between";
    // div11.appendChild(inp0);
    // //nút kiểm tra mã
    // let btnCkeckcode = document.createElement("div");
    // btnCkeckcode.appendChild(document.createTextNode("Kiểm tra mã"));
    // btnCkeckcode.id = "btn-checkcode";
    // div11.appendChild(btnCkeckcode);
    // //nút huỷ
    // let btnHuy = document.createElement("div");
    // btnHuy.id = "btn-huy";
    // btnHuy.appendChild(document.createTextNode("huỷ"));
    // //nút xác nhận
    // div11.appendChild(btnHuy);
    // let btnXacnhan = document.createElement("div");
    // btnXacnhan.id = "btn-xacnhan";
    // btnXacnhan.appendChild(document.createTextNode("Xác nhận"));
    // div11.appendChild(btnXacnhan);
    // //tổng thanh toán
    // let div12 = document.createElement("div");
    // div12.style.paddingTop = "10px";
    // div12.style.fontSize = "16px";
    // div12.appendChild(
    //   document.createTextNode(
    //     "Tổng thanh toán: " + calculated(TongTien(thanhtoansp)) + " VND"
    //   )
    // );
    // div1.appendChild(div11);
    // div1.appendChild(div12);
    // div.appendChild(dd);
    // div.appendChild(div1);
    // document.getElementById("thanhtoan-sp").innerHTML = div.innerHTML;
    // document.getElementById("btn-huy").onclick = function () {
    //   showacc(document.getElementById("div-thanhtoan"), 0, 1200);
    //   setTimeout(() => {
    //     document.getElementById("thanh-toan").style.display = "none";
    //     createCart();
    //   }, 400);
    // };
    // document.getElementById("btn-xacnhan").onclick = function () {
    //   if (document.getElementById("inp-dc").value == "") {
    //     alert("Vui lòng nhập địa chỉ nhận hàng");
    //   } else {
    //     thanhtoansp.forEach((e) => {
    //       currentUser.cart.splice(currentUser.cart.indexOf(e), 1);
    //       data.prodInStock.forEach((el) => {
    //         if (el.idSize == e.idSize) {
    //           el.amount = (parseInt(el.amount) - parseInt(e.amount)).toString();
    //         }
    //       });
    //     });
    //     let rc = createReceipt(thanhtoansp);
    //     data.receipt.push(rc);
    //     localStorage.setItem("data", JSON.stringify(data));
    //     showacc(document.getElementById("div-thanhtoan"), 0, 1200);
    //     setTimeout(() => {
    //       document.getElementById("thanh-toan").style.display = "none";
    //       document.getElementById("noti").style.display = "flex";
    //       document.getElementById("noti-noti").innerHTML =
    //         "Thanh toán thành công";
    //       showacc(document.getElementById("noti-noti"), -500, 0);
    //       document.getElementById("noti-noti").style.display = "flex";
    //       setTimeout(() => {
    //         document.getElementById("noti").style.display = "";
    //         fillReceipt(rc);
    //       }, 700);
    //     }, 400);
    //   }
    // };
}

document.getElementById("back-btn").onclick = function () {
    back_to_cart();
};
function back_to_cart() {
    update_cart();
    showacc(document.getElementById("div-thanhtoan"), 0, 1200);
    setTimeout(() => {
        document.getElementById("thanh-toan").style.display = "";
        create_cart_from_server();
    }, 400);
}
document.getElementById("thanh-toan").onclick = function (e) {
    if (e.target.matches("#thanh-toan")) {
        back_to_cart();
    }
};
btnuser.onclick = function () {
    document.getElementById("passwd").value = "";
    if (currentUser != null) {
        if (showuser.style.display == "") {
            uname.innerHTML = currentUser.name;
            showuser.style.display = "block";
        } else {
            showuser.style.display = "";
        }
        offlist();
        showcart.style.display = "";
    } else {
        account.style.display = "flex";
        showacc(signin, -500, 0);
    }
};

function showacc(element, ps, lim) {
    let id = null;
    element.style.marginTop = ps + "px";
    let pos = ps;
    element.style.display = "block";
    element.zIndex = 100000;
    offlist();
    id = setInterval(frame, 1);

    function frame() {
        if (pos == lim) {
            clearInterval(id);
            element.style.marginTop = "0";
        } else {
            pos += 10;
            element.style.marginTop = pos + "px";
        }
    }
}
let isshow = true;
let isshowing = false;
btnshowfilter.onclick = function () {
    console.log(isshowing);
    let id = null;
    clearInterval(id);
    let pos = 0;
    if (!isshowing) {
        isshowing = true;
        if (!isshow) {
            //mở
            btnshowfilter.style.transform = "rotate(0deg)";
            id = setInterval(frame, 15);

            function frame() {
                if (pos == 60) {
                    clearInterval(id);
                    isshow = true;
                    isshowing = false;
                } else {
                    pos++;
                    filterbar.style.marginTop = pos - 60 + "px";
                    poster.style.marginTop = pos + 120 + "px";
                }
            }
            filterbar.style.display = "flex";
        } else {
            //đóng
            offlist();
            console.log(pos);
            btnshowfilter.style.transform = "rotate(180deg)";
            id = setInterval(frame, 15);

            function frame() {
                if (pos == 60) {
                    isshow = false;
                    isshowing = false;
                    clearInterval(id);
                    filterbar.style.display = "";
                } else {
                    pos++;
                    filterbar.style.marginTop = -pos + "px";
                    poster.style.marginTop = 170 - pos + "px";
                }
            }
        }
    }
};
//Phần thông tin người dùng
uname.onclick = function () {
    account.style.display = "flex";
    showacc(in4, -500, 0);
    document.getElementById("show-user").style.display = "";
    document.getElementById("named").innerHTML = currentUser.name;
    document.getElementById("name-in4").innerHTML = currentUser.name;
    document.getElementById("phone-in4").innerHTML = currentUser.numberphone;
    document.getElementById("birthday-in4").innerHTML =
        currentUser.birthday.split(" ")[0];
};
document.getElementById("up-date").onclick = function () {
    account.style.display = "flex";
    document.getElementById("show-user").style.display = "";
    showacc(updateinf, -500, 0);
};

document.getElementById("btn-update").onclick = function () {
    showacc(in4, 0, 1200);
    setTimeout(() => {
        in4.style.display = "";
        showacc(updateinf, -500, 0);
        updateinf.appendChild(createButtonBack(updateinf, in4));
    }, 300);
};
document.getElementById("thaydoi-mk").onclick = function () {
    if (tdmk) {
        tdmk = false;
        document.getElementById("nhapthaydoi").style.display = "";
        document.getElementById("thaydoi-mk").textContent = "Thay đổi";
    } else {
        tdmk = true;
        document.getElementById("thaydoi-mk").textContent = "Đóng";
        document.getElementById("nhapthaydoi").style.display = "block";
    }
};
let isSearch = false;
let isHomePage = false;
document.getElementById("home-page").onclick = function () {
    document.getElementById("main").innerHTML = "";
    getDataFromServer("./Server/homepage.php", "", function (response) {
        // console.log("Data from homepage.php: ", response);
        create_Homepage(response);
    });
};
// document.getElementById("home-page").onclick = function () {
//   document.getElementById("selected-type").innerHTML = "Tất cả";
//   document.getElementById("selected-price").innerHTML = "Tất cả";
//   document.getElementById("selected-sale").innerHTML = "Tất cả";
//   if (document.getElementsByClassName("middle")[0].style.display == "flex") {
//     document.getElementsByClassName("middle")[0].style.display = "";
//     if (arrProduct.length > 0) {
//       if (document.getElementById("div-list") != null) {
//         document.getElementById("div-list").remove();
//       }
//       if (document.getElementById("page-number") != null) {
//         document.getElementById("page-number").remove();
//       }
//     }
//     if (document.getElementById("div-title") != null) {
//       document.getElementById("div-title").remove();
//     }
//     console.log(isSearch);
//   }
//   if (!isHomePage || isSearch) {
//     createHomepage();
//     isSearch = false;
//   }
//   let pos = document.documentElement.scrollTop;
//   let id = setInterval(function frame() {
//     if (pos <= 300) {
//       clearInterval(id);
//     } else {
//       pos -= 10;
//       document.documentElement.scrollTop = pos;
//     }
//   }, 1);

//   if (isSearch) {
//     isSearch = false;
//     c = 0;
//     if (document.getElementById("searc") != null) {
//       document.getElementById("searc").remove();
//     }
//   }
// };
let arrayPro = new Array();
//
//
//
//tìm
function search(text, classify = "", minPrice = 0, maxPrice = 0, promote = "") {
    function checkValidName(arg1, arg2) {
        if (arg2.trim() == "") {
            return true;
        }
        if (arg1.toLowerCase().indexOf(arg2.toLowerCase()) != -1) {
            return true;
        }
        return false;
    }

    function checkPrice(minPrice, maxPrice, price) {
        if (minPrice == 0 && maxPrice == 0) {
            return true;
        }
        if (price >= minPrice && price <= maxPrice) {
            return true;
        }
        return false;
    }

    function checkClassify(prod) {
        if (classify == "") {
            return true;
        }
        let check = false;
        prod.clasify.forEach((element) => {
            if (checkValidName(classify, element)) {
                check = true;
                return;
            }
        });
        return check;
    }
    let promot = [];
    data.promote.forEach((element) => {
        if (checkValidName(element.name, promote)) {
            promot = element;
            return;
        }
    });
    arrayPro.length = 0;
    for (let i = 0; i < data.product.length; i++) {
        let prodI = data.product[i];
        if (
            checkValidName(prodI.name, text) &&
            checkPrice(minPrice, maxPrice, parseInt(prodI.price))
        ) {
            let checkExist = false;
            if (promote.trim() == "") {
                checkExist = true;
            } else {
                if (promot.length > 0) {
                    promot.products.forEach((element) => {
                        if (checkValidName(element.id, prodI.id)) {
                            checkExist = true;
                        }
                    });
                } else {
                    checkExist = true;
                }
            }
            checkExist = checkClassify(prodI);
            if (checkExist) {
                arrayPro.push(prodI);
            }
        }
    }
}

function createHomepage() {
    isHomePage = true;
    document.getElementById("main").style.display = "flex";
    try {
        document.getElementById("div-main").remove();
    } catch (e) {}
    try {
        document.getElementById("searc").remove();
    } catch (error) {}
    let div = document.createElement("div");
    div.id = "div-main";
    for (let i = 0; i < data.largeClassify.length; i++) {
        div.appendChild(createMainPro(data.largeClassify[i]));
    }
    let divv = document.createElement("div");
    document.getElementById("main").appendChild(div);
    for (
        let j = 0;
        j < document.getElementsByClassName("list-product").length;
        j++
    )
        document.getElementsByClassName("list-product")[
            j
        ].style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
}
// createHomepage();
//
//
//màn hình chính
function createMainPro(clasify) {
    arrProduct.length = 0;
    let div = document.createElement("div");
    let title = document.createElement("div");
    title.style.fontSize = "22px";
    div.style.margin = "20px 40px";
    title.style.display = "block";
    title.style.borderBottom = "1px solid gray";
    title.style.paddingBottom = "10px";
    title.appendChild(document.createTextNode(clasify.name));
    div.appendChild(title);
    currentPage = 1;
    let divPro = document.createElement("div");
    divPro.style.display = "grid";
    for (let i = 0; i < clasify.miniClassify.length; i++) {
        getProduct(clasify.miniClassify[i].id);
    }
    divPro.appendChild(addListProduct(clasify.id, 5));
    let btnList = document.createElement("div");
    btnList.style.display = "flex";
    btnList.style.justifyContent = "center";
    let a = document.createElement("a");
    a.style.fontSize = "18px";
    a.style.cursor = "pointer";
    a.style.margin = "15px";
    a.onclick = function () {
        isHomePage = false;
        arrProduct.length = 0;
        pathImage.length = 0;
        for (let i = 0; i < clasify.miniClassify.length; i++) {
            getProduct(clasify.miniClassify[i].id);
        }
        console.log(clasify);
        let pos = document.documentElement.scrollTop;
        let id = setInterval(function frame() {
            if (pos <= 300) {
                clearInterval(id);
                document.getElementById("main").style.display = "";
                if (document.getElementById("div-main") != null) {
                    document.getElementById("div-main").remove();
                }
                document.getElementsByClassName("middle")[0].style.display =
                    "flex";
                let title = document.createElement("div");
                title.id = "div-title";
                let node = document.createTextNode(clasify.name);
                title.appendChild(node);
                document.getElementById("space-product").appendChild(title);
                if (arrProduct.length > 0) {
                    let divUl = document.createElement("div");
                    divUl.id = "div-list";
                    divUl.appendChild(addListProduct(clasify.id, 12));
                    document.getElementById("space-product").appendChild(divUl);
                    createPageNumber(clasify.id, arrProduct, 12);
                }
            } else {
                pos -= 10;
                document.documentElement.scrollTop = pos;
            }
        }, 1);
    };
    a.appendChild(document.createTextNode("Xem chi tiết"));
    btnList.appendChild(a);
    div.appendChild(divPro);
    div.appendChild(btnList);
    return div;
}

let spaceProduct = document.getElementById("space-product");
let onclickProduct = document.getElementById("onclick-product");

function getPromote(id) {
    for (let i = 0; i < data.promote.length; i++) {
        for (let j = 0; j < data.promote[i].products.length; j++) {
            if (
                data.promote[i].products[j].id.toLowerCase() == id.toLowerCase()
            ) {
                return [i, j];
            }
        }
    }
    return -1;
}

function getProduct(id) {
    for (let i = 0; i < data.product.length; i++) {
        if (data.product[i].id.indexOf(id) != -1) {
            arrProduct.push(data.product[i]);
        }
    }
}

function getPath(id, path) {
    path.Path.forEach((element) => {
        if (element.indexOf(id) != -1) {
            pathImage.push(element);
        }
    });
}

function createPageProduct(root, textTitle, idPr, proInpage) {
    arrProduct.length = 0;
    getProduct(idPr);
    console.log(pathImage, arrProduct);
    let title = document.createElement("div");
    title.id = "div-title";
    let node = document.createTextNode(textTitle);
    title.appendChild(node);
    root.appendChild(title);
    if (arrProduct.length > 0) {
        let divUl = document.createElement("div");
        divUl.id = "div-list";
        divUl.appendChild(addListProduct(idPr, proInpage));
        root.appendChild(divUl);
        createPageNumber(idPr, arrProduct, proInpage);
    }
}

function addListProduct(id, proInpage) {
    let start = (currentPage - 1) * proInpage;
    let end = currentPage * proInpage;
    if (end > arrProduct.length) {
        end = arrProduct.length;
    }
    let ulList = document.createElement("ul");
    ulList.id = "list-product";
    ulList.className = "list-product";
    ulList.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    document.getElementById("space-product").style.width = "100%";
    for (let i = start; i < end; i++) {
        let discountPrice = "0";
        let cost = "0";
        let promot = getPromote(arrProduct[i].id);
        // console.log(promot)
        if (promot == -1) {
            discountPrice = arrProduct[i].price;
            cost = "0";
        } else {
            cost = arrProduct[i].price;
            discountPrice =
                parseInt(cost) -
                parseInt(data.promote[promot[0]].discount_price) -
                (parseInt(data.promote[promot[0]].discount_percent) / 100) *
                    cost;
        }
        ulList.appendChild(
            createListProduct(
                "Image/SANPHAM/",
                arrProduct[i].images,
                arrProduct[i].name,
                discountPrice,
                cost,
                arrProduct[i].made_in,
                arrProduct[i].id,
                arrProduct[i].clasify,
                arrProduct[i].description
            )
        );
    }
    return ulList;
}

function createListProduct(
    path,
    img,
    nameProduct,
    price,
    sale,
    madeIn,
    id,
    clasify,
    description
) {
    let k = new Array();
    data.promote.forEach((element) => {
        element.products.forEach((e) => {
            if (e.id.toLowerCase() == id.toLowerCase()) {
                k.push(element.name);
            }
        });
    });
    let liItem = document.createElement("li");
    liItem.className = "product-item";
    let imgTag = document.createElement("img");
    imgTag.src = path + img[0];
    let giamgia = document.createElement("div");
    giamgia.style.position = "absolute";
    giamgia.style.right = "10px";
    giamgia.style.top = "10px";
    giamgia.style.fontSize = "10px";
    giamgia.style.padding = "5px 10px";
    giamgia.style.backgroundColor = "red";
    giamgia.style.fontFamily = "times new roman";
    giamgia.style.fontWeight = "bold";
    giamgia.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    if (k.length != 0) {
        giamgia.appendChild(document.createTextNode(k[0]));
        liItem.appendChild(giamgia);
    }
    liItem.appendChild(imgTag);
    imgTag.style.objectFit = "cover";
    let namePro = document.createElement("div");
    namePro.appendChild(document.createTextNode(nameProduct));
    let divContent = document.createElement("div");
    divContent.className = "product-content";
    divContent.appendChild(namePro);
    divContent.style.paddingTop = "10px";
    liItem.onmouseenter = function () {
        liItem.style.backgroundColor = "lightpink";
        liItem.style.color = "white";
        divContent.style.borderTop = "none";
    };
    liItem.onmouseleave = function () {
        liItem.style.backgroundColor = "white";
        liItem.style.color = "black";
        divContent.style.borderTop = "1px solid gray";
    };
    liItem.appendChild(divContent);
    let salePrice = document.createElement("div");
    salePrice.style.marginTop = "10px";
    salePrice.style.color = "red";
    let cost = document.createElement("del");
    cost.appendChild(document.createTextNode(calculated(sale) + " VND"));
    cost.className = "cost";
    if (sale != "0") {
        salePrice.appendChild(cost);
    } else {
        salePrice.style.justifyContent = "center";
    }
    salePrice.appendChild(document.createTextNode(calculated(price) + " VND"));
    salePrice.style.display = "flex";
    divContent.appendChild(salePrice);
    liItem.onclick = function () {
        if (!isCTSP) {
            isCTSP = true;
            document.getElementById("div-onClickProduct").style.display =
                "flex";
            xemCTSP(id);
            showacc(document.getElementsByClassName("popUp-prod")[0], -500, 0);
        }
    };
    return liItem;
}
let isCTSP = false;

let sizeProduct = new Array();

function checkCart(iduser, id_product) {
    getDataFromServer(
        "./Server/get_data_cart.php",
        { idkh: iduser, idpro: id_product },
        function (respone) {
            return respone.success;
        }
    );
}

function selectImage(
    divPreview,
    i,
    isSelected,
    arrImg,
    imgShow,
    path,
    img,
    scroll,
    offset
) {
    if (i != isSelected) {
        arrImg[i].style.borderColor = "red";
        arrImg[i].style.borderRadius = "10px";
        arrImg[isSelected].style.borderColor = "gray";
        arrImg[isSelected].style.borderRadius = "0";
        imgShow.src = path + img[i];
        if (i > 0) {
            scroll = offset;
        }
        divPreview.scrollTo(scroll, 0);
    }
}

function previewImg(path, img, imgShow) {
    let isSelected = 0;
    let divPreview = document.createElement("div");
    let arrImg = new Array();
    let scroll = 0;
    for (let i = 0; i < img.length; i++) {
        let image = document.createElement("img");
        arrImg.push(image);
        image.style.height = "80px";
        image.style.margin = "10px";
        image.style.cursor = "pointer";
        image.style.border = "1px solid gray";
        image.style.boxShadow =
            "box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;";
        image.src = path + img[i];
        arrImg[isSelected].style.borderColor = "red";
        arrImg[isSelected].style.borderRadius = "10px";
        divPreview.appendChild(image);
        image.onclick = function () {
            selectImage(
                divPreview,
                i,
                isSelected,
                arrImg,
                imgShow,
                path,
                img,
                scroll,
                image.offsetLeft - 20
            );
            isSelected = i;
        };
    }
    divPreview.style.overflowX = "scroll";
    divPreview.style.display = "flex";
    divPreview.style.marginBottom = "-25px";
    let div = document.createElement("div");
    div.style.overflow = "hidden";
    div.style.position = "relative";
    div.style.padding = "0 10px";
    let im = document.createElement("img");
    im.src = "Image/show-icon.png";
    im.style.height = "20px";
    im.style.position = "absolute";
    im.style.top = "45px";
    im.style.left = "-5px";
    im.style.transform = "rotate(180deg)";
    im.style.cursor = "pointer";
    im.onclick = function () {
        let i = img.length - 1;
        if (isSelected > 0) {
            i = isSelected - 1;
        }
        selectImage(
            divPreview,
            i,
            isSelected,
            arrImg,
            imgShow,
            path,
            img,
            scroll,
            102 * (i - 3)
        );
        isSelected = i;
    };
    let imm = document.createElement("img");
    imm.style.height = "20px";
    imm.style.position = "absolute";
    imm.src = "Image/show-icon.png";
    imm.style.top = "45px";
    imm.style.right = "-5px";
    imm.style.cursor = "pointer";
    imm.onclick = function () {
        let i = 0;
        if (isSelected < img.length - 1) {
            i = isSelected + 1;
        }
        selectImage(
            divPreview,
            i,
            isSelected,
            arrImg,
            imgShow,
            path,
            img,
            scroll,
            arrImg[i].offsetLeft - 20
        );
        isSelected = i;
    };
    if (img.length > 4) {
        div.appendChild(im);
        div.appendChild(imm);
    }
    div.appendChild(divPreview);
    return div;
}
let isSelectedSize = 0;
//chọn size
function selectSize(index, id) {
    isSelectedSize = 0;
    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.marginTop = "0px";
    div.style.textAlign = "center";
    textSize = document.createElement("div");
    textSize.appendChild(document.createTextNode("Size"));
    textSize.style.lineHeight = "40px";
    textSize.style.marginRight = "10px";
    div.appendChild(textSize);
    let arrBut = new Array();
    for (let i = 0; i < index.length; i++) {
        let btnSize = document.createElement("div");
        arrBut.push(btnSize);
        btnSize.appendChild(document.createTextNode(index[i].name));
        btnSize.style.padding = "5px";
        btnSize.style.width = "15px";
        btnSize.style.textAlign = "center";
        btnSize.style.cursor = "pointer";
        btnSize.style.border = "2px solid gray";
        btnSize.style.margin = "5px";
        arrBut[isSelectedSize].style.borderColor = "red";
        btnSize.onclick = function () {
            if (i != isSelectedSize) {
                arrBut[i].style.borderColor = "red";
                arrBut[isSelectedSize].style.borderColor = "gray";
                isSelectedSize = i;
                let amount = 0;
                data.prodInStock.forEach((e) => {
                    if (
                        e.idSize == index[isSelectedSize].id &&
                        e.idProd == id
                    ) {
                        amount += parseInt(e.amount);
                    }
                });
                document.getElementById("sanphamcosan").textContent =
                    amount + " sản phẩm có sẵn";
            }
        };
        div.appendChild(btnSize);
    }

    return div;
}
let totalPrice = 0;
let countPro = 1;

function amount(current, pricee) {
    let count = 1;
    totalPrice = pricee;
    let div = document.createElement("div");
    let divAmou = document.createElement("div");
    divAmou.style.display = "block";
    divAmou.appendChild(div);
    div.style.display = "flex";
    div.style.textAlign = "center";
    divAmou.style.marginTop = "15px";
    let btnSub = document.createElement("button");
    btnSub.style.width = "20px";
    btnSub.style.border = "1px solid gray";
    btnSub.style.cursor = "pointer";
    btnSub.style.backgroundColor = "white";
    btnSub.onclick = function () {
        if (count > 1) {
            count--;
            updatePrice(count);
        }
    };
    btnSub.appendChild(document.createTextNode("-"));
    div.appendChild(btnSub);
    let divshow = document.createElement("input");
    divshow.id = "choose-amount";
    divshow.style.width = "50px";
    divshow.style.border = "none";
    divshow.style.borderTop = "1px solid gray";
    divshow.style.borderBottom = "1px solid gray";
    divshow.style.outline = "none";
    divshow.style.textAlign = "center";
    divshow.placeholder = "1";
    divshow.type = "number";
    divshow.max = current;
    divshow.min = 1;

    function updatePrice(countt) {
        divshow.placeholder = countt;
        divshow.value = countt;
        let price = "";
        for (let i = 0; i < pricee.toString().length; i++) {
            price += pricee.toString()[i];
        }
        countPro = countt;
        totalPrice = parseInt(price) * countt;
        divPr.textContent =
            "Tổng cộng: " + calculated(parseInt(price) * countt) + " VND";
    }
    window.addEventListener("click", function () {
        if (parseInt(divshow.value) > current) {
            count = current;
            updatePrice(current);
        } else {
            updatePrice(divshow.value > 0 ? divshow.value : 1);
        }
    });
    div.appendChild(divshow);
    let btnAdd = document.createElement("button");
    btnAdd.style.width = "20px";
    btnAdd.style.border = "1px solid gray";
    btnAdd.style.cursor = "pointer";
    btnAdd.style.backgroundColor = "white";
    btnAdd.onclick = function () {
        if (count < current) {
            count++;
            updatePrice(count);
        }
    };
    btnAdd.appendChild(document.createTextNode("+"));
    div.appendChild(btnAdd);
    let text = document.createElement("div");
    text.id = "sanphamcosan";
    text.appendChild(document.createTextNode(current + " sản phẩm có sẵn"));
    text.style.fontSize = "10px";
    text.style.color = "gray";
    text.style.marginLeft = "10px";
    text.style.display = "flex";
    text.style.flexDirection = "column";
    text.style.justifyContent = "flex-end";
    div.appendChild(text);
    let divPr = document.createElement("div");
    divPr.style.marginTop = "20px";
    divPr.appendChild(
        document.createTextNode("Tổng cộng: " + calculated(pricee) + " VND")
    );
    divAmou.appendChild(divPr);
    return divAmou;
}

// document.getElementById("div-onClickProduct").onclick = function (e) {
//   if (e.target.matches("#div-onClickProduct")) {
//     showacc(document.getElementsByClassName("popUp-prod")[0], 0, 1200);
//     setTimeout(() => {
//       document.getElementById("div-onClickProduct").style.display = "";
//       isCTSP = false;
//     }, 400);
//   }
// };
document.getElementById("show_product").onclick = function (e) {
    if (e.target.matches("#show_product")) {
        document.getElementById("show_product").style.display = "";
    }
};

function createPageNumber(idPr, product, proInpage) {
    let totalProduct = product.length;
    let totalPage = 0;
    if (totalProduct % 12 > 0) {
        totalPage = (totalProduct - (totalProduct % 12)) / 12 + 1;
    } else {
        totalPage = (totalProduct - (totalProduct % 12)) / 12;
    }
    let ul = document.createElement("ul");
    ul.id = "page-number";
    let arr = new Array();
    let aArr = new Array();
    for (let i = 1; i <= totalPage; i++) {
        let li = document.createElement("li");
        arr.push(li);
        li.style.border = "1px solid gray";
        li.style.cursor = "pointer";
        li.style.margin = "10px";
        li.style.padding = "5px 10px";
        li.style.lineHeight = "20px";
        li.style.borderRadius = "5px";
        li.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
        li.style.transition = "0.8s";
        let a = document.createElement("a");
        a.style.color = "black";
        aArr.push(a);
        a.appendChild(document.createTextNode(i));
        li.onclick = function () {
            arr[currentPage - 1].style.backgroundColor = "white";
            aArr[currentPage - 1].style.color = "black";
            currentPage = parseInt(li.textContent);
            arr[currentPage - 1].style.backgroundColor = "lightpink";
            aArr[currentPage - 1].style.color = "white";
            let pos = document.documentElement.scrollTop;
            let id = setInterval(function frame() {
                if (pos <= 300) {
                    clearInterval(id);
                    if (document.getElementById("list-product") != null) {
                        document.getElementById("list-product").remove();
                    }
                    document
                        .getElementById("div-list")
                        .appendChild(addListProduct(idPr, proInpage));
                } else {
                    pos -= 10;
                    document.documentElement.scrollTop = pos;
                }
            }, 1);
        };
        li.onmouseenter = function () {
            li.style.borderRadius = "50px";
        };
        li.onmouseleave = function () {
            li.style.borderRadius = "5px";
        };
        li.appendChild(a);
        ul.appendChild(li);
        aArr[currentPage - 1].style.color = "white";
        arr[currentPage - 1].style.backgroundColor = "lightpink";
    }
    document.getElementById("space-product").appendChild(ul);
}
let c = 0;
let curPageSearch = 1;

function checkUpdatePassword(mkht, mkm, xnmkm) {
    if (mkht != currentUser.password) {
        return false;
    } else {
        if (mkm != xnmkm && mkm != "") {
            return false;
        } else {
            return true;
        }
    }
}
let saveUpdate = document.getElementById("save-update");
document.getElementById("btn-addimg").onclick = function () {
    let chooseImg = document.getElementById("choose-img");
    chooseImg.click();
};
let imgLinkChange = "";
document.getElementById("choose-img").onchange = function () {
    let chooseImg = document.getElementById("choose-img");
    console.log("./Image/avt/" + chooseImg.value.replace("C:\\fakepath\\", ""));
    imgLinkChange =
        `./Image/avt/` + chooseImg.value.replace("C:\\fakepath\\", "");
    document.getElementById("img-current-customer").src =
        `./Image/avt/` + chooseImg.value.replace("C:\\fakepath\\", "");
};
let tdmk = false;

saveUpdate.onclick = function () {
    let update_birthday = document.getElementById("update-birthday");
    let update_contact = document.getElementById("update-contact");
    let update_name = document.getElementById("update-name");
    let name = update_name.value;
    let birthday = update_birthday.value;
    let contact = update_contact.value.replace("+84", "0");
    let sex = "";
    let s = document.getElementsByName("sex");
    for (let i = 3; i < s.length; i++) {
        if (s[i].checked) {
            sex = document
                .getElementById("update-in4")
                .getElementsByTagName("label")[i - 3].textContent;
        }
    }
    let correct = true;
    data.customer.forEach((element) => {
        if (element.number_phone == contact && element.id != currentUser.id) {
            alert("Số điện thoại này đã tồn tại");
            correct = false;
            return;
        }
    });
    if (!correct) {
        return;
    }
    if (
        update_name.value != "" &&
        update_contact.value != "" &&
        update_birthday.value != "" &&
        sex != ""
    ) {
        if (checkValidNameU(update_name.value, "")) {
            if (checkValidPhoneNumber(update_contact.value)) {
                if (checkDate(update_birthday.value)) {
                    if (tdmk) {
                        if (
                            checkUpdatePassword(
                                document.getElementById("mkht").value,
                                document.getElementById("mkm").value,
                                document.getElementById("xnmkm").value
                            )
                        ) {
                            currentUser.name = name;
                            currentUser.birth_day =
                                birthday.split("-")[2] +
                                "-" +
                                birthday.split("-")[1] +
                                "-" +
                                birthday.split("-")[0];
                            currentUser.sex = sex;
                            currentUser.number_phone = contact;
                            currentUser.image = imgLinkChange;
                            currentUser.password =
                                document.getElementById("xnmkm").value;
                            document.getElementById("mkht").value = "";
                            document.getElementById("mkm").value = "";
                            document.getElementById("xnmkm").value = "";
                            localStorage.setItem("data", JSON.stringify(data));
                            alert("Cập nhật thông tin thành công");
                        } else {
                            alert("Vui lòng kiểm tra lại mật khẩu");
                        }
                    } else {
                        currentUser.name = name;
                        currentUser.birth_day =
                            birthday.split("-")[2] +
                            "-" +
                            birthday.split("-")[1] +
                            "-" +
                            birthday.split("-")[0];
                        currentUser.sex = sex;
                        currentUser.number_phone = contact;
                        currentUser.image = imgLinkChange;
                        document.getElementById("mkht").value = "";
                        document.getElementById("mkm").value = "";
                        document.getElementById("xnmkm").value = "";
                        localStorage.setItem("data", JSON.stringify(data));
                        alert("Cập nhật thông tin thành công");
                    }
                } else {
                    alert("Ngày sinh chưa hợp lệ");
                }
            } else {
                alert("Số điện thoại không hợp lệ");
            }
        } else {
            alert("Tên không được chứa kí tự đặc biệt hoặc chữ số");
        }
    } else {
        alert("Vui lòng cập nhật đầy đủ thông tin");
    }
};

function initIdReceipt() {
    let max = 0;
    max = parseInt(data.receipt[data.receipt.length - 1].id.replace("RE", ""));
    return "RE" + String(max + 1).padStart(4, "0");
}

function createReceipt(liProd) {
    let st = "Chờ xác nhận";
    let newRC = new Receipt(
        initIdReceipt(),
        currentUser.id,
        liProd,
        currentUser.name,
        getCurrentDate(),
        document.getElementById("inp-dc").value,
        st
    );
    return newRC;
}

function fillReceipt(receipt) {
    function findImage(id) {
        for (prod of data.product) {
            if (prod.id == id) {
                if (!prod.images[0]) {
                    return "";
                }
                let currentClassify = "";
                let classifyy = "";
                for (const classify of data.largeClassify) {
                    if (
                        prod.id
                            .substring(0, 2)
                            .toLowerCase()
                            .indexOf(classify.id.toLowerCase()) != -1
                    ) {
                        classifyy = classify.id + "/";
                        currentClassify = classify;
                        break;
                    }
                }
                for (const miniClass of currentClassify.miniClassify) {
                    if (
                        prod.id
                            .toLowerCase()
                            .indexOf(miniClass.id.toLowerCase()) != -1
                    ) {
                        classifyy += miniClass.id + "/";
                        break;
                    }
                }
                return "../Image/SANPHAM/" + prod.images[0];
            }
        }
        return "";
    }

    function findPrice(id) {
        for (prod of data.product) {
            if (prod.id == id) {
                return prod.price;
            }
        }
    }

    function findName(id) {
        for (prod of data.product) {
            if (prod.id == id) {
                return prod.name;
            }
        }
    }

    function getTotalPrice() {
        let total = 0;
        receipt.list_prod.forEach((element) => {
            total += parseInt(element.price);
        });
        return total;
    }

    function initDetailToFill(
        image,
        name,
        price,
        priceDiscount = price,
        amount,
        size,
        total_price
    ) {
        return {
            image,
            name,
            price,
            priceDiscount,
            amount,
            size,
            total_price,
        };
    }
    let divReceipt = document.createElement("div");
    divReceipt.id = "div-hoadon";
    let stringInner =
        ` <div id="hoa-don">
        <div id="ten-bang">
            <p>Hoá đơn</p>
            <div id="ngay-tong-tien">
                <div id="ngay-hd">
                    Ngày: ` +
        getCurrentDate() +
        `
                </div>
                <div id="tong-tien">
                    Tổng tiền: ` +
        calculated(getTotalPrice()) +
        ` VND
                </div>
            </div>
        </div>
        <div id="bang">
            <table id="table-hoadon">
                <thead>
                    <tr>
                        <td>Ảnh</td>
                        <td>Tên sản phẩm</td>
                        <td>Giá</td>
                        <td>Số lượng</td>
                        <td>Size</td>
                        <td>Thành tiền</td>
                    </tr>
                </thead>
                <tbody>`;

    receipt.list_prod.forEach((element) => {
        let image = findImage(element.idProd);
        let price = findPrice(element.idProd);
        let name = findName(element.idProd);
        let detail = initDetailToFill(
            image,
            name,
            price,
            element.price / element.amount,
            element.amount,
            element.idSize,
            element.price * element.amount
        );

        let stringPrice = "";
        if (parseInt(detail.priceDiscount) - parseInt(price) < 0) {
            stringPrice =
                `<div>
            <del>
            ` +
                calculated(detail.price) +
                ` VND
        </del>
        </div>
        <div>
            ` +
                calculated(detail.priceDiscount) +
                ` VND
        </div>`;
        } else {
            stringPrice =
                `<div>
            ` +
                calculated(detail.price) +
                ` VND</div>`;
        }
        stringInner +=
            `                    <tr>
        <td class="anh-sp">
            <img style="width: 70px; height : 70px" src="` +
            image +
            `">
        </td>
        <td>
            ` +
            name +
            `
        </td>
        <td>
            ` +
            stringPrice +
            `
        </td>
        <td>
            ` +
            detail.amount +
            `
        </td>
        <td>
            ` +
            detail.size.substring(1, 2) +
            `
        </td>
        <td>
            ` +
            calculated(element.price) +
            ` VND
        </td>
    </tr>`;
    });
    divReceipt.innerHTML = stringInner;
    let bodyY = document.getElementsByTagName("body");
    bodyY[0].appendChild(divReceipt);
    divReceipt.style.position = "fixed";
    divReceipt.style.zIndex = 100000;
    document.getElementById("div-hoadon").onclick = function (e) {
        if (e.target.matches("#div-hoadon")) {
            showacc(document.getElementById("hoa-don"), 0, 1200);
            setTimeout(() => {
                if (document.getElementById("div-hoadon") != null) {
                    document.getElementById("div-hoadon").remove();
                }
            }, 350);
        }
    };
}
