const botonTema = document.getElementById("boton-tema");
const temaGuardado = localStorage.getItem("tema");

// Aplica el tema guardado, si existe.
if (temaGuardado === "oscuro") {
  document.documentElement.dataset.tema = "oscuro";
  botonTema.textContent = "☀ Modo claro";
  botonTema.setAttribute("aria-pressed", "true");
}

// Alterna el tema y guarda la selección.
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

// Visor para ampliar imágenes del portafolio.
const visor = document.getElementById("visor");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const botonCerrar = document.getElementById("cerrar-visor");

document.querySelectorAll(".obra").forEach((obra) => {
  obra.addEventListener("click", () => {
    const imagen = obra.querySelector("img");

    imagenAmpliada.src = imagen.src;
    imagenAmpliada.alt = imagen.alt;
    visor.classList.add("abierto");
    botonCerrar.focus();
  });
});

function cerrarVisor() {
  visor.classList.remove("abierto");
  imagenAmpliada.src = "";
}

botonCerrar.addEventListener("click", cerrarVisor);

// Cierra el visor al hacer clic fuera de la imagen o presionar Escape.
visor.addEventListener("click", (evento) => {
  if (evento.target === visor) {
    cerrarVisor();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    cerrarVisor();
  }
});

const carrusel = document.getElementById("portafolio-carrusel");

document.querySelector(".flecha-carrusel.anterior").addEventListener("click", () => {
  carrusel.scrollBy({ left: -carrusel.clientWidth * 0.8, behavior: "smooth" });
});

document.querySelector(".flecha-carrusel.siguiente").addEventListener("click", () => {
  carrusel.scrollBy({ left: carrusel.clientWidth * 0.8, behavior: "smooth" });
});
