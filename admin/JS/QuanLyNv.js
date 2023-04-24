// let staff 
var arrNhanVien


get_DataStaff();
function get_DataStaff() {
    return $.ajax({
        url: './Server/staff/staff.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          arrNhanVien = data;
          console.log(arrNhanVien);
          renderTable1();
          console.log(data);
        },
        error: function(xhr, status, error) {
          // Xử lý lỗi ở đây
          console.error(error);
        }
      });
}



document.getElementById('CapTaiKhoan-Button').onclick = function () {
    document.getElementById("NewScr").innerHTML = `
   <div id="background-color-captaikhoan">
   <div style="border-radius: 20px; padding: 20px" id="background-captaikhoan" >
      <div class="CapTaiKhoanBox" id="CapTaiKhoanBox">
         <!-- 1 -->
         <div class="Title">cấp tài khoản</div> 
         <div>
            tên nhân viên
            <input onblur="kiemtraten()" placeholder="Name" style="padding-left: 9px;" id="ten" class="Input" type="text">
            <div style="color: red; font-size: 15px; text-align: center; margin-left: -40px; margin-top: -5px;" id="name_err"></div>
         </div>
         <!-- 2 -->
         <div>
            số điện thoại
            <input onblur="kiemtransodienthoai()" placeholder="123-45-678" style="padding-left: 9px;" id="sodienthoai" class="Input" type="text">
            <div style="color: red; font-size: 15px; text-align: center; margin-left: 50px; margin-top: -5px;" id="dienthoai_err"></div>
            <div style="color: red; font-size: 15px; text-align: center; margin-left: -10px; margin-top: -10px;" id="dienthoai2_err"></div>
         </div>
         <!-- 3 -->
         <div>
            ngày sinh
            <input onblur="kiemtrangaysinh()" class="DateBox Input" type="date" id="ngaysinh" name="birthday">
            <div style="color: red; font-size: 15px; text-align: center; margin-left: 11px; margin-top: -5px;" id="ngaysinh_err"></div>
         </div>
         <!-- 4 -->
         <div>
            <labe for="">chức vụ</label>
            <select class="SelectBox Input" name="" id="chucvu">
               <option value="nhân viên">nhân viên</option>
               <option value="quản lý">quản lý</option>
            </select>
            <div style="color: red; font-size: 15px; text-align: center;" id="chucvu_err"></div>
         </div>
         <!-- 5 -->
            <div>
               <button Onclick='captaikhoan()' class="CapTKButton Input" style="margin-left: 223px;">cấp tài khoản</button>
            </div>
         </div>
   </div>
</div>
`
    let UnDo = document.getElementById("background-color-captaikhoan")
    UnDo.onclick = function (e) {
        if (e.target.matches("#background-color-captaikhoan")) {
            UnDo.remove()
        }
    }
}
var selectedNv;
var index = 0;
var selectedRow;

function getCurrentDate() {
    function formatNumber(number) {
        return number < 10 ? "0" + number : number
    }
    var today = new Date();
    var hour = formatNumber(today.getHours())
    var minute = formatNumber(today.getMinutes())
    var second = formatNumber(today.getSeconds())
    var dd = formatNumber(today.getDate())
    var mm = formatNumber(today.getMonth() + 1)
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy + " " + hour + ':' + minute + ':' + second;
    return today
}

function toDDMMYYYY(str) {
    if (str == "") return str
    let split = str.split("-")
    return split[2] + "/" + split[1] + "/" + split[0]
}

