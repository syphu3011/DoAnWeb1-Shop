// * Author: Huynh Kha Phi
// * Thank you for spending your valuable time reviewing my code. 

console.log(document.cookie);

let dictionaryForHash = {
  123123: "96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e",
  cicada3301: "58f3afdf1cdd0d353fc400a3bde3e19f9656d1e347aa44a4dec0fe09dd34f310",
  admin: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
}


// * Solution on stackoverflow: 
// ? https://stackoverflow.com/questions/59777670/how-can-i-hash-a-string-with-sha256-in-js

function sha256(ascii) {
  function rightRotate(value, amount) {
      return (value>>>amount) | (value<<(32 - amount));
  };
  
  let mathPow = Math.pow;
  let maxWord = mathPow(2, 32);
  let lengthProperty = 'length'
  let i, j; // Used as a counter across the whole file
  let result = ''

  let words = [];
  let asciiBitLength = ascii[lengthProperty]*8;
  
  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  let hash = sha256.h = sha256.h || [];
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  let k = sha256.k = sha256.k || [];
  let primeCounter = k[lengthProperty];
  /*/
  let hash = [], k = [];
  let primeCounter = 0;
  //*/

  let isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
          for (i = 0; i < 313; i += candidate) {
              isComposite[i] = candidate;
          }
          hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
          k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
      }
  }
  
  ascii += '\x80' // Append Ƈ' bit (plus zero padding)
  while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j>>8) return; // ASCII check: only accept characters in range 0-255
      words[i>>2] |= j << ((3 - i)%4)*8;
  }
  words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
  words[words[lengthProperty]] = (asciiBitLength)
  
  // process each chunk
  for (j = 0; j < words[lengthProperty];) {
      let w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
      let oldHash = hash;
      // This is now the undefinedworking hash", often labelled as variables a...g
      // (we have to truncate as well, otherwise extra entries at the end accumulate
      hash = hash.slice(0, 8);
      
      for (i = 0; i < 64; i++) {
          let i2 = i + j;
          // Expand the message into 64 words
          // Used below if 
          let w15 = w[i - 15], w2 = w[i - 2];

          // Iterate
          let a = hash[0], e = hash[4];
          let temp1 = hash[7]
              + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
              + ((e&hash[5])^((~e)&hash[6])) // ch
              + k[i]
              // Expand the message schedule if needed
              + (w[i] = (i < 16) ? w[i] : (
                      w[i - 16]
                      + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                      + w[i - 7]
                      + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                  )|0
              );
          // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
          let temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
              + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
          
          hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
          hash[4] = (hash[4] + temp1)|0;
      }
      
      for (i = 0; i < 8; i++) {
          hash[i] = (hash[i] + oldHash[i])|0;
      }
  }
  
  for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
          let b = (hash[i]>>(j*8))&255;
          result += ((b < 16) ? 0 : '') + b.toString(16);
      }
  }
  return result;
};


