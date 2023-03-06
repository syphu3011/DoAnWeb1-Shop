let arrImageAdd = []
let arrImageEdit = []
let arRemove = []
let prodToEdit
let checkClickClose = false
function arrayToString(arr) {
    let result;
    for (let i = 0; i < arr.length; i++) {
        if (i > 0) {
        result += ',';
        }
        if (typeof arr[i] === 'object') {
        result += JSON.stringify(arr[i]);
        }
    }
    return result;
}
    //animation
function animationFadeIn(element) {
    let id = setInterval(frame, 20);
    if (element.style.opacity == "") {
        element.style.opacity = 0;
    }
    var opa = 0;

    function frame() {
        if (element.style.opacity < 1) {
            opa += 0.1;
            element.style.opacity = opa;
        } else {
            clearInterval(id);
        }
    }
}

function animationFadeOut(element) {
    let id = setInterval(frame, 20);
    if (element.style.opacity == "") {
        element.style.opacity = 1;
    }

    function frame() {
        if (element.style.opacity > 0) {
            element.style.opacity -= 0.1;
        } else {
            clearInterval(id);
            element.remove();
        }
    }
}

function addCheckBox1() {
    let rowTable = document.getElementsByClassName("row");
    for (let index = 0; index < rowTable.length; index++) {
        let checkbox_th = document.createElement("th");
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.className = "checkbox"
        checkbox.id = obj.product[index].id
        checkbox_th.classList.add("checkbox-th");
        checkbox_th.appendChild(checkbox)
        checkbox_th.onchange = function() {
            if (checkbox.checked == true) {
                arRemove.push(checkbox.id)
            } else {
                arRemove = arRemove.filter(element => element != checkbox.id)
            }
        }
        rowTable[index].appendChild(checkbox_th);
    }
}

function removeCheckBoxAndConfirmCancel1() {
    let checkboxs = document.getElementsByClassName("checkbox-th");
    while (checkboxs.length != 0) {
        checkboxs[0].remove();
    }
}

// Sửa sản phẩm

document.getElementById("close4").onclick = function() {
    document.getElementById("input_ID").style.visibility = "hidden";
    CloseDialog();
};

document.getElementById("o_edit").onclick = function() {
    document.getElementById("edit_pro").style.visibility = "visible";
    document.getElementById("input_ID").style.visibility = "hidden";
    OpenDialog();
};


document.getElementById("close2").onclick = function() {
    document.getElementById("edit_pro").style.visibility = "hidden";
    document.getElementById("image-div2").innerHTML = ""
    edit = []
    arrImageEdit = arrImageEdit.filter(() => true == false)
    document.getElementById("add-type-edit").innerHTML = ""
    CloseDialog();
};

// Chi tiết sản phẩm
// document.getElementById("detail").onclick = function () {
//     document.getElementById("detail_pro").style.visibility = 'visible';
//     document.getElementById("dialog4").style.display='block';
// };
document.getElementById("close3").onclick = function() {
    document.getElementById("detail_pro").style.visibility = "hidden";
    document.getElementById("dialog4").style.display = "none";
    document.getElementById("amount-table").innerHTML = ""
    document.getElementById("type-div").innerHTML = ""
};

function switch_image(x) {
    x.src = "Image/add_black.png";
}

function switch_default(x) {
    x.src = "Image/add.png";
}

//Tìm kiếm
let btn_filter = document.getElementById("filter");
let type9 = ["Tất cả", "ID", "Tên", "0"];
let made_in = ["Tất cả", "Việt Nam", "Trung Quốc", "Singapore", "0"];
let price = ["Tất cả", "0 - 200k", "200k - 400k", "400k-600k", "600k trở lên", "0"];
let amount = ["Tất cả", "0 - 100", "101 - 300", "301-600", "601-900", "901 trở lên", "0"];
let statuss = ["Tất cả", "Đang bán", "Hết hàng", "0"];
let allFilter = [type9, made_in, amount, statuss];

function createSelect(data1, id) {
    let select = document.createElement("select");
    select.id = id
    select.className = "btn_select select_filter";
    data1.forEach(function(value, index) {
        if (index != data1.length - 1) {
            let option = document.createElement("option");
            option.value = index;
            option.text = value;
            if (index == data1[data1.length - 1]) {
                option.setAttribute("selected", true);
            }
            select.appendChild(option);
        }
    });
    return select.outerHTML;
}

function addEventToSelectFilter() {
    let selects = document.getElementsByClassName("select_filter");
    Array.prototype.slice.call(selects).forEach(function(element, index) {
        element.onchange = function() {
            let selected = allFilter[index];
            selected[selected.length - 1] = "" + element.value;
        };
    });
}

