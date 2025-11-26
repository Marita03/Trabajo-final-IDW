// --------------------
// Helper: fetch JSON
// --------------------
async function loadJSON(url){
  const resp = await fetch(url);
  if(!resp.ok) throw new Error('No se pudo cargar ' + url);
  return resp.json();
}

/* ========== Iniciar app ========== */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await loadJSON('proyectos.json');
    renderProjects(data);
  } catch (err) {
    console.error(err);
  }

  // cargar habilidades (array definido abajo)
  renderSkills();

  // Botón subir: mostrar/ocultar
  const btnTop = document.getElementById('btnTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) btnTop.style.display = 'block';
    else btnTop.style.display = 'none';
  });
  btnTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // "Arriba!" del footer
  document.getElementById('volver-arriba').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top:0, behavior:'smooth'});
  });
});

/* ========== Render projects (cards) ========== */
function renderProjects(projects){
  const grid = document.getElementById('projects-grid');
  projects.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    // contenido tarjeta
    card.innerHTML = `
      <img class="thumb" src="${p.photo}" alt="${escapeHtml(p.title)}">
      <div class="card-body">
        <div class="card-title">${escapeHtml(p.title)}</div>
        <div class="card-meta">${escapeHtml(p.category)} · ${escapeHtml(p.category)}</div>
        <div class="card-desc">${escapeHtml(p.description)}</div>
      </div>
    `;
    // abrir modal al click
    card.addEventListener('click', () => openModal(p, i));
    grid.appendChild(card);
  });
}

/* ========== Modal & carousel ========== */
const modal = document.getElementById('modal');
const modalCarousel = document.getElementById('modalCarousel');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalMeta = document.getElementById('modalMeta');
let currentIndex = 0;
let currentProjectImages = [];

function openModal(project, index){
  // preparar carousel (si en el futuro agregas más imágenes al JSON puedes listarlas)
  currentProjectImages = project.images && project.images.length ? project.images : [ project.photo ];
  currentIndex = 0;
  renderModalCarousel();
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.description;
  modalMeta.textContent = project.category;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// renderiza imagen actual en modal
function renderModalCarousel(){
  modalCarousel.innerHTML = ''; // limpiar
  const img = document.createElement('img');
  img.src = currentProjectImages[currentIndex];
  modalCarousel.appendChild(img);
}

// controles next/prev del modal
document.getElementById('modalNext').addEventListener('click', () => {
  if(!currentProjectImages.length) return;
  currentIndex = (currentIndex + 1) % currentProjectImages.length;
  renderModalCarousel();
});
document.getElementById('modalPrev').addEventListener('click', () => {
  if(!currentProjectImages.length) return;
  currentIndex = (currentIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
  renderModalCarousel();
});

// cerrar modal
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if(e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if(!modal.classList.contains('open')) return;
  if(e.key === 'Escape') closeModal();
  if(e.key === 'ArrowRight') { document.getElementById('modalNext').click(); }
  if(e.key === 'ArrowLeft') { document.getElementById('modalPrev').click(); }
});

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

/* ========== Habilidades (tabla con barras SVG) ========== */
const habilidades = [
  { programa: "Illustrator", valor: "90" },
  { programa: "Fusion 360", valor: "70" },
  { programa: "Twinmotion", valor: "40" },
  { programa: "Photoshop", valor: "30" },
  { programa: "Inglés", valor: "70" },
];

function renderSkills(){
  const donde = document.querySelector("#habilidades-body");
  habilidades.forEach((h) => {
    donde.innerHTML += `
      <tr>
        <td style="width:32%;">${escapeHtml(h.programa)}</td>
        <td>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none" style="width:100%;height:14px;">
            <rect width="100" height="6" fill="#e9ecef" rx="2" />
            <rect width="${h.valor}" height="6" fill="darkseagreen" rx="2" />
          </svg>
        </td>
      </tr>
    `;
  });
}

/* ========== utilidades ========= */
function escapeHtml(str){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}
