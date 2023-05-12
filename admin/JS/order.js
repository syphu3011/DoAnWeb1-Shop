

let receipt
let detail_receipt
let customer
let productOr
let promotion
let length1
let length2
let length3

document.getElementById("date-init-first").value="1971-01-01"
document.getElementById("date-init-last").value=CurrentDate()
document.getElementById("date-confirm-first").value = "1971-01-01"
document.getElementById("date-confirm-last").value = CurrentDate()


function RefreshFillOrder(){
    Promise.all([get_DataOrder(), get_DataCus(), get_DataDetailO(),
        get_DataProd(), get_DataPromo()])
       .then(function(results) {
    
        //  console.log(results[0]); // receipt
        //  console.log(results[1]); // customer
        //  console.log(results[2]); // detail_receipt
        //  console.log(results[3]); // product
         console.log(results[4]); // get_DataPromo
         FillOrder();
       })
       .catch(function(error) {
         
         console.error(error);
       });
}
function get_DataOrder() {
    return $.ajax({
        url: './Server/receipt/receipt.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            receipt = data;
            length1 = receipt.length;
            // FillOrder();
        //   console.log(receipt);
        },
        error: function(xhr, status, error) {
          // Xử lý lỗi ở đây
          console.error(error);
        }
      });
}
function get_DataPromo() {
    return $.ajax({
        url: './Server/promotion/promotions.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            promotion = data;
        },
        error: function(xhr, status, error) {
          // Xử lý lỗi ở đây
          console.error(error);
        }
      });
}
async function get_DataProd() {
    let current_user = getCurrentUser()
        data_server = to_form_data(current_user);
        productOr = await get(data_server,'./Server/product/products.php')
        console.log(productOr)
        if (productOr == errors) {
            block_access('Bạn không có quyền truy cập vào sản phẩm!')
            return
        }
}
function get_DataCus() {
    return $.ajax({
        url: './Server/customer/customer.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            customer = data;
            length3 = customer.length;
            // FillOrder();
        //   console.log(customer);
        },
        error: function(xhr, status, error) {
          // Xử lý lỗi ở đây
          console.error(error);
        }
      });
}
function get_DataDetailO() {
    return $.ajax({
        url: './Server/receipt/receiptDetail.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            detail_receipt = data;
            length2 = detail_receipt.length;
            // FillOrder();
        //   console.log(detail_receipt);
        },
        error: function(xhr, status, error) {
          // Xử lý lỗi ở đây
          console.error(error);
        }
      });
}

