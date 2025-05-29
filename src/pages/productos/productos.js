// Utilidades para crear filtros
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

// Mostrar todos los filtros
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
    },
    {
      titulo: "Marca",
      id: "marca",
      opciones: [
        { value: "BrandA", label: "BrandA" },
        { value: "BrandB", label: "BrandB" },
        { value: "BrandC", label: "BrandC" },
        { value: "BrandD", label: "BrandD" }
      ]
    }
  ];

  const contenedor = document.getElementById("filtros-container");
  filtros.forEach(filtro => contenedor.appendChild(
    crearFiltro(filtro.titulo, filtro.id, filtro.opciones)
  ));
}

// Mostrar productos
function cargarProductos() {
  const productos = [
    {
      categoria: "INVERNADERO HTA",
      titulo: "Productos para invernadero",
      imagen: "https://images.pexels.com/photos/32236848/pexels-photo-32236848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      
    },
    {
      categoria: "INVERNADEROS HTA",
      titulo: "Malla sombra",
      imagen: "https://images.pexels.com/photos/16702073/pexels-photo-16702073/free-photo-of-rojo-pared-muro-negro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      categoria: "INVERNADEROS HTA",
      titulo: "Mallas decorativas",
      imagen: "https://www.hta-agrotextil.com/.cm4all/iproc.php/MONOFILAMENTO/95%20MONOFILAMENTO%20CAFE%20CON%20RAYAS.jpg/downsize_1280_0/95%20MONOFILAMENTO%20CAFE%20CON%20RAYAS.jpg"
    },
    {
      categoria: "INVERNADEROS HTA",
      titulo: "Accesorios Hidroponia",
      imagen: "https://images.pexels.com/photos/6510867/pexels-photo-6510867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const grid = document.getElementById("product-grid");
  productos.forEach(p => {
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
    grid.appendChild(card);
  });
}

// Mostrar ofertas flash
function cargarOfertas() {
  const ofertas = [
    {
      nombre: "MALLA SOMBRA MONOFILAMENTO",
      descripcion: "Instalada como techo para protección del sol o brindando privacidad al colocarse como muro..",
      precio: "$800.00",
      original: "$1200.00",
      imagen: "https://www.hta-agrotextil.com/.cm4all/mediadb/PRODUCTOS%202022/95%20Mono%20Azul%20Marino.png"
    },
    {
      nombre: "MALLAS SOMBRA RASCHEL",
      descripcion: "Protección de los rayos solares a la vez que decora espacios de esparcimiento.",
      precio: "$500.00",
      original: "$700.00",
      imagen: "https://www.hta-agrotextil.com/.cm4all/iproc.php/RASCHEL/90%20RASCHEL%20VERDE.jpg/downsize_1280_0/90%20RASCHEL%20VERDE.jpg"
    },
    {
      nombre: "CONECTOR PARA MALLA CON PUENTE",
      descripcion: "Diseñado para conectar mallas a cables. Durable y anti UV.",
      precio: "$200.00",
      original: "$250.00",
      imagen: "https://www.hta-agrotextil.com/.cm4all/mediadb/OTRAS%20MALLAS/OJAL%20MALLA%20Y%20CABLE.jpg"
    }
  ];

  const contenedor = document.getElementById("ofertas-flash");
  ofertas.forEach(o => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <figure class="snip1418">
        <img src="${o.imagen}" alt="${o.nombre}" />
        <div class="add-to-cart"><i class="ion-android-add"></i><span>Add to Cart</span></div>
        <figcaption>
          <h3>${o.nombre}</h3>
          <p>${o.descripcion}</p>
          <div class="price"><s>${o.original}</s>${o.precio}</div>
        </figcaption>
        <a href="#"></a>
      </figure>
    `;
    contenedor.appendChild(col);
  });
}

// Mostrar u ocultar secciones
function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === "none" ? "block" : "none";
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  cargarFiltros();
  cargarProductos();
  cargarOfertas();
});
