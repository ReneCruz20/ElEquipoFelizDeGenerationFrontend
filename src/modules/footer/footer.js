

const insertFooter = (footer)=>{

    
    footer.innerHTML = `
    <div class="footer-container" class="main-footer"> <!-- class="flex" -->
      <div class="footer-section"> <!-- class="column" -->

        <h3>HTA</h3>
        <p>Tu tienda ecológica de confianza. Productos sostenibles para un futuro mejor.</p>

        <div class="social-icons">

          <a href="https://www.facebook.com/htamex" target="_blank"><img src="/resources/images/socials/facebook.svg"
              alt="Facebook" /></a>
          <a href="https://api.whatsapp.com/send/?phone=5215583851010&text&type=phone_number&app_absent=0"
            target="_blank"><img src="/resources/images/socials/whatsapp.svg" alt="WhatsApp" /></a>
          <a href="https://maps.app.goo.gl/tM23jumG1VvATGD48" target="_blank"><img src="/resources/images/socials/google-maps.svg"
              alt="Gmaps" /></a>
        </div>
      </div>
      
      <div class="footer-section"> <!-- class="column" -->
        <h3>Enlaces Rápidos</h3>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>
      <br>
      <div class="footer-section">
        <h3>Información</h3>
        <ul>
          <li><a href="#">Preguntas Frecuentes</a></li>
          <li><a href="#">Trabaja con nosotros</a></li>
          <li><a href="#">Política de Privacidad</a></li>
          <li><a href="#">Términos y Condiciones</a></li>
          <li><a href="#">Blog técnico</a></li>
          <li><a href="#">Soporte</a></li>

        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 HTA de México. Todos los derechos reservados.</p>
      <button id="back-to-top" class="back-to-top-btn"><i class="fas fa-arrow-up"></i></button>
    </div>
  
    `;

}


export{insertFooter};