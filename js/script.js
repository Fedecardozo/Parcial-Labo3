import { Monstruo } from "./Monstruo.js";
import { CrearTabla } from "./Tabla.js";

const cargarSelect = () => {
  const selectTipo = document.getElementById("selectTipo");
  const tipos = JSON.parse(localStorage.getItem("tipos"));
  const fragment = document.createDocumentFragment();
  tipos.forEach((tipo) => {
    const option = document.createElement("OPTION");
    option.text = tipo;
    option.value = tipo;
    fragment.appendChild(option);
  });
  selectTipo.appendChild(fragment);
};

cargarSelect();
const $form = document.forms[0];
const $btnSubmit = document.querySelector("input[type = 'submit']");
const $btnEliminar = document.getElementById("btnEliminar");
$btnEliminar.style.backgroundImage = 'url("../icon/borrar.png")';
$btnEliminar.style.backgroundColor = "#d7273e";
//Crear tabla
const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];
const $seccionTala = document.getElementById("tabla");
$seccionTala.appendChild(CrearTabla(monstruos));

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { nombre, alias, defensa, miedo, selectTipo } = $form;
  if ($btnSubmit.value === "Guardar") {
    const monstruoAlta = new Monstruo(
      Date.now(),
      nombre.value,
      alias.value,
      defensa.value,
      miedo.value,
      selectTipo.value
    );
    monstruoCreate(monstruoAlta);
  } else if ($btnSubmit.value === "Modificar") {
    const monstruoUpdate = new Monstruo(
      Date.now(),
      nombre.value,
      alias.value,
      defensa.value,
      miedo.value,
      selectTipo.value
    );
    monstruoUpdate(monstruoUpdate);
  }
});

window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const id = e.target.parentElement.dataset.id;
    $btnSubmit.value = "Modificar";
    $btnEliminar.hidden = false;
  }
});

//CRUD MONSTRUOS
function monstruoCreate(newMonstruo) {
  monstruos.push(newMonstruo);
  localStorage.setItem("monstruos", JSON.stringify(monstruos));
  $seccionTala.appendChild(CrearTabla(monstruos));
  $form.reset();
}

function monstruoUpdate(monstruo) {
  $btnSubmit.value = "Guardar";
  $btnEliminar.hidden = true;
  $form.reset();
}

function monstruoDelete(idMonstruo) {
  $btnSubmit.value = "Guardar";
  $btnEliminar.hidden = true;
  $form.reset();
}
