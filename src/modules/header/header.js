
const insertHeader = () => {
    const link = document.createElement('link');
    link.href = '/src/modules/header/header.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    const header = document.getElementById("navBar");
    header.innerHTML = 
    `<nav class="navbar navbar-expand-lg fixed-top" style="background-color: #118A4D">
      <div class="container-fluid">
        <div class="navbar-brand d-flex align-items-center">
          <a href="/index.html">
            <img src="/resources/images/navBar/logo.png" alt="Logo HTA" width="60" height="60"
              class="ms-2 ms-md-4 rounded-circle">
          </a>
          <span class="company-name"> 
            <span class="d-none d-lg-inline ms-2 ms-md-3">HTA Greenhouses & Supplies</span>
            <span class="d-none d-md-inline d-lg-none ms-2 ms-md-3">HTA</span>
          </span>
        </div>
        
        <div class="d-flex d-lg-none align-items-center">
          <div class="nav-item d-flex align-items-center px-2 position-relative">
            <button class="btn p-0 border-0 bg-transparent" id="searchToggleMobile">
                <img src="/resources/images/navBar/lupa.png" alt="Icono de Buscar" width="32" height="32">
            </button>
            <input type="text" id="navbarSearchMobile" class="form-control search-input" placeholder="Buscar..." />
            <div id="searchResultsMobile" class="search-results"></div>
          </div>
          
          <div class="nav-item d-flex align-items-center px-2">
            <a href="/src/pages/carrito/carrito.html">
              <img src="/resources/images/navBar/carrito.png" alt="Icono de Carrito" width="32" height="32">
            </a>
          </div>
          <div class="nav-item d-flex align-items-center px-2">
            <a href="/src/pages/perfilDeUsuario/perfilDeUsurario.html">
              <img src="/resources/images/navBar/user.png" alt="Icono de Usuario" width="32" height="32">
            </a>
          </div>
        </div>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/index.html">Inicio</a>
            </li>
            
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/src/pages/productos/productos.html"
                id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Productos
              </a>
              <ul class="dropdown-menu bg-success" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item text-light" href="/src/pages/productos/productos.html">Productos para invernadero</a></li>
                <li><a class="dropdown-item text-light" href="/src/pages/productos/productos.html">Mallas sombra</a></li>
                <li><a class="dropdown-item text-light" href="/src/pages/productos/productos.html">Mallas decorativas</a></li>
                <li><a class="dropdown-item text-light" href="/src/pages/productos/productos.html">Accesorios hidroponia</a></li>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/src/pages/nosotros/nosotros.html">Nosotros</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/src/pages/contacto/contacto.html">Contacto</a>
            </li>
          </ul>
          
          <div class="d-none d-lg-flex align-items-center">
            <div class="nav-item d-flex align-items-center px-2 position-relative">
              <button class="btn p-0 border-0 bg-transparent" id="searchToggle">
                  <img src="/resources/images/navBar/lupa.png" alt="Icono de Buscar" width="32" height="32">
              </button>
              <input type="text" id="navbarSearch" class="form-control search-input" placeholder="Buscar..." />
              <div id="searchResults" class="search-results"></div>
            </div>

            <div class="nav-item d-flex align-items-center px-2">
              <a href="/src/pages/carrito/carrito.html">
                <img src="/resources/images/navBar/carrito.png" alt="Icono de Carrito" width="32" height="32">
              </a>
            </div>
            <div class="nav-item d-flex align-items-center px-2">
              <a href="/src/pages/perfilDeUsuario/perfilDeUsurario.html">
                <img src="/resources/images/navBar/user.png" alt="Icono de Usuario" width="32" height="32">
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>`;
};

adjustBodyPadding();
window.addEventListener('resize', adjustBodyPadding);

insertHeader();

function adjustBodyPadding() {
    const header = document.getElementById('navBar');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
    }
}

// busqueda
function setupSearch(toggleId, inputId, resultsId) {
  const searchToggle = document.getElementById(toggleId);
  const searchInput = document.getElementById(inputId);
  const resultsContainer = document.getElementById(resultsId);

  if (!searchToggle || !searchInput || !resultsContainer) return;

  const searchLinks = {
    "Invernadero": "/src/pages/productos/productos.html#invernadero",
    "Malla sombra": "/src/pages/productos/productos.html#malla-sombra",
    "Malla decorativa": "/src/pages/productos/productos.html#malla-decorativa",
    "Accesorios hidroponía": "/src/pages/productos/productos.html#accesorios-hidroponia",
    "Fertilizantes": "/src/pages/productos/productos.html#fertilizantes",
    "Sustratos": "/src/pages/productos/productos.html#sustratos",
    "Semillas": "/src/pages/productos/productos.html#semillas"
  };

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

document.addEventListener('DOMContentLoaded', () => {
  setupSearch('searchToggle', 'navbarSearch', 'searchResults');
  setupSearch('searchToggleMobile', 'navbarSearchMobile', 'searchResultsMobile');
});