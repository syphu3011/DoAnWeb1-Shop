let btnprodw = document.getElementById("choose-product-women")
let prod = document.getElementById("product")
let btnprodm = document.getElementById("choose-product-men")
let prodm = document.getElementById("men-product")
let btnuser = document.getElementById("user")
let showuser = document.getElementById("show-user")
let btnshowfilter = document.getElementById("show-filter")
let filterbar = document.getElementById("filter-bar")
let poster = document.getElementById("poster")
let uname = document.getElementById("name")
let btncart = document.getElementById("cart")
let account = document.getElementById("account")
let signin = document.getElementById("signin")
let listtype = document.getElementById("list-type")
let listprice = document.getElementById("list-price")
let listsale = document.getElementById("list-sale")
let in4 = document.getElementById("in4")
let showcart = document.getElementById("show-cart")
let updateinf = document.getElementById("update-in4")

// let username = "pholontino"
// let curUser = JSON.parse(localStorage.getItem("currentIdUser"))

function offlist() {
    listtype.style.display = ""
    listprice.style.display = ""
    listsale.style.display = ""
}
btnprodw.onmouseenter = function() {
    prod.style.display = "block"
    offlist()
    createListType("nu")
    showuser.style.display = ""
    showcart.style.display = ""
}
btnprodw.onmouseleave = function() {
    prod.style.display = ""
    document.getElementById("sanpham").remove()
}

btnprodm.onmouseenter = function() {
    prod.style.display = "block"
    createListType("na")
    showuser.style.display = ""
    showcart.style.display = ""
    offlist()
}
btnprodm.onmouseleave = function() {
    prod.style.display = ""
    document.getElementById("sanpham").remove()
}


function createListType(sex) {
    let sp = document.createElement("div")
    sp.id = "sanpham"
    for (let i = 0; i < data.largeClassify.length; i++) {
        let div = document.createElement("div")
        div.style.borderRight = "1px solid gray"
        div.style.height = "250px"
        div.style.padding = "0 20% 5px 20px"
        div.style.margin = "10px"
        let divType = document.createElement("div")
        divType.style.fontSize = "18px"
        divType.style.marginTop = "20px"
        divType.style.color = "black"
        divType.appendChild(document.createTextNode(data.largeClassify[i].name))
        div.appendChild(divType)
        let ul = document.createElement("ul")
        ul.style.padding = "0"
        ul.style.listStyle = "none"
        div.appendChild(ul)
        for (let j = 0; j < data.largeClassify[i].miniClassify.length; j++) {
            if (data.largeClassify[i].miniClassify[j].id.indexOf(sex.toUpperCase()) != -1 ||
                data.largeClassify[i].id == "PK") {
                let li = document.createElement("li")
                li.className = "list-item"
                li.onclick = function() {
                    if (document.getElementsByClassName("middle")[0].style.display == "flex") {
                        if (arrProduct.length > 0) {
                            document.getElementById("div-list").remove()
                            document.getElementById("page-number").remove()
                        }
                        document.getElementById("div-title").remove()
                    } else {
                        document.getElementsByClassName("middle")[0].style.display = "flex"
                        document.getElementById("div-main").remove()
                    }
                    currentPage = 1
                    pathImage.length = 0
                    arrProduct.length = 0
                    let pos = document.documentElement.scrollTop
                    let id = setInterval(function frame() {
                        if (pos <= 300) {
                            clearInterval(id)
                            createPageProduct(spaceProduct,
                                data.largeClassify[i].name + " - " + data.largeClassify[i].miniClassify[j].name,
                                data.largeClassify[i].miniClassify[j].id,
                                12
                            )
                            if (data.largeClassify[i].id == "PK") {
                                document.getElementById("left").style.display = "none"
                                document.getElementById("list-product").style.gridTemplateColumns = "1fr 1fr 1fr 1fr"
                                document.getElementById("space-product").style.width = "100%"
                                    // console.log("log")
                            } else {
                                document.getElementById("left").style.display = "block"
                                document.getElementById("list-product").style.gridTemplateColumns = "1fr 1fr 1fr"
                                    // console.log("log")
                                document.getElementById("space-product").style.width = "80%"
                            }
                        } else {
                            pos -= 10
                            document.documentElement.scrollTop = pos
                        }
                    }, 1)
                }
                let a = document.createElement("a")
                a.href = "#" + data.largeClassify[i].id + "-" + data.largeClassify[i].miniClassify[j].id
                a.appendChild(document.createTextNode(data.largeClassify[i].miniClassify[j].name))
                li.appendChild(a)
                ul.appendChild(li)
            }
        }
        sp.appendChild(div)
    }
    prod.appendChild(sp)
    prod.onmouseenter = function() {
        prod.style.display = "block"
        createListType(sex)
    }
    prod.onmouseleave = function() {
        prod.style.display = ""
        document.getElementById("sanpham").remove()
    }
}
// btncart.onclick = function() {
//     pathImage.length = 0
//     arrProduct.length = 0
//         // console.log(currentUser.cart[0].idProd)
//         // getProduct(currentUser.cart[0].idPro)
//         // console.log(arrProduct)

//     if (currentUser != null) {
//         if (showcart.style.display == "flex") {
//             showcart.style.display = ""
//         } else {
//             if (currentUser.cart.length > 0) {
//                 document.getElementById("show-cart").style.display = "none"
//                 document.getElementById("div-cart").style.display = "flex"
//                 let divCart = document.createElement("div")
//                 divCart.style.display = "flex"
//                 divCart.style.flexDirection = "column"
//                 divCart.style.justifyContent = "center"
//                 document.getElementById("div-cart").appendChild(divCart)
//                 let cart = document.createElement("div")

//                 cart.style.height = "650px"
//                 cart.style.width = "800px"
//                 cart.style.overflow = "hidden"
//                 cart.style.backgroundColor = "white"
//                 cart.style.borderRadius = "20px"
//                 let divTitle = document.createElement("div")
//                 divTitle.style.height = "30px"
//                 divTitle.style.borderBottom = "1px solid gray"
//                 divTitle.style.marginTop = "10px"
//                 let tensp = document.createElement("div")
//                 tensp.style.marginLeft = "110px"
//                 tensp.appendChild(document.createTextNode("tên sản phẩm"))
//                 divTitle.appendChild(tensp)
//                 showacc(cart, -500, 0)
//                 cart.appendChild(divTitle)
//                 divCart.appendChild(cart)
//                 let ul = document.createElement("ul")
//                 ul.style.overflowY = "scroll"
//                 ul.style.margin = "20px -20px 150px 10px"
//                 ul.style.padding = "0"
//                 for (let i = 0; i < currentUser.cart.length; i++) {
//                     let linePro = document.createElement("li")
//                     linePro.style.display = "grid"
//                     linePro.style.gridTemplateColumns = "70px 1fr 1fr 100px"
//                     let ima = document.createElement("img")
//                     path = JSON.parse(JSON.stringify(pathImg))
//                     getPath(currentUser.cart[i].idProd, path)
//                     getProduct(currentUser.cart[i].idProd)
//                         // getProInCart(currentUser.cart[i].id)
//                     ima.src = pathImage[i] + arrProduct[i].images[0]
//                     ima.style.height = "70px"
//                     let name = document.createElement("div")
//                     name.style.lineHeight = "20px"
//                     name.style.fontSize = "20px"
//                     name.style.margin = "50px 30px 0 30px"
//                     name.appendChild(document.createTextNode(arrProduct[i].name))
//                     linePro.appendChild(ima)
//                     linePro.appendChild(name)
//                     ul.appendChild(linePro)
//                 }
//                 console.log(arrProduct, pathImage)
//                 cart.appendChild(ul)
//             }
//         }
//         showuser.style.display = ""
//         offlist()
//     } else {
//         alert("Đăng nhập để tiếp tục")
//         account.style.display = "flex"
//             // signin.style.display = "block"
//         showacc(signin, -500, 0)
//     }
// }
let inStock = new Array()
let data = JSON.parse(localStorage.getItem("data"))
console.log(data)

