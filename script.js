const contenedor = document.querySelector("#popote");


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

cargarProyectos("https://api.myjson.online/v1/records/72a0a513-be36-4a6c-b360-812151ac4e75");
