
function GetDataSize(){
    return $.ajax({
        type: "POST",
        url: './Server/size/sizes.php',
        data: {id_user: "USR001"},
        dataType: "json",
        success: function(response) {
            console.log(response.sizes);
        },
        error: function() {
            alert('Lỗi khi lấy danh sách kích thước!');
        }
    });
}
GetDataSize();

function FillSize(){
    GetDataSize().then(function(size) {
        let table = document.getElementById("myTable2")
        if(table.rows.length>0){
            for(let i = table.rows.length - 1; i  > 0; i--)
            table.deleteRow(i);
            for(let i = 0; i < size.sizes.length; i++){
                let row = table.insertRow();
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
        
                cell0.innerHTML = size.sizes[i].id;
                cell1.innerHTML = size.sizes[i].id.substring(2);
                cell2.innerHTML = `<p class="detail" onclick=onDetail(this)>chi tiết</p>`
                cell3.innerHTML = `<button onclick='onDel(this)'>Xóa</button>  
                <button id="edit">Sửa</button>`;
            }
        }
        else{
            let table = document.getElementById("myTable2")
            for(let i = 0; i < size.sizes.length; i++){
                let row = table.insertRow();
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
        
                cell0.innerHTML = size.sizes[i].id;
                cell1.innerHTML = size.sizes[i].id.substring(2);
                cell2.innerHTML = `<p class="detail" onclick=onDetail(this)>chi tiết</p>`
                cell3.innerHTML = "<button onclick='onDel(this)'>Xóa</button>";
            }
        }
    }).catch(function(error) {
       console.log(error)
    });
}
// document.getElementById("delete1").onclick = function () {
//     let table = document.getElementById("myTable2")
//     for(let i = table.rows.length - 1; i  > 0; i--)
//     table.deleteRow(i);
//     for(let i = 0; i < arrKT.length; i++){
//         let obj = arrKT[i];
//         let row = table.insertRow();
//         let cell0 = row.insertCell(0);
//         let cell1 = row.insertCell(1);
//         let cell2 = row.insertCell(2);
//         let cell3 = row.insertCell(3);

//         cell0.innerHTML = obj.id;
//         cell1.innerHTML = obj.name;
//         cell2.innerHTML = `<p class="detail" onclick=onDetail(this)>chi tiết</p>`
//         cell3.innerHTML = "<button onclick='onDel(this)'>Xóa</button>";
//     }
// };
function onDel(el){
    let row = el.parentElement.parentElement;
    let iD = row.cells[0].innerText;
    let table = document.getElementById("myTable2");
    
    
}

document.getElementById("add1").onclick = function () {
    document.getElementById("newScr").innerHTML =`
    <div id="dialog1">
        <div class="select" id="select_add">
            <button class="close" id="close23">X</button>
            <label class="title">Chọn loại</label>
            <button onclick='shirt()'>Áo</button>
            <button onclick='pants()'>Quần</button>
        </div>
    </div>
    `
    document.getElementById("dialog1").onclick = function(t){
        if (t.target.matches("dialog1")) {
            document.getElementById("dialog1").remove();
        }
        }
    document.getElementById("close23").onclick = function(){
        document.getElementById("dialog1").remove();
    }
}

