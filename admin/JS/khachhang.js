// * UI rendering function

let readyToPostNewCustomer = false;
let sizeOfTable = 0;
let selectedCustomer = {};

function clearTable() {
  let table = document.getElementById("myTable");
  for (let i = table.rows.length - 1; i > 0; i--) table.deleteRow(i);
}

async function getCustomerData(key, value) {
  try {
    const response = await fetch("./Server/customer/customer.php");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getCustomers() {
  let table = document.getElementById("myTable");
  let customers = await getCustomerData();
  clearTable();
  console.log("Show customer list: ")
  console.log(customers);
  sizeOfTable = customers.length;
  customers.forEach((customer) => {
    let row = table.insertRow();
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    let cell6 = row.insertCell(6);
    let cell7 = row.insertCell(7);
    let cell8 = row.insertCell(8);
    cell0.innerHTML = customer.id;
    cell1.innerHTML = customer.id_user;
    cell2.innerHTML = "Not done yet";
    cell3.innerHTML = customer.name;
    cell4.innerHTML = customer.username;
    cell5.innerHTML = customer.password;
    cell6.innerHTML = customer.privilege;
    cell7.innerHTML = `<button id="button-customer-status-${customer.id}">${customer.status}</button>`;
    cell8.innerHTML = `<button id="button-customer-detail-${customer.id}">Chi tiết</button>`;
    document.getElementById(
      "button-customer-detail-" + customer.id
    ).onclick = function () {
      document.getElementById("dialog").style.display = "flex";
      document.getElementById("detail-customer-open").style.display = "flex";

      selectedCustomer = customer;

      $("#detail-customer-header").html(`Chi tiết khách hàng`) ;
      document.getElementById("detail-customer-content").innerHTML = `
              <div id="customer-detail-id">ID tài khoản: ${customer.id}</div>
              <div id="customer-detail-name">Tên người dùng: ${customer.name}</div>
              <div id="customer-detail-date-join">Ngày tham gia: None</div>
              <div id="customer-detail-birthday">Ngày sinh: ${customer.birthday}</div>
              <div id="customer-detail-gender">Giới tính: ${customer.gender}</div>
              <div id="customer-detail-numberphone">Số điện thoại: ${customer.numberphone}</div>
              <div id="customer-detail-privilege">Quyền: ${customer.privilege}</div>
            `;
      document.getElementById("btn-detail-edit-customer-group").innerHTML = `
            <button id="save-but-${customer.id}" style="display:none" onclick=saveCustomerDetail(this.id)>Lưu lại</button>
            <button id="edit-but-${customer.id}" onclick=renderEditCustomerDetail(this.id)>Chỉnh sửa</button>
            <button id="canc-but-${customer.id}" onclick=closeCustomerPopupDetail(this.id)>Thoát</button>
            `;
    };
  });

  bindStatusButList()
  
}

function bindStatusButList() {
  let statusButList = document.querySelectorAll('[id^=button-customer-status-]')
  statusButList.forEach((button) => {
    button.onclick = function () {
      if (button.innerHTML === `active`)
        button.innerHTML = `idle`
      else
        button.innerHTML = `active`
    }
  })
}

function saveCustomerDetail(idButton) {
  let splitIdButton = idButton.split("-");
  let customerId = splitIdButton[2];
  temp = selectedCustomer;
  selectedCustomer = {
    action: 'update',
    address: document.getElementById("customer-address").value,
    birthday: document.getElementById("customer-birthday").value,
    gender: document.getElementById("customer-gender").value,
    id: temp.id,
    id_user: temp.id_user,
    image: temp.image,
    name: document.getElementById("customer-name").value,
    numberphone: document.getElementById("customer-numberphone").value,
    password: temp.password,
    privilege: document.getElementById("customer-privilege").value,
    session: temp.session,
    status: temp.status,
    username: temp.username,
  };
  console.log("This information will be update to the server");
  console.log(selectedCustomer);
  postToServer(url, data)
    .then(dataResponse => {
      console.log('Post successfull.')
      console.log(dataResponse)
    })
    .catch(error => {
      console.log(error)
    })
  // ! chưa request được
}


function renderEditCustomerDetail(idButton) {
  // * lấy id button cho vui thôi chứ có làm gì đâu

  // ! chưa có upload ảnh
  document.getElementById("detail-customer-content").innerHTML = `
    <div style="display: flex; flex-direction: row;">
    <div style="display: flex; flex-direction: column;">
      <img width="100" height="100" src="https://picsum.photos/100/100/?blur" alt="" width="500" height="600">
      <button style="margin-top: 1rem;" type="submit">Upload</button>
    </div>
    <form style="display: flex; flex-direction: column; align-items:center; padding-left: 1rem; padding-bottom: 1rem;">
      <div style="display:inline-block;">ID tài khoản: ${selectedCustomer.id}</div>
      <div style="display:inline-block;">Ngày tham gia: Chưa có</div>
          <label for="">Tên người dùng:</label>
      <input style="display:inline-block;" type="text" id="customer-name" value="${selectedCustomer.name}">
          <label for="">Giới tính:</label>
      <select style="display:inline-block;" id="customer-gender">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
      </select>
          <label for="">Ngày sinh:</label>
      <input style="display:inline-block;" type="date" id="customer-birthday">
          <label for="">Quyền:</label>
      <select id="customer-privilege">
          <option value="customer">customer</option>
      </select>
    </form>
    <form style="display: flex; flex-direction: column; align-items:center; padding-left: 1rem; padding-bottom: 1rem;">
          <label for="">Tên đăng nhập:</label>
      <input type="text" id="customer-address" value="${selectedCustomer.username}">
          <label for="">Mật khẩu mới:</label>
      <input type="text" id="customer-address" value="">
          <label for="">Nhập lại mật khẩu mới:</label>
      <input type="text" id="customer-address" value="">

          <label for="">Địa chỉ:</label>
      <input type="text" id="customer-address" value="${selectedCustomer.address}">
          <label for="">Số điện thoại:</label>
      <input type="text" id="customer-numberphone" value="${selectedCustomer.numberphone}">
          
    </form>
    </div>
    `;
  document.getElementById(`save-but-${selectedCustomer.id}`).style.display = "inline-block";
}

function renderAddNewCusInterface() {
  readyToPostNewCustomer = false;
  document.getElementById("dialog").style.display = "flex";
  document.getElementById("add-new-cus-box").style.display = "flex";
  document.getElementById("add-new-cus-box-content").style.display = "flex";
  console.log(sizeOfTable)
  let expectedId = "KH" + String(sizeOfTable+1).padStart(3, '0');
  // ! chưa có upload ảnh
  document.getElementById("add-new-cus-box-content").innerHTML = `
  <div style="display: flex; flex-direction: row; padding: 1rem;">
      <div style="display: flex; flex-direction: column; padding-left: 1rem; padding-top: 1rem;">
        <img width="100" height="100" src="https://picsum.photos/200" alt="" width="500" height="600">
        <button style="margin-top: 1rem;" type="submit">Upload</button>
      </div>
      <form style="display: flex; flex-direction: column; align-items:center; padding-left: 1rem; padding-bottom: 1rem;">
        <div id="id-new-account">ID tài khoản: ${expectedId}</div>
        <div>Ngày tham gia: Chưa có</div>
            <label for="">Tên người dùng:</label>
        <input type="text" id="customer-name" value="">
            <label for="">Giới tính:</label>
        <select  id="customer-gender">
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
        </select>
            <label for="">Ngày sinh:</label>
        <input type="date" id="customer-birthday">
            <label for="">Quyền:</label>
        <select id="customer-privilege">
            <option value="customer">customer</option>
        </select>
      </form>
      <form style="display: flex; flex-direction: column; align-items:center; padding: 1rem;">
            <label for="">* Tên đăng nhập:</label>
        <input type="text" id="customer-username" value="">
        <div id="warn-username-cus-box"></div>
            <label for="">* Mật khẩu:</label>
        <input type="password" id="customer-password" value="">
        <div id="warn-password-cus-box"></div>
            <label for="">* Nhập lại mật khẩu:</label>
        <input type="password" id="customer-password-again" value="">
        <div id="warn-password-again-cus-box"></div>
            <label for="">Địa chỉ:</label>
        <input type="text" id="customer-address" value="">
            <label for="">Số điện thoại:</label>
        <input type="text" id="customer-numberphone" value="">
            
      </form>
  </div>
  `;

  document.getElementById("btn-detail-add-customer-group").innerHTML = `
  <button style="width:30rem;" id="save-but-add-${expectedId}" onclick=saveNewCustomer(this.id)>Thêm</button>
  <button style="margin-left: 2rem;" id="canc-but-add" onclick=closeAddCustomer(this.id)>Thoát</button>
  `;
  document.getElementById("btn-detail-add-customer-group").style.display = "block";
  document.getElementById("btn-detail-add-customer-group").style.paddingBottom = "1rem";

  bindNotiIntoBox();
  
}

function bindNotiIntoBox() {
  let warnUsernameDiv = document.getElementById("warn-username-cus-box")
  let warnPasswordDiv = document.getElementById("warn-password-cus-box")
  let warnPasswordAgainDiv = document.getElementById("warn-password-again-cus-box")
  let usernameBox = document.getElementById("customer-username")
  let passwordBox = document.getElementById("customer-password")
  let passwordAgainBox = document.getElementById("customer-password-again")
  usernameBox.addEventListener('input', function (e) {
    let inputValue = e.target.value;
    if (inputValue.length > 12) {
      warnUsernameDiv.style.display = 'block';
      warnUsernameDiv.innerHTML = `--> quá dài`;
      readyToPostNewCustomer = false;
    } else if (inputValue.length > 3 || inputValue.length == 0){
      warnUsernameDiv.style.display = 'none';
      readyToPostNewCustomer = true;
    } else {
      warnUsernameDiv.style.display = 'block';
      warnUsernameDiv.innerHTML = `--> quá ngắn`;
      readyToPostNewCustomer = false;
    }
  })
  passwordBox.addEventListener('input', function (e) {
    let inputValue = e.target.value;
    if (inputValue.length > 12) {
      warnPasswordDiv.style.display = 'block';
      warnPasswordDiv.innerHTML = `--> quá dài`;
      readyToPostNewCustomer = false;
    } else 
    if (inputValue.length > 3 || inputValue.length == 0) {
      warnPasswordDiv.style.display = 'none';
      readyToPostNewCustomer = true;
    } else {
      warnPasswordDiv.style.display = 'block';
      warnPasswordDiv.innerHTML = `--> quá ngắn`;
      readyToPostNewCustomer = false;
    }
  })
  passwordAgainBox.addEventListener('input', function (e) {
    let inputValue = e.target.value;
    let previousInputValue = passwordBox.value;
    if (inputValue !== previousInputValue) {
      warnPasswordAgainDiv.style.display = "block";
      warnPasswordAgainDiv.innerHTML = `--> không trùng mk`;
      readyToPostNewCustomer = false;
    } else {
      warnPasswordAgainDiv.style.display = "none";
      readyToPostNewCustomer = true;
    }
  })

}

async function renderDeleteCus() {
  clearTable();
  let table = document.getElementById("myTable");
  table.innerHTML = `
  <tr class="first-row">
      <th>id khách hàng</th>
      <th>id tài khoản</th>
      <th>ngày tham gia</th>
      <th>tên</th>
      <th>tên đăng nhập</th>
      <th>mật khẩu</th>
      <th>quyền</th>
      <th>trạng thái</th>
      <th>chi tiết</th>
      <th>xóa</th>
  </tr>
  `

  let customers = await getCustomerData();
  console.log("Delete list: ")
  console.log(customers);
  sizeOfTable = customers.length;
  customers.forEach((customer) => {
    let row = table.insertRow();
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    let cell6 = row.insertCell(6);
    let cell7 = row.insertCell(7);
    let cell8 = row.insertCell(8);
    let cell9 = row.insertCell(9);
    cell0.innerHTML = customer.id;
    cell1.innerHTML = customer.id_user;
    cell2.innerHTML = "Not done yet";
    cell3.innerHTML = customer.name;
    cell4.innerHTML = customer.username;
    cell5.innerHTML = customer.password;
    cell6.innerHTML = customer.privilege;
    cell7.innerHTML = `<button id="button-customer-status-${customer.id}">${customer.status}</button>`;
    cell8.innerHTML = `<button id="button-customer-detail-${customer.id}">Chi tiết</button>`;
    cell9.innerHTML = `
    <button id="button-customer-delete-no-${customer.id}">Xóa X</button>
    <button id="button-customer-delete-yes-${customer.id}" style="display:none;">Xóa V</button>
    `
    // * detail but action
    document.getElementById(
      "button-customer-detail-" + customer.id
    ).onclick = function () {
      document.getElementById("dialog").style.display = "flex";
      document.getElementById("detail-customer-open").style.display = "flex";

      selectedCustomer = customer;

      document.getElementById("detail-customer-header").innerHTML = `
            Chi tiết khách hàng
            `;
      document.getElementById("detail-customer-content").innerHTML = `
              <div id="customer-detail-id">ID tài khoản: ${customer.id}</div>
              <div id="customer-detail-name">Tên người dùng: ${customer.name}</div>
              <div id="customer-detail-date-join">Ngày tham gia: None</div>
              <div id="customer-detail-birthday">Ngày sinh: ${customer.birthday}</div>
              <div id="customer-detail-gender">Giới tính: ${customer.gender}</div>
              <div id="customer-detail-numberphone">Số điện thoại: ${customer.numberphone}</div>
              <div id="customer-detail-privilege">Quyền: ${customer.privilege}</div>
            `;
      document.getElementById("btn-detail-edit-customer-group").innerHTML = `
            <button id="save-but-${customer.id}" style="display:none;" onclick=saveCustomerDetail(this.id)>Lưu lại</button>
            <button id="edit-but-${customer.id}" onclick=renderEditCustomerDetail(this.id)>Chỉnh sửa</button>
            <button id="canc-but-${customer.id}" onclick=closeCustomerPopupDetail(this.id)>Thoát</button>
            `;
    };

    // * delete but action
    let delButCus = document.getElementById("button-customer-delete-no-" + customer.id)
    let delButCusYes = document.getElementById("button-customer-delete-yes-" + customer.id)
    delButCusYes.style.visibility = 'block';
    delButCus.onclick = function () {
      delButCus.style.display = 'none';
      delButCusYes.style.display = 'block';
    }
    delButCusYes.onclick = function () {
      delButCus.style.display = 'block';
      delButCusYes.style.display = 'none';
    }
  });
  renderDelButs()
  bindStatusButList()
}

function renderDelButs() {
  let headButGroupDelCus = document.getElementById("HeadButton1")
  headButGroupDelCus.innerHTML = `
  <button class="btn-left" onclick=delSelCus()>Xóa</button>
  <button class="btn-left" onclick=resetAllDelCusNo()>Reset</button>
  <button class="btn-left" onclick=foldDelTable()>Thoát</button>
  `
}

function resetAllDelCusNo() {
  let yesNode = document.querySelectorAll('[id^=button-customer-delete-yes-]');
  let noNode = document.querySelectorAll('[id^=button-customer-delete-no-]');
  yesNode.forEach((yesItem) => {
    yesItem.style.display = 'none'
  })
  noNode.forEach((noItem) => {
    noItem.style.display = 'block'
  })
}

function delSelCus() {

}

function renderDelTable() {

}

function foldDelTable() {
  let headButGroupDelCus = document.getElementById("HeadButton1")
  headButGroupDelCus.innerHTML = `
  <button class="btn-left" onclick=renderAddNewCusInterface()>Thêm khách hàng</button>
  <button class="btn-left" onclick=renderDeleteCus()>Xóa khách hàng</button>
  <button class="btn-left" onclick=getCustomers()>Làm mới</button>
  `
  document.getElementById("myTable").innerHTML = `
  <tr class="first-row">
    <th>id khách hàng</th>
    <th>id tài khoản</th>
    <th>ngày tham gia</th>
    <th>tên</th>
    <th>tên đăng nhập</th>
    <th>mật khẩu</th>
    <th>quyền</th>
    <th>trạng thái</th>
    <th>chi tiết</th>
  </tr>
  `
  getCustomers()
}

function searchCustomer() {
  let searchBox = document.getElementById("text-search");
  if (searchBox.value === "")
    console.log("Vui lòng điền keyword cần tìm kiếm.");
  // ! chưa có tìm kiếm
}

function closeCustomerPopupDetail() {
  document.getElementById("detail-customer-open").style.display = "none";
  document.getElementById("dialog").style.display = "none";
}


function saveNewCustomer(id) {
  // if (!readyToPostNewCustomer)
  //   return
  
  // let data = {
  //   action: 'create',
  //   username: document.getElementById("customer-username").value,
  //   password: document.getElementById("customer-password").value,
  //   name: document.getElementById("customer-name").value,
  //   gender: document.getElementById("customer-gender").value,
  //   birthday: document.getElementById("customer-birthday").value,
  //   privilege: document.getElementById("customer-privilege").value,
  //   numberphone: document.getElementById("customer-numberphone").value,
  //   image: '',
  //   date_created: '',
  //   address: document.getElementById("customer-address").value
  // }
  let url = '/doan/admin/Server/customer/customer.php';
  let data = {
    action: 'create',
    username: 'cicada5',
    password: 'cicada3303',
    name: 'Lang Thang',
    gender: 'nam',
    birthday: '2002-06-28 00:00:00',
    date_created: '2023-04-18 16:11:15',
    privilege: 'customer',
    numberphone: '394142899',
    status: 'active',
    address: 'HCM'
  }
    // image: '',
    // date_created: '',
    // address: document.getElementById("customer-address").value
  data.gender = data.gender.toLowerCase()
  console.log(data)
  postToServer(url, data)
    .then(dataResponse => {
      console.log('Post successfull.')
      console.log(dataResponse)
    })
    .catch(error => {
      console.log(error)
    })
  // ! chưa request được
}

async function postToServer(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response;
}

function closeAddCustomer() {
  document.getElementById("add-new-cus-box").style.display = "none";
  document.getElementById("dialog").style.display = "none";
}

// ? CODE CỦA PHÚ TRỞ VỀ SAU

function SearchALLK() {
  let findall = document.getElementById("sl-all").value.toLowerCase();
  let string1 = document
    .getElementById("text-search")
    .value.trim()
    .toLowerCase();
  if (findall == "all") {
    return FindAllK(string1);
  } else if (findall == "id") {
    return FindIDK(string1);
  } else if (findall == "name") {
    return FindNameK(string1);
  } else if (findall == "username") {
    return FindUsernameK(string1);
  } else {
    return FindNumberPhoneK(string1);
  }
}

function SearchInitK() {
  var init = document.getElementById("date-init").value;
  if (init == "") {
    return FindAllK("");
  } else {
    console.log(getDateK(init));
    return FindDateInitK(getDateK(init));
  }
}

function SearchStatusK() {
  let findstatus = document.getElementById("sl-status").value.toLowerCase();
  if (findstatus == "all") {
    return FindAllK("");
  } else {
    return FindStatusK(findstatus);
  }
}

function SearchBirdayK() {
  var birth = document.getElementById("birth-day").value;
  if (birth == "") {
    return FindAllK("");
  } else {
    console.log(getDateK(birth));
    return FindBirthdayK(getDateK(birth));
  }
}

function FindIDK(tring) {
  let array = [];
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].id.toLowerCase().indexOf(tring) != -1) {
      array.push(i);
    }
  }
  return array;
}
function FindNameK(tring) {
  let array = [];
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].name.toLowerCase().indexOf(tring) != -1) {
      array.push(i);
    }
  }
  return array;
}
function FindUsernameK(tring) {
  let array = [];
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].username.toLowerCase().indexOf(tring) != -1) {
      array.push(i);
    }
  }
  return array;
}

