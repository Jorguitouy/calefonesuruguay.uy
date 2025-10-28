// Configuración y Utilidades
const config = {
    phoneNumber: btoa('59896758200'), // Número codificado en base64 (+598 96758200)
    whatsappMsg: encodeURIComponent('Hola, necesito servicio técnico para mi calefón'),
    zones: {
        centro: ['Centro', 'Cordón', 'Tres Cruces', 'La Comercial', 'Villa Muñoz'],
        costera: ['Pocitos', 'Buceo', 'Malvín', 'Punta Carretas', 'Parque Rodó'],
        periferia: ['La Blanqueada', 'Parque Batlle', 'Prado', 'Belvedere', 'Cerro']
    },
    faq: [
        {
            q: '¿Cuánto tiempo demoran en llegar?',
            a: 'Llegamos en el día, normalmente en 1-3 horas según la zona.'
        },
        {
            q: '¿Dan garantía por el trabajo?',
            a: 'Sí, todos nuestros trabajos tienen garantía por escrito.'
        },
        {
            q: '¿Trabajan los fines de semana?',
            a: 'Sí, brindamos servicio los 7 días de la semana, 24 horas.'
        }
    ]
};

// Protección contra bots
const isHuman = {
    status: false,
    interactions: 0,
    threshold: 2
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initZones();
    initFAQ();
    initContactModal();
    initHumanDetection();
    initSmoothScroll();
    initScrollAnimations();
    initCounterAnimations();
    initReadingProgress();
    initScrollToTop();
    initParallaxEffect();
    initBrandsCarousel();
});

// Mobile Menu
// Mobile Menu Mejorado
function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (menuButton && nav) {
        // Toggle menú móvil
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            nav.classList.toggle('active');
            body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer clic en un enlace (excepto dropdowns)
        const navLinks = nav.querySelectorAll('.nav-link:not(.dropdown > .nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuButton.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Cerrar menú al hacer clic en el botón de WhatsApp
        const whatsappBtn = nav.querySelector('.mobile-menu-whatsapp');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                menuButton.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            });
        }

        // Dropdowns móviles
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            if (dropdownLink) {
                dropdownLink.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        
                        // Cerrar otros dropdowns
                        dropdowns.forEach(other => {
                            if (other !== dropdown) {
                                other.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuButton.contains(e.target) && nav.classList.contains('active')) {
                menuButton.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Cerrar menú al cambiar tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                menuButton.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efectos del Cursor
function initCursorEffects() {
    const cursor = document.querySelector('.cursor-fx');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });

    document.addEventListener('click', () => {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px) scale(0.8)`;
        setTimeout(() => {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px) scale(1)`;
        }, 100);
    });
}

// Inicialización de Zonas
function initZones() {
    const zoneLists = {
        centro: document.querySelector('.zone-group:nth-child(1) .zone-list'),
        costera: document.querySelector('.zone-group:nth-child(2) .zone-list'),
        periferia: document.querySelector('.zone-group:nth-child(3) .zone-list')
    };

    Object.entries(config.zones).forEach(([key, zones]) => {
        if (!zoneLists[key]) return;
        
        zones.forEach(zone => {
            const li = document.createElement('li');
            li.textContent = zone;
            zoneLists[key].appendChild(li);
        });
    });
}

// Inicialización de FAQ
function initFAQ() {
    const faqGrid = document.querySelector('.faq-grid');
    if (!faqGrid) return;

    config.faq.forEach(({q, a}) => {
        const article = document.createElement('article');
        article.className = 'faq-item';
        article.innerHTML = `
            <h3>${q}</h3>
            <p>${a}</p>
        `;
        faqGrid.appendChild(article);
    });
}

