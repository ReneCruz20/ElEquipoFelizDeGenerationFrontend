
const insertHeader = () =>{
    const link = document.createElement('link');
    link.href = '/src/modules/header/header.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const header = document.getElementById("navBar");
    header.innerHTML = 
    `<nav class="navbar navbar-expand-lg" style="background-color: #118A4D">
      <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center" href="#">
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

             <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/src/pages/nosotros/nosotros.html">Nosotros</a>
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
                <li><a class="dropdown-item text-light" href="#">Geotextiles</a></li>
                <li><a class="dropdown-item text-light" href="#">Sistemas de riego</a></li>
                <li><a class="dropdown-item text-light" href="#">Accesorios hidroponia</a></li>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">Ofertas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/src/pages/contacto/contacto.html">Contacto</a>
            </li>
          </ul>
        </div>
        <span class="navbar-text d-flex align-items-center me-4">
        <a href="/carrito">
          <img src="/resources/images/navBar/carrito.png" alt="Logo HTA" width="40" height="40" class="me-2" href="#">
          </a>
          <a href="/busqueda">
          <img src="/resources/images/navBar/lupa.png" alt="Logo HTA" width="40" height="40">
          </a>
        </span>
      </div>
    </nav>`;
}
insertHeader();


