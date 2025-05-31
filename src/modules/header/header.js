
const insertHeader = () =>{
    const link = document.createElement('link');
    link.href = '/src/modules/header/header.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const header = document.getElementById("navBar");
    header.innerHTML = 
    `<nav class="navbar navbar-expand-lg" style="background-color: #118A4D">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="/index.html">
          <img src="/resources/images/navBar/logo.png" alt="Logo HTA" width="60" height="60"
            class="ms-4 rounded-circle">
          <span class="d-none d-sm-inline ms-3">HTA Greenhouses & Supplies</span>
          <span class="d-inline d-sm-none">HTA</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarText">
          <ul class="navbar-nav me-5">
            <li class="nav-item">
              <a class="nav-link" href="/index.html">Inicio</a>
            </li>

            
            <li class="nav-item dropdown px-3">
              <a
                class="nav-link dropdown-toggle"
                href="/src/pages/productos/productos.html"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
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

             <li class="nav-item d-flex align-items-center px-2 position-relative">
              <button class="btn p-0 border-0 bg-transparent" id="searchToggle">
                  <img src="/resources/images/navBar/lupa.png" alt="Icono de Buscar" width="32" height="32">
              </button>
              <input type="text" id="navbarSearch" class="form-control search-input" placeholder="Buscar..." />
              <div id="searchResults" class="search-results"></div>
            </li>

            <li class="nav-item d-flex align-items-center px-2">
              <a href="/src/pages/carrito/carrito.html">
                <img src="/resources/images/navBar/carrito.png" alt="Icono de Carrito" width="32" height="32">
              </a>
            </li>
            <li class="nav-item d-flex align-items-center px-2">
              <a href="/src/pages/perfilDeUsuario/perfilDeUsurario.html">
                <img src="/resources/images/navBar/user.png" alt="Icono de Usuario" width="32" height="32">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;

         
}
insertHeader();


document.addEventListener('DOMContentLoaded', () => {
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.getElementById('navbarSearch');
  const resultsContainer = document.getElementById('searchResults');

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
});
