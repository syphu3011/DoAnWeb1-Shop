let pro = new Array();
let sizeP = new Array();
let prInStock = new Array();
let KM = new Array();

function getPro(id) {
  for (let i = 0; i < data.product.length; i++) {
    if (data.product[i].id == id) {
      pro.push(data.product[i]);
    }
  }
}

function getSize(idSize) {
  if (idSize == "") {
    sizeP.push(null);
    return;
  }
  let siz = new Array();
  for (let i = 0; i < data.size.length; i++) {
    if (data.size[i].id.indexOf(idSize[0]) != -1) {
      siz.push(data.size[i]);
    }
  }
  sizeP.push(siz);
}

function getSizeP(idProd) {
  for (let i = 0; i < data.size.length; i++) {
    if (data.size[i].id.indexOf(idProd[0]) != -1) {
      sizeP.push(data.size[i]);
    }
  }
}

function getProInStock(idProd) {
  data.prodInStock.forEach((e) => {
    if (e.idProd == idProd) {
      prInStock.push(e);
    }
  });
}

function getKM(idProd) {
  data.promote.forEach((element) => {
    element.products.forEach((e) => {
      if (e.id == idProd) {
        KM.push(new km(e.id, element.discount_percent, element.discount_price));
      }
    });
  });
}

function tinhtongtien(count, id, cost) {
  for (let i = 0; i < KM.length; i++) {
    if (KM[i].idProd == id) {
      return (
        (parseInt(cost) -
          (parseInt(cost) * parseInt(KM[i].discount_percent)) / 100 -
          parseInt(KM[i].discount_price)) *
        count
      );
    }
  }
  return parseInt(cost) * count;
}

function checkConHang(list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < prInStock.length; j++) {
      if (
        list[i].idProd == prInStock[j].idProd &&
        list[i].idSize == prInStock[j].idSize &&
        prInStock[j].amount == 0
      ) {
        return false;
      }
    }
  }
  return true;
}

