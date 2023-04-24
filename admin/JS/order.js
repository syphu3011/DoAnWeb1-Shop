
// function writeToLocalStorage(arr) {
//     let setlocal = JSON.stringify(arr)
//     localStorage.setItem("data", setlocal)
// }


// let objk = JSON.parse(JSON.stringify(data))
// localStorage.setItem("data", JSON.stringify(data))
let receipt
let length1
function get_DataStaff() {
    return $.ajax({
        url: './Server/receipt/receipt.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            receipt = data
            let length1 = receipt.length
            FillOrder()
          console.log(data);
        },
        error: function(xhr, status, error) {
          // Xử lý lỗi ở đây
          console.error(error);
        }
      });
}
get_DataStaff() 

// let length2 = obj12.prodInStock.length
// let length3 = obj12.product.length
// let length4 = obj12.customer.length
// console.log(obj12)
document.getElementById("date-init-first").value="1971-01-01"
document.getElementById("date-init-last").value=CurrentDate()
document.getElementById("date-confirm-first").value = "1971-01-01"
document.getElementById("date-confirm-last").value = CurrentDate()



function calculated(price) {
    if (price !== null) {
        price = price.toString()
        let ar = new Array()
        for (let i = 0; i < price.length; i++) {
            if (i % 3 == 0 && i != 0) {
                ar.push(".")
            }
            ar.push(price[price.length - i - 1])
        }
        price = ""
        for (let i = ar.length - 1; i >= 0; i--) {
            price += ar[i]
        }
    }
    return price
}
function GetAmount(id) {
    for (var i = 0; i < length2; i++) {
        if (obj12.prodInStock[i].idProd == id) {
            return obj12.prodInStock[i].amount
        }
    }
}

function GetNameCus(id) {
    for (var i = 0; i < length4; i++)
        if (id == obj12.customer[i].id)
            return obj12.customer[i].name
}

function SetAmount(sl, id) {
    for (var i = 0; i < length2; i++) {
        if (obj12.prodInStock[i].idProd == id) {
            return obj12.prodInStock[i].amount -= sl
        }
    }
}

function GetPrice(id) {
    for (var i = 0; i < length3; i++) {
        if (obj12.product[i].id == id) {
            return obj12.product[i].price
        }
    }
}
function GetNamePro(id) {
    for (var i = 0; i < length3; i++) {
        if (obj12.product[i].id == id) {
            return obj12.product[i].name
        }
    }
}
// Xác nhận đơn

function ConfirmOrder(x) {
    console.log(x)
    let lengt = receipt[x].list_prod.length
    let temp = 0
    for (let i = 0; i < lengt; i++) {
        if (parseInt(GetAmount(receipt[x].list_prod[i].idProd)) >
            parseInt(receipt[x].list_prod[i].amount)) {
            temp++
        }
    }
    if (temp == lengt) {
        receipt[x].id_status = "xác nhận"
        receipt[x].idStaff = JSON.parse(localStorage.getItem("currentStaff")).id
        receipt[x].date_confirm = getCurrentDate2()
        for (let i = 0; i < lengt; i++) {
            SetAmount(receipt[x].list_prod[i].amount,  receipt[x].list_prod[i].idProd)
        }
        writeToLocalStorage(obj12)
    } else {
        alert("Số lượng trong kho không đủ")
    }

    // if(document.getElementById("date-init-first").value==""||
    // document.getElementById("date-init-last").value==""){
        FillOrder()
    // }
    // else{
    //     timtheokhoang()
    // }
}

// Hủy đơn

function CancelOrder(x) {
    receipt[x].date_confirm = getCurrentDate2()
    receipt[x].id_status = "đã hủy"
    receipt[x].idStaff = JSON.parse(localStorage.getItem("currentStaff")).id
    // writeToLocalStorage(obj12)
    // if(document.getElementById("date-init-first").value==""||
    // document.getElementById("date-init-last").value==""){
        FillOrder()
    // }
    // else{
    //     timtheokhoang()
    // }
}

// Tính tổng tiền

function TotalMoney(x) {
    let total = 0
    let leng = receipt[x].list_prod.length
    for (var i = 0; i < leng; i++) {
        total = total + (receipt[x].list_prod[i].amount * GetPrice(receipt[x].list_prod[i].idProd))
    }
    return total
}

