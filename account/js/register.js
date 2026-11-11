
// LẤY ELEMENT
const formRegister = document.getElementById("formRegister");

const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const phoneElement = document.getElementById("phone");
const passwordElement = document.getElementById("password");
const repasswordElement = document.getElementById("repassword");
const addressElement = document.getElementById("address");

// ELEMENT HIỂN THỊ LỖI
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const repasswordError = document.getElementById("repasswordError");


// KHAI BÁO REGEX
let regexName = /^[A-Za-zÀ-ỹ]+(\s+[A-Za-zÀ-ỹ]+)+$/;
let regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
let regexPhone = /^(03|05|07|08|09)[0-9]{8}$/;


// HÀM HIỂN THỊ LỖI
function hienThiLoi(input, error, thongBao) {

    error.style.display = "block";
    error.innerText = thongBao;

    input.classList.add("input-error");
    input.classList.remove("input-success");
}


// HÀM HIỂN THỊ THÀNH CÔNG
function hienThiDung(input, error) {

    error.style.display = "none";

    input.classList.remove("input-error");
    input.classList.add("input-success");
}


// 1. KIỂM TRA HỌ TÊN
function kiemTraTen() {

    let ten = usernameElement.value.trim();

    if (ten === "") {
        hienThiLoi(usernameElement, usernameError,
            "Họ và tên không được để trống!");
        return false;
    }

    if (!regexName.test(ten) || ten.length > 50) {
        hienThiLoi(usernameElement, usernameError,
            "Họ tên phải có ít nhất 2 từ và chỉ chứa chữ cái!");
        return false;
    }

    hienThiDung(usernameElement, usernameError);
    return true;
}


// 2. KIỂM TRA EMAIL
function kiemTraEmail() {

    let email = emailElement.value.trim();

    if (email === "") {
        hienThiLoi(emailElement, emailError,
            "Email không được để trống!");
        return false;
    }

    if (!regexEmail.test(email)) {
        hienThiLoi(emailElement, emailError,
            "Email phải có định dạng Gmail hợp lệ!");
        return false;
    }

    hienThiDung(emailElement, emailError);
    return true;
}


// 3. KIỂM TRA SỐ ĐIỆN THOẠI
function kiemTraPhone() {

    let phone = phoneElement.value.trim();

    if (phone === "") {
        hienThiLoi(phoneElement, phoneError,
            "Số điện thoại không được để trống!");
        return false;
    }

    if (!regexPhone.test(phone)) {
        hienThiLoi(phoneElement, phoneError,
            "Số điện thoại phải có 10 số và đầu số 03, 05, 07, 08 hoặc 09!");
        return false;
    }

    hienThiDung(phoneElement, phoneError);
    return true;
}


// 4. KIỂM TRA MẬT KHẨU
function kiemTraMatKhau() {

    let password = passwordElement.value;

    if (password === "") {
        hienThiLoi(passwordElement, passwordError,
            "Mật khẩu không được để trống!");
        return false;
    }

    if (password.length < 6) {
        hienThiLoi(passwordElement, passwordError,
            "Mật khẩu phải có ít nhất 6 ký tự!");
        return false;
    }

    hienThiDung(passwordElement, passwordError);
    return true;
}


// 5. KIỂM TRA NHẬP LẠI MẬT KHẨU
function kiemTraNhapLai() {

    let repassword = repasswordElement.value;

    if (repassword === "") {
        hienThiLoi(repasswordElement, repasswordError,
            "Vui lòng nhập lại mật khẩu!");
        return false;
    }

    if (repassword !== passwordElement.value) {
        hienThiLoi(repasswordElement, repasswordError,
            "Mật khẩu không khớp!");
        return false;
    }

    hienThiDung(repasswordElement, repasswordError);
    return true;
}


// SỰ KIỆN BLUR: KIỂM TRA KHI RỜI KHỎI Ô NHẬP
usernameElement.addEventListener("blur", kiemTraTen);

emailElement.addEventListener("blur", kiemTraEmail);

phoneElement.addEventListener("blur", kiemTraPhone);

passwordElement.addEventListener("blur", kiemTraMatKhau);

repasswordElement.addEventListener("blur", kiemTraNhapLai);


// SỰ KIỆN INPUT: KIỂM TRA KHI ĐANG SỬA DỮ LIỆU
usernameElement.addEventListener("input", function () {
    if (usernameError.style.display === "block") {
        kiemTraTen();
    }
});

emailElement.addEventListener("input", function () {
    if (emailError.style.display === "block") {
        kiemTraEmail();
    }
});

phoneElement.addEventListener("input", function () {
    if (phoneError.style.display === "block") {
        kiemTraPhone();
    }
});

passwordElement.addEventListener("input", function () {

    if (passwordError.style.display === "block") {
        kiemTraMatKhau();
    }

    // Nếu đã nhập lại mật khẩu thì kiểm tra lại
    if (repasswordElement.value !== "") {
        kiemTraNhapLai();
    }
});

repasswordElement.addEventListener("input", function () {
    if (repasswordError.style.display === "block") {
        kiemTraNhapLai();
    }
});


// XỬ LÝ ĐĂNG KÝ
formRegister.addEventListener("submit", function(e) {

    // Ngăn reload trang
    e.preventDefault();

    let isValid = true;

    // Kiểm tra toàn bộ thông tin
    if (!kiemTraTen()) {
        isValid = false;
    }

    if (!kiemTraEmail()) {
        isValid = false;
    }

    if (!kiemTraPhone()) {
        isValid = false;
    }

    if (!kiemTraMatKhau()) {
        isValid = false;
    }

    if (!kiemTraNhapLai()) {
        isValid = false;
    }

    // Nếu dữ liệu không hợp lệ
    if (!isValid) {
        return;
    }


    // LẤY DANH SÁCH TÀI KHOẢN
    let userLocal = JSON.parse(localStorage.getItem("users")) || [];


    // KIỂM TRA EMAIL ĐÃ TỒN TẠI
    let findUser = userLocal.find(
        user => user.email.toLowerCase() === emailElement.value.trim().toLowerCase()
    );

    if (findUser) {
        hienThiLoi(emailElement, emailError,
            "Email này đã được đăng ký!");
        return;
    }


    // TẠO ĐỐI TƯỢNG USER MỚI
    const user = {

        userId: Math.ceil(Math.random() * 100000000),

        username: usernameElement.value.trim(),

        email: emailElement.value.trim(),

        phone: phoneElement.value.trim(),

        password: passwordElement.value,

        address: addressElement.value.trim()

    };


    // THÊM USER VÀO MẢNG
    userLocal.push(user);


    // LƯU VÀO LOCAL STORAGE
    localStorage.setItem("users", JSON.stringify(userLocal));


    // THÔNG BÁO ĐĂNG KÝ THÀNH CÔNG
    alert("Đăng ký tài khoản thành công!");


    // CHUYỂN SANG TRANG ĐĂNG NHẬP
    window.location.href = "login.html";

});
