function writeToLocalStorage(ar) {
    let setlocal = JSON.stringify(ar)
    localStorage.setItem("data", setlocal)
    obj10 = JSON.parse(localStorage.getItem("data"))
    length11 = obj10.promote.length
    length21 = obj10.product.length
}


let obj10 = JSON.parse(localStorage.getItem("data"))
let length11 = obj10.promote.length
let length21 = obj10.product.length

function Themkhuyenmai() {
    document.getElementById("PageUp").innerHTML = `
   <div id="KhuyenMai-Background" >
         <div id="KhuyenMai" style="border-radius: 10px;">
            <div class="KhuyenMai3" >
               <div class="Div1">Thêm khuyến mãi</div>
               <div class="Div2">ID <input id="id" type="text" readonly></div>
               <div class="Div3">
                  tên khuyến mãi <input id="tenkhuyenmai" class="TenKhuyenMaiInput" type="text">
                  giá giảm <input id="giamgia" class="GiaGiamInput" type="text">
               </div>
               <div class="Div4">
                  <p>các sản phẩm</p> 
                  <div class="Div4Left">
                     <div id="list-prod"></div>
                     <button class="ThemSanPhamButton" onclick=themsanpham()>Thêm Sản Phẩm</button>
                  </div>
                  <div class="div4right">
                     giảm(%)
                     <input id="phantramgiam" type="text">
                  </div>
               </div>
               <div class="Div5">
                    <div class="Div5Left">
                         <div>
                            <label for="">bắt đầu</label>
                            <input type="date" id="batdau" name="birthday">
                        </div>
                    </div>
                    <div class="Div5Right">
                        <div>
                           <label for="">kết thúc</label>
                           <input type="date" id="ketthuc" name="birthday">
                        </div>
                     </div>
               </div>
               <div class="Div6">
                  nội dung <input id="noidung" type="text">
               </div>
               <div class="Div7" style="margin-top: -20px;">
                  <button onclick="themkhuyenmai()">Thêm khuyến mãi</button>
               </div>
               </div>
         </div>
      </div>
      `
    let UnDo = document.getElementById("KhuyenMai-Background");
    UnDo.onclick = function(clk) {
            if (clk.target.matches("#KhuyenMai-Background")) {
                UnDo.remove();
                arr1.splice(0, arr1.length)
            }
        }
        // document.getElementById("choose-img").onclick = function() {
        //     console.log("click")
        //     document.getElementById("btnaddimg").click()
        // }
}
let arr1 = []
    // Thêm sản phẩm
function themsanpham() {
    let UnDo = document.getElementById("popup");
    UnDo.style.display = `flex`;
    UnDo.onclick = function(clk) {
        if (clk.target.matches("#popup")) {
            UnDo.style.display = `none`;
            document.getElementById("idprod").value = ""
        }
    }
    document.getElementById("btn-xacnhan").onclick = function() {
        let type = document.getElementById("idprod").value.toLowerCase()
        if (type == "" || CheckTagType(type, arr1) >= 0 || !CheckIDPro(type)) {
            alert("ID không hợp lệ")
        } else {
            let div = document.getElementById("list-prod")
            let ele = document.createElement("div")
            ele.classList.add("div-pro")
            ele.appendChild(document.createTextNode(type))
            div.appendChild(ele)
            let tag = document.createElement("button")
            tag.classList.add("close_type")
            tag.appendChild(document.createTextNode("X"))
            ele.appendChild(tag)
            arr1.push(type)
            tag.onclick = function() {
                arr1.splice(CheckTagType(type, arr1), 1);
                ele.remove();
            }
            document.getElementById("idprod").value = ""
            UnDo.style.display = `none`;
        }

    }
}

function CheckIDPro(id) {
    for (var i = 0; i < length21; i++) {
        if (obj10.product[i].id.toLowerCase() == id) {
            return true
        }
    }
    return false
}

function CheckTagType(type, a) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] == type) {
            return i;
        }
    }
    return -1;
}


// Sửa sản phẩm
let arr2 = []

