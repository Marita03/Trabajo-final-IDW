// Solo busca el contenedor si existe
const contenedor = document.querySelector("#contenedor-proyectos");

async function cargarProyectos(url) {
  if (!contenedor) return; // Si no existe, no hace nada

  try {
    const respuesta = await fetch(url);
    const proyectos = await respuesta.json(); 

    contenedor.innerHTML = ""; // Limpia antes de cargar

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

// AJUSTA ESTA RUTA si tu JSON está en otra carpeta
cargarProyectos("./proyectos.json");


// BOTÓN SUBIR
const btnSubir = document.getElementById("btnSubir");

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
