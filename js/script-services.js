document.addEventListener('DOMContentLoaded', () => {
    const servicesWrapper = document.querySelector('.services-wrapper');
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesSection = document.querySelector('.services-section');

    servicesSection.addEventListener('mousemove', (e) => {
        const wrapperWidth = servicesWrapper.scrollWidth - servicesWrapper.clientWidth;

        if (wrapperWidth <= 0) return; 

        const mouseX = e.clientX;
        const sectionRect = servicesSection.getBoundingClientRect();
        const mousePercentage = (mouseX - sectionRect.left) / sectionRect.width;
        const scrollAmount = wrapperWidth * Math.max(0, Math.min(1, mousePercentage));

        servicesWrapper.style.transform = `translateX(-${scrollAmount}px)`;
    });

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