function suasanpham() {
    let UnDo = document.getElementById("popup2");
    UnDo.style.display = `flex`;
    UnDo.onclick = function(clk) {
        if (clk.target.matches("#popup2")) {
            UnDo.style.display = `none`;
            document.getElementById("idprod2").value = ""
        }
    }
    document.getElementById("btn-xacnhan2").onclick = function() {
        let type = document.getElementById("idprod2").value.toLowerCase()
        if (type == "" || CheckTagType(type, arr2) >= 0 || !CheckIDPro(type)) {
            alert("ID không hợp lệ")
        } else {
            let div = document.getElementById("list-prod")
            let ele = document.createElement("div")
            ele.classList.add("div-pro")
            ele.appendChild(document.createTextNode(type))
            div.appendChild(ele)
            let tag = document.createElement("button")
            tag.classList.add("close_type")
            tag.appendChild(document.createTextNode("X"))
            ele.appendChild(tag)
            arr2.push(type)
            tag.onclick = function() {
                arr2.splice(CheckTagType(type, arr2), 1);
                ele.remove();
            }
            document.getElementById("idprod2").value = ""
            UnDo.style.display = `none`;
        }

    }
}



// Thêm khuyến mãi
function themkhuyenmai() {
    let id = `SALE000` + length11;
    let ten = document.getElementById("tenkhuyenmai").value;
    let giamgia = document.getElementById("giamgia").value;
    let phantramgiam = document.getElementById("phantramgiam").value;
    let batdau = getDate(document.getElementById("batdau").value)
    let ketthuc = getDate(document.getElementById("ketthuc").value)
    let noidung = document.getElementById("noidung").value;

    if (ten == "" || giamgia == "" || phantramgiam == "" || document.getElementById("batdau").value == "" ||
        document.getElementById("ketthuc").value == " ") {
        alert("Hãy nhập đủ thông tin")
    } else {
        if (checkNumber(giamgia)) {
            if (checkNumber(phantramgiam)) {
                if (batdau > getCurrentDate().split(" ")[0]) {
                    if (batdau < ketthuc) {
                        let obj10KM = {
                            id: id,
                            name: ten.toLowerCase(),
                            content: noidung,
                            date_begin: batdau,
                            date_end: ketthuc,
                            image: "",
                            products: [],
                            discount_percent: phantramgiam,
                            discount_price: giamgia
                        };
                        obj10.promote.push(obj10KM);
                        length11 = obj10.promote.length
                        // writeToLocalStorage(obj10)
                        x = FindID9(id)
                        for (var i = 0; i < arr1.length; i++) {
                            let idsp = { id: arr1[i] }
                            obj10.promote[x].products.push(idsp.toUperCase())
                        }
                        arr1.splice(0, arr1.length)
                        writeToLocalStorage(obj10)
                        document.getElementById("KhuyenMai-Background").remove()
                        renderTable2()
                    } else {
                        alert("Ngày bắt đầu không được sau ngày kết thúc")
                    }
                } else {
                    alert("Ngày bắt đầu phải sau ngày hiện tại")
                }

            } else {
                alert("Phần trăm giảm chưa đúng định dạng")
            }
        } else {
            alert("Giá tiền chưa đúng định dạng")
        }
    }

}

function FindID9(id) {
    for (let i = 0; i < length11; i++) {
        if (obj10.promote[i].id.toLowerCase() == id.toLowerCase()) {
            return i
        }
    }
}

// Fill bảng
function renderTable2() {
    document.getElementById("headkm2").style.display = "none"
    document.getElementById("headkm").style.display = "flex"
    let table = document.getElementById("myTable31");
    for (let i = table.rows.length - 1; i > 0; i--)
        table.deleteRow(i);
    for (let i = 0; i < length11; i++) {
        let obj100 = obj10.promote[i];
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        let cell4 = row.insertCell(4);
        let cell5 = row.insertCell(5);
        let cell6 = row.insertCell(6);
        let cell7 = row.insertCell(7);

        cell0.innerHTML = obj100.id
        cell1.innerHTML = obj100.name;
        cell2.innerHTML = obj100.content;
        cell3.innerHTML = obj100.date_begin;
        cell4.innerHTML = obj100.date_end;
        cell5.innerHTML = `<p class="detail" onclick=OpenDetail(` + i + `)> Chi tiết</p>`
        cell6.innerHTML = obj100.discount_percent + `%`;
        cell7.innerHTML = calculated(obj100.discount_price) + " VND";
    }
}

