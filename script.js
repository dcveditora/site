const botonTema = document.getElementById("boton-tema");

// Tema oscuro
let temaGuardado = null;

try {
  temaGuardado = localStorage.getItem("tema");
} catch {
  // El sitio sigue funcionando aunque localStorage no esté disponible.
}

function actualizarBotonTema(temaOscuro) {
  if (!botonTema) return;

  botonTema.textContent = temaOscuro ? "☀ Modo claro" : "◐ Modo oscuro";
  botonTema.setAttribute("aria-pressed", String(temaOscuro));
}

if (temaGuardado === "oscuro") {
  document.documentElement.dataset.tema = "oscuro";
}

actualizarBotonTema(temaGuardado === "oscuro");

if (botonTema) {
  botonTema.addEventListener("click", () => {
    const estaOscuro = document.documentElement.dataset.tema === "oscuro";
    const nuevoTemaOscuro = !estaOscuro;

    if (nuevoTemaOscuro) {
      document.documentElement.dataset.tema = "oscuro";
    } else {
      delete document.documentElement.dataset.tema;
    }

    try {
      localStorage.setItem("tema", nuevoTemaOscuro ? "oscuro" : "claro");
    } catch {
      // El cambio de tema funciona durante esta visita aunque no se pueda guardar.
    }

    actualizarBotonTema(nuevoTemaOscuro);
  });
}

// Visor para ampliar y recorrer las imágenes del portafolio
const visor = document.getElementById("visor");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const botonCerrar = document.getElementById("cerrar-visor");
const botonAnterior = document.getElementById("imagen-anterior");
const botonSiguiente = document.getElementById("imagen-siguiente");
const obras = [...document.querySelectorAll(".obra")];

let indiceActual = 0;
let elementoEnfocadoAntesDeAbrir = null;

function mostrarImagen(indice) {
  if (!obras.length || !imagenAmpliada) return;

  // Al llegar al final, vuelve a la primera imagen, y viceversa.
  indiceActual = (indice + obras.length) % obras.length;

  const imagen = obras[indiceActual].querySelector("img");
  if (!imagen) return;

  imagenAmpliada.src = imagen.src;
  imagenAmpliada.alt = imagen.alt || `Proyecto editorial ${indiceActual + 1}`;
}

function abrirVisor(indice) {
  if (!visor || !botonCerrar) return;

  elementoEnfocadoAntesDeAbrir = document.activeElement;
  mostrarImagen(indice);
  visor.classList.add("abierto");
  botonCerrar.focus();
}

function cerrarVisor() {
  if (!visor || !imagenAmpliada) return;

  visor.classList.remove("abierto");
  imagenAmpliada.src = "";

  if (elementoEnfocadoAntesDeAbrir instanceof HTMLElement) {
    elementoEnfocadoAntesDeAbrir.focus();
  }
}

obras.forEach((obra, indice) => {
  obra.addEventListener("click", () => abrirVisor(indice));
});

if (visor && imagenAmpliada && botonCerrar) {
  botonCerrar.addEventListener("click", cerrarVisor);

  botonAnterior?.addEventListener("click", () => {
    mostrarImagen(indiceActual - 1);
  });

  botonSiguiente?.addEventListener("click", () => {
    mostrarImagen(indiceActual + 1);
  });

  // Cierra al hacer clic en el fondo del visor.
  visor.addEventListener("click", (evento) => {
    if (evento.target === visor) cerrarVisor();
  });

  // Escape cierra el visor; las flechas cambian la imagen.
  document.addEventListener("keydown", (evento) => {
    if (!visor.classList.contains("abierto")) return;

    if (evento.key === "Escape") {
      cerrarVisor();
    } else if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      mostrarImagen(indiceActual - 1);
    } else if (evento.key === "ArrowRight") {
      evento.preventDefault();
      mostrarImagen(indiceActual + 1);
    }
  });
}

// Flechas del carrusel de miniaturas
const carrusel = document.getElementById("portafolio-carrusel");
const flechaCarruselAnterior = document.querySelector(
  ".flecha-carrusel.anterior"
);
const flechaCarruselSiguiente = document.querySelector(
  ".flecha-carrusel.siguiente"
);

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

// Empieza el carrusel desde la primera miniatura.
window.addEventListener("load", () => {
  if (carrusel) {
    carrusel.scrollLeft = 0;
  }
});
