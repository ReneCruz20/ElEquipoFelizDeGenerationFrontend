
// =====================
// UTILIDADES
// =====================

function obtenerDesdeLocalStorage(clave, valorDefault) {
  try {
    return JSON.parse(localStorage.getItem(clave)) || valorDefault;
  } catch {
    return valorDefault;
  }
}

function guardarEnLocalStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function mostrarMensaje(mensaje, tipo = "success") {
  const mensajeDiv = document.getElementById("mensaje");
  mensajeDiv.textContent = mensaje;
  mensajeDiv.className = `alert mt-3 alert-${tipo === "error" || tipo === "danger" ? "danger" : "success"}`;
  mensajeDiv.style.display = "block";

  // Ocultar después de 3 segundos (3000 milisegundos)
  setTimeout(() => {
    mensajeDiv.style.display = "none";
  }, 3000);
}

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorDiv = document.getElementById(fieldId + 'Error');
  input.classList.add('is-invalid');
  errorDiv.textContent = message;
}

function clearFieldErrors(fieldIds) {
  fieldIds.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + 'Error');
    input.classList.remove('is-invalid');
    errorDiv.textContent = '';
  });
}


// ===========================
// OBTENCIÓN DE DATOS PERFIL
// ===========================

// Obtener referencias a los elementos del DOM
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const telefonoInput = document.getElementById("telefono");
const formularioPerfil = document.getElementById("perfilForm");
const editarBtn = document.getElementById("editarBtn");

//Saludo perfil
function mostrarPerfilVista(perfil) {
  document.getElementById("saludoPerfil").textContent = perfil.nombre
    ? `¡Hola, ${perfil.nombre}!`
    : "Hola, usuario";

  document.getElementById("vistaNombre").textContent = ((perfil.nombre || "") + " " + (perfil.apellido || "")).trim();
  document.getElementById("vistaEmail").textContent = perfil.email || "";
  document.getElementById("vistaTelefono").textContent = perfil.telefono || "";
}

function cargarPerfil() {
  const perfil = obtenerDesdeLocalStorage("perfil", {});
  mostrarPerfilVista(perfil);
  nombreInput.value = perfil.nombre || "";
  apellidoInput.value = perfil.apellido || "";
  emailInput.value = perfil.email || "";
  telefonoInput.value = perfil.telefono || "";

  const logoutBtn = document.getElementById("cerrarBtn");
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo');
    window.dispatchEvent(new Event('storage'));
    window.location.href = "../../../../index.html";
  });
  
  const vistaPerfil = document.getElementById("vistaPerfil");
  vistaPerfil.appendChild(logoutBtn);
}

editarBtn.addEventListener("click", () => {
  formularioPerfil.style.display = "block";
  document.getElementById("vistaPerfil").style.display = "none";
});


// =====================
// PERFIL
// =====================

formularioPerfil.addEventListener("submit", function (e) {
  e.preventDefault();
 
  const fieldIds = ['nombre', 'apellido', 'email', 'telefono'];
  clearFieldErrors(fieldIds); // limpia errores previos

  // Obtener valores
  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const email = emailInput.value.trim();
  const telefono = telefonoInput.value.trim();

  let isValid = true;

  // Validar Nombre
  if (!nombre) {
    showFieldError('nombre', 'El nombre es requerido');
    isValid = false;
  } else if (nombre.length < 3 || !nombre.replace(/\s/g, '')) {
    showFieldError('nombre', 'Debe tener al menos 3 caracteres y sin espacios');
    isValid = false;
  }

  // Validar Apellido
  if (!apellido) {
    showFieldError('apellido', 'El apellido es requerido');
    isValid = false;
  } else if (apellido.length < 3 || !apellido.replace(/\s/g, '')) {
    showFieldError('apellido', 'Debe tener al menos 3 caracteres y no solo espacios');
    isValid = false;
  }

  // Validar Email
  if (!email) {
    showFieldError('email', 'El correo electrónico es requerido');
    isValid = false;
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    showFieldError('email', 'El correo electrónico no es válido');
    isValid = false;
  }

  // Validar Teléfono
  const phoneDigits = telefono.replace(/\D/g, '');
  if (!telefono) {
    showFieldError('telefono', 'El número de teléfono es requerido');
    isValid = false;
  } else if (phoneDigits.length !== 10) {
    showFieldError('telefono', 'El número debe tener 10 dígitos');
    isValid = false;
  }

  // Si todo es válido
  if (isValid) {
    const perfil = { nombre, apellido, email, telefono };
    guardarEnLocalStorage("perfil", perfil);
    cargarPerfil();

    formularioPerfil.style.display = "none";
    document.getElementById("vistaPerfil").style.display = "block";
    mostrarMensaje("Perfil actualizado correctamente.");
  } else {
    mostrarMensaje("Por favor corrige los campos marcados.", "error");
  }
});