function getDateK(date) {
  let newdate =
    date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0];
  return newdate;
}

function FindBirthdayK(tring) {
  let array = [];
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].birth_day.indexOf(tring) != -1) {
      array.push(i);
    }
  }
  return array;
}
function FindDateInitK(tring) {
  let array = [];
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].date_init.indexOf(tring) != -1) {
      array.push(i);
    }
  }
  return array;
}

function FindNumberPhoneK(tring) {
  let array = [];
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].number_phone.indexOf(tring) != -1) {
      array.push(i);
    }
  }
  return array;
}

function FindStatusK(tring) {
  let array = [];
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].status.toLowerCase().indexOf(tring) != -1) {
      array.push(i);
    }
  }
  return array;
}
function FindAllK(tring) {
  let array = [];
  for (let i = 0; i < length0; i++) {
    if (
      obj1.customer[i].id.toLowerCase().indexOf(tring) != -1 ||
      obj1.customer[i].name.toLowerCase().indexOf(tring) != -1 ||
      obj1.customer[i].username.toLowerCase().indexOf(tring) != -1 ||
      obj1.customer[i].number_phone.toLowerCase().indexOf(tring) != -1 ||
      obj1.customer[i].status.toLowerCase().indexOf(tring) != -1 ||
      obj1.customer[i].birth_day.indexOf(tring) != -1 ||
      obj1.customer[i].date_init.indexOf(tring) != -1
    ) {
      array.push(i);
    }
  }
  return array;
}

function CompareArrK(ar1, ar2) {
  let array = [];
  for (let i = 0; i < ar1.length; i++) {
    for (let j = 0; j < ar2.length; j++) {
      if (ar2[j] == ar1[i]) {
        array.push(ar1[i]);
      }
    }
  }
  return array;
}

// Lấy Checkbox
function SetCheckboxK(id) {
  if (id.checked) {
    arr.push(id.id);
  } else {
    arr.splice(Location1(id.id), 1);
  }
  console.log(arr);
}

function Location1(id) {
  for (let i = 0; i < arr.length; i++) if (id == arr[i]) return i;
}
function LocationID(x) {
  for (var i = 0; i < length0; i++) {
    if (x == obj1.customer[i].id) return i;
  }
}

// Khóa tài khoản
// function LockAccount() {
//   var length1 = arr.length;
//   for (var i = 0; i < length1; i++) {
//     let x = LocationID(arr[i]);
//     console.log(x);
//     ConfirmLock(x);
//   }
//   ClosePopupLock();
//   CloseBtnLock();
// }
// function ConfirmOpenLock(i) {
//   obj1.customer[i].status = "còn hoạt động";
//   writeToLocalStorage(obj1);
// }

// Mở khóa tài khoản
// function OpenAccount() {
//   var length1 = arr.length;
//   for (var i = 0; i < length1; i++) {
//     let x = LocationID(arr[i]);
//     console.log(x);
//     ConfirmOpenLock(x);
//   }
//   ClosePopupOpen();
//   CloseBtnLock();
// }
// function ConfirmLock(i) {
//   obj1.customer[i].status = "đã khóa";
//   writeToLocalStorage(obj1);
// }

