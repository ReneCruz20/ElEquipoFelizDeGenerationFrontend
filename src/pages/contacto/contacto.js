function muestraMesajeFormulario(message, isSuccess) {
    const mensajeFormulario = document.getElementById("mesaje-formulario");
    mensajeFormulario.innerHTML = message;
    mensajeFormulario.classList.toggle("text-danger", !isSuccess); 
    mensajeFormulario.classList.toggle("text-success", isSuccess);
}

function submitForm() {
            const nombre = document.getElementById('nombre').value;
            const apellidos = document.getElementById('apellidos').value;
            const email = document.getElementById('email').value;
            const dudas = document.getElementById('dudas').value;
            const boton = document.getElementById('boton').value;

            if (!validateForm()) { 
                alert("❌ Error: revisa los campos antes de enviar.");
                return;
            }
            alert("✅ Formulario enviado correctamente.");      
        }


import { insertFooter } from "../../modules/footer/footer.js";

insertFooter(document.getElementById("footer"));

function validateForm() {
    // Limpiar mensajes de error previos
    document.querySelectorAll(".error-message").forEach(msg => msg.innerHTML = "");

    // Capturar valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const dudas = document.getElementById('dudas').value.trim();

    // Expresiones regulares para validaciones
    const regexNombre = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexTelefono = /^[0-9]{10}$/;

    let isValid = true;

    // Función para mostrar mensajes de error
    function showError(inputId, message) {
        document.getElementById(inputId + "-error").innerHTML = `<span class="text-danger">${message}</span>`;
        isValid = false;
    }

    // Validaciones individuales
    if (!regexNombre.test(nombre)) showError("nombre", "Solo se aceptan letras, no se puede dejar vacío y debe haber un espacio entre cada nombre.");
    if (!regexNombre.test(apellidos)) showError("apellidos", "Solo se aceptan letras, no se puede dejar vacío y debe haber un espacio entre cada apellido.");
    if (!regexEmail.test(email)) showError("email", "Por favor, introduce un email válido.");
    if (!regexTelefono.test(telefono)) showError("telefono", "El número de teléfono debe contener solo números y tener 10 dígitos.");
    if (dudas.length === 0) showError("dudas", "Este campo no puede estar vacío.");

    muestraMesajeFormulario(isValid ? "✅ Formulario enviado correctamente." : "❌ Error: revisa los campos del formulario.", isValid);

    return isValid;
}

// Asignar evento al botón
document.querySelector("button").addEventListener("click", function(event) {
    event.preventDefault();
    if (validateForm()) {
        console.log("Formulario enviado correctamente.");
    }
});