let sizeOfTable = 0;
let selectedCustomer = {};
let wantToDeleteCustomer = [];
let toggleDelete = false;
let keyListener = false;


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
  // console.log("Show customer list: ")
  // console.log(customers);
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
    // let cell9 = row.insertCell(9);
    cell0.innerHTML = customer.id;
    cell1.innerHTML = customer.id_user;
    cell2.innerHTML = customer.date_created;
    cell3.innerHTML = customer.name;
    cell4.innerHTML = customer.username;
    let tempStr = customer.password;
        if (tempStr.length > 5) {
          cell5.innerHTML = tempStr.slice(0, 2) + "...";
        } else
          cell5.innerHTML = customer.password;
    cell6.innerHTML = customer.privilege;
    cell7.innerHTML = `<button id="button-customer-status-${customer.id}-${customer.id_user}">${customer.status}</button>`;
    cell8.innerHTML = `<button id="button-customer-detail-${customer.id}-${customer.id_user}">Chi tiết</button>`;
    // cell9.innerHTML = `<button id="edit-but-${customer.id}-${customer.id_user}" onclick=renderEditCustomerDetail(this.id)>Chỉnh sửa</button>`;
    $("#button-customer-detail-" + customer.id + '-' + customer.id_user).on("click", function () {
      $("#dialog").css("display", "flex");
      $("#detail-customer-open").css("display", "flex");
      selectedCustomer = customer;

      $("#detail-customer-header").html(`Chi tiết khách hàng`) ;
      $("#detail-customer-content").html(`
              <div id="customer-detail-id">ID tài khoản: ${customer.id}</div>
              <div id="customer-detail-name">Tên người dùng: ${customer.name}</div>
              <div id="customer-detail-date-join">Ngày tham gia: None</div>
              <div id="customer-detail-birthday">Ngày sinh: ${customer.birthday}</div>
              <div id="customer-detail-gender">Giới tính: ${customer.gender}</div>
              <div id="customer-detail-numberphone">Số điện thoại: ${customer.numberphone}</div>
              <div id="customer-detail-privilege">Quyền: ${customer.privilege}</div>
            `);
      $("#btn-detail-edit-customer-group").html(`
            <button id="save-but-${customer.id}-${customer.id_user}" style="display:none" onclick=saveCustomerDetail(this.id)>Lưu lại</button>
            <button id="canc-but-${customer.id}" onclick=closeCustomerPopupDetail(this.id)>Thoát</button>
            <button id="edit-but-${customer.id}-${customer.id_user}" onclick=renderEditCustomerDetail(this.id)>Chỉnh sửa</button>
            `);
    });
  });

  bindStatusButList()
  
}

function bindStatusButList() {
  let statusButList = document.querySelectorAll('[id^=button-customer-status-]')
  statusButList.forEach((button) => {
    button.onclick = async function () {
      let url = '/doan/admin/Server/customer/customer.php';
      if (button.innerHTML === `active`) {
        button.innerHTML = `idle`
        let splitIdButton = button.id.split("-");
        let customerId = splitIdButton[3];
        let accountId = splitIdButton[4];
        let customer = {
          action: 'update',
          id: customerId,
          id_user: accountId,
          status: 'idle'
        }
        $.post(url, customer, (data, status) => {});
        // TODO chưa có báo lõi
        getCustomers();
      }
      else {
        button.innerHTML = `active`
        let splitIdButton = button.id.split("-");
        let customerId = splitIdButton[3];
        let accountId = splitIdButton[4];
        let customer = {
          action: 'update',
          id: customerId,
          id_user: accountId,
          status: 'active'
        }
        $.post(url, customer, (data, status) => {});
        // TODO chưa có báo lõi
        getCustomers();
      }
    }
  })
}

function saveCustomerDetail(idButton) {
  let username = $("#edit-customer-username").val();
  let password = $("#edit-customer-password").val();
  let passwordAgain = $("#edit-customer-password-again").val();
  if (username.length < 4) {
    alert("Username quá ngắn");
    return;
  } else
  if (password < 4) {
    alert("password quá ngắn");
    return;
  } else
  if (password !== passwordAgain) {
    alert("password không trùng khớp");
    return;
  }

  let splitIdButton = idButton.split("-");
  let customerId = splitIdButton[2];
  let accountId = splitIdButton[3];
  temp = selectedCustomer;
  let customer = {
    action: 'update',
    id: customerId,
    name: $("#edit-customer-name").val(),
    birthday: $("#edit-customer-birthday").val(),
    numberphone: $("#edit-customer-numberphone").val(),
    image: '',
    address: $("#edit-customer-address").val(),
    gender: $("#edit-customer-gender").val()
  };
  let account = {
    action: 'update',
    id_user: accountId,
    username: $("#edit-customer-username").val(),
    password: $("#edit-customer-password").val(),
    date_created: '',
    privilege: $("#edit-customer-privilege").val(),
    session: '',
    status: 'active'
  };
  let url = '/doan/admin/Server/customer/customer.php';
  for (var prop in account)
    if (Object.prototype.hasOwnProperty.call(account, prop)) {
      if ([undefined, ""].includes(account[prop])) {
        delete account[prop];
        continue;
      }
      if (!['id_user', 'password'].includes(prop)) 
        account[prop] = account[prop].toLowerCase();
    }
  for (var prop in customer)
    if (Object.prototype.hasOwnProperty.call(customer, prop)) {
      if ([undefined, ""].includes(customer[prop])) {
        delete customer[prop];
        continue;
      }
      if (!['id'].includes(prop)) 
        customer[prop] = customer[prop].toLowerCase();
    }
  
  for (var prop in selectedCustomer) {
    if (Object.prototype.hasOwnProperty.call(account, prop) && !['id_user'].includes(prop))
      if ([undefined].includes(account[prop]) || account[prop] === selectedCustomer[prop]) {
        delete account[prop];
      }
  }
  for (var prop in selectedCustomer) {
    if (Object.prototype.hasOwnProperty.call(customer, prop) && !['id'].includes(prop))
      if ([undefined].includes(customer[prop]) || customer[prop] === selectedCustomer[prop]) {
        delete customer[prop];
      }
  }

  // console.log(customer);
  // console.log(account);
  // console.log(selectedCustomer);
  $.post(url, account, (data, status) => {});
  $.post(url, customer, (data, status) => {});
  closeCustomerPopupDetail();
  // TODO chua co thong bao update thanh cong
}


function renderEditCustomerDetail(idButton) {
  // * lấy id button cho vui thôi chứ có làm gì đâu

  console.log(idButton);
  $(`#${idButton}`).css("display", "none");

  // let tempSplit = idButton.split("-");
  // let idSaveBut = `save-but-${tempSplit[2]}-${tempSplit[3]}`;
  // console.log(idSaveBut);

  // TODO chưa có làm mờ nút save
  // TODO chưa có upload ảnh
  // TODO chưa cảnh báo trùng sđt
  $("#detail-customer-content").html(`
    <div style="display: flex; flex-direction: row;">
    <div style="display: flex; flex-direction: column;">
      <img width="100" height="100" src="https://picsum.photos/100/100/?blur" alt="" width="500" height="600">
      <button style="margin-top: 1rem;" type="submit">Upload</button>
    </div>
    <form style="display: flex; flex-direction: column; align-items:center; padding-left: 1rem; padding-bottom: 1rem;">
      <div style="display:inline-block;">ID tài khoản: ${selectedCustomer.id}</div>
      <div style="display:inline-block;">Ngày tham gia: Chưa có</div>
          <label for="">Tên người dùng:</label>
      <input style="display:inline-block;" type="text" id="edit-customer-name" value="${selectedCustomer.name}">
          <label for="">Giới tính:</label>
      <select style="display:inline-block;" id="edit-customer-gender">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
      </select>
          <label for="">Ngày sinh:</label>
      <input style="display:inline-block;" type="date" id="edit-customer-birthday">
          <label for="">Quyền:</label>
      <select id="edit-customer-privilege">
          <option value="customer">customer</option>
      </select>
    </form>
    <form style="display: flex; flex-direction: column; align-items:center; padding-left: 1rem; padding-bottom: 1rem;">
          <label for="">Tên đăng nhập:</label>
      <input type="text" id="edit-customer-username" value="${selectedCustomer.username}">
      <div id="edit-warn-username-cus-box"></div>
          <label for="">Mật khẩu mới:</label>
      <input type="password" id="edit-customer-password" value="">
      <div id="edit-warn-password-cus-box"></div>
          <label for="">Nhập lại mật khẩu mới:</label>
      <input type="password" id="edit-customer-password-again" value="">
      <div id="edit-warn-password-again-cus-box"></div>
          <label for="">Địa chỉ:</label>
      <input type="text" id="edit-customer-address" value="${selectedCustomer.address}">
          <label for="">Số điện thoại:</label>
      <input type="text" id="edit-customer-numberphone" value="${selectedCustomer.numberphone}">
          
    </form>
    </div>
    `);
  $(`#save-but-${selectedCustomer.id}-${selectedCustomer.id_user}`).css("display", "inline-block");
  bindEditNotiIntoBox();
  // TODO chưa ẩn hiện nút save khi edit
}