function captaikhoan() {
    let name = document.getElementById("ten").value.toLowerCase();
    let number_phone = document.getElementById("sodienthoai").value.trim();
    let birth_day = getDate(document.getElementById("ngaysinh").value)
    let chucvu = document.getElementById("chucvu").value;
    let date_init = getCurrentDate()
    let validNumPhone = true
    // for (staff of staff) {
    //     if (staff.number_phone.trim() == number_phone) {
    //         alert("Số điện thoại đã tồn tại!")
    //         return
    //     }
    // }
    if (name != "" && number_phone != "" && birth_day != "") {
        if (checkValidNameU(name, "")) {
            if (checkValidPhoneNumber(number_phone)) {
                if (checkDate(birth_day)) {
                    if (validateForm() && validNumPhone) {
                        let objNV = {
                            id: "",
                            name: name.toLowerCase(),
                            date_init: date_init,
                            username: name.toLowerCase(),
                            password: "Tomatootamot",
                            sex: "",
                            number_phone: number_phone,
                            address: "",
                            birth_day: birth_day,
                            status: "còn làm việc",
                            position: chucvu
                        };
                        arrNhanVien.push(objNV);
                        // staff = arrNhanVien
                        // writeToLocalStorage(staff)
                        resetForm();
                        renderTable1();
                        document.getElementById("background-color-captaikhoan").remove();
                    }
                } else {
                    alert("Ngày sinh không hợp lệ")
                }
            } else {
                alert("Số điện thoại chưa đúng định dạng")
            }


        } else {
            alert("Tên chưa đúng định dạng")
        }
    } else {
        alert("Vui lòng nhập đủ thông tin")
    }

}

//Chuyền format
function getDate(date) {
    let newdate = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]
    return newdate
}


function resetForm() {
    document.getElementById("ten").value = "";
    document.getElementById("sodienthoai").value = "";
    document.getElementById("ngaysinh").value = "";
    document.getElementById("chucvu").value = "";
}

function renderTable1() {
    let table = document.getElementById("myTable1");
    for (let i = table.rows.length - 1; i > 0; i--)
        table.deleteRow(i);
    for (let i = 0; i < arrNhanVien.length; i++) {
        // if (arrNhanVien[i].status.toLowerCase().includes("hết làm việc")) {

        // } else {
            if (arrNhanVien[i].status == "") arrNhanVien[i].status = "1";
            let obj = arrNhanVien[i];
            let row = table.insertRow();
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);
            let cell4 = row.insertCell(4);
            let cell5 = row.insertCell(5);
            let cell6 = row.insertCell(6);
            let cell7 = row.insertCell(7);
            let cell9 = row.insertCell(8);

            cell0.innerHTML = obj.id;
            cell1.innerHTML = obj.name;
            cell2.innerHTML = obj.username;
            cell3.innerHTML = obj.birthday;
            cell4.innerHTML = obj.phone;
            cell5.innerHTML = obj.date_init
            cell6.innerHTML = obj.position;
            cell7.innerHTML = obj.status;
            cell9.innerHTML = "<button style='font-size: 10px; margin: 1px 2px 1px 2px; border-radius: 2px;' onclick='sathai(this)'>sa thải</button>";
        // }
    }
}

function render_CheckBoxTable() {
    let table = document.getElementById("myTable1");
    for (let i = table.rows.length - 1; i > 0; i--)
        table.deleteRow(i);
    for (let i = 0; i < arrNhanVien.length; i++) {
        let obj = arrNhanVien[i];
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        let cell4 = row.insertCell(4);
        let cell5 = row.insertCell(5);
        let cell6 = row.insertCell(6);
        let cell7 = row.insertCell(7);
        let cell9 = row.insertCell(8);

        cell0.innerHTML = obj.id;
        cell1.innerHTML = obj.name;
        cell2.innerHTML = obj.username;
        cell3.innerHTML = obj.birth_day;
        cell4.innerHTML = obj.number_phone;
        cell5.innerHTML = obj.date_init
        cell6.innerHTML = obj.position;
        cell7.innerHTML = obj.status;
        cell9.innerHTML = "<input type='checkbox'>";

    }
}

function phanchucvu() {
    render_CheckBoxTable();
}

function huyphanchucvu() {
    renderTable1();
}

function huychucvu() {
    render_CheckBoxTable();
}

function huyhuychucvu() {
    renderTable1();
}

function sathai(el) {
    document.getElementById("NewScr").innerHTML = `
   <div id="background-color-captaikhoan">
   <div style="border-radius: 20px; width: 350px; height: 200px;" id="background-captaikhoan">
      <div style="display: flex;
                  flex-direction: colum;
                  text-align: center;
      " class="CapTaiKhoanBox" id="CapTaiKhoanBox">
         muốn sa thải hay không
         <div style="
                  display: flex;
                  justify-content: center;

         ">
            <button onclick="oke()" style="margin: 0px 5px 0px 5px;
                           border-radius: 5px;
                           width: 100px;
            ">có</button>
            <button onclick="nope()" style="margin: 0px 5px 0px 5px;
                           border-radius: 5px;
                           width: 100px;
            ">không</button>
         </div>
      </div>
      </div>
   </div>
`
    let UnDo = document.getElementById("background-color-captaikhoan")
    UnDo.onclick = function (e) {
        if (e.target.matches("#background-color-captaikhoan")) {
            UnDo.remove();
        }
    }
    selectedRow = el.parentElement.parentElement;
    selectedNv = selectedRow.cells[0].innerText;
    console.log(selectedNv);
}

function oke() {
    let table = document.getElementById("myTable1");
    for (let i = 0; i < arrNhanVien.length; i++) {
        if (arrNhanVien[i].id.toLowerCase() == selectedNv.toLowerCase()) {
            arrNhanVien[i].status = "hết làm việc";
            // staff = arrNhanVien
            // writeToLocalStorage(staff)
        }


    }
    renderTable1();
    document.getElementById("background-color-captaikhoan").remove();
    console.log(arrNhanVien);
}

function nope() {
    document.getElementById("background-color-captaikhoan").remove();
}

function SearchNv() {
    let table = document.getElementById("myTable1");
    let aidi = document.getElementById("SearchBar").value.toLowerCase();
    let name = document.getElementById("SearchBar").value.toLowerCase();
    let timtheo = document.getElementById("timtheo").value.toLowerCase();
    let ngsinh = document.getElementById("ngsinh").value.toLowerCase();
    let trangthai = document.getElementById("trangthai").value.toLowerCase();
    let ngaythamgia = document.getElementById("ngaythamgia").value.toLowerCase();
    let newArrNV = []
    if (trangthai == "0") {
        trangthai = "còn làm việc"
    } else if (trangthai == "1") {
        trangthai = "hết làm việc"
    }
    if (timtheo == "tatca") {
        newArrNV = arrNhanVien.filter((item) =>
            (item.id.toLowerCase().includes(aidi) ||
                item.name.toLowerCase().includes(name)) &&
            item.status.trim().toLowerCase().includes(trangthai) &&
            item.birth_day.toLowerCase().includes(toDDMMYYYY(ngsinh)) &&
            item.date_init.toLowerCase().includes(toDDMMYYYY(ngaythamgia))
        )
        for (let i = table.rows.length - 1; i > 0; i--)
            table.deleteRow(i);
        for (let i = 0; i < newArrNV.length; i++) {
            let obj = newArrNV[i];
            if (obj.status == "") continue;
            else {
                let row = table.insertRow();
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
                let cell4 = row.insertCell(4);
                let cell5 = row.insertCell(5);
                let cell6 = row.insertCell(6);
                let cell7 = row.insertCell(7);
                let cell9 = row.insertCell(8);

                cell0.innerHTML = obj.id;
                cell1.innerHTML = obj.name;
                cell2.innerHTML = obj.username;
                cell3.innerHTML = obj.birth_day;
                cell4.innerHTML = obj.number_phone;
                cell5.innerHTML = obj.date_init
                cell6.innerHTML = obj.position;
                cell7.innerHTML = obj.status;
                cell9.innerHTML = "<button style='font-size: 10px; margin: 1px 2px 1px 2px; border-radius: 2px;' onclick='sathai(this)'>sa thải</button>";
            }
        }
    }
    if (timtheo == "id") {
        newArrNV = arrNhanVien.filter((item) =>
            item.id.toLowerCase().includes(aidi) &&
            item.status.toLowerCase().includes(trangthai) &&
            item.birth_day.toLowerCase().includes(toDDMMYYYY(ngsinh)) &&
            item.date_init.toLowerCase().includes(toDDMMYYYY(ngaythamgia))
        )
        for (let i = table.rows.length - 1; i > 0; i--)
            table.deleteRow(i);
        for (let i = 0; i < newArrNV.length; i++) {
            let obj = newArrNV[i];
            if (obj.status == "0") continue;
            else {
                let row = table.insertRow();
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
                let cell4 = row.insertCell(4);
                let cell5 = row.insertCell(5);
                let cell6 = row.insertCell(6);
                let cell7 = row.insertCell(7);
                let cell9 = row.insertCell(8);

                cell0.innerHTML = obj.id;
                cell1.innerHTML = obj.name;
                cell2.innerHTML = obj.username;
                cell3.innerHTML = obj.birth_day;
                cell4.innerHTML = obj.number_phone;
                cell5.innerHTML = obj.date_init
                cell6.innerHTML = obj.position;
                cell7.innerHTML = obj.status;
                cell9.innerHTML = "<button style='font-size: 10px; margin: 1px 2px 1px 2px; border-radius: 2px;' onclick='sathai(this)'>sa thải</button>";
            }
        }
    }
    if (timtheo == "name") {
        newArrNV = arrNhanVien.filter((item) =>
            item.name.toLowerCase().includes(name) &&
            item.status.toLowerCase().includes(trangthai) &&
            item.birth_day.toLowerCase().includes(toDDMMYYYY(ngsinh)) &&
            item.date_init.toLowerCase().includes(toDDMMYYYY(ngaythamgia))
        )
        for (let i = table.rows.length - 1; i > 0; i--)
            table.deleteRow(i);
        for (let i = 0; i < newArrNV.length; i++) {
            let obj = newArrNV[i];
            if (obj.status == "0") continue;
            else {
                let row = table.insertRow();
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
                let cell4 = row.insertCell(4);
                let cell5 = row.insertCell(5);
                let cell6 = row.insertCell(6);
                let cell7 = row.insertCell(7);
                let cell9 = row.insertCell(8);

                cell0.innerHTML = obj.id;
                cell1.innerHTML = obj.name;
                cell2.innerHTML = obj.username;
                cell3.innerHTML = obj.birth_day;
                cell4.innerHTML = obj.number_phone;
                cell5.innerHTML = obj.date_init
                cell6.innerHTML = obj.position;
                cell7.innerHTML = obj.status;
                cell9.innerHTML = "<button style='font-size: 10px; margin: 1px 2px 1px 2px; border-radius: 2px;' onclick='sathai(this)'>sa thải</button>";
            }
        }
    }
}

