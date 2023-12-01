const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];

function CrearContedorCard() {
  const $contenedor = document.createElement("div");
  $contenedor.classList.add("container-fluid");
  $contenedor.classList.add("vh-100");
  $contenedor.classList.add("fondo-img");
  return $contenedor;
}

function CrearContedorRow() {
  const $contenedor = document.createElement("div");
  $contenedor.classList.add("row");

  return $contenedor;
}

function CrearCard() {
  const $card = document.createElement("div");
  $card.classList.add("card");
  $card.classList.add("col-3");
  $card.style.backgroundColor = "#40160a";
  $card.style.padding = "15px";
  $card.style.border = "1px solid black";
  $card.classList.add("m-3");
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
  // $img.setAttribute("alt", key);
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
  $p.style.textTransform = "Capitalize";
  return $p;
}

// Crear Cards

const $main = document.querySelector("main");
const $contenedor = CrearContedorCard();
const $contenedorRow = CrearContedorRow();
const fragment = document.createDocumentFragment();
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
} else {
  $h2 = document.createElement("h2");
  $h2.textContent = "No hay monstruos para mostrar";
  $h2.style.weight = "600";
  $h2.style.color = "red";
  $contenedorRow.appendChild($h2);
}
$contenedorRow.appendChild(fragment);
$contenedor.appendChild($contenedorRow);
$main.appendChild($contenedor);
