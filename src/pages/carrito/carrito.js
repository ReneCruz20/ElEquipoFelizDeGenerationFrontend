// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
// Objeto que agrupa todas las referencias del DOM relacionadas con el carrito
  const UI = {
    listaCarrito: document.getElementById("lista-carrito"),
    carritoVacio: document.getElementById("carrito-vacio"),
    subtotal: document.getElementById("subtotal"),
    envio: document.getElementById("envio"),
    total: document.getElementById("total"),
    btnPagar: document.getElementById("btn-pagar"),
    contadorItems: document.getElementById("contador-items"),
  };
  // Servicio de almacenamiento local, encapsula la lógica de localStorage
  const StorageService = {
  // Obtiene el carrito del localStorage de forma segura
    getCarrito: () => {
      try {
        return JSON.parse(localStorage.getItem("carrito")) || [];
      } catch (e) {
        console.error("Error leyendo carrito:", e);
        return [];
      }
    },
     // Guarda el carrito en localStorage
    setCarrito: (carrito) => {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    },
  };

  let carrito = StorageService.getCarrito();
 // Calcula los totales del carrito: subtotal, envío, total e ítems
  function calcularTotales(carrito) {
    let subtotal = 0;
    let totalItems = 0;

    carrito.forEach(p => {
      if (!isNaN(p.precio) && !isNaN(p.cantidad)) {
        subtotal += p.precio * p.cantidad;
        totalItems += p.cantidad;
      }
    });

    const envio = subtotal >= 100 ? 0 : 10;
    const total = subtotal + envio;

    return { subtotal, envio, total, totalItems };
  }
 // Genera el HTML para un producto del carrito
  function renderProducto(producto, index) {
    const { nombre, precio, imagen, cantidad } = producto;
    const div = document.createElement("div");
    div.className = "item-carrito";
    div.innerHTML = `
      <img src="${imagen}" alt="${nombre}" class="item-imagen">
      <div class="item-info">
        <h5 class="item-titulo">${nombre}</h5>
        <div class="contador-cantidad">
          <button class="btn-cantidad btn-restar" data-index="${index}"><i class="fas fa-minus"></i></button>
          <input type="text" class="input-cantidad" value="${cantidad}" readonly>
          <button class="btn-cantidad btn-sumar" data-index="${index}"><i class="fas fa-plus"></i></button>
        </div>
        <p class="item-precio-total">$${(precio * cantidad).toFixed(2)}</p>
      </div>
      <button class="btn-eliminar" data-index="${index}" title="Eliminar producto">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    return div;
  }
 // Actualiza toda la interfaz del carrito con los datos actuales
  function actualizarUI() {
    UI.listaCarrito.innerHTML = "";

 // Si el carrito está vacío, mostrar mensaje y resetear totales
    if (carrito.length === 0) {
      UI.carritoVacio.style.display = "block";
      UI.btnPagar.disabled = true;
      UI.contadorItems.textContent = "0 items";
      UI.subtotal.textContent = "$0.00";
      UI.envio.textContent = "$0.00";
      UI.total.textContent = "$0.00";
      return;
    }

  // Si hay productos, oculta el mensaje de vacío y activa el botón de pagar
    UI.carritoVacio.style.display = "none";
    UI.btnPagar.disabled = false;

  // Recorre y renderiza cada producto del carrito
    carrito.forEach((producto, index) => {
      const item = renderProducto(producto, index);
      UI.listaCarrito.appendChild(item);
    });

  // Calcula los totales y actualiza los valores en el DOM
    const { subtotal, envio, total, totalItems } = calcularTotales(carrito);

    UI.subtotal.textContent = `$${subtotal.toFixed(2)}`;
    UI.envio.textContent = `$${envio.toFixed(2)}`;
    UI.total.textContent = `$${total.toFixed(2)}`;
    UI.contadorItems.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`;

// Asocia los eventos a los botones dinámicos (sumar, restar, eliminar)
    asignarEventos();
  }

// Asigna eventos a los botones generados dinámicamente para manejar acciones del usuario
  function asignarEventos() {
  // Aumentar cantidad
    document.querySelectorAll(".btn-sumar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        carrito[index].cantidad++;
        guardarYActualizar();
      });
    });

// Disminuir cantidad (mínimo 1)
    document.querySelectorAll(".btn-restar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        if (carrito[index].cantidad > 1) {
          carrito[index].cantidad--;
          guardarYActualizar();
        }
      });
    });

// Eliminar producto del carrito
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        carrito.splice(index, 1);
        guardarYActualizar();
      });
    });
  }

// Guarda el carrito actualizado y vuelve a renderizar la interfaz
  function guardarYActualizar() {
    StorageService.setCarrito(carrito);
    actualizarUI();
  }
  
// Llamada inicial para mostrar el estado actual del carrito
  actualizarUI();
});

