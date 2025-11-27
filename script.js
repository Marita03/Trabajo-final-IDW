const contenedor = document.querySelector("#contenedor-proyectos");

async function cargarProyectos(url) {
  try {
    const respuesta = await fetch(url);
    const proyectos = await respuesta.json(); 

    proyectos.forEach((proyecto) => {
      contenedor.innerHTML += `
        <div class="proyecto-card">
          <img src="${proyecto.photo}" alt="${proyecto.title}" />

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

cargarProyectos("./data/proyectos.json");