// Modal de Contacto
function initContactModal() {
    const modal = document.querySelector('.contact-modal');
    const triggers = document.querySelectorAll('[data-action="contact"]');
    const closeBtn = modal?.querySelector('.modal-close');
    const contactOptions = modal?.querySelector('.contact-options');

    if (!modal) return;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (isHuman.status) {
                showContactInfo(contactOptions);
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            } else {
                validateHuman();
            }
        });
    });

    closeBtn?.addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
    
    // Botón CTA del footer
    const footerCTA = document.querySelector('.footer-cta');
    if (footerCTA) {
        footerCTA.addEventListener('click', () => {
            if (isHuman.status) {
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                showContactInfo(contactOptions);
            } else {
                validateHuman();
            }
        });
    }

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!isHuman.status) {
                alert('Por favor, interactúa un poco más con la página antes de enviar el formulario.');
                return;
            }

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Mostrar mensaje de éxito
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = '✓ MENSAJE ENVIADO';
            submitButton.disabled = true;
            
            // Resetear formulario después de 2 segundos
            setTimeout(() => {
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Detección de Humano (Desktop y Móvil)
function initHumanDetection() {
    // Desktop: mouse y teclado
    document.addEventListener('mousemove', () => {
        isHuman.interactions++;
        if (isHuman.interactions >= isHuman.threshold) {
            isHuman.status = true;
        }
    });

    document.addEventListener('keydown', () => {
        isHuman.interactions++;
        if (isHuman.interactions >= isHuman.threshold) {
            isHuman.status = true;
        }
    });
    
    // Móvil: eventos táctiles (iOS y Android)
    document.addEventListener('touchstart', () => {
        isHuman.interactions++;
        if (isHuman.interactions >= isHuman.threshold) {
            isHuman.status = true;
        }
    }, { passive: true });
    
    document.addEventListener('touchmove', () => {
        isHuman.interactions++;
        if (isHuman.interactions >= isHuman.threshold) {
            isHuman.status = true;
        }
    }, { passive: true });
    
    // Scroll también cuenta como interacción humana
    document.addEventListener('scroll', () => {
        isHuman.interactions++;
        if (isHuman.interactions >= isHuman.threshold) {
            isHuman.status = true;
        }
    }, { passive: true });
}

// Validación de Humano
function validateHuman() {
    const modal = document.querySelector('.contact-modal');
    const contactOptions = modal.querySelector('.contact-options');
    
    contactOptions.innerHTML = `
        <div class="human-validation">
            <p>Por favor, realiza una acción más para verificar que eres humano:</p>
            <button class="validation-btn">Clickea aquí</button>
        </div>
    `;

    const validationBtn = contactOptions.querySelector('.validation-btn');
    validationBtn.addEventListener('click', () => {
        isHuman.status = true;
        showContactInfo(contactOptions);
    });

    modal.setAttribute('aria-hidden', 'false');
}

// Mostrar Información de Contacto
function showContactInfo(container) {
    const phoneNumber = atob(config.phoneNumber);
    
    // Detectar dispositivo para mejor compatibilidad
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    
    // Formatear número para WhatsApp (sin espacios ni caracteres especiales)
    const whatsappNumber = phoneNumber.replace(/\D/g, '');
    
    // URL de WhatsApp optimizada para móviles
    const whatsappURL = isIOS || isAndroid 
        ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${config.whatsappMsg}`
        : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${config.whatsappMsg}`;
    
    container.innerHTML = `
        <div class="contact-info fade-in">
            <a href="tel:${phoneNumber}" class="contact-btn phone">
                <svg viewBox="0 0 24 24" class="icon">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                Llamar Ahora
            </a>
            <a href="${whatsappURL}" 
               class="contact-btn whatsapp" 
               target="_blank" 
               rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" class="icon">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                WhatsApp
            </a>
        </div>
    `;
}

// Animaciones al Scroll
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

document.querySelectorAll('section > *:not(h2)').forEach(el => {
    observer.observe(el);
});

// Animaciones de Scroll Optimizadas para Móvil
function initScrollAnimations() {
    // Usar requestIdleCallback si está disponible para mejor performance
    const scheduleAnimation = window.requestIdleCallback || window.requestAnimationFrame;
    
    const animateOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scheduleAnimation(() => {
                    entry.target.classList.add('visible');
                    animateObserver.unobserve(entry.target);
                });
            }
        });
    }, animateOptions);

    // Agregar clase de animación a elementos
    const elementsToAnimate = [
        '.stat-item',
        '.service-card',
        '.testimonial-card',
        '.zone-group',
        '.info-card'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
            animateObserver.observe(el);
        });
    });
}

// Animación de Contadores
function initCounterAnimations() {
    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent.replace(/\D/g, ''));
                const suffix = target.textContent.replace(/[0-9]/g, '');
                
                animateCounter(target, 0, finalValue, 1500, suffix);
                counterObserver.unobserve(target);
            }
        });
    }, counterOptions);

    document.querySelectorAll('.stat-item h3').forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const range = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para suavizar la animación
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + range * easeOutQuart);
        
        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + suffix;
        }
    }

    requestAnimationFrame(update);
}

// Parallax suave en Hero (solo desktop para mejor performance)
if (window.innerWidth > 768) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                
                if (hero && scrolled < hero.offsetHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Preload de fuentes para evitar FOIT
if ('fonts' in document) {
    document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
    });
}

// Barra de progreso de lectura
function initReadingProgress() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    let ticking = false;

    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;

        header.style.setProperty('--scroll-progress', `${progress}%`);
        
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgress);
            ticking = true;
        }
    });

    // Inicializar
    updateProgress();
}

