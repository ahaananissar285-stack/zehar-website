/* ZE­HAR — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Navbar scroll effect ----------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Active nav link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------- Filter buttons (menu / signature) ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        filterItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.transition = 'opacity 0.4s ease';
              item.style.opacity = '1';
            }, 20);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------- Gallery lightbox ----------
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length && lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || '';
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

  // ---------- Form validation ----------
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageEl = form.querySelector('.form-message');
      let valid = true;

      // Clear previous states
      form.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));
      if (messageEl) {
        messageEl.className = 'form-message';
        messageEl.textContent = '';
      }

      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#c99';
        } else {
          field.style.borderColor = '';
        }
      });

      // Email check
      const email = form.querySelector('input[type="email"]');
      if (email && email.value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email.value)) {
          valid = false;
          email.style.borderColor = '#c99';
        }
      }

      // Phone basic check
      const phone = form.querySelector('input[type="tel"]');
      if (phone && phone.value && phone.value.replace(/\D/g, '').length < 8) {
        valid = false;
        phone.style.borderColor = '#c99';
      }

      if (messageEl) {
        if (valid) {
          messageEl.classList.add('success');
          messageEl.textContent = 'Thank you. Your enquiry has been received. Our atelier will respond within 24 hours.';
          form.reset();
        } else {
          messageEl.classList.add('error');
          messageEl.textContent = 'Please complete all required fields correctly.';
        }
      }
    });
  });

  // ---------- Smooth reveal on scroll (subtle) ----------
  const revealEls = document.querySelectorAll('.collection-card, .menu-card, .exp-card, .story-block, .stat-item');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });
  }
});