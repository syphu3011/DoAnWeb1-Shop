// import * as config from "./config.js";
let type = "a"
let idLogin = "NV0001"
let choosing = false // true size false id
let btn_select_size = document.getElementById("select-size")
let list_size = document.getElementById("list-drop-down-size")
var selected
let arrRemove = []
let detaill = []
let importList = []
let data = JSON.parse(localStorage.getItem('data'))
let inp_prod = data.input_product
let checkClickOutsideDetail = false

function getCurrentDate() {
    function formatNumber(number) {
        return number < 10 ? "0" + number : number
    }
    var today = new Date();
    var hour = formatNumber(today.getHours())
    var minute = formatNumber(today.getMinutes())
    var second = formatNumber(today.getSeconds())
    var dd = formatNumber(today.getDate())
    var mm = formatNumber(today.getMonth())
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy + " " + hour + ':' + minute + ':' + second;
    return today
}

function updateData() {
    data = JSON.parse(localStorage.getItem('data'))
}
//get data
btn_select_size.onclick = function() {
    if (list_size.style.visibility == "") {
        list_size.style.zIndex = "1"
        list_size.style.visibility = "visible";
        list_size.style.opacity = "1";
        list_size.style.transitionDelay = "0s, 0s, 0.3s;"
            // list_size.style.transform = "transformY"
        selected = document.getElementById("p-size")
        choosing = true
    } else {
        list_size.style.visibility = "";
        list_size.style.opacity = "0";
        list_size.style.transition = "all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 1s linear 0.01s;"
    }
}
window.addEventListener("click", function(e) {
    if (!btn_select_size.contains(e.target)) {
        if (list_size.style.opacity == "1") {
            list_size.style.visibility = "";
            list_size.style.opacity = "0";
            list_size.style.transition = "all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 1s linear 0.01s;"
        }
    }
})

let btn_select_id = document.getElementById("select-id")
let btn_size = document.getElementById("select-size")
let list_id = document.getElementById("list-drop-down-id")

function updateListID() {
    // <li class="li-drop-down">SP00000000001</li>
    //                         <li class="li-drop-down">SP00000000001</li>
    //                         <li class="li-drop-down">SP00000000001</li>
    //                         <li class="li-drop-down">SP00000000001</li>
    //                         <li class="li-drop-down">SP00000000001</li>
    //                         <li class="li-drop-down">SP00000000001</li>
    //                         <li class="li-drop-down">SP00000000001</li>
    updateData()
    let dropdown = document.getElementById("list-drop-down-id")
    dropdown.innerHTML = ""
    data.product.forEach(element => {
        let li = document.createElement('li')
        li.className = "li-drop-down"
        li.appendChild(document.createTextNode(element.id))
        dropdown.appendChild(li)
        li.onclick = function() {
            if (element.id.includes("AO")) {
                updateListSize("AO")
            } else if (element.id.includes("QUAN")) {
                updateListSize("QUAN")
            } else {
                updateListSize("PK")
            }
            selected.innerText = li.innerText
            selected.value = choosing ? type + li.innerText : li.innerText
        }
    })

}

function updateListSize(type) {
    updateData()
    let dropdown = document.getElementById("list-drop-down-size")
    let sizeP = document.getElementById("size-p")
    dropdown.innerHTML = ""
    let firstLetter = null
    btn_size.style.visibility = "visible"
    btn_size.style.opacity = 1
    sizeP.style.visibility = "visible"
    sizeP.style.opacity = 1
    if (type == "AO") {
        firstLetter = "A"
    } else if (type == "QUAN") {
        firstLetter = "Q"
    } else {
        btn_size.style.opacity = 0
        btn_size.style.visibility = "hidden"
        sizeP.style.visibility = "hidden"
        sizeP.style.opacity = 0
        return ""
    }
    for (element of data.size) {
        if (element.id.charAt(0) == firstLetter) {
            let sizeString = document.getElementById("p-size")
            sizeString.innerText = element.id
            sizeString.value = choosing ? type + element.id : element.id
            break
        }
    }
    data.size.forEach((element) => {
        if (element.id.charAt(0) == firstLetter) {
            let li = document.createElement('li')
            li.className = "li-drop-down"
            li.appendChild(document.createTextNode(element.id))
            dropdown.appendChild(li)
            li.onclick = function() {
                selected.innerText = li.innerText
                selected.value = choosing ? type + li.innerText : li.innerText
            }
        }
    })
}
btn_select_id.onclick = function() {
    if (list_id.style.visibility == "") {
        updateListID()
        list_id.style.zIndex = "1"
        list_id.style.visibility = "visible";
        list_id.style.opacity = "1";
        list_id.style.transitionDelay = "0s, 0s, 0.3s;"
        selected = document.getElementById("input-id")
        choosing = false
    } else {
        list_id.style.visibility = "";
        list_id.style.opacity = "0";
        // list_id.style.transition = "all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 1s linear 0.01s;"
    }
}