// Fill bảng
function FillOrder() {
    let tagtable = document.getElementById("table-order")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < length1; i++) {
        if (receipt[i].id_status == "TT07" || receipt[i].id_status == "TT08") {
            continue
        } else {
            let tagrow = document.createElement("tr")
            tagrow.innerHTML = `
            <td>` + receipt[i].id + `</td>
            <td>` + receipt[i].idCustomer + `</td>
            <td>` + GetNameCus(receipt[i].idCustomer) + `</td>
            <td>` + receipt[i].date_init + `</td>
            <td>` + calculated(TotalMoney(i)) + ` VNĐ</td>
            <td class = detail_o onclick=DetailOr(` + i + `)>Chi tiết</td>
            <td>` + receipt[i].id_status + `</td>
            <td> <button onclick=ConfirmOrder(` + i + `) >Xác nhận</button> <button onclick=CancelOrder(` + i + `)>Hủy</button> </td>`
            tagtable.appendChild(tagrow)
        }
    }

}


function FillHistory() {
    let tagtable = document.getElementById("table-history")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < length1; i++) {
        console.log(receipt[i].id_status)
        if (receipt[i].id_status.toLowerCase() != "TT09") {
            let tagrow = document.createElement("tr")
            tagrow.innerHTML = `
            <td>` + receipt[i].id + `</td>
            <td>` + receipt[i].idCustomer + `</td>
            <td>` + GetNameCus(receipt[i].idCustomer) + `</td>
            <td>` + receipt[i].date_confirm + `</td>
            <td>` + calculated(tongtienHD(receipt[i].list_prod)) + ` VNĐ</td>
            <td class = detail_h onclick=DetailHis(` + i + `)>Chi tiết</td>
            <td>` + receipt[i].id_status + `</td>
            <td> ` + receipt[i].idStaff + ` </td>`
            tagtable.appendChild(tagrow)
        }
    }
}

// Chi tết đơn hang và chi tiết lịch sử đơn hàng

function FillDetailO(x) {
    let leng = receipt[x].list_prod.length
    document.getElementById("Text-detail-order").innerHTML = `Chi tiết đơn hàng ` + receipt[x].id
    let tagtable = document.getElementById("Table-detail-order")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < leng; i++) {
        let tagrow = document.createElement("tr")
        let idprod = receipt[x].list_prod[i].idProd
        tagrow.innerHTML = `
    <td>` + idprod + `</td>
    <td>` + GetNamePro(idprod)+ `</td>
    <td>` + receipt[x].list_prod[i].idSize + `</td>
    <td>` + calculated(GetPrice(idprod)) + ` VNĐ</td>
    <td>` + receipt[x].list_prod[i].amount + `</td>
    <td >` + GetAmount(idprod) + `</td>
    <td>` + calculated((receipt[x].list_prod[i].amount * GetPrice(receipt[x].list_prod[i].idProd)) - GetTotal(receipt[x].list_prod[i])) + `</td>
    <td>` + calculated(GetTotal(receipt[x].list_prod[i])) + ` VNĐ</td>`
        tagtable.appendChild(tagrow)
    }
    document.getElementById("total").innerHTML = `Tổng đơn hàng: ` + calculated(tongtienHD(receipt[x].list_prod)) + ` VNĐ`
    document.getElementById("confirm-order").onclick = function() {
        ConfirmOrder(x)
        CloseDetailOr()
    }
    document.getElementById("cancel-order").onclick = function() {
        CancelOrder(x)
        CloseDetailOr()
    }
}

function FillDetailH(x) {
    let leng = receipt[x].list_prod.length
    document.getElementById("Text-Detail-History").innerHTML = `Chi tiết đơn hàng ` + receipt[x].id
    let tagtable = document.getElementById("Table-detail-history")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < leng; i++) {
        let tagrow = document.createElement("tr")
        let idprod = receipt[x].list_prod[i].idProd
        console.log(GetTotal(receipt[x].list_prod[i]))
        tagrow.innerHTML = `
    <td>` + idprod + `</td>
    <td>` + GetNamePro(idprod) + `</td>
    <td>` + receipt[x].list_prod[i].idSize + `</td>
    <td>` + calculated(GetPrice(idprod)) + ` VNĐ</td>
    <td>` + receipt[x].list_prod[i].amount + `</td>
    <td>` + calculated((receipt[x].list_prod[i].amount * GetPrice(receipt[x].list_prod[i].idProd)) - GetTotal(receipt[x].list_prod[i])) + `</td>
    <td>` + calculated(GetTotal(receipt[x].list_prod[i])) + ` VNĐ</td>`

        tagtable.appendChild(tagrow)
    }
    document.getElementById("total-his").innerHTML = `Tổng đơn hàng:  ` + calculated(tongtienHD(receipt[x].list_prod)) + ` VNĐ`
    document.getElementById("Lbl-date").innerHTML = `Ngày đặt: ` + receipt[x].date_init
}

//Tắt mở dialog

