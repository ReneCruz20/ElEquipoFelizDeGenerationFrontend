import { insertFooter } from "../../modules/footer/footer.js";
insertFooter(document.getElementById("footer"));

    //    FUNCION PARA CARGAR PRODUCTOS
function cargarProductosMasVendidos() {
    //  localStorage
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const carouselContenedor = document.querySelector('.products-carousel');
    
    carouselContenedor.innerHTML = '';

    if (productos.length === 0) {
        carouselContenedor.innerHTML = '<p style="text-align: center; width: 100%;">No hay productos para mostrar. Agrega productos desde el inventario.</p>';
        return;
    }

    // TOMA 4 PRODUCTOS
    const productosAMostrar = productos.slice(0, 4);

    //    TARJETAS CARRUSEL
    productosAMostrar.forEach(producto => {
        const { imagen, nombre, precio } = producto;

        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <img src="${imagen || '/resources/images/placeholder.png'}" alt="${nombre}">
            <h3>${nombre}</h3>
            <!-- <div class="product-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div> -->
            <p class="product-price">$${precio.toFixed(2)}</p>
            <button class="add-to-cart">Añadir al Carrito</button>
        `;
        
        // anadir al carrito
        const boton = card.querySelector(".add-to-cart");
        boton.addEventListener("click", () => {
            const nuevoProducto = {
                nombre,
                precio,
                imagen,
                cantidad: 1,
            };

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


        carouselContenedor.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    cargarProductosMasVendidos();

    // carrusel principal
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;
    
    function updateCarousel() {
        if (carouselContainer) {
            carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });
    });
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    startAutoSlide();
    
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
});