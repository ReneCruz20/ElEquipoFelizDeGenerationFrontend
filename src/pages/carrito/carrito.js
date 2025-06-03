document.addEventListener("DOMContentLoaded", () => {
  const listaCarrito = document.getElementById("lista-carrito");
  const carritoVacio = document.getElementById("carrito-vacio");
  const subtotalSpan = document.getElementById("subtotal");
  const envioSpan = document.getElementById("envio");
  const totalSpan = document.getElementById("total");
  const btnPagar = document.getElementById("btn-pagar");
  const contadorItems = document.getElementById("contador-items");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    carritoVacio.style.display = "block";
    btnPagar.disabled = true;
    contadorItems.textContent = "0 items";
    return;
  }

  carritoVacio.style.display = "none";
  btnPagar.disabled = false;

  let subtotal = 0;

  carrito.forEach(producto => {
    const { nombre, precio, imagen, cantidad } = producto;

    console.log(nombre, precio, cantidad);

    if (isNaN(Number(precio))) return;

    const card = document.createElement("div");
    card.className = "d-flex align-items-center mb-4";
    card.innerHTML = `
      <img src="${imagen}" alt="${nombre}" style="width: 100px;" class="me-3 rounded shadow-sm">
      <div class="flex-grow-1">
        <h5 class="mb-1">${nombre}</h5>
        <p class="mb-0">Cantidad: ${cantidad}</p>
        <p class="text-success fw-bold mb-0">$${(precio * cantidad).toFixed(2)}</p>
      </div>
    `;

    listaCarrito.appendChild(card);
    subtotal += precio * cantidad;
  });

  const envio = subtotal >= 100 ? 0 : 10;
  const total = subtotal + envio;

  subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
  envioSpan.textContent = `$${envio.toFixed(2)}`;
  totalSpan.textContent = `$${total.toFixed(2)}`;
  contadorItems.textContent = `${carrito.reduce((sum, p) => sum + p.cantidad, 0)} items`;
});

