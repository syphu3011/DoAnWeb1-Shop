async function FillClassify(){
    let obj = await get_Data()
    console.log(obj);
    let tagtable = document.getElementById("myTable33")
    for (let i = tagtable.rows.length - 1; i > 0; i--)
        tagtable.deleteRow(i);
    for (var i = 0; i < obj.largeClassify.length; i++) {
        for(var j =0;j<obj.largeClassify[i].miniClassify.length;j++){
            let tagrow = document.createElement("tr")
            tagrow.innerHTML = `
            <td>` + obj.largeClassify[i].miniClassify[j].id + `</td>
            <td>` + obj.largeClassify[i].miniClassify[j].name+ `</td>
            <td> <button>Xóa</button></td>`
            tagtable.appendChild(tagrow)
        }

        
    }
}