function eventCloseFilter(e) {
    let dialog = this.document.getElementById("dialog-s");
    let filterBack = this.document.getElementById("background-filter-inside");
    let filterBigBack = this.document.getElementById("background-filter");
    let typebox = this.document.getElementById("type_list");

    if (!checkClickClose &&
        !filterBack.contains(e.target) &&
        !btn_filter.contains(e.target) &&
        !dialog.contains(e.target) &&
        !typebox.contains(e.target)
    ) {
        filterBigBack.remove();
        window.removeEventListener("click", eventCloseFilter);
    }
    checkClickClose = false
}

function openFilter() {
    let background_prod = document.getElementById("background-prod");
    let element = document.createElement("div");
    element.innerHTML =
        `<div id="background-filter">
        <div id="background-filter-inside"> 
            <div class="background-name">
                Bộ lọc
            </div>
            <div class="tag_select">
                <div class="find_all1">
                    <p class="text_find">Tìm theo:</p>
                    ` +
        createSelect(type9, "type") +
        `
                </div>
                <div class="find_all1">
                    <p class="text_find">Xuất xứ:</p>` +
        createSelect(made_in, "made-in") +
        `                    
                </div>
                <div class="find_all1">
                    <p class="text_find">Số lượng:</p>
                    ` +
        createSelect(amount, "amount") +
        `
                </div>
                <div class="find_all1">
                    <p class="text_find">Trạng thái:</p>
                    ` +
        createSelect(statuss, "status") +
        `
                </div>
            </div>
            <div class="box_type">
                <div class="type">
                    Loại:
                    <button onclick=BoxSelect() id="add-exist-classify" style="font-size:10px; padding: 2px; height: 22px; margin-left: 5px;">Thêm loại</button>
                </div>
                <div class="type_list" id="type_list">
                </div>
            </div>
        </div>
    </div>`;


    background_prod.appendChild(element);
    find.forEach(e => {
        let ele = document.createElement("p");
        ele.classList.add("item-tag");
        ele.appendChild(document.createTextNode(e));
        let tag = document.createElement("button");
        tag.classList.add("close_type");
        tag.appendChild(document.createTextNode("X"));
        ele.appendChild(tag);
        tag.style.cursor = "pointer"
        tag.onclick = function() {
            find.splice(CheckTagType(ele, find), 1);
            ele.remove();
            checkClickClose = true
        }
        document.getElementById("type_list").appendChild(ele)
    })
    addEventToSelectFilter();
    window.addEventListener("click", eventCloseFilter);
}
btn_filter.onclick = openFilter;
//thêm  sản phẩm
let ar = {
    product: [{
        id: "sp01",
        name: "sản phẩm 1",
        made_in: "Việt Nam",
        description: "sản phẩm đầu tiên",
        price: "2.000.000",
        images: ["", ""],
        classify: ["Áo", "Áo"],
        status: "Đang bán",
    }, ],
};

function toLocalStorage(setjson) {
    localStorage.setItem("data", setjson);
}

function writeToLocalStorage(arr) {
    const setjson = JSON.stringify(arr);
    toLocalStorage(setjson);
}
// localStorage.clear()
// writeToLocalStorage(ar)
//data prod

//fill sản phẩm
let obj = null;

function findSumAmount(id) {
    let amount = 0
    obj.prodInStock.forEach(element => {
        if (element.idProd == id) {
            amount += parseInt(element.amount)
        }
    })
    return amount
}

function fillEdit(prod) {
    document.getElementById("edit-id").value = prod.id
    document.getElementById("edit-name").value = prod.name
    document.getElementById("edit-price").value = prod.price
    document.getElementById("edit-made-in").value = prod.made_in
    document.getElementById("edit-des").value = prod.description
    document.getElementById("confirm").onclick = function() {
        createPopUpYesNo("Bạn có muốn sửa lại thông tin không ?", function() {
            document.getElementById("image-div2").innerHTML = ""
            document.getElementById("edit_pro").style.visibility = "hidden";
            prod.name = document.getElementById("edit-name").value
            prod.price = document.getElementById("edit-price").value
            prod.made_in = document.getElementById("edit-made-in").value
            prod.description = document.getElementById("edit-des").value
            prod.clasify = edit
            prod.images = arrImageEdit
            edit = []
            document.getElementById("add-type-edit").innerHTML = ""
            updateProd(prod)
            arrImageEdit = arrImageEdit.filter(() => true == false)

            CloseDialog();
            fillProd(obj.product)
        }, function() {})
    };
    prod.clasify.forEach(e => {
        AddTagType(document.getElementById("add-type-edit"), edit, true, e)
    })
    prod.images.forEach(e => {
        arrImageEdit.push(e)
        let btnRemove = document.createElement("button")
        btnRemove.className = "add_type"
        btnRemove.style.position = "absolute"
        btnRemove.textContent = "X"
        let img_div1 = addImg(e, "image-div2")
        img_div1.appendChild(btnRemove)
        img_div1.style.position = "relative"
        btnRemove.style.right = "-5px"
        btnRemove.style.top = "15px"
        btnRemove.style.width = "10px"
        btnRemove.style.height = "10px"
        btnRemove.onclick = function() {
            img_div1.remove()
            btnRemove.remove()
            arrImageEdit = arrImageEdit.filter(ele => ele != e)
            prod.images = arrImageEdit
        }

    })
}

