function xemCTSP(idProd) {
    pro.length = 0
    sizeP.length = 0
    prInStock.length = 0
    KM.length = 0
    getSizeP(idProd)
    getPro(idProd)
    getProInStock(idProd)
    getKM(idProd)
    let sr = ""
    pro[0].images.forEach(element => {
        sr += `<img class="img" src="Image/SANPHAM/` + element + `" alt="">`
    });
    let strSize = ""
    sizeP.forEach(element => {
        strSize +=
            `<div class="size-x">
            <div style="height: 16px;">
                ` + element.name + `
            </div>
        </div>`
    })
    let slCoSan = 0
    prInStock.forEach(element => {
        if (sizeP.length > 0) {
            if (element.idProd == idProd && element.idSize == sizeP[0].id) {
                slCoSan = parseInt(element.amount)
            }
        } else {
            if (element.idProd == idProd) {
                slCoSan = parseInt(element.amount)
            }
        }
    })
    console.log(1, idProd, pro[0].price)
    let str = ` <div class="popUp-prod">
        <div class="popUp-produ">
            <div class="anh">
                <img src="Image/SANPHAM/` + pro[0].images[0] + `" alt="">
                <div class="chon-anh">
                    <div class="line-anh">
                        ` + sr + `
                    </div>
                </div>
            </div>
            <div class="thong-tin-sp">
                <div class="ten-san-pham">
                    ` + pro[0].name + `
                </div>
                <div class="xuat-xu">
                    Xuất xứ: ` + pro[0].made_in + `
                </div>
                <div class="ma-san-pham">
                    Mã sản phẩm: ` + pro[0].id + `
                </div>
                <div class="mo-ta">
                    Mô tả:
                    <div class="van-ban">
                        ` + pro[0].description + `
                    </div>
                </div>
                <div class="tong-gia">
                    Tổng: ` + calculated(tinhtongtien(1, idProd, pro[0].price)) + ` VND
                </div>
                <div class="chonsize">
                    <div style="
                        padding: 5px 10px;
                    ">
                        Size
                    </div>
                    <div class="chon-size-x">
                       ` + strSize + `
                    </div>
                    <div class="chon-soluong">
                        <div class="giam-x">
                            -
                        </div>
                        <div class="hien-sl-x">
                            1
                        </div>
                        <div class="tang-x">
                            +
                        </div>
                        <div class="khadung">
                            Có ` + slCoSan + ` sản phẩm có sẵn
                        </div>
                    </div>
                </div>
                <div class="nut-them-vao-gio">
                    Thêm vào giỏ hàng
                </div>
            </div>
        </div>
    </div>`

    document.getElementById("div-onClickProduct").innerHTML = str
    let ids = ""
    document.getElementsByClassName("popUp-produ")[0].getElementsByClassName("line-anh")[0].getElementsByTagName("img")[0].style.borderColor = "red"
    if (sizeP.length > 0) {
        document.getElementsByClassName("chon-size-x")[0].getElementsByClassName("size-x")[0].style.borderColor = "red"
        ids = sizeP[0].id
    }
    // console.log(slCoSan)
    if (slCoSan == 0) {
        document.getElementsByClassName("hien-sl-x")[0].textContent = 0
        document.getElementsByClassName("tong-gia")[0].textContent = `Tổng: ` + calculated(tinhtongtien(0, pro[0].id, pro[0].price)) + ` VND`

    }
    evCTSP(slCoSan, ids)
}