window.addEventListener("click", function(e) {
    if (!btn_select_id.contains(e.target)) {
        if (list_id.style.opacity == "1") {
            list_id.style.visibility = "";
            list_id.style.opacity = "0";
            // list_id.style.transition = "all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 1s linear 0.01s;"
        }
    }
})



//submitt import
function closeImportPage() {
    let back_import = document.getElementById("back-import-page-importprod")
    back_import.style.visibility = ""
    back_import.style.opacity = "0"
    back_import.style.transitionDelay = "0s, 0s, 0.3s;"
}

function openImportPage() {
    removeCheckBoxAndConfirmCancel()
    let back_import = document.getElementById("back-import-page-importprod")
    back_import.style.visibility = "visible";
    back_import.style.opacity = "1"
}
let submit_import = document.getElementById("submit-import")


let import_btn = document.getElementById("import-product")


window.addEventListener("click", function(e) {
    let back_import = document.getElementById("back-import-page-importprod")
        // console.log(document.getElementById("import-page-product").contains(e.target))
        // console.log(back_import.style.visibility)
    if (!import_btn.contains(e.target) && !document.getElementById("import-page-product").contains(e.target) && !(back_import.style.visibility == "hidden" || back_import.style.visibility == "")) {
        closeImportPage()
    }
})

//import all product
let submit_import_all = document.getElementById("btn-import")
submit_import_all.onclick = function() {
        if (detaill.length == 0) {
            alert("Bạn chưa thêm hàng!")
            return
        }
        let body = document.getElementById("body-input")
        let popup = document.createElement("div")
        popup.innerHTML = `
    <div id="big-background-confirm-input" style="position: fixed; background-color: rgba(0, 0, 0, 0.098); top: 0; bottom: 0;left: 0;right: 0;display: flex;justify-content: center;align-items: center;">
        <div id="background-confirm-input" style="padding: 10px; display: flex; justify-content: center; align-items: center; flex-direction: column; background-color: white; border: solid 1px black;">
            Bạn có chắc chắn muốn nhập ?
            <div>
                <button id="yes-input" style="margin-top: 5px; margin-bottom: 5px; margin-right: 5px;">Có</button>
                <button id="no-input" style="margin-top: 5px; margin-bottom: 5px;">Không</button>    
            </div>
        </div>
    </div>
    `
        body.appendChild(popup)

        function closePopUp() {
            popup.remove()
        }

        function clearTable() {
            let body_stuff = document.getElementById("body-table-stuff")
            body_stuff.innerHTML = ""
            document.getElementById("back-sum-money").innerHTML = "Tổng tiền: 0 VND"
        }

        function clearDetail() {
            detaill = []
        }

        function clearNote() {
            document.getElementById("note").value = ""
        }
        let btnYes = document.getElementById("yes-input")
        btnYes.onclick = function() {
            closePopUp()
            inputProd(detaill)
            clearTable()
            clearDetail()
            clearNote()
        }
        let btnNo = document.getElementById("no-input")
        btnNo.onclick = function() {
            closePopUp()
        }
    }
    // <th><input type="checkbox" class="checkbox" value="import-product-1"></th>