// Fill bảng tìm kiếm
function renderTableFind(find) {
  let table = document.getElementById("myTable");
  for (let i = table.rows.length - 1; i > 0; i--) table.deleteRow(i);
  for (let i = 0; i < find.length; i++) {
    let row = table.insertRow();
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);
    let cell6 = row.insertCell(6);
    cell0.innerHTML = obj1.customer[find[i]].id;
    cell1.innerHTML = obj1.customer[find[i]].name;
    cell2.innerHTML = obj1.customer[find[i]].username;
    cell3.innerHTML = obj1.customer[find[i]].birth_day;
    cell4.innerHTML = obj1.customer[find[i]].number_phone;
    cell5.innerHTML = obj1.customer[find[i]].date_init;
    cell6.innerHTML = obj1.customer[find[i]].status;
  }
}

function TableFindOpen(find) {
  let table = document.getElementById("myTable");
  for (let i = table.rows.length - 1; i > 0; i--) table.deleteRow(i);
  for (let i = 0; i < find.length; i++) {
    if (obj1.customer[i].status.toLowerCase() == "cón hoạt động") {
      continue;
    } else {
      let row = table.insertRow();
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      let cell7 = row.insertCell(7);
      cell0.innerHTML = obj1.customer[find[i]].id;
      cell1.innerHTML = obj1.customer[find[i]].name;
      cell2.innerHTML = obj1.customer[find[i]].username;
      cell3.innerHTML = obj1.customer[find[i]].birth_day;
      cell4.innerHTML = obj1.customer[find[i]].number_phone;
      cell5.innerHTML = obj1.customer[find[i]].date_init;
      cell6.innerHTML = obj1.customer[find[i]].status;
      cell7.innerHTML =
        `<input id= "` +
        obj1.customer[i].id +
        `" 
        style= "cursor: pointer;" type='checkbox' onchange=SetCheckboxK(this)>`;
    }
  }
}

