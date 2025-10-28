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