function clickBtnRemove() {
    addCheckBox()
    removeBtnRemove()
    addBtnConfirmRemove()
    addBtnCancelRemove()
}

function addCheckBox() {
    let rowTable = document.getElementsByClassName("row-table-admin")
    let th = document.createElement('th')
    th.id = "th-checkbox"
    rowTable[0].appendChild(th)
    for (let index = 1; index < rowTable.length; index++) {
        let checkbox_th = document.createElement('th')
        let checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.className = "checkbox"
        checkbox.value = "import-product-" + index
        checkbox_th.classList.add("checkbox-th")
        checkbox_th.appendChild(checkbox)
        checkbox.onchange = function() {
            let idandsize = detaill[index - 1].id + detaill[index - 1].size
            if (checkbox.checked) {
                arrRemove.push(idandsize)
            } else {
                arrRemove = arrRemove.filter(element => {
                    return element !== idandsize
                })
            }
        }
        rowTable[index].appendChild(checkbox_th)
    }
}

function addBtnRemove() {
    let back_button_left = document.getElementById("back-button-left")
    let btn = document.createElement("button")
    btn.classList.add("btn-left")
    btn.id = "remove-import-product"
    btn.innerHTML = "Xoá hàng"
    back_button_left.appendChild(btn)
    btn.onclick = clickBtnRemove
}

function removeCheckBoxAndConfirmCancel() {
    let checkboxs = document.getElementsByClassName("checkbox-th")
    let th = document.getElementById('th-checkbox')
    if (th != null) {
        th.remove()
    }
    while (checkboxs.length != 0) {
        checkboxs[0].remove()
    }
    let confirmBtn = document.getElementById("confirm-remove")
    let cancelBtn = document.getElementById("cancel-remove")
    if (confirmBtn != null && cancelBtn != null) {
        confirmBtn.remove()
        cancelBtn.remove()
        addBtnRemove()
    }

}

function removeBtnRemove() {
    let btn = document.getElementById("remove-import-product")
    btn.parentNode.removeChild(btn)
}

function addBtnConfirmRemove() {
    let back_button_left = document.getElementById("back-button-left")
    let btn = document.createElement("button")
    btn.classList.add("btn-left")
    btn.id = "confirm-remove"
    btn.innerHTML = "Xác nhận"
    back_button_left.appendChild(btn)
    btn.onclick = function() {
        arrRemove.forEach(element => {
            removeStuff(element)
            // document.getElementById(element).remove()
        })
        arrRemove = arrRemove.filter(function() {
            return false
        })
        removeCheckBoxAndConfirmCancel()
    }
}

function addBtnCancelRemove() {
    let back_button_right = document.getElementById("back-button-left")
    let btn = document.createElement("button")
    btn.classList.add("btn-left")
    btn.id = "cancel-remove"
    btn.innerHTML = "Hủy"
    back_button_right.appendChild(btn)
    btn.onclick = removeCheckBoxAndConfirmCancel
}

let remove_import_product_btn = document.getElementById("remove-import-product")
remove_import_product_btn.onclick = clickBtnRemove

