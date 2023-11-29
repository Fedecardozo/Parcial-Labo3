import { Monstruo } from "./Monstruo.js";

const monstruo = new Monstruo("fede", "pca", "fefe", "lunita", "pilin");

const cargarSelect = () => {
  const selectTipo = document.getElementById("selectTipo");
  const fragment = document.createDocumentFragment();
  const tipos = JSON.parse(localStorage.getItem("tipos"));
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
  // const tipo = ["esqueleto", "zombie", "vampiro", "fantasma", "bruja", "hombre lobo"];
});
