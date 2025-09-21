async function loadComponent(file) {
  const res = await fetch(`./components/${file}`);
  const html = await res.text();
  
  document.getElementById("app").insertAdjacentHTML('beforeend', html);
}

function initFeatures() {
  // Bootstrap tooltips
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(el => new bootstrap.Tooltip(el));

  // Typewriter animation for #author
  const el = document.getElementById("author");
  if (el) {
    const text = "Hepin Suthar";
    let i = 0, del = false;

    (function loop() {
      el.textContent = text.substring(0, i);
      if (!del && i++ === text.length) del = true;
      else if (del && i-- === 0) del = false;
      setTimeout(loop, del ? 100 : 150);
    })();
  }

  // Smooth scroll for navbar links
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 70; // optional: navbar height
        const elementPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    });
  });
  // ================= Back-to-Top Button =================
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.title = 'Go to top';
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopBtn);

  Object.assign(backToTopBtn.style, {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    display: 'none',
    background: 'var(--primary-color)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    padding: '12px 15px',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    transition: 'background 0.3s, transform 0.3s',
    zIndex: '1000'
  });

  backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.background = 'var(--secondary-color)';
    backToTopBtn.style.transform = 'translateY(-2px)';
  });
  backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.background = 'var(--primary-color)';
    backToTopBtn.style.transform = 'translateY(0)';
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

(async () => {
  await loadComponent("header.html");
  await loadComponent("hero.html");
  await loadComponent("about.html");
  await loadComponent("skills.html");
  await loadComponent("education.html");
  await loadComponent("certificate.html");
  await loadComponent("projects.html");
  await loadComponent("contact.html");
  await loadComponent("footer.html");

  initFeatures(); 
})();
