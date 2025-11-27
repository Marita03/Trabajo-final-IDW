fetch("proyectos.json")
  .then(response => response.json())
  .then(data => {

    const galeria = document.getElementById("galeria");

    if (galeria) {
      data.forEach(p => {
        galeria.innerHTML += `
          <div class="tarjeta">
            <img src="${p.photo}">
            <h3>${p.title}</h3>
            <p>${p.category}</p>
            <p>${p.description}</p>
          </div>`;
      });
    }
  });

// habilidades
const habilidades = [
  { programa: "Illustrator", valor: 90 },
  { programa: "Fusion 360", valor: 70 },
  { programa: "Twinmotion", valor: 40 },
  { programa: "Photoshop", valor: 30 },
  { programa: "Inglés", valor: 70 },
];

const tabla = document.getElementById("aqui");

if (tabla) {
  habilidades.forEach(h => {
    tabla.innerHTML += `
      <tr>
        <td>${h.programa}</td>
        <td>
          <svg viewBox="0 0 100 6" width="200">
            <rect width="100" height="4" fill="#ded4cd" rx="2"/>
            <rect width="${h.valor}" height="4" fill="darkseagreen" rx="2"/>
          </svg>
        </td>
      </tr>`;
  });
}