function shirt(){
    document.getElementById("newScr").innerHTML=`
    <div id="dialog1">
        <div id="add_size">
            <div class="box" id="add_shirt">
                <button class="close" id="close23">X</button>
                <label class="title" for="">Thêm kích thước áo</label>
                <div class="ID2">
                    <label for="">ID</label>
                    <input type="text" readonly>
                </div> 
                <div class="name_s">
                    <label for="">Tên kích thước</label>
                    <input id="tenKichThuoc" type="text">
                </div>
                <div class="number_size">
                    <div class="num_detail_left">
                        <div class="num2">
                            <label for="">Số đo bụng</label>
                            <input id="soDoBung" type="text">
                        </div>
                    </div>
                    <div class="num_detail_right">
                        <div class="num3">
                            <label for="">Số đo lưng</label>
                            <input id="soDoLung" type="text">
                        </div>
                        <div class="num4">
                            <label for="">Chiều dài tay</label>
                            <input id="chieuDaiTay" type="text">
                        </div>
                    </div>
                </div>
                <div class="button">
                    <button class="button_add" id="submit" onclick=themKichThuocAo() >Thêm kích thước</button>
                </div>
            </div>
        </div>
    </div>
    `
    document.getElementById("dialog1").onclick = function(t){
        if (t.target.matches("dialog1")) {
            document.getElementById("dialog1").remove();
        }
        }
        document.getElementById("close23").onclick = function(){
            document.getElementById("dialog1").remove();
        }
}
function pants(){
    document.getElementById("newScr").innerHTML = `
    <div id="dialog1">
        <form id="add_size">
            <div class="box" id="add_pants">
                    <button class="close" id="close23">X</button>
                    <label class="title" for="">Thêm kích thước quần</label>
                    <div class="ID2">
                        <label for="">ID</label>
                        <input type="text" readonly>
                    </div> 
                    <div class="name_s">
                        <label for="">Tên kích thước</label>
                        <input id="tenKichThuoc" type="text">
                    </div>
                    <div class="number_size">
                        <div class="num_detail_left">
                            <div class="num1">
                                <label for="">Số đo vòng đùi</label>
                                <input id="soDoVongDui" type="text">
                            </div>
                            <div class="num2">
                                <label for="">Số đo vòng chân</label>
                                <input id="soDoVongChan" type="text">
                            </div>
                        </div>
                        <div class="num_detail_right">
                            <div class="num5">
                                <label for="">chiều dài chân</label>
                                <input id="chieuDaiChan" type="text">
                            </div>
                            <div class="num4">
                                <label for="">Số đo mông</label>
                                <input id="soDoMong" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="button">
                        <button  class="button_add" id="ok" onclick = 'themKichThuocQuan()'>Thêm kích thước</button>
                    </div>
                </div>
        </form>
    </div>
    `
        document.getElementById("dialog1").onclick = function(t){
            if (t.target.matches("dialog1")) {
                document.getElementById("dialog1").remove();
        }
        }
        document.getElementById("close23").onclick = function(){
                document.getElementById("dialog1").remove();
        }
}

//Hàm check id

function CheckIDS(id){
    for(var i=0;i<arrKT.length;i++){
        if(id==arrKT[i].id){
            return true
        }
    }
    return false
}

// ham them du lieu ap
async function themKichThuocAo(){
    //them id, name, type, detail o day
    let tenKichThuoc = document.getElementById("tenKichThuoc").value;
    let id =`AO`+tenKichThuoc
    let soDoBung = document.getElementById("soDoBung").value;
    let soDoLung = document.getElementById("soDoLung").value;
    let chieuDaiTay = document.getElementById("chieuDaiTay").value;
    if(tenKichThuoc==""||soDoBung==""||soDoLung==""||chieuDaiTay==""){
        alert("Cần nhập đủ thông tin")
    }
    else {
    // if(CheckIDS(id)){ 
    //     alert("ID đã tồn tại")
    // }
    // else{
        let data_post_server = {id: id,breast: soDoBung,hand:chieuDaiTay, back:soDoLung , id_user: "USR001"}
        let form_data = to_form_data(data_post_server)
        alert(await delete_data(form_data, './Server/size/create_size.php'))
        document.getElementById("dialog1").remove();
        FillSize()
}
}       

//ham them du lieu quan
function themKichThuocQuan(){
    //them id, name, type, detail o day
    let table = document.getElementById("myTable2");
    let tenKichThuoc = document.getElementById("tenKichThuoc").value;
    let id = `QU` + tenKichThuoc
    
    let soDoVongDui = document.getElementById("soDoVongDui").value;
    let soDoVongChan = document.getElementById("soDoVongChan").value;
    let chieuDaiChan = document.getElementById("chieuDaiChan").value;
    let soDoMong = document.getElementById("soDoMong").value;
    if(tenKichThuoc==""||soDoVongChan==""||soDoVongDui==""||chieuDaiChan==""||soDoMong==""){
        alert("Cần nhập đủ thông tin")
    }
    else if(CheckIDS(id)){
        alert("ID đã tồn tại")
    }
    else{
        let objsT = {
            id: id,
            name:tenKichThuoc ,
            shoulderIndex: "",
            backIndex: "",
            bellyIndex: "",
            legLength: chieuDaiChan,
            armLength: "",
            thighLength: soDoVongDui,
            calfIndex: soDoVongChan,
            buttIndex: soDoMong
        }
        arrKT.push(objsT);
        objs.size = arrKT
        writeToLocalStorage(objs)
        for(let i = table.rows.length - 1; i  > 0; i--)
        table.deleteRow(i);
    //them du lieu o day
        for(let i = 0; i < arrKT.length; i++)
        {
            let obj = arrKT[i];
            let row = table.insertRow();
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
    
            cell0.innerHTML = obj.id;
            cell1.innerHTML = obj.name;
            cell2.innerHTML = `<p class="detail" onclick=onDetail(this)>chi tiết</p>`
        }
        document.getElementById("dialog1").remove();
    }
   
}
// Sửa kích thước
    // Lựa chọn áo hoặc quần
