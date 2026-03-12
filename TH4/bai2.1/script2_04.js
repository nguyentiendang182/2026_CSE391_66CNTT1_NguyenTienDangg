const form = document.getElementById('registerForm');
const formContainer = document.getElementById('formContainer');
const successContainer = document.getElementById('successContainer');
const successName = document.getElementById('successName');

const elFullname = document.getElementById('fullname');
const elEmail = document.getElementById('email');
const elPhone = document.getElementById('phone');
const elPassword = document.getElementById('password');
const elConfirmPassword = document.getElementById('confirmPassword');
const radiosGender = document.getElementsByName('gender');
const elTerms = document.getElementById('terms');

function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    if (inputElement && inputElement.type !== 'radio' && inputElement.type !== 'checkbox') {
        inputElement.classList.add('is-invalid');
    }
    if (errorElement) {
        errorElement.innerText = message;
    }
}

function clearError(inputId) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    if (inputElement) {
        inputElement.classList.remove('is-invalid');
    }
    if (errorElement) {
        errorElement.innerText = '';
    }
}


function validateFullname() {
    const value = elFullname.value.trim();
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]{3,}$/;
    
    if (value === "") {
        showError('fullname', 'Họ tên không được để trống.');
        return false;
    } else if (!nameRegex.test(value)) {
        showError('fullname', 'Họ tên phải từ 3 ký tự, chỉ chứa chữ cái và khoảng trắng.');
        return false;
    }
    clearError('fullname');
    return true;
}

function validateEmail() {
    const value = elEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === "") {
        showError('email', 'Email không được để trống.');
        return false;
    } else if (!emailRegex.test(value)) {
        showError('email', 'Email không đúng định dạng (VD: name@gmail.com).');
        return false;
    }
    clearError('email');
    return true;
}

function validatePhone() {
    const value = elPhone.value.trim();
    const phoneRegex = /^0\d{9}$/;
    
    if (value === "") {
        showError('phone', 'Số điện thoại không được để trống.');
        return false;
    } else if (!phoneRegex.test(value)) {
        showError('phone', 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.');
        return false;
    }
    clearError('phone');
    return true;
}

function validatePassword() {
    const value = elPassword.value;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    if (value === "") {
        showError('password', 'Mật khẩu không được để trống.');
        return false;
    } else if (!passRegex.test(value)) {
        showError('password', 'Mật khẩu ≥ 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số.');
        return false;
    }
    clearError('password');
    if (elConfirmPassword.value !== "") validateConfirmPassword(); 
    return true;
}

function validateConfirmPassword() {
    const passValue = elPassword.value;
    const confirmValue = elConfirmPassword.value;
    
    if (confirmValue === "") {
        showError('confirmPassword', 'Vui lòng xác nhận mật khẩu.');
        return false;
    } else if (confirmValue !== passValue) {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp.');
        return false;
    }
    clearError('confirmPassword');
    return true;
}

function validateGender() {
    let isChecked = false;
    for (const radio of radiosGender) {
        if (radio.checked) {
            isChecked = true;
            break;
        }
    }
    if (!isChecked) {
        showError('gender', 'Vui lòng chọn giới tính.');
        return false;
    }
    clearError('gender');
    return true;
}

function validateTerms() {
    if (!elTerms.checked) {
        showError('terms', 'Bạn phải đồng ý với điều khoản.');
        return false;
    }
    clearError('terms');
    return true;
}



elFullname.addEventListener('blur', validateFullname);
elEmail.addEventListener('blur', validateEmail);
elPhone.addEventListener('blur', validatePhone);
elPassword.addEventListener('blur', validatePassword);
elConfirmPassword.addEventListener('blur', validateConfirmPassword);

elFullname.addEventListener('input', () => clearError('fullname'));
elEmail.addEventListener('input', () => clearError('email'));
elPhone.addEventListener('input', () => clearError('phone'));
elPassword.addEventListener('input', () => clearError('password'));
elConfirmPassword.addEventListener('input', () => clearError('confirmPassword'));

radiosGender.forEach(radio => radio.addEventListener('change', () => clearError('gender')));
elTerms.addEventListener('change', () => clearError('terms'));

form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const isNameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPassValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();

    const isFormValid = isNameValid && isEmailValid && isPhoneValid && 
                        isPassValid && isConfirmValid && isGenderValid && isTermsValid;

    if (isFormValid) {
        formContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
        successName.innerText = elFullname.value.trim();
    }
});