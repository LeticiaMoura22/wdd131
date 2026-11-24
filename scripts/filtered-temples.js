// Temple data (the first seven come from the assignment; the last three were added by me)
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Added temples (verify dedication dates and areas at churchofjesuschristtemples.org)
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-1346636-wallpaper.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 17000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-1233444-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-1866836-wallpaper.jpg"
  }
];

// Filter rules for each navigation item. The year is the first number in "dedicated".
const filters = {
  home: { title: "Home", test: () => true },
  old: { title: "Old Temples (dedicated before 1900)", test: (t) => dedicatedYear(t) < 1900 },
  new: { title: "New Temples (dedicated after 2000)", test: (t) => dedicatedYear(t) > 2000 },
  large: { title: "Large Temples (over 90,000 sq ft)", test: (t) => t.area > 90000 },
  small: { title: "Small Temples (under 10,000 sq ft)", test: (t) => t.area < 10000 }
};

const gallery = document.querySelector("#gallery");
const pageHeading = document.querySelector("#page-heading");
const nav = document.querySelector("#primary-nav");

function dedicatedYear(temple) {
  return parseInt(temple.dedicated, 10);
}

// Build one temple card (figure with image and caption)
function createTempleCard(temple) {
  const figure = document.createElement("figure");
  figure.className = "temple-card";

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} temple`;
  img.loading = "lazy";

  const caption = document.createElement("figcaption");

  const name = document.createElement("h2");
  name.textContent = temple.templeName;

  const location = document.createElement("p");
  location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString("en-US")} sq ft`;

  caption.append(name, location, dedicated, area);
  figure.append(img, caption);
  return figure;
}

// Show the temples that match the chosen filter
function showTemples(filterKey) {
  const filter = filters[filterKey];
  const matches = temples.filter(filter.test);

  pageHeading.textContent = filter.title;
  gallery.replaceChildren(...matches.map(createTempleCard));
}

// Navigation: highlight the chosen link and filter the gallery
nav.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-filter]");
  if (!link) return;

  event.preventDefault();
  nav.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
  link.classList.add("active");
  showTemples(link.dataset.filter);
});

// Initial page load shows every temple
showTemples("home");

// Footer: copyright year and last-modified date
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu (mobile only)
const menuButton = document.querySelector("#menu");
const header = document.querySelector("header");

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  menuButton.textContent = isOpen ? "X" : "☰"; // X when open, ☰ when closed
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