function evCTSP(slCoSan, ids) {
    console.log(ids)
    let isSelectedImg = 0
    let dsAnh = document.getElementsByClassName("popUp-produ")[0].getElementsByClassName("line-anh")[0].getElementsByTagName("img")
    for (let i = 0; i < dsAnh.length; i++) {
        dsAnh[i].onclick = function() {
            dsAnh[isSelectedImg].style.borderColor = "gray"
            dsAnh[i].style.borderColor = "red"
            document.getElementsByClassName("anh")[0].getElementsByTagName("img")[0].src = "Image/SANPHAM/" + pro[0].images[i]
            isSelectedImg = i
        }
    }
    let isSelectedSize = 0
    let dsSize = document.getElementsByClassName("chon-size-x")[0].getElementsByClassName("size-x")
    let slkd = 0
        // let ids = ""
    for (let i = 0; i < dsSize.length; i++) {
        dsSize[i].onclick = function() {
            let sl = 0
            dsSize[isSelectedSize].style.borderColor = "gray"
            dsSize[i].style.borderColor = "red"
            isSelectedSize = i
            prInStock.forEach(element => {
                if (element.idProd == pro[0].id && element.idSize == sizeP[i].id) {
                    ids = sizeP[i].id
                    console.log(ids)
                    sl = parseInt(element.amount)
                }
            })
            slkd = sl
            if (sl > 0) {
                document.getElementsByClassName("hien-sl-x")[0].textContent = 1
                document.getElementsByClassName("tong-gia")[0].textContent = `Tổng: ` + calculated(tinhtongtien(1, pro[0].id, pro[0].price)) + ` VND`

            } else {
                document.getElementsByClassName("hien-sl-x")[0].textContent = 0
                document.getElementsByClassName("tong-gia")[0].textContent = `Tổng: ` + calculated(tinhtongtien(0, pro[0].id, pro[0].price)) + ` VND`
            }
            document.getElementsByClassName("khadung")[0].textContent = `có ` + sl + ` sản phẩm có sẵn`
        }
    }
    slkd = slCoSan
    let count = 1
    let nutGiam = document.getElementsByClassName("chon-soluong")[0].getElementsByClassName("giam-x")[0]
    let nutTang = document.getElementsByClassName("chon-soluong")[0].getElementsByClassName("tang-x")[0]
    let hienSL = document.getElementsByClassName("chon-soluong")[0].getElementsByClassName("hien-sl-x")[0]
    nutGiam.onclick = function() {
        if (count > 1) {
            count--
            hienSL.textContent = count
            document.getElementsByClassName("tong-gia")[0].textContent = `Tổng: ` + calculated(tinhtongtien(count, pro[0].id, pro[0].price)) + ` VND`
        } else {
            alert("Số lượng sản phẩm đã đạt tối thiểu")
        }
    }
    nutTang.onclick = function() {
        if (count < slkd) {
            count++
            hienSL.textContent = count
            document.getElementsByClassName("tong-gia")[0].textContent = `Tổng: ` + calculated(tinhtongtien(count, pro[0].id, pro[0].price)) + ` VND`
        } else {
            alert("Số lượng sản phẩm đã đạt tối đa")
        }
    }
    let nutthem = document.getElementsByClassName("nut-them-vao-gio")[0]
    
    nutthem.onclick = function() {
        if (currentUser != null) {
            if (slkd > 0) {
                if (checkCart(pro[0].id, currentUser.cart)) {
                    // let c = new Cart(pro[0].id, ids, count, tinhtongtien(count, pro[0].id, pro[0].price))
                    currentUser.cart.push(new Cart(pro[0].id, ids, count, tinhtongtien(count, pro[0].id, pro[0].price)))
                    localStorage.setItem("data", JSON.stringify(data))
                    showacc(document.getElementsByClassName("popUp-prod")[0], 0, 1200)
                    setTimeout(() => {
                        document.getElementById("div-onClickProduct").style.display = ""
                        isCTSP = false
                        document.getElementById("noti").style.display = "flex"
                        document.getElementById("noti-noti").innerHTML = "đã thêm Thành công"
                        showacc(document.getElementById("noti-noti"), -500, 0)
                        document.getElementById("noti-noti").style.display = "flex"
                        setTimeout(() => {
                            document.getElementById("noti").style.display = ""
                        }, 700)
                    }, 400);
                } else {
                    alert("sản phẩm đã được thêm, hãy chỉnh sửa trong giỏ hàng")
                }
            } else {
                alert("Sản phẩm hiện đang hết hàng")
            }
        } else {
            alert("Đăng nhập để tiếp tục")
            showacc(document.getElementsByClassName("popUp-prod")[0], 0, 1200)
            setTimeout(() => {
                document.getElementById("div-onClickProduct").style.display = ""
                isCTSP = false
                account.style.display = "flex"
                showacc(signin, -500, 0)
                    // productTag.style = ""
                    // document.getElementById("tagdivProduct").remove()
            }, 400);
        }
    }
}