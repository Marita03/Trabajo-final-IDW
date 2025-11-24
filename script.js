// script.js

// Fallback data (igual al JSON) por si no se puede fetch (ej. file://)
const fallbackData = [
  {
    "id": "p1",
    "title": "Souvenirs Huilo Huilo",
    "year": "2024",
    "type": "Producto / Souvenir",
    "description": "Mini árboles nativos encapsulados como objetos de cuidado y memoria.",
    "images": [
      "https://picsum.photos/seed/p1a/800/1067",
      "https://picsum.photos/seed/p1b/800/1067",
      "https://picsum.photos/seed/p1c/800/1067"
    ]
  },
  {
    "id": "p2",
    "title": "Bancas Recicladas",
    "year": "2024",
    "type": "Mobiliario urbano",
    "description": "Bancas modulares hechas con materiales reutilizados, pensadas para escaleras y plazas.",
    "images": [
      "https://picsum.photos/seed/p2a/800/1067",
      "https://picsum.photos/seed/p2b/800/1067",
      "https://picsum.photos/seed/p2c/800/1067"
    ]
  },
  {
    "id": "p3",
    "title": "Observatorio Urbano",
    "year": "2023",
    "type": "Instalación",
    "description": "Intervenciones para activar espacios públicos y promover la participación ciudadana.",
    "images": [
      "https://picsum.photos/seed/p3a/800/1067",
      "https://picsum.photos/seed/p3b/800/1067",
      "https://picsum.photos/seed/p3c/800/1067"
    ]
  },
  {
    "id": "p4",
    "title": "Sistema de Souvenirs",
    "year": "2023",
    "type": "Servicio / Producto",
    "description": "Propuesta de sistema narrativo para souvenirs de reserva biológica.",
    "images": [
      "https://picsum.photos/seed/p4a/800/1067",
      "https://picsum.photos/seed/p4b/800/1067",
      "https://picsum.photos/seed/p4c/800/1067"
    ]
  },
  {
    "id": "p5",
    "title": "Textiles Experimentales",
    "year": "2022",
    "type": "Materiales",
    "description": "Exploración textil con biomateriales y procesos manuales.",
    "images": [
      "https://picsum.photos/seed/p5a/800/1067",
      "https://picsum.photos/seed/p5b/800/1067",
      "https://picsum.photos/seed/p5c/800/1067"
    ]
  },
  {
    "id": "p6",
    "title": "Dirección de Arte Editorial",
    "year": "2022",
    "type": "Editorial",
    "description": "Proyecto editorial que integra fotografía, tipografía y narrativas locales.",
    "images": [
      "https://picsum.photos/seed/p6a/800/1067",
      "https://picsum.photos/seed/p6b/800/1067",
      "https://picsum.photos/seed/p6c/800/1067"
    ]
  },
  {
    "id": "p7",
    "title": "Pequeñas Memorias",
    "year": "2021",
    "type": "Objeto",
    "description": "Colección de objetos que recogen historias personales y territoriales.",
    "images": [
      "https://picsum.photos/seed/p7a/800/1067",
      "https://picsum.photos/seed/p7b/800/1067",
      "https://picsum.photos/seed/p7c/800/1067"
    ]
  },
  {
    "id": "p8",
    "title": "Prototipos para la Plaza",
    "year": "2021",
    "type": "Prototipo urbano",
    "description": "Prototipos de interacción social para plazas y encuentros comunitarios.",
    "images": [
      "https://picsum.photos/seed/p8a/800/1067",
      "https://picsum.photos/seed/p8b/800/1067",
      "https://picsum.photos/seed/p8c/800/1067"
    ]
  }
];

let projects = [];

// DOM nodes (dynamically created container)
const projectsSection = document.createElement('section');
projectsSection.id = 'proyectos-din';
projectsSection.className = 'page';
projectsSection.innerHTML = `
  <div class="container">
    <h2 class="section-title">Mis Proyectos</h2>
    <div class="projects-grid" id="projectsGrid"></div>
  </div>
`;

// Insert dynamic projects section into DOM after the home page
document.addEventListener('DOMContentLoaded', () => {
  // Insert the dynamic section into body after the #inicio section
  const inicio = document.getElementById('inicio');
  inicio.insertAdjacentElement('afterend', projectsSection);

  loadProjects();
  initNav();
});

// Try to fetch the JSON; fallback to embedded data
async function loadProjects(){
  try {
    const resp = await fetch('projects.json');
    if(!resp.ok) throw new Error('no json file');
    projects = await resp.json();
  } catch (err) {
    projects = fallbackData;
  }
  renderProjects();
}

