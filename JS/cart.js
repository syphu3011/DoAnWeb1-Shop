// let pro = new Array();
// let sizeP = new Array();
// let prInStock = new Array();
// let KM = new Array();

// function getPro(id) {
//   for (let i = 0; i < data.product.length; i++) {
//     if (data.product[i].id == id) {
//       pro.push(data.product[i]);
//     }
//   }
// }

// function getSize(idSize) {
//   if (idSize == "") {
//     sizeP.push(null);
//     return;
//   }
//   let siz = new Array();
//   for (let i = 0; i < data.size.length; i++) {
//     if (data.size[i].id.indexOf(idSize[0]) != -1) {
//       siz.push(data.size[i]);
//     }
//   }
//   sizeP.push(siz);
// }

// function getSizeP(idProd) {
//   for (let i = 0; i < data.size.length; i++) {
//     if (data.size[i].id.indexOf(idProd[0]) != -1) {
//       sizeP.push(data.size[i]);
//     }
//   }
// }

// function getProInStock(idProd) {
//   data.prodInStock.forEach((e) => {
//     if (e.idProd == idProd) {
//       prInStock.push(e);
//     }
//   });
// }

// function getKM(idProd) {
//   data.promote.forEach((element) => {
//     element.products.forEach((e) => {
//       if (e.id == idProd) {
//         KM.push(new km(e.id, element.discount_percent, element.discount_price));
//       }
//     });
//   });
// }

// function tinhtongtien(count, id, cost) {
//   for (let i = 0; i < KM.length; i++) {
//     if (KM[i].idProd == id) {
//       return (
//         (parseInt(cost) -
//           (parseInt(cost) * parseInt(KM[i].discount_percent)) / 100 -
//           parseInt(KM[i].discount_price)) *
//         count
//       );
//     }
//   }
//   return parseInt(cost) * count;
// }

// function checkConHang(list) {
//   for (let i = 0; i < list.length; i++) {
//     for (let j = 0; j < prInStock.length; j++) {
//       if (
//         list[i].idProd == prInStock[j].idProd &&
//         list[i].idSize == prInStock[j].idSize &&
//         prInStock[j].amount == 0
//       ) {
//         return false;
//       }
//     }
//   }
//   return true;
// }
function fill_price_in_cart() {
    for (let i = 0; i < product_in_cart.length; i++) {
        // console.log(product_in_cart[i].cost);
        if (
            product_in_cart[i].cost != null &&
            product_in_cart[i].price_sale < product_in_cart[i].cost
        ) {
            document.getElementById(
                "del_cart_" + product_in_cart[i].id_product
            ).innerHTML = calculated(product_in_cart[i].cost) + " VNĐ";
            document.getElementById(
                "div_cart_" + product_in_cart[i].id_product
            ).innerHTML = calculated(product_in_cart[i].price_sale) + " VNĐ";
            document.getElementById(
                "del_total_" + product_in_cart[i].id_product
            ).innerHTML =
                calculated(
                    product_in_cart[i].cost * product_in_cart[i].amount
                ) + " VNĐ";
            document.getElementById(
                "div_total_" + product_in_cart[i].id_product
            ).innerHTML =
                calculated(
                    product_in_cart[i].price_sale * product_in_cart[i].amount
                ) + " VNĐ";
        } else {
            document.getElementById(
                "del_cart_" + product_in_cart[i].id_product
            ).innerHTML = "";
            document.getElementById(
                "div_cart_" + product_in_cart[i].id_product
            ).innerHTML = calculated(product_in_cart[i].cost) + " VNĐ";
            document.getElementById(
                "del_total_" + product_in_cart[i].id_product
            ).innerHTML = "";
            document.getElementById(
                "div_total_" + product_in_cart[i].id_product
            ).innerHTML =
                calculated(
                    product_in_cart[i].price_sale * product_in_cart[i].amount
                ) + " VNĐ";
        }
    }
}

localStorage.setItem("is_update_cart", false);

