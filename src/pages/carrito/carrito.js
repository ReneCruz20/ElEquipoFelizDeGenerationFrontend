// Clase para manejar el almacenamiento (Single Responsibility Principle)
class StorageService {
  static getCarrito() {
    try {
      return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (e) {
      console.error("Error leyendo carrito:", e);
      return [];
    }
  }

  static setCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}

// Clase para manejar la lógica del carrito (Open/Closed Principle)
class CarritoService {
  constructor() {
    this.carrito = StorageService.getCarrito();
  }

  agregarProducto(producto) {
    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += producto.cantidad;
    } else {
      this.carrito.push({ ...producto });
    }
    this.guardar();
  }

  actualizarCantidad(index, cantidad) {
    if (this.carrito[index]) {
      this.carrito[index].cantidad = cantidad;
      this.guardar();
    }
  }

  eliminarProducto(index) {
    this.carrito.splice(index, 1);
    this.guardar();
  }

  incrementarCantidad(index) {
    if (this.carrito[index]) {
      this.carrito[index].cantidad++;
      this.guardar();
    }
  }

  decrementarCantidad(index) {
    if (this.carrito[index] && this.carrito[index].cantidad > 1) {
      this.carrito[index].cantidad--;
      this.guardar();
    }
  }

  vaciarCarrito() {
    this.carrito = [];
    this.guardar();
  }

  guardar() {
    StorageService.setCarrito(this.carrito);
  }

  getCarrito() {
    return [...this.carrito];
  }
}

// Clase para cálculos (Single Responsibility Principle)
class CalculadoraCarrito {
  static calcularTotales(carrito) {
    const subtotal = carrito.reduce((total, p) => 
      total + (p.precio * p.cantidad), 0);
    
    const envio = subtotal >= 100 ? 0 : 10;
    const total = subtotal + envio;
    const totalItems = carrito.reduce((total, p) => total + p.cantidad, 0);

    return { subtotal, envio, total, totalItems };
  }
}

// Clase para manejar la UI (Dependency Inversion Principle)
class CarritoUI {
  constructor(service) {
    this.service = service;
    this.cacheDOM();
    this.bindEvents();
    this.render();
  }

  cacheDOM() {
    this.DOM = {
      listaCarrito: document.getElementById("lista-carrito"),
      carritoVacio: document.getElementById("carrito-vacio"),
      subtotal: document.getElementById("subtotal"),
      envio: document.getElementById("envio"),
      total: document.getElementById("total"),
      btnPagar: document.getElementById("btn-pagar"),
      contadorItems: document.getElementById("contador-items")
    };
  }

  bindEvents() {
    // Delegación de eventos para mejor performance
    this.DOM.listaCarrito.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-cantidad, .btn-eliminar');
      if (!btn) return;

      const index = parseInt(btn.dataset.index);
      if (isNaN(index)) return;

      if (btn.classList.contains('btn-sumar')) {
        this.service.incrementarCantidad(index);
      } else if (btn.classList.contains('btn-restar')) {
        this.service.decrementarCantidad(index);
      } else if (btn.classList.contains('btn-eliminar')) {
        this.service.eliminarProducto(index);
      }

      this.render();
    });

    this.DOM.btnPagar.addEventListener('click', () => this.pagar());
  }

  renderProducto(producto, index) {
    return `
      <div class="item-carrito">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="item-imagen">
        <div class="item-info">
          <h5 class="item-titulo">${producto.nombre}</h5>
          <div class="contador-cantidad">
            <button class="btn-cantidad btn-restar" data-index="${index}">
              <i class="fas fa-minus"></i>
            </button>
            <input type="text" class="input-cantidad" value="${producto.cantidad}" readonly>
            <button class="btn-cantidad btn-sumar" data-index="${index}">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <p class="item-precio-total">$${(producto.precio * producto.cantidad).toFixed(2)}</p>
        </div>
        <button class="btn-eliminar" data-index="${index}" title="Eliminar producto">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  }

  render() {
    const carrito = this.service.getCarrito();

    if (carrito.length === 0) {
      this.DOM.carritoVacio.style.display = "block";
      this.DOM.btnPagar.disabled = true;
      this.DOM.listaCarrito.innerHTML = "";
      this.DOM.contadorItems.textContent = "0 Productos";
      this.DOM.subtotal.textContent = "$0.00";
      this.DOM.envio.textContent = "$0.00";
      this.DOM.total.textContent = "$0.00";
      return;
    }

    this.DOM.carritoVacio.style.display = "none";
    this.DOM.btnPagar.disabled = false;
    this.DOM.listaCarrito.innerHTML = carrito.map((p, i) => this.renderProducto(p, i)).join('');

    const { subtotal, envio, total, totalItems } = CalculadoraCarrito.calcularTotales(carrito);

    this.DOM.subtotal.textContent = `$${subtotal.toFixed(2)}`;
    this.DOM.envio.textContent = `$${envio.toFixed(2)}`;
    this.DOM.total.textContent = `$${total.toFixed(2)}`;
    this.DOM.contadorItems.textContent = `${totalItems} Producto${totalItems !== 1 ? "s" : ""}`;
  }

  pagar() {
    // Aquí iría la lógica de pago
    alert('Redirigiendo a pasarela de pago...');
    this.service.vaciarCarrito();
    this.render();
  }
}

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  const carritoService = new CarritoService();
  new CarritoUI(carritoService);
});