async function fillProd(product = null) {
    if (product == null) {
        await refreshData()
        product = obj.product
        console.log(product)
    }
    let table = document.getElementById("table-prod");
    table.innerHTML = ""
    let row_head = document.createElement("tr")
    row_head.className = "first-row"
    row_head.innerHTML = `
<th>ID</th>
<th>Tên sản phẩm</th>
<th>Xuất xứ</th>
<th>loại</th>
<th>Tổng số lượng</th>
<th>Giá bán</th>
<th>Chi tiết</th>
<th>Trạng thái</th>
<th></th>
<th></th>
`
    hideRemove()
    table.appendChild(row_head)
    product.forEach((prod) => {
        if (prod.status != "0") {
            try {
                let clasify 
                clasify = prod.clasify
                if (Array.isArray(clasify)) {
                    clasify = arrayToString(clasify);
                }
                let row = document.createElement("tr");
                row.className = "row";
                row.innerHTML +=
                    "<th>" +
                    prod.id +
                    "</th><th>" +
                    prod.name +
                    "<th>" +
                    prod.made_in +
                    "</th>" +
                    "</th><th>" +
                    clasify +
                    "</th><th>" + calculated(findSumAmount(prod.id)) + "</th><th>" +
                    calculated(prod.price) + " VND" +
                    "</th>" +
                    '<th id="detail-' +
                    prod.id +
                    '">Chi tiết</th><th>' +
                    (prod.status == 1 ? "Đang bán" : "Ngừng bán") +
                    '</th><th><button id="remove' +
                    prod.id +
                    '">Xóa</button></th></th><th><button id="update' +
                    prod.id +
                    '">Sửa</button></th>';
                table.appendChild(row);
                document.getElementById("detail-" + prod.id).onclick = function() {
                    document.getElementById("dialog4").style.display = "block";
                    document.getElementById("detail_pro").style.visibility = "visible";
                    fillDetail(prod.id)
                }
                document.getElementById("remove" + prod.id).onclick = function() {
                    createPopUpYesNo("Bạn có muốn xóa sản phẩm này hay không ?", function() {
                        if (!removeProd(prod.id)) {
                            alert("Bạn không thể xóa sản phẩm còn hàng!")
                        }
                        fillProd()
                    }, function() {})

                }
                document.getElementById("update" + prod.id).onclick = function() {
                    document.getElementById("edit_pro").style.visibility = "visible";
                    OpenDialog();
                    fillEdit(prod)
                }
            } catch (e) {
                console.log(e);
            }
        }

    })
}
// try {
//     fillProd();
// } catch (error) {
//     console.log(error);
// }

function Prod(id, name, made_in, description, price, images, classify, status) {
    this.id = id;
    this.name = name;
    this.made_in = made_in;
    this.description = description;
    this.price = price;
    this.images = images;
    this.clasify = classify;
    this.status = status;
    this.toJSON = {
        id: this.id,
        name: this.name,
        made_in: this.made_in,
        description: this.description,
        price: this.price,
        images: this.images,
        clasify: this.clasify,
        status: this.status,
    };
}
//thêm sửa sản phẩm code
function get_Data() {
    return $.ajax({
        url: './Server/product/products.php',
        type: 'GET',
        dataType: 'json',
        data: "json_product"
    })
}
async function refreshData() {
    try {
            response_data = await get_Data().then(function(responseData) {
            // Xử lý dữ liệu trả về
            return responseData
        }).catch(function(error) {
            // Xử lý lỗi
            console.error(error);
        });
        obj = response_data
        console.log(obj);
    } catch (error) {
        console.log(error);
    }
}
function compareTwoVar(id1, id2) {
    return id1 == id2;
}

function checkConstraintAddProd(Prod) {
    obj.product.forEach((prod) => {
        if (
            compareTwoVar(prod.id, Prod.id) ||
            compareTwoVar(prod.name, Prod.name)
        ) {
            return false;
        }
    });
    return true;
}

function checkConstraintUpdateProd(Prod) {
    obj.product.forEach((prod) => {
        if (
            compareTwoVar(prod.name, Prod.name) &&
            !compareTwoVar(prod.id, Prod.id)
        ) {
            return false;
        }
    });
    return true;
}

