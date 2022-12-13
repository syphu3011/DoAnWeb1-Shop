document.getElementById("variable").onclick = function() {
    openCloseLeftBar()
        // document.getElementById("content").style.display = "none"
    document.getElementById("div-thongso").style.display = "flex"
    document.getElementById("div-thongso").innerHTML = `
    <div style="background-color: white;
        padding: 20px;
        border-radius: 20px;
        ">
            <div>
                Giới hạn tuổi khách hàng
            </div>
            <div style="display: flex;
                font-size: 16px;
                margin: 10px 30px;">
                <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                ">
                    Nhỏ nhất
                </div>
                <input type="text" name="" id="lim_bot">
                <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                ">
                    Lớn nhất
                </div>
                <input type="text" name="" id="lim_top">
            </div>
            
            <div>
                Giới hạn tuổi nhân viên
            </div>
            <div style="display: flex;
                font-size: 16px;
                margin: 10px 30px;">
                <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                ">
                    Nhỏ nhất
                </div>
                <input type="text" name="" id="lim_bot_nv">
                <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                ">
                    Lớn nhất
                </div>
                <input type="text" name="" id="lim_top_nv">
            </div>
            <div style="display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;">
                <div>
                    <button onclick="btnGH_Tuoi()" id="btn-xnts">Xác nhận</button>
                </div>
            </div>
        </div>
    `
    data12 = JSON.parse(localStorage.getItem("data"))
    document.getElementById("lim_bot").value=data12.variable[0].gh_duoi
    document.getElementById("lim_top").value=data12.variable[0].gh_tren
    document.getElementById("lim_bot_nv").value=data12.variable[3].gh_duoi
    document.getElementById("lim_top_nv").value=data12.variable[3].gh_tren
    document.getElementById("div-thongso").onclick = function(e) {
        if (e.target.matches("#div-thongso")) {
            document.getElementById("div-thongso").style.display = "none"
        }
    }
}

function btnGH_Tuoi() {
    let limbot = document.getElementById("lim_bot").value
    let limtop = document.getElementById("lim_top").value
    let limbotnv = document.getElementById("lim_bot_nv").value
    let limtopnv = document.getElementById("lim_top_nv").value
    if (checkNumber(limbot) && checkNumber(limtop)&&checkNumber(limbotnv) && checkNumber(limtopnv)) {
        if (parseInt(limbot) < parseInt(limtop)) {
            alert("Cập nhật thành công")
            document.getElementById("div-thongso").style.display = "none"
            data12 = JSON.parse(localStorage.getItem("data"))
            data12.variable[0].gh_duoi = limbot
            data12.variable[0].gh_tren = limtop
            data12.variable[3].gh_duoi = limbotnv
            data12.variable[3].gh_tren = limtopnv
            localStorage.setItem("data", JSON.stringify(data12))
        } else {
            alert("Tuổi nhỏ nhất không được lớn hơn tuổi lớn nhất")
        }
    } else {
        alert("Chỉ nhập số")
    }
}