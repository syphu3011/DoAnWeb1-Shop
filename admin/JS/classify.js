let obj33
async function FillClassify(){
     obj33 = await get_Data()
    console.log(obj);
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