function initId1(clasify) {
    let id = ""
    let max = 0
    obj.largeClassify.forEach(element => {
        element.miniClassify.forEach(elementMini => {
            if (elementMini.name == clasify) {
                id = elementMini.id
                return
            }
        })
        if (id != "") {
            return
        }
    })
    obj.product.forEach(element => {
        if (element.id.toLowerCase().indexOf(id.toLowerCase()) != -1) {
            max = parseInt(element.id.replace(id, ""))
        }
    })
    return id + String(max + 1).padStart(4, "0")
    // return "1";
}

async function addProd(Prod) {
    refreshData();
    console.log(JSON.stringify(Prod.toJSON));
    if (checkConstraintAddProd(Prod)) {
        $.ajax({
            type: 'Post',
            url: './Server/product/create_product.php',
            data: JSON.stringify(Prod.toJSON),
            contentType:'application/json; charset=utf-8;',
            dataType: 'json',
            success: function(jqXHR, textStatus, errorThrown) {       
            //   alert("saved");
                console.log("Request failed: " + textStatus + ", " + errorThrown);
                alert("Request failed: " + textStatus + ", " + errorThrown);
            //   window.location = "http://localhost/DoAnWeb1-Shop/admin/Server/product/create_product.php"
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // window.location = "http://localhost/DoAnWeb1-Shop/admin/Server/product/create_product.php"
                console.log("Request failed: " + textStatus + ", " + errorThrown);
                alert("Request failed: " + textStatus + ", " + errorThrown);
            }
            });
        // obj.product.push(Prod.toJSON);
        // writeToLocalStorage(obj);
    }
    await fillProd();
}

async function updateProd(Prod) {
    await refreshData();
    if (checkConstraintUpdateProd(Prod)) {
        obj.product.forEach(function(part, index) {
            if (compareTwoVar(Prod.id, this[index].id)) {
                this[index] = Prod;
                return true;
            }
        }, obj.product);
        writeToLocalStorage(obj);
    }
    return false;
}
//event thêm sản phẩm
document.getElementById("add").onclick = function() {
    document.getElementById("add_pro").style.visibility = "visible";
    OpenDialog();
};

function blank(id) {
    document.getElementById(id).innerHTML = ""
    document.getElementById(id).value = ""
}

function createPopUpYesNo(script, functionOnClickYes, functionOnClickNo) {
    let background = document.createElement("div")
    background.style.position = "fixed"
    background.style.right = 0
    background.style.left = 0
    background.style.bottom = 0
    background.style.top = "0"
    background.style.width = "100%"
    background.style.height = "100%"
    background.style.display = "flex"
    background.style.alignItems = "center"
    background.style.justifyContent = "center"
    background.style.backgroundColor = "rgba(0,0,0,0.25)"
    let divAsk = document.createElement("div")
        // divAsk.style.width = "60%"
        // divAsk.style.height = "60%"
    divAsk.style.padding = "20px"
    divAsk.innerHTML = script
    divAsk.style.display = "flex"
    divAsk.style.flexDirection = "column"
    divAsk.style.justifyContent = "center"
    divAsk.style.alignItems = "center"
    divAsk.style.backgroundColor = "white"
    divAsk.style.border = "1px solid black"
    let divBoundBtn = document.createElement("div")
    divBoundBtn.style.display = "flex"
    let btnYes = document.createElement("button")
    btnYes.style.padding = "5px"
    btnYes.style.marginTop = "10px"
    btnYes.style.marginRight = "3px"
    btnYes.id = "btnYesAdd"
    btnYes.innerHTML = "Có"
    let btnNo = document.createElement("button")
    btnNo.style.padding = "5px"
    btnNo.style.marginTop = "10px"
    btnNo.id = "btnNoAdd"
    btnNo.innerHTML = "Không"
    btnNo.style.marginLeft = "3px"
    divBoundBtn.appendChild(btnYes)
    divBoundBtn.appendChild(btnNo)
    divAsk.appendChild(divBoundBtn)
    background.appendChild(divAsk)
    document.getElementById("background-prod").appendChild(background)
    btnYes.onclick = function() {
        functionOnClickYes()
        background.remove()
    }
    btnNo.onclick = function() {
        functionOnClickNo()
        background.remove()
    }
}

