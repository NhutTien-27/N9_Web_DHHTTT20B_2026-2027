
// LẤY ELEMENT
const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const alertError = document.getElementById("alertError");


// KHAI BÁO REGEX
let regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


// HÀM KIỂM TRA EMAIL
function kiemTraEmail() {

    let loi = emailElement.nextElementSibling;

    if (emailElement.value.trim() === "") {
        loi.innerText = "Email không được để trống!";
        emailElement.classList.add("input-error");
        emailElement.classList.remove("input-success");
        return false;
    }

    if (!regexEmail.test(emailElement.value.trim())) {
        loi.innerText = "Email phải có định dạng Gmail hợp lệ!";
        emailElement.classList.add("input-error");
        emailElement.classList.remove("input-success");
        return false;
    }

    loi.innerText = "";
    emailElement.classList.remove("input-error");
    emailElement.classList.add("input-success");

    return true;
}


// HÀM KIỂM TRA MẬT KHẨU
function kiemTraMatKhau() {

    let loi = passwordElement.nextElementSibling;

    if (passwordElement.value.trim() === "") {
        loi.innerText = "Mật khẩu không được để trống!";
        passwordElement.classList.add("input-error");
        passwordElement.classList.remove("input-success");
        return false;
    }

    loi.innerText = "";
    passwordElement.classList.remove("input-error");
    passwordElement.classList.add("input-success");

    return true;
}


// KIỂM TRA KHI RỜI KHỎI Ô NHẬP (BLUR)
emailElement.addEventListener("blur", function () {
    kiemTraEmail();
});

passwordElement.addEventListener("blur", function () {
    kiemTraMatKhau();
});


// KIỂM TRA KHI ĐANG NHẬP (INPUT)
emailElement.addEventListener("input", function () {
    if (emailElement.classList.contains("input-error")) {
        kiemTraEmail();
    }
});

passwordElement.addEventListener("input", function () {
    if (passwordElement.classList.contains("input-error")) {
        kiemTraMatKhau();
    }
});


// XỬ LÝ ĐĂNG NHẬP
formLogin.addEventListener("submit", function(e) {

    // Ngăn reload trang
    e.preventDefault();

    // Kiểm tra dữ liệu
    let hopLe = true;

    if (!kiemTraEmail()) {
        hopLe = false;
    }

    if (!kiemTraMatKhau()) {
        hopLe = false;
    }

    if (!hopLe) {
        alertError.style.display = "none";
        return;
    }

    // Lấy dữ liệu từ localStorage
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm tài khoản phù hợp
    const findUser = userLocal.find(
        (user) =>
            user.email === emailElement.value.trim() &&
            user.password === passwordElement.value
    );

    // Nếu không tìm thấy tài khoản
    if (!findUser) {

        alertError.style.display = "block";
        alertError.innerHTML = "Email hoặc mật khẩu không chính xác!";

    }

    // Nếu tìm thấy tài khoản
    else {

        alertError.style.display = "none";

        // Lưu thông tin người đăng nhập
        localStorage.setItem("userLogin", JSON.stringify(findUser));

        // Chuyển về trang chủ
        window.location.href = "../../Home/html/home.html";

    }

});
