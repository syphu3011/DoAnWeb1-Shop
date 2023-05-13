let max_amount = 0;
let max_value_slider = 0;
let min_value_silder = 0;

function get_data(res) {
    //Loại sản phẩm
    data.largeClassify = res.largeClassify;
    data.data_promotion = res.promote;
    //Sản phẩm
    data.product = res.product;
    //Sản phẩm trong kho
    data.big = res.big_data;
    //Khuyến mãi
    data.promote = res.promotion;
    //Ảnh sản phẩm
    data.image_product = res.image_product;
    //Danh sách sản phẩm
    data.product_list = res.product_list;
}
function_homepage();
function function_homepage() {
    getDataFromServer("./Server/homepage.php", "", function (response) {
        // console.log(data.largeClassify);
        console.log(response);
        // response.push(largeClassify);
        let largeClassify = new Array();
        // data.largeClassify.;
        largeClassify.push(
            response.data.filter((product) => product.id_big_classify == "AO"),
            response.data.filter((product) => product.id_big_classify == "QU")
        );
        // console.log("Data from homepage.php: ", response);
        // get_data(response);
        data = response.data;
        // get_data(response);
        create_Homepage(largeClassify);
        create_filter(response);
    });
}
// var xhttp = new XMLHttpRequest();
// //load trang chủ
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     var response = JSON.parse(this.responseText); // lưu phản hồi vào biến cục bộ
//     // sử dụng biến response ngay tại đây
//     // get_data(response);
//     // create_Homepage(response);
//     // createHomepage();
//   }
// };
// xhttp.open("GET", "server/homepage.php", true);
// xhttp.send();
// console.log(data);
// data = JSON.parse(localStorage.getItem("data"));
function price_from_dis(price, discount_percent, discount_price) {
    return price - price * discount_percent - discount_price;
}
//
//

function create_filter(params) {
    getDataFromServer("./Server/get_classify.php", {}, function (response) {
        console.log(response);
        document.getElementById(
            "clothing-type"
        ).innerHTML = `<option >Tất cả</option>`;
        for (let i = 0; i < response.data.length; i++) {
            //  for (
            //      let j = 0;
            //      j < data.largeClassify[i].miniClassify.length;
            //      j++
            //  ) {
            document.getElementById("clothing-type").innerHTML +=
                `<option id="` +
                response.data[i].id +
                `">` +
                response.data[i].name +
                `</option>`;
            //  }
        }
        //
        // Thanh chọn loại giảm giá
        //  document.getElementById(
        //      "sale-select"
        //  ).innerHTML = `<option>Tất cả</option>`;
        //  for (let i = 0; i < response.data.length; i++) {
        //      document.getElementById("sale-select").innerHTML +=
        //          `<option id="` +
        //          response.data[i].id +
        //          `">` +
        //          response.data[i].name +
        //          `</option>`;
        //  }
        //
        // Thanh chọn khoảng giá
        // noUiSlider.create(slider, {
        //     start: [
        //         0,
        //         data.product_list[data.product_list.length - 1].price + 10000,
        //     ],
        //     connect: true,
        //     range: {
        //         min: data.product_list[0].price,
        //         max: data.product_list[data.product_list.length - 1].price,
        //     },
        //     validate: true,
        //     step: 5000, // Set the step value to 10
        // });
        // // var slider = document.getElementById("slider");
        // // var minValue = document.getElementById("min-value");
        // // var maxValue = document.getElementById("max-value");
        // // // noUiSlider.create(slider, {
        // // //     start: [20, 80],
        // // //     connect: true,
        // // //     range: {
        // // //         min: 0,
        // // //         max: 10000,
        // // //     },
        // // //     validate: true,
        // // //     step: 10, // Set the step value to 10
        // // // });

        // slider.noUiSlider.on("update", function (values, handle) {
        //     if (handle) {
        //         max_value_slider = Math.round(values[handle]);
        //         maxValue.innerHTML = calculated(max_value_slider) + " VNĐ";
        //     } else {
        //         min_value_silder = Math.round(values[handle]);
        //         minValue.innerHTML = calculated(min_value_silder) + " VNĐ";
        //     }
        // let type_item = document.getElementById("clothing-type").value;
        // let sale_item = document.getElementById("sale-select").value;
        // console.log(sale_item);
        // timkiem(type_item, sale_item, max_value_slider, min_value_silder);
        // });
    });
    getDataFromServer("./Server/get_promotion.php", {}, function (response) {
        console.log(response);
        // document.getElementById(
        //     "clothing-type"
        // ).innerHTML = `<option >Tất cả</option>`;
        // for (let i = 0; i < data.largeClassify.length; i++) {
        //     for (
        //         let j = 0;
        //         j < data.largeClassify[i].miniClassify.length;
        //         j++
        //     ) {
        //         document.getElementById("clothing-type").innerHTML +=
        //             `<option id="` +
        //             data.largeClassify[i].miniClassify[j].id +
        //             `">` +
        //             data.largeClassify[i].miniClassify[j].name +
        //             `</option>`;
        //     }
        // }
        //
        // Thanh chọn loại giảm giá
        if (response.success) {
            document.getElementById(
                "sale-select"
            ).innerHTML = `<option>Tất cả</option>`;
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                document.getElementById("sale-select").innerHTML +=
                    `<option id="` +
                    response.data[i].id +
                    `">` +
                    response.data[i].name +
                    `</option>`;
            }
        }
        //
        // Thanh chọn khoảng giá
        // noUiSlider.create(slider, {
        //     start: [
        //         0,
        //         data.product_list[data.product_list.length - 1].price + 10000,
        //     ],
        //     connect: true,
        //     range: {
        //         min: data.product_list[0].price,
        //         max: data.product_list[data.product_list.length - 1].price,
        //     },
        //     validate: true,
        //     step: 5000, // Set the step value to 10
        // });
        // // var slider = document.getElementById("slider");
        // // var minValue = document.getElementById("min-value");
        // // var maxValue = document.getElementById("max-value");
        // // // noUiSlider.create(slider, {
        // // //     start: [20, 80],
        // // //     connect: true,
        // // //     range: {
        // // //         min: 0,
        // // //         max: 10000,
        // // //     },
        // // //     validate: true,
        // // //     step: 10, // Set the step value to 10
        // // // });

        // slider.noUiSlider.on("update", function (values, handle) {
        //     if (handle) {
        //         max_value_slider = Math.round(values[handle]);
        //         maxValue.innerHTML = calculated(max_value_slider) + " VNĐ";
        //     } else {
        //         min_value_silder = Math.round(values[handle]);
        //         minValue.innerHTML = calculated(min_value_silder) + " VNĐ";
        //     }
        // let type_item = document.getElementById("clothing-type").value;
        // let sale_item = document.getElementById("sale-select").value;
        // console.log(sale_item);
        // timkiem(type_item, sale_item, max_value_slider, min_value_silder);
        // });
    });
    // Thanh chọn khoảng giá
    noUiSlider.create(slider, {
        start: [0, params.data[params.data.length - 1].price + 20000],
        connect: true,
        range: {
            min: params.data[0].price - 10000,
            max: params.data[params.data.length - 1].price + 5000,
        },
        validate: true,
        step: 5000, // Set the step value to 10
    });
    // var slider = document.getElementById("slider");
    // var minValue = document.getElementById("min-value");
    // var maxValue = document.getElementById("max-value");
    // // noUiSlider.create(slider, {
    // //     start: [20, 80],
    // //     connect: true,
    // //     range: {
    // //         min: 0,
    // //         max: 10000,
    // //     },
    // //     validate: true,
    // //     step: 10, // Set the step value to 10
    // // });

    slider.noUiSlider.on("update", function (values, handle) {
        if (handle) {
            max_value_slider = Math.round(values[handle]);
            maxValue.innerHTML = calculated(max_value_slider) + " VNĐ";
        } else {
            min_value_silder = Math.round(values[handle]);
            minValue.innerHTML = calculated(min_value_silder) + " VNĐ";
        }
    });
    console.log(data);
    //
    // Thanh chọn loại sản phẩm
}
let page_page = 0;
function pagination(data) {
    // console.log(data);
    // console.log(123134123542)
    // document.getElementById('main').innerHTML+=
    let tag_a = ``;
    for (
        let i = 1;
        i <= Math.floor(data.total_product / total_product_on_page) + 1;
        i++
    ) {
        tag_a += `<a class="button_pagination" id="` + i + `">` + i + `</a>`;
    }
    document.getElementById("main").innerHTML +=
        `<div class="pagination">
		` +
        tag_a +
        `
	</div>`;
    let btn = document.getElementsByClassName("button_pagination");
    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = function () {
            page_page = i;
            console.log(btn[i].id);
            if (localStorage.getItem("current_page") == "is_search") {
                callback_search(btn[i].id);
            } else {
                if (localStorage.getItem("current_page") == "is_show_more") {
                    show_more(i + 1);
                } else {
                    if (localStorage.getItem("current_page") == "is_classify") {
                        choice_type_product(
                            localStorage.getItem("gender_product"),
                            i + 1,
                            8
                        );
                        console.log(123)
                        
                    }
                }
            }
        };
    }
    color_pagination(page_page);
}
function create_Homepage(data_res) {
    // //Theo loại
    console.log(data_res);
    for (let e = 0; e < data_res.length; e++) {
        element = data_res[e];
        console.log(element);
        var str = "";
        //Sản phẩm trong loại
        // let element = data_res.product;
        let count_i = 0;
        for (let k = 0; k < element.length; k++) {
            if (count_i == 6) {
                break;
            } else {
                count_i++;
                // let link_image = "";
                // let price_product = ``;
                // let current_product = data_res.product_list.find(
                //     (product) => product.id_product === element[k].id
                // );
                // if (current_product) {
                //     price_product = calculated(current_product.price) + ` VNĐ`;
                // }

                // console.log();
                //Link image
                // for (let i = 0; i < data_res.image_product.length; i++) {
                //     if (data_res.image_product[i].id_product == element[k].id) {
                //         link_image = data_res.image_product[i].link_image;
                //     }
                // }
                //Giá sản phẩm
                let div_price = "";
                let div_stamp = "";
                // for (let i = 0; i < element.length; i++) {
                //     if (
                //         data_res.image_product[i].id_product ==
                //         element[k].id
                //     ) {
                //         price_product =
                //             calculated(data_res.product_list[i].price) + " VND";
                //     }
                // }
                if (element[k].name_promotion != null) {
                    // div_stamp = ;
                    // div_stamp =
                    //     `<div
                    //         class="promo_stamp"
                    //         id="stamp_` +
                    //     element[k].id +
                    //     `"
                    //     >
                    //         ` +
                    //     element[k].name_promotion +
                    //     `
                    //     </div>`;

                    div_price =
                        `<del class="del_price" id="del_` +
                        element[k].id +
                        `">` +
                        calculated(element[k].price) +
                        ` VNĐ</del><label id="price_` +
                        element[k].id +
                        `">` +
                        calculated(
                            price_from_dis(
                                element[k].price,
                                element[k].discount_percent,
                                element[k].discount_price
                            )
                        ) +
                        ` VNĐ</label>`;
                } else {
                    div_price =
                        `<label id="price_` +
                        element[k].id +
                        `">` +
                        calculated(element[k].price) +
                        ` VNĐ</label>`;
                }
                //danh sách sản phẩm
                str +=
                    `
      <li class="main_list_product_product" id="` +
                    element[k].id_product +
                    `">
                ` +
                    div_stamp +
                    `
        <img class="main_list_product_product_image"
          style=""
          src="admin/image/` +
                    element[k].link_image +
                    `"alt=""
        />
       <div class="main_list_product_product_infor">
       <label class="product_infor_name">` +
                    element[k].name +
                    `</label>
         <div>
         ` +
                    div_price +
                    `
         </div>
        </div>
      </li>
      `;
            }
        }

        // element.
        document.getElementById("main").innerHTML +=
            `<div class="main_product">
        <div class="main_name_class_product">` +
            element[0].name_classify +
            `
        </div>
        <ul class="main_list_product">
        ` +
            str +
            `
        </ul>
        <div style="display: flex; justify-content: center;">
          <button id="` +
            element[0].id_big_classify +
            `" class="button_show_more">Xem thêm
        </button>
        </div>
      </div>`;
    }
    // data_res.forEach((element) => {
    //     console.log(element);
    //     var str = "";
    //     //Sản phẩm trong loại
    //     // let element = data_res.product;
    //     let count_i = 0;
    //     for (let k = 0; k < element.length; k++) {
    //         if (count_i == 6) {
    //             break;
    //         } else {
    //             count_i++;
    //             // let link_image = "";
    //             // let price_product = ``;
    //             // let current_product = data_res.product_list.find(
    //             //     (product) => product.id_product === element[k].id
    //             // );
    //             // if (current_product) {
    //             //     price_product = calculated(current_product.price) + ` VNĐ`;
    //             // }

    //             // console.log();
    //             //Link image
    //             // for (let i = 0; i < data_res.image_product.length; i++) {
    //             //     if (data_res.image_product[i].id_product == element[k].id) {
    //             //         link_image = data_res.image_product[i].link_image;
    //             //     }
    //             // }
    //             //Giá sản phẩm
    //             let div_price = "";
    //             let div_stamp = "";
    //             // for (let i = 0; i < element.length; i++) {
    //             //     if (
    //             //         data_res.image_product[i].id_product ==
    //             //         element[k].id
    //             //     ) {
    //             //         price_product =
    //             //             calculated(data_res.product_list[i].price) + " VND";
    //             //     }
    //             // }
    //             if (element[k].name_promotion != null) {
    //                 // div_stamp = ;
    //                 // div_stamp =
    //                 //     `<div
    //                 //         class="promo_stamp"
    //                 //         id="stamp_` +
    //                 //     element[k].id +
    //                 //     `"
    //                 //     >
    //                 //         ` +
    //                 //     element[k].name_promotion +
    //                 //     `
    //                 //     </div>`;

    //                 div_price =
    //                     `<del class="del_price" id="del_` +
    //                     element[k].id +
    //                     `">` +
    //                     calculated(element[k].price) +
    //                     ` VNĐ</del><label id="price_` +
    //                     element[k].id +
    //                     `">` +
    //                     calculated(
    //                         price_from_dis(
    //                             element[k].price,
    //                             element[k].discount_percent,
    //                             element[k].discount_price
    //                         )
    //                     ) +
    //                     ` VNĐ</label>`;
    //             } else {
    //                 div_price =
    //                     `<label id="price_` +
    //                     element[k].id +
    //                     `">` +
    //                     calculated(element[k].price) +
    //                     ` VNĐ</label>`;
    //             }
    //             //danh sách sản phẩm
    //             str +=
    //                 `
    //   <li class="main_list_product_product" id="` +
    //                 element[k].id_product +
    //                 `">
    //             ` +
    //                 div_stamp +
    //                 `
    //     <img class="main_list_product_product_image"
    //       style=""
    //       src="` +
    //                 element[k].link_image +
    //                 `"alt=""
    //     />
    //    <div class="main_list_product_product_infor">
    //    <label class="product_infor_name">` +
    //                 element[k].name +
    //                 `</label>
    //      <div>
    //      ` +
    //                 div_price +
    //                 `
    //      </div>
    //     </div>
    //   </li>
    //   `;
    //         }
    //     }

    //     // element.
    //     document.getElementById("main").innerHTML +=
    //         `<div class="main_product">
    //     <div class="main_name_class_product">` +
    //         element[0].name_classify +
    //         `
    //     </div>
    //     <ul class="main_list_product">
    //     ` +
    //         str +
    //         `
    //     </ul>
    //     <div style="display: flex; justify-content: center;">
    //       <button id="` +
    //         element[0].id_big_classify +
    //         `" class="button_show_more">Xem thêm
    //     </button>
    //     </div>
    //   </div>`;
    // });
    // console.log(data_res.promotion);
    // for (let i = 0; i < data_res.promotion.length; i++) {
    //     let tmp = data_res.promotion[i];

    //     if (compareDates(get_currentDate(), tmp.finish_date)) {
    // let id = "stamp_" + tmp.id_product;
    //         // console.log(id);

    // document.getElementById(id).innerHTML = tmp.content;
    //         document.getElementById(id).style.display = "block";
    //         document.getElementById("del_" + tmp.id_product).innerHTML =
    //             calculated(tmp.price) + " VND";
    //         document.getElementById("price_" + tmp.id_product).innerHTML =
    //             calculated(
    //                 price_from_dis(
    //                     tmp.price,
    //                     tmp.discount_percent,
    //                     tmp.discount_price
    //                 )
    //             ) + " VND";
    //     }
    // }
    detail_product();
    //Bắt sk click sản phẩm
    let button_show_more = document.getElementsByClassName("button_show_more");
    for (let i = 0; i < button_show_more.length; i++) {
        button_show_more[i].onclick = function () {
            screen = button_show_more[i].id;
            show_more(1);
        };
    }
}
let screen = "";
function color_pagination(index) {
    let btn = document.getElementsByClassName("button_pagination");
    for (let i = 0; i < btn.length; i++) {
        btn[i].style.borderColor = "black";
    }
    btn[index].style.borderColor = "red";
}
function show_more(page) {
    console.log(page);
    getDataFromServer(
        "./Server/list_product_by_large_classify.php",
        {
            id_large_classify: screen,
            current_page: page,
            total_product_on_page: total_product_on_page,
        },
        function (respone) {
            localStorage.setItem("current_page", "is_show_more");
            console.log(respone);
            create(respone);
            detail_product();
            // color_pagination(page)
            // pagination(respone);
        }
    );
}
function detail_product() {
    let click_product = document.getElementsByClassName(
        "main_list_product_product"
    );
    // pagination();
    for (let i = 0; i < click_product.length; i++) {
        click_product[i].onclick = function () {
            //chọn xem sản phẩm
            getDataFromServer(
                "./Server/get_product.php",
                {
                    id_product: click_product[i].id,
                },
                function (response) {
                    click_Product(response);
                }
            );
        };
    }
}
let cart = new Cart();
function click_Product(response) {
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === XMLHttpRequest.DONE) {
    //     if (xhr.status === 200) {
    //       var response = JSON.parse(xhr.responseText);
    console.log("respone form click product: ", response.data);
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
                " src="admin/image/` +
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
                      <div style="margin-right: 10px;display: flex">
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
                        <del id="del_price">
                        </del>
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
              <img src="admin/image/` +
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
        let color_isselect = response.data.attribute_product[0].id_color;
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
        //
        let button_size = document.getElementsByClassName("item_size");
        // console.log(response.data.product);
        console.log(
            response.data.product[0].id,
            response.data.attribute_product[0].id_size,
            response.data.attribute_product[0].id_color
        );
        getDataFromServer(
            "./Server/get_product_instock.php",
            {
                id_product: response.data.product[0].id,
                id_size: response.data.attribute_product[0].id_size,
                id_color: response.data.attribute_product[0].id_color,
            },
            function (response) {
                get_product_instock(response);
            }
        );
        // get_product_instock(
        //   response.data.product[0].id,
        //   response.data.attribute_product[0].id_size,
        //   response.data.attribute_product[0].id_color
        // );
        //
        // console.log(btn_color.length);

        // chon mau
        // let btn_color = document.getElementsByClassName("item_color");
        // console.log(btn_color.length);
        // for (let i = 0; i < btn_color.length; i++) {
        //   element = btn_color[i];
        //   console.log(element.id);
        //   element.onclick = function () {
        //     element.style.borderColor = "red";
        //     console.log(element.id);
        //     get_product_instock(
        //       id,
        //       size_isselect,
        //       response.data.attribute_product[0].id_color
        //     );
        //   };
        // }
        button_size[0].style.borderColor = "red";

        select_color(
            response.data.product[0].id,
            size_isselect,
            color_isselect
        );
        //Chon size
        document.getElementById("count_amount_product").value = 1;
        onclick_amount(response.data);
        for (let index = 0; index < button_size.length; index++) {
            // const element = array[index];
            button_size[index].onclick = function () {
                size_isselect = button_size[index].id;
                getDataFromServer(
                    "./Server/get_product_instock.php",
                    {
                        id_product: response.data.product[0].id,
                        id_size: size_isselect,
                        id_color: color_isselect,
                    },
                    function (response) {
                        get_product_instock(response);
                    }
                );
                // get_product_instock(
                //   id,
                //   size_isselect,
                //   response.data.attribute_product[0].id_color
                // );
                enter_image(button_size);
                button_size[index].style.borderColor = "red";
                show_color(
                    response.data.attribute_product,
                    size_isselect,
                    document.getElementById("list_color")
                );
                select_color(
                    response.data.product[0].id,
                    size_isselect,
                    color_isselect
                );
            };
        }
        let nutthem = document.getElementsByClassName("nut-them-vao-gio")[0];

        nutthem.onclick = function () {
            console.log(response);

            let user = currentUser;
            let amount = document.getElementById("count_amount_product").value;
            let id_product = response.data.product[0].id;
            let price = "";
            if (response.data.promotion.length > 0) {
                price =
                    amount *
                    price_from_dis(
                        response.data.promotion[0].price,
                        response.data.promotion[0].discount_percent,
                        response.data.promotion[0].discount_price
                    );
            } else {
                price = amount * response.data.attribute_product[0].price;
            }
            addToCart(
                user,
                id_product,
                color_isselect,
                size_isselect,
                amount,
                price
            );
        };
        function select_color(id, size_isselect) {
            let btn_color = document.getElementsByClassName("item_color");
            for (let i = 0; i < btn_color.length; i++) {
                btn_color[i].onclick = function () {
                    //   //Chuyen tat ca nut ve mau den
                    color_isselect = btn_color[i].id;
                    console.log(id, size_isselect, color_isselect);

                    for (let j = 0; j < btn_color.length; j++) {
                        btn_color[j].style.borderColor = "black";
                    }
                    //   //Chuyển nút đang bấm về màu đỏ
                    btn_color[i].style.borderColor = "red";
                    getDataFromServer(
                        "./Server/get_product_instock.php",
                        {
                            id_product: id,
                            id_size: size_isselect,
                            id_color: color_isselect,
                        },
                        function (response) {
                            get_product_instock(response);
                        }
                    );
                    // get_product_instock(id, size_isselect, data.id_color);
                };
            }
        }
    } else {
        // Thông báo thất bại
        alert("Không tìm thấy sản phẩm này!");
    }
    //     } else {
    //       // Thông báo lỗi nếu có
    //       alert("Lỗi khi kết nối đến server!");
    //     }
    //   }
    // };
    // xhr.open("POST", "./Server/get_product.php");
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhr.send("id_product=" + id);
}
//func chon mau

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
    document.getElementsByClassName("item_color")[0].style.borderColor = "red";
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
function get_product_instock(response) {
    // console
    // console.log(id_product, id_size, id_color);/
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === XMLHttpRequest.DONE) {
    // Xử lý kết quả trả về từ server
    //kiểm tra xem request được gửi đi đã thành công hay chưa
    // if (xhr.status === 200) {
    // var response = JSON.parse(xhr.responseText);
    if (response.success) {
        console.log(response);
        let data_respone = response.data;
        let amount = response.data.product[0].amount;
        max_amount = amount;
        // console.log("function get_product_instock");

        // console.log("data from get product instock", response);
        document.getElementById("product_instock").innerHTML =
            "Sản phẩm khả dụng: " + amount;
        if (data_respone.promote.length == 0) {
            document.getElementById("price_amount").innerHTML =
                calculated(data_respone.product[0].price) + " VNĐ";
        } else {
            document.getElementById("price_amount").innerHTML =
                calculated(
                    price_from_dis(
                        data_respone.promote[0].price,
                        data_respone.promote[0].discount_percent,
                        data_respone.promote[0].discount_price
                    )
                ) + " VND";
            document.getElementById("del_price").innerHTML =
                calculated(data_respone.promote[0].price) + " VNĐ";
        }

        // calculated(
        //     price_from_dis(tmp.price, tmp.discount_percent, tmp.discount_price)
        // ) + " VND";
    } else {
        console.log("Truy vấn lỗi");
    }
    //     }
    //   }
    // };
    // xhr.open("POST", "./Server/get_product_instock.php");
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhr.send(
    //   "id_product=" + id_product + "&id_size=" + id_size + "&id_color=" + id_color
    // );
}

function onclick_amount(data) {
    let price = 0;
    let sale = null;
    let data_respone;
    if (data.promotion.length == 0) {
        price = data.attribute_product[0].price;
    } else {
        data_respone = data.promotion[0];
        sale = data_respone.price;
        price = price_from_dis(
            data_respone.price,
            data_respone.discount_percent,
            data_respone.discount_price
        );

        document.getElementById("del_price").innerHTML =
            calculated(data_respone.price) + " VNĐ";
    }
    let input_text = document.getElementById("count_amount_product");
    let label_text = document.getElementById("price_amount");
    let label_del_price = document.getElementById("del_price");
    document.getElementById("button_increase").onclick = function () {
        let amount = input_text.value;
        if (amount == max_amount) {
            alert("Bạn đã chọn đến số lượng tối đa");
        } else {
            amount++;
            count_onclick(
                input_text,
                label_text,
                label_del_price,
                amount,
                price,
                sale
            );
        }
    };
    document.getElementById("button_decrease").onclick = function () {
        let amount = input_text.value;
        if (amount == 1) {
            alert("Bạn đã chọn đến số lượng tối thiểu");
        } else {
            amount--;
            count_onclick(
                input_text,
                label_text,
                label_del_price,
                amount,
                price,
                sale
            );
        }
    };
    document
        .getElementById("count_amount_product")
        .addEventListener("input", function () {
            let amount = input_text.value;
            if (amount <= 0) {
                count_onclick(
                    input_text,
                    label_text,
                    label_del_price,
                    1,
                    price,
                    sale
                );
            } else {
                if (amount > max_amount) {
                    count_onclick(
                        input_text,
                        label_text,
                        label_del_price,
                        max_amount,
                        price,
                        sale
                    );
                } else {
                    count_onclick(
                        input_text,
                        label_text,
                        label_del_price,
                        amount,
                        price,
                        sale
                    );
                }
            }
        });
}

function count_onclick(
    input_text,
    label_text,
    label_del_price,
    amount,
    price,
    sale
) {
    input_text.value = amount;
    console.log(sale);
    if (sale != null)
        label_del_price.innerHTML = calculated(sale * amount) + " VNĐ";
    label_text.innerHTML = calculated(price * amount) + " VNĐ";
}
function addToCart(
    user,
    id_product,
    color_isselect,
    size_isselect,
    amount,
    price
) {
    if (currentUser != null) {
        id_user = user.id;
        getDataFromServer(
            "./Server/get_data_cart.php",
            { idkh: id_user, idpro: id_product },
            function (respone) {
                // return respone.success;
                if (!respone.success) {
                    getDataFromServer(
                        "./Server/insert_to_cart.php",
                        {
                            idkh: currentUser.id,
                            idsp: id_product,
                            idm: color_isselect,
                            ids: size_isselect,
                            amount: amount,
                            price: price,
                        },
                        function (respone) {
                            console.log(respone);
                        }
                    );
                    showacc(
                        document.getElementsByClassName("sp_popup")[0],
                        0,
                        1200
                    );
                    setTimeout(() => {
                        document.getElementById("show_product").style.display =
                            "";
                        isCTSP = false;
                        document.getElementById("noti").style.display = "flex";
                        document.getElementById("noti-noti").innerHTML =
                            "đã thêm Thành công";
                        showacc(document.getElementById("noti-noti"), -500, 0);
                        document.getElementById("noti-noti").style.display =
                            "flex";
                        setTimeout(() => {
                            document.getElementById("noti").style.display = "";
                        }, 700);
                    }, 400);
                } else {
                    alert(
                        "sản phẩm đã được thêm, hãy chỉnh sửa trong giỏ hàng"
                    );
                }
            }
        );
        // if (!checkCart(currentUser.id, id_product)) {
        // let c = new Cart(pro[0].id, ids, count, tinhtongtien(count, pro[0].id, pro[0].price))
        // currentUser.cart.push(
        //   new Cart(
        //     pro[0].id,
        //     ids,
        //     count,
        //     tinhtongtien(count, pro[0].id, pro[0].price)
        //   )
        // );
        // localStorage.setItem("data", JSON.stringify(data));
        // getDataFromServer(
        //   "./Server/insert_to_cart.php",
        //   {
        //     idkh: currentUser.id,
        //     idsp: id_product,
        //     idm: color_isselect,
        //     ids: size_isselect,
        //     amount: amount,
        //     price: price,
        //   },
        //   function (respone) {
        //     console.log(respone);
        //   }
        // );
        // showacc(document.getElementsByClassName("sp_popup")[0], 0, 1200);
        // setTimeout(() => {
        //   document.getElementById("show_product").style.display = "";
        //   isCTSP = false;
        //   document.getElementById("noti").style.display = "flex";
        //   document.getElementById("noti-noti").innerHTML = "đã thêm Thành công";
        //   showacc(document.getElementById("noti-noti"), -500, 0);
        //   document.getElementById("noti-noti").style.display = "flex";
        //   setTimeout(() => {
        //     document.getElementById("noti").style.display = "";
        //   }, 700);
        // }, 400);
        // } else {
        //   alert("sản phẩm đã được thêm, hãy chỉnh sửa trong giỏ hàng");
        // }
    } else {
        alert("Đăng nhập để tiếp tục");
        showacc(document.getElementsByClassName("sp_popup")[0], 0, 1200);
        setTimeout(() => {
            document.getElementById("show_product").style.display = "";
            isCTSP = false;
            account.style.display = "flex";
            showacc(signin, -500, 0);
        }, 400);
    }
}