// =================================
// OBTENCIÓN DE DATOS DIRECCIONES
// =================================

const formularioDireccion = document.getElementById("direccionForm");
const calleInput = document.getElementById("calle");
const coloniaInput = document.getElementById("colonia");
const cpInput = document.getElementById("cp");
const localidadInput = document.getElementById("localidad");
const estadoSelect = document.getElementById("estado");
const direccionesUl = document.getElementById("direccionesUl");

let direcciones = [];
let editandoIndex = null;

function mostrarListaDirecciones() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
  if (!usuarioActivo) return;

  const claveDirecciones = `direcciones_${usuarioActivo.email}`;
  direcciones = obtenerDesdeLocalStorage(claveDirecciones, []);
  direccionesUl.innerHTML = "";

  direcciones.forEach((dir, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${dir.calle}, Col. ${dir.colonia}, CP ${dir.cp}, ${dir.localidad}, ${dir.estado} México
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" data-edit="${index}">Editar</button>
        <button class="btn btn-sm btn-outline-danger" data-delete="${index}">Eliminar</button>
      </div>
    `;
    direccionesUl.appendChild(li);
  });
}

// =====================
// DIRECCIONES
// =====================

formularioDireccion.addEventListener("submit", function (e) {
  e.preventDefault();

  const fieldIds = ["calle", "colonia", "cp", "localidad", "estado"];
  clearFieldErrors(fieldIds);

  const calle = calleInput.value.trim();
  const colonia = coloniaInput.value.trim();
  const cp = cpInput.value.trim();
  const localidad = localidadInput.value.trim();
  const estado = estadoSelect.value;

  let isValid = true;

  // Validar Calle
  if (!calle) {
    showFieldError("calle", "La calle es requerida");
    isValid = false;
  } else if (calle.length < 3 || !calle.replace(/\s/g, '')) {
    showFieldError("calle", "Debe tener al menos 3 caracteres y no solo espacios");
    isValid = false;
  }

  // Validar Colonia
  if (!colonia) {
    showFieldError("colonia", "La colonia es requerida");
    isValid = false;
  } else if (colonia.length < 3 || !colonia.replace(/\s/g, '')) {
    showFieldError("colonia", "Debe tener al menos 3 caracteres y no solo espacios");
    isValid = false;
  }

  // Validar CP
  if (!cp) {
    showFieldError("cp", "El código postal es requerido");
    isValid = false;
  } else if (!/^\d{5}$/.test(cp)) {
    showFieldError("cp", "El código postal debe tener 5 dígitos");
    isValid = false;
  }
  
  // Validar Colonia
  if (!localidad) {
    showFieldError("localidad", "La alcaldía/municipio es requerido");
    isValid = false;
  } else if (localidad.length < 3 || !localidad.replace(/\s/g, '')) {
    showFieldError("localidad", "Debe tener al menos 3 caracteres y no solo espacios");
    isValid = false;
  }

  // Si no es válido, salimos
  if (!isValid) {
    mostrarMensaje("Por favor corrige los campos marcados.", "danger");
    return;
  }

  // Dirección válida
  const nuevaDireccion = { calle, colonia, cp, localidad, estado };

  if (editandoIndex !== null) {
    direcciones[editandoIndex] = nuevaDireccion;
    editandoIndex = null;
  } else {
    direcciones.push(nuevaDireccion);
  }

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
  const claveDirecciones = `direcciones_${usuarioActivo.email}`;
  guardarEnLocalStorage(claveDirecciones, direcciones);

  formularioDireccion.reset();
  mostrarListaDirecciones();
  mostrarMensaje("Dirección guardada con éxito.");
});


//Editar o eliminar una direccion
direccionesUl.addEventListener("click", function (e) {
  if (e.target.dataset.edit !== undefined) {
    const index = parseInt(e.target.dataset.edit, 10);
    const dir = direcciones[index];
    calleInput.value = dir.calle;
    coloniaInput.value = dir.colonia;
    cpInput.value = dir.cp;
    localidadInput.value = dir.localidad;
    estadoSelect.value = dir.estado;
    editandoIndex = index;
  }

  if (e.target.dataset.delete !== undefined) {
    const index = parseInt(e.target.dataset.delete, 10);
    if (confirm("¿Deseas eliminar esta dirección?")) {
      direcciones.splice(index, 1);

      const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
      const claveDirecciones = `direcciones_${usuarioActivo.email}`;
      guardarEnLocalStorage(claveDirecciones, direcciones);
      mostrarListaDirecciones();
      mostrarMensaje("Dirección eliminada.");
    }
  }
});


// =====================
// INICIALIZACIÓN
// =====================

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("perfil")) {
    const usuarios = obtenerDesdeLocalStorage("usuarios", {});
    guardarEnLocalStorage("perfil", usuarios); // <-- usar usuarios para inicializar perfil
  }

  cargarPerfil();
  mostrarListaDirecciones();
});