function OpenDialog1() {
    document.getElementById("dialog7").style.display = 'flex';
}

function CloseDialog1() {
    document.getElementById("dialog7").style.display = 'none';
}
// Chuyển trang
document.getElementById("detail").onclick = function() {
    document.getElementById("order").style.display = 'none';
    document.getElementById("order_h").style.display = 'block';
    // if(document.getElementById("date-confirm-first").value==""||
    // document.getElementById("date-confirm-last").value==""){
        FillHistory()
    // }
    // else{
    //     timtheokhoangLS()
    // }
    
};
document.getElementById("page_order").onclick = function() {
    document.getElementById("order").style.display = 'block';
    document.getElementById("order_h").style.display = 'none';
    // if(document.getElementById("date-init-first").value==""||
    // document.getElementById("date-init-last").value==""){
        FillOrder()
    // }
    // else{
    //     timtheokhoang()
    // }
    
    
};
// Tắt mở chi tiết đơn hàng
function DetailOr(x) {
    document.getElementById("box_detail").style.visibility = 'visible';
    OpenDialog1();
    FillDetailO(x)
};

function CloseDetailOr() {
    document.getElementById("box_detail").style.visibility = 'hidden';
    CloseDialog1();
    writeToLocalStorage(obj12)
};


// Tắt mở chi tiết lịch sử đơn hàng

function DetailHis(x) {
    document.getElementById("box_detail_h").style.visibility = 'visible';
    OpenDialog1();
    FillDetailH(x)
};

function CloseDetailHis() {
    document.getElementById("box_detail_h").style.visibility = 'hidden';
    CloseDialog1();

};

//Bộ lọc

function OpenFilterOrder() {
    document.getElementById("box-search").style.visibility = 'visible';
    OpenDialog1();
}

function CloseFilterOrder(x) {
    document.getElementById("box-search").style.visibility = 'hidden';
    CloseDialog1();
}

function OpenFilterHis() {
    document.getElementById("box-search2").style.visibility = 'visible';
    OpenDialog1();
}

function CloseFilterHis() {
    document.getElementById("box-search2").style.visibility = 'hidden';
    CloseDialog1();
}
// Tìm kiếm đơn hàng

function SearchO() {
    let arr1 =[]
    arr1 = CompareArr(SearchTotalMoney(), SearchInit())
    console.log(CompareArr(arr1 ,SearchALLO()))
    FillOrderFind(CompareArr(arr1 ,SearchALLO()))
}


function SearchALLO() {
    var arr=[]
    let FindAllO1 = document.getElementById("sl-all2").value.toLowerCase().toString()
    let string1 = document.getElementById("text-search2").value.trim().toLowerCase()
    if (FindAllO1 == "all") {
        arr= FindAllO(string1)
    } else if (FindAllO1 == "id") {
        arr= FindIDO(string1)
    } else if (FindAllO1 == "idcus") {
        arr= FindIDCus(string1)
    } else {
        arr= FindNameCus(string1)
    }
    return arr
}

function SearchTotalMoney() {
    let OptionMoney = document.getElementById("sl-total").value.toLowerCase()
    if (OptionMoney == "all") {
        return FindTotalMoney(0, 999999999)
    } else if (OptionMoney == "1") {
        return FindTotalMoney(0, 999999)
    } else if (OptionMoney == "1-10") {
        return FindTotalMoney(1000000, 9999999)
    } else {
        return FindTotalMoney(10000000, 49999999)
    }
}

function SearchInit() {
    var init = document.getElementById("date-init2").value
    if (init =="") {
        return FindAllO("")
    } else {
        return FindDateInit(getDate(init))
    }
}


// Tìm kiếm lịch sử đơn hàng
function SearchHis() {
    let arr1 = CompareArr(SearchTotalMoneyH(), SearchConfirm())
    let arr2 = CompareArr(SearchALLH(), SearchStatus())
    console.log(CompareArr(arr1, arr2))
    FillHistoryFind(CompareArr(arr1, arr2))
}

function SearchALLH() {
    let FindAllO1 = document.getElementById("sl-all-h").value.toLowerCase()
    let string1 = document.getElementById("text-find").value.trim().toLowerCase()
    if (FindAllO1 == "all") {
        return FindAllOH(string1)
    } else if (FindAllO1 == "id") {
        return FindIDO(string1)
    } else if (FindAllO1 == "idcus") {
        return FindIDCus(string1)
    } else if (FindAllO1 == "namecus") {
        return FindNameCus(string1)
    } else {
       return FindIDStaff(string1)
    }
}

