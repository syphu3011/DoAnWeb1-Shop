
let d = JSON.parse(localStorage.getItem("currentStaff"));
current_staff = d;

function GetUserFromCookie(){

  return user
}
function GetDataUs(user_id){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Parse JSON response
      var data = this.responseText;
      
      // Do something with data
      // console.log(data);
    }
  };
  xhttp.open("GET", "./Server/privilege/privilege.php?user_id=" + user_id, true);
  xhttp.send();

}
GetDataUs("USR001");

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
let name_staff = document.getElementById("name-staff");
// name_staff.innerHTML = current_staff.name;
back_account.onclick = function () {
  window.location.href = "../index.html";
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
Promise.all([get_DataOrder(), get_DataCus(), get_DataDetailO(),
   get_DataProd(), get_DataPromo()])
  .then(function(results) {
 
    console.log(results[0]); // receipt
    console.log(results[1]); // customer
    console.log(results[2]); // detail_receipt
    console.log(results[3]); // product
    console.log(results[4]); // get_DataPromo
    FillOrder();
  })
  .catch(function(error) {
    
    console.error(error);
  });
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
const relativePath = location.href.slice(fromm);
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
      changeToConsumer()
      break
  }
}
document.getElementById("orderr").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'donhang'
};
document.getElementById("consumer").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'khachhang'
};

document.getElementById("input").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'nhaphang'
};

$("#privilege").click(function () {
  $("#content").css("display", "block");
  $("#div-thongso").css("display", "none");
  openCloseLeftBar();
  changeToPrivilege();
})

document.getElementById("staff").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'nhanvien'
};
document.getElementById("size").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'kichco'
};
document.getElementById("promote").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'khuyenmai'
};
document.getElementById("product").onclick = async function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'sanpham'
};
document.getElementById("classify").onclick= function(){
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'loaisanpham'
}
document.getElementById("stats").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  location.href = fullPathPage + 'thongke'
};
document.getElementById("homepage").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";
  openCloseLeftBar();
  location.href = fullPathPage + 'trangchu'
};

function block_access(message) {
  // document.body.innerHTML = message
  // document.body.style.marginTop = '10px'
  // document.body.style.marginLeft = '10px'
}
// }
// else {
    // window.location.href = "../index.html"
// }
