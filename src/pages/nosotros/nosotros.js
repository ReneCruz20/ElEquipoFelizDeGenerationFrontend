/* Efecto carrusel slide auto */
import { insertFooter } from "../../modules/footer/footer.js";

insertFooter(document.getElementById("footer"));

const equipo = [
  { nombre: "Anna Michel Juárez Linares", rol: "Scrum Master", foto: "/resources/images/nosotros/fotosPrueba/foto6.jpg", descripcion: "Certified Engineer Multi-Domain Expertise: Salesforce, Data Analytics, IT Support & Cybersecurity Future Java Full-Stack Developer, Passionate About Innovation & Scalable Solutions." ,linkedin: "https://www.linkedin.com/in/micheljlinares/ ", github: "https://github.com/micheljurzlins"},
  { nombre: "Kevin Fernando Lopez Falcon", rol: "Product Owner", foto: "/resources/images/nosotros/fotosPrueba/foto3.jpg", descripcion: "Professional with a background in Computer Science, specialized in Full-Stack development. Passionate about programming, efficient problem-solving, and building impactful technologies through continuous learning." ,linkedin: " https://www.linkedin.com/in/fernando-lopez-58b61b272/ ",github:"https://github.com/Fernandoo-LF "},
  { nombre: "Rene Cruz Montejo", rol: "Developer", foto: "/resources/images/nosotros/fotosPrueba/foto1.jpg", descripcion: "Computer Engineer and Full Stack Developer focused on Java technologies. I aim to build functional, scalable, and well-structured systems. My background in automotive mechanics strengthened my analytical thinking and problem-solving skills", linkedin: "https://www.linkedin.com/in/rene-cruz-montejo/ ", github:"https://github.com/ReneCruz20"},
  { nombre: "Maria Guadalupe Alvarez Martinez", rol: "Developer", foto: "/resources/images/nosotros/fotosPrueba/foto7.jpg", descripcion: "Junior Full Stack Java Developer. Passionate about building scalable web applications using Java, Spring Boot, and modern front-end frameworks. Eager to learn, grow, and contribute to collaborative environments." ,linkedin: "https://www.linkedin.com/in/maria-alvarezm97/ ",github:"https://github.com/Mary-Alva"},
  { nombre: "Mauricio Cid Cruz", rol: "Developer", foto: "/resources/images/nosotros/fotosPrueba/foto2.jpg", descripcion: "Software engineer with experience in web application development. I focus on writing clean, scalable, and constantly improving code, adding value to each project." ,linkedin: "https://www.linkedin.com/in/mauriciocidcruz",github:"https://github.com/mauriciocid06"},
  { nombre: "Perla Beatriz Lopez Armenta", rol: "Developer", foto: "/resources/images/nosotros/fotosPrueba/foto4.jpg", descripcion: "IT professional with training in various technologies. I stand out for my adaptability and problem-solving skills, which allow me to integrate effectively into teams and face new challenges" ,linkedin: "https://www.linkedin.com/in/perla-lopez-armenta/ ",github: "https://github.com/perlalopeza"},
  { nombre: "Ricardo Arturo Caballero Bravo", rol: "Developer", foto: "/resources/images/nosotros/fotosPrueba/foto5.jpg", descripcion: "Software development engineer focused on Java FullStack, passionate about creating innovative and scalable solutions" ,linkedin: "https://www.linkedin.com/in/ricardocaballerob/ ",github: "https://github.com/RicardoCaballero26"},
  { nombre: "Ramsés Odín Mayorquín Meza", rol: "Developer", foto: "/resources/images/nosotros/fotosPrueba/foto8.jpg" , descripcion: "Computer science engineer pivoting into full-stack development with Java/Spring Boot expertise. Combines technical problem-solving skills from IT support with passion for clean code architecture.",linkedin: "http://linkedin.com/in/ramses-mayorquin/",},
  { nombre: "Mariana Encarnación Calzada", rol: "Developer", foto: "/resources/images/nosotros/fotosPrueba/foto9.jpg", descripcion: "Professional with a background in Hispanic Literature, now building a career in IT with a focus on Cybersecurity and Fullstack Development." ,linkedin: "https://www.linkedin.com/in/mariana-encarnacion/",github: "https://github.com/MaryEC25"},
  { nombre: "Luis Eduardo Varela Orduña", rol: "Developer", foto: "/resources/images/nosotros/fotosPrueba/foto10.jpg", descripcion: "Petroleum engineer with a good critical eye, my adaptability allows me to develop in the field of technology and development with knowledge of programming languages that are: HTML, Java Script and CSS." ,linkedin: "https://www.linkedin.com/in/luis-eduardo-varela-ordu%C3%B1a/ ",github: "https://github.com/EduardoR33"},
  { nombre: "Diana Teresa Ortiz Vargas", rol: "Developer", foto: "https://i.postimg.cc/3NCpkZ0y/dtov.jpg", descripcion: "Socio-environmental research and sustainability professional transitioning into IT fiel. Aspiring full-stack developer passionate about creating innovative solutions to complex problems. Driven by a systems-thinking approach and a commitment to meaningful, impact-oriented work." ,linkedin: "https://www.linkedin.com/in/teresa-ov-dt25/",github:""}
  
];


