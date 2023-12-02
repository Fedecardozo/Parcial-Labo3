import { ajaxGet, ajaxPostCreate, ajaxPut } from "./ajax.js";
import { fetchGetAsyc } from "./fetch.js";
import { axiosDelete } from "./axios.js";
import { CargarCards } from "./principal.js";
import { cargarSelect, ManejoBtns, CargarFormulario } from "./Formulario.js";
import { Monstruo } from "./Monstruo.js";
import { ActualizarTable } from "./Tabla.js";

const URL_DB = "http://localhost:3000/monstruos";
const $spinner = document.getElementById("spinner");

//CARGAR SELECT
const selectTipo = document.querySelectorAll("select");
cargarSelect(selectTipo[0]);
cargarSelect(selectTipo[1]);

//CARGAR TABLA
async function actualizarTabla() {
  const $seccionTabla = document.getElementById("tabla");
  // $seccionTabla.hidden = true;
  const monstruos = fetchGetAsyc(URL_DB, $spinner, (data) => {
    ActualizarTable($seccionTabla, data);
    return data;
  });
  // $seccionTabla.hidden = false;
  return monstruos;
}
const jsonMonstruos = await actualizarTabla();

//PAGINA PRINCIPAL
const anclaPrincipal = document.getElementById("getMonstruos");

anclaPrincipal.addEventListener("click", () => {
  const url = "http://localhost:5500/client/html/monstruo.html";

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

//BOTON GUARDAR MODIFICAR ELIMINAR CANCELAR
const $form = document.forms[0];
const $btnSubmit = document.querySelector("input[type = 'submit']");
const $btnCancelar = document.getElementById("btnCancelar");
const $btnEliminar = document.getElementById("btnEliminar");
const $txtId = document.getElementById("txtId");

//CAMBIAR BOTONES
window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    let id = e.target.parentElement.dataset.id;
    const selectedMonstruo = jsonMonstruos.find((value) => value.id == id);
    CargarFormulario($form, selectedMonstruo);
    ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, false);
    $txtId.value = id;
  }
});

//GUARDAR MODIFICAR
$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { nombre, alias, defensa, miedo, selectTipo, txtId } = $form;

  //GUARDAR
  if ($btnSubmit.value === "Guardar") {
    const monstruoAlta = new Monstruo(nombre.value, selectTipo.value, alias.value, miedo.value, defensa.value);
    ajaxPostCreate(URL_DB, monstruoAlta);
  }
  //MODIFICAR
  else if ($btnSubmit.value === "Modificar") {
    const monstruoUpdate = new Monstruo(
      parseInt(txtId.value),
      nombre.value,
      selectTipo.value,
      alias.value,
      miedo.value,
      defensa.value
    );

    ajaxPut(URL_DB, monstruoUpdate);
    ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
  }

  $form.reset();
});

//Boton eliminar
$btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  //Aca elimino con la base de datos AXIOS
  axiosDelete(URL_DB, $txtId.value);
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
  $form.reset();
});

//Boton cancelar
$btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
  $form.reset();
});