// sửa khuyến mãi
function suakhuyenmai() {
    document.getElementById("headkm2").style.display = "block"
    document.getElementById("headkm").style.display = "none"
    let table = document.getElementById("myTable31");
    for (let i = table.rows.length - 1; i > 0; i--)
        table.deleteRow(i);
    for (let i = 0; i < length11; i++) {
        let obj100 = obj10.promote[i];
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        let cell4 = row.insertCell(4);
        let cell5 = row.insertCell(5);
        let cell6 = row.insertCell(6);
        let cell7 = row.insertCell(7);
        let cell8 = row.insertCell(8);

        cell0.innerHTML = obj100.id
        cell1.innerHTML = obj100.name;
        cell2.innerHTML = obj100.content;
        cell3.innerHTML = obj100.date_begin;
        cell4.innerHTML = obj100.date_end;
        cell5.innerHTML = `<p class="detail" onclick=OpenDetail(` + i + `)> Chi tiết</p>`
        cell6.innerHTML = obj100.discount_percent + `%`;
        cell7.innerHTML = calculated(obj100.discount_price) + " VND";
        cell8.innerHTML = "<button onclick='sua(" + i + ")'>sửa</button>";
    }
}

function sua(x) {
    document.getElementById("PageUp").innerHTML = `
      <div id="KhuyenMai-Background" >
            <div id="KhuyenMai" style="border-radius: 10px;">
               <div class="KhuyenMai3" >
                  <div class="Div1">Sửa khuyến mãi</div>
                  <div class="Div2">ID <input id="id" type="text" readonly></div>
                  <div class="Div3">
                     tên khuyến mãi <input id="tenkhuyenmai" class="TenKhuyenMaiInput" type="text">
                     giá giảm <input id="giamgia" class="GiaGiamInput" type="text">
                  </div>
                  <div class="Div4">
                  <p>các sản phẩm</p> 
                  <div class="Div4Left">
                     <div id="list-prod"></div>
                     <button class="ThemSanPhamButton" onclick=suasanpham()>Thêm Sản Phẩm</button>
                  </div>
                  <div class="div4right">
                     giảm(%)
                     <input id="phantramgiam" type="text">
                  </div>
               </div>
               <div class="Div5">
                    <div class="Div5Left">
                         <div>
                            <label for="">bắt đầu</label>
                            <input type="date" id="batdau" name="birthday">
                        </div>
                    </div>
                    <div class="Div5Right">
                        <div>
                           <label for="">kết thúc</label>
                           <input type="date" id="ketthuc" name="birthday">
                        </div>
                     </div>
               </div>
                  <div class="Div6">
                     nội dung <input id="noidung" type="text">
                  </div>
                  <div class="Div7" style="margin-top: -20px;">
                     <button onclick="capnhat(` + x + `)">sửa khuyến mãi</button>
                  </div>
                  </div>
            </div>
         </div>
         `
    let UnDo = document.getElementById("KhuyenMai-Background");
    UnDo.onclick = function(clk) {
        if (clk.target.matches("#KhuyenMai-Background")) {
            UnDo.remove();
            arr2.splice(0, arr2.length)
        }
    }
    document.getElementById("id").value = obj10.promote[x].id
    document.getElementById("tenkhuyenmai").value = obj10.promote[x].name;
    document.getElementById("giamgia").value = obj10.promote[x].discount_price;
    document.getElementById("phantramgiam").value = obj10.promote[x].discount_percent;
    document.getElementById("batdau").value = setDate(obj10.promote[x].date_begin)
    document.getElementById("ketthuc").value = setDate(obj10.promote[x].date_end)
    document.getElementById("noidung").value = obj10.promote[x].content;
    ThemSPSua(x);
}

function ThemSPSua(x) {
    for (let i = 0; i < obj10.promote[x].products.length; i++) {
        let type = obj10.promote[x].products[i].id.toLowerCase()
        let div = document.getElementById("list-prod")
        let ele = document.createElement("div")
        ele.classList.add("div-pro")
        ele.appendChild(document.createTextNode(type))
        div.appendChild(ele)
        let tag = document.createElement("button")
        tag.classList.add("close_type")
        tag.appendChild(document.createTextNode("X"))
        ele.appendChild(tag)
        arr2.push(type)
        tag.onclick = function() {
            arr2.splice(CheckTagType(type, arr2), 1);
            ele.remove();
        }
    }
}


//format ngày tháng năm
function setDate(date) {
    let newdate = date.split("/")[2] + "-" + date.split("/")[1] + "-" + date.split("/")[0]
    return newdate
}

function getDate(date) {
    let newdate = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]
    return newdate
}
//


