console.log("scripts.js loaded ✅");
console.log("submit handler fired ✅");

document.addEventListener("DOMContentLoaded", () => {
    // ===== Fade IN when page loads =====
  document.body.classList.add("is-entering");
  requestAnimationFrame(() => {
    document.body.classList.add("is-visible");
  });

  // ===== Mobile nav toggle =====
  const navToggle = document.getElementById("nav-toggle");
  const primaryMenu = document.getElementById("primary-menu");

  if (navToggle && primaryMenu) {
    navToggle.addEventListener("click", () => {
      primaryMenu.classList.toggle("open");
      navToggle.setAttribute(
        "aria-expanded",
        primaryMenu.classList.contains("open")
      );
    });
  }

  // ===== Smooth scroll for in-page anchors =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      const target = href ? document.querySelector(href) : null;
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ===== Modal (case studies) =====
  const modal = document.getElementById("case-modal");
  const modalContent = document.getElementById("case-modal-content");
  const openButtons = document.querySelectorAll(".open-case");
  const closeBtn = modal ? modal.querySelector(".modal-close") : null;

  function openModal(caseId) {
    if (!modal || !modalContent || !closeBtn) return;

    const cases = {
      case1:
        '<p><strong>HCP Portal Redesign:</strong> Improved findability, simplified UX, reduced bounce, increased completion rate.</p>',
      case2:
        '<p><strong>B2B eCommerce Implementation:</strong> Checkout optimization, analytics integration, conversion measurement.</p>',
      case3:
        '<p><strong>Omni-channel Campaign:</strong> Coordinated web, email, paid for qualified lead lift.</p>',
    };

    modalContent.innerHTML = cases[caseId] || "<p>Case details coming soon.</p>";
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
    closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
  }

  openButtons.forEach((btn) =>
    btn.addEventListener("click", () => openModal(btn.dataset.case))
  );

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

   // ===== Contact form submission (Formspree + custom redirect + fade out) =====
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    console.log("submit handler fired ✅");

    const btn = document.getElementById("submitBtn");
    const originalBtnText = btn ? btn.textContent : "";

    let redirected = false;

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending...";
      btn.classList.add("is-loading");
      btn.setAttribute("aria-busy", "true");
    }
    form.classList.add("is-submitting");

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        redirected = true;

        // Fade the entire page BEFORE redirect
        document.body.classList.add("is-leaving");

        // Match this to CSS transition duration
        setTimeout(() => {
          window.location.assign("/thank-you.html");
        }, 700);

        return;
      }

      alert("Oops! Something went wrong. Please try again.");
    } catch (err) {
      alert("Network error. Please try again later.");
    } finally {
      if (redirected) return;

      form.classList.remove("is-submitting");
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalBtnText || "Send message";
        btn.classList.remove("is-loading");
        btn.removeAttribute("aria-busy");
      }
    }
  });
});