function TableEdit() {
    
    let table = document.getElementById("myTable2");
    for(let i = table.rows.length - 1; i  > 0; i--)
    table.deleteRow(i);
    for(let i = 0; i < arrKT.length; i++){
        let obj = arrKT[i];
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);

        cell0.innerHTML = obj.id;
        cell1.innerHTML = obj.name;
        cell2.innerHTML = `<p class="detail" onclick=onDetail(this)>chi tiết</p>`
        cell3.innerHTML = "<button onclick='onEdit(this)'>sửa</button>";
    }
}
function huy(){
    let table = document.getElementById("myTable2");
    for(let i = table.rows.length - 1; i  > 0; i--)
    table.deleteRow(i);
    for(let i = 0; i < arrKT.length; i++){
        let obj = arrKT[i];
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);

        cell0.innerHTML = obj.id;
        cell1.innerHTML = obj.name;
        cell2.innerHTML = `<p class="detail" onclick=onDetail(this)>chi tiết</p>`
    }
}
function onEdit(el){
    let thisRow = el.parentElement.parentElement;
    let id = thisRow.cells[0].innerText;
    if(id.toLowerCase().indexOf("q")!=-1)
    {
            document.getElementById("newScr").innerHTML = 
        `
        <div id="dialog1">
        <form class="box" id="edit-pants">
          <button class="close" id="close23">X</button>
          <label class="title" for="">Sửa kích thước quần</label>
          <div class="ID2">
            <label for="">ID</label>
            <input type="text" class="idsize" readonly>
          </div> 
          <div class="name_s">
            <label for="">Tên kích thước</label>
            <input id="tenKichThuoc" type="text">
          </div>
          <div class="number_size">
            <div class="num_detail_left">
              <div class="num1">
                <label for="">Số đo vòng đùi</label>
                <input id="soDoVongDui" type="text">
              </div>
              <div class="num2">
                <label for="">Số đo vòng chân</label>
                <input id="soDoVongChan" type="text">
              </div>
            </div>
            <div class="num_detail_right">
              <div class="num5">
                <label for="">chiều dài chân</label>
                <input id="chieuDaiChan" type="text">
              </div>
              <div class="num4">
                <label for="">Số đo mông</label>
                <input id="soDoMong" type="text">
              </div>
            </div>
          </div>
          <div class="button">
            <button class="button_add" onclick="xacNhanSuaQuan()">Xác nhận sửa</button>
          </div>
        </form>
      </div>
      
        `
    for(let i = 0; i < arrKT.length; i++){
        if(arrKT[i].id == id){
        selectedIndex = i;
        document.getElementById("idsize").value=id;
        document.getElementById("tenKichThuoc").value = arrKT[i].name;
        document.getElementById("soDoVongDui").value = arrKT[i].thighLength;
        document.getElementById("chieuDaiChan").value = arrKT[i].legLength 
        document.getElementById("soDoVongChan").value = arrKT[i].calfIndex;
        document.getElementById("soDoMong").value = arrKT[i].buttIndex;
        }
    }
    }
    else if(id.toLowerCase().indexOf("a")!=-1){
    document.getElementById("newScr").innerHTML = 
        `
        <div id="dialog1">
            <form class="box" id="edit_shirt">
                <button class="close" id="close23">X</button>
                <label class="title" for="">Sửa kích thước áo</label>
                <div class="ID2">
                    <label for="">ID</label>
                    <input id="idsize"  type="text" readonly>
                </div> 
                <div class="name_s">
                    <label for="">Tên kích thước</label>
                    <input id="tenKichThuoc" type="text">
                </div>
                <div class="number_size">
                    <div class="num_detail_left">
                        <div class="num1">
                            <label for="">Số đo vai</label>
                            <input id="soDoVai" type="text">
                        </div>
                        <div class="num2">
                            <label for="">Số đo bụng</label>
                            <input id="soDoBung" type="text">
                        </div>
                    </div>
                    <div class="num_detail_right">
                        <div class="num3">
                            <label for="">Số đo lưng</label>
                            <input id="soDoLung" type="text">
                        </div>
                        <div class="num4">
                            <label for="">Chiều dài tay</label>
                            <input id="chieuDaiTay" type="text">
                        </div>
                    </div>
                </div>
                <div class="button">
                    <button class="button_add" onclick="xacNhanSuaAo()">xác nhận sửa</button>
                </div>
            </form>    
        </div>
        `
    for(let i = 0; i < arrKT.length; i++){
        if(arrKT[i].id == id){
        selectedIndex = i;
        document.getElementById("idsize").value=id;
        document.getElementById("tenKichThuoc").value = arrKT[i].name;
        document.getElementById("soDoVai").value = arrKT[i].shoulderIndex;
        document.getElementById("soDoLung").value = arrKT[i].backIndex 
        document.getElementById("soDoBung").value = arrKT[i].bellyIndex;
        document.getElementById("chieuDaiTay").value = arrKT[i].armLength;
        }
    }
    }
    
    document.getElementById("dialog1").onclick = function(t){
    if (t.target.matches("dialog1")) {
        document.getElementById("dialog1").remove();
    }
    }
        document.getElementById("close23").onclick = function(){
        document.getElementById("dialog1").remove();
    }
}
// Mở chi tiết
function onDetail(el){
    let thisRow = el.parentElement.parentElement;
    let id = thisRow.cells[0].innerText;
    if(id.toLowerCase().indexOf("qu")!=-1)
    {
            document.getElementById("newScr").innerHTML = 
        `
        <div id="dialog1">
        <!-- Chỉnh sửa kính thước -->
            <div class="box" id="edit_pants">
                <button class="close" id="close23">X</button>
                <label class="title" for="">Chi tiết kích thước quần</label>
                <div class="ID2">
                    <label for="">ID</label>
                    <input id="idsize" type="text" >
                </div> 
                <div class="name_s">
                    <label for="">Tên kích thước</label>
                    <input id="tenKichThuoc" type="text">
                </div>
                <div class="number_size">
                    <div class="num_detail_left">
                        <div class="num1">
                            <label for="">Số đo vòng đùi</label>
                            <input id="soDoVongDui" type="text">
                        </div>
                        <div class="num2">
                            <label for="">Số đo vòng chân</label>
                            <input id="soDoVongChan" type="text">
                        </div>
                    </div>
                    <div class="num_detail_right">
                        <div class="num5">
                            <label for="">chiều dài chân</label>
                            <input id="chieuDaiChan" type="text">
                        </div>
                        <div class="num4">
                            <label for="">Số đo mông</label>
                            <input id="soDoMong" type="text">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        GetDataSize().then(function(size) {
            for(let i = 0; i < size.sizes.length; i++){
                if(size.sizes[i].id == id){
                document.getElementById("idsize").value = size.sizes[i].id;
                document.getElementById("tenKichThuoc").value = size.sizes[i].id.substring(2);
                document.getElementById("soDoVongDui").value = size.sizes[i].thigh;
                document.getElementById("chieuDaiChan").value = size.sizes[i].foot
                document.getElementById("soDoVongChan").value = size.sizes[i].waist;
                document.getElementById("soDoMong").value = size.sizes[i].butt;
                }
            }
        }).catch(function(error) {
           console.log(error)
        });
   
    }
    else if(id.toLowerCase().indexOf("ao")!=-1){
    document.getElementById("newScr").innerHTML = 
        `
        <div id="dialog1">
            <!-- Chỉnh sửa kính thước -->
            <div class="box" id="edit_shirt">
            <button class="close" id="close23">X</button>
            <label class="title" for="">Chi tiết kích thước áo</label>
            <div class="ID2">
                <label for="">ID</label>
                <input id="idsize" type="text" readonly>
            </div> 
            <div class="name_s">
                <label for="">Tên kích thước</label>
                <input id="tenKichThuoc" type="text">
            </div>
            <div class="number_size">
                <div class="num_detail_left">
                    <div class="num2">
                        <label for="">Số đo bụng</label>
                        <input id="soDoBung" type="text">
                    </div>
                </div>
                <div class="num_detail_right">
                    <div class="num3">
                        <label for="">Số đo lưng</label>
                        <input id="soDoLung" type="text">
                    </div>
                    <div class="num4">
                        <label for="">Chiều dài tay</label>
                        <input id="chieuDaiTay" type="text">
                    </div>
                </div>
            </div>
        </div>
        `
    
        GetDataSize().then(function(size) {
            for(let i = 0; i < size.sizes.length; i++){
                if(size.sizes[i].id == id){
                document.getElementById("idsize").value = size.sizes[i].id;
                document.getElementById("tenKichThuoc").value = size.sizes[i].id.substring(2);
                document.getElementById("soDoLung").value = size.sizes[i].back 
                document.getElementById("soDoBung").value = size.sizes[i].breast;
                document.getElementById("chieuDaiTay").value = size.sizes[i].hand;
                }
            }
        }).catch(function(error) {
            console.log(error)
        });   
    }

    document.getElementById("dialog1").onclick = function(t){
    if (t.target.matches("dialog1")) {
        document.getElementById("dialog1").remove();
    }
    }
        document.getElementById("close23").onclick = function(){
        document.getElementById("dialog1").remove();
    }
}
   