function bindEditNotiIntoBox() {
  let warnUsernameDiv = $("#edit-warn-username-cus-box")
  let warnPasswordDiv = $("#edit-warn-password-cus-box")
  let warnPasswordAgainDiv = $("#edit-warn-password-again-cus-box")
  let usernameBox = $("#edit-customer-username")
  let passwordBox = $("#edit-customer-password")
  let passwordAgainBox = $("#edit-customer-password-again")

  usernameBox.off();
  passwordBox.off();
  passwordAgainBox.off();

  usernameBox.on('input', function (e) {
    let inputValue = e.target.value;
    if (inputValue.length > 12) {
      warnUsernameDiv.css("display", "block");
      warnUsernameDiv.html(`--> quá dài`);
    } else if (inputValue.length > 3 || inputValue.length == 0){
      warnUsernameDiv.css("display", "none");
    } else {
      warnUsernameDiv.css("display", "block");
      warnUsernameDiv.html(`--> quá ngắn`);
    }
  })
  passwordBox.on('input', function (e) {
    let inputValue = e.target.value;
    // console.log(inputValue)
    if (inputValue.length > 12) {
      warnPasswordDiv.css("display", "block");
      warnPasswordDiv.html(`--> quá dài`);
    } else 
    if (inputValue.length > 3 || inputValue.length == 0) {
      warnPasswordDiv.css("display", "none");
    } else {
      warnPasswordDiv.css("display", "block");
      warnPasswordDiv.html(`--> quá ngắn`);
    }
  })
  passwordAgainBox.on('input', function (e) {
    let inputValue = e.target.value;
    let previousInputValue = passwordBox.val();
    if (inputValue !== previousInputValue) {
      warnPasswordAgainDiv.css("display", "block");
      warnPasswordAgainDiv.html(`--> không trùng mk`);
    } else {
      warnPasswordAgainDiv.css("display", "none");
    }
  })

}

// * add image instruction function

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function renderAddNewCusInterface() {
  keyListener = true;
  // * GUI * //
  $("#dialog").css("display", "flex");
  $("#add-new-cus-box").css("display", "flex");
  $("#add-new-cus-box-content").css("display", "flex");
  // * GUI * //
  console.log(sizeOfTable)
  let expectedId = "KH" + String(sizeOfTable+1).padStart(3, '0');
  // TODO chưa có upload ảnh
  // TODO chưa cảnh báo trùng sđt
  $("#add-new-cus-box-content").html(`
  <div class="cus-modify-frame">
      <form id="cus-add-form" class="form-general">
        
        <div>
            <input type="file" name="cus-add-img" id="cus-add-img">
        </div>

        <div class="form-2">
            <div id="id-new-account">ID tài khoản: ${expectedId}</div>
          
            <label for="">Ngày tham gia: Chưa có</label>
            
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
        </div>
          
        <div class="form-3">
            <label for="">* Tên đăng nhập:</label>
          <input type="text" id="customer-username" value="">
          <div id="warn-username-cus-box"></div>
            <span>
              <label for="">* Mật khẩu:</label>
            </span>
          <input type="password" id="customer-password" value="">
          <div id="warn-password-cus-box"></div>
            
            <label for="">* Nhập lại mật khẩu:</label>
          <input type="password" id="customer-password-again" value="">
          <div id="warn-password-again-cus-box"></div>
            
            <label for="">Địa chỉ:</label>
          <input type="text" id="customer-address" value="">
            
            <label for="">Số điện thoại:</label>
          <input type="text" id="customer-numberphone" value="">
        </div>

      </form>
  </div>
  `);

  // add form attribute into button
  $("#btn-detail-add-customer-group").attr("form", "cus-add-form");

  let customerImgAddform = document.getElementById('cus-add-form');
  customerImgAddform.addEventListener('submit', function (event){
    event.preventDefault();
    let formData = new FormData(customerImgAddform);
    let imageFile = formData.get('cus-add-img');
    let image = new Image();
    image.onload = function() {
      let canvas = document.createElement('canvas');
      let maxDimension = Math.max(image.width, image.height);
      let scale = 200 / maxDimension;
      canvas.width = image.width * scale;
      canvas.height = image.height * scale;
      let context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      let hexData = '';
      for (var i = 0; i < imageData.data.length; i += 4) {
        let r = imageData.data[i];
        let g = imageData.data[i + 1];
        let b = imageData.data[i + 2];
        hexData += rgbToHex(r, g, b);
      }
      var postData = _.assign({
        'action': 'update',
        'image': hexData
      });
      console.log(postData);
      // $.ajax({
      //   url: 'server.php',
      //   method: 'POST',
      //   data: postData,
      //   success: function(response) {
      //     console.log(response);
      //   },
      //   error: function(xhr, status, error) {
      //     console.log(error);
      //   }
      // });
    };
    image.src = URL.createObjectURL(imageFile);
  });

  $("#btn-detail-add-customer-group").html(`
    <button style="width:30rem;" id="save-but-add-${expectedId}" onclick=saveNewCustomer(this.id)>Thêm</button>
    <button style="margin-left: 2rem;" id="canc-but-add" onclick=closeAddCustomer(this.id)>Thoát</button>
  `);


  $("#btn-detail-add-customer-group").css("display", "block");
  $("#btn-detail-add-customer-group").css("padding-bottom", "1rem");

  // TODO chưa ẩn hiện nút save khi add
  // TODO chưa thông báo thêm thành công
  // TODO chưa có thông báo khi thêm thất bại
  bindNotiIntoBox();
  
}