function calculated(price) {
    if (price !== null) {
        price = price.toString()
        let ar = new Array()
        for (let i = 0; i < price.length; i++) {
            if (i % 3 == 0 && i != 0 && price[price.length - i - 1] != '-') {
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
function GetAmount(id,color,size) {
    for (var i = 0; i < productOr.prodInStock.length; i++) {
        if (productOr.prodInStock[i].idProd == id&& 
            productOr.prodInStock[i].idColor==color&&
            productOr.prodInStock[i].idSize==size) {
            return productOr.prodInStock[i].amount
        }
    }
}

function GetNameCus(id) {
    for (var i = 0; i < length3; i++) {
        if (customer[i].id == id) {
            return customer[i].name

        }
    }
}

 async function SetAmount(sl, idprod,size,color) {
        let CurrentUser = getCurrentUser()
        let data_post_server = {idProd:idprod, idSize:size,
            idColor:color,amount:sl ,
            id_user: CurrentUser.id_user, password: CurrentUser.password }
        let form_data = to_form_data(data_post_server)
        await put(form_data, './Server/product/updateProdInStock.php')
}


function GetNamePro(id) {
    for (var i = 0; i < productOr.product.length; i++) {
        if (productOr.product[i].id == id) {
            return productOr.product[i].name
        }
    }
}
// Xác nhận đơn
function CountProd(id){
    let count=0
    for (let i = 0; i < length2; i++) {
        if(detail_receipt[i].id_receipt==id){
            count ++
        }
    }
    return count++    
}

function ConfirmOrder(x) {
    let temp =0
    for (let i = 0; i < length2; i++) {
        if(detail_receipt[i].id_receipt==x){
            let idprod = detail_receipt[i].id_product_detail_receipt
            let color = detail_receipt[i].id_color_detail_receipt 
            let size = detail_receipt[i].id_size_detail_receipt
            if (parseInt(GetAmount(idprod,color,size)) >
                parseInt(detail_receipt[i].amount_detail_receipt)) {
                temp++
            }
        }   
    }
  
    if (temp == CountProd(x)) {
        $.ajax({
            url: "./Server/receipt/receiptStatus.php?action=update",
            method: "POST",
            data:( {
                id_receipt: x,
                status: "Đã xác nhận"
            }),
            success: function (response) {
                console.log(response);
                for (let i = 0; i < length2; i++) {
                    if(detail_receipt[i].id_receipt==x){
                        let idprod = detail_receipt[i].id_product_detail_receipt
                        let color = detail_receipt[i].id_color_detail_receipt 
                        let size = detail_receipt[i].id_size_detail_receipt
                        let sl= detail_receipt[i].amount_detail_receipt
                        SetAmount(sl,idprod,size,color)
                    }
                }
                alert("Xác nhận đơn thành công")
                RefreshFillOrder()
            },
            error: function (xhr, status, error) {
                console.log(error);
            },
        });
    } else {
        alert("Số lượng trong kho không đủ")
    }

    // if(document.getElementById("date-init-first").value==""||
    // document.getElementById("date-init-last").value==""){
    // FillOrder()
    // }
    // else{
    //     timtheokhoang()
    // }
}

// Hủy đơn

function CancelOrder(x) {
    $.ajax({
        url: "./Server/receipt/receiptStatus.php?action=update",
        method: "POST",
        data:( {
            id_receipt: x,
            status: "Đã hủy"
        }),
        success: function (response) {
            alert("Hủy đơn hàng thành công");
            RefreshFillOrder()
        },
        error: function (xhr, status, error) {
            console.log(error);
        },
    });

    // if(document.getElementById("date-init-first").value==""||
    // document.getElementById("date-init-last").value==""){
    // FillOrder()
    // }
    // else{
    //     timtheokhoang()
    // }
}

// Tính tổng tiền

function TotalMoney(x) {
    let total = 0
    for (var i = 0; i < length2; i++) {
        if(detail_receipt[i].id_receipt==x){
            total = total + detail_receipt[i].amount_detail_receipt*detail_receipt[i].price_detail_receipt
        }
        
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
            <td>` + receipt[i].id_customer+ `</td>
            <td>` + GetNameCus(receipt[i].id_customer) + `</td>
            <td>` + receipt[i].date_init + `</td>
            <td>` + calculated(TotalMoney(receipt[i].id)) + ` VNĐ</td>
            <td class = detail_o onclick=DetailOr("` + receipt[i].id + `")>Chi tiết</td>
            <td>` + "chưa xử lý" + `</td>
            <td> <button onclick=ConfirmOrder("` + receipt[i].id + `") >Xác nhận</button> 
            <button onclick=CancelOrder("` + receipt[i].id + `")>Hủy</button> </td>`
            tagtable.appendChild(tagrow)
        }
    }

}


function FillHistory() {
    let tagtable = document.getElementById("table-history")
    let status
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < length1; i++) {
        if (receipt[i].id_status != "TT09") {
            if(receipt[i].id_status=="TT08"){
                status="đã hủy"
            }
            else{
                status="đã xác nhận"
            }
            let tagrow = document.createElement("tr")
            tagrow.innerHTML = `
            <td>` + receipt[i].id + `</td>
            <td>` + receipt[i].id_customer + `</td>
            <td>` + GetNameCus(receipt[i].id_customer) + `</td>
            <td>` + receipt[i].date_confirm + `</td>
            <td>` + calculated(TotalMoney(receipt[i].id)) + ` VNĐ</td>
            <td class = detail_h onclick=DetailHis("` + receipt[i].id + `")>Chi tiết</td>
            <td>` + status + `</td>
            <td> ` + receipt[i].id_staff + ` </td>`
            tagtable.appendChild(tagrow)
        }
    }
}

// Chi tết đơn hang và chi tiết lịch sử đơn hàng

function FillDetailO(x) {
    document.getElementById("Text-detail-order").innerHTML = `Chi tiết đơn hàng ` + x
    let tagtable = document.getElementById("Table-detail-order")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < length2; i++) {
        if(detail_receipt[i].id_receipt==x){
            let tagrow = document.createElement("tr")
            let idprod = detail_receipt[i].id_product_detail_receipt
            let color = detail_receipt[i].id_color_detail_receipt 
            let size = detail_receipt[i].id_size_detail_receipt
            tagrow.innerHTML = `
            <td>` + detail_receipt[i].id_product_detail_receipt + `</td>
            <td>` + GetNamePro(idprod)+ `</td>
            <td>` + size.substring(2) + `</td>
            <td> <input type="color" value="`+color +`" disabled> </td>
            <td>` + calculated(detail_receipt[i].price_detail_receipt) + ` VNĐ</td>
            <td>` + detail_receipt[i].amount_detail_receipt + `</td>
            <td>` + GetAmount(idprod,color,size) + `</td>
            <td>` + " " + `</td>
            <td>` + calculated(detail_receipt[i].amount_detail_receipt*detail_receipt[i].price_detail_receipt) + ` VNĐ</td>`
            tagtable.appendChild(tagrow)
        }
        
    }
    document.getElementById("total").innerHTML = `Tổng đơn hàng: ` + calculated(TotalMoney(x)) + ` VNĐ` // cũ là tongtienhd
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
    let date_order
    document.getElementById("Text-Detail-History").innerHTML = `Chi tiết đơn hàng ` + x
    let tagtable = document.getElementById("Table-detail-history")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < length2; i++) {
        if(detail_receipt[i].id_receipt==x){
            date_order =detail_receipt[i].date_confirm_receipt
            let tagrow = document.createElement("tr")
            let idprod = detail_receipt[i].id_product_detail_receipt
            tagrow.innerHTML = `
        <td>` + idprod + `</td>
        <td>` + GetNamePro(idprod) + `</td>
        <td>` + detail_receipt[i].id_size_detail_receipt.substring(2) + `</td>
        <td> <input type="color" value="`+detail_receipt[i].id_color_detail_receipt +`" disabled> </td>
        <td>` + calculated(detail_receipt[i].price_detail_receipt) + ` VNĐ</td>
        <td>` + detail_receipt[i].amount_detail_receipt + `</td>
        <td>` + "" + `</td>
        <td>` + calculated(detail_receipt[i].amount_detail_receipt*detail_receipt[i].price_detail_receipt)  + ` VNĐ</td>`
            tagtable.appendChild(tagrow)
        }
    }
    document.getElementById("total-his").innerHTML = `Tổng đơn hàng:  ` + calculated(TotalMoney(x)) + ` VNĐ`
    document.getElementById("Lbl-date").innerHTML = `Ngày đặt: ` + date_order
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
        return FindDateInit(init)
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
        return FindDateComfirm(init)
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
        if (receipt[i].id_customer.toLowerCase().indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindNameCus(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (GetNameCus(receipt[i].id_customer).toLowerCase().indexOf(tring) != -1) {
            array.push(i)
        }
    }
    return array
}

function FindIDStaff(tring) {
    var array = []
    for (let i = 0; i < length1; i++) {
        if (receipt[i].id_staff.toLowerCase().indexOf(tring) != -1) {
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
        if (CompareTotal(min, max, TotalMoney(receipt[i].id))) {
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
        let total = TotalMoney(receipt[i].id).toString()
        if (receipt[i].id.toLowerCase().indexOf(tring) != -1 ||
            receipt[i].id_customer.toLowerCase().indexOf(tring) != -1 ||
            GetNameCus(receipt[i].id_customer).toLowerCase().indexOf(tring) != -1 ||
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
        let total = TotalMoney(receipt[i].id).toString()
        if (receipt[i].id.toLowerCase().indexOf(tring) != -1 ||
            receipt[i].id_customer.toLowerCase().indexOf(tring) != -1 ||
            GetNameCus(receipt[i].id_customer).toLowerCase().indexOf(tring) != -1 ||
            receipt[i].date_confirm.indexOf(tring) != -1 ||
            total.indexOf(tring) != -1 ||
            receipt[i].id_staff.toLowerCase().indexOf(tring) != -1 ||
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
        if (receipt[find[i]].id_status == "TT07" || receipt[find[i]].id_status == "TT08") {
            continue
        } else {
            let tagrow = document.createElement("tr")
            // tagrow.className = "first-row"
            tagrow.innerHTML = `
            <td>` + receipt[find[i]].id + `</td>
            <td>` + receipt[find[i]].id_customer + `</td>
            <td>` + GetNameCus(receipt[find[i]].id_customer) + `</td>
            <td>` + receipt[find[i]].date_init + `</td>
            <td>` + calculated(TotalMoney(receipt[find[i]].id)) + ` VNĐ</td>
            <td class = detail_o onclick=DetailOr(` + find[i] + `)>Chi tiết</td>
            <td>` + "chưa xử lý"+ `</td>
            <td> <button onclick=ConfirmOrder(` + find[i] + `) >Xác nhận</button>  <button onclick=CancelOrder(` + find[i] + `)>Hủy</button>  </td>`
            tagtable.appendChild(tagrow)
        }
    }
}

function FillHistoryFind(find) {
    let tagtable = document.getElementById("table-history")
    let status
    for (let j = tagtable.rows.length - 1; j > 0; j--)
        tagtable.deleteRow(j);
    for (var i = 0; i < find.length; i++) {
        if (receipt[find[i]].id_status == "TT09") {
            continue
        } else {
            if(receipt[find[i]].id_status=="TT08"){
                status="đã hủy"
            }
            else{
                status="đã xác nhận"
            }
            let tagrow = document.createElement("tr")
            tagrow.innerHTML = `
            <td>` + receipt[find[i]].id + `</td>
            <td>` + receipt[find[i]].id_customer + `</td>
            <td>` + GetNameCus(receipt[find[i]].id_customer) + `</td>
            <td>` + receipt[find[i]].date_confirm + `</td>
            <td>` + calculated(TotalMoney(receipt[find[i]].id)) + ` VNĐ</td>
            <td class = detail_h onclick=DetailHis(` + find[i] + `)>Chi tiết</td>
            <td>` + status + `</td>
            <td> ` + receipt[find[i]].id_staff + ` </td>`
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
                let date = receipt[i].date_init.split(" ")[0]
                if (check2D(ngayBD, date) &&
                    check2D(date, ngayKT) &&
                    receipt[i].id_status == "TT09") {
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
                let date = receipt[i].date_confirm.split(" ")[0]
                if (check2D(ngayBD, date) &&
                    check2D(date, ngayKT) &&
                    receipt[i].id_status != "TT09"
                ) {
                    arOder.push(i)
                }
            }
        }
        FillHistoryFind(arOder)
    }
    
}




// function tongtienHD(od) {
//     let tong = 0
//     od.forEach(e => {
//         obj12.product.forEach(element => {
//             if (e.idProd == element.id) {
//                 if (timKm(e.idProd) != "") {
//                     tong += parseInt(element.price) * parseInt(e.amount) - (parseInt(element.price) * parseInt(e.amount) * timKm(e.idProd).discount_percent / 100 - timKm(e.idProd).discount_price)
//                 } else {
//                     tong += parseInt(element.price) * parseInt(e.amount)

//                 }
//             }
//         })
//     })
//     return tong
// }

// function GetTotal(x) {
//     let tong = 0
//     for (var i = 0; i < length3; i++) {
//         let id = obj12.product[i]
//         if (x.idProd == id.id) {
//             if (timKm(x.idProd) != "") {
//                 tong = parseInt(id.price) * parseInt(x.amount) - (parseInt(id.price) * parseInt(x.amount) * timKm(x.idProd).discount_percent / 100 - timKm(x.idProd).discount_price)
//                 return tong
//             } else {
//                 tong = parseInt(id.price) * parseInt(x.amount)
//                 return tong
//             }
//         }
//     }
// }


