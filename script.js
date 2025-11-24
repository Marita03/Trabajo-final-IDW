// Cargar proyectos desde JSON
fetch("proyectos.json")
.then(response => response.json())
.then(data => {
  const contenedor = document.getElementById("contenedor-proyectos");

  data.forEach((proyecto, index) => {

    const div = document.createElement("div");
    div.classList.add("proyecto");

    // Carrusel
    let imagenesHTML = "";
    proyecto.imagenes.forEach((img, i) => {
      imagenesHTML += `
        <img src="${img}" class="${i === 0 ? "activo" : ""}">
      `;
    });

    div.innerHTML = `
      <div class="carrusel" id="carrusel-${index}">
        ${imagenesHTML}
        <div class="botones-carrusel">
          <button onclick="prev(${index})">←</button>
          <button onclick="next(${index})">→</button>
        </div>
      </div>

      <h3>${proyecto.nombre}</h3>
      <p>${proyecto.descripcion}</p>
      <small>${proyecto.anio} – ${proyecto.asignatura}</small>
    `;

    contenedor.appendChild(div);
  });
});

// Carrusel
function next(id) {
  const carrusel = document.getElementById("carrusel-" + id);
  const imgs = carrusel.querySelectorAll("img");
  let index = [...imgs].findIndex(img => img.classList.contains("activo"));

  imgs[index].classList.remove("activo");
  index = (index + 1) % imgs.length;
  imgs[index].classList.add("activo");
}

function prev(id) {
  const carrusel = document.getElementById("carrusel-" + id);
  const imgs = carrusel.querySelectorAll("img");
  let index = [...imgs].findIndex(img => img.classList.contains("activo"));

  imgs[index].classList.remove("activo");
  index = (index - 1 + imgs.length) % imgs.length;
  imgs[index].classList.add("activo");
}

// Botón subir
document.getElementById("btnSubir").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
