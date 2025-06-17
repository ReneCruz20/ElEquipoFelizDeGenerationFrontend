document.addEventListener("DOMContentLoaded", () => {
  cargarFiltros();
  cargarProductosCategoria();
  cargarProductosDesdeLocalStorage();

 document.getElementById("btnVolverCatalogo").addEventListener("click", () => {
  // Mostrar todas las secciones con todos los productos
  const secciones = [
    "productos-invernadero",
    "malla-sombra",
    "mallas-decorativas",
    "accesorios-hidroponia"
  ];
  secciones.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) sec.style.display = "block";
  });


  // Ocultar el botón "Volver al catálogo"
  document.getElementById("volverCatalogoContainer").style.display = "none";

  window.scrollTo({ top: 0, behavior: "smooth" });
});
});

/* ──────── UTILIDADES ──────── */
function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === "none" ? "block" : "none";
}

/* Crear tarjetas */

function crearTarjetaProducto(producto, claseCard = "producto-card") {
  const { imagen, nombre, descripcion, precio, precioOriginal } = producto;

  const card = document.createElement("div");
  card.className = claseCard;

  card.innerHTML = `
    <img src="${imagen}" alt="${nombre}" class="producto-img" />
    <h3 class="producto-nombre">${nombre}</h3>
    <p class="producto-descripcion">${descripcion || "Sin descripción disponible."}</p>
    <p class="producto-precio">
      <span class="precio-actual">$${precio.toFixed(2)}</span>
      ${precioOriginal && precioOriginal > precio
        ? `<span class="precio-original">$${precioOriginal.toFixed(2)}</span>`
        : ""}
    </p>
    <button class="btn-agregar-carrito">Agregar al carrito</button>
  `;

  card.querySelector(".btn-agregar-carrito").addEventListener("click", () => {
    const nuevoProducto = { nombre, precio, imagen, cantidad: 1 };
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.nombre === nombre);

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push(nuevoProducto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito ✅");
  });

  return card;
}

/* ──────── FILTROS ──────── */
function crearFiltro(titulo, id, opciones) {
  const contenedor = document.createElement("div");
  contenedor.classList.add("filtro");

  const boton = document.createElement("button");
  boton.classList.add("toggle-btn");
  boton.textContent = `${titulo} ▼`;
  boton.onclick = () => toggleSection(id);

  const contenido = document.createElement("div");
  contenido.classList.add("contenido-filtro");
  contenido.id = id;

  opciones.forEach(opcion => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" name="${id}" value="${opcion.value}"> ${opcion.label}`;
    contenido.appendChild(label);
    contenido.appendChild(document.createElement("br"));
  });

  contenedor.appendChild(boton);
  contenedor.appendChild(contenido);

  return contenedor;
}

function cargarFiltros() {
  const filtros = [
    {
      titulo: "Precio",
      id: "precio",
      opciones: [
        { value: "0-500", label: "$0 - $500" },
        { value: "500-1000", label: "$500 - $1000" },
        { value: "1000+", label: "Más de $1000" }
      ]
    },
    {
      titulo: "Descuento",
      id: "descuento",
      opciones: [
        { value: "10", label: "10%" },
        { value: "15", label: "15%" },
        { value: "20", label: "20%" },
        { value: "30", label: "30%" }
      ]
    }
  ];

  const contenedor = document.getElementById("filtros-container");
  filtros.forEach(filtro =>
    contenedor.appendChild(crearFiltro(filtro.titulo, filtro.id, filtro.opciones))
  );
}

