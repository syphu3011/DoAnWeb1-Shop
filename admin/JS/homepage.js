
let d = JSON.parse(localStorage.getItem("currentStaff"));
current_staff = d;

// function GetUserFromCookie(){

//   return user
// }
// function GetDataUs(user_id){
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       // Parse JSON response
//       var data = this.responseText;
      
//       // Do something with data
//       // console.log(data);
//     }
//   };
//   xhttp.open("GET", "./Server/privilege/privilege.php?user_id=" + user_id, true);
//   xhttp.send();

// }
// GetDataUs("USR001");
function checkLogin() {
  let cookie = document.cookie
  if (cookie == "" || cookie == ".") {
    location.href = "./sign_in.html"
  }
}
checkLogin()
let contentDiv = document.getElementById("content");
let left_bar = document.getElementById("back-left-bar");
let left_bar_list = document.getElementById("leftbar-list");
let body = document.getElementById("body-page");
let direct = false;
let isMoving = false;
let current = document.getElementById("background-history-admin");
let img_ham = document.getElementById("img-ham");
current.display = 'none'
img_ham.onclick = function () {
  if (!isMoving) {
    openCloseLeftBar();
  }
};
let back_account = document.getElementById("back-border-account");
async function setNameStaff() {
  let current = await getCurrentUser()

  let data = to_form_data(current)
  let data_response = await get(data, './Server/homepage/homepage.php')
  let name_staff = ""
  if (data_response.length > 0) {
    name_staff = data_response[0].name
  }
  else {
    name_staff = "Không tên"
  }
  document.getElementById("name-staff").innerHTML = name_staff
}
setNameStaff()
let pri = ''
async function gui_with_privilege() {
  let current = await getCurrentUser()
  let data = to_form_data(current)
  let data_response = await getText(data, './Server/privilege/GUI_with_privilege.php')
  let split = data_response.split("@")
  let list = split[0]
  pri = split[1]
  runOnLoad()
  document.getElementById("leftbar-list").innerHTML = list
  try {
    document.getElementById("orderr").onclick = function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'donhang'
    };
  }
  catch(e){}
  try {
    document.getElementById("consumer").onclick = function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'khachhang'
    };
  }
  catch(e) {}
  try {
    document.getElementById("input").onclick = function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'nhaphang'
    };
  }
  catch(e) {

  }
  try {
    $("#privilege").click(function () {
      $("#content").css("display", "block");
      $("#div-thongso").css("display", "none");
      openCloseLeftBar();
      changeToPrivilege();
    })
  }
  catch(e) {

  }
  try {
    document.getElementById("staff").onclick = function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'nhanvien'
    };
  }
  catch(e) {}
  try {
    document.getElementById("size").onclick = function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'kichco'
    };
  }
  catch(e) {}
  try {
    document.getElementById("promote").onclick = function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'khuyenmai'
    };
  }
  catch(e){}
  try {
    document.getElementById("product").onclick = async function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'sanpham'
    };
  }
  catch(e) {}
  try {
    document.getElementById("classify").onclick= function(){
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'loaisanpham'
    }
  }
  catch(e) {}
  try {
    document.getElementById("stats").onclick = function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
    
      openCloseLeftBar();
      location.href = fullPathPage + 'thongke'
    };
  }
  catch(e){}
  try {
    document.getElementById("homepage").onclick = function () {
      document.getElementById("content").style.display = "block";
      document.getElementById("div-thongso").style.display = "none";
      openCloseLeftBar();
      location.href = fullPathPage + 'trangchu'
    };
  }
  catch(e){}
}
gui_with_privilege()
// name_staff.innerHTML = current_staff.name;
back_account.onclick = async function () {
  document.cookie = "."
  let current_user = await getCurrentUser()
  let data = to_form_data(current_user)
  await put(data, './Server/homepage/logout.php')
  window.location.href = "./";
};

