import { insertFooter } from "../../modules/footer/footer.js";

// Configuración
const EMAILJS_CONFIG = {
  publicKey: "OsY-ssmxw2ag9RsV7",
  serviceId: "service_zsq9o1j",
  templateId: "template_qn3h5jk"
};

// Validaciones
const VALIDATION_RULES = {
  nombre: {
    regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
    errorMsg: "Nombre inválido. Ej: Juan Pérez"
  },
  apellidos: {
    regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
    errorMsg: "Apellido inválido."
  },
  email: {
    regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    errorMsg: "Email inválido. Ej: ejemplo@dominio.com"
  },
  telefono: {
    regex: /^[0-9]{10}$/,
    errorMsg: "Teléfono inválido. 10 dígitos requeridos."
  },
  dudas: {
    regex: /.+/,
    errorMsg: "Este campo no puede estar vacío."
  }
};

// Servicio de Email
class EmailService {
  constructor(emailjs, config) {
    this.emailjs = emailjs;
    this.config = config;
    this.initialize();
  }

  initialize() {
    this.emailjs.init(this.config.publicKey);
  }

  async sendEmail(params) {
    try {
      const response = await this.emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        params
      );
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  }
}

// Manejador de Formulario
class FormHandler {
  constructor(formId, emailService) {
    this.form = document.getElementById(formId);
    this.emailService = emailService;
    this.messageElement = document.getElementById('mensaje-formulario');
    this.initialize();
  }

  initialize() {
    if (!this.form) {
      console.error(`Form with id ${this.formId} not found`);
      return;
    }
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    if (!this.validateForm()) {
      this.showMessage("Por favor corrige los errores en el formulario", "error");
      return;
    }

    const formData = this.getFormData();
    this.showMessage("Enviando formulario...", "loading");
    
    const result = await this.emailService.sendEmail(formData);

    if (result.success) {
      this.showSuccess();
      this.form.reset();
    } else {
      this.showError(result.error);
    }
  }

  getFormData() {
    return {
      to_name: `${this.getValue('nombre')} ${this.getValue('apellidos')}`,
      to_email: this.getValue('email'),
      message: this.getValue('dudas'),
      user_phone: this.getValue('telefono')
    };
  }

  getValue(id) {
    const element = this.form.querySelector(`#${id}`);
    return element ? element.value.trim() : '';
  }

  validateForm() {
    let isValid = true;
    this.clearErrors();

    Object.keys(VALIDATION_RULES).forEach(field => {
      const value = this.getValue(field);
      const { regex, errorMsg } = VALIDATION_RULES[field];

      if (!regex.test(value)) {
        this.showError(field, errorMsg);
        isValid = false;
      }
    });

    return isValid;
  }

  clearErrors() {
    this.form.querySelectorAll(".error-message").forEach(el => {
      el.innerHTML = "";
    });
  }

  showError(field, message) {
    const errorContainer = document.getElementById(`${field}-error`);
    if (errorContainer) {
      errorContainer.innerHTML = message;
    }
  }

  showMessage(message, type = "info") {
    if (!this.messageElement) return;
    
    this.messageElement.textContent = message;
    this.messageElement.className = "fw-bold mt-3 text-center ";
    
    switch (type) {
      case "success":
        this.messageElement.classList.add("text-success");
        break;
      case "error":
        this.messageElement.classList.add("text-danger");
        break;
      case "loading":
        this.messageElement.classList.add("text-info");
        break;
      default:
        this.messageElement.classList.add("text-primary");
    }
  }

  showSuccess() {
    console.log('✅ CORREO ENVIADO');
    this.showMessage("✅ Formulario enviado con éxito.", "success");
  }

  showError(error) {
    console.error('❌ ERROR AL ENVIAR CORREO', error);
    this.showMessage("❌ Error al enviar el formulario. Por favor intenta nuevamente.", "error");
  }
}

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
  // Insertar footer
  insertFooter(document.getElementById("footer"));

  // Inicializar servicios
  const emailService = new EmailService(emailjs, EMAILJS_CONFIG);
  
  // Inicializar manejador de formulario
  new FormHandler("contactForm", emailService);
});