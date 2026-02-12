// v3 minimal JS: mobile nav toggle + optional smooth scroll safety
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Smooth scroll for in-page anchors (if user prefers motion, browser handles it)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = id ? document.querySelector(id) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close mobile nav after click
      if (navList && navList.classList.contains("open")) {
        navList.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
      }
    });
  });
});
