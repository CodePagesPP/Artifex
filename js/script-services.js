document.addEventListener('DOMContentLoaded', () => {
    const servicesWrapper = document.querySelector('.services-wrapper');
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesSection = document.querySelector('.services-section');

    if (!servicesWrapper || !servicesSection) return;

    let targetX = 0;
    let currentX = 0;
    const smoothing = 0.08;

    servicesSection.addEventListener('mousemove', (e) => {
        const wrapperWidth = servicesWrapper.scrollWidth - servicesWrapper.clientWidth;
        
        if (wrapperWidth <= 0) {
            targetX = 0;
            return;
        }

        const mouseX = e.clientX;
        const sectionRect = servicesSection.getBoundingClientRect();
        
        const mousePercentage = (mouseX - sectionRect.left) / sectionRect.width;
        
        const scrollAmount = wrapperWidth * Math.max(0, Math.min(1, mousePercentage));
        
        targetX = -scrollAmount;
    });

    const animationLoop = () => {
        let distance = targetX - currentX;

        if (Math.abs(distance) < 0.1) {
            currentX = targetX;
        } else {
            currentX += distance * smoothing;
        }

        servicesWrapper.style.transform = `translateX(${currentX.toFixed(3)}px)`;

        requestAnimationFrame(animationLoop);
    };

    animationLoop();

    serviceCards.forEach(card => {
        const overlay = card.querySelector('.service-description-overlay');
        const descriptionText = overlay.querySelector('.description-text');
        const serviceDescription = card.dataset.serviceDescription;

        descriptionText.textContent = serviceDescription; 

        card.addEventListener('click', () => {
            document.querySelectorAll('.service-description-overlay.active').forEach(openOverlay => {
                if (openOverlay !== overlay) {
                    openOverlay.classList.remove('active');
                }
            });
            overlay.classList.toggle('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.service-card')) {
            document.querySelectorAll('.service-description-overlay.active').forEach(openOverlay => {
                openOverlay.classList.remove('active');
            });
        }
    });
});

/* =========================================
   Lógica para el Acordeón de Servicios
========================================= */

// Espera a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona todos los botones (triggers) del acordeón de servicios
    const serviceTriggers = document.querySelectorAll('.service-accordion-trigger');

    serviceTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            
            // 1. Encuentra el 'item' padre (el <div> que contiene botón y contenido)
            const parentItem = this.parentElement;
            
            // 2. Encuentra el panel de contenido (es el siguiente elemento hermano)
            const contentPanel = this.nextElementSibling;

            // 3. Quita la clase 'active' de CUALQUIER otro item que esté abierto
            serviceTriggers.forEach(t => {
                const item = t.parentElement;
                if (item !== parentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    t.nextElementSibling.style.maxHeight = '0';
                    t.nextElementSibling.style.padding = '0';
                }
            });

            // 4. Alterna (toggle) la clase 'active' en el item clickeado
            parentItem.classList.toggle('active');

            // 5. Abre o cierra el panel de contenido
            if (parentItem.classList.contains('active')) {
                // Si está activo, abre el panel
                // Se usa scrollHeight para darle la altura exacta que necesita el contenido
                contentPanel.style.maxHeight = contentPanel.scrollHeight + 'px';
                // (El padding ya lo controla el CSS, pero lo dejamos por si acaso)
                // contentPanel.style.padding = '20px 0'; 
            } else {
                // Si no está activo, ciérralo
                contentPanel.style.maxHeight = '0';
                // contentPanel.style.padding = '0';
            }
        });
    });

});