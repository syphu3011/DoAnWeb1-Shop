let arrImg = ["poster.png", "img_banner_watch_women.jpeg", "img_banner_watch_men.jpeg", "balo-img.png", "sale-0.jpeg"]
let x = 1
let y = 2
let btnPrevious = document.getElementById("btn-previous")
let btnNext = document.getElementById("btn-next")
let isClicked = false
let interv = setInterval(function() {
    inter()
}, 5000)

function inter() {
    if (x >= arrImg.length) {
        x = 0
    }
    if (y >= arrImg.length) {
        y = 0
    }
    document.getElementById("ps1").src = "Image/poster/" + arrImg[x]
    document.getElementById("ps2").src = "Image/poster/" + arrImg[y]
    x++
    y++
    // console.log(x, y)
    // console.log("interval")
}