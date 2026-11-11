
const CART_KEY = "n11_cart";

const product = {
    id: "iphone16pro",
    name: "Điện thoại iPhone 16 Pro",
    price: 50990000,
    image: "iphone16pro.png"
};

// Thêm sản phẩm vào giỏ hàng
function addToCart() {
    const quantity = Number(document.getElementById("quantity").value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        alert("Vui lòng nhập số lượng từ 1 đến 99!");
        return false;
    }

    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
        cart[index].quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng!");

    return true;
}

// Nút thêm vào giỏ hàng
document.getElementById("add-to-cart").onclick = addToCart;

// Nút mua ngay
document.getElementById("buy-now").onclick = function () {
    if (addToCart()) {
        window.location.href = "../../GioHang/html/index.html";
    }
};

// Nút trả góp
document.getElementById("installment").onclick = function () {
    alert("Vui lòng liên hệ cửa hàng để được tư vấn trả góp!");
};
