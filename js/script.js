import { Monstruo } from "./Monstruo.js";
import { CrearTabla } from "./Tabla.js";

const monstruo = [
  new Monstruo("fede", "pca", "fefe", "lunita", "pilin"),
  new Monstruo("fede", "pca", "fefe", "lunita", "pilin"),
  new Monstruo("fede", "pca", "fefe", "lunita", "pilin"),
  new Monstruo("fede", "pca", "fefe", "lunita", "pilin"),
];

console.log(Object.keys(monstruo[0]));

const tipos = JSON.parse(localStorage.getItem("tipos"));

const cargarSelect = () => {
  const selectTipo = document.getElementById("selectTipo");
  const fragment = document.createDocumentFragment();
  tipos.forEach((tipo) => {
    let option = document.createElement("OPTION");
    option.text = tipo;
    option.value = tipo;
    fragment.appendChild(option);
  });
  selectTipo.appendChild(fragment);
};

const cargarTabla = () => {
  const $seccionTala = document.getElementById("tabla");
  // const $table = document.createElement("table");
  // const $thead = document.createElement("thead");
  // const $tr = document.createElement("tr");
  // const $th = document.createElement("th");
  // $th.textContent = "HOLa";
  // $tr.appendChild($th);
  // $thead.appendChild($tr);
  // $table.appendChild($thead);
  $seccionTala.appendChild(CrearTabla(monstruo));
  // $seccionTala.appendChild(CrearTabla(tipos));
};

document.addEventListener("DOMContentLoaded", function () {
  //   document.write(monstruo.toString());
  // console.log(monstruo.toString());
  cargarSelect();
  cargarTabla();
});