// Botón de scroll to top
function initScrollToTop() {
    // Crear botón si no existe
    let scrollBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Volver arriba');
        scrollBtn.innerHTML = '↑';
        document.body.appendChild(scrollBtn);
    }

    let ticking = false;

    function toggleScrollButton() {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(toggleScrollButton);
            ticking = true;
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Efecto de typing en el hero (opcional)
function initTypingEffect() {
    const element = document.querySelector('.typing-effect');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    // Iniciar después de que el hero esté visible
    setTimeout(type, 500);
}

// Animación de números al hover (para stats alternativo)
function addStatHoverEffects() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Lazy load de secciones pesadas
function initLazyLoad() {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('.lazy-section').forEach(section => {
        lazyObserver.observe(section);
    });
}

// Detección de velocidad de scroll
let lastScrollTop = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollVelocity = Math.abs(scrollTop - lastScrollTop);
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Reducir animaciones si el scroll es muy rápido
    if (scrollVelocity > 100) {
        document.body.classList.add('fast-scroll');
    } else {
        document.body.classList.remove('fast-scroll');
    }
}, { passive: true });

// Efecto parallax sutil en el hero
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                
                if (scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${rate}px)`;
                    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Agregar efecto de ola en los botones
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Carrusel de marcas con scroll infinito
function initBrandsCarousel() {
    const carousel = document.querySelector('.brands-carousel');
    const searchInput = document.querySelector('#brand-search');
    const searchCount = document.querySelector('.search-results-count');
    
    if (!carousel) return;

    const originalBrands = Array.from(carousel.querySelectorAll('.brand-link'));
    
    // Duplicar las marcas para efecto infinito
    const clonedBrands = originalBrands.map(brand => brand.cloneNode(true));
    clonedBrands.forEach(clone => {
        carousel.appendChild(clone);
    });
    
    // Duplicar una vez más para asegurar el bucle suave
    const secondClone = originalBrands.map(brand => brand.cloneNode(true));
    secondClone.forEach(clone => {
        carousel.appendChild(clone);
    });
    
    const allBrands = carousel.querySelectorAll('.brand-link');
    
    // Funcionalidad de búsqueda
    if (searchInput && searchCount) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleCount = 0;
            
            if (searchTerm === '') {
                // Restaurar scroll infinito
                carousel.classList.remove('no-animation');
                allBrands.forEach(brandLink => {
                    brandLink.style.display = 'block';
                });
                searchCount.classList.remove('visible');
            } else {
                // Pausar animación durante búsqueda
                carousel.classList.add('no-animation');
                
                // Filtrar solo las marcas originales
                originalBrands.forEach((brandLink, index) => {
                    const brandName = brandLink.querySelector('.brand-name').textContent.toLowerCase();
                    const matches = brandName.includes(searchTerm);
                    
                    // Aplicar a la marca original y sus clones
                    const originalIndex = index;
                    const clone1Index = originalBrands.length + index;
                    const clone2Index = originalBrands.length * 2 + index;
                    
                    allBrands[originalIndex].style.display = matches ? 'block' : 'none';
                    allBrands[clone1Index].style.display = matches ? 'block' : 'none';
                    allBrands[clone2Index].style.display = matches ? 'block' : 'none';
                    
                    if (matches) visibleCount++;
                });
                
                searchCount.textContent = `${visibleCount} encontrada${visibleCount !== 1 ? 's' : ''}`;
                searchCount.classList.add('visible');
            }
        });
        
        // Limpiar búsqueda con ESC
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });
    }
    
    // Animar contador de marcas
    const brandsNote = document.querySelector('.brands-note strong');
    if (brandsNote) {
        let count = 0;
        const target = originalBrands.length;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const animateCount = () => {
            count += increment;
            if (count < target) {
                brandsNote.textContent = Math.floor(count) + ' marcas disponibles';
                requestAnimationFrame(animateCount);
            } else {
                brandsNote.textContent = target + ' marcas disponibles';
            }
        };
        
        // Iniciar animación cuando la sección sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        const brandsSection = document.querySelector('.brands-section');
        if (brandsSection) observer.observe(brandsSection);
    }
    
    // Pausar animación en hover (desktop)
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (!carousel.classList.contains('no-animation')) {
            carousel.style.animationPlayState = 'running';
        }
    });
    
    // Soporte para scroll manual en móvil
    const wrapper = document.querySelector('.brands-carousel-wrapper');
    if (wrapper) {
        let isScrolling = false;
        let scrollTimeout;
        
        // Detectar cuando el usuario empieza a hacer scroll
        wrapper.addEventListener('touchstart', () => {
            isScrolling = true;
            carousel.style.animationPlayState = 'paused';
        });
        
        // Detectar scroll manual
        wrapper.addEventListener('scroll', () => {
            if (!carousel.classList.contains('no-animation')) {
                carousel.style.animationPlayState = 'paused';
            }
            
            // Clear timeout anterior
            clearTimeout(scrollTimeout);
            
            // Reanudar animación después de 2 segundos sin scroll
            scrollTimeout = setTimeout(() => {
                if (!carousel.classList.contains('no-animation') && !isScrolling) {
                    carousel.style.animationPlayState = 'running';
                }
            }, 2000);
        });
        
        // Cuando termina el touch
        wrapper.addEventListener('touchend', () => {
            isScrolling = false;
        });
    }
}