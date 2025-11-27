const portfolio = document.querySelector("#popote");

async function cargarProyectos(url) {
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    const proyectos = datos.data;

    proyectos.forEach((proyecto) => {
      portfolio.innerHTML += `
        <div class="proyecto-card">
          <img src="${proyecto.photo}" alt="${proyecto.title}">
          
          <div class="proyecto-info">
            <h3>${proyecto.title}</h3>
            <p>${proyecto.description}</p>
            <span class="categoria">${proyecto.category}</span>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error cargando proyectos:", error);
  }
}

cargarProyectos("https://api.myjson.online/v1/records/72a0a513-be36-4a6c-b360-812151ac4e75");
