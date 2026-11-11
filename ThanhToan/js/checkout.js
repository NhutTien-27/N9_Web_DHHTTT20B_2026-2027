let form = document.getElementById("checkout-form");
let regexName = /^[\p{L}]+(?:\s+[\p{L}]+)+$/u;
let regexPhone = /^(03|05|07|08|09)[0-9]{8}$/;
let regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
let regexAddress = /^.{5,}$/;
let regexDistrict = /^.{2,}$/;

let fullname = document.getElementById("fullname");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let address = document.getElementById("address");
let city = document.getElementById("city");
let district = document.getElementById("district");


// HÀM KIỂM TRA REGEX
function kiemTra(input, regex, thongBao) {
    let loi = input.nextElementSibling;
    if (input.value.trim() === "") {
        loi.innerText = "Không được để trống!";
        input.classList.add("input-error");
        input.classList.remove("input-success");
        return false;
    }
    if (!regex.test(input.value.trim())) {
        loi.innerText = thongBao;
        input.classList.add("input-error");
        input.classList.remove("input-success");
        return false;
    }
    loi.innerText = "";
    input.classList.remove("input-error");
    input.classList.add("input-success");

    return true;
}

// HÀM KIỂM TRA TỈNH / THÀNH PHỐ
function kiemTraSelect(input) {
    let loi = input.nextElementSibling;
    if (input.value === "") {
        loi.innerText = "Vui lòng chọn tỉnh/thành phố!";
        input.classList.add("input-error");
        input.classList.remove("input-success");
        return false;
    }
    loi.innerText = "";
    input.classList.remove("input-error");
    input.classList.add("input-success");
    return true;
}

// KIỂM TRA KHI RỜI KHỎI Ô NHẬP (BLUR)
fullname.addEventListener("blur", function () {
    kiemTra(fullname, regexName, "Họ tên phải có ít nhất 2 từ!");
});

phone.addEventListener("blur", function () {
    kiemTra(phone, regexPhone, "Số điện thoại phải có 10 số và bắt đầu bằng 0!");
});

email.addEventListener("blur", function () {
    kiemTra(email, regexEmail, "Email phải có định dạng Gmail hợp lệ!");
});

address.addEventListener("blur", function () {
    kiemTra(address, regexAddress, "Địa chỉ phải có ít nhất 5 ký tự!");
});

city.addEventListener("blur", function () {
    kiemTraSelect(city);
});

district.addEventListener("blur", function () {

    if (district.value.trim() === "") {
        district.nextElementSibling.innerText = "";
        district.classList.remove("input-error", "input-success");
    }
    else {
        kiemTra(district, regexDistrict, "Quận/huyện phải có ít nhất 2 ký tự!");
    }

});


// KIỂM TRA LẠI KHI ĐANG NHẬP
fullname.addEventListener("input", function () {
    if (fullname.classList.contains("input-error")) {
        kiemTra(fullname, regexName, "Họ tên phải có ít nhất 2 từ!");
    }
});

phone.addEventListener("input", function () {
    if (phone.classList.contains("input-error")) {
        kiemTra(phone, regexPhone, "Số điện thoại phải có 10 số và bắt đầu bằng 0!");
    }
});

email.addEventListener("input", function () {
    if (email.classList.contains("input-error")) {
        kiemTra(email, regexEmail, "Email phải có định dạng Gmail hợp lệ!");
    }
});

address.addEventListener("input", function () {
    if (address.classList.contains("input-error")) {
        kiemTra(address, regexAddress, "Địa chỉ phải có ít nhất 5 ký tự!");
    }
});


// KIỂM TRA KHI NHẤN ĐẶT HÀNG
form.addEventListener("submit", function (e) {

    let hopLe = true;

    if (!kiemTra(fullname, regexName, "Họ tên phải có ít nhất 2 từ!"))
        hopLe = false;

    if (!kiemTra(phone, regexPhone, "Số điện thoại phải có 10 số và bắt đầu bằng 0!"))
        hopLe = false;

    if (!kiemTra(email, regexEmail, "Email phải có định dạng Gmail hợp lệ!"))
        hopLe = false;

    if (!kiemTra(address, regexAddress, "Địa chỉ phải có ít nhất 5 ký tự!"))
        hopLe = false;

    if (!kiemTraSelect(city))
        hopLe = false;

    if (district.value.trim() !== "" &&
        !kiemTra(district, regexDistrict, "Quận/huyện phải có ít nhất 2 ký tự!")) {
        hopLe = false;
    }

    if (!hopLe) {
        e.preventDefault();
        return;
    }

    // Ngăn gửi form mặc định vì đây là website mô phỏng
    e.preventDefault();

    alert("Đặt hàng thành công!");

});