/* ──────── CATEGORÍAS / NAVEGACIÓN ──────── */
function cargarProductosCategoria() {
  const productosCategoria = [
    {
      categoria: "INVERNADEROS HTA",
      titulo: "Productos para invernadero",
      imagen: "https://images.pexels.com/photos/32236848/pexels-photo-32236848.jpeg",
      destinoId: "productos-invernadero"
    },
    {
      categoria: "INVERNADEROS HTA",
      titulo: "Malla sombra",
      imagen: "https://images.pexels.com/photos/16702073/pexels-photo-16702073/free-photo-of-rojo-pared-muro-negro.jpeg",
      destinoId: "malla-sombra"
    },
    {
      categoria: "INVERNADEROS HTA",
      titulo: "Mallas decorativas",
      imagen: "https://www.hta-agrotextil.com/.cm4all/iproc.php/MONOFILAMENTO/95%20MONOFILAMENTO%20CAFE%20CON%20RAYAS.jpg",
      destinoId: "mallas-decorativas"
    },
    {
      categoria: "INVERNADEROS HTA",
      titulo: "Accesorios Hidroponia",
      imagen: "https://images.pexels.com/photos/6510867/pexels-photo-6510867.jpeg",
      destinoId: "accesorios-hidroponia"
    }
  ];

  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";  
  productosCategoria.forEach(p => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = "#";

    card.innerHTML = `
      <div class="card__background" style="background-image: url(${p.imagen})"></div>
      <div class="card__content">
        <p class="card__category">${p.categoria}</p>
        <h3 class="card__heading">${p.titulo}</h3>
      </div>
    `;

    card.addEventListener("click", e => {
      e.preventDefault();

      // Oculta todas las secciones de productos
      const secciones = [
        "productos-invernadero",
        "malla-sombra",
        "mallas-decorativas",
        "accesorios-hidroponia"
      ];
      secciones.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) sec.style.display = "none";
      });

      // Muestra solo la sección clickeada
      const destino = document.getElementById(p.destinoId);
      if (destino) destino.style.display = "block";



      // Mostrar botón "Volver al catálogo"
      document.getElementById("volverCatalogoContainer").style.display = "block";

      window.scrollTo({ top: 0, behavior: "instant" });
    });

    grid.appendChild(card);
  });

  // Al cargar la página, muestra solo el grid de categorías y oculta las secciones
  // Ya lo hacemos al inicializar (más abajo)
}

// Botón "Volver al catálogo"
document.getElementById("btnVolverCatalogo").addEventListener("click", () => {
  // Mostrar todas las secciones con todos los productos
  const secciones = [
    "productos-invernadero",
    "malla-sombra",
    "mallas-decorativas",
    "accesorios-hidroponia"
  ];
  secciones.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) sec.style.display = "block";
  });


  // Ocultar el botón "Mostrar catalogo"
  document.getElementById("volverCatalogoContainer").style.display = "none";

  window.scrollTo({ top: 0, behavior: "smooth" });
});



/* ──────── PRODUCTOS DESDE STORAGE ──────── */
function cargarProductosDesdeLocalStorage() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  const contenedorOfertas = document.getElementById("ofertas-flash");
  const contenedoresCategorias = {
    "productos para invernadero": document.getElementById("grid-invernadero"),
    "malla sombra": document.getElementById("grid-malla-sombra"),
    "mallas decorativas": document.getElementById("grid-mallas-decorativas"),
    "accesorios hidroponia": document.getElementById("grid-accesorios")
  };

  productos.forEach(producto => {
    const { nombre, precio, categoria, precioOriginal } = producto;
    if (!nombre || !precio || !categoria) return;

    const cat = categoria.trim().toLowerCase();
    const contenedorCategoria = contenedoresCategorias[cat];
    if (!contenedorCategoria) return;

    const tarjeta = crearTarjetaProducto(producto);
    contenedorCategoria.appendChild(tarjeta);

    if (precioOriginal && precioOriginal > precio && contenedorOfertas) {
      const ofertaCol = document.createElement("div");
      ofertaCol.className = "oferta wrapper";
      const tarjetaOferta = crearTarjetaProducto(producto, "producto-card oferta");
      ofertaCol.appendChild(tarjetaOferta);
      contenedorOfertas.appendChild(ofertaCol);
    }
  });
}

