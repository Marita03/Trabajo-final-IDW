
// HABILIDADES
const habilidades = [
  { programa: "Illustrator", valor: 90 },
  { programa: "Fusion 360", valor: 70 },
  { programa: "Twinmotion", valor: 40 },
  { programa: "Photoshop", valor: 30 },
  { programa: "Inglés", valor: 70 },
];

const contenedorHabilidades = document.querySelector("#contenedor-habilidades");

if (contenedorHabilidades) {
  habilidades.forEach((h) => {
    contenedorHabilidades.innerHTML += `
      <div class="habilidad-item">
        <span>${h.programa}</span>
        <div class="barra">
          <div style="width:${h.valor}%"></div>
        </div>
      </div>
    `;
  });
}


const contenedor = document.querySelector("#contenedor-proyectos");

async function cargarProyectos(url) {
  if (!contenedor) return; 

  try {
    const respuesta = await fetch(url);
    const proyectos = await respuesta.json();

    contenedor.innerHTML = ""; 

    proyectos.forEach((proyecto) => {
      contenedor.innerHTML += `
        <div class="proyecto-card">
          <img src="${proyecto.photo}" alt="${proyecto.title}">
          <div class="proyecto-info">
            <h3>${proyecto.title}</h3>
            <p>${proyecto.description}</p>
            <span>${proyecto.category}</span>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error al cargar proyectos:", error);
  }
}

// Ajusta la ruta si es necesario
cargarProyectos("./proyectos.json");


const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});



// BOTÓN SUBIR

const btnSubir = document.getElementById("btnSubir");

if (btnSubir) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btnSubir.style.display = "block";
    } else {
      btnSubir.style.display = "none";
    }
  });

  btnSubir.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
