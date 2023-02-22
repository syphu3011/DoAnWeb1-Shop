document.getElementById("btn-search").onclick = function() {
    if (document.getElementById("inp-search").value === "") {
        alert("Chưa nhập từ khoá để tìm")
    } else {
        timkhiem()
    }
}
document.getElementById("inp-search").addEventListener("keypress", function(ev) {
    if (ev.key === "Enter") {
        if (document.getElementById("inp-search").value === "") {
            alert("Chưa nhập từ khoá để tìm")
        } else {
            timkhiem()
        }
    }
})

function timkhiem() {
    isHomePage = false
    isProductShow = false
    let pos = document.documentElement.scrollTop
    let id = setInterval(function frame() {
        if (pos <= 300) {
            clearInterval(id)
        } else {
            pos -= 10
            document.documentElement.scrollTop = pos
        }
    }, 1)
    if (isSearch) {
        document.getElementById("searc").remove()
    } else {
        if (document.getElementsByClassName("middle")[0].style.display == "flex") {
            document.getElementsByClassName("middle")[0].style.display = ""
            if (arrProduct > 0) {
                document.getElementById("div-list").remove()
                document.getElementById("page-number").remove()
            }
            document.getElementById("div-title").remove()
            console.log(isSearch)
        } else {
            document.getElementById("div-main").remove()
            c++
        }
    }
    document.getElementById("main").style.display = "flex"
    isSearch = true
    let clasify = document.getElementById("selected-type").textContent.trim()
    let price = document.getElementById("selected-price").textContent.trim().toLowerCase()
    let promote = document.getElementById("selected-sale").textContent.trim()
        //hàm lấy danh sách
    funcSearch(document.getElementById("inp-search").value.trim().replaceAll(".", ""), clasify, price, promote)
    let divSearch = document.createElement("div")
    divSearch.id = "searc"
    let totalProduct = listTim.length
    let totalPage = 0
    if ((totalProduct % 12) > 0) {
        totalPage = (totalProduct - (totalProduct % 12)) / 12 + 1
    } else {
        totalPage = (totalProduct - (totalProduct % 12)) / 12
    }
    console.log(totalPage, totalProduct)
    let ti = document.createElement("div")
    ti.style.fontSize = "22px"
    ti.style.margin = "30px 40px 0 40px"
    ti.style.paddingBottom = "10px"

    ti.style.borderBottom = "1px solid gray"
    ti.appendChild(document.createTextNode("Không tìm thấy kết quả"))
    if (listTim.length > 0) {
        inStock.length = 0
        currentPage = 1
        let di = document.createElement("div")
        di.id = "di-searc"
        let ulList = document.createElement("ul")
        ulList.id = "list-product"
        ulList.className = "list-product"
        ulList.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"
        ulList.style.padding = "40px"
        ulList.style.margin = "0"
        document.getElementById("space-product").style.width = "100%"
        arrProduct = arrayPro
        let start = (currentPage - 1) * 12
        let end = (currentPage) * 12
        if (end > listTim.length) {
            end = listTim.length
        }
        for (let i = start; i < end; i++) {
            let discountPrice = "0"
            let cost = "0"
            let promot = getPromote(listTim[i].id)
            if (promot == -1) {
                discountPrice = listTim[i].price
                cost = "0"
            } else {
                cost = listTim[i].price
                discountPrice = parseInt(cost) - parseInt(data.promote[promot[0]].discount_price) - parseInt(data.promote[promot[0]].discount_percent) / 100 * cost
            }
            ulList.appendChild(createListProduct(
                "Image/SANPHAM/",
                listTim[i].images,
                listTim[i].name,
                discountPrice,
                cost,
                listTim[i].made_in,
                listTim[i].id,
                listTim[i].clasify))
        }
        divSearch.appendChild(ti)
        di.appendChild(ulList)
        divSearch.appendChild(di)
        let ul = document.createElement("ul")
        ul.id = "page-number"
        let arr = new Array()
        let aArr = new Array()
        for (let i = 1; i <= totalPage; i++) {
            let li = document.createElement("li")
            arr.push(li)
            li.style.border = "1px solid gray"
            li.style.cursor = "pointer"
            li.style.margin = "10px"
            li.style.padding = "5px 10px"
            li.style.borderRadius = "5px"
            li.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            li.style.lineHeight = "20px"
            li.style.transition = "0.8s"
            let a = document.createElement("a")
            a.style.color = "black"
            aArr.push(a)
            a.appendChild(document.createTextNode(i))
            li.onclick = function() {
                arr[currentPage - 1].style.backgroundColor = "white"
                aArr[currentPage - 1].style.color = "black"
                currentPage = parseInt(li.textContent)
                arr[currentPage - 1].style.backgroundColor = "lightpink"
                aArr[currentPage - 1].style.color = "white"
                let pos = document.documentElement.scrollTop
                let id = setInterval(function frame() {
                    if (pos <= 300) {
                        clearInterval(id)
                        document.getElementById("list-product").remove()
                        let ulList = document.createElement("ul")
                        ulList.id = "list-product"
                        ulList.className = "list-product"
                        ulList.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"
                        ulList.style.padding = "40px"
                        ulList.style.margin = "0"
                        document.getElementById("space-product").style.width = "100%"
                        let start = (currentPage - 1) * 12
                        let end = (currentPage) * 12
                        if (end > listTim.length) {
                            end = listTim.length
                        }
                        for (let i = start; i < end; i++) {
                            let discountPrice = "0"
                            let cost = "0"
                            let promot = getPromote(listTim[i].id)
                            if (promot == -1) {
                                discountPrice = listTim[i].price
                                cost = "0"
                            } else {
                                cost = listTim[i].price
                                discountPrice = parseInt(cost) - parseInt(data.promote[promot[0]].discount_price) - parseInt(data.promote[promot[0]].discount_percent) / 100 * cost
                            }
                            ulList.appendChild(createListProduct(
                                "Image/SANPHAM/",
                                listTim[i].images,
                                listTim[i].name,
                                discountPrice,
                                cost,
                                listTim[i].made_in,
                                listTim[i].id,
                                listTim[i].clasify,
                                listTim[i].description))
                        }
                        di.appendChild(ulList)
                    } else {
                        pos -= 10
                        document.documentElement.scrollTop = pos
                    }
                }, 1)
            }
            li.onmouseenter = function() {
                li.style.borderRadius = "50px"
            }
            li.onmouseleave = function() {
                li.style.borderRadius = "5px"
            }
            li.appendChild(a)
            ul.appendChild(li)
            aArr[currentPage - 1].style.color = "white"
            arr[currentPage - 1].style.backgroundColor = "lightpink"
        }
        divSearch.appendChild(ul)
        ti.textContent = "Kết quả"
    } else {
        divSearch.appendChild(ti)
    }
    document.getElementById("main").appendChild(divSearch)
}