function bindNotiIntoBox() {
  let warnUsernameDiv = $("#warn-username-cus-box")
  let warnPasswordDiv = $("#warn-password-cus-box")
  let warnPasswordAgainDiv = $("#warn-password-again-cus-box")
  let usernameBox = $("#customer-username")
  let passwordBox = $("#customer-password")
  let passwordAgainBox = $("#customer-password-again")

  usernameBox.off();
  passwordBox.off();
  passwordAgainBox.off();


  usernameBox.on('input', function (e) {
    let inputValue = e.target.value;
    if (inputValue.length > 12) {
      warnUsernameDiv.css("display", "block");
      warnUsernameDiv.html(`--> quá dài`);
    } else if (inputValue.length > 3 || inputValue.length == 0){
      warnUsernameDiv.css("display", "none");
    } else {
      warnUsernameDiv.css("display", "block");
      warnUsernameDiv.html(`--> quá ngắn`);
    }
  })
  passwordBox.on('input', function (e) {
    let inputValue = e.target.value;
    // console.log(inputValue)
    if (inputValue.length > 12) {
      warnPasswordDiv.css("display", "block");
      warnPasswordDiv.html(`--> quá dài`);
    } else 
    if (inputValue.length > 3 || inputValue.length == 0) {
      warnPasswordDiv.css("display", "none");
    } else {
      warnPasswordDiv.css("display", "block");
      warnPasswordDiv.html(`--> quá ngắn`);
    }
  })
  passwordAgainBox.on('input', function (e) {
    let inputValue = e.target.value;
    let previousInputValue = passwordBox.val();
    if (inputValue !== previousInputValue) {
      warnPasswordAgainDiv.css("display", "block");
      warnPasswordAgainDiv.html(`--> không trùng mk`);
    } else {
      warnPasswordAgainDiv.css("display", "none");
    }
  })

}

