let obj222 = JSON.parse(localStorage.getItem("data"))
AddColumn()
function AddColumn(){
    let tagtable =document.getElementById("table-admin")
    let lengt= obj222.history.length
    for(let i = tagtable.rows.length - 1; i > 0; i--)
    tagtable.deleteRow(i);
    for(var i=0; i<lengt;i++){
        let tagrow = document.createElement("tr")
        tagrow.classList.add("row-tabl-admin")
        tagrow.innerHTML=`
        <th style="width: 20%;">`+obj222.history[i].name+`</th>
        <th style="width: 60%;">`+obj222.history[i].content+`</th>
        <th style="width: 20%;">`+obj222.history[i].date+`</th>`
        tagtable.appendChild(tagrow)
    }

}

function checkValidPhoneNumber(number) {
let data=JSON.parse(localStorage.getItem("data"))
    
    if (data.variable[1].var1.indexOf(number[0]) != -1) {
        if ((number.length != 12)) {
            return false
        }
        if (data.variable[2].var1 != number.slice(0, 3)) {
            return false
        }
        for (let i = 3; i < number.length; i++) {
            if (data.variable[1].var3.indexOf(number[i]) == -1) {
                return false
            }
        }
        return true
    }
    if (number[0] == data.variable[1].var2) {
        if ((number.length != 10)) {
            return false
        }
        for (let i = 1; i < number.length; i++) {
            if (data.variable[1].var3.indexOf(number[i]) == -1) {
                return false
            }
        }
        return true
    }
    return false
}
function checkDate(birthday) {
    let data=JSON.parse(localStorage.getItem("data"))
    if (parseInt(getCurrentDate().split(" ")[0].split("/")[2]) - parseInt(birthday.split("-")[0].split("/")[2]) < parseInt(data.variable[3].gh_duoi) ||
        parseInt(getCurrentDate().split(" ")[0].split("/")[2]) - parseInt(birthday.split("-")[0].split("/")[2]) > parseInt(data.variable[3].gh_tren)) {
        return false
    }
    return true
}function checkValidNameU(f_name, l_name) {
let data=JSON.parse(localStorage.getItem("data"))
    f_name = f_name.replaceAll(" ", "")
    l_name = l_name.replaceAll(" ", "")
    for (let i = 0; i < f_name.length; i++) {
        if (f_name[i].charCodeAt(0) < data.variable[2].var1 || (f_name[i].charCodeAt(0) < data.variable[2].var3 && f_name[i].charCodeAt(0) > data.variable[2].var2) || (f_name[i].charCodeAt(0) > data.variable[2].var4 && f_name[i].charCodeAt(0) < data.variable[2].var5)) {
            return false
        }

    }
    for (let i = 0; i < l_name.length; i++) {
        if (l_name[i].charCodeAt(0) < 65 || (l_name[i].charCodeAt(0) < 97 && l_name[i].charCodeAt(0) > 90) || (l_name[i].charCodeAt(0) > 122 && l_name[i].charCodeAt(0) < 239)) {
            return false
        }
    }
    return true
}
