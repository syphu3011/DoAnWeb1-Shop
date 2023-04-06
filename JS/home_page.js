let max_amount = 0;

function get_data(res) {
  //Loại sản phẩm
  data.largeClassify = res.largeClassify;
  //Màu
  data.color = res.color;
  //Kích cỡ
  data.size = res.size;
  //Sản phẩm
  data.product = res.product;
  //Sản phẩm trong kho
  data.product_in_stock = res.product_in_stock;
  //Khuyến mãi
  data.promote = res.promotion;
  //Ảnh sản phẩm
  data.image_product = res.image_product;
  //Danh sách sản phẩm
  data.product_list = res.product_list;
}
var xhttp = new XMLHttpRequest();
//load trang chủ
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(this.responseText); // lưu phản hồi vào biến cục bộ
    // sử dụng biến response ngay tại đây
    get_data(response);
    create_Homepage(response);
    // createHomepage();
  }
};
xhttp.open("GET", "server/homepage.php", true);
xhttp.send();
console.log(data);
// data = JSON.parse(localStorage.getItem("data"));
function create_Homepage(data_res) {
  //Theo loại
  data_res.largeClassify.forEach((element) => {
    var str = "";
    //Sản phẩm trong loại
    let data_product = data_res.product;
    let count_i = 0;
    for (let k = 0; k < data_product.length; k++) {
      if (count_i == 5) {
        break;
      } else if (data_product[k].id.indexOf(element.id) != -1) {
        count_i++;
        let link_image = "";
        let price_product = "";
        //Link image
        for (let i = 0; i < data_res.image_product.length; i++) {
          if (data_res.image_product[i].id_product == data_product[k].id) {
            link_image = data_res.image_product[i].link_image;
          }
        }
        //Giá sản phẩm
        for (let i = 0; i < data_res.product_list.length; i++) {
          if (data_res.image_product[i].id_product == data_product[k].id) {
            price_product = calculated(data_res.product_list[i].price) + " VND";
          }
        }
        //danh sách sản phẩm
        str +=
          `
      <li class="main_list_product_product" id="` +
          data_product[k].id +
          `">
        <img class="main_list_product_product_image"
          style=""
          src="` +
          link_image +
          `"alt=""
        />
       <div class="main_list_product_product_infor"> 
       <label class="product_infor_name">` +
          data_product[k].name +
          `</label>
         <label>` +
          price_product +
          `</label>
        </div>
      </li>
      `;
      }
    }
    // element.
    document.getElementById("main").innerHTML +=
      `<div class="main_product">
        <div class="main_name_class_product">` +
      element.name +
      `
        </div>
        <ul class="main_list_product">
        ` +
      str +
      `
        </ul>
      </div>`;
  });
  //Bắt sk click sản phẩm
  let click_product = document.getElementsByClassName(
    "main_list_product_product"
  );
  for (let i = 0; i < click_product.length; i++) {
    click_product[i].onclick = function () {
      //   console.log(1);
      //chọn xem sản phẩm
      click_Product(click_product[i].id);
    };
  }
}
function click_Product(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response.data);
        if (response.success) {
          //-data -status
          //data: -image_product:
          //        +id_product
          //        +link_image
          //        +nname_image
          //      -product:
          //        +description
          //        +id
          //        +idstatus
          //        +madein
          //        +name
          //      -madein_product
          //        +id
          //        +name
          //      -attribute_product
          //        +id_color
          //        +id_size
          //        +price
          //
          //Hiển thị
          document.getElementById("show_product").style.display = "flex";
          //inner vào
          document.getElementById("show_product").innerHTML =
            `<div class=sp_popup>
              <div class="popup_left">
                <img id="img_show"style="
                  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                " src="` +
            //source ảnh
            response.data.image_product[0].link_image +
            `"/>
                <div style="height:120px;
                  display: block; overflow: hidden;box-sizing: border-box;">
                  <ul id="review_image">
                  </ul>
                </div>
              </div>
              <div class="poup_right">
                <label class="popup_name_product">` +
            //tên sản phẩm
            response.data.product[0].name +
            `</label>
                
                  <label style="padding: 10px;display: block;">
                    Xuất xứ: \t ` +
            //xuất xứ sản phẩm
            response.data.madein_product[0].name +
            `
                  </label>
                <label style="padding: 10px;display: block;">
                  Mô tả:
                </label>       
                <div style="padding: 10px;
                  display: block;
                  border: 1px solid gray;
                  margin: 10px;
                  height: 150px;
                  overflow-y: scroll;">
                  ` +
            //mô tả sản phẩm
            response.data.product[0].description +
            `
                </div>   
                    <div id="select_size">
                        <label style="margin-right: 10px;">Size</label>
                        <ul id="list_size">
                        </ul>
                    </div>
                    <div id="select_color">
                      <label>Màu</label>
                      <ul id="list_color">
                      </ul>    
                    </div>
                    <div>
                      <label id="product_instock">
                      </label>
                    </div>
                    <div style="display: flex;
                      justify-content: space-between;
                      padding: 10px"> 
                      <div style="margin-right: 10px;">
                        <button id="button_decrease">
                        -
                        </button>
                        <input id="count_amount_product" type="number" placeholder="1">
                        <button id="button_increase">
                        +
                        </button>
                      </div>
                      <div>
                        giá:
                        <label id="price_amount">
                          10 Tỷ
                        </label>
                      </div>
                    </div>
                    <div style="
                        display: flex;
                        margin: 10px;
                        justify-content: center;
                    ">
                      <input class="nut-them-vao-gio" type="submit" value="Thêm vào giỏ hàng">
                    </div>
                </div>
            </div>`;
          //
          //thêm ảnh vào phần review_image
          response.data.image_product.forEach((element) => {
            document.getElementById("review_image").innerHTML +=
              `
            <li class="list_image_review">
              <img src="` +
              //source
              element.link_image +
              `"/>
            </li>
            `;
          });
          //

          //review ảnh
          let li_img = document.getElementsByClassName("list_image_review");
          li_img[0].style.borderColor = "red";
          for (let i = 0; i < li_img.length; i++) {
            li_img[i].onmouseenter = function () {
              //đưa tất cả về borderColor black
              enter_image(li_img);
              //gán ảnh chọn về borderColor black
              li_img[i].style.borderColor = "red";
              //gắn source, show lên
              document.getElementById("img_show").src =
                li_img[i].getElementsByTagName("img")[0].src;
            };
          }
          //

          //inner size

          let size_isselect = response.data.attribute_product[0].id_size;
          show_size(
            response.data.attribute_product,
            document.getElementById("list_size")
          );
          //
          //Hiển thị màu theo size
          show_color(
            response.data.attribute_product,
            size_isselect,
            document.getElementById("list_color")
          );

          //
          let button_size = document.getElementsByClassName("item_size");
          button_size[0].style.borderColor = "red";
          console.log(response.data.attribute_product[0].id_size);
          get_product_instock(
            id,
            response.data.attribute_product[0].id_size,
            response.data.attribute_product[0].id_color
          );
          // onclick;
          document.getElementById("count_amount_product").value = 1;
          onclick_amount(response.data.attribute_product[0].price);
          for (let index = 0; index < button_size.length; index++) {
            // const element = array[index];
            button_size[index].onclick = function () {
              size_isselect = button_size[index].id;
              get_product_instock(
                id,
                size_isselect,
                response.data.attribute_product[0].id_color
              );
              enter_image(button_size);
              button_size[index].style.borderColor = "red";
              show_color(
                response.data.attribute_product,
                size_isselect,
                document.getElementById("list_color")
              );
            };
          }
        } else {
          // Thông báo thất bại
          alert("Không tìm thấy sản phẩm này!");
        }
      } else {
        // Thông báo lỗi nếu có
        alert("Lỗi khi kết nối đến server!");
      }
    }
  };
  xhr.open("POST", "./Server/get_product.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("id_product=" + id);
}
//
function enter_image(li) {
  for (let i = 0; i < li.length; i++) {
    li[i].style.borderColor = "black";
  }
}
//
//Them cac button mau
function show_color(attribute, id_size, inner_list_color) {
  //  -attribute[]
  //    +id_size
  //    +pice
  //    +id_color
  //  -id_size: size_isselect
  //  -inner_list_color: document.getElementById("list_color")
  inner_list_color.innerHTML = "";
  for (let i = 0; i < attribute.length; i++) {
    att = attribute[i];
    if (att.id_size == id_size) {
      //inner các button size
      inner_list_color.innerHTML +=
        `
            <li class="item_color" id="` +
        att.id_color +
        `">   
            </li>
            `;
      document.getElementById(att.id_color).style.backgroundColor =
        att.id_color;
    }
  }
}
//Them cac button size
function show_size(attribute, inner_list_size) {
  //  -attribute[]
  //    +id_size
  //    +pice
  //    +id_color
  //  -inner_list_size: document.getElementById("list_size")
  let arr_id_size = new Array();
  for (let i = 0; i < attribute.length; i++) {
    // console.log(arr_id_size);

    att = attribute[i];
    let tmp =
      `
      <li class="item_size" id="` +
      att.id_size +
      `">
            ` +
      att.id_size.slice(2) +
      `
      </li>
      `;

    if (arr_id_size.indexOf(att.id_size) == -1) {
      inner_list_size.innerHTML += tmp;
    }
    arr_id_size.push(att.id_size);
  }
}
// function
function get_product_instock(id_product, id_size, id_color) {
  console.log(id_product, id_size, id_color);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // Xử lý kết quả trả về từ server
      //kiểm tra xem request được gửi đi đã thành công hay chưa
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          let amount = response.data[0].amount;
          max_amount = amount;
          // console.log("function get_product_instock");

          // console.log(response);
          document.getElementById("product_instock").innerHTML =
            "Sản phẩm khả dụng: " + amount;
          document.getElementById("price_amount").innerHTML =
            calculated(response.data[0].price_input) + " VNĐ";
        } else {
          console.log("Truy vấn lỗi");
        }
      }
    }
  };
  xhr.open("POST", "./Server/get_product_instock.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(
    "id_product=" + id_product + "&id_size=" + id_size + "&id_color=" + id_color
  );
}

function onclick_amount(price) {
  let input_text = document.getElementById("count_amount_product");
  let label_text = document.getElementById("price_amount");
  document.getElementById("button_increase").onclick = function () {
    let amount = input_text.value;
    if (amount == max_amount) {
      alert("Bạn đã chọn đến số lượng tối đa");
    } else {
      amount++;
      count_onclick(input_text, label_text, amount, price);
    }
  };
  document.getElementById("button_decrease").onclick = function () {
    let amount = input_text.value;
    if (amount == 1) {
      alert("Bạn đã chọn đến số lượng tối thiểu");
    } else {
      amount--;
      count_onclick(input_text, label_text, amount, price);
    }
  };
  document
    .getElementById("count_amount_product")
    .addEventListener("input", function () {
      let amount = input_text.value;
      if (amount <= 0) {
        count_onclick(input_text, label_text, 1, price);
      } else {
        if (amount > max_amount) {
          count_onclick(input_text, label_text, max_amount, price);
        } else {
          count_onclick(input_text, label_text, amount, price);
        }
      }
    });
}

function count_onclick(input_text, label_text, amount, price) {
  input_text.value = amount;
  label_text.innerHTML = calculated(price * amount) + " VNĐ";
}
