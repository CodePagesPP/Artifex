document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('mainContactForm');
    const statusMessage = document.getElementById('formStatusMessage'); 

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            statusMessage.textContent = ''; 

            
            const formData = {
                name: document.getElementById('form_name').value,
                address: document.getElementById('form_address').value,
                city: document.getElementById('form_city').value,
                state: document.getElementById('form_state').value,
                zip: document.getElementById('form_zip').value,
                phone: document.getElementById('form_phone').value,
                email: document.getElementById('form_email').value,
                service: document.getElementById('form_service').value
            };

            
            const phpScriptURL = 'http://localhost/Artifex/php/form-contacto.php'; 

            
            fetch(phpScriptURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    statusMessage.textContent = "Thank you! Your message has been sent.";
                    statusMessage.style.color = "green";
                    contactForm.reset(); 
                } else {
                    statusMessage.textContent = `Error: ${data.message}`;
                    statusMessage.style.color = "red";
                }
            })
            .catch((error) => {
                console.error('Error en fetch:', error);
                statusMessage.textContent = "An unexpected error occurred. Please try again.";
                statusMessage.style.color = "red";
            })
            .finally(() => {
                
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            });
        });
    }
});