async function renderDeleteCus() {
  toggleDelete = true;
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
  // console.log("Delete list: ")
  // console.log(customers);
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
    cell2.innerHTML = customer.date_created;
    cell3.innerHTML = customer.name;
    cell4.innerHTML = customer.username;
    let tempStr = customer.password;
        if (tempStr.length > 5) {
          cell5.innerHTML = tempStr.slice(0, 2) + "...";
        } else
          cell5.innerHTML = customer.password;
    cell6.innerHTML = customer.privilege;
    cell7.innerHTML = `<button id="button-customer-status-${customer.id}-${customer.id_user}">${customer.status}</button>`;
    cell8.innerHTML = `<button id="button-customer-detail-${customer.id}-${customer.id_user}">Chi tiết</button>`;
    cell9.innerHTML = `
    <button id="button-customer-delete-no-${customer.id}-${customer.id_user}">Xóa X</button>
    <button id="button-customer-delete-yes-${customer.id}-${customer.id_user}" style="display:none;">Xóa V</button>
    `
    // * detail but action
    $(
      "#button-customer-detail-" + customer.id + '-' + customer.id_user
    ).on("click", function () {
      $("#dialog").css("display", "flex");
      $("#detail-customer-open").css("display", "flex");

      selectedCustomer = customer;

      $("#detail-customer-header").html(`
            Chi tiết khách hàng
            `);
      $("#detail-customer-content").html(`
              <div id="customer-detail-id">ID tài khoản: ${customer.id}</div>
              <div id="customer-detail-name">Tên người dùng: ${customer.name}</div>
              <div id="customer-detail-date-join">Ngày tham gia: None</div>
              <div id="customer-detail-birthday">Ngày sinh: ${customer.birthday}</div>
              <div id="customer-detail-gender">Giới tính: ${customer.gender}</div>
              <div id="customer-detail-numberphone">Số điện thoại: ${customer.numberphone}</div>
              <div id="customer-detail-privilege">Quyền: ${customer.privilege}</div>
            `);
      $("#btn-detail-edit-customer-group").html(`
            <button id="canc-but-${customer.id}" onclick=closeCustomerPopupDetail(this.id)>Thoát</button>
            `);
    });

    // * delete but action
    let delButCus = $("#button-customer-delete-no-" + customer.id + "-" + customer.id_user)
    let delButCusYes = $("#button-customer-delete-yes-" + customer.id + "-" + customer.id_user)
    delButCusYes.css("display", "none");
    delButCus.on("click", function () {
      delButCus.css("display", "none");
      delButCusYes.css("display", "block");
      toggleDeleteUp(this.id);
    })
    delButCusYes.on("click", function () {
      delButCus.css("display", "block");
      delButCusYes.css("display", "none");
      toggleDeleteDown(this.id);
    })
  });
  renderDelButs()
  bindStatusButList()
}

// TODO: chưa phân trang

function renderDelButs() {
  let headButGroupDelCus = $("#HeadButton1");
  headButGroupDelCus.html(`
  <button class="btn-left" onclick=delSelCus()>Xóa</button>
  <button class="btn-left" onclick=resetAllDelCusNo()>Reset</button>
  <button class="btn-left" onclick=foldDelTable()>Thoát</button>
  `)
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
  wantToDeleteCustomer = [];
}

function toggleDeleteUp(id) {
  id = id.split("-")[4] + "-" + id.split("-")[5]
  wantToDeleteCustomer.push(id);
}

function toggleDeleteDown(id) {
  id = id.split("-")[4] + "-" + id.split("-")[5]
  wantToDeleteCustomer.splice(
    wantToDeleteCustomer.indexOf(id),
    1
  )
}

function delSelCus() {
  // TODO chua xac nhan xoa
  // TODO nếu list rỗng thì ẩn nút delete
  $("#dialog").css("display", "flex");
  $("#confirm-box").css("display", "flex");
  $("#confirm-box").html(`
    <div style="margin-top: 1rem;">Chắc chắn muốn xóa ${wantToDeleteCustomer.length}?</div>
    <div style="display:flex; margin-bottom: 1rem;">
      <button id="confirm-box-but-yes">Yes</button>
      <button id="confirm-box-but-no">No</button>
    </div>
  `)
  $("#confirm-box").css("padding", "1rem");
  $("#confirm-box-but-no").css("margin-left", "1rem");
  $("#confirm-box-but-yes").on("click", performDelPut());
  $("#confirm-box-but-no").on("click", function () {
    $("#dialog").css("display", "none");
    $("#confirm-box").css("display", "none");
  })
  

  resetAllDelCusNo();
}

async function performDelPut() {
  wantToDeleteCustomer.forEach(item => {
    let idToDelete = item.split("-")[1];
    $.ajax({
      url: 'http://localhost/doan/admin/Server/customer/customer.php',
      type: 'PUT',
      dataType: "json",
      data: JSON.stringify({
        "id_user": `${idToDelete}`
      }),
      success: function(msg) {
        console.log(msg);
      },
      error: function(msg) {
        console.log(msg)
      }
    });
    
    // * alternative choice for PUT request
    fetch('http://localhost/doan/admin/Server/customer/customer.php', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id_user": `${idToDelete}`
      })
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });

  })
  $("#confirm-box").html(`
    <div>Đã xóa thành công</div>
    <button id="confirm-box-ok">OK</button>
  `);
  $("#confirm-box-ok").on("click", function () {
    $("#dialog").css("display", "none");
    $("#confirm-box").css("display", "none");
  });
  renderDeleteCus();
}