function validateForm() {
    let result = true;
    let ten = document.getElementById("ten").value;
    let sodienthoai = document.getElementById("sodienthoai").value;
    let ngaysinh = document.getElementById("ngaysinh").value;
    if (ten == "") {
        document.getElementById("name_err").innerHTML = "chưa nhập tên";
        result = false;
    } else document.getElementById("name_err").innerHTML = "";
    if (sodienthoai == "") {
        document.getElementById("dienthoai_err").innerHTML = "chưa nhập số điện thoại";
        result = false;
    } else document.getElementById("dienthoai_err").innerHTML = "";
    if (isNaN(sodienthoai)) {
        document.getElementById("dienthoai2_err").innerHTML = "vui lòng nhập số";
        result = false;
    } else document.getElementById("dienthoai2_err").innerHTML = "";
    if (ngaysinh == "") {
        document.getElementById("ngaysinh_err").innerHTML = "chưa nhập ngày sinh";
        result = false;
    } else document.getElementById("ngaysinh_err").innerHTML = "";
    return result;
}

function kiemtraten() {
    let ten = document.getElementById("ten").value;
    if (ten == "") {
        document.getElementById("name_err").innerHTML = "chưa nhập tên";
    } else document.getElementById("name_err").innerHTML = "";
}

function kiemtransodienthoai() {
    let sodienthoai = document.getElementById("sodienthoai").value;
    if (sodienthoai == "") {
        document.getElementById("dienthoai_err").innerHTML = "chưa nhập số điện thoại";
    } else document.getElementById("dienthoai_err").innerHTML = "";
    if (isNaN(sodienthoai)) {
        document.getElementById("dienthoai2_err").innerHTML = "vui lòng nhập số";
    } else document.getElementById("dienthoai2_err").innerHTML = "";
}

function kiemtrangaysinh() {
    let ngaysinh = document.getElementById("ngaysinh").value;
    if (ngaysinh == "") {
        document.getElementById("ngaysinh_err").innerHTML = "chưa nhập ngày sinh";
    } else document.getElementById("ngaysinh_err").innerHTML = "";
}
