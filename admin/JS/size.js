
async function GetDataSize() {
    let response = await get(to_form_data(getCurrentUser()), './Server/size/sizes.php')
    return response.sizes;
}
async function FillSize(){
        let size = await GetDataSize()
        let table = document.getElementById("myTable2")
        if(table.rows.length>0){
            for(let i = table.rows.length - 1; i  > 0; i--)
            table.deleteRow(i);
            for(let i = 0; i < size.length; i++){
                let row = table.insertRow();
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
        
                cell0.innerHTML = size[i].id;
                cell1.innerHTML = size[i].id.substring(2);
                cell2.innerHTML = `<p class="detail" onclick=onDetail(this)>chi tiết</p>`
                cell3.innerHTML = `<button onclick=onDel(this)>Xóa</button>  
                <button onclick=onEdit(this) id="edit">Sửa</button>`;
            }
        }
        else{
            let table = document.getElementById("myTable2")
            for(let i = 0; i < size.length; i++){
                let row = table.insertRow();
                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
        
                cell0.innerHTML = size[i].id;
                cell1.innerHTML = size[i].id.substring(2);
                cell2.innerHTML = `<p class="detail" onclick=onDetail(this)>chi tiết</p>`
                cell3.innerHTML = `<button onclick='onDel(this)'>Xóa</button>
                <button onclick=onEdit(this) id="edit">Sửa</button>`;
            }
        }
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
        <div id="add_size">
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
        let CurrentUser = getCurrentUser()
        let data_post_server = {id: id,breast: soDoBung,hand:chieuDaiTay, back:soDoLung ,id_user: CurrentUser.id_user, password: CurrentUser.password }
        let form_data = to_form_data(data_post_server)
        alert(await post(form_data, './Server/size/create_size.php'))
        document.getElementById("dialog1").remove();
        FillSize()
}
}       

//ham them du lieu quan
async function themKichThuocQuan(){
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
    // else if(CheckIDS(id)){
    //     alert("ID đã tồn tại")
    // }
    else{
        let CurrentUser = getCurrentUser()
        let data_post_server = {id: id, waist:soDoVongChan ,foot:chieuDaiChan, thigh:soDoVongDui , butt:soDoMong,id_user: CurrentUser.id_user, password: CurrentUser.password }
        let form_data = to_form_data(data_post_server)
        alert(await post(form_data, './Server/size/create_size.php'))
        document.getElementById("dialog1").remove();
        FillSize()
    }
   
}
async function onEdit(el){
    let size = await GetDataSize()
    let thisRow = el.parentElement.parentElement;
    let id = thisRow.cells[0].innerText;
    if(id.toLowerCase().indexOf("qu")!=-1)
    {
            document.getElementById("newScr").innerHTML = 
        `
        <div id="dialog1">
        <div class="box" id="edit-pants">
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
        </div>
      </div>
      
        `
    for(let i = 0; i < size.length; i++){
        if(size[i].id == id){
        selectedIndex = i;
        document.getElementById("idsize").value=id;
        document.getElementById("tenKichThuoc").value = size[i].id.substring(2);
        document.getElementById("soDoVongDui").value = size[i].thigh;
        document.getElementById("chieuDaiChan").value = size[i].foot
        document.getElementById("soDoVongChan").value = size[i].waist;
        document.getElementById("soDoMong").value = size[i].butt;
        }
    }
    }
    else if(id.toLowerCase().indexOf("ao")!=-1){
    document.getElementById("newScr").innerHTML = 
        `
        <div id="dialog1">
            <div class="box" id="edit_shirt">
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
            </div>    
        </div>
        `
    for(let i = 0; i < size.length; i++){
        if(size[i].id == id){
        selectedIndex = i;
        document.getElementById("idsize").value=id;
        document.getElementById("tenKichThuoc").value = size[i].id.substring(2);
        document.getElementById("soDoLung").value = size[i].back 
        document.getElementById("soDoBung").value = size[i].breast;
        document.getElementById("chieuDaiTay").value = size[i].hand;
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
async function onDetail(el){
    let size = await GetDataSize()
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
            for(let i = 0; i < size.length; i++){
                if(size.sizes[i].id == id){
                document.getElementById("idsize").value = size[i].id;
                document.getElementById("tenKichThuoc").value = size[i].id.substring(2);
                document.getElementById("soDoVongDui").value = size[i].thigh;
                document.getElementById("chieuDaiChan").value = size[i].foot
                document.getElementById("soDoVongChan").value = size[i].waist;
                document.getElementById("soDoMong").value = size[i].butt;
                }
            }
        }
    else if(id.toLowerCase().indexOf("ao")!=-1){
    document.getElementById("newScr").innerHTML = 
        `
        <div id="dialog1">
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
    
            for(let i = 0; i < size.length; i++){
                if(size[i].id == id){
                document.getElementById("idsize").value=size[i].id;
                document.getElementById("tenKichThuoc").value = size[i].id.substring(2);
                document.getElementById("soDoLung").value = size[i].back 
                document.getElementById("soDoBung").value = size[i].breast;
                document.getElementById("chieuDaiTay").value = size[i].hand;
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
   