function TableFindLock(find) {
  let table = document.getElementById("myTable");
  for (let i = table.rows.length - 1; i > 0; i--) table.deleteRow(i);
  for (let i = 0; i < find.length; i++) {
    if (obj1.customer[i].status.toLowerCase() == "đã khóa") {
      continue;
    } else {
      let row = table.insertRow();
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      let cell7 = row.insertCell(7);
      cell0.innerHTML = obj1.customer[find[i]].id;
      cell1.innerHTML = obj1.customer[find[i]].name;
      cell2.innerHTML = obj1.customer[find[i]].username;
      cell3.innerHTML = obj1.customer[find[i]].birth_day;
      cell4.innerHTML = obj1.customer[find[i]].number_phone;
      cell5.innerHTML = obj1.customer[find[i]].date_init;
      cell6.innerHTML = obj1.customer[find[i]].status;
      cell7.innerHTML =
        `<input id= "` +
        obj1.customer[i].id +
        `" 
      style= "cursor: pointer;" type='checkbox' onchange=SetCheckboxK(this)>`;
    }
  }
}

//Fill Bảng

// Fill checkbox
function renderLock_CheckBoxTable() {
  let table = document.getElementById("myTable");
  for (let i = table.rows.length - 1; i > 0; i--) table.deleteRow(i);
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].status.toLowerCase() == "đã khóa") {
      continue;
    } else {
      let row = table.insertRow();
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      let cell7 = row.insertCell(7);
      cell0.innerHTML = obj1.customer[i].id;
      cell1.innerHTML = obj1.customer[i].name;
      cell2.innerHTML = obj1.customer[i].username;
      cell3.innerHTML = obj1.customer[i].birth_day;
      cell4.innerHTML = obj1.customer[i].number_phone;
      cell5.innerHTML = obj1.customer[i].date_init;
      cell6.innerHTML = obj1.customer[i].status;
      cell7.innerHTML =
        `<input id= "` +
        obj1.customer[i].id +
        `" 
      style= "cursor: pointer;" type='checkbox' onchange=SetCheckboxK(this)>`;
    }
  }
}

