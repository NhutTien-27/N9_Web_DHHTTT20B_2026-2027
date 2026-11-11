const CART_KEY = "n11_cart";
const listEl = document.getElementById("cart-list");

const isValid = (it) =>
  it && it.id && it.name && Number(it.price) > 0 && Number(it.quantity) >= 1;

const getCart = () => {
  try { return (JSON.parse(localStorage.getItem(CART_KEY)) || []).filter(isValid); }
  catch (e) { return []; }
};
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));
const fmt = (n) => n.toLocaleString("vi-VN") + "đ";

// id sản phẩm đang được tick chọn (giữ lại khi render lại)
let selected = new Set();

function render() {
  const cart = getCart();
  if (cart.length === 0) {
    listEl.innerHTML = '<p style="text-align:center;padding:30px">Giỏ hàng trống</p>';
  } else {
    listEl.innerHTML = cart.map((it) => `
      <div class="cart-item" data-id="${it.id}">
        <div class="col-check">
          <input type="checkbox" class="item-check" ${selected.has(it.id) ? "checked" : ""} />
        </div>
        <div class="col-product">
          <img class="item-img" src="../../DetailProduct/img/${it.image}" alt="" />
          <span class="item-name">${it.name}</span>
        </div>
        <div class="col-price">${fmt(it.price)}</div>
        <div class="col-quantity">
          <button class="qty-btn btn-minus">-</button><input class="qty-input" value="${it.quantity}" /><button class="qty-btn btn-plus">+</button>
        </div>
        <div class="col-total">${fmt(it.price * it.quantity)}</div>
        <div class="col-action"><button class="btn-delete">Xóa</button></div>
      </div>`).join("");
  }
  updateTotals();
}

function updateTotals() {
  const cart = getCart();
  const chosen = cart.filter((it) => selected.has(it.id));
  document.getElementById("total-items-count").textContent = cart.length;
  document.getElementById("selected-count").textContent = chosen.length;
  document.getElementById("final-total").textContent =
    fmt(chosen.reduce((s, it) => s + it.price * it.quantity, 0));
  const all = cart.length > 0 && chosen.length === cart.length;
  document.getElementById("check-all").checked = all;
  document.getElementById("check-all-footer").checked = all;
}

function changeQty(id, qty) {
  const cart = getCart();
  const it = cart.find((x) => x.id === id);
  if (!it) return;
  it.quantity = Math.max(1, qty);
  saveCart(cart);
  render();
}

listEl.addEventListener("click", (e) => {
  const row = e.target.closest(".cart-item");
  if (!row) return;
  const id = row.dataset.id;
  const it = getCart().find((x) => x.id === id);
  if (e.target.classList.contains("btn-plus")) changeQty(id, it.quantity + 1);
  if (e.target.classList.contains("btn-minus")) changeQty(id, it.quantity - 1);
  if (e.target.classList.contains("btn-delete")) {
    selected.delete(id);
    saveCart(getCart().filter((x) => x.id !== id));
    render();
  }
});

listEl.addEventListener("change", (e) => {
  const row = e.target.closest(".cart-item");
  if (!row) return;
  const id = row.dataset.id;
  if (e.target.classList.contains("item-check")) {
    e.target.checked ? selected.add(id) : selected.delete(id);
    updateTotals();
  }
  if (e.target.classList.contains("qty-input"))
    changeQty(id, parseInt(e.target.value) || 1);
});

function toggleAll(checked) {
  selected = checked ? new Set(getCart().map((x) => x.id)) : new Set();
  render();
}
document.getElementById("check-all").addEventListener("change", (e) => toggleAll(e.target.checked));
document.getElementById("check-all-footer").addEventListener("change", (e) => toggleAll(e.target.checked));

document.getElementById("btn-delete-selected").addEventListener("click", () => {
  saveCart(getCart().filter((x) => !selected.has(x.id)));
  selected.clear();
  render();
});

document.getElementById("btn-checkout").addEventListener("click", () => {
  if (selected.size === 0) return alert("Vui lòng chọn sản phẩm để mua!");
  alert("Đặt hàng thành công!");
  saveCart(getCart().filter((x) => !selected.has(x.id)));
  selected.clear();
  render();
});

render();