// Create grid cards
function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  projects.forEach((p, idx) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-id', p.id);
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${p.images[0]}" alt="${p.title}">
        <div class="thumb-overlay"></div>
      </div>
      <div class="project-info">
        <div class="project-title">${p.title}</div>
        <div class="project-meta">${p.type} · ${p.year}</div>
      </div>
    `;
    card.addEventListener('click', () => openModal(p.id));
    grid.appendChild(card);
  });
}

// NAV logic (existing static nav in HTML)
function initNav(){
  // Hook nav links that call showPage in the static HTML to also update indicator
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      // If the anchor had an onclick that uses showPage, let it act; also close modal
      const text = a.textContent.trim().toLowerCase();
      let id = 'inicio';
      if(text.includes('proy')) id = 'proyectos-din';
      if(text.includes('sobre')) id = 'sobre';
      if(text.includes('contact')) id = 'contacto';
      showPage(id);
      closeModal();
    });
  });
}

// showPage function (also used by original inline nav)
function showPage(pageId){
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if(target) target.classList.add('active');
  // page indicator
  const mapping = {
    'inicio': '01',
    'proyectos-din': '02',
    'sobre': '03',
    'contacto': '04'
  };
  const indicator = document.getElementById('pageIndicator');
  if(indicator) indicator.textContent = mapping[pageId] || '01';
}

// ----------------------------
// MODAL + CAROUSEL
// ----------------------------

/* create modal dom once */
const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'projectModal';
modal.innerHTML = `
  <div class="modal-content" role="dialog" aria-modal="true" aria-label="Detalle del proyecto">
    <button class="modal-close" aria-label="Cerrar">&times;</button>
    <div class="carousel" id="carousel">
      <div class="carousel-track" id="carouselTrack"></div>
      <button class="carousel-btn" aria-label="prev">&larr;</button>
      <button class="carousel-btn" aria-label="next">&rarr;</button>
      <div class="carousel-dots" id="carouselDots"></div>
    </div>
    <div class="modal-info">
      <h3 id="modalTitle"></h3>
      <div class="meta" id="modalMeta"></div>
      <p id="modalDesc"></p>
    </div>
  </div>
`;
document.body.appendChild(modal);

const carouselTrack = modal.querySelector('#carouselTrack');
const carouselDots = modal.querySelector('#carouselDots');
const modalTitle = modal.querySelector('#modalTitle');
const modalMeta = modal.querySelector('#modalMeta');
const modalDesc = modal.querySelector('#modalDesc');
const btnPrev = modal.querySelector('button[aria-label="prev"]');
const btnNext = modal.querySelector('button[aria-label="next"]');
const btnClose = modal.querySelector('.modal-close');

let currentSlide = 0;
let currentProject = null;

function openModal(projectId){
  const p = projects.find(x => x.id === projectId);
  if(!p) return;
  currentProject = p;
  buildCarousel(p);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // set info
  modalTitle.textContent = p.title;
  modalMeta.textContent = `${p.type} · ${p.year}`;
  modalDesc.textContent = p.description;
  // default to first slide
  goToSlide(0);
}

// build carousel slides + dots
function buildCarousel(project){
  carouselTrack.innerHTML = '';
  carouselDots.innerHTML = '';
  project.images.forEach((imgUrl, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `<img src="${imgUrl}" alt="${project.title} - imagen ${i+1}">`;
    carouselTrack.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Ir a imagen ${i+1}`);
    dot.addEventListener('click', () => goToSlide(i));
    carouselDots.appendChild(dot);
  });
  // set controls
  currentSlide = 0;
  updateDots();
}

function goToSlide(index){
  const slides = carouselTrack.children.length;
  if(index < 0) index = slides - 1;
  if(index >= slides) index = 0;
  currentSlide = index;
  const offset = -index * 100;
  carouselTrack.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function updateDots(){
  const dots = carouselDots.querySelectorAll('.dot');
  dots.forEach((d,i) => d.classList.toggle('active', i === currentSlide));
}

/* controls */
btnPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
btnNext.addEventListener('click', () => goToSlide(currentSlide + 1));
btnClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if(e.target === modal) closeModal();
});

function closeModal(){
  modal.classList.remove('open');
  document.body.style.overflow = '';
  currentProject = null;
}

/* keyboard navigation for carousel and modal */
document.addEventListener('keydown', (e) => {
  if(modal.classList.contains('open')){
    if(e.key === 'Escape') closeModal();
    if(e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if(e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  }
});

/* Optional autoplay (disabled by default). If quieres autoplay, descomenta:
let autoplayInterval = null;
function startAutoplay(){ autoplayInterval = setInterval(()=> goToSlide(currentSlide+1), 4000) }
function stopAutoplay(){ clearInterval(autoplayInterval) }
modal.addEventListener('mouseover', stopAutoplay);
modal.addEventListener('mouseleave', startAutoplay);
*/

// INITIAL: show 'inicio' page
document.addEventListener('DOMContentLoaded', () => {
  showPage('inicio');
});
