import { ajaxGet } from "./ajax.js";
import { CargarCards } from "./principal.js";

const URL_DB = "http://localhost:3000/monstruos";
const anclaPrincipal = document.getElementById("getMonstruos");

anclaPrincipal.addEventListener("click", () => {
  const url = "http://localhost:5500/html/monstruo.html";

  const $spinner = document.getElementById("spinner");

  ajaxGet(url, $spinner, (res) => {
    const parser = new DOMParser();

    // Convertir el HTML en un documento DOM
    const doc = parser.parseFromString(res.responseText, "text/html");

    // Obtener el contenido de la etiqueta <main>
    const contenidoMain = doc.querySelector("main").innerHTML;

    const $main = document.querySelector("main");
    $main.innerHTML = contenidoMain;

    CargarCards($main, URL_DB);
  });
});
//