function checkNumber(str) {
    // for (let i = 0; i < str.length; i++) {
    //     if (obj.variable[1].var3.indexOf(str[i]) == -1) {
    //         return false
    //     }
    // }
    return true
}
document.getElementById("submit").onclick = function() {
    //   document.getElementById("add_pro").style.visibility = "hidden";
    //   CloseDialog();
    // if (add.length == 0) {
    //     alert("Bạn phải chọn loại")
    //     return
    // }
    // if (arrImageAdd.length == 0) {
    //     alert("Bạn phải thêm ảnh")
    //     return
    // }
    if (checkNumber(document.getElementById("inp-price").value.toLowerCase())) {
        createPopUpYesNo("Bạn có muốn thêm sản phẩm này không ?", function(background) {
            let name = document.getElementById("inp-name").value.toLowerCase()
            let price = document.getElementById("inp-price").value.toLowerCase()
            let made_in = document.getElementById("inp-made-in").value.toLowerCase()
            let des = document.getElementById("add-des").value.toLowerCase()
            if (name == "" || price == "" || made_in == "") {
                alert("Không thể bỏ trống tên, giá và xuất xứ")
                return
            }
            let prod = new Prod(initId1(add[0]), name, made_in, des, price, arrImageAdd, add, 1)
            addProd(prod)
            blank("inp-name")
            blank("inp-price")
            blank("inp-made-in")
            blank("add-des")
            document.getElementById("add-pro-type").innerHTML = ""
            arrImageAdd = arrImageAdd.filter(e => true == false)
            document.getElementById("image-div").innerHTML = ""
            add = add.filter(e => true == false)
            arrImageAdd = arrImageAdd.filter(e => true == false)
            let itemTypes = document.getElementsByClassName("item-tag")
            Array.prototype.slice(itemTypes).forEach(element => {
                element.remove()
            })
            document.getElementById("add_pro").style.visibility = "";
            CloseDialog()

        }, function() {

        })
    } else {
        alert("Giá tiền chưa đúng định dạng")
    }
};

document.getElementById("close").onclick = function() {
    document.getElementById("add_pro").style.visibility = "hidden";
    CloseDialog();
};

function OpenDialog() {
    document.getElementById("dialog4").style.display = "block";
}

function CloseDialog() {
    document.getElementById("dialog4").style.display = "none";

}

function addType() {
    let inp = document.getElementById("choose-img-prod");
    inp.click();
    inp.onchange = function() {
        let name_img = String(inp.value);
        console.log(`C:\\fakepath\\`);
        name_img = name_img.replace(`C:\\fakepath\\`, ``);
        console.log(name_img);

        arrImageAdd.push(name_img)
        let btnRemove = document.createElement("button")
        btnRemove.className = "add_type"
        btnRemove.style.position = "absolute"
        btnRemove.textContent = "X"
        let img_div1 = addImg(name_img)
        img_div1.appendChild(btnRemove)
        img_div1.style.position = "relative"
        btnRemove.style.right = "-5px"
        btnRemove.style.top = "15px"
        btnRemove.style.width = "10px"
        btnRemove.style.height = "10px"
        btnRemove.onclick = function() {
            img_div1.remove()
            btnRemove.remove()
            arrImageAdd = arrImageAdd.filter(ele => ele != name_img)
        }
    };
}

function addTypeEdit() {
    let inp = document.getElementById("choose-img-prod");
    inp.click();
    inp.onchange = function() {
        let name_img = String(inp.value);
        console.log(`C:\\fakepath\\`);
        name_img = name_img.replace(`C:\\fakepath\\`, ``);
        console.log(name_img);

        arrImageEdit.push(name_img)
        let btnRemove = document.createElement("button")
        btnRemove.className = "add_type"
        btnRemove.style.position = "absolute"
        btnRemove.textContent = "X"
        let img_div1 = addImg(name_img)
        img_div1.appendChild(btnRemove)
        img_div1.style.position = "relative"
        btnRemove.style.right = "-5px"
        btnRemove.style.top = "15px"
        btnRemove.style.width = "10px"
        btnRemove.style.height = "10px"
        btnRemove.onclick = function() {
            img_div1.remove()
            btnRemove.remove()
            arrImageAdd = arrImageAdd.filter(ele => ele != name_img)
        }
    };
}

function addImg(name_img, idDiv = "image-div") {
    let img_div = document.getElementById(idDiv);
    let img_div1 = document.createElement("li");
    img_div.className = "div-img-prod1";
    img_div1.className = "div-img-prod2";
    img_div1.id = "image-li";
    let img = document.createElement("img");
    img.className = "img-prod";
    img_div.appendChild(img_div1);
    img_div1.appendChild(img);
    img.src = "./Image/" + name_img;
    return img_div1
}
let btn_add_img = document.getElementById("add-img");
btn_add_img.onclick = addType;
let btn_add_img_edit = document.getElementById("add-img12");
btn_add_img_edit.onclick = addTypeEdit;

function addProdBtnEven() {
    let id = addProd;
}
// Xóa sản phẩm
function removeProd(id) {
    let returnVar = true
    obj.product.forEach(function(part, index) {
        if (compareTwoVar(id, this[index].id)) {
            if (findSumAmount(id) == 0) {
                this[index].status = "0";
                returnVar = returnVar == false ? false : true
                writeToLocalStorage(obj)
                return
            } else {
                returnVar = false
                return
            }
        }
    }, obj.product);
    return returnVar
}