const track = document.getElementById("carouselTrack");

let currentIndex = 0;
let autoScrollInterval;
const scrollDelay = 3000;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % equipo.length;
    updateCarousel();
  }, scrollDelay);
}

//  navegación manual
function moveSlide(direction) {
  clearInterval(autoScrollInterval);
  currentIndex = (currentIndex + direction + equipo.length) % equipo.length;
  updateCarousel();
  startAutoScroll(); // Reiniciar el auto-scroll después de navegación manual
}

document.querySelector('.prev-button').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next-button').addEventListener('click', () => moveSlide(1));

// pausa del hover
const carouselWindow = document.querySelector('.carousel-window');
carouselWindow.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
carouselWindow.addEventListener('mouseleave', startAutoScroll);

startAutoScroll();

// tarjeta de equipo
equipo.forEach(miembro => {
  const slide = document.createElement("div");
  slide.className = "carousel-slide";

  slide.innerHTML = `
    <div class="card profile-card">
      <div class="card-body text-center">
        <img src="${miembro.foto}" alt="${miembro.nombre}" class="rounded-circle profile-img mb-3" />
        <h3 class="card-title mb-2">${miembro.nombre}</h3>
        <p class="card-text text-muted mb-3">${miembro.rol}</p>

        <p class="card-text mb-4">${miembro.descripcion}</p>
        <div class="social-icons mb-2 d-flex justify-content-center">
          <a href="${miembro.github}"><i class="fab fa-github"></i></a>
        </div>
        <a href="${miembro.linkedin}" class="btn btn-primary btn-lg w-100" target="_blank"> Conectar <i class="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  `;

  track.appendChild(slide);
});

const slides = document.querySelectorAll(".carousel-slide");

function updateCarousel() {
  const slide = slides[0];
  const slideStyle = getComputedStyle(slide);
  const slideWidth = slide.offsetWidth + parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight);
  const visibleWidth = document.querySelector(".carousel-window").offsetWidth;
  const totalSlides = slides.length;

  let offset = (slideWidth * currentIndex) * -1 + (visibleWidth - slideWidth) / 2;

  const maxOffset = -(slideWidth * (totalSlides - 1)) + (visibleWidth - slideWidth) / 2;

  if (offset < maxOffset) offset = maxOffset;
  if (offset > (visibleWidth - slideWidth) / 2) offset = (visibleWidth - slideWidth) / 2;

  track.style.transform = `translateX(${offset}px)`;

  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === currentIndex);
  });
}



updateCarousel();

/* --------------------------------- */

 // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });