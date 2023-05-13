function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value>>>amount) | (value<<(32 - amount));
    };
    
    let mathPow = Math.pow;
    let maxWord = mathPow(2, 32);
    let lengthProperty = 'length'
    let i, j; // Used as a counter across the whole file
    let result = ''

    let words = [];
    let asciiBitLength = ascii[lengthProperty]*8;
    
    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    let hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    let k = sha256.k = sha256.k || [];
    let primeCounter = k[lengthProperty];
    /*/
    let hash = [], k = [];
    let primeCounter = 0;
    //*/

    let isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
            k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
        }
    }
    
    ascii += '\x80' // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j>>8) return; // ASCII check: only accept characters in range 0-255
        words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
    words[words[lengthProperty]] = (asciiBitLength)
    
    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        let w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
        let oldHash = hash;
        // This is now the undefinedworking hash", often labelled as variables a...g
        // (we have to truncate as well, otherwise extra entries at the end accumulate
        hash = hash.slice(0, 8);
        
        for (i = 0; i < 64; i++) {
            let i2 = i + j;
            // Expand the message into 64 words
            // Used below if 
            let w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            let a = hash[0], e = hash[4];
            let temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e&hash[5])^((~e)&hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                    )|0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            let temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
            
            hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1)|0;
        }
        
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i])|0;
        }
    }
    
    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            let b = (hash[i]>>(j*8))&255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};



document
    .getElementById("form_login")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        let username = document.getElementById("mailorphone").value;
        let password = document.getElementById("passwd").value;
        password = sha256(password);
        if (username != "") {
            if (password != "") {
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            let response = JSON.parse(xhr.responseText);
                            console.log(response);
                            if (response.success) {
                                if (response.message == "Đăng nhập thành công. Đã tạo phiên đăng nhập mới.") {
                                    document.cookie = response.cookie
                                    currentUser = response.data.customer;
                                    showacc(signin, 0, 1200);
                                    setTimeout(() => {
                                        signin.style.display = "";
                                        account.style.display = "";
                                        $("#noti").css("display", "flex");
                                        $("#noti-noti").html(`Đăng nhập thành công`);
                                        showacc(document.getElementById("noti-noti"),-500,0);
                                        $("#noti-noti").css("display", "flex");
                                        setTimeout(() => {$("#noti").css("display", "");}, 700);
                                    }, 450);
                                    // alert("Đăng nhập thành công!");
                                    let data_cookie = response.cookie.split("?")
                                    fill_infor(data_cookie[3], data_cookie[4], data_cookie[5],data_cookie[6], data_cookie[7], data_cookie[8]
                                    );
                                } else {
                                    console.log("Bạn đang đăng nhập với vai trò nhân viên");

                                    

                                    localStorage.setItem(
                                        "currentStaff",
                                        JSON.stringify(response.data.staff)
                                    );
                                    localStorage.setItem("checkLogin", true);
                                    window.location.href = "./admin/index.html";
                                }
                            } else {
                                $("#mailorphone").focus();
                                alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
                            }
                        } else {
                            alert("Lỗi khi kết nối đến server!");
                        }
                    }
                };
                xhr.open("POST", "./Server/get_customer.php");
                xhr.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                );
                xhr.send("username=" + username + "&password=" + password);
            } else {
                $("#passwd").focus();
                alert("Mật khẩu không được bỏ trống");
            }
        } else {
            $("#mailorphone").focus();
            alert("Tên đăng nhập không được bỏ trống");
        }
    });
function fill_infor(
    id,
    name,
    number_phone,
    birth_day,
    gender,
    password_customer
) {
    document.getElementById("update-name").value = name;
    document.getElementById("update-contact").value = number_phone;
    birth_day = birth_day.split(" ")[0];
    document.getElementById("update-birthday").value = birth_day;
    if (gender == "nam") {
        document.getElementById("male").checked = true;
    } else if (gender == "nữ") {
        document.getElementById("female").checked = true;
    } else {
        document.getElementById("other").checked = true;
    }
    // document.getElementById("save-update").onclick = function () {
    //     $.ajax({
    //         url: "./admin/Server/customer/customer.php?action=update",
    //         method: "POST",
    //         dataType: "json",
    //         data: {
    //             id: id,
    //             name: name,
    //             numberphone: number_phone,
    //             birthday: birth_day,
    //             gender: gender,
    //             // password: password_customer
    //         },
    //         success: function (response) {
    //             console.log(response);
    //         },
    //         error: function (xhr, status, error) {
    //             console.log(error);
    //         },
    //     });
    // };
}
