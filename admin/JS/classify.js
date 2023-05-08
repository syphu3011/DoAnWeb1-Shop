function FillClassify(){
    let obj = get_Data()
    let tagtable = document.getElementById("myTable33")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < obj.largeClassify.length; i++) {
        for(var j =0;j<obj.largeClassify[i].miniClassify.length;j++){
            let tagrow = document.createElement("tr")
            tagrow.innerHTML = `
            <td>` + receipt[i].id + `</td>
            <td>` + receipt[i].id_customer+ `</td>
            <td> <button>Xóa</button></td>`
            tagtable.appendChild(tagrow)
        }

        
    }
}