async function removeSomeProd(ids) {
    refreshData()
    let checkExistThanZero = true
    for (const id of ids) {
        let checkRemove = removeProd(id)
        checkExistThanZero = checkExistThanZero == false ? false : checkRemove;
    }
    if (!checkExistThanZero) {
        alert("Có sản phẩm không thể xóa được vì còn số lượng")
    }
    writeToLocalStorage(obj)
    await fillProd()
}

function createPopUpAcceptCancel(title) {
    let back_popup = document.createElement("div");
    back_popup.innerHTML =
        '<div id="popup6"><div style="background-color: white; padding-left: 30px;padding-right: 30px; padding-top: 5px; padding-right: 10px; display: flex; align-items: center; flex-direction: column; border: solid 1px;"><p>' +
        title +
        '</p><div style="width: 50%;  display: flex; justify-content: space-around; align-items: center; margin: 20px;"><button id="delete-all" >Có</button><button id="cancel-delete">Không</button></div></div></div>';
    return back_popup;
}

function appearRemove() {
    addCheckBox1();
    document.getElementById("cancel").style.visibility = "visible";
    document.getElementById("delete2").innerHTML = "Xác nhận xóa";
}

function hideRemove() {
    document.getElementById("cancel").style.visibility = "hidden";
    document.getElementById("delete2").innerHTML = "Xóa sản phẩm";
    removeCheckBoxAndConfirmCancel1();
}

function hidePopup() {
    let popup = document.getElementById("popup6");
    popup.remove();
}

document.getElementById("delete2").onclick = function() {
    if (document.getElementById("cancel").style.visibility != "visible") {
        appearRemove();
    } else {
        if (arRemove.length == 0) {
            alert("Bạn phải chọn sản phẩm để xóa!")
        } else {
            createPopUpYesNo("Bạn có muốn xóa các sản phẩm này không?", function() {
                removeSomeProd(arRemove)
                arRemove = []
            }, function() {})
        }
    }
};
document.getElementById("cancel").onclick = hideRemove;


// for (prod in obj.product) {

// }

// Thêm loại
document.getElementById("add_type").onclick = function() {
    document.getElementById("add_type_pro").style.visibility = "visible";
    OpenDialog();
};

document.getElementById("accept").onclick = function() {
    document.getElementById("add_type_pro").style.visibility = "hidden";
    CloseDialog();
    AddType();
};
document.getElementById("close5").onclick = function() {
    document.getElementById("add_type_pro").style.visibility = "hidden";
    CloseDialog();
};
// function initId123(type, name, index) {
//     if (type == null || type == "" || name == null || name == "") return
//     let s = ""
//     let arrSplit = name.split(" ")
//     s += type
//     arrSplit.forEach(element => {
//         s += element.charAt(0)
//     }) 
//     s = s.toUpperCase()
//     let count = 0
//     obj.largeClassify[index].miniClassify.forEach(element => {
//         let temp = element.id
//         if(!isNaN(parseInt(temp.toUpperCase().replace(s, "")))) {
//             count += 1
//         }
//     })
//     s += ("" + count)
//     return s
// }
// function AddType() {
//     let nametype = document.getElementById("type_name").value;
//     let elm = document.createElement("option");
//     elm.appendChild(document.createTextNode(nametype));
//     elm.value = nametype;
//     if (document.getElementById("type-select").value.toLowerCase() == "ao") {
//         document.getElementById("select_a").appendChild(elm);
//         obj.largeClassify[0].miniClassify.push({id:initId123("AO", nametype, 0),name: nametype})
//     } else if (document.getElementById("type-select").value.toLowerCase() == "quan") {
//         document.getElementById("select_q").appendChild(elm);
//         obj.largeClassify[1].miniClassify.push({id:initId123("QUAN", nametype, 1),name: nametype})
//     } else {
//         document.getElementById("select_p").appendChild(elm);
//         obj.largeClassify[2].miniClassify.push({id:initId123("PK", nametype, 2),name: nametype})
//     }
//     writeToLocalStorage(obj)
// }

// Chọn loại
function BoxSelect() {
    document.getElementById("select").style.visibility = "visible";
    document.getElementById("dialog-s").style.display = "block";
    let select_big = document.getElementById("select_big")
    for (const option of select_big.options) {
        option.remove()
    }
    for (const iterator of obj.largeClassify) {
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(iterator.name);
        newOption.appendChild(optionText)
        newOption.setAttribute('value', iterator.id)
        select_big.appendChild(newOption)
    }
    select_big.onchange = function() {select(select_big)}
}

document.getElementById("close6").onclick = function() {
    document.getElementById("select").style.visibility = "hidden";
    document.getElementById("dialog-s").style.display = "none";
    // ReloadSelect();
};
document.getElementById("okay").onclick = function() {
    document.getElementById("select").style.visibility = "hidden";
    document.getElementById("dialog-s").style.display = "none";
    if (document.getElementById("add_pro").style.visibility == "visible") {
        AddTagType(document.getElementById("add-pro-type"), add);
    } else if (
        document.getElementById("edit_pro").style.visibility == "visible"
    ) {
        AddTagType(document.getElementById("add-type-edit"), edit, true);
    } else {
        AddTagType(document.getElementById("type_list"), find, true);
    }
};

