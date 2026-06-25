document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.querySelector('.hamburger');
  const navContainer = document.querySelector('.nav-container');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Simple gallery slider automatic scrolling
  const gallerySlider = document.querySelector('.gallery-slider');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (gallerySlider) {
    gallerySlider.addEventListener('mousedown', (e) => {
      isDown = true;
      gallerySlider.classList.add('active');
      startX = e.pageX - gallerySlider.offsetLeft;
      scrollLeft = gallerySlider.scrollLeft;
    });
    
    gallerySlider.addEventListener('mouseleave', () => {
      isDown = false;
      gallerySlider.classList.remove('active');
    });
    
    gallerySlider.addEventListener('mouseup', () => {
      isDown = false;
      gallerySlider.classList.remove('active');
    });
    
    gallerySlider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gallerySlider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      gallerySlider.scrollLeft = scrollLeft - walk;
    });
  }

  // Hamburger menu toggle for mobile
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      const expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  }

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Booking Modal Logic
  const modal = document.getElementById('booking-modal');
  const bookBtns = document.querySelectorAll('.book-btn');
  const closeBtn = document.getElementById('modal-close');
  const formContainer = document.getElementById('booking-form-container');
  const successContainer = document.getElementById('booking-success');
  const bookingForm = document.getElementById('booking-form');
  const successCloseBtn = document.getElementById('success-close');

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add('active');
    // Reset form to default view
    formContainer.classList.remove('hidden');
    successContainer.classList.add('hidden');
    bookingForm.reset();
  };

  const closeModal = () => {
    modal.classList.remove('active');
  };

  bookBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('patient-name').value;
      const phone = document.getElementById('patient-phone').value;
      const date = document.getElementById('appointment-date').value;
      const service = document.getElementById('consultation-type').value;

      // Populate success message
      document.getElementById('success-name').textContent = name;
      document.getElementById('success-phone').textContent = phone;
      document.getElementById('success-date').textContent = new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      document.getElementById('success-service').textContent = service;

      // Show success state
      formContainer.classList.add('hidden');
      successContainer.classList.remove('hidden');
    });
  }
});
