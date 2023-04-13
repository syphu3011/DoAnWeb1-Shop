function getDataFromServer(url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        callback(response);
      } else {
        console.error("Error:", xhr.status);
      }
    }
  };
  xhr.send(JSON.stringify(data));
}

document.getElementById("ls-dh").onclick = function () {
  var data_to_send = { id_customer: currentUser.id };
  getDataFromServer(
    "./Server/get_receipt.php",
    data_to_send,
    function (response) {
      if (response.success) {
        // xử lý dữ liệu ở đây
        data_respone = response.data;
        show_receipt(data_respone);
      } else {
        // xử lý lỗi ở đây
        console.log(response.error);
      }
    }
  );
};
function show_receipt(data_respone) {
  document.getElementById("bang-lsmh").innerHTML = "";
  document.getElementById("show-user").style.display = "";
  document.getElementById("ten-kh").innerHTML =
    "Khách hàng: " + currentUser.name;
  let receipt = data_respone.receipt;
  for (let i = 0; i < receipt.length; i++) {
    //
    let element = receipt[i];
    console.log(element);
    let ngayXN = "Chưa xác nhận";
    if (element.date_confirm != "") {
      ngayXN = element.date_confirm;
    }
    // element.list_prod.forEach((e) => {
    //   trigia += parseInt(e.price);
    // });
    document.getElementById("bang-lsmh").innerHTML +=
      `<td class="maDH">` +
      element.id +
      `</td>
    <td>
        ` +
      element.name_status +
      `
    </td>
    <td>
        ` +
      calculated(element.Tong) +
      ` VND
    </td>
    <td>
        ` +
      element.address +
      `
    </td>
    <td>
        ` +
      element.date_init +
      `
    </td>
    <td>
        ` +
      ngayXN +
      `
    </td>`;
  }

  let madh = document.getElementsByClassName("maDH");
  for (let i = 0; i < madh.length; i++) {
    madh[i].onclick = function () {
      console.log(madh[i].textContent);
      receipt.forEach((element) => {
        if (element.id.indexOf(madh[i].textContent) != -1) {
          CTDH(element);
          document.getElementById("div-ls-muahang").style.display = "";
          document.getElementById("div-ctdh").style.display = "flex";
          showacc(document.getElementById("ctdh"), -500, 0);
        }
      });
    };
  }
  if (receipt.length > 0) {
    document.getElementById("div-ls-muahang").style.display = "flex";
    showacc(document.getElementById("ls-muahang"), -500, 0);
  } else {
    setTimeout(() => {
      signup.style.display = "";
      account.style.display = "";
      document.getElementById("noti").style.display = "flex";
      document.getElementById("noti-noti").innerHTML =
        "Hiện chưa có thông tin hoá đơn";
      showacc(document.getElementById("noti-noti"), -500, 0);
      document.getElementById("noti-noti").style.display = "flex";
      setTimeout(() => {
        document.getElementById("noti").style.display = "";
      }, 1200);
    });
  }
}
function CTDH(sp) {
  console.log(sp);
  // src.length = 0
  // pro.length = 0
  document.getElementById("ctdh-dssp").innerHTML = "";
  document.getElementById("maDh").innerHTML = "Số hoá đơn: " + sp.id;
  document.getElementById("ttdh").innerHTML = "Trạng thái: " + sp.status;
  document.getElementById("ngayDh").innerHTML =
    "Ngày đơn hàng: " + sp.date_init;
  let tongdh = 0;
  for (let i = 0; i < sp.list_prod.length; i++) {
    tongdh += parseInt(sp.list_prod[i].price);
    // src.length = 0
    pro.length = 0;
    KM.length = 0;
    getKM(sp.list_prod[i].idProd);
    getPro(sp.list_prod[i].idProd);
    let tien = "";
    if (KM.length != 0) {
      tien +=
        `<del>
            ` +
        calculated(pro[0].price * sp.list_prod[i].amount) +
        `
            </del>
            <div>
                ` +
        calculated(sp.list_prod[i].price) +
        ` VND
            </div>`;
    } else {
      tien +=
        `<div>
            ` +
        calculated(sp.list_prod[i].price) +
        ` VND
        </div>`;
    }
    let sl = "Số lượng: " + sp.list_prod[i].amount;
    document.getElementById("ctdh-dssp").innerHTML +=
      `<div class="ctdh-sp">
                <div>
                    <img src="Image/SANPHAM/` +
      pro[0].images[0] +
      `" alt="">
                </div>
                <div style="display: block;">
                    <div>
                        ` +
      pro[0].name +
      `
                    </div>
                    <div style="display: flex;">
                    <div style="margin: 5px 0">
                        Giá:
                    </div> ` +
      tien +
      `
                    </div>
                <div>
                    ` +
      sl +
      `
                </div>
            </div>
        
        `;
  }
  document.getElementById("tongtrigia").innerHTML =
    "Tổng giá trị: " + calculated(tongdh) + " VND";
}
document.getElementById("div-ls-muahang").onclick = function (e) {
  if (e.target.matches("#div-ls-muahang")) {
    showacc(document.getElementById("ls-muahang"), 0, 1200);
    setTimeout(() => {
      document.getElementById("div-ls-muahang").style.display = "";
    }, 350);
  }
};
let isHide = false;
document.getElementById("div-ctdh").onclick = function (e) {
  if (e.target.matches("#div-ctdh")) {
    if (!isHide) {
      isHide = true;
      showacc(document.getElementById("ctdh"), 0, 1200);
      setTimeout(() => {
        document.getElementById("div-ctdh").style.display = "";
        document.getElementById("div-ls-muahang").style.display = "flex";
        document.getElementById("div-ctdh").style.display = "";
        isHide = false;
      }, 350);
    }
  }
};
document.getElementById("mailorphone").value = "syphu";
document.getElementById("passwd").value = "123123";
