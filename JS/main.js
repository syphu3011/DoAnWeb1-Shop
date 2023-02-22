function createHomepage() {
    let div = document.createElement("div")
    div.id = "div-main"
    for (let i = 0; i < data.largeClassify.length; i++) {
        div.appendChild(createMainPro(data.largeClassify[i]))
    }
    document.getElementById("main").appendChild(div)
    for (let j = 0; j < document.getElementsByClassName("list-product").length; j++)
        document.getElementsByClassName("list-product")[j].style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr"
}
createHomepage()
    // let path = JSON.parse(JSON.stringify(pathImg))

function createMainPro(clasify) {
    pathImage.length = 0
    path = JSON.parse(JSON.stringify(pathImg))
    arrProduct.length = 0
    let div = document.createElement("div")
    let title = document.createElement("div")
    title.style.fontSize = "22px"
    div.style.margin = "20px 40px"
    title.style.display = "block"
    title.style.borderBottom = "1px solid gray"
    title.style.paddingBottom = "10px"
    title.appendChild(document.createTextNode(clasify.name))
    div.appendChild(title)
    currentPage = 1
    let divPro = document.createElement("div")
    divPro.style.display = "grid"
    for (let i = 0; i < clasify.miniClassify.length; i++) {
        getProduct(clasify.miniClassify[i].id)
        getPath(clasify.miniClassify[i].id, path)
    }
    divPro.appendChild(addListProduct(clasify.id, 5))
    let btnList = document.createElement("div")
    btnList.style.display = "flex"
    btnList.style.justifyContent = "center"
    let a = document.createElement("a")
    a.style.fontSize = "18px"
    a.style.cursor = "pointer"
    a.style.margin = "15px"
    a.onclick = function() {
        // console.log("onclick")
        let pos = document.documentElement.scrollTop
        let id = setInterval(function frame() {
            if (pos <= 300) {
                clearInterval(id)
                document.getElementById("main").style.display = ""
                document.getElementById("div-main").remove()
                document.getElementsByClassName("middle")[0].style.display = "flex"
                createPageProduct(
                    document.getElementById("space-product"),
                    clasify.name,
                    clasify.id,
                    12
                )
            } else {
                pos -= 10
                document.documentElement.scrollTop = pos
            }
        }, 1)
    }
    a.appendChild(document.createTextNode("Xem chi tiết"))
    btnList.appendChild(a)
    div.appendChild(divPro)
    div.appendChild(btnList)
    return div
}