function funcSearch(key, loai, gia, khuyenmai) {
    listTim.length = 0
    listTim = locLoai(loai, data.product)
    listTim = locGia(gia, listTim)
    listTim = locKhuyenMai(khuyenmai, listTim)
    listTim = timTuKhoa(key, listTim)
}

function locLoai(loai, arr) {
    let a = new Array()
    let lcLoai = loai.toLowerCase()
    if (lcLoai.indexOf("tất cả") == -1) {
        arr.forEach(element => {
            if (lcLoai.toLowerCase().indexOf(element.clasify[1].toLowerCase()) != -1) {
                a.push(element)
            }
        });
    } else {
        arr.forEach(element => {
            a.push(element)
        });
    }
    return a
}

function locKhuyenMai(khuyenmai, arr) {
    let a = new Array()
    if (khuyenmai.toLowerCase().indexOf("tất cả") != -1) {
        return a = arr
    }
    arr.forEach(element => {
        data.promote.forEach(e => {
            e.products.forEach(ele => {
                if (ele.id.toLowerCase() == element.id.toLowerCase() &&
                    e.name.toLowerCase().indexOf(khuyenmai.toLowerCase()) != -1) {
                    a.push(element)
                }
            })
        })
    })
    return a
}

function locGia(gia, arr) {
    let khoang = gia.replaceAll(".", "").split(" ")
    let a = new Array()
        // console.log(khoang[1])
    if (gia.toLowerCase() == "tất cả") {
        return a = arr
    }
    arr.forEach(element => {
        if (khoang[0].toLowerCase().indexOf("dưới") != -1) {
            if (parseInt(element.price) < parseInt(khoang[1])) {
                a.push(element)
            }
        } else {
            if (khoang[0].toLowerCase().indexOf("trên") != -1) {
                if (parseInt(element.price) > parseInt(khoang[1])) {
                    a.push(element)
                }
            } else {
                if (parseInt(element.price) > parseInt(khoang[1]) &&
                    parseInt(element.price) < parseInt(khoang[3])) {
                    a.push(element)
                }
            }
        }
    })
    return a
}

function timTuKhoa(key, arr) {
    let a = new Array()
    arr.forEach(element => {
        if (element.id.toLowerCase().indexOf(key) != -1 ||
            element.name.toLowerCase().indexOf(key) != -1 ||
            element.made_in.toLowerCase().indexOf(key) != -1 ||
            element.description.toLowerCase().indexOf(key) != -1 ||
            element.price.toLowerCase().indexOf(key) != -1) {
            a.push(element)
        }
    })
    return a
}
let listTim = new Array()

document.getElementById("selected-type").onchange = function() {
    console.log(document.getElementById("selected-type").value)
}