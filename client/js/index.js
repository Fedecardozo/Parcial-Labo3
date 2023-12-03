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
const $seccionTabla = document.getElementById("tabla");
async function actualizarTabla() {
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

//BOTON ELIMINAR
$btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  //Aca elimino con la base de datos AXIOS
  axiosDelete(URL_DB, $txtId.value);
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
  $form.reset();
});

//BOTON CANCELAR
$btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
  $form.reset();
});

//CAMBIAR BOTONES / OCULTAR COLUMNAS
window.addEventListener("click", (e) => {
  //OBTENER CELDA SELECIONADA
  if (e.target.matches("td")) {
    let id = e.target.parentElement.dataset.id;
    const selectedMonstruo = jsonMonstruos.find((value) => value.id == id);
    CargarFormulario($form, selectedMonstruo);
    ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, false);
    $txtId.value = id;
  }
  //OCULTAR COLUMNAS
  else if (e.target.matches("input[type = 'checkbox']")) {
    ocultarColumnas(e.target);
  }
});

//OCULTAR COLUMNAS SEGUN CHECK
function ocultarColumnas(chek) {
  const th = document.querySelectorAll("th");
  if (th.length) {
    for (let index = 0; index < th.length; index++) {
      if (th[index].textContent === chek.value) {
        const td = document.querySelectorAll(`td:nth-child(${index + 1})`);
        td.forEach((col) => {
          if (chek.checked) {
            th[index].style.display = "table-cell";
            col.style.display = "table-cell";
          } else {
            th[index].style.display = "none";
            col.style.display = "none";
          }
        });
        break;
      }
    }
  }
}

//MOSTRAR SEGUN SELECT TIPO (FILTRO)
document.getElementById("selectFilterTipo").addEventListener("change", (e) => {
  const monstruosFiltrado = ObtenerArraySelec(e.target.value);
  ActualizarTable($seccionTabla, monstruosFiltrado);
  const $cheks = document.querySelectorAll("input[type = 'checkbox']");
  $cheks.forEach((chek) => {
    ocultarColumnas(chek);
  });
  PromedioMiedo(monstruosFiltrado);
});

//FILTRAR ARRAY SEGUN SELEC
function ObtenerArraySelec(selecSelccionado) {
  if (selecSelccionado === "todos") {
    PromedioMiedo(jsonMonstruos);

    return jsonMonstruos;
  }
  const filtroTipo = jsonMonstruos.filter((obj) => {
    return obj.tipo === selecSelccionado;
  });
  PromedioMiedo(filtroTipo);

  return filtroTipo;
}

//PROMEDIO
function PromedioMiedo(arrayMonstruos) {
  let promedio = 0;
  if (Array.isArray(arrayMonstruos) && arrayMonstruos.length) {
    let suma = arrayMonstruos.map((monster) => parseInt(monster.miedo)).reduce((acu, el) => (acu += el));
    promedio = suma / arrayMonstruos.length;
  }
  // console.log(suma / arrayMonstruos.length);
  document.getElementById("txtPromedio").value = promedio;
}

//Ordenarlo por miedo de manera decente con sort
