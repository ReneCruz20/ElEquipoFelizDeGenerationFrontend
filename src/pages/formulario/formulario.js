import { insertFooter } from "../../modules/footer/footer.js";

insertFooter(document.getElementById("footer"));

//Validaciones Formulario//

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terminos = document.getElementById('terminos').checked;

    const fieldIds = ['name', 'lastName', 'phone', 'email', 'password', 'confirmPassword'];
    clearFieldErrors(fieldIds);

    let isValid = true;
//Validacion nombre
    if (!name) {
      showFieldError('name', 'El nombre es requerido');
      isValid = false;
    } else if (name.length < 3 || !name.replace(/\s/g, '')) { //elimina todos los espacios en blanco (\s) del nombre
      showFieldError('name', 'El nombre debe tener al menos 3 caracteres y no solo espacios');
      isValid = false;
    }
//Validacion apellidos
    if (!lastName) {
      showFieldError('lastName', 'Los apellidos son requeridos');
      isValid = false;
    } else if (lastName.length < 3 || !lastName.replace(/\s/g, '')) { //requistos 
      showFieldError('lastName', 'El apellido debe tener al menos 3 caracteres y no solo espacios');
      isValid = false;
    }
//Validación número de télefono
    const phoneDigits = phone.replace(/\D/g, ''); //borra espacios
    if (!phone) {
      showFieldError('phone', 'El número de teléfono es requerido');
      isValid = false;
    } else if (phoneDigits.length !== 10) {
      showFieldError('phone', 'El número debe tener exactamente 10 dígitos');
      isValid = false;
    }
//Validacion correo electrónico
    if (!email) {
      showFieldError('email', 'El correo electrónico es requerido');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {//requisitos 
      showFieldError('email', 'El correo electrónico no es válido');
      isValid = false;
    }
//Validación contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%&]).{8,}$/; //requisitos
    if (!password) {
      showFieldError('password', 'La contraseña es requerida');
      isValid = false;
    } else if (!passwordRegex.test(password)) { // comprueba si la contraseña cumple con los requisitos
      showFieldError('password', 'La contraseña no cumple con los requisitos');
      isValid = false;
    }
//Validacion confirmar contraseña
    if (!confirmPassword) {
      showFieldError('confirmPassword', 'Debes confirmar la contraseña');
      isValid = false;
    } else if (password !== confirmPassword) {
      showFieldError('confirmPassword', 'Las contraseñas no coinciden');
      isValid = false;
    }
//Validacion si se aceptan términos
    if (!terminos) {
     const alertaTerminos = document.getElementById('alertaTerminos');
  alertaTerminos.classList.remove('d-none');
  isValid = false;
      setTimeout(() => { //Elimna la alerta despues de 2 segundos
        alertaTerminos.classList.add('d-none');
      }, 2000);
      isValid = false;
    }

//Registro de usuaruo exitoso
    if (isValid) {
      const jsonOutput = document.getElementById('jsonOutput');
      const jsonResult = document.getElementById('jsonResult');
      const successMessage = document.getElementById('successMessage'); //Mensaje de registro exitoso

      const userData = {  //Objeto JSON NO SE CONTEMPLA CAMPO CONTRASEÑA PARA JSON*
        nombre: name,
        apellidos: lastName,
        telefono: phone,
        email: email
      };

     console.log('Usuario registrado:', JSON.stringify(userData, null, 2)); // registro JSON usuario
    successMessage.classList.remove('d-none');
    setTimeout(() => { //Elimina el mensaje de usario registrado después de 3 seg
        successMessage.classList.add('d-none');
      }, 3000);

      form.reset(); //reinicia el formulario 
    }
  });
});


//Mostrar errores alerta boostrap (en campo correspondiente)
function showFieldError(fieldId, message) { //muestra un mensaje de error en un campo específico 
  const input = document.getElementById(fieldId);
  const errorDiv = document.getElementById(fieldId + 'Error'); 
  input.classList.add('is-invalid'); //clase de Bootstrap pone el borde rojo al campo para indicar visualmente que tiene un error
  errorDiv.textContent = message;
}

function clearFieldErrors(fieldIds) { //limpia errores
  fieldIds.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    input.classList.remove('is-invalid');
    errorDiv.textContent = '';
  });
}

