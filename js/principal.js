import { fetchGet } from "./fetch.js";

export const CargarCards = ($main, URL_DB) => {
  const $spinner = document.getElementById("spinner");
  fetchGet(URL_DB, $spinner, (data) => {
    const monstruos = data;
    const $contenedor = CrearContedorCard();
    const $contenedorRow = CrearContedorRow();
    const fragment = document.createDocumentFragment();
    $spinner.hidden = true;

    if (monstruos.length) {
      monstruos.forEach((value) => {
        const $card = CrearCard();
        const $cardBody = CrearCardBody();

        for (const key in value) {
          if (key === "id") continue;
          const $img = CrearImg(key);
          const $p = CrearParrafo($img, key, value[key]);
          $cardBody.appendChild($p);
        }
        $card.appendChild($cardBody);
        fragment.appendChild($card);
      });
      //Traigo al padre del spinner
      const padre = $spinner.parentNode;
      //Del padre del spinner, busco al padre y despues elimino al hijo(padre del spinner)
      padre.parentNode.removeChild(padre);
      $contenedorRow.appendChild(fragment);
      $contenedorRow.appendChild(fragment);
      $contenedor.appendChild($contenedorRow);
      $main.appendChild($contenedor);
    } else {
      alert("No hay monstruos para mostrar");
    }
    $contenedorRow.appendChild(fragment);
    $contenedor.appendChild($contenedorRow);
    $main.appendChild($contenedor);
  });
};

function CrearContedorCard() {
  const $contenedor = document.createElement("div");
  $contenedor.classList.add("container");
  $contenedor.classList.add("pt-4");
  $contenedor.classList.add("pb-4");
  return $contenedor;
}

function CrearContedorRow() {
  const $contenedor = document.createElement("div");
  $contenedor.classList.add("row");
  $contenedor.classList.add("justify-content-center");

  return $contenedor;
}

function CrearCard() {
  const $card = document.createElement("div");
  $card.classList.add("card");
  $card.classList.add("col-12");
  $card.classList.add("col-md-6");
  $card.classList.add("col-lg-4");
  $card.style.backgroundColor = "#40160a";
  $card.style.padding = "15px";
  $card.style.border = "1px solid black";
  $card.classList.add("mb-3");
  return $card;
}
function CrearCardBody() {
  const $cardBody = document.createElement("div");
  $cardBody.classList.add("card-body");
  return $cardBody;
}

function CrearImg(key) {
  const $img = document.createElement("img");
  $img.classList.add("icon-img");
  const src = "../icon/";
  $img.setAttribute("alt", key);
  $img.setAttribute("src", src + key + ".png");
  return $img;
}

function CrearParrafo($img, key, value) {
  const $p = document.createElement("p");
  $p.classList.add("card-text");
  const $span = document.createElement("span");
  $span.textContent = value;
  $span.style.color = "#f7bb7a";
  const texto = document.createTextNode(key + ": ");
  $p.appendChild($img);
  $p.appendChild(texto);
  $p.appendChild($span);
  $p.style.weight = "600";
  $p.style.color = "#f28c35";
  $p.style.textTransform = "Capitalize";
  return $p;
}
