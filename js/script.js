import { Monstruo } from "./Monstruo.js";
import { ActualizarTabla } from "./Tabla.js";
import { cargarSelect, ManejoBtns, CargarFormulario } from "./Formulario.js";

//Formulario
const selectTipo = document.querySelectorAll("select");
const filterTipo = selectTipo[1];
cargarSelect(selectTipo[0]);
cargarSelect(selectTipo[1]);
const $form = document.forms[0];
const $btnSubmit = document.querySelector("input[type = 'submit']");
const $btnEliminar = document.getElementById("btnEliminar");
$btnEliminar.style.backgroundImage = 'url("../icon/borrar.png")';
$btnEliminar.style.backgroundColor = "#d7273e";
const $btnCancelar = document.getElementById("btnCancelar");
$btnCancelar.style.backgroundImage = 'url("../icon/cancelar.png")';
$btnCancelar.style.backgroundColor = "#f4787e";
//Cargar tabla
const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];
const $seccionTala = document.getElementById("tabla");
ActualizarTabla($seccionTala, monstruos);
PromedioMiedo(monstruos);
//ID
let id;

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { nombre, alias, defensa, miedo, selectTipo } = $form;
  if ($btnSubmit.value === "Guardar") {
    const monstruoAlta = new Monstruo(
      Date.now(),
      nombre.value,
      selectTipo.value,
      alias.value,
      miedo.value,
      defensa.value
    );
    monstruoCreate(monstruoAlta);
  } else if ($btnSubmit.value === "Modificar") {
    const monstruoUpdate = new Monstruo(id, nombre.value, selectTipo.value, alias.value, miedo.value, defensa.value);
    updateMonstruo(monstruoUpdate);
  }

  $form.reset();
});

//Boton eliminar
$btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  monstruoDelete(id);
  $form.reset();
});

//Boton cancelar
$btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();

  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
  $form.reset();
});

window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    id = e.target.parentElement.dataset.id;
    const selectedMonstruo = monstruos.find((value) => value.id == id);
    CargarFormulario($form, selectedMonstruo);
    ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, false);
  } else if (e.target.matches("input[type = 'checkbox']")) {
  }
});

filterTipo.addEventListener("change", (e) => {
  const seleccion = e.target.value;
  //ARRAYAS
  /*Agregar una sección que permita filtrar la tabla que se muestra por pantalla por tipo de 
  monstruo cuyas opciones son Todos/Vampiro/Hombre 
  Lobo/Fantasma/Esqueleto/Bruja/Zombie. Por defecto debe ser todos */
  if (seleccion === "todos") {
    ActualizarTabla($seccionTala, monstruos);
    PromedioMiedo(monstruos);
  } else {
    const filtroTipo = monstruos.filter((obj) => {
      return obj.tipo === seleccion;
    });
    ActualizarTabla($seccionTala, filtroTipo);
    PromedioMiedo(filtroTipo);
  }
});

//CRUD MONSTRUOS
function monstruoCreate(newMonstruo) {
  monstruos.push(newMonstruo);
  actualizarStorage();
  ActualizarTabla($seccionTala, monstruos);
}

function updateMonstruo(monstruo) {
  let index = monstruos.findIndex((value) => value.id == monstruo.id);
  monstruos.splice(index, 1, monstruo);
  actualizarStorage();
  ActualizarTabla($seccionTala, monstruos);
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
}

function monstruoDelete(idMonstruo) {
  let index = monstruos.findIndex((value) => value.id == idMonstruo);
  monstruos.splice(index, 1);
  console.log(monstruos);
  ActualizarTabla($seccionTala, monstruos);
  actualizarStorage();
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
}

function actualizarStorage() {
  localStorage.setItem("monstruos", JSON.stringify(monstruos));
}

function PromedioMiedo(arrayMonstruos) {
  let suma = 0;
  arrayMonstruos
    .map((monster) => parseInt(monster.miedo))
    .forEach((element) => {
      suma += element;
    });
  console.log(suma / arrayMonstruos.length);
  document.getElementById("txtPromedio").value = suma / arrayMonstruos.length;
}
