const equipo = [
  { nombre: "Persona1", rol: "Backend", foto: "/resources/images/nosotros/fotos_prueba/foto1.webp" },
  { nombre: "Persona2", rol: "Frontend", foto: "/resources/images/nosotros/fotos_prueba/foto2.webp" },
  { nombre: "Persona3", rol: "UX/UI", foto: "/resources/images/nosotros/fotos_prueba/foto3.webp" },
  { nombre: "Persona4", rol: "Scrum Master", foto: "/resources/images/nosotros/fotos_prueba/foto4.webp" },
  { nombre: "Persona5", rol: "Tester", foto: "/resources/images/nosotros/fotos_prueba/foto5.jpg" },
  { nombre: "Persona6", rol: "DevOps", foto: "/resources/images/nosotros/fotos_prueba/foto6.jpg" },
  { nombre: "Persona7", rol: "Database", foto: "/resources/images/nosotros/fotos_prueba/foto7.webp" },
  { nombre: "Persona8", rol: "Mobile", foto: "/resources/images/nosotros/fotos_prueba/foto8.webp" },
  { nombre: "Persona9", rol: "Documentación", foto: "/resources/images/nosotros/fotos_prueba/foto9.webp" },
  { nombre: "Persona10", rol: "FullStack", foto: "/resources/images/nosotros/fotos_prueba/foto10.webp" },
  { nombre: "Persona11", rol: "Líder Técnico", foto: "/resources/images/nosotros/fotos_prueba/foto11.webp" }
];

let currentIndex = 0;

const track = document.getElementById("carouselTrack");

// Crear todas las tarjetas una sola vez
equipo.forEach((miembro, index) => {
  const slide = document.createElement("div");
  slide.className = "carousel-slide";
  slide.innerHTML = `
    <img src="${miembro.foto}" alt="${miembro.nombre}">
    <div class="info">
      <h3>${miembro.nombre}</h3>
      <p>${miembro.rol}</p>
    </div>
  `;
  track.appendChild(slide);
});

const slides = document.querySelectorAll(".carousel-slide");

// Función para actualizar el desplazamiento
function updateCarousel() {
  const slideWidth = 220; // 200px + 2*10px margin
  const offset = ((slideWidth * currentIndex) * -1) + ((600 - slideWidth) / 2);
  track.style.transform = `translateX(${offset}px)`;

  // Reset clases
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    if (idx === currentIndex) {
      slide.classList.add("active");
    }
  });
}

document.querySelector(".next-btn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % equipo.length;
  updateCarousel();
});

document.querySelector(".prev-btn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + equipo.length) % equipo.length;
  updateCarousel();
});

updateCarousel(); // inicial



