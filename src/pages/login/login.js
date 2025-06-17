import { insertFooter } from "../../modules/footer/footer.js";

insertFooter(document.getElementById("footer"));
const form = document.getElementById('login-form');
const emailInput = document.getElementById('username');
const passInput = document.getElementById('password');
const emailErrorDiv = document.getElementById('usernameError');
const passErrorDiv = document.getElementById('passwordError');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    clearValidation();

    const email = emailInput.value.trim();
    const password = passInput.value;

    let valid = true;

    // Validación email
    if (!email) {
        showError(emailInput, emailErrorDiv, 'El correo electrónico es obligatorio.');
        valid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, emailErrorDiv, 'Formato de correo inválido.');
        valid = false;
    }

    // Validación contraseña
    if (!password) {
        showError(passInput, passErrorDiv, 'La contraseña es obligatoria.');
        valid = false;
    }

    if (!valid) return;

    // Hashear contraseña
    const hashedPassword = await hashPassword(password);

    // Obtener usuarios guardados en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar usuario por email
    const foundUser = usuarios.find(u => u.email === email);
  

    if (!foundUser) {
        showError(emailInput, emailErrorDiv, 'Correo no registrado.');
        return;
    }

    if (foundUser.password !== hashedPassword) { //señala si elcorreo ya está registrado
        showError(passInput, passErrorDiv, 'Contraseña incorrecta.');
        return;
    }


    
    // Guardar sesión activa
    localStorage.setItem('usuarioActivo', JSON.stringify(foundUser));
    window.dispatchEvent(new Event('storage'));

    // Redirigir a página de incio "index"
     window.location.href = "../../../index.html"; // 


});



function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(inputElem, errorDiv, message) {
    inputElem.classList.add('is-invalid');
    errorDiv.textContent = message;
}

function clearValidation() {
    [emailInput, passInput].forEach(input => input.classList.remove('is-invalid'));
    emailErrorDiv.textContent = '';
    passErrorDiv.textContent = '';
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}