document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  function openDefaultItem() {
    const firstItem = document.querySelector('.faq-item.active');
    if (firstItem) {
      const answer = firstItem.querySelector('.faq-answer');
    
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

 
  openDefaultItem();


  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      
      const isActive = item.classList.contains('active');

      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
      
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = '0';
      }
    });
  });
});