function sukien() {
  let tongtien = 0;
  let btnXoa = document.getElementsByClassName("xoa-sp");
  for (let i = 0; i < btnXoa.length; i++) {
    btnXoa[i].onclick = function () {
      while (
        document.getElementsByClassName("table-giohang")[0].rows.length > 0
      ) {
        document.getElementsByClassName("table-giohang")[0].deleteRow(0);
      }
      // console.log(pro[i])
      currentUser.cart.splice(i, 1);
      localStorage.setItem("data", JSON.stringify(data));
      document.getElementById("hienthigiohang").style.display = "";
      document.getElementById("noti").style.display = "flex";
      document.getElementById("noti-noti").innerHTML = "đã xoá Thành công";
      showacc(document.getElementById("noti-noti"), -500, 0);
      document.getElementById("noti-noti").style.display = "flex";
      setTimeout(() => {
        document.getElementById("noti").style.display = "";
        tongtien = 0;
        document.getElementById("tongthanhtoan").textContent =
          calculated(tongtien) + " VND";
        createCart();
      }, 700);
      // document.getElementsByClassName("table-giohang")[0].deleteRow(i)
    };
  }
  let btnCheckBox = document.getElementsByClassName("checkboxIncart");
  for (let i = 0; i < btnCheckBox.length; i++) {
    btnCheckBox[i].onclick = function () {
      if (btnCheckBox[i].checked) {
        console.log(currentUser.cart[i].price);
        tongtien += currentUser.cart[i].amount * pro[i].price;
      } else {
        console.log(currentUser.cart[i].price);
        tongtien -= currentUser.cart[i].amount * pro[i].price;
      }
      document.getElementById("tongthanhtoan").textContent =
        calculated(tongtien) + " VND";
    };
  }
  document.getElementById("nut-thanhtoan").onclick = function () {
    let isCheck = new Array();
    for (let i = 0; i < btnCheckBox.length; i++) {
      if (btnCheckBox[i].checked) {
        isCheck.push(currentUser.cart[i]);
      }
    }
    if (isCheck.length == 0) {
      alert("Vui lòng chọn sản phẩm thanh toán");
    } else {
      // checkConHang(isCheck)
      if (checkConHang(isCheck)) {
        showacc(document.getElementById("tranggiohang"), 0, 1200);
        setTimeout(() => {
          while (
            document.getElementsByClassName("table-giohang")[0].rows.length > 0
          ) {
            document.getElementsByClassName("table-giohang")[0].deleteRow(0);
          }
          document.getElementById("hienthigiohang").style.display = "";
          ttGioHang(isCheck);
          setTimeout(() => {
            tongtien = 0;
            document.getElementById("tongthanhtoan").textContent =
              calculated(tongtien) + " VND";
            document.getElementById("thanh-toan").style.display = "flex";
            showacc(document.getElementById("div-thanhtoan"), -500, 0);
          }, 400);
        }, 400);
      } else {
        alert("Sản phẩm đã hết hàng");
      }
    }
  };
  // let doiSize = document.getElementsByClassName("size")
  let proSize = document.getElementsByClassName("chon-size");
  for (let i = 0; i < proSize.length; i++) {
    if (proSize[i].textContent.length != 0) {
      for (
        let j = 0;
        j < proSize[i].getElementsByClassName("size").length;
        j++
      ) {
        // console.log(i, j)

        proSize[i].getElementsByClassName("size")[j].onclick = function () {
          let ind = false;
          prInStock.forEach((el) => {
            if (
              el.idSize == sizeP[i][j].id &&
              el.idProd == currentUser.cart[i].idProd &&
              parseInt(el.amount) > 0
            ) {
              // console.log("1")
              ind = true;
            }
          });
          if (ind) {
            if (currentUser.cart[i].amount == 0) {
              currentUser.cart[i].amount = 1;
              currentUser.cart[i].price = pro[i].price;
            }
            currentUser.cart[i].idSize = sizeP[i][j].id;
            // localStorage.setItem("data", JSON.stringify(data))
            while (
              document.getElementsByClassName("table-giohang")[0].rows.length >
              0
            ) {
              document.getElementsByClassName("table-giohang")[0].deleteRow(0);
            }
            localStorage.setItem("data", JSON.stringify(data));
            document.getElementById("hienthigiohang").style.display = "";
            document.getElementById("noti").style.display = "flex";
            document.getElementById("noti-noti").innerHTML =
              "cập nhật giỏ hàng Thành công";
            showacc(document.getElementById("noti-noti"), -500, 0);
            document.getElementById("noti-noti").style.display = "flex";
            setTimeout(() => {
              document.getElementById("noti").style.display = "";
              tongtien = 0;
              document.getElementById("tongthanhtoan").textContent =
                calculated(tongtien) + " VND";
              createCart();
            }, 700);
          } else {
            alert("Số lượng sản phẩm không khả dụng");
          }
        };
      }
    }
  }
  let btnGiam = document.getElementsByClassName("giam");
  for (let i = 0; i < btnGiam.length; i++) {
    btnGiam[i].onclick = function () {
      if (currentUser.cart[i].amount != 0) {
        if (currentUser.cart[i].amount > 1) {
          currentUser.cart[i].amount--;
          currentUser.cart[i].price = tinhtongtien(
            currentUser.cart[i].amount,
            currentUser.cart[i].idProd,
            pro[i].price
          );
          document.getElementsByClassName("hien-sl")[i].textContent =
            currentUser.cart[i].amount;
          if (btnCheckBox[i].checked) {
            tongtien -= pro[i].price;
          }
          document.getElementsByClassName("ton-tien")[i].textContent =
            calculated(currentUser.cart[i].price) + " VND";
          document.getElementById("tongthanhtoan").textContent =
            calculated(tongtien) + " VND";
        } else {
          alert("Đã đạt số lượng tối thiểu");
        }
        currentUser.cart[i].amount.toString();
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        alert("Sản phẩm đã hết hàng");
      }
    };
  }
  let btnTang = document.getElementsByClassName("tang");
  for (let i = 0; i < btnTang.length; i++) {
    btnTang[i].onclick = function () {
      if (currentUser.cart[i].amount != 0) {
        if (
          parseInt(currentUser.cart[i].amount) < parseInt(prInStock[i].amount)
        ) {
          currentUser.cart[i].amount++;
          currentUser.cart[i].price = tinhtongtien(
            currentUser.cart[i].amount,
            currentUser.cart[i].idProd,
            pro[i].price
          );
          document.getElementsByClassName("ton-tien")[i].textContent =
            calculated(currentUser.cart[i].price) + " VND";
          document.getElementsByClassName("hien-sl")[i].textContent =
            currentUser.cart[i].amount;
          if (btnCheckBox[i].checked) {
            tongtien += pro[i].price;
          }
          document.getElementById("tongthanhtoan").textContent =
            calculated(tongtien) + " VND";
        } else {
          alert("Đã đạt số lượng tối đa");
        }
        currentUser.cart[i].amount.toString();
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        alert("Sản phẩm đã hết hàng");
      }
    };
  }
}
btncart.onclick = function () {
  if (currentUser != null) {
    getDataFromServer(
      "./Server/get_cart_byID.php",
      { idkh: currentUser.id },
      function (respone) {
        createCart(respone.data.product);
        console.log(respone);
      }
    );
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
function createCart(data_respone) {
  //   console.log(data_respone);

  if (data_respone.length > 0) {
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
    // console.log(prInStock);
    showacc(document.getElementById("tranggiohang"), -500, 0);
    // setTimeout(() => {
    document.getElementById("hienthigiohang").style.display = "flex";
    // }, 400);
    for (let i = 0; i < data_respone.length; i++) {
      //   let s = "Image/SANPHAM/" + pro[i].images[0];
      let str = "";
      if (sizeP[i] != null) {
        sizeP[i].forEach((element) => {
          if (element.id == currentUser.cart[i].idSize) {
            str +=
              ` <div class="size" style="border-color: red;">
                   ` +
              element.name +
              `
                            </div>`;
          } else {
            str +=
              ` <div class="size">
                   ` +
              element.name +
              `
                            </div>`;
          }
        });
      }
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
                        <img src="` +
        data_respone[i].link_image +
        `" alt="">
                    </td>
                    <td>
                        <div>
                            ` +
        data_respone[i].name +
        `
                        </div>
                    </td>
                    <td>
                        <div>
                            ` +
        calculated(data_respone[i].price) +
        ` VND
                        </div>
                    </td>
                    <td>
                        <div>
                            <div class="chon-soluong">
                                <div class="giam">
                                    -
                                </div>
                                <div class="hien-sl">
                                    ` +
        data_respone[i].amount +
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
                                có  <span>` +
        data_respone[i].amount_in_stock +
        ` </span>sản phẩm có sẵn
                            </div>
                        </div>
                    </td>
                    <td>
                    <div class="chon-size">` +
        str +
        `</div>
                    </td>
                    <td class="ton-tien">
                        ` +
        calculated(data_respone[i].price) +
        ` VND
                    </td>
                    <td>
                        <div class="xoa-sp">
                            Xoá
                        </div>
                        <input class="checkboxIncart" type="checkbox" name="" id="">
                    </td>
                </tr>`;
    }
    sukien();
  } else {
    alert("Giỏ hàng đang trống");
  }
}
document.getElementById("hienthigiohang").onclick = function (e) {
  if (e.target.matches("#hienthigiohang")) {
    showacc(document.getElementById("tranggiohang"), 0, 1200);
    setTimeout(() => {
      while (
        document.getElementsByClassName("table-giohang")[0].rows.length > 0
      ) {
        document.getElementsByClassName("table-giohang")[0].deleteRow(0);
      }
      document.getElementById("hienthigiohang").style.display = "";
    }, 400);
  }
};
