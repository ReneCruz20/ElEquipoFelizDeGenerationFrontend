document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAgregarProducto");
  const grid = document.getElementById("product-grid");


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precioOriginal = parseFloat(document.getElementById("precioOriginal").value);
    const precioDescuentoInput = document.getElementById("precioConDescuento");
    const precioConDescuento = precioDescuentoInput && precioDescuentoInput.value
      ? parseFloat(precioDescuentoInput.value)
      : null;

    const stock = parseInt(document.getElementById("stock").value);
    const imagen = document.getElementById("imagen").value.trim();

    const precio = precioConDescuento ?? precioOriginal;

    if (!codigo || !nombre || !descripcion || isNaN(precio) || isNaN(precioOriginal) || isNaN(stock) || !imagen) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    let tarjeta = document.createElement("div");
    tarjeta.className = "product-card";
    if (stock < 50) tarjeta.classList.add("low-stock");

    tarjeta.innerHTML = `
    <img src="${imagen}" alt="${nombre}" class="img-fluid mb-2" style="max-height: 150px; object-fit: contain;">
    <p><strong>Código:</strong> ${codigo}</p>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Descripción:</strong> ${descripcion}</p>
    <p>
      <strong>Precio:</strong> <span class="text-success fw-bold">$${precio.toFixed(2)}</span>
      ${precioConDescuento !== null && precioOriginal > precioConDescuento
        ? `<br><small class="text-muted text-decoration-line-through">$${precioOriginal.toFixed(2)}</small>`
        : ""
      }
    </p>
    <p class="stock-info ${stock < 50 ? 'text-danger' : ''}">Disponibles: ${stock}</p>
    <button class="btn btn-outline-danger btn-sm mt-2 eliminar-btn">Eliminar</button>
  `;

    tarjeta.querySelector(".eliminar-btn").addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        tarjeta.remove();
      }
    });

    grid.appendChild(tarjeta);
    form.reset();
  });
});
