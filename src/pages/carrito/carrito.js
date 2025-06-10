document.addEventListener("DOMContentLoaded", () => {
  const listaCarrito = document.getElementById("lista-carrito");
  const carritoVacio = document.getElementById("carrito-vacio");
  const subtotalSpan = document.getElementById("subtotal");
  const envioSpan = document.getElementById("envio");
  const totalSpan = document.getElementById("total");
  const btnPagar = document.getElementById("btn-pagar");
  const contadorItems = document.getElementById("contador-items");

  let carrito = [];
  try {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  } catch (e) {
    console.error("Carrito corrupto en localStorage:", e);
  }

  function renderCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
      carritoVacio.style.display = "block";
      btnPagar.disabled = true;
      contadorItems.textContent = "0 items";
      subtotalSpan.textContent = "$0.00";
      envioSpan.textContent = "$0.00";
      totalSpan.textContent = "$0.00";
      return;
    }

    carritoVacio.style.display = "none";
    btnPagar.disabled = false;

    let subtotal = 0;
    let totalItems = 0;

    carrito.forEach((producto, index) => {
      const { nombre, precio, imagen, cantidad } = producto;
      if (isNaN(precio) || isNaN(cantidad)) return;

      subtotal += precio * cantidad;
      totalItems += cantidad;

      const card = document.createElement("div");
      card.className = "item-carrito";
      card.innerHTML = `
        <img src="${imagen}" alt="${nombre}" class="item-imagen">
        <div class="item-info">
          <h5 class="item-titulo">${nombre}</h5>
          <div class="contador-cantidad">
            <button class="btn-cantidad btn-restar" data-index="${index}">
              <i class="fas fa-minus"></i>
            </button>
            <input type="text" class="input-cantidad" value="${cantidad}" readonly>
            <button class="btn-cantidad btn-sumar" data-index="${index}">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <p class="item-precio-total">$${(precio * cantidad).toFixed(2)}</p>
        </div>
        <button class="btn-eliminar" data-index="${index}" title="Eliminar producto">
          <i class="fas fa-trash-alt"></i>
        </button>
      `;
      listaCarrito.appendChild(card);
    });

    const envio = subtotal >= 100 ? 0 : 10;
    const total = subtotal + envio;

    subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
    envioSpan.textContent = `$${envio.toFixed(2)}`;
    totalSpan.textContent = `$${total.toFixed(2)}`;
    contadorItems.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""}`;

    // Eventos
    document.querySelectorAll(".btn-sumar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        carrito[index].cantidad++;
        guardarYRenderizar();
      });
    });

    document.querySelectorAll(".btn-restar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        if (carrito[index].cantidad > 1) {
          carrito[index].cantidad--;
          guardarYRenderizar();
        }
      });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        carrito.splice(index, 1);
        guardarYRenderizar();
      });
    });
  }

  function guardarYRenderizar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }

  renderCarrito();
});