// Thêm tag loạif
let add = [];
let find = [];
let edit = [];

function CheckTagType(type, a) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] == type) {
            return i;
        }
    }
    return -1;
}

function AddTagType(idtag, a, useList = false, content = "") {
    let ele = document.createElement("p");
    ele.classList.add("item-tag");
    if (content != "") {
        ele.appendChild(document.createTextNode(content));
        let tag = document.createElement("button");
        tag.classList.add("close_type");
        tag.appendChild(document.createTextNode("X"));
        ele.appendChild(tag);
        tag.onclick = function() {
            a.splice(CheckTagType(type, a), 1);
            ele.remove();
            checkClickClose = true
        };
        if (!useList) {
            a.splice(0, a.length)
        }
        a.push(content)
    } else {
        if (document.getElementById("select_big").value == "ao") {
            let type = document.getElementById("select_a").value;
            if (CheckTagType(type, a) >= 0) {
                return;
            } 
            else {
                ele.appendChild(document.createTextNode(type));
                let tag = document.createElement("button");
                tag.classList.add("close_type");
                tag.appendChild(document.createTextNode("X"));
                ele.appendChild(tag);
                tag.onclick = function() {
                    a.splice(CheckTagType(type, a), 1);
                    ele.remove();
                    checkClickClose = true
                };
                if (!useList) {
                    a.splice(0, a.length)
                }
                a.push(type)
            }
        } else if (document.getElementById("select_big").value == "quan") {
            let type = document.getElementById("select_q").value;
            if (CheckTagType(type, a) >= 0) {
                return;
            } else {
                ele.appendChild(document.createTextNode(type));
                let tag = document.createElement("button");
                tag.classList.add("close_type");
                tag.appendChild(document.createTextNode("X"));
                ele.appendChild(tag);
                tag.onclick = function() {
                    a.splice(CheckTagType(type, a), 1);
                    ele.remove();
                    checkClickClose = true
                };
                if (!useList) {
                    a.splice(0, a.length)
                }
                a.push(type)
            }
        } else {
            let type = document.getElementById("select_p").value;
            if (CheckTagType(type, a) >= 0) {
                return;
            } else {
                ele.appendChild(document.createTextNode(type));
                let tag = document.createElement("button");
                tag.classList.add("close_type");
                tag.appendChild(document.createTextNode("X"));
                ele.appendChild(tag);
                tag.onclick = function() {
                    a.splice(CheckTagType(type, a), 1);
                    ele.remove();
                    checkClickClose = true
                };
                if (!useList) {
                    a.splice(0, a.length)
                }
                a.push(type)
            }
        }

    }
    if (useList) {
        idtag.appendChild(ele)
    } else {
        idtag.innerHTML = ""
        idtag.appendChild(ele)
    }
}

function select(str) {
    switch (str.value.toLowerCase()) {
        case "ao":
            document.getElementById("select_a").style.display = "block";
            document.getElementById("select_q").style.display = "none";
            document.getElementById("select_p").style.display = "none";
            break;
        case "quan":
            document.getElementById("select_a").style.display = "none";
            document.getElementById("select_q").style.display = "block";
            document.getElementById("select_p").style.display = "none";
            break;
        case "phukien":
            document.getElementById("select_a").style.display = "none";
            document.getElementById("select_q").style.display = "none";
            document.getElementById("select_p").style.display = "block";
            break;
    }
}

function fillType() {
    let aTypeSelect = document.getElementById("select_a")
    let qTypeSelect = document.getElementById("select_q")
    let pTypeSelect = document.getElementById("select_p")
    let strA = ""
    let strQ = ""
    let strP = ""
        //fillA
    obj.largeClassify[0].miniClassify.forEach(element => {
        strA += `<option value="` + element.name + `">` + element.name + `</option>`
    })
    aTypeSelect.innerHTML = strA
        //fillQ
    obj.largeClassify[1].miniClassify.forEach(element => {
        strQ += `<option value="` + element.name + `">` + element.name + `</option>`
    })
    qTypeSelect.innerHTML = strQ
        //fillP
    // obj.largeClassify[1].miniClassify.forEach(element => {
    //     strP += `<option value="` + element.name + `">` + element.name + `</option>`
    // })
    // aTypeSelect.innerHTML = strA
    // qTypeSelect.innerHTML = strQ
    // pTypeSelect.innerHTML = strP
}
// fillType()

