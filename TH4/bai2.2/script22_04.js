const productPrices = {
    laptop: 25000000,
    mouse: 500000,
    keyboard: 1200000
};

const productNames = {
    laptop: "Laptop Gaming",
    mouse: "Chuột Không Dây",
    keyboard: "Bàn Phím Cơ"
};

const form = document.getElementById('orderForm');
const modal = document.getElementById('confirmModal');
const successOverlay = document.getElementById('successMsg');

const elProduct = document.getElementById('product');
const elQuantity = document.getElementById('quantity');
const elDate = document.getElementById('deliveryDate');
const elAddress = document.getElementById('address');
const elNote = document.getElementById('note');
const elTotalPrice = document.getElementById('totalPrice');
const elCharCount = document.getElementById('charCount');


function showError(id, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById(`${id}-error`);
    if (el && el.type !== 'radio') el.classList.add('is-invalid');
    if (err) err.innerText = msg;
}

function clearError(id) {
    const el = document.getElementById(id);
    const err = document.getElementById(`${id}-error`);
    if (el) el.classList.remove('is-invalid');
    if (err) err.innerText = '';
}

function validateProduct() {
    if (elProduct.value === "") {
        showError('product', 'Vui lòng chọn một sản phẩm.');
        return false;
    }
    clearError('product');
    return true;
}

function validateQuantity() {
    const val = parseInt(elQuantity.value);
    if (isNaN(val) || val < 1 || val > 99) {
        showError('quantity', 'Số lượng phải từ 1 đến 99.');
        return false;
    }
    clearError('quantity');
    return true;
}

function validateDate() {
    const selectedDate = new Date(elDate.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (elDate.value === "") {
        showError('deliveryDate', 'Vui lòng chọn ngày giao.');
        return false;
    }
    if (selectedDate < today) {
        showError('deliveryDate', 'Ngày giao không được ở quá khứ.');
        return false;
    }
    if (selectedDate > maxDate) {
        showError('deliveryDate', 'Không được giao xa quá 30 ngày.');
        return false;
    }
    clearError('deliveryDate');
    return true;
}

function validateAddress() {
    if (elAddress.value.trim().length < 10) {
        showError('address', 'Địa chỉ phải có ít nhất 10 ký tự.');
        return false;
    }
    clearError('address');
    return true;
}

function validateNote() {
    if (elNote.value.length > 200) {
        showError('note', 'Ghi chú không được vượt quá 200 ký tự.');
        return false;
    }
    clearError('note');
    return true;
}

function validatePayment() {
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) {
        showError('payment', 'Vui lòng chọn phương thức thanh toán.');
        return false;
    }
    clearError('payment');
    return true;
}


function calculateTotal() {
    const price = productPrices[elProduct.value] || 0;
    const qty = parseInt(elQuantity.value) || 0;
    const total = price * qty;
    elTotalPrice.innerText = total.toLocaleString('vi-VN') + "đ";
}

elNote.addEventListener('input', () => {
    const len = elNote.value.length;
    elCharCount.innerText = `${len}/200`;
    if (len > 200) {
        elCharCount.classList.add('limit-reached');
        validateNote();
    } else {
        elCharCount.classList.remove('limit-reached');
        clearError('note');
    }
});


elProduct.addEventListener('change', () => { validateProduct(); calculateTotal(); });
elQuantity.addEventListener('input', () => { validateQuantity(); calculateTotal(); });
elDate.addEventListener('change', validateDate);
elAddress.addEventListener('input', validateAddress);


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateProduct() & validateQuantity() & validateDate() & 
                    validateAddress() & validateNote() & validatePayment();

    if (isValid) {
        const payment = document.querySelector('input[name="payment"]:checked').value;
        document.getElementById('summaryDetails').innerHTML = `
            <p><strong>Sản phẩm:</strong> ${productNames[elProduct.value]}</p>
            <p><strong>Số lượng:</strong> ${elQuantity.value}</p>
            <p><strong>Ngày giao:</strong> ${elDate.value}</p>
            <p><strong>Thanh toán:</strong> ${payment}</p>
            <hr>
            <p style="font-size: 1.2rem"><strong>Tổng tiền:</strong> <span style="color:#2563eb">${elTotalPrice.innerText}</span></p>
        `;
        modal.style.display = "flex";
    }
});

document.getElementById('btnCancel').onclick = () => modal.style.display = "none";
document.getElementById('btnFinalConfirm').onclick = () => {
    modal.style.display = "none";
    successOverlay.classList.remove('hidden');
};