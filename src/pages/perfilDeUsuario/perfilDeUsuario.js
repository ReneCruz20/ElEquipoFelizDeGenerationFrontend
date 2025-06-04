// =====================
// PERFIL
// =====================

const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const telefonoInput = document.getElementById("telefono");
const perfilForm = document.getElementById("perfilForm");
const editarBtn = document.getElementById("editarBtn");

function cargarPerfil() {
  const perfilGuardado = JSON.parse(localStorage.getItem("perfil"));
  const saludoDiv = document.getElementById("saludoPerfil");
  const vistaNombre = document.getElementById("vistaNombre");
  const vistaEmail = document.getElementById("vistaEmail");
  const vistaTelefono = document.getElementById("vistaTelefono");

  if (perfilGuardado && perfilGuardado.nombre) {
    saludoDiv.textContent = `¡Hola, ${perfilGuardado.nombre}!`;
    vistaNombre.textContent = perfilGuardado.nombre;
    vistaEmail.textContent = perfilGuardado.email || "";
    vistaTelefono.textContent = perfilGuardado.telefono || "";

    nombreInput.value = perfilGuardado.nombre;
    emailInput.value = perfilGuardado.email || "";
    telefonoInput.value = perfilGuardado.telefono || "";
  } else {
    saludoDiv.textContent = "Hola, usuario";
    vistaNombre.textContent = "";
    vistaEmail.textContent = "";
    vistaTelefono.textContent = "";

    nombreInput.value = "";
    emailInput.value = "";
    telefonoInput.value = "";
  }
}

// Mostrar formulario para editar perfil
editarBtn.addEventListener("click", () => {
  perfilForm.style.display = "block";
  document.getElementById("vistaPerfil").style.display = "none";
});

// Validar y guardar datos
perfilForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const telefono = telefonoInput.value.trim();

  if (nombre.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, ingresa un correo válido.");
    return;
  }

  // Validar teléfono: 10 dígitos numéricos (puedes adaptar según formato)
  const telRegex = /^\d{10}$/;
  if (!telRegex.test(telefono)) {
    alert("Ingresa un número de teléfono válido de 10 dígitos.");
    return;
  }

  const perfil = { nombre, email, telefono };
  localStorage.setItem("perfil", JSON.stringify(perfil));
  alert("Perfil actualizado.");

  cargarPerfil();

  perfilForm.style.display = "none";
  document.getElementById("vistaPerfil").style.display = "block";
});



// =====================
// DIRECCIONES
// =====================

// Obtener referencias del formulario de direcciones
const direccionForm = document.getElementById("direccionForm");
const calleInput = document.getElementById("calle");
const coloniaInput = document.getElementById("colonia");
const cpInput = document.getElementById("cp");
const direccionesUl = document.getElementById("direccionesUl");

let direcciones = [];
let editandoIndex = null;

function mostrarListaDirecciones() {
  direcciones = JSON.parse(localStorage.getItem("direcciones")) || [];
  direccionesUl.innerHTML = "";

  direcciones.forEach((dir, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      ${dir.calle}, Colonia ${dir.colonia}, CP ${dir.cp}
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="editarDireccion(${index})">Editar</button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarDireccion(${index})">Eliminar</button>
      </div>
    `;
    direccionesUl.appendChild(li);
  });
}

direccionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const calle = calleInput.value.trim();
  const colonia = coloniaInput.value.trim();
  const cp = cpInput.value.trim();

  if (!calle || !colonia || !cp.match(/^\d{5}$/)) {
    alert("Completa los campos correctamente. El CP debe tener 5 dígitos.");
    return;
  }

  const nuevaDireccion = { calle, colonia, cp };

  if (editandoIndex !== null) {
    direcciones[editandoIndex] = nuevaDireccion;
    editandoIndex = null;
  } else {
    direcciones.push(nuevaDireccion);
  }

  localStorage.setItem("direcciones", JSON.stringify(direcciones));
  direccionForm.reset();
  mostrarListaDirecciones();
});

// Funciones globales para botones
window.editarDireccion = function(index) {
  const dir = direcciones[index];
  calleInput.value = dir.calle;
  coloniaInput.value = dir.colonia;
  cpInput.value = dir.cp;
  editandoIndex = index;
};

window.eliminarDireccion = function(index) {
  if (confirm("¿Deseas eliminar esta dirección?")) {
    direcciones.splice(index, 1);
    localStorage.setItem("direcciones", JSON.stringify(direcciones));
    mostrarListaDirecciones();
  }
};

// =====================
// INICIALIZACIÓN
// =====================

window.addEventListener("DOMContentLoaded", () => {
  // Simulación inicial si no hay datos
  if (!localStorage.getItem("perfil")) {
    const perfilEjemplo = {
      nombre: " ",
      email: " "
    };
    localStorage.setItem("perfil", JSON.stringify(perfilEjemplo));
  }

  if (!localStorage.getItem("direcciones")) {
    const direccionesEjemplo = [
      { calle: " ", colonia: " ", cp: " " },
    ];
    localStorage.setItem("direcciones", JSON.stringify(direccionesEjemplo));
  }

  // Cargar datos en formularios
  cargarPerfil();
  mostrarListaDirecciones();
});