function openCloseLeftBar() {
  isMoving = true;
  if (!direct) {
    left_bar.style.zIndex = 100000 + "";
    left_bar.style.backgroundColor = "rgba(0,0,0,0.17)";
  }
  let id = setInterval(moveRight, 1);
  let count = 0;
  let width = left_bar_list.offsetWidth;

  function moveRight() {
    if (count == width) {
      left_bar.style.backgroundColor = direct
        ? "rgba(0,0,0,0)"
        : "rgba(0,0,0,0.17)";
      isMoving = false;
      direct = !direct;
      if (!direct) {
        left_bar.style.zIndex = 0 + "";
      }
      clearInterval(id);
    } else {
      if (direct) {
        left_bar.style.left = left_bar.getBoundingClientRect().x - 2 + "px";
      } else {
        left_bar.style.left = left_bar.getBoundingClientRect().x + 2 + "px";
      }
      count += 2;
    }
  }
}

function hideCurrent() {
  current.style.display = "none";
}

function appearDiv(div) {
  div.style.display = "block";
  current = div;
}

function appearDivFlex(div) {
  div.style.display = "flex";
  current = div;
}

function changeToHomepage() {
  hideCurrent();
  appearDivFlex(document.getElementById("background-history-admin"));
  
}

function changeToConsumer() {
  verifyCookie();
  hideCurrent();
  appearDiv(document.getElementById("Background"));
  getCustomers();
}

function changeToOrder() {
  hideCurrent();
  appearDiv(document.getElementById("background_order"));
  // timtheokhoang();
  RefreshFillOrder();
}

async function changeToInput() {
  hideCurrent();
  appearDiv(document.getElementById("body-input"));
  await getProduct()
}

function changeToPrivilege() {
  hideCurrent();
  appearDiv(document.getElementById("bgr-privilege"));
}

function changeToStaff() {
  hideCurrent();
  appearDiv(document.getElementById("bgr-nv"));
}

function changeToSize() {
  hideCurrent();
  appearDiv(document.getElementById("bgr-size"));
  FillSize();
}

function changeToPromote() {
  hideCurrent();
  appearDiv(document.getElementById("bgr-km"));
  renderTable2()
}
async function changeToClassify(){
  hideCurrent();
  appearDiv(document.getElementById("background-classify"));
  await FillClassify();
}

function changeToStats() {
  hideCurrent();
  appearDivFlex(document.getElementById("back-chart-page"));
  // firstSetup()
  // statisticProdUI(from, to, type)
  statistics();
}

async function changeToProduct() {
  hideCurrent();
  appearDiv(document.getElementById("background-prod"));

  await fillProd();
  // fillType()
}
const startPath = '/admin/'
const startPathPage = '/admin/?page='
const fromm = location.href.indexOf(startPath)
let relativePath = location.href.slice(fromm);
const firstPath = location.href.slice(0, fromm)
const fullPathPage = firstPath+startPathPage
function runOnLoad() {
  switch (relativePath) {
    case startPathPage+"sanpham":
      changeToProduct()
      break
    case startPathPage+"loaisanpham":
      changeToClassify()
      break
    case startPathPage+"donhang":
      changeToOrder()
      break
    case startPathPage+"nhaphang":
      changeToInput()
      break
    case startPathPage+"kichco":
      changeToSize()
      break
    case startPathPage+"khachhang":
      changeToConsumer()
      break
    case startPathPage+"khuyenmai":
      changeToPromote()
      break
    case startPathPage+"thongke":
      changeToStats()
      break
    case startPathPage+"trangchu":
      changeToHomepage()
      break
    case startPathPage+"nhanvien":
      changeToStaff()
      break
    default: 
      if (pri != "") {
        relativePath += "?page="+pri
        runOnLoad()
      }
      break
  }
}

function block_access(message) {
  // document.body.innerHTML = message
  // document.body.style.marginTop = '10px'
  // document.body.style.marginLeft = '10px'
}
// }
// else {
    // window.location.href = "../index.html"
// }