function renderDelConfirmation() {
  let numberOfRow = wantToDeleteCustomer.length;
  // TODO no notification for successful erasion.
}

function foldDelTable() {
  let headButGroupDelCus = $("#HeadButton1")
  headButGroupDelCus.html(`
  <button class="btn-left" onclick=renderAddNewCusInterface()>Thêm khách hàng</button>
  <button class="btn-left" onclick=renderDeleteCus()>Xóa khách hàng</button>
  <button class="btn-left" onclick=getCustomers()>Làm mới</button>
  `);
  $("#myTable").html(`
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
  `);
  wantToDeleteCustomer = [];
  getCustomers();
}

// * return type: string
// * return when "Invalid date": ""
function legacyDate(date) {
  var dateMomentObject = moment(date).format('YYYY-MM-DD HH:mm:ss');
  if (dateMomentObject === "Invalid date")
    return undefined;
  else
    return dateMomentObject;
}

function filterCusWithParameters () {
  // TODO chưa có tìm kiếm
  $("#dialog").css("display", "none");
  $("#filter-customer-box").css("display", "none");
  let searchBox = $("#text-search").val();
  let propertyCus = $("#filter-property-customer").val();
  let birthdayCus = $("#filter-birthday-customer").val();
  let dateCreatedCus = $("#filter-date-created-customer").val();
  let statusCus = $("#filter-status-customer").val();
  console.log(propertyCus);
  console.log(birthdayCus);
  console.log(dateCreatedCus);
  console.log(statusCus);
  let data = {};
  clearTable();
  data.id = propertyCus === "id" ? searchBox : undefined;
  data.name = propertyCus === "name" ? searchBox : undefined;
  data.username = propertyCus === "username" ? searchBox : undefined;
  data.numberphone = propertyCus === "numberphone" ? searchBox : undefined;
  data.birthday = legacyDate(birthdayCus);
  data.date_created = legacyDate(dateCreatedCus);
  data.status = statusCus === "all" ? undefined : statusCus;
  data = _.omitBy(data, _.isUndefined);

  if (Object.keys(data).length === 0) {
    data = {
      search: searchBox
    }
  }

  // console.log(data);
  $.ajax({
    method: "GET",
    url: "http://localhost/doan/admin/Server/customer/customer.php",
    data: data,
    success: function (customers) {
      console.log(customers);
      $("#myTable").html(`
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
          <th>Xóa</th>
        </tr>
        `);
      sizeOfTable = customers.length;
      let table = document.getElementById("myTable");
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
        // let cell9 = row.insertCell(9);
        cell0.innerHTML = customer.id;
        cell1.innerHTML = customer.id_user;
        cell2.innerHTML = customer.date_created;
        cell3.innerHTML = customer.name;
        cell4.innerHTML = customer.username;
        let tempStr = customer.password;
        if (tempStr.length > 5) {
          cell5.innerHTML = tempStr.slice(0, 2) + "...";
        } else
          cell5.innerHTML = customer.password;
        cell6.innerHTML = customer.privilege;
        cell7.innerHTML = `<button id="button-customer-status-${customer.id}-${customer.id_user}">${customer.status}</button>`;
        cell8.innerHTML = `<button id="button-customer-detail-${customer.id}-${customer.id_user}">Chi tiết</button> `;
        // cell9.innerHTML = `<button id="edit-but-${customer.id}-${customer.id_user}" onclick=renderEditCustomerDetail(this.id)>Chỉnh sửa</button>`;
        $("#button-customer-detail-" + customer.id + '-' + customer.id_user).on("click", function () {
          $("#dialog").css("display", "flex");
          $("#detail-customer-open").css("display", "flex");
          selectedCustomer = customer;
    
          $("#detail-customer-header").html(`Chi tiết khách hàng`) ;
          $("#detail-customer-content").html(`
                  <div id="customer-detail-id">ID tài khoản: ${customer.id}</div>
                  <div id="customer-detail-name">Tên người dùng: ${customer.name}</div>
                  <div id="customer-detail-date-join">Ngày tham gia: None</div>
                  <div id="customer-detail-birthday">Ngày sinh: ${customer.birthday}</div>
                  <div id="customer-detail-gender">Giới tính: ${customer.gender}</div>
                  <div id="customer-detail-numberphone">Số điện thoại: ${customer.numberphone}</div>
                  <div id="customer-detail-privilege">Quyền: ${customer.privilege}</div>
                `);
          $("#btn-detail-edit-customer-group").html(`
                <button id="save-but-${customer.id}-${customer.id_user}" style="display:none" onclick=saveCustomerDetail(this.id)>Lưu lại</button>
                <button id="canc-but-${customer.id}" onclick=closeCustomerPopupDetail(this.id)>Thoát</button>
                <button id="edit-but-${customer.id}-${customer.id_user}" onclick=renderEditCustomerDetail(this.id)>Chỉnh sửa</button>
                `);
        });
        cell9.innerHTML = `
          <button id="button-customer-delete-no-${customer.id}-${customer.id_user}">Xóa X</button>
          <button id="button-customer-delete-yes-${customer.id}-${customer.id_user}" style="display:none;">Xóa V</button>
          `;


        // * delete but action
        let delButCus = $("#button-customer-delete-no-" + customer.id + "-" + customer.id_user)
        let delButCusYes = $("#button-customer-delete-yes-" + customer.id + "-" + customer.id_user);
        delButCusYes.css("display", "none");
        delButCus.on("click", function () {
          delButCus.css("display", "none");
          delButCusYes.css("display", "block");
          toggleDeleteUp(this.id);
        });
        delButCusYes.on("click", function () {
          delButCus.css("display", "block");
          delButCusYes.css("display", "none");
          toggleDeleteDown(this.id);
        });

      });
      renderDelButs();
      bindStatusButList();
      console.log("rendered table")
    },
    error: function (res) {
      console.log(res);
    }
  })


}

