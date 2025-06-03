document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicialización general
    initBootstrapComponents();
    setupSectionNavigation();
    setupLogout();
    
    // 2. Cargar datos iniciales
    loadInitialData();
    
    // 3. Configurar eventos específicos
    setupProfileForm();
    setupAddressEvents();
    setupOrderEvents();
});

// ----------------------------
// FUNCIONES GENERALES
// ----------------------------

function initBootstrapComponents() {
    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function setupSectionNavigation() {
    const navButtons = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.user-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active', 'show'));
            
            // Agregar clase active
            this.classList.add('active');
            
            // Mostrar sección
            const sectionId = this.getAttribute('data-section');
            document.getElementById(`${sectionId}-section`).classList.add('active', 'show');
        });
    });
    
    // Activar primera sección
    if (navButtons.length > 0) navButtons[0].click();
}

function setupLogout() {
    document.querySelector('.logout-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            alert('Sesión cerrada. Redirigiendo...');
            // window.location.href = '/logout';
        }
    });
}

function loadInitialData() {
    // Cargar avatar
    document.getElementById('user-avatar-img').src = 'https://via.placeholder.com/80?text=Usuario';
}

// ----------------------------
// SECCIÓN DE PERFIL
// ----------------------------

let profileChanged = false;

function setupProfileForm() {
    const profileForm = document.getElementById('profile-form');
    if (!profileForm) return;
    
    // Detectar cambios
    const inputs = profileForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            profileChanged = true;
        });
    });
    
    // Manejar envío
    document.getElementById('guardar-perfil').addEventListener('click', saveProfile);
}

function saveProfile() {
    if (!profileChanged) {
        showAlert('No hay cambios para guardar', 'info');
        return;
    }
    
    // Validación
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!nombre || !email) {
        showAlert('Nombre y email son obligatorios', 'danger');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('Email inválido', 'danger');
        return;
    }
    
    // Mostrar loading
    const saveBtn = document.getElementById('guardar-perfil');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Guardando...';
    saveBtn.disabled = true;
    
    // Simular guardado
    setTimeout(() => {
        showAlert('Perfil actualizado', 'success');
        profileChanged = false;
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }, 1500);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ----------------------------
// SECCIÓN DE DIRECCIONES
// ----------------------------

let addresses = [];
let editingAddressId = null;

function setupAddressEvents() {
    // Delegación de eventos
    document.querySelector('.address-list')?.addEventListener('click', function(e) {
        const card = e.target.closest('.address-card');
        if (!card) return;
        
        const addressId = parseInt(card.dataset.id);
        
        if (e.target.closest('.delete-btn')) {
            deleteAddress(addressId);
        } else if (e.target.closest('.edit-btn')) {
            editAddress(addressId);
        }
    });
    
    // Agregar dirección
    document.getElementById('agregar-direccion')?.addEventListener('click', () => {
        editingAddressId = null;
        resetAddressForm();
        new bootstrap.Modal(document.getElementById('addressModal')).show();
    });
    
    // Guardar dirección
    document.getElementById('save-address-btn')?.addEventListener('click', saveAddress);
}

function deleteAddress(id) {
    if (!confirm('¿Eliminar esta dirección?')) return;
    
    const card = document.querySelector(`.address-card[data-id="${id}"]`);
    if (card) {
        card.style.opacity = '0.5';
        card.querySelector('.delete-btn').innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        card.querySelector('.delete-btn').disabled = true;
    }
    
    setTimeout(() => {
        addresses = addresses.filter(addr => addr.id !== id);
        renderAddresses();
        showAlert('Dirección eliminada', 'success');
    }, 800);
}

function editAddress(id) {
    const address = addresses.find(addr => addr.id === id);
    if (!address) return;
    
    editingAddressId = id;
    document.getElementById('address-title').value = address.title;
    document.getElementById('address-street').value = address.street;
    document.getElementById('address-city').value = address.city.split(',')[0].trim();
    document.getElementById('address-zip').value = address.zip;
    
    new bootstrap.Modal(document.getElementById('addressModal')).show();
}

function saveAddress() {
    const title = document.getElementById('address-title').value.trim();
    const street = document.getElementById('address-street').value.trim();
    const city = document.getElementById('address-city').value.trim();
    const zip = document.getElementById('address-zip').value.trim();
    
    if (!title || !street || !city || !zip) {
        showAlert('Todos los campos son obligatorios', 'danger');
        return;
    }
    
    const saveBtn = document.getElementById('save-address-btn');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    saveBtn.disabled = true;
    
    setTimeout(() => {
        const newAddress = {
            id: editingAddressId || Date.now(),
            title,
            street,
            city: `${city}, Argentina`,
            zip
        };
        
        if (editingAddressId) {
            addresses = addresses.map(addr => addr.id === editingAddressId ? newAddress : addr);
        } else {
            addresses.push(newAddress);
        }
        
        renderAddresses();
        bootstrap.Modal.getInstance(document.getElementById('addressModal')).hide();
        showAlert(editingAddressId ? 'Dirección actualizada' : 'Dirección agregada', 'success');
        
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        editingAddressId = null;
    }, 800);
}

function renderAddresses() {
    const addressList = document.querySelector('.address-list');
    if (!addressList) return;
    
    addressList.innerHTML = '';
    
    // Datos de ejemplo (en una app real vendrían de una API)
    if (addresses.length === 0) {
        addresses = [
            {
                id: 1,
                title: 'Casa',
                street: 'Calle Falsa 123, Piso 4, Depto B',
                city: 'Buenos Aires, Argentina',
                zip: '1234'
            },
            {
                id: 2,
                title: 'Trabajo',
                street: 'Avenida Siempreviva 742',
                city: 'Buenos Aires, Argentina',
                zip: '5678'
            }
        ];
    }
    
    addresses.forEach(address => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        col.innerHTML = `
            <div class="card h-100 shadow-sm address-card" data-id="${address.id}">
                <div class="card-body">
                    <h3 class="h5 card-title">${address.title}</h3>
                    <p class="card-text">${address.street}</p>
                    <p class="card-text">${address.city}</p>
                    <p class="card-text">Código Postal: ${address.zip}</p>
                </div>
                <div class="card-footer bg-white border-top-0">
                    <div class="d-flex justify-content-end gap-2">
                        <button class="btn btn-sm btn-warning edit-btn">
                            <i class="bi bi-pencil-fill me-1"></i>Editar
                        </button>
                        <button class="btn btn-sm btn-danger delete-btn">
                            <i class="bi bi-trash-fill me-1"></i>Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
        addressList.appendChild(col);
    });
}

function resetAddressForm() {
    document.getElementById('address-title').value = '';
    document.getElementById('address-street').value = '';
    document.getElementById('address-city').value = '';
    document.getElementById('address-zip').value = '';
}

// ----------------------------
// SECCIÓN DE PEDIDOS
// ----------------------------

function setupOrderEvents() {
    document.querySelectorAll('.order-detail-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.order || 'ORD-12345'; // Ejemplo
            viewOrderDetails(orderId);
        });
    });
}

function viewOrderDetails(orderId) {
    const btn = document.querySelector(`.order-detail-btn[data-order="${orderId}"]`) || 
                document.querySelector('.order-detail-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`Mostrando detalles del pedido ${orderId}`);
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 800);
}

// ----------------------------
// FUNCIONES UTILITARIAS
// ----------------------------

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} mt-3`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('main.container') || document.body;
    container.prepend(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}