

import { insertFooter } from "../../modules/footer/footer.js";

insertFooter(document.getElementById("footer"));


document.addEventListener('DOMContentLoaded', function() {
    

    // carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;
    
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
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
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });
    });
    
    // auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    startAutoSlide();
    
    // pausa el auto slide en hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // busqueda en movil
    const searchBtn = document.querySelector('.search-btn');
    const searchInputContainer = document.querySelector('.search-container');
    
    searchBtn.addEventListener('click', function() {
        searchInputContainer.style.display = searchInputContainer.style.display === 'flex' ? 'none' : 'flex';
    });

    // menu responsive
    const menuBtn = document.querySelector('.menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    menuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});