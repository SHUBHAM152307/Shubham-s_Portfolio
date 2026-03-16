// ── Custom Cursor ──
const cursor = document.getElementById("cursor");
const trail = document.getElementById("cursor-trail");
let mx = 0,
  my = 0,
  tx = 0,
  ty = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + "px";
  cursor.style.top = my - 6 + "px";
});
(function loop() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx - 16 + "px";
  trail.style.top = ty - 16 + "px";
  requestAnimationFrame(loop);
})();
document.querySelectorAll("a,button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2.5)";
    trail.style.transform = "scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    trail.style.transform = "scale(1)";
  });
});
// Hide cursor on touch
if ("ontouchstart" in window) {
  cursor.style.display = "none";
  trail.style.display = "none";
  document.body.style.cursor = "auto";
}

// ── Hamburger / Mobile Menu ──
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");

function openMenu() {
  hamburger.classList.add("open");
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}
hamburger.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
["mLink1", "mLink2", "mLink3"].forEach((id) => {
  document.getElementById(id).addEventListener("click", closeMenu);
});

// ── Scroll Fade-up + Skill Bars ──
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      e.target
        .querySelectorAll(".skill-fill")
        .forEach((b) => (b.style.width = b.dataset.width + "%"));
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));

const skillIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting)
        e.target
          .querySelectorAll(".skill-fill")
          .forEach((b) => (b.style.width = b.dataset.width + "%"));
    });
  },
  { threshold: 0.2 },
);
document.querySelectorAll(".skills-grid").forEach((el) => skillIO.observe(el));

// ── Nav Logo Glitch ──
document.querySelector(".nav-logo").addEventListener("mouseenter", function () {
  this.style.textShadow = "2px 0 #00e5ff,-2px 0 #7b61ff";
  setTimeout(() => (this.style.textShadow = "none"), 200);
});

// ── Contact Form ──
document.getElementById("cf-submit").addEventListener("click", () => {
  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const message = document.getElementById("cf-message").value.trim();
  if (!name || !email || !message) {
    ["cf-name", "cf-email", "cf-message"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = "#ff5f57";
        setTimeout(() => (el.style.borderColor = ""), 1500);
      }
    });
    return;
  }
  const btn = document.getElementById("cf-submit");
  btn.querySelector(".btn-inner").textContent = "Sending...";
  btn.disabled = true;
  setTimeout(() => {
    btn.style.display = "none";
    document.getElementById("cf-success").style.display = "block";
    ["cf-name", "cf-email", "cf-subject", "cf-message"].forEach(
      (id) => (document.getElementById(id).value = ""),
    );
  }, 1200);
});
