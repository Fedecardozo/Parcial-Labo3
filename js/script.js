import { Monstruo } from "./Monstruo.js";

const monstruo = new Monstruo("fede", "pca", "fefe", "lunita", "pilin");

const cargarSelect = () => {
  const selectTipo = document.getElementById("selectTipo");
  const tipos = ["esqueleto", "zombie", "vampiro", "fantasma", "bruja", "hombre lobo"];
  const fragment = document.createDocumentFragment();
  tipos.forEach((tipo) => {
    let option = document.createElement("OPTION");
    option.text = tipo;
    option.value = tipo;
    fragment.appendChild(option);
  });
  selectTipo.appendChild(fragment);
};

document.addEventListener("DOMContentLoaded", function () {
  //   document.write(monstruo.toString());
  // console.log(monstruo.toString());
  cargarSelect();
});
