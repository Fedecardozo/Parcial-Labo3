import { ajaxGet, ajaxPostCreate, ajaxPut } from "./ajax.js";
import { fetchGetAsyc } from "./fetch.js";
import { axiosDelete } from "./axios.js";
import { CargarCards } from "./principal.js";
import { cargarSelect, ManejoBtns, CargarFormulario, cargarDrop } from "./Formulario.js";
import { Monstruo } from "./Monstruo.js";
import { ActualizarTable, CrearTabla } from "./Tabla.js";

const URL_DB = "http://localhost:3000/monstruos";
const $spinner = document.getElementById("spinner");

//CARGAR SELECT
const selectTipo = document.querySelectorAll("select");
cargarSelect(selectTipo[0]);
cargarDrop(document.getElementById("selectFilterTipo"));

//CARGAR TABLA
const $seccionTabla = document.getElementById("tabla");
async function actualizarTabla() {
  const monstruos = fetchGetAsyc(URL_DB, $spinner, (data) => {
    const monsters = data.sort((value, value2) => value2.miedo - value.miedo);
    ActualizarTable($seccionTabla, monsters);
    PromedioMaxMin(monsters);
    return monsters;
  });
  return monstruos;
}
const jsonMonstruos = await actualizarTabla();

//PAGINA PRINCIPAL
const anclaPrincipal = document.getElementById("getMonstruos");

anclaPrincipal.addEventListener("click", () => {
  const url = "http://localhost:5500/html/monstruo.html";
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

//CARGAR ULTIMA SELECCION
if (localStorage.getItem("seleccion")) {
  const id = localStorage.getItem("seleccion");
  const monster = jsonMonstruos.find((value) => value.id == id);

  if (monster) {
    $txtId.value = id;
    CargarFormulario($form, monster);
    ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, false);
  }
}

//GUARDAR MODIFICAR
$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { nombre, alias, defensa, miedo, selectTipo, txtId } = $form;

  //GUARDAR
  if ($btnSubmit.value === "Guardar") {
    const monstruoAlta = new Monstruo(nombre.value, selectTipo.value, alias.value, miedo.value, defensa.value);
    ajaxPostCreate(URL_DB, $spinner, monstruoAlta, $seccionTabla);
    monstruoCreate(monstruoAlta);
  }
  //MODIFICAR
  else if ($btnSubmit.value === "Modificar") {
    const monstruoUpdate = new Monstruo(nombre.value, selectTipo.value, alias.value, miedo.value, defensa.value);
    monstruoUpdate.setId(parseInt(txtId.value));
    ajaxPut(URL_DB, monstruoUpdate, $spinner, $seccionTabla);
    MonstruoUpdate(monstruoUpdate);
  }

  $form.reset();
});

//BOTON ELIMINAR
$btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  //Aca elimino con la base de datos AXIOS
  axiosDelete(URL_DB, $spinner, $txtId.value, $seccionTabla);
  monstruoDelete($txtId.value);
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
  const target = e.target;
  //OBTENER CELDA SELECIONADA
  if (target.matches("td")) {
    let id = e.target.parentElement.dataset.id;
    const selectedMonstruo = jsonMonstruos.find((value) => value.id == id);
    CargarFormulario($form, selectedMonstruo);
    ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, false);
    $txtId.value = id;
    localStorage.setItem("seleccion", id);
  }
  //OCULTAR COLUMNAS
  else if (target.matches("input[type = 'checkbox']")) {
    ocultarColumnas(e.target);
  }
  //DROP FILTRO SELECT
  else if (target.matches("li") && target.attributes.class.nodeValue === "dropdown-item pointer") {
    // console.log(target.innerText);
    const monstruosFiltrado = ObtenerArraySelec(target.innerText);
    ActualizarTable($seccionTabla, monstruosFiltrado);
    const $cheks = document.querySelectorAll("input[type = 'checkbox']");
    $cheks.forEach((chek) => {
      ocultarColumnas(chek);
    });
    PromedioMaxMin(monstruosFiltrado);
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

//FILTRAR ARRAY SEGUN SELEC
function ObtenerArraySelec(selecSelccionado) {
  if (selecSelccionado === "todos") {
    return jsonMonstruos;
  }
  const filtroTipo = jsonMonstruos.filter((obj) => {
    return obj.tipo === selecSelccionado;
  });

  return filtroTipo;
}

//CALCULAR PROMEDIO MAX Y MIN
function PromedioMaxMin(arrayMonstruos) {
  PromedioMiedo(arrayMonstruos);
  MiedoMaximo(arrayMonstruos);
  MiedoMinimo(arrayMonstruos);
}

//PROMEDIO
function PromedioMiedo(arrayMonstruos) {
  let promedio = 0;
  if (Array.isArray(arrayMonstruos) && arrayMonstruos.length) {
    let suma = arrayMonstruos.map((monster) => parseInt(monster.miedo)).reduce((acu, el) => (acu += el));
    promedio = suma / arrayMonstruos.length;
  }
  // console.log(suma / arrayMonstruos.length);
  document.getElementById("txtPromedio").value = promedio.toFixed(2);
}

//MIEDO MAXIMO
function MiedoMaximo(arrayMonstruos) {
  if (Array.isArray(arrayMonstruos) && arrayMonstruos.length) {
    const max = arrayMonstruos
      .map((monster) => parseInt(monster.miedo))
      .reduce((acu, el) => {
        return acu > el ? acu : el;
      });

    document.getElementById("txtMaximo").value = max;
  }
}

//MIEDO MINIMO
function MiedoMinimo(arrayMonstruos) {
  if (Array.isArray(arrayMonstruos) && arrayMonstruos.length) {
    const min = arrayMonstruos
      .map((monster) => parseInt(monster.miedo))
      .reduce((acu, el) => {
        return acu < el ? acu : el;
      });
    document.getElementById("txtMinimo").value = min;
  }
}

// ABM Array json

function monstruoDelete(idMonstruo) {
  let index = jsonMonstruos.findIndex((value) => value.id == idMonstruo);
  jsonMonstruos.splice(index, 1);
  ActualizarTable($seccionTabla, jsonMonstruos);
}

function MonstruoUpdate(monstruo) {
  let index = jsonMonstruos.findIndex((value) => value.id == monstruo.id);
  jsonMonstruos.splice(index, 1, monstruo);
  ManejoBtns($btnSubmit, $btnEliminar, $btnCancelar, true);
  ActualizarTable($seccionTabla, jsonMonstruos);
}

function monstruoCreate(newMonstruo) {
  jsonMonstruos.push(newMonstruo);
  ActualizarTable($seccionTabla, jsonMonstruos);
}