//history import
function updateListHistory() {
    // <tr>
    //                             <th>ID phiếu</th>
    //                             <th>id nhân viên</th>
    //                             <th>tổng tiền</th>
    //                             <th><a class="detail">Chi tiết</a></th>
    //                         </tr>
    updateData
    let bodyList = document.getElementById("body-history-import")
    bodyList.innerHTML = ""
    data.input_product.forEach(element => {
        let tr = document.createElement("tr")
        let sum = 0
        element.detail.forEach(elementD => {
            sum += elementD.total_price
        })
        tr.innerHTML = `
            <th>` + element.id + `</th>
            <th>` + element.idStaff + `</th>
            <th>` + calculated(sum) + " VND" + `</th>` +
            `<th><a class="detail" id=detail` + element.id + ` value="` + element.id + `">Chi tiết</a></th>`
        bodyList.appendChild(tr)
        let btnDetail = document.getElementById("detail" + element.id)
        btnDetail.onclick = function() {
            //     <div id="big-background-detail-history" style="position: fixed; background-color: rgba(0, 0, 0, 0.098); top: 0; bottom: 0;left: 0;right: 0;display: flex;justify-content: center;align-items: center;">
            //     <div class="content-table" id="background-detail-history" style="padding-top: 10px;width: 80%;height:80%;display: flex; justify-content: flex-start; align-items: center; flex-direction: column; background-color: white; border: solid 1px black;">
            //         Chi tiết phiếu
            //         <table style="width: 95%; margin-top: 10px;">
            //             <thead>
            //                 <tr>
            //                     <th>ID</th>
            //                     <th>Tên sản phẩm</th>
            //                     <th>Số lượng</th>
            //                     <th>Size</th>
            //                     <th>Giá nhập</th>
            //                     <th>Thành tiền</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 <tr>
            //                     <th>NHAP0001</th>
            //                     <th>balo fjsdhf sdkfjh jshdkf sdjhfjsdf</th>
            //                     <th>10.000</th>
            //                     <th>AS</th>
            //                     <th>100.000.000</th>
            //                     <th>1.000.000.000.000₫</th>
            //                 </tr>
            //             </tbody>    
            //         </table>

            //     </div>
            // </div>   
            let bodyInput = document.getElementById("body-input")
            let divDetail = document.createElement("div")
            checkClickOutsideDetail = false
            divDetail.innerHTML = `<div id="big-background-detail-history" style="position: fixed; background-color: rgba(0, 0, 0, 0.098); top: 0; bottom: 0;left: 0;right: 0;display: flex;justify-content: center;align-items: center;">
                <div class="content-table" id="background-detail-history" style="padding-top: 10px;width: 80%;height:80%;display: flex; justify-content: flex-start; align-items: center; flex-direction: column; background-color: white; border: solid 1px black;">
                    Chi tiết phiếu
                    <table style="width: 95%; margin-top: 10px;">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Size</th>
                                <th>Giá nhập</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody id="body-table-detail">
                            
                        </tbody>    
                    </table>
                    
                </div>
            </div>`
            bodyInput.appendChild(divDetail)
            let bodyDetail = document.getElementById("body-table-detail")
            element.detail.forEach(elementD => {
                let tr = document.createElement("tr")
                tr.innerHTML = `<th>` + elementD.id + `</th>
                <th>` + elementD.name + `</th>
                <th>` + calculated(elementD.amount) + `</th>
                <th>` + elementD.size + `</th>
                <th>` + calculated(elementD.price) + " VND" + `</th>
                <th>` + calculated(elementD.total_price) + " VND" + `</th>`
                bodyDetail.appendChild(tr)
            })
            let big_back = document.getElementById("big-background-detail-history")
            big_back.onclick = function(e) {
                let back_content = document.getElementById("background-detail-history")
                if (!back_content.contains(e.target)) {
                    big_back.remove()
                    checkClickOutsideDetail = false
                }
            }
        }
    });
}

function openHistoryImport() {
    let history_import = document.getElementById("back-history-import-page")
    checkClickOutsideDetail = true
    if (history_import.style.visibility == "" || history_import.style.visibility == "hidden") {
        history_import.style.visibility = "visible"
        history_import.style.opacity = "1"
    }
    updateListHistory()
}

function closeHistoryImport() {
    let history_import = document.getElementById("back-history-import-page")
    let detail_history_import = document.getElementById("back-detail-import")
    if (detail_history_import.style.visibility != "" && detail_history_import.style.visibility != "hidden") {
        return
    }
    if (history_import.style.visibility == "visible") {
        history_import.style.visibility = "hidden"
        history_import.style.opacity = "0"
        history_import.style.transitionDelay = "0 0 0.2s"
    }
}

function openDetailHistoryImport() {
    let detail_history_import = document.getElementById("back-detail-import")
    if (detail_history_import.style.visibility == "" || detail_history_import.style.visibility == "hidden") {
        detail_history_import.style.visibility = "visible"
        detail_history_import.style.opacity = "1"
    }
}

