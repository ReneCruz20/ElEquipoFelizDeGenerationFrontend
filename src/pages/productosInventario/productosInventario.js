let editando = false;
let codigoProductoEditando = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAgregarProducto");
  const grid = document.getElementById("product-grid");
  const precioInput = document.getElementById("precio");
  const descuentoInput = document.getElementById("descuento");
  const precioFinalInput = document.getElementById("precioFinal");
  const imagenInput = document.getElementById("imagen");
  const previewImage = document.getElementById("previewImage");
  const productoModal = new bootstrap.Modal(document.getElementById('productoModal'));
  const buscador = document.getElementById("buscador");
  const filtroCategoria = document.getElementById("filtroCategoria");
  const bajoStockCheckbox = document.getElementById("bajoStock");
  const descuentoCheckbox = document.getElementById("descuentos");

  // Calcular precio final con descuento
  function calcularPrecioFinal() {
    const precio = parseFloat(precioInput.value);
    const descuento = parseFloat(descuentoInput.value);
    if (!isNaN(precio)) {
      if (!isNaN(descuento) && descuento >= 0 && descuento <= 100) {
        const precioFinal = precio * (1 - descuento / 100);
        precioFinalInput.value = `$${precioFinal.toFixed(2)}`;
      } else {
        precioFinalInput.value = `$${precio.toFixed(2)}`;
      }
    } else {
      precioFinalInput.value = "";
    }
  }

  // Preview imagen
  imagenInput.addEventListener("input", () => {
    const url = imagenInput.value.trim();
    if (url) {
      previewImage.src = url;
      previewImage.classList.remove("d-none");
    } else {
      previewImage.src = "";
      previewImage.classList.add("d-none");
    }
  });

  precioInput.addEventListener("input", calcularPrecioFinal);
  descuentoInput.addEventListener("input", calcularPrecioFinal);

  // Crear tarjeta producto con botones editar y eliminar
  function crearTarjeta(producto) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "product-card card p-3 mb-3";
    if (producto.stock < 50) tarjeta.classList.add("low-stock");

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid mb-2" style="max-height: 150px; object-fit: contain;">
      <p><strong>Código:</strong> ${producto.codigo}</p>
      <p><strong>Nombre:</strong> ${producto.nombre}</p>
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
      <p>
        <strong>Precio:</strong> <span class="text-success fw-bold">$${producto.precio.toFixed(2)}</span>
        ${producto.precioOriginal && producto.precioOriginal > producto.precio
          ? `<br><small class="text-muted text-decoration-line-through">$${producto.precioOriginal.toFixed(2)}</small>`
          : ""
        }
      </p>
      <p class="stock-info ${producto.stock < 50 ? 'text-danger' : ''}">Disponibles: ${producto.stock}</p>
      <p><strong>Categoría:</strong> ${producto.categoria || '-'}</p>
      <button class="btn btn-outline-primary btn-sm me-2 editar-btn">Editar</button>
      <br></br>
      <button class="btn btn-outline-danger btn-sm eliminar-btn">Eliminar</button>
    `;

    tarjeta.querySelector(".eliminar-btn").addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        eliminarProducto(producto.codigo);
      }
    });

    tarjeta.querySelector(".editar-btn").addEventListener("click", () => {
      abrirEditarProducto(producto);
    });

    return tarjeta;
  }

  // Renderizar productos
  function renderizarProductos() {
    filtrarProductos();
  }

  // Filtrar productos por búsqueda, categoría, stock bajo y descuento
  function filtrarProductos() {
    const terminoBusqueda = buscador.value.toLowerCase();
    const categoriaSeleccionada = filtroCategoria.value;
    const filtroStockBajo = bajoStockCheckbox.checked;
    const filtroDescuento = descuentoCheckbox.checked;

    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

    const productosFiltrados = productosGuardados.filter(producto => {
      const cumpleBusqueda =
        producto.nombre.toLowerCase().includes(terminoBusqueda) ||
        producto.codigo.toLowerCase().includes(terminoBusqueda);

      const cumpleCategoria = categoriaSeleccionada === "" || producto.categoria === categoriaSeleccionada;

      const cumpleStockBajo = filtroStockBajo ? producto.stock < 50 : true;

      const tieneDescuento = producto.precioOriginal && producto.precioOriginal > producto.precio;
      const cumpleDescuento = filtroDescuento ? tieneDescuento : true;

      return cumpleBusqueda && cumpleCategoria && cumpleStockBajo && cumpleDescuento;
    });

    grid.innerHTML = "";
    productosFiltrados.forEach(producto => {
      grid.appendChild(crearTarjeta(producto));
    });
  }

  // Eliminar producto por código
  function eliminarProducto(codigo) {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const productosActualizados = productosGuardados.filter(p => p.codigo !== codigo);
    localStorage.setItem("productos", JSON.stringify(productosActualizados));
    renderizarProductos();
  }

  // Abrir modal para editar producto
  function abrirEditarProducto(producto) {
    editando = true;
    codigoProductoEditando = producto.codigo;

    // Rellenar formulario con datos del producto
    form.codigo.value = producto.codigo;
    form.nombre.value = producto.nombre;
    form.descripcion.value = producto.descripcion;
    form.precio.value = producto.precio;
    form.descuento.value = producto.precioOriginal ? ((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100 : 0;
    calcularPrecioFinal();
    form.stock.value = producto.stock;
    form.imagen.value = producto.imagen;
    form.categoria.value = producto.categoria || '';

    previewImage.src = producto.imagen;
    previewImage.classList.remove("d-none");

    // Código no editable para evitar duplicados
    form.codigo.disabled = true;

    productoModal.show();
  }

  // Reset formulario para agregar producto nuevo
  function resetForm() {
    form.reset();
    precioFinalInput.value = "";
    previewImage.src = "";
    previewImage.classList.add("d-none");
    form.codigo.disabled = false;
    editando = false;
    codigoProductoEditando = null;
  }

  // Al enviar formulario: añadir o editar producto
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const codigo = form.codigo.value.trim();
    const nombre = form.nombre.value.trim();
    const descripcion = form.descripcion.value.trim();
    const precio = parseFloat(form.precio.value);
    const descuento = parseFloat(form.descuento.value);
    const precioOriginal = precio / (1 - (isNaN(descuento) ? 0 : descuento) / 100);
    const stock = parseInt(form.stock.value);
    const imagen = form.imagen.value.trim();
    const categoria = form.categoria.value.trim();

    if (!codigo || !nombre || !descripcion || isNaN(precio) || isNaN(stock) || !imagen) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

    // Validar duplicados solo si es un nuevo producto
    if (!editando) {
      const existe = productosGuardados.some(p => p.codigo === codigo);
      if (existe) {
        alert("Ya existe un producto con ese código.");
        return;
      }
    }

    const nuevoProducto = {
      codigo,
      nombre,
      descripcion,
      precio,
      precioOriginal,
      stock,
      imagen,
      categoria
    };

    if (editando) {
      // Actualizar producto existente
      const index = productosGuardados.findIndex(p => p.codigo === codigoProductoEditando);
      if (index !== -1) {
        productosGuardados[index] = nuevoProducto;
      }
    } else {
      // Añadir nuevo producto
      productosGuardados.push(nuevoProducto);
    }

    localStorage.setItem("productos", JSON.stringify(productosGuardados));
    renderizarProductos();

    resetForm();
    productoModal.hide();
  });

  // Enlazar eventos búsqueda, filtro categoría y filtros checkbox
  buscador.addEventListener("input", filtrarProductos);
  filtroCategoria.addEventListener("change", filtrarProductos);
  bajoStockCheckbox.addEventListener("change", filtrarProductos);
  descuentoCheckbox.addEventListener("change", filtrarProductos);

  // Inicializar
  renderizarProductos();
});