function renderOpen_CheckBoxTable() {
  let table = document.getElementById("myTable");
  for (let i = table.rows.length - 1; i > 0; i--) table.deleteRow(i);
  for (let i = 0; i < length0; i++) {
    if (obj1.customer[i].status.toLowerCase() == "còn hoạt động") {
      continue;
    } else {
      let row = table.insertRow();
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      let cell7 = row.insertCell(7);
      cell0.innerHTML = obj1.customer[i].id;
      cell1.innerHTML = obj1.customer[i].name;
      cell2.innerHTML = obj1.customer[i].username;
      cell3.innerHTML = obj1.customer[i].birth_day;
      cell4.innerHTML = obj1.customer[i].number_phone;
      cell5.innerHTML = obj1.customer[i].date_init;
      cell6.innerHTML = obj1.customer[i].status;
      cell7.innerHTML =
        `<input id= "` +
        obj1.customer[i].id +
        `" type='checkbox'
      style= "cursor: pointer;" onchange=SetCheckboxK(this)>`;
    }
  }
}

//Đóng mở
function OpenBtnLock() {
  document.getElementById("HeadButton1").style.display = "none";
  document.getElementById("HeadButton2").style.display = "block";
  document.getElementById("HeadButton3").style.display = "none";
  renderLock_CheckBoxTable();
}