function fillDetail(id) {
    let prod = null
    obj.product.forEach(element => {
        if (element.id == id) {
            prod = new Prod(id, element.name, element.made_in, element.description, element.price, element.images, element.clasify, element.status)
        }
    })
    if (prod == null) {
        console.log("khoong cos san pham");
        return
    }
    let amountAr = []
    let sizeAr = []
    obj.prodInStock.forEach(element => {
        if (element.idProd == id) {
            let isExist = false
            sizeAr.forEach((elementS, index) => {
                if (elementS == element.idSize) {
                    isExist = true
                    amountAr[index] += parseInt(element.amount)
                    return
                }
            })
            if (!isExist) {
                sizeAr.push(element.idSize)
                amountAr.push(parseInt(element.amount))
            }
        }
    })
    document.getElementById("detail-id").value = prod.id
    document.getElementById("detail-name").value = prod.name
    document.getElementById("detail-price").value = prod.price
    document.getElementById("detail-made-in").value = prod.made_in
    let table_amount = document.getElementById("amount-table")
    let thead = document.createElement("thead")
    let tr1 = document.createElement("tr")
    tr1.innerHTML = `<td>Size</td>` + `<td>Số lượng</td>`
    thead.appendChild(tr1)
    table_amount.appendChild(thead)
    sizeAr.forEach((element, index) => {
        let tbody = document.createElement("tbody")
        let tr = document.createElement("tr")
        tr.innerHTML = `<td>` + element + `</td>` + `<td>` + amountAr[index] + `</td>`
        tbody.appendChild(tr)
        table_amount.appendChild(tbody)
    })
    document.getElementById("type-div").innerHTML += "<p>" + prod.clasify[0] + "</p>"
    document.getElementById("image-div1").innerHTML = ""
    prod.images.forEach(element => {
        addImg(element, "image-div1")
    })
}
//tim kiem
document.getElementById("lookup-btn").onclick = findProdAction

async function findProdAction() {
    let idOrName = type9[parseInt(type9[type9.length - 1])].toLowerCase().trim()
    let madein = made_in[parseInt(made_in[made_in.length - 1])].toLowerCase().trim()
    let amountString = amount[parseInt(amount[amount.length - 1])].toLowerCase().trim().replace("trở lên", "").replaceAll(" ", "").replaceAll("k", "").split("-")
    let status = statuss[parseInt(statuss[statuss.length - 1])].toLowerCase().trim()

    status = status == "tất cả" ? "" : status
    if (status == "đang bán") {
        status = "1"
    } else if (status == "hết hàng") {
        status = "0"
    }
    idOrName = idOrName == "tất cả" ? "" : idOrName
    madein = madein == "tất cả" ? "" : madein

    let nameAndId = document.getElementById("inp-lookup").value
    let arProd = []
    if (amountString.length < 2) {
        try {
            let min = parseInt(amountString[0])
            console.log(min != null);

            if (min != null && !isNaN(min)) {
                arProd = findProd(idOrName, nameAndId, nameAndId, madein, min, 9999999999, status, find)
            } else {
                arProd = findProd(idOrName, nameAndId, nameAndId, madein, 0, 9999999999, status, find)
            }
        } catch (e) {
            arProd = findProd(idOrName, nameAndId, nameAndId, madein, 0, 9999999999, status, find)
        }
    } else {
        arProd = findProd(idOrName, nameAndId, nameAndId, madein, parseInt(amountString[0]), parseInt(amountString[1]), status, find)
    }
    await fillProd(arProd)
}

function findProd(idOrName, id, name, made_in, amountMin, amountMax, status, classify) {
    let arProd = []
    obj.product.forEach(element => {
        if ((checkStringFind(element.id, id) && (idOrName == "id" || idOrName == "")) || (checkStringFind(element.name, name) && (idOrName == "name" || idOrName == ""))) {
            if (checkStringFind(element.made_in, made_in) && checkStringFind(element.status, status) && checkAmount(element, amountMin, amountMax) && checkClassify(element, classify)) {
                arProd.push(element)
            }
        }
    });
    return arProd
}

function checkStringFind(string, string1) {
    if (string1 == "") {
        return true
    }
    if (string)
        try {
            if (typeof string === "string") {
                if (string.toLowerCase().indexOf(string1.toLowerCase()) != -1) {
                    return true
                }
            } else {
                if (string.toString().toLowerCase().indexOf(string1.toLowerCase()) != -1) {
                    return true
                }
            }
        }
    catch (e) {
        console.log(e)
    }
    return false
}

function checkClassify(element, clasify) {
    if (clasify.length == 0) {
        return true
    }
    let returnVar = false
    clasify.forEach(e => {
        if (checkStringFind(e, element.clasify[0])) {
            returnVar = true
        }
    })
    return returnVar
}

function checkAmount(element, amountMin, amountMax) {
    let amount = findSumAmount(element.id)
    if (amount >= amountMin && amount <= amountMax) {
        return true
    }
    return false
}
    