function closeDetailHistoryImport() {
    let detail_history_import = document.getElementById("back-detail-import")
    if (detail_history_import.style.visibility == "visible") {
        detail_history_import.style.visibility = "hidden"
        detail_history_import.style.opacity = "0"
    }
}
let btn_history_import = document.getElementById("history-import-product")
btn_history_import.onclick = openHistoryImport


let btns_detail_history_import = document.getElementsByClassName("detail")
for (let index = 0; index < btns_detail_history_import.length; index++) {
    btns_detail_history_import[index].onclick = openDetailHistoryImport
}
let btn_delete_import = document.getElementById("delete-import")
btn_delete_import.onclick = closeDetailHistoryImport
window.addEventListener("click", function(e) {
    let history_page = document.getElementById("history-import-page")
    let detail_history_page = document.getElementById("detail-import")
    let back_detail_history = document.getElementById("big-background-detail-history")

    let checkClickDetail = false
    for (let index = 0; index < btns_detail_history_import.length; index++) {
        if (btns_detail_history_import[index].contains(e.target)) {
            checkClickDetail = true
            break
        }
    }
    if (back_detail_history == null && !btn_history_import.contains(e.target)) {
        // if () {

        // }
        if (checkClickOutsideDetail) {
            if (!history_page.contains(e.target)) {
                closeHistoryImport()
            }
            if (!detail_history_page.contains(e.target) && !checkClickDetail) {
                closeDetailHistoryImport()
            }
        }
        checkClickOutsideDetail = true
    }
})



// event

function Stuff(id, name, amount, size, price, total_price) {
    this.id = id
    this.name = name
    this.amount = amount
    this.size = size
    this.price = price
    this.total_price = total_price
    this.toJSON = {
        "idProd": this.id,
        "name": this.name,
        "amount": this.amount,
        "idSize": this.size,
        "price": this.price,
        "total": this.total_price
    }

}

function InputProduct(id, idStaff, dateInput, detail, note) {
    this.id = id
    this.idStaff = idStaff
    this.dateInput = dateInput
    this.detail = detail
    this.note = note
    this.toJSON = {
        "id": this.id,
        "idStaff": this.idStaff,
        "date_input": this.dateInput,
        "detail": this.detail,
        "note": this.note
    }
}

function ProdInStock(idInput, idProd, idSize, amount, price) {
    this.idInput = idInput
    this.idProd = idProd
    this.idSize = idSize
    this.amount = amount
    this.price = price
    this.toJSON = {
        "idInput": this.idInput,
        "idProd": this.idProd,
        "idSize": this.idSize,
        "amount": this.amount,
        "price": this.price
    }
}
// let arrStuff = Array.prototype.slice.call(localStorage.getItem("input-product"))


// fill 
function fillStuff() {
    // <tr class="row-table-admin">
    // <th >SP000000001</th>
    // <th >Áo hoodie</th>
    // <th >1.000</th>
    // <th >S</th>
    // <th >2.000.000</th>
    // <th >2.000.000.000</th>
    // <th><button class="delete-import-1-prod">Xóa</button></th>
    //                     </tr>
    let body_stuff = document.getElementById("body-table-stuff")
    if (body_stuff != null) {
        body_stuff.innerHTML = ""
        let sum = 0
        detaill.forEach(element => {
            let rowTable = document.createElement("tr")
            rowTable.className = "row-table-admin"
            rowTable.id = element.id + element.size
            rowTable.innerHTML = `
            <th >` + element.id + `</th>
            <th >` + element.name + `</th>
            <th >` + calculated(element.amount) + `</th>
            <th >` + element.size + `</th>
            <th >` + calculated(element.price) + " VND" + `</th>
            <th >` + calculated(element.total_price) + " VND" + `</th>
            <th><button class="delete-import-1-prod" value="` + element.id + element.size + `">Xóa</button></th>
            `
            sum += element.total_price
            body_stuff.appendChild(rowTable)

        })
        let total_total = document.getElementById("back-sum-money")
        let textNode = "Tổng tiền: " + calculated(sum) + " VND"
        total_total.innerHTML = textNode
        let arBtnDelete = document.getElementsByClassName("delete-import-1-prod")
        Array.prototype.slice.call(arBtnDelete).forEach(element => {
            element.onclick = function() {
                eventRemove(element.value)
            }
        })
    }
}
fillStuff()


