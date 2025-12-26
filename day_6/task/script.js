// Loader + app fade in
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const app = document.getElementById("app");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    app.classList.remove("hidden");
  }, 500);
});

// Mobile nav
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((el) => observer.observe(el));

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Contact form fake submit
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.style.color = "#9ca3af";
    statusEl.textContent = "Sending...";

    setTimeout(() => {
      statusEl.style.color = "#22c55e";
      statusEl.textContent =
        "Message sent. (Demo only – backend not connected yet.)";
      form.reset();
    }, 900);
  });
}
