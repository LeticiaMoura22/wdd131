// Footer: copyright year and last-modified date
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu (mobile only)
const menuButton = document.querySelector("#menu");
const header = document.querySelector("header");

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  menuButton.textContent = isOpen ? "X" : "\u2630"; // X when open, ☰ when closed
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