function CloseBtnLock() {
  document.getElementById("HeadButton1").style.display = "block";
  document.getElementById("HeadButton2").style.display = "none";
  document.getElementById("HeadButton3").style.display = "none";
  renderTable();
  arr.splice(0, arr.length);
  // writeToLocalStorage(obj1)
}

function OpenBtnOLock() {
  document.getElementById("HeadButton1").style.display = "none";
  document.getElementById("HeadButton2").style.display = "none";
  document.getElementById("HeadButton3").style.display = "block";
  renderOpen_CheckBoxTable();
}
function OpenFilter() {
  document.getElementById("dialog").style.display = "flex";
  document.getElementById("Section").style.display = "flex";
}

function CloseFilter() {
  document.getElementById("dialog").style.display = "none";
  document.getElementById("Section").style.display = "none";
}

function OpenPopupLock() {
  if (arr.length == 0) {
    alert("Bạn chưa chọn tài khoản để khóa");
  } else {
    document.getElementById("dialog").style.display = "flex";
    document.getElementById("Confirm-Cancel-Lock").style.display = "flex";
  }
}
function ClosePopupLock() {
  document.getElementById("dialog").style.display = "none";
  document.getElementById("Confirm-Cancel-Lock").style.display = "none";
}

function OpenPopupOpen() {
  if (arr.length == 0) {
    alert("Bạn chưa chọn tài khoản để mở khóa");
  } else {
    document.getElementById("dialog").style.display = "flex";
    document.getElementById("Confirm-Cancel-Open").style.display = "flex";
  }
}
function ClosePopupOpen() {
  document.getElementById("dialog").style.display = "none";
  document.getElementById("Confirm-Cancel-Open").style.display = "none";
}

// renderTable()
