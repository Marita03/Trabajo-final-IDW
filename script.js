const portfolio = document.querySelector("#popote");

fetch("datos.json")
  .then(response => response.json())
  .then(trabajos => {

    trabajos.forEach((trabajo) => {

      portfolio.innerHTML += `
      <div class="col">
        <div class="card shadow-sm h-100">
          <img src="${trabajo.photo}" class="card-img-top">
          <div class="card-body">
            <h5>${trabajo.title}</h5>
            <p class="categoria">${trabajo.category}</p>
            <p>${trabajo.description}</p>
          </div>
        </div>
      </div>
      `;

    });

  })
  .catch(error => {
    console.error("Error cargando los proyectos:", error);
  });
