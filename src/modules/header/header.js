// Inserta el header completo en el elemento con id="navBar"
function insertHeader() {
  loadCSS('../../../src/modules/header/header.css'); // Carga el CSS del header dinámicamente

  const header = document.getElementById("navBar");
  if (!header) return;

  // Menú desplegable de productos
  const dropdownMenu = createDropdownMenu([
    { id: 'invernadero', label: 'Productos para invernadero' },
    { id: 'malla-sombra', label: 'Mallas sombra' },
    { id: 'malla-decorativa', label: 'Mallas decorativas' },
    { id: 'accesorios-hidroponia', label: 'Accesorios hidroponía' }
  ]);

  // HTML del header
  header.innerHTML = `
    <nav class="navbar navbar-expand-lg fixed-top" style="background-color: #118A4D">
      <div class="container-fluid">
        <div class="navbar-brand d-flex align-items-center">
          <a href="../../../index.html">
            <img src="../../../resources/images/navBar/logo.png" alt="Logo HTA" width="60" height="60"
              class="ms-2 ms-md-4 rounded-circle">
          </a>
          <span class="company-name"> 
            <span class="d-none d-lg-inline ms-2 ms-md-3">HTA Greenhouses & Supplies</span>
            <span class="d-none d-md-inline d-lg-none ms-2 ms-md-3">HTA</span>
          </span>
        </div>

        <div class="d-flex d-lg-none align-items-center">
          ${createSearchBox('searchToggleMobile', 'navbarSearchMobile', 'searchResultsMobile')}
          ${createNavIcon('../../../resources/images/navBar/carrito.png', 'Icono de Carrito', '../../../src/pages/carrito/carrito.html')}
          ${createNavIcon('../../../resources/images/navBar/user.png', 'Icono de Usuario', '../../../src/pages/perfilDeUsuario/perfilDeUsuario.html')}
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="../../../index.html">Inicio</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="../../../src/pages/productos/productos.html"
                id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Productos
              </a>
              ${dropdownMenu}
            </li>

            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="../../../src/pages/nosotros/nosotros.html">Nosotros</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="../../../src/pages/contacto/contacto.html">Contacto</a>
            </li>
          </ul>

          <div class="d-none d-lg-flex align-items-center">
            ${createSearchBox('searchToggle', 'navbarSearch', 'searchResults')}
            ${createNavIcon('../../../resources/images/navBar/carrito.png', 'Icono de Carrito', '../../../src/pages/carrito/carrito.html')}
            ${createNavIcon('../../../resources/images/navBar/user.png', 'Icono de Usuario', '../../../src/pages/login/login.html', 29)}
          </div>
        </div>
      </div>
    </nav>`;
}

// Carga CSS dinámicamente
function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Crea conos del navbar con enlace
function createNavIcon(src, alt, link, size = 32) {
  return `
    <div class="nav-item d-flex align-items-center px-2">
      <a href="${link}">
        <img src="${src}" alt="${alt}" width="${size}" height="${size}">
      </a>
    </div>
  `;
}

// Crea buscador reutilizable
function createSearchBox(toggleId, inputId, resultsId) {
  return `
    <div class="nav-item d-flex align-items-center px-2 position-relative">
      <button class="btn p-0 border-0 bg-transparent" id="${toggleId}">
          <img src="../../../resources/images/navBar/lupa.png" alt="Buscar" width="32" height="32">
      </button>
      <input type="text" id="${inputId}" class="form-control search-input" placeholder="Buscar..." />
      <div id="${resultsId}" class="search-results"></div>
    </div>
  `;
}

// Crea menú desplegable con enlaces
function createDropdownMenu(items) {
  return `
    <ul class="dropdown-menu bg-success" aria-labelledby="navbarDropdownMenuLink">
      ${items.map(item => `
        <li><a class="dropdown-item text-light" href="../../../src/pages/productos/productos.html#${item.id}">${item.label}</a></li>
      `).join('')}
    </ul>
  `;
}

// Ajusta padding del body según el alto del navbar
function adjustBodyPadding() {
  const header = document.getElementById('navBar');
  if (header) {
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = `${headerHeight}px`;
  }
}

// Configura buscador dinámico para escritorio y móvil
function setupSearch(toggleId, inputId, resultsId, searchLinks) {
  const searchToggle = document.getElementById(toggleId);
  const searchInput = document.getElementById(inputId);
  const resultsContainer = document.getElementById(resultsId);

  if (!searchToggle || !searchInput || !resultsContainer) return;

  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchInput.classList.toggle('show');
    if (searchInput.classList.contains('show')) {
      searchInput.focus();
    } else {
      searchInput.value = '';
      resultsContainer.classList.remove('show');
    }
  });

  searchInput.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', () => {
    searchInput.classList.remove('show');
    searchInput.value = '';
    resultsContainer.classList.remove('show');
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = '';

    if (query === '') {
      resultsContainer.classList.remove('show');
      return;
    }

    const filtered = Object.keys(searchLinks).filter(item =>
      item.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      resultsContainer.classList.add('show');
      resultsContainer.innerHTML = filtered
        .map(item => `<li data-url="${searchLinks[item]}">${item}</li>`)
        .join('');
    } else {
      resultsContainer.classList.remove('show');
    }
  });

  resultsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const url = e.target.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    }
  });
}

// Ejecuta todo al cargar
insertHeader();
adjustBodyPadding();
window.addEventListener('resize', adjustBodyPadding);

document.addEventListener('DOMContentLoaded', () => {
  const searchLinks = {
    "Invernadero": "../../../src/pages/productos/productos.html#invernadero",
    "Malla sombra": "../../../src/pages/productos/productos.html#malla-sombra",
    "Malla decorativa": "../../../src/pages/productos/productos.html#malla-decorativa",
    "Accesorios hidroponía": "../../../src/pages/productos/productos.html#accesorios-hidroponia",
    "Fertilizantes": "../../../src/pages/productos/productos.html#fertilizantes",
    "Sustratos": "../../../src/pages/productos/productos.html#sustratos",
    "Semillas": "../../../src/pages/productos/productos.html#semillas"
  };
  setupSearch('searchToggle', 'navbarSearch', 'searchResults', searchLinks);
  setupSearch('searchToggleMobile', 'navbarSearchMobile', 'searchResultsMobile', searchLinks);
});