function closeCustomerPopupDetail() {
  $("#detail-customer-open").css("display", "none");
  $("#dialog").css("display", "none");
}


function saveNewCustomer(id) {
  $(window).off("keypress");

  let username = $("#customer-username").val();
  let password = $("#customer-password").val();
  let passwordAgain = $("#customer-password-again").val();
  if (username.length < 4) {
    alert("Username quá ngắn");
    return;
  } else
  if (password < 4) {
    alert("password quá ngắn");
    return;
  } else
  if (password !== passwordAgain) {
    alert("password không trùng khớp");
    return;
  }
  // TODO Chưa insert được hình ảnh
  let data = {
    action: 'create',
    username: $("#customer-username").val(),
    password: $("#customer-password").val(),
    name: $("#customer-name").val(),
    gender: $("#customer-gender").val(),
    birthday: $("#customer-birthday").val(),
    date_created: '',
    privilege: $("#customer-privilege").val(),
    numberphone: $("#customer-numberphone").val(),
    image: '',
    status: 'active',
    address: $("#customer-address").val(),
    session: ''
  }
  let url = '/doan/admin/Server/customer/customer.php';
  data.name = data.name.toLowerCase();
  data.username = data.username.toLowerCase();
  data.gender = data.gender.toLowerCase();
  $.post(url, data, (data, status) => {
    // TODO chua co thông báo thêm người dùng mới
    console.log("Saved new customer.");
    // * GUI * //
    $("#dialog").css("display", "none");
    $("#add-new-cus-box").css("display", "none");
    $("#add-new-cus-box-content").css("display", "none");
    // * GUI * //
  });
  closeAddCustomer();
}

function closeAddCustomer() {
  // remove form attachment from button
  $("#btn-detail-add-customer-group").removeAttr("form");
  // window.removeEventListener("keypress", (e) => {
  //   if (readyToSubmit) {
  //     $(`#save-but-add-${expectedId}`).prop("disabled", false);
  //   }
  // });
  $("#add-new-cus-box").css("display", "none")
  $("#dialog").css("display", "none");
}

function OpenFilter() {
  $("#dialog").css("display", "flex");
  $("#filter-customer-box").css("display", "flex");
}


