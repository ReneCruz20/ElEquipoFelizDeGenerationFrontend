import { insertFooter } from "../../modules/footer/footer.js";

insertFooter(document.getElementById("footer"));


// Espera que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa EmailJS con tu clave pública
  emailjs.init("OsY-ssmxw2ag9RsV7");

  const btnEnviar = document.getElementById("btnEnviar");
  if (btnEnviar) {
    btnEnviar.addEventListener("click", submitForm);
  } else {
    console.error("❌ No se encontró el botón con id='btnEnviar'");
  }
});

function submitForm(event) {
  event.preventDefault();
  console.log("✔️ submitForm ejecutado");

  if (!validateForm()) {
    console.warn("❌ Validación fallida. El formulario no se enviará.");
    return;
  }

  // Obtener valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const dudas = document.getElementById('dudas').value.trim();

  const templateParams = {
    to_name: `${nombre} ${apellidos}`,
    to_email: email,
    message: dudas,
    user_phone: telefono
  };

  emailjs.send('service_zsq9o1j', 'template_qn3h5jk', templateParams)
    .then(response => {
      console.log('✅ CORREO ENVIADO', response.status, response.text);
      alert("✅ Formulario enviado con éxito.");
    })
    .catch(error => {
      console.error('❌ ERROR AL ENVIAR CORREO', error);
      alert("❌ Error al enviar el correo.");
    });
}

function validateForm() {
  // Limpiar errores previos
  document.querySelectorAll(".error-message").forEach(el => el.innerHTML = "");

  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const dudas = document.getElementById('dudas').value.trim();

  const regexNombre = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/;
  const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const regexTelefono = /^[0-9]{10}$/;

  let isValid = true;

  function showError(id, msg) {
    const errorContainer = document.getElementById(id + "-error");
    if (errorContainer) {
      errorContainer.innerHTML = `<span class="text-danger">${msg}</span>`;
    }
    isValid = false;
  }

  if (!regexNombre.test(nombre)) {
    showError("nombre", "Nombre inválido. Ej: Juan Pérez");
  }
  if (!regexNombre.test(apellidos)) {
    showError("apellidos", "Apellido inválido.");
  }
  if (!regexEmail.test(email)) {
    showError("email", "Email inválido. Ej: ejemplo@dominio.com");
  }
  if (!regexTelefono.test(telefono)) {
    showError("telefono", "Teléfono inválido. 10 dígitos requeridos.");
  }
  if (dudas.length === 0) {
    showError("dudas", "Este campo no puede estar vacío.");
  }

  return isValid;
}