function capnhat(x) {
    let table = document.getElementById("myTable31");
    let ten = document.getElementById("tenkhuyenmai").value;
    let giamgia = document.getElementById("giamgia").value;
    let phantramgiam = document.getElementById("phantramgiam").value;
    let batdau = document.getElementById("batdau").value
    let ketthuc = document.getElementById("ketthuc").value
    let noidung = document.getElementById("noidung").value;
    if (ten == "" || giamgia == "" || phantramgiam == "" || batdau == "" ||
        ketthuc == " ") {
        alert("Hãy cập nhập đủ thông tin")
    } else {
        if (checkNumber(giamgia)) {
            if (checkNumber(phantramgiam)) {
                if (batdau > getCurrentDate().split(" ")[0]) {
                    if (batdau < ketthuc) {
                        obj10.promote[x].name = ten
                        obj10.promote[x].discount_price = giamgia
                        obj10.promote[x].discount_percent = phantramgiam
                        obj10.promote[x].date_begin = getDate(batdau)
                        obj10.promote[x].date_end = getDate(ketthuc)
                        obj10.promote[x].content = noidung
                        obj10.promote[x].products.splice(0, obj10.promote[x].products.length)
                        for (var i = 0; i < arr2.length; i++) {
                            let id = { id: arr2[i] }
                            obj10.promote[x].products.push(id)
                        }
                        writeToLocalStorage(obj10)
                        for (let i = table.rows.length - 1; i > 0; i--)
                            table.deleteRow(i);
                        for (let i = 0; i < length11; i++) {
                            let obj100 = obj10.promote[i];
                            let row = table.insertRow();
                            let cell0 = row.insertCell(0);
                            let cell1 = row.insertCell(1);
                            let cell2 = row.insertCell(2);
                            let cell3 = row.insertCell(3);
                            let cell4 = row.insertCell(4);
                            let cell6 = row.insertCell(5);
                            let cell7 = row.insertCell(6);
                            let cell8 = row.insertCell(7);
                            let cell9 = row.insertCell(8);
                            cell0.innerHTML = obj100.id
                            cell1.innerHTML = obj100.name;
                            cell2.innerHTML = obj100.content;
                            cell3.innerHTML = obj100.date_begin;
                            cell4.innerHTML = obj100.date_end;
                            cell6.innerHTML = `<p class="detail" onclick=OpenDetail(` + i + `)> Chi tiết</p>`
                            cell7.innerHTML = obj100.discount_percent + `%`;
                            cell8.innerHTML = calculated(obj100.discount_price) + " VND";
                            cell9.innerHTML = "<button onclick='sua(" + i + ")'>sửa</button>";
                        }
                        document.getElementById("KhuyenMai-Background").remove();
                        arr2.splice(0, arr2.length)
                    } else {
                        alert("Ngày bắt đầu không được sau ngày kết thúc")
                    }
                } else {
                    alert("Ngày bắt đầu phải sau ngày hiện tại")
                }
            } else {
                alert("Phần trăm giảm chưa đúng định dạng")
            }
        } else {
            alert("Giá tiền chưa đúng định dạng")
        }
    }

}

//Danh sách áp dụng

function OpenDetail(x) {
    let UnDo = document.getElementById("dialog5");
    UnDo.style.display = `flex`;
    UnDo.onclick = function(clk) {
        if (clk.target.matches("#dialog5")) {
            UnDo.style.display = `none`;
        }
    }
    let table = document.getElementById("list-table")
    for (let i = table.rows.length - 1; i > 0; i--)
        table.deleteRow(i);
    for (let i = 0; i < obj10.promote[x].products.length; i++) {
        let id = obj10.promote[x].products[i].id.toLowerCase()
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        cell0.innerHTML = id
        cell1.innerHTML = GetName(id)
        cell2.innerHTML = GetMade(id)
        cell3.innerHTML = GetClasify(id)
    }
}


function GetName(id) {
    for (var i = 0; i < length21; i++) {
        if (obj10.product[i].id.toLowerCase() == id) {
            return obj10.product[i].name
        }
    }
}

function GetMade(id) {
    for (var i = 0; i < length21; i++) {
        if (obj10.product[i].id.toLowerCase() == id) {
            return obj10.product[i].made_in
        }
    }
}

function GetClasify(id) {
    for (var i = 0; i < length21; i++) {
        if (obj10.product[i].id.toLowerCase() == id) {
            return obj10.product[i].clasify
        }
    }
}

// thêm ảnh
let imgLinkChange = ""
renderTable2()
    // document.getElementById("btnaddimg").onclick = function() {
    //     let chooseImg = document.getElementById("btnaddimg")
    //     console.log("./Image/avt/" + chooseImg.value.replace("C:\\fakepath\\", ""))
    //     imgLinkChange = `./Image/avt/` + chooseImg.value.replace("C:\\fakepath\\", "")
    //     document.getElementById("img-current-customer").src = `./Image/avt/` + chooseImg.value.replace("C:\\fakepath\\", "")
    // }


document.getElementById("SuaKhuyenMai")