function sukien(data_product) {
    fill_price_in_cart();

    let tongtien = 0;
    let btnXoa = document.getElementById("nut-xoa");
    // for (let i = 0; i < btnXoa.length; i++) {
    btnXoa.onclick = function () {
        if (total_price_onclick().product_is_selected.length > 0) {
            console.log(total_price_onclick().product_is_selected);
            getDataFromServer(
                "./Server/delete_product_in_cart.php",
                {
                    id_customer: currentUser.id,
                    id_product: total_price_onclick().product_is_selected,
                },
                function (response) {
                    console.log(response);
                    showacc(document.getElementById("tranggiohang"), 0, 1200);
                    setTimeout(() => {
                        document.getElementsByClassName(
                            "table-giohang"
                        )[0].innerHTML = "";
                        document.getElementById(
                            "hienthigiohang"
                        ).style.display = "";
                        create_cart_from_server();
                    }, 400);

                    //     console.log(respone);
                    //     getDataFromServer(
                    //         "./Server/get_cart_byID.php",
                    //         { idkh: currentUser.id },
                    //         function (respone) {
                    //             createCart(respone.data.product);
                    //             console.log(respone);
                    //         }
                    //     );
                }
            );
        }
        // getDataFromServer(
        //     "./Server/delete_product_in_cart.php",
        //     {
        //         id_customer: currentUser.id,
        //         id_product: product_in_cart[i].id_product,
        //     },
        //     function (respone) {
        //         showacc(document.getElementById("tranggiohang"), 0, 1200);
        //         setTimeout(() => {
        //             document.getElementsByClassName(
        //                 "table-giohang"
        //             )[0].innerHTML = "";
        //             document.getElementById(
        //                 "hienthigiohang"
        //             ).style.display = "";
        //             create_cart_from_server();
        //         }, 400);

        //         //     console.log(respone);
        //         //     getDataFromServer(
        //         //         "./Server/get_cart_byID.php",
        //         //         { idkh: currentUser.id },
        //         //         function (respone) {
        //         //             createCart(respone.data.product);
        //         //             console.log(respone);
        //         //         }
        //         //     );
        //     }
        // );

        // console.log(product_in_cart[i].id);
        // while (
        //     document.getElementsByClassName("table-giohang")[0].rows
        //         .length > 0
        // ) {
        //     document
        //         .getElementsByClassName("table-giohang")[0]
        //         .deleteRow(0);
        // }
        // console.log(pro[i])
        // currentUser.cart.splice(i, 1);
        // localStorage.setItem("data", JSON.stringify(data));
        // document.getElementById("hienthigiohang").style.display = "";
        // document.getElementById("noti").style.display = "flex";
        // document.getElementById("noti-noti").innerHTML =
        //     "đã xoá Thành công";
        // showacc(document.getElementById("noti-noti"), -500, 0);
        // document.getElementById("noti-noti").style.display = "flex";
        // setTimeout(() => {
        //     document.getElementById("noti").style.display = "";
        //     tongtien = 0;
        //     document.getElementById("tongthanhtoan").textContent =
        //         calculated(tongtien) + " VND";
        //     createCart();
        // }, 700);
        // document.getElementsByClassName("table-giohang")[0].deleteRow(i)
    };
    // }
    let btnCheckBox = document.getElementsByClassName("checkboxIncart");
    function total_price_onclick() {
        let product_is_select = new Array();
        let tongthanhtoan = 0;
        for (let i = 0; i < btnCheckBox.length; i++) {
            if (btnCheckBox[i].checked) {
                product_is_select.push(product_in_cart[i].id_product);
                tongthanhtoan += product_in_cart[i].price;
            }
        }
        // console.log(product_is_select);
        return {
            totalprice: tongthanhtoan,
            product_is_selected: product_is_select,
        };
    }
    for (let i = 0; i < btnCheckBox.length; i++) {
        btnCheckBox[i].onclick = function () {
            if (btnCheckBox[i].checked) {
                document.getElementsByClassName("checkbox-label ")[
                    i
                ].style.color = "red";
                // tongthanhtoan += product_in_cart[i].price;
                document.getElementById("tongthanhtoan").innerHTML =
                    calculated(total_price_onclick().totalprice) + " VNĐ";
            } else {
                document.getElementsByClassName("checkbox-label ")[
                    i
                ].style.color = "black";
                document.getElementById("tongthanhtoan").innerHTML =
                    calculated(total_price_onclick().totalprice) + " VNĐ";
            }
            //     document.getElementsByClassName("checkbox-label ")[i].style.color =
            //         "red";
            //     // if (btnCheckBox[i].checked) {
            //     console.log("click");
            //     //     tongtien += currentUser.cart[i].amount * pro[i].price;
            //     // } else {
            //     //     console.log(currentUser.cart[i].price);
            //     //     tongtien -= currentUser.cart[i].amount * pro[i].price;
            //     // }
            //     // document.getElementById("tongthanhtoan").textContent =
            //     //     calculated(tongtien) + " VND";
        };
    }
    // let select_size = document.getElementsByClassName("cart_size");
    // for (let i = 0; i < select_size.length; i++) {
    //     // console.log(select_size[i]);
    //     console.log(i);
    //     select_size[i].onclick = function () {
    //         console.log(1);
    //     };
    //     // select_size[i].onclick = function () {
    //     //     console.log(1)
    //     //     let id = select_size[i].id.split("-");
    //     //     console.log(select_size[i].id);
    //     //     // getDataFromServer(
    //     //     //     "./Server/get_product_instock.php",
    //     //     //     { id_product: id[0], id_size: id[1], id_size: id[2] },
    //     //     //     function (response) {
    //     //     //         console.log(response);
    //     //     //     }
    //     //     // );
    //     // };
    // }
    document.getElementById("nut-thanhtoan").onclick = function () {
        // let isCheck = new Array();
        // for (let i = 0; i < btnCheckBox.length; i++) {
        //     if (btnCheckBox[i].checked) {
        //         isCheck.push(currentUser.cart[i]);
        //     }
        // }
        if (total_price_onclick().product_is_selected.length == 0) {
            alert("Vui lòng chọn sản phẩm thanh toán");
        } else {
            // checkConHang(isCheck)
            // if (checkConHang(isCheck)) {
            showacc(document.getElementById("tranggiohang"), 0, 1200);
            setTimeout(() => {
                // while (
                //     document.getElementsByClassName("table-giohang")[0].rows
                //         .length > 0
                // ) {
                //     document
                //         .getElementsByClassName("table-giohang")[0]
                //         .deleteRow(0);
                // }
                console.log(product_in_cart);
                ttGioHang(total_price_onclick());

                document.getElementsByClassName("table-giohang")[0].innerHTML =
                    "";
                document.getElementById("hienthigiohang").style.display = "";
                setTimeout(() => {
                    tongtien = 0;
                    document.getElementById("tongthanhtoan").textContent =
                        calculated(tongtien) + " VND";
                    document.getElementById("thanh-toan").style.display =
                        "flex";
                    showacc(document.getElementById("div-thanhtoan"), -500, 0);
                }, 400);
            }, 400);
            // } else {
            //     alert("Sản phẩm đã hết hàng");
            // }
        }
    };

    // let doiSize = document.getElementsByClassName("size")

    //     if (proSize[i].textContent.length != 0) {
    //         for (
    //             let j = 0;
    //             j < proSize[i].getElementsByClassName("size").length;
    //             j++
    //         ) {
    //             // console.log(i, j)

    //             proSize[i].getElementsByClassName("size")[j].onclick =
    //                 function () {
    //                     let ind = false;
    //                     prInStock.forEach((el) => {
    //                         if (
    //                             el.idSize == sizeP[i][j].id &&
    //                             el.idProd == currentUser.cart[i].idProd &&
    //                             parseInt(el.amount) > 0
    //                         ) {
    //                             // console.log("1")
    //                             ind = true;
    //                         }
    //                     });
    //                     if (ind) {
    //                         if (currentUser.cart[i].amount == 0) {
    //                             currentUser.cart[i].amount = 1;
    //                             currentUser.cart[i].price = pro[i].price;
    //                         }
    //                         currentUser.cart[i].idSize = sizeP[i][j].id;
    //                         // localStorage.setItem("data", JSON.stringify(data))
    //                         while (
    //                             document.getElementsByClassName(
    //                                 "table-giohang"
    //                             )[0].rows.length > 0
    //                         ) {
    //                             document
    //                                 .getElementsByClassName("table-giohang")[0]
    //                                 .deleteRow(0);
    //                         }
    //                         localStorage.setItem("data", JSON.stringify(data));
    //                         document.getElementById(
    //                             "hienthigiohang"
    //                         ).style.display = "";
    //                         document.getElementById("noti").style.display =
    //                             "flex";
    //                         document.getElementById("noti-noti").innerHTML =
    //                             "cập nhật giỏ hàng Thành công";
    //                         showacc(
    //                             document.getElementById("noti-noti"),
    //                             -500,
    //                             0
    //                         );
    //                         document.getElementById("noti-noti").style.display =
    //                             "flex";
    //                         setTimeout(() => {
    //                             document.getElementById("noti").style.display =
    //                                 "";
    //                             tongtien = 0;
    //                             document.getElementById(
    //                                 "tongthanhtoan"
    //                             ).textContent = calculated(tongtien) + " VND";
    //                             createCart();
    //                         }, 700);
    //                     } else {
    //                         alert("Số lượng sản phẩm không khả dụng");
    //                     }
    //                 };
    //         }
    //     }
    // }
    function set_color_onclick(list_button, index, id) {
        for (let i = 0; i < list_button.length; i++) {
            if (list_button[i].id.indexOf(id) != -1)
                list_button[i].style.borderColor = "black";
        }
        list_button[index].style.borderColor = "red";
    }
    let list_button_size = document.getElementsByClassName("size");
    for (let i = 0; i < list_button_size.length; i++) {
        console.log(i);
        // button_size = list_button_size[i];
        list_button_size[i].onclick = function () {
            console.log(list_button_size[i]);
            let id = list_button_size[i].id.split("-");
            console.log(data_product);
            let current_product = data_product.find(
                (product) => product.id_product == id[0]
            ).att;
            document.getElementById("chon_size" + id[0]).innerHTML = inner(
                current_product,
                id[0],
                id[1],
                id[2],
                "size"
            );
            document.getElementById("chon_mau" + id[0]).innerHTML = inner(
                current_product,
                id[0],
                id[1],
                id[2],
                "color"
            );

            console.log(data_product);

            // console.log(id);
            // getDataFromServer(
            //     "./Server/get_product_instock.php",
            //     { id_product: id[0], id_size: id[1], id_color: id[2] },
            //     function (response) {
            //         console.log(response);
            //         if (response.success) {
            //             document.getElementById(
            //                 "cart_product_instock"
            //             ).innerHTML = response.data.product[0].amount + " ";
            //             set_color_onclick(list_button_size, i, id[0]);
            data_product.find(
                (product) => product.id_product == id[0]
            ).id_size = id[1];
            //         } else {
            //             alert("Sản phẩm hiện tại không còn");
            //         }
            //     }
            // );

            // fill_price_in_cart();
            // create_cart_from_server()
            console.log(product_in_cart);
            getDataFromServer(
                "./Server/get_product_instock.php",
                { id_product: id[0], id_size: id[1], id_color: id[2] },
                function (response) {
                    console.log(response);
                    if (response.success) {
                        createCart(data_product);
                        document.getElementById(
                            "cart_product_instock"
                        ).innerHTML = response.data.product[0].amount + " ";
                    }
                }
            );
        };
    }
    let list_button_color = document.getElementsByClassName("cart_color");
    console.log(list_button_color.length);
    for (let i = 0; i < list_button_color.length; i++) {
        button_color = list_button_color[i];
        button_color.onclick = function () {
            let id = list_button_color[i].id.split("-");
            let current_product = data_product.find(
                (product) => product.id_product == id[0]
            ).att;
            document.getElementById("chon_mau" + id[0]).innerHTML = inner(
                current_product,
                id[0],
                id[1],
                id[2],
                "color"
            );
            document.getElementById("chon_size" + id[0]).innerHTML = inner(
                current_product,
                id[0],
                id[1],
                id[2],
                "size"
            );

            data_product.find(
                (product) => product.id_product == id[0]
            ).id_color = id[2];
            getDataFromServer(
                "./Server/get_product_instock.php",
                { id_product: id[0], id_size: id[1], id_color: id[2] },
                function (response) {
                    console.log(response);
                    if (response.success) {
                        createCart(data_product);
                        document.getElementById(
                            "cart_product_instock"
                        ).innerHTML = response.data.product[0].amount + " ";
                    }
                }
            );
            // createCart(data_product);

            // console.log(button_color.id);
            // set_color_onclick(list_button_color, i);
            // product_in_cart[i].id_size = button_color.id;
            // fill_price_in_cart();
        };
    }
    let btnGiam = document.getElementsByClassName("giam");
    for (let i = 0; i < btnGiam.length; i++) {
        btnGiam[i].onclick = function () {
            localStorage.setItem("is_update_cart", true);

            //   let cur_amount = product_in_cart[i].amount;
            //   if (currentUser.cart[i].amount != 0) {
            if (product_in_cart[i].amount > 1) {
                product_in_cart[i].amount--;
                // console.log(product_in_cart[i].price_sale);
                document.getElementsByClassName("hien-sl")[i].textContent =
                    product_in_cart[i].amount;
                product_in_cart[i].price =
                    product_in_cart[i].price_sale * product_in_cart[i].amount;
                // document.getElementsByClassName("ton-tien")[i].textContent =
                //     calculated(product_in_cart[i].price) + " VNĐ";
                fill_price_in_cart();
                document.getElementById("tongthanhtoan").textContent =
                    calculated(total_price_onclick().totalprice) + " VND";
            } else {
                alert("Đã đạt số lượng tối thiểu");
            }
            //   if (currentUser.cart[i].amount != 0) {
            //     if (currentUser.cart[i].amount > 1) {
            //       currentUser.cart[i].amount--;
            //       currentUser.cart[i].price = tinhtongtien(
            //         currentUser.cart[i].amount,
            //         currentUser.cart[i].idProd,
            //         pro[i].price
            //       );
            //       document.getElementsByClassName("hien-sl")[i].textContent =
            //         currentUser.cart[i].amount;
            //       if (btnCheckBox[i].checked) {
            //         tongtien -= pro[i].price;
            //       }
            //       document.getElementsByClassName("ton-tien")[i].textContent =
            //         calculated(currentUser.cart[i].price) + " VND";
            //   document.getElementById("tongthanhtoan").textContent =
            //     calculated(total_price_onclick().totalprice) + " VND";
            //     } else {
            //       alert("Đã đạt số lượng tối thiểu");
            //     }
            //     currentUser.cart[i].amount.toString();
            //     localStorage.setItem("data", JSON.stringify(data));
            //   } else {
            //     alert("Sản phẩm đã hết hàng");
            //   }
        };
    }
    let btnTang = document.getElementsByClassName("tang");
    for (let i = 0; i < btnTang.length; i++) {
        btnTang[i].onclick = function () {
            localStorage.setItem("is_update_cart", true);
            //   console.log(data_product);
            //   let amount_instock = data_product[i].amount_in_stock;
            //   let cur_amount = product_in_cart[i].amount;
            //   if (currentUser.cart[i].amount != 0) {
            if (product_in_cart[i].amount < data_product[i].amount_in_stock) {
                product_in_cart[i].amount++;
                // console.log(product_in_cart[i]);
                product_in_cart[i].price =
                    product_in_cart[i].price_sale * product_in_cart[i].amount;
                // document.getElementsByClassName("ton-tien")[i].textContent =
                //     calculated(product_in_cart[i].price) + " VNĐ";
                document.getElementsByClassName("hien-sl")[i].textContent =
                    product_in_cart[i].amount;
                fill_price_in_cart();
                document.getElementById("tongthanhtoan").textContent =
                    calculated(total_price_onclick().totalprice) + " VND";
            } else {
                alert("Đã đạt số lượng tối đa");
            }
            //   if (
            //     parseInt(currentUser.cart[i].amount) < parseInt(prInStock[i].amount)
            //   ) {
            //     currentUser.cart[i].amount++;
            //     currentUser.cart[i].price = tinhtongtien(
            //       currentUser.cart[i].amount,
            //       currentUser.cart[i].idProd,
            //       pro[i].price
            //     );
            //     document.getElementsByClassName("ton-tien")[i].textContent =
            //       calculated(currentUser.cart[i].price) + " VND";
            //     document.getElementsByClassName("hien-sl")[i].textContent =
            //       currentUser.cart[i].amount;
            //     if (btnCheckBox[i].checked) {
            //       tongtien += pro[i].price;
            //     }
            //     document.getElementById("tongthanhtoan").textContent =
            //       calculated(tongtien) + " VND";
            // } else {
            //   alert("Đã đạt số lượng tối đa");
            // }
            //   currentUser.cart[i].amount.toString();
            //   localStorage.setItem("data", JSON.stringify(data));
            //   } else {
            // alert("Sản phẩm đã hết hàng");
            //   }
        };
    }
}
btncart.onclick = function () {
    if (document.cookie != "" && document.cookie != ".") {
        create_cart_from_server();
        // getDataFromServer(
        //     "./Server/get_cart_byID.php",
        //     { idkh: currentUser.id },
        //     function (respone) {
        //         createCart(respone.data.product);
        //         // console.log(respone);
        //     }
        // );
        // createCart();
        // if (currentUser.cart.length > 0) {
        //     createCart()
        // } else {
        //     alert("Giỏ hàng đang trống")
        // }
    } else {
        alert("Đăng nhập để tiếp tục");
        account.style.display = "flex";
        showacc(signin, -500, 0);
    }
};
var product_in_cart = [];
function create_cart_from_server() {
    getDataFromServer(
        "./Server/get_cart_byID.php",
        { idkh: currentUser.id },
        function (response) {
            console.log(response);
            if (response.success) {
                console.log(response);
                createCart(response.data.product);
            } else {
                alert("Chưa có sản phẩm nào trong giỏ hàng");
            }
            // console.log(respone);
        }
    );
}
function createCart(data_response) {
    console.log(data_response);
    document.getElementsByClassName("table-giohang")[0].innerHTML = "";
    // document.getElementById("hienthigiohang").style.display = "";
    product_in_cart.length = 0;
    // console.log(data_response);
    //   let up_date_cart = new Cart(null, null, null, null, null);
    if (data_response.length > 0) {
        // pro.length = 0;
        // sizeP.length = 0;
        // prInStock.length = 0;
        // KM.length = 0;
        // for (let i = 0; i < currentUser.cart.length; i++) {
        //   getPro(currentUser.cart[i].idProd);
        //   getSize(currentUser.cart[i].idSize);
        //   getProInStock(currentUser.cart[i].idProd);
        //   getKM(currentUser.cart[i].idProd);
        // }
        // console.log("function createCart: ", data_response[0].att.length);
        showacc(document.getElementById("tranggiohang"), -500, 0);
        // setTimeout(() => {
        document.getElementById("hienthigiohang").style.display = "flex";
        // }, 400);
        for (let i = 0; i < data_response.length; i++) {
            //   let s = "Image/SANPHAM/" + pro[i].images[0];
            let line_product = data_response[i];
            let product = new Cart(
                line_product.id_product,
                line_product.id_size,
                line_product.id_color,
                line_product.amount,
                line_product.price,
                line_product.cost,
                line_product.price / line_product.amount
            );
            product_in_cart.push(product);
            let inner_size = inner(
                line_product.att,
                line_product.id_product,
                line_product.id_size,
                line_product.id_color,
                "size"
            );
            // console.log(line_product);
            // let array_size = new Array();
            // for (let j = 0; j < line_product.att.length; j++) {
            //     let element = line_product.att[j];
            //     if (array_size.indexOf(element.id_size) == -1) {
            //         console.log(element);
            //         if (
            //             element.id_size == line_product.id_size &&
            //             element.id_color == line_product.id_color
            //         ) {
            //             inner_size +=
            //     ` <div id="` +
            //     line_product.id_product +
            //     "-" +
            //     element.id_size +
            //     "-" +
            //     element.id_color +
            //     `" class="size" style="border-color: red;">
            //  ` +
            //     element.id_size.substring(2) +
            //     `
            //           </div>`;
            //         } else {
            //             inner_size +=
            //     ` <div id="` +
            //     line_product.id_product +
            //     "-" +
            //     element.id_size +
            //     "-" +
            //     element.id_color +
            //     `" class="size">
            //  ` +
            //     element.id_size.substring(2) +
            //     `
            //           </div>`;
            //         }
            //         array_size.push(element.id_size);
            //     }
            // }
            let inner_color = inner(
                line_product.att,
                line_product.id_product,
                line_product.id_size,
                line_product.id_color,
                "color"
            );
            // console.log(line_product.att);
            // for (let j = 0; j < line_product.att.length; j++) {
            //     let element = line_product.att[j];
            //     if (element.id_size == line_product.id_size)
            //         if (element.id_color == line_product.id_color) {
            //             inner_color +=
            //                 ` <div id="` +
            //                 element.id_color +
            //                 `" class="cart_color" style="border-color: red;background-color: ` +
            //                 element.id_color +
            //                 `;"></div>`;
            //         } else {
            //             inner_color +=
            //                 ` <div id="` +
            //                 line_product.id_product +
            //                 "-" +
            //                 element.id_size +
            //                 "-" +
            //                 element.id_color +
            //                 `" class="cart_color"></div>`;
            //         }
            // }
            //   sizeP[i].forEach((element) => {
            //     if (element.id == currentUser.cart[i].idSize) {
            //       inner_size +=
            //         ` <div class="size" style="border-color: red;">
            //                ` +
            //         element.name +
            //         `
            //                         </div>`;
            //     } else {
            //       inner_size +=
            //         ` <div class="size">
            //                ` +
            //         element.name +
            //         `
            //                         </div>`;
            //     }
            //   });
            //   let pr = 0;
            //   prInStock.forEach((e) => {
            //     if (
            //       currentUser.cart[i].idProd == e.idProd &&
            //       currentUser.cart[i].idSize == e.idSize
            //     ) {
            //       pr = e.amount;
            //     }
            //   });
            //   if (pr == 0) {
            //     currentUser.cart[i].amount = 0;
            //     currentUser.cart[i].price = 0;
            //     localStorage.setItem("data", JSON.stringify(data));
            //   }

            document.getElementsByClassName("table-giohang")[0].innerHTML +=
                `<tr>
                    <td>
                        <img src="admin/Image/` +
                data_response[i].link_image +
                `" alt="">
                    </td>
                    <td>
                        <div>
                            ` +
                data_response[i].name +
                `
                        </div>
                    </td>
                    <td>
                        <del class="del_cart" id="del_cart_` +
                product.id_product +
                `">
                        </del>
                        <div id="div_cart_` +
                product.id_product +
                `">             </div>
                    </td>
                    <td>
                        <div>
                            <div class="chon-soluong">
                                <div class="giam">
                                    -
                                </div>
                                <div class="hien-sl">
                                    ` +
                data_response[i].amount +
                `
                                </div>
                                <div class="tang">
                                    +
                                </div>
                            </div>
                            <div style="color: gray;
                                padding: 5px;
                                line-height: 1.5;
                                font-size: 10px">
                                có  <span id='cart_product_instock'>` +
                data_response[i].amount_in_stock +
                ` </span>sản phẩm có sẵn
                            </div>
                        </div>
                    </td>
                    <td>
                    <div id='chon_size` +
                product.id_product +
                `' class="chon-size">` +
                inner_size +
                `</div>
                    </td>
                    <td>
                    <div id='chon_mau` +
                product.id_product +
                `' class="chon-mau">` +
                inner_color +
                `</div>
                    </td>
                    <td >
                        <del class="del_cart" id="del_total_` +
                product.id_product +
                `">
                        </del>
                        <div id="div_total_` +
                product.id_product +
                `" class="ton-tien">
                        ` +
                calculated(data_response[i].price) +
                ` VND
                        </div>
                    </td>
                    <td style="    text-align: center;
                                    display: flex;
                                    justify-content: space-evenly;
                                    flex-direction: column;">
                       
                        <label for="checkbox_` +
                product.id_product +
                `" class="checkbox-label">Chọn</label>
                        <input id="checkbox_` +
                product.id_product +
                `" class="checkboxIncart" type="checkbox" name="" id="">
                    </td>
                </tr>`;
        }

        sukien(data_response);
    } else {
        alert("Giỏ hàng đang trống");
    }
}
function update_cart() {
    getDataFromServer(
        "./Server/update_cart.php",
        {
            id_customer: currentUser.id,
            product_in_cart: product_in_cart,
        },
        function (respone) {
            console.log(respone);
        }
    );
}
document.getElementById("hienthigiohang").onclick = function (e) {
    if (e.target.matches("#hienthigiohang")) {
        update_cart();
        showacc(document.getElementById("tranggiohang"), 0, 1200);
        setTimeout(() => {
            document.getElementById("tongthanhtoan").innerHTML = 0;
            document.getElementsByClassName("table-giohang")[0].innerHTML = "";
            document.getElementById("hienthigiohang").style.display = "";
        }, 400);
    }
};
function inner(attribute, id_product, id_size, id_color, index) {
    let str = "";
    let arr = new Array();
    if (index == "color") {
        for (let i = 0; i < attribute.length; i++) {
            if (
                arr.indexOf(attribute[i].id_color) == -1 &&
                attribute[i].id_size == id_size
            ) {
                if (attribute[i].id_color == id_color) {
                    str +=
                        `<div id="` +
                        id_product +
                        "-" +
                        attribute[i].id_size +
                        "-" +
                        attribute[i].id_color +
                        `" class="cart_color" style="border-color: red;background-color: ` +
                        attribute[i].id_color +
                        `;"></div>`;
                } else {
                    str +=
                        ` <div id="` +
                        id_product +
                        "-" +
                        attribute[i].id_size +
                        "-" +
                        attribute[i].id_color +
                        `" class="cart_color" style="background-color: ` +
                        attribute[i].id_color +
                        `"></div>`;
                }
                arr.push(attribute[i].id_color);
            }
        }
    } else {
        for (let i = 0; i < attribute.length; i++) {
            if (
                arr.indexOf(attribute[i].id_size) == -1 &&
                attribute[i].id_color == id_color
            ) {
                if (attribute[i].id_size == id_size) {
                    str +=
                        ` <div id="` +
                        id_product +
                        "-" +
                        attribute[i].id_size +
                        "-" +
                        attribute[i].id_color +
                        `" class="size" style="border-color: red;">
                         ` +
                        attribute[i].id_size.substring(2) +
                        `
                                  </div>`;
                } else {
                    str +=
                        ` <div id="` +
                        id_product +
                        "-" +
                        attribute[i].id_size +
                        "-" +
                        attribute[i].id_color +
                        `" class="size">
                         ` +
                        attribute[i].id_size.substring(2) +
                        `
                                  </div>`;
                }
                arr.push(attribute[i].id_size);
            }
        }
    }
    return str;
}
