let arrImageAdd = []
let arrImageEdit = []
let arRemove = []
let prodToEdit
let checkClickClose = false
let countt=0
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
    tag_type_edit = []
    arrImageEdit = arrImageEdit.filter(() => true == false)
    document.getElementById("add-type-edit").innerHTML = ""
    countt==0
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
    tag_type_find.forEach(e => {
        countt ++
        let ele = document.createElement("p");
        ele.classList.add("item-tag");
        ele.appendChild(document.createTextNode(e));
        let tag = document.createElement("button");
        tag.classList.add("close_type");
        tag.id="type" + countt
        tag.appendChild(document.createTextNode("X"));
        ele.appendChild(tag);
        tag.style.cursor = "pointer"
        tag.onclick = function() {
            tag_type_find.splice(CheckTagType(ele, tag_type_find), 1);
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
    let image_delete = []
    document.getElementById("edit-id").value = prod.id
    document.getElementById("edit-name").value = prod.name
    document.getElementById("edit-made-in").value = prod.made_in
    document.getElementById("edit-des").value = prod.description
    document.getElementById("add-type-pro-e").onclick = function () {
        BoxSelect()
    }
    document.getElementById("confirm").onclick = function() {
        createPopUpYesNo("Bạn có muốn sửa lại thông tin không ?", async function() {
            if (document.getElementById("edit-name").value.trim() == "") {
                alert("Không thể bỏ trống tên!")
                return 
            }
            if (tag_type_edit.length == 0) {
                alert("Không thể bỏ trống loại!")
                return 
            }
            if (arrImageEdit.length == 0) {
                alert("Không thể bỏ trống hình ảnh!")
                return 
            }
            // image 
            // if ()
            document.getElementById("image-div2").innerHTML = ""
            document.getElementById("edit_pro").style.visibility = "hidden";
            prod.name = document.getElementById("edit-name").value
            prod.made_in = document.getElementById("edit-made-in").value
            prod.description = document.getElementById("edit-des").value
            prod.clasify = tag_type_edit
            prod.images = arrImageEdit
            prod.idstatus = 'TT01'
            document.getElementById("add-type-edit").innerHTML = ""
            await updateProd(prod, image_delete)
            tag_type_edit = []
            arrImageEdit = arrImageEdit.filter(() => true == false)
            countt=0
            CloseDialog();
            await fillProd()
        }, function() {})
    };
    let classifies = prod.clasify.split(',')
    classifies.forEach(e => {
        AddTagType(document.getElementById("add-type-edit"), tag_type_edit, true, e)
    })
    remove_all_image()
    let count = 0
    if (typeof prod.images == 'string') {
        let images = prod.images.split(',')
        images.forEach(e => {
            arrImageEdit.push(e)
            add_item_of_image("./Image/"+e, 'image-div2',count,'btn_rm_'+e, function(){
                image_delete.push(e)
                arrImageEdit = arrImageEdit.filter(value => value != e)
            })
            // document.getElementById('btn_rm_'+e).onclick = function() {
            //     image_delete.push(e);
            // }
            count += 1
        })
    }
}

async function fillProd(product = null) {
    await refreshData()
    product = obj.product
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
        if (prod.idstatus != "0") {
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
                    (prod.price != null ? calculated(prod.price) + " VND" : "Chưa có") +
                    "</th>" +
                    '<th id="detail-' +
                    prod.id +
                    '">Chi tiết</th><th>' +
                    (prod.idstatus == "TT01" ? "Đang bán" : "Ngừng bán") +
                    '</th><th><button id="remove' +
                    prod.id +
                    '">Xóa</button></th></th><th><button id="update' +
                    prod.id +
                    '">Sửa</button></th>';
                table.appendChild(row);
                document.getElementById("detail-" + prod.id).onclick = function() {
                    document.getElementById("dialog4").style.display = "flex";
                    document.getElementById("detail_pro").style.visibility = "visible";
                    fillDetail(prod.id)
                }
                document.getElementById("remove" + prod.id).onclick = function() {
                    createPopUpYesNo("Bạn có muốn xóa sản phẩm này hay không ?", async function() {
                        if (prod.amount > 0) {
                            alert("Bạn không thể xóa sản phẩm còn hàng!")
                        }
                        let current_user = getCurrentUser()
                        let data_post_server = {id: prod.id, id_user: current_user.id_user, password: current_user.password}
                        let form_data = to_form_data(data_post_server)
                        alert(await delete_data(form_data, './Server/product/delete_product.php'))
                        await fillProd()
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
}
//thêm sửa sản phẩm code
async function get_Data() {
    let data_server = {id_user: 'USR001'}
    data_server = to_form_data(data_server);
    return await get(data_server,'./Server/product/products.php')
}

async function refreshData() {
    try {
        let current_user = getCurrentUser()
        data_server = to_form_data(current_user);
        obj = await get(data_server,'./Server/product/products.php')
        if (obj == errors) {
            block_access('Bạn không có quyền truy cập vào sản phẩm!')
            return
        }
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
    refreshData()
    for (const element of obj.largeClassify) {
        let pos = clasify.toLowerCase().indexOf(element.id.toLowerCase())
        if (pos == 0) {
            id = element.id
            break
        }
    }
    let last_product = obj.product[obj.product.length - 1]
    let last_id = ""
    let last_char

    for (const product of obj.product) {
        if (product.id.toLowerCase().indexOf(id.toLowerCase()) == 0) {
            last_id = product.id
        }
        else {
            if (last_id != "") {
                break
            }
        }
    }
    for (let i = 0; i < last_id.length; i++) {
        let num_check = parseInt(last_id.charAt(i))
        if (!Number.isNaN(num_check)) {
            const current_num = parseInt(last_id.split(last_char)[1])
            if (max < current_num) {
                max = current_num
            }
            break
        }
        else {
            last_char = last_id.charAt(i)
        }
    }
    return id + String(max + 1).padStart(8, "0")
    // return "1";
}
function to_form_data(object) {
    var formData = new FormData();

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            formData.append(key, object[key]);
        }
    }

    return formData;
}

function to_form_data_with_name(objects, name) {
    var formData = new FormData();

    for (const key in objects) {
        formData.append(name, objects[key]);
    }

    return formData;
}
function to_form_data_have_image(object, name_form_for_images, files) {
    var formData = new FormData();

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            formData.append(key, object[key]);
        }
    }
    for (var index = 0; index < files.length; index++) {
        formData.append(name_form_for_images, files[index]);
     }
    return formData;
}
function getUsername() {
    return ''
}
async function addProd(Prod) {
    await refreshData();
    console.log(JSON.stringify(Prod));
    let totalfiles = document.getElementById('choose-img-prod').files;
    if (totalfiles.length == 0) {
        alert('Không thể bỏ trống hình ảnh!');
        return
    }
    if (checkConstraintAddProd(Prod)) {
        var form_data = new FormData();

        // Prod.images = totalfiles
        let current_user = getCurrentUser();
        form_data = to_form_data_have_image(Prod, "images_ar[]", totalfiles);
        form_data.append('id_user',current_user.id_user)
        form_data.append('password',current_user.password)
        let response = await post(form_data,'./Server/product/create_product.php');
        alert(response);
        document.getElementById('choose-img-prod').value = ''
    }

    await fillProd();
}


async function updateProd(Prod, remove_image = null) {
    await refreshData();
    // if (checkConstraintUpdateProd(Prod)) {
    //     obj.product.forEach(function(part, index) {
    //         if (compareTwoVar(Prod.id, this[index].id)) {
    //             this[index] = Prod;
    //             return true;
    //         }
    //     }, obj.product);
    //     // writeToLocalStorage(obj);
    // }
    Prod.clasify
    var form_data = new FormData();
    let totalfiles = document.getElementById('choose-img-prod').files;

    // Prod.images = totalfiles
    let current_user = getCurrentUser();
    form_data = to_form_data_have_image(Prod, "images_ar[]", totalfiles);
    form_data.append('id_user',current_user.id_user)
    form_data.append('id_password',current_user.password)
    if (remove_image != null) {
        remove_image.forEach(e => {
            form_data.append('image_delete', e)    
        })
    }
    alert(await put(form_data, './Server/product/update_product.php'))
    // return false;
}
//event thêm sản phẩm
document.getElementById("add").onclick = function() {
    document.getElementById("add_pro").style.visibility = "visible";
    document.getElementById("image-div").innerHTML = ''
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
    // if (checkNumber(document.getElementById("inp-price").value.toLowerCase())) {
    createPopUpYesNo("Bạn có muốn thêm sản phẩm này không ?", function(background) {
        let name = document.getElementById("inp-name").value.toLowerCase()
        let des = document.getElementById("add-des").value.toLowerCase()
        if (name == "") {
            alert("Không thể bỏ trống tên!")
            return
        }
        if (tag_type_add.length == 0) {
            alert('Không thể bỏ trống loại sản phẩm!')
        }
        let prod = new Prod(initId1(tag_type_add[0]), name, made_in, des, 0, "", tag_type_add, 1)
        addProd(prod)
        blank("inp-name")
        // blank("inp-price")
        blank("inp-madein")
        blank("add-des")
        document.getElementById("add-pro-type").innerHTML = ""
        // arrImageAdd = arrImageAdd.filter(e => true == false)
        document.getElementById("image-div").innerHTML = ""
        tag_type_add = tag_type_add.filter(e => true == false)
        arrImageAdd = arrImageAdd.filter(e => true == false)
        let itemTypes = document.getElementsByClassName("item-tag")
        Array.prototype.slice(itemTypes).forEach(element => {
            element.remove()
        })
        document.getElementById("add_pro").style.visibility = "";
        countt = 0
        CloseDialog()

    }, function() {

    })
    // } else {
    //     alert("Giá tiền chưa đúng định dạng")
    // }
};

document.getElementById("close").onclick = function() {
    document.getElementById("add_pro").style.visibility = "hidden";
    countt =0
    CloseDialog();
};

function OpenDialog() {
    document.getElementById("dialog4").style.display = "flex";
}

function CloseDialog() {
    document.getElementById("dialog4").style.display = "none";

}
function add_img_files(files, count) {
    var reader = new FileReader();
    reader.readAsDataURL(files[count]);
    reader.onload = function() {
        add_item_of_image(reader.result, 'image-div',count)
        arrImageEdit.push(reader.result)
        if (files.length > count + 1) {
            add_img_files(files, count + 1)
        }
    }
}
async function addType(is_editing = false) {
    let inp = document.getElementById("choose-img-prod");
    inp.click();
    inp.onchange = function() {
        remove_all_image()
        add_img_files(inp.files, 0)
    };
}
//đang làm ở đây
function addTypeEdit() {
    document.querySelectorAll(".remove_img").forEach(function(e){
        e.click()
    })
    let inp = document.getElementById("choose-img-prod");
    inp.click();
    inp.onchange = function() {
        let name_img = String(inp.value);
        // console.log(`C:\\fakepath\\`);
        // name_img = name_img.replace(`C:\\fakepath\\`, ``);
        // console.log(name_img);
        arrImageEdit = arrImageEdit.filter(e => true == false)
        remove_all_image()
        add_img_files(inp.files, 0)
    };
}
function add_item_of_image(name_img, div, count, id_button = '', func = function() {}) {
    let btnRemove = document.createElement("button")
    if (id_button != '') {
        btnRemove.id = id_button
    }
    btnRemove.className = "add_type remove_img"
    btnRemove.style.position = "absolute"
    btnRemove.textContent = "X"
    let img_div1 = addImg(name_img, div, count)
    img_div1.appendChild(btnRemove)
    img_div1.style.position = "relative"
    btnRemove.style.right = "-5px"
    btnRemove.style.top = "15px"
    btnRemove.style.width = "10px"
    btnRemove.style.height = "10px"
    btnRemove.onclick = function(){
        func()
        remove_image(img_div1, btnRemove, name_img)
    }
}
function remove_image(img_div1, btnRemove, name_img) {
    img_div1.remove()
    btnRemove.remove()
    // arrImageAdd = arrImageAdd.filter(ele => ele != name_img)
}
function remove_all_image() {
    document.querySelectorAll(".remove_img").forEach(function(e){
        e.click()
    })
}

function addImg(name_img, idDiv = "image-div", count) {
    let img_div = document.getElementById(idDiv);
    let img_div1 = document.createElement("li");
    img_div.className = "div-img-prod1";
    img_div1.className = "div-img-prod2";
    img_div1.id = "image-li-"+count;
    let img = document.createElement("img");
    img.className = "img-prod";
    img_div.appendChild(img_div1);
    img_div1.appendChild(img);
    img.src = name_img;
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
// function removeProd(id) {
//     let returnVar = true
//     obj.product.forEach(function(part, index) {
//         if (compareTwoVar(id, this[index].id)) {
//             if (findSumAmount(id) == 0) {
//                 this[index].status = "0";
//                 returnVar = returnVar == false ? false : true
//                 writeToLocalStorage(obj)
//                 return
//             } else {
//                 returnVar = false
//                 return
//             }
//         }
//     }, obj.product);
//     return returnVar
// }

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
    document.getElementById("add_type_pro").style.display = "flex";
    OpenDialog33();
};

document.getElementById("accept").onclick = function() {
    document.getElementById("add_type_pro").style.display = "none";
    CloseDialog33();
    // AddType();
};
document.getElementById("close5").onclick = function() {
    document.getElementById("add_type_pro").style.display = "none";
    CloseDialog33();
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
    for (const i = 0; i < select_big.options.length;) {
        select_big.options[i].remove()
    }
    for (const iterator of obj.largeClassify) {
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(iterator.name);
        newOption.appendChild(optionText)
        newOption.setAttribute('value', iterator.id)
        select_big.appendChild(newOption)
    }
    fillType(select_big.value)
    select_big.onchange = function() {
        fillType(select_big.value)
    }
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
        AddTagType(document.getElementById("add-pro-type"), tag_type_add, true);
    } else if (
        document.getElementById("edit_pro").style.visibility == "visible"
    ) {
        AddTagType(document.getElementById("add-type-edit"), tag_type_edit, true);
    } else {
        AddTagType(document.getElementById("type_list"), tag_type_find, true);
    }
};

// Thêm tag loạif
let tag_type_add = [];
let tag_type_find = [];
let tag_type_edit = [];

function CheckTagType(type, a, isEditing = false) {
    if (a.length > 0 && !isEditing) {
        for(const classify of obj.largeClassify) {
            if (a[0].toLowerCase().indexOf(classify.id.toLowerCase()) == 0) {
                if (type.toLowerCase().indexOf(classify.id.toLowerCase()) != 0 || type.toLowerCase().indexOf(classify.id.toLowerCase()) == -1) {
                    alert("Phải cùng loại lớn\n Ví dụ: Chọn là áo sơ mi thì không được chọn thêm quần dài")
                    return -2
                }
            }
        }
    }
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
        countt++
        ele.appendChild(document.createTextNode(content));
        let tag = document.createElement("button");
        tag.id= "type"+ countt
        tag.classList.add("close_type");
        tag.appendChild(document.createTextNode("X"));
        ele.appendChild(tag);
        tag.onclick = function() {
            a.splice(CheckTagType(type, a, true), 1);
            ele.remove();
            checkClickClose = true
        };
        if (!useList) {
            a.splice(0, a.length)
        }
        a.push(content)
    } else {
        let big_type = document.getElementById("select_big").value
        let type = document.getElementById("select_classify").value;
        let check = CheckTagType(type, a)
        if (check >= 0 || check < -1) {
            return;
        } 
        else {
            countt ++
            ele.appendChild(document.createTextNode(document.getElementById("select_classify").selectedOptions[0].getAttribute("name")));
            let tag = document.createElement("button");
            tag.classList.add("close_type");
            tag.id= "type"+ countt
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
    if (useList) {
        idtag.appendChild(ele)
    } else {
        idtag.innerHTML = ""
        idtag.appendChild(ele)
    }
}


function fillType(big_classify) {
    let typeSelect = document.getElementById("select_classify")
    let str = ""
        //fillA
    let save_current_large_classify
    for (const element of obj.largeClassify) {
        if (element.id.toLowerCase() === big_classify.toLowerCase()) {
            save_current_large_classify = element
            break
        }
    }
    save_current_large_classify.miniClassify.forEach(element => {
        str += `<option value="` + element.id + `" name="`+element.name+`">` + element.name + `</option>`
    })
    typeSelect.innerHTML = str
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
        console.log("Không có sản phẩm");
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
    document.getElementById("txt-detail-product").textContent = prod.description
    remove_all_image()
    let count = 0
    let images = prod.images.split(',')
    images.forEach(element => {
        addImg("./Image/"+element, "image-div1", count)
        count += 1
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
                arProd = findProd(idOrName, nameAndId, nameAndId, madein, min, 9999999999, status, tag_type_find)
            } else {
                arProd = findProd(idOrName, nameAndId, nameAndId, madein, 0, 9999999999, status, tag_type_find)
            }
        } catch (e) {
            arProd = findProd(idOrName, nameAndId, nameAndId, madein, 0, 9999999999, status, tag_type_find)
        }
    } else {
        arProd = findProd(idOrName, nameAndId, nameAndId, madein, parseInt(amountString[0]), parseInt(amountString[1]), status, tag_type_find)
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


function OpenDialog33() {
    document.getElementById("dialog33").style.display = "flex";
}

function CloseDialog33() {
    document.getElementById("dialog33").style.display = "none";

}


/// Loại sản phẩm

function OpenDeType() {
    document.getElementById("cancel33").style.display="block" ;
}

function CloseDeType() {
    document.getElementById("cancel33").style.display="none" ;
}

// Giá sản phẩm
document.getElementById("edit-price").onclick = function() {
    document.getElementById("table-edit-price").style.visibility = "visible";
    OpenDialog();
    GetListPrice()
    FillPrice();
};
document.getElementById("close78").onclick = function() {
    document.getElementById("table-edit-price").style.visibility = "hidden";
    CloseDialog();
};
function OpenDialog78() {
    document.getElementById("dialog78").style.display = "flex";
}

function CloseDialog78() {
    document.getElementById("dialog78").style.display = "none";

}
document.getElementById("close79").onclick = function() {
    document.getElementById("edit-price-new").style.visibility = "hidden";
    CloseDialog78();
};

let listProd
let arr = []
async function GetListPrice() {
    let current_user = getCurrentUser()
    data_server = to_form_data(current_user);
    listProd = await get(data_server,'./Server/product/product_list.php')
    if (listProd == errors) {
        block_access('Bạn không có quyền truy cập vào sản phẩm!')
        return
    }
}

function FillPrice() {
    console.log(listProd)
    let tagtable = document.getElementById("table-price")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < listProd.length; i++) {
            let color = listProd[i].id_color;
            let tagrow = document.createElement("tr")
            tagrow.innerHTML = `
            <td>` + listProd[i].id_product + `</td>
            <td>` + GetNameProduct(listProd[i].id_product)+ `</td>
            <td>` + listProd[i].id_size.substring(2) + `</td>
            <td><input type="color" value="` + color + `" disabled></td>
            <td>` + calculated(listProd[i].price) + ` VNĐ</td>
            <td><button onclick=EditPrice("`+ i +`") >Sửa</button></td>`
            tagtable.appendChild(tagrow)
    }
}

function EditPrice(v){
    document.getElementById("edit-price-new").style.visibility = "visible";
    OpenDialog78();
    document.getElementById("tile-edit-price").innerHTML = `Thay Đổi giá sản phẩm `+listProd[v].id_product;
    document.getElementById("price-old").value= listProd[v].price;
    document.getElementById("price-new").focus();
    document.getElementById("accept-price-new").onclick = function(){
        if(document.getElementById("price-new")==" "){
            alert("Bạn chưa nhập giá mới")
        }
        else{
            arr.push(v)
            listProd[v].price=document.getElementById("price-new").value
            CloseDialog78();
            FillPrice()
        }

    }
}

function GetNameProduct(id){
    console.log(obj);
    for(let i=0;i<obj.product.length;i++){
        if(obj.product[i].id==id){
            return obj.product[i].name
        }
    }
}

async function AcceptPrice(){
    if(arr.length==0){
        alert("Không có gì thay đổi")
    }
    for(let i = 0; i<arr.length;i++){
        let current_user = getCurrentUser()
        let data_post_server = { id_product: listProd[arr[i]].id_product,
            id_size: listProd[arr[i]].id_size,
            id_color: listProd[arr[i]].id_color,
            price: listProd[arr[i]].price,
            id_user: current_user.id_user, 
            password: current_user.password }
        let form_data = to_form_data(data_post_server)
        await put(form_data, './Server/product/product_list_change_price.php')
    }
    arr.splice(0,arr.length)
    document.getElementById("edit-price-new").style.visibility = "hidden";
    CloseDialog78();
}

document.getElementById("cancel-price").onclick = function() {
document.getElementById("edit-price-new").style.visibility = "hidden";
arr.splice(0,arr.length)
CloseDialog78();
}

