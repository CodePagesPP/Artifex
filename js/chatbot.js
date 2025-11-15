document.addEventListener('DOMContentLoaded', () => {


  const phpScriptURL = 'http://localhost/Artifex/php/form-handler.php'; 

  const chatIcon = document.getElementById('chatIcon');
  const chatWindow = document.getElementById('chatWindow');
  const closeChat = document.getElementById('closeChat');
  
  const chatMessages = document.getElementById('chatMessages'); 
  const chatInputForm = document.getElementById('chatInputForm'); 
  const chatInput = document.getElementById('chatInput');

  let formSubmitted = false; 
  let conversationStarted = false; 



  chatIcon.addEventListener('click', () => {
    chatWindow.style.display = 'block';
  });

  closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
  });


  function addMessageToChat(sender, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = content; 
    chatMessages.appendChild(messageElement);
   
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }


  function showLeadForm() {
    const formHTML = `
      <p>Hey there, please leave your details so we can contact you.</p>
      <form id="leadForm">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        
        <button type="submit">Submit</button>
      </form>
    `;
    addMessageToChat('bot', formHTML);
  }


  chatInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return; 


    addMessageToChat('user', `<p>${userMessage}</p>`);


    chatInput.value = '';


    if (!conversationStarted) {
      conversationStarted = true;
      

      chatInput.disabled = true;
      chatInput.placeholder = 'Please fill the form above.';
      chatInputForm.querySelector('button').disabled = true;


      setTimeout(showLeadForm, 1000);
    }

  });



  document.addEventListener('submit', (event) => {

    if (event.target.id !== 'leadForm' || formSubmitted) {
      return;
    }
    
    event.preventDefault();
    formSubmitted = true; 
    
    const form = event.target;
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const submitButton = form.querySelector('button');

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    const formData = { name, email };

 
    fetch(phpScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status === "success") {
        form.innerHTML = "<p>¡Gracias! Nos pondremos en contacto.</p>";
      } else {
        form.innerHTML = `<p>Error: ${data.message}. Intenta de nuevo.</p>`;
        formSubmitted = false; 
      }
    })
    .catch((error) => {
      console.error('Error en fetch:', error);
      form.innerHTML = "<p>Ocurrió un error inesperado. Por favor, inténtalo más tarde.</p>";
      formSubmitted = false; 
    })
    .finally(() => {
      
      setTimeout(() => {
        chatWindow.style.display = 'none';
     
      }, 3000);
    });
  });

});