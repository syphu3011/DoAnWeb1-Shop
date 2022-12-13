let btnMenu = document.getElementById("menu")
let showMenu = document.getElementById("show-menu")
let areMenu = document.getElementById("area-menu")
let btnHome = document.getElementById("home-page")
let btnInfo = document.getElementById("info")
let iconHome = document.getElementById("icon-home")
let iconInfo = document.getElementById("icon-info")
isShowing = false
btnMenu.onclick = function() {
    if (!isShowing) {
        let id = null;
        clearInterval(id);
        if (areMenu.style.display == "") {
            areMenu.style.display = "flex"
            showMenu.style.marginLeft = "-45%";
            showMenu.style.marginRight = "115%";
            isShowing = true;
            let pos = 45;
            id = setInterval(frame, 15);

            function frame() {
                if (pos == 0) {
                    isShowing = false
                    clearInterval(id);
                } else {
                    pos--;
                    showMenu.style.marginLeft = -pos + "%";
                    showMenu.style.marginRight = 70 + pos + "%";
                }
            }
        } else {
            isShowing = true;
            let pos = 0;
            id = setInterval(frame, 15);

            function frame() {
                if (pos == 50) {
                    areMenu.style.display = ""
                    showMenu.style.marginLeft = "0"
                    isShowing = false
                    clearInterval(id);
                } else {
                    pos++;
                    showMenu.style.marginLeft = -pos + "%";
                    showMenu.style.marginRight = 70 + pos + "%";
                }
            }
        }
    }
}

btnHome.onmouseenter = function() {
    btnHome.style.backgroundColor = "black"
    btnHome.style.color = "white"
    btnHome.style.padding = "0"
    btnHome.style.margin = "0"
    iconHome.style.filter = "invert(100%)"
    btnHome.style.paddingBottom = "20px"

}
btnHome.onmouseleave = function() {
    btnHome.style.backgroundColor = "white"
    btnHome.style.color = "black"
    btnHome.style.padding = "0"
    btnHome.style.marginLeft = "30px"
    btnHome.style.marginRight = "30px"
    iconHome.style.filter = "invert(0%)"
    btnHome.style.paddingBottom = "20px"
}

btnInfo.onmouseenter = function() {
    btnInfo.style.backgroundColor = "black"
    btnInfo.style.color = "white"
    btnInfo.style.padding = "0"
    btnInfo.style.margin = "0"
    iconInfo.style.filter = "invert(100%)"
    btnInfo.style.paddingBottom = "20px"

}
btnInfo.onmouseleave = function() {
    btnInfo.style.backgroundColor = "white"
    btnInfo.style.color = "black"
    btnInfo.style.padding = "0"
    btnInfo.style.marginLeft = "30px"
    btnInfo.style.marginRight = "30px"
    iconInfo.style.filter = "invert(0%)"
    btnInfo.style.paddingBottom = "20px"
}

window.onclick = function(e) {
    var x = e.pageX
    if (x > showMenu.offsetWidth) {
        if (!isShowing) {
            isShowing = true;
            let pos = 0;
            id = setInterval(frame, 15);

            function frame() {
                if (pos == 50) {
                    areMenu.style.display = ""
                    showMenu.style.marginLeft = "0"
                    isShowing = false
                    clearInterval(id);
                } else {
                    pos++;
                    showMenu.style.marginLeft = -pos + "%";
                    showMenu.style.marginRight = 70 + pos + "%";
                }
            }
        }
    }
}