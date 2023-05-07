// if (localStorage.getItem("checkLogin") == "true") {

// let current_staff = JSON.parse(localStorage.getItem("currentStaff"));


//test
let d = JSON.parse(localStorage.getItem("currentStaff"));
current_staff = d;

// let d = JSON.parse(localStorage.getItem("data"));
// current_staff = d.staff[2];


let contentDiv = document.getElementById("content");
let left_bar = document.getElementById("back-left-bar");
let left_bar_list = document.getElementById("leftbar-list");
let body = document.getElementById("body-page");
let direct = false;
let isMoving = false;
let current = document.getElementById("background-history-admin");
let img_ham = document.getElementById("img-ham");
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
  hideCurrent();
  appearDiv(document.getElementById("Background"));
  getCustomers();
}

function changeToOrder() {
  hideCurrent();
  appearDiv(document.getElementById("background_order"));
  // timtheokhoang();
Promise.all([get_DataOrder(), get_DataCus(), get_DataDetailO()])
  .then(function(results) {
 
    console.log(results[0]); // receipt
    console.log(results[1]); // customer
    console.log(results[2]); // detail_receipt
    FillOrder();
  })
  .catch(function(error) {
    
    console.error(error);
  });
}

function changeToInput() {
  hideCurrent();
  appearDiv(document.getElementById("body-input"));
}

function changeToStaff() {
  hideCurrent();
  appearDiv(document.getElementById("bgr-nv"));
}

function changeToSize() {
  hideCurrent();
  appearDiv(document.getElementById("bgr-size"));
}

function changeToPromote() {
  hideCurrent();
  appearDiv(document.getElementById("bgr-km"));
  renderTable2()
}
function changeToClassify(){
  hideCurrent();
  appearDiv(document.getElementById("background-classify"));
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

document.getElementById("orderr").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToOrder();
};
document.getElementById("consumer").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToConsumer();
};

document.getElementById("input").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToInput();
};
document.getElementById("staff").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToStaff();
};
document.getElementById("size").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToSize();
};
document.getElementById("promote").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToPromote();
};
document.getElementById("product").onclick = async function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToProduct();
};
document.getElementById("classify").onclick= function(){
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToClassify();
}
document.getElementById("stats").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";

  openCloseLeftBar();
  changeToStats();
};
document.getElementById("homepage").onclick = function () {
  document.getElementById("content").style.display = "block";
  document.getElementById("div-thongso").style.display = "none";
  openCloseLeftBar();
  changeToHomepage();
};
// }
// else {
    // window.location.href = "../index.html"
// }
