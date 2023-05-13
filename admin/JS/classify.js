let obj33
async function FillClassify(){
    let current_user = getCurrentUser()
    data_server = to_form_data(current_user);
    obj33 = await get(data_server,'./Server/product/products.php')
    console.log(obj33);
    let tagtable = document.getElementById("myTable33")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < obj33.largeClassify.length; i++) {
        for(var j =0;j<obj33.largeClassify[i].miniClassify.length;j++){
            let tagrow = document.createElement("tr")
            tagrow.className="row-33"
            tagrow.innerHTML = `
            <td>` + obj33.largeClassify[i].miniClassify[j].id + `</td>
            <td>` + obj33.largeClassify[i].miniClassify[j].name+ `</td>
            <td> <button>Xóa</button></td>`
            tagtable.appendChild(tagrow)
        }

        
    }
}
function addCheckBox33() {
    let rowTable = document.getElementsByClassName("row-33");
    let count = 0
    for (var i = 0; i < obj33.largeClassify.length; i++){
        for (let index = 0; index < obj33.largeClassify[i].miniClassify.length; index++) {
            let checkbox_th = document.createElement("th");
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.className = "checkbox"
            checkbox.id =  obj33.largeClassify[i].miniClassify[index].id 
            checkbox_th.classList.add("checkbox-th");
            checkbox_th.appendChild(checkbox)
            checkbox_th.onchange = function() {
                if (checkbox.checked == true) {
                    arRemove.push(checkbox.id)
                } else {
                    arRemove = arRemove.filter(element => element != checkbox.id)
                }
            }
            rowTable[count].appendChild(checkbox_th);
            count++
        }
    }
}

function removeCheckBoxAndConfirmCancel33() {
    let checkboxs = document.getElementsByClassName("checkbox-th");
    while (checkboxs.length != 0) {
        checkboxs[0].remove();
    }
}
/// Loại sản phẩm

function OpenDeType() {
    document.getElementById("cancel33").style.display="block" ;
    document.getElementById("delete33").style.display="none" ;
    document.getElementById("delete34").style.display="block" ;
    addCheckBox33();
}

function CloseDeType() {
    document.getElementById("cancel33").style.display="none" ;
    document.getElementById("delete33").style.display="block" ;
    document.getElementById("delete34").style.display="none" ;
    removeCheckBoxAndConfirmCancel33()
}

function ConfirmDele(){

    CloseDeType()
}
// Thêm loại
document.getElementById("add_type").onclick = function () {
    document.getElementById("add_type_pro").style.display = "flex";
    document.getElementById("type_name").value=" ";
    OpenDialog33();
    AddOptionSelect()
};


document.getElementById("close5").onclick = function () {
    document.getElementById("add_type_pro").style.display = "none";
     document.getElementById("type-select").innerHTML=` `
    CloseDialog33();
};

function AddOptionSelect(){
    let select = document.getElementById("type-select")
    for(let i=0; i<obj33.largeClassify.length;i++){
        let option = document.createElement("option")
        option.appendChild(document.createTextNode(obj33.largeClassify[i].name))
        option.value =obj33.largeClassify[i].id;
        select.appendChild(option)
    }
    
} 

async function AddtypeToServer(){
    let nametype = document.getElementById("type_name").value.trim();
    let type = document.getElementById("type-select").value.toUpperCase();
    let gender =document.querySelector('input[name="gender-cls"]:checked').value
    let id = nametype
    console.log(nametype)
    id = removeAccents(id).replaceAll(' ','').toUpperCase()
    console.log(id)
    
    if( nametype=""){
        alert(" Tên loại không được bỏ trống")
    }
    else{
        if(id.indexOf("AO")==-1){
            id= "AO"+id
        }
        let current_user = getCurrentUser();
        let data_post_server = {
        id_user: current_user.id_user,
        password: current_user.password,
        name: nametype,
        id_big_classify: type,
        gender:gender,
        id: id
    };
    let form_data = to_form_data(data_post_server);
    alert(await post(
        form_data,
        "./Server/classify/create_classify.php"
    ));
    document.getElementById("type-select").innerHTML=` `
    document.getElementById("add_type_pro").style.display = "none";
    CloseDialog33();
    FillClassify();
    }
    
}

function removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substring(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }