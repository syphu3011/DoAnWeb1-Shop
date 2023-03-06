var xhttp = new XMLHttpRequest();
var data;
// Gửi yêu cầu đến file PHP với giá trị của biến id là 1
xhttp.open("GET", "init.php?id=1", true);
xhttp.send();
//Xử lý dữ liệu
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // console.log(this.responseText);
    data = JSON.parse(this.responseText);
    // var data = this.responseText;
    // data.forEach((element) => {
    //   console.log(element.id, "\t", element.name);
    // });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
  }
};
console.log(data);