// let detail = inp_prod
function writeToLocalStorageInputProduct(data) {
    try {
        JSON.parse(localStorage.setItem("input-product", JSON.stringify(data)))
    } catch (error) {
        console.log(error)
    }

}

function addStuff(id, name, amount, size, price, total_price) {
    let stuff = new Stuff(id, name, amount, size, price, total_price)
    detaill.push(stuff)
}

function removeStuff(idandidSize) {
    for (let index = 0; index < detaill.length; index++) {
        const element = detaill[index];
        if (element.id + element.size == idandidSize) {
            detaill.splice(index, 1)
            index -= 1
        }

    }
    fillStuff()
}

function initId() {
    if (data.input_product.length == 0) {
        return 'NHAP0001'
    }
    let id = data.input_product[data.input_product.length - 1].id
    let maxID = parseInt(id.replace('NHAP', ''))

    return 'NHAP' + String(maxID + 1).padStart(4, '0')
}

function inputProd(detail) {
    let note = document.getElementById("note").value
    let inp = new InputProduct(initId(), idLogin, getCurrentDate(), detail, note)
    addProdInStock(inp.id, detail)
    data.input_product.push(inp.toJSON)
    localStorage.setItem("data", JSON.stringify(data))
}

function addProdInStock(idInput, detail) {
    detail.forEach(e => {
        let prodInStock = new ProdInStock(idInput, e.id, e.size, e.amount, e.price)
        data.prodInStock.push(prodInStock.toJSON)
    })
}
// inputProd(detaill)
//event import
function eventImport() {

    let id = document.getElementById("input-id").value
    let name = ""
        // Array.prototype.splice.call(data.product).forEach(element => {
        //     console.log("ok")
        //     if (element.id == id) {
        //         name = element.name
        //     }
        // })
    data.product.forEach(element => {
        console.log("ok")
        if (element.id == id) {
            name = element.name
        }
    })
    let amount = document.getElementById("input-amount").value
    let size = document.getElementById("p-size").value
    let price = document.getElementById("input-price").value
    let total_price = price * amount
    if (name == "") {
        alert("ID không chính xác")
    } else {
        if (amount == "") {
            alert("Số lượng không được bỏ trống")
        } else {
            if (price == "") {
                alert("Giá nhập không được bỏ trống")
            } else {
                if (checkNumber(amount)) {
                    if (checkNumber(price)) {
                        let st = new Stuff(id, name, amount, size, price, total_price)
                        let haveInit = false
                        detaill.forEach(function(element, index) {
                            if (element.id == st.id && element.size == st.size) {
                                detaill[index].amount = Number(detaill[index].amount) + Number(st.amount)
                                detaill[index].total_price = Number(detaill[index].amount) * Number(detaill[index].price)
                                haveInit = true
                            }
                        })
                        if (!haveInit) {
                            detaill.push(st)
                        }
                        fillStuff()
                        closeImportPage()
                    } else {
                        alert("Giá tiền nhập chưa đúng định dạng")
                    }
                } else {
                    alert("Chỉ được nhập số")
                }
            }
        }

    }
}
//event remove
function eventRemove(idandidSize) {
    removeStuff(idandidSize)
    fillStuff()
}
submit_import.onclick = eventImport

import_btn.onclick = openImportPage


// màu sắc
// Lấy đối tượng input color và đối tượng input text
const colorPicker = document.querySelector("#change-color");
const textInput = document.querySelector("#inp-color");

// Bắt sự kiện khi người dùng chọn màu
colorPicker.addEventListener("input", () => {
  // Lấy mã màu được chọn
  const color = colorPicker.value;

  // Fill màu cho input text
  textInput.value = color;
});
textInput.addEventListener("input", () => {
    // Lấy giá trị màu được nhập
    const color = textInput.value;
  
    // Fill màu cho input color
    colorPicker.value = color;
  });