function SearchTotalMoneyH() {
    let OptionMoney = document.getElementById("sl-total-h").value.toLowerCase()
    if (OptionMoney == "all") {
        return FindTotalMoney(0, 999999999)
    } else if (OptionMoney == "1") {
        return FindTotalMoney(0, 999999)
    } else if (OptionMoney == "1-10") {
        return FindTotalMoney(1000000, 9999999)
    } else {
        return FindTotalMoney(10000000, 49999999)
    }
    
}

function SearchStatus() {
    let arr=[]
    let status = document.getElementById("sl-status2").value.toLowerCase()
    if (status == "all") {
        return FindStatus2("")
    } else {
        return FindStatus2(status)
    }
}

function SearchConfirm() {
    let arr=[]
    var init = document.getElementById("date-confirm").value
    if (init == "") {
        return FindAllOH("")
    } else {
        return FindDateComfirm(getDate(init))
    }
}





// Hàm trả về mảng tìm kiếm 

function FindIDO(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (receipt[i].id.toLowerCase().indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindIDCus(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (receipt[i].idCustomer.toLowerCase().indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindNameCus(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (GetNameCus(receipt[i].idCustomer).toLowerCase().indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindIDStaff(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (receipt[i].idStaff.toLowerCase().indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindStatus2(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (receipt[i].id_status.toLowerCase().indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindDateInit(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (receipt[i].date_init.indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindDateComfirm(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (receipt[i].date_confirm.indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}


function FindTotalMoney(min, max) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (CompareTotal(min, max, tongtienHD(receipt[i].list_prod))) {
            array.push(i)
        }
    }
    return array
}

function CompareTotal(min, max, x) {
    if (x >= min && x <= max) {
        return true
    }
    return false
}

function CompareArr(ar1,ar2) {
    let array =[]
    for (let i = 0; i < ar1.length; i++) {
        for (let j = 0; j < ar2.length; j++) {
            if (ar1[i] == ar2[j]) {
                array.push(ar1[i])
            }
        }
    }
    return array
}

function FindAllO(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        let total = tongtienHD(receipt[i].list_prod).toString()
        if (receipt[i].id.toLowerCase().indexOf(tring) != -1 ||
            receipt[i].idCustomer.toLowerCase().indexOf(tring) != -1 ||
            GetNameCus(receipt[i].idCustomer).toLowerCase().indexOf(tring) != -1 ||
            receipt[i].date_init.indexOf(tring) != -1 ||
            total.indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindAllOH(tring) {
    let array = []
    for (let i = 0; i < length1; i++) {
        let total = tongtienHD(receipt[i].list_prod).toString()
        if (receipt[i].id.toLowerCase().indexOf(tring) != -1 ||
            receipt[i].idCustomer.toLowerCase().indexOf(tring) != -1 ||
            GetNameCus(receipt[i].idCustomer).toLowerCase().indexOf(tring) != -1 ||
            receipt[i].date_confirm.indexOf(tring) != -1 ||
            total.indexOf(tring) != -1 ||
            receipt[i].idStaff.toLowerCase().indexOf(tring) != -1 ||
            receipt[i].id_status.toLowerCase().indexOf(tring) != -1) {
            array.push(i)
        }
    }

    return array
}

function getDate(date) {
    let newdate = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]
    return newdate
}

//Fill bảng tìm kiếm

function FillOrderFind(find) {
    let tagtable = document.getElementById("table-order")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < find.length; i++) {
        if (receipt[find[i]].id_status == "xác nhận" || receipt[find[i]].id_status == "đã hủy") {
            continue
        } else {
            let tagrow = document.createElement("tr")
            // tagrow.className = "first-row"
            tagrow.innerHTML = `
            <td>` + receipt[find[i]].id + `</td>
            <td>` + receipt[find[i]].idCustomer + `</td>
            <td>` + GetNameCus(receipt[find[i]].idCustomer) + `</td>
            <td>` + receipt[find[i]].date_init + `</td>
            <td>` + calculated(tongtienHD(receipt[find[i]].list_prod)) + ` VNĐ</td>
            <td class = detail_o onclick=DetailOr(` + find[i] + `)>Chi tiết</td>
            <td>` + receipt[find[i]].id_status + `</td>
            <td> <button onclick=ConfirmOrder(` + find[i] + `) >Xác nhận</button>  <button onclick=CancelOrder(` + find[i] + `)>Hủy</button>  </td>`
            tagtable.appendChild(tagrow)
        }
    }
}

function FillHistoryFind(find) {
    let tagtable = document.getElementById("table-history")
    for (let j = tagtable.rows.length - 1; j > 0; j--)
        tagtable.deleteRow(j);
    for (var i = 0; i < find.length; i++) {
        if (receipt[find[i]].id_status.toLowerCase() == "chờ xác nhận") {
            continue
        } else {
            let tagrow = document.createElement("tr")
            tagrow.innerHTML = `
            <td>` + receipt[find[i]].id + `</td>
            <td>` + receipt[find[i]].idCustomer + `</td>
            <td>` + GetNameCus(receipt[find[i]].idCustomer) + `</td>
            <td>` + receipt[find[i]].date_confirm + `</td>
            <td>` + calculated(tongtienHD(receipt[find[i]].list_prod)) + ` VNĐ</td>
            <td class = detail_h onclick=DetailHis(` + find[i] + `)>Chi tiết</td>
            <td>` + receipt[find[i]].id_status + `</td>
            <td> ` + receipt[find[i]].idStaff + ` </td>`
            tagtable.appendChild(tagrow)
        }
    }
}

//Lấy ngày hiện tại
function getCurrentDate2() {
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

function CurrentDate() {
    function formatNumber(number) {
        return number < 10 ? "0" + number : number
    }
    var today = new Date();
    var dd = formatNumber(today.getDate())
    var mm = formatNumber(today.getMonth() + 1)
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd ;
    return today
}

function check2D(day1, day2) {
    if (day1.split("-")[0] == day2.split("-")[0]) {
        if (day1.split("-")[1] == day2.split("-")[1]) {
            if (day1.split("-")[2] > day2.split("-")[2]) {
                return false
            }
            return true
        }
        if (day1.split("-")[1] > day2.split("-")[1]) {
            return false
        }
        return true
    }
    if (day1.split("-")[0] > day2.split("-")[0]) {
        return false
    }
    return true
}

function timtheokhoang() {
    let arOder = new Array()
    let ngayBD = document.getElementById("date-init-first").value
    let ngayKT = document.getElementById("date-init-last").value
    if(ngayBD==""||ngayKT==""){
        FillOrder()
    }
    else{
        if (check2D(ngayBD, ngayKT)) {
            for(var i=0; i<length1;i++) {
                let date = receipt[i].date_init.split(" ")[0].split("/")
                if (check2D(ngayBD, date[2] + "-" + date[1] + "-" + date[0]) &&
                    check2D(date[2] + "-" + date[1] + "-" + date[0], ngayKT) &&
                    receipt[i].id_status.toLowerCase() == "chờ xác nhận") {
                    arOder.push(i)
                }
            }
        }
        FillOrderFind(arOder)
    }
}

function timtheokhoangLS() {
    let arOder = new Array()
    let ngayBD = document.getElementById("date-confirm-first").value
    let ngayKT = document.getElementById("date-confirm-last").value
    if(ngayBD==""||ngayKT==""){
        FillHistory()
  
    }
    else{
        if (check2D(ngayBD, ngayKT)) {
            for(var i=0; i<length1;i++) {
                let date = receipt[i].date_confirm.split(" ")[0].split("/")
                if (check2D(ngayBD, date[2] + "-" + date[1] + "-" + date[0]) &&
                    check2D(date[2] + "-" + date[1] + "-" + date[0], ngayKT) &&
                    receipt[i].id_status.toLowerCase() != "chờ xác nhận"
                ) {
                    arOder.push(i)
                }
            }
        }
        FillHistoryFind(arOder)
    }
    
}


function timKm(id) {
    let km = ""
    obj12.promote.forEach(element => {
        element.products.forEach(e => {
            if (e.id == id) {
                km = element
            }
        })
    })
    return km
}

function tongtienHD(od) {
    let tong = 0
    od.forEach(e => {
        obj12.product.forEach(element => {
            if (e.idProd == element.id) {
                if (timKm(e.idProd) != "") {
                    tong += parseInt(element.price) * parseInt(e.amount) - (parseInt(element.price) * parseInt(e.amount) * timKm(e.idProd).discount_percent / 100 - timKm(e.idProd).discount_price)
                } else {
                    tong += parseInt(element.price) * parseInt(e.amount)

                }
            }
        })
    })
    return tong
}

function GetTotal(x) {
    let tong = 0
    for (var i = 0; i < length3; i++) {
        let id = obj12.product[i]
        if (x.idProd == id.id) {
            if (timKm(x.idProd) != "") {
                tong = parseInt(id.price) * parseInt(x.amount) - (parseInt(id.price) * parseInt(x.amount) * timKm(x.idProd).discount_percent / 100 - timKm(x.idProd).discount_price)
                return tong
            } else {
                tong = parseInt(id.price) * parseInt(x.amount)
                return tong
            }
        }
    }
}


// timtheokhoang()
