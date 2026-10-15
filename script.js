const botonTema = document.getElementById("boton-tema");
const temaGuardado = localStorage.getItem("tema");

// Aplica el tema guardado, si existe.
if (botonTema && temaGuardado === "oscuro") {
  document.documentElement.dataset.tema = "oscuro";
  botonTema.textContent = "☀ Modo claro";
  botonTema.setAttribute("aria-pressed", "true");
}

// Alterna el tema y guarda la selección.
if (botonTema) {
  botonTema.addEventListener("click", () => {
    const estaOscuro = document.documentElement.dataset.tema === "oscuro";

    if (estaOscuro) {
      delete document.documentElement.dataset.tema;
      localStorage.setItem("tema", "claro");
      botonTema.textContent = "◐ Modo oscuro";
      botonTema.setAttribute("aria-pressed", "false");
    } else {
      document.documentElement.dataset.tema = "oscuro";
      localStorage.setItem("tema", "oscuro");
      botonTema.textContent = "☀ Modo claro";
      botonTema.setAttribute("aria-pressed", "true");
    }
  });
}

// Visor para ampliar y recorrer las imágenes del portafolio.
const visor = document.getElementById("visor");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const botonCerrar = document.getElementById("cerrar-visor");
const botonAnterior = document.getElementById("imagen-anterior");
const botonSiguiente = document.getElementById("imagen-siguiente");
const obras = [...document.querySelectorAll(".obra")];

let indiceActual = 0;

function mostrarImagen(indice) {
  if (obras.length === 0) return;

  // Al llegar al final, vuelve a la primera imagen, y viceversa.
  indiceActual = (indice + obras.length) % obras.length;

  const imagen = obras[indiceActual].querySelector("img");
  if (!imagen) return;

  imagenAmpliada.src = imagen.src;
  imagenAmpliada.alt = imagen.alt;
}

if (visor && imagenAmpliada && botonCerrar) {
  obras.forEach((obra, indice) => {
    obra.addEventListener("click", () => {
      mostrarImagen(indice);
      visor.classList.add("abierto");
      botonCerrar.focus();
    });
  });

  function cerrarVisor() {
    visor.classList.remove("abierto");
    imagenAmpliada.src = "";
  }

  botonCerrar.addEventListener("click", cerrarVisor);

  if (botonAnterior) {
    botonAnterior.addEventListener("click", () => {
      mostrarImagen(indiceActual - 1);
    });
  }

  if (botonSiguiente) {
    botonSiguiente.addEventListener("click", () => {
      mostrarImagen(indiceActual + 1);
    });
  }

  // Cierra al hacer clic en el fondo del visor.
  visor.addEventListener("click", (evento) => {
    if (evento.target === visor) cerrarVisor();
  });

  // Escape cierra el visor; las flechas del teclado cambian la imagen.
  document.addEventListener("keydown", (evento) => {
    if (!visor.classList.contains("abierto")) return;

    if (evento.key === "Escape") cerrarVisor();
    if (evento.key === "ArrowLeft") mostrarImagen(indiceActual - 1);
    if (evento.key === "ArrowRight") mostrarImagen(indiceActual + 1);
  });
}

// Flechas del carrusel de miniaturas.
const carrusel = document.getElementById("portafolio-carrusel");
const flechaCarruselAnterior = document.querySelector(".flecha-carrusel.anterior");
const flechaCarruselSiguiente = document.querySelector(".flecha-carrusel.siguiente");

if (carrusel && flechaCarruselAnterior && flechaCarruselSiguiente) {
  flechaCarruselAnterior.addEventListener("click", () => {
    carrusel.scrollBy({
      left: -carrusel.clientWidth * 0.8,
      behavior: "smooth",
    });
  });

  flechaCarruselSiguiente.addEventListener("click", () => {
    carrusel.scrollBy({
      left: carrusel.clientWidth * 0.8,
      behavior: "smooth",
    });
  });
}
