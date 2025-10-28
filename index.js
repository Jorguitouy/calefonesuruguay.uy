import './index.css';

// Configuración
const config = {
    phoneNumber: btoa('598XXXXXXXX'), // Número codificado en base64
    whatsappMsg: encodeURIComponent('Hola, necesito servicio técnico para mi calefón'),
    contactThreshold: 2 // Número mínimo de interacciones antes de mostrar el contacto
};

// Estado de la aplicación
const state = {
    isHuman: false,
    interactions: 0,
    menuOpen: false
};

document.addEventListener('DOMContentLoaded', () => {
    initHumanDetection();
    initContactButtons();
    initMobileMenu();
    initFormHandler();
    initDropdowns();
    initSmoothScroll();
    initAnimations();
});

// Detección de humano
function initHumanDetection() {
    const humanActions = ['mousemove', 'keydown', 'scroll', 'click'];
    
    humanActions.forEach(action => {
        document.addEventListener(action, () => {
            state.interactions++;
            if (state.interactions >= config.contactThreshold) {
                state.isHuman = true;
            }
        });
    });
}

// Manejador de botones de contacto
function initContactButtons() {
    const contactTriggers = document.querySelectorAll('[data-action="contact"]');
    const modal = document.querySelector('.contact-modal');
    const closeBtn = modal?.querySelector('.modal-close');
    const contactOptions = modal?.querySelector('.contact-options');

    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (state.isHuman) {
                showContactInfo(contactOptions);
                modal?.setAttribute('aria-hidden', 'false');
            } else {
                validateHuman(modal, contactOptions);
            }
        });
    });

    closeBtn?.addEventListener('click', () => {
        modal?.setAttribute('aria-hidden', 'true');
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
        }
    });
}

// Menú móvil
function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.main-nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            state.menuOpen = !state.menuOpen;
            menuButton.classList.toggle('active', state.menuOpen);
            nav.classList.toggle('active', state.menuOpen);
        });

        // Cerrar menú al hacer clic en enlaces no-dropdown
        document.querySelectorAll('.main-nav a:not(.dropdown > a)').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    state.menuOpen = false;
                }
            });
        });
    }
}

// Dropdowns móviles
function initDropdowns() {
    const nav = document.querySelector('.main-nav');
    document.querySelectorAll('.main-nav .dropdown > a').forEach(dropdownToggle => {
        dropdownToggle.addEventListener('click', function(e) {
            if (nav?.classList.contains('active')) {
                if (this.getAttribute('href')?.startsWith('#')) {
                    e.preventDefault();
                }
                this.parentElement?.classList.toggle('open');
            }
        });
    });
}

// Manejador del formulario
function initFormHandler() {
    const form = document.getElementById('contactForm');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!state.isHuman) {
            alert('Por favor, realice algunas interacciones más con la página.');
            return;
        }

        const formData = new FormData(form);
        // Aquí iría la lógica de envío del formulario
        console.log('Formulario enviado:', Object.fromEntries(formData));
    });
}

// Scroll suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Validación de humano
function validateHuman(modal, container) {
    if (!container || !modal) return;
    
    container.innerHTML = `
        <div class="human-validation">
            <p>Por favor, realice una acción más para verificar que es humano:</p>
            <button class="btn btn-primary validation-btn">Hacer clic aquí</button>
        </div>
    `;

    const validationBtn = container.querySelector('.validation-btn');
    validationBtn?.addEventListener('click', () => {
        state.isHuman = true;
        showContactInfo(container);
    });

    modal.setAttribute('aria-hidden', 'false');
}

// Mostrar información de contacto
function showContactInfo(container) {
    if (!container) return;
    
    const phoneNumber = atob(config.phoneNumber);
    container.innerHTML = `
        <div class="contact-info fade-in">
            <a href="tel:${phoneNumber}" class="contact-btn phone">
                <span class="contact-icon">📞</span>
                Llamar Ahora
            </a>
            <a href="https://wa.me/${phoneNumber}?text=${config.whatsappMsg}" 
               class="contact-btn whatsapp" target="_blank" rel="noopener">
                <span class="contact-icon">💬</span>
                WhatsApp
            </a>
        </div>
    `;
}

// Animaciones al scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-trigger').forEach(el => {
        observer.observe(el);
    });
}