function getAmount(id) {
    for (let i = 0; i < data.prodInStock.length; i++) {
        if (data.prodInStock[i].idProd == id) {
            inStock.push(data.prodInStock[i])
        }
    }
}
btncart.onclick = function() {
    pathImage.length = 0
    arrProduct.length = 0
    inStock.length = 0
    if (currentUser != null) {
        if (showcart.style.display == "flex") {
            showcart.style.display = ""
        } else {
            if (currentUser.cart.length > 0) {
                document.getElementById("show-cart").style.display = "none"
                document.getElementById("div-cart").style.display = "flex"
                let divCart = document.createElement("div")
                divCart.id = "divdiv-cart"
                document.getElementById("div-cart").appendChild(divCart)
                let cart = document.createElement("div")
                cart.id = "gio-hang"
                showacc(cart, -500, 0)
                divCart.appendChild(cart)
                let table = document.createElement("table")
                let thread = document.createElement("thead")
                let tr = document.createElement("tr")
                let thEmpty = document.createElement("th")
                let thName = document.createElement("th")
                thName.appendChild(document.createTextNode("Tên sản phẩm"))
                let thPrice = document.createElement("th")
                thPrice.appendChild(document.createTextNode("Giá"))
                let thAmount = document.createElement("th")
                thAmount.appendChild(document.createTextNode("Số lượng"))
                let thTotal = document.createElement("th")
                thTotal.appendChild(document.createTextNode("Thành tiền"))
                tr.appendChild(thEmpty)
                tr.appendChild(thName)
                tr.appendChild(thPrice)
                tr.appendChild(thAmount)
                tr.appendChild(thTotal)
                let tbody = document.createElement("body")
                for (let i = 0; i < currentUser.cart.length; i++) {
                    getPath(currentUser.cart[i].idProd, path)
                    getProduct(currentUser.cart[i].idProd)
                    getAmount(currentUser.cart[i].idProd)
                    console.log(inStock)
                    let ima = document.createElement("img")
                    ima.src = pathImage[i] + arrProduct[i].images[0]
                    ima.style.height = "100px"
                    let name = document.createElement("div")
                    name.style.lineHeight = "20px"
                    name.style.fontSize = "20px"
                    name.appendChild(document.createTextNode(arrProduct[i].name))
                    let price = document.createElement("div")
                    price.appendChild(document.createTextNode(calculated(arrProduct[i].price) + "VND"))
                    let pricee = document.createElement("div")
                    pricee.appendChild(document.createTextNode(calculated(currentUser.cart[i].price) + "VND"))
                    let count = currentUser.cart[0].amount
                    let div = document.createElement("div")
                    let btnSub = document.createElement("button")
                    btnSub.style.width = "20px"
                    btnSub.style.border = "1px solid gray"
                    btnSub.style.cursor = "pointer"
                    btnSub.style.backgroundColor = "white"
                    btnSub.onclick = function() {
                        if (count > 1) {
                            count--
                            divshow.placeholder = count
                            let t = parseInt(currentUser.cart[i].price) / parseInt(currentUser.cart[i].amount) * count
                            pricee.textContent = calculated(t.toString()) + "VND"
                        }
                    }
                    btnSub.appendChild(document.createTextNode("-"))
                    div.appendChild(btnSub)
                    let divshow = document.createElement("input")
                    divshow.style.width = "50px"
                    divshow.style.border = "none"
                    divshow.style.borderTop = "1px solid gray"
                    divshow.style.borderBottom = "1px solid gray"
                    divshow.style.outline = "none"
                    divshow.style.textAlign = "center"
                    divshow.placeholder = count
                    div.appendChild(divshow)
                    let btnAdd = document.createElement("button")
                    btnAdd.style.width = "20px"
                    btnAdd.style.border = "1px solid gray"
                    btnAdd.style.cursor = "pointer"
                    btnAdd.style.backgroundColor = "white"
                    btnAdd.onclick = function() {
                        if (count < inStock[i].amount) {
                            count++
                            divshow.placeholder = count
                            let t = parseInt(currentUser.cart[i].price) / parseInt(currentUser.cart[i].amount) * count
                            pricee.textContent = calculated(t.toString()) + "VND"
                        }
                    }
                    btnAdd.appendChild(document.createTextNode("+"))
                    div.appendChild(btnAdd)
                    let text = document.createElement("div")
                    text.appendChild(document.createTextNode(inStock[i].amount + " sản phẩm có sẵn"))
                    text.style.fontSize = "10px"
                    text.style.color = "gray"
                    text.style.marginLeft = "10px"
                    text.style.marginTop = "20px"
                    div.appendChild(text)
                    let tr = document.createElement("tr")
                    tr.appendChild(ima)
                    tr.appendChild(name)
                    tr.appendChild(price)
                    tr.appendChild(div)
                    tr.appendChild(pricee)
                    tbody.appendChild(tr)

                }
                thread.appendChild(tr)
                table.appendChild(thread)
                table.appendChild(tbody)
                cart.appendChild(table)
            }
        }
        showuser.style.display = ""
        offlist()
    } else {
        alert("Đăng nhập để tiếp tục")
        account.style.display = "flex"
            // signin.style.display = "block"
        showacc(signin, -500, 0)
    }
}
window.onclick = function(e) {
    if (e.target.matches('#div-cart') || e.target.matches('#divdiv-cart')) {
        showacc(document.getElementById("gio-hang"), 0, 1200)
        setTimeout(() => {
            document.getElementById("gio-hang").style.display = ""
            document.getElementById("div-cart").style = ""
            document.getElementById("divdiv-cart").remove()
        }, 400);
    }
}
btnuser.onclick = function() {
    console.log(currentUser)
    if (currentUser != null) {
        if (showuser.style.display == "") {
            uname.innerHTML = currentUser.name
            showuser.style.display = "block"
        } else {
            showuser.style.display = ""
        }
        offlist()
        showcart.style.display = ""

    } else {
        account.style.display = "flex"
        showacc(signin, -500, 0)
    }
}

function showacc(element, ps, lim) {
    let id = null
    element.style.marginTop = ps + "px"
    let pos = ps
    element.style.display = "block"
    offlist()
    id = setInterval(frame, 1)

    function frame() {
        if (pos == lim) {
            clearInterval(id)
            element.style.marginTop = "0"
        } else {
            pos += 10
            element.style.marginTop = pos + "px"
        }
    }
}
let isshow = true
let isshowing = false
btnshowfilter.onclick = function() {
    console.log(isshowing)
    let id = null
    clearInterval(id)
    let pos = 0
    if (!isshowing) {
        isshowing = true
        if (!isshow) { //mở
            btnshowfilter.style.transform = "rotate(0deg)"
            id = setInterval(frame, 15)

            function frame() {
                if (pos == 60) {
                    clearInterval(id)
                    isshow = true
                    isshowing = false
                } else {
                    pos++
                    filterbar.style.marginTop = pos - 60 + "px"
                    poster.style.marginTop = pos + 120 + "px"
                }
            }
            filterbar.style.display = "flex"
        } else { //đóng
            offlist()
            console.log(pos)
            btnshowfilter.style.transform = "rotate(180deg)"
            id = setInterval(frame, 15)

            function frame() {
                if (pos == 60) {
                    isshow = false
                    isshowing = false
                    clearInterval(id)
                    filterbar.style.display = ""
                } else {
                    pos++
                    filterbar.style.marginTop = -pos + "px"
                    poster.style.marginTop = 170 - pos + "px"
                }
            }
        }
    }
}
uname.onclick = function() {
    account.style.display = "flex"
    showacc(in4, -500, 0)
    document.getElementById("named").innerHTML = username
}
document.getElementById("up-date").onclick = function() {
    account.style.display = "flex"
    showacc(updateinf, -500, 0)
}
document.getElementById("btn-update").onclick = function() {
    showacc(in4, 0, 1200)
    setTimeout(() => {
        in4.style.display = ""
        showacc(updateinf, -500, 0)
        updateinf.appendChild(createButtonBack(updateinf, in4))
    }, 300);
}
document.getElementById("home-page").onclick = function() {
    if (document.getElementsByClassName("middle")[0].style.display == "flex") {
        createHomepage()
        let pos = document.documentElement.scrollTop
        let id = setInterval(function frame() {
            if (pos <= 300) {
                clearInterval(id)
            } else {
                pos -= 10
                document.documentElement.scrollTop = pos
            }
        }, 1)

        document.getElementsByClassName("middle")[0].style.display = ""
        document.getElementById("div-list").remove()
        document.getElementById("div-title").remove()
        document.getElementById("page-number").remove()
    }
}

document.getElementById("btn-search").onclick = function() {
    if (document.getElementById("main").style.display != "none") {
        document.getElementById("div-main").remove()
    } else {
        document.getElementById("space-product").remove()
    }
    console.log(document.getElementById("inp-search").value)
    search(document.getElementById("inp-search").value)
    let divSearch = document.createElement("div")
    pathImage.length = 0
    arrProduct.length = 0
    currentPage = 1

    for (let i = 0; i < arrayPro.length; i++) {
        getPath(arrayPro[i].id, path)
    }
    let start = (currentPage - 1) * 12
    let end = (currentPage) * 12
    if (end > arrayPro.length) {
        end = arrayPro.length
    }
    let ulList = document.createElement("ul")
    ulList.id = "list-product"
    ulList.className = "list-product"
    for (let i = start; i < end; i++) {
        let discountPrice = "0"
        let cost = "0"
        let promot = getPromote(arrayPro[i].id)
            // console.log(promot)
        if (promot == -1) {
            discountPrice = arrayPro[i].price
            cost = "0"
        } else {
            cost = arrayPro[i].price
            discountPrice = parseInt(cost) - parseInt(data.promote[promot[0]].discount_price) - parseInt(data.promote[promot[0]].discount_percent) / 100 * cost
        }
        ulList.appendChild(createListProduct(
            pathImage[i],
            arrayPro[i].images,
            arrayPro[i].name,
            discountPrice,
            cost,
            arrayPro[i].made_in,
            arrayPro[i].id,
            arrayPro[i].clasify))
    }
    divSearch.appendChild(ulList)
    document.getElementById("main").appendChild(divSearch)
    console.log(arrayPro, pathImage, arrProduct)
}
let arrayPro = new Array()

function search(text) {
    arrayPro.length = 0
    for (let i = 0; i < data.product.length; i++) {
        if (data.product[i].id.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
            data.product[i].name.toLowerCase().indexOf(text.toLowerCase()) != -1) {
            arrayPro.push(data.product[i])
        }
    }

}