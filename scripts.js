
console.log("scripts.js loaded ✅");
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const primaryMenu = document.getElementById('primary-menu');

  navToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    primaryMenu.style.display = expanded ? '' : 'flex';
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const modal = document.getElementById('case-modal');
  const modalContent = document.getElementById('case-modal-content');
  const openButtons = document.querySelectorAll('.open-case');
  const closeBtn = modal.querySelector('.modal-close');

  function openModal(caseId) {
    const cases = {
      case1: '<p><strong>HCP Portal Redesign:</strong> Improved findability, simplified UX, reduced bounce, increased completion rate.</p>',
      case2: '<p><strong>B2B eCommerce Implementation:</strong> Checkout optimization, analytics integration, conversion measurement.</p>',
      case3: '<p><strong>Omni-channel Campaign:</strong> Coordinated web, email, paid for qualified lead lift.</p>'
    };
    modalContent.innerHTML = cases[caseId] || '<p>Case details coming soon.</p>';
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'block';
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
  }

  openButtons.forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.case)));
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(); });
});

// Contact form submission (Formspree + custom redirect)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("contact-form");

  if (!form) return;

 form.addEventListener("submit", async function (e) {
  e.preventDefault();
  console.log("submit handler fired ✅");
  e.stopImmediatePropagation();

  const btn = document.getElementById("submitBtn");
  if (btn) {
  btn.disabled = true;
  btn.textContent = "Sending...";

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      window.location.href = "/thank-you.html";
    } else {
      alert("Oops! Something went wrong. Please try again.");
      btn.disabled = false;
      btn.textContent = "Send message";
    }
  } catch (error) {
    alert("Network error. Please try again later.");
    btn.disabled = false;